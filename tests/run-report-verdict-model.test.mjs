// RUN-CONSOLE-VERDICT-MODEL-001 — the verdict model: two tokens on an item, three on the
// run, and the disposition that says it is fixed here.
//
// THE GUARD IS THE HEART OF IT (criterion 5), and it is a guard, not an aggregation: the
// run verdict is never computed from the item verdicts — the operator decides it, and the
// interface only refuses to let him sign a contradiction. The three situations the ticket
// names get one test each: everything approved; items corrected forward; a fix owed here.
// Around them, the derived `stopped` (criterion 6) and the fourth disposition arriving
// from a report's own `verdict_disposition_options` (criterion 9) — exercised against the
// versioned fixtures, which now carry it.

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

// Drive the real delegated handlers with synthetic events, exactly as the renderer suite
// does. A click on a disabled button still reaches the handler here — headless there is no
// DOM to swallow it — which is precisely why the guard must live in the model and not only
// in the paint, and what these tests prove.
function click(container, attrs) {
  const el = { getAttribute: (name) => (name in attrs ? attrs[name] : null) };
  container.handlers.click({ target: { closest: () => el } });
}

function type(container, attrs, value) {
  const el = { getAttribute: (name) => (name in attrs ? attrs[name] : null), value };
  container.handlers.input({ target: el });
}

// Every non-run step signed APPROVED in one sweep — test scaffolding, not a surface
// gesture: the renderer offers no approve-all, and the suite proves that elsewhere.
function approveAllSteps(rr, handle) {
  const T = rr.rrT(handle.state.lang);
  rr.rrSteps(handle.state.report, T)
    .filter((s) => s.kind !== "run")
    .forEach((s) => rr.rrSetRec(handle.state, s.id, { verdict: "APPROVED" }));
  handle.redraw();
}

function runApprovedButton(html) {
  const m = html.match(/<button[^>]*data-rr-id="__run__"[^>]*data-rr-value="APPROVED"[^>]*>/);
  return m ? m[0] : "";
}

// ---------------------------------------------------------------------------
// The guard, situation 1 — everything approved: APPROVED is simply available.
// ---------------------------------------------------------------------------

test("guard 1/3: with every step approved the run can be APPROVED, and the signature completes", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_2);
  approveAllSteps(rr, handle);
  handle.goStep("__run__");
  let html = container.innerHTML;
  assert.ok(!runApprovedButton(html).includes("disabled"), "APPROVED is not withheld");
  assert.ok(!html.includes("rr-guard-reason"), "and no guard reason paints — there is nothing to say");
  click(container, { "data-rr-act": "verdict", "data-rr-id": "__run__", "data-rr-value": "APPROVED" });
  assert.equal(rr.rrRec(handle.state, "__run__").verdict, "APPROVED", "the operator's choice is recorded");
  handle.state.reviewer = "QA";
  handle.redraw();
  html = container.innerHTML;
  assert.ok(html.includes("Complete. It downloads to your machine."), "the sign gate opens");
  const out = rr.rrVerdictOutput(handle.state.report, handle.state);
  assert.equal(out.run.verdict, "APPROVED");
  assert.equal(out.stopped, false, "nothing was rejected, so nothing halted");
});

// ---------------------------------------------------------------------------
// The guard, situation 2 — items corrected FORWARD: every CHANGES_REQUIRED
// carries a disposition and each one sends the fix somewhere else. Approving
// the run is coherent — done with deviations.
// ---------------------------------------------------------------------------

test("guard 2/3: CHANGES_REQUIRED items whose fixes all travel elsewhere leave APPROVED available", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_2);
  approveAllSteps(rr, handle);
  // Three items, three outward dispositions — the three that existed before this run.
  for (const [id, disposition] of [["K1", "new_run"], ["K2", "operator_fixed"], ["I1", "discard"]]) {
    click(container, { "data-rr-act": "verdict", "data-rr-id": id, "data-rr-value": "CHANGES_REQUIRED" });
    click(container, { "data-rr-act": "disposition", "data-rr-id": id, "data-rr-value": disposition });
  }
  handle.goStep("__run__");
  const html = container.innerHTML;
  assert.ok(!runApprovedButton(html).includes("disabled"), "the corrections travel forward: APPROVED stays available");
  assert.ok(!html.includes("rr-guard-reason"), "no contradiction, no reason to write");
  click(container, { "data-rr-act": "verdict", "data-rr-id": "__run__", "data-rr-value": "APPROVED" });
  const out = rr.rrVerdictOutput(handle.state.report, handle.state);
  assert.equal(out.run.verdict, "APPROVED");
  assert.deepEqual(
    [...out.items.filter((i) => i.verdict === "CHANGES_REQUIRED").map((i) => i.disposition)].sort(),
    ["discard", "new_run", "operator_fixed"],
    "each correction says where it goes, and none says here");
});

