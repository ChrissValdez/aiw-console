// RUN-CONSOLE-REPORT-ENVELOPE-RENDER-001 (#60) — the console paints what the envelope
// promises: the emitter's summary (§4) and the criteria coverage (§6), both by PRESENCE OF
// FIELDS, both domain-blind, on the same renderer the browser runs.
//
// Two corpora, on purpose. The REAL case is CASO-1 — the versioned copy of
// projects/cantu-quizzes-latex/reports/RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001/report.json,
// re-copied 2026-08-15 after the emitter adopted the envelope — and every figure asserted
// against it was produced by the derivation this suite exercises, measured on that file.
// The states no real report carries yet (an absence declared with its reason, an empty
// answer, a citation whose evidence key is missing) are proved on minimal inline reports:
// that they need synthetic data is expected, not a gap.
//
// The figure that moved twice, so it is pinned here with its derivation: the cabin
// published "10 criteria touched" — true of the PRE-adoption report, where the honest count
// was 9 because QZ-C-DISTR rested on the one item whose measurement the report itself
// declares irreproducible. On today's file the declaration finally carries the criterion's
// id in a blind spot's `affects`, so the §6.4 subtraction sees it WITHOUT reading prose:
// 14 cited (11 by items + 3 by header) − 1 declared-while-cited = 13 fulfilled, 0 silent.
// The rule "a criterion declared irreproducible does NOT count as fulfilled" is the
// subtraction itself, and this suite proves it both on the real file and on a minimal one.

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const RENDERER = join(REPO_ROOT, "project-console", "assets", "run-report-renderer.js");
const FIXTURES = join(HERE, "fixtures", "reports");

const CASE_1 = readFileSync(join(FIXTURES, "CASO-1-audit-contenido.report.json"), "utf8");

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

// ---------------------------------------------------------------------------
// The derivation against the REAL report — §6.4 as far as the report's own data
// reaches, which on this file is all the way.
// ---------------------------------------------------------------------------

test("REAL: 14 criteria cited — 11 by items, 3 by header citations — measured, not believed", () => {
  const rr = loadRenderer();
  const { report } = rr.rrParseReport(CASE_1);
  const cov = rr.rrCoverage(report);
  assert.equal(cov.cited.length, 14, "the union of every satisfies in the report");
  const byItems = cov.cited.filter((id) => cov.citedBy[id].items.length > 0);
  const byHeader = cov.cited.filter((id) => cov.citedBy[id].header.length > 0);
  assert.equal(byItems.length, 11, "eleven ids arrive through items");
  assert.deepEqual([...byHeader].sort(), ["QZ-C-COUNT-DECLARE", "QZ-C-HARD-MULTI", "QZ-C-POS"],
    "three arrive through the header, exactly the ones whose evidence lives there");
  assert.deepEqual([...cov.citedBy["QZ-C-COUNT-DECLARE"].header], ["counts"], "each header cite carries its where");
});

test("REAL: fulfilled is 13, not 14 — the criterion declared irreproducible is subtracted by data, never by prose", () => {
  const rr = loadRenderer();
  const { report } = rr.rrParseReport(CASE_1);
  const cov = rr.rrCoverage(report);
  assert.deepEqual([...cov.fulfilled], [
    "QZ-C-ANCHOR", "QZ-C-COUNT-DECLARE", "QZ-C-COUNT-MOVE", "QZ-C-DIM-CONCEPTS",
    "QZ-C-DIM-STEPS", "QZ-C-FB-P90", "QZ-C-HARD-DEFENSIBLE", "QZ-C-HARD-MULTI",
    "QZ-C-HARD-ONEKEY", "QZ-C-LEVEL-DEFLATED", "QZ-C-LEVEL-INFLATED", "QZ-C-POS", "QZ-C-WORD"
  ], "thirteen fulfilled-and-declared, by name");
  // The one the cabin's "10 touched" figure silently miscounted before the emitter adopted:
  // cited by I1, declared in the blind spot that names its irreproducibility. It does NOT
  // count as fulfilled — and no prose was read to know it.
  assert.deepEqual([...cov.subtracted], ["QZ-C-DISTR"], "cited AND declared: subtracted, visible, never green");
  assert.deepEqual([...cov.citedBy["QZ-C-DISTR"].items], ["I1"], "resting on exactly the item the report names");
});

