// THE READ-ONLY DOCUMENT READER OF THIS CONSOLE, judged rule by rule.
//
// The run exists for AUDIT and not for comfort: the operator signs verdicts against rules he
// cannot open without leaving the screen. Every criterion of the ticket is pinned below by a
// NAMED test, and the first of them is the same mechanical domain-blindness veto that already
// covers the renderer (#52) and the mount (#53), pointed at this reader and its stylesheet.
//
// [#63] AND THE ONE THAT NOW GOVERNS THE SHAPE: there is ONE reader in this console, not two.
// #62 shipped a side panel with a markdown renderer of its own beside a Docs tab that had been
// reading documents with an index on the left all along. This suite pins the undoing — the
// centred modal composed from patterns the console already carries, the document painted by the
// console's ONE renderer, and the side panel gone rather than dormant.
//
// THE HARNESS. A DOM stub that RECORDS every element it hands out and every mutation made
// through it, so "opening the reader disturbs nothing beneath it" can be PROVED rather than
// asserted: the test reads back which ids were written to. Two fictions in it, both named:
//
//   · a heading element reports an offsetTop (a real layout has one and node has no layout). It
//     is derived from the heading's own positional id, so a jump to the wrong heading lands on
//     the wrong number and this file fails.
//   · the shared renderer arrives on `window` from a context of its own rather than from the
//     script tag that puts it there in a browser. It is the REAL function, compiled from the
//     real file with its real dependencies, and the reader reaches it exactly as it would on the
//     page — through `window`. What the injection cannot prove is that the PAGE ships it, so
//     that is pinned separately and structurally, in "one renderer" below.

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
const CONSOLE_JS = join(ASSETS, "project-console.js");
const CONSOLE_CSS = join(ASSETS, "project-console.css");
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
  // [#63] The index column of the modal and the one block inside it: the project's documents.
  // [#63 QA·2] The section rail that used to sit under them is gone, and so is its id.
  // They are the reader's own chrome too, and everything outside this set stays forbidden.
  "doc-side-reader-index",
  "doc-side-reader-docs",
  "doc-side-reader-scroll",
  "doc-side-reader-body"
]);

const READER_CSS_SOURCE = readFileSync(READER_CSS, "utf8");
const CONSOLE_CSS_SOURCE = readFileSync(CONSOLE_CSS, "utf8");

