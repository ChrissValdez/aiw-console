// RUN-CONSOLE-REPORTS-SURFACE-001 — THE MOUNT, judged on its own.
//
// The renderer of #52 is domain-blind and its suite proves it mechanically. Mounting it is
// exactly where that property could be lost without anyone noticing, because the mounting code
// was not covered by anything. So the mount is one file plus one stylesheet
// (project-console/assets/run-report-surface.{js,css}), and the FIRST test below is the same
// mechanical veto of criterion 4 pointed at them. It caught this file's own author on the first
// run, which is what a working veto does.
//
// The rest reads the model out of a REAL emitted index — the one the projector wrote for
// tests/fixtures/reports-qa, a fixture project that actually has reports — rather than a shape
// typed here by hand. What the surface reads is what an emitter writes.

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const SURFACE_JS = join(REPO_ROOT, "project-console", "assets", "run-report-surface.js");
const SURFACE_CSS = join(REPO_ROOT, "project-console", "assets", "run-report-surface.css");
const RENDERER_JS = join(REPO_ROOT, "project-console", "assets", "run-report-renderer.js");
const FIXTURES = join(HERE, "fixtures", "reports");
const QA_ROOT = join(HERE, "fixtures", "reports-qa");
const QA_INDEX = JSON.parse(readFileSync(join(QA_ROOT, ".project", "reports_index.json"), "utf8"));
const VOLUME_PATH = join(HERE, "fixtures", "reports-volume", "CASO-2-volumen-28.report.json");

// The mount in a bare context: no DOM, no fetch. Every browser facility it touches is guarded,
// so the pure half must load and answer headless.
function loadSurface() {
  const sandbox = { console };
  vm.createContext(sandbox);
  vm.runInContext(readFileSync(SURFACE_JS, "utf8"), sandbox, { filename: SURFACE_JS });
  return sandbox;
}

// ---------------------------------------------------------------------------
// Criterion 4, extended to the mount — the rule that governs every other one.
// ---------------------------------------------------------------------------

function domainTokens(report) {
  const tokens = [];
  const push = (value) => { if (typeof value === "string" && value.trim()) tokens.push(value.trim()); };
  push(report.project); push(report.run_id); push(report.run_title); push(report.profile);
  push(report.emitted_by);
  Object.keys(report.counts || {}).forEach(push);
  (report.locations || []).forEach((loc) => { push(loc.label); push(loc.path); });
  (Array.isArray(report.items) ? report.items : []).forEach((item) => {
    if (item.subject) {
      push(item.subject.id); push(item.subject.label);
      (item.subject.previews || []).forEach((p) => { push(p.label); push(p.target); push(p.path); });
    }
    if (item.location) push(item.location.path);
  });
  return tokens;
}

function vetoedNeedles() {
  const reports = readdirSync(FIXTURES)
    .filter((name) => name.endsWith(".report.json"))
    .map((name) => JSON.parse(readFileSync(join(FIXTURES, name), "utf8")));
  const needles = [...new Set(reports.flatMap(domainTokens))]
    .filter((token) => token.length >= 4)
    .map((token) => token.toLowerCase());
  needles.push("christopher", "valdez", "cantu");
  return needles;
}

test("criterion 4 survives the mount: not one word of any fixture's domain appears in the mounting code", () => {
  const needles = vetoedNeedles();
  // The same 94 the renderer is judged against, derived the same way from the same four cases.
  assert.equal(needles.length, 94, "the veto is the one #52 measured, not a smaller one");
  for (const path of [SURFACE_JS, SURFACE_CSS]) {
    const haystack = readFileSync(path, "utf8").toLowerCase();
    for (const needle of needles) {
      assert.ok(!haystack.includes(needle),
        path + " contains the domain token " + JSON.stringify(needle) + " — mounting must not teach the console a domain");
    }
  }
});

test("the mount never reads a report: the bytes go from the fetch to the renderer untouched", () => {
  const source = readFileSync(SURFACE_JS, "utf8");
  // Parsing a report is where a mount would start knowing its fields. This one does not: the
  // only JSON it ever handles is the INDEX, which the console hands it already parsed.
  assert.ok(!/JSON\.parse/.test(source), "the mount parses nothing");
  // What it hands to the renderer is the response BODY as text, never a derived object.
  assert.ok(/response\.text\(\)/.test(source), "the report travels as text");
  assert.ok(!/response\.json\(\)/.test(source), "the report is never deserialised on the way through");
  // And it reads only the index's own field names — never a report's.
  for (const reportField of ["items", "self_decisions", "blind_spots", "counts", "locations", "gate", "subject", "verdict_options"]) {
    assert.ok(!source.includes(`.${reportField}`), `the mount reaches into a report field: ${reportField}`);
  }
});

