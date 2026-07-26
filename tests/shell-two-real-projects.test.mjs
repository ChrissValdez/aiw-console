// O4.P4 — the shell renders TWO REAL projects, each from its own emitted .project/, with
// different roadmap models, different vocabulary usage and different data — and NOTHING crosses
// between them in either direction.
//
// The synthetic fixture (hilo-verde, O4.P3) already proved the shell can execute a FOREIGN
// derivation table. What it could not prove is that a second REAL emitter, run over a real repo
// that keeps its plan somewhere else, produces something this renderer paints. That is what these
// tests are for, so both roots here are real: this repo and cantu-studio beside it.
//
// Same harness and same limits as tests/shell-switch.test.mjs: the REAL renderer inside node:vm
// over a DOM stub. Layout, CSS and real clicks stay with the operator QA pass.
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createConsoleHarness } from "./helpers/console-dom.mjs";
import { deriveCollectionStatus, snapshotSummary } from "../project-console/assets/project-shell.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const CANTU = resolve(REPO_ROOT, "..", "cantu-studio");
const RENDERER = join(REPO_ROOT, "project-console", "assets", "project-console.js");
// Both projects must have an emitted contract folder for these to mean anything.
const BOTH_EMITTED =
  existsSync(join(REPO_ROOT, ".project", "snapshot.json")) &&
  existsSync(join(CANTU, ".project", "snapshot.json"));

const ROOTS = new Map([["aiw-console", REPO_ROOT], ["cantu-studio", CANTU]]);
const snapshotOf = (root) => JSON.parse(readFileSync(join(root, ".project", "snapshot.json"), "utf8"));

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
const AIW_CONSOLE_ONLY = ["AIW Console Roadmap", "Consola global", "roadmap_tree_v1"];
const CANTU_ONLY = ["Cantu Studio Roadmap", "Asset Deduplication Layer", "Cantu Studio Web Components"];

// The renderer's docs mode is a module-local `let`, so it is observed the way the operator does:
// through how many documents the navigation lists. "all" lists the whole index; "primary" lists
// only the default-visible tier. The two numbers differ per project, which is the point.
const navItemCount = (harness) => (harness.element("docs-nav-list").innerHTML.match(/docs-nav-item/g) || []).length;

