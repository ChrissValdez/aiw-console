// The two write routes of the global console server (O4.P12) and everything that must stay
// read-only around them. Runs the real serve.mjs on an ephemeral port against a GENERATED
// fixture registry (PC_REGISTRY) whose projects live in a temp dir, so no real repository is
// written by the edit tests. The registry deliberately includes:
//
//   editable   a conforming repo_root project (LF)            -> the happy dry-run→confirm path
//   alien      the same structure, foreign schema id (CRLF)   -> shape-not-name over HTTP
//   fuera      a root with NO layout (the "registry pointing outside" fixture)
//              -> every write is refused with a named reason and NOTHING is created there
//   self       this repository, by absolute root              -> the history-sync success path
//              (its .project/git_history.json is DERIVED and has its own emitter; re-emitting
//               it is a refresh, not damage — and it is the only real file any test writes)
//
// The boundary guard (resolveCanonicalWritePath) is additionally unit-tested with destinations
// that resolve outside the root, into .git, and into the derived .project/ folder.
import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import {
  server,
  HOST,
  resolveCanonicalWritePath,
  externalRunIdsFor,
  matchWriteRoute
} from "../project-console/serve.mjs";
import { serialize } from "../tools/roadmap/roadmap-core.mjs";
import { resolveGitBin } from "../tools/projector/project.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");

function fixtureTree(schemaName, runPrefix) {
  return {
    schema_version: schemaName,
    roadmap_id: "roadmap",
    title: "Fixture " + runPrefix,
    objectives: [
      {
        objective_id: runPrefix + "-O1",
        title: "Objetivo",
        phases: [
          {
            phase_id: runPrefix + "-O1.P1",
            title: "Fase",
            runs: [
              { run_id: "RUN-" + runPrefix + "-UNO-001", queue_order: 1, title: "Uno", summary: "s", full_description: "f", status: "completed", depends_on: [] },
              { run_id: "RUN-" + runPrefix + "-DOS-001", queue_order: 2, title: "Dos", summary: "s", full_description: "f", status: "planned", depends_on: ["RUN-" + runPrefix + "-UNO-001"] },
              { run_id: "RUN-" + runPrefix + "-TRES-001", queue_order: 3, title: "Tres", summary: "s", full_description: "f", status: "planned", depends_on: [] }
            ]
          }
        ]
      }
    ]
  };
}

let workDir = "";
let baseUrl = "";
let editableRoadmapPath = "";
let alienRoadmapPath = "";
let outsideDir = "";

async function jsonRequest(method, path, body) {
  const response = await fetch(baseUrl + path, {
    method,
    headers: body ? { "Content-Type": "application/json" } : {},
    body: body ? JSON.stringify(body) : undefined
  });
  const text = await response.text();
  let payload = null;
  try { payload = JSON.parse(text); } catch { /* non-JSON error page */ }
  return { status: response.status, payload, text };
}

// Traversal tests must put the RAW path on the wire (fetch resolves ../ client-side).
function rawRequest(port, path, method = "GET") {
  return new Promise((resolveRequest, reject) => {
    const request = http.request({ host: HOST, port, path, method }, (response) => {
      response.resume();
      response.on("end", () => resolveRequest(response.statusCode));
    });
    request.on("error", reject);
    request.end();
  });
}

