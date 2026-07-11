// Project Console — local static server with automatic Git history sync + project projection.
//
// Serves the repository root over HTTP (so docs/project-console can fetch ../../.aiw/...)
// and keeps .aiw/views/git_history.snapshot.json current: it builds the snapshot once at
// startup, then watches the local .git metadata and rebuilds (debounced, gated by a cheap
// Git signature) whenever HEAD / refs / logs change — i.e. on commit, branch switch,
// pull, merge, or reset. No Git hooks, no scheduler, no dependencies.
//
// At startup it ALSO runs the AIW projector once per project listed in an optional
// projects.config.json at the repo root, writing each resulting console snapshot into this
// repo's .aiw/views/project_console.snapshot.json (the canonical path the UI fetches) — the
// same auto-rebuild treatment git_history already gets, killing the manual snapshot ritual.
// Missing or invalid config → serve exactly as today (fail-soft, logged).
//
// Boundaries:
//   - Node built-ins only. No package.json / npm install required.
//   - Mutates ONLY .aiw/views/*.snapshot.json (git history via its builder, project console
//     via the projector). Reads each configured project root; writes only into this repo.
//   - Runs read-only Git commands (through build-git-history-snapshot.mjs).
//   - Never serves the .git directory.
//
// Start:
//   node tools/project-console/serve-project-console.mjs
//   (optional PC_PORT env var to override the default port)

import http from "node:http";
import { readFile } from "node:fs/promises";
import { watch, existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { extname, join, normalize, resolve, sep, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { buildGitHistorySnapshot, gitSignature } from "./build-git-history-snapshot.mjs";
import { buildSnapshot } from "../projector/project.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..", "..");
const GIT_DIR = join(REPO_ROOT, ".git");
const PROJECTS_CONFIG = join(REPO_ROOT, "projects.config.json");
const VIEWS_DIR = join(REPO_ROOT, ".aiw", "views");
const CONSOLE_SNAPSHOT_NAME = "project_console.snapshot.json";
const ENTRY = "/docs/project-console/index.html";
// Internal, local-only endpoint the History tab POSTs to force a snapshot rebuild.
const HISTORY_SYNC_PATH = "/__project-console/history/sync";
const PORT = Number(process.env.PC_PORT) || 8787;
const HOST = "127.0.0.1";
const DEBOUNCE_MS = 400;
const SAFETY_POLL_MS = 15000;

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

// ---------------------------------------------------------------- snapshot builds

let building = false;
let pending = false;
let lastSignature = null;

function runBuild(trigger) {
  if (building) {
    pending = true;
    return;
  }
  building = true;
  let result;
  try {
    result = buildGitHistorySnapshot();
  } catch (error) {
    result = { ok: false, written: false, reason: `unexpected: ${String(error && error.message || error).slice(0, 200)}` };
  }
  building = false;
  if (result.ok) {
    logLine(`snapshot rebuilt (${trigger}): ${result.commit_total} commits / ${result.branches} branches; current=${result.current_branch}; head=${String(result.head).slice(0, 8)}`);
  } else if (result.reason === "git_unavailable") {
    logLine(`git unavailable (${trigger}); existing snapshot left untouched.`);
  } else {
    logLine(`snapshot rebuild failed (${trigger}: ${result.reason}); existing snapshot left untouched.`);
  }
  if (pending) {
    pending = false;
    runBuild("coalesced");
  }
}

// Rebuild only when the Git signature actually changed (skips object/index churn and
// no-op filesystem events). Falls back to an unconditional build if the signature can't
// be computed (e.g. git momentarily unavailable) so a real change is never missed.
function maybeRebuild(trigger) {
  const sig = gitSignature();
  if (sig !== null && sig === lastSignature) return;
  lastSignature = sig;
  runBuild(trigger);
}

let debounceTimer = null;
function scheduleRebuild(trigger) {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    debounceTimer = null;
    maybeRebuild(trigger);
  }, DEBOUNCE_MS);
}

// ---------------------------------------------------------------- startup projection

