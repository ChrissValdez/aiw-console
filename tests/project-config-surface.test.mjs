// #67 RUN-CONSOLE-PROJECT-CONFIG-BUTTON-001 — the care budget and the unclassified note move
// behind ONE project configuration control (D-075).
//
// What is measured here, and where it lives:
//   1. the MARKUP (index.html) — neither surface sits on a main screen any more; there is ONE
//      control, in the project header band every project shares; the dialog holds both slots and
//      carries no edit toggle of its own (the write still asks for "Edit roadmap", nothing else);
//   2. the RENDERER (project-console.js, run in node:vm) — Overview no longer paints the note, the
//      surface does, with the sentence that says what "classification" means; the control shows
//      only when there is something to show; the dialog opens, closes, survives no project
//      switch, and a run in its list opens that run's detail with a way back to the surface;
//   3. the CARE BUDGET reads EXACTLY as before — byte-identical HTML in five states, against a
//      golden captured from the renderer BEFORE this run touched it
//      (tests/fixtures/project-config/care-budget-panel.golden.json);
//   4. the STYLESHEET — the control is quiet chrome: no alarm colour, no filled accent.
//
// The shared harness answers null to querySelector and never dispatches an event, so clicks are
// exercised through the functions the listeners call, the same technique the run-editor suites use.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import * as classification from "../tools/classification/classification.mjs";
import { createConsoleHarness } from "./helpers/console-dom.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const RENDERER = join(REPO_ROOT, "project-console", "assets", "project-console.js");
const INDEX_HTML = readFileSync(join(REPO_ROOT, "project-console", "index.html"), "utf8");
const CSS = readFileSync(join(REPO_ROOT, "project-console", "assets", "project-console.css"), "utf8");
const GOLDEN = JSON.parse(readFileSync(join(HERE, "fixtures", "project-config", "care-budget-panel.golden.json"), "utf8"));

// One fixture WITH both things to show (an envelope carrying care_budget, and two live runs with
// no classification) and one with NEITHER (an older envelope: no taxonomy_model, no report).
const ROOTS = new Map([
  ["reports-empty", join(HERE, "fixtures", "reports-empty")],
  ["lanes", join(HERE, "fixtures", "lanes", "project")]
]);

const inContext = (harness, statement) => vm.runInContext(statement, harness.sandbox);

function makeHarness() {
  const harness = createConsoleHarness({ rendererPath: RENDERER, rootsByKey: ROOTS });
  harness.sandbox.setClassificationModel(classification);
  return harness;
}

async function loadProject(harness, key) {
  harness.sandbox.resetProjectScopedState();
  harness.sandbox.setActiveProjectBase(`/projects/${key}/`);
  const result = await harness.sandbox.loadActiveProject();
  await harness.flush();
  assert.equal(result.ok, true, `the ${key} fixture must load`);
  return result;
}

// Regions of the static markup, cut at the tags that open and close them.
const region = (pattern, what) => {
  const match = pattern.exec(INDEX_HTML);
  assert.ok(match, `index.html has no ${what}`);
  return match[0];
};
const headerBand = () => region(/<div class="project-header">[\s\S]*?<main class="content">/, "project header band");
const overviewTab = () => region(/<section id="tab-overview"[\s\S]*?<section id="tab-roadmap"/, "Overview tab");
const roadmapTab = () => region(/<section id="tab-roadmap"[\s\S]*?<section id="tab-history"/, "Roadmap tab");
const configDialog = () => region(/<aside id="project-config"[\s\S]*?<\/aside>/, "project configuration dialog");

const UNCLASSIFIED_TWO = {
  report: "unclassified_live_runs", kind: "information", total: 2,
  runs: [
    { run_id: "RUN-B-002", queue_order: 7, status: "planned", title: "Second" },
    { run_id: "RUN-A-001", queue_order: 3, status: "active", title: "First" }
  ]
};

// =============================================================== 1. THE MARKUP

test("#67 markup: the care budget slot is on NO main screen — not Roadmap, not Overview — and lives in the dialog", () => {
  assert.equal((INDEX_HTML.match(/id="roadmap-care-budget"/g) || []).length, 1, "exactly one care budget slot");
  assert.equal(roadmapTab().includes('id="roadmap-care-budget"'), false, "the slot left the Roadmap tab");
  assert.equal(overviewTab().includes('id="roadmap-care-budget"'), false, "and did not land on Overview");
  assert.ok(configDialog().includes('id="roadmap-care-budget"'), "it lives inside the configuration dialog");
});