// ---------------------------------------------------------------------------
// The index model: five states, because the index distinguishes five.
// ---------------------------------------------------------------------------

test("a report that parsed is READY, and carries the path and the emission time the index measured", () => {
  const rrs = loadSurface();
  const model = rrs.reportsIndexModel(QA_INDEX);
  const info = rrs.reportStateForRun(model, "RUN-QA-REPORT-AUDIT-001");
  assert.equal(info.state, "ready");
  assert.equal(info.reportPath, "reports/RUN-QA-REPORT-AUDIT-001/report.json");
  assert.equal(info.emittedAt, "2026-08-08T22:40:00Z");
  assert.equal(info.verdictPresent, false);
});

test("a report that did NOT parse is its own state, keeps its entry and keeps the parser's message", () => {
  const rrs = loadSurface();
  const model = rrs.reportsIndexModel(QA_INDEX);
  const info = rrs.reportStateForRun(model, "RUN-QA-REPORT-BROKEN-001");
  assert.equal(info.state, "unreadable");
  assert.match(info.readError, /JSON/);
  // It still has somewhere to open from: the operator sees the parser's message, not a blank.
  assert.equal(info.reportPath, "reports/RUN-QA-REPORT-BROKEN-001/report.json");
});

test("a run folder with nothing filed in it is NOT the same absence as no folder at all", () => {
  const rrs = loadSurface();
  const model = rrs.reportsIndexModel(QA_INDEX);
  assert.equal(rrs.reportStateForRun(model, "RUN-QA-REPORT-EMPTY-001").state, "filed_empty");
  assert.equal(rrs.reportStateForRun(model, "RUN-QA-REPORT-ABSENT-001").state, "not_emitted");
});

test("no index is not an empty index: a run whose report nobody could look for says exactly that", () => {
  const rrs = loadSurface();
  for (const absent of [null, undefined, {}, { reports: "not an array" }]) {
    const model = rrs.reportsIndexModel(absent);
    assert.equal(model.available, false);
    assert.equal(rrs.reportStateForRun(model, "RUN-QA-REPORT-AUDIT-001").state, "index_unavailable");
  }
  // And an index that IS readable and lists nothing is available and empty — the other fact.
  const empty = rrs.reportsIndexModel({ reports: [], reports_source: { directory_present: false } });
  assert.equal(empty.available, true);
  assert.equal(empty.indexed, 0);
  assert.equal(rrs.reportStateForRun(empty, "RUN-QA-REPORT-AUDIT-001").state, "not_emitted");
});

test("the model is fed an identifier and nothing else, so there is no run field it can grow to read", () => {
  const rrs = loadSurface();
  const model = rrs.reportsIndexModel(QA_INDEX);
  // A run object is not an id: handing one over must not accidentally match anything.
  assert.equal(rrs.reportStateForRun(model, { run_id: "RUN-QA-REPORT-AUDIT-001" }).state, "not_emitted");
  assert.equal(rrs.reportStateForRun(model, "").state, "not_emitted");
});

// ---------------------------------------------------------------------------
// The section in the run detail — the ONE door, and the honest absences.
// ---------------------------------------------------------------------------

const INDEX_PATH = "projects/reports-qa/.project/reports_index.json";

test("a run WITH a report offers the way in, and says whether a verdict is already filed", () => {
  const rrs = loadSurface();
  const model = rrs.reportsIndexModel(QA_INDEX);
  const html = rrs.runReportSectionHtml(model, "RUN-QA-REPORT-AUDIT-001", { indexPath: INDEX_PATH });
  assert.match(html, /Run report/);
  assert.match(html, /data-run-report-open="RUN-QA-REPORT-AUDIT-001"/);
  assert.match(html, /no verdict yet/);
});

test("a run WITHOUT a report says so explicitly, names the index it was measured from, and offers no way in", () => {
  const rrs = loadSurface();
  const model = rrs.reportsIndexModel(QA_INDEX);
  const html = rrs.runReportSectionHtml(model, "RUN-QA-REPORT-ABSENT-001", { indexPath: INDEX_PATH });
  assert.match(html, /No report has been emitted for this run/);
  assert.ok(html.includes(INDEX_PATH), "the absence names the file it is measured from (§20)");
  assert.ok(!html.includes("data-run-report-open"), "there is nothing to open, so nothing offers to open it");
});

