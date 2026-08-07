// Batches (#48, the D-030 model): the schema addition, its invariants — above all the
// batch/human-approval DEADLOCK, in BOTH directions — its transport, its write path and its
// console selector. Everything here runs against the checked-in batches fixture
// (tests/fixtures/batches/, batch keys and branches deliberately arbitrary) or against
// COPIES of it in a temp dir; the two real canonical roadmaps are opened READ-ONLY and
// asserted unchanged in meaning (no batches -> nothing new derives).
//
// The shape is the lanes suite's (tests/roadmap-lanes.test.mjs), copied on purpose: batches
// copied the lane model, so their proofs copy the lane proofs. What lanes never needed and
// this suite adds is the deadlock pair: an edge that waits on the human approval of a run
// of the SAME batch must FAIL, and the same edge across two batches must PASS — an
// invariant proven only on the refusing side would not show it lets the legitimate case
// through.
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import * as core from "../tools/roadmap/roadmap-core.mjs";
import { KNOWN_OPS, planEdit, applyPlan } from "../tools/roadmap/roadmap-plan.mjs";
import {
  buildProjectRoadmap,
  buildRoadmapTreeSnapshot,
  detectRootLayout,
  flattenRoadmapTree
} from "../tools/projector/project.mjs";
import { createConsoleHarness } from "./helpers/console-dom.mjs";
import { frozenCanonicalPath } from "./helpers/neighbours.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const RENDERER = join(REPO_ROOT, "project-console", "assets", "project-console.js");
const FIXTURE_ROOT = join(HERE, "fixtures", "batches", "project");
const FIXTURE_ROADMAP = join(FIXTURE_ROOT, "roadmap", "roadmap.json");
const REAL_CANONICALS = [
  frozenCanonicalPath("aiw-console"),
  frozenCanonicalPath("cantu-studio")
];

const loadFixture = () => core.parseRoadmap(core.loadRaw(FIXTURE_ROADMAP));

// Mutate a COPY of the fixture in memory and return what the validator says about it.
function withBatches(mutate) {
  const obj = loadFixture();
  mutate(obj);
  return core.checkInvariants(obj, {});
}

function runById(obj, id) {
  return core.findRunEntry(obj, id).run;
}

// ---------------------------------------------------------------- the fixture itself

test("batches fixture: invariants pass, roundtrip is byte-identical", () => {
  const raw = core.loadRaw(FIXTURE_ROADMAP);
  const obj = core.parseRoadmap(raw);
  assert.deepEqual(core.checkInvariants(obj, {}), []);
  assert.equal(core.serialize(obj, core.detectEol(raw)), raw);
});

test("membership is optional: the fixture stores batched AND batch-less runs, and every batch used is declared", () => {
  const obj = loadFixture();
  const runs = core.flattenRuns(obj).map(({ run }) => run);
  const batched = runs.filter((run) => "batch" in run);
  const batchless = runs.filter((run) => !("batch" in run));
  assert.equal(batched.length, 4);
  assert.equal(batchless.length, 2);
  const declared = new Set(core.declaredBatches(obj).map((batch) => batch.batch_id));
  for (const run of batched) {
    assert.ok(declared.has(run.batch), `run ${run.run_id} uses undeclared batch ${run.batch}`);
  }
  // No default marker exists to resolve the batch-less runs anywhere: they are IN no batch.
  for (const batch of core.declaredBatches(obj)) {
    assert.equal("default" in batch, false, "a batch entry must not carry a default marker");
  }
});

test("every batch entry names its branch, and the branch is data — unique ids, free-form branches", () => {
  const obj = loadFixture();
  const batches = core.declaredBatches(obj);
  assert.equal(batches.length, 2);
  for (const batch of batches) {
    assert.equal(typeof batch.branch, "string");
    assert.ok(batch.branch.length > 0, `batch ${batch.batch_id} must name a branch`);
    assert.deepEqual(Object.keys(batch), ["batch_id", "title", "branch"]);
  }
});

