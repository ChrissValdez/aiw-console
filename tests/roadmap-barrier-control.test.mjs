// [D-051] The BARRIER control, end to end, and the declare-lanes op that made a lane
// vocabulary reachable without hand-editing a canonical file.
//
// D-051 defined barriers and rendered them, but left them WRITE-ONLY BY HAND: nothing in the
// engine or the console could mark one. These are the two ops that closed that, and the modal
// block that reaches them. Four layers, each measured where it lives:
//
//   1. the engine     — setBarrier / declareLanes and every refusal they own
//   2. the markup     — what the run editor actually paints for Barrier, in the real renderer
//   3. the gate       — a GLOBAL barrier produces NO payload until it is acknowledged
//   4. the wire       — dry-run → confirm over real HTTP, on a COPY of the lanes fixture,
//                       ending in a byte-exact revert to the bytes it started from
//
// Layer 4 runs against a temp copy of tests/fixtures/lanes, never a real project: applying a
// barrier to a real roadmap is a decision for the operator, and a test must not make it.
import test from "node:test";
import assert from "node:assert/strict";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import * as core from "../tools/roadmap/roadmap-core.mjs";
import { planEdit } from "../tools/roadmap/roadmap-plan.mjs";
import { server, HOST } from "../project-console/serve.mjs";
import { createConsoleHarness } from "./helpers/console-dom.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const RENDERER = join(REPO_ROOT, "project-console", "assets", "project-console.js");
const LANES_ROOT = join(HERE, "fixtures", "lanes", "project");
const LANES_CANONICAL = join(LANES_ROOT, "roadmap", "roadmap.json");

const loadFixture = () => core.parseRoadmap(core.loadRaw(LANES_CANONICAL));

// A lane-less tree, built inline: the second half of every "what happens with no lanes"
// question, and the shape aiw-console itself still has.
function lanelessTree() {
  return {
    schema_version: "roadmap_tree_v1",
    roadmap_id: "roadmap",
    title: "Laneless",
    objectives: [{
      objective_id: "L-O1",
      title: "Objective",
      phases: [{
        phase_id: "L-O1.P1",
        title: "Phase",
        runs: [
          { run_id: "RUN-L-ONE-001", queue_order: 1, title: "One", summary: "s", full_description: "f", status: "completed", depends_on: [] },
          { run_id: "RUN-L-TWO-001", queue_order: 2, title: "Two", summary: "s", full_description: "f", status: "planned", depends_on: ["RUN-L-ONE-001"] }
        ]
      }]
    }]
  };
}

// ------------------------------------------------------------------ 1. the engine: setBarrier

test("set-barrier stores the scope, and stores NOTHING else", () => {
  const obj = loadFixture();
  const before = JSON.stringify(obj);
  const result = core.setBarrier(obj, { run: "RUN-FIX-DOC-GUIDE-001", barrier: "lane" });
  assert.deepEqual(result.errors, []);
  assert.equal(result.before, null);
  assert.equal(result.after, "lane");
  const entry = core.findRunEntry(obj, "RUN-FIX-DOC-GUIDE-001");
  assert.equal(entry.run.barrier, "lane");
  // Nothing else on that run moved, and no other run was touched at all.
  const after = JSON.parse(before);
  core.findRunEntry(after, "RUN-FIX-DOC-GUIDE-001").run.barrier = "lane";
  core.normalizeRunKeyOrder(core.findRunEntry(after, "RUN-FIX-DOC-GUIDE-001").run);
  assert.equal(JSON.stringify(obj), JSON.stringify(after));
});

test("set-barrier clears the key WHOLE — a run with no barrier stores nothing", () => {
  const obj = loadFixture();
  // The fixture's global barrier: clearing it must delete the key, not write a falsy value.
  const result = core.setBarrier(obj, { run: "RUN-FIX-PROTO-GATE-001", barrier: null });
  assert.deepEqual(result.errors, []);
  assert.equal(result.before, "global");
  assert.equal(result.after, null);
  assert.equal("barrier" in core.findRunEntry(obj, "RUN-FIX-PROTO-GATE-001").run, false);
});

test("set-barrier: clearing a run that has none is a WARNING, not a refusal, and changes no bytes", () => {
  const raw = core.loadRaw(LANES_CANONICAL);
  const plan = planEdit({ filePath: LANES_CANONICAL, op: "set-barrier", args: { run: "RUN-FIX-DOC-GUIDE-001", barrier: null } });
  assert.equal(plan.ok, true);
  assert.equal(plan.warnings.length, 1);
  assert.match(plan.warnings[0], /carries no barrier/);
  assert.equal(plan.serialized, raw, "a no-op clear must serialise byte-identically");
});

