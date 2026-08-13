// RUN-CONSOLE-REPORT-RENDERER-001 — the one renderer, exercised against the FOUR REAL CASES
// it must survive (ticket criterion 3) plus the robustness floor (criterion 7). The renderer
// is the shipped classic script, loaded whole into node:vm exactly as the console's other
// suites load project-console.js; what runs here is what the browser runs.
//
// The four fixtures are versioned copies: CASO-1 from
// projects/cantu-quizzes-latex/reports/RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001/report.json,
// CASO-2/3/4 from the workspace _scratch (disposable by declaration, so the copies here are
// the durable ones).

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
const CASE_2 = readFileSync(join(FIXTURES, "CASO-2-development.report.json"), "utf8");
const CASE_3 = readFileSync(join(FIXTURES, "CASO-3-creacion-leccion.report.json"), "utf8");
const CASE_4 = readFileSync(join(FIXTURES, "CASO-4-sin-qa.report.json"), "utf8");

// The renderer in a bare vm context: no DOM, no fetch, no localStorage. Every browser
// facility it touches is guarded, so loading and rendering must work headless.
function loadRenderer() {
  const sandbox = { console };
  vm.createContext(sandbox);
  vm.runInContext(readFileSync(RENDERER, "utf8"), sandbox, { filename: RENDERER });
  return sandbox;
}

// The container the mount API needs, stubbed as far as the renderer reaches.
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

// Drive the real click delegation with a synthetic event carrying data-rr-* attributes.
function click(container, attrs) {
  const el = { getAttribute: (name) => (name in attrs ? attrs[name] : null) };
  container.handlers.click({ target: { closest: () => el } });
}

// ---------------------------------------------------------------------------
// CASO 1 — the audit of content: nine items, two of them stops.
// ---------------------------------------------------------------------------

test("CASO-1: steps put the stop items first and count 9 items + 2 decisions + the run", () => {
  const rr = loadRenderer();
  const { report } = rr.rrParseReport(CASE_1);
  const steps = rr.rrSteps(report, { itemType: "item", decisionsGroup: "decisions to ratify", runGroup: "the run" });
  // vm arrays carry the sandbox's prototypes; spreading into host arrays keeps the strict
  // asserts about VALUES, which is what these tests judge.
  assert.equal(steps.length, 12);
  assert.deepEqual([...steps.slice(0, 2).map((s) => s.id)], ["R1", "R2"]);
  assert.equal(steps[steps.length - 1].id, "__run__");
  assert.deepEqual([...steps.filter((s) => s.kind === "decision").map((s) => s.id)], ["D1", "D2"]);
});

test("CASO-1: one card at a time — the first surface is the stop item, expanded, and no other card", () => {
  const rr = loadRenderer();
  const { container } = mount(rr, CASE_1);
  const html = container.innerHTML;
  assert.ok(html.includes("LA BAJADA"), "the first stop item's headline is the open card");
  assert.ok(html.includes("rr-card-stop"), "the stop card wears the stop border");
  assert.ok(html.includes('<details class="rr-reasoning" open>'), "its reasoning arrives expanded");
  // The rail indexes every step (headlines ride as tooltips, as in the prototype), but only
  // ONE card exists in the DOM: the card head appears once and no other item's content does.
  assert.equal((html.match(/class="rr-card-head"/g) || []).length, 1, "exactly one card at a time");
  assert.ok(!html.includes("Al simplificar la fracción"), "no other item's content is rendered alongside");
  assert.ok(html.includes("1 / 12"), "the position counter squares with the step count");
});

