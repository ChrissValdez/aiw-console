// Project Console — local READ-ONLY static server.
//
// Serves the repository root over HTTP so project-console/index.html can fetch ../.project/*
// and the Docs reader can fetch repository-local Markdown bodies. That is all it does.
//
// It follows the static-server pattern of the console this port comes from, minus everything
// that could write: no roadmap edit endpoint, no history sync endpoint, no snapshot rebuild, no
// Git command, no watcher, no scheduler. The console is a reader; this server is a reader.
//
// Boundaries:
//   - Node built-ins only. No dependencies, no package install.
//   - Writes NOTHING, anywhere. There is no code path in this file that opens a file for writing.
//   - Answers GET and HEAD. Every other method gets 405, including on paths that do not exist:
//     a write attempt is refused as a method, not answered as a missing page.
//   - Never serves .git/, and never serves anything outside the repository root.
//
// Start (one command, one port):
//   node project-console/serve.mjs
//   (optional PC_PORT env var to override the default port)

import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, resolve, sep, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const GIT_DIR = join(REPO_ROOT, ".git");
// The console's entry point, and the only default this server has an opinion about.
const ENTRY = "/project-console/index.html";
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

function isPathSafe(absPath) {
  const root = REPO_ROOT.endsWith(sep) ? REPO_ROOT : REPO_ROOT + sep;
  if (absPath !== REPO_ROOT && !absPath.startsWith(root)) return false;
  // Never serve the .git directory.
  if (absPath === GIT_DIR || absPath.startsWith(GIT_DIR + sep)) return false;
  return true;
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
    logLine(`open  http://${HOST}:${PORT}${ENTRY}`);
  });
}

export { server, PORT, HOST, ENTRY, REPO_ROOT };