test("set-barrier refuses an unknown scope by name (G1)", () => {
  for (const bad of ["phase", "GLOBAL", "true", 1, {}]) {
    const obj = loadFixture();
    const result = core.setBarrier(obj, { run: "RUN-FIX-DOC-GUIDE-001", barrier: bad });
    assert.equal(result.errors.length, 1, `scope ${JSON.stringify(bad)} must be refused`);
    assert.match(result.errors[0], /must be one of lane, global/);
    assert.equal("barrier" in core.findRunEntry(obj, "RUN-FIX-DOC-GUIDE-001").run, false);
  }
});

test("set-barrier refuses a LANE barrier where no lane exists — the stored lie (G2)", () => {
  const obj = lanelessTree();
  const refused = core.setBarrier(obj, { run: "RUN-L-TWO-001", barrier: "lane" });
  assert.equal(refused.errors.length, 1);
  assert.match(refused.errors[0], /declares no lanes/);
  assert.match(refused.errors[0], /or use global/);
  // GLOBAL on the same lane-less roadmap is legitimate and passes: a project with one
  // implicit lane can still want a synchronisation point.
  const allowed = core.setBarrier(obj, { run: "RUN-L-TWO-001", barrier: "global" });
  assert.deepEqual(allowed.errors, []);
  assert.equal(core.findRunEntry(obj, "RUN-L-TWO-001").run.barrier, "global");
});

test("set-barrier refuses an unknown run and requires one", () => {
  const obj = loadFixture();
  assert.match(core.setBarrier(obj, { run: "RUN-NOPE-001", barrier: "global" }).errors[0], /not found/);
  assert.match(core.setBarrier(obj, { run: "", barrier: "global" }).errors[0], /requires --run/);
});

test("set-barrier leaves satisfiability to checkInvariants, which catches a barrier that bars its own dependency", () => {
  // Built to break the rule the theorem says construction prevents: a run whose dependency
  // sits LATER in the queue. set-barrier itself says nothing; the post-check refuses.
  const obj = lanelessTree();
  const runs = obj.objectives[0].phases[0].runs;
  runs[0].depends_on = ["RUN-L-TWO-001"]; // #1 depends on #2 — a forward edge
  runs[1].depends_on = [];
  const mutation = core.setBarrier(obj, { run: "RUN-L-ONE-001", barrier: "global" });
  assert.deepEqual(mutation.errors, [], "the mutation itself owns no satisfiability rule");
  const errors = core.checkInvariants(obj, {});
  assert.ok(errors.some((e) => /unsatisfiable block/.test(e)), "checkInvariants must name the deadlock");
});

test("set-barrier is batchable next to set-lane: one preview, one write", () => {
  const plan = planEdit({
    filePath: LANES_CANONICAL,
    op: "batch",
    args: { ops: [
      { op: "set-lane", args: { run: "RUN-FIX-DOC-GUIDE-001", lane: "SAIL" } },
      { op: "set-barrier", args: { run: "RUN-FIX-DOC-GUIDE-001", barrier: "lane" } }
    ] }
  });
  assert.equal(plan.ok, true);
  const after = core.parseRoadmap(plan.serialized);
  const run = core.findRunEntry(after, "RUN-FIX-DOC-GUIDE-001").run;
  assert.equal(run.lane, "SAIL");
  assert.equal(run.barrier, "lane");
  // Key order is the canonical one regardless of the order the ops arrived in.
  assert.deepEqual(Object.keys(run).filter((k) => k === "lane" || k === "barrier"), ["lane", "barrier"]);
});

// -------------------------------------------------------------- 1b. the engine: declareLanes

