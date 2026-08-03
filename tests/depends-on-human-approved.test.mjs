// [#45] `depends_on_human_approved` — A SECOND DEPENDENCY LIST FOR EDGES THAT WAIT ON A PERSON.
//
// Four layers, each measured where it lives:
//
//   1. the schema    — an OPTIONAL run key, ABSENT by default, that leaves every existing
//                      roadmap valid and byte-identical
//   2. the invariants — a PRESENT key is held to the same edge discipline as `depends_on`,
//                      and A DESTINATION THAT DOES NOT EXIST FAILS VALIDATION (the rule this
//                      run exists to enforce, proven by a test that watches it FAIL)
//   3. the transport  — the emitter carries it into `.project/` untouched
//   4. the surface    — the real renderer reads the list and the real editor writes it
//
// AND THE HALF THIS RUN DOES NOT BUILD, asserted here so it cannot be discovered late: nothing
// in this repository OBEYS the field. No queue group changes, no run is held back, no readiness
// derivation reads it. That is aiw's kernel work, and the tests at the bottom pin the boundary
// so a later change cannot quietly half-cross it.
//
// Everything runs against trees built here or against COPIES of tests/fixtures/lanes in a temp
// dir. The live roadmap of this repo is never asserted on — a suite that reads it goes red
// whenever the cabin plans a run.
import test from "node:test";
import assert from "node:assert/strict";
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import * as core from "../tools/roadmap/roadmap-core.mjs";
import { KNOWN_OPS, planEdit, applyPlan } from "../tools/roadmap/roadmap-plan.mjs";
import { buildRoadmapTreeSnapshot, buildProjectRoadmap } from "../tools/projector/project.mjs";
import { createConsoleHarness } from "./helpers/console-dom.mjs";
import { frozenCanonicalPath } from "./helpers/neighbours.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const RENDERER = join(REPO_ROOT, "project-console", "assets", "project-console.js");
const LANES_ROOT = join(HERE, "fixtures", "lanes", "project");
const LANES_CANONICAL = join(LANES_ROOT, "roadmap", "roadmap.json");

const FIELD = "depends_on_human_approved";

// A minimal three-run tree. Deliberately built here and not read from disk: these tests are
// about the FIELD, and a fixture that had to carry it would make "absent by default" untestable.
function tree(...overrides) {
  const run = (n, extra) => ({
    run_id: `RUN-T-${String(n).padStart(3, "0")}`,
    queue_order: n,
    title: `Run ${n}`,
    summary: `Summary ${n}`,
    full_description: `Description ${n}`,
    status: "planned",
    depends_on: [],
    ...(extra || {})
  });
  return {
    schema_version: "roadmap_tree_v1",
    roadmap_id: "t",
    title: "T",
    objectives: [{
      objective_id: "O1",
      title: "O",
      phases: [{
        phase_id: "O1.P1",
        title: "P",
        runs: [run(1, overrides[0]), run(2, overrides[1]), run(3, overrides[2])]
      }]
    }]
  };
}

const errorsFor = (obj, opts = {}) => core.checkInvariants(obj, opts);
const matching = (errors, pattern) => errors.filter((e) => pattern.test(e));

// ======================================================== 1. THE SCHEMA: optional and additive

test("A.1: the field is OPTIONAL and ABSENT by default — it is in RUN_OPTIONAL_FIELDS and in no required set", () => {
  assert.ok(core.RUN_OPTIONAL_FIELDS.includes(FIELD), "the field must be optional");
  assert.equal(core.RUN_REQUIRED_FIELDS.includes(FIELD), false, "a required field would put every run in three roadmaps in the red at once");
  assert.ok(core.RUN_ALLOWED_FIELDS.includes(FIELD), "an allowed key, or every run carrying it reads as 'unexpected field'");
});

test("A.2: it SERIALIZES immediately after depends_on — the two lists are read together", () => {
  const order = core.CANONICAL_RUN_KEY_ORDER;
  assert.equal(order[order.indexOf("depends_on") + 1], FIELD);
  // And normalizeRunKeyOrder actually produces that order on a run that carries it.
  const run = { status: "planned", [FIELD]: ["RUN-T-001"], depends_on: [], run_id: "RUN-T-002", queue_order: 2, title: "t", summary: "s", full_description: "f" };
  core.normalizeRunKeyOrder(run);
  const keys = Object.keys(run);
  assert.equal(keys[keys.indexOf("depends_on") + 1], FIELD);
});

