// RUN-CONSOLE-REPORT-QA-REPAIRS-001 — the four defects the OPERATOR found by looking at the
// screen, pinned so they cannot come back. None of them was found by a failing test: the
// suite was green at 643 of 644 while every one of them was present, which is the whole
// argument for human QA and is the reason these assertions exist at all.
//
// The renderer is the shipped classic script, loaded whole into node:vm exactly as the other
// report suites load it; what runs here is what the browser runs.

import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const RENDERER = join(REPO_ROOT, "project-console", "assets", "run-report-renderer.js");
const RENDERER_CSS = join(REPO_ROOT, "project-console", "assets", "run-report-renderer.css");
const FIXTURES = join(HERE, "fixtures", "reports");
const QA_LESSON = join(HERE, "fixtures", "reports-qa", "reports", "RUN-QA-REPORT-LESSON-001");

const CASE_1 = readFileSync(join(FIXTURES, "CASO-1-audit-contenido.report.json"), "utf8");
const CASE_2 = readFileSync(join(FIXTURES, "CASO-2-development.report.json"), "utf8");
const CASE_3 = readFileSync(join(FIXTURES, "CASO-3-creacion-leccion.report.json"), "utf8");
const CASE_4 = readFileSync(join(FIXTURES, "CASO-4-sin-qa.report.json"), "utf8");
const ALL_CASES = [CASE_1, CASE_2, CASE_3, CASE_4];

function loadRenderer() {
  const sandbox = { console };
  vm.createContext(sandbox);
  vm.runInContext(readFileSync(RENDERER, "utf8"), sandbox, { filename: RENDERER });
  return sandbox;
}

function makeContainer() {
  const handlers = {};
  return {
    innerHTML: "",
    attributes: new Map(),
    classList: { added: new Set(), add(...names) { names.forEach((n) => this.added.add(n)); } },
    setAttribute(name, value) { this.attributes.set(name, String(value)); },
    addEventListener(type, fn) { handlers[type] = fn; },
    querySelector() { return null; },
    handlers
  };
}

function mount(rr, input) {
  const container = makeContainer();
  const handle = rr.renderRunReport(container, input);
  return { container, handle };
}

// Every card of a report, as one string per step — the surface only ever paints ONE card at
// a time, so a sweep has to walk them.
function everyCard(rr, input, lang) {
  const { handle } = mount(rr, input);
  handle.state.lang = lang || "en";
  const T = rr.rrT(handle.state.lang);
  return rr.rrSteps(handle.state.report, T).map((s) => {
    handle.goStep(s.id);
    return rr.rrRootHtml(handle.state);
  });
}

// ---------------------------------------------------------------------------
// DEFECT 1 — "If rejected": the BLOCK is not duplicated; the PHRASE is, and the phrase
// belongs to the emitter. The fold was real and is repaired.
//
// The operator reported the block painted twice and uncollapsible, and the operator was
// RIGHT ABOUT THE SCREEN. What is doubled is not the block: it is the words. The renderer
// heads the block "Si se rechaza", and the lesson report's own prose OPENS by restating the
// same phrase — so the operator reads it, then reads it again one line down, stacked.
//
// The renderer's half is measured below and pinned: one block per card, one construction
// site per card builder, the text through once. The emitter's half — a report whose prose
// repeats the heading it will be printed under — is the ENVELOPE's, exactly like the other
// half of defect 2 and all of defect 5, and this run does NOT rewrite a report's words.
// ---------------------------------------------------------------------------

