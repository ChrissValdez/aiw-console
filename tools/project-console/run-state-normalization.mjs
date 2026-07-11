export const NORMALIZED_RUN_STATE_FIELDS = Object.freeze([
  "roadmap_status",
  "run_status",
  "human_gate_policy",
  "human_gate_reason",
  "human_gate_conditions",
  "human_decision",
  "terminal_decision",
  "followups",
  "evidence_refs",
  "docs_refs",
  "commit_refs",
  "legacy_status_raw",
  "display_status"
]);

export const LEGACY_TERMINAL_DECISIONS = Object.freeze([
  "PASS",
  "REPAIRABLE_BY_CONTRACT",
  "REPAIRABLE_BY_SCOPE",
  "REPAIRABLE_BY_EVIDENCE_REFRESH",
  "REPAIRABLE_BY_CODE",
  "REPAIRABLE_BY_FOLLOWUP",
  "HUMAN_DECISION_REQUIRED",
  "RESOURCE_BLOCKED",
  "HARD_BLOCK",
  "ABORTED_BY_POLICY",
  "NO_CHANGE_VERIFIED",
  "UNKNOWN_LEGACY_STATE",
  "NONE"
]);

export const NORMALIZED_FIELD_ALLOWED_VALUES = Object.freeze({
  roadmap_status: Object.freeze([
    "planned",
    "current",
    "next",
    "done",
    "deferred",
    "parked",
    "superseded"
  ]),
  run_status: Object.freeze([
    "planned",
    "active",
    "ai_review",
    "human_review_required",
    "changes_required",
    "blocked",
    "done",
    "archived"
  ]),
  human_gate_policy: Object.freeze(["required", "not_required", "conditional"]),
  human_decision: Object.freeze([
    "not_required",
    "pending",
    "approved",
    "approved_with_followup",
    "changes_required",
    "blocked",
    "deferred",
    "rejected",
    "insufficient_evidence"
  ]),
  terminal_decision: Object.freeze([
    "none",
    "approved",
    "approved_with_followup",
    "changes_required",
    "blocked",
    "deferred",
    "rejected",
    "no_change_verified",
    "superseded"
  ])
});

export const ROADMAP_REBASE_FIELD_MODEL_LITE_FIELDS = Object.freeze([
  "display_group",
  "execution_readiness",
  "blocked_by",
  "blocking_reason",
  "parent_run_id",
  "followup_of",
  "derived_from",
  "supersedes",
  "superseded_by",
  "next_action",
  "closeout_criteria",
  "why_now",
  "why_not_now",
  "default_visibility",
  "claim_boundary"
]);

export const ROADMAP_REBASE_FIELD_MODEL_LITE_ALLOWED_VALUES = Object.freeze({
  display_group: Object.freeze([
    "now",
    "ready_next",
    "needs_ticket_scope",
    "needs_human_decision",
    "blocked_by_dependency",
    "deferred_later",
    "parked_future",
    "archive_map_only",
    "unknown"
  ]),
  execution_readiness: Object.freeze([
    "active",
    "ready",
    "ready_after_dependency",
    "needs_scope",
    "needs_human_decision",
    "blocked_dependency",
    "deferred",
    "parked",
    "reference_only",
    "unknown"
  ]),
  default_visibility: Object.freeze([
    "primary",
    "detail",
    "future",
    "archive"
  ]),
  claim_boundary: Object.freeze([
    "none",
    "no_certification_claim",
    "readiness_only",
    "acceptance_checkpoint",
    "legacy_certification_language",
    "unknown"
  ])
});

const roadmapStatuses = new Set(NORMALIZED_FIELD_ALLOWED_VALUES.roadmap_status);
const runStatuses = new Set(NORMALIZED_FIELD_ALLOWED_VALUES.run_status);
const humanGatePolicies = new Set(NORMALIZED_FIELD_ALLOWED_VALUES.human_gate_policy);
const humanDecisions = new Set(NORMALIZED_FIELD_ALLOWED_VALUES.human_decision);
const normalizedTerminalDecisions = new Set(NORMALIZED_FIELD_ALLOWED_VALUES.terminal_decision);

