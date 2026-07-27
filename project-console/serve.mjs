// Project Console — local server for N projects: read-only static serving plus EXACTLY TWO
// write routes (O4.P12).
//
// Serves two namespaces:
//
//   1. The repository root over HTTP, so project-console/index.html and its assets load.
//      Unchanged from the single-project server.
//   2. A VIRTUAL namespace /projects/<key>/** that maps onto the roots listed in the
//      project registry (project-console/projects.json). This is how the multi-project
//      shell reads the `.project/` folder and the doc bodies of every registered project,
//      including sibling repositories that live OUTSIDE this repository root. The registry
//      is the only door out of the repo: a root that is not registered is not reachable,
//      and a registered root is readable only inside itself (no traversal, never .git).
//
// THE TWO WRITE ROUTES (D-050 — this console stops being read-only, deliberately and only here):
//
//   POST /projects/<key>/__project-console/roadmap/edit    dry-run (apply:false) previews a
//        bounded roadmap edit and writes nothing; apply (apply:true, with the dry-run baseline
//        as compare-and-swap) writes the project's CANONICAL roadmap — the file its resolved
//        root layout declares — atomically, with rollback if the written file fails re-check.
//        After a successful write the project's `.project/` folder is re-emitted, so what the
//        console reads next agrees with what was just written.
//   POST /projects/<key>/__project-console/history/sync    re-emits `.project/git_history.json`
//        of that project from its own repository (read-only Git), so the History tab refreshes
//        without restarting the server.
//
// Both routes go through the same funnel: the project must be REGISTERED (the key resolves in
// the registry), its root must be claimed by a known layout (detectRootLayout — admission by
// tree SHAPE, never by a schema-name string), and every write destination is verified to sit
// INSIDE that registered root — and never inside the derived `.project/` folder, which only
// the emitter writes — after full path resolution (`resolveCanonicalWritePath`). A registry
// entry whose root composes a destination anywhere else is refused and reported, not executed.
//
// Everything else stays read-only by construction: any method other than GET/HEAD on any path
// that is not one of the two routes above answers 405 read_only_console; `.git` is never served
// or written in any namespace; escaping a root answers 403.
//
// The registry is DATA, not code: no project name or path lives in this file. The env var
// PC_REGISTRY (path relative to the repo root, or absolute) points the server at an
// alternative registry file — used by the test suite and by operator QA to serve the
// synthetic fixture projects under tests/fixtures/multi/ without touching the real registry.
//
// Boundaries:
//   - Node built-ins only. No dependencies, no package install.
//   - Writes ONLY through the two routes above: the canonical roadmap of a registered project
//     (via the transplanted roadmap engine's atomic temp+rename with tmpdir backup) and that
//     project's `.project/` folder (via the projector's atomic emitters). No other code path
//     in this file opens a file for writing.
//   - Loopback only: the server binds 127.0.0.1, and the write routes additionally verify the
//     peer is loopback and any browser Origin is a localhost origin (defense in depth).
//   - Never serves any .git/ directory — in this repo or in any registered project root.
//   - Outside the virtual namespace, never serves anything outside the repository root.
//
// Start (one command, one port):
//   node project-console/serve.mjs
//   (optional PC_PORT env var to override the default port;
//    optional PC_REGISTRY env var to serve an alternative project registry)