test("defect 1: the if-rejected BLOCK is built once per card — swept over every step of all four cases", () => {
  const rr = loadRenderer();
  for (const [n, input] of ALL_CASES.entries()) {
    for (const lang of ["en", "es"]) {
      for (const html of everyCard(rr, input, lang)) {
        const blocks = (html.match(/class="rr-if-rejected/g) || []).length;
        assert.ok(blocks <= 1, `case ${n + 1} (${lang}): ${blocks} if-rejected blocks on one card`);
      }
    }
  }
});

test("defect 1: what the operator saw twice is the emitter's prose restating the renderer's heading", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_3);
  handle.state.lang = "es";
  handle.goStep("L1");
  const T = rr.rrT("es");
  const item = rr.rrItemById(handle.state.report, "L1");
  // ONE block, ONE heading written by this view.
  assert.equal((container.innerHTML.match(/class="rr-if-rejected/g) || []).length, 1);
  // ONE occurrence in the datum — the emitter wrote the phrase once, inside its own sentence.
  assert.equal((item.if_rejected.match(/[Ss]i se rechaza/g) || []).length, 1);
  assert.ok(item.if_rejected.includes("Si se rechaza, el borrador se retira"),
    "the report's prose opens by restating what it is filed under");
  // Which is why the SCREEN carries it twice: heading plus body, from two different authors.
  const onScreen = (container.innerHTML.match(/[Ss]i se rechaza/g) || []).length;
  assert.equal(onScreen, 2, "the heading and the emitter's opening words, stacked");
  assert.equal(container.innerHTML.split(T.ifRejected + "</span>").length - 1, 1,
    "and only ONE of the two is a label this renderer wrote");
  // The report's own words travel VERBATIM. Trimming them to spare the repetition would be
  // this view editing what the run said, which it must never do.
  assert.ok(container.innerHTML.includes(item.if_rejected.slice(0, 60)), "the prose is not rewritten");
});

test("defect 1: the R1 the operator was reading carries its consequence exactly once, from data that says it once", () => {
  const rr = loadRenderer();
  const { handle } = mount(rr, CASE_1);
  const report = handle.state.report;
  const r1 = rr.rrItemById(report, "R1");
  // The datum itself: one item, one field, one string.
  assert.equal(typeof r1.if_rejected, "string");
  assert.equal(report.items.filter((it) => it.item_id === "R1").length, 1, "one item carries this id");
  handle.goStep("R1");
  const html = rr.rrRootHtml(handle.state);
  assert.equal((html.match(/class="rr-if-rejected/g) || []).length, 1);
  assert.equal(html.split(r1.if_rejected).length - 1, 1, "the prose reaches the screen once");
});

test("defect 1: the block FOLDS like every other section — a details, open on arrival, on items and on decisions alike", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_1);
  handle.goStep("R1");
  assert.ok(/<details class="rr-if-rejected[^"]*" open>/.test(container.innerHTML),
    "the item's consequence is a details, and it arrives expanded");
  assert.ok(/<summary>/.test(container.innerHTML.split('class="rr-if-rejected')[1]),
    "with a summary to click");
  // A decision's own if-rejected folds the same way — two card builders, one behaviour. No
  // shipped fixture exercises that branch (every decision declares `scope_if_rejected`
  // instead), so it is driven by presence, which is the only way this renderer decides
  // anything.
  const synthetic = JSON.stringify({
    run_id: "RUN-X",
    self_decisions: [{ decision_id: "SD-X", what: "una decisión", if_rejected: "la consecuencia" }]
  });
  const solo = mount(rr, synthetic);
  solo.handle.goStep("SD-X");
  assert.ok(/<details class="rr-if-rejected" open>/.test(solo.container.innerHTML),
    "the decision's consequence folds too");
  assert.ok(solo.container.innerHTML.includes("la consecuencia"), "and still carries its text");
  // And the CSS actually dresses the summary, rather than leaving a bare disclosure triangle.
  const css = readFileSync(RENDERER_CSS, "utf8");
  assert.ok(css.includes(".rr-if-rejected > summary"), "the folded block has its own summary rule");
});

// ---------------------------------------------------------------------------
// DEFECT 2 — the JSON key is never the label.
//
// One defect in twelve places. The sweep below is the real pin: it does not name the twelve,
// it walks every label POSITION on every card of every fixture in both languages and refuses
// anything shaped like an identifier. A thirteenth site added later fails here without anyone
// remembering to extend a list.
// ---------------------------------------------------------------------------

// A label position is a place the view puts a NAME: the key column of a key/value row, the
// key of a diff row, the first cell of the counts table, an unchanged tag. Values are not
// swept — a value legitimately carries paths, tokens and ids.
function labelsIn(html) {
  const grab = (re) => [...html.matchAll(re)].map((m) => m[1]);
  return [
    ...grab(/class="rr-kv-k">([^<]*)</g),
    ...grab(/class="rr-diff-key">([^<]*)</g)
  ];
}

// snake_case or dotted.identifier — what a key looks like and a written label does not.
const LOOKS_LIKE_A_KEY = /^[a-z][a-z0-9]*([_.][a-z0-9]+)+$/;

test("defect 2: no label anywhere on any card of any fixture is a raw JSON key — swept, not listed", () => {
  const rr = loadRenderer();
  let swept = 0;
  for (const [n, input] of ALL_CASES.entries()) {
    for (const lang of ["en", "es"]) {
      for (const html of everyCard(rr, input, lang)) {
        for (const label of labelsIn(html)) {
          swept += 1;
          assert.ok(!LOOKS_LIKE_A_KEY.test(label.trim()),
            `case ${n + 1} (${lang}): the operator reads the identifier ${JSON.stringify(label)}`);
        }
      }
    }
  }
  assert.ok(swept > 200, `the sweep has a real corpus behind it, not a label or two (${swept})`);
});

test("defect 2: the gate block — the site the ticket named — reads as words, in both languages", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_1);
  // English.
  let html = container.innerHTML;
  for (const key of ["verification_reason", "gate_reason", "items_note", "verification_note"]) {
    assert.ok(!html.includes(key), `the key ${key} reaches the screen`);
  }
  assert.ok(html.includes("Why no verification"), "the reason row is named");
  assert.ok(html.includes(">Gate<"), "so is the gate row");
  // A verification nobody ran said the literal string "null". Now it says so in prose.
  assert.ok(!/class="rr-kv-v">null</.test(html), 'the operator no longer reads "null" as a value');
  assert.ok(html.includes("no verification"), "the absence is stated in words");
  // Spanish — the same rows, the same absence of keys.
  handle.state.lang = "es";
  handle.redraw();
  html = container.innerHTML;
  for (const key of ["verification_reason", "gate_reason", "items_note"]) {
    assert.ok(!html.includes(key), `the key ${key} reaches the Spanish screen`);
  }
  assert.ok(html.includes("Por qué no hay verificación"), "the Spanish label is written, not derived");
  assert.ok(html.includes("Compuerta"), "and so is the gate's");
});

test("defect 2: the metadata block names its own fields, and the two languages differ", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_1);
  const en = container.innerHTML;
  for (const key of ["schema_version", "run_id", "queue_order", "execution_path", "emitted_by", "source_commit", "log_dir"]) {
    assert.ok(!en.includes('class="rr-kv-k">' + key + "<"), `metadata still labels a row ${key}`);
  }
  assert.ok(en.includes("Schema version") && en.includes("Queue order") && en.includes("Emitted by"));
  handle.state.lang = "es";
  handle.redraw();
  const es = container.innerHTML;
  assert.ok(es.includes("Versión de esquema") && es.includes("Orden en la cola") && es.includes("Emitido por"));
  assert.ok(!es.includes("Schema version"), "the English label does not leak into the Spanish surface");
});

