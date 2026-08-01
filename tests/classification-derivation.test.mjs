// [#43] THE DERIVATION — `severity` and `closure_mode`, computed at read time, never stored.
//
// Scope of this file: context/CLASIFICACION-DE-RUNS.md §2 and the part of §3 that is a
// PROPERTY of the derivation rather than a field check. It exercises exactly one
// implementation — tools/classification/classification.mjs — because there is exactly one,
// and the whole point of §2 is that two consumers must not derive differently.
//
// The tables are asserted CELL BY CELL against the published document, not against a second
// copy of the code's own constants: a test that read `SEVERITY_DERIVATION.table` to check
// `deriveSeverity` would only prove the function can read its own table.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as core from "../tools/roadmap/roadmap-core.mjs";
import {
  BLAST_RADII,
  CLOSURE_MODES,
  CORRECTNESS_MODELS,
  FAILURE_SURFACES,
  SEVERITIES,
  WORK_TYPES,
  deriveClassification,
  deriveClosureMode,
  deriveSeverity,
  isClassified,
} from "../tools/classification/classification.mjs";
import { frozenCanonicalPath } from "./helpers/neighbours.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");

// ---------------------------------------------------------------------------
// §2.1 — the severity table, transcribed from the published document (rows are `work_type`,
// columns are `blast_radius`). This literal is the SPECIFICATION side of the test; the code
// is the other side, and the test exists to hold them together.
// ---------------------------------------------------------------------------
const PUBLISHED_SEVERITY = {
  COSMETIC:     { LOCAL: "MINOR",    ADJACENT: "MINOR",    SYSTEMIC: "MODERATE", PROJECT_SHAPE: "MODERATE" },
  FUNCTIONAL:   { LOCAL: "MODERATE", ADJACENT: "MODERATE", SYSTEMIC: "MAJOR",    PROJECT_SHAPE: "MAJOR" },
  FOUNDATIONAL: { LOCAL: "MAJOR",    ADJACENT: "MAJOR",    SYSTEMIC: "CRITICAL", PROJECT_SHAPE: "CRITICAL" },
};
// The one adjustment, as published: LOUD -1, VISIBLE 0, SILENT +1.
const PUBLISHED_ADJUSTMENT = { LOUD: -1, VISIBLE: 0, SILENT: 1 };

// ---------------------------------------------------------------------------
// The vocabularies, first: everything below walks them, so a drifted vocabulary would
// silently shrink every sweep in this file instead of failing.
// ---------------------------------------------------------------------------

test("the four closed vocabularies are the published ones, and the engine re-exports the same arrays", () => {
  assert.deepEqual(CORRECTNESS_MODELS, ["SPECIFIED", "JUDGED_ACCEPTS", "JUDGED_DEFINES"]);
  assert.deepEqual(WORK_TYPES, ["COSMETIC", "FUNCTIONAL", "FOUNDATIONAL"]);
  assert.deepEqual(BLAST_RADII, ["LOCAL", "ADJACENT", "SYSTEMIC", "PROJECT_SHAPE"]);
  assert.deepEqual(FAILURE_SURFACES, ["LOUD", "VISIBLE", "SILENT"]);
  assert.deepEqual(SEVERITIES, ["MINOR", "MODERATE", "MAJOR", "CRITICAL"]);
  assert.deepEqual(CLOSURE_MODES, ["UNATTENDED", "SEMI_ATTENDED", "ATTENDED"]);
  // ONE address for the tokens: the engine re-exports, it does not re-declare.
  assert.equal(core.WORK_TYPES, WORK_TYPES);
  assert.equal(core.CORRECTNESS_MODELS, CORRECTNESS_MODELS);
  assert.equal(core.BLAST_RADII, BLAST_RADII);
  assert.equal(core.FAILURE_SURFACES, FAILURE_SURFACES);
});

// ---------------------------------------------------------------------------
// B.2 — the severity table, complete, and its single saturating adjustment.
// ---------------------------------------------------------------------------

