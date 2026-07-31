// DEFECTS (B) and (C) — the roadmap edit modal, against the REAL renderer.
//
// (B) THE ASYMMETRIC CACHE READ. The modal read the queue model two ways. The renderers read
//     `roadmapV3ModelCache || v3Model(appData)`; `v3EditBeforeNode` — and through it
//     `v3BatchOpChanged` and the insert payload — read the bare cache. The cache is null on the
//     whole stretch between a project reset and the first Roadmap render, and there the two
//     halves disagreed: the modal painted its fields off the fallback while the diff had no
//     before-node, so `v3BatchOpChanged` answered false for every op and "Preview all changes"
//     reported NO CHANGES over a modal holding real ones. The worst of the four because it does
//     not look wrong: it makes the operator conclude there was nothing to apply.
//
// (C) THE POSITION DEFAULT. "Add run" prefilled end-of-phase. On an early phase that is a low
//     queue_order, and a queue_order asserts WHEN a run executes — it nearly landed the launchers
//     run at position 2. Cabin decision of 2026-07-30: no default at all. The field is born empty
//     and the preview refuses, by name, until it is filled; the console does not assert an
//     execution order it cannot derive.
//
// Both are exercised through the shipped renderer in the node:vm harness, with the modal stubbed
// exactly as far as v3EditBuildPayload reaches (the harness's element registry is flat and has no
// tree) — the same technique tests/roadmap-barrier-control.test.mjs uses.

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { createConsoleHarness } from "./helpers/console-dom.mjs";
import { CANTU_FIXTURE, FROZEN_ROOTS } from "./helpers/neighbours.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const RENDERER = join(REPO_ROOT, "project-console", "assets", "project-console.js");

async function loadedHarness() {
  const harness = createConsoleHarness({ rendererPath: RENDERER, rootsByKey: FROZEN_ROOTS });
  harness.sandbox.resetProjectScopedState();
  harness.sandbox.setActiveProjectBase("/projects/cantu-studio/");
  await harness.sandbox.loadActiveProject();
  await harness.flush();
  return harness;
}

// A modal stub reaching exactly what the batch builder reaches: the blocks it walks
// (`.v3-edit-block[data-v3edit-op]`) and the fields each block's payload reads.
function installModalStub(harness, { ops, fields }) {
  vm.runInContext(`
    (function () {
      const ops = ${JSON.stringify(ops)};
      const fields = new Map(${JSON.stringify(Object.entries(fields))});
      const modal = document.getElementById("edit-modal-body");
      modal.querySelector = (selector) => fields.has(selector) ? { value: fields.get(selector), checked: false } : null;
      modal.querySelectorAll = (selector) =>
        selector === ".v3-edit-block[data-v3edit-op]"
          ? ops.map((op) => ({ getAttribute: (name) => (name === "data-v3edit-op" ? op : null) }))
          : [];
    })();
  `, harness.sandbox);
}

const run = (harness, expression) => vm.runInContext(expression, harness.sandbox);

// ===========================================================================
// (B) the cache read
// ===========================================================================

test("the model cache really is EMPTY on the stretch this defect lives in", () => {
  // The premise, asserted rather than assumed: resetProjectScopedState clears the cache and
  // nothing repopulates it until a Roadmap surface renders.
  const harness = createConsoleHarness({ rendererPath: RENDERER, rootsByKey: FROZEN_ROOTS });
  harness.sandbox.resetProjectScopedState();
  assert.equal(run(harness, "roadmapV3ModelCache"), null);
});

test("with the cache EMPTY the before-node still resolves, from appData", async () => {
  const harness = await loadedHarness();
  const runId = run(harness, "v3Model(appData).allRuns[0].run_id");
  run(harness, `roadmapV3ModelCache = null; v3EditModalTarget = { kind: "run", id: ${JSON.stringify(runId)} };`);

  const before = run(harness, "(function () { const n = v3EditBeforeNode(); return n ? n.run_id : null; })()");
  assert.equal(before, runId,
    "v3EditBeforeNode returns null with an empty cache: every op then diffs as unchanged");
});