// [#63 QA] The reader's stylesheet with its comments taken out. "This file declares nothing for a
// shared selector" is a claim about RULES, and this file NAMES shared selectors in prose all the
// time — saying which rule it wears and which it must not touch is half of why it is readable.
// Asserting over the raw text would forbid the documentation instead of the declaration.
const READER_CSS_RULES = READER_CSS_SOURCE.replace(/\/\*[\s\S]*?\*\//g, "");

// [#63] THE CONSOLE'S ONE DOCUMENT RENDERER, compiled from the real file and handed to the reader
// the way the page hands it over: as a global on `window`. It is loaded in a context of its own
// because the console script boots its whole chrome when it finds the Overview tab, and a reader
// harness is not a console page; the function itself is pure — a document in, painted html out —
// so it needs nothing from the reader's context and the reader needs nothing but the function.
function sharedDocRenderer() {
  const context = {
    console,
    document: { getElementById: () => null, querySelector: () => null, querySelectorAll: () => [], addEventListener() {}, readyState: "complete" },
    fetch: async () => null,
    location: { href: "http://harness/", search: "", hash: "", pathname: "/" },
    localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
    navigator: { userAgent: "node" },
    history: { replaceState() {}, pushState() {} },
    requestAnimationFrame: (fn) => setTimeout(fn, 0),
    setTimeout,
    clearTimeout,
    URL,
    URLSearchParams
  };
  context.window = context;
  vm.createContext(context);
  vm.runInContext(readFileSync(CONSOLE_JS, "utf8"), context, { filename: CONSOLE_JS });
  if (typeof context.renderDocBodyContent !== "function") {
    throw new Error("the console script no longer declares renderDocBodyContent as a global");
  }
  return context.renderDocBodyContent;
}

const SHARED_RENDERER = sharedDocRenderer();

// The declared font-size of one rule, in px. Used to pin a scale that must not flatten.
function ruleFontSize(selector) {
  const rule = new RegExp("\\" + selector + "\\s*\\{([^}]*)\\}").exec(READER_CSS_SOURCE);
  if (!rule) return null;
  const size = /font-size:\s*([\d.]+)px/.exec(rule[1]);
  return size ? Number(size[1]) : null;
}

// [#63] The same reading, taken from the CONSOLE'S stylesheet. The scale the operator reads a
// document at is no longer declared in this reader, so it is pinned where it now lives. The
// selector arrives already escaped, because these rules are qualified and grouped.
function consoleRuleFontSize(selectorPattern) {
  const rule = new RegExp(selectorPattern + "\\s*\\{([^}]*)\\}").exec(CONSOLE_CSS_SOURCE);
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
  // [#63] The console's one document renderer, present on the page exactly as the browser has it.
  // `noRenderer: true` takes it away, which is how the reader's refusal to grow a second one is
  // proved rather than assumed.
  if (!opts.noRenderer) sandbox.renderDocBodyContent = SHARED_RENDERER;
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
  // [#63] THE HEADING RULE HAS NOT MOVED — IT HAS MOVED HOUSE. It is still the ONE generic
  // markdown rule, a run of hashes at the start of a line, and it now lives where the Docs tab
  // has always kept it: in the console's one renderer. Pinned THERE, so it cannot quietly become
  // something that reads meaning.
  const consoleSource = readFileSync(CONSOLE_JS, "utf8");
  assert.ok(/const heading = trimmed\.match\(\/\^\(#\{1,6\}\)\\s\+\(\.\*\)\$\/\)/.test(consoleSource),
    "the shared renderer finds headings by the generic markdown rule");
  // And what is left in the reader is narrower still: it recognises the ELEMENT the shared
  // renderer marked as a heading. No markdown grammar of its own survives here.
  assert.ok(/<h\(\[1-6\]\) class="docs-body-h">/.test(source),
    "the reader reads back the renderer's own heading element");
  assert.ok(!/#\{1,6\}/.test(source), "and carries no markdown heading rule of its own");
  // A citation is compared as a WHOLE string, never scanned for something inside it: no
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
  // [#63] The list lives in the INDEX COLUMN now, on the left, where it stays for good.
  const html = harness.element("doc-side-reader-docs").innerHTML;
  DOCS_INDEX.docs.forEach((doc) => {
    assert.ok(html.includes(doc.path), `the list names ${doc.path}`);
    assert.ok(html.includes(doc.title), `the list names its title`);
  });
  // Three declared, three offered: no fourth arrives from a walk of anybody's folders.
  const offered = html.match(/data-dsr-doc="/g) || [];
  assert.equal(offered.length, DOCS_INDEX.docs.length, "one row per indexed document, and no more");
  assert.ok(html.includes(".project/docs_index.json"), "the list names the index it was measured from");
  // And the reading column points at it rather than standing empty.
  assert.ok(/Choose a document in the index/.test(harness.element("doc-side-reader-body").innerHTML),
    "with nothing open yet, the reading column still says something");
});

test("criterion 2: a path the index does not list is REFUSED in words, and the reader falls back to the list", async () => {
  const harness = readerOnFixture();
  const opened = await harness.sandbox.openDocSideReader({ path: "docs/NOT-INDEXED.md", section: "1" });
  assert.equal(opened.ok, false);
  assert.equal(opened.view, "unlisted");
  const html = harness.element("doc-side-reader-body").innerHTML;
  assert.ok(html.includes("docs/NOT-INDEXED.md"), "the refusal names the file it refused");
  assert.ok(/does not list/.test(html), "and says why");
  // [#63] The refusal no longer has to CARRY the list with it, because the list never left: it is
  // beside the refusal, in the index column, whatever the reading column is showing.
  assert.ok(harness.element("doc-side-reader-docs").innerHTML.includes("data-dsr-doc="),
    "and what CAN be opened is still on screen — never an empty reader");
});

test("criterion 2: switching the source switches the list — no document of a previous project survives", async () => {
  const harness = readerOnFixture();
  await harness.sandbox.openDocSideReader({});
  assert.ok(harness.element("doc-side-reader-docs").innerHTML.includes("docs/REFERENCE-RULES.md"));
  harness.sandbox.setDocSideReaderSource({});
  const opened = await harness.sandbox.openDocSideReader({});
  assert.equal(opened.view, "index_unavailable");
  const html = harness.element("doc-side-reader-docs").innerHTML;
  assert.ok(!html.includes("docs/REFERENCE-RULES.md"), "the previous project's documents are gone");
  assert.ok(/could not be read/.test(html), "and the absence is stated, not left blank");
});

// ---------------------------------------------------------------------------
// CRITERION 3 — a section index derived from the document itself, and read-only.
// ---------------------------------------------------------------------------

test("criterion 3: the section index is derived from the DOCUMENT, not from the index that listed it", () => {
  const harness = loadReader({});
  const raw = readFileSync(join(DOC_FIXTURE, "docs", "REFERENCE-RULES.md"), "utf8");
  // [#63] The path travels with the document because the shared renderer decides by it whether a
  // source is markdown at all — one more thing this reader does not decide for itself.
  const headings = harness.sandbox.dsrHeadings(raw, "docs/REFERENCE-RULES.md");
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

test("criterion 3: a document with no headings opens whole, and a citation into it says why it could not jump", async () => {
  // [#63 QA·2] The rail that used to announce "this document has no sections" is gone with every
  // other rail. What a document without headings costs is not an empty list any more — it is that
  // NOTHING can be jumped to inside it, and that is said where it matters: on the citation.
  const harness = readerOnFixture();
  const opened = await harness.sandbox.openDocSideReader({ path: "docs/FLAT-NOTE.md" });
  assert.equal(opened.view, "document");
  assert.equal(opened.headings, 0, "the document really carries none");
  assert.ok(/It still has paragraphs/.test(harness.element("doc-side-reader-body").innerHTML),
    "and the document is shown whole regardless");

  const cited = await harness.sandbox.openDocSideReader({ path: "docs/FLAT-NOTE.md", section: "1" });
  assert.equal(cited.resolved, false);
  assert.equal(cited.reason, "unmatched");
  const html = harness.element("doc-side-reader-body").innerHTML;
  assert.ok(/could not be resolved/.test(html), "a citation into a document with no headings says so");
  assert.ok(html.includes("1"), "and names what was cited");
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

test("criterion 4: a citation whose section does NOT resolve opens the document at its beginning and NAMES the section", async () => {
  // [#63 QA·2] THE ACCEPTED CONSEQUENCE, written down as behaviour and not as a regression. These
  // citations used to land on a section rail; the operator removed the rail knowing that, and
  // landing at the TOP OF THE DOCUMENT is now the correct answer. What did NOT weaken is the rule
  // that made the landing honest in the first place: the reader still refuses to guess, still says
  // the jump did not happen, and still names the section verbatim as the report wrote it.
  const harness = readerOnFixture();
  // The three shapes measured in the pilot on 2026-08-27: a section plus a comment, two sections
  // at once, and a section this document simply does not have. None of them may be guessed at.
  for (const section of ["2 (the anchor) and 3", "1 — one and only one key", "9.9"]) {
    const opened = await harness.sandbox.openDocSideReader({ path: "docs/REFERENCE-RULES.md", section });
    assert.equal(opened.view, "document", "the document still opens");
    assert.equal(opened.resolved, false, `"${section}" must not resolve`);
    assert.equal(opened.reason, "unmatched");
    assert.equal(opened.targetId, "", "and nothing is jumped to");
    assert.equal(harness.element("doc-side-reader-scroll").scrollTop, 0,
      "it lands at the beginning of the document — never somewhere plausible");
    const html = harness.element("doc-side-reader-body").innerHTML;
    assert.ok(/could not be resolved/.test(html), "the view says the jump did not happen");
    assert.ok(/opened at its beginning/.test(html), "and says where it landed instead");
    assert.ok(html.includes(section), `and names the section verbatim: ${section}`);
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
  const headings = dsrHeadings("# One\n\n## 2. Two\n\n### 2.1 Two point one\n", "a.md");
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
  assert.ok(/could not be read/.test(unavailable.element("doc-side-reader-docs").innerHTML));

  const empty = loadReader({});
  empty.sandbox.setDocSideReaderSource({ docsIndex: { docs: [] }, indexPath: ".project/docs_index.json" });
  const b = await empty.sandbox.openDocSideReader({});
  assert.equal(b.view, "list");
  const html = empty.element("doc-side-reader-docs").innerHTML;
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
  assert.equal(harness.element("doc-side-reader").classList.contains("open"), true, "and the modal is on screen");
  const html = harness.element("doc-side-reader-docs").innerHTML;
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

test("the panel's own controls answer a CLICK too: a document row and Close — and there are no others", async () => {
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

  // Close, clicked.
  const close = harness.node("(close-button)", { "data-dsr-close": "" }, panel);
  clickOn(harness, close);
  assert.equal(harness.sandbox.docSideReaderIsOpen(), false, "Close closes it");
  assert.equal(panel.classList.contains("open"), false);

  // [#63 QA·2] AND THE SECTION CONTROL IS GONE, delegate and all. A handler left listening for a
  // control nobody paints is the dormant half of a removal, and this run has refused that twice.
  assert.ok(!readFileSync(READER_JS, "utf8").includes("data-dsr-section"),
    "no delegate is left waiting for a section control that no longer exists");
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

test("QA 2: the body's heading scale is the console's OWN, and no level reads as ordinary text", () => {
  // [#63] THE SCALE IS NO LONGER THIS READER'S TO DECLARE, and that is the reuse being paid for
  // rather than claimed. The document is painted by the console's one renderer into the Docs
  // tab's own container, so the sizes on screen are the ones that stylesheet already carries.
  // #62's six-level scale went with the second renderer that needed it: the shared renderer maps
  // markdown levels onto h2/h3/h4, so depths 3 and beyond share the deepest one. Measured on the
  // 481 documents the three project indexes list: 8785 headings, of which 117 sit at markdown
  // levels 4 to 6. Getting six back means a second renderer, which is the defect this run undoes.
  const sizes = ["h2", "h3", "h4"].map((tag) => consoleRuleFontSize("\\.docs-body " + tag + "\\.docs-body-h"));
  assert.deepEqual(sizes, [26, 22, 20], "three levels, three sizes, and they are the shared ones");
  for (let i = 1; i < sizes.length; i += 1) {
    assert.ok(sizes[i] < sizes[i - 1], "strictly decreasing: " + JSON.stringify(sizes));
  }
  // The defect QA 2 was opened for: a heading that reads as ordinary paragraph text. None does.
  const body = consoleRuleFontSize("\\.docs-reader p,\\s*\\.docs-reader li");
  assert.equal(body, 18, "the reading body's size is the measured one");
  sizes.forEach((size, index) => {
    assert.ok(size > body, `level ${index + 1} (${size}px) must read larger than body text (${body}px)`);
  });
  // And every level declares its own weight, in the shared rule that owns them.
  const shared = /\.docs-body \.docs-body-h\s*\{([^}]*)\}/.exec(CONSOLE_CSS_SOURCE);
  assert.ok(shared && /font-weight:/.test(shared[1]), "the shared heading rule carries the weight");
});

test("QA 2: not one body-typography rule survives in this reader — the second set is GONE, not dormant", () => {
  // The measurable half of "one reader, not two". #62 shipped a full body stylesheet here to
  // paint what its own renderer emitted: six heading levels, code, tables, quotes, rules, links.
  // Every one of them is deleted. A dormant copy is a second answer waiting to drift.
  for (const dead of ["\\.dsr-h\\b", "\\.dsr-code\\b", "\\.dsr-table\\b", "\\.dsr-document\\b", "\\.dsr-link-text\\b"]) {
    assert.ok(!new RegExp(dead).test(READER_CSS_SOURCE), `${dead} is gone from the stylesheet, not left dormant`);
  }
  // And the shared rules the reader now wears are worn, never REDEFINED: a rule of that name at
  // the top level here would land on the Docs tab, which this run may not redesign.
  for (const shared of ["docs-layout", "docs-nav", "docs-nav-item", "docs-reader", "docs-body", "drawer-overlay", "edit-modal"]) {
    assert.ok(!new RegExp("\\." + shared + "\\b").test(READER_CSS_RULES),
      `.${shared} is worn, never redeclared — it belongs to the surface it came from`);
  }
  // [#63] Not one shared selector is declared here, scoped or otherwise: they are worn whole.
  assert.ok(!/\.docs-[a-z-]+/.test(READER_CSS_RULES),
    "this stylesheet declares nothing at all for a shared selector — it wears them");
});

test("QA 2: a real document paints the shared heading element, stamped in the renderer's own order", async () => {
  const harness = readerOnFixture();
  await harness.sandbox.openDocSideReader({ path: "docs/REFERENCE-RULES.md" });
  const html = harness.element("doc-side-reader-body").innerHTML;
  // The fixture carries markdown levels 1, 2 and 3; the shared renderer paints them h2/h3/h4 and
  // this reader stamps each one with its positional id, in the order the renderer emitted them.
  assert.ok(/<h2 class="docs-body-h" id="dsr-h-0">/.test(html), "the first heading, painted and stamped");
  assert.ok(/<h3 class="docs-body-h" id="dsr-h-1">/.test(html), "the second level, painted and stamped");
  assert.ok(/<h4 class="docs-body-h" id="dsr-h-3">/.test(html), "the third level, painted and stamped");
  // The document wears the Docs tab's own reading container, so one stylesheet paints both.
  assert.ok(/<article class="docs-body">/.test(html), "the document is in the shared reading container");
  // [#63 QA·2] The stamps are what the JUMP lands on, and they are the only reason the headings
  // are indexed at all now that no rail lists them.
  assert.equal((html.match(/ id="dsr-h-\d+"/g) || []).length, 9, "every heading is still a landing place");
});

test("QA 2 · [#63 QA·2]: the section rail is GONE from the stylesheet, not left dormant", () => {
  // The rail carried a scale of three levels that this run pinned so it could never flatten.
  // The operator removed the rail, so the scale went with it — and what is pinned now is the
  // ABSENCE, because a dormant set of rules is a second answer waiting to be reached again.
  for (const level of [1, 2, 3, 4, 5, 6]) {
    assert.equal(ruleFontSize(".dsr-index-l" + level), null, `no rail level ${level} survives`);
  }
  // Every rule that painted it — its box, its title, its items and their three levels, and the
  // sentence it said when a document had no headings.
  assert.ok(!/\.dsr-index\b/.test(READER_CSS_RULES), "not one rail rule is left in the stylesheet");
  const js = readFileSync(READER_JS, "utf8");
  assert.ok(!js.includes("dsrSectionIndexHtml"), "and the builder that painted it is gone too");
  assert.ok(!readFileSync(INDEX_HTML, "utf8").includes("doc-side-reader-sections"),
    "and the element it was painted into is out of the page");
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
  const panel = /\.dsr-modal\s*\{([^}]*)\}/.exec(READER_CSS_SOURCE);
  assert.match(panel[1], /position:\s*fixed/, "the dialog stays an overlay, never a column");
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

// ---------------------------------------------------------------------------
// [#63] ONE READER, NOT TWO — the acceptance of this run, rule by rule.
//
// The operator's QA of #62 on 2026-09-02, and it named a surface rather than a style: «en vez de
// tener un indice al que le das click y abre esa seccion y se pierde el indice, que se use el
// mismo diseno que docs de un proyecto. A la izquierda el indice y a la derecha el contenido»,
// «creo que es mejor que este como un modal centrado, y grande, con el fondo negro igual que
// ahora». The finding underneath it is the uncomfortable one: this console ALREADY read documents
// with an index on the left, and #62 built a second one. What follows pins the undoing.
// ---------------------------------------------------------------------------

// 1 · A CENTRED MODAL, OVER THE SAME VEIL, INDEX LEFT AND DOCUMENT RIGHT.

test("[#63] 1: the reader is a centred dialog whose geometry is the console's OWN edit modal", () => {
  const html = readFileSync(INDEX_HTML, "utf8");
  const shell = /<aside id="doc-side-reader"[^>]*>/.exec(html);
  assert.ok(shell, "the reader is in the page");
  assert.ok(/role="dialog"/.test(shell[0]) && /aria-modal="true"/.test(shell[0]),
    "and it says it is a modal dialog, as the edit modal does");
  assert.ok(/class="dsr-modal"/.test(shell[0]), "wearing its own dialog class and no drawer class");

  const dialog = /\.dsr-modal\s*\{([^}]*)\}/.exec(READER_CSS_SOURCE);
  assert.ok(dialog, "the dialog declares its geometry");
  // CENTRED: the same declarations the edit modal centres itself with, read off that rule rather
  // than trusted — if the console's dialog idiom moves, this pin says so.
  const editModal = /\.edit-modal\s*\{([^}]*)\}/.exec(CONSOLE_CSS_SOURCE);
  assert.ok(editModal, "the console's edit modal is the pattern being composed from");
  for (const declaration of ["top: 50%", "left: 50%", "z-index: 70"]) {
    assert.ok(editModal[1].includes(declaration), "the pattern declares " + declaration);
    assert.ok(dialog[1].includes(declaration), "and the reader composes it: " + declaration);
  }
  assert.match(dialog[1], /transform:\s*translate\(-50%,\s*-50%\)/, "centred by the same translate");
  // [#63 QA] THE IDIOM IS SHARED; THE SIZE IS THIS READER'S OWN, and that is deliberate. The
  // operator read a document in it and said «quedó muy chico el modal, que consuma casi toda la
  // página». The edit modal's 1040px is right for one column of fields and wrong for a reader
  // that spends 340 of them on an index. Both rules keep the same `min(px, vw)` shape.
  assert.ok(editModal[1].includes("width: min(1040px, 94vw)"), "the pattern's own width measure");
  assert.ok(/max-height:\s*92vh/.test(editModal[1]), "and its own viewport cap");
  assert.ok(dialog[1].includes("width: min(1760px, 96vw)"), "the reader takes nearly the whole page");
  assert.ok(/height:\s*94vh/.test(dialog[1]), "in both directions");
  // AND THE SHARED RULE IS UNTOUCHED — other surfaces are sized by it. This reader declares
  // nothing for it anywhere, and the values above are read off it, so an edit to it fails here.
  assert.ok(!/\.edit-modal/.test(READER_CSS_RULES),
    "the reader's stylesheet declares nothing for the shared dialog rule");
  // The cap is generous ON PURPOSE: it is 96vw of an 1833px viewport, so it never shows itself on
  // an ordinary desktop and only stops the dialog stretching across an ultra-wide screen.
  assert.equal(Math.round(1760 / 0.96), 1833, "the width the cap starts to bite at, stated");
  // No trace of the side panel's geometry survives.
  assert.ok(!/50vw/.test(READER_CSS_SOURCE), "no half-page width anywhere");
  assert.ok(!/\bright:\s*0/.test(READER_CSS_SOURCE), "and nothing pinned to the right edge");
});

test("[#63] 1: the same veil as before, and the Docs tab's own two columns — index left, document right", () => {
  const html = readFileSync(INDEX_HTML, "utf8");
  // The veil is untouched by this run: it is still the run drawer's own element and class.
  const veil = /<div id="doc-side-reader-overlay"[^>]*>/.exec(html);
  assert.ok(/class="[^"]*\bdrawer-overlay\b/.test(veil[0]), "«el fondo negro igual que ahora»");

  const layout = /<div class="dsr-layout docs-layout">([\s\S]*?)\n      <\/div>/.exec(html);
  assert.ok(layout, "the Docs tab's grid, worn by class and not copied");
  const indexAt = layout[1].indexOf('id="doc-side-reader-index"');
  const readerAt = layout[1].indexOf('id="doc-side-reader-scroll"');
  assert.ok(indexAt !== -1 && readerAt !== -1, "both columns are there");
  assert.ok(indexAt < readerAt, "«a la izquierda el indice y a la derecha el contenido»");
  // The columns are the Docs tab's own, by class.
  assert.ok(/id="doc-side-reader-index" class="docs-nav dsr-nav"/.test(layout[1]),
    "the index column is the tab's navigation column");
  assert.ok(/id="doc-side-reader-scroll" class="docs-reader dsr-scroll"/.test(layout[1]),
    "and the reading column is the tab's reading column");
  // THE GRID IS WORN WHOLE, and not one declaration of it is restated here — not even to undo
  // something. The tab declares `.docs-layout` TWICE: the first rule carries page chrome a dialog
  // cannot use (a viewport height, a negative margin), and a LATER top-level rule in the same
  // stylesheet already replaces both, for the tab's own banner defect. Later rule, same
  // specificity: it wins, and it is exactly what a bounded flex-column dialog needs. Measured, so
  // the day that second rule is removed this pin is what says the dialog now needs its own.
  const rules = [...CONSOLE_CSS_SOURCE.matchAll(/(^|\n)\.docs-layout\s*\{([^}]*)\}/g)].map((m) => m[2]);
  assert.equal(rules.length, 2, "the tab declares its grid twice, at the top level");
  assert.match(rules[0], /grid-template-columns:\s*340px minmax\(0, 1fr\)/, "the tab's two tracks");
  assert.match(rules[0], /height:\s*calc\(100vh/, "the first rule measures itself against the viewport");
  assert.match(rules[0], /margin:\s*-28px -32px/, "and bleeds into the tab's page padding");
  assert.match(rules[1], /height:\s*auto/, "and the later rule takes the viewport height back off");
  assert.match(rules[1], /margin:\s*0/, "and the bleed with it");
  assert.match(rules[1], /flex:\s*1 1 auto/, "leaving exactly what a bounded flex column needs");
  assert.match(rules[1], /min-height:\s*0/);
  // So the reader overrides NOTHING: a rule that restates what the cascade already says is a
  // second answer waiting to drift from the first.
  assert.ok(!/\.dsr-modal \.docs-/.test(READER_CSS_SOURCE),
    "the reader scopes no override of the shared grid at all");
});

test("[#63] 1: navigating the index NEVER loses the index — a jump moves the document alone", async () => {
  const harness = readerOnFixture();
  await harness.sandbox.openDocSideReader({ path: "docs/REFERENCE-RULES.md" });

  const docsBefore = harness.element("doc-side-reader-docs").innerHTML;
  assert.ok(docsBefore.includes("data-dsr-doc="), "the documents are in the index column");
  // The operator has scrolled the index; this is the place he must not lose.
  const column = harness.element("doc-side-reader-index");
  column.scrollTop = 260;
  harness.touched.clear();

  // [#63 QA·2] The jump now arrives the only way it still can: from a CITATION that resolves.
  // The rail that used to fire it is gone, and this is the gesture that matters anyway — the
  // operator presses a citation in the report and the document moves under a menu that does not.
  const jumped = await harness.sandbox.openDocSideReader({ path: "docs/REFERENCE-RULES.md", section: "2.1" });
  assert.equal(jumped.resolved, true);
  assert.equal(jumped.targetId, "dsr-h-3");

  assert.equal(harness.element("doc-side-reader-scroll").scrollTop, 400, "the document moved to the heading");
  assert.equal(column.scrollTop, 260, "and the index did not move one pixel");
  assert.equal(harness.element("doc-side-reader-docs").innerHTML, docsBefore, "the documents are still listed");
  assert.ok(!harness.touched.has("doc-side-reader-index"), "nothing was rewritten in the index column at all");
});

test("[#63] 1: opening a second document moves the active mark and NOT the index column", async () => {
  const harness = readerOnFixture();
  await harness.sandbox.openDocSideReader({ path: "docs/REFERENCE-RULES.md" });
  const column = harness.element("doc-side-reader-index");
  column.scrollTop = 260;                       // the operator's place in the menu
  harness.touched.clear();

  await harness.sandbox.openDocSideReader({ path: "docs/FLAT-NOTE.md" });

  // [#63 QA] The list DOES change now: it carries which document is open. What must not change is
  // where the operator is standing in it — so the column itself is never rewritten, and the write
  // to the list inside it puts the scroll back where it found it.
  assert.ok(!harness.touched.has("doc-side-reader-index"),
    "the column is never rewritten — only the block inside it is");
  assert.equal(column.scrollTop, 260, "and the operator's place in the menu survives the repaint");
  const list = harness.element("doc-side-reader-docs").innerHTML;
  assert.ok(/data-dsr-doc="docs\/FLAT-NOTE\.md"/.test(list), "the new document is still listed");
  assert.ok(/class="docs-nav-item dsr-doc-row active" type="button" data-dsr-doc="docs\/FLAT-NOTE\.md"/.test(list),
    "and it is the one now marked");
});

test("[#63] 1: one write per document opened, never two", async () => {
  // The reader paints the index twice per open — once at the press, once when the document has
  // been read — and the second paint must be free. If the active mark or the list ever disagreed
  // between the two, the menu would be rebuilt under the operator's cursor a second time.
  const harness = readerOnFixture();
  await harness.sandbox.openDocSideReader({ path: "docs/REFERENCE-RULES.md" });
  let writes = 0;
  const docs = harness.element("doc-side-reader-docs");
  const real = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(docs), "innerHTML");
  Object.defineProperty(docs, "innerHTML", {
    get: () => real.get.call(docs),
    set: (value) => { writes += 1; real.set.call(docs, value); },
    configurable: true
  });

  await harness.sandbox.openDocSideReader({ path: "docs/FLAT-NOTE.md" });
  assert.equal(writes, 1, "one document opened, one write of the list");

  await harness.sandbox.openDocSideReader({ path: "docs/FLAT-NOTE.md" });
  assert.equal(writes, 1, "and reopening the SAME document writes nothing at all");
});

// 2 · ONE RENDERER.

test("[#63] 2: the document is painted by the console's OWN renderer — the same call the Docs tab makes", () => {
  const source = readFileSync(READER_JS, "utf8");
  const consoleSource = readFileSync(CONSOLE_JS, "utf8");
  // The entry point, and it is the tab's: the Docs tab paints its own reader body with it.
  assert.ok(/function renderDocBodyContent\(doc, rawText\)/.test(consoleSource),
    "the console declares the one document renderer at the top level, so the page carries it");
  assert.ok(/renderDocBodyContent\(doc, raw\)/.test(consoleSource),
    "and the Docs tab's own body loader calls it");
  assert.ok(/scope\.renderDocBodyContent/.test(source), "the reader reaches for that very function");
  // Looked up at CALL time, which is what makes the page's script order safe: the reader is
  // deferred AHEAD of the console script that declares it.
  const html = readFileSync(INDEX_HTML, "utf8");
  const readerTag = html.indexOf('src="assets/doc-side-reader.js"');
  const consoleTag = html.indexOf('src="assets/project-console.js"');
  assert.ok(readerTag !== -1 && consoleTag !== -1, "the page ships both scripts");
  assert.ok(readerTag < consoleTag, "the reader is parsed first, so a load-time capture would be null");
  assert.ok(!/=\s*window\.renderDocBodyContent;/.test(source),
    "and nothing captures the renderer at load time");
});

test("[#63] 2: the reader carries NO renderer of its own — no markdown grammar survives in it", () => {
  const source = readFileSync(READER_JS, "utf8");
  // #62's second renderer, named by the pieces only a markdown parser has. Every one is gone.
  for (const piece of ["flushParagraph", "flushListItem", "flushTable", "fenceLines", "dsrParseDocument", "dsrInline"]) {
    assert.ok(!source.includes(piece), piece + " belonged to the second renderer and is gone");
  }
  // And no block markup is emitted here at all: paragraphs, lists, quotes, rules, code and tables
  // are the renderer's to write, and this file writes none of them.
  for (const tag of ["<p>", "<li>", "<ul>", "<ol>", "<blockquote", "<hr>", "<table", "<pre"]) {
    assert.ok(!source.includes(tag), "the reader emits no " + tag + " — the renderer does");
  }
});

test("[#63] 2: what the reader paints IS the Docs tab's painting, byte for byte but for the ids it stamps", async () => {
  // The strongest form of "one renderer": take the reader's document off the screen, take the
  // positional ids back off it, and what is left must equal what the Docs tab would have painted
  // from the same file. A fork could not survive this comparison for one round.
  const raw = readFileSync(join(DOC_FIXTURE, "docs", "REFERENCE-RULES.md"), "utf8");
  const tabPainting = SHARED_RENDERER({ path: "docs/REFERENCE-RULES.md" }, raw);

  const harness = readerOnFixture();
  await harness.sandbox.openDocSideReader({ path: "docs/REFERENCE-RULES.md" });
  const article = /<article class="docs-body">([\s\S]*)<\/article>/.exec(harness.element("doc-side-reader-body").innerHTML);
  assert.ok(article, "the document is painted inside the shared reading container");
  const unstamped = article[1].replace(/ id="dsr-h-\d+"/g, "");
  assert.equal(unstamped, tabPainting, "the same painting, from the same renderer");
  // And the stamping is the ONLY difference: as many ids as the renderer emitted headings.
  const stamps = article[1].match(/ id="dsr-h-\d+"/g) || [];
  const painted = tabPainting.match(/<h[1-6] class="docs-body-h">/g) || [];
  assert.equal(stamps.length, painted.length, "one id per painted heading, and not one more");
  assert.equal(stamps.length, 9, "the fixture's nine headings, measured");
});

test("[#63] 2: with no renderer on the page the reader SAYS SO and grows no second one", async () => {
  const harness = loadReader({ noRenderer: true });
  harness.sandbox.setDocSideReaderSource({ docsIndex: DOCS_INDEX, base: "", indexPath: ".project/docs_index.json" });
  const opened = await harness.sandbox.openDocSideReader({ path: "docs/REFERENCE-RULES.md" });
  assert.equal(opened.view, "no_renderer");
  assert.equal(opened.ok, false);
  const html = harness.element("doc-side-reader-body").innerHTML;
  assert.ok(html.includes("docs/REFERENCE-RULES.md"), "it names the file it did not paint");
  assert.ok(html.includes("renderDocBodyContent"), "and names what was missing");
  assert.ok(/grows no second one/.test(html), "and says why it will not cover for it");
  assert.ok(!/The first rule/.test(html), "no document is painted by anything else here");
});

// 3 · THE SIDE PANEL IS GONE.

test("[#63] 3: the side panel is GONE from the page and the stylesheet, not left dormant beside the modal", () => {
  const html = readFileSync(INDEX_HTML, "utf8");
  // One reader in the page, and it is the dialog. No second aside, no second overlay, no leftover
  // control from the panel's own bar.
  assert.equal((html.match(/id="doc-side-reader"/g) || []).length, 1, "one reader element in the page");
  assert.ok(!/class="doc-side-reader"/.test(html), "the side panel's class is nowhere in the page");
  assert.ok(!/data-dsr-list/.test(html), "and the panel's «All documents» control is gone with it");
  assert.ok(!/role="complementary"/.test(html), "it is a dialog now, not a complementary panel");
  // Its stylesheet and its handler went with it: a dormant rule or a dead delegate is a second
  // answer waiting to be reached.
  assert.ok(!/\.doc-side-reader\b/.test(READER_CSS_SOURCE), "no rule for the side panel survives");
  assert.ok(!readFileSync(READER_JS, "utf8").includes("data-dsr-list"),
    "and no handler is left listening for a control that no longer exists");
});

// 4 · A DOCUMENT LIST THAT READS AS A HIERARCHY, SPLIT BY POSITION ONLY.

test("[#63 QA·1] 4: a row is a title and a version label — and the path is not under it", async () => {
  // «que solo tenga titulo y nota, que no venga la ruta abajo del nombre». Two parts on one line,
  // in the order the eye takes them: the name, then its tail at the right of the row.
  const harness = readerOnFixture();
  await harness.sandbox.openDocSideReader({});
  const html = harness.element("doc-side-reader-docs").innerHTML;
  assert.ok(/<span class="dsr-doc-title">[\s\S]*?<span class="dsr-doc-version">/.test(html),
    "the name and its tail, the tail second");
  // THE PATH IS NOT PRINTED. It is still on the row as the handle a click travels by, which is
  // data and not print — so this is asserted against the painted SPANS, not against the markup.
  assert.ok(!/dsr-doc-path/.test(html), "no path element under the name");
  assert.equal(ruleFontSize(".dsr-doc-path"), null, "and no rule left to paint one");
  const oneRow = /<button class="docs-nav-item dsr-doc-row[^"]*"[\s\S]*?<\/button>/.exec(html);
  assert.ok(oneRow, "a row is there to read");
  const spans = oneRow[0].match(/<span class="[^"]*"/g) || [];
  assert.deepEqual(spans,
    ['<span class="dsr-doc-title"', '<span class="dsr-doc-version"'],
    "a row paints exactly two things, in that order");
  assert.ok(/data-dsr-doc="docs\/REFERENCE-RULES\.md"/.test(html), "while the path still opens the document");

  // The version wears the SAME pill the header already wears for the same positional tail, and
  // the row's own layout is the nav item's — the name grows, the pill sits at the trailing edge.
  const version = /\.dsr-doc-version\s*\{([^}]*)\}/.exec(READER_CSS_RULES);
  const headerLabel = /\.dsr-ref-label\s*\{([^}]*)\}/.exec(READER_CSS_RULES);
  assert.equal(version[1].trim(), headerLabel[1].trim(), "one idiom for one thing: the header's own pill");
  assert.ok(/\.dsr-doc-version:empty\s*\{\s*display:\s*none/.test(READER_CSS_RULES),
    "and a title with no tail paints no pill at all");
  const navItem = [...CONSOLE_CSS_SOURCE.matchAll(/\n\.docs-nav-item\s*\{([^}]*)\}/g)].map((m) => m[1]).join(" ");
  assert.match(navItem, /justify-content:\s*space-between/, "«a la derecha de la fila», by the rule the row wears");
});

test("[#63 QA·1] 4: the path stays visible for the document that is OPEN", async () => {
  // It is what makes a citation checkable, so it is not deleted — it is moved to where one path
  // is worth reading instead of 325 of them: the header of the dialog, under the document's name.
  const harness = readerOnFixture();
  await harness.sandbox.openDocSideReader({ path: "docs/REFERENCE-RULES.md" });
  assert.equal(harness.element("doc-side-reader-path").textContent, "docs/REFERENCE-RULES.md",
    "the open document's path is on screen");
  assert.equal(harness.element("doc-side-reader-title").textContent, "Reference rules");
  // And with no document open, the header names the index the menu was listed from instead.
  await harness.sandbox.openDocSideReader({});
  assert.equal(harness.element("doc-side-reader-path").textContent, ".project/docs_index.json");
  // The element that carries it is in the page and it is not the row's.
  const html = readFileSync(INDEX_HTML, "utf8");
  assert.ok(/<span id="doc-side-reader-path" class="dsr-ref-path mono">/.test(html), "the header's own path line");
  assert.ok(ruleFontSize(".dsr-ref-path") !== null, "with a rule of its own that survived the repair");
});

test("[#63] 4: the split is POSITIONAL — the same one the header makes, and no word is ever read", async () => {
  const harness = readerOnFixture();
  const { dsrSplitTitle } = harness.sandbox;
  // The row splits with the header's own function. One mechanism, one behaviour, one thing to
  // judge — and it knows nothing about versions: it takes what follows the LAST separator.
  const versioned = dsrSplitTitle("Contrato — Reporte de cambios de un run · v1");
  assert.equal(versioned.name, "Contrato — Reporte de cambios de un run");
  assert.equal(versioned.label, "v1");
  const plain = dsrSplitTitle("Reference rules");
  assert.equal(plain.name, "Reference rules");
  assert.equal(plain.label, "", "no separator, no tail, no pill");
  // THE LEADING WORD IS NEVER SPLIT OFF, and that is the forbidden thing, not a missing one.
  // Deciding that "Contrato" is a genre means READING it, and the genre does not travel as data:
  // `ia_bucket` is derived by the projector from the document's own directory, so it says "docs"
  // for all three of these and distinguishes none of them. Verified here against the emitter and
  // against the fixture, so the day a genre IS published this pin is what fails.
  const projector = readFileSync(join(REPO_ROOT, "tools", "projector", "project.mjs"), "utf8");
  assert.ok(/ia_bucket: directory === "\." \? "root" : directory/.test(projector),
    "the grouping an index carries is the document's folder, not its genre");
  assert.deepEqual([...new Set(DOCS_INDEX.docs.map((doc) => doc.ia_bucket))], ["docs"],
    "one bucket for three different documents — it distinguishes nothing");
  // So the name keeps its leading word, whole, on screen.
  await harness.sandbox.openDocSideReader({});
  const html = harness.element("doc-side-reader-docs").innerHTML;
  assert.ok(/<span class="dsr-doc-title">A note with no headings at all<\/span>/.test(html),
    "the name is the title, whole, minus only its positional tail");
  assert.ok(/<span class="dsr-doc-version"><\/span>/.test(html),
    "and a title with no tail carries an empty pill that paints nothing");
});

// ---------------------------------------------------------------------------
// [#63 QA] THE OPERATOR'S TWO REPAIRS, 2026-09-02.
//
//   1 · «quedó muy chico el modal, que consuma casi toda la página para que aproveche bien el
//       espacio» — pinned in "[#63] 1: the reader is a centred dialog…" above, where the size
//       lives beside the idiom it departs from.
//   2 · «esa parte, texto, recuadros y luego texto, no se ve un menú limpio» — below.
//
// The second is a LOOK, and a look is the one thing a suite cannot judge. So what is pinned is
// not "it looks like the nav": it is that the row WEARS the nav's rule and this file adds no
// second style beside it. If the reader ever looked different from the tab again, it could only
// be because the tab moved — and then both moved together, which is the whole point.
// ---------------------------------------------------------------------------

test("[#63 QA] 2: the row WEARS the Docs tab's nav item — and this reader declares no card at all", async () => {
  // The measurement that opened the repair, taken again here so it cannot be re-introduced: the
  // tab's nav item draws no box. Transparent, borderless, and a 3px bar down the left that is
  // invisible until the item is active.
  const navItem = /\n\.docs-nav-item\s*\{([^}]*)\}/.exec(CONSOLE_CSS_SOURCE);
  assert.ok(navItem, "the tab's nav item rule is the reference the operator named");
  assert.match(navItem[1], /border:\s*0/, "no border");
  assert.match(navItem[1], /border-left:\s*3px solid transparent/, "a bar that is there but unseen");
  assert.match(navItem[1], /background:\s*transparent/, "and no fill");
  assert.ok(!/border-radius/.test(navItem[1]), "and no corner — it is not a card");
  const active = /\.docs-nav-item\.active\s*\{([^}]*)\}/.exec(CONSOLE_CSS_SOURCE);
  assert.match(active[1], /border-left-color:\s*var\(--accent\)/, "the bar appears when the item is active");
  assert.match(active[1], /background:\s*var\(--accent-bg\)/, "with the tint that goes with it");

  // The row wears that rule. Worn in the MARKUP, so the look arrives from the one place that owns
  // it and there is no copy here to drift.
  const harness = readerOnFixture();
  await harness.sandbox.openDocSideReader({});
  const html = harness.element("doc-side-reader-docs").innerHTML;
  const rows = html.match(/<button class="[^"]*" type="button" data-dsr-doc="/g) || [];
  assert.equal(rows.length, DOCS_INDEX.docs.length, "every document is a row");
  rows.forEach((row) => {
    assert.match(row, /class="docs-nav-item dsr-doc-row/, "and every row wears the tab's nav item");
  });

  // AND THE CARD IS GONE, not restyled. [#63 QA·1] Since the path came out from under the name,
  // the row is a name and a label on ONE line — which is exactly the shape the nav item already
  // lays out — so the reader's rule for the row now declares NOTHING AT ALL and has been deleted.
  // The class stays in the markup as the row's name; every pixel of it is the tab's.
  assert.ok(!/\.dsr-doc-row/.test(READER_CSS_RULES),
    "the row declares nothing of its own — not a box, not a layout, not a hover");
});

test("[#63 QA] 2: the open document is the active item, exactly one of them, and the menu answers at once", async () => {
  const harness = readerOnFixture();
  const activeRows = () => {
    const html = harness.element("doc-side-reader-docs").innerHTML;
    return [...html.matchAll(/<button class="docs-nav-item dsr-doc-row active" type="button" data-dsr-doc="([^"]+)"/g)]
      .map((m) => m[1]);
  };

  // Nothing open: nothing marked. An "active" item with no document behind it would be a lie.
  await harness.sandbox.openDocSideReader({});
  assert.deepEqual(activeRows(), [], "the list alone marks nothing");

  await harness.sandbox.openDocSideReader({ path: "docs/REFERENCE-RULES.md" });
  assert.deepEqual(activeRows(), ["docs/REFERENCE-RULES.md"], "the open document, and only it");

  await harness.sandbox.openDocSideReader({ path: "docs/FLAT-NOTE.md" });
  assert.deepEqual(activeRows(), ["docs/FLAT-NOTE.md"], "the mark MOVES — it never accumulates");

  // A document that cannot be read is still the one the operator asked for, so the menu says so
  // rather than leaving the mark behind on the last one that worked.
  await harness.sandbox.openDocSideReader({ path: "docs/GONE-FROM-DISK.md" });
  assert.deepEqual(activeRows(), ["docs/GONE-FROM-DISK.md"], "even when the document cannot be read");

  // A path nobody indexed marks nothing, because no row carries it.
  await harness.sandbox.openDocSideReader({ path: "docs/NOT-INDEXED.md" });
  assert.deepEqual(activeRows(), [], "and a path outside the index marks no row at all");
});

test("[#63 QA] 2: the two prose lines are demoted, not deleted — a menu with a quiet footnote", async () => {
  const harness = readerOnFixture();
  await harness.sandbox.openDocSideReader({});
  const html = harness.element("doc-side-reader-docs").innerHTML;

  // BOTH SURVIVE, with their words. The count is the honest half of a list, and the provenance is
  // the promise that goes with it: deleting either would buy a clean menu with a lie.
  assert.ok(/3 documents indexed by this project/.test(html), "the count still says how many");
  assert.ok(/\.project\/docs_index\.json/.test(html), "and the footnote still names the index file");
  assert.ok(/nothing outside it can be opened here/.test(html), "with the promise that goes with it");

  // DEMOTED: both read smaller than the name they sit around, and the footnote is the quietest
  // thing in the column — under a hairline, at the foot of the menu.
  const title = ruleFontSize(".dsr-doc-title");
  const head = ruleFontSize(".dsr-doc-list-head");
  const source = ruleFontSize(".dsr-doc-list-source");
  assert.ok(head < title, `the count (${head}px) must not compete with a name (${title}px)`);
  assert.ok(source < title, `nor the footnote (${source}px)`);
  assert.ok(source <= head, "and the footnote is the quietest of the two");
  const footnote = /\.dsr-doc-list-source\s*\{([^}]*)\}/.exec(READER_CSS_RULES);
  assert.match(footnote[1], /border-top:\s*1px solid var\(--border-subtle\)/, "separated by a hairline");
  assert.ok(html.indexOf("dsr-doc-list-source") > html.lastIndexOf("data-dsr-doc="),
    "and it sits AFTER the last row — a footnote, not a second header");

  // The column reads on ONE left edge: the rows take the tab's 20px inset from the rule they
  // wear, and the two prose lines take the same one. [#63 QA·2] The section rail took it too,
  // until the operator removed the rail.
  assert.match(/\.dsr-doc-list-head\s*\{([^}]*)\}/.exec(READER_CSS_RULES)[1], /padding:\s*0 20px/);
  assert.match(footnote[1], /margin:\s*14px 20px 0/);
  // And the list itself adds no inset of its own, so the active bar sits flush at the column edge.
  assert.match(/\.dsr-doc-list\s*\{([^}]*)\}/.exec(READER_CSS_RULES)[1], /padding:\s*0;/);
});

test("[#63 QA] 3: what the operator approved in the name survives every restyle since", async () => {
  // Two repairs have now passed over this row — the card came off, then the path came out — and
  // what he approved about the NAME survives both: it is bigger and heavier than the chrome
  // around it, and the version still sits apart at the right rather than trailing the name.
  const harness = readerOnFixture();
  await harness.sandbox.openDocSideReader({});
  const html = harness.element("doc-side-reader-docs").innerHTML;
  assert.ok(/<span class="dsr-doc-title">[\s\S]*?<span class="dsr-doc-version">/.test(html),
    "name and tail on one line, the tail second");
  const title = /\.dsr-doc-title\s*\{([^}]*)\}/.exec(READER_CSS_RULES);
  assert.match(title[1], /font-size:\s*14px/, "the name keeps its size");
  assert.match(title[1], /font-weight:\s*650/, "and its weight");
  // It reads larger than everything else the column prints — the count above and the footnote below.
  assert.ok(ruleFontSize(".dsr-doc-title") > ruleFontSize(".dsr-doc-list-head"), "larger than the count");
  assert.ok(ruleFontSize(".dsr-doc-title") > ruleFontSize(".dsr-doc-list-source"), "and than the footnote");
  // The one thing the name gave up is its COLOUR, and giving it up is what lets the row read like
  // the tab's: the name now takes the nav item's tone, so it turns with hover and with active.
  assert.ok(!/color:/.test(title[1]),
    "the name takes no colour of its own — it inherits the nav item's, as the tab's labels do");
});