test("REAL: the painted coverage carries the three decided labels, the struck citation, and the reasons verbatim", () => {
  const rr = loadRenderer();
  const { container } = mount(rr, CASE_1);
  const html = container.innerHTML;
  assert.ok(html.includes("Fulfilled and declared"), "bucket one wears the decision's label");
  assert.ok(html.includes("Declared unfulfilled"), "bucket two as well");
  assert.ok(html.includes("Silence = not reviewed"), "and the silence bucket says what silence MEANS");
  assert.ok(/rr-badge-count">13</.test(html), "the fulfilled count on screen is the derived 13");
  assert.ok(html.includes('class="rr-cov-id rr-cov-id-subtracted">QZ-C-DISTR<'),
    "the subtracted criterion paints struck through, not hidden");
  assert.ok(html.includes("also cited — the citation does not count as fulfilled"),
    "and says why it is not among the fulfilled");
  // The reasons of the declarations travel verbatim — the console never classifies them.
  assert.ok(html.includes("El run no reporto haberlos comprobado"),
    "a declared gap's why_not reaches the screen in the emitter's own words");
  // Non-criterion scopes in affects (item ids, question codes) paint as data, unclassified.
  assert.ok(html.includes('class="rr-cov-id">I1<'), "an item id in affects paints verbatim");
  assert.ok(html.includes("The ids read against the inventory of the profile"),
    "and the section says how those ids resolve, so no one reads them as a count of criteria");
});

test("REAL: the header citations paint with their where, their evidence, and the profile's figures below", () => {
  const rr = loadRenderer();
  const { container } = mount(rr, CASE_1);
  const html = container.innerHTML;
  assert.ok(html.includes("Citations from the header"), "the header citations get their block");
  assert.ok(html.includes(">counts<") || html.includes(">counts</span>"), "a where paints by its own name");
  assert.ok(html.includes("profile_data.position_refs_fixed"), "a dotted where paints whole — it is data, not a view label");
  // The evidence each where reaches is on screen: a citation the operator cannot check is
  // a citation the view failed to paint.
  assert.ok(html.includes("Facil") && html.includes("before"), "the counts object is quoted as evidence");
  // The profile's own figures render with humanised keys, never raw identifiers.
  assert.ok(html.includes("Figures of the profile"), "profile_data gets its block");
  assert.ok(html.includes("distractor explained"), "a figure key is humanised");
  assert.ok(!html.includes('class="rr-kv-k">distractor_explained<'), "and never labels a row raw");
  // The declared-null cipher paints the dash the counts table already uses — never "null".
  assert.ok(!/class="rr-kv-v">null</.test(html), "a declared null figure never reads as the word null");
});

test("REAL: the emitter's summary paints its three answers verbatim, and the chrome switches language while the prose does not", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_1);
  let html = container.innerHTML;
  assert.ok(html.includes("Emitter summary"), "the section leads the run context");
  assert.ok(html.includes("What was truly exercised"), "the first question, as words");
  assert.ok(html.includes("Se leyeron los tres ficheros del subtema"), "the exercised answer, verbatim");
  assert.ok(html.includes("QZ-C-DISTR se declara IRREPRODUCIBLE por construccion"), "the criteria answer, verbatim");
  assert.ok(html.includes("Dos reclasificaciones sin bajas"), "the outcome answer, verbatim");
  handle.state.lang = "es";
  handle.redraw();
  html = container.innerHTML;
  assert.ok(html.includes("Resumen del emisor") && html.includes("Qué se ejerció de verdad"),
    "the chrome speaks Spanish");
  assert.ok(html.includes("Se leyeron los tres ficheros del subtema"),
    "the emitter's prose is exactly the same bytes in both languages");
});

test("REAL: the derived strip is calculated from the data, labelled as derived, and blind to any figure the prose claims", () => {
  const rr = loadRenderer();
  const { container } = mount(rr, CASE_1);
  const html = container.innerHTML;
  assert.ok(html.includes("Derived from the data — nobody writes these"), "the derived layer is named apart");
  assert.ok(html.includes("info × 10") && html.includes("correction × 5") &&
    html.includes("reclassification × 2") && html.includes("declared_gap × 1"),
    "items by type, tallied from items[].type verbatim");
  // The same 11 the topbar's denominator counts — items and decisions that ask, plus the run.
  assert.ok(new RegExp('Steps that ask for a verdict</span><span class="rr-kv-v">11<').test(html),
    "steps that ask for a verdict: 11, derived");
  assert.ok(new RegExp('Fulfilled and declared</span><span class="rr-kv-v">13<').test(html),
    "the coverage figure rides the strip from the same derivation the section paints");
});

