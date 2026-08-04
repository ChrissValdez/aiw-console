// [#46 amendment] The closeout list: SUGGESTED, never a vocabulary.
//
// Run 46 made `closeout_result` REQUIRED AT CLOSE and the engine proved it refuses a mute
// close. The whole cost of that obligation fell on the operator, who closes runs by hand
// dozens of times. This amendment makes an ordinary close a CONFIRMATION instead of a piece
// of writing — and must do it without turning the obligation into decoration.
//
// Four things are measured here, and the third and fourth are the ones that can go wrong
// silently:
//
//   1. the list      — five values verbatim and in order, plus a visible write-your-own
//                      entry; `done as specified` preselected when a run is about to close
//   2. the openness  — the engine enumerates NOTHING: an outcome nobody foresaw is stored
//                      verbatim, and no token of the list appears in the engine at all
//   3. the obligation — PROVEN BY A TEST THAT WATCHES IT FAIL: a close with no outcome is
//                      still refused, and the empty write-your-own box still reaches that
//                      refusal from the screen. The engine never fills the field in.
//   4. the non-write — a run ALREADY terminal with no outcome (9 of the 45 in this repo's
//                      canonical) is not "being closed": the preselection must never make
//                      editing such a run's title backfill an outcome nobody stated
//
// Everything runs against trees built here or against tests/fixtures/lanes. The live roadmap
// of this repo is never asserted on: a suite that pins it goes red whenever the cabin plans
// or closes a run.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import * as core from "../tools/roadmap/roadmap-core.mjs";
import { planEdit } from "../tools/roadmap/roadmap-plan.mjs";
import { createConsoleHarness } from "./helpers/console-dom.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const RENDERER = join(REPO_ROOT, "project-console", "assets", "project-console.js");
const ENGINE = join(REPO_ROOT, "tools", "roadmap", "roadmap-core.mjs");
const LANES_ROOT = join(HERE, "fixtures", "lanes", "project");
const LANES_CANONICAL = join(LANES_ROOT, "roadmap", "roadmap.json");

// The five, transcribed from the ticket. Order included: the screen must not reorder them.
const SUGGESTED = ["done as specified", "done with deviations", "superseded", "not needed", "partially done"];
const CUSTOM_SENTINEL = "__write_my_own__";

// One-run tree, built here so "absent by default" stays testable.
function tree(extra) {
  return {
    schema_version: "roadmap_tree_v1",
    roadmap_id: "t",
    title: "T",
    objectives: [{
      objective_id: "O1",
      title: "O",
      phases: [{
        phase_id: "O1.P1",
        title: "P",
        runs: [{
          run_id: "RUN-T-001",
          queue_order: 1,
          title: "Run 1",
          summary: "Summary 1",
          full_description: "Description 1",
          status: "active",
          depends_on: [],
          ...(extra || {})
        }]
      }]
    }]
  };
}

const harness = () => createConsoleHarness({ rendererPath: RENDERER, rootsByKey: new Map([["lanes", LANES_ROOT]]) });
const render = (h, expression) => vm.runInContext(expression, h.sandbox);

// The run editor, rendered by the REAL renderer for one run shape.
function editorFor(h, run) {
  return render(h, `v3RenderRunEditor(${JSON.stringify(run)}, null, { allRuns: [${JSON.stringify(run)}] })`);
}
const RUN = { run_id: "RUN-T-001", queue_order: 1, title: "t", summary: "s", full_description: "f", status: "active", depends_on: [] };

// The <option>s of the closeout choice, in DOM order, with their selected flag.
function closeoutOptions(html) {
  const block = html.split("data-v3edit-closeout-choice>")[1].split("</select>")[0];
  return Array.from(block.matchAll(/<option value="([^"]*)"([^>]*)>([^<]*)</g))
    .map((m) => ({ value: m[1], selected: /selected/.test(m[2]), label: m[3] }));
}

// ==================================================== 1. THE LIST

test("A.1: the editor offers the FIVE suggested outcomes, verbatim and in order, and nothing else claims to be a value", () => {
  const options = closeoutOptions(editorFor(harness(), RUN));
  assert.deepEqual(options.slice(0, 5).map((o) => o.value), SUGGESTED,
    "verbatim and in the ticket's order — the screen neither invents nor reorders");
  assert.equal(options.length, 6, "the five, plus the write-your-own entry; no sixth outcome");
  assert.equal(options[5].value, CUSTOM_SENTINEL);
  assert.match(options[5].label, /Write my own outcome/);
});

test("A.2: `done as specified` is PRESELECTED for a run about to close — closing is a confirmation, not a piece of writing", () => {
  for (const status of ["planned", "active"]) {
    const options = closeoutOptions(editorFor(harness(), { ...RUN, status }));
    const selected = options.filter((o) => o.selected);
    assert.deepEqual(selected.map((o) => o.value), ["done as specified"], `status ${status}`);
  }
});

