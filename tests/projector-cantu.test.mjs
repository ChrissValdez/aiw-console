// O4.P4 — the projector emits for a SECOND project in a layout of its own (cantu-studio), and the
// two root modes it already had keep behaving exactly as before.
//
// What these tests defend, in one line each:
//   - the mode is claimed by the SHAPE of the tree, never by the model string it declares;
//   - the inputs are found through a LAYOUT, so a project that keeps its plan somewhere else is
//     served without a branch of its own;
//   - a tree that names itself keeps its name (§10.c) — the emitter republishes, never relabels;
//   - mode 1 does not flip into mode 2 after its own startup projection has run;
//   - every run-status token in a real emitted tree is a token the emitted vocabulary declares.
//
// The tests that touch cantu-studio read a FROZEN fixture of its source layout, never the live
// sibling repository (see the CANTU constant below). They are read-only either way: they build in
// memory (buildX) and never call writeProjectFolder against it. The write path is exercised on
// temp fixtures only.
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve, sep } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import {
  PROJECT_DOCS_INDEX_RELATIVE_PATH,
  PROJECT_GIT_HISTORY_RELATIVE_PATH,
  PROJECT_GUARDRAILS_RELATIVE_PATH,
  PROJECT_NO_CLAIMS_RELATIVE_PATH,
  PROJECT_ROADMAP_RELATIVE_PATH,
  PROJECT_SNAPSHOT_RELATIVE_PATH,
  ROADMAP_TREE_MODEL,
  ROOT_LAYOUTS,
  buildDocsIndex,
  buildGuardrails,
  buildNoClaims,
  buildProjectRoadmap,
  buildRoadmap,
  buildRoadmapTreeSnapshot,
  declaredRoadmapModel,
  detectRootLayout,
  detectRootMode,
  flattenRoadmapTree,
  hasRoadmapTreeShape,
  resolveProjectFilePath,
  writeProjectFolder
} from "../tools/projector/project.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const AIW_FIXTURE = join(HERE, "fixtures", "sample-project");
// THE SECOND PROJECT, FROZEN. These tests used to point at `../cantu-studio` and read that
// repository's live `.aiw/` — its roadmap, its governance, its curated docs index. #40 froze the
// DERIVED side of the two neighbours (their `.project/` folders) for the reason written at the
// top of tests/helpers/neighbours.mjs: a suite that asserts against a live neighbour cannot
// arbitrate a change, because a real regression is indistinguishable from the neighbour having
// moved. The five tests below were the SOURCE side, and they are frozen here on the same terms.
//
// The fixture carries the source layout the projector reads — `.aiw/roadmap/roadmap.json` (the
// real canonical, byte-identical to the frozen `canonical/roadmap.json`), `.aiw/guardrails/`, and
// a curated `.aiw/docs/docs_index.json` — beside the `.project/` folder #40 already froze. Its
// docs corpus is REDUCED: six curated documents drawn verbatim from the head of the real
// curation, and two Markdown files the curation does not select, so "the scan finds more than
// the curation selects" is still true of it. Every assertion below is about the RELATIONSHIP
// between the curation and what is transported, which a reduced corpus preserves exactly.
//
// FROZEN ON 2026-07-30. Refreshing it is a deliberate act; no test regenerates it, and none may
// read the live neighbour to build it.
const CANTU = join(HERE, "fixtures", "neighbours", "cantu-studio");
const FIXED_NOW = "2026-07-25T00:00:00.000Z";

// ---------------------------------------------------------------------------
// The gate: SHAPE, not model string.
// ---------------------------------------------------------------------------

const RUN = { run_id: "R1", queue_order: 1, title: "t", summary: "s", full_description: "d", status: "planned", depends_on: [] };
const SHAPED = { objectives: [{ objective_id: "O1", title: "O", phases: [{ phase_id: "O1.P1", title: "P", runs: [RUN] }] }] };

