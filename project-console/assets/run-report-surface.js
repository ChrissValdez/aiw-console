// RUN-CONSOLE-REPORTS-SURFACE-001 — THE MOUNT. Everything that stands between the console and
// `renderRunReport`, and nothing else.
//
// It is a file of its own, and that is the whole point. The renderer (#52) is domain-blind and
// its suite proves it mechanically against 94 vetoed tokens; mounting it could smuggle domain
// knowledge back in through the mounting code, where nothing would be watching. So the mount
// lives here, in one small file and one small stylesheet, and the SAME mechanical veto runs
// over both. Growing this file with a project's vocabulary turns the suite red, exactly as it
// does for the renderer — which is how the veto caught this very comment on its first run.
//
// THE PATH IS FROM THE RUN, AND THERE IS NO OTHER. This file offers no case picker and no
// global report browser: those were prototype scaffolding. What it offers is the section a run
// detail shows about its own report, the layer that report opens in, and the way back.
//
// WHAT IT READS. `.project/reports_index.json`, the derived index (O4.P17), and never a walk of
// anybody's folders. The index answers every question this surface asks: which run has a report
// (`reports[].run_id`, the FOLDER name), where it is (`report_path`), when it was emitted
// (`emitted_at`, absent when the report carries none), whether a verdict sits beside it
// (`verdict_present`), whether it parsed (`read_error`), and which run folders exist with no
// report filed in them (`reports_source.unresolved`). Those last two are why absence here has
// three shapes and not one: never emitted, filed but empty, and emitted but unreadable are
// three different facts about a run, and an operator about to judge one needs to know which.
//
// WHAT IT NEVER DOES. It does not parse the report. The bytes travel from the fetch to
// `renderRunReport` untouched, so there is no field of a report this file could come to know.
// It does not validate, adapt, repair or translate: a report that does not conform fails in the
// project that emitted it, where its owner can fix it (ticket criterion 3). And it writes
// nothing ITSELF: the write is #57's endpoint, reached through the writer callback the console
// composes and this file only RELAYS to the renderer — no field of a verdict and no route to
// anywhere is composed here.
//
// THE LANGUAGE RULE (the run's own full_description): the chrome of the view is translatable,
// the content NEVER is. Every string in this file is chrome. The report's own text is quoted
// evidence and reaches the screen exactly as it sits on disk.

// ---------------------------------------------------------------------------
// Escaping. Its own copy on purpose: this file must load and be judged alone.
// ---------------------------------------------------------------------------

