// RUN-CONSOLE-DOC-SIDE-READER-001 — THE SIDE READER. A document the operator can OPEN while he
// judges, and nothing else.
//
// WHY IT EXISTS, in the operator's own words (2026-08-27, during the QA of #61): «muchas veces
// confio en esa desicion pero a veces son desiciones de hace semanas y no las recuerdo, y si
// estan mal no tengo forma de auditarlas o revisarlas». A citation that cannot be opened cannot
// be AUDITED. Today a verdict is signed against a rule the signer cannot see without leaving the
// screen. So this file opens the rule BESIDE the report, never instead of it.
//
// IT IS A FILE OF ITS OWN for the same reason the report mount is: the console is domain-blind
// and its blindness is proved mechanically. A reader that must find a SECTION inside a document
// is exactly where a domain regex would be smuggled in, so the reader lives here, alone, and the
// same mechanical veto runs over it and its stylesheet.
//
// THE BLINDNESS LINE, and it is the one that decides whether this file is legal:
//
//   ALLOWED   — reading MARKDOWN HEADINGS. `#` at the start of a line is generic document
//               FORMAT, the same way `{` is generic JSON. A section index derived from headings
//               says nothing about what any project's documents are about.
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
// plausible and pretends" this run forbids. It opens the document at its index and SAYS which
// section it could not resolve.
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
// THE DOCUMENT — parsed ONCE into a section index and a body, so the two can never disagree
// about which heading is which. The ids are POSITIONAL (`dsr-h-<n>`) and not derived from the
// heading's words: a slug of the text would collide between two headings that say the same
// thing, and would be one more place this file could start reading meaning into words.
// ---------------------------------------------------------------------------

// Inline text with the markup taken off, for the index and for matching. Emphasis marks and code
// ticks are format; a link keeps its LABEL and loses its target, because this reader never
// navigates anywhere.
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

