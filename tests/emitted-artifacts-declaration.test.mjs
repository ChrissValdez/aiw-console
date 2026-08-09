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
import { makeRealLikeProject } from "./helpers/real-like-project.mjs";

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
    // Git and no governance files either, so four artifacts is the whole truth about it —
    // the declaration narrows to what happened, never to what the emitter can write in general.
    //
    // `reports_index` is in that four for a DIFFERENT reason than the other three, and the
    // difference is the point of listing names here instead of counting (O4.P17). The others are
    // present because this root has the source each derives from; the reports index is present
    // because it is UNCONDITIONAL — this fixture has no `reports/` at all, and what landed is a
    // declared empty index (§20), not an artifact that found something to say. An artifact that
    // is never skipped still has to be declared, and this is where that is proved.
    assert.deepEqual(paths.sort(), [
      `${PROJECT_DIR}/docs_index.json`,
      `${PROJECT_DIR}/reports_index.json`,
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
// neighbour's artifact count: a project that stops keeping a governance file emits one fewer,
// and the pin would break here for a reason that has nothing to do with the declaration being
// correct. That the REAL projects' declarations still resolve on disk is checked in
// tests/real-projects-smoke.test.mjs, without a count.
const FROZEN = [AIW_CONSOLE_FIXTURE, CANTU_FIXTURE];

test("both frozen projects declare six artifacts, and all six are on disk", () => {
  for (const root of FROZEN) {
    const snapshot = JSON.parse(readFileSync(join(root, ".project", "snapshot.json"), "utf8"));
    const declared = snapshot.emitted_artifacts;
    assert.ok(Array.isArray(declared), `${root} transports no declaration`);
    // SIX, AND IT STAYS AT SIX — the seventh artifact of O4.P17 did not move this number and
    // must not. These two `.project/` folders were FROZEN ON 2026-07-30 and nothing in the suite
    // regenerates them (tests/helpers/neighbours.mjs), so what is counted here is a July emission
    // recorded in July. Raising it to seven would assert that that emission wrote a file which
    // did not exist yet, which is false about the only thing this line can see.
    //
    // WHAT THIS PIN THEREFORE DOES NOT COVER, measured and not deduced: with seven artifacts live
    // in the emitter, this assertion stayed green. A pin over frozen data cannot notice the live
    // set growing, so it never guarded the live set — the guarantee people read into it was not
    // here. It is in the test immediately below, which emits and then counts.
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

// THE LIVE COUNT (O4.P17). New, not restored: the pin above counts July, and the set it counts
// cannot grow, so nothing in this suite ever asserted the size of the set an emission writes
// TODAY. That gap was invisible for exactly as long as the two numbers happened to agree.
//
// This test closes it the only way a count can be honest — it EMITS, then reads the declaration
// out of the file that emission wrote. The root is a disposable copy of this repository, which is
// the one fixture that carries every source a full emission consumes, so the number below is the
// whole set and not a subset. When the eighth artifact arrives, this line goes red and the pin
// above does not; that asymmetry is the point of having both.
test("a LIVE full emission declares SEVEN artifacts, and every one of them is on disk", () => {
  const project = makeRealLikeProject("declared-live-seven-");
  try {
    const result = writeProjectFolder(project.root, { now: FIXED_NOW });
    const snapshot = JSON.parse(readFileSync(join(project.root, PROJECT_SNAPSHOT_RELATIVE_PATH), "utf8"));
    const declared = snapshot.emitted_artifacts;

    assert.equal(declared.length, 7, `declared: ${declared.map((entry) => entry.artifact).join(", ")}`);
    assert.equal(result.files.length, declared.length, "the write log and the declaration count the same emission");
    // The names, not just the size: a count cannot tell a renamed artifact from the same set.
    assert.deepEqual(declared.map((entry) => entry.artifact).sort(), [
      "docs_index", "git_history", "guardrails", "no_claims", "reports_index", "roadmap", "snapshot"
    ]);
    for (const entry of declared) {
      assert.ok(existsSync(join(project.root, entry.path)), `declared but absent: ${entry.path}`);
    }
    // And the seventh is there on a root with NO `reports/` — the unconditional artifact is part
    // of the live set whether or not the project has filed a report (§20).
    assert.equal(existsSync(join(project.root, "reports")), false, "the copy carries no reports/ — see COPIED");
    assert.ok(declared.some((entry) => entry.path === `${PROJECT_DIR}/reports_index.json`));
  } finally {
    project.cleanup();
  }
});