test("the shape gate accepts a conforming tree whatever model it declares, and only a conforming one", () => {
  assert.equal(hasRoadmapTreeShape({ ...SHAPED, schema_version: ROADMAP_TREE_MODEL }), true);
  // The exact case this phase exists for: same three levels, a name of the project's own.
  assert.equal(hasRoadmapTreeShape({ ...SHAPED, schema_version: "some.other.model.v9" }), true);
  assert.equal(hasRoadmapTreeShape({ ...SHAPED }), true); // declaring no model at all is not a defect
  assert.equal(hasRoadmapTreeShape({ objectives: [] }), true); // vacuously conforming, as before

  // Non-conforming: each missing piece is a piece the emitter would have had to invent.
  assert.equal(hasRoadmapTreeShape(null), false);
  assert.equal(hasRoadmapTreeShape({ objectives: "no" }), false);
  assert.equal(hasRoadmapTreeShape({ objectives: [{ title: "no id", phases: [] }] }), false);
  assert.equal(hasRoadmapTreeShape({ objectives: [{ objective_id: "O1", phases: [{ title: "no id", runs: [] }] }] }), false);
  assert.equal(
    hasRoadmapTreeShape({ objectives: [{ objective_id: "O1", phases: [{ phase_id: "P", runs: [{ run_id: "R" }] }] }] }),
    false // a run with no status: the derivations would have nothing to read
  );
});

test("a tree that names itself keeps its name; a tree that names nothing is credited with this contract's", () => {
  assert.equal(declaredRoadmapModel({ schema_version: "some.other.model.v9" }), "some.other.model.v9");
  assert.equal(declaredRoadmapModel({}), ROADMAP_TREE_MODEL);
});

// ---------------------------------------------------------------------------
// ADDITIVITY — the regression this generalization could plausibly have caused.
//
// Mode 1's own startup projection writes a roadmap view into .aiw/roadmap/roadmap.json, which is
// exactly the path the second layout probes. That view is objectives -> phases -> runs too, so a
// gate that only counted levels would have flipped every projected AIW root into mode 2 on its
// next run. The identification fields (objective_id / phase_id) are what keep it in mode 1.
// ---------------------------------------------------------------------------

