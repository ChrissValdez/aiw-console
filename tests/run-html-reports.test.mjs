// [#70] THE CONSOLE FINDS A THREAD'S HTML REPORT AND LINKS IT — AND DOES NOTHING ELSE WITH IT.
//
// RUN-CONSOLE-THREAD-HTML-REPORTS-CONTRACT-001, Phase 2, built from the Phase 1 proposal the
// operator approved on 2026-10-20
// (context/aiw-console/records/PROPUESTA-FASE-1-70-REPORTES-HTML-DE-CADA-HILO-2026-10-19.md).
//
//   1. THE SECTION  — a run that declares `report_html` shows one link per page in its detail,
//                     opening in its own tab; a run that declares nothing shows NOTHING (D-075)
//   2. THE PROBE    — one HEAD per declared page; a page that is not on disk is said to be so
//   3. THE DOOR     — the document reader gets a door of its own in the run detail's header
//   4. THE FREEZE   — the report surface built for `report.json` keeps working where a project
//                     HAS reports/, and stops speaking in the projects that never had one
//   5. THE VETO     — the new code knows no word of any project
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { createConsoleHarness } from "./helpers/console-dom.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const ASSETS = join(REPO_ROOT, "project-console", "assets");
const LINKS_JS = join(ASSETS, "run-html-reports.js");
const LINKS_CSS = join(ASSETS, "run-html-reports.css");
const CONSOLE_JS = join(ASSETS, "project-console.js");
const SURFACE_JS = join(ASSETS, "run-report-surface.js");
const READER_JS = join(ASSETS, "doc-side-reader.js");
const INDEX_HTML = join(REPO_ROOT, "project-console", "index.html");
const LANES_ROOT = join(HERE, "fixtures", "lanes", "project");
const REPORT_FIXTURES = join(HERE, "fixtures", "reports");
const QA_INDEX = JSON.parse(readFileSync(join(HERE, "fixtures", "reports-qa", ".project", "reports_index.json"), "utf8"));
const EMPTY_INDEX = JSON.parse(readFileSync(join(HERE, "fixtures", "reports-empty", ".project", "reports_index.json"), "utf8"));

// The module alone, in its own context: its pure half needs no DOM and no console.
function loadLinks() {
  const sandbox = { console, URL, encodeURIComponent, Promise };
  vm.createContext(sandbox);
  vm.runInContext(readFileSync(LINKS_JS, "utf8"), sandbox, { filename: LINKS_JS });
  return sandbox;
}

async function openLanes(declared = {}) {
  const harness = createConsoleHarness({
    rendererPath: CONSOLE_JS,
    rootsByKey: new Map([["lanes", LANES_ROOT]]),
    alsoLoad: [SURFACE_JS, LINKS_JS]
  });
  harness.sandbox.resetProjectScopedState();
  harness.sandbox.setActiveProjectBase("/projects/lanes/");
  await harness.sandbox.loadActiveProject();
  await harness.flush();
  vm.runInContext(`(function (declared) {
    appData.roadmapV3.objectives.forEach((o) => (o.phases || []).forEach((p) => (p.runs || []).forEach((r) => {
      if (Object.prototype.hasOwnProperty.call(declared, r.run_id)) r.report_html = declared[r.run_id];
    })));
    roadmapV3ModelCache = null;
  })(${JSON.stringify(declared)})`, harness.sandbox);
  return harness;
}

const RUN = (extra) => ({ run_id: "RUN-T-001", queue_order: 1, title: "t", ...(extra || {}) });

// =============================================================== 1. THE SECTION

test("H.1: a run that declares nothing shows NOTHING — no section, no 'not configured' (D-075)", () => {
  const links = loadLinks();
  assert.equal(links.runHtmlReportSectionHtml(RUN(), { base: "/projects/p/" }), "");
  assert.equal(links.runHtmlReportSectionHtml(null, { base: "/projects/p/" }), "");
});