test("the two real projects declare DIFFERENT roadmap models, and neither is the other's", { skip: !BOTH_EMITTED }, () => {
  const console_ = snapshotOf(REPO_ROOT);
  const cantu = snapshotOf(CANTU);
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

test("the shell summarises BOTH by executing each snapshot's own table — no code knows either project", { skip: !BOTH_EMITTED }, () => {
  const summaries = [snapshotOf(REPO_ROOT), snapshotOf(CANTU)].map((snapshot) => snapshotSummary(snapshot));
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
  // tautology: aiw-console has an active run, cantu-studio has none.
  assert.equal(consoleSummary.operationalStatus, "active");
  assert.equal(cantuSummary.operationalStatus, "idle");
  assert.notDeepEqual(consoleSummary.objectives, cantuSummary.objectives);

  // The derivation is driven by the snapshot's table, not by this test's expectations: replay it.
  const cantu = snapshotOf(CANTU);
  cantu.roadmap_tree.objectives.forEach((objective, index) => {
    const statuses = objective.phases.flatMap((phase) => phase.runs.map((run) => run.status));
    assert.equal(cantuSummary.objectives[index].status, deriveCollectionStatus(cantu.taxonomy_model, "objective", statuses));
  });
});

test("cantu-studio renders from its own emitted folder: overview, roadmap, queue, docs, history, governance", { skip: !BOTH_EMITTED }, async () => {
  const harness = makeHarness();
  const result = await select(harness, "cantu-studio");
  assert.equal(result.ok, true);
  assert.equal(result.snapshot.project_id, "cantu_studio");

  // Roadmap + Run Queue: its own tree, its own objective titles.
  const tree = harness.element("roadmap-v3-tree").innerHTML;
  assert.match(tree, /Cantu Studio Web Components/);
  assert.match(tree, /Asset Deduplication Layer/);
  assert.doesNotMatch(tree, /Consola global/);
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

test("aiw-console still renders exactly as measured, with the second project registered beside it", { skip: !BOTH_EMITTED }, async () => {
  const harness = makeHarness();
  const result = await select(harness, "aiw-console");
  assert.equal(result.ok, true);
  assert.equal(result.snapshot.project_id, "aiw_console");
  assert.match(harness.element("roadmap-v3-tree").innerHTML, /Consola global/);
  assert.match(harness.element("console-source-files").innerHTML, /2 objectives \/ 16 phases \/ 35 runs/);
  assert.equal(harness.sandbox.document.title, "AIW Console Roadmap — Project Console");
});

test("aiw-console -> cantu-studio: nothing of the first survives on any surface", { skip: !BOTH_EMITTED }, async () => {
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

test("cantu-studio -> aiw-console: nothing of the second survives either (the other direction)", { skip: !BOTH_EMITTED }, async () => {
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

test("counts, open document, docs mode and vocabulary all reset across a switch — dirtied on purpose", { skip: !BOTH_EMITTED }, async () => {
  const harness = makeHarness();
  await select(harness, "aiw-console");

  // Dirty every piece of per-project state the acceptance criteria name, on the FIRST project.
  const consoleNavAll = navItemCount(harness);
  harness.sandbox.setDocsVisibilityMode("primary");
  const consoleNavPrimary = navItemCount(harness);
  assert.notEqual(consoleNavPrimary, consoleNavAll, "the docs mode change had no observable effect to dirty");

  // Open a document that exists ONLY in aiw-console, so its residue would be unmistakable.
  const consoleDocs = JSON.parse(readFileSync(join(REPO_ROOT, ".project", "docs_index.json"), "utf8")).docs;
  const openedDoc = consoleDocs.find((doc) => doc.path.startsWith("context/aiw-console/records/"));
  assert.ok(openedDoc, "no aiw-console-only document to open");
  harness.sandbox.renderSelectedDoc(openedDoc);
  await harness.flush();
  const reader = harness.element("docs-reader").innerHTML + harness.element("docs-body").innerHTML;
  assert.ok(reader.includes(openedDoc.title) || reader.includes(openedDoc.path), "the document did not open");

  await select(harness, "cantu-studio");

  // Docs mode: back to the default. Observed through the navigation — cantu-studio's index is
  // listed WHOLE, which the dirtied "primary" mode could not produce.
  const cantuDocs = JSON.parse(readFileSync(join(CANTU, ".project", "docs_index.json"), "utf8")).docs;
  const cantuPrimary = cantuDocs.filter((doc) => doc.default_visible).length;
  assert.ok(cantuDocs.length > cantuPrimary, "cantu-studio's index cannot distinguish the two modes");
  assert.equal(navItemCount(harness), cantuDocs.length * 2, "the docs navigation did not reset to the full index");

  // Document: nothing of the file left open in aiw-console survives in the reader.
  const readerAfter = harness.element("docs-reader").innerHTML + harness.element("docs-body").innerHTML;
  assert.ok(!readerAfter.includes(openedDoc.path), `the document open in aiw-console (${openedDoc.path}) is still open`);
  assert.ok(!readerAfter.includes(openedDoc.title), `the title of the aiw-console document survived the switch`);

  // Counts: the diagnostics line reports cantu-studio's tree, not the 2/16/35 of aiw-console.
  const counts = harness.element("console-source-files").innerHTML;
  assert.doesNotMatch(counts, /2 objectives \/ 16 phases \/ 35 runs/);
  assert.match(counts, /7 objectives \/ 28 phases \/ 53 runs/);

  // Vocabulary: the two trees genuinely use different tokens, and only cantu-studio's paint now.
  const tokensOf = (snapshot) =>
    new Set(snapshot.roadmap_tree.objectives.flatMap((o) => o.phases.flatMap((p) => p.runs.map((r) => r.status))));
  const cantuTokens = tokensOf(snapshotOf(CANTU));
  const consoleOnly = [...tokensOf(snapshotOf(REPO_ROOT))].filter((token) => !cantuTokens.has(token));
  assert.deepEqual([...cantuTokens].sort(), ["completed", "planned"]);
  assert.deepEqual(consoleOnly, ["active"], "the two trees use the same tokens; this assertion would be vacuous");

  // The DATA-driven chip for the token only aiw-console uses is gone from the queue. Asserted on
  // the chip class, not on the word: the roadmap tree also paints a fixed four-column stat row
  // LABELLED with the four tokens (its "Active" column reads 0 here), which is the renderer's own
  // display layout, not data — the heuristic limit O4.P3 recorded and O4.P7/P8 own.
  const queue = harness.element("run-queue-v3").innerHTML;
  assert.match(queue, /v3-chip v3-chip-planned/);
  assert.doesNotMatch(queue, /v3-chip v3-chip-active/, "the active-run chip of the previous project survived");
});

test("A -> B -> A repaints the first project identically, and B -> A -> B the second", { skip: !BOTH_EMITTED }, async () => {
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
