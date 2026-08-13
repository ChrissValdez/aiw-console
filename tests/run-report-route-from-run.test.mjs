// RUN-CONSOLE-REPORTS-SURFACE-001 — THE ROUTE, driven through the console itself.
//
// The previous file judges the mount in isolation. This one asks the question #52 could not:
// does the CONSOLE reach the renderer? The three shipped scripts are loaded into one context in
// the order index.html loads them (report renderer, mount, console renderer), a run detail is
// opened the way a click opens it, and the report is opened from that detail — so what runs here
// is the path, not a mirror of it.
//
// The project is tests/fixtures/reports-qa: a fixture root that HAS reports, with one run per
// state the surface must tell apart. Its `.project/` was emitted by the real projector.
//
// Same limits as the other consumer suites: a DOM stub, no CSS, no layout, no real event
// dispatch. What a report LOOKS like is the operator's QA pass, and the packet in the record
// is written for it.

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createConsoleHarness } from "./helpers/console-dom.mjs";
import { AIW_CONSOLE_FIXTURE } from "./helpers/neighbours.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const ASSETS = join(REPO_ROOT, "project-console", "assets");
const CONSOLE_JS = join(ASSETS, "project-console.js");
const RENDERER_JS = join(ASSETS, "run-report-renderer.js");
const SURFACE_JS = join(ASSETS, "run-report-surface.js");
const QA_ROOT = join(HERE, "fixtures", "reports-qa");

const EMPTY_ROOT = join(HERE, "fixtures", "reports-empty");

const ROOTS = new Map([
  ["reports-qa", QA_ROOT],
  // A project whose reports index is readable and lists NOTHING — today's state of every real
  // repository in this workspace, frozen so the suite never has to read a live one.
  ["reports-empty", EMPTY_ROOT],
  // The frozen neighbour, whose emitted folder PREDATES the index entirely: no index at all.
  ["aiw-console", AIW_CONSOLE_FIXTURE]
]);

// index.html loads the three with `defer`, so they execute in document order into one global
// scope. The harness does the same, and nothing here stubs a function the page provides.
async function openProject(key) {
  const harness = createConsoleHarness({
    rendererPath: CONSOLE_JS,
    rootsByKey: ROOTS,
    alsoLoad: [RENDERER_JS, SURFACE_JS]
  });
  harness.sandbox.resetProjectScopedState();
  harness.sandbox.setActiveProjectBase(`/projects/${key}/`);
  const result = await harness.sandbox.loadActiveProject();
  await harness.flush();
  return { harness, result };
}

const drawer = (harness) => harness.element("drawer-body").innerHTML;
const mount = (harness) => harness.element("run-report-mount");
const layer = (harness) => harness.element("run-report-view");

// ---------------------------------------------------------------------------
// The door is in the run, and the run is the only place it is.
// ---------------------------------------------------------------------------

test("the console fetches the reports index of the active project — the seventh artifact, read at last", async () => {
  const { harness, result } = await openProject("reports-qa");
  assert.equal(result.ok, true);
  const diagnostics = harness.element("state-sources").innerHTML;
  assert.match(diagnostics, /reports_index\.json/, "the index is not among the loaded sources");
  assert.match(harness.element("repo-structure").innerHTML, /reports_index\.json/, "the route is not declared in Console Diagnostics");
  // And it is a LOAD, not a failure: the fixture declares it and it is on disk.
  assert.ok(!/Declared sources that failed to load/.test(diagnostics), "the index failed to load");
});

test("a run detail carries the way into its own report, and the identifier on it is the run's", async () => {
  const { harness } = await openProject("reports-qa");
  harness.sandbox.v3OpenRunDetail("RUN-QA-REPORT-AUDIT-001", "root");
  const html = drawer(harness);
  assert.match(html, /Run report/, "the run detail says nothing about its report");
  assert.match(html, /data-run-report-open="RUN-QA-REPORT-AUDIT-001"/);
  assert.match(html, /no verdict yet/);
});

test("a run with no report says so in its own detail, and offers nothing to open", async () => {
  const { harness } = await openProject("reports-qa");
  harness.sandbox.v3OpenRunDetail("RUN-QA-REPORT-ABSENT-001", "root");
  const html = drawer(harness);
  assert.match(html, /No report has been emitted for this run/);
  assert.ok(!html.includes("data-run-report-open"), "a run with no report offered one anyway");
});

