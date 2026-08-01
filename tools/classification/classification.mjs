// classification.mjs — THE ONE implementation of the run classification model.
//
// Publishes what `context/CLASIFICACION-DE-RUNS.md` specifies: the closed vocabularies of
// §1, the two derivation tables of §2, and the two functions that EXECUTE those tables.
// `severity` and `closure_mode` are DERIVED and NEVER stored (§2): they are computed here,
// at read time, from the stored fields, and no caller writes the result anywhere.
//
// WHY THIS FILE EXISTS, AND WHY HERE.
//
// The derivation has TWO consumers — the emitter (`tools/projector/project.mjs`, Node) and
// the live console (`project-console/assets/*`, browser) — and §2 exists precisely to stop
// them deriving differently. One copy is therefore not a preference but the rule, so the
// copy needs a home that BOTH can reach:
//
//   - It is NOT the engine. `tools/roadmap/roadmap-core.mjs` imports `node:fs`/`node:path`
//     and could never be loaded by a browser; it also has no use for the derivation (the
//     engine validates STORED fields, and the one illegal combination that needs the
//     derivation is checked as a property of THIS function instead, by test).
//   - It is NOT the emitter and NOT the console: either one owning it would make the other
//     import its way across the read/write boundary.
//   - It is a leaf under the repository root, which `project-console/serve.mjs` already
//     serves whole, with `.mjs` already in its MIME table — so the same file the emitter
//     imports from disk is the file the browser fetches over HTTP. Same bytes, same rules.
//
// CONSTRAINT THAT KEEPS THAT TRUE: this module imports NOTHING. No `node:` builtin, no DOM,
// no engine. Adding an import that only one runtime has would silently fork the two
// consumers back apart, which is the exact failure the file exists to prevent.
//
// The tables are DATA, executed by the functions below and declared verbatim in the emitted
// envelope by `buildClassificationTaxonomy()`. Declaration and behaviour cannot drift apart
// because they are the same objects — the discipline `COLLECTION_STATUS_RULES` already
// follows in the emitter.

// ---------------------------------------------------------------------------
// §1 — the closed vocabularies of the STORED fields, verbatim and in the spec's own order.
// Tokens are DATA: read as-is by schema, validator, emitter and console, never translated.
// ---------------------------------------------------------------------------

export const CORRECTNESS_MODELS = ["SPECIFIED", "JUDGED_ACCEPTS", "JUDGED_DEFINES"];
export const WORK_TYPES = ["COSMETIC", "FUNCTIONAL", "FOUNDATIONAL"];
export const BLAST_RADII = ["LOCAL", "ADJACENT", "SYSTEMIC", "PROJECT_SHAPE"];
export const FAILURE_SURFACES = ["LOUD", "VISIBLE", "SILENT"];

// The four closed-vocabulary fields in one table, so every consumer loops instead of
// repeating itself four times.
export const CLASSIFICATION_VOCABULARIES = {
  correctness_model: CORRECTNESS_MODELS,
  work_type: WORK_TYPES,
  blast_radius: BLAST_RADII,
  failure_surfaces: FAILURE_SURFACES,
};

// The six STORED keys of §1, in the order the specification enumerates them. `severity` and
// `closure_mode` are absent from this list BY CONSTRUCTION: they are never stored.
export const CLASSIFICATION_STORED_FIELDS = [
  "correctness_model",
  "work_type",
  "blast_radius",
  "failure_surfaces",
  "external_effects",
  "classified_at",
];

// ---------------------------------------------------------------------------
// §2 — the two DERIVED vocabularies, and the tables that produce them.
// ---------------------------------------------------------------------------

// The severity scale, ordered low to high. The order is load-bearing: the `failure_surfaces`
// adjustment is a STEP ALONG THIS ARRAY and saturates at its two ends.
export const SEVERITIES = ["MINOR", "MODERATE", "MAJOR", "CRITICAL"];
// The closure scale, ordered from least to most attended. Also load-bearing: the
// `external_effects` guard RAISES along this array and is forbidden to lower.
export const CLOSURE_MODES = ["UNATTENDED", "SEMI_ATTENDED", "ATTENDED"];

