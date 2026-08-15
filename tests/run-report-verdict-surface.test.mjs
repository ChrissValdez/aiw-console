// RUN-CONSOLE-VERDICT-SURFACE-001 (#58) — the signed verdict stops being invisible.
//
// The write route landed in #57 and the operator used it: they signed, came back, SAW NOTHING,
// and signed again. Both writes happened and the second silently replaced the first, because
// nothing ever read verdict.json back. These are the four things that follow from that, and
// every one of them was found by an operator using the surface rather than by a suite:
//
//   1. READ BACK ON OPEN. A verdict beside the report fills the form, so a report that was
//      signed cannot come back looking as though nobody had judged it.
//   2. WHAT IS TYPED SURVIVES A RELOAD, in the mechanism the console already has — the same
//      localStorage that already remembers the interface language and the theme — and the
//      typed judgement WINS over the filed one, which stays named beside it.
//   3. D-066. Signing over an existing verdict is never a direct write: it warns, it carries a
//      summary DERIVED by comparing the two files, and it waits for an explicit confirmation.
//      When nothing changes it warns too, in those words, because a warning that only shows up
//      on a difference teaches the operator to click without reading.
//   4. THE RECAP IS LEGIBLE AND ITS BLOCKERS ARE REACHABLE. The denominator does not change —
//      it was already correct — but it is said once, with its reason, and the steps that hold
//      the run are named in a collapsed list whose every row goes to its own step.

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const ASSETS = join(REPO_ROOT, "project-console", "assets");
const RENDERER = join(ASSETS, "run-report-renderer.js");
const FIXTURES = join(HERE, "fixtures", "reports");

const CASE_1 = readFileSync(join(FIXTURES, "CASO-1-audit-contenido.report.json"), "utf8");
const CASE_2 = readFileSync(join(FIXTURES, "CASO-2-development.report.json"), "utf8");

// A stand-in for the browser's own store, so the persistence half runs headless. It is a Map
// and nothing more: what is measured here is that the renderer reaches for THIS and not for a
// mechanism the console does not have.
function makeStore() {
  const map = new Map();
  return {
    map,
    getItem(key) { return map.has(key) ? map.get(key) : null; },
    setItem(key, value) { map.set(key, String(value)); },
    removeItem(key) { map.delete(key); }
  };
}