test("a project whose reports index is honestly EMPTY says it of every run, and never stays silent", async () => {
  // Today's state of every real repository in this workspace: the index exists, is readable,
  // and lists nothing. That is a measurement, and every run detail reports it as one.
  const { harness, result } = await openProject("reports-empty");
  assert.equal(result.ok, true);
  const runIds = [...harness.sandbox.v3Model({
    roadmapV3: JSON.parse(readFileSync(join(EMPTY_ROOT, ".project", "roadmap.json"), "utf8"))
  }).runsById.keys()];
  assert.equal(runIds.length, 2, "the fixture has the runs this test opens");
  for (const runId of runIds) {
    harness.sandbox.v3OpenRunDetail(runId, "root");
    const html = drawer(harness);
    assert.match(html, /Run report/, `${runId}: the section is missing`);
    assert.match(html, /No report has been emitted for this run/, `${runId}: the absence is not stated`);
    assert.ok(!html.includes("data-run-report-open"), `${runId}: offered a report that does not exist`);
  }
});

// ---------------------------------------------------------------------------
// Opening it: the URL comes from the index, and the report arrives whole.
// ---------------------------------------------------------------------------

test("opening a run's report mounts the RENDERER, on the file the index named", async () => {
  const { harness } = await openProject("reports-qa");
  harness.sandbox.v3OpenRunDetail("RUN-QA-REPORT-DEVELOPMENT-001", "root");
  await harness.sandbox.v3OpenRunReport("RUN-QA-REPORT-DEVELOPMENT-001");
  await harness.flush();

  const open = harness.sandbox.openRunReportState();
  assert.ok(open, "nothing opened");
  // Composed from the INDEX's own report_path against the project base — never from the run id.
  assert.equal(open.url, "/projects/reports-qa/reports/RUN-QA-REPORT-DEVELOPMENT-001/report.json");
  assert.equal(harness.sandbox.runReportIsOpen(), true);
  assert.equal(layer(harness).getAttribute("aria-hidden"), "false");

  // What is on screen is the renderer's surface, painted from that report's own content.
  const html = mount(harness).innerHTML;
  assert.match(html, /rr-rail/, "the report's index rail is not on screen");
  assert.match(html, /rr-topbar/, "the report's own topbar is not on screen");
  assert.match(html, /1 \/ 6/, "the six steps of that report are not counted");
  assert.equal(mount(harness).getAttribute("data-theme") !== null, true, "the renderer never took the container");
});

test("the report the operator sees is the file on disk, quoted — never a console rewording of it", async () => {
  const { harness } = await openProject("reports-qa");
  await harness.sandbox.v3OpenRunReport("RUN-QA-REPORT-DEVELOPMENT-001");
  await harness.flush();
  const html = mount(harness).innerHTML;
  const report = JSON.parse(readFileSync(join(QA_ROOT, "reports", "RUN-QA-REPORT-DEVELOPMENT-001", "report.json"), "utf8"));
  // The first card's own headline, verbatim from the file. The chrome around it is English; the
  // evidence is in the language it was written in, and stays there.
  const stop = report.items.find((item) => item.stop);
  assert.ok(html.includes(stop.headline), "the report's own words did not reach the screen unchanged");
  assert.ok(html.includes(report.gate_reason), "the gate's own reason was not quoted");
});

test("a report that does not parse shows the parser's message, and nothing pretends to be under it", async () => {
  const { harness } = await openProject("reports-qa");
  await harness.sandbox.v3OpenRunReport("RUN-QA-REPORT-BROKEN-001");
  await harness.flush();
  const html = mount(harness).innerHTML;
  assert.match(html, /rr-layout-error/, "a broken report did not produce the honest error panel");
  assert.ok(!html.includes("rr-rail"), "an index was painted over a report that does not exist");
  assert.ok(html.length > 0, "the blank screen this run exists to prevent");
});

test("a report the index names and disk no longer holds fails as a FETCH, and says which file", async () => {
  const { harness } = await openProject("reports-qa");
  const result = await harness.sandbox.openRunReport({
    runId: "RUN-QA-REPORT-AUDIT-001",
    reportUrl: "/projects/reports-qa/reports/RUN-QA-REPORT-AUDIT-001/gone.json"
  });
  await harness.flush();
  assert.equal(result.ok, false);
  assert.equal(result.reason, "fetch_failed");
  const html = mount(harness).innerHTML;
  assert.match(html, /could not be loaded/);
  assert.match(html, /gone\.json/, "the failure does not name the file");
  // A fetch failure and a parse failure are different facts and do not wear each other's words.
  assert.ok(!html.includes("rr-layout-error"), "a missing file was reported as an unparseable one");
});

