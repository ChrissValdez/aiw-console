// roadmap-core.mjs
//
// Library for safe, byte-preserving maintenance of a roadmap-tree source file
// (objectives -> phases -> runs). TRANSPLANTED byte-for-byte from the source
// project's roadmap tooling (O4.P12); the surgical touches on the copy are
// marked [O4.P12] where they live and are enumerated in the phase record. The
// file it maintains is whichever canonical roadmap the caller hands it -- the
// path comes from the project's resolved root layout, never from this module.
//
// This module owns: load, serialize (byte-exact against the file's OWN line
// endings), the queue_order model, the mutations, a LIMITED in-memory invariant
// pre-check, and the atomic write path. It performs no I/O beyond the file it
// is handed and never runs Git. The authoritative post-write gate is whatever
// `validate` callback the caller injects into applyWrite (rollback on failure).
//
// Q1 scope: the in-memory checkInvariants() is LIMITED to what the operations
// inherently need -- field allowlist, run_id/identity immutability, queue_order
// uniqueness+contiguity, dependency precedence, dangling depends_on, cycles.
// The tree is admitted by its FORM (these field checks), never by the string
// its schema_version declares: the two real roadmaps this console edits declare
// different model identifiers over the same structure, and both are served.

import fs from "node:fs";
import path from "node:path";
import os from "node:os";

// ---------------------------------------------------------------------------
// Vocabulary (mirrors the validator's v3 allowlists; kept minimal per Q1)
// ---------------------------------------------------------------------------

export const ROOT_ALLOWED_FIELDS = ["schema_version", "roadmap_id", "title", "objectives"];
export const OBJECTIVE_REQUIRED_FIELDS = ["objective_id", "title", "phases"];
export const OBJECTIVE_OPTIONAL_FIELDS = ["archived"];
export const OBJECTIVE_ALLOWED_FIELDS = [...OBJECTIVE_REQUIRED_FIELDS, ...OBJECTIVE_OPTIONAL_FIELDS];
export const PHASE_ALLOWED_FIELDS = ["phase_id", "title", "runs"];
export const RUN_REQUIRED_FIELDS = ["run_id", "queue_order", "title", "summary", "full_description", "status", "depends_on"];
export const RUN_OPTIONAL_FIELDS = ["closeout_result", "progress"];
// Canonical serialization order for a run object's keys.
export const CANONICAL_RUN_KEY_ORDER = [...RUN_REQUIRED_FIELDS, ...RUN_OPTIONAL_FIELDS];
export const RUN_ALLOWED_FIELDS = CANONICAL_RUN_KEY_ORDER;
export const STATUSES = ["planned", "active", "completed", "blocked"];
export const TERMINAL_STATUSES = ["completed", "blocked"];
export const TEXT_FIELDS = ["title", "summary", "full_description"];
// Advisory only (Q7: warn, never block).
export const RUN_ID_PATTERN = /^RUN-[A-Z0-9-]+-\d{3}$/;

// ---------------------------------------------------------------------------
// Load / serialize
// ---------------------------------------------------------------------------