test("declare-lanes writes root.lanes, canonically shaped, and touches no run", () => {
  const obj = lanelessTree();
  const runsBefore = JSON.stringify(obj.objectives);
  const result = core.declareLanes(obj, { lanes: [
    { lane_id: "BUILD", title: "Build" },
    { default: true, title: "Write", lane_id: "WRITE" } // keys out of order on purpose
  ] });
  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.after, ["BUILD", "WRITE"]);
  assert.equal(result.defaultLane, "WRITE");
  assert.deepEqual(obj.lanes, [
    { lane_id: "BUILD", title: "Build" },
    { lane_id: "WRITE", title: "Write", default: true }
  ]);
  assert.deepEqual(Object.keys(obj.lanes[1]), ["lane_id", "title", "default"], "entries are rebuilt in canonical key order");
  assert.equal(JSON.stringify(obj.objectives), runsBefore, "declaring a vocabulary never re-homes a run");
  // And root.lanes lands with the small root fields, keeping objectives last.
  assert.deepEqual(Object.keys(obj), ["schema_version", "roadmap_id", "title", "lanes", "objectives"]);
});

test("declare-lanes demands exactly one default (G1)", () => {
  for (const lanes of [
    [{ lane_id: "A", title: "A" }, { lane_id: "B", title: "B" }],
    [{ lane_id: "A", title: "A", default: true }, { lane_id: "B", title: "B", default: true }]
  ]) {
    const obj = lanelessTree();
    const result = core.declareLanes(obj, { lanes });
    assert.equal(result.errors.length, 1);
    assert.match(result.errors[0], /exactly one lane must be marked default/);
    assert.equal("lanes" in obj, false, "a refused declaration writes nothing");
  }
});

test("declare-lanes refuses a malformed entry by index, and never stores default:false (G1)", () => {
  const cases = [
    [[{ lane_id: "", title: "A", default: true }], /lane\[0\] missing string lane_id/],
    [[{ lane_id: "A", default: true }], /lane\[0\] missing string title/],
    [[{ lane_id: "A", title: "A", default: false }, { lane_id: "B", title: "B", default: true }], /lane\[0\] must omit default unless true/],
    [[{ lane_id: "A", title: "A", default: true, colour: "red" }], /lane\[0\] carries unexpected field colour/],
    [["A"], /lane\[0\] is not an object/],
    [[{ lane_id: "A", title: "A", default: true }, { lane_id: "A", title: "A2" }], /lane\[1\] duplicate lane_id A/]
  ];
  for (const [lanes, pattern] of cases) {
    const obj = lanelessTree();
    const result = core.declareLanes(obj, { lanes });
    assert.ok(result.errors.some((e) => pattern.test(e)), `expected ${pattern} in ${JSON.stringify(result.errors)}`);
    assert.equal("lanes" in obj, false);
  }
});

test("declare-lanes refuses to CLEAR a vocabulary runs still carry, and names them (G2)", () => {
  const obj = loadFixture();
  const result = core.declareLanes(obj, { lanes: [] });
  assert.equal(result.errors.length, 1);
  assert.match(result.errors[0], /cannot clear root\.lanes/);
  assert.match(result.errors[0], /RUN-FIX-DOC-COMP1-001/);
  assert.ok(core.declaredLanes(obj), "the vocabulary must survive a refused clear");
});

test("declare-lanes refuses a redeclaration that ORPHANS a lane in use, and names lane and runs (G3)", () => {
  const obj = loadFixture();
  const result = core.declareLanes(obj, { lanes: [
    { lane_id: "FORGE", title: "Forge", default: true },
    { lane_id: "SAIL", title: "Sail" }
  ] });
  assert.equal(result.errors.length, 1);
  assert.match(result.errors[0], /lane CHRONICLE is still stored on 4 run\(s\)/);
  assert.deepEqual(core.declaredLanes(obj).map((l) => l.lane_id), ["FORGE", "CHRONICLE", "SAIL"]);
});

test("declare-lanes CAN clear a vocabulary no run carries, and warns when there was none", () => {
  const obj = lanelessTree();
  const warned = core.declareLanes(obj, { lanes: null });
  assert.deepEqual(warned.errors, []);
  assert.match(warned.warnings[0], /nothing to clear/);
  core.declareLanes(obj, { lanes: [{ lane_id: "ONLY", title: "Only", default: true }] });
  const cleared = core.declareLanes(obj, { lanes: [] });
  assert.deepEqual(cleared.errors, []);
  assert.equal("lanes" in obj, false);
});

