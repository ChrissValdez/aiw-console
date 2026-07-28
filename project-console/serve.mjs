// Project Console — local server for N projects: read-only static serving plus EXACTLY THREE
// write routes (O4.P12 opened two; O4.P14 adds the third).
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
// THE THREE WRITE ROUTES (D-050 — this console stops being read-only, deliberately and only here):
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
//   POST /projects/<key>/__project-console/project/emit    re-emits ALL SIX artifacts of that
//        project's `.project/` folder from its canonical roadmap (O4.P14). The same gesture the
//        route above already performs for ONE derived artifact, extended to the whole folder.
//
// WHY THE THIRD ROUTE EXISTS. `.project/` is a PROJECTION of a canonical the console does not
// own. Two of the ways it gets re-emitted are already here — after a confirmed roadmap edit, and
// per-artifact for History — but a canonical edited by ANYONE ELSE (a workshop run, an editor,
// another agent) leaves the projection behind with no way to catch it up. Under parallel lanes
// that is the normal case, not the exception: workshop runs deliberately do NOT re-emit, because
// two lanes writing the same `.project/` would overwrite each other. Before this route the only
// way to force an emission from the console was to INVENT a roadmap edit (add a space to a title
// and take it out) purely for the re-emission that follows a confirm. That detour is what this
// route removes.
//
// A BUTTON, NOT AN AUTO-REFRESH — deliberately. This server writes `.project/` only when the
// operator asks. Watching the canonical and re-emitting on change would make files move under
// the operator's feet and dirty their Git working tree without an action of theirs. The console
// writes on request, visibly, and never on a timer. Nothing here polls, watches or schedules.
//
// All three routes go through the same funnel: the project must be REGISTERED (the key resolves
// in the registry), its root must be claimed by a known layout (detectRootLayout — admission by
// tree SHAPE, never by a schema-name string), and every write destination is verified INSIDE
// that registered root after full path resolution. The two path guards are MIRROR IMAGES of one
// another and neither can write where the other does:
//   resolveCanonicalWritePath   inside the root, and NEVER inside the derived `.project/`
//                               (canonical territory — the roadmap edit route).
//   resolveEmissionWritePath    inside the root, and ONLY inside the derived `.project/`
//                               (emitter territory — the emission routes).
// A registry entry whose root composes a destination anywhere else is refused and reported,
// not executed.
//
// Everything else stays read-only by construction: any method other than GET/HEAD on any path
// that is not one of the three routes above answers 405 read_only_console; `.git` is never
// served or written in any namespace; escaping a root answers 403.
//
// NO GIT THAT WRITES, EVER. The emission reads Git to derive `git_history.json` (the same
// read-only `for-each-ref` / `rev-parse` / `log` the History emitter has always run). Nothing
// in this file stages, commits, pushes, or mutates a repository in any way: after re-emitting,
// the operator reviews the diff and commits it themselves.
//
// The registry is DATA, not code: no project name or path lives in this file. The env var
// PC_REGISTRY (path relative to the repo root, or absolute) points the server at an
// alternative registry file — used by the test suite and by operator QA to serve the
// synthetic fixture projects under tests/fixtures/multi/ without touching the real registry.
//
// Boundaries:
//   - Node built-ins only. No dependencies, no package install.
//   - Writes ONLY through the three routes above: the canonical roadmap of a registered project
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
  ROOT_LAYOUTS,
  PROJECT_DIR,
  PROJECT_GUARDRAILS_RELATIVE_PATH,
  PROJECT_NO_CLAIMS_RELATIVE_PATH,
  PROJECT_DOCS_INDEX_RELATIVE_PATH,
  PROJECT_ROADMAP_RELATIVE_PATH,
  PROJECT_GIT_HISTORY_RELATIVE_PATH,
  PROJECT_SNAPSHOT_RELATIVE_PATH
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
// The three write routes, as suffixes under /projects/<key>/. The client composes them from its
// active-project base, so the same constant shape serves every registered project. They are
// intercepted BEFORE static file resolution (like the source console's /__project-console/*),
// so a real file at any of these paths inside a project is shadowed, never served.
const ROADMAP_EDIT_SUFFIX = "__project-console/roadmap/edit";
const HISTORY_SYNC_SUFFIX = "__project-console/history/sync";
const PROJECT_EMIT_SUFFIX = "__project-console/project/emit";
const ROADMAP_EDIT_MAX_BODY = 1000000; // 1 MB cap on the request body

