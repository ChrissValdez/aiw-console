// O4.P17 — `.project/reports_index.json`, the SEVENTH artifact.
//
// Run reports are AUTHORED and live at <repo>/reports/<run_id>/report.json. This index is the
// derived half of the same authored-source-plus-derived-index pattern `docs/` already uses, on
// the per-project axis: it enumerates a folder OF THIS REPOSITORY and says nothing about any
// other project.
//
// WHAT IS PINNED HERE, and why each one is a separate test rather than a field check:
//
//   - the artifact is UNCONDITIONAL. A root with no `reports/` emits a declared empty index
//     (§20), never one file fewer. Every other optional artifact of this folder behaves the
//     opposite way, so this is the invariant most likely to be "simplified" away later.
//   - a `report.json` that does not parse is INDEXED ANYWAY, annotated. Dropping it would be
//     this index deciding a report does not exist because it could not read it.
//   - `run_id` comes from the FOLDER NAME, never from inside the file — the only identity that
//     survives the case above.
//   - NO CONTRACT VALIDATION. This run indexes what exists; whether a report satisfies the
//     report contract is not a question asked here, and a report that parses but says nothing
//     recognisable still gets an entry.
//
// Own fixtures throughout: `reports/` is deliberately NOT part of COPIED in
// tests/helpers/real-like-project.mjs (this repository has none to copy), so the populated case
// cannot come from the real-like copy and is built here instead.
//
// Read-only against Git; writes only into temp dirs.
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import {
  GENERATED_FROM,
  PROJECT_DIR,
  PROJECT_REPORTS_INDEX_RELATIVE_PATH,
  ROADMAP_TREE_MODEL,
  ROADMAP_TREE_SOURCE_PATH,
  SCHEMA_VERSION,
  buildReportsIndex,
  writeProjectFolder
} from "../tools/projector/project.mjs";
import { PROJECT_EMIT_ARTIFACT_PATHS } from "../project-console/serve.mjs";

const FIXED_NOW = "2026-08-09T00:00:00.000Z";

// A minimal roadmap_tree_v1 root, with no `reports/` unless a test files one.
function makeRoot() {
  const root = mkdtempSync(join(tmpdir(), "projector-reports-"));
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

// Files a report folder. `body` is written verbatim when it is a string, so a test can hand it
// something that is not JSON at all.
function fileReport(root, runId, body, { verdict = false } = {}) {
  const dir = join(root, "reports", runId);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "report.json"), typeof body === "string" ? body : JSON.stringify(body, null, 2), "utf8");
  if (verdict) writeFileSync(join(dir, "verdict.json"), JSON.stringify({ signed: true }), "utf8");
  return dir;
}

// ------------------------------------------------- the announced absence

