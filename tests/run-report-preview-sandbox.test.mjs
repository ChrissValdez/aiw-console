// RUN-CONSOLE-PREVIEW-SANDBOX-001 — the preview frame is project-authored HTML served on the
// console's own origin, next to the three routes that write. This suite pins the DECISION that
// closes that: the frame carries `sandbox` with the EMPTY token set, and the server's origin
// gate refuses the `Origin: null` a document inside such a frame is forced to send.
//
// THE CHAIN, in one file on purpose: `sandbox` without `allow-same-origin` makes the framed
// document an opaque origin (no console DOM, no typed signature), and every request from inside
// it carries `Origin: null`, which `isLocalOrigin` refuses at 403 BEFORE any route logic runs.
// Remove the attribute and the renderer sweep below goes red; teach the gate to accept a null
// origin and the server half below goes red. There is no way to reopen the exposure that leaves
// this file green.
//
// The renderer is the shipped classic script loaded whole into node:vm, exactly as the other
// report suites load it; the server is the real serve.mjs listening on an ephemeral port against
// a GENERATED registry in a temp dir, so nothing these tests refuse (or admit) can touch a real
// repository.

import test from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { server, HOST } from "../project-console/serve.mjs";
import { serialize } from "../tools/roadmap/roadmap-core.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const RENDERER = join(REPO_ROOT, "project-console", "assets", "run-report-renderer.js");
const CASES_DIR = join(HERE, "fixtures", "reports");
const QA_LESSON_REPORT = join(HERE, "fixtures", "reports-qa", "reports", "RUN-QA-REPORT-LESSON-001", "report.json");
const QA_LESSON_ASSETS = join(HERE, "fixtures", "reports-qa", "reports", "RUN-QA-REPORT-LESSON-001", "assets");

const ALL_CASES = [
  "CASO-1-audit-contenido.report.json",
  "CASO-2-development.report.json",
  "CASO-3-creacion-leccion.report.json",
  "CASO-4-sin-qa.report.json"
].map((name) => readFileSync(join(CASES_DIR, name), "utf8"));
const LESSON = readFileSync(QA_LESSON_REPORT, "utf8");

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

// Flip every declared preview of every item to a probe that answered ok, so every pane the
// renderer CAN frame IS framed — the sweep must see the branch that builds iframes, not the
// honest missing pane.
function frameEverything(handle) {
  handle.state.report.items.forEach((item) => {
    const previews = (item.subject && item.subject.previews) || [];
    previews.forEach((p) => { handle.state.previewStatus[p.path] = "ok"; });
  });
  handle.redraw();
}

// Every <iframe ...> tag of every card of a report, both languages, probes ok.
function everyFrameTag(rr, input, opts) {
  const tags = [];
  for (const lang of ["en", "es"]) {
    const { handle } = mount(rr, input, opts);
    handle.state.lang = lang;
    frameEverything(handle);
    const T = rr.rrT(handle.state.lang);
    rr.rrSteps(handle.state.report, T).forEach((s) => {
      handle.goStep(s.id);
      const html = rr.rrRootHtml(handle.state);
      for (const m of html.matchAll(/<iframe\b[^>]*>/g)) tags.push(m[0]);
    });
  }
  return tags;
}

function sandboxAttrOf(tag) {
  const m = tag.match(/\bsandbox(?:="([^"]*)")?/);
  return m ? (m[1] ?? "") : null;
}

// ---------------------------------------------------------------------------
// PROOF (c), renderer half — every frame the renderer can ever paint carries `sandbox` with
// the empty token set. THIS is the test that goes red if someone takes the attribute off, or
// grants a token back without coming here to say why.
// ---------------------------------------------------------------------------