test("§2.1: every cell of the work_type × blast_radius table derives the published severity", () => {
  let cells = 0;
  for (const workType of WORK_TYPES) {
    for (const blastRadius of BLAST_RADII) {
      cells += 1;
      // VISIBLE is the 0 adjustment, so this reads the table itself and nothing else.
      const severity = deriveSeverity({ work_type: workType, blast_radius: blastRadius, failure_surfaces: "VISIBLE" });
      assert.equal(severity, PUBLISHED_SEVERITY[workType][blastRadius], `${workType} × ${blastRadius}`);
      // The same cell with NO failure_surfaces at all: the adjustment is not a requirement,
      // so the base result must be identical.
      assert.equal(deriveSeverity({ work_type: workType, blast_radius: blastRadius }), PUBLISHED_SEVERITY[workType][blastRadius]);
    }
  }
  assert.equal(cells, 12, "the published table has 3 work types × 4 blast radii");
});

test("§2.1: the failure_surfaces adjustment moves the result by exactly one step, in the published direction", () => {
  let checked = 0;
  for (const workType of WORK_TYPES) {
    for (const blastRadius of BLAST_RADII) {
      const base = PUBLISHED_SEVERITY[workType][blastRadius];
      for (const surface of FAILURE_SURFACES) {
        checked += 1;
        const expectedIndex = Math.max(0, Math.min(SEVERITIES.length - 1, SEVERITIES.indexOf(base) + PUBLISHED_ADJUSTMENT[surface]));
        assert.equal(
          deriveSeverity({ work_type: workType, blast_radius: blastRadius, failure_surfaces: surface }),
          SEVERITIES[expectedIndex],
          `${workType} × ${blastRadius} × ${surface}`
        );
      }
    }
  }
  assert.equal(checked, 36, "12 cells × 3 failure surfaces");
});

test("§2.1: the adjustment SATURATES between MINOR and CRITICAL and never leaves the scale", () => {
  // Bottom of the scale, pushed down: MINOR stays MINOR.
  assert.equal(deriveSeverity({ work_type: "COSMETIC", blast_radius: "LOCAL", failure_surfaces: "VISIBLE" }), "MINOR");
  assert.equal(deriveSeverity({ work_type: "COSMETIC", blast_radius: "LOCAL", failure_surfaces: "LOUD" }), "MINOR");
  assert.equal(deriveSeverity({ work_type: "COSMETIC", blast_radius: "ADJACENT", failure_surfaces: "LOUD" }), "MINOR");
  // Top of the scale, pushed up: CRITICAL stays CRITICAL.
  assert.equal(deriveSeverity({ work_type: "FOUNDATIONAL", blast_radius: "SYSTEMIC", failure_surfaces: "VISIBLE" }), "CRITICAL");
  assert.equal(deriveSeverity({ work_type: "FOUNDATIONAL", blast_radius: "SYSTEMIC", failure_surfaces: "SILENT" }), "CRITICAL");
  assert.equal(deriveSeverity({ work_type: "FOUNDATIONAL", blast_radius: "PROJECT_SHAPE", failure_surfaces: "SILENT" }), "CRITICAL");
  // And the whole product never produces a token outside the declared scale.
  for (const workType of WORK_TYPES) {
    for (const blastRadius of BLAST_RADII) {
      for (const surface of FAILURE_SURFACES) {
        const severity = deriveSeverity({ work_type: workType, blast_radius: blastRadius, failure_surfaces: surface });
        assert.ok(SEVERITIES.includes(severity), `${severity} is outside the scale`);
      }
    }
  }
});

// ---------------------------------------------------------------------------
// B.2 — the closure_mode table and its guard.
// ---------------------------------------------------------------------------

test("§2.2: the four published rows derive the published closure mode", () => {
  // SPECIFIED + MINOR/MODERATE -> UNATTENDED.
  assert.equal(deriveClosureMode({ correctness_model: "SPECIFIED", work_type: "COSMETIC", blast_radius: "LOCAL" }), "UNATTENDED");
  assert.equal(deriveClosureMode({ correctness_model: "SPECIFIED", work_type: "COSMETIC", blast_radius: "SYSTEMIC" }), "UNATTENDED");
  // SPECIFIED + MAJOR/CRITICAL -> SEMI_ATTENDED.
  assert.equal(deriveClosureMode({ correctness_model: "SPECIFIED", work_type: "FUNCTIONAL", blast_radius: "SYSTEMIC" }), "SEMI_ATTENDED");
  assert.equal(deriveClosureMode({ correctness_model: "SPECIFIED", work_type: "FUNCTIONAL", blast_radius: "SYSTEMIC", failure_surfaces: "SILENT" }), "SEMI_ATTENDED");
  // JUDGED_ACCEPTS -> SEMI_ATTENDED, whatever the severity (the row carries no severity).
  for (const workType of WORK_TYPES) {
    for (const blastRadius of BLAST_RADII) {
      assert.equal(deriveClosureMode({ correctness_model: "JUDGED_ACCEPTS", work_type: workType, blast_radius: blastRadius }), "SEMI_ATTENDED");
      assert.equal(deriveClosureMode({ correctness_model: "JUDGED_DEFINES", work_type: workType, blast_radius: blastRadius }), "ATTENDED");
    }
  }
  // JUDGED_* needs no severity at all: the two rows match on the correctness model alone.
  assert.equal(deriveClosureMode({ correctness_model: "JUDGED_ACCEPTS" }), "SEMI_ATTENDED");
  assert.equal(deriveClosureMode({ correctness_model: "JUDGED_DEFINES" }), "ATTENDED");
});

