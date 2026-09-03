// A QUOTE IS A BLOCK, NOT A LINE — and the two surfaces that paint it.
//
// [#64] Why this file exists. `renderDocMarkdownLite` had exactly one branch that emitted a
// blockquote, and it emitted one PER SOURCE LINE. Nothing in the suite ever asserted the HTML a
// quote produces: the three `blockquote` matches in tests/doc-side-reader.test.mjs are an
// allowed-tag list and two CSS measure rules, none of them an output assertion. So a capability
// the repo's own corpus exercises 515 times — 227 of its 367 .md files carry a multi-line quote
// the renderer actually PAINTS — was never proved, and the green said nothing about it. The
// one-line quote of a status header looks identical broken or whole, and that is the only quote
// the neighbour projects ever wrote.
//
// ONE FIGURE OF THE TICKET IS WRONG AND THE CODE WINS. The cabin measured the longest quote at
// 62 lines in context/aiw-console/records/MEDICION-O4.md:97. That run is 62 quote lines in the
// SOURCE, but the renderer never sees it as one: its first line is "> ```", and the whole text
// is split on ``` into fenced and unfenced segments BEFORE any line rule runs, so the run is cut
// apart by the fence split and always was. The longest quote the renderer really paints is 42
// lines, in context/aiw-console/records/CONTENEDORES-SIN-RUNS-MANDA-EL-CODIGO.md. The fence
// split is untouched by this run.
//
// THE THREE SYMPTOMS, each pinned by its own named test below, and each verified RED against the
// unfixed file before the branch was repaired:
//
//   1. a quote of N lines painted as N boxes
//   2. a bare `>` inside a quote painted as its own EMPTY box — the phantom gaps
//   3. a bold span crossing two source lines never closing inside its box, so the `**` printed
//
// AND WHAT MAY NOT MOVE, pinned here too because this branch sits inside the block loop that
// every other construct shares: the escape-first pass, `stripLeadingStatusHeader`, and the
// byte-for-byte output of lists, tables, headings, rules and fenced code — including how a quote
// TERMINATES an open list or table, which is the interaction the ticket named as a stop
// condition. The goldens below were captured from the file BEFORE the repair; they are the
// unfixed renderer's own answers, so any drift in them is a regression by construction.
//
// TWO SURFACES, ONE FIX. The repaired function is reached through `renderDocBodyContent`, which
// the Docs tab paints its body with (project-console.js, `loadDocBody`) and which the modal
// reader reaches through `scope.renderDocBodyContent` (doc-side-reader.js, `dsrSharedRenderer`).
// Both routes are driven below — the tab's through the real entry point, the modal's by opening
// the real reader over a real document and reading back what it painted.

import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, normalize, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const ASSETS = join(REPO_ROOT, "project-console", "assets");
const CONSOLE_JS = join(ASSETS, "project-console.js");
const READER_JS = join(ASSETS, "doc-side-reader.js");

// The console script compiled in a context of its own, the same way every consumer suite loads
// it: it is a browser script, not a module, and the functions under test are pure — text in,
// painted html out — so they need nothing from a page.
function consoleContext() {
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
  return context;
}

const CONSOLE = consoleContext();
const render = CONSOLE.renderDocMarkdownLite;
const renderBody = CONSOLE.renderDocBodyContent;
const stripStatus = CONSOLE.stripLeadingStatusHeader;

// The Docs tab's own route, named as the tab reaches it: a document record and its raw text.
const paintAsDocsTab = (markdown) => renderBody({ path: "docs/SAMPLE.md" }, markdown);

const lines = (...parts) => parts.join("\n");
const countOf = (html, needle) => html.split(needle).length - 1;

test("[#64] the renderer under test is the one the page ships", () => {
  assert.equal(typeof render, "function", "renderDocMarkdownLite is a top-level function of the console script");
  assert.equal(typeof renderBody, "function", "and renderDocBodyContent is the entry point both surfaces call");
  assert.equal(typeof stripStatus, "function", "and stripLeadingStatusHeader is still declared");
});

// ---------------------------------------------------------------------------
// SYMPTOM 1 — N lines, N boxes.
// ---------------------------------------------------------------------------

