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
// What it deliberately does NOT do (ticket #52): it does not add the console tab or the route
// from the run (#53), and it does not validate the report against the contract. A report that
// does not parse produces an honest message, never a blank surface; a missing optional block
// paints as "not declared", which is a different fact from an empty one ("none").
//
// THE SIGN BUTTON SAYS WHAT IT DOES (#57 — RUN-CONSOLE-VERDICT-POST-001; an earlier version of
// this header attributed the endpoint to #55, which was false: #55 was the QA repairs). When
// the console injects a writer (`opts.writeVerdict`), signing WRITES verdict.json beside the
// report through #57's endpoint and the button says "Write". With no writer injected — this
// file judged alone, or a page that wired none — signing downloads to the operator's machine
// and the button says "Download". Both labels are chrome, both translate, and both are true.

// ---------------------------------------------------------------------------
// Closed vocabularies — never per-report, never per-item; any custom verdict
// vocabulary a report carries is drift and is ignored. An ITEM asks whether a
// change is accepted, and that takes two tokens. Whether something halts
// everything is not a verdict at all: the EMITTER declares it (`stop: true`)
// and the consequence is derived (`stopped`, below), so a third item token
// would be redundant by construction. Only the RUN asks whether it is done,
// and its three are the SAME three the kernel already parses at
// aiw/kernel.mjs:213 — on the run, BLOCKED means this run cannot close.
//
// The dispositions name where a CHANGES_REQUIRED fix travels, nearest first:
// this run, a new run, the operator's own hands, nowhere. The first one is the
// only one that says the run still owes work to ITSELF — the guard below
// refuses to let a run be APPROVED while any step carries it.
// ---------------------------------------------------------------------------
const RR_ITEM_VERDICTS = ["APPROVED", "CHANGES_REQUIRED"];
const RR_RUN_VERDICTS = ["APPROVED", "CHANGES_REQUIRED", "BLOCKED"];
const RR_FIX_HERE = "this_run";
const RR_DEFAULT_DISPOSITIONS = [RR_FIX_HERE, "new_run", "operator_fixed", "discard"];

// Chrome strings only — never the report's own content. Both languages come from the
// prototype verbatim; the report's text renders as-is in whatever language it was written.
const RR_STRINGS = {
  en: {
    lang: "en",
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
    writeVerdict: "Write verdict.json", downloadVerdict: "Download verdict.json",
    previewOutput: "Preview what would be written",
    completeWrite: "Complete. It writes verdict.json beside the report.",
    writing: "Writing…", writtenTo: "Written: ", writeRefused: "The write was refused: ",
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
    missingPrefix: "Missing ", complete: "Complete. It downloads to your machine.", and: " and ",
    guardHeld: "APPROVED is not available for the run: ",
    guardNoDisposition: (n) => n + (n === 1 ? " change still carries no disposition" : " changes still carry no disposition"),
    guardOwedHere: (n) => (n === 1 ? "1 fix is owed" : n + " fixes are owed") + " to this run itself",
    noVerdictNeeded: "no verdict needed",
    // [#58] The verdict already on disk, read when the report opens.
    filedChip: "verdict filed",
    filedTitle: "A verdict is already filed beside this report",
    filedSigned: "signed by", filedWhen: "stamped",
    filedRestored: "On screen is what you typed here before; the filed one is named above, and signing compares against it.",
    // [#58] The recap: the denominator is stated ONCE, with the reason it is that number.
    recapDenominator: (n) => (n === 1 ? "step asks for a verdict" : "steps ask for a verdict"),
    recapWhy: "The run does not count itself, and a step that asks for no verdict does not swell this number.",
    whichOnes: "Which ones",
    blockerNoDisposition: "no disposition", blockerOwedHere: "owed to this run",
    // [#58] D-066: signing over an existing verdict warns, summarises and waits.
    overwriteTitle: "This overwrites the verdict already filed beside the report.",
    overwriteSame: "It is overwritten with the same data: nothing changes.",
    overwriteChanges: "What changes against the filed verdict",
    overwriteConfirm: "Overwrite it", overwriteCancel: "Cancel",
    changeVerdict: "verdict", changeDisposition: "disposition", changeNote: "note",
    changeSigner: "who signs", changeEmpty: "—"
  },
  es: {
    lang: "es",
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
    writeVerdict: "Escribir verdict.json", downloadVerdict: "Descargar verdict.json",
    previewOutput: "Ver lo que se escribiría",
    completeWrite: "Completo. Escribe verdict.json junto al reporte.",
    writing: "Escribiendo…", writtenTo: "Escrito: ", writeRefused: "La escritura se rechazó: ",
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
    missingPrefix: "Faltan ", complete: "Completo. Se descarga en tu equipo.", and: " y ",
    guardHeld: "APPROVED no está disponible para el run: ",
    guardNoDisposition: (n) => n + (n === 1 ? " cambio sigue sin disposición" : " cambios siguen sin disposición"),
    guardOwedHere: (n) => (n === 1 ? "1 arreglo se debe" : n + " arreglos se deben") + " a este mismo run",
    noVerdictNeeded: "no pide veredicto",
    // [#58] El veredicto que ya está en disco, leído al abrir el reporte.
    filedChip: "veredicto archivado",
    filedTitle: "Ya hay un veredicto archivado junto a este reporte",
    filedSigned: "firmado por", filedWhen: "sellado",
    filedRestored: "En pantalla está lo que tecleaste aquí antes; el archivado queda nombrado arriba, y firmar compara contra él.",
    // [#58] El recuento: el denominador se dice UNA vez, con la razón de que sea ese número.
    recapDenominator: (n) => (n === 1 ? "paso pide veredicto" : "pasos piden veredicto"),
    recapWhy: "El run no se cuenta a sí mismo, y un paso que no pide veredicto no engorda este número.",
    whichOnes: "Cuáles",
    blockerNoDisposition: "sin disposición", blockerOwedHere: "se debe a este run",
    // [#58] D-066: firmar sobre un veredicto existente avisa, resume y espera.
    overwriteTitle: "Esto sobrescribe el veredicto ya archivado junto al reporte.",
    overwriteSame: "Se sobrescribe con los mismos datos: no cambia nada.",
    overwriteChanges: "Qué cambia respecto del veredicto archivado",
    overwriteConfirm: "Sobrescribirlo", overwriteCancel: "Cancelar",
    changeVerdict: "veredicto", changeDisposition: "disposición", changeNote: "nota",
    changeSigner: "quién firma", changeEmpty: "—"
  }
};
const RR_DISPOSITION_GLOSS = {
  en: { this_run: "this run fixes it", new_run: "another run fixes it", operator_fixed: "I fix it myself", discard: "discard it" },
  es: { this_run: "este run lo arregla", new_run: "otro run lo arregla", operator_fixed: "lo arreglo yo", discard: "se descarta" }
};