test("the three absences read differently, because they are three different facts", () => {
  const rrs = loadSurface();
  const model = rrs.reportsIndexModel(QA_INDEX);
  const absent = rrs.runReportSectionHtml(model, "RUN-QA-REPORT-ABSENT-001", { indexPath: INDEX_PATH });
  const empty = rrs.runReportSectionHtml(model, "RUN-QA-REPORT-EMPTY-001", { indexPath: INDEX_PATH });
  const noIndex = rrs.runReportSectionHtml(rrs.reportsIndexModel(null), "RUN-QA-REPORT-AUDIT-001", { indexPath: INDEX_PATH });
  assert.match(empty, /started emission/);
  assert.notEqual(absent, empty);
  assert.match(noIndex, /could not be read/);
  assert.ok(!noIndex.includes("data-run-report-open"), "an unreadable index cannot offer a report");
});

test("a report that does not parse still opens — the operator gets the parser's message, never a blank screen", () => {
  const rrs = loadSurface();
  const model = rrs.reportsIndexModel(QA_INDEX);
  const html = rrs.runReportSectionHtml(model, "RUN-QA-REPORT-BROKEN-001", { indexPath: INDEX_PATH });
  assert.match(html, /could not be parsed/);
  assert.match(html, /data-run-report-open="RUN-QA-REPORT-BROKEN-001"/);
});

test("the section escapes what it is given: an identifier is never HTML", () => {
  const rrs = loadSurface();
  const html = rrs.runReportSectionHtml(rrs.reportsIndexModel(QA_INDEX), '"><img src=x>', { indexPath: "<b>" });
  assert.ok(!html.includes("<img"), "the identifier reached the surface as markup");
  assert.ok(!html.includes("<b>"), "the index path reached the surface as markup");
});

// ---------------------------------------------------------------------------
// Across projects: aggregation, and the browser this run does NOT deliver.
// ---------------------------------------------------------------------------

test("pending across projects counts what is waiting for a person, and a missing index is not a zero", () => {
  const rrs = loadSurface();
  const summary = rrs.pendingVerdictAcrossProjects([
    { key: "reports-qa", label: "Reports QA", index: QA_INDEX },
    { key: "empty-one", label: "Empty One", index: { reports: [], reports_source: {} } },
    { key: "no-index", label: "No Index", index: null }
  ]);
  const byKey = new Map(summary.rows.map((row) => [row.key, row]));
  // Six indexed in the fixture, none of them signed.
  assert.equal(byKey.get("reports-qa").pending, 6);
  assert.equal(byKey.get("reports-qa").indexed, 6);
  assert.equal(byKey.get("reports-qa").unreadable, 1);
  assert.equal(byKey.get("empty-one").available, true);
  assert.equal(byKey.get("empty-one").pending, 0);
  assert.equal(byKey.get("no-index").available, false);
  assert.equal(summary.totals.pending, 6);
  assert.equal(summary.totals.projectsReporting, 2);
  assert.equal(summary.totals.projectsUnavailable, 1);
});

test("a verdict already filed beside a report stops counting as pending", () => {
  const rrs = loadSurface();
  const index = {
    reports: [
      { run_id: "A", report_path: "reports/A/report.json", verdict_present: true },
      { run_id: "B", report_path: "reports/B/report.json", verdict_present: false },
      { run_id: "C", report_path: "reports/C/report.json" }
    ],
    reports_source: {}
  };
  const model = rrs.reportsIndexModel(index);
  assert.equal(model.signed, 1);
  // C carries no measurement at all, and an unmeasured verdict is not a verdict.
  assert.equal(model.pending, 2);
});

test("the cross-project panel is a COUNT and never a way into a report: no run-report door on it", () => {
  const rrs = loadSurface();
  const html = rrs.pendingVerdictPanelHtml(rrs.pendingVerdictAcrossProjects([
    { key: "reports-qa", label: "Reports QA", index: QA_INDEX }
  ]));
  assert.match(html, /Awaiting a verdict/);
  assert.match(html, /reached from the run it belongs to/);
  // The prototype's global report browser is the thing this run does not ship. Nothing on this
  // panel opens a report, and no report path is even printed on it.
  assert.ok(!html.includes("data-run-report-open"), "the portfolio must not open reports");
  assert.ok(!html.includes("<a "), "no links out of the aggregation");
  assert.ok(!html.includes("report.json"), "the panel names no report file");
  for (const runId of QA_INDEX.reports.map((entry) => entry.run_id)) {
    assert.ok(!html.includes(runId), `the panel lists ${runId} — that is a report browser`);
  }
});

test("nothing to aggregate paints nothing, rather than a total nobody measured", () => {
  const rrs = loadSurface();
  assert.equal(rrs.pendingVerdictPanelHtml(rrs.pendingVerdictAcrossProjects([])), "");
  assert.equal(rrs.pendingVerdictPanelHtml(null), "");
});

// ---------------------------------------------------------------------------
// The shell's seam onto that aggregation. The Portfolio draws the panel, and the counting
// lives ONCE — here, with the index model the run detail reads too.
// ---------------------------------------------------------------------------

