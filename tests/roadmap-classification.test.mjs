// [#43] The six STORED classification fields and the invariants that REJECT.
//
// Scope of this file, deliberately narrow. It covers what the SCHEMA stores
// (context/CLASIFICACION-DE-RUNS.md §1) and the illegal combinations of §3 that are
// decidable from stored fields alone. It does NOT cover derivation (§2: `severity`,
// `closure_mode`), the emitter's envelope, the console view, or the "list the live
// unclassified runs" behaviour — none of those is this run's surface, and the third
// illegal combination of §3 is left unimplemented for exactly that reason (see the block
// at the end of this file).
//
// Everything runs against roadmaps built HERE in memory, or against the FROZEN canonical
// (tests/fixtures/neighbours/), never against the live roadmap of this repo: a suite that
// reads the live file goes red whenever the cabin plans a run, which is the coupling the
// neighbours fixtures exist to remove.
import test from "node:test";
import assert from "node:assert/strict";
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import * as core from "../tools/roadmap/roadmap-core.mjs";
import { planEdit, applyPlan } from "../tools/roadmap/roadmap-plan.mjs";
import { frozenCanonicalPath } from "./helpers/neighbours.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");

const CLASSIFICATION_KEYS = [
  "correctness_model",
  "work_type",
  "blast_radius",
  "failure_surfaces",
  "external_effects",
  "classified_at",
];

// A minimal roadmap that passes every pre-existing invariant, so that anything this file
// asserts is attributable to the classification fields and to nothing else.
function roadmapWith(...runPatches) {
  return {
    schema_version: "roadmap_tree_v1",
    roadmap_id: "roadmap",
    title: "Classification test roadmap",
    objectives: [
      {
        objective_id: "OBJ-1",
        title: "Only objective",
        phases: [
          {
            phase_id: "PH-1",
            title: "Only phase",
            runs: runPatches.map((patch, i) => ({
              run_id: `RUN-CLS-TEST-${String(i + 1).padStart(3, "0")}`,
              queue_order: i + 1,
              title: `Run ${i + 1}`,
              summary: "A run.",
              full_description: "A run built by the classification suite.",
              status: "planned",
              depends_on: [],
              ...patch,
            })),
          },
        ],
      },
    ],
  };
}

const errorsFor = (...runPatches) => core.checkInvariants(roadmapWith(...runPatches), {});
// Errors mentioning a token/field, so an assertion cannot pass on an unrelated failure.
const errorsMentioning = (errors, needle) => errors.filter((e) => e.includes(needle));

// A fully and legally classified run, used as the "everything present is fine" baseline
// and as the neighbour that the illegal-combination tests perturb one field at a time.
const LEGAL_FULL = {
  correctness_model: "JUDGED_ACCEPTS",
  work_type: "FUNCTIONAL",
  blast_radius: "ADJACENT",
  failure_surfaces: "VISIBLE",
  external_effects: [],
  classified_at: "2026-07-31",
};

// ------------------------------------------------------------------ C.1 — the schema

test("the six classification fields are allowed keys of a run", () => {
  for (const key of CLASSIFICATION_KEYS) {
    assert.ok(core.RUN_ALLOWED_FIELDS.includes(key), `${key} must be an allowed run field`);
  }
});

test("all six are OPTIONAL: none of them is a required field", () => {
  for (const key of CLASSIFICATION_KEYS) {
    assert.ok(!core.RUN_REQUIRED_FIELDS.includes(key), `${key} must NOT be required`);
    assert.ok(core.RUN_OPTIONAL_FIELDS.includes(key), `${key} must be optional`);
  }
});

test("the DERIVED fields never became storable: severity and closure_mode are not run keys", () => {
  for (const derived of ["severity", "closure_mode"]) {
    assert.ok(!core.RUN_ALLOWED_FIELDS.includes(derived), `${derived} is derived and must not be a stored key`);
  }
});

test("the four closed vocabularies are the ones §1 publishes, verbatim and in order", () => {
  assert.deepEqual(core.CORRECTNESS_MODELS, ["SPECIFIED", "JUDGED_ACCEPTS", "JUDGED_DEFINES"]);
  assert.deepEqual(core.WORK_TYPES, ["COSMETIC", "FUNCTIONAL", "FOUNDATIONAL"]);
  assert.deepEqual(core.BLAST_RADII, ["LOCAL", "ADJACENT", "SYSTEMIC", "PROJECT_SHAPE"]);
  assert.deepEqual(core.FAILURE_SURFACES, ["LOUD", "VISIBLE", "SILENT"]);
});

