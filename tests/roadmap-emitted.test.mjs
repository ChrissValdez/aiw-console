// Contract test for the EMITTED Roadmap-v3 view (tools/projector/project.mjs).
//
// Unlike roadmap.test.mjs (which inspects the in-memory buildRoadmap() object), this test
// runs the projector end-to-end — copies a fixture project into a temp dir, calls
// writeRoadmap(), then loads the file the projector actually WROTE to
// <root>/.aiw/views/roadmap.json — and asserts every requirement the console's Roadmap
// reader (`v3Model()` and its callees in docs/project-console/assets/project-console.js)
// imposes. The fixture exercises the honest-mapping cases objective 005 targets: an empty
// pending/ queue (parked must still land in Later), and ERROR-/HUMAN_REVIEW- processed runs
// (which must read as `blocked`, never a clean green `completed`).
import test from "node:test";
import assert from "node:assert/strict";
import { cpSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { roadmapQueueGroup, writeRoadmap } from "../tools/projector/project.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const FIXTURE = join(HERE, "fixtures", "honest-project");
const FIXED_NOW = "2026-07-18T00:00:00.000Z";

// The exact status vocabulary the reader recognises (ROADMAP_V3_STATUS_TONES / v3TerminalIcon).
const VALID_STATUSES = new Set(["planned", "active", "completed", "blocked"]);

function runsOf(roadmap) {
  const runs = [];
  for (const objective of roadmap.objectives || []) {
    for (const phase of objective.phases || []) {
      for (const run of phase.runs || []) runs.push(run);
    }
  }
  return runs;
}

// Emit the view via the projector and load the FILE it wrote (not the in-memory return),
// running the callback with the parsed on-disk roadmap plus its runs indexed by run_id.
function withEmittedRoadmap(fn) {
  const dir = mkdtempSync(join(tmpdir(), "aiw-roadmap-emitted-"));
  try {
    cpSync(FIXTURE, dir, { recursive: true });
    const { path } = writeRoadmap(dir, { now: FIXED_NOW });
    const roadmap = JSON.parse(readFileSync(path, "utf8"));
    const runs = runsOf(roadmap);
    const byId = new Map(runs.map((run) => [run.run_id, run]));
    fn({ roadmap, runs, byId });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

test("emitted roadmap.json is a non-empty objectives→phases→runs container (a1, a2)", () => {
  withEmittedRoadmap(({ roadmap, runs }) => {
    assert.ok(Array.isArray(roadmap.objectives) && roadmap.objectives.length > 0);
    for (const objective of roadmap.objectives) {
      assert.ok(Array.isArray(objective.phases));
      for (const phase of objective.phases) assert.ok(Array.isArray(phase.runs));
    }
    assert.ok(runs.length > 0, "expected at least one run");
  });
});

test("every emitted run has a unique run_id, a valid status and the required fields (a3, a4, a5)", () => {
  withEmittedRoadmap(({ runs }) => {
    const seen = new Set();
    for (const run of runs) {
      assert.equal(typeof run.run_id, "string");
      assert.ok(run.run_id.length > 0, "run_id must be non-empty");
      assert.ok(!seen.has(run.run_id), `duplicate run_id ${run.run_id}`);
      seen.add(run.run_id);
      assert.ok(VALID_STATUSES.has(run.status), `unexpected status ${run.status}`);
      assert.equal(typeof run.queue_order, "number");
      assert.equal(typeof run.title, "string");
      assert.equal(typeof run.summary, "string");
    }
  });
});

test("parked runs land in Later even with an empty pending queue (c)", () => {
  withEmittedRoadmap(({ byId }) => {
    const parked = byId.get("300-deferred-thing");
    assert.ok(parked, "parked run missing from emitted view");
    assert.equal(parked.status, "planned");
    // With no pending objectives the run still carries an unsatisfied dependency, so the
    // reader's own grouping logic files it under Later — never Ready Next.
    assert.equal(roadmapQueueGroup(parked, byId), "later");
  });
});

test("ERROR-/HUMAN_REVIEW- processed runs read as blocked, not clean completions (c)", () => {
  withEmittedRoadmap(({ byId }) => {
    const err = byId.get("ERROR-310-broke");
    assert.ok(err, "ERROR- run missing");
    assert.equal(err.status, "blocked");
    assert.notEqual(err.status, "completed");
    assert.equal(err.closeout_result, "error");
    assert.equal(roadmapQueueGroup(err, byId), "history");

    const review = byId.get("HUMAN_REVIEW-320-needs-eyes");
    assert.ok(review, "HUMAN_REVIEW- run missing (prefix parse must accept underscores)");
    assert.equal(review.status, "blocked");
    assert.notEqual(review.status, "completed");
    assert.equal(review.closeout_result, "human_review");

    // Genuinely clean completions stay green.
    assert.equal(byId.get("APPROVED-330-done").status, "completed");
    assert.equal(byId.get("340-plain-done").status, "completed");
  });
});

test("titles and summaries come from the objective's # Objective section, not the # Project H1 (b)", () => {
  withEmittedRoadmap(({ byId, runs }) => {
    const parked = byId.get("300-deferred-thing");
    assert.equal(parked.title, "Ship the deferred backlog item once the active queue drains.");
    assert.equal(parked.summary, "Ship the deferred backlog item once the active queue drains.");
    assert.equal(byId.get("ERROR-310-broke").title, "Attempt the migration that ultimately failed to converge.");
    // The # Project H1 value ("honest") must never leak into a run title.
    for (const run of runs) assert.notEqual(run.title, "honest");
  });
});