test("declaredBatches mirrors declaredLanes: null for an absent key, null for an engine-refused empty", () => {
  assert.equal(core.declaredBatches({}), null);
  assert.equal(core.declaredBatches({ batches: [] }), null);
  assert.equal(core.declaredBatches(loadFixture()).length, 2);
});

// The real canonicals: batch-less today, pinned exactly as the lane-less pin was. If either
// project ever gains batches it will be a decision, and this test is where it has to be
// registered. (This run delivers the CAPABILITY; populating it is the operator's later turn.)
test("both real canonicals are batch-less: no root.batches, no run carries the key, and both still pass read-only", () => {
  for (const path of REAL_CANONICALS) {
    const obj = core.parseRoadmap(core.loadRaw(path));
    assert.equal("batches" in obj, false, `${path} must declare no batches`);
    for (const { run } of core.flattenRuns(obj)) {
      assert.equal("batch" in run, false, `run ${run.run_id} must carry no batch key`);
    }
  }
});

// ---------------------------------------------------------------- THE DEADLOCK, both directions

test("DEADLOCK refused: a human-approval edge whose origin and target share a batch fails, by name", () => {
  // Move the cross-batch consumer INTO its target's batch: delta (NIGHT-B) waits on the
  // human approval of alpha (NIGHT-A); re-homing delta to NIGHT-A traps the edge.
  const errors = withBatches((o) => { runById(o, "RUN-FIX-DELTA-001").batch = "NIGHT-A"; });
  assert.equal(errors.length, 1, errors.join("\n"));
  assert.match(errors[0], /RUN-FIX-DELTA-001 waits on human approval of RUN-FIX-ALPHA-001, and both sit in batch NIGHT-A/);
  assert.match(errors[0], /can never be satisfied/);
});

test("DEADLOCK refused from the other side too: batching the unbatched consumer of a batched target", () => {
  // Omega (no batch) waits on gamma (NIGHT-A). Putting omega in NIGHT-A traps that edge.
  const errors = withBatches((o) => { runById(o, "RUN-FIX-OMEGA-001").batch = "NIGHT-A"; });
  assert.equal(errors.length, 1, errors.join("\n"));
  assert.match(errors[0], /RUN-FIX-OMEGA-001 waits on human approval of RUN-FIX-GAMMA-001, and both sit in batch NIGHT-A/);
});

test("PASSES: the same edge ACROSS two batches is legal and is the point of the model", () => {
  // The fixture as shipped: delta (NIGHT-B) -> human approval of alpha (NIGHT-A). Asserted
  // through the full validator so nothing else trips either.
  assert.deepEqual(core.checkInvariants(loadFixture(), {}), []);
  const obj = loadFixture();
  const delta = runById(obj, "RUN-FIX-DELTA-001");
  assert.deepEqual(delta.depends_on_human_approved, ["RUN-FIX-ALPHA-001"]);
  assert.notEqual(delta.batch, runById(obj, "RUN-FIX-ALPHA-001").batch);
});

test("PASSES: an edge with only ONE batched endpoint — either endpoint — shares no batch", () => {
  // Consumer unbatched (omega -> gamma) is the fixture as shipped. Target unbatched is the
  // mirror: strip alpha's batch and delta's edge crosses a batch boundary trivially.
  assert.deepEqual(withBatches((o) => { delete runById(o, "RUN-FIX-ALPHA-001").batch; }), []);
});

test("PASSES: a plain depends_on edge INSIDE one batch is legal — only the human-approval kind deadlocks", () => {
  const obj = loadFixture();
  const beta = runById(obj, "RUN-FIX-BETA-001");
  assert.deepEqual(beta.depends_on, ["RUN-FIX-ALPHA-001"]);
  assert.equal(beta.batch, runById(obj, "RUN-FIX-ALPHA-001").batch, "the fixture keeps this pair in ONE batch on purpose");
  assert.deepEqual(core.checkInvariants(obj, {}), []);
});

