// Lanes and barriers (D-051): the schema addition, its invariants, its transport, and its
// write path. Everything here runs against the checked-in lanes fixture
// (tests/fixtures/lanes/, lane keys deliberately arbitrary) or against COPIES of it in a
// temp dir; the two real canonical roadmaps are opened READ-ONLY and asserted unchanged in
// meaning (no lanes -> nothing new derives). The HTTP section boots the real serve.mjs on an
// ephemeral port with a generated PC_REGISTRY, exactly like serve-write-routes.test.mjs.
import test from "node:test";
import assert from "node:assert/strict";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import * as core from "../tools/roadmap/roadmap-core.mjs";
import { planEdit, applyPlan, loadCurrent } from "../tools/roadmap/roadmap-plan.mjs";
import {
  buildProjectRoadmap,
  buildRoadmapTreeSnapshot,
  detectRootLayout,
  flattenRoadmapTree
} from "../tools/projector/project.mjs";
import { server, HOST } from "../project-console/serve.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const FIXTURE_ROOT = join(HERE, "fixtures", "lanes", "project");
const FIXTURE_ROADMAP = join(FIXTURE_ROOT, "roadmap", "roadmap.json");
const REAL_CANONICALS = [
  join(REPO_ROOT, "roadmap", "roadmap.json"),
  resolve(REPO_ROOT, "..", "cantu-studio", ".aiw", "roadmap", "roadmap.json")
];

const md5 = (bytes) => createHash("md5").update(bytes).digest("hex");
const loadFixture = () => core.parseRoadmap(core.loadRaw(FIXTURE_ROADMAP));

// The console's label rule, derived HERE from engine primitives (global order filtered by
// resolved lane, position = index+1): the test proves the rule's properties on the DATA —
// nothing below reads any stored position, because none exists to read.
function laneSequences(obj) {
  const sequences = new Map();
  for (const run of core.globalOrdered(obj)) {
    const laneId = core.resolveRunLane(obj, run);
    if (!sequences.has(laneId)) sequences.set(laneId, []);
    sequences.get(laneId).push(run.run_id);
  }
  return sequences;
}

// ---------------------------------------------------------------- the fixture itself

test("lanes fixture: invariants pass, roundtrip is byte-identical", () => {
  const raw = core.loadRaw(FIXTURE_ROADMAP);
  const obj = core.parseRoadmap(raw);
  assert.deepEqual(core.checkInvariants(obj, {}), []);
  assert.equal(core.serialize(obj, core.detectEol(raw)), raw);
});

test("both real canonicals still pass invariants read-only; neither declares lanes and no run carries lane or barrier", () => {
  for (const path of REAL_CANONICALS) {
    const raw = core.loadRaw(path);
    const obj = core.parseRoadmap(raw);
    // The one legal external edge of the Cantu canonical resolves against the other tree
    // (CONTRATO §10.d), exactly as the server composes it.
    const externalRunIds = new Set();
    for (const other of REAL_CANONICALS) {
      if (other === path) continue;
      for (const { run } of core.flattenRuns(core.parseRoadmap(core.loadRaw(other)))) externalRunIds.add(run.run_id);
    }
    assert.deepEqual(core.checkInvariants(obj, { externalRunIds }), []);
    assert.equal(core.serialize(obj, core.detectEol(raw)), raw, `roundtrip must stay byte-identical for ${path}`);
    assert.equal("lanes" in obj, false);
    for (const { run } of core.flattenRuns(obj)) {
      assert.equal("lane" in run, false);
      assert.equal("barrier" in run, false);
    }
  }
});

test("no lane position is persisted anywhere: every run key is allowlisted and no derived key exists", () => {
  const obj = loadFixture();
  for (const { run } of core.flattenRuns(obj)) {
    for (const key of Object.keys(run)) {
      assert.ok(core.RUN_ALLOWED_FIELDS.includes(key), `unexpected run key ${key}`);
    }
  }
  // The projector emits the tree verbatim: emitted runs carry the same allowlisted keys only.
  const emitted = buildProjectRoadmap(FIXTURE_ROOT, { now: "2026-07-27T00:00:00.000Z" });
  for (const { run } of flattenRoadmapTree(emitted)) {
    for (const key of Object.keys(run)) {
      assert.ok(core.RUN_ALLOWED_FIELDS.includes(key), `emitted run carries non-allowlisted key ${key}`);
    }
  }
});