test.before(async () => {
  workDir = mkdtempSync(join(tmpdir(), "serve-write-routes-"));
  // editable: repo_root layout, LF endings.
  mkdirSync(join(workDir, "editable", "roadmap"), { recursive: true });
  editableRoadmapPath = join(workDir, "editable", "roadmap", "roadmap.json");
  writeFileSync(editableRoadmapPath, serialize(fixtureTree("roadmap_tree_v1", "EDIT"), "\n"), "utf8");
  // alien: same structure, foreign schema identifier, CRLF endings.
  mkdirSync(join(workDir, "alien", "roadmap"), { recursive: true });
  alienRoadmapPath = join(workDir, "alien", "roadmap", "roadmap.json");
  writeFileSync(alienRoadmapPath, serialize(fixtureTree("otro.proyecto.plan.v9", "ALIEN"), "\r\n"), "utf8");
  // fuera: a registered root that is NOT a project — no layout claims it.
  outsideDir = join(workDir, "outside-target");
  mkdirSync(outsideDir, { recursive: true });
  // The generated registry. Roots resolve relative to the registry file's directory;
  // `self` uses this repository's absolute root for the history-sync success path.
  writeFileSync(join(workDir, "registry.json"), JSON.stringify({
    registry_model: "project_registry_v1",
    title: "Write-route fixtures",
    projects: [
      { key: "editable", root: "./editable" },
      { key: "alien", root: "./alien" },
      { key: "fuera", root: "./outside-target" },
      { key: "self", root: REPO_ROOT.split("\\").join("/") }
    ]
  }, null, 2), "utf8");
  process.env.PC_REGISTRY = join(workDir, "registry.json");
  await new Promise((resolveListen) => server.listen(0, HOST, resolveListen));
  baseUrl = `http://${HOST}:${server.address().port}`;
});

test.after(async () => {
  delete process.env.PC_REGISTRY;
  await new Promise((resolveClose) => server.close(resolveClose));
  rmSync(workDir, { recursive: true, force: true });
});

// ---------------------------------------------------------------- probe (GET on the edit route)

test("probe: GET on the edit route answers 405 method_not_allowed exactly for an editable project", async () => {
  const editable = await jsonRequest("GET", "/projects/editable/__project-console/roadmap/edit");
  assert.equal(editable.status, 405);
  assert.equal(editable.payload.reason, "method_not_allowed");
});

test("probe: a registered root no layout claims answers 404 with a named reason (edit mode stays off honestly)", async () => {
  const fuera = await jsonRequest("GET", "/projects/fuera/__project-console/roadmap/edit");
  assert.equal(fuera.status, 404);
  assert.equal(fuera.payload.reason, "project_not_editable_no_layout");
  const unknown = await jsonRequest("GET", "/projects/no-registrado/__project-console/roadmap/edit");
  assert.equal(unknown.status, 404);
  assert.equal(unknown.payload.reason, "unknown_project");
});

// ---------------------------------------------------------------- dry-run → confirm

test("dry-run: previews the remap and baseline and writes NOTHING", async () => {
  const before = readFileSync(editableRoadmapPath, "utf8");
  const beforeMtime = statSync(editableRoadmapPath).mtimeMs;
  const dry = await jsonRequest("POST", "/projects/editable/__project-console/roadmap/edit", {
    op: "move", apply: false, args: { run: "RUN-EDIT-TRES-001", toOrder: 1 }
  });
  assert.equal(dry.status, 200);
  assert.equal(dry.payload.ok, true);
  assert.equal(dry.payload.applied, false);
  assert.equal(dry.payload.dryRun, true);
  assert.ok(typeof dry.payload.baseline === "string" && dry.payload.baseline.startsWith("sha256:"));
  assert.ok(Array.isArray(dry.payload.remap));
  assert.equal(readFileSync(editableRoadmapPath, "utf8"), before);
  assert.equal(statSync(editableRoadmapPath).mtimeMs, beforeMtime);
});

test("confirm: refuses without the dry-run baseline (400 baseline_required)", async () => {
  const confirm = await jsonRequest("POST", "/projects/editable/__project-console/roadmap/edit", {
    op: "set-text", apply: true, args: { targetType: "objective", targetId: "EDIT-O1", title: "x" }
  });
  assert.equal(confirm.status, 400);
  assert.equal(confirm.payload.reason, "baseline_required");
});

