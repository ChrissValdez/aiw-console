// O4.P4 — the shell renders TWO projects emitted by REAL emitters over REAL repositories, each
// from its own `.project/`, with different roadmap models and different data — and NOTHING crosses
// between them in either direction.
//
// The synthetic fixture (hilo-verde, O4.P3) already proved the shell can execute a FOREIGN
// derivation table. What it could not prove is that a second REAL emitter, run over a real repo
// that keeps its plan somewhere else, produces something this renderer paints. That is what these
// tests are for, so both roots are the full output of a real emission.
//
// THEY ARE FROZEN, and that is the change. Until now these roots were the LIVE working trees of
// this repository and of cantu-studio next door, and the counts below were their counts on the day
// someone wrote them. Every one of those assertions failed the moment a neighbour committed —
// cantu-studio went 71 -> 73 runs and 38 -> 46 reviewed documents, this repository's own queue went
// 45 -> 51 — without one line of the console changing. The fixtures under tests/fixtures/neighbours/
// are the same emitted folders captured as data, so the assertions keep their meaning and stop
// measuring the neighbours' week. That the REAL projects still load is tested, once, in
// tests/real-projects-smoke.test.mjs. See tests/helpers/neighbours.mjs.
//
// Same harness and same limits as tests/shell-switch.test.mjs: the REAL renderer inside node:vm
// over a DOM stub. Layout, CSS and real clicks stay with the operator QA pass.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createConsoleHarness } from "./helpers/console-dom.mjs";
import { deriveCollectionStatus, snapshotSummary } from "../project-console/assets/project-shell.js";
import { AIW_CONSOLE_FIXTURE, CANTU_FIXTURE, frozenDocsIndex, frozenSnapshot } from "./helpers/neighbours.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const RENDERER = join(REPO_ROOT, "project-console", "assets", "project-console.js");
const HILO_VERDE = join(REPO_ROOT, "tests", "fixtures", "multi", "hilo-verde");

const ROOTS = new Map([
  ["aiw-console", AIW_CONSOLE_FIXTURE],
  ["cantu-studio", CANTU_FIXTURE],
  ["hilo-verde", HILO_VERDE]
]);
const snapshotOf = (key) => frozenSnapshot(key);

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

function scrubVolatile(dump) {
  const out = new Map();
  for (const [id, value] of dump) {
    out.set(id, String(value).replace(/\b\d+\s*(?:s|m|h|d)\s+ago\b/gi, "AGO").replace(/\bjust now\b/gi, "AGO"));
  }
  return out;
}

const joinedDump = (harness) => Array.from(harness.dump().values()).join("\n----\n");

// Markers unique to ONE of the two projects, each verified to actually paint. Deliberately NOT
// `RUN-CANTU-` or `RUN-JAME-`: BOTH roadmaps use those prefixes (aiw-console's tree is full of
// RUN-CANTU-* ids), so a prefix sweep would prove nothing here. These are roadmap titles,
// objective titles and the model identifier — each present in exactly one of the two trees.
const AIW_CONSOLE_ONLY = ["AIW Console Roadmap", "Global Console", "roadmap_tree_v1"];
const CANTU_ONLY = ["Cantu Studio Roadmap", "Asset Deduplication Layer", "Cantu Studio Web Components"];

// The renderer's docs mode is a module-local `let`, so it is observed the way the operator does:
// through how many documents the navigation lists. "all" lists the whole index; "primary" lists
// only the default-visible tier. The two numbers differ per project, which is the point.
const navItemCount = (harness) => (harness.element("docs-nav-list").innerHTML.match(/docs-nav-item/g) || []).length;

test("the two real projects declare DIFFERENT roadmap models, and neither is the other's", () => {
  const console_ = snapshotOf("aiw-console");
  const cantu = snapshotOf("cantu-studio");
  assert.equal(console_.project_id, "aiw_console");
  assert.equal(cantu.project_id, "cantu_studio");
  assert.notEqual(cantu.roadmap_tree.model, console_.roadmap_tree.model);
  assert.equal(cantu.taxonomy_model.model, cantu.roadmap_tree.model);
  // Each snapshot is self-describing: it carries the vocabulary AND the executable rule (O4.P2).
  for (const snapshot of [console_, cantu]) {
    assert.ok(snapshot.taxonomy_model.vocabularies["run.status"].tokens.length > 0);
    assert.ok(snapshot.taxonomy_model.derivations.collection_status_from_runs.precedence.length > 0);
  }
});