test("[#64] symptom 1: a quote of N consecutive lines paints ONE blockquote, not N", () => {
  const html = render(lines(
    "> primera línea de la cita",
    "> segunda línea de la cita",
    "> tercera línea de la cita"
  ));
  assert.equal(countOf(html, "<blockquote>"), 1, "one opening tag for the whole quote");
  assert.equal(countOf(html, "</blockquote>"), 1, "and one closing tag");
  const inside = /<blockquote>([\s\S]*?)<\/blockquote>/.exec(html)[1];
  for (const part of ["primera línea de la cita", "segunda línea de la cita", "tercera línea de la cita"]) {
    assert.ok(inside.includes(part), `«${part}» is inside that one block`);
  }
  // The lines are still LINES: a block is not a paragraph, and a 62-line quote that collapsed
  // into one run-on sentence would be a different defect, not a fix.
  assert.equal(countOf(inside, "<br>"), 2, "three lines, two breaks between them");
});

test("[#64] symptom 1: the longest quote of the corpus is ONE block", () => {
  // The longest run this renderer really paints: forty-two consecutive quote lines, the shape
  // measured in CONTENEDORES-SIN-RUNS-MANDA-EL-CODIGO.md. The unfixed branch painted forty-two
  // boxes for it, and that one file went from 105 boxes to 9.
  const source = Array.from({ length: 42 }, (_, i) => `> línea ${i + 1} de la cita`).join("\n");
  const html = render(source);
  assert.equal(countOf(html, "<blockquote>"), 1, "forty-two lines, one box");
  assert.equal(countOf(html, "<br>"), 41, "and forty-one breaks inside it");
});

test("[#64] a quote line that opens a fence is still cut by the fence split — unchanged", () => {
  // MEDICION-O4.md:97 measured. The ``` split runs before every line rule and this run does not
  // touch it, so a "> ```" line keeps behaving exactly as it always did. Pinned so that a later
  // reader does not mistake the ticket's 62-line figure for a regression of the grouping.
  const html = render(lines("> antes", "> ```", "> dentro", "> ```", "> después"));
  assert.equal(html, [
    "<blockquote>antes</blockquote>",
    '<pre class="docs-code"><code>&gt; dentro\n&gt; </code></pre>',
    "<blockquote>después</blockquote>"
  ].join("\n"), "the fence still cuts the run, and the quotes around it are painted as quotes");
  // The ONE difference from the unfixed file, and it is the phantom gap going away: the "> "
  // line that opened the fence used to leave an empty <blockquote></blockquote> behind it.
  assert.ok(!/<blockquote>\s*<\/blockquote>/.test(html), "and no empty box is left where the fence opened");
});

// ---------------------------------------------------------------------------
// SYMPTOM 2 — the phantom gaps.
// ---------------------------------------------------------------------------

test("[#64] symptom 2: a bare > inside a quote is a blank line INSIDE the block, never an empty box", () => {
  const html = render(lines(
    "> antes del hueco",
    ">",
    "> después del hueco"
  ));
  assert.equal(countOf(html, "<blockquote>"), 1, "the gap does not split the quote in two");
  assert.ok(!/<blockquote>\s*<\/blockquote>/.test(html), "and it paints no empty box");
  const inside = /<blockquote>([\s\S]*?)<\/blockquote>/.exec(html)[1];
  assert.equal(inside, "antes del hueco<br><br>después del hueco",
    "the bare > is the blank line between the two, inside the one block");
});

test("[#64] symptom 2: several gaps, and gaps at the edges, leave no empty box anywhere", () => {
  const html = render(lines(">", "> uno", ">", ">", "> dos", ">"));
  assert.equal(countOf(html, "<blockquote>"), 1, "still one block");
  assert.ok(!/<blockquote>\s*<\/blockquote>/.test(html), "no empty box");
  const inside = /<blockquote>([\s\S]*?)<\/blockquote>/.exec(html)[1];
  assert.equal(inside, "uno<br><br><br>dos", "the edges are trimmed; the inner gaps are kept");
  // A quote that is nothing but gaps is nothing to paint — an empty box was never the point.
  assert.equal(render(lines(">", ">")), "", "a quote with no words at all paints no box");
});

// ---------------------------------------------------------------------------
// SYMPTOM 3 — the bold that never closed.
// ---------------------------------------------------------------------------