import http from "node:http";
import { readFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { extname, join, normalize, resolve, relative, sep, dirname, isAbsolute } from "node:path";
import { fileURLToPath } from "node:url";
import { planEdit, applyPlan, loadCurrent, KNOWN_OPS } from "../tools/roadmap/roadmap-plan.mjs";
import { checkInvariants } from "../tools/roadmap/roadmap-core.mjs";
import {
  detectRootLayout,
  flattenRoadmapTree,
  hasRoadmapTreeShape,
  writeProjectFolder,
  writeGitHistoryFile,
  PROJECT_DIR
} from "../tools/projector/project.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
// The console's entry point, and the only default this server has an opinion about.
const ENTRY = "/project-console/index.html";
// The registry the shell fetches. The URL is fixed; the FILE it serves can be overridden
// with PC_REGISTRY so tests and fixture QA never edit the real registry.
const REGISTRY_URL_PATH = "/project-console/projects.json";
const REGISTRY_DEFAULT_PATH = join(HERE, "projects.json");
// URL prefix of the virtual per-project namespace.
const PROJECTS_URL_PREFIX = "/projects/";
// The two write routes, as suffixes under /projects/<key>/. The client composes them from its
// active-project base, so the same constant shape serves every registered project. They are
// intercepted BEFORE static file resolution (like the source console's /__project-console/*),
// so a real file at either path inside a project is shadowed, never served.
const ROADMAP_EDIT_SUFFIX = "__project-console/roadmap/edit";
const HISTORY_SYNC_SUFFIX = "__project-console/history/sync";
const ROADMAP_EDIT_MAX_BODY = 1000000; // 1 MB cap on the request body
const PORT = Number(process.env.PC_PORT) || 8788;
const HOST = "127.0.0.1";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jsonl": "text/plain; charset=utf-8",
  ".md": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2"
};

function logLine(message) {
  console.log(`[project-console] ${message}`);
}

// Read fresh on every use so an operator can edit the registry without restarting the
// server. It is one small file; the cost is a read per /projects/ request.
function activeRegistryPath() {
  const override = process.env.PC_REGISTRY;
  if (!override) return REGISTRY_DEFAULT_PATH;
  return isAbsolute(override) ? override : resolve(REPO_ROOT, override);
}

// Registry keys are URL path segments; anything outside this charset is refused so a key
// can never smuggle a separator or a traversal into the path join below.
const REGISTRY_KEY_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;

// Parse the registry into key -> absolute project root. Fail-soft: an unreadable or invalid
// registry yields no entries (the virtual namespace answers 404), never a crash. Entries with
// a bad key or a non-string root are skipped; project ROOTS may live outside this repository
// — that is the point of the registry — but each one is served strictly inside itself.
async function readRegistry() {
  const path = activeRegistryPath();
  let raw;
  try {
    raw = await readFile(path, "utf8");
  } catch {
    return { path, entries: new Map(), error: "unreadable" };
  }
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { path, entries: new Map(), error: "invalid_json" };
  }
  const listed = Array.isArray(parsed?.projects) ? parsed.projects : null;
  if (!listed) return { path, entries: new Map(), error: "no_projects_array" };
  const registryDir = dirname(path);
  const entries = new Map();
  for (const item of listed) {
    const key = typeof item?.key === "string" ? item.key : "";
    const root = typeof item?.root === "string" ? item.root : "";
    if (!REGISTRY_KEY_PATTERN.test(key) || !root || entries.has(key)) continue;
    entries.set(key, resolve(registryDir, root));
  }
  return { path, entries, error: null };
}

// True when absPath is root itself or inside it.
function isInsideRoot(absPath, root) {
  const base = root.endsWith(sep) ? root : root + sep;
  return absPath === root || absPath.startsWith(base);
}

// Never serve any .git directory, in any namespace. Checked on the URL segments before any
// filesystem resolution, so an encoded traversal cannot dodge it.
function pathNamesGitDir(urlPath) {
  return urlPath.split("/").some((segment) => segment.toLowerCase() === ".git");
}

// Resolve a /projects/<key>/<relative...> URL to { absPath } | { status } using the registry.
async function resolveVirtualPath(urlPath) {
  const rest = urlPath.slice(PROJECTS_URL_PREFIX.length);
  const slash = rest.indexOf("/");
  if (slash <= 0) return { status: 404 };
  const key = rest.slice(0, slash);
  const relativePath = rest.slice(slash + 1);
  if (!relativePath) return { status: 404 };
  const registry = await readRegistry();
  const root = registry.entries.get(key);
  if (!root) return { status: 404 };
  const absPath = normalize(join(root, relativePath));
  if (!isInsideRoot(absPath, root)) return { status: 403 };
  return { absPath };
}