test("§2.2 guard: a non-empty external_effects RAISES the closure mode to SEMI_ATTENDED as a minimum", () => {
  const specifiedMinor = { correctness_model: "SPECIFIED", work_type: "COSMETIC", blast_radius: "LOCAL" };
  assert.equal(deriveClosureMode(specifiedMinor), "UNATTENDED");
  assert.equal(deriveClosureMode({ ...specifiedMinor, external_effects: ["publishes to npm"] }), "SEMI_ATTENDED");
  // Two entries, same answer: the guard is about non-emptiness, not about how many.
  assert.equal(deriveClosureMode({ ...specifiedMinor, external_effects: ["a", "b"] }), "SEMI_ATTENDED");
});

test("§2.2 guard: it NEVER lowers — an ATTENDED run does not degrade to SEMI_ATTENDED for having external effects", () => {
  const judgedDefines = { correctness_model: "JUDGED_DEFINES", work_type: "FUNCTIONAL", blast_radius: "LOCAL" };
  assert.equal(deriveClosureMode(judgedDefines), "ATTENDED");
  assert.equal(deriveClosureMode({ ...judgedDefines, external_effects: ["writes to a live bucket"] }), "ATTENDED");
  // And a mode already AT the minimum is left exactly where the table put it.
  const judgedAccepts = { correctness_model: "JUDGED_ACCEPTS", external_effects: ["sends mail"] };
  assert.equal(deriveClosureMode(judgedAccepts), "SEMI_ATTENDED");
  // The guard direction holds across the WHOLE product: adding effects never moves the
  // result down the scale, only up or nowhere.
  for (const correctness of CORRECTNESS_MODELS) {
    for (const workType of WORK_TYPES) {
      for (const blastRadius of BLAST_RADII) {
        for (const surface of FAILURE_SURFACES) {
          const run = { correctness_model: correctness, work_type: workType, blast_radius: blastRadius, failure_surfaces: surface };
          const without = deriveClosureMode(run);
          const with_ = deriveClosureMode({ ...run, external_effects: ["an effect"] });
          assert.ok(
            CLOSURE_MODES.indexOf(with_) >= CLOSURE_MODES.indexOf(without),
            `guard lowered ${without} to ${with_} for ${correctness}/${workType}/${blastRadius}/${surface}`
          );
        }
      }
    }
  }
});

// ---------------------------------------------------------------------------
// B.3 — absent and [] are the SAME answer.
// ---------------------------------------------------------------------------

test("B.3: an ABSENT external_effects and an EMPTY external_effects derive identically, across the whole product", () => {
  let compared = 0;
  for (const correctness of CORRECTNESS_MODELS) {
    for (const workType of WORK_TYPES) {
      for (const blastRadius of BLAST_RADII) {
        for (const surface of FAILURE_SURFACES) {
          const base = { correctness_model: correctness, work_type: workType, blast_radius: blastRadius, failure_surfaces: surface };
          const absent = deriveClassification(base);
          const empty = deriveClassification({ ...base, external_effects: [] });
          assert.deepEqual(empty, absent, `${correctness}/${workType}/${blastRadius}/${surface}`);
          compared += 1;
        }
      }
    }
  }
  assert.equal(compared, 108);
  // And the one case the guard would change if [] counted as non-empty.
  const specifiedMinor = { correctness_model: "SPECIFIED", work_type: "COSMETIC", blast_radius: "LOCAL" };
  assert.equal(deriveClosureMode(specifiedMinor), "UNATTENDED");
  assert.equal(deriveClosureMode({ ...specifiedMinor, external_effects: [] }), "UNATTENDED");
});

