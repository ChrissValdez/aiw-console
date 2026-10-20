// RUN-CONSOLE-THREAD-HTML-REPORTS-CONTRACT-001 (#70) — THE LINK TO A THREAD'S OWN HTML REPORT.
//
// D-076: each thread writes the report of its run in HTML, in whatever format its project needs.
// The console does not read it, render it, adapt it or judge it. It FINDS it — the run says where,
// in its own `report_html` key (CONTRATO §10.a) — and LINKS it, in a tab of its own. That is the
// whole of this file, and it is a file of its own for the same reason the report mount is: the
// mechanical domain-blindness veto runs over it, so a project's vocabulary cannot creep in here
// without turning the suite red.
//
// WHAT IT READS: one key of one run, handed over by the console. A list of paths relative to the
// project root. Nothing else of the run, and nothing of any page.
//
// WHAT IT PAINTS: nothing at all for a run that declares no page (D-075: what a project does not
// produce does not appear, not even as "not configured"); otherwise one link per page, in the
// run's order, its path underneath, and a slot that says when a declared page is not on disk.
//
// HOW A PAGE OPENS: in its own tab, `noopener noreferrer`, served by the console under the
// project's base. The server sends every such page with a sandbox policy (serve.mjs, #70), so the
// page runs in an opaque origin: it cannot reach the console or its write routes, and what it
// keeps in browser storage is refused. The operator is told that beside the links, in one line.

function rhrEsc(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

// ---------------------------------------------------------------------------
// THE PATH RULE — the engine's own (roadmap-core.mjs `reportHtmlPathProblem`), held here for the
// browser, which cannot load the engine. The suite runs both over the same cases and fails the
// moment they disagree.
// ---------------------------------------------------------------------------

const RHR_PAGE_EXTENSION = /\.html$/i;

function runHtmlReportPathValid(entry) {
  if (typeof entry !== "string" || !entry) return false;
  if (entry.includes("\\") || entry.includes(":") || entry.startsWith("/")) return false;
  const segments = entry.split("/");
  if (segments.some((segment) => segment === "" || segment === "." || segment === "..")) return false;
  if (segments[0] === ".git" || segments[0] === ".project") return false;
  return RHR_PAGE_EXTENSION.test(entry);
}

// The project's base plus the path, one segment at a time, so a space, an accent or a bracket in
// a folder name reaches the server as the same folder.
function runHtmlReportUrl(base, path) {
  return String(base || "") + String(path).split("/").map((segment) => encodeURIComponent(segment)).join("/");
}

// What a run declares, as links. Null when it declares nothing — the one case that paints nothing.
function runHtmlReportEntries(run, base) {
  if (!run || typeof run !== "object" || !Object.prototype.hasOwnProperty.call(run, "report_html")) return null;
  const declared = run.report_html;
  if (!Array.isArray(declared)) return { entries: [], skipped: 1 };
  const entries = [];
  const seen = new Set();
  let skipped = 0;
  declared.forEach((path) => {
    if (!runHtmlReportPathValid(path) || seen.has(path)) {
      skipped += 1;
      return;
    }
    seen.add(path);
    entries.push({ path, url: runHtmlReportUrl(base, path), label: path.split("/").pop() });
  });
  return { entries, skipped };
}

// ---------------------------------------------------------------------------
// THE SECTION IN THE RUN DETAIL
// ---------------------------------------------------------------------------

const RHR_ISOLATION_NOTE =
  "Each page opens in its own tab, isolated from the console: it cannot reach the console, " +
  "and what it saves in the browser is not kept. Copy and download still work.";

function runHtmlReportSectionHtml(run, options) {
  const opts = options || {};
  const model = runHtmlReportEntries(run, opts.base || "");
  if (!model) return "";
  const items = model.entries.map((entry) => `
        <li class="rhr-item">
          <a class="rhr-link" href="${rhrEsc(entry.url)}" target="_blank" rel="noopener noreferrer" title="Opens in a new tab, isolated from the console">${rhrEsc(entry.label)}<span class="rhr-arrow" aria-hidden="true"> ↗</span></a>
          <span class="rhr-path mono">${rhrEsc(entry.path)}</span>
          <span class="rhr-status" data-rhr-status data-rhr-url="${rhrEsc(entry.url)}" role="status"></span>
        </li>`).join("");
  const skippedNote = model.skipped
    ? `<div class="rhr-skipped">${model.skipped} declared ${model.skipped === 1 ? "entry is" : "entries are"} not linked: not a path to an .html page inside the project.</div>`
    : "";
  return `
    <div class="drawer-section rhr-section">
      <div class="drawer-section-title">HTML report</div>
      ${items ? `<ul class="rhr-list">${items}
      </ul>` : ""}
      ${skippedNote}
      ${items ? `<div class="rhr-note">${rhrEsc(RHR_ISOLATION_NOTE)}</div>` : ""}
    </div>
  `;
}

// ---------------------------------------------------------------------------
// THE ON-DISK PROBE — one HEAD per declared page, never a GET of it.
// ---------------------------------------------------------------------------

// Three answers, because they are three facts: the page is there; the server answered and it is
// not (a page the project generates and has not generated yet); nothing could be asked at all.
async function probeRunHtmlReports(urls, fetchImpl) {
  const ask = typeof fetchImpl === "function" ? fetchImpl : (typeof fetch === "function" ? fetch : null);
  return Promise.all((Array.isArray(urls) ? urls : []).map(async (url) => {
    if (!ask) return { url, state: "unchecked" };
    try {
      const response = await ask(url, { method: "HEAD", cache: "no-store" });
      return { url, state: response && response.ok ? "present" : "missing" };
    } catch (error) {
      return { url, state: "unchecked" };
    }
  }));
}

function runHtmlReportStatusText(state) {
  if (state === "missing") return "declared in the run, not on disk";
  if (state === "unchecked") return "could not be checked on disk";
  return "";
}

// Fill the slots the section painted. Reads only the URL each slot carries, so it needs neither
// the run nor the section's model; a container with no slots asks nothing.
async function wireRunHtmlReports(container, fetchImpl) {
  if (!container || typeof container.querySelectorAll !== "function") return [];
  const slots = Array.prototype.slice.call(container.querySelectorAll("[data-rhr-status]"));
  if (!slots.length) return [];
  const results = await probeRunHtmlReports(slots.map((slot) => slot.getAttribute("data-rhr-url") || ""), fetchImpl);
  results.forEach((result, index) => {
    const slot = slots[index];
    slot.textContent = runHtmlReportStatusText(result.state);
    if (slot.classList) {
      slot.classList.toggle("is-missing", result.state === "missing");
      slot.classList.toggle("is-unchecked", result.state === "unchecked");
    }
  });
  return results;
}