const LEGACY_STATUS_FIELDS = Object.freeze([
  "status",
  "classification",
  "queue_classification",
  "gate_state",
  "lifecycle_status",
  "operational_state",
  "physical_lifecycle",
  "stage",
  "lifecycle_stage",
  "wait_reason",
  "ai_review_status",
  "human_review_status",
  "delivery_status",
  "resolution_status",
  "docs_update_status",
  "certification_impact",
  "certification_state",
  "terminal_decision",
  "run_kind",
  "display_kind",
  "followup_linkage",
  "domain",
  "operator_status_label"
]);

const SOURCE_REF_FIELDS = Object.freeze(["source_refs"]);

const EXPLICIT_FOLLOWUP_FIELDS = Object.freeze([
  "followups",
  "followup_refs",
  "follow_up_refs"
]);

const COMMIT_REF_PATTERN = /\b[0-9a-f]{7,40}\b/i;

const CONDITIONAL_GATE_REASON =
  "Legacy Project Console record has no explicit human gate policy; approval is not inferred.";

const CONDITIONAL_GATE_CONDITIONS = Object.freeze([
  "Triggers if mapping changes user-facing display, visible claims, or approval/certification semantics."
]);

function textValue(value) {
  return value == null ? "" : String(value).trim();
}

function pick(record, queueItem, field) {
  const recordValue = textValue(record?.[field]);
  if (recordValue) return recordValue;
  const queueValue = textValue(queueItem?.[field]);
  return queueValue || "";
}

function pickQueueFirst(record, queueItem, field) {
  const queueValue = textValue(queueItem?.[field]);
  if (queueValue) return queueValue;
  const recordValue = textValue(record?.[field]);
  return recordValue || "";
}

function arrayValue(value) {
  if (Array.isArray(value)) return value.slice();
  if (value == null || value === "") return [];
  return [value];
}

function arrayField(record, queueItem, field) {
  const values = [];
  if (Array.isArray(record?.[field])) values.push(...record[field]);
  if (Array.isArray(queueItem?.[field])) values.push(...queueItem[field]);
  return uniqueByJson(values);
}

function arrayFields(record, queueItem, fields) {
  const values = [];
  for (const field of fields) {
    values.push(...arrayField(record, queueItem, field));
  }
  return uniqueByJson(values);
}

function sourceArrayField(record, queueItem, field) {
  return uniqueByJson([
    ...arrayValue(record?.[field]),
    ...arrayValue(queueItem?.[field])
  ]);
}

function sourceArrayFields(record, queueItem, fields) {
  const values = [];
  for (const field of fields) {
    values.push(...sourceArrayField(record, queueItem, field));
  }
  return uniqueByJson(values);
}

function upperText(value) {
  return textValue(value).toUpperCase();
}

function pickUpper(record, queueItem, field) {
  return upperText(pick(record, queueItem, field));
}

function pickQueueFirstUpper(record, queueItem, field) {
  return upperText(pickQueueFirst(record, queueItem, field));
}

function valueForRaw(value) {
  return Array.isArray(value) || (value && typeof value === "object")
    ? JSON.stringify(value)
    : String(value);
}

function referencesText(record, queueItem) {
  return sourceArrayFields(record, queueItem, SOURCE_REF_FIELDS)
    .map((ref) => textValue(ref))
    .filter(Boolean)
    .join("\n")
    .toUpperCase();
}

function uniqueByJson(values) {
  const seen = new Set();
  const result = [];
  for (const value of values) {
    const key = JSON.stringify(value);
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(value);
  }
  return result;
}

function isCompletedHistory(record) {
  const lifecycle = textValue(record?.lifecycle_status).toUpperCase();
  const delivery = textValue(record?.delivery_status).toUpperCase();
  return (
    record?.physical_lifecycle === "completed" ||
    record?.run_kind === "history" ||
    lifecycle.includes("COMPLETED") ||
    lifecycle.includes("HISTORY") ||
    delivery.includes("COMMITTED_HISTORY")
  );
}

