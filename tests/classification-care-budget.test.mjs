// [#43, third commission] CARE BUDGET — per-project configuration, and ADVICE rather than a rule.
//
// Five layers, each measured where it lives:
//
//   1. the specification — the published table is read OFF `context/CLASIFICACION-DE-RUNS.md`
//                          §5 and compared with what the module carries, so the transcription
//                          is checked rather than trusted
//   2. the schema        — `care_budget` is a ROOT key of the project, optional and absent by
//                          default, and is NOT a run field in any of the four places a run
//                          field would have to appear
//   3. the engine        — declare-care-budget replaces the table whole, refuses only its FORM,
//                          and never touches a run
//   4. the envelope      — it travels inside taxonomy_model, with `declared`/`declared_reason`
//                          never split, and the emitter version moved
//   5. ADVICE, NOT A RULE — the guard that matters: a run whose classification deviates from
//                          the project's budget saves, validates and emits without complaint
//
// Nothing here reads or writes the live roadmap of this repo: every write goes to a temporary
// copy of tests/fixtures/lanes, and every measurement of this repo's own canonical is a read.
import test from "node:test";
import assert from "node:assert/strict";
import { cpSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import * as core from "../tools/roadmap/roadmap-core.mjs";
import { KNOWN_OPS, planEdit, applyPlan } from "../tools/roadmap/roadmap-plan.mjs";
import { buildRoadmapTreeSnapshot, PROJECTOR_VERSION } from "../tools/projector/project.mjs";
import * as classification from "../tools/classification/classification.mjs";
import { createConsoleHarness } from "./helpers/console-dom.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const RENDERER = join(REPO_ROOT, "project-console", "assets", "project-console.js");
const SPEC = join(REPO_ROOT, "context", "CLASIFICACION-DE-RUNS.md");
const LANES_ROOT = join(HERE, "fixtures", "lanes", "project");
const LANES_CANONICAL = join(LANES_ROOT, "roadmap", "roadmap.json");
const FIRST_RUN = "RUN-FIX-DOC-GUIDE-001";
const NOW = "2026-07-31T10:45:14.552Z";

// A well-formed budget that is DELIBERATELY NOT the published defaults, used everywhere a
// legal-but-different table is needed. §5 says a project may fix its own; if any assertion in
// this file only passed for the published values, that sentence would be untested.
const OWN_BUDGET = {
  MINOR: { model: "Haiku", effort: "Bajo" },
  MODERATE: { model: "Sonnet", effort: "Medio" },
  MAJOR: { model: "Sonnet", effort: "Alto" },
  CRITICAL: { model: "Opus", effort: "Extra" },
};

// Run the body against a throwaway copy of the lanes fixture. Every write in this file goes
// through here, so the fixture on disk is never touched.
function withTempProject(body) {
  const temp = mkdtempSync(join(tmpdir(), "care-budget-"));
  try {
    cpSync(LANES_ROOT, temp, { recursive: true });
    return body({ root: temp, canonical: join(temp, "roadmap", "roadmap.json") });
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
}

// =============================================================== 1. THE SPECIFICATION

test("B.1/B.2: the published defaults are §5's table, parsed off the specification and compared cell by cell", () => {
  // The transcription in the module is CHECKED, not trusted. §5 is located by its heading, its
  // markdown table is parsed, and every cell is compared with what the module publishes. If the
  // cabin edits the table, this test — not a reader — is what notices.
  const spec = readFileSync(SPEC, "utf8");
  const section = spec.split(/^## 5\. /m)[1];
  assert.ok(section, "§5 must exist in the specification");
  const body = section.split(/^## /m)[0];

  // The specification is the SOURCE of the stop condition of B.2: a §5 with no concrete table
  // means the defaults were never published, and this suite says so by name rather than by a
  // silent pass.
  const rows = body
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|") && !/^\|\s*-+/.test(line))
    .map((line) => line.split("|").slice(1, -1).map((cell) => cell.trim()));
  assert.ok(rows.length >= 5, "§5 must contain a concrete table: a header row and one row per severity");

  const parsed = {};
  for (const row of rows.slice(1)) {
    const level = row[0].replace(/`/g, "").trim();
    if (!classification.SEVERITIES.includes(level)) continue;
    // The cells read `Opus · Alto`: model and effort separated by the published middle dot.
    const [model, effort] = row[1].split("·").map((part) => part.trim());
    parsed[level] = { model, effort };
  }
  assert.deepEqual(parsed, classification.CARE_BUDGET_PUBLISHED_DEFAULTS,
    "the module's published defaults must be §5's table, verbatim");
  // And the table covers every severity the derivation can produce — no more, no fewer.
  assert.deepEqual(Object.keys(parsed), classification.SEVERITIES);
});

test("B.3: the table's four levels are EXACTLY the levels the derivation of the second commission produces", () => {
  // Not asserted against a literal: the produced set is swept out of the derivation itself,
  // over every combination of inputs, and compared with the keys of the published table.
  const produced = new Set();
  for (const workType of classification.WORK_TYPES) {
    for (const blastRadius of classification.BLAST_RADII) {
      for (const failureSurfaces of [...classification.FAILURE_SURFACES, undefined]) {
        const run = { work_type: workType, blast_radius: blastRadius };
        if (failureSurfaces) run.failure_surfaces = failureSurfaces;
        const severity = classification.deriveSeverity(run);
        if (severity) produced.add(severity);
      }
    }
  }
  assert.deepEqual([...produced].sort(), classification.SEVERITIES.slice().sort(),
    "the derivation produces exactly the four levels");
  assert.deepEqual(Object.keys(classification.CARE_BUDGET_PUBLISHED_DEFAULTS).sort(), classification.SEVERITIES.slice().sort(),
    "and the published table covers exactly those four — no level uncovered, none invented");
});

// =============================================================== 2. THE SCHEMA

test("C.1: care_budget is a ROOT field of the project, seated beside lanes in both root lists", () => {
  assert.ok(core.ROOT_ALLOWED_FIELDS.includes("care_budget"));
  assert.ok(core.CANONICAL_ROOT_KEY_ORDER.includes("care_budget"));
  // `objectives` stays the last key of the file, so the small configuration keys stay visible
  // at the top instead of below thousands of lines.
  assert.equal(core.CANONICAL_ROOT_KEY_ORDER[core.CANONICAL_ROOT_KEY_ORDER.length - 1], "objectives");
  assert.ok(core.CANONICAL_ROOT_KEY_ORDER.indexOf("care_budget") > core.CANONICAL_ROOT_KEY_ORDER.indexOf("title"));
});

test("C.2: care_budget is NOT a run field, in all four places a run field would have to appear", () => {
  // 1. The run allowlist.
  assert.equal(core.RUN_OPTIONAL_FIELDS.includes("care_budget"), false);
  assert.equal(core.RUN_REQUIRED_FIELDS.includes("care_budget"), false);
  // 2. The classification module's list of STORED run fields.
  assert.equal(classification.CLASSIFICATION_STORED_FIELDS.includes("care_budget"), false);
  // 3. The write operation for run classification does not relay it, whatever the caller sends.
  const obj = core.parseRoadmap(core.loadRaw(LANES_CANONICAL));
  const result = core.setClassification(obj, {
    run: FIRST_RUN, workType: "FUNCTIONAL", blastRadius: "LOCAL",
    careBudget: OWN_BUDGET, care_budget: OWN_BUDGET,
  });
  assert.deepEqual(result.errors, []);
  const run = core.findRunEntry(obj, FIRST_RUN).run;
  assert.equal("care_budget" in run, false, "set-classification must not be able to write a run-level care budget");
  // 4. And a hand-written run-level key is still REFUSED by the validator, exactly as the
  //    first commission left it — adding the ROOT key changed nothing about the run key.
  run.care_budget = OWN_BUDGET;
  const errors = core.checkInvariants(obj, { externalRunIds: null });
  assert.ok(errors.some((e) => /care_budget/.test(e) && /unexpected field/.test(e)),
    `a run-level care_budget must still be refused; got: ${errors.join(" | ")}`);
});

test("C.3: absent is VALID and is today's state — this repo's canonical passes and round-trips byte-identical", () => {
  // Measured on the live canonical, READ ONLY. It carries no root care_budget, and both facts
  // that matter about that are asserted: it validates, and reading + writing it changes nothing.
  const raw = core.loadRaw(join(REPO_ROOT, "roadmap", "roadmap.json"));
  const obj = core.parseRoadmap(raw);
  assert.equal("care_budget" in obj, false, "this repo declares no care budget, and that is valid");
  assert.deepEqual(core.checkInvariants(obj, { externalRunIds: null }), []);
  assert.equal(core.serialize(obj, core.detectEol(raw)), raw, "read + write must be byte-identical");
});

test("C.3: the fixture without the key validates, and gains + loses it without disturbing anything else", () => {
  const raw = core.loadRaw(LANES_CANONICAL);
  const obj = core.parseRoadmap(raw);
  assert.equal("care_budget" in obj, false);
  assert.deepEqual(core.checkInvariants(obj, { externalRunIds: null }), []);

  core.setCareBudget(obj, { careBudget: OWN_BUDGET });
  assert.deepEqual(core.checkInvariants(obj, { externalRunIds: null }), []);
  // Declared and then cleared, the file is byte-for-byte what it was: the key is deleted, not
  // emptied, so there is no `care_budget: {}` third state left behind.
  core.setCareBudget(obj, { careBudget: null });
  assert.equal(core.serialize(obj, core.detectEol(raw)), raw);
});

test("C.4: FORM is the invariant, CONTENT is not — a project that fixes its own values is legal", () => {
  const obj = core.parseRoadmap(core.loadRaw(LANES_CANONICAL));
  core.setCareBudget(obj, { careBudget: OWN_BUDGET });
  assert.deepEqual(core.checkInvariants(obj, { externalRunIds: null }), [],
    "a budget that differs from the published defaults at EVERY level is valid — that is the point of the feature");
  assert.notDeepEqual(obj.care_budget, classification.CARE_BUDGET_PUBLISHED_DEFAULTS);
  // The four levels are stored in scale order with model before effort, regardless of input order.
  assert.deepEqual(Object.keys(obj.care_budget), classification.SEVERITIES);
  assert.deepEqual(Object.keys(obj.care_budget.MINOR), ["model", "effort"]);
});

test("C.4: the FORM invariant refuses a malformed table, level by level, and the checker is shared", () => {
  const cases = [
    [[], /must be an object keyed by severity/],
    ["Opus", /must be an object keyed by severity/],
    [{ MINOR: { model: "Opus", effort: "Alto" } }, /missing severity MODERATE/],
    [{ ...OWN_BUDGET, HUGE: { model: "x", effort: "y" } }, /unknown severity HUGE/],
    [{ ...OWN_BUDGET, MAJOR: { model: "Opus" } }, /MAJOR\.effort must be a non-empty string/],
    [{ ...OWN_BUDGET, MAJOR: { model: "Opus", effort: "  " } }, /MAJOR\.effort must be a non-empty string/],
    [{ ...OWN_BUDGET, MAJOR: { model: "Opus", effort: "Max", cost: 3 } }, /unexpected field cost/],
    [{ ...OWN_BUDGET, MAJOR: ["Opus", "Max"] }, /must be an object \{ model, effort \}/],
  ];
  for (const [value, pattern] of cases) {
    // The engine's invariant and the write operation give the SAME answer, because they call
    // the same function — a hand-edited file and a console write cannot be refused differently.
    const invariantErrors = classification.careBudgetErrors(value, "root.care_budget");
    assert.ok(invariantErrors.length, `${JSON.stringify(value)} must be refused`);
    assert.match(invariantErrors.join(" | "), pattern);

    const obj = core.parseRoadmap(core.loadRaw(LANES_CANONICAL));
    const before = JSON.stringify(obj);
    const result = core.setCareBudget(obj, { careBudget: value });
    if (Array.isArray(value) || typeof value === "string" || Object.keys(value).length) {
      assert.ok(result.errors.length, `${JSON.stringify(value)} must be refused by the operation too`);
      assert.match(result.errors.join(" | "), pattern);
      assert.equal(JSON.stringify(obj), before, "a refused write must leave the object untouched");
    }
  }
});

// =============================================================== 3. THE ENGINE

test("C.1/F.4: declare-care-budget travels the EXISTING write route — a known op, and NOT batchable", () => {
  assert.ok(KNOWN_OPS.includes("declare-care-budget"));
  // Non-batchable, inherited from declare-lanes: a root configuration change is not a per-run
  // edit, and a batch that mixed them would hide which half a refusal came from.
  const batched = planEdit({
    filePath: LANES_CANONICAL,
    op: "batch",
    args: { ops: [{ op: "declare-care-budget", args: { careBudget: OWN_BUDGET } }] },
  });
  assert.equal(batched.ok, false);
  assert.match(batched.errors.join(" "), /not a batchable op/);

  // And the server needs no change to serve it: it validates against this same imported list
  // and relays `args`, so the route enumerates no op and no field.
  const serve = readFileSync(join(REPO_ROOT, "project-console", "serve.mjs"), "utf8");
  assert.equal(/care_budget|careBudget|declare-care-budget/.test(serve), false,
    "serve.mjs must not learn this op's name: the route relays, it does not enumerate");
});

test("C.1: the operation writes root.care_budget end to end, through planEdit and applyPlan", () => {
  withTempProject(({ canonical }) => {
    const plan = planEdit({ filePath: canonical, op: "declare-care-budget", args: { careBudget: OWN_BUDGET } });
    assert.equal(plan.ok, true, plan.errors.join("\n"));
    applyPlan({ filePath: canonical, serialized: plan.serialized, validate: () => ({ code: 0, output: "ok" }) });
    const written = core.parseRoadmap(core.loadRaw(canonical));
    assert.deepEqual(written.care_budget, OWN_BUDGET);
    assert.deepEqual(core.checkInvariants(written, { externalRunIds: null }), []);

    // Cleared with null, through the same route: the key goes, nothing else moves.
    const cleared = planEdit({ filePath: canonical, op: "declare-care-budget", args: { careBudget: null } });
    assert.equal(cleared.ok, true, cleared.errors.join("\n"));
    applyPlan({ filePath: canonical, serialized: cleared.serialized, validate: () => ({ code: 0, output: "ok" }) });
    assert.equal("care_budget" in core.parseRoadmap(core.loadRaw(canonical)), false);
  });
});

test("C.2: the operation NEVER touches a run — not one, in either direction", () => {
  const raw = core.loadRaw(LANES_CANONICAL);
  const obj = core.parseRoadmap(raw);
  const runsBefore = JSON.stringify(obj.objectives);
  core.setCareBudget(obj, { careBudget: OWN_BUDGET });
  assert.equal(JSON.stringify(obj.objectives), runsBefore,
    "declaring a project budget must not classify, re-classify or otherwise edit any run");
});

// =============================================================== 4. THE ENVELOPE

test("E.1: it travels INSIDE taxonomy_model, and no severity token travels outside that key", () => {
  const snapshot = buildRoadmapTreeSnapshot(LANES_ROOT, { now: NOW });
  const block = snapshot.taxonomy_model.care_budget;
  assert.ok(block, "the envelope must carry the block");
  assert.equal(block.keyed_by, "run.severity");
  assert.deepEqual(block.levels, classification.SEVERITIES);
  assert.deepEqual(block.applies_to, ["project"]);
  // It is NOT a run key and NOT a tree key: the roadmap tree the envelope carries is untouched.
  assert.equal("care_budget" in snapshot.roadmap_tree, false);
  // The second commission's discipline, re-measured with the new block in place: no derived
  // token may appear as a value anywhere outside taxonomy_model. `care_budget` is keyed BY
  // severity, so carrying it anywhere else would have been the first violation of it.
  const serialized = JSON.stringify({ ...snapshot, taxonomy_model: null });
  for (const token of classification.SEVERITIES) {
    assert.equal(serialized.includes(`"${token}"`), false, `${token} travelled outside taxonomy_model`);
  }
});

test("E.1/E.3: `declared` and `declared_reason` travel TOGETHER, and absent means declared:null WITH its reason", () => {
  // A project with no budget: the envelope is valid, and it says so in words rather than going
  // silent — the `unprojected_inputs` / `unprojected_inputs_reason` precedent, applied.
  const absent = buildRoadmapTreeSnapshot(LANES_ROOT, { now: NOW }).taxonomy_model.care_budget;
  assert.equal(absent.declared, null);
  assert.match(absent.declared_reason, /declares no root\.care_budget/);
  assert.match(absent.declared_reason, /nothing is blocked, refused or defaulted by its absence/);
  // NOT an empty object (which would read as a budget that says nothing) and NOT the defaults
  // (which would read as a budget this project never fixed).
  assert.notDeepEqual(absent.declared, {});
  assert.notDeepEqual(absent.declared, classification.CARE_BUDGET_PUBLISHED_DEFAULTS);
  // The published defaults still travel, because the console must be able to OFFER them
  // without inventing values on screen — but they travel under their own name.
  assert.deepEqual(absent.published_defaults, classification.CARE_BUDGET_PUBLISHED_DEFAULTS);
  assert.equal(absent.binding, "advice");

  // The pair is produced by ONE function, so neither key can travel without the other.
  for (const value of [undefined, null, OWN_BUDGET]) {
    const built = classification.buildCareBudgetDeclaration(value);
    assert.ok("declared" in built && "declared_reason" in built);
  }

  withTempProject(({ root, canonical }) => {
    const plan = planEdit({ filePath: canonical, op: "declare-care-budget", args: { careBudget: OWN_BUDGET } });
    applyPlan({ filePath: canonical, serialized: plan.serialized, validate: () => ({ code: 0, output: "ok" }) });
    const declared = buildRoadmapTreeSnapshot(root, { now: NOW }).taxonomy_model.care_budget;
    assert.deepEqual(declared.declared, OWN_BUDGET, "what the project declared travels verbatim");
    assert.match(declared.declared_reason, /declared by this project at root\.care_budget/);
    // The MODEL half is identical for both projects; only the declared half differs. That is
    // what makes this per-project configuration rather than a vocabulary.
    assert.deepEqual(declared.published_defaults, absent.published_defaults);
    assert.deepEqual(declared.levels, absent.levels);
  });
});

test("E.2: the emitter version moved, and the move is behaviour", () => {
  assert.equal(PROJECTOR_VERSION, "0.12.0");
  const snapshot = buildRoadmapTreeSnapshot(LANES_ROOT, { now: NOW });
  assert.equal(snapshot.generated_from, "aiw-projector@0.12.0");
  // The behaviour that moved it: a block the 0.11.0 envelope did not carry.
  assert.ok("care_budget" in snapshot.taxonomy_model);
});

// =============================================================== 5. ADVICE, NOT A RULE

test("D.2: a run whose classification DEVIATES from the project's care budget saves without a complaint", () => {
  withTempProject(({ root, canonical }) => {
    // The project fixes a budget that is not the published one at any level.
    const budget = planEdit({ filePath: canonical, op: "declare-care-budget", args: { careBudget: OWN_BUDGET } });
    applyPlan({ filePath: canonical, serialized: budget.serialized, validate: () => ({ code: 0, output: "ok" }) });

    // A run is classified to derive CRITICAL — the level the project's budget prices lowest of
    // all the ways it differs from the published table. Nothing about the run says which model
    // or effort was actually used, and nothing anywhere may infer it.
    const plan = planEdit({
      filePath: canonical,
      op: "set-classification",
      args: { run: FIRST_RUN, correctnessModel: "JUDGED_DEFINES", workType: "FOUNDATIONAL", blastRadius: "SYSTEMIC", failureSurfaces: "SILENT" },
    });
    assert.equal(plan.ok, true, plan.errors.join("\n"));
    applyPlan({ filePath: canonical, serialized: plan.serialized, validate: () => ({ code: 0, output: "ok" }) });

    const obj = core.parseRoadmap(core.loadRaw(canonical));
    const run = core.findRunEntry(obj, FIRST_RUN).run;
    assert.equal(classification.deriveSeverity(run), "CRITICAL");
    // 1. The validator is silent about it.
    assert.deepEqual(core.checkInvariants(obj, { externalRunIds: null }), []);
    // 2. The emission succeeds and raises nothing.
    const snapshot = buildRoadmapTreeSnapshot(root, { now: NOW });
    assert.deepEqual(snapshot.blockers, []);
    assert.equal("errors" in snapshot.validation_summary, false);
    // 3. The budget is unchanged by the run, and the run carries no trace of the budget.
    assert.deepEqual(obj.care_budget, OWN_BUDGET);
    assert.equal("care_budget" in run, false);
    // 4. And the run still saves AFTERWARDS: a further edit under a budget it deviates from is
    //    accepted, so the budget cannot become a gate by arriving first.
    const later = planEdit({ filePath: canonical, op: "set-status", args: { run: FIRST_RUN, status: "planned" } });
    assert.equal(later.ok, true, later.errors.join("\n"));
  });
});

test("D.2: the budget can also be declared AFTER the runs are classified, and still refuses nothing", () => {
  withTempProject(({ root, canonical }) => {
    const classify = planEdit({
      filePath: canonical,
      op: "set-classification",
      args: { run: FIRST_RUN, correctnessModel: "SPECIFIED", workType: "COSMETIC", blastRadius: "LOCAL", failureSurfaces: "LOUD" },
    });
    applyPlan({ filePath: canonical, serialized: classify.serialized, validate: () => ({ code: 0, output: "ok" }) });
    const plan = planEdit({ filePath: canonical, op: "declare-care-budget", args: { careBudget: OWN_BUDGET } });
    assert.equal(plan.ok, true, plan.errors.join("\n"));
    applyPlan({ filePath: canonical, serialized: plan.serialized, validate: () => ({ code: 0, output: "ok" }) });
    const obj = core.parseRoadmap(core.loadRaw(canonical));
    assert.deepEqual(core.checkInvariants(obj, { externalRunIds: null }), []);
    assert.equal(classification.deriveSeverity(core.findRunEntry(obj, FIRST_RUN).run), "MINOR");
    assert.deepEqual(buildRoadmapTreeSnapshot(root, { now: NOW }).blockers, []);
  });
});

test("D.1/D.3: care_budget reaches the error channel for its OWN FORM and for nothing else", () => {
  const obj = core.parseRoadmap(core.loadRaw(LANES_CANONICAL));
  // With a well-formed budget in place, no error names it — not for any run, any status, any
  // dependency, any lane.
  core.setCareBudget(obj, { careBudget: OWN_BUDGET });
  const clean = core.checkInvariants(obj, { externalRunIds: null });
  assert.deepEqual(clean.filter((e) => /care_budget/.test(e)), []);
  // Malformed: exactly one subject, its own shape.
  obj.care_budget = { MINOR: "Opus" };
  const dirty = core.checkInvariants(obj, { externalRunIds: null }).filter((e) => /care_budget/.test(e));
  assert.ok(dirty.length);
  for (const error of dirty) {
    assert.match(error, /^root\.care_budget/, `an error about care_budget must be about care_budget: ${error}`);
  }
  // It contributes to no other channel: it is not a blocker, not a report, not a followup.
  const snapshot = buildRoadmapTreeSnapshot(LANES_ROOT, { now: NOW });
  const outsideTaxonomy = JSON.stringify({ ...snapshot, taxonomy_model: null });
  assert.equal(/care_budget/.test(outsideTaxonomy), false,
    "care_budget must not appear in blockers, followups or validation_summary");
});

// =============================================================== 6. THE CONSOLE SURFACE

// The renderer's `appData` and `v3EditMode` are top-level `let` bindings of the script, so they
// are reached by RUNNING an assignment in the same context — not by writing on the sandbox
// object, which would create a second, invisible global. Same technique the run-editor suites
// use for `v3EditModalTarget`.
const setInContext = (harness, statement) => vm.runInContext(statement, harness.sandbox);

function harnessWithSnapshot(careBudget) {
  const harness = createConsoleHarness({ rendererPath: RENDERER, rootsByKey: new Map([["lanes", LANES_ROOT]]) });
  harness.sandbox.setClassificationModel(classification);
  // The console reads the EMITTED envelope, never a canonical: this is the same block the
  // emitter builds, handed over the way a loaded snapshot would carry it.
  const snapshot = { taxonomy_model: { care_budget: classification.buildCareBudgetDeclaration(careBudget) } };
  setInContext(harness, `appData = ${JSON.stringify({ snapshot })}`);
  return harness;
}

const renderPanel = (harness) => {
  setInContext(harness, "renderCareBudget(appData)");
  return harness.sandbox.document.getElementById("roadmap-care-budget").innerHTML;
};

test("F.1/F.3: a project with NO care budget reads as NOT CONFIGURED, and no value is invented on screen", () => {
  const harness = harnessWithSnapshot(null);
  const html = renderPanel(harness);
  assert.match(html, /Not configured/);
  // The four levels are named, and every value cell is the em dash — never a number, never a
  // silent fallback to the published defaults.
  for (const level of classification.SEVERITIES) assert.ok(html.includes(level), level);
  assert.equal(/care-budget-row[\s\S]*?Opus/.test(html.split("care-budget-defaults")[0]), false,
    "an unconfigured project must not show any model in its own table");
  // The published defaults ARE offered — labelled, in their own block, as not in effect.
  assert.match(html, /Published defaults/);
  assert.match(html, /not in effect/);
  assert.match(html, /has not adopted them, and nothing applies them on its behalf/);
});

test("F.2: the surface declares it is ADVICE before it shows a single value", () => {
  const html = renderPanel(harnessWithSnapshot(OWN_BUDGET));
  // The binding TOKEN, read from the envelope and flagged rather than restated in the
  // renderer's own words — and the sentence beside it is the model's, not this file's, so the
  // screen cannot say something the model does not.
  assert.match(html, /class="care-budget-binding">advice</);
  assert.ok(html.includes("Advice, not a hard rule"), "the binding note must be rendered");
  assert.ok(html.includes("blocks nothing"));
  assert.ok(html.includes("it gates no run"), "the note must say it gates no closure");
  // Escaped on the way out, like every other value this renderer paints.
  assert.ok(html.includes("deviation travels in the run&#39;s ticket"));
  // And it comes FIRST: an operator who reads the table before the caveat has read it as a rule.
  assert.ok(html.indexOf("Advice, not a hard rule") < html.indexOf("care-budget-table"),
    "the advice line must precede the values");
});

test("F.1: a configured project shows the four levels with its OWN model and effort", () => {
  const html = renderPanel(harnessWithSnapshot(OWN_BUDGET));
  assert.match(html, /Configured/);
  for (const level of classification.SEVERITIES) {
    assert.ok(html.includes(level));
    assert.ok(html.includes(OWN_BUDGET[level].model), `${level} model`);
    assert.ok(html.includes(OWN_BUDGET[level].effort), `${level} effort`);
  }
  // A configured project is not shown the published defaults: they are an offer for a project
  // that has none, not a permanent comparison against a table it is allowed to differ from.
  assert.equal(/Published defaults/.test(html), false);
});

test("F.1: the panel is READ-ONLY until edit mode is on, and gains inputs when it is", () => {
  const harness = harnessWithSnapshot(OWN_BUDGET);
  const readOnly = renderPanel(harness);
  assert.equal(/<input/.test(readOnly), false, "no write affordance may exist with edit mode off");
  assert.equal(/data-care-budget-preview/.test(readOnly), false);
  assert.match(readOnly, /Turn on <strong>Edit roadmap<\/strong>/);

  setInContext(harness, "v3EditMode = true");
  const editable = renderPanel(harness);
  // Exactly eight inputs: four levels x { model, effort }. No control for anything else.
  assert.equal((editable.match(/<input/g) || []).length, 8);
  for (const level of classification.SEVERITIES) {
    assert.ok(editable.includes(`data-care-budget-input="${level}.model"`));
    assert.ok(editable.includes(`data-care-budget-input="${level}.effort"`));
  }
  assert.match(editable, /data-care-budget-preview/);
  assert.match(editable, /data-care-budget-clear/);
});

test("F.3: the OFFER of the published defaults exists only for an unconfigured project, and writes nothing by itself", () => {
  const harness = harnessWithSnapshot(null);
  setInContext(harness, "v3EditMode = true");
  const html = renderPanel(harness);
  assert.match(html, /data-care-budget-defaults/);
  // Clicking it fills the FORM and says, in words, that nothing has been written.
  setInContext(harness, "careBudgetFillDefaults()");
  const filled = harness.sandbox.document.getElementById("roadmap-care-budget").innerHTML;
  for (const level of classification.SEVERITIES) {
    const entry = classification.CARE_BUDGET_PUBLISHED_DEFAULTS[level];
    assert.ok(filled.includes(`data-care-budget-input="${level}.model" value="${entry.model}"`), `${level} model prefilled`);
    assert.ok(filled.includes(`data-care-budget-input="${level}.effort" value="${entry.effort}"`), `${level} effort prefilled`);
  }
  assert.match(harness.sandbox.document.getElementById("care-budget-preview").innerHTML, /nothing is written yet/);
});

test("F.1: the panel builds the payload the engine accepts, and it carries NO run", async () => {
  const harness = harnessWithSnapshot(null);
  setInContext(harness, "v3EditMode = true");
  renderPanel(harness);
  // The four rows, stubbed exactly as far as careBudgetFormValues reaches — the technique the
  // edit-modal suites already use for the run editor.
  vm.runInContext(`
    (function () {
      const values = ${JSON.stringify(OWN_BUDGET)};
      const slot = document.getElementById("roadmap-care-budget");
      slot.querySelector = (selector) => {
        const match = /data-care-budget-input="([A-Z]+)\\.(model|effort)"/.exec(selector);
        return match ? { value: values[match[1]][match[2]] } : null;
      };
    })();
  `, harness.sandbox);
  // The POST is stubbed in the context, so no server is contacted and nothing is written; what
  // is measured is the payload the panel actually hands to the endpoint.
  setInContext(harness, "globalThis.__posted = []; v3EditPost = async (body) => { globalThis.__posted.push(body); return { json: { ok: true, baseline: 'sha256:test' } }; };");
  await setInContext(harness, "careBudgetPreview(false)");
  const posted = harness.sandbox.__posted;

  assert.equal(posted.length, 1);
  assert.equal(posted[0].op, "declare-care-budget");
  assert.equal(posted[0].apply, false, "the first post is always a dry run");
  assert.equal("run" in posted[0].args, false, "this is project configuration: there is no run it could name");
  // Serialized across the vm boundary, which is also how it would reach the endpoint.
  const args = JSON.parse(JSON.stringify(posted[0].args));
  assert.deepEqual(args.careBudget, OWN_BUDGET);
  // The engine accepts the payload the panel built, unchanged.
  const plan = planEdit({ filePath: LANES_CANONICAL, op: "declare-care-budget", args });
  assert.equal(plan.ok, true, plan.errors.join("\n"));

  // Confirm posts apply:true with the baseline the dry run returned, and never re-derives it.
  await setInContext(harness, "careBudgetConfirm()");
  assert.equal(posted.length, 2);
  assert.equal(posted[1].apply, true);
  assert.equal(posted[1].baseline, "sha256:test");
});

test("F.1: a snapshot with no care_budget block renders NOTHING, rather than an empty or invented panel", () => {
  // Starts from a harness that DOES render, so an empty result cannot be a false pass on a
  // panel that was never painted in the first place.
  const harness = harnessWithSnapshot(OWN_BUDGET);
  assert.match(renderPanel(harness), /Care budget/);
  for (const snapshot of [null, {}, { taxonomy_model: {} }, { taxonomy_model: { care_budget: {} } }]) {
    setInContext(harness, `appData = ${JSON.stringify({ snapshot })}`);
    assert.equal(renderPanel(harness), "", `a snapshot shaped ${JSON.stringify(snapshot)} must render nothing`);
  }
});