// ---------------------------------------------------------------------------
// The guard, situation 3 — a fix owed HERE, or a change with no disposition:
// APPROVED is not available for the run, and never in silence.
// ---------------------------------------------------------------------------

test("guard 3/3: a missing disposition or a fix-here disposition withholds APPROVED, with the reason written", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_2);
  approveAllSteps(rr, handle);
  // First cause: a CHANGES_REQUIRED that never said where its fix goes.
  click(container, { "data-rr-act": "verdict", "data-rr-id": "K1", "data-rr-value": "CHANGES_REQUIRED" });
  handle.goStep("__run__");
  let html = container.innerHTML;
  assert.ok(runApprovedButton(html).includes("disabled"), "APPROVED is withheld");
  assert.ok(html.includes("APPROVED is not available for the run: 1 change still carries no disposition."),
    "and the reason is written, not implied");
  // The refusal is mechanical, not cosmetic: the click reaches the handler and does nothing.
  click(container, { "data-rr-act": "verdict", "data-rr-id": "__run__", "data-rr-value": "APPROVED" });
  assert.equal(rr.rrRec(handle.state, "__run__").verdict, undefined, "the contradiction was not recorded");
  // Second cause: the disposition that says the fix belongs to THIS run.
  click(container, { "data-rr-act": "disposition", "data-rr-id": "K1", "data-rr-value": "this_run" });
  handle.goStep("__run__");
  html = container.innerHTML;
  assert.ok(runApprovedButton(html).includes("disabled"), "a fix owed here withholds APPROVED the same");
  assert.ok(html.includes("APPROVED is not available for the run: 1 fix is owed to this run itself."),
    "with its own reason");
  click(container, { "data-rr-act": "verdict", "data-rr-id": "__run__", "data-rr-value": "APPROVED" });
  assert.equal(rr.rrRec(handle.state, "__run__").verdict, undefined, "still refused");
  // The other two run tokens never lock: the operator can always say not-done.
  click(container, { "data-rr-act": "verdict", "data-rr-id": "__run__", "data-rr-value": "BLOCKED" });
  assert.equal(rr.rrRec(handle.state, "__run__").verdict, "BLOCKED", "BLOCKED is the operator's to give");
  click(container, { "data-rr-act": "verdict", "data-rr-id": "__run__", "data-rr-value": "BLOCKED" });
  // Rerouting the fix forward is what releases APPROVED — the operator resolves it, not the interface.
  click(container, { "data-rr-act": "disposition", "data-rr-id": "K1", "data-rr-value": "new_run" });
  handle.goStep("__run__");
  assert.ok(!runApprovedButton(container.innerHTML).includes("disabled"), "rerouted forward, APPROVED returns");
  click(container, { "data-rr-act": "verdict", "data-rr-id": "__run__", "data-rr-value": "APPROVED" });
  assert.equal(rr.rrRec(handle.state, "__run__").verdict, "APPROVED");
});

test("guard: a typed fix-here disposition holds APPROVED exactly as the button does", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_2);
  approveAllSteps(rr, handle);
  click(container, { "data-rr-act": "verdict", "data-rr-id": "K2", "data-rr-value": "CHANGES_REQUIRED" });
  type(container, { "data-rr-act": "disp-other", "data-rr-id": "K2" }, "  this_run  ");
  const T = rr.rrT(handle.state.lang);
  const guard = rr.rrRunApprovedGuard(handle.state.report, handle.state, T);
  assert.equal(guard.available, false, "the guard reads the disposition the output would carry");
  assert.ok(guard.reason.includes("1 fix is owed to this run itself"));
  // And whitespace alone is NO disposition — not a token that slips past the guard.
  type(container, { "data-rr-act": "disp-other", "data-rr-id": "K2" }, "   ");
  const again = rr.rrRunApprovedGuard(handle.state.report, handle.state, T);
  assert.equal(again.available, false);
  assert.ok(again.reason.includes("1 change still carries no disposition."));
});