function normalizeRoadmapStatus(record, queueItem) {
  const explicit = pick(record, queueItem, "roadmap_status");
  if (roadmapStatuses.has(explicit)) return explicit;

  const classification =
    pickQueueFirst(record, queueItem, "classification") ||
    pickQueueFirst(record, queueItem, "queue_classification");
  const lifecycle = pickQueueFirstUpper(record, queueItem, "lifecycle_status");
  const resolution = pickQueueFirstUpper(record, queueItem, "resolution_status");

  if (resolution.includes("SUPERSEDED") || lifecycle.includes("SUPERSEDED")) return "superseded";
  if (classification === "deferred" || lifecycle.includes("DEFERRED")) return "deferred";
  if (isCompletedHistory(record)) return "done";
  if (classification === "current") return "current";
  if (classification === "queued" || classification === "review_required") return "next";
  if (
    classification === "planned" ||
    classification === "own_ticket_required" ||
    classification === "future" ||
    classification === "not_started"
  ) {
    return "planned";
  }
  if (classification === "blocked" || classification === "map_only" || lifecycle.includes("BLOCKED")) {
    return "parked";
  }

  return "planned";
}

function normalizeRunStatus(record, queueItem) {
  const explicit = pick(record, queueItem, "run_status");
  if (runStatuses.has(explicit)) return explicit;

  const operationalState = pickQueueFirst(record, queueItem, "operational_state");
  const physicalLifecycle = pickQueueFirst(record, queueItem, "physical_lifecycle");
  const waitReason = pickQueueFirst(record, queueItem, "wait_reason");
  const terminalDecision = pickUpper(record, queueItem, "terminal_decision");
  const stage =
    pickQueueFirst(record, queueItem, "stage") ||
    pickQueueFirst(record, queueItem, "lifecycle_stage");
  const classification =
    pickQueueFirst(record, queueItem, "classification") ||
    pickQueueFirst(record, queueItem, "queue_classification");

  if (terminalDecision === "HUMAN_DECISION_REQUIRED") return "human_review_required";
  if (terminalDecision === "RESOURCE_BLOCKED" || terminalDecision === "HARD_BLOCK") return "blocked";
  if (
    terminalDecision === "REPAIRABLE_BY_CONTRACT" ||
    terminalDecision === "REPAIRABLE_BY_SCOPE" ||
    terminalDecision === "REPAIRABLE_BY_EVIDENCE_REFRESH" ||
    terminalDecision === "REPAIRABLE_BY_CODE" ||
    terminalDecision === "REPAIRABLE_BY_FOLLOWUP"
  ) {
    return "changes_required";
  }
  if (physicalLifecycle === "archived") return "archived";
  if (operationalState === "blocked" || physicalLifecycle === "blocked" || classification === "blocked") {
    return "blocked";
  }
  if (
    stage === "human_qa" ||
    waitReason === "human_validation" ||
    waitReason === "human_intervention"
  ) {
    return "human_review_required";
  }
  if (stage === "ai_review" || classification === "review_required") return "ai_review";
  if (operationalState === "completed" || physicalLifecycle === "completed" || isCompletedHistory(record)) return "done";
  if (operationalState === "running" || classification === "current") return "active";

  return "planned";
}