function rrsEsc(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

// ---------------------------------------------------------------------------
// THE INDEX MODEL — pure. Everything below reads this and nothing else.
// ---------------------------------------------------------------------------

// The five states a run can be in with respect to its report. They are five because the index
// distinguishes five, and collapsing any two would be this surface claiming something the index
// did not measure.
//
//   "index_unavailable" — no index loaded: nothing can be said about any run.
//   "ready"             — an entry, parsed, with a path to open.
//   "unreadable"        — an entry the emitter could not parse. It still opens: the renderer
//                         shows the parser's own message, which is more than "no report".
//   "filed_empty"       — reports/<run_id>/ exists and holds no report.json.
//   "not_emitted"       — no entry and no folder. Nobody ever filed one.

function rrsReportsOf(index) {
  return index && Array.isArray(index.reports) ? index.reports : null;
}

// Build the lookup model from one project's parsed index. A null/!shaped index yields an
// UNAVAILABLE model — never an empty one, because "no reports" and "no index" are the two
// facts this surface exists to keep apart.
function reportsIndexModel(index) {
  const reports = rrsReportsOf(index);
  const model = {
    available: false,
    directoryPresent: null,
    byRunId: new Map(),
    filedEmpty: new Set(),
    indexed: 0,
    unreadable: 0,
    pending: 0,
    signed: 0
  };
  if (!reports) return model;
  model.available = true;
  const source = (index && index.reports_source) || {};
  model.directoryPresent = typeof source.directory_present === "boolean" ? source.directory_present : null;
  reports.forEach((entry) => {
    if (!entry || typeof entry.run_id !== "string" || !entry.run_id) return;
    model.byRunId.set(entry.run_id, entry);
    model.indexed += 1;
    if (entry.read_error) model.unreadable += 1;
    // Pending is the DEFAULT: `verdict_present` is measured on disk by the emitter, and
    // anything other than a measured true leaves the run waiting for a person.
    if (entry.verdict_present === true) model.signed += 1;
    else model.pending += 1;
  });
  // A directory under reports/ with no report.json. The emitter files these under `unresolved`
  // with the reason; the run id is the last segment of the path it names.
  const unresolved = Array.isArray(source.unresolved) ? source.unresolved : [];
  unresolved.forEach((entry) => {
    if (!entry || typeof entry.path !== "string") return;
    if (entry.reason !== "no report.json") return;
    const runId = entry.path.split("/").filter(Boolean).pop();
    if (runId) model.filedEmpty.add(runId);
  });
  return model;
}

// What this run's report situation is. `runId` is a string and stays a string: this function
// is handed an identifier, never a run object, so there is no second field of the roadmap it
// could grow to read.
function reportStateForRun(model, runId) {
  const id = typeof runId === "string" ? runId : "";
  if (!model || !model.available) {
    return { state: "index_unavailable", runId: id, entry: null, reportPath: "", emittedAt: "", verdictPresent: false, readError: "" };
  }
  const entry = model.byRunId.get(id) || null;
  if (entry) {
    return {
      state: entry.read_error ? "unreadable" : "ready",
      runId: id,
      entry,
      reportPath: typeof entry.report_path === "string" ? entry.report_path : "",
      emittedAt: typeof entry.emitted_at === "string" ? entry.emitted_at : "",
      verdictPresent: entry.verdict_present === true,
      readError: typeof entry.read_error === "string" ? entry.read_error : ""
    };
  }
  return {
    state: model.filedEmpty.has(id) ? "filed_empty" : "not_emitted",
    runId: id,
    entry: null,
    reportPath: "",
    emittedAt: "",
    verdictPresent: false,
    readError: ""
  };
}

// ---------------------------------------------------------------------------
// THE SECTION IN THE RUN DETAIL — the only door into a report.
// ---------------------------------------------------------------------------

// `indexPath` is shown when there is nothing to open, so an absence names the file it was
// measured from instead of asserting itself out of nowhere (CONTRATO §20).
function runReportSectionHtml(model, runId, options) {
  const opts = options || {};
  const info = reportStateForRun(model, runId);
  const indexPath = rrsEsc(opts.indexPath || "");
  const openButton = (label) =>
    `<button class="btn btn-primary btn-sm rrs-open" type="button" data-run-report-open="${rrsEsc(info.runId)}">${rrsEsc(label)}</button>`;
  const meta = [];
  if (info.emittedAt) meta.push(`<span class="rrs-meta-item">emitted <span class="mono">${rrsEsc(info.emittedAt)}</span></span>`);
  if (info.reportPath) meta.push(`<span class="rrs-meta-item mono">${rrsEsc(info.reportPath)}</span>`);
  meta.push(info.verdictPresent
    ? '<span class="rrs-verdict-chip is-signed">a verdict is filed beside it</span>'
    : '<span class="rrs-verdict-chip is-pending">no verdict yet</span>');

  let body;
  if (info.state === "index_unavailable") {
    body = `
      <div class="rrs-absence">
        <div class="rrs-absence-line">The reports index for this project could not be read, so nothing can be said about this run's report — neither that it exists nor that it does not.</div>
        ${indexPath ? `<div class="rrs-absence-path mono">${indexPath}</div>` : ""}
      </div>
    `;
  } else if (info.state === "not_emitted") {
    body = `
      <div class="rrs-absence">
        <div class="rrs-absence-line">No report has been emitted for this run.</div>
        ${indexPath ? `<div class="rrs-absence-path">Measured from <span class="mono">${indexPath}</span>, which lists no entry and no folder for it.</div>` : ""}
      </div>
    `;
  } else if (info.state === "filed_empty") {
    body = `
      <div class="rrs-absence is-partial">
        <div class="rrs-absence-line">A folder was filed for this run, and no report was written into it. That is a started emission, not a missing one.</div>
        ${indexPath ? `<div class="rrs-absence-path">Measured from <span class="mono">${indexPath}</span>.</div>` : ""}
      </div>
    `;
  } else if (info.state === "unreadable") {
    body = `
      <div class="rrs-absence is-broken">
        <div class="rrs-absence-line">A report exists for this run and could not be parsed. It opens anyway: the surface shows the parser's own message rather than an empty screen.</div>
        <div class="rrs-absence-path mono">${rrsEsc(info.readError)}</div>
        <div class="rrs-meta">${meta.join("")}</div>
        <div class="rrs-actions">${openButton("Open the report")}</div>
      </div>
    `;
  } else {
    body = `
      <div class="rrs-present">
        <div class="rrs-meta">${meta.join("")}</div>
        <div class="rrs-actions">${openButton("Open the run report")}</div>
      </div>
    `;
  }
  return `
    <div class="drawer-section">
      <div class="drawer-section-title">Run report</div>
      ${body}
    </div>
  `;
}

// ---------------------------------------------------------------------------
// ACROSS PROJECTS: what is waiting for a person (ticket criterion 3).
//
// AGGREGATION, NOT TRANSLATION. The four indexes already share one shape, so counting across
// them states nothing about any project's reports beyond what its own emitter measured. This
// is deliberately a COUNT and not a list of links: a way into a report from here would be the
// global report browser the ticket forbids, and the way into a report is the run.
// ---------------------------------------------------------------------------

function pendingVerdictAcrossProjects(entries) {
  const rows = [];
  const totals = { pending: 0, indexed: 0, unreadable: 0, projectsReporting: 0, projectsUnavailable: 0 };
  (Array.isArray(entries) ? entries : []).forEach((item) => {
    if (!item || typeof item.key !== "string" || !item.key) return;
    const model = reportsIndexModel(item.index);
    if (!model.available) {
      rows.push({ key: item.key, label: item.label || item.key, available: false, pending: 0, indexed: 0, unreadable: 0 });
      totals.projectsUnavailable += 1;
      return;
    }
    rows.push({
      key: item.key,
      label: item.label || item.key,
      available: true,
      pending: model.pending,
      indexed: model.indexed,
      unreadable: model.unreadable
    });
    totals.projectsReporting += 1;
    totals.pending += model.pending;
    totals.indexed += model.indexed;
    totals.unreadable += model.unreadable;
  });
  return { rows, totals };
}

function pendingVerdictPanelHtml(summary) {
  if (!summary || !Array.isArray(summary.rows) || !summary.rows.length) return "";
  const rows = summary.rows.map((row) => {
    if (!row.available) {
      return `
        <div class="rrs-verdict-row is-unavailable">
          <span class="rrs-verdict-project">${rrsEsc(row.label)}</span>
          <span class="rrs-verdict-note">no reports index</span>
        </div>
      `;
    }
    const note = row.indexed === 0
      ? "no reports emitted"
      : `${row.pending} of ${row.indexed} awaiting a verdict${row.unreadable ? ` · ${row.unreadable} unreadable` : ""}`;
    return `
      <div class="rrs-verdict-row${row.pending ? " is-pending" : ""}">
        <span class="rrs-verdict-project">${rrsEsc(row.label)}</span>
        <span class="rrs-verdict-count">${row.pending}</span>
        <span class="rrs-verdict-note">${rrsEsc(note)}</span>
      </div>
    `;
  }).join("");
  const totals = summary.totals || { pending: 0, projectsReporting: 0 };
  return `
    <section class="rrs-verdict-panel">
      <div class="rrs-verdict-head">
        <div class="rrs-verdict-title">Awaiting a verdict</div>
        <div class="rrs-verdict-subtitle">${rrsEsc(`${totals.pending} across ${totals.projectsReporting} project${totals.projectsReporting === 1 ? "" : "s"} — each one is reached from the run it belongs to`)}</div>
      </div>
      <div class="rrs-verdict-rows">${rows}</div>
    </section>
  `;
}

// ---------------------------------------------------------------------------
// THE LAYER — where a report opens, and how the operator gets back to the run.
// ---------------------------------------------------------------------------

const RRS_VIEW_ID = "run-report-view";
const RRS_SCROLL_ID = "run-report-scroll";
const RRS_MOUNT_ID = "run-report-mount";
const RRS_BACK_ID = "run-report-back";
const RRS_TITLE_ID = "run-report-ref-title";
const RRS_SUBTITLE_ID = "run-report-ref-id";

// The live mount, so a second open replaces the first instead of stacking two surfaces with two
// pieces of unsaved judgement in them.
let rrsOpen = null;
let rrsBackHandler = null;
let rrsWired = false;

function rrsById(id) {
  return typeof document !== "undefined" ? document.getElementById(id) : null;
}

function rrsWire() {
  if (rrsWired) return;
  const view = rrsById(RRS_VIEW_ID);
  if (!view) return;
  rrsWired = true;
  view.addEventListener("click", (event) => {
    const back = event.target && event.target.closest ? event.target.closest("[data-run-report-back]") : null;
    if (back) {
      closeRunReport();
      return;
    }
    // THE SCROLL COMPENSATION, and the one place this file knows a renderer attribute exists.
    // The renderer scrolls the WINDOW to the top when the operator moves between steps; this
    // console's document never scrolls (`body { overflow: hidden }`), so that call is a no-op
    // here and a step change would leave the operator mid-page in the previous card. The
    // listener sits on the scroller, one level above the renderer's own delegate, so it runs
    // after the redraw. It reads only that an action happened — never which report, never what
    // is in it.
    const acted = event.target && event.target.closest ? event.target.closest("[data-rr-act]") : null;
    if (!acted) return;
    const act = acted.getAttribute("data-rr-act");
    if (act !== "prev" && act !== "next" && act !== "goto") return;
    const scroll = rrsById(RRS_SCROLL_ID);
    if (scroll) scroll.scrollTop = 0;
  });
}

function rrsShowLayer(on) {
  const view = rrsById(RRS_VIEW_ID);
  if (!view) return;
  view.classList.toggle("open", !!on);
  view.setAttribute("aria-hidden", on ? "false" : "true");
}

function rrsSetReference(title, subtitle, backLabel) {
  const titleEl = rrsById(RRS_TITLE_ID);
  if (titleEl) titleEl.textContent = title || "";
  const subtitleEl = rrsById(RRS_SUBTITLE_ID);
  if (subtitleEl) subtitleEl.textContent = subtitle || "";
  const backEl = rrsById(RRS_BACK_ID);
  if (backEl) {
    const label = backLabel || "Back to the run";
    backEl.setAttribute("aria-label", label);
    const text = backEl.querySelector ? backEl.querySelector(".rrs-back-label") : null;
    if (text) text.textContent = label;
    else backEl.textContent = label;
  }
}

// A failure to FETCH is not a failure to parse, and the two must not wear the same message.
// This one is the console's: the report could not be brought over at all.
function rrsFetchFailureHtml(url, detail) {
  return `
    <div class="rrs-fetch-error">
      <div class="rrs-fetch-error-title">The report could not be loaded.</div>
      <div class="rrs-fetch-error-path mono">${rrsEsc(url)}</div>
      <div class="rrs-fetch-error-detail">${rrsEsc(detail)}</div>
      <div class="rrs-fetch-error-note">The reports index names this file. If it is gone, the index is behind what is on disk; re-emitting the project's derived folder is what catches it up.</div>
    </div>
  `;
}

// [#58] The verdict already filed, brought over from the URL the CONSOLE composed. Same rule
// as everything else here: this file is handed a URL and fetches it, and composes nothing —
// no folder name and no file name of a verdict is written anywhere in this file.
//
// ABSENCE IS THE ORDINARY ANSWER. Most reports carry no verdict yet, so a 404 is a null and
// never an error panel; and a verdict that cannot be fetched must not stop the report from
// opening, because the report is what the operator came to read.
async function rrsFetchFiledVerdict(url) {
  if (!url || typeof fetch !== "function") return null;
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response || !response.ok) return null;
    return await response.text();
  } catch (error) {
    return null;
  }
}