test("declare-lanes moving the default re-homes every lane-less run — the documented mechanic", () => {
  const obj = loadFixture();
  const runs = core.flattenRuns(obj).map(({ run }) => run);
  const lanelessRuns = runs.filter((run) => !("lane" in run)).map((run) => run.run_id);
  assert.ok(lanelessRuns.length > 0);
  for (const id of lanelessRuns) assert.equal(core.resolveRunLane(obj, core.findRunEntry(obj, id).run), "FORGE");
  const result = core.declareLanes(obj, { lanes: [
    { lane_id: "FORGE", title: "Forge — building" },
    { lane_id: "CHRONICLE", title: "Chronicle — documentation" },
    { lane_id: "SAIL", title: "Sail — operations", default: true }
  ] });
  assert.deepEqual(result.errors, []);
  for (const id of lanelessRuns) assert.equal(core.resolveRunLane(obj, core.findRunEntry(obj, id).run), "SAIL");
  // And no run gained a stored key while doing it.
  for (const id of lanelessRuns) assert.equal("lane" in core.findRunEntry(obj, id).run, false);
});

test("declare-lanes is NOT batchable — a root vocabulary change is not a per-run edit", () => {
  const plan = planEdit({
    filePath: LANES_CANONICAL,
    op: "batch",
    args: { ops: [{ op: "declare-lanes", args: { lanes: [{ lane_id: "X", title: "X", default: true }] } }] }
  });
  assert.equal(plan.ok, false);
  assert.match(plan.errors.join(" "), /not a batchable op/);
});

// ------------------------------------------------------------------ 2. the markup the modal paints

function renderEditor(harness, runId) {
  return vm.runInContext(
    `(function () {
       const model = v3Model(appData);
       const run = model.runsById.get(${JSON.stringify(runId)});
       return v3RenderRunEditor(run, model.contextByRunId.get(run.run_id), model);
     })()`,
    harness.sandbox
  );
}

async function loadProject(harness, key) {
  harness.sandbox.resetProjectScopedState();
  harness.sandbox.setActiveProjectBase(`/projects/${key}/`);
  const result = await harness.sandbox.loadActiveProject();
  await harness.flush();
  return result;
}

function harnessFor(roots) {
  return createConsoleHarness({ rendererPath: RENDERER, rootsByKey: roots });
}

test("the run editor paints a Barrier block: three choices, (no barrier) preselected, GLOBAL last", async () => {
  const harness = harnessFor(new Map([["lanes", LANES_ROOT]]));
  await loadProject(harness, "lanes");
  const html = renderEditor(harness, "RUN-FIX-DOC-GUIDE-001");
  assert.match(html, /data-v3edit-op="set-barrier"/);
  const block = html.split('data-v3edit-op="set-barrier"')[1].split("</div>\n      </div>")[0];
  const options = Array.from(block.matchAll(/<option value="([^"]*)"([^>]*)>/g)).map((m) => ({ value: m[1], attrs: m[2] }));
  assert.deepEqual(options.map((o) => o.value), ["", "lane", "global"], "GLOBAL is last, never first");
  assert.match(options[0].attrs, /selected/, "(no barrier) is the preselected choice");
  assert.equal(/selected/.test(options[2].attrs), false, "GLOBAL is never preselected");
  // The acknowledgement panel exists but starts hidden, so the ordinary path is unchanged.
  assert.match(block, /data-v3edit-barrier-global hidden/);
  assert.match(block, /data-v3edit-barrier-ack/);
});

test("the Barrier block names the consequence in runs of THIS roadmap, per scope", async () => {
  const harness = harnessFor(new Map([["lanes", LANES_ROOT]]));
  await loadProject(harness, "lanes");
  // RUN-FIX-DOC-COMP1-001 is #3 globally and #1 on its lane of 4: 9 later runs overall,
  // 3 later on its own lane. The block must say both numbers, from the model, not a guess.
  const html = renderEditor(harness, "RUN-FIX-DOC-COMP1-001");
  assert.match(html, /Lane barrier — bars the 3 later run\(s\) on CHRONICLE/);
  assert.match(html, /GLOBAL barrier — bars ALL 9 later run\(s\), in every lane/);
});

test("a run that IS a global barrier opens with its scope selected and the panel open", async () => {
  const harness = harnessFor(new Map([["lanes", LANES_ROOT]]));
  await loadProject(harness, "lanes");
  const html = renderEditor(harness, "RUN-FIX-PROTO-GATE-001");
  assert.match(html, /<option value="global" selected>/);
  assert.match(html, /data-v3edit-barrier-global>/, "the panel is open for a run that already is one");
  assert.match(html, /data-v3edit-barrier-ack checked>/);
});

