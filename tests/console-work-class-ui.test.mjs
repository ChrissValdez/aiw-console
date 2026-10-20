// [#69] THE CONSOLE SHOWS THE WORK CLASS — context/CLASIFICACION-DE-RUNS.md §9, D-075, D-080.
//
// What #68 fixed and this run only paints: `work_class` is an OPTIONAL stored key with a closed
// vocabulary of five values; the RELATION between runs is NOT a field (D-080 (B), §10) and is read
// from `depends_on` and the declared lanes, which the console already shows.
//
// Four layers, each measured where it lives:
//
//   1. the label   — one declared label per value, the table covering the engine's vocabulary
//                    exactly, and the same tag on both Roadmap surfaces (Run Queue and tree)
//   2. absence     — a run with no class paints NOTHING (D-075): no "unclassified", no
//                    "undefined", no hole. Proved against a golden captured BEFORE the change:
//                    a class-less project renders byte for byte what it rendered before #69
//   3. the drawer  — the class sits in the run's Classification section, as a stored value,
//                    and a run carrying only the class is not called "not classified"
//   4. the filter  — the batch selector copied onto the class: only when some run carries one,
//                    only the classes present, composed with lane and batch, reset per project
//
// And one guard for the relation: nothing new is painted for it, because there is no datum.
//
// Every import is a NAMESPACE import, the #68 discipline: a missing named export would fail the
// whole file at link time and count as one red, hiding which assertions were red before.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import * as classification from "../tools/classification/classification.mjs";
import * as consoleDom from "./helpers/console-dom.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const RENDERER = join(REPO_ROOT, "project-console", "assets", "project-console.js");
const STYLESHEET = join(REPO_ROOT, "project-console", "assets", "project-console.css");
const LANES_ROOT = join(HERE, "fixtures", "lanes", "project");
// Captured on 2026-10-19 with the renderer as #68 left it, before this run changed a line.
const GOLDEN = JSON.parse(readFileSync(join(HERE, "fixtures", "work-class-ui", "class-less-render.golden.json"), "utf8"));
const NOW = "2026-07-31T10:45:14.552Z";

// The labels this run declares, one per value, written ONCE here as the expectation. Each is the
// name §9 gives the class, in the console's language: nothing the value does not say.
const LABELS = {
  FUNCTIONALITY: "Functionality",
  DOCUMENTATION: "Documentation",
  RESEARCH: "Research",
  UX_DESIGN: "UX design",
  CONTENT: "Content",
};

// Six of the twelve fixture runs get a class; CONTENT is given to none, so the filter must not
// offer it. Two runs per class where it can be, so a count of 1 is not an accident.
const CLASSES = {
  "RUN-FIX-BASE-001": "FUNCTIONALITY",
  "RUN-FIX-COMP2-001": "FUNCTIONALITY",
  "RUN-FIX-DOC-COMP1-001": "DOCUMENTATION",
  "RUN-FIX-DOC-COMP2-001": "DOCUMENTATION",
  "RUN-FIX-OPS-SETUP-001": "RESEARCH",
  "RUN-FIX-COMP3-001": "UX_DESIGN",
};

async function loadLanes(classes = {}) {
  const harness = consoleDom.createConsoleHarness({ rendererPath: RENDERER, rootsByKey: new Map([["lanes", LANES_ROOT]]) });
  harness.sandbox.setClassificationModel(classification);
  harness.sandbox.resetProjectScopedState();
  harness.sandbox.setActiveProjectBase("/projects/lanes/");
  await harness.sandbox.loadActiveProject();
  await harness.flush();
  if (Object.keys(classes).length) {
    // The class is written onto the loaded runs and both subviews are painted again — the same
    // data the projection would carry once a canonical stores the key.
    vm.runInContext(`(function (classes) {
      appData.roadmapV3.objectives.forEach((o) => (o.phases || []).forEach((p) => (p.runs || []).forEach((r) => {
        if (Object.prototype.hasOwnProperty.call(classes, r.run_id)) r.work_class = classes[r.run_id];
      })));
      renderRunQueueV3(appData);
      renderRoadmapV3(appData);
    })(${JSON.stringify(classes)})`, harness.sandbox);
  }
  return harness;
}

