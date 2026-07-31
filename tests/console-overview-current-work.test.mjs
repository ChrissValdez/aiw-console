// DEFECT (A) — the Overview "Current work" block, against the REAL renderer.
//
// Three things were wrong here and none of them had a test:
//
//   1. `renderOverviewV3` looked its SEMANTIC queue-group key up in `ROADMAP_V3_QUEUE_GROUPS`,
//      which is the Run Queue's four-section DISPLAY table. `ready_next` and `later` are not in
//      it, so the lookup returned undefined and the call site's literal fallback fired —
//      whatever the run's status was. (The key-space half of this is asserted in
//      tests/console-queue-keyspace.test.mjs; here it is asserted on what gets painted.)
//
//   2. The block picked `runs.find(active) || runs[0]`. With no active run that is the head of
//      the queue, which on a project underway is a COMPLETED run — painted under a label that
//      says "Current work item". The console asserted work was in progress that had finished.
//
//   3. With no runs to show at all it printed "No runs in the roadmap." over a roadmap full of
//      runs, because it only ever reached that branch when the head-of-queue fallback failed.
//
// Operator decision these tests pin (2026-07-30): with no active run the block shows the NEXT
// ELIGIBLE run under "Next up"; with neither, the block is hidden ENTIRELY.
//
// The harness is the same node:vm one every consumer suite uses, so this exercises the shipped
// renderer rather than a description of it.

import test from "node:test";
import assert from "node:assert/strict";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createConsoleHarness } from "./helpers/console-dom.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const RENDERER = join(resolve(HERE, ".."), "project-console", "assets", "project-console.js");

// A roadmap tree in the shape v3Model consumes. Runs are given in queue order.
function tree(runs) {
  return {
    title: "Fixture",
    objectives: [{
      objective_id: "O1",
      title: "O1",
      phases: [{ phase_id: "O1.P1", title: "P1", runs }]
    }]
  };
}

const run = (order, status, extra = {}) => ({
  run_id: `R${order}`,
  queue_order: order,
  title: `Run ${order}`,
  summary: `summary ${order}`,
  status,
  depends_on: [],
  ...extra
});

function makeHarness() {
  const harness = createConsoleHarness({ rendererPath: RENDERER, rootsByKey: new Map() });
  // The renderer resolves source paths off the active project base; the shell sets it before
  // any load and the absence messages name the file through it.
  harness.sandbox.setActiveProjectBase("/projects/fixture/");
  return harness;
}

// Render an Overview over the given runs and return the painted surfaces.
function renderOverview(runs) {
  const harness = makeHarness();
  harness.sandbox.renderOverviewV3({ roadmapV3: tree(runs) });
  const currentWork = harness.element("project-overview");
  return { harness, currentWork, html: currentWork.innerHTML };
}

// ---------------------------------------------------------------------------
// (2) and its prohibition: nothing terminal is ever "Current work item".
// ---------------------------------------------------------------------------

test("a COMPLETED head of queue is never painted under Current work item", () => {
  const { html } = renderOverview([
    run(1, "completed"),
    run(2, "completed"),
    run(3, "planned")
  ]);
  assert.equal(html.includes("Current work item"), false,
    "a completed run is being painted as the current work item");
  assert.equal(html.includes("Run 1"), false, "the head of the queue leaked into the block");
});

test("Current work item appears for an ACTIVE run and for no other status", () => {
  for (const status of ["completed", "planned", "blocked"]) {
    const { html } = renderOverview([run(1, status)]);
    assert.equal(html.includes("Current work item"), false,
      `a "${status}" run is being painted as the current work item`);
  }
  const { html } = renderOverview([run(1, "active")]);
  assert.ok(html.includes("Current work item"));
  assert.ok(html.includes("Run 1"));
});

// The exact state measured on this project on 2026-07-30: zero active runs, and the head of the
// queue completed. It produced "History" under "Current work item".
test("the measured state — zero active runs, head of queue completed — paints no current work", () => {
  const runs = [];
  for (let i = 1; i <= 41; i += 1) runs.push(run(i, "completed"));
  for (let i = 42; i <= 45; i += 1) runs.push(run(i, "planned"));
  const { html } = renderOverview(runs);
  assert.equal(html.includes("Current work item"), false);
  assert.equal(html.includes("History"), false,
    "the History label is still reaching the Current work block");
  // What it shows instead: the next eligible run, under Next up.
  assert.ok(html.includes("Next up"));
  assert.ok(html.includes("Run 42"));
});

// ---------------------------------------------------------------------------
// (1) the label: no literal fallback, and never the wrong key space.
// ---------------------------------------------------------------------------

test("the Next up chip carries the ready_next LABEL, from the table rather than from a literal", () => {
  const { html } = renderOverview([run(1, "active"), run(2, "planned")]);
  assert.ok(html.includes("Next up"));
  assert.ok(html.includes("Ready Next"), "the ready_next label is missing from the Next up chip");
});

