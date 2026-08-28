// RUN-CONSOLE-REPORT-COVERAGE-READABILITY-001 (#61) — the criteria coverage becomes usable
// for the operator's JUDGMENT. The section was already CORRECT: #60's QA passed it step by
// step (B3-B6) with this same screen in front. It was unreadable, and only the operator's eye
// could find that: «si es info para el AI esta bien, pero si es para mi juicio esta muy
// denso» (context/aiw-console/records/HALLAZGOS-67-SUPERFICIE-DEL-REPORTE.md, H-02).
//
// THE SHAPE IS THE OPERATOR'S DECISION of 2026-08-27, not this suite's: the three figures on
// top, and BELOW them, folded, the material that exists to be audited — the raw counts object
// and the profile figures. His own division: "what I need to judge" versus "what is there to
// audit".
//
// Every test here exists to fail if a rule he marked untouchable is broken, so each one is
// named after the rule it guards rather than after the markup it reads:
//   · the silence bucket states its RULE and never becomes a number (D-067);
//   · declarations keep their ids and their why_not VERBATIM, unclassified, uncounted;
//   · every header citation keeps its `where` AND the evidence that `where` reaches;
//   · the subtracted id stays struck and visible with its sentence;
//   · the audit material is FOLDED — never removed, never summarised into prose.
//
// Density measured on disk 2026-08-27 before the change, on the versioned copy of the pilot:
// 3 profile header rows, 13 fulfilled rows carrying 24 evidence chips, 7 declaration blocks
// listing 28 ids with 1424 characters of verbatim prose, the silence rule 273 characters, 3
// header citations (one printing the raw counts object), and 16 rows of profile figures —
// all at one visual level. The live pilot, which carries one figure group more than this
// copy, gave 1467 characters and 24 figure rows: the ticket's numbers, verified.

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

// The coverage SECTION, not the rail link of the same id: the rail is painted first and
// carries the id as a target, so the section itself is the last occurrence.
function coverageSection(html) {
  const start = html.lastIndexOf('id="rr-sec-coverage"');
  assert.ok(start > -1, "the coverage section is on screen");
  const end = html.lastIndexOf('id="rr-sec-meta"');
  assert.ok(end > start, "and the metadata section follows it");
  return html.slice(start, end);
}

// The section split at the fold: what the operator sees without opening anything, and what
// the fold holds. Every rule below is asserted against the side it belongs to.
function split(section) {
  // Matched on the opening tag alone, not on its attributes: whether the drawer arrives
  // closed is a rule of its own and gets its own test, so a regression there fails ONE test
  // with its own name instead of collapsing every other diagnosis in this file.
  const at = section.indexOf('<details class="rr-cov-audit"');
  assert.ok(at > -1, "the audit material is folded into a details of its own");
  return { visible: section.slice(0, at), folded: section.slice(at) };
}

// ---------------------------------------------------------------------------
// 1 · The three figures read at a glance, without opening anything.
// ---------------------------------------------------------------------------