// ---------------------------------------------------------------- write routes (O4.P12)

// Match /projects/<key>/<one of the two write suffixes>. Returns { key, endpoint } or null.
// Routing happens on the DECODED path, so an encoded form of the same URL matches too.
function matchWriteRoute(urlPath) {
  if (!urlPath.startsWith(PROJECTS_URL_PREFIX)) return null;
  const rest = urlPath.slice(PROJECTS_URL_PREFIX.length);
  const slash = rest.indexOf("/");
  if (slash <= 0) return null;
  const key = rest.slice(0, slash);
  const suffix = rest.slice(slash + 1);
  if (suffix === ROADMAP_EDIT_SUFFIX) return { key, endpoint: "roadmap_edit" };
  if (suffix === HISTORY_SYNC_SUFFIX) return { key, endpoint: "history_sync" };
  return null;
}

// THE BOUNDARY GUARD (O4.P12). Every write destination is verified AFTER full path resolution:
// it must sit inside the REGISTERED project root, must not be inside the derived `.project/`
// folder (only the emitter writes there; a roadmap edit landing there would be silently undone
// by the next emission), and must not name `.git`. A registry entry or layout that composes a
// destination anywhere else is refused here — the write is rejected and reported, not executed.
function resolveCanonicalWritePath(root, relativePath) {
  const absRoot = resolve(root);
  const dest = resolve(absRoot, relativePath);
  if (!isInsideRoot(dest, absRoot)) {
    throw new Error(`write destination escapes the registered project root: ${dest}`);
  }
  const segments = relative(absRoot, dest).split(sep);
  if (segments.some((segment) => segment.toLowerCase() === ".git")) {
    throw new Error(`write destination names .git: ${dest}`);
  }
  if (segments[0] === PROJECT_DIR) {
    throw new Error(
      `write destination is inside the derived ${PROJECT_DIR}/ folder (emitter territory, ` +
      `overwritten on every emission): ${dest}`
    );
  }
  return dest;
}

// Local-only guard (source-console parity). The peer must be loopback and, when a browser
// sends an Origin, it must be a localhost origin. Non-browser clients (curl) send no Origin
// and are gated by the loopback peer check alone. The server already binds 127.0.0.1, so
// this is defense in depth against a cross-origin page trying to POST writes.
function isLoopbackPeer(req) {
  const addr = req.socket && req.socket.remoteAddress ? String(req.socket.remoteAddress) : "";
  return addr === "127.0.0.1" || addr === "::1" || addr === "::ffff:127.0.0.1";
}
function isLocalOrigin(req) {
  const origin = req.headers && req.headers.origin;
  if (!origin) return true;
  try {
    const host = new URL(origin).hostname;
    return host === "127.0.0.1" || host === "localhost" || host === "::1";
  } catch {
    return false;
  }
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(payload));
}

// CONTRATO §10.d — run ids declared by the OTHER registered projects' trees. A depends_on
// entry that resolves in one of them is an external dependency (legal); one that resolves
// nowhere is dangling (malformed). Composed per request from the registry: pure reads, and
// no project identity enters the engine — the set is data.
async function externalRunIdsFor(activeKey) {
  const registry = await readRegistry();
  const ids = new Set();
  for (const [key, root] of registry.entries) {
    if (key === activeKey) continue;
    let layout = null;
    try {
      layout = detectRootLayout(root);
    } catch {
      continue;
    }
    if (!layout) continue;
    for (const { run } of flattenRoadmapTree(layout.tree)) {
      if (run && typeof run.run_id === "string" && run.run_id) ids.add(run.run_id);
    }
  }
  return ids;
}