test("an active run parked in Human QA is labelled Needs Human Decision, not Now", () => {
  // The semantic key here is needs_human_decision. It IS in the display table too, so this
  // asserts the label is derived rather than hardcoded to the "Now" fallback.
  const { html } = renderOverview([
    run(1, "active", { progress: [{ cycle: 1, stage: "human_qa", attempt: 1, state: "waiting" }] })
  ]);
  assert.ok(html.includes("Current work item"));
  assert.ok(html.includes("Needs Human Decision"),
    "the Human QA branch is not reaching the Overview label");
});

test("an ordinary active run is labelled Now", () => {
  const { html } = renderOverview([run(1, "active")]);
  assert.ok(html.includes("Now"));
});

// ---------------------------------------------------------------------------
// (3) the decided behaviour when there is nothing to say.
// ---------------------------------------------------------------------------

test("with no active run the block shows the next ELIGIBLE run under Next up", () => {
  const { currentWork, html } = renderOverview([
    run(1, "completed"),
    run(2, "planned", { depends_on: ["R1"] }),
    run(3, "planned", { depends_on: ["R2"] })
  ]);
  assert.ok(html.includes("Next up"));
  assert.ok(html.includes("Run 2"));
  assert.equal(html.includes("Current work item"), false);
  assert.equal(currentWork.hidden, false, "the block was hidden while it still had a run to show");
});

test("a run held by an incomplete BARRIER is not offered as Next up", () => {
  const { html } = renderOverview([
    run(1, "planned", { barrier: "global" }),
    run(2, "planned")
  ]);
  // #1 is itself eligible (no dependencies) and is not barred by itself.
  assert.ok(html.includes("Run 1"));
  assert.equal(html.includes("Run 2"), false, "a barred run was offered as Next up");
});

test("with neither an active run nor an eligible one, the block is HIDDEN — not filled with a lie", () => {
  // Every run terminal: nothing is running and nothing can start.
  const { currentWork, html } = renderOverview([
    run(1, "completed"),
    run(2, "completed")
  ]);
  assert.equal(html.trim(), "", "the block painted something over a queue with nothing to show");
  assert.equal(currentWork.hidden, true, "the block is empty but still on screen");
  assert.equal(html.includes("No runs in the roadmap."), false,
    "the block claims the roadmap is empty while it holds runs");
});

test("a blocked-only queue also hides the block (no eligible run to promote)", () => {
  const { currentWork } = renderOverview([
    run(1, "completed"),
    run(2, "planned", { depends_on: ["R3"] }),
    run(3, "blocked")
  ]);
  assert.equal(currentWork.hidden, true);
});

test("the hidden block comes BACK when the next render has something to say", () => {
  const harness = makeHarness();
  const currentWork = harness.element("project-overview");

  harness.sandbox.renderOverviewV3({ roadmapV3: tree([run(1, "completed")]) });
  assert.equal(currentWork.hidden, true);

  harness.sandbox.renderOverviewV3({ roadmapV3: tree([run(1, "completed"), run(2, "active")]) });
  assert.equal(currentWork.hidden, false, "the block stayed hidden over a render that had an active run");
  assert.ok(currentWork.innerHTML.includes("Current work item"));
});

test("an ABSENT roadmap still states its absence in the block, visibly", () => {
  const harness = makeHarness();
  const currentWork = harness.element("project-overview");
  // Hide it first, so this asserts the restore and not just the default.
  harness.sandbox.renderOverviewV3({ roadmapV3: tree([run(1, "completed")]) });
  assert.equal(currentWork.hidden, true);

  harness.sandbox.renderOverviewV3({ roadmapV3: null });
  assert.equal(currentWork.hidden, false, "the absence message was rendered into a hidden block");
  assert.ok(currentWork.innerHTML.includes("Roadmap v3 source unavailable"));
});

// ---------------------------------------------------------------------------
// The surfaces the repair must NOT have moved.
// ---------------------------------------------------------------------------

test("the Queue snapshot still counts all five semantic groups", () => {
  const harness = makeHarness();
  harness.sandbox.renderOverviewV3({
    roadmapV3: tree([run(1, "completed"), run(2, "active"), run(3, "planned"), run(4, "planned", { depends_on: ["R3"] })])
  });
  const snapshot = harness.element("overview-activity").innerHTML;
  for (const label of ["Needs Human Decision", "Now", "Ready Next", "Later", "History", "Pending runs"]) {
    assert.ok(snapshot.includes(label), `the Queue snapshot lost the "${label}" cell`);
  }
});

test("Next action still lists the pending runs after Next up", () => {
  const harness = makeHarness();
  harness.sandbox.renderOverviewV3({
    roadmapV3: tree([run(1, "active"), run(2, "planned"), run(3, "planned"), run(4, "planned")])
  });
  const nextAction = harness.element("next-pending-runs").innerHTML;
  assert.ok(nextAction.includes("Run 3"));
  assert.ok(nextAction.includes("Run 4"));
});