test("A.3: the WRITE-YOUR-OWN path is on the screen, not merely in the engine — an entry that reveals a free-text box", () => {
  const html = editorFor(harness(), RUN);
  assert.match(html, /data-v3edit-closeout-custom/, "the free-text box exists in the markup");
  assert.match(html, /Write my own outcome/, "and it is reachable by a named choice, not by knowing a trick");
  // Hidden until chosen (the box is the sentinel's consequence), and the handler that reveals
  // it reads the SELECT, so the two can never disagree about which one the close carries.
  const box = html.split("data-v3edit-closeout-custom")[1].split(">")[0];
  assert.match(box, /hidden/);
  const source = readFileSync(RENDERER, "utf8");
  assert.equal(source.includes('closest("[data-v3edit-closeout-choice]")'), true,
    "a change handler is wired to the choice, so the box appears when it is picked");
});

test("A.4: a stored outcome OUTSIDE the list is read back verbatim into the write-your-own box — never rewritten into a listed value", () => {
  const stored = "delivered_by_aiw_roadmap_O2";
  const html = editorFor(harness(), { ...RUN, status: "completed", closeout_result: stored });
  const options = closeoutOptions(html);
  assert.deepEqual(options.filter((o) => o.selected).map((o) => o.value), [CUSTOM_SENTINEL]);
  assert.match(html, new RegExp(`data-v3edit-closeout value="${stored}"`));
  const box = html.split("data-v3edit-closeout-custom")[1].split(">")[0];
  assert.equal(/hidden/.test(box), false, "the box is open, showing the operator what is stored");
  // A stored value that IS one of the five selects it directly, box empty.
  const listed = closeoutOptions(editorFor(harness(), { ...RUN, status: "completed", closeout_result: "superseded" }));
  assert.deepEqual(listed.filter((o) => o.selected).map((o) => o.value), ["superseded"]);
});

// ==================================================== 2. THE OPENNESS

test("B.1: an outcome NOBODY FORESAW is accepted and stored verbatim — the list closes nothing", () => {
  for (const outcome of [
    "abandoned when the vendor withdrew the API, 2026-08-04",
    "superseded_by_D-099",
    "done as specified but the deviation is in run #47",
    "✅"
  ]) {
    const obj = tree();
    const result = core.setStatus(obj, { run: "RUN-T-001", status: "completed", closeoutResult: outcome });
    assert.deepEqual(result.errors, [], `refused: ${outcome}`);
    assert.equal(core.findRunEntry(obj, "RUN-T-001").run.closeout_result, outcome, "stored byte for byte");
  }
});

test("B.2: the engine knows NOTHING of the five — no enum, no default, not even the tokens", () => {
  const engine = readFileSync(ENGINE, "utf8");
  for (const value of SUGGESTED) {
    assert.equal(engine.includes(value), false,
      `the engine names "${value}" — a list the engine knows is one edit from the enum CONTRATO §14 refuses`);
  }
  assert.equal(engine.includes(CUSTOM_SENTINEL), false, "the screen's sentinel is not a value and never reaches the engine");
  // And the whole chain that relays the op is equally ignorant.
  assert.equal(readFileSync(join(REPO_ROOT, "tools", "roadmap", "roadmap-plan.mjs"), "utf8").includes("done as specified"), false);
});

// ==================================================== 3. THE OBLIGATION, UNCHANGED

test("C.1: THE FAILING CASE — a close with NO outcome is still refused, for both terminal statuses, by name", () => {
  for (const status of ["completed", "blocked"]) {
    const obj = tree();
    const refused = core.setStatus(obj, { run: "RUN-T-001", status });
    assert.equal(refused.errors.length, 1, `a mute close to ${status} must be refused`);
    assert.match(refused.errors[0], /closing to (completed|blocked) requires a closeout_result/);
    // Refused means UNTOUCHED: no status written, and above all no outcome invented.
    const run = core.findRunEntry(obj, "RUN-T-001").run;
    assert.equal(run.status, "active");
    assert.equal("closeout_result" in run, false, "the engine must never fill the field in by itself");
  }
});

test("C.2: an EMPTY write-your-own box sends no outcome — so the refusal stays reachable from the screen", () => {
  const h = harness();
  // The modal stubbed exactly as far as v3EditBuildPayload reaches: the operator picked
  // write-your-own and typed nothing.
  vm.runInContext(`
    (function () {
      const fields = new Map(Object.entries({
        "[data-v3edit-status]": { value: "completed" },
        "[data-v3edit-closeout-choice]": { value: ${JSON.stringify(CUSTOM_SENTINEL)} },
        "[data-v3edit-closeout]": { value: "   " }
      }));
      const modal = document.getElementById("edit-modal-body");
      modal.querySelector = (selector) => fields.get(selector) || null;
      v3EditModalTarget = { kind: "run", id: "RUN-FIX-COMP2-001" };
    })();
  `, h.sandbox);
  const payload = JSON.parse(render(h, 'JSON.stringify(v3EditBuildPayload("set-status"))'));
  assert.deepEqual(payload.args, { run: "RUN-FIX-COMP2-001", status: "completed" },
    "no closeoutResult travels — an empty box is not an outcome");
  // And the engine refuses that exact payload, on a real file, planned not written.
  const plan = planEdit({ filePath: LANES_CANONICAL, op: "set-status", args: payload.args });
  assert.equal(plan.ok, false);
  assert.match(plan.errors.join("\n"), /requires a closeout_result/);
});

