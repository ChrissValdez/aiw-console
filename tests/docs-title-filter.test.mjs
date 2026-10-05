// RUN-CONSOLE-DOCS-TITLE-SEARCH-001 (#65) — ONE TITLE FILTER, OVER BOTH LISTS OF DOCUMENTS.
//
// Origin, in the operator's words during the visual QA of #64 (2026-10-04): «son demasiados
// archivos indexados … un boton para buscar titulos de archivos». Two of the four QA steps could
// not be executed because he could not find the documents in the list.
//
// What is pinned here, in the order the ticket states it:
//
//   1. the MATCH — against the title the row prints, case- and accent-insensitive, every word of
//      the query somewhere in the title, and never against the path;
//   2. the EMPTY FILTER — both lists paint exactly what they painted before this run. Not
//      "equivalent": byte for byte against a golden captured FROM THE UNCHANGED CODE on
//      2026-10-04 (tests/fixtures/docs-title-filter/), the added field taken out and nothing else.
//      Refreshing those files is a deliberate act: it means the lists changed on purpose;
//   3. the Docs TREE while filtering — only the folders that hold a match, all of them open, the
//      folders themselves unchanged, and on clearing, the open/closed state from before;
//   4. NO MATCH says so in one line;
//   5. the MODAL list — the same filter, the same field, the same lines, wired through a real
//      bubbling input event;
//   6. ONE filter, built once — the reader calls the console's, and grows none of its own;
//   7. domain-blindness — the filter's own code knows no word of any project.
//
// Harnesses: the console's own (tests/helpers/console-dom.mjs) for the Docs tab, and a recording
// stub with a parent chain for the modal, the same idiom as tests/doc-side-reader.test.mjs. Layout,
// focus, the caret and real typing stay with the operator's visual QA.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { createConsoleHarness } from "./helpers/console-dom.mjs";
import { AIW_CONSOLE_FIXTURE, CANTU_FIXTURE } from "./helpers/neighbours.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const ASSETS = join(REPO_ROOT, "project-console", "assets");
const CONSOLE_JS = join(ASSETS, "project-console.js");
const READER_JS = join(ASSETS, "doc-side-reader.js");
const INDEX_HTML = join(REPO_ROOT, "project-console", "index.html");
const GOLDEN = join(HERE, "fixtures", "docs-title-filter");
const REPORT_FIXTURES = join(HERE, "fixtures", "reports");

const ROOTS = new Map([
  ["titulos", join(HERE, "fixtures", "titulos")],
  ["mixto", join(HERE, "fixtures", "rutas", "mixto")],
  ["aiw-console", AIW_CONSOLE_FIXTURE],
  ["cantu-studio", CANTU_FIXTURE]
]);
const INDEX_PATH = ".project/docs_index.json";

// The golden files are text; a checkout under `text=auto` may hand them back with CRLF. The
// comparison is about what the code paints, so line endings are normalised on the golden side only.
const golden = (name) => readFileSync(join(GOLDEN, name), "utf8").replace(/\r\n/g, "\n");
const docsIndexOf = (key) => JSON.parse(readFileSync(join(ROOTS.get(key), INDEX_PATH), "utf8"));

async function docsTab(key) {
  const harness = createConsoleHarness({ rendererPath: CONSOLE_JS, rootsByKey: ROOTS });
  harness.sandbox.resetProjectScopedState();
  harness.sandbox.setActiveProjectBase(`/projects/${key}/`);
  await harness.sandbox.loadActiveProject();
  await harness.flush(8);
  return harness;
}

// The tree region as the first paint wrote it into the nav, and as a filter repaint writes it
// into its own container. In a browser the second IS inside the first; the stub keeps ids flat.
const TREE_OPEN = '<div id="docs-nav-tree" class="docs-nav-tree">';
function initialTreeRegion(harness) {
  const html = harness.element("docs-nav-list").innerHTML;
  const start = html.indexOf(TREE_OPEN);
  assert.ok(start >= 0, "the nav paints its tree container");
  return html.slice(start + TREE_OPEN.length, html.lastIndexOf("</div>"));
}
const treeRepaint = (harness) => harness.element("docs-nav-tree").innerHTML;