function dsrInline(raw) {
  let out = dsrEsc(raw);
  out = out.replace(/`([^`]+)`/g, (match, code) => "<code>" + code + "</code>");
  // A link keeps its words and loses its destination. This reader opens documents of the index
  // and nothing else; a live link inside a document would be a door out of it that nobody asked
  // for, and composing its URL would be this file inventing a route.
  out = out.replace(/\[([^\]]+)\]\(([^)\s]*)\)/g, (match, label) => '<span class="dsr-link-text">' + label + "</span>");
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(^|[\s(])\*([^*]+)\*/g, "$1<em>$2</em>");
  return out;
}

// Parse a markdown document into { headings, html }. ONE pass, so heading n of the index and the
// element carrying id `dsr-h-n` are the same heading by construction and not by agreement.
//
// Fenced blocks are tracked because a `#` inside a code fence is code, not a heading — the one
// piece of markdown grammar this file must honour to keep its index honest.
function dsrParseDocument(rawText) {
  const lines = String(rawText == null ? "" : rawText).split(/\r\n?|\n/);
  const headings = [];
  const html = [];
  let paragraph = [];
  let listTag = "";
  let listItem = null;
  let table = null;
  let fence = "";
  let fenceLines = null;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push("<p>" + dsrInline(paragraph.join(" ")) + "</p>");
    paragraph = [];
  };
  const flushListItem = () => {
    if (!listItem) return;
    html.push("<li>" + dsrInline(listItem.join(" ")) + "</li>");
    listItem = null;
  };
  const flushList = () => {
    flushListItem();
    if (!listTag) return;
    html.push("</" + listTag + ">");
    listTag = "";
  };
  const flushTable = () => {
    if (!table) return;
    const head = table.head.length
      ? "<thead><tr>" + table.head.map((cell) => "<th>" + dsrInline(cell) + "</th>").join("") + "</tr></thead>"
      : "";
    const body = table.rows.length
      ? "<tbody>" + table.rows.map((row) => "<tr>" + row.map((cell) => "<td>" + dsrInline(cell) + "</td>").join("") + "</tr>").join("") + "</tbody>"
      : "";
    html.push('<div class="dsr-table-wrap"><table class="dsr-table">' + head + body + "</table></div>");
    table = null;
  };
  const flushBlocks = () => {
    flushParagraph();
    flushList();
    flushTable();
  };
  const rowCells = (line) => line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());

  lines.forEach((line) => {
    const trimmed = line.trim();

    // Fenced code, verbatim and escaped. Nothing inside it is a heading, a list or a table.
    const fenceMark = /^(```+|~~~+)(.*)$/.exec(trimmed);
    if (fence) {
      if (fenceMark && trimmed.startsWith(fence)) {
        html.push('<pre class="dsr-code">' + dsrEsc(fenceLines.join("\n")) + "</pre>");
        fence = "";
        fenceLines = null;
      } else {
        fenceLines.push(line);
      }
      return;
    }
    if (fenceMark) {
      flushBlocks();
      fence = fenceMark[1];
      fenceLines = [];
      return;
    }

    if (!trimmed) {
      flushBlocks();
      return;
    }

    // THE HEADING. The whole reason this file may read a document at all.
    const heading = /^(#{1,6})\s+(.+?)\s*#*$/.exec(trimmed);
    if (heading) {
      flushBlocks();
      const plain = dsrPlainText(heading[2]);
      const entry = {
        level: heading[1].length,
        text: plain,
        id: "dsr-h-" + headings.length,
        label: dsrLeadingToken(plain)
      };
      headings.push(entry);
      html.push("<h" + entry.level + ' class="dsr-h dsr-h-l' + entry.level + '" id="' + entry.id + '">' +
        dsrInline(heading[2]) + "</h" + entry.level + ">");
      return;
    }

    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      flushBlocks();
      html.push("<hr>");
      return;
    }

    // A table row. The delimiter row (`|---|---|`) promotes the row before it to a header.
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      flushParagraph();
      flushList();
      const cells = rowCells(trimmed);
      if (!table) {
        table = { head: [], rows: [cells] };
        return;
      }
      if (table.rows.length === 1 && !table.head.length && cells.every((cell) => /^:?-{2,}:?$/.test(cell))) {
        table.head = table.rows.pop();
        return;
      }
      table.rows.push(cells);
      return;
    }
    flushTable();

    if (trimmed.startsWith(">")) {
      flushParagraph();
      flushList();
      html.push("<blockquote>" + dsrInline(trimmed.replace(/^>\s?/, "")) + "</blockquote>");
      return;
    }

    const ordered = /^\d+[.)]\s+(.*)$/.exec(trimmed);
    const unordered = /^[-*+]\s+(.*)$/.exec(trimmed);
    if (ordered || unordered) {
      flushParagraph();
      flushListItem();
      const wanted = ordered ? "ol" : "ul";
      if (listTag !== wanted) {
        flushList();
        html.push("<" + wanted + ">");
        listTag = wanted;
      }
      listItem = [ordered ? ordered[1] : unordered[1]];
      return;
    }

    // A non-blank line that opens no block while a list item is open belongs to that item.
    if (listTag && listItem) {
      listItem.push(trimmed);
      return;
    }
    paragraph.push(trimmed);
  });

  if (fence) html.push('<pre class="dsr-code">' + dsrEsc(fenceLines.join("\n")) + "</pre>");
  flushBlocks();
  return { headings, html: html.join("\n") };
}

function dsrHeadings(rawText) {
  return dsrParseDocument(rawText).headings;
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
  if (!model || !model.available) {
    return `
      <div class="dsr-absence">
        <div class="dsr-absence-line">The documents index of this project could not be read, so there is no list of documents to offer — neither that it has any nor that it has none.</div>
        ${indexPath ? `<div class="dsr-absence-path mono">${indexPath}</div>` : ""}
      </div>
    `;
  }
  if (!model.docs.length) {
    return `
      <div class="dsr-absence">
        <div class="dsr-absence-line">This project's documents index was read and lists no document.</div>
        ${indexPath ? `<div class="dsr-absence-path">Measured from <span class="mono">${indexPath}</span>.</div>` : ""}
      </div>
    `;
  }
  const rows = model.docs.map((doc) => `
    <button class="dsr-doc-row" type="button" data-dsr-doc="${dsrEsc(doc.path)}">
      <span class="dsr-doc-title">${dsrEsc(doc.title)}</span>
      <span class="dsr-doc-path mono">${dsrEsc(doc.path)}</span>
    </button>
  `).join("");
  return `
    <div class="dsr-doc-list">
      <div class="dsr-doc-list-head">${dsrEsc(`${model.docs.length} document${model.docs.length === 1 ? "" : "s"} indexed by this project`)}</div>
      ${rows}
      ${indexPath ? `<div class="dsr-doc-list-source">Listed by <span class="mono">${indexPath}</span>, and nothing outside it can be opened here.</div>` : ""}
    </div>
  `;
}

// The section index of the document on screen. Absent headings are stated, not hidden: a
// document with no headings has no sections to jump to, and that is a fact about the document.
function dsrSectionIndexHtml(headings) {
  const list = Array.isArray(headings) ? headings : [];
  if (!list.length) {
    return '<nav class="dsr-index is-empty" aria-label="Sections"><div class="dsr-index-empty">This document carries no headings, so it has no section index.</div></nav>';
  }
  const items = list.map((heading) => `
    <button class="dsr-index-item dsr-index-l${heading.level}" type="button" data-dsr-section="${dsrEsc(heading.id)}">${dsrEsc(heading.text)}</button>
  `).join("");
  return `<nav class="dsr-index" aria-label="Sections"><div class="dsr-index-title">Sections</div>${items}</nav>`;
}

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
      <div class="dsr-notice-line">The citation's section could not be resolved, so the document opened at its index instead of jumping.</div>
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
      ${indexPath ? `<div class="dsr-absence-path">The list below is what <span class="mono">${dsrEsc(indexPath)}</span> declares, and it is the whole of what can be opened here.</div>` : ""}
    </div>
  `;
}

// ---------------------------------------------------------------------------
// THE PANEL. Half the page, beside the report — never instead of it.
//
// It is an OVERLAY and not a column the report is squeezed into, and that is the whole of
// criterion 1: nothing under it is resized, re-laid-out or re-rendered when it opens, so the
// report cannot lose the operator's place in it. Closing it puts back a screen that never moved.
// ---------------------------------------------------------------------------

const DSR_PANEL_ID = "doc-side-reader";
const DSR_OVERLAY_ID = "doc-side-reader-overlay";
const DSR_TITLE_ID = "doc-side-reader-title";
const DSR_LABEL_ID = "doc-side-reader-label";
const DSR_PATH_ID = "doc-side-reader-path";
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
    if (el.closest("[data-dsr-list]")) {
      openDocSideReader({});
      return;
    }
    const row = el.closest("[data-dsr-doc]");
    if (row) {
      openDocSideReader({ path: row.getAttribute("data-dsr-doc") });
      return;
    }
    const jump = el.closest("[data-dsr-section]");
    if (jump) dsrScrollTo(jump.getAttribute("data-dsr-section"));
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

  // No document asked for: the list. Also the landing place of every refusal below, so the
  // operator is never left holding a panel with nothing in it.
  if (!path) {
    dsrSetHeader("Documents of this project", indexPath);
    body.innerHTML = dsrDocListHtml(model, { indexPath });
    dsrState = { path: "", section: "", view: model.available ? "list" : "index_unavailable" };
    return { ok: model.available, view: dsrState.view, path: "", section: "", resolved: false, reason: "none", targetId: "" };
  }

  const doc = model.byPath.get(path) || null;
  if (!doc) {
    dsrSetHeader("Not a document of this project", path);
    body.innerHTML = dsrUnlistedHtml(path, indexPath) + dsrDocListHtml(model, { indexPath });
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

  const parsed = dsrParseDocument(raw);
  const resolution = dsrResolveSection(parsed.headings, section);
  body.innerHTML =
    dsrUnresolvedHtml(resolution) +
    dsrSectionIndexHtml(parsed.headings) +
    '<article class="dsr-document">' + parsed.html + "</article>";
  dsrState = { path: doc.path, section, view: "document", headings: parsed.headings, resolution };
  if (resolution.resolved) dsrScrollTo(resolution.targetId);
  return {
    ok: true,
    view: "document",
    path: doc.path,
    section,
    resolved: resolution.resolved,
    reason: resolution.reason,
    targetId: resolution.targetId,
    headings: parsed.headings.length
  };
}

function closeDocSideReader() {
  const body = dsrById(DSR_BODY_ID);
  if (body) body.innerHTML = "";
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
