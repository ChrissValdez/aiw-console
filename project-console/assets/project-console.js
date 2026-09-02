// CONTRATO §1 / §1.a — the base of the contract folder lives as ONE value, and every route
// below is derived from it. Under the multi-project shell (O4.P3) that one value is no longer
// a constant: it is the virtual base of the ACTIVE project (/projects/<key>/, resolved by the
// server from the project registry). The shell calls setActiveProjectBase() before any load;
// nothing else in this file may compose a data route from anything but REPO_BASE.
let REPO_BASE = "";
let PROJECT_BASE = "";
let PATHS = null;

function setActiveProjectBase(repoBase) {
  REPO_BASE = repoBase;
  PROJECT_BASE = `${REPO_BASE}.project/`;
  PATHS = {
    // Layer 1, the ONE required artifact (§1): the project's own description of itself.
    snapshot: `${PROJECT_BASE}snapshot.json`,
    // Optional and emitted today (§18.b, §19).
    roadmapV3: `${PROJECT_BASE}roadmap.json`,
    docsIndex: `${PROJECT_BASE}docs_index.json`,
    guardrails: `${PROJECT_BASE}guardrails.json`,
    noClaims: `${PROJECT_BASE}no_claims.json`,
    // [#53] The seventh emitted artifact, fetched for the first time. Until this run nothing
    // read it, because indexing added no surface; the report surface IS that surface, and it
    // reads the index and never walks a `reports/` folder.
    reportsIndex: `${PROJECT_BASE}reports_index.json`,
    // Optional and NOT emitted today. They keep the routes the emitter declared for them so a
    // future emitter has nowhere new to invent: each one degrades fail-soft, and no file is
    // stubbed or simulated to hide its absence (§20 — an invented file lies; an absent one does not).
    project: `${PROJECT_BASE}project.json`,
    projectStatus: `${PROJECT_BASE}state/project_status.json`,
    componentStatus: `${PROJECT_BASE}state/component_status.json`,
    events: `${PROJECT_BASE}state/events.jsonl`,
    changeLedger: `${PROJECT_BASE}ledgers/change_ledger.jsonl`,
    gitProvenance: `${PROJECT_BASE}ledgers/git_provenance.jsonl`,
    humanQa: `${PROJECT_BASE}ledgers/human_qa.jsonl`,
    aiReviews: `${PROJECT_BASE}ledgers/ai_reviews.jsonl`,
    memory: `${PROJECT_BASE}guardrails/project_memory.jsonl`,
    // Derived read-only Git commit history view (§19).
    gitHistory: `${PROJECT_BASE}git_history.json`,
    // THE FOUR WRITE ROUTES (O4.P12 opened two, reverting the O4.P11 deferral by D-050;
    // O4.P14 added the third; #57 adds the fourth). Composed from REPO_BASE like every other
    // route, so they always address the ACTIVE project: the server maps them onto that
    // project's registered root, resolves its canonical roadmap through the root layout, and
    // re-emits `.project/` after a confirmed write. Dry-run→confirm and the availability probe
    // (v3ProbeEndpoint) are unchanged from the source console.
    historySync: `${REPO_BASE}__project-console/history/sync`,
    roadmapEdit: `${REPO_BASE}__project-console/roadmap/edit`,
    // [O4.P14] Re-emit the ACTIVE project's whole `.project/` folder from its canonical. The
    // same gesture `historySync` already performs for ONE derived artifact, extended to all
    // seven — and fired only by the operator's click, never on a timer.
    projectEmit: `${REPO_BASE}__project-console/project/emit`,
    // [#57] Write verdict.json beside a report of the ACTIVE project. The server derives the
    // destination from the report folder's name alone; no path travels from here.
    verdictWrite: `${REPO_BASE}__project-console/verdict/write`
  };
}

// The console's own files and the one command that serves them, named ONCE. Every surface that
// has to tell the operator how to start the console reads these, so there is no second place
// where a route can go stale.
const CONSOLE_FILES = {
  html: "project-console/index.html",
  css: "project-console/assets/project-console.css",
  js: "project-console/assets/project-console.js"
};
const CONSOLE_SERVE_COMMAND = "node project-console/serve.mjs";
const CONSOLE_ENTRY_URL = "http://127.0.0.1:8788/project-console/index.html";

const loadedSources = [];
// Each failure is `{ path, detail }`, not a joined string: the PATH has to stay separable so a
// failure can be matched against what the project declared emitting (see `declaredArtifactPaths`).
const failedSources = [];
// WHAT THIS PROJECT DECLARES EMITTING (O4.P13) — the `emitted_artifacts` list its snapshot
// transports, normalised to repo-relative routes. It is the reference §20's announcement is
// about: a route that fails and IS declared is an absence and gets announced by name; a route
// that fails and is NOT declared was never promised, so there is nothing to announce (§18 — a
// file with no emitter is not missing, it does not exist here by design).
//
// Empty means the snapshot transported no declaration (an older emission). The console then
// narrows nothing and every failure counts, which is the loud direction: an alarm that cannot
// tell what was promised must assume everything was.
let declaredArtifactPaths = [];
let appData = null;

// [#43] THE CLASSIFICATION MODEL, INJECTED — never re-implemented here.
//
// `severity` and `closure_mode` are DERIVED and NEVER stored
// (context/CLASIFICACION-DE-RUNS.md §2), and §2 exists precisely so that two consumers cannot
// derive differently. There is therefore ONE implementation, in
// tools/classification/classification.mjs, and this renderer CALLS it — it does not carry a
// copy of the two tables, and there is nothing here to edit out of step with the emitter.
//
// It arrives by injection because this file is a CLASSIC script (index.html loads it with
// `defer`) and cannot import. project-shell.js — which is a module — imports the file and
// hands it over through `setClassificationModel`, the same direction it already drives
// `setActiveProjectBase` and `loadActiveProject`. The suite injects the same module the same
// way, so what the tests exercise is what the browser runs.
//
// UNINJECTED IS NOT A DEFAULT. With no model the two derived values are simply UNAVAILABLE
// and the view says so; it never falls back to a guess, because a guessed severity is exactly
// the second copy §2 forbids.
let classificationModel = null;

function setClassificationModel(model) {
  classificationModel = model || null;
}

// [#46] THE PROGRESS MODEL, INJECTED — never re-implemented here. Same mechanism, same
// reason as the classification model above: CONTRATO §15.c makes "did a person review
// this run?" a question with ONE answer, so the predicate lives in
// tools/progress/progress.mjs and this renderer CALLS it. project-shell.js injects it.
//
// UNINJECTED IS NOT A DEFAULT, and here that rule has teeth: with no model the
// human-approval section simply keeps today's words — it NEVER says "satisfied", because
// a satisfied edge nothing verified is precisely the invention §15.c forbids.
let progressModel = null;

function setProgressModel(model) {
  progressModel = model || null;
}

// [#53] THE REPORT INDEX MODEL of the ACTIVE project, derived once per load by the mount
// (run-report-surface.js) and never by this file. It is per-project state and is cleared on
// every switch, like every other cache below: one project's reports say nothing about another's.
//
// UNBUILT IS NOT EMPTY. Before a load — and after a load whose index did not arrive — the model
// is null, and the run detail says the index could not be read rather than "no report": a run
// whose report nobody could look for is not a run without a report.
let reportsIndexModelCache = null;

function v3ReportsIndexModel() {
  return reportsIndexModelCache;
}

// §15.c through the injected model, fail-closed: no model, no progress, or no positive
// human QA all answer false. `status` is deliberately not read here — completed alone
// satisfies nothing, which is the gap the norm closes.
function v3HumanApprovalSatisfied(run) {
  if (!progressModel || typeof progressModel.humanApprovalSatisfied !== "function") return false;
  return progressModel.humanApprovalSatisfied(run) === true;
}

// The six STORED fields, in the specification's own order. Read from the injected model when
// there is one so the order has a single source; the literal is only the shape the drawer
// needs before any model arrives, and it stores nothing.
function v3ClassificationStoredFields() {
  return (classificationModel && classificationModel.CLASSIFICATION_STORED_FIELDS)
    || ["correctness_model", "work_type", "blast_radius", "failure_surfaces", "external_effects", "classified_at"];
}

// Both derived values of one run, or nulls. `null` means ABSENT — a run with no work_type has
// no severity, and that is information, not a hole to fill.
function v3DerivedClassification(run) {
  if (!classificationModel || typeof classificationModel.deriveClassification !== "function") {
    return { severity: null, closure_mode: null, available: false };
  }
  const derived = classificationModel.deriveClassification(run);
  return { severity: derived.severity, closure_mode: derived.closure_mode, available: true };
}

// Which of the six the run actually carries — the difference between "not classified" and
// "half classified", which the drawer must not blur.
function v3StoredClassification(run) {
  return v3ClassificationStoredFields().filter((field) => run && field in run);
}

// NO BAKED IDENTITY. The source console kept, right here, a parent run id and four
// lifecycle-stage run ids of its own project, plus a per-run display-copy table keyed by twelve
// more. Every one of them named runs of another project: they matched nothing here and, worse,
// they made what the renderer displayed depend on WHICH project it was rendering. They are gone.
// The mechanisms that consulted them stay, fed from the run data itself (`run.run_kind`,
// `run.stage_checklist`, the queue model) — the only place a run's identity can honestly
// come from.

// Roadmap v3 display constants. Frozen from the approved Roadmap v3 contract; display policy
// lives in code, never inside the roadmap file.
const ROADMAP_V3_QUEUE_GROUPS = [
  { key: "needs_human_decision", label: "Needs Human Decision" },
  { key: "now", label: "Now" },
  { key: "upcoming", label: "Upcoming" },
  { key: "history", label: "History" }
];
// The SEMANTIC queue-group key space: every key `v3QueueGroupKey` can return, with the label a
// surface uses when it names that key to the operator.
//
// This is NOT the table above. ROADMAP_V3_QUEUE_GROUPS declares the four sections the Run Queue
// DRAWS, and `v3QueueDisplayGroup` collapses `ready_next` + `later` into its "upcoming" section.
// The two key spaces are deliberately different, and reading a semantic key out of the display
// table is a lookup across that gap: it returned `undefined` for `ready_next` and `later` and
// fired whatever literal the call site had for a fallback, whatever the run's status. Overview
// names the semantic key, so Overview reads THIS table.
//
// Any key added to `v3QueueGroupKey` must be added here and to `roadmapQueueGroup` in
// tools/projector/project.mjs; tests/console-queue-keyspace.test.mjs holds the three in step.
const ROADMAP_V3_QUEUE_GROUP_LABELS = {
  needs_human_decision: "Needs Human Decision",
  now: "Now",
  ready_next: "Ready Next",
  later: "Later",
  history: "History"
};
const ROADMAP_V3_STATUS_TONES = {
  planned: "gray",
  active: "blue",
  completed: "green",
  blocked: "red"
};
// Progress model v0.2: stored field names stay cycle/stage/attempt/state/result;
// only the human-facing labels below differ (cycle renders as Round).
const ROADMAP_V3_STAGE_LABELS = {
  execution: "Execution",
  ai_review: "AI Review",
  human_qa: "Human QA",
  correction: "Correction",
  closeout: "Closeout"
};
const ROADMAP_V3_STATE_LABELS = {
  waiting: "Waiting",
  running: "Running",
  done: "Done"
};
const ROADMAP_V3_RESULT_LABELS = {
  implemented: "Implemented",
  approved: "Approved",
  passed: "Passed",
  changes_requested: "Changes requested",
  completed: "Completed",
  blocked: "Blocked",
  cancelled: "Cancelled",
  failed: "Failed",
  not_applicable: "Not applicable"
};
// Recommended default expansion for the four Run Queue display groups. This is local UI
// state only and is never persisted into Roadmap or project data. Needs Human Decision
// expands only when it is non-empty; Now and Upcoming expand; History collapses.
const ROADMAP_V3_QUEUE_GROUP_DEFAULT_OPEN = {
  needs_human_decision: "when_non_empty",
  now: true,
  upcoming: true,
  history: false
};
let roadmapV3ModelCache = null;
// Local Run Detail navigation stack (UI-only): the root run plus any dependencies pushed
// on top. Cleared when the drawer closes. Never persisted to Roadmap or project data.
let v3DetailStack = [];
// Origin subview label ("Run Queue" / "Roadmap") recorded when a root detail opens; the
// stack-root Back control returns there by closing the drawer. UI-only, never persisted.
let v3DetailOrigin = "";
// [D-051] Selected lane filter (a declared lane_id, or null for all lanes). UI-only,
// never persisted, reset on project switch. Changing it re-renders BOTH Roadmap
// subviews in place, so the active subview is preserved — the point of the selector is
// comparing the same view across lanes.
let v3SelectedLane = null;
// [#48] Selected batch filter (a declared batch_id, or null for all batches) — the lane
// filter's sibling, same lifecycle: UI-only, never persisted, reset on project switch.
// The two compose (a run must pass both), because lane and batch are independent claims.
let v3SelectedBatch = null;
// Roadmap editing (Run B). Edit mode is OFF by default and only reachable from the Roadmap
// tab; it never appears on Overview/History/Docs/Status. v3EditPending holds the operation
// whose dry-run preview is on screen, awaiting an explicit confirm before any write.
let v3EditMode = false;
let v3EndpointReachable = null;
let v3EditPending = null;
// Run C: the editor is a modal layered over the read-only drawer/tree. v3EditModalTarget
// records what the open modal edits ({ kind:"run"|"phase"|"objective"|"insert", id, ... });
// v3EditModalDirty guards against silently discarding typed input on close; v3EditRemoveChoice
// carries the operator's reassign/drop decision when removing a run with dependents.
let v3EditModalTarget = null;
let v3EditModalDirty = false;
let v3EditRemoveChoice = null;

function byId(id) {
  return document.getElementById(id);
}

function text(value, fallback = "UNKNOWN_REQUIRES_REPO_CONFIRMATION") {
  if (value === false) return "false";
  if (value === true) return "true";
  if (value === 0) return "0";
  return value == null || value === "" ? fallback : String(value);
}

function escapeHtml(value) {
  return text(value, "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function badge(value, tone = "gray") {
  return `<span class="badge badge-${tone}">${escapeHtml(value)}</span>`;
}

function operatorBadge(value, tone = "gray") {
  return `<span class="badge badge-${tone} badge-operator">${escapeHtml(value)}</span>`;
}

function friendlyLabel(value) {
  return text(value, "")
    .replace(/^no_/i, "No ")
    .replace(/_/g, " ")
    .replace(/\baiw\b/gi, "AIW")
    .replace(/\bui\b/gi, "UI")
    .replace(/\bqa\b/gi, "QA")
    .replace(/\bjson\b/gi, "JSON")
    .replace(/\bhtml\b/gi, "HTML")
    .replace(/\bweb\b/gi, "Web")
    .replace(/\bslide\b/gi, "Slide")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function toneForStatus(status) {
  const value = text(status, "").toUpperCase();
  if (value === "CURRENT") return "blue";
  if (value === "QUEUED" || value === "PLANNED" || value === "REVIEW_REQUIRED") return "green";
  if (value === "MAP_ONLY") return "blue";
  if (
    value.includes("DISALLOWED") ||
    value.includes("BLOCKED") ||
    value.includes("NOT_CERTIFIED") ||
    value.includes("NOT CERTIFIED") ||
    value.includes("NOT_WEB_CERTIFIED") ||
    value.includes("NO_WEB_CERTIFICATION") ||
    value.includes("NO WEB CERTIFICATION") ||
    value.includes("NO_SLIDE_CERTIFICATION") ||
    value.includes("NO_CLAIM")
  ) return "red";
  if (value.includes("PENDING") || value.includes("REQUIRED") || value.includes("UNKNOWN") || value.includes("FUTURE") || value.includes("OPEN") || value.includes("DEFERRED")) return "amber";
  if (value.includes("PASSED") || value.includes("APPROVED") || value.includes("VALIDATED") || value.includes("COMPLETED") || value.includes("ACTIVE")) return "green";
  if (value.includes("READ_ONLY") || value.includes("READ-ONLY") || value.includes("EXTERNAL_MANUAL")) return "blue";
  if (value.includes("CERTIFIED")) return "red";
  return "gray";
}

function toneForClassification(classification) {
  const value = text(classification, "").toLowerCase();
  if (value === "current") return "blue";
  if (value === "queued" || value === "planned" || value === "review_required") return "green";
  if (value === "blocked") return "red";
  if (value === "deferred" || value === "own_ticket_required" || value === "future") return "amber";
  if (value === "map_only") return "blue";
  return "gray";
}

function queueClassificationLabel(classification) {
  const value = text(classification, "unknown").toLowerCase();
  const labels = {
    current: "Now",
    queued: "Next",
    planned: "Planned",
    review_required: "In review",
    blocked: "Blocked",
    deferred: "Deferred",
    own_ticket_required: "Deferred",
    future: "Future",
    map_only: "Map-only",
    not_started: "Planned"
  };
  return labels[value] || friendlyLabel(value);
}

function activeStageFromChecklist(run = {}) {
  const stages = Array.isArray(run.stage_checklist) ? run.stage_checklist : [];
  const priority = ["running", "current", "in_progress", "changes_requested", "waiting", "pending"];
  for (const status of priority) {
    const stage = stages.find((item) => text(item.status || item.operational_state, "").toLowerCase() === status);
    if (stage) return stage;
  }
  return stages[0] || null;
}

function canonicalStatusFromAxes(run = {}, queueItem = {}) {
  const operationalState = run.operational_state || queueItem.operational_state || "unknown";
  const waitReason = run.wait_reason || queueItem.wait_reason || "none";
  const kind = runKind(run, queueItem);
  const stage = run.stage || queueItem.stage || run.lifecycle_stage || queueItem.lifecycle_stage || activeStageFromChecklist(run)?.stage || "";

  if (operationalState === "completed" || kind === "history") {
    return { label: "Completed", tone: "gray" };
  }
  if (operationalState === "running") {
    return { label: "Now", tone: "blue" };
  }
  if (operationalState === "blocked") {
    return { label: "Blocked", tone: "red" };
  }
  if (operationalState === "waiting") {
    if (stage === "human_qa") return { label: "Human QA", tone: "amber" };
    if (stage === "ai_review" || waitReason === "human_validation") return { label: "Review", tone: "amber" };
    const labels = {
      human_validation: "Review",
      human_intervention: "Waiting",
      resource_reset: "Waiting",
      dependency: "Waiting",
      provider_capacity: "Waiting",
      scheduled_resume: "Planned"
    };
    return { label: labels[waitReason] || "Waiting", tone: waitReason === "scheduled_resume" ? "green" : "amber" };
  }
  if (kind === "map_only") {
    return { label: "Map-only", tone: "blue" };
  }
  return { label: "Unknown", tone: "gray" };
}

// The source console carried a hand-written table of display copy keyed by twelve of its own run
// ids, which overrode what the roadmap said for exactly those runs. It does not travel. Display
// copy that lives outside the data is a second source of truth for the same fact, and it can only
// ever be true for one project. Every field it supplied already had a data-driven fallback in the
// reader below (the run's own operator_* fields, then its title and summary); that path is now
// the only one. The constant stays, empty, so the reader keeps its shape.
const RUN_OPERATOR_OVERRIDES = {};

function runKind(run = {}, queueItem = {}) {
  if (run.run_kind) return run.run_kind;
  if (queueItem.run_kind) return queueItem.run_kind;
  if (queueItem.display_kind) return queueItem.display_kind;
  // (A list of run ids that were lifecycle stages "because we said so" used to sit here.)
  if ((queueItem.classification || run.queue_classification) === "map_only") return "map_only";
  if (run.lifecycle_status?.includes("COMPLETED") || run.lifecycle_status?.includes("HISTORY")) return "history";
  return "work_item";
}

function operatorKindLabel(run = {}, queueItem = {}) {
  const kind = runKind(run, queueItem);
  const stage = run.stage || queueItem.stage || run.lifecycle_stage || queueItem.lifecycle_stage || activeStageFromChecklist(run)?.stage || "";
  const stageLabels = {
    ai_review: "Review",
    human_qa: "Human QA",
    repair: "Repair",
    re_review: "Review",
    commit_ready: "Review",
    closeout: "Review",
    implementation: "Repair",
    planned: "Planned",
    done: "Completed"
  };
  if (stageLabels[stage] && (kind === "lifecycle_stage" || kind === "work_item")) return stageLabels[stage];
  const kindLabels = {
    lifecycle_stage: "Review",
    followup: "Follow-up",
    audit: "Audit",
    reconciliation: "Reconciliation",
    documentation: "Documentation",
    planning: "Planned",
    map_only: "Map-only",
    certification_gate: "Certification gate",
    checkpoint: "Review",
    history: "Completed"
  };
  if (kindLabels[kind]) return kindLabels[kind];
  const scopeText = `${run.title || ""} ${queueItem.reason || ""} ${run.run_id || ""}`.toLowerCase();
  if (scopeText.includes("certification")) return "Certification gate";
  if (scopeText.includes("reconcile") || scopeText.includes("reconciliation")) return "Reconciliation";
  if (scopeText.includes("repair") || scopeText.includes("fix")) return "Repair";
  if (scopeText.includes("audit")) return "Audit";
  if (scopeText.includes("docs") || scopeText.includes("documentation")) return "Documentation";
  if (scopeText.includes("followup") || scopeText.includes("follow-up")) return "Follow-up";
  return "Work item";
}

function toneForKindLabel(label) {
  const value = text(label, "").toLowerCase();
  if (value.includes("blocked")) return "red";
  if (value.includes("repair") || value.includes("review") || value.includes("human qa")) return "amber";
  if (value.includes("audit") || value.includes("reconciliation") || value.includes("follow")) return "green";
  if (value.includes("map") || value.includes("documentation") || value.includes("planned")) return "blue";
  if (value.includes("certification")) return "red";
  if (value.includes("completed")) return "gray";
  return "gray";
}

function isLifecycleStage(run = {}, queueItem = {}) {
  return runKind(run, queueItem) === "lifecycle_stage";
}

function isOperatorPrimaryRun(run = {}, queueItem = {}) {
  if (!run.run_id && !queueItem.run_id) return false;
  if (isLifecycleStage(run, queueItem)) return false;
  if (run.visible_in_operator_queue === false || queueItem.visible_in_operator_queue === false) return false;
  return true;
}

function operatorQueueModel(data) {
  const queue = data.queue?.queue || [];
  const lifecycleStages = [];
  const primaryItems = [];
  queue.forEach((item) => {
    const run = data.runsById.get(item.run_id) || {};
    const record = { item, run };
    if (isLifecycleStage(run, item)) {
      lifecycleStages.push(record);
    } else if (isOperatorPrimaryRun(run, item)) {
      primaryItems.push(record);
    }
  });
  lifecycleStages.sort((a, b) => {
    const orderA = Number(a.run.operator_stage_order || a.item.operator_stage_order || Number.MAX_SAFE_INTEGER);
    const orderB = Number(b.run.operator_stage_order || b.item.operator_stage_order || Number.MAX_SAFE_INTEGER);
    return orderA - orderB || text(a.run.run_id || a.item.run_id).localeCompare(text(b.run.run_id || b.item.run_id));
  });
  const stagesByParent = groupBy(lifecycleStages.map(({ run, item }) => ({
    ...run,
    queue_item: item,
    parent_run_id: run.parent_run_id || item.parent_run_id
  })), "parent_run_id");
  return {
    technicalQueue: queue,
    primaryItems,
    lifecycleStages,
    stagesByParent
  };
}

function stageLabel(stage = {}) {
  const labels = {
    planned: "Planned",
    contract: "Contract",
    implementation: "Implementation",
    ai_review: "AI review",
    human_qa: "Human QA",
    changes_requested: "Changes requested",
    repair: "Repair",
    re_review: "Re-review",
    commit_ready: "Commit ready",
    closeout: "Commit / closeout",
    done: "Done"
  };
  return stage.label || stage.operator_display_title || labels[stage.stage] || labels[stage.lifecycle_stage] || friendlyLabel(stage.stage || stage.lifecycle_stage || "stage");
}

function stageStatusLabel(status) {
  const labels = {
    done: "done",
    completed: "done",
    current: "current",
    running: "running",
    waiting: "waiting",
    pending: "pending",
    changes_requested: "changes requested",
    in_progress: "in progress"
  };
  return labels[text(status, "pending").toLowerCase()] || friendlyLabel(status);
}

function stageTone(status) {
  const value = text(status, "pending").toLowerCase();
  if (value === "done" || value === "completed") return "done";
  if (value === "current" || value === "in_progress" || value === "running") return "current";
  if (value === "changes_requested") return "changes";
  return "pending";
}

function lifecycleStagesForRun(data, runId) {
  const parentRun = data.runsById.get(runId);
  if (parentRun?.stage_checklist?.length) {
    return parentRun.stage_checklist.map((stage, index) => ({
      ...stage,
      run_id: `${runId}::${stage.stage || index}`,
      lifecycle_stage: stage.stage,
      operator_stage_order: index + 1,
      operator_stage_status: stage.status || stage.operational_state || "pending",
      operator_display_title: stage.label
    }));
  }
  const model = operatorQueueModel(data);
  const childStages = model.stagesByParent.get(runId) || [];
  // The source console synthesized an extra "Implementation" stage for one hard-coded run of its
  // own project. Nothing synthesizes a stage here: a run shows the stages its data carries.
  return [...childStages].sort((a, b) => {
    const orderA = Number(a.operator_stage_order || Number.MAX_SAFE_INTEGER);
    const orderB = Number(b.operator_stage_order || Number.MAX_SAFE_INTEGER);
    return orderA - orderB;
  });
}

function renderStageStrip(stages, compact = true) {
  if (!stages.length) return "";
  return `
    <div class="${compact ? "stage-strip" : "stage-list"}">
      ${stages.map((stage) => `
        <div class="stage-pill stage-${escapeHtml(stageTone(stage.operator_stage_status))}">
          <span>${escapeHtml(stageLabel(stage))}${stage.qa_attempts || stage.attempts ? `: attempt ${escapeHtml(stage.qa_attempts || stage.attempts)}` : ""}</span>
          <strong>${escapeHtml(stageStatusLabel(stage.operator_stage_status))}</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function operatorStatus(queueItem = {}, run = {}) {
  const readiness = roadmapReadinessStatus(run, queueItem);
  if (readiness) return readiness;
  return canonicalStatusFromAxes(run, queueItem);
}

function operatorType(run = {}) {
  const domainLabels = {
    project_console: "Project Console",
    author_lite: "Editor",
    web_components: "Web components",
    math_authoring: "Math authoring",
    color_system: "Color",
    slide: "Slide",
    docs: "Docs",
    asset_dedup: "Future architecture",
    release: "Release",
    lessons_safety: "Lessons safety",
    aiw_integration: "AIW",
    governance: "Governance",
    unknown: "Project work"
  };
  if (run.operator_type_label) return run.operator_type_label;
  if (run.domain && domainLabels[run.domain]) return domainLabels[run.domain];
  const textValue = `${run.run_id || ""} ${run.objective_id || ""} ${run.phase_id || ""}`.toLowerCase();
  if (textValue.includes("project-console") || textValue.includes("console") || textValue.includes("roadmap")) return "Project Console";
  if (textValue.includes("color") || textValue.includes("palette")) return "Color";
  if (textValue.includes("math") || textValue.includes("rule") || textValue.includes("formula") || textValue.includes("mathlive")) return "Math authoring";
  if (textValue.includes("slide")) return "Slide";
  if (textValue.includes("docs")) return "Docs";
  if (textValue.includes("asset-dedup") || textValue.includes("ctx-assets")) return "Future architecture";
  if (textValue.includes("production") || textValue.includes("lessons")) return "Lessons safety";
  if (textValue.includes("web")) return "Web repair";
  return "Project work";
}

const ROADMAP_GROUP_DEFINITIONS = [
  { value: "now", label: "Now", tone: "blue", rank: 1 },
  { value: "ready_next", label: "Ready Next", tone: "green", rank: 2 },
  { value: "needs_ticket_scope", label: "Needs Ticket / Scope", tone: "amber", rank: 3 },
  { value: "needs_human_decision", label: "Needs Human Decision", tone: "amber", rank: 4 },
  { value: "blocked_by_dependency", label: "Blocked by Dependency", tone: "red", rank: 5 },
  { value: "deferred_later", label: "Deferred / Later", tone: "amber", rank: 6 },
  { value: "parked_future", label: "Parked / Future", tone: "blue", rank: 7 },
  { value: "archive_map_only", label: "Archive / Map-only", tone: "gray", rank: 8 },
  { value: "unknown", label: "Unknown / Needs Review", tone: "gray", rank: 9 }
];

const ROADMAP_GROUP_BY_VALUE = new Map(ROADMAP_GROUP_DEFINITIONS.map((group) => [group.value, group]));
const OPERATOR_GROUP_ORDER = Object.fromEntries(ROADMAP_GROUP_DEFINITIONS.map((group) => [group.label, group.rank]));
const LEGACY_GROUP_TO_ROADMAP_VALUE = {
  Now: "now",
  Next: "ready_next",
  "Needs ticket / Waiting": "needs_ticket_scope",
  Blocked: "blocked_by_dependency",
  Later: "deferred_later"
};

const EXECUTION_READINESS_LABELS = {
  active: "Active",
  ready: "Ready",
  ready_after_dependency: "Ready after dependency",
  needs_scope: "Needs scope",
  needs_human_decision: "Needs human decision",
  blocked_dependency: "Blocked dependency",
  deferred: "Deferred",
  parked: "Parked",
  reference_only: "Reference only",
  unknown: "Unknown"
};

const EXECUTION_READINESS_TONES = {
  active: "blue",
  ready: "green",
  ready_after_dependency: "amber",
  needs_scope: "amber",
  needs_human_decision: "amber",
  blocked_dependency: "red",
  deferred: "amber",
  parked: "blue",
  reference_only: "gray",
  unknown: "gray"
};

const DEFAULT_VISIBILITY_LABELS = {
  primary: "Primary",
  detail: "Detail",
  future: "Future",
  archive: "Archive"
};

const DEFAULT_VISIBILITY_TONES = {
  primary: "green",
  detail: "blue",
  future: "amber",
  archive: "gray"
};

const CLAIM_BOUNDARY_LABELS = {
  none: "No special claim boundary",
  no_certification_claim: "No certification claim",
  readiness_only: "Readiness only",
  acceptance_checkpoint: "Acceptance checkpoint",
  legacy_certification_language: "Legacy certification language",
  unknown: "Unknown claim boundary"
};

const CLAIM_BOUNDARY_TONES = {
  none: "gray",
  no_certification_claim: "amber",
  readiness_only: "blue",
  acceptance_checkpoint: "blue",
  legacy_certification_language: "amber",
  unknown: "gray"
};

function fieldValue(record = {}, field) {
  const value = record[field];
  return value == null || value === "" ? null : value;
}

function roadmapField(run = {}, queueItem = {}, field) {
  return fieldValue(queueItem, field) || fieldValue(run, field);
}

function roadmapArrayField(run = {}, queueItem = {}, field) {
  const values = [];
  [queueItem, run].forEach((record) => {
    const items = Array.isArray(record?.[field]) ? record[field] : [];
    items.forEach((item) => {
      if (item && !values.includes(item)) values.push(item);
    });
  });
  return values;
}

function legacyOperatorGroup(run = {}, queueItem = {}) {
  const classification = queueItem.classification || run.queue_classification || "";
  const operationalState = queueItem.operational_state || run.operational_state || "";
  const physicalLifecycle = queueItem.physical_lifecycle || run.physical_lifecycle || "";
  const waitReason = queueItem.wait_reason || run.wait_reason || "";

  if (operationalState === "blocked" || physicalLifecycle === "blocked" || classification === "blocked") return "Blocked";
  if (["deferred", "future", "map_only"].includes(classification) || runKind(run, queueItem) === "map_only") return "Later";
  if (classification === "own_ticket_required" || waitReason === "human_intervention") return "Needs ticket / Waiting";
  if (operationalState === "running" || classification === "current") return "Now";
  if (queueItem.executable === true || classification === "queued") return "Next";
  if (operationalState === "waiting") return "Needs ticket / Waiting";
  return "Later";
}

function operatorGroupMeta(run = {}, queueItem = {}) {
  const explicitValue = roadmapField(run, queueItem, "display_group");
  const value = explicitValue || LEGACY_GROUP_TO_ROADMAP_VALUE[legacyOperatorGroup(run, queueItem)] || "unknown";
  const definition = ROADMAP_GROUP_BY_VALUE.get(value) || ROADMAP_GROUP_BY_VALUE.get("unknown");
  return {
    ...definition,
    explicit: Boolean(explicitValue),
    value
  };
}

function operatorGroup(run = {}, queueItem = {}) {
  return operatorGroupMeta(run, queueItem).label;
}

function operatorGroupValue(run = {}, queueItem = {}) {
  return operatorGroupMeta(run, queueItem).value;
}

function operatorGroupRank(group) {
  return OPERATOR_GROUP_ORDER[group] || Number.MAX_SAFE_INTEGER;
}

function roadmapReadinessStatus(run = {}, queueItem = {}) {
  const value = roadmapField(run, queueItem, "execution_readiness");
  if (!value) return null;
  return {
    label: EXECUTION_READINESS_LABELS[value] || friendlyLabel(value),
    tone: EXECUTION_READINESS_TONES[value] || "gray",
    value
  };
}

function roadmapVisibilityMeta(run = {}, queueItem = {}) {
  const value = roadmapField(run, queueItem, "default_visibility") || "primary";
  return {
    label: DEFAULT_VISIBILITY_LABELS[value] || friendlyLabel(value),
    tone: DEFAULT_VISIBILITY_TONES[value] || "gray",
    value
  };
}

function roadmapClaimBoundaryMeta(run = {}, queueItem = {}) {
  const value = roadmapField(run, queueItem, "claim_boundary") || "unknown";
  return {
    label: CLAIM_BOUNDARY_LABELS[value] || friendlyLabel(value),
    tone: CLAIM_BOUNDARY_TONES[value] || "gray",
    value
  };
}

function cleanOperatorTitle(title) {
  return text(title, "Untitled run")
    .replace(/\bProject Console\b/g, "Project Console")
    .replace(/\bOPS\/NEXT_STEPS\/DECISIONS\b/g, "OPS, Next Steps and Decisions")
    .replace(/\bctx\.assets\b/g, "ctx.assets")
    .replace(/\bQA\b/g, "QA")
    .replace(/\bUI\b/g, "UI")
    .replace(/\bWeb\b/g, "Web")
    .replace(/\bSlide\b/g, "Slide")
    // A raw run id inside a human-facing title reads as noise, so it is masked. The source
    // console matched one project's own id prefix; the rule here is STRUCTURAL — any
    // RUN-…-shaped id, whatever the project calls its runs — because a prefix is identity.
    .replace(/\bRUN-[A-Z0-9]+(?:-[A-Z0-9]+)+\b/g, "project run");
}

function operatorRun(run = {}, queueItem = {}) {
  const override = RUN_OPERATOR_OVERRIDES[run.run_id] || {};
  const type = run.operator_type_label || override.operator_type_label || operatorType(run);
  const status = operatorStatus(queueItem, run);
  const group = operatorGroupMeta(run, queueItem);
  const visibility = roadmapVisibilityMeta(run, queueItem);
  const claimBoundary = roadmapClaimBoundaryMeta(run, queueItem);
  const blockingReason = roadmapField(run, queueItem, "blocking_reason");
  const blockedBy = roadmapArrayField(run, queueItem, "blocked_by");
  const followupOf = roadmapField(run, queueItem, "followup_of");
  const derivedFrom = roadmapArrayField(run, queueItem, "derived_from");
  const nextAction = roadmapField(run, queueItem, "next_action") || run.operator_next_action || queueItem.operator_next_action || override.operator_next_action || cleanOperatorTitle(run.next_action || queueItem.reason || "Review the run scope before execution.");
  const closeoutCriteria = roadmapField(run, queueItem, "closeout_criteria") || run.operator_closure_criteria || override.operator_closure_criteria || "Closes when the scoped change is reviewed, validated, and any human QA result is recorded.";
  const whyNow = roadmapField(run, queueItem, "why_now");
  const whyNotNow = roadmapField(run, queueItem, "why_not_now");
  const kindLabel = run.operator_kind_label || queueItem.operator_kind_label || override.operator_kind_label || operatorKindLabel(run, queueItem);
  const rawSummary = run.operator_display_summary || queueItem.operator_display_summary || queueItem.reason || run.operator_summary || override.operator_summary || run.next_action || run.title;
  const blocker = blockingReason || run.operator_blocker_label || override.operator_blocker_label || (
    !group.explicit && ["blocked", "deferred", "future", "map_only", "own_ticket_required"].includes(queueItem.classification || run.queue_classification)
      ? "Not executable yet"
      : ""
  );
  return {
    displayTitle: run.operator_display_title || queueItem.operator_display_title || run.display_title || override.display_title || cleanOperatorTitle(run.title || queueItem.reason || run.run_id),
    summary: run.operator_display_summary || queueItem.operator_display_summary || run.operator_summary || override.operator_summary || cleanOperatorTitle(rawSummary),
    nextAction,
    why: whyNow || whyNotNow || run.operator_why_it_matters || override.operator_why_it_matters || `${type} work keeps the project plan explicit without turning it into a certification claim.`,
    whyNow,
    whyNotNow,
    closure: closeoutCriteria,
    blocker,
    blockedBy,
    blockingReason,
    followupOf,
    derivedFrom,
    type,
    statusLabel: status.label,
    statusTone: status.tone,
    kindLabel,
    kindTone: toneForKindLabel(kindLabel),
    group: group.label,
    groupValue: group.value,
    groupTone: group.tone,
    groupExplicit: group.explicit,
    visibilityLabel: visibility.label,
    visibilityTone: visibility.tone,
    visibilityValue: visibility.value,
    claimBoundaryLabel: claimBoundary.label,
    claimBoundaryTone: claimBoundary.tone,
    claimBoundaryValue: claimBoundary.value
  };
}

function runSecondaryMetadata(run = {}, queueItem = {}) {
  const waitReason = run.wait_reason || queueItem.wait_reason;
  const stage = run.stage || queueItem.stage || run.lifecycle_stage || queueItem.lifecycle_stage || activeStageFromChecklist(run)?.stage;
  const visibility = roadmapVisibilityMeta(run, queueItem);
  const values = [
    `Area: ${operatorType(run)}`,
    `Kind: ${operatorKindLabel(run, queueItem)}`,
    `Visibility: ${visibility.label}`,
    stage ? `Stage: ${stageLabel({ stage })}` : "",
    waitReason ? `Wait: ${friendlyLabel(waitReason)}` : ""
  ].filter(Boolean);
  return values.join(" / ");
}

function queueCounts(queue) {
  const byClassification = queue.reduce((counts, item) => {
    const classification = item.classification || "unknown";
    counts[classification] = (counts[classification] || 0) + 1;
    return counts;
  }, {});
  return {
    total: queue.length,
    executable: queue.filter((item) => item.executable === true || item.operational_state === "running").length,
    planned: queue.filter((item) => item.operational_state === "waiting" && !["deferred", "future", "map_only", "own_ticket_required"].includes(item.classification)).length,
    blocked: queue.filter((item) => item.operational_state === "blocked" || item.physical_lifecycle === "blocked").length,
    deferred: (byClassification.deferred || 0) + (byClassification.own_ticket_required || 0),
    futureMap: (byClassification.future || 0) + (byClassification.map_only || 0),
    byClassification
  };
}

function countOperatorGroups(records) {
  return records.reduce((counts, { item, run }) => {
    const group = operatorGroup(run, item);
    counts[group] = (counts[group] || 0) + 1;
    return counts;
  }, {});
}

function countOperatorField(records, field) {
  return records.reduce((counts, { item, run }) => {
    const value = roadmapField(run, item, field) || "unknown";
    counts[value] = (counts[value] || 0) + 1;
    return counts;
  }, {});
}

function roadmapGroupCount(groupCounts, value) {
  const definition = ROADMAP_GROUP_BY_VALUE.get(value);
  return definition ? groupCounts[definition.label] || 0 : 0;
}

function operatorQueueCounts(data) {
  const model = operatorQueueModel(data);
  const sourceRecords = model.technicalQueue.map((item) => ({
    item,
    run: data.runsById.get(item.run_id) || {}
  }));
  const sourceQueueItems = model.technicalQueue;
  const counts = queueCounts(sourceQueueItems);
  const groupCounts = countOperatorGroups(sourceRecords);
  const visibilityCounts = countOperatorField(sourceRecords, "default_visibility");
  const claimBoundaryCounts = countOperatorField(sourceRecords, "claim_boundary");
  return {
    ...counts,
    groupCounts,
    visibilityCounts,
    claimBoundaryCounts,
    now: roadmapGroupCount(groupCounts, "now"),
    readyNext: roadmapGroupCount(groupCounts, "ready_next"),
    needsTicketScope: roadmapGroupCount(groupCounts, "needs_ticket_scope"),
    needsHumanDecision: roadmapGroupCount(groupCounts, "needs_human_decision"),
    blockedByDependency: roadmapGroupCount(groupCounts, "blocked_by_dependency"),
    deferredLater: roadmapGroupCount(groupCounts, "deferred_later"),
    parkedFuture: roadmapGroupCount(groupCounts, "parked_future"),
    archiveMapOnly: roadmapGroupCount(groupCounts, "archive_map_only"),
    totalRemaining: model.technicalQueue.length,
    technicalTotal: model.technicalQueue.length,
    primaryTotal: model.primaryItems.length,
    lifecycleStages: model.lifecycleStages.length
  };
}

function renderOperatorGroupCountCards(counts, includeTotal = true) {
  const cards = ROADMAP_GROUP_DEFINITIONS
    .filter((group) => group.value !== "unknown")
    .map((group) => `<div><span>${escapeHtml(group.label)}</span><strong>${escapeHtml(counts.groupCounts[group.label] || 0)}</strong></div>`);
  if (includeTotal) {
    cards.push(`<div><span>Total queue</span><strong>${escapeHtml(counts.totalRemaining)}</strong></div>`);
  }
  return cards.join("");
}

function renderCountBreakdown(counts) {
  return Object.entries(counts)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `<span>${escapeHtml(friendlyLabel(key))}: ${escapeHtml(value)}</span>`)
    .join("");
}

function row(label, value, extraClass = "") {
  return `
    <div class="data-row">
      <div class="data-label">${escapeHtml(label)}</div>
      <div class="data-value ${extraClass}">${escapeHtml(value)}</div>
    </div>
  `;
}

function metaField(label, value, extraClass = "") {
  return `
    <div class="docs-meta-field">
      <div class="docs-meta-label">${escapeHtml(label)}</div>
      <div class="docs-meta-value ${extraClass}">${escapeHtml(value)}</div>
    </div>
  `;
}

function emptyState(message) {
  return `<div class="empty-state">${escapeHtml(message)}</div>`;
}

function evidenceList(items) {
  if (!items || !items.length) return "";
  return `
    <details class="source-details">
      <summary>References</summary>
      <ul class="source-list">
        ${items.map((item) => `<li class="source-ref" title="${escapeHtml(item)}">${escapeHtml(item)}</li>`).join("")}
      </ul>
    </details>
  `;
}

function chipList(items, emptyMessage = "No items recorded.") {
  if (!items || !items.length) return emptyState(emptyMessage);
  return `
    <div class="chip-list">
      ${items.map((item) => `<span class="guardrail-chip" title="${escapeHtml(item)}">${escapeHtml(friendlyLabel(item))}</span>`).join("")}
    </div>
  `;
}

// Normalise a route to the form the emitter declares paths in: repo-relative, POSIX, no query,
// no leading `./`, `../` or `/`. Display-only normalisation lives in displaySourcePath; this one
// exists to COMPARE, so it is deliberately the same shape on both sides of the comparison.
function normalizeRoutePath(value) {
  return text(value, "").split("?")[0].replace(/^(?:\.{1,2}\/)+/, "").replace(/^\/+/, "");
}

// Read the project's own declaration off its snapshot. Accepts `{path}` records (what the
// emitter writes) and bare strings, and ignores anything else: a malformed declaration must
// degrade to "no declaration" — which is the loud direction — never to a thrown render.
function readDeclaredArtifactPaths(snapshot) {
  const declared = snapshot && snapshot.emitted_artifacts;
  if (!Array.isArray(declared)) return [];
  return declared
    .map((entry) => normalizeRoutePath(typeof entry === "string" ? entry : entry && entry.path))
    .filter(Boolean);
}

// Is this fetched route one the ACTIVE project declared emitting? The declaration is
// repo-relative (`.project/roadmap.json`) and the fetched route is the shell's virtual one
// (`/projects/<key>/.project/roadmap.json`), so the match is a suffix at a segment boundary —
// never a name, a project key, or a fixed list of files typed into this file.
function isDeclaredSource(path) {
  if (!declaredArtifactPaths.length) return true;
  const route = normalizeRoutePath(path);
  return declaredArtifactPaths.some((declared) => route === declared || route.endsWith(`/${declared}`));
}

function recordSourceFailure(path, detail) {
  failedSources.push({ path, detail });
}

async function fetchText(path, required = false) {
  try {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    const content = await response.text();
    loadedSources.push(path);
    return content;
  } catch (error) {
    recordSourceFailure(path, error.message);
    if (required) throw error;
    return null;
  }
}

async function fetchJson(path, required = false) {
  const content = await fetchText(path, required);
  if (content == null) return null;
  try {
    return JSON.parse(content);
  } catch (error) {
    recordSourceFailure(path, `invalid JSON: ${error.message}`);
    if (required) throw error;
    return null;
  }
}

async function fetchJsonl(path) {
  const content = await fetchText(path);
  if (content == null) return [];
  const rows = [];
  content.split(/\r?\n/).forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    try {
      rows.push(JSON.parse(trimmed));
    } catch (error) {
      // The line number rides in the DETAIL, not in the path: the path is what gets matched
      // against the project's declaration, and `foo.jsonl:3` matches no declared route.
      recordSourceFailure(path, `line ${index + 1}: invalid JSONL: ${error.message}`);
    }
  });
  return rows;
}

function indexBy(items, key) {
  return new Map(items.map((item) => [item[key], item]));
}

function groupBy(items, key) {
  return items.reduce((map, item) => {
    const group = item[key];
    const list = map.get(group) || [];
    list.push(item);
    map.set(group, list);
    return map;
  }, new Map());
}

function repoHref(path) {
  if (!path || path.startsWith("http:") || path.startsWith("https:")) return "#";
  return `${REPO_BASE}${path}`;
}

function currentRun(data) {
  const id = data.projectStatus?.current_run_id || data.snapshot?.project_summary?.current_run_id;
  return data.runsById.get(id) || null;
}

function nextRun(data) {
  const id = data.projectStatus?.next_recommended_run_id || data.snapshot?.project_summary?.next_recommended_run_id;
  return data.runsById.get(id) || null;
}

function nextPrimaryWorkItem(data, currentId) {
  const model = operatorQueueModel(data);
  const currentEntry = model.primaryItems.find(({ run }) => run.run_id === currentId);
  return model.primaryItems.find(({ run, item }) => {
    if (run.run_id === currentId) return false;
    if (currentEntry && item.order <= currentEntry.item.order) return false;
    return true;
  }) || model.primaryItems.find(({ run }) => run.run_id !== currentId) || null;
}

function historyItems(data) {
  const eventItems = data.events.map((event) => ({
    type: event.event_type,
    id: event.event_id || event.id,
    title: event.title || event.summary,
    summary: event.summary,
    source_refs: event.source_refs || event.evidence_refs || [],
    date_or_unknown: event.date_or_unknown || event.commit
  }));
  const changeItems = data.changeLedger.map((item) => ({
    type: item.type || "CHANGE",
    id: item.ledger_id || item.commit,
    title: item.title,
    summary: item.summary,
    source_refs: item.source_refs || [],
    date_or_unknown: item.date_or_unknown || item.commit
  }));
  const provenanceItems = data.gitProvenance.map((episode) => ({
    type: "GIT_EPISODE",
    id: episode.episode_id,
    title: episode.title,
    summary: episode.summary,
    source_refs: episode.commit_refs || [],
    date_or_unknown: episode.status
  }));
  const qaItems = data.humanQa.map((item) => ({
    type: "HUMAN_QA",
    id: item.qa_id || item.id,
    title: item.title || item.summary,
    summary: item.summary || item.result || item.status,
    source_refs: item.source_refs || item.evidence_refs || [],
    date_or_unknown: item.date_or_unknown || item.status
  }));
  const reviewItems = data.aiReviews.map((item) => ({
    type: "AI_REVIEW",
    id: item.review_id || item.id,
    title: item.title || item.summary,
    summary: item.summary || item.result || item.status,
    source_refs: item.source_refs || item.evidence_refs || [],
    date_or_unknown: item.date_or_unknown || item.status
  }));
  const snapshotItems = (data.snapshot?.latest_history_items || []).map((item) => ({
    type: item.type,
    id: item.id,
    title: item.summary,
    summary: item.summary,
    source_refs: item.source_refs || [],
    date_or_unknown: item.id
  }));
  return [...eventItems, ...changeItems, ...provenanceItems, ...qaItems, ...reviewItems, ...snapshotItems]
    .filter((item) => item.title || item.summary)
    .slice(-28)
    .reverse();
}

function setOverviewCardTitles() {
  // Approved v3 Overview section eyebrows (target screenshot): the static card titles
  // are rewritten at runtime; uppercase presentation comes from CSS.
  [
    ["project-overview", "Current work"],
    ["next-pending-runs", "Next action"],
    ["overview-activity", "Queue snapshot"]
  ].forEach(([containerId, title]) => {
    const heading = byId(containerId)?.closest(".overview-card")?.querySelector(".overview-card-title");
    if (heading) heading.textContent = title;
  });
}

function renderOverview(data) {
  const project = data.project || {};
  const status = data.projectStatus || {};
  const summary = data.snapshot?.project_summary || {};
  const current = currentRun(data);
  const queueModel = operatorQueueModel(data);
  const queue = queueModel.technicalQueue;
  const counts = operatorQueueCounts(data);
  const operational = data.snapshot?.operational_status || {};
  const currentStatus = data.snapshot?.current_status_summary || {};
  const componentSummary = data.snapshot?.component_status_summary || {};
  const currentQueueItem = queue.find((item) => item.run_id === current?.run_id) || {};
  const nextEntry = nextPrimaryWorkItem(data, current?.run_id);
  const next = nextEntry?.run || nextRun(data);
  const nextQueueItem = queue.find((item) => item.run_id === next?.run_id) || {};
  const currentOperator = operatorRun(current || {}, currentQueueItem);
  const nextOperator = operatorRun(next || {}, nextQueueItem);
  const currentStages = current ? lifecycleStagesForRun(data, current.run_id) : [];
  const currentStage = currentStages.find((stage) => ["running", "current", "in_progress"].includes(text(stage.operator_stage_status, "").toLowerCase()))
    || currentStages.find((stage) => text(stage.operator_stage_status, "").toLowerCase() === "changes_requested")
    || currentStages[0];
  const immediatePlan = queueModel.primaryItems.slice(0, 3).map(({ item, run }) => ({ item, run, operator: operatorRun(run, item) }));
  setOverviewCardTitles();

  byId("project-overview").innerHTML = [
    `<div class="action-panel">
      <div class="overview-section-title">Current work item</div>
      <h2>${escapeHtml(currentOperator.displayTitle || currentStatus.current_focus || current?.title)}</h2>
      <p>${escapeHtml(currentOperator.summary || operational.summary)}</p>
      <div class="operator-badge-row">
        ${operatorBadge(currentOperator.group, currentOperator.groupTone)}
        ${operatorBadge(currentOperator.statusLabel, currentOperator.statusTone)}
        ${operatorBadge(currentOperator.kindLabel, currentOperator.kindTone)}
      </div>
      ${renderStageStrip(currentStages)}
    </div>`,
    `<div class="action-panel action-panel-muted">
      <div class="overview-section-title">Current stage</div>
      <h3>${escapeHtml(currentStage ? `${stageLabel(currentStage)}: ${stageStatusLabel(currentStage.operator_stage_status)}` : currentStatus.current_stage || status.current_focus?.current_stage || "Review pending")}</h3>
      <p>${escapeHtml(status.author_lite_pause_summary?.reason || currentStatus.author_lite_status || "Author Lite remains paused until Project Console Human QA closes.")}</p>
    </div>`
  ].join("");

  byId("next-pending-runs").innerHTML = `
    <div class="action-panel">
      <div class="overview-section-title">Next action</div>
      <h3>${escapeHtml(currentOperator.nextAction || currentStatus.next_operator_action || "Review the updated console, approve it, or request more UX changes.")}</h3>
    </div>
    <div class="action-panel action-panel-muted">
      <div class="overview-section-title">Next real project work</div>
      ${renderNextRun(next, nextQueueItem.order || 1, nextQueueItem.reason, nextQueueItem)}
    </div>
    <div class="overview-section">
      <div class="overview-section-title">Immediate plan</div>
      <ol class="action-steps">
        ${immediatePlan.map(({ item, run, operator }) => `
          <li>
            <button type="button" data-run-id="${escapeHtml(run.run_id)}">
              <span>${escapeHtml(operator.displayTitle)}</span>
              <small>${escapeHtml(operator.group)} / ${escapeHtml(operator.statusLabel)} / ${escapeHtml(operator.kindLabel)}</small>
            </button>
          </li>
        `).join("")}
      </ol>
    </div>
  `;

  byId("overview-activity").innerHTML = `
    <div class="no-claims-compact">
      ${operatorBadge("Web not certified", "red")}
      ${operatorBadge("Slide not certified", "red")}
      ${operatorBadge("rule not certified", "red")}
      ${operatorBadge("Smart Formula RULE_ONLY", "amber")}
      ${operatorBadge("Read-only / not AIW-managed", "blue")}
    </div>
    <div class="progress-area-grid overview-section">
      ${renderOperatorGroupCountCards(counts)}
    </div>
    <p class="operator-note">Complete queue is preserved in Roadmap / Queue. This overview shows only the active decision path.</p>
  `;
}

function renderNextRun(run, order, reason = "", queueItem = {}) {
  if (!run) return "";
  const operator = operatorRun(run, queueItem);
  const stages = appData ? lifecycleStagesForRun(appData, run.run_id) : [];
  return `
    <button class="next-run-item" type="button" data-run-id="${escapeHtml(run.run_id)}">
      <div class="next-run-num">${escapeHtml(order)}</div>
      <div class="next-run-body">
        <div class="next-run-title">${escapeHtml(operator.displayTitle)}</div>
        <div class="next-run-reason">${escapeHtml(operator.summary || reason || run.next_action || "No next action recorded.")}</div>
        ${renderStageStrip(stages)}
      </div>
      <div class="operator-badge-row">
        ${operatorBadge(operator.group, operator.groupTone)}
        ${operatorBadge(operator.statusLabel, operator.statusTone)}
        ${operatorBadge(operator.kindLabel, operator.kindTone)}
      </div>
    </button>
  `;
}

function renderActivityItem(item) {
  return `
    <div class="activity-item">
      <div class="activity-badge">${operatorBadge(friendlyLabel(item.type || "Event"), toneForStatus(item.type))}</div>
      <div class="activity-body">
        <div class="activity-title">${escapeHtml(item.title || item.summary)}</div>
        <div class="activity-desc">${escapeHtml(item.summary || "")}</div>
        <div class="activity-context">${escapeHtml(item.date_or_unknown || item.id || "")}</div>
      </div>
    </div>
  `;
}

function renderBlockers(blockers) {
  if (!blockers.length) return emptyState("No blockers are recorded in snapshot/project status.");
  return blockers.map((blocker) => `
    <div class="status-line">
      ${operatorBadge(blockerStatusLabel(blocker.status), toneForStatus(blocker.status))}
      <div>
        <div class="status-line-title">${escapeHtml(blocker.title || blocker.blocker_id)}</div>
        ${evidenceList(blocker.source_refs || [])}
      </div>
    </div>
  `).join("");
}

function renderFollowups(followups) {
  if (!followups.length) return emptyState("No follow-ups are recorded in snapshot/project status.");
  return followups.map((item) => `
    <div class="status-line">
      ${operatorBadge(followupStatusLabel(item.status), toneForStatus(item.status))}
      <div>
        <div class="status-line-title">${escapeHtml(item.title || item.followup_id)}</div>
        <details class="technical-disclosure">
          <summary>Technical target</summary>
          <div class="activity-context mono">${escapeHtml(item.target_run_id || "")}</div>
        </details>
      </div>
    </div>
  `).join("");
}

function blockerStatusLabel(status) {
  const value = text(status, "active").toLowerCase();
  if (value.includes("blocked")) return "Blocked";
  if (value.includes("review")) return "In review";
  if (value.includes("followup")) return "Follow-up";
  if (value.includes("claim")) return "Restriction";
  if (value.includes("active")) return "Active";
  return friendlyLabel(status);
}

function followupStatusLabel(status) {
  const value = text(status, "open").toLowerCase();
  if (value.includes("next")) return "Next";
  if (value.includes("queued")) return "Queued";
  if (value.includes("open")) return "Open";
  if (value.includes("closed")) return "Closed";
  return friendlyLabel(status);
}

function renderQueue(data) {
  const queueModel = operatorQueueModel(data);
  const queue = queueModel.primaryItems;
  const counts = operatorQueueCounts(data);
  const filterBar = document.querySelector("#roadmap-sub-queue .filter-bar");
  // Validator compatibility: source group cards include Now, Ready Next, Blocked by Dependency, Deferred / Later, and Total remaining counts.
  if (filterBar) {
    filterBar.innerHTML = `
      <div class="filter-group"><span>Filter</span><select id="queue-filter" class="select-sm">
        <option value="all">All work items</option>
        ${ROADMAP_GROUP_DEFINITIONS.map((group) => `<option value="${escapeHtml(group.value)}">${escapeHtml(group.label)}</option>`).join("")}
      </select></div>
      <div class="filter-divider"></div>
      <div class="filter-group"><span>Sort</span><select id="queue-sort" class="select-sm">
        <option value="plan">Plan groups (roadmap)</option>
        <option value="order">Raw queue order</option>
        <option value="state">Operational state</option>
        <option value="objective">Objective</option>
      </select></div>
      <div class="filter-divider"></div>
      <div class="filter-group"><span>View</span><select id="queue-view" class="select-sm">
        <option value="compact">Compact</option>
        <option value="expanded">Expanded</option>
      </select></div>
    `;
  }

  const renderItems = () => {
    const filter = byId("queue-filter")?.value || "all";
    const sort = byId("queue-sort")?.value || "plan";
    const view = byId("queue-view")?.value || "compact";
    const filtered = queue.filter(({ item }) => {
      const run = data.runsById.get(item.run_id) || {};
      if (filter === "all") return true;
      return operatorGroupValue(run, item) === filter;
    }).sort((a, b) => {
      const runA = a.run || {};
      const runB = b.run || {};
      if (sort === "plan") {
        return operatorGroupRank(operatorGroup(runA, a.item)) - operatorGroupRank(operatorGroup(runB, b.item))
          || a.item.order - b.item.order;
      }
      if (sort === "state") return text(a.item.operational_state).localeCompare(text(b.item.operational_state)) || a.item.order - b.item.order;
      if (sort === "objective") return text(runA.objective_id).localeCompare(text(runB.objective_id)) || a.item.order - b.item.order;
      return a.item.order - b.item.order;
    });

    byId("run-queue").innerHTML = queue.length ? [
      `<div class="queue-counts operator-counts">
        ${renderOperatorGroupCountCards(counts)}
      </div>`,
      `<details class="model-stats">
        <summary>Model stats</summary>
        <div class="model-stats-grid">
          <span>Primary work items: <strong>${escapeHtml(counts.primaryTotal)}</strong></span>
          <span>Lifecycle stages: <strong>${escapeHtml(counts.lifecycleStages)}</strong></span>
          <span>Technical records: <strong>${escapeHtml(counts.technicalTotal)}</strong></span>
          <span>Blocked by dependency: <strong>${escapeHtml(counts.blockedByDependency)}</strong></span>
        </div>
        <div class="model-stat-breakdown">
          ${Object.entries(counts.byClassification).map(([key, value]) => `<span>${escapeHtml(friendlyLabel(key))}: ${escapeHtml(value)}</span>`).join("")}
        </div>
        <div class="model-stat-breakdown">
          ${renderCountBreakdown(counts.visibilityCounts)}
        </div>
      </details>`,
      `<div class="queue-definition">
        <strong>Run Queue</strong>: Complete ordered pending run queue, presented as an operator action plan. Technical records remain available in each run drawer.
      </div>`,
      filtered.length ? filtered.map(({ item, run }, index) => {
        const operator = operatorRun(run, item);
        const stages = lifecycleStagesForRun(data, run.run_id);
        const previousRun = index > 0 ? filtered[index - 1].run : null;
        const previousGroup = previousRun ? operatorGroup(previousRun, filtered[index - 1].item) : null;
        const groupHeader = filter === "all" && sort === "plan" && operator.group !== previousGroup
          ? `<div class="queue-group-header">${escapeHtml(operator.group)}</div>`
          : "";
        return `${groupHeader}
          <button class="queue-item ${view === "expanded" ? "queue-item-expanded" : ""}" type="button" data-run-id="${escapeHtml(item.run_id)}">
            <div class="queue-order">${escapeHtml(item.order)}</div>
            <div class="queue-info">
              <div class="queue-title">${escapeHtml(operator.displayTitle)}</div>
              <div class="next-run-reason">${escapeHtml(operator.summary)}</div>
              ${renderStageStrip(stages)}
              ${operator.blocker ? `<div class="blocker-line">${escapeHtml(operator.blocker)}</div>` : ""}
              ${view === "expanded" ? `<div class="queue-extra">${escapeHtml(operator.nextAction)}</div>` : ""}
            </div>
            <div class="operator-badge-row queue-primary-badges">
              ${operatorBadge(operator.group, operator.groupTone)}
              ${operatorBadge(operator.statusLabel, operator.statusTone)}
              ${operatorBadge(operator.kindLabel, operator.kindTone)}
              ${view === "expanded" ? operatorBadge(operator.visibilityLabel, operator.visibilityTone) : ""}
            </div>
          </button>
        `;
      }).join("") : emptyState("No queue items match the current filter.")
    ].join("") : emptyState("No run queue could be loaded from project-local state.");
    attachRunButtons();
  };

  renderItems();
  ["queue-filter", "queue-sort", "queue-view"].forEach((id) => {
    byId(id)?.addEventListener("change", renderItems);
  });
}

function renderRoadmapMap(data) {
  const phasesByObjective = groupBy(data.phases, "objective_id");
  const runsByPhase = groupBy(data.runs, "phase_id");
  byId("roadmap-tree").innerHTML = [
    `<div class="queue-definition">
      <strong>Roadmap</strong>: complete work-area plan by objective, phase, and real work item. Technical records stay available through run details.
    </div>`,
    data.objectives.map((objective) => {
    const phases = phasesByObjective.get(objective.objective_id) || [];
    const objectiveRuns = phases.flatMap((phase) => runsByPhase.get(phase.phase_id) || []);
    const visibleObjectiveRuns = objectiveRuns.filter((run) => run.visible_in_operator_roadmap !== false && !isLifecycleStage(run));
    const purpose = objective.purpose && objective.purpose !== objective.title ? objective.purpose : objective.notes;
    return `
      <div class="objective-card">
        <div class="objective-header">
          <div>
            <h3>${escapeHtml(objective.title || objective.objective_id)}</h3>
            ${purpose ? `<div class="objective-purpose">${escapeHtml(purpose)}</div>` : ""}
            <div class="text-tertiary">${visibleObjectiveRuns.length} work items across ${phases.length} phases</div>
          </div>
          <div class="operator-badge-row">
            ${operatorBadge(`${phases.length} phases`, "gray")}
            ${operatorBadge(`${visibleObjectiveRuns.length} work items`, "blue")}
          </div>
        </div>
        ${phases.map((phase) => renderPhaseGroup(phase, runsByPhase.get(phase.phase_id) || [])).join("")}
      </div>
    `;
    }).join("") || emptyState("No roadmap could be loaded.")
  ].join("");
}

function renderPhaseGroup(phase, runs) {
  const visibleRuns = runs.filter((run) => run.visible_in_operator_roadmap !== false && !isLifecycleStage(run));
  const orderedRuns = [...visibleRuns].sort((a, b) => {
    const orderA = a.queue_order || Number.MAX_SAFE_INTEGER;
    const orderB = b.queue_order || Number.MAX_SAFE_INTEGER;
    return orderA - orderB || text(a.run_id).localeCompare(text(b.run_id));
  });
  return `
    <div class="phase-group">
      <div class="phase-header">
        <span>&gt;</span>
        <span>${escapeHtml(phase.title || phase.phase_id)}</span>
        <span class="text-tertiary" style="margin-left:auto;">${visibleRuns.length} work items</span>
      </div>
      <div class="run-list">
        ${orderedRuns.length ? orderedRuns.map((run) => {
          const queueItem = appData?.queue?.queue?.find((item) => item.run_id === run.run_id) || {};
          const operator = operatorRun(run, queueItem);
          const stages = appData ? lifecycleStagesForRun(appData, run.run_id) : [];
          return `
          <button class="run-row" type="button" data-run-id="${escapeHtml(run.run_id)}">
            <div class="run-row-info">
              <span class="text-tertiary font-bold">#${escapeHtml(run.queue_order || "-")}</span>
              <span>
                <span class="run-row-title">${escapeHtml(operator.displayTitle)}</span>
                <span class="run-row-summary">${escapeHtml(operator.summary)}</span>
                ${renderStageStrip(stages)}
              </span>
            </div>
            <div class="operator-badge-row">
              ${operatorBadge(operator.group, operator.groupTone)}
              ${operatorBadge(operator.statusLabel, operator.statusTone)}
              ${operatorBadge(operator.kindLabel, operator.kindTone)}
            </div>
          </button>
        `;
        }).join("") : emptyState("No runs are recorded for this phase.")}
      </div>
    </div>
  `;
}

/* Roadmap v2 Draft subview.
   Additive draft preview inside the existing Roadmap tab. Reads the optional
   data.roadmapV2 source fail-soft: if roadmap_v2.json is unavailable or invalid, only
   this subview shows an unavailable state and the rest of the console is unaffected.
   Legacy Roadmap remains the canonical roadmap view; this subview renders only on
   explicit selection, is labeled Draft preview / Not active, renders no legacy queue
   or run records, and writes nothing. */

function rv2DraftPhaseKey(objectiveId, phaseId) {
  return `${objectiveId}||${phaseId}`;
}

/* Objectives expand by canonical status only: active objectives render their phase groups
   inline; every other objective starts collapsed. No hardcoded objective IDs. */
function rv2DraftObjectiveExpanded(objective) {
  return objective.status === "active";
}

function rv2DraftPhaseCounts(phase) {
  return {
    deliverables: Array.isArray(phase.deliverables) ? phase.deliverables.length : 0,
    families: Array.isArray(phase.candidate_run_families) ? phase.candidate_run_families.length : 0
  };
}

function rv2DraftObjectiveCounts(objective) {
  const phases = Array.isArray(objective.phases) ? objective.phases : [];
  return phases.reduce((totals, phase) => {
    const counts = rv2DraftPhaseCounts(phase);
    totals.phases += 1;
    totals.deliverables += counts.deliverables;
    totals.families += counts.families;
    return totals;
  }, { phases: 0, deliverables: 0, families: 0 });
}

function rv2DraftRoadmapCounts(roadmap) {
  const objectives = Array.isArray(roadmap.objectives) ? roadmap.objectives : [];
  return objectives.reduce((totals, objective) => {
    const counts = rv2DraftObjectiveCounts(objective);
    totals.objectives += 1;
    totals.phases += counts.phases;
    totals.deliverables += counts.deliverables;
    totals.families += counts.families;
    return totals;
  }, { objectives: 0, phases: 0, deliverables: 0, families: 0 });
}

/* Count fragments render only when greater than zero, so empty strategic phases keep no
   badges implying work (canonical empty_phase_policy.renderer_treatment). */
function rv2DraftCountLine(parts) {
  return parts
    .filter(([count]) => count > 0)
    .map(([count, singular, plural]) => `${count} ${count === 1 ? singular : plural || `${singular}s`}`)
    .join(" / ");
}

const RV2_DRAFT_OBJECTIVE_STATUS = {
  active: { label: "Active now", tone: "blue" },
  planned: { label: "Planned", tone: "green" },
  future: { label: "Later", tone: "amber" },
  parked: { label: "Parked", tone: "gray" }
};

const RV2_DRAFT_PHASE_BADGES = {
  active: { label: "Current", tone: "blue" },
  planned: { label: "Next", tone: "green" },
  future: { label: "Later", tone: "amber" },
  parked: { label: "Parked", tone: "gray" },
  deferred: { label: "Deferred", tone: "amber" },
  done: { label: "Done", tone: "gray" }
};

/* Presentation grouping of strategic draft phases by phase.status only. This is not
   Run Queue derivation: no queue records, no display_group, no execution ordering. */
const RV2_DRAFT_PHASE_GROUPS = [
  { label: "Current", statuses: ["active"] },
  { label: "Next", statuses: ["planned"] },
  { label: "Later", statuses: ["future", "parked", "deferred"] },
  { label: "Done", statuses: ["done"] }
];

const RV2_DRAFT_HORIZONS = {
  active: "H1 - Executable",
  planned: "H2 - Planned",
  future: "H3 - Strategic",
  parked: "H4 - Parked / Future",
  deferred: "H4 - Parked / Deferred",
  done: "Done (outside horizon bands)"
};

const RV2_DRAFT_GATES = {
  required: { label: "Needs operator decision", tone: "amber" },
  conditional: { label: "Conditional human gate", tone: "gray" },
  not_required: { label: "No human gate required", tone: "gray" }
};

const RV2_DRAFT_DELIVERABLE_KINDS = {
  capability: "Capability",
  artifact: "Artifact",
  decision: "Decision",
  validation: "Validation",
  documentation: "Documentation"
};

const RV2_DRAFT_DELIVERABLE_STATUS = {
  planned: { label: "Planned", tone: "green" },
  in_progress: { label: "In progress", tone: "blue" },
  implemented_locally: { label: "Implemented locally", tone: "amber" },
  met: { label: "Met", tone: "gray" }
};

function rv2DraftDeliverableKindLabel(kind) {
  return RV2_DRAFT_DELIVERABLE_KINDS[kind] || friendlyLabel(text(kind, "deliverable"));
}

function rv2DraftDeliverableStatusMeta(status) {
  return RV2_DRAFT_DELIVERABLE_STATUS[status] || { label: friendlyLabel(text(status, "unknown")), tone: "gray" };
}

/* Dependency references are typed by bounded canonical prefixes; anything unknown stays a
   neutral visible reference instead of being misclassified. */
function rv2DraftDependencyMeta(reference) {
  const value = text(reference, "");
  if (/^D-/.test(value)) return { label: "Deliverable", tone: "blue" };
  if (/^GOV-/.test(value)) return { label: "Governance", tone: "amber" };
  if (/^O\d+\.P\d+$/.test(value)) return { label: "Phase", tone: "gray" };
  return { label: "Reference", tone: "gray" };
}

const rv2DraftPhaseIndex = new Map();

function rv2DraftBadgeFor(map, value) {
  const meta = map[value] || { label: text(value, "unknown"), tone: "gray" };
  return operatorBadge(meta.label, meta.tone);
}

function rv2DraftUnavailable(detail) {
  const container = byId("roadmap-v2-draft");
  if (!container) return;
  container.innerHTML = `
    <div class="operator-badge-row rv2-draft-strip">
      ${operatorBadge("Roadmap v2", "blue")}
      ${operatorBadge("Draft preview", "amber")}
      ${operatorBadge("Not active", "red")}
    </div>
    ${emptyState(`The Roadmap v2 draft source could not be loaded, so only this subview is unavailable. The rest of the Project Console is unaffected and Legacy Roadmap remains available.${detail ? ` (${detail})` : ""}`)}
  `;
}

function rv2DraftStateStrip(roadmap) {
  const statusOk = roadmap.status === "draft_for_human_review";
  return `
    <div class="operator-badge-row rv2-draft-strip">
      ${operatorBadge("Roadmap v2", "blue")}
      ${operatorBadge("Draft preview", "amber")}
      ${operatorBadge("Not active", "red")}
    </div>
    ${statusOk ? "" : `<div class="readonly-banner mb-4">Status mismatch: this draft view was reviewed against draft_for_human_review but the source reports ${escapeHtml(text(roadmap.status, "missing"))}. Confirm the baseline before trusting this view.</div>`}
    <div class="queue-definition">
      <strong>Roadmap v2</strong>: draft strategic roadmap read from roadmap_v2.json. Not active - Legacy Roadmap remains the canonical view.
    </div>
  `;
}

function rv2DraftFocusCard(data, roadmap) {
  const focus = data.projectStatus?.current_focus || {};
  const activeEntries = [];
  (roadmap.objectives || []).forEach((objective) => {
    (objective.phases || []).forEach((phase) => {
      if (phase.status === "active") activeEntries.push({ objective, phase });
    });
  });
  return `
    <div class="overview-card mb-6">
      <div class="overview-card-title">Current Focus</div>
      <div class="mini-grid">
        <div><span class="mini-label">Current work item</span><span class="mini-value">${escapeHtml(text(focus.work_item, "Not available"))}</span></div>
        <div><span class="mini-label">Current stage</span><span class="mini-value">${escapeHtml(text(focus.current_stage, "Not available"))}</span></div>
        <div><span class="mini-label">Next operator action</span><span class="mini-value">${escapeHtml(text(focus.next_operator_action, "Not available"))}</span></div>
        <div><span class="mini-label">Next real project work</span><span class="mini-value">${escapeHtml(text(focus.next_real_project_work_after_this, "Not available"))}</span></div>
      </div>
      <div class="overview-section">
        <div class="overview-section-title">Active roadmap work in this draft</div>
        ${activeEntries.length ? activeEntries.map(({ objective, phase }) => `
          <button class="next-run-item" type="button" data-rv2-phase="${escapeHtml(rv2DraftPhaseKey(objective.objective_id, phase.phase_id))}">
            <div class="next-run-num">${escapeHtml(objective.objective_id)}</div>
            <div class="next-run-body">
              <div class="next-run-title">${escapeHtml(phase.title)}</div>
              <div class="next-run-reason">${escapeHtml(objective.title)}</div>
            </div>
            <div class="operator-badge-row">${rv2DraftBadgeFor(RV2_DRAFT_PHASE_BADGES, phase.status)}</div>
          </button>
        `).join("") : emptyState("No phase is marked active in the draft.")}
      </div>
    </div>
  `;
}

function rv2DraftPhaseRow(objective, phase) {
  const gateBadge = phase.human_gate_policy === "required" ? operatorBadge("Human gate", "amber") : "";
  const counts = rv2DraftPhaseCounts(phase);
  const countLine = rv2DraftCountLine([
    [counts.deliverables, "deliverable"],
    [counts.families, "candidate family", "candidate families"]
  ]);
  return `
    <button class="run-row" type="button" data-rv2-phase="${escapeHtml(rv2DraftPhaseKey(objective.objective_id, phase.phase_id))}">
      <div class="run-row-info">
        <span>
          <span class="run-row-title"><span class="rv2-draft-phase-id mono">${escapeHtml(phase.phase_id)}</span>${escapeHtml(phase.title)}</span>
          <span class="run-row-summary">${escapeHtml(phase.purpose)}</span>
          ${countLine ? `<span class="rv2-draft-count-line">${escapeHtml(countLine)}</span>` : ""}
        </span>
      </div>
      <div class="run-row-badges">
        ${rv2DraftBadgeFor(RV2_DRAFT_PHASE_BADGES, phase.status)}
        ${gateBadge}
      </div>
    </button>
  `;
}

/* One phase block = the interactive phase row plus its non-interactive deliverable rows.
   Deliverable rows are siblings of the phase <button>, never nested inside it, so no
   interactive control is nested in another. */
function rv2DraftPhaseBlock(objective, phase) {
  const deliverables = Array.isArray(phase.deliverables) ? phase.deliverables : [];
  return `
    <div class="rv2-draft-phase-block">
      ${rv2DraftPhaseRow(objective, phase)}
      ${deliverables.map((deliverable) => rv2DraftDeliverableRow(deliverable)).join("")}
    </div>
  `;
}

/* Non-interactive deliverable row: the visible Deliverable hierarchy level under its
   parent phase. Renders only deliverables present in the canonical source. */
function rv2DraftDeliverableRow(deliverable) {
  const statusMeta = rv2DraftDeliverableStatusMeta(deliverable.status);
  return `
    <div class="rv2-draft-deliverable-row">
      <div class="rv2-draft-deliverable-info">
        <span class="rv2-draft-deliverable-head">
          ${operatorBadge("Deliverable", "blue")}
          <span class="rv2-draft-deliverable-id mono">${escapeHtml(deliverable.deliverable_id)}</span>
          <span class="rv2-draft-deliverable-title">${escapeHtml(deliverable.title)}</span>
        </span>
        ${deliverable.outcome ? `<span class="rv2-draft-deliverable-outcome">${escapeHtml(deliverable.outcome)}</span>` : ""}
      </div>
      <div class="run-row-badges">
        ${operatorBadge(rv2DraftDeliverableKindLabel(deliverable.kind), "gray")}
        ${operatorBadge(statusMeta.label, statusMeta.tone)}
      </div>
    </div>
  `;
}

function rv2DraftPhaseGroups(objective) {
  const phases = objective.phases || [];
  return RV2_DRAFT_PHASE_GROUPS.map((group) => {
    const groupPhases = phases.filter((phase) => group.statuses.includes(phase.status));
    if (!groupPhases.length) return "";
    return `
      <div class="queue-group-header">${escapeHtml(group.label)}</div>
      <div class="run-list">${groupPhases.map((phase) => rv2DraftPhaseBlock(objective, phase)).join("")}</div>
    `;
  }).join("");
}

function rv2DraftObjectiveCard(objective) {
  const phases = objective.phases || [];
  const statusMeta = RV2_DRAFT_OBJECTIVE_STATUS[objective.status] || { label: text(objective.status, "unknown"), tone: "gray" };
  const counts = rv2DraftObjectiveCounts(objective);
  const countLine = rv2DraftCountLine([
    [counts.phases, "phase"],
    [counts.deliverables, "deliverable"],
    [counts.families, "candidate family", "candidate families"]
  ]);
  const groups = `<div class="rv2-draft-objective-body">${rv2DraftPhaseGroups(objective)}</div>`;
  const body = rv2DraftObjectiveExpanded(objective)
    ? groups
    : `
      <details class="rv2-draft-objective-details">
        <summary>Show ${phases.length} ${phases.length === 1 ? "phase" : "phases"} (${escapeHtml(statusMeta.label.toLowerCase())})</summary>
        ${groups}
      </details>
    `;
  return `
    <div class="objective-card">
      <div class="objective-header">
        <div>
          <h3>${escapeHtml(objective.objective_id)} - ${escapeHtml(objective.title)}</h3>
          <div class="objective-purpose">${escapeHtml(objective.purpose)}</div>
          ${objective.status_note ? `<div class="rv2-draft-status-note">${escapeHtml(objective.status_note)}</div>` : ""}
          ${countLine ? `<div class="rv2-draft-count-line">${escapeHtml(countLine)}</div>` : ""}
        </div>
        <div class="operator-badge-row">
          ${operatorBadge(statusMeta.label, statusMeta.tone)}
        </div>
      </div>
      ${body}
    </div>
  `;
}

function rv2DraftGovernance(roadmap) {
  const openDecisions = roadmap.open_human_decisions || [];
  const resolvedDecisions = roadmap.resolved_human_decisions || [];
  const vocabulary = roadmap.run_queue_v2_vocabulary || {};
  const legacy = roadmap.legacy_roadmap_v1 || {};
  const totals = rv2DraftRoadmapCounts(roadmap);
  const lineageCount = Array.isArray(roadmap.phase_lineage) ? roadmap.phase_lineage.length : 0;
  const modelCountLine = rv2DraftCountLine([
    [totals.objectives, "objective"],
    [totals.phases, "normalized phase"],
    [totals.deliverables, "deliverable"],
    [totals.families, "candidate run family", "candidate run families"]
  ]);
  const groups = (vocabulary.visible_groups || []).map((group) =>
    `<li><strong>${escapeHtml(group.label)}</strong>: ${escapeHtml(group.definition)}</li>`).join("");
  const sequence = (roadmap.near_term_sequence || []).map((step) =>
    `<li>${escapeHtml(step.title)} <span class="source-ref">(${escapeHtml(step.objective_id)} / ${escapeHtml(step.phase_id)})</span></li>`).join("");
  return `
    <div class="overview-card">
      <div class="overview-card-title">Governance &amp; Technical Details</div>
      <div class="rv2-draft-gov-stack">
        <details class="technical-disclosure">
          <summary>Draft status</summary>
          ${row("Status", text(roadmap.status, "missing"))}
          ${row("Roadmap ID", text(roadmap.roadmap_id, ""), "mono")}
          ${row("Schema", text(roadmap.schema_version, ""), "mono")}
          ${row("Generated", text(roadmap.generated_at, ""))}
          ${row("Created from", text(roadmap.created_from && roadmap.created_from.run_id, ""), "mono")}
        </details>
        <details class="technical-disclosure">
          <summary>Human decisions (${openDecisions.length} open / ${resolvedDecisions.length} resolved)</summary>
          <div class="group-label">Open decisions</div>
          ${openDecisions.map((decision) => `
            <div class="status-line">
              ${operatorBadge("Open", "amber")}
              <div>
                <div class="status-line-title">${escapeHtml(decision.question)}</div>
                <div class="activity-context">Required before: ${escapeHtml(decision.required_before)} <span class="mono">(${escapeHtml(decision.decision_id)})</span></div>
              </div>
            </div>
          `).join("") || emptyState("None recorded.")}
          <div class="group-label" style="margin-top:12px;">Resolved decisions</div>
          ${resolvedDecisions.map((decision) => `
            <div class="status-line">
              ${operatorBadge("Resolved", "gray")}
              <div>
                <div class="status-line-title">${escapeHtml(decision.question)}</div>
                ${decision.resolution ? `<div class="activity-desc">${escapeHtml(decision.resolution)}</div>` : ""}
                <div class="activity-context mono">${escapeHtml(decision.decision_id)}${decision.resolved_by ? ` / resolved by ${escapeHtml(decision.resolved_by)}` : ""}</div>
              </div>
            </div>
          `).join("") || emptyState("None recorded.")}
          <p class="section-copy">Decision state above is read directly from the canonical draft
          source. Standing boundaries not granted by this view or by any validation, AI review,
          commit, or push: visual acceptance, default activation, Legacy Roadmap or Queue
          migration, certification.</p>
        </details>
        <details class="technical-disclosure">
          <summary>Model notes</summary>
          <p class="section-copy">Canonical hierarchy: Objective, Phase, Deliverable, Candidate Run
          Family, Run. This draft view renders ${escapeHtml(modelCountLine)} - all counts derived
          from the loaded canonical source. Deliverables appear under their parent phases and in
          each phase's drawer; phases without deliverables or families are accepted strategic
          stages rendered with their purpose line only (empty-phase policy), never with count
          badges implying work.</p>
          <p class="section-copy">Candidate run families are planning placeholders derived from the
          accepted model. They are not instantiated executable runs, carry no run contracts, and
          never enter any queue from this view. They appear as counts on phase rows and in full
          inside each phase's drawer.</p>
          <p class="section-copy">The ${escapeHtml(lineageCount)} phase-lineage records mapping the
          earlier base draft remain embedded in the canonical source as audit metadata and are
          intentionally not rendered in this view.</p>
          <p class="section-copy">Horizon bands are derived from status and shown per phase in its
          drawer technical details: H1 executable (active), H2 planned, H3 strategic (future),
          H4 parked (parked/deferred).</p>
          <p class="section-copy">Run Queue v2 is NOT implemented. Draft vocabulary:</p>
          <ul class="detail-list">${groups}</ul>
          <p class="section-copy" style="margin-top:8px;">Draft near-term sequence (strategic
          context only - not an execution queue):</p>
          <ol class="detail-list">${sequence}</ol>
        </details>
        <details class="technical-disclosure">
          <summary>Legacy Roadmap v1 preservation</summary>
          ${row("Relationship", text(legacy.relationship, ""), "mono")}
          ${row("Preserved", text(legacy.preserved, ""))}
          ${row("Not deleted", text(legacy.not_deleted, ""))}
          ${row("Not rewritten", text(legacy.not_rewritten, ""))}
          ${row("Consumed by v2", legacy.not_consumed_by_roadmap_v2_yet ? "Not yet" : "UNKNOWN_REQUIRES_REPO_CONFIRMATION")}
          <p class="section-copy">The Legacy Roadmap subview remains the canonical roadmap view and
          is unchanged by this draft preview.</p>
        </details>
        <details class="technical-disclosure">
          <summary>Restrictions</summary>
          <div class="no-claims-compact">
            ${operatorBadge("Roadmap v2 not activated", "red")}
            ${operatorBadge("Legacy v1 not migrated", "red")}
            ${operatorBadge("Run Queue v2 not implemented", "red")}
            ${operatorBadge("Web not certified", "red")}
            ${operatorBadge("Slide not certified", "red")}
            ${operatorBadge("rule not certified", "red")}
            ${operatorBadge("Smart Formula RULE_ONLY", "amber")}
            ${operatorBadge("Read-only / not AIW-managed", "blue")}
          </div>
          <p class="section-copy" style="margin-top:10px;">Commit, push, validation, and AI review
          do not equal human approval.</p>
        </details>
        <details class="technical-disclosure">
          <summary>About this draft view</summary>
          ${row("Reads", "an optional roadmap_v2 source (fail-soft)", "mono")}
          ${row("Writes", "Nothing")}
          ${row("Default subview", "Run Queue (unchanged); this draft renders only on explicit selection")}
        </details>
      </div>
    </div>
  `;
}

function rv2DraftIndexPhases(roadmap) {
  rv2DraftPhaseIndex.clear();
  (roadmap.objectives || []).forEach((objective) => {
    (objective.phases || []).forEach((phase) => {
      rv2DraftPhaseIndex.set(rv2DraftPhaseKey(objective.objective_id, phase.phase_id), { objective, phase });
    });
  });
}

function rv2DraftOpenPhaseDrawer(key) {
  const entry = rv2DraftPhaseIndex.get(key);
  if (!entry) return;
  const { objective, phase } = entry;
  const gate = RV2_DRAFT_GATES[phase.human_gate_policy] || { label: text(phase.human_gate_policy, "unknown"), tone: "gray" };
  const families = Array.isArray(phase.candidate_run_families) ? phase.candidate_run_families : [];
  const deliverables = Array.isArray(phase.deliverables) ? phase.deliverables : [];
  byId("drawer-title").textContent = phase.title;
  byId("drawer-id").textContent = `${objective.objective_id} - ${objective.title} / Roadmap v2 draft`;
  byId("drawer-body").innerHTML = `
    <div class="drawer-section">
      <div class="drawer-section-title">Stage</div>
      <div class="operator-badge-row drawer-primary-badges">
        ${rv2DraftBadgeFor(RV2_DRAFT_PHASE_BADGES, phase.status)}
        ${operatorBadge("Draft preview", "amber")}
        ${operatorBadge(gate.label, gate.tone)}
      </div>
    </div>
    <div class="drawer-section">
      <div class="drawer-section-title">What this phase is</div>
      <p>${escapeHtml(phase.purpose)}</p>
    </div>
    <div class="drawer-section">
      <div class="drawer-section-title">Dependencies</div>
      ${(phase.dependencies || []).length ? phase.dependencies.map((item) => {
        const dependencyMeta = rv2DraftDependencyMeta(item);
        return `
          <div class="status-line">
            ${operatorBadge(dependencyMeta.label, dependencyMeta.tone)}
            <div><div class="status-line-title mono">${escapeHtml(item)}</div></div>
          </div>
        `;
      }).join("") : emptyState("None recorded.")}
    </div>
    ${deliverables.length ? `
      <div class="drawer-section">
        <div class="drawer-section-title">Deliverables (${deliverables.length})</div>
        ${deliverables.map((deliverable) => {
          const deliverableStatus = rv2DraftDeliverableStatusMeta(deliverable.status);
          return `
          <div class="status-line">
            ${operatorBadge("Deliverable", "blue")}
            <div>
              <div class="status-line-title">${escapeHtml(deliverable.title || deliverable.deliverable_id)}</div>
              <div class="activity-context mono">${escapeHtml(deliverable.deliverable_id)}</div>
              ${deliverable.outcome ? `<div class="activity-desc">${escapeHtml(deliverable.outcome)}</div>` : ""}
              <div class="operator-badge-row">
                ${operatorBadge(rv2DraftDeliverableKindLabel(deliverable.kind), "gray")}
                ${operatorBadge(deliverableStatus.label, deliverableStatus.tone)}
              </div>
              ${deliverable.status_note ? `<div class="activity-context">${escapeHtml(deliverable.status_note)}</div>` : ""}
              ${deliverable.acceptance_closeout || (deliverable.source_evidence || []).length ? `
                <details class="technical-disclosure">
                  <summary>Acceptance and evidence</summary>
                  ${deliverable.acceptance_closeout ? `<p class="section-copy">${escapeHtml(deliverable.acceptance_closeout)}</p>` : ""}
                  ${(deliverable.source_evidence || []).length ? `<ul class="source-list">${deliverable.source_evidence.map((item) => `<li class="source-ref">${escapeHtml(item)}</li>`).join("")}</ul>` : ""}
                </details>
              ` : ""}
            </div>
          </div>
        `;
        }).join("")}
      </div>
    ` : ""}
    <div class="drawer-section">
      <div class="drawer-section-title">Candidate run families (${families.length})</div>
      ${families.length ? `
        <p class="section-copy rv2-draft-family-note">Candidate planning families are not instantiated executable runs: no run contract exists and nothing enters any queue from this view.</p>
        ${families.map((family) => `
          <div class="status-line">
            ${operatorBadge("Candidate family", "gray")}
            <div>
              <div class="status-line-title">${escapeHtml(family.title || family)}</div>
              ${family.summary ? `<div class="activity-desc">${escapeHtml(family.summary)}</div>` : ""}
              ${family.family_id ? `<div class="activity-context mono">${escapeHtml(family.family_id)}</div>` : ""}
              ${family.selection_state === "selected_for_scoping" ? `<div class="operator-badge-row">${operatorBadge("Selected for scoping", "amber")}</div>` : ""}
            </div>
          </div>
        `).join("")}
      ` : emptyState("None recorded.")}
    </div>
    <div class="drawer-section">
      <details class="technical-disclosure">
        <summary>Technical details</summary>
        ${row("phase_id", text(phase.phase_id, ""), "mono")}
        ${row("status", text(phase.status, ""), "mono")}
        ${row("horizon (derived)", RV2_DRAFT_HORIZONS[phase.status] || "unknown")}
        ${row("human_gate_policy", text(phase.human_gate_policy, ""), "mono")}
        ${row("objective_id", text(objective.objective_id, ""), "mono")}
        <div class="group-label" style="margin-top:10px;">Phase non-goals</div>
        ${(phase.non_goals || []).length ? `<ul class="detail-list">${phase.non_goals.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : emptyState("None recorded.")}
        <div class="group-label" style="margin-top:10px;">Legacy sources hint</div>
        ${(phase.legacy_sources_hint || []).length ? `<ul class="source-list">${phase.legacy_sources_hint.map((item) => `<li class="source-ref">${escapeHtml(item)}</li>`).join("")}</ul>` : emptyState("None recorded.")}
      </details>
    </div>
  `;
  byId("drawer-overlay").classList.add("open");
  byId("run-drawer").classList.add("open");
  byId("run-drawer").setAttribute("aria-hidden", "false");
}

function rv2DraftAttachHandlers() {
  document.querySelectorAll("[data-rv2-phase]").forEach((button) => {
    button.addEventListener("click", () => rv2DraftOpenPhaseDrawer(button.dataset.rv2Phase));
  });
}

function renderRoadmapV2Draft(data) {
  const container = byId("roadmap-v2-draft");
  if (!container) return;
  const roadmap = data.roadmapV2;
  if (!roadmap || !Array.isArray(roadmap.objectives) || !roadmap.objectives.length) {
    rv2DraftUnavailable("roadmap_v2.json unavailable or invalid");
    return;
  }
  rv2DraftIndexPhases(roadmap);
  const objectives = [...roadmap.objectives].sort((a, b) => (a.order || 0) - (b.order || 0));
  const totals = rv2DraftRoadmapCounts(roadmap);
  const summaryLine = rv2DraftCountLine([
    [totals.objectives, "objective"],
    [totals.phases, "normalized phase"],
    [totals.deliverables, "deliverable"],
    [totals.families, "candidate run family", "candidate run families"]
  ]);
  container.innerHTML = [
    rv2DraftStateStrip(roadmap),
    rv2DraftFocusCard(data, roadmap),
    `<div class="flex justify-between items-start mb-4 rv2-draft-section-head">
      <h2>Objectives</h2>
      <p class="section-copy">${escapeHtml(summaryLine)} - counts derived from the canonical draft source at load time.</p>
    </div>`,
    `<div class="roadmap-tree mb-6">${objectives.map(rv2DraftObjectiveCard).join("")}</div>`,
    rv2DraftGovernance(roadmap)
  ].join("");
  rv2DraftAttachHandlers();
}

function renderHistory(data) {
  const items = historyItems(data);
  byId("history-list").innerHTML = items.length ? items.map((item) => {
    const type = text(item.type, "").toLowerCase();
    const dotClass = type.includes("commit") || type.includes("git") ? "commit" : type.includes("qa") ? "qa" : type.includes("review") ? "scan" : "event";
    return `
      <div class="history-entry">
        <div class="history-dot ${dotClass}"></div>
        <div class="history-body">
          <div class="history-head">
            ${badge(item.type || "EVENT", toneForStatus(item.type))}
            <span class="history-title">${escapeHtml(item.title || item.summary)}</span>
          </div>
          <div class="history-summary">${escapeHtml(item.summary || "")}</div>
          <div class="history-meta">
            <span class="history-meta-item">${escapeHtml(item.date_or_unknown || item.id || "")}</span>
            <span class="history-meta-item">Local status backed by sources</span>
          </div>
          ${evidenceList(item.source_refs || [])}
        </div>
      </div>
    `;
  }).join("") : emptyState("No source-backed history items are available.");
}

// Docs view body rendering: the Docs view is a
// read-only projection that renders the real repository-local document body for the selected
// docs_index entry, not a metadata-only card. docs_index stays navigation/freshness metadata;
// bodies are fetched from the registered repo-relative path only, escaped first, and rendered
// with a conservative Markdown-lite / preformatted renderer. Rendering a document here is a
// reference only: it is not certification, acceptance, Human QA, closeout, or reconciliation,
// and it does not change any document's status.
//
// Docs tree navigation and inline metadata:
// the left navigation groups docs_index entries into collapsible categories derived from the
// metadata each entry already carries (ia_bucket -> category -> related_area -> source_role ->
// uncategorized), so the view stays navigable as the documentation corpus grows and no
// docs_index migration is required. Document metadata renders inside the reader as compact
// chips plus a collapsible section; the fixed right metadata rail is retired. Grouping is
// display-only navigation: it assigns no new document status and certifies nothing.
const docBodyCache = new Map();
let docsActivePath = null;

// Curated Docs visibility. Three modes: "newera" shows only the documents a run has marked with
// operator_review_status; "primary" (Primary KB) shows the default_visible / primary-tier subset;
// "all" shows the full registry. docs_index stays the broad documentation/evidence registry;
// nav_tier / default_visible / operator_review_status are additive metadata and this filtering is
// display-only. Switching visibility mode assigns no document status and certifies, accepts,
// reconciles, or Human-QA-passes nothing. All registered docs stay reachable.
//
// THE OPENING MODE IS DECIDED BY THE DATA (O4.P13), per project, at first paint of Docs:
// if the active project's index carries `operator_review_status` on any entry, Docs opens on
// "newera" — the curated view that field exists to drive; if no entry carries it, Docs opens on
// "all". Presence of the FIELD, never a project name: the same shape as D-049 — the project
// declares, the consumer obeys.
//
// What this replaces, and why the replacement is not a revert: a global "all" default was chosen
// here because THIS project's index has no `operator_review_status` and opening on "newera" left
// its Docs tab empty. That reasoning was right about this project and wrong as a rule — applied
// globally it also flattened the curation of a project that DOES carry the field (140 registered
// documents where the operator had selected 38), turning a curated shelf into a firehose.
//
// What has NOT changed: nothing writes `operator_review_status`, anywhere. It means "a run
// recorded an operator review", and no run recorded one in this project — inventing it to fill a
// view would put a false statement into the data. The field stays absent here; the MODE moves.
//
// Reachability, measured: the mode control (New era / Primary KB / All registered) is not in
// index.html — its listener is still wired, but no element carries `data-docs-mode`. So whichever
// mode a project opens on is the only one its operator can reach, which is exactly why the
// opening mode has to be derived from that project's own data instead of fixed here.
let docsVisibilityMode = "all"; // "all" | "primary" (curated KB) | "newera" — see docsResolveOpeningMode
// Whether the opening mode has been derived for the ACTIVE project yet. Derived once per project
// load, so a later re-render (a roadmap edit, a History refresh) never overrides a mode the
// operator switched to by hand. Reset with the rest of the per-project state.
let docsOpeningModeResolved = false;
let docsAllEntries = [];
const DOCS_NAV_TIERS = ["primary", "secondary", "advanced", "evidence", "history", "proposal"];
// DOCS_NAV_TIER_META (the tier -> label/tone table) and `docNavTierMeta` were removed together
// with the per-row tier tag they existed to paint (see the note above `renderNavItem`). The tier
// itself is NOT gone: `deriveDocNavTier` still classifies every entry and `isDefaultVisibleDoc`
// still reads it, so the Primary KB mode keeps working. Only the badge is retired.

// DOCS GROUPING — DERIVED FROM THE REPOSITORY'S OWN FOLDER HIERARCHY.
//
// What was here, and why it is gone. Grouping used to read each entry's own grouping fields
// (`ia_bucket` -> `category` -> `related_area` -> `source_role` -> uncategorized), and a SECOND,
// parallel grouping existed for the "newera" mode built on an explicit path -> category MAP. That
// map was forty-odd exact routes of the project this console was ported from; a port cannot carry
// another repository's routes, so it travelled empty — and with it empty, every reviewed document
// of every project fell into one UNCATEGORIZED drawer. Two grouping mechanisms, one of them a
// table of one project's paths, was the last baked identity left in this file.
//
// The replacement is the repository itself. WHERE a document lives is where its author already
// classified it: the folder is visible without opening this console, it costs no per-project
// configuration, it is the same statement for every project, and it cannot rot — move the file and
// its group moves with it. This is the rule §2 already applies to nav tiers, applied to grouping.
//
// THE PATH ALWAYS WINS. A curated index may still carry `ia_bucket` / `category` / `related_area`
// / `source_role`; the navigation ignores them. One rule for every project and for every
// visibility mode, so what the tree will look like is predictable from the repo alone and no
// reader has to know which project it is looking at. The cost is real and accepted: a project that
// curated group NAMES sees its folder names instead. Nothing is written to any index — those
// fields stay in the data untouched, they are simply not what the navigation is built from.
//
// Written here, in the CONSUMER, not in the emitter: grouping is a property of the VIEW. The
// emitter republishes a project's curated index verbatim (CANONICAL OUTSIDE, DERIVED INSIDE), and
// a project whose `.project/` was emitted by an older run must group the same way as one emitted
// today — which is only true if the rule lives on the reading side.

// The document's directory chain, as segments. A file at the repository root yields [].
function docDirSegments(doc) {
  const segments = text(doc?.path, "").trim().replace(/\\/g, "/").split("/")
    .filter((segment) => segment && segment !== ".");
  return segments.slice(0, -1);
}

// THE `archive/` RULE. A document that lives under a folder named `archive` is NOT rendered in
// Docs — in any view, in any visibility mode. Generic and by path: it names no project and no
// other folder, so any repository that archives by moving a file into `archive/` gets the same
// behaviour with nothing to configure.
//
// Only DIRECTORY segments are tested, never the filename: a document called
// `DOCS_RETENTION_ARCHIVE_POLICY.md` is a document ABOUT archiving, not an archived document.
//
// Decided HERE (consumer) rather than in the emitter, for two reasons. (1) The emitter transports
// a curated index verbatim; dropping entries from `docs[]` would make the emitted file disagree
// with the curation it claims to republish, and `unresolved` — the one declared reason an entry
// may be omitted — means "the file is not on disk", which is a different and true statement. An
// archived file resolves perfectly. (2) A `.project/` folder emitted before this rule existed
// still hides its archive under this console, with no re-emission: the rule reaches every project
// the console renders, not only the ones re-emitted after it.
const DOCS_ARCHIVE_SEGMENT = "archive";

function isArchivedDocPath(path) {
  return docDirSegments({ path }).some((segment) => segment.toLowerCase() === DOCS_ARCHIVE_SEGMENT);
}

// The leading segments EVERY rendered document shares carry no information that can separate one
// group from another — they are the same for all of them — so grouping starts at the first segment
// where the paths actually DIFFER. No folder name is written down anywhere; the shared prefix is
// measured from the set being rendered:
//   every document under one documentation folder -> that folder is shared -> the groups are the
//     folders inside it (`architecture`, `decisions`, `components/web`, ...)
//   documents spread over several top-level folders and the repo root -> nothing is shared -> those
//     top-level folders ARE the groups.
// At least one segment is always left to group by, so a corpus of one document still names its
// folder instead of collapsing into the no-folder bucket.
function commonDirPrefixLength(chains) {
  if (!chains.length) return 0;
  const shortest = Math.min(...chains.map((chain) => chain.length));
  let shared = 0;
  while (shared < shortest && chains.every((chain) => chain[shared] === chains[0][shared])) shared += 1;
  return Math.max(0, Math.min(shared, shortest - 1));
}

// Documents that sit directly at the level grouping starts from have no folder to be grouped by.
// They render together, last, under this label — the analogue of the old Uncategorized tail, but
// reached by a fact about the path rather than by absent metadata.
const DOCS_ROOT_GROUP_LABEL = "Root";

// RETENTION-CLASS GROUPING — RETIRED HERE (not disabled: removed).
//
// The source console offered a second Docs grouping ("By category" / "By retention class") plus a
// per-row retention_class badge. Both were invisible there, because they only render outside the
// "newera" mode and "newera" is that console's opening mode. This port opened them for the
// projects whose index carries no operator_review_status (see the opening-mode note above).
//
// They are removed rather than re-hidden because `retention_class` is metadata of the ORIGIN
// project's own retention policy (its D2/D3 classes). This project's docs_index does not carry the
// field and its emitter derives nothing that could fill it, so the toggle grouped 100% of the
// corpus under a single "unclassified" heading and every row wore an UNCLASSIFIED badge: a control
// with no data source behind it, and a badge that says only "this project has no such policy".
//
// Same criterion by which the port emptied the two baked grouping tables — the path -> category
// map and the bucket order/label lists, both since REMOVED by the path rule above: an identity
// that could only ever be true for one project does not travel. It is not an amputation of
// function — there is no function to amputate without the data.
//
// Removed with it (zero remaining references, checked before deleting): `docsGroupMode`,
// `DOCS_RETENTION_UNCLASSIFIED`, `DOCS_RETENTION_ORDER`, `docRetentionClass`, `docRetentionTone`,
// `docRetentionTag`, `buildDocsRetentionTree`, `setDocsGroupMode`, and the `.docs-ret-*` CSS rules.
// KEPT, because they are still referenced: `.docs-mode-toggle` / `.docs-mode-btn*` — the retired
// New era / Primary KB / All registered control still has its live listener below
// (`.docs-mode-btn[data-docs-mode]`), so its styles are not orphaned.
// Nothing was written to docs_index, and no document field was invented to replace what was retired.

// The group chain of a document under the CURRENT rendered set: its folder chain with the shared
// prefix removed. [] means "directly at the grouping root" (the Root group).
function docGroupChain(doc, prefixLength) {
  return docDirSegments(doc).slice(prefixLength);
}

// The group path of a document as one readable label ("Components / Web"), for the reader's own
// Category field. It calls the same two functions the navigation calls, over the same rendered
// set, so the tree and the reader can never disagree about where a document belongs.
function docGroupLabel(doc) {
  const entries = docsEntriesForMode();
  const chain = docGroupChain(doc, commonDirPrefixLength(entries.map(({ doc: entry }) => docDirSegments(entry))));
  return chain.length ? chain.map(friendlyLabel).join(" / ") : DOCS_ROOT_GROUP_LABEL;
}

function deriveDocNavTier(doc) {
  // Curated navigation tier for the Docs view. Prefers the additive docs_index nav_tier metadata
  // so the curated default is transparent and inspectable; falls back to a safe classification
  // derived from the metadata each entry already carries (source_role / canonicality / ia_bucket
  // / archive_status) so entries without nav_tier still classify and future docs degrade safely.
  // Navigation visibility only: it assigns no document status and certifies nothing.
  const explicit = text(doc?.nav_tier, "").trim().toLowerCase();
  if (DOCS_NAV_TIERS.includes(explicit)) return explicit;
  const role = text(doc?.source_role, "").toLowerCase();
  const canon = text(doc?.canonicality, "").toLowerCase();
  const bucket = text(doc?.ia_bucket, "").toLowerCase();
  const archive = text(doc?.archive_status, "").toLowerCase();
  if (role.includes("proposal") || canon.includes("proposal")) return "proposal";
  if (bucket === "history" || archive.includes("historical") || archive.includes("superseded") || canon.includes("historical") || canon.includes("superseded")) return "history";
  if (bucket === "run_evidence" || role === "run_evidence" || role.includes("audit") || role.includes("evidence") || canon.includes("frozen") || canon.includes("evidence")) return "evidence";
  return "secondary";
}

function isDefaultVisibleDoc(doc) {
  // A doc belongs to the curated default (Primary KB) view when its additive metadata marks it
  // default_visible, or (fallback) when its derived nav tier is primary. Advanced / evidence /
  // history / proposal / secondary docs stay available, just not primary by default.
  if (doc?.default_visible === true) return true;
  if (doc?.default_visible === false) return false;
  return deriveDocNavTier(doc) === "primary";
}

function docsRenderableEntries() {
  // Every entry the Docs view may render, in registry order, each keeping its index into the FULL
  // registry so navigation stays a filtered view of it and never a re-indexed copy. The `archive/`
  // rule is applied HERE, once, above every visibility mode: an archived document is not "hidden
  // in this view", it is not part of what Docs renders at all.
  return docsAllEntries
    .map((doc, index) => ({ doc, index }))
    .filter(({ doc }) => !isArchivedDocPath(doc?.path));
}

function docsEntriesForMode() {
  // "newera" shows only the docs a run marked with operator_review_status; "all" shows every
  // registered doc; "primary" shows only the curated default-visible set. Which one a project
  // OPENS on is derived from its own index (docsResolveOpeningMode).
  const entries = docsRenderableEntries();
  if (docsVisibilityMode === "newera") return entries.filter(({ doc }) => hasOperatorReviewStatus(doc));
  if (docsVisibilityMode === "all") return entries;
  return entries.filter(({ doc }) => isDefaultVisibleDoc(doc));
}

function buildDocsNavTree(entries) {
  // Groups { doc, index } pairs into the nested category tree used by the Docs navigation, from
  // each entry's own repo path and nothing else. A folder that contains subfolders produces a
  // group WITH SUBGROUPS, to whatever depth the repository actually has; a folder that holds
  // documents directly produces a flat group. Entry order inside a group preserves docs_index
  // order — the project's own curation, when it curated one. Group order is alphabetical by label
  // at every level, with the no-folder Root group last. Empty groups never render, because a group
  // only exists if a rendered document is inside it.
  const chains = entries.map(({ doc }) => docDirSegments(doc));
  const prefixLength = commonDirPrefixLength(chains);
  const makeNode = (key, label) => ({ key, label, docs: [], subgroups: [], byKey: new Map() });
  const root = makeNode("", DOCS_ROOT_GROUP_LABEL);

  entries.forEach((entry, position) => {
    let node = root;
    for (const segment of chains[position].slice(prefixLength)) {
      if (!node.byKey.has(segment)) {
        const child = makeNode(segment, friendlyLabel(segment));
        node.byKey.set(segment, child);
        node.subgroups.push(child);
      }
      node = node.byKey.get(segment);
    }
    node.docs.push(entry);
  });

  // `count` is the group's OWN documents plus every descendant's, so a parent's number is the
  // number of documents reachable under it — what a reader counting the tree would arrive at.
  const finish = (node) => {
    delete node.byKey;
    node.subgroups = node.subgroups.sort((left, right) => left.label.localeCompare(right.label)).map(finish);
    node.count = node.docs.length + node.subgroups.reduce((total, sub) => total + sub.count, 0);
    return node;
  };
  finish(root);

  // The root node is not a group: its subgroups ARE the top level. Documents sitting directly on
  // it become the Root group, rendered last.
  return root.docs.length
    ? [...root.subgroups, { key: "", label: DOCS_ROOT_GROUP_LABEL, docs: root.docs, subgroups: [], count: root.docs.length }]
    : root.subgroups;
}

function renderDocs(data) {
  const docs = data.docsIndex?.docs || [];
  docsAllEntries = docs;
  const nav = byId("docs-nav-list");
  if (!nav) return;
  if (!docs.length) {
    // §20 — announce the absence IN THIS VIEW, naming the file. An index that failed to load
    // and an index that lists no documents are different truths; say the right one.
    const absence = data.docsIndex == null
      ? `<strong>Docs index unavailable.</strong><span>${escapeHtml(displaySourcePath(PATHS.docsIndex))} could not be loaded. The rest of the Project Console is unaffected.</span>`
      : `<strong>No documents indexed.</strong><span>${escapeHtml(displaySourcePath(PATHS.docsIndex))} loaded but lists no documents.</span>`;
    nav.innerHTML = `<div class="docs-nav-title">Documentation</div><div class="readonly-banner docs-absence">${absence}</div>`;
    byId("docs-reader").innerHTML = "";
    return;
  }
  docsResolveOpeningMode(docs);
  // Curated default: open on the first document of the current view, not the first registered
  // entry. renderDocsNav paints the filtered category/tree navigation.
  const visible = docsEntriesForMode();
  // The fallback, for a view that filters everything out, is the first RENDERABLE entry — never
  // `docs[0]`, which may be archived. An archived document is not opened by a fallback either.
  const first = (visible[0] || docsRenderableEntries()[0] || null)?.doc || null;
  // Select first so docsActivePath is set, then paint the nav so the opened doc highlights.
  if (first) renderSelectedDoc(first);
  else byId("docs-reader").innerHTML = "";
  renderDocsNav();
}

// Derive the opening mode from the ACTIVE project's index — once per project load. The question
// asked is the presence of the FIELD in the data, and the answer is read straight off the index
// with the same predicate the "newera" filter itself uses, so the mode and the filter cannot
// disagree: a project opens on "newera" exactly when that mode has something to show.
// READ-ONLY on the index. This function decides what to DISPLAY; it writes nothing, and no
// project ever gains `operator_review_status` by being looked at.
function docsResolveOpeningMode(docs) {
  if (docsOpeningModeResolved) return;
  docsOpeningModeResolved = true;
  // Asked of the RENDERABLE registry only: an archived entry is not something any mode can show,
  // so a project whose only reviewed documents are archived must not open on an empty "newera".
  docsVisibilityMode = (docs || [])
    .filter((doc) => !isArchivedDocPath(doc?.path))
    .some(hasOperatorReviewStatus) ? "newera" : "all";
}

function hasOperatorReviewStatus(doc) {
  // True only when a run has recorded an operator_review_status on this docs_index entry.
  // The console never writes this field; it only reads what a run already recorded.
  return doc != null
    && Object.prototype.hasOwnProperty.call(doc, "operator_review_status")
    && text(doc.operator_review_status, "").trim() !== "";
}

// operatorReviewStatusMeta (the pending/approved/needs_changes -> badge-tone mapping) was removed by
// an earlier run together with the only place that rendered
// the review-status badge (renderNavItem, new-era Docs list). The operator_review_status data itself is
// unchanged in docs_index and still read by hasOperatorReviewStatus for the new-era document count.

function renderDocsNav() {
  // Paints the visibility controls and the grouped category/tree navigation for the current mode.
  // Called on load and on every visibility-mode switch; it never touches the reader/body, so the
  // active document and its rendered body survive a mode switch. Group open/collapsed and the
  // selected visibility mode are local UI state only and are never persisted anywhere.
  const nav = byId("docs-nav-list");
  if (!nav) return;
  const isNewEra = docsVisibilityMode === "newera";
  const entries = docsEntriesForMode();
  // Counted over the RENDERABLE registry, not the raw one: a count that includes documents no
  // mode can reach is a number the operator cannot verify against the tree in front of them.
  const renderable = docsRenderableEntries().map(({ doc }) => doc);
  const primaryCount = renderable.filter(isDefaultVisibleDoc).length;
  const totalCount = renderable.length;
  const newEraCount = renderable.filter(hasOperatorReviewStatus).length;
  const activeDoc = docsAllEntries.find((doc) => text(doc.path, "") === docsActivePath) || null;
  const activeVisible = entries.some(({ doc }) => text(doc.path, "") === docsActivePath);
  // Declutter: the left panel keeps
  // only a short one-line count instead of the former explanatory paragraph. Mode toggles and Collapse
  // all are kept elsewhere; the new-era workspace explainer note is removed.
  // Display only: the one-line document count is no
  // longer rendered (its docs-nav-summary div was removed). `summary` stays computed but
  // intentionally unused so the existing count variables remain live and no cascading refactor is needed;
  // it assigns no document status and certifies nothing.
  const summary = isNewEra
    ? `<strong>${escapeHtml(newEraCount)}</strong> document${newEraCount === 1 ? "" : "s"}`
    : (docsVisibilityMode === "all"
      ? `<strong>${escapeHtml(totalCount)}</strong> documents`
      : `<strong>${escapeHtml(primaryCount)}</strong> of <strong>${escapeHtml(totalCount)}</strong>`);
  const modeNote = (activeDoc && !activeVisible)
    ? `<div class="docs-nav-mode-note docs-nav-mode-note-active">Currently viewing &ldquo;${escapeHtml(activeDoc.title || activeDoc.path)}&rdquo;, which is outside this view. Switch to All registered to see it in the tree.</div>`
    : (!isNewEra && docsVisibilityMode === "primary"
      ? `<div class="docs-nav-mode-note">Advanced, evidence, history and proposal documents stay available under All registered.</div>`
      : "");
  // ONE TREE, EVERY MODE. The Blueprint tree that used to be built for "newera" only is gone with
  // the path -> category map it was built from; the mode now decides WHICH documents are shown and
  // the path decides where each one sits, so the shape of the navigation no longer depends on
  // which mode a project happens to open on.
  const tree = buildDocsNavTree(entries);
  const renderNavItem = ({ doc, index }) => {
    // CLEAN TITLES, in every mode. The row carried two trailing badges in the source console — the
    // retention_class tag (retired above: no data source in this project) and the nav-tier tag. The
    // tier tag goes with it: it is a NAVIGATION VISIBILITY hint, and it only ever rendered in the
    // mode this port opens on, so here it decorated every non-primary row (18 of 28 at the time of
    // writing) with a word about the tier the group headings already express. The tier is still
    // derived and still drives the Primary KB mode; it just stopped being painted on every row.
    const active = text(doc.path, "") === docsActivePath ? "active" : "";
    const label = `<span class="docs-nav-item-label">${escapeHtml(doc.title || doc.path)}</span>`;
    return `<button class="docs-nav-item ${active}" type="button" data-doc-index="${index}">${label}</button>`;
  };
  // A group renders its OWN documents first, then its subgroups — the reading order of the folder
  // it mirrors. Recursive, because the repository's folder hierarchy has no fixed depth: the
  // former Web/Slides special case was one hand-written level for one project's `components/`
  // folder, and it is replaced by this, which reaches `context/aiw-console/records/` too.
  // `--docs-nav-depth` carries the nesting level to the stylesheet, so indentation is computed
  // rather than enumerated per level.
  const renderNavGroup = (group, depth) => `
      <details class="docs-nav-group${depth ? " docs-nav-subgroup" : ""}" style="--docs-nav-depth:${depth}" open>
        <summary class="docs-nav-group-header">
          <span class="docs-nav-group-label">${escapeHtml(group.label)}</span>
          <span class="docs-nav-group-count">(${escapeHtml(group.count)})</span>
        </summary>
        ${group.docs.length ? `<div class="docs-nav-group-items">${group.docs.map(renderNavItem).join("")}</div>` : ""}
        ${group.subgroups.map((sub) => renderNavGroup(sub, depth + 1)).join("")}
      </details>
    `;
  const treeHtml = tree.length
    ? tree.map((group) => renderNavGroup(group, 0)).join("")
    : emptyState("No documents match this view.");
  // Docs visibility toggle removed upstream (display only):
  // the Docs tab now always renders the new-era category-grouped view, so the former New era / Primary KB /
  // All registered control is no longer surfaced and the view shows with no name label. The visibility
  // modes stay reachable in code (docsEntriesForMode / setDocsVisibilityMode) but are unused UI here; the
  // retired control markup carried data-docs-mode="primary" and data-docs-mode="all", retained in this
  // comment only so the renderDocsNav navigation source contract stays intact. No document data changes.
  nav.innerHTML = `
    <div class="docs-nav-controls">
      <div class="docs-nav-head flex items-center justify-between" style="gap:12px; margin-bottom:10px;">
        <div class="docs-nav-title" style="padding:0;">Documentation</div>
        ${tree.length ? `<button type="button" class="docs-nav-collapse-toggle">Collapse all</button>` : ""}
      </div>
      ${modeNote}
    </div>
    <div id="docs-nav-tree" class="docs-nav-tree">${treeHtml}</div>
  `;
  nav.querySelectorAll(".docs-mode-btn[data-docs-mode]").forEach((button) => {
    button.addEventListener("click", () => setDocsVisibilityMode(button.dataset.docsMode));
  });
  // Collapse/Expand all acts only on the category groups currently rendered inside
  // the docs nav tree. Local session-only UI state: nothing is persisted, so a nav re-render
  // (visibility switch) restores the default open state. The label tracks the tree:
  // it reads Expand all only while every group is closed.
  const collapseToggle = nav.querySelector(".docs-nav-collapse-toggle");
  if (collapseToggle) {
    const treeGroups = [...nav.querySelectorAll(".docs-nav-tree details.docs-nav-group")];
    const syncCollapseToggleLabel = () => {
      collapseToggle.textContent = treeGroups.every((group) => !group.open) ? "Expand all" : "Collapse all";
    };
    collapseToggle.addEventListener("click", () => {
      const collapse = treeGroups.some((group) => group.open);
      treeGroups.forEach((group) => { group.open = !collapse; });
      syncCollapseToggleLabel();
    });
    treeGroups.forEach((group) => group.addEventListener("toggle", syncCollapseToggleLabel));
    syncCollapseToggleLabel();
  }
  nav.querySelectorAll(".docs-nav-item").forEach((button) => {
    button.addEventListener("click", () => {
      nav.querySelectorAll(".docs-nav-item").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderSelectedDoc(docsAllEntries[Number(button.dataset.docIndex)]);
    });
  });
}

function setDocsVisibilityMode(mode) {
  // Switch between the new-era clean workspace (default), the curated Primary KB, and the full
  // registry. Only the navigation is re-rendered; the active document's body is preserved so
  // switching mode never breaks the current selection or body rendering. The explicit per-mode
  // branches keep the curated-primary default contract (docsVisibilityMode = "primary") reachable
  // as real code while the opening default is the new-era view.
  if (mode === "primary") {
    if (docsVisibilityMode === "primary") return;
    docsVisibilityMode = "primary";
  } else if (mode === "all") {
    if (docsVisibilityMode === "all") return;
    docsVisibilityMode = "all";
  } else {
    if (docsVisibilityMode === "newera") return;
    docsVisibilityMode = "newera";
  }
  renderDocsNav();
}

function isRepoLocalDocPath(docPath) {
  // Only fetch repository-local files served read-only by the local console server. Reject any
  // scheme-bearing or protocol-relative URL (http:, https:, data:, javascript:, file:, //host)
  // so the Docs view never performs a network fetch and never resolves a remote or unsafe URL.
  const value = text(docPath, "");
  if (!value) return false;
  if (value.startsWith("//")) return false;
  if (/^[a-z][a-z0-9+.-]*:/i.test(value)) return false;
  return true;
}

function renderDocMarkdownLite(rawText) {
  // Escape-first: the whole source is HTML-escaped before any formatting, so raw HTML or a
  // <script> tag inside a document can never be injected or executed - it renders as visible
  // text. Formatting below only ever runs on already-escaped text.
  const safe = escapeHtml(text(rawText, "")).replace(/\r\n?/g, "\n");
  const inline = (line) => line
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)");
  // GFM table helpers. A table is a
  // pipe-delimited header row immediately followed by a separator row whose cells are all dashes
  // (optionally colon-aligned). Cells are already HTML-escaped by the escape-first pass above; inline()
  // runs on each cell so bold/code/link formatting still applies. Structural <table>/<th>/<td> tags are
  // emitted by this code, never taken from document content, so no raw HTML can be injected.
  const splitTableRow = (line) => {
    let value = line.trim();
    if (value.startsWith("|")) value = value.slice(1);
    if (value.endsWith("|")) value = value.slice(0, -1);
    return value.split("|").map((cell) => cell.trim());
  };
  const isTableSeparator = (line) => {
    if (line == null || !line.includes("|")) return false;
    const cells = splitTableRow(line);
    return cells.length > 0 && cells.every((cell) => /^:?-+:?$/.test(cell));
  };
  const renderTable = (headerCells, bodyRows) => {
    const columns = headerCells.length;
    const head = `<tr>${headerCells.map((cell) => `<th>${inline(cell)}</th>`).join("")}</tr>`;
    const body = bodyRows.map((cells) => {
      const padded = cells.slice(0, columns);
      while (padded.length < columns) padded.push("");
      return `<tr>${padded.map((cell) => `<td>${inline(cell)}</td>`).join("")}</tr>`;
    }).join("");
    return `<div class="docs-table-wrap"><table class="docs-table"><thead>${head}</thead><tbody>${body}</tbody></table></div>`;
  };
  const segments = safe.split("```");
  const html = [];
  segments.forEach((segment, index) => {
    if (index % 2 === 1) {
      // Fenced code block: strip an optional leading language-label line; content already escaped.
      let body = segment;
      const firstNl = body.indexOf("\n");
      if (firstNl !== -1 && /^[A-Za-z0-9_+-]*$/.test(body.slice(0, firstNl).trim())) {
        body = body.slice(firstNl + 1);
      }
      body = body.replace(/\n$/, "");
      html.push(`<pre class="docs-code"><code>${body}</code></pre>`);
      return;
    }
    const lines = segment.split("\n");
    let paragraph = [];
    let listType = null;
    // A list item's text may span several source lines (soft wraps or lazy continuation lines).
    // Buffer the current item's parts and emit one <li> when the item ends, so a wrapped bullet
    // renders as one clean flowing item instead of splitting mid-sentence (continuation handling is
    // at the end of the loop). Separate bullets each open their own item and are never merged.
    let listItem = null;
    const flushParagraph = () => {
      if (paragraph.length) {
        html.push(`<p>${inline(paragraph.join(" "))}</p>`);
        paragraph = [];
      }
    };
    const flushListItem = () => {
      if (listItem) {
        html.push(`<li>${inline(listItem.join(" "))}</li>`);
        listItem = null;
      }
    };
    const flushList = () => {
      flushListItem();
      if (listType) {
        html.push(`</${listType}>`);
        listType = null;
      }
    };
    for (let i = 0; i < lines.length; i += 1) {
      const trimmed = lines[i].trim();
      if (!trimmed) {
        flushParagraph();
        flushList();
        continue;
      }
      // Table: a pipe row immediately followed by a separator row. Consumes contiguous body rows,
      // then resumes normal line processing after the last table row.
      if (trimmed.includes("|") && isTableSeparator(lines[i + 1])) {
        flushParagraph();
        flushList();
        const headerCells = splitTableRow(trimmed);
        const bodyRows = [];
        let j = i + 2;
        for (; j < lines.length; j += 1) {
          const bodyLine = lines[j].trim();
          if (!bodyLine || !bodyLine.includes("|")) break;
          bodyRows.push(splitTableRow(bodyLine));
        }
        html.push(renderTable(headerCells, bodyRows));
        i = j - 1;
        continue;
      }
      const heading = trimmed.match(/^(#{1,6})\s+(.*)$/);
      if (heading) {
        flushParagraph();
        flushList();
        const level = Math.min(heading[1].length + 1, 4);
        html.push(`<h${level} class="docs-body-h">${inline(heading[2])}</h${level}>`);
        continue;
      }
      if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
        flushParagraph();
        flushList();
        html.push("<hr>");
        continue;
      }
      const ordered = trimmed.match(/^\d+\.\s+(.*)$/);
      const unordered = trimmed.match(/^[-*+]\s+(.*)$/);
      if (ordered || unordered) {
        flushParagraph();
        flushListItem();
        const wanted = ordered ? "ol" : "ul";
        if (listType !== wanted) {
          flushList();
          html.push(`<${wanted}>`);
          listType = wanted;
        }
        listItem = [ordered ? ordered[1] : unordered[1]];
        continue;
      }
      if (trimmed.startsWith("&gt;")) {
        flushParagraph();
        flushList();
        html.push(`<blockquote>${inline(trimmed.replace(/^&gt;\s?/, ""))}</blockquote>`);
        continue;
      }
      // Continuation of the current list item: a non-blank line that opens no new block while a
      // list item is open belongs to that item (lazy continuation / soft wrap), so append it and
      // let the browser wrap. Otherwise it is ordinary paragraph text.
      if (listType && listItem) {
        listItem.push(trimmed);
        continue;
      }
      paragraph.push(trimmed);
    }
    flushParagraph();
    flushList();
  });
  return html.join("\n");
}

function stripLeadingStatusHeader(rawText) {
  // Display-only reader hygiene: drop a document's leading
  // status-header blockquote from the rendered projection so it does not duplicate the reader Metadata
  // panel. Generalized to ANY leading "> Status: ..." variant regardless of the rest of the line - ADR
  // "Status: Proposed | Date: ...", Blueprint "Status: Draft | Last verified | Scope: ...", "Status:
  // Current", etc. (the earlier rule also required the word "Scope" and so missed ADR/other headers).
  // The source file is never modified - fetchText re-reads it on each load and only this in-memory copy
  // omits the line. Scoped to a LEADING status header: only heading (#...) and blank lines may precede it,
  // it must be the first block, and its text must start with "Status:" (case-insensitive), so ordinary
  // blockquotes anywhere else in the document still render.
  const lines = text(rawText, "").split(/\r\n?|\n/);
  for (let i = 0; i < lines.length; i += 1) {
    const trimmed = lines[i].trim();
    if (!trimmed) continue; // skip blank lines before the first block
    if (/^#{1,6}\s/.test(trimmed)) continue; // skip leading heading lines (e.g. the document title)
    if (/^>\s*Status:/i.test(trimmed)) {
      lines.splice(i, 1); // remove the leading status-header line from this rendered copy only
      if (i < lines.length && lines[i].trim() === "") lines.splice(i, 1); // and one trailing blank line
    }
    break; // only the first non-heading block is ever considered
  }
  return lines.join("\n");
}

function renderDocBodyContent(doc, rawText) {
  const ext = text(doc.path, "").split(".").pop().toLowerCase();
  if (ext === "md" || ext === "markdown") return renderDocMarkdownLite(stripLeadingStatusHeader(rawText));
  // Non-Markdown sources (.json, .jsonl, .html, .txt, ...) render as escaped preformatted text.
  // Escaping guarantees an .html source is shown as text and never injected as live markup.
  return `<pre class="docs-body-pre">${escapeHtml(text(rawText, ""))}</pre>`;
}

async function loadDocBody(doc) {
  const container = byId("docs-body");
  if (!container) return;
  const requestedPath = text(doc.path, "");
  try {
    if (!isRepoLocalDocPath(requestedPath)) {
      container.innerHTML = emptyState("Body not rendered: only repository-local document paths are rendered here.");
      return;
    }
    let bodyHtml = docBodyCache.get(requestedPath);
    if (bodyHtml == null) {
      const raw = await fetchText(`${REPO_BASE}${requestedPath}`);
      if (docsActivePath !== requestedPath) return;
      if (raw == null) {
        container.innerHTML = `
          <div class="docs-body-note">
            <strong>The document body could not be loaded from <span class="mono">${escapeHtml(requestedPath)}</span>.</strong>
            <span>Serve the repository read-only with <span class="mono">${escapeHtml(CONSOLE_SERVE_COMMAND)}</span> and reopen this view. Document metadata stays available in the collapsible Metadata section above.</span>
          </div>`;
        return;
      }
      bodyHtml = renderDocBodyContent(doc, raw);
      docBodyCache.set(requestedPath, bodyHtml);
    }
    if (docsActivePath !== requestedPath) return;
    container.innerHTML = bodyHtml;
  } catch (error) {
    if (docsActivePath !== requestedPath) return;
    container.innerHTML = emptyState(`Could not render the document body: ${error && error.message ? error.message : "render error"}`);
  }
}

function docStatusLabel(doc) {
  // Human-readable Status for the reader metadata panel.
  // Token-driven from the existing status/freshness_status/freshness value; adds no data. Ordered so the
  // most specific lifecycle signal wins and the neutral fallback never overclaims currency: DRAFT ->
  // Draft; STALE -> Stale; PROPOSAL -> Proposal; CANONICAL/CURRENT/APPROVED/VALID/ACTIVE -> Current;
  // anything else -> Recorded. Empty value -> "" so the field is omitted.
  const raw = text(doc.status || doc.freshness_status || doc.freshness, "").toUpperCase();
  if (!raw) return "";
  if (raw.includes("DRAFT")) return "Draft";
  if (raw.includes("STALE")) return "Stale";
  if (raw.includes("PROPOSAL")) return "Proposal";
  if (raw.includes("CANONICAL") || raw.includes("CURRENT") || raw.includes("APPROVED") || raw.includes("VALID") || raw.includes("ACTIVE")) return "Current";
  return "Recorded";
}

function docLastUpdateDate(doc) {
  // Plain date for the reader metadata Last update.
  // No dedicated date field exists, so the date is read from an ISO date embedded in freshness, else a
  // trailing YYYY_MM_DD in freshness_status/status; the former run id is no longer shown. Returns "" when
  // no date is present so the field is omitted rather than rendering a run id or a fabricated date.
  for (const field of [doc.freshness, doc.freshness_status, doc.status]) {
    const value = text(field, "");
    const iso = value.match(/(\d{4})-(\d{2})-(\d{2})/);
    if (iso) return `${iso[1]}-${iso[2]}-${iso[3]}`;
    const underscore = value.match(/(\d{4})_(\d{2})_(\d{2})/);
    if (underscore) return `${underscore[1]}-${underscore[2]}-${underscore[3]}`;
  }
  return "";
}

function renderDocMetadataDetails(doc) {
  // Finalized minimal reader metadata: four legible fields only, in order -
  // Status (mapped to a short human label, not the raw token), Category (the Blueprint group), Last
  // update (a plain date derived from the entry, not a run id), and Path last (it is the longest field).
  // Retention class, Review status, and Related run are no longer displayed. Any field that resolves
  // empty is omitted (no placeholder). Presentation only: every field stays intact in docs_index; this
  // reads the same entry, changes no data, and operator_review_status remains read-only (never written).
  const status = docStatusLabel(doc);
  const category = docGroupLabel(doc);
  const lastUpdate = docLastUpdateDate(doc);
  const fields = [
    text(status, "").trim() ? metaField("Status", status) : "",
    text(category, "").trim() ? metaField("Category", category) : "",
    text(lastUpdate, "").trim() ? metaField("Last update", lastUpdate) : "",
    text(doc.path, "").trim() ? metaField("Path", doc.path, "mono") : ""
  ].join("");
  return `
    <details class="docs-meta-details">
      <summary>Metadata</summary>
      <div class="docs-meta-grid">
        ${fields}
      </div>
    </details>
  `;
}

function renderSelectedDoc(doc) {
  docsActivePath = text(doc.path, "");
  // Reader chrome (reference disclaimer removed upstream): the reader shows the document
  // title, the collapsed Metadata disclosure, and the rendered body. The former "Reference view" line was
  // removed as display-only chrome; the real no-claims guardrails remain in the Status tab Claims-Not-
  // Allowed panel and in each run note, unaffected by this reader.
  byId("docs-reader").innerHTML = `
    <div class="docs-reader-inner">
      <h1>${escapeHtml(doc.title || doc.path)}</h1>
      ${renderDocMetadataDetails(doc)}
      <div id="docs-body" class="docs-body"><p class="docs-body-loading">Loading document body...</p></div>
    </div>
  `;
  loadDocBody(doc);
}

function renderGovernance(data) {
  byId("review-policy").innerHTML = `
    <div class="table-wrap">
      <table class="policy-table">
        <thead>
          <tr><th>Topic</th><th>Policy</th></tr>
        </thead>
        <tbody>
          <tr>
            <td class="policy-topic">Run round cycle</td>
            <td><ul class="policy-list">
              <li>While a run is active, it advances in rounds.</li>
              <li>Each round: <code>Implementation</code> (or <code>Correction</code>), then <code>AI Review</code>, then <code>Human QA</code> (if enabled).</li>
              <li>The round budget, set at run creation, caps the maximum number of rounds.</li>
            </ul></td>
          </tr>
          <tr>
            <td class="policy-topic">AI Review gate (mandatory, BEFORE Human QA)</td>
            <td><ul class="policy-list">
              <li>${badge("approved", "green")} proceed (to Human QA if enabled, else to closeout)</li>
              <li>${badge("changes requested", "amber")} the round ends; the next round opens as Correction</li>
              <li>${badge("blocked", "red")} the run becomes blocked</li>
              <li>Shown as a derived stage: <code>stage/status</code> (example: <code>ai_review/waiting</code>).</li>
            </ul></td>
          </tr>
          <tr>
            <td class="policy-topic">Human QA gate</td>
            <td><ul class="policy-list">
              <li>Enabled per run, decided at run creation.</li>
              <li>The ONLY human acceptance gate. NEVER inferred from AI Review, implementation, commit, or push.</li>
              <li>${badge("accepted", "green")} closeout; ${badge("changes requested", "amber")} next Correction round; ${badge("blocked", "red")} run blocked.</li>
            </ul></td>
          </tr>
          <tr>
            <td class="policy-topic">Commit vs closeout</td>
            <td><ul class="policy-list">
              <li><code>committed_and_pushed</code> is a SEPARATE traceability attribute, NOT a cycle stage.</li>
              <li>A run may be committed and pushed while still waiting on Human QA.</li>
              <li>Closeout is the closing transition; it assigns ${badge("completed", "green")} or ${badge("blocked", "red")}.</li>
            </ul></td>
          </tr>
          <tr>
            <td class="policy-topic">External run states</td>
            <td><ul class="policy-list">
              <li>${badge("planned", "gray")} created, no rounds yet</li>
              <li>${badge("active", "blue")} round cycle running</li>
              <li>${badge("completed", "green")} closeout approved</li>
              <li>${badge("blocked", "red")} closeout blocked (usually spawns follow-ups)</li>
              <li>${badge("superseded", "gray")} also appears in data</li>
              <li>Backed by <code>lifecycle_status</code> / <code>operational_state</code> / <code>run_kind</code> (there is NO <code>status</code> field).</li>
            </ul></td>
          </tr>
          <tr>
            <td class="policy-topic">Independent review</td>
            <td><ul class="policy-list">
              <li>The executor never reviews or approves its own work.</li>
              <li>A correction pass responding to review findings is NOT self-review.</li>
            </ul></td>
          </tr>
        </tbody>
      </table>
    </div>
  `;

  // §20 — each Governance table announces ITS missing file in ITS section. A file that loaded
  // with an empty list keeps the plain empty state: that is content, not absence.
  byId("project-guardrails").innerHTML = data.guardrails == null
    ? sourceAbsenceBanner(PATHS.guardrails, "Project guardrails unavailable.")
    : tableFromRows(["Rule", "Status", "Source"], (data.guardrails?.guardrails || []).map((item) => [
      item.rule || item.title || item.id,
      badge(item.status || "ACTIVE", toneForStatus(item.status)),
      (item.source_refs || []).join("; ")
    ]));

  byId("no-claims").innerHTML = data.noClaims == null
    ? sourceAbsenceBanner(PATHS.noClaims, "Claims table unavailable.")
    : tableFromRows(["Restriction", "Status", "Allowed only if"], (data.noClaims?.claims || []).map((claim) => [
      claim.claim,
      badge(claim.status || "DISALLOWED", "red"),
      claim.allowed_only_if || ""
    ]));
}

// §20 — shared absence line for a per-surface announcement: the headline says what the surface
// lost, the body names the exact file that could not be loaded.
function sourceAbsenceBanner(path, headline) {
  return `
    <div class="readonly-banner">
      <strong>${escapeHtml(headline)}</strong>
      <span>${escapeHtml(displaySourcePath(path))} could not be loaded. The rest of the Project Console is unaffected.</span>
    </div>
  `;
}

function renderComponentStatus(components) {
  if (!components.length) return emptyState("No component status projection loaded.");
  return `
    <div class="component-grid">
      ${components.map((component) => `
        <div class="component-card">
          <div class="component-card-head">
            <span class="component-id">${escapeHtml(component.component_id)}</span>
            ${badge(component.certification_status || "UNKNOWN", toneForStatus(component.certification_status))}
          </div>
          <div class="component-note">${escapeHtml(component.status_summary || "")}</div>
          <div class="component-meta">
            <span>QA: ${escapeHtml(component.human_qa_status)}</span>
            <span>Repair: ${escapeHtml(component.repair_status)}</span>
            <span>Docs: ${escapeHtml(component.docs_status)}</span>
          </div>
          <div class="component-flags">
            ${badge(`Web global: ${component.web_global_certified}`, component.web_global_certified ? "green" : "red")}
            ${badge(`Generator-safe: ${component.generator_safe}`, component.generator_safe ? "green" : "red")}
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function tableFromRows(headers, rows) {
  if (!rows.length) return emptyState("No records available from local state.");
  return `
    <div class="table-wrap">
      <table>
        <thead><tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr></thead>
        <tbody>
          ${rows.map((rowItems) => `<tr>${rowItems.map((item) => `<td>${typeof item === "string" && item.includes("<span") ? item : escapeHtml(item)}</td>`).join("")}</tr>`).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function displaySourcePath(value) {
  // Display-only: strip leading ./ and ../ relative-traversal segments and a leading slash from
  // the shown label, so a fetched path like /projects/<key>/.project/snapshot.json reads as
  // projects/<key>/.project/snapshot.json — it still names BOTH the project and the file, which
  // is what §20 needs in a multi-project shell. Does NOT change the real fetch/resolve URL:
  // loadedSources/failedSources keep the actual paths used to load data.
  return text(value, "").replace(/^(?:\.{1,2}\/)+/, "").replace(/^\//, "");
}

// Console Diagnostics distinguishes THREE states, because there are three (O4.P13). Collapsing
// the last two into "Failed" is what made the banner permanent and what made the panel unable to
// answer the operator's actual question — is something broken, or is this project simply not the
// project those routes belong to?
//
//   declared and loaded  — the project promised it and it is here.
//   declared and failed  — the project promised it and it is not here. THE real absence (§20).
//   not declared         — this project's emitter writes no such file (§18). Not an absence:
//                          the route exists in the renderer because another console's project
//                          had it, and nothing here ever claimed it would.
//
// A route that LOADED is reported loaded whether or not it was declared: what is on disk is a
// measurement, and no declaration overrides it.
function renderSources(data) {
  const sourceRow = (label, path, detail) => `
    <div class="source-status-item">
      <div class="source-status-label">${escapeHtml(label)}</div>
      <div class="source-path">${escapeHtml(displaySourcePath(path))}${detail ? escapeHtml(`: ${detail}`) : ""}</div>
    </div>
  `;
  const loaded = loadedSources.map((source) => sourceRow("Loaded", source, "")).join("");
  const declaredFailures = failedSources.filter((entry) => isDeclaredSource(entry.path));
  const undeclared = failedSources.filter((entry) => !isDeclaredSource(entry.path));
  const failed = declaredFailures.map((entry) => sourceRow("Failed", entry.path, entry.detail)).join("");
  const notEmitted = undeclared.map((entry) => sourceRow("Not emitted", entry.path, "")).join("");
  byId("state-sources").innerHTML = `
    <div class="source-status-list">
      ${loaded || emptyState("No sources loaded.")}
      ${failed ? `<div class="group-label">Declared sources that failed to load</div>${failed}` : ""}
      ${notEmitted ? `<div class="group-label">Not emitted by this project</div>${notEmitted}` : ""}
    </div>
  `;
  // Read off PATHS, not re-typed: the routes shown here are the routes actually fetched, so this
  // panel cannot drift from the data layer (CONTRATO §1.a).
  byId("repo-structure").innerHTML = [
    row("Manifest", displaySourcePath(PATHS.project), "mono"),
    row("Project status", displaySourcePath(PATHS.projectStatus), "mono"),
    row("Component status", displaySourcePath(PATHS.componentStatus), "mono"),
    row("Events", displaySourcePath(PATHS.events), "mono"),
    row("Roadmap", displaySourcePath(PATHS.roadmapV3), "mono"),
    row("Change ledger", displaySourcePath(PATHS.changeLedger), "mono"),
    row("Git provenance", displaySourcePath(PATHS.gitProvenance), "mono"),
    row("Human QA", displaySourcePath(PATHS.humanQa), "mono"),
    row("AI reviews", displaySourcePath(PATHS.aiReviews), "mono"),
    row("Docs index", displaySourcePath(PATHS.docsIndex), "mono"),
    row("Reports index", displaySourcePath(PATHS.reportsIndex), "mono")
  ].join("");
  const v3Objectives = Array.isArray(data.roadmapV3?.objectives) ? data.roadmapV3.objectives : [];
  const v3PhaseCount = v3Objectives.reduce((total, objective) => total + (objective.phases?.length || 0), 0);
  const v3RunCount = v3Objectives.reduce((total, objective) => total + (objective.phases || []).reduce((sum, phase) => sum + (phase.runs?.length || 0), 0), 0);
  byId("console-source-files").innerHTML = [
    row("HTML view", CONSOLE_FILES.html, "mono"),
    row("Styles", CONSOLE_FILES.css, "mono"),
    row("Renderer", CONSOLE_FILES.js, "mono"),
    row("Primary data", displaySourcePath(PATHS.snapshot), "mono"),
    row("Docs indexed", data.docsIndex?.docs?.length || 0),
    row("Components", data.componentStatus?.components?.length || 0),
    row("Git episodes", data.gitProvenance.length),
    row("Roadmap", `${v3Objectives.length} objectives / ${v3PhaseCount} phases / ${v3RunCount} runs`)
  ].join("");
}

function v3Unavailable(containerId, message) {
  const container = byId(containerId);
  if (!container) return;
  container.innerHTML = `
    <div class="readonly-banner">
      <strong>Roadmap v3 source unavailable.</strong>
      <span>${escapeHtml(message || "roadmap.json could not be loaded.")}</span>
      <span>The rest of the Project Console is unaffected.</span>
    </div>
  `;
}

// §20 — the absence announcement for the roadmap-fed surfaces, NAMING THE FILE. Distinguishes
// "the file could not be loaded" from "it loaded but does not carry objectives[]", because the
// second is not an absence and should not be reported as one.
function roadmapAbsenceMessage(data) {
  if (!data || data.roadmapV3 == null) {
    return `${displaySourcePath(PATHS.roadmapV3)} could not be loaded.`;
  }
  return `${displaySourcePath(PATHS.roadmapV3)} carries no objectives[]; there is nothing to derive.`;
}

function v3Model(data) {
  const roadmap = data && data.roadmapV3;
  if (!roadmap || !Array.isArray(roadmap.objectives) || !roadmap.objectives.length) return null;
  const runsById = new Map();
  const contextByRunId = new Map();
  const allRuns = [];
  roadmap.objectives.forEach((objective) => {
    (objective.phases || []).forEach((phase) => {
      (phase.runs || []).forEach((run) => {
        runsById.set(run.run_id, run);
        contextByRunId.set(run.run_id, { objective, phase });
        allRuns.push(run);
      });
    });
  });
  // [D-051] Lanes. The vocabulary comes from the TREE ITSELF (root.lanes, transported by
  // the emitter): this renderer executes it and knows no lane by name. A tree that
  // declares none has `lanes: null` and every lane surface below stays exactly as it was.
  const lanes = Array.isArray(roadmap.lanes) && roadmap.lanes.length ? roadmap.lanes : null;
  const defaultLane = lanes ? (lanes.find((lane) => lane && lane.default === true) || lanes[0]).lane_id : null;
  const laneById = new Map((lanes || []).map((lane) => [lane.lane_id, lane]));
  // A run's lane: its own stored key, else the project default ("every run has a lane"
  // is satisfied at READ time). Null across the board when no lanes are declared, so
  // "same lane" is vacuously true and a lane-scoped barrier degenerates to global.
  const laneOf = (run) => (run && typeof run.lane === "string" && run.lane ? run.lane : defaultLane);
  // Position INSIDE the lane is DERIVED by filtering the global queue_order — never
  // stored anywhere (§12's discipline). Labels are lane KEY + position (D-051: the key
  // is stable; a lane number is a position and shifts when lanes are added).
  const laneInfoByRunId = new Map();
  if (lanes) {
    const counters = new Map();
    allRuns.slice().sort((a, b) => a.queue_order - b.queue_order).forEach((run) => {
      const laneId = laneOf(run);
      const position = (counters.get(laneId) || 0) + 1;
      counters.set(laneId, position);
      laneInfoByRunId.set(run.run_id, {
        laneId,
        lanePosition: position,
        laneLabel: `${laneId}-${String(position).padStart(2, "0")}`
      });
    });
  }
  // [#48] Batches. Same source discipline as lanes: the vocabulary comes from the TREE
  // ITSELF (root.batches, transported by the emitter); this renderer executes it and knows
  // no batch by name. The one asymmetry with lanes is meaning, not plumbing: there is NO
  // default batch, so batchOf returns null for a run without the key — that run belongs to
  // no batch, and no batch surface below invents one for it.
  const batches = Array.isArray(roadmap.batches) && roadmap.batches.length ? roadmap.batches : null;
  const batchById = new Map((batches || []).map((batch) => [batch.batch_id, batch]));
  const batchOf = (run) => (run && typeof run.batch === "string" && run.batch ? run.batch : null);
  // [D-051] Barriers. A run marked barrier bars, while it is not completed, every LATER
  // run (by the global queue_order) in its scope: its own resolved lane ("lane") or all
  // lanes ("global"). The barred set is DERIVED here at read time — the file stores the
  // RULE (one field), never the expanded depends_on edges.
  const barriers = allRuns
    .filter((run) => run.barrier === "lane" || run.barrier === "global")
    .sort((a, b) => a.queue_order - b.queue_order);
  const barrierBlockersByRunId = new Map();
  if (barriers.length) {
    allRuns.forEach((run) => {
      const blockers = barriers.filter((barrier) =>
        barrier.status !== "completed" &&
        barrier.run_id !== run.run_id &&
        barrier.queue_order < run.queue_order &&
        (barrier.barrier === "global" || laneOf(barrier) === laneOf(run)));
      if (blockers.length) barrierBlockersByRunId.set(run.run_id, blockers);
    });
  }
  return { roadmap, runsById, contextByRunId, allRuns, lanes, defaultLane, laneById, laneOf, laneInfoByRunId, batches, batchById, batchOf, barrierBlockersByRunId };
}

// [D-051] The incomplete barriers barring a run's START. Only a planned run can still be
// barred (an active/terminal run already started or ended; its stored status stays the
// truth on screen). Earliest-first: barriers clear in queue order, so the first entry is
// the active frontier — the one the console NAMES.
function v3BarrierBlockersFor(model, run) {
  if (!model || !run || run.status !== "planned") return [];
  return model.barrierBlockersByRunId.get(run.run_id) || [];
}

// Lane label of a run (`<lane_id>-03`), or null when the project declares no lanes — no
// label surface exists at all for a lane-less project.
function v3LaneLabel(model, run) {
  if (!model || !model.lanes || !run) return null;
  const info = model.laneInfoByRunId.get(run.run_id);
  return info ? info.laneLabel : null;
}

// [D-051 QA-A] The position a roadmap row SHOWS, and the one it carries beside it.
//
// With NO lane selected the primary position is the GLOBAL `queue_order` — the project's
// order identity, exactly as before this correction. With a lane selected the queue IS
// that lane's queue, so the primary position is the run's position INSIDE that lane
// (1, 2, 3… contiguous): a global order read through a filter reads skipped (#8, #11,
// #12) and that skipping is the disorder lanes exist to remove. The global order is not
// lost — it travels with the row as a secondary tag (see v3RunRowTags).
//
// Both numbers are DERIVED by filtering the global order at read time, the same way the
// lane labels are. NOTHING is stored: D-051's invariant (no lane position on disk, in the
// canonical or in the emitted artifacts) is untouched.
function v3RunPosition(model, run) {
  if (!v3LaneFilterActive(model)) return { primary: run.queue_order, global: null };
  const info = model.laneInfoByRunId.get(run.run_id);
  return { primary: info ? info.lanePosition : run.queue_order, global: run.queue_order };
}

// The secondary carrier of the global order while a lane filter is on. Empty string with
// no filter (the primary number IS the global order then, so a tag would repeat it).
function v3GlobalOrderTag(position) {
  if (position.global === null) return "";
  return `<span class="v3-global-order-tag" title="Global queue order — the project-wide order identity, unchanged by the lane filter">#${escapeHtml(position.global)} global</span>`;
}

// Compact reference to a barrier for "waiting on" surfaces: its lane label when lanes
// are declared, else its global #order. Scope is always named — a GLOBAL barrier must be
// visible AS global (D-051: the sync point is legitimate but never comfortable).
function v3BarrierRef(model, barrier) {
  const label = v3LaneLabel(model, barrier) || `#${barrier.queue_order}`;
  return `${label} (${barrier.barrier === "global" ? "global barrier" : "lane barrier"})`;
}

function v3StatusBadge(status, solid) {
  const tone = ROADMAP_V3_STATUS_TONES[status] || "gray";
  return `<span class="badge badge-${tone} v3-status-badge${solid ? " v3-chip-solid" : ""}">${escapeHtml(status)}</span>`;
}

// Shared right-pointing SVG chevron (prototype glyph); orientation and colour are
// handled by the surrounding state classes in CSS. Decorative only.
function v3Chevron(size) {
  const px = size || 11;
  return `<svg viewBox="0 0 24 24" width="${px}" height="${px}" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polyline points="9 5 16 12 9 19"></polyline></svg>`;
}

// Semantic status disc derived from the single canonical run.status (handoff RR-A):
// green check (completed), red lock (blocked), pulsing indigo dot (active), muted clock
// (planned). role="img" + aria-label keep every marker accessible and never colour-only.
function v3TerminalIcon(status) {
  if (status === "completed") {
    return '<span class="v3-terminal-icon v3-terminal-completed" role="img" aria-label="Completed"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="4.5 12.5 9.5 17.5 19.5 6.5"></polyline></svg></span>';
  }
  if (status === "blocked") {
    return '<span class="v3-terminal-icon v3-terminal-blocked" role="img" aria-label="Blocked"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="11" width="17" height="10" rx="2"></rect><path d="M7.5 11V7.5a4.5 4.5 0 0 1 9 0V11"></path></svg></span>';
  }
  if (status === "active") {
    return '<span class="v3-terminal-icon v3-terminal-active" role="img" aria-label="Active"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="5" fill="currentColor"></circle></svg></span>';
  }
  if (status === "planned") {
    return '<span class="v3-terminal-icon v3-terminal-planned" role="img" aria-label="Planned"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><polyline points="12 8 12 12 14.5 13.5"></polyline></svg></span>';
  }
  return "";
}

function v3DeriveCurrent(run) {
  const progress = Array.isArray(run.progress) ? run.progress : null;
  if (!progress || !progress.length) return null;
  const running = progress.filter((entry) => entry && entry.state === "running");
  if (running.length === 1) return running[0];
  return progress.find((entry) => entry && entry.state === "waiting") || null;
}

function v3QueueGroupKey(run, runsById, model) {
  if (run.status === "active") {
    const current = v3DeriveCurrent(run);
    if (current && current.stage === "human_qa" && current.state === "waiting") {
      return "needs_human_decision";
    }
    return "now";
  }
  if (run.status === "planned") {
    const ready = (run.depends_on || []).every((id) => runsById.get(id)?.status === "completed");
    // [D-051] A barrier bars the start of every later planned run in its scope, without
    // any written depends_on edge: satisfied dependencies alone no longer mean ready.
    // Only callers that pass the model get barrier awareness; a barrier-less roadmap
    // derives exactly what it always derived.
    const barred = model ? v3BarrierBlockersFor(model, run).length > 0 : false;
    return ready && !barred ? "ready_next" : "later";
  }
  return "history";
}

// Display grouping (DISPLAY concern only): the Run Queue collapses the two planned
// readiness keys into a single ordered "upcoming" display group so position carries
// execution order while each row still carries readiness via its chip and cell. The
// semantic key from v3QueueGroupKey is unchanged and still drives renderOverviewV3 and
// the per-row cells; only the queue's visual grouping is affected.
function v3QueueDisplayGroup(semanticKey) {
  if (semanticKey === "ready_next" || semanticKey === "later") return "upcoming";
  return semanticKey;
}

// "AI Review · attempt 3 · waiting" (drawer) or "AI Review · waiting" (queue cell),
// derived only from a progress entry - never from persisted stage fields.
function v3StageText(entry, withAttempt) {
  const stageLabel = ROADMAP_V3_STAGE_LABELS[entry.stage] || entry.stage;
  const stateLabel = String(ROADMAP_V3_STATE_LABELS[entry.state] || entry.state).toLowerCase();
  return withAttempt
    ? `${stageLabel} · attempt ${entry.attempt} · ${stateLabel}`
    : `${stageLabel} · ${stateLabel}`;
}

// Sentence-case a stored snake_case outcome, e.g. completed_successfully ->
// "Completed successfully". Display-only; the stored value is never rewritten.
function v3ResultText(value) {
  const label = text(value, "").replace(/_/g, " ").trim();
  return label ? label.charAt(0).toUpperCase() + label.slice(1) : "";
}

// Objective stat row + derived progress bar (handoff OH-A). All numbers are computed
// from descendant run states at render time; per operator direction the Blocked stat
// counts only runs whose stored status is "blocked" (planned runs waiting on a
// dependency stay in Later and are not flagged as blocked).
function v3ObjectiveStats(runs) {
  const counts = { completed: 0, active: 0, blocked: 0 };
  runs.forEach((run) => {
    if (counts[run.status] !== undefined) counts[run.status] += 1;
  });
  const pct = runs.length ? Math.round((counts.completed / runs.length) * 100) : 0;
  return `
    <div class="v3-objective-stats">
      <span class="v3-stat"><span class="v3-stat-value">${runs.length}</span><span class="v3-stat-label">Runs</span></span>
      <span class="v3-stat v3-stat-completed"><span class="v3-stat-value">${counts.completed}</span><span class="v3-stat-label">Completed</span></span>
      <span class="v3-stat v3-stat-active${counts.active ? " is-nonzero" : ""}"><span class="v3-stat-value">${counts.active}</span><span class="v3-stat-label">Active</span></span>
      <span class="v3-stat v3-stat-blocked${counts.blocked ? " is-nonzero" : ""}"><span class="v3-stat-value">${counts.blocked}</span><span class="v3-stat-label">Blocked</span></span>
      <span class="v3-objective-progress">
        <span class="v3-objective-progress-head"><span class="v3-objective-progress-label">Progress</span><span class="v3-objective-progress-value">${pct}%</span></span>
        <span class="v3-progressbar"><span class="v3-progressbar-fill" style="width: ${pct}%;"></span></span>
      </span>
    </div>
  `;
}

function v3PhaseRatio(runs) {
  let done = 0;
  let active = 0;
  runs.forEach((run) => {
    if (run.status === "completed") done += 1;
    if (run.status === "active") active += 1;
  });
  return `${done} of ${runs.length} done${active ? ` · ${active} active` : ""}`;
}

// Round bands with an icon-disc stage rail (handoff PR-A). Bands collapse
// independently; the round holding the derived current entry opens by default and
// rolls up as "Current"; closed rounds roll up their recorded Human QA outcome.
// Rounds stay labeled "Round N" per the standing Human QA correction. Runs without
// progress still render the section with the prototype's quiet mono note.
function v3ProgressTimeline(run) {
  const progress = Array.isArray(run.progress) ? run.progress : null;
  if (!progress || !progress.length) {
    const note = run.status === "completed"
      ? `<div class="v3-progress-note-line is-closed">run closed${"closeout_result" in run ? ` · ${escapeHtml(String(v3ResultText(run.closeout_result)).toLowerCase())}` : ""}</div>`
      : '<div class="v3-progress-note-line">not started · no progress recorded yet</div>';
    return `
    <div class="drawer-section">
      <div class="drawer-section-title">Progress</div>
      ${note}
    </div>
  `;
  }
  const current = v3DeriveCurrent(run);
  const rounds = [];
  progress.forEach((entry) => {
    const last = rounds[rounds.length - 1];
    if (!last || last.cycle !== entry.cycle) rounds.push({ cycle: entry.cycle, entries: [entry] });
    else last.entries.push(entry);
  });
  const roundBlocks = rounds.map((round) => {
    const hasCurrent = current ? round.entries.indexOf(current) !== -1 : false;
    let rollup = "";
    if (hasCurrent) {
      rollup = '<span class="v3-progress-rollup is-current">Current</span>';
    } else {
      let qaEntry = null;
      round.entries.forEach((entry) => {
        if (!qaEntry && entry.stage === "human_qa" && entry.state === "done" && "result" in entry) qaEntry = entry;
      });
      if (qaEntry) {
        const qaResult = String(ROADMAP_V3_RESULT_LABELS[qaEntry.result] || qaEntry.result).toLowerCase();
        const tone = qaEntry.result === "changes_requested" ? "is-changes" : "is-ok";
        rollup = `<span class="v3-progress-rollup ${tone}">${escapeHtml(`${ROADMAP_V3_STAGE_LABELS.human_qa} — ${qaResult}`)}</span>`;
      } else {
        rollup = '<span class="v3-progress-rollup is-ok">Done</span>';
      }
    }
    const entries = round.entries.map((entry, index) => {
      const stageLabel = ROADMAP_V3_STAGE_LABELS[entry.stage] || entry.stage;
      const isCurrent = current === entry;
      const isDone = entry.state === "done";
      const isLast = index === round.entries.length - 1;
      const resultLabel = "result" in entry ? (ROADMAP_V3_RESULT_LABELS[entry.result] || entry.result) : null;
      const attemptSuffix = entry.stage !== "closeout" ? ` <span class="v3-progress-attempt">· attempt ${entry.attempt}</span>` : "";
      const subText = isDone
        ? `Done${resultLabel ? ` — ${String(resultLabel).toLowerCase()}` : ""}`
        : isCurrent
          ? (entry.state === "running" ? "Running — current stage" : "Waiting — current stage")
          : (ROADMAP_V3_STATE_LABELS[entry.state] || entry.state);
      return `
        <li class="v3-progress-entry v3-progress-${escapeHtml(entry.state)}${isCurrent ? " v3-progress-current" : ""}">
          <span class="v3-progress-railcell">
            ${v3ProgressDisc(entry.state, isCurrent)}
            ${isLast ? "" : '<span class="v3-progress-rail" aria-hidden="true"></span>'}
          </span>
          <span class="v3-progress-body">
            <span class="v3-progress-head">${escapeHtml(stageLabel)}${attemptSuffix}</span>
            <span class="v3-progress-sub">${escapeHtml(subText)}</span>
            ${"note" in entry ? `<span class="v3-progress-note">${escapeHtml(entry.note)}</span>` : ""}
          </span>
        </li>
      `;
    }).join("");
    return `
      <details class="v3-progress-round${hasCurrent ? " is-current" : ""}"${hasCurrent ? " open" : ""}>
        <summary><span class="v3-caret">${v3Chevron(11)}</span>Round ${round.cycle}${rollup}</summary>
        <ol class="v3-progress-list">${entries}</ol>
      </details>
    `;
  }).join("");
  return `
    <div class="drawer-section">
      <div class="drawer-section-title">Progress</div>
      ${roundBlocks}
    </div>
  `;
}

function v3ProgressDisc(state, isCurrent) {
  if (state === "done") {
    return '<span class="v3-progress-disc is-done" aria-hidden="true"><svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="4.5 12.5 9.5 17.5 19.5 6.5"></polyline></svg></span>';
  }
  if (isCurrent || state === "running") {
    return '<span class="v3-progress-disc is-current" aria-hidden="true"><span class="v3-progress-dot"></span></span>';
  }
  return '<span class="v3-progress-disc is-waiting" aria-hidden="true"></span>';
}

// [D-051] Inline tags a run row carries when the roadmap opts in: the lane label (lane
// KEY + derived in-lane position, only for a project that DECLARES lanes) and the
// barrier mark (whenever the run is one — scope always named, global visibly distinct
// from lane). A lane-less, barrier-less roadmap gets an empty string: zero new markup.
//
// [D-051 QA-A] With a lane FILTER on, the lane label gives way to the global-order tag: the
// row's primary number is already the in-lane position, the selector already names the
// lane, and every visible row is on it — so a `<lane_id>-02` label beside a row numbered
// 2 would repeat two thirds of itself. What the filter hides is the GLOBAL order, and
// that is what the tag carries instead. One tag either way; no row grows.
function v3RunRowTags(model, run) {
  const tags = [];
  const position = v3RunPosition(model, run);
  const laneLabel = position.global === null ? v3LaneLabel(model, run) : null;
  if (position.global !== null) tags.push(v3GlobalOrderTag(position));
  if (laneLabel) tags.push(`<span class="v3-lane-tag" title="${escapeHtml((model.laneById.get(model.laneOf(run)) || {}).title || model.laneOf(run))}">${escapeHtml(laneLabel)}</span>`);
  if (run.barrier === "global" || run.barrier === "lane") {
    tags.push(`<span class="v3-barrier-tag is-${escapeHtml(run.barrier)}" title="${run.barrier === "global" ? "Global barrier: bars every later run in every lane until completed" : "Lane barrier: bars later runs on its own lane until completed"}">Barrier · ${run.barrier === "global" ? "GLOBAL" : "lane"}</span>`);
  }
  // [#43] The severity chip, DERIVED at read time. It appears only when the run actually has a
  // severity — an unclassified run gets no chip at all, because a chip reading MINOR over a run
  // nobody has classified would be a claim the file does not make.
  //
  // [#47] And `closure_mode` beside it. Both derived values were already computed here and one
  // of them was being thrown away: the row said how BADLY a run can fail and stayed silent about
  // whether closing it needs a person, which is the question the queue is actually read for.
  //
  // SAME DISCIPLINE, POINT FOR POINT: derived at READ time, never stored, and NO CHIP on a run
  // that has no closure mode. The two are independent — a run with work_type and blast_radius
  // but no correctness_model has a severity and no closure mode, and it correctly shows one chip.
  //
  // NO COLOUR, AND NO `is-` CLASS AT ALL. The base `.v3-severity-tag` rule is the whole chip, the
  // same rule the run drawer already paints a closure mode with. Colour is the row's ONE chromatic
  // signal and it belongs to severity; a coloured closure mode would compete with it, and an
  // `is-semi_attended` class with no rule behind it would be an invitation to give it one.
  const derived = v3DerivedClassification(run);
  if (derived.severity) {
    tags.push(`<span class="v3-severity-tag is-${escapeHtml(derived.severity.toLowerCase())}" title="Severity ${escapeHtml(derived.severity)} — DERIVED from work_type, blast_radius and failure_surfaces at read time; never stored">${escapeHtml(derived.severity)}</span>`);
  }
  if (derived.closure_mode) {
    tags.push(`<span class="v3-severity-tag" title="Closure mode ${escapeHtml(derived.closure_mode)} — DERIVED from correctness_model (and the severity on the SPECIFIED branch), then the external_effects guard, at read time; never stored">${escapeHtml(derived.closure_mode)}</span>`);
  }
  return tags.join("");
}

function v3RoadmapRunRow(run, model) {
  // RR-A: status disc + title line opening with the stable inline #N order + one
  // textual status badge; non-active rows recede via status classes (prototype).
  // [D-051 QA-A] The #N is the position of the row IN WHAT IS ON SCREEN: the global
  // queue_order unfiltered, the in-lane position with a lane selected. Same rule as the
  // Run Queue — the two subviews never disagree about what a row's number means.
  const position = v3RunPosition(model, run);
  return `
    <button class="v3-run-row is-${escapeHtml(run.status)}" type="button" data-v3-run="${escapeHtml(run.run_id)}">
      ${v3TerminalIcon(run.status)}
      <span class="v3-run-info">
        <span class="v3-run-title"><span class="v3-run-order">#${escapeHtml(position.primary)}</span>${escapeHtml(run.title)}${v3RunRowTags(model, run)}</span>
        <span class="v3-run-summary">${escapeHtml(run.summary)}</span>
      </span>
      ${v3StatusBadge(run.status)}
    </button>
  `;
}

// Status-bearing queue-row content (Stage / Waiting on / Dependencies / Closeout cells
// and the status chip) is derived HERE and passed into the presentation-only row
// template, following the same caller-computed pattern as the History lead icon.
function v3QueueRowCells(run, groupKey, runsById, model) {
  if (groupKey === "history") {
    // [#46] ABSENCE IS NOT BLOCKED. This cell used to fall back to the word "Blocked"
    // whenever closeout_result was missing, which painted 9 correctly closed runs of this
    // very canonical as problems — empty is an unrecorded outcome, not a blockage, and a
    // closed run showing as a problem corrupts the memory of the system. Absence now reads
    // as exactly what it is, muted and never green; the status itself already travels in
    // the row's lead icon. Old runs are NOT backfilled — the obligation to record an
    // outcome binds new closes (the engine refuses a close without one), never the past.
    const hasCloseout = "closeout_result" in run && run.closeout_result != null && String(run.closeout_result).trim() !== "";
    const closeout = hasCloseout ? v3ResultText(run.closeout_result) : "No closeout recorded";
    const tone = hasCloseout ? (run.status === "completed" ? " is-green" : "") : " is-muted";
    return {
      cells: `<span class="v3-row-cell"><span class="v3-row-cell-label">Closeout</span><span class="v3-row-cell-value${tone}">${escapeHtml(closeout)}</span></span>`,
      chip: ""
    };
  }
  if (run.status === "active") {
    const current = v3DeriveCurrent(run);
    const stageText = current ? v3StageText(current, false) : "In progress";
    return {
      cells: `<span class="v3-row-cell"><span class="v3-row-cell-label">Stage</span><span class="v3-row-cell-value">${escapeHtml(stageText)}</span></span>`,
      chip: '<span class="v3-chip v3-chip-active">Active</span>'
    };
  }
  if (groupKey === "ready_next") {
    const depsCount = (run.depends_on || []).length;
    return {
      cells: `<span class="v3-row-cell"><span class="v3-row-cell-label">Dependencies</span><span class="v3-row-cell-value is-muted">${depsCount ? "Satisfied" : "None"}</span></span>`,
      chip: '<span class="v3-chip v3-chip-ready">Ready</span>'
    };
  }
  // Later: surface the blocking run(s) with the prototype's compact formats.
  const blocking = (run.depends_on || []).map((id) => runsById.get(id)).filter((dep) => dep && dep.status !== "completed");
  // [D-051] A barrier barring this run is NAMED next to the blocking dependencies — the
  // console says WHICH barrier is holding what, with its scope, never a bare "blocked".
  // Earliest incomplete barrier first (the active frontier); the rest are counted.
  const barrierBlockers = v3BarrierBlockersFor(model, run);
  let value = "Unresolved dependency";
  if (blocking.length === 1) value = `#${blocking[0].queue_order} ${blocking[0].title}`;
  else if (blocking.length === 2) value = `#${blocking[0].queue_order} · #${blocking[1].queue_order}`;
  else if (blocking.length > 2) value = `#${blocking[0].queue_order} +${blocking.length - 1} more`;
  if (barrierBlockers.length) {
    const barrierText = `Barrier ${v3BarrierRef(model, barrierBlockers[0])}${barrierBlockers.length > 1 ? ` +${barrierBlockers.length - 1} more` : ""}`;
    value = blocking.length ? `${value} · ${barrierText}` : barrierText;
  }
  return {
    cells: `<span class="v3-row-cell"><span class="v3-row-cell-label">Waiting on</span><span class="v3-row-cell-value is-link">${escapeHtml(value)}</span></span>`,
    chip: '<span class="v3-chip v3-chip-planned">Planned</span>'
  };
}

function v3QueueRowHtml(run, leadIcon, cells, chip, tileClass, rowClass, tags, position) {
  // Presentation-only template (QR-ACT/PLN/HIS-A): reads only the run order, title, and
  // summary; the lead marker, labeled cells, chip, tile tint, row modifier — and the
  // [D-051] lane/barrier tags and the [D-051 QA-A] displayed position — are computed by the
  // caller, so this template never reads status-bearing run fields. History rows lead
  // with the disc and demote the #N order into the title line.
  const icon = leadIcon || "";
  const shown = position ? position.primary : run.queue_order;
  const marker = icon
    ? `<span class="v3-run-marker">${icon}</span>`
    : `<span class="v3-order-tile${tileClass || ""}">${escapeHtml(shown)}</span>`;
  const titleLead = icon ? `<span class="v3-run-order">#${escapeHtml(shown)}</span>` : "";
  return `
    <button class="v3-queue-row${icon ? " v3-queue-row-terminal" : ""}${rowClass || ""}" type="button" data-v3-run="${escapeHtml(run.run_id)}">
      ${marker}
      <span class="v3-run-info">
        <span class="v3-run-title">${titleLead}${escapeHtml(run.title)}${tags || ""}</span>
        <span class="v3-run-summary">${escapeHtml(run.summary)}</span>
      </span>
      ${cells || ""}
      ${chip ? `<span class="v3-row-chip">${chip}</span>` : ""}
      <span class="v3-row-chevron">${v3Chevron(13)}</span>
    </button>
  `;
}

function v3PhaseBlock(phase, model, visibleRuns) {
  // [D-051] `visibleRuns` is the lane-filtered subset the caller computed (all runs when
  // no lane is selected). The ratio describes what is on screen, so it derives from the
  // same subset.
  const runs = visibleRuns || phase.runs || [];
  // PH-D band: caret + phase title + derived ratio. Phases open by default inside an
  // open objective (approved handoff) and keep their local expand state for the session.
  return `
    <details class="v3-phase" open data-v3edit-phase="${escapeHtml(phase.phase_id)}">
      <summary class="v3-phase-header">
        <span class="v3-caret">${v3Chevron(11)}</span>
        <span class="v3-phase-title">${escapeHtml(phase.title)}</span>
        <span class="v3-phase-ratio">${escapeHtml(v3PhaseRatio(runs))}</span>
      </summary>
      <div class="v3-run-list">
        ${runs.map((run) => v3RoadmapRunRow(run, model)).join("")}
      </div>
    </details>
  `;
}

// ---------------------------------------------------------------------------
// [D-051] Lane selector — the minimal view. It lives INSIDE the existing subview
// toolbar row (no new row), renders ONLY when the project declares MORE THAN ONE
// lane (a one-lane project sees nothing new), and filters whichever Roadmap
// subview is active without switching it. State is v3SelectedLane, reset per
// project. The options are the DECLARED lanes, verbatim: no key is known here.
// ---------------------------------------------------------------------------

function v3LaneFilterActive(model) {
  return !!(model && model.lanes && v3SelectedLane && model.laneById.has(v3SelectedLane));
}

// [#48] The batch filter's own predicate, the lane one copied onto the sibling state.
function v3BatchFilterActive(model) {
  return !!(model && model.batches && v3SelectedBatch && model.batchById.has(v3SelectedBatch));
}

// [#48] Either filter narrows the visible subset; both surfaces read through here, so the
// two compose by construction (a run must pass both). With neither active this returns its
// input untouched, exactly as before batches existed.
function v3AnyRunFilterActive(model) {
  return v3LaneFilterActive(model) || v3BatchFilterActive(model);
}

function v3VisibleRuns(model, runs) {
  let visible = runs;
  if (v3LaneFilterActive(model)) visible = visible.filter((run) => model.laneOf(run) === v3SelectedLane);
  // [#48] The batch filter has no default to resolve through: batchOf is the run's own
  // stored key or null, so only runs genuinely IN the selected batch survive it.
  if (v3BatchFilterActive(model)) visible = visible.filter((run) => model.batchOf(run) === v3SelectedBatch);
  return visible;
}

function renderLaneSelector(model) {
  const slot = byId("roadmap-lane-slot");
  if (!slot) return;
  if (!model || !model.lanes || model.lanes.length < 2) {
    slot.innerHTML = "";
    return;
  }
  // A selected lane that the (re)loaded tree no longer declares falls back to all lanes.
  if (v3SelectedLane && !model.laneById.has(v3SelectedLane)) v3SelectedLane = null;
  const counts = new Map();
  model.allRuns.forEach((run) => {
    const laneId = model.laneOf(run);
    counts.set(laneId, (counts.get(laneId) || 0) + 1);
  });
  const options = [
    `<option value=""${v3SelectedLane ? "" : " selected"}>All lanes (${model.allRuns.length})</option>`,
    ...model.lanes.map((lane) => {
      const isDefault = lane.lane_id === model.defaultLane;
      return `<option value="${escapeHtml(lane.lane_id)}"${v3SelectedLane === lane.lane_id ? " selected" : ""}>${escapeHtml(lane.lane_id)} — ${escapeHtml(lane.title)}${isDefault ? " (default)" : ""} (${counts.get(lane.lane_id) || 0})</option>`;
    })
  ].join("");
  slot.innerHTML = `
    <label class="v3-lane-picker">
      <span class="v3-lane-picker-label">Lane</span>
      <select id="v3-lane-select" class="v3-lane-select" aria-label="Filter roadmap by lane">${options}</select>
    </label>
  `;
  if (slot.dataset.laneWired !== "true") {
    slot.dataset.laneWired = "true";
    slot.addEventListener("change", (event) => {
      const select = event.target.closest("#v3-lane-select");
      if (!select) return;
      v3SelectedLane = select.value || null;
      // Re-render both Roadmap subviews in place; the active subview (and the whole
      // chrome) stays exactly where it was — only the rows change.
      if (appData) {
        renderRunQueueV3(appData);
        renderRoadmapV3(appData);
        if (v3EditMode) v3DecorateTreeEditAffordances();
      }
    });
  }
}

// ---------------------------------------------------------------------------
// [#48] Batch selector — the lane selector copied onto the sibling vocabulary: a dropdown
// in the same toolbar row showing batches instead of lanes, filtering whichever Roadmap
// subview is active without switching it. State is v3SelectedBatch, reset per project.
// The options are the DECLARED batches, verbatim: no key is known here.
//
// Two deliberate divergences from renderLaneSelector, each with its reason:
//   - it renders whenever the project declares ANY batch (lanes hide below two because a
//     one-lane project puts every run in that lane and the filter cannot narrow anything;
//     one declared batch still splits the runs into in-it and outside-it, so the filter
//     already means something);
//   - its slot is CREATED here, beside the lane slot, instead of living in index.html —
//     that file is outside this run's write scope, and an empty div is presentation, not
//     data. The slot is removed when the project declares no batches, so a batch-less
//     project renders byte-identical toolbar markup to what it rendered before batches
//     existed.
// ---------------------------------------------------------------------------

function renderBatchSelector(model) {
  const laneSlot = byId("roadmap-lane-slot");
  let slot = byId("roadmap-batch-slot");
  if (!model || !model.batches) {
    if (slot) slot.remove();
    return;
  }
  if (!slot) {
    if (!laneSlot || !laneSlot.parentNode) return;
    slot = document.createElement("div");
    slot.className = "roadmap-lane-slot";
    slot.id = "roadmap-batch-slot";
    laneSlot.parentNode.insertBefore(slot, laneSlot.nextSibling);
  }
  // A selected batch that the (re)loaded tree no longer declares falls back to all batches.
  if (v3SelectedBatch && !model.batchById.has(v3SelectedBatch)) v3SelectedBatch = null;
  const counts = new Map();
  model.allRuns.forEach((run) => {
    const batchId = model.batchOf(run);
    if (batchId) counts.set(batchId, (counts.get(batchId) || 0) + 1);
  });
  const options = [
    `<option value=""${v3SelectedBatch ? "" : " selected"}>All batches (${model.allRuns.length})</option>`,
    ...model.batches.map((batch) =>
      `<option value="${escapeHtml(batch.batch_id)}"${v3SelectedBatch === batch.batch_id ? " selected" : ""}>${escapeHtml(batch.batch_id)} — ${escapeHtml(batch.title)} (${counts.get(batch.batch_id) || 0})</option>`)
  ].join("");
  slot.innerHTML = `
    <label class="v3-lane-picker">
      <span class="v3-lane-picker-label">Batch</span>
      <select id="v3-batch-select" class="v3-lane-select" aria-label="Filter roadmap by batch">${options}</select>
    </label>
  `;
  if (slot.dataset.batchWired !== "true") {
    slot.dataset.batchWired = "true";
    slot.addEventListener("change", (event) => {
      const select = event.target.closest("#v3-batch-select");
      if (!select) return;
      v3SelectedBatch = select.value || null;
      // Re-render both Roadmap subviews in place, the lane selector's own gesture.
      if (appData) {
        renderRunQueueV3(appData);
        renderRoadmapV3(appData);
        if (v3EditMode) v3DecorateTreeEditAffordances();
      }
    });
  }
}

function v3ToggleQueueGroup(toggle) {
  const expanded = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", expanded ? "false" : "true");
  const body = document.getElementById(toggle.getAttribute("aria-controls"));
  if (body) body.hidden = expanded;
  const count = toggle.querySelector(".v3-queue-group-count");
  if (count && !count.classList.contains("is-zero")) count.classList.toggle("is-active", !expanded);
}

function v3AttachHandlers(container, options) {
  if (!container || container.dataset.v3Wired === "true") return;
  container.dataset.v3Wired = "true";
  const nested = !!(options && options.nested);
  const origin = options && options.origin;
  container.addEventListener("click", (event) => {
    const groupToggle = event.target.closest("[data-v3-group]");
    if (groupToggle && container.contains(groupToggle)) {
      v3ToggleQueueGroup(groupToggle);
      return;
    }
    const backTrigger = event.target.closest("[data-v3-back]");
    if (backTrigger && container.contains(backTrigger)) {
      v3BackRunDetail();
      return;
    }
    // [#53] The run's own report. Handled here and only here: the trigger exists only inside a
    // run detail, so there is no surface from which a report opens without a run.
    const reportTrigger = event.target.closest("[data-run-report-open]");
    if (reportTrigger && container.contains(reportTrigger)) {
      v3OpenRunReport(reportTrigger.getAttribute("data-run-report-open"));
      return;
    }
    const trigger = event.target.closest("[data-v3-run]");
    if (!trigger || !container.contains(trigger)) return;
    // Row containers open a fresh root detail and record the origin subview for the
    // stack-root Back control; the drawer (header + body) pushes a dependency.
    if (!nested && origin) v3DetailOrigin = origin;
    v3OpenRunDetail(trigger.dataset.v3Run, nested ? "push" : "root");
  });
}

function v3AttachArchiveToggle(container) {
  // Archive header toggle in the Roadmap tree. Uses its OWN attribute set
  // (data-v3-archive-toggle), never data-v3-group, which v3AttachHandlers delegates to
  // v3ToggleQueueGroup and would otherwise capture these clicks. UI-only, idempotent.
  if (!container || container.dataset.v3ArchiveWired === "true") return;
  container.dataset.v3ArchiveWired = "true";
  container.addEventListener("click", (event) => {
    const toggle = event.target.closest("[data-v3-archive-toggle]");
    if (!toggle || !container.contains(toggle)) return;
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", expanded ? "false" : "true");
    const body = document.getElementById(toggle.getAttribute("aria-controls"));
    if (body) body.hidden = expanded;
  });
}

function v3PhaseSortKey(phase) {
  // Derived ordering key: the queue_order of the next piece of work the phase actually holds --
  // the lowest queue_order among runs whose status is neither "completed" nor "blocked". If every
  // run is finished (completed/blocked), fall back to the lowest queue_order among ALL runs so a
  // finished phase keeps its historical place instead of jumping to the front or back. A phase
  // with zero runs sorts last (Infinity). Nothing is stored; this is derived at render time.
  const runs = Array.isArray(phase.runs) ? phase.runs : [];
  if (!runs.length) return Infinity;
  const incomplete = runs.filter((r) => r && r.status !== "completed" && r.status !== "blocked");
  const pool = incomplete.length ? incomplete : runs;
  return pool.reduce((min, r) => Math.min(min, r.queue_order), Infinity);
}

function v3SortedPhases(phases) {
  // Return a SORTED COPY -- .slice() first so the model's objective.phases arrays are never
  // mutated (other code reads them in file order). Array.prototype.sort is stable, so phases
  // with the same key keep their file order.
  return (Array.isArray(phases) ? phases.slice() : []).sort((a, b) => v3PhaseSortKey(a) - v3PhaseSortKey(b));
}

function renderRoadmapV3(data) {
  const container = byId("roadmap-v3-tree");
  if (!container) return;
  const model = v3Model(data);
  if (!model) {
    v3Unavailable("roadmap-v3-tree", roadmapAbsenceMessage(data));
    return;
  }
  roadmapV3ModelCache = model;
  renderLaneSelector(model);
  renderBatchSelector(model);
  // [#48] Either filter (lane or batch) switches the tree into filtered display: empty
  // phases/objectives are omitted and stats derive from the visible subset, exactly as
  // the lane filter alone always did.
  const filtering = v3AnyRunFilterActive(model);
  const objectiveCard = (objective) => {
    const phases = objective.phases || [];
    const objectiveRuns = [];
    // [D-051] The lane filter narrows what this card shows; stats and ratios derive from
    // the same visible subset. Phases (and objectives, below) left with zero visible
    // runs are omitted while the filter is on — a display filter, not a data claim.
    const visiblePhases = [];
    phases.forEach((phase) => {
      const visible = v3VisibleRuns(model, phase.runs || []);
      if (visible.length || !filtering) visiblePhases.push({ phase, visible });
      visible.forEach((run) => objectiveRuns.push(run));
    });
    if (filtering && !objectiveRuns.length) return "";
    // Progressive disclosure: only the objective on the active decision path opens by
    // default; the footer disclosure keeps the identical "Phases" label open or closed.
    const hasActive = objectiveRuns.some((run) => run.status === "active");
    const sorted = v3SortedPhases(visiblePhases.map((entry) => entry.phase));
    const visibleByPhase = new Map(visiblePhases.map((entry) => [entry.phase, entry.visible]));
    return `
      <div class="v3-objective-card" data-v3edit-objective="${escapeHtml(objective.objective_id)}">
        <div class="v3-objective-title">${escapeHtml(objective.title)}</div>
        ${v3ObjectiveStats(objectiveRuns)}
        <details class="v3-phases-details"${hasActive ? " open" : ""}>
          <summary class="v3-phases-toggle">Phases<span class="v3-caret">${v3Chevron(11)}</span></summary>
          <div class="v3-phase-list">
            ${sorted.map((phase) => v3PhaseBlock(phase, model, visibleByPhase.get(phase))).join("")}
          </div>
        </details>
      </div>
    `;
  };
  const allObjectives = model.roadmap.objectives || [];
  const liveObjectives = allObjectives.filter((objective) => objective.archived !== true);
  const archivedObjectives = allObjectives.filter((objective) => objective.archived === true);
  const archivedCards = archivedObjectives.map(objectiveCard).join("");
  const archiveHtml = archivedCards
    ? `<div class="v3-archive-section"><button class="v3-archive-toggle" type="button" data-v3-archive-toggle aria-expanded="false" aria-controls="v3-archive-body"><span class="v3-caret">${v3Chevron(11)}</span><span class="v3-archive-title">Archive</span></button><div class="v3-archive-body" id="v3-archive-body" hidden>${archivedCards}</div></div>`
    : "";
  const cards = liveObjectives.map(objectiveCard).join("") + archiveHtml;
  // [#48] The empty note names the filter that emptied the view: lane, batch, or both.
  const emptyNote = v3LaneFilterActive(model) && v3BatchFilterActive(model)
    ? "No runs on this lane in this batch yet."
    : v3BatchFilterActive(model) ? "No runs in this batch yet." : "No runs on this lane yet.";
  container.innerHTML = cards || (filtering
    ? `<div class="v3-empty-note">${emptyNote}</div>`
    : cards);
  v3AttachHandlers(container, { origin: "Roadmap" });
  v3AttachArchiveToggle(container);
}

// Sub-tab counts per the approved handoff: Run Queue shows pending runs (total minus
// History) and Roadmap shows the objective count. Counts are injected into the static
// segment buttons at render time; the index.html markup itself stays unchanged.
// [D-051] Counts derive from the lane-filtered visible subset — with no lane selected
// (every project today) that subset IS model.allRuns and nothing changes.
// [#48] The batch filter narrows the same way, through the same predicate the rows use
// (v3VisibleRuns), so the objective count always matches the cards actually painted.
function v3UpdateSubtabCounts(model, visibleRuns, historyCount) {
  const pending = visibleRuns.length - historyCount;
  const objectiveCount = v3AnyRunFilterActive(model)
    ? (model.roadmap.objectives || []).filter((objective) =>
        (objective.phases || []).some((phase) => v3VisibleRuns(model, phase.runs || []).length > 0)).length
    : model.roadmap.objectives.length;
  [["v3queue", pending], ["v3roadmap", objectiveCount]].forEach(([subview, value]) => {
    const segment = document.querySelector(`[data-subview="${subview}"]`);
    if (!segment) return;
    let count = segment.querySelector(".v3-subtab-count");
    if (!count) {
      count = document.createElement("span");
      count.className = "v3-subtab-count";
      segment.appendChild(count);
    }
    count.textContent = String(value);
  });
}

// Approved v3 Overview (target screenshot): Current work card (active run), Next up
// card (first ready planned run by queue order), Next action list (the next four
// pending runs after Next up, completed runs skipped), and the Queue snapshot grid.
// Everything derives from roadmap.json at render time; cards and rows open the
// shared v3 Run Detail in place with origin "Overview". Read-only throughout.
// Show or hide the WHOLE "Current work" card (eyebrow included), not just its body. Used by
// renderOverviewV3 to drop the block when there is no active run and no eligible next one.
// Every other path — an absent roadmap, a render error, a blanked project surface — states its
// absence INSIDE the card, so the card must be visible for them; renderOverviewV3 therefore
// restores visibility on entry and only hides on its own last line.
function v3SetOverviewCurrentWorkVisible(visible) {
  const root = byId("project-overview");
  if (!root) return;
  // Both the container and its card carry the state. The CARD is what the operator sees go —
  // hiding only the container would leave the "Current work" eyebrow standing over nothing —
  // and the container carries the same flag so that whatever writes into it later (the blanking
  // sweep, an absence message) cannot land inside a block that is on screen only by half.
  root.hidden = !visible;
  const card = typeof root.closest === "function" ? root.closest(".overview-card") : null;
  if (card) card.hidden = !visible;
}

// [#43] THE LIST THAT REPORTS AND DOES NOT REFUSE.
//
// §1: "the validator REPORTS live runs with no classification; it does NOT reject. The absence
// of a classification is information the console shows, not an error that prevents anything."
// So this renders as a NOTE beside the queue counters, not as a banner, not in red, and not as
// anything that counts:
//   - it does not touch `failedSources` and so cannot move the load-failure count;
//   - it disables no control and blocks no write;
//   - an empty list renders NOTHING, because "0 runs need classifying" is not news.
//
// The list is not derived here. It is READ from `validation_summary.reports`, which the emitter
// fills off the canonical — one computation of "who is unclassified", in the tool that owns the
// roadmap, rather than a second opinion in the renderer. A snapshot from an older emitter
// carries no such report and this surface simply does not appear.
function v3UnclassifiedNoteHtml(data) {
  const reports = data && data.snapshot && data.snapshot.validation_summary
    ? data.snapshot.validation_summary.reports
    : null;
  const report = Array.isArray(reports)
    ? reports.find((entry) => entry && entry.report === "unclassified_live_runs")
    : null;
  if (!report || !Array.isArray(report.runs) || !report.runs.length) return "";
  const runs = report.runs.slice().sort((a, b) => a.queue_order - b.queue_order);
  return `
    <div class="v3-ov-note" data-v3-unclassified>
      <span class="v3-ov-note-label">Unclassified live runs <span class="v3-ov-note-count">${runs.length}</span></span>
      <span class="v3-ov-note-body">These runs have no <code>classified_at</code> and are still live. This is information, not an error: nothing is blocked and nothing is refused. Closed runs are not listed — a run that will not execute again is not classified.</span>
      <span class="v3-ov-note-runs">
        ${runs.map((entry) => `<button class="v3-ov-note-run" type="button" data-v3-run="${escapeHtml(entry.run_id)}">#${escapeHtml(String(entry.queue_order))} ${escapeHtml(entry.title || entry.run_id)}</button>`).join("")}
      </span>
    </div>
  `;
}

// ---------------------------------------------------------------------------
// [#43] CARE BUDGET — the console's FIRST per-project configuration surface.
//
// Everything the console could already write was a RUN edit (set-text, set-status, set-lane,
// set-barrier, set-classification). `declare-lanes` proved a root write can travel the same
// endpoint, but it never had a screen: a project vocabulary could only be declared from a
// script. §5 says `care_budget` must be "editable desde la consola", so this is that screen.
//
// THREE RULES THIS SURFACE OBEYS, and each one is visible on it:
//
//   1. IT IS ADVICE, and it says so in words, in its own line, before any value. An operator
//      meeting this table for the first time has to be able to tell that deviating is allowed.
//      The sentence is not written here: it is `binding_note`, read from the envelope, so the
//      screen cannot say something the model does not.
//   2. A PROJECT WITH NO BUDGET READS AS *NOT CONFIGURED*, never as zero and never as the
//      defaults. The published defaults are shown BESIDE that state, labelled as not in effect,
//      as an OFFER — one button fills the form with them. Showing them as if they applied would
//      be inventing a configuration the project never made.
//   3. NO VALUE IN THIS FILE. The levels, the entry keys, the published defaults and the advice
//      sentence all come from `taxonomy_model.care_budget`. A snapshot from an emitter that does
//      not carry the block renders nothing at all, exactly as the unclassified note does.
//
// Reading the SNAPSHOT and not the canonical is not a preference either: the console never opens
// a canonical (PATHS has no route to one), so a `care_budget` that does not travel is a
// `care_budget` this screen cannot show.
// ---------------------------------------------------------------------------

// Draft values held across a re-render (the "fill with defaults" click re-renders the panel),
// and the previewed-but-unconfirmed write. Both are UI-only: nothing here reaches disk unless
// the operator previews AND confirms.
let careBudgetDraft = null;
let careBudgetPending = null;

// The declaration block, or null when this snapshot predates it. Never falls back to anything.
function careBudgetBlock(data) {
  const block = data && data.snapshot && data.snapshot.taxonomy_model
    ? data.snapshot.taxonomy_model.care_budget
    : null;
  if (!block || typeof block !== "object") return null;
  if (!Array.isArray(block.levels) || !block.levels.length) return null;
  return block;
}

// What the four inputs currently hold. Returns null when any is blank: a half-filled table is
// not a budget, and the preview says so rather than posting something the engine will refuse.
function careBudgetFormValues(block) {
  const slot = byId("roadmap-care-budget");
  if (!slot) return null;
  const out = {};
  for (const level of block.levels) {
    const model = slot.querySelector(`[data-care-budget-input="${level}.model"]`);
    const effort = slot.querySelector(`[data-care-budget-input="${level}.effort"]`);
    if (!model || !effort) return null;
    const modelValue = model.value.trim();
    const effortValue = effort.value.trim();
    if (!modelValue || !effortValue) return null;
    out[level] = { model: modelValue, effort: effortValue };
  }
  return out;
}

// True when the form differs from what the project has declared. Drives the preview button's
// refusal message, so "nothing to preview" is said instead of silently posting a no-op.
function careBudgetFormChanged(block) {
  const values = careBudgetFormValues(block);
  if (!values) return false;
  return JSON.stringify(values) !== JSON.stringify(block.declared || null);
}

function careBudgetRowsHtml(block, values, editable) {
  return block.levels.map((level) => {
    const entry = (values && values[level]) || null;
    const model = entry && typeof entry.model === "string" ? entry.model : "";
    const effort = entry && typeof entry.effort === "string" ? entry.effort : "";
    const cells = editable
      ? `<td><input class="care-budget-input" type="text" data-care-budget-input="${escapeHtml(level)}.model" value="${escapeHtml(model)}" aria-label="${escapeHtml(level)} model"></td>
         <td><input class="care-budget-input" type="text" data-care-budget-input="${escapeHtml(level)}.effort" value="${escapeHtml(effort)}" aria-label="${escapeHtml(level)} effort"></td>`
      : `<td>${model ? escapeHtml(model) : '<span class="care-budget-unset">—</span>'}</td>
         <td>${effort ? escapeHtml(effort) : '<span class="care-budget-unset">—</span>'}</td>`;
    return `<tr class="care-budget-row"><th scope="row" class="care-budget-level">${escapeHtml(level)}</th>${cells}</tr>`;
  }).join("");
}

function careBudgetTableHtml(block, values, editable) {
  return `
    <table class="care-budget-table">
      <thead><tr><th scope="col">severity</th><th scope="col">model</th><th scope="col">effort</th></tr></thead>
      <tbody>${careBudgetRowsHtml(block, values, editable)}</tbody>
    </table>
  `;
}

function renderCareBudget(data) {
  const slot = byId("roadmap-care-budget");
  if (!slot) return;
  const block = careBudgetBlock(data);
  if (!block) { slot.innerHTML = ""; return; }
  const configured = !!block.declared;
  const editable = v3EditMode;
  const values = configured ? block.declared : (editable ? careBudgetDraft : null);
  // The state line, and it is the whole point of F.3: absent reads as ABSENT.
  const state = configured
    ? '<span class="care-budget-state is-set">Configured</span>'
    : '<span class="care-budget-state is-unset">Not configured</span>';
  const reason = typeof block.declared_reason === "string" ? block.declared_reason : "";
  // The published defaults, shown ONLY when nothing is declared, and labelled as not in effect.
  const defaults = !configured && block.published_defaults
    ? `<details class="care-budget-defaults">
         <summary>Published defaults — <strong>not in effect</strong> for this project</summary>
         <div class="care-budget-defaults-body">
           ${careBudgetTableHtml({ levels: block.levels }, block.published_defaults, false)}
           <div class="care-budget-defaults-note">These are the values the specification publishes. This project has not adopted them, and nothing applies them on its behalf.${editable ? " Use <em>Fill with published defaults</em> below to adopt them as-is, or type your own." : ""}</div>
         </div>
       </details>`
    : "";
  const controls = editable
    ? `<div class="care-budget-controls">
         ${!configured ? '<button class="btn btn-secondary btn-sm" type="button" data-care-budget-defaults>Fill with published defaults</button>' : ""}
         <button class="btn btn-secondary btn-sm" type="button" data-care-budget-preview>Preview care budget</button>
         ${configured ? '<button class="btn btn-secondary btn-sm" type="button" data-care-budget-clear>Clear (back to not configured)</button>' : ""}
       </div>`
    : '<div class="care-budget-controls"><span class="care-budget-readonly">Turn on <strong>Edit roadmap</strong> to change this.</span></div>';
  slot.innerHTML = `
    <section class="care-budget-panel" aria-label="Care budget">
      <div class="care-budget-head">
        <span class="care-budget-title">Care budget</span>
        <span class="care-budget-scope">project configuration</span>
        ${state}
      </div>
      <div class="care-budget-advice"><span class="care-budget-binding">${escapeHtml(block.binding || "")}</span> ${escapeHtml(block.binding_note || "")}</div>
      ${reason ? `<div class="care-budget-reason">${escapeHtml(reason)}</div>` : ""}
      ${careBudgetTableHtml(block, values, editable)}
      ${defaults}
      ${controls}
      <div class="care-budget-preview" id="care-budget-preview" hidden></div>
    </section>
  `;
  careBudgetWire(slot);
}

function careBudgetSetPanel(html) {
  const panel = byId("care-budget-preview");
  if (!panel) return;
  panel.hidden = false;
  panel.innerHTML = html;
}

function careBudgetWire(slot) {
  if (slot.dataset.careBudgetWired === "true") return;
  slot.dataset.careBudgetWired = "true";
  slot.addEventListener("click", (event) => {
    if (event.target.closest("[data-care-budget-defaults]")) { careBudgetFillDefaults(); return; }
    if (event.target.closest("[data-care-budget-preview]")) { careBudgetPreview(false); return; }
    if (event.target.closest("[data-care-budget-clear]")) { careBudgetPreview(true); return; }
    if (event.target.closest("[data-care-budget-confirm]")) { careBudgetConfirm(); return; }
  });
}

function careBudgetFillDefaults() {
  const block = careBudgetBlock(appData);
  if (!block || !block.published_defaults) return;
  careBudgetDraft = block.published_defaults;
  renderCareBudget(appData);
  careBudgetSetPanel('<div class="care-budget-preview-status">The published defaults are in the form, and <strong>nothing is written yet</strong>. Edit any cell, then preview.</div>');
}

// Dry run -> confirm -> apply, against the same bounded endpoint every other write uses. The op
// is `declare-care-budget` and it carries NO run: this is a project configuration, and there is
// no run it could name.
async function careBudgetPreview(clearing) {
  const block = careBudgetBlock(appData);
  if (!block) return;
  let careBudget = null;
  if (!clearing) {
    careBudget = careBudgetFormValues(block);
    if (!careBudget) {
      careBudgetSetPanel('<div class="care-budget-preview-status">Every level needs a model and an effort before this can be previewed. A budget that is silent on one severity would be advice with a hole in it.</div>');
      return;
    }
    if (!careBudgetFormChanged(block)) {
      careBudgetSetPanel('<div class="care-budget-preview-status">No changes to preview — the form matches what this project already declares.</div>');
      return;
    }
  }
  careBudgetSetPanel('<div class="care-budget-preview-status">Previewing (dry run)...</div>');
  const result = await v3EditPost({ op: "declare-care-budget", apply: false, args: { careBudget } });
  if (result.networkError) {
    careBudgetSetPanel('<div class="care-budget-preview-status is-refused">The roadmap write endpoint is not reachable. Nothing was written.</div>');
    return;
  }
  if (!result.json || !result.json.ok) {
    const errors = result.json && Array.isArray(result.json.errors) ? result.json.errors : [];
    careBudgetSetPanel(`
      <div class="care-budget-preview-status is-refused"><strong>Refusing; nothing written.</strong></div>
      ${errors.length ? `<ul class="care-budget-preview-errors">${errors.map((e) => `<li>${escapeHtml(String(e))}</li>`).join("")}</ul>` : ""}
    `);
    return;
  }
  careBudgetPending = { careBudget, baseline: result.json.baseline };
  const before = block.declared;
  const rows = block.levels.map((level) => {
    const b = before && before[level] ? `${before[level].model} · ${before[level].effort}` : "(not configured)";
    const a = careBudget && careBudget[level] ? `${careBudget[level].model} · ${careBudget[level].effort}` : "(not configured)";
    return `<tr${b === a ? "" : ' class="is-changed"'}><th scope="row">${escapeHtml(level)}</th><td>${escapeHtml(b)}</td><td>-&gt;</td><td>${escapeHtml(a)}</td></tr>`;
  }).join("");
  careBudgetSetPanel(`
    <div class="care-budget-preview-title">Preview: declare-care-budget</div>
    <table class="care-budget-preview-table"><tbody>${rows}</tbody></table>
    <div class="care-budget-preview-note">This writes <code>root.care_budget</code> — a setting of the PROJECT. It classifies nothing, changes no run, and blocks nothing: runs already classified stay exactly as they are, including any that sit outside this budget.</div>
    <button class="btn btn-primary btn-sm" type="button" data-care-budget-confirm>Confirm and write</button>
  `);
}

async function careBudgetConfirm() {
  if (!careBudgetPending) return;
  const pending = careBudgetPending;
  careBudgetSetPanel('<div class="care-budget-preview-status">Writing (apply)...</div>');
  const result = await v3EditPost({ op: "declare-care-budget", apply: true, baseline: pending.baseline, args: { careBudget: pending.careBudget } });
  if (result.networkError) {
    careBudgetSetPanel('<div class="care-budget-preview-status is-refused">The roadmap write endpoint is not reachable. Nothing was written.</div>');
    return;
  }
  if (result.json && result.json.ok) {
    careBudgetPending = null;
    careBudgetDraft = null;
    careBudgetSetPanel('<div class="care-budget-preview-status is-ok"><strong>Applied.</strong> The roadmap was written and re-read; the validator passed. Re-emit <code>.project/</code> for this panel to show the new value.</div>');
    return;
  }
  const reason = result.json && result.json.reason === "stale_baseline"
    ? "The roadmap changed since this preview. Nothing was written; preview again."
    : "The write was refused; nothing changed on disk.";
  careBudgetSetPanel(`<div class="care-budget-preview-status is-refused">${escapeHtml(reason)}</div>`);
}

function renderOverviewV3(data) {
  const currentWorkRoot = byId("project-overview");
  const nextActionRoot = byId("next-pending-runs");
  const snapshotRoot = byId("overview-activity");
  if (!currentWorkRoot || !nextActionRoot || !snapshotRoot) return;
  v3SetOverviewCurrentWorkVisible(true);
  const model = v3Model(data);
  if (!model) {
    v3Unavailable("project-overview", roadmapAbsenceMessage(data));
    nextActionRoot.innerHTML = "";
    snapshotRoot.innerHTML = "";
    return;
  }
  roadmapV3ModelCache = model;
  setOverviewCardTitles();
  const runs = model.allRuns.slice().sort((a, b) => a.queue_order - b.queue_order);
  // The SEMANTIC labels (five keys), not the Run Queue's four display sections. Reading the
  // display table here is what made `ready_next` and `later` miss and fall back to a literal.
  const groupLabels = ROADMAP_V3_QUEUE_GROUP_LABELS;
  // "Current work item" means a run that is RUNNING. There is no fallback to the head of the
  // queue: that fallback painted whatever sat at #1 — routinely a COMPLETED run — under a label
  // asserting it was the current work. With no active run the block shows the next eligible run
  // under "Next up" instead, and with neither it hides entirely (below).
  const active = runs.find((run) => run.status === "active") || null;
  const activeGroupLabel = active ? groupLabels[v3QueueGroupKey(active, model.runsById, model)] : "";
  // [D-051] "Ready" here mirrors v3QueueGroupKey's ready_next: dependencies satisfied AND
  // no incomplete barrier bars the run — Next up must never name a run a barrier holds.
  const ready = runs.filter((run) => run.status === "planned" &&
    (run.depends_on || []).every((id) => model.runsById.get(id)?.status === "completed") &&
    !v3BarrierBlockersFor(model, run).length);
  const nextWork = ready[0] || null;
  const afterOrder = nextWork ? nextWork.queue_order : (active ? active.queue_order : 0);
  const upcoming = runs.filter((run) => run.status !== "completed" && run.queue_order > afterOrder).slice(0, 4);

  currentWorkRoot.innerHTML = `
    ${active ? `
    <button class="v3-ov-card" type="button" data-v3-run="${escapeHtml(active.run_id)}">
      <span class="v3-ov-label">Current work item</span>
      <span class="v3-ov-titleline"><span class="v3-ov-order">#${active.queue_order}</span><span class="v3-ov-title">${escapeHtml(active.title)}</span></span>
      <span class="v3-ov-chips">
        <span class="v3-ov-chip is-status-${escapeHtml(active.status)}">${escapeHtml(active.status)}</span>
        <span class="v3-ov-chip">${escapeHtml(activeGroupLabel)}</span>
      </span>
      <span class="v3-ov-summary">${escapeHtml(active.summary)}</span>
    </button>` : ""}
    ${nextWork ? `
    <button class="v3-ov-card v3-ov-card-next" type="button" data-v3-run="${escapeHtml(nextWork.run_id)}">
      <span class="v3-ov-label">Next up</span>
      <span class="v3-ov-titleline"><span class="v3-ov-order">#${nextWork.queue_order}</span><span class="v3-ov-title">${escapeHtml(nextWork.title)}</span></span>
      <span class="v3-ov-chips">
        <span class="v3-ov-chip is-ready-next">${escapeHtml(groupLabels.ready_next)}</span>
        <span class="v3-ov-chip">Ready</span>
      </span>
      <span class="v3-ov-summary">${escapeHtml(nextWork.summary)}</span>
    </button>` : ""}
  `;
  // Neither a running run nor an eligible next one: the block has nothing true to say, so the
  // whole card goes — title included. An "Current work" eyebrow over an empty body reads as a
  // failed render; a card that is not there reads as what it is.
  v3SetOverviewCurrentWorkVisible(!!(active || nextWork));

  nextActionRoot.innerHTML = upcoming.length
    ? upcoming.map((run) => `
        <button class="v3-ov-upcoming" type="button" data-v3-run="${escapeHtml(run.run_id)}">
          <span class="v3-ov-upcoming-order">#${run.queue_order}</span>
          <span class="v3-ov-upcoming-body">
            <span class="v3-ov-upcoming-title">${escapeHtml(run.title)}</span>
            <span class="v3-ov-upcoming-summary">${escapeHtml(run.summary)}</span>
          </span>
        </button>
      `).join("")
    : '<div class="v3-empty-note">none — the queue has no further pending runs</div>';

  const groupCounts = { needs_human_decision: 0, now: 0, ready_next: 0, later: 0, history: 0 };
  runs.forEach((run) => {
    groupCounts[v3QueueGroupKey(run, model.runsById, model)] += 1;
  });
  const snapshotCells = [
    { label: "Needs Human Decision", n: groupCounts.needs_human_decision, cls: groupCounts.needs_human_decision ? "is-amber" : "is-muted" },
    { label: "Now", n: groupCounts.now, cls: "is-indigo" },
    { label: "Ready Next", n: groupCounts.ready_next, cls: "is-blue" },
    { label: "Later", n: groupCounts.later, cls: "is-soft" },
    { label: "History", n: groupCounts.history, cls: "is-green" },
    { label: "Pending runs", n: runs.length - groupCounts.history, cls: "is-strong" }
  ];
  snapshotRoot.innerHTML = `
    <div class="v3-ov-snapshot">
      ${snapshotCells.map((cell) => `<span class="v3-ov-snapshot-cell"><span class="v3-ov-snapshot-label">${escapeHtml(cell.label)}</span><span class="v3-ov-snapshot-num ${cell.cls}">${cell.n}</span></span>`).join("")}
    </div>
    ${v3UnclassifiedNoteHtml(data)}
  `;
  v3AttachHandlers(byId("tab-overview"), { origin: "Overview" });
}

// ==================== Git commit history (History tab) ====================
// Renders the repository's Git commit history from the derived read-only snapshot at
// PATHS.gitHistory, written by its own emitter. This console only READS it: it runs no Git
// command, and it never rebuilds or writes the snapshot.
// Branch pills come only from snapshot branches (never invented); commits render
// reverse-chronologically for the selected branch, bucketed Today / Yesterday / Earlier
// with render-time relative times. A commit shows a run link only when the snapshot
// carries an explicit, canonical-verified run_id; otherwise the association stays blank.
// No events, ledger entries, AI reviews, or Human QA records are rendered here.
// While the History tab is active the snapshot is re-fetched (no-store) and the list
// re-renders only when the snapshot version marker changes, so a commit / branch switch /
// pull / merge appears without a manual reload. UI-only; nothing is persisted.
let historySelectedBranch = null;
let historyVersionMarker = null;
let historyPollTimer = null;
let historyRefreshing = false;
let historyManualSyncing = false;
let historySyncState = { kind: "idle", text: "" };

function histSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function histRelativeTime(dateValue, now) {
  const then = new Date(dateValue);
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (histSameDay(then, now)) {
    const minutes = Math.floor((now - then) / 60000);
    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m ago`;
    return `${Math.floor(minutes / 60)}h ago`;
  }
  if (histSameDay(then, yesterday)) return "yesterday";
  const days = Math.floor((now - then) / 86400000);
  if (days <= 30) return `${days}d ago`;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[then.getMonth()]} ${then.getDate()}${then.getFullYear() === now.getFullYear() ? "" : ` ${then.getFullYear()}`}`;
}

function histDateBucket(dateValue, now) {
  const then = new Date(dateValue);
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (histSameDay(then, now)) return "Today";
  if (histSameDay(then, yesterday)) return "Yesterday";
  return "Earlier";
}

// Presentation-only guard for accidental commit messages whose subject is a captured
// shell prompt / terminal transcript fragment (e.g. "PS C:\...>" or "C:\Users\...>").
// This never mutates the snapshot or Git history; it only cleans the displayed title.
// Detection is anchored at the start so real conventional-commit subjects are never hit.
function histIsNoiseSubject(subject) {
  const s = String(subject == null ? "" : subject).trim();
  if (!s) return true;
  if (/^PS\s+[A-Za-z]:\\/.test(s)) return true;
  if (/^[A-Za-z]:\\[^\n]*>/.test(s)) return true;
  return false;
}

function histCommitRow(commit, runsById, isLast) {
  // Run association renders only when the snapshot carries an explicit run_id that
  // resolves in the canonical v3 run set; every other commit keeps a blank
  // association (sha + time only), matching the prototype's empty state.
  const run = commit.run_id ? runsById.get(commit.run_id) : null;
  const runLink = run
    ? `<button class="v3-hist-run" type="button" data-v3-run="${escapeHtml(run.run_id)}">run #${run.queue_order}</button>`
    : "";
  // Sanitize non-descriptive shell/prompt subjects: show a neutral label as the row
  // title. The raw subject (an accidental terminal transcript) is intentionally NOT
  // placed in the tooltip - the tooltip stays a short neutral note so the UI never
  // exposes the transcript. The commit row, SHA, date, and branch behavior stay
  // unchanged. A flagged subject also suppresses the body (a transcript body would be
  // noise too); real commits are untouched.
  const noisy = histIsNoiseSubject(commit.subject);
  const displaySubject = noisy ? "Non-descriptive commit message" : commit.subject;
  const noisyTooltip = "Original commit message was a shell transcript and is hidden in the console.";
  const bodyText = noisy ? "" : text(commit.body, "").split(/\n{2,}/)[0].trim();
  return `
    <div class="v3-hist-row">
      <span class="v3-hist-rail">
        <span class="v3-hist-dot${commit.is_merge ? " is-merge" : ""}" aria-hidden="true"></span>
        ${isLast ? "" : '<span class="v3-hist-line" aria-hidden="true"></span>'}
      </span>
      <span class="v3-hist-body">
        <span class="v3-hist-subject${noisy ? " is-noise" : ""}"${noisy ? ` title="${escapeHtml(noisyTooltip)}"` : ""}>${escapeHtml(displaySubject)}</span>
        ${bodyText ? `<span class="v3-hist-message">${escapeHtml(bodyText)}</span>` : ""}
        <span class="v3-hist-meta">
          ${runLink}
          <span class="v3-hist-sha" title="${escapeHtml(commit.full_sha)}">${escapeHtml(commit.sha)}</span>
          <span class="v3-hist-time">${escapeHtml(histRelativeTime(commit.date, new Date()))}</span>
        </span>
      </span>
    </div>
  `;
}

// Defensive History filter: local backup/safety branches (backup/*) never appear in the
// human-facing branch tabs, even if an older snapshot still lists them. Mirrors the
// builder's isHiddenHistoryBranch; UI-only, never mutates Git or the snapshot file.
const HISTORY_HIDDEN_BRANCH = /^backup\//;
function historyVisibleBranches(list) {
  return (Array.isArray(list) ? list : []).filter(
    (branch) => typeof branch === "string" && branch.trim() && !HISTORY_HIDDEN_BRANCH.test(branch)
  );
}
function historyDefaultBranch(branches, currentBranch) {
  // Which branch tab opens selected. The snapshot's own current_branch decides it; the source
  // console then named one of its working branches as a second preference, which is identity —
  // a branch name is as project-specific as a run id. That preference is gone. `main` stays as a
  // generic convention, and the first visible branch is the final fallback.
  if (currentBranch && branches.includes(currentBranch)) return currentBranch;
  if (branches.includes("main")) return "main";
  return branches[0];
}

function renderCommitHistory(data) {
  const container = byId("history-list");
  if (!container) return;
  const snapshot = data && data.gitHistory;
  // The gate on SHAPE, not on a vendor schema string. The source console required
  // an exact schema string carrying a project name inside a format identifier, and that was
  // the one thing that made this view refuse another project's history. What the renderer actually
  // needs is what it reads: a branch list and a commit list. A file that has them renders; a file
  // that does not falls to the empty state below, exactly as an absent file does.
  if (!snapshot || !Array.isArray(snapshot.branches) || !snapshot.branches.length || !Array.isArray(snapshot.commits)) {
    container.innerHTML = `
      <div class="readonly-banner">
        <strong>Commit history unavailable.</strong>
        <span>${escapeHtml(displaySourcePath(PATHS.gitHistory))} could not be loaded. The rest of the Project Console is unaffected.</span>
      </div>
    `;
    return;
  }
  const branches = historyVisibleBranches(snapshot.branches);
  if (!branches.length) {
    container.innerHTML = `
      <div class="v3-empty-note">no visible branches in the current snapshot</div>
    `;
    return;
  }
  if (!historySelectedBranch || !branches.includes(historySelectedBranch)) {
    historySelectedBranch = historyDefaultBranch(branches, snapshot.current_branch);
  }
  const model = v3Model(data);
  const runsById = model ? model.runsById : new Map();
  const now = new Date();
  const commits = snapshot.commits
    .filter((commit) => commit.branch === historySelectedBranch)
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const pills = branches.map((branch) => {
    const active = branch === historySelectedBranch;
    const tint = branch === "main" ? " tint-green" : " tint-indigo";
    return `<button class="v3-hist-branch${active ? " is-active" : tint}" type="button" data-hist-branch="${escapeHtml(branch)}" aria-pressed="${active ? "true" : "false"}">${escapeHtml(branch)}</button>`;
  }).join("");
  const groups = [];
  commits.forEach((commit) => {
    const bucket = histDateBucket(commit.date, now);
    const last = groups[groups.length - 1];
    if (!last || last.label !== bucket) groups.push({ label: bucket, commits: [commit] });
    else last.commits.push(commit);
  });
  const groupBlocks = groups.map((group) => `
    <div class="v3-hist-group">
      <div class="v3-hist-group-label">${escapeHtml(group.label)}</div>
      ${group.commits.map((commit, index) => histCommitRow(commit, runsById, index === group.commits.length - 1)).join("")}
    </div>
  `).join("");
  container.innerHTML = `
    <div class="v3-hist-head">
      <div class="v3-hist-branches">${pills}</div>
      <div class="v3-hist-sync-controls">
        <button class="v3-hist-sync-btn" type="button" data-hist-sync${historyManualSyncing ? " disabled" : ""}>Sync History</button>
        <span class="v3-hist-sync-state is-${historySyncState.kind}" role="status" aria-live="polite">${escapeHtml(historySyncState.text)}</span>
      </div>
    </div>
    ${groupBlocks || '<div class="v3-empty-note">no commits on this branch in the current snapshot</div>'}
  `;
  if (container.dataset.histWired !== "true") {
    container.dataset.histWired = "true";
    // Single-selection branch pills: clicking a pill re-renders the list for that
    // branch. Local UI state only; never persisted.
    container.addEventListener("click", (event) => {
      const syncBtn = event.target.closest("[data-hist-sync]");
      if (syncBtn && container.contains(syncBtn)) {
        manualSyncHistory();
        return;
      }
      const pill = event.target.closest("[data-hist-branch]");
      if (!pill || !container.contains(pill)) return;
      if (pill.getAttribute("data-hist-branch") === historySelectedBranch) return;
      historySelectedBranch = pill.getAttribute("data-hist-branch");
      renderCommitHistory(appData);
    });
  }
  // Run links (when present) open the shared v3 Run Detail in place, origin History.
  v3AttachHandlers(byId("tab-history"), { origin: "History" });
}

// Cheap version marker: changes whenever the server regenerates the snapshot (new HEAD,
// rebuild time, commit count, or current branch). Tolerant of the legacy manual-export
// shape (no head/generated_at) so an older snapshot still works.
function historySnapshotMarker(snapshot) {
  if (!snapshot) return "none";
  const commitTotal = snapshot.commit_total != null
    ? snapshot.commit_total
    : (Array.isArray(snapshot.commits) ? snapshot.commits.length : 0);
  return [
    snapshot.head || "",
    snapshot.generated_at || snapshot.exported_at || "",
    commitTotal,
    snapshot.current_branch || ""
  ].join("|");
}

// Quiet fetch that does not touch loadedSources/failedSources, so History polling never
// pollutes the Console Diagnostics panel. Cache is disabled so a rebuilt snapshot is always seen.
async function fetchGitHistorySnapshot() {
  try {
    const response = await fetch(PATHS.gitHistory, { cache: "no-store" });
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    return null;
  }
}

// Re-fetch the snapshot and re-render only when its version marker changed. A transient
// fetch failure keeps the last good render (never clobbers History with a banner). The
// user's selected branch is preserved by renderCommitHistory when it still exists.
async function refreshGitHistory() {
  if (historyRefreshing) return;
  if (typeof document !== "undefined" && document.hidden) return;
  historyRefreshing = true;
  try {
    const snapshot = await fetchGitHistorySnapshot();
    if (!snapshot) return;
    const marker = historySnapshotMarker(snapshot);
    if (marker === historyVersionMarker) return;
    historyVersionMarker = marker;
    if (appData) appData.gitHistory = snapshot;
    renderCommitHistory(appData || { gitHistory: snapshot });
  } finally {
    historyRefreshing = false;
  }
}

// Poll only while the History tab is active; stopped when leaving History.
function startHistoryAutoRefresh() {
  if (historyPollTimer) return;
  historyPollTimer = setInterval(refreshGitHistory, 8000);
}

function stopHistoryAutoRefresh() {
  if (historyPollTimer) {
    clearInterval(historyPollTimer);
    historyPollTimer = null;
  }
}

// Reflect the current manual-sync state on the button + inline status without a full
// History re-render (used for the transient "Syncing…" state and terminal messages).
function updateHistorySyncUi() {
  const button = document.querySelector("[data-hist-sync]");
  if (button) button.disabled = historyManualSyncing;
  const state = document.querySelector(".v3-hist-sync-state");
  if (state) {
    state.className = `v3-hist-sync-state is-${historySyncState.kind}`;
    state.textContent = historySyncState.text;
  }
}

// Manual History sync: POST to the local server so it rebuilds the read-only Git history
// snapshot, then re-fetch the snapshot (no-store) and re-render History in place. This is a
// local-only fallback for the auto-sync — it never claims cloud sync, and it never fakes a
// success when the server (or its read-only Git build) reports failure.
async function manualSyncHistory() {
  if (historyManualSyncing) return;
  // The route is composed per active project (O4.P12). The null guard only covers a sync
  // fired before any project base was set; the endpoint itself refuses, with a named reason,
  // a project the emitter does not serve.
  if (!PATHS || !PATHS.historySync) {
    historySyncState = { kind: "failed", text: "Sync unavailable — no active project selected." };
    updateHistorySyncUi();
    return;
  }
  historyManualSyncing = true;
  historySyncState = { kind: "syncing", text: "Syncing…" };
  updateHistorySyncUi();
  try {
    let response;
    let payload = null;
    try {
      response = await fetch(PATHS.historySync, {
        method: "POST",
        cache: "no-store",
        headers: { Accept: "application/json" }
      });
      payload = await response.json().catch(() => null);
    } catch (error) {
      // Most likely the console is open without the local server (plain static host).
      historySyncState = { kind: "failed", text: "Sync failed — local Project Console server not reachable." };
      return;
    }
    if (!response.ok || !payload || payload.ok !== true) {
      const reason = payload && payload.reason ? payload.reason : `HTTP ${response.status}`;
      historySyncState = { kind: "failed", text: `Sync failed — ${reason}.` };
      return;
    }
    // Server rebuilt the snapshot; pull the fresh file and re-render (branch preserved by
    // renderCommitHistory, which falls back safely if the selected branch disappeared).
    const snapshot = await fetchGitHistorySnapshot();
    historySyncState = { kind: "synced", text: "Refreshed" };
    if (snapshot) {
      historyVersionMarker = historySnapshotMarker(snapshot);
      if (appData) appData.gitHistory = snapshot;
      renderCommitHistory(appData || { gitHistory: snapshot });
    }
  } finally {
    historyManualSyncing = false;
    updateHistorySyncUi();
  }
}

function renderRunQueueV3(data) {
  const container = byId("run-queue-v3");
  if (!container) return;
  const model = v3Model(data);
  if (!model) {
    v3Unavailable("run-queue-v3", roadmapAbsenceMessage(data));
    return;
  }
  roadmapV3ModelCache = model;
  renderLaneSelector(model);
  renderBatchSelector(model);
  // [D-051] The lane filter narrows which runs the queue lists; grouping semantics are
  // untouched. Sub-tab counts follow the same visible subset: the surface counts what
  // it shows. [#48] The batch filter rides the same subset.
  const visibleRuns = v3VisibleRuns(model, model.allRuns);
  const grouped = new Map(ROADMAP_V3_QUEUE_GROUPS.map((group) => [group.key, []]));
  visibleRuns.forEach((run) => {
    // Group by the DISPLAY key (ready_next + later collapse into "upcoming"); the
    // per-run SEMANTIC key is recomputed at row render time for the cells and chip.
    grouped.get(v3QueueDisplayGroup(v3QueueGroupKey(run, model.runsById, model))).push(run);
  });
  v3UpdateSubtabCounts(model, visibleRuns, grouped.get("history").length);
  const sections = ROADMAP_V3_QUEUE_GROUPS.map((group) => {
    const runs = grouped.get(group.key).slice().sort((a, b) => a.queue_order - b.queue_order);
    const defaultOpen = ROADMAP_V3_QUEUE_GROUP_DEFAULT_OPEN[group.key];
    const expanded = defaultOpen === "when_non_empty" ? runs.length > 0 : defaultOpen === true;
    const bodyId = `v3-queue-group-body-${group.key}`;
    const isHistory = group.key === "history";
    const rows = runs.length
      ? runs.map((run) => {
          // Display grouping merged ready_next + later into "upcoming"; recover the
          // SEMANTIC key per run so v3QueueRowCells still emits the Ready vs Planned
          // branch and the .is-later row class still keys on the semantic "later".
          const semanticKey = v3QueueGroupKey(run, model.runsById, model);
          const parts = v3QueueRowCells(run, semanticKey, model.runsById, model);
          // History rows lead with the semantic terminal marker via v3TerminalIcon while
          // #N demotes into the title line; the active run's order tile carries the tint
          // and Later rows recede slightly (prototype QR variants).
          const leadIcon = isHistory ? v3TerminalIcon(run.status) : "";
          const tileClass = run.status === "active" ? " is-active" : "";
          const rowClass = semanticKey === "later" ? " is-later" : "";
          return v3QueueRowHtml(run, leadIcon, parts.cells, parts.chip, tileClass, rowClass, v3RunRowTags(model, run), v3RunPosition(model, run));
        }).join("")
      : '<div class="v3-empty-note">Empty — no runs in this group right now.</div>';
    const countClass = runs.length === 0 ? " is-zero" : expanded ? " is-active" : "";
    return `
      <div class="v3-queue-group${runs.length ? "" : " is-empty"}">
        <button class="v3-queue-group-toggle" type="button" aria-expanded="${expanded ? "true" : "false"}" aria-controls="${bodyId}" data-v3-group="${group.key}">
          <span class="v3-queue-group-chevron">${v3Chevron(11)}</span>
          <span class="v3-queue-group-title">${escapeHtml(group.label)}</span>
          <span class="v3-queue-group-count${countClass}">${runs.length}</span>
        </button>
        <div class="v3-queue-group-body" id="${bodyId}"${expanded ? "" : " hidden"}>
          ${rows}
        </div>
      </div>
    `;
  }).join("");
  container.innerHTML = sections;
  v3AttachHandlers(container, { origin: "Run Queue" });
}

function v3DetailCell(label, valueHtml, cellClass) {
  return `<span class="v3-detail-cell${cellClass ? ` ${cellClass}` : ""}"><span class="v3-detail-cell-label">${escapeHtml(label)}</span><span class="v3-detail-cell-value">${valueHtml}</span></span>`;
}

// [#43] THE MINIMAL VIEW — the classification section of the run drawer.
//
// It shows the SIX STORED fields and the TWO DERIVED ones, and it never lets the operator
// mistake one kind for the other:
//   - the derived pair sits in its own block, labelled "Derived — computed at read time, never
//     stored", each value carrying the marker that names the table it came from. Nothing in
//     this block is an input, and the editor offers no control for either;
//   - a run with NO classification reads "Not classified yet", by name. It does not read as
//     empty, and it certainly does not read as MINOR: an unclassified run has no severity, and
//     printing the bottom of the scale would be inventing the answer the operator has not given;
//   - a run classified only in part shows what it carries and says which derived value is still
//     absent FOR WANT OF WHICH FIELD, so the gap is actionable instead of mysterious.
// [#45] THE SECOND DEPENDENCY LIST, on screen. Rendered ONLY for a run that carries the key:
// a run without it shows exactly the surface it showed before, with no empty section added.
//
// THE SCREEN LABEL IS WHERE THE AI/HUMAN DIFFERENCE LIVES. The aiw thread considered renaming
// `depends_on` to name the AI side and discarded it as a live-data migration across three
// canonicals, so the distinction is carried HERE, in words, and the ordinary Dependencies
// section above is left exactly as it was.
//
// WHAT THIS SURFACE MUST NOT CLAIM: an edge satisfied that nothing records. [#46] Since
// CONTRATO §15.c there IS a recorded fact that satisfies this edge — a positive human QA
// (`human_qa` done with result "passed") in the TARGET's frozen progress record — and the row
// says so when, and only when, the target carries it. Everything else keeps today's words: a
// completed target with no positive QA still reads "work done · awaiting a person's review",
// because completed alone cannot distinguish a run an AI closed from one a person reviewed.
// The predicate is the injected §15.c model (fail-closed): uninjected or absent, never
// "satisfied".
function v3HumanApprovalSection(run, model) {
  const edges = Array.isArray(run.depends_on_human_approved) ? run.depends_on_human_approved : [];
  if (!edges.length) return "";
  const rows = edges.map((dependencyId) => {
    const dependency = model.runsById.get(dependencyId);
    if (!dependency) {
      // Same shape the Dependencies section uses for an id it cannot resolve, so an
      // unresolved edge reads identically in both lists and needs no style of its own.
      return `<div class="v3-dependency-row"><span class="mono">${escapeHtml(dependencyId)}</span>${badge("unknown", "red")}</div>`;
    }
    // [#46] The full truth, in the one case the norm lets it be told: work done AND a person
    // reviewed it positively. The satisfied state renders ONLY on a completed target whose
    // own progress records the positive QA — the row B.7 names is the completed one, and a
    // non-completed target keeps its waiting words even if a QA entry exists.
    const satisfied = dependency.status === "completed" && v3HumanApprovalSatisfied(dependency);
    const stateHtml = satisfied
      ? `<span class="v3-dep-state is-satisfied"><span class="v3-dep-dot" aria-hidden="true"></span>${escapeHtml("work done · reviewed by a person — satisfied")}</span>`
      : `<span class="v3-dep-state is-waiting"><span class="v3-dep-dot" aria-hidden="true"></span>${escapeHtml(dependency.status === "completed" ? "work done · awaiting a person's review" : "waiting · " + dependency.status)}</span>`;
    return `
      <button class="v3-dependency-row" type="button" data-v3-run="${escapeHtml(dependency.run_id)}">
        <span class="v3-dep-order">#${dependency.queue_order}</span>
        <span class="v3-dep-title">${escapeHtml(dependency.title)}</span>
        ${stateHtml}
      </button>
    `;
  }).join("");
  return `
    <div class="drawer-section">
      <details class="v3-section-details" open>
        <summary><span class="v3-caret">${v3Chevron(11)}</span>Waits on a person <span class="v3-section-count">${edges.length}</span></summary>
        <div class="v3-section-body">
          <div class="v3-edit-note">This run cannot START until a PERSON has reviewed the run(s) below. That is a stronger wait than the Dependencies section above, which only needs the work to exist. The criterion: if the target turns out to be wrong, this run has to be redone.</div>
          ${rows}
          <div class="v3-empty-note">A positive human QA recorded in the target's progress (CONTRATO §15.c) is what satisfies an edge here; a bare completed status never does, and no executor enforces the wait yet.</div>
        </div>
      </details>
    </div>
  `;
}

function v3ClassificationSection(run) {
  const stored = v3StoredClassification(run);
  const measured = stored.filter((field) => field !== "classified_at");
  const derived = v3DerivedClassification(run);

  const label = {
    correctness_model: "Correctness model",
    work_type: "Work type",
    blast_radius: "Blast radius",
    failure_surfaces: "Failure surfaces",
    external_effects: "External effects",
    classified_at: "Classified at"
  };
  const shown = (field) => {
    const value = run[field];
    if (field === "external_effects") {
      return Array.isArray(value) && value.length ? value.join(" · ") : "(none)";
    }
    return String(value);
  };

  if (!measured.length) {
    return `
    <div class="drawer-section">
      <details class="v3-section-details">
        <summary><span class="v3-caret">${v3Chevron(11)}</span>Classification <span class="v3-section-count">0</span></summary>
        <div class="v3-section-body">
          <div class="v3-empty-note">Not classified yet — this run carries none of the six stored classification fields, so it has no severity and no closure mode. Open the editor to classify it.</div>
        </div>
      </details>
    </div>
  `;
  }

  const storedRows = v3ClassificationStoredFields()
    .filter((field) => field in run)
    .map((field) => row(label[field], shown(field), field === "classified_at" ? "mono" : ""))
    .join("");

  // Why a derived value is absent, named by the field that is missing. §2: severity needs
  // work_type and blast_radius; closure_mode needs correctness_model, and on the SPECIFIED
  // branch the severity too.
  const missingFor = (which) => {
    if (!derived.available) return "the derivation table has not been loaded";
    const absent = (field) => !(field in run);
    if (which === "severity") {
      const need = ["work_type", "blast_radius"].filter(absent);
      return need.length ? `needs ${need.map((f) => label[f].toLowerCase()).join(" and ")}` : "inputs are outside the vocabulary";
    }
    if (absent("correctness_model")) return "needs correctness model";
    if (!derived.severity) return "needs the severity, which is itself absent";
    return "inputs are outside the vocabulary";
  };

  const derivedRow = (name, value, which, tableNote) => `
      <div class="data-row v3-derived-row">
        <div class="data-label">${escapeHtml(name)} <span class="v3-derived-mark" title="${escapeHtml(tableNote)}">derived</span></div>
        <div class="data-value">${value
          ? `<span class="v3-severity-tag is-${escapeHtml(String(value).toLowerCase())}">${escapeHtml(String(value))}</span>`
          : `<span class="is-faint">absent — ${escapeHtml(missingFor(which))}</span>`}</div>
      </div>
  `;

  return `
    <div class="drawer-section">
      <details class="v3-section-details" open>
        <summary><span class="v3-caret">${v3Chevron(11)}</span>Classification <span class="v3-section-count">${measured.length}</span></summary>
        <div class="v3-section-body">
          <div class="v3-detail-rows">${storedRows}</div>
          <div class="v3-classification-derived">
            <div class="v3-classification-derived-head">Derived — computed at read time, never stored, not editable</div>
            <div class="v3-detail-rows">
              ${derivedRow("Severity", derived.severity, "severity", "work_type × blast_radius, then the failure_surfaces adjustment, saturating between MINOR and CRITICAL")}
              ${derivedRow("Closure mode", derived.closure_mode, "closure_mode", "correctness_model (and severity on the SPECIFIED branch), then the external_effects guard, which only raises")}
            </div>
          </div>
        </div>
      </details>
    </div>
  `;
}

function v3OpenRunDetail(runId, mode) {
  const model = roadmapV3ModelCache || v3Model(appData);
  if (!model) return;
  const run = model.runsById.get(runId);
  const context = model.contextByRunId.get(runId);
  if (!run || !context) return;
  roadmapV3ModelCache = model;
  // Local navigation stack: a root open resets it, a dependency open pushes, a back
  // render leaves it as-is. At the stack root the Back control returns to the origin
  // subview by closing the drawer (handoff RDH-A / interaction spec).
  if (mode === "push") v3DetailStack.push(runId);
  else if (mode !== "back") v3DetailStack = [runId];
  const previousRunId = v3DetailStack.length > 1 ? v3DetailStack[v3DetailStack.length - 2] : null;
  const previousRun = previousRunId ? model.runsById.get(previousRunId) : null;
  const backTarget = previousRun ? `Run #${previousRun.queue_order}` : (v3DetailOrigin || "Run Queue");
  const backControl = `<button class="v3-back" type="button" data-v3-back="true" aria-label="Back to ${escapeHtml(backTarget)}"><span class="v3-back-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 5 8 12 15 19"></polyline></svg></span><span class="v3-back-label">${escapeHtml(backTarget)}</span></button>`;
  const dependencyRow = (dependencyId) => {
    const dependency = model.runsById.get(dependencyId);
    if (!dependency) {
      return `<div class="v3-dependency-row"><span class="mono">${escapeHtml(dependencyId)}</span>${badge("unknown", "red")}</div>`;
    }
    const satisfied = dependency.status === "completed";
    const state = satisfied
      ? '<span class="v3-dep-state is-satisfied"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="4.5 12.5 9.5 17.5 19.5 6.5"></polyline></svg>satisfied</span>'
      : `<span class="v3-dep-state is-waiting"><span class="v3-dep-dot" aria-hidden="true"></span>waiting &middot; ${escapeHtml(dependency.status)}</span>`;
    return `
      <button class="v3-dependency-row" type="button" data-v3-run="${escapeHtml(dependency.run_id)}">
        <span class="v3-dep-order">#${dependency.queue_order}</span>
        <span class="v3-dep-title">${escapeHtml(dependency.title)}</span>
        ${state}
      </button>
    `;
  };
  // [D-051] Dependencies grouped BY LANE when the project declares more than one:
  // "waiting on my own lane" reads differently from "waiting on another lane" (the
  // second is the deliberate cross-lane delay). The run's own lane leads; the rest
  // follow in declared order; unknown ids keep a group of their own. A project without
  // lanes (or with one) renders the flat list exactly as before — zero new markup.
  let dependencyRows;
  const groupDepsByLane = model.lanes && model.lanes.length > 1 && (run.depends_on || []).length;
  if (groupDepsByLane) {
    const ownLane = model.laneOf(run);
    const groups = new Map();
    (run.depends_on || []).forEach((dependencyId) => {
      const dependency = model.runsById.get(dependencyId);
      const laneId = dependency ? model.laneOf(dependency) : "__unresolved__";
      if (!groups.has(laneId)) groups.set(laneId, []);
      groups.get(laneId).push(dependencyId);
    });
    const orderedLaneIds = [ownLane, ...model.lanes.map((lane) => lane.lane_id).filter((id) => id !== ownLane), "__unresolved__"];
    dependencyRows = orderedLaneIds
      .filter((laneId) => groups.has(laneId))
      .map((laneId) => {
        const laneMeta = model.laneById.get(laneId);
        const head = laneId === "__unresolved__"
          ? "Unresolved ids"
          : `${laneId} — ${laneMeta ? laneMeta.title : laneId}${laneId === ownLane ? " (this run's lane)" : ""}`;
        return `
          <div class="v3-dep-lane-group">
            <div class="v3-dep-lane-head">${escapeHtml(head)}</div>
            ${groups.get(laneId).map(dependencyRow).join("")}
          </div>
        `;
      }).join("");
  } else {
    dependencyRows = (run.depends_on || []).map(dependencyRow).join("");
  }
  const totalRuns = model.allRuns.length;
  const currentEntry = v3DeriveCurrent(run);
  const metadataCells = [v3DetailCell("Run order", `#${run.queue_order} <span class="is-faint">of ${totalRuns}</span>`, "is-order")];
  if (currentEntry) {
    metadataCells.push(v3DetailCell("Current stage", escapeHtml(v3StageText(currentEntry, true))));
  } else {
    // Prototype RDM-C wording: terminal runs read "Closed", untouched planned runs
    // read "Not started" (the closeout outcome stays visible in History rows and the
    // Progress note below).
    metadataCells.push(v3DetailCell("Current stage", run.status === "completed" ? "Closed" : "Not started"));
  }
  // [D-051] Lane and barrier metadata — only for a roadmap that opts in. The lane cell
  // shows the derived label plus the lane's declared name; a barrier run declares its
  // scope in words; a run a barrier is holding NAMES that barrier and its scope (never
  // a bare "blocked").
  const laneLabel = v3LaneLabel(model, run);
  if (laneLabel) {
    const laneMeta = model.laneById.get(model.laneOf(run));
    metadataCells.push(v3DetailCell("Lane", `<span class="v3-lane-tag">${escapeHtml(laneLabel)}</span> ${escapeHtml(laneMeta ? laneMeta.title : model.laneOf(run))}`));
  }
  if (run.barrier === "global" || run.barrier === "lane") {
    metadataCells.push(v3DetailCell(
      "Barrier",
      run.barrier === "global"
        ? '<span class="v3-barrier-tag is-global">GLOBAL</span> bars every later run, in every lane, until this run completes'
        : '<span class="v3-barrier-tag is-lane">lane</span> bars later runs on its own lane until this run completes'
    ));
  }
  const heldBy = v3BarrierBlockersFor(model, run);
  if (heldBy.length) {
    const first = heldBy[0];
    metadataCells.push(v3DetailCell(
      "Held by barrier",
      `<button class="v3-barrier-link" type="button" data-v3-run="${escapeHtml(first.run_id)}">${escapeHtml(v3BarrierRef(model, first))} — ${escapeHtml(first.title)}</button>${heldBy.length > 1 ? ` <span class="is-faint">+${heldBy.length - 1} more</span>` : ""}`,
      "is-barrier-held"
    ));
  }
  const drawerTitle = byId("drawer-title");
  const drawerId = byId("drawer-id");
  const drawerBody = byId("drawer-body");
  const drawerClose = byId("drawer-close");
  drawerTitle.textContent = "";
  drawerId.textContent = "";
  drawerBody.innerHTML = "";
  // RDH-A header: Back pill row (injected before the shared title block), then
  // "#N Title", then the verbatim run_id beside the solid status chip.
  drawerTitle.innerHTML = `<span class="v3-detail-order">#${run.queue_order}</span>${escapeHtml(run.title)}`;
  drawerId.innerHTML = `<span class="v3-detail-runid" title="${escapeHtml(run.run_id)}">${escapeHtml(run.run_id)}</span>${v3StatusBadge(run.status, true)}`;
  drawerClose.textContent = "✕";
  drawerClose.setAttribute("aria-label", "Close run detail");
  const drawerHeader = byId("run-drawer").querySelector(".drawer-header");
  const existingBack = drawerHeader.querySelector(".v3-back");
  if (existingBack) existingBack.remove();
  drawerHeader.insertAdjacentHTML("afterbegin", backControl);
  // Roadmap-v3-scoped drawer presentation modifier; removed on close and when a legacy
  // (non-v3) detail opens, so it never leaks into Overview or other tabs.
  byId("run-drawer").classList.add("v3-detail");
  drawerBody.innerHTML = `
    <div class="drawer-section">
      <div class="drawer-section-title">Summary</div>
      <p class="v3-detail-summary">${escapeHtml(run.summary)}</p>
      <details class="v3-disclosure">
        <summary><span class="v3-caret">${v3Chevron(9)}</span>Full description</summary>
        <p class="v3-detail-description">${escapeHtml(run.full_description)}</p>
      </details>
    </div>
    <div class="drawer-section">
      <div class="v3-detail-cells">
        ${metadataCells.join("")}
      </div>
      <details class="v3-disclosure">
        <summary><span class="v3-caret">${v3Chevron(9)}</span>Details</summary>
        <div class="v3-detail-rows">
          ${row("Objective", context.objective.title)}
          ${row("Phase", context.phase.title)}
          ${row("Run ID", run.run_id, "mono")}
        </div>
      </details>
    </div>
    <div class="drawer-section">
      <details class="v3-section-details" open>
        <summary><span class="v3-caret">${v3Chevron(11)}</span>Dependencies <span class="v3-section-count">${(run.depends_on || []).length}</span></summary>
        <div class="v3-section-body">
          ${dependencyRows || '<div class="v3-empty-note">none — this run has no upstream dependencies</div>'}
        </div>
      </details>
    </div>
    ${v3RunReportSection(run)}
    ${v3HumanApprovalSection(run, model)}
    ${v3ClassificationSection(run)}
    ${v3ProgressTimeline(run)}
  `;
  v3AttachHandlers(byId("run-drawer"), { nested: true });
  v3MountRunEditor(runId);
  byId("drawer-overlay").classList.add("open");
  byId("run-drawer").classList.add("open");
  byId("run-drawer").setAttribute("aria-hidden", "false");
}

// [#53] THE DOOR INTO THE REPORT, and there is no other one. It is a section of the run's own
// detail: the report belongs to the run, and that is how the operator looks for it. The section
// is built by the mount from the index alone — this function passes an identifier and a file
// path to name in an absence, and receives finished markup.
function v3RunReportSection(run) {
  if (typeof runReportSectionHtml !== "function") return "";
  return runReportSectionHtml(v3ReportsIndexModel(), run.run_id, {
    indexPath: PATHS ? displaySourcePath(PATHS.reportsIndex) : ""
  });
}

// Open the report of the run whose detail is on screen. The URL is composed from the INDEX's
// own `report_path` against this project's base — never from the run id — so only a report the
// index actually listed can be opened. Back closes the layer and re-opens the same run detail,
// which is still on the stack underneath.
function v3OpenRunReport(runId) {
  if (typeof openRunReport !== "function" || typeof reportStateForRun !== "function") return;
  const info = reportStateForRun(v3ReportsIndexModel(), runId);
  if (!info.reportPath) return;
  const model = roadmapV3ModelCache || v3Model(appData);
  const run = model ? model.runsById.get(runId) : null;
  openRunReport({
    runId,
    reportUrl: `${REPO_BASE}${info.reportPath}`,
    // Preview paths inside a report are relative to the repo that emitted it, and this console
    // serves that repo under its project base. Resolving them anywhere else would probe the
    // console's own files (#52 left this decision to this run — record §F).
    previewBase: REPO_BASE,
    // [#58] The verdict sits BESIDE the report, so its URL is the report's own path with the
    // last segment replaced — composed HERE, in the one file that owns routes, from the path
    // the index listed and never from a run id. The write route already resolves the same
    // pair the same way; this is its read side, and it is a plain GET of a file the console
    // already serves, so no route was added and none was touched.
    verdictUrl: `${REPO_BASE}${info.reportPath.replace(/[^/]+$/, "verdict.json")}`,
    title: run ? run.title : "",
    subtitle: runId,
    backLabel: run ? `Back to Run #${run.queue_order}` : "Back to the run",
    onBack: () => v3OpenRunDetail(runId, "back"),
    // [#57] The writer the renderer's sign button calls. Composed HERE — the one file that
    // owns routes — from the write route of the ACTIVE project and the run identifier the
    // report was opened by; the verdict object travels as the renderer produced it, and the
    // answer comes back as { ok, path } or { ok:false, reason } in the endpoint's own words.
    writeVerdict: v3VerdictWriter(runId),
    // [#62] The opener a cited document is reached through. Composed HERE for the same reason
    // every other route is: this is the one file that owns them. The mount relays the two
    // strings the citation declared and this closure decides nothing else — the reader itself
    // refuses any path the active project's own index does not list.
    openDocument: (path, section) => {
      if (typeof openDocSideReader === "function") openDocSideReader({ path, section });
    }
  });
}

// [#57] Build the writer for one run's report: POST the signed verdict at the verdict write
// route and translate the endpoint's answer for the renderer's hint. A refusal travels as the
// endpoint worded it (its `errors` list joined, or its `reason`), never reworded here.
function v3VerdictWriter(runId) {
  const url = PATHS ? PATHS.verdictWrite : "";
  if (!url) return null;
  return async (verdict) => {
    let response;
    try {
      response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({ run_id: runId, verdict })
      });
    } catch (error) {
      return { ok: false, reason: (error && error.message) || "the request failed" };
    }
    let payload = null;
    try { payload = await response.json(); } catch (error) { payload = null; }
    if (response.ok && payload && payload.ok) return { ok: true, path: payload.path || "" };
    const reason = payload && (Array.isArray(payload.errors) && payload.errors.length
      ? payload.errors.join("; ")
      : payload.reason);
    return { ok: false, reason: reason || `HTTP ${response.status}` };
  };
}

function v3BackRunDetail() {
  // At the stack root, Back returns to the origin surface by closing the drawer.
  if (v3DetailStack.length <= 1) {
    closeDrawer();
    return;
  }
  v3DetailStack.pop();
  v3OpenRunDetail(v3DetailStack[v3DetailStack.length - 1], "back");
}

function applyProjectIdentity(data) {
  // The page title is the one place the console names the project. The source console had the
  // name typed into index.html, which is what made that file a fork per project. Here it comes
  // from the data — the roadmap's own title, else the snapshot's project_id — and when neither
  // is loaded the neutral title already in the HTML stands. Nothing is invented.
  const title = text(data?.roadmapV3?.title, "") || text(data?.snapshot?.project_id, "");
  if (title) document.title = `${title} — Project Console`;
}

function renderAll(data) {
  applyProjectIdentity(data);
  // [#53] Derive the report index model BEFORE any surface paints, because the run detail reads
  // it. The derivation lives in the mount, not here: this file hands over the parsed artifact
  // and receives a lookup, and never learns a field of a report on the way. With the mount
  // absent (a page that did not load it) the model stays null and every run detail says the
  // index could not be read — the honest sentence, not a silent surface.
  try {
    reportsIndexModelCache = typeof reportsIndexModel === "function" ? reportsIndexModel(data.reportsIndex) : null;
  } catch (error) {
    reportsIndexModelCache = null;
  }
  // [#62] Hand the side reader THIS project's documents index and THIS project's base, so the
  // panel can only ever offer the documents the active project itself declares. The reader
  // derives its own list from the artifact — this file hands over the parsed index and a base,
  // and learns nothing about any document on the way. With the reader absent (a page that did
  // not load it) nothing here changes and no citation becomes a control.
  try {
    if (typeof setDocSideReaderSource === "function") {
      setDocSideReaderSource({
        docsIndex: data.docsIndex,
        base: REPO_BASE,
        indexPath: PATHS ? displaySourcePath(PATHS.docsIndex) : ""
      });
    }
  } catch (error) {
    /* The reader states its own absence; a failure to hand it an index must not take a render down. */
  }
  // Overview renders from the v3 model (target screenshot); the legacy renderOverview
  // stays in source, dormant, like the other retired legacy renderers.
  try {
    renderOverviewV3(data);
  } catch (error) {
    v3Unavailable("project-overview", error && error.message ? error.message : "render error");
  }
  try {
    renderRoadmapV3(data);
  } catch (error) {
    v3Unavailable("roadmap-v3-tree", error && error.message ? error.message : "render error");
  }
  // [#43] The per-project care budget panel. Its own try/catch and its own slot: it reads the
  // ENVELOPE (taxonomy_model), not the tree, so a roadmap that fails to render must not take
  // it down and a missing block must not take the roadmap down.
  try {
    renderCareBudget(data);
  } catch (error) {
    const slot = byId("roadmap-care-budget");
    if (slot) slot.innerHTML = "";
  }
  try {
    renderRunQueueV3(data);
  } catch (error) {
    v3Unavailable("run-queue-v3", error && error.message ? error.message : "render error");
  }
  // History renders the Git commit snapshot only; the retired mixed operational feed
  // (renderHistory/historyItems) stays in source, dormant.
  try {
    renderCommitHistory(data);
  } catch (error) {
    const historyList = byId("history-list");
    if (historyList) {
      historyList.innerHTML = `<div class="readonly-banner"><strong>Commit history unavailable.</strong><span>${escapeHtml(error && error.message ? error.message : "render error")}</span></div>`;
    }
  }
  renderDocs(data);
  // Status tab live panels: the Governance
  // State and Console Diagnostics panels now render into the far-right Status tab from the same
  // already-loaded data via the UNCHANGED renderGovernance/renderSources. No re-fetch, no new
  // sources, no persistence; the Status section markup lives statically in index.html.
  try {
    renderGovernance(data);
  } catch (error) {
    const el = byId("review-policy");
    if (el) el.innerHTML = `<div class="readonly-banner"><strong>Governance panel unavailable.</strong><span>${escapeHtml(error && error.message ? error.message : "render error")}</span></div>`;
  }
  try {
    renderSources(data);
  } catch (error) {
    const el = byId("state-sources");
    if (el) el.innerHTML = `<div class="readonly-banner"><strong>Diagnostics panel unavailable.</strong><span>${escapeHtml(error && error.message ? error.message : "render error")}</span></div>`;
  }
  attachRunButtons();
}

function attachRunButtons() {
  document.querySelectorAll("[data-run-id]").forEach((button) => {
    button.addEventListener("click", () => openRunDrawer(button.dataset.runId));
  });
}

function drawerRunReference(value) {
  const linkedRun = appData?.runsById.get(value);
  if (!linkedRun) return `<span class="guardrail-chip mono" title="${escapeHtml(value)}">${escapeHtml(value)}</span>`;
  const linkedQueueItem = appData.queue?.queue?.find((item) => item.run_id === linkedRun.run_id) || {};
  return `<button class="drawer-link-button" type="button" data-run-id="${escapeHtml(linkedRun.run_id)}">${escapeHtml(operatorRun(linkedRun, linkedQueueItem).displayTitle)}</button>`;
}

function drawerReferenceList(items, emptyMessage = "none") {
  if (!items || !items.length) return `<p>${escapeHtml(emptyMessage)}</p>`;
  return `<div class="chip-list">${items.map((item) => drawerRunReference(item)).join("")}</div>`;
}

function openRunDrawer(runId) {
  const run = appData?.runsById.get(runId);
  if (!run) return;
  const objective = appData.objectivesById.get(run.objective_id) || {};
  const phase = appData.phasesById.get(run.phase_id) || {};
  const queueItem = appData.queue?.queue?.find((item) => item.run_id === runId) || {};
  const operator = operatorRun(run, queueItem);
  const parentRunId = run.parent_run_id || queueItem.parent_run_id;
  const parentRun = parentRunId ? appData.runsById.get(parentRunId) : null;
  const stageRunId = parentRun?.run_id || run.run_id;
  const stages = lifecycleStagesForRun(appData, stageRunId);
  const currentStage = stages.find((stage) => ["current", "in_progress", "running"].includes(text(stage.operator_stage_status, "").toLowerCase()))
    || stages.find((stage) => text(stage.operator_stage_status, "").toLowerCase() === "changes_requested")
    || stages[0];
  byId("run-drawer").classList.remove("v3-detail");
  const legacyDrawerClose = byId("drawer-close");
  legacyDrawerClose.textContent = "Close";
  legacyDrawerClose.removeAttribute("aria-label");
  const legacyInjectedBack = byId("run-drawer").querySelector(".drawer-header .v3-back");
  if (legacyInjectedBack) legacyInjectedBack.remove();
  byId("drawer-title").textContent = operator.displayTitle;
  byId("drawer-id").textContent = `${operator.group} / ${operator.statusLabel} / ${operator.kindLabel}`;
  byId("drawer-body").innerHTML = `
    <div class="drawer-section">
      <div class="drawer-section-title">Operator state</div>
      <div class="operator-badge-row drawer-primary-badges">
        ${operatorBadge(operator.group, operator.groupTone)}
        ${operatorBadge(operator.statusLabel, operator.statusTone)}
        ${operatorBadge(operator.visibilityLabel, operator.visibilityTone)}
        ${operatorBadge(operator.kindLabel, operator.kindTone)}
      </div>
      <div class="text-tertiary">${escapeHtml(runSecondaryMetadata(run, queueItem))}</div>
    </div>
    <div class="drawer-section">
      <div class="drawer-section-title">Next operator action</div>
      <p>${escapeHtml(operator.nextAction)}</p>
    </div>
    <div class="drawer-section">
      <div class="drawer-section-title">What closes this run</div>
      <p>${escapeHtml(operator.closure)}</p>
    </div>
    <div class="drawer-section">
      <div class="drawer-section-title">Why it matters / why now</div>
      ${operator.whyNow ? row("why_now", operator.whyNow) : ""}
      ${operator.whyNotNow ? row("why_not_now", operator.whyNotNow) : ""}
      ${!operator.whyNow && !operator.whyNotNow ? `<p>${escapeHtml(operator.why)}</p>` : ""}
    </div>
    <div class="drawer-section">
      <div class="drawer-section-title">Blockers / dependencies</div>
      ${operator.blockingReason ? `<p class="drawer-callout">${escapeHtml(operator.blockingReason)}</p>` : ""}
      ${row("blocked_by", operator.blockedBy.length ? operator.blockedBy.join(", ") : "none", "mono")}
      ${row("followup_of", operator.followupOf || "none", "mono")}
      ${operator.followupOf ? drawerReferenceList([operator.followupOf]) : ""}
      ${row("derived_from", operator.derivedFrom.length ? operator.derivedFrom.join(", ") : "none", "mono")}
      ${operator.derivedFrom.length ? drawerReferenceList(operator.derivedFrom) : ""}
    </div>
    <div class="drawer-section">
      <div class="drawer-section-title">Claim boundary</div>
      <div class="operator-badge-row">
        ${operatorBadge(operator.claimBoundaryLabel, operator.claimBoundaryTone)}
      </div>
    </div>
    ${parentRun ? `
      <div class="drawer-section">
        <div class="drawer-section-title">Parent work item</div>
        <button class="drawer-link-button" type="button" data-run-id="${escapeHtml(parentRun.run_id)}">${escapeHtml(operatorRun(parentRun, appData.queue?.queue?.find((item) => item.run_id === parentRun.run_id) || {}).displayTitle)}</button>
      </div>
    ` : ""}
    <div class="drawer-section">
      <div class="drawer-section-title">What will happen</div>
      <p>${escapeHtml(operator.summary)}</p>
    </div>
    ${stages.length ? `
      <div class="drawer-section">
        <div class="drawer-section-title">Current stage</div>
        <p>${escapeHtml(currentStage ? `${stageLabel(currentStage)}: ${stageStatusLabel(currentStage.operator_stage_status)}${currentStage.qa_attempts || currentStage.attempts ? `, attempt ${currentStage.qa_attempts || currentStage.attempts}` : ""}` : "No current stage recorded.")}</p>
        ${renderStageStrip(stages, false)}
      </div>
    ` : ""}
    <div class="drawer-section">
      <div class="drawer-section-title">Related area</div>
      ${row("Objective", objective.title || run.objective_id)}
      ${row("Phase", phase.title || run.phase_id)}
      ${row("Domain", operator.type)}
      ${row("Queue order", queueItem.order || run.queue_order || "History / not queued")}
    </div>
    <div class="drawer-section">
      <div class="drawer-section-title">Restrictions</div>
      <div class="no-claims-compact">
        ${operatorBadge("Web not certified", "red")}
        ${operatorBadge("Slide not certified", "red")}
        ${operatorBadge("rule not certified", "red")}
        ${operatorBadge("No production-ready claim", "amber")}
      </div>
    </div>
    <div class="drawer-section">
      <details class="technical-disclosure">
        <summary>Technical details</summary>
        ${row("run_id", run.run_id, "mono")}
        ${row("display_group", operator.groupValue, "mono")}
        ${row("execution_readiness", roadmapField(run, queueItem, "execution_readiness") || "unknown", "mono")}
        ${row("default_visibility", operator.visibilityValue, "mono")}
        ${row("claim_boundary", operator.claimBoundaryValue, "mono")}
        ${row("run_kind", runKind(run, queueItem), "mono")}
        ${row("physical_lifecycle", run.physical_lifecycle || "unknown", "mono")}
        ${row("operational_state", run.operational_state || "unknown", "mono")}
        ${row("wait_reason", run.wait_reason || queueItem.wait_reason || "none", "mono")}
        ${row("terminal_decision", run.terminal_decision || "NONE", "mono")}
        ${row("domain", run.domain || "unknown", "mono")}
        ${row("certification_state", run.certification_state || "unknown", "mono")}
        ${row("followup_linkage", run.followup_linkage || "none", "mono")}
        ${row("stage", run.stage || queueItem.stage || run.lifecycle_stage || "none", "mono")}
        ${row("provider", run.provider || queueItem.provider || "none", "mono")}
        ${row("parent_run_id", run.parent_run_id || queueItem.parent_run_id || "none", "mono")}
        ${row("objective_id / phase_id", `${objective.objective_id || run.objective_id} / ${phase.phase_id || run.phase_id}`, "mono")}
        ${row("raw classification", queueItem.classification || run.queue_classification || "not_queued", "mono")}
        ${row("raw lifecycle_status", run.lifecycle_status || "UNKNOWN", "mono")}
        ${row("raw ai_review_status", run.ai_review_status || "UNKNOWN", "mono")}
        ${row("raw human_review_status", run.human_review_status || "UNKNOWN", "mono")}
        ${row("raw delivery_status", run.delivery_status || "UNKNOWN", "mono")}
        ${row("raw certification_impact", run.certification_impact || "NONE", "mono")}
        ${row("legacy_ticket_id", run.legacy_ticket_id || "none", "mono")}
      </details>
    </div>
    <div class="drawer-section">
      <details class="technical-disclosure">
        <summary>Raw guardrails and source references</summary>
        ${chipList(run.guardrails || [], "No run-specific guardrails are recorded.")}
        ${evidenceList(run.source_refs || []) || emptyState("No source references are recorded for this run.")}
      </details>
    </div>
  `;
  attachRunButtons();
  byId("drawer-overlay").classList.add("open");
  byId("run-drawer").classList.add("open");
  byId("run-drawer").setAttribute("aria-hidden", "false");
}

function closeDrawer() {
  byId("drawer-overlay").classList.remove("open");
  byId("run-drawer").classList.remove("open");
  byId("run-drawer").classList.remove("v3-detail");
  byId("run-drawer").setAttribute("aria-hidden", "true");
  // Restore the shared close control that the v3 detail renders as a compact "✕",
  // and remove the v3 Back pill injected into the shared drawer header.
  const drawerClose = byId("drawer-close");
  drawerClose.textContent = "Close";
  drawerClose.removeAttribute("aria-label");
  const injectedBack = byId("run-drawer").querySelector(".drawer-header .v3-back");
  if (injectedBack) injectedBack.remove();
  // Closing safely resets the local Roadmap v3 Run Detail navigation stack.
  v3DetailStack = [];
  v3DetailOrigin = "";
}

function showFetchFallback(error) {
  const notice = byId("load-notice");
  notice.hidden = false;
  notice.className = "readonly-banner";
  notice.innerHTML = `
    <strong>Could not load the Project Console snapshot.</strong>
    <span>This usually happens when opening through <span class="mono">file://</span>. Start the console with <span class="mono">${escapeHtml(CONSOLE_SERVE_COMMAND)}</span>, then open <span class="mono">${escapeHtml(CONSOLE_ENTRY_URL)}</span>.</span>
    <span class="mono">${escapeHtml(error.message)}</span>
  `;
}

// §20's announcement, fired against WHAT THE PROJECT DECLARED (O4.P13).
//
// The transplanted version fired on `failedSources.length`, and the renderer fetches the fifteen
// legacy routes while only six of them have an emitter behind them. The nine that were never
// promised (§18.a: no emitter, deliberately out of `.project/`) fail on every load of every
// project, so the banner was ON permanently — and a notice that never goes off announces
// nothing. That is the failure §20 exists to prevent, arrived at from the other side: not a
// silence, a permanent noise.
//
// SEVEN OF SIXTEEN since #53, and the move is recorded here because the previous number was
// recorded here. O4.P17 made the emitter declare SEVEN artifacts while this renderer fetched
// six: `reports_index.json` was declared and unread, because indexing added no surface and a
// fetch with no reader is noise. #53 IS that surface, so the index is now fetched and the fetch
// list is sixteen. The nine of §18.a are untouched by all of it: they have no emitter, so they
// are not absences, and the subtraction has always been from the FETCH list and never from the
// emitted set.
//
// So the gate is the DECLARATION, not the fetch list. The banner is NOT suppressed and NOT
// conditioned on anything cosmetic: a file the project declares emitting and that does not load
// still lights it up — and now the banner NAMES the file, which §20 required and the aggregate
// wording never did. Files the project never declared are absent from this notice because they
// are not absences; Console Diagnostics still lists them, under what they actually are.
function showOptionalSourceNotice() {
  const declaredFailures = failedSources.filter((entry) => isDeclaredSource(entry.path));
  if (!declaredFailures.length) return;
  const notice = byId("load-notice");
  if (!notice) return;
  notice.hidden = false;
  notice.className = "readonly-banner";
  const named = declaredFailures
    .map((entry) => `<span class="mono">${escapeHtml(displaySourcePath(entry.path))}</span>`)
    .join(", ");
  const subject = declaredFailures.length === 1
    ? "One file this project declares emitting could not be loaded"
    : `${declaredFailures.length} files this project declares emitting could not be loaded`;
  notice.innerHTML =
    `<strong>Rendered from the primary snapshot.</strong>` +
    `<span>${escapeHtml(subject)}: ${named}.</span>` +
    `<span>Console Diagnostics, in the Status tab, lists every source with its state.</span>`;
}

function hideLoadNotice() {
  const notice = byId("load-notice");
  if (!notice) return;
  notice.hidden = true;
  notice.innerHTML = "";
}

// ==========================================================================
// Multi-project shell hooks (O4.P3). The shell (project-shell.js) drives this renderer
// through exactly three functions: setActiveProjectBase (top of file), and the two below.
// ==========================================================================

// Every container the renderer paints per project. Used to blank the project surface when the
// ACTIVE project's required snapshot cannot be loaded: each surface states the absence rather
// than keeping the previous project's pixels (§20 — and zero cross-project state).
const PROJECT_SURFACE_IDS = [
  "project-overview", "next-pending-runs", "overview-activity",
  "run-queue-v3", "roadmap-v3-tree",
  "history-list",
  "docs-nav-list", "docs-reader",
  "review-policy", "project-guardrails", "no-claims",
  "state-sources", "repo-structure", "console-source-files"
];

// Reset EVERYTHING that belongs to the previously active project: data, caches, selections,
// timers, open drawers, and the chrome defaults (active tab, subview, status section). After
// this runs, nothing the next render paints can come from the previous project. The switch
// test exercises this seam; keep every per-project `let` of this file listed here.
function resetProjectScopedState() {
  appData = null;
  loadedSources.length = 0;
  failedSources.length = 0;
  // The declaration belongs to the project that transported it; carrying it across a switch
  // would judge one project's failures against another project's promises.
  declaredArtifactPaths = [];
  roadmapV3ModelCache = null;
  // [#53] The report layer and the index model are per-project like everything else here. The
  // layer is torn down WITHOUT its back callback firing (that callback would re-open a run
  // detail of the project being left), and the model returns to null — unbuilt, not empty.
  reportsIndexModelCache = null;
  if (typeof runReportIsOpen === "function" && runReportIsOpen()) closeRunReport({ silent: true });
  // [#62] The side reader is per-project like everything else here: a document of the project
  // being left must not stay on screen over the project being entered, and its source returns to
  // an index nobody has handed over yet — unread, not empty.
  if (typeof closeDocSideReader === "function") closeDocSideReader();
  if (typeof setDocSideReaderSource === "function") setDocSideReaderSource({});
  v3DetailStack = [];
  v3DetailOrigin = "";
  // [D-051] The lane filter is per-project state: a lane key selected in one project
  // means nothing in the next (vocabularies are per-project). The selector markup is
  // blanked too, so a project without lanes never inherits the previous project's control.
  v3SelectedLane = null;
  const laneSlot = byId("roadmap-lane-slot");
  if (laneSlot) laneSlot.innerHTML = "";
  // [#48] The batch filter follows the same per-project lifecycle; its slot is REMOVED
  // (not blanked) because renderBatchSelector creates it — the next project starts from
  // the same markup a batch-less project always had.
  v3SelectedBatch = null;
  const batchSlot = byId("roadmap-batch-slot");
  if (batchSlot) batchSlot.remove();
  v3EditMode = false;
  v3EndpointReachable = null;
  v3EditPending = null;
  v3EditModalTarget = null;
  v3EditModalDirty = false;
  v3EditRemoveChoice = null;
  docBodyCache.clear();
  docsActivePath = null;
  docsAllEntries = [];
  // Back to the neutral mode AND to "not yet derived": the next project decides its own opening
  // mode from its own index (docsResolveOpeningMode), never inheriting the previous project's.
  docsVisibilityMode = "all";
  docsOpeningModeResolved = false;
  historySelectedBranch = null;
  historyVersionMarker = null;
  stopHistoryAutoRefresh();
  historyRefreshing = false;
  historyManualSyncing = false;
  historySyncState = { kind: "idle", text: "" };
  closeDrawer();
  v3CloseEditModal(true);
  // Edit mode is per-project state; the flag above resets, and the TOGGLE's visual must follow
  // (O4.P12 — before the write path existed the toggle could never read "Editing on", so this
  // state was unreachable). A pressed toggle carried across a switch would claim edit mode is
  // on for a project whose endpoint was never probed.
  const editToggle = byId("roadmap-edit-toggle");
  if (editToggle) {
    editToggle.setAttribute("aria-pressed", "false");
    editToggle.textContent = "Edit roadmap";
  }
  v3SetEditHint("");
  // [O4.P14] The re-emission acknowledgement is per-project state: "Re-emitted 6 artifacts …
  // 71 runs" is a statement ABOUT the project it was fired on, and carrying it into the next
  // one would claim a re-emission that never happened there. Flag and text reset together, so
  // neither the disabled button nor the stale sentence survives a switch.
  projectEmitting = false;
  projectEmitSetState("idle", "");
  // The drawer and modal hide on close but keep their last innerHTML; blank them so not even
  // hidden markup of the previous project survives the switch.
  const drawerBody = byId("drawer-body");
  if (drawerBody) drawerBody.innerHTML = "";
  const drawerTitle = byId("drawer-title");
  if (drawerTitle) drawerTitle.textContent = "Run Details";
  const drawerId = byId("drawer-id");
  if (drawerId) drawerId.textContent = "";
  const editModalBody = byId("edit-modal-body");
  if (editModalBody) editModalBody.innerHTML = "";
  hideLoadNotice();
  resetChromeToDefaults();
  document.title = "Project Console";
}

// Chrome back to its opening defaults: Overview tab, Run Queue subview, Governance section,
// scroll at top. Same class toggling the click handlers perform; display-only.
function resetChromeToDefaults() {
  document.querySelectorAll("[data-tab]").forEach((item) => item.classList.toggle("active", item.dataset.tab === "overview"));
  document.querySelectorAll(".tab-content").forEach((panel) => panel.classList.toggle("active", panel.id === "tab-overview"));
  document.querySelectorAll("[data-subview]").forEach((item) => item.classList.toggle("active", item.dataset.subview === "v3queue"));
  document.querySelectorAll(".roadmap-subview").forEach((panel) => panel.classList.toggle("active", panel.id === "roadmap-sub-v3queue"));
  const jumpLinks = Array.from(document.querySelectorAll(".status-jump-link"));
  jumpLinks.forEach((link, index) => link.classList.toggle("active", index === 0));
  document.querySelectorAll(".status-section").forEach((section) => section.classList.toggle("active", section.id === "status-governance"));
  const content = document.querySelector("#view-project .content") || document.querySelector(".content");
  if (content) content.scrollTop = 0;
}

// Load and render the ACTIVE project (the base set by setActiveProjectBase). Returns what
// happened so the shell can mark the project's menu entry truthfully. On failure every
// project surface announces the absent snapshot BY FILE (§20) — the previous project's
// pixels are already gone via resetProjectScopedState.
async function loadActiveProject() {
  try {
    appData = await loadData();
    renderAll(appData);
    // Seed the History version marker from the initial load so the first active-tab poll
    // only re-renders when the snapshot actually changes.
    historyVersionMarker = historySnapshotMarker(appData.gitHistory);
    showOptionalSourceNotice();
    return { ok: true, snapshot: appData.snapshot };
  } catch (error) {
    showProjectUnavailable(error);
    const invalid = /invalid json|unexpected token|json/i.test(text(error && error.message, ""));
    return { ok: false, reason: invalid ? "invalid" : "missing", error: text(error && error.message, "") };
  }
}

function showProjectUnavailable(error) {
  const notice = byId("load-notice");
  if (notice) {
    notice.hidden = false;
    notice.className = "readonly-banner";
    notice.innerHTML = `
      <strong>This project cannot be rendered.</strong>
      <span>${escapeHtml(displaySourcePath(PATHS.snapshot))} could not be loaded: ${escapeHtml(text(error && error.message, "unknown error"))}.</span>
      <span>The other registered projects are unaffected.</span>
    `;
  }
  const message = `${displaySourcePath(PATHS.snapshot)} could not be loaded, so this view has nothing to render.`;
  // The Current work card may be hidden by the PREVIOUS project's render (no active run and no
  // eligible next one). Blanking states an absence, so the card has to be on screen to state it.
  v3SetOverviewCurrentWorkVisible(true);
  PROJECT_SURFACE_IDS.forEach((id) => {
    const container = byId(id);
    if (container) container.innerHTML = emptyState(message);
  });
}

// Status sub-nav: the two
// Status toolbar links behave as real mutually-exclusive tabs, mirroring the Roadmap sub-view
// show/hide idiom in setupTabs - clicking a link toggles an .active class on that link AND on its
// target .status-section panel, so exactly one panel is visible at a time. Governance State is the
// default-visible panel from the static markup. Display-only: it reads the static Status markup and
// toggles classes - no data, no fetch, no scroll, no hash mutation, no persistence. The UNCHANGED
// renderGovernance/renderSources keep filling the panels' child elements regardless of which
// container is currently visible.
function setupStatusSubnav() {
  const pairs = Array.from(document.querySelectorAll(".status-jump-link"))
    .map((link) => ({ link, target: document.querySelector(link.getAttribute("href")) }))
    .filter((pair) => pair.target);
  if (!pairs.length) return;
  pairs.forEach((activePair) => {
    activePair.link.addEventListener("click", (event) => {
      event.preventDefault();
      pairs.forEach((pair) => {
        const isActive = pair === activePair;
        pair.link.classList.toggle("active", isActive);
        pair.target.classList.toggle("active", isActive);
      });
    });
  });
}

// ==========================================================================
// RE-EMISSION OF `.project/` (O4.P14) — one button, one POST, no watcher.
//
// `.project/` is a PROJECTION of a canonical this console does not own. Two ways of refreshing
// it already exist — automatically after a confirmed roadmap edit, and per-artifact from the
// History tab's Sync — but a canonical edited by anyone ELSE leaves the projection behind with
// no way to catch it up. Under parallel lanes that is the normal case: workshop runs deliberately
// do not re-emit, because two lanes writing the same `.project/` would overwrite each other. The
// operator's only recourse was to INVENT a roadmap edit (put a space in a title, take it out)
// for the re-emission that follows a confirm. This replaces that detour.
//
// A BUTTON, NOT AN AUTO-REFRESH. Nothing below polls, watches, or schedules: the console writes
// `.project/` when the operator clicks and at no other moment. Files that changed under their
// feet would dirty their Git working tree without an action of theirs.
//
// The acknowledgement carries NUMBERS — artifacts written, resulting run count, the canonical
// they came from — because "done" alone cannot answer the only question worth asking after a
// re-emission: did anything actually move? A refusal names the FILE it is about and states that
// nothing was written. Neither ever fakes a success the server did not report.
// ==========================================================================

let projectEmitting = false;
let projectEmitState = { kind: "idle", text: "" };

// `text` is what the row SHOWS; `full` (when it differs) is the whole sentence, parked on the
// element's title so nothing measured is lost. The split exists for one reason: the controls row
// is a single line of chrome and must stay one, so a success acknowledgement — the state the
// operator will see most — is kept short enough not to wrap and push the roadmap down. A REFUSAL
// is shown in full and allowed to wrap: it names the file the emission refused about, and hiding
// that behind a tooltip would defeat the point of naming it.
function projectEmitSetState(kind, text, full) {
  projectEmitState = { kind, text, full: full || text };
  const button = byId("roadmap-emit-btn");
  if (button) button.disabled = projectEmitting;
  const state = byId("roadmap-emit-state");
  if (state) {
    state.className = `roadmap-emit-state is-${kind}`;
    state.textContent = text;
    if (full && full !== text) state.setAttribute("title", full);
    else state.removeAttribute("title");
  }
}

// Turn the server's machine reason into one operator sentence. Every branch that can be about a
// FILE names it ON SCREEN (§20's habit applied to a refusal): the canonical gates carry the path
// they read, and a root no layout claims carries the per-candidate verdicts the server measured,
// so the operator is told which files were looked for instead of being left to guess. What rides
// on the title instead is only ever DETAIL — the engine's error text verbatim — never the reason
// and never the file.
function projectEmitRefusalText(status, payload) {
  const reason = payload && payload.reason ? payload.reason : `HTTP ${status}`;
  const file = payload && payload.file ? payload.file : "";
  const errors = payload && Array.isArray(payload.errors) ? payload.errors : [];
  const tail = "Nothing was written.";
  const say = (short, full) => ({ short, full: full || short });
  if (reason === "canonical_missing") return say(`Refused — the canonical ${file} could not be read. ${tail}`, payload.detail);
  if (reason === "canonical_unparsable") {
    return say(`Refused — the canonical ${file} does not parse as JSON. ${tail}`, payload.detail);
  }
  if (reason === "canonical_not_a_roadmap_tree") {
    return say(`Refused — the canonical ${file} is not an objectives/phases/runs tree. ${tail}`);
  }
  if (reason === "canonical_invariants_failed") {
    const count = errors.length === 1 ? "1 error" : `${errors.length} errors`;
    return say(
      `Refused — the canonical ${file} fails the roadmap invariants (${count}). ${tail}`,
      errors.join("\n")
    );
  }
  if (reason === "project_not_editable_no_layout") {
    const candidates = payload && Array.isArray(payload.candidates) ? payload.candidates : [];
    const named = candidates.map((c) => `${c.file} (${c.verdict})`).join(", ");
    return say(`Refused — no canonical roadmap claims this project${named ? `: ${named}` : ""}. ${tail}`);
  }
  if (reason === "unknown_project") return say(`Refused — this project is not in the console registry. ${tail}`);
  if (reason === "write_destination_out_of_bounds") {
    return say(`Refused — the emission would write outside this project's registered root. ${tail}`, payload.detail);
  }
  if (reason === "emit_in_progress") return say(`Refused — another re-emission is still running. ${tail}`);
  if (reason === "emit_failed") {
    return say(`Failed while emitting${file ? ` from ${file}` : ""}; the folder may be incomplete.`, payload.detail);
  }
  return say(`Refused — ${reason}. ${tail}`);
}

// The success acknowledgement, in two lengths. Both report what the server SAID it wrote, never
// the list it could have written: an artifact the emitter skipped (git_history, at a root that is
// not its own repository) is named as skipped rather than counted. The SHORT form carries the two
// numbers the operator came for — artifacts written and the resulting run count — plus the fact
// that nothing was committed; the LONG form adds the canonical they were derived from and any
// skipped artifact, and rides along as the element's title.
function projectEmitSuccessText(payload) {
  const artifacts = payload.artifacts != null ? payload.artifacts : 0;
  const runs = payload.runs != null ? payload.runs : 0;
  const objectives = payload.objectives != null ? payload.objectives : 0;
  const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;
  const skipped = Array.isArray(payload.skipped) && payload.skipped.length
    ? ` ${payload.skipped.join(", ")} not written (nothing at this root to derive it from).`
    : "";
  return {
    short: `${plural(artifacts, "artifact")} · ${plural(runs, "run")}`,
    full: `Re-emitted ${plural(artifacts, "artifact")} from ${payload.canonical || "the canonical"} — ` +
      `${plural(runs, "run")}, ${plural(objectives, "objective")}.${skipped}` +
      ` Not committed: review and commit yourself.`
  };
}

async function emitProjectFolder() {
  if (projectEmitting) return;
  // The route is composed per active project. The null guard only covers a click fired before
  // any project base was set; the endpoint itself refuses, with a named reason, a project the
  // emitter does not serve.
  if (!PATHS || !PATHS.projectEmit) {
    projectEmitSetState("failed", "Re-emission unavailable — no active project selected.");
    return;
  }
  projectEmitting = true;
  projectEmitSetState("emitting", "re-emitting…");
  try {
    let response;
    let payload = null;
    try {
      response = await fetch(PATHS.projectEmit, {
        method: "POST",
        cache: "no-store",
        headers: { Accept: "application/json" }
      });
      payload = await response.json().catch(() => null);
    } catch (error) {
      // Most likely the console is open without the local server (plain static host).
      projectEmitting = false;
      projectEmitSetState("failed", "Re-emission failed — local Project Console server not reachable.");
      return;
    }
    if (!response.ok || !payload || payload.ok !== true) {
      projectEmitting = false;
      const refusal = projectEmitRefusalText(response.status, payload);
      projectEmitSetState("failed", refusal.short, refusal.full);
      return;
    }
    // The server wrote; never trust the in-memory model afterwards. Re-read every artifact of
    // the ACTIVE project and re-render, so the queue, the tree, Docs, History and the governance
    // panels all show the state that was just emitted — without a reload and without restarting
    // the server. Chrome (active tab, subview, lane) is untouched: this is a refresh, not a switch.
    projectEmitting = false;
    const reloaded = await loadActiveProject();
    // Edit affordances are injected on top of a fresh tree render, so they follow the reload.
    try { v3DecorateTreeEditAffordances(); } catch (error) { /* edit mode off: nothing to decorate */ }
    const said = projectEmitSuccessText(payload);
    if (reloaded && reloaded.ok) {
      projectEmitSetState("ok", said.short, said.full);
    } else {
      // The write happened and the views did not follow: say BOTH, and say the second one where
      // it cannot be missed rather than tucking it into a tooltip.
      const stale = `${said.full} The views could not be re-read; reload the page.`;
      projectEmitSetState("failed", stale, stale);
    }
  } finally {
    projectEmitting = false;
    const button = byId("roadmap-emit-btn");
    if (button) button.disabled = false;
  }
}

function setupProjectEmit() {
  const button = byId("roadmap-emit-btn");
  if (button) button.addEventListener("click", () => { emitProjectFolder(); });
}

// ==========================================================================
// Roadmap editing UI (dormant here: this console ships no write path).
//
// Edit mode is OFF by default and only reachable from the Roadmap tab. When ON, the shared
// run drawer grows an editor for the CURRENT run: set-text, set-deps, set-status. Every
// write is a two-step dry-run -> confirm -> apply against the bounded endpoint
// (POST PATHS.roadmapEdit). The console never writes the roadmap any other way, and the
// in-memory model is never treated as truth after a write (the file is re-read from disk).
//
// All of this lives in NEW functions; the only change to a validator-pinned function is the
// single v3MountRunEditor(runId) call at the tail of v3OpenRunDetail.
// ==========================================================================

function v3RoadmapOriginActive() {
  // The drawer editor appears only for runs opened from a Roadmap subview, never from
  // History (which stays a read-only provenance view).
  return v3DetailOrigin === "Run Queue" || v3DetailOrigin === "Roadmap";
}

async function v3ProbeEndpoint() {
  // The route is composed per active project (O4.P12); the null guard only covers a probe
  // fired before any project base was set.
  if (!PATHS || !PATHS.roadmapEdit) return false;
  // A GET to the write endpoint returns the server's 405 { reason:"method_not_allowed" }
  // exactly when the ACTIVE project is editable (registered, and a root layout claims its
  // roadmap). A plain static host 404s it, file:// throws, and the server itself 404s a
  // project it cannot edit — all of which honestly keep edit mode off.
  try {
    const response = await fetch(PATHS.roadmapEdit, { method: "GET", cache: "no-store", headers: { Accept: "application/json" } });
    if (response.status !== 405) return false;
    const payload = await response.json().catch(() => null);
    return !!(payload && payload.reason === "method_not_allowed");
  } catch (error) {
    return false;
  }
}

function v3SetEditHint(text) {
  const hint = byId("roadmap-edit-hint");
  if (hint) hint.textContent = text || "";
}

async function v3ToggleEditMode() {
  const toggle = byId("roadmap-edit-toggle");
  if (v3EditMode) {
    v3EditMode = false;
    if (toggle) { toggle.setAttribute("aria-pressed", "false"); toggle.textContent = "Edit roadmap"; }
    v3SetEditHint("");
    // [#43] The care budget panel is re-rendered on the way OUT too, so its inputs and its
    // write buttons disappear the moment edit mode does. Scoped to this panel deliberately:
    // the tree surfaces keep the refresh behaviour they already had.
    try { renderCareBudget(appData); } catch (e) { /* leave prior render */ }
    v3EditReopenIfOpen();
    return;
  }
  // Turning ON requires the local server; mirror manualSyncHistory's honesty about it.
  if (toggle) toggle.disabled = true;
  v3SetEditHint("Checking local server...");
  const reachable = await v3ProbeEndpoint();
  v3EndpointReachable = reachable;
  if (toggle) toggle.disabled = false;
  if (!reachable) {
    v3SetEditHint("Edit mode is unavailable: the local console server is not reachable, or the active project has no editable roadmap (no root layout claims one).");
    return;
  }
  v3EditMode = true;
  if (toggle) { toggle.setAttribute("aria-pressed", "true"); toggle.textContent = "Editing on"; }
  v3SetEditHint("");
  v3EditRefreshRoadmapViews();
  v3EditReopenIfOpen();
}

function v3EditRefreshRoadmapViews() {
  // Re-render the Roadmap tab surfaces so the tree edit affordances appear/disappear in step
  // with edit mode. UI-only; touches no data.
  if (!appData) return;
  try { renderRoadmapV3(appData); } catch (e) { /* leave prior render */ }
  try { renderRunQueueV3(appData); } catch (e) { /* leave prior render */ }
  // [#43] The care budget panel turns editable with the same toggle: it is a roadmap write and
  // must never be reachable while edit mode is off.
  try { renderCareBudget(appData); } catch (e) { /* leave prior render */ }
  v3DecorateTreeEditAffordances();
}

function v3EditReopenIfOpen() {
  // Re-render the currently open run drawer so the Edit button appears or disappears in step
  // with edit mode. UI-only; touches no data.
  const drawer = byId("run-drawer");
  if (drawer && drawer.classList.contains("open") && v3DetailStack.length) {
    v3OpenRunDetail(v3DetailStack[v3DetailStack.length - 1], "back");
  }
}

function setupRoadmapEditMode() {
  const toggle = byId("roadmap-edit-toggle");
  if (toggle) toggle.addEventListener("click", () => { v3ToggleEditMode(); });
  // Modal dismissal follows the drawer precedent: explicit Close, backdrop click, Escape.
  const modalClose = byId("edit-modal-close");
  if (modalClose) modalClose.addEventListener("click", () => { v3CloseEditModal(false); });
  const modalOverlay = byId("edit-modal-overlay");
  if (modalOverlay) modalOverlay.addEventListener("click", () => { v3CloseEditModal(false); });
  // Capture-phase so an open modal swallows Escape before the drawer's Escape handler.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && byId("edit-modal") && byId("edit-modal").classList.contains("open")) {
      event.stopImmediatePropagation();
      v3CloseEditModal(false);
    }
  }, true);
  v3ModalAttachHandlers();
  // Tree edit affordances (objective/phase edit, add run) are delegated on the tree; this
  // listener is registered before renderRoadmapV3 wires its own, so it can intercept first.
  const tree = byId("roadmap-v3-tree");
  if (tree) tree.addEventListener("click", v3TreeEditClick);
  // The read-only drawer's injected Edit button opens the run modal.
  const drawer = byId("run-drawer");
  if (drawer) drawer.addEventListener("click", (event) => {
    const openBtn = event.target.closest("[data-v3edit-open-run]");
    if (openBtn && drawer.contains(openBtn)) { v3OpenEditModal({ kind: "run", id: openBtn.getAttribute("data-v3edit-open-run") }); }
  });
}

function v3TreeEditClick(event) {
  const objEdit = event.target.closest("[data-v3edit-tree-objective]");
  if (objEdit) { event.preventDefault(); event.stopImmediatePropagation(); v3OpenEditModal({ kind: "objective", id: objEdit.getAttribute("data-v3edit-tree-objective") }); return; }
  const phaseEdit = event.target.closest("[data-v3edit-tree-phase]");
  if (phaseEdit) { event.preventDefault(); event.stopImmediatePropagation(); v3OpenEditModal({ kind: "phase", id: phaseEdit.getAttribute("data-v3edit-tree-phase") }); return; }
  const addRun = event.target.closest("[data-v3edit-tree-add]");
  if (addRun) { event.preventDefault(); event.stopImmediatePropagation(); v3OpenEditModal({ kind: "insert", anchorKind: "end-of-phase", anchorId: addRun.getAttribute("data-v3edit-tree-add") }); return; }
}

function v3DecorateTreeEditAffordances() {
  // Injects Edit / Add-run buttons onto objective and phase headers in the roadmap tree,
  // only in edit mode. New markup only; the tree render functions are untouched beyond the
  // identity data attributes they already carry.
  if (!v3EditMode) return;
  const tree = byId("roadmap-v3-tree");
  if (!tree) return;
  tree.querySelectorAll("[data-v3edit-objective]").forEach((card) => {
    const titleEl = card.querySelector(".v3-objective-title");
    if (!titleEl || titleEl.querySelector("[data-v3edit-tree-objective]")) return;
    const id = card.getAttribute("data-v3edit-objective");
    titleEl.insertAdjacentHTML("beforeend", ` <button class="btn btn-secondary btn-sm v3-edit-affordance" type="button" data-v3edit-tree-objective="${escapeHtml(id)}">Edit</button>`);
  });
  tree.querySelectorAll("[data-v3edit-phase]").forEach((phase) => {
    const header = phase.querySelector(".v3-phase-header");
    if (!header || header.querySelector("[data-v3edit-tree-phase]")) return;
    const id = phase.getAttribute("data-v3edit-phase");
    header.insertAdjacentHTML("beforeend", ` <span class="v3-edit-affordance-group"><button class="btn btn-secondary btn-sm v3-edit-affordance" type="button" data-v3edit-tree-phase="${escapeHtml(id)}">Edit</button><button class="btn btn-secondary btn-sm v3-edit-affordance" type="button" data-v3edit-tree-add="${escapeHtml(id)}">Add run</button></span>`);
  });
}

function v3MountRunEditor(runId) {
  // Run C: the read-only drawer gets an "Edit" button to the right of the title (before
  // Close) when edit mode is on and the drawer was opened from a Roadmap subview. The button
  // opens the modal editor; the drawer body itself stays pure read-only. Always de-dupes so
  // the button never lingers when edit mode is off.
  const header = byId("run-drawer") ? byId("run-drawer").querySelector(".drawer-header") : null;
  if (header) { const ex = header.querySelector("[data-v3edit-open-run]"); if (ex) ex.remove(); }
  if (!v3EditMode || !v3RoadmapOriginActive() || !header) return;
  const model = v3EditModel();
  if (!model || !model.runsById.get(runId)) return;
  const btn = `<button class="v3-edit-drawer-btn" type="button" data-v3edit-open-run="${escapeHtml(runId)}"><svg class="v3-edit-drawer-icon" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"></path></svg><span>Edit</span></button>`;
  const closeBtn = byId("drawer-close");
  if (closeBtn) closeBtn.insertAdjacentHTML("beforebegin", btn);
  else header.insertAdjacentHTML("beforeend", btn);
}

function v3FindPhase(model, phaseId) {
  for (const objective of model.roadmap.objectives || []) {
    for (const phase of objective.phases || []) {
      if (phase.phase_id === phaseId) return { objective, phase };
    }
  }
  return null;
}

function v3MarkModalDirty() { v3EditModalDirty = true; }

// THE ONE MODEL READ OF THE EDIT SURFACES.
//
// The modal used to read the model two different ways. The renderers read
// `roadmapV3ModelCache || v3Model(appData)`; the DIFF path — v3EditBeforeNode, and with it
// v3BatchOpChanged and the insert payload — read the bare cache. The cache is null on the whole
// stretch between a project reset and the first Roadmap render (resetProjectScopedState clears
// it, v3EditReloadRoadmap repopulates it), and the two halves disagreed for exactly that stretch:
// the modal rendered its fields off the fallback, while the diff saw no before-node at all and
// v3BatchOpChanged returned false for every op. "Preview all changes" then reported NO CHANGES
// over a modal that held real ones — indistinguishable, from the operator's chair, from having
// nothing to apply.
//
// One accessor, one answer. Every edit-surface read goes through here.
function v3EditModel() {
  return roadmapV3ModelCache || v3Model(appData);
}

function v3OpenEditModal(target) {
  if (!v3EditMode) return;
  const model = v3EditModel();
  if (!model) return;
  v3EditModalTarget = target;
  v3EditModalDirty = false;
  v3EditRemoveChoice = null;
  v3EditPending = null;
  let title = "Edit";
  let subtitle = "";
  let html = "";
  if (target.kind === "run") {
    const run = model.runsById.get(target.id);
    const context = model.contextByRunId.get(target.id);
    if (!run || !context) return;
    title = "Edit run #" + run.queue_order;
    subtitle = run.run_id;
    html = v3RenderRunEditor(run, context, model);
  } else if (target.kind === "phase") {
    const entry = v3FindPhase(model, target.id);
    if (!entry) return;
    title = "Edit phase";
    subtitle = target.id;
    html = v3RenderTextEditor("phase", target.id, entry.phase);
  } else if (target.kind === "objective") {
    const obj = (model.roadmap.objectives || []).find((o) => o.objective_id === target.id);
    if (!obj) return;
    title = "Edit objective";
    subtitle = target.id;
    html = v3RenderTextEditor("objective", target.id, obj);
  } else if (target.kind === "insert") {
    title = "Insert run";
    html = v3RenderInsertForm(target, model);
  } else {
    return;
  }
  byId("edit-modal-title").textContent = title;
  byId("edit-modal-subtitle").textContent = subtitle;
  byId("edit-modal-body").innerHTML = html;
  byId("edit-modal-overlay").classList.add("open");
  byId("edit-modal").classList.add("open");
  byId("edit-modal").setAttribute("aria-hidden", "false");
  const firstField = byId("edit-modal-body").querySelector("input, textarea, select");
  if (firstField) firstField.focus();
}

function v3CloseEditModal(force) {
  const modal = byId("edit-modal");
  if (!modal || !modal.classList.contains("open")) return;
  if (!force && v3EditModalDirty && !window.confirm("Discard unsaved changes to this item?")) return;
  modal.classList.remove("open");
  byId("edit-modal-overlay").classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  byId("edit-modal-body").innerHTML = "";
  v3EditModalTarget = null;
  v3EditModalDirty = false;
  v3EditPending = null;
  v3EditRemoveChoice = null;
}

// [#46 amendment] The five SUGGESTED closeout outcomes, and the sentinel of the
// write-your-own entry. They live HERE, in the screen, and nowhere else on purpose: the
// obligation is the core's (a close without an outcome is refused, roadmap-core.mjs
// setStatus) but the list is not, and a list the engine knew about would be one edit away
// from becoming the enum CONTRATO §14 refuses. The core keeps accepting ANY non-empty
// string; these five only make the ordinary close a confirmation instead of a piece of
// writing, which is the whole cost this amendment removes from the operator.
// The sentinel is not a value: it can never be stored, because the collection reads the
// free-text box whenever it is selected.
const V3_CLOSEOUT_SUGGESTIONS = ["done as specified", "done with deviations", "superseded", "not needed", "partially done"];
const V3_CLOSEOUT_DEFAULT = "done as specified";
const V3_CLOSEOUT_CUSTOM = "__write_my_own__";

function v3RenderRunEditor(run, context, model) {
  const statusOptions = ["planned", "active", "completed", "blocked"]
    .map((s) => `<option value="${s}"${s === run.status ? " selected" : ""}>${escapeHtml(s)}</option>`).join("");
  const isTerminal = run.status === "completed" || run.status === "blocked";
  const closeout = "closeout_result" in run && run.closeout_result != null ? String(run.closeout_result) : "";
  const closeoutSuggested = V3_CLOSEOUT_SUGGESTIONS.includes(closeout);
  // [#46 amendment] A run that is ALREADY terminal with no outcome is not being closed — it was
  // closed before the obligation existed (9 of the 45 terminal runs of this canonical). It gets
  // the honest entry, never the preselection: otherwise editing such a run's TITLE would collect
  // a set-status whose "changed" test (v3BatchOpChanged) sees "" -> "done as specified" and
  // backfills an outcome nobody stated. The default belongs to the ACT of closing, and only there.
  const closeoutUnrecorded = isTerminal && !closeout;
  // The list is SUGGESTED, never a vocabulary: the choice below is a SCREEN aid, so anything
  // already on disk is shown as it is. A stored outcome outside the list (this canonical holds
  // `completed_successfully`, `delivered_by_aiw_roadmap_O2`, …) selects the write-your-own entry
  // with the stored text in the box — read back verbatim, never rewritten into a listed value.
  const closeoutChoice = closeout
    ? (closeoutSuggested ? closeout : V3_CLOSEOUT_CUSTOM)
    : (closeoutUnrecorded ? "" : V3_CLOSEOUT_DEFAULT);
  const closeoutIsCustom = closeoutChoice === V3_CLOSEOUT_CUSTOM;
  const closeoutOptions = (closeoutUnrecorded ? ['<option value="" selected>(no outcome recorded)</option>'] : [])
    .concat(V3_CLOSEOUT_SUGGESTIONS
      .map((s) => `<option value="${escapeHtml(s)}"${s === closeoutChoice ? " selected" : ""}>${escapeHtml(s)}</option>`))
    .concat(`<option value="${V3_CLOSEOUT_CUSTOM}"${closeoutIsCustom ? " selected" : ""}>Write my own outcome…</option>`)
    .join("");
  const total = model.allRuns.length;
  const depCandidates = model.allRuns.filter((r) => r.queue_order < run.queue_order);
  const currentDeps = Array.isArray(run.depends_on) ? run.depends_on : [];
  // [#45] The second list, read the same way and kept a SEPARATE variable: the block below
  // never writes through `currentDeps`, so `depends_on` cannot be touched from this editor
  // by the new control.
  const currentHumanDeps = Array.isArray(run.depends_on_human_approved) ? run.depends_on_human_approved : [];
  const swapCandidates = model.allRuns.filter((r) => r.run_id !== run.run_id);
  // Progress retirement (clear-progress) is offered ONLY where it can do work: a run that
  // actually carries a record and is not yet terminal. A terminal run's all-done progress is
  // settled history the core refuses to touch, and a run with no record has nothing to retire,
  // so in both cases the block would be a control that can only fail.
  const progressCount = Array.isArray(run.progress) ? run.progress.length : 0;
  const canClearProgress = progressCount > 0 && !isTerminal;
  const clearProgressBlock = canClearProgress ? `
      <div class="v3-edit-block v3-edit-danger" data-v3edit-op="clear-progress">
        <div class="v3-edit-block-title">Progress record</div>
        <div class="v3-edit-note">This run carries ${progressCount} progress entr${progressCount === 1 ? "y" : "ies"}. Retiring the record REMOVES them all; the run is left with no progress, exactly like a run that never had any. Nothing is rewritten or marked done -- the record is dropped, not edited.</div>
        <div class="v3-edit-note">This does NOT change status. Set the status above in the same preview: a run left active with no progress fails the validator, so the two changes must be written together.</div>
        <label class="v3-edit-field v3-edit-check"><input type="checkbox" data-v3edit-clearprogress><span class="v3-edit-label">Retire the progress record (cannot be undone from here)</span></label>
      </div>
` : "";
  return `
    <div class="v3-edit v3-modal-edit" data-v3edit-runid="${escapeHtml(run.run_id)}">
      <div class="v3-edit-note">Roadmap content only. Edit any fields below, then preview every change at once. Run ID is identity and cannot change.</div>

      <div class="v3-edit-block" data-v3edit-op="set-text">
        <div class="v3-edit-block-title">Text</div>
        <label class="v3-edit-field"><span class="v3-edit-label">Title</span><input type="text" data-v3edit-title value="${escapeHtml(run.title)}"></label>
        <label class="v3-edit-field"><span class="v3-edit-label">Summary</span><textarea data-v3edit-summary rows="2">${escapeHtml(run.summary)}</textarea></label>
        <label class="v3-edit-field"><span class="v3-edit-label">Full description</span><textarea data-v3edit-fulldesc rows="4">${escapeHtml(run.full_description)}</textarea></label>
      </div>

      <div class="v3-edit-block" data-v3edit-op="move">
        <div class="v3-edit-block-title">Position</div>
        <div class="v3-edit-note">This run is #${run.queue_order} of ${total}. Set a new position; the whole queue re-sequences around it, like moving a node in a list.</div>
        <label class="v3-edit-field"><span class="v3-edit-label">Move to position</span><input type="number" data-v3edit-order min="1" max="${total}" value="${run.queue_order}"></label>
      </div>

      <div class="v3-edit-block" data-v3edit-op="set-deps">
        <div class="v3-edit-block-title">Dependencies</div>
        <div class="v3-edit-note">Only earlier runs (lower position) are eligible. The core refuses the rest.</div>
        ${v3RenderDepPicker("deps", "multi", depCandidates, currentDeps, model)}
      </div>

      <div class="v3-edit-block" data-v3edit-op="set-human-deps">
        <div class="v3-edit-block-title">Waits on a person</div>
        <div class="v3-edit-note">A SECOND, stronger list, and it does not replace the one above. Put a run here when this run cannot start until a PERSON has reviewed that run — the test is: if the target turns out to be wrong, does this run have to be redone? The list above only needs the target's work to exist.</div>
        <div class="v3-edit-note">Same eligibility rule: only earlier runs. Emptying the list removes the field entirely, exactly like a run that never had one. Nothing enforces the wait yet — no executor obeys this field.</div>
        ${v3RenderDepPicker("humandeps", "multi", depCandidates, currentHumanDeps, model)}
      </div>
${v3RenderLaneBlock(run, model)}${v3RenderBarrierBlock(run, model)}${v3RenderClassificationBlock(run, model)}
      <div class="v3-edit-block" data-v3edit-op="set-status">
        <div class="v3-edit-block-title">Status</div>
        <label class="v3-edit-field"><span class="v3-edit-label">Status</span><select data-v3edit-status>${statusOptions}</select></label>
        <div data-v3edit-closeout-field${isTerminal ? "" : " hidden"}>
          <label class="v3-edit-field"><span class="v3-edit-label">Closeout result — required to close</span><select data-v3edit-closeout-choice>${closeoutOptions}</select></label>
          <label class="v3-edit-field" data-v3edit-closeout-custom${closeoutIsCustom ? "" : " hidden"}><span class="v3-edit-label">Your own outcome</span><input type="text" data-v3edit-closeout value="${escapeHtml(closeoutIsCustom ? closeout : "")}" placeholder="What was the outcome of this run?"></label>
        </div>
        <div class="v3-edit-note">Closing to completed or blocked REQUIRES a closeout result: the outcome of the run. The core refuses a close without one — a closed run with no recorded outcome is what History used to misread as blocked. Runs closed before this rule are not backfilled.</div>
        <div class="v3-edit-note">The five entries are a SUGGESTION, not a vocabulary: <em>done as specified</em> comes preselected so an ordinary close is a confirmation, and <em>Write my own outcome…</em> opens a free-text box for anything the list did not foresee. The core stores whatever text arrives and enumerates nothing (CONTRATO §14). A run closed before this rule keeps <em>(no outcome recorded)</em> until you choose one yourself — nothing is filled in for it.</div>
        <div class="v3-edit-note">The core enforces status/progress coupling; if progress does not support the target status the change is refused and the exact reason is shown.</div>
      </div>
${clearProgressBlock}
      <div class="v3-edit-actions">
        <button class="btn btn-secondary btn-sm" type="button" data-v3edit-batch>Preview all changes</button>
        <div class="v3-edit-note">One preview, one confirm, one write covering every field changed above (text, position, dependencies, status, progress record).</div>
      </div>

      <div class="v3-edit-block v3-edit-standalone" data-v3edit-op="swap">
        <div class="v3-edit-block-title">Swap position</div>
        <div class="v3-edit-note">Standalone action, previewed and written on its own. Exchange this run's position with another run.</div>
        ${v3RenderDepPicker("swap", "single", swapCandidates, [], model)}
        <button class="btn btn-secondary btn-sm" type="button" data-v3edit-op="swap">Preview swap</button>
      </div>

      <div class="v3-edit-block v3-edit-danger v3-edit-standalone" data-v3edit-op="remove">
        <div class="v3-edit-block-title">Remove run</div>
        <div class="v3-edit-note">Standalone action, previewed and written on its own. If other runs depend on it the core refuses and names them, and you choose how to handle the dependents.</div>
        <button class="btn btn-secondary btn-sm" type="button" data-v3edit-op="remove">Preview removal</button>
      </div>

      <div id="v3-edit-preview" class="v3-edit-preview" hidden></div>
    </div>
  `;
}

// [D-051] Lane assignment block of the run editor. Rendered ONLY when the roadmap
// declares lanes: with none there is nothing to assign and the modal is unchanged. The
// options are the DECLARED lanes, verbatim; "(project default)" clears the stored key
// (a run on the default lane stores nothing — set-lane's clearing gesture).
function v3RenderLaneBlock(run, model) {
  if (!model || !model.lanes) return "";
  const currentLane = typeof run.lane === "string" && run.lane ? run.lane : "";
  const defaultMeta = model.laneById.get(model.defaultLane);
  const options = [
    `<option value=""${currentLane ? "" : " selected"}>(project default — ${escapeHtml(model.defaultLane)}${defaultMeta ? ` · ${escapeHtml(defaultMeta.title)}` : ""})</option>`,
    ...model.lanes.map((lane) =>
      `<option value="${escapeHtml(lane.lane_id)}"${currentLane === lane.lane_id ? " selected" : ""}>${escapeHtml(lane.lane_id)} — ${escapeHtml(lane.title)}</option>`)
  ].join("");
  return `
      <div class="v3-edit-block" data-v3edit-op="set-lane">
        <div class="v3-edit-block-title">Lane</div>
        <div class="v3-edit-note">Lanes are declared by this roadmap (root.lanes). A run with no stored lane rides the project default; picking the default here stores nothing.</div>
        <label class="v3-edit-field"><span class="v3-edit-label">Lane</span><select data-v3edit-lane>${options}</select></label>
      </div>
`;
}

// [D-051] Barrier block of the run editor — the WRITE side of the barrier D-051 defined
// and could only be reached, until now, by hand-editing the canonical file.
//
// It is rendered on EVERY roadmap, unlike the Lane block. A lane-less project can still
// want a synchronisation point ("nothing starts until this closes"), and that is exactly
// what a global barrier is. What the lane-less case cannot have is a LANE barrier: with no
// lanes it would be stored as "lane" and behave as "global" — a lie in the file — so the
// option is disabled and says why, mirroring the engine's own refusal rather than hiding
// a rule the operator would only meet as an error.
//
// GLOBAL IS DELIBERATELY UNCOMFORTABLE (D-051: visible, not convenient). A global barrier
// re-serialises the project — it is the exact inverse of the reason lanes exist — so it is
// not something to reach by one careless click on a dropdown:
//   1. it is LAST in the list, never preselected, and named in caps against "lane";
//   2. picking it opens a danger panel that states, in runs of THIS roadmap, what it bars;
//   3. an acknowledgement checkbox must be ticked, and until it is, the op is not
//      collected into the batch at all (v3EditBuildPayload returns null) — the operator
//      cannot preview it by accident, let alone write it.
// The lane barrier gets none of that friction: it bars one lane, which is ordinary
// planning. Clearing a barrier is likewise frictionless — undoing a block is never the
// dangerous direction.
function v3RenderBarrierBlock(run, model) {
  const current = run.barrier === "lane" || run.barrier === "global" ? run.barrier : "";
  const hasLanes = !!(model && model.lanes);
  const laneId = model && model.laneOf ? model.laneOf(run) : null;
  // Counts derived exactly like the model derives the barred set: LATER by global
  // queue_order, restricted to this run's resolved lane for a lane barrier.
  const later = model ? model.allRuns.filter((r) => r.queue_order > run.queue_order) : [];
  const laterInLane = hasLanes ? later.filter((r) => model.laneOf(r) === laneId) : later;
  const laneOpt = hasLanes
    ? `<option value="lane"${current === "lane" ? " selected" : ""}>Lane barrier — bars the ${laterInLane.length} later run(s) on ${escapeHtml(String(laneId))}</option>`
    : `<option value="lane" disabled>Lane barrier — unavailable: this roadmap declares no lanes</option>`;
  return `
      <div class="v3-edit-block" data-v3edit-op="set-barrier">
        <div class="v3-edit-block-title">Barrier</div>
        <div class="v3-edit-note">A barrier bars every LATER run in its scope from starting until this run completes. The bar is DERIVED from this one field: no dependency is written, and nothing changes for runs earlier in the queue.</div>
        <label class="v3-edit-field"><span class="v3-edit-label">Barrier</span><select data-v3edit-barrier>
          <option value=""${current ? "" : " selected"}>(no barrier)</option>
          ${laneOpt}
          <option value="global"${current === "global" ? " selected" : ""}>GLOBAL barrier — bars ALL ${later.length} later run(s), in every lane</option>
        </select></label>
        <div class="v3-edit-barrier-global v3-edit-danger" data-v3edit-barrier-global${current === "global" ? "" : " hidden"}>
          <div class="v3-edit-note">A global barrier is a project-wide synchronisation point: it holds ${later.length} later run(s) across ${hasLanes ? `all ${model.lanes.length} lanes` : "the whole queue"} until this run completes. That is the opposite of what lanes are for${hasLanes ? " — every lane stops, not just this one" : ""}. Prefer a lane barrier unless the whole project really must stop here.</div>
          <label class="v3-edit-field v3-edit-check"><input type="checkbox" data-v3edit-barrier-ack${current === "global" ? " checked" : ""}><span class="v3-edit-label">I mean this as a project-wide synchronisation point</span></label>
        </div>
      </div>
`;
}

// [#43] CLASSIFICATION block of the run editor — the write side of the six stored fields.
//
// Without it the fields validate but nobody can fill them except by hand-editing the canonical
// JSON, which is not a path the console can offer.
//
// WHAT IT OFFERS: the four closed vocabularies as selects (each with a "(not classified)"
// option that CLEARS the key, the set-lane gesture), and the guard list as free text — §1
// declares no vocabulary for its entries, so the console invents none.
//
// WHAT IT DELIBERATELY DOES NOT OFFER:
//   - `classified_at`. The engine writes it, as an ISO-8601 UTC instant in the same form this
//     repo already emits in `generated_at`. A mark the operator can type is a mark that can lie
//     about when the judgement was made.
//   - `severity` and `closure_mode`. They are derived and never stored, so there is nothing to
//     edit; the block PREVIEWS what the current selection would derive to, live off the same
//     module the drawer reads, which is the honest way to show that the two follow from the
//     four rather than being chosen beside them.
//
// The options come from the injected model's vocabularies, so no token is written in this file.
function v3RenderClassificationBlock(run, model) {
  const vocabularies = classificationModel && classificationModel.CLASSIFICATION_VOCABULARIES;
  // No model, no controls. Offering selects whose vocabulary we do not have would let the
  // operator submit tokens the engine is going to refuse.
  if (!vocabularies) return "";
  const fields = [
    ["correctness_model", "Correctness model", "correctnessmodel"],
    ["work_type", "Work type", "worktype"],
    ["blast_radius", "Blast radius", "blastradius"],
    ["failure_surfaces", "Failure surfaces", "failuresurfaces"]
  ];
  const selects = fields.map(([field, label, hook]) => {
    const current = typeof run[field] === "string" ? run[field] : "";
    const options = [
      `<option value=""${current ? "" : " selected"}>(not classified)</option>`,
      ...(vocabularies[field] || []).map((token) =>
        `<option value="${escapeHtml(token)}"${current === token ? " selected" : ""}>${escapeHtml(token)}</option>`)
    ].join("");
    return `<label class="v3-edit-field"><span class="v3-edit-label">${escapeHtml(label)}</span><select data-v3edit-${hook}>${options}</select></label>`;
  }).join("");

  const effects = Array.isArray(run.external_effects) ? run.external_effects.join(", ") : "";
  const derived = v3DerivedClassification(run);
  const derivedNow = (value) => (value ? escapeHtml(value) : "absent — the inputs it needs are not all set");

  return `
      <div class="v3-edit-block" data-v3edit-op="set-classification">
        <div class="v3-edit-block-title">Classification</div>
        <div class="v3-edit-note">The four measured fields plus the guard list, as specified in context/CLASIFICACION-DE-RUNS.md §1. All six are OPTIONAL: leaving a field on "(not classified)" stores nothing, and clearing every one of them clears the classification mark with them.</div>
        ${selects}
        <label class="v3-edit-field"><span class="v3-edit-label">External effects</span><input type="text" data-v3edit-externaleffects value="${escapeHtml(effects)}" placeholder="comma-separated; empty means none"></label>
        <div class="v3-edit-note">External effects is a GUARD LIST, empty by default. A non-empty list forces the closure mode to SEMI_ATTENDED as a minimum — it can only raise it, never lower it.</div>
        <div class="v3-edit-note v3-edit-derived-note">Currently derived from what is stored: <strong>severity</strong> ${derivedNow(derived.severity)} &middot; <strong>closure mode</strong> ${derivedNow(derived.closure_mode)}. Both are computed at read time and are NEVER written to the roadmap, so neither can be edited here. The mark <code>classified_at</code> is written by the engine, not typed.</div>
      </div>
`;
}

function v3RenderTextEditor(kind, id, node) {
  return `
    <div class="v3-edit v3-modal-edit" data-v3edit-target-kind="${escapeHtml(kind)}" data-v3edit-target-id="${escapeHtml(id)}">
      <div class="v3-edit-note">Editing ${escapeHtml(kind)}. ${escapeHtml(kind)}s carry only a title now. Edit it, then preview. The ${escapeHtml(kind)} id is identity and cannot change.</div>
      <div class="v3-edit-block" data-v3edit-op="set-text">
        <div class="v3-edit-block-title">Text</div>
        <label class="v3-edit-field"><span class="v3-edit-label">Title</span><input type="text" data-v3edit-title value="${escapeHtml(node.title)}"></label>
      </div>
      ${kind === "objective" ? v3RenderObjectiveEditorExtras(id, node) : ""}
      <div class="v3-edit-actions">
        <button class="btn btn-secondary btn-sm" type="button" data-v3edit-batch>Preview all changes</button>
        <div class="v3-edit-note">One preview, one confirm, one write covering every field changed above.</div>
      </div>
      <div id="v3-edit-preview" class="v3-edit-preview" hidden></div>
    </div>
  `;
}

function v3RenderObjectiveEditorExtras(id, node) {
  // Objective-only controls (Run B). Position = presentational reorder (move-objective);
  // Archive = the single stored objective flag (set-objective-archived). Each block declares
  // the op it produces via data-v3edit-op so the global batch preview can collect it.
  const model = v3EditModel();
  const objectives = model && model.roadmap ? (model.roadmap.objectives || []) : [];
  const total = objectives.length;
  const currentIndex = objectives.findIndex((o) => o.objective_id === id) + 1;
  const isArchived = !!(node && node.archived === true);
  return `
      <div class="v3-edit-block" data-v3edit-op="move-objective">
        <div class="v3-edit-block-title">Position</div>
        <div class="v3-edit-note">Objectives are a display grouping only. This reorders where the objective appears in the Roadmap tree; no run changes queue_order.</div>
        <label class="v3-edit-field"><span class="v3-edit-label">Move to position (1 to ${total})</span><input type="number" data-v3edit-objposition min="1" max="${total}" value="${currentIndex}"></label>
      </div>
      <div class="v3-edit-block" data-v3edit-op="set-objective-archived">
        <div class="v3-edit-block-title">Archive</div>
        <div class="v3-edit-note">Archiving moves this objective under a collapsible Archive header at the bottom of the tree. The core refuses archiving an objective that holds an active run.</div>
        <label class="v3-edit-field v3-edit-check"><input type="checkbox" data-v3edit-archived${isArchived ? " checked" : ""}><span class="v3-edit-label">Archived</span></label>
      </div>
  `;
}

function v3RenderInsertForm(target, model) {
  const statusOptions = ["planned", "active", "completed", "blocked"]
    .map((s) => `<option value="${s}"${s === "planned" ? " selected" : ""}>${escapeHtml(s)}</option>`).join("");
  const phaseEntry = v3FindPhase(model, target.anchorId);
  const phaseLabel = phaseEntry ? phaseEntry.phase.title : String(target.anchorId || "");
  const total = model.allRuns.length;
  // Read-only CONTEXT, not a prefill: the span of queue_order the anchor phase occupies today.
  const phaseOrders = (phaseEntry && Array.isArray(phaseEntry.phase.runs) ? phaseEntry.phase.runs : []).map((r) => r.queue_order);
  const phaseSpan = phaseOrders.length
    ? `${phaseLabel} currently holds #${Math.min(...phaseOrders)} to #${Math.max(...phaseOrders)}`
    : `${phaseLabel} currently holds no runs`;
  return `
    <div class="v3-edit v3-modal-edit" data-v3edit-insert data-v3edit-anchor-phase="${escapeHtml(String(target.anchorId || ""))}">
      <div class="v3-edit-note">Insert a new run. Run ID is required, must be new, and becomes permanent identity. The core refuses duplicates and forward dependencies.</div>
      <div class="v3-edit-block">
        <div class="v3-edit-block-title">Where</div>
        <div class="v3-edit-note">Enter the position where this run will REALLY execute. Nothing is prefilled: a queue_order is an assertion about execution order, and the console cannot derive one — only you know it. Lower numbers place the run earlier; the whole queue re-sequences around it.</div>
        <div class="v3-edit-note">Queue of ${total} runs; ${escapeHtml(phaseSpan)}.</div>
        <label class="v3-edit-field"><span class="v3-edit-label">Position (1 to ${total + 1})</span><input type="number" data-v3edit-insert-position min="1" max="${total + 1}" placeholder="enter a position"></label>
        <div class="v3-edit-note" data-v3edit-insert-where>${escapeHtml(V3_INSERT_NO_POSITION_TEXT)}</div>
      </div>
      <div class="v3-edit-block">
        <div class="v3-edit-block-title">New run</div>
        <label class="v3-edit-field"><span class="v3-edit-label">Run ID (required, new)</span><input type="text" data-v3edit-newid placeholder="RUN-..."></label>
        <label class="v3-edit-field"><span class="v3-edit-label">Title</span><input type="text" data-v3edit-title></label>
        <label class="v3-edit-field"><span class="v3-edit-label">Summary</span><textarea data-v3edit-summary rows="2"></textarea></label>
        <label class="v3-edit-field"><span class="v3-edit-label">Full description</span><textarea data-v3edit-fulldesc rows="4"></textarea></label>
        <label class="v3-edit-field"><span class="v3-edit-label">Status</span><select data-v3edit-status>${statusOptions}</select></label>
      </div>
      <div class="v3-edit-block">
        <div class="v3-edit-block-title">Dependencies</div>
        <div class="v3-edit-note">Dependencies must be earlier than the new run's position; the core refuses forward links. Eligible runs appear once a position is entered.</div>
        ${v3RenderDepPicker("insertdeps", "multi", [], [], model)}
      </div>
      <button class="btn btn-secondary btn-sm" type="button" data-v3edit-op="insert">Preview insert</button>
      <div id="v3-edit-preview" class="v3-edit-preview" hidden></div>
    </div>
  `;
}

// Insert position helpers. The core takes only --after/--before/--end-of-phase; these translate
// an operator-facing global queue position into that vocabulary without adding any core parameter.
// position N  -> after the run currently at queue_order N-1
// position 1  -> before the run currently at queue_order 1
//
// THERE IS NO DEFAULT POSITION, and the absence is the repair.
//
// "Add run" used to prefill end-of-phase (the anchor phase's highest queue_order + 1). Clicked on
// an early phase that produces a LOW queue_order, and a queue_order is not a slot: it asserts that
// the run executes near the start of the project. The rule this roadmap is governed by is that a
// run is inserted where it will really execute, never at the end nor at the beginning for
// convenience — and the launchers run nearly landed at position 2 down exactly this path.
//
// Every candidate default asserts the same kind of thing (end-of-queue and the execution frontier
// included), and when a run will really execute is the operator's judgement: it is not derivable
// from anything the console can read. So the field is born EMPTY and the preview refuses until it
// is filled. Cabin decision of 2026-07-30, recorded in
// context/aiw-console/records/DEFECTOS-CONSOLA-Y-ESPEJO.md.
const V3_INSERT_NO_POSITION_TEXT = "No position entered yet — enter one to see where the run lands.";
const V3_INSERT_NEEDS_POSITION_MESSAGE = "Enter a position before previewing. This run's queue_order says when it executes, so the console will not choose one for you: type the position where it will really run, between #1 and the end of the queue.";

// The position currently entered, clamped to the queue, or NULL when the field is empty or holds
// no number. Null is a real answer here — "the operator has not said yet" — and every caller
// handles it rather than substituting a guess.
function v3InsertCurrentPosition(model) {
  const total = model ? model.allRuns.length : 0;
  const modal = byId("edit-modal-body");
  const input = modal ? modal.querySelector("[data-v3edit-insert-position]") : null;
  if (!input) return null;
  const n = parseInt(input.value, 10);
  if (!Number.isFinite(n)) return null;
  if (n < 1) return 1;
  if (n > total + 1) return total + 1;
  return n;
}

function v3InsertRunAtOrder(model, order) {
  return model ? model.allRuns.find((r) => r.queue_order === order) || null : null;
}

function v3InsertAnchorArgs(model, phaseId, position) {
  const entry = v3FindPhase(model, phaseId);
  const phaseEmpty = !(entry && entry.phase && Array.isArray(entry.phase.runs) && entry.phase.runs.length);
  // An empty launched phase has no neighbors; keep the end-of-phase association the core assigns.
  if (phaseEmpty) return { endOfPhase: phaseId };
  if (position <= 1) {
    const first = v3InsertRunAtOrder(model, 1);
    if (first) return { before: first.run_id };
    return { endOfPhase: phaseId };
  }
  const prev = v3InsertRunAtOrder(model, position - 1);
  if (prev) return { after: prev.run_id };
  return { endOfPhase: phaseId };
}

function v3InsertPhaseTitleForRun(model, run) {
  if (!model || !run) return "";
  const ctx = model.contextByRunId.get(run.run_id);
  return ctx && ctx.phase ? ctx.phase.title : "";
}

function v3InsertWhereText(model, phaseId, position) {
  const total = model ? model.allRuns.length : 0;
  // No position entered: name the absence instead of describing a landing nobody asked for.
  if (position == null) return V3_INSERT_NO_POSITION_TEXT;
  const anchor = v3InsertAnchorArgs(model, phaseId, position);
  let landing = "at end of phase";
  let phaseTitle;
  if ("before" in anchor) {
    landing = "before " + anchor.before;
    phaseTitle = v3InsertPhaseTitleForRun(model, model.runsById.get(anchor.before));
  } else if ("after" in anchor) {
    landing = "after " + anchor.after;
    phaseTitle = v3InsertPhaseTitleForRun(model, model.runsById.get(anchor.after));
  } else {
    const entry = v3FindPhase(model, phaseId);
    phaseTitle = entry && entry.phase ? entry.phase.title : String(phaseId || "");
  }
  const resulting = Math.max(1, Math.min(position, total + 1));
  return "Resulting position: #" + resulting + " of " + (total + 1) + ". Lands in " + phaseTitle + " (" + landing + ").";
}

function v3InsertOnPositionChange() {
  const model = v3EditModel();
  const modal = byId("edit-modal-body");
  const t = v3EditModalTarget;
  if (!model || !modal || !t) return;
  const position = v3InsertCurrentPosition(model);
  const where = modal.querySelector("[data-v3edit-insert-where]");
  if (where) where.textContent = v3InsertWhereText(model, t.anchorId, position);
  const depsPicker = modal.querySelector('[data-v3edit-picker="insertdeps"]');
  if (depsPicker) {
    const chipsWrap = depsPicker.querySelector("[data-v3edit-chips]");
    if (chipsWrap) {
      Array.prototype.slice.call(chipsWrap.querySelectorAll("[data-v3edit-chip]")).forEach((chip) => {
        const id = chip.getAttribute("data-v3edit-chip");
        const run = model.runsById.get(id);
        // With the position cleared no run is known-earlier, so no dependency is eligible.
        if (!run || position == null || run.queue_order >= position) chip.remove();
      });
    }
    v3EditPickerRender(depsPicker);
  }
  v3MarkModalDirty();
}

function v3DepChipHtml(id, model) {
  const run = model && model.runsById.get(id);
  const label = run ? ("#" + run.queue_order + " " + run.title) : id;
  return `<span class="v3-edit-chip" data-v3edit-chip="${escapeHtml(id)}"><span class="v3-edit-chip-label">${escapeHtml(label)}</span><button type="button" class="v3-edit-chip-remove" data-v3edit-chip-remove aria-label="Remove ${escapeHtml(id)}">x</button></span>`;
}

// Dependency picker: a native <select> dropdown listing every eligible run in queue_order order
// (eligibility rules unchanged, see v3EditPickerEligible). Picking an option adds a removable
// chip; the chips remain the single source of the selected run ids (read by v3EditPickerValues).
// Multi pickers keep adding chips; single pickers replace. The dropdown is rebuilt by
// v3EditPickerRender whenever the selection or the insert Position changes.
function v3RenderDepPicker(name, mode, eligible, selected, model) {
  const selectedIds = selected || [];
  const chips = selectedIds.map((id) => v3DepChipHtml(id, model)).join("");
  const available = (eligible || []).filter((r) => selectedIds.indexOf(r.run_id) === -1);
  return `
    <div class="v3-edit-picker" data-v3edit-picker="${escapeHtml(name)}" data-v3edit-picker-mode="${escapeHtml(mode)}">
      <div class="v3-edit-chips" data-v3edit-chips>${chips}</div>
      <select class="v3-edit-picker-search" data-v3edit-picker-select>${v3EditPickerOptionsHtml(available, v3EditPickerPrompt(mode))}</select>
    </div>
  `;
}

// Options for the dependency dropdown: a value-less prompt row, then one option per eligible run
// in queue_order order. The visible label keeps the required "#<queue_order> -- <title>" form and
// appends the run_id so identity stays visible; the option value carries the run_id.
function v3EditPickerOptionsHtml(runs, prompt) {
  const ordered = (runs || []).slice().sort((a, b) => a.queue_order - b.queue_order);
  const head = `<option value="">${escapeHtml(prompt)}</option>`;
  const options = ordered.map((r) => `<option value="${escapeHtml(r.run_id)}">#${r.queue_order} -- ${escapeHtml(r.title)} -- ${escapeHtml(r.run_id)}</option>`).join("");
  return head + options;
}

function v3EditPickerPrompt(mode) {
  return mode === "single" ? "Select a run..." : "Add a run...";
}

function v3EditPickerValues(picker) {
  return Array.prototype.slice.call(picker.querySelectorAll("[data-v3edit-chip]")).map((c) => c.getAttribute("data-v3edit-chip"));
}

function v3EditPickerEligible(name, model) {
  const t = v3EditModalTarget;
  if (name === "deps" && t && t.kind === "run") {
    const run = model.runsById.get(t.id);
    return run ? model.allRuns.filter((r) => r.queue_order < run.queue_order) : [];
  }
  if ((name === "swap" || name === "reassign") && t && t.kind === "run") {
    return model.allRuns.filter((r) => r.run_id !== t.id);
  }
  if (name === "insertdeps") {
    const position = v3InsertCurrentPosition(model);
    // Eligibility is "earlier than the new run". With no position entered there is no "earlier",
    // so the picker offers nothing rather than offering everything.
    if (position == null) return [];
    return model.allRuns.filter((r) => r.queue_order < position);
  }
  return model.allRuns.slice();
}

// Rebuild the dropdown to match the current eligibility and selection. Called after a pick, after
// a chip is removed, and when the insert Position changes (v3InsertOnPositionChange). Eligibility
// is unchanged (v3EditPickerEligible); already-selected runs are excluded so they cannot be added
// twice. The prompt row is reselected so the control returns to its neutral state.
function v3EditPickerRender(picker) {
  if (!picker) return;
  const name = picker.getAttribute("data-v3edit-picker");
  const mode = picker.getAttribute("data-v3edit-picker-mode");
  const select = picker.querySelector("[data-v3edit-picker-select]");
  const model = v3EditModel();
  if (!model || !select) return;
  const selected = v3EditPickerValues(picker);
  const available = v3EditPickerEligible(name, model).filter((r) => selected.indexOf(r.run_id) === -1);
  select.innerHTML = v3EditPickerOptionsHtml(available, v3EditPickerPrompt(mode));
  select.value = "";
}

function v3EditPickerPick(pick) {
  const picker = pick.closest("[data-v3edit-picker]");
  if (!picker) return;
  const mode = picker.getAttribute("data-v3edit-picker-mode");
  const chips = picker.querySelector("[data-v3edit-chips]");
  const id = pick.getAttribute("data-v3edit-picker-pick");
  if (mode === "single") chips.innerHTML = "";
  if (v3EditPickerValues(picker).indexOf(id) === -1) chips.insertAdjacentHTML("beforeend", v3DepChipHtml(id, v3EditModel()));
  const search = picker.querySelector("[data-v3edit-picker-search]");
  if (search) { search.value = ""; search.focus(); }
  v3EditPickerRender(picker);
  v3MarkModalDirty();
}

// Change handler for the dependency dropdown: add the chosen run as a chip (single pickers first
// clear the existing chip), never add a run twice, then rebuild the dropdown and reset it.
function v3EditPickerOnSelect(select) {
  const picker = select.closest("[data-v3edit-picker]");
  if (!picker) return;
  const id = select.value;
  if (!id) { v3EditPickerRender(picker); return; }
  const mode = picker.getAttribute("data-v3edit-picker-mode");
  const chips = picker.querySelector("[data-v3edit-chips]");
  if (mode === "single") chips.innerHTML = "";
  if (v3EditPickerValues(picker).indexOf(id) === -1) {
    chips.insertAdjacentHTML("beforeend", v3DepChipHtml(id, v3EditModel()));
  }
  v3EditPickerRender(picker);
  v3MarkModalDirty();
}

function v3EditChipRemove(btn) {
  const chip = btn.closest("[data-v3edit-chip]");
  const picker = btn.closest("[data-v3edit-picker]");
  if (chip) chip.remove();
  if (picker) v3EditPickerRender(picker);
  v3MarkModalDirty();
}

function v3EditSetRemoveChoice(choice) {
  if (choice === "drop") {
    v3EditRemoveChoice = "drop";
  } else if (choice === "reassign") {
    const picker = byId("edit-modal-body").querySelector('[data-v3edit-picker="reassign"]');
    const vals = picker ? v3EditPickerValues(picker) : [];
    if (!vals[0]) return;
    v3EditRemoveChoice = { reassignTo: vals[0] };
  }
  v3EditPreview("remove");
}

function v3ModalAttachHandlers() {
  const modal = byId("edit-modal");
  if (!modal || modal.dataset.v3ModalWired === "true") return;
  modal.dataset.v3ModalWired = "true";
  modal.addEventListener("click", (event) => {
    const batchBtn = event.target.closest("[data-v3edit-batch]");
    if (batchBtn && modal.contains(batchBtn)) { v3EditPreviewAllChanges(); return; }
    const previewBtn = event.target.closest("button[data-v3edit-op]");
    if (previewBtn && modal.contains(previewBtn)) { v3EditPreview(previewBtn.getAttribute("data-v3edit-op")); return; }
    if (event.target.closest("[data-v3edit-confirm]")) { v3EditConfirm(); return; }
    if (event.target.closest("[data-v3edit-cancel]")) { v3EditCancelPreview(); return; }
    if (event.target.closest("[data-v3edit-retry]")) { v3EditRetryAfterStale(); return; }
    const pick = event.target.closest("[data-v3edit-picker-pick]");
    if (pick) { v3EditPickerPick(pick); return; }
    const chipRemove = event.target.closest("[data-v3edit-chip-remove]");
    if (chipRemove) { v3EditChipRemove(chipRemove); return; }
    const depChoice = event.target.closest("[data-v3edit-dep-choice]");
    if (depChoice) { v3EditSetRemoveChoice(depChoice.getAttribute("data-v3edit-dep-choice")); return; }
  });
  modal.addEventListener("input", (event) => {
    const search = event.target.closest("[data-v3edit-picker-search]");
    if (search) { v3EditPickerRender(search.closest("[data-v3edit-picker]")); return; }
    const posInput = event.target.closest("[data-v3edit-insert-position]");
    if (posInput) { v3InsertOnPositionChange(); return; }
    if (event.target.closest(".v3-edit-block")) v3MarkModalDirty();
  });
  modal.addEventListener("change", (event) => {
    const pickerSelect = event.target.closest("[data-v3edit-picker-select]");
    if (pickerSelect) { v3EditPickerOnSelect(pickerSelect); return; }
    const statusSel = event.target.closest("[data-v3edit-status]");
    if (statusSel) {
      const field = modal.querySelector("[data-v3edit-closeout-field]");
      if (field) field.hidden = !(statusSel.value === "completed" || statusSel.value === "blocked");
    }
    // [#46 amendment] The write-your-own gate. Selecting the sentinel REVEALS the free-text
    // box; moving back to a suggested outcome hides it and does NOT clear it, so a wandering
    // click never destroys typing the operator has not confirmed yet. Which of the two the
    // close actually carries is decided at collection, by the select — never by the box.
    const closeoutSel = event.target.closest("[data-v3edit-closeout-choice]");
    if (closeoutSel) {
      const custom = modal.querySelector("[data-v3edit-closeout-custom]");
      const isCustom = closeoutSel.value === V3_CLOSEOUT_CUSTOM;
      if (custom) custom.hidden = !isCustom;
      if (isCustom) {
        const box = modal.querySelector("[data-v3edit-closeout]");
        if (box && box.focus) box.focus();
      }
      v3MarkModalDirty();
    }
    // [D-051] The GLOBAL barrier gate. Selecting global OPENS the danger panel; leaving
    // global closes it AND clears the acknowledgement, so arming is per-selection and can
    // never be inherited from a choice the operator has since moved away from.
    const barrierSel = event.target.closest("[data-v3edit-barrier]");
    if (barrierSel) {
      const panel = modal.querySelector("[data-v3edit-barrier-global]");
      const isGlobal = barrierSel.value === "global";
      if (panel) panel.hidden = !isGlobal;
      if (!isGlobal) {
        const ack = modal.querySelector("[data-v3edit-barrier-ack]");
        if (ack) ack.checked = false;
      }
    }
    const anchorSel = event.target.closest("[data-v3edit-anchor-mode]");
    if (anchorSel) {
      const runWrap = modal.querySelector("[data-v3edit-anchor-run]");
      if (runWrap) runWrap.hidden = anchorSel.value === "end-of-phase";
    }
    v3MarkModalDirty();
  });
  modal.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    const search = event.target.closest("[data-v3edit-picker-search]");
    if (search) {
      event.preventDefault();
      const picker = search.closest("[data-v3edit-picker]");
      const firstResult = picker.querySelector("[data-v3edit-picker-pick]");
      if (firstResult) v3EditPickerPick(firstResult);
    }
  });
}

function v3EditBeforeNode() {
  const t = v3EditModalTarget;
  // v3EditModel(), never the bare cache: this function decides whether "Preview all changes"
  // sees any change at all, and a null here silently answers "nothing changed".
  const model = v3EditModel();
  if (!t || !model) return null;
  if (t.kind === "run") return model.runsById.get(t.id);
  if (t.kind === "phase") { const e = v3FindPhase(model, t.id); return e ? e.phase : null; }
  if (t.kind === "objective") return (model.roadmap.objectives || []).find((o) => o.objective_id === t.id) || null;
  return null;
}

const V3_BATCHABLE_OPS = ["set-text", "set-deps", "set-human-deps", "set-status", "set-lane", "set-barrier", "set-classification", "clear-progress", "move", "move-objective", "set-objective-archived"];

// The core applies batch sub-ops IN ARRAY ORDER and aborts on the first that errors. One pair
// has a hard ordering requirement: clear-progress MUST precede set-status. set-status refuses to
// close a run while its progress still holds a non-done (running/waiting) entry, and
// clear-progress is what removes that progress; the reversed batch is rejected by the core with
// "closing to completed requires every progress entry to be done". But the blocks are collected
// in DOM order, where the set-status block precedes the clear-progress block (the clear-progress
// block is appended AFTER it in v3RenderRunEditor), so a raw collection sends the doomed
// [set-status, clear-progress]. We therefore reorder the COLLECTED ops by dependency priority
// before returning. clear-progress touches only the progress key, so it is order-independent
// with set-text / move / set-deps and safe to hoist ahead of them; the only constraint it has is
// "before set-status", which ranking it first satisfies.
//
// NOTE: V3_BATCHABLE_OPS is a MEMBERSHIP FILTER only (used via .includes below); it does NOT
// govern batch order, so reordering that array would not fix this -- the order is decided here.
const V3_BATCH_OP_PRIORITY = { "clear-progress": 0 };
const v3BatchOpPriority = (payload) =>
  Object.prototype.hasOwnProperty.call(V3_BATCH_OP_PRIORITY, payload.op) ? V3_BATCH_OP_PRIORITY[payload.op] : 1;

function v3EditBuildBatch() {
  // Collect the CHANGED sub-ops from every batchable block in the modal. Diffs each block's
  // produced args against the before-node and includes a sub-op ONLY when something actually
  // differs -- never trusts the blind v3EditModalDirty flag. Collected in DOM order, then
  // reordered by dependency priority (see V3_BATCH_OP_PRIORITY above).
  const modal = byId("edit-modal-body");
  const beforeNode = v3EditBeforeNode();
  const collected = [];
  let considered = 0;
  if (modal) {
    modal.querySelectorAll(".v3-edit-block[data-v3edit-op]").forEach((block) => {
      const op = block.getAttribute("data-v3edit-op");
      if (!V3_BATCHABLE_OPS.includes(op)) return;
      considered += 1;
      const payload = v3EditBuildPayload(op);
      if (!payload) return;
      if (v3BatchOpChanged(op, payload.args, beforeNode)) collected.push(payload);
    });
  }
  // Stable reorder by dependency priority: lower rank first, ties broken by original DOM index so
  // every op the priority map does NOT name keeps its collected (DOM) order exactly. The explicit
  // index tie-break makes this correct regardless of Array.sort stability.
  const ops = collected
    .map((payload, index) => ({ payload, index }))
    .sort((a, b) => (v3BatchOpPriority(a.payload) - v3BatchOpPriority(b.payload)) || (a.index - b.index))
    .map((entry) => entry.payload);
  return { ops, considered };
}

// [#47] THE OP REGISTRY of the console's edit plumbing — one entry per op, and the entry is
// everything this file's op plumbing knows about that op.
//
// WHAT IT REPLACES. Registering an op here used to mean naming it in FOUR places: the
// batchable list above, the change detector, the payload builder and the preview diff. Only
// the first is a policy declaration; the other three were an `if (op === "...")` arm each,
// spread over four hundred lines, and the record ALTA-DEPENDS-ON-HUMAN-APPROVED §C.4 measured
// them as the console's share of the mechanical enumeration every new run field repeats. They
// are now three slots of ONE entry, so everything the console does with an op is read — and
// written — in one place.
//
// The entry:
//   `targetKind`     the modal target this op applies to ("run" | "objective"), enforced by
//                    v3EditBuildPayload. Omitted when the op decides for itself: `set-text`
//                    serves all three kinds, and `insert` / `batch` take no kind at all.
//   `payload`        (ctx) -> the op's ARGS, or null. The op name is stamped by the builder
//                    from the key, so an entry names its op exactly once. NULL MEANS "the
//                    operator did not ask for this op", and a null payload never enters a
//                    batch — the clear-progress and unacknowledged-barrier gates both live in
//                    that null. ctx = { t, q, val, pickerValues }.
//   `changed`        (args, beforeNode) -> did the produced args differ from what is stored?
//                    Only batchable ops need one; without it the op never enters a batch.
//   `requiresBefore` the preview returns "" when there is no before-node. DECLARED PER OP
//                    because today's set is not uniform, and this registry RECORDS that set
//                    rather than widening it: `set-human-deps`, `swap`, `remove` and `insert`
//                    are deliberately absent from it, exactly as the hand-written guard had
//                    them. Changing who is in it is a behaviour change and belongs to a run
//                    that says so.
//   `diffRows`       (args, beforeNode, rows) -> pushes rows into the standard diff block.
//   `diffHtml`       (args, beforeNode) -> a complete preview block, for the four ops that do
//                    not render as rows.
//
// WHAT IT DOES NOT ABSORB, and the boundary is the commissioning run's own: THE LABELS. Every
// string below is the string that was there. `depends_on_human_approved` is still named
// verbatim and "(none — the key is removed)" is still its own sentence, because that text is
// semantics OF THE FIELD, not of the op. A generic renderer produces a generic label, and the
// field whose entire point is the AI/human difference is the field that lives in its label.
//
// AND BATCHABILITY IS NOT A COLUMN HERE. `V3_BATCHABLE_OPS` above stays the ONE declaration of
// which ops may be batched, so this table cannot disagree with it; it is also pinned as SOURCE
// TEXT by tests/depends-on-human-approved.test.mjs, a file outside this run's write scope. The
// engine's own op table (tools/roadmap/roadmap-plan.mjs) carries the same flag as a column,
// and that one is the authority — the console's list is a screen-side mirror of it.
const V3_OP_DESCRIPTORS = {
  batch: {
    payload: () => {
      const built = v3EditBuildBatch();
      return { ops: built.ops.map((p) => ({ op: p.op, args: p.args })) };
    },
    diffHtml: (args, beforeNode) => {
      const parts = (args.ops || []).map((sub, i) =>
        `<div class="v3-edit-batch-item"><div class="v3-edit-batch-item-head">${i + 1}. ${escapeHtml(sub.op)}</div>${v3EditDiffHtml(sub.op, sub.args, beforeNode)}</div>`
      ).join("");
      return `<div class="v3-edit-diff v3-edit-batch">${parts}</div>`;
    }
  },

  "set-text": {
    // No targetKind: this is the one op that serves all three, and a phase or an objective
    // has only a title to serve.
    payload: ({ t, val }) => {
      if (t.kind === "run") {
        return { targetType: "run", targetId: t.id, title: val("[data-v3edit-title]"), summary: val("[data-v3edit-summary]"), fullDescription: val("[data-v3edit-fulldesc]") };
      }
      if (t.kind === "phase") {
        return { targetType: "phase", targetId: t.id, title: val("[data-v3edit-title]") };
      }
      if (t.kind === "objective") {
        return { targetType: "objective", targetId: t.id, title: val("[data-v3edit-title]") };
      }
      return null;
    },
    changed: (args, beforeNode) =>
      (args.title !== undefined && String(args.title) !== String(beforeNode.title)) ||
      (args.summary !== undefined && String(args.summary) !== String(beforeNode.summary)) ||
      (args.fullDescription !== undefined && String(args.fullDescription) !== String(beforeNode.full_description)),
    diffHtml: (args, beforeNode) => {
      // P3: changed fields first, stacked full-width; unchanged fields collapse to one
      // de-emphasised line. A change is never hidden -- only an UNCHANGED field is de-emphasised.
      if (!beforeNode) return "";
      const fields = [];
      if (args.title !== undefined) fields.push(["Title", beforeNode.title, args.title]);
      if (args.summary !== undefined) fields.push(["Summary", beforeNode.summary, args.summary]);
      if (args.fullDescription !== undefined) fields.push(["Full description", beforeNode.full_description, args.fullDescription]);
      const changed = fields.filter((f) => String(f[1]) !== String(f[2]));
      const unchanged = fields.filter((f) => String(f[1]) === String(f[2])).map((f) => f[0]);
      let inner = changed.length
        ? changed.map((f) => v3EditDiffBlock(f[0], f[1], f[2])).join("")
        : '<div class="v3-edit-diff-none">No text changes in this preview.</div>';
      if (unchanged.length) inner += `<div class="v3-edit-diff-unchanged">Unchanged: ${escapeHtml(unchanged.join(", "))}</div>`;
      return `<div class="v3-edit-diff v3-edit-diff-text">${inner}</div>`;
    }
  },

  insert: {
    payload: ({ t, val, pickerValues }) => {
      const model = v3EditModel();
      const args = {
        runId: (val("[data-v3edit-newid]") || "").trim(),
        title: val("[data-v3edit-title]") || "",
        summary: val("[data-v3edit-summary]") || "",
        fullDescription: val("[data-v3edit-fulldesc]") || "",
        status: val("[data-v3edit-status]") || "planned",
        dependsOn: pickerValues('[data-v3edit-picker="insertdeps"]')
      };
      const position = v3InsertCurrentPosition(model);
      // No position, no payload. The refusal the operator sees is raised in v3EditPreview, which
      // checks the same condition; returning null here keeps the anchor from being invented.
      if (position == null) return null;
      Object.assign(args, v3InsertAnchorArgs(model, t.anchorId, position));
      return args;
    },
    diffRows: (args, beforeNode, rows) => {
      rows.push(v3EditDiffRow("New run id", "(new)", args.runId || "(missing)"));
      rows.push(v3EditDiffRow("Title", "(new)", args.title || "(empty)"));
      const anchor = args.endOfPhase ? ("end of phase " + args.endOfPhase) : args.after ? ("after " + args.after) : args.before ? ("before " + args.before) : "(unset)";
      rows.push(v3EditDiffRow("Anchor", "(new)", anchor));
      rows.push(v3EditDiffRow("depends_on", "(new)", (args.dependsOn || []).join(", ") || "(none)"));
    }
  },

  "move-objective": {
    targetKind: "objective",
    payload: ({ t, val }) => {
      const raw = val("[data-v3edit-objposition]");
      const n = parseInt(raw, 10);
      return { objectiveId: t.id, toIndex: Number.isFinite(n) ? n : raw };
    },
    changed: (args, beforeNode) => {
      const model = v3EditModel();
      const objs = (model && model.roadmap) ? (model.roadmap.objectives || []) : [];
      const currentIndex = objs.indexOf(beforeNode) + 1;
      return String(args.toIndex) !== String(currentIndex);
    },
    diffHtml: (args, beforeNode) => {
      const model = v3EditModel();
      const objs = (model && model.roadmap) ? (model.roadmap.objectives || []) : [];
      const fromPos = beforeNode ? objs.indexOf(beforeNode) + 1 : 0;
      const toPos = args.toIndex;
      const msg = (fromPos && String(fromPos) === String(toPos))
        ? "Objective " + args.objectiveId + " stays at position " + toPos + ". No run changes queue_order."
        : "Objective " + args.objectiveId + " moves from position " + (fromPos || "?") + " to position " + toPos + ". No run changes queue_order.";
      return `<div class="v3-edit-diff"><div class="v3-edit-plain">${escapeHtml(msg)}</div></div>`;
    }
  },

  "set-objective-archived": {
    targetKind: "objective",
    payload: ({ t, q }) => {
      const el = q("[data-v3edit-archived]");
      const archived = el ? !!el.checked : false;
      return { objectiveId: t.id, archived };
    },
    changed: (args, beforeNode) => (args.archived === true) !== (beforeNode.archived === true),
    diffHtml: (args, beforeNode) => {
      let activeCount = 0;
      if (beforeNode) (beforeNode.phases || []).forEach((ph) => (ph.runs || []).forEach((r) => { if (r.status === "active") activeCount += 1; }));
      const msg = args.archived === true
        ? "Objective " + args.objectiveId + " will be archived and moved under the Archive header. It holds " + (activeCount === 0 ? "no active runs" : activeCount + " active run(s)") + ". No run changes queue_order."
        : "Objective " + args.objectiveId + " will be un-archived and returned to the live list. No run changes queue_order.";
      return `<div class="v3-edit-diff"><div class="v3-edit-plain">${escapeHtml(msg)}</div></div>`;
    }
  },

  move: {
    targetKind: "run",
    payload: ({ t, val }) => {
      const raw = val("[data-v3edit-order]");
      const n = parseInt(raw, 10);
      return { run: t.id, toOrder: Number.isFinite(n) ? n : raw };
    },
    changed: (args, beforeNode) => String(args.toOrder) !== String(beforeNode.queue_order),
    requiresBefore: true,
    diffRows: (args, beforeNode, rows) => {
      rows.push(v3EditDiffRow("Position", "#" + beforeNode.queue_order, "#" + args.toOrder));
    }
  },

  "set-deps": {
    targetKind: "run",
    payload: ({ t, pickerValues }) => ({ run: t.id, dependsOn: pickerValues('[data-v3edit-picker="deps"]') }),
    changed: (args, beforeNode) => {
      const before = Array.isArray(beforeNode.depends_on) ? beforeNode.depends_on : [];
      const after = Array.isArray(args.dependsOn) ? args.dependsOn : [];
      return before.length !== after.length || before.some((id, i) => id !== after[i]);
    },
    requiresBefore: true,
    diffRows: (args, beforeNode, rows) => {
      rows.push(v3EditDiffRow("depends_on", (beforeNode.depends_on || []).join(", ") || "(none)", (args.dependsOn || []).join(", ") || "(none)"));
    }
  },

  "set-human-deps": {
    targetKind: "run",
    // [#45] Its OWN picker key, so the two lists can never read each other's chips. An empty
    // list travels as `[]` and the engine turns it into ABSENCE — the clearing gesture.
    payload: ({ t, pickerValues }) => ({ run: t.id, dependsOnHumanApproved: pickerValues('[data-v3edit-picker="humandeps"]') }),
    changed: (args, beforeNode) => {
      // [#45] Absent key and empty list are the SAME state on the before side, so opening the
      // modal on a run with no human-approval edges and closing it is correctly not a change.
      const before = Array.isArray(beforeNode.depends_on_human_approved) ? beforeNode.depends_on_human_approved : [];
      const after = Array.isArray(args.dependsOnHumanApproved) ? args.dependsOnHumanApproved : [];
      return before.length !== after.length || before.some((id, i) => id !== after[i]);
    },
    diffRows: (args, beforeNode, rows) => {
      // [#45] The key is named VERBATIM, like depends_on above: the preview reports what will be
      // written to disk. "(none)" on the after side means the KEY IS REMOVED, not stored empty.
      const after = (args.dependsOnHumanApproved || []).join(", ");
      rows.push(v3EditDiffRow(
        "depends_on_human_approved",
        (beforeNode.depends_on_human_approved || []).join(", ") || "(none)",
        after || "(none — the key is removed)"
      ));
    }
  },

  "set-status": {
    targetKind: "run",
    payload: ({ t, q, val }) => {
      const status = val("[data-v3edit-status]");
      const terminal = status === "completed" || status === "blocked";
      // [#46 amendment] The preselection is a SCREEN aid and stops here: the console sends the
      // text the operator is looking at, and the ENGINE still holds the obligation. Write-my-own
      // with an empty box sends NOTHING — so the refusal ("closing to completed requires a
      // closeout_result") stays reachable from the screen and this list can never become a
      // silent default the core fills in by itself.
      const choiceEl = q("[data-v3edit-closeout-choice]");
      const closeoutEl = q("[data-v3edit-closeout]");
      const custom = closeoutEl ? closeoutEl.value.trim() : "";
      const choice = choiceEl ? choiceEl.value : V3_CLOSEOUT_CUSTOM;
      const closeout = choice === V3_CLOSEOUT_CUSTOM ? custom : choice;
      const args = { run: t.id, status };
      if (terminal && closeout) args.closeoutResult = closeout;
      return args;
    },
    changed: (args, beforeNode) => {
      if (args.status !== beforeNode.status) return true;
      const beforeCo = "closeout_result" in beforeNode && beforeNode.closeout_result != null ? String(beforeNode.closeout_result) : "";
      const afterCo = args.closeoutResult != null ? String(args.closeoutResult) : "";
      return beforeCo !== afterCo;
    },
    requiresBefore: true,
    diffRows: (args, beforeNode, rows) => {
      rows.push(v3EditDiffRow("Status", beforeNode.status, args.status));
      const beforeCo = "closeout_result" in beforeNode && beforeNode.closeout_result != null ? String(beforeNode.closeout_result) : "(none)";
      rows.push(v3EditDiffRow("Closeout result", beforeCo, args.closeoutResult != null ? args.closeoutResult : "(none)"));
    }
  },

  "set-lane": {
    targetKind: "run",
    payload: ({ t, q }) => {
      const el = q("[data-v3edit-lane]");
      if (!el) return null;
      // "" (the project-default option) travels as null: the engine's clearing gesture.
      return { run: t.id, lane: el.value || null };
    },
    changed: (args, beforeNode) => {
      // Stored key vs chosen key; "" stands for "no stored lane" (the project default) on
      // both sides, so picking the default over an absent lane is correctly a no-op.
      const beforeLane = typeof beforeNode.lane === "string" && beforeNode.lane ? beforeNode.lane : "";
      const afterLane = args.lane != null ? String(args.lane) : "";
      return beforeLane !== afterLane;
    },
    requiresBefore: true,
    diffRows: (args, beforeNode, rows) => {
      const beforeLane = typeof beforeNode.lane === "string" && beforeNode.lane ? beforeNode.lane : "(project default)";
      rows.push(v3EditDiffRow("Lane", beforeLane, args.lane != null && args.lane !== "" ? args.lane : "(project default)"));
    }
  },

  "set-barrier": {
    targetKind: "run",
    payload: ({ t, q }) => {
      const el = q("[data-v3edit-barrier]");
      if (!el) return null;
      const scope = el.value || "";
      // The GLOBAL gate, enforced where it cannot be walked around: an unacknowledged global
      // produces NO payload, so it never enters the batch and cannot even be previewed. The
      // clear-progress precedent — the checkbox is the op's existence condition, not a hint.
      // Only "global" is gated: "lane" is ordinary planning and "" (clearing) is the safe
      // direction, and neither is asked to justify itself.
      if (scope === "global" && !v3BarrierGlobalAcknowledged()) return null;
      // "" (the no-barrier option) travels as null: the engine's clearing gesture.
      return { run: t.id, barrier: scope || null };
    },
    changed: (args, beforeNode) => {
      // Stored scope vs chosen scope; "" stands for "no barrier" on both sides, so picking
      // "(no barrier)" on a run that has none is correctly a no-op. An unacknowledged global
      // never reaches here at all — the payload builder returns null for it.
      const beforeBarrier = beforeNode.barrier === "lane" || beforeNode.barrier === "global" ? beforeNode.barrier : "";
      const afterBarrier = args.barrier != null ? String(args.barrier) : "";
      return beforeBarrier !== afterBarrier;
    },
    requiresBefore: true,
    diffRows: (args, beforeNode, rows) => {
      // Name the SCOPE and, for a scope that bars anything, the count it bars — read from the
      // model exactly as the barred set is derived, so the preview and the rendered roadmap
      // can never disagree about what this one field does.
      const model = v3EditModel();
      const scopeText = (scope) => {
        if (scope !== "lane" && scope !== "global") return "(no barrier)";
        if (!model) return scope === "global" ? "GLOBAL" : "lane";
        const later = model.allRuns.filter((r) => r.queue_order > beforeNode.queue_order);
        const n = scope === "global" ? later.length : later.filter((r) => model.laneOf(r) === model.laneOf(beforeNode)).length;
        return scope === "global"
          ? `GLOBAL — bars all ${n} later run(s), in every lane`
          : `lane — bars the ${n} later run(s) on ${model.laneOf(beforeNode)}`;
      };
      const beforeScope = beforeNode.barrier === "lane" || beforeNode.barrier === "global" ? beforeNode.barrier : "";
      rows.push(v3EditDiffRow("Barrier", scopeText(beforeScope), scopeText(args.barrier != null ? args.barrier : "")));
    }
  },

  "set-classification": {
    targetKind: "run",
    payload: ({ t, q }) => {
      // [#43] The four measured fields plus the guard list. "" (the "(not classified)" option and
      // an empty text box) travels as null: the engine's clearing gesture, the same one set-lane
      // and set-barrier use. `classified_at` is NOT collected — the engine writes the mark, so
      // there is no field here to read and no way for a request body to carry an instant.
      const sel = q("[data-v3edit-correctnessmodel]");
      if (!sel) return null;
      const pick = (selector) => { const el = q(selector); return el && el.value ? el.value : null; };
      const effectsEl = q("[data-v3edit-externaleffects]");
      const effectsRaw = effectsEl ? String(effectsEl.value || "") : "";
      const effects = effectsRaw.split(",").map((part) => part.trim()).filter(Boolean);
      return {
        run: t.id,
        correctnessModel: pick("[data-v3edit-correctnessmodel]"),
        workType: pick("[data-v3edit-worktype]"),
        blastRadius: pick("[data-v3edit-blastradius]"),
        failureSurfaces: pick("[data-v3edit-failuresurfaces]"),
        externalEffects: effects.length ? effects : null
      };
    },
    changed: (args, beforeNode) => {
      // [#43] Stored value vs chosen value, field by field; "" stands for "not classified" on
      // both sides, so re-picking what is already there is correctly a no-op and the mark is not
      // rewritten. `classified_at` is NOT compared: the engine sets it as a consequence of a real
      // change, so treating it as an input would make every open-and-close of the modal a write.
      const changedToken = ["correctness_model", "work_type", "blast_radius", "failure_surfaces"].some((field) => {
        const option = { correctness_model: "correctnessModel", work_type: "workType", blast_radius: "blastRadius", failure_surfaces: "failureSurfaces" }[field];
        const before = typeof beforeNode[field] === "string" ? beforeNode[field] : "";
        const after = args[option] != null ? String(args[option]) : "";
        return before !== after;
      });
      const beforeEffects = Array.isArray(beforeNode.external_effects) ? beforeNode.external_effects : [];
      const afterEffects = Array.isArray(args.externalEffects) ? args.externalEffects : [];
      const changedEffects = beforeEffects.length !== afterEffects.length ||
        beforeEffects.some((value, i) => value !== afterEffects[i]);
      return changedToken || changedEffects;
    },
    requiresBefore: true,
    diffRows: (args, beforeNode, rows) => {
      // [#43] Field by field, then the two DERIVED values before and after — because the point
      // of the four selects is what they derive to, and an operator confirming a write should see
      // that consequence in the same preview, not discover it in the drawer afterwards.
      const map = { correctness_model: "correctnessModel", work_type: "workType", blast_radius: "blastRadius", failure_surfaces: "failureSurfaces" };
      const after = {};
      Object.entries(map).forEach(([field, option]) => {
        const value = args[option] != null && args[option] !== "" ? String(args[option]) : null;
        rows.push(v3EditDiffRow(field, typeof beforeNode[field] === "string" ? beforeNode[field] : "(not classified)", value || "(not classified)"));
        if (value) after[field] = value;
      });
      const afterEffects = Array.isArray(args.externalEffects) ? args.externalEffects : [];
      if (afterEffects.length) after.external_effects = afterEffects;
      rows.push(v3EditDiffRow(
        "external_effects",
        (Array.isArray(beforeNode.external_effects) ? beforeNode.external_effects : []).join(", ") || "(none)",
        afterEffects.join(", ") || "(none)"
      ));
      const beforeDerived = v3DerivedClassification(beforeNode);
      const afterDerived = v3DerivedClassification(after);
      rows.push(v3EditDiffRow("severity (derived)", beforeDerived.severity || "(absent)", afterDerived.severity || "(absent)"));
      rows.push(v3EditDiffRow("closure_mode (derived)", beforeDerived.closure_mode || "(absent)", afterDerived.closure_mode || "(absent)"));
      rows.push(v3EditDiffRow(
        "classified_at",
        typeof beforeNode.classified_at === "string" ? beforeNode.classified_at : "(none)",
        Object.keys(after).length ? "(written by the engine — ISO-8601 UTC instant)" : "(cleared with the classification)"
      ));
    }
  },

  "clear-progress": {
    targetKind: "run",
    payload: ({ t, q }) => {
      // An UNTICKED box produces no payload at all, so the op is simply absent from the batch
      // (v3EditBuildBatch skips a null payload). Retiring a record is never the default.
      const el = q("[data-v3edit-clearprogress]");
      if (!el || !el.checked) return null;
      return { run: t.id };
    },
    changed: (args, beforeNode) =>
      // The payload builder returns null unless the box is ticked, so a payload reaching here
      // already means the operator asked for it. The remaining test is that there is really a
      // record to retire, so a no-op never enters the batch.
      Array.isArray(beforeNode.progress) && beforeNode.progress.length > 0,
    requiresBefore: true,
    diffRows: (args, beforeNode, rows) => {
      // Name the record being retired entry by entry. The whole reason this is a separate op is
      // that the loss should be READ before it is confirmed, not buried in a status change.
      const entries = Array.isArray(beforeNode.progress) ? beforeNode.progress : [];
      const lines = entries.map((e) => `Round ${e.cycle} / ${e.stage} / attempt ${e.attempt} / ${e.state}${e.result ? " / " + e.result : ""}`);
      rows.push(v3EditDiffRow("Progress record", lines.length ? lines.join(" | ") : "(none)", "(retired -- key removed)"));
      rows.push(v3EditDiffRow("Status", beforeNode.status, beforeNode.status + " (unchanged by this op)"));
    }
  },

  swap: {
    targetKind: "run",
    payload: ({ t, pickerValues }) => {
      const vals = pickerValues('[data-v3edit-picker="swap"]');
      return { run: t.id, withRun: vals[0] || "" };
    },
    diffRows: (args, beforeNode, rows) => {
      rows.push(v3EditDiffRow("Swap with", "(this run)", args.withRun || "(none selected)"));
    }
  },

  remove: {
    targetKind: "run",
    payload: ({ t }) => {
      const args = { run: t.id };
      if (v3EditRemoveChoice === "drop") args.dropDependentEdges = true;
      else if (v3EditRemoveChoice && v3EditRemoveChoice.reassignTo) args.reassignDependentsTo = v3EditRemoveChoice.reassignTo;
      return args;
    },
    diffRows: (args, beforeNode, rows) => {
      rows.push(v3EditDiffRow("Remove run", args.run, "(removed)"));
      if (args.reassignDependentsTo) rows.push(v3EditDiffRow("Dependents", "reassign to " + args.reassignDependentsTo, "reassigned"));
      if (args.dropDependentEdges) rows.push(v3EditDiffRow("Dependents", "drop links", "dropped"));
    }
  }
};

// Own-property lookup, never `V3_OP_DESCRIPTORS[op]` bare: an op name is a string off the DOM
// or off a request body, and a bare index would answer "constructor" or "toString" with an
// Object.prototype member. An UNREGISTERED op is inert in all three consumers below — null
// payload, unchanged, empty diff — exactly as the if-chains they replaced fell through to.
function v3OpDescriptor(op) {
  return Object.prototype.hasOwnProperty.call(V3_OP_DESCRIPTORS, op) ? V3_OP_DESCRIPTORS[op] : null;
}

function v3BatchOpChanged(op, args, beforeNode) {
  // True only when the produced args differ from the before-node's current values.
  // [#47] The comparison itself lives on the op's registry entry; an op with no `changed`
  // slot answers false, which is what a non-batchable op has always answered here.
  if (!beforeNode) return false;
  const descriptor = v3OpDescriptor(op);
  return descriptor && descriptor.changed ? descriptor.changed(args, beforeNode) : false;
}

// [D-051] Is the GLOBAL barrier acknowledged right now? Read straight off the modal, so
// the gate has ONE definition serving both the payload builder (which withholds the op)
// and the preview button (which explains why nothing happened).
function v3BarrierGlobalAcknowledged() {
  const modal = byId("edit-modal-body");
  const ack = modal ? modal.querySelector("[data-v3edit-barrier-ack]") : null;
  return !!(ack && ack.checked);
}

// A GLOBAL barrier is SELECTED but not acknowledged: the operator asked for something the
// gate is deliberately withholding. Distinguishing this from "nothing changed" is the whole
// point — silence would read as a broken button rather than as a gate.
function v3BarrierGlobalPendingAck() {
  const modal = byId("edit-modal-body");
  const sel = modal ? modal.querySelector("[data-v3edit-barrier]") : null;
  return !!(sel && sel.value === "global" && !v3BarrierGlobalAcknowledged());
}

async function v3EditPreviewAllChanges() {
  // One preview across every changed batchable block. If nothing differs, say so plainly and
  // post nothing. Otherwise route through the pinned v3EditPreview (apply: false) unchanged.
  const batch = v3EditBuildBatch();
  if (!batch.ops.length) {
    v3EditSetPanel(v3BarrierGlobalPendingAck()
      ? '<div class="v3-edit-preview-status">A GLOBAL barrier is selected but not acknowledged, so it is not part of this preview. Tick the acknowledgement in the Barrier block to include it — or pick a lane barrier instead.</div>'
      : '<div class="v3-edit-preview-status">No changes to preview. Edit a field above, then preview all changes.</div>');
    return;
  }
  await v3EditPreview("batch");
}

function v3EditBuildPayload(op) {
  // [#47] Reads the modal ONCE into a context, then hands it to the op's registry entry.
  // The kind guard that used to sit as a bare `if (t.kind !== "run") return null;` between
  // two halves of the chain is now `targetKind` on the entries that need it, so an op's
  // target is declared beside its payload instead of by its position in a list.
  const t = v3EditModalTarget;
  const modal = byId("edit-modal-body");
  if (!t || !modal) return null;
  const descriptor = v3OpDescriptor(op);
  if (!descriptor) return null;
  if (descriptor.targetKind && t.kind !== descriptor.targetKind) return null;
  const q = (sel) => modal.querySelector(sel);
  const val = (sel) => { const el = q(sel); return el ? el.value : undefined; };
  // The SELECTOR, not a key: each op names its own picker, so the two dependency pickers
  // can never be read through one another's chips and the selector stays greppable.
  const pickerValues = (selector) => {
    const picker = modal.querySelector(selector);
    return picker ? v3EditPickerValues(picker) : [];
  };
  // The entry produces ARGS; the op name is stamped here, from the key it is registered under.
  // An entry therefore names its op EXACTLY ONCE — as its key — and cannot be filed under one
  // name while sending another.
  const args = descriptor.payload({ t, q, val, pickerValues });
  return args ? { op, args } : null;
}

async function v3EditPost(body) {
  // Mirrors manualSyncHistory: honest about an unreachable local server, never fakes success.
  try {
    const response = await fetch(PATHS.roadmapEdit, {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body)
    });
    const json = await response.json().catch(() => null);
    return { ok: response.ok, status: response.status, json };
  } catch (error) {
    return { networkError: true, message: error && error.message ? error.message : "network error" };
  }
}

function v3EditPanel() {
  return byId("v3-edit-preview");
}

function v3EditSetPanel(html) {
  const panel = v3EditPanel();
  if (!panel) return;
  panel.hidden = false;
  panel.innerHTML = html;
  panel.scrollIntoView({ block: "nearest" });
}

async function v3EditPreview(op) {
  // Insert has no default position (see v3InsertCurrentPosition). Say what is missing: the bare
  // `return` below is silent, and a silent button reads as broken rather than as a refusal.
  if (op === "insert" && v3InsertCurrentPosition(v3EditModel()) == null) {
    v3EditSetPanel(`<div class="v3-edit-preview-status">${escapeHtml(V3_INSERT_NEEDS_POSITION_MESSAGE)}</div>`);
    return;
  }
  const payload = v3EditBuildPayload(op);
  if (!payload) return;
  const beforeNode = v3EditBeforeNode();
  v3EditSetPanel('<div class="v3-edit-preview-status">Previewing (dry run)...</div>');
  const result = await v3EditPost({ op: payload.op, apply: false, args: payload.args });
  if (result.networkError) { v3EditRenderUnreachable(); return; }
  if (result.json && result.json.ok) {
    v3EditPending = { op: payload.op, args: payload.args, baseline: result.json.baseline };
    v3EditRenderPreview(payload.op, payload.args, beforeNode, result.json);
  } else {
    v3EditRenderRefusal(result, payload.op);
  }
}

function v3EditRemapHtml(remap, highlightId) {
  if (!Array.isArray(remap) || remap.length === 0) {
    return '<div class="v3-edit-remap-none">(no queue_order changes)</div>';
  }
  const rows = remap.map((r) => {
    const before = r.before == null ? "(new)" : "#" + r.before;
    const after = r.after == null ? "(removed)" : "#" + r.after;
    const hl = highlightId && r.run_id === highlightId ? " is-moved" : "";
    return `<tr class="v3-edit-remap-row${hl}"><td class="mono">${escapeHtml(r.run_id)}</td><td>${before}</td><td>-&gt;</td><td>${after}</td></tr>`;
  }).join("");
  // Scrollable body so a full-tail cascade (up to ~45 rows) is never silently truncated.
  return `<div class="v3-edit-remap"><div class="v3-edit-remap-head">${remap.length} run(s) re-sequenced${highlightId ? " (moved run highlighted)" : ""}</div><div class="v3-edit-remap-scroll"><table class="v3-edit-remap-table"><tbody>${rows}</tbody></table></div></div>`;
}

function v3EditDiffRow(label, before, after) {
  const changed = String(before) !== String(after);
  return `<div class="v3-edit-diff-row${changed ? " is-changed" : ""}"><div class="v3-edit-diff-label">${escapeHtml(label)}${changed ? "" : " (unchanged)"}</div><div class="v3-edit-diff-before">${escapeHtml(before)}</div><div class="v3-edit-diff-arrow">-&gt;</div><div class="v3-edit-diff-after">${escapeHtml(after)}</div></div>`;
}

function v3EditDiffBlock(label, before, after) {
  // Run C round 3 (P3): long-text (set-text) fields render stacked full-width, before over
  // after, so multi-sentence prose is readable instead of two cramped columns. A very long
  // value scrolls inside a bounded box rather than dominating the panel.
  return `
    <div class="v3-edit-diff-block">
      <div class="v3-edit-diff-block-head"><span class="v3-edit-diff-block-label">${escapeHtml(label)}</span><span class="v3-edit-diff-block-tag">changed</span></div>
      <div class="v3-edit-diff-side"><div class="v3-edit-diff-side-tag">Before</div><div class="v3-edit-diff-side-val">${escapeHtml(before)}</div></div>
      <div class="v3-edit-diff-side"><div class="v3-edit-diff-side-tag">After</div><div class="v3-edit-diff-side-val">${escapeHtml(after)}</div></div>
    </div>
  `;
}

function v3EditDiffHtml(op, args, beforeNode) {
  // [#47] Two shapes, both declared on the op's registry entry: `diffHtml` for the ops that
  // render a block of their own (batch, set-text and the two objective ops), `diffRows` for
  // everything that renders as before/after rows in the standard block. `requiresBefore`
  // carries, per op, the guard that used to be one hand-written list of seven op names.
  const descriptor = v3OpDescriptor(op);
  if (!descriptor) return "";
  if (descriptor.requiresBefore && !beforeNode) return "";
  if (descriptor.diffHtml) return descriptor.diffHtml(args, beforeNode);
  const rows = [];
  if (descriptor.diffRows) descriptor.diffRows(args, beforeNode, rows);
  return rows.length ? `<div class="v3-edit-diff">${rows.join("")}</div>` : "";
}

function v3EditRenderPreview(op, args, beforeNode, json) {
  const highlight = args.run || args.runId || null;
  const warnings = Array.isArray(json.warnings) && json.warnings.length
    ? `<div class="v3-edit-warnings">${json.warnings.map((w) => `<div class="v3-edit-warning">warning: ${escapeHtml(w)}</div>`).join("")}</div>`
    : "";
  v3EditSetPanel(`
    <div class="v3-edit-preview-title">Preview: ${escapeHtml(op)}</div>
    ${v3EditDiffHtml(op, args, beforeNode)}
    ${v3EditRemapHtml(json.remap, highlight)}
    ${warnings}
    <div class="v3-edit-confirm-row">
      <button class="btn btn-primary btn-sm" type="button" data-v3edit-confirm>Confirm and write</button>
      <button class="btn btn-secondary btn-sm" type="button" data-v3edit-cancel>Cancel</button>
    </div>
    <div class="v3-edit-note">Confirm writes the canonical roadmap through the endpoint; the validator runs and the write rolls back if it fails.</div>
  `);
}

async function v3EditConfirm() {
  if (!v3EditPending) return;
  const pending = v3EditPending;
  v3EditSetPanel('<div class="v3-edit-preview-status">Writing (apply)...</div>');
  const result = await v3EditPost({ op: pending.op, apply: true, baseline: pending.baseline, args: pending.args });
  if (result.networkError) { v3EditRenderUnreachable(); return; }
  const json = result.json;
  if (json && json.ok && json.applied) {
    v3EditPending = null;
    v3EditModalDirty = false;
    const reRead = await v3EditReloadRoadmap();
    v3EditSetPanel(`<div class="v3-edit-preview-status is-ok"><strong>Applied.</strong> ${reRead ? "The roadmap was written and re-read from disk; the validator passed. You can close this dialog." : "The write succeeded, but the roadmap could not be re-read; reload the page to refresh."}</div>`);
    return;
  }
  if (result.status === 409 && json && json.reason === "stale_baseline") { v3EditRenderStale(); return; }
  if (result.status === 409 && json && json.rolledBack) { v3EditRenderRollback(json); return; }
  v3EditRenderRefusal(result, pending.op);
}

function v3EditEnrichMoveErrors(errors) {
  // Turn the core's terse dependency-inversion message into an actionable one that names the
  // offending dependency, its resulting position, and the two ways out. Never replaces or
  // softens the raw error (that is always shown verbatim alongside).
  const out = [];
  const re = /run (\S+) \(queue_order (\d+)\) must depend only on earlier runs; (\S+) has queue_order (\d+)/;
  errors.forEach((e) => {
    const m = re.exec(String(e));
    if (!m) return;
    const runId = m[1], runPos = m[2], depId = m[3], depPos = m[4];
    out.push("Cannot move " + runId + " to position #" + runPos + ": it depends on " + depId + ", which would end up after it (at position #" + depPos + "). Fix it by editing that dependency (remove or repoint it), or by moving " + runId + " to a position after " + depId + " instead.");
  });
  return out;
}

function v3EditRemoveChoiceUi() {
  const model = v3EditModel();
  const t = v3EditModalTarget;
  const eligible = model && t ? model.allRuns.filter((r) => r.run_id !== t.id) : [];
  return `
    <div class="v3-edit-remove-choice">
      <div class="v3-edit-block-title">Handle the dependents before removing</div>
      <div class="v3-edit-note">Reassign the dependents to another run, or drop those dependency links. The dry-run runs again with your choice; nothing is written until you confirm.</div>
      ${v3RenderDepPicker("reassign", "single", eligible, [], model)}
      <div class="v3-edit-confirm-row">
        <button class="btn btn-secondary btn-sm" type="button" data-v3edit-dep-choice="reassign">Reassign dependents to the picked run</button>
        <button class="btn btn-secondary btn-sm" type="button" data-v3edit-dep-choice="drop">Drop the dependency links instead</button>
      </div>
    </div>
  `;
}

function v3EditRenderRefusal(result, op) {
  const json = result.json;
  const errors = json && Array.isArray(json.errors) && json.errors.length
    ? json.errors
    : ["HTTP " + (result.status || "?") + (json && json.reason ? " " + json.reason : "")];
  const warnings = json && Array.isArray(json.warnings) && json.warnings.length
    ? `<div class="v3-edit-warnings">${json.warnings.map((w) => `<div class="v3-edit-warning">warning: ${escapeHtml(w)}</div>`).join("")}</div>`
    : "";
  let enriched = "";
  if (op === "move") {
    const lines = v3EditEnrichMoveErrors(errors);
    if (lines.length) enriched = `<div class="v3-edit-enriched">${lines.map((l) => `<div class="v3-edit-enriched-line">${escapeHtml(l)}</div>`).join("")}</div>`;
  }
  let removeChoice = "";
  if (op === "remove" && errors.some((e) => /depend on /.test(String(e)))) {
    removeChoice = v3EditRemoveChoiceUi();
  }
  // The raw core error is ALWAYS shown verbatim: inline when there is no enrichment, or in a
  // collapsible block when an enriched message leads, so the refusal is never hidden.
  const rawErrorsHtml = `<ul class="v3-edit-errors">${errors.map((e) => `<li>${escapeHtml(e)}</li>`).join("")}</ul>`;
  const rawBlock = enriched
    ? `<details class="v3-edit-validator"><summary>Core error (verbatim)</summary>${rawErrorsHtml}</details>`
    : rawErrorsHtml;
  v3EditSetPanel(`
    <div class="v3-edit-preview-title is-refused">Refusing; nothing written.</div>
    ${enriched}
    ${rawBlock}
    ${removeChoice}
    ${warnings}
    <div class="v3-edit-confirm-row"><button class="btn btn-secondary btn-sm" type="button" data-v3edit-cancel>Close</button></div>
  `);
}

function v3EditRenderStale() {
  v3EditSetPanel(`
    <div class="v3-edit-preview-title is-refused">The roadmap changed since this preview.</div>
    <div class="v3-edit-note">Nothing was written. Re-read the current values and preview again before writing.</div>
    <div class="v3-edit-confirm-row"><button class="btn btn-primary btn-sm" type="button" data-v3edit-retry>Re-read and start over</button><button class="btn btn-secondary btn-sm" type="button" data-v3edit-cancel>Cancel</button></div>
  `);
}

function v3EditRenderRollback(json) {
  const out = json && json.validatorOutput ? String(json.validatorOutput) : "(no validator output returned)";
  const backup = json && json.backupPath ? String(json.backupPath) : "";
  v3EditSetPanel(`
    <div class="v3-edit-preview-title is-refused">The validator rejected the edit. The file was restored from backup; nothing changed on disk.</div>
    ${backup ? `<div class="v3-edit-note">Backup: <span class="mono">${escapeHtml(backup)}</span></div>` : ""}
    <details class="v3-edit-validator"><summary>Validator output</summary><pre class="v3-edit-validator-output">${escapeHtml(out)}</pre></details>
    <div class="v3-edit-confirm-row"><button class="btn btn-secondary btn-sm" type="button" data-v3edit-cancel>Close</button></div>
  `);
}

function v3EditRenderUnreachable() {
  v3EndpointReachable = false;
  v3EditSetPanel(`
    <div class="v3-edit-preview-title is-refused">The roadmap write endpoint is not reachable.</div>
    <div class="v3-edit-note">The local console server did not answer. Nothing was written.</div>
    <div class="v3-edit-confirm-row"><button class="btn btn-secondary btn-sm" type="button" data-v3edit-cancel>Close</button></div>
  `);
}

function v3EditCancelPreview() {
  const panel = v3EditPanel();
  if (panel) { panel.hidden = true; panel.innerHTML = ""; }
  v3EditPending = null;
  v3EditRemoveChoice = null;
}

async function v3EditRetryAfterStale() {
  v3EditPending = null;
  v3EditRemoveChoice = null;
  const target = v3EditModalTarget;
  await v3EditReloadRoadmap();
  if (target) v3OpenEditModal(target);
}

async function v3EditFetchRoadmap() {
  try {
    const response = await fetch(PATHS.roadmapV3, { cache: "no-store", headers: { Accept: "application/json" } });
    if (!response.ok) return null;
    return await response.json().catch(() => null);
  } catch (error) {
    return null;
  }
}

async function v3EditReloadRoadmap() {
  // After any write, never trust the in-memory model: re-read roadmap.json (no-store) and
  // re-render the Roadmap surfaces (with edit affordances), mirroring manualSyncHistory.
  const t = v3EditModalTarget;
  const fresh = await v3EditFetchRoadmap();
  if (fresh && appData) {
    appData.roadmapV3 = fresh;
    roadmapV3ModelCache = v3Model(appData);
    renderRoadmapV3(appData);
    renderRunQueueV3(appData);
    v3DecorateTreeEditAffordances();
  }
  // Refresh the read-only drawer behind the modal only when its run still exists (a remove
  // deletes it; an insert/move/swap keeps the target's identity).
  if (t && t.kind === "run" && roadmapV3ModelCache && roadmapV3ModelCache.runsById.get(t.id)) {
    v3OpenRunDetail(t.id, "back");
  }
  return !!fresh;
}

function setupTabs() {
  const roadmapMapButton = document.querySelector('[data-subview="map"]');
  if (roadmapMapButton) roadmapMapButton.textContent = "Legacy Roadmap";
  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      const tab = button.dataset.tab;
      document.querySelectorAll("[data-tab]").forEach((item) => item.classList.toggle("active", item.dataset.tab === tab));
      document.querySelectorAll(".tab-content").forEach((panel) => panel.classList.toggle("active", panel.id === `tab-${tab}`));
      // History auto-sync: refresh on open and poll only while History is the active tab.
      if (tab === "history") {
        refreshGitHistory();
        startHistoryAutoRefresh();
      } else {
        stopHistoryAutoRefresh();
      }
    });
  });
  document.querySelectorAll("[data-subview]").forEach((button) => {
    button.addEventListener("click", () => {
      const subview = button.dataset.subview;
      document.querySelectorAll("[data-subview]").forEach((item) => item.classList.toggle("active", item === button));
      document.querySelectorAll(".roadmap-subview").forEach((panel) => panel.classList.toggle("active", panel.id === `roadmap-sub-${subview}`));
    });
  });
  byId("drawer-close").addEventListener("click", closeDrawer);
  byId("drawer-overlay").addEventListener("click", closeDrawer);
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    // [#62] The side reader sits above the report, so Escape closes the READER first — and only
    // the reader. Closing the report from under an open document would be exactly the thing this
    // panel exists not to do: the operator opened a rule while judging, and the judgement stays.
    if (typeof docSideReaderIsOpen === "function" && docSideReaderIsOpen()) {
      closeDocSideReader();
      return;
    }
    // [#53] The report layer sits above the drawer, so Escape closes the report FIRST and lands
    // the operator back on the run they came from. Closing the run underneath it instead would
    // throw away the judgement in progress on screen and leave nothing to come back to.
    if (typeof runReportIsOpen === "function" && runReportIsOpen()) {
      closeRunReport();
      return;
    }
    closeDrawer();
  });
}

async function loadData() {
  const snapshot = await fetchJson(PATHS.snapshot, true);
  // Read the project's declaration BEFORE fetching anything optional, so every failure below is
  // classified against it (O4.P13). The required snapshot is the only artifact that can carry
  // this: it is the one file §8 guarantees, so it is the one place a project can speak about
  // the others from.
  declaredArtifactPaths = readDeclaredArtifactPaths(snapshot);
  const [
    project,
    projectStatus,
    componentStatus,
    roadmapV3,
    events,
    changeLedger,
    gitProvenance,
    humanQa,
    aiReviews,
    docsIndex,
    guardrails,
    noClaims,
    memory,
    gitHistory,
    reportsIndex
  ] = await Promise.all([
    fetchJson(PATHS.project),
    fetchJson(PATHS.projectStatus),
    fetchJson(PATHS.componentStatus),
    fetchJson(PATHS.roadmapV3),
    fetchJsonl(PATHS.events),
    fetchJsonl(PATHS.changeLedger),
    fetchJsonl(PATHS.gitProvenance),
    fetchJsonl(PATHS.humanQa),
    fetchJsonl(PATHS.aiReviews),
    fetchJson(PATHS.docsIndex),
    fetchJson(PATHS.guardrails),
    fetchJson(PATHS.noClaims),
    fetchJsonl(PATHS.memory),
    fetchJson(PATHS.gitHistory),
    fetchJson(PATHS.reportsIndex)
  ]);

  return {
    snapshot,
    project,
    projectStatus,
    componentStatus,
    roadmapV3,
    events,
    changeLedger,
    gitProvenance,
    humanQa,
    aiReviews,
    docsIndex,
    guardrails,
    noClaims,
    memory,
    gitHistory,
    reportsIndex
  };
}

// Chrome wiring only. Under the multi-project shell (O4.P3) no project loads at boot from
// here: the shell reads the registry, decides the active project, and drives this renderer
// through setActiveProjectBase / resetProjectScopedState / loadActiveProject.
function initConsoleChrome() {
  setupTabs();
  setupStatusSubnav();
  setupRoadmapEditMode();
  setupProjectEmit();
  setOverviewCardTitles();
}

if (typeof document !== "undefined" && document.getElementById("tab-overview")) {
  initConsoleChrome();
}