test("barriers are a rule, not edges: the fixture stores 5 depends_on edges while the two barriers bar 8 runs, and no stored edge points at a barrier", () => {
  const obj = loadFixture();
  const runs = core.flattenRuns(obj).map((entry) => entry.run);
  const storedEdges = runs.reduce((total, run) => total + run.depends_on.length, 0);
  assert.equal(storedEdges, 5);
  // Derived barred sets, straight from the rule (later by queue_order, lane-restricted for
  // lane scope). The global barrier at #5 bars the 7 later runs in every lane; the CHRONICLE
  // lane barrier at #8 bars the 1 later CHRONICLE run.
  const barriers = runs.filter((run) => run.barrier);
  assert.deepEqual(barriers.map((b) => [b.run_id, b.barrier]), [
    ["RUN-FIX-PROTO-GATE-001", "global"],
    ["RUN-FIX-DOC-STYLE-001", "lane"]
  ]);
  const barredBy = (barrier) => runs.filter((other) =>
    other.queue_order > barrier.queue_order &&
    (barrier.barrier === "global" || core.resolveRunLane(obj, other) === core.resolveRunLane(obj, barrier)));
  assert.equal(barredBy(barriers[0]).length, 7);
  assert.deepEqual(barredBy(barriers[1]).map((r) => r.run_id), ["RUN-FIX-DOC-GUIDE-001"]);
  // Written by hand those would be 8 more edges; none exists.
  for (const run of runs) {
    for (const dep of run.depends_on) {
      assert.ok(!barriers.some((b) => b.run_id === dep), `stored edge ${run.run_id} -> ${dep} duplicates the barrier rule`);
    }
  }
});

test("lane resolution: absent lane resolves to the declared default; mixed roadmap resolves per run", () => {
  const obj = loadFixture();
  assert.equal(core.defaultLaneId(obj), "FORGE");
  const byId = new Map(core.flattenRuns(obj).map((entry) => [entry.run.run_id, entry.run]));
  assert.equal(core.resolveRunLane(obj, byId.get("RUN-FIX-BASE-001")), "FORGE"); // no lane key stored
  assert.equal(core.resolveRunLane(obj, byId.get("RUN-FIX-DOC-COMP1-001")), "CHRONICLE");
  assert.equal(core.resolveRunLane(obj, byId.get("RUN-FIX-OPS-DEPLOY-001")), "SAIL");
  // A roadmap with NO lanes resolves every run to null: one implicit lane.
  const laneless = core.parseRoadmap(core.loadRaw(REAL_CANONICALS[0]));
  for (const { run } of core.flattenRuns(laneless)) {
    assert.equal(core.resolveRunLane(laneless, run), null);
  }
});

test("derived in-lane positions are stable when a NEW lane is declared", () => {
  const obj = loadFixture();
  const before = laneSequences(obj);
  const withExtra = core.parseRoadmap(core.loadRaw(FIXTURE_ROADMAP));
  withExtra.lanes.push({ lane_id: "NEWLANE", title: "Newly declared lane" });
  assert.deepEqual(core.checkInvariants(withExtra, {}), []);
  const after = laneSequences(withExtra);
  for (const [laneId, sequence] of before) {
    assert.deepEqual(after.get(laneId), sequence, `lane ${laneId} sequence moved when an unrelated lane was added`);
  }
  assert.equal(after.has("NEWLANE"), false); // no runs on it yet -> no positions to have
});

// ---------------------------------------------------------------- invariants that must refuse

function withLanes(mutate) {
  const obj = loadFixture();
  mutate(obj);
  return core.checkInvariants(obj, {});
}

test("lanes vocabulary form is enforced", () => {
  assert.match(withLanes((o) => { o.lanes = []; }).join("\n"), /root\.lanes must be a non-empty array/);
  assert.match(withLanes((o) => { o.lanes[1].lane_id = "FORGE"; }).join("\n"), /duplicate lane_id FORGE/);
  assert.match(withLanes((o) => { delete o.lanes[0].default; }).join("\n"), /exactly one lane as default \(found 0\)/);
  assert.match(withLanes((o) => { o.lanes[1].default = true; }).join("\n"), /exactly one lane as default \(found 2\)/);
  assert.match(withLanes((o) => { o.lanes[1].default = false; }).join("\n"), /must omit default unless true/);
  assert.match(withLanes((o) => { o.lanes[1].color = "red"; }).join("\n"), /carries unexpected field color/);
  assert.match(withLanes((o) => { o.lanes[1].title = ""; }).join("\n"), /missing string title/);
});