// ---------------------------------------------------------------------------
// WRITTEN LABELS — the operator is shown the name they read on screen, never
// the internal identifier. This project already carries that rule in writing,
// and the reason is measured: a failed mental translation produces an
// INCOMPLETE review that reads as a complete one.
//
// THE BOUNDARY, and it is the whole design of this table: it covers exactly the
// keys THIS FILE names itself — the envelope's own closed vocabulary, listed in
// `metaKeys` and pushed into `gateRows` right here, plus the item fields the
// contract fixes. A key the REPORT invents (what a count is called, what a
// deviation declares, what an entry inside a context block carries, the object
// keys of a before/after pair) CANNOT get a written label here without this
// renderer coming to know a domain, which is the rule that governs every other
// one. Those are HUMANISED instead — `rrHumanKey` — so the operator reads words
// rather than an identifier, and never a raw key.
//
// THE OTHER HALF IS NOT REPAIRED HERE: `unchanged` arrives from the emitter
// mixing identifiers with prose in the same array. This table translates the
// identifiers it can name and passes prose through untouched; making the
// emitter write only what a person calls it is a change to the ENVELOPE and
// belongs to the thread that owns it.
// ---------------------------------------------------------------------------
const RR_FIELD_LABELS = {
  en: {
    project: "Project", kind: "Kind", mode: "Mode", schema_version: "Schema version",
    run_id: "Run id", queue_order: "Queue order", profile: "Profile",
    profile_reason: "Why this profile", execution_path: "Execution path",
    emitted_by: "Emitted by", emitted_when: "Emitted when", emitted_at: "Emitted at",
    source_commit: "Source commit", source_branch: "Source branch", log_dir: "Log folder",
    gate: "Gate", gate_reason: "Why this gate", verification: "Verification",
    verification_note: "Note on the verification", verification_reason: "Why no verification",
    items_note: "Note on the items", counts_note: "Note on the counts",
    statement: "Statement", options: "Options", feedback: "Feedback",
    before: "Before", after: "After", why: "Reasoning", authority: "Authority",
    evidence: "Evidence", comparisons: "Reference cases", headline: "Headline",
    expected: "What to expect", location: "Location", subject: "Subject",
    if_rejected: "If rejected", options_considered: "Paths considered"
  },
  es: {
    project: "Proyecto", kind: "Tipo", mode: "Modo", schema_version: "Versión de esquema",
    run_id: "Id del run", queue_order: "Orden en la cola", profile: "Perfil",
    profile_reason: "Por qué este perfil", execution_path: "Vía de ejecución",
    emitted_by: "Emitido por", emitted_when: "Emitido cuando", emitted_at: "Emitido el",
    source_commit: "Commit de origen", source_branch: "Rama de origen", log_dir: "Carpeta de registro",
    gate: "Compuerta", gate_reason: "Por qué esta compuerta", verification: "Verificación",
    verification_note: "Nota sobre la verificación", verification_reason: "Por qué no hay verificación",
    items_note: "Nota sobre los ítems", counts_note: "Nota sobre los recuentos",
    statement: "Enunciado", options: "Opciones", feedback: "Retroalimentación",
    before: "Antes", after: "Después", why: "Razonamiento", authority: "Autoridad",
    evidence: "Evidencia", comparisons: "Casos de referencia", headline: "Titular",
    expected: "Qué se espera ver", location: "Ubicación", subject: "Sujeto",
    if_rejected: "Si se rechaza", options_considered: "Caminos considerados"
  }
};

// A key this renderer does not name is never printed raw: separators become
// spaces, so what reaches the operator is words. It is not a translation and
// does not pretend to be one — it is the honest floor under one.
function rrHumanKey(key) {
  return String(key == null ? "" : key).replace(/[_.]+/g, " ").trim();
}

// The written label for a key, or the humanised key when this renderer cannot
// name it. A DOTTED key labels its head from the table and humanises its tail,
// which is how a verification's own sub-fields stay readable without the
// renderer pretending to know what the emitter measured.
function rrLabelForKey(key, lang) {
  const table = RR_FIELD_LABELS[lang] || RR_FIELD_LABELS.en;
  const raw = String(key == null ? "" : key);
  if (table[raw]) return table[raw];
  const dot = raw.indexOf(".");
  if (dot > 0 && table[raw.slice(0, dot)]) {
    return table[raw.slice(0, dot)] + " · " + rrHumanKey(raw.slice(dot + 1));
  }
  return rrHumanKey(raw);
}

// `unchanged` is DATA, not a key list: the emitter writes identifiers and prose
// into the same array. An entry the table names is translated; anything else is
// the emitter's own sentence and travels VERBATIM — humanising prose would
// mangle it, and inventing a translation for it would be this view making up
// what the run said.
function rrUnchangedLabel(entry, lang) {
  const table = RR_FIELD_LABELS[lang] || RR_FIELD_LABELS.en;
  const raw = String(entry == null ? "" : entry);
  return table[raw] || raw;
}

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

// AN ITEM THAT NEEDS NO DECISION MUST NOT ASK FOR ONE. The emitter declares it —
// `requires_verdict: false` — and this view derives every consequence, exactly as it
// already does with `stop`. It is declared by FIELD, never by an item's `type`: branching
// on the type value is the rule this renderer is built to not break, and a view that knew
// which type needs no signature would know a domain.
//
// Three consequences, and they are the three the operator asked for: the item IS SHOWN
// (it keeps its step, its card and its row in the index), it IS NOT SIGNED (no verdict
// bar), and it DOES NOT COUNT (the progress total, the gate and the guard all skip it).
function rrSignsVerdict(data) {
  return !(data && data.requires_verdict === false);
}

// ONE STEP = one thing the operator walks through. Every item (a parent AND each child —
// an item with children is N+1 entries, because each one is signed apart and the counter
// has to add up), every self-decision of the executor, and, last, the run itself. Stop
// items go first; a parent whose child is a stop travels with them. `signs` says whether
// the step is one of the ones that asks for a verdict — the COUNTER reads that, not the
// length of this list, because being shown and being signable are two different facts.
function rrSteps(report, T) {
  const tops = rrItems(report).filter((it) => it && !it.parent);
  const stopish = (it) => !!it.stop || rrHasStopInside(report, it);
  const ordered = tops.filter(stopish).concat(tops.filter((it) => !stopish(it)));
  const out = [];
  ordered.forEach((top) => {
    out.push({ kind: "item", id: top.item_id, data: top, group: top.type || T.itemType, depth: 0, signs: rrSignsVerdict(top) });
    rrChildrenOf(report, top).forEach((child) => {
      out.push({ kind: "item", id: child.item_id, data: child, group: top.type || T.itemType, depth: 1, signs: rrSignsVerdict(child) });
    });
  });
  const decisions = Array.isArray(report && report.self_decisions) ? report.self_decisions : [];
  decisions.forEach((dec, n) => {
    out.push({ kind: "decision", id: dec.decision_id || "SD" + (n + 1), data: dec, group: T.decisionsGroup, depth: 0, signs: rrSignsVerdict(dec) });
  });
  out.push({ kind: "run", id: "__run__", data: null, group: T.runGroup, depth: 0, signs: true });
  return out;
}

// The steps that actually ask for a signature — the denominator of every count on screen.
function rrSigningSteps(report, T) {
  return rrSteps(report, T).filter((s) => s.signs);
}

// What a step is CALLED on screen. One function, so the rail, the blocker lists and the
// overwrite summary name the same step with the same words — a list that named a step
// differently from the rail would be a second vocabulary for the operator to learn.
function rrStepLabel(step, T) {
  if (!step) return "";
  if (step.kind === "run") return T.runVerdict;
  if (step.kind === "decision") {
    const what = (step.data && step.data.what) || "";
    const declared = step.data && step.data.decision_id;
    return declared ? declared + " · " + what : (what || step.id);
  }
  return (step.data && step.data.subject && step.data.subject.label) || step.id;
}