test("#67 markup: ONE configuration control, in the project header band every project shares, and it is not a tab", () => {
  const controls = INDEX_HTML.match(/<button\b[^>]*\bdata-project-config-open\b[^>]*>/g) || [];
  assert.equal(controls.length, 1, "exactly one configuration control in the page");
  const tag = controls[0];
  assert.ok(headerBand().includes(tag), "it sits in the project header band, above every tab");
  assert.equal(/\bdata-tab=/.test(tag), false, "it opens a dialog; it is not a tab that swaps a screen");
  assert.match(tag, /type="button"/);
  assert.match(tag, /aria-label="Project configuration"/, "an icon control still says what it is");
  assert.match(tag, /aria-controls="project-config"/);
  // Hidden in the static markup: before a project's data says there is something to configure,
  // the control is not there, rather than a button that opens onto nothing.
  assert.match(tag, /\shidden(\s|>)/, "the control starts hidden");
});

test("#67 markup: the dialog holds both slots and carries NO edit toggle of its own", () => {
  const dialog = configDialog();
  const shell = /<aside id="project-config"[^>]*>/.exec(dialog)[0];
  assert.match(shell, /role="dialog"/);
  assert.match(shell, /aria-modal="true"/);
  assert.match(shell, /aria-hidden="true"/, "inert until it is opened");
  assert.ok(dialog.includes('id="project-config-unclassified"'), "the unclassified list has its slot here");
  assert.ok(dialog.includes("data-project-config-close"), "and the dialog has its own Close");
  // The write keeps asking for exactly what it asked before: the ONE Edit roadmap toggle, in the
  // Roadmap toolbar. A second toggle here would be the shortcut the ticket forbids.
  assert.equal(/data-roadmap-edit-toggle/.test(dialog), false, "no edit toggle inside the dialog");
  assert.equal((INDEX_HTML.match(/data-roadmap-edit-toggle/g) || []).length, 1, "one edit toggle in the page");
  assert.ok(roadmapTab().includes("data-roadmap-edit-toggle"), "and it is still the Roadmap toolbar's");
});

// =============================================================== 2. THE RENDERER

test("#67 renderer: Overview and Roadmap no longer paint the unclassified note or the care budget", async () => {
  const harness = makeHarness();
  await loadProject(harness, "reports-empty");
  for (const id of ["project-overview", "next-pending-runs", "overview-activity", "run-queue-v3", "roadmap-v3-tree"]) {
    const html = harness.element(id).innerHTML;
    assert.equal(html.includes("Unclassified live runs"), false, `${id} still paints the unclassified note`);
    assert.equal(html.includes("care-budget-panel"), false, `${id} paints the care budget`);
    assert.equal(html.includes("Not configured"), false, `${id} says "Not configured" on a main screen`);
  }
  // Still painted — only moved: the surface carries both, from the same snapshot.
  assert.match(harness.element("project-config-unclassified").innerHTML, /Unclassified live runs/);
  assert.match(harness.element("roadmap-care-budget").innerHTML, /care-budget-panel/);
});