test("every lane used must be declared — in a lanes roadmap and in a lane-less one", () => {
  const undeclared = withLanes((o) => { o.objectives[0].phases[0].runs[0].lane = "PHANTOM"; });
  assert.match(undeclared.join("\n"), /uses lane PHANTOM, which root\.lanes does not declare \(declared: FORGE, CHRONICLE, SAIL\)/);
  const laneless = withLanes((o) => { delete o.lanes; o.objectives[0].phases[0].runs[0].lane = "FORGE"; });
  assert.match(laneless.join("\n"), /uses lane FORGE.*declares no lanes/);
});

test("barrier scope is a closed vocabulary", () => {
  const errors = withLanes((o) => { o.objectives[0].phases[1].runs[0].barrier = "sideways"; });
  assert.match(errors.join("\n"), /barrier must be one of lane, global; found "sideways"/);
});

test("an unsatisfiable barrier is refused, named alongside the precedence break that causes it", () => {
  // Force the theorem's premise to break: the barrier depends on a run it bars (a forward
  // dependency). Both the precedence rule and the barrier guard must fire, and the barrier
  // error must name the deadlock.
  const errors = withLanes((o) => {
    // RUN-FIX-PROTO-GATE-001 (global barrier, #5) depends on RUN-FIX-COMP3-001 (#6).
    o.objectives[0].phases[1].runs[0].depends_on = ["RUN-FIX-COMP3-001"];
  });
  assert.match(errors.join("\n"), /must depend only on earlier runs/);
  assert.match(errors.join("\n"), /barrier run RUN-FIX-PROTO-GATE-001 \(global scope\) would create an unsatisfiable block: it bars RUN-FIX-COMP3-001/);
});

test("on a file that passes precedence, the barrier guard can never fire (the theorem, pinned)", () => {
  // The fixture holds a global barrier WITH depends_on and a lane barrier behind it; both
  // pass. The guard exists for the day precedence is relaxed, not for today's data.
  assert.deepEqual(core.checkInvariants(loadFixture(), {}), []);
});

// ---------------------------------------------------------------- set-lane (the mutation)

test("set-lane assigns a declared lane, serializes it in canonical key position, and clears back to default", () => {
  const obj = loadFixture();
  const target = "RUN-FIX-COMP3-001"; // stores no lane today
  const assign = core.setLane(obj, { run: target, lane: "SAIL" });
  assert.deepEqual(assign.errors, []);
  assert.equal(assign.before, null);
  assert.equal(assign.after, "SAIL");
  const run = core.findRunEntry(obj, target).run;
  assert.equal(run.lane, "SAIL");
  // Canonical key order: lane lands after depends_on, before closeout fields.
  const keys = Object.keys(run);
  assert.ok(keys.indexOf("lane") > keys.indexOf("depends_on"));
  assert.deepEqual(core.checkInvariants(obj, {}), []);
  const clear = core.setLane(obj, { run: target, lane: null });
  assert.deepEqual(clear.errors, []);
  assert.equal("lane" in run, false);
  const again = core.setLane(obj, { run: target, lane: "" });
  assert.equal(again.warnings.length, 1);
  assert.match(again.warnings[0], /already on the project default/);
});

test("set-lane refuses an undeclared lane, and refuses any lane when none are declared", () => {
  const obj = loadFixture();
  const bad = core.setLane(obj, { run: "RUN-FIX-COMP3-001", lane: "PHANTOM" });
  assert.match(bad.errors.join("\n"), /lane PHANTOM is not declared in root\.lanes \(declared: FORGE, CHRONICLE, SAIL\)/);
  const laneless = core.parseRoadmap(core.loadRaw(REAL_CANONICALS[0]));
  const refused = core.setLane(laneless, { run: core.globalOrdered(laneless)[0].run_id, lane: "FORGE" });
  assert.match(refused.errors.join("\n"), /declares no lanes/);
});