// Read projects.config.json → an array of { root, id? } entries. Fail-soft: a missing,
// unreadable, or malformed config yields [] and the server proceeds exactly as before.
// Shape (documented in docs/snapshot-schema-v1.md):
//   { "projects": [ { "root": "../aiw", "id": "aiw" } ] }
// `root` is a project root (relative to the repo root, or absolute); `id` is an optional
// label used only in logs. Entries without a usable `root` string are skipped.
export function loadProjectsConfig(configPath, log = logLine) {
  if (!existsSync(configPath)) return [];
  let parsed;
  try {
    parsed = JSON.parse(readFileSync(configPath, "utf8"));
  } catch (error) {
    log(`projects.config.json is invalid JSON (${String(error && error.message || error).slice(0, 160)}); skipping startup projection.`);
    return [];
  }
  const list = parsed && Array.isArray(parsed.projects) ? parsed.projects : null;
  if (!list) {
    log("projects.config.json has no `projects` array; skipping startup projection.");
    return [];
  }
  return list
    .map((entry) => (entry && typeof entry.root === "string" && entry.root.trim() ? { root: entry.root.trim(), id: typeof entry.id === "string" ? entry.id : null } : null))
    .filter(Boolean);
}

// Atomically write the console snapshot into this repo's .aiw/views/ (temp + rename), mirroring
// how the projector writes its own artifact. Returns the absolute output path.
function writeConsoleSnapshot(viewsDir, snapshot) {
  mkdirSync(viewsDir, { recursive: true });
  const outPath = join(viewsDir, CONSOLE_SNAPSHOT_NAME);
  const tmp = `${outPath}.tmp`;
  writeFileSync(tmp, JSON.stringify(snapshot, null, 2) + "\n", "utf8");
  renameSync(tmp, outPath);
  return outPath;
}

// Run the projector once per configured project and land the resulting snapshot in this repo's
// .aiw/views/ (the canonical path the UI fetches). Fail-soft per project and overall: any error
// is logged and the server keeps serving. When several projects are configured they populate the
// same canonical file (last successful projection wins); the console renders one project.
export function runStartupProjection(opts = {}) {
  const repoRoot = opts.repoRoot || REPO_ROOT;
  const configPath = opts.configPath || (repoRoot === REPO_ROOT ? PROJECTS_CONFIG : join(repoRoot, "projects.config.json"));
  const viewsDir = opts.viewsDir || join(repoRoot, ".aiw", "views");
  const log = opts.log || logLine;
  const now = opts.now;

  const projects = loadProjectsConfig(configPath, log);
  if (projects.length === 0) {
    log("no projects.config.json (or no projects listed); serving without startup projection.");
    return { projected: [] };
  }

  const projected = [];
  for (const entry of projects) {
    const label = entry.id || entry.root;
    const root = resolve(repoRoot, entry.root);
    if (!existsSync(root)) {
      log(`startup projection skipped for '${label}': project root ${root} does not exist.`);
      continue;
    }
    try {
      const snapshot = buildSnapshot(root, now ? { now } : {});
      const outPath = writeConsoleSnapshot(viewsDir, snapshot);
      log(`startup projection ok (${label}): project=${snapshot.project_id}; objectives=${snapshot.roadmap_tree.counts.total}; wrote ${outPath}`);
      projected.push({ id: label, root, path: outPath, project_id: snapshot.project_id });
    } catch (error) {
      log(`startup projection failed for '${label}': ${String(error && error.message || error).slice(0, 200)}; existing snapshot left untouched.`);
    }
  }
  return { projected };
}

// ---------------------------------------------------------------- .git watchers

const IGNORED_WATCH = /^(objects|index|index\.lock|COMMIT_EDITMSG|FETCH_HEAD|hooks|lfs|modules)/;

function watchTarget(relPath, recursive) {
  const abs = join(GIT_DIR, relPath);
  try {
    const watcher = watch(abs, { recursive }, (_eventType, filename) => {
      const name = filename ? String(filename) : "";
      // For the .git root watch, ignore high-churn internals; ref/log watches are already scoped.
      if (relPath === "" && IGNORED_WATCH.test(name)) return;
      scheduleRebuild(`watch:${relPath || ".git"}/${name}`);
    });
    watcher.on("error", (error) => logLine(`watch error on .git/${relPath}: ${String(error.message || error)}`));
    return watcher;
  } catch (error) {
    logLine(`could not watch .git/${relPath} (${String(error.message || error)}); relying on the safety poll.`);
    return null;
  }
}