test("defect 2: the unchanged list translates the identifiers it can name and leaves the emitter's prose alone", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_1);
  handle.state.lang = "es";
  handle.goStep("R1");
  const html = container.innerHTML;
  // R1 declares ["statement", "options", "feedback"] — three contract field names.
  assert.ok(html.includes("Enunciado") && html.includes("Opciones") && html.includes("Retroalimentación"),
    "the three named fields arrive in Spanish");
  assert.ok(!/class="rr-tag rr-tag-neutral">statement</.test(html), "and none of them as its key");
  // THE OTHER HALF IS NOT REPAIRED HERE. C5 declares prose in the same array; it must travel
  // verbatim, because inventing a translation for it would be the view making up what the
  // run said. The emitter writing identifiers next to prose is the ENVELOPE's defect.
  handle.goStep("C5");
  assert.ok(container.innerHTML.includes("valores de todas las opciones"),
    "the emitter's own sentence survives untouched — its repair belongs to the other thread");
});

test("defect 2: a key this renderer cannot name is humanised, never printed raw and never invented", () => {
  const rr = loadRenderer();
  // `pilot_deviation` and the declared blocks carry fields the REPORT chose. The view cannot
  // translate them without knowing a domain, so it makes them readable and stops there.
  assert.equal(rr.rrHumanKey("how_the_separation_is_preserved"), "how the separation is preserved");
  assert.equal(rr.rrHumanKey("who_could"), "who could");
  assert.equal(rr.rrLabelForKey("some_key_nobody_declared", "es"), "some key nobody declared",
    "an unknown key is not given a made-up Spanish name");
  // A dotted key labels its head from the table and humanises its tail.
  assert.equal(rr.rrLabelForKey("verification.exit", "en"), "Verification · exit");
  assert.equal(rr.rrLabelForKey("verification.exit", "es"), "Verificación · exit");
  const { container } = mount(rr, CASE_1);
  assert.ok(container.innerHTML.includes("how the separation is preserved"), "the deviation's fields read as words");
  assert.ok(!container.innerHTML.includes("how_the_separation_is_preserved"), "and never as an identifier");
});

