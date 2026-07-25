// Server side of the multi-project shell (O4.P3): project DISCOVERY through the registry,
// the virtual /projects/<key>/ namespace, and read-only behaviour on every route. Runs the
// real serve.mjs server on an ephemeral port; the registry under test is the fixture one
// (tests/fixtures/multi/projects.json) selected via PC_REGISTRY, so the real registry file
// is exercised only by the "default registry" test and never edited.
import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { server, HOST, readRegistry, activeRegistryPath, REGISTRY_URL_PATH } from "../project-console/serve.mjs";

// fetch() resolves ../ segments client-side before the request leaves, so a traversal test
// must put the RAW path on the wire (the old console's tests used curl --path-as-is for the
// same reason). Plain node:http sends the path verbatim.
function rawRequest(port, path) {
  return new Promise((resolveRequest, reject) => {
    const request = http.request({ host: HOST, port, path, method: "GET" }, (response) => {
      response.resume();
      response.on("end", () => resolveRequest(response.statusCode));
    });
    request.on("error", reject);
    request.end();
  });
}

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const FIXTURE_REGISTRY = "tests/fixtures/multi/projects.json";

let baseUrl = "";

test.before(async () => {
  process.env.PC_REGISTRY = FIXTURE_REGISTRY;
  await new Promise((resolveListen) => server.listen(0, HOST, resolveListen));
  baseUrl = `http://${HOST}:${server.address().port}`;
});

test.after(async () => {
  delete process.env.PC_REGISTRY;
  await new Promise((resolveClose) => server.close(resolveClose));
});

test("discovery: the registry endpoint serves the ACTIVE registry file (PC_REGISTRY honoured)", async () => {
  const response = await fetch(`${baseUrl}${REGISTRY_URL_PATH}`);
  assert.equal(response.status, 200);
  const served = await response.json();
  const onDisk = JSON.parse(readFileSync(join(REPO_ROOT, FIXTURE_REGISTRY), "utf8"));
  assert.deepEqual(served, onDisk);
  assert.equal(served.projects.some((entry) => entry.key === "hilo-verde"), true);
});

test("discovery: without PC_REGISTRY the default is project-console/projects.json", () => {
  const saved = process.env.PC_REGISTRY;
  delete process.env.PC_REGISTRY;
  try {
    assert.equal(activeRegistryPath(), join(REPO_ROOT, "project-console", "projects.json"));
  } finally {
    process.env.PC_REGISTRY = saved;
  }
});

test("readRegistry maps keys to roots resolved against the registry file's directory", async () => {
  const registry = await readRegistry();
  assert.equal(registry.error, null);
  assert.equal(registry.entries.get("aiw-console"), REPO_ROOT);
  assert.equal(registry.entries.get("hilo-verde"), join(REPO_ROOT, "tests", "fixtures", "multi", "hilo-verde"));
  assert.ok(registry.entries.has("roto"));
  assert.ok(registry.entries.has("vacio"));
});

test("virtual namespace: /projects/<key>/.project/snapshot.json serves the project's own file", async () => {
  const response = await fetch(`${baseUrl}/projects/hilo-verde/.project/snapshot.json`);
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.project_id, "hilo_verde");
  const disk = JSON.parse(readFileSync(join(REPO_ROOT, "tests", "fixtures", "multi", "hilo-verde", ".project", "snapshot.json"), "utf8"));
  assert.deepEqual(body, disk);
});

test("virtual namespace: doc bodies resolve inside the registered root (Docs reader path)", async () => {
  const response = await fetch(`${baseUrl}/projects/hilo-verde/docs/trama.md`);
  assert.equal(response.status, 200);
  const body = await response.text();
  assert.match(body, /La trama, explicada/);
});

test("virtual namespace: the console's own repo is served through the SAME door as any project", async () => {
  const response = await fetch(`${baseUrl}/projects/aiw-console/.project/snapshot.json`);
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(typeof body.project_id, "string");
});

test("degradation: an unregistered key is 404, not a directory walk", async () => {
  const response = await fetch(`${baseUrl}/projects/no-registrado/.project/snapshot.json`);
  assert.equal(response.status, 404);
});

test("degradation: a registered root whose file is missing answers 404 and nothing else breaks", async () => {
  const missing = await fetch(`${baseUrl}/projects/vacio/.project/snapshot.json`);
  assert.equal(missing.status, 404);
  const stillFine = await fetch(`${baseUrl}/projects/hilo-verde/.project/snapshot.json`);
  assert.equal(stillFine.status, 200);
});

test("guard: traversal out of a registered root is refused, raw and encoded", async () => {
  const port = server.address().port;
  const encoded = await rawRequest(port, "/projects/hilo-verde/..%2F..%2F..%2Fpackage.json");
  assert.ok([403, 404].includes(encoded), `expected 403/404, got ${encoded}`);
  const raw = await rawRequest(port, "/projects/hilo-verde/../../../package.json");
  assert.ok([403, 404].includes(raw), `expected 403/404, got ${raw}`);
  const intoSibling = await rawRequest(port, "/projects/hilo-verde/../roto/.project/snapshot.json");
  assert.ok([403, 404].includes(intoSibling), `expected 403/404, got ${intoSibling}`);
});

test("guard: no .git is served in any namespace", async () => {
  for (const path of ["/.git/config", "/projects/aiw-console/.git/config", "/projects/hilo-verde/.GIT/config"]) {
    const response = await fetch(`${baseUrl}${path}`);
    assert.equal(response.status, 403, `expected 403 for ${path}`);
  }
});

test("read-only: every non-GET/HEAD method answers 405 on real, virtual and registry routes", async () => {
  const routes = ["/projects/hilo-verde/.project/snapshot.json", REGISTRY_URL_PATH, "/project-console/index.html", "/no-such-path"];
  for (const route of routes) {
    for (const method of ["POST", "PUT", "PATCH", "DELETE"]) {
      const response = await fetch(`${baseUrl}${route}`, { method });
      assert.equal(response.status, 405, `${method} ${route}`);
      const body = await response.json();
      assert.equal(body.reason, "read_only_console");
    }
  }
});

test("read-only: HEAD works and carries no body", async () => {
  const response = await fetch(`${baseUrl}/projects/hilo-verde/.project/snapshot.json`, { method: "HEAD" });
  assert.equal(response.status, 200);
  assert.equal(await response.text(), "");
});

test("degradation: an unreadable registry empties the virtual namespace without crashing", async () => {
  const saved = process.env.PC_REGISTRY;
  process.env.PC_REGISTRY = "tests/fixtures/multi/no-existe.json";
  try {
    const registry = await readRegistry();
    assert.equal(registry.error, "unreadable");
    assert.equal(registry.entries.size, 0);
    const response = await fetch(`${baseUrl}/projects/hilo-verde/.project/snapshot.json`);
    assert.equal(response.status, 404);
  } finally {
    process.env.PC_REGISTRY = saved;
  }
});
