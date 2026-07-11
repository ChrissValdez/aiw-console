import fs from "node:fs";
import path from "node:path";
import {
  LEGACY_TERMINAL_DECISIONS,
  NORMALIZED_FIELD_ALLOWED_VALUES,
  NORMALIZED_RUN_STATE_FIELDS,
  ROADMAP_REBASE_FIELD_MODEL_LITE_ALLOWED_VALUES,
  ROADMAP_REBASE_FIELD_MODEL_LITE_FIELDS,
  normalizeRunState
} from "./run-state-normalization.mjs";

const root = process.cwd();
const errors = [];
const warnings = [];

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

function readJson(relativePath) {
  const filePath = path.join(root, relativePath);
  if (!fs.existsSync(filePath)) {
    fail(`Missing JSON file: ${relativePath}`);
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    fail(`Invalid JSON in ${relativePath}: ${error.message}`);
    return null;
  }
}

function readJsonl(relativePath) {
  const filePath = path.join(root, relativePath);
  if (!fs.existsSync(filePath)) {
    fail(`Missing JSONL file: ${relativePath}`);
    return [];
  }
  const content = fs.readFileSync(filePath, "utf8");
  return content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      try {
        return JSON.parse(line);
      } catch (error) {
        fail(`Invalid JSONL in ${relativePath}:${index + 1}: ${error.message}`);
        return null;
      }
    })
    .filter(Boolean);
}

function listFiles(directory) {
  const directoryPath = path.join(root, directory);
  if (!fs.existsSync(directoryPath)) {
    return [];
  }
  const entries = fs.readdirSync(directoryPath, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const relativePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return listFiles(relativePath);
    }
    return relativePath.replaceAll("\\", "/");
  });
}

function readText(relativePath) {
  const filePath = path.join(root, relativePath);
  if (!fs.existsSync(filePath)) {
    fail(`Missing text file: ${relativePath}`);
    return "";
  }
  return fs.readFileSync(filePath, "utf8");
}

function assertUnique(items, key, label) {
  const seen = new Set();
  for (const item of items) {
    const value = item[key];
    if (!value) {
      fail(`${label} missing ${key}`);
      continue;
    }
    if (seen.has(value)) {
      fail(`Duplicate ${label} ${key}: ${value}`);
    }
    seen.add(value);
  }
  return seen;
}

function assertFalse(value, label) {
  if (value !== false) {
    fail(`${label} must be false`);
  }
}

function assertNoForbiddenTrueFlags(object, pathLabel) {
  const forbiddenFlags = [
    "web_certified",
    "slide_certified",
    "generator_safe_global",
    "ready_for_human_certification",
    "mathlive_global_certified",
    "color_system_certified",
    "rule_certified",
    "formula_inserter_global_ready",
    "project_console_certified",
    "production_ready_dashboard",
    "asset_dedup_implemented",
    "aiw_managed"
  ];
  for (const flag of forbiddenFlags) {
    if (object?.[flag] === true) {
      fail(`${pathLabel}.${flag} must not be true`);
    }
  }
}

function assertRequiredKeys(object, keys, label) {
  for (const key of keys) {
    if (!(key in object)) {
      fail(`${label} missing required key ${key}`);
    }
  }
}

function includesAny(value, needles) {
  const textValue = String(value || "").toUpperCase();
  return needles.some((needle) => textValue.includes(needle));
}

function assertWaitReasonConsistency(record, label) {
  if (record.operational_state === "waiting") {
    if (!allowedWaitReasons.has(record.wait_reason)) {
      fail(`${label} is waiting and must include an allowed wait_reason`);
    }
  } else if (record.wait_reason) {
    fail(`${label} has wait_reason but operational_state is not waiting`);
  }
}

function assertCertificationGateNotPromoted(record, label) {
  if (record.run_kind !== "certification_gate" && record.display_kind !== "certification_gate") {
    return;
  }
  if (
    record.operational_state === "completed" ||
    record.physical_lifecycle === "completed" ||
    record.certification_state === "certified" ||
    record.terminal_decision === "PASS" ||
    record.terminal_decision === "approved" ||
    record.terminal_decision === "approved_with_followup" ||
    record.terminal_decision === "no_change_verified"
  ) {
    fail(`${label} is a certification gate and must not look completed/certified in this round`);
  }
}

function functionSource(source, functionName) {
  const start = source.indexOf(`function ${functionName}`);
  if (start === -1) {
    return "";
  }
  const next = source.indexOf("\nfunction ", start + 1);
  return next === -1 ? source.slice(start) : source.slice(start, next);
}

const project = readJson(".aiw/project.json");
const projectStatus = readJson(".aiw/state/project_status.json");
const componentStatus = readJson(".aiw/state/component_status.json");
const snapshot = readJson(".aiw/views/project_console.snapshot.json");
const objectives = readJsonl(".aiw/roadmap/objectives.jsonl");
const phases = readJsonl(".aiw/roadmap/phases.jsonl");
const runs = readJsonl(".aiw/roadmap/runs.jsonl");
const queue = readJson(".aiw/roadmap/queue.json");
const roadmapV2 = readJson(".aiw/roadmap/roadmap_v2.json");
const roadmapV3 = readJson(".aiw/roadmap/roadmap.json");
const events = readJsonl(".aiw/state/events.jsonl");
const changeLedger = readJsonl(".aiw/ledgers/change_ledger.jsonl");
const gitProvenance = readJsonl(".aiw/ledgers/git_provenance.jsonl");
const docsIndex = readJson(".aiw/docs/docs_index.json");
const noClaims = readJson(".aiw/guardrails/no_claims.json");
const projectConsoleJs = readText("docs/project-console/assets/project-console.js");
const projectConsoleCss = readText("docs/project-console/assets/project-console.css");
const projectConsoleParentRunId = "RUN-JAME-PROJECT-CONSOLE-FULL-ROADMAP-QUEUE-REPAIR-003R1";
const projectConsoleLifecycleStageIds = new Set([
  "RUN-JAME-PROJECT-CONSOLE-FULL-ROADMAP-QUEUE-REPAIR-CODEX-REVIEW-001",
  "RUN-JAME-PROJECT-CONSOLE-FULL-ROADMAP-QUEUE-HUMAN-QA-001",
  "RUN-JAME-PROJECT-CONSOLE-DASHBOARD-VISUAL-POLISH-IF-NEEDED-001",
  "RUN-JAME-PROJECT-CONSOLE-CLOSEOUT-STATE-STABILIZATION-001"
]);
const allowedPhysicalLifecycles = new Set(["active", "blocked", "completed", "archived", "unknown"]);
const allowedOperationalStates = new Set(["running", "waiting", "blocked", "completed", "unknown"]);
const allowedWaitReasons = new Set(["human_validation", "human_intervention", "resource_reset", "dependency", "provider_capacity", "scheduled_resume"]);
const allowedTerminalDecisions = new Set([
  ...LEGACY_TERMINAL_DECISIONS,
  ...NORMALIZED_FIELD_ALLOWED_VALUES.terminal_decision
]);
const allowedRunKinds = new Set(["work_item", "lifecycle_stage", "followup", "audit", "reconciliation", "documentation", "planning", "map_only", "history", "certification_gate", "checkpoint"]);
const allowedStages = new Set(["planned", "contract", "implementation", "ai_review", "human_qa", "changes_requested", "repair", "re_review", "commit_ready", "closeout", "done"]);
const allowedFollowupLinkage = new Set(["none", "parent", "child", "successor", "recovery", "superseded", "supersedes"]);
const allowedDomains = new Set(["project_console", "author_lite", "web_components", "math_authoring", "color_system", "slide", "docs", "asset_dedup", "release", "lessons_safety", "aiw_integration", "governance", "unknown"]);
const allowedCertificationStates = new Set(["not_applicable", "not_started", "not_certified", "blocked", "ready_for_review", "certified", "superseded"]);
const allowedProviders = new Set(["codex", "claude", "gemini", "other", "none"]);
const normalizedAllowedValueSets = Object.fromEntries(
  Object.entries(NORMALIZED_FIELD_ALLOWED_VALUES).map(([field, values]) => [field, new Set(values)])
);
const normalizedArrayFields = new Set([
  "human_gate_conditions",
  "followups",
  "evidence_refs",
  "docs_refs",
  "commit_refs",
  "legacy_status_raw"
]);
const roadmapRebaseAllowedValueSets = Object.fromEntries(
  Object.entries(ROADMAP_REBASE_FIELD_MODEL_LITE_ALLOWED_VALUES).map(([field, values]) => [field, new Set(values)])
);
const roadmapRebaseArrayFields = new Set([
  "blocked_by",
  "derived_from",
  "supersedes",
  "superseded_by"
]);
const roadmapRebaseNullableStringFields = new Set([
  "blocking_reason",
  "parent_run_id",
  "followup_of",
  "next_action",
  "closeout_criteria",
  "why_now",
  "why_not_now"
]);
const allowedRoadmapV2ObjectiveStatuses = new Set(["active", "planned", "future", "parked"]);
const allowedRoadmapV2PhaseStatuses = new Set(["active", "planned", "future", "parked", "deferred", "done"]);
const allowedRoadmapV2HumanGatePolicies = new Set(NORMALIZED_FIELD_ALLOWED_VALUES.human_gate_policy);
const requiredRoadmapV2ObjectiveIds = ["O0", "O1", "O2", "O3", "O4", "O5", "O6", "O7"];
const requiredRoadmapV2TopLevelFields = [
  "schema_version",
  "roadmap_id",
  "title",
  "status",
  "created_from",
  "generated_at",
  "source_of_truth_note",
  "legacy_roadmap_v1",
  "principles",
  "run_queue_v2_vocabulary",
  "objectives",
  "near_term_sequence",
  "cross_cutting_rules",
  "non_goals",
  "open_human_decisions",
  "next_recommended_runs"
];
const requiredRoadmapV2ObjectiveFields = [
  "objective_id",
  "title",
  "purpose",
  "status",
  "order",
  "why_it_belongs",
  "non_goals",
  "phases"
];
const requiredRoadmapV2PhaseFields = [
  "phase_id",
  "title",
  "purpose",
  "status",
  "dependencies",
  "human_gate_policy",
  "candidate_run_families",
  "non_goals",
  "legacy_sources_hint"
];
const requiredRoadmapV2QueueGroups = [
  "Now",
  "Pending Human Review",
  "Ready Next",
  "Backlog",
  "Dependency Hold"
];
const forbiddenCandidateRunContractFields = new Set([
  "run_id",
  "legacy_ticket_id",
  "legacy_ticket_ids",
  "acceptance_criteria",
  "implementation_steps",
  "validation_commands",
  "files_to_change",
  "files_changed",
  "commit_message",
  "test_plan"
]);

function assertNormalizedRunState(record, label, context = {}) {
  const normalized = normalizeRunState(record, context);

  for (const field of NORMALIZED_RUN_STATE_FIELDS) {
    if (!(field in normalized)) {
      fail(`${label} normalized state missing ${field}`);
    }
  }

  for (const [field, allowedSet] of Object.entries(normalizedAllowedValueSets)) {
    if (!allowedSet.has(normalized[field])) {
      fail(`${label} normalized ${field} has unsupported value ${normalized[field]}`);
    }
  }

  for (const field of normalizedArrayFields) {
    if (!Array.isArray(normalized[field])) {
      fail(`${label} normalized ${field} must be an array`);
    }
  }

  if (typeof normalized.human_gate_reason !== "string" || normalized.human_gate_reason.length === 0) {
    fail(`${label} normalized human_gate_reason must be a non-empty string`);
  }

  if (normalized.display_status != null && typeof normalized.display_status !== "string") {
    fail(`${label} normalized display_status must be a string or null`);
  }

  if (
    normalized.human_gate_policy === "required" &&
    normalized.terminal_decision === "approved" &&
    !["approved", "approved_with_followup"].includes(normalized.human_decision)
  ) {
    fail(`${label} normalized approved terminal decision requires explicit compatible human_decision`);
  }

  if (
    normalized.human_gate_policy === "required" &&
    normalized.terminal_decision === "approved_with_followup" &&
    !["approved", "approved_with_followup"].includes(normalized.human_decision)
  ) {
    fail(`${label} normalized approved_with_followup terminal decision requires explicit compatible human_decision`);
  }

  const sourceRecords = [
    ["run", record],
    ["queue_item", context.queueItem]
  ].filter(([, source]) => source);

  for (const [sourceLabel, source] of sourceRecords) {
    for (const [field, allowedSet] of Object.entries(normalizedAllowedValueSets)) {
      const value = source[field];
      if (field === "terminal_decision" && value != null && value !== "" && allowedTerminalDecisions.has(value)) {
        continue;
      }
      if (value != null && value !== "" && !allowedSet.has(value)) {
        fail(`${label} ${sourceLabel}.${field} has unsupported normalized value ${value}`);
      }
    }
    for (const field of normalizedArrayFields) {
      if (field in source && !Array.isArray(source[field])) {
        fail(`${label} ${sourceLabel}.${field} must be an array when present`);
      }
    }
    if ("human_gate_reason" in source && typeof source.human_gate_reason !== "string") {
      fail(`${label} ${sourceLabel}.human_gate_reason must be a string when present`);
    }
    if ("display_status" in source && source.display_status != null && typeof source.display_status !== "string") {
      fail(`${label} ${sourceLabel}.display_status must be a string or null when present`);
    }
  }

  return normalized;
}

function assertStringArray(value, label) {
  if (!Array.isArray(value)) {
    fail(`${label} must be an array`);
    return;
  }
  for (const [index, item] of value.entries()) {
    if (typeof item !== "string" || item.length === 0) {
      fail(`${label}[${index}] must be a non-empty string`);
    }
  }
}

function assertNullableString(value, label) {
  if (value !== null && typeof value !== "string") {
    fail(`${label} must be a string or null`);
  }
}

function assertRoadmapV2Source(roadmap) {
  const label = ".aiw/roadmap/roadmap_v2.json";
  if (!roadmap) return;

  assertRequiredKeys(roadmap, requiredRoadmapV2TopLevelFields, label);

  if (roadmap.status !== "draft_for_human_review") {
    fail(`${label} status must be draft_for_human_review`);
  }
  if (roadmap.schema_version !== "jame.roadmap_v2.v0.1") {
    fail(`${label} schema_version must be jame.roadmap_v2.v0.1`);
  }
  for (const proposalLifecycleField of ["proposal_id", "generated_from", "source_model", "replaces_when_approved"]) {
    if (proposalLifecycleField in roadmap) {
      fail(`${label} must not carry proposal-only lifecycle field ${proposalLifecycleField}`);
    }
  }
  if (!roadmap.legacy_roadmap_v1?.preserved) {
    fail(`${label} must reference preserved Legacy Roadmap v1`);
  }
  if (!roadmap.legacy_roadmap_v1?.not_deleted || !roadmap.legacy_roadmap_v1?.not_rewritten) {
    fail(`${label} must state Legacy Roadmap v1 was not deleted or rewritten`);
  }
  if (!Array.isArray(roadmap.legacy_roadmap_v1?.source_files)) {
    fail(`${label} legacy_roadmap_v1.source_files must be an array`);
  } else {
    for (const requiredLegacySource of [
      ".aiw/roadmap/objectives.jsonl",
      ".aiw/roadmap/phases.jsonl",
      ".aiw/roadmap/runs.jsonl",
      ".aiw/roadmap/queue.json"
    ]) {
      if (!roadmap.legacy_roadmap_v1.source_files.includes(requiredLegacySource)) {
        fail(`${label} legacy_roadmap_v1.source_files missing ${requiredLegacySource}`);
      }
    }
  }

  if (!Array.isArray(roadmap.principles) || roadmap.principles.length === 0) {
    fail(`${label} principles must be a non-empty array`);
  }
  if (!Array.isArray(roadmap.objectives) || roadmap.objectives.length === 0) {
    fail(`${label} objectives must be a non-empty array`);
    return;
  }

  const objectiveIds = assertUnique(roadmap.objectives, "objective_id", "roadmap_v2 objective");
  for (const objectiveId of requiredRoadmapV2ObjectiveIds) {
    if (!objectiveIds.has(objectiveId)) {
      fail(`${label} missing required objective ${objectiveId}`);
    }
  }

  const allPhases = [];
  for (const objective of roadmap.objectives) {
    assertRequiredKeys(objective, requiredRoadmapV2ObjectiveFields, `roadmap_v2 objective ${objective.objective_id || "UNKNOWN"}`);
    if (!allowedRoadmapV2ObjectiveStatuses.has(objective.status)) {
      fail(`roadmap_v2 objective ${objective.objective_id} has unsupported status ${objective.status}`);
    }
    if (!Array.isArray(objective.non_goals)) {
      fail(`roadmap_v2 objective ${objective.objective_id} non_goals must be an array`);
    }
    if (!Array.isArray(objective.phases) || objective.phases.length === 0) {
      fail(`roadmap_v2 objective ${objective.objective_id} must include phases`);
      continue;
    }
    allPhases.push(...objective.phases);

    for (const phase of objective.phases) {
      const phaseLabel = `roadmap_v2 phase ${phase.phase_id || "UNKNOWN"}`;
      assertRequiredKeys(phase, requiredRoadmapV2PhaseFields, phaseLabel);
      if (!String(phase.phase_id || "").startsWith(`${objective.objective_id}.P`)) {
        fail(`${phaseLabel} must belong to ${objective.objective_id}`);
      }
      if (!allowedRoadmapV2PhaseStatuses.has(phase.status)) {
        fail(`${phaseLabel} has unsupported status ${phase.status}`);
      }
      if (!allowedRoadmapV2HumanGatePolicies.has(phase.human_gate_policy)) {
        fail(`${phaseLabel} has unsupported human_gate_policy ${phase.human_gate_policy}`);
      }
      for (const field of ["dependencies", "candidate_run_families", "non_goals", "legacy_sources_hint"]) {
        if (!Array.isArray(phase[field])) {
          fail(`${phaseLabel} ${field} must be an array`);
        }
      }
      if (Array.isArray(phase.candidate_run_families)) {
        for (const [index, family] of phase.candidate_run_families.entries()) {
          const familyLabel = `${phaseLabel} candidate_run_families[${index}]`;
          if (family && typeof family === "object" && !Array.isArray(family)) {
            for (const field of Object.keys(family)) {
              if (forbiddenCandidateRunContractFields.has(field)) {
                fail(`${familyLabel} must remain a candidate family and must not define detailed run contract field ${field}`);
              }
            }
            if (!family.title || !family.summary) {
              fail(`${familyLabel} must include high-level title and summary`);
            }
          } else if (typeof family !== "string") {
            fail(`${familyLabel} must be a string or high-level object`);
          }
        }
      }
    }
  }

  assertUnique(allPhases, "phase_id", "roadmap_v2 phase");

  const visibleGroups = roadmap.run_queue_v2_vocabulary?.visible_groups;
  if (!Array.isArray(visibleGroups)) {
    fail(`${label} run_queue_v2_vocabulary.visible_groups must be an array`);
  } else {
    const labels = new Set(visibleGroups.map((group) => group?.label).filter(Boolean));
    for (const groupLabel of requiredRoadmapV2QueueGroups) {
      if (!labels.has(groupLabel)) {
        fail(`${label} run_queue_v2_vocabulary missing group ${groupLabel}`);
      }
    }
  }

  for (const field of ["near_term_sequence", "cross_cutting_rules", "non_goals", "open_human_decisions", "next_recommended_runs"]) {
    if (!Array.isArray(roadmap[field])) {
      fail(`${label} ${field} must be an array`);
    }
  }
}

function assertRoadmapRebaseFieldModelRecord(record, label) {
  if (!record || typeof record !== "object") return;

  for (const [field, allowedSet] of Object.entries(roadmapRebaseAllowedValueSets)) {
    if (field in record && !allowedSet.has(record[field])) {
      fail(`${label}.${field} has unsupported value ${record[field]}`);
    }
  }
  for (const field of roadmapRebaseArrayFields) {
    if (field in record) {
      assertStringArray(record[field], `${label}.${field}`);
    }
  }
  for (const field of roadmapRebaseNullableStringFields) {
    if (field in record) {
      assertNullableString(record[field], `${label}.${field}`);
    }
  }
}

