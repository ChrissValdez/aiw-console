// RUN-CONSOLE-DOC-SIDE-READER-001 — THE READ-ONLY SIDE READER, judged rule by rule.
//
// The run exists for AUDIT and not for comfort: the operator signs verdicts against rules he
// cannot open without leaving the screen. Every criterion of the ticket is pinned below by a
// NAMED test, and the first of them is the same mechanical domain-blindness veto that already
// covers the renderer (#52) and the mount (#53), pointed at this reader and its stylesheet.
//
// THE HARNESS. A DOM stub that RECORDS every element it hands out and every mutation made
// through it, so "opening the panel disturbs nothing beneath it" can be PROVED rather than
// asserted: the test reads back which ids were written to. The one fiction in it is that a
// heading element reports an offsetTop (a real layout has one and node has no layout); it is
// derived from the heading's own positional id, so a jump to the wrong heading lands on the
// wrong number and the test fails.

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join, normalize, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const ASSETS = join(REPO_ROOT, "project-console", "assets");
const READER_JS = join(ASSETS, "doc-side-reader.js");
const READER_CSS = join(ASSETS, "doc-side-reader.css");
const RENDERER_JS = join(ASSETS, "run-report-renderer.js");
const SURFACE_JS = join(ASSETS, "run-report-surface.js");
const INDEX_HTML = join(REPO_ROOT, "project-console", "index.html");
const REPORT_FIXTURES = join(HERE, "fixtures", "reports");
const DOC_FIXTURE = join(HERE, "fixtures", "doc-reader");
const DOCS_INDEX = JSON.parse(readFileSync(join(DOC_FIXTURE, ".project", "docs_index.json"), "utf8"));

// The panel's own ids. Nothing outside this set may be written to when the reader opens, and the
// test below reads the recording back to prove it.
const PANEL_IDS = new Set([
  "doc-side-reader",
  // [#62 QA] The veil is the reader's own chrome, so it belongs to this set — and everything
  // OUTSIDE the set stays forbidden, which is how criterion 1 survives the veil arriving.
  "doc-side-reader-overlay",
  "doc-side-reader-title",
  "doc-side-reader-label",
  "doc-side-reader-path",
  "doc-side-reader-scroll",
  "doc-side-reader-body"
]);

const READER_CSS_SOURCE = readFileSync(READER_CSS, "utf8");

// The declared font-size of one rule, in px. Used to pin a scale that must not flatten.
function ruleFontSize(selector) {
  const rule = new RegExp("\\" + selector + "\\s*\\{([^}]*)\\}").exec(READER_CSS_SOURCE);
  if (!rule) return null;
  const size = /font-size:\s*([\d.]+)px/.exec(rule[1]);
  return size ? Number(size[1]) : null;
}

// ---------------------------------------------------------------------------
// The harness.
// ---------------------------------------------------------------------------

class StubClassList {
  constructor(owner) { this.owner = owner; this.set = new Set(); }
  add(...names) { this.owner.touch(); names.forEach((n) => this.set.add(n)); }
  remove(...names) { this.owner.touch(); names.forEach((n) => this.set.delete(n)); }
  toggle(name, force) {
    this.owner.touch();
    const on = force === undefined ? !this.set.has(name) : !!force;
    if (on) this.set.add(name); else this.set.delete(name);
    return on;
  }
  contains(name) { return this.set.has(name); }
}

class StubElement {
  constructor(id, touched) {
    this.id = id;
    this.touched = touched;
    this.attributes = new Map();
    this.classList = new StubClassList(this);
    this._innerHTML = "";
    this._textContent = "";
    this._scrollTop = 0;
    this.offsetTop = undefined;
    this.listeners = [];
    // [#62 repair] A parent link, so a click can BUBBLE. Without it every test here could only
    // ever call a function, which is exactly how a dead button survived a green suite.
    this.parent = null;
  }
  touch() { this.touched.add(this.id); }
  get innerHTML() { return this._innerHTML; }
  set innerHTML(value) { this.touch(); this._innerHTML = String(value); }
  get textContent() { return this._textContent; }
  set textContent(value) { this.touch(); this._textContent = String(value); }
  get scrollTop() { return this._scrollTop; }
  set scrollTop(value) { this.touch(); this._scrollTop = value; }
  setAttribute(name, value) { this.touch(); this.attributes.set(name, String(value)); }
  getAttribute(name) { return this.attributes.has(name) ? this.attributes.get(name) : null; }
  removeAttribute(name) { this.touch(); this.attributes.delete(name); }
  addEventListener(type, handler) { this.listeners.push({ type, handler }); }
  removeEventListener() {}
  querySelector() { return null; }
  querySelectorAll() { return []; }
  // Attribute-presence selectors only — `[data-…]` is every selector these delegates use — and
  // it walks the real parent chain, self first, exactly as the DOM does.
  closest(selector) {
    const attr = /^\[([^\]=]+)\]$/.exec(String(selector));
    if (!attr) return null;
    let node = this;
    while (node) {
      if (node.attributes.has(attr[1])) return node;
      node = node.parent;
    }
    return null;
  }
}

// A real click: it bubbles from the target up through its ancestors and then reaches the
// document, and every delegate registered along that path runs. A test that calls the handler
// instead proves the handler works and says nothing about whether it is attached.
function clickOn(harness, target) {
  const event = { type: "click", target };
  let node = target;
  while (node) {
    node.listeners.filter((l) => l.type === "click").forEach((l) => l.handler(event));
    node = node.parent;
  }
  harness.documentListeners.filter((l) => l.type === "click").forEach((l) => l.handler(event));
}

function makeFetch(root) {
  return async function fetchStub(url) {
    const path = String(url).split("?")[0].replace(/^\/+/, "");
    const abs = normalize(join(root, path));
    const base = root.endsWith(sep) ? root : root + sep;
    if (abs.startsWith(base)) {
      try {
        const body = readFileSync(abs, "utf8");
        return { ok: true, status: 200, statusText: "OK", text: async () => body };
      } catch { /* fall through */ }
    }
    return { ok: false, status: 404, statusText: "Not Found", text: async () => "" };
  };
}

