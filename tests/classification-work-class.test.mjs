// [#68] THE WORK CLASS — `work_class`, context/CLASIFICACION-DE-RUNS.md §9.
//
// What the operator decided on 2026-10-19 (record ENCUADRE-PARADA-68-2026-10-19.md, plus the
// choices made after the workshop's stop): the CLASS of work enters the classification as a NEW,
// OPTIONAL stored key with a closed vocabulary of five values, the same for every project; the
// RELATION between runs does NOT become a field (it is derived from depends_on and lanes, §10, and
// has no code here); writing or clearing the class does NOT move `classified_at`; and the
// design token is `UX_DESIGN`, not a bare "design", because the design of a schema or a plan is
// not this class.
//
// Five layers, each measured where it lives:
//
//   1. the vocabulary — published once, in the leaf both runtimes load, and checked against the
//                       table §9 publishes
//   2. the schema     — optional, absent by default, refused outside the vocabulary BY NAME, and
//                       no existing canonical turns invalid
//   3. the write op   — set-classification takes `workClass` by the same path as the other keys,
//                       clears it with null / "", and leaves the mark alone
//   4. the transport  — the key travels verbatim with the run, its vocabulary travels in
//                       taxonomy_model, and the §1 report names it
//   5. the console    — does not PAINT the class (that is #69), and must not break on a run that
//                       carries one
//
// Every import is a NAMESPACE import on purpose: a missing named export would fail this whole file
// at link time and count as one red, hiding which assertions were red before the change.
import test from "node:test";
import assert from "node:assert/strict";
import { cpSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import * as core from "../tools/roadmap/roadmap-core.mjs";
import * as plan from "../tools/roadmap/roadmap-plan.mjs";
import * as projector from "../tools/projector/project.mjs";
import * as classification from "../tools/classification/classification.mjs";
import { frozenCanonicalPath } from "./helpers/neighbours.mjs";
import { createConsoleHarness } from "./helpers/console-dom.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const SPEC = join(REPO_ROOT, "context", "CLASIFICACION-DE-RUNS.md");
const RENDERER = join(REPO_ROOT, "project-console", "assets", "project-console.js");
const LANES_ROOT = join(HERE, "fixtures", "lanes", "project");
const LANES_CANONICAL = join(LANES_ROOT, "roadmap", "roadmap.json");
const FIRST_RUN = "RUN-FIX-DOC-GUIDE-001";
const NOW = "2026-07-31T10:45:14.552Z";
const LATER = "2026-10-19T23:00:00.000Z";

// The vocabulary as the operator decided it, written ONCE here as the expectation.
const EXPECTED_CLASSES = ["FUNCTIONALITY", "DOCUMENTATION", "RESEARCH", "UX_DESIGN", "CONTENT"];
// The six stored keys of §1, which this run must leave exactly as they were published.
const SIX_OF_SECTION_1 = ["correctness_model", "work_type", "blast_radius", "failure_surfaces", "external_effects", "classified_at"];

const loadFixture = () => core.parseRoadmap(core.loadRaw(LANES_CANONICAL));
const runOf = (obj, id) => core.findRunEntry(obj, id).run;

function roadmapWith(...runPatches) {
  return {
    schema_version: "roadmap_tree_v1",
    roadmap_id: "roadmap",
    title: "Work class test roadmap",
    objectives: [{
      objective_id: "OBJ-1",
      title: "Only objective",
      phases: [{
        phase_id: "PH-1",
        title: "Only phase",
        runs: runPatches.map((patch, i) => ({
          run_id: `RUN-WC-TEST-${String(i + 1).padStart(3, "0")}`,
          queue_order: i + 1,
          title: `Run ${i + 1}`,
          summary: "A run.",
          full_description: "A run built by the work-class suite.",
          status: "planned",
          depends_on: [],
          ...patch,
        })),
      }],
    }],
  };
}
const errorsFor = (...runPatches) => core.checkInvariants(roadmapWith(...runPatches), {});
const errorsMentioning = (errors, needle) => errors.filter((e) => e.includes(needle));

function withTempProject(body) {
  const temp = mkdtempSync(join(tmpdir(), "work-class-"));
  try {
    cpSync(LANES_ROOT, temp, { recursive: true });
    return body({ root: temp, canonical: join(temp, "roadmap", "roadmap.json") });
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
}

// =============================================================== 1. THE VOCABULARY

test("V.1: the five classes are the ones the operator decided, verbatim, in order", () => {
  assert.deepEqual(classification.WORK_CLASSES, EXPECTED_CLASSES);
});

test("V.2: ONE address for the tokens — the engine re-exports the module's array, and the closed-vocabulary table holds it", () => {
  // Not vacuous: two missing exports would also be "the same" (undefined === undefined).
  assert.ok(Array.isArray(classification.WORK_CLASSES), "the module must publish the array");
  assert.equal(core.WORK_CLASSES, classification.WORK_CLASSES);
  assert.equal(classification.CLASSIFICATION_VOCABULARIES.work_class, classification.WORK_CLASSES);
});

test("V.3: the bare design token is NOT a class — §9 names it UX_DESIGN, and the near-collision FUNCTIONAL is work_type's", () => {
  assert.ok(Array.isArray(classification.WORK_CLASSES), "not vacuous: a missing vocabulary would include nothing");
  assert.equal((classification.WORK_CLASSES || []).includes("DESIGN"), false);
  assert.equal((classification.WORK_CLASSES || []).includes("FUNCTIONAL"), false);
  // And the two vocabularies stay apart: no token is shared between the class and the depth.
  const shared = (classification.WORK_CLASSES || []).filter((t) => classification.WORK_TYPES.includes(t));
  assert.deepEqual(shared, []);
});

test("V.4: the table §9 publishes IS the module's vocabulary, parsed off the specification row by row", () => {
  const spec = readFileSync(SPEC, "utf8");
  const section = spec.split(/^## 9\. /m)[1];
  assert.ok(section, "§9 must exist in the specification");
  const body = section.split(/^## /m)[0];
  const tokens = [...body.matchAll(/^\| `([A-Z_]+)` \|/gm)].map((m) => m[1]);
  assert.deepEqual(tokens, EXPECTED_CLASSES, "the published table and the code must hold the same tokens in the same order");
});

test("V.5: the six stored keys of §1 are untouched — the class is a SEVENTH key, not a member of §1", () => {
  assert.deepEqual(classification.CLASSIFICATION_STORED_FIELDS, SIX_OF_SECTION_1);
  assert.equal(classification.CLASSIFICATION_STORED_FIELDS.includes("work_class"), false);
  // Every classification key a run can store, in serialization order: the class first.
  assert.deepEqual(classification.CLASSIFICATION_RUN_FIELDS, ["work_class", ...SIX_OF_SECTION_1]);
});

// =============================================================== 2. THE SCHEMA

test("S.1: work_class is an OPTIONAL run key — allowed, never required", () => {
  assert.ok(core.RUN_OPTIONAL_FIELDS.includes("work_class"), "it must be optional");
  assert.equal(core.RUN_REQUIRED_FIELDS.includes("work_class"), false, "a required key would put every run of five roadmaps in the red");
  assert.ok(core.RUN_ALLOWED_FIELDS.includes("work_class"));
});

test("S.2: it serializes immediately after the planning keys and immediately before correctness_model", () => {
  const order = core.CANONICAL_RUN_KEY_ORDER;
  const at = order.indexOf("work_class");
  assert.ok(at > 0, "work_class must be in the canonical order");
  assert.equal(order[at - 1], "batch");
  assert.equal(order[at + 1], "correctness_model");
  const run = { correctness_model: "SPECIFIED", work_class: "FUNCTIONALITY", status: "planned", depends_on: [], run_id: "RUN-T-001", queue_order: 1, title: "t", summary: "s", full_description: "f" };
  core.normalizeRunKeyOrder(run);
  const keys = Object.keys(run);
  assert.equal(keys[keys.indexOf("work_class") + 1], "correctness_model");
});

test("S.3: ABSENT is the default and it is VALID; each of the five classes alone is valid", () => {
  assert.deepEqual(errorsFor({}), []);
  for (const token of EXPECTED_CLASSES) {
    assert.deepEqual(errorsFor({ work_class: token }), [], `${token} alone must be valid`);
  }
});

test("S.4: a run carrying all seven classification keys, legally, is valid", () => {
  assert.deepEqual(errorsFor({
    work_class: "DOCUMENTATION", correctness_model: "JUDGED_ACCEPTS", work_type: "FUNCTIONAL",
    blast_radius: "ADJACENT", failure_surfaces: "VISIBLE", external_effects: [], classified_at: NOW,
  }), []);
});

for (const bad of ["FUNCTIONAL", "DESIGN", "content", "Documentation", "", null, 42]) {
  test(`S.5: work_class ${JSON.stringify(bad)} is REFUSED, and the refusal quotes the value`, () => {
    const errors = errorsMentioning(errorsFor({ work_class: bad }), "work_class");
    assert.equal(errors.length, 1, `expected exactly one work_class error, got ${JSON.stringify(errors)}`);
    assert.ok(errors[0].includes(JSON.stringify(bad)), `the error must name the refused value: ${errors[0]}`);
    // And it names the vocabulary, so the operator learns the five tokens from the refusal.
    for (const token of EXPECTED_CLASSES) assert.ok(errors[0].includes(token), `the refusal must list ${token}`);
  });
}

test("S.6: the class creates NO illegal combination — every class beside every §1 token is legal (§9 adds none to §3)", () => {
  for (const token of EXPECTED_CLASSES) {
    for (const correctness of classification.CORRECTNESS_MODELS) {
      assert.deepEqual(errorsFor({ work_class: token, correctness_model: correctness }), [], `${token} + ${correctness}`);
    }
    for (const depth of classification.WORK_TYPES) {
      assert.deepEqual(errorsFor({ work_class: token, work_type: depth }), [], `${token} + ${depth}`);
    }
  }
});

test("S.7: no existing canonical turns invalid — both frozen real canonicals still pass and round-trip byte-identical", () => {
  for (const key of ["aiw-console", "cantu-studio"]) {
    const raw = core.loadRaw(frozenCanonicalPath(key));
    const obj = core.parseRoadmap(raw);
    const errors = core.checkInvariants(obj, { externalRunIds: null })
      // cantu-studio's frozen canonical carries its one §10.d external edge; that is not this run's.
      .filter((e) => !e.includes("orphaned dependency") && !e.includes("depends on unknown run"));
    assert.deepEqual(errors, [], key);
    assert.equal(core.serialize(obj, core.detectEol(raw)), raw, `${key} must round-trip byte-identical`);
    assert.equal(raw.includes('"work_class"'), false, `${key} carries no class: nothing was migrated`);
  }
});

test("S.8: normalizeRunKeyOrder and a real engine write invent no class on any run", () => {
  const run = roadmapWith({}).objectives[0].phases[0].runs[0];
  core.normalizeRunKeyOrder(run);
  assert.equal("work_class" in run, false);
  const result = plan.planEdit({ filePath: LANES_CANONICAL, op: "set-text", args: { targetType: "run", targetId: FIRST_RUN, title: "Retitled" } });
  assert.equal(result.ok, true, result.errors.join("\n"));
  for (const r of core.globalOrdered(core.parseRoadmap(result.serialized))) {
    assert.equal("work_class" in r, false, `the write filled work_class on ${r.run_id}`);
  }
});

// =============================================================== 3. THE WRITE OP

test("W.1: set-classification writes work_class from `workClass`, through the core and through the plan relay", () => {
  const obj = loadFixture();
  const result = core.setClassification(obj, { run: FIRST_RUN, workClass: "DOCUMENTATION", now: NOW });
  assert.deepEqual(result.errors, []);
  assert.equal(runOf(obj, FIRST_RUN).work_class, "DOCUMENTATION");
  assert.deepEqual(result.before, {});
  assert.deepEqual(result.after, { work_class: "DOCUMENTATION" }, "the snapshot names the class like any other key");

  const planned = plan.planEdit({ filePath: LANES_CANONICAL, op: "set-classification", args: { run: FIRST_RUN, workClass: "RESEARCH" } });
  assert.equal(planned.ok, true, planned.errors.join("\n"));
  assert.equal(runOf(core.parseRoadmap(planned.serialized), FIRST_RUN).work_class, "RESEARCH");
});

test("W.2: it is batchable beside set-lane, as one preview and one write", () => {
  const batched = plan.planEdit({
    filePath: LANES_CANONICAL,
    op: "batch",
    args: { ops: [
      { op: "set-lane", args: { run: FIRST_RUN, lane: "SAIL" } },
      { op: "set-classification", args: { run: FIRST_RUN, workClass: "CONTENT" } },
    ] },
  });
  assert.equal(batched.ok, true, batched.errors.join("\n"));
  const run = runOf(core.parseRoadmap(batched.serialized), FIRST_RUN);
  assert.equal(run.lane, "SAIL");
  assert.equal(run.work_class, "CONTENT");
});

test("W.3: a value outside the vocabulary is refused BY NAME and nothing is written", () => {
  const obj = loadFixture();
  const before = JSON.stringify(obj);
  for (const bad of ["FUNCTIONAL", "DESIGN", "content", 42]) {
    const result = core.setClassification(obj, { run: FIRST_RUN, workClass: bad });
    assert.equal(result.errors.length, 1, JSON.stringify(result.errors));
    assert.ok(result.errors[0].includes("work_class"), result.errors[0]);
    assert.ok(result.errors[0].includes(JSON.stringify(bad)), result.errors[0]);
    assert.equal(JSON.stringify(obj), before, "a refused mutation writes nothing");
  }
  const refused = plan.planEdit({ filePath: LANES_CANONICAL, op: "set-classification", args: { run: FIRST_RUN, workClass: "DESIGN" } });
  assert.equal(refused.ok, false);
  assert.ok(refused.errors.some((e) => e.includes('"DESIGN"')), refused.errors.join("\n"));
});

test("W.4: null and the empty string both delete the key WHOLE", () => {
  for (const clear of [null, ""]) {
    const obj = loadFixture();
    core.setClassification(obj, { run: FIRST_RUN, workClass: "CONTENT", now: NOW });
    assert.equal(runOf(obj, FIRST_RUN).work_class, "CONTENT", "not vacuous: the key must exist before it is cleared");
    const result = core.setClassification(obj, { run: FIRST_RUN, workClass: clear, now: NOW });
    assert.deepEqual(result.errors, []);
    assert.equal("work_class" in runOf(obj, FIRST_RUN), false, `${JSON.stringify(clear)} must delete the key, not store it`);
  }
});

test("W.5: THE MARK DOES NOT MOVE — a class written on an unclassified run creates no classified_at", () => {
  const obj = loadFixture();
  core.setClassification(obj, { run: FIRST_RUN, workClass: "FUNCTIONALITY", now: LATER });
  const run = runOf(obj, FIRST_RUN);
  assert.equal(run.work_class, "FUNCTIONALITY");
  assert.equal("classified_at" in run, false, "the class is not the §1 judgement; it must not stamp the mark");
  assert.equal(classification.isClassified(run), false, "a run with only a class is still on the §1 to-do list");
});

test("W.6: THE MARK DOES NOT MOVE — writing or clearing the class on a classified run leaves classified_at exactly as it was", () => {
  const obj = loadFixture();
  core.setClassification(obj, { run: FIRST_RUN, workType: "FUNCTIONAL", blastRadius: "LOCAL", now: NOW });
  assert.equal(runOf(obj, FIRST_RUN).classified_at, NOW);
  core.setClassification(obj, { run: FIRST_RUN, workClass: "DOCUMENTATION", now: LATER });
  assert.equal(runOf(obj, FIRST_RUN).work_class, "DOCUMENTATION", "not vacuous: the class must actually be written");
  assert.equal(runOf(obj, FIRST_RUN).classified_at, NOW, "writing the class must not re-stamp when §1 was judged");
  core.setClassification(obj, { run: FIRST_RUN, workClass: null, now: LATER });
  assert.equal(runOf(obj, FIRST_RUN).classified_at, NOW, "clearing the class must not touch the mark either");
});

test("W.7: the §1 rules for the mark still hold beside a class — a §1 write stamps, and clearing the last §1 field clears the mark but keeps the class", () => {
  const obj = loadFixture();
  core.setClassification(obj, { run: FIRST_RUN, workClass: "RESEARCH", workType: "COSMETIC", now: LATER });
  assert.equal(runOf(obj, FIRST_RUN).classified_at, LATER, "a call that writes a §1 field stamps, as it always did");
  core.setClassification(obj, { run: FIRST_RUN, workType: null, now: LATER });
  const run = runOf(obj, FIRST_RUN);
  assert.equal("classified_at" in run, false, "with no §1 field left, a mark would be a lie");
  assert.equal(run.work_class, "RESEARCH", "the class is not cleared by clearing §1");
});

test("W.8: a key the caller does not mention is left alone — §1 writes never clear the class, and the class never clears §1", () => {
  const obj = loadFixture();
  core.setClassification(obj, { run: FIRST_RUN, workClass: "UX_DESIGN", correctnessModel: "JUDGED_DEFINES", now: NOW });
  core.setClassification(obj, { run: FIRST_RUN, correctnessModel: "JUDGED_ACCEPTS", now: NOW });
  assert.equal(runOf(obj, FIRST_RUN).work_class, "UX_DESIGN");
  core.setClassification(obj, { run: FIRST_RUN, workClass: "CONTENT", now: NOW });
  assert.equal(runOf(obj, FIRST_RUN).correctness_model, "JUDGED_ACCEPTS");
});

test("W.9: the class derives nothing — severity and closure_mode are what §1 alone gives", () => {
  assert.deepEqual(classification.deriveClassification({ work_class: "FUNCTIONALITY" }), { severity: null, closure_mode: null });
  const classified = { correctness_model: "SPECIFIED", work_type: "FUNCTIONAL", blast_radius: "SYSTEMIC", failure_surfaces: "VISIBLE" };
  const base = classification.deriveClassification(classified);
  for (const token of EXPECTED_CLASSES) {
    assert.deepEqual(classification.deriveClassification({ ...classified, work_class: token }), base, token);
  }
});

// =============================================================== 4. THE TRANSPORT

test("T.1: taxonomy_model declares the class's vocabulary the way it declares the other stored keys", () => {
  const snapshot = projector.buildRoadmapTreeSnapshot(LANES_ROOT, { now: NOW });
  assert.deepEqual(snapshot.taxonomy_model.vocabularies["run.work_class"],
    { axis: "run", stored: true, optional: true, tokens: EXPECTED_CLASSES });
  // The six of §1 are still declared exactly as before.
  assert.deepEqual(snapshot.taxonomy_model.vocabularies["run.work_type"].tokens, ["COSMETIC", "FUNCTIONAL", "FOUNDATIONAL"]);
});

test("T.2: the key travels VERBATIM with its run — in the snapshot's roadmap_tree and in .project/roadmap.json", () => {
  withTempProject(({ root, canonical }) => {
    const planned = plan.planEdit({ filePath: canonical, op: "set-classification", args: { run: FIRST_RUN, workClass: "CONTENT" } });
    assert.equal(planned.ok, true, planned.errors.join("\n"));
    plan.applyPlan({ filePath: canonical, serialized: planned.serialized });
    const find = (tree) => tree.objectives.flatMap((o) => o.phases).flatMap((p) => p.runs).find((r) => r.run_id === FIRST_RUN);
    const snapshot = projector.buildRoadmapTreeSnapshot(root, { now: NOW });
    assert.equal(find(snapshot.roadmap_tree).work_class, "CONTENT");
    const roadmap = projector.buildProjectRoadmap(root, { now: NOW });
    assert.equal(find(roadmap).work_class, "CONTENT");
  });
});

test("T.3: the §1 to-do list keeps a run that only has a class, and NAMES the class it carries", () => {
  withTempProject(({ root, canonical }) => {
    const before = projector.buildRoadmapTreeSnapshot(root, { now: NOW }).validation_summary.reports[0];
    const planned = plan.planEdit({ filePath: canonical, op: "set-classification", args: { run: FIRST_RUN, workClass: "DOCUMENTATION" } });
    plan.applyPlan({ filePath: canonical, serialized: planned.serialized });
    const report = projector.buildRoadmapTreeSnapshot(root, { now: NOW }).validation_summary.reports[0];
    assert.equal(report.total, before.total, "the class does not move the mark, so the run does not leave the list");
    const entry = report.runs.find((r) => r.run_id === FIRST_RUN);
    assert.ok(entry, "the run is still listed");
    assert.deepEqual(entry.stored_fields, ["work_class"], "a run with a class is not reported as untouched");
  });
  assert.deepEqual(classification.storedClassificationFields({ work_class: "CONTENT", work_type: "FUNCTIONAL" }), ["work_class", "work_type"]);
});

test("T.4: the emitter's behaviour moved, so its version moved (§6): 0.13.0", () => {
  assert.equal(projector.PROJECTOR_VERSION, "0.13.0");
  assert.equal(projector.GENERATED_FROM, "aiw-projector@0.13.0");
});

test("T.5: the RELATION does not travel as a field — there is no relation key anywhere in the engine or the taxonomy", () => {
  for (const key of ["relation", "run_relation", "work_relation"]) {
    assert.equal(core.RUN_ALLOWED_FIELDS.includes(key), false, key);
    assert.equal(`run.${key}` in classification.buildClassificationTaxonomy().vocabularies, false, key);
  }
});

// =============================================================== 5. THE CONSOLE (not painted, not broken)

test("C.1: the run drawer does not break on a run carrying a class — no row labelled 'undefined'", () => {
  const harness = createConsoleHarness({ rendererPath: RENDERER, rootsByKey: new Map([["lanes", LANES_ROOT]]) });
  harness.sandbox.setClassificationModel(classification);
  for (const run of [
    { run_id: "RUN-X-001", work_class: "FUNCTIONALITY", correctness_model: "SPECIFIED", work_type: "FUNCTIONAL", blast_radius: "SYSTEMIC", failure_surfaces: "VISIBLE", classified_at: NOW },
    { run_id: "RUN-X-002", work_class: "CONTENT" },
  ]) {
    const html = vm.runInContext(`v3ClassificationSection(${JSON.stringify(run)})`, harness.sandbox);
    assert.equal(html.includes("undefined"), false, `the drawer painted an undefined label for ${run.run_id}`);
  }
});