test("[#64] symptom 3: a bold span crossing two source lines closes inside its own block", () => {
  const html = render(lines(
    "> texto **que abre la negrita en esta línea",
    "> y la cierra en la siguiente** y sigue normal"
  ));
  assert.equal(countOf(html, "<blockquote>"), 1, "one block");
  assert.equal(countOf(html, "<strong>"), 1, "the span opens once");
  assert.equal(countOf(html, "</strong>"), 1, "and closes once");
  assert.ok(!html.includes("**"), "and no asterisk pair survives as literal text");
  const strong = /<strong>([\s\S]*?)<\/strong>/.exec(html)[1];
  assert.ok(strong.includes("que abre la negrita en esta línea"), "the span carries its first line");
  assert.ok(strong.includes("y la cierra en la siguiente"), "and its second");
});

test("[#64] symptom 3: bold that opens and closes on ONE line of a multi-line quote still works", () => {
  const html = render(lines("> **término** de la primera", "> y una segunda línea"));
  assert.equal(countOf(html, "<strong>"), 1);
  assert.ok(!html.includes("**"));
  assert.equal(/<blockquote>([\s\S]*?)<\/blockquote>/.exec(html)[1],
    "<strong>término</strong> de la primera<br>y una segunda línea");
});

// ---------------------------------------------------------------------------
// ESCAPE-FIRST — the invariant the whole renderer rests on.
// ---------------------------------------------------------------------------

test("[#64] escape-first survives the grouping: raw HTML inside a multi-line quote stays TEXT", () => {
  const html = render(lines(
    "> <script>alert(1)</script>",
    "> <b>negrita cruda</b> y <img src=x onerror=y>",
    "> fin"
  ));
  assert.equal(countOf(html, "<blockquote>"), 1, "one block");
  for (const live of ["<script", "</script>", "<b>", "<img"]) {
    assert.ok(!html.includes(live), `«${live}» never reaches the page as markup`);
  }
  for (const shown of ["&lt;script&gt;", "&lt;b&gt;negrita cruda&lt;/b&gt;", "&lt;img src=x onerror=y&gt;"]) {
    assert.ok(html.includes(shown), `«${shown}» is shown to the reader as text`);
  }
  // The only tags in the block are the ones this code wrote.
  const inside = /<blockquote>([\s\S]*?)<\/blockquote>/.exec(html)[1];
  assert.deepEqual(inside.match(/<[^>]+>/g), ["<br>", "<br>"], "the renderer's own breaks, and nothing else");
});

test("[#64] escape-first: a quote line that LOOKS like a closing blockquote cannot close the block", () => {
  const html = render(lines("> antes", "> </blockquote><script>x</script>", "> después"));
  assert.equal(countOf(html, "<blockquote>"), 1);
  assert.equal(countOf(html, "</blockquote>"), 1, "the document cannot write the closing tag");
  assert.ok(html.includes("&lt;/blockquote&gt;"), "it is shown, escaped, as the text it is");
});

// ---------------------------------------------------------------------------
// stripLeadingStatusHeader — unchanged, and proved against the grouped renderer.
// ---------------------------------------------------------------------------

test("[#64] stripLeadingStatusHeader still removes ONLY a leading > Status: line", () => {
  const doc = lines("# Título", "", "> Status: Current | Scope: todo", "", "Cuerpo.");
  assert.equal(stripStatus(doc), lines("# Título", "", "Cuerpo."), "the status line and one blank go");
  const painted = paintAsDocsTab(doc);
  assert.ok(!painted.includes("<blockquote>"), "so the reader paints no box for it");
  assert.ok(!painted.includes("Status:"), "and the header does not duplicate the Metadata panel");
});

test("[#64] stripLeadingStatusHeader leaves every OTHER quote rendering, grouped", () => {
  const doc = lines(
    "# Título",
    "",
    "> Status: Current | Scope: todo",
    "",
    "Cuerpo.",
    "",
    "> una cita cualquiera",
    "> de dos líneas"
  );
  const painted = paintAsDocsTab(doc);
  assert.equal(countOf(painted, "<blockquote>"), 1, "the ordinary quote still renders");
  assert.ok(painted.includes("una cita cualquiera<br>de dos líneas"), "and it renders as ONE block");
  assert.ok(!painted.includes("Status:"), "while the leading header stays hidden");
});

test("[#64] a leading quote that is NOT a status header is kept, and grouped", () => {
  const doc = lines("# Título", "", "> Ticket: algo", "> segunda línea del ticket", "", "Cuerpo.");
  assert.equal(stripStatus(doc), doc, "nothing is stripped");
  const painted = paintAsDocsTab(doc);
  assert.equal(countOf(painted, "<blockquote>"), 1);
  assert.ok(painted.includes("Ticket: algo<br>segunda línea del ticket"));
});