function assertRoadmapRebaseFieldModelDeclaration(model, label) {
  if (!model || typeof model !== "object" || Array.isArray(model)) {
    fail(`${label} must declare roadmap_rebase_field_model_lite object`);
    return;
  }
  for (const field of ["status", "source_run_id", "reclassification_status", "display_behavior"]) {
    if (typeof model[field] !== "string" || model[field].length === 0) {
      fail(`${label}.${field} must be a non-empty string`);
    }
  }
  if (!Array.isArray(model.fields)) {
    fail(`${label}.fields must be an array`);
  } else {
    const fields = new Set(model.fields);
    for (const field of ROADMAP_REBASE_FIELD_MODEL_LITE_FIELDS) {
      if (!fields.has(field)) {
        fail(`${label}.fields missing ${field}`);
      }
    }
  }
  if (!model.allowed_values || typeof model.allowed_values !== "object" || Array.isArray(model.allowed_values)) {
    fail(`${label}.allowed_values must be an object`);
    return;
  }
  for (const [field, expectedValues] of Object.entries(ROADMAP_REBASE_FIELD_MODEL_LITE_ALLOWED_VALUES)) {
    const actualValues = model.allowed_values[field];
    if (!Array.isArray(actualValues)) {
      fail(`${label}.allowed_values.${field} must be an array`);
      continue;
    }
    const actual = actualValues.join("|");
    const expected = expectedValues.join("|");
    if (actual !== expected) {
      fail(`${label}.allowed_values.${field} must match the validator allowed values`);
    }
  }
}

function assertLegacyRawIncludes(normalized, label, field, expectedValue) {
  const expected = String(expectedValue).toLowerCase();
  const found = normalized.legacy_status_raw.some((entry) =>
    entry?.field === field && String(entry.value || "").toLowerCase().includes(expected)
  );
  if (!found) {
    fail(`${label} normalized legacy_status_raw must preserve ${field}=${expectedValue}`);
  }
}

function assertNormalizedFieldNotIn(normalized, label, field, disallowedValues) {
  if (disallowedValues.includes(normalized[field])) {
    fail(`${label} normalized ${field} must not be ${normalized[field]}`);
  }
}

function assertLegacyMappingBoundaryFixtures() {
  const fixtures = [
    {
      label: "Legacy mapping fixture certified is raw metadata only",
      record: {
        run_id: "VALIDATOR-FIXTURE-CERTIFIED",
        status: "certified",
        certification_state: "certified",
        terminal_decision: "NONE"
      },
      assert(normalized, label) {
        assertLegacyRawIncludes(normalized, label, "status", "certified");
        assertLegacyRawIncludes(normalized, label, "certification_state", "certified");
        assertNormalizedFieldNotIn(normalized, label, "human_decision", ["approved", "approved_with_followup"]);
        assertNormalizedFieldNotIn(normalized, label, "terminal_decision", ["approved", "approved_with_followup"]);
        assertNormalizedFieldNotIn(normalized, label, "run_status", ["done"]);
      }
    },
    {
      label: "Legacy mapping fixture not_certified is raw metadata only",
      record: {
        run_id: "VALIDATOR-FIXTURE-NOT-CERTIFIED",
        status: "not_certified",
        certification_state: "not_certified",
        terminal_decision: "NONE"
      },
      assert(normalized, label) {
        assertLegacyRawIncludes(normalized, label, "status", "not_certified");
        assertLegacyRawIncludes(normalized, label, "certification_state", "not_certified");
        assertNormalizedFieldNotIn(normalized, label, "terminal_decision", [
          "approved",
          "approved_with_followup",
          "changes_required",
          "rejected"
        ]);
        assertNormalizedFieldNotIn(normalized, label, "human_decision", ["rejected"]);
      }
    },
    {
      label: "Legacy mapping fixture docs approved is not human approval",
      record: {
        run_id: "VALIDATOR-FIXTURE-DOCS-APPROVED",
        status: "docs approved",
        docs_update_status: "DOCS_APPROVED",
        terminal_decision: "NONE",
        source_refs: ["docs/project-console/JAME_RUN_PROTOCOL_LITE.md"]
      },
      assert(normalized, label) {
        assertLegacyRawIncludes(normalized, label, "status", "docs approved");
        assertLegacyRawIncludes(normalized, label, "docs_update_status", "DOCS_APPROVED");
        if (normalized.docs_refs.length === 0) {
          fail(`${label} normalized docs_refs must capture explicit docs references`);
        }
        assertNormalizedFieldNotIn(normalized, label, "human_decision", ["approved", "approved_with_followup"]);
        assertNormalizedFieldNotIn(normalized, label, "terminal_decision", ["approved", "approved_with_followup"]);
      }
    },
    {
      label: "Legacy mapping fixture Component QA is not human approval",
      record: {
        run_id: "VALIDATOR-FIXTURE-COMPONENT-QA",
        status: "Component QA",
        human_review_status: "COMPONENT_QA_APPROVED",
        terminal_decision: "NONE"
      },
      assert(normalized, label) {
        assertLegacyRawIncludes(normalized, label, "status", "Component QA");
        assertLegacyRawIncludes(normalized, label, "human_review_status", "COMPONENT_QA_APPROVED");
        assertNormalizedFieldNotIn(normalized, label, "human_decision", ["approved", "approved_with_followup"]);
        assertNormalizedFieldNotIn(normalized, label, "terminal_decision", ["approved", "approved_with_followup"]);
      }
    },
    {
      label: "Legacy mapping fixture PASS with required human gate is not approval",
      record: {
        run_id: "VALIDATOR-FIXTURE-PASS-REQUIRED",
        terminal_decision: "PASS",
        human_gate_policy: "required"
      },
      assert(normalized, label) {
        assertNormalizedFieldNotIn(normalized, label, "human_decision", ["approved", "approved_with_followup"]);
        assertNormalizedFieldNotIn(normalized, label, "terminal_decision", ["approved", "approved_with_followup"]);
      }
    },
    {
      label: "Legacy mapping fixture PASS with no human gate may approve terminally only",
      record: {
        run_id: "VALIDATOR-FIXTURE-PASS-NOT-REQUIRED",
        terminal_decision: "PASS",
        human_gate_policy: "not_required",
        human_decision: "not_required"
      },
      assert(normalized, label) {
        if (normalized.terminal_decision !== "approved") {
          fail(`${label} normalized terminal_decision may be approved when the human gate is not required`);
        }
        if (normalized.human_decision !== "not_required") {
          fail(`${label} normalized human_decision must remain not_required`);
        }
      }
    },
    {
      label: "Legacy mapping fixture HUMAN_DECISION_REQUIRED stays pending",
      record: {
        run_id: "VALIDATOR-FIXTURE-HUMAN-DECISION-REQUIRED",
        terminal_decision: "HUMAN_DECISION_REQUIRED"
      },
      assert(normalized, label) {
        if (normalized.run_status !== "human_review_required") {
          fail(`${label} normalized run_status must be human_review_required`);
        }
        if (normalized.human_decision !== "pending") {
          fail(`${label} normalized human_decision must be pending`);
        }
        assertNormalizedFieldNotIn(normalized, label, "terminal_decision", ["approved", "approved_with_followup"]);
      }
    },
    {
      label: "Legacy mapping fixture UNKNOWN_LEGACY_STATE stays ambiguous",
      record: {
        run_id: "VALIDATOR-FIXTURE-UNKNOWN-LEGACY-STATE",
        terminal_decision: "UNKNOWN_LEGACY_STATE"
      },
      assert(normalized, label) {
        if (normalized.human_decision !== "insufficient_evidence") {
          fail(`${label} normalized human_decision must be insufficient_evidence`);
        }
        assertNormalizedFieldNotIn(normalized, label, "terminal_decision", ["approved", "approved_with_followup"]);
      }
    },
    {
      label: "Legacy mapping fixture RESOURCE_BLOCKED is blocked, not rejected",
      record: {
        run_id: "VALIDATOR-FIXTURE-RESOURCE-BLOCKED",
        terminal_decision: "RESOURCE_BLOCKED"
      },
      assert(normalized, label) {
        if (normalized.run_status !== "blocked" || normalized.terminal_decision !== "blocked") {
          fail(`${label} normalized state must map RESOURCE_BLOCKED to blocked`);
        }
        assertNormalizedFieldNotIn(normalized, label, "terminal_decision", ["changes_required", "rejected"]);
        assertNormalizedFieldNotIn(normalized, label, "human_decision", ["blocked", "rejected"]);
      }
    },
    {
      label: "Legacy mapping fixture deferred is not rejection",
      record: {
        run_id: "VALIDATOR-FIXTURE-DEFERRED",
        status: "deferred",
        classification: "deferred",
        terminal_decision: "NONE"
      },
      assert(normalized, label) {
        if (normalized.roadmap_status !== "deferred") {
          fail(`${label} normalized roadmap_status must preserve deferred intent`);
        }
        assertNormalizedFieldNotIn(normalized, label, "terminal_decision", ["changes_required", "rejected"]);
        assertNormalizedFieldNotIn(normalized, label, "human_decision", ["rejected"]);
      }
    },
    {
      label: "Legacy mapping fixture Codex review is not human approval",
      record: {
        run_id: "VALIDATOR-FIXTURE-CODEX-REVIEW",
        status: "Codex review approved",
        terminal_decision: "NONE",
        source_refs: ["operator_reported_codex_review_approved"]
      },
      assert(normalized, label) {
        assertLegacyRawIncludes(normalized, label, "status", "Codex review approved");
        assertNormalizedFieldNotIn(normalized, label, "human_decision", ["approved", "approved_with_followup"]);
        assertNormalizedFieldNotIn(normalized, label, "terminal_decision", ["approved", "approved_with_followup"]);
      }
    },
    {
      label: "Legacy mapping fixture Git commit is not human approval",
      record: {
        run_id: "VALIDATOR-FIXTURE-GIT-COMMIT",
        terminal_decision: "NONE",
        source_refs: ["git log --oneline -1: 1234567 fix(project-console): sample"]
      },
      assert(normalized, label) {
        if (normalized.commit_refs.length === 0) {
          fail(`${label} normalized commit_refs must capture explicit commit references`);
        }
        assertNormalizedFieldNotIn(normalized, label, "human_decision", ["approved", "approved_with_followup"]);
        assertNormalizedFieldNotIn(normalized, label, "terminal_decision", ["approved", "approved_with_followup"]);
      }
    },
    {
      label: "Legacy mapping fixture display_status remains derived only",
      record: {
        run_id: "VALIDATOR-FIXTURE-DISPLAY-STATUS",
        display_status: "approved",
        terminal_decision: "NONE",
        human_gate_policy: "required"
      },
      assert(normalized, label) {
        if (normalized.display_status !== "approved") {
          fail(`${label} normalized display_status must preserve the placeholder display value`);
        }
        assertNormalizedFieldNotIn(normalized, label, "human_decision", ["approved", "approved_with_followup"]);
        assertNormalizedFieldNotIn(normalized, label, "terminal_decision", ["approved", "approved_with_followup"]);

        const withoutDisplayStatus = normalizeRunState({ terminal_decision: "NONE" });
        if (!("display_status" in withoutDisplayStatus) || withoutDisplayStatus.display_status !== null) {
          fail(`${label} normalized display_status must be optional and default to null`);
        }
      }
    }
  ];

  for (const fixture of fixtures) {
    const normalized = assertNormalizedRunState(fixture.record, fixture.label, fixture.context || {});
    fixture.assert(normalized, fixture.label);
  }
}

assertLegacyMappingBoundaryFixtures();

if (!project) {
  fail(".aiw/project.json is required");
} else {
  if (project.project_id !== "jame_system_dual") {
    fail(".aiw/project.json project_id must be jame_system_dual");
  }
  assertFalse(project.aiw_managed, ".aiw/project.json aiw_managed");
  if (project.mode !== "external_manual_readonly") {
    fail(".aiw/project.json must keep mode external_manual_readonly");
  }
}

if (projectStatus) {
  assertFalse(projectStatus.aiw_managed, ".aiw/state/project_status.json aiw_managed");
  assertNoForbiddenTrueFlags(projectStatus.certification_summary || {}, "project_status.certification_summary");
  assertNoForbiddenTrueFlags(projectStatus.no_claims || {}, "project_status.no_claims");
  if (projectStatus.mode !== "external_manual_readonly") {
    fail(".aiw/state/project_status.json must keep mode external_manual_readonly");
  }
  if (projectStatus.queue_model !== "complete_pending_project_run_queue") {
    fail(".aiw/state/project_status.json queue_model must be complete_pending_project_run_queue");
  }
  if (projectStatus.roadmap_rebase_field_model_lite) {
    assertRoadmapRebaseFieldModelDeclaration(
      projectStatus.roadmap_rebase_field_model_lite,
      ".aiw/state/project_status.json roadmap_rebase_field_model_lite"
    );
  }
}

if (snapshot?.roadmap_rebase_field_model_lite) {
  assertRoadmapRebaseFieldModelDeclaration(
    snapshot.roadmap_rebase_field_model_lite,
    ".aiw/views/project_console.snapshot.json roadmap_rebase_field_model_lite"
  );
}

const objectiveIds = assertUnique(objectives, "objective_id", "objective");
const phaseIds = assertUnique(phases, "phase_id", "phase");
const runIds = assertUnique(runs, "run_id", "run");
const runsById = new Map(runs.map((run) => [run.run_id, run]));

for (const phase of phases) {
  if (!objectiveIds.has(phase.objective_id)) {
    fail(`Phase ${phase.phase_id} references missing objective ${phase.objective_id}`);
  }
}

for (const run of runs) {
  if (!objectiveIds.has(run.objective_id)) {
    fail(`Run ${run.run_id} references missing objective ${run.objective_id}`);
  }
  if (!phaseIds.has(run.phase_id)) {
    fail(`Run ${run.run_id} references missing phase ${run.phase_id}`);
  }
  if (run.run_kind && !allowedRunKinds.has(run.run_kind)) {
    fail(`Run ${run.run_id} has unsupported run_kind ${run.run_kind}`);
  }
  if (run.physical_lifecycle && !allowedPhysicalLifecycles.has(run.physical_lifecycle)) {
    fail(`Run ${run.run_id} has unsupported physical_lifecycle ${run.physical_lifecycle}`);
  }
  if (run.operational_state && !allowedOperationalStates.has(run.operational_state)) {
    fail(`Run ${run.run_id} has unsupported operational_state ${run.operational_state}`);
  }
  assertWaitReasonConsistency(run, `Run ${run.run_id}`);
  if (run.terminal_decision && !allowedTerminalDecisions.has(run.terminal_decision)) {
    fail(`Run ${run.run_id} has unsupported terminal_decision ${run.terminal_decision}`);
  }
  if (run.stage && !allowedStages.has(run.stage)) {
    fail(`Run ${run.run_id} has unsupported stage ${run.stage}`);
  }
  if (run.lifecycle_stage && !allowedStages.has(run.lifecycle_stage)) {
    fail(`Run ${run.run_id} has unsupported lifecycle_stage ${run.lifecycle_stage}`);
  }
  if (run.followup_linkage && !allowedFollowupLinkage.has(run.followup_linkage)) {
    fail(`Run ${run.run_id} has unsupported followup_linkage ${run.followup_linkage}`);
  }
  if (run.domain && !allowedDomains.has(run.domain)) {
    fail(`Run ${run.run_id} has unsupported domain ${run.domain}`);
  }
  if (run.certification_state && !allowedCertificationStates.has(run.certification_state)) {
    fail(`Run ${run.run_id} has unsupported certification_state ${run.certification_state}`);
  }
  if (run.certification_state === "certified") {
    fail(`Run ${run.run_id} must not claim certification_state certified`);
  }
  assertCertificationGateNotPromoted(run, `Run ${run.run_id}`);
  if (run.provider && !allowedProviders.has(run.provider)) {
    fail(`Run ${run.run_id} has unsupported provider ${run.provider}`);
  }
  assertNormalizedRunState(run, `Run ${run.run_id}`);
  assertRoadmapRebaseFieldModelRecord(run, `Run ${run.run_id}`);
  if (Array.isArray(run.stage_checklist)) {
    for (const [index, stage] of run.stage_checklist.entries()) {
      if (!allowedStages.has(stage.stage)) {
        fail(`Run ${run.run_id} stage_checklist[${index}] has unsupported stage ${stage.stage}`);
      }
      if (stage.operational_state && !allowedOperationalStates.has(stage.operational_state)) {
        fail(`Run ${run.run_id} stage_checklist[${index}] has unsupported operational_state ${stage.operational_state}`);
      }
      assertWaitReasonConsistency(stage, `Run ${run.run_id} stage_checklist[${index}]`);
      if (stage.provider && !allowedProviders.has(stage.provider)) {
        fail(`Run ${run.run_id} stage_checklist[${index}] has unsupported provider ${stage.provider}`);
      }
    }
  }
  if (run.run_kind === "lifecycle_stage") {
    if (!run.parent_run_id) {
      fail(`Lifecycle stage run ${run.run_id} must include parent_run_id`);
    } else if (!runIds.has(run.parent_run_id)) {
      fail(`Lifecycle stage run ${run.run_id} references missing parent_run_id ${run.parent_run_id}`);
    }
    if (!run.lifecycle_stage) {
      fail(`Lifecycle stage run ${run.run_id} must include lifecycle_stage`);
    }
    if (run.operator_stage_order == null) {
      fail(`Lifecycle stage run ${run.run_id} must include operator_stage_order`);
    }
    if (!run.operator_stage_status) {
      fail(`Lifecycle stage run ${run.run_id} must include operator_stage_status`);
    }
  }
}

if (objectives.length < 10) {
  fail("Roadmap must include at least 10 objectives for full-state reconciliation depth");
}

if (phases.length < 20) {
  fail("Roadmap must include at least 20 phases for full-state reconciliation depth");
}

if (runs.length < 60) {
  fail("Roadmap must include at least 60 runs for full-state reconciliation depth");
}

