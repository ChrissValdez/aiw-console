// Project Console — MULTI-PROJECT SHELL (O4.P3).
//
// This module is the aggregation layer the single-project renderer never had: it reads the
// project REGISTRY, loads one snapshot per registered project, draws the persistent sidebar
// and the Portfolio board, and hands the ACTIVE project to the transplanted renderer
// (project-console.js), which keeps painting exactly as it did for one project.
//
// Division of labour, on purpose:
//   - project-console.js (the O4.P11 port) renders ONE project. It owns every per-project
//     view and all per-project state, plus the two hooks this shell drives:
//     setActiveProjectBase(base) and loadActiveProject() / resetProjectScopedState().
//   - This module NEVER reaches into per-project state. Switching projects goes through the
//     renderer's own reset, so there is exactly one place where cross-project state can leak,
//     and it is testable.
//
// Identity discipline (same rule as the port): NO project name, path, or vocabulary lives in
// this file. Identity comes from the REGISTRY (operator-maintained data) and from each
// project's own snapshot. Status tokens are never compared against literals here: the shell
// derives objective/phase status by EXECUTING the derivation table each snapshot carries in
// taxonomy_model (the envelope decision of O4.P2 — this shell is its first real consumer).
//
// The module is import-safe in Node (no DOM at top level), so the pure pieces are unit-tested
// directly by the suite. Browser boot happens only when the shell markup is present.

// Registry location, fixed for the client — relative to the DOCUMENT
// (/project-console/index.html), because fetch() resolves against the page, not this module.
// The server serves this URL from the active registry file (PC_REGISTRY can point it at
// fixtures without touching the real one).
export const REGISTRY_URL = "./projects.json";

// Same charset rule as the server: a key is a URL path segment, nothing more.
export const REGISTRY_KEY_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;

// Parse the raw registry JSON into { title, projects, errors }. Fail-soft and total: bad
// entries are reported, not thrown, so one malformed line never hides the other projects.
export function parseRegistry(parsed) {
  const errors = [];
  const projects = [];
  const seen = new Set();
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return { title: "", projects, errors: ["registry is not an object"] };
  }
  const title = typeof parsed.title === "string" ? parsed.title : "";
  const listed = Array.isArray(parsed.projects) ? parsed.projects : null;
  if (!listed) {
    return { title, projects, errors: ["registry has no projects array"] };
  }
  listed.forEach((item, index) => {
    const key = typeof item?.key === "string" ? item.key : "";
    const root = typeof item?.root === "string" ? item.root : "";
    if (!REGISTRY_KEY_PATTERN.test(key)) {
      errors.push(`entry ${index}: invalid or missing key`);
      return;
    }
    if (seen.has(key)) {
      errors.push(`entry ${index}: duplicate key "${key}"`);
      return;
    }
    if (!root) {
      errors.push(`entry ${index} ("${key}"): missing root`);
      return;
    }
    seen.add(key);
    projects.push({ key, root });
  });
  return { title, projects, errors };
}

// The virtual base the server exposes for a registered project. Everything the renderer
// fetches for the active project hangs off this: <base>.project/* and <base><doc path>.
export function projectBaseForKey(key) {
  return `/projects/${encodeURIComponent(key)}/`;
}

// ---------------------------------------------------------------------------
// Taxonomy: the ONLY status derivation in the shell, and it is table-driven.
//
// Executes the precedence table the snapshot itself declares (taxonomy_model.derivations),
// exactly as O4.P2 specified it: first rule whose quantifier matches wins. The quantifier
// words ("any" / "all" / "otherwise") and the empty_input sentinel "malformed" are the
// derivation LANGUAGE defined by the envelope; the status TOKENS are the project's own and
// never appear in this code.
// ---------------------------------------------------------------------------

export function evaluateDerivationTable(table, inputStatuses) {
  if (!table || !Array.isArray(table.precedence)) return null;
  const statuses = Array.isArray(inputStatuses) ? inputStatuses : [];
  if (!statuses.length) {
    if (table.empty_input === "malformed" || table.empty_input == null) return null;
    return String(table.empty_input);
  }
  for (const rule of table.precedence) {
    if (!rule || typeof rule.token !== "string") continue;
    if (rule.quantifier === "any" && statuses.some((status) => status === rule.run_status)) return rule.token;
    if (rule.quantifier === "all" && statuses.every((status) => status === rule.run_status)) return rule.token;
    if (rule.quantifier === "otherwise") return rule.token;
  }
  return null;
}

