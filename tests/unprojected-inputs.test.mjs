// THE DECLARED OMISSION (RUN-CONSOLE-PROJECTOR-CASE-BANKS-001).
//
// The projector reads some of `objectives/` and, depending on the root's mode, none of it. What
// it did NOT read used to leave no trace at all: not a count, not a path, not a key. These tests
// hold the repair — `unprojected_inputs` and `unprojected_inputs_reason` — over the two things
// that make it a declaration instead of a second silence:
//
//   1. It is DERIVED. The folder names come off disk and the "not read" set comes off the MODE.
//      No bank name and no project name is written in the emitter, so a folder added under
//      `objectives/` tomorrow declares itself with no edit here (the `zzz-*` test below is the
//      mechanical guard on that, not a comment asking someone to remember).
//   2. It is COMPLETE for what it covers. A root read in mode `roadmap_tree` does not read
//      `objectives/` AT ALL, so all five folders are declared — not just the two banks. Listing
//      the banks alone would imply the other three were projected, which is a half-truth that
//      reads as a whole lie.
//
// SCOPE OF THE BLOCK, asserted here so nobody reads it as a general guarantee: it covers
// `objectives/`. It is not "everything this emitter did not read".
//
// The two keys travel TOGETHER, always: a list without its reason is the same silence this run
// repairs, in miniature.
import test from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import {
  PROJECT_SNAPSHOT_RELATIVE_PATH,
  buildRoadmapTreeSnapshot,
  buildSnapshot,
  detectRootMode,
  writeProjectFolder
} from "../tools/projector/project.mjs";

const FIXED_NOW = "2026-07-31T00:00:00.000Z";

// A conforming roadmap_tree_v1 tree — the minimum `hasRoadmapTreeShape` accepts, so the root
// flips to mode 2 and `objectives/` stops being an input of anything.
const TREE = {
  schema_version: "roadmap_tree_v1",
  roadmap_id: "roadmap",
  title: "Fixture Roadmap",
  objectives: [
    {
      objective_id: "O1",
      title: "Objective One",
      phases: [
        {
          phase_id: "O1.P1",
          title: "Phase One",
          runs: [
            {
              run_id: "RUN-FIXTURE-ONE-001",
              queue_order: 1,
              title: "One",
              summary: "s",
              full_description: "d",
              status: "active",
              depends_on: []
            }
          ]
        }
      ]
    }
  ]
};

// Build a throwaway root. `objectives` maps folder name -> array of file names; a root given no
// `objectives` key gets no `objectives/` directory at all, which is the third case of the pair
// decision (see the test that names it).
function makeRoot(spec = {}) {
  const root = mkdtempSync(join(tmpdir(), "unprojected-"));
  if (spec.tree) {
    mkdirSync(join(root, "roadmap"), { recursive: true });
    writeFileSync(join(root, "roadmap", "roadmap.json"), JSON.stringify(spec.tree, null, 2), "utf8");
  }
  for (const [folder, files] of Object.entries(spec.objectives || {})) {
    const dir = join(root, "objectives", folder);
    mkdirSync(dir, { recursive: true });
    for (const name of files) {
      writeFileSync(join(dir, name), `# Project\nsandbox\n\n# Objective\n${name}\n`, "utf8");
    }
  }
  return root;
}