// The post-write authority injected into applyPlan: re-read the file that was just renamed
// into place, and verify it parses, keeps every engine invariant (with external dependencies
// resolved against the registry), and still has the tree shape the emitter serves. A failure
// rolls the canonical back from backup, so no edit can leave the file unreadable to the
// emitter or to the next edit.
function writtenFileValidator(canonicalPath, externalRunIds) {
  return () => {
    try {
      const parsed = JSON.parse(readFileSync(canonicalPath, "utf8"));
      const errors = checkInvariants(parsed, { externalRunIds });
      if (!hasRoadmapTreeShape(parsed)) {
        errors.push("written file no longer has the objectives->phases->runs shape the emitter serves");
      }
      return errors.length
        ? { code: 1, output: errors.join("\n") }
        : { code: 0, output: "re-read OK: invariants and tree shape verified on the written file" };
    } catch (error) {
      return { code: 1, output: `could not re-read the written file: ${String(error && error.message || error)}` };
    }
  };
}

// Serialise applies: the engine names its backup/temp files with process.pid, so two
// concurrent applies in this single process would collide. Dry-runs never take the lock.
// (Cross-PROCESS writers — another server on the same canonical — are not locked out; the
// compare-and-swap baseline narrows that window to the plan→rename interval. See the record.)
let roadmapWriting = false;

// Map a non-ok plan stage to an HTTP status + machine reason (source-console parity).
function roadmapEditStageStatus(stage) {
  if (stage === "read") return { code: 500, reason: "roadmap_unreadable" };
  if (stage === "parse" || stage === "preflight") return { code: 409, reason: "roadmap_not_editable" };
  return { code: 422, reason: "refused" }; // mutate / postcheck: an engine refusal
}

// Resolve the write-route project: registered key -> root -> layout -> guarded canonical path.
// Every refusal names its reason; nothing is written on any refusal path.
async function resolveEditableProject(key) {
  const registry = await readRegistry();
  const root = registry.entries.get(key);
  if (!root) return { status: 404, reason: "unknown_project" };
  let layout = null;
  try {
    layout = detectRootLayout(root);
  } catch {
    layout = null;
  }
  if (!layout) return { status: 404, reason: "project_not_editable_no_layout" };
  let canonicalPath;
  try {
    canonicalPath = resolveCanonicalWritePath(root, layout.paths.roadmap);
  } catch (error) {
    return { status: 403, reason: "write_destination_out_of_bounds", detail: String(error && error.message || error) };
  }
  return { root, layout, canonicalPath };
}