// ---------------------------------------------------------------------------
// DEFECT 3 — an `info` item is shown, is not signed, and does not count.
//
// Declared by FIELD (`requires_verdict: false`), never by the item's `type`: a view that
// knew which type needs no signature would know a domain, and that is the rule this renderer
// is built to not break. The domain-blind suite proves the absence of the branch; these
// prove the behaviour.
// ---------------------------------------------------------------------------

test("defect 3: the counter went from 12 to 11 while the operator still walks 12 cards", () => {
  const rr = loadRenderer();
  const { handle } = mount(rr, CASE_1);
  const T = rr.rrT("en");
  const steps = rr.rrSteps(handle.state.report, T);
  // BEFORE this run the two numbers were the same one, and the info item was in both.
  assert.equal(steps.length, 12, "twelve steps are still walked — the item is SHOWN");
  const progress = rr.rrProgress(handle.state.report, handle.state, T);
  assert.equal(progress.total, 11, "eleven ask for a verdict — the info item does NOT COUNT");
  assert.equal(progress.done, 0);
  const na = steps.filter((s) => !s.signs);
  assert.deepEqual([...na.map((s) => s.id)], ["I1"], "exactly the item that declared it needs none");
});

test("defect 3: the item is SHOWN and NOT SIGNED — its card renders whole, without a verdict bar", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_1);
  handle.goStep("I1");
  const html = container.innerHTML;
  assert.ok(html.includes("10 preguntas donde un error plausible"), "the item still renders whole");
  assert.ok(html.includes("No es defecto. Es información para decidir"), "with its evidence");
  assert.ok(!html.includes('data-rr-id="I1" data-rr-value="APPROVED"'), "no verdict is asked of it");
  assert.ok(!html.includes("What is your verdict?"), "the question is not put");
  assert.ok(html.includes("no verdict needed"), "and the card says why, in words");
  assert.ok(!html.includes('rr-status">pending'), "it is never pending: pending is a debt, and it owes nothing");
});

test("defect 3: it never blocks the signature, and never hides in the pending filter", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_1);
  const T = rr.rrT("en");
  // Sign the ELEVEN that ask, leaving the info item untouched, and the gate opens.
  rr.rrSteps(handle.state.report, T).filter((s) => s.signs)
    .forEach((s) => rr.rrSetRec(handle.state, s.id, { verdict: "APPROVED" }));
  handle.state.reviewer = "QA";
  assert.deepEqual([...rr.rrMissing(handle.state.report, handle.state, T)], [],
    "an unsigned info item does not stand between the operator and the signature");
  assert.equal(rr.rrSignBlocks(handle.state.report, handle.state, T).ready, true);
  // And the guard, which is the other thing that can refuse APPROVED, ignores it too.
  assert.equal(rr.rrRunApprovedGuard(handle.state.report, handle.state, T).available, true);
  // The pending filter lists what is owed. Nothing is, so only the run remains.
  handle.state.v = {};
  handle.state.filter = "pending";
  handle.redraw();
  const rows = [...container.innerHTML.matchAll(/data-rr-act="goto" data-rr-id="([^"]*)"/g)].map((m) => m[1]);
  assert.ok(!rows.includes("I1"), "an item that owes nothing is never listed as pending");
});

test("defect 3: a report that declares nothing is untouched — every step still signs", () => {
  const rr = loadRenderer();
  for (const input of [CASE_2, CASE_3, CASE_4]) {
    const { handle } = mount(rr, input);
    const T = rr.rrT("en");
    const steps = rr.rrSteps(handle.state.report, T);
    assert.deepEqual([...steps.filter((s) => !s.signs)], [],
      "absent means what it always meant: the item asks for a verdict");
    assert.equal(rr.rrProgress(handle.state.report, handle.state, T).total, steps.length);
  }
});