test("PASSES: several approval-needing runs share a batch legally while none waits on another's approval", () => {
  // Alpha and gamma both sit in NIGHT-A and both have human-approval CONSUMERS (delta,
  // omega) — outside the batch. The grouping rule allows exactly this.
  const obj = loadFixture();
  assert.equal(runById(obj, "RUN-FIX-ALPHA-001").batch, "NIGHT-A");
  assert.equal(runById(obj, "RUN-FIX-GAMMA-001").batch, "NIGHT-A");
  assert.deepEqual(core.checkInvariants(obj, {}), []);
});

test("a batch-less roadmap with human-approval edges raises nothing from the deadlock walk", () => {
  const errors = withBatches((o) => {
    for (const { run } of core.flattenRuns(o)) delete run.batch;
    delete o.batches;
  });
  assert.deepEqual(errors, []);
});

// ---------------------------------------------------------------- vocabulary form refusals

test("batches vocabulary form is enforced — the lanes block, minus default, plus branch", () => {
  assert.match(withBatches((o) => { o.batches = []; }).join("\n"), /root\.batches must be a non-empty array/);
  assert.match(withBatches((o) => { o.batches[1].batch_id = "NIGHT-A"; }).join("\n"), /duplicate batch_id NIGHT-A/);
  assert.match(withBatches((o) => { o.batches[1].title = ""; }).join("\n"), /missing string title/);
  assert.match(withBatches((o) => { delete o.batches[1].branch; }).join("\n"), /batch NIGHT-B missing string branch/);
  assert.match(withBatches((o) => { o.batches[1].branch = ""; }).join("\n"), /missing string branch/);
  assert.match(withBatches((o) => { o.batches[1].color = "red"; }).join("\n"), /carries unexpected field color/);
  // The divergence from lanes is enforced, not accidental: `default` is not in the batch
  // allowlist, so a default marker is refused as an unexpected field.
  assert.match(withBatches((o) => { o.batches[0].default = true; }).join("\n"), /carries unexpected field default/);
  assert.equal(core.BATCH_ALLOWED_FIELDS.includes("default"), false);
});

test("every batch used must be declared — in a batches roadmap and in a batch-less one", () => {
  const undeclared = withBatches((o) => { runById(o, "RUN-FIX-SEED-001").batch = "PHANTOM"; });
  assert.match(undeclared.join("\n"), /uses batch PHANTOM, which root\.batches does not declare \(declared: NIGHT-A, NIGHT-B\)/);
  const batchless = withBatches((o) => {
    for (const { run } of core.flattenRuns(o)) delete run.batch;
    delete o.batches;
    runById(o, "RUN-FIX-SEED-001").batch = "NIGHT-A";
  });
  assert.match(batchless.join("\n"), /uses batch NIGHT-A.*declares no batches/);
  const empty = withBatches((o) => { runById(o, "RUN-FIX-SEED-001").batch = ""; });
  assert.match(empty.join("\n"), /batch must be a non-empty string when present/);
});

// ---------------------------------------------------------------- declare-batches (the vocabulary op)

test("declare-batches declares on a batch-less tree, serializes beside lanes' position, and clears when unused", () => {
  const obj = withoutBatches();
  const declared = core.declareBatches(obj, {
    batches: [
      { batch_id: "B1", title: "One", branch: "aiw/b1" },
      { batch_id: "B2", title: "Two", branch: "aiw/b2" }
    ]
  });
  assert.deepEqual(declared.errors, []);
  assert.deepEqual(declared.before, null);
  assert.deepEqual(declared.after, ["B1", "B2"]);
  // Canonical root key position: before objectives (the tree stays the file's last key).
  const keys = Object.keys(obj);
  assert.ok(keys.indexOf("batches") > -1 && keys.indexOf("batches") < keys.indexOf("objectives"));
  assert.deepEqual(core.checkInvariants(obj, {}), []);
  // Entry keys are rebuilt in canonical order regardless of caller order.
  const reordered = core.declareBatches(obj, {
    batches: [{ branch: "aiw/b3", title: "Three", batch_id: "B3" }]
  });
  assert.deepEqual(reordered.errors, []);
  assert.deepEqual(Object.keys(obj.batches[0]), ["batch_id", "title", "branch"]);
  // Clearing with nothing stored on any run deletes the key whole.
  const cleared = core.declareBatches(obj, { batches: null });
  assert.deepEqual(cleared.errors, []);
  assert.equal("batches" in obj, false);
  const again = core.declareBatches(obj, { batches: [] });
  assert.equal(again.warnings.length, 1);
  assert.match(again.warnings[0], /declares no batches; nothing to clear/);
});

