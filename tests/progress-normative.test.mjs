// [#46] `progress` PROMOTED FROM EVIDENCE TO NORM (CONTRATO §15, frozen 2026-08-03) — and the
// second defect of the same surface: closeout_result required AT CLOSE, History no longer
// painting its absence as a blockage.
//
// Five layers, each measured where it lives:
//
//   1. the norm's home — ONE implementation (tools/progress/progress.mjs), re-exported by the
//                        engine, handed to the console by the shell; no consumer carries a copy
//   2. the shape       — checkInvariants refuses a malformed `progress`, PROVEN BY A TEST THAT
//                        WATCHES IT FAIL (criterion 8), and the frozen canonical fixtures stay
//                        valid and byte-identical (criterion 9, read-only)
//   3. the predicate   — §15.c: a cycle with positive human QA satisfies a human-approval edge;
//                        `completed` alone NEVER does; fail-closed on everything else
//   4. the close act   — set-status to a terminal status REQUIRES a closeout_result (supplied,
//                        or already carried); old terminal runs are NOT backfilled and stay valid
//   5. the surface     — the drawer row tells the full truth exactly when the target carries the
//                        positive QA; History reads absence as "No closeout recorded", never
//                        "Blocked"; the editor asks for the outcome at close
//
// Everything runs against trees built here or against frozen fixtures. The live roadmap of this
// repo is never asserted on — a suite that reads it goes red whenever the cabin plans a run.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import * as core from "../tools/roadmap/roadmap-core.mjs";
import * as progress from "../tools/progress/progress.mjs";
import { progress as shellProgress } from "../project-console/assets/project-shell.js";
import { createConsoleHarness } from "./helpers/console-dom.mjs";
import { frozenCanonicalPath } from "./helpers/neighbours.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const RENDERER = join(REPO_ROOT, "project-console", "assets", "project-console.js");
const LANES_ROOT = join(HERE, "fixtures", "lanes", "project");

// The frozen §15.c positive: a cycle whose human QA came back "passed". Shaped exactly like
// the one exemplar on disk (13 entries, five keys) — abbreviated to one cycle.
const QA_PASSED = [
  { cycle: 1, stage: "execution", attempt: 1, state: "done", result: "implemented" },
  { cycle: 1, stage: "ai_review", attempt: 1, state: "done", result: "approved" },
  { cycle: 1, stage: "human_qa", attempt: 1, state: "done", result: "passed" },
  { cycle: 1, stage: "closeout", attempt: 1, state: "done", result: "completed" }
];
const QA_CHANGES = [
  { cycle: 1, stage: "human_qa", attempt: 1, state: "done", result: "changes_requested" },
  { cycle: 2, stage: "correction", attempt: 1, state: "done", result: "implemented" }
];

// Minimal three-run tree, the depends-on-human-approved suite's own helper repeated: built
// here, never read from disk, so "absent by default" stays testable.
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

// ==================================================== 1. THE NORM'S HOME: one implementation

test("A.1: the engine RE-EXPORTS the leaf — same vocabularies, same predicate, no copy", () => {
  assert.equal(core.humanApprovalSatisfied, progress.humanApprovalSatisfied, "the engine must hand back THE function, not a re-implementation");
  assert.deepEqual(core.PROGRESS_STAGES, ["execution", "ai_review", "human_qa", "correction", "closeout"]);
  assert.deepEqual(core.PROGRESS_STATES, ["waiting", "running", "done"]);
  assert.deepEqual(core.PROGRESS_ENTRY_REQUIRED_FIELDS, ["cycle", "stage", "attempt", "state"]);
  assert.deepEqual(core.PROGRESS_ENTRY_OPTIONAL_FIELDS, ["result", "note"]);
  assert.equal(core.HUMAN_QA_POSITIVE_RESULT, "passed");
});

test("A.2: the SHELL hands over THE module — the browser reads the same bytes the engine does", () => {
  assert.equal(shellProgress.humanApprovalSatisfied, progress.humanApprovalSatisfied);
});

