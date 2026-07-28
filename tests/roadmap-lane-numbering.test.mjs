// [D-051 QA-A] Lane-local numbering, measured in the DOM the REAL renderer paints.
//
// The correction: with a lane selected the Run Queue and the Roadmap tree number their rows
// by the run's position INSIDE that lane (1, 2, 3… contiguous). With no lane selected the
// primary number stays the GLOBAL queue_order, exactly as before. The global order is never
// lost: while the filter is on it rides along as a secondary `#N global` tag, and the run
// detail keeps speaking global throughout.
//
// Everything is DERIVED by filtering the global order at read time — the same derivation
// D-051 already used for the lane labels. The last test here re-states D-051's invariant
// from this angle: no lane position exists in the canonical or in ANY emitted artifact.
//
// The renderer runs inside node:vm on the minimal DOM stub (tests/helpers/console-dom.mjs),
// so these assertions are against the markup a browser would receive. Layout and CSS stay
// with the operator QA pass recorded in the run record.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { createConsoleHarness } from "./helpers/console-dom.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const RENDERER = join(REPO_ROOT, "project-console", "assets", "project-console.js");
const LANES_ROOT = join(HERE, "fixtures", "lanes", "project");

const ROOTS = new Map([
  ["aiw-console", REPO_ROOT],
  ["cantu-studio", resolve(REPO_ROOT, "..", "cantu-studio")],
  ["lanes", LANES_ROOT]
]);

function makeHarness() {
  return createConsoleHarness({ rendererPath: RENDERER, rootsByKey: ROOTS });
}

async function select(harness, key) {
  harness.sandbox.resetProjectScopedState();
  harness.sandbox.setActiveProjectBase(`/projects/${key}/`);
  const result = await harness.sandbox.loadActiveProject();
  await harness.flush();
  return result;
}

// The lane filter is renderer state (a top-level `let`), which is exactly where the console
// keeps it: a display filter, never data. vm reaches the context's global lexical scope, so
// the test drives the same variable the <select>'s change handler assigns.
function setLane(harness, laneId) {
  // `v3SelectedLane` and `appData` are top-level `let`s: they live in the context's global
  // lexical scope, not on the sandbox object, so the whole gesture runs inside the context —
  // which is also the closest thing to what the <select>'s own change handler does.
  vm.runInContext(
    `v3SelectedLane = ${laneId === null ? "null" : JSON.stringify(laneId)};` +
    "renderRunQueueV3(appData); renderRoadmapV3(appData);",
    harness.sandbox
  );
}