test("confirm: refuses a stale baseline (409) when the file changed after the dry-run, and writes nothing", async () => {
  const dry = await jsonRequest("POST", "/projects/editable/__project-console/roadmap/edit", {
    op: "set-text", apply: false, args: { targetType: "objective", targetId: "EDIT-O1", title: "Cambio A" }
  });
  assert.equal(dry.payload.ok, true);
  // The file moves underneath the preview (another writer).
  const tree = JSON.parse(readFileSync(editableRoadmapPath, "utf8"));
  tree.title = "Movido por otro editor";
  writeFileSync(editableRoadmapPath, serialize(tree, "\n"), "utf8");
  const moved = readFileSync(editableRoadmapPath, "utf8");
  const confirm = await jsonRequest("POST", "/projects/editable/__project-console/roadmap/edit", {
    op: "set-text", apply: true, baseline: dry.payload.baseline, args: { targetType: "objective", targetId: "EDIT-O1", title: "Cambio A" }
  });
  assert.equal(confirm.status, 409);
  assert.equal(confirm.payload.reason, "stale_baseline");
  assert.equal(readFileSync(editableRoadmapPath, "utf8"), moved, "a stale confirm must not write");
});

test("dry-run→confirm happy path: writes the canonical (LF preserved) and re-emits .project/ coherently", async () => {
  const dry = await jsonRequest("POST", "/projects/editable/__project-console/roadmap/edit", {
    op: "set-text", apply: false, args: { targetType: "run", targetId: "RUN-EDIT-DOS-001", title: "Dos editado por confirm" }
  });
  assert.equal(dry.payload.ok, true);
  const confirm = await jsonRequest("POST", "/projects/editable/__project-console/roadmap/edit", {
    op: "set-text", apply: true, baseline: dry.payload.baseline, args: { targetType: "run", targetId: "RUN-EDIT-DOS-001", title: "Dos editado por confirm" }
  });
  assert.equal(confirm.status, 200);
  assert.equal(confirm.payload.ok, true);
  assert.equal(confirm.payload.applied, true);
  assert.equal(confirm.payload.validatorRan, true);
  assert.ok(typeof confirm.payload.baseline === "string", "a fresh baseline travels back");
  // The canonical changed, kept LF endings, and holds the new title.
  const raw = readFileSync(editableRoadmapPath, "utf8");
  assert.ok(!raw.includes("\r\n"), "an LF canonical must stay LF after a confirm");
  assert.ok(raw.includes("Dos editado por confirm"));
  // Coherence: the derived folder was re-emitted and now agrees with the canonical.
  assert.equal(confirm.payload.reemit.ok, true);
  const emittedRoadmap = JSON.parse(readFileSync(join(workDir, "editable", ".project", "roadmap.json"), "utf8"));
  const emittedTitles = JSON.stringify(emittedRoadmap.objectives);
  assert.ok(emittedTitles.includes("Dos editado por confirm"), ".project/roadmap.json must reflect the confirmed edit");
  const emittedSnapshot = JSON.parse(readFileSync(join(workDir, "editable", ".project", "snapshot.json"), "utf8"));
  assert.ok(JSON.stringify(emittedSnapshot.roadmap_tree).includes("Dos editado por confirm"), "snapshot.json must reflect the confirmed edit");
});

test("shape not name over HTTP: the alien-schema project edits identically and its CRLF endings survive; its model name travels", async () => {
  const dry = await jsonRequest("POST", "/projects/alien/__project-console/roadmap/edit", {
    op: "set-text", apply: false, args: { targetType: "objective", targetId: "ALIEN-O1", title: "Objetivo ajeno editado" }
  });
  assert.equal(dry.payload.ok, true, JSON.stringify(dry.payload));
  const confirm = await jsonRequest("POST", "/projects/alien/__project-console/roadmap/edit", {
    op: "set-text", apply: true, baseline: dry.payload.baseline, args: { targetType: "objective", targetId: "ALIEN-O1", title: "Objetivo ajeno editado" }
  });
  assert.equal(confirm.payload.applied, true, JSON.stringify(confirm.payload));
  const raw = readFileSync(alienRoadmapPath, "utf8");
  assert.ok(raw.includes("\r\n"), "a CRLF canonical must stay CRLF after a confirm");
  assert.ok(raw.includes("Objetivo ajeno editado"));
  // §10.c: the emitted snapshot republishes the project's own model identifier, verbatim.
  const emittedSnapshot = JSON.parse(readFileSync(join(workDir, "alien", ".project", "snapshot.json"), "utf8"));
  assert.equal(emittedSnapshot.taxonomy_model.model, "otro.proyecto.plan.v9");
});