// ---------------------------------------------------------------------------
// EVERYTHING ELSE KEEPS ITS OUTPUT — goldens captured from the file BEFORE the repair.
// ---------------------------------------------------------------------------

test("[#64] lists, tables, headings, rules and fenced code keep their exact output", () => {
  const source = lines(
    "# Título", "", "## Sub", "", "Un párrafo normal.", "",
    "- uno", "- dos", "  continuación del dos", "",
    "1. primero", "2. segundo", "",
    "| A | B |", "| --- | --- |", "| 1 | 2 |", "| 3 | 4 |", "",
    "---", "",
    "```js", "const x = 1;", "```", "",
    "Fin."
  );
  assert.equal(render(source), [
    '<h2 class="docs-body-h">Título</h2>',
    '<h3 class="docs-body-h">Sub</h3>',
    "<p>Un párrafo normal.</p>",
    "<ul>", "<li>uno</li>", "<li>dos continuación del dos</li>", "</ul>",
    "<ol>", "<li>primero</li>", "<li>segundo</li>", "</ol>",
    '<div class="docs-table-wrap"><table class="docs-table"><thead><tr><th>A</th><th>B</th></tr></thead><tbody><tr><td>1</td><td>2</td></tr><tr><td>3</td><td>4</td></tr></tbody></table></div>',
    "<hr>",
    '<pre class="docs-code"><code>const x = 1;</code></pre>',
    "<p>Fin.</p>"
  ].join("\n"));
});

test("[#64] a quote still TERMINATES an open list and an open table, exactly as before", () => {
  // The stop condition the ticket named: grouping must not change how lists or tables end.
  assert.equal(render(lines("- a", "- b", "> cita", "- c")),
    '<ul>\n<li>a</li>\n<li>b</li>\n</ul>\n<blockquote>cita</blockquote>\n<ul>\n<li>c</li>\n</ul>');
  assert.equal(render(lines("| A | B |", "| --- | --- |", "| 1 | 2 |", "> cita", "texto")),
    '<div class="docs-table-wrap"><table class="docs-table"><thead><tr><th>A</th><th>B</th></tr></thead><tbody><tr><td>1</td><td>2</td></tr></tbody></table></div>\n<blockquote>cita</blockquote>\n<p>texto</p>');
  assert.equal(render(lines("párrafo", "> cita", "párrafo 2")),
    "<p>párrafo</p>\n<blockquote>cita</blockquote>\n<p>párrafo 2</p>");
});

test("[#64] a one-line quote is byte-for-byte what it always was", () => {
  assert.equal(render("> una sola línea"), "<blockquote>una sola línea</blockquote>");
  assert.equal(render(lines("> cita", "# Título")),
    '<blockquote>cita</blockquote>\n<h2 class="docs-body-h">Título</h2>');
});

test("[#64] a quote INSIDE a fenced code block is still code, not a quote", () => {
  assert.equal(render(lines("```", "> no es cita", "> tampoco", "```")),
    "<pre class=\"docs-code\"><code>&gt; no es cita\n&gt; tampoco</code></pre>");
});

test("[#64] two quotes separated by a blank line stay TWO blocks", () => {
  const html = render(lines("> primera cita", "> sigue", "", "> segunda cita", "> sigue"));
  assert.equal(countOf(html, "<blockquote>"), 2, "a blank line ends a quote — grouping is CONSECUTIVE lines");
  assert.equal(html, "<blockquote>primera cita<br>sigue</blockquote>\n<blockquote>segunda cita<br>sigue</blockquote>");
});

// ---------------------------------------------------------------------------
// NOTHING INSIDE A QUOTE IS RE-PARSED — the operator's call, recorded.
//
// The corpus carries both constructs, measured on 2026-09-02: ONE nested-quote run (two lines,
// context/aiw-console/records/HALLAZGOS-67-SUPERFICIE-DEL-REPORTE.md:5) and ELEVEN runs across
// eight files whose quote contains what looks like a list. The unfixed renderer parsed neither —
// the inner ">" printed escaped and the "- " printed as a dash — and the operator's decision was
// to invent no rule for either: grouping changes how many boxes there are, and nothing else.
// ---------------------------------------------------------------------------

