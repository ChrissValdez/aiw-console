const PATHS = {
  snapshot: "../../.aiw/views/project_console.snapshot.json",
  project: "../../.aiw/project.json",
  projectStatus: "../../.aiw/state/project_status.json",
  componentStatus: "../../.aiw/state/component_status.json",
  objectives: "../../.aiw/roadmap/objectives.jsonl",
  phases: "../../.aiw/roadmap/phases.jsonl",
  runs: "../../.aiw/roadmap/runs.jsonl",
  queue: "../../.aiw/roadmap/queue.json",
  roadmapV2: "../../.aiw/roadmap/roadmap_v2.json",
  roadmapV3: "../../.aiw/roadmap/roadmap.json",
  events: "../../.aiw/state/events.jsonl",
  changeLedger: "../../.aiw/ledgers/change_ledger.jsonl",
  gitProvenance: "../../.aiw/ledgers/git_provenance.jsonl",
  humanQa: "../../.aiw/ledgers/human_qa.jsonl",
  aiReviews: "../../.aiw/ledgers/ai_reviews.jsonl",
  docsIndex: "../../.aiw/docs/docs_index.json",
  guardrails: "../../.aiw/guardrails/project_guardrails.json",
  noClaims: "../../.aiw/guardrails/no_claims.json",
  memory: "../../.aiw/guardrails/project_memory.jsonl",
  // Derived read-only Git commit history view (built from the operator's manual
  // read-only git export); not canonical roadmap data, not ledger data.
  gitHistory: "../../.aiw/views/git_history.snapshot.json",
  // Internal, local-only endpoint exposed by serve-project-console.mjs to force a
  // read-only Git history snapshot rebuild on demand (manual Sync History button).
  historySync: "/__project-console/history/sync"
};

const loadedSources = [];
const failedSources = [];
let appData = null;

const PROJECT_CONSOLE_PARENT_RUN_ID = "RUN-JAME-PROJECT-CONSOLE-FULL-ROADMAP-QUEUE-REPAIR-003R1";
const PROJECT_CONSOLE_STAGE_IDS = new Set([
  "RUN-JAME-PROJECT-CONSOLE-FULL-ROADMAP-QUEUE-REPAIR-CODEX-REVIEW-001",
  "RUN-JAME-PROJECT-CONSOLE-FULL-ROADMAP-QUEUE-HUMAN-QA-001",
  "RUN-JAME-PROJECT-CONSOLE-DASHBOARD-VISUAL-POLISH-IF-NEEDED-001",
  "RUN-JAME-PROJECT-CONSOLE-CLOSEOUT-STATE-STABILIZATION-001"
]);

// Roadmap v3 prototype constants (RUN-JAME-PROJECT-CONSOLE-ROADMAP-V3-PROTOTYPE-001).
// Frozen from the approved Roadmap v3 prototype contract; display policy lives in
// code, never inside .aiw/roadmap/roadmap.json.
const ROADMAP_V3_QUEUE_GROUPS = [
  { key: "needs_human_decision", label: "Needs Human Decision" },
  { key: "now", label: "Now" },
  { key: "ready_next", label: "Ready Next" },
  { key: "later", label: "Later" },
  { key: "history", label: "History" }
];
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
  closeout: "Commit / Closeout"
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
// Recommended default expansion for the five Run Queue groups. This is local UI state
// only and is never persisted into Roadmap or project data. Needs Human Decision expands
// only when it is non-empty; Now and Ready Next expand; Later and History collapse.
const ROADMAP_V3_QUEUE_GROUP_DEFAULT_OPEN = {
  needs_human_decision: "when_non_empty",
  now: true,
  ready_next: true,
  later: false,
  history: false
};
let roadmapV3ModelCache = null;
// Local Run Detail navigation stack (UI-only): the root run plus any dependencies pushed
// on top. Cleared when the drawer closes. Never persisted to Roadmap or project data.
let v3DetailStack = [];
// Origin subview label ("Run Queue" / "Roadmap") recorded when a root detail opens; the
// stack-root Back control returns there by closing the drawer. UI-only, never persisted.
let v3DetailOrigin = "";

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

