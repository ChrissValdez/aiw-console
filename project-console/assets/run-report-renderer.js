// RUN-CONSOLE-REPORT-RENDERER-001 — the ONE renderer that turns any conformant report.json
// into the review surface. It lives here, once, and the console executes it; no project takes
// a copy (CONTRATO §9). The prototype at design/run-review-prototype.html specifies LOOK and
// BEHAVIOUR; this file follows the console's own idiom: a classic script, template literals,
// innerHTML, zero dependencies.
//
// THE RULE THAT GOVERNS EVERY OTHER ONE: this renderer knows NOTHING about any domain. There
// is no branch on a project name, no fixed label naming a subject, no branch on an item's
// `type` value. Everything paints by PRESENCE OF FIELDS, and everything specific arrives in
// the data. The domain-blind suite (run-report-domain-blind) proves it mechanically against
// the four shipped fixtures — including that no word of theirs appears in this file.
//
// What it deliberately does NOT do (ticket #52): it does not write verdict.json to the repo
// (#54 adds the endpoint — the sign button downloads to the operator's machine, exactly as the
// prototype does), it does not add the console tab or the route from the run (#53), and it
// does not validate the report against the contract. A report that does not parse produces an
// honest message, never a blank surface; a missing optional block paints as "not declared",
// which is a different fact from an empty one ("none").

// ---------------------------------------------------------------------------
// Closed vocabularies. The verdict set is the SAME three the kernel already
// parses at aiw/kernel.mjs:213 — never per-report, never per-item. Any custom
// per-item verdict vocabulary a report carries is drift and is ignored.
// ---------------------------------------------------------------------------
const RR_VERDICTS = ["APPROVED", "CHANGES_REQUIRED", "BLOCKED"];
const RR_DEFAULT_DISPOSITIONS = ["new_run", "operator_fixed", "discard"];

// Chrome strings only — never the report's own content. Both languages come from the
// prototype verbatim; the report's text renders as-is in whatever language it was written.
const RR_STRINGS = {
  en: {
    appTitle: "Run review", gate: "gate", prev: "Previous (←)", next: "Next (→)",
    langTitle: "Interface language", themeTitle: "Switch theme", index: "Index",
    all: "All", pending: "Pending", stops: "Stops",
    stopPoint: "stop point", containsStop: "contains a stop",
    expected: "What to expect", optionsConsidered: "Paths considered — mark the one you pick",
    before: "before", after: "after", whatExistsNow: "What exists now", noPriorVersion: "no prior version",
    unchanged: "Unchanged:", reasoning: "The reasoning", references: "Reference cases",
    ifRejected: "If rejected", andThen: "And then", orWriteAnother: "or write another…",
    notePlaceholder: "Note (optional)",
    questionItem: "What is your verdict?",
    questionDecision: "The executor decided this on its own. Do you ratify it?",
    questionRun: "What is your verdict on the run?", questionRunMechanical: "Do you accept these findings?",
    pendingTag: "pending", runVerdict: "Run verdict", runGroup: "the run",
    decisionsGroup: "decisions to ratify", decisionType: "executor decision", runType: "the run", itemType: "item",
    ifAccepted: "if accepted", ifRejectedScope: "if rejected",
    signLabel: "verdict_by — who signs", signPlaceholder: "Type your name to sign",
    writeVerdict: "Write verdict.json", previewOutput: "Preview what would be written",
    runContext: "Run context", metadata: "Run metadata", deviation: "The emitter declares a deviation",
    countsFiles: "Counts and files", gateVerification: "Gate and verification",
    blindSpots: "Blind spots", alternatives: "Discarded alternatives", unreviewed: "Unreviewed",
    notDeclared: "not declared", none: "none", noVerification: "no verification",
    absent: "The report does not carry this field: nobody looked.",
    compare: "Compare",
    parseError: "This report could not be read as JSON.",
    parseErrorHint: "The file on disk is the authority. Nothing below is rendered because nothing could be parsed:",
    pendingLeft: (n) => n + " still without a verdict. The run verdict does not replace them.",
    missingVerdicts: (n) => n + (n === 1 ? " verdict" : " verdicts"), missingSignature: "the signature",
    missingPrefix: "Missing ", complete: "Complete. It downloads to your machine.", and: " and "
  },
  es: {
    appTitle: "Revisión de run", gate: "compuerta", prev: "Anterior (←)", next: "Siguiente (→)",
    langTitle: "Idioma de la interfaz", themeTitle: "Cambiar tema", index: "Índice",
    all: "Todos", pending: "Pendientes", stops: "Paradas",
    stopPoint: "punto de parada", containsStop: "contiene una parada",
    expected: "Qué se espera ver", optionsConsidered: "Caminos considerados — señala cuál eliges",
    before: "antes", after: "después", whatExistsNow: "Lo que existe ahora", noPriorVersion: "sin versión anterior",
    unchanged: "No cambió:", reasoning: "El razonamiento", references: "Casos de referencia",
    ifRejected: "Si se rechaza", andThen: "Y después", orWriteAnother: "o escribe otra…",
    notePlaceholder: "Nota (opcional)",
    questionItem: "¿Qué veredicto le das?",
    questionDecision: "El ejecutor lo decidió por su cuenta. ¿Lo ratificas?",
    questionRun: "¿Qué veredicto le das al run?", questionRunMechanical: "¿Aceptas estos hallazgos?",
    pendingTag: "pendiente", runVerdict: "Veredicto del run", runGroup: "el run",
    decisionsGroup: "decisiones a ratificar", decisionType: "decisión del ejecutor", runType: "el run", itemType: "ítem",
    ifAccepted: "si se adopta", ifRejectedScope: "si se rechaza",
    signLabel: "verdict_by — quién firma", signPlaceholder: "Escribe tu nombre al firmar",
    writeVerdict: "Escribir verdict.json", previewOutput: "Ver lo que se escribiría",
    runContext: "Contexto del run", metadata: "Metadatos del run", deviation: "El emisor declara una desviación",
    countsFiles: "Recuentos y ficheros", gateVerification: "Compuerta y verificación",
    blindSpots: "Puntos ciegos", alternatives: "Alternativas descartadas", unreviewed: "Sin revisar",
    notDeclared: "sin declarar", none: "ninguno", noVerification: "sin verificación",
    absent: "El reporte no trae este campo: nadie lo miró.",
    compare: "Comparar",
    parseError: "Este reporte no se pudo leer como JSON.",
    parseErrorHint: "El fichero en disco es la autoridad. Abajo no se pinta nada porque nada se pudo parsear:",
    pendingLeft: (n) => "Quedan " + n + " sin veredicto. El del run no los sustituye.",
    missingVerdicts: (n) => n + (n === 1 ? " veredicto" : " veredictos"), missingSignature: "la firma",
    missingPrefix: "Faltan ", complete: "Completo. Se descarga en tu equipo.", and: " y "
  }
};
const RR_DISPOSITION_GLOSS = {
  en: { new_run: "another run fixes it", operator_fixed: "I fix it myself", discard: "discard it" },
  es: { new_run: "otro run lo arregla", operator_fixed: "lo arreglo yo", discard: "se descarta" }
};

function rrT(lang) {
  return RR_STRINGS[lang] || RR_STRINGS.en;
}