// Load the reader with a recording document. `alsoLoad` puts other shipped scripts in the SAME
// context, exactly as index.html does with `defer`.
function loadReader(options) {
  const opts = options || {};
  const touched = new Set();
  const elements = new Map();
  const byId = (id) => {
    const key = String(id);
    if (!elements.has(key)) {
      const el = new StubElement(key, touched);
      // A real heading has a layout position; node has none. Derived from the positional id, so
      // a jump to the wrong heading lands on a number this test can catch.
      const heading = /^dsr-h-(\d+)$/.exec(key);
      if (heading) el.offsetTop = 100 * (Number(heading[1]) + 1);
      elements.set(key, el);
    }
    return elements.get(key);
  };
  const documentListeners = [];
  const documentStub = {
    getElementById: byId,
    querySelector: () => null,
    querySelectorAll: () => [],
    createElement: (tag) => new StubElement(`(created:${tag})`, touched),
    addEventListener(type, handler) { documentListeners.push({ type, handler }); },
    removeEventListener() {}
  };
  const sandbox = { document: documentStub, fetch: makeFetch(opts.root || DOC_FIXTURE), console, setTimeout, clearTimeout };
  if (opts.globals) Object.assign(sandbox, opts.globals);
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  // The panel is in the page BEFORE any script runs — index.html carries it as static markup.
  // Registering it first is what lets a load-time wiring find it, exactly as the browser does.
  PANEL_IDS.forEach((id) => byId(id));
  for (const extra of opts.alsoLoad || []) {
    vm.runInContext(readFileSync(extra, "utf8"), sandbox, { filename: extra });
  }
  vm.runInContext(readFileSync(opts.readerPath || READER_JS, "utf8"), sandbox, { filename: opts.readerPath || READER_JS });
  touched.clear();
  const harness = {
    sandbox,
    element: byId,
    touched,
    documentListeners,
    // A node the page owns, with the attributes and the parent it really has.
    node(id, attributes, parent) {
      const el = byId(id);
      Object.entries(attributes || {}).forEach(([name, value]) => el.attributes.set(name, String(value)));
      el.parent = parent || null;
      touched.delete(id);
      return el;
    }
  };
  return harness;
}

// A reader wired to the fixture project, as the console wires it to the active one.
function readerOnFixture() {
  const harness = loadReader({});
  harness.sandbox.setDocSideReaderSource({ docsIndex: DOCS_INDEX, base: "", indexPath: ".project/docs_index.json" });
  return harness;
}

// ---------------------------------------------------------------------------
// CRITERION 6 — the rule that governs every other one, proved mechanically.
// ---------------------------------------------------------------------------

function domainTokens(report) {
  const tokens = [];
  const push = (value) => { if (typeof value === "string" && value.trim()) tokens.push(value.trim()); };
  push(report.project); push(report.run_id); push(report.run_title); push(report.profile);
  push(report.emitted_by);
  Object.keys(report.counts || {}).forEach(push);
  (report.locations || []).forEach((loc) => { push(loc.label); push(loc.path); });
  (Array.isArray(report.items) ? report.items : []).forEach((item) => {
    if (item.subject) {
      push(item.subject.id); push(item.subject.label);
      (item.subject.previews || []).forEach((p) => { push(p.label); push(p.target); push(p.path); });
    }
    if (item.location) push(item.location.path);
    (Array.isArray(item.satisfies) ? item.satisfies : []).forEach(push);
    // [#62] The citation era of THIS run: a document a report cites by name is the emitter's
    // vocabulary too, and the reader that opens it must not have learned the name.
    if (item.authority) { push(item.authority.source); push(item.authority.section); push(item.authority.invented_by); }
  });
  (Array.isArray(report.header_satisfies) ? report.header_satisfies : []).forEach((h) => {
    (Array.isArray(h.satisfies) ? h.satisfies : []).forEach(push);
  });
  (Array.isArray(report.blind_spots) ? report.blind_spots : []).forEach((b) => {
    (Array.isArray(b.affects) ? b.affects : []).forEach(push);
  });
  Object.keys(report.profile_data || {}).forEach(push);
  return tokens;
}

test("criterion 6: not one word of any fixture's domain appears in the side reader — code or stylesheet", () => {
  const reports = readdirSync(REPORT_FIXTURES)
    .filter((name) => name.endsWith(".report.json"))
    .map((name) => JSON.parse(readFileSync(join(REPORT_FIXTURES, name), "utf8")));
  assert.equal(reports.length, 4, "the four real cases are the corpus");
  const needles = [...new Set(reports.flatMap(domainTokens))]
    .filter((token) => token.length >= 4)
    .map((token) => token.toLowerCase());
  // Harvested from the same corpus as the renderer's and the mount's veto (#60 measured 160),
  // widened to 175 by the three citation fields THIS run reads: a cited document's path, the
  // section string beside it, and the name an invented criterion is invented by. The pin exists
  // so the veto can never silently SHRINK.
  assert.equal(needles.length, 175, "the veto is the measured one, and wider than the mount's 160");
  needles.push("christopher", "valdez", "cantu");
  for (const path of [READER_JS, READER_CSS]) {
    const haystack = readFileSync(path, "utf8").toLowerCase();
    for (const needle of needles) {
      assert.ok(!haystack.includes(needle),
        path + " contains the domain token " + JSON.stringify(needle) + " — the reader must not know it");
    }
  }
});

