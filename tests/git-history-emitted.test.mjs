// Tests for the git-history emitter (tools/projector/project.mjs, root mode 2).
//
// CONTRATO §19 declares `.project/git_history.json` OPTIONAL and left the emitter to the tramo-2
// work; the finishing pass over the port (after O4.P11) wrote it. What is
// asserted here is what can be asserted without ever writing to Git:
//   - the identifier is `git_history_v1` and carries no project's name (§1, §10.c, §19);
//   - run associations are EXPLICIT and VERIFIED against the project's own roadmap, never guessed,
//     and the key is omitted when there is nothing to claim;
//   - a root with no repository of its own emits no history file at all, and nothing throws
//     (§18/§20 — an announced absence beats an invented file);
//   - the emission path is behind the same `.project/` guard as every other artifact;
//   - and, against the REAL repository (read-only, skipped when Git is unavailable), the artifact
//     has exactly the shape the console's History tab reads.
//
// Every Git command this suite can reach is read-only: it never inits, commits, branches or
// checks out anything, in this repository or in a temporary one.
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { basename, dirname, join, resolve, sep } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import {
  GENERATED_FROM,
  GIT_HISTORY_MODEL,
  PROJECT_DIR,
  PROJECT_GIT_HISTORY_RELATIVE_PATH,
  ROADMAP_TREE_MODEL,
  ROADMAP_TREE_SOURCE_PATH,
  SCHEMA_VERSION,
  buildGitHistory,
  deriveCommitRunId,
  resolveGitBin,
  resolveProjectFilePath,
  writeProjectFolder
} from "../tools/projector/project.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const FIXED_NOW = "2026-07-24T00:00:00.000Z";

// A minimal roadmap_tree_v1 root in a temp dir. Temp dirs are not Git work trees, which is
// exactly what the fail-soft tests below need.
function makeTreeRoot() {
  const root = mkdtempSync(join(tmpdir(), "projector-githist-"));
  mkdirSync(join(root, "roadmap"), { recursive: true });
  writeFileSync(
    join(root, ROADMAP_TREE_SOURCE_PATH),
    JSON.stringify({
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
              title: "Phase",
              runs: [
                { run_id: "RUN-FIXTURE-ONE-001", queue_order: 1, title: "One", summary: "s", full_description: "d", status: "active", depends_on: [] }
              ]
            }
          ]
        }
      ]
    }, null, 2),
    "utf8"
  );
  writeFileSync(join(root, "package.json"), JSON.stringify({ name: "fixture-project" }), "utf8");
  writeFileSync(join(root, "README.md"), "# Fixture Readme\n", "utf8");
  return root;
}

test("the schema identifier names the content and nothing else (§1, §10.c, §19)", () => {
  assert.equal(GIT_HISTORY_MODEL, "git_history_v1");
  // Stated as a derivation rather than as a literal: the identifier is the ARTIFACT'S OWN NAME
  // plus this contract's version. Anything a vendor prefix could add fails this equality, so the
  // test says "no project's name here" without having to name one.
  const artifactName = basename(PROJECT_GIT_HISTORY_RELATIVE_PATH, ".json");
  assert.equal(GIT_HISTORY_MODEL, `${artifactName}_v1`);
  assert.doesNotMatch(GIT_HISTORY_MODEL, /\./); // no dotted namespace of any kind
  assert.doesNotMatch(GIT_HISTORY_MODEL, /snapshot/i); // §1.b — redundant under .project/
});

test("a run association is emitted only for an EXACT, roadmap-verified, single mention", () => {
  const runIds = new Set(["RUN-FIXTURE-ONE-001", "RUN-FIXTURE-TWO-001"]);

  // The one honest case: exactly one distinct known run named in the message.
  assert.equal(deriveCommitRunId("port: closes RUN-FIXTURE-ONE-001", "", runIds), "RUN-FIXTURE-ONE-001");
  assert.equal(deriveCommitRunId("port", "Body mentions RUN-FIXTURE-TWO-001.", runIds), "RUN-FIXTURE-TWO-001");
  // The same run named twice is still one run.
  assert.equal(deriveCommitRunId("RUN-FIXTURE-ONE-001", "again RUN-FIXTURE-ONE-001", runIds), "RUN-FIXTURE-ONE-001");

  // Two distinct runs: ambiguous, so nothing is claimed.
  assert.equal(deriveCommitRunId("RUN-FIXTURE-ONE-001 and RUN-FIXTURE-TWO-001", "", runIds), null);
  // A run the roadmap does not declare is not an association, however well-formed it looks.
  assert.equal(deriveCommitRunId("closes RUN-FIXTURE-NINE-999", "", runIds), null);
  // Partial matches never count: the token must equal a run id, not contain or extend one.
  assert.equal(deriveCommitRunId("RUN-FIXTURE-ONE-001-B", "", runIds), null);
  assert.equal(deriveCommitRunId("xRUN-FIXTURE-ONE-001", "", runIds), null);
  assert.equal(deriveCommitRunId("FIXTURE-ONE", "", runIds), null);
  // ...but ordinary sentence punctuation around a real mention does not break it.
  assert.equal(deriveCommitRunId("closes (RUN-FIXTURE-ONE-001).", "", runIds), "RUN-FIXTURE-ONE-001");
  // Nothing to verify against → nothing verified.
  assert.equal(deriveCommitRunId("RUN-FIXTURE-ONE-001", "", new Set()), null);
  assert.equal(deriveCommitRunId("a plain commit subject", "", runIds), null);
});