function withoutBatches() {
  const obj = loadFixture();
  for (const { run } of core.flattenRuns(obj)) delete run.batch;
  delete obj.batches;
  return obj;
}

test("declare-batches guards: malformed entries (G1), clear-while-used (G2), orphaning redeclare (G3), duplicate (G4)", () => {
  const obj = loadFixture();
  // G1 — every missing field named, including the batch-only `branch`.
  const g1 = core.declareBatches(obj, { batches: [{ batch_id: "B1", title: "One" }] });
  assert.match(g1.errors.join("\n"), /batch\[0\] missing string branch/);
  const g1b = core.declareBatches(obj, { batches: [{ batch_id: "", title: "One", branch: "b" }] });
  assert.match(g1b.errors.join("\n"), /batch\[0\] missing string batch_id/);
  const g1c = core.declareBatches(obj, { batches: [{ batch_id: "B1", title: "One", branch: "b", default: true }] });
  assert.match(g1c.errors.join("\n"), /carries unexpected field default/);
  // G2 — the fixture stores batches on four runs; clearing must refuse and name them.
  const g2 = core.declareBatches(obj, { batches: null });
  assert.match(g2.errors.join("\n"), /cannot clear root\.batches while 2 batch\(es\) are still stored on runs/);
  assert.match(g2.errors.join("\n"), /NIGHT-A \(3: RUN-FIX-ALPHA-001, RUN-FIX-BETA-001, RUN-FIX-GAMMA-001\)/);
  // G3 — redeclaring away NIGHT-B while delta still carries it.
  const g3 = core.declareBatches(obj, { batches: [{ batch_id: "NIGHT-A", title: "A", branch: "aiw/a" }] });
  assert.match(g3.errors.join("\n"), /batch NIGHT-B is still stored on 1 run\(s\) \(RUN-FIX-DELTA-001\)/);
  // G4 — duplicates.
  const g4 = core.declareBatches(obj, {
    batches: [
      { batch_id: "B1", title: "One", branch: "aiw/b1" },
      { batch_id: "B1", title: "Bis", branch: "aiw/b2" }
    ]
  });
  assert.match(g4.errors.join("\n"), /duplicate batch_id B1/);
  // None of the refusals touched the object.
  assert.deepEqual(core.checkInvariants(obj, {}), []);
  assert.equal(core.declaredBatches(obj).length, 2);
});

// ---------------------------------------------------------------- set-batch (the assignment op)

test("set-batch assigns a declared batch, serializes it in canonical key position, and clears back to none", () => {
  const obj = loadFixture();
  const target = "RUN-FIX-SEED-001"; // stores no batch today
  const assign = core.setBatch(obj, { run: target, batch: "NIGHT-B" });
  assert.deepEqual(assign.errors, []);
  assert.equal(assign.before, null);
  assert.equal(assign.after, "NIGHT-B");
  const run = runById(obj, target);
  assert.equal(run.batch, "NIGHT-B");
  // Canonical key order: batch lands after depends_on, before the closeout fields.
  const keys = Object.keys(run);
  assert.ok(keys.indexOf("batch") > keys.indexOf("depends_on"));
  assert.ok(keys.indexOf("batch") < keys.indexOf("closeout_result"));
  assert.deepEqual(core.checkInvariants(obj, {}), []);
  const clear = core.setBatch(obj, { run: target, batch: null });
  assert.deepEqual(clear.errors, []);
  assert.equal("batch" in run, false);
  const again = core.setBatch(obj, { run: target, batch: "" });
  assert.equal(again.warnings.length, 1);
  assert.match(again.warnings[0], /belongs to no batch.*nothing to clear/);
});