test("with the cache EMPTY, Preview all changes SEES a changed title", async () => {
  const harness = await loadedHarness();
  const target = run(harness, "JSON.stringify(v3Model(appData).allRuns[0])");
  const runId = JSON.parse(target).run_id;
  const originalTitle = JSON.parse(target).title;

  run(harness, `roadmapV3ModelCache = null; v3EditModalTarget = { kind: "run", id: ${JSON.stringify(runId)} };`);
  installModalStub(harness, {
    ops: ["set-text"],
    fields: {
      "[data-v3edit-title]": `${originalTitle} CHANGED`,
      "[data-v3edit-summary]": JSON.parse(target).summary,
      "[data-v3edit-fulldesc]": JSON.parse(target).full_description
    }
  });

  const batch = JSON.parse(run(harness, "JSON.stringify(v3EditBuildBatch())"));
  assert.equal(batch.considered, 1, "the block was not even walked");
  assert.equal(batch.ops.length, 1,
    "the batch is empty with a changed title on screen — the diff read a cache the renderers did not");
  assert.equal(batch.ops[0].op, "set-text");
  assert.equal(batch.ops[0].args.title, `${originalTitle} CHANGED`);
});

test("with the cache EMPTY, Preview all changes does not say 'No changes to preview'", async () => {
  const harness = await loadedHarness();
  const target = JSON.parse(run(harness, "JSON.stringify(v3Model(appData).allRuns[0])"));

  run(harness, `roadmapV3ModelCache = null; v3EditModalTarget = { kind: "run", id: ${JSON.stringify(target.run_id)} };`);
  installModalStub(harness, {
    ops: ["set-text"],
    fields: {
      "[data-v3edit-title]": `${target.title} CHANGED`,
      "[data-v3edit-summary]": target.summary,
      "[data-v3edit-fulldesc]": target.full_description
    }
  });

  await harness.sandbox.v3EditPreviewAllChanges();
  await harness.flush();
  const panel = harness.element("v3-edit-preview").innerHTML;
  assert.equal(panel.includes("No changes to preview"), false,
    "the modal reported nothing to apply while holding a changed title");
  // It went on to the dry run instead. The harness serves files, not the write endpoint, so the
  // POST 404s and the panel says so — the honest outcome. What matters is that the change
  // reached the endpoint at all rather than being dropped behind a "nothing to apply".
  assert.ok(panel.includes("Refusing") || panel.includes("not reachable") || panel.includes("Previewing"),
    `unexpected panel after preview: ${panel}`);
});

test("an UNCHANGED modal still reports no changes — the repair did not invent one", async () => {
  const harness = await loadedHarness();
  const target = JSON.parse(run(harness, "JSON.stringify(v3Model(appData).allRuns[0])"));

  run(harness, `roadmapV3ModelCache = null; v3EditModalTarget = { kind: "run", id: ${JSON.stringify(target.run_id)} };`);
  installModalStub(harness, {
    ops: ["set-text"],
    fields: {
      "[data-v3edit-title]": target.title,
      "[data-v3edit-summary]": target.summary,
      "[data-v3edit-fulldesc]": target.full_description
    }
  });

  const batch = JSON.parse(run(harness, "JSON.stringify(v3EditBuildBatch())"));
  assert.equal(batch.ops.length, 0);
  await harness.sandbox.v3EditPreviewAllChanges();
  assert.ok(harness.element("v3-edit-preview").innerHTML.includes("No changes to preview"));
});