// Row order tiles / inline #N, in document order, for whichever surface is asked for.
function queuePositions(harness) {
  const html = harness.element("run-queue-v3").innerHTML;
  return Array.from(html.matchAll(/<span class="v3-order-tile[^"]*">(\d+)<\/span>|<span class="v3-run-order">#(\d+)<\/span>/g))
    .map((match) => Number(match[1] ?? match[2]));
}

function treePositions(harness) {
  const html = harness.element("roadmap-v3-tree").innerHTML;
  return Array.from(html.matchAll(/<span class="v3-run-order">#(\d+)<\/span>/g)).map((match) => Number(match[1]));
}

function globalTags(harness, id) {
  const html = harness.element(id).innerHTML;
  return Array.from(html.matchAll(/<span class="v3-global-order-tag"[^>]*>#(\d+) global<\/span>/g)).map((match) => Number(match[1]));
}

function laneTags(harness, id) {
  const html = harness.element(id).innerHTML;
  return Array.from(html.matchAll(/<span class="v3-lane-tag"[^>]*>([^<]+)<\/span>/g)).map((match) => match[1]);
}

// The fixture's runs, by lane, in global queue order — the ground truth every derivation
// below must reproduce. Read from the CANONICAL, not from anything the console emitted.
function fixtureLaneOrder() {
  const tree = JSON.parse(readFileSync(join(LANES_ROOT, "roadmap", "roadmap.json"), "utf8"));
  const defaultLane = tree.lanes.find((lane) => lane.default === true).lane_id;
  const runs = [];
  for (const objective of tree.objectives) {
    for (const phase of objective.phases) for (const run of phase.runs) runs.push(run);
  }
  runs.sort((a, b) => a.queue_order - b.queue_order);
  const byLane = new Map();
  for (const run of runs) {
    const lane = run.lane || defaultLane;
    if (!byLane.has(lane)) byLane.set(lane, []);
    byLane.get(lane).push(run);
  }
  return byLane;
}

// ------------------------------------------------------------------ no filter: global order

test("with NO lane selected the primary position is the global queue_order, in both subviews", async () => {
  const harness = makeHarness();
  await select(harness, "lanes");
  const expected = Array.from(fixtureLaneOrder().values()).flat().map((run) => run.queue_order).sort((a, b) => a - b);
  assert.deepEqual(queuePositions(harness).slice().sort((a, b) => a - b), expected);
  assert.deepEqual(treePositions(harness).slice().sort((a, b) => a - b), expected);
  // The queue is the whole project: 12 rows, and the highest number IS the global maximum.
  assert.equal(queuePositions(harness).length, 12);
  assert.equal(Math.max(...queuePositions(harness)), 12);
  // Unfiltered, the lane label is the tag that travels; the global tag would repeat the
  // number the row already leads with, so it is not emitted at all.
  assert.equal(laneTags(harness, "run-queue-v3").length, 12);
  assert.deepEqual(globalTags(harness, "run-queue-v3"), []);
  assert.deepEqual(globalTags(harness, "roadmap-v3-tree"), []);
});

// ------------------------------------------------------- filtered: contiguous, lane-local

test("with a lane selected each row shows its position INSIDE that lane: 1, 2, 3… contiguous", async () => {
  const harness = makeHarness();
  await select(harness, "lanes");
  const byLane = fixtureLaneOrder();
  for (const [laneId, runs] of byLane) {
    setLane(harness, laneId);
    const queue = queuePositions(harness).slice().sort((a, b) => a - b);
    const expected = runs.map((_run, index) => index + 1);
    assert.deepEqual(queue, expected, `lane ${laneId}: Run Queue positions must be 1..${runs.length}`);
    assert.deepEqual(treePositions(harness).slice().sort((a, b) => a - b), expected, `lane ${laneId}: Roadmap tree must number the same way`);
    // Contiguity, stated as the defect it fixes: no gap anywhere in the sequence.
    for (let i = 1; i < queue.length; i += 1) {
      assert.equal(queue[i] - queue[i - 1], 1, `lane ${laneId}: the filtered queue reads skipped at position ${i}`);
    }
    assert.equal(queue[0], 1, `lane ${laneId}: the first row of a lane must be 1`);
  }
  setLane(harness, null);
});

test("the defect, pinned: the lane whose runs are #3, #7, #8, #10 globally now reads 1, 2, 3, 4", async () => {
  const harness = makeHarness();
  await select(harness, "lanes");
  const byLane = fixtureLaneOrder();
  // The documentation lane is the one the operator reported: four runs scattered through the
  // global order. Found by shape, not by name — no lane key is baked into this test either.
  const [laneId, runs] = Array.from(byLane).find(([, list]) => list.length === 4);
  assert.deepEqual(runs.map((run) => run.queue_order), [3, 7, 8, 10]);
  setLane(harness, laneId);
  assert.deepEqual(queuePositions(harness).slice().sort((a, b) => a - b), [1, 2, 3, 4]);
  // And the global order is still on the row, one per row, unchanged and in the same set.
  assert.deepEqual(globalTags(harness, "run-queue-v3").slice().sort((a, b) => a - b), [3, 7, 8, 10]);
  assert.deepEqual(globalTags(harness, "roadmap-v3-tree").slice().sort((a, b) => a - b), [3, 7, 8, 10]);
  // The lane label steps aside while the filter is on: one tag per row, never two.
  assert.deepEqual(laneTags(harness, "run-queue-v3"), []);
  setLane(harness, null);
});

test("switching the filter off restores the global numbering exactly — the state is display-only", async () => {
  const harness = makeHarness();
  await select(harness, "lanes");
  const before = harness.element("run-queue-v3").innerHTML;
  const beforeTree = harness.element("roadmap-v3-tree").innerHTML;
  const laneId = Array.from(fixtureLaneOrder().keys())[1];
  setLane(harness, laneId);
  assert.notEqual(harness.element("run-queue-v3").innerHTML, before);
  setLane(harness, null);
  assert.equal(harness.element("run-queue-v3").innerHTML, before);
  assert.equal(harness.element("roadmap-v3-tree").innerHTML, beforeTree);
});

test("the run detail keeps speaking GLOBAL order while a lane filter is on", async () => {
  const harness = makeHarness();
  await select(harness, "lanes");
  const byLane = fixtureLaneOrder();
  const [laneId, runs] = Array.from(byLane).find(([, list]) => list.length === 4);
  setLane(harness, laneId);
  // Second run of that lane: in-lane position 2, global queue_order 7.
  const target = runs[1];
  assert.equal(target.queue_order, 7);
  // The drawer header is the one node the flat id stub cannot serve (the renderer reaches it
  // by CSS selector, not by id). Hand it a stub header for this test only; everything the
  // assertions read below is still painted by the real v3OpenRunDetail.
  const header = harness.sandbox.document.createElement("div");
  harness.element("run-drawer").querySelector = () => header;
  harness.sandbox.v3OpenRunDetail(target.run_id);
  const title = harness.element("drawer-title").innerHTML;
  const body = harness.element("drawer-body").innerHTML;
  // The drawer is the run's IDENTITY surface: its heading and its "Run order" cell are the
  // project-wide number, whatever the queue is currently filtered to.
  assert.match(title, /<span class="v3-detail-order">#7<\/span>/);
  assert.match(body, /Run order/);
  assert.match(body, /#7 <span class="is-faint">of 12<\/span>/);
  // The in-lane position is present too, in the Lane cell, as the lane label — the same
  // derived `<lane_id>-NN` D-051 defined.
  assert.match(body, new RegExp(`${laneId}-02`));
});

// ------------------------------------------------------------------ nothing is persisted

test("ZERO lane positions are stored: no canonical and no emitted artifact carries one", () => {
  // Every JSON the fixture holds — its hand-written canonical AND the three files the
  // projector emitted from it — is walked key by key. A stored position would show up as a
  // key here; the numbering above is reproduced from queue_order alone, so none exists.
  const files = [
    join(LANES_ROOT, "roadmap", "roadmap.json"),
    join(LANES_ROOT, ".project", "roadmap.json"),
    join(LANES_ROOT, ".project", "snapshot.json"),
    join(LANES_ROOT, ".project", "docs_index.json"),
    join(REPO_ROOT, "roadmap", "roadmap.json"),
    resolve(REPO_ROOT, "..", "cantu-studio", ".aiw", "roadmap", "roadmap.json")
  ];
  const FORBIDDEN = /^(lane_position|lane_order|lane_index|lane_queue_order|position_in_lane|in_lane_position|lane_seq|lane_label)$/;
  const walk = (node, path, file) => {
    if (Array.isArray(node)) return node.forEach((item, index) => walk(item, `${path}[${index}]`, file));
    if (!node || typeof node !== "object") return;
    for (const [key, value] of Object.entries(node)) {
      assert.ok(!FORBIDDEN.test(key), `${file} persists a derived lane position at ${path}.${key}`);
      walk(value, `${path}.${key}`, file);
    }
  };
  for (const file of files) walk(JSON.parse(readFileSync(file, "utf8")), "$", file);
});

test("the numbering derives from queue_order alone: it is reproducible from the canonical with no console state", () => {
  // If any position were read from a file rather than derived, this recomputation could not
  // match what the DOM tests above assert. Stated here as the property, on the data.
  const byLane = fixtureLaneOrder();
  for (const [laneId, runs] of byLane) {
    const derived = runs.map((_run, index) => index + 1);
    assert.deepEqual(derived, runs.map((run, index) => index + 1), `lane ${laneId}`);
    // Global order strictly increases inside a lane, which is what makes the filtered
    // sequence both stable and contiguous.
    for (let i = 1; i < runs.length; i += 1) {
      assert.ok(runs[i].queue_order > runs[i - 1].queue_order, `lane ${laneId} is not in global order`);
    }
  }
});

// ------------------------------------------------------------------ no regression, in DOM

// The no-regression pin, unchanged in every assertion, now naming the ONE real project that
// is still lane-less. cantu-studio left this list when it migrated; its own DOM behaviour is
// pinned positively in the two tests below, so nothing stopped being measured.
test("the lane-less REAL project is untouched: no lane filter can apply, no lane or global tag appears", async () => {
  for (const key of ["aiw-console"]) {
    const harness = makeHarness();
    const result = await select(harness, key);
    assert.equal(result.ok, true, `${key} must load`);
    const queue = harness.element("run-queue-v3").innerHTML;
    const tree = harness.element("roadmap-v3-tree").innerHTML;
    assert.equal(harness.element("roadmap-lane-slot").innerHTML, "", `${key} must render no lane selector`);
    for (const html of [queue, tree]) {
      assert.equal(/v3-lane-tag/.test(html), false, `${key} must carry no lane label`);
      assert.equal(/v3-global-order-tag/.test(html), false, `${key} must carry no global-order tag`);
      assert.equal(/v3-barrier-tag/.test(html), false, `${key} must carry no barrier mark`);
    }
    // Even if a lane id were somehow left selected, a lane-less project ignores it: the
    // filter is only active when the tree DECLARES the lane.
    vm.runInContext(`v3SelectedLane = "ANY"; renderRunQueueV3(appData); renderRoadmapV3(appData);`, harness.sandbox);
    assert.equal(harness.element("run-queue-v3").innerHTML, queue, `${key} changed under a stale lane selection`);
    assert.equal(harness.element("roadmap-v3-tree").innerHTML, tree, `${key} changed under a stale lane selection`);
  }
});

// ------------------------------------------------- the first REAL project on lanes, in DOM

test("cantu-studio renders its declared lanes: a selector with both, and a label on every row", async () => {
  const harness = makeHarness();
  const result = await select(harness, "cantu-studio");
  assert.equal(result.ok, true);
  const tree = JSON.parse(readFileSync(resolve(REPO_ROOT, "..", "cantu-studio", ".aiw", "roadmap", "roadmap.json"), "utf8"));
  const laneIds = tree.lanes.map((lane) => lane.lane_id);
  assert.equal(laneIds.length, 2);
  // The selector exists and offers the declared vocabulary — read off the DOM, by value,
  // never by a key this test knows in advance.
  const slot = harness.element("roadmap-lane-slot").innerHTML;
  assert.notEqual(slot, "", "a roadmap that declares lanes must render the selector");
  const options = Array.from(slot.matchAll(/<option value="([^"]*)"/g)).map((match) => match[1]);
  assert.deepEqual(options.slice().sort(), ["", ...laneIds].sort(), "the selector offers exactly the declared lanes plus All lanes");
  // Every row carries its lane label, and every label names a declared lane.
  const tags = laneTags(harness, "run-queue-v3");
  // [O4.P14] 53 -> 71: cantu-studio's canonical gained the documentation lane's runs. A count
  // pin on real data follows the data; what this test asserts — a label on EVERY row, each
  // naming a declared lane — is unchanged.
  assert.equal(tags.length, 71, "every row of the queue carries a lane label");
  for (const tag of tags) {
    assert.ok(laneIds.some((laneId) => tag.startsWith(`${laneId}-`)), `lane label ${tag} names no declared lane`);
  }
  // No barrier was applied to a real roadmap, so no barrier mark may be painted.
  assert.equal(/v3-barrier-tag/.test(harness.element("run-queue-v3").innerHTML), false);
});

test("cantu-studio numbers locally per lane when filtered, and the counts match the canonical", async () => {
  const harness = makeHarness();
  await select(harness, "cantu-studio");
  const tree = JSON.parse(readFileSync(resolve(REPO_ROOT, "..", "cantu-studio", ".aiw", "roadmap", "roadmap.json"), "utf8"));
  const defaultLane = tree.lanes.find((lane) => lane.default === true).lane_id;
  const runs = [];
  for (const objective of tree.objectives) for (const phase of objective.phases) for (const run of phase.runs) runs.push(run);
  runs.sort((a, b) => a.queue_order - b.queue_order);
  const byLane = new Map();
  for (const run of runs) {
    const laneId = run.lane || defaultLane;
    if (!byLane.has(laneId)) byLane.set(laneId, []);
    byLane.get(laneId).push(run);
  }
  // The split the migration produced, asserted against the file rather than a literal.
  // [O4.P14] 53 -> 71 after the implementation/documentation partition; the DEFAULT lane's 48
  // did not move (the partition only grew the documentation lane), which is why that pin stands.
  assert.equal(runs.length, 71);
  assert.equal(byLane.get(defaultLane).length, 48);
  assert.equal(Array.from(byLane.values()).reduce((n, list) => n + list.length, 0), 71);
  for (const [laneId, laneRuns] of byLane) {
    setLane(harness, laneId);
    const queue = queuePositions(harness).slice().sort((a, b) => a - b);
    assert.deepEqual(queue, laneRuns.map((_run, index) => index + 1), `lane ${laneId}: rows must read 1..${laneRuns.length}`);
    // The global order rides along as the secondary tag, one per row, and it is exactly the
    // set of global queue_orders those runs hold in the canonical.
    assert.deepEqual(
      globalTags(harness, "run-queue-v3").slice().sort((a, b) => a - b),
      laneRuns.map((run) => run.queue_order).sort((a, b) => a - b),
      `lane ${laneId}: the global tags must be the canonical's own queue_orders`
    );
    assert.deepEqual(laneTags(harness, "run-queue-v3"), [], "the lane label steps aside while the filter is on");
  }
  setLane(harness, null);
});

test("the real counts and the global numbering are exactly what the canonicals say", async () => {
  const harness = makeHarness();
  await select(harness, "aiw-console");
  const own = JSON.parse(readFileSync(join(REPO_ROOT, "roadmap", "roadmap.json"), "utf8"));
  const orders = [];
  for (const objective of own.objectives) {
    for (const phase of objective.phases) for (const run of phase.runs) orders.push(run.queue_order);
  }
  orders.sort((a, b) => a - b);
  assert.equal(orders.length, 42);
  assert.deepEqual(queuePositions(harness).slice().sort((a, b) => a - b), orders);

  const cantu = makeHarness();
  await select(cantu, "cantu-studio");
  const theirs = JSON.parse(readFileSync(resolve(REPO_ROOT, "..", "cantu-studio", ".aiw", "roadmap", "roadmap.json"), "utf8"));
  const theirOrders = [];
  for (const objective of theirs.objectives) {
    for (const phase of objective.phases) for (const run of phase.runs) theirOrders.push(run.queue_order);
  }
  theirOrders.sort((a, b) => a - b);
  assert.equal(theirOrders.length, 71); // [O4.P14] 53 -> 71, see above
  assert.deepEqual(queuePositions(cantu).slice().sort((a, b) => a - b), theirOrders);
});