// THE SIX ARTIFACTS a full emission writes, in the emitter's own order (O4.P14). This list is
// not a second opinion about what `writeProjectFolder` emits: it is the set of destinations the
// boundary guard checks BEFORE the emitter runs, taken from the projector's own exported route
// constants so it cannot drift from them. `git_history` is written only when the root is its own
// repository — the emitter skips a null artifact — so a successful emission reports between five
// and six files and never pretends a skipped one was written.
const PROJECT_EMIT_ARTIFACT_PATHS = [
  ["guardrails", PROJECT_GUARDRAILS_RELATIVE_PATH],
  ["no_claims", PROJECT_NO_CLAIMS_RELATIVE_PATH],
  ["docs_index", PROJECT_DOCS_INDEX_RELATIVE_PATH],
  ["roadmap", PROJECT_ROADMAP_RELATIVE_PATH],
  ["git_history", PROJECT_GIT_HISTORY_RELATIVE_PATH],
  ["snapshot", PROJECT_SNAPSHOT_RELATIVE_PATH]
];
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

// ---------------------------------------------------------------- write routes (O4.P12 / O4.P14)

// Match /projects/<key>/<one of the three write suffixes>. Returns { key, endpoint } or null.
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
  if (suffix === PROJECT_EMIT_SUFFIX) return { key, endpoint: "project_emit" };
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

