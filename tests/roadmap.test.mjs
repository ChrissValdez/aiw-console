// Fixture-based tests for the optional Roadmap-v3 view (tools/projector/project.mjs).
//
// They assert that buildRoadmap() emits the exact shape the console's Roadmap tab reads
// (`v3Model()` in docs/project-console/assets/project-console.js): a single
// objective → phase → runs container whose runs carry run_id / queue_order / title /
// summary / full_description / status / depends_on. The mapping rules (pending → Now +
// Ready Next, parked → Later, processed → History) are checked against the console's OWN
// grouping logic via the mirrored roadmapQueueGroup(), and writeRoadmap() is asserted to
// land the file at <root>/.aiw/views/roadmap.json and never outside .aiw/.
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { dirname, join, resolve, sep } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import {
  GENERATED_FROM,
  ROADMAP_RELATIVE_PATH,
  buildRoadmap,
  resolveRoadmapPath,
  roadmapQueueGroup,
  writeRoadmap
} from "../tools/projector/project.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const FIXTURE = join(HERE, "fixtures", "sample-project");
const FIXED_NOW = "2026-07-10T00:00:00.000Z";

const VALID_STATUSES = new Set(["planned", "active", "completed", "blocked"]);

// Flatten the emitted container into its runs and index them by id, exactly as the
// console does before deriving queue groups.
function runsOf(roadmap) {
  const runs = [];
  for (const objective of roadmap.objectives) {
    for (const phase of objective.phases || []) {
      for (const run of phase.runs || []) runs.push(run);
    }
  }
  return runs;
}

function runsById(runs) {
  return new Map(runs.map((run) => [run.run_id, run]));
}

function groupOf(roadmap, runId) {
  const runs = runsOf(roadmap);
  const byId = runsById(runs);
  return roadmapQueueGroup(byId.get(runId), byId);
}

test("buildRoadmap emits the single objective→phase→runs container the console reads", () => {
  const roadmap = buildRoadmap(FIXTURE, { now: FIXED_NOW });
  assert.equal(roadmap.generated_at, FIXED_NOW);
  assert.equal(roadmap.generated_from, GENERATED_FROM);
  assert.ok(Array.isArray(roadmap.objectives) && roadmap.objectives.length === 1);
  const [objective] = roadmap.objectives;
  assert.equal(typeof objective.title, "string");
  assert.equal(typeof objective.summary, "string");
  assert.ok(Array.isArray(objective.phases) && objective.phases.length === 1);
  assert.ok(Array.isArray(objective.phases[0].runs));

  const runs = runsOf(roadmap);
  assert.equal(runs.length, 7); // 2 pending + 2 parked + 3 processed
  for (const run of runs) {
    assert.equal(typeof run.run_id, "string");
    assert.equal(typeof run.title, "string");
    assert.equal(typeof run.summary, "string");
    assert.equal(typeof run.full_description, "string");
    assert.ok(VALID_STATUSES.has(run.status), `unexpected status ${run.status}`);
    assert.ok(Array.isArray(run.depends_on));
  }
  // queue_order is a dense, unique 1..N sequence in operator reading order.
  const orders = runs.map((run) => run.queue_order);
  assert.deepEqual(orders, [1, 2, 3, 4, 5, 6, 7]);
});

test("titles come from each objective's H1 first line", () => {
  const roadmap = buildRoadmap(FIXTURE, { now: FIXED_NOW });
  const byId = runsById(runsOf(roadmap));
  assert.equal(byId.get("001-first-objective").title, "First objective");
  assert.equal(byId.get("APPROVED-005-shipped-objective").title, "Shipped objective");
});

test("pending → Now (first alphabetical, active) + Ready Next (the rest, planned)", () => {
  const roadmap = buildRoadmap(FIXTURE, { now: FIXED_NOW });
  const byId = runsById(runsOf(roadmap));

  const now = byId.get("001-first-objective");
  assert.equal(now.status, "active");
  assert.deepEqual(now.depends_on, []);
  assert.equal(groupOf(roadmap, "001-first-objective"), "now");

  const ready = byId.get("002-second-objective");
  assert.equal(ready.status, "planned");
  assert.deepEqual(ready.depends_on, []);
  assert.equal(groupOf(roadmap, "002-second-objective"), "ready_next");
});

test("parked → Later (planned, waiting on the unfinished pending queue)", () => {
  const roadmap = buildRoadmap(FIXTURE, { now: FIXED_NOW });
  const byId = runsById(runsOf(roadmap));
  for (const id of ["003-parked-objective", "004-later-idea"]) {
    const run = byId.get(id);
    assert.equal(run.status, "planned");
    assert.deepEqual(run.depends_on, ["001-first-objective", "002-second-objective"]);
    assert.equal(groupOf(roadmap, id), "later");
  }
});

test("processed → History with status parsed from the filename prefix", () => {
  const roadmap = buildRoadmap(FIXTURE, { now: FIXED_NOW });
  const byId = runsById(runsOf(roadmap));

  const approved = byId.get("APPROVED-005-shipped-objective");
  assert.equal(approved.status, "completed");
  assert.equal(approved.closeout_result, "approved");
  assert.equal(groupOf(roadmap, "APPROVED-005-shipped-objective"), "history");

  const rejected = byId.get("REJECTED-006-abandoned-objective");
  assert.equal(rejected.status, "blocked");
  assert.equal(rejected.closeout_result, "rejected");
  assert.equal(groupOf(roadmap, "REJECTED-006-abandoned-objective"), "history");

  // No prefix → treated as a successful completion.
  const done = byId.get("000-done-objective");
  assert.equal(done.status, "completed");
  assert.equal(done.closeout_result, "completed");
  assert.equal(groupOf(roadmap, "000-done-objective"), "history");
});

test("writeRoadmap lands the view at <root>/.aiw/views/roadmap.json", () => {
  const dir = mkdtempSync(join(tmpdir(), "aiw-roadmap-"));
  try {
    const result = writeRoadmap(dir, { now: FIXED_NOW });
    const expected = join(dir, ROADMAP_RELATIVE_PATH);
    assert.equal(result.path, resolve(expected));
    assert.ok(existsSync(expected), "roadmap.json was not written");
    const onDisk = JSON.parse(readFileSync(expected, "utf8"));
    assert.deepEqual(onDisk, result.roadmap);
    // Empty project → an empty run list, still a valid container (fail-soft).
    assert.deepEqual(runsOf(onDisk), []);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("the resolved roadmap path is always inside the project root's .aiw/", () => {
  const dir = mkdtempSync(join(tmpdir(), "aiw-roadmap-path-"));
  try {
    const { aiwDir, outPath } = resolveRoadmapPath(dir);
    assert.equal(aiwDir, resolve(dir, ".aiw"));
    assert.ok(outPath === aiwDir || outPath.startsWith(aiwDir + sep), `resolved output ${outPath} escapes ${aiwDir}`);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