test("C.3: a picked suggestion travels as PLAIN TEXT the engine accepts — the sentinel never reaches the wire", () => {
  const h = harness();
  vm.runInContext(`
    (function () {
      const fields = new Map(Object.entries({
        "[data-v3edit-status]": { value: "completed" },
        "[data-v3edit-closeout-choice]": { value: "done as specified" },
        "[data-v3edit-closeout]": { value: "" }
      }));
      const modal = document.getElementById("edit-modal-body");
      modal.querySelector = (selector) => fields.get(selector) || null;
      v3EditModalTarget = { kind: "run", id: "RUN-FIX-COMP2-001" };
    })();
  `, h.sandbox);
  const payload = JSON.parse(render(h, 'JSON.stringify(v3EditBuildPayload("set-status"))'));
  assert.deepEqual(payload.args, { run: "RUN-FIX-COMP2-001", status: "completed", closeoutResult: "done as specified" });
  const plan = planEdit({ filePath: LANES_CANONICAL, op: "set-status", args: payload.args });
  assert.equal(plan.ok, true, plan.errors.join("\n"));
  // A written-in outcome overrides the selection only when the sentinel is the one chosen.
  vm.runInContext(`
    (function () {
      const fields = new Map(Object.entries({
        "[data-v3edit-status]": { value: "blocked" },
        "[data-v3edit-closeout-choice]": { value: ${JSON.stringify(CUSTOM_SENTINEL)} },
        "[data-v3edit-closeout]": { value: "  parked until the vendor answers  " }
      }));
      document.getElementById("edit-modal-body").querySelector = (selector) => fields.get(selector) || null;
    })();
  `, h.sandbox);
  const own = JSON.parse(render(h, 'JSON.stringify(v3EditBuildPayload("set-status"))'));
  assert.equal(own.args.closeoutResult, "parked until the vendor answers", "trimmed, otherwise verbatim");
  assert.equal(planEdit({ filePath: LANES_CANONICAL, op: "set-status", args: own.args }).ok, true);
});

// ==================================================== 4. THE NON-WRITE

test("D.1: a run ALREADY closed with no outcome is not 'being closed' — it gets the honest entry, never the default", () => {
  const options = closeoutOptions(editorFor(harness(), { ...RUN, status: "completed" }));
  assert.deepEqual(options.filter((o) => o.selected).map((o) => o.value), [""],
    "the preselection is for the ACT of closing; a run closed before the rule keeps its absence");
  assert.match(options[0].label, /no outcome recorded/);
  assert.deepEqual(options.slice(1, 6).map((o) => o.value), SUGGESTED, "the five are still all there, unreordered");
});

test("D.2: editing such a run's TITLE does not backfill an outcome — the batch sees no status change at all", () => {
  const h = harness();
  const stored = { run_id: "RUN-T-001", status: "completed", title: "t" };
  // What the modal collects when the operator touched only the title: the choice element
  // carries "" (the honest entry rendered by D.1), so no closeoutResult is produced...
  vm.runInContext(`
    (function () {
      const fields = new Map(Object.entries({
        "[data-v3edit-status]": { value: "completed" },
        "[data-v3edit-closeout-choice]": { value: "" },
        "[data-v3edit-closeout]": { value: "" }
      }));
      const modal = document.getElementById("edit-modal-body");
      modal.querySelector = (selector) => fields.get(selector) || null;
      v3EditModalTarget = { kind: "run", id: "RUN-T-001" };
    })();
  `, h.sandbox);
  const payload = JSON.parse(render(h, 'JSON.stringify(v3EditBuildPayload("set-status"))'));
  assert.equal("closeoutResult" in payload.args, false);
  // ...and the change detector therefore calls it NO CHANGE, so the op never enters the batch.
  assert.equal(render(h, `v3BatchOpChanged("set-status", ${JSON.stringify(payload.args)}, ${JSON.stringify(stored)})`), false,
    "opening the editor on one of the runs closed before this rule must not write anything to it");
  // The contrast: a deliberately chosen outcome IS a change.
  const chosen = { run: "RUN-T-001", status: "completed", closeoutResult: "done as specified" };
  assert.equal(render(h, `v3BatchOpChanged("set-status", ${JSON.stringify(chosen)}, ${JSON.stringify(stored)})`), true);
});

test("D.3: absence stays VALID DATA — the amendment adds no validator rule and no backfill", () => {
  const stored = tree({ status: "completed" });
  assert.deepEqual(core.checkInvariants(stored, {}), [], "a terminal run with no outcome is valid data (CONTRATO §14, §21)");
  // And a terminal->terminal flip on a run that already carries one does not ask for it again.
  const carried = tree({ status: "completed", closeout_result: "completed_successfully" });
  const flip = core.setStatus(carried, { run: "RUN-T-001", status: "blocked" });
  assert.deepEqual(flip.errors, []);
  assert.equal(core.findRunEntry(carried, "RUN-T-001").run.closeout_result, "completed_successfully");
});