test("the shell summarises BOTH by executing each snapshot's own table — no code knows either project", () => {
  const summaries = [snapshotOf("aiw-console"), snapshotOf("cantu-studio")].map((snapshot) => snapshotSummary(snapshot));
  for (const summary of summaries) {
    assert.ok(summary, "the shell could not summarise a real emitted snapshot");
    assert.ok(summary.counts.runs > 0);
    assert.ok(summary.runStatusCounts.length > 0);
    // Every objective got a token from ITS OWN table — none was left underived.
    for (const objective of summary.objectives) {
      assert.ok(objective.status, `objective "${objective.title}" derived no status`);
    }
  }
  const [consoleSummary, cantuSummary] = summaries;
  // The two projects genuinely differ in what the derivation produces, so this is not a
  // tautology. The discriminator is the DERIVED VECTOR, not the one-word operational status:
  // both fixtures happen to hold an active run and so both summarise as "active", and pinning
  // that word would assert nothing about the table having been executed.
  assert.deepEqual(consoleSummary.objectives.map((o) => o.status), ["in_progress", "active"]);
  assert.deepEqual(cantuSummary.objectives.map((o) => o.status),
    ["in_progress", "in_progress", "active", "planned", "planned", "planned", "planned"]);
  assert.notDeepEqual(consoleSummary.objectives, cantuSummary.objectives);
  // Different trees, different shapes: 2 objectives against 7, from the same shell code.
  assert.equal(consoleSummary.counts.objectives, 2);
  assert.equal(cantuSummary.counts.objectives, 7);

  // The derivation is driven by the snapshot's table, not by this test's expectations: replay it.
  const cantu = snapshotOf("cantu-studio");
  cantu.roadmap_tree.objectives.forEach((objective, index) => {
    const statuses = objective.phases.flatMap((phase) => phase.runs.map((run) => run.status));
    assert.equal(cantuSummary.objectives[index].status, deriveCollectionStatus(cantu.taxonomy_model, "objective", statuses));
  });
});