// ---------------------------------------------- C.2 — absent by default, and that is VALID

test("a run carrying NONE of the six is valid — this is what keeps unclassified roadmaps green", () => {
  assert.deepEqual(errorsFor({}), []);
});

test("a whole roadmap of unclassified runs is valid", () => {
  assert.deepEqual(errorsFor({}, {}, {}, {}), []);
});

test("a run carrying all six, legally, is valid", () => {
  assert.deepEqual(errorsFor(LEGAL_FULL), []);
});

test("classification is not all-or-nothing: one field alone is valid", () => {
  for (const [key, value] of Object.entries(LEGAL_FULL)) {
    assert.deepEqual(errorsFor({ [key]: value }), [], `${key} alone must be valid`);
  }
});

// --------------------------------- D.2 — out of vocabulary REJECTS, and absent is not that

const VOCABULARY_CASES = [
  { field: "correctness_model", legal: "SPECIFIED", illegal: "ESPECIFICADO" },
  { field: "work_type", legal: "FUNCTIONAL", illegal: "FUNCIONAL" },
  { field: "blast_radius", legal: "PROJECT_SHAPE", illegal: "GLOBAL" },
  { field: "failure_surfaces", legal: "SILENT", illegal: "QUIET" },
];

for (const { field, legal, illegal } of VOCABULARY_CASES) {
  test(`${field}: a value outside the vocabulary is REJECTED`, () => {
    const errors = errorsMentioning(errorsFor({ [field]: illegal }), field);
    assert.equal(errors.length, 1, `expected exactly one ${field} error, got ${JSON.stringify(errors)}`);
    assert.match(errors[0], new RegExp(JSON.stringify(illegal)), "the error must quote the offending value");
  });

  test(`${field}: the neighbouring LEGAL value passes`, () => {
    assert.deepEqual(errorsFor({ [field]: legal }), []);
  });

  test(`${field}: ABSENT is not the same as invalid — it raises nothing`, () => {
    assert.deepEqual(errorsFor({}), []);
  });

  test(`${field}: a lowercased legal token is still out of vocabulary — tokens are data, not prose`, () => {
    assert.equal(errorsMentioning(errorsFor({ [field]: legal.toLowerCase() }), field).length, 1);
  });
}

test("a null value is rejected as out of vocabulary, not waved through as 'empty'", () => {
  assert.equal(errorsMentioning(errorsFor({ work_type: null }), "work_type").length, 1);
});

// ------------------------------------------------- §1 — external_effects, the guard list

test("external_effects: the empty list is legal — it is the declared default shape", () => {
  assert.deepEqual(errorsFor({ external_effects: [] }), []);
});

test("external_effects: a populated list is legal, and its entries are NOT a closed vocabulary", () => {
  assert.deepEqual(errorsFor({ external_effects: ["publishes to npm", "sends mail"] }), []);
});

test("external_effects: a non-array is REJECTED", () => {
  assert.equal(errorsMentioning(errorsFor({ external_effects: "publishes to npm" }), "external_effects").length, 1);
});

test("external_effects: a list holding a non-string or an empty string is REJECTED", () => {
  assert.equal(errorsMentioning(errorsFor({ external_effects: [42] }), "external_effects").length, 1);
  assert.equal(errorsMentioning(errorsFor({ external_effects: [""] }), "external_effects").length, 1);
});

// ---------------------------------------------------------------- §1 — classified_at

test("classified_at: a non-empty string is legal, and no format is imposed", () => {
  assert.deepEqual(errorsFor({ classified_at: "2026-07-31" }), []);
  assert.deepEqual(errorsFor({ classified_at: "2026-07-31T12:00:00Z" }), []);
});

test("classified_at: an empty string or a non-string is REJECTED", () => {
  assert.equal(errorsMentioning(errorsFor({ classified_at: "" }), "classified_at").length, 1);
  assert.equal(errorsMentioning(errorsFor({ classified_at: 20260731 }), "classified_at").length, 1);
});

// ------------------------------- D.1 — illegal combination 1: SPECIFIED + FOUNDATIONAL

test("ILLEGAL: SPECIFIED + FOUNDATIONAL is REJECTED", () => {
  const errors = errorsMentioning(errorsFor({ correctness_model: "SPECIFIED", work_type: "FOUNDATIONAL" }), "SPECIFIED + FOUNDATIONAL");
  assert.equal(errors.length, 1, `expected the combination to be rejected, got ${JSON.stringify(errors)}`);
});

