// RUN-CONSOLE-REPORTS-SURFACE-001 — the QA fixture projects, pinned.
//
// The human QA packet of this run is executed against tests/fixtures/reports-qa, a project root
// that HAS reports, and tests/fixtures/reports-empty, one whose index is readable and lists
// nothing. They exist because no repository in this workspace has emitted a single report yet:
// without them the packet could only ever exercise the absence path, and the operator would be
// signing off a surface they had never seen carry a report.
//
// TWO THINGS ARE PINNED HERE, and both are about the fixture staying honest:
//
//   1. The four cases inside reports-qa are BYTE-IDENTICAL copies of the four in
//      tests/fixtures/reports/. A copy that drifts from its original turns the QA packet into a
//      pass over a file nobody else judges.
//   2. The emitted index still describes what is on disk. It was written by the real projector;
//      if someone adds or removes a report folder without re-emitting, the packet's steps stop
//      matching the screen and this test says so before the operator does.

import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const CASES = join(HERE, "fixtures", "reports");
const VOLUME = join(HERE, "fixtures", "reports-volume", "CASO-2-volumen-28.report.json");
const QA_ROOT = join(HERE, "fixtures", "reports-qa");
const EMPTY_ROOT = join(HERE, "fixtures", "reports-empty");
const QA_REPORTS = join(QA_ROOT, "reports");

const COPIES = [
  ["CASO-1-audit-contenido.report.json", "RUN-QA-REPORT-AUDIT-001"],
  ["CASO-2-development.report.json", "RUN-QA-REPORT-DEVELOPMENT-001"],
  ["CASO-3-creacion-leccion.report.json", "RUN-QA-REPORT-LESSON-001"],
  ["CASO-4-sin-qa.report.json", "RUN-QA-REPORT-MECHANICAL-001"]
];

test("the QA project's four reports are the four real cases, byte for byte", () => {
  for (const [file, runId] of COPIES) {
    const original = readFileSync(join(CASES, file));
    const copy = readFileSync(join(QA_REPORTS, runId, "report.json"));
    assert.ok(original.equals(copy), `${runId} has drifted from ${file}`);
  }
  // And the fifth is the volume fixture, also unchanged.
  assert.ok(readFileSync(VOLUME).equals(readFileSync(join(QA_REPORTS, "RUN-QA-REPORT-VOLUME-001", "report.json"))));
});

test("every run of the QA roadmap is one of the states the surface must tell apart, and every folder belongs to a run", () => {
  const roadmap = JSON.parse(readFileSync(join(QA_ROOT, "roadmap", "roadmap.json"), "utf8"));
  const runIds = roadmap.objectives
    .flatMap((objective) => objective.phases)
    .flatMap((phase) => phase.runs)
    .map((run) => run.run_id);
  assert.equal(runIds.length, 8, "one run per state, plus the four cases and the volume one");
  // Nothing under reports/ belongs to a run the roadmap does not carry: an orphan folder would
  // be a report the QA packet could never reach, since the only way in is the run.
  for (const entry of readdirSync(QA_REPORTS)) {
    assert.ok(runIds.includes(entry), `reports/${entry} belongs to no run of this roadmap`);
  }
  // The three states that need no folder, or an incomplete one.
  assert.ok(!existsSync(join(QA_REPORTS, "RUN-QA-REPORT-ABSENT-001")), "the never-emitted case has a folder");
  assert.ok(!existsSync(join(QA_REPORTS, "RUN-QA-REPORT-EMPTY-001", "report.json")), "the started-emission case has a report");
  assert.throws(() => JSON.parse(readFileSync(join(QA_REPORTS, "RUN-QA-REPORT-BROKEN-001", "report.json"), "utf8")),
    "the unparseable case parses");
});

test("the emitted index still describes what is on disk — six indexed, one unreadable, one filed empty", () => {
  const index = JSON.parse(readFileSync(join(QA_ROOT, ".project", "reports_index.json"), "utf8"));
  const source = index.reports_source;
  assert.equal(source.directory_present, true);
  assert.equal(source.run_directories, 7);
  assert.equal(source.indexed, 6);
  assert.equal(source.unreadable, 1);
  assert.deepEqual(source.unresolved, [{ path: "reports/RUN-QA-REPORT-EMPTY-001", reason: "no report.json" }]);
  // Measured against the disk, not against itself: every indexed entry resolves, and every
  // folder holding a report.json is indexed.
  for (const entry of index.reports) {
    assert.ok(existsSync(join(QA_ROOT, entry.report_path)), `indexed but absent: ${entry.report_path}`);
    assert.equal(entry.verdict_present, false, "no verdict is written by this run — that is #54");
  }
  const onDisk = readdirSync(QA_REPORTS).filter((name) =>
    statSync(join(QA_REPORTS, name)).isDirectory() && existsSync(join(QA_REPORTS, name, "report.json")));
  assert.deepEqual(index.reports.map((entry) => entry.run_id).sort(), onDisk.sort(),
    "the index and the folder disagree — re-emit the fixture");
});

test("no verdict.json exists anywhere in the fixtures: this run leaves the verdict visible and unwritten", () => {
  // Criterion 5, pinned where it can actually be checked. The surface prepares a verdict and
  // downloads it to the operator's machine; writing one into a repository is #54, and a stray
  // fixture verdict would make the aggregation's "already signed" branch look implemented.
  const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)]);
  for (const root of [QA_ROOT, EMPTY_ROOT, CASES]) {
    for (const file of walk(root)) {
      assert.ok(!file.endsWith("verdict.json"), `a verdict is filed on disk: ${file}`);
    }
  }
});

test("the empty-index fixture is honestly empty: the index is there, readable, and lists nothing", () => {
  const index = JSON.parse(readFileSync(join(EMPTY_ROOT, ".project", "reports_index.json"), "utf8"));
  assert.deepEqual(index.reports, []);
  assert.equal(index.reports_source.directory_present, false);
  assert.ok(!existsSync(join(EMPTY_ROOT, "reports")), "the fixture grew a reports folder");
});

test("the QA registry points at the fixtures and at the real projects, and never replaces the operator's own", () => {
  const registry = JSON.parse(readFileSync(join(QA_ROOT, "projects.json"), "utf8"));
  const keys = registry.projects.map((entry) => entry.key);
  assert.ok(keys.includes("reports-qa"), "the QA project is not registered");
  assert.ok(keys.includes("reports-empty"), "the empty-index project is not registered");
  // Roots are resolved relative to the registry FILE, the way the server resolves them.
  for (const entry of registry.projects) {
    const root = resolve(QA_ROOT, entry.root);
    if (entry.key === "reports-qa" || entry.key === "reports-empty") {
      assert.ok(existsSync(join(root, ".project", "snapshot.json")), `${entry.key}: ${root} is not an emitted project root`);
    }
  }
  // It is a SEPARATE file: the packet is run with PC_REGISTRY pointed at it, so an operator who
  // runs QA does not come back to a console with fixture projects in their sidebar.
  const real = JSON.parse(readFileSync(join(HERE, "..", "project-console", "projects.json"), "utf8"));
  const realKeys = real.projects.map((entry) => entry.key);
  assert.ok(!realKeys.includes("reports-qa"), "a fixture project leaked into the real registry");
  assert.ok(!realKeys.includes("reports-empty"), "a fixture project leaked into the real registry");
});