// Derive the status token for one axis ("objective" | "phase") from the run statuses of its
// subtree, using the vocabulary/derivation the given taxonomy_model declares. Returns null
// when the taxonomy does not declare a derivation for the axis (nothing is invented) or when
// the table declares the empty input malformed.
export function deriveCollectionStatus(taxonomyModel, axis, runStatuses) {
  const vocabulary = taxonomyModel?.vocabularies?.[`${axis}.status`];
  if (!vocabulary || vocabulary.stored === true) return null;
  const tableName = typeof vocabulary.derived_by === "string" ? vocabulary.derived_by : "";
  const table = tableName ? taxonomyModel?.derivations?.[tableName] : null;
  return evaluateDerivationTable(table, runStatuses);
}

// ---------------------------------------------------------------------------
// Snapshot summary: what the menu and the Portfolio board know about a project.
// Everything below is read or counted from the snapshot — nothing is derived from
// hardcoded vocabulary, and nothing is persisted.
// ---------------------------------------------------------------------------

function treeRuns(tree) {
  const runs = [];
  (tree?.objectives || []).forEach((objective) => {
    (objective.phases || []).forEach((phase) => {
      (phase.runs || []).forEach((run) => runs.push(run));
    });
  });
  return runs;
}

export function snapshotSummary(snapshot, options = {}) {
  const labelize = typeof options.labelize === "function" ? options.labelize : (value) => value;
  if (!snapshot || typeof snapshot !== "object" || typeof snapshot.project_id !== "string" || !snapshot.project_id) {
    return null;
  }
  const tree = snapshot.roadmap_tree || null;
  const taxonomy = snapshot.taxonomy_model || null;
  const objectives = Array.isArray(tree?.objectives) ? tree.objectives : [];
  const allRuns = treeRuns(tree);
  const phaseCount = objectives.reduce((total, objective) => total + (objective.phases?.length || 0), 0);

  // Count runs per run.status token. The token list comes from the snapshot's own
  // vocabulary (in its declared order); tokens present in the data but missing from the
  // declaration are appended verbatim — the count reports the data, it never edits it.
  const declaredTokens = Array.isArray(taxonomy?.vocabularies?.["run.status"]?.tokens)
    ? taxonomy.vocabularies["run.status"].tokens.filter((token) => typeof token === "string")
    : [];
  const counts = new Map(declaredTokens.map((token) => [token, 0]));
  allRuns.forEach((run) => {
    // [UI language: English] Synthesised bucket for a run whose status token is missing. The console's
    // own UI is English (the project's DATA is not translated: every real token below is
    // the project's verbatim vocabulary, and this label is the only string this counter
    // invents).
    const token = typeof run?.status === "string" && run.status ? run.status : "(no status)";
    counts.set(token, (counts.get(token) || 0) + 1);
  });
  const runStatusCounts = Array.from(counts.entries()).map(([token, count]) => ({ token, count }));

  const objectiveRows = objectives.map((objective) => {
    const statuses = [];
    (objective.phases || []).forEach((phase) => (phase.runs || []).forEach((run) => statuses.push(run?.status)));
    return {
      title: typeof objective.title === "string" ? objective.title : String(objective.objective_id || ""),
      status: deriveCollectionStatus(taxonomy, "objective", statuses)
    };
  });

  return {
    projectId: snapshot.project_id,
    label: labelize(snapshot.project_id),
    title: typeof tree?.title === "string" ? tree.title : "",
    operationalStatus: typeof snapshot.operational_status === "string" ? snapshot.operational_status : "",
    summaryText: typeof snapshot.project_summary === "string" ? snapshot.project_summary : "",
    statusText: typeof snapshot.current_status_summary === "string" ? snapshot.current_status_summary : "",
    counts: { objectives: objectives.length, phases: phaseCount, runs: allRuns.length },
    runStatusCounts,
    objectives: objectiveRows
  };
}

// ---------------------------------------------------------------------------
// Pure HTML builders for the shell chrome (sidebar list + portfolio board), unit-testable.
// Escape-first, same discipline as the renderer.
// ---------------------------------------------------------------------------