test("set-batch refuses an undeclared batch, and refuses any batch when none are declared", () => {
  const obj = loadFixture();
  const bad = core.setBatch(obj, { run: "RUN-FIX-SEED-001", batch: "PHANTOM" });
  assert.match(bad.errors.join("\n"), /batch PHANTOM is not declared in root\.batches \(declared: NIGHT-A, NIGHT-B\)/);
  const batchless = core.parseRoadmap(core.loadRaw(REAL_CANONICALS[0]));
  const refused = core.setBatch(batchless, { run: core.globalOrdered(batchless)[0].run_id, batch: "NIGHT-A" });
  assert.match(refused.errors.join("\n"), /declares no batches, so no batch can be assigned/);
});

// ---------------------------------------------------------------- the write path, end to end

test("set-batch and declare-batches go through planEdit end to end — set-batch alone and inside a batch op — on a COPY", () => {
  const workDir = mkdtempSync(join(tmpdir(), "set-batch-"));
  try {
    const filePath = join(workDir, "roadmap.json");
    writeFileSync(filePath, core.loadRaw(FIXTURE_ROADMAP), "utf8");
    assert.ok(KNOWN_OPS.includes("set-batch"));
    assert.ok(KNOWN_OPS.includes("declare-batches"));
    const plan = planEdit({ filePath, op: "set-batch", args: { run: "RUN-FIX-SEED-001", batch: "NIGHT-A" } });
    assert.equal(plan.ok, true, (plan.errors || []).join("\n"));
    assert.deepEqual(plan.remap, []); // queue order untouched by construction
    const applied = applyPlan({ filePath, serialized: plan.serialized, validate: null });
    assert.equal(applied.written, true);
    const reread = core.parseRoadmap(core.loadRaw(filePath));
    assert.equal(runById(reread, "RUN-FIX-SEED-001").batch, "NIGHT-A");
    assert.deepEqual(core.checkInvariants(reread, {}), []);
    // set-batch is BATCHABLE (the op named batch bundles edits; the FIELD named batch is
    // what set-batch writes — one wire, two meanings, asserted working together).
    const bundled = planEdit({
      filePath,
      op: "batch",
      args: { ops: [
        { op: "set-batch", args: { run: "RUN-FIX-SEED-001", batch: null } },
        { op: "set-text", args: { targetType: "run", targetId: "RUN-FIX-SEED-001", title: "Seed work (bundled)" } }
      ] }
    });
    assert.equal(bundled.ok, true, (bundled.errors || []).join("\n"));
    // declare-batches is NOT batchable, exactly like declare-lanes.
    const declareInBatch = planEdit({
      filePath,
      op: "batch",
      args: { ops: [{ op: "declare-batches", args: { batches: null } }] }
    });
    assert.equal(declareInBatch.ok, false);
    assert.match(declareInBatch.errors.join("\n"), /not a batchable op/);
  } finally {
    rmSync(workDir, { recursive: true, force: true });
  }
});

test("dry-run refuses the DEADLOCK at postcheck, from BOTH creating sides, and nothing reaches disk", () => {
  const workDir = mkdtempSync(join(tmpdir(), "batch-deadlock-"));
  try {
    const filePath = join(workDir, "roadmap.json");
    const original = core.loadRaw(FIXTURE_ROADMAP);
    writeFileSync(filePath, original, "utf8");
    // Side 1 — set-batch creates it: re-homing delta into its target's batch.
    const viaSetBatch = planEdit({ filePath, op: "set-batch", args: { run: "RUN-FIX-DELTA-001", batch: "NIGHT-A" } });
    assert.equal(viaSetBatch.ok, false);
    assert.equal(viaSetBatch.stage, "postcheck");
    assert.match(viaSetBatch.errors.join("\n"), /waits on human approval of RUN-FIX-ALPHA-001, and both sit in batch NIGHT-A/);
    // Side 2 — set-human-deps creates it: gamma waiting on alpha inside NIGHT-A.
    const viaHumanDeps = planEdit({
      filePath,
      op: "set-human-deps",
      args: { run: "RUN-FIX-GAMMA-001", dependsOnHumanApproved: ["RUN-FIX-ALPHA-001"] }
    });
    assert.equal(viaHumanDeps.ok, false);
    assert.equal(viaHumanDeps.stage, "postcheck");
    assert.match(viaHumanDeps.errors.join("\n"), /RUN-FIX-GAMMA-001 waits on human approval of RUN-FIX-ALPHA-001, and both sit in batch NIGHT-A/);
    // The refusals never wrote: the file is byte-identical.
    assert.equal(core.loadRaw(filePath), original);
    // And the LEGAL sibling of each refused edit still passes: delta to NIGHT-B (where it
    // already is — an idempotent re-assign), and gamma waiting on the SEED run (no batch).
    const legal = planEdit({ filePath, op: "set-human-deps", args: { run: "RUN-FIX-GAMMA-001", dependsOnHumanApproved: ["RUN-FIX-SEED-001"] } });
    assert.equal(legal.ok, true, (legal.errors || []).join("\n"));
  } finally {
    rmSync(workDir, { recursive: true, force: true });
  }
});