// Bounded, local-only roadmap write endpoint for ONE registered project. dry-run (apply !==
// true) returns the remap preview + baseline and writes nothing; apply requires that baseline
// (compare-and-swap), re-plans against the current file, and on a match writes atomically via
// applyPlan with the written-file re-check as the authority (rollback on failure), then
// re-emits the project's `.project/` folder so the derived views agree with the canonical.
// The target path is ALWAYS the layout-resolved canonical roadmap; a path is never accepted
// from the client.
async function handleRoadmapEdit(req, res, key) {
  if (req.method !== "POST") {
    // The client probes edit availability with a GET and expects 405 method_not_allowed
    // exactly when the endpoint exists for this project; an uneditable or unknown project
    // answers 404 so edit mode honestly refuses to turn on.
    const project = await resolveEditableProject(key);
    if (project.status) {
      sendJson(res, project.status, { ok: false, reason: project.reason, ...(project.detail ? { detail: project.detail } : {}) });
      return;
    }
    sendJson(res, 405, { ok: false, reason: "method_not_allowed" });
    return;
  }
  if (!isLoopbackPeer(req)) {
    sendJson(res, 403, { ok: false, reason: "forbidden_nonlocal" });
    return;
  }
  if (!isLocalOrigin(req)) {
    sendJson(res, 403, { ok: false, reason: "forbidden_origin" });
    return;
  }

  let body = "";
  let aborted = false;
  req.on("data", (chunk) => {
    if (aborted) return;
    body += chunk;
    if (body.length > ROADMAP_EDIT_MAX_BODY) {
      aborted = true;
      sendJson(res, 413, { ok: false, reason: "payload_too_large" });
      req.destroy();
    }
  });
  req.on("error", () => {
    if (!aborted) {
      aborted = true;
      try { sendJson(res, 400, { ok: false, reason: "bad_request" }); } catch { /* socket gone */ }
    }
  });
  req.on("end", async () => {
    if (aborted) return;
    let parsed;
    try {
      parsed = JSON.parse(body || "");
    } catch {
      sendJson(res, 400, { ok: false, reason: "bad_request" });
      return;
    }
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      sendJson(res, 400, { ok: false, reason: "bad_request" });
      return;
    }
    const op = parsed.op;
    const args = parsed.args && typeof parsed.args === "object" && !Array.isArray(parsed.args) ? parsed.args : {};
    const wantApply = parsed.apply === true;
    if (typeof op !== "string" || !KNOWN_OPS.includes(op)) {
      sendJson(res, 422, { ok: false, applied: false, errors: [`unknown op ${JSON.stringify(op)}; expected one of ${KNOWN_OPS.join(", ")}`], warnings: [] });
      return;
    }

    const project = await resolveEditableProject(key);
    if (project.status) {
      sendJson(res, project.status, { ok: false, reason: project.reason, ...(project.detail ? { detail: project.detail } : {}) });
      return;
    }
    const externalRunIds = await externalRunIdsFor(key);

    // Dry-run: plan against the layout-resolved canonical path and return the preview (no write).
    if (!wantApply) {
      let plan;
      try {
        plan = planEdit({ filePath: project.canonicalPath, op, args, externalRunIds });
      } catch (error) {
        sendJson(res, 500, { ok: false, reason: `unexpected: ${String(error && error.message || error).slice(0, 200)}` });
        return;
      }
      if (plan.ok) {
        sendJson(res, 200, { ok: true, op, applied: false, dryRun: true, remap: plan.remap, warnings: plan.warnings, bytes: plan.bytes, baseline: plan.baseline });
      } else {
        const s = roadmapEditStageStatus(plan.stage);
        sendJson(res, s.code, { ok: false, applied: false, reason: s.reason, errors: plan.errors, warnings: plan.warnings });
      }
      return;
    }

    // Apply: require the dry-run baseline (compare-and-swap), then write once under the lock.
    const clientBaseline = parsed.baseline;
    if (typeof clientBaseline !== "string" || !clientBaseline) {
      sendJson(res, 400, { ok: false, reason: "baseline_required" });
      return;
    }
    if (roadmapWriting) {
      sendJson(res, 409, { ok: false, reason: "write_in_progress" });
      return;
    }
    roadmapWriting = true;
    try {
      let plan;
      try {
        plan = planEdit({ filePath: project.canonicalPath, op, args, externalRunIds });
      } catch (error) {
        sendJson(res, 500, { ok: false, reason: `unexpected: ${String(error && error.message || error).slice(0, 200)}` });
        return;
      }
      if (!plan.ok) {
        const s = roadmapEditStageStatus(plan.stage);
        sendJson(res, s.code, { ok: false, applied: false, reason: s.reason, errors: plan.errors, warnings: plan.warnings });
        return;
      }
      // Compare-and-swap: the file must be byte-identical to what the dry-run planned against.
      if (plan.baseline !== clientBaseline) {
        sendJson(res, 409, { ok: false, applied: false, reason: "stale_baseline", currentBaseline: plan.baseline, yourBaseline: clientBaseline });
        return;
      }
      // Real write: atomic temp+rename with tmpdir backup; the written-file re-check is the
      // authority and a failure restores the backup.
      let applyResult;
      try {
        applyResult = applyPlan({
          filePath: project.canonicalPath,
          serialized: plan.serialized,
          validate: writtenFileValidator(project.canonicalPath, externalRunIds)
        });
      } catch (error) {
        sendJson(res, 500, { ok: false, reason: `unexpected: ${String(error && error.message || error).slice(0, 200)}` });
        return;
      }
      if (applyResult.rolledBack) {
        logLine(`roadmap edit REJECTED on re-check (project=${key} op=${op}); restored from backup ${applyResult.backupPath}`);
        sendJson(res, 409, { ok: false, applied: false, rolledBack: true, reason: "validator_rejected", validatorOutput: applyResult.validatorOutput, backupPath: applyResult.backupPath });
        return;
      }
      // COHERENCE AFTER THE WRITE (O4.P12): re-emit the edited project's `.project/` folder
      // before answering, so the console's next read (the client re-fetches roadmap.json
      // immediately) reflects the canonical that was just written. Automatic, not operator-
      // driven: a manual step here would guarantee a window in which the console shows the
      // old tree and the operator reads their edit as lost. If the re-emission itself fails,
      // the canonical write STANDS (it re-checked green; rolling it back would lose the edit
      // to protect a derivable folder) and the failure is reported, not hidden.
      let reemit;
      try {
        const emitted = writeProjectFolder(project.root);
        reemit = { ok: true, files: emitted.files.length, layout: emitted.layout };
      } catch (error) {
        reemit = { ok: false, reason: String(error && error.message || error).slice(0, 300) };
        logLine(`re-emission after roadmap edit FAILED (project=${key}): ${reemit.reason}`);
      }
      let newBaseline = null;
      try { newBaseline = loadCurrent(project.canonicalPath).baseline; } catch { newBaseline = null; }
      logLine(`roadmap edit applied: project=${key} op=${op}; ${applyResult.bytes} bytes; backup=${applyResult.backupPath}; reemit=${reemit.ok ? "ok" : "FAILED"}`);
      sendJson(res, 200, { ok: true, op, applied: true, dryRun: false, remap: plan.remap, warnings: plan.warnings, bytes: applyResult.bytes, backupPath: applyResult.backupPath, validatorRan: true, baseline: newBaseline, reemit });
    } finally {
      roadmapWriting = false;
    }
  });
}