// ---------------------------------------------------------------------------
// B.4 — A DERIVED WITHOUT ITS INPUTS IS ABSENT, NOT DEFECTIVE.
// ---------------------------------------------------------------------------

test("B.4: severity is ABSENT (null) whenever work_type or blast_radius is missing", () => {
  assert.equal(deriveSeverity({}), null);
  assert.equal(deriveSeverity({ work_type: "FUNCTIONAL" }), null);
  assert.equal(deriveSeverity({ blast_radius: "SYSTEMIC" }), null);
  assert.equal(deriveSeverity({ work_type: "FUNCTIONAL", failure_surfaces: "SILENT" }), null);
  assert.equal(deriveSeverity({ blast_radius: "SYSTEMIC", failure_surfaces: "SILENT" }), null);
  // Not MINOR. Not "". Not 0. The absence is null and nothing else — a default here would be
  // the second copy that rots, wearing the shape of a default.
  assert.notEqual(deriveSeverity({}), "MINOR");
  assert.equal(deriveSeverity({ work_type: "FUNCTIONAL", blast_radius: "SYSTEMIC" }), "MAJOR");
});

test("B.4: closure_mode is ABSENT (null) without correctness_model, and on the SPECIFIED branch without a severity", () => {
  assert.equal(deriveClosureMode({}), null);
  assert.equal(deriveClosureMode({ work_type: "FUNCTIONAL", blast_radius: "SYSTEMIC" }), null);
  // SPECIFIED alone cannot answer: its two rows both read the severity, which is itself absent.
  assert.equal(deriveClosureMode({ correctness_model: "SPECIFIED" }), null);
  assert.equal(deriveClosureMode({ correctness_model: "SPECIFIED", work_type: "FUNCTIONAL" }), null);
  assert.equal(deriveClosureMode({ correctness_model: "SPECIFIED", blast_radius: "LOCAL" }), null);
  // Even with external effects, which would otherwise raise it: the guard raises a mode, and
  // there is no mode to raise.
  assert.equal(deriveClosureMode({ correctness_model: "SPECIFIED", external_effects: ["publishes"] }), null);
  // The JUDGED_* branches do not read severity, so they answer without one.
  assert.equal(deriveClosureMode({ correctness_model: "JUDGED_DEFINES" }), "ATTENDED");
});

test("B.4: THE PARTIAL CASE, exactly as the implementation returns it", () => {
  // A run classified only in part. This is the shape the record reports: both keys always
  // present, `null` meaning ABSENT, no field invented and no exception thrown.
  assert.deepEqual(deriveClassification({ work_type: "FUNCTIONAL" }), { severity: null, closure_mode: null });
  assert.deepEqual(deriveClassification({ correctness_model: "SPECIFIED", work_type: "FUNCTIONAL" }), { severity: null, closure_mode: null });
  // Severity derivable, closure mode not: only ONE of the two goes absent.
  assert.deepEqual(deriveClassification({ work_type: "FUNCTIONAL", blast_radius: "SYSTEMIC" }), { severity: "MAJOR", closure_mode: null });
  // Closure mode derivable, severity not: the other way round, on a JUDGED_* branch.
  assert.deepEqual(deriveClassification({ correctness_model: "JUDGED_DEFINES" }), { severity: null, closure_mode: "ATTENDED" });
  // Wholly unclassified.
  assert.deepEqual(deriveClassification({}), { severity: null, closure_mode: null });
  // A run object that is not a run at all still answers, and still answers ABSENT.
  assert.deepEqual(deriveClassification(null), { severity: null, closure_mode: null });
});

test("B.4: a value OUTSIDE the vocabulary yields no derived value — the derivation invents nothing from what the engine would refuse", () => {
  assert.equal(deriveSeverity({ work_type: "FUNCIONAL", blast_radius: "LOCAL" }), null);
  assert.equal(deriveSeverity({ work_type: "FUNCTIONAL", blast_radius: "GLOBAL" }), null);
  assert.equal(deriveSeverity({ work_type: "FUNCTIONAL", blast_radius: "LOCAL", failure_surfaces: "QUIET" }), null);
  assert.equal(deriveClosureMode({ correctness_model: "specified", work_type: "COSMETIC", blast_radius: "LOCAL" }), null);
  // A malformed guard list is not a list: no closure mode is derived from it.
  assert.equal(deriveClosureMode({ correctness_model: "JUDGED_ACCEPTS", external_effects: "publishes" }), null);
  // And the engine is what actually REFUSES those values — the derivation only declines to
  // read them (regression against the encargo-1 vocabulary invariant).
  const roadmap = {
    schema_version: "roadmap_tree_v1",
    roadmap_id: "roadmap",
    title: "t",
    objectives: [{ objective_id: "O", title: "o", phases: [{ phase_id: "P", title: "p", runs: [{
      run_id: "RUN-X-001", queue_order: 1, title: "t", summary: "s", full_description: "f",
      status: "planned", depends_on: [], work_type: "FUNCIONAL",
    }] }] }],
  };
  const errors = core.checkInvariants(roadmap, {});
  assert.ok(errors.some((e) => e.includes("work_type") && e.includes("FUNCIONAL")), errors.join("\n"));
});