test("LEGAL NEIGHBOUR: SPECIFIED + FUNCTIONAL passes", () => {
  assert.deepEqual(errorsFor({ correctness_model: "SPECIFIED", work_type: "FUNCTIONAL" }), []);
});

test("LEGAL NEIGHBOUR: JUDGED_DEFINES + FOUNDATIONAL passes", () => {
  assert.deepEqual(errorsFor({ correctness_model: "JUDGED_DEFINES", work_type: "FOUNDATIONAL" }), []);
});

test("half-classified does not fire: FOUNDATIONAL alone, or SPECIFIED alone, is valid", () => {
  assert.deepEqual(errorsFor({ work_type: "FOUNDATIONAL" }), []);
  assert.deepEqual(errorsFor({ correctness_model: "SPECIFIED" }), []);
});

// ----------------------------------- D.1 — illegal combination 2: FOUNDATIONAL + LOUD

test("ILLEGAL: FOUNDATIONAL + LOUD is REJECTED", () => {
  const errors = errorsMentioning(errorsFor({ work_type: "FOUNDATIONAL", failure_surfaces: "LOUD" }), "FOUNDATIONAL + LOUD");
  assert.equal(errors.length, 1, `expected the combination to be rejected, got ${JSON.stringify(errors)}`);
});

test("LEGAL NEIGHBOUR: FOUNDATIONAL + VISIBLE passes", () => {
  assert.deepEqual(errorsFor({ work_type: "FOUNDATIONAL", failure_surfaces: "VISIBLE" }), []);
});

test("LEGAL NEIGHBOUR: FUNCTIONAL + LOUD passes", () => {
  assert.deepEqual(errorsFor({ work_type: "FUNCTIONAL", failure_surfaces: "LOUD" }), []);
});

test("half-classified does not fire: LOUD alone is valid", () => {
  assert.deepEqual(errorsFor({ failure_surfaces: "LOUD" }), []);
});

test("a run can break BOTH implemented combinations at once, and both are reported", () => {
  const errors = errorsFor({ correctness_model: "SPECIFIED", work_type: "FOUNDATIONAL", failure_surfaces: "LOUD" });
  assert.equal(errorsMentioning(errors, "SPECIFIED + FOUNDATIONAL").length, 1);
  assert.equal(errorsMentioning(errors, "FOUNDATIONAL + LOUD").length, 1);
});

// ----------------------- D.1 — the rejection is real: it aborts a WRITE, not just a check