const RUN_OPERATOR_OVERRIDES = {
  "RUN-JAME-PROJECT-CONSOLE-FULL-ROADMAP-QUEUE-REPAIR-003R1": {
    display_title: "Simplify Project Console",
    operator_summary: "Turn the console into a clear action plan: standard states, complete queue, readable roadmap, and useful details.",
    operator_next_action: "Review the updated console, approve it, or request more UX changes.",
    operator_closure_criteria: "Closes when Human QA approves the console and it is ready for manual commit/closeout.",
    operator_why_it_matters: "This keeps review, QA, repair, and closeout from being confused with separate primary work items while preserving an AIW-compatible state model.",
    operator_status_label: "Now / Human QA"
  },
  "RUN-JAME-PROJECT-CONSOLE-FULL-ROADMAP-QUEUE-REPAIR-CODEX-REVIEW-001": {
    display_title: "AI review",
    operator_summary: "Review that the console repair preserves the standard model and restrictions.",
    operator_next_action: "Record the review as technical evidence, not as a primary work item.",
    operator_closure_criteria: "The review is recorded without opening certification gates or touching runtime."
  },
  "RUN-JAME-PROJECT-CONSOLE-FULL-ROADMAP-QUEUE-HUMAN-QA-001": {
    display_title: "Human QA",
    operator_summary: "Visually validate whether the console works as an operator action plan.",
    operator_next_action: "Address the vocabulary, taxonomy, and English-language corrections requested by Human QA.",
    operator_closure_criteria: "Human QA approves the console or leaves concrete correction requests."
  },
  "RUN-JAME-PROJECT-CONSOLE-DASHBOARD-VISUAL-POLISH-IF-NEEDED-001": {
    display_title: "Correction",
    operator_summary: "Normalize visible language and status presentation while preserving AIW-compatible taxonomy.",
    operator_next_action: "Return the primary UI to English and keep provider/raw fields in technical details.",
    operator_closure_criteria: "Queue and Roadmap show real work items with standard internal stages."
  },
  "RUN-JAME-PROJECT-CONSOLE-CLOSEOUT-STATE-STABILIZATION-001": {
    display_title: "Commit / closeout",
    operator_summary: "Prepare state for manual commit after Human QA.",
    operator_next_action: "Wait for Human QA approval before manual closeout.",
    operator_closure_criteria: "State is stable and ready for manual commit in GitHub Desktop."
  },
  "RUN-JAME-WEB-SIMPLE-HUMAN-QA-REPAIR-BATCH-STATUS-RECONCILE-001": {
    display_title: "Reconcile Web simple status",
    operator_summary: "Align what already passed QA with what still needs repair before touching runtime.",
    operator_next_action: "Review current sources and separate PASS, repair-required, and deferred items.",
    operator_closure_criteria: "The next Web simple repair has clear scope and does not certify Web."
  },
  "RUN-JAME-WEB-SIMPLE-HUMAN-QA-REPAIR-BATCH-CONTINUATION-001": {
    display_title: "Continue Web simple repairs",
    operator_summary: "Resume the Author Lite repair batch after Project Console closes.",
    operator_next_action: "Execute only the approved ticket for simple components.",
    operator_closure_criteria: "Repair is validated locally and sent to Human QA."
  },
  "RUN-JAME-WEB-HEADER-LIST-COLOR-PALETTE-SYNC-FOLLOWUP-001": {
    display_title: "Resolve header/list color sync",
    operator_summary: "Clarify the palette follow-up observed after the header repair.",
    operator_next_action: "Prepare a color/palette ticket if the operator approves it.",
    operator_closure_criteria: "The follow-up is scoped or deferred without certifying the Color System."
  },
  "RUN-JAME-WEB-NARRATIVE-OWN-TICKET-REPAIR-001": {
    display_title: "Repair Narrative in its own ticket",
    operator_summary: "Narrative failed QA and needs a bounded repair, not mixed with other components."
  },
  "RUN-JAME-WEB-CALLOUT-OWN-TICKET-REPAIR-001": {
    display_title: "Repair Callout in its own ticket",
    operator_summary: "Callout failed QA and needs its own scope before any approval."
  },
  "RUN-JAME-WEB-DETAILS-OWN-TICKET-REPAIR-001": {
    display_title: "Repair Details in its own ticket",
    operator_summary: "Details needs a separate repair and must not start without an approved ticket."
  },
  "RUN-JAME-WEB-RULE-OWN-TICKET-MATH-BLOCKER-001": {
    display_title: "Keep Rule blocked by Math",
    operator_summary: "Rule stays out of the simple batch because Smart Formula Field remains RULE_ONLY.",
    operator_blocker_label: "Blocked by Math/RULE_ONLY"
  }
};