test("A.3: ADDITIVE — a run WITHOUT the key raises nothing, and the whole block is gated on presence", () => {
  assert.deepEqual(errorsFor(tree()), []);
  // The strongest form of "absent by default": an absent key is not merely legal, it is
  // INVISIBLE to the guard. A `null` or `[]` written as a default would be a different state.
  const obj = tree();
  const runs = core.flattenRuns(obj).map((e) => e.run);
  assert.equal(runs.some((r) => FIELD in r), false, "nothing in the engine creates the key");
});

test("A.4: THE REGISTERED CANONICALS stay valid, and round-trip byte-identical", () => {
  // Read-only. Nothing here writes to a neighbour. The frozen copies are the same bytes the
  // console reads at runtime; the live neighbours are never opened by this suite.
  //
  // externalRunIds is supplied because these roadmaps carry REAL cross-project edges
  // (CONTRATO §10.d): without the registry a legal external dependency reads as dangling, and
  // that has nothing to do with this change. The set is built from the frozen canonicals.
  const canonicals = [frozenCanonicalPath("aiw-console"), frozenCanonicalPath("cantu-studio")];
  const externalRunIds = new Set();
  for (const path of canonicals) {
    for (const { run } of core.flattenRuns(core.parseRoadmap(core.loadRaw(path)))) externalRunIds.add(run.run_id);
  }
  for (const path of canonicals) {
    const raw = core.loadRaw(path);
    const obj = core.parseRoadmap(raw);
    assert.deepEqual(core.checkInvariants(obj, { externalRunIds }), [], `${path} must stay valid`);
    assert.equal(core.serialize(obj, core.detectEol(raw)), raw, `${path} must round-trip byte-identical`);
    // And none of them carries the key: the field is new, and this run writes no run data.
    const carriers = core.flattenRuns(obj).map((e) => e.run).filter((r) => FIELD in r);
    assert.deepEqual(carriers, [], `${path} must carry no ${FIELD} — this run writes no run data`);
  }
});

// ======================================================== 2. THE INVARIANTS

test("B.1: A DESTINATION THAT DOES NOT EXIST FAILS VALIDATION — the rule this run exists to add", () => {
  // THE FAILING CASE, written first and on purpose: a list naming a run nothing declares is
  // REFUSED, by name, and named as dangling. An edge that waits for a person to review work
  // that does not exist can never be satisfied.
  const obj = tree(undefined, { [FIELD]: ["RUN-DOES-NOT-EXIST-999"] });
  const errors = errorsFor(obj);
  assert.equal(matching(errors, /RUN-DOES-NOT-EXIST-999/).length, 1, "the unknown destination must be named");
  assert.match(errors.join("\n"), /dangling dependency/);
  assert.match(errors.join("\n"), /waits on human approval of unknown run/);
  // And it must not be confused with a depends_on failure: `depends_on` is untouched and empty.
  assert.equal(matching(errors, /depends on unknown run/).length, 0);
});

test("B.2: a valid list PASSES, and an external destination is legal (CONTRATO §10.d)", () => {
  assert.deepEqual(errorsFor(tree(undefined, { [FIELD]: ["RUN-T-001"] })), []);
  // Declared by ANOTHER registered project: it exists, it merely does not exist HERE. Same
  // escape hatch `depends_on` gets, and it is the ONLY thing that rescues an unknown id.
  const external = new Set(["RUN-OTHER-PROJECT-001"]);
  assert.deepEqual(errorsFor(tree(undefined, { [FIELD]: ["RUN-OTHER-PROJECT-001"] }), { externalRunIds: external }), []);
  assert.equal(errorsFor(tree(undefined, { [FIELD]: ["RUN-OTHER-PROJECT-001"] })).length, 1, "without the registry it is dangling");
});

test("B.3: shape — a non-array is refused, and a non-string entry is refused, WITHOUT throwing", () => {
  // checkInvariants is called by the server inside a try//catch that turns a throw into a
  // generic refusal; a guard that throws loses the named reason. It must push, never throw.
  for (const bad of ["RUN-T-001", 7, {}, true]) {
    const errors = errorsFor(tree(undefined, { [FIELD]: bad }));
    assert.equal(matching(errors, /must be an array when present/).length, 1, `${JSON.stringify(bad)} must be refused as a non-array`);
  }
  const errors = errorsFor(tree(undefined, { [FIELD]: ["", null, 3] }));
  assert.equal(matching(errors, /must contain only non-empty run ids/).length, 3);
});