// ---------------------------------------------------------------------------
// DEFECT 4 — the preview pane, seen painting something at last.
//
// NO TEST IN THE SUITE MENTIONED `iframe` before this one, and the lesson fixture shipped
// report.json with no assets folder, so the branch that renders a real artefact was
// unexercised by anyone. The fixture now carries two real assets and the branch is driven
// here in both of its shapes.
//
// THE SANDBOX QUESTION IS OPEN AND IS NOT SETTLED BY THIS TEST. The pane is a same-origin
// `<iframe>` with no `sandbox` attribute, and the console serves project-authored HTML next
// to its three write routes. That is named in the record of this run as a STOP; nothing here
// should be read as ruling on it.
// ---------------------------------------------------------------------------

test("defect 4: the lesson fixture ships two real assets, and they are distinguishable", () => {
  const web = join(QA_LESSON, "assets", "leccion-web.html");
  const slide = join(QA_LESSON, "assets", "leccion-slide.html");
  assert.ok(existsSync(web), "the web preview exists on disk");
  assert.ok(existsSync(slide), "the slide preview exists on disk");
  const webText = readFileSync(web, "utf8");
  const slideText = readFileSync(slide, "utf8");
  assert.notEqual(webText, slideText, "two assets, not one copied twice");
  // The operator must be able to tell the panes apart at a glance — that is the whole point
  // of the compare view.
  assert.ok(webText.includes("versión web") && slideText.includes("versión diapositiva"));
  // Inert by construction: a preview is a document to READ. Nothing here executes.
  for (const [name, text] of [["web", webText], ["slide", slideText]]) {
    assert.ok(!/<script/i.test(text), `the ${name} asset carries no script`);
    assert.ok(!/https?:\/\//i.test(text), `the ${name} asset fetches nothing remote`);
  }
  // And the report POINTS at them: a declared path that resolves to nothing on disk is the
  // gap this defect was.
  const report = JSON.parse(readFileSync(join(QA_LESSON, "report.json"), "utf8"));
  const previews = report.items[0].subject.previews;
  assert.equal(previews.length, 2);
  for (const preview of previews) {
    assert.ok(existsSync(join(HERE, "fixtures", "reports-qa", preview.path)),
      `the declared preview ${preview.path} is not on disk`);
  }
});

test("defect 4: a probe that answers ok turns the pane into an iframe pointing at the declared asset", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_3);
  handle.goStep("L1");
  // Before the probe answers, the pane is honest about what it could not reach.
  assert.ok(!container.innerHTML.includes("<iframe"), "nothing is framed until the path is known to resolve");
  assert.ok(container.innerHTML.includes("rr-frame-missing"), "and the unreached path is named");
  // The probe answering is the ONLY thing that flips it — the same state `rrCheckPreviews`
  // writes when fetch resolves ok.
  const previews = handle.state.report.items[0].subject.previews;
  previews.forEach((p) => { handle.state.previewStatus[p.path] = "ok"; });
  handle.redraw();
  const html = container.innerHTML;
  const frames = [...html.matchAll(/<iframe[^>]*src="([^"]*)"[^>]*>/g)].map((m) => m[1]);
  assert.equal(frames.length, 2, "both panes render, because two previews compare by default");
  // vm arrays carry the sandbox's prototypes; spreading into host arrays keeps the strict
  // asserts about VALUES, which is what this judges.
  assert.deepEqual(frames.sort(), [...previews.map((p) => p.path)].sort(),
    "each frame points at the path the report declared, unaltered");
  assert.ok(!html.includes("rr-frame-missing"), "no pane still claims it could not reach the asset");
  assert.ok(html.includes("rr-preview-grid-compare"), "and the compare grid is what the operator sees");
});

test("defect 4: one preview alone renders a single frame, and a probe that fails never frames anything", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_3);
  handle.goStep("L1");
  const previews = handle.state.report.items[0].subject.previews;
  // Only the first resolves: one frame, one honest missing pane, in the compare view.
  handle.state.previewStatus[previews[0].path] = "ok";
  handle.state.previewStatus[previews[1].path] = "missing";
  handle.redraw();
  assert.equal((container.innerHTML.match(/<iframe/g) || []).length, 1, "only the reachable one is framed");
  assert.equal((container.innerHTML.match(/rr-frame-missing/g) || []).length, 1, "the other says so");
  // A probe still in flight is not an answer, and must not frame.
  handle.state.previewStatus[previews[0].path] = "checking";
  handle.redraw();
  assert.ok(!container.innerHTML.includes("<iframe"), "a pending probe frames nothing");
});