test("A.3: the leaf imports NOTHING — the two-runtime constraint that keeps one truth one file", () => {
  const source = readFileSync(join(REPO_ROOT, "tools", "progress", "progress.mjs"), "utf8");
  assert.equal(/^\s*import\s/m.test(source), false, "an import that only one runtime has would fork the consumers apart");
});

// ==================================================== 2. THE SHAPE, FROZEN (§15.b)

test("B.1: THE FAILING CASE, first and on purpose — a malformed progress FAILS checkInvariants, naming the run", () => {
  // Criterion 8: the test that DEMONSTRATES THE VALIDATOR FAILING when the shape is not met,
  // not only the one that passes. Every clause of the frozen form is violated once, and every
  // violation must be refused BY NAME.
  const cases = [
    [{ cycle: 1, stage: "execution", attempt: 1, state: "done", invented: true }, /unexpected field invented/],
    [{ cycle: 1, stage: "not_a_stage", attempt: 1, state: "done" }, /stage must be one of execution, ai_review, human_qa, correction, closeout/],
    [{ cycle: 1, stage: "execution", attempt: 1, state: "paused" }, /state must be one of waiting, running, done/],
    [{ cycle: 0, stage: "execution", attempt: 1, state: "done" }, /cycle must be a positive integer/],
    [{ cycle: 1, stage: "execution", attempt: "one", state: "done" }, /attempt must be a positive integer/],
    [{ cycle: 1, stage: "execution", attempt: 1, state: "done", result: "" }, /result must be a non-empty string/],
    [{ cycle: 1, stage: "execution", attempt: 1, state: "done", note: 7 }, /note must be a non-empty string/],
    [{ stage: "execution", attempt: 1, state: "done" }, /missing required field cycle/]
  ];
  for (const [entry, reason] of cases) {
    const errors = errorsFor(tree({ status: "completed", closeout_result: "done", progress: [entry] }));
    assert.ok(matching(errors, reason).length >= 1, `${JSON.stringify(entry)} must be refused: expected ${reason}`);
    assert.ok(matching(errors, /run RUN-T-001/).length >= 1, "the offending run must be named");
  }
  // A progress that is not an array, and one that is empty, are equally refused.
  for (const bad of ["done", 7, {}, []]) {
    const errors = errorsFor(tree({ status: "completed", closeout_result: "done", progress: bad }));
    assert.ok(matching(errors, /progress must be a non-empty array when present/).length === 1, `${JSON.stringify(bad)} must be refused`);
  }
});

test("B.2: the shape that PASSES is the disk exemplar's — five keys, closed vocabularies, and reader-shaped variants", () => {
  assert.deepEqual(errorsFor(tree({ status: "completed", closeout_result: "done", progress: QA_PASSED })), []);
  // The reader-shaped variants §15.b freezes alongside the exemplar: a waiting/running
  // frontier entry carries no result, and an entry may carry a note (project-console.js
  // paints both; freezing them out would declare the shipped console's reads illegal).
  const active = tree({ status: "active", progress: [
    { cycle: 1, stage: "execution", attempt: 1, state: "done", result: "implemented", note: "with a note" },
    { cycle: 1, stage: "ai_review", attempt: 1, state: "running" },
    { cycle: 1, stage: "human_qa", attempt: 1, state: "waiting" }
  ] });
  assert.deepEqual(errorsFor(active), []);
});

test("B.3: ABSENT IS ALWAYS LEGAL and invisible — the check is gated on presence, like every optional key", () => {
  assert.deepEqual(errorsFor(tree()), []);
  const obj = tree();
  const runs = core.flattenRuns(obj).map((e) => e.run);
  assert.equal(runs.some((r) => "progress" in r), false, "nothing in the engine creates the key");
});