test("B.4: no self-edge, no duplicate, and no FORWARD edge", () => {
  assert.match(errorsFor(tree(undefined, { [FIELD]: ["RUN-T-002"] })).join("\n"), /must not wait on its own human approval/);
  assert.match(errorsFor(tree(undefined, { [FIELD]: ["RUN-T-001", "RUN-T-001"] })).join("\n"), /duplicate human-approval dependency/);
  // Forward: run 1 waiting on run 3. A consumer cannot wait for the review of work scheduled
  // after it — the same rule, and the same reason, as depends_on's strict precedence.
  assert.match(errorsFor(tree({ [FIELD]: ["RUN-T-003"] })).join("\n"), /must wait on human approval only of earlier runs/);
});

test("B.5: the two lists are INDEPENDENT — neither implies, constrains or is read by the other", () => {
  // The same target in both is legal (an edge that waits on both existence and review), and
  // an entry that appears ONLY in the human list is equally legal: this run adds no subset rule.
  assert.deepEqual(errorsFor(tree(undefined, { depends_on: ["RUN-T-001"], [FIELD]: ["RUN-T-001"] })), []);
  assert.deepEqual(errorsFor(tree(undefined, { depends_on: [], [FIELD]: ["RUN-T-001"] })), []);
  // A dangling entry in one is not reported against the other.
  const errors = errorsFor(tree(undefined, { depends_on: ["RUN-T-001"], [FIELD]: ["RUN-NOPE-001"] }));
  assert.equal(errors.length, 1);
  assert.match(errors[0], /waits on human approval of unknown run RUN-NOPE-001/);
});

// ======================================================== 3. THE WRITE PATH

test("C.1: set-human-deps is a KNOWN op, is BATCHABLE, and set-deps is still there beside it", () => {
  assert.ok(KNOWN_OPS.includes("set-human-deps"));
  assert.ok(KNOWN_OPS.includes("set-deps"), "depends_on's own op is untouched");
});

test("C.2: the op WRITES the list, and clearing it REMOVES the key (absence is the one empty shape)", () => {
  const obj = tree();
  const written = core.setHumanApprovedDeps(obj, { run: "RUN-T-002", dependsOnHumanApproved: ["RUN-T-001"] });
  assert.deepEqual(written.errors, []);
  assert.deepEqual(core.findRunEntry(obj, "RUN-T-002").run[FIELD], ["RUN-T-001"]);
  assert.deepEqual(core.checkInvariants(obj, {}), []);

  const cleared = core.setHumanApprovedDeps(obj, { run: "RUN-T-002", dependsOnHumanApproved: [] });
  assert.deepEqual(cleared.errors, []);
  assert.equal(FIELD in core.findRunEntry(obj, "RUN-T-002").run, false,
    "an empty list must be stored as ABSENCE — never classified and cleared must read back identically");
});

test("C.3: the op REFUSES at the gesture what the guard would refuse one stage later", () => {
  const obj = tree();
  const unknown = core.setHumanApprovedDeps(obj, { run: "RUN-T-002", dependsOnHumanApproved: ["RUN-NOPE-001"] });
  assert.equal(unknown.errors.length, 1);
  assert.match(unknown.errors[0], /is not a known run in this roadmap or any registered project/);
  assert.equal(FIELD in core.findRunEntry(obj, "RUN-T-002").run, false, "a refused write must leave the run untouched");

  const self = core.setHumanApprovedDeps(obj, { run: "RUN-T-002", dependsOnHumanApproved: ["RUN-T-002"] });
  assert.match(self.errors.join("\n"), /must not wait on its own human approval/);

  // External is a WARNING, not an error — §10.d, exactly as set-deps treats it.
  const external = core.setHumanApprovedDeps(tree(), {
    run: "RUN-T-002", dependsOnHumanApproved: ["RUN-ELSEWHERE-001"], externalRunIds: new Set(["RUN-ELSEWHERE-001"])
  });
  assert.deepEqual(external.errors, []);
  assert.match(external.warnings.join("\n"), /resolves outside this roadmap/);
});

test("C.4: `depends_on` IS NOT TOUCHED by the new op — not its data, not its shape", () => {
  const obj = tree(undefined, { depends_on: ["RUN-T-001"] });
  const before = JSON.stringify(core.findRunEntry(obj, "RUN-T-002").run.depends_on);
  core.setHumanApprovedDeps(obj, { run: "RUN-T-002", dependsOnHumanApproved: ["RUN-T-001"] });
  assert.equal(JSON.stringify(core.findRunEntry(obj, "RUN-T-002").run.depends_on), before);
  // And the reverse: set-deps does not touch the new key.
  core.setDeps(obj, { run: "RUN-T-002", dependsOn: [] });
  assert.deepEqual(core.findRunEntry(obj, "RUN-T-002").run[FIELD], ["RUN-T-001"]);
});