test("dry-run refuses: assigning an undeclared batch never reaches disk", () => {
  const workDir = mkdtempSync(join(tmpdir(), "set-batch-refuse-"));
  try {
    const filePath = join(workDir, "roadmap.json");
    const original = core.loadRaw(FIXTURE_ROADMAP);
    writeFileSync(filePath, original, "utf8");
    const plan = planEdit({ filePath, op: "set-batch", args: { run: "RUN-FIX-SEED-001", batch: "PHANTOM" } });
    assert.equal(plan.ok, false);
    assert.equal(plan.stage, "mutate");
    assert.match(plan.errors.join("\n"), /not declared in root\.batches/);
    assert.equal(core.loadRaw(filePath), original);
  } finally {
    rmSync(workDir, { recursive: true, force: true });
  }
});

// ---------------------------------------------------------------- transport (the projector)

test("the emitted envelope transports the batch vocabulary verbatim, in both artifacts, from one function", () => {
  const now = "2026-08-06T00:00:00.000Z";
  const roadmap = buildProjectRoadmap(FIXTURE_ROOT, { now });
  const snapshot = buildRoadmapTreeSnapshot(FIXTURE_ROOT, { now });
  const declared = loadFixture().batches;
  assert.deepEqual(roadmap.batches, declared);
  assert.deepEqual(snapshot.roadmap_tree.batches, declared);
  // Key placement: batches rides inside the tree block, before objectives, exactly once.
  const keys = Object.keys(snapshot.roadmap_tree);
  assert.ok(keys.indexOf("batches") > -1 && keys.indexOf("batches") < keys.indexOf("objectives"));
  // The run-level key travels with the tree verbatim, like every run field.
  const emittedDelta = flattenRoadmapTree(snapshot.roadmap_tree)
    .map(({ run }) => run)
    .find((run) => run.run_id === "RUN-FIX-DELTA-001");
  assert.equal(emittedDelta.batch, "NIGHT-B");
});

test("a tree that declares no batches emits NO batches key — the old path is untouched", () => {
  const layout = detectRootLayout(REPO_ROOT);
  assert.ok(layout, "this repository must resolve a root layout");
  const emitted = buildProjectRoadmap(REPO_ROOT, { now: "2026-08-06T00:00:00.000Z" });
  assert.equal("batches" in emitted, false);
  const snapshot = buildRoadmapTreeSnapshot(REPO_ROOT, { now: "2026-08-06T00:00:00.000Z" });
  assert.equal("batches" in snapshot.roadmap_tree, false);
});

// ---------------------------------------------------------------- the console selector

const ROOTS = new Map([["batches", FIXTURE_ROOT]]);

function makeHarness() {
  return createConsoleHarness({ rendererPath: RENDERER, rootsByKey: ROOTS });
}

async function select(harness) {
  harness.sandbox.resetProjectScopedState();
  harness.sandbox.setActiveProjectBase("/projects/batches/");
  const result = await harness.sandbox.loadActiveProject();
  await harness.flush();
  return result;
}

