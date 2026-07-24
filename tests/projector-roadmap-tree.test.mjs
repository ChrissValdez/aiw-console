// Fixture-based tests for the projector's SECOND root mode (tools/projector/project.mjs).
//
// They assert that a root whose plan is a `roadmap_tree_v1` roadmap projects into the contract
// folder of context/aiw-console/CONTRATO.md — the required snapshot plus the three optional
// sources — that the derivation function of §12 matches the contract's own precedence table,
// that emission is atomic and repeatable, and above all that the mode is ADDITIVE: a root in
// the original AIW layout still detects as `aiw_objectives` and nothing is ever written into
// a `.project/` folder for it, nor into `.aiw/` for a roadmap_tree root.
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve, sep } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import {
  GENERATED_FROM,
  PROJECT_DIR,
  PROJECT_DOCS_INDEX_RELATIVE_PATH,
  PROJECT_GUARDRAILS_RELATIVE_PATH,
  PROJECT_NO_CLAIMS_RELATIVE_PATH,
  PROJECT_ROADMAP_RELATIVE_PATH,
  PROJECT_SNAPSHOT_RELATIVE_PATH,
  ROADMAP_TREE_MODEL,
  ROADMAP_TREE_SOURCE_PATH,
  SCHEMA_VERSION,
  buildDocsIndex,
  buildProjectRoadmap,
  buildRoadmapTreeSnapshot,
  deriveCollectionStatus,
  detectRootMode,
  resolveProjectFilePath,
  writeProjectFolder
} from "../tools/projector/project.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const AIW_FIXTURE = join(HERE, "fixtures", "sample-project");
const FIXED_NOW = "2026-07-24T00:00:00.000Z";

// A minimal roadmap_tree_v1 root: two objectives, three phases, four runs — one of each
// interesting status, so the derivation has something to discriminate.
const TREE = {
  schema_version: ROADMAP_TREE_MODEL,
  roadmap_id: "roadmap",
  title: "Fixture Roadmap",
  objectives: [
    {
      objective_id: "OA",
      title: "Objective A",
      phases: [
        {
          phase_id: "OA.P1",
          title: "Done phase",
          runs: [
            { run_id: "RUN-FIXTURE-ONE-001", queue_order: 1, title: "One", summary: "s", full_description: "d", status: "completed", depends_on: [] }
          ]
        },
        {
          phase_id: "OA.P2",
          title: "Running phase",
          runs: [
            { run_id: "RUN-FIXTURE-TWO-001", queue_order: 2, title: "Two", summary: "s", full_description: "d", status: "active", depends_on: ["RUN-FIXTURE-ONE-001"] }
          ]
        }
      ]
    },
    {
      objective_id: "OB",
      title: "Objective B",
      phases: [
        {
          phase_id: "OB.P1",
          title: "Started phase",
          runs: [
            { run_id: "RUN-FIXTURE-THREE-001", queue_order: 3, title: "Three", summary: "s", full_description: "d", status: "completed", depends_on: [] },
            { run_id: "RUN-FIXTURE-FOUR-001", queue_order: 4, title: "Four", summary: "s", full_description: "d", status: "planned", depends_on: [] }
          ]
        }
      ]
    }
  ]
};

function makeTreeRoot(tree = TREE) {
  const root = mkdtempSync(join(tmpdir(), "projector-tree-"));
  mkdirSync(join(root, "roadmap"), { recursive: true });
  writeFileSync(join(root, ROADMAP_TREE_SOURCE_PATH), JSON.stringify(tree, null, 2), "utf8");
  writeFileSync(join(root, "package.json"), JSON.stringify({ name: "fixture-project" }), "utf8");
  writeFileSync(join(root, "README.md"), "# Fixture Readme\n\nBody.\n", "utf8");
  mkdirSync(join(root, "context", "area", "records"), { recursive: true });
  writeFileSync(join(root, "context", "area", "records", "MEASURE.md"), "# A measurement\n", "utf8");
  mkdirSync(join(root, "governance"), { recursive: true });
  writeFileSync(
    join(root, "governance", "guardrails.json"),
    JSON.stringify({ guardrails: [{ id: "g1", rule: "A rule.", status: "ACTIVE", source_refs: ["README.md"] }] }),
    "utf8"
  );
  writeFileSync(
    join(root, "governance", "no_claims.json"),
    JSON.stringify({ claims: [{ claim: "A claim", status: "DISALLOWED", allowed_only_if: "never" }] }),
    "utf8"
  );
  return root;
}