test("every preview frame carries sandbox with the EMPTY token set — swept over every card of every fixture, both languages", () => {
  const rr = loadRenderer();
  let framesSeen = 0;
  for (const input of [...ALL_CASES, LESSON]) {
    for (const tag of everyFrameTag(rr, input, { previewBase: "/projects/reports-qa/" })) {
      framesSeen += 1;
      const tokens = sandboxAttrOf(tag);
      assert.notEqual(tokens, null, `a preview frame has NO sandbox attribute: ${tag}`);
      assert.equal(tokens, "",
        `the sandbox token set widened from the decided EMPTY set — that is a new decision, ` +
        `write it down in a run before granting it: ${tag}`);
    }
  }
  // The sweep must have exercised the framing branch, or it proved nothing.
  assert.ok(framesSeen >= 2, `the sweep framed ${framesSeen} panes; the lesson fixture alone declares two`);
});

test("in particular: allow-same-origin is never granted — the frame stays an opaque origin", () => {
  const rr = loadRenderer();
  for (const input of [...ALL_CASES, LESSON]) {
    for (const tag of everyFrameTag(rr, input, {})) {
      assert.ok(!/allow-same-origin/.test(tag),
        `allow-same-origin would hand the framed HTML this console's DOM and its origin: ${tag}`);
    }
  }
});

// ---------------------------------------------------------------------------
// PROOF (a) — the two shipped lesson assets still paint, and the frame now loads THE URL THE
// PROBE VERIFIED. Before this run the pane framed the declared path against the document's own
// URL — a different namespace — and painted the server's "not found" while the probe's 200 kept
// the pane an iframe. The two reads now share one field and cannot drift.
// ---------------------------------------------------------------------------

test("with a previewBase, both lesson panes frame previewBase + declared path — the probed URL, nothing else", () => {
  const rr = loadRenderer();
  const { handle } = mount(rr, LESSON, { previewBase: "/projects/reports-qa/" });
  handle.goStep("L1");
  frameEverything(handle);
  const html = rr.rrRootHtml(handle.state);
  const srcs = [...html.matchAll(/<iframe\b[^>]*src="([^"]*)"/g)].map((m) => m[1]);
  // vm arrays carry the sandbox's prototypes; spreading into host arrays keeps the strict
  // asserts about VALUES, which is what this judges.
  const declared = [...handle.state.report.items[0].subject.previews].map((p) => p.path);
  assert.equal(srcs.length, 2, "two previews compare by default, so both panes frame");
  assert.deepEqual(srcs.sort(), declared.map((p) => "/projects/reports-qa/" + p).sort(),
    "each frame loads exactly what the probe verified: previewBase + the declared path");
});

test("without a previewBase the declared path travels unaltered (the #55 pin still holds)", () => {
  const rr = loadRenderer();
  const { handle } = mount(rr, LESSON);
  handle.goStep("L1");
  frameEverything(handle);
  const html = rr.rrRootHtml(handle.state);
  const srcs = [...html.matchAll(/<iframe\b[^>]*src="([^"]*)"/g)].map((m) => m[1]);
  const declared = [...handle.state.report.items[0].subject.previews].map((p) => p.path);
  assert.deepEqual(srcs.sort(), declared.sort());
});

test("the two lesson assets use nothing the empty token set denies, so they paint the same under it", () => {
  // `sandbox=""` blocks scripts, forms, plugins, popups and top navigation. A document that
  // carries none of those renders identically framed or not — which is exactly what the shipped
  // assets are: documents to READ. This pins that invariant so a future asset that needs a
  // token is a red test and a written decision, not a silent widening.
  for (const name of ["leccion-web.html", "leccion-slide.html"]) {
    const body = readFileSync(join(QA_LESSON_ASSETS, name), "utf8").toLowerCase();
    for (const feature of ["<script", "<form", "<embed", "<object", "target=", "javascript:"]) {
      assert.ok(!body.includes(feature), `${name} uses ${feature}, which sandbox="" denies`);
    }
  }
});

// ---------------------------------------------------------------------------
// PROOF (c), server half — the gate the opaque origin runs into. A sandboxed frame's requests
// carry `Origin: null`; the real server must refuse that at 403 on ALL THREE write routes,
// before any route logic, writing nothing. The same-origin control proves the refusal is the
// GATE and not a broken route behind it.
// ---------------------------------------------------------------------------