test("the batch selector renders beside the lane one: All batches + one option per batch, with counts", async () => {
  const harness = makeHarness();
  await select(harness);
  const slot = harness.element("roadmap-batch-slot").innerHTML;
  assert.match(slot, /Batch<\/span>/);
  assert.match(slot, /id="v3-batch-select"/);
  assert.match(slot, /All batches \(6\)/);
  assert.match(slot, /NIGHT-A — First unattended night \(3\)/);
  assert.match(slot, /NIGHT-B — Second unattended night \(1\)/);
  // The fixture declares no lanes, so the LANE selector renders nothing — the two
  // dropdowns are independent surfaces of independent vocabularies.
  assert.equal(harness.element("roadmap-lane-slot").innerHTML, "");
});

test("selecting a batch filters both subviews to its runs; clearing restores all", async () => {
  const harness = makeHarness();
  await select(harness);
  const queueIds = () => {
    const html = harness.element("run-queue-v3").innerHTML;
    return Array.from(html.matchAll(/data-v3-run="([^"]+)"/g)).map((match) => match[1]);
  };
  assert.equal(new Set(queueIds()).size, 6);
  vm.runInContext('v3SelectedBatch = "NIGHT-A"; renderRunQueueV3(appData); renderRoadmapV3(appData);', harness.sandbox);
  const filtered = new Set(queueIds());
  assert.deepEqual([...filtered].sort(), ["RUN-FIX-ALPHA-001", "RUN-FIX-BETA-001", "RUN-FIX-GAMMA-001"]);
  const tree = harness.element("roadmap-v3-tree").innerHTML;
  assert.equal(tree.includes("RUN-FIX-DELTA-001"), false, "a NIGHT-B run must not survive the NIGHT-A filter");
  vm.runInContext("v3SelectedBatch = null; renderRunQueueV3(appData); renderRoadmapV3(appData);", harness.sandbox);
  assert.equal(new Set(queueIds()).size, 6);
});

test("the batch filter is per-project state: reset clears the selection exactly as the lane filter's", async () => {
  const harness = makeHarness();
  await select(harness);
  vm.runInContext('v3SelectedBatch = "NIGHT-B";', harness.sandbox);
  harness.sandbox.resetProjectScopedState();
  assert.equal(vm.runInContext("v3SelectedBatch", harness.sandbox), null);
});

test("a batch-less model removes the selector and the filter degenerates to identity", async () => {
  const harness = makeHarness();
  await select(harness);
  // Drive the pure pieces directly: a model without batches filters nothing and the
  // selector renders nothing new (its slot is removed in a real DOM; the stub survives
  // by harness design, so the assertion is on the model reads).
  const verdict = vm.runInContext(
    `(function () {
      const model = v3Model({ roadmapV3: { objectives: appData.roadmapV3.objectives } });
      v3SelectedBatch = "NIGHT-A";
      const filtered = v3VisibleRuns(model, model.allRuns).length;
      const active = v3BatchFilterActive(model);
      v3SelectedBatch = null;
      return { batches: model.batches, active, filtered, total: model.allRuns.length };
    })()`,
    harness.sandbox
  );
  assert.equal(verdict.batches, null);
  assert.equal(verdict.active, false, "a stale selection over a batch-less model must not activate the filter");
  assert.equal(verdict.filtered, verdict.total);
});

test("both render paths call the batch selector, and the empty-filter note names the batch case", () => {
  const source = readFileSync(RENDERER, "utf8");
  const queueBody = source.slice(source.indexOf("function renderRunQueueV3"));
  assert.ok(queueBody.slice(0, queueBody.indexOf("\n}")).includes("renderBatchSelector(model)"));
  const treeBody = source.slice(source.indexOf("function renderRoadmapV3"));
  assert.ok(treeBody.slice(0, treeBody.indexOf("\n}")).includes("renderBatchSelector(model)"));
  assert.ok(source.includes("No runs in this batch yet."));
});

// ---------------------------------------------------------------- no baked batch keys

test("no fixture batch key or branch is baked into engine, projector, server, renderer or markup", () => {
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
    for (const key of ["NIGHT-A", "NIGHT-B", "aiw/batch/night"]) {
      assert.equal(body.includes(key), false, `${file} bakes fixture batch identity ${key}`);
    }
  }
});