test("set-lane goes through planEdit end to end, alone and inside a batch, on a COPY of the fixture", () => {
  const workDir = mkdtempSync(join(tmpdir(), "set-lane-"));
  try {
    const filePath = join(workDir, "roadmap.json");
    writeFileSync(filePath, core.loadRaw(FIXTURE_ROADMAP), "utf8");
    const plan = planEdit({ filePath, op: "set-lane", args: { run: "RUN-FIX-COMP3-001", lane: "SAIL" } });
    assert.equal(plan.ok, true, (plan.errors || []).join("\n"));
    assert.deepEqual(plan.remap, []); // queue order untouched by construction
    const applied = applyPlan({ filePath, serialized: plan.serialized, validate: null });
    assert.equal(applied.written, true);
    const reread = core.parseRoadmap(core.loadRaw(filePath));
    assert.equal(core.findRunEntry(reread, "RUN-FIX-COMP3-001").run.lane, "SAIL");
    assert.deepEqual(core.checkInvariants(reread, {}), []);
    // Batchable: set-lane + set-text against the same file in one plan.
    const batch = planEdit({
      filePath,
      op: "batch",
      args: { ops: [
        { op: "set-lane", args: { run: "RUN-FIX-COMP3-001", lane: null } },
        { op: "set-text", args: { targetType: "run", targetId: "RUN-FIX-COMP3-001", title: "Component 3 (batch)" } }
      ] }
    });
    assert.equal(batch.ok, true, (batch.errors || []).join("\n"));
  } finally {
    rmSync(workDir, { recursive: true, force: true });
  }
});

test("dry-run refuses: assigning an undeclared lane never reaches disk", () => {
  const workDir = mkdtempSync(join(tmpdir(), "set-lane-refuse-"));
  try {
    const filePath = join(workDir, "roadmap.json");
    const original = core.loadRaw(FIXTURE_ROADMAP);
    writeFileSync(filePath, original, "utf8");
    const plan = planEdit({ filePath, op: "set-lane", args: { run: "RUN-FIX-COMP3-001", lane: "PHANTOM" } });
    assert.equal(plan.ok, false);
    assert.equal(plan.stage, "mutate");
    assert.match(plan.errors.join("\n"), /not declared in root\.lanes/);
    assert.equal(core.loadRaw(filePath), original);
  } finally {
    rmSync(workDir, { recursive: true, force: true });
  }
});

// ---------------------------------------------------------------- transport (the projector)

test("the emitted envelope transports the lane vocabulary verbatim, in both artifacts, from one function", () => {
  const now = "2026-07-27T00:00:00.000Z";
  const roadmap = buildProjectRoadmap(FIXTURE_ROOT, { now });
  const snapshot = buildRoadmapTreeSnapshot(FIXTURE_ROOT, { now });
  const declared = loadFixture().lanes;
  assert.deepEqual(roadmap.lanes, declared);
  assert.deepEqual(snapshot.roadmap_tree.lanes, declared);
  // Key placement: lanes rides inside the tree block, before objectives, exactly once.
  const keys = Object.keys(snapshot.roadmap_tree);
  assert.ok(keys.indexOf("lanes") > -1 && keys.indexOf("lanes") < keys.indexOf("objectives"));
});

test("a tree that declares no lanes emits NO lanes key — the old path is untouched", () => {
  const layout = detectRootLayout(REPO_ROOT);
  assert.ok(layout, "this repository must resolve a root layout");
  const emitted = buildProjectRoadmap(REPO_ROOT, { now: "2026-07-27T00:00:00.000Z" });
  assert.equal("lanes" in emitted, false);
  const snapshot = buildRoadmapTreeSnapshot(REPO_ROOT, { now: "2026-07-27T00:00:00.000Z" });
  assert.equal("lanes" in snapshot.roadmap_tree, false);
});

// ---------------------------------------------------------------- no baked lane keys

test("no fixture lane key is baked into engine, projector, server, renderer or markup", () => {
  const shipped = [
    "tools/roadmap/roadmap-core.mjs",
    "tools/roadmap/roadmap-plan.mjs",
    "tools/projector/project.mjs",
    "project-console/serve.mjs",
    "project-console/assets/project-console.js",
    "project-console/index.html",
    "project-console/assets/project-console.css"
  ];
  for (const file of shipped) {
    const body = readFileSync(join(REPO_ROOT, file), "utf8");
    for (const key of ["FORGE", "CHRONICLE", "SAIL"]) {
      assert.equal(body.includes(key), false, `${file} names fixture lane key ${key}`);
    }
  }
});

