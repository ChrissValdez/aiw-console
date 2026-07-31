// ONE KEY SPACE, THREE DECLARATIONS — the net under defect (A) and defect (D).
//
// A run's queue group is declared in three places that must agree:
//
//   1. `v3QueueGroupKey`                  project-console/assets/project-console.js — the function
//                                         that DERIVES the key. It is the authority.
//   2. `ROADMAP_V3_QUEUE_GROUP_LABELS`    same file — the label each key is shown under.
//   3. `roadmapQueueGroup`                tools/projector/project.mjs — a declared MIRROR of (1).
//
// Both other declarations had drifted from (1) and nothing was red.
//
//   (2) listed four keys against the function's five. Overview looked its semantic key up in the
//       Run Queue's DISPLAY table, so `ready_next` and `later` missed and fired the call site's
//       literal fallback — whatever the run's status. That is defect (A), and its cause is this
//       key-space gap, not "no run is active".
//
//   (3) had lost the `needs_human_decision` branch and the barrier branch and did not even take
//       the `model` argument, so it answered "now" for a run parked in Human QA and "ready_next"
//       for a run a barrier was holding. That is defect (D). The suite used to ASSERT against
//       this mirror, which is why (A) had no net at all.
//
// These tests hold the three in step. Add a key or a branch to one and the others go red.
//
// The suite asserts against the CONSOLE, via tests/helpers/console-grouping.mjs — never against
// the mirror. #40 established that and this file keeps it: every expected value below is compared
// to the console's own answer, and the mirror is checked FOR AGREEING WITH IT.

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

import { roadmapQueueGroup } from "../tools/projector/project.mjs";
import { consoleQueueGroupKey, rendererDefinesQueueGroupKey } from "./helpers/console-grouping.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const RENDERER = join(REPO_ROOT, "project-console", "assets", "project-console.js");

// The two tables are top-level `const`s of a browser script. A `const` never lands on the vm
// context's global object (unlike a function declaration, which is how console-grouping.mjs gets
// at v3QueueGroupKey), so they are published by an epilogue appended to the SAME script — same
// lexical scope, same evaluation. The renderer's own source is untouched and nothing is copied
// into this file: a rename in the renderer surfaces here as `undefined`, not as a stale duplicate.
function rendererConstant(name) {
  const sandbox = {
    document: {
      title: "",
      getElementById: () => null,
      querySelector: () => null,
      querySelectorAll: () => [],
      createElement: () => ({ addEventListener() {}, setAttribute() {}, appendChild() {} }),
      addEventListener() {},
      removeEventListener() {}
    },
    fetch: async () => ({ ok: false, status: 404, text: async () => "", json: async () => ({}) }),
    console,
    setInterval, clearInterval, setTimeout, clearTimeout, URL
  };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  const epilogue = `\n;globalThis.__constUnderTest = (typeof ${name} === "undefined") ? undefined : ${name};\n`;
  vm.runInContext(readFileSync(RENDERER, "utf8") + epilogue, sandbox, { filename: RENDERER });
  return sandbox.__constUnderTest;
}

// ---------------------------------------------------------------------------
// A table of runs that reaches EVERY branch of the derivation, so "the key spaces match" is
// backed by keys actually produced rather than by a list someone typed.
// ---------------------------------------------------------------------------

const qa = (state) => [{ cycle: 1, stage: "human_qa", attempt: 1, state }];

const RUNS = [
  // active, no progress -> now
  { run_id: "R-NOW", queue_order: 1, title: "now", summary: "", status: "active", depends_on: [] },
  // active, parked in Human QA waiting -> needs_human_decision (the branch the mirror had lost)
  { run_id: "R-HQA", queue_order: 2, title: "hqa", summary: "", status: "active", depends_on: [], progress: qa("waiting") },
  // active, Human QA already running -> still now
  { run_id: "R-HQA-RUNNING", queue_order: 3, title: "hqa running", summary: "", status: "active", depends_on: [], progress: qa("running") },
  // planned, dependencies complete -> ready_next
  { run_id: "R-READY", queue_order: 4, title: "ready", summary: "", status: "planned", depends_on: ["R-DONE"] },
  // planned, dependency not complete -> later
  { run_id: "R-LATER", queue_order: 5, title: "later", summary: "", status: "planned", depends_on: ["R-NOW"] },
  // terminal -> history
  { run_id: "R-DONE", queue_order: 6, title: "done", summary: "", status: "completed", depends_on: [] },
  { run_id: "R-BLOCKED", queue_order: 7, title: "blocked", summary: "", status: "blocked", depends_on: [] }
];

const runsById = new Map(RUNS.map((run) => [run.run_id, run]));

// A barrier-aware model of the same shape the console builds: an incomplete barrier at #1 holding
// the planned run at #4, whose own dependency IS complete. Without the barrier branch a mirror
// calls that run ready_next; with it, later. (The console guards on status === "planned", so the
// map may name any run.)
const BARRIER_MODEL = {
  barrierBlockersByRunId: new Map([["R-READY", [{ run_id: "R-NOW", queue_order: 1, barrier: "global" }]]])
};

