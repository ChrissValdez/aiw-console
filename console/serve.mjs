// Consola global — prototipo · servidor local READ-ONLY
// ---------------------------------------------------------------------------
// Un comando, un puerto (patrón análogo a la consola local de Cantu:
// tools/project-console/serve-project-console.mjs). Diferencias deliberadas:
//
//   - NO corre el proyector, NO toca .git, NO construye snapshot, NO escribe
//     NADA en disco. El prototipo lee roadmap_tree_v1 CRUDO y directo.
//   - Solo Node built-ins. Sin package.json ni npm install.
//   - GET (y HEAD) únicamente. Cualquier otro método → 405. No hay ninguna ruta
//     de escritura: read-only estricto.
//
// Qué expone, y NADA más:
//   /                     → redirige a la consola
//   /web/**               → los assets estáticos del prototipo (console/web/)
//   /data/roadmap.json    → el archivo real roadmap/roadmap.json, leído en cada
//                           request (si el archivo cambia, la pantalla cambia)
//
// Arranque:
//   node console/serve.mjs
//   (variable CONSOLE_PORT opcional para cambiar el puerto)
// ---------------------------------------------------------------------------

import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = resolve(fileURLToPath(import.meta.url), "..");
const REPO_ROOT = resolve(HERE, ".."); // console/ vive en la raíz del repo aiw-console
const WEB_ROOT = join(HERE, "web"); // console/web/
const ROADMAP_FILE = join(REPO_ROOT, "roadmap", "roadmap.json"); // el dato REAL, crudo

const PORT = Number(process.env.CONSOLE_PORT) || 8790;
const HOST = "127.0.0.1";
const ENTRY = "/web/index.html";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

function send(res, status, body, headers = {}) {
  res.writeHead(status, {
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    ...headers
  });
  res.end(body);
}

// Sirve un archivo estático de console/web/, con guardia contra path traversal:
// la ruta resuelta debe quedar DENTRO de WEB_ROOT.
async function serveStatic(res, urlPath) {
  const rel = normalize(decodeURIComponent(urlPath.replace(/^\/web\/?/, ""))).replace(/^(\.\.[/\\])+/, "");
  const abs = join(WEB_ROOT, rel);
  if (abs !== WEB_ROOT && !abs.startsWith(WEB_ROOT + sep)) {
    return send(res, 403, "Forbidden");
  }
  try {
    const data = await readFile(abs);
    send(res, 200, data, { "Content-Type": MIME[extname(abs)] || "application/octet-stream" });
  } catch {
    send(res, 404, "Not found");
  }
}

// Sirve el roadmap real, leído crudo de disco en cada request. Nunca lo escribe.
async function serveRoadmap(res) {
  try {
    const data = await readFile(ROADMAP_FILE);
    send(res, 200, data, { "Content-Type": MIME[".json"] });
  } catch (err) {
    send(res, 404, JSON.stringify({ error: `No se pudo leer ${ROADMAP_FILE}: ${err.message}` }), {
      "Content-Type": MIME[".json"]
    });
  }
}

const server = http.createServer(async (req, res) => {
  // Read-only estricto: solo GET/HEAD.
  if (req.method !== "GET" && req.method !== "HEAD") {
    return send(res, 405, "Method Not Allowed", { Allow: "GET, HEAD" });
  }

  const urlPath = (req.url || "/").split("?")[0];

  if (urlPath === "/" || urlPath === "/web" || urlPath === "/web/") {
    return send(res, 302, "", { Location: ENTRY });
  }
  if (urlPath === "/data/roadmap.json") {
    return serveRoadmap(res);
  }
  if (urlPath.startsWith("/web/")) {
    return serveStatic(res, urlPath);
  }
  send(res, 404, "Not found");
});

server.listen(PORT, HOST, () => {
  console.log(`Consola global (prototipo, read-only) → http://${HOST}:${PORT}${ENTRY}`);
  console.log(`Leyendo el roadmap REAL crudo: ${ROADMAP_FILE}`);
});