test("invariants over HTTP: an edit that would break precedence is refused (422) and the file does not change", async () => {
  const before = readFileSync(editableRoadmapPath, "utf8");
  const dry = await jsonRequest("POST", "/projects/editable/__project-console/roadmap/edit", {
    op: "move", apply: false, args: { run: "RUN-EDIT-UNO-001", toOrder: 2 }
  });
  assert.equal(dry.status, 422);
  assert.equal(dry.payload.ok, false);
  assert.ok(dry.payload.errors.some((e) => e.includes("must depend only on earlier runs")));
  assert.equal(readFileSync(editableRoadmapPath, "utf8"), before);
});

// ---------------------------------------------------------------- the boundary guard

test("boundary guard: every write is refused for the registered root that points outside any project, and nothing is created there", async () => {
  const edit = await jsonRequest("POST", "/projects/fuera/__project-console/roadmap/edit", {
    op: "set-text", apply: false, args: { targetType: "objective", targetId: "X", title: "x" }
  });
  assert.equal(edit.status, 404);
  assert.equal(edit.payload.reason, "project_not_editable_no_layout");
  const sync = await jsonRequest("POST", "/projects/fuera/__project-console/history/sync");
  assert.equal(sync.status, 404);
  assert.equal(sync.payload.reason, "project_not_editable_no_layout");
  assert.deepEqual(readdirSync(outsideDir), [], "the refused root must stay byte-empty");
});

test("boundary guard unit: a destination outside the root, in .git, or in the derived .project/ throws; the canonical passes", () => {
  const root = join(workDir, "editable");
  assert.throws(() => resolveCanonicalWritePath(root, join("..", "alien", "roadmap", "roadmap.json")), /escapes the registered project root/);
  assert.throws(() => resolveCanonicalWritePath(root, resolve(workDir, "absolute.json")), /escapes the registered project root/);
  assert.throws(() => resolveCanonicalWritePath(root, join(".git", "config")), /names \.git/);
  assert.throws(() => resolveCanonicalWritePath(root, join(".project", "roadmap.json")), /derived \.project/);
  assert.equal(resolveCanonicalWritePath(root, join("roadmap", "roadmap.json")), resolve(root, "roadmap", "roadmap.json"));
});

test("external run ids are composed from the OTHER registered projects, as data", async () => {
  const ids = await externalRunIdsFor("editable");
  assert.equal(ids.has("RUN-ALIEN-UNO-001"), true, "the sibling fixture's runs are known");
  assert.equal(ids.has("RUN-EDIT-UNO-001"), false, "the active project's own runs are not 'external'");
});

// ---------------------------------------------------------------- history sync

test("history sync: refuses a project the emitter does not serve; 503 when Git has nothing to read", async () => {
  // `editable` has a layout but is not a Git repository: the emitter answers null -> 503.
  const sync = await jsonRequest("POST", "/projects/editable/__project-console/history/sync");
  assert.equal(sync.status, 503);
  assert.equal(sync.payload.reason, "git_history_unavailable");
});