export function loadRaw(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

export function parseRoadmap(raw) {
  return JSON.parse(raw);
}

// PROVEN byte-exact serializer: standard 2-space stringify, then every structural
// LF becomes the file's OWN line ending, then one trailing newline. JSON.stringify
// escapes any newline inside a string value as "\\n", so the only raw \n bytes are
// structural.
//
// [O4.P12] The line ending became a parameter, measured off the file being edited
// (detectEol below), because the two real canonical roadmaps differ: one is CRLF,
// the other LF. Round-tripping each file byte-identical is proven by test for
// both. The default stays CRLF -- the transplant's frozen behaviour.
export function serialize(obj, eol = "\r\n") {
  return JSON.stringify(obj, null, 2).replace(/\n/g, eol) + eol;
}

// [O4.P12] The file's own line-ending convention: any CRLF present means CRLF
// (a mixed file normalizes to CRLF); otherwise LF. Both real roadmaps are pure.
export function detectEol(raw) {
  return raw.includes("\r\n") ? "\r\n" : "\n";
}

// ---------------------------------------------------------------------------
// Traversal helpers
// ---------------------------------------------------------------------------

export function flattenRuns(obj) {
  const out = [];
  for (const objective of obj.objectives || []) {
    for (const phase of objective.phases || []) {
      for (const run of phase.runs || []) {
        out.push({ run, phase, objective });
      }
    }
  }
  return out;
}

export function globalOrdered(obj) {
  return flattenRuns(obj)
    .map((entry) => entry.run)
    .sort((a, b) => a.queue_order - b.queue_order);
}

export function findRunEntry(obj, runId) {
  return flattenRuns(obj).find((entry) => entry.run.run_id === runId) || null;
}

export function findPhaseEntry(obj, phaseId) {
  for (const objective of obj.objectives || []) {
    for (const phase of objective.phases || []) {
      if (phase.phase_id === phaseId) return { phase, objective };
    }
  }
  return null;
}

export function findObjective(obj, objectiveId) {
  return (obj.objectives || []).find((objective) => objective.objective_id === objectiveId) || null;
}

export function collectIds(obj) {
  const objectives = new Set();
  const phases = new Set();
  const runs = new Set();
  for (const objective of obj.objectives || []) {
    objectives.add(objective.objective_id);
    for (const phase of objective.phases || []) {
      phases.add(phase.phase_id);
      for (const run of phase.runs || []) {
        runs.add(run.run_id);
      }
    }
  }
  return { objectives, phases, runs };
}

export function queueOrderMap(obj) {
  const map = new Map();
  for (const run of globalOrdered(obj)) map.set(run.run_id, run.queue_order);
  return map;
}

// Rebuild a run's keys in canonical order in place (so an added optional field
// such as closeout_result lands before progress, matching the file style).
export function normalizeRunKeyOrder(run) {
  const ordered = {};
  for (const key of CANONICAL_RUN_KEY_ORDER) {
    if (key in run) ordered[key] = run[key];
  }
  for (const key of Object.keys(run)) {
    if (!(key in ordered)) ordered[key] = run[key]; // preserve anything unexpected; allowlist will flag it
  }
  for (const key of Object.keys(run)) delete run[key];
  for (const key of Object.keys(ordered)) run[key] = ordered[key];
}

// ---------------------------------------------------------------------------
// Ordering: reassign queue_order = index+1 over a desired global order, then
// keep each phase's runs physically ascending by queue_order (Q3).
// ---------------------------------------------------------------------------

function applyOrder(obj, ordered) {
  ordered.forEach((run, index) => {
    run.queue_order = index + 1;
  });
  for (const objective of obj.objectives || []) {
    for (const phase of objective.phases || []) {
      phase.runs.sort((a, b) => a.queue_order - b.queue_order);
    }
  }
}

// ---------------------------------------------------------------------------
// LIMITED invariant pre-check (Q1). Accumulates, never throws.
//
// [O4.P12] `externalRunIds` is the set of run ids declared by OTHER registered
// projects' roadmap trees, supplied by the caller (the server composes it from
// the project registry; this module knows no project by name). CONTRATO §10.d:
// a depends_on entry that resolves in another project's tree is LEGAL; only an
// id that resolves NOWHERE is a dangling dependency. Without this, the one real
// cross-project edge in today's data makes its whole file uneditable -- the
// pre-flight refuses before any operation can run. External edges skip the
// queue_order precedence rule (the two files do not share a queue) and are
// invisible to the cycle walk (it only follows in-file edges).
// ---------------------------------------------------------------------------

export function checkInvariants(obj, { externalRunIds = null } = {}) {
  const errors = [];

  if (!obj || typeof obj !== "object" || Array.isArray(obj)) {
    return ["roadmap root is not an object"];
  }

  // Root field allowlist (no new fields; no schema drift).
  for (const key of Object.keys(obj)) {
    if (!ROOT_ALLOWED_FIELDS.includes(key)) {
      errors.push(`root carries unexpected field ${key}; only ${ROOT_ALLOWED_FIELDS.join(", ")} are allowed`);
    }
  }
  if (!Array.isArray(obj.objectives)) {
    errors.push("root.objectives must be an array");
    return errors;
  }

  const allRuns = [];
  for (const objective of obj.objectives) {
    const objectiveLabel = `objective ${objective && objective.objective_id ? objective.objective_id : "UNKNOWN"}`;
    if (!objective || typeof objective !== "object") {
      errors.push(`${objectiveLabel} is not an object`);
      continue;
    }
    if (typeof objective.objective_id !== "string" || !objective.objective_id) {
      errors.push(`${objectiveLabel} missing string objective_id`);
    }
    for (const key of Object.keys(objective)) {
      if (!OBJECTIVE_ALLOWED_FIELDS.includes(key)) {
        errors.push(`${objectiveLabel} carries unexpected field ${key}`);
      }
    }
    for (const field of OBJECTIVE_OPTIONAL_FIELDS) {
      if (field in objective && objective[field] !== true) {
        errors.push(`${objectiveLabel} must omit ${field} unless true; it is never stored as false or null`);
      }
    }
    if (!Array.isArray(objective.phases)) {
      errors.push(`${objectiveLabel} phases must be an array`);
      continue;
    }
    for (const phase of objective.phases) {
      const phaseLabel = `phase ${phase && phase.phase_id ? phase.phase_id : "UNKNOWN"}`;
      if (!phase || typeof phase !== "object") {
        errors.push(`${phaseLabel} is not an object`);
        continue;
      }
      if (typeof phase.phase_id !== "string" || !phase.phase_id) {
        errors.push(`${phaseLabel} missing string phase_id`);
      }
      for (const key of Object.keys(phase)) {
        if (!PHASE_ALLOWED_FIELDS.includes(key)) {
          errors.push(`${phaseLabel} carries unexpected field ${key}`);
        }
      }
      if (!Array.isArray(phase.runs)) {
        errors.push(`${phaseLabel} runs must be an array`);
        continue;
      }
      for (const run of phase.runs) {
        const runLabel = `run ${run && run.run_id ? run.run_id : "UNKNOWN"}`;
        if (!run || typeof run !== "object") {
          errors.push(`${runLabel} is not an object`);
          continue;
        }
        if (typeof run.run_id !== "string" || !run.run_id) {
          errors.push(`${runLabel} missing string run_id`);
        }
        for (const field of RUN_REQUIRED_FIELDS) {
          if (!(field in run)) errors.push(`${runLabel} missing required field ${field}`);
        }
        for (const key of Object.keys(run)) {
          if (!RUN_ALLOWED_FIELDS.includes(key)) {
            errors.push(`${runLabel} carries unexpected field ${key}`);
          }
        }
        allRuns.push(run);
      }
    }
  }

  // Duplicate identity ids.
  const seenRunIds = new Set();
  for (const run of allRuns) {
    if (seenRunIds.has(run.run_id)) errors.push(`duplicate run_id ${run.run_id}`);
    seenRunIds.add(run.run_id);
  }

  // queue_order: positive integers, unique, contiguous 1..N.
  const orders = allRuns.map((run) => run.queue_order);
  for (const order of orders) {
    if (!Number.isInteger(order) || order < 1) {
      errors.push(`queue_order values must be positive integers; found ${order}`);
    }
  }
  if (new Set(orders).size !== orders.length) {
    errors.push("queue_order values must be unique");
  }
  const sorted = [...orders].sort((a, b) => a - b);
  if (sorted.length && (sorted[0] !== 1 || sorted[sorted.length - 1] !== sorted.length)) {
    errors.push(`queue_order values must be contiguous from 1 to ${sorted.length}`);
  }

  // Dependencies: array, exists (no orphan), strict precedence, no self, no dup.
  const runsById = new Map(allRuns.map((run) => [run.run_id, run]));
  for (const run of allRuns) {
    if (!Array.isArray(run.depends_on)) {
      errors.push(`run ${run.run_id} depends_on must be an array`);
      continue;
    }
    const seenDeps = new Set();
    for (const depId of run.depends_on) {
      if (depId === run.run_id) errors.push(`run ${run.run_id} must not depend on itself`);
      if (seenDeps.has(depId)) errors.push(`run ${run.run_id} lists duplicate dependency ${depId}`);
      seenDeps.add(depId);
      const dep = runsById.get(depId);
      if (!dep) {
        // [O4.P12] Not in this file: legal when another registered project declares it
        // (CONTRATO §10.d), dangling when nothing does.
        if (!(externalRunIds && externalRunIds.has(depId))) {
          errors.push(`run ${run.run_id} depends on unknown run ${depId} (dangling dependency: declared by no registered project)`);
        }
      } else if (!(dep.queue_order < run.queue_order)) {
        errors.push(`run ${run.run_id} (queue_order ${run.queue_order}) must depend only on earlier runs; ${depId} has queue_order ${dep.queue_order}`);
      }
    }
  }

  // Cycles (DFS: 1 = visiting, 2 = done).
  const state = new Map();
  const stack = [];
  let cycleReported = false;
  const visit = (runId) => {
    if (cycleReported) return;
    state.set(runId, 1);
    stack.push(runId);
    const run = runsById.get(runId);
    for (const depId of (run && run.depends_on) || []) {
      const s = state.get(depId);
      if (s === 1) {
        errors.push(`dependency cycle detected involving ${depId}`);
        cycleReported = true;
        break;
      } else if (!s && runsById.has(depId)) {
        visit(depId);
        if (cycleReported) break;
      }
    }
    stack.pop();
    state.set(runId, 2);
  };
  for (const run of allRuns) {
    if (!state.get(run.run_id)) visit(run.run_id);
    if (cycleReported) break;
  }

  return errors;
}

// Identity guard: no command may change the set of *_id values, except an
// intended run insert (+1 run id) or remove (-1 run id), an intended phase
// create (+1 phase id) or delete (-1 phase id), or an intended objective
// create (+1 objective id) or delete (-1 objective id).
//
// Every sanctioned id is a single id or null: a container op creates or deletes
// exactly one container, so "at most one" is a property of the type rather than
// a rule someone can forget. Each slot feeds ONLY its own cmp() call, so a
// sanctioned phase id can never license an unexpected objective or run id.
//
// Container deletion is refuse-if-not-empty (it never cascades), so a deleted
// phase holds no runs and a deleted objective holds no phases: a container op
// must NEVER change the run set. cmp("run", ...) is therefore left exactly as it
// was and stands as an INDEPENDENT trap -- if a container op ever drops a
// non-empty container, the run guard still fires even though the container id
// was sanctioned. The sanction is narrow by construction, not a rubber stamp.
//
// The sanctioned ids must come from what the mutation DID (its result), never
// from what the caller ASKED for (its args); see planEdit in roadmap-plan.mjs.
export function checkIdentityPreserved(
  beforeIds,
  afterIds,
  {
    addedRun = null,
    removedRun = null,
    addedPhase = null,
    removedPhase = null,
    addedObjective = null,
    removedObjective = null,
  } = {}
) {
  const errors = [];
  const cmp = (label, before, after, added, removed) => {
    const expected = new Set(before);
    if (added) expected.add(added);
    if (removed) expected.delete(removed);
    for (const id of after) {
      if (!expected.has(id)) errors.push(`${label} identity changed: unexpected id ${id} appeared`);
    }
    for (const id of expected) {
      if (!after.has(id)) errors.push(`${label} identity changed: id ${id} disappeared`);
    }
  };
  cmp("objective", beforeIds.objectives, afterIds.objectives, addedObjective, removedObjective);
  cmp("phase", beforeIds.phases, afterIds.phases, addedPhase, removedPhase);
  cmp("run", beforeIds.runs, afterIds.runs, addedRun, removedRun);
  return errors;
}

// ---------------------------------------------------------------------------
// Status <-> progress coupling (Q5). NEVER fabricate or edit progress.
// active MAY carry no progress -- symmetric with terminal -- because progress is an
// execution record that only AIW writes; set-status/insert never synthesize it. When
// a progress array IS present on an active run it must still expose a waiting/running
// frontier. planned carries none; terminal, when present, is all-done.
// Returns error strings naming exactly what is missing.
// ---------------------------------------------------------------------------

export function statusProgressErrors(run, newStatus, closeoutResult, label) {
  const errors = [];
  const hasProgress = Array.isArray(run.progress) && run.progress.length > 0;
  const isTerminal = TERMINAL_STATUSES.includes(newStatus);

  if (newStatus === "active" && hasProgress) {
    // active MAY carry no progress; but a progress array that IS present must expose a
    // waiting/running frontier -- an active run whose record is all-done is incoherent.
    const hasFrontier = run.progress.some((e) => e && (e.state === "waiting" || e.state === "running"));
    if (!hasFrontier) {
      errors.push(`${label}: setting status to active requires a waiting/running frontier in progress; none present and set-status does not edit progress`);
    }
  }
  if (newStatus === "planned" && hasProgress) {
    errors.push(`${label}: planned runs must not carry progress, but this run has a progress array; set-status does not remove progress`);
  }
  if (isTerminal && hasProgress) {
    const allDone = run.progress.every((e) => e && e.state === "done");
    if (!allDone) {
      errors.push(`${label}: closing to ${newStatus} requires every progress entry to be done; some are not and set-status does not edit progress`);
    }
  }
  if (closeoutResult != null && !isTerminal) {
    errors.push(`${label}: closeout_result is only valid on completed/blocked runs, not ${newStatus}`);
  }
  if (!isTerminal && "closeout_result" in run && closeoutResult == null) {
    errors.push(`${label}: run carries closeout_result (valid only on terminal runs); moving to ${newStatus} would leave an invalid field. Use a terminal status.`);
  }
  return errors;
}

// ---------------------------------------------------------------------------
// Mutations. Each validates its own preconditions first and mutates obj only
// when it returns no errors. Global invariants are re-checked by the caller.
// ---------------------------------------------------------------------------

export function insertRun(obj, opts) {
  const errors = [];
  const warnings = [];
  const { runId, title, summary, fullDescription, status = "planned", dependsOn = [], after, before, endOfPhase } = opts;

  if (!runId) errors.push("insert requires --run-id");
  if (title == null) errors.push("insert requires --title");
  if (summary == null) errors.push("insert requires --summary");
  if (fullDescription == null) errors.push("insert requires --full-description");
  const anchors = [after, before, endOfPhase].filter((v) => v != null);
  if (anchors.length !== 1) errors.push("insert requires exactly one of --after, --before, --end-of-phase");
  if (runId && findRunEntry(obj, runId)) errors.push(`insert: run_id ${runId} already exists (identity must be unique)`);
  if (!STATUSES.includes(status)) errors.push(`insert: unsupported status ${status}`);

  let targetPhase = null;
  let targetIndex = null;
  const ordered = globalOrdered(obj);

  if (after != null) {
    const entry = findRunEntry(obj, after);
    if (!entry) errors.push(`insert --after: run ${after} not found`);
    else {
      targetPhase = entry.phase;
      targetIndex = ordered.findIndex((r) => r.run_id === after) + 1;
    }
  } else if (before != null) {
    const entry = findRunEntry(obj, before);
    if (!entry) errors.push(`insert --before: run ${before} not found`);
    else {
      targetPhase = entry.phase;
      targetIndex = ordered.findIndex((r) => r.run_id === before);
    }
  } else if (endOfPhase != null) {
    const entry = findPhaseEntry(obj, endOfPhase);
    if (!entry) errors.push(`insert --end-of-phase: phase ${endOfPhase} not found`);
    else {
      targetPhase = entry.phase;
      if (entry.phase.runs.length === 0) {
        targetIndex = ordered.length; // append globally
        warnings.push(`insert --end-of-phase: phase ${endOfPhase} has no runs; new run appended at the global end`);
      } else {
        const maxOrder = Math.max(...entry.phase.runs.map((r) => r.queue_order));
        targetIndex = ordered.findIndex((r) => r.queue_order === maxOrder) + 1;
      }
    }
  }

  if (runId && !RUN_ID_PATTERN.test(runId)) {
    warnings.push(`insert: run_id ${runId} does not match the RUN-...-NNN convention (allowed, not blocked)`);
  }

  // Build the candidate run so status coupling can inspect it (no progress).
  const newRun = {
    run_id: runId,
    queue_order: 0,
    title,
    summary,
    full_description: fullDescription,
    status,
    depends_on: Array.isArray(dependsOn) ? [...dependsOn] : [],
  };
  errors.push(...statusProgressErrors(newRun, status, null, `insert ${runId}`));

  if (errors.length) return { errors, warnings };

  targetPhase.runs.push(newRun);
  const nextOrder = ordered.slice();
  nextOrder.splice(targetIndex, 0, newRun);
  applyOrder(obj, nextOrder);
  normalizeRunKeyOrder(newRun);

  return { errors, warnings, newRun, addedRun: runId };
}

export function moveRun(obj, opts) {
  const errors = [];
  const warnings = [];
  const { run, after, before, toOrder, toPhase } = opts;

  if (!run) errors.push("move requires --run");
  const positions = [after, before, toOrder].filter((v) => v != null);
  if (positions.length !== 1) errors.push("move requires exactly one of --after, --before, --to-order");

  const entry = run ? findRunEntry(obj, run) : null;
  if (run && !entry) errors.push(`move: run ${run} not found`);

  let toPhaseEntry = null;
  if (toPhase != null) {
    toPhaseEntry = findPhaseEntry(obj, toPhase);
    if (!toPhaseEntry) errors.push(`move --to-phase: phase ${toPhase} not found`);
  }

  if (errors.length) return { errors, warnings };

  const ordered = globalOrdered(obj);
  const reduced = ordered.filter((r) => r.run_id !== run);
  let targetIndex = null;

  if (after != null) {
    if (after === run) errors.push("move --after cannot reference the run being moved");
    const idx = reduced.findIndex((r) => r.run_id === after);
    if (idx < 0) errors.push(`move --after: run ${after} not found`);
    else targetIndex = idx + 1;
  } else if (before != null) {
    if (before === run) errors.push("move --before cannot reference the run being moved");
    const idx = reduced.findIndex((r) => r.run_id === before);
    if (idx < 0) errors.push(`move --before: run ${before} not found`);
    else targetIndex = idx;
  } else if (toOrder != null) {
    const n = Number(toOrder);
    if (!Number.isInteger(n) || n < 1 || n > ordered.length) {
      errors.push(`move --to-order must be an integer in 1..${ordered.length}; got ${toOrder}`);
    } else {
      targetIndex = n - 1;
    }
  }

  if (errors.length) return { errors, warnings };

  // Relocate the object between phase arrays only if --to-phase was given (Q2).
  if (toPhaseEntry) {
    const src = entry.phase.runs;
    const i = src.findIndex((r) => r.run_id === run);
    const [obj0] = src.splice(i, 1);
    toPhaseEntry.phase.runs.push(obj0);
  }

  reduced.splice(targetIndex, 0, entry.run);
  applyOrder(obj, reduced);

  return { errors, warnings, movedRun: run };
}

export function removeRun(obj, opts) {
  const errors = [];
  const warnings = [];
  const { run, reassignDependentsTo, dropDependentEdges } = opts;

  if (!run) errors.push("remove requires --run");
  const entry = run ? findRunEntry(obj, run) : null;
  if (run && !entry) errors.push(`remove: run ${run} not found`);
  if (reassignDependentsTo != null && dropDependentEdges) {
    errors.push("remove: use only one of --reassign-dependents-to and --drop-dependent-edges");
  }
  if (errors.length) return { errors, warnings };

  const dependents = flattenRuns(obj)
    .map((e) => e.run)
    .filter((r) => Array.isArray(r.depends_on) && r.depends_on.includes(run));

  if (dependents.length > 0 && reassignDependentsTo == null && !dropDependentEdges) {
    errors.push(
      `remove: ${dependents.length} run(s) depend on ${run} (${dependents.map((r) => r.run_id).join(", ")}). ` +
      "Refusing. Pass --reassign-dependents-to RUN-Y or --drop-dependent-edges."
    );
    return { errors, warnings };
  }

  if (reassignDependentsTo != null) {
    if (reassignDependentsTo === run) errors.push("remove --reassign-dependents-to cannot be the run being removed");
    const target = findRunEntry(obj, reassignDependentsTo);
    if (!target) errors.push(`remove --reassign-dependents-to: run ${reassignDependentsTo} not found`);
    if (errors.length) return { errors, warnings };
    for (const dep of dependents) {
      dep.depends_on = dep.depends_on
        .map((id) => (id === run ? reassignDependentsTo : id))
        .filter((id, i, arr) => arr.indexOf(id) === i && id !== dep.run_id);
    }
  } else if (dropDependentEdges) {
    for (const dep of dependents) {
      dep.depends_on = dep.depends_on.filter((id) => id !== run);
    }
  }

  // Remove from its phase array and from the global order.
  const src = entry.phase.runs;
  src.splice(src.findIndex((r) => r.run_id === run), 1);
  const reduced = globalOrdered(obj).filter((r) => r.run_id !== run);
  applyOrder(obj, reduced);

  return { errors, warnings, removedRun: run, reassignedDependents: dependents.map((r) => r.run_id) };
}

export function swapRuns(obj, opts) {
  const errors = [];
  const warnings = [];
  const { run, withRun } = opts;

  if (!run) errors.push("swap requires --run");
  if (!withRun) errors.push("swap requires --with");
  if (run && withRun && run === withRun) errors.push("swap: --run and --with must differ");
  const a = run ? findRunEntry(obj, run) : null;
  const b = withRun ? findRunEntry(obj, withRun) : null;
  if (run && !a) errors.push(`swap: run ${run} not found`);
  if (withRun && !b) errors.push(`swap: run ${withRun} not found`);
  if (errors.length) return { errors, warnings };

  const tmp = a.run.queue_order;
  a.run.queue_order = b.run.queue_order;
  b.run.queue_order = tmp;
  applyOrder(obj, globalOrdered(obj));

  return { errors, warnings, swapped: [run, withRun] };
}

export function setText(obj, opts) {
  const errors = [];
  const warnings = [];
  const { targetType, targetId, title, summary, fullDescription } = opts;

  const provided = { title, summary, full_description: fullDescription };
  const providedKeys = Object.keys(provided).filter((k) => provided[k] != null);
  if (providedKeys.length === 0) {
    errors.push("set-text requires at least one of --title, --summary, --full-description");
  }

  let node = null;
  if (targetType === "run") {
    const entry = findRunEntry(obj, targetId);
    if (!entry) errors.push(`set-text --run: run ${targetId} not found`);
    else node = entry.run;
  } else if (targetType === "phase") {
    const entry = findPhaseEntry(obj, targetId);
    if (!entry) errors.push(`set-text --phase: phase ${targetId} not found`);
    else node = entry.phase;
  } else if (targetType === "objective") {
    const found = findObjective(obj, targetId);
    if (!found) errors.push(`set-text --objective: objective ${targetId} not found`);
    else node = found;
  } else {
    errors.push("set-text requires exactly one of --run, --phase, --objective");
  }

  // Phases and objectives carry only a title now; summary and full_description were removed
  // from those levels entirely. Runs are unchanged and still accept all three.
  if ((targetType === "phase" || targetType === "objective") && (summary != null || fullDescription != null)) {
    errors.push(`set-text: ${targetType}s carry only a title; summary and full_description were removed from ${targetType}s and cannot be set`);
  }

  if (errors.length) return { errors, warnings };

  const before = {};
  const after = {};
  for (const key of providedKeys) {
    before[key] = node[key];
    node[key] = provided[key];
    after[key] = provided[key];
  }
  return { errors, warnings, targetType, targetId, before, after };
}

export function setDeps(obj, opts) {
  const errors = [];
  const warnings = [];
  // [O4.P12] `externalRunIds` mirrors checkInvariants: a dependency declared by another
  // registered project's tree is accepted with a warning naming it external, instead of
  // being refused as unknown (CONTRATO §10.d — external is legal, dangling is malformed).
  const { run, dependsOn, addDep, removeDep, externalRunIds = null } = opts;

  if (!run) errors.push("set-deps requires --run");
  const modes = [dependsOn != null, addDep != null, removeDep != null].filter(Boolean).length;
  if (modes !== 1) errors.push("set-deps requires exactly one of --depends-on, --add-dep, --remove-dep");
  const entry = run ? findRunEntry(obj, run) : null;
  if (run && !entry) errors.push(`set-deps: run ${run} not found`);
  if (errors.length) return { errors, warnings };

  const current = Array.isArray(entry.run.depends_on) ? [...entry.run.depends_on] : [];
  let next;
  if (dependsOn != null) {
    next = [...dependsOn];
  } else if (addDep != null) {
    next = current.includes(addDep) ? current : [...current, addDep];
  } else {
    if (!current.includes(removeDep)) warnings.push(`set-deps --remove-dep: ${run} did not depend on ${removeDep}`);
    next = current.filter((id) => id !== removeDep);
  }

  // Dedup while preserving order; reject self-dependency explicitly.
  const seen = new Set();
  const deduped = [];
  for (const id of next) {
    if (id === run) {
      errors.push(`set-deps: ${run} must not depend on itself`);
      continue;
    }
    if (!findRunEntry(obj, id)) {
      if (externalRunIds && externalRunIds.has(id)) {
        warnings.push(`set-deps: dependency ${id} resolves outside this roadmap (external, declared by another registered project)`);
      } else {
        errors.push(`set-deps: dependency ${id} is not a known run in this roadmap or any registered project`);
      }
    }
    if (!seen.has(id)) {
      seen.add(id);
      deduped.push(id);
    }
  }
  if (errors.length) return { errors, warnings };

  const before = current;
  entry.run.depends_on = deduped;
  return { errors, warnings, run, before, after: deduped };
}

export function setStatus(obj, opts) {
  const errors = [];
  const warnings = [];
  const { run, status, closeoutResult } = opts;

  if (!run) errors.push("set-status requires --run");
  if (!status) errors.push("set-status requires --status");
  if (status && !STATUSES.includes(status)) errors.push(`set-status: unsupported status ${status}`);
  const entry = run ? findRunEntry(obj, run) : null;
  if (run && !entry) errors.push(`set-status: run ${run} not found`);
  if (errors.length) return { errors, warnings };

  errors.push(...statusProgressErrors(entry.run, status, closeoutResult != null ? closeoutResult : null, `set-status ${run}`));
  if (errors.length) return { errors, warnings };

  const before = { status: entry.run.status, closeout_result: entry.run.closeout_result };
  entry.run.status = status;
  const isTerminal = TERMINAL_STATUSES.includes(status);
  if (closeoutResult != null) {
    entry.run.closeout_result = closeoutResult;
  }
  if (!isTerminal && "closeout_result" in entry.run) {
    delete entry.run.closeout_result;
  }
  normalizeRunKeyOrder(entry.run);
  const after = { status: entry.run.status, closeout_result: entry.run.closeout_result };
  return { errors, warnings, run, before, after };
}

// ---------------------------------------------------------------------------
// Progress retirement (extension). clear-progress REMOVES the optional progress
// key from ONE run and does nothing else. It never touches status, queue_order,
// depends_on, closeout_result or any text field, and it never edits, trims or
// fabricates a progress entry: the key is deleted WHOLE.
//
// Deleting the key -- not emptying the array -- is the only correct shape. A run
// without a record is written with no progress key anywhere else in this tool
// (insertRun seeds none, RUN_OPTIONAL_FIELDS makes it optional), and the
// validator rejects `progress: []` outright ("progress must be a non-empty
// array"). An emptied array would be a third state the file model does not have.
//
// WHY IT EXISTS. statusProgressErrors refuses to close a run to completed/blocked
// while any progress entry is not done, and NEITHER set-status nor insert edits
// progress. So an active run whose record cannot honestly be marked done has no
// exit that does not fabricate history. This op is that exit, and it is
// deliberately SEPARATE from set-status: retiring the record is its own named,
// previewable act, not a side effect buried inside a status change. It NEVER
// sets status -- closing the run stays a second, explicit set-status call.
//
// ONE guard, G1 -- refuse a TERMINAL run. Read off the model, not invented: the
// validator blesses a terminal run's all-done progress as factual history, and
// statusProgressErrors raises nothing against it. Since this op cannot change
// status, on a terminal run it can only subtract a blessed record while
// unblocking no transition at all -- the one case where the loss buys nothing.
// planned runs are deliberately NOT guarded: they may not legally carry progress,
// so the op is a no-op there and the warning below already reports that.
//
// A run carrying no progress is a WARNING, not a refusal -- the set-deps
// --remove-dep precedent, where asking to remove what is not there is reported
// and allowed rather than blocked.
//
// It changes NO *_id, so checkIdentityPreserved sees identical id sets and needs
// no sanction, and it is BATCHABLE alongside set-status. That batchability is
// LOAD-BEARING, not a convenience: applied on its own to an active run it leaves
// an active run with no progress, which the validator fails, so a lone --apply
// would be written and immediately rolled back. The closeout reaches disk only as
// batch [clear-progress, set-status] -- two explicit ops, one write, no invalid
// intermediate state ever persisted.
// ---------------------------------------------------------------------------

export function clearProgress(obj, opts) {
  const errors = [];
  const warnings = [];
  const { run } = opts;

  if (typeof run !== "string" || !run) errors.push("clear-progress requires a non-empty --run");

  const entry = run ? findRunEntry(obj, run) : null;
  if (run && !entry) errors.push(`clear-progress: run ${run} not found`);

  // G1 -- refuse a terminal run.
  if (entry && TERMINAL_STATUSES.includes(entry.run.status)) {
    errors.push(
      `clear-progress: run ${run} is ${entry.run.status}; a terminal run's all-done progress is settled ` +
      "factual history and clear-progress cannot change status, so retiring it here would destroy the " +
      "record without unblocking anything"
    );
  }
  if (errors.length) return { errors, warnings };

  const clearedEntries = Array.isArray(entry.run.progress) ? entry.run.progress.length : 0;
  if (!("progress" in entry.run)) {
    warnings.push(`clear-progress: run ${run} carries no progress; nothing to retire`);
  }

  delete entry.run.progress;

  // status is returned unchanged so the caller can SHOW that it was not touched.
  return { errors, warnings, run, clearedEntries, status: entry.run.status };
}

// ---------------------------------------------------------------------------
// Objective-level presentational ops (extension). These NEVER touch queue_order,
// never call applyOrder, and never reorder or mutate phases or runs. The set of
// *_id values is unchanged, so checkIdentityPreserved passes as-is.
// ---------------------------------------------------------------------------

export function moveObjective(obj, opts) {
  const errors = [];
  const warnings = [];
  const { objectiveId, toIndex } = opts;

  const objectives = Array.isArray(obj.objectives) ? obj.objectives : [];
  if (!objectiveId) errors.push("move-objective requires --objective");
  const fromIndex = objectiveId ? objectives.findIndex((o) => o && o.objective_id === objectiveId) : -1;
  if (objectiveId && fromIndex < 0) errors.push(`move-objective: objective ${objectiveId} not found`);

  const n = Number(toIndex);
  if (toIndex == null) {
    errors.push("move-objective requires --to-index");
  } else if (!Number.isInteger(n) || n < 1 || n > objectives.length) {
    errors.push(`move-objective --to-index must be an integer in 1..${objectives.length}; got ${toIndex}`);
  }
  if (errors.length) return { errors, warnings };

  // Presentational reorder only: splice the objectives array. queue_order, phases
  // and runs are left exactly as they were.
  const [moved] = objectives.splice(fromIndex, 1);
  objectives.splice(n - 1, 0, moved);

  return { errors, warnings, movedObjective: objectiveId, fromIndex: fromIndex + 1, toIndex: n };
}

export function setObjectiveArchived(obj, opts) {
  const errors = [];
  const warnings = [];
  const { objectiveId, archived } = opts;

  if (!objectiveId) errors.push("set-objective-archived requires --objective");
  if (typeof archived !== "boolean") errors.push("set-objective-archived requires --archived true|false");
  const objective = objectiveId ? findObjective(obj, objectiveId) : null;
  if (objectiveId && !objective) errors.push(`set-objective-archived: objective ${objectiveId} not found`);
  if (errors.length) return { errors, warnings };

  // Archiving must not hide live work: refuse if any run under this objective is active.
  if (archived === true) {
    const activeRunIds = [];
    for (const phase of objective.phases || []) {
      for (const run of phase.runs || []) {
        if (run.status === "active") activeRunIds.push(run.run_id);
      }
    }
    if (activeRunIds.length) {
      errors.push(`set-objective-archived: objective ${objectiveId} holds active run(s) ${activeRunIds.join(", ")}; archiving must not hide live work`);
      return { errors, warnings };
    }
  }

  const before = objective.archived === true;
  if (archived === true) {
    objective.archived = true; // stored exception; true only
  } else {
    delete objective.archived; // never store false: omit the key entirely
  }
  const after = objective.archived === true;
  return { errors, warnings, objective: objectiveId, before, after };
}

// ---------------------------------------------------------------------------
// Container creation (extension). create-phase adds ONE empty phase to an
// existing objective. Like the objective-level ops above it NEVER touches
// queue_order and never calls applyOrder: an empty phase holds no runs, so the
// global run order is untouched by construction. It is nonetheless an IDENTITY
// op (+1 phase id), so it returns addedPhase for checkIdentityPreserved and is
// refused inside batch.
//
// An empty phase is legal in the v3 model: the phase contract is the field
// allowlist plus phase_id uniqueness, with no minimum run count on either side
// (the source project's canonical roadmap already carries empty phases and validates green).
// Nothing is auto-seeded here; a fabricated placeholder run would invent an
// identity the operator never asked for, to satisfy a rule that does not exist.
//
// phase_id has no format convention in the v3 model -- unlike RUN_ID_PATTERN,
// which is advisory for runs, there is no phase equivalent anywhere in the
// core, the validator or the console. A non-empty string is the whole contract;
// inventing a stricter one here would be a new rule, not a mirrored one.
// ---------------------------------------------------------------------------

export function createPhase(obj, opts) {
  const errors = [];
  const warnings = [];
  const { objectiveId, phaseId, title } = opts;

  if (!objectiveId) errors.push("create-phase requires --objective");
  if (typeof phaseId !== "string" || !phaseId) errors.push("create-phase requires a non-empty --phase-id");
  if (typeof title !== "string" || !title) errors.push("create-phase requires --title");

  const objective = objectiveId ? findObjective(obj, objectiveId) : null;
  if (objectiveId && !objective) errors.push(`create-phase: objective ${objectiveId} not found`);

  // Uniqueness is GLOBAL: findPhaseEntry scans every objective, so a phase_id
  // already used under a different objective is refused too.
  if (phaseId && findPhaseEntry(obj, phaseId)) {
    errors.push(`create-phase: phase_id ${phaseId} already exists (identity must be unique)`);
  }
  if (objective && !Array.isArray(objective.phases)) {
    errors.push(`create-phase: objective ${objectiveId} phases must be an array`);
  }
  if (errors.length) return { errors, warnings };

  // Append at the END of the objective's phases; existing phases keep their order.
  // Keys are written in PHASE_ALLOWED_FIELDS order so the serialized node matches
  // the file style of every existing phase.
  const newPhase = { phase_id: phaseId, title, runs: [] };
  objective.phases.push(newPhase);

  return { errors, warnings, newPhase, objectiveId, addedPhase: phaseId };
}

// ---------------------------------------------------------------------------
// Container deletion (extension). delete-phase removes ONE EMPTY phase from
// whichever objective holds it. Like create-phase it NEVER touches queue_order
// and never calls applyOrder -- but here that claim is only TRUE BECAUSE of the
// refusal below: a phase still holding runs is refused, so the phase actually
// spliced out holds none and the global run order is untouched by construction.
//
// It does NOT cascade, by design. Deleting a phase with runs would destroy run
// identities the operator never named in what is a single-id op, and
// checkIdentityPreserved sanctions exactly ONE removed id per kind -- the run
// guard would fire (correctly) on every orphaned run. Move or delete the runs
// first; that keeps each run deletion an explicit, separately reviewed act.
//
// There is deliberately NO "last phase" guard. An objective with phases: [] is
// legal in the v3 model: neither checkInvariants nor the full Project Console
// validator imposes a minimum phase count, while the same authors DID write a
// non-empty rule for root.objectives -- the asymmetry is a decision, not an
// oversight. Refusing to delete an objective's last phase would invent a rule the
// model does not have, which is exactly what create-phase refused to do when it
// dropped its placeholder run.
//
// Input is the phase id ALONE: phase ids are globally unique (create-phase
// enforces that), so findPhaseEntry locates the container. Asking the caller to
// also name the objective would add a second thing to get wrong without adding a
// single check the file does not already make.
//
// It is an IDENTITY op (-1 phase id), so it returns removedPhase for
// checkIdentityPreserved and is refused inside batch.
// ---------------------------------------------------------------------------

export function deletePhase(obj, opts) {
  const errors = [];
  const warnings = [];
  const { phaseId } = opts;

  if (typeof phaseId !== "string" || !phaseId) errors.push("delete-phase requires a non-empty --phase-id");

  const entry = phaseId ? findPhaseEntry(obj, phaseId) : null;
  if (phaseId && !entry) errors.push(`delete-phase: phase_id ${phaseId} not found`);

  // Refuse-if-not-empty. Checked BEFORE anything is mutated, so a refusal leaves
  // the object byte-identical to what came in.
  if (entry && Array.isArray(entry.phase.runs) && entry.phase.runs.length > 0) {
    errors.push(
      `delete-phase: phase ${phaseId} still holds ${entry.phase.runs.length} run(s); ` +
      "delete or move them first (delete-phase does not cascade)"
    );
  }
  if (errors.length) return { errors, warnings };

  // Splice out by identity from the containing objective. Nothing else is touched:
  // sibling phases keep their order, no run exists to re-sequence.
  const phases = entry.objective.phases;
  const [removedPhaseNode] = phases.splice(phases.findIndex((p) => p.phase_id === phaseId), 1);

  // removedPhase is the ID (the sanction checkIdentityPreserved consumes);
  // removedPhaseNode is the detached node, kept for the CLI summary. They are two
  // different things and the names say so.
  return { errors, warnings, removedPhaseNode, objectiveId: entry.objective.objective_id, removedPhase: phaseId };
}

// ---------------------------------------------------------------------------
// Objective creation (extension). create-objective appends ONE EMPTY objective
// to root.objectives. Like create-phase it NEVER touches queue_order and never
// calls applyOrder: an objective with phases: [] holds no phase, so it holds no
// run, and the global run order is untouched by construction.
//
// An empty objective is legal in the v3 model. The validator iterates
// `objective.phases || []` with no minimum, while requiring root.objectives
// ITSELF to be non-empty -- that asymmetry is a decision, and delete-phase's
// suite already pinned it end to end against the real validator (an appended
// objective with phases: [] validates green). This op stands on that finding.
//
// Input is objective_id + title, and that is the WHOLE input. Unlike create-phase
// there is no container to name, because an objective IS the top container.
// Nothing is auto-seeded: a fabricated placeholder phase would invent an identity
// the operator never asked for, exactly what create-phase refused to do with runs.
//
// `archived` is deliberately NOT written. It is OPTIONAL and its stored form is
// `true` only -- setObjectiveArchived deletes the key rather than storing false --
// so a newborn objective simply omits it. The node is built in
// OBJECTIVE_REQUIRED_FIELDS order so the serialized keys match every existing
// objective in the file.
//
// It is an IDENTITY op (+1 objective id), so it returns addedObjective for
// checkIdentityPreserved and is refused inside batch.
// ---------------------------------------------------------------------------

export function createObjective(obj, opts) {
  const errors = [];
  const warnings = [];
  const { objectiveId, title } = opts;

  if (typeof objectiveId !== "string" || !objectiveId) errors.push("create-objective requires a non-empty --objective");
  if (typeof title !== "string" || !title) errors.push("create-objective requires --title");

  // Uniqueness is GLOBAL by construction: objectives exist only at the root, so
  // findObjective already scans every one of them.
  if (objectiveId && findObjective(obj, objectiveId)) {
    errors.push(`create-objective: objective_id ${objectiveId} already exists (identity must be unique)`);
  }
  if (!Array.isArray(obj.objectives)) {
    errors.push("create-objective: root objectives must be an array");
  }
  if (errors.length) return { errors, warnings };

  // Append at the END of root.objectives; existing objectives keep their order.
  // Keys are written in OBJECTIVE_REQUIRED_FIELDS order, without archived.
  const newObjective = { objective_id: objectiveId, title, phases: [] };
  obj.objectives.push(newObjective);

  return { errors, warnings, newObjective, addedObjective: objectiveId };
}

// ---------------------------------------------------------------------------
// Objective deletion (extension). delete-objective removes ONE EMPTY objective
// from the root. Like delete-phase it NEVER touches queue_order and never calls
// applyOrder -- and here too that claim is only TRUE BECAUSE of G1 below: an
// objective still holding phases is refused, so the objective actually spliced
// out holds no phase and therefore no run.
//
// TWO guards, both evaluated BEFORE anything is mutated and both ACCUMULATED into
// a single cut (the delete-phase shape, not the setObjectiveArchived shape, whose
// early return exists only because it must dereference the objective it found):
//
//   G1  refuse-if-not-empty. It does NOT cascade, by design. Deleting an objective
//       with phases would destroy phase (and run) identities the operator never
//       named in what is a single-id op, and checkIdentityPreserved sanctions
//       exactly ONE removed id per kind -- the phase guard would fire (correctly)
//       on every orphaned phase. Delete or move the phases first.
//
//   G2  refuse the LAST objective. Unlike the deliberately absent last-PHASE
//       guard, this one mirrors a rule that really exists: the validator fails
//       hard on an empty root.objectives array. Without G2 the refusal would
//       still happen, but only as a write-then-rollback at apply time; with it,
//       the caller gets a clean refusal at the mutate stage and nothing is ever
//       written. The guard reports the rule, it does not invent it.
//
// Input is the objective id ALONE: objective ids are unique file-wide, so
// findObjective locates the node and there is no parent container to name.
//
// It is an IDENTITY op (-1 objective id), so it returns removedObjective for
// checkIdentityPreserved and is refused inside batch.
// ---------------------------------------------------------------------------

export function deleteObjective(obj, opts) {
  const errors = [];
  const warnings = [];
  const { objectiveId } = opts;

  if (typeof objectiveId !== "string" || !objectiveId) errors.push("delete-objective requires a non-empty --objective");

  const objectives = Array.isArray(obj.objectives) ? obj.objectives : [];
  const objective = objectiveId ? findObjective(obj, objectiveId) : null;
  if (objectiveId && !objective) errors.push(`delete-objective: objective_id ${objectiveId} not found`);

  // G1 -- refuse-if-not-empty (no cascade).
  if (objective && Array.isArray(objective.phases) && objective.phases.length > 0) {
    errors.push(
      `delete-objective: objective ${objectiveId} still holds ${objective.phases.length} phase(s); ` +
      "delete or move them first (delete-objective does not cascade)"
    );
  }

  // G2 -- refuse the last objective. Reported alongside G1, not instead of it:
  // an operator whose only objective still holds phases has TWO reasons this
  // cannot proceed and deserves to read both at once.
  if (objective && objectives.length === 1) {
    errors.push(
      `delete-objective: objective ${objectiveId} is the only objective; ` +
      "the roadmap must keep at least one (deleting it would fail the validator)"
    );
  }
  if (errors.length) return { errors, warnings };

  // Splice out by identity from the root. Nothing else is touched: sibling
  // objectives keep their order, and G1 guarantees no phase or run exists here
  // to re-sequence.
  const [removedObjectiveNode] = objectives.splice(objectives.findIndex((o) => o.objective_id === objectiveId), 1);

  // removedObjective is the ID (the sanction checkIdentityPreserved consumes);
  // removedObjectiveNode is the detached node, kept for the CLI summary.
  return { errors, warnings, removedObjectiveNode, removedObjective: objectiveId };
}

// ---------------------------------------------------------------------------
// Remap table (Q behaviour): old -> new queue_order for every affected run.
// ---------------------------------------------------------------------------

export function buildRemap(beforeMap, obj) {
  const afterMap = queueOrderMap(obj);
  const rows = [];
  const allIds = new Set([...beforeMap.keys(), ...afterMap.keys()]);
  for (const id of allIds) {
    const before = beforeMap.has(id) ? beforeMap.get(id) : null;
    const after = afterMap.has(id) ? afterMap.get(id) : null;
    if (before !== after) rows.push({ run_id: id, before, after });
  }
  rows.sort((a, b) => (a.after == null ? Infinity : a.after) - (b.after == null ? Infinity : b.after));
  return rows;
}

// ---------------------------------------------------------------------------
// Atomic write path with tmpdir backup and optional validator self-check.
// Q6: backup lives OUTSIDE the repo (os.tmpdir()). On validator failure the
// backup is restored so the file is never left in a bad state.
//
// `validate` is an injectable callback returning { code, output }. The write
// endpoint injects a re-read of the just-written file (parse + invariants +
// tree shape); it is null for a non-canonical target. Tests inject a fake
// validate() to exercise the rollback branch.
// ---------------------------------------------------------------------------

export function applyWrite(filePath, contents, { validate = null, tmpdir = null } = {}) {
  const abs = path.resolve(filePath);
  const dir = path.dirname(abs);
  const base = path.basename(abs);
  const backupDir = tmpdir || os.tmpdir();

  let backupPath = null;
  if (fs.existsSync(abs)) {
    backupPath = path.join(backupDir, `roadmap-backup-${process.pid}-${base}`);
    fs.copyFileSync(abs, backupPath);
  }

  const tmpPath = path.join(dir, `.${base}.tmp-${process.pid}`);
  const buffer = Buffer.from(contents, "utf8");
  const fd = fs.openSync(tmpPath, "w");
  try {
    fs.writeSync(fd, buffer, 0, buffer.length, 0);
    fs.fsyncSync(fd);
  } finally {
    fs.closeSync(fd);
  }
  fs.renameSync(tmpPath, abs); // atomic replace on the same directory/volume

  if (validate) {
    const result = validate();
    if (!result || result.code !== 0) {
      if (backupPath) fs.copyFileSync(backupPath, abs);
      return { written: false, rolledBack: Boolean(backupPath), backupPath, validator: result || { code: -1, output: "validator produced no result" } };
    }
    return { written: true, rolledBack: false, backupPath, validator: result };
  }

  return { written: true, rolledBack: false, backupPath, validator: null };
}
