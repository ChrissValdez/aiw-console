// RUN-CONSOLE-VERDICT-POST-001 (#57), the CLIENT half: the verb stops lying.
//
// Before this run the sign button said "Write verdict.json" in both languages AND DOWNLOADED
// to the operator's machine. Now there are two verbs and each one is true: with a writer
// injected the button says "Write" and writes through the endpoint; with none it says
// "Download" and downloads — which is what the headless mounts of the older suites still
// exercise, so their pinned copy ("Complete. It downloads to your machine.") stays measured.
//
// The writer arrives by INJECTION: the console composes it (the one file that owns routes),
// the mount RELAYS it untouched, the renderer calls it with rrVerdictOutput and paints the
// endpoint's own answer. Nothing about a URL, a project or a report field enters the renderer.

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { createConsoleHarness } from "./helpers/console-dom.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const ASSETS = join(REPO_ROOT, "project-console", "assets");
const RENDERER = join(ASSETS, "run-report-renderer.js");
const CONSOLE_JS = join(ASSETS, "project-console.js");
const SURFACE_JS = join(ASSETS, "run-report-surface.js");
const FIXTURES = join(HERE, "fixtures", "reports");
const QA_ROOT = join(HERE, "fixtures", "reports-qa");

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

function mount(rr, input, opts) {
  const container = makeContainer();
  const handle = rr.renderRunReport(container, input, opts);
  return { container, handle };
}

function click(container, attrs) {
  const el = { getAttribute: (name) => (name in attrs ? attrs[name] : null) };
  container.handlers.click({ target: { closest: () => el } });
}

// Every step signed APPROVED — the run included — plus the typed name: the whole gate opened
// in one sweep. Test scaffolding, not a surface gesture; the renderer offers no approve-all,
// and its own suite proves that.
function signEverything(rr, handle, name) {
  const T = rr.rrT(handle.state.lang);
  rr.rrSteps(handle.state.report, T)
    .forEach((s) => rr.rrSetRec(handle.state, s.id === "__run__" ? "__run__" : s.id, { verdict: "APPROVED" }));
  rr.rrSetRec(handle.state, "__run__", { verdict: "APPROVED" });
  handle.state.reviewer = name;
  handle.redraw();
}

const flush = () => new Promise((resolveTick) => setTimeout(resolveTick, 0));

// ---------------------------------------------------------------------------
// The two verbs, each true — English and Spanish.
// ---------------------------------------------------------------------------

test("without a writer the button says Download and the complete hint keeps its measured copy — in both languages", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_2);
  signEverything(rr, handle, "QA");
  handle.goStep("__run__");
  let html = container.innerHTML;
  assert.ok(html.includes("Download verdict.json"), "the English verb is the act: a download");
  assert.ok(!html.includes("Write verdict.json"), "and it does not claim a write it will not do");
  assert.ok(html.includes("Complete. It downloads to your machine."));
  handle.state.lang = "es";
  handle.redraw();
  html = container.innerHTML;
  assert.ok(html.includes("Descargar verdict.json"), "the Spanish verb is the same act");
  assert.ok(!html.includes("Escribir verdict.json"));
  assert.ok(html.includes("Se descarga en tu equipo."));
});

test("with a writer the button says Write in both languages, and the hint says where it lands", () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_2, { writeVerdict: async () => ({ ok: true, path: "x" }) });
  signEverything(rr, handle, "QA");
  handle.goStep("__run__");
  let html = container.innerHTML;
  assert.ok(html.includes("Write verdict.json"), "the English verb is the act: a write");
  assert.ok(!html.includes("Download verdict.json"));
  assert.ok(html.includes("Complete. It writes verdict.json beside the report."));
  handle.state.lang = "es";
  handle.redraw();
  html = container.innerHTML;
  assert.ok(html.includes("Escribir verdict.json"), "the Spanish verb is the same act");
  assert.ok(!html.includes("Descargar verdict.json"));
  assert.ok(html.includes("Completo. Escribe verdict.json junto al reporte."));
});

// ---------------------------------------------------------------------------
// The sign gesture drives the writer, and the outcome paints from the answer.
// ---------------------------------------------------------------------------