test("#61 the three figures ride on TOP of the coverage, before any bucket and outside every fold", () => {
  const rr = loadRenderer();
  const section = coverageSection(mount(rr, CASE_1).container.innerHTML);
  assert.ok(/^id="rr-sec-coverage" open>/.test(section), "the section itself arrives expanded");
  const glance = section.indexOf('class="rr-cov-glance"');
  assert.ok(glance > -1, "the glance strip exists");
  assert.ok(glance < section.indexOf('class="rr-cov-bucket"'), "and lands before the first bucket");
  assert.ok(glance < section.indexOf('<details class="rr-cov-audit"'), "and before the fold");
  const { visible } = split(section);
  assert.equal((visible.match(/class="rr-cov-glance-cell/g) || []).length, 3, "three slots, one per bucket");
  assert.ok(visible.includes('class="rr-cov-glance-v">13<'), "the fulfilled figure is the derived 13, on top");
  assert.ok(visible.includes("Fulfilled and declared") && visible.includes("Declared unfulfilled") &&
    visible.includes("Silence = not reviewed"), "each slot wears its bucket's decided label");
});

test("#61 the glance figures come from the derivation, never from the prose the emitter wrote", () => {
  const rr = loadRenderer();
  const { report } = rr.rrParseReport(CASE_1);
  const cov = rr.rrCoverage(report);
  const section = coverageSection(mount(rr, CASE_1).container.innerHTML);
  const { visible } = split(section);
  assert.ok(visible.includes('class="rr-cov-glance-v">' + cov.fulfilled.length + "<"),
    "the fulfilled slot is exactly rrCoverage's subtraction, the same one the bucket paints");
  assert.ok(visible.includes('class="rr-cov-glance-v">' + cov.declarations.length + "<"),
    "the declared slot is exactly the declarations the bucket paints");
  // A prose figure never reaches the strip: the emitter can claim anything and the data holds.
  const lying = mount(rr, JSON.stringify({
    run_id: "RUN-SINTETICO-VISTAZO",
    summary: { outcome: "Los criterios cumplidos son 99." },
    items: [{ item_id: "S1", satisfies: ["CRIT-UNO"] }]
  }));
  const strip = coverageSection(lying.container.innerHTML);
  assert.ok(strip.includes('class="rr-cov-glance-v">1<'), "one citation, one fulfilled — never the prose's 99");
});

// ---------------------------------------------------------------------------
// 2 · D-067: the silence bucket states its RULE, and never becomes a number.
// ---------------------------------------------------------------------------

test("#61 UNTOUCHABLE — silence carries NO figure: its slot holds the rule's word and the bucket states the rule in full", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_1);
  let section = coverageSection(container.innerHTML);
  let { visible } = split(section);
  // The slot: a word, never a digit. A zero here would be exactly the neutral number the
  // decision forbids — the profile's inventory does not travel, so no figure is honest.
  const cell = visible.slice(visible.indexOf("rr-cov-glance-silence"));
  const value = cell.slice(cell.indexOf('class="rr-cov-glance-v">') + 24, cell.indexOf("</span>", cell.indexOf('class="rr-cov-glance-v">')));
  assert.equal(value, "not reviewed", "the silence slot says what silence MEANS");
  assert.ok(!/\d/.test(value), "and carries no digit at all");
  assert.ok(cell.includes("a rule, not a figure"), "the slot names itself a rule, so nobody reads it as a count");
  // The bucket keeps the rule whole, unfolded, in the operator's reach.
  assert.ok(visible.includes("is NOT REVIEWED — silence is not coverage"), "the rule stays stated in full");
  assert.ok(visible.includes("lives in its own document, not in the report"),
    "with the honest reason there is no list of silent ids");
  assert.ok(!visible.slice(visible.indexOf("Silence = not reviewed")).slice(0, 900).includes("not declared"),
    "and never borrows the neutral not-declared wording");
  // Both languages, because a rule that only holds in one is not pinned.
  handle.state.lang = "es";
  handle.redraw();
  section = coverageSection(container.innerHTML);
  visible = split(section).visible;
  assert.ok(visible.includes("Silencio = no revisado") && visible.includes("NO REVISADO — el silencio no es cobertura"),
    "the Spanish rule is the decision's own");
  assert.ok(visible.includes("una regla, no una cifra"), "and the Spanish slot is a rule too");
  const esCell = visible.slice(visible.indexOf("rr-cov-glance-silence"));
  assert.ok(!/class="rr-cov-glance-v">\d/.test(esCell), "no digit in the Spanish slot either");
});

// ---------------------------------------------------------------------------
// 3 · Declarations: ids and why_not VERBATIM, unclassified, never counted as criteria.
// ---------------------------------------------------------------------------

test("#61 UNTOUCHABLE — the declared slot counts DECLARATIONS and says so; it never counts criteria", () => {
  const rr = loadRenderer();
  const { report } = rr.rrParseReport(CASE_1);
  const cov = rr.rrCoverage(report);
  const ids = cov.declarations.reduce((n, d) => n + d.affects.length, 0);
  assert.equal(cov.declarations.length, 7, "seven declarations on this report");
  assert.equal(ids, 28, "listing twenty-eight ids between them");
  const { visible } = split(coverageSection(mount(rr, CASE_1).container.innerHTML));
  assert.ok(visible.includes('class="rr-cov-glance-v">7<'), "the slot shows the declarations");
  assert.ok(!visible.includes('class="rr-cov-glance-v">28<'), "never the ids, which would read as a count of criteria");
  assert.ok(visible.includes("never a count of criteria"), "and the slot says which of the two it is");
});

test("#61 UNTOUCHABLE — every declared id and every why_not stays on screen VERBATIM, unclassified, outside the fold", () => {
  const rr = loadRenderer();
  const { report } = rr.rrParseReport(CASE_1);
  const rrEsc = rr.rrEsc;
  const { visible } = split(coverageSection(mount(rr, CASE_1).container.innerHTML));
  for (const spot of report.blind_spots) {
    for (const id of spot.affects || []) {
      assert.ok(visible.includes(">" + rrEsc(String(id)) + "<"),
        "the declared id " + id + " paints verbatim, above the fold");
    }
    if (spot.why_not) {
      assert.ok(visible.includes(rrEsc(spot.why_not)),
        "and its reason travels byte for byte, never summarised: " + spot.why_not.slice(0, 40));
    }
  }
  assert.ok(visible.includes("The ids read against the inventory of the profile"),
    "the note that keeps those ids from being read as criteria stays with them");
});

test("#61 UNTOUCHABLE — the subtracted id stays STRUCK and visible with its sentence, above the fold", () => {
  const rr = loadRenderer();
  const { report } = rr.rrParseReport(CASE_1);
  const cov = rr.rrCoverage(report);
  assert.deepEqual([...cov.subtracted], ["QZ-C-DISTR"], "the pilot's one cited-and-declared criterion");
  const { visible } = split(coverageSection(mount(rr, CASE_1).container.innerHTML));
  assert.ok(visible.includes('class="rr-cov-id rr-cov-id-subtracted">QZ-C-DISTR<'),
    "struck through and on screen — hiding it would re-create the false coverage the rule prevents");
  assert.ok(visible.includes("also cited — the citation does not count as fulfilled"),
    "with the sentence that says why it is not among the fulfilled");
  assert.ok(!visible.includes('class="rr-cov-glance-v">14<'), "and the glance never counts it as fulfilled");
});

// ---------------------------------------------------------------------------
// 4 · The fold: reachable and COMPLETE. Never removed, never summarised into prose.
// ---------------------------------------------------------------------------

test("#61 the audit material is FOLDED, closed on arrival — the raw counts object and the profile figures", () => {
  const rr = loadRenderer();
  const section = coverageSection(mount(rr, CASE_1).container.innerHTML);
  assert.ok(section.includes('<details class="rr-cov-audit">'), "a details of its own");
  assert.ok(!section.includes('<details class="rr-cov-audit" open>'), "closed on arrival — the operator judges first");
  const { visible, folded } = split(section);
  assert.ok(folded.includes("Citations from the header"), "the citations, whose evidence IS the raw counts object");
  assert.ok(folded.includes("Figures of the profile"), "and the profile's figures");
  assert.ok(!visible.includes("Figures of the profile"), "neither is left duplicated above");
  assert.ok(folded.includes("Nothing is summarised: it opens complete."),
    "the fold declares what it is: audit material, not a summary of it");
});

test("#61 UNTOUCHABLE — every header citation keeps its `where` AND the evidence that `where` reaches", () => {
  const rr = loadRenderer();
  const { report } = rr.rrParseReport(CASE_1);
  const rrEsc = rr.rrEsc;
  const { folded } = split(coverageSection(mount(rr, CASE_1).container.innerHTML));
  assert.equal(report.header_satisfies.length, 3, "three citations hang from this header");
  for (const h of report.header_satisfies) {
    assert.ok(folded.includes(">" + rrEsc(String(h.where)) + "<"), "the where " + h.where + " paints by its own name");
    const res = rr.rrResolvePath(report, h.where);
    assert.ok(res.found, "and it resolves on this report");
    const evidence = res.value == null ? "—" : (typeof res.value === "object" ? JSON.stringify(res.value) : String(res.value));
    assert.ok(folded.includes(rrEsc(evidence)),
      "the evidence it reaches is quoted whole — a citation the operator cannot check is a citation badly painted");
    for (const id of h.satisfies || []) {
      assert.ok(folded.includes(">" + rrEsc(String(id)) + "<"), "with the id it claims: " + id);
    }
  }
  // The raw counts object is the named audit material, and it travels raw, not prosed.
  assert.ok(folded.includes(rrEsc(JSON.stringify(report.counts))), "the counts object opens exactly as it is on disk");
});

test("#61 a header citation whose `where` reaches nothing still declares the unreachable key, inside the fold", () => {
  const rr = loadRenderer();
  const { container } = mount(rr, JSON.stringify({
    run_id: "RUN-SINTETICO-WHERE-PLEGADO",
    header_satisfies: [
      { where: "counts", satisfies: ["CRIT-UNO"] },
      { where: "clave.que.no.existe", satisfies: ["CRIT-DOS"] }
    ],
    counts: { Bloques: { before: 3, after: 3 } }
  }));
  const { folded } = split(coverageSection(container.innerHTML));
  assert.ok(folded.includes("clave.que.no.existe"), "the path that failed to resolve is named");
  assert.ok(folded.includes("this key does not exist in this report"), "and says so, folded but never softened");
  assert.ok(folded.includes("Bloques"), "while the one that resolves quotes its evidence");
});

test("#61 the profile figures open COMPLETE — every key, every value, the declared null still a dash", () => {
  const rr = loadRenderer();
  const { report } = rr.rrParseReport(CASE_1);
  const rrEsc = rr.rrEsc;
  const { folded } = split(coverageSection(mount(rr, CASE_1).container.innerHTML));
  const cell = (v) => v == null ? "—" : (typeof v === "object" ? JSON.stringify(v) : String(v));
  let rows = 0;
  for (const [k, v] of Object.entries(report.profile_data)) {
    assert.ok(folded.includes(rrEsc(rr.rrHumanKey(k))), "the figure " + k + " keeps its humanised key");
    assert.ok(!folded.includes('class="rr-kv-k">' + rrEsc(k) + "<"), "and is never labelled by its raw key");
    if (v != null && typeof v === "object" && !Array.isArray(v)) {
      for (const [sk, sv] of Object.entries(v)) {
        assert.ok(folded.includes(rrEsc(rr.rrHumanKey(sk))), "the nested figure " + sk + " survives the fold");
        assert.ok(folded.includes(rrEsc(cell(sv))), "with its value");
        rows += 1;
      }
    } else {
      assert.ok(folded.includes(rrEsc(cell(v))), "the figure " + k + " keeps its value");
      rows += 1;
    }
  }
  assert.equal(rows, 16, "sixteen figure rows on this copy — the count that was at the top level before");
  assert.ok(!/class="rr-kv-v">null</.test(folded), "a declared null still paints the dash, never the word");
});

test("#61 no audit material, no fold: a report with neither citations nor figures paints no empty drawer", () => {
  const rr = loadRenderer();
  const { container } = mount(rr, JSON.stringify({
    run_id: "RUN-SINTETICO-SIN-AUDITORIA",
    items: [{ item_id: "S1", satisfies: ["CRIT-UNO"] }]
  }));
  const section = coverageSection(container.innerHTML);
  assert.ok(!section.includes("rr-cov-audit"), "nothing to audit, nothing to fold");
  assert.ok(section.includes('class="rr-cov-glance"'), "and the figures still lead the section");
});

// ---------------------------------------------------------------------------
// 5 · The rule that governs the rest: no domain branch, and chrome that translates whole.
// ---------------------------------------------------------------------------

test("#61 the new chrome translates whole — not one English label survives the switch to Spanish", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_1);
  handle.state.lang = "es";
  handle.redraw();
  const section = coverageSection(container.innerHTML);
  assert.ok(section.includes("Las tres cifras, de un vistazo"), "the glance is named in Spanish");
  assert.ok(section.includes("Material para auditar"), "so is the fold");
  assert.ok(section.includes("Plegado porque está para auditarse"), "and its blurb");
  for (const english of ["The three figures, at a glance", "Material for auditing",
    "cited criteria that no declaration covers", "never a count of criteria", "a rule, not a figure",
    "Folded because it is here to be audited"]) {
    assert.ok(!section.includes(english), "no English chrome leaks: " + english);
  }
});