test("REAL: every item paints the criteria it cites, and an empty satisfies travels with its note", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_1);
  let html = container.innerHTML;
  // The first card is R1 — four cited criteria as chips.
  assert.ok(html.includes("Criteria it cites"), "the card names the row");
  for (const id of ["QZ-C-ANCHOR", "QZ-C-DIM-STEPS", "QZ-C-LEVEL-DEFLATED", "QZ-C-COUNT-MOVE"]) {
    assert.ok(html.includes(">" + id + "<"), "R1 cites " + id + " on its card");
  }
  // C1 declares satisfies: [] WITH its note — a fact about this item, painted as one.
  handle.goStep("C1");
  html = container.innerHTML;
  assert.ok(html.includes("Cites no criterion"), "the empty citation is a declared fact");
  assert.ok(html.includes("criterio inventado por el taller"), "and its note travels verbatim");
});

// ---------------------------------------------------------------------------
// The states no real report carries — proved on minimal reports, as expected.
// ---------------------------------------------------------------------------

test("FIXTURE: the three summary states are three different paints — prose, absence WITH its reason, and empty seen as the breach it is", () => {
  const rr = loadRenderer();
  const { container } = mount(rr, JSON.stringify({
    run_id: "RUN-SINTETICO-SUMARIO",
    summary: {
      exercised: "Se recorrió la superficie completa del caso.",
      criteria: { absent: { why_not: "El perfil no existía cuando el run entregó.", who_could: "El emisor, en su siguiente run." } },
      outcome: ""
    }
  }));
  const html = container.innerHTML;
  // Prose: verbatim.
  assert.ok(html.includes("Se recorrió la superficie completa del caso."), "prose travels verbatim");
  // Declared absence: the state is named and the reason is the emitter's own sentence.
  assert.ok(html.includes("declared absence"), "the justified absence is a declared fact");
  assert.ok(html.includes("El perfil no existía cuando el run entregó."), "with its why_not verbatim");
  assert.ok(html.includes("Who could") && html.includes("El emisor, en su siguiente run."),
    "and who could answer it, when the emitter names one");
  // Empty: NOT the same paint as absent — the contract forbids an absence without a reason,
  // and hiding that under "nobody looked" would be disguising the breach. The sweep is
  // scoped to the summary section: the absent CONTEXT BLOCKS of this minimal report say
  // nobody-looked legitimately, and that is a different fact about different fields.
  assert.ok(html.includes("Empty, and no reason declared."), "the empty answer is seen as what it is");
  const summarySection = html.slice(html.indexOf('id="rr-sec-summary"'), html.indexOf('id="rr-sec-meta"'));
  assert.ok(!summarySection.includes("The report does not carry this field: nobody looked."),
    "no question of this summary paints as merely undeclared");
});

test("FIXTURE: a declared absence WITHOUT its reason paints exactly like a missing key — that is the promise, not an accident", () => {
  const rr = loadRenderer();
  const { container } = mount(rr, JSON.stringify({
    run_id: "RUN-SINTETICO-SIN-MOTIVO",
    summary: {
      exercised: { absent: {} },
      criteria: "Con la vara del caso sintético."
    }
  }));
  const html = container.innerHTML;
  assert.ok(html.includes("The report does not carry this field: nobody looked."),
    "an absence that omits its reason reads as nobody-looked");
  assert.ok(!html.includes("declared absence"), "and never as a justified one");
  // outcome is missing entirely: same paint, same words — one state, not two.
  assert.ok(html.includes("What came out"), "the missing question still shows its row");
});

test("FIXTURE: a report with no summary block paints the absence itself — section, badge and rail say not declared", () => {
  const rr = loadRenderer();
  const { container } = mount(rr, JSON.stringify({ run_id: "RUN-SINTETICO-SIN-SUMARIO" }));
  const html = container.innerHTML;
  assert.ok(html.includes("Emitter summary"), "the section exists precisely to show the absence");
  assert.ok(html.includes('id="rr-sec-summary"'), "as a section of the run context");
  assert.ok(html.includes("The report does not carry this field: nobody looked."), "with the general rule's words");
});

test("FIXTURE: silence paints as NOT REVIEWED — a rule, loud, never a neutral gap and never an invented list", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, JSON.stringify({
    run_id: "RUN-SINTETICO-SILENCIO",
    profile: "perfil-sintetico/v1",
    items: [{ item_id: "S1", satisfies: ["CRIT-UNO"] }],
    blind_spots: [{ what: "lo no mirado", why_not: "no hubo tiempo", affects: ["CRIT-DOS"] }]
  }));
  let html = container.innerHTML;
  assert.ok(html.includes("Silence = not reviewed"), "the bucket wears the decided reading");
  assert.ok(html.includes("is NOT REVIEWED — silence is not coverage"), "and states the rule in full");
  assert.ok(html.includes("lives in its own document, not in the report"),
    "with the honest reason there is no list: the inventory does not travel in the report");
  // The silence area never borrows the neutral state's wording — that reading was rejected.
  const silence = html.slice(html.indexOf("Silence = not reviewed"));
  assert.ok(!silence.slice(0, 600).includes("not declared"),
    "the silence bucket does not paint the neutral not-declared state");
  // And in Spanish the rule keeps the decided words.
  handle.state.lang = "es";
  handle.redraw();
  html = container.innerHTML;
  assert.ok(html.includes("Silencio = no revisado"), "the Spanish label is the decision's own");
  assert.ok(html.includes("NO REVISADO — el silencio no es cobertura"), "so is the rule");
});