// §2.1 — `severity`, as an executable declaration.
//
//   `table`      the published work_type × blast_radius grid, transcribed verbatim.
//   `adjustment` the ONE adjustment applied on top of that result: `failure_surfaces`,
//                as a signed step along SEVERITIES, SATURATING between MINOR and CRITICAL
//                (the adjustment never leaves the scale).
export const SEVERITY_DERIVATION = {
  applies_to: ["run"],
  input: ["run.work_type", "run.blast_radius"],
  scale: SEVERITIES,
  table: {
    COSMETIC:     { LOCAL: "MINOR",    ADJACENT: "MINOR",    SYSTEMIC: "MODERATE", PROJECT_SHAPE: "MODERATE" },
    FUNCTIONAL:   { LOCAL: "MODERATE", ADJACENT: "MODERATE", SYSTEMIC: "MAJOR",    PROJECT_SHAPE: "MAJOR" },
    FOUNDATIONAL: { LOCAL: "MAJOR",    ADJACENT: "MAJOR",    SYSTEMIC: "CRITICAL", PROJECT_SHAPE: "CRITICAL" },
  },
  adjustment: {
    input: "run.failure_surfaces",
    steps: { LOUD: -1, VISIBLE: 0, SILENT: 1 },
    saturating: true,
    absent_input: "no_adjustment",
  },
  missing_input: "absent",
};

// §2.2 — `closure_mode`, as an executable declaration. `precedence` is evaluated IN ORDER
// and the first rule that applies wins; a rule with `severity_in` also requires the derived
// `severity` to be one of those tokens.
//
// `guard` is the published guard: a non-empty `external_effects` forces SEMI_ATTENDED AS A
// MINIMUM. `direction: "raise_only"` is the other half of the published sentence — the guard
// raises the closure mode and NEVER lowers it, so an ATTENDED run does not degrade to
// SEMI_ATTENDED for having external effects.
export const CLOSURE_MODE_DERIVATION = {
  applies_to: ["run"],
  input: ["run.correctness_model", "run.severity"],
  scale: CLOSURE_MODES,
  precedence: [
    { token: "UNATTENDED",    correctness_model: "SPECIFIED",      severity_in: ["MINOR", "MODERATE"] },
    { token: "SEMI_ATTENDED", correctness_model: "SPECIFIED",      severity_in: ["MAJOR", "CRITICAL"] },
    { token: "SEMI_ATTENDED", correctness_model: "JUDGED_ACCEPTS" },
    { token: "ATTENDED",      correctness_model: "JUDGED_DEFINES" },
  ],
  guard: {
    input: "run.external_effects",
    when: "non_empty",
    minimum: "SEMI_ATTENDED",
    direction: "raise_only",
    // §1 declares the list "empty by default"; an ABSENT key and `[]` are therefore the
    // SAME answer — no external effects — and the guard applies to neither.
    absent_input: "empty",
  },
  missing_input: "absent",
};

// ---------------------------------------------------------------------------
// Reading one stored field.
//
// A DERIVED WITHOUT ITS INPUTS IS ABSENT, NOT DEFECTIVE. There is no default severity and
// no default closure mode: an unclassified run has none, and saying otherwise would be the
// second copy that rots, wearing the shape of a default. Every function below returns null
// for ABSENT, and null is the only thing it ever returns in that case.
//
// ABSENT and PRESENT-BUT-ILLEGAL are answered the same way here (null → the derived is
// absent) but they are NOT the same fact, and they are not confused: `checkInvariants` in
// the engine REFUSES an illegal token and names it, so an illegal value cannot reach disk
// through any write path. This module stays total on purpose — a renderer must never throw
// over a field it is only displaying — and refuses to invent a derived value from an input
// the validator would reject.
// ---------------------------------------------------------------------------

function readToken(run, field) {
  if (!run || typeof run !== "object" || !(field in run)) return { present: false, token: null };
  const vocabulary = CLASSIFICATION_VOCABULARIES[field] || [];
  const value = run[field];
  return { present: true, token: vocabulary.includes(value) ? value : null };
}