test("B.4: THE FROZEN CANONICAL FIXTURES stay valid and round-trip byte-identical — freezing invalidates nothing", () => {
  // Criterion 9, on the suite's terms: read-only, against the frozen fixture canonicals (the
  // same shape the console reads at runtime). The aiw-console fixture carries the ONE
  // exemplar on disk — 13 entries — so this is the frozen shape validated against the very
  // data it was frozen from.
  const canonicals = [frozenCanonicalPath("aiw-console"), frozenCanonicalPath("cantu-studio")];
  const externalRunIds = new Set();
  for (const path of canonicals) {
    for (const { run } of core.flattenRuns(core.parseRoadmap(core.loadRaw(path)))) externalRunIds.add(run.run_id);
  }
  for (const path of canonicals) {
    const raw = core.loadRaw(path);
    const obj = core.parseRoadmap(raw);
    assert.deepEqual(core.checkInvariants(obj, { externalRunIds }), [], `${path} must stay valid under the frozen shape`);
    assert.equal(core.serialize(obj, core.detectEol(raw)), raw, `${path} must round-trip byte-identical`);
  }
  const exemplar = core.flattenRuns(core.parseRoadmap(core.loadRaw(frozenCanonicalPath("aiw-console"))))
    .map((e) => e.run).filter((r) => "progress" in r);
  assert.equal(exemplar.length, 1, "the fixture carries the one exemplar the shape was frozen from");
  assert.equal(exemplar[0].progress.length, 13);
});

// ==================================================== 3. THE PREDICATE (§15.c)

test("C.1: a cycle with POSITIVE human QA satisfies; `completed` alone NEVER does — the gap the norm closes", () => {
  assert.equal(progress.humanApprovalSatisfied({ status: "completed", progress: QA_PASSED }), true);
  // The four statuses cannot distinguish a run an AI closed from one a person reviewed:
  assert.equal(progress.humanApprovalSatisfied({ status: "completed" }), false, "completed with no progress answers NO");
  assert.equal(progress.humanApprovalSatisfied({ status: "completed", progress: QA_CHANGES }), false, "changes_requested is the measured NEGATIVE");
  // And the status is not read at all — the QA record alone answers:
  assert.equal(progress.humanApprovalSatisfied({ status: "active", progress: QA_PASSED }), true);
});

test("C.2: FAIL-CLOSED — waiting QA, non-done QA, any other result, malformed entries, and no input all answer false", () => {
  const qaWaiting = [{ cycle: 1, stage: "human_qa", attempt: 1, state: "waiting" }];
  const qaRunningPassed = [{ cycle: 1, stage: "human_qa", attempt: 1, state: "running", result: "passed" }];
  const qaOtherResult = [{ cycle: 1, stage: "human_qa", attempt: 1, state: "done", result: "approved" }];
  assert.equal(progress.humanApprovalSatisfied({ progress: qaWaiting }), false, "a QA still waiting is not an approval");
  assert.equal(progress.humanApprovalSatisfied({ progress: qaRunningPassed }), false, "a result on a non-done entry is not an approval");
  assert.equal(progress.humanApprovalSatisfied({ progress: qaOtherResult }), false, "only the frozen positive token satisfies — closed in false");
  assert.equal(progress.humanApprovalSatisfied({ progress: [null, "x", 7] }), false, "malformed entries never satisfy");
  assert.equal(progress.humanApprovalSatisfied({}), false);
  assert.equal(progress.humanApprovalSatisfied(null), false);
});

// ==================================================== 4. THE CLOSE ACT (closeout_result)

test("D.1: THE FAILING CASE — closing WITHOUT a closeout_result is REFUSED, for both terminal statuses, by name", () => {
  for (const status of ["completed", "blocked"]) {
    const obj = tree();
    const refused = core.setStatus(obj, { run: "RUN-T-001", status });
    assert.equal(refused.errors.length, 1, `${status}: exactly one named refusal`);
    assert.match(refused.errors[0], /closing to (completed|blocked) requires a closeout_result/);
    assert.equal(core.findRunEntry(obj, "RUN-T-001").run.status, "planned", "a refused close must leave the run untouched");
  }
});