test("a roadmap_tree_v1 root detects as roadmap_tree; an AIW root still detects as aiw_objectives", () => {
  const root = makeTreeRoot();
  try {
    assert.equal(detectRootMode(root), "roadmap_tree");
    assert.equal(detectRootMode(AIW_FIXTURE), "aiw_objectives");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("a roadmap of another model does not claim this mode", () => {
  const root = makeTreeRoot({ ...TREE, schema_version: "jame.roadmap_v3.v0.2-progress" });
  try {
    assert.equal(detectRootMode(root), "aiw_objectives");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("the snapshot carries the envelope, the whole tree, and no derived value", () => {
  const root = makeTreeRoot();
  try {
    const snapshot = buildRoadmapTreeSnapshot(root, { now: FIXED_NOW });
    assert.equal(snapshot.schema_version, SCHEMA_VERSION);
    assert.equal(snapshot.project_id, "fixture_project"); // from package.json, not from a literal
    assert.equal(snapshot.generated_at, FIXED_NOW);
    assert.equal(snapshot.generated_from, GENERATED_FROM);
    assert.equal(snapshot.operational_status, "active"); // one run is active
    assert.equal(snapshot.roadmap_tree.model, ROADMAP_TREE_MODEL);
    assert.equal(snapshot.roadmap_tree.objectives.length, 2);
    // §10.b — nothing derivable is stored: no counters, no per-level status, anywhere.
    assert.equal("counts" in snapshot.roadmap_tree, false);
    for (const objective of snapshot.roadmap_tree.objectives) {
      assert.equal("status" in objective, false);
      for (const phase of objective.phases) assert.equal("status" in phase, false);
    }
    // §6 — every source read is declared with its mtime.
    assert.ok(snapshot.sources.some((s) => s.path === "roadmap/roadmap.json" && s.mtime));
    // §7 — every emitted path resolves on disk.
    for (const source of snapshot.sources) assert.ok(existsSync(join(root, source.path)));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("taxonomy_model declares both vocabularies and the derivation the emitter actually runs", () => {
  const root = makeTreeRoot();
  try {
    const { taxonomy_model: taxonomy } = buildRoadmapTreeSnapshot(root, { now: FIXED_NOW });
    assert.equal(taxonomy.model, ROADMAP_TREE_MODEL);
    assert.deepEqual(taxonomy.vocabularies["run.status"].tokens, ["planned", "active", "blocked", "completed"]);
    assert.deepEqual(
      taxonomy.vocabularies["objective.status"].tokens,
      ["planned", "in_progress", "active", "blocked", "completed"]
    );
    assert.equal(taxonomy.vocabularies["objective.status"].stored, false);
    const rule = taxonomy.derivations.collection_status_from_runs;
    assert.deepEqual(rule.precedence.map((r) => r.token), ["active", "blocked", "completed", "in_progress", "planned"]);
    assert.equal(rule.empty_input, "malformed");
    // The declaration is executable: running it by hand reproduces the emitter's own function.
    const byDeclaration = (statuses) => {
      for (const entry of rule.precedence) {
        if (entry.quantifier === "otherwise") return entry.token;
        if (entry.quantifier === "any" && statuses.some((s) => s === entry.run_status)) return entry.token;
        if (entry.quantifier === "all" && statuses.every((s) => s === entry.run_status)) return entry.token;
      }
      return null;
    };
    for (const statuses of [["active", "completed"], ["blocked", "completed"], ["completed"], ["completed", "planned"], ["planned"]]) {
      assert.equal(byDeclaration(statuses), deriveCollectionStatus(statuses));
    }
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("the derivation follows CONTRATO §12.a precedence, and an empty collection gets no token", () => {
  assert.equal(deriveCollectionStatus(["active", "completed", "planned"]), "active");
  assert.equal(deriveCollectionStatus(["blocked", "completed"]), "blocked");
  assert.equal(deriveCollectionStatus(["completed", "completed"]), "completed");
  assert.equal(deriveCollectionStatus(["completed", "planned"]), "in_progress");
  assert.equal(deriveCollectionStatus(["planned", "planned"]), "planned");
  assert.equal(deriveCollectionStatus([]), null); // §12.b — MALFORMED, never `completed`
});

test("the docs index covers the repo's real Markdown, in the shape the reader consumes", () => {
  const root = makeTreeRoot();
  try {
    const index = buildDocsIndex(root, { now: FIXED_NOW });
    const paths = index.docs.map((doc) => doc.path);
    assert.deepEqual(paths, ["README.md", "context/area/records/MEASURE.md"]); // stable order
    assert.equal(index.docs[0].title, "Fixture Readme"); // first H1, not the filename
    assert.equal(index.docs[0].nav_tier, "primary");
    assert.equal(index.docs[0].default_visible, true);
    assert.equal(index.docs[1].nav_tier, "evidence"); // records classify by location
    assert.equal(index.docs[1].default_visible, false);
    assert.ok(index.nav_tier_model.rules.length > 0); // the file declares the rule it was built with
    for (const doc of index.docs) assert.ok(existsSync(join(root, doc.path))); // §7
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("writeProjectFolder lands exactly five files under .project/ and touches no .aiw/", () => {
  const root = makeTreeRoot();
  try {
    const result = writeProjectFolder(root, { now: FIXED_NOW });
    assert.equal(result.ok, true);
    assert.equal(result.mode, "roadmap_tree");
    assert.deepEqual(
      result.files.map((file) => file.artifact).sort(),
      ["docs_index", "guardrails", "no_claims", "roadmap", "snapshot"]
    );
    for (const relativePath of [
      PROJECT_SNAPSHOT_RELATIVE_PATH,
      PROJECT_ROADMAP_RELATIVE_PATH,
      PROJECT_DOCS_INDEX_RELATIVE_PATH,
      PROJECT_GUARDRAILS_RELATIVE_PATH,
      PROJECT_NO_CLAIMS_RELATIVE_PATH
    ]) {
      assert.ok(existsSync(join(root, relativePath)));
    }
    // The mode never creates the old delivery area, and leaves no temp file behind.
    assert.equal(existsSync(join(root, ".aiw")), false);
    const leftovers = readFileSync(join(root, PROJECT_SNAPSHOT_RELATIVE_PATH), "utf8");
    assert.ok(leftovers.endsWith("\n"));
    assert.equal(existsSync(join(root, `${PROJECT_SNAPSHOT_RELATIVE_PATH}.tmp`)), false);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

// CONTRATO §19 — the optional roadmap file (added by O4.P11). It must carry the SAME tree the
// snapshot carries, with the standard envelope, and nothing derived: one tree, two transports.
test("the optional .project/roadmap.json carries the snapshot's tree, envelope and all", () => {
  const root = makeTreeRoot();
  try {
    const roadmap = buildProjectRoadmap(root, { now: FIXED_NOW });
    const snapshot = buildRoadmapTreeSnapshot(root, { now: FIXED_NOW });

    // Same envelope discipline as every other emitted file (§4, §5, §6).
    assert.equal(roadmap.schema_version, SCHEMA_VERSION);
    assert.equal(roadmap.project_id, snapshot.project_id);
    assert.equal(roadmap.generated_at, FIXED_NOW);
    assert.equal(roadmap.generated_from, GENERATED_FROM);
    assert.deepEqual(roadmap.sources.map((source) => source.path), [ROADMAP_TREE_SOURCE_PATH.split(sep).join("/")]);

    // The tree itself, identical to the one inside the snapshot — same builder, so no drift.
    assert.equal(roadmap.model, ROADMAP_TREE_MODEL);
    assert.deepEqual(roadmap.objectives, snapshot.roadmap_tree.objectives);
    assert.equal(roadmap.roadmap_id, snapshot.roadmap_tree.roadmap_id);
    assert.equal(roadmap.title, snapshot.roadmap_tree.title);

    // §10.b/§12.c — nothing derived is stored, at any level, in this file either.
    assert.equal("counts" in roadmap, false);
    for (const objective of roadmap.objectives) {
      assert.equal("status" in objective, false);
      for (const phase of objective.phases) assert.equal("status" in phase, false);
    }

    // A root that is not a roadmap_tree root gets no roadmap file at all (§18/§20).
    assert.equal(buildProjectRoadmap(AIW_FIXTURE, { now: FIXED_NOW }), null);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("emitting twice with the same clock produces byte-identical files", () => {
  const root = makeTreeRoot();
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
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("a missing governance source is fail-soft: the file is not emitted, and nothing throws", () => {
  const root = makeTreeRoot();
  try {
    rmSync(join(root, "governance"), { recursive: true, force: true });
    const result = writeProjectFolder(root, { now: FIXED_NOW });
    assert.deepEqual(result.files.map((file) => file.artifact).sort(), ["docs_index", "roadmap", "snapshot"]);
    assert.equal(existsSync(join(root, PROJECT_GUARDRAILS_RELATIVE_PATH)), false);
    // The snapshot does not cite a file that is not there (§7).
    const snapshot = JSON.parse(readFileSync(join(root, PROJECT_SNAPSHOT_RELATIVE_PATH), "utf8"));
    assert.deepEqual(snapshot.no_claims_summary, {});
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("the resolved emission path is always inside the project root's .project/", () => {
  const root = makeTreeRoot();
  try {
    const { outPath } = resolveProjectFilePath(root, PROJECT_SNAPSHOT_RELATIVE_PATH);
    assert.ok(outPath.startsWith(resolve(root, PROJECT_DIR) + sep));
    assert.throws(() => resolveProjectFilePath(root, join("..", "escape.json")));
    assert.throws(() => resolveProjectFilePath(root, join(".aiw", "views", "snapshot.json")));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