test("criterion 6: the reader reads markdown headings and never hunts a section mark inside prose", () => {
  const source = readFileSync(READER_JS, "utf8");
  // The forbidden regex, in the two ways it would be written. A section sign does not appear in
  // this file at all — not in code, not in a comment, not in a message on screen.
  assert.ok(!source.includes("§"), "no section sign anywhere in the reader");
  // Headings are found by the ONE generic rule: a run of hashes at the start of a line.
  assert.ok(/\^\(#\{1,6\}\)/.test(source), "the heading rule is the generic markdown one");
  // And a citation is compared as a WHOLE string, never scanned for something inside it: no
  // match/matchAll/exec over the citation, and no split of it into parts.
  const resolver = /function dsrResolveSection\(([\s\S]*?)\n}/.exec(source);
  assert.ok(resolver, "the resolver is where a domain regex would live, and it is readable here");
  assert.ok(!/\.match\(|\.matchAll\(|\.split\(|exec\(/.test(resolver[1]),
    "the citation is compared whole — never parsed, split or scanned");
});

// ---------------------------------------------------------------------------
// CRITERION 1 — the panel opens and closes without disturbing the report underneath.
// ---------------------------------------------------------------------------

test("criterion 1: opening the reader over a report leaves the report open and exactly where it was", async () => {
  const harness = readerOnFixture();
  // A report is on screen, scrolled to where the operator was reading.
  const view = harness.element("run-report-view");
  view.classList.add("open");
  view.setAttribute("aria-hidden", "false");
  const reportScroll = harness.element("run-report-scroll");
  reportScroll.scrollTop = 4321;
  const drawer = harness.element("run-drawer");
  drawer.classList.add("open");
  harness.touched.clear();

  const opened = await harness.sandbox.openDocSideReader({ path: "docs/REFERENCE-RULES.md", section: "2.1" });
  assert.equal(opened.view, "document");
  assert.equal(harness.sandbox.docSideReaderIsOpen(), true);
  assert.equal(harness.element("doc-side-reader").classList.contains("open"), true);

  // The report is still open, still says so, and has not moved one pixel.
  assert.equal(view.classList.contains("open"), true, "the report layer stays open");
  assert.equal(view.getAttribute("aria-hidden"), "false");
  assert.equal(reportScroll.scrollTop, 4321, "the operator's place in the report is untouched");
  assert.equal(drawer.classList.contains("open"), true, "the run underneath is still open too");

  // And the proof rather than the promise: nothing outside the panel's own ids was written.
  const outside = [...harness.touched].filter((id) => !PANEL_IDS.has(id) && !/^dsr-h-\d+$/.test(id));
  assert.deepEqual(outside, [], "the reader wrote to something that is not its own panel");
});

test("criterion 1: closing the reader puts back a screen that never moved", async () => {
  const harness = readerOnFixture();
  const view = harness.element("run-report-view");
  view.classList.add("open");
  const reportScroll = harness.element("run-report-scroll");
  reportScroll.scrollTop = 4321;
  await harness.sandbox.openDocSideReader({ path: "docs/REFERENCE-RULES.md" });
  harness.touched.clear();

  harness.sandbox.closeDocSideReader();
  assert.equal(harness.sandbox.docSideReaderIsOpen(), false);
  assert.equal(harness.element("doc-side-reader").classList.contains("open"), false);
  assert.equal(harness.element("doc-side-reader").getAttribute("aria-hidden"), "true");
  assert.equal(harness.element("doc-side-reader-body").innerHTML, "", "the panel is emptied on close");
  assert.equal(view.classList.contains("open"), true, "closing the reader does not close the report");
  assert.equal(reportScroll.scrollTop, 4321, "and does not move it");
  const outside = [...harness.touched].filter((id) => !PANEL_IDS.has(id));
  assert.deepEqual(outside, [], "closing wrote to something that is not its own panel");
});

test("criterion 1: a jump moves the panel's own scroller and nothing else", async () => {
  const harness = readerOnFixture();
  const reportScroll = harness.element("run-report-scroll");
  reportScroll.scrollTop = 999;
  // "2.1" is the fourth heading of the fixture (0-based id 3), so the harness gives it 400.
  const opened = await harness.sandbox.openDocSideReader({ path: "docs/REFERENCE-RULES.md", section: "2.1" });
  assert.equal(opened.targetId, "dsr-h-3");
  assert.equal(harness.element("doc-side-reader-scroll").scrollTop, 400, "the panel scrolled to the cited heading");
  assert.equal(reportScroll.scrollTop, 999, "and the report's scroller was never touched");
});

// ---------------------------------------------------------------------------
// CRITERION 2 — the documents of the docs index of the project being viewed, and only those.
// ---------------------------------------------------------------------------

test("criterion 2: the panel lists exactly the documents this project's docs index declares", async () => {
  const harness = readerOnFixture();
  const opened = await harness.sandbox.openDocSideReader({});
  assert.equal(opened.view, "list");
  const html = harness.element("doc-side-reader-body").innerHTML;
  DOCS_INDEX.docs.forEach((doc) => {
    assert.ok(html.includes(doc.path), `the list names ${doc.path}`);
    assert.ok(html.includes(doc.title), `the list names its title`);
  });
  // Three declared, three offered: no fourth arrives from a walk of anybody's folders.
  const offered = html.match(/data-dsr-doc="/g) || [];
  assert.equal(offered.length, DOCS_INDEX.docs.length, "one row per indexed document, and no more");
  assert.ok(html.includes(".project/docs_index.json"), "the list names the index it was measured from");
});

test("criterion 2: a path the index does not list is REFUSED in words, and the reader falls back to the list", async () => {
  const harness = readerOnFixture();
  const opened = await harness.sandbox.openDocSideReader({ path: "docs/NOT-INDEXED.md", section: "1" });
  assert.equal(opened.ok, false);
  assert.equal(opened.view, "unlisted");
  const html = harness.element("doc-side-reader-body").innerHTML;
  assert.ok(html.includes("docs/NOT-INDEXED.md"), "the refusal names the file it refused");
  assert.ok(/does not list/.test(html), "and says why");
  assert.ok(html.includes("data-dsr-doc="), "and still offers what CAN be opened — never an empty panel");
});

test("criterion 2: switching the source switches the list — no document of a previous project survives", async () => {
  const harness = readerOnFixture();
  await harness.sandbox.openDocSideReader({});
  assert.ok(harness.element("doc-side-reader-body").innerHTML.includes("docs/REFERENCE-RULES.md"));
  harness.sandbox.setDocSideReaderSource({});
  const opened = await harness.sandbox.openDocSideReader({});
  assert.equal(opened.view, "index_unavailable");
  const html = harness.element("doc-side-reader-body").innerHTML;
  assert.ok(!html.includes("docs/REFERENCE-RULES.md"), "the previous project's documents are gone");
  assert.ok(/could not be read/.test(html), "and the absence is stated, not left blank");
});

// ---------------------------------------------------------------------------
// CRITERION 3 — a section index derived from the document itself, and read-only.
// ---------------------------------------------------------------------------

test("criterion 3: the section index is derived from the DOCUMENT, not from the index that listed it", () => {
  const harness = loadReader({});
  const raw = readFileSync(join(DOC_FIXTURE, "docs", "REFERENCE-RULES.md"), "utf8");
  const headings = harness.sandbox.dsrHeadings(raw);
  // Every heading of the document, at every depth, in document order — and NOTHING else. The
  // docs index carries no headings at all, which is why deriving them is the whole job.
  assert.equal([...headings].map((h) => `${h.level}:${h.text}`).join(" / "), [
    "1:Reference rules",
    "2:1. The first rule",
    "2:2. The second rule",
    "3:2.1 The nearer half",
    "3:2.2 The further half",
    "2:A rule with no number in front of it",
    "3:Detail",
    "3:Detail",
    "2:3. Shapes this reader has to survive"
  ].join(" / "));
  assert.ok(DOCS_INDEX.docs.every((doc) => !("headings" in doc)), "the index carries no headings to copy");
  // A hash inside a fenced block is code and opens no section.
  assert.ok(!headings.some((h) => /fence/i.test(h.text)), "a hash inside a fence is not a heading");
  // The ids are positional, so two headings that say the same thing are still two.
  assert.equal(new Set(headings.map((h) => h.id)).size, headings.length, "every heading has its own id");
});

test("criterion 3: a document with no headings SAYS it has no section index", async () => {
  const harness = readerOnFixture();
  const opened = await harness.sandbox.openDocSideReader({ path: "docs/FLAT-NOTE.md" });
  assert.equal(opened.view, "document");
  assert.equal(opened.headings, 0);
  const html = harness.element("doc-side-reader-body").innerHTML;
  assert.ok(/no headings/.test(html), "the empty index states itself");
  assert.ok(/It still has paragraphs/.test(html), "and the document is still shown");
});

test("criterion 3: the reader is READ ONLY — no write route, no write verb, no editable affordance", async () => {
  const source = readFileSync(READER_JS, "utf8");
  // Not one write verb, and not one of the console's write routes.
  for (const verb of ["POST", "PUT", "PATCH", "DELETE", "method:", "__project-console", "FormData"]) {
    assert.ok(!source.includes(verb), `the reader must not contain ${verb}`);
  }
  // And nothing that LOOKS like it could write, either in the code or on screen.
  for (const affordance of ["<input", "<textarea", "<form", "contenteditable", "designMode", "execCommand"]) {
    assert.ok(!source.toLowerCase().includes(affordance.toLowerCase()), `no editing affordance: ${affordance}`);
  }
  // The one verb it does know, on a route the console already serves.
  assert.ok(/fetch\(url, \{ cache: "no-store" \}\)/.test(source), "a plain GET, and only that");
  // Painted: every control the panel puts on screen navigates or closes. None of them submits.
  const harness = readerOnFixture();
  await harness.sandbox.openDocSideReader({ path: "docs/REFERENCE-RULES.md" });
  const painted = harness.element("doc-side-reader-body").innerHTML;
  assert.ok(!/<(input|textarea|form|select)/i.test(painted), "the painted document offers no field");
  assert.ok(!/contenteditable/i.test(painted), "and no editable region");
  const buttons = painted.match(/<button[^>]*>/g) || [];
  buttons.forEach((button) => {
    assert.ok(/data-dsr-(section|doc)=/.test(button), "every button in the panel navigates: " + button);
    assert.ok(/type="button"/.test(button), "and none of them submits: " + button);
  });
});

test("criterion 3: the page's own panel carries the read-only mark and offers no field either", () => {
  const html = readFileSync(INDEX_HTML, "utf8");
  const panel = /<aside id="doc-side-reader"[\s\S]*?<\/aside>/.exec(html);
  assert.ok(panel, "the panel is in the page");
  assert.ok(/Read only/.test(panel[0]), "and says so on screen, where the operator can see it");
  assert.ok(!/<input|<textarea|<form|contenteditable/i.test(panel[0]), "no field, no form, no editable region");
  // It is a SIBLING of the report layer, not a child of it: nothing about opening one can
  // re-lay-out the other, which is the whole of criterion 1 expressed in the markup.
  const reportLayer = /<div id="run-report-view"[\s\S]*?\n    <\/div>/.exec(html);
  assert.ok(reportLayer, "the report layer is in the page");
  assert.ok(!reportLayer[0].includes("doc-side-reader"), "the panel is not nested inside the report layer");
  assert.ok(/data-doc-reader-open/.test(html), "and the door into it is a button at the top");
});

// ---------------------------------------------------------------------------
// CRITERION 4 — a citation that resolves jumps; one that does not SAYS SO and names itself.
// ---------------------------------------------------------------------------

test("criterion 4: a citation whose section resolves jumps straight to it", async () => {
  const harness = readerOnFixture();
  for (const [section, id] of [["2.1", "dsr-h-3"], ["2.2", "dsr-h-4"], ["1", "dsr-h-1"], ["3", "dsr-h-8"]]) {
    const opened = await harness.sandbox.openDocSideReader({ path: "docs/REFERENCE-RULES.md", section });
    assert.equal(opened.resolved, true, `"${section}" resolves`);
    assert.equal(opened.reason, "resolved");
    assert.equal(opened.targetId, id, `"${section}" lands on its own heading`);
    assert.ok(!/could not be resolved/.test(harness.element("doc-side-reader-body").innerHTML),
      "a citation that landed says nothing about failing");
  }
});

test("criterion 4: a citation whose section does NOT resolve opens the index and names the section it could not resolve", async () => {
  const harness = readerOnFixture();
  // The three shapes measured in the pilot on 2026-08-27: a section plus a comment, two sections
  // at once, and a section this document simply does not have. None of them may be guessed at.
  for (const section of ["2 (the anchor) and 3", "1 — one and only one key", "9.9"]) {
    const opened = await harness.sandbox.openDocSideReader({ path: "docs/REFERENCE-RULES.md", section });
    assert.equal(opened.view, "document", "the document still opens");
    assert.equal(opened.resolved, false, `"${section}" must not resolve`);
    assert.equal(opened.reason, "unmatched");
    assert.equal(opened.targetId, "", "and nothing is jumped to");
    assert.equal(harness.element("doc-side-reader-scroll").scrollTop, 0, "the panel stays at the index, never somewhere plausible");
    const html = harness.element("doc-side-reader-body").innerHTML;
    assert.ok(/could not be resolved/.test(html), "the view says the jump did not happen");
    assert.ok(html.includes(section), `and names the section verbatim: ${section}`);
    assert.ok(/data-dsr-section=/.test(html), "with the section index there to choose from by hand");
  }
});

test("criterion 4: a citation more than one heading answers to is AMBIGUOUS, and choosing would be a guess", async () => {
  const harness = readerOnFixture();
  const opened = await harness.sandbox.openDocSideReader({ path: "docs/REFERENCE-RULES.md", section: "Detail" });
  assert.equal(opened.resolved, false);
  assert.equal(opened.reason, "ambiguous");
  assert.equal(opened.targetId, "");
  const html = harness.element("doc-side-reader-body").innerHTML;
  assert.ok(/more than one heading/.test(html), "the reason is the true one, not a generic failure");
  assert.ok(html.includes("Detail"), "and it names what was cited");
});

test("criterion 4: a document opened with NO citation says nothing about a failure it did not have", async () => {
  const harness = readerOnFixture();
  const opened = await harness.sandbox.openDocSideReader({ path: "docs/REFERENCE-RULES.md" });
  assert.equal(opened.reason, "none");
  assert.equal(opened.resolved, false);
  assert.ok(!/could not be resolved/.test(harness.element("doc-side-reader-body").innerHTML));
});

test("criterion 4: resolution is a WHOLE-string match — never a prefix, a substring or a nearest hit", () => {
  const harness = loadReader({});
  const { dsrHeadings, dsrResolveSection } = harness.sandbox;
  const headings = dsrHeadings("# One\n\n## 2. Two\n\n### 2.1 Two point one\n");
  // The enumerator alone, the whole heading, and the heading without its enumerator all match.
  assert.equal(dsrResolveSection(headings, "2.1").targetId, "dsr-h-2");
  assert.equal(dsrResolveSection(headings, "2.1 Two point one").targetId, "dsr-h-2");
  assert.equal(dsrResolveSection(headings, "Two point one").targetId, "dsr-h-2");
  // Written with the punctuation a citation carries, it still matches: only the EDGES are trimmed.
  assert.equal(dsrResolveSection(headings, "§2.1").targetId, "dsr-h-2");
  assert.equal(dsrResolveSection(headings, "(2.1)").targetId, "dsr-h-2");
  // But nothing approximate does. "2.1 and 2" is not "2.1"; "Two point" is not "Two point one".
  assert.equal(dsrResolveSection(headings, "2.1 and 2").resolved, false);
  assert.equal(dsrResolveSection(headings, "Two point").resolved, false);
  assert.equal(dsrResolveSection(headings, "2.").targetId, "dsr-h-1", "trailing punctuation is an edge, not a difference");
  assert.equal(dsrResolveSection(headings, "").reason, "none");
});

// ---------------------------------------------------------------------------
// CRITERION 5 — a document that cannot be read declares WHICH file and WHY.
// ---------------------------------------------------------------------------

test("criterion 5: a document the index lists and the disk does not declares WHICH file and WHY", async () => {
  const harness = readerOnFixture();
  const opened = await harness.sandbox.openDocSideReader({ path: "docs/GONE-FROM-DISK.md", section: "1" });
  assert.equal(opened.ok, false);
  assert.equal(opened.view, "unreadable");
  const html = harness.element("doc-side-reader-body").innerHTML;
  assert.ok(html.trim().length > 0, "never an empty panel");
  assert.ok(html.includes("docs/GONE-FROM-DISK.md"), "it names WHICH file");
  assert.ok(/HTTP 404/.test(html), "and WHY, in the answer's own words");
  assert.ok(/Reason/.test(html) && /File/.test(html), "both stated as facts, not as one blurred sentence");
});

test("criterion 5: with no way to fetch at all, the panel still says which file and why", async () => {
  const harness = loadReader({});
  harness.sandbox.fetch = undefined;
  harness.sandbox.setDocSideReaderSource({ docsIndex: DOCS_INDEX, base: "", indexPath: ".project/docs_index.json" });
  const opened = await harness.sandbox.openDocSideReader({ path: "docs/REFERENCE-RULES.md" });
  assert.equal(opened.view, "unreadable");
  const html = harness.element("doc-side-reader-body").innerHTML;
  assert.ok(html.includes("docs/REFERENCE-RULES.md"));
  assert.ok(/no way to fetch/.test(html), "the reason is this page's, not an invented HTTP status");
});

test("criterion 5: an unreadable docs index and an empty one are two different sentences", async () => {
  const unavailable = loadReader({});
  unavailable.sandbox.setDocSideReaderSource({ docsIndex: null, indexPath: ".project/docs_index.json" });
  const a = await unavailable.sandbox.openDocSideReader({});
  assert.equal(a.view, "index_unavailable");
  assert.ok(/could not be read/.test(unavailable.element("doc-side-reader-body").innerHTML));

  const empty = loadReader({});
  empty.sandbox.setDocSideReaderSource({ docsIndex: { docs: [] }, indexPath: ".project/docs_index.json" });
  const b = await empty.sandbox.openDocSideReader({});
  assert.equal(b.view, "list");
  const html = empty.element("doc-side-reader-body").innerHTML;
  assert.ok(/lists no document/.test(html), "read and empty is not the same as unread");
  assert.ok(!/could not be read/.test(html));
});

// ---------------------------------------------------------------------------
// THE CITATION'S ROUTE INTO THE READER — renderer marks it, mount relays it, console owns it.
// ---------------------------------------------------------------------------

function loadRenderer() {
  const sandbox = { console, document: undefined, window: undefined };
  vm.createContext(sandbox);
  vm.runInContext(readFileSync(RENDERER_JS, "utf8"), sandbox, { filename: RENDERER_JS });
  return sandbox;
}

test("criterion 4: the renderer marks a citation that travels as DATA and leaves every other one plain text", () => {
  const rr = loadRenderer();
  const linked = rr.rrAuthorityHtml({ source: "docs/A-RULE.md", section: "6.3" }, "en");
  assert.ok(linked.includes('data-rr-doc="docs/A-RULE.md"'), "the document it cites travels on the control");
  assert.ok(linked.includes('data-rr-doc-section="6.3"'), "and so does the section, exactly as declared");
  assert.ok(linked.includes("docs/A-RULE.md · 6.3"), "and the words on screen are unchanged");
  // The second declared form names no document, so there is nothing to open and no control.
  const invented = rr.rrAuthorityHtml({ invented_by: "someone", why_invented: "a reason", decision_item: "D1" }, "en");
  assert.ok(!invented.includes("data-rr-doc"), "an invented criterion cites no document and stays text");
  assert.ok(invented.includes("<span>"), "and is still printed in full");
  // A citation with a document and no section is still openable — at the document's index.
  const noSection = rr.rrAuthorityHtml({ source: "docs/A-RULE.md" }, "en");
  assert.ok(noSection.includes('data-rr-doc="docs/A-RULE.md"'));
  assert.ok(!noSection.includes("data-rr-doc-section"), "no section is declared, so none is claimed");
  assert.equal(rr.rrAuthorityHtml(null, "en"), "");
});

test("criterion 6: the mount relays the citation and still never parses a report", () => {
  const source = readFileSync(SURFACE_JS, "utf8");
  // It reads the two strings off the DOM attributes the renderer wrote, never off a report.
  assert.ok(/getAttribute\("data-rr-doc"\)/.test(source), "the document comes off the attribute");
  assert.ok(/getAttribute\("data-rr-doc-section"\)/.test(source), "and so does the section");
  assert.ok(!/JSON\.parse/.test(source), "the mount still parses nothing");
  // And it composes no route: the opener is handed in, exactly like the verdict writer.
  assert.ok(/opts\.openDocument/.test(source), "the opener is relayed, not built");
  assert.ok(!/\.md\b/.test(source), "no document path, extension or base is composed in the mount");
  // Closing the report drops the relay, so no callback of a report that is gone survives.
  assert.ok(/rrsDocOpener = null/.test(source), "the relay is per-report, like everything else here");
});

// ---------------------------------------------------------------------------
// THE DOOR, DRIVEN AS A DOOR.
//
// The operator pressed Documents and nothing happened, and this suite was green while he did
// it. THAT is the defect these tests exist for, and it is not the button: it is that every
// test above reaches the reader by CALLING openDocSideReader, which wires the page as a side
// effect of running. A suite that only ever calls functions proves the handlers work and says
// nothing about whether anything is attached to them. Everything below arrives the way the
// operator does — a click on the element the page actually carries, bubbling to whatever
// delegate is listening, or to none.
// ---------------------------------------------------------------------------

// The trigger as index.html carries it: a button inside the report's own top bar.
function pressTheDocumentsButton(harness) {
  const view = harness.node("run-report-view", {}, null);
  const bar = harness.node("(run-report-bar)", {}, view);
  const button = harness.node("(documents-button)", { "data-doc-reader-open": "" }, bar);
  clickOn(harness, button);
  return button;
}

test("the Documents button opens the reader on a freshly loaded page — first press, no warm-up", async () => {
  const harness = readerOnFixture();
  // Nothing has opened the reader. This is the page as the operator finds it.
  assert.equal(harness.sandbox.docSideReaderIsOpen(), false, "the reader starts closed");

  pressTheDocumentsButton(harness);
  await new Promise((resolve) => setImmediate(resolve));

  assert.equal(harness.sandbox.docSideReaderIsOpen(), true, "the first press opens the reader");
  assert.equal(harness.element("doc-side-reader").classList.contains("open"), true, "and the panel is on screen");
  const html = harness.element("doc-side-reader-body").innerHTML;
  assert.ok(html.includes("docs/REFERENCE-RULES.md"), "on this project's own list of documents");
});

test("the Documents button is wired at LOAD — a page nobody has opened the reader on still answers it", async () => {
  const harness = readerOnFixture();
  // The listener must exist before anything opens the panel. Counted, not inferred: the delegate
  // is registered on the document, and on a page nobody has warmed up there is exactly one.
  const clicks = harness.documentListeners.filter((l) => l.type === "click");
  assert.equal(clicks.length, 1, "the global door is listening before the first press, not after it");
  const panelClicks = harness.element("doc-side-reader").listeners.filter((l) => l.type === "click");
  assert.equal(panelClicks.length, 1, "and so are the panel's own controls");
});

test("wiring happens ONCE: opening, closing, reopening and switching project register no second listener", async () => {
  const harness = readerOnFixture();
  const countListeners = () => ({
    doc: harness.documentListeners.filter((l) => l.type === "click").length,
    panel: harness.element("doc-side-reader").listeners.filter((l) => l.type === "click").length
  });
  const atLoad = countListeners();

  pressTheDocumentsButton(harness);
  await new Promise((resolve) => setImmediate(resolve));
  await harness.sandbox.openDocSideReader({ path: "docs/REFERENCE-RULES.md" });
  harness.sandbox.closeDocSideReader();
  await harness.sandbox.openDocSideReader({ path: "docs/FLAT-NOTE.md" });
  // A project switch, as the console performs it.
  harness.sandbox.closeDocSideReader();
  harness.sandbox.setDocSideReaderSource({});
  harness.sandbox.setDocSideReaderSource({ docsIndex: DOCS_INDEX, base: "", indexPath: ".project/docs_index.json" });
  await harness.sandbox.openDocSideReader({});

  assert.deepEqual(countListeners(), atLoad, "no listener was registered a second time");
  assert.equal(atLoad.doc, 1);
  assert.equal(atLoad.panel, 1);

  // And the visible consequence of a double wiring: one press must do one thing, once.
  let opens = 0;
  const realOpen = harness.sandbox.openDocSideReader;
  harness.sandbox.openDocSideReader = (...args) => { opens += 1; return realOpen(...args); };
  pressTheDocumentsButton(harness);
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(opens, 1, "one press, one open");
});

test("the panel's own controls answer a CLICK too: a document row, a section jump, and Close", async () => {
  const harness = readerOnFixture();
  const panel = harness.element("doc-side-reader");
  pressTheDocumentsButton(harness);
  await new Promise((resolve) => setImmediate(resolve));

  // A row of the list, clicked.
  const row = harness.node("(doc-row)", { "data-dsr-doc": "docs/REFERENCE-RULES.md" }, panel);
  clickOn(harness, row);
  for (let i = 0; i < 4; i += 1) await new Promise((resolve) => setImmediate(resolve));
  assert.ok(harness.element("doc-side-reader-body").innerHTML.includes("The nearer half"),
    "the clicked document is the one that opened");

  // A section of its index, clicked.
  const jump = harness.node("(index-item)", { "data-dsr-section": "dsr-h-3" }, panel);
  clickOn(harness, jump);
  assert.equal(harness.element("doc-side-reader-scroll").scrollTop, 400, "the jump moved the panel to that heading");

  // Close, clicked.
  const close = harness.node("(close-button)", { "data-dsr-close": "" }, panel);
  clickOn(harness, close);
  assert.equal(harness.sandbox.docSideReaderIsOpen(), false, "Close closes it");
  assert.equal(panel.classList.contains("open"), false);
});

// ---------------------------------------------------------------------------
// CRITERION 3 — the citation controls, driven the same way: a click, through the real mount.
// ---------------------------------------------------------------------------

// The whole chain in one context, as index.html loads it: the mount, then the reader.
async function reportWithACitation() {
  const harness = loadReader({
    alsoLoad: [SURFACE_JS],
    // The report renderer is not what is under test here; the mount only has to reach it.
    globals: { renderRunReport: () => ({ rendered: true }) }
  });
  harness.sandbox.setDocSideReaderSource({ docsIndex: DOCS_INDEX, base: "", indexPath: ".project/docs_index.json" });
  const view = harness.node("run-report-view", {}, null);
  const scroll = harness.node("run-report-scroll", {}, view);
  const mount = harness.node("run-report-mount", {}, scroll);
  // Opened exactly as the console opens it, opener relayed exactly as the console relays it.
  await harness.sandbox.openRunReport({
    runId: "A-RUN",
    reportUrl: "docs/FLAT-NOTE.md",
    openDocument: (path, section) => harness.sandbox.openDocSideReader({ path, section })
  });
  return { harness, mount, scroll };
}

test("criterion 3: a citation inside the report is opened by a CLICK on the control, not by a call", async () => {
  const { harness, mount, scroll } = await reportWithACitation();
  scroll.scrollTop = 512;
  assert.equal(harness.sandbox.docSideReaderIsOpen(), false, "no document is open before the citation is pressed");

  const citation = harness.node("(citation)", {
    "data-rr-doc": "docs/REFERENCE-RULES.md",
    "data-rr-doc-section": "2.1"
  }, mount);
  clickOn(harness, citation);
  for (let i = 0; i < 6; i += 1) await new Promise((resolve) => setImmediate(resolve));

  assert.equal(harness.sandbox.docSideReaderIsOpen(), true, "the citation opened the reader");
  const state = harness.sandbox.docSideReaderState();
  assert.equal(state.path, "docs/REFERENCE-RULES.md", "on the document it cites");
  assert.equal(state.resolution.targetId, "dsr-h-3", "at the section it cites");
  assert.equal(harness.element("doc-side-reader-scroll").scrollTop, 400, "and the panel jumped there");
  assert.equal(scroll.scrollTop, 512, "while the report stayed exactly where the operator left it");
});

test("criterion 3: a citation whose section does not resolve still opens by click, and still says so", async () => {
  const { harness, mount } = await reportWithACitation();
  const citation = harness.node("(citation)", {
    "data-rr-doc": "docs/REFERENCE-RULES.md",
    "data-rr-doc-section": "2 (the anchor) and 3"
  }, mount);
  clickOn(harness, citation);
  for (let i = 0; i < 6; i += 1) await new Promise((resolve) => setImmediate(resolve));

  assert.equal(harness.sandbox.docSideReaderIsOpen(), true);
  const html = harness.element("doc-side-reader-body").innerHTML;
  assert.ok(/could not be resolved/.test(html), "the honest sentence survives the real click path");
  assert.ok(html.includes("2 (the anchor) and 3"), "and still names the section verbatim");
});

// ---------------------------------------------------------------------------
// THE OPERATOR'S QA, 2026-08-27. Three repairs, and his words are the requirement.
// ---------------------------------------------------------------------------

// 1 · «el titulo no es amigable, mejor que sea un titulo y una etiqueta o dos niveles de titulo»

test("QA 1: the header shows the document's name and the label its title trails as two distinct things", async () => {
  const harness = readerOnFixture();
  const { dsrSplitTitle } = harness.sandbox;
  // The split is POSITIONAL: what follows the last separator becomes a label because of where
  // it sits. The reader reads no meaning from either side, and knows nothing about versions.
  const split = dsrSplitTitle("Contrato — Reporte de cambios de un run · v1");
  assert.equal(split.name, "Contrato — Reporte de cambios de un run");
  assert.equal(split.label, "v1");
  // A title with no separator keeps exactly the header it always had.
  assert.equal(dsrSplitTitle("Rúbrica de niveles y de calidad").label, "");
  assert.equal(dsrSplitTitle("Rúbrica de niveles y de calidad").name, "Rúbrica de niveles y de calidad");
  // And a tail long enough to be a phrase is not a label: a title is never beheaded because it
  // happens to contain a separator mid-sentence.
  const sentence = "A rule · and then a whole clause that is plainly not a label at all";
  assert.equal(dsrSplitTitle(sentence).label, "");
  assert.equal(dsrSplitTitle(sentence).name, sentence);

  // Painted: two elements, two facts, and the path still underneath both.
  await harness.sandbox.openDocSideReader({ path: "docs/REFERENCE-RULES.md" });
  assert.equal(harness.element("doc-side-reader-title").textContent, "Reference rules");
  assert.equal(harness.element("doc-side-reader-label").textContent, "", "no tail, no label painted");
  assert.equal(harness.element("doc-side-reader-path").textContent, "docs/REFERENCE-RULES.md", "the path stays as it was");
});

test("QA 1: the header's two levels are two elements in the page, and an empty label paints nothing", () => {
  const html = readFileSync(INDEX_HTML, "utf8");
  const head = /<div class="dsr-ref-head">[\s\S]*?<\/div>/.exec(html);
  assert.ok(head, "the name and the label share one head block");
  assert.ok(head[0].includes('id="doc-side-reader-title"'), "the name");
  assert.ok(head[0].includes('id="doc-side-reader-label"'), "and the label beside it");
  assert.ok(/\.dsr-ref-label:empty\s*\{\s*display:\s*none/.test(READER_CSS_SOURCE),
    "a label with nothing in it takes no room");
});

// 2 · «no visual hierarchy» — the body AND the section index

test("QA 2: the six body heading levels are visibly distinct from each other and from body text", () => {
  const sizes = [1, 2, 3, 4, 5, 6].map((level) => ruleFontSize(".dsr-h-l" + level));
  assert.ok(sizes.every((size) => typeof size === "number"), "every level declares its own size: " + JSON.stringify(sizes));
  // Strictly decreasing, so no two levels can collapse into one another.
  for (let i = 1; i < sizes.length; i += 1) {
    assert.ok(sizes[i] < sizes[i - 1],
      `level ${i + 1} (${sizes[i]}px) must read smaller than level ${i} (${sizes[i - 1]}px)`);
  }
  // The defect measured on 2026-08-27: levels 4-6 were the body's own 13.5px, so three depths
  // were invisible. No heading may share the body's size again.
  const body = ruleFontSize(".dsr-document");
  assert.equal(body, 13.5, "the body scale is the measured one");
  sizes.forEach((size, index) => {
    assert.notEqual(size, body, `level ${index + 1} must not read as ordinary paragraph text`);
  });
  // And weight is not left to the shared base alone: every level declares its own.
  [1, 2, 3, 4, 5, 6].forEach((level) => {
    const rule = new RegExp("\\.dsr-h-l" + level + "\\s*\\{([^}]*)\\}").exec(READER_CSS_SOURCE);
    assert.ok(/font-weight:/.test(rule[1]), `level ${level} declares its own weight`);
  });
});

test("QA 2: the section index carries the same scale — six levels, six sizes, not two weights", () => {
  const sizes = [1, 2, 3, 4, 5, 6].map((level) => ruleFontSize(".dsr-index-l" + level));
  assert.ok(sizes.every((size) => typeof size === "number"), "every level of the rail declares its own size: " + JSON.stringify(sizes));
  for (let i = 1; i < sizes.length; i += 1) {
    assert.ok(sizes[i] < sizes[i - 1],
      `rail level ${i + 1} (${sizes[i]}px) must read smaller than level ${i} (${sizes[i - 1]}px)`);
  }
  assert.equal(new Set(sizes).size, 6, "six levels, six sizes — the rail never flattens to one");
  // The measured defect: one size for everything and a single bold level. Weight and indent now
  // move with the size at every level.
  [1, 2, 3, 4, 5, 6].forEach((level) => {
    const rule = new RegExp("\\.dsr-index-l" + level + "\\s*\\{([^}]*)\\}").exec(READER_CSS_SOURCE);
    assert.ok(/font-weight:/.test(rule[1]), `rail level ${level} declares its own weight`);
  });
  const indents = [3, 4, 5, 6].map((level) => {
    const rule = new RegExp("\\.dsr-index-l" + level + "\\s*\\{([^}]*)\\}").exec(READER_CSS_SOURCE);
    const pad = /padding:[^;]*?([\d.]+)px;/.exec(rule[1]);
    return pad ? Number(pad[1]) : null;
  });
  for (let i = 1; i < indents.length; i += 1) {
    assert.ok(indents[i] > indents[i - 1], "a deeper level sits further in: " + JSON.stringify(indents));
  }
  // The base rule must not put a size back on all of them at once.
  const base = new RegExp("\\.dsr-index-item\\s*\\{([^}]*)\\}").exec(READER_CSS_SOURCE);
  assert.ok(!/font-size:/.test(base[1]), "one size for the whole rail is the defect, not the fix");
});

test("QA 2: a real document paints one class per level, so the scale reaches the screen", async () => {
  const harness = readerOnFixture();
  await harness.sandbox.openDocSideReader({ path: "docs/REFERENCE-RULES.md" });
  const html = harness.element("doc-side-reader-body").innerHTML;
  // The fixture carries levels 1, 2 and 3, and each heading wears the class of its own level.
  assert.ok(/<h1 class="dsr-h dsr-h-l1"/.test(html), "a first-level heading wears the first level");
  assert.ok(/<h2 class="dsr-h dsr-h-l2"/.test(html), "a second-level heading wears the second");
  assert.ok(/<h3 class="dsr-h dsr-h-l3"/.test(html), "a third-level heading wears the third");
  assert.ok(/dsr-index-item dsr-index-l1"/.test(html), "and the rail levels its entries the same way");
  assert.ok(/dsr-index-item dsr-index-l3"/.test(html));
});

// 3 · the veil, and it is the console's own pattern

test("QA 3: the veil is the console's EXISTING overlay pattern, not a second one", () => {
  const html = readFileSync(INDEX_HTML, "utf8");
  const veil = /<div id="doc-side-reader-overlay"[^>]*>/.exec(html);
  assert.ok(veil, "the veil is in the page");
  assert.ok(/class="[^"]*\bdrawer-overlay\b/.test(veil[0]),
    "it wears the console's own .drawer-overlay class — the run drawer's veil, named");
  // The shared rule itself is NOT redefined here: a change to .drawer-overlay would land on the
  // run drawer and the edit modal, and is not this run's to make.
  assert.ok(!/^\s*\.drawer-overlay/m.test(READER_CSS_SOURCE),
    "this stylesheet must not redefine the shared overlay");
  // The one thing that IS this reader's: where in the stack it sits — above the report layer it
  // has to dim (60), below the panel (70).
  const scoped = /\.dsr-overlay\s*\{([^}]*)\}/.exec(READER_CSS_SOURCE);
  assert.ok(scoped, "the reader's own rule for it");
  assert.deepEqual(scoped[1].match(/[a-z-]+:/g), ["z-index:"], "and it declares nothing but the layer order");
  assert.match(scoped[1], /z-index:\s*65/);
  // The colour comes from the shared pattern: this file never reaches for the overlay token and
  // never paints a background on the veil, so there is no second veil colour to drift from.
  assert.ok(!/--overlay/.test(READER_CSS_SOURCE), "the veil's colour is the shared one, not a copy of it");
  assert.ok(!/background/.test(scoped[1]), "and this file paints no veil of its own");
});

test("QA 3: the veil covers the left while the reader is open and is gone when it closes", async () => {
  const harness = readerOnFixture();
  const veil = harness.element("doc-side-reader-overlay");
  assert.equal(veil.classList.contains("open"), false, "no veil before the reader opens");

  await harness.sandbox.openDocSideReader({ path: "docs/REFERENCE-RULES.md" });
  assert.equal(veil.classList.contains("open"), true, "the veil is up while the document is open");

  harness.sandbox.closeDocSideReader();
  assert.equal(veil.classList.contains("open"), false, "and gone when it closes");
});

test("QA 3: clicking the veil closes the reader — matched to what the run detail's veil does", async () => {
  // What the run detail does, on disk, so the match is documented and not assumed.
  const consoleSource = readFileSync(join(ASSETS, "project-console.js"), "utf8");
  assert.ok(/byId\("drawer-overlay"\)\.addEventListener\("click", closeDrawer\)/.test(consoleSource),
    "the run drawer's veil closes it on click — this is the behaviour being matched");

  const harness = readerOnFixture();
  pressTheDocumentsButton(harness);
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(harness.sandbox.docSideReaderIsOpen(), true);

  clickOn(harness, harness.element("doc-side-reader-overlay"));
  assert.equal(harness.sandbox.docSideReaderIsOpen(), false, "a click on the veil closes the reader, as it closes the drawer");
  assert.equal(harness.element("doc-side-reader-overlay").classList.contains("open"), false);
});

test("QA 3 / criterion 4: the veil dims the page and moves nothing on it", async () => {
  const harness = readerOnFixture();
  const view = harness.element("run-report-view");
  view.classList.add("open");
  const reportScroll = harness.element("run-report-scroll");
  reportScroll.scrollTop = 4321;
  const drawer = harness.element("run-drawer");
  drawer.classList.add("open");
  harness.touched.clear();

  await harness.sandbox.openDocSideReader({ path: "docs/REFERENCE-RULES.md", section: "2.1" });
  harness.sandbox.closeDocSideReader();

  assert.equal(view.classList.contains("open"), true, "the report is still open");
  assert.equal(reportScroll.scrollTop, 4321, "and still exactly where the operator left it");
  assert.equal(drawer.classList.contains("open"), true, "and so is the run underneath");
  const outside = [...harness.touched].filter((id) => !PANEL_IDS.has(id) && !/^dsr-h-\d+$/.test(id));
  assert.deepEqual(outside, [], "the veil wrote to something that is not the reader's own chrome");
  // It is fixed and inset:0 — it cannot resize or re-lay-out what it covers, and that is why the
  // operator chose it over splitting the page into columns.
  const panel = /\.doc-side-reader\s*\{([^}]*)\}/.exec(READER_CSS_SOURCE);
  assert.match(panel[1], /position:\s*fixed/, "the panel stays an overlay, never a column");
});

test("criterion 2: the console hands the reader ITS OWN project's index and closes it on a switch", () => {
  const source = readFileSync(join(ASSETS, "project-console.js"), "utf8");
  assert.ok(/setDocSideReaderSource\(\{\s*\n?\s*docsIndex: data\.docsIndex/.test(source),
    "the reader is given the ACTIVE project's parsed docs index");
  assert.ok(/base: REPO_BASE/.test(source), "and that project's base, composed in the one file that owns routes");
  const reset = /function resetProjectScopedState\(\)([\s\S]*?)\n}/.exec(source);
  assert.ok(reset, "the per-project reset is where a leak across projects would show");
  assert.ok(/closeDocSideReader\(\)/.test(reset[1]), "a switch closes the reader");
  assert.ok(/setDocSideReaderSource\(\{\}\)/.test(reset[1]), "and takes its documents away with it");
});