const gitAvailable = !!resolveGitBin();
test("history sync: re-emits .project/git_history.json of a real project and reports the rebuild", { skip: gitAvailable ? false : "git unavailable" }, async () => {
  const target = join(REPO_ROOT, ".project", "git_history.json");
  const beforeMtime = existsSync(target) ? statSync(target).mtimeMs : null;
  const sync = await jsonRequest("POST", "/projects/self/__project-console/history/sync");
  assert.equal(sync.status, 200, JSON.stringify(sync.payload));
  assert.equal(sync.payload.ok, true);
  assert.ok(sync.payload.commit_total > 0);
  assert.ok(typeof sync.payload.head === "string" && sync.payload.head.length >= 7);
  const after = statSync(target);
  assert.ok(beforeMtime === null || after.mtimeMs >= beforeMtime, "the derived history file was re-emitted");
  const parsed = JSON.parse(readFileSync(target, "utf8"));
  assert.equal(parsed.commit_total, sync.payload.commit_total);
});

test("history sync: GET is not a method of this route", async () => {
  const probe = await jsonRequest("GET", "/projects/self/__project-console/history/sync");
  assert.equal(probe.status, 405);
  assert.equal(probe.payload.reason, "method_not_allowed");
});

// ---------------------------------------------------------------- read-only, preserved

test("read-only preserved: every method beyond GET/HEAD on any NON-route path answers 405 read_only_console", async () => {
  const targets = [
    "/project-console/index.html",
    "/projects/editable/.project/snapshot.json",
    "/projects/editable/roadmap/roadmap.json",
    "/project-console/projects.json",
    "/no/existe"
  ];
  for (const method of ["POST", "PUT", "PATCH", "DELETE"]) {
    for (const target of targets) {
      const answer = await jsonRequest(method, target, method === "POST" ? {} : undefined);
      assert.equal(answer.status, 405, `${method} ${target}`);
      assert.equal(answer.payload.reason, "read_only_console", `${method} ${target}`);
    }
  }
});

test("read-only preserved: non-POST methods on the write routes answer 405 method_not_allowed (route exists, method does not)", async () => {
  for (const method of ["PUT", "PATCH", "DELETE"]) {
    const edit = await jsonRequest(method, "/projects/editable/__project-console/roadmap/edit");
    assert.equal(edit.status, 405, method);
    assert.equal(edit.payload.reason, "method_not_allowed", method);
  }
});

test("read-only preserved: .git stays forbidden and traversal stays contained in every namespace", async () => {
  const port = server.address().port;
  assert.equal((await jsonRequest("GET", "/.git/config")).status, 403);
  assert.equal((await jsonRequest("GET", "/projects/editable/.git/config")).status, 403);
  const rawTraversal = await rawRequest(port, "/projects/editable/../alien/roadmap/roadmap.json");
  assert.ok([403, 404].includes(rawTraversal), `raw traversal answered ${rawTraversal}`);
  const rawRootEscape = await rawRequest(port, "/../projects.json");
  assert.ok([403, 404].includes(rawRootEscape), `root escape answered ${rawRootEscape}`);
  // POST with a traversal path is refused as a method (never resolved as a file).
  const postTraversal = await rawRequest(port, "/projects/editable/../x", "POST");
  assert.equal(postTraversal, 405);
});

test("route matching is exact: near-miss paths are not write routes", () => {
  assert.deepEqual(matchWriteRoute("/projects/editable/__project-console/roadmap/edit"), { key: "editable", endpoint: "roadmap_edit" });
  assert.deepEqual(matchWriteRoute("/projects/editable/__project-console/history/sync"), { key: "editable", endpoint: "history_sync" });
  assert.equal(matchWriteRoute("/projects/editable/__project-console/roadmap/edit/extra"), null);
  assert.equal(matchWriteRoute("/projects/editable/__project-console/roadmap"), null);
  assert.equal(matchWriteRoute("/__project-console/roadmap/edit"), null);
  assert.equal(matchWriteRoute("/projects/__project-console/roadmap/edit"), null);
});