// Self-contained escape: this file must not depend on project-console.js load order.
function rrEsc(value) {
  if (value == null) return "";
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

// Inline SVGs, the console's own icon idiom (see index.html) — the prototype used the
// Phosphor icon font, an external dependency this console does not take.
function rrIcon(name) {
  const P = {
    "hand-palm": '<path d="M18 11V6a2 2 0 0 0-4 0v1V4.5a2 2 0 0 0-4 0V7 5.5a2 2 0 0 0-4 0V12l-1.6-2.2a2 2 0 0 0-3.2 2.4L5.5 18A6 6 0 0 0 11 22h2a6 6 0 0 0 6-6v-5a1 1 0 0 0-1-1z"/>',
    "arrow-left": '<path d="M19 12H5M12 19l-7-7 7-7"/>',
    "arrow-right": '<path d="M5 12h14M12 5l7 7-7 7"/>',
    "arrow-up-left": '<path d="M9 14 4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',
    "arrow-u-left": '<path d="M9 14 4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',
    "caret": '<path d="M9 6l6 6-6 6"/>',
    "equals": '<path d="M5 9h14M5 15h14"/>',
    "seal-check": '<path d="M12 2l2.4 2.4H18v3.6L20.4 12 18 14.4V18h-3.6L12 20.4 9.6 18H6v-3.6L3.6 12 6 9.6V6h3.6z"/><path d="M9 12l2 2 4-4"/>',
    "warning": '<circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/>',
    "file-dashed": '<path d="M14 3v5h5M9 3H7a2 2 0 0 0-2 2v2m0 4v2m0 4v1a2 2 0 0 0 2 2h1m4 0h2a2 2 0 0 0 2-2v-2m0-4v-2"/><path d="M14 3l5 5"/>',
    "download": '<path d="M12 3v12M7 10l5 5 5-5M4 19h16"/>',
    "sun": '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    "moon": '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
    "flag": '<path d="M4 21V4h12l-2 4 2 4H4"/>'
  };
  const body = P[name] || "";
  return '<svg class="rr-ic rr-ic-' + name + '" viewBox="0 0 24 24" width="14" height="14" fill="none" ' +
    'stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + body + "</svg>";
}

// ---------------------------------------------------------------------------
// Pure model — everything below reads the report by FIELD PRESENCE and never
// by domain. These functions are the tested surface; the DOM layer only
// arranges what they return.
// ---------------------------------------------------------------------------

// Honest parse. A report.json that does not parse must produce a message, never a blank
// screen (ticket criterion 7), so the error travels as data instead of throwing.
function rrParseReport(input) {
  if (input == null) return { report: null, error: "empty input" };
  if (typeof input === "object") return { report: input, error: null };
  try {
    const parsed = JSON.parse(String(input));
    if (parsed == null || typeof parsed !== "object") {
      return { report: null, error: "the JSON root is not an object" };
    }
    return { report: parsed, error: null };
  } catch (err) {
    return { report: null, error: err && err.message ? err.message : String(err) };
  }
}

function rrItems(report) {
  return Array.isArray(report && report.items) ? report.items : [];
}

function rrItemById(report, id) {
  return rrItems(report).find((it) => it && it.item_id === id);
}

// A parent may LIST its children (`children: [ids]`) or the children may point up
// (`parent: id`); the listed form wins, exactly as the prototype resolves it.
function rrChildrenOf(report, item) {
  const listed = (Array.isArray(item.children) ? item.children : [])
    .map((id) => rrItemById(report, id)).filter(Boolean);
  if (listed.length) return listed;
  return rrItems(report).filter((it) => it && it.parent === item.item_id);
}

function rrHasStopInside(report, item) {
  return rrChildrenOf(report, item).some((child) => child && child.stop);
}

// ONE STEP = one thing that asks for a verdict: every item (a parent AND each child — an
// item with children is N+1 entries, because each one is signed apart and the counter has
// to add up), every self-decision of the executor, and, last, the run itself. Stop items
// go first; a parent whose child is a stop travels with them.
function rrSteps(report, T) {
  const tops = rrItems(report).filter((it) => it && !it.parent);
  const stopish = (it) => !!it.stop || rrHasStopInside(report, it);
  const ordered = tops.filter(stopish).concat(tops.filter((it) => !stopish(it)));
  const out = [];
  ordered.forEach((top) => {
    out.push({ kind: "item", id: top.item_id, data: top, group: top.type || T.itemType, depth: 0 });
    rrChildrenOf(report, top).forEach((child) => {
      out.push({ kind: "item", id: child.item_id, data: child, group: top.type || T.itemType, depth: 1 });
    });
  });
  const decisions = Array.isArray(report && report.self_decisions) ? report.self_decisions : [];
  decisions.forEach((dec, n) => {
    out.push({ kind: "decision", id: dec.decision_id || "SD" + (n + 1), data: dec, group: T.decisionsGroup, depth: 0 });
  });
  out.push({ kind: "run", id: "__run__", data: null, group: T.runGroup, depth: 0 });
  return out;
}

function rrLines(value) {
  if (value == null) return [];
  if (Array.isArray(value)) return value.map((x) => (typeof x === "object" && x !== null ? JSON.stringify(x) : String(x)));
  if (typeof value === "object") return Object.entries(value).map(([k, x]) => k + ": " + x);
  return [String(value)];
}

// The before/after model, decided by presence alone: both absent — nothing; only after —
// "what exists now" (creation); both scalar — a changed pair; objects — a union of keys
// compared line by line, with a dimmed dash where one side has nothing.
function rrBuildDiff(before, after) {
  const hasB = before != null, hasA = after != null;
  if (!hasB && !hasA) return { pair: false, onlyAfter: false, rows: [] };
  if (!hasB) {
    const isObj = typeof after === "object" && !Array.isArray(after);
    const rows = isObj
      ? Object.keys(after).map((k) => ({ key: k, showKey: true, B: [], A: rrLines(after[k]).map((t) => ({ t, changed: false, dash: false })) }))
      : [{ key: "", showKey: false, B: [], A: rrLines(after).map((t) => ({ t, changed: false, dash: false })) }];
    return { pair: false, onlyAfter: true, rows };
  }
  const bObj = typeof before === "object" && !Array.isArray(before);
  const aObj = typeof after === "object" && !Array.isArray(after);
  if (!bObj && !aObj) {
    return {
      pair: true, onlyAfter: false,
      rows: [{
        key: "", showKey: false,
        B: rrLines(before).map((t) => ({ t, changed: true, dash: false })),
        A: rrLines(after).map((t) => ({ t, changed: true, dash: false }))
      }]
    };
  }
  const keys = [...new Set([...Object.keys(bObj ? before : {}), ...Object.keys(aObj ? after : {})])];
  const dash = { t: "—", changed: false, dash: true };
  const rows = keys.map((k) => {
    const bl = rrLines(bObj ? before[k] : null);
    const al = rrLines(aObj ? after[k] : null);
    const B = bl.length ? bl.map((t, i) => ({ t, changed: t !== al[i], dash: false })) : [dash];
    const A = al.length ? al.map((t, i) => ({ t, changed: t !== bl[i], dash: false })) : [dash];
    return { key: k, showKey: true, B, A };
  });
  return { pair: true, onlyAfter: false, rows };
}

// Authority has exactly two declared forms (a prior document, or an invented criterion that
// names its decision item); anything else prints its own keys rather than being guessed at.
function rrAuthorityText(authority) {
  if (!authority) return "";
  if (authority.source) return authority.source + (authority.section ? " · " + authority.section : "");
  if (authority.invented_by) {
    return authority.invented_by + " — " + (authority.why_invented || "") +
      (authority.decision_item ? " · " + authority.decision_item : "");
  }
  return Object.entries(authority).map(([k, v]) => k + ": " + v).join(" · ");
}

// EMPTY IS NOT ABSENT. `[]` was enumerated and there was nothing — "none". A missing key
// means nobody looked — "not declared" — and the view says which (ticket criterion 5).
function rrEmptyBadge(present, count, T) {
  if (!present) return { badge: T.notDeclared, cls: "rr-badge-absent" };
  if (count === 0) return { badge: T.none, cls: "rr-badge-empty" };
  return { badge: String(count), cls: "rr-badge-count" };
}

function rrKvEntries(arr) {
  return (Array.isArray(arr) ? arr : []).map((entry) => ({
    rows: Object.entries(entry || {})
      .filter(([, v]) => v != null && !(Array.isArray(v) && v.length === 0))
      .map(([k, v]) => ({ k, v: typeof v === "object" ? JSON.stringify(v) : String(v) }))
  }));
}

// One record per step id: verdict (closed set), disposition (a SECOND step, and only with
// CHANGES_REQUIRED), chosen_option (a decision's path pick — a datum APART from the verdict,
// never a fourth verdict), note.
function rrRec(state, id) {
  return state.v[id] || {};
}

function rrSetRec(state, id, patch) {
  state.v[id] = Object.assign({}, state.v[id] || {}, patch);
}

function rrRecOut(state, id) {
  const r = rrRec(state, id);
  return {
    verdict: r.verdict || null,
    disposition: r.verdict === "CHANGES_REQUIRED" ? (r.disposition || (r.dispOther ? r.dispOther.trim() : null)) : null,
    chosen_option: r.chosenOption || null,
    note: r.note || null
  };
}

// What #54's endpoint will receive. `verdict_by` is whatever the operator TYPED — the
// signer's name is never a constant in this code, and an empty box signs nothing.
// `decided_at` stays null here: the writer stamps it, not the view.
function rrVerdictOutput(report, state) {
  const R = report || {};
  const decisions = Array.isArray(R.self_decisions) ? R.self_decisions : [];
  return {
    schema_version: 1,
    run_id: R.run_id != null ? R.run_id : null,
    project: R.project != null ? R.project : null,
    source_commit: R.source_commit != null ? R.source_commit : null,
    gate: R.gate != null ? R.gate : null,
    verdict_by: (state.reviewer || "").trim() || null,
    decided_at: null,
    run: rrRecOut(state, "__run__"),
    items: rrItems(R).map((it) => Object.assign({ item_id: it.item_id }, rrRecOut(state, it.item_id))),
    self_decisions: decisions.map((dec, n) =>
      Object.assign({ decision_id: dec.decision_id || null, index: n }, rrRecOut(state, dec.decision_id || "SD" + (n + 1))))
  };
}

function rrProgress(report, state, T) {
  const steps = rrSteps(report, T);
  const done = steps.filter((s) => rrRec(state, s.id).verdict).length;
  return { done, total: steps.length };
}

// What still blocks the signature, by name. No gesture empties this list wholesale:
// the only way it drains is one verdict at a time, plus a typed name.
function rrMissing(report, state, T) {
  const { done, total } = rrProgress(report, state, T);
  const missing = [];
  if (done < total) missing.push(T.missingVerdicts(total - done));
  if (!(state.reviewer || "").trim()) missing.push(T.missingSignature);
  return missing;
}

// ---------------------------------------------------------------------------
// HTML templates. Strings in, strings out; every report value passes rrEsc.
// ---------------------------------------------------------------------------

function rrDotHtml(decided) {
  return '<span class="rr-dot' + (decided ? " rr-dot-on" : "") + '"></span>';
}

function rrTagHtml(text, cls) {
  return '<span class="rr-tag ' + (cls || "") + '">' + rrEsc(text) + "</span>";
}

function rrVerdictBarHtml(id, rec, question, dispositionOptions, T, lang) {
  const gloss = RR_DISPOSITION_GLOSS[lang] || RR_DISPOSITION_GLOSS.en;
  const disp = (Array.isArray(dispositionOptions) && dispositionOptions.length) ? dispositionOptions : RR_DEFAULT_DISPOSITIONS;
  const buttons = RR_VERDICTS.map((v) =>
    '<button type="button" class="rr-btn rr-btn-mono ' + (rec.verdict === v ? "rr-btn-primary" : "rr-btn-secondary") +
    '" data-rr-act="verdict" data-rr-id="' + rrEsc(id) + '" data-rr-value="' + rrEsc(v) + '">' + rrEsc(v) + "</button>").join("");
  const needsDisposition = rec.verdict === "CHANGES_REQUIRED";
  const dispButtons = disp.map((d) =>
    '<button type="button" class="rr-btn ' + (rec.disposition === d ? "rr-btn-primary" : "rr-btn-secondary") +
    '" data-rr-act="disposition" data-rr-id="' + rrEsc(id) + '" data-rr-value="' + rrEsc(d) +
    '" title="' + rrEsc(gloss[d] || "") + '">' + rrEsc(d) + "</button>").join("");
  return '<div class="rr-verdict-bar">' +
    '<div class="rr-verdict-row"><span class="rr-question">' + rrEsc(question) + '</span>' +
    '<div class="rr-verdict-btns">' + buttons + "</div></div>" +
    (needsDisposition
      ? '<div class="rr-disposition"><span class="rr-and-then">' + rrEsc(T.andThen) + "</span>" +
        '<div class="rr-disposition-btns">' + dispButtons +
        '<input class="rr-input rr-disp-other" data-rr-act="disp-other" data-rr-id="' + rrEsc(id) +
        '" placeholder="' + rrEsc(T.orWriteAnother) + '" value="' + rrEsc(rec.dispOther || "") + '"></div></div>'
      : "") +
    '<input class="rr-input rr-note" data-rr-act="note" data-rr-id="' + rrEsc(id) +
    '" placeholder="' + rrEsc(T.notePlaceholder) + '" value="' + rrEsc(rec.note || "") + '">' +
    "</div>";
}

function rrDiffLinesHtml(entries) {
  return entries.map((line) =>
    '<div class="rr-line' + (line.changed ? " rr-line-changed" : "") + (line.dash ? " rr-line-dash" : "") + '">' +
    rrEsc(line.t) + "</div>").join("");
}

function rrPreviewsHtml(id, previews, tab, previewStatus, T) {
  const compareIdx = previews.length;
  const comparing = tab === compareIdx && previews.length > 1;
  const start = Math.min(tab, Math.max(0, previews.length - 1));
  const shown = comparing ? previews : previews.slice(start, start + 1);
  const tabs = previews.map((p, i) =>
    '<label class="rr-seg-opt"><input type="radio" name="rr-prev-' + rrEsc(id) + '"' + (tab === i ? " checked" : "") +
    ' data-rr-act="preview-tab" data-rr-id="' + rrEsc(id) + '" data-rr-value="' + i + '">' + rrEsc(p.label || p.target || "") + "</label>")
    .concat(previews.length > 1
      ? ['<label class="rr-seg-opt"><input type="radio" name="rr-prev-' + rrEsc(id) + '"' + (comparing ? " checked" : "") +
         ' data-rr-act="preview-tab" data-rr-id="' + rrEsc(id) + '" data-rr-value="' + compareIdx + '">' + rrEsc(T.compare) + "</label>"]
      : []).join("");
  const panes = shown.map((p) => {
    const ok = previewStatus[p.path] === "ok";
    const frameCls = comparing ? "rr-frame rr-frame-compare" : "rr-frame";
    return '<div class="rr-pane">' +
      '<div class="rr-pane-head"><span class="rr-pane-label">' + rrEsc(p.label || p.target || "") + "</span>" +
      '<span class="rr-pane-path" title="' + rrEsc(p.path || "") + '">' + rrEsc(p.path || "") + "</span></div>" +
      (ok
        ? '<iframe class="' + frameCls + '" src="' + rrEsc(p.src || p.path || "") + '" title="' + rrEsc(p.label || p.target || "") + '"></iframe>'
        : '<div class="' + frameCls + ' rr-frame-missing">' + rrIcon("file-dashed") +
          '<span class="rr-pane-missing-path">' + rrEsc(p.path || "") + "</span></div>") +
      "</div>";
  }).join("");
  return '<div class="rr-previews">' +
    '<div class="rr-seg rr-preview-tabs">' + tabs + "</div>" +
    '<div class="rr-preview-grid' + (comparing ? " rr-preview-grid-compare" : "") + '">' + panes + "</div></div>";
}

// The card for one ITEM. Every section paints by presence of its field and only by that;
// `type` is displayed as data and never branched on.
function rrCardForItemHtml(report, item, state, T) {
  const id = item.item_id;
  const rec = rrRec(state, id);
  const subj = item.subject || {};
  const loc = item.location || {};
  const parent = item.parent ? rrItemById(report, item.parent) : null;
  const inherits = !item.stop && rrHasStopInside(report, item);
  const diff = rrBuildDiff(item.before, item.after);
  const noBefore = item.before === null || item.before === undefined;

  // In `create` mode the rendered artefact IS the subject and is read whole: the previews
  // travel with the subject, and a child without its own inherits the parent's for context.
  const own = (subj.previews && subj.previews.length) ? subj.previews : null;
  const previews = own || ((parent && parent.subject && parent.subject.previews) || []);
  const tab = state.previewTab[id] != null ? state.previewTab[id] : (previews.length > 1 ? previews.length : 0);

  const tags = [rrTagHtml(item.type || T.itemType, "rr-tag-neutral")];
  if (item.stop) tags.push('<span class="rr-tag rr-tag-outline rr-tag-stop">' + rrIcon("hand-palm") + rrEsc(T.stopPoint) + "</span>");
  if (inherits) tags.push('<span class="rr-tag rr-tag-outline rr-tag-stop rr-tag-stop-dim">' + rrIcon("hand-palm") + rrEsc(T.containsStop) + "</span>");
  if (parent) {
    tags.push('<span class="rr-parent-link" data-rr-act="goto" data-rr-id="' + rrEsc(parent.item_id) + '">' +
      rrIcon("arrow-up-left") + rrEsc((parent.subject && parent.subject.label) || parent.item_id) + "</span>");
  }
  if (loc.path) {
    const seg = String(loc.path).split("/").pop() + (loc.line != null ? " : " + loc.line : "");
    tags.push('<span class="rr-loc" title="' + rrEsc(loc.path) + '">' + rrEsc(seg) + "</span>");
  }

  const statusChip = rec.verdict
    ? '<span class="rr-tag rr-tag-accent rr-status rr-status-set">' + rrEsc(rec.verdict) + "</span>"
    : '<span class="rr-tag rr-tag-neutral rr-status">' + rrEsc(T.pendingTag) + "</span>";

  const subjectLine = (subj.label || subj.id)
    ? '<div class="rr-subject-line"><span class="rr-subject-label">' + rrEsc(subj.label || subj.id || id) + "</span>" +
      (subj.id && subj.label && subj.id !== subj.label
        ? '<span class="rr-subject-id">' + rrEsc(subj.id) + "</span>" : "") + "</div>"
    : "";

  const sections = [];
  if (previews.length > 0) sections.push(rrPreviewsHtml(id, previews, tab, state.previewStatus, T));
  if (item.expected) {
    sections.push('<div class="rr-expected"><span class="rr-kicker">' + rrEsc(T.expected) + "</span>" +
      '<p class="rr-prose">' + rrEsc(item.expected) + "</p></div>");
  }
  if (Array.isArray(item.options_considered) && item.options_considered.length > 0) {
    const cards = item.options_considered.map((option) => {
      const sel = rec.chosenOption === option;
      return '<div class="rr-option-card' + (sel ? " rr-option-card-sel" : "") +
        '" data-rr-act="chosen-option" data-rr-id="' + rrEsc(id) + '" data-rr-value="' + rrEsc(option) + '">' +
        '<span class="rr-option-dot' + (sel ? " rr-option-dot-sel" : "") + '"></span>' +
        '<span class="rr-option-label">' + rrEsc(option) + "</span></div>";
    }).join("");
    sections.push('<div class="rr-options-considered"><span class="rr-kicker">' + rrEsc(T.optionsConsidered) + "</span>" +
      '<div class="rr-option-grid">' + cards + "</div></div>");
  }
  if (item.statement) {
    const optionRows = (Array.isArray(item.options) ? item.options : []).map((opt, i) =>
      '<div class="rr-content-option"><span class="rr-content-option-n">' + (i + 1) + '.</span>' +
      '<span class="rr-content-option-t">' + rrEsc(opt) + "</span></div>").join("");
    sections.push('<div class="rr-content"><div class="rr-statement">' + rrEsc(item.statement) + "</div>" +
      (optionRows ? '<div class="rr-content-options">' + optionRows + "</div>" : "") + "</div>");
  }
  if (diff.pair) {
    const rows = diff.rows.map((row) =>
      '<div class="rr-diff-row">' +
      (row.showKey ? '<div class="rr-diff-key">' + rrEsc(row.key) + "</div>" : "") +
      '<div class="rr-diff-pair"><div class="rr-diff-side">' + rrDiffLinesHtml(row.B) + "</div>" +
      '<div class="rr-diff-side">' + rrDiffLinesHtml(row.A) + "</div></div></div>").join("");
    sections.push('<div class="rr-diff"><div class="rr-diff-heads"><span class="rr-kicker">' + rrEsc(T.before) +
      '</span><span class="rr-kicker rr-kicker-accent">' + rrEsc(T.after) + "</span></div>" + rows + "</div>");
  }
  if (diff.onlyAfter) {
    const rows = diff.rows.map((row) =>
      '<div class="rr-diff-row">' +
      (row.showKey ? '<div class="rr-diff-key">' + rrEsc(row.key) + "</div>" : "") +
      '<div class="rr-diff-side">' + rrDiffLinesHtml(row.A) + "</div></div>").join("");
    sections.push('<div class="rr-diff"><div class="rr-diff-heads-single"><span class="rr-kicker rr-kicker-accent">' +
      rrEsc(T.whatExistsNow) + "</span>" +
      (noBefore ? '<span class="rr-no-prior">' + rrEsc(T.noPriorVersion) + "</span>" : "") +
      "</div>" + rows + "</div>");
  }
  if (Array.isArray(item.unchanged) && item.unchanged.length > 0) {
    sections.push('<div class="rr-unchanged"><span class="rr-unchanged-label">' + rrIcon("equals") + rrEsc(T.unchanged) + "</span>" +
      item.unchanged.map((u) => rrTagHtml(u, "rr-tag-neutral")).join("") + "</div>");
  }

  const reasoningParts = [];
  if (item.why) reasoningParts.push('<p class="rr-why">' + rrEsc(item.why) + "</p>");
  if (item.authority) {
    reasoningParts.push('<div class="rr-authority">' + rrIcon("seal-check") +
      "<span>" + rrEsc(rrAuthorityText(item.authority)) + "</span></div>");
  }
  if (Array.isArray(item.evidence) && item.evidence.length > 0) {
    reasoningParts.push('<ul class="rr-evidence">' +
      item.evidence.map((ev) => "<li>" + rrEsc(ev) + "</li>").join("") + "</ul>");
  }
  if (Array.isArray(item.comparisons) && item.comparisons.length > 0) {
    const comparisons = item.comparisons.map((cp) => {
      const cpOptions = (Array.isArray(cp.options) ? cp.options : []).map((opt, i) =>
        '<div class="rr-content-option"><span class="rr-content-option-n">' + (i + 1) + '.</span>' +
        '<span class="rr-content-option-t">' + rrEsc(opt) + "</span></div>").join("");
      return '<div class="rr-comparison">' +
        '<div class="rr-comparison-head">' + rrTagHtml(cp.role || "", "rr-tag-accent2") +
        '<span class="rr-comparison-label">' + rrEsc(cp.label || "") + "</span></div>" +
        (cp.text ? '<div class="rr-comparison-text">' + rrEsc(cp.text) + "</div>" : "") +
        (cpOptions ? '<div class="rr-content-options">' + cpOptions + "</div>" : "") +
        (cp.note ? '<p class="rr-comparison-note">' + rrEsc(cp.note) + "</p>" : "") +
        "</div>";
    }).join("");
    reasoningParts.push('<div class="rr-comparisons"><span class="rr-kicker">' + rrEsc(T.references) + "</span>" + comparisons + "</div>");
  }
  if (reasoningParts.length) {
    sections.push('<details class="rr-reasoning" open><summary>' + rrIcon("caret") + rrEsc(T.reasoning) + "</summary>" +
      '<div class="rr-reasoning-body">' + reasoningParts.join("") + "</div></details>");
  }
  if (item.if_rejected) {
    sections.push('<div class="rr-if-rejected' + (noBefore ? " rr-if-rejected-hard" : "") + '">' +
      '<div class="rr-kicker rr-kicker-accent">' + rrIcon("arrow-u-left") + rrEsc(T.ifRejected) + "</div>" +
      '<p class="rr-prose">' + rrEsc(item.if_rejected) + "</p></div>");
  }

  // The disposition options may travel with the item (`verdict_disposition_options`); the
  // VERDICT vocabulary never does.
  sections.push(rrVerdictBarHtml(id, rec, T.questionItem, item.verdict_disposition_options, T, state.lang));

  const cardCls = "rr-card" + (item.stop ? " rr-card-stop" : "") + (inherits ? " rr-card-inherit" : "");
  return '<div class="' + cardCls + '" id="rr-it-' + rrEsc(id) + '">' +
    '<div class="rr-card-head">' +
    '<div class="rr-card-head-main">' +
    '<div class="rr-tag-row">' + tags.join("") + "</div>" +
    '<div class="rr-headline">' + rrEsc(item.headline || "") + "</div>" + subjectLine +
    "</div>" + statusChip + "</div>" +
    '<div class="rr-card-body">' + sections.join("") + "</div></div>";
}

// The card for one SELF-DECISION of the executor: the reasoning is the subject.
function rrCardForDecisionHtml(decision, id, state, T) {
  const rec = rrRec(state, id);
  const scopeRows = Object.entries(decision)
    .filter(([k]) => k.indexOf("scope_") === 0)
    .map(([k, v]) => ({
      k: k === "scope_if_accepted" ? T.ifAccepted : k === "scope_if_rejected" ? T.ifRejectedScope : k.replace(/_/g, " "),
      v: String(v)
    }));
  const statusChip = rec.verdict
    ? '<span class="rr-tag rr-tag-accent rr-status rr-status-set">' + rrEsc(rec.verdict) + "</span>"
    : '<span class="rr-tag rr-tag-neutral rr-status">' + rrEsc(T.pendingTag) + "</span>";

  const sections = [];
  if (Array.isArray(decision.options_considered) && decision.options_considered.length > 0) {
    const cards = decision.options_considered.map((option) => {
      const sel = rec.chosenOption === option;
      return '<div class="rr-option-card' + (sel ? " rr-option-card-sel" : "") +
        '" data-rr-act="chosen-option" data-rr-id="' + rrEsc(id) + '" data-rr-value="' + rrEsc(option) + '">' +
        '<span class="rr-option-dot' + (sel ? " rr-option-dot-sel" : "") + '"></span>' +
        '<span class="rr-option-label">' + rrEsc(option) + "</span></div>";
    }).join("");
    sections.push('<div class="rr-options-considered"><span class="rr-kicker">' + rrEsc(T.optionsConsidered) + "</span>" +
      '<div class="rr-option-grid">' + cards + "</div></div>");
  }
  const reasoningParts = [];
  if (decision.why) reasoningParts.push('<p class="rr-why">' + rrEsc(decision.why) + "</p>");
  if (scopeRows.length) {
    reasoningParts.push('<div class="rr-scope-grid">' + scopeRows.map((row) =>
      '<div><div class="rr-kicker">' + rrEsc(row.k) + '</div><p class="rr-scope-text">' + rrEsc(row.v) + "</p></div>").join("") + "</div>");
  }
  if (decision.authority) {
    reasoningParts.push('<div class="rr-authority">' + rrIcon("seal-check") +
      "<span>" + rrEsc(rrAuthorityText(decision.authority)) + "</span></div>");
  }
  if (reasoningParts.length) {
    sections.push('<details class="rr-reasoning" open><summary>' + rrIcon("caret") + rrEsc(T.reasoning) + "</summary>" +
      '<div class="rr-reasoning-body">' + reasoningParts.join("") + "</div></details>");
  }
  if (decision.if_rejected) {
    sections.push('<div class="rr-if-rejected"><div class="rr-kicker rr-kicker-accent">' + rrIcon("arrow-u-left") +
      rrEsc(T.ifRejected) + '</div><p class="rr-prose">' + rrEsc(decision.if_rejected) + "</p></div>");
  }
  sections.push(rrVerdictBarHtml(id, rec, T.questionDecision, decision.verdict_disposition_options, T, state.lang));

  return '<div class="rr-card" id="rr-it-' + rrEsc(id) + '">' +
    '<div class="rr-card-head"><div class="rr-card-head-main">' +
    '<div class="rr-tag-row">' + rrTagHtml(T.decisionType, "rr-tag-neutral") + "</div>" +
    '<div class="rr-headline">' + rrEsc(decision.what || "") + "</div>" +
    "</div>" + statusChip + "</div>" +
    '<div class="rr-card-body">' + sections.join("") + "</div></div>";
}

// The LAST card: the run itself. It recaps the per-step tally and warns while steps are
// pending — the run verdict never replaces them. With a mechanical gate the question
// changes wording, exactly as the prototype words it.
function rrCardForRunHtml(report, state, T) {
  const R = report || {};
  const rec = rrRec(state, "__run__");
  const steps = rrSteps(report, T);
  const decided = steps.filter((s) => s.kind !== "run");
  const tally = {};
  decided.forEach((s) => {
    const v = rrRec(state, s.id).verdict || T.pendingTag;
    tally[v] = (tally[v] || 0) + 1;
  });
  const recapRows = RR_VERDICTS.concat([T.pendingTag]).filter((k) => tally[k]).map((k) =>
    '<div class="rr-recap-row">' + rrDotHtml(k !== T.pendingTag) +
    '<span class="rr-recap-label">' + rrEsc(k) + '</span>' +
    '<span class="rr-recap-value">' + tally[k] + " / " + decided.length + "</span></div>").join("");
  const pending = tally[T.pendingTag] || 0;
  const statusChip = rec.verdict
    ? '<span class="rr-tag rr-tag-accent rr-status rr-status-set">' + rrEsc(rec.verdict) + "</span>"
    : '<span class="rr-tag rr-tag-neutral rr-status">' + rrEsc(T.pendingTag) + "</span>";

  const sections = [];
  if (recapRows) sections.push('<div class="rr-recap">' + recapRows + "</div>");
  if (pending > 0) {
    sections.push('<div class="rr-warning">' + rrIcon("warning") +
      '<p class="rr-prose">' + rrEsc(T.pendingLeft(pending)) + "</p></div>");
  }
  const question = R.gate === "mechanical" ? T.questionRunMechanical : T.questionRun;
  sections.push(rrVerdictBarHtml("__run__", rec, question, null, T, state.lang));

  const missing = rrMissing(report, state, T);
  const ready = missing.length === 0;
  const signHint = ready ? T.complete : T.missingPrefix + missing.join(T.and) + ".";
  const sign = '<div class="rr-sign' + (ready ? " rr-sign-ready" : "") + '">' +
    '<div class="rr-sign-row">' +
    '<div class="rr-field"><label>' + rrEsc(T.signLabel) + "</label>" +
    '<input class="rr-input" data-rr-act="reviewer" placeholder="' + rrEsc(T.signPlaceholder) +
    '" value="' + rrEsc(state.reviewer || "") + '"></div>' +
    '<button type="button" class="rr-btn rr-btn-primary rr-sign-btn" data-rr-act="sign"' + (ready ? "" : " disabled") + ">" +
    rrIcon("download") + rrEsc(T.writeVerdict) + "</button></div>" +
    '<span class="rr-sign-hint">' + rrEsc(signHint) + "</span>" +
    '<details class="rr-sign-preview"><summary>' + rrIcon("caret") + rrEsc(T.previewOutput) + "</summary>" +
    '<pre class="rr-verdict-json">' + rrEsc(JSON.stringify(rrVerdictOutput(report, state), null, 2)) + "</pre></details></div>";

  return '<div class="rr-card rr-card-run" id="rr-it-__run__">' +
    '<div class="rr-card-head"><div class="rr-card-head-main">' +
    '<div class="rr-tag-row">' + rrTagHtml(T.runType, "rr-tag-neutral") + "</div>" +
    '<div class="rr-headline">' + rrEsc(R.run_title || R.run_id || T.runVerdict) + "</div>" +
    '<div class="rr-subject-line"><span class="rr-subject-label">' + rrEsc(R.run_id || "") + "</span></div>" +
    "</div>" + statusChip + "</div>" +
    '<div class="rr-card-body">' + sections.join("") + "</div>" + sign + "</div>";
}

// The left rail: the index. Group headers count ALL the steps of their group; each row is
// one signable step (parent and children alike — that is the N+1 the counter squares with).
function rrRailHtml(report, state, T) {
  const steps = rrSteps(report, T);
  const { done, total } = rrProgress(report, state, T);
  const pct = total ? Math.round((done / total) * 100) : 0;
  const filter = state.filter;
  const keep = (s) => {
    if (s.kind === "run") return true;
    if (filter === "pending") return !rrRec(state, s.id).verdict;
    if (filter === "stops") return s.kind === "item" && (!!s.data.stop || rrHasStopInside(report, s.data));
    return true;
  };
  const rows = [];
  let lastGroup = null;
  steps.forEach((s, i) => {
    if (!keep(s)) return;
    if (s.group !== lastGroup) {
      lastGroup = s.group;
      const count = steps.filter((x) => x.group === s.group).length;
      rows.push('<div class="rr-rail-group"><span>' + rrEsc(s.group) + '</span><span class="rr-rail-group-n">' + count + "</span></div>");
    }
    const label = s.kind === "run" ? T.runVerdict
      : s.kind === "decision" ? (s.data.decision_id ? s.data.decision_id + " · " + (s.data.what || "") : (s.data.what || ""))
        : ((s.data.subject && s.data.subject.label) || s.id);
    const title = s.kind === "item" ? (s.data.headline || "") : label;
    const stop = s.kind === "item" && !!s.data.stop;
    const inherits = s.kind === "item" && !s.data.stop && rrHasStopInside(report, s.data);
    rows.push('<div class="rr-rail-row' + (i === state.cardIdx ? " rr-rail-row-active" : "") +
      (s.depth > 0 ? " rr-rail-row-child" : "") + '" data-rr-act="goto" data-rr-id="' + rrEsc(s.id) +
      '" title="' + rrEsc(title) + '">' +
      rrDotHtml(!!rrRec(state, s.id).verdict) +
      (stop ? '<span class="rr-rail-stop">' + rrIcon("hand-palm") + "</span>" : "") +
      (inherits ? '<span class="rr-rail-stop rr-rail-stop-dim" title="' + rrEsc(T.containsStop) + '">' + rrIcon("hand-palm") + "</span>" : "") +
      '<span class="rr-rail-label">' + rrEsc(label) + "</span></div>");
  });

  const filters = [["all", T.all], ["pending", T.pending], ["stops", T.stops]].map(([value, label]) =>
    '<label class="rr-seg-opt"><input type="radio" name="rr-filter"' + (filter === value ? " checked" : "") +
    ' data-rr-act="filter" data-rr-value="' + value + '">' + rrEsc(label) + "</label>").join("");

  const blocks = rrContextBlocks(report, T);
  const links = [
    { label: T.metadata, target: "rr-sec-meta", badge: null },
    ...(report && report.pilot_deviation ? [{ label: T.deviation, target: "rr-sec-dev", badge: null }] : []),
    { label: T.countsFiles, target: "rr-sec-scope", badge: null },
    { label: T.gateVerification, target: "rr-sec-gate", badge: null },
    ...blocks.map((b) => ({ label: b.title, target: b.domId, badge: b }))
  ].map((link) =>
    '<div class="rr-rail-link" data-rr-act="section" data-rr-id="' + rrEsc(link.target) + '">' +
    '<span class="rr-rail-label">' + rrEsc(link.label) + "</span>" +
    (link.badge ? '<span class="rr-badge ' + link.badge.badgeCls + '">' + rrEsc(link.badge.badge) + "</span>" : "") +
    "</div>").join("");

  return '<div class="rr-rail-head"><span class="rr-rail-title">' + rrEsc(T.index) + "</span>" +
    '<div class="rr-bar"><div class="rr-bar-fill" style="width:' + pct + '%"></div></div>' +
    '<span class="rr-rail-count">' + done + "/" + total + "</span></div>" +
    '<div class="rr-seg rr-rail-filters">' + filters + "</div>" +
    rows.join("") +
    '<div class="rr-rail-divider"></div>' + links;
}

// The three declared blocks of the run context. Presence is decided on the KEY, so that
// "[]" and "missing" stay two different facts all the way to the badge.
function rrContextBlocks(report, T) {
  const spec = [
    { domId: "rr-sec-blind", key: "blind_spots", title: T.blindSpots },
    { domId: "rr-sec-alt", key: "alternatives", title: T.alternatives },
    { domId: "rr-sec-unrev", key: "unreviewed", title: T.unreviewed }
  ];
  return spec.map((b) => {
    const present = !!report && Object.prototype.hasOwnProperty.call(report, b.key) && report[b.key] != null;
    const arr = present && Array.isArray(report[b.key]) ? report[b.key] : [];
    const badge = rrEmptyBadge(present, arr.length, T);
    return {
      domId: b.domId, key: b.key, title: b.title,
      badge: badge.badge, badgeCls: badge.cls,
      absent: !present, entries: rrKvEntries(arr)
    };
  });
}

function rrKvRowsHtml(rows) {
  return rows.map((row) =>
    '<div class="rr-kv"><span class="rr-kv-k">' + rrEsc(row.k) + '</span><span class="rr-kv-v">' + rrEsc(row.v) + "</span></div>").join("");
}

// The run context under the card: metadata, the emitter's declared deviation when there is
// one, counts and files, gate and verification, and the three blocks.
function rrContextHtml(report, T) {
  const R = report || {};
  const metaKeys = ["project", "kind", "mode", "schema_version", "run_id", "queue_order", "profile",
    "profile_reason", "execution_path", "emitted_by", "emitted_when", "emitted_at",
    "source_commit", "source_branch", "log_dir"];
  const metaRows = metaKeys.filter((k) => R[k] != null).map((k) => ({ k, v: String(R[k]) }));
  // `profile: null` with a reason is a declared fact, not a hole — it leads the list.
  if (R.profile === null && R.profile_reason) metaRows.unshift({ k: "profile", v: "null — " + R.profile_reason });

  const dev = R.pilot_deviation;
  const devRows = dev ? Object.entries(dev).map(([k, v]) => ({ k, v: String(v) })) : [];

  const countRows = Object.entries(R.counts || {}).map(([k, v]) => {
    const before = v && typeof v === "object" ? v.before : null;
    const after = v && typeof v === "object" ? v.after : null;
    const delta = (after != null ? after : 0) - (before != null ? before : 0);
    return { label: k, before: String(before != null ? before : "—"), after: String(after != null ? after : "—"),
      delta: delta === 0 ? "—" : (delta > 0 ? "+" : "") + delta };
  });
  const locs = (Array.isArray(R.locations) ? R.locations : []).map((L) => ({
    label: L.label || "", path: L.path || "", lines: L.lines != null ? String(L.lines) : "", note: L.note || ""
  }));

  const ver = R.verification;
  const verifChip = ver ? [ver.command, ver.result].filter(Boolean).join(" · ") : T.noVerification;
  const gateRows = [{ k: "gate", v: R.gate || "—" }];
  if (R.gate_reason) gateRows.push({ k: "gate_reason", v: R.gate_reason });
  if (ver) Object.entries(ver).forEach(([k, v]) => gateRows.push({ k: "verification." + k, v: String(v) }));
  else gateRows.push({ k: "verification", v: "null" });
  if (R.verification_note) gateRows.push({ k: "verification_note", v: R.verification_note });
  if (R.verification_reason) gateRows.push({ k: "verification_reason", v: R.verification_reason });
  if (R.items_note) gateRows.push({ k: "items_note", v: R.items_note });

  const details = [];
  details.push('<details class="rr-sec" id="rr-sec-meta"><summary>' + rrIcon("caret") +
    '<span class="rr-sec-title">' + rrEsc(T.metadata) + '</span><span class="rr-sec-chip">' + rrEsc(R.run_id || "") + "</span></summary>" +
    '<div class="rr-sec-body">' + rrKvRowsHtml(metaRows) + "</div></details>");
  if (dev) {
    details.push('<details class="rr-sec" id="rr-sec-dev"><summary>' + rrIcon("caret") + rrIcon("flag") +
      '<span class="rr-sec-title">' + rrEsc(T.deviation) + "</span></summary>" +
      '<div class="rr-sec-body">' + rrKvRowsHtml(devRows) + "</div></details>");
  }
  const countsTable = countRows.length
    ? '<table class="rr-table"><thead><tr><th></th><th>' + rrEsc(T.before) + "</th><th>" + rrEsc(T.after) + "</th><th>Δ</th></tr></thead><tbody>" +
      countRows.map((c) => "<tr><td>" + rrEsc(c.label) + '</td><td class="rr-num">' + rrEsc(c.before) +
        '</td><td class="rr-num">' + rrEsc(c.after) + '</td><td class="rr-delta">' + rrEsc(c.delta) + "</td></tr>").join("") +
      "</tbody></table>"
    : "";
  const countsNote = R.counts_note ? '<p class="rr-counts-note">' + rrEsc(R.counts_note) + "</p>" : "";
  const locRows = locs.map((L) =>
    '<div class="rr-loc-row"><div class="rr-loc-main"><span class="rr-loc-label">' + rrEsc(L.label) + "</span>" +
    '<span class="rr-loc-path" title="' + rrEsc(L.path) + '">' + rrEsc(L.path) + "</span>" +
    '<span class="rr-loc-lines">' + rrEsc(L.lines) + "</span></div>" +
    (L.note ? '<span class="rr-loc-note">' + rrEsc(L.note) + "</span>" : "") + "</div>").join("");
  details.push('<details class="rr-sec" id="rr-sec-scope"><summary>' + rrIcon("caret") +
    '<span class="rr-sec-title">' + rrEsc(T.countsFiles) + "</span></summary>" +
    '<div class="rr-sec-body">' + countsTable + countsNote + locRows + "</div></details>");
  details.push('<details class="rr-sec" id="rr-sec-gate"><summary>' + rrIcon("caret") +
    '<span class="rr-sec-title">' + rrEsc(T.gateVerification) + '</span><span class="rr-sec-chip">' + rrEsc(verifChip) + "</span></summary>" +
    '<div class="rr-sec-body">' + rrKvRowsHtml(gateRows) + "</div></details>");

  rrContextBlocks(report, T).forEach((block) => {
    const entries = block.entries.map((entry) =>
      '<div class="rr-block-entry">' + rrKvRowsHtml(entry.rows) + "</div>").join("");
    details.push('<details class="rr-sec" id="' + rrEsc(block.domId) + '"><summary>' + rrIcon("caret") +
      '<span class="rr-sec-title">' + rrEsc(block.title) + '</span><span class="rr-badge ' + block.badgeCls + '">' +
      rrEsc(block.badge) + "</span></summary>" +
      '<div class="rr-sec-body">' +
      (block.absent ? '<span class="rr-block-blurb">' + rrEsc(T.absent) + "</span>" : "") +
      entries + "</div></details>");
  });

  return '<h6 class="rr-context-title">' + rrEsc(T.runContext) + "</h6>" + details.join("");
}

function rrTopbarHtml(report, state, T) {
  const R = report || {};
  const steps = report ? rrSteps(report, T) : [];
  const { done, total } = report ? rrProgress(report, state, T) : { done: 0, total: 0 };
  const idx = Math.min(state.cardIdx, Math.max(0, steps.length - 1));
  return '<span class="rr-app-title">' + rrEsc(T.appTitle) + "</span>" +
    '<span class="rr-tag rr-tag-outline rr-gate-chip" title="' + rrEsc(R.gate_reason || "") + '">' +
    rrEsc(T.gate) + " · " + rrEsc(R.gate || "—") + "</span>" +
    '<span class="rr-topbar-spacer"></span>' +
    '<span class="rr-progress-text">' + done + " / " + total + "</span>" +
    '<div class="rr-nav">' +
    '<button type="button" class="rr-btn rr-btn-icon rr-btn-secondary" data-rr-act="prev" title="' + rrEsc(T.prev) + '"' +
    (idx <= 0 ? " disabled" : "") + ">" + rrIcon("arrow-left") + "</button>" +
    '<span class="rr-card-pos">' + (total ? (idx + 1) + " / " + total : "—") + "</span>" +
    '<button type="button" class="rr-btn rr-btn-icon rr-btn-secondary" data-rr-act="next" title="' + rrEsc(T.next) + '"' +
    (idx >= total - 1 ? " disabled" : "") + ">" + rrIcon("arrow-right") + "</button></div>" +
    '<button type="button" class="rr-btn rr-btn-secondary rr-lang-btn" data-rr-act="lang" title="' + rrEsc(T.langTitle) + '">' +
    (state.lang === "es" ? "ES" : "EN") + "</button>" +
    '<button type="button" class="rr-btn rr-btn-icon rr-btn-secondary" data-rr-act="theme" title="' + rrEsc(T.themeTitle) + '">' +
    rrIcon(state.theme === "dark" ? "sun" : "moon") + "</button>";
}

// The honest failure surface: the parse error, named, and nothing pretended below it.
function rrErrorHtml(error, T) {
  return '<div class="rr-parse-error">' +
    '<div class="rr-parse-error-title">' + rrIcon("warning") + rrEsc(T.parseError) + "</div>" +
    '<p class="rr-prose">' + rrEsc(T.parseErrorHint) + "</p>" +
    '<pre class="rr-parse-error-detail">' + rrEsc(error) + "</pre></div>";
}

// The whole surface as one string: topbar, rail, the CURRENT card (one at a time — the
// operator's decision), and the run context.
function rrRootHtml(state) {
  const T = rrT(state.lang);
  if (state.error != null) {
    return '<div class="rr-topbar"><div class="rr-topbar-inner">' +
      '<span class="rr-app-title">' + rrEsc(T.appTitle) + "</span></div></div>" +
      '<div class="rr-layout rr-layout-error">' + rrErrorHtml(state.error, T) + "</div>";
  }
  const report = state.report;
  const steps = rrSteps(report, T);
  const idx = Math.min(state.cardIdx, Math.max(0, steps.length - 1));
  const step = steps[idx] || { kind: "run" };
  const card = step.kind === "item" ? rrCardForItemHtml(report, step.data, state, T)
    : step.kind === "decision" ? rrCardForDecisionHtml(step.data, step.id, state, T)
      : rrCardForRunHtml(report, state, T);
  const hasPreviews = step.kind === "item" && (() => {
    const subj = step.data.subject || {};
    if (subj.previews && subj.previews.length) return true;
    const parent = step.data.parent ? rrItemById(report, step.data.parent) : null;
    return !!(parent && parent.subject && parent.subject.previews && parent.subject.previews.length);
  })();
  return '<div class="rr-topbar"><div class="rr-topbar-inner">' + rrTopbarHtml(report, state, T) + "</div></div>" +
    '<div class="rr-layout">' +
    '<div class="rr-rail">' + rrRailHtml(report, state, T) + "</div>" +
    '<div class="rr-col' + (hasPreviews ? " rr-col-wide" : "") + '">' + card + rrContextHtml(report, T) + "</div>" +
    "</div>";
}

// ---------------------------------------------------------------------------
// Mount. State lives per mount; the DOM is redrawn from state on every acted
// change, and typing updates state without a redraw so the caret survives.
// ---------------------------------------------------------------------------

function rrLsGet(key, fallback) {
  try { return (typeof localStorage !== "undefined" && localStorage.getItem("rr." + key)) || fallback; }
  catch (err) { return fallback; }
}

function rrLsSet(key, value) {
  try { if (typeof localStorage !== "undefined") localStorage.setItem("rr." + key, value); }
  catch (err) { /* storage denied is not an error the operator can act on */ }
}

function rrInitialState(input) {
  const parsed = rrParseReport(input);
  return {
    report: parsed.report, error: parsed.error,
    cardIdx: 0, filter: "all",
    v: {}, reviewer: "", previewTab: {}, previewStatus: {},
    lang: rrLsGet("lang", "en"), theme: rrLsGet("theme", "dark")
  };
}

// Every preview path is probed ONCE per mount; a pane only becomes an iframe after the
// probe answers ok, and shows the path it could not reach otherwise.
function rrCheckPreviews(state, redraw, previewBase) {
  if (typeof fetch !== "function" || !state.report) return;
  rrItems(state.report).forEach((item) => {
    const previews = (item.subject && item.subject.previews) || [];
    previews.forEach((p) => {
      if (!p.path || state.previewStatus[p.path]) return;
      state.previewStatus[p.path] = "checking";
      fetch((previewBase || "") + p.path, { method: "GET" })
        .then((res) => { state.previewStatus[p.path] = res.ok ? "ok" : "missing"; redraw(); })
        .catch(() => { state.previewStatus[p.path] = "missing"; redraw(); });
    });
  });
}

function rrDownloadVerdict(json) {
  if (typeof document === "undefined" || typeof Blob === "undefined" || typeof URL === "undefined") return;
  const blob = new Blob([json], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "verdict.json";
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function renderRunReport(container, input, opts) {
  const options = opts || {};
  const state = rrInitialState(input);

  function draw() {
    container.setAttribute("data-theme", state.theme);
    container.setAttribute("lang", state.lang);
    container.classList.add("rr-root");
    container.innerHTML = rrRootHtml(state);
  }

  function stepsNow() {
    return state.report ? rrSteps(state.report, rrT(state.lang)) : [];
  }

  function moveCard(delta) {
    const n = stepsNow().length;
    if (!n) return;
    state.cardIdx = Math.min(n - 1, Math.max(0, state.cardIdx + delta));
    draw();
    if (typeof window !== "undefined" && window.scrollTo) window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goStep(id) {
    const idx = stepsNow().findIndex((s) => s.id === id);
    if (idx >= 0) { state.cardIdx = idx; draw(); }
    if (typeof window !== "undefined" && window.scrollTo) window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openSection(domId) {
    const el = container.querySelector ? container.querySelector("#" + domId) : null;
    if (el) el.open = true;
    if (el && el.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  container.addEventListener("click", (event) => {
    const target = event.target && event.target.closest ? event.target.closest("[data-rr-act]") : null;
    if (!target) return;
    const act = target.getAttribute("data-rr-act");
    const id = target.getAttribute("data-rr-id");
    const value = target.getAttribute("data-rr-value");
    if (act === "verdict") {
      const current = rrRec(state, id).verdict;
      rrSetRec(state, id, { verdict: current === value ? null : value, disposition: null });
      draw();
    } else if (act === "disposition") {
      const current = rrRec(state, id).disposition;
      rrSetRec(state, id, { disposition: current === value ? null : value, dispOther: "" });
      draw();
    } else if (act === "chosen-option") {
      const current = rrRec(state, id).chosenOption;
      rrSetRec(state, id, { chosenOption: current === value ? null : value });
      draw();
    } else if (act === "goto") {
      goStep(id);
    } else if (act === "section") {
      openSection(id);
    } else if (act === "prev") {
      moveCard(-1);
    } else if (act === "next") {
      moveCard(1);
    } else if (act === "lang") {
      state.lang = state.lang === "es" ? "en" : "es";
      rrLsSet("lang", state.lang);
      draw();
    } else if (act === "theme") {
      state.theme = state.theme === "dark" ? "light" : "dark";
      rrLsSet("theme", state.theme);
      draw();
    } else if (act === "sign") {
      if (rrMissing(state.report, state, rrT(state.lang)).length) return;
      rrDownloadVerdict(JSON.stringify(rrVerdictOutput(state.report, state), null, 2));
    }
  });

  // Typing mutates state only; the redraw happens on the next acted change so the caret
  // never jumps. The sign row is the exception: its readiness must follow the name live,
  // and it redraws only when readiness actually flips.
  container.addEventListener("input", (event) => {
    const target = event.target && event.target.getAttribute ? event.target : null;
    if (!target || !target.getAttribute("data-rr-act")) return;
    const act = target.getAttribute("data-rr-act");
    const id = target.getAttribute("data-rr-id");
    if (act === "note") {
      rrSetRec(state, id, { note: target.value });
    } else if (act === "disp-other") {
      rrSetRec(state, id, { dispOther: target.value, disposition: null });
    } else if (act === "reviewer") {
      const wasReady = rrMissing(state.report, state, rrT(state.lang)).length === 0;
      state.reviewer = target.value;
      const isReady = rrMissing(state.report, state, rrT(state.lang)).length === 0;
      if (wasReady !== isReady) {
        draw();
        const again = container.querySelector ? container.querySelector('[data-rr-act="reviewer"]') : null;
        if (again && again.focus) { again.focus(); if (again.setSelectionRange) again.setSelectionRange(again.value.length, again.value.length); }
      }
    }
  });

  container.addEventListener("change", (event) => {
    const target = event.target && event.target.getAttribute ? event.target : null;
    if (!target || !target.getAttribute("data-rr-act")) return;
    const act = target.getAttribute("data-rr-act");
    if (act === "filter") {
      state.filter = target.getAttribute("data-rr-value");
      draw();
    } else if (act === "preview-tab") {
      const id = target.getAttribute("data-rr-id");
      state.previewTab[id] = Number(target.getAttribute("data-rr-value"));
      draw();
    } else if (act === "note" || act === "disp-other") {
      draw(); // commit: the cleared disposition buttons repaint once typing settles
    }
  });

  container.addEventListener("keydown", (event) => {
    if (event.target && /INPUT|TEXTAREA|SELECT/.test(event.target.tagName || "")) return;
    if (event.key === "ArrowRight") moveCard(1);
    if (event.key === "ArrowLeft") moveCard(-1);
  });

  draw();
  rrCheckPreviews(state, draw, options.previewBase);
  return {
    // The console (#53) holds this handle; the suite drives the same paths headlessly.
    state,
    redraw: draw,
    goStep,
    moveCard
  };
}