test("on a LANE-LESS roadmap the lane option is disabled and says why; global stays available", async () => {
  const harness = harnessFor(new Map([["aiw-console", REPO_ROOT]]));
  await loadProject(harness, "aiw-console");
  const firstRun = vm.runInContext("v3Model(appData).allRuns[0].run_id", harness.sandbox);
  const html = renderEditor(harness, firstRun);
  assert.match(html, /<option value="lane" disabled>Lane barrier — unavailable: this roadmap declares no lanes<\/option>/);
  assert.match(html, /<option value="global"[^>]*>GLOBAL barrier/);
  // And the Lane block itself is still absent: nothing about lanes appeared on a lane-less
  // project beyond the barrier control, which is deliberately available everywhere.
  assert.equal(/data-v3edit-op="set-lane"/.test(html), false);
});

// ------------------------------------------------------------------ 3. the GLOBAL gate

// A modal stub just rich enough for v3EditBuildPayload: it reaches its fields with
// querySelector over data-attributes, and the harness's flat element registry has no tree.
function installModalStub(harness, { barrier, ack }) {
  vm.runInContext(`
    (function () {
      const fields = new Map([
        ["[data-v3edit-barrier]", { value: ${JSON.stringify(barrier)} }],
        ["[data-v3edit-barrier-ack]", { checked: ${ack ? "true" : "false"} }]
      ]);
      const modal = document.getElementById("edit-modal-body");
      modal.querySelector = (selector) => fields.get(selector) || null;
      modal.querySelectorAll = () => [];
    })();
  `, harness.sandbox);
}

function buildBarrierPayload(harness, runId, { barrier, ack }) {
  installModalStub(harness, { barrier, ack });
  return vm.runInContext(
    `v3EditModalTarget = { kind: "run", id: ${JSON.stringify(runId)} };` +
    `JSON.stringify(v3EditBuildPayload("set-barrier"))`,
    harness.sandbox
  );
}

test("the GATE: a GLOBAL barrier produces NO payload until it is acknowledged", async () => {
  const harness = harnessFor(new Map([["lanes", LANES_ROOT]]));
  await loadProject(harness, "lanes");
  const withoutAck = buildBarrierPayload(harness, "RUN-FIX-DOC-GUIDE-001", { barrier: "global", ack: false });
  assert.equal(withoutAck, "null", "an unacknowledged global must not even be previewable");
  const withAck = JSON.parse(buildBarrierPayload(harness, "RUN-FIX-DOC-GUIDE-001", { barrier: "global", ack: true }));
  assert.deepEqual(withAck, { op: "set-barrier", args: { run: "RUN-FIX-DOC-GUIDE-001", barrier: "global" } });
});

test("the gate applies ONLY to global: a lane barrier and a clear need no acknowledgement", async () => {
  const harness = harnessFor(new Map([["lanes", LANES_ROOT]]));
  await loadProject(harness, "lanes");
  const lane = JSON.parse(buildBarrierPayload(harness, "RUN-FIX-DOC-GUIDE-001", { barrier: "lane", ack: false }));
  assert.deepEqual(lane.args, { run: "RUN-FIX-DOC-GUIDE-001", barrier: "lane" });
  // Clearing travels as null — the engine's clearing gesture — and is never gated: undoing
  // a block is not the dangerous direction.
  const cleared = JSON.parse(buildBarrierPayload(harness, "RUN-FIX-PROTO-GATE-001", { barrier: "", ack: false }));
  assert.deepEqual(cleared.args, { run: "RUN-FIX-PROTO-GATE-001", barrier: null });
});

test("an unacknowledged global is REPORTED, not silently dropped, when the operator previews", async () => {
  const harness = harnessFor(new Map([["lanes", LANES_ROOT]]));
  await loadProject(harness, "lanes");
  installModalStub(harness, { barrier: "global", ack: false });
  assert.equal(vm.runInContext("v3BarrierGlobalPendingAck()", harness.sandbox), true);
  installModalStub(harness, { barrier: "global", ack: true });
  assert.equal(vm.runInContext("v3BarrierGlobalPendingAck()", harness.sandbox), false);
  installModalStub(harness, { barrier: "lane", ack: false });
  assert.equal(vm.runInContext("v3BarrierGlobalPendingAck()", harness.sandbox), false);
});