test("H.2: one link per declared page, in the run's order, each opening in its OWN tab with no handle back to the console", () => {
  const links = loadLinks();
  const html = links.runHtmlReportSectionHtml(RUN({ report_html: ["pages/L1/first.html", "pages/L1/second.html"] }), { base: "/projects/p/" });
  assert.match(html, /HTML report/, "the section names what it holds");
  const anchors = [...html.matchAll(/<a [^>]*>/g)].map((m) => m[0]);
  assert.equal(anchors.length, 2);
  assert.match(anchors[0], /href="\/projects\/p\/pages\/L1\/first\.html"/);
  assert.match(anchors[1], /href="\/projects\/p\/pages\/L1\/second\.html"/);
  for (const anchor of anchors) {
    assert.match(anchor, /target="_blank"/, "the page opens in its own tab");
    assert.match(anchor, /rel="noopener noreferrer"/, "the new tab holds no reference to the console");
  }
  assert.ok(html.indexOf("first.html") < html.indexOf("second.html"), "the thread's order is kept");
  // The label is the file; the full path stays readable underneath it.
  assert.ok(html.includes("pages/L1/first.html"), "the path is shown, not only the file name");
});

test("H.3: the URL is the project's base plus the path, each segment encoded — spaces, accents and parentheses survive", () => {
  const links = loadLinks();
  assert.equal(
    links.runHtmlReportUrl("/projects/p/", "Exam Simulator (Free)/revisión página.html"),
    "/projects/p/Exam%20Simulator%20(Free)/revisi%C3%B3n%20p%C3%A1gina.html"
  );
});

test("H.4: an entry that is not a path to a page inside the project is NOT linked — and the section says how many it skipped", () => {
  const links = loadLinks();
  const bad = ["/abs.html", "../out.html", "a//b.html", ".git/x.html", ".project/x.html", "a/x.json", "a/x.htm", "https://x.org/y.html", "C:/x.html", "a\\b.html", "", 7];
  for (const entry of bad) assert.equal(links.runHtmlReportPathValid(entry), false, JSON.stringify(entry));
  assert.equal(links.runHtmlReportPathValid("pages/ok.HTML"), true);
  const html = links.runHtmlReportSectionHtml(RUN({ report_html: ["pages/ok.html", "../out.html", 7] }), { base: "/projects/p/" });
  assert.equal([...html.matchAll(/<a /g)].length, 1, "only the valid page is linked");
  assert.ok(!html.includes("out.html\""), "a refused entry never becomes an href");
  assert.match(html, /2 declared entries are not linked/);
});

test("H.4b: the console and the engine agree on what a page path is — one rule in two runtimes, held together here", async () => {
  const links = loadLinks();
  const core = await import("../tools/roadmap/roadmap-core.mjs");
  const cases = [
    "pages/ok.html", "pages/OK.HTML", "Exam Simulator (Free)/página.html", "index.htm",
    "", 7, null, "/abs.html", "C:/x.html", "https://x.org/y.html", "a\\b.html", "../out.html",
    "a/../b.html", "./a.html", "a//b.html", ".git/x.html", ".project/x.html", "a/x.json", "a/x.html.txt"
  ];
  for (const entry of cases) {
    assert.equal(links.runHtmlReportPathValid(entry), core.reportHtmlPathProblem(entry) === null,
      `${JSON.stringify(entry)}: the console and the engine disagree`);
  }
});

test("H.5: a key that is present but not a list still says so instead of disappearing", () => {
  const links = loadLinks();
  const html = links.runHtmlReportSectionHtml(RUN({ report_html: "pages/ok.html" }), { base: "/projects/p/" });
  assert.match(html, /HTML report/);
  assert.match(html, /1 declared entry is not linked/);
});

test("H.6: every link says it opens isolated, and carries the slot its on-disk check fills", () => {
  const links = loadLinks();
  const html = links.runHtmlReportSectionHtml(RUN({ report_html: ["pages/a.html"] }), { base: "/projects/p/" });
  assert.match(html, /isolated/i, "the operator is told why the page cannot keep what it saves");
  assert.match(html, /data-rhr-status/);
  assert.match(html, /data-rhr-url="\/projects\/p\/pages\/a\.html"/);
});

// =============================================================== 2. THE PROBE