// Groups and titles read back out of PAINTED html, the way docs-path-grouping reads them.
function paintedTree(html) {
  const groups = [];
  const stack = [];
  const token = /<details([^>]*)--docs-nav-depth:(\d+)"([^>]*)>[\s\S]*?docs-nav-group-label">([^<]*)<[\s\S]*?docs-nav-group-count">\((\d+)\)|docs-nav-item-label">([^<]*)</g;
  let current = null;
  for (const match of html.matchAll(token)) {
    if (match[4] !== undefined) {
      stack.length = Number(match[2]);
      stack.push(match[4]);
      current = { path: stack.join(" / "), count: Number(match[5]), open: /\bopen\b/.test(match[3]), titles: [] };
      groups.push(current);
    } else if (current) {
      current.titles.push(match[6]);
    }
  }
  return groups;
}
const titlesOf = (html) => paintedTree(html).flatMap((group) => group.titles);

// ---------------------------------------------------------------------------
// The console's shared filter, compiled from the real file in a context of its own — the same
// way tests/doc-side-reader.test.mjs takes the console's one renderer.
// ---------------------------------------------------------------------------

const SHARED_NAMES = [
  "docTitleFilterKey",
  "docTitleMatchesFilter",
  "docTitleFilterIsActive",
  "docTitleFilterFieldHtml",
  "docTitleFilterStatusHtml",
  "docTitleFilterHandleEscape"
];