export function escapeShellHtml(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

// One project record as the shell tracks it:
//   { key, base, status: "ok" | "missing" | "invalid", summary|null, detail }
// status meanings — "missing": snapshot.json could not be fetched; "invalid": it fetched but
// is not a readable snapshot; detail carries the human line shown in menu and board.

export function projectStateLine(record) {
  if (record.status === "ok") return record.summary?.operationalStatus || "";
  if (record.status === "missing") return "no snapshot";
  return "snapshot unreadable";
}

export function snapshotUrlForKey(key) {
  return `${projectBaseForKey(key)}.project/snapshot.json`;
}

// Contract §20 at shell level: the announcement names the file that failed.
export function projectAbsenceMessage(record) {
  const path = snapshotUrlForKey(record.key).replace(/^\//, "");
  if (record.status === "missing") return `${path} could not be loaded`;
  if (record.status === "invalid") return `${path} is not a readable snapshot`;
  return "";
}

export function sidebarProjectsHtml(records, activeKey) {
  if (!records.length) {
    return '<div class="nav-empty">No projects registered.</div>';
  }
  return records.map((record) => {
    const label = record.status === "ok" && record.summary ? record.summary.label : record.key;
    const stateLine = projectStateLine(record);
    const initial = (label || record.key).trim().charAt(0).toUpperCase() || "?";
    const isActive = record.key === activeKey;
    return `
      <div class="nav-item${isActive ? " active" : ""}${record.status === "ok" ? "" : " nav-item-degraded"}" data-project-key="${escapeShellHtml(record.key)}" role="button" tabindex="0">
        <div class="nav-icon">${escapeShellHtml(initial)}</div>
        <div class="nav-text">
          <div class="nav-title">${escapeShellHtml(label)}</div>
          <div class="nav-subtitle">${escapeShellHtml(stateLine)}</div>
        </div>
      </div>
    `;
  }).join("");
}

function portfolioOkCard(record) {
  const summary = record.summary;
  const statusChip = summary.operationalStatus
    ? `<span class="badge badge-gray portfolio-status-chip">${escapeShellHtml(summary.operationalStatus)}</span>`
    : "";
  const runCells = summary.runStatusCounts.map(({ token, count }) => `
    <div class="portfolio-stat">
      <div class="portfolio-stat-label">${escapeShellHtml(token)}</div>
      <div class="portfolio-stat-value">${count}</div>
    </div>
  `).join("");
  const objectiveRows = summary.objectives.map((objective) => `
    <div class="portfolio-objective-row">
      <span class="portfolio-objective-title">${escapeShellHtml(objective.title)}</span>
      ${objective.status ? `<span class="badge badge-gray portfolio-objective-status">${escapeShellHtml(objective.status)}</span>` : '<span class="portfolio-objective-status-none">&mdash;</span>'}
    </div>
  `).join("");
  return `
    <section class="portfolio-project" data-portfolio-key="${escapeShellHtml(record.key)}">
      <div class="portfolio-main">
        <div class="portfolio-title-row"><h2 class="portfolio-title">${escapeShellHtml(summary.label)}</h2></div>
        <div class="portfolio-id mono">${escapeShellHtml(summary.projectId)}</div>
        ${statusChip}
      </div>
      <div class="portfolio-ops">
        <div>
          <div class="portfolio-section-label">Runs by status</div>
          <div class="portfolio-snapshot-grid">${runCells || '<div class="portfolio-stat"><div class="portfolio-stat-label">runs</div><div class="portfolio-stat-value">0</div></div>'}</div>
        </div>
        <div class="portfolio-roadmap">
          <div class="portfolio-stat-label">Roadmap</div>
          <div class="portfolio-roadmap-value">${summary.counts.objectives} objectives &middot; ${summary.counts.phases} phases &middot; ${summary.counts.runs} runs</div>
        </div>
        <div class="portfolio-objectives">
          <div class="portfolio-section-label">Objectives</div>
          ${objectiveRows || '<div class="portfolio-objective-row"><span class="portfolio-objective-title">none</span></div>'}
        </div>
      </div>
      <div class="portfolio-next">
        <div class="portfolio-next-card">
          <div class="portfolio-next-label">Current status</div>
          <div class="portfolio-next-text">${escapeShellHtml(summary.statusText || summary.summaryText || "")}</div>
        </div>
        <div class="portfolio-action-row">
          <button class="btn btn-primary" type="button" data-open-project="${escapeShellHtml(record.key)}">Open Project</button>
        </div>
      </div>
    </section>
  `;
}

function portfolioDegradedCard(record) {
  return `
    <section class="portfolio-project portfolio-project-degraded" data-portfolio-key="${escapeShellHtml(record.key)}">
      <div class="portfolio-main">
        <div class="portfolio-title-row"><h2 class="portfolio-title">${escapeShellHtml(record.key)}</h2></div>
        <span class="badge badge-amber portfolio-status-chip">${escapeShellHtml(projectStateLine(record))}</span>
      </div>
      <div class="portfolio-ops">
        <div class="portfolio-absence">
          <div class="portfolio-section-label">State</div>
          <div class="portfolio-absence-text">${escapeShellHtml(projectAbsenceMessage(record))}. The other projects are unaffected.</div>
        </div>
      </div>
      <div class="portfolio-next">
        <div class="portfolio-action-row">
          <button class="btn btn-secondary" type="button" data-open-project="${escapeShellHtml(record.key)}">Open Project</button>
        </div>
      </div>
    </section>
  `;
}

export function portfolioBoardHtml(records) {
  if (!records.length) return "";
  return records.map((record) => (record.status === "ok" && record.summary ? portfolioOkCard(record) : portfolioDegradedCard(record))).join("");
}

// ---------------------------------------------------------------------------
// Browser boot. Everything below touches the DOM and runs only in the page.
// ---------------------------------------------------------------------------

const IS_BROWSER = typeof document !== "undefined";

function shellById(id) {
  return IS_BROWSER ? document.getElementById(id) : null;
}

const shellState = {
  registryTitle: "",
  registryErrors: [],
  registryFailed: false,
  records: [],
  recordsByKey: new Map(),
  activeKey: null,
  view: "portfolio"
};

function rendererGlobals() {
  // The transplanted renderer is a classic script: its top-level function declarations are
  // globals. The shell drives it only through these four, so the seam stays narrow.
  const scope = typeof window !== "undefined" ? window : globalThis;
  return {
    setActiveProjectBase: scope.setActiveProjectBase,
    resetProjectScopedState: scope.resetProjectScopedState,
    loadActiveProject: scope.loadActiveProject,
    friendlyLabel: scope.friendlyLabel
  };
}

async function fetchSnapshotRecord(entry) {
  const base = projectBaseForKey(entry.key);
  const record = { key: entry.key, root: entry.root, base, status: "missing", summary: null, snapshot: null };
  let response;
  try {
    response = await fetch(`${base}.project/snapshot.json`, { cache: "no-store" });
  } catch {
    return record;
  }
  if (!response.ok) return record;
  let parsed;
  try {
    parsed = await response.json();
  } catch {
    record.status = "invalid";
    return record;
  }
  const { friendlyLabel } = rendererGlobals();
  const summary = snapshotSummary(parsed, { labelize: friendlyLabel || ((value) => value) });
  if (!summary) {
    record.status = "invalid";
    return record;
  }
  record.status = "ok";
  record.snapshot = parsed;
  record.summary = summary;
  return record;
}

function shellRegistryNotice() {
  const registryPath = "project-console/projects.json";
  if (shellState.registryFailed) {
    return `<div class="readonly-banner shell-notice"><strong>Project registry unavailable.</strong><span>${escapeShellHtml(registryPath)} could not be loaded, so no project can be listed.</span></div>`;
  }
  if (!shellState.records.length) {
    return `<div class="readonly-banner shell-notice"><strong>No projects registered.</strong><span>${escapeShellHtml(registryPath)} lists no readable project entries.</span></div>`;
  }
  return "";
}

function renderShellChrome() {
  const list = shellById("shell-project-list");
  if (list) {
    const notice = shellState.registryFailed
      ? '<div class="nav-empty">registry unavailable</div>'
      : "";
    list.innerHTML = notice + sidebarProjectsHtml(shellState.records, shellState.activeKey);
  }
  const board = shellById("shell-portfolio-board");
  if (board) {
    board.innerHTML = shellRegistryNotice() + portfolioBoardHtml(shellState.records);
  }
  const brand = shellById("shell-brand-title");
  if (brand) brand.textContent = shellState.registryTitle || "Project Console";
  const portfolioTitle = shellById("shell-portfolio-title");
  if (portfolioTitle) portfolioTitle.textContent = "Project Portfolio";
  const portfolioNav = shellById("shell-nav-portfolio");
  if (portfolioNav) portfolioNav.classList.toggle("active", shellState.view === "portfolio");
}

function shellShowView(view) {
  shellState.view = view;
  const portfolio = shellById("view-portfolio");
  const project = shellById("view-project");
  if (portfolio) portfolio.classList.toggle("active", view === "portfolio");
  if (project) project.classList.toggle("active", view === "project");
  if (view === "portfolio") {
    document.title = shellState.registryTitle || "Project Console";
  }
  renderShellChrome();
}

async function shellSelectProject(key) {
  const record = shellState.recordsByKey.get(key);
  if (!record) return;
  const { setActiveProjectBase, resetProjectScopedState, loadActiveProject } = rendererGlobals();
  if (!setActiveProjectBase || !resetProjectScopedState || !loadActiveProject) return;
  const alreadyActive = shellState.activeKey === key;
  shellState.activeKey = key;
  shellShowView("project");
  if (alreadyActive) return;
  // Cross-project hygiene: every per-project cache, selection, timer and DOM default is
  // reset by the renderer BEFORE the new base is set, so nothing of the previous project
  // survives the switch. This is the single seam the switch test exercises.
  resetProjectScopedState();
  setActiveProjectBase(record.base);
  const result = await loadActiveProject();
  // Refresh the menu/board from what actually loaded: a project can heal (emitter ran) or
  // break (file corrupted) between boot and selection, and the chip must say so.
  if (result && result.ok && result.snapshot) {
    const { friendlyLabel } = rendererGlobals();
    const summary = snapshotSummary(result.snapshot, { labelize: friendlyLabel || ((value) => value) });
    if (summary) {
      record.status = "ok";
      record.snapshot = result.snapshot;
      record.summary = summary;
    }
  } else if (result && !result.ok) {
    record.status = result.reason === "invalid" ? "invalid" : "missing";
    record.summary = record.summary || null;
    document.title = shellState.registryTitle || "Project Console";
  }
  renderShellChrome();
}

function wireShellEvents() {
  const sidebar = shellById("shell-sidebar");
  if (sidebar) {
    sidebar.addEventListener("click", (event) => {
      const collapse = event.target.closest("#shell-collapse");
      if (collapse) {
        sidebar.classList.toggle("collapsed");
        return;
      }
      const portfolioNav = event.target.closest("#shell-nav-portfolio");
      if (portfolioNav) {
        shellShowView("portfolio");
        return;
      }
      const item = event.target.closest("[data-project-key]");
      if (item) shellSelectProject(item.getAttribute("data-project-key"));
    });
  }
  const board = shellById("shell-portfolio-board");
  if (board) {
    board.addEventListener("click", (event) => {
      const open = event.target.closest("[data-open-project]");
      if (open) shellSelectProject(open.getAttribute("data-open-project"));
    });
  }
}

async function shellBoot() {
  wireShellEvents();
  let registry = null;
  try {
    const response = await fetch(REGISTRY_URL, { cache: "no-store" });
    if (response.ok) registry = await response.json();
  } catch {
    registry = null;
  }
  if (registry == null) {
    shellState.registryFailed = true;
    renderShellChrome();
    shellShowView("portfolio");
    return;
  }
  const { title, projects, errors } = parseRegistry(registry);
  shellState.registryTitle = title;
  shellState.registryErrors = errors;
  // Menu decision (record, decision 2): boot loads ONLY each project's snapshot.json — the
  // one required artifact — to name and mark every entry. The heavy per-project sources
  // (roadmap, docs index and bodies, git history, governance) load when a project is opened.
  const records = await Promise.all(projects.map((entry) => fetchSnapshotRecord(entry)));
  shellState.records = records;
  shellState.recordsByKey = new Map(records.map((record) => [record.key, record]));
  renderShellChrome();
  shellShowView("portfolio");
}

if (IS_BROWSER && document.getElementById("shell-sidebar")) {
  // The renderer script is loaded with defer before this module, so its globals exist here.
  shellBoot();
}