test("set-barrier joins the batch only when the stored scope actually differs", async () => {
  const harness = harnessFor(new Map([["lanes", LANES_ROOT]]));
  await loadProject(harness, "lanes");
  const changed = (runId, scope) => vm.runInContext(
    `v3BatchOpChanged("set-barrier", { run: ${JSON.stringify(runId)}, barrier: ${scope === null ? "null" : JSON.stringify(scope)} },` +
    ` v3Model(appData).runsById.get(${JSON.stringify(runId)}))`,
    harness.sandbox
  );
  assert.equal(changed("RUN-FIX-DOC-GUIDE-001", null), false, "no barrier -> no barrier is a no-op");
  assert.equal(changed("RUN-FIX-DOC-GUIDE-001", "lane"), true);
  assert.equal(changed("RUN-FIX-PROTO-GATE-001", "global"), false, "already global -> global is a no-op");
  assert.equal(changed("RUN-FIX-PROTO-GATE-001", null), true, "clearing a real barrier is a change");
});

// ------------------------------------------------------------------ 4. the wire: dry-run → confirm

let workDir = "";
let baseUrl = "";
let fixtureCanonical = "";
let originalBytes = "";

async function edit(body) {
  const response = await fetch(`${baseUrl}/projects/lanesfix/__project-console/roadmap/edit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return { status: response.status, payload: await response.json() };
}

// One full operator gesture: preview, then confirm with the baseline the preview returned.
async function dryRunThenConfirm(op, args) {
  const dry = await edit({ op, apply: false, args });
  assert.equal(dry.status, 200, `dry-run refused: ${JSON.stringify(dry.payload)}`);
  assert.equal(dry.payload.applied, false);
  assert.equal(dry.payload.dryRun, true);
  const confirm = await edit({ op, apply: true, args, baseline: dry.payload.baseline });
  assert.equal(confirm.status, 200, `confirm refused: ${JSON.stringify(confirm.payload)}`);
  assert.equal(confirm.payload.applied, true);
  return { dry: dry.payload, confirm: confirm.payload };
}

const currentRun = (runId) => core.findRunEntry(core.parseRoadmap(readFileSync(fixtureCanonical, "utf8")), runId).run;

test.before(async () => {
  workDir = mkdtempSync(join(tmpdir(), "barrier-control-"));
  // A COPY of the lanes fixture. Nothing below writes a real project.
  const root = join(workDir, "lanesfix");
  mkdirSync(root, { recursive: true });
  cpSync(LANES_ROOT, root, { recursive: true });
  fixtureCanonical = join(root, "roadmap", "roadmap.json");
  originalBytes = readFileSync(fixtureCanonical, "utf8");
  writeFileSync(join(workDir, "registry.json"), JSON.stringify({
    registry_model: "project_registry_v1",
    title: "Barrier control fixture",
    projects: [{ key: "lanesfix", root: "./lanesfix" }]
  }, null, 2), "utf8");
  process.env.PC_REGISTRY = join(workDir, "registry.json");
  await new Promise((listening) => server.listen(0, HOST, listening));
  baseUrl = `http://${HOST}:${server.address().port}`;
});

test.after(async () => {
  delete process.env.PC_REGISTRY;
  await new Promise((closed) => server.close(closed));
  rmSync(workDir, { recursive: true, force: true });
});

test("wire: a dry-run of a barrier writes NOTHING at all", async () => {
  const before = readFileSync(fixtureCanonical, "utf8");
  const beforeMtime = statSync(fixtureCanonical).mtimeMs;
  const dry = await edit({ op: "set-barrier", apply: false, args: { run: "RUN-FIX-DOC-GUIDE-001", barrier: "lane" } });
  assert.equal(dry.status, 200);
  assert.equal(dry.payload.ok, true);
  assert.ok(dry.payload.baseline.startsWith("sha256:"));
  assert.equal(readFileSync(fixtureCanonical, "utf8"), before);
  assert.equal(statSync(fixtureCanonical).mtimeMs, beforeMtime);
});

test("wire: mark a LANE barrier, then unmark it — and the file returns byte-exact", async () => {
  const before = readFileSync(fixtureCanonical, "utf8");
  await dryRunThenConfirm("set-barrier", { run: "RUN-FIX-DOC-GUIDE-001", barrier: "lane" });
  assert.equal(currentRun("RUN-FIX-DOC-GUIDE-001").barrier, "lane");
  await dryRunThenConfirm("set-barrier", { run: "RUN-FIX-DOC-GUIDE-001", barrier: null });
  assert.equal("barrier" in currentRun("RUN-FIX-DOC-GUIDE-001"), false);
  assert.equal(readFileSync(fixtureCanonical, "utf8"), before, "mark → unmark must restore the exact bytes");
});