if (queue?.queue) {
  if (queue.queue_model !== "complete_pending_project_run_queue") {
    fail(".aiw/roadmap/queue.json queue_model must be complete_pending_project_run_queue");
  }
  assertRoadmapRebaseFieldModelDeclaration(
    queue.roadmap_rebase_field_model_lite,
    ".aiw/roadmap/queue.json roadmap_rebase_field_model_lite"
  );
  if (queue.queue.length < 50) {
    fail(".aiw/roadmap/queue.json must contain the complete pending backlog, expected at least 50 items");
  }
  const allowedClassifications = new Set([
    "current",
    "planned",
    "queued",
    "blocked",
    "deferred",
    "future",
    "map_only",
    "review_required",
    "own_ticket_required",
    "not_started"
  ]);
  const primaryOperatorQueue = [];
  const lifecycleQueueItems = [];
  for (const item of queue.queue) {
    if (!runIds.has(item.run_id)) {
      fail(`Queue references missing run ${item.run_id}`);
      continue;
    }
    if (!allowedClassifications.has(item.classification)) {
      fail(`Queue item ${item.run_id} has unsupported classification ${item.classification}`);
    }
    if (typeof item.executable !== "boolean") {
      fail(`Queue item ${item.run_id} must carry executable boolean`);
    }
    const run = runsById.get(item.run_id);
    assertRoadmapRebaseFieldModelRecord(item, `Queue item ${item.run_id}`);
    assertRoadmapRebaseFieldModelRecord(run, `Run ${item.run_id}`);
    const displayKind = item.display_kind || item.run_kind || run?.run_kind || (item.classification === "map_only" ? "map_only" : "work_item");
    if (!allowedRunKinds.has(displayKind)) {
      fail(`Queue item ${item.run_id} has unsupported display/run kind ${displayKind}`);
    }
    assertNormalizedRunState(run || item, `Queue item ${item.run_id}`, { queueItem: item });
    for (const [field, allowedSet] of [
      ["physical_lifecycle", allowedPhysicalLifecycles],
      ["operational_state", allowedOperationalStates],
      ["terminal_decision", allowedTerminalDecisions],
      ["run_kind", allowedRunKinds],
      ["display_kind", allowedRunKinds],
      ["stage", allowedStages],
      ["lifecycle_stage", allowedStages],
      ["followup_linkage", allowedFollowupLinkage],
      ["domain", allowedDomains],
      ["certification_state", allowedCertificationStates],
      ["provider", allowedProviders]
    ]) {
      if (item[field] && !allowedSet.has(item[field])) {
        fail(`Queue item ${item.run_id} has unsupported ${field} ${item[field]}`);
      }
    }
    assertWaitReasonConsistency(item, `Queue item ${item.run_id}`);
    if (item.certification_state === "certified") {
      fail(`Queue item ${item.run_id} must not claim certification_state certified`);
    }
    assertCertificationGateNotPromoted(item, `Queue item ${item.run_id}`);
    if (displayKind === "lifecycle_stage" || run?.run_kind === "lifecycle_stage") {
      lifecycleQueueItems.push(item);
      if (!item.parent_run_id && !run?.parent_run_id) {
        fail(`Lifecycle queue item ${item.run_id} must include parent_run_id`);
      }
      if (item.visible_in_operator_queue !== false || item.operator_primary_count !== false) {
        fail(`Lifecycle queue item ${item.run_id} must not be counted as a primary operator queue work item`);
      }
    } else if (item.visible_in_operator_queue !== false && item.operator_primary_count !== false) {
      primaryOperatorQueue.push(item);
    }
    const runStatus = run?.lifecycle_status || "";
    if (includesAny(runStatus, ["COMPLETED", "HISTORY", "DONE_WITH"])) {
      fail(`Queue item ${item.run_id} appears completed/history but Active Queue must be pending-only`);
    }
    if (["blocked", "deferred", "future", "map_only", "own_ticket_required"].includes(item.classification)) {
      if (item.executable) {
        fail(`Queue item ${item.run_id} is ${item.classification} but marked executable`);
      }
      if (includesAny(runStatus, ["COMPLETED", "DONE"])) {
        fail(`Queue item ${item.run_id} is ${item.classification} but run status looks completed`);
      }
    }
    const gateText = `${item.run_id} ${run?.title || ""} ${runStatus} ${run?.certification_impact || ""}`;
    const isCertificationOrAssetGate = includesAny(gateText, [
      "WEB CERTIFICATION GATE",
      "SLIDE CERTIFICATION",
      "ASSET DEDUP IMPLEMENTATION",
      "MATHLIVE GLOBAL",
      "GENERATOR-SAFE GLOBAL",
      "PROJECT CONSOLE CERTIFICATION"
    ]);
    if (isCertificationOrAssetGate && item.executable) {
      fail(`Gate-like queue item ${item.run_id} must not be executable`);
    }
    if (isCertificationOrAssetGate && !["blocked", "future", "map_only", "deferred"].includes(item.classification)) {
      fail(`Gate-like queue item ${item.run_id} must be blocked/future/map_only/deferred`);
    }
  }
  const projectConsoleParent = runsById.get(projectConsoleParentRunId);
  if (!projectConsoleParent) {
    fail("Project Console parent work item is missing");
  } else if (projectConsoleParent.run_kind !== "work_item") {
    fail("Project Console parent run must be a work_item");
  }
  const projectConsoleLifecycleRuns = [...projectConsoleLifecycleStageIds].map((id) => runsById.get(id)).filter(Boolean);
  if (projectConsoleLifecycleRuns.length !== projectConsoleLifecycleStageIds.size) {
    fail("Project Console lifecycle grouping is missing one or more expected stage runs");
  }
  for (const stageRun of projectConsoleLifecycleRuns) {
    if (stageRun.parent_run_id !== projectConsoleParentRunId) {
      fail(`Project Console lifecycle stage ${stageRun.run_id} must point to parent ${projectConsoleParentRunId}`);
    }
    if (stageRun.run_kind !== "lifecycle_stage") {
      fail(`Project Console stage ${stageRun.run_id} must be run_kind lifecycle_stage`);
    }
  }
  const expectedProjectConsoleStages = new Map([
    ["RUN-JAME-PROJECT-CONSOLE-FULL-ROADMAP-QUEUE-REPAIR-CODEX-REVIEW-001", "ai_review"],
    ["RUN-JAME-PROJECT-CONSOLE-FULL-ROADMAP-QUEUE-HUMAN-QA-001", "human_qa"],
    ["RUN-JAME-PROJECT-CONSOLE-DASHBOARD-VISUAL-POLISH-IF-NEEDED-001", "repair"],
    ["RUN-JAME-PROJECT-CONSOLE-CLOSEOUT-STATE-STABILIZATION-001", "closeout"]
  ]);
  for (const [stageRunId, expectedStage] of expectedProjectConsoleStages.entries()) {
    const stageRun = runsById.get(stageRunId);
    if (stageRun && stageRun.stage !== expectedStage) {
      fail(`Project Console lifecycle stage ${stageRunId} must use stage ${expectedStage}`);
    }
  }
  if (!Array.isArray(projectConsoleParent?.stage_checklist) || projectConsoleParent.stage_checklist.length < 5) {
    fail("Project Console parent work item must expose stage_checklist with lifecycle attempts");
  }
  const qaStage = projectConsoleParent?.stage_checklist?.find((stage) => stage.stage === "human_qa");
  if (!qaStage || qaStage.status !== "changes_requested" || qaStage.attempts < 2) {
    fail("Project Console parent human_qa stage must represent repeated QA as attempts with changes_requested");
  }
  for (const stageId of projectConsoleLifecycleStageIds) {
    if (primaryOperatorQueue.some((item) => item.run_id === stageId)) {
      fail(`Project Console lifecycle stage ${stageId} must not appear in primary operator queue`);
    }
  }
  if (!primaryOperatorQueue.some((item) => item.run_id === projectConsoleParentRunId)) {
    fail("Primary operator queue must include the Project Console parent work item");
  }
  if (lifecycleQueueItems.length < projectConsoleLifecycleStageIds.size) {
    fail("Queue must retain lifecycle stage records for auditability while grouping them for operator display");
  }
  if (queue.operator_queue_counts) {
    if (queue.operator_queue_counts.technical_queue_items !== queue.queue.length) {
      fail(".aiw/roadmap/queue.json operator_queue_counts.technical_queue_items does not match queue length");
    }
    if (queue.operator_queue_counts.primary_work_items !== primaryOperatorQueue.length) {
      fail(".aiw/roadmap/queue.json operator_queue_counts.primary_work_items does not match computed primary queue");
    }
    if (queue.operator_queue_counts.lifecycle_stages_grouped !== lifecycleQueueItems.length) {
      fail(".aiw/roadmap/queue.json operator_queue_counts.lifecycle_stages_grouped does not match computed lifecycle stages");
    }
  }
  if (projectStatus?.operator_queue_summary) {
    if (projectStatus.operator_queue_summary.primary_work_items !== primaryOperatorQueue.length) {
      fail(".aiw/state/project_status.json operator_queue_summary.primary_work_items does not match computed primary queue");
    }
    if (projectStatus.operator_queue_summary.lifecycle_stages_grouped !== lifecycleQueueItems.length) {
      fail(".aiw/state/project_status.json operator_queue_summary.lifecycle_stages_grouped does not match computed lifecycle stages");
    }
  }
} else {
  fail(".aiw/roadmap/queue.json must include queue array");
}

function roadmapRebaseArray(record, field) {
  return Array.isArray(record?.[field]) ? record[field] : [];
}

function roadmapRebaseText(item, run) {
  return [
    item?.run_id,
    item?.classification,
    item?.status,
    item?.reason,
    item?.run_kind,
    item?.display_kind,
    run?.title,
    run?.run_kind
  ].filter(Boolean).join(" ").toLowerCase();
}

function firstIds(items, limit = 8) {
  return items.slice(0, limit).join(", ");
}