function loadRenderer(store) {
  const sandbox = { console };
  if (store) sandbox.localStorage = store;
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

function mount(rr, input, opts) {
  const container = makeContainer();
  const handle = rr.renderRunReport(container, input, opts);
  return { container, handle };
}

function click(container, attrs) {
  const el = { getAttribute: (name) => (name in attrs ? attrs[name] : null) };
  container.handlers.click({ target: { closest: () => el } });
}

const flush = () => new Promise((tick) => setTimeout(tick, 0));

// Scaffolding, not a gesture: the surface offers no approve-all and its own suite proves it.
function signEverything(rr, handle, name) {
  const T = rr.rrT(handle.state.lang);
  rr.rrSigningSteps(handle.state.report, T).forEach((s) => rr.rrSetRec(handle.state, s.id, { verdict: "APPROVED" }));
  handle.state.reviewer = name;
  handle.redraw();
}

// A writer that records what it was handed and answers like the endpoint does.
function recordingWriter(answer) {
  const calls = [];
  const writer = (verdict) => {
    calls.push(JSON.parse(JSON.stringify(verdict)));
    return Promise.resolve(answer || { ok: true, path: "reports/X/verdict.json" });
  };
  writer.calls = calls;
  return writer;
}

// ---------------------------------------------------------------------------
// 1 — READ BACK ON OPEN.
// ---------------------------------------------------------------------------

test("a verdict beside the report fills the form on open: verdicts, signer and progress all come back", () => {
  const rr = loadRenderer();
  // First mount signs everything; what it would write is the file the SECOND mount is handed.
  const first = mount(rr, CASE_1);
  signEverything(rr, first.handle, "Q. Operator");
  const filed = JSON.parse(JSON.stringify(rr.rrVerdictOutput(first.handle.state.report, first.handle.state)));

  const reopened = mount(rr, CASE_1, { existingVerdict: filed });
  const T = rr.rrT(reopened.handle.state.lang);
  const progress = rr.rrProgress(reopened.handle.state.report, reopened.handle.state, T);
  assert.equal(progress.done, progress.total, "every signable step came back signed");
  assert.equal(reopened.handle.state.reviewer, "Q. Operator", "and the signer came back with them");
  assert.equal(rr.rrRec(reopened.handle.state, "__run__").verdict, "APPROVED");
  // The whole point, in one assertion: nothing about this mount reads as unsigned.
  assert.deepEqual([...rr.rrMissing(reopened.handle.state.report, reopened.handle.state, T)], [],
    "nothing is missing — the reopened report is not a blank form");
});

test("the filed verdict is NAMED on screen, in the topbar and on the run card — not merely absorbed", () => {
  const rr = loadRenderer();
  const first = mount(rr, CASE_1);
  signEverything(rr, first.handle, "Q. Operator");
  const filed = JSON.parse(JSON.stringify(rr.rrVerdictOutput(first.handle.state.report, first.handle.state)));

  const opened = mount(rr, CASE_1, { existingVerdict: filed });
  // The chip rides the topbar, which is on screen from the FIRST card. A fact only visible on
  // the last card is a fact the operator signs without.
  assert.ok(opened.container.innerHTML.includes("rr-filed-chip"), "the topbar chip is there from step one");
  opened.handle.goStep("__run__");
  assert.ok(opened.container.innerHTML.includes("rr-filed"), "and the run card spells it out");
  assert.ok(opened.container.innerHTML.includes("Q. Operator"), "naming who signed the one on disk");

  // And with nothing on disk, neither appears: absence is not dressed as presence.
  const bare = mount(rr, CASE_1);
  assert.ok(!bare.container.innerHTML.includes("rr-filed-chip"), "no chip when no verdict is filed");
});

test("a verdict.json that does not parse is treated as none: the report still opens and still signs", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_1, { existingVerdict: "{ this is not json" });
  assert.equal(handle.state.filed, null, "a damaged file beside the report is no file");
  assert.equal(handle.state.error, null, "and it is NOT the report's parse error — the report read fine");
  assert.ok(container.innerHTML.includes("rr-card-head"), "the report opened anyway");
  assert.ok(!container.innerHTML.includes("rr-filed-chip"), "and claims no filed verdict it could not read");
});

test("a disposition comes back where the operator put it: on its button, or in the box they typed it into", () => {
  const rr = loadRenderer();
  const filed = {
    run: { verdict: null }, verdict_by: "Q. Operator",
    items: [
      { item_id: "R1", verdict: "CHANGES_REQUIRED", disposition: "new_run" },
      { item_id: "R2", verdict: "CHANGES_REQUIRED", disposition: "a route nobody offered" }
    ]
  };
  const { handle } = mount(rr, CASE_1, { existingVerdict: filed });
  const offered = rr.rrRec(handle.state, "R1");
  assert.equal(offered.disposition, "new_run", "an offered token lands back on its button");
  const typed = rr.rrRec(handle.state, "R2");
  assert.equal(typed.disposition, undefined, "one nobody offers is not forced onto a button");
  assert.equal(typed.dispOther, "a route nobody offered", "it comes back in the box it was typed into");
  // Either way the model reads the same value, so the guard judges it identically.
  assert.equal(rr.rrEffectiveDisposition(typed), "a route nobody offered");
});

// ---------------------------------------------------------------------------
// 2 — WHAT IS TYPED SURVIVES A RELOAD, in the mechanism the console already had.
// ---------------------------------------------------------------------------