// §1: the guard list, read as the specification declares it. Absent and `[]` both answer
// "no external effects". A PRESENT non-array is not a list at all: the derivation refuses
// to read it (null), and the engine refuses to store it.
function readExternalEffects(run) {
  if (!run || typeof run !== "object" || !("external_effects" in run)) return [];
  const value = run.external_effects;
  if (!Array.isArray(value)) return null;
  return value;
}

// ---------------------------------------------------------------------------
// The derivations themselves. Each EXECUTES the declaration above; neither restates it.
// ---------------------------------------------------------------------------

// `severity` — §2.1. Requires `work_type` AND `blast_radius`; with either missing (or
// carrying a token outside its vocabulary) the run HAS no severity and null is returned.
// `failure_surfaces` is the single adjustment, not a requirement: absent, it simply does
// not move the result.
export function deriveSeverity(run) {
  const workType = readToken(run, "work_type");
  const blastRadius = readToken(run, "blast_radius");
  if (!workType.token || !blastRadius.token) return null;
  const row = SEVERITY_DERIVATION.table[workType.token];
  const base = row ? row[blastRadius.token] : null;
  if (!base) return null;

  const surfaces = readToken(run, "failure_surfaces");
  // Present but outside the vocabulary: the adjustment cannot be read, so there is no
  // honest severity to show. Absent: no adjustment, and the base stands.
  if (surfaces.present && !surfaces.token) return null;
  const step = surfaces.token ? SEVERITY_DERIVATION.adjustment.steps[surfaces.token] : 0;

  const scale = SEVERITY_DERIVATION.scale;
  const moved = scale.indexOf(base) + step;
  // SATURATING between MINOR and CRITICAL: the adjustment never leaves the scale.
  const index = Math.max(0, Math.min(scale.length - 1, moved));
  return scale[index];
}

// `closure_mode` — §2.2. Requires `correctness_model`, and on the SPECIFIED branch also the
// derived `severity` (so a run with a correctness model but no work_type/blast_radius has
// no closure mode either). Then the guard, which only ever raises.
export function deriveClosureMode(run) {
  const correctness = readToken(run, "correctness_model");
  if (!correctness.token) return null;
  const externalEffects = readExternalEffects(run);
  if (externalEffects === null) return null;

  // The SPECIFIED branch is the only one that reads severity; the two JUDGED_* rules carry
  // no `severity_in` and so match on the correctness model alone.
  const severity = deriveSeverity(run);
  let token = null;
  for (const rule of CLOSURE_MODE_DERIVATION.precedence) {
    if (rule.correctness_model !== correctness.token) continue;
    if (rule.severity_in && (!severity || !rule.severity_in.includes(severity))) continue;
    token = rule.token;
    break;
  }
  if (!token) return null;

  // THE GUARD. A non-empty `external_effects` forces the minimum; RAISE ONLY, so a mode
  // already at or above the minimum is left exactly as the table produced it.
  if (externalEffects.length) {
    const scale = CLOSURE_MODE_DERIVATION.scale;
    const minimum = CLOSURE_MODE_DERIVATION.guard.minimum;
    if (scale.indexOf(token) < scale.indexOf(minimum)) token = minimum;
  }
  return token;
}

// Both derived values of one run, in one call. `null` means ABSENT — never a default.
export function deriveClassification(run) {
  return { severity: deriveSeverity(run), closure_mode: deriveClosureMode(run) };
}

// Does this run carry a classification at all? The run that specifies the model states the
// rule itself: "an absent classified_at is exactly the console's to-do list". So the mark is
// what decides, not the presence of some subset of the measured fields.
export function isClassified(run) {
  return !!(run && typeof run === "object" && typeof run.classified_at === "string" && run.classified_at);
}

// Which of the six STORED fields this run actually carries. Used by the console to tell a
// PARTIALLY classified run from an unclassified one without inventing either.
export function storedClassificationFields(run) {
  if (!run || typeof run !== "object") return [];
  return CLASSIFICATION_STORED_FIELDS.filter((field) => field in run);
}