// ---------------------------------------------------------------- the write route, over HTTP

let httpWorkDir = "";
let baseUrl = "";
let lanesRoadmapPath = "";

async function jsonRequest(method, path, body) {
  const response = await fetch(baseUrl + path, {
    method,
    headers: body ? { "Content-Type": "application/json" } : {},
    body: body ? JSON.stringify(body) : undefined
  });
  const text = await response.text();
  let payload = null;
  try { payload = JSON.parse(text); } catch { /* non-JSON */ }
  return { status: response.status, payload };
}

test.before(async () => {
  httpWorkDir = mkdtempSync(join(tmpdir(), "roadmap-lanes-http-"));
  // lanes: a COPY of the checked-in fixture project (the repo fixture is never written).
  cpSync(join(HERE, "fixtures", "lanes", "project"), join(httpWorkDir, "lanes"), { recursive: true });
  lanesRoadmapPath = join(httpWorkDir, "lanes", "roadmap", "roadmap.json");
  // broken: a lanes roadmap whose vocabulary breaks the new invariant (two defaults).
  const broken = loadFixture();
  broken.lanes[1].default = true;
  mkdirSync(join(httpWorkDir, "broken", "roadmap"), { recursive: true });
  writeFileSync(join(httpWorkDir, "broken", "roadmap", "roadmap.json"), core.serialize(broken, "\n"), "utf8");
  // stuck: a barrier that bars a run it depends on (forward dep) — unsatisfiable.
  const stuck = loadFixture();
  stuck.objectives[0].phases[1].runs[0].depends_on = ["RUN-FIX-COMP3-001"];
  mkdirSync(join(httpWorkDir, "stuck", "roadmap"), { recursive: true });
  writeFileSync(join(httpWorkDir, "stuck", "roadmap", "roadmap.json"), core.serialize(stuck, "\n"), "utf8");
  writeFileSync(join(httpWorkDir, "registry.json"), JSON.stringify({
    registry_model: "project_registry_v1",
    title: "Lanes fixtures",
    projects: [
      { key: "lanes", root: "./lanes" },
      { key: "broken", root: "./broken" },
      { key: "stuck", root: "./stuck" }
    ]
  }, null, 2), "utf8");
  process.env.PC_REGISTRY = join(httpWorkDir, "registry.json");
  await new Promise((resolveListen) => server.listen(0, HOST, resolveListen));
  baseUrl = `http://${HOST}:${server.address().port}`;
});

test.after(async () => {
  delete process.env.PC_REGISTRY;
  await new Promise((resolveClose) => server.close(resolveClose));
  rmSync(httpWorkDir, { recursive: true, force: true });
});

test("HTTP: a lanes-and-barriers roadmap is editable — dry-run, confirm, and byte-exact revert", async () => {
  const before = readFileSync(lanesRoadmapPath);
  const probe = await jsonRequest("GET", "/projects/lanes/__project-console/roadmap/edit");
  assert.equal(probe.status, 405);
  assert.equal(probe.payload.reason, "method_not_allowed");

  const editArgs = { targetType: "run", targetId: "RUN-FIX-COMP3-001", title: "Component 3 [QA-LANES]" };
  const dry = await jsonRequest("POST", "/projects/lanes/__project-console/roadmap/edit", { op: "set-text", args: editArgs });
  assert.equal(dry.status, 200, JSON.stringify(dry.payload));
  assert.equal(dry.payload.applied, false);
  const confirm = await jsonRequest("POST", "/projects/lanes/__project-console/roadmap/edit", { op: "set-text", args: editArgs, apply: true, baseline: dry.payload.baseline });
  assert.equal(confirm.status, 200, JSON.stringify(confirm.payload));
  assert.equal(confirm.payload.applied, true);
  assert.equal(confirm.payload.reemit && confirm.payload.reemit.ok, true);
  // The re-emitted derived roadmap carries the lanes vocabulary.
  const emitted = JSON.parse(readFileSync(join(httpWorkDir, "lanes", ".project", "roadmap.json"), "utf8"));
  assert.deepEqual(emitted.lanes.map((lane) => lane.lane_id), ["FORGE", "CHRONICLE", "SAIL"]);

  // Revert through the same route; the canonical ends byte-identical to how it started.
  const revertArgs = { targetType: "run", targetId: "RUN-FIX-COMP3-001", title: "Component 3" };
  const dry2 = await jsonRequest("POST", "/projects/lanes/__project-console/roadmap/edit", { op: "set-text", args: revertArgs });
  assert.equal(dry2.status, 200);
  const confirm2 = await jsonRequest("POST", "/projects/lanes/__project-console/roadmap/edit", { op: "set-text", args: revertArgs, apply: true, baseline: dry2.payload.baseline });
  assert.equal(confirm2.status, 200);
  assert.equal(md5(readFileSync(lanesRoadmapPath)), md5(before));
});