test("CASO-1: an item takes two verdicts and only the run takes three; the report's own verdict_options never paint", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_1);
  let html = container.innerHTML;
  // The first card is an ITEM (a stop item, even): it asks whether the change is accepted,
  // and that takes two tokens. BLOCKED is not one of them — whether something halts
  // everything is the emitter's `stop: true`, and the consequence is derived, not chosen.
  for (const v of ["APPROVED", "CHANGES_REQUIRED"]) {
    assert.ok(html.includes('data-rr-value="' + v + '"'), v + " is offered on an item");
  }
  assert.ok(!html.includes('data-rr-value="BLOCKED"'), "BLOCKED is not an item verdict");
  // The run asks whether it is done, and there BLOCKED means its own thing: this run
  // cannot close. Its three are the same three the kernel parses.
  handle.goStep("__run__");
  html = container.innerHTML;
  for (const v of ["APPROVED", "CHANGES_REQUIRED", "BLOCKED"]) {
    assert.ok(html.includes('data-rr-value="' + v + '"'), v + " is offered on the run");
  }
  // CASO-1 carries per-item vocabularies ("De acuerdo", "Correcto", …). They are the drift
  // this renderer exists to close, and they must not reach the surface.
  assert.ok(!html.includes("De acuerdo"), "custom per-item verdicts are ignored");
  assert.ok(!container.innerHTML.includes("aprobar todo"), "no approve-all in Spanish");
  assert.ok(!/approve all/i.test(container.innerHTML), "no approve-all in English");
});

test("CASO-1: disposition is a second step and only with CHANGES_REQUIRED", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_1);
  click(container, { "data-rr-act": "verdict", "data-rr-id": "R1", "data-rr-value": "CHANGES_REQUIRED" });
  assert.ok(container.innerHTML.includes("And then"), "the disposition row appears");
  assert.ok(container.innerHTML.includes('data-rr-value="new_run"'), "with the default dispositions");
  click(container, { "data-rr-act": "disposition", "data-rr-id": "R1", "data-rr-value": "new_run" });
  let out = rr.rrVerdictOutput(handle.state.report, handle.state);
  assert.equal(out.items.find((i) => i.item_id === "R1").disposition, "new_run");
  // Flipping the verdict away from CHANGES_REQUIRED withdraws the disposition from the output.
  click(container, { "data-rr-act": "verdict", "data-rr-id": "R1", "data-rr-value": "APPROVED" });
  assert.ok(!container.innerHTML.includes("And then"), "no disposition row without CHANGES_REQUIRED");
  out = rr.rrVerdictOutput(handle.state.report, handle.state);
  assert.equal(out.items.find((i) => i.item_id === "R1").disposition, null);
});

test("CASO-1: empty is not absent — [] says none, a missing key says not declared, and the view says which", () => {
  const rr = loadRenderer();
  const { container } = mount(rr, CASE_1);
  const html = container.innerHTML;
  // blind_spots has two entries, alternatives is [], unreviewed is not in the file.
  assert.ok(/rr-badge-count">2</.test(html), "blind_spots counts 2");
  assert.ok(/rr-badge-empty">none</.test(html), "alternatives [] reads none");
  assert.ok(/rr-badge-absent">not declared</.test(html), "a missing key reads not declared");
  assert.ok(html.includes("The report does not carry this field: nobody looked."),
    "and the absent block says why that is different");
});

test("CASO-1: the pilot's declared deviation and the null verification render as declared facts", () => {
  const rr = loadRenderer();
  const { container } = mount(rr, CASE_1);
  const html = container.innerHTML;
  assert.ok(html.includes("The emitter declares a deviation"), "pilot_deviation gets its section");
  assert.ok(html.includes("no verification"), "verification null shows in the gate chip");
  // RUN-CONSOLE-REPORT-QA-REPAIRS-001, defect 2: this used to assert the operator read the
  // raw key `verification_reason`. The row is what matters and it is still there — under
  // the words a person uses for it, and the declared reason itself is untouched.
  assert.ok(!html.includes("verification_reason"), "the JSON key never reaches the screen");
  assert.ok(html.includes("Why no verification"), "the row wears its written label");
  assert.ok(html.includes("Ningún run ha compilado este subtema"), "and the declared reason renders next to it");
});

test("CASO-1: a declared gap with before:null renders as what-exists-now; an item with neither side renders no diff", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_1);
  handle.goStep("H1");
  let html = container.innerHTML;
  assert.ok(html.includes("What exists now"), "before:null paints the only-after form");
  assert.ok(html.includes("no prior version"), "and says there was nothing before");
  handle.goStep("I1");
  html = container.innerHTML;
  assert.ok(!html.includes('class="rr-diff"'), "before and after both absent paint no diff at all");
  assert.ok(html.includes("10 preguntas donde un error plausible"), "the item still renders whole");
});

test("CASO-1: the before/after pair marks changed lines and keeps the unchanged declaration", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_1);
  handle.goStep("C3");
  const html = container.innerHTML;
  assert.ok(html.includes("rr-line-changed"), "changed lines are marked");
  assert.ok(html.includes("Unchanged:"), "the unchanged block is stated");
  assert.ok(html.includes("a su mínima expresión"), "the after side carries the report's own text");
});

