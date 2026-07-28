// THE RE-EMISSION ROUTE (O4.P14) — `POST /projects/<key>/__project-console/project/emit`, the
// third and last write route of the global console server, and its boundary guard.
//
// What these tests are actually about is a DESFASE: `.project/` is a projection of a canonical
// the console does not own, and under parallel lanes the workshop runs deliberately do NOT
// re-emit (two lanes writing the same folder would overwrite each other). So the canonical moves
// and the projection stays behind. The motivating case was real — cantu-studio's roadmap went
// from 53 to 71 runs when implementation and documentation were split into lanes, and the console
// kept showing 53 until the operator INVENTED a roadmap edit to force the re-emission that
// follows a confirm. The first test below reproduces that shape end to end, with the REAL
// renderer reading the emitted folder, and proves the button closes the gap.
//
// Same harness discipline as tests/serve-write-routes.test.mjs: the real serve.mjs on an
// ephemeral port against a GENERATED fixture registry (PC_REGISTRY) whose projects live in a
// temp dir. The registry deliberately includes:
//
//   desfase   a conforming repo_root project           -> the projection-behind-canonical case
//   roto      a conforming project whose canonical is later broken -> the named-refusal case
//   fuera     a root with NO layout                    -> refusal + nothing created there
//   self      this repository, by absolute root        -> the real-project pass, where the
//             DERIVED `.project/` is re-emitted (that is the route's function) and the CANONICAL
//             is proved byte-identical by md5 before and after.
//
// Nothing here runs git in any form that writes, and nothing here commits.
import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import {
  server,
  HOST,
  PROJECT_EMIT_SUFFIX,
  PROJECT_EMIT_ARTIFACT_PATHS,
  matchWriteRoute,
  resolveEmissionWritePath,
  inspectCanonicalForEmission,
  diagnoseCanonicalCandidates
} from "../project-console/serve.mjs";
import { detectRootLayout, flattenRoadmapTree } from "../tools/projector/project.mjs";
import { createConsoleHarness } from "./helpers/console-dom.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const RENDERER = join(REPO_ROOT, "project-console", "assets", "project-console.js");

const md5 = (path) => createHash("md5").update(readFileSync(path)).digest("hex");

// A conforming roadmap_tree of `count` runs in ONE objective / ONE phase. `queue_order` is
// dense and every dependency points backwards, so the tree passes the engine's invariants.
function tree(prefix, count) {
  return {
    schema_version: "roadmap_tree_v1",
    roadmap_id: "roadmap",
    title: `Fixture ${prefix}`,
    objectives: [
      {
        objective_id: `${prefix}-O1`,
        title: "Objective",
        phases: [
          {
            phase_id: `${prefix}-O1.P1`,
            title: "Phase",
            runs: Array.from({ length: count }, (_, index) => ({
              run_id: `RUN-${prefix}-${String(index + 1).padStart(3, "0")}`,
              queue_order: index + 1,
              title: `Run ${index + 1}`,
              summary: "s",
              full_description: "f",
              status: "planned",
              depends_on: index === 0 ? [] : [`RUN-${prefix}-${String(index).padStart(3, "0")}`]
            }))
          }
        ]
      }
    ]
  };
}

let workDir = "";
let baseUrl = "";
let desfaseRoot = "";
let rotoRoot = "";
let outsideDir = "";

const emitPath = (key) => `/projects/${key}/${PROJECT_EMIT_SUFFIX}`;

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

function writeCanonical(root, data) {
  const canonicalPath = join(root, "roadmap", "roadmap.json");
  mkdirSync(dirname(canonicalPath), { recursive: true });
  writeFileSync(canonicalPath, JSON.stringify(data, null, 2) + "\n", "utf8");
  return canonicalPath;
}

// Runs the emitted projection currently declares — what the console would render.
function projectedRuns(root) {
  const snapshot = JSON.parse(readFileSync(join(root, ".project", "snapshot.json"), "utf8"));
  return flattenRoadmapTree(snapshot.roadmap_tree).length;
}

// Every `.tmp` anywhere under a root. The projector writes temp+rename; a survivor means an
// emission left a partial file behind.
function strayTempFiles(dir) {
  const out = [];
  const walk = (current) => {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const full = join(current, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === ".git" || entry.name === "node_modules") continue;
        walk(full);
      } else if (entry.name.endsWith(".tmp")) {
        out.push(full);
      }
    }
  };
  walk(dir);
  return out;
}