test("guard: an APPROVED that predates the contradiction cannot sign — and taking it back stays open", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_2);
  approveAllSteps(rr, handle);
  click(container, { "data-rr-act": "verdict", "data-rr-id": "__run__", "data-rr-value": "APPROVED" });
  assert.equal(rr.rrRec(handle.state, "__run__").verdict, "APPROVED", "coherent when given");
  handle.state.reviewer = "QA";
  handle.redraw();
  // The contradiction arrives AFTER: a stop decision flips to CHANGES_REQUIRED with the
  // fix owed here — picked from the report's OWN verdict_disposition_options, which the
  // fixture now carries (criterion 9: the fourth disposition, exercised from data).
  click(container, { "data-rr-act": "verdict", "data-rr-id": "D1", "data-rr-value": "CHANGES_REQUIRED" });
  let html = container.innerHTML;
  assert.ok(html.includes('data-rr-value="this_run"'), "the report's own options offer the fourth disposition");
  assert.ok(html.includes('title="this run fixes it"'), "with its gloss");
  click(container, { "data-rr-act": "disposition", "data-rr-id": "D1", "data-rr-value": "this_run" });
  handle.goStep("__run__");
  html = container.innerHTML;
  // Everything is decided and the name is typed — only the contradiction blocks, by name.
  const blocks = rr.rrSignBlocks(handle.state.report, handle.state, rr.rrT(handle.state.lang));
  assert.equal(blocks.missing.length, 0, "nothing is missing — this is not the missing gate");
  assert.equal(blocks.ready, false, "and still the signature is refused");
  assert.ok(html.includes("APPROVED is not available for the run: 1 fix is owed to this run itself."),
    "the sign gate says why in words");
  assert.ok(/data-rr-act="sign"[^>]*disabled/.test(html), "the sign button waits");
  assert.ok(!runApprovedButton(html).includes("disabled"),
    "the selected APPROVED stays clickable — taking it back is how the operator resolves it");
  click(container, { "data-rr-act": "verdict", "data-rr-id": "__run__", "data-rr-value": "APPROVED" });
  assert.equal(rr.rrRec(handle.state, "__run__").verdict, null, "and it can be taken back");
  const out = rr.rrVerdictOutput(handle.state.report, handle.state);
  assert.equal(out.stopped, true, "a stop item was rejected: the derived fact travels regardless");
});

test("guard: the reason speaks the interface language of the moment", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_2);
  approveAllSteps(rr, handle);
  click(container, { "data-rr-act": "verdict", "data-rr-id": "K1", "data-rr-value": "CHANGES_REQUIRED" });
  click(container, { "data-rr-act": "disposition", "data-rr-id": "K1", "data-rr-value": "this_run" });
  handle.state.lang = "es";
  handle.goStep("__run__");
  assert.ok(container.innerHTML.includes("APPROVED no está disponible para el run: 1 arreglo se debe a este mismo run."),
    "the guard reason is chrome, and chrome translates");
});

// ---------------------------------------------------------------------------
// `stopped` — derived from the emitter's stop declaration and the operator's
// rejection, never chosen (criterion 6).
// ---------------------------------------------------------------------------

test("stopped: false until a stop item is actually rejected, true after, and back — always derived", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_1);
  // Pending is not rejected: nothing has halted yet.
  let out = rr.rrVerdictOutput(handle.state.report, handle.state);
  assert.equal(out.stopped, false, "a stop item still pending has not been rejected");
  // R1 is a stop item; rejecting it halts the run.
  click(container, { "data-rr-act": "verdict", "data-rr-id": "R1", "data-rr-value": "CHANGES_REQUIRED" });
  out = rr.rrVerdictOutput(handle.state.report, handle.state);
  assert.equal(out.stopped, true, "a rejected stop item is the halt, derived");
  // The run card's preview shows the derived fact to the operator before any signing.
  handle.goStep("__run__");
  assert.ok(container.innerHTML.includes("&quot;stopped&quot;: true"), "the preview carries it");
  // Approving the stop item withdraws the halt; rejecting a NON-stop item never raises it.
  click(container, { "data-rr-act": "verdict", "data-rr-id": "R1", "data-rr-value": "APPROVED" });
  click(container, { "data-rr-act": "verdict", "data-rr-id": "C3", "data-rr-value": "CHANGES_REQUIRED" });
  out = rr.rrVerdictOutput(handle.state.report, handle.state);
  assert.equal(out.stopped, false, "only the emitter's stop declaration can halt, and only when rejected");
});

test("stopped: no control on the surface sets it — it is not a choice", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_1);
  handle.goStep("__run__");
  assert.ok(!/data-rr-(?:act|value)="stopped"/.test(container.innerHTML),
    "nothing on the surface acts on stopped");
  const source = readFileSync(RENDERER, "utf8");
  assert.ok(!/data-rr-(?:act|value)="stopped"/.test(source), "and no such control exists in the renderer at all");
});

// ---------------------------------------------------------------------------
// The split vocabularies, driven through the painted surface: the model holds
// at the bar level too, not only in the constant declarations.
// ---------------------------------------------------------------------------

test("every item and decision bar offers exactly two tokens; only the run bar carries the third", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_2);
  const T = rr.rrT(handle.state.lang);
  for (const s of rr.rrSteps(handle.state.report, T)) {
    if (s.kind === "run") continue;
    handle.goStep(s.id);
    const bar = container.innerHTML;
    assert.ok(bar.includes('data-rr-value="APPROVED"'), s.id + " offers APPROVED");
    assert.ok(bar.includes('data-rr-value="CHANGES_REQUIRED"'), s.id + " offers CHANGES_REQUIRED");
    assert.ok(!bar.includes('data-rr-value="BLOCKED"'), s.id + " does not offer BLOCKED");
  }
  handle.goStep("__run__");
  assert.ok(container.innerHTML.includes('data-rr-value="BLOCKED"'), "the run keeps its third token");
});