test("sign calls the writer with rrVerdictOutput of the state, once, and paints the path the endpoint answered", async () => {
  const rr = loadRenderer();
  const calls = [];
  const writer = async (verdict) => { calls.push(verdict); return { ok: true, path: "reports/RUN-X/verdict.json" }; };
  const { container, handle } = mount(rr, CASE_2, { writeVerdict: writer });
  signEverything(rr, handle, "Operadora Q.");
  handle.goStep("__run__");
  click(container, { "data-rr-act": "sign" });
  await flush();
  assert.equal(calls.length, 1, "one gesture, one write");
  assert.deepEqual(calls[0], rr.rrVerdictOutput(handle.state.report, handle.state),
    "what travels is the model's own output — the exact object the preview shows");
  assert.equal(handle.state.write.status, "written");
  assert.ok(container.innerHTML.includes("Written: reports/RUN-X/verdict.json"), "the hint carries the endpoint's own path");
});

test("a refusal paints in the endpoint's own words, and nothing pretends success", async () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_2, {
    writeVerdict: async () => ({ ok: false, reason: "K1: a disposition travels only with CHANGES_REQUIRED" })
  });
  signEverything(rr, handle, "QA");
  handle.goStep("__run__");
  click(container, { "data-rr-act": "sign" });
  await flush();
  assert.equal(handle.state.write.status, "failed");
  assert.ok(container.innerHTML.includes("The write was refused: K1: a disposition travels only with CHANGES_REQUIRED"));
});

test("a writer that THROWS is a failure with the error's message, never an unhandled rejection", async () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_2, {
    writeVerdict: async () => { throw new Error("the request failed"); }
  });
  signEverything(rr, handle, "QA");
  handle.goStep("__run__");
  click(container, { "data-rr-act": "sign" });
  await flush();
  assert.equal(handle.state.write.status, "failed");
  assert.ok(container.innerHTML.includes("The write was refused: the request failed"));
});

test("changing anything after a write retires the WRITTEN claim: the hint must not vouch for a state that moved", async () => {
  const rr = loadRenderer();
  const { container, handle } = mount(rr, CASE_2, { writeVerdict: async () => ({ ok: true, path: "p" }) });
  signEverything(rr, handle, "QA");
  handle.goStep("__run__");
  click(container, { "data-rr-act": "sign" });
  await flush();
  assert.equal(handle.state.write.status, "written");
  click(container, { "data-rr-act": "verdict", "data-rr-id": "K1", "data-rr-value": "CHANGES_REQUIRED" });
  assert.equal(handle.state.write.status, "idle", "the claim retired with the change");
  handle.goStep("__run__");
  assert.ok(!container.innerHTML.includes("Written: "), "and the hint no longer vouches");
});

test("the sign gate still holds with a writer: not ready means no call, ever", async () => {
  const rr = loadRenderer();
  const calls = [];
  const { container, handle } = mount(rr, CASE_2, { writeVerdict: async (v) => { calls.push(v); return { ok: true }; } });
  handle.goStep("__run__");
  click(container, { "data-rr-act": "sign" });
  await flush();
  assert.equal(calls.length, 0, "an incomplete review cannot write");
});

// ---------------------------------------------------------------------------
// The wiring, end to end: console -> mount -> renderer.
// ---------------------------------------------------------------------------

test("opening a report through the console hands the renderer a WRITER — the injection is real, not a default", async () => {
  const harness = createConsoleHarness({
    rendererPath: CONSOLE_JS,
    rootsByKey: new Map([["reports-qa", QA_ROOT]]),
    alsoLoad: [RENDERER, SURFACE_JS]
  });
  harness.sandbox.resetProjectScopedState();
  harness.sandbox.setActiveProjectBase("/projects/reports-qa/");
  await harness.sandbox.loadActiveProject();
  await harness.flush();
  await harness.sandbox.v3OpenRunReport("RUN-QA-REPORT-DEVELOPMENT-001");
  await harness.flush();
  const open = harness.sandbox.openRunReportState();
  assert.ok(open && open.handle, "the report is open with a live handle");
  assert.equal(typeof open.handle.state.writer, "function",
    "the console composed a writer and it survived the relay through the mount");
});
