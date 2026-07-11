// Fixture-based tests for the AIW projector (tools/projector/project.mjs).
//
// They assert that buildSnapshot() emits every key required by docs/snapshot-schema-v1.md
// with the right type, that writeSnapshot() lands the artifact at the canonical path
// <root>/.aiw/views/project_console.snapshot.json and never outside .aiw/, and that an empty
// project still produces a schema-conforming snapshot (fail-soft, never an error).
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve, sep } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import {
  GENERATED_FROM,
  ROADMAP_RELATIVE_PATH,
  SCHEMA_VERSION,
  SNAPSHOT_RELATIVE_PATH,
  buildSnapshot,
  resolveSnapshotPath,
  writeSnapshot
} from "../tools/projector/project.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const FIXTURE = join(HERE, "fixtures", "sample-project");
const FIXED_NOW = "2026-07-10T00:00:00.000Z";

// Every required top-level key from docs/snapshot-schema-v1.md §1 (envelope) + §2, with a
// predicate that also encodes the required JSON type.
const REQUIRED_KEYS = {
  schema_version: (v) => Number.isInteger(v),
  project_id: (v) => typeof v === "string" && v.length > 0,
  generated_at: (v) => typeof v === "string" && !Number.isNaN(Date.parse(v)),
  generated_from: (v) => typeof v === "string" && v.length > 0,
  operational_status: (v) => typeof v === "string" && v.length > 0,
  project_summary: (v) => typeof v === "string" && v.length > 0,
  current_status_summary: (v) => typeof v === "string" && v.length > 0,
  roadmap_tree: (v) => v !== null && typeof v === "object" && !Array.isArray(v),
  blockers: (v) => Array.isArray(v),
  followups: (v) => Array.isArray(v),
  no_claims_summary: (v) => v !== null && typeof v === "object" && !Array.isArray(v),
  validation_summary: (v) => v !== null && typeof v === "object" && !Array.isArray(v),
  taxonomy_model: (v) => v !== null && typeof v === "object" && !Array.isArray(v)
};

function assertConformsToSchema(snapshot) {
  for (const [key, isValid] of Object.entries(REQUIRED_KEYS)) {
    assert.ok(key in snapshot, `snapshot missing required key ${key}`);
    assert.ok(isValid(snapshot[key]), `snapshot key ${key} has wrong type/shape: ${JSON.stringify(snapshot[key])}`);
  }
  assert.equal(snapshot.schema_version, SCHEMA_VERSION);
  assert.equal(snapshot.generated_from, GENERATED_FROM);
}

test("buildSnapshot emits every required key with the right type", () => {
  const snapshot = buildSnapshot(FIXTURE, { now: FIXED_NOW });
  assertConformsToSchema(snapshot);
});

test("buildSnapshot projects objectives into a flat roadmap_tree", () => {
  const snapshot = buildSnapshot(FIXTURE, { now: FIXED_NOW });
  assert.equal(snapshot.project_id, "sample_aiw_project"); // from fixture config.json
  assert.equal(snapshot.generated_at, FIXED_NOW);
  assert.equal(snapshot.operational_status, "active"); // pending objectives exist

  const { counts, objectives } = snapshot.roadmap_tree;
  assert.deepEqual(counts, { pending: 2, parked: 2, processed: 3, total: 7 });
  assert.equal(objectives.length, 7);
  for (const objective of objectives) {
    assert.equal(typeof objective.id, "string");
    assert.equal(typeof objective.title, "string");
    assert.ok(["pending", "parked", "processed"].includes(objective.classification));
  }
  // First H1 becomes the title.
  const first = objectives.find((o) => o.id === "001-first-objective");
  assert.equal(first.title, "First objective");
  assert.equal(first.classification, "pending");
});