test("P.1: one HEAD per declared page — present, missing (404) and unchecked (the request failed) are three answers", async () => {
  const links = loadLinks();
  const calls = [];
  const fetchStub = async (url, init) => {
    calls.push([url, init && init.method]);
    if (url.endsWith("gone.html")) return { ok: false, status: 404 };
    if (url.endsWith("broken.html")) throw new Error("network down");
    return { ok: true, status: 200 };
  };
  const results = await links.probeRunHtmlReports(["/projects/p/a.html", "/projects/p/gone.html", "/projects/p/broken.html"], fetchStub);
  assert.deepEqual(calls.map((c) => c[1]), ["HEAD", "HEAD", "HEAD"], "a HEAD each, never a GET of the page");
  assert.deepEqual(results.map((r) => r.state), ["present", "missing", "unchecked"]);
  assert.equal(links.runHtmlReportStatusText("present"), "");
  assert.match(links.runHtmlReportStatusText("missing"), /declared in the run, not on disk/);
  assert.match(links.runHtmlReportStatusText("unchecked"), /could not be checked/);
});

// =============================================================== THE SECTION IN THE REAL DETAIL

test("V.1: the real run detail paints the section for a run that declares pages — against the project's own base", async () => {
  const harness = await openLanes({ "RUN-FIX-BASE-001": ["pages/base/report.html"] });
  harness.sandbox.v3OpenRunDetail("RUN-FIX-BASE-001", "root");
  const html = harness.element("drawer-body").innerHTML;
  assert.match(html, /HTML report/);
  assert.match(html, /href="\/projects\/lanes\/pages\/base\/report\.html"/);
  assert.match(html, /target="_blank"/);
});

test("V.2: and paints nothing for a run that declares none", async () => {
  const harness = await openLanes({ "RUN-FIX-BASE-001": ["pages/base/report.html"] });
  harness.sandbox.v3OpenRunDetail("RUN-FIX-COMP2-001", "root");
  assert.ok(!/HTML report/.test(harness.element("drawer-body").innerHTML));
});

// =============================================================== 3. THE DOOR

test("D.1: the run detail's header gets a «Documents» door — the control the reader already listens for", async () => {
  const harness = await openLanes();
  const injected = [];
  for (const id of ["(drawer-header)", "drawer-close"]) {
    harness.element(id).insertAdjacentHTML = (where, html) => injected.push(html);
  }
  harness.sandbox.v3OpenRunDetail("RUN-FIX-BASE-001", "root");
  const door = injected.find((html) => html.includes("data-doc-reader-open"));
  assert.ok(door, "no control carrying data-doc-reader-open was put in the run detail's header");
  assert.match(door, /type="button"/);
  assert.match(door, />Documents</);
  // The reader opens on whatever carries that attribute, delegated on the document: the same
  // attribute, so the door needs no wiring of its own.
  assert.ok(readFileSync(READER_JS, "utf8").includes('closest("[data-doc-reader-open]")'));
});

test("D.2: the door does not depend on a report — a run with no report and no pages still gets it", async () => {
  const harness = await openLanes();
  const injected = [];
  for (const id of ["(drawer-header)", "drawer-close"]) {
    harness.element(id).insertAdjacentHTML = (where, html) => injected.push(html);
  }
  harness.sandbox.v3OpenRunDetail("RUN-FIX-COMP2-001", "root");
  assert.ok(injected.some((html) => html.includes("data-doc-reader-open")));
});

test("D.3: the frozen report view keeps its own door — nothing was moved out of it", () => {
  const html = readFileSync(INDEX_HTML, "utf8");
  const view = html.slice(html.indexOf('id="run-report-view"'), html.indexOf('id="run-report-scroll"'));
  assert.ok(view.includes("data-doc-reader-open"), "the report view's Documents button is gone");
});

// =============================================================== 4. THE FREEZE

test("F.1: the frozen run-report section still speaks where the project HAS reports/", async () => {
  const harness = await openLanes();
  vm.runInContext(`reportsIndexModelCache = reportsIndexModel(${JSON.stringify(QA_INDEX)});`, harness.sandbox);
  const html = harness.sandbox.v3RunReportSection({ run_id: "RUN-QA-REPORT-AUDIT-001" });
  assert.match(html, /Run report/);
  assert.match(html, /data-run-report-open="RUN-QA-REPORT-AUDIT-001"/);
});