function startWatchers() {
  // logs/ (reflog: commit, checkout, merge, pull, reset) and refs/ (branch tips) are
  // small and safe to watch recursively; the .git root (non-recursive) catches HEAD,
  // ORIG_HEAD, MERGE_HEAD, and packed-refs.
  watchTarget("logs", true);
  watchTarget("refs", true);
  watchTarget("", false);
}

// ---------------------------------------------------------------- manual sync endpoint

// Bounded, local-only manual History sync. A POST forces a one-off snapshot rebuild via
// the same read-only builder used at startup and by the .git watcher (no duplicated logic,
// no dependencies, no scheduler, no hooks) and returns the rebuild result as JSON. It never
// serves .git and never mutates anything other than the snapshot the builder already owns.
function handleHistorySync(req, res) {
  const sendJson = (status, payload) => {
    res.writeHead(status, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    });
    res.end(JSON.stringify(payload));
  };
  if (req.method !== "POST") {
    sendJson(405, { ok: false, reason: "method_not_allowed" });
    return;
  }
  let result;
  try {
    result = buildGitHistorySnapshot();
  } catch (error) {
    result = { ok: false, reason: `unexpected: ${String(error && error.message || error).slice(0, 200)}` };
  }
  if (result.ok) {
    // Keep the watcher's signature gate current so this manual build isn't immediately repeated.
    lastSignature = gitSignature();
    logLine(`manual sync: ${result.commit_total} commits / ${result.branches} branches; current=${result.current_branch}; head=${String(result.head).slice(0, 8)}`);
    sendJson(200, {
      ok: true,
      head: result.head,
      current_branch: result.current_branch,
      branches: result.branches,
      visible_branches: result.branches,
      commit_total: result.commit_total,
      run_associated: result.run_associated,
      generated_at: result.generated_at || null
    });
    return;
  }
  logLine(`manual sync failed: ${result.reason}`);
  sendJson(result.reason === "git_unavailable" ? 503 : 500, { ok: false, reason: result.reason || "rebuild_failed" });
}

// ---------------------------------------------------------------- static server

function isPathSafe(absPath) {
  const root = REPO_ROOT.endsWith(sep) ? REPO_ROOT : REPO_ROOT + sep;
  if (absPath !== REPO_ROOT && !absPath.startsWith(root)) return false;
  // Never serve the .git directory.
  if (absPath === GIT_DIR || absPath.startsWith(GIT_DIR + sep)) return false;
  return true;
}

const server = http.createServer(async (req, res) => {
  let urlPath;
  try {
    urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  } catch {
    res.writeHead(400);
    res.end("bad request");
    return;
  }
  // Internal manual-sync endpoint is handled before any static/file resolution.
  if (urlPath === HISTORY_SYNC_PATH) {
    handleHistorySync(req, res);
    return;
  }
  const rel = urlPath === "/" ? ENTRY : urlPath;
  const absPath = normalize(join(REPO_ROOT, rel));
  if (!isPathSafe(absPath)) {
    res.writeHead(403);
    res.end("forbidden");
    return;
  }
  try {
    const data = await readFile(absPath);
    res.writeHead(200, {
      "Content-Type": MIME[extname(absPath).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end("not found");
  }
});

server.on("error", (error) => {
  if (error && error.code === "EADDRINUSE") {
    logLine(`port ${PORT} is already in use. Set PC_PORT to a free port and retry.`);
  } else {
    logLine(`server error: ${String(error && error.message || error)}`);
  }
  process.exit(1);
});

// ---------------------------------------------------------------- startup

// Guard the side-effectful startup so importing this module (e.g. from tests) does not bind a
// port or spawn watchers; only a direct `node serve-project-console.mjs` invocation starts up.
const invokedDirectly = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  logLine("starting…");
  runStartupProjection();
  runBuild("startup");
  lastSignature = gitSignature();
  startWatchers();
  setInterval(() => maybeRebuild("safety-poll"), SAFETY_POLL_MS).unref();

  server.listen(PORT, HOST, () => {
    logLine(`serving ${REPO_ROOT}`);
    logLine(`open  http://${HOST}:${PORT}${ENTRY}`);
    logLine("watching .git for commits / branch switches / merges / pulls — History auto-syncs.");
  });
}