function withRoot(spec, run) {
  const root = makeRoot(spec);
  try {
    return run(root);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

// The five-folder shape AIW actually has on disk: the three lifecycle folders plus two case banks.
const AIW_SHAPED = {
  pending: [],
  parked: ["300-deferred.md"],
  processed: ["APPROVED-100-done.md", "ERROR-110-broke.md"],
  qualification: ["e5-secreto.md", "e6-changes-requerido.md", "e8-multiarchivo.md"],
  "queue-e7": ["a-resta.md", "b-multiplica.md", "c-imposible.md"]
};

test("a roadmap_tree root declares EVERY immediate subdirectory of objectives/, with its file count", () => {
  withRoot({ tree: TREE, objectives: AIW_SHAPED }, (root) => {
    assert.equal(detectRootMode(root), "roadmap_tree");
    const snapshot = buildRoadmapTreeSnapshot(root, { now: FIXED_NOW });

    // All five, not just the two banks: in this mode `objectives/` is not an input at all, so
    // declaring only the banks would imply the other three were projected.
    assert.deepEqual(snapshot.unprojected_inputs, [
      { path: "objectives/parked", entries: 1 },
      { path: "objectives/pending", entries: 0 },
      { path: "objectives/processed", entries: 2 },
      { path: "objectives/qualification", entries: 3 },
      { path: "objectives/queue-e7", entries: 3 }
    ]);
  });
});

test("the reason names the MODE and the LAYOUT that did not read them, and travels exactly once", () => {
  withRoot({ tree: TREE, objectives: AIW_SHAPED }, (root) => {
    const snapshot = buildRoadmapTreeSnapshot(root, { now: FIXED_NOW });

    assert.equal(typeof snapshot.unprojected_inputs_reason, "string");
    assert.match(snapshot.unprojected_inputs_reason, /roadmap_tree/);
    assert.match(snapshot.unprojected_inputs_reason, /repo_root/);
    assert.match(snapshot.unprojected_inputs_reason, /objectives\//);

    // ONE string for the emission, structurally — not a per-folder field whose sameness is an
    // invariant somebody has to keep. Nothing inside an entry can drift from anything.
    for (const entry of snapshot.unprojected_inputs) {
      assert.deepEqual(Object.keys(entry).sort(), ["entries", "path"]);
    }
  });
});

test("the reason carries no semantics of the CONTENT — it names the reader, never the read", () => {
  withRoot({ tree: TREE, objectives: AIW_SHAPED }, (root) => {
    const reason = buildRoadmapTreeSnapshot(root, { now: FIXED_NOW }).unprojected_inputs_reason;
    // The emitter must not claim to know what lives in a folder it never opened.
    for (const word of ["case", "bank", "evaluation", "fixture", "qualification", "queue-e7"]) {
      assert.equal(reason.toLowerCase().includes(word), false, `reason must not say "${word}"`);
    }
  });
});

test("an aiw_objectives root declares only the subdirectories OUTSIDE the three it reads", () => {
  withRoot({ objectives: AIW_SHAPED }, (root) => {
    assert.equal(detectRootMode(root), "aiw_objectives");
    const snapshot = buildSnapshot(root, { now: FIXED_NOW });

    // pending/parked/processed WERE read in this mode, so they are not unprojected.
    assert.deepEqual(snapshot.unprojected_inputs, [
      { path: "objectives/qualification", entries: 3 },
      { path: "objectives/queue-e7", entries: 3 }
    ]);
    assert.equal(typeof snapshot.unprojected_inputs_reason, "string");
    assert.match(snapshot.unprojected_inputs_reason, /aiw_objectives/);
  });
});

test("a folder nobody ever named declares itself — no bank or project name lives in the emitter", () => {
  withRoot({ objectives: { pending: [], "zzz-nobody-named-this": ["one.md", "two.md"] } }, (root) => {
    const snapshot = buildSnapshot(root, { now: FIXED_NOW });
    assert.deepEqual(snapshot.unprojected_inputs, [
      { path: "objectives/zzz-nobody-named-this", entries: 2 }
    ]);
  });
});

test("only FIRST-LEVEL files are counted, and a nested directory is not one of them", () => {
  const root = makeRoot({ objectives: { pending: [], bank: ["a.md", "b.md"] } });
  try {
    mkdirSync(join(root, "objectives", "bank", "nested"), { recursive: true });
    writeFileSync(join(root, "objectives", "bank", "nested", "deep.md"), "# deep\n", "utf8");
    const snapshot = buildSnapshot(root, { now: FIXED_NOW });
    assert.deepEqual(snapshot.unprojected_inputs, [{ path: "objectives/bank", entries: 2 }]);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("objectives/ absent: NEITHER key is emitted — the pair travels together", () => {
  withRoot({ tree: TREE }, (root) => {
    const snapshot = buildRoadmapTreeSnapshot(root, { now: FIXED_NOW });
    assert.equal("unprojected_inputs" in snapshot, false);
    assert.equal("unprojected_inputs_reason" in snapshot, false);
  });
});

test("objectives/ present with nothing unread: an EMPTY list, with its reason — the pair again", () => {
  withRoot({ objectives: { pending: ["001-a.md"], parked: [], processed: [] } }, (root) => {
    const snapshot = buildSnapshot(root, { now: FIXED_NOW });
    // Distinct from the case above on purpose: `[]` says "looked, nothing unread"; the absent
    // key says "there was nothing to look at". Collapsing them would lose a real measurement.
    assert.deepEqual(snapshot.unprojected_inputs, []);
    assert.equal(typeof snapshot.unprojected_inputs_reason, "string");
  });
});

test("the declaration reaches DISK in .project/snapshot.json, through the folder emission", () => {
  withRoot({ tree: TREE, objectives: AIW_SHAPED }, (root) => {
    writeProjectFolder(root, { now: FIXED_NOW });
    const onDisk = JSON.parse(readFileSync(join(root, PROJECT_SNAPSHOT_RELATIVE_PATH), "utf8"));

    assert.deepEqual(onDisk.unprojected_inputs.map((entry) => entry.path), [
      "objectives/parked",
      "objectives/pending",
      "objectives/processed",
      "objectives/qualification",
      "objectives/queue-e7"
    ]);
    assert.equal(typeof onDisk.unprojected_inputs_reason, "string");
  });
});