test("CASO-1: the signature is typed, never prefilled, and the sign gate names what is missing", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_1);
  handle.goStep("__run__");
  let html = container.innerHTML;
  assert.ok(html.includes('data-rr-act="reviewer"') && html.includes('value=""'), "the name box is born empty");
  // ELEVEN, not twelve: this report's `info` item declares it needs no verdict, so it is
  // not a debt the gate can hold the operator to (defect 3). Twelve steps are still walked;
  // eleven are signed. The two numbers stopped being the same number, deliberately.
  assert.ok(html.includes("Missing 11 verdicts and the signature."), "the gate names every miss");
  assert.ok(/data-rr-act="sign"[^>]*disabled/.test(html), "the sign button waits");
  let out = rr.rrVerdictOutput(handle.state.report, handle.state);
  assert.equal(out.verdict_by, null);
  // Every step signed one by one, plus a typed name, is the only path to ready.
  const T = rr.rrT(handle.state.lang);
  rr.rrSteps(handle.state.report, T).forEach((s) => rr.rrSetRec(handle.state, s.id, { verdict: "APPROVED" }));
  handle.state.reviewer = "Nombre Tecleado";
  handle.redraw();
  html = container.innerHTML;
  assert.ok(html.includes("Complete. It downloads to your machine."));
  assert.ok(!/data-rr-act="sign"[^>]*disabled/.test(html), "the sign button opens");
  out = rr.rrVerdictOutput(handle.state.report, handle.state);
  assert.equal(out.verdict_by, "Nombre Tecleado");
  assert.equal(out.decided_at, null, "the stamp belongs to the writer (#54), not the view");
});

// ---------------------------------------------------------------------------
// CASO 2 — the development run: checks and decisions, no before and no after.
// ---------------------------------------------------------------------------

test("CASO-2: a decision item offers its considered paths, and the pick is a datum apart from the verdict", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_2);
  const html = container.innerHTML;
  assert.ok(html.includes("Paths considered — mark the one you pick"), "the paths block renders");
  assert.ok(html.includes("Acordeón: abrir una cierra la anterior"), "with the report's own options");
  click(container, { "data-rr-act": "chosen-option", "data-rr-id": "D1", "data-rr-value": "Acordeón: abrir una cierra la anterior" });
  const out = rr.rrVerdictOutput(handle.state.report, handle.state);
  const d1 = out.items.find((i) => i.item_id === "D1");
  assert.equal(d1.chosen_option, "Acordeón: abrir una cierra la anterior");
  assert.equal(d1.verdict, null, "choosing a path is NOT a verdict — the verdict vocabularies are closed and this is not in them");
});

test("CASO-2: a check paints its expectation; a scalar before/after pairs both sides changed", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_2);
  handle.goStep("K1");
  assert.ok(container.innerHTML.includes("What to expect"), "the check's expectation block");
  assert.ok(container.innerHTML.includes("El editor no la ofrece"), "with the declared expectation");
  handle.goStep("I1");
  const html = container.innerHTML;
  assert.ok(html.includes("rr-line-changed"), "scalar before/after highlights the pair");
  assert.ok(html.includes("Palette-resolves: no"), "before side verbatim");
});