test("#61 the coverage shape is one shape — the same markup for a report that shares no word with the pilot", () => {
  const rr = loadRenderer();
  const { container } = mount(rr, JSON.stringify({
    run_id: "RUN-SINTETICO-OTRO-DOMINIO",
    profile: "perfil-ajeno/v1",
    items: [{ item_id: "S1", satisfies: ["OTRO-CRIT-UNO", "OTRO-CRIT-DOS"] }],
    blind_spots: [{ what: "sin mirar", why_not: "no se pudo", affects: ["OTRO-CRIT-DOS"] }],
    header_satisfies: [{ where: "counts", satisfies: ["OTRO-CRIT-TRES"] }],
    counts: { Piezas: { before: 1, after: 2 } },
    profile_data: { alguna_cifra: 3, grupo: { dentro: 4 } }
  }));
  const section = coverageSection(container.innerHTML);
  const { visible, folded } = split(section);
  assert.equal((visible.match(/class="rr-cov-glance-cell/g) || []).length, 3, "three slots here too");
  assert.ok(visible.includes('class="rr-cov-glance-v">2<'), "fulfilled: the two undeclared citations");
  assert.ok(visible.includes('class="rr-cov-glance-v">1<'), "declared: the one declaration");
  assert.ok(visible.includes('class="rr-cov-id rr-cov-id-subtracted">OTRO-CRIT-DOS<'), "the subtraction works by data");
  assert.ok(folded.includes("Piezas") && folded.includes("alguna cifra") && folded.includes("dentro"),
    "and the fold carries this report's own audit material, whatever it is named");
});