test("#67 renderer: the surface paints the live unclassified runs in queue order, each one openable", () => {
  const harness = makeHarness();
  inContext(harness, `appData = ${JSON.stringify({ snapshot: { validation_summary: { reports: [UNCLASSIFIED_TWO] } } })}`);
  inContext(harness, "renderProjectConfig(appData)");
  const html = harness.element("project-config-unclassified").innerHTML;
  assert.match(html, /Unclassified live runs/);
  assert.match(html, /v3-ov-note-count">2</);
  assert.ok(html.indexOf("#3 First") < html.indexOf("#7 Second"), "listed in queue order");
  assert.match(html, /data-v3-run="RUN-A-001"/);
  assert.match(html, /data-v3-run="RUN-B-002"/);
});

test("#67 renderer: ONE sentence says what classification means here — and that it is not objectives or phases", () => {
  const harness = makeHarness();
  const html = inContext(harness, `v3UnclassifiedNoteHtml(${JSON.stringify({ snapshot: { validation_summary: { reports: [UNCLASSIFIED_TWO] } } })})`);
  const meaning = /<span class="v3-ov-note-meaning">([\s\S]*?)<\/span>/.exec(html);
  assert.ok(meaning, "the note carries its meaning line");
  const sentence = meaning[1];
  assert.match(sentence, /risk classification/, "it names WHICH classification");
  assert.match(sentence, /severity and closure mode/, "and what it is for");
  assert.match(sentence, /nothing to do with objectives or phases/, "and what it is NOT — the operator's own question");
  assert.equal((sentence.match(/\. /g) || []).length, 0, "one sentence, not a paragraph");
  // It comes first: the word is defined before the note talks about runs that lack it.
  assert.ok(html.indexOf("v3-ov-note-meaning") < html.indexOf("v3-ov-note-body"), "the meaning precedes the body");
  // And everything the note said before is still said.
  assert.match(html, /This is information, not an error/);
});

test("#67 care budget: the panel reads EXACTLY as before — byte-identical HTML in five states", () => {
  const paint = (careBudget, editMode, fill) => {
    const harness = makeHarness();
    const snapshot = { taxonomy_model: { care_budget: classification.buildCareBudgetDeclaration(careBudget) } };
    inContext(harness, `appData = ${JSON.stringify({ snapshot })}`);
    if (editMode) inContext(harness, "v3EditMode = true");
    inContext(harness, fill ? "careBudgetFillDefaults()" : "renderCareBudget(appData)");
    return harness.element("roadmap-care-budget").innerHTML;
  };
  const own = GOLDEN.own_budget;
  const now = {
    "unconfigured-readonly": paint(null, false, false),
    "unconfigured-editing": paint(null, true, false),
    "unconfigured-editing-filled": paint(null, true, true),
    "configured-readonly": paint(own, false, false),
    "configured-editing": paint(own, true, false)
  };
  assert.deepEqual(Object.keys(now), Object.keys(GOLDEN.states));
  for (const [state, html] of Object.entries(now)) {
    assert.equal(html, GOLDEN.states[state], `the care budget panel changed in state "${state}"`);
  }
});

test("#67 control: shown for a project whose envelope carries a care budget", () => {
  const harness = makeHarness();
  const snapshot = { taxonomy_model: { care_budget: classification.buildCareBudgetDeclaration(null) } };
  harness.element("project-config-open").hidden = true;
  inContext(harness, `appData = ${JSON.stringify({ snapshot })}`);
  inContext(harness, "renderProjectConfig(appData)");
  assert.equal(harness.element("project-config-open").hidden, false);
});

test("#67 control: shown for a project with unclassified live runs even without a care budget block", () => {
  const harness = makeHarness();
  harness.element("project-config-open").hidden = true;
  inContext(harness, `appData = ${JSON.stringify({ snapshot: { validation_summary: { reports: [UNCLASSIFIED_TWO] } } })}`);
  inContext(harness, "renderProjectConfig(appData)");
  assert.equal(harness.element("project-config-open").hidden, false);
});

test("#67 control: a project with NOTHING to show gets no control at all — not an empty dialog, not 'not configured'", async () => {
  const harness = makeHarness();
  await loadProject(harness, "lanes");
  assert.equal(harness.element("project-config-open").hidden, true, "the control is hidden");
  assert.equal(harness.element("roadmap-care-budget").innerHTML, "");
  assert.equal(harness.element("project-config-unclassified").innerHTML, "");
  // Hidden means unreachable: asking to open it does nothing.
  inContext(harness, "openProjectConfig()");
  assert.equal(harness.element("project-config").classList.contains("open"), false);
});

test("#67 dialog: opens and closes with the console's own .open idiom, and the veil follows", async () => {
  const harness = makeHarness();
  await loadProject(harness, "reports-empty");
  const dialog = harness.element("project-config");
  const veil = harness.element("project-config-overlay");
  inContext(harness, "openProjectConfig()");
  assert.equal(dialog.classList.contains("open"), true);
  assert.equal(veil.classList.contains("open"), true);
  assert.equal(dialog.getAttribute("aria-hidden"), "false");
  assert.equal(inContext(harness, "projectConfigIsOpen()"), true);
  inContext(harness, "closeProjectConfig()");
  assert.equal(dialog.classList.contains("open"), false);
  assert.equal(veil.classList.contains("open"), false);
  assert.equal(dialog.getAttribute("aria-hidden"), "true");
  assert.equal(inContext(harness, "projectConfigIsOpen()"), false);
});

test("#67 dialog: Escape closes it — and only when it is open", async () => {
  const harness = makeHarness();
  await loadProject(harness, "reports-empty");
  inContext(harness, "globalThis.__stopped = 0");
  const escape = "({ key: 'Escape', stopImmediatePropagation() { globalThis.__stopped += 1; } })";
  assert.equal(inContext(harness, `projectConfigHandleEscape(${escape})`), false, "closed: Escape is not its to take");
  assert.equal(harness.sandbox.__stopped, 0);
  inContext(harness, "openProjectConfig()");
  assert.equal(inContext(harness, "projectConfigHandleEscape({ key: 'Enter', stopImmediatePropagation() {} })"), false);
  assert.equal(inContext(harness, `projectConfigHandleEscape(${escape})`), true);
  assert.equal(harness.sandbox.__stopped, 1, "it swallows the Escape, so the drawer's handler does not also fire");
  assert.equal(harness.element("project-config").classList.contains("open"), false);
});

test("#67 dialog: a run in the list opens its detail, and Back at the root returns to the dialog", async () => {
  const harness = makeHarness();
  await loadProject(harness, "reports-empty");
  inContext(harness, "openProjectConfig()");
  inContext(harness, "projectConfigOpenRun('RUN-EMPTY-INDEX-ONE-001')");
  assert.equal(harness.element("project-config").classList.contains("open"), false, "the dialog steps aside for the drawer");
  assert.equal(harness.element("run-drawer").classList.contains("open"), true, "the run's detail is open");
  assert.equal(inContext(harness, "v3DetailOrigin"), "Project configuration", "and its Back names where it came from");
  // The same as from Overview before: a run opened from here offers no edit button of its own.
  assert.equal(inContext(harness, "v3RoadmapOriginActive()"), false, "no new edit shortcut through the list");
  inContext(harness, "v3BackRunDetail()");
  assert.equal(harness.element("run-drawer").classList.contains("open"), false);
  assert.equal(harness.element("project-config").classList.contains("open"), true, "Back lands on the dialog it named");
});

test("#67 dialog: a project switch closes it, hides the control and blanks both slots", async () => {
  const harness = makeHarness();
  await loadProject(harness, "reports-empty");
  inContext(harness, "openProjectConfig()");
  assert.equal(harness.element("project-config-open").hidden, false);
  harness.sandbox.resetProjectScopedState();
  assert.equal(harness.element("project-config").classList.contains("open"), false, "nothing of one project stays open over the next");
  assert.equal(harness.element("project-config-open").hidden, true, "the next project decides its own control");
  assert.equal(harness.element("roadmap-care-budget").innerHTML, "");
  assert.equal(harness.element("project-config-unclassified").innerHTML, "");
});

test("#67 write path: opening the dialog turns NO edit mode on — the care budget still asks for Edit roadmap", async () => {
  const harness = makeHarness();
  await loadProject(harness, "reports-empty");
  inContext(harness, "openProjectConfig()");
  assert.equal(inContext(harness, "v3EditMode"), false);
  const html = harness.element("roadmap-care-budget").innerHTML;
  assert.equal(/<input/.test(html), false, "no write affordance with edit mode off");
  assert.match(html, /Turn on <strong>Edit roadmap<\/strong> to change this\./);
});

// =============================================================== 3. THE STYLESHEET

test("#67 stylesheet: the control is quiet chrome — no alarm colour, no filled accent — and [hidden] really hides it", () => {
  const rules = Array.from(CSS.matchAll(/(^|\n)([^{}\n]*\.project-config-btn[^{}]*)\{([^}]*)\}/g))
    .map((match) => ({ selector: match[2].trim(), body: match[3] }));
  assert.ok(rules.length, "the control declares its own rules");
  for (const rule of rules) {
    assert.equal(/--(red|amber|green)[\w-]*|--accent-solid|--accent-bg|--accent-chip-bg/.test(rule.body), false,
      `${rule.selector} paints the control like something that needs attention`);
  }
  // A class that sets `display` beats the `hidden` attribute; without this the control would show
  // for a project that has nothing to configure.
  assert.ok(rules.some((rule) => /\[hidden\]/.test(rule.selector) && /display:\s*none/.test(rule.body)),
    "the hidden control is display:none");
  assert.match(CSS, /\.project-config\s*\{/, "the dialog declares its own size on its own class");
});