test("the Portfolio asks the mount to count, and paints nothing at all when the mount is not loaded", async () => {
  const shell = await import("../project-console/assets/project-shell.js");
  const rrs = loadSurface();
  const entries = [{ key: "reports-qa", label: "Reports QA", index: QA_INDEX }];
  // Handed the mount, it is the mount's own panel — no second implementation on this side.
  assert.equal(shell.verdictPanelHtml(entries, rrs), rrs.pendingVerdictPanelHtml(rrs.pendingVerdictAcrossProjects(entries)));
  // Without it, silence: a Portfolio that cannot count must not print a number.
  assert.equal(shell.verdictPanelHtml(entries, {}), "");
  assert.equal(shell.verdictPanelHtml(entries, { pendingVerdictAcrossProjects: () => ({}) }), "");
});

test("the shell composes each project's index route from the registry key, and nothing else", async () => {
  const shell = await import("../project-console/assets/project-shell.js");
  assert.equal(shell.reportsIndexUrlForKey("reports-qa"), "/projects/reports-qa/.project/reports_index.json");
  // A key is a URL segment and is encoded as one, exactly as the snapshot route is.
  assert.equal(shell.reportsIndexUrlForKey("a b"), "/projects/a%20b/.project/reports_index.json");
});

// ---------------------------------------------------------------------------
// Criterion 6 — the volume fixture, and what the renderer does with it.
// ---------------------------------------------------------------------------

test("the volume fixture IS the run the development case declares: 28 items, 22 checks, 5 decisions, 1 info", () => {
  const report = JSON.parse(readFileSync(VOLUME_PATH, "utf8"));
  assert.equal(report.items.length, 28);
  const byType = report.items.reduce((acc, item) => ({ ...acc, [item.type]: (acc[item.type] || 0) + 1 }), {});
  assert.deepEqual(byType, { decision: 5, check: 22, info: 1 });
  // The counts the source case declares are unchanged: this fixture invents no measurement.
  assert.equal(report.counts.checks.after, 22);
});

test("every replicated item says it is a replica — in a field and on the surface", () => {
  const report = JSON.parse(readFileSync(VOLUME_PATH, "utf8"));
  const replicas = report.items.filter((item) => item.replica_of);
  const measured = report.items.filter((item) => !item.replica_of);
  assert.equal(replicas.length, 24);
  // The four items the source case actually carries, and no more, are unmarked.
  assert.deepEqual(measured.map((item) => item.item_id).sort(), ["D1", "I1", "K1", "K2"]);
  for (const replica of replicas) {
    assert.match(replica.headline, /réplica/, `${replica.item_id} does not announce itself on screen`);
    assert.ok(report.items.some((item) => item.item_id === replica.replica_of), "a replica points at an item that exists");
  }
  const ids = report.items.map((item) => item.item_id);
  assert.equal(new Set(ids).size, ids.length, "28 items, 28 identities");
});

test("at volume the index, the counter and the gate all hold: 30 steps, 30 rail rows, 0 of 30 decided", () => {
  const sandbox = { console };
  vm.createContext(sandbox);
  vm.runInContext(readFileSync(RENDERER_JS, "utf8"), sandbox, { filename: RENDERER_JS });
  const handlers = {};
  const container = {
    innerHTML: "", attributes: new Map(), classList: { add() {} },
    setAttribute(name, value) { this.attributes.set(name, String(value)); },
    addEventListener(type, fn) { handlers[type] = fn; },
    querySelector() { return null; }
  };
  const handle = sandbox.renderRunReport(container, readFileSync(VOLUME_PATH, "utf8"));
  const T = sandbox.rrT("en");
  const steps = sandbox.rrSteps(handle.state.report, T);
  // 28 items + the report's own self_decision + the run itself.
  assert.equal(steps.length, 30);
  assert.equal((container.innerHTML.match(/class="rr-rail-row/g) || []).length, 30, "the index lists every step at volume");
  assert.ok(container.innerHTML.includes("1 / 30"), "the position counter squares with the step count");
  // The gate counts all 30 as undecided, and the signature is the second thing missing.
  assert.equal(sandbox.rrMissing(handle.state.report, handle.state, T).length, 2);
  const progress = sandbox.rrProgress(handle.state.report, handle.state, T);
  assert.equal(progress.done, 0);
  assert.equal(progress.total, 30);
  // Signing off every step closes the gate, and the output carries all 28 items.
  steps.forEach((step) => sandbox.rrSetRec(handle.state, step.id, { verdict: "APPROVED" }));
  handle.state.reviewer = "QA";
  assert.equal(sandbox.rrMissing(handle.state.report, handle.state, T).length, 0);
  assert.equal(sandbox.rrVerdictOutput(handle.state.report, handle.state).items.length, 28);
});