// Bounded, local-only manual History sync for ONE registered project. A POST re-emits that
// project's `.project/git_history.json` through the projector's own emitter (read-only Git,
// atomic write, same guard as every emission) and returns the result as JSON. It refuses a
// project no layout claims: single-artifact emission is a refresh for projects the emitter
// already serves, never the first write into a root whose emission phase has not run.
async function handleHistorySync(req, res, key) {
  if (req.method !== "POST") {
    sendJson(res, 405, { ok: false, reason: "method_not_allowed" });
    return;
  }
  if (!isLoopbackPeer(req)) {
    sendJson(res, 403, { ok: false, reason: "forbidden_nonlocal" });
    return;
  }
  if (!isLocalOrigin(req)) {
    sendJson(res, 403, { ok: false, reason: "forbidden_origin" });
    return;
  }
  const project = await resolveEditableProject(key);
  if (project.status) {
    sendJson(res, project.status, { ok: false, reason: project.reason, ...(project.detail ? { detail: project.detail } : {}) });
    return;
  }
  let result;
  try {
    result = writeGitHistoryFile(project.root);
  } catch (error) {
    sendJson(res, 500, { ok: false, reason: `unexpected: ${String(error && error.message || error).slice(0, 200)}` });
    return;
  }
  if (!result) {
    // The layout resolved (checked above), so a null here means Git itself was unavailable,
    // the root is not its own repository, or it has no commits — nothing was written.
    sendJson(res, 503, { ok: false, reason: "git_history_unavailable" });
    return;
  }
  logLine(`history sync: project=${key}; ${result.commit_total} commits / ${result.branches} branches; head=${String(result.head).slice(0, 8)}`);
  sendJson(res, 200, {
    ok: true,
    head: result.head,
    // O4.P13 — the emitter scopes the artifact to the repository's DEFAULT branch, so what it
    // reports back is which branch that was, not which branch this checkout happens to be on.
    default_branch: result.default_branch,
    branches: result.branches,
    visible_branches: result.branches,
    commit_total: result.commit_total,
    generated_at: result.generated_at || null
  });
}