test("a POPULATED cache answers exactly what an empty one now answers", async () => {
  // The two halves are symmetric now: the same modal produces the same batch either way.
  const harness = await loadedHarness();
  const target = JSON.parse(run(harness, "JSON.stringify(v3Model(appData).allRuns[0])"));
  const fields = {
    "[data-v3edit-title]": `${target.title} CHANGED`,
    "[data-v3edit-summary]": target.summary,
    "[data-v3edit-fulldesc]": target.full_description
  };

  run(harness, `v3EditModalTarget = { kind: "run", id: ${JSON.stringify(target.run_id)} };`);
  installModalStub(harness, { ops: ["set-text"], fields });

  run(harness, "roadmapV3ModelCache = v3Model(appData);");
  const warm = run(harness, "JSON.stringify(v3EditBuildBatch())");
  run(harness, "roadmapV3ModelCache = null;");
  const cold = run(harness, "JSON.stringify(v3EditBuildBatch())");
  assert.equal(cold, warm, "the batch still depends on whether the cache happens to be warm");
});

test("no edit-surface function reads the bare cache any more", () => {
  // The asymmetry was structural, so the repair is asserted structurally too: between the
  // v3EditModel() accessor and the end of the edit code, the cache is only ever WRITTEN.
  const source = readFileSync(RENDERER, "utf8");
  const from = source.indexOf("function v3EditModel()");
  assert.ok(from > 0, "v3EditModel is gone; the edit surfaces have no single model read");
  const editRegion = source.slice(from);
  const reads = editRegion
    .split(/\r?\n/)
    .filter((line) => line.includes("roadmapV3ModelCache"))
    .filter((line) => !/^\s*\/\//.test(line))
    // A WRITE is fine; it is the read-without-fallback that split the modal in two.
    .filter((line) => !/roadmapV3ModelCache\s*=/.test(line))
    // The accessor itself, and the post-write reload's existence check.
    .filter((line) => !line.includes("roadmapV3ModelCache || v3Model(appData)"))
    .filter((line) => !line.includes("roadmapV3ModelCache && roadmapV3ModelCache.runsById.get(t.id)"));
  assert.deepEqual(reads, [], `edit-surface code still reads the bare cache:\n${reads.join("\n")}`);
});

// ===========================================================================
// (C) the Add run position default
// ===========================================================================

function insertForm(harness, phaseId) {
  return run(harness, `
    (function () {
      const model = v3Model(appData);
      return v3RenderInsertForm({ kind: "insert", anchorKind: "end-of-phase", anchorId: ${JSON.stringify(phaseId)} }, model);
    })()
  `);
}

function firstPhaseId(harness) {
  return run(harness, "v3Model(appData).roadmap.objectives[0].phases[0].phase_id");
}

test("the Position field is born EMPTY — no value attribute at all", async () => {
  const harness = await loadedHarness();
  const html = insertForm(harness, firstPhaseId(harness));
  const input = /<input type="number" data-v3edit-insert-position[^>]*>/.exec(html);
  assert.ok(input, "the Position input is gone from the insert form");
  assert.equal(/\bvalue="/.test(input[0]), false,
    `the Position field is prefilled — it asserts an execution order nobody chose: ${input[0]}`);
  assert.match(input[0], /placeholder=/, "an empty field with no placeholder reads as a broken control");
});

test("the insert form no longer CLAIMS a landing before one is chosen", async () => {
  const harness = await loadedHarness();
  const html = insertForm(harness, firstPhaseId(harness));
  assert.equal(/Prefilled/.test(html), false, "the note still announces a prefill");
  assert.equal(/Resulting position: #/.test(html), false,
    "the form states a resulting position with no position entered");
  assert.match(html, /No position entered yet/);
});

test("an EARLY phase does not produce a low prefilled queue_order (the launchers-at-#2 path)", async () => {
  const harness = await loadedHarness();
  const html = insertForm(harness, firstPhaseId(harness));
  // The whole defect in one assertion: whatever the anchor phase is, nothing in the emitted
  // control carries a position for the operator to accept by pressing on.
  assert.equal(/data-v3edit-insert-position[^>]*value=/.test(html), false);
  // The phase's own span is offered as read-only CONTEXT, which is not a prefill.
  assert.match(html, /currently holds (#\d+ to #\d+|no runs)/);
});

test("with the field empty there is no current position, and no payload is built", async () => {
  const harness = await loadedHarness();
  const phaseId = firstPhaseId(harness);
  run(harness, `v3EditModalTarget = { kind: "insert", anchorKind: "end-of-phase", anchorId: ${JSON.stringify(phaseId)} };`);
  // The modal holds an insert form whose Position input is empty.
  installModalStub(harness, { ops: [], fields: { "[data-v3edit-insert-position]": "" } });

  assert.equal(run(harness, "v3InsertCurrentPosition(v3Model(appData))"), null,
    "an empty Position still resolves to a number: something is defaulting");
  assert.equal(run(harness, "v3EditBuildPayload('insert')"), null,
    "an insert payload was built with no position — the anchor would be invented");
});

test("Preview insert REFUSES with a named reason rather than doing nothing", async () => {
  const harness = await loadedHarness();
  const phaseId = firstPhaseId(harness);
  run(harness, `v3EditModalTarget = { kind: "insert", anchorKind: "end-of-phase", anchorId: ${JSON.stringify(phaseId)} };`);
  installModalStub(harness, { ops: [], fields: { "[data-v3edit-insert-position]": "" } });

  await harness.sandbox.v3EditPreview("insert");
  await harness.flush();
  const panel = harness.element("v3-edit-preview").innerHTML;
  assert.ok(panel.includes("Enter a position"),
    `Preview insert said nothing at all — a silent button reads as broken: ${panel}`);
  assert.equal(harness.element("v3-edit-preview").hidden, false);
});

test("once a position IS entered, the insert works exactly as before", async () => {
  const harness = await loadedHarness();
  const phaseId = firstPhaseId(harness);
  run(harness, `v3EditModalTarget = { kind: "insert", anchorKind: "end-of-phase", anchorId: ${JSON.stringify(phaseId)} };`);
  installModalStub(harness, {
    ops: [],
    fields: {
      "[data-v3edit-insert-position]": "3",
      "[data-v3edit-newid]": "RUN-NEW-001",
      "[data-v3edit-title]": "New",
      "[data-v3edit-summary]": "s",
      "[data-v3edit-fulldesc]": "d",
      "[data-v3edit-status]": "planned"
    }
  });

  assert.equal(run(harness, "v3InsertCurrentPosition(v3Model(appData))"), 3);
  const payload = JSON.parse(run(harness, "JSON.stringify(v3EditBuildPayload('insert'))"));
  assert.equal(payload.op, "insert");
  assert.equal(payload.args.runId, "RUN-NEW-001");
  // Position 3 means "after whatever is at queue_order 2" — the translation is untouched.
  const secondRun = run(harness, "v3Model(appData).allRuns.find((r) => r.queue_order === 2).run_id");
  assert.equal(payload.args.after, secondRun);
});

test("the position is still clamped to the queue at both ends", async () => {
  const harness = await loadedHarness();
  const total = run(harness, "v3Model(appData).allRuns.length");
  const phaseId = firstPhaseId(harness);
  run(harness, `v3EditModalTarget = { kind: "insert", anchorKind: "end-of-phase", anchorId: ${JSON.stringify(phaseId)} };`);

  installModalStub(harness, { ops: [], fields: { "[data-v3edit-insert-position]": "-4" } });
  assert.equal(run(harness, "v3InsertCurrentPosition(v3Model(appData))"), 1);

  installModalStub(harness, { ops: [], fields: { "[data-v3edit-insert-position]": String(total + 900) } });
  assert.equal(run(harness, "v3InsertCurrentPosition(v3Model(appData))"), total + 1);

  // Not a number is "not said yet", not zero and not the end of the queue.
  installModalStub(harness, { ops: [], fields: { "[data-v3edit-insert-position]": "  " } });
  assert.equal(run(harness, "v3InsertCurrentPosition(v3Model(appData))"), null);
});

test("the frozen fixture this file reads is the fixture, never the live neighbour", () => {
  assert.ok(CANTU_FIXTURE.includes(join("tests", "fixtures", "neighbours")));
});
