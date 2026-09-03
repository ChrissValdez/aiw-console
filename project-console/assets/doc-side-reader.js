// THE DOCUMENT READER OF THIS CONSOLE. A document the operator can OPEN while he judges, and
// nothing else. Opened by #62 as a side panel; rebuilt by #63 as the CENTRED MODAL below.
//
// WHY IT EXISTS, in the operator's own words (2026-08-27, during the QA of #61): «muchas veces
// confio en esa desicion pero a veces son desiciones de hace semanas y no las recuerdo, y si
// estan mal no tengo forma de auditarlas o revisarlas». A citation that cannot be opened cannot
// be AUDITED. Today a verdict is signed against a rule the signer cannot see without leaving the
// screen. So this file opens the rule OVER the report, never instead of it.
//
// AND THERE IS ONE READER IN THIS CONSOLE, NOT TWO. #62 built this beside a surface that had
// been reading documents with an index on the left all along — the Docs tab — without knowing.
// #63 undid that: the shape below is composed from patterns the console already carries, and the
// document itself is painted by the console's ONE document renderer, called and never copied.
// Nothing here renders markdown; see THE DOCUMENT, below.
//
// IT IS A FILE OF ITS OWN for the same reason the report mount is: the console is domain-blind
// and its blindness is proved mechanically. A reader that must find a SECTION inside a document
// is exactly where a domain regex would be smuggled in, so the reader lives here, alone, and the
// same mechanical veto runs over it and its stylesheet.
//
// THE BLINDNESS LINE, and it is the one that decides whether this file is legal:
//
//   ALLOWED   — reading the HEADINGS the shared renderer painted. A heading is generic document
//               FORMAT, the same way `{` is generic JSON, and since #63 this file does not even
//               find them: it reads back the ones the console's one renderer emitted. A section
//               index derived from headings says nothing about what any project's documents are
//               about.
//   FORBIDDEN — hunting a section SIGN inside free prose to turn it into a link. That is a
//               domain regex: it knows a convention of one project's writing, it would fail
//               silently on documents that do not use it, and it is the exact defect this
//               console has already refused four times. Citations buried in prose therefore
//               stay unlinked BY DESIGN, and the view says so rather than hiding it.
//
// AND IT IS THE STRICTER READING OF THAT LINE THAT THIS FILE TAKES. A citation resolves only
// when the citation AS A WHOLE matches a heading this document actually carries. A citation that
// names one section plus a comment, or two sections at once, does NOT resolve — because telling
// those two apart means counting section marks in prose, which is the forbidden regex, and
// because jumping to the first of two named sections is precisely the "scrolls somewhere
// plausible and pretends" this run forbids. It opens the document AT ITS BEGINNING and SAYS
// which section it could not resolve — the naming is the rule and it does not weaken.
//
// IT NEVER WRITES. There is no write verb in this file, no write route, no form control, no editable
// region: the only network verb it knows is the GET that the console already serves. What it
// cannot read, it declares — WHICH file, and WHY. An empty panel is never an answer here.

// ---------------------------------------------------------------------------
// Escaping. Its own copy on purpose: this file must load and be judged alone.
// ---------------------------------------------------------------------------