function legacyHumanDecisionSignal(record, queueItem) {
  const humanReviewStatus = pickUpper(record, queueItem, "human_review_status");
  if (!humanReviewStatus) return null;

  if (
    humanReviewStatus === "APPROVED" ||
    humanReviewStatus === "APPROVED_FOR_CONTROLLED_MIGRATION_BY_OPERATOR" ||
    humanReviewStatus === "OPERATOR_APPROVED_EXECUTION_SCOPE" ||
    humanReviewStatus === "OPERATOR_APPROVED_IMPLEMENTATION_SCOPE"
  ) {
    return "approved";
  }
  if (
    humanReviewStatus === "OPERATOR_APPROVED_IMPLEMENTATION_SCOPE_PENDING_REVIEW" ||
    humanReviewStatus.includes("DROPDOWN_BEHAVIOR_PASSED")
  ) {
    return "approved_with_followup";
  }
  if (
    humanReviewStatus.includes("HUMAN_QA_FAILED") ||
    humanReviewStatus.includes("CHANGES_REQUIRED") ||
    humanReviewStatus.includes("REPAIR_REQUIRED")
  ) {
    return "changes_required";
  }
  if (humanReviewStatus.includes("DEFERRED")) return "deferred";
  if (humanReviewStatus.includes("PENDING")) return "pending";
  if (humanReviewStatus.includes("BLOCKED")) return "blocked";
  if (
    humanReviewStatus.includes("UNKNOWN") ||
    humanReviewStatus.includes("NO_EXPLICIT_RESULT")
  ) {
    return "insufficient_evidence";
  }

  const refsText = referencesText(record, queueItem);
  if (refsText.includes("OPERATOR_REPORTED_HUMAN_VISUAL_QA_OK")) {
    return "approved";
  }

  return null;
}

function assessHumanGate(record, queueItem) {
  const explicit = pick(record, queueItem, "human_gate_policy");
  if (humanGatePolicies.has(explicit)) {
    return {
      policy: explicit,
      reason: explicit === "not_required"
        ? "Source data explicitly marks this run as not requiring a human gate."
        : "Source data explicitly marks this run's human gate policy."
    };
  }

  const terminalDecision = pickUpper(record, queueItem, "terminal_decision");
  const waitReason = pickQueueFirst(record, queueItem, "wait_reason");
  const stage =
    pickQueueFirst(record, queueItem, "stage") ||
    pickQueueFirst(record, queueItem, "lifecycle_stage");
  const humanSignal = legacyHumanDecisionSignal(record, queueItem);

  if (terminalDecision === "HUMAN_DECISION_REQUIRED") {
    return {
      policy: "required",
      reason: "Legacy terminal decision explicitly requires a human decision."
    };
  }
  if (
    stage === "human_qa" ||
    waitReason === "human_validation" ||
    waitReason === "human_intervention"
  ) {
    return {
      policy: "required",
      reason: "Legacy stage or wait reason explicitly routes this run through Human QA."
    };
  }
  if (humanSignal && humanSignal !== "insufficient_evidence") {
    return {
      policy: "required",
      reason: "Legacy human review status records an explicit human decision signal."
    };
  }

  return {
    policy: "conditional",
    reason: CONDITIONAL_GATE_REASON
  };
}

function normalizeHumanGatePolicy(record, queueItem) {
  return assessHumanGate(record, queueItem).policy;
}

function normalizeHumanDecision(record, queueItem, humanGatePolicy) {
  const explicit = pick(record, queueItem, "human_decision");
  if (humanDecisions.has(explicit)) return explicit;

  const terminalDecision = pickUpper(record, queueItem, "terminal_decision");
  const humanSignal = legacyHumanDecisionSignal(record, queueItem);
  if (humanSignal && humanDecisions.has(humanSignal)) return humanSignal;
  if (terminalDecision === "HUMAN_DECISION_REQUIRED") return "pending";
  if (terminalDecision === "UNKNOWN_LEGACY_STATE") return "insufficient_evidence";
  if (humanGatePolicy === "not_required") return "not_required";
  if (humanGatePolicy === "required") return "pending";
  return "insufficient_evidence";
}

function normalizeTerminalDecision(record, queueItem, humanGatePolicy, humanDecision) {
  const explicit = pick(record, queueItem, "terminal_decision");
  if (normalizedTerminalDecisions.has(explicit)) return explicit;

  switch (upperText(explicit)) {
    case "PASS":
      if (humanGatePolicy === "not_required" || humanDecision === "approved") return "approved";
      if (humanDecision === "approved_with_followup") return "approved_with_followup";
      return "none";
    case "NO_CHANGE_VERIFIED":
      return "no_change_verified";
    case "REPAIRABLE_BY_CONTRACT":
    case "REPAIRABLE_BY_SCOPE":
    case "REPAIRABLE_BY_EVIDENCE_REFRESH":
    case "REPAIRABLE_BY_CODE":
    case "REPAIRABLE_BY_FOLLOWUP":
      return "changes_required";
    case "RESOURCE_BLOCKED":
    case "HARD_BLOCK":
      return "blocked";
    case "ABORTED_BY_POLICY":
      return "rejected";
    case "NONE":
    case "UNKNOWN_LEGACY_STATE":
    case "HUMAN_DECISION_REQUIRED":
    default:
      return "none";
  }
}