function consoleContext() {
  const context = {
    console,
    document: { getElementById: () => null, querySelector: () => null, querySelectorAll: () => [], addEventListener() {} },
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
  return context;
}
const CONSOLE = consoleContext();
function sharedFilter() {
  const missing = SHARED_NAMES.filter((name) => typeof CONSOLE[name] !== "function");
  assert.deepEqual(missing, [], "the console declares the shared title filter as globals");
  return Object.fromEntries(SHARED_NAMES.map((name) => [name, CONSOLE[name]]));
}

// ---------------------------------------------------------------------------
// 1 — the match
// ---------------------------------------------------------------------------

test("the match ignores case and accents, both ways: «código» finds «CODIGO» and «codigo» finds «Código»", () => {
  const { docTitleMatchesFilter: matches } = sharedFilter();
  assert.equal(matches("NOTAS DEL CODIGO FUENTE", "código"), true);
  assert.equal(matches("Código de conducta · v2", "CODIGO"), true);
  assert.equal(matches("Guía de instalación", "GUIA INSTALACION"), true);
  assert.equal(matches("Año nuevo", "ano"), true, "ñ folds to n, like every other accent");
  assert.equal(matches("Reglas del índice", "indíce"), true, "an accent the title does not carry is ignored too");
  assert.equal(matches("Leeme", "código"), false);
});

test("every word of the query must be in the title, in any order; whitespace is not a word", () => {
  const { docTitleMatchesFilter: matches, docTitleFilterIsActive: active } = sharedFilter();
  assert.equal(matches("Guía de instalación", "instalación guía"), true, "order does not matter");
  assert.equal(matches("Guía de instalación", "guía conducta"), false, "one absent word and it does not match");
  assert.equal(matches("Hallazgos del operador — semilla del `#67`", "#67"), true, "punctuation is matched as written");
  for (const empty of ["", "   ", "\t \n", null, undefined]) {
    assert.equal(active(empty), false, `${JSON.stringify(empty)} is an empty filter`);
    assert.equal(matches("Anything at all", empty), true, "an empty filter matches everything");
  }
  assert.equal(active(" a "), true);
});

// ---------------------------------------------------------------------------
// 2 — the empty filter paints exactly what was painted before this run
// ---------------------------------------------------------------------------

for (const key of ROOTS.keys()) {
  test(`Docs tab, ${key}: with the filter empty the nav is byte-identical to the pre-#65 paint, the field aside`, async () => {
    const { docTitleFilterFieldHtml: field } = sharedFilter();
    const harness = await docsTab(key);
    const html = harness.element("docs-nav-list").innerHTML;
    const added = "\n      " + field("");
    assert.ok(html.includes(added), "the field is painted, once, on its own line in the controls");
    assert.equal(html.split(added).length, 2, "and only once");
    assert.equal(html.replace(added, ""), golden(`docs-nav.${key}.html`),
      "everything that is not the field is what the unchanged code painted");
  });
}

for (const key of ROOTS.keys()) {
  test(`modal list, ${key}: with the filter empty the list is byte-identical to the pre-#65 paint`, () => {
    const reader = readerContext({ withFilter: true });
    const model = reader.dsrDocsModel(docsIndexOf(key));
    const active = model.docs[1] ? model.docs[1].path : "";
    for (const [tag, activePath] of [["none", ""], ["active", active]]) {
      for (const query of [undefined, "", "   "]) {
        assert.equal(reader.dsrDocListHtml(model, { indexPath: INDEX_PATH, activePath, query }),
          golden(`reader-list.${key}.${tag}.html`), `query ${JSON.stringify(query)}, ${tag}`);
      }
    }
  });
}

test("Docs tab: typing and then clearing gives back the very tree that was there before typing", async () => {
  const harness = await docsTab("aiw-console");
  const before = initialTreeRegion(harness);
  harness.sandbox.setDocsTitleFilter("run");
  assert.notEqual(treeRepaint(harness), before, "the filter repainted the tree");
  harness.sandbox.setDocsTitleFilter("");
  assert.equal(treeRepaint(harness), before, "cleared, the tree is the unfiltered one again, byte for byte");
  harness.sandbox.setDocsTitleFilter("   ");
  assert.equal(treeRepaint(harness), before, "whitespace alone is an empty filter");
});

test("Docs tab: clearing restores the open/closed state the operator left BEFORE typing", () => {
  // The positional snapshot is read off the live <details> in a browser; here it is handed to the
  // function that paints with it, which is the part a stub can judge.
  const tree = CONSOLE.buildDocsNavTree(docsIndexOf("titulos").docs
    .map((doc, index) => ({ doc, index }))
    .filter(({ doc }) => !/(^|\/)archive\//.test(doc.path)));
  const plain = CONSOLE.docsNavTreeHtml(tree, {});
  const groups = paintedTree(plain);
  assert.ok(groups.length >= 4 && groups.every((group) => group.open), "today every folder opens");
  const flags = groups.map((group, position) => position !== 1); // the second folder was closed
  const restored = paintedTree(CONSOLE.docsNavTreeHtml(tree, { openFlags: flags }));
  assert.deepEqual(restored.map((group) => group.open), flags, "each folder comes back as it was left");
  assert.deepEqual(restored.map((group) => group.path), groups.map((group) => group.path), "and nothing else moves");
  assert.equal(CONSOLE.docsNavTreeHtml(tree, { openFlags: [] }), plain, "no snapshot is today's tree");
});

// ---------------------------------------------------------------------------
// 3 — the Docs tree while filtering
// ---------------------------------------------------------------------------

test("Docs tab: the field sits above the tree, inside the nav's controls", async () => {
  const harness = await docsTab("titulos");
  const html = harness.element("docs-nav-list").innerHTML;
  const field = html.indexOf("data-doc-title-filter");
  assert.ok(field > html.indexOf('class="docs-nav-controls"'), "inside the controls");
  assert.ok(field < html.indexOf(TREE_OPEN), "above the tree");
  assert.ok(/<input type="search"/.test(html), "a search field");
});

test("Docs tab: filtering shows only the folders that hold a match, open, with the match count", async () => {
  const harness = await docsTab("titulos");
  harness.sandbox.setDocsTitleFilter("código");
  const html = treeRepaint(harness);
  const groups = paintedTree(html);
  assert.deepEqual(groups.map((group) => `${group.path} (${group.count})`), ["Guia (2)", "Guia / Registros (2)"]);
  assert.ok(groups.every((group) => group.open), "every folder shown is open");
  assert.deepEqual(titlesOf(html), ["NOTAS DEL CODIGO FUENTE", "Código de conducta · v2"],
    "the archived «Retirado del código» stays out of Docs, filter or not");
  assert.ok(html.includes("2 of 7"), "and the list says how many of how many");
});

test("Docs tab: a match keeps its folder — the grouping is measured over the whole list, not over the matches", async () => {
  // A lone match deep in a folder must not be promoted to Root just because it alone is left.
  const harness = await docsTab("titulos");
  harness.sandbox.setDocsTitleFilter("reglas");
  assert.deepEqual(paintedTree(treeRepaint(harness)).map((group) => group.path), ["Notas", "Notas / Indice"]);
});

test("Docs tab: filtering preserves the tree order — the matches are a subsequence of today's rows", async () => {
  const harness = await docsTab("aiw-console");
  const all = titlesOf(initialTreeRegion(harness));
  harness.sandbox.setDocsTitleFilter("de");
  const shown = titlesOf(treeRepaint(harness));
  assert.ok(shown.length > 1 && shown.length < all.length, "a filter that keeps some and drops some");
  let cursor = 0;
  for (const title of shown) {
    cursor = all.indexOf(title, cursor);
    assert.ok(cursor >= 0, `«${title}» appears in today's order`);
    cursor += 1;
  }
});

test("Docs tab: the path is not matched — a word that only the path carries finds nothing", async () => {
  const harness = await docsTab("titulos");
  harness.sandbox.setDocsTitleFilter("registros");
  // «Registros» is a FOLDER here and in a file name, never in a title.
  assert.deepEqual(titlesOf(treeRepaint(harness)), []);
});

// ---------------------------------------------------------------------------
// 4 — no match says so
// ---------------------------------------------------------------------------

test("Docs tab: a filter with no match says so in one line, naming what was typed", async () => {
  const harness = await docsTab("titulos");
  harness.sandbox.setDocsTitleFilter("zzz <b>");
  const html = treeRepaint(harness);
  assert.equal(paintedTree(html).length, 0, "no folder");
  assert.ok(/No document title matches/.test(html), "the line");
  assert.ok(html.includes("zzz &lt;b&gt;"), "naming the query, escaped");
  assert.ok(!html.includes("<b>"), "never as markup");
});

// ---------------------------------------------------------------------------
// 5 — the modal list
// ---------------------------------------------------------------------------

// A recording stub with a parent chain, so an input event can BUBBLE from the field to the panel's
// delegate exactly as it does on the page.
class Node {
  constructor(id) {
    this.id = id;
    this.attributes = new Map();
    this.classList = { set: new Set(), add(n) { this.set.add(n); }, remove(n) { this.set.delete(n); }, toggle(n, f) { const on = f === undefined ? !this.set.has(n) : !!f; if (on) this.set.add(n); else this.set.delete(n); return on; }, contains(n) { return this.set.has(n); } };
    this.innerHTML = "";
    this.textContent = "";
    this.scrollTop = 0;
    this.listeners = [];
    this.parent = null;
    this.value = "";
  }
  setAttribute(name, value) { this.attributes.set(name, String(value)); }
  getAttribute(name) { return this.attributes.has(name) ? this.attributes.get(name) : null; }
  addEventListener(type, handler) { this.listeners.push({ type, handler }); }
  removeEventListener() {}
  querySelector() { return null; }
  querySelectorAll() { return []; }
  closest(selector) {
    const attr = /^\[([^\]=]+)\]$/.exec(String(selector));
    if (!attr) return null;
    for (let node = this; node; node = node.parent) if (node.attributes.has(attr[1])) return node;
    return null;
  }
}

const READER_IDS = ["doc-side-reader", "doc-side-reader-overlay", "doc-side-reader-title", "doc-side-reader-label",
  "doc-side-reader-path", "doc-side-reader-index", "doc-side-reader-filter", "doc-side-reader-docs",
  "doc-side-reader-scroll", "doc-side-reader-body"];

function readerContext({ withFilter }) {
  const nodes = new Map();
  const byId = (id) => { if (!nodes.has(id)) nodes.set(id, new Node(id)); return nodes.get(id); };
  READER_IDS.forEach(byId);
  const documentListeners = [];
  const context = {
    console,
    document: { getElementById: byId, querySelector: () => null, querySelectorAll: () => [], addEventListener(type, handler) { documentListeners.push({ type, handler }); } },
    fetch: async () => ({ ok: true, status: 200, statusText: "OK", text: async () => "# A document\n\nIts text.\n" }),
    setTimeout,
    clearTimeout
  };
  context.renderDocBodyContent = CONSOLE.renderDocBodyContent;
  if (withFilter) SHARED_NAMES.forEach((name) => { context[name] = CONSOLE[name]; });
  context.window = context;
  vm.createContext(context);
  vm.runInContext(readFileSync(READER_JS, "utf8"), context, { filename: READER_JS });
  context.node = byId;
  context.documentListeners = documentListeners;
  return context;
}

function dispatch(reader, type, target, extra) {
  const event = { type, target, defaultPrevented: false, propagationStopped: false,
    preventDefault() { this.defaultPrevented = true; }, stopPropagation() { this.propagationStopped = true; }, ...extra };
  for (let node = target; node && !event.propagationStopped; node = node.parent) {
    node.listeners.filter((l) => l.type === type).forEach((l) => l.handler(event));
  }
  if (!event.propagationStopped) reader.documentListeners.filter((l) => l.type === type).forEach((l) => l.handler(event));
  return event;
}

// The field the reader painted into its slot, as a node of the page: it carries the attribute the
// delegate looks for and it sits inside the panel.
function fieldOf(reader) {
  const slot = reader.node("doc-side-reader-filter");
  assert.ok(/data-doc-title-filter/.test(slot.innerHTML), "the reader painted the field into its slot");
  const field = reader.node("(field)");
  field.attributes.set("data-doc-title-filter", "");
  field.parent = reader.node("doc-side-reader");
  return field;
}
const listTitles = (reader) => [...reader.node("doc-side-reader-docs").innerHTML.matchAll(/data-dsr-doc="([^"]*)"/g)].map((m) => m[1]);

test("modal: the field is painted above the list when the reader opens, and only there", async () => {
  const reader = readerContext({ withFilter: true });
  reader.setDocSideReaderSource({ docsIndex: docsIndexOf("titulos"), base: "", indexPath: INDEX_PATH });
  await reader.openDocSideReader({});
  const slot = reader.node("doc-side-reader-filter").innerHTML;
  assert.equal(slot, reader.docTitleFilterFieldHtml(""), "the console's one field, empty");
  assert.ok(!reader.node("doc-side-reader-docs").innerHTML.includes("data-doc-title-filter"),
    "the field is not inside the list, so repainting the list never replaces it under the operator's typing");
  const html = readFileSync(INDEX_HTML, "utf8");
  const index = /<div id="doc-side-reader-index"[\s\S]*?<div id="doc-side-reader-docs">/.exec(html);
  assert.ok(index && index[0].includes('id="doc-side-reader-filter"'), "the slot sits above the list in the page");
});

test("modal: typing in the field filters the list through a real bubbling input event", async () => {
  const reader = readerContext({ withFilter: true });
  reader.setDocSideReaderSource({ docsIndex: docsIndexOf("titulos"), base: "", indexPath: INDEX_PATH });
  await reader.openDocSideReader({});
  assert.equal(listTitles(reader).length, 8);
  const field = fieldOf(reader);
  field.value = "CÓDIGO";
  dispatch(reader, "input", field);
  assert.deepEqual(listTitles(reader), ["guia/registros/notas-fuente.md", "guia/registros/conducta.md", "notas/archive/retirado.md"],
    "the modal lists what its index lists, archived included, and filters it by the same rule");
  assert.ok(reader.node("doc-side-reader-docs").innerHTML.includes("3 of 8"), "how many of how many");
  field.value = "";
  dispatch(reader, "input", field);
  assert.equal(reader.node("doc-side-reader-docs").innerHTML,
    golden("reader-list.titulos.none.html"), "cleared, the list is today's list again");
});

test("modal: a filter with no match says so in one line", async () => {
  const reader = readerContext({ withFilter: true });
  reader.setDocSideReaderSource({ docsIndex: docsIndexOf("titulos"), base: "", indexPath: INDEX_PATH });
  await reader.openDocSideReader({});
  const field = fieldOf(reader);
  field.value = "registros";
  dispatch(reader, "input", field);
  const html = reader.node("doc-side-reader-docs").innerHTML;
  assert.deepEqual(listTitles(reader), [], "the path is not matched here either");
  assert.ok(/No document title matches/.test(html) && html.includes("registros"), "the line, naming the query");
});

test("modal: opening a document from the filtered list keeps the filter; closing the reader clears it", async () => {
  const reader = readerContext({ withFilter: true });
  reader.setDocSideReaderSource({ docsIndex: docsIndexOf("titulos"), base: "", indexPath: INDEX_PATH });
  await reader.openDocSideReader({});
  const field = fieldOf(reader);
  field.value = "codigo";
  dispatch(reader, "input", field);
  await reader.openDocSideReader({ path: "guia/registros/conducta.md" });
  assert.equal(listTitles(reader).length, 3, "the list stays filtered while a result is read");
  assert.ok(/docs-nav-item dsr-doc-row active" type="button" data-dsr-doc="guia\/registros\/conducta.md"/.test(reader.node("doc-side-reader-docs").innerHTML),
    "and the open document is marked in it");
  assert.equal(reader.node("doc-side-reader-filter").innerHTML, reader.docTitleFilterFieldHtml(""),
    "the field is never repainted while the reader is open, so what was typed stays in it");
  reader.closeDocSideReader();
  await reader.openDocSideReader({});
  assert.equal(listTitles(reader).length, 8, "a reader opened again starts from the whole list");
  assert.equal(reader.node("doc-side-reader-filter").innerHTML, reader.docTitleFilterFieldHtml(""));
});

test("Escape on a field with text clears the filter and goes no further; on an empty field it is the page's", async () => {
  const reader = readerContext({ withFilter: true });
  reader.setDocSideReaderSource({ docsIndex: docsIndexOf("titulos"), base: "", indexPath: INDEX_PATH });
  await reader.openDocSideReader({});
  const field = fieldOf(reader);
  field.value = "codigo";
  dispatch(reader, "input", field);
  const consumed = dispatch(reader, "keydown", field, { key: "Escape" });
  assert.equal(consumed.propagationStopped, true, "the page's Escape (which closes the reader) never sees it");
  assert.equal(field.value, "", "the field is emptied");
  assert.equal(listTitles(reader).length, 8, "and the list is whole again");
  assert.equal(reader.docSideReaderIsOpen(), true, "the reader stays open");
  const passed = dispatch(reader, "keydown", field, { key: "Escape" });
  assert.equal(passed.propagationStopped, false, "an empty field lets Escape through, to close the reader as always");
  // The same rule for the Docs tab's field: one function decides it for both.
  const { docTitleFilterHandleEscape: handle } = sharedFilter();
  const typed = { key: "Escape", target: { value: "x" }, preventDefault() {}, stopPropagation() { this.stopped = true; } };
  assert.equal(handle(typed), true);
  assert.equal(typed.target.value, "");
  assert.equal(typed.stopped, true);
  assert.equal(handle({ key: "Escape", target: { value: "" }, preventDefault() {}, stopPropagation() {} }), false);
  assert.equal(handle({ key: "a", target: { value: "x" }, preventDefault() {}, stopPropagation() {} }), false);
});

// ---------------------------------------------------------------------------
// 6 — one filter, built once
// ---------------------------------------------------------------------------

test("the two lists agree: over the documents both show, the same query keeps the same ones", async () => {
  for (const key of ["titulos", "aiw-console", "cantu-studio"]) {
    const harness = await docsTab(key);
    const reader = readerContext({ withFilter: true });
    const model = reader.dsrDocsModel(docsIndexOf(key));
    const docsAll = new Set(titlesOf(initialTreeRegion(harness)));
    for (const query of ["código", "readme", "a e", "run"]) {
      harness.sandbox.setDocsTitleFilter(query);
      const inDocs = new Set(titlesOf(treeRepaint(harness)));
      const html = reader.dsrDocListHtml(model, { indexPath: INDEX_PATH, activePath: "", query });
      const inModal = new Set(model.docs.filter((doc) => html.includes(`data-dsr-doc="${reader.dsrEsc(doc.path)}"`))
        .map((doc) => reader.dsrEsc(doc.title)));
      for (const title of docsAll) {
        assert.equal(inDocs.has(title), inModal.has(title), `${key}, «${query}»: «${title}» is kept by one list and not the other`);
      }
    }
  }
});

test("the reader grows no filter of its own: without the console's, it offers no field and lists everything", async () => {
  const reader = readerContext({ withFilter: false });
  reader.setDocSideReaderSource({ docsIndex: docsIndexOf("titulos"), base: "", indexPath: INDEX_PATH });
  await reader.openDocSideReader({});
  assert.equal(reader.node("doc-side-reader-filter").innerHTML, "", "no field");
  const model = reader.dsrDocsModel(docsIndexOf("titulos"));
  assert.equal(reader.dsrDocListHtml(model, { indexPath: INDEX_PATH, activePath: "", query: "codigo" }),
    golden("reader-list.titulos.none.html"), "a query it cannot apply leaves the list whole");
  const source = readFileSync(READER_JS, "utf8");
  assert.ok(!/normalize\(\s*["']NFD/.test(source), "no folding of its own");
  assert.ok(!/<input/i.test(source), "no field markup of its own");
});

test("an index the reader cannot read, or that lists nothing, offers no field", async () => {
  for (const docsIndex of [null, { docs: [] }]) {
    const reader = readerContext({ withFilter: true });
    reader.setDocSideReaderSource({ docsIndex, base: "", indexPath: INDEX_PATH });
    await reader.openDocSideReader({});
    assert.equal(reader.node("doc-side-reader-filter").innerHTML, "", JSON.stringify(docsIndex));
  }
});

// ---------------------------------------------------------------------------
// 7 — domain-blindness of the filter's own code
// ---------------------------------------------------------------------------

function domainTokens(report) {
  const tokens = [];
  const push = (value) => { if (typeof value === "string" && value.trim()) tokens.push(value.trim()); };
  push(report.project); push(report.run_id); push(report.run_title); push(report.profile); push(report.emitted_by);
  Object.keys(report.counts || {}).forEach(push);
  (report.locations || []).forEach((loc) => { push(loc.label); push(loc.path); });
  (Array.isArray(report.items) ? report.items : []).forEach((item) => {
    if (item.subject) {
      push(item.subject.id); push(item.subject.label);
      (item.subject.previews || []).forEach((p) => { push(p.label); push(p.target); push(p.path); });
    }
    if (item.location) push(item.location.path);
    (Array.isArray(item.satisfies) ? item.satisfies : []).forEach(push);
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

test("the filter's code knows no word of any project: the reader's veto, pointed at every function of the filter", () => {
  const reports = readdirSync(REPORT_FIXTURES).filter((name) => name.endsWith(".report.json"))
    .map((name) => JSON.parse(readFileSync(join(REPORT_FIXTURES, name), "utf8")));
  const needles = [...new Set(reports.flatMap(domainTokens))].filter((t) => t.length >= 4).map((t) => t.toLowerCase());
  assert.equal(needles.length, 175, "the same measured corpus as the reader's veto");
  needles.push("christopher", "valdez", "cantu");
  // Also the project ids this console has served: a filter rule for one of them is the defect.
  ["aiw-console", "cantu-studio", "cantu-quizzes", "cantu-lessons", "quizzes", "lessons"].forEach((id) => needles.push(id));
  const names = [...SHARED_NAMES, "filterDocsNavTree", "docsNavTreeHtml", "setDocsTitleFilter", "paintDocsNavTree"];
  for (const name of names) {
    assert.equal(typeof CONSOLE[name], "function", `${name} exists`);
    const haystack = CONSOLE[name].toString().toLowerCase();
    for (const needle of needles) {
      assert.ok(!haystack.includes(needle), `${name} contains the domain token ${JSON.stringify(needle)}`);
    }
  }
});