function runKind(run = {}, queueItem = {}) {
  if (run.run_kind) return run.run_kind;
  if (queueItem.run_kind) return queueItem.run_kind;
  if (queueItem.display_kind) return queueItem.display_kind;
  if (PROJECT_CONSOLE_STAGE_IDS.has(run.run_id || queueItem.run_id)) return "lifecycle_stage";
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
  const stages = [];
  if (runId === PROJECT_CONSOLE_PARENT_RUN_ID) {
    stages.push({
      run_id: `${PROJECT_CONSOLE_PARENT_RUN_ID}::implementation`,
      lifecycle_stage: "implementation",
      operator_stage_order: 1,
      operator_stage_status: "completed",
      operator_display_title: "Implementation",
      operator_display_summary: "The model and UI correction is applied in local state."
    });
  }
  return [...stages, ...childStages].sort((a, b) => {
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
    author_lite: "Author Lite",
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
    .replace(/\bRUN-JAME-[A-Z0-9-]+/g, "project run");
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

async function fetchText(path, required = false) {
  try {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    const content = await response.text();
    loadedSources.push(path);
    return content;
  } catch (error) {
    failedSources.push(`${path}: ${error.message}`);
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
    failedSources.push(`${path}: invalid JSON: ${error.message}`);
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
      failedSources.push(`${path}:${index + 1}: invalid JSONL: ${error.message}`);
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
  return `../../${path}`;
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

/* Roadmap v2 Draft subview (RUN-JAME-PROJECT-CONSOLE-ROADMAP-V2-IN-CONSOLE-DRAFT-VIEW-001).
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
   inline; every other objective starts collapsed. No hardcoded objective IDs
   (RUN-JAME-PROJECT-CONSOLE-ROADMAP-V2-RENDER-REPAIR-001). */
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
          ${row("Created by", "RUN-JAME-PROJECT-CONSOLE-ROADMAP-V2-IN-CONSOLE-DRAFT-VIEW-001", "mono")}
          ${row("Last render repair", "RUN-JAME-PROJECT-CONSOLE-ROADMAP-V2-RENDER-REPAIR-001", "mono")}
          ${row("Reads", ".aiw/roadmap/roadmap_v2.json (optional, fail-soft)", "mono")}
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

// Docs view body rendering (RUN-JAME-PROJECT-CONSOLE-DOCS-V3-001, O2.P3): the Docs view is a
// read-only projection that renders the real repository-local document body for the selected
// docs_index entry, not a metadata-only card. docs_index stays navigation/freshness metadata;
// bodies are fetched from the registered repo-relative path only, escaped first, and rendered
// with a conservative Markdown-lite / preformatted renderer. Rendering a document here is a
// reference only: it is not certification, acceptance, Human QA, closeout, or reconciliation,
// and it does not change any document's status.
//
// Docs tree navigation and inline metadata (RUN-JAME-PROJECT-CONSOLE-DOCS-V3-001-UX-TREE-NAV-REPAIR-001):
// the left navigation groups docs_index entries into collapsible categories derived from the
// metadata each entry already carries (ia_bucket -> category -> related_area -> source_role ->
// uncategorized), so the view stays navigable as the documentation corpus grows and no
// docs_index migration is required. Document metadata renders inside the reader as compact
// chips plus a collapsible section; the fixed right metadata rail is retired. Grouping is
// display-only navigation: it assigns no new document status and certifies nothing.
const docBodyCache = new Map();
let docsActivePath = null;

// Curated Docs visibility (RUN-JAME-PROJECT-CONSOLE-DOCS-CURATED-DEFAULT-VIEW-001): the default
// Docs view is a curated Primary KB, not every registered doc. docs_index stays the broad
// documentation/evidence registry; nav_tier / default_visible are additive navigation metadata
// and this filtering is display-only. Switching visibility mode assigns no document status and
// certifies, accepts, reconciles, or Human-QA-passes nothing. All registered docs stay reachable.
let docsVisibilityMode = "primary"; // "primary" (curated default) | "all" (full registry)
let docsAllEntries = [];
const DOCS_NAV_TIERS = ["primary", "secondary", "advanced", "evidence", "history", "proposal"];
const DOCS_NAV_TIER_META = {
  primary: { label: "Primary", tone: "green" },
  secondary: { label: "Secondary", tone: "blue" },
  advanced: { label: "Advanced", tone: "amber" },
  evidence: { label: "Evidence", tone: "gray" },
  history: { label: "History", tone: "gray" },
  proposal: { label: "Proposal", tone: "amber" }
};

// Display order for the Docs navigation groups. Keys follow the canonical documentation model
// IA buckets (.aiw/docs/canonical_documentation_model.json). Groups not listed here still
// render (alphabetically, before Uncategorized), so future docs_index growth does not require
// editing this list first.
const DOCS_GROUP_ORDER = [
  "project_console",
  "roadmap",
  "docs",
  "governance",
  "ops",
  "author_lite",
  "jame_core",
  "component_docs",
  "run_evidence",
  "sources_provenance",
  "human",
  "history",
  "prompts",
  "technical_reference"
];
const DOCS_GROUP_LABELS = {
  project_console: "Project Console",
  roadmap: "Roadmap",
  docs: "Documentation",
  governance: "Governance",
  ops: "Operations",
  author_lite: "Author Lite",
  jame_core: "JAME Core",
  component_docs: "Component Docs",
  run_evidence: "Run Evidence",
  sources_provenance: "Sources / Provenance",
  human: "Human Decision Surface",
  history: "History / Evidence",
  prompts: "Prompts",
  technical_reference: "Technical References",
  uncategorized: "Uncategorized"
};
// Normalizes legacy per-entry values (mostly older related_area strings) onto the canonical
// group keys so closely related entries share one tree group instead of forming single-doc
// groups. Display-only navigation aliasing; it never rewrites docs_index metadata.
const DOCS_GROUP_ALIASES = {
  ops_state: "ops",
  review: "governance",
  qa: "governance",
  certification: "governance",
  guardrails: "governance",
  evidence: "run_evidence",
  architecture_decisions: "author_lite",
  component_status: "component_docs"
};

function deriveDocGroup(doc) {
  // Fallback order: ia_bucket -> category -> related_area -> source_role -> uncategorized.
  // Entries without the newer ia_bucket field still land in a stable group derived from the
  // metadata they already carry, so incomplete grouping data degrades safely.
  const candidates = [doc?.ia_bucket, doc?.category, doc?.related_area, doc?.source_role];
  for (const candidate of candidates) {
    const value = text(candidate, "").trim().toLowerCase();
    if (value) return DOCS_GROUP_ALIASES[value] || value;
  }
  return "uncategorized";
}

function docGroupLabel(groupKey) {
  return DOCS_GROUP_LABELS[groupKey] || friendlyLabel(groupKey);
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

function docNavTierMeta(tier) {
  return DOCS_NAV_TIER_META[tier] || { label: friendlyLabel(tier), tone: "gray" };
}

function docsEntriesForMode() {
  // Entries carry their index in the full docs_index array so navigation stays a filtered view
  // of the same registry (never a re-indexed copy). "all" shows every registered doc; "primary"
  // shows only the curated default-visible set.
  const entries = docsAllEntries.map((doc, index) => ({ doc, index }));
  if (docsVisibilityMode === "all") return entries;
  return entries.filter(({ doc }) => isDefaultVisibleDoc(doc));
}

function buildDocsNavTree(entries) {
  // Groups docs_index entries into the ordered category tree used by the Docs navigation.
  // Accepts { doc, index } pairs (index into the full registry) so the tree can be built from a
  // filtered subset while each item still resolves to its real docs_index entry. Entry order
  // inside a group preserves docs_index order; group order follows DOCS_GROUP_ORDER, then unknown
  // groups alphabetically, with Uncategorized always last. Empty groups never render.
  const groupsByKey = new Map();
  entries.forEach(({ doc, index }) => {
    const key = deriveDocGroup(doc);
    if (!groupsByKey.has(key)) {
      groupsByKey.set(key, { key, label: docGroupLabel(key), docs: [] });
    }
    groupsByKey.get(key).docs.push({ doc, index });
  });
  const known = DOCS_GROUP_ORDER.filter((key) => groupsByKey.has(key)).map((key) => groupsByKey.get(key));
  const unknown = [...groupsByKey.keys()]
    .filter((key) => !DOCS_GROUP_ORDER.includes(key) && key !== "uncategorized")
    .sort((left, right) => left.localeCompare(right))
    .map((key) => groupsByKey.get(key));
  const tail = groupsByKey.has("uncategorized") ? [groupsByKey.get("uncategorized")] : [];
  return [...known, ...unknown, ...tail];
}

function renderDocs(data) {
  const docs = data.docsIndex?.docs || [];
  docsAllEntries = docs;
  const nav = byId("docs-nav-list");
  if (!nav) return;
  if (!docs.length) {
    nav.innerHTML = emptyState("No docs index could be loaded.");
    byId("docs-reader").innerHTML = "";
    return;
  }
  // Curated default: open on the first default-visible (Primary KB) doc, not the first registered
  // entry. renderDocsNav paints the tier controls and the filtered category/tree navigation.
  const visible = docsEntriesForMode();
  const first = (visible[0] || { doc: docs[0] }).doc;
  // Select first so docsActivePath is set, then paint the nav so the opened doc highlights.
  renderSelectedDoc(first);
  renderDocsNav();
}

function renderDocsNav() {
  // Paints the visibility controls and the grouped category/tree navigation for the current mode.
  // Called on load and on every visibility-mode switch; it never touches the reader/body, so the
  // active document and its rendered body survive a mode switch. Group open/collapsed and the
  // selected visibility mode are local UI state only and are never persisted anywhere.
  const nav = byId("docs-nav-list");
  if (!nav) return;
  const entries = docsEntriesForMode();
  const primaryCount = docsAllEntries.filter(isDefaultVisibleDoc).length;
  const totalCount = docsAllEntries.length;
  const activeDoc = docsAllEntries.find((doc) => text(doc.path, "") === docsActivePath) || null;
  const activeVisible = entries.some(({ doc }) => text(doc.path, "") === docsActivePath);
  const summary = docsVisibilityMode === "all"
    ? `Showing all <strong>${escapeHtml(totalCount)}</strong> registered documents (<strong>${escapeHtml(primaryCount)}</strong> primary).`
    : `Showing <strong>${escapeHtml(primaryCount)}</strong> curated of <strong>${escapeHtml(totalCount)}</strong> registered documents.`;
  const modeNote = (activeDoc && !activeVisible)
    ? `<div class="docs-nav-mode-note docs-nav-mode-note-active">Currently viewing the ${escapeHtml(docNavTierMeta(deriveDocNavTier(activeDoc)).label)} document &ldquo;${escapeHtml(activeDoc.title || activeDoc.path)}&rdquo;, which is outside the Primary KB view.</div>`
    : (docsVisibilityMode === "primary"
      ? `<div class="docs-nav-mode-note">Advanced, evidence, history and proposal documents stay available under All registered.</div>`
      : "");
  const tree = buildDocsNavTree(entries);
  const treeHtml = tree.length
    ? tree.map((group) => `
      <details class="docs-nav-group" open>
        <summary class="docs-nav-group-header">
          <span class="docs-nav-group-label">${escapeHtml(group.label)}</span>
        </summary>
        <div class="docs-nav-group-items">
          ${group.docs.map(({ doc, index }) => {
            const tier = deriveDocNavTier(doc);
            const tierMeta = docNavTierMeta(tier);
            const showTag = docsVisibilityMode === "all" && tier !== "primary";
            return `<button class="docs-nav-item ${text(doc.path, "") === docsActivePath ? "active" : ""}" type="button" data-doc-index="${index}"><span class="docs-nav-item-label">${escapeHtml(doc.title || doc.path)}</span>${showTag ? `<span class="docs-tier-tag docs-tier-${escapeHtml(tier)}" title="${escapeHtml(tierMeta.label)} document (available, not primary)">${escapeHtml(tierMeta.label)}</span>` : ""}</button>`;
          }).join("")}
        </div>
      </details>
    `).join("")
    : emptyState("No documents match this view.");
  nav.innerHTML = `
    <div class="docs-nav-controls">
      <div class="docs-mode-toggle" role="group" aria-label="Documentation visibility">
        <button type="button" class="docs-mode-btn ${docsVisibilityMode === "primary" ? "active" : ""}" data-docs-mode="primary">Primary KB</button>
        <button type="button" class="docs-mode-btn ${docsVisibilityMode === "all" ? "active" : ""}" data-docs-mode="all">All registered</button>
      </div>
      <div class="docs-nav-summary">${summary}</div>
      ${modeNote}
    </div>
    <div id="docs-nav-tree" class="docs-nav-tree">${treeHtml}</div>
  `;
  nav.querySelectorAll(".docs-mode-btn").forEach((button) => {
    button.addEventListener("click", () => setDocsVisibilityMode(button.dataset.docsMode));
  });
  nav.querySelectorAll(".docs-nav-item").forEach((button) => {
    button.addEventListener("click", () => {
      nav.querySelectorAll(".docs-nav-item").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderSelectedDoc(docsAllEntries[Number(button.dataset.docIndex)]);
    });
  });
}

function setDocsVisibilityMode(mode) {
  // Toggle between the curated Primary KB view and the full registry. Only the navigation is
  // re-rendered; the active document's body is preserved so switching mode never breaks the
  // current selection or body rendering.
  const next = mode === "all" ? "all" : "primary";
  if (next === docsVisibilityMode) return;
  docsVisibilityMode = next;
  renderDocsNav();
}

function isRepoLocalDocPath(docPath) {
  // Only fetch repository-local files served read-only by serve-project-console.mjs. Reject any
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
    let paragraph = [];
    let listType = null;
    const flushParagraph = () => {
      if (paragraph.length) {
        html.push(`<p>${inline(paragraph.join(" "))}</p>`);
        paragraph = [];
      }
    };
    const flushList = () => {
      if (listType) {
        html.push(`</${listType}>`);
        listType = null;
      }
    };
    segment.split("\n").forEach((rawLine) => {
      const trimmed = rawLine.trim();
      if (!trimmed) {
        flushParagraph();
        flushList();
        return;
      }
      const heading = trimmed.match(/^(#{1,6})\s+(.*)$/);
      if (heading) {
        flushParagraph();
        flushList();
        const level = Math.min(heading[1].length + 1, 4);
        html.push(`<h${level} class="docs-body-h">${inline(heading[2])}</h${level}>`);
        return;
      }
      if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
        flushParagraph();
        flushList();
        html.push("<hr>");
        return;
      }
      const ordered = trimmed.match(/^\d+\.\s+(.*)$/);
      const unordered = trimmed.match(/^[-*+]\s+(.*)$/);
      if (ordered || unordered) {
        flushParagraph();
        const wanted = ordered ? "ol" : "ul";
        if (listType !== wanted) {
          flushList();
          html.push(`<${wanted}>`);
          listType = wanted;
        }
        html.push(`<li>${inline(ordered ? ordered[1] : unordered[1])}</li>`);
        return;
      }
      if (trimmed.startsWith("&gt;")) {
        flushParagraph();
        flushList();
        html.push(`<blockquote>${inline(trimmed.replace(/^&gt;\s?/, ""))}</blockquote>`);
        return;
      }
      paragraph.push(trimmed);
    });
    flushParagraph();
    flushList();
  });
  return html.join("\n");
}

function renderDocBodyContent(doc, rawText) {
  const ext = text(doc.path, "").split(".").pop().toLowerCase();
  if (ext === "md" || ext === "markdown") return renderDocMarkdownLite(rawText);
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
      const raw = await fetchText(`../../${requestedPath}`);
      if (docsActivePath !== requestedPath) return;
      if (raw == null) {
        container.innerHTML = `
          <div class="docs-body-note">
            <strong>The document body could not be loaded from <span class="mono">${escapeHtml(requestedPath)}</span>.</strong>
            <span>Serve the repository read-only with <span class="mono">node tools/project-console/serve-project-console.mjs</span> and reopen this view. Document metadata stays available in the collapsible Metadata section above.</span>
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

function renderDocMetadataDetails(doc) {
  // Collapsible reader metadata (RUN-JAME-PROJECT-CONSOLE-DOCS-V3-001-UX-TREE-NAV-REPAIR-001):
  // carries the full docs_index metadata that previously lived in the fixed right metadata
  // rail. Collapsed by default so metadata stays available without consuming permanent width.
  return `
    <details class="docs-meta-details">
      <summary>Metadata</summary>
      <div class="docs-meta-grid">
        ${metaField("Title", doc.title)}
        ${metaField("Path", doc.path, "mono")}
        ${metaField("Group", docGroupLabel(deriveDocGroup(doc)))}
        ${metaField("Nav Tier", docNavTierMeta(deriveDocNavTier(doc)).label)}
        ${metaField("Default Visible", isDefaultVisibleDoc(doc) ? "Yes (curated Primary KB)" : "No (available under All registered)")}
        ${metaField("Audience", doc.audience)}
        ${metaField("Freshness", doc.freshness)}
        ${metaField("Freshness Status", doc.freshness_status)}
        ${metaField("Source Role", doc.source_role)}
        ${metaField("Canonicality", doc.canonicality)}
        ${metaField("IA Bucket", doc.ia_bucket || "Not recorded")}
        ${metaField("Related Area", doc.related_area)}
        ${metaField("Related Objective", doc.related_objective_id)}
        ${metaField("Related Phase", doc.related_phase_id)}
        ${metaField("Related Run", doc.related_run_id)}
        ${metaField("Stale Reason", doc.stale_reason || "None recorded")}
        ${metaField("Last Reconciled", doc.last_reconciled_by_run)}
        ${metaField("Last Update", doc.last_update_source)}
        ${metaField("Source", ".aiw/docs/docs_index.json", "mono")}
      </div>
    </details>
  `;
}

function renderSelectedDoc(doc) {
  docsActivePath = text(doc.path, "");
  byId("docs-reader").innerHTML = `
    <div class="docs-reader-inner">
      <h1>${escapeHtml(doc.title || doc.path)}</h1>
      <div class="docs-claim-note">
        Rendered documentation reference. This panel shows the repository-local document body for reference only.
        Rendering a document here is not certification, acceptance, Human QA, closeout, or reconciliation, and does not change its status.
      </div>
      <div class="docs-summary-line">
        ${badge(`${docNavTierMeta(deriveDocNavTier(doc)).label} KB tier`, docNavTierMeta(deriveDocNavTier(doc)).tone)}
        ${badge(docGroupLabel(deriveDocGroup(doc)), "gray")}
        ${badge(doc.source_role || "unknown_source_role", "blue")}
        ${badge(doc.canonicality || "unknown_canonicality", "gray")}
        ${badge(doc.freshness_status || doc.freshness || "unknown_freshness", "gray")}
      </div>
      ${renderDocMetadataDetails(doc)}
      <div class="docs-body-source">Source: <a href="${escapeHtml(repoHref(doc.path))}">${escapeHtml(doc.path)}</a> &middot; navigation and freshness metadata live in <span class="mono">.aiw/docs/docs_index.json</span>.</div>
      <div id="docs-body" class="docs-body"><p class="docs-body-loading">Loading document body...</p></div>
    </div>
  `;
  loadDocBody(doc);
}

function renderGovernance(data) {
  const claims = data.snapshot?.no_claims_summary || data.projectStatus?.certification_summary || {};
  byId("review-policy").innerHTML = `
    <div class="status-grid">
      <div class="status-card">${badge("Human review pending", "amber")}<span>Project Console needs Human QA before Author Lite resumes.</span></div>
      <div class="status-card">${badge("Not self-approved", "gray")}<span>Review remains separate from implementation.</span></div>
      <div class="status-card">${badge("Not certified", "red")}<span>No component, Web, Slide, or Project Console certification is claimed.</span></div>
      <div class="status-card">${badge("Not AIW-managed", "red")}<span>The console is external manual/read-only.</span></div>
    </div>
    <div class="table-wrap" style="margin-top:16px;">
      <table>
        <thead><tr><th>Restriction</th><th>Value</th></tr></thead>
        <tbody>
          ${Object.entries(claims).map(([key, value]) => `<tr><td>${escapeHtml(friendlyLabel(key))}</td><td>${badge(text(value), value === false ? "red" : toneForStatus(value))}</td></tr>`).join("")}
        </tbody>
      </table>
    </div>
  `;

  byId("project-guardrails").innerHTML = tableFromRows(["Rule", "Status", "Source"], (data.guardrails?.guardrails || []).map((item) => [
    item.rule || item.title || item.id,
    badge(item.status || "ACTIVE", toneForStatus(item.status)),
    (item.source_refs || []).join("; ")
  ]));

  const runRows = data.runs.map((run) => [
    run.run_id,
    (run.guardrails || []).join("; ") || "No run-specific guardrails are recorded.",
    run.certification_impact || "NONE"
  ]);
  byId("run-guardrails").innerHTML = tableFromRows(["Run", "Guardrails", "Certification impact"], runRows);

  byId("project-memory").innerHTML = `
    <div class="group-label">Component status projection</div>
    ${renderComponentStatus(data.componentStatus?.components || [])}
    <div class="group-label" style="margin-top:18px;">Project memory</div>
    ${tableFromRows(["Decision", "Status", "Rationale"], data.memory.map((item) => [
      item.title || item.id,
      badge(item.status || "ACTIVE", toneForStatus(item.status)),
      item.rationale || item.decision || ""
    ]))}
  `;

  byId("no-claims").innerHTML = tableFromRows(["Restriction", "Status", "Allowed only if"], (data.noClaims?.claims || []).map((claim) => [
    claim.claim,
    badge(claim.status || "DISALLOWED", "red"),
    claim.allowed_only_if || ""
  ]));
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

function renderSources(data) {
  const loaded = loadedSources.map((source) => `
    <div class="source-status-item">
      <div class="source-status-label">Loaded</div>
      <div class="source-path">${escapeHtml(source)}</div>
    </div>
  `).join("");
  const failed = failedSources.map((source) => `
    <div class="source-status-item">
      <div class="source-status-label">Failed</div>
      <div class="source-path">${escapeHtml(source)}</div>
    </div>
  `).join("");
  byId("state-sources").innerHTML = `
    <div class="source-status-list">
      ${loaded || emptyState("No sources loaded.")}
      ${failed ? `<div class="group-label">Optional source failures</div>${failed}` : ""}
    </div>
  `;
  byId("repo-structure").innerHTML = [
    row("Manifest", ".aiw/project.json", "mono"),
    row("Project status", ".aiw/state/project_status.json", "mono"),
    row("Component status", ".aiw/state/component_status.json", "mono"),
    row("Events", ".aiw/state/events.jsonl", "mono"),
    row("Objectives", ".aiw/roadmap/objectives.jsonl", "mono"),
    row("Phases", ".aiw/roadmap/phases.jsonl", "mono"),
    row("Runs", ".aiw/roadmap/runs.jsonl", "mono"),
    row("Queue", ".aiw/roadmap/queue.json", "mono"),
    row("Change ledger", ".aiw/ledgers/change_ledger.jsonl", "mono"),
    row("Git provenance", ".aiw/ledgers/git_provenance.jsonl", "mono"),
    row("Human QA", ".aiw/ledgers/human_qa.jsonl", "mono"),
    row("AI reviews", ".aiw/ledgers/ai_reviews.jsonl", "mono"),
    row("Docs index", ".aiw/docs/docs_index.json", "mono")
  ].join("");
  byId("console-source-files").innerHTML = [
    row("HTML view", "docs/project-console/index.html", "mono"),
    row("Styles", "docs/project-console/assets/project-console.css", "mono"),
    row("Renderer", "docs/project-console/assets/project-console.js", "mono"),
    row("Primary data", ".aiw/views/project_console.snapshot.json", "mono"),
    row("Docs indexed", data.docsIndex?.docs?.length || 0),
    row("Components", data.componentStatus?.components?.length || 0),
    row("Git episodes", data.gitProvenance.length),
    row("Roadmap", `${data.objectives.length} objectives / ${data.phases.length} phases / ${data.runs.length} runs`)
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
  return { roadmap, runsById, contextByRunId, allRuns };
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

function v3QueueGroupKey(run, runsById) {
  if (run.status === "active") {
    const current = v3DeriveCurrent(run);
    if (current && current.stage === "human_qa" && current.state === "waiting") {
      return "needs_human_decision";
    }
    return "now";
  }
  if (run.status === "planned") {
    const ready = (run.depends_on || []).every((id) => runsById.get(id)?.status === "completed");
    return ready ? "ready_next" : "later";
  }
  return "history";
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

function v3RoadmapRunRow(run) {
  // RR-A: status disc + title line opening with the stable inline #N order + one
  // textual status badge; non-active rows recede via status classes (prototype).
  return `
    <button class="v3-run-row is-${escapeHtml(run.status)}" type="button" data-v3-run="${escapeHtml(run.run_id)}">
      ${v3TerminalIcon(run.status)}
      <span class="v3-run-info">
        <span class="v3-run-title"><span class="v3-run-order">#${run.queue_order}</span>${escapeHtml(run.title)}</span>
        <span class="v3-run-summary">${escapeHtml(run.summary)}</span>
      </span>
      ${v3StatusBadge(run.status)}
    </button>
  `;
}

// Status-bearing queue-row content (Stage / Waiting on / Dependencies / Closeout cells
// and the status chip) is derived HERE and passed into the presentation-only row
// template, following the same caller-computed pattern as the History lead icon.
function v3QueueRowCells(run, groupKey, runsById) {
  if (groupKey === "history") {
    const closeout = "closeout_result" in run ? v3ResultText(run.closeout_result) : "Blocked";
    const tone = run.status === "completed" ? " is-green" : "";
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
  let value = "Unresolved dependency";
  if (blocking.length === 1) value = `#${blocking[0].queue_order} ${blocking[0].title}`;
  else if (blocking.length === 2) value = `#${blocking[0].queue_order} · #${blocking[1].queue_order}`;
  else if (blocking.length > 2) value = `#${blocking[0].queue_order} +${blocking.length - 1} more`;
  return {
    cells: `<span class="v3-row-cell"><span class="v3-row-cell-label">Waiting on</span><span class="v3-row-cell-value is-link">${escapeHtml(value)}</span></span>`,
    chip: '<span class="v3-chip v3-chip-planned">Planned</span>'
  };
}

function v3QueueRowHtml(run, leadIcon, cells, chip, tileClass, rowClass) {
  // Presentation-only template (QR-ACT/PLN/HIS-A): reads only the run order, title, and
  // summary; the lead marker, labeled cells, chip, tile tint, and row modifier are
  // computed by the caller, so this template never reads status-bearing run fields.
  // History rows lead with the disc and demote the #N order into the title line.
  const icon = leadIcon || "";
  const marker = icon
    ? `<span class="v3-run-marker">${icon}</span>`
    : `<span class="v3-order-tile${tileClass || ""}">${run.queue_order}</span>`;
  const titleLead = icon ? `<span class="v3-run-order">#${run.queue_order}</span>` : "";
  return `
    <button class="v3-queue-row${icon ? " v3-queue-row-terminal" : ""}${rowClass || ""}" type="button" data-v3-run="${escapeHtml(run.run_id)}">
      ${marker}
      <span class="v3-run-info">
        <span class="v3-run-title">${titleLead}${escapeHtml(run.title)}</span>
        <span class="v3-run-summary">${escapeHtml(run.summary)}</span>
      </span>
      ${cells || ""}
      ${chip ? `<span class="v3-row-chip">${chip}</span>` : ""}
      <span class="v3-row-chevron">${v3Chevron(13)}</span>
    </button>
  `;
}

function v3PhaseBlock(phase) {
  const runs = phase.runs || [];
  // PH-D band: caret + phase title + derived ratio. Phases open by default inside an
  // open objective (approved handoff) and keep their local expand state for the session.
  return `
    <details class="v3-phase" open>
      <summary class="v3-phase-header">
        <span class="v3-caret">${v3Chevron(11)}</span>
        <span class="v3-phase-title">${escapeHtml(phase.title)}</span>
        <span class="v3-phase-ratio">${escapeHtml(v3PhaseRatio(runs))}</span>
      </summary>
      <div class="v3-run-list">
        ${runs.map((run) => v3RoadmapRunRow(run)).join("")}
      </div>
    </details>
  `;
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
    const trigger = event.target.closest("[data-v3-run]");
    if (!trigger || !container.contains(trigger)) return;
    // Row containers open a fresh root detail and record the origin subview for the
    // stack-root Back control; the drawer (header + body) pushes a dependency.
    if (!nested && origin) v3DetailOrigin = origin;
    v3OpenRunDetail(trigger.dataset.v3Run, nested ? "push" : "root");
  });
}

function renderRoadmapV3(data) {
  const container = byId("roadmap-v3-tree");
  if (!container) return;
  const model = v3Model(data);
  if (!model) {
    v3Unavailable("roadmap-v3-tree", "roadmap.json unavailable or invalid");
    return;
  }
  roadmapV3ModelCache = model;
  const objectives = model.roadmap.objectives.map((objective) => {
    const phases = objective.phases || [];
    const objectiveRuns = [];
    phases.forEach((phase) => (phase.runs || []).forEach((run) => objectiveRuns.push(run)));
    // Progressive disclosure: only the objective on the active decision path opens by
    // default; the footer disclosure keeps the identical "Phases" label open or closed.
    const hasActive = objectiveRuns.some((run) => run.status === "active");
    return `
      <div class="v3-objective-card">
        <div class="v3-objective-title">${escapeHtml(objective.title)}</div>
        <div class="v3-objective-summary">${escapeHtml(objective.summary)}</div>
        ${v3ObjectiveStats(objectiveRuns)}
        <details class="v3-phases-details"${hasActive ? " open" : ""}>
          <summary class="v3-phases-toggle">Phases<span class="v3-caret">${v3Chevron(11)}</span></summary>
          <div class="v3-phase-list">
            ${phases.map((phase) => v3PhaseBlock(phase)).join("")}
          </div>
        </details>
      </div>
    `;
  }).join("");
  container.innerHTML = objectives;
  v3AttachHandlers(container, { origin: "Roadmap" });
}

// Sub-tab counts per the approved handoff: Run Queue shows pending runs (total minus
// History) and Roadmap shows the objective count. Counts are injected into the static
// segment buttons at render time; the index.html markup itself stays unchanged.
function v3UpdateSubtabCounts(model, historyCount) {
  const pending = model.allRuns.length - historyCount;
  [["v3queue", pending], ["v3roadmap", model.roadmap.objectives.length]].forEach(([subview, value]) => {
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
function renderOverviewV3(data) {
  const currentWorkRoot = byId("project-overview");
  const nextActionRoot = byId("next-pending-runs");
  const snapshotRoot = byId("overview-activity");
  if (!currentWorkRoot || !nextActionRoot || !snapshotRoot) return;
  const model = v3Model(data);
  if (!model) {
    v3Unavailable("project-overview", "roadmap.json unavailable or invalid");
    nextActionRoot.innerHTML = "";
    snapshotRoot.innerHTML = "";
    return;
  }
  roadmapV3ModelCache = model;
  setOverviewCardTitles();
  const runs = model.allRuns.slice().sort((a, b) => a.queue_order - b.queue_order);
  const groupLabels = Object.fromEntries(ROADMAP_V3_QUEUE_GROUPS.map((group) => [group.key, group.label]));
  const active = runs.find((run) => run.status === "active") || runs[0];
  const activeGroupLabel = active ? (groupLabels[v3QueueGroupKey(active, model.runsById)] || "Now") : "Now";
  const ready = runs.filter((run) => run.status === "planned" && (run.depends_on || []).every((id) => model.runsById.get(id)?.status === "completed"));
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
    </button>` : emptyState("No runs in the roadmap.")}
    ${nextWork ? `
    <button class="v3-ov-card v3-ov-card-next" type="button" data-v3-run="${escapeHtml(nextWork.run_id)}">
      <span class="v3-ov-label">Next up</span>
      <span class="v3-ov-titleline"><span class="v3-ov-order">#${nextWork.queue_order}</span><span class="v3-ov-title">${escapeHtml(nextWork.title)}</span></span>
      <span class="v3-ov-chips">
        <span class="v3-ov-chip is-ready-next">${escapeHtml(groupLabels.ready_next || "Ready Next")}</span>
        <span class="v3-ov-chip">Ready</span>
      </span>
      <span class="v3-ov-summary">${escapeHtml(nextWork.summary)}</span>
    </button>` : ""}
  `;

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
    groupCounts[v3QueueGroupKey(run, model.runsById)] += 1;
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
  `;
  v3AttachHandlers(byId("tab-overview"), { origin: "Overview" });
}

// ==================== Git commit history (History tab) ====================
// Renders the repository's Git commit history from the derived read-only snapshot
// .aiw/views/git_history.snapshot.json (schema jame.git_history_snapshot.v1),
// regenerated automatically from the local Git repository by serve-project-console.mjs.
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
  if (currentBranch && branches.includes(currentBranch)) return currentBranch;
  if (branches.includes("jame-parallel-audit-001")) return "jame-parallel-audit-001";
  if (branches.includes("main")) return "main";
  return branches[0];
}

function renderCommitHistory(data) {
  const container = byId("history-list");
  if (!container) return;
  const snapshot = data && data.gitHistory;
  if (!snapshot || snapshot.schema !== "jame.git_history_snapshot.v1" || !Array.isArray(snapshot.branches) || !snapshot.branches.length || !Array.isArray(snapshot.commits)) {
    container.innerHTML = `
      <div class="readonly-banner">
        <strong>Commit history unavailable.</strong>
        <span>git_history.snapshot.json could not be loaded. The rest of the Project Console is unaffected.</span>
      </div>
    `;
    return;
  }
  const branches = historyVisibleBranches(snapshot.branches);
  if (!branches.length) {
    container.innerHTML = `
      <div class="v3-hist-eyebrow">Commit history</div>
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
      <div class="v3-hist-eyebrow">Commit history</div>
      <div class="v3-hist-sync-controls">
        <button class="v3-hist-sync-btn" type="button" data-hist-sync${historyManualSyncing ? " disabled" : ""}>Sync History</button>
        <span class="v3-hist-sync-state is-${historySyncState.kind}" role="status" aria-live="polite">${escapeHtml(historySyncState.text)}</span>
      </div>
    </div>
    <div class="v3-hist-branches">${pills}</div>
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
// pollutes the Sources tab. Cache is disabled so a rebuilt snapshot is always seen.
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
    v3Unavailable("run-queue-v3", "roadmap.json unavailable or invalid");
    return;
  }
  roadmapV3ModelCache = model;
  const grouped = new Map(ROADMAP_V3_QUEUE_GROUPS.map((group) => [group.key, []]));
  model.allRuns.forEach((run) => {
    grouped.get(v3QueueGroupKey(run, model.runsById)).push(run);
  });
  v3UpdateSubtabCounts(model, grouped.get("history").length);
  const sections = ROADMAP_V3_QUEUE_GROUPS.map((group) => {
    const runs = grouped.get(group.key).slice().sort((a, b) => a.queue_order - b.queue_order);
    const defaultOpen = ROADMAP_V3_QUEUE_GROUP_DEFAULT_OPEN[group.key];
    const expanded = defaultOpen === "when_non_empty" ? runs.length > 0 : defaultOpen === true;
    const bodyId = `v3-queue-group-body-${group.key}`;
    const isHistory = group.key === "history";
    const rows = runs.length
      ? runs.map((run) => {
          const parts = v3QueueRowCells(run, group.key, model.runsById);
          // History rows lead with the semantic terminal marker via v3TerminalIcon while
          // #N demotes into the title line; the active run's order tile carries the tint
          // and Later rows recede slightly (prototype QR variants).
          const leadIcon = isHistory ? v3TerminalIcon(run.status) : "";
          const tileClass = run.status === "active" ? " is-active" : "";
          const rowClass = group.key === "later" ? " is-later" : "";
          return v3QueueRowHtml(run, leadIcon, parts.cells, parts.chip, tileClass, rowClass);
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
  const dependencyRows = (run.depends_on || []).map((dependencyId) => {
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
  }).join("");
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
    ${v3ProgressTimeline(run)}
  `;
  v3AttachHandlers(byId("run-drawer"), { nested: true });
  byId("drawer-overlay").classList.add("open");
  byId("run-drawer").classList.add("open");
  byId("run-drawer").setAttribute("aria-hidden", "false");
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

function renderAll(data) {
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
  renderGovernance(data);
  renderSources(data);
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
    <span>This usually happens when opening through <span class="mono">file://</span>. Serve the repo with a local static server, then open <span class="mono">docs/project-console/index.html</span>.</span>
    <span class="mono">${escapeHtml(error.message)}</span>
  `;
}

function showOptionalSourceNotice() {
  if (!failedSources.length) return;
  const notice = byId("load-notice");
  notice.hidden = false;
  notice.className = "readonly-banner";
  notice.innerHTML = "<strong>Rendered from the primary snapshot.</strong><span>Some optional local state files could not be loaded. Open Sources for details.</span>";
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
    if (event.key === "Escape") closeDrawer();
  });
}

async function loadData() {
  const snapshot = await fetchJson(PATHS.snapshot, true);
  const [
    project,
    projectStatus,
    componentStatus,
    objectives,
    phases,
    runs,
    queue,
    roadmapV2,
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
    gitHistory
  ] = await Promise.all([
    fetchJson(PATHS.project),
    fetchJson(PATHS.projectStatus),
    fetchJson(PATHS.componentStatus),
    fetchJsonl(PATHS.objectives),
    fetchJsonl(PATHS.phases),
    fetchJsonl(PATHS.runs),
    fetchJson(PATHS.queue),
    fetchJson(PATHS.roadmapV2),
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
    fetchJson(PATHS.gitHistory)
  ]);

  return {
    snapshot,
    project,
    projectStatus,
    componentStatus,
    objectives,
    phases,
    runs,
    queue,
    roadmapV2,
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
    objectivesById: indexBy(objectives, "objective_id"),
    phasesById: indexBy(phases, "phase_id"),
    runsById: indexBy(runs, "run_id")
  };
}

async function init() {
  setupTabs();
  setOverviewCardTitles();
  try {
    appData = await loadData();
    renderAll(appData);
    // Seed the History version marker from the initial load so the first active-tab poll
    // only re-renders when the snapshot actually changes.
    historyVersionMarker = historySnapshotMarker(appData.gitHistory);
    showOptionalSourceNotice();
  } catch (error) {
    showFetchFallback(error);
    byId("project-overview").innerHTML = emptyState("Primary snapshot could not be loaded.");
    byId("next-pending-runs").innerHTML = emptyState("No queue data is available without the snapshot.");
    byId("overview-activity").innerHTML = emptyState("Overview restrictions are unavailable without the snapshot.");
  }
}

init();