test("what is typed survives a reload, and it is stored where the language and the theme already are", () => {
  const store = makeStore();
  const rr = loadRenderer(store);
  const first = mount(rr, CASE_1);
  click(first.container, { "data-rr-act": "verdict", "data-rr-id": "R1", "data-rr-value": "CHANGES_REQUIRED" });
  first.container.handlers.input({
    target: { getAttribute: (n) => ({ "data-rr-act": "reviewer" })[n] || null, value: "Q. Operator" }
  });

  // The measured claim: ONE mechanism, the same prefix the other two remembered things use.
  const keys = [...store.map.keys()];
  assert.ok(keys.every((k) => k.indexOf("rr.") === 0), "every key this view stores is under its own prefix: " + keys.join(", "));
  assert.ok(keys.some((k) => k.indexOf("rr.draft.") === 0), "the typed judgement is one of them");

  // The reload: a brand new renderer and a brand new mount, same store.
  const again = loadRenderer(store);
  const reopened = mount(again, CASE_1);
  assert.equal(again.rrRec(reopened.handle.state, "R1").verdict, "CHANGES_REQUIRED", "the verdict came back");
  assert.equal(reopened.handle.state.reviewer, "Q. Operator", "and so did the name being typed");
});

test("two reports do not overwrite each other's typing", () => {
  const store = makeStore();
  const rr = loadRenderer(store);
  const one = mount(rr, CASE_1);
  click(one.container, { "data-rr-act": "verdict", "data-rr-id": "R1", "data-rr-value": "APPROVED" });
  const two = mount(rr, CASE_2);
  click(two.container, { "data-rr-act": "verdict", "data-rr-id": "C1", "data-rr-value": "CHANGES_REQUIRED" });

  const again = loadRenderer(store);
  assert.equal(again.rrRec(mount(again, CASE_1).handle.state, "R1").verdict, "APPROVED");
  assert.equal(again.rrRec(mount(again, CASE_2).handle.state, "C1").verdict, "CHANGES_REQUIRED");
});

test("THE PROMISE: with both a filed verdict and typing, what was TYPED is on screen and the filed one stays named", () => {
  const store = makeStore();
  const rr = loadRenderer(store);
  const first = mount(rr, CASE_1);
  signEverything(rr, first.handle, "Q. Operator");
  const filed = JSON.parse(JSON.stringify(rr.rrVerdictOutput(first.handle.state.report, first.handle.state)));

  // Typing that disagrees with the file: R1 rejected where the file approved it.
  const typing = mount(rr, CASE_1, { existingVerdict: filed });
  click(typing.container, { "data-rr-act": "verdict", "data-rr-id": "R1", "data-rr-value": "CHANGES_REQUIRED" });

  const again = loadRenderer(store);
  const reopened = mount(again, CASE_1, { existingVerdict: filed });
  assert.equal(again.rrRec(reopened.handle.state, "R1").verdict, "CHANGES_REQUIRED",
    "what the operator typed wins over the file — a reload throws nothing away");
  assert.ok(reopened.handle.state.filed, "and the filed verdict is still read");
  assert.equal(reopened.handle.state.restored, true, "the view knows what is on screen came back from a reload");
  reopened.handle.goStep("__run__");
  assert.ok(reopened.container.innerHTML.includes("rr-filed-note"), "and says so, next to the one on disk");
});

// ---------------------------------------------------------------------------
// 3 — D-066, AND IT IS THE LAW OF THIS RUN.
// ---------------------------------------------------------------------------

test("D-066: the first press over an existing verdict writes NOTHING — it warns and waits", async () => {
  const rr = loadRenderer();
  const first = mount(rr, CASE_1);
  signEverything(rr, first.handle, "Q. Operator");
  const filed = JSON.parse(JSON.stringify(rr.rrVerdictOutput(first.handle.state.report, first.handle.state)));

  const writer = recordingWriter();
  const { container, handle } = mount(rr, CASE_1, { existingVerdict: filed, writeVerdict: writer });
  click(container, { "data-rr-act": "verdict", "data-rr-id": "R2", "data-rr-value": "CHANGES_REQUIRED" });
  click(container, { "data-rr-act": "disposition", "data-rr-id": "R2", "data-rr-value": "new_run" });
  // The sign button lives on the run card, which is where the operator presses it.
  handle.goStep("__run__");
  click(container, { "data-rr-act": "sign" });
  await flush();

  assert.equal(writer.calls.length, 0, "NOTHING was written by the press that raised the warning");
  assert.ok(handle.state.confirm, "a confirmation is pending");
  assert.ok(container.innerHTML.includes("rr-confirm"), "and the panel is on screen");
  assert.ok(container.innerHTML.includes("rr-confirm-actions"), "with the two ways out");
});