// ---------------------------------------------------------------------------
// [#63 QA·3] THE MEASURE — the length of a line of running text.
//
// The operator said the content was still tiring to read, and the cabin proposed a cause. It was
// MEASURED before it was believed, in the browser, on the reader's own column at a 1920 viewport:
//
//   text block 1316px · 18px/30.6px · median 137 CHARACTERS PER LINE (P25 123 · P75 147),
//   over the 28 paragraphs of a real document that wrap three lines or more.
//
// The comfortable band for continuous prose is 45–75. The cause was real, and it was the length:
// the leading is 1.7 and generous, and the size is 18px and not small. So the length is capped —
// and nothing else is, because nothing else was wrong.
//
// A stylesheet cannot be asked whether text READS well; that is the operator's verdict. What is
// pinned here is that the cap exists, that it is expressed in the unit of the problem, that it
// reaches only the prose, and that it belongs to this reader alone.
// ---------------------------------------------------------------------------

test("[#63 QA·3] the reading measure is capped, in the unit the problem is stated in", () => {
  const rule = /\.dsr-measure p,\s*\.dsr-measure li,\s*\.dsr-measure blockquote\s*\{([^}]*)\}/.exec(READER_CSS_RULES);
  assert.ok(rule, "one rule caps the running text of this reader's column");
  const cap = /max-width:\s*(\d+)ch/.exec(rule[1]);
  assert.ok(cap, "and it caps the WIDTH, in `ch` — the width of a character, so it tracks the font");
  assert.deepEqual(rule[1].match(/[a-z-]+:/g), ["max-width:"], "it does nothing else at all");
  // 66ch, and the number was CHOSEN BY MEASURING and not by arithmetic. Converting a cap into
  // characters by hand gets it wrong: 1ch is 9.70px here while the average character of this
  // prose is 7.92px, and that ratio predicted 76 characters for a cap that renders 64. Five caps
  // were applied to a real document instead and read back, at a 1920 viewport:
  //
  //   uncapped 1316px → median 137 CPL (P75 147)      70ch 679px → median 72 (P75 77)
  //   62ch      602px → median  64     (P75  68)      74ch 718px → median 77 (P75 82)
  //   66ch      640px → median  69     (P75  73)  ← chosen
  //
  // 66ch is the widest cap whose UPPER QUARTILE is still inside the comfortable 45–75 band, not
  // just its median — a quarter of the operator's reading is what the median would have hidden.
  assert.equal(Number(cap[1]), 66, "the chosen cap, measured and not derived");
});