test("F.2: and says NOTHING where the project has no reports/ — nor where no index could be read (D-075)", async () => {
  const harness = await openLanes();
  vm.runInContext(`reportsIndexModelCache = reportsIndexModel(${JSON.stringify(EMPTY_INDEX)});`, harness.sandbox);
  assert.equal(harness.sandbox.v3RunReportSection({ run_id: "RUN-ANY-001" }), "", "an index that says reports/ is absent");
  vm.runInContext("reportsIndexModelCache = reportsIndexModel(null);", harness.sandbox);
  assert.equal(harness.sandbox.v3RunReportSection({ run_id: "RUN-ANY-001" }), "", "no index at all");
});

test("F.3: the Portfolio counts verdicts only for projects that HAVE reports/ — the filter asks the mount's own model", async () => {
  const shell = await import("../project-console/assets/project-shell.js");
  const sandbox = { console };
  vm.createContext(sandbox);
  vm.runInContext(readFileSync(SURFACE_JS, "utf8"), sandbox, { filename: SURFACE_JS });
  const entries = [
    { key: "with-reports", label: "With", index: QA_INDEX },
    { key: "without", label: "Without", index: EMPTY_INDEX },
    { key: "no-index", label: "No index", index: null }
  ];
  assert.deepEqual(shell.projectsWithReportsDir(entries, sandbox).map((e) => e.key), ["with-reports"]);
  // Without the mount, nothing is counted rather than everything.
  assert.deepEqual(shell.projectsWithReportsDir(entries, {}), []);
  // And the panel the shell paints is the mount's own, over the filtered list only.
  const panel = shell.verdictPanelHtml(shell.projectsWithReportsDir(entries, sandbox), sandbox);
  assert.match(panel, /With/);
  assert.ok(!/no reports emitted|no reports index/.test(panel), "a project without reports/ is painted in the panel");
});

// =============================================================== 5. THE VETO

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
    (Array.isArray(item.satisfies) ? item.satisfies : []).forEach(push);
    if (item.authority) { push(item.authority.source); push(item.authority.section); push(item.authority.invented_by); }
  });
  (Array.isArray(report.header_satisfies) ? report.header_satisfies : []).forEach((h) => {
    (Array.isArray(h.satisfies) ? h.satisfies : []).forEach(push);
  });
  (Array.isArray(report.blind_spots) ? report.blind_spots : []).forEach((b) => {
    (Array.isArray(b.affects) ? b.affects : []).forEach(push);
  });
  Object.keys(report.profile_data || {}).forEach(push);
  return tokens;
}

test("B.1: the link code knows no word of any project — the reader's veto, plus every project id and the pilot's own folder and file names", () => {
  const reports = readdirSync(REPORT_FIXTURES).filter((name) => name.endsWith(".report.json"))
    .map((name) => JSON.parse(readFileSync(join(REPORT_FIXTURES, name), "utf8")));
  const needles = [...new Set(reports.flatMap(domainTokens))].filter((t) => t.length >= 4).map((t) => t.toLowerCase());
  assert.equal(needles.length, 175, "the same measured corpus as the reader's veto");
  needles.push("christopher", "valdez", "cantu");
  ["aiw-console", "cantu-studio", "cantu-quizzes", "cantu-lessons", "quizzes", "lessons", "phd-p2"].forEach((id) => needles.push(id));
  // What the pilot names its pages and folders: a rule for any of them would be the console
  // learning one project's layout.
  ["lecciones", "leccion", "guion", "web.html", "slide.html", "slide-mazo", "veredicto"].forEach((word) => needles.push(word));
  for (const path of [LINKS_JS, LINKS_CSS]) {
    const haystack = readFileSync(path, "utf8").toLowerCase();
    for (const needle of needles) {
      assert.ok(!haystack.includes(needle), `${path} contains the domain token ${JSON.stringify(needle)}`);
    }
  }
});