const run = (harness, expression) => vm.runInContext(expression, harness.sandbox);
const tagsOf = (harness, runJson) => run(harness, `v3RunRowTags(v3Model(appData), ${JSON.stringify(runJson)})`);
const sectionOf = (harness, runJson) => run(harness, `v3ClassificationSection(${JSON.stringify(runJson)})`);
const ids = (html) => Array.from(html.matchAll(/data-v3-run="([^"]+)"/g)).map((m) => m[1]);
// The markup of ONE row: from its data-v3-run attribute to the next row's.
const rowHtml = (html, runId) => {
  const start = html.indexOf(`data-v3-run="${runId}"`);
  assert.ok(start !== -1, `${runId} must be painted`);
  const next = html.indexOf("data-v3-run=", start + 1);
  return html.slice(start, next === -1 ? undefined : next);
};

// =============================================================== 1. THE LABEL

test("W.1: every value of the vocabulary renders as a small tag carrying its declared label", async () => {
  const harness = await loadLanes();
  for (const [token, label] of Object.entries(LABELS)) {
    const html = tagsOf(harness, { run_id: "RUN-X-001", queue_order: 1, work_class: token });
    assert.match(html, new RegExp(`<span class="v3-class-tag" title="[^"]*">${label}</span>`), `${token} must read "${label}"`);
    assert.equal((html.match(/v3-class-tag/g) || []).length, 1, `${token}: exactly one class tag`);
  }
});

test("W.2: the label table covers the engine's vocabulary EXACTLY, in its order — one label per value", async () => {
  const harness = await loadLanes();
  const table = JSON.parse(run(harness, "JSON.stringify(V3_WORK_CLASS_LABELS)"));
  assert.deepEqual(Object.keys(table), classification.WORK_CLASSES, "a value without a label, or a label without a value");
  assert.deepEqual(table, LABELS);
  // No label may claim more than its value: the design token keeps its UX (§9), and no label
  // repeats the depth vocabulary of work_type (FUNCTIONAL is a depth, not a class).
  assert.equal(table.UX_DESIGN.startsWith("UX"), true);
  for (const label of Object.values(table)) {
    assert.equal(classification.WORK_TYPES.includes(label.toUpperCase()), false, `${label} reads as a work_type`);
  }
});

test("W.3: the tag says what it is in its title — the stored token, and that it is the kind of work, not the topic", async () => {
  const harness = await loadLanes();
  const html = tagsOf(harness, { run_id: "RUN-X-001", queue_order: 1, work_class: "UX_DESIGN" });
  const title = /<span class="v3-class-tag" title="([^"]*)">/.exec(html);
  assert.ok(title, "the class tag must carry a title");
  assert.match(title[1], /^Work class UX_DESIGN/);
  assert.match(title[1], /kind of work/i);
  assert.match(title[1], /not (what it is about|its topic)/i);
});

test("W.4: both Roadmap surfaces paint the class — the Run Queue and the tree — on exactly the classed rows", async () => {
  const harness = await loadLanes(CLASSES);
  for (const surface of ["run-queue-v3", "roadmap-v3-tree"]) {
    const html = harness.element(surface).innerHTML;
    assert.equal(new Set(ids(html)).size, 12, `${surface}: every fixture run is painted`);
    assert.equal((html.match(/class="v3-class-tag"/g) || []).length, Object.keys(CLASSES).length, `${surface}: one tag per classed run`);
    for (const [runId, token] of Object.entries(CLASSES)) {
      assert.ok(rowHtml(html, runId).includes(`>${LABELS[token]}</span>`), `${surface}: ${runId} must read ${LABELS[token]}`);
    }
    for (const runId of ids(html).filter((id) => !(id in CLASSES))) {
      assert.equal(rowHtml(html, runId).includes("v3-class-tag"), false, `${surface}: ${runId} carries no class and must show none`);
    }
  }
});

test("W.5: the tag sits in the row's existing tag line — after lane and barrier, before the derived chips", async () => {
  const harness = await loadLanes();
  const html = tagsOf(harness, { ...GOLDEN.synthetic.full, work_class: "DOCUMENTATION" });
  const at = (needle) => {
    const index = html.indexOf(needle);
    assert.ok(index !== -1, `${needle} must be present`);
    return index;
  };
  assert.ok(at("v3-lane-tag") < at("v3-barrier-tag"));
  assert.ok(at("v3-barrier-tag") < at("v3-class-tag"));
  assert.ok(at("v3-class-tag") < at("v3-severity-tag is-critical"));
  // The class adds ONE tag and changes nothing around it: removing it gives back the golden row.
  assert.equal(html.replace(/<span class="v3-class-tag"[^>]*>[^<]*<\/span>/, ""), GOLDEN.syntheticRowTags.full);
});