test("[#64] a nested quote (>>) is LITERAL TEXT inside the one block — no nested blockquote", () => {
  const html = render(lines(
    "> > «no lo abras, ese run es cuando acabemos los arreglos pendientes, doy una revisada",
    "> > general y te traigo una lista completa de feedback»"
  ));
  assert.equal(countOf(html, "<blockquote>"), 1, "one block, as for any other quote run");
  const inside = /<blockquote>([\s\S]*?)<\/blockquote>/.exec(html)[1];
  assert.equal(inside,
    "&gt; «no lo abras, ese run es cuando acabemos los arreglos pendientes, doy una revisada<br>&gt; general y te traigo una lista completa de feedback»",
    "the inner > is the escaped character it always was, not a second block");
});

test("[#64] a list inside a quote is LITERAL TEXT inside the one block — no <ul> is grown", () => {
  const html = render(lines(
    "> **La consola las RECHAZA:**",
    ">",
    "> - `SPECIFIED` + `FOUNDATIONAL`",
    "> - `FOUNDATIONAL` + `LOUD`"
  ));
  assert.equal(countOf(html, "<blockquote>"), 1, "one block for the whole quote");
  assert.equal(countOf(html, "<ul>"), 0, "and no list is invented inside it");
  assert.equal(countOf(html, "<li>"), 0);
  const inside = /<blockquote>([\s\S]*?)<\/blockquote>/.exec(html)[1];
  assert.equal(inside,
    "<strong>La consola las RECHAZA:</strong><br><br>- <code>SPECIFIED</code> + <code>FOUNDATIONAL</code><br>- <code>FOUNDATIONAL</code> + <code>LOUD</code>",
    "the dashes stay the text they were; only the empty box between them is gone");
});

// ---------------------------------------------------------------------------
// THE TWO SURFACES. One fix, two routes, each driven for itself.
// ---------------------------------------------------------------------------

const LONG_QUOTE_DOC = lines(
  "# Un documento con una cita larga",
  "",
  "Antes de la cita.",
  "",
  "> primera línea de la cita larga",
  "> segunda línea, con **una negrita que abre aquí",
  "> y cierra en la línea siguiente** del mismo bloque",
  ">",
  "> tras el hueco fantasma, que ya no es una caja vacía",
  "> última línea de la cita",
  "",
  "## Después",
  "",
  "Después de la cita."
);

test("[#64] surface 1 — the DOCS TAB route: renderDocBodyContent paints the long quote as one block", () => {
  // This is the exact call `loadDocBody` makes: renderDocBodyContent(doc, raw).
  const painted = paintAsDocsTab(LONG_QUOTE_DOC);
  assert.equal(countOf(painted, "<blockquote>"), 1, "one box for the whole quote");
  assert.ok(!/<blockquote>\s*<\/blockquote>/.test(painted), "no phantom gap box");
  assert.equal(countOf(painted, "<strong>"), 1, "the crossing bold opened");
  assert.equal(countOf(painted, "</strong>"), 1, "and closed");
  assert.ok(!painted.includes("**"), "no literal asterisks");
  assert.equal(countOf(painted, '<h2 class="docs-body-h">'), 1, "and the headings around it are untouched");
  assert.equal(countOf(painted, '<h3 class="docs-body-h">'), 1);
});

// A minimal recording DOM, enough for the reader and no more: it registers elements by id, keeps
// innerHTML, and serves the temp fixture over `fetch` the way the read-only server does.
class QuoteStubElement {
  constructor(id) {
    this.id = id;
    this.innerHTML = "";
    this.textContent = "";
    this.scrollTop = 0;
    this.attributes = new Map();
    this.listeners = [];
    this.parent = null;
    this.classList = { set: new Set(), add(...n) { n.forEach((x) => this.set.add(x)); }, remove(...n) { n.forEach((x) => this.set.delete(x)); }, toggle(n, f) { const on = f === undefined ? !this.set.has(n) : !!f; if (on) this.set.add(n); else this.set.delete(n); return on; }, contains(n) { return this.set.has(n); } };
  }
  setAttribute(name, value) { this.attributes.set(name, String(value)); }
  getAttribute(name) { return this.attributes.has(name) ? this.attributes.get(name) : null; }
  removeAttribute(name) { this.attributes.delete(name); }
  addEventListener(type, handler) { this.listeners.push({ type, handler }); }
  removeEventListener() {}
  querySelector() { return null; }
  querySelectorAll() { return []; }
  closest() { return null; }
}