test("wire: mark a GLOBAL barrier, then unmark it — and the file returns byte-exact", async () => {
  const before = readFileSync(fixtureCanonical, "utf8");
  await dryRunThenConfirm("set-barrier", { run: "RUN-FIX-DOC-GUIDE-001", barrier: "global" });
  assert.equal(currentRun("RUN-FIX-DOC-GUIDE-001").barrier, "global");
  await dryRunThenConfirm("set-barrier", { run: "RUN-FIX-DOC-GUIDE-001", barrier: null });
  assert.equal(readFileSync(fixtureCanonical, "utf8"), before, "mark → unmark must restore the exact bytes");
});

test("wire: unmark the fixture's OWN global barrier and put it back — byte-exact both ways", async () => {
  const before = readFileSync(fixtureCanonical, "utf8");
  assert.equal(currentRun("RUN-FIX-PROTO-GATE-001").barrier, "global");
  await dryRunThenConfirm("set-barrier", { run: "RUN-FIX-PROTO-GATE-001", barrier: null });
  assert.equal("barrier" in currentRun("RUN-FIX-PROTO-GATE-001"), false);
  assert.notEqual(readFileSync(fixtureCanonical, "utf8"), before);
  await dryRunThenConfirm("set-barrier", { run: "RUN-FIX-PROTO-GATE-001", barrier: "global" });
  assert.equal(readFileSync(fixtureCanonical, "utf8"), before, "unmark → remark must restore the exact bytes");
});

test("wire: the server refuses an unknown scope with the engine's own words (422), writing nothing", async () => {
  const before = readFileSync(fixtureCanonical, "utf8");
  const result = await edit({ op: "set-barrier", apply: false, args: { run: "RUN-FIX-DOC-GUIDE-001", barrier: "phase" } });
  assert.equal(result.status, 422);
  assert.equal(result.payload.reason, "refused");
  assert.match(result.payload.errors.join(" "), /must be one of lane, global/);
  assert.equal(readFileSync(fixtureCanonical, "utf8"), before);
});

test("wire: a confirm with a stale baseline is refused (409) and writes nothing", async () => {
  const dry = await edit({ op: "set-barrier", apply: false, args: { run: "RUN-FIX-DOC-GUIDE-001", barrier: "lane" } });
  assert.equal(dry.payload.ok, true);
  const before = readFileSync(fixtureCanonical, "utf8");
  const confirm = await edit({
    op: "set-barrier", apply: true, args: { run: "RUN-FIX-DOC-GUIDE-001", barrier: "lane" },
    baseline: "sha256:" + "0".repeat(64)
  });
  assert.equal(confirm.status, 409);
  assert.equal(confirm.payload.reason, "stale_baseline");
  assert.equal(readFileSync(fixtureCanonical, "utf8"), before);
});

test("wire: declare-lanes travels over the same route, and refuses to orphan a lane in use", async () => {
  const before = readFileSync(fixtureCanonical, "utf8");
  // A refused redeclaration: CHRONICLE is carried by four runs of the fixture.
  const refused = await edit({ op: "declare-lanes", apply: false, args: { lanes: [
    { lane_id: "FORGE", title: "Forge", default: true }, { lane_id: "SAIL", title: "Sail" }
  ] } });
  assert.equal(refused.status, 422);
  assert.match(refused.payload.errors.join(" "), /lane CHRONICLE is still stored on 4 run\(s\)/);
  assert.equal(readFileSync(fixtureCanonical, "utf8"), before);
  // An accepted one: add a fourth lane, then take it back out. Byte-exact round trip.
  const three = [
    { lane_id: "FORGE", title: "Forge — building", default: true },
    { lane_id: "CHRONICLE", title: "Chronicle — documentation" },
    { lane_id: "SAIL", title: "Sail — operations" }
  ];
  await dryRunThenConfirm("declare-lanes", { lanes: [...three, { lane_id: "ANVIL", title: "Anvil — research" }] });
  assert.equal(core.declaredLanes(core.parseRoadmap(readFileSync(fixtureCanonical, "utf8"))).length, 4);
  await dryRunThenConfirm("declare-lanes", { lanes: three });
  assert.equal(readFileSync(fixtureCanonical, "utf8"), before, "declare → redeclare must restore the exact bytes");
});