test("CASO-2: a self-decision with no id becomes SD1 and signs apart; unreviewed carries its count", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_2);
  const T = rr.rrT(handle.state.lang);
  const steps = rr.rrSteps(handle.state.report, T);
  assert.equal(steps.length, 6, "4 items + 1 executor decision + the run");
  assert.ok(steps.some((s) => s.id === "SD1" && s.kind === "decision"));
  handle.goStep("SD1");
  assert.ok(container.innerHTML.includes("The executor decided this on its own. Do you ratify it?"));
  assert.ok(container.innerHTML.includes("Divergir de la Definition of Done"), "the decision's own words");
  const out = rr.rrVerdictOutput(handle.state.report, handle.state);
  assert.equal(out.self_decisions.length, 1);
  assert.equal(out.self_decisions[0].decision_id, null, "no invented id in the output");
  assert.ok(/rr-badge-count">1</.test(container.innerHTML), "unreviewed [1 entry] counts 1");
});

test("CASO-2: the items_note and the verification travel to the gate section", () => {
  const rr = loadRenderer();
  const { container } = mount(rr, CASE_2);
  const html = container.innerHTML;
  assert.ok(html.includes("npm test · 436/436"), "the verification chip carries command and result");
  assert.ok(!html.includes("items_note"), "the JSON key never reaches the screen");
  assert.ok(html.includes("Note on the items"), "the sampling note is declared, not hidden");
});

// ---------------------------------------------------------------------------
// CASO 3 — the creation of a lesson: two previews compared, children with a stop.
// ---------------------------------------------------------------------------

test("CASO-3: an item with three children is FOUR index entries, and the counter squares", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_3);
  const T = rr.rrT(handle.state.lang);
  const steps = rr.rrSteps(handle.state.report, T);
  assert.deepEqual([...steps.map((s) => s.id)], ["L1", "K1", "K2", "K3", "SD1", "__run__"]);
  assert.equal((container.innerHTML.match(/rr-rail-row-child/g) || []).length, 3, "the children indent in the rail");
  assert.ok(container.innerHTML.includes("0 / 6"), "the progress denominator counts parent AND children");
});

test("CASO-3: a stop among the children marks the parent attenuated and keeps the child's own stop loud", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_3);
  let html = container.innerHTML;
  assert.ok(html.includes("rr-card-inherit"), "the parent card carries the attenuated mark");
  assert.ok(html.includes("contains a stop"), "and says why");
  assert.ok(html.includes("rr-rail-stop-dim"), "the rail dims the inherited stop");
  handle.goStep("K3");
  html = container.innerHTML;
  assert.ok(html.includes("rr-card-stop"), "the stop child itself is not attenuated");
  assert.ok(html.includes("stop point"), "and names its stop");
});

test("CASO-3: in create mode the two renderable previews compare against each other by default", () => {
  const rr = loadRenderer();
  const { container } = mount(rr, CASE_3);
  const html = container.innerHTML;
  assert.ok(html.includes("Versión web") && html.includes("Versión diapositiva"), "both previews are offered");
  assert.ok(html.includes(">Compare<"), "with the compare tab");
  assert.ok(html.includes("rr-preview-grid-compare"), "which is the DEFAULT for two previews");
  assert.equal((html.match(/class="rr-pane"/g) || []).length, 2, "both panes on screen at once");
  // Headless there is no fetch, so no preview can be confirmed: the panes must say what
  // they could not reach instead of pretending an artefact.
  assert.equal((html.match(/rr-frame-missing/g) || []).length, 2);
  assert.ok(html.includes("assets/leccion-web.html"), "each missing pane names its path");
  assert.ok(html.includes("rr-col-wide"), "the column widens for the artefact");
});

test("CASO-3: creation renders what-exists-now, the required if-rejected, and children inherit the subject's previews", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_3);
  let html = container.innerHTML;
  assert.ok(html.includes("What exists now") && html.includes("no prior version"));
  assert.ok(html.includes("If rejected"), "the consequence is declared up front");
  handle.goStep("K2");
  html = container.innerHTML;
  assert.ok(html.includes("rr-previews"), "a child without previews reads the parent's subject");
  assert.ok(html.includes("Paridad web / diapositiva"), "while keeping its own card");
});

// ---------------------------------------------------------------------------
// CASO 4 — zero check items, mechanical gate.
// ---------------------------------------------------------------------------

