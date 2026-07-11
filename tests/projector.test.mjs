// Fixture-based tests for the AIW projector (tools/projector/project.mjs).
//
// They assert that buildSnapshot() emits every key required by docs/snapshot-schema-v1.md
// with the right type, that writeSnapshot() lands the artifact at the canonical path
// <root>/.aiw/views/project_console.snapshot.json and never outside .aiw/, and that an empty
// project still produces a schema-conforming snapshot (fail-soft, never an error).
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { dirname, join, resolve, sep } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import {
  GENERATED_FROM,
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
  assert.deepEqual(counts, { pending: 2, parked: 1, processed: 1, total: 4 });
  assert.equal(objectives.length, 4);
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