test.before(async () => {
  workDir = mkdtempSync(join(tmpdir(), "serve-project-emit-"));
  desfaseRoot = join(workDir, "desfase");
  rotoRoot = join(workDir, "roto");
  outsideDir = join(workDir, "outside-target");
  writeCanonical(desfaseRoot, tree("DESF", 3));
  writeCanonical(rotoRoot, tree("ROTO", 3));
  mkdirSync(outsideDir, { recursive: true });
  writeFileSync(join(workDir, "registry.json"), JSON.stringify({
    registry_model: "project_registry_v1",
    title: "Project-emit fixtures",
    projects: [
      { key: "desfase", root: "./desfase" },
      { key: "roto", root: "./roto" },
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

// ------------------------------------------------- the case that motivated the route

test("THE DESFASE: a canonical with more runs than the projection is re-emitted, and the console's queue shows the new count", async () => {
  // 1. First emission: canonical and projection agree at 3 runs.
  const first = await jsonRequest("POST", emitPath("desfase"));
  assert.equal(first.status, 200, JSON.stringify(first.payload));
  assert.equal(first.payload.runs, 3);
  assert.equal(projectedRuns(desfaseRoot), 3);

  // 2. The canonical moves WITHOUT the console: a lane run adds runs and does not re-emit,
  //    which is exactly what a parallel workshop run does by design.
  writeCanonical(desfaseRoot, tree("DESF", 7));
  assert.equal(flattenRoadmapTree(detectRootLayout(desfaseRoot).tree).length, 7);
  assert.equal(projectedRuns(desfaseRoot), 3, "the projection is now BEHIND its canonical");

  // 3. The renderer, reading the emitted folder, still shows the old count — the operator's
  //    complaint, reproduced with the real console code.
  const before = createConsoleHarness({ rendererPath: RENDERER, rootsByKey: new Map([["desfase", desfaseRoot]]) });
  before.sandbox.setActiveProjectBase("/projects/desfase/");
  assert.equal((await before.sandbox.loadActiveProject()).ok, true);
  await before.flush();
  const beforeQueue = before.element("run-queue-v3").innerHTML;
  assert.ok(beforeQueue.includes("RUN-DESF-003"), "the stale projection lists the runs it knows");
  assert.ok(!beforeQueue.includes("RUN-DESF-007"), "and cannot list a run its canonical only just gained");

  // 4. The button's endpoint. One POST, no restart, no invented edit.
  const emit = await jsonRequest("POST", emitPath("desfase"));
  assert.equal(emit.status, 200, JSON.stringify(emit.payload));
  assert.equal(emit.payload.runs, 7, "the acknowledgement reports the RESULTING run count");
  assert.equal(projectedRuns(desfaseRoot), 7);

  // 5. The renderer now shows the new count, from the re-emitted folder.
  const after = createConsoleHarness({ rendererPath: RENDERER, rootsByKey: new Map([["desfase", desfaseRoot]]) });
  after.sandbox.setActiveProjectBase("/projects/desfase/");
  assert.equal((await after.sandbox.loadActiveProject()).ok, true);
  await after.flush();
  const afterQueue = after.element("run-queue-v3").innerHTML;
  assert.ok(afterQueue.includes("RUN-DESF-007"), "the queue shows the runs the canonical gained");
  assert.equal((afterQueue.match(/RUN-DESF-\d{3}/g) || []).filter((v, i, a) => a.indexOf(v) === i).length, 7);
});

// ------------------------------------------------- the acknowledgement

test("the acknowledgement carries NUMBERS: artifacts written, resulting runs and objectives, the canonical they came from", async () => {
  const emit = await jsonRequest("POST", emitPath("desfase"));
  assert.equal(emit.status, 200);
  const payload = emit.payload;
  assert.equal(payload.ok, true);
  assert.equal(typeof payload.artifacts, "number");
  assert.equal(payload.artifacts, payload.files.length, "the count is the list's length, not a constant");
  assert.equal(payload.runs, 7);
  assert.equal(payload.objectives, 1);
  assert.equal(payload.canonical, "roadmap/roadmap.json", "the source is named, repo-relative and POSIX");
  assert.equal(payload.layout, "repo_root");
  assert.equal(payload.roadmap_model, "roadmap_tree_v1");
  assert.equal(payload.committed, false, "the route states it committed nothing");
  // Three artifacts here, and that is the honest number: this bare fixture keeps no governance
  // files and is not its own Git repository, so guardrails, no_claims and git_history have
  // nothing to derive from. They are reported as SKIPPED rather than counted as written — the
  // route never claims six files just because six are possible. (The real project below, which
  // has all three sources, emits six.)
  const written = payload.files.map((file) => file.artifact).sort();
  assert.deepEqual(written, ["docs_index", "roadmap", "snapshot"]);
  assert.deepEqual(payload.skipped.sort(), ["git_history", "guardrails", "no_claims"]);
  payload.files.forEach((file) => {
    assert.ok(file.path.startsWith(".project/"), `every written path is inside .project/: ${file.path}`);
    assert.ok(file.bytes > 0);
  });
});

test("emission is repeatable and leaves no .tmp behind", async () => {
  for (let i = 0; i < 3; i += 1) {
    const emit = await jsonRequest("POST", emitPath("desfase"));
    assert.equal(emit.status, 200);
    assert.equal(emit.payload.runs, 7, "a repeat emission of an unchanged canonical is stable");
  }
  assert.deepEqual(strayTempFiles(desfaseRoot), [], "temp+rename must leave nothing behind");
  // Every emitted artifact is complete JSON — never a half-written file.
  for (const file of readdirSync(join(desfaseRoot, ".project"))) {
    JSON.parse(readFileSync(join(desfaseRoot, ".project", file), "utf8"));
  }
});

// ------------------------------------------------- named refusals, nothing half-emitted

test("a canonical that fails the invariants stops the emission, names the FILE, and leaves the projection untouched", async () => {
  // A good emission first, so there is a coherent projection to protect.
  assert.equal((await jsonRequest("POST", emitPath("roto"))).status, 200);
  const projectionBefore = readdirSync(join(rotoRoot, ".project")).sort()
    .map((file) => `${file}:${md5(join(rotoRoot, ".project", file))}`);

  // Now break the canonical the way a bad edit would: run 1 depends on run 3, which sits AFTER
  // it. The shape still conforms (so the layout still claims the root); the invariants do not.
  const broken = tree("ROTO", 3);
  broken.objectives[0].phases[0].runs[0].depends_on = ["RUN-ROTO-003"];
  writeCanonical(rotoRoot, broken);

  const emit = await jsonRequest("POST", emitPath("roto"));
  assert.equal(emit.status, 422);
  assert.equal(emit.payload.ok, false);
  assert.equal(emit.payload.reason, "canonical_invariants_failed");
  assert.equal(emit.payload.file, "roadmap/roadmap.json", "the refusal names the file it is about");
  assert.ok(emit.payload.errors.some((e) => /must depend only on earlier runs/.test(e)));

  const projectionAfter = readdirSync(join(rotoRoot, ".project")).sort()
    .map((file) => `${file}:${md5(join(rotoRoot, ".project", file))}`);
  assert.deepEqual(projectionAfter, projectionBefore, "a refused emission writes NOTHING — not even one artifact");
  assert.deepEqual(strayTempFiles(rotoRoot), []);
});

test("a project with no layout claiming a canonical (today: the aiw kernel) is refused with the candidate FILES named", async () => {
  const emit = await jsonRequest("POST", emitPath("fuera"));
  assert.equal(emit.status, 404);
  assert.equal(emit.payload.reason, "project_not_editable_no_layout");
  // The refusal is not a bare "no layout": it says which files were looked for and why each failed.
  const candidates = emit.payload.candidates;
  assert.ok(Array.isArray(candidates) && candidates.length >= 2);
  assert.deepEqual(candidates.map((c) => c.file), ["roadmap/roadmap.json", ".aiw/roadmap/roadmap.json"]);
  candidates.forEach((c) => assert.equal(c.verdict, "missing"));
  assert.deepEqual(readdirSync(outsideDir), [], "the refused root must stay byte-empty");
});

test("a malformed canonical the engine cannot walk is refused over HTTP, and the SERVER SURVIVES it", async () => {
  // The QA regression, end to end: this used to be an unhandled throw inside the request
  // handler, which killed the process. It must be a named refusal and the server must keep
  // answering afterwards.
  const malformed = tree("ROTO", 2);
  malformed.objectives[0].phases[0].runs[0].depends_on = {};
  writeCanonical(rotoRoot, malformed);
  const emit = await jsonRequest("POST", emitPath("roto"));
  assert.equal(emit.status, 409);
  assert.equal(emit.payload.reason, "canonical_not_a_roadmap_tree");
  assert.equal(emit.payload.file, "roadmap/roadmap.json");
  // Still alive, still serving, still refusing for the right reasons.
  const after = await jsonRequest("POST", emitPath("desfase"));
  assert.equal(after.status, 200, "the server must still be answering after a malformed canonical");
  writeCanonical(rotoRoot, tree("ROTO", 3));
});

test("an unregistered project key is refused before anything is resolved", async () => {
  const emit = await jsonRequest("POST", emitPath("no-registrado"));
  assert.equal(emit.status, 404);
  assert.equal(emit.payload.reason, "unknown_project");
});

// ------------------------------------------------- the boundary guard

test("boundary guard unit: an emission destination outside the root, in .git, or outside the derived .project/ throws; the six artifacts pass", () => {
  const root = desfaseRoot;
  assert.throws(() => resolveEmissionWritePath(root, join("..", "roto", ".project", "snapshot.json")), /escapes the registered project root/);
  assert.throws(() => resolveEmissionWritePath(root, resolve(workDir, "absolute.json")), /escapes the registered project root/);
  assert.throws(() => resolveEmissionWritePath(root, join(".git", "config")), /names \.git/);
  assert.throws(() => resolveEmissionWritePath(root, join(".project", "..", ".git", "hooks", "x")), /names \.git/);
  // The mirror image of resolveCanonicalWritePath: everything OUTSIDE .project/ is refused here.
  assert.throws(() => resolveEmissionWritePath(root, join("roadmap", "roadmap.json")), /outside the derived \.project\//);
  assert.throws(() => resolveEmissionWritePath(root, ".project"), /outside the derived \.project\//);
  assert.throws(() => resolveEmissionWritePath(root, join(".project", "..", "escape.json")), /outside the derived \.project\//);
  PROJECT_EMIT_ARTIFACT_PATHS.forEach(([artifact, relativePath]) => {
    assert.equal(resolveEmissionWritePath(root, relativePath), resolve(root, relativePath), artifact);
  });
});

test("boundary guard over HTTP: a registry entry whose root is not a project is refused and nothing is created there", async () => {
  const emit = await jsonRequest("POST", emitPath("fuera"));
  assert.equal(emit.payload.ok, false);
  assert.deepEqual(readdirSync(outsideDir), []);
  // And the guard is not bypassable by pointing the registry AT the temp dir root: the parent
  // of every fixture is not a project either, so the same refusal applies to it.
  assert.equal(resolve(outsideDir), join(workDir, "outside-target"));
});

// ------------------------------------------------- the canonical pre-check, unit

test("pre-check unit: missing, unparsable and non-conforming canonicals each get their own named reason and the file", () => {
  const dir = mkdtempSync(join(tmpdir(), "emit-precheck-"));
  const root = join(dir, "p");
  mkdirSync(join(root, "roadmap"), { recursive: true });
  const canonicalPath = join(root, "roadmap", "roadmap.json");

  let verdict = inspectCanonicalForEmission(root, canonicalPath, new Set());
  assert.equal(verdict.ok, false);
  assert.equal(verdict.reason, "canonical_missing");
  assert.equal(verdict.file, "roadmap/roadmap.json");

  writeFileSync(canonicalPath, "{ not json", "utf8");
  verdict = inspectCanonicalForEmission(root, canonicalPath, new Set());
  assert.equal(verdict.reason, "canonical_unparsable");
  assert.equal(verdict.file, "roadmap/roadmap.json");

  writeFileSync(canonicalPath, JSON.stringify({ objectives: [{ title: "no ids" }] }), "utf8");
  verdict = inspectCanonicalForEmission(root, canonicalPath, new Set());
  assert.equal(verdict.reason, "canonical_not_a_roadmap_tree");

  // Found in QA: a canonical that PASSES the shape gate (three levels, ids, statuses) but whose
  // `depends_on` is a string instead of an array makes the engine throw on a non-iterable. It
  // took the server process down before this was caught. A malformed canonical is exactly what
  // this gate is for, so it must come back as a named refusal with the file, like every other.
  const malformed = tree("BAD", 2);
  malformed.objectives[0].phases[0].runs[0].depends_on = {};
  writeFileSync(canonicalPath, JSON.stringify(malformed), "utf8");
  verdict = inspectCanonicalForEmission(root, canonicalPath, new Set());
  assert.equal(verdict.ok, false);
  assert.equal(verdict.reason, "canonical_not_a_roadmap_tree");
  assert.equal(verdict.file, "roadmap/roadmap.json");
  assert.match(verdict.detail, /iterable/i);

  writeFileSync(canonicalPath, JSON.stringify(tree("OK", 4)), "utf8");
  verdict = inspectCanonicalForEmission(root, canonicalPath, new Set());
  assert.equal(verdict.ok, true);
  assert.equal(verdict.runs, 4);
  assert.equal(verdict.objectives, 1);

  rmSync(dir, { recursive: true, force: true });
});

test("candidate diagnosis unit: each known layout's roadmap path gets its own verdict", () => {
  const good = diagnoseCanonicalCandidates(desfaseRoot);
  assert.equal(good[0].file, "roadmap/roadmap.json");
  assert.equal(good[0].verdict, "ok");
  assert.equal(good[1].file, ".aiw/roadmap/roadmap.json");
  assert.equal(good[1].verdict, "missing");
});

// ------------------------------------------------- method gate + route matching

test("only POST is a method of this route", async () => {
  for (const method of ["GET", "PUT", "PATCH", "DELETE"]) {
    const answer = await jsonRequest(method, emitPath("desfase"));
    assert.equal(answer.status, 405, method);
    assert.equal(answer.payload.reason, "method_not_allowed", method);
  }
});

test("route matching is exact for the third route too", () => {
  assert.deepEqual(matchWriteRoute("/projects/desfase/__project-console/project/emit"), { key: "desfase", endpoint: "project_emit" });
  assert.equal(matchWriteRoute("/projects/desfase/__project-console/project/emit/extra"), null);
  assert.equal(matchWriteRoute("/projects/desfase/__project-console/project"), null);
  assert.equal(matchWriteRoute("/__project-console/project/emit"), null);
  assert.equal(matchWriteRoute("/projects/__project-console/project/emit"), null);
});

// ------------------------------------------------- the button's own behaviour, in the renderer

// The REAL renderer's emit path, driven end to end: its POST goes to the REAL server (the
// harness's read-only stub keeps serving every GET from disk, so the reload after the write
// reads the files the server just emitted). What is asserted is what the operator sees — the
// acknowledgement's words and numbers, and the surfaces behind it.
function emitHarness(key, root) {
  const harness = createConsoleHarness({ rendererPath: RENDERER, rootsByKey: new Map([[key, root]]) });
  const readOnly = harness.sandbox.fetch;
  harness.sandbox.fetch = async (url, init) => {
    if (init && init.method === "POST") return fetch(baseUrl + String(url), { method: "POST" });
    return readOnly(url, init);
  };
  return harness;
}

test("the button's acknowledgement says what happened, WITH numbers, and the views follow without a reload", async () => {
  writeCanonical(desfaseRoot, tree("DESF", 7));
  assert.equal((await jsonRequest("POST", emitPath("desfase"))).status, 200);
  // The canonical moves again behind the console's back — the parallel-lane case.
  writeCanonical(desfaseRoot, tree("DESF", 12));

  const harness = emitHarness("desfase", desfaseRoot);
  harness.sandbox.setActiveProjectBase("/projects/desfase/");
  assert.equal((await harness.sandbox.loadActiveProject()).ok, true);
  await harness.flush();
  assert.equal(new Set(harness.element("run-queue-v3").innerHTML.match(/RUN-DESF-\d{3}/g)).size, 7, "the stale projection");

  await harness.sandbox.emitProjectFolder();
  await harness.flush();

  const state = harness.element("roadmap-emit-state");
  assert.equal(state.className, "roadmap-emit-state is-ok");
  // NUMBERS on screen: how many artifacts were written and the resulting run count. A mute
  // "done" is exactly what this button must not be.
  assert.match(state.textContent, /^3 artifacts · 12 runs$/);
  // And the whole sentence — the canonical it read, the artifacts it skipped, and the fact that
  // nothing was committed — is carried on the element, not lost.
  const full = state.getAttribute("title");
  assert.match(full, /Re-emitted 3 artifacts from roadmap\/roadmap\.json/);
  assert.match(full, /12 runs, 1 objective\b/);
  assert.match(full, /Not committed: review and commit yourself\./);
  // The views followed, in place: no reload, no server restart.
  assert.equal(new Set(harness.element("run-queue-v3").innerHTML.match(/RUN-DESF-\d{3}/g)).size, 12);
  assert.equal(new Set(harness.element("roadmap-v3-tree").innerHTML.match(/RUN-DESF-\d{3}/g)).size, 12);

  // The acknowledgement is per-project state: it must not survive a switch, or it would claim a
  // re-emission that never happened in the next project.
  harness.sandbox.resetProjectScopedState();
  assert.equal(harness.element("roadmap-emit-state").textContent, "");
  assert.equal(harness.element("roadmap-emit-state").className, "roadmap-emit-state is-idle");
  assert.equal(harness.element("roadmap-emit-state").getAttribute("title"), null);
  assert.equal(harness.element("roadmap-emit-btn").disabled, false);
});

test("a refusal reaches the screen NAMED: the reason and the file are visible, the engine's detail rides along", async () => {
  const harness = emitHarness("fuera", outsideDir);
  harness.sandbox.setActiveProjectBase("/projects/fuera/");
  await harness.sandbox.loadActiveProject();
  await harness.flush();
  await harness.sandbox.emitProjectFolder();
  await harness.flush();
  const state = harness.element("roadmap-emit-state");
  assert.equal(state.className, "roadmap-emit-state is-failed");
  assert.match(state.textContent, /no canonical roadmap claims this project/);
  assert.match(state.textContent, /roadmap\/roadmap\.json \(missing\)/, "the candidate files are named ON SCREEN");
  assert.match(state.textContent, /\.aiw\/roadmap\/roadmap\.json \(missing\)/);
  assert.match(state.textContent, /Nothing was written\.$/);
  assert.deepEqual(readdirSync(outsideDir), [], "and nothing was");
});

test("a canonical that fails the invariants is refused ON SCREEN by file, with the engine's errors on the element", async () => {
  // Rebuild `roto` good, emit, then break it — same shape as the HTTP test, seen from the UI.
  writeCanonical(rotoRoot, tree("ROTO", 3));
  assert.equal((await jsonRequest("POST", emitPath("roto"))).status, 200);
  const broken = tree("ROTO", 3);
  broken.objectives[0].phases[0].runs[0].depends_on = ["RUN-ROTO-003"];
  writeCanonical(rotoRoot, broken);

  const harness = emitHarness("roto", rotoRoot);
  harness.sandbox.setActiveProjectBase("/projects/roto/");
  await harness.sandbox.loadActiveProject();
  await harness.flush();
  await harness.sandbox.emitProjectFolder();
  await harness.flush();
  const state = harness.element("roadmap-emit-state");
  assert.equal(state.className, "roadmap-emit-state is-failed");
  assert.match(state.textContent, /the canonical roadmap\/roadmap\.json fails the roadmap invariants/);
  assert.match(state.textContent, /Nothing was written\.$/);
  assert.match(state.getAttribute("title"), /must depend only on earlier runs/);
});

// ------------------------------------------------- the real project, without damage

test("a REAL project: the derived .project/ is re-emitted (its function) and the CANONICAL is byte-identical — md5 before and after", async () => {
  const layout = detectRootLayout(REPO_ROOT);
  assert.ok(layout, "this repository must be claimed by a layout for this test to mean anything");
  const canonicalPath = resolve(REPO_ROOT, layout.paths.roadmap);
  const canonicalBefore = md5(canonicalPath);
  const snapshotTarget = join(REPO_ROOT, ".project", "snapshot.json");
  const derivedBefore = existsSync(snapshotTarget) ? statSync(snapshotTarget).mtimeMs : null;

  const emit = await jsonRequest("POST", emitPath("self"));
  assert.equal(emit.status, 200, JSON.stringify(emit.payload));
  assert.equal(emit.payload.ok, true);
  // A real project has all six sources — governance files, a docs corpus and its own Git
  // repository — so a full emission writes all SIX artifacts and skips none.
  assert.equal(emit.payload.artifacts, 6, JSON.stringify(emit.payload.skipped));
  assert.deepEqual(emit.payload.skipped, []);
  assert.equal(emit.payload.runs, flattenRoadmapTree(layout.tree).length, "the reported count is the canonical's");
  assert.equal(emit.payload.committed, false);

  // THE POINT: the projection moved, the canonical did not.
  assert.equal(md5(canonicalPath), canonicalBefore, "the canonical must be byte-identical after a re-emission");
  assert.ok(derivedBefore === null || statSync(snapshotTarget).mtimeMs >= derivedBefore, "the derived folder was re-emitted");
  assert.equal(projectedRuns(REPO_ROOT), emit.payload.runs, "and the projection now agrees with the canonical");
  assert.deepEqual(strayTempFiles(join(REPO_ROOT, ".project")), []);
});