test("CASO-4: zero check items still make a whole surface, and the mechanical gate rewords the run question", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_4);
  const T = rr.rrT(handle.state.lang);
  const steps = rr.rrSteps(handle.state.report, T);
  assert.equal(steps.length, 4, "2 items + 1 executor decision + the run");
  handle.goStep("__run__");
  const html = container.innerHTML;
  assert.ok(html.includes("Do you accept these findings?"), "the mechanical-gate wording");
  assert.ok(!html.includes("What is your verdict on the run?"), "replaces the judgment wording");
});

test("CASO-4: enumerated-and-empty blocks read none, a failing verification renders honestly, profile null carries its reason", () => {
  const rr = loadRenderer();
  const { container } = mount(rr, CASE_4);
  const html = container.innerHTML;
  // The three block badges paint twice each: once in the rail links, once on the sections.
  assert.equal((html.match(/rr-badge-empty">none</g) || []).length, 6, "blind_spots, alternatives and unreviewed all say none");
  assert.ok(!html.includes("not declared"), "nothing in this report is undeclared");
  // The verification's OWN sub-fields are the emitter's vocabulary: the head is labelled,
  // the tail is humanised, and neither is printed as a dotted identifier.
  assert.ok(!html.includes("verification.exit"), "no dotted JSON key on screen");
  assert.ok(html.includes("Verification · exit") && html.includes("541/540"), "a red verification is shown, not smoothed");
  assert.ok(html.includes("null — Este proyecto no declara perfil de dominio"), "profile:null travels with its reason");
  assert.ok(html.includes("Note on the items"), "the zero-checks note is declared");
});

// ---------------------------------------------------------------------------
// Robustness (criterion 7) and the surface's own floor.
// ---------------------------------------------------------------------------

test("a report.json that does not parse produces an honest message, never a blank screen", () => {
  const rr = loadRenderer();
  const { container } = mount(rr, "{ this is not json");
  const html = container.innerHTML;
  assert.ok(html.length > 0, "never blank");
  assert.ok(html.includes("This report could not be read as JSON."));
  assert.ok(html.includes("rr-parse-error-detail"), "and carries the parser's own words");
  assert.ok(!html.includes("rr-card"), "nothing below it is pretended");
});

test("a report missing every optional block still renders whole", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, JSON.stringify({ run_id: "RUN-X" }));
  const html = container.innerHTML;
  assert.ok(html.includes("RUN-X"), "the run card renders from the header alone");
  assert.ok(html.includes("1 / 1"), "the run is the single step");
  // Rail links and sections each carry the badge: three undeclared blocks, six badges.
  assert.equal((html.match(/rr-badge-absent">not declared</g) || []).length, 6,
    "every undeclared block says so instead of failing");
  const out = rr.rrVerdictOutput(handle.state.report, handle.state);
  assert.deepEqual([...out.items], []);
  assert.equal(out.run_id, "RUN-X");
});

test("a verdict click touches exactly one step — there is no gesture that fills the rest", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_1);
  click(container, { "data-rr-act": "verdict", "data-rr-id": "R1", "data-rr-value": "APPROVED" });
  const T = rr.rrT(handle.state.lang);
  const undecided = rr.rrSteps(handle.state.report, T).filter((s) => !rr.rrRec(handle.state, s.id).verdict);
  assert.equal(undecided.length, 11, "one signed, eleven steps (run included) still pending");
  assert.ok(!container.innerHTML.includes("still without a verdict"),
    "the warning lives on the run card only");
  handle.goStep("__run__");
  // Nine of the eleven are steps the run card tallies; the tenth is the run itself, and the
  // eleventh is the `info` item, which is walked past but never counted (defect 3).
  assert.ok(container.innerHTML.includes("9 still without a verdict. The run verdict does not replace them."),
    "and there it names the ten");
});

test("the chrome speaks both languages without touching the report's text", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_1);
  handle.state.lang = "es";
  handle.redraw();
  const html = container.innerHTML;
  assert.ok(html.includes("Revisión de run"), "the chrome switches");
  assert.ok(html.includes("sin declarar") && !html.includes("not declared"), "empty-vs-absent switches with it");
  assert.ok(html.includes("LA BAJADA"), "the report's own words never translate");
});