test("HTTP: set-lane assigns and clears a lane through dry-run→confirm, byte-exact after revert", async () => {
  const before = readFileSync(lanesRoadmapPath);
  const dry = await jsonRequest("POST", "/projects/lanes/__project-console/roadmap/edit", { op: "set-lane", args: { run: "RUN-FIX-COMP3-001", lane: "SAIL" } });
  assert.equal(dry.status, 200, JSON.stringify(dry.payload));
  const confirm = await jsonRequest("POST", "/projects/lanes/__project-console/roadmap/edit", { op: "set-lane", args: { run: "RUN-FIX-COMP3-001", lane: "SAIL" }, apply: true, baseline: dry.payload.baseline });
  assert.equal(confirm.status, 200, JSON.stringify(confirm.payload));
  const written = core.parseRoadmap(readFileSync(lanesRoadmapPath, "utf8"));
  assert.equal(core.findRunEntry(written, "RUN-FIX-COMP3-001").run.lane, "SAIL");
  const dry2 = await jsonRequest("POST", "/projects/lanes/__project-console/roadmap/edit", { op: "set-lane", args: { run: "RUN-FIX-COMP3-001", lane: null } });
  const confirm2 = await jsonRequest("POST", "/projects/lanes/__project-console/roadmap/edit", { op: "set-lane", args: { run: "RUN-FIX-COMP3-001", lane: null }, apply: true, baseline: dry2.payload.baseline });
  assert.equal(confirm2.status, 200);
  assert.equal(md5(readFileSync(lanesRoadmapPath)), md5(before));
});

test("HTTP: an undeclared lane is refused in dry-run (422) and writes nothing", async () => {
  const before = readFileSync(lanesRoadmapPath);
  const dry = await jsonRequest("POST", "/projects/lanes/__project-console/roadmap/edit", { op: "set-lane", args: { run: "RUN-FIX-COMP3-001", lane: "PHANTOM" } });
  assert.equal(dry.status, 422);
  assert.match((dry.payload.errors || []).join("\n"), /not declared in root\.lanes/);
  assert.equal(md5(readFileSync(lanesRoadmapPath)), md5(before));
});

test("HTTP: a roadmap whose lane vocabulary is malformed is refused in pre-flight, naming the rule", async () => {
  const dry = await jsonRequest("POST", "/projects/broken/__project-console/roadmap/edit", { op: "set-text", args: { targetType: "run", targetId: "RUN-FIX-COMP3-001", title: "x" } });
  assert.equal(dry.status, 409);
  assert.equal(dry.payload.reason, "roadmap_not_editable");
  assert.match((dry.payload.errors || []).join("\n"), /exactly one lane as default \(found 2\)/);
});

test("HTTP: an unsatisfiable barrier is refused in pre-flight, naming the barrier and the barred run", async () => {
  const dry = await jsonRequest("POST", "/projects/stuck/__project-console/roadmap/edit", { op: "set-text", args: { targetType: "run", targetId: "RUN-FIX-COMP3-001", title: "x" } });
  assert.equal(dry.status, 409);
  assert.equal(dry.payload.reason, "roadmap_not_editable");
  const text = (dry.payload.errors || []).join("\n");
  assert.match(text, /unsatisfiable block/);
  assert.match(text, /barrier run RUN-FIX-PROTO-GATE-001/);
});