test("cantu-studio renders from its own emitted folder: overview, roadmap, queue, docs, history, governance", async () => {
  const harness = makeHarness();
  const result = await select(harness, "cantu-studio");
  assert.equal(result.ok, true);
  assert.equal(result.snapshot.project_id, "cantu_studio");

  // Roadmap + Run Queue: its own tree, its own objective titles.
  const tree = harness.element("roadmap-v3-tree").innerHTML;
  assert.match(tree, /Cantu Studio Web Components/);
  assert.match(tree, /Asset Deduplication Layer/);
  assert.doesNotMatch(tree, /Global Console/);
  assert.match(harness.element("run-queue-v3").innerHTML, /\S/);

  // Overview and title come from its own snapshot.
  assert.match(harness.element("project-overview").innerHTML, /\S/);
  assert.equal(harness.sandbox.document.title, "Cantu Studio Roadmap — Project Console");

  // Docs: its own repo's Markdown, and the nav is not empty.
  const docsNav = harness.element("docs-nav-list").innerHTML;
  assert.match(docsNav, /docs-nav-item/);
  assert.doesNotMatch(docsNav, /Docs index unavailable/);

  // History: it is its own git root, so the commits are there and §20 is NOT triggered.
  const history = harness.element("history-list").innerHTML;
  assert.doesNotMatch(history, /Commit history unavailable/);

  // Governance: both tables carry its own entries, neither announces an absence.
  for (const id of ["project-guardrails", "no-claims"]) {
    const html = harness.element(id).innerHTML;
    assert.doesNotMatch(html, /could not be loaded/, `${id} announces an absence it should not`);
    assert.doesNotMatch(html, /No records available/, `${id} rendered empty`);
  }
  assert.match(harness.element("project-guardrails").innerHTML, /JAME_Lessons|monitored checkout/);

  // Every source route the diagnostics panel names belongs to THIS project.
  const sources = harness.element("state-sources").innerHTML + harness.element("console-source-files").innerHTML;
  assert.doesNotMatch(sources, /projects\/aiw-console\//);
});

test("aiw-console still renders exactly as measured, with the second project registered beside it", async () => {
  const harness = makeHarness();
  const result = await select(harness, "aiw-console");
  assert.equal(result.ok, true);
  assert.equal(result.snapshot.project_id, "aiw_console");
  assert.match(harness.element("roadmap-v3-tree").innerHTML, /Global Console/);
  assert.match(harness.element("console-source-files").innerHTML, /2 objectives \/ 19 phases \/ 51 runs/);
  assert.equal(harness.sandbox.document.title, "AIW Console Roadmap — Project Console");
});

test("aiw-console -> cantu-studio: nothing of the first survives on any surface", async () => {
  const harness = makeHarness();
  await select(harness, "aiw-console");
  const before = joinedDump(harness);
  for (const marker of AIW_CONSOLE_ONLY) assert.ok(before.includes(marker), `marker "${marker}" absent before the switch`);

  await select(harness, "cantu-studio");
  const after = joinedDump(harness);
  for (const marker of AIW_CONSOLE_ONLY) {
    assert.ok(!after.includes(marker), `aiw-console marker "${marker}" survived the switch to cantu-studio`);
  }
  for (const marker of CANTU_ONLY) assert.ok(after.includes(marker), `cantu-studio marker "${marker}" did not paint`);
});

test("cantu-studio -> aiw-console: nothing of the second survives either (the other direction)", async () => {
  const harness = makeHarness();
  await select(harness, "cantu-studio");
  const before = joinedDump(harness);
  for (const marker of CANTU_ONLY) assert.ok(before.includes(marker), `marker "${marker}" absent before the switch`);

  await select(harness, "aiw-console");
  const after = joinedDump(harness);
  for (const marker of CANTU_ONLY) {
    assert.ok(!after.includes(marker), `cantu-studio marker "${marker}" survived the switch to aiw-console`);
  }
  for (const marker of AIW_CONSOLE_ONLY) assert.ok(after.includes(marker), `aiw-console marker "${marker}" did not repaint`);
});

test("counts, open document and docs mode all reset across a switch — dirtied on purpose", async () => {
  const harness = makeHarness();
  await select(harness, "aiw-console");

  // Dirty every piece of per-project state the acceptance criteria name, on the FIRST project.
  const consoleNavAll = navItemCount(harness);
  harness.sandbox.setDocsVisibilityMode("primary");
  const consoleNavPrimary = navItemCount(harness);
  assert.notEqual(consoleNavPrimary, consoleNavAll, "the docs mode change had no observable effect to dirty");

  // Open a document that exists ONLY in aiw-console, so its residue would be unmistakable.
  const consoleDocs = frozenDocsIndex("aiw-console").docs;
  const openedDoc = consoleDocs.find((doc) => doc.path.startsWith("context/aiw-console/records/"));
  assert.ok(openedDoc, "no aiw-console-only document to open");
  harness.sandbox.renderSelectedDoc(openedDoc);
  await harness.flush();
  const reader = harness.element("docs-reader").innerHTML + harness.element("docs-body").innerHTML;
  assert.ok(reader.includes(openedDoc.title) || reader.includes(openedDoc.path), "the document did not open");

  await select(harness, "cantu-studio");

  // Docs mode: the dirtied mode is gone and the second project opens on the mode ITS OWN index
  // decides (O4.P13 — presence of operator_review_status). cantu-studio carries the field, so it
  // opens on "newera" and lists that subset. The three counts are distinct on this index
  // (149 registered / 60 default-visible / 46 reviewed), so the assertion cannot pass by accident
  // and it still fails if the dirtied "primary" survived the switch.
  const cantuDocs = frozenDocsIndex("cantu-studio").docs;
  const cantuPrimary = cantuDocs.filter((doc) => doc.default_visible).length;
  const cantuReviewed = cantuDocs.filter((doc) =>
    Object.prototype.hasOwnProperty.call(doc, "operator_review_status") &&
    String(doc.operator_review_status || "").trim() !== ""
  ).length;
  assert.ok(cantuDocs.length > cantuPrimary, "cantu-studio's index cannot distinguish the two modes");
  assert.ok(cantuReviewed > 0 && cantuReviewed !== cantuPrimary && cantuReviewed !== cantuDocs.length,
    "cantu-studio's index cannot distinguish the reviewed subset from the other two modes");
  assert.equal(navItemCount(harness), cantuReviewed * 2, "the docs navigation did not reset to this project's own opening mode");

  // Document: nothing of the file left open in aiw-console survives in the reader.
  const readerAfter = harness.element("docs-reader").innerHTML + harness.element("docs-body").innerHTML;
  assert.ok(!readerAfter.includes(openedDoc.path), `the document open in aiw-console (${openedDoc.path}) is still open`);
  assert.ok(!readerAfter.includes(openedDoc.title), `the title of the aiw-console document survived the switch`);

  // Counts: the diagnostics line reports cantu-studio's tree, not the 2/19/51 of aiw-console.
  const counts = harness.element("console-source-files").innerHTML;
  assert.doesNotMatch(counts, /2 objectives \/ 19 phases \/ 51 runs/);
  assert.match(counts, /7 objectives \/ 28 phases \/ 73 runs/);
});

// The vocabulary half of the same reset, moved to a pair that can still express it.
//
// It used to ride on the switch above, where it worked because cantu-studio's tree happened to
// use only `completed` and `planned` while this one also used `active`, so the active chip
// disappearing proved the vocabulary had reset. Both fixtures now hold an active run, and their
// run-status token SETS are identical — on that pair the assertion is vacuous, and pinning it
// would only pin a coincidence of two neighbours' calendars. hilo-verde's tokens (por_hacer /
// haciendo / hecho) are disjoint from this one's by construction, which is what the assertion
// needs and what a synthetic fixture is for: the switch is proved with NO token in common,
// which is strictly more than the old pair proved.
test("the vocabulary resets across a switch: no chip of the previous project's tokens survives", async () => {
  const harness = makeHarness();
  await select(harness, "aiw-console");

  const tokensOf = (snapshot) =>
    new Set(snapshot.roadmap_tree.objectives.flatMap((o) => o.phases.flatMap((p) => p.runs.map((r) => r.status))));
  const consoleTokens = tokensOf(snapshotOf("aiw-console"));
  const hiloTokens = tokensOf(JSON.parse(readFileSync(join(HILO_VERDE, ".project", "snapshot.json"), "utf8")));
  // Non-vacuity, asserted rather than assumed: the two vocabularies share nothing at all.
  assert.deepEqual([...consoleTokens].filter((token) => hiloTokens.has(token)), [],
    "the two trees share a token; this test would prove nothing");
  assert.ok(consoleTokens.has("active") && consoleTokens.has("planned"));

  const before = harness.element("run-queue-v3").innerHTML;
  assert.match(before, /v3-chip v3-chip-active/);
  assert.match(before, /v3-chip v3-chip-planned/);

  await select(harness, "hilo-verde");

  // The DATA-driven chips of the previous project are gone from the queue. Asserted on the chip
  // class, not on the word: the roadmap tree also paints a fixed four-column stat row LABELLED
  // with the four tokens, which is the renderer's own display layout, not data — the heuristic
  // limit O4.P3 recorded and O4.P7/P8 own.
  const queue = harness.element("run-queue-v3").innerHTML;
  assert.match(queue, /\S/, "the second project painted no queue at all");
  for (const token of consoleTokens) {
    assert.doesNotMatch(queue, new RegExp(`v3-chip v3-chip-${token}\\b`),
      `the "${token}" chip of the previous project survived the switch`);
  }
});

test("A -> B -> A repaints the first project identically, and B -> A -> B the second", async () => {
  const harness = makeHarness();

  await select(harness, "aiw-console");
  const consoleFirst = scrubVolatile(harness.dump());
  await select(harness, "cantu-studio");
  const cantuFirst = scrubVolatile(harness.dump());
  await select(harness, "aiw-console");
  const consoleAgain = scrubVolatile(harness.dump());
  await select(harness, "cantu-studio");
  const cantuAgain = scrubVolatile(harness.dump());

  for (const [id, value] of consoleFirst) {
    assert.equal(consoleAgain.get(id), value, `aiw-console surface ${id} differs after A -> B -> A`);
  }
  for (const [id, value] of cantuFirst) {
    assert.equal(cantuAgain.get(id), value, `cantu-studio surface ${id} differs after B -> A -> B`);
  }
});
