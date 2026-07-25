// Project Console — local READ-ONLY static server for N projects.
//
// Serves two namespaces, both read-only:
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
// The registry is DATA, not code: no project name or path lives in this file. The env var
// PC_REGISTRY (path relative to the repo root, or absolute) points the server at an
// alternative registry file — used by the test suite and by operator QA to serve the
// synthetic fixture projects under tests/fixtures/multi/ without touching the real registry.
//
// It follows the static-server pattern of the console this port comes from, minus everything
// that could write: no roadmap edit endpoint, no history sync endpoint, no snapshot rebuild, no
// Git command, no watcher. The console is a reader; this server is a reader.
//
// Boundaries:
//   - Node built-ins only. No dependencies, no package install.
//   - Writes NOTHING, anywhere. There is no code path in this file that opens a file for writing.
//   - Answers GET and HEAD. Every other method gets 405, including on paths that do not exist:
//     a write attempt is refused as a method, not answered as a missing page.
//   - Never serves any .git/ directory — in this repo or in any registered project root.
//   - Outside the virtual namespace, never serves anything outside the repository root.
//
// Start (one command, one port):
//   node project-console/serve.mjs
//   (optional PC_PORT env var to override the default port;
//    optional PC_REGISTRY env var to serve an alternative project registry)

import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, resolve, sep, dirname, isAbsolute } from "node:path";
import { fileURLToPath } from "node:url";

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
  const relative = rest.slice(slash + 1);
  if (!relative) return { status: 404 };
  const registry = await readRegistry();
  const root = registry.entries.get(key);
  if (!root) return { status: 404 };
  const absPath = normalize(join(root, relative));
  if (!isInsideRoot(absPath, root)) return { status: 403 };
  return { absPath };
}

const server = http.createServer(async (req, res) => {
  // Read-only by method, before anything else is resolved. POST/PUT/PATCH/DELETE are refused
  // here and nowhere else has to know about them.
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, {
      "Content-Type": "application/json; charset=utf-8",
      "Allow": "GET, HEAD",
      "Cache-Control": "no-store"
    });
    res.end(JSON.stringify({ ok: false, reason: "read_only_console" }));
    return;
  }
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
    logLine(`serving ${REPO_ROOT} read-only (GET/HEAD only; every write answers 405)`);
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
  activeRegistryPath,
  readRegistry,
  resolveVirtualPath,
  pathNamesGitDir
};