// THE OTHER HALF OF THE BOUNDARY GUARD (O4.P14) — the mirror image of the function above, and
// the reason the two write territories cannot overlap. An EMISSION destination must sit inside
// the registered project root, must not name `.git`, and must sit inside that root's derived
// `.project/` folder — the only place the emission routes may write. Where
// `resolveCanonicalWritePath` refuses everything INSIDE `.project/`, this refuses everything
// OUTSIDE it, so no registry entry and no artifact route can make an emission land on a
// canonical, on a source file, or anywhere in the repository at large.
function resolveEmissionWritePath(root, relativePath) {
  const absRoot = resolve(root);
  const projectDir = resolve(absRoot, PROJECT_DIR);
  const dest = resolve(absRoot, relativePath);
  if (!isInsideRoot(dest, absRoot)) {
    throw new Error(`emission destination escapes the registered project root: ${dest}`);
  }
  const segments = relative(absRoot, dest).split(sep);
  if (segments.some((segment) => segment.toLowerCase() === ".git")) {
    throw new Error(`emission destination names .git: ${dest}`);
  }
  if (dest === projectDir || !isInsideRoot(dest, projectDir)) {
    throw new Error(
      `emission destination is outside the derived ${PROJECT_DIR}/ folder (the only place an ` +
      `emission may write): ${dest}`
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

// ---------------------------------------------------------------- project emit (O4.P14)

// Repo-relative POSIX form of an absolute path — the shape §7 requires of every emitted path,
// and the shape a refusal must name a file in, so what the operator reads on screen is the same
// string they would type at a prompt.
function relativePosix(root, absPath) {
  return relative(resolve(root), absPath).split(sep).join("/");
}

// WHY A ROOT NO LAYOUT CLAIMS WAS REFUSED, file by file. `detectRootLayout` answers a single
// null: it probes each known layout's roadmap path and returns the first that both parses and
// conforms. A refusal that only says "no layout" leaves the operator guessing WHICH file the
// server looked for, so this re-walks the same list and reports a verdict per candidate. Pure
// reads; it decides nothing, it only explains a decision already taken.
function diagnoseCanonicalCandidates(root) {
  return ROOT_LAYOUTS.map((paths) => {
    const abs = resolve(root, paths.roadmap);
    const file = paths.roadmap.split(sep).join("/");
    let raw;
    try {
      raw = readFileSync(abs, "utf8");
    } catch {
      return { layout: paths.layout, file, verdict: "missing" };
    }
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (error) {
      return { layout: paths.layout, file, verdict: "unparsable", detail: String(error && error.message || error).slice(0, 200) };
    }
    if (!hasRoadmapTreeShape(parsed)) {
      return { layout: paths.layout, file, verdict: "not_a_roadmap_tree" };
    }
    return { layout: paths.layout, file, verdict: "ok" };
  });
}

// THE PRE-CHECK, and the reason an emission is never half-written. The canonical is read,
// parsed, shape-gated and run through the engine's invariants (with external dependencies
// resolved against the registry, exactly as the edit route does) BEFORE the emitter is allowed
// to open anything. A canonical that fails any of these stops the emission with a named reason
// and the FILE it is about — no artifact is touched, so `.project/` keeps whatever coherent
// state it already had rather than becoming a mix of old and new.
//
// Returns { ok:true, runs, objectives, model } or { ok:false, status, reason, file, ... }.
function inspectCanonicalForEmission(root, canonicalPath, externalRunIds) {
  const file = relativePosix(root, canonicalPath);
  let raw;
  try {
    raw = readFileSync(canonicalPath, "utf8");
  } catch (error) {
    return { ok: false, status: 409, reason: "canonical_missing", file, detail: String(error && error.message || error).slice(0, 200) };
  }
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    return { ok: false, status: 409, reason: "canonical_unparsable", file, detail: String(error && error.message || error).slice(0, 200) };
  }
  if (!hasRoadmapTreeShape(parsed)) {
    return {
      ok: false,
      status: 409,
      reason: "canonical_not_a_roadmap_tree",
      file,
      errors: ["the file does not have the objectives->phases->runs shape the emitter reads"]
    };
  }
  // THE ENGINE CAN THROW, and a throw here must still be a NAMED REFUSAL. The shape gate above
  // checks the three levels and their ids; it does not check the type of every field the engine
  // then walks. A canonical whose `depends_on` is a string instead of an array passes the gate
  // and makes `checkInvariants` throw on a non-iterable — found in QA, where it took the server
  // process down with it instead of answering. A malformed canonical is exactly the case this
  // gate exists for: it is reported by file, like every other refusal, and nothing is emitted.
  let errors;
  let flat;
  try {
    errors = checkInvariants(parsed, { externalRunIds });
    flat = flattenRoadmapTree(parsed);
  } catch (error) {
    return {
      ok: false,
      status: 409,
      reason: "canonical_not_a_roadmap_tree",
      file,
      errors: ["the file has the objectives->phases->runs shape but the roadmap engine could not read it"],
      detail: String(error && error.message || error).slice(0, 200)
    };
  }
  if (errors.length) {
    return { ok: false, status: 422, reason: "canonical_invariants_failed", file, errors };
  }
  return {
    ok: true,
    file,
    runs: flat.length,
    objectives: Array.isArray(parsed.objectives) ? parsed.objectives.length : 0
  };
}

// Serialise emissions the way applies are serialised. The projector's atomic writer names its
// temp file `<destination>.tmp` with no pid in it, so two concurrent emissions of the SAME
// project would race on the same six temp names. Under the lock each emission is a clean
// temp+rename per artifact and no `.tmp` survives it.
let projectEmitting = false;

// THE RE-EMISSION BUTTON'S ENDPOINT (O4.P14). A POST re-emits ALL SIX artifacts of ONE
// registered project's `.project/` folder from its canonical roadmap, through the projector's
// own `writeProjectFolder` — the same builder, the same guard and the same atomic writes the
// emission phase has always used. Nothing about WHICH project or WHERE its canonical lives is
// decided here: the registry resolves the root and the root's own layout resolves the canonical.
//
// The order of the gates is the contract: method, locality, project, boundary, canonical, lock,
// write. Every gate before the last one refuses without opening a file, and the canonical gate
// names the file it refused about. The answer carries NUMBERS — how many artifacts were written
// and how many runs the emitted tree ended up with — because a mute "done" cannot tell an
// operator whether the projection actually moved.
async function handleProjectEmit(req, res, key) {
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

  // Registered key -> root -> layout -> guarded canonical. Same funnel as the other two routes.
  const project = await resolveEditableProject(key);
  if (project.status) {
    const payload = { ok: false, reason: project.reason, ...(project.detail ? { detail: project.detail } : {}) };
    // A root no layout claims is the case an operator actually meets (today: the `aiw` kernel),
    // so the refusal says which files were looked for and what was wrong with each.
    if (project.reason === "project_not_editable_no_layout") {
      const root = (await readRegistry()).entries.get(key);
      if (root) payload.candidates = diagnoseCanonicalCandidates(root);
    }
    sendJson(res, project.status, payload);
    return;
  }

  // THE BOUNDARY GUARD, on all six destinations, before anything is opened. Composing them
  // here (rather than trusting the emitter) is what makes a registry entry that points at a
  // root the emission could escape a REFUSAL instead of a write.
  const destinations = [];
  try {
    for (const [artifact, relativePath] of PROJECT_EMIT_ARTIFACT_PATHS) {
      destinations.push({ artifact, path: resolveEmissionWritePath(project.root, relativePath) });
    }
  } catch (error) {
    sendJson(res, 403, {
      ok: false,
      reason: "write_destination_out_of_bounds",
      detail: String(error && error.message || error)
    });
    return;
  }

  // THE CANONICAL GATE. Nothing is written unless the source the projection is derived FROM
  // reads clean; a failure names the file and the emission does not run.
  const externalRunIds = await externalRunIdsFor(key);
  const canonical = inspectCanonicalForEmission(project.root, project.canonicalPath, externalRunIds);
  if (!canonical.ok) {
    logLine(`project emit REFUSED (project=${key}): ${canonical.reason} on ${canonical.file}; nothing written`);
    sendJson(res, canonical.status, {
      ok: false,
      reason: canonical.reason,
      file: canonical.file,
      ...(canonical.errors ? { errors: canonical.errors } : {}),
      ...(canonical.detail ? { detail: canonical.detail } : {})
    });
    return;
  }

  if (projectEmitting) {
    sendJson(res, 409, { ok: false, reason: "emit_in_progress" });
    return;
  }
  projectEmitting = true;
  let emitted;
  try {
    emitted = writeProjectFolder(project.root);
  } catch (error) {
    logLine(`project emit FAILED (project=${key}): ${String(error && error.message || error)}`);
    sendJson(res, 500, { ok: false, reason: "emit_failed", file: canonical.file, detail: String(error && error.message || error).slice(0, 300) });
    return;
  } finally {
    projectEmitting = false;
  }

  // What the emission ACTUALLY wrote — never the list it could have written. `git_history` is
  // absent from a root that is not its own repository, and the answer reports that honestly
  // rather than claiming six files every time.
  const files = emitted.files.map((file) => ({
    artifact: file.artifact,
    path: file.relative_path,
    bytes: file.bytes
  }));
  const snapshotFile = emitted.files.find((file) => file.artifact === "snapshot");
  const skipped = PROJECT_EMIT_ARTIFACT_PATHS
    .map(([artifact]) => artifact)
    .filter((artifact) => !files.some((file) => file.artifact === artifact));
  logLine(
    `project emit: project=${key}; ${files.length} artifacts from ${canonical.file}; ` +
    `${snapshotFile ? snapshotFile.runs : canonical.runs} runs` +
    `${skipped.length ? `; skipped ${skipped.join(", ")}` : ""}`
  );
  sendJson(res, 200, {
    ok: true,
    layout: emitted.layout,
    roadmap_model: emitted.roadmap_model,
    project_id: emitted.project_id,
    // The source this projection was derived from, named, so the acknowledgement can cite it.
    canonical: canonical.file,
    artifacts: files.length,
    files,
    skipped,
    objectives: snapshotFile ? snapshotFile.objectives : canonical.objectives,
    runs: snapshotFile ? snapshotFile.runs : canonical.runs,
    // Stated, not implied: this route runs no Git command that writes and never commits.
    committed: false
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

  // The three write routes are matched BEFORE the read-only method gate and before any static
  // resolution. Each handler gates its own method (GET on the edit route is the client's
  // availability probe and answers 405 method_not_allowed / 404, never a file).
  const writeRoute = matchWriteRoute(urlPath);
  if (writeRoute) {
    if (writeRoute.endpoint === "roadmap_edit") {
      await handleRoadmapEdit(req, res, writeRoute.key);
    } else if (writeRoute.endpoint === "history_sync") {
      await handleHistorySync(req, res, writeRoute.key);
    } else {
      await handleProjectEmit(req, res, writeRoute.key);
    }
    return;
  }

  // Read-only by method for EVERYTHING else: the three routes above are the only paths on which
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
    logLine(`serving ${REPO_ROOT} (GET/HEAD everywhere; the only write routes are per-project roadmap edit, history sync and project emit)`);
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
  PROJECT_EMIT_SUFFIX,
  PROJECT_EMIT_ARTIFACT_PATHS,
  activeRegistryPath,
  readRegistry,
  resolveVirtualPath,
  pathNamesGitDir,
  matchWriteRoute,
  resolveCanonicalWritePath,
  resolveEmissionWritePath,
  inspectCanonicalForEmission,
  diagnoseCanonicalCandidates,
  externalRunIdsFor
};