test("[#63 QA·3] the cap reaches the PROSE and leaves the wide blocks the whole column", () => {
  // Tables and code were measured too, and neither reads in lines: the tables stretch to whatever
  // they are given, and the widest code block in that document is 9317px and already scrolls
  // inside its own box. Capping them would buy nothing and cost horizontal scrolling on content
  // that fits today, so the wide blocks span and the prose stays short.
  const capped = READER_CSS_RULES.match(/\.dsr-measure\s+[a-z]+/g) || [];
  assert.deepEqual(capped, [".dsr-measure p", ".dsr-measure li", ".dsr-measure blockquote"],
    "prose only — no table, no pre, no figure");
  // And the element it hangs on is in the page, beside the shared class it does not touch.
  const html = readFileSync(INDEX_HTML, "utf8");
  assert.ok(/id="doc-side-reader-body" class="docs-reader-inner dsr-measure"/.test(html),
    "the reading container wears the shared class AND this reader's own measure class");
});

test("[#63 QA·3] the cap is this reader's — the Docs tab's typography is untouched", () => {
  // The stop condition of this repair: if capping the measure had needed `.docs-body` or any other
  // shared rule, it stops. It did not — `.dsr-measure` exists only in this dialog's markup, so the
  // constraint cannot reach the tab, and the shared sizes are still exactly what they were.
  assert.ok(!/\.docs-[a-z-]+/.test(READER_CSS_RULES), "no shared selector is declared here");
  assert.equal(consoleRuleFontSize("\\.docs-reader p,\\s*\\.docs-reader li"), 18, "the tab's reading size, unchanged");
  assert.deepEqual(["h2", "h3", "h4"].map((t) => consoleRuleFontSize("\\.docs-body " + t + "\\.docs-body-h")),
    [26, 22, 20], "and its heading scale, unchanged");
  // The tab's own reading pane still fills its width — the operator's preference there, which this
  // cap does not overrule because it cannot reach it.
  const inner = /\.docs-reader-inner\s*\{([^}]*)\}/.exec(CONSOLE_CSS_SOURCE);
  assert.match(inner[1], /margin:\s*0;/, "the tab's reading pane keeps its own margins");
  assert.ok(!/max-width/.test(inner[1]), "and takes no measure cap from anywhere");
});