test("a root with NO reports/ still emits the index: [] declared, never a missing file", () => {
  const root = makeRoot();
  try {
    const result = writeProjectFolder(root, { now: FIXED_NOW });

    // The artifact is on disk and in the write log — the emission did not get shorter.
    assert.ok(existsSync(join(root, PROJECT_REPORTS_INDEX_RELATIVE_PATH)));
    assert.ok(result.files.some((file) => file.artifact === "reports_index"));

    const index = JSON.parse(readFileSync(join(root, PROJECT_REPORTS_INDEX_RELATIVE_PATH), "utf8"));
    assert.deepEqual(index.reports, []);
    assert.equal(index.reports_source.directory_present, false);
    assert.equal(index.reports_source.run_directories, 0);
    assert.equal(index.reports_source.indexed, 0);
    // Nothing was read, so nothing is claimed as a source (§7 — no pointer that does not resolve).
    assert.deepEqual(index.sources, []);
    // An EMPTY LIST, not an absent key: `reports: []` states "none", where a missing `reports`
    // would leave a reader unable to tell "none" from "this emitter did not look".
    assert.ok("reports" in index);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("the empty index is declared by the snapshot like any other emitted artifact", () => {
  const root = makeRoot();
  try {
    writeProjectFolder(root, { now: FIXED_NOW });
    const snapshot = JSON.parse(readFileSync(join(root, PROJECT_DIR, "snapshot.json"), "utf8"));
    const declared = snapshot.emitted_artifacts.map((entry) => entry.path);
    assert.ok(declared.includes(`${PROJECT_DIR}/reports_index.json`),
      "an artifact that is always written must always be declared");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

// ------------------------------------------------- the populated case, own fixture

test("reports are indexed by folder name, sorted, with verdict presence measured on disk", () => {
  const root = makeRoot();
  try {
    fileReport(root, "RUN-BETA-002", { emitted_at: "2026-08-02T10:00:00Z" }, { verdict: true });
    fileReport(root, "RUN-ALFA-001", { emitted_at: "2026-08-01T09:00:00Z" });

    const index = buildReportsIndex(root, { now: FIXED_NOW });

    assert.equal(index.reports_source.directory_present, true);
    assert.equal(index.reports_source.run_directories, 2);
    assert.equal(index.reports_source.indexed, 2);
    assert.equal(index.reports_source.unreadable, 0);
    // Sorted by folder name — filing order is not index order.
    assert.deepEqual(index.reports.map((entry) => entry.run_id), ["RUN-ALFA-001", "RUN-BETA-002"]);
    assert.deepEqual(index.reports[0], {
      run_id: "RUN-ALFA-001",
      report_path: "reports/RUN-ALFA-001/report.json",
      emitted_at: "2026-08-01T09:00:00Z",
      verdict_present: false
    });
    assert.equal(index.reports[1].verdict_present, true, "verdict.json exists beside this one");
    assert.equal(index.reports[1].report_path, "reports/RUN-BETA-002/report.json");
    // Repo-relative POSIX, always — no backslash survives on any platform (§7).
    index.reports.forEach((entry) => assert.ok(!entry.report_path.includes("\\"), entry.report_path));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("the envelope and sources are the folder's own, and every report read is a source", () => {
  const root = makeRoot();
  try {
    fileReport(root, "RUN-ALFA-001", { emitted_at: "2026-08-01T09:00:00Z" });
    const index = buildReportsIndex(root, { now: FIXED_NOW });

    assert.equal(index.schema_version, SCHEMA_VERSION);
    assert.equal(index.project_id, "fixture_project");
    assert.equal(index.generated_at, FIXED_NOW);
    assert.equal(index.generated_from, GENERATED_FROM);
    // The folder AND the report: the folder's mtime moves when a run is filed or removed, so a
    // reader can detect a stale index from either kind of change (§6).
    assert.deepEqual(index.sources.map((source) => source.path), [
      "reports",
      "reports/RUN-ALFA-001/report.json"
    ]);
    index.sources.forEach((source) => assert.ok(typeof source.mtime === "string" && source.mtime));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

// ------------------------------------------------- the unreadable report, which is never dropped

test("a report.json that does not parse ENTERS the index, annotated — it is never omitted", () => {
  const root = makeRoot();
  try {
    fileReport(root, "RUN-GOOD-001", { emitted_at: "2026-08-01T09:00:00Z" });
    fileReport(root, "RUN-BROKEN-002", "{ this is not json ");

    const index = buildReportsIndex(root, { now: FIXED_NOW });

    assert.equal(index.reports.length, 2, "the broken one is still a filed report");
    assert.equal(index.reports_source.unreadable, 1);
    assert.equal(index.reports_source.indexed, 2, "`indexed` counts entries, and the broken one is an entry");

    const broken = index.reports.find((entry) => entry.run_id === "RUN-BROKEN-002");
    assert.ok(broken, "a report that cannot be read is exactly the one a reader must be told about");
    assert.equal(broken.report_path, "reports/RUN-BROKEN-002/report.json");
    assert.equal(typeof broken.read_error, "string");
    assert.ok(broken.read_error.length > 0, "the reason travels, not just the fact");
    assert.equal(broken.verdict_present, false, "verdict presence is a disk fact and survives a bad parse");
    // No `emitted_at` invented for it: the file could not be read, so there is nothing to quote.
    assert.equal("emitted_at" in broken, false);
    // And the readable one is untouched by its neighbour's failure.
    assert.equal("read_error" in index.reports.find((entry) => entry.run_id === "RUN-GOOD-001"), false);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("a report with no emitted_at OMITS the key — no mtime is substituted for it", () => {
  const root = makeRoot();
  try {
    fileReport(root, "RUN-QUIET-001", { run_id: "RUN-QUIET-001", verdict: "none" });
    const index = buildReportsIndex(root, { now: FIXED_NOW });
    const entry = index.reports[0];

    assert.equal("emitted_at" in entry, false,
      "an mtime is a fact about the disk; publishing it as emitted_at would answer for the report");
    // The mtime is not lost — `sources` carries it, which is where a disk fact belongs.
    assert.equal(index.sources.length, 2);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("run_id is the FOLDER's name, even when the report claims a different one inside", () => {
  const root = makeRoot();
  try {
    fileReport(root, "RUN-FOLDER-001", { run_id: "RUN-SOMETHING-ELSE-999", emitted_at: "2026-08-01T09:00:00Z" });
    const index = buildReportsIndex(root, { now: FIXED_NOW });

    // `reports/<run_id>/` is what the location MEANS. A field inside the file is a claim the
    // file makes about itself, and it is not what filed the report where it is.
    assert.equal(index.reports[0].run_id, "RUN-FOLDER-001");
    assert.equal(index.reports[0].report_path, "reports/RUN-FOLDER-001/report.json");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

// ------------------------------------------------- what is NOT a report, declared

test("a run folder with no report.json, and a loose file under reports/, are declared unresolved", () => {
  const root = makeRoot();
  try {
    fileReport(root, "RUN-REAL-001", { emitted_at: "2026-08-01T09:00:00Z" });
    mkdirSync(join(root, "reports", "RUN-EMPTY-002"), { recursive: true });
    writeFileSync(join(root, "reports", "README.md"), "# not a report\n", "utf8");

    const index = buildReportsIndex(root, { now: FIXED_NOW });

    assert.deepEqual(index.reports.map((entry) => entry.run_id), ["RUN-REAL-001"]);
    // Neither produces an entry — neither is a report — but neither is silent either (§20).
    assert.deepEqual(index.reports_source.unresolved.slice().sort((a, b) => (a.path < b.path ? -1 : 1)), [
      { path: "reports/README.md", reason: "not a run directory" },
      { path: "reports/RUN-EMPTY-002", reason: "no report.json" }
    ]);
    // A folder with no report.json still counts as a run directory: it exists, it just has
    // nothing filed in it. `run_directories` and `indexed` disagreeing is the visible symptom.
    assert.equal(index.reports_source.run_directories, 2);
    assert.equal(index.reports_source.indexed, 1);
    // The loose file is not a source of this index: nothing was read from it.
    assert.ok(!index.sources.some((source) => source.path.endsWith("README.md")));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

// ------------------------------------------------- the boundary of this run

test("this index does NOT validate a report against the report contract, and says so", () => {
  const root = makeRoot();
  try {
    // Parses as JSON, and is nonsense as a report: no run_id, no sections, wrong type for a
    // field a contract would care about. It indexes exactly like a good one.
    fileReport(root, "RUN-NONSENSE-001", { emitted_at: 42, sections: "not a list", stray: true });
    const index = buildReportsIndex(root, { now: FIXED_NOW });

    assert.equal(index.reports.length, 1);
    assert.equal(index.reports[0].run_id, "RUN-NONSENSE-001");
    assert.equal("read_error" in index.reports[0], false, "it parsed, so there is no read error");
    // `emitted_at` is quoted only when it is a string — a number is not an instant this index
    // can republish, and coercing it would be inventing the report's own statement.
    assert.equal("emitted_at" in index.reports[0], false);
    // Declared IN the artifact, so a reader never has to ask whether an entry means "valid".
    assert.equal(index.reports_source.validation_policy,
      "This index does not validate a report against the report contract.");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("the index is written inside .project/ and re-emits byte-identical under the same clock", () => {
  const root = makeRoot();
  try {
    fileReport(root, "RUN-ALFA-001", { emitted_at: "2026-08-01T09:00:00Z" }, { verdict: true });

    writeProjectFolder(root, { now: FIXED_NOW });
    const first = readFileSync(join(root, PROJECT_REPORTS_INDEX_RELATIVE_PATH), "utf8");
    writeProjectFolder(root, { now: FIXED_NOW });
    const second = readFileSync(join(root, PROJECT_REPORTS_INDEX_RELATIVE_PATH), "utf8");

    assert.equal(second, first, "same inputs and same clock must give the same bytes");
    assert.ok(first.endsWith("\n"));
    assert.equal(existsSync(join(root, `${PROJECT_REPORTS_INDEX_RELATIVE_PATH}.tmp`)), false);
    // The route constant is the only place the destination is spelled, and it is inside the
    // contract folder — nothing here can write anywhere else (CONTRATO §1.a).
    assert.equal(PROJECT_REPORTS_INDEX_RELATIVE_PATH.split(/[\\/]/)[0], PROJECT_DIR);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

// ------------------------------------------------- the guard's list, against the emission

// THE HOLE THIS CLOSES, measured during O4.P17. `PROJECT_EMIT_ARTIFACT_PATHS` is what the write
// route's boundary guard checks BEFORE the emitter runs. Removing the seventh entry from it
// broke no test: the emitter carries its own `resolveInsideProject`, so the file was still
// written — it simply stopped being pre-checked, and the guard's "on all destinations" claim
// became false in silence. A list that is supposed to mirror the emission was mirroring nothing.
//
// So it is asserted against a real emission rather than against a number: whatever
// `writeProjectFolder` writes must appear in the guard's list, and the guard must name no
// artifact the emitter cannot produce. The eighth artifact will fail this line on the day it is
// added to one side and not the other.
test("the boundary guard's destination list covers exactly what an emission can write", () => {
  const root = makeRoot();
  try {
    fileReport(root, "RUN-ALFA-001", { emitted_at: "2026-08-01T09:00:00Z" });
    const result = writeProjectFolder(root, { now: FIXED_NOW });

    const guarded = PROJECT_EMIT_ARTIFACT_PATHS.map(([artifact]) => artifact);
    for (const file of result.files) {
      assert.ok(guarded.includes(file.artifact),
        `the emission wrote ${file.artifact}, which the boundary guard never checked`);
    }
    // The snapshot is written by the same emission and is the one required artifact (§8).
    assert.ok(guarded.includes("snapshot"));
    assert.ok(guarded.includes("reports_index"));
    // And the guard's paths are the projector's own constants, not a second spelling of them.
    const guardedPaths = PROJECT_EMIT_ARTIFACT_PATHS.map(([, path]) => path.split(/[\\/]/).join("/"));
    assert.ok(guardedPaths.includes(`${PROJECT_DIR}/reports_index.json`));
    assert.equal(new Set(guarded).size, guarded.length, "no artifact is listed twice");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