test("the volume report opens from its run and indexes all thirty of its steps", async () => {
  const { harness } = await openProject("reports-qa");
  await harness.sandbox.v3OpenRunReport("RUN-QA-REPORT-VOLUME-001");
  await harness.flush();
  const html = mount(harness).innerHTML;
  assert.equal((html.match(/class="rr-rail-row/g) || []).length, 30);
  assert.ok(html.includes("1 / 30"), "the counter does not hold at volume");
});

// ---------------------------------------------------------------------------
// And back to the run — the other half of the route.
// ---------------------------------------------------------------------------

test("closing the report returns the operator to the run it belongs to", async () => {
  const { harness } = await openProject("reports-qa");
  harness.sandbox.v3OpenRunDetail("RUN-QA-REPORT-LESSON-001", "root");
  await harness.sandbox.v3OpenRunReport("RUN-QA-REPORT-LESSON-001");
  await harness.flush();
  assert.equal(harness.sandbox.runReportIsOpen(), true);

  harness.sandbox.closeRunReport();
  assert.equal(harness.sandbox.runReportIsOpen(), false);
  assert.equal(layer(harness).getAttribute("aria-hidden"), "true");
  assert.equal(mount(harness).innerHTML, "", "the report stayed in the DOM behind the closed layer");
  // The run detail is the surface underneath, repainted: its own report section is there again.
  assert.match(harness.element("drawer-title").innerHTML, /RUN-QA-REPORT-LESSON-001|children/);
  assert.match(drawer(harness), /data-run-report-open="RUN-QA-REPORT-LESSON-001"/);
});

test("switching project tears the report down WITHOUT walking back into the project just left", async () => {
  const { harness } = await openProject("reports-qa");
  harness.sandbox.v3OpenRunDetail("RUN-QA-REPORT-AUDIT-001", "root");
  await harness.sandbox.v3OpenRunReport("RUN-QA-REPORT-AUDIT-001");
  await harness.flush();
  assert.equal(harness.sandbox.runReportIsOpen(), true);

  harness.sandbox.resetProjectScopedState();
  assert.equal(harness.sandbox.runReportIsOpen(), false, "the previous project's report survived the switch");
  assert.equal(mount(harness).innerHTML, "");
  // The index model is per-project too: unbuilt, not empty, so the next detail cannot answer
  // from the previous project's measurements.
  assert.equal(harness.sandbox.v3ReportsIndexModel(), null);
});

test("a project with NO reports index at all says the index could not be read — never that there is no report", async () => {
  // The distinction that matters most, driven end to end, against a real emitted folder that
  // predates the index (the frozen neighbour, captured before O4.P17). Saying "no report" here
  // would be the console answering a question nobody measured — and the operator would read it
  // as a fact about the run instead of a fact about the emission.
  const { harness, result } = await openProject("aiw-console");
  assert.equal(result.ok, true);
  const runIds = [...harness.sandbox.v3Model({
    roadmapV3: JSON.parse(readFileSync(join(AIW_CONSOLE_FIXTURE, ".project", "roadmap.json"), "utf8"))
  }).runsById.keys()];
  harness.sandbox.v3OpenRunDetail(runIds[0], "root");
  const html = drawer(harness);
  assert.match(html, /could not be read/);
  assert.ok(!/No report has been emitted/.test(html), "an unread index was reported as a measured absence");
  assert.ok(!html.includes("data-run-report-open"));
  // And the file it could not read is named, so the operator knows where to look (§20).
  assert.match(html, /reports_index\.json/);
});

test("only a run listed by the index can be opened: an identifier alone opens nothing", async () => {
  const { harness } = await openProject("reports-qa");
  await harness.sandbox.v3OpenRunReport("RUN-QA-REPORT-ABSENT-001");
  await harness.flush();
  assert.equal(harness.sandbox.runReportIsOpen(), false, "a run with no indexed report opened one");
  assert.equal(harness.sandbox.openRunReportState(), null);
});