test("D-066: cancelling writes nothing at all, and the panel goes away", async () => {
  const rr = loadRenderer();
  const first = mount(rr, CASE_1);
  signEverything(rr, first.handle, "Q. Operator");
  const filed = JSON.parse(JSON.stringify(rr.rrVerdictOutput(first.handle.state.report, first.handle.state)));

  const writer = recordingWriter();
  const { container, handle } = mount(rr, CASE_1, { existingVerdict: filed, writeVerdict: writer });
  handle.goStep("__run__");
  click(container, { "data-rr-act": "sign" });
  await flush();
  assert.ok(container.innerHTML.includes("rr-confirm-actions"), "the panel was up");
  click(container, { "data-rr-act": "cancel-write" });
  await flush();

  assert.equal(writer.calls.length, 0, "a cancel is a write that never happened");
  assert.equal(handle.state.confirm, null);
  assert.ok(!container.innerHTML.includes("rr-confirm-actions"), "the panel is gone");
});

test("D-066: only the explicit confirmation writes, and it writes exactly once", async () => {
  const rr = loadRenderer();
  const first = mount(rr, CASE_1);
  signEverything(rr, first.handle, "Q. Operator");
  const filed = JSON.parse(JSON.stringify(rr.rrVerdictOutput(first.handle.state.report, first.handle.state)));

  const writer = recordingWriter();
  const { container, handle } = mount(rr, CASE_1, { existingVerdict: filed, writeVerdict: writer });
  click(container, { "data-rr-act": "sign" });
  await flush();
  click(container, { "data-rr-act": "confirm-write" });
  await flush();

  assert.equal(writer.calls.length, 1, "one confirmation, one write");
  assert.equal(handle.state.write.status, "written");
  assert.equal(handle.state.confirm, null, "and the question is closed");
});

test("D-066: WHEN NOTHING CHANGES IT WARNS TOO, and says it is overwritten with the same data", async () => {
  const rr = loadRenderer();
  const first = mount(rr, CASE_1);
  signEverything(rr, first.handle, "Q. Operator");
  const filed = JSON.parse(JSON.stringify(rr.rrVerdictOutput(first.handle.state.report, first.handle.state)));

  const writer = recordingWriter();
  // Reopened and signed again with not one keystroke changed — the exact case that taught the
  // operator nothing was happening, because the second write was silent.
  const { container, handle } = mount(rr, CASE_1, { existingVerdict: filed, writeVerdict: writer });
  handle.goStep("__run__");
  click(container, { "data-rr-act": "sign" });
  await flush();

  assert.equal(writer.calls.length, 0, "identical is still not a direct write");
  assert.equal(handle.state.confirm.delta.identical, true, "and the view MEASURED that it is identical");
  assert.ok(container.innerHTML.includes("rr-confirm-same"), "the sameness is what the panel says");
  const T = rr.rrT(handle.state.lang);
  assert.ok(container.innerHTML.includes(T.overwriteSame.slice(0, 30)), "in those words: " + T.overwriteSame);
});