function normalizeHumanGateReason(record, queueItem, humanGateAssessment) {
  const explicit = pick(record, queueItem, "human_gate_reason");
  if (explicit) return explicit;
  return humanGateAssessment.reason;
}

function normalizeHumanGateConditions(record, queueItem, humanGatePolicy) {
  const explicit = arrayField(record, queueItem, "human_gate_conditions");
  if (explicit.length) return explicit;
  if (humanGatePolicy === "required") {
    return [
      "Record an explicit human decision before treating this run as approved or closed by approval."
    ];
  }
  return humanGatePolicy === "conditional" ? CONDITIONAL_GATE_CONDITIONS.slice() : [];
}

function evidenceRefs(record, queueItem) {
  return uniqueByJson([
    ...arrayField(record, queueItem, "evidence_refs"),
    ...sourceArrayFields(record, queueItem, SOURCE_REF_FIELDS)
  ]);
}

function docsRefs(record, queueItem) {
  return uniqueByJson([
    ...arrayField(record, queueItem, "docs_refs"),
    ...evidenceRefs(record, queueItem).filter((ref) => {
      const value = textValue(ref).toLowerCase();
      return value.includes("docs/") || value.endsWith(".md");
    })
  ]);
}

function commitRefs(record, queueItem) {
  return uniqueByJson([
    ...arrayField(record, queueItem, "commit_refs"),
    ...evidenceRefs(record, queueItem).filter((ref) => COMMIT_REF_PATTERN.test(textValue(ref)))
  ]);
}

function followups(record, queueItem) {
  return arrayFields(record, queueItem, EXPLICIT_FOLLOWUP_FIELDS);
}

function legacyStatusRaw(record, queueItem) {
  const explicit = arrayField(record, queueItem, "legacy_status_raw");
  if (explicit.length) return explicit;

  const rawValues = [];
  for (const [source, item] of [
    ["run", record],
    ["queue_item", queueItem]
  ]) {
    if (!item) continue;
    for (const field of LEGACY_STATUS_FIELDS) {
      const value = item[field];
      if (value == null || value === "") continue;
      rawValues.push({ source, field, value: valueForRaw(value) });
    }
  }
  return uniqueByJson(rawValues);
}

export function normalizeRunState(record = {}, context = {}) {
  const queueItem = context.queueItem || {};
  const humanGateAssessment = assessHumanGate(record, queueItem);
  const humanGatePolicy = humanGateAssessment.policy;
  const humanDecision = normalizeHumanDecision(record, queueItem, humanGatePolicy);

  return {
    roadmap_status: normalizeRoadmapStatus(record, queueItem),
    run_status: normalizeRunStatus(record, queueItem),
    human_gate_policy: humanGatePolicy,
    human_gate_reason: normalizeHumanGateReason(record, queueItem, humanGateAssessment),
    human_gate_conditions: normalizeHumanGateConditions(record, queueItem, humanGatePolicy),
    human_decision: humanDecision,
    terminal_decision: normalizeTerminalDecision(record, queueItem, humanGatePolicy, humanDecision),
    followups: followups(record, queueItem),
    evidence_refs: evidenceRefs(record, queueItem),
    docs_refs: docsRefs(record, queueItem),
    commit_refs: commitRefs(record, queueItem),
    legacy_status_raw: legacyStatusRaw(record, queueItem),
    display_status: pick(record, queueItem, "display_status") || null
  };
}

export function withNormalizedRunState(record = {}, context = {}) {
  return {
    ...record,
    ...normalizeRunState(record, context)
  };
}