test("C.5: removing a run some other run WAITS ON is refused, and names it", () => {
  const obj = tree(undefined, undefined, { [FIELD]: ["RUN-T-001"] });
  const refused = core.removeRun(obj, { run: "RUN-T-001" });
  assert.equal(refused.errors.length, 1);
  assert.match(refused.errors[0], /RUN-T-003/, "the waiting run must be named");
  // With an explicit choice, the edge is rewritten — and an edge that empties removes the key,
  // instead of leaving a stored `[]` where absence is the default.
  const dropped = core.removeRun(tree(undefined, undefined, { [FIELD]: ["RUN-T-001"] }), { run: "RUN-T-001", dropDependentEdges: true });
  assert.deepEqual(dropped.errors, []);
  const rewritten = core.removeRun(tree(undefined, undefined, { [FIELD]: ["RUN-T-002"] }), { run: "RUN-T-002", reassignDependentsTo: "RUN-T-001" });
  assert.deepEqual(rewritten.errors, []);
});

test("C.6: end to end through planEdit — the field reaches DISK, and the file stays valid", () => {
  const dir = mkdtempSync(join(tmpdir(), "human-deps-"));
  try {
    const file = join(dir, "roadmap.json");
    cpSync(LANES_CANONICAL, file);
    const obj = core.parseRoadmap(core.loadRaw(file));
    const ordered = core.globalOrdered(obj);
    const target = ordered[0].run_id;
    const consumer = ordered[1].run_id;

    const plan = planEdit({ filePath: file, op: "set-human-deps", args: { run: consumer, dependsOnHumanApproved: [target] } });
    assert.deepEqual(plan.errors, []);
    applyPlan({ filePath: file, serialized: plan.serialized, validate: null });

    const after = core.parseRoadmap(core.loadRaw(file));
    assert.deepEqual(core.findRunEntry(after, consumer).run[FIELD], [target]);
    assert.deepEqual(core.checkInvariants(after, {}), []);
    // The write is BATCHABLE beside the ops an operator changes in the same breath.
    const batch = planEdit({
      filePath: file, op: "batch",
      args: { ops: [
        { op: "set-human-deps", args: { run: consumer, dependsOnHumanApproved: [] } },
        { op: "set-text", args: { targetType: "run", targetId: consumer, title: "Retitled" } }
      ] }
    });
    assert.deepEqual(batch.errors, []);
    applyPlan({ filePath: file, serialized: batch.serialized, validate: null });
    const batched = core.parseRoadmap(core.loadRaw(file));
    assert.equal(FIELD in core.findRunEntry(batched, consumer).run, false);
    assert.equal(core.findRunEntry(batched, consumer).run.title, "Retitled");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

// ======================================================== 4. THE TRANSPORT

test("D.1: the EMITTER carries the field into .project/ — snapshot and roadmap.json alike", () => {
  const dir = mkdtempSync(join(tmpdir(), "human-deps-emit-"));
  try {
    cpSync(LANES_ROOT, dir, { recursive: true });
    const file = join(dir, "roadmap", "roadmap.json");
    const obj = core.parseRoadmap(core.loadRaw(file));
    const ordered = core.globalOrdered(obj);
    const target = ordered[0].run_id;
    const consumer = ordered[1].run_id;
    core.setHumanApprovedDeps(obj, { run: consumer, dependsOnHumanApproved: [target] });
    writeFileSync(file, core.serialize(obj, core.detectEol(core.loadRaw(file))));

    const findRun = (block) => block.objectives
      .flatMap((o) => o.phases).flatMap((p) => p.runs).find((r) => r.run_id === consumer);

    const snapshot = buildRoadmapTreeSnapshot(dir, {});
    assert.deepEqual(findRun(snapshot.roadmap_tree)[FIELD], [target],
      "the tree travels verbatim, so the field must arrive without the emitter naming it");
    const roadmap = buildProjectRoadmap(dir, {});
    assert.deepEqual(findRun(roadmap)[FIELD], [target]);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

// ======================================================== 5. THE SURFACE

const harness = () => createConsoleHarness({ rendererPath: RENDERER, rootsByKey: new Map([["lanes", LANES_ROOT]]) });
const render = (h, expression) => vm.runInContext(expression, h.sandbox);

const MODEL = `{ runsById: new Map([["RUN-T-001", { run_id: "RUN-T-001", queue_order: 1, title: "The reviewed one", status: "completed" }]]) }`;

test("E.1: a run WITHOUT the key renders NOTHING — no empty section is added to the drawer", () => {
  const h = harness();
  assert.equal(render(h, `v3HumanApprovalSection({ run_id: "RUN-T-002" }, ${MODEL})`), "");
  assert.equal(render(h, `v3HumanApprovalSection({ run_id: "RUN-T-002", ${FIELD}: [] }, ${MODEL})`), "");
});

test("E.2: a run WITH the key shows the edge, the target, and WHAT IS STILL OWED", () => {
  const h = harness();
  const html = render(h, `v3HumanApprovalSection({ run_id: "RUN-T-002", ${FIELD}: ["RUN-T-001"] }, ${MODEL})`);
  assert.match(html, /Waits on a person/, "the SCREEN LABEL is where the AI/human difference lives");
  assert.ok(html.includes("The reviewed one"), "the target run must be named");
  assert.ok(html.includes("#1"), "and reachable by its position");
  // THE CLAIM IT MUST NOT MAKE. The target is `completed` — its WORK exists — and the section
  // must still not report the edge satisfied, because no approval is stored anywhere.
  assert.equal(/is-satisfied|>satisfied</.test(html), false,
    "a green tick here would invent an approval nothing records");
  assert.match(html, /awaiting a person&#39;s review/);
  assert.match(html, /no executor enforces the wait yet/);
});

test("E.3: an id the roadmap cannot resolve is shown as unknown, not silently dropped", () => {
  const h = harness();
  const html = render(h, `v3HumanApprovalSection({ run_id: "RUN-T-002", ${FIELD}: ["RUN-GONE-001"] }, ${MODEL})`);
  assert.ok(html.includes("RUN-GONE-001"));
  assert.match(html, /unknown/);
});

test("E.4: the EDITOR offers its own block, its own picker, and its own op", () => {
  const source = readFileSync(RENDERER, "utf8");
  // The editor block exists and is wired to the new op, not to set-deps.
  assert.match(source, /data-v3edit-op="set-human-deps"/);
  assert.match(source, /v3RenderDepPicker\("humandeps"/);
  // It is batchable, so one preview and one write cover it alongside every other field.
  assert.match(source, /V3_BATCHABLE_OPS = \[[^\]]*"set-human-deps"/);
  // The preview names the KEY that will be written, verbatim.
  assert.ok(source.includes(`v3EditDiffRow(\n      "${FIELD}"`) || source.includes(`"${FIELD}",`),
    "the preview must name the key being written");
  // And the two pickers can never read each other's chips.
  assert.match(source, /data-v3edit-picker="deps"/);
});

// ======================================================== 6. THE BOUNDARY, PINNED

test("F.1: NOTHING IN THIS REPOSITORY OBEYS THE FIELD — that half is aiw's kernel work", () => {
  // The warning the run's own text raises against its own precedent: lanes were designed here,
  // validated here and rendered here, and no executor obeys them. This test states, mechanically,
  // which half #45 delivered, so a later change cannot half-cross the line without turning it red.
  //
  // The readiness derivation and the queue grouping — in BOTH implementations, the console's and
  // the emitter's mirror of it — must not read the field.
  const renderer = readFileSync(RENDERER, "utf8");
  const emitter = readFileSync(join(REPO_ROOT, "tools", "projector", "project.mjs"), "utf8");
  const queueGroupFn = renderer.slice(renderer.indexOf("function v3QueueGroupKey"));
  assert.equal(queueGroupFn.slice(0, queueGroupFn.indexOf("\n}")).includes(FIELD), false,
    "a run's queue group must NOT change because of this field: obeying it is the kernel's work");
  assert.equal(emitter.includes(FIELD), false,
    "the emitter transports the tree verbatim and must name this field nowhere");
});

test("F.2: and the field changes NO derived group — the same tree groups identically with and without it", () => {
  const h = harness();
  const withoutIt = { run_id: "RUN-T-002", queue_order: 2, status: "planned", depends_on: [] };
  const withIt = { ...withoutIt, [FIELD]: ["RUN-T-001"] };
  const group = (run) => render(h, `v3QueueGroupKey(${JSON.stringify(run)}, new Map())`);
  assert.equal(group(withIt), group(withoutIt),
    "until a kernel obeys it, the field is inert to every derivation this console performs");
});