test("an AIW root that has ALREADY been projected stays in mode 1 (its own roadmap view must not claim mode 2)", () => {
  const root = mkdtempSync(join(tmpdir(), "projector-projected-aiw-"));
  try {
    mkdirSync(join(root, "objectives", "pending"), { recursive: true });
    writeFileSync(join(root, "objectives", "pending", "OBJ-001.md"), "# Project\n\n# Objective\n\nDo the thing.\n", "utf8");
    writeFileSync(join(root, "config.json"), JSON.stringify({ project_id: "some_aiw_project" }), "utf8");
    assert.equal(detectRootMode(root), "aiw_objectives");

    // Exactly what the startup projection delivers for the frozen UI.
    mkdirSync(join(root, ".aiw", "roadmap"), { recursive: true });
    const view = buildRoadmap(root, { now: FIXED_NOW });
    writeFileSync(join(root, ".aiw", "roadmap", "roadmap.json"), JSON.stringify(view, null, 2), "utf8");

    // It IS three levels of objectives/phases/runs — and it still does not claim the mode.
    assert.equal(Array.isArray(view.objectives[0].phases[0].runs), true);
    assert.equal(hasRoadmapTreeShape(view), false);
    assert.equal(detectRootMode(root), "aiw_objectives");
    assert.equal(detectRootLayout(root), null);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("the layouts are shapes of root, not projects: no layout path names a project", () => {
  const identity = /(jame|cantu|aiw-console|aiw_console|hilo)/i;
  for (const layout of ROOT_LAYOUTS) {
    for (const [key, value] of Object.entries(layout)) {
      assert.doesNotMatch(String(value), identity, `layout ${layout.layout}.${key} carries project identity: ${value}`);
      assert.doesNotMatch(String(value), /^[A-Za-z]:|^\//, `layout ${layout.layout}.${key} is an absolute path: ${value}`);
    }
  }
});

// ---------------------------------------------------------------------------
// The second layout, on a temp fixture (the write path is never aimed at a real repo here).
// ---------------------------------------------------------------------------

function makeProjectLocalAiwRoot() {
  const root = mkdtempSync(join(tmpdir(), "projector-aiw-local-"));
  const tree = {
    schema_version: "some.vendor.roadmap.v0.2",
    roadmap_id: "roadmap",
    title: "Second Layout Roadmap",
    objectives: [
      {
        objective_id: "OA",
        title: "Objective A",
        phases: [
          { phase_id: "OA.P1", title: "Phase", runs: [
            { run_id: "RUN-SECOND-ONE-001", queue_order: 1, title: "One", summary: "s", full_description: "d", status: "completed", depends_on: [] },
            { run_id: "RUN-SECOND-TWO-001", queue_order: 2, title: "Two", summary: "s", full_description: "d", status: "planned", depends_on: [] }
          ] }
        ]
      }
    ]
  };
  mkdirSync(join(root, ".aiw", "roadmap"), { recursive: true });
  mkdirSync(join(root, ".aiw", "guardrails"), { recursive: true });
  writeFileSync(join(root, ".aiw", "roadmap", "roadmap.json"), JSON.stringify(tree, null, 2), "utf8");
  writeFileSync(
    join(root, ".aiw", "guardrails", "project_guardrails.json"),
    JSON.stringify({ guardrails: [{ id: "g1", rule: "A rule.", status: "ACTIVE" }] }),
    "utf8"
  );
  writeFileSync(
    join(root, ".aiw", "guardrails", "no_claims.json"),
    JSON.stringify({ claims: [{ claim: "A claim", status: "DISALLOWED" }] }),
    "utf8"
  );
  writeFileSync(join(root, "README.md"), "# Second Layout Readme\n", "utf8");
  return root;
}

test("a project-local-AIW root is claimed by the second layout, and its governance is read from that same layout", () => {
  const root = makeProjectLocalAiwRoot();
  try {
    const layout = detectRootLayout(root);
    assert.equal(layout.layout, "project_local_aiw");
    assert.equal(detectRootMode(root), "roadmap_tree");

    const snapshot = buildRoadmapTreeSnapshot(root, { now: FIXED_NOW });
    // Identity from the repo, not from the layout, and not from a literal.
    assert.match(snapshot.project_id, /^projector_aiw_local/);
    // §10.c — the tree's own model, carried, not this contract's name substituted for it.
    assert.equal(snapshot.roadmap_tree.model, "some.vendor.roadmap.v0.2");
    assert.equal(snapshot.taxonomy_model.model, "some.vendor.roadmap.v0.2");
    // §6/§7 — the source declared is the one actually read, and it resolves.
    assert.deepEqual(snapshot.sources.map((s) => s.path), [".aiw/roadmap/roadmap.json"]);
    assert.ok(existsSync(join(root, snapshot.sources[0].path)));
    // The governance bundle came from the SAME layout.
    assert.equal(buildGuardrails(root, { now: FIXED_NOW }).guardrails.length, 1);
    assert.equal(buildNoClaims(root, { now: FIXED_NOW }).claims.length, 1);
    // .aiw/ is the delivery area of that layout and is never scanned for documentation.
    assert.deepEqual(buildDocsIndex(root, { now: FIXED_NOW }).docs.map((d) => d.path), ["README.md"]);

    // Emission writes into .project/ and nowhere else — the .aiw/ it READ is left alone.
    const before = readFileSync(join(root, ".aiw", "roadmap", "roadmap.json"), "utf8");
    const result = writeProjectFolder(root, { now: FIXED_NOW });
    assert.equal(result.layout, "project_local_aiw");
    assert.equal(result.roadmap_model, "some.vendor.roadmap.v0.2");
    assert.equal(readFileSync(join(root, ".aiw", "roadmap", "roadmap.json"), "utf8"), before);
    assert.equal(existsSync(join(root, ".aiw", "views")), false);
    // The path guard holds for this root too: nothing may be written outside its own .project/.
    assert.throws(() => resolveProjectFilePath(root, join("..", "escape.json")));
    assert.throws(() => resolveProjectFilePath(root, join(".aiw", "roadmap", "roadmap.json")));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("the FIRST matching layout wins, as a whole bundle — a root is never read half in one and half in another", () => {
  const root = makeProjectLocalAiwRoot();
  try {
    // Give the same root a repo-root plan as well. The earlier layout claims it, governance included.
    mkdirSync(join(root, "roadmap"), { recursive: true });
    mkdirSync(join(root, "governance"), { recursive: true });
    writeFileSync(join(root, "roadmap", "roadmap.json"), JSON.stringify({
      schema_version: ROADMAP_TREE_MODEL,
      title: "Repo Root Roadmap",
      objectives: [{ objective_id: "OZ", title: "Z", phases: [{ phase_id: "OZ.P1", title: "P", runs: [
        { run_id: "RUN-REPO-ROOT-001", queue_order: 1, title: "R", summary: "s", full_description: "d", status: "active", depends_on: [] }
      ] }] }]
    }), "utf8");
    writeFileSync(join(root, "governance", "guardrails.json"), JSON.stringify({ guardrails: [{ id: "a" }, { id: "b" }] }), "utf8");

    assert.equal(detectRootLayout(root).layout, "repo_root");
    const snapshot = buildRoadmapTreeSnapshot(root, { now: FIXED_NOW });
    assert.equal(snapshot.roadmap_tree.title, "Repo Root Roadmap");
    assert.deepEqual(snapshot.sources.map((s) => s.path), ["roadmap/roadmap.json"]);
    // Governance follows the winning layout: 2 entries (repo_root), not the 1 of the other bundle.
    assert.equal(buildGuardrails(root, { now: FIXED_NOW }).guardrails.length, 2);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

// ---------------------------------------------------------------------------
// The real second project. Read-only assertions against what was emitted for it.
// ---------------------------------------------------------------------------

test("cantu-studio: the layout applied is decided by the root's shape, and its tree keeps its own model", () => {
  const layout = detectRootLayout(CANTU);
  assert.equal(layout.layout, "project_local_aiw");
  assert.equal(detectRootMode(CANTU), "roadmap_tree");
  // The declared model is NOT one this emitter knows by name — that is the whole point.
  assert.notEqual(declaredRoadmapModel(layout.tree), ROADMAP_TREE_MODEL);

  const snapshot = buildRoadmapTreeSnapshot(CANTU, { now: FIXED_NOW });
  // Its own identity, taken from its own root — not this repo's.
  assert.equal(snapshot.project_id, "cantu_studio");
  assert.notEqual(snapshot.project_id, "aiw_console");
  assert.notEqual(snapshot.project_id, "aiw");
  assert.equal(snapshot.roadmap_tree.model, declaredRoadmapModel(layout.tree));
  assert.equal(snapshot.taxonomy_model.model, snapshot.roadmap_tree.model);
  // Its own tree, whole, with nothing derived stored (§10.b) at any level.
  assert.equal("counts" in snapshot.roadmap_tree, false);
  for (const objective of snapshot.roadmap_tree.objectives) {
    assert.equal("status" in objective, false);
    for (const phase of objective.phases) assert.equal("status" in phase, false);
  }
  // §7 — every source declared resolves on disk.
  for (const source of snapshot.sources) assert.ok(existsSync(join(CANTU, source.path)));
});

test("cantu-studio: every run-status token in the real tree is declared by the emitted vocabulary", () => {
  for (const root of [CANTU, REPO_ROOT]) {
    const snapshot = buildRoadmapTreeSnapshot(root, { now: FIXED_NOW });
    const declared = new Set(snapshot.taxonomy_model.vocabularies["run.status"].tokens);
    const used = new Set(flattenRoadmapTree(snapshot.roadmap_tree).map(({ run }) => run.status));
    for (const token of used) {
      assert.ok(declared.has(token), `${snapshot.project_id}: run status "${token}" is used but not declared`);
    }
    assert.ok(used.size > 0);
  }
});

// REPLACES the O4.P4 test "the docs index lists ONLY Markdown of its own repo". That test asserted
// the SCAN — `.md` only, sorted by path, no field this emitter cannot derive — which was the right
// assertion while the scan was the only behaviour. O4.P5 inverts it ON PURPOSE for a project that
// curated its own index: the curation's selection travels, and it selects non-Markdown files, keeps
// its own order, and carries fields no emitter could derive. Leaving the old test would have been
// leaving a lock on the door this phase opened. What it defended that is still true — every path
// resolves, no path escapes the repo, no foreign governance context leaks in — is asserted below,
// and what it defended about the SCAN is asserted on the root that still scans, in the test after.
test("cantu-studio: the docs index TRANSPORTS its curated index — same selection, same order", () => {
  const curated = JSON.parse(readFileSync(join(CANTU, ".aiw", "docs", "docs_index.json"), "utf8"));
  const index = buildDocsIndex(CANTU, { now: FIXED_NOW });

  // The decision was made by the layout's path, and the emitted file says so.
  assert.equal(index.docs_source.mode, "transported");
  assert.equal(index.docs_source.curated_index, ".aiw/docs/docs_index.json");

  // The count is the curation's, not the corpus's. This is the whole point of the phase: the
  // scan finds every .md in the repo, which is several times the number the project curated.
  assert.equal(index.docs.length, curated.docs.length);
  assert.deepEqual(index.docs.map((d) => d.path), curated.docs.map((d) => d.path));
  assert.deepEqual(index.docs.map((d) => d.title), curated.docs.map((d) => d.title));
  assert.deepEqual(index.docs.map((d) => d.ia_bucket), curated.docs.map((d) => d.ia_bucket));
  assert.deepEqual(index.docs.map((d) => d.nav_tier), curated.docs.map((d) => d.nav_tier));
  // Freshness is the curation's own value, whatever kind of value it is — not an mtime written
  // over it. The mtimes are still recorded, in `sources`.
  assert.deepEqual(index.docs.map((d) => d.freshness), curated.docs.map((d) => d.freshness));

  for (const doc of index.docs) {
    // The inherited constraint of Cantu's own validator: every doc.path must exist on disk. Under
    // transport this is enforced by the emitter too — an entry that does not resolve is omitted.
    assert.ok(existsSync(join(CANTU, doc.path)), `indexed doc does not exist: ${doc.path}`);
    assert.ok(!doc.path.startsWith("../") && !doc.path.includes(":"), `doc escapes the repo: ${doc.path}`);
    // The centralized governance context of the OTHER repo is still not duplicated here.
    assert.ok(!doc.path.startsWith("context/"), `foreign governance context leaked in: ${doc.path}`);
  }
  // Every source cited resolves: the curated index itself, then one per transported document.
  assert.equal(index.sources.length, index.docs.length + 1);
  for (const source of index.sources) assert.ok(existsSync(join(CANTU, source.path)));
  // Nothing was dropped in silence: what did not travel is counted and named.
  assert.equal(index.docs_source.curated_entries - index.docs_source.transported, index.docs_source.unresolved.length);
});

test("aiw-console: with no curated index to transport, the docs index is still SCANNED", () => {
  const index = buildDocsIndex(REPO_ROOT, { now: FIXED_NOW });
  // The backup path, unchanged: no transport block, and the file declares the path rule it was
  // built with instead of a curation's model.
  assert.equal("docs_source" in index, false);
  assert.ok(index.nav_tier_model.rules.length > 0);
  assert.equal(index.nav_tier_model.derived_by, "repo_path_prefix");
  assert.equal(detectRootLayout(REPO_ROOT).paths.docs_index, join("docs", "docs_index.json"));
  assert.equal(existsSync(join(REPO_ROOT, "docs", "docs_index.json")), false, "this root now has a curated index; the scan assertions below no longer describe it");

  assert.ok(index.docs.length > 0);
  for (const doc of index.docs) {
    assert.ok(existsSync(join(REPO_ROOT, doc.path)), `indexed doc does not exist: ${doc.path}`);
    assert.ok(doc.path.toLowerCase().endsWith(".md"));
    // Fields the emitter cannot honestly derive stay omitted, never invented (§20). This is the
    // doctrine the replaced cantu test defended; it belongs to the SCAN, so it is asserted here.
    assert.equal("operator_review_status" in doc, false);
    assert.equal("canonicality" in doc, false);
  }
  // The order is stable and the tiers come from the declared rule, not from a curated list.
  assert.deepEqual(index.docs.map((d) => d.path), [...index.docs.map((d) => d.path)].sort());
});

test("cantu-studio: the emitted contract folder is on disk, complete, and parses", () => {
  const emitted = [
    PROJECT_SNAPSHOT_RELATIVE_PATH,
    PROJECT_ROADMAP_RELATIVE_PATH,
    PROJECT_DOCS_INDEX_RELATIVE_PATH,
    PROJECT_GUARDRAILS_RELATIVE_PATH,
    PROJECT_NO_CLAIMS_RELATIVE_PATH,
    PROJECT_GIT_HISTORY_RELATIVE_PATH
  ];
  for (const relativePath of emitted) {
    const abs = join(CANTU, relativePath);
    assert.ok(existsSync(abs), `not emitted: ${relativePath}`);
    const parsed = JSON.parse(readFileSync(abs, "utf8"));
    assert.equal(parsed.project_id, "cantu_studio", `${relativePath} carries the wrong project_id`);
    assert.ok(Array.isArray(parsed.sources));
    assert.equal(existsSync(`${abs}.tmp`), false, `temp file left behind for ${relativePath}`);
  }
  // The nine deferred sources are NOT stubbed, for this project either — even though it has them
  // on disk under its own .aiw/. An announced absence, never an invented file (§20).
  for (const notEmitted of ["project.json", "state", "ledgers", "guardrails"]) {
    assert.equal(existsSync(join(CANTU, ".project", notEmitted)), false, `deferred source was stubbed: ${notEmitted}`);
  }
});

test("cantu-studio: the optional roadmap file carries the same tree the snapshot carries", () => {
  const roadmap = buildProjectRoadmap(CANTU, { now: FIXED_NOW });
  const snapshot = buildRoadmapTreeSnapshot(CANTU, { now: FIXED_NOW });
  assert.equal(roadmap.model, snapshot.roadmap_tree.model);
  assert.deepEqual(roadmap.objectives, snapshot.roadmap_tree.objectives);
  assert.equal(roadmap.project_id, snapshot.project_id);
});

test("the AIW fixture root is untouched by all of this: still mode 1, still no .project/", () => {
  assert.equal(detectRootMode(AIW_FIXTURE), "aiw_objectives");
  assert.equal(detectRootLayout(AIW_FIXTURE), null);
  assert.equal(buildProjectRoadmap(AIW_FIXTURE, { now: FIXED_NOW }), null);
  assert.equal(existsSync(join(AIW_FIXTURE, ".project")), false);
  assert.throws(() => buildRoadmapTreeSnapshot(AIW_FIXTURE, { now: FIXED_NOW }));
});

test("emitting twice with the same clock is byte-identical, on the second layout too", () => {
  const root = makeProjectLocalAiwRoot();
  try {
    const emitted = [
      PROJECT_SNAPSHOT_RELATIVE_PATH,
      PROJECT_ROADMAP_RELATIVE_PATH,
      PROJECT_DOCS_INDEX_RELATIVE_PATH,
      PROJECT_GUARDRAILS_RELATIVE_PATH,
      PROJECT_NO_CLAIMS_RELATIVE_PATH
    ];
    writeProjectFolder(root, { now: FIXED_NOW });
    const first = emitted.map((path) => readFileSync(join(root, path), "utf8"));
    writeProjectFolder(root, { now: FIXED_NOW });
    const second = emitted.map((path) => readFileSync(join(root, path), "utf8"));
    assert.deepEqual(second, first);
    for (const path of emitted) assert.equal(existsSync(join(root, `${path}.tmp`)), false);
    // And every emitted file really is inside this root's .project/.
    for (const path of emitted) {
      assert.ok(resolve(root, path).startsWith(resolve(root, ".project") + sep));
    }
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