// The modal reader, loaded exactly as the page loads it — the shared renderer present on the
// scope as a global, and the reader reaching for it by name at call time.
async function openInModalReader(markdown, docPath) {
  const root = mkdtempSync(join(tmpdir(), "aiw-quote-reader-"));
  try {
    mkdirSync(join(root, "docs"), { recursive: true });
    writeFileSync(join(root, docPath), markdown, "utf8");
    const elements = new Map();
    const byId = (id) => {
      const key = String(id);
      if (!elements.has(key)) elements.set(key, new QuoteStubElement(key));
      return elements.get(key);
    };
    const sandbox = {
      console, setTimeout, clearTimeout,
      document: {
        getElementById: byId,
        querySelector: () => null,
        querySelectorAll: () => [],
        createElement: (tag) => new QuoteStubElement(`(created:${tag})`),
        addEventListener() {},
        removeEventListener() {}
      },
      async fetch(url) {
        const rel = String(url).split("?")[0].replace(/^\/+/, "");
        const abs = normalize(join(root, rel));
        const base = root.endsWith(sep) ? root : root + sep;
        if (!abs.startsWith(base)) return { ok: false, status: 404, statusText: "Not Found", text: async () => "" };
        try {
          const body = readFileSync(abs, "utf8");
          return { ok: true, status: 200, statusText: "OK", text: async () => body };
        } catch {
          return { ok: false, status: 404, statusText: "Not Found", text: async () => "" };
        }
      },
      // THE SHARED RENDERER, and it is the real one: taken off the compiled console script, put
      // on the scope under the name the reader looks up. Nothing is copied.
      renderDocBodyContent: renderBody
    };
    sandbox.window = sandbox;
    vm.createContext(sandbox);
    // The panel is static markup in index.html, parsed before any deferred script runs.
    ["doc-side-reader", "doc-side-reader-overlay", "doc-side-reader-title", "doc-side-reader-label",
      "doc-side-reader-path", "doc-side-reader-index", "doc-side-reader-docs", "doc-side-reader-scroll",
      "doc-side-reader-body"].forEach(byId);
    vm.runInContext(readFileSync(READER_JS, "utf8"), sandbox, { filename: READER_JS });
    sandbox.setDocSideReaderSource({
      docsIndex: { schema_version: "1.0.0", docs: [{ title: "Cita larga", path: docPath, nav_tier: "secondary", default_visible: true, ia_bucket: "docs" }] },
      base: "",
      indexPath: ".project/docs_index.json"
    });
    const opened = await sandbox.openDocSideReader({ path: docPath });
    return { opened, body: byId("doc-side-reader-body").innerHTML };
  } finally {
    // The document has been read and painted by now, so the fixture directory has done its work.
    rmSync(root, { recursive: true, force: true });
  }
}

test("[#64] surface 2 — the MODAL READER route: the same long quote, opened, paints one block", async () => {
  const { opened, body } = await openInModalReader(LONG_QUOTE_DOC, "docs/CITA-LARGA.md");
  assert.equal(opened.ok, true, "the reader opened the document");
  assert.equal(opened.view, "document", "and it is showing the document, not a failure state");
  const article = /<article class="docs-body">([\s\S]*)<\/article>/.exec(body);
  assert.ok(article, "painted inside the shared reading container");
  const painted = article[1];
  assert.equal(countOf(painted, "<blockquote>"), 1, "one box for the whole quote, in the modal too");
  assert.ok(!/<blockquote>\s*<\/blockquote>/.test(painted), "no phantom gap box in the modal");
  assert.equal(countOf(painted, "<strong>"), 1, "the crossing bold opened");
  assert.equal(countOf(painted, "</strong>"), 1, "and closed");
  assert.ok(!painted.includes("**"), "no literal asterisks in the modal");
});

test("[#64] the two surfaces paint the SAME quote — the fix landed once, not twice", async () => {
  const { body } = await openInModalReader(LONG_QUOTE_DOC, "docs/CITA-LARGA.md");
  const modal = /<article class="docs-body">([\s\S]*)<\/article>/.exec(body)[1].replace(/ id="dsr-h-\d+"/g, "");
  const tab = renderBody({ path: "docs/CITA-LARGA.md" }, LONG_QUOTE_DOC);
  assert.equal(modal, tab, "byte for byte, but for the positional ids the reader stamps on headings");
});