test("D-066: the summary is DERIVED from the two files — it names the steps that changed, and only those", () => {
  const rr = loadRenderer();
  const first = mount(rr, CASE_1);
  signEverything(rr, first.handle, "Q. Operator");
  const filed = JSON.parse(JSON.stringify(rr.rrVerdictOutput(first.handle.state.report, first.handle.state)));

  const second = mount(rr, CASE_1, { existingVerdict: filed });
  // Three different kinds of change, on three different steps.
  click(second.container, { "data-rr-act": "verdict", "data-rr-id": "R2", "data-rr-value": "CHANGES_REQUIRED" });
  click(second.container, { "data-rr-act": "disposition", "data-rr-id": "R2", "data-rr-value": "new_run" });
  second.container.handlers.input({
    target: { getAttribute: (n) => ({ "data-rr-act": "note", "data-rr-id": "C1" })[n] || null, value: "a second look" }
  });

  const T = rr.rrT(second.handle.state.lang);
  const delta = rr.rrVerdictDelta(second.handle.state.report, filed,
    rr.rrVerdictOutput(second.handle.state.report, second.handle.state), T);
  assert.equal(delta.identical, false);
  const touched = [...delta.steps.map((s) => s.id)].sort();
  assert.deepEqual(touched, ["C1", "R2"], "exactly the two steps that changed, and no other of the twelve");
  const r2 = delta.steps.find((s) => s.id === "R2");
  assert.deepEqual([...r2.changes.map((c) => c.field)], [T.changeVerdict, T.changeDisposition],
    "R2 changed verdict AND disposition, and the summary says which");
  const c1 = delta.steps.find((s) => s.id === "C1");
  assert.deepEqual([...c1.changes.map((c) => c.field)], [T.changeNote], "C1 changed only its note");
  assert.equal(c1.changes[0].to, "a second look", "and the summary carries the new value");
});

test("D-066: a change made while the panel is open withdraws it — the question asked is the question answered", async () => {
  const rr = loadRenderer();
  const first = mount(rr, CASE_1);
  signEverything(rr, first.handle, "Q. Operator");
  const filed = JSON.parse(JSON.stringify(rr.rrVerdictOutput(first.handle.state.report, first.handle.state)));

  const writer = recordingWriter();
  const { container, handle } = mount(rr, CASE_1, { existingVerdict: filed, writeVerdict: writer });
  click(container, { "data-rr-act": "sign" });
  await flush();
  assert.ok(handle.state.confirm, "pending");
  click(container, { "data-rr-act": "verdict", "data-rr-id": "R2", "data-rr-value": "CHANGES_REQUIRED" });
  assert.equal(handle.state.confirm, null, "the comparison it was showing is no longer the one that would be written");
  // And confirming now does nothing: there is no pending question to answer.
  click(container, { "data-rr-act": "confirm-write" });
  await flush();
  assert.equal(writer.calls.length, 0);
});

test("a FIRST signature is untouched: with nothing on disk, signing writes directly, exactly as #57 left it", async () => {
  const rr = loadRenderer();
  const writer = recordingWriter();
  const { container, handle } = mount(rr, CASE_1, { writeVerdict: writer });
  signEverything(rr, handle, "Q. Operator");
  click(container, { "data-rr-act": "sign" });
  await flush();

  assert.equal(writer.calls.length, 1, "no verdict on disk, no warning, one write");
  assert.equal(handle.state.write.status, "written");
});

test("after a write the file just written becomes the baseline, so a SECOND press warns about the second change", async () => {
  const store = makeStore();
  const rr = loadRenderer(store);
  const writer = recordingWriter();
  const { container, handle } = mount(rr, CASE_1, { writeVerdict: writer });
  signEverything(rr, handle, "Q. Operator");
  click(container, { "data-rr-act": "sign" });
  await flush();
  assert.equal(writer.calls.length, 1);
  assert.ok(handle.state.filed, "what was written is now what is filed");
  // The typed copy has no separate life left: it became the file.
  assert.ok(![...store.map.keys()].some((k) => k.indexOf("rr.draft.") === 0), "and is not left behind to be restored over it");

  click(container, { "data-rr-act": "sign" });
  await flush();
  assert.equal(writer.calls.length, 1, "the second press warns instead of writing");
  assert.ok(handle.state.confirm, "over the verdict this same session filed");
});

// ---------------------------------------------------------------------------
// 4 — THE RECAP READS WITHOUT ARITHMETIC, AND ITS BLOCKERS ARE REACHABLE.
// ---------------------------------------------------------------------------