// Open one report. `reportUrl` is composed by the caller from the index's own `report_path`;
// this function never builds a path from a run id, so a report can only be opened from
// something the index actually listed.
async function openRunReport(options) {
  const opts = options || {};
  const mount = rrsById(RRS_MOUNT_ID);
  if (!mount) return { ok: false, reason: "no_mount" };
  rrsWire();
  rrsBackHandler = typeof opts.onBack === "function" ? opts.onBack : null;
  rrsSetReference(opts.title, opts.subtitle, opts.backLabel);
  rrsShowLayer(true);
  const scroll = rrsById(RRS_SCROLL_ID);
  if (scroll) scroll.scrollTop = 0;
  mount.className = "";
  mount.innerHTML = '<div class="rrs-loading">Loading the report…</div>';

  const url = String(opts.reportUrl || "");
  let body = null;
  let failure = "";
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (response && response.ok) body = await response.text();
    else failure = `HTTP ${response ? response.status : "?"} ${response ? response.statusText || "" : ""}`.trim();
  } catch (error) {
    failure = (error && error.message) || "the request failed";
  }
  if (body == null) {
    mount.className = "rrs-mount-failed";
    mount.innerHTML = rrsFetchFailureHtml(url, failure);
    rrsOpen = { runId: opts.runId || "", url, handle: null, failed: true };
    return { ok: false, reason: "fetch_failed", detail: failure };
  }
  // The bytes go over UNTOUCHED. Not parsed, not validated, not repaired: a report that does
  // not parse is the renderer's honest error panel, and a report that does not conform is the
  // emitting project's problem to fix, not this console's to translate.
  const render = typeof renderRunReport === "function"
    ? renderRunReport
    : (typeof window !== "undefined" && typeof window.renderRunReport === "function" ? window.renderRunReport : null);
  if (!render) {
    mount.className = "rrs-mount-failed";
    mount.innerHTML = rrsFetchFailureHtml(url, "the report renderer is not loaded in this page");
    rrsOpen = { runId: opts.runId || "", url, handle: null, failed: true };
    return { ok: false, reason: "no_renderer" };
  }
  // [#58] Fetched AFTER the report is in hand, so a verdict that is slow or gone delays
  // nothing the operator needs first, and relayed as bytes exactly like the report's.
  const filed = await rrsFetchFiledVerdict(String(opts.verdictUrl || ""));
  const handle = render(mount, body, {
    previewBase: opts.previewBase || "",
    // The console's writer callback (#57), relayed verbatim. This file neither composes the
    // route nor reads the verdict travelling through it; with none given, the renderer's sign
    // button downloads and says so.
    writeVerdict: typeof opts.writeVerdict === "function" ? opts.writeVerdict : null,
    // [#58] And the verdict already on disk, relayed the same way: untouched bytes. This file
    // does not parse it, so there is no field of a verdict it could come to know either.
    existingVerdict: filed
  });
  rrsOpen = { runId: opts.runId || "", url, handle, failed: false };
  return { ok: true, handle };
}

// Closing RETURNS the operator to the run, by calling back whoever opened the report. The one
// exception is `{ silent: true }`, which the console uses when the whole project is being torn
// down: there, re-opening a run detail would paint a run of the project just left.
function closeRunReport(options) {
  const silent = !!(options && options.silent);
  const mount = rrsById(RRS_MOUNT_ID);
  if (mount) {
    mount.innerHTML = "";
    mount.className = "";
    if (mount.removeAttribute) {
      mount.removeAttribute("data-theme");
      mount.removeAttribute("lang");
    }
  }
  rrsShowLayer(false);
  const handler = rrsBackHandler;
  rrsOpen = null;
  rrsBackHandler = null;
  if (handler && !silent) handler();
}

// True while a report is on screen. The console asks before letting Escape close the drawer
// underneath it.
function runReportIsOpen() {
  return !!rrsOpen;
}

function openRunReportState() {
  return rrsOpen;
}