// ---------------------------------------------------------------------------
// D.1 / D.2 — the THIRD illegal combination, as a property of the table.
// ---------------------------------------------------------------------------

test("D.1: no entry in the COMPLETE product with a JUDGED_* correctness model ever derives UNATTENDED", () => {
  let entries = 0;
  let judgedEntries = 0;
  let unattendedEntries = 0;
  for (const correctness of CORRECTNESS_MODELS) {
    for (const workType of WORK_TYPES) {
      for (const blastRadius of BLAST_RADII) {
        for (const surface of FAILURE_SURFACES) {
          // BOTH forms of the guard list: empty (which §1 says is the default, and which B.3
          // proves means the same as absent) and non-empty.
          for (const externalEffects of [[], ["an external effect"]]) {
            entries += 1;
            const run = {
              correctness_model: correctness,
              work_type: workType,
              blast_radius: blastRadius,
              failure_surfaces: surface,
              external_effects: externalEffects,
            };
            const closureMode = deriveClosureMode(run);
            if (closureMode === "UNATTENDED") unattendedEntries += 1;
            if (correctness === "JUDGED_ACCEPTS" || correctness === "JUDGED_DEFINES") {
              judgedEntries += 1;
              assert.notEqual(
                closureMode,
                "UNATTENDED",
                `${correctness}/${workType}/${blastRadius}/${surface}/effects=${externalEffects.length} derived UNATTENDED`
              );
            }
          }
        }
      }
    }
  }
  // D.2 — the size of the product actually walked, asserted rather than assumed.
  assert.equal(CORRECTNESS_MODELS.length * WORK_TYPES.length * BLAST_RADII.length * FAILURE_SURFACES.length, 108);
  assert.equal(entries, 216, "3 × 3 × 4 × 3 = 108 combinations, × 2 forms of external_effects");
  assert.equal(judgedEntries, 144, "two of the three correctness models are JUDGED_*");
  // The combination is unreachable, but NOT because nothing derives UNATTENDED at all: the
  // SPECIFIED branch does, so the property above is a real constraint and not a vacuous one.
  assert.ok(unattendedEntries > 0, "UNATTENDED must be reachable, or the property proves nothing");
});

test("D.1: the same property holds when the guard list is ABSENT rather than empty", () => {
  let entries = 0;
  for (const correctness of ["JUDGED_ACCEPTS", "JUDGED_DEFINES"]) {
    for (const workType of WORK_TYPES) {
      for (const blastRadius of BLAST_RADII) {
        for (const surface of FAILURE_SURFACES) {
          entries += 1;
          assert.notEqual(
            deriveClosureMode({ correctness_model: correctness, work_type: workType, blast_radius: blastRadius, failure_surfaces: surface }),
            "UNATTENDED"
          );
        }
      }
    }
  }
  assert.equal(entries, 72);
  // Partial classifications on a JUDGED_* model cannot reach it either: they derive
  // SEMI_ATTENDED / ATTENDED, or nothing at all.
  for (const correctness of ["JUDGED_ACCEPTS", "JUDGED_DEFINES"]) {
    assert.notEqual(deriveClosureMode({ correctness_model: correctness }), "UNATTENDED");
    assert.notEqual(deriveClosureMode({ correctness_model: correctness, work_type: "COSMETIC" }), "UNATTENDED");
    assert.notEqual(deriveClosureMode({ correctness_model: correctness, external_effects: [] }), "UNATTENDED");
  }
});

// ---------------------------------------------------------------------------
// D.3 — the two invariants of the first commission still REJECT. Regression only: they are
// not rewritten and not re-specified here.
// ---------------------------------------------------------------------------