function countSummary(counts) {
  return Object.entries(counts)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}:${value}`)
    .join(", ") || "none";
}

const roadmapRebaseReadiness = {
  records_with_field_model_support: runs.length + (queue?.queue?.length || 0),
  populated_queue_records: 0,
  by_display_group: {},
  by_execution_readiness: {},
  by_default_visibility: {},
  by_claim_boundary: {},
  followup_linkage_gaps: [],
  blocked_by_gaps: [],
  certification_language_cleanup_candidates: [],
  certification_claim_boundary_gaps: [],
  map_only_archive_candidates: [],
  map_only_archive_gaps: [],
  ready_next_candidates: []
};

if (queue?.queue) {
  for (const item of queue.queue) {
    const run = runsById.get(item.run_id) || {};
    const textBlob = roadmapRebaseText(item, run);
    const derivedFrom = [
      ...roadmapRebaseArray(item, "derived_from"),
      ...roadmapRebaseArray(run, "derived_from")
    ];
    const blockedBy = [
      ...roadmapRebaseArray(item, "blocked_by"),
      ...roadmapRebaseArray(run, "blocked_by")
    ];
    const isFollowupLike =
      item.run_kind === "followup" ||
      item.display_kind === "followup" ||
      run.run_kind === "followup" ||
      item.followup_linkage === "child" ||
      run.followup_linkage === "child";
    const isBlockedLike =
      item.classification === "blocked" ||
      item.operational_state === "blocked" ||
      item.physical_lifecycle === "blocked" ||
      run.operational_state === "blocked" ||
      run.physical_lifecycle === "blocked";
    const requiresBlockedBy =
      item.display_group === "blocked_by_dependency" ||
      item.execution_readiness === "blocked_dependency" ||
      (!item.display_group && isBlockedLike);
    const isCertificationLanguageCandidate =
      item.run_kind === "certification_gate" ||
      item.display_kind === "certification_gate" ||
      run.run_kind === "certification_gate" ||
      textBlob.includes("certifi");
    const isMapOnlyArchiveCandidate =
      item.classification === "map_only" ||
      item.run_kind === "map_only" ||
      run.run_kind === "map_only";

    if (item.display_group) {
      roadmapRebaseReadiness.populated_queue_records += 1;
      roadmapRebaseReadiness.by_display_group[item.display_group] =
        (roadmapRebaseReadiness.by_display_group[item.display_group] || 0) + 1;
    }
    if (item.execution_readiness) {
      roadmapRebaseReadiness.by_execution_readiness[item.execution_readiness] =
        (roadmapRebaseReadiness.by_execution_readiness[item.execution_readiness] || 0) + 1;
    }
    if (item.default_visibility) {
      roadmapRebaseReadiness.by_default_visibility[item.default_visibility] =
        (roadmapRebaseReadiness.by_default_visibility[item.default_visibility] || 0) + 1;
    }
    if (item.claim_boundary) {
      roadmapRebaseReadiness.by_claim_boundary[item.claim_boundary] =
        (roadmapRebaseReadiness.by_claim_boundary[item.claim_boundary] || 0) + 1;
    }

    if (isFollowupLike && !item.followup_of && !run.followup_of && derivedFrom.length === 0) {
      roadmapRebaseReadiness.followup_linkage_gaps.push(item.run_id);
    }
    if (requiresBlockedBy && blockedBy.length === 0) {
      roadmapRebaseReadiness.blocked_by_gaps.push(item.run_id);
    }
    if (isCertificationLanguageCandidate) {
      roadmapRebaseReadiness.certification_language_cleanup_candidates.push(item.run_id);
      if (!item.claim_boundary || item.claim_boundary === "unknown") {
        roadmapRebaseReadiness.certification_claim_boundary_gaps.push(item.run_id);
      }
    }
    if (isMapOnlyArchiveCandidate) {
      roadmapRebaseReadiness.map_only_archive_candidates.push(item.run_id);
      if (item.display_group !== "archive_map_only" || item.default_visibility !== "archive") {
        roadmapRebaseReadiness.map_only_archive_gaps.push(item.run_id);
      }
    }
    if (
      item.display_group === "ready_next" ||
      item.classification === "queued" ||
      (item.executable === true && item.classification !== "current")
    ) {
      roadmapRebaseReadiness.ready_next_candidates.push(item.run_id);
    }
  }
}

if (roadmapRebaseReadiness.followup_linkage_gaps.length) {
  warn(`Roadmap rebase follow-up linkage gaps: ${roadmapRebaseReadiness.followup_linkage_gaps.length}`);
}
if (roadmapRebaseReadiness.blocked_by_gaps.length) {
  warn(`Roadmap rebase blocked_by gaps: ${roadmapRebaseReadiness.blocked_by_gaps.length}`);
}
if (roadmapRebaseReadiness.certification_claim_boundary_gaps.length) {
  warn(`Roadmap rebase certification language candidates missing claim_boundary: ${roadmapRebaseReadiness.certification_claim_boundary_gaps.length}`);
}
if (roadmapRebaseReadiness.map_only_archive_gaps.length) {
  warn(`Roadmap rebase map-only/archive candidates not classified as archive: ${roadmapRebaseReadiness.map_only_archive_gaps.length}`);
}

if (docsIndex?.docs) {
  for (const doc of docsIndex.docs) {
    if (!doc.path || !fs.existsSync(path.join(root, doc.path))) {
      fail(`Docs index path missing: ${doc.path}`);
    }
    if (!doc.freshness_status) {
      fail(`Docs index entry missing freshness_status: ${doc.path}`);
    }
    if (!doc.source_role) {
      fail(`Docs index entry missing source_role: ${doc.path}`);
    }
  }
} else {
  fail(".aiw/docs/docs_index.json must include docs array");
}

// Curated Docs navigation visibility metadata (RUN-JAME-PROJECT-CONSOLE-DOCS-CURATED-DEFAULT-VIEW-001).
// The Project Console Docs tab renders a curated Primary KB by default while docs_index stays the
// broad registry. Either the registry carries additive nav_tier metadata OR the UI provides a
// fallback classification (deriveDocNavTier). The curated default must be a real subset, not
// "every registered document" with no distinction. This checks the navigation contract only; it
// asserts no Docs acceptance, curation, reconciliation, certification, or Human QA result, and no
// entry is removed or reduced from the registry by tiering.
if (docsIndex?.docs) {
  const allowedNavTiers = new Set(["primary", "secondary", "advanced", "evidence", "history", "proposal"]);
  let navTierEntries = 0;
  let defaultVisibleEntries = 0;
  for (const doc of docsIndex.docs) {
    if (doc.nav_tier != null) {
      navTierEntries += 1;
      if (!allowedNavTiers.has(doc.nav_tier)) {
        fail(`Docs index entry has unsupported nav_tier ${doc.nav_tier}: ${doc.path}`);
      }
    }
    if (doc.default_visible != null && typeof doc.default_visible !== "boolean") {
      fail(`Docs index entry default_visible must be a boolean when present: ${doc.path}`);
    }
    if (doc.default_visible === true || doc.nav_tier === "primary") {
      defaultVisibleEntries += 1;
    }
  }
  const hasDocsUiTierFallback = projectConsoleJs.includes("function deriveDocNavTier(");
  if (navTierEntries === 0 && !hasDocsUiTierFallback) {
    fail("docs_index must carry navigation nav_tier metadata, or the Docs UI must provide a fallback classification (deriveDocNavTier)");
  }
  if (defaultVisibleEntries === 0) {
    fail("The curated Docs view must mark at least one default-visible / primary document");
  }
  if (defaultVisibleEntries >= docsIndex.docs.length) {
    fail("The curated Docs default view must be a subset of the registry, not every registered document");
  }
}

if (componentStatus) {
  assertFalse(componentStatus.source_of_truth, ".aiw/state/component_status.json source_of_truth");
  if (componentStatus.projection_only !== true) {
    fail(".aiw/state/component_status.json must remain projection_only");
  }
  assertNoForbiddenTrueFlags(componentStatus.global_no_claims || {}, "component_status.global_no_claims");
  const requiredComponents = [
    "header",
    "list",
    "iconList",
    "card",
    "video",
    "narrative",
    "callout",
    "details",
    "rule",
    "table",
    "conceptGrid",
    "split",
    "arithmetic",
    "hierarchy",
    "timeline",
    "visual"
  ];
  const componentIds = new Set((componentStatus.components || []).map((component) => component.component_id));
  for (const componentId of requiredComponents) {
    if (!componentIds.has(componentId)) {
      fail(`component_status missing component ${componentId}`);
    }
  }
  for (const component of componentStatus.components || []) {
    assertRequiredKeys(component, [
      "component_id",
      "area",
      "status_summary",
      "human_qa_status",
      "repair_status",
      "docs_status",
      "certification_status",
      "web_global_certified",
      "generator_safe",
      "blocked_by",
      "follow_up_required",
      "source_refs",
      "notes"
    ], `component_status ${component.component_id}`);
    assertFalse(component.web_global_certified, `component_status ${component.component_id} web_global_certified`);
    assertFalse(component.generator_safe, `component_status ${component.component_id} generator_safe`);
    if (component.component_id === "rule" && component.certification_status !== "NOT_CERTIFIED") {
      fail("component_status rule certification_status must remain NOT_CERTIFIED");
    }
    if (component.certification_status === "CERTIFIED") {
      fail(`component_status ${component.component_id} must not use bare CERTIFIED`);
    }
  }
}

if (gitProvenance.length === 0) {
  fail(".aiw/ledgers/git_provenance.jsonl must include provenance episodes");
}

for (const episode of gitProvenance) {
  assertRequiredKeys(episode, [
    "episode_id",
    "title",
    "status",
    "commit_refs",
    "summary",
    "project_console_relevance",
    "not_certification_evidence"
  ], `git_provenance ${episode.episode_id || "UNKNOWN"}`);
  if (!Array.isArray(episode.commit_refs) || episode.commit_refs.length === 0) {
    fail(`git_provenance ${episode.episode_id} must include commit_refs`);
  }
  if (!Array.isArray(episode.not_certification_evidence) || episode.not_certification_evidence.length === 0) {
    fail(`git_provenance ${episode.episode_id} must include not_certification_evidence`);
  }
}

if (snapshot) {
  const requiredSnapshotSections = [
    "operational_status",
    "current_status_summary",
    "roadmap_migration_summary",
    "component_status_summary",
    "docs_freshness_summary",
    "git_provenance_summary",
    "blockers",
    "followups",
    "no_claims_summary"
  ];
  assertRequiredKeys(snapshot, requiredSnapshotSections, ".aiw/views/project_console.snapshot.json");
  assertFalse(snapshot.project_summary?.aiw_managed, "snapshot.project_summary aiw_managed");
  assertFalse(snapshot.operational_status?.aiw_managed, "snapshot.operational_status aiw_managed");
  assertNoForbiddenTrueFlags(snapshot.no_claims_summary || {}, "snapshot.no_claims_summary");
  assertFalse(snapshot.no_claims_summary?.web_certified, "snapshot.no_claims_summary web_certified");
  assertFalse(snapshot.no_claims_summary?.slide_certified, "snapshot.no_claims_summary slide_certified");
  assertFalse(snapshot.no_claims_summary?.rule_certified, "snapshot.no_claims_summary rule_certified");
}

if (noClaims?.claims) {
  for (const claim of noClaims.claims) {
    if (claim.status !== "DISALLOWED") {
      fail(`No-claim is not DISALLOWED: ${claim.claim}`);
    }
    const claimText = JSON.stringify(claim).toLowerCase();
    if (claimText.includes('"status":"certified"') || claimText.includes('"status":"allowed"')) {
      fail(`No-claim appears accidentally promoted: ${claim.claim}`);
    }
  }
} else {
  fail(".aiw/guardrails/no_claims.json must include claims array");
}

assertRoadmapV2Source(roadmapV2);

// Roadmap v3 prototype source (RUN-JAME-PROJECT-CONSOLE-ROADMAP-V3-PROTOTYPE-001).
// Bounded validation of .aiw/roadmap/roadmap.json against the frozen Roadmap v3
// prototype contract v2. Self-contained vocabularies: the v3 model does not inherit
// legacy run-state or queue taxonomies. Additive only; no existing check changes.
const ROADMAP_V3_LABEL = ".aiw/roadmap/roadmap.json";
const ROADMAP_V3_ROOT_FIELDS = ["schema_version", "roadmap_id", "title", "objectives"];
const ROADMAP_V3_OBJECTIVE_FIELDS = ["objective_id", "title", "summary", "full_description", "phases"];
const ROADMAP_V3_PHASE_FIELDS = ["phase_id", "title", "summary", "full_description", "runs"];
const ROADMAP_V3_RUN_REQUIRED_FIELDS = ["run_id", "queue_order", "title", "summary", "full_description", "status", "depends_on"];
const ROADMAP_V3_RUN_OPTIONAL_FIELDS = ["closeout_result", "progress"];
const ROADMAP_V3_STATUSES = new Set(["planned", "active", "completed", "blocked"]);
const ROADMAP_V3_STAGES = new Set(["execution", "ai_review", "human_qa", "correction", "closeout"]);
const ROADMAP_V3_STAGE_STATES = new Set(["waiting", "running", "done"]);
const ROADMAP_V3_QUEUE_GROUP_KEYS = ["needs_human_decision", "now", "ready_next", "later", "history"];
const ROADMAP_V3_PROGRESS_ENTRY_REQUIRED_FIELDS = ["cycle", "stage", "attempt", "state"];
const ROADMAP_V3_PROGRESS_ENTRY_OPTIONAL_FIELDS = ["result", "note"];
const ROADMAP_V3_PROGRESS_RESULTS = new Set([
  "implemented",
  "approved",
  "passed",
  "changes_requested",
  "completed",
  "blocked",
  "cancelled",
  "failed",
  "not_applicable"
]);

// Single source of truth: current stage/state are derived from the ordered
// progress entries, never persisted. One running entry is current; otherwise
// the first waiting entry is current; all-done means no current stage.
function roadmapV3DeriveCurrent(run) {
  const progress = Array.isArray(run.progress) ? run.progress : null;
  if (!progress || !progress.length) return null;
  const running = progress.filter((entry) => entry && entry.state === "running");
  if (running.length === 1) return running[0];
  return progress.find((entry) => entry && entry.state === "waiting") || null;
}

function roadmapV3QueueGroupKey(run, runsById) {
  if (run.status === "active") {
    const current = roadmapV3DeriveCurrent(run);
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

// Progress policy: planned runs carry no progress; active runs carry non-empty
// progress with a waiting/running frontier; terminal runs may carry factual
// all-done history. Entries follow the strict state sequence
// done* -> at most one running -> waiting*, cycles are nondecreasing, and
// attempts start at 1 and stay contiguous per stage in array order.
function assertRoadmapV3RunProgress(run, runLabel) {
  const hasProgress = "progress" in run;
  if (run.status === "planned" && hasProgress) {
    fail(`${runLabel} is planned and must not carry progress`);
    return;
  }
  if (run.status === "active" && !hasProgress) {
    fail(`${runLabel} is active and must carry non-empty progress`);
    return;
  }
  if (!hasProgress) return;
  if (!Array.isArray(run.progress) || !run.progress.length) {
    fail(`${runLabel} progress must be a non-empty array`);
    return;
  }
  const seenTuples = new Set();
  const lastAttemptByStage = new Map();
  let runningCount = 0;
  let frontierSeen = false;
  let waitingSeen = false;
  let lastCycle = 0;
  run.progress.forEach((entry, index) => {
    const entryLabel = `${runLabel} progress[${index}]`;
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      fail(`${entryLabel} must be an object`);
      return;
    }
    for (const field of ROADMAP_V3_PROGRESS_ENTRY_REQUIRED_FIELDS) {
      if (!(field in entry)) fail(`${entryLabel} missing required field ${field}`);
    }
    for (const key of Object.keys(entry)) {
      if (!ROADMAP_V3_PROGRESS_ENTRY_REQUIRED_FIELDS.includes(key) && !ROADMAP_V3_PROGRESS_ENTRY_OPTIONAL_FIELDS.includes(key)) {
        fail(`${entryLabel} carries forbidden field ${key}`);
      }
      if (entry[key] === null) {
        fail(`${entryLabel} must omit ${key} when not applicable instead of storing null`);
      }
    }
    if (!ROADMAP_V3_STAGES.has(entry.stage)) fail(`${entryLabel} has unsupported stage ${entry.stage}`);
    if (!ROADMAP_V3_STAGE_STATES.has(entry.state)) fail(`${entryLabel} has unsupported state ${entry.state}`);
    if (!Number.isInteger(entry.cycle) || entry.cycle < 1) fail(`${entryLabel} cycle must be a positive integer`);
    if (!Number.isInteger(entry.attempt) || entry.attempt < 1) fail(`${entryLabel} attempt must be a positive integer`);
    if ("result" in entry && !ROADMAP_V3_PROGRESS_RESULTS.has(entry.result)) {
      fail(`${entryLabel} has unsupported result ${entry.result}`);
    }
    if ("result" in entry && entry.state !== "done") {
      fail(`${entryLabel} must not carry a result on a ${entry.state} entry`);
    }
    if ("note" in entry && typeof entry.note !== "string") {
      fail(`${entryLabel} note must be a string`);
    }
    if (Number.isInteger(entry.cycle) && entry.cycle >= 1) {
      if (entry.cycle < lastCycle) {
        fail(`${entryLabel} cycle ${entry.cycle} decreases; cycles must be nondecreasing in array order`);
      }
      lastCycle = Math.max(lastCycle, entry.cycle);
    }
    const tuple = `${entry.cycle}|${entry.stage}|${entry.attempt}`;
    if (seenTuples.has(tuple)) fail(`${entryLabel} duplicates cycle+stage+attempt ${tuple}`);
    seenTuples.add(tuple);
    if (entry.state === "done" && frontierSeen) {
      fail(`${entryLabel} is done after a running or waiting entry; progress must follow done entries, then at most one running, then waiting entries`);
    }
    if (entry.state === "running") {
      runningCount += 1;
      if (runningCount > 1) {
        fail(`${entryLabel} is a second running entry; at most one entry may be running`);
      }
      if (waitingSeen) {
        fail(`${entryLabel} is running after a waiting entry; progress must follow done entries, then at most one running, then waiting entries`);
      }
      frontierSeen = true;
    }
    if (entry.state === "waiting") {
      waitingSeen = true;
      frontierSeen = true;
    }
    if (ROADMAP_V3_STAGES.has(entry.stage) && Number.isInteger(entry.attempt) && entry.attempt >= 1) {
      const previousAttempt = lastAttemptByStage.get(entry.stage) || 0;
      if (entry.attempt !== previousAttempt + 1) {
        fail(`${entryLabel} ${entry.stage} attempt ${entry.attempt} must be ${previousAttempt + 1}; attempts start at 1, increase strictly, and stay contiguous per stage`);
      }
      lastAttemptByStage.set(entry.stage, Math.max(previousAttempt, entry.attempt));
    }
  });
  if (run.status === "active" && !run.progress.some((entry) => entry && (entry.state === "waiting" || entry.state === "running"))) {
    fail(`${runLabel} is active but progress has no waiting or running entry`);
  }
  if ((run.status === "completed" || run.status === "blocked") && run.progress.some((entry) => entry && entry.state !== "done")) {
    fail(`${runLabel} is terminal; every progress entry must have state done`);
  }
}

function assertRoadmapV3Source(roadmap) {
  if (!roadmap) return null;
  const label = ROADMAP_V3_LABEL;
  const rootKeys = Object.keys(roadmap);
  for (const field of ROADMAP_V3_ROOT_FIELDS) {
    if (!rootKeys.includes(field)) fail(`${label} missing required root field ${field}`);
  }
  for (const key of rootKeys) {
    if (!ROADMAP_V3_ROOT_FIELDS.includes(key)) {
      fail(`${label} carries forbidden root field ${key}; only schema_version, roadmap_id, title, objectives are allowed`);
    }
  }
  if (roadmap.schema_version !== "jame.roadmap_v3.v0.2-progress") {
    fail(`${label} schema_version must be jame.roadmap_v3.v0.2-progress`);
  }
  if (!Array.isArray(roadmap.objectives) || !roadmap.objectives.length) {
    fail(`${label} must include a non-empty objectives array`);
    return null;
  }
  const objectiveIds = new Set();
  const phaseIds = new Set();
  const runIds = new Set();
  const allRuns = [];
  for (const objective of roadmap.objectives) {
    const objectiveLabel = `${label} objective ${objective.objective_id || "UNKNOWN"}`;
    if (objectiveIds.has(objective.objective_id)) fail(`${label} duplicate objective_id ${objective.objective_id}`);
    objectiveIds.add(objective.objective_id);
    for (const field of ROADMAP_V3_OBJECTIVE_FIELDS) {
      if (!(field in objective)) fail(`${objectiveLabel} missing required field ${field}`);
    }
    for (const key of Object.keys(objective)) {
      if (!ROADMAP_V3_OBJECTIVE_FIELDS.includes(key)) {
        fail(`${objectiveLabel} carries forbidden field ${key}; Objective status and metadata must stay derived`);
      }
    }
    for (const phase of objective.phases || []) {
      const phaseLabel = `${label} phase ${phase.phase_id || "UNKNOWN"}`;
      if (phaseIds.has(phase.phase_id)) fail(`${label} duplicate phase_id ${phase.phase_id}`);
      phaseIds.add(phase.phase_id);
      for (const field of ROADMAP_V3_PHASE_FIELDS) {
        if (!(field in phase)) fail(`${phaseLabel} missing required field ${field}`);
      }
      for (const key of Object.keys(phase)) {
        if (!ROADMAP_V3_PHASE_FIELDS.includes(key)) {
          fail(`${phaseLabel} carries forbidden field ${key}; Phase status, Deliverables, and Run Families are not part of the v3 model`);
        }
      }
      for (const run of phase.runs || []) {
        const runLabel = `${label} run ${run.run_id || "UNKNOWN"}`;
        if (runIds.has(run.run_id)) fail(`${label} duplicate run_id ${run.run_id}`);
        runIds.add(run.run_id);
        allRuns.push(run);
        for (const field of ROADMAP_V3_RUN_REQUIRED_FIELDS) {
          if (!(field in run)) fail(`${runLabel} missing required field ${field}`);
        }
        for (const key of Object.keys(run)) {
          if (!ROADMAP_V3_RUN_REQUIRED_FIELDS.includes(key) && !ROADMAP_V3_RUN_OPTIONAL_FIELDS.includes(key)) {
            fail(`${runLabel} carries forbidden field ${key}`);
          }
        }
        for (const field of ROADMAP_V3_RUN_OPTIONAL_FIELDS) {
          if (field in run && run[field] === null) {
            fail(`${runLabel} must omit ${field} when not applicable instead of storing null`);
          }
        }
        if (!ROADMAP_V3_STATUSES.has(run.status)) fail(`${runLabel} has unsupported status ${run.status}`);
        assertRoadmapV3RunProgress(run, runLabel);
        if ("closeout_result" in run && run.status !== "completed" && run.status !== "blocked") {
          fail(`${runLabel} carries closeout_result but is not terminally closed`);
        }
        if (!Array.isArray(run.depends_on)) {
          fail(`${runLabel} depends_on must be an array`);
        } else {
          const seenDependencies = new Set();
          for (const dependencyId of run.depends_on) {
            if (dependencyId === run.run_id) fail(`${runLabel} must not depend on itself`);
            if (seenDependencies.has(dependencyId)) fail(`${runLabel} lists duplicate dependency ${dependencyId}`);
            seenDependencies.add(dependencyId);
          }
        }
      }
    }
  }
  const runsById = new Map(allRuns.map((run) => [run.run_id, run]));
  for (const run of allRuns) {
    for (const dependencyId of run.depends_on || []) {
      const dependency = runsById.get(dependencyId);
      if (!dependency) {
        fail(`${label} run ${run.run_id} depends on unknown run ${dependencyId}`);
      } else if (!(dependency.queue_order < run.queue_order)) {
        fail(`${label} run ${run.run_id} (queue_order ${run.queue_order}) must not depend on ${dependencyId} with equal or higher queue_order ${dependency.queue_order}`);
      }
    }
  }
  const queueOrders = allRuns.map((run) => run.queue_order);
  if (new Set(queueOrders).size !== queueOrders.length) fail(`${label} queue_order values must be unique`);
  for (const order of queueOrders) {
    if (!Number.isInteger(order) || order < 1) fail(`${label} queue_order values must be positive integers; found ${order}`);
  }
  const sortedOrders = [...queueOrders].sort((a, b) => a - b);
  if (sortedOrders.length && (sortedOrders[0] !== 1 || sortedOrders[sortedOrders.length - 1] !== sortedOrders.length)) {
    fail(`${label} queue_order values must be contiguous from 1 to ${sortedOrders.length}`);
  }
  const dependencyVisitState = new Map();
  const reportCycle = (runId) => fail(`${label} dependency cycle detected involving ${runId}`);
  const visitDependencies = (runId) => {
    dependencyVisitState.set(runId, 1);
    for (const dependencyId of runsById.get(runId)?.depends_on || []) {
      const state = dependencyVisitState.get(dependencyId);
      if (state === 1) reportCycle(dependencyId);
      else if (!state) visitDependencies(dependencyId);
    }
    dependencyVisitState.set(runId, 2);
  };
  for (const run of allRuns) {
    if (!dependencyVisitState.get(run.run_id)) visitDependencies(run.run_id);
  }
  const groupCounts = { needs_human_decision: 0, now: 0, ready_next: 0, later: 0, history: 0 };
  for (const run of allRuns) {
    const groupKey = roadmapV3QueueGroupKey(run, runsById);
    if (!ROADMAP_V3_QUEUE_GROUP_KEYS.includes(groupKey)) {
      fail(`${label} run ${run.run_id} derived into unknown queue group ${groupKey}`);
      continue;
    }
    groupCounts[groupKey] += 1;
  }
  const groupedTotal = ROADMAP_V3_QUEUE_GROUP_KEYS.reduce((sum, key) => sum + groupCounts[key], 0);
  if (groupedTotal !== allRuns.length) {
    fail(`${label} queue grouping must place every run in exactly one group (${groupedTotal} grouped vs ${allRuns.length} runs)`);
  }
  const activeDerivedStages = allRuns
    .filter((run) => run.status === "active")
    .map((run) => {
      const current = roadmapV3DeriveCurrent(run);
      return `${run.run_id}=${current ? `${current.stage}/${current.state}` : "none"}`;
    });
  return {
    objectives: objectiveIds.size,
    phases: phaseIds.size,
    runs: allRuns.length,
    groupCounts,
    activeDerivedStages
  };
}

const roadmapV3Summary = assertRoadmapV3Source(roadmapV3);

// Applied canonical Roadmap v2 (RUN-JAME-ROADMAP-V2-NORMALIZED-PROPOSAL-APPLY-001): once the
// canonical file carries the applied normalized content, its accepted invariants and the
// authorized post-apply decision state (4 open / 3 resolved) are validated permanently.
// The historical proposal artifact keeps its own acceptance-time state (5 open / 2 resolved).
const acceptedLineageTotals = { preserved: 16, renamed_same_identity: 12, merged_into: 4, dissolved_into: 8, replaced_by: 1, retired_from_strategic_model: 4 };
const roadmapV2IsAppliedNormalized = roadmapV2?.created_from?.run_id === "RUN-JAME-ROADMAP-V2-NORMALIZED-PROPOSAL-APPLY-001";
if (roadmapV2IsAppliedNormalized) {
  const appliedLabel = ".aiw/roadmap/roadmap_v2.json";
  let appliedPhaseCount = 0;
  let appliedDeliverableCount = 0;
  let appliedFamilyCount = 0;
  for (const objective of roadmapV2.objectives || []) {
    for (const phase of objective.phases || []) {
      appliedPhaseCount++;
      appliedDeliverableCount += (phase.deliverables || []).length;
      appliedFamilyCount += (phase.candidate_run_families || []).length;
    }
  }
  if ((roadmapV2.objectives || []).length !== 8) fail(`${appliedLabel} applied model must keep 8 objectives`);
  if (appliedPhaseCount !== 30) fail(`${appliedLabel} applied model must keep 30 normalized phases`);
  if (appliedDeliverableCount !== 10) fail(`${appliedLabel} applied model must keep 10 deliverables`);
  if (appliedFamilyCount !== 30) fail(`${appliedLabel} applied model must keep 30 candidate run families`);
  if ((roadmapV2.phase_lineage || []).length !== 45) fail(`${appliedLabel} applied model must keep 45 phase-lineage records`);
  const appliedLineageTotals = {};
  for (const item of roadmapV2.phase_lineage || []) {
    appliedLineageTotals[item.disposition] = (appliedLineageTotals[item.disposition] || 0) + 1;
  }
  if (JSON.stringify(Object.entries(appliedLineageTotals).sort()) !== JSON.stringify(Object.entries(acceptedLineageTotals).sort())) {
    fail(`${appliedLabel} applied lineage totals must stay 16/12/4/8/1/4`);
  }
  if (JSON.stringify(Object.entries(roadmapV2.phase_lineage_totals || {}).sort()) !== JSON.stringify(Object.entries(acceptedLineageTotals).sort())) {
    fail(`${appliedLabel} declared phase_lineage_totals must stay 16/12/4/8/1/4`);
  }
  const appliedOpenDecisions = roadmapV2.open_human_decisions || [];
  const appliedResolvedDecisions = roadmapV2.resolved_human_decisions || [];
  if (appliedOpenDecisions.length !== 4) fail(`${appliedLabel} applied model must keep 4 open human decisions`);
  if (appliedResolvedDecisions.length !== 3) fail(`${appliedLabel} applied model must keep 3 resolved human decisions`);
  const appliedOpenIds = new Set(appliedOpenDecisions.map((decision) => decision.decision_id));
  const appliedResolvedIds = new Set(appliedResolvedDecisions.map((decision) => decision.decision_id));
  for (const decisionId of appliedResolvedIds) {
    if (appliedOpenIds.has(decisionId)) fail(`${appliedLabel} decision ${decisionId} is both open and resolved`);
  }
  if (!appliedResolvedIds.has("authorize-roadmap-v2-normalized-proposal-apply")) {
    fail(`${appliedLabel} apply authorization must be recorded as resolved in the applied model`);
  }
  if (!appliedOpenIds.has("activate-roadmap-v2-as-default-console-source")) {
    fail(`${appliedLabel} default activation must remain an open human decision`);
  }
  const resolvedApplyDecision = appliedResolvedDecisions.find((decision) => decision.decision_id === "authorize-roadmap-v2-normalized-proposal-apply");
  if (resolvedApplyDecision && (!resolvedApplyDecision.resolution || resolvedApplyDecision.resolved_by !== "HD-JAME-ROADMAP-V2-NORMALIZED-PROPOSAL-APPLY-AUTHORIZATION-001")) {
    fail(`${appliedLabel} resolved apply decision must carry its resolution and resolved_by HD-JAME-ROADMAP-V2-NORMALIZED-PROPOSAL-APPLY-AUTHORIZATION-001`);
  }
  const humanDecisionLedger = readJsonl(".aiw/ledgers/human_decisions.jsonl");
  if (!humanDecisionLedger.some((record) => record.decision_id === "HD-JAME-ROADMAP-V2-NORMALIZED-PROPOSAL-APPLY-AUTHORIZATION-001")) {
    fail(`${appliedLabel} resolved apply decision has no matching HD-JAME-ROADMAP-V2-NORMALIZED-PROPOSAL-APPLY-AUTHORIZATION-001 record in human_decisions.jsonl`);
  }
  const appliedText = JSON.stringify(roadmapV2);
  if (appliedText.includes('"activated":true') || appliedText.includes('"migration_performed":true') || appliedText.includes('"certified":true')) {
    fail(`${appliedLabel} must not imply activation, performed migration, or certification`);
  }
  if (!Array.isArray(roadmapV2.no_claims) || roadmapV2.no_claims.length !== 5) {
    fail(`${appliedLabel} must keep its 5 accepted no-claims`);
  }
}

if (projectConsoleJs.includes("Roadmap Map")) {
  fail("Project Console visible renderer must not use the old Roadmap Map label");
}

for (const expectedRendererStructure of [
  "canonicalStatusFromAxes(",
  "runSecondaryMetadata(",
  "operatorRun(",
  "operatorBadge(",
  "operatorKindLabel(",
  "operatorQueueModel(",
  "renderStageStrip("
]) {
  if (!projectConsoleJs.includes(expectedRendererStructure)) {
    fail(`Project Console renderer missing required operator model structure: ${expectedRendererStructure}`);
  }
}

// The active Overview renderer is the approved v3 Overview (target screenshot);
// the legacy renderOverview stays in source, dormant.
const overviewRenderer = functionSource(projectConsoleJs, "renderOverviewV3");
const overviewTitleRenderer = functionSource(projectConsoleJs, "setOverviewCardTitles");
const nextRunRenderer = functionSource(projectConsoleJs, "renderNextRun");
const queueRenderer = functionSource(projectConsoleJs, "renderQueue");
const phaseRenderer = functionSource(projectConsoleJs, "renderPhaseGroup");
const operatorStatusRenderer = functionSource(projectConsoleJs, "operatorStatus");
const secondaryMetadataRenderer = functionSource(projectConsoleJs, "runSecondaryMetadata");
const primaryRowRenderers = [nextRunRenderer, queueRenderer, phaseRenderer].join("\n");

const overviewDisplayRenderer = `${overviewTitleRenderer}\n${overviewRenderer}`;

if (overviewDisplayRenderer.includes("Recent Activity") || overviewDisplayRenderer.includes("Recent activity")) {
  fail("Overview renderer must not include Recent Activity");
}

// Approved v3 Overview labels (Overview repair after QA_CHANGES_REQUIRED): section
// eyebrows Current work / Next action / Queue snapshot plus the in-card labels and
// snapshot cells from the target screenshot.
for (const requiredOverviewLabel of [
  "Current work",
  "Current work item",
  "Next up",
  "Next action",
  "Queue snapshot",
  "Needs Human Decision",
  "Pending runs"
]) {
  if (!overviewDisplayRenderer.includes(requiredOverviewLabel)) {
    fail(`Overview renderer missing required English label: ${requiredOverviewLabel}`);
  }
}
// The v3 Overview derives from roadmap_v3 at render time, opens the shared v3 Run
// Detail with origin Overview, and caps the Next action list at four upcoming runs.
for (const requiredOverviewStructure of ["v3Model(", "data-v3-run", '"Overview"', "slice(0, 4)", "v3QueueGroupKey("]) {
  if (!overviewRenderer.includes(requiredOverviewStructure)) {
    fail(`Overview renderer must derive the v3 Overview surfaces: missing ${requiredOverviewStructure}`);
  }
}

for (const requiredDrawerLabel of [
  "What will happen",
  "Why it matters",
  "What closes this run",
  "Current stage",
  "Blockers / dependencies",
  "Next operator action",
  "Technical details"
]) {
  if (!projectConsoleJs.includes(requiredDrawerLabel)) {
    fail(`Run drawer missing required English label: ${requiredDrawerLabel}`);
  }
}

if (!primaryRowRenderers.includes("operator.kindLabel")) {
  fail("Primary row renderers must display run kind/stage as the second primary badge");
}

if (primaryRowRenderers.includes("runSecondaryMetadata(")) {
  fail("Primary row renderers must not render the full Area/Kind/Stage/Wait metadata line");
}

for (const forbiddenPrimaryRowText of [
  "Area:",
  "Kind:",
  "Certification state",
  "certification_state",
  "Not certified",
  "not certified"
]) {
  if (primaryRowRenderers.includes(forbiddenPrimaryRowText)) {
    fail(`Primary row renderers must not include technical metadata/no-claim text: ${forbiddenPrimaryRowText}`);
  }
}

if (
  primaryRowRenderers.includes("operator.type") ||
  primaryRowRenderers.includes("currentOperator.type") ||
  primaryRowRenderers.includes("nextOperator.type")
) {
  fail("Primary row renderers must not use domain/context labels as primary badges");
}

for (const forbiddenPrimaryBadgeText of [
  "Web components",
  "Project Console",
  "Color System",
  "Not certified",
  "not certified",
  "No Web certification",
  "No Slide certification",
  "Generator-safe",
  "RULE_ONLY"
]) {
  if (primaryRowRenderers.includes(forbiddenPrimaryBadgeText)) {
    fail(`Primary row renderers must not promote domain/certification/no-claim text as primary badges: ${forbiddenPrimaryBadgeText}`);
  }
}

if (secondaryMetadataRenderer.includes("certification_state")) {
  fail("Secondary row metadata must not repeat certification_state in the normal queue/roadmap row");
}

for (const requiredQueueMetricLabel of [
  "Now",
  "Next",
  "Blocked",
  "Later",
  "Total remaining"
]) {
  if (!queueRenderer.includes(requiredQueueMetricLabel)) {
    fail(`Queue renderer missing operator-friendly metric label: ${requiredQueueMetricLabel}`);
  }
}

if (!queueRenderer.includes("Model stats")) {
  fail("Queue renderer must move technical counts into a Model stats area");
}

const modelStatsIndex = queueRenderer.indexOf("Model stats");
for (const technicalMetricLabel of [
  "Primary work items",
  "Lifecycle stages",
  "Technical records"
]) {
  const index = queueRenderer.indexOf(technicalMetricLabel);
  if (index === -1) {
    fail(`Queue renderer missing technical metric in Model stats: ${technicalMetricLabel}`);
  } else if (modelStatsIndex === -1 || index < modelStatsIndex) {
    fail(`Technical metric must not appear before Model stats: ${technicalMetricLabel}`);
  }
}

if (!queueRenderer.includes("Plan groups")) {
  fail("Queue renderer must default to operator-facing plan groups");
}

if (phaseRenderer.includes("technical records") || phaseRenderer.includes("records</span>")) {
  fail("Roadmap phase rows must not promote technical record counts as primary labels");
}

if (operatorStatusRenderer.includes("lifecycle_status")) {
  fail("Primary status renderer must not use raw lifecycle_status when canonical axes exist");
}

if (!projectConsoleJs.includes("renderRoadmapV2Draft(")) {
  fail("Project Console renderer must include the Roadmap v2 draft subview renderer");
}

for (const requiredRoadmapV2DraftBoundaryLabel of ["Draft preview", "Not active", "Legacy Roadmap"]) {
  if (!projectConsoleJs.includes(requiredRoadmapV2DraftBoundaryLabel)) {
    fail(`Project Console renderer must keep the Roadmap v2 draft boundary label: ${requiredRoadmapV2DraftBoundaryLabel}`);
  }
}

// Roadmap v2 draft render contract (RUN-JAME-PROJECT-CONSOLE-ROADMAP-V2-RENDER-REPAIR-001):
// the draft subview consumes the applied deliverable level, keeps candidate families
// distinct from executable runs, and must not regress to pre-apply base-draft wording.
for (const staleRoadmapV2DraftWording of [
  "No phase carries deliverables yet",
  "Deliverables are not defined yet"
]) {
  if (projectConsoleJs.includes(staleRoadmapV2DraftWording)) {
    fail(`Roadmap v2 draft renderer must not reintroduce stale base-draft wording: ${staleRoadmapV2DraftWording}`);
  }
}

const roadmapV2DraftDeliverableRenderer = functionSource(projectConsoleJs, "rv2DraftDeliverableRow");
if (!roadmapV2DraftDeliverableRenderer) {
  fail("Roadmap v2 draft renderer must include the rv2DraftDeliverableRow deliverable-level renderer");
} else if (!roadmapV2DraftDeliverableRenderer.includes("Deliverable")) {
  fail("Roadmap v2 draft deliverable renderer must carry the visible Deliverable anchor label");
}

const roadmapV2DraftPhaseBlockRenderer = functionSource(projectConsoleJs, "rv2DraftPhaseBlock");
if (!roadmapV2DraftPhaseBlockRenderer.includes("phase.deliverables")) {
  fail("Roadmap v2 draft phase rendering must consume phase.deliverables from the canonical source");
}

for (const requiredRoadmapV2FamilyBoundary of ["Candidate family", "not instantiated executable runs"]) {
  if (!projectConsoleJs.includes(requiredRoadmapV2FamilyBoundary)) {
    fail(`Roadmap v2 draft renderer must keep candidate families distinct from executable runs: ${requiredRoadmapV2FamilyBoundary}`);
  }
}

// Default tab/subview structure after the QA-approved conceptual projection correction
// (QA_CHANGES_REQUIRED_ROADMAP_V3_PROTOTYPE): Overview stays the default top-level tab
// and the v3 Run Queue is the default Roadmap-tab subview.
const projectConsoleIndexHtml = readText("docs/project-console/index.html");
for (const requiredDefaultSelectionAnchor of [
  'class="tab active" type="button" data-tab="overview"',
  'class="segment active" type="button" data-subview="v3queue"',
  'id="roadmap-sub-v3queue" class="roadmap-subview active"'
]) {
  if (!projectConsoleIndexHtml.includes(requiredDefaultSelectionAnchor)) {
    fail(`Project Console default selection must remain Overview tab + Run Queue (v3) subview: missing anchor ${requiredDefaultSelectionAnchor}`);
  }
}

// Roadmap v3 surfaces (RUN-JAME-PROJECT-CONSOLE-ROADMAP-V3-PROTOTYPE-001, corrected after
// QA_CHANGES_REQUIRED_ROADMAP_V3_PROTOTYPE and restyled per the approved
// JAME_ROADMAP_VISUAL_HANDOFF_V1 package): the Roadmap tab exposes exactly the two v3
// subviews (Run Queue default + Roadmap), the removed legacy/v2 subviews and the old
// prototype labels stay absent from the human UI, rows carry the stable #N run order,
// hierarchy shows titles only, and both views wire one shared run detail. These are
// source anchors on markup and templates; they do not prove visual quality - Human QA
// remains the visual authority.
for (const requiredRoadmapV3IndexAnchor of [
  'data-subview="v3queue">Run Queue<',
  'data-subview="v3roadmap">Roadmap<',
  'id="roadmap-sub-v3queue" class="roadmap-subview active"',
  'id="roadmap-sub-v3roadmap" class="roadmap-subview"'
]) {
  if (!projectConsoleIndexHtml.includes(requiredRoadmapV3IndexAnchor)) {
    fail(`Roadmap tab must expose the two v3 subviews with Run Queue as default: missing index.html anchor ${requiredRoadmapV3IndexAnchor}`);
  }
}
for (const forbiddenRoadmapSubviewAnchor of [
  'data-subview="queue"',
  'data-subview="map"',
  'data-subview="v2draft"',
  'data-subview="create"',
  'id="roadmap-sub-queue"',
  'id="roadmap-sub-map"',
  'id="roadmap-sub-v2draft"',
  'id="roadmap-sub-create"',
  'id="run-queue"',
  'id="roadmap-tree"',
  'id="roadmap-v2-draft"',
  '>Legacy Roadmap<',
  '>Roadmap v2 Draft<',
  'Roadmap v3 Prototype',
  'Run Queue v3 Prototype'
]) {
  if (projectConsoleIndexHtml.includes(forbiddenRoadmapSubviewAnchor)) {
    fail(`Removed Roadmap subview markup must stay absent from index.html: found ${forbiddenRoadmapSubviewAnchor}`);
  }
}
for (const requiredRoadmapV3Function of ["renderRoadmapV3", "renderRunQueueV3", "v3OpenRunDetail", "v3QueueGroupKey", "v3QueueRowHtml", "v3QueueRowCells", "v3RoadmapRunRow", "v3AttachHandlers", "v3DeriveCurrent", "v3ProgressTimeline", "v3UpdateSubtabCounts", "v3ObjectiveStats", "v3PhaseRatio", "v3StageText", "v3ResultText", "v3ProgressDisc", "v3DetailCell"]) {
  if (!projectConsoleJs.includes(`function ${requiredRoadmapV3Function}(`)) {
    fail(`project-console.js must define ${requiredRoadmapV3Function} for the Roadmap v3 views`);
  }
}
for (const v3RendererFunctionName of ["renderRoadmapV3", "renderRunQueueV3", "v3OpenRunDetail", "v3RoadmapRunRow", "v3QueueRowHtml", "v3Unavailable"]) {
  const v3RendererSource = functionSource(projectConsoleJs, v3RendererFunctionName);
  for (const forbiddenPrototypeLabel of ["PROTOTYPE", "NOT ACTIVE"]) {
    if (v3RendererSource.includes(forbiddenPrototypeLabel)) {
      fail(`${v3RendererFunctionName} must not render the ${forbiddenPrototypeLabel} label in the active human UI`);
    }
  }
}
if (projectConsoleJs.includes("v3PrototypeStrip")) {
  fail("The removed v3 prototype strip must stay out of project-console.js");
}
// The queue row template stays presentation-only: it reads order, title, and summary,
// while every status-bearing cell (Stage / Waiting on / Dependencies / Closeout), the
// chip, and the History lead icon are derived in v3QueueRowCells / renderRunQueueV3 and
// passed in (approved JAME_ROADMAP_VISUAL_HANDOFF_V1 queue-row presentation).
const roadmapV3QueueRowSource = functionSource(projectConsoleJs, "v3QueueRowHtml");
if (roadmapV3QueueRowSource) {
  for (const requiredQueueRowField of ["run.queue_order", "run.title", "run.summary"]) {
    if (!roadmapV3QueueRowSource.includes(requiredQueueRowField)) {
      fail(`v3QueueRowHtml must render ${requiredQueueRowField} in the primary queue row`);
    }
  }
  for (const forbiddenQueueRowField of ["run.status", "run.full_description", "run.depends_on", "run.current_stage", "run.closeout_result", "run.progress"]) {
    if (roadmapV3QueueRowSource.includes(forbiddenQueueRowField)) {
      fail(`v3QueueRowHtml must not read status-bearing run fields directly (cells are caller-computed); found ${forbiddenQueueRowField}`);
    }
  }
}
const roadmapV3QueueCellsSource = functionSource(projectConsoleJs, "v3QueueRowCells");
if (roadmapV3QueueCellsSource) {
  for (const requiredQueueCellAnchor of [">Stage<", ">Waiting on<", ">Dependencies<", ">Closeout<"]) {
    if (!roadmapV3QueueCellsSource.includes(requiredQueueCellAnchor)) {
      fail(`v3QueueRowCells must derive the labeled queue-row cells: missing ${requiredQueueCellAnchor}`);
    }
  }
}
const roadmapV3RunRowSource = functionSource(projectConsoleJs, "v3RoadmapRunRow");
if (roadmapV3RunRowSource) {
  for (const requiredRoadmapRunRowField of ["run.queue_order", "run.title", "run.summary", "v3StatusBadge("]) {
    if (!roadmapV3RunRowSource.includes(requiredRoadmapRunRowField)) {
      fail(`v3RoadmapRunRow must render ${requiredRoadmapRunRowField} in the Roadmap run row`);
    }
  }
  for (const forbiddenRoadmapRunRowField of ["run.progress", "run.current_stage", "run.full_description", "full_description"]) {
    if (roadmapV3RunRowSource.includes(forbiddenRoadmapRunRowField)) {
      fail(`v3RoadmapRunRow must stay concise; found ${forbiddenRoadmapRunRowField}`);
    }
  }
}
// Shared Run Detail per the approved handoff (RDH-A / RDM-C): "#N Title" header with the
// verbatim run_id + one status chip, Run order / Current stage metadata cells (the stage
// cell folds in attempt and state, both derived from progress), a Details disclosure with
// Objective / Phase titles + Run ID, Summary with a Full description disclosure, a
// collapsible Dependencies section, and the Progress timeline.
const roadmapV3DetailSource = functionSource(projectConsoleJs, "v3OpenRunDetail");
if (roadmapV3DetailSource) {
  for (const requiredRunDetailAnchor of ['"Run ID"', '"Run order"', ">Summary<", ">Details<", ">Dependencies", ">Full description<", "context.objective.title", "context.phase.title", "v3DeriveCurrent(", "v3ProgressTimeline(", '"Current stage"', "v3StatusBadge("]) {
    if (!roadmapV3DetailSource.includes(requiredRunDetailAnchor)) {
      fail(`v3OpenRunDetail must render ${requiredRunDetailAnchor} in the shared run detail`);
    }
  }
  for (const forbiddenRunDetailAnchor of ["objective_id", "phase_id", "run.current_stage", "current_stage_state"]) {
    if (roadmapV3DetailSource.includes(forbiddenRunDetailAnchor)) {
      fail(`v3OpenRunDetail must not read ${forbiddenRunDetailAnchor}; current stage and state derive from progress`);
    }
  }
}
const roadmapV3TimelineSource = functionSource(projectConsoleJs, "v3ProgressTimeline");
if (roadmapV3TimelineSource) {
  for (const requiredTimelineAnchor of ["entry.cycle", "entry.stage", "entry.attempt", "entry.state", "entry.result", "entry.note", "Round ", "run.progress"]) {
    if (!roadmapV3TimelineSource.includes(requiredTimelineAnchor)) {
      fail(`v3ProgressTimeline must render ${requiredTimelineAnchor} in the progress timeline`);
    }
  }
  if (roadmapV3TimelineSource.includes("Cycle ")) {
    fail("v3ProgressTimeline must label execution rounds as Round, not Cycle, in the human-facing UI");
  }
}
const roadmapV3AttachSource = functionSource(projectConsoleJs, "v3AttachHandlers");
if (roadmapV3AttachSource && !roadmapV3AttachSource.includes("v3OpenRunDetail(")) {
  fail("v3AttachHandlers must open the shared v3 run detail");
}
for (const sharedRoadmapV3DetailCaller of ["renderRoadmapV3", "renderRunQueueV3"]) {
  const sharedCallerSource = functionSource(projectConsoleJs, sharedRoadmapV3DetailCaller);
  if (sharedCallerSource && !sharedCallerSource.includes("v3AttachHandlers(")) {
    fail(`${sharedRoadmapV3DetailCaller} must wire the shared v3 run detail through v3AttachHandlers`);
  }
}

// Roadmap v3 visual/interaction repair anchors (RUN-JAME-PROJECT-CONSOLE-ROADMAP-V3-PROTOTYPE-001,
// after QA_CHANGES_REQUIRED_ROADMAP_V3_FINAL_VISUAL). These pin the presentation/interaction
// contract on the source templates; they do not prove visual quality - Human QA remains the
// visual authority. No count or hash pin is added.

// Exactly five collapsible, keyboard-accessible Run Queue groups with aria-expanded toggles.
if (ROADMAP_V3_QUEUE_GROUP_KEYS.length !== 5) {
  fail(`Roadmap v3 Run Queue must define exactly five queue groups; found ${ROADMAP_V3_QUEUE_GROUP_KEYS.length}`);
}
const roadmapV3QueueRendererSource = functionSource(projectConsoleJs, "renderRunQueueV3");
if (roadmapV3QueueRendererSource) {
  for (const requiredQueueGroupAnchor of ["v3-queue-group-toggle", "aria-expanded", "aria-controls", "data-v3-group", "v3-queue-group-body", "ROADMAP_V3_QUEUE_GROUP_DEFAULT_OPEN"]) {
    if (!roadmapV3QueueRendererSource.includes(requiredQueueGroupAnchor)) {
      fail(`renderRunQueueV3 must render five collapsible groups with accessible toggles: missing ${requiredQueueGroupAnchor}`);
    }
  }
}
const roadmapV3GroupToggleSource = functionSource(projectConsoleJs, "v3ToggleQueueGroup");
if (!roadmapV3GroupToggleSource || !roadmapV3GroupToggleSource.includes("aria-expanded")) {
  fail("project-console.js must toggle queue-group aria-expanded via v3ToggleQueueGroup");
}

// Approved visual-handoff queue/roadmap presentation: the queue renderer derives the
// labeled row cells and the sub-tab counts (Run Queue = pending, Roadmap = objectives),
// and the Roadmap renderer derives the objective stat row with the "Phases" disclosure.
if (roadmapV3QueueRendererSource) {
  for (const requiredQueuePresentationAnchor of ["v3QueueRowCells(", "v3UpdateSubtabCounts("]) {
    if (!roadmapV3QueueRendererSource.includes(requiredQueuePresentationAnchor)) {
      fail(`renderRunQueueV3 must derive row cells and sub-tab counts: missing ${requiredQueuePresentationAnchor}`);
    }
  }
}
const roadmapV3SubtabCountsSource = functionSource(projectConsoleJs, "v3UpdateSubtabCounts");
if (roadmapV3SubtabCountsSource && !roadmapV3SubtabCountsSource.includes("v3-subtab-count")) {
  fail("v3UpdateSubtabCounts must inject the v3-subtab-count spans into the sub-tab segments");
}
const roadmapV3RoadmapRendererSource = functionSource(projectConsoleJs, "renderRoadmapV3");
if (roadmapV3RoadmapRendererSource) {
  for (const requiredRoadmapPresentationAnchor of ["v3ObjectiveStats(", ">Phases<"]) {
    if (!roadmapV3RoadmapRendererSource.includes(requiredRoadmapPresentationAnchor)) {
      fail(`renderRoadmapV3 must render the objective stat card with the Phases disclosure: missing ${requiredRoadmapPresentationAnchor}`);
    }
  }
}

// Semantic completed/blocked terminal markers derived from the canonical run.status, never
// colour-only (each carries an aria-label).
const roadmapV3TerminalIconSource = functionSource(projectConsoleJs, "v3TerminalIcon");
if (!roadmapV3TerminalIconSource) {
  fail("project-console.js must define v3TerminalIcon for the semantic terminal markers");
} else {
  for (const requiredTerminalAnchor of ['status === "completed"', 'status === "blocked"', 'aria-label="Completed"', 'aria-label="Blocked"']) {
    if (!roadmapV3TerminalIconSource.includes(requiredTerminalAnchor)) {
      fail(`v3TerminalIcon must provide an accessible marker for ${requiredTerminalAnchor}`);
    }
  }
}
// The queue-row template must not read run.status; the History terminal marker is computed
// by renderRunQueueV3 and passed in.
if (roadmapV3QueueRendererSource && !roadmapV3QueueRendererSource.includes("v3TerminalIcon(")) {
  fail("renderRunQueueV3 must lead History rows with the semantic terminal marker via v3TerminalIcon");
}
// Roadmap rows keep exactly one textual primary-status indicator (the status badge) alongside
// the terminal icon; both derive from the same canonical run.status.
if (roadmapV3RunRowSource && !roadmapV3RunRowSource.includes("v3TerminalIcon(")) {
  fail("v3RoadmapRunRow must render the semantic terminal marker via v3TerminalIcon");
}

// Shared Run Detail bounded backward-navigation stack (UI-only).
for (const requiredBackAnchor of ["function v3BackRunDetail(", "let v3DetailStack", "data-v3-back"]) {
  if (!projectConsoleJs.includes(requiredBackAnchor)) {
    fail(`project-console.js must implement the Run Detail back-navigation stack: missing ${requiredBackAnchor}`);
  }
}
const roadmapV3BackSource = functionSource(projectConsoleJs, "v3BackRunDetail");
if (roadmapV3BackSource && !roadmapV3BackSource.includes("v3DetailStack")) {
  fail("v3BackRunDetail must operate on the local v3DetailStack");
}
if (roadmapV3DetailSource) {
  for (const requiredDetailNavAnchor of ["v3DetailStack", "data-v3-back", '"push"']) {
    if (!roadmapV3DetailSource.includes(requiredDetailNavAnchor)) {
      fail(`v3OpenRunDetail must manage the back-navigation stack: missing ${requiredDetailNavAnchor}`);
    }
  }
}
// Closing the drawer must reset the local navigation stack so no stale Back control leaks.
const roadmapV3CloseDrawerSource = functionSource(projectConsoleJs, "closeDrawer");
if (roadmapV3CloseDrawerSource && !roadmapV3CloseDrawerSource.includes("v3DetailStack = []")) {
  fail("closeDrawer must reset the local v3DetailStack");
}

// The rejected standalone Roadmap v2 preview direction must not be reintroduced.
for (const rejectedStandalonePreviewPath of [
  "docs/project-console/roadmap-v2-preview.html",
  "docs/project-console/assets/roadmap-v2-preview.js",
  "docs/project-console/assets/roadmap-v2-preview.css"
]) {
  if (fs.existsSync(path.join(root, rejectedStandalonePreviewPath))) {
    fail(`Rejected standalone Roadmap v2 preview must not be reintroduced: ${rejectedStandalonePreviewPath}`);
  }
}

// Git commit history snapshot (History tab; operator-approved derived view file):
// .aiw/views/git_history.snapshot.json is derived read-only Project Console view data,
// regenerated automatically from the local Git repository by serve-project-console.mjs -
// not canonical roadmap data, not operational ledger data, not run-state evidence. It is
// GENERATED, so its absence is allowed (a fresh checkout has none until the server runs);
// when present it is validated strictly. The visible History tab renders ONLY this
// snapshot: real branches, real commits, and run associations only when an explicit
// canonical Roadmap v3 run id was recorded.
const gitHistoryRelPath = ".aiw/views/git_history.snapshot.json";
const gitHistoryPresent = fs.existsSync(path.join(root, gitHistoryRelPath));
const gitHistorySnapshot = gitHistoryPresent ? readJson(gitHistoryRelPath) : null;
const allowedGitHistorySources = new Set(["manual_git_export", "local_git_autosync"]);
let gitHistorySummary = null;
if (gitHistorySnapshot) {
  const historyLabel = "git_history.snapshot.json";
  if (gitHistorySnapshot.schema !== "jame.git_history_snapshot.v1") {
    fail(`${historyLabel} schema must be jame.git_history_snapshot.v1`);
  }
  if (!allowedGitHistorySources.has(gitHistorySnapshot.source)) {
    fail(`${historyLabel} source must be manual_git_export or local_git_autosync`);
  }
  // Auto-sync snapshots must carry the version markers the frontend polls on; the legacy
  // manual export may omit them, but when present they must be well-formed.
  if (gitHistorySnapshot.source === "local_git_autosync") {
    if (typeof gitHistorySnapshot.head !== "string" || !gitHistorySnapshot.head.trim()) {
      fail(`${historyLabel} auto-sync snapshot must record a non-empty head sha`);
    }
    if (typeof gitHistorySnapshot.generated_at !== "string" || Number.isNaN(Date.parse(gitHistorySnapshot.generated_at))) {
      fail(`${historyLabel} auto-sync snapshot must record a parseable generated_at`);
    }
  } else {
    if (gitHistorySnapshot.head !== undefined && (typeof gitHistorySnapshot.head !== "string" || !gitHistorySnapshot.head.trim())) {
      fail(`${historyLabel} head, when present, must be a non-empty string`);
    }
    if (gitHistorySnapshot.generated_at !== undefined && Number.isNaN(Date.parse(gitHistorySnapshot.generated_at))) {
      fail(`${historyLabel} generated_at, when present, must be parseable`);
    }
  }
  const historyBranches = Array.isArray(gitHistorySnapshot.branches) ? gitHistorySnapshot.branches : [];
  if (!historyBranches.length || historyBranches.some((branch) => typeof branch !== "string" || !branch.trim())) {
    fail(`${historyLabel} must declare a non-empty branches array of branch names`);
  }
  // Human-facing History excludes local backup/* safety branches (H2, section 30). The
  // builder and the frontend both filter them; here we validate the intended contract on the
  // generated model. We do NOT hard-fail a snapshot produced before the filter (it is
  // regenerated the next time serve-project-console.mjs runs); the summary line reports any
  // still-present backup branches instead.
  const historyHiddenBranches = historyBranches.filter((branch) => /^backup\//.test(branch));
  const historyVisibleBranchNames = historyBranches.filter((branch) => !/^backup\//.test(branch));
  if (!historyVisibleBranchNames.length) {
    fail(`${historyLabel} must declare at least one non-backup (visible) branch`);
  }
  if (typeof gitHistorySnapshot.current_branch !== "string" || !historyBranches.includes(gitHistorySnapshot.current_branch)) {
    fail(`${historyLabel} current_branch must be one of the declared branches`);
  } else if (/^backup\//.test(gitHistorySnapshot.current_branch)) {
    fail(`${historyLabel} current_branch must be a visible (non-backup) branch`);
  }
  const historyCommits = Array.isArray(gitHistorySnapshot.commits) ? gitHistorySnapshot.commits : [];
  if (!historyCommits.length) {
    fail(`${historyLabel} must contain commits`);
  }
  const roadmapV3HistoryRunIds = new Set();
  if (roadmapV3 && Array.isArray(roadmapV3.objectives)) {
    roadmapV3.objectives.forEach((objective) => (objective.phases || []).forEach((phase) => (phase.runs || []).forEach((run) => roadmapV3HistoryRunIds.add(run.run_id))));
  }
  let historyAssociated = 0;
  historyCommits.forEach((commit, index) => {
    const commitLabel = `${historyLabel} commit[${index}]`;
    for (const field of ["branch", "sha", "full_sha", "author", "date", "subject"]) {
      if (typeof commit[field] !== "string" || !commit[field].trim()) fail(`${commitLabel} missing ${field}`);
    }
    if (!historyBranches.includes(commit.branch)) fail(`${commitLabel} branch is not declared in branches`);
    if (Number.isNaN(Date.parse(commit.date))) fail(`${commitLabel} date is not parseable`);
    if (typeof commit.body !== "string") fail(`${commitLabel} body must be a string`);
    if (typeof commit.is_merge !== "boolean") fail(`${commitLabel} is_merge must be boolean`);
    const parentCount = typeof commit.parents === "string" ? commit.parents.trim().split(/\s+/).filter(Boolean).length : 0;
    if (commit.is_merge !== (parentCount > 1)) fail(`${commitLabel} is_merge must match its parent count`);
    if (commit.run_id !== null && commit.run_id !== undefined) {
      if (typeof commit.run_id !== "string" || !roadmapV3HistoryRunIds.has(commit.run_id)) {
        fail(`${commitLabel} run_id must be null or an explicit canonical Roadmap v3 run id`);
      } else {
        historyAssociated += 1;
      }
    }
  });
  gitHistorySummary = {
    commits: historyCommits.length,
    branches: historyBranches.length,
    visible: historyVisibleBranchNames.length,
    hidden: historyHiddenBranches.length,
    current: gitHistorySnapshot.current_branch,
    associated: historyAssociated,
    source: gitHistorySnapshot.source
  };
}

// The History auto-sync tooling must exist: the builder that regenerates the snapshot
// and the local server that serves the console and watches .git. These are additive
// data-source/presentation anchors; no data-model check is affected.
for (const requiredHistoryTool of [
  "tools/project-console/build-git-history-snapshot.mjs",
  "tools/project-console/serve-project-console.mjs"
]) {
  if (!fs.existsSync(path.join(root, requiredHistoryTool))) {
    fail(`History auto-sync tool missing: ${requiredHistoryTool}`);
  }
}
const gitHistoryBuilderSource = readText("tools/project-console/build-git-history-snapshot.mjs");
if (gitHistoryBuilderSource) {
  for (const requiredBuilderAnchor of ["jame.git_history_snapshot.v1", "git_history.snapshot.json", "RUN-JAME-", "isHiddenHistoryBranch", "backup/"]) {
    if (!gitHistoryBuilderSource.includes(requiredBuilderAnchor)) {
      fail(`build-git-history-snapshot.mjs must produce the v1 snapshot with explicit-only run association: missing ${requiredBuilderAnchor}`);
    }
  }
}
// The frontend must auto-refresh History from the snapshot (re-fetch + active-tab poll).
for (const requiredHistoryRefreshAnchor of ["function refreshGitHistory(", "startHistoryAutoRefresh(", "historySnapshotMarker("]) {
  if (!projectConsoleJs.includes(requiredHistoryRefreshAnchor)) {
    fail(`project-console.js must auto-refresh History: missing ${requiredHistoryRefreshAnchor}`);
  }
}

// Manual History sync (operator-forced snapshot rebuild): a bounded, local-only endpoint in
// the server plus the button/handler in the frontend. Additive source anchors only; the
// endpoint must reuse the read-only builder rather than duplicate its logic, and no
// data-model, queue, numbering, dependency, progress, or Git check is affected.
const historySyncRoute = "/__project-console/history/sync";
const serveProjectConsoleSource = readText("tools/project-console/serve-project-console.mjs");
if (serveProjectConsoleSource) {
  if (!serveProjectConsoleSource.includes(historySyncRoute)) {
    fail(`serve-project-console.mjs must expose the internal manual History sync route ${historySyncRoute}`);
  }
  if (!serveProjectConsoleSource.includes("buildGitHistorySnapshot")) {
    fail("serve-project-console.mjs manual sync must reuse buildGitHistorySnapshot (no duplicated builder logic)");
  }
}
for (const requiredManualSyncAnchor of [historySyncRoute, "data-hist-sync", "function manualSyncHistory("]) {
  if (!projectConsoleJs.includes(requiredManualSyncAnchor)) {
    fail(`project-console.js must implement the manual History sync control: missing ${requiredManualSyncAnchor}`);
  }
}
// H4: the success status is the concise operator-approved wording — exactly "Refreshed",
// with no commit count in the button/status. Narrow source anchor guarding that copy.
const manualSyncSource = functionSource(projectConsoleJs, "manualSyncHistory");
if (manualSyncSource && !manualSyncSource.includes('text: "Refreshed"')) {
  fail('manualSyncHistory success status text must be exactly "Refreshed" (no commit count)');
}

// History tab presentation anchors: the visible History tab is the Git commit history
// renderer; the retired mixed operational feed stays dormant and un-rendered.
for (const requiredHistoryAnchor of ["function renderCommitHistory(", "git_history.snapshot.json", "data-hist-branch", "v3-hist-run", "v3-hist-branch", "historyVisibleBranches"]) {
  if (!projectConsoleJs.includes(requiredHistoryAnchor)) {
    fail(`project-console.js must render the Git commit History tab: missing ${requiredHistoryAnchor}`);
  }
}
const renderAllHistorySource = functionSource(projectConsoleJs, "renderAll");
if (renderAllHistorySource && renderAllHistorySource.includes("renderHistory(")) {
  fail("renderAll must not render the retired mixed-feed renderHistory");
}
if (renderAllHistorySource && !renderAllHistorySource.includes("renderCommitHistory(")) {
  fail("renderAll must render History via renderCommitHistory");
}
const commitHistorySource = functionSource(projectConsoleJs, "renderCommitHistory");
if (commitHistorySource) {
  for (const forbiddenHistoryFeedSource of ["historyItems(", "data.events", "data.changeLedger", "data.humanQa", "data.aiReviews", "data.gitProvenance"]) {
    if (commitHistorySource.includes(forbiddenHistoryFeedSource)) {
      fail(`renderCommitHistory must render only the git history snapshot; found ${forbiddenHistoryFeedSource}`);
    }
  }
  if (!commitHistorySource.includes('"History"')) {
    fail("renderCommitHistory must open run details with origin History");
  }
  if (!commitHistorySource.includes("historyVisibleBranches(")) {
    fail("renderCommitHistory must filter backup/* branches out of the History tabs via historyVisibleBranches");
  }
  // H6: the verbose History description paragraph was removed and must not return.
  if (commitHistorySource.includes("Reads the local Git repository")) {
    fail("renderCommitHistory must not render the removed verbose History description paragraph");
  }
}

// Docs body rendering anchors (RUN-JAME-PROJECT-CONSOLE-DOCS-V3-001, O2.P3). These pin that the
// Docs view fetches and renders the real repository-local document body (not a metadata-only
// card) with a conservative escape-first renderer, guards against remote/network fetches, and
// keeps the no-claims boundary that rendering a document is a reference - not certification,
// acceptance, Human QA, closeout, or reconciliation. They pin the source contract only; Human QA
// remains the visual/behavioral authority and no certification or completion is implied.
//
// Docs tree navigation and inline metadata anchors
// (RUN-JAME-PROJECT-CONSOLE-DOCS-V3-001-UX-TREE-NAV-REPAIR-001): the Docs navigation must group
// docs_index entries into collapsible categories derived from existing entry metadata (not a
// flat-only list), document metadata must render inside the reader as a collapsible section,
// and the retired fixed right metadata rail must stay retired. These anchors pin the source
// contract only; they assert no Docs acceptance, curation, reconciliation, certification, or
// Human QA result.
for (const requiredDocsFunction of ["renderDocs", "renderDocsNav", "renderSelectedDoc", "loadDocBody", "renderDocBodyContent", "renderDocMarkdownLite", "isRepoLocalDocPath", "deriveDocGroup", "docGroupLabel", "buildDocsNavTree", "renderDocMetadataDetails", "deriveDocNavTier", "isDefaultVisibleDoc"]) {
  if (!projectConsoleJs.includes(`function ${requiredDocsFunction}(`)) {
    fail(`project-console.js must define ${requiredDocsFunction} for the Docs body view`);
  }
}
// The grouped category/tree navigation plus the curated visibility controls live in renderDocsNav
// (RUN-JAME-PROJECT-CONSOLE-DOCS-CURATED-DEFAULT-VIEW-001). The Docs nav must stay a grouped tree
// (not a flat-only list) and must expose the Primary KB / All registered mode controls over a
// filtered entry set. Navigation contract only; no Docs acceptance or certification is implied.
const docsNavRenderSource = functionSource(projectConsoleJs, "renderDocsNav");
if (docsNavRenderSource) {
  for (const requiredDocsNavAnchor of ["buildDocsNavTree(", "docs-nav-group", "docsEntriesForMode(", 'data-docs-mode="primary"', 'data-docs-mode="all"']) {
    if (!docsNavRenderSource.includes(requiredDocsNavAnchor)) {
      fail(`renderDocsNav must render the grouped category tree with curated visibility controls, not a flat/show-all-only list: missing ${requiredDocsNavAnchor}`);
    }
  }
}
// The Docs view must open on the curated primary set by default, tier the registry from additive
// docs_index metadata (nav_tier) with a safe UI fallback, and decide curated visibility from
// default_visible / the primary tier. Display-only navigation visibility: it assigns no document
// status and asserts no acceptance, curation, reconciliation, certification, or Human QA result.
if (!projectConsoleJs.includes('docsVisibilityMode = "primary"')) {
  fail('project-console.js must default the Docs view to the curated primary visibility mode (docsVisibilityMode = "primary")');
}
const docsNavTierSource = functionSource(projectConsoleJs, "deriveDocNavTier");
if (docsNavTierSource) {
  for (const requiredTierAnchor of ["nav_tier", "source_role", "ia_bucket", "evidence", "history", "proposal"]) {
    if (!docsNavTierSource.includes(requiredTierAnchor)) {
      fail(`deriveDocNavTier must derive a nav tier from additive docs_index metadata (nav_tier) with a metadata fallback: missing ${requiredTierAnchor}`);
    }
  }
}
const docsDefaultVisibleSource = functionSource(projectConsoleJs, "isDefaultVisibleDoc");
if (docsDefaultVisibleSource) {
  for (const requiredVisibleAnchor of ["default_visible", "deriveDocNavTier(", "primary"]) {
    if (!docsDefaultVisibleSource.includes(requiredVisibleAnchor)) {
      fail(`isDefaultVisibleDoc must decide curated visibility from default_visible or the primary nav tier: missing ${requiredVisibleAnchor}`);
    }
  }
}
const docsGroupDeriveSource = functionSource(projectConsoleJs, "deriveDocGroup");
if (docsGroupDeriveSource) {
  for (const requiredDocsGroupAnchor of ["ia_bucket", "related_area", "source_role", "uncategorized"]) {
    if (!docsGroupDeriveSource.includes(requiredDocsGroupAnchor)) {
      fail(`deriveDocGroup must derive Docs nav groups from existing docs_index metadata with a safe fallback: missing ${requiredDocsGroupAnchor}`);
    }
  }
}
const docsSelectedDocSource = functionSource(projectConsoleJs, "renderSelectedDoc");
if (docsSelectedDocSource) {
  for (const requiredDocsReaderAnchor of ['id="docs-body"', "loadDocBody(", "docs-claim-note", "renderDocMetadataDetails("]) {
    if (!docsSelectedDocSource.includes(requiredDocsReaderAnchor)) {
      fail(`renderSelectedDoc must render the documentation body panel, no-claims reference note, and inline reader metadata: missing ${requiredDocsReaderAnchor}`);
    }
  }
  if (docsSelectedDocSource.includes("does not fetch Markdown into the dashboard body")) {
    fail("renderSelectedDoc must not reassert the retired metadata-only Docs stance");
  }
}
const docsMetaDetailsSource = functionSource(projectConsoleJs, "renderDocMetadataDetails");
if (docsMetaDetailsSource) {
  for (const requiredDocsMetaAnchor of ["<details", "metaField("]) {
    if (!docsMetaDetailsSource.includes(requiredDocsMetaAnchor)) {
      fail(`renderDocMetadataDetails must render document metadata as a collapsible reader section: missing ${requiredDocsMetaAnchor}`);
    }
  }
}
// The Docs view must not depend on the retired fixed right metadata rail.
if (projectConsoleJs.includes('byId("docs-meta")')) {
  fail("project-console.js must not render into the retired fixed right Docs metadata rail (docs-meta)");
}
if (projectConsoleIndexHtml.includes('id="docs-meta"')) {
  fail('index.html must not reintroduce the retired fixed right Docs metadata rail (id="docs-meta")');
}
const docsBodyLoaderSource = functionSource(projectConsoleJs, "loadDocBody");
if (docsBodyLoaderSource) {
  for (const requiredDocsBodyAnchor of ["isRepoLocalDocPath(", "fetchText(", "renderDocBodyContent(", "doc.path"]) {
    if (!docsBodyLoaderSource.includes(requiredDocsBodyAnchor)) {
      fail(`loadDocBody must fetch and safely render repository-local documentation bodies: missing ${requiredDocsBodyAnchor}`);
    }
  }
}
const docsMarkdownSource = functionSource(projectConsoleJs, "renderDocMarkdownLite");
if (docsMarkdownSource && !docsMarkdownSource.includes("escapeHtml(")) {
  fail("renderDocMarkdownLite must escape document text before formatting (no raw HTML injection)");
}
const docsRepoGuardSource = functionSource(projectConsoleJs, "isRepoLocalDocPath");
if (docsRepoGuardSource && !docsRepoGuardSource.includes("http")) {
  fail("isRepoLocalDocPath must reject remote/http document paths (no network fetch)");
}

// Roadmap v2 content-normalization proposal artifacts (RUN-JAME-ROADMAP-V2-CONTENT-AND-LEGACY-DISPOSITION-NORMALIZATION-001).
// Both artifacts are optional draft proposals; when present they must be internally consistent,
// preserve every legacy run ID, and must not imply activation or migration.
const dispositionMapPath = ".aiw/roadmap/legacy_run_disposition_map_v2.json";
const normalizedProposalPath = ".aiw/roadmap/roadmap_v2_normalized_proposal.json";
const dispositionMap = fs.existsSync(path.join(root, dispositionMapPath)) ? readJson(dispositionMapPath) : null;
const normalizedProposal = fs.existsSync(path.join(root, normalizedProposalPath)) ? readJson(normalizedProposalPath) : null;
if (dispositionMap && !normalizedProposal) warn("Disposition map present without normalized proposal");
if (normalizedProposal && !dispositionMap) warn("Normalized proposal present without disposition map");

const allowedDispositions = new Set(["real_run", "candidate_run_family", "nested_lifecycle_stage", "human_decision", "guardrail_or_policy", "dependency_or_gate_state", "maintenance_trigger", "history_or_archive", "duplicate_or_superseded"]);
const allowedHistorySubtypes = new Set(["completed_history", "superseded_history", "proposal_audit_history", "reference_only_archive", "unexecuted_map_only"]);

if (normalizedProposal) {
  const label = normalizedProposalPath;
  if (normalizedProposal.status !== "draft_for_human_review") fail(`${label} status must be draft_for_human_review`);
  const proposalObjectiveIds = new Set();
  const proposalPhaseIds = new Set();
  const proposalDeliverableIds = new Set();
  const proposalFamilyIds = new Set();
  for (const objective of normalizedProposal.objectives || []) {
    proposalObjectiveIds.add(objective.objective_id);
    for (const phase of objective.phases || []) {
      if (proposalPhaseIds.has(phase.phase_id)) fail(`${label} duplicate phase_id ${phase.phase_id}`);
      proposalPhaseIds.add(phase.phase_id);
      for (const deliverable of phase.deliverables || []) {
        if (proposalDeliverableIds.has(deliverable.deliverable_id)) fail(`${label} duplicate deliverable_id ${deliverable.deliverable_id}`);
        proposalDeliverableIds.add(deliverable.deliverable_id);
        if (deliverable.parent_phase_id !== phase.phase_id) fail(`${label} deliverable ${deliverable.deliverable_id} parent mismatch`);
      }
      for (const family of phase.candidate_run_families || []) {
        proposalFamilyIds.add(family.family_id);
        for (const field of Object.keys(family)) {
          if (forbiddenCandidateRunContractFields.has(field)) fail(`${label} family ${family.family_id} must not define run contract field ${field}`);
        }
        if (family.executable === true) fail(`${label} family ${family.family_id} must not be marked executable`);
      }
    }
  }
  for (const requiredObjectiveId of requiredRoadmapV2ObjectiveIds) {
    if (!proposalObjectiveIds.has(requiredObjectiveId)) fail(`${label} missing objective ${requiredObjectiveId}`);
  }
  const proposalText = JSON.stringify(normalizedProposal);
  if (proposalText.includes('"activated":true') || proposalText.includes('"migration_performed":true')) {
    fail(`${label} must not imply activation or performed migration`);
  }

  // Self-contained source candidate: must carry the base draft's governing sections.
  for (const requiredProposalField of ["source_of_truth_note", "legacy_roadmap_v1", "principles", "run_queue_v2_vocabulary", "cross_cutting_rules", "non_goals", "open_human_decisions", "near_term_sequence", "next_recommended_runs", "no_claims", "phase_lineage"]) {
    if (!(requiredProposalField in normalizedProposal)) fail(`${label} missing self-contained field ${requiredProposalField}`);
  }
  if (!JSON.stringify(normalizedProposal.run_queue_v2_vocabulary || {}).toLowerCase().includes("dependency hold")) {
    fail(`${label} queue vocabulary must include Dependency Hold`);
  }
  // Phase lineage: every base draft phase gets exactly one disposition; shared IDs need
  // preserved/renamed lineage (no silent semantic drift between base and proposal).
  const allowedLineage = new Set(["preserved", "renamed_same_identity", "merged_into", "dissolved_into", "replaced_by", "retired_from_strategic_model"]);
  const lineageByBase = new Map();
  for (const item of normalizedProposal.phase_lineage || []) {
    if (!allowedLineage.has(item.disposition)) fail(`${label} lineage ${item.original_phase_id} unsupported disposition ${item.disposition}`);
    if (lineageByBase.has(item.original_phase_id)) fail(`${label} lineage duplicate for ${item.original_phase_id}`);
    lineageByBase.set(item.original_phase_id, item);
  }
  // Base-draft cross-checks are computable only while the canonical file is still the
  // original 45-phase base draft (RUN-JAME-ROADMAP-V2-CANONICAL-SOURCE-001). After the
  // authorized apply run replaced the canonical content with the accepted normalized model,
  // the base draft lives only in Git history, so these historical checks stay dormant.
  // The proposal-internal lineage validation keeps running unconditionally below.
  const roadmapV2IsBaseDraft = roadmapV2?.created_from?.run_id === "RUN-JAME-ROADMAP-V2-CANONICAL-SOURCE-001";
  const basePhaseIds = new Set();
  if (roadmapV2 && roadmapV2IsBaseDraft) {
    for (const objective of roadmapV2.objectives || []) for (const phase of objective.phases || []) basePhaseIds.add(phase.phase_id);
    for (const basePhaseId of basePhaseIds) {
      if (!lineageByBase.has(basePhaseId)) fail(`${label} phase_lineage missing base phase ${basePhaseId}`);
    }
    for (const [basePhaseId, item] of lineageByBase) {
      if (!basePhaseIds.has(basePhaseId)) fail(`${label} lineage references unknown base phase ${basePhaseId}`);
      if (proposalPhaseIds.has(basePhaseId) && item.normalized_phase_id !== basePhaseId) {
        fail(`${label} base phase ID ${basePhaseId} is reused in the proposal but its lineage points elsewhere (semantic drift)`);
      }
    }
  }
  for (const [, item] of lineageByBase) {
    if (item.normalized_phase_id && !proposalPhaseIds.has(item.normalized_phase_id)) {
      fail(`${label} lineage target ${item.normalized_phase_id} does not exist in the proposal`);
    }
  }
  // Canonical Roadmap v2 contract compatibility (backward-compatible superset).
  for (const requiredCanonicalField of ["created_from", "generated_at"]) {
    if (!(requiredCanonicalField in normalizedProposal)) fail(`${label} missing canonical field ${requiredCanonicalField}`);
  }
  const proposalObjectiveIdSeen = new Set();
  for (const objective of normalizedProposal.objectives || []) {
    if (proposalObjectiveIdSeen.has(objective.objective_id)) fail(`${label} duplicate objective_id ${objective.objective_id}`);
    proposalObjectiveIdSeen.add(objective.objective_id);
    for (const requiredObjectiveField of ["order", "why_it_belongs", "non_goals"]) {
      if (!(requiredObjectiveField in objective) || objective[requiredObjectiveField] == null) fail(`${label} objective ${objective.objective_id} missing canonical field ${requiredObjectiveField}`);
    }
  }
  // Structured governance references (no magic literals).
  const governanceRefIds = new Set((normalizedProposal.governance_references || []).map((ref) => ref.ref_id));
  for (const ref of normalizedProposal.governance_references || []) {
    for (const requiredRefField of ["ref_id", "kind", "source_path", "status", "dependency_semantics"]) {
      if (!ref[requiredRefField]) fail(`${label} governance reference ${ref.ref_id || "UNKNOWN"} missing ${requiredRefField}`);
    }
  }
  // Dependencies: resolvable against phases, deliverables, or governance references; acyclic.
  const proposalFamilyIdSeen = new Set();
  const phaseDeps = new Map();
  for (const objective of normalizedProposal.objectives || []) {
    for (const phase of objective.phases || []) {
      if (!Array.isArray(phase.legacy_sources_hint)) fail(`${label} phase ${phase.phase_id} missing canonical legacy_sources_hint array`);
      phaseDeps.set(phase.phase_id, (phase.dependencies || []).filter((dep) => proposalPhaseIds.has(dep)));
      for (const dependency of phase.dependencies || []) {
        const ok = proposalPhaseIds.has(dependency) || proposalDeliverableIds.has(dependency) || governanceRefIds.has(dependency);
        if (!ok) fail(`${label} phase ${phase.phase_id} unresolvable dependency ${dependency}`);
      }
      for (const family of phase.candidate_run_families || []) {
        if (proposalFamilyIdSeen.has(family.family_id)) fail(`${label} duplicate family_id ${family.family_id}`);
        proposalFamilyIdSeen.add(family.family_id);
        if (family.executable !== false) fail(`${label} family ${family.family_id} must carry executable: false`);
        if (family.instantiated !== false) fail(`${label} family ${family.family_id} must carry instantiated: false`);
        if (family.run_contract_required !== true) fail(`${label} family ${family.family_id} must carry run_contract_required: true`);
        if (!["not_selected", "selected_for_scoping"].includes(family.selection_state)) fail(`${label} family ${family.family_id} unsupported selection_state`);
      }
      for (const deliverable of phase.deliverables || []) {
        if (["D-O0-1", "D-O0-2", "D-O0-3", "D-O0-4"].includes(deliverable.deliverable_id) && deliverable.status !== "implemented_locally") {
          fail(`${label} deliverable ${deliverable.deliverable_id} must carry its exact current status implemented_locally`);
        }
      }
    }
  }
  // Dependency cycle detection over phase->phase edges.
  const visitState = new Map();
  const hasCycle = (node) => {
    const state = visitState.get(node);
    if (state === 1) return true;
    if (state === 2) return false;
    visitState.set(node, 1);
    for (const next of phaseDeps.get(node) || []) if (hasCycle(next)) return true;
    visitState.set(node, 2);
    return false;
  };
  for (const phaseId of phaseDeps.keys()) {
    if (hasCycle(phaseId)) { fail(`${label} dependency cycle involving ${phaseId}`); break; }
  }
  // Governing sections must not carry stale retired-phase references.
  if (JSON.stringify(normalizedProposal.cross_cutting_rules || []).includes("O5.P1")) {
    fail(`${label} cross_cutting_rules still reference retired phase O5.P1`);
  }
  // Lineage: multi-destination coverage, new identities, no orphans.
  const newPhaseIds = new Set((normalizedProposal.new_phase_identities || []).map((item) => item.phase_id));
  for (const item of normalizedProposal.phase_lineage || []) {
    const targets = item.normalized_targets || [];
    if (["merged_into", "dissolved_into", "replaced_by", "preserved", "renamed_same_identity"].includes(item.disposition) && !targets.length) {
      fail(`${label} lineage ${item.original_phase_id} (${item.disposition}) must declare normalized_targets`);
    }
    for (const target of targets) {
      if (!proposalPhaseIds.has(target)) fail(`${label} lineage ${item.original_phase_id} target ${target} does not exist`);
    }
  }
  for (const newPhaseId of newPhaseIds) {
    if (basePhaseIds.has(newPhaseId)) fail(`${label} new phase identity ${newPhaseId} collides with a base phase ID`);
    if (!proposalPhaseIds.has(newPhaseId)) fail(`${label} declared new phase identity ${newPhaseId} does not exist`);
  }
  if (roadmapV2 && roadmapV2IsBaseDraft) {
    for (const phaseId of proposalPhaseIds) {
      if (!basePhaseIds.has(phaseId) && !newPhaseIds.has(phaseId)) fail(`${label} orphan normalized phase ${phaseId} (neither base ID nor declared new identity)`);
    }
  }
  // created_from must keep the full canonical nested shape (string design_source).
  const createdFrom = normalizedProposal.created_from || {};
  for (const requiredCreatedFromField of ["run_id", "design_source", "basis"]) {
    if (typeof createdFrom[requiredCreatedFromField] !== "string" || !createdFrom[requiredCreatedFromField].length) {
      fail(`${label} created_from.${requiredCreatedFromField} must be a non-empty string`);
    }
  }
  // Every normalized phase needs meaningful non-goals; every phase in the near-term
  // sequence must carry at least one deliverable or candidate family (populated selection).
  const nearTermPhaseIds = new Set((normalizedProposal.near_term_sequence || []).map((step) => step.phase_id));
  const proposalPhaseById = new Map();
  for (const objective of normalizedProposal.objectives || []) for (const phase of objective.phases || []) proposalPhaseById.set(phase.phase_id, phase);
  for (const [phaseId, phase] of proposalPhaseById) {
    if (!Array.isArray(phase.non_goals) || !phase.non_goals.length) fail(`${label} phase ${phaseId} has empty non_goals`);
    if (nearTermPhaseIds.has(phaseId) && !(phase.deliverables || []).length && !(phase.candidate_run_families || []).length) {
      fail(`${label} near-term phase ${phaseId} has neither deliverables nor candidate families`);
    }
  }
  // next_recommended_runs must be clean run IDs.
  for (const recommendedRunId of normalizedProposal.next_recommended_runs || []) {
    if (!/^RUN-[A-Z0-9-]+$/.test(recommendedRunId)) fail(`${label} next_recommended_runs entry is not a clean run ID: ${recommendedRunId}`);
  }
  // Resolved decisions must not appear as open.
  const openDecisionIds = new Set((normalizedProposal.open_human_decisions || []).map((item) => item.decision_id));
  for (const resolved of normalizedProposal.resolved_human_decisions || []) {
    if (openDecisionIds.has(resolved.decision_id)) fail(`${label} decision ${resolved.decision_id} is both open and resolved`);
    if (!resolved.resolution || !resolved.resolved_by) fail(`${label} resolved decision ${resolved.decision_id} missing resolution/resolved_by`);
  }
  // Declared lineage totals are mandatory and must match computed totals.
  if (!normalizedProposal.phase_lineage_totals) fail(`${label} missing required phase_lineage_totals`);
  else {
    const computedLineageTotals = {};
    for (const item of normalizedProposal.phase_lineage || []) computedLineageTotals[item.disposition] = (computedLineageTotals[item.disposition] || 0) + 1;
    if (JSON.stringify(Object.entries(computedLineageTotals).sort()) !== JSON.stringify(Object.entries(normalizedProposal.phase_lineage_totals).sort())) {
      fail(`${label} phase_lineage_totals does not match computed lineage totals`);
    }
  }
  // Accepted historical invariants (QA_ACCEPTED_ROADMAP_V2_NORMALIZED_CONTENT, 2026-07-03):
  // the proposal artifact stays frozen at its acceptance-time state, including the
  // pre-authorization decision split (5 open / 2 resolved). The applied canonical carries
  // the post-authorization state (4 open / 3 resolved) and is validated separately above.
  let acceptedProposalPhaseCount = 0;
  let acceptedProposalDeliverableCount = 0;
  let acceptedProposalFamilyCount = 0;
  for (const objective of normalizedProposal.objectives || []) {
    for (const phase of objective.phases || []) {
      acceptedProposalPhaseCount++;
      acceptedProposalDeliverableCount += (phase.deliverables || []).length;
      acceptedProposalFamilyCount += (phase.candidate_run_families || []).length;
    }
  }
  if ((normalizedProposal.objectives || []).length !== 8) fail(`${label} must keep its 8 accepted objectives`);
  if (acceptedProposalPhaseCount !== 30) fail(`${label} must keep its 30 accepted normalized phases`);
  if (acceptedProposalDeliverableCount !== 10) fail(`${label} must keep its 10 accepted deliverables`);
  if (acceptedProposalFamilyCount !== 30) fail(`${label} must keep its 30 accepted candidate run families`);
  if ((normalizedProposal.phase_lineage || []).length !== 45) fail(`${label} must keep its 45 accepted phase-lineage records`);
  if (JSON.stringify(Object.entries(normalizedProposal.phase_lineage_totals || {}).sort()) !== JSON.stringify(Object.entries(acceptedLineageTotals).sort())) {
    fail(`${label} phase_lineage_totals must keep the accepted 16/12/4/8/1/4 split`);
  }
  if ((normalizedProposal.open_human_decisions || []).length !== 5) fail(`${label} must keep its acceptance-time 5 open human decisions`);
  if ((normalizedProposal.resolved_human_decisions || []).length !== 2) fail(`${label} must keep its acceptance-time 2 resolved human decisions`);
  // Required structures: run conditions must exist 1:1 with recommended runs; the apply
  // condition must require content acceptance PLUS explicit apply authorization.
  if (!normalizedProposal.next_recommended_run_conditions) fail(`${label} missing required next_recommended_run_conditions`);
  else {
    const conditionIds = Object.keys(normalizedProposal.next_recommended_run_conditions);
    for (const recommendedRunId of normalizedProposal.next_recommended_runs || []) {
      if (!conditionIds.includes(recommendedRunId)) fail(`${label} recommended run ${recommendedRunId} has no conditions record`);
    }
    for (const conditionId of conditionIds) {
      if (!(normalizedProposal.next_recommended_runs || []).includes(conditionId)) fail(`${label} conditions exist for unknown run ${conditionId}`);
    }
    const applyCondition = JSON.stringify(normalizedProposal.next_recommended_run_conditions["RUN-JAME-ROADMAP-V2-NORMALIZED-PROPOSAL-APPLY-001"] || {});
    if (applyCondition && !(applyCondition.includes("authorize-roadmap-v2-normalized-proposal-apply") && applyCondition.includes("QA_ACCEPTED_ROADMAP_V2_NORMALIZED_CONTENT"))) {
      fail(`${label} apply-run condition must require content acceptance plus explicit apply authorization`);
    }
  }
  // Uniqueness within declared decision/identity structures.
  for (const [structField, idField] of [["new_phase_identities", "phase_id"], ["open_human_decisions", "decision_id"], ["resolved_human_decisions", "decision_id"]]) {
    const seenIds = new Set();
    for (const item of normalizedProposal[structField] || []) {
      if (seenIds.has(item[idField])) fail(`${label} duplicate ${idField} in ${structField}: ${item[idField]}`);
      seenIds.add(item[idField]);
    }
  }
  // Lineage identity evidence (no unsupported self-declaration).
  const basePhaseById = new Map();
  if (roadmapV2 && roadmapV2IsBaseDraft) for (const objective of roadmapV2.objectives || []) for (const phase of objective.phases || []) basePhaseById.set(phase.phase_id, phase);
  for (const item of normalizedProposal.phase_lineage || []) {
    const basePhase = basePhaseById.get(item.original_phase_id);
    if (basePhase && item.original_title !== basePhase.title) fail(`${label} lineage ${item.original_phase_id} original_title does not match the base phase title`);
    if (item.disposition === "preserved" && basePhase) {
      const normalizedPhase = proposalPhaseById.get(item.normalized_phase_id);
      if (normalizedPhase && normalizedPhase.title !== basePhase.title) fail(`${label} preserved phase ${item.original_phase_id} changed its title (${normalizedPhase.title})`);
    }
    if (item.disposition === "renamed_same_identity" && (!item.identity_invariant || !item.identity_invariant.length)) fail(`${label} renamed lineage ${item.original_phase_id} missing identity_invariant`);
    if (["merged_into", "dissolved_into", "replaced_by"].includes(item.disposition) && !item.absorbed_concerns) fail(`${label} lineage ${item.original_phase_id} missing absorbed_concerns`);
    if (item.disposition === "retired_from_strategic_model" && !item.retired_destination) fail(`${label} retired lineage ${item.original_phase_id} missing retired_destination`);
  }

  if (dispositionMap) {
    const mapLabel = dispositionMapPath;
    if (dispositionMap.status !== "draft_for_human_review") fail(`${mapLabel} status must be draft_for_human_review`);
    const entries = Array.isArray(dispositionMap.entries) ? dispositionMap.entries : [];
    const entryIds = new Set();
    const legacyRunIds = new Set(runs.map((run) => run.run_id));
    const activeCanonicalKeys = new Map();
    for (const item of entries) {
      if (entryIds.has(item.run_id)) fail(`${mapLabel} duplicate entry ${item.run_id}`);
      entryIds.add(item.run_id);
      if (!legacyRunIds.has(item.run_id)) fail(`${mapLabel} invented legacy run_id ${item.run_id}`);
      if (!allowedDispositions.has(item.disposition)) fail(`${mapLabel} ${item.run_id} unsupported disposition ${item.disposition}`);
      if (item.disposition === "history_or_archive" && !allowedHistorySubtypes.has(item.history_subtype)) {
        fail(`${mapLabel} ${item.run_id} history entry needs a valid history_subtype`);
      }
      if (typeof item.canonical_work_key !== "string" || !item.canonical_work_key.length) {
        fail(`${mapLabel} ${item.run_id} missing canonical_work_key`);
      }
      if (item.superseded_by && !legacyRunIds.has(item.superseded_by)) fail(`${mapLabel} ${item.run_id} superseded_by unresolvable`);
      for (const supersededId of item.supersedes || []) {
        if (!legacyRunIds.has(supersededId)) fail(`${mapLabel} ${item.run_id} supersedes unresolvable ${supersededId}`);
      }
      if (item.target_objective_id && !proposalObjectiveIds.has(item.target_objective_id)) fail(`${mapLabel} ${item.run_id} target objective unresolvable`);
      if (item.target_phase_id && !proposalPhaseIds.has(item.target_phase_id)) fail(`${mapLabel} ${item.run_id} target phase unresolvable`);
      if (item.target_deliverable_id && !proposalDeliverableIds.has(item.target_deliverable_id)) fail(`${mapLabel} ${item.run_id} target deliverable unresolvable`);
      if (item.target_family_id && !proposalFamilyIds.has(item.target_family_id)) fail(`${mapLabel} ${item.run_id} target family unresolvable`);
      // Canonical-work duplicate invariant: active canonical entries (real_run or
      // candidate_run_family without a valid superseded_by) must have unique work keys.
      // Multiple sibling runs under one objective/phase remain valid with distinct keys.
      const isActiveCanonical = (item.disposition === "real_run" || item.disposition === "candidate_run_family") && !item.superseded_by;
      if (isActiveCanonical) {
        if (activeCanonicalKeys.has(item.canonical_work_key)) {
          fail(`${mapLabel} duplicate active canonical work: ${item.canonical_work_key} (${activeCanonicalKeys.get(item.canonical_work_key)} vs ${item.run_id})`);
        }
        activeCanonicalKeys.set(item.canonical_work_key, item.run_id);
      }
    }
    for (const run of runs) {
      if (!entryIds.has(run.run_id)) fail(`${mapLabel} missing disposition for legacy run ${run.run_id}`);
    }
    // Declared totals must match computed totals.
    const entryById = new Map(entries.map((item) => [item.run_id, item]));
    const computedTotals = { disposition_totals: {}, history_subtype_totals: {}, provenance_strength_totals: {} };
    for (const item of entries) {
      computedTotals.disposition_totals[item.disposition] = (computedTotals.disposition_totals[item.disposition] || 0) + 1;
      if (item.history_subtype) computedTotals.history_subtype_totals[item.history_subtype] = (computedTotals.history_subtype_totals[item.history_subtype] || 0) + 1;
      if (item.provenance_strength) computedTotals.provenance_strength_totals[item.provenance_strength] = (computedTotals.provenance_strength_totals[item.provenance_strength] || 0) + 1;
    }
    for (const totalsField of ["disposition_totals", "history_subtype_totals", "provenance_strength_totals"]) {
      const declared = dispositionMap[totalsField];
      if (!declared || JSON.stringify(Object.entries(declared).sort()) !== JSON.stringify(Object.entries(computedTotals[totalsField]).sort())) {
        fail(`${mapLabel} declared ${totalsField} does not match computed totals`);
      }
    }
    // Disposition-specific readiness/visibility semantics, with readiness<->queue
    // compatibility validated as PAIRS and exact execution flags on every entry.
    const readinessQueuePairs = { active: ["now", "pending_human_review"], ready_next: ["ready_next"], ready_after_dependency: ["dependency_hold"], near_term_needs_scope: ["needs_scope"], future_strategic: ["none"] };
    for (const item of entries) {
      const dispositionKind = item.disposition;
      if (item.instantiated !== true && item.instantiated !== false) fail(`${mapLabel} ${item.run_id} missing exact instantiated flag`);
      if (item.executable !== true && item.executable !== false) fail(`${mapLabel} ${item.run_id} missing exact executable flag`);
      const expectedContract = dispositionKind === "real_run" ? false : dispositionKind === "candidate_run_family" ? true : false;
      if (item.run_contract_required !== expectedContract) fail(`${mapLabel} ${item.run_id} run_contract_required must be exactly ${expectedContract}`);
      if (item.readiness_state && readinessQueuePairs[item.readiness_state] && !readinessQueuePairs[item.readiness_state].includes(item.queue_visibility)) {
        fail(`${mapLabel} ${item.run_id} incompatible readiness/queue pair: ${item.readiness_state} + ${item.queue_visibility}`);
      }
      if (item.queue_visibility === "dependency_hold") {
        if (!Array.isArray(item.blocked_by) || !item.blocked_by.length) fail(`${mapLabel} ${item.run_id} dependency_hold requires non-empty blocked_by`);
        if (item.instantiated !== true || item.executable !== true) fail(`${mapLabel} ${item.run_id} dependency_hold must remain an instantiated, in-principle executable run`);
        for (const blockerId of item.blocked_by || []) {
          const blocker = entryById.get(blockerId);
          if (!blocker) fail(`${mapLabel} ${item.run_id} blocked_by unresolvable ${blockerId}`);
          else if (["dependency_or_gate_state", "guardrail_or_policy"].includes(blocker.disposition)) fail(`${mapLabel} ${item.run_id} misrepresents closed gate/guardrail ${blockerId} as a temporary dependency`);
        }
      }
      if (dispositionKind === "real_run") {
        if (item.instantiated !== true || item.executable !== true) fail(`${mapLabel} ${item.run_id} real_run must be instantiated/executable`);
        if (!["active", "ready_next", "ready_after_dependency"].includes(item.readiness_state)) fail(`${mapLabel} ${item.run_id} real_run unsupported readiness_state`);
      } else {
        if (item.instantiated !== false || item.executable !== false) fail(`${mapLabel} ${item.run_id} non-real_run must carry exact false execution flags`);
      }
      if (dispositionKind === "candidate_run_family" && !["near_term_needs_scope", "future_strategic"].includes(item.readiness_state)) {
        fail(`${mapLabel} ${item.run_id} candidate unsupported readiness_state`);
      }
      if (dispositionKind === "human_decision") {
        if (!item.decision_question || !Array.isArray(item.allowed_options) || !item.allowed_options.length || !item.proposed_next_action || !item.proposed_closeout_criteria) fail(`${mapLabel} ${item.run_id} decision record incomplete`);
        if (item.queue_visibility !== "needs_decision" || item.governance_visibility !== true) fail(`${mapLabel} ${item.run_id} decision visibility incorrect`);
      }
      if (dispositionKind === "nested_lifecycle_stage") {
        if (!item.canonical_parent) fail(`${mapLabel} ${item.run_id} lifecycle stage missing canonical_parent`);
        if (item.queue_visibility !== "detail") fail(`${mapLabel} ${item.run_id} lifecycle stage must have detail visibility only`);
      }
      if (["guardrail_or_policy", "dependency_or_gate_state"].includes(dispositionKind) && item.governance_visibility !== true) fail(`${mapLabel} ${item.run_id} must be governance-visible`);
      if (dispositionKind === "history_or_archive" && item.history_visibility !== true) fail(`${mapLabel} ${item.run_id} history entry must be history-visible`);
      if (["guardrail_or_policy", "dependency_or_gate_state", "maintenance_trigger", "history_or_archive", "duplicate_or_superseded"].includes(dispositionKind) && !["none", "detail"].includes(item.queue_visibility)) {
        fail(`${mapLabel} ${item.run_id} ${dispositionKind} must not appear in the active queue`);
      }
    }
    // Provenance: every entry needs non-empty refs plus an explicit strength classification;
    // specific evidence is mandatory for completed history, supersessions, decisions, and gates.
    const allowedProvenanceStrengths = new Set(["source_backed_specific", "legacy_generic_provenance", "operator_decision", "commit_backed", "run_note_backed", "governance_backed"]);
    for (const item of entries) {
      if (!Array.isArray(item.source_refs) || !item.source_refs.length) fail(`${mapLabel} ${item.run_id} has empty source_refs`);
      if (!allowedProvenanceStrengths.has(item.provenance_strength)) fail(`${mapLabel} ${item.run_id} missing/unsupported provenance_strength`);
      if (item.history_subtype === "completed_history" && item.provenance_strength !== "commit_backed") fail(`${mapLabel} ${item.run_id} completed history must be commit_backed`);
      if (item.disposition === "human_decision" && item.provenance_strength !== "operator_decision") fail(`${mapLabel} ${item.run_id} decisions must be operator_decision provenance`);
      if (item.disposition === "dependency_or_gate_state" && item.provenance_strength !== "governance_backed") fail(`${mapLabel} ${item.run_id} gate states must be governance_backed`);
      if (item.superseded_by && item.provenance_strength === "legacy_generic_provenance") fail(`${mapLabel} ${item.run_id} supersessions need specific provenance`);
      // Supersession symmetry: A.superseded_by = B iff B.supersedes contains A.
      if (item.superseded_by) {
        const target = entryById.get(item.superseded_by);
        if (!target || !(target.supersedes || []).includes(item.run_id)) fail(`${mapLabel} asymmetric supersession: ${item.run_id} -> ${item.superseded_by}`);
      }
      for (const supersededId of item.supersedes || []) {
        const target = entryById.get(supersededId);
        if (!target || target.superseded_by !== item.run_id) fail(`${mapLabel} asymmetric supersession: ${item.run_id} supersedes ${supersededId} without back-reference`);
      }
    }
    // Post-legacy runs must be explicitly acknowledged before any future Queue migration.
    const postLegacy = dispositionMap.post_legacy_run_reconciliation;
    const postLegacyIds = new Set((postLegacy?.runs || []).map((item) => item.run_id));
    for (const requiredPostLegacyRun of ["RUN-JAME-PROJECT-CONSOLE-ROADMAP-V2-IN-CONSOLE-DRAFT-VIEW-001", "RUN-JAME-ROADMAP-V2-CONTENT-AND-LEGACY-DISPOSITION-NORMALIZATION-001"]) {
      if (!postLegacyIds.has(requiredPostLegacyRun)) fail(`${mapLabel} post_legacy_run_reconciliation missing ${requiredPostLegacyRun}`);
    }
  }
}

const bodyCssMatch = projectConsoleCss.match(/body\s*{[^}]*font-size:\s*([0-9.]+)px/s);
if (!bodyCssMatch || Number(bodyCssMatch[1]) < 16) {
  fail("Project Console CSS body font-size must be at least 16px for operator readability");
}

const visibleLanguageSurfaces = [
  ["Project Console renderer", projectConsoleJs],
  ["Project Console snapshot", JSON.stringify(snapshot || {})]
];

const primaryDisplayText = [
  projectStatus?.current_focus?.work_item,
  projectStatus?.current_focus?.current_stage,
  projectStatus?.current_focus?.next_operator_action,
  snapshot?.current_status_summary?.current_focus,
  snapshot?.current_status_summary?.current_stage,
  snapshot?.current_status_summary?.next_operator_action,
  ...(runs.flatMap((run) => [
    run.operator_display_title,
    run.operator_display_summary,
    run.operator_next_action,
    run.operator_status_label,
    run.stage,
    run.lifecycle_stage,
    ...(run.stage_checklist || []).flatMap((stage) => [stage.label, stage.stage, stage.status])
  ])),
  ...((queue?.queue || []).flatMap((item) => [
    item.operator_display_title,
    item.operator_display_summary,
    item.operator_next_action,
    item.operator_status_label,
    item.stage,
    item.lifecycle_stage
  ]))
].filter(Boolean).join("\n");

for (const forbiddenPrimaryText of [
  "Roadmap Map",
  "Codex " + "review",
  "Claude " + "review",
  "Gemini " + "review"
]) {
  if (primaryDisplayText.includes(forbiddenPrimaryText)) {
    fail(`Primary operator text still includes provider-specific or legacy wording: ${forbiddenPrimaryText}`);
  }
}

const mojibakePatterns = [
  "\uFFFD",
  String.fromCharCode(0x00c3),
  String.fromCharCode(0x00c2),
  "Revisi" + "?",
  "Taxonom" + "?",
  "acci" + "?",
  "informaci" + "?",
  "certificaci" + "?",
  "descripci" + "?",
  "c" + "?digos",
  "t" + "?cnico",
  "pr" + "?ximo"
];
for (const pattern of mojibakePatterns) {
  for (const [surfaceLabel, surfaceText] of visibleLanguageSurfaces) {
    if (surfaceText.includes(pattern)) {
      fail(`${surfaceLabel} includes mojibake pattern ${JSON.stringify(pattern)}`);
    }
  }
}

if (!projectConsoleJs.includes("operatorRun(") || !projectConsoleJs.includes("operatorBadge(")) {
  fail("Project Console renderer must keep the operator-friendly presentation layer");
}

if (!projectConsoleJs.includes("operatorQueueModel(") || !projectConsoleJs.includes("renderStageStrip(")) {
  fail("Project Console renderer must group lifecycle stages under primary operator work items");
}

if (!events.length) {
  fail(".aiw/state/events.jsonl must include events");
}

if (!changeLedger.length) {
  fail(".aiw/ledgers/change_ledger.jsonl must include change ledger entries");
}

for (const jsonFile of listFiles(".aiw").filter((file) => file.endsWith(".json"))) {
  readJson(jsonFile);
}

for (const jsonlFile of listFiles(".aiw").filter((file) => file.endsWith(".jsonl"))) {
  readJsonl(jsonlFile);
}

if (errors.length > 0) {
  console.error("Project Console state validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Project Console state validation passed.");
console.log(`Objectives: ${objectives.length}`);
console.log(`Phases: ${phases.length}`);
console.log(`Runs: ${runs.length}`);
console.log(`Roadmap v2: ${roadmapV2?.status || "missing"} / ${roadmapV2?.objectives?.length || 0} objectives`);
if (roadmapV3Summary) {
  console.log(`Roadmap v3 prototype: ${roadmapV3Summary.objectives} objectives / ${roadmapV3Summary.phases} phases / ${roadmapV3Summary.runs} runs; queue groups ${ROADMAP_V3_QUEUE_GROUP_KEYS.map((key) => `${key}=${roadmapV3Summary.groupCounts[key]}`).join(" ")}`);
  if (roadmapV3Summary.activeDerivedStages.length) {
    console.log(`Roadmap v3 active run derived stages: ${roadmapV3Summary.activeDerivedStages.join(" ")}`);
  }
} else {
  console.log("Roadmap v3 prototype: missing");
}
console.log(`Docs indexed: ${docsIndex.docs.length}`);
console.log(`Docs curated primary-visible: ${docsIndex.docs.filter((doc) => doc.default_visible === true || doc.nav_tier === "primary").length} of ${docsIndex.docs.length} registered`);
console.log(`Component statuses: ${componentStatus.components.length}`);
console.log(`Git provenance episodes: ${gitProvenance.length}`);
if (gitHistorySummary) {
  console.log(`Git history snapshot: ${gitHistorySummary.commits} commits / ${gitHistorySummary.branches} branches (${gitHistorySummary.visible} visible, ${gitHistorySummary.hidden} backup hidden); current=${gitHistorySummary.current}; run-associated=${gitHistorySummary.associated}; source=${gitHistorySummary.source}`);
  if (gitHistorySummary.hidden > 0) {
    console.log(`  note: ${gitHistorySummary.hidden} backup/* branch(es) remain in the snapshot; restart serve-project-console.mjs to regenerate and drop them from History.`);
  }
} else {
  console.log("Git history snapshot: not present (generated locally by serve-project-console.mjs).");
}
console.log("Roadmap rebase field model lite:");
console.log(`  Records with field model support: ${roadmapRebaseReadiness.records_with_field_model_support}`);
console.log(`  Queue records with populated display_group: ${roadmapRebaseReadiness.populated_queue_records}`);
console.log(`  display_group counts: ${countSummary(roadmapRebaseReadiness.by_display_group)}`);
console.log(`  execution_readiness counts: ${countSummary(roadmapRebaseReadiness.by_execution_readiness)}`);
console.log(`  default_visibility counts: ${countSummary(roadmapRebaseReadiness.by_default_visibility)}`);
console.log(`  claim_boundary counts: ${countSummary(roadmapRebaseReadiness.by_claim_boundary)}`);
console.log(`  Follow-up linkage gaps: ${roadmapRebaseReadiness.followup_linkage_gaps.length}${roadmapRebaseReadiness.followup_linkage_gaps.length ? ` (${firstIds(roadmapRebaseReadiness.followup_linkage_gaps)})` : ""}`);
console.log(`  blocked_by gaps: ${roadmapRebaseReadiness.blocked_by_gaps.length}${roadmapRebaseReadiness.blocked_by_gaps.length ? ` (${firstIds(roadmapRebaseReadiness.blocked_by_gaps)})` : ""}`);
console.log(`  Certification language cleanup candidates: ${roadmapRebaseReadiness.certification_language_cleanup_candidates.length}${roadmapRebaseReadiness.certification_language_cleanup_candidates.length ? ` (${firstIds(roadmapRebaseReadiness.certification_language_cleanup_candidates)})` : ""}`);
console.log(`  Certification claim_boundary gaps: ${roadmapRebaseReadiness.certification_claim_boundary_gaps.length}${roadmapRebaseReadiness.certification_claim_boundary_gaps.length ? ` (${firstIds(roadmapRebaseReadiness.certification_claim_boundary_gaps)})` : ""}`);
console.log(`  Map-only/archive candidates: ${roadmapRebaseReadiness.map_only_archive_candidates.length}${roadmapRebaseReadiness.map_only_archive_candidates.length ? ` (${firstIds(roadmapRebaseReadiness.map_only_archive_candidates)})` : ""}`);
console.log(`  Map-only/archive classification gaps: ${roadmapRebaseReadiness.map_only_archive_gaps.length}${roadmapRebaseReadiness.map_only_archive_gaps.length ? ` (${firstIds(roadmapRebaseReadiness.map_only_archive_gaps)})` : ""}`);
console.log(`  Ready next candidates: ${roadmapRebaseReadiness.ready_next_candidates.length}${roadmapRebaseReadiness.ready_next_candidates.length ? ` (${firstIds(roadmapRebaseReadiness.ready_next_candidates)})` : ""}`);
if (warnings.length) {
  console.log("Roadmap rebase warnings (non-blocking):");
  for (const warning of warnings) {
    console.log(`- ${warning}`);
  }
}
