// Active-project switching with ZERO cross-project state, and per-surface degradation
// (§20), exercised against the REAL renderer: project-console.js runs inside node:vm on a
// minimal DOM stub (tests/helpers/console-dom.mjs), fetching from the same virtual
// /projects/<key>/ layout the read-only server exposes. What a browser adds on top of this
// (layout, CSS, real clicks) is covered by the operator QA pass recorded in the run record.
import test from "node:test";
import assert from "node:assert/strict";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createConsoleHarness } from "./helpers/console-dom.mjs";
import { AIW_CONSOLE_FIXTURE } from "./helpers/neighbours.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const RENDERER = join(REPO_ROOT, "project-console", "assets", "project-console.js");

// `aiw-console` is the FROZEN emitted folder, not this repository's live one: the counts below
// are properties of that fixture, and asserting them against the working tree only measured how
// recently the cabin closed a run. See tests/helpers/neighbours.mjs.
const ROOTS = new Map([
  ["aiw-console", AIW_CONSOLE_FIXTURE],
  ["hilo-verde", join(REPO_ROOT, "tests", "fixtures", "multi", "hilo-verde")],
  ["roto", join(REPO_ROOT, "tests", "fixtures", "multi", "roto")],
  ["vacio", join(REPO_ROOT, "tests", "fixtures", "multi", "vacio")]
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

// Relative times in the History list move with the wall clock; scrub them so an A -> B -> A
// comparison cannot flake across a minute boundary.
function scrubVolatile(dump) {
  const out = new Map();
  for (const [id, value] of dump) {
    out.set(id, String(value).replace(/\b\d+\s*(?:s|m|h|d)\s+ago\b/gi, "AGO").replace(/\bjust now\b/gi, "AGO"));
  }
  return out;
}

function joinedDump(harness) {
  return Array.from(harness.dump().values()).join("\n----\n");
}

test("the renderer paints the frozen aiw_console folder through the shell hooks (2 objectives, 19 phases, 51 runs)", async () => {
  const harness = makeHarness();
  const result = await select(harness, "aiw-console");
  assert.equal(result.ok, true);
  assert.equal(result.snapshot.project_id, "aiw_console");
  const tree = harness.element("roadmap-v3-tree").innerHTML;
  assert.match(tree, /Project Console/);
  assert.match(tree, /Global Console/);
  const consoleFiles = harness.element("console-source-files").innerHTML;
  assert.match(consoleFiles, /2 objectives \/ 19 phases \/ 51 runs/);
  const docsNav = harness.element("docs-nav-list").innerHTML;
  assert.match(docsNav, /docs-nav-item/);
  const history = harness.element("history-list").innerHTML;
  assert.doesNotMatch(history, /Commit history unavailable/);
  assert.equal(harness.sandbox.document.title, "AIW Console Roadmap — Project Console");
});

test("switching to the synthetic project leaves NOTHING of the previous one on any surface", async () => {
  const harness = makeHarness();
  await select(harness, "aiw-console");
  const before = joinedDump(harness);
  assert.match(before, /RUN-CANTU-PROJECT-CONSOLE-LATENT-DEFECTS-001/);
  assert.match(before, /AIW Console Roadmap/);

  await select(harness, "hilo-verde");
  const after = joinedDump(harness);

  // Markers of the previous project: its id, its run-id prefixes, its objective titles, its
  // doc titles. None may survive anywhere the renderer paints.
  for (const marker of ["aiw_console", "RUN-CANTU-", "RUN-JAME-", "RUN-CONSOLE-", "Global Console", "AIW Console Roadmap"]) {
    assert.ok(!after.includes(marker), `previous-project marker "${marker}" survived the switch`);
  }
  // The fixture's own data is what paints now, with ITS vocabulary verbatim.
  assert.match(after, /RUN-HILO-URDIMBRE-002/);
  assert.match(after, /haciendo/);
  assert.match(after, /Telar de Hilo Verde/);
  assert.equal(harness.sandbox.document.title, "Telar de Hilo Verde — Project Console");
  // Doc bodies come from the fixture's OWN repo root through its virtual base.
  assert.match(harness.element("docs-body").innerHTML, /telar/i);
});

test("switching back re-renders the first project identically (no residue in either direction)", async () => {
  const harness = makeHarness();
  await select(harness, "aiw-console");
  const first = scrubVolatile(harness.dump());
  await select(harness, "hilo-verde");
  await select(harness, "aiw-console");
  const second = scrubVolatile(harness.dump());
  for (const [id, value] of first) {
    assert.equal(second.get(id), value, `surface ${id} differs after A -> B -> A`);
  }
});

test("a project with a corrupt snapshot degrades per §20 and does not break the others", async () => {
  const harness = makeHarness();
  const broken = await select(harness, "roto");
  assert.equal(broken.ok, false);
  assert.equal(broken.reason, "invalid");
  const notice = harness.element("load-notice");
  assert.equal(notice.hidden, false);
  assert.match(notice.innerHTML, /projects\/roto\/\.project\/snapshot\.json/);
  // Every project surface states the absence naming the file — no stale pixels, no blank lie.
  for (const id of ["project-overview", "run-queue-v3", "roadmap-v3-tree", "history-list", "docs-nav-list", "review-policy"]) {
    assert.match(harness.element(id).innerHTML, /projects\/roto\/\.project\/snapshot\.json/, `surface ${id} does not announce the absent snapshot`);
  }
  // And the shell can still open a healthy project afterwards.
  const healthy = await select(harness, "hilo-verde");
  assert.equal(healthy.ok, true);
  assert.doesNotMatch(harness.element("roadmap-v3-tree").innerHTML, /roto/);
});

test("a project with no .project/ at all reports missing (the real case of cantu-studio and aiw today)", async () => {
  const harness = makeHarness();
  const result = await select(harness, "vacio");
  assert.equal(result.ok, false);
  assert.equal(result.reason, "missing");
  assert.match(harness.element("load-notice").innerHTML, /projects\/vacio\/\.project\/snapshot\.json/);
});

test("§20 per surface: the fixture has no git_history.json and History says so BY FILE, in the view", async () => {
  const harness = makeHarness();
  await select(harness, "hilo-verde");
  const history = harness.element("history-list").innerHTML;
  assert.match(history, /Commit history unavailable/);
  assert.match(history, /projects\/hilo-verde\/\.project\/git_history\.json/);
});

test("§20 per surface: missing roadmap.json is announced by file on Overview and both Roadmap subviews", async () => {
  const harness = makeHarness();
  await select(harness, "aiw-console");
  // Re-render the roadmap-fed surfaces with the roadmap source removed: same renderer,
  // same appData shape, roadmapV3 absent.
  const result = await select(harness, "hilo-verde");
  assert.equal(result.ok, true);
  harness.sandbox.renderAll({ ...harnessDataWithoutRoadmap(harness) });
  for (const id of ["project-overview", "run-queue-v3", "roadmap-v3-tree"]) {
    const html = harness.element(id).innerHTML;
    assert.match(html, /projects\/hilo-verde\/\.project\/roadmap\.json/, `surface ${id} does not name the file`);
  }
});

function harnessDataWithoutRoadmap(harness) {
  // Rebuild the last-loaded data object minus the roadmap source, through the renderer's own
  // loader shape: snapshot present, roadmapV3 null.
  const snapshot = JSON.parse(JSON.stringify(harness.sandbox.document ? {} : {}));
  return {
    snapshot: { project_id: "hilo_verde" },
    project: null, projectStatus: null, componentStatus: null,
    roadmapV3: null,
    events: [], changeLedger: [], gitProvenance: [], humanQa: [], aiReviews: [],
    docsIndex: null, guardrails: null, noClaims: null, memory: [], gitHistory: null
  };
}

test("§20 per surface: missing docs index and governance files are announced in their own views", async () => {
  const harness = makeHarness();
  await select(harness, "hilo-verde");
  harness.sandbox.renderAll(harnessDataWithoutRoadmap(harness));
  assert.match(harness.element("docs-nav-list").innerHTML, /Docs index unavailable/);
  assert.match(harness.element("docs-nav-list").innerHTML, /projects\/hilo-verde\/\.project\/docs_index\.json/);
  assert.match(harness.element("project-guardrails").innerHTML, /projects\/hilo-verde\/\.project\/guardrails\.json/);
  assert.match(harness.element("no-claims").innerHTML, /projects\/hilo-verde\/\.project\/no_claims\.json/);
});

test("governance distinguishes an ABSENT file from a file that loaded with an empty list", async () => {
  const harness = makeHarness();
  await select(harness, "hilo-verde");
  const data = harnessDataWithoutRoadmap(harness);
  data.guardrails = { guardrails: [] };
  harness.sandbox.renderAll(data);
  const html = harness.element("project-guardrails").innerHTML;
  assert.doesNotMatch(html, /could not be loaded/);
  assert.match(html, /No records available from local state/);
});