function roadmapWithRun(patch) {
  return {
    schema_version: "roadmap_tree_v1",
    roadmap_id: "roadmap",
    title: "Regression roadmap",
    objectives: [{ objective_id: "OBJ-1", title: "o", phases: [{ phase_id: "PH-1", title: "p", runs: [{
      run_id: "RUN-REG-001", queue_order: 1, title: "t", summary: "s",
      full_description: "f", status: "planned", depends_on: [], ...patch,
    }] }] }],
  };
}

test("D.3 regression: SPECIFIED + FOUNDATIONAL is still REJECTED, and its legal neighbours still pass", () => {
  const errors = core.checkInvariants(roadmapWithRun({ correctness_model: "SPECIFIED", work_type: "FOUNDATIONAL" }), {});
  assert.ok(errors.some((e) => e.includes("SPECIFIED + FOUNDATIONAL")), errors.join("\n"));
  assert.equal(core.checkInvariants(roadmapWithRun({ correctness_model: "SPECIFIED", work_type: "FUNCTIONAL" }), {}).length, 0);
  assert.equal(core.checkInvariants(roadmapWithRun({ correctness_model: "JUDGED_DEFINES", work_type: "FOUNDATIONAL" }), {}).length, 0);
});

test("D.3 regression: FOUNDATIONAL + LOUD is still REJECTED, and its legal neighbours still pass", () => {
  const errors = core.checkInvariants(roadmapWithRun({ work_type: "FOUNDATIONAL", failure_surfaces: "LOUD" }), {});
  assert.ok(errors.some((e) => e.includes("FOUNDATIONAL + LOUD")), errors.join("\n"));
  assert.equal(core.checkInvariants(roadmapWithRun({ work_type: "FOUNDATIONAL", failure_surfaces: "VISIBLE" }), {}).length, 0);
  assert.equal(core.checkInvariants(roadmapWithRun({ work_type: "FUNCTIONAL", failure_surfaces: "LOUD" }), {}).length, 0);
});

test("D.3 regression: the DERIVED tokens are still refused as stored run keys", () => {
  for (const key of ["severity", "closure_mode"]) {
    const errors = core.checkInvariants(roadmapWithRun({ [key]: "MAJOR" }), {});
    assert.ok(errors.some((e) => e.includes(`unexpected field ${key}`)), `${key}: ${errors.join("\n")}`);
  }
});

// ---------------------------------------------------------------------------
// C.3 — THE RESULT IS NEVER STORED. Deriving is a read; it must leave nothing behind.
// ---------------------------------------------------------------------------

test("C.3: deriving over a whole roadmap adds no key to any run — the objects come back unchanged", () => {
  const raw = readFileSync(frozenCanonicalPath("aiw-console"), "utf8");
  const roadmap = JSON.parse(raw);
  const before = JSON.stringify(roadmap);
  let derived = 0;
  for (const objective of roadmap.objectives || []) {
    for (const phase of objective.phases || []) {
      for (const run of phase.runs || []) {
        deriveClassification(run);
        deriveSeverity(run);
        deriveClosureMode(run);
        isClassified(run);
        derived += 1;
        assert.ok(!("severity" in run), `${run.run_id} gained a severity key`);
        assert.ok(!("closure_mode" in run), `${run.run_id} gained a closure_mode key`);
      }
    }
  }
  assert.ok(derived > 0);
  assert.equal(JSON.stringify(roadmap), before, "the derivation mutated the tree it read");
});

test("C.3: the LIVE canonical of this repo carries no severity and no closure_mode, before or after deriving", () => {
  const raw = readFileSync(resolve(REPO_ROOT, "roadmap", "roadmap.json"), "utf8");
  // Bytes first: the tokens are not in the file at all as run keys.
  assert.equal(/"severity"\s*:/.test(raw), false);
  assert.equal(/"closure_mode"\s*:/.test(raw), false);
  const roadmap = JSON.parse(raw);
  const runs = [];
  for (const objective of roadmap.objectives || []) {
    for (const phase of objective.phases || []) {
      for (const run of phase.runs || []) runs.push(run);
    }
  }
  runs.forEach((run) => deriveClassification(run));
  assert.equal(runs.filter((run) => "severity" in run || "closure_mode" in run).length, 0);
  // And every run of the live canonical still round-trips through the engine byte-identically.
  assert.equal(core.serialize(core.parseRoadmap(raw), core.detectEol(raw)), raw);
});