// ---------------------------------------------------------------------------

test("the renderer still defines the function these tests read (guard against a silent rename)", () => {
  assert.equal(rendererDefinesQueueGroupKey(), true);
});

test("the console's five keys and the label table's keys are THE SAME SET", () => {
  const labels = rendererConstant("ROADMAP_V3_QUEUE_GROUP_LABELS");
  assert.ok(labels && typeof labels === "object", "ROADMAP_V3_QUEUE_GROUP_LABELS is not defined by the renderer");

  const derived = new Set(RUNS.map((run) => consoleQueueGroupKey(run, runsById)));
  derived.add(consoleQueueGroupKey(runsById.get("R-READY"), runsById, BARRIER_MODEL));

  // The table is complete for what the function can return...
  for (const key of derived) {
    assert.ok(
      Object.prototype.hasOwnProperty.call(labels, key),
      `v3QueueGroupKey returns "${key}" and ROADMAP_V3_QUEUE_GROUP_LABELS does not declare it — ` +
      "the Overview lookup would miss and fall back to a literal (defect A)"
    );
    assert.equal(typeof labels[key], "string");
    assert.ok(labels[key].length > 0, `"${key}" is declared with an empty label`);
  }
  // ...and declares nothing the function cannot return.
  for (const key of Object.keys(labels)) {
    assert.ok(derived.has(key), `ROADMAP_V3_QUEUE_GROUP_LABELS declares "${key}", which v3QueueGroupKey never returns`);
  }
  // The five, named, so shrinking the table AND the table-driven half of this test still fails.
  assert.deepEqual([...derived].sort(), ["history", "later", "needs_human_decision", "now", "ready_next"]);
});

test("the DISPLAY table stays four sections and stays a different thing from the semantic table", () => {
  // The repair of (A) must not have turned the Run Queue's four sections into five: ready_next
  // and later collapse into "upcoming" by design, and that collapse is display-only.
  // Array.from, not .map: the table comes out of a vm realm, and a realm's Array is not
  // reference-equal to this one's under a strict deepEqual.
  const display = Array.from(rendererConstant("ROADMAP_V3_QUEUE_GROUPS"), (group) => group.key);
  assert.deepEqual(display, ["needs_human_decision", "now", "upcoming", "history"]);
  const labels = rendererConstant("ROADMAP_V3_QUEUE_GROUP_LABELS");
  assert.equal(Object.prototype.hasOwnProperty.call(labels, "upcoming"), false,
    "the semantic table has grown a display-only key");
});

test("the projector's mirror answers exactly what the console answers, run for run", () => {
  for (const run of RUNS) {
    const expected = consoleQueueGroupKey(run, runsById);
    assert.equal(
      roadmapQueueGroup(run, runsById),
      expected,
      `roadmapQueueGroup has diverged from v3QueueGroupKey for ${run.run_id} (status ${run.status})`
    );
  }
});

test("the mirror takes the model and honours barriers, exactly as the console does", () => {
  const barred = runsById.get("R-READY");
  // Precondition: without a model both agree it is ready.
  assert.equal(consoleQueueGroupKey(barred, runsById), "ready_next");
  assert.equal(roadmapQueueGroup(barred, runsById), "ready_next");
  // With one, both must see the barrier. A mirror that ignores its third argument fails here.
  assert.equal(consoleQueueGroupKey(barred, runsById, BARRIER_MODEL), "later");
  assert.equal(roadmapQueueGroup(barred, runsById, BARRIER_MODEL), "later",
    "roadmapQueueGroup ignores the model argument: a barred run is still called ready_next");
  assert.equal(roadmapQueueGroup(barred, runsById, BARRIER_MODEL), consoleQueueGroupKey(barred, runsById, BARRIER_MODEL));
});

test("the mirror declares itself a mirror AND names the test that holds it there", () => {
  // E4: the sync contract is written where the next reader of this function will be standing.
  const source = readFileSync(join(REPO_ROOT, "tools", "projector", "project.mjs"), "utf8");
  const declaration = source.slice(0, source.indexOf("export function roadmapQueueGroup"));
  // The contiguous run of comment lines immediately above the export — not "somewhere in the
  // file". A note that drifts away from the function it governs stops being read with it.
  const lines = declaration.split(/\r?\n/);
  const banner = [];
  for (let i = lines.length - 1; i >= 0 && (lines[i].trim().startsWith("//") || (banner.length === 0 && !lines[i].trim())); i -= 1) {
    if (lines[i].trim()) banner.unshift(lines[i]);
  }
  const comment = banner.join("\n");
  assert.ok(comment.length > 0, "roadmapQueueGroup has no comment above it at all");
  assert.match(comment, /v3QueueGroupKey/, "the mirror no longer names what it mirrors");
  assert.match(comment, /console-queue-keyspace\.test\.mjs/,
    "the mirror no longer names the test that keeps it in step — if this file was renamed, follow it here");
});