function rrLines(value) {
  if (value == null) return [];
  if (Array.isArray(value)) return value.map((x) => (typeof x === "object" && x !== null ? JSON.stringify(x) : String(x)));
  // Object keys reaching a diff line are the report's own: humanised, never raw.
  if (typeof value === "object") return Object.entries(value).map(([k, x]) => rrHumanKey(k) + ": " + x);
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
function rrAuthorityText(authority, lang) {
  if (!authority) return "";
  if (authority.source) return authority.source + (authority.section ? " · " + authority.section : "");
  if (authority.invented_by) {
    return authority.invented_by + " — " + (authority.why_invented || "") +
      (authority.decision_item ? " · " + authority.decision_item : "");
  }
  // A third form nobody declared: its keys are the report's own, so they are humanised
  // rather than printed as identifiers.
  return Object.entries(authority).map(([k, v]) => rrLabelForKey(k, lang) + ": " + v).join(" · ");
}

// EMPTY IS NOT ABSENT. `[]` was enumerated and there was nothing — "none". A missing key
// means nobody looked — "not declared" — and the view says which (ticket criterion 5).
function rrEmptyBadge(present, count, T) {
  if (!present) return { badge: T.notDeclared, cls: "rr-badge-absent" };
  if (count === 0) return { badge: T.none, cls: "rr-badge-empty" };
  return { badge: String(count), cls: "rr-badge-count" };
}

// The entries inside a declared block carry whatever fields the REPORT chose to write, so
// their keys are humanised: this view cannot name them without knowing the domain, but it
// can refuse to hand the operator an identifier.
function rrKvEntries(arr, lang) {
  return (Array.isArray(arr) ? arr : []).map((entry) => ({
    rows: Object.entries(entry || {})
      .filter(([, v]) => v != null && !(Array.isArray(v) && v.length === 0))
      .map(([k, v]) => ({ k: rrLabelForKey(k, lang), v: typeof v === "object" ? JSON.stringify(v) : String(v) }))
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

// The disposition the output would carry: the picked token, or the operator's own typed
// one — trimmed, and whitespace alone is NO disposition. The guard reads this same value,
// so a fix-here token typed by hand into "or write another…" holds APPROVED exactly as
// the button does.
function rrEffectiveDisposition(r) {
  if (r.disposition) return r.disposition;
  const typed = r.dispOther ? r.dispOther.trim() : "";
  return typed || null;
}

function rrRecOut(state, id) {
  const r = rrRec(state, id);
  return {
    verdict: r.verdict || null,
    disposition: r.verdict === "CHANGES_REQUIRED" ? rrEffectiveDisposition(r) : null,
    chosen_option: r.chosenOption || null,
    note: r.note || null
  };
}

// What #57's endpoint receives (an earlier comment here said #55, which was false — #55 was
// the QA repairs; the endpoint is RUN-CONSOLE-VERDICT-POST-001). `verdict_by` is whatever the
// operator TYPED — the signer's name is never a constant in this code, and an empty box signs
// nothing. `decided_at` stays null here: the writer stamps it, not the view.
//
// `stopped` is DERIVED, never chosen — no control on the surface sets it. The emitter
// declared which items halt everything (`stop: true`); rejecting one of those is what
// halts the run (CONTRATO §7), and this field only states that consequence. An item
// takes two tokens, so "rejected" is exactly CHANGES_REQUIRED; a stop item still
// pending has not been rejected, and `stopped` stays false until one actually is.
function rrStopped(report, state) {
  return rrItems(report).some((it) =>
    it && it.stop && rrRec(state, it.item_id).verdict === "CHANGES_REQUIRED");
}

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
    stopped: rrStopped(R, state),
    run: rrRecOut(state, "__run__"),
    items: rrItems(R).map((it) => Object.assign({ item_id: it.item_id }, rrRecOut(state, it.item_id))),
    self_decisions: decisions.map((dec, n) =>
      Object.assign({ decision_id: dec.decision_id || null, index: n }, rrRecOut(state, dec.decision_id || "SD" + (n + 1))))
  };
}

// ---------------------------------------------------------------------------
// [#58] READING A VERDICT BACK. The write route landed one run ago and nothing ever read
// what it wrote, so a report the operator had signed opened blank and signing again replaced
// the first file in silence. These functions are the inverse of `rrVerdictOutput`: they take
// the SAME shape, straight off disk, and put it back into the state the view paints from.
//
// The file arrives as DATA. This renderer composes no path and knows no folder — whoever
// opened the report hands the bytes over, exactly as the writer arrives by injection.
// ---------------------------------------------------------------------------

// One record per step id, out of a verdict file. The step ids are resolved the way
// `rrVerdictOutput` writes them: items by `item_id`, a self-decision by its declared
// `decision_id` else its position, and the run under its own fixed key.
function rrVerdictRecords(report, verdict) {
  const out = {};
  if (!verdict || typeof verdict !== "object") return out;
  const put = (id, source) => {
    if (!id || !source || typeof source !== "object") return;
    const text = (value) => (value == null ? null : String(value));
    out[id] = {
      verdict: text(source.verdict),
      disposition: text(source.disposition),
      note: text(source.note),
      chosenOption: text(source.chosen_option)
    };
  };
  put("__run__", verdict.run);
  (Array.isArray(verdict.items) ? verdict.items : []).forEach((entry) => {
    if (entry && typeof entry.item_id === "string") put(entry.item_id, entry);
  });
  const declared = Array.isArray(report && report.self_decisions) ? report.self_decisions : [];
  (Array.isArray(verdict.self_decisions) ? verdict.self_decisions : []).forEach((entry, n) => {
    if (!entry) return;
    const at = Number.isInteger(entry.index) ? entry.index : n;
    const here = declared[at];
    put(entry.decision_id || (here && here.decision_id) || "SD" + (at + 1), entry);
  });
  return out;
}

// The dispositions a step OFFERS as buttons: its own when it declares them, the default four
// otherwise. Read on the way back in, so a token the step offers lands on its button and a
// token the operator typed by hand lands back in the box they typed it into.
function rrDispositionOptionsFor(report, id) {
  let data = rrItemById(report, id) || null;
  if (!data) {
    const declared = Array.isArray(report && report.self_decisions) ? report.self_decisions : [];
    data = declared.find((entry, n) => (entry && entry.decision_id ? entry.decision_id : "SD" + (n + 1)) === id) || null;
  }
  const own = data && Array.isArray(data.verdict_disposition_options) && data.verdict_disposition_options.length
    ? data.verdict_disposition_options : null;
  return own || RR_DEFAULT_DISPOSITIONS;
}

// Fill the state from a verdict file. Nothing here decides WHETHER it should be filled — the
// mount decides that, because the precedence between a filed verdict and what the operator
// typed is a promise, not a detail this function may make up.
function rrApplyVerdictToState(state, verdict) {
  const report = state.report;
  const records = rrVerdictRecords(report, verdict);
  Object.keys(records).forEach((id) => {
    const record = records[id];
    const patch = { verdict: record.verdict, note: record.note, chosenOption: record.chosenOption };
    if (record.disposition != null) {
      if (rrDispositionOptionsFor(report, id).indexOf(record.disposition) >= 0) patch.disposition = record.disposition;
      else patch.dispOther = record.disposition;
    }
    rrSetRec(state, id, patch);
  });
  if (typeof verdict.verdict_by === "string") state.reviewer = verdict.verdict_by;
}

// D-066, AND THE SUMMARY IS DERIVED — nobody writes it. Two verdict files go in and what comes
// out is the comparison of the two: which steps change verdict, which change disposition,
// which change note, and whether the signer changed. `identical` is a MEASURED answer and not
// an absence of one: when it is true the warning still appears and says so in those words,
// because a warning that only shows up on a difference teaches the operator to click without
// reading, and then the next silent overwrite is the interface's fault.
function rrVerdictDelta(report, previous, next, T) {
  const before = rrVerdictRecords(report, previous);
  const after = rrVerdictRecords(report, next);
  const fields = [["verdict", T.changeVerdict], ["disposition", T.changeDisposition], ["note", T.changeNote]];
  const steps = [];
  rrSteps(report, T).forEach((step) => {
    const was = before[step.id] || {};
    const now = after[step.id] || {};
    const changes = [];
    fields.forEach((pair) => {
      const from = was[pair[0]] == null ? null : was[pair[0]];
      const to = now[pair[0]] == null ? null : now[pair[0]];
      if (from !== to) changes.push({ field: pair[1], from, to });
    });
    if (changes.length) steps.push({ id: step.id, label: rrStepLabel(step, T), changes });
  });
  const wasSigner = previous && previous.verdict_by != null ? String(previous.verdict_by) : null;
  const nowSigner = next && next.verdict_by != null ? String(next.verdict_by) : null;
  const signer = wasSigner === nowSigner ? null : { field: T.changeSigner, from: wasSigner, to: nowSigner };
  return { steps, signer, identical: steps.length === 0 && !signer };
}

// ---------------------------------------------------------------------------
// [#58] WHAT IS TYPED SURVIVES A RELOAD. Not a new mechanism: the browser already remembers
// two things for this view — the interface language and the theme — through the two helpers
// at the foot of this file, and this is the third. Measured before choosing: `localStorage`
// is the ONLY persistence the console has, so putting the typed judgement anywhere else
// would be inventing a promise about where the operator's work lives.
//
// The key is the report's own run identifier, so two reports never overwrite each other's
// typing. A report that carries none is not persisted rather than persisted under a name
// this file made up.
// ---------------------------------------------------------------------------

function rrDraftKey(report) {
  const id = report && typeof report.run_id === "string" ? report.run_id : "";
  return id ? "draft." + id : "";
}

function rrSaveDraft(state) {
  const key = rrDraftKey(state.report);
  if (!key) return;
  try { rrLsSet(key, JSON.stringify({ v: state.v, reviewer: state.reviewer })); }
  catch (err) { /* a state that will not serialise is nothing the operator can act on */ }
}

function rrLoadDraft(state) {
  const key = rrDraftKey(state.report);
  if (!key) return false;
  const raw = rrLsGet(key, "");
  if (!raw) return false;
  let parsed = null;
  try { parsed = JSON.parse(raw); } catch (err) { return false; }
  if (!parsed || typeof parsed !== "object" || !parsed.v || typeof parsed.v !== "object") return false;
  state.v = parsed.v;
  state.reviewer = typeof parsed.reviewer === "string" ? parsed.reviewer : "";
  return true;
}

function rrClearDraft(state) {
  const key = rrDraftKey(state.report);
  if (!key) return;
  try { if (typeof localStorage !== "undefined") localStorage.removeItem("rr." + key); }
  catch (err) { /* storage denied is not an error the operator can act on */ }
}

// The tally counts SIGNABLE steps only. An item that declares it needs no verdict is on
// screen and in the index, but it is not part of what the operator still owes.
function rrProgress(report, state, T) {
  const steps = rrSigningSteps(report, T);
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

// THE GUARD, and it is a guard, not an aggregation: the run verdict is NEVER computed
// from the step verdicts — the operator decides it, and this function only says whether
// APPROVED would sign a contradiction, and why. A step in CHANGES_REQUIRED is compatible
// with an approved run only when its fix travels somewhere else: a disposition is
// present AND it is not the fix-here one. Otherwise the work is still owed to this run
// (or nobody said where it goes), approving would close a run that has not closed, and
// the reason comes back WRITTEN — an option that vanished in silence would be the
// interface deciding; one that says why is the interface refusing a contradiction.
// [#58] It also NAMES them. Counting was all it ever did, so "one step still owes this run"
// left the operator to find that one step among however many cards the report carries. The
// count is unchanged and the sentence is unchanged; `blockers` is the same measurement said
// with identifiers instead of only with a number.
function rrRunApprovedGuard(report, state, T) {
  let noDisposition = 0, owedHere = 0;
  const blockers = [];
  rrSigningSteps(report, T).forEach((s) => {
    if (s.kind === "run") return;
    const r = rrRec(state, s.id);
    if (r.verdict !== "CHANGES_REQUIRED") return;
    const disposition = rrEffectiveDisposition(r);
    if (disposition == null) {
      noDisposition += 1;
      blockers.push({ id: s.id, label: rrStepLabel(s, T), why: T.blockerNoDisposition });
    } else if (disposition === RR_FIX_HERE) {
      owedHere += 1;
      blockers.push({ id: s.id, label: rrStepLabel(s, T), why: T.blockerOwedHere });
    }
  });
  const parts = [];
  if (noDisposition) parts.push(T.guardNoDisposition(noDisposition));
  if (owedHere) parts.push(T.guardOwedHere(owedHere));
  return {
    available: parts.length === 0,
    reason: parts.length ? T.guardHeld + parts.join(T.and) + "." : null,
    blockers
  };
}

// Everything that stands between the operator and the sign button, in one answer: the
// per-step gate (rrMissing) and the guard's second tooth — a run already APPROVED whose
// steps later came to owe it work must not sign either.
function rrSignBlocks(report, state, T) {
  const missing = rrMissing(report, state, T);
  const guard = rrRunApprovedGuard(report, state, T);
  const contradiction = rrRec(state, "__run__").verdict === "APPROVED" && !guard.available ? guard.reason : null;
  return { missing, contradiction, ready: missing.length === 0 && !contradiction };
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

// [#58] A list that names steps, CLOSED BY DEFAULT — no `open` attribute, which is what the
// operator asked for — and every row is a way IN. The rows carry the rail's own `goto`, so
// the same click that tells the operator which step it is takes them to it; a list that only
// named them would still leave the hunt through the cards to do by hand.
function rrStepListHtml(entries, label, T) {
  if (!entries || !entries.length) return "";
  const rows = entries.map((entry) =>
    '<div class="rr-blocker-row" data-rr-act="goto" data-rr-id="' + rrEsc(entry.id) + '" title="' + rrEsc(entry.label) + '">' +
    '<span class="rr-blocker-label">' + rrEsc(entry.label) + "</span>" +
    (entry.why ? '<span class="rr-blocker-why">' + rrEsc(entry.why) + "</span>" : "") +
    rrIcon("arrow-right") + "</div>").join("");
  return '<details class="rr-blockers"><summary>' + rrIcon("caret") + rrEsc(label) +
    '<span class="rr-blockers-n">' + entries.length + "</span></summary>" +
    '<div class="rr-blockers-body">' + rows + "</div></details>";
}

// One bar, two vocabularies: `verdicts` says which tokens this step takes — an item's
// two, the run's three. `held` travels only with the run, and only the guard writes it:
// when APPROVED is not available, the button stays on screen but refuses (disabled), and
// the reason paints next to it in words. It never disables a SELECTED APPROVED — taking
// it back is how the operator resolves the contradiction, and that path must stay open.
function rrVerdictBarHtml(id, rec, question, dispositionOptions, T, lang, verdicts, held) {
  const gloss = RR_DISPOSITION_GLOSS[lang] || RR_DISPOSITION_GLOSS.en;
  const disp = (Array.isArray(dispositionOptions) && dispositionOptions.length) ? dispositionOptions : RR_DEFAULT_DISPOSITIONS;
  const holds = held && !held.available;
  const buttons = verdicts.map((v) =>
    '<button type="button" class="rr-btn rr-btn-mono ' + (rec.verdict === v ? "rr-btn-primary" : "rr-btn-secondary") +
    '" data-rr-act="verdict" data-rr-id="' + rrEsc(id) + '" data-rr-value="' + rrEsc(v) + '"' +
    (holds && v === "APPROVED" && rec.verdict !== "APPROVED" ? " disabled" : "") + '>' + rrEsc(v) + "</button>").join("");
  const needsDisposition = rec.verdict === "CHANGES_REQUIRED";
  const dispButtons = disp.map((d) =>
    '<button type="button" class="rr-btn ' + (rec.disposition === d ? "rr-btn-primary" : "rr-btn-secondary") +
    '" data-rr-act="disposition" data-rr-id="' + rrEsc(id) + '" data-rr-value="' + rrEsc(d) +
    '" title="' + rrEsc(gloss[d] || "") + '">' + rrEsc(d) + "</button>").join("");
  return '<div class="rr-verdict-bar">' +
    '<div class="rr-verdict-row"><span class="rr-question">' + rrEsc(question) + '</span>' +
    '<div class="rr-verdict-btns">' + buttons + "</div></div>" +
    (holds
      ? '<div class="rr-guard-reason">' + rrIcon("warning") + "<span>" + rrEsc(held.reason) + "</span></div>" +
        rrStepListHtml(held.blockers, T.whichOnes, T)
      : "") +
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

function rrPreviewsHtml(id, previews, tab, previewStatus, base, T) {
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
  // THE FRAME IS PROJECT-AUTHORED HTML, served on this console's own origin next to its three
  // write routes, so it carries `sandbox` with the EMPTY token set. Without `allow-same-origin`
  // the framed document is an opaque origin: it cannot reach this console's DOM (or the name the
  // operator types into the verdict), and any request it makes carries `Origin: null`, which the
  // server's origin gate refuses. No other token is granted: a preview is a document to READ,
  // and every token added here widens what EVERY project's HTML may do inside this console —
  // that is a decision to write down, not a default (RUN-CONSOLE-PREVIEW-SANDBOX-001).
  //
  // The src is the URL THE PROBE VERIFIED — `state.previewBase` + the declared path. The bare
  // declared path resolves against this DOCUMENT's URL, which is a different namespace than the
  // probe's, so a pane framed that way painted the server's "not found" instead of the asset.
  const panes = shown.map((p) => {
    const ok = previewStatus[p.path] === "ok";
    const frameCls = comparing ? "rr-frame rr-frame-compare" : "rr-frame";
    return '<div class="rr-pane">' +
      '<div class="rr-pane-head"><span class="rr-pane-label">' + rrEsc(p.label || p.target || "") + "</span>" +
      '<span class="rr-pane-path" title="' + rrEsc(p.path || "") + '">' + rrEsc(p.path || "") + "</span></div>" +
      (ok
        ? '<iframe class="' + frameCls + '" sandbox="" src="' + rrEsc((base || "") + (p.src || p.path || "")) + '" title="' + rrEsc(p.label || p.target || "") + '"></iframe>'
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

  // An item that asks for no verdict is never "pending": pending is a debt, and this one
  // owes nothing. It says so in words instead of wearing a status it can never leave.
  const signs = rrSignsVerdict(item);
  const statusChip = !signs
    ? '<span class="rr-tag rr-tag-outline rr-status rr-status-na">' + rrEsc(T.noVerdictNeeded) + "</span>"
    : rec.verdict
      ? '<span class="rr-tag rr-tag-accent rr-status rr-status-set">' + rrEsc(rec.verdict) + "</span>"
      : '<span class="rr-tag rr-tag-neutral rr-status">' + rrEsc(T.pendingTag) + "</span>";

  const subjectLine = (subj.label || subj.id)
    ? '<div class="rr-subject-line"><span class="rr-subject-label">' + rrEsc(subj.label || subj.id || id) + "</span>" +
      (subj.id && subj.label && subj.id !== subj.label
        ? '<span class="rr-subject-id">' + rrEsc(subj.id) + "</span>" : "") + "</div>"
    : "";

  const sections = [];
  if (previews.length > 0) sections.push(rrPreviewsHtml(id, previews, tab, state.previewStatus, state.previewBase, T));
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
      (row.showKey ? '<div class="rr-diff-key">' + rrEsc(rrLabelForKey(row.key, T.lang)) + "</div>" : "") +
      '<div class="rr-diff-pair"><div class="rr-diff-side">' + rrDiffLinesHtml(row.B) + "</div>" +
      '<div class="rr-diff-side">' + rrDiffLinesHtml(row.A) + "</div></div></div>").join("");
    sections.push('<div class="rr-diff"><div class="rr-diff-heads"><span class="rr-kicker">' + rrEsc(T.before) +
      '</span><span class="rr-kicker rr-kicker-accent">' + rrEsc(T.after) + "</span></div>" + rows + "</div>");
  }
  if (diff.onlyAfter) {
    const rows = diff.rows.map((row) =>
      '<div class="rr-diff-row">' +
      (row.showKey ? '<div class="rr-diff-key">' + rrEsc(rrLabelForKey(row.key, T.lang)) + "</div>" : "") +
      '<div class="rr-diff-side">' + rrDiffLinesHtml(row.A) + "</div></div>").join("");
    sections.push('<div class="rr-diff"><div class="rr-diff-heads-single"><span class="rr-kicker rr-kicker-accent">' +
      rrEsc(T.whatExistsNow) + "</span>" +
      (noBefore ? '<span class="rr-no-prior">' + rrEsc(T.noPriorVersion) + "</span>" : "") +
      "</div>" + rows + "</div>");
  }
  if (Array.isArray(item.unchanged) && item.unchanged.length > 0) {
    sections.push('<div class="rr-unchanged"><span class="rr-unchanged-label">' + rrIcon("equals") + rrEsc(T.unchanged) + "</span>" +
      item.unchanged.map((u) => rrTagHtml(rrUnchangedLabel(u, T.lang), "rr-tag-neutral")).join("") + "</div>");
  }

  const reasoningParts = [];
  if (item.why) reasoningParts.push('<p class="rr-why">' + rrEsc(item.why) + "</p>");
  if (item.authority) {
    reasoningParts.push('<div class="rr-authority">' + rrIcon("seal-check") +
      "<span>" + rrEsc(rrAuthorityText(item.authority, T.lang)) + "</span></div>");
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
  // It FOLDS, like every other section that carries prose (the reasoning above it is the
  // same `<details open>`): the operator opens the card with it in view and can put it away
  // once read, instead of scrolling past a block that never closes.
  if (item.if_rejected) {
    sections.push('<details class="rr-if-rejected' + (noBefore ? " rr-if-rejected-hard" : "") + '" open>' +
      '<summary><span class="rr-kicker rr-kicker-accent">' + rrIcon("caret") + rrIcon("arrow-u-left") +
      rrEsc(T.ifRejected) + "</span></summary>" +
      '<p class="rr-prose">' + rrEsc(item.if_rejected) + "</p></details>");
  }

  // The disposition options may travel with the item (`verdict_disposition_options`); the
  // VERDICT vocabulary never does. An item that declares it needs no verdict gets no bar:
  // there is nothing to ask, so nothing is asked.
  if (signs) {
    sections.push(rrVerdictBarHtml(id, rec, T.questionItem, item.verdict_disposition_options, T, state.lang, RR_ITEM_VERDICTS, null));
  }

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
      k: k === "scope_if_accepted" ? T.ifAccepted : k === "scope_if_rejected" ? T.ifRejectedScope : rrLabelForKey(k, T.lang),
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
      "<span>" + rrEsc(rrAuthorityText(decision.authority, T.lang)) + "</span></div>");
  }
  if (reasoningParts.length) {
    sections.push('<details class="rr-reasoning" open><summary>' + rrIcon("caret") + rrEsc(T.reasoning) + "</summary>" +
      '<div class="rr-reasoning-body">' + reasoningParts.join("") + "</div></details>");
  }
  if (decision.if_rejected) {
    sections.push('<details class="rr-if-rejected" open><summary><span class="rr-kicker rr-kicker-accent">' +
      rrIcon("caret") + rrIcon("arrow-u-left") + rrEsc(T.ifRejected) + "</span></summary>" +
      '<p class="rr-prose">' + rrEsc(decision.if_rejected) + "</p></details>");
  }
  sections.push(rrVerdictBarHtml(id, rec, T.questionDecision, decision.verdict_disposition_options, T, state.lang, RR_ITEM_VERDICTS, null));

  return '<div class="rr-card" id="rr-it-' + rrEsc(id) + '">' +
    '<div class="rr-card-head"><div class="rr-card-head-main">' +
    '<div class="rr-tag-row">' + rrTagHtml(T.decisionType, "rr-tag-neutral") + "</div>" +
    '<div class="rr-headline">' + rrEsc(decision.what || "") + "</div>" +
    "</div>" + statusChip + "</div>" +
    '<div class="rr-card-body">' + sections.join("") + "</div></div>";
}

// [#58] The verdict that was read off disk when the report opened, said in words. Everything
// in it is the FILE's own — who signed it, when it was stamped, what it said about the run —
// so a report that carries one cannot come back looking as though nobody had ever judged it.
function rrFiledHtml(state, T) {
  const filed = state.filed;
  if (!filed) return "";
  const bits = [];
  if (filed.run && filed.run.verdict) bits.push(String(filed.run.verdict));
  if (filed.verdict_by) bits.push(T.filedSigned + " " + String(filed.verdict_by));
  if (filed.decided_at) bits.push(T.filedWhen + " " + String(filed.decided_at));
  return '<div class="rr-filed">' + rrIcon("seal-check") +
    '<div class="rr-filed-body">' +
    '<span class="rr-filed-title">' + rrEsc(T.filedTitle) + "</span>" +
    (bits.length ? '<span class="rr-filed-meta">' + rrEsc(bits.join(" · ")) + "</span>" : "") +
    (state.restored ? '<span class="rr-filed-note">' + rrEsc(T.filedRestored) + "</span>" : "") +
    "</div></div>";
}

// [#58] D-066 ON SCREEN. The gate the sign button passes through when a verdict already sits
// beside the report: it states the overwrite, it shows the DERIVED comparison, and it waits.
// The two buttons are the only way out, and one of them writes nothing.
function rrConfirmHtml(delta, T) {
  const lineHtml = (change) =>
    '<div class="rr-delta-line">' +
    '<span class="rr-delta-field">' + rrEsc(change.field) + "</span>" +
    '<span class="rr-delta-from">' + rrEsc(change.from == null ? T.changeEmpty : change.from) + "</span>" +
    '<span class="rr-delta-arrow">' + rrIcon("arrow-right") + "</span>" +
    '<span class="rr-delta-to">' + rrEsc(change.to == null ? T.changeEmpty : change.to) + "</span></div>";
  const stepRows = delta.steps.map((step) =>
    '<div class="rr-delta-step">' +
    '<span class="rr-delta-label">' + rrEsc(step.label) + "</span>" +
    '<div class="rr-delta-lines">' + step.changes.map(lineHtml).join("") + "</div></div>").join("");
  const signerRow = delta.signer ? '<div class="rr-delta-step"><div class="rr-delta-lines">' + lineHtml(delta.signer) + "</div></div>" : "";
  return '<div class="rr-confirm">' +
    '<div class="rr-confirm-title">' + rrIcon("warning") + rrEsc(T.overwriteTitle) + "</div>" +
    (delta.identical
      ? '<p class="rr-confirm-same">' + rrEsc(T.overwriteSame) + "</p>"
      : '<div class="rr-confirm-changes"><span class="rr-kicker">' + rrEsc(T.overwriteChanges) + "</span>" +
        stepRows + signerRow + "</div>") +
    '<div class="rr-confirm-actions">' +
    '<button type="button" class="rr-btn rr-btn-secondary" data-rr-act="cancel-write">' + rrEsc(T.overwriteCancel) + "</button>" +
    '<button type="button" class="rr-btn rr-btn-primary" data-rr-act="confirm-write">' + rrEsc(T.overwriteConfirm) + "</button>" +
    "</div></div>";
}

// The LAST card: the run itself. It recaps the per-step tally and warns while steps are
// pending — the run verdict never replaces them. With a mechanical gate the question
// changes wording, exactly as the prototype words it.
function rrCardForRunHtml(report, state, T) {
  const R = report || {};
  const rec = rrRec(state, "__run__");
  const steps = rrSteps(report, T);
  // The recap tallies what can be signed. An item that needs no verdict is not a pending
  // one and must not swell the denominator the operator is judged against.
  const decided = steps.filter((s) => s.kind !== "run" && s.signs);
  const tally = {};
  decided.forEach((s) => {
    const v = rrRec(state, s.id).verdict || T.pendingTag;
    tally[v] = (tally[v] || 0) + 1;
  });
  // [#58] THE NUMBER DOES NOT CHANGE — HOW IT READS DOES. Every row used to print the same
  // `n / decided.length`, three rows deep, which reads as three separate totals of three
  // different things instead of three parts of one. So the denominator is stated ONCE, above
  // the rows, with the reason it is that number written next to it: the run does not count
  // itself (`s.kind !== "run"`) and a step that asks for no verdict does not swell it
  // (`s.signs`), which are exactly the two filters `decided` is built from.
  const recapRows = RR_ITEM_VERDICTS.concat([T.pendingTag]).filter((k) => tally[k]).map((k) =>
    '<div class="rr-recap-row">' + rrDotHtml(k !== T.pendingTag) +
    '<span class="rr-recap-label">' + rrEsc(k) + '</span>' +
    '<span class="rr-recap-value">' + tally[k] + "</span></div>").join("");
  const pending = tally[T.pendingTag] || 0;
  // The pending steps, by name and reachable — the recap counted them and named nobody.
  const pendingSteps = decided.filter((s) => !rrRec(state, s.id).verdict)
    .map((s) => ({ id: s.id, label: rrStepLabel(s, T), why: "" }));
  const statusChip = rec.verdict
    ? '<span class="rr-tag rr-tag-accent rr-status rr-status-set">' + rrEsc(rec.verdict) + "</span>"
    : '<span class="rr-tag rr-tag-neutral rr-status">' + rrEsc(T.pendingTag) + "</span>";

  const sections = [];
  // [#58] The verdict already on disk, named where it cannot be missed. Read on open, it also
  // fills every card and every rail dot below — this block is the one that says so in words.
  const filedBlock = rrFiledHtml(state, T);
  if (filedBlock) sections.push(filedBlock);
  if (recapRows) {
    sections.push('<div class="rr-recap">' +
      '<div class="rr-recap-head"><span class="rr-recap-total">' + decided.length + "</span>" +
      '<span class="rr-recap-total-label">' + rrEsc(T.recapDenominator(decided.length)) + "</span></div>" +
      '<div class="rr-recap-rows">' + recapRows + "</div>" +
      '<p class="rr-recap-why">' + rrEsc(T.recapWhy) + "</p>" +
      rrStepListHtml(pendingSteps, T.whichOnes, T) +
      "</div>");
  }
  if (pending > 0) {
    sections.push('<div class="rr-warning">' + rrIcon("warning") +
      '<p class="rr-prose">' + rrEsc(T.pendingLeft(pending)) + "</p></div>");
  }
  const question = R.gate === "mechanical" ? T.questionRunMechanical : T.questionRun;
  sections.push(rrVerdictBarHtml("__run__", rec, question, null, T, state.lang, RR_RUN_VERDICTS,
    rrRunApprovedGuard(report, state, T)));

  const blocks = rrSignBlocks(report, state, T);
  // TWO VERBS, ONE TRUTH EACH (#57): with a writer injected the button writes verdict.json
  // beside the report and says "Write"; without one it downloads and says "Download". The
  // hint follows the same fact, and after a write it carries the endpoint's own answer — the
  // path that was written, or the refusal, worded.
  const writeMode = !!state.writer;
  const writeState = state.write || { status: "idle", detail: "", path: "" };
  const busy = writeState.status === "writing";
  const ready = blocks.ready && !busy;
  const signHint = busy ? T.writing
    : writeState.status === "written" ? T.writtenTo + writeState.path
      : writeState.status === "failed" ? T.writeRefused + writeState.detail
        : blocks.ready ? (writeMode ? T.completeWrite : T.complete)
          : [blocks.missing.length ? T.missingPrefix + blocks.missing.join(T.and) + "." : "", blocks.contradiction || ""]
            .filter(Boolean).join(" ");
  const sign = '<div class="rr-sign' + (blocks.ready ? " rr-sign-ready" : "") + '">' +
    '<div class="rr-sign-row">' +
    '<div class="rr-field"><label>' + rrEsc(T.signLabel) + "</label>" +
    '<input class="rr-input" data-rr-act="reviewer" placeholder="' + rrEsc(T.signPlaceholder) +
    '" value="' + rrEsc(state.reviewer || "") + '"></div>' +
    '<button type="button" class="rr-btn rr-btn-primary rr-sign-btn" data-rr-act="sign"' + (ready ? "" : " disabled") + ">" +
    rrIcon(writeMode ? "seal-check" : "download") + rrEsc(writeMode ? T.writeVerdict : T.downloadVerdict) + "</button></div>" +
    '<span class="rr-sign-hint">' + rrEsc(signHint) + "</span>" +
    // [#58] D-066: while a confirmation is pending the panel stands between the button and
    // the write, and nothing has been written yet.
    (state.confirm ? rrConfirmHtml(state.confirm.delta, T) : "") +
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
    // "Pending" is what is still OWED. A step that asks for no verdict owes nothing and
    // never appears there, however long the operator leaves it unsigned.
    if (filter === "pending") return s.signs && !rrRec(state, s.id).verdict;
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
    const label = rrStepLabel(s, T);
    const title = s.kind === "item" ? (s.data.headline || "") : label;
    const stop = s.kind === "item" && !!s.data.stop;
    const inherits = s.kind === "item" && !s.data.stop && rrHasStopInside(report, s.data);
    rows.push('<div class="rr-rail-row' + (i === state.cardIdx ? " rr-rail-row-active" : "") +
      (s.depth > 0 ? " rr-rail-row-child" : "") + (s.signs ? "" : " rr-rail-row-na") +
      '" data-rr-act="goto" data-rr-id="' + rrEsc(s.id) +
      '" title="' + rrEsc(s.signs ? title : (title ? title + " · " + T.noVerdictNeeded : T.noVerdictNeeded)) + '">' +
      (s.signs ? rrDotHtml(!!rrRec(state, s.id).verdict) : '<span class="rr-dot rr-dot-na"></span>') +
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
      absent: !present, entries: rrKvEntries(arr, T.lang)
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
  const metaRows = metaKeys.filter((k) => R[k] != null).map((k) => ({ k: rrLabelForKey(k, T.lang), v: String(R[k]) }));
  // `profile: null` with a reason is a declared fact, not a hole — it leads the list.
  if (R.profile === null && R.profile_reason) {
    metaRows.unshift({ k: rrLabelForKey("profile", T.lang), v: "null — " + R.profile_reason });
  }

  const dev = R.pilot_deviation;
  // A deviation's fields are the EMITTER's own: humanised, never printed as identifiers.
  const devRows = dev ? Object.entries(dev).map(([k, v]) => ({ k: rrLabelForKey(k, T.lang), v: String(v) })) : [];

  // What a report COUNTS is named by the report; this view humanises that name and can
  // never translate it, because knowing it is knowing the domain.
  const countRows = Object.entries(R.counts || {}).map(([k, v]) => {
    const before = v && typeof v === "object" ? v.before : null;
    const after = v && typeof v === "object" ? v.after : null;
    const delta = (after != null ? after : 0) - (before != null ? before : 0);
    return { label: rrHumanKey(k), before: String(before != null ? before : "—"), after: String(after != null ? after : "—"),
      delta: delta === 0 ? "—" : (delta > 0 ? "+" : "") + delta };
  });
  const locs = (Array.isArray(R.locations) ? R.locations : []).map((L) => ({
    label: L.label || "", path: L.path || "", lines: L.lines != null ? String(L.lines) : "", note: L.note || ""
  }));

  const ver = R.verification;
  const verifChip = ver ? [ver.command, ver.result].filter(Boolean).join(" · ") : T.noVerification;
  // THE ROW LABELS ARE WRITTEN, not pushed. This block used to hand the operator its own
  // JSON keys — `gate`, `verification`, `verification_reason` — and the literal string
  // "null" for a verification nobody ran. Each one now carries the words it is called on
  // screen, in both languages, and the missing verification says so in prose.
  const L = (key) => rrLabelForKey(key, T.lang);
  const gateRows = [{ k: L("gate"), v: R.gate || "—" }];
  if (R.gate_reason) gateRows.push({ k: L("gate_reason"), v: R.gate_reason });
  if (ver) Object.entries(ver).forEach(([k, v]) => gateRows.push({ k: L("verification." + k), v: String(v) }));
  else gateRows.push({ k: L("verification"), v: T.noVerification });
  if (R.verification_note) gateRows.push({ k: L("verification_note"), v: R.verification_note });
  if (R.verification_reason) gateRows.push({ k: L("verification_reason"), v: R.verification_reason });
  if (R.items_note) gateRows.push({ k: L("items_note"), v: R.items_note });

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
  // TWO DIFFERENT NUMBERS, and they stopped being the same one the moment a step could be
  // shown without being signable: the POSITION counts cards the operator walks through
  // (every step), the PROGRESS counts verdicts owed (only the signable ones).
  const cards = steps.length;
  const idx = Math.min(state.cardIdx, Math.max(0, cards - 1));
  return '<span class="rr-app-title">' + rrEsc(T.appTitle) + "</span>" +
    '<span class="rr-tag rr-tag-outline rr-gate-chip" title="' + rrEsc(R.gate_reason || "") + '">' +
    rrEsc(T.gate) + " · " + rrEsc(R.gate || "—") + "</span>" +
    // [#58] The chip rides the topbar, which is on screen from the FIRST card — the run card
    // that spells the filed verdict out is the last one, and a fact only visible at the end
    // is a fact the operator signs without.
    (state.filed
      ? '<span class="rr-tag rr-tag-outline rr-filed-chip" title="' + rrEsc(T.filedTitle) + '">' +
        rrIcon("seal-check") + rrEsc(T.filedChip) + "</span>"
      : "") +
    '<span class="rr-topbar-spacer"></span>' +
    '<span class="rr-progress-text">' + done + " / " + total + "</span>" +
    '<div class="rr-nav">' +
    '<button type="button" class="rr-btn rr-btn-icon rr-btn-secondary" data-rr-act="prev" title="' + rrEsc(T.prev) + '"' +
    (idx <= 0 ? " disabled" : "") + ">" + rrIcon("arrow-left") + "</button>" +
    '<span class="rr-card-pos">' + (cards ? (idx + 1) + " / " + cards : "—") + "</span>" +
    '<button type="button" class="rr-btn rr-btn-icon rr-btn-secondary" data-rr-act="next" title="' + rrEsc(T.next) + '"' +
    (idx >= cards - 1 ? " disabled" : "") + ">" + rrIcon("arrow-right") + "</button></div>" +
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
    v: {}, reviewer: "", previewTab: {}, previewStatus: {}, previewBase: "",
    // The writer the console injects (#57), and what became of the last write. With no writer
    // the sign button downloads, and says so — two different verbs for two different acts.
    writer: null, write: { status: "idle", detail: "", path: "" },
    // [#58] The verdict read off disk when the report opened (null when there is none),
    // whether what is on screen came back from a reload, and the pending D-066 confirmation.
    filed: null, restored: false, confirm: null,
    lang: rrLsGet("lang", "en"), theme: rrLsGet("theme", "dark")
  };
}

// Any change to what would be signed makes the last write's outcome stale: the hint must not
// keep claiming "written" over a state that no longer is what was written.
function rrResetWrite(state) {
  // [#58] And it makes a PENDING CONFIRMATION stale too. That panel asks about one specific
  // comparison; change what would be signed and the question is no longer the one the
  // operator was answering, so it is withdrawn rather than left to confirm something else.
  state.confirm = null;
  if (state.write && state.write.status !== "idle" && state.write.status !== "writing") {
    state.write = { status: "idle", detail: "", path: "" };
  }
}

// Every preview path is probed ONCE per mount; a pane only becomes an iframe after the
// probe answers ok, and shows the path it could not reach otherwise. The probe reads the base
// from STATE — the same field the pane builder reads — so the URL that is framed is always the
// URL that was verified, and the two cannot drift apart again.
function rrCheckPreviews(state, redraw) {
  if (typeof fetch !== "function" || !state.report) return;
  rrItems(state.report).forEach((item) => {
    const previews = (item.subject && item.subject.previews) || [];
    previews.forEach((p) => {
      if (!p.path || state.previewStatus[p.path]) return;
      state.previewStatus[p.path] = "checking";
      fetch((state.previewBase || "") + p.path, { method: "GET" })
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
  state.previewBase = String(options.previewBase || "");
  // The writer arrives by INJECTION (#57) — a callback, never a URL composed here, so this
  // file stays blind to where a verdict lands and to whose project the report belongs.
  state.writer = typeof options.writeVerdict === "function" ? options.writeVerdict : null;

  // [#58] THE VERDICT ALREADY ON DISK, and the same rule as the writer: it arrives as DATA
  // (`existingVerdict`, bytes or object), fetched by whoever knows where a verdict lives. A
  // file that does not parse is treated as no file — a report must still open and still be
  // signable when the thing beside it is damaged.
  const filed = rrParseReport(options.existingVerdict == null ? null : options.existingVerdict);
  state.filed = filed.error ? null : filed.report;
  if (state.filed) rrApplyVerdictToState(state, state.filed);

  // ...AND WHAT WAS TYPED WINS OVER IT. Both can exist at once and disagree, and which one
  // the form shows is a promise rather than a detail: the operator's own typing is never
  // thrown away by a reload, and the filed verdict does not vanish for it — it stays named on
  // the run card and in the topbar, and it is the baseline the D-066 comparison measures
  // against when the sign button is pressed.
  state.restored = rrLoadDraft(state);

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
      const next = current === value ? null : value;
      // The guard's mechanical tooth: SETTING the run to APPROVED while steps owe it
      // work is refused here in the model, not just dimmed in the paint. Taking an
      // APPROVED back (next === null) always goes through.
      if (id === "__run__" && next === "APPROVED" &&
          !rrRunApprovedGuard(state.report, state, rrT(state.lang)).available) return;
      rrSetRec(state, id, { verdict: next, disposition: null });
      rrResetWrite(state);
      rrSaveDraft(state);
      draw();
    } else if (act === "disposition") {
      const current = rrRec(state, id).disposition;
      rrSetRec(state, id, { disposition: current === value ? null : value, dispOther: "" });
      rrResetWrite(state);
      rrSaveDraft(state);
      draw();
    } else if (act === "chosen-option") {
      const current = rrRec(state, id).chosenOption;
      rrSetRec(state, id, { chosenOption: current === value ? null : value });
      rrResetWrite(state);
      rrSaveDraft(state);
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
      if (!rrSignBlocks(state.report, state, rrT(state.lang)).ready) return;
      // No writer injected: the button said "Download", and that is what happens.
      if (!state.writer) {
        rrDownloadVerdict(JSON.stringify(rrVerdictOutput(state.report, state), null, 2));
        return;
      }
      if (state.write.status === "writing") return;
      // [#58] D-066, AND IT IS THE LAW OF THIS RUN. Signing over a verdict that already
      // exists is NEVER a direct write. The first press raises the warning, carrying the
      // comparison of the two files, and stops there — nothing is posted. Only the explicit
      // confirmation below writes. When the two are identical the warning still comes, and
      // says so in those words, so the gesture never becomes one the operator can learn to
      // make blind.
      if (state.filed && !state.confirm) {
        state.confirm = {
          delta: rrVerdictDelta(state.report, state.filed, rrVerdictOutput(state.report, state), rrT(state.lang))
        };
        draw();
        return;
      }
      performWrite();
    } else if (act === "confirm-write") {
      if (!state.confirm) return;
      state.confirm = null;
      performWrite();
    } else if (act === "cancel-write") {
      // Nothing was written, and nothing is: that is the whole of what the gate promises.
      state.confirm = null;
      draw();
    }
  });

  // The write itself, once whatever had to be asked has been asked. The button said "Write",
  // and the outcome — the path written, or the refusal — comes back worded from whoever
  // actually wrote. One write at a time.
  function performWrite() {
    if (state.write.status === "writing") return;
    state.write = { status: "writing", detail: "", path: "" };
    draw();
    Promise.resolve()
      .then(() => state.writer(rrVerdictOutput(state.report, state)))
      .then((result) => {
        if (result && result.ok) {
          state.write = { status: "written", detail: "", path: String(result.path || "") };
          // [#58] What was typed IS what is filed now. The saved copy has no separate life
          // left to lead, and what was just written becomes the baseline the NEXT signature
          // is compared against — so a second press warns about the second change, not
          // about the first one all over again. `decided_at` is the writer's stamp and is
          // not invented here; the block simply shows no date until the file is re-read.
          state.filed = rrVerdictOutput(state.report, state);
          state.restored = false;
          rrClearDraft(state);
        } else {
          state.write = { status: "failed", detail: String((result && (result.reason || result.detail)) || ""), path: "" };
        }
        draw();
      })
      .catch((error) => {
        state.write = { status: "failed", detail: String((error && error.message) || error), path: "" };
        draw();
      });
  }

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
      rrResetWrite(state);
      rrSaveDraft(state);
    } else if (act === "disp-other") {
      rrSetRec(state, id, { dispOther: target.value, disposition: null });
      rrResetWrite(state);
      rrSaveDraft(state);
    } else if (act === "reviewer") {
      const wasReady = rrSignBlocks(state.report, state, rrT(state.lang)).ready;
      state.reviewer = target.value;
      rrResetWrite(state);
      rrSaveDraft(state);
      const isReady = rrSignBlocks(state.report, state, rrT(state.lang)).ready;
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
  rrCheckPreviews(state, draw);
  return {
    // The console (#53) holds this handle; the suite drives the same paths headlessly.
    state,
    redraw: draw,
    goStep,
    moveCard
  };
}