function dsrEsc(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

// ---------------------------------------------------------------------------
// THE DOCUMENT LIST — the project's own index, and only it.
// ---------------------------------------------------------------------------

// Build the list model from one project's parsed docs index. As with the report index, a null or
// misshapen index yields an UNAVAILABLE model and never an empty one: "this project indexes no
// documents" and "this project's index could not be read" are two different facts, and an
// operator looking for a rule needs to know which one he is looking at.
//
// Only two fields are read, `path` and `title`, and nothing is derived from either. Every other
// field an index carries is metadata this reader has no business interpreting.
function dsrDocsModel(index) {
  const entries = index && Array.isArray(index.docs) ? index.docs : null;
  const model = { available: false, docs: [], byPath: new Map() };
  if (!entries) return model;
  model.available = true;
  entries.forEach((entry) => {
    if (!entry || typeof entry.path !== "string" || !entry.path) return;
    if (model.byPath.has(entry.path)) return;
    const doc = {
      path: entry.path,
      title: typeof entry.title === "string" && entry.title.trim() ? entry.title.trim() : entry.path
    };
    model.byPath.set(doc.path, doc);
    model.docs.push(doc);
  });
  return model;
}

// ---------------------------------------------------------------------------
// THE DOCUMENT — RENDERED BY THE CONSOLE'S ONE DOCUMENT RENDERER, and indexed off what that
// renderer painted.
//
// [#63] THIS IS THE DEFECT THIS RUN EXISTS TO UNDO, corrected. The console ALREADY read a
// project's documents with an index beside them — its Docs tab — and #62 shipped a SECOND
// renderer of the same markdown here, without knowing. Two renderers are two answers to one
// question, and the operator decided there is ONE. So the body is painted by
// `renderDocBodyContent`, the very entry point the Docs tab paints its own reader with, CALLED
// and not copied. No markdown grammar survives in this file.
//
// AND THE INDEX IS READ BACK OFF THAT ONE PAINTING. Heading n of the index and the element
// carrying id `dsr-h-n` are the same element BY CONSTRUCTION: the index is built by walking the
// headings the renderer emitted and stamping each one as it is walked. There is no second pass
// over the document, so there is nothing for the index and the body to disagree about. The ids
// stay POSITIONAL for the reason #62 gave — a slug of the words would collide between two
// headings that say the same thing, and would be one more place this file could start reading
// meaning into words.
//
// THE BLINDNESS LINE HAS NOT MOVED; IT HAS MOVED HOUSE. The generic markdown rule — a run of
// hashes at the start of a line opens a heading — now lives where the Docs tab has always kept
// it, in the shared renderer. What is left here is narrower than before: this file recognises
// the ELEMENT the shared renderer marked as a heading, and reads its words only to compare them,
// whole, against a citation. Hunting a section sign inside free prose stays forbidden, and stays
// absent.
// ---------------------------------------------------------------------------

// The console's one document renderer, looked up at CALL time and never captured at load time:
// this file is deferred AHEAD of the console script that declares it, so a reference taken while
// loading would be a permanent null.
function dsrSharedRenderer() {
  const scope = typeof window !== "undefined" && window
    ? window
    : (typeof globalThis !== "undefined" ? globalThis : null);
  const render = scope ? scope.renderDocBodyContent : null;
  return typeof render === "function" ? render : null;
}

// The renderer's OWN output shape, not a document's: an opening heading tag wearing the
// renderer's heading class, its content, and its matching close. The content can never contain
// that closing tag, because the renderer escapes the whole source before it formats any of it.
const DSR_PAINTED_HEADING = /<h([1-6]) class="docs-body-h">([\s\S]*?)<\/h\1>/g;

// The renderer's markup taken off a painted heading, then its escaping undone — so what is
// compared against a citation is exactly the run of words the operator reads on screen. Tags go
// first and `&amp;` is undone last, or an escaped angle bracket would be mistaken for markup.
function dsrStripTags(html) {
  return String(html == null ? "" : html).replace(/<[^>]*>/g, "");
}

function dsrUnescape(value) {
  return String(value == null ? "" : value)
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

function dsrHeadingText(inner) {
  return dsrPlainText(dsrUnescape(dsrStripTags(inner)));
}

// Text with any residual markup taken off and its whitespace collapsed, for the index and for
// matching. Kept from #62 unchanged: a citation arrives as the emitter wrote it and may still
// carry emphasis marks or code ticks, which are format and not words.
function dsrPlainText(raw) {
  return String(raw == null ? "" : raw)
    .replace(/`+([^`]*)`+/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\*{1,3}/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// The comparable form of a piece of text: no markup, no case, no punctuation at either edge.
// Trimming the EDGES is what lets a citation written with a leading section mark, or a heading
// written with a trailing colon, compare equal to the same words without them — and it is
// deliberately the only thing done to the INSIDE of the string, which is left exactly as written.
function dsrKey(raw) {
  return dsrPlainText(raw)
    .toLowerCase()
    .replace(/^[^0-9a-zà-öø-ÿ]+/, "")
    .replace(/[^0-9a-zà-öø-ÿ]+$/, "")
    .trim();
}

// The leading token of a heading — its enumerator, when it has one. A generic document
// convention: the first whitespace-delimited word. No meaning is read from it, and a heading
// whose first word is an ordinary word simply has that word as its label.
function dsrLeadingToken(plain) {
  const first = String(plain || "").split(/\s+/)[0] || "";
  return first;
}

// Stamp the painting and index it in ONE walk. Returns the same html with a positional id on
// every heading the renderer emitted, plus the index of those very headings.
function dsrIndexPainting(painted) {
  const headings = [];
  DSR_PAINTED_HEADING.lastIndex = 0;
  const html = String(painted == null ? "" : painted).replace(DSR_PAINTED_HEADING, (whole, tag, inner) => {
    const words = dsrHeadingText(inner);
    const entry = {
      // The depth is the RENDERER'S. It paints its heading levels onto a scale of its own, and a
      // reader that reused the painting and then claimed some other depth for it would be
      // disagreeing with the screen the operator is looking at. Levels count from 1.
      level: Math.max(1, Number(tag) - 1),
      text: words,
      id: "dsr-h-" + headings.length,
      label: dsrLeadingToken(words)
    };
    headings.push(entry);
    return "<h" + tag + ' class="docs-body-h" id="' + entry.id + '">' + inner + "</h" + tag + ">";
  });
  return { headings, html };
}

// Render one document and index it. `available: false` is the honest answer when this page was
// loaded without the console script that owns the renderer: this file will not grow a renderer of
// its own to cover for a missing one — growing a second is the whole defect — and the reader says
// so in words rather than showing an empty column.
function dsrRenderDocument(rawText, path) {
  const render = dsrSharedRenderer();
  if (!render) return { available: false, headings: [], html: "" };
  const painted = render({ path: String(path == null ? "" : path) }, rawText);
  const indexed = dsrIndexPainting(painted);
  return { available: true, headings: indexed.headings, html: indexed.html };
}

function dsrHeadings(rawText, path) {
  return dsrRenderDocument(rawText, path).headings;
}

// ---------------------------------------------------------------------------
// RESOLVING A CITATION — the one place this run could have cheated, and did not.
// ---------------------------------------------------------------------------

// The forms of a heading a citation may match, all compared as whole strings:
//   its enumerator alone      — "6.3"
//   the whole heading         — "6.3 Feedback"
//   the heading without it    — "Feedback"
// A citation matches when it equals one of them. It is never a prefix, never a substring and
// never a "closest" match: an approximate hit is how a reader ends up somewhere plausible, and
// somewhere plausible is what this run forbids.
function dsrHeadingKeys(heading) {
  const keys = [];
  const push = (value) => {
    const key = dsrKey(value);
    if (key && keys.indexOf(key) === -1) keys.push(key);
  };
  push(heading.label);
  push(heading.text);
  const rest = String(heading.text || "").slice(String(heading.label || "").length);
  if (rest.trim()) push(rest);
  return keys;
}

// Resolve one citation against one document's headings.
//
// FOUR ANSWERS, and they are four because four different things can be true. `none` — the
// document was opened with no section asked for, so nothing failed. `resolved` — exactly one
// heading matches. `unmatched` — no heading matches, which is what every citation that carries a
// comment or names two sections at once produces, correctly. `ambiguous` — more than one heading
// matches, and picking one of them would be a guess wearing the clothes of an answer.
function dsrResolveSection(headings, citation) {
  const requested = String(citation == null ? "" : citation).trim();
  const list = Array.isArray(headings) ? headings : [];
  if (!requested) return { reason: "none", resolved: false, requested: "", heading: null, targetId: "" };
  const key = dsrKey(requested);
  if (!key) return { reason: "unmatched", resolved: false, requested, heading: null, targetId: "" };
  const hits = list.filter((heading) => dsrHeadingKeys(heading).indexOf(key) !== -1);
  if (hits.length === 1) {
    return { reason: "resolved", resolved: true, requested, heading: hits[0], targetId: hits[0].id };
  }
  return {
    reason: hits.length ? "ambiguous" : "unmatched",
    resolved: false,
    requested,
    heading: null,
    targetId: ""
  };
}

// ---------------------------------------------------------------------------
// THE MARKUP. Every branch below ends in words on screen; none of them ends in nothing.
// ---------------------------------------------------------------------------

function dsrDocListHtml(model, options) {
  const opts = options || {};
  const indexPath = dsrEsc(opts.indexPath || "");
  const activePath = typeof opts.activePath === "string" ? opts.activePath : "";
  // [#63] Every branch is wrapped in the list's own block, so an absence sits where the list
  // would have sat and takes the column's inset with it rather than touching its edges.
  if (!model || !model.available) {
    return `
      <div class="dsr-doc-list">
        <div class="dsr-absence">
          <div class="dsr-absence-line">The documents index of this project could not be read, so there is no list of documents to offer — neither that it has any nor that it has none.</div>
          ${indexPath ? `<div class="dsr-absence-path mono">${indexPath}</div>` : ""}
        </div>
      </div>
    `;
  }
  if (!model.docs.length) {
    return `
      <div class="dsr-doc-list">
        <div class="dsr-absence">
          <div class="dsr-absence-line">This project's documents index was read and lists no document.</div>
          ${indexPath ? `<div class="dsr-absence-path">Measured from <span class="mono">${indexPath}</span>.</div>` : ""}
        </div>
      </div>
    `;
  }
  // [#63] A ROW THAT READS AS A HIERARCHY. Measured on 2026-09-02: the row printed its title
  // and its path at nearly one weight, so the eye had nothing to land on first.
  //
  // The split is the SAME ONE the header already makes, and it is made the same way: whatever
  // follows the title's LAST separator leaves the name and goes to the right of the row, because
  // of WHERE it sits and never because of what it says. This file does not know what a version
  // is, and it must not learn: the genre of a document does NOT travel as data — the only
  // grouping an index carries is derived from the document's own folder — so deciding that some
  // leading word is a label by READING it would be domain interpretation, which is forbidden
  // here. What is left of the title after the tail comes off stays the name, whole.
  //
  // [#63 QA] AND THE ROW IS A NAV ITEM, WORN AND NOT COPIED. The operator read the column and
  // said «esa parte, texto, recuadros y luego texto, no se ve un menú limpio». Measured the same
  // day: this row drew a CARD — border, background, radius, a margin between each — while the
  // Docs tab's own navigation draws none of that: transparent, borderless, and a 3px bar down the
  // left only when the item is active. The tab is the surface the operator named, so the row
  // WEARS `docs-nav-item` and this file declares nothing for it. The look, the hover and the
  // active state all arrive from the one rule that already owns them, and cannot drift from it.
  //
  // `active` is that rule's own word, marked here on the document that is open — the same fact
  // the tab marks on the document it is showing.
  const rows = model.docs.map((doc) => {
    const split = dsrSplitTitle(doc.title);
    const active = activePath && doc.path === activePath ? " active" : "";
    // [#63 QA·2] TITLE AND LABEL, AND NOTHING ELSE. «que solo tenga titulo y nota, que no venga
    // la ruta abajo del nombre». The path is not lost: it is what makes a citation checkable, so
    // it stays where it is worth reading — under the name of the document that is OPEN, in the
    // header of this dialog — instead of under all 325 names in the menu. It is still on the row
    // as the handle the click travels by, which is data and not print.
    return `
    <button class="docs-nav-item dsr-doc-row${active}" type="button" data-dsr-doc="${dsrEsc(doc.path)}">
      <span class="dsr-doc-title">${dsrEsc(split.name)}</span>
      <span class="dsr-doc-version">${dsrEsc(split.label)}</span>
    </button>
  `;
  }).join("");
  return `
    <div class="dsr-doc-list">
      <div class="dsr-doc-list-head">${dsrEsc(`${model.docs.length} document${model.docs.length === 1 ? "" : "s"} indexed by this project`)}</div>
      ${rows}
      ${indexPath ? `<div class="dsr-doc-list-source">Listed by <span class="mono">${indexPath}</span>, and nothing outside it can be opened here.</div>` : ""}
    </div>
  `;
}

// [#63 QA·2] THE SECTION RAIL IS GONE, and its absence is a decision and not an oversight.
// «aqui estas manejando un sistema de documentos a la izquierda y secciones a la izquierda mas
// abajo, no me gusta, quita las secciones» — they complicated the column instead of easing it.
// One index in the left column: the project's documents. Nothing else.
//
// The headings THEMSELVES are still read, still stamped with their positional ids, and still
// what a citation resolves against — that is the jump, and the jump is untouched. What is gone
// is the second list of them beside the first.
// A citation that did not resolve. It NAMES the section it could not resolve, verbatim as the
// report wrote it, and says which of the two things happened. Silence here would be the reader
// pretending the jump worked.
function dsrUnresolvedHtml(resolution) {
  if (!resolution || resolution.resolved || resolution.reason === "none") return "";
  const requested = dsrEsc(resolution.requested);
  const why = resolution.reason === "ambiguous"
    ? "more than one heading of this document answers to it, and choosing one of them would be a guess"
    : "no heading of this document answers to it";
  return `
    <div class="dsr-notice" role="status">
      <div class="dsr-notice-line">The citation's section could not be resolved, so the document opened at its beginning instead of jumping to it.</div>
      <div class="dsr-notice-section">Cited section: <span class="mono">${requested}</span></div>
      <div class="dsr-notice-why">${dsrEsc(why)}. Citations that carry a comment, or name more than one section at once, are read as written and never guessed at.</div>
    </div>
  `;
}

// A document that could not be read. WHICH file, and WHY — the panel is never empty.
function dsrReadFailureHtml(path, url, detail) {
  return `
    <div class="dsr-absence is-broken">
      <div class="dsr-absence-line">This document could not be read, so nothing of it is shown.</div>
      <div class="dsr-absence-file"><span class="dsr-absence-label">File</span> <span class="mono">${dsrEsc(path)}</span></div>
      <div class="dsr-absence-file"><span class="dsr-absence-label">Asked for at</span> <span class="mono">${dsrEsc(url)}</span></div>
      <div class="dsr-absence-file"><span class="dsr-absence-label">Reason</span> <span>${dsrEsc(detail)}</span></div>
      <div class="dsr-absence-path">The documents index names this file. If it is gone or renamed, the index is behind what is on disk.</div>
    </div>
  `;
}

// A path nobody indexed. The reader opens the project's OWN documents and only those, so a
// citation pointing anywhere else is refused in words rather than fetched quietly.
function dsrUnlistedHtml(path, indexPath) {
  return `
    <div class="dsr-absence is-broken">
      <div class="dsr-absence-line">This citation names a file that this project's documents index does not list, so the reader does not open it.</div>
      <div class="dsr-absence-file"><span class="dsr-absence-label">Named</span> <span class="mono">${dsrEsc(path)}</span></div>
      ${indexPath ? `<div class="dsr-absence-path">The index beside this is what <span class="mono">${dsrEsc(indexPath)}</span> declares, and it is the whole of what can be opened here.</div>` : ""}
    </div>
  `;
}

// [#63] A page loaded without the console script that owns the document renderer. The reader
// refuses to render rather than grow a renderer of its own, and NAMES what is missing — the same
// rule that governs a document it cannot read, applied to a renderer it cannot reach.
function dsrNoRendererHtml(path) {
  return `
    <div class="dsr-absence is-broken">
      <div class="dsr-absence-line">This page was loaded without the console's document renderer, so this document is not rendered. This reader paints with the one renderer the console already has and grows no second one of its own.</div>
      <div class="dsr-absence-file"><span class="dsr-absence-label">File</span> <span class="mono">${dsrEsc(path)}</span></div>
      <div class="dsr-absence-file"><span class="dsr-absence-label">Missing</span> <span class="mono">renderDocBodyContent</span></div>
    </div>
  `;
}

// [#63] The reading column with no document asked for yet. The index is already beside it, so
// this points at the index instead of repeating it — and it is words, not an empty column.
function dsrPromptHtml() {
  return `
    <div class="dsr-prompt">
      <div class="dsr-prompt-line">Choose a document in the index to read it here.</div>
    </div>
  `;
}

// ---------------------------------------------------------------------------
// THE MODAL. Centred over the report — never instead of it.
//
// [#63] The operator read a document in #62's side panel and named the fix himself, by pointing
// at a surface this console ALREADY HAS: «en vez de tener un indice al que le das click y abre
// esa seccion y se pierde el indice, que se use el mismo diseno que docs de un proyecto. A la
// izquierda el indice y a la derecha el contenido», and on the shape, «creo que es mejor que
// este como un modal centrado, y grande, con el fondo negro igual que ahora».
//
// So this is COMPOSED FROM WHAT EXISTS and invents nothing: the centred-dialog geometry of the
// console's edit modal, the two-column grid of its Docs tab, that tab's navigation column and
// reading column, and the very veil the run drawer already darkens the page with. Four patterns
// the console already carries; no fifth.
//
// AND THE INDEX NEVER LEAVES. The index and the document are two columns with two scrollers, so
// reading the document moves the document and the index stays exactly where it was — which is
// the whole of the complaint that opened this run.
//
// It is still an OVERLAY and not a column the report is squeezed into, and that is still the
// whole of criterion 1: nothing under it is resized, re-laid-out or re-rendered when it opens,
// so the report cannot lose the operator's place in it. Closing it puts back a screen that
// never moved.
// ---------------------------------------------------------------------------

const DSR_PANEL_ID = "doc-side-reader";
const DSR_OVERLAY_ID = "doc-side-reader-overlay";
const DSR_TITLE_ID = "doc-side-reader-title";
const DSR_LABEL_ID = "doc-side-reader-label";
const DSR_PATH_ID = "doc-side-reader-path";
const DSR_INDEX_ID = "doc-side-reader-index";
const DSR_DOCS_ID = "doc-side-reader-docs";
const DSR_SCROLL_ID = "doc-side-reader-scroll";
const DSR_BODY_ID = "doc-side-reader-body";

// The active project's own index, handed over by the console — the one file that owns routes.
// This reader composes no route of its own beyond joining that base to a path the index listed.
let dsrSource = { model: dsrDocsModel(null), base: "", indexPath: "" };
let dsrState = null;
let dsrWired = false;

function dsrById(id) {
  return typeof document !== "undefined" ? document.getElementById(id) : null;
}

function setDocSideReaderSource(options) {
  const opts = options || {};
  let model;
  try {
    model = dsrDocsModel(opts.docsIndex);
  } catch (error) {
    model = dsrDocsModel(null);
  }
  dsrSource = {
    model,
    base: typeof opts.base === "string" ? opts.base : "",
    indexPath: typeof opts.indexPath === "string" ? opts.indexPath : ""
  };
}

function docSideReaderSourceModel() {
  return dsrSource.model;
}

function dsrWire() {
  if (dsrWired) return;
  if (typeof document === "undefined" || !document.addEventListener) return;
  const panel = dsrById(DSR_PANEL_ID);
  if (!panel) return;
  dsrWired = true;
  // The global door. Delegated on the document so the trigger can sit in whatever chrome the
  // page gives it without this file knowing where that is.
  document.addEventListener("click", (event) => {
    const target = event.target && event.target.closest ? event.target.closest("[data-doc-reader-open]") : null;
    if (!target) return;
    openDocSideReader({});
  });
  // [#62 QA] The veil closes the reader, because that is what the veil of the run drawer does
  // (project-console.js wires `drawer-overlay` to closeDrawer). Matched, not invented.
  const overlay = dsrById(DSR_OVERLAY_ID);
  if (overlay) overlay.addEventListener("click", () => { closeDocSideReader(); });
  panel.addEventListener("click", (event) => {
    const el = event.target && event.target.closest ? event.target : null;
    if (!el || !el.closest) return;
    if (el.closest("[data-dsr-close]")) {
      closeDocSideReader();
      return;
    }
    const row = el.closest("[data-dsr-doc]");
    if (row) {
      openDocSideReader({ path: row.getAttribute("data-dsr-doc") });
      return;
    }
    // [#63 QA·2] No section control is listened for here any more, because none is painted: the
    // rail that produced them is gone. `dsrScrollTo` stays, because the JUMP stays — it is what
    // a citation that resolves does, and it is driven by the citation, not by a control.
  });
}

function dsrShow(on) {
  const panel = dsrById(DSR_PANEL_ID);
  if (!panel) return;
  panel.classList.toggle("open", !!on);
  panel.setAttribute("aria-hidden", on ? "false" : "true");
  // [#62 QA] THE VEIL, and it is the console's OWN pattern rather than a second one: the very
  // element and the very class the run drawer darkens the page with, toggled by the very same
  // `open` idiom. It is `position: fixed; inset: 0`, so it dims what is beneath it and resizes,
  // scrolls and re-lays-out none of it — which is why the operator chose it over splitting the
  // page into columns, and why criterion 1 survives it intact.
  const overlay = dsrById(DSR_OVERLAY_ID);
  if (overlay) overlay.classList.toggle("open", !!on);
}

// [#62 QA] A HEADER THAT IS ONE LINE CARRYING THREE THINGS. The operator's words: «el titulo no
// es amigable, mejor que sea un titulo y una etiqueta o dos niveles de titulo».
//
// The split is positional and nothing else: whatever follows the title's LAST separator becomes
// a label because of WHERE it sits, never because of what it says. This file does not know what
// a version is, or that the tail is one — a domain rule it must not learn. A tail long enough to
// be a phrase is not a label, so a title that merely contains a separator mid-sentence is left
// whole rather than beheaded.
const DSR_TITLE_SEPARATOR = " · ";
const DSR_LABEL_MAX = 24;

function dsrSplitTitle(title) {
  const whole = String(title == null ? "" : title).trim();
  const cut = whole.lastIndexOf(DSR_TITLE_SEPARATOR);
  if (cut <= 0) return { name: whole, label: "" };
  const name = whole.slice(0, cut).trim();
  const label = whole.slice(cut + DSR_TITLE_SEPARATOR.length).trim();
  if (!name || !label || label.length > DSR_LABEL_MAX) return { name: whole, label: "" };
  return { name, label };
}

function dsrSetHeader(title, path) {
  const split = dsrSplitTitle(title);
  const titleEl = dsrById(DSR_TITLE_ID);
  if (titleEl) titleEl.textContent = split.name;
  const labelEl = dsrById(DSR_LABEL_ID);
  // An empty label paints nothing at all: the stylesheet hides it on `:empty`, so a title with
  // no tail keeps exactly the header it always had.
  if (labelEl) labelEl.textContent = split.label;
  const pathEl = dsrById(DSR_PATH_ID);
  if (pathEl) pathEl.textContent = path || "";
}

// The jump, and it moves NOTHING but this panel's own scroller. `scrollTop` on the panel's box,
// never `scrollIntoView`, which walks up through every scrollable ancestor it can find — and one
// of those ancestors is the report the operator is standing in.
function dsrScrollTo(targetId) {
  const scroll = dsrById(DSR_SCROLL_ID);
  const target = targetId ? dsrById(String(targetId)) : null;
  if (!scroll || !target) return false;
  if (typeof target.offsetTop !== "number") return false;
  scroll.scrollTop = target.offsetTop;
  return true;
}

// [#63] THE INDEX COLUMN, and it is written on EVERY branch. The project's documents are always
// listed there — a document being open never replaces them — and the sections of the open
// document sit underneath. That is what «se pierde el indice» asked for: the index is a column of
// its own with a scroller of its own, so reading the document moves the document.
//
// The two blocks are written INDEPENDENTLY, and the list is written only when it actually
// changes: assigning the same list back would reset this column's scroll and lose the operator's
// place in a list of hundreds — the same defect one storey down.
//
// [#63 QA] The list now carries WHICH document is open, so it does change from one document to
// the next. The operator's place is kept anyway, and explicitly: the column's scroll is read
// before the write and put back after it. Emptying a box and refilling it lets the browser clamp
// an ancestor's scroll to a height that exists for an instant, and «se pierde el indice» is the
// one thing this reader may not do.
function dsrPaintIndex(model, indexPath, activePath) {
  const docs = dsrById(DSR_DOCS_ID);
  if (docs) {
    const html = dsrDocListHtml(model, { indexPath, activePath });
    if (docs.innerHTML !== html) {
      const column = dsrById(DSR_INDEX_ID);
      const place = column ? column.scrollTop : 0;
      docs.innerHTML = html;
      if (column && column.scrollTop !== place) column.scrollTop = place;
    }
  }
}

// Open the reader. With no `path`, on the project's list of documents; with one, on that
// document, jumping to `section` when — and only when — that section resolves.
//
// Returns what happened, in full, so the caller and the suite can see which of the branches ran
// without reading pixels.
async function openDocSideReader(options) {
  const opts = options || {};
  const body = dsrById(DSR_BODY_ID);
  if (!body) return { ok: false, view: "no_panel", path: "", section: "", resolved: false, reason: "no_panel", targetId: "" };
  dsrWire();
  const scroll = dsrById(DSR_SCROLL_ID);
  const model = dsrSource.model;
  const indexPath = dsrSource.indexPath;
  const path = typeof opts.path === "string" ? opts.path.trim() : "";
  const section = typeof opts.section === "string" ? opts.section.trim() : "";
  dsrShow(true);
  if (scroll) scroll.scrollTop = 0;
  // The row of the document being opened is marked at once, before it is fetched, so the menu
  // answers the press immediately. A path nobody indexed marks nothing, because no row has it.
  dsrPaintIndex(model, indexPath, path);

  // No document asked for: the index alone, and a reading column that points at it rather than
  // standing empty.
  if (!path) {
    dsrSetHeader("Documents of this project", indexPath);
    body.innerHTML = dsrPromptHtml();
    dsrState = { path: "", section: "", view: model.available ? "list" : "index_unavailable" };
    return { ok: model.available, view: dsrState.view, path: "", section: "", resolved: false, reason: "none", targetId: "" };
  }

  const doc = model.byPath.get(path) || null;
  if (!doc) {
    dsrSetHeader("Not a document of this project", path);
    body.innerHTML = dsrUnlistedHtml(path, indexPath);
    dsrState = { path, section, view: "unlisted" };
    return { ok: false, view: "unlisted", path, section, resolved: false, reason: "unlisted", targetId: "" };
  }

  dsrSetHeader(doc.title, doc.path);
  body.innerHTML = '<div class="dsr-loading">Reading the document…</div>';

  const url = `${dsrSource.base}${doc.path}`;
  let raw = null;
  let failure = "";
  try {
    const response = typeof fetch === "function" ? await fetch(url, { cache: "no-store" }) : null;
    if (!response) failure = "this page has no way to fetch the file";
    else if (response.ok) raw = await response.text();
    else failure = `HTTP ${response.status} ${response.statusText || ""}`.trim();
  } catch (error) {
    failure = (error && error.message) || "the request failed";
  }
  if (raw == null) {
    body.innerHTML = dsrReadFailureHtml(doc.path, url, failure);
    dsrState = { path: doc.path, section, view: "unreadable" };
    return { ok: false, view: "unreadable", path: doc.path, section, resolved: false, reason: "unreadable", targetId: "", detail: failure };
  }

  // ONE RENDERER: the console's own, called here. When the page has none, that is said in words
  // and no renderer is grown to replace it.
  const rendered = dsrRenderDocument(raw, doc.path);
  if (!rendered.available) {
    body.innerHTML = dsrNoRendererHtml(doc.path);
    dsrState = { path: doc.path, section, view: "no_renderer" };
    return { ok: false, view: "no_renderer", path: doc.path, section, resolved: false, reason: "no_renderer", targetId: "" };
  }

  const resolution = dsrResolveSection(rendered.headings, section);
  // The reading column carries the document and what could not be done with it. The index column
  // carries the sections — beside the document, never above it, so a jump cannot scroll it away.
  body.innerHTML =
    dsrUnresolvedHtml(resolution) +
    // The Docs tab's own reading container, so the document is painted by the one stylesheet
    // that already paints documents in this console.
    '<article class="docs-body">' + rendered.html + "</article>";
  // The same active row as the paint above, so the list html is unchanged and the guard skips the
  // write: one write per document opened, never two.
  dsrPaintIndex(model, indexPath, doc.path);
  dsrState = { path: doc.path, section, view: "document", headings: rendered.headings, resolution };
  if (resolution.resolved) dsrScrollTo(resolution.targetId);
  return {
    ok: true,
    view: "document",
    path: doc.path,
    section,
    resolved: resolution.resolved,
    reason: resolution.reason,
    targetId: resolution.targetId,
    headings: rendered.headings.length
  };
}

function closeDocSideReader() {
  const body = dsrById(DSR_BODY_ID);
  if (body) body.innerHTML = "";
  const docs = dsrById(DSR_DOCS_ID);
  if (docs) docs.innerHTML = "";
  dsrSetHeader("", "");
  dsrShow(false);
  dsrState = null;
}

function docSideReaderIsOpen() {
  return !!dsrState;
}

function docSideReaderState() {
  return dsrState;
}

// ---------------------------------------------------------------------------
// WIRED AT LOAD, and this line is a repair.
//
// The delegates above were registered from INSIDE openDocSideReader, so the button that opens
// the reader only started working after the reader had already been opened — a door wired from
// inside a room nobody could enter. The operator pressed Documents and nothing happened, and
// the suite was green while he did it, because every test reached the reader by CALLING
// openDocSideReader, which wired the page as a side effect of running.
//
// So it is wired here, once, when the script loads — the same idiom the console renderer uses
// at the foot of its own file. The script is deferred, so the panel's static markup is already
// parsed; `dsrWired` keeps it to exactly one registration however often this is reached, and
// the call left inside openDocSideReader is now only the second chance for a page that somehow
// loaded this file before the panel existed.
if (typeof document !== "undefined" && document.getElementById && document.getElementById(DSR_PANEL_ID)) {
  dsrWire();
}