test("an illegal combination reaching the engine's write path is REFUSED, and nothing is written", () => {
  const dir = mkdtempSync(join(tmpdir(), "cls-write-"));
  try {
    const filePath = join(dir, "roadmap.json");
    const obj = roadmapWith({ correctness_model: "SPECIFIED", work_type: "FOUNDATIONAL" });
    // Seed the file by hand: this state must never be reachable through the engine.
    const seeded = core.serialize(obj, "\n");
    writeFileSync(filePath, seeded);
    const before = readFileSync(filePath, "utf8");
    const plan = planEdit({
      filePath,
      op: "set-text",
      args: { targetType: "run", targetId: "RUN-CLS-TEST-001", title: "A new title" },
    });
    assert.equal(plan.ok, false, "the plan must not succeed on a roadmap holding an illegal combination");
    assert.ok(
      plan.errors.some((e) => e.includes("SPECIFIED + FOUNDATIONAL")),
      `the refusal must name the combination, got ${JSON.stringify(plan.errors)}`
    );
    assert.equal(readFileSync(filePath, "utf8"), before, "nothing may be written");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

// ------------------------------------------- C.3 — no default is ever written to disk

test("the FROZEN canonical round-trips byte-identical: read + write invents no classification key", () => {
  const path = frozenCanonicalPath("aiw-console");
  const raw = core.loadRaw(path);
  const obj = core.parseRoadmap(raw);
  assert.deepEqual(core.checkInvariants(obj, { externalRunIds: null }), []);
  assert.equal(core.serialize(obj, core.detectEol(raw)), raw, "round-trip must be byte-identical");
});

test("normalizeRunKeyOrder adds no classification key to an unclassified run", () => {
  const obj = roadmapWith({});
  const run = obj.objectives[0].phases[0].runs[0];
  core.normalizeRunKeyOrder(run);
  for (const key of CLASSIFICATION_KEYS) {
    assert.ok(!(key in run), `${key} must stay absent; absence is the default`);
  }
  assert.deepEqual(Object.keys(run), core.RUN_REQUIRED_FIELDS);
});

test("a real engine WRITE over an unclassified roadmap leaves every run unclassified", () => {
  const dir = mkdtempSync(join(tmpdir(), "cls-nodefault-"));
  try {
    const filePath = join(dir, "roadmap.json");
    cpSync(frozenCanonicalPath("aiw-console"), filePath);
    const before = readFileSync(filePath, "utf8");
    const beforeObj = core.parseRoadmap(before);
    const target = core.globalOrdered(beforeObj)[0].run_id;

    const plan = planEdit({ filePath, op: "set-text", args: { targetType: "run", targetId: target, title: "Retitled by the classification suite" } });
    assert.equal(plan.ok, true, `the edit must plan cleanly, got ${JSON.stringify(plan.errors)}`);
    applyPlan({ filePath, serialized: plan.serialized, validate: null });

    const afterObj = core.parseRoadmap(readFileSync(filePath, "utf8"));
    const runs = core.globalOrdered(afterObj);
    for (const run of runs) {
      for (const key of CLASSIFICATION_KEYS) {
        assert.ok(!(key in run), `the write filled ${key} on ${run.run_id}; absent must mean absent`);
      }
    }
    // And the only difference anywhere is the title we asked for.
    const edited = runs.find((r) => r.run_id === target);
    assert.equal(edited.title, "Retitled by the classification suite");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("an unclassified roadmap written back untouched is BYTE-IDENTICAL through the real write path", () => {
  const dir = mkdtempSync(join(tmpdir(), "cls-byte-"));
  try {
    const filePath = join(dir, "roadmap.json");
    cpSync(frozenCanonicalPath("aiw-console"), filePath);
    const before = readFileSync(filePath, "utf8");
    const obj = core.parseRoadmap(before);
    // The engine's own serializer, with the file's own endings — the exact bytes any
    // mutation would produce if it changed nothing.
    for (const run of core.globalOrdered(obj)) core.normalizeRunKeyOrder(run);
    assert.equal(core.serialize(obj, core.detectEol(before)), before);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

// ------------------------------------------------------- serialization order (C.4 form)

test("classification keys serialize between the planning fields and the closeout fields", () => {
  const run = {
    progress: [],
    classified_at: "2026-07-31",
    closeout_result: "completed_successfully",
    run_id: "RUN-CLS-TEST-001",
    work_type: "FUNCTIONAL",
    queue_order: 1,
    lane: "FORGE",
    title: "t",
    summary: "s",
    full_description: "f",
    status: "planned",
    depends_on: [],
    correctness_model: "SPECIFIED",
    blast_radius: "LOCAL",
    failure_surfaces: "VISIBLE",
    external_effects: [],
    barrier: "lane",
  };
  core.normalizeRunKeyOrder(run);
  assert.deepEqual(Object.keys(run), [
    "run_id",
    "queue_order",
    "title",
    "summary",
    "full_description",
    "status",
    "depends_on",
    "lane",
    "barrier",
    "correctness_model",
    "work_type",
    "blast_radius",
    "failure_surfaces",
    "external_effects",
    "classified_at",
    "closeout_result",
    "progress",
  ]);
});

// --------------------------------------------------------------- the allowlist still bites

test("an unknown key is still rejected — the six did not open the run object", () => {
  const errors = errorsMentioning(errorsFor({ severity: "MAJOR" }), "unexpected field severity");
  assert.equal(errors.length, 1, "severity is DERIVED and must be refused as a stored key");
});

test("care_budget is not a run key here — it is not this run's surface", () => {
  assert.equal(errorsMentioning(errorsFor({ care_budget: "Opus · Max" }), "unexpected field care_budget").length, 1);
});

// ---------------------------------------------------------------------------
// NOT IMPLEMENTED, AND WHY — the third illegal combination of §3.
//
// §3 declares three illegal combinations. Two are asserted above. The third,
// `JUDGED_*` + `UNATTENDED`, is NOT implemented and has no test here, because `UNATTENDED`
// is not a value of any STORED field: it is a value of `closure_mode`
// (context/CLASIFICACION-DE-RUNS.md:73), which §2 declares DERIVED and NEVER stored. The
// check is undecidable from the schema alone; it needs the derivation function, which is
// not this run's surface. Deriving it here would put the derivation table in the engine —
// a decision that belongs to the cabin, not to this file.
// ---------------------------------------------------------------------------
