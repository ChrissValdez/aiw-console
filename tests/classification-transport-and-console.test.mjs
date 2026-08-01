// [#43] TRANSPORT, THE WRITE OPERATION, THE VIEW AND THE LIST.
//
// Four layers, each measured where it lives:
//
//   1. the envelope  — the vocabulary and the two derivation TABLES travel in taxonomy_model;
//                      the RESULT does not travel, anywhere
//   2. the engine    — set-classification writes the six stored fields and the mark, refuses
//                      what checkInvariants would refuse, and derives nothing
//   3. the view      — the real renderer's drawer section, row chip and editor block, against
//                      the same classification module the browser is handed
//   4. the list      — live runs with no classification are REPORTED, and the report is
//                      information: it raises nothing and blocks nothing
//
// Everything runs against tests/fixtures/lanes or against roadmaps built here, never against
// the live roadmap of this repo — a suite that reads the live file goes red whenever the cabin
// plans a run.
import test from "node:test";
import assert from "node:assert/strict";
import { cpSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import * as core from "../tools/roadmap/roadmap-core.mjs";
import { KNOWN_OPS, planEdit, applyPlan } from "../tools/roadmap/roadmap-plan.mjs";
import { buildRoadmapTreeSnapshot, GENERATED_FROM, PROJECTOR_VERSION } from "../tools/projector/project.mjs";
import { server, HOST } from "../project-console/serve.mjs";
import * as classification from "../tools/classification/classification.mjs";
import { classification as shellClassification } from "../project-console/assets/project-shell.js";
import { createConsoleHarness } from "./helpers/console-dom.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const RENDERER = join(REPO_ROOT, "project-console", "assets", "project-console.js");
const LANES_ROOT = join(HERE, "fixtures", "lanes", "project");
const LANES_CANONICAL = join(LANES_ROOT, "roadmap", "roadmap.json");
const NOW = "2026-07-31T10:45:14.552Z";

const loadFixture = () => core.parseRoadmap(core.loadRaw(LANES_CANONICAL));
const runOf = (obj, id) => core.findRunEntry(obj, id).run;
const FIRST_RUN = "RUN-FIX-DOC-GUIDE-001";

// =============================================================== 1. THE ENVELOPE

test("C.1: there is ONE implementation, and both consumers hold the same module object", () => {
  // The shell re-exports what it imports and hands to the renderer. If either consumer ever
  // grew a copy of the tables, these would stop being the same object.
  assert.equal(shellClassification.deriveSeverity, classification.deriveSeverity);
  assert.equal(shellClassification.deriveClosureMode, classification.deriveClosureMode);
  // The emitter declares the SAME objects it does not execute: the table in the envelope is
  // the table the functions run, by identity and not by transcription.
  const declared = classification.buildClassificationTaxonomy();
  assert.equal(declared.derivations[classification.SEVERITY_DERIVATION_NAME], classification.SEVERITY_DERIVATION);
  assert.equal(declared.derivations[classification.CLOSURE_MODE_DERIVATION_NAME], classification.CLOSURE_MODE_DERIVATION);
});

test("C.2 / C.1: the classification module imports NOTHING, so both runtimes can load it", () => {
  const source = readFileSync(join(REPO_ROOT, "tools", "classification", "classification.mjs"), "utf8");
  const imports = source.match(/^\s*import[\s{]/gm) || [];
  assert.deepEqual(imports, [], "an import only one runtime has would fork the two consumers apart");
  assert.equal(/require\s*\(/.test(source), false);
  // No Node builtin reachable from it, and no DOM either: the file must load identically in
  // the emitter's process and in the browser that fetches it over HTTP.
  assert.equal(/from\s+["']node:/.test(source), false);
  assert.equal(/\bdocument\.|\bwindow\./.test(source), false);
});

test("C.1: the BROWSER can fetch the one module, over the same server, at the specifier the shell imports", async () => {
  // Load-bearing for "one implementation": the emitter imports this file from disk and the
  // browser fetches it over HTTP. If the console's server did not serve it — wrong root, wrong
  // MIME — the browser would need a second copy, which is the whole thing being prevented.
  await new Promise((listening) => server.listen(0, HOST, listening));
  try {
    const port = server.address().port;
    // The specifier project-shell.js uses, resolved against its own URL:
    // /project-console/assets/../../tools/... -> /tools/classification/classification.mjs
    const response = await fetch(`http://${HOST}:${port}/tools/classification/classification.mjs`);
    assert.equal(response.status, 200);
    // A module script is refused by the browser unless it arrives as JavaScript.
    assert.match(response.headers.get("content-type"), /javascript/);
    const served = await response.text();
    assert.equal(served, readFileSync(join(REPO_ROOT, "tools", "classification", "classification.mjs"), "utf8"),
      "the browser must receive the same bytes the emitter imports");
    assert.ok(served.includes("export function deriveSeverity"));
  } finally {
    await new Promise((closed) => server.close(closed));
  }
});

test("E.1/E.3: the envelope carries the vocabulary and BOTH derivation tables, under taxonomy_model", () => {
  const snapshot = buildRoadmapTreeSnapshot(LANES_ROOT, { now: NOW });
  const taxonomy = snapshot.taxonomy_model;

  // The six STORED fields declare themselves stored; the two DERIVED ones declare the table
  // that produces them — the exact shape `run.status` / `objective.status` already use.
  for (const key of ["run.correctness_model", "run.work_type", "run.blast_radius", "run.failure_surfaces", "run.external_effects", "run.classified_at"]) {
    assert.equal(taxonomy.vocabularies[key].stored, true, key);
    assert.equal(taxonomy.vocabularies[key].axis, "run", key);
    assert.equal(taxonomy.vocabularies[key].optional, true, `${key} must declare itself OPTIONAL`);
  }
  assert.deepEqual(taxonomy.vocabularies["run.work_type"].tokens, ["COSMETIC", "FUNCTIONAL", "FOUNDATIONAL"]);
  assert.deepEqual(taxonomy.vocabularies["run.blast_radius"].tokens, ["LOCAL", "ADJACENT", "SYSTEMIC", "PROJECT_SHAPE"]);
  assert.deepEqual(taxonomy.vocabularies["run.correctness_model"].tokens, ["SPECIFIED", "JUDGED_ACCEPTS", "JUDGED_DEFINES"]);
  assert.deepEqual(taxonomy.vocabularies["run.failure_surfaces"].tokens, ["LOUD", "VISIBLE", "SILENT"]);
  // The two with no closed vocabulary declare their FORM instead of an invented token list.
  assert.equal(taxonomy.vocabularies["run.external_effects"].form, "array_of_non_empty_strings");
  assert.equal(taxonomy.vocabularies["run.classified_at"].form, "iso_8601_utc_instant");

  for (const key of ["run.severity", "run.closure_mode"]) {
    assert.equal(taxonomy.vocabularies[key].stored, false, `${key} is DERIVED and must declare stored:false`);
    assert.ok(taxonomy.derivations[taxonomy.vocabularies[key].derived_by], `${key} names a table that must exist`);
  }
  assert.deepEqual(taxonomy.vocabularies["run.severity"].tokens, ["MINOR", "MODERATE", "MAJOR", "CRITICAL"]);
  assert.deepEqual(taxonomy.vocabularies["run.closure_mode"].tokens, ["UNATTENDED", "SEMI_ATTENDED", "ATTENDED"]);

  // The severity table travels COMPLETE — all twelve cells and the adjustment with it.
  const severityTable = taxonomy.derivations.severity_from_work_type_and_blast_radius;
  assert.equal(Object.keys(severityTable.table).length, 3);
  assert.equal(Object.keys(severityTable.table.COSMETIC).length, 4);
  assert.equal(severityTable.table.FOUNDATIONAL.SYSTEMIC, "CRITICAL");
  assert.deepEqual(severityTable.adjustment.steps, { LOUD: -1, VISIBLE: 0, SILENT: 1 });
  assert.equal(severityTable.adjustment.saturating, true);

  // The closure table travels with its precedence AND its guard, including the direction.
  const closureTable = taxonomy.derivations.closure_mode_from_correctness_model_and_severity;
  assert.equal(closureTable.precedence.length, 4);
  assert.equal(closureTable.guard.minimum, "SEMI_ATTENDED");
  assert.equal(closureTable.guard.direction, "raise_only");
  assert.equal(closureTable.guard.absent_input, "empty", "absent and [] are the same input");

  // §3 travels as data, each entry saying which channel enforces it.
  assert.equal(taxonomy.illegal_combinations.length, 3);
  assert.equal(taxonomy.illegal_combinations[2].enforced_by, "derivation_property");

  // The status precedent is untouched — the classification entries are ADDED, not substituted.
  assert.ok(taxonomy.derivations.collection_status_from_runs);
  assert.equal(taxonomy.vocabularies["run.status"].stored, true);
});

test("E.3: the version marks the envelope carries, and the fact that the emitter version moved", () => {
  const snapshot = buildRoadmapTreeSnapshot(LANES_ROOT, { now: NOW });
  // §6: behaviour changed, so the emitter version changed with it. That, plus the tree's own
  // `model`, is how the status precedent versions its table — no per-table version field is
  // invented here, because the precedent this copies has none.
  // [#43, third commission] The pinned value moved 0.11.0 -> 0.12.0 and the pin stays a pin:
  // the envelope gained §5's per-project `care_budget` block, which is behaviour, so §6 moves
  // the version. Registering the new number here is the point of the assertion — it fails on
  // the NEXT undeclared drift exactly as it failed on this declared one.
  assert.equal(PROJECTOR_VERSION, "0.12.0");
  assert.equal(snapshot.generated_from, GENERATED_FROM);
  assert.equal(snapshot.generated_from, "aiw-projector@0.12.0");
  // The second mark: the identifier the TREE gives itself, carried verbatim and never
  // relabelled — which is why a project on another model name gets its own declaration of the
  // same tables rather than being refused for its name.
  assert.equal(snapshot.taxonomy_model.model, snapshot.roadmap_tree.model);
  assert.equal(snapshot.taxonomy_model.model, "fixture.lanes.v1");
});

test("E.2: THE RESULT DOES NOT TRAVEL — no computed severity or closure_mode anywhere in the snapshot", () => {
  const obj = loadFixture();
  // Classify one run first, so this is not vacuously true on an unclassified tree: the run
  // below derives MAJOR / SEMI_ATTENDED, and neither token may appear as a value.
  core.setClassification(obj, {
    run: FIRST_RUN, correctnessModel: "SPECIFIED", workType: "FUNCTIONAL",
    blastRadius: "SYSTEMIC", failureSurfaces: "VISIBLE", now: NOW,
  });
  const temp = mkdtempSync(join(tmpdir(), "cls-transport-"));
  try {
    cpSync(LANES_ROOT, temp, { recursive: true });
    const target = join(temp, "roadmap", "roadmap.json");
    const raw = core.loadRaw(target);
    applyPlan({ filePath: target, serialized: core.serialize(obj, core.detectEol(raw)) });
    const snapshot = buildRoadmapTreeSnapshot(temp, { now: NOW });
    assert.deepEqual(classification.deriveClassification(runOf(core.parseRoadmap(core.loadRaw(target)), FIRST_RUN)),
      { severity: "MAJOR", closure_mode: "SEMI_ATTENDED" });

    // No run of the transported tree carries either key.
    for (const objective of snapshot.roadmap_tree.objectives) {
      for (const phase of objective.phases) {
        for (const run of phase.runs) {
          assert.ok(!("severity" in run), `${run.run_id} transported a severity`);
          assert.ok(!("closure_mode" in run), `${run.run_id} transported a closure_mode`);
        }
      }
    }
    // And no DERIVED TOKEN travels as a value anywhere outside the declared token lists.
    const withoutTaxonomy = { ...snapshot, taxonomy_model: null };
    const serialized = JSON.stringify(withoutTaxonomy);
    for (const token of ["MAJOR", "SEMI_ATTENDED", "MINOR", "MODERATE", "CRITICAL", "UNATTENDED", "ATTENDED"]) {
      assert.equal(serialized.includes(`"${token}"`), false, `the computed token ${token} travelled outside taxonomy_model`);
    }
    // Inside taxonomy_model the tokens DO appear — as the declaration of the table, which is
    // the whole point: the table travels, the consumer derives.
    assert.ok(JSON.stringify(snapshot.taxonomy_model).includes('"CRITICAL"'));
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
});

// =============================================================== 2. THE ENGINE: set-classification

test("F.1: set-classification is a known op, dispatched, and batchable", () => {
  assert.ok(KNOWN_OPS.includes("set-classification"));
  const plan = planEdit({
    filePath: LANES_CANONICAL,
    op: "set-classification",
    args: { run: FIRST_RUN, workType: "FUNCTIONAL", blastRadius: "LOCAL" },
  });
  assert.equal(plan.ok, true, plan.errors.join("\n"));
  const run = runOf(core.parseRoadmap(plan.serialized), FIRST_RUN);
  assert.equal(run.work_type, "FUNCTIONAL");
  assert.equal(run.blast_radius, "LOCAL");
  // Batchable beside the ops it belongs with.
  const batched = planEdit({
    filePath: LANES_CANONICAL,
    op: "batch",
    args: { ops: [
      { op: "set-lane", args: { run: FIRST_RUN, lane: "SAIL" } },
      { op: "set-classification", args: { run: FIRST_RUN, correctnessModel: "JUDGED_DEFINES" } },
    ] },
  });
  assert.equal(batched.ok, true, batched.errors.join("\n"));
  const batchedRun = runOf(core.parseRoadmap(batched.serialized), FIRST_RUN);
  assert.equal(batchedRun.lane, "SAIL");
  assert.equal(batchedRun.correctness_model, "JUDGED_DEFINES");
});

test("F.1: it writes the six stored fields and NOTHING else on the run, in canonical key order", () => {
  const obj = loadFixture();
  const before = JSON.parse(JSON.stringify(obj));
  const result = core.setClassification(obj, {
    run: FIRST_RUN, correctnessModel: "JUDGED_ACCEPTS", workType: "FUNCTIONAL",
    blastRadius: "ADJACENT", failureSurfaces: "SILENT", externalEffects: ["publishes to npm"], now: NOW,
  });
  assert.deepEqual(result.errors, []);
  const run = runOf(obj, FIRST_RUN);
  assert.equal(run.correctness_model, "JUDGED_ACCEPTS");
  assert.equal(run.work_type, "FUNCTIONAL");
  assert.equal(run.blast_radius, "ADJACENT");
  assert.equal(run.failure_surfaces, "SILENT");
  assert.deepEqual(run.external_effects, ["publishes to npm"]);
  assert.equal(run.classified_at, NOW);
  // Classification keys sit after the planning fields and before the closeout fields.
  const keys = Object.keys(run);
  assert.ok(keys.indexOf("correctness_model") > keys.indexOf("status"));
  assert.deepEqual(
    keys.filter((k) => classification.CLASSIFICATION_STORED_FIELDS.includes(k)),
    classification.CLASSIFICATION_STORED_FIELDS
  );
  // No other run moved, and nothing but the classification changed on this one.
  const beforeRun = before.objectives.flatMap((o) => o.phases).flatMap((p) => p.runs).find((r) => r.run_id === FIRST_RUN);
  for (const key of Object.keys(beforeRun)) assert.deepEqual(run[key], beforeRun[key], key);
  assert.ok(!("severity" in run) && !("closure_mode" in run), "the write must derive nothing");
});

test("F.2: classified_at is written BY THE OPERATION, as an ISO-8601 UTC instant of generated_at's own shape", () => {
  const obj = loadFixture();
  core.setClassification(obj, { run: FIRST_RUN, workType: "COSMETIC" });
  const mark = runOf(obj, FIRST_RUN).classified_at;
  // The exact shape this repo already emits: 2026-07-31T10:45:14.552Z.
  assert.match(mark, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  assert.equal(new Date(mark).toISOString(), mark);
  assert.equal(Number.isNaN(Date.parse(mark)), false);
  // The operator cannot type it: the plan dispatcher relays no such argument, so a request
  // body carrying one is simply ignored and the engine's own clock wins.
  const plan = planEdit({
    filePath: LANES_CANONICAL,
    op: "set-classification",
    args: { run: FIRST_RUN, workType: "COSMETIC", classifiedAt: "1999-01-01T00:00:00.000Z", classified_at: "1999-01-01T00:00:00.000Z", now: "1999-01-01T00:00:00.000Z" },
  });
  assert.equal(plan.ok, true, plan.errors.join("\n"));
  const written = runOf(core.parseRoadmap(plan.serialized), FIRST_RUN).classified_at;
  assert.equal(written.startsWith("1999"), false, "the operator's instant must not reach disk");
  assert.match(written, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
});

test("F.1: clearing a field deletes the key whole, and clearing the last one clears the mark", () => {
  const obj = loadFixture();
  core.setClassification(obj, { run: FIRST_RUN, workType: "COSMETIC", blastRadius: "LOCAL", externalEffects: ["x"], now: NOW });
  assert.equal(runOf(obj, FIRST_RUN).classified_at, NOW);
  // Clearing one: the key goes, the mark stays (something is still classified).
  core.setClassification(obj, { run: FIRST_RUN, blastRadius: null, now: NOW });
  assert.equal("blast_radius" in runOf(obj, FIRST_RUN), false);
  assert.equal(runOf(obj, FIRST_RUN).classified_at, NOW);
  // An empty external_effects list is stored as ABSENCE — one shape on disk for one meaning.
  core.setClassification(obj, { run: FIRST_RUN, externalEffects: [], now: NOW });
  assert.equal("external_effects" in runOf(obj, FIRST_RUN), false);
  // Clearing the last measured field takes the mark with it: a classified_at over no
  // classification would be a lie.
  core.setClassification(obj, { run: FIRST_RUN, workType: null, now: NOW });
  const run = runOf(obj, FIRST_RUN);
  assert.equal("classified_at" in run, false);
  assert.deepEqual(classification.storedClassificationFields(run), []);
  // A field the caller does not mention is left alone, never cleared by omission.
  core.setClassification(obj, { run: FIRST_RUN, workType: "COSMETIC", blastRadius: "LOCAL", now: NOW });
  core.setClassification(obj, { run: FIRST_RUN, workType: "FUNCTIONAL", now: NOW });
  assert.equal(runOf(obj, FIRST_RUN).blast_radius, "LOCAL");
});

test("F.1: it refuses a token outside the vocabulary BY NAME, and writes nothing when it refuses", () => {
  const obj = loadFixture();
  const before = JSON.stringify(obj);
  for (const [option, bad] of [["workType", "FUNCIONAL"], ["workType", "functional"], ["correctnessModel", "specified"], ["blastRadius", "GLOBAL"], ["failureSurfaces", "QUIET"]]) {
    const result = core.setClassification(obj, { run: FIRST_RUN, [option]: bad });
    assert.equal(result.errors.length, 1, JSON.stringify(result.errors));
    assert.ok(result.errors[0].includes(JSON.stringify(bad)), result.errors[0]);
    assert.equal(JSON.stringify(obj), before, "a refused mutation writes nothing");
  }
  // A malformed guard list is refused the same way.
  assert.match(core.setClassification(obj, { run: FIRST_RUN, externalEffects: 42 }).errors[0], /must be an array/);
  assert.equal(JSON.stringify(obj), before);
  // Unknown run, missing run.
  assert.match(core.setClassification(obj, { run: "RUN-NOPE-001", workType: "COSMETIC" }).errors[0], /not found/);
  assert.match(core.setClassification(obj, { workType: "COSMETIC" }).errors[0], /requires --run/);
});

test("F.1: it leaves the ILLEGAL COMBINATIONS to checkInvariants, and the write is aborted with the file untouched", () => {
  const obj = loadFixture();
  // The mutation itself owns no combination rule.
  const mutation = core.setClassification(obj, { run: FIRST_RUN, correctnessModel: "SPECIFIED", workType: "FOUNDATIONAL", now: NOW });
  assert.deepEqual(mutation.errors, [], "the mutation owns no combination rule");
  assert.ok(core.checkInvariants(obj, {}).some((e) => e.includes("SPECIFIED + FOUNDATIONAL")));
  // End to end: planEdit refuses and nothing is serialized.
  const before = readFileSync(LANES_CANONICAL, "utf8");
  const plan = planEdit({
    filePath: LANES_CANONICAL,
    op: "set-classification",
    args: { run: FIRST_RUN, correctnessModel: "SPECIFIED", workType: "FOUNDATIONAL" },
  });
  assert.equal(plan.ok, false);
  assert.ok(plan.errors.some((e) => e.includes("SPECIFIED + FOUNDATIONAL")), plan.errors.join("\n"));
  assert.equal(plan.serialized, null);
  assert.equal(readFileSync(LANES_CANONICAL, "utf8"), before, "the fixture must be byte-identical");
});

test("C.3: a REAL write through the engine adds no severity and no closure_mode to any run", () => {
  const temp = mkdtempSync(join(tmpdir(), "cls-write-"));
  try {
    cpSync(LANES_ROOT, temp, { recursive: true });
    const target = join(temp, "roadmap", "roadmap.json");
    const plan = planEdit({
      filePath: target,
      op: "set-classification",
      args: { run: FIRST_RUN, correctnessModel: "JUDGED_DEFINES", workType: "FOUNDATIONAL", blastRadius: "PROJECT_SHAPE", failureSurfaces: "SILENT" },
    });
    assert.equal(plan.ok, true, plan.errors.join("\n"));
    applyPlan({ filePath: target, serialized: plan.serialized });
    const written = core.parseRoadmap(core.loadRaw(target));
    const runs = written.objectives.flatMap((o) => o.phases).flatMap((p) => p.runs);
    assert.equal(runs.filter((r) => "severity" in r || "closure_mode" in r).length, 0);
    // The classified run derives CRITICAL / ATTENDED — read, never stored.
    assert.deepEqual(classification.deriveClassification(runs.find((r) => r.run_id === FIRST_RUN)),
      { severity: "CRITICAL", closure_mode: "ATTENDED" });
    // Exactly one run gained classification keys; the other eleven are untouched.
    assert.equal(runs.filter((r) => classification.storedClassificationFields(r).length).length, 1);
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
});

// =============================================================== 3. THE VIEW

function harnessWithModel() {
  const harness = createConsoleHarness({ rendererPath: RENDERER, rootsByKey: new Map([["lanes", LANES_ROOT]]) });
  // The same hand-off the shell performs in the browser, with the same module.
  harness.sandbox.setClassificationModel(classification);
  return harness;
}

const render = (harness, expression) => vm.runInContext(expression, harness.sandbox);
const sectionFor = (harness, run) => render(harness, `v3ClassificationSection(${JSON.stringify(run)})`);

test("F.3: a CLASSIFIED run shows the six stored fields and the two derived ones, marked as derived", () => {
  const harness = harnessWithModel();
  const html = sectionFor(harness, {
    run_id: "RUN-X-001",
    correctness_model: "SPECIFIED", work_type: "FUNCTIONAL", blast_radius: "SYSTEMIC",
    failure_surfaces: "VISIBLE", external_effects: ["publishes to npm"], classified_at: NOW,
  });
  for (const value of ["SPECIFIED", "FUNCTIONAL", "SYSTEMIC", "VISIBLE", "publishes to npm", NOW]) {
    assert.ok(html.includes(value), `the stored value ${value} must be shown`);
  }
  // The derived pair, computed here and now — MAJOR, and SEMI_ATTENDED because the guard
  // raises the SPECIFIED+MAJOR row's own answer is already SEMI_ATTENDED.
  assert.ok(html.includes("MAJOR"), "the derived severity must be shown");
  assert.ok(html.includes("SEMI_ATTENDED"), "the derived closure mode must be shown");
  // MARKED as derived, and said in words: computed at read time, never stored, not editable.
  assert.match(html, /Derived — computed at read time, never stored, not editable/);
  assert.equal((html.match(/v3-derived-mark/g) || []).length, 2, "each derived row carries its own marker");
  // And no control: the section paints no input, select or textarea for anything.
  assert.equal(/<input|<select|<textarea/.test(html), false, "a derived value must have no editable affordance");
});

test("F.3: an UNCLASSIFIED run reads as UNCLASSIFIED — not as empty, and not as MINOR", () => {
  const harness = harnessWithModel();
  const html = sectionFor(harness, { run_id: "RUN-X-001", title: "t", status: "planned" });
  assert.match(html, /Not classified yet/);
  assert.match(html, /no severity and no closure mode/);
  // The bottom of the scale must not appear anywhere: printing MINOR over a run nobody has
  // classified is exactly the invented answer the specification forbids.
  for (const token of ["MINOR", "MODERATE", "MAJOR", "CRITICAL", "UNATTENDED", "SEMI_ATTENDED", "ATTENDED"]) {
    assert.equal(html.includes(token), false, `an unclassified run must not display ${token}`);
  }
  // And it is not blank either: the section exists and names the state.
  assert.match(html, /Classification/);
});

test("F.3: a PARTIALLY classified run shows what it has and names the input each absent derived value needs", () => {
  const harness = harnessWithModel();
  const html = sectionFor(harness, { run_id: "RUN-X-001", work_type: "FUNCTIONAL", classified_at: NOW });
  assert.ok(html.includes("FUNCTIONAL"));
  assert.match(html, /absent — needs blast radius/);
  assert.match(html, /absent — needs correctness model/);
  // Severity derivable, closure mode not: only the one that is absent says so.
  const half = sectionFor(harness, { run_id: "RUN-X-001", work_type: "FUNCTIONAL", blast_radius: "SYSTEMIC", classified_at: NOW });
  assert.ok(half.includes("MAJOR"));
  assert.match(half, /absent — needs correctness model/);
});

test("F.3: the row chip carries the DERIVED severity, and an unclassified row carries no chip", () => {
  const harness = harnessWithModel();
  const classified = render(harness, `v3RunRowTags(v3Model(appData), ${JSON.stringify({ run_id: "RUN-X-001", queue_order: 1, work_type: "FOUNDATIONAL", blast_radius: "SYSTEMIC", failure_surfaces: "VISIBLE" })})`);
  assert.match(classified, /v3-severity-tag is-critical/);
  assert.match(classified, /CRITICAL/);
  assert.match(classified, /DERIVED from work_type, blast_radius and failure_surfaces at read time; never stored/);
  const bare = render(harness, `v3RunRowTags(v3Model(appData), ${JSON.stringify({ run_id: "RUN-X-002", queue_order: 2 })})`);
  assert.equal(/v3-severity-tag/.test(bare), false, "no chip for a run with no severity");
});

test("F.3: with NO model injected the view says so and still refuses to guess", () => {
  const bare = createConsoleHarness({ rendererPath: RENDERER, rootsByKey: new Map([["lanes", LANES_ROOT]]) });
  const html = vm.runInContext(`v3ClassificationSection(${JSON.stringify({ run_id: "RUN-X-001", work_type: "FUNCTIONAL", blast_radius: "SYSTEMIC", classified_at: NOW })})`, bare.sandbox);
  assert.ok(html.includes("FUNCTIONAL"), "the STORED fields still render — they need no derivation");
  assert.match(html, /the derivation table has not been loaded/);
  assert.equal(html.includes("MAJOR"), false, "an uninjected renderer must not invent a severity");
});

test("F.1/F.3: the run editor paints a Classification block with the four vocabularies and NO derived control", async () => {
  const harness = harnessWithModel();
  harness.sandbox.resetProjectScopedState();
  harness.sandbox.setActiveProjectBase("/projects/lanes/");
  await harness.sandbox.loadActiveProject();
  await harness.flush();
  const html = render(harness, `(function () {
    const model = v3Model(appData);
    const run = model.runsById.get(${JSON.stringify(FIRST_RUN)});
    return v3RenderRunEditor(run, model.contextByRunId.get(run.run_id), model);
  })()`);
  assert.match(html, /data-v3edit-op="set-classification"/);
  const block = html.split('data-v3edit-op="set-classification"')[1];
  // Four selects, each opening on "(not classified)" — an unclassified run is offered no
  // preselected token, because a preselection is a classification nobody made.
  for (const hook of ["correctnessmodel", "worktype", "blastradius", "failuresurfaces"]) {
    assert.ok(block.includes(`data-v3edit-${hook}`), hook);
  }
  assert.ok(block.includes('<option value="" selected>(not classified)</option>'));
  // Every token of every vocabulary is offered, and no token is written in the renderer:
  // the options come from the injected model.
  for (const token of [...classification.CORRECTNESS_MODELS, ...classification.WORK_TYPES, ...classification.BLAST_RADII, ...classification.FAILURE_SURFACES]) {
    assert.ok(block.includes(`<option value="${token}"`), token);
  }
  assert.ok(block.includes("data-v3edit-externaleffects"));
  // NO control for the derived pair, and none for the mark.
  assert.equal(/data-v3edit-severity|data-v3edit-closuremode|data-v3edit-classifiedat/.test(block), false);
  assert.match(block, /computed at read time and are NEVER written to the roadmap/);
  assert.match(block, /written by the engine, not typed/);
});

test("F.1: the modal collects a set-classification payload the engine accepts, and calls a re-pick a no-op", () => {
  const harness = harnessWithModel();
  // A modal stubbed exactly as far as v3EditBuildPayload reaches, the technique the barrier
  // and edit-modal suites already use.
  vm.runInContext(`
    (function () {
      const fields = new Map(Object.entries({
        "[data-v3edit-correctnessmodel]": { value: "JUDGED_ACCEPTS" },
        "[data-v3edit-worktype]": { value: "FUNCTIONAL" },
        "[data-v3edit-blastradius]": { value: "ADJACENT" },
        "[data-v3edit-failuresurfaces]": { value: "" },
        "[data-v3edit-externaleffects]": { value: " sends mail , , publishes " }
      }));
      const modal = document.getElementById("edit-modal-body");
      modal.querySelector = (selector) => fields.get(selector) || null;
      v3EditModalTarget = { kind: "run", id: ${JSON.stringify(FIRST_RUN)} };
    })();
  `, harness.sandbox);
  const payload = render(harness, 'JSON.stringify(v3EditBuildPayload("set-classification"))');
  const parsed = JSON.parse(payload);
  assert.equal(parsed.op, "set-classification");
  assert.deepEqual(parsed.args, {
    run: FIRST_RUN,
    correctnessModel: "JUDGED_ACCEPTS",
    workType: "FUNCTIONAL",
    blastRadius: "ADJACENT",
    // "" travels as null: the engine's clearing gesture, exactly like set-lane's default.
    failureSurfaces: null,
    externalEffects: ["sends mail", "publishes"],
  });
  // The engine accepts the payload the modal built, unchanged.
  const plan = planEdit({ filePath: LANES_CANONICAL, op: "set-classification", args: parsed.args });
  assert.equal(plan.ok, true, plan.errors.join("\n"));

  // And the change detector: re-picking what is already stored is NOT a change, so the mark
  // is not rewritten by opening and closing the modal.
  const stored = { correctness_model: "JUDGED_ACCEPTS", work_type: "FUNCTIONAL", blast_radius: "ADJACENT", external_effects: ["sends mail", "publishes"] };
  assert.equal(render(harness, `v3BatchOpChanged("set-classification", ${JSON.stringify(parsed.args)}, ${JSON.stringify(stored)})`), false);
  assert.equal(render(harness, `v3BatchOpChanged("set-classification", ${JSON.stringify(parsed.args)}, ${JSON.stringify({ ...stored, work_type: "COSMETIC" })})`), true);
  assert.equal(render(harness, `v3BatchOpChanged("set-classification", ${JSON.stringify(parsed.args)}, {})`), true);
});

test("F.1: the preview names both stored changes AND the derived consequence", () => {
  const harness = harnessWithModel();
  const args = { run: FIRST_RUN, correctnessModel: "SPECIFIED", workType: "COSMETIC", blastRadius: "LOCAL", failureSurfaces: null, externalEffects: null };
  const html = render(harness, `v3EditDiffHtml("set-classification", ${JSON.stringify(args)}, ${JSON.stringify({ run_id: FIRST_RUN, queue_order: 1 })})`);
  assert.match(html, /work_type/);
  assert.match(html, /\(not classified\)/);
  assert.match(html, /severity \(derived\)/);
  assert.match(html, /closure_mode \(derived\)/);
  assert.ok(html.includes("MINOR"), "the preview must show what the selection derives to");
  assert.ok(html.includes("UNATTENDED"));
  assert.match(html, /written by the engine/);
});

// =============================================================== 4. THE LIST

test("F.4: the emitter LISTS the live runs with no classification, and excludes the closed ones", () => {
  const snapshot = buildRoadmapTreeSnapshot(LANES_ROOT, { now: NOW });
  const report = snapshot.validation_summary.reports.find((r) => r.report === "unclassified_live_runs");
  assert.ok(report, "the report must occupy the slot that was declared empty");
  assert.equal(report.kind, "information");
  assert.deepEqual(report.terminal_statuses, ["completed", "blocked"]);
  // The lanes fixture holds 12 runs: 2 completed, 1 active, 9 planned. None is classified.
  assert.equal(report.total, 10);
  assert.equal(report.runs.length, 10);
  assert.equal(report.runs.some((r) => r.status === "completed" || r.status === "blocked"), false,
    "a closed run is not classified — listing it would be archaeology");
  for (const entry of report.runs) {
    assert.ok(entry.run_id && entry.queue_order && entry.status && entry.title);
    assert.ok(Array.isArray(entry.stored_fields));
    assert.ok(!("severity" in entry), "not even the report carries a derived value");
  }
});

test("F.4: a classified run LEAVES the list, and a half-classified one stays with its fields named", () => {
  const temp = mkdtempSync(join(tmpdir(), "cls-list-"));
  try {
    cpSync(LANES_ROOT, temp, { recursive: true });
    const target = join(temp, "roadmap", "roadmap.json");
    const plan = planEdit({ filePath: target, op: "set-classification", args: { run: FIRST_RUN, workType: "FUNCTIONAL", blastRadius: "LOCAL" } });
    assert.equal(plan.ok, true, plan.errors.join("\n"));
    applyPlan({ filePath: target, serialized: plan.serialized });
    const report = buildRoadmapTreeSnapshot(temp, { now: NOW }).validation_summary.reports[0];
    assert.equal(report.total, 9, "the classified run left the list");
    assert.equal(report.runs.some((r) => r.run_id === FIRST_RUN), false);
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
  // A run carrying measured fields but no mark is still UNCLASSIFIED and still listed, with
  // what it does carry named — the difference between untouched and half-done.
  const partial = classification.unclassifiedLiveRuns(
    [{ objective_id: "O", phase_id: "P", run: { run_id: "RUN-P-001", queue_order: 1, status: "planned", title: "t", work_type: "FUNCTIONAL" } }],
    { terminalStatuses: ["completed", "blocked"] }
  );
  assert.equal(partial.length, 1);
  assert.deepEqual(partial[0].stored_fields, ["work_type"]);
});

test("F.5: the list is INFORMATION — it raises no error and changes nothing about the emission", () => {
  const snapshot = buildRoadmapTreeSnapshot(LANES_ROOT, { now: NOW });
  const report = snapshot.validation_summary.reports[0];
  assert.ok(report.total > 0, "the fixture must actually have unclassified runs, or this proves nothing");
  // No error channel is opened, no count is incremented, no status is degraded.
  assert.equal("errors" in snapshot.validation_summary, false);
  assert.equal(Array.isArray(snapshot.blockers), true);
  assert.deepEqual(snapshot.blockers, [], "an unclassified run is not a blocker");
  assert.equal(snapshot.operational_status, "active", "the report does not degrade the project status");
  assert.match(report.rule, /LISTED, never refused/);
  // And the write path is untouched by it: a roadmap of wholly unclassified runs still plans
  // and still writes.
  const plan = planEdit({ filePath: LANES_CANONICAL, op: "set-text", args: { targetType: "run", targetId: FIRST_RUN, title: "Retitled" } });
  assert.equal(plan.ok, true, plan.errors.join("\n"));
  assert.deepEqual(core.checkInvariants(loadFixture(), {}), [], "an unclassified roadmap is VALID");
});

test("F.4: the console renders the list as a note, from the snapshot, and renders nothing when it is empty", () => {
  const harness = harnessWithModel();
  const withRuns = {
    snapshot: { validation_summary: { reports: [{
      report: "unclassified_live_runs", kind: "information", total: 2,
      runs: [
        { run_id: "RUN-B-002", queue_order: 7, status: "planned", title: "Second" },
        { run_id: "RUN-A-001", queue_order: 3, status: "active", title: "First" },
      ],
    }] } },
  };
  const html = render(harness, `v3UnclassifiedNoteHtml(${JSON.stringify(withRuns)})`);
  assert.match(html, /Unclassified live runs/);
  assert.match(html, /v3-ov-note-count">2</);
  // Queue order, and clickable through the renderer's own run-open handler.
  assert.ok(html.indexOf("#3 First") < html.indexOf("#7 Second"), "listed in queue order");
  assert.match(html, /data-v3-run="RUN-A-001"/);
  // It says, in the surface itself, that it is not an error.
  assert.match(html, /This is information, not an error/);
  // Empty list, older snapshot, or no snapshot at all: nothing is painted.
  assert.equal(render(harness, `v3UnclassifiedNoteHtml(${JSON.stringify({ snapshot: { validation_summary: { reports: [{ report: "unclassified_live_runs", total: 0, runs: [] }] } } })})`), "");
  assert.equal(render(harness, `v3UnclassifiedNoteHtml(${JSON.stringify({ snapshot: { validation_summary: {} } })})`), "");
  assert.equal(render(harness, "v3UnclassifiedNoteHtml(null)"), "");
});

test("F.5: rendering the list touches no failure counter and leaves the load state alone", async () => {
  const harness = harnessWithModel();
  harness.sandbox.resetProjectScopedState();
  harness.sandbox.setActiveProjectBase("/projects/lanes/");
  await harness.sandbox.loadActiveProject();
  await harness.flush();
  const before = render(harness, "failedSources.length");
  render(harness, "renderOverviewV3(appData)");
  assert.equal(render(harness, "failedSources.length"), before, "the report must not count as a load failure");
});