test("the denominator is UNCHANGED and correct: the run does not count itself, and a step asking no verdict does not swell it", () => {
  const rr = loadRenderer();
  const { handle } = mount(rr, CASE_1);
  const T = rr.rrT(handle.state.lang);
  // CASO-1 measured against the file [#60, re-copied]: 18 items + 2 decisions + the run =
  // 21 steps; its ten `info` items declare requires_verdict false, so 11 ask for a verdict;
  // the run does not count itself, so 10.
  assert.equal(rr.rrSteps(handle.state.report, T).length, 21, "twenty-one steps are walked through");
  assert.equal(rr.rrSigningSteps(handle.state.report, T).length, 11, "eleven of them ask for a verdict");
  const decided = rr.rrSigningSteps(handle.state.report, T).filter((s) => s.kind !== "run");
  assert.equal(decided.length, 10, "and the recap's denominator is ten");
});

test("the recap says the denominator ONCE, with its reason, and the rows stopped reading like separate totals", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_1);
  handle.goStep("__run__");
  const html = container.innerHTML;
  const T = rr.rrT(handle.state.lang);

  assert.ok(html.includes('<span class="rr-recap-total">10</span>'), "the number, once, at the top");
  assert.ok(html.includes(rr.rrT("en").recapDenominator(10)), "saying what it counts");
  assert.ok(html.includes(T.recapWhy), "and why it is that number and not another");
  // The defect itself: no row prints a denominator any more.
  const rows = [...html.matchAll(/<span class="rr-recap-value">([^<]*)<\/span>/g)].map((m) => m[1]);
  assert.ok(rows.length > 0, "there are still rows");
  for (const row of rows) {
    assert.ok(!row.includes("/"), "no row prints a denominator of its own: " + JSON.stringify(row));
    assert.ok(/^\d+$/.test(row), "a row is a bare count and nothing else: " + JSON.stringify(row));
  }
});

test("the recap NAMES the pending steps and every one of them is a way in — closed by default", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_1);
  handle.goStep("__run__");
  const html = container.innerHTML;

  assert.ok(html.includes('<details class="rr-blockers">'), "a list");
  assert.ok(!html.includes('<details class="rr-blockers" open>'), "closed by default — the operator asked for closed");
  // Reaching it, not just knowing it: the rows carry the rail's own navigation.
  assert.ok(/<div class="rr-blocker-row" data-rr-act="goto" data-rr-id="R1"/.test(html),
    "and each row goes to its own step");
  // And it really navigates — the same delegate the rail uses.
  click(container, { "data-rr-act": "goto", "data-rr-id": "C1" });
  const T = rr.rrT(handle.state.lang);
  assert.equal(rr.rrSteps(handle.state.report, T)[handle.state.cardIdx].id, "C1", "the click lands on that step");
});

test("the guard names what holds the run, not just how many — and each one is reachable", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_1);
  const T = rr.rrT(handle.state.lang);
  // One step owes the fix to this run itself; another carries no disposition at all.
  click(container, { "data-rr-act": "verdict", "data-rr-id": "R1", "data-rr-value": "CHANGES_REQUIRED" });
  click(container, { "data-rr-act": "disposition", "data-rr-id": "R1", "data-rr-value": "this_run" });
  click(container, { "data-rr-act": "verdict", "data-rr-id": "R2", "data-rr-value": "CHANGES_REQUIRED" });

  const guard = rr.rrRunApprovedGuard(handle.state.report, handle.state, T);
  assert.equal(guard.available, false, "APPROVED is withheld");
  const named = [...guard.blockers.map((b) => b.id)].sort();
  assert.deepEqual(named, ["R1", "R2"], "and the guard NAMES both, where it used to only count them");
  const byId = {};
  guard.blockers.forEach((b) => { byId[b.id] = b.why; });
  assert.equal(byId.R1, T.blockerOwedHere, "R1 is owed to this run");
  assert.equal(byId.R2, T.blockerNoDisposition, "R2 carries no disposition");

  handle.goStep("__run__");
  const html = container.innerHTML;
  assert.ok(html.includes("rr-guard-reason"), "the written reason is still there, word for word");
  assert.ok(/<div class="rr-blocker-row" data-rr-act="goto" data-rr-id="R1"/.test(html), "with a way to each one");
});