test("a root that is not its own Git repository emits no history file, and nothing throws", () => {
  const root = makeTreeRoot();
  try {
    // Pure read first: the builder itself declines rather than guessing.
    assert.equal(buildGitHistory(root, { now: FIXED_NOW }), null);
    // And the folder emission simply omits the artifact — the other five still land.
    const result = writeProjectFolder(root, { now: FIXED_NOW });
    assert.equal(result.ok, true);
    assert.ok(!result.files.some((file) => file.artifact === "git_history"));
    assert.equal(existsSync(join(root, PROJECT_GIT_HISTORY_RELATIVE_PATH)), false);
    // Fail-soft means the REQUIRED artifact is unaffected (§20).
    assert.ok(result.files.some((file) => file.artifact === "snapshot"));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("the git-history emission path is behind the same .project/ guard as every other artifact", () => {
  const root = makeTreeRoot();
  try {
    assert.equal(PROJECT_GIT_HISTORY_RELATIVE_PATH, join(PROJECT_DIR, "git_history.json"));
    const { outPath } = resolveProjectFilePath(root, PROJECT_GIT_HISTORY_RELATIVE_PATH);
    assert.ok(outPath.startsWith(resolve(root, PROJECT_DIR) + sep));
    assert.throws(() => resolveProjectFilePath(root, join("..", "git_history.json")));
    assert.throws(() => resolveProjectFilePath(root, join(".aiw", "views", "git_history.json")));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

// ---------------------------------------------------------------------------
// Against the real repository. READ-ONLY, and skipped rather than failed when Git is not
// installed or this checkout is not its own work tree — the same condition the emitter itself
// treats as "no history to publish".
// ---------------------------------------------------------------------------
const liveHistory = resolveGitBin() ? buildGitHistory(REPO_ROOT, { now: FIXED_NOW }) : null;
const skipLive = liveHistory ? false : "no readable Git repository at the project root";

test("the emitted history has the envelope every file of the folder carries (§4, §5, §6)", { skip: skipLive }, () => {
  assert.equal(liveHistory.schema_version, SCHEMA_VERSION);
  assert.equal(typeof liveHistory.project_id, "string");
  assert.equal(liveHistory.generated_at, FIXED_NOW);
  assert.equal(liveHistory.generated_from, GENERATED_FROM);
  assert.equal(liveHistory.model, GIT_HISTORY_MODEL);
  // §7 — every declared source path resolves on disk; §6 — each one carries its mtime.
  assert.ok(liveHistory.sources.length > 0);
  for (const source of liveHistory.sources) {
    assert.ok(existsSync(join(REPO_ROOT, source.path)), `declared source does not resolve: ${source.path}`);
    assert.ok(!Number.isNaN(Date.parse(source.mtime)));
  }
  // The repository itself is named as a source; a sha is what actually dates this artifact.
  assert.ok(liveHistory.sources.some((source) => source.path === ".git"));
  assert.match(liveHistory.head, /^[0-9a-f]{40}$/);
});

test("the emitted history is exactly what renderCommitHistory reads", { skip: skipLive }, () => {
  // The reader's gate (project-console.js, renderCommitHistory): a non-empty branch list and a
  // commit list. Anything that passes this renders; anything that does not falls to the empty state.
  assert.ok(Array.isArray(liveHistory.branches) && liveHistory.branches.length > 0);
  assert.ok(Array.isArray(liveHistory.commits) && liveHistory.commits.length > 0);
  assert.equal(liveHistory.commit_total, liveHistory.commits.length);
  // `main` sorts first (the reader tints it as the trunk) when it exists.
  if (liveHistory.branches.includes("main")) assert.equal(liveHistory.branches[0], "main");
  // The selected branch the reader opens on must be one it can actually show.
  if ("current_branch" in liveHistory) assert.ok(liveHistory.branches.includes(liveHistory.current_branch));

  const branchSet = new Set(liveHistory.branches);
  for (const commit of liveHistory.commits) {
    // Every field histCommitRow() touches, with the type it touches it as.
    assert.ok(branchSet.has(commit.branch), `commit on an undeclared branch: ${commit.branch}`);
    assert.match(commit.full_sha, /^[0-9a-f]{40}$/);
    assert.ok(commit.full_sha.startsWith(commit.sha));
    assert.ok(!Number.isNaN(Date.parse(commit.date)), `unparseable commit date: ${commit.date}`);
    assert.equal(typeof commit.subject, "string");
    assert.equal(typeof commit.body, "string");
    assert.equal(typeof commit.is_merge, "boolean");
    // A merge is a commit with more than one parent — derived, never asserted by hand.
    assert.equal(commit.is_merge, commit.parents.split(/\s+/).filter(Boolean).length > 1);
  }
});

test("every emitted run association resolves in the project's own roadmap", { skip: skipLive }, () => {
  // The association is the one field here that could become a false claim, so it is checked
  // against the roadmap the console renders — the same set the reader resolves against. A commit
  // with nothing to claim carries NO run_id key at all rather than a null one.
  const roadmap = JSON.parse(readFileSync(join(REPO_ROOT, ROADMAP_TREE_SOURCE_PATH), "utf8"));
  const known = new Set();
  for (const objective of roadmap.objectives || []) {
    for (const phase of objective.phases || []) {
      for (const run of phase.runs || []) known.add(run.run_id);
    }
  }
  for (const commit of liveHistory.commits) {
    if (!("run_id" in commit)) continue;
    assert.ok(known.has(commit.run_id), `commit ${commit.sha} claims an unknown run ${commit.run_id}`);
    assert.ok(`${commit.subject}\n${commit.body}`.includes(commit.run_id), "an association must be explicitly written in the message");
  }
});