// ---------------------------------------------------------------- request funnel

const server = http.createServer(async (req, res) => {
  let urlPath;
  try {
    urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  } catch {
    res.writeHead(400);
    res.end("bad request");
    return;
  }
  if (urlPath.includes("\0")) {
    res.writeHead(400);
    res.end("bad request");
    return;
  }
  if (pathNamesGitDir(urlPath)) {
    res.writeHead(403);
    res.end("forbidden");
    return;
  }

  // The two write routes are matched BEFORE the read-only method gate and before any static
  // resolution. Each handler gates its own method (GET on the edit route is the client's
  // availability probe and answers 405 method_not_allowed / 404, never a file).
  const writeRoute = matchWriteRoute(urlPath);
  if (writeRoute) {
    if (writeRoute.endpoint === "roadmap_edit") {
      await handleRoadmapEdit(req, res, writeRoute.key);
    } else {
      await handleHistorySync(req, res, writeRoute.key);
    }
    return;
  }

  // Read-only by method for EVERYTHING else: the two routes above are the only paths on which
  // any method beyond GET/HEAD does anything, and nothing below this line has to know writes exist.
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, {
      "Content-Type": "application/json; charset=utf-8",
      "Allow": "GET, HEAD",
      "Cache-Control": "no-store"
    });
    res.end(JSON.stringify({ ok: false, reason: "read_only_console" }));
    return;
  }

  let absPath;
  if (urlPath === REGISTRY_URL_PATH) {
    // The registry URL is fixed for the client; the file behind it honours PC_REGISTRY.
    absPath = activeRegistryPath();
  } else if (urlPath.startsWith(PROJECTS_URL_PREFIX)) {
    const resolved = await resolveVirtualPath(urlPath);
    if (!resolved.absPath) {
      res.writeHead(resolved.status);
      res.end(resolved.status === 403 ? "forbidden" : "not found");
      return;
    }
    absPath = resolved.absPath;
  } else {
    const rel = urlPath === "/" ? ENTRY : urlPath;
    absPath = normalize(join(REPO_ROOT, rel));
    if (!isInsideRoot(absPath, REPO_ROOT)) {
      res.writeHead(403);
      res.end("forbidden");
      return;
    }
  }

  try {
    const data = await readFile(absPath);
    res.writeHead(200, {
      "Content-Type": MIME[extname(absPath).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    res.end(req.method === "HEAD" ? undefined : data);
  } catch {
    res.writeHead(404);
    res.end("not found");
  }
});

server.on("error", (error) => {
  if (error && error.code === "EADDRINUSE") {
    logLine(`port ${PORT} is already in use. Set PC_PORT to a free port and retry.`);
  } else {
    logLine(`server error: ${String((error && error.message) || error)}`);
  }
  process.exit(1);
});

// Boot only when run directly, so importing this module (e.g. from a test) binds no port.
const RUN_DIRECTLY = process.argv[1]
  ? resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))
  : false;

if (RUN_DIRECTLY) {
  server.listen(PORT, HOST, () => {
    logLine(`serving ${REPO_ROOT} (GET/HEAD everywhere; the only write routes are per-project roadmap edit and history sync)`);
    logLine(`registry: ${activeRegistryPath()}`);
    logLine(`open  http://${HOST}:${PORT}${ENTRY}`);
  });
}

export {
  server,
  PORT,
  HOST,
  ENTRY,
  REPO_ROOT,
  REGISTRY_URL_PATH,
  PROJECTS_URL_PREFIX,
  ROADMAP_EDIT_SUFFIX,
  HISTORY_SYNC_SUFFIX,
  activeRegistryPath,
  readRegistry,
  resolveVirtualPath,
  pathNamesGitDir,
  matchWriteRoute,
  resolveCanonicalWritePath,
  externalRunIdsFor
};
