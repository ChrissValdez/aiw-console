// progress.mjs — THE ONE implementation of the frozen `progress` shape (CONTRATO §15).
//
// Publishes what `context/aiw-console/CONTRATO.md` §15 froze on 2026-08-03 (run
// `RUN-CONSOLE-PROGRESS-NORMATIVE-001`, queue_order 46): the closed stage and state
// vocabularies, the entry field allowlist, the shape checker, and the ONE predicate §15.c
// adds — whether a PERSON has positively reviewed a run, read from its `progress` record.
//
// WHY THIS FILE EXISTS, AND WHY HERE.
//
// The predicate has TWO consumers — the engine/validator (`tools/roadmap/roadmap-core.mjs`,
// Node) and the live console (`project-console/assets/*`, browser) — and §15.c exists
// precisely so that "did a person review this?" cannot be answered differently by two
// readers. This is the same two-runtime problem `tools/classification/classification.mjs`
// already solved, so this file copies its home and its constraint:
//
//   - It is NOT the engine: roadmap-core.mjs imports `node:fs` and can never be loaded by
//     a browser. The engine imports THIS file and re-exports it.
//   - It is NOT the console: the console receives it by injection (project-shell.js), the
//     same direction the classification model already travels.
//   - It is a leaf under the repository root, served whole by `project-console/serve.mjs`
//     with `.mjs` already in its MIME table — the file the engine imports from disk is the
//     file the browser fetches over HTTP. Same bytes, same rules.
//
// CONSTRAINT THAT KEEPS THAT TRUE: this module imports NOTHING. No `node:` builtin, no
// DOM, no engine. Adding an import that only one runtime has would silently fork the two
// consumers back apart.
//
// EVERY RULE HERE IS §15.b/§15.c VERBATIM — frozen from the one exemplar on disk plus the
// two shipped readers, never invented. The checker pushes error strings and NEVER throws:
// it runs inside checkInvariants, whose callers turn a throw into an unnamed refusal.

// ---------------------------------------------------------------------------
// §15.b — the closed vocabularies and the entry field allowlist.
// ---------------------------------------------------------------------------

// The five stages of the exemplar, which are the five the console labels
// (project-console/assets/project-console.js:167-173).
export const PROGRESS_STAGES = ["execution", "ai_review", "human_qa", "correction", "closeout"];

// On disk only `done` exists, but the engine derives the active frontier from
// waiting/running (roadmap-core.mjs statusProgressErrors) and the console paints all
// three (project-console.js:174-178). Freezing `done` alone would make the frontier the
// engine itself demands of an active run unsatisfiable by construction.
export const PROGRESS_STATES = ["waiting", "running", "done"];

// Required in every entry (5/5 keys present in all 13 exemplar entries; `result` is
// treated as optional because the shipped reader guards it with `"result" in entry`,
// project-console.js:3326,3341, and `note` because the reader paints it when present,
// project-console.js:3357 — zero exemplars, but a shape that forbade it would declare
// illegal what the shipped console already renders).
export const PROGRESS_ENTRY_REQUIRED_FIELDS = ["cycle", "stage", "attempt", "state"];
export const PROGRESS_ENTRY_OPTIONAL_FIELDS = ["result", "note"];
export const PROGRESS_ENTRY_ALLOWED_FIELDS = [...PROGRESS_ENTRY_REQUIRED_FIELDS, ...PROGRESS_ENTRY_OPTIONAL_FIELDS];

// §15.c — the one positive human-QA token. `passed` is the only positive value with an
// exemplar on disk and the one the console labels "Passed" (project-console.js:182);
// `changes_requested` is the measured negative. Anything else fails closed.
export const HUMAN_QA_POSITIVE_RESULT = "passed";

// ---------------------------------------------------------------------------
// §15.b — the shape checker. Pushes error strings, never throws.
// ---------------------------------------------------------------------------

// Validate ONE run's `progress` value against the frozen shape. `label` prefixes every
// error the way checkInvariants labels run errors (`run RUN-X-001`). Absence is the
// caller's business: this function is only called with a PRESENT value, mirroring how
// every optional-key check in checkInvariants is gated on `in`.
export function progressShapeErrors(progress, label) {
  const errors = [];
  if (!Array.isArray(progress) || progress.length === 0) {
    errors.push(`${label} progress must be a non-empty array when present; a run with no progress omits the key`);
    return errors;
  }
  progress.forEach((entry, index) => {
    const entryLabel = `${label} progress[${index}]`;
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      errors.push(`${entryLabel} is not an object`);
      return;
    }
    for (const field of PROGRESS_ENTRY_REQUIRED_FIELDS) {
      if (!(field in entry)) errors.push(`${entryLabel} missing required field ${field}`);
    }
    for (const key of Object.keys(entry)) {
      if (!PROGRESS_ENTRY_ALLOWED_FIELDS.includes(key)) {
        errors.push(`${entryLabel} carries unexpected field ${key}; only ${PROGRESS_ENTRY_ALLOWED_FIELDS.join(", ")} are allowed`);
      }
    }
    if ("cycle" in entry && (!Number.isInteger(entry.cycle) || entry.cycle < 1)) {
      errors.push(`${entryLabel} cycle must be a positive integer; found ${JSON.stringify(entry.cycle)}`);
    }
    if ("attempt" in entry && (!Number.isInteger(entry.attempt) || entry.attempt < 1)) {
      errors.push(`${entryLabel} attempt must be a positive integer; found ${JSON.stringify(entry.attempt)}`);
    }
    if ("stage" in entry && !PROGRESS_STAGES.includes(entry.stage)) {
      errors.push(`${entryLabel} stage must be one of ${PROGRESS_STAGES.join(", ")}; found ${JSON.stringify(entry.stage)}`);
    }
    if ("state" in entry && !PROGRESS_STATES.includes(entry.state)) {
      errors.push(`${entryLabel} state must be one of ${PROGRESS_STATES.join(", ")}; found ${JSON.stringify(entry.state)}`);
    }
    if ("result" in entry && (typeof entry.result !== "string" || !entry.result)) {
      errors.push(`${entryLabel} result must be a non-empty string when present`);
    }
    if ("note" in entry && (typeof entry.note !== "string" || !entry.note)) {
      errors.push(`${entryLabel} note must be a non-empty string when present`);
    }
  });
  return errors;
}

// ---------------------------------------------------------------------------
// §15.c — the predicate. Fail-closed by construction.
// ---------------------------------------------------------------------------

// TRUE exactly when the run's progress records a cycle whose human QA came back positive:
// an entry with stage "human_qa", state "done" and result "passed". `status: "completed"`
// alone answers nothing here — the four statuses cannot distinguish a run an AI closed
// from one a person reviewed, which is the gap §15.c closes. A missing or malformed
// progress answers FALSE, never a guess: the invention this predicate must never make is
// precisely a satisfied edge nothing records.
export function humanApprovalSatisfied(run) {
  const progress = run && Array.isArray(run.progress) ? run.progress : null;
  if (!progress) return false;
  return progress.some((entry) =>
    entry && typeof entry === "object" && !Array.isArray(entry) &&
    entry.stage === "human_qa" &&
    entry.state === "done" &&
    entry.result === HUMAN_QA_POSITIVE_RESULT
  );
}