test("D.2: a close WITH an outcome writes it; an EMPTY outcome is refused (empty is not an outcome)", () => {
  const obj = tree();
  const closed = core.setStatus(obj, { run: "RUN-T-001", status: "completed", closeoutResult: "completed_successfully" });
  assert.deepEqual(closed.errors, []);
  assert.equal(core.findRunEntry(obj, "RUN-T-001").run.closeout_result, "completed_successfully");
  assert.deepEqual(core.checkInvariants(obj, {}), []);

  for (const empty of ["", "   "]) {
    const refused = core.setStatus(tree(), { run: "RUN-T-001", status: "completed", closeoutResult: empty });
    assert.match(refused.errors.join("\n"), /closeout_result must be a non-empty string/);
  }
});

test("D.3: OLD TERMINAL RUNS ARE NOT BACKFILLED — stored absence stays valid, and the obligation binds only the ACT", () => {
  // A terminal run already on disk without the key: checkInvariants raises NOTHING (§14 is
  // untouched — reddening 9 existing runs is exactly what this change must not do).
  const stored = tree({ status: "completed" });
  assert.deepEqual(core.checkInvariants(stored, {}), [], "a completed run without closeout_result is valid DATA");
  // And a run that ALREADY carries an outcome can change terminal status without re-typing
  // it: the postcondition — a close ends with an outcome — is already met.
  const recorded = tree({ status: "completed", closeout_result: "completed_successfully" });
  const flipped = core.setStatus(recorded, { run: "RUN-T-001", status: "blocked" });
  assert.deepEqual(flipped.errors, []);
  assert.equal(core.findRunEntry(recorded, "RUN-T-001").run.closeout_result, "completed_successfully");
});

test("D.4: NON-TERMINAL transitions are untouched — no outcome is asked where nothing closes", () => {
  const obj = tree();
  assert.deepEqual(core.setStatus(obj, { run: "RUN-T-001", status: "active" }).errors, []);
  assert.deepEqual(core.setStatus(obj, { run: "RUN-T-001", status: "planned" }).errors, []);
});

test("D.5: the console's real close-with-progress path still works — batch [clear-progress, set-status] WITH the outcome", () => {
  const obj = tree({ status: "active", progress: [
    { cycle: 1, stage: "execution", attempt: 1, state: "running" }
  ] });
  const cleared = core.clearProgress(obj, { run: "RUN-T-001" });
  assert.deepEqual(cleared.errors, []);
  const closed = core.setStatus(obj, { run: "RUN-T-001", status: "completed", closeoutResult: "done early" });
  assert.deepEqual(closed.errors, []);
  assert.deepEqual(core.checkInvariants(obj, {}), []);
});

// ==================================================== 5. THE SURFACE

const harness = () => createConsoleHarness({ rendererPath: RENDERER, rootsByKey: new Map([["lanes", LANES_ROOT]]) });
const render = (h, expression) => vm.runInContext(expression, h.sandbox);
const FIELD = "depends_on_human_approved";

const modelWith = (target) => `{ runsById: new Map([[${JSON.stringify(target.run_id)}, ${JSON.stringify(target)}]]) }`;
const REVIEWED = { run_id: "RUN-T-001", queue_order: 1, title: "The reviewed one", status: "completed", progress: QA_PASSED };
const CLOSED_UNREVIEWED = { run_id: "RUN-T-001", queue_order: 1, title: "The reviewed one", status: "completed" };

test("E.1: the row tells THE FULL TRUTH when the target carries the positive QA — and only then", () => {
  const h = harness();
  h.sandbox.setProgressModel(progress);
  const html = render(h, `v3HumanApprovalSection({ run_id: "RUN-T-002", ${FIELD}: ["RUN-T-001"] }, ${modelWith(REVIEWED)})`);
  assert.match(html, /is-satisfied/);
  assert.match(html, /reviewed by a person — satisfied/);
  assert.equal(html.includes("awaiting a person&#39;s review"), false, "a satisfied row no longer owes anything");
});

