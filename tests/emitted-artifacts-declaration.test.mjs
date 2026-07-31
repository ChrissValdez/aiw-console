// O4.P13 — the snapshot DECLARES which files of `.project/` an emission wrote.
//
// This is the emitter half of the banner fix. §6's `sources` says what an artifact was DERIVED
// FROM; nothing said what the emission PRODUCED, and without that a consumer cannot tell a
// promised file that went missing (a real absence, §20 announces it) from a file this project
// never emits (§18 — not an absence at all). The declaration is what makes those two different
// questions answerable, and it is built from what was actually written, never from a list.
//
// Read-only against Git; writes only into temp dirs.
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import {
  PROJECT_DIR,
  PROJECT_SNAPSHOT_RELATIVE_PATH,
  ROADMAP_TREE_MODEL,
  ROADMAP_TREE_SOURCE_PATH,
  buildRoadmapTreeSnapshot,
  writeProjectFolder
} from "../tools/projector/project.mjs";
import { AIW_CONSOLE_FIXTURE, CANTU_FIXTURE } from "./helpers/neighbours.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const FIXED_NOW = "2026-07-27T00:00:00.000Z";

// A minimal roadmap_tree_v1 root in a temp dir — not a Git work tree, so the emission has one
// fewer artifact to write, which is exactly the case the declaration has to get right.
function makeTreeRoot() {
  const root = mkdtempSync(join(tmpdir(), "projector-declared-"));
  mkdirSync(join(root, "roadmap"), { recursive: true });
  writeFileSync(
    join(root, ROADMAP_TREE_SOURCE_PATH),
    JSON.stringify({
      schema_version: ROADMAP_TREE_MODEL,
      roadmap_id: "roadmap",
      title: "Fixture Roadmap",
      objectives: [{
        objective_id: "OA",
        title: "Objective A",
        phases: [{
          phase_id: "OA.P1",
          title: "Phase",
          runs: [{ run_id: "RUN-FIXTURE-ONE-001", queue_order: 1, title: "One", summary: "s", full_description: "d", status: "active", depends_on: [] }]
        }]
      }]
    }, null, 2),
    "utf8"
  );
  writeFileSync(join(root, "package.json"), JSON.stringify({ name: "fixture-project" }), "utf8");
  writeFileSync(join(root, "README.md"), "# Fixture Readme\n", "utf8");
  return root;
}

test("the declaration is exactly the set of files the emission wrote — measured, not listed", () => {
  const root = makeTreeRoot();
  try {
    const result = writeProjectFolder(root, { now: FIXED_NOW });
    const snapshot = JSON.parse(readFileSync(join(root, PROJECT_SNAPSHOT_RELATIVE_PATH), "utf8"));

    const declared = snapshot.emitted_artifacts.map((entry) => entry.path).sort();
    const written = result.files.map((file) => file.relative_path).sort();
    assert.deepEqual(declared, written, "the declaration and the write log disagree");

    // Every declared path resolves on disk (§7 — no broken pointers), and lives in `.project/`.
    for (const entry of snapshot.emitted_artifacts) {
      assert.ok(existsSync(join(root, entry.path)), `declared but absent: ${entry.path}`);
      assert.ok(entry.path.startsWith(`${PROJECT_DIR}/`), `declared outside the folder: ${entry.path}`);
      assert.equal(typeof entry.artifact, "string");
    }
    // The snapshot declares itself, and the write log agrees it was written.
    assert.ok(declared.includes(PROJECT_SNAPSHOT_RELATIVE_PATH.split("\\").join("/")));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("a root with no Git repository declares no git_history — an absence nobody should announce", () => {
  const root = makeTreeRoot();
  try {
    writeProjectFolder(root, { now: FIXED_NOW });
    const snapshot = JSON.parse(readFileSync(join(root, PROJECT_SNAPSHOT_RELATIVE_PATH), "utf8"));
    const paths = snapshot.emitted_artifacts.map((entry) => entry.path);
    assert.ok(!paths.some((path) => path.endsWith("git_history.json")),
      "a file that was never written is being declared as emitted");
    assert.equal(existsSync(join(root, PROJECT_DIR, "git_history.json")), false);
    // What IS declared is what this root could produce, and nothing more. This fixture has no
    // Git and no governance files either, so three artifacts is the whole truth about it —
    // the declaration narrows to what happened, never to what the emitter can write in general.
    assert.deepEqual(paths.sort(), [
      `${PROJECT_DIR}/docs_index.json`,
      `${PROJECT_DIR}/roadmap.json`,
      `${PROJECT_DIR}/snapshot.json`
    ]);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("built standalone, the snapshot OMITS the key rather than claiming to emit nothing", () => {
  const root = makeTreeRoot();
  try {
    const snapshot = buildRoadmapTreeSnapshot(root, { now: FIXED_NOW });
    assert.ok(!("emitted_artifacts" in snapshot),
      "a snapshot built outside a folder emission has no honest answer and must stay silent");
    // An empty list would be a CLAIM ("this project emits nothing"), which is why it is omitted.
    assert.notDeepEqual(snapshot.emitted_artifacts, []);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("the declaration is additive: everything the snapshot carried before is still there", () => {
  const root = makeTreeRoot();
  try {
    writeProjectFolder(root, { now: FIXED_NOW });
    const snapshot = JSON.parse(readFileSync(join(root, PROJECT_SNAPSHOT_RELATIVE_PATH), "utf8"));
    for (const key of [
      "schema_version", "project_id", "generated_at", "generated_from", "sources",
      "operational_status", "project_summary", "current_status_summary", "roadmap_tree",
      "blockers", "followups", "no_claims_summary", "validation_summary", "taxonomy_model"
    ]) {
      assert.ok(key in snapshot, `the required/known key ${key} disappeared`);
    }
    // `sources` still means INPUTS, and none of them is an emitted artifact of this folder.
    for (const source of snapshot.sources) {
      assert.ok(!source.path.startsWith(`${PROJECT_DIR}/`), `sources now lists an emitted file: ${source.path}`);
    }
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

// The two FROZEN emitted folders (tests/helpers/neighbours.mjs). Read live, this test asserted a
// neighbour's artifact count: a project that stops keeping governance files emits five, and the
// pin would break here for a reason that has nothing to do with the declaration being correct.
// That the REAL projects' declarations still resolve on disk is checked in
// tests/real-projects-smoke.test.mjs, without a count.
const FROZEN = [AIW_CONSOLE_FIXTURE, CANTU_FIXTURE];

test("both frozen projects declare six artifacts, and all six are on disk", () => {
  for (const root of FROZEN) {
    const snapshot = JSON.parse(readFileSync(join(root, ".project", "snapshot.json"), "utf8"));
    const declared = snapshot.emitted_artifacts;
    assert.ok(Array.isArray(declared), `${root} transports no declaration`);
    assert.equal(declared.length, 6);
    for (const entry of declared) {
      assert.ok(existsSync(join(root, entry.path)), `${root}: declared but absent: ${entry.path}`);
    }
    // The nine routes of §18.a are NOT declared — they have no emitter, so they are not absences.
    const names = declared.map((entry) => entry.path);
    for (const never of ["project.json", "state/project_status.json", "ledgers/change_ledger.jsonl", "guardrails/project_memory.jsonl"]) {
      assert.ok(!names.some((path) => path.endsWith(never)), `${root} declares a file no emitter writes: ${never}`);
    }
  }
});