// ---------------------------------------------------------------------------
// THE REPORT — §1: "the validator REPORTS live runs with no classification; it does NOT
// reject." This builds that list and nothing else: it raises no error, returns no exit code
// and refuses nothing. A run with no classification is information the console shows.
//
// `terminalStatuses` is handed IN, never baked here: which statuses end a run is status
// doctrine and belongs to whoever owns the status vocabulary. §6 is why the distinction
// matters — completed runs are NOT classified, so listing them would be archaeology.
// ---------------------------------------------------------------------------

export function unclassifiedLiveRuns(runs, { terminalStatuses = [] } = {}) {
  const terminal = new Set(terminalStatuses);
  return (Array.isArray(runs) ? runs : [])
    .filter((entry) => entry && entry.run && !terminal.has(entry.run.status) && !isClassified(entry.run))
    .map((entry) => ({
      run_id: entry.run.run_id,
      queue_order: entry.run.queue_order,
      status: entry.run.status,
      title: entry.run.title,
      ...(entry.objective_id ? { objective_id: entry.objective_id } : {}),
      ...(entry.phase_id ? { phase_id: entry.phase_id } : {}),
      // What the run DOES carry, so a half-classified run is not reported as untouched.
      stored_fields: storedClassificationFields(entry.run),
    }));
}

// ---------------------------------------------------------------------------
// TRANSPORT — the block the emitter merges into `taxonomy_model`.
//
// Same shape as the status precedent it copies: one `vocabularies` entry per axis (with
// `stored` saying whether the token is on disk, and `derived_by` naming the table for the
// ones that are not), and one `derivations` entry per table. THE RESULT NEVER TRAVELS: the
// consumer receives the tables and derives for itself, exactly as it already does for
// objective/phase status.
//
// The objects handed over are THE SAME ONES the functions above execute, so the declaration
// in the envelope cannot drift from the behaviour in this file.
// ---------------------------------------------------------------------------

export const SEVERITY_DERIVATION_NAME = "severity_from_work_type_and_blast_radius";
export const CLOSURE_MODE_DERIVATION_NAME = "closure_mode_from_correctness_model_and_severity";

export function buildClassificationTaxonomy() {
  return {
    vocabularies: {
      "run.correctness_model": { axis: "run", stored: true, optional: true, tokens: CORRECTNESS_MODELS },
      "run.work_type": { axis: "run", stored: true, optional: true, tokens: WORK_TYPES },
      "run.blast_radius": { axis: "run", stored: true, optional: true, tokens: BLAST_RADII },
      "run.failure_surfaces": { axis: "run", stored: true, optional: true, tokens: FAILURE_SURFACES },
      // The guard list and the mark declare their FORM, because neither has a closed
      // vocabulary to declare: §1 gives entries for neither, and inventing one here would
      // publish a rule the specification does not state.
      "run.external_effects": { axis: "run", stored: true, optional: true, form: "array_of_non_empty_strings", empty_by_default: true },
      "run.classified_at": { axis: "run", stored: true, optional: true, form: "iso_8601_utc_instant" },
      "run.severity": { axis: "run", stored: false, derived_by: SEVERITY_DERIVATION_NAME, tokens: SEVERITIES },
      "run.closure_mode": { axis: "run", stored: false, derived_by: CLOSURE_MODE_DERIVATION_NAME, tokens: CLOSURE_MODES },
    },
    derivations: {
      [SEVERITY_DERIVATION_NAME]: SEVERITY_DERIVATION,
      [CLOSURE_MODE_DERIVATION_NAME]: CLOSURE_MODE_DERIVATION,
    },
    // §3, transported as data so a consumer can name a refusal without hard-coding it. The
    // ENGINE is what refuses the first two (both decidable from stored fields); the third
    // names a `closure_mode` token, which nobody can type because nobody stores it — it is
    // held as a PROPERTY of the derivation above and proven by test, not by a field check.
    illegal_combinations: [
      { fields: ["correctness_model", "work_type"], values: ["SPECIFIED", "FOUNDATIONAL"], enforced_by: "stored_field_invariant" },
      { fields: ["work_type", "failure_surfaces"], values: ["FOUNDATIONAL", "LOUD"], enforced_by: "stored_field_invariant" },
      { fields: ["correctness_model", "closure_mode"], values: ["JUDGED_*", "UNATTENDED"], enforced_by: "derivation_property" },
    ],
  };
}