test("E.2: WITHOUT the positive QA the row says exactly what it says today — never satisfied", () => {
  const h = harness();
  h.sandbox.setProgressModel(progress);
  const html = render(h, `v3HumanApprovalSection({ run_id: "RUN-T-002", ${FIELD}: ["RUN-T-001"] }, ${modelWith(CLOSED_UNREVIEWED)})`);
  assert.match(html, /awaiting a person&#39;s review/);
  assert.equal(/is-satisfied|satisfied/.test(html), false, "completed alone must never read as satisfied");
  // A negative QA is not an approval either:
  const negative = render(h, `v3HumanApprovalSection({ run_id: "RUN-T-002", ${FIELD}: ["RUN-T-001"] }, ${modelWith({ ...CLOSED_UNREVIEWED, progress: QA_CHANGES })})`);
  assert.match(negative, /awaiting a person&#39;s review/);
  assert.equal(/is-satisfied/.test(negative), false);
});

test("E.3: a NON-COMPLETED target keeps its waiting words even with a passed QA — the row B.7 names is the completed one", () => {
  const h = harness();
  h.sandbox.setProgressModel(progress);
  const html = render(h, `v3HumanApprovalSection({ run_id: "RUN-T-002", ${FIELD}: ["RUN-T-001"] }, ${modelWith({ ...REVIEWED, status: "active" })})`);
  assert.match(html, /waiting · active/);
  assert.equal(/is-satisfied/.test(html), false);
});

test("E.4: UNINJECTED IS NOT A DEFAULT — without the model the row NEVER says satisfied, even for a reviewed target", () => {
  const h = harness(); // setProgressModel deliberately not called
  const html = render(h, `v3HumanApprovalSection({ run_id: "RUN-T-002", ${FIELD}: ["RUN-T-001"] }, ${modelWith(REVIEWED)})`);
  assert.match(html, /awaiting a person&#39;s review/);
  assert.equal(/is-satisfied/.test(html), false, "fail-closed: a satisfied edge nothing verified is the forbidden invention");
});

test("F.1: History reads ABSENCE as 'No closeout recorded' — muted, never 'Blocked', never green", () => {
  const h = harness();
  const completedNoCloseout = { run_id: "RUN-T-001", queue_order: 1, title: "t", summary: "s", status: "completed", depends_on: [] };
  const cells = render(h, `v3QueueRowCells(${JSON.stringify(completedNoCloseout)}, "history", new Map(), null).cells`);
  assert.match(cells, /No closeout recorded/);
  assert.match(cells, /is-muted/);
  assert.equal(cells.includes("Blocked"), false, "empty is not blocked — a correctly closed run must not show as a problem");
  assert.equal(cells.includes("is-green"), false, "absence must not be dressed as success either");
  // A blocked run without the key reads the same honest absence, not its status re-painted:
  const blockedNoCloseout = { ...completedNoCloseout, status: "blocked" };
  const blockedCells = render(h, `v3QueueRowCells(${JSON.stringify(blockedNoCloseout)}, "history", new Map(), null).cells`);
  assert.match(blockedCells, /No closeout recorded/);
});

test("F.2: a RECORDED outcome renders exactly as before — sentence-cased, green on completed", () => {
  const h = harness();
  const run = { run_id: "RUN-T-001", queue_order: 1, title: "t", summary: "s", status: "completed", depends_on: [], closeout_result: "completed_successfully" };
  const cells = render(h, `v3QueueRowCells(${JSON.stringify(run)}, "history", new Map(), null).cells`);
  assert.match(cells, /Completed successfully/);
  assert.match(cells, /is-green/);
  const blocked = { ...run, status: "blocked", closeout_result: "superseded_by_D-000" };
  const blockedCells = render(h, `v3QueueRowCells(${JSON.stringify(blocked)}, "history", new Map(), null).cells`);
  assert.match(blockedCells, /Superseded by D-000/);
  assert.equal(blockedCells.includes("is-green"), false);
});

test("G.1: the EDITOR asks for the outcome at close — the field names the requirement and the note says who refuses", () => {
  const source = readFileSync(RENDERER, "utf8");
  assert.match(source, /Closeout result — required to close/);
  assert.match(source, /Closing to completed or blocked REQUIRES a closeout result/);
  assert.match(source, /data-v3edit-closeout /, "the collection hook stays wired");
});