// ---------------------------------------------------------------------------
// THE RELAY. The mount fetches the URL the console composed and hands the bytes over. It
// parses nothing, so there is no field of a verdict it could come to know — the same rule
// that already governs how the report itself travels through it.
// ---------------------------------------------------------------------------

const SURFACE = join(ASSETS, "run-report-surface.js");

function loadSurfaceWithStubs(fetchImpl) {
  const seen = { renderOpts: null, renderBody: null, urls: [] };
  const el = () => ({
    innerHTML: "", className: "", scrollTop: 0, textContent: "",
    classList: { toggle() {} },
    setAttribute() {}, removeAttribute() {}, addEventListener() {},
    querySelector() { return null; }
  });
  const nodes = {
    "run-report-view": el(), "run-report-scroll": el(), "run-report-mount": el(),
    "run-report-back": el(), "run-report-ref-title": el(), "run-report-ref-id": el()
  };
  const sandbox = {
    console,
    document: { getElementById: (id) => nodes[id] || null },
    fetch: (url, init) => { seen.urls.push(String(url)); return fetchImpl(String(url), init); },
    renderRunReport: (mountEl, body, opts) => { seen.renderBody = body; seen.renderOpts = opts; return { state: {} }; }
  };
  vm.createContext(sandbox);
  vm.runInContext(readFileSync(SURFACE, "utf8"), sandbox, { filename: SURFACE });
  return { sandbox, seen };
}

const okResponse = (body) => Promise.resolve({ ok: true, status: 200, text: () => Promise.resolve(body) });
const notFound = () => Promise.resolve({ ok: false, status: 404, statusText: "not found", text: () => Promise.resolve("") });

test("the mount fetches the verdict URL it was given and relays the BYTES untouched", async () => {
  const filedBytes = '{"schema_version":1,"verdict_by":"Q. Operator","run":{"verdict":"APPROVED"}}';
  const { sandbox, seen } = loadSurfaceWithStubs((url) =>
    url.indexOf("verdict.json") >= 0 ? okResponse(filedBytes) : okResponse(CASE_1));

  const result = await sandbox.openRunReport({
    runId: "RUN-X", reportUrl: "/projects/p/reports/RUN-X/report.json",
    verdictUrl: "/projects/p/reports/RUN-X/verdict.json"
  });
  assert.equal(result.ok, true);
  assert.ok(seen.urls.some((u) => u.indexOf("verdict.json") >= 0), "it asked for the verdict");
  assert.equal(seen.renderOpts.existingVerdict, filedBytes,
    "and handed the renderer the bytes exactly as they came off the wire — not an object it parsed");
});

test("no verdict beside the report is the ORDINARY answer: the report still opens, and claims none", async () => {
  const { sandbox, seen } = loadSurfaceWithStubs((url) =>
    url.indexOf("verdict.json") >= 0 ? notFound() : okResponse(CASE_1));

  const result = await sandbox.openRunReport({
    runId: "RUN-X", reportUrl: "/projects/p/reports/RUN-X/report.json",
    verdictUrl: "/projects/p/reports/RUN-X/verdict.json"
  });
  assert.equal(result.ok, true, "a 404 on the verdict is not a failure to open the report");
  assert.equal(seen.renderOpts.existingVerdict, null, "and nothing is claimed to be filed");
});

test("a run with nothing blocking it prints no guard reason and no list — absence stays absence", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_1);
  signEverything(rr, handle, "Q. Operator");
  handle.goStep("__run__");
  const html = container.innerHTML;
  assert.ok(!html.includes("rr-guard-reason"), "nothing to say, nothing said");
  // The recap's own list is empty too once every step is signed.
  assert.ok(!/<div class="rr-blocker-row"/.test(html), "and nobody is named as pending");
});