test("W.6: the tag carries NO colour — colour is the row's one chromatic signal and it belongs to severity", () => {
  const css = readFileSync(STYLESHEET, "utf8");
  const start = css.indexOf(".v3-class-tag {");
  assert.ok(start !== -1, "the class tag needs its own base rule");
  const rule = css.slice(start, css.indexOf("}", start));
  for (const token of ["--amber", "--red", "--green", "--blue", "--indigo", "--accent"]) {
    assert.equal(rule.includes(token), false, `the class tag must not take ${token}`);
  }
  // No per-value modifier either: a rule per class would be an invitation to colour one.
  assert.equal(/\.v3-class-tag\.is-|\.v3-class-tag\[/.test(css), false);
  const source = readFileSync(RENDERER, "utf8");
  assert.equal(/v3-class-tag is-/.test(source), false, "the renderer must not emit a per-value modifier");
});

// =============================================================== 2. ABSENCE (D-075)

test("W.7: a project with NO class renders byte for byte what it rendered before #69 — rows, drawer, both surfaces", async () => {
  const harness = await loadLanes();
  const now = JSON.parse(run(harness, `(function () {
    const model = v3Model(appData);
    const rowTags = {}; const rowTagsLaneFiltered = {}; const section = {};
    ${JSON.stringify(GOLDEN.ids)}.forEach((id) => { rowTags[id] = v3RunRowTags(model, model.runsById.get(id)); section[id] = v3ClassificationSection(model.runsById.get(id)); });
    v3SelectedLane = "CHRONICLE";
    ${JSON.stringify(GOLDEN.ids)}.forEach((id) => { rowTagsLaneFiltered[id] = v3RunRowTags(model, model.runsById.get(id)); });
    v3SelectedLane = null;
    const syntheticRowTags = {}; const syntheticSection = {};
    Object.entries(${JSON.stringify(GOLDEN.synthetic)}).forEach(([key, r]) => { syntheticRowTags[key] = v3RunRowTags(model, r); syntheticSection[key] = v3ClassificationSection(r); });
    return JSON.stringify({ rowTags, rowTagsLaneFiltered, section, syntheticRowTags, syntheticSection });
  })()`));
  for (const key of ["rowTags", "rowTagsLaneFiltered", "section", "syntheticRowTags", "syntheticSection"]) {
    for (const id of Object.keys(GOLDEN[key])) {
      assert.equal(now[key][id], GOLDEN[key][id], `${key} of ${id} drifted from the golden`);
    }
  }
  for (const id of ["run-queue-v3", "roadmap-v3-tree", "roadmap-lane-slot"]) {
    assert.equal(harness.element(id).innerHTML, GOLDEN.surfaces[id], `${id} drifted from the golden`);
  }
  run(harness, 'v3SelectedLane = "SAIL"; renderRunQueueV3(appData); renderRoadmapV3(appData);');
  for (const id of ["run-queue-v3", "roadmap-v3-tree", "roadmap-lane-slot"]) {
    assert.equal(harness.element(id).innerHTML, GOLDEN.surfaces[`${id}@SAIL`], `${id} (lane SAIL) drifted from the golden`);
  }
});

test("W.8: an absent class is absent however it is absent — no key, null, empty, not a string — and nothing names it", async () => {
  const harness = await loadLanes();
  const base = { run_id: "RUN-X-001", queue_order: 1, work_type: "FUNCTIONAL", blast_radius: "SYSTEMIC", classified_at: NOW };
  const bareTags = tagsOf(harness, base);
  const bareSection = sectionOf(harness, base);
  // null and "" are refused by the validator (§9.5); if one ever reached the screen it still
  // paints nothing, and certainly not the word "null".
  for (const value of [null, "", "   ", 7, ["UX_DESIGN"]]) {
    const runJson = { ...base, work_class: value };
    assert.equal(tagsOf(harness, runJson), bareTags, `work_class ${JSON.stringify(value)} must paint no tag`);
    assert.equal(sectionOf(harness, runJson), bareSection, `work_class ${JSON.stringify(value)} must add no drawer row`);
  }
  const unclassed = tagsOf(harness, { run_id: "RUN-X-002", queue_order: 2 }) + sectionOf(harness, { run_id: "RUN-X-002", queue_order: 2 });
  for (const word of ["undefined", "null", "nclassified", "No class", "no class", "Work class", "v3-class-tag"]) {
    assert.equal(unclassed.includes(word), false, `a run with no class must not read "${word}"`);
  }
});

test("W.9: a class-less project gets NO class selector — the slot stays empty", async () => {
  const harness = await loadLanes();
  assert.equal(harness.element("roadmap-class-slot").innerHTML, "");
});

// =============================================================== 3. THE DRAWER

test("W.10: a run carrying ONLY the class shows it in its Classification section, open — and is not called unclassified", async () => {
  const harness = await loadLanes();
  const html = sectionOf(harness, { run_id: "RUN-X-001", queue_order: 1, work_class: "UX_DESIGN" });
  assert.match(html, /<details class="v3-section-details" open>/);
  assert.match(html, /Classification <span class="v3-section-count">1<\/span>/);
  assert.match(html, /Work class/);
  // Plain text like the stored rows beside it — the label, then the token as stored. Inside this
  // section a chip is what the DERIVED rows wear, so the class does not wear one here.
  assert.match(html, />UX design<span class="v3-class-token">UX_DESIGN<\/span>/);
  assert.equal(html.includes("v3-class-tag"), false);
  // §9.3: the class does not move the mark, so §1 is still unjudged and the drawer says what that
  // costs — but a run with a class is not "Not classified yet".
  assert.match(html, /no severity and no closure mode/);
  assert.equal(html.includes("Not classified yet"), false);
  for (const token of ["MINOR", "MODERATE", "MAJOR", "CRITICAL", "UNATTENDED", "SEMI_ATTENDED", "ATTENDED", "undefined", "null"]) {
    assert.equal(html.includes(token), false, `a class-only run must not display ${token}`);
  }
});

test("W.11: a classified run with a class shows it FIRST, as a stored row, outside the derived block", async () => {
  const harness = await loadLanes();
  const html = sectionOf(harness, { ...GOLDEN.synthetic.full, work_class: "FUNCTIONALITY" });
  // Five §1 values plus the class (classified_at is shown, not counted — the #43 rule).
  assert.match(html, /Classification <span class="v3-section-count">6<\/span>/);
  const at = (needle) => {
    const index = html.indexOf(needle);
    assert.ok(index !== -1, `${needle} must be present`);
    return index;
  };
  assert.ok(at("Work class") < at("Correctness model"), "the class leads: what kind of work, before how it is judged");
  assert.ok(at("Work class") < at("Derived — computed at read time"), "the class is stored, never in the derived block");
  assert.match(html, />Functionality<span class="v3-class-token">FUNCTIONALITY<\/span>/);
  // And the rest of the section is the golden one, untouched (compared with whitespace collapsed:
  // the row is spliced into the same list, and its indentation is not the claim).
  const collapse = (s) => s.replace(/\s+/g, " ").trim();
  const withoutClass = html
    .replace(/<div class="data-row v3-class-row">[\s\S]*?<\/div>\s*<\/div>/, "")
    .replace('<span class="v3-section-count">6</span>', '<span class="v3-section-count">5</span>');
  assert.equal(collapse(withoutClass), collapse(GOLDEN.syntheticSection.full));
});

test("W.12: a value outside the vocabulary is shown as it is stored, escaped, and said to be outside", async () => {
  const harness = await loadLanes();
  for (const html of [
    tagsOf(harness, { run_id: "RUN-X-001", queue_order: 1, work_class: "<b>ux</b>" }),
    sectionOf(harness, { run_id: "RUN-X-001", queue_order: 1, work_class: "<b>ux</b>" }),
  ]) {
    assert.ok(html.includes("&lt;b&gt;ux&lt;/b&gt;"));
    assert.equal(html.includes("<b>"), false);
    assert.match(html, /outside the work_class vocabulary/);
  }
});

// =============================================================== 4. THE FILTER

test("W.13: the class selector renders beside lane and batch: All classes + only the classes present, in vocabulary order", async () => {
  const harness = await loadLanes(CLASSES);
  const slot = harness.element("roadmap-class-slot").innerHTML;
  assert.match(slot, /Class<\/span>/);
  assert.match(slot, /id="v3-class-select"/);
  assert.match(slot, /aria-label="Filter roadmap by work class"/);
  assert.match(slot, /All classes \(12\)/);
  const order = ["Functionality (2)", "Documentation (2)", "Research (1)", "UX design (1)"].map((text) => {
    const index = slot.indexOf(text);
    assert.ok(index !== -1, `${text} must be offered`);
    return index;
  });
  assert.deepEqual(order, order.slice().sort((a, b) => a - b), "options follow the vocabulary order");
  assert.equal(slot.includes("Content"), false, "a class no run carries is not offered");
  // The lane selector is untouched beside it.
  assert.equal(harness.element("roadmap-lane-slot").innerHTML, GOLDEN.surfaces["roadmap-lane-slot"]);
});

test("W.14: selecting a class filters both subviews, composes with the lane filter, and clearing restores all", async () => {
  const harness = await loadLanes(CLASSES);
  run(harness, 'v3SelectedClass = "DOCUMENTATION"; renderRunQueueV3(appData); renderRoadmapV3(appData);');
  assert.deepEqual([...new Set(ids(harness.element("run-queue-v3").innerHTML))].sort(), ["RUN-FIX-DOC-COMP1-001", "RUN-FIX-DOC-COMP2-001"]);
  assert.deepEqual([...new Set(ids(harness.element("roadmap-v3-tree").innerHTML))].sort(), ["RUN-FIX-DOC-COMP1-001", "RUN-FIX-DOC-COMP2-001"]);
  // DOCUMENTATION runs are on CHRONICLE; on SAIL there is none, and the note says which filters emptied it.
  run(harness, 'v3SelectedLane = "SAIL"; renderRunQueueV3(appData); renderRoadmapV3(appData);');
  assert.equal(ids(harness.element("run-queue-v3").innerHTML).length, 0);
  assert.match(harness.element("roadmap-v3-tree").innerHTML, /No runs on this lane of this class yet\./);
  run(harness, 'v3SelectedLane = "CHRONICLE"; renderRunQueueV3(appData); renderRoadmapV3(appData);');
  assert.equal(new Set(ids(harness.element("run-queue-v3").innerHTML)).size, 2);
  run(harness, "v3SelectedLane = null; v3SelectedClass = null; renderRunQueueV3(appData); renderRoadmapV3(appData);");
  assert.equal(new Set(ids(harness.element("run-queue-v3").innerHTML)).size, 12);
});

test("W.15: the class filter is per-project state — reset clears it like the lane and batch filters", async () => {
  const harness = await loadLanes(CLASSES);
  run(harness, 'v3SelectedClass = "RESEARCH";');
  harness.sandbox.resetProjectScopedState();
  assert.equal(run(harness, "v3SelectedClass"), null);
});

test("W.16: a stale selection over a model with no such class does not filter anything", async () => {
  const harness = await loadLanes(CLASSES);
  const verdict = JSON.parse(run(harness, `(function () {
    const model = v3Model(appData);
    v3SelectedClass = "CONTENT";
    const active = v3ClassFilterActive(model);
    const visible = v3VisibleRuns(model, model.allRuns).length;
    v3SelectedClass = null;
    return JSON.stringify({ active, visible, total: model.allRuns.length });
  })()`));
  assert.equal(verdict.active, false);
  assert.equal(verdict.visible, verdict.total);
});

test("W.17: both render paths call the class selector, and the three older empty notes are kept word for word", () => {
  const source = readFileSync(RENDERER, "utf8");
  for (const name of ["function renderRunQueueV3", "function renderRoadmapV3"]) {
    const body = source.slice(source.indexOf(name));
    assert.ok(body.slice(0, body.indexOf("\n}")).includes("renderClassSelector(model)"), `${name} must call it`);
  }
  for (const note of ["No runs on this lane in this batch yet.", "No runs in this batch yet.", "No runs on this lane yet."]) {
    assert.ok(source.includes(note), note);
  }
});

// =============================================================== 5. THE RELATION (nothing new)

test("W.18: the relation is read from what already travels — nothing on screen names a relation the data does not store", async () => {
  const harness = await loadLanes(CLASSES);
  const queue = harness.element("run-queue-v3").innerHTML;
  // What the console already showed, measured by #69 and pinned here: a planned run waiting on an
  // unfinished dependency says so, by number, in its Run Queue row…
  assert.match(rowHtml(queue, "RUN-FIX-DOC-COMP2-001"), /Waiting on[\s\S]*#4/);
  // …and the lane label (key + position) is on every row of a project that declares lanes.
  assert.match(rowHtml(queue, "RUN-FIX-DOC-COMP2-001"), /CHRONICLE-0\d/);
  // No tag, row or option invents the relation as a datum (D-080 (B)).
  const painted = queue + harness.element("roadmap-v3-tree").innerHTML + harness.element("roadmap-class-slot").innerHTML
    + sectionOf(harness, { ...GOLDEN.synthetic.full, work_class: "DOCUMENTATION", depends_on: ["RUN-FIX-COMP2-001"] });
  for (const word of [/relation/i, /\bparallel\b/i, /\bindependent\b/i, /\bchain\b/i]) {
    assert.equal(word.test(painted), false, `${word} must not be painted`);
  }
});