test("empty project still produces a schema-conforming, idle snapshot", () => {
  const dir = mkdtempSync(join(tmpdir(), "aiw-empty-"));
  try {
    const snapshot = buildSnapshot(dir, { now: FIXED_NOW });
    assertConformsToSchema(snapshot);
    assert.equal(snapshot.operational_status, "idle");
    assert.deepEqual(snapshot.roadmap_tree.counts, { pending: 0, parked: 0, processed: 0, total: 0 });
    assert.deepEqual(snapshot.blockers, []);
    assert.deepEqual(snapshot.followups, []);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("writeSnapshot lands the artifact at the canonical <root>/.aiw/views/project_console.snapshot.json", () => {
  const dir = mkdtempSync(join(tmpdir(), "aiw-write-"));
  try {
    const result = writeSnapshot(dir, { now: FIXED_NOW });
    const expected = join(dir, SNAPSHOT_RELATIVE_PATH);
    assert.equal(result.path, resolve(expected));
    // The canonical path the UI fetches: .aiw/views/project_console.snapshot.json.
    assert.equal(SNAPSHOT_RELATIVE_PATH, join(".aiw", "views", "project_console.snapshot.json"));
    assert.ok(existsSync(expected), "snapshot file was not written");

    const onDisk = JSON.parse(readFileSync(expected, "utf8"));
    assertConformsToSchema(onDisk);
    assert.deepEqual(onDisk, result.snapshot);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("writeSnapshot emits the roadmap.json view alongside the snapshot", () => {
  const result = writeSnapshot(FIXTURE, { now: FIXED_NOW });
  try {
    const roadmapPath = join(FIXTURE, ROADMAP_RELATIVE_PATH);
    assert.equal(result.roadmapPath, resolve(roadmapPath));
    assert.ok(existsSync(roadmapPath), "roadmap.json was not written alongside the snapshot");
    const onDisk = JSON.parse(readFileSync(roadmapPath, "utf8"));
    assert.deepEqual(onDisk, result.roadmap);
  } finally {
    rmSync(join(FIXTURE, ".aiw"), { recursive: true, force: true });
  }
});

test("buildSnapshot enriches latest_history_items from logs/<id>/summary.md", () => {
  const snapshot = buildSnapshot(FIXTURE, { now: FIXED_NOW });
  const items = snapshot.latest_history_items;
  assert.ok(Array.isArray(items), "latest_history_items should be an array");
  // One entry per logs/<id>/ folder, ascending (directory) order: 000, 005, 006.
  assert.deepEqual(items.map((i) => i.id), [
    "000-done-objective",
    "005-shipped-objective",
    "006-abandoned-objective"
  ]);
  for (const item of items) {
    assert.equal(item.type, "RUN");
    assert.equal(typeof item.summary, "string");
    assert.ok(item.summary.length > 0, "each history item needs a non-empty summary");
    assert.ok(Array.isArray(item.source_refs) && item.source_refs.length === 1);
  }

  // A run whose summary.md carries the labelled fields → they are parsed honestly.
  const shipped = items.find((i) => i.id === "005-shipped-objective");
  assert.equal(shipped.state, "APPROVED");
  assert.equal(shipped.rounds, 1);
  assert.equal(shipped.timestamp, "2026-07-08T09:15:00.000Z");
  assert.deepEqual(shipped.source_refs, ["logs/005-shipped-objective/summary.md"]);
  assert.match(shipped.summary, /Shipped/);

  const abandoned = items.find((i) => i.id === "006-abandoned-objective");
  assert.equal(abandoned.state, "REJECTED");
  assert.equal(abandoned.rounds, 3);
  assert.equal(abandoned.timestamp, "2026-07-09T18:40:00.000Z");

  // A run whose summary.md carries NO labelled fields → they are OMITTED, never faked.
  const done = items.find((i) => i.id === "000-done-objective");
  assert.ok(!("state" in done), "unparseable state must be omitted, not invented");
  assert.ok(!("rounds" in done), "unparseable rounds must be omitted, not invented");
  assert.ok(!("timestamp" in done), "unparseable timestamp must be omitted, not invented");
  assert.equal(done.summary, "Completed the done objective. This is the run-evidence summary the run drawer reads.");
});

test("a project with no run-evidence omits latest_history_items entirely (fail-soft)", () => {
  const dir = mkdtempSync(join(tmpdir(), "aiw-nohist-"));
  try {
    const snapshot = buildSnapshot(dir, { now: FIXED_NOW });
    assertConformsToSchema(snapshot);
    assert.ok(!("latest_history_items" in snapshot), "absent logs/ → no latest_history_items key");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("current_status_summary surfaces the last run's state when there are no pending objectives", () => {
  const dir = mkdtempSync(join(tmpdir(), "aiw-lastrun-"));
  try {
    const runDir = join(dir, "logs", "010-final-run");
    mkdirSync(runDir, { recursive: true });
    writeFileSync(
      join(runDir, "summary.md"),
      "# Run summary: 010-final-run\n\n- State: APPROVED\n- Rounds: 2\n\nWrapped up cleanly.\n",
      "utf8"
    );
    const snapshot = buildSnapshot(dir, { now: FIXED_NOW });
    assert.equal(snapshot.operational_status, "idle"); // no pending objectives
    assert.equal(snapshot.current_status_summary, "No pending objectives; last recorded run 010-final-run (APPROVED).");
    assert.deepEqual(snapshot.latest_history_items.map((i) => i.id), ["010-final-run"]);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("the resolved snapshot path is always inside the project root's .aiw/", () => {
  const dir = mkdtempSync(join(tmpdir(), "aiw-path-"));
  try {
    const { aiwDir, outPath } = resolveSnapshotPath(dir);
    assert.equal(aiwDir, resolve(dir, ".aiw"));
    assert.ok(
      outPath === aiwDir || outPath.startsWith(aiwDir + sep),
      `resolved output ${outPath} escapes ${aiwDir}`
    );
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