function fixtureTree() {
  return {
    schema_version: "roadmap_tree_v1",
    roadmap_id: "roadmap",
    title: "Preview-sandbox fixture",
    objectives: [{
      objective_id: "PS-O1",
      title: "Objective",
      phases: [{
        phase_id: "PS-O1.P1",
        title: "Phase",
        runs: [
          { run_id: "RUN-PS-ONE-001", queue_order: 1, title: "One", summary: "s", full_description: "f", status: "completed", depends_on: [] }
        ]
      }]
    }]
  };
}

let workDir = "";
let baseUrl = "";
let roadmapPath = "";

test.before(async () => {
  workDir = mkdtempSync(join(tmpdir(), "preview-sandbox-"));
  mkdirSync(join(workDir, "editable", "roadmap"), { recursive: true });
  roadmapPath = join(workDir, "editable", "roadmap", "roadmap.json");
  writeFileSync(roadmapPath, serialize(fixtureTree(), "\n"), "utf8");
  writeFileSync(join(workDir, "registry.json"), JSON.stringify({
    registry_model: "project_registry_v1",
    title: "Preview-sandbox fixtures",
    projects: [{ key: "editable", root: "./editable" }]
  }, null, 2), "utf8");
  process.env.PC_REGISTRY = join(workDir, "registry.json");
  await new Promise((resolveListen) => server.listen(0, HOST, resolveListen));
  baseUrl = `http://${HOST}:${server.address().port}`;
});

test.after(async () => {
  delete process.env.PC_REGISTRY;
  await new Promise((resolveClose) => server.close(resolveClose));
  rmSync(workDir, { recursive: true, force: true });
});

const WRITE_ROUTES = [
  "__project-console/roadmap/edit",
  "__project-console/history/sync",
  "__project-console/project/emit"
];

async function post(route, origin) {
  const response = await fetch(`${baseUrl}/projects/editable/${route}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(origin ? { Origin: origin } : {}) },
    body: "{}"
  });
  let payload = null;
  try { payload = JSON.parse(await response.text()); } catch { /* non-JSON */ }
  return { status: response.status, payload };
}

test("Origin: null — what a sandboxed frame is forced to send — is refused at 403 on all three write routes, and nothing is written", async () => {
  const before = readFileSync(roadmapPath, "utf8");
  const beforeMtime = statSync(roadmapPath).mtimeMs;
  for (const route of WRITE_ROUTES) {
    const refused = await post(route, "null");
    assert.equal(refused.status, 403, `${route} admitted Origin: null`);
    assert.equal(refused.payload.reason, "forbidden_origin", `${route} refused for another reason`);
  }
  assert.equal(readFileSync(roadmapPath, "utf8"), before, "the canonical roadmap must not move");
  assert.equal(statSync(roadmapPath).mtimeMs, beforeMtime, "the canonical roadmap must not even be touched");
  assert.ok(!existsSync(join(workDir, "editable", ".project")),
    "a refused emission must not have created the derived folder");
});

test("a foreign origin is refused the same way — the gate this run leans on, re-measured where it can never go quiet", async () => {
  for (const route of WRITE_ROUTES) {
    const refused = await post(route, "https://evil.example");
    assert.equal(refused.status, 403, `${route} admitted a foreign origin`);
    assert.equal(refused.payload.reason, "forbidden_origin");
  }
});

test("control: a same-origin POST passes the gate and reaches the engine's own refusal — so the 403s above are the GATE, nothing else", async () => {
  // An empty edit body is refused by the ENGINE at 422 (unknown op) — past the origin gate,
  // writing nothing. If this control ever starts answering 403, the gate broke for the
  // console's own requests; if the null-origin test above starts passing the gate, the gate
  // was widened. Both are this run's decision coming undone.
  const control = await post(WRITE_ROUTES[0], baseUrl);
  assert.equal(control.status, 422, "the same-origin control must reach the engine refusal");
  assert.equal(control.payload.ok, false);
});