test("FIXTURE: cited-and-declared is subtracted on a minimal report too — the rule is the derivation, not the pilot", () => {
  const rr = loadRenderer();
  const { report } = rr.rrParseReport(JSON.stringify({
    run_id: "RUN-SINTETICO-RESTA",
    items: [
      { item_id: "S1", satisfies: ["CRIT-UNO", "CRIT-DOS"] },
      { item_id: "S2", satisfies: ["CRIT-DOS"] }
    ],
    blind_spots: [{ what: "irreproducible", why_not: "el chequeo no está definido", affects: ["S1", "CRIT-DOS"] }]
  }));
  const cov = rr.rrCoverage(report);
  assert.deepEqual([...cov.fulfilled], ["CRIT-UNO"], "only the undeclared citation is fulfilled");
  assert.deepEqual([...cov.subtracted], ["CRIT-DOS"], "cited twice, declared once: subtracted once — the union is idempotent");
  assert.deepEqual([...cov.citedBy["CRIT-DOS"].items], ["S1", "S2"], "both citing items remain its evidence");
});

test("FIXTURE: a header citation whose where does not resolve declares the unreachable key by name", () => {
  const rr = loadRenderer();
  const { container } = mount(rr, JSON.stringify({
    run_id: "RUN-SINTETICO-WHERE",
    header_satisfies: [
      { where: "counts", satisfies: ["CRIT-UNO"] },
      { where: "clave.que.no.existe", satisfies: ["CRIT-DOS"] }
    ],
    counts: { Bloques: { before: 3, after: 3 } }
  }));
  const html = container.innerHTML;
  assert.ok(html.includes("this key does not exist in this report"),
    "a citation the operator cannot check says so, by the same honesty a missing preview owes");
  assert.ok(html.includes("clave.que.no.existe"), "and names the path that failed to resolve");
  assert.ok(html.includes("Bloques"), "while the citation that does resolve quotes its evidence");
});

test("FIXTURE: the coverage section paints by presence — profile null or absent skips it, citations alone summon it", () => {
  const rr = loadRenderer();
  // profile: null with its reason is a declared fact of the metadata, not a coverage.
  const withNull = mount(rr, JSON.stringify({ run_id: "RUN-A", profile: null, profile_reason: "sin perfil declarado" }));
  assert.ok(!withNull.container.innerHTML.includes('id="rr-sec-coverage"'), "profile null paints no coverage section");
  // No profile key and no citations: nothing to derive, nothing pretended.
  const bare = mount(rr, JSON.stringify({ run_id: "RUN-B" }));
  assert.ok(!bare.container.innerHTML.includes('id="rr-sec-coverage"'), "no data, no section");
  // Citations without a profile key still paint — presence of the data, not of the label.
  const cites = mount(rr, JSON.stringify({ run_id: "RUN-C", items: [{ item_id: "S1", satisfies: ["CRIT-UNO"] }] }));
  assert.ok(cites.container.innerHTML.includes('id="rr-sec-coverage"'), "the citations summon the section");
  assert.ok(cites.container.innerHTML.includes("CRIT-UNO"), "and the cited id is on screen");
});

test("FIXTURE: the derived strip never reads a figure the summary writes — the prose can claim 99 and the data still says 2", () => {
  const rr = loadRenderer();
  const { container } = mount(rr, JSON.stringify({
    run_id: "RUN-SINTETICO-CIFRA",
    summary: {
      exercised: "Nada que declarar.",
      criteria: "Ninguno.",
      outcome: "Los pasos que piden veredicto son 99."
    },
    items: [{ item_id: "S1" }]
  }));
  const html = container.innerHTML;
  assert.ok(html.includes("Los pasos que piden veredicto son 99."), "the prose paints verbatim — it is the emitter's");
  assert.ok(new RegExp('Steps that ask for a verdict</span><span class="rr-kv-v">2<').test(html),
    "the derived figure comes from the data: S1 and the run, never the prose's 99");
});
