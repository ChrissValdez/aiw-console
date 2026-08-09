// Tests for the REGISTRY DIGEST builder (tools/project-console/build-registry-digest.mjs).
//
// What is asserted here is the DERIVATION, on fixtures built by the test itself, with the Git
// reader INJECTED. No test below starts a Git process, and none reads a real sibling project —
// the reason is the one recorded in tests/helpers/neighbours.mjs: a neighbour's run count is not
// an invariant of this code, so asserting one turns a commit next door into a red suite here.
// The single live check at the bottom asserts no figure of any real project, exactly like
// tests/real-projects-smoke.test.mjs.
//
// The load-bearing test in this file is "the dirty reading is the declared one": it captures
// every Git invocation the builder makes and demands that none of them is `git status` and that
// every one of them passes `--no-optional-locks` before the subcommand. That is a stop condition
// of the run this file comes from, so it is pinned rather than trusted.
import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import {
  DERIVED_BANNER,
  DIGEST_RELATIVE_PATH,
  DIGEST_SCHEMA,
  DIRTY_READING,
  REGISTRY_RELATIVE_PATH,
  blobSha,
  buildRegistryDigest,
  countsByStatus,
  deriveNextStep,
  gitRead,
  resolveDigestPath,
  writeRegistryDigest
} from "../tools/project-console/build-registry-digest.mjs";
import { flattenRoadmapTree } from "../tools/projector/project.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const FIXED_NOW = "2026-08-08T00:00:00.000Z";

// ---------------------------------------------------------------- fixture construction

const writeJson = (path, data) => {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n", "utf8");
};

// A conforming objective/phase/run tree. `runs` is a list of [run_id, status, queue_order,
// depends_on] so a test can state the queue it wants in one line.
function tree(runs, extra = {}) {
  return {
    schema_version: "roadmap_tree_v1",
    roadmap_id: "RM-FIXTURE",
    title: "Fixture roadmap",
    ...extra,
    objectives: [
      {
        objective_id: "OF",
        title: "Objective",
        phases: [
          {
            phase_id: "OF.P1",
            title: "Phase",
            runs: runs.map(([run_id, status, queue_order, depends_on]) => ({
              run_id,
              title: `title of ${run_id}`,
              status,
              queue_order,
              ...(depends_on ? { depends_on } : {})
            }))
          }
        ]
      }
    ]
  };
}

// Two layouts, so the "the canonical does not live at the same path in every root" property is
// exercised by construction and not by hoping a fixture happens to differ.
const LAYOUT_PATHS = {
  repo_root: { roadmap: join("roadmap", "roadmap.json"), no_claims: join("governance", "no_claims.json") },
  project_local_aiw: {
    roadmap: join(".aiw", "roadmap", "roadmap.json"),
    no_claims: join(".aiw", "guardrails", "no_claims.json")
  }
};

function makeProjectRoot(root, { layout, runs, claims, extra }) {
  const paths = LAYOUT_PATHS[layout];
  writeJson(join(root, paths.roadmap), tree(runs, extra));
  if (claims) writeJson(join(root, paths.no_claims), { claims });
  return root;
}

// A whole workspace: a registry plus the roots it lists. Returns { dir, registryPath, cleanup }.
function makeWorkspace(entries, registryExtra = {}) {
  const dir = mkdtempSync(join(tmpdir(), "registry-digest-"));
  const registryPath = join(dir, REGISTRY_RELATIVE_PATH);
  const projects = [];
  for (const entry of entries) {
    const rootDeclared = `../${entry.key}`;
    if (entry.spec) makeProjectRoot(join(dir, entry.key), entry.spec);
    else if (entry.emptyRoot) mkdirSync(join(dir, entry.key), { recursive: true });
    projects.push({ key: entry.key, root: rootDeclared });
  }
  writeJson(registryPath, { registry_model: "project_registry_v1", title: "Fixture registry", ...registryExtra, projects });
  return { dir, registryPath, cleanup: () => rmSync(dir, { recursive: true, force: true }) };
}

// A Git reader that answers from a table keyed by the LAST path segment of the root, and records
// every invocation it was asked to make. `null` for a root not in the table = Git unavailable.
function fakeGit(table) {
  const calls = [];
  const read = (bin, root, args) => {
    calls.push({ bin, root, args: [...args] });
    const key = root.split(/[\\/]/).filter(Boolean).pop();
    const answers = table[key];
    if (!answers) return null;
    if (args[0] === "rev-parse" && args[1] === "HEAD") return answers.head ?? null;
    if (args[0] === "rev-parse") return answers.branch ?? null;
    if (args[0] === "diff") return (answers.tracked || []).map((p, i) => `${i + 1}\t0\t${p}`).join("\n");
    if (args[0] === "ls-files") return (answers.untracked || []).join("\n");
    return null;
  };
  return { read, calls };
}

const build = (registryPath, opts = {}) =>
  buildRegistryDigest({ registryPath, now: FIXED_NOW, bin: "git-fake", ...opts });

// ---------------------------------------------------------------- the project list is derived

test("the project list is DERIVED from the registry: every listed key, in registry order, and the count is measured", () => {
  const ws = makeWorkspace([
    { key: "alfa", spec: { layout: "repo_root", runs: [["R-A", "active", 1]] } },
    { key: "beta", spec: { layout: "project_local_aiw", runs: [["R-B", "planned", 2]] } },
    { key: "gamma", spec: { layout: "repo_root", runs: [["R-C", "completed", 3]] } }
  ]);
  try {
    const digest = build(ws.registryPath, fakeGit({}));
    assert.deepEqual(digest.projects.map((p) => p.key), ["alfa", "beta", "gamma"]);
    assert.equal(digest.registry.project_count, 3);
    assert.deepEqual(digest.registry.keys, ["alfa", "beta", "gamma"]);
    // The count is the LIST's length, not a literal: a fourth entry moves it with no code change.
    assert.equal(digest.registry.project_count, digest.projects.length);
    assert.equal(digest.schema, DIGEST_SCHEMA);
    assert.equal(digest.generated_at, FIXED_NOW);
  } finally {
    ws.cleanup();
  }
});

test("a registry with four projects yields four entries — the number is not baked anywhere", () => {
  const ws = makeWorkspace(
    ["uno", "dos", "tres", "cuatro"].map((key) => ({ key, spec: { layout: "repo_root", runs: [[`R-${key}`, "planned", 1]] } }))
  );
  try {
    const digest = build(ws.registryPath, fakeGit({}));
    assert.equal(digest.registry.project_count, 4);
    assert.equal(digest.projects.length, 4);
    const source = readFileSync(join(REPO_ROOT, "tools", "project-console", "build-registry-digest.mjs"), "utf8");
    // No count of projects is written into the emitter — neither three nor four.
    assert.doesNotMatch(source, /project_count:\s*\d/, "the project count is a literal in the emitter");
  } finally {
    ws.cleanup();
  }
});

// ---------------------------------------------------------------- WHERE the canonical lives

test("the canonical roadmap path is MEASURED per project: two layouts in one registry report two different paths", () => {
  const ws = makeWorkspace([
    { key: "en-la-raiz", spec: { layout: "repo_root", runs: [["R-1", "active", 1]] } },
    { key: "en-punto-aiw", spec: { layout: "project_local_aiw", runs: [["R-2", "active", 1]] } }
  ]);
  try {
    const digest = build(ws.registryPath, fakeGit({}));
    const [raiz, aiw] = digest.projects;

    assert.equal(raiz.canonical.layout, "repo_root");
    assert.equal(raiz.canonical.roadmap, "roadmap/roadmap.json");
    assert.equal(raiz.canonical.no_claims, "governance/no_claims.json");

    assert.equal(aiw.canonical.layout, "project_local_aiw");
    assert.equal(aiw.canonical.roadmap, ".aiw/roadmap/roadmap.json");
    assert.equal(aiw.canonical.no_claims, ".aiw/guardrails/no_claims.json");

    // Paths are POSIX and root-relative, so the artifact carries no absolute path off this machine.
    for (const project of digest.projects) {
      for (const source of project.sources) {
        assert.doesNotMatch(source.path, /\\|^[A-Za-z]:/, `${project.key}: ${source.path} is not a POSIX relative path`);
      }
    }
  } finally {
    ws.cleanup();
  }
});

test("a tree that names its own model keeps that name verbatim — the digest never relabels it", () => {
  const ws = makeWorkspace([
    { key: "propio", spec: { layout: "repo_root", runs: [["R-1", "active", 1]], extra: { schema_version: "jame.roadmap_v3.v0.2-progress" } } },
    { key: "sin-nombre", spec: { layout: "repo_root", runs: [["R-2", "active", 1]], extra: { schema_version: undefined } } }
  ]);
  try {
    const digest = build(ws.registryPath, fakeGit({}));
    assert.equal(digest.projects[0].canonical.declared_model, "jame.roadmap_v3.v0.2-progress");
    // A conforming tree that declares nothing is credited with this contract's identifier.
    assert.equal(digest.projects[1].canonical.declared_model, "roadmap_tree_v1");
  } finally {
    ws.cleanup();
  }
});

// ---------------------------------------------------------------- counts, active runs, next step

test("counts by status come off the tree, and a status the tree does not use gets no zero", () => {
  const flat = flattenRoadmapTree(tree([["A", "active", 1], ["B", "completed", 2], ["C", "completed", 3]]));
  assert.deepEqual(countsByStatus(flat), { active: 1, completed: 2 });
  assert.equal("planned" in countsByStatus(flat), false, "an unused status was invented as a zero");
});

test("active runs and the next step derive from the tree, in queue order", () => {
  const ws = makeWorkspace([
    {
      key: "cola",
      spec: {
        layout: "repo_root",
        runs: [
          ["R-DONE", "completed", 1],
          ["R-NOW", "active", 2],
          ["R-ALSO-NOW", "active", 3],
          ["R-READY", "planned", 4, ["R-DONE"]],
          ["R-LATER", "planned", 5, ["R-NOW"]]
        ]
      }
    }
  ]);
  try {
    const [project] = build(ws.registryPath, fakeGit({})).projects;

    assert.deepEqual(project.active_runs.map((r) => r.run_id), ["R-NOW", "R-ALSO-NOW"]);
    assert.equal(project.active_runs[0].queue_order, 2);
    assert.equal(project.runs.total, 5);
    assert.deepEqual(project.runs.by_status, { active: 2, completed: 1, planned: 2 });
    assert.equal(project.operational_status, "active");

    // R-READY's dependency is completed; R-LATER's is not. The projector's grouping decides.
    assert.equal(project.next_step.present, true);
    assert.equal(project.next_step.run_id, "R-READY");
    assert.equal(project.next_step.queue_group, "ready_next");
    assert.equal(project.next_step.queue_order, 4);
  } finally {
    ws.cleanup();
  }
});

test("the next step is the LOWEST queue_order among ready runs, not the first in file order", () => {
  const flat = flattenRoadmapTree(
    tree([["R-HIGH", "planned", 90], ["R-LOW", "planned", 10], ["R-MID", "planned", 50]])
  );
  assert.equal(deriveNextStep(flat).run_id, "R-LOW");
});

test("no ready run is an ANNOUNCED absence, never a guess", () => {
  const flat = flattenRoadmapTree(tree([["R-NOW", "active", 1], ["R-BLOCKED", "planned", 2, ["R-NOW"]]]));
  const next = deriveNextStep(flat);
  assert.equal(next.present, false);
  assert.match(next.absent_reason, /ready_next/);
  assert.equal("run_id" in next, false, "an absent next step still carried a run_id");
});

// ---------------------------------------------------------------- absences are declared

test("a root that does not exist is reported as NOT MEASURED with the reason, and does not drop out of the list", () => {
  const ws = makeWorkspace([
    { key: "presente", spec: { layout: "repo_root", runs: [["R-1", "active", 1]] } },
    { key: "ausente" }
  ]);
  try {
    const digest = build(ws.registryPath, fakeGit({}));
    assert.equal(digest.projects.length, 2, "an unmeasurable project was silently dropped");
    const ausente = digest.projects[1];
    assert.equal(ausente.measured, false);
    assert.match(ausente.absent_reason, /does not exist/);
    assert.equal("runs" in ausente, false, "an unmeasured project carried run counts anyway");
  } finally {
    ws.cleanup();
  }
});

test("a root no layout claims is reported as NOT MEASURED and names the paths that were tried", () => {
  const ws = makeWorkspace([{ key: "sin-plan", emptyRoot: true }]);
  try {
    const [project] = build(ws.registryPath, fakeGit({})).projects;
    assert.equal(project.measured, false);
    assert.match(project.absent_reason, /no layout claimed this root/);
    assert.match(project.absent_reason, /roadmap\/roadmap\.json/);
    assert.match(project.absent_reason, /\.aiw\/roadmap\/roadmap\.json/);
  } finally {
    ws.cleanup();
  }
});

test("a project with no no_claims file reports the absence and names the path it looked at", () => {
  const ws = makeWorkspace([{ key: "sin-claims", spec: { layout: "project_local_aiw", runs: [["R-1", "active", 1]] } }]);
  try {
    const [project] = build(ws.registryPath, fakeGit({})).projects;
    assert.equal(project.no_claims.present, false);
    assert.match(project.no_claims.absent_reason, /\.aiw\/guardrails\/no_claims\.json/);
    // And the absent source is not emitted as a broken pointer.
    assert.deepEqual(project.sources.map((s) => s.path), [".aiw/roadmap/roadmap.json"]);
  } finally {
    ws.cleanup();
  }
});

test("a project WITH no_claims reports the total and fingerprints the canonical file", () => {
  const ws = makeWorkspace([
    { key: "con-claims", spec: { layout: "repo_root", runs: [["R-1", "active", 1]], claims: ["a", "b", "c"] } }
  ]);
  try {
    const [project] = build(ws.registryPath, fakeGit({})).projects;
    assert.equal(project.no_claims.present, true);
    assert.equal(project.no_claims.total, 3);
    assert.equal(project.no_claims.source.path, "governance/no_claims.json");
    assert.equal(project.sources.length, 2);
  } finally {
    ws.cleanup();
  }
});

test("Git unavailable is an announced absence: no head, no branch, no invented clean tree", () => {
  const ws = makeWorkspace([{ key: "sin-git", spec: { layout: "repo_root", runs: [["R-1", "active", 1]] } }]);
  try {
    // `bin: null` — no binary resolved at all.
    const digest = buildRegistryDigest({ registryPath: ws.registryPath, now: FIXED_NOW, bin: null });
    const [project] = digest.projects;
    assert.equal(project.measured, true, "git absence must not disqualify the rest of the measurement");
    assert.equal(project.git.available, false);
    assert.match(project.git.absent_reason, /no git binary/);
    assert.equal(project.git.head, null);
    assert.equal(project.git.dirty, null, "an unreadable tree was reported as clean");
    // Everything that does not need Git is still there.
    assert.equal(project.runs.total, 1);
  } finally {
    ws.cleanup();
  }
});

test("a root Git cannot answer for is distinguished from Git being absent", () => {
  const ws = makeWorkspace([{ key: "no-repo", spec: { layout: "repo_root", runs: [["R-1", "active", 1]] } }]);
  try {
    const [project] = build(ws.registryPath, fakeGit({})).projects;
    assert.equal(project.git.available, false);
    assert.match(project.git.absent_reason, /not its own repository/);
  } finally {
    ws.cleanup();
  }
});

// ---------------------------------------------------------------- THE DIRTY READING

test("the dirty reading is the DECLARED one: content vs HEAD plus an untracked walk, and never `git status`", () => {
  const ws = makeWorkspace([{ key: "sucio", spec: { layout: "repo_root", runs: [["R-1", "active", 1]] } }]);
  try {
    const git = fakeGit({
      sucio: { head: "a".repeat(40), branch: "main", tracked: ["src/b.txt", "src/a.txt"], untracked: ["nuevo.md"] }
    });
    const digest = build(ws.registryPath, git);
    const [project] = digest.projects;

    assert.equal(project.git.available, true);
    assert.equal(project.git.branch, "main");
    assert.equal(project.git.dirty.is_dirty, true);
    // Sorted, so the artifact does not churn on Git's output order.
    assert.deepEqual(project.git.dirty.tracked_changed, ["src/a.txt", "src/b.txt"]);
    assert.deepEqual(project.git.dirty.untracked, ["nuevo.md"]);
    assert.deepEqual(project.git.dirty.counts, { tracked_changed: 2, untracked: 1 });

    // THE PIN, part one: which subcommands the builder asks for at all.
    const subcommands = git.calls.map((call) => call.args[0]);
    assert.ok(subcommands.length > 0, "no Git invocation was recorded at all");
    assert.equal(subcommands.includes("status"), false, "the builder called `git status`");
    for (const call of git.calls) {
      // Read-only Git only. Nothing that can mutate a repository.
      assert.doesNotMatch(call.args.join(" "), /\b(add|commit|push|checkout|restore|reset|stash|clean)\b/);
    }
    // The commands the artifact DECLARES are the commands that were run. (This seam sits above
    // the option-prepending, so the argv here is the subcommand alone; the option is pinned in
    // its own test against `gitRead`.)
    const ran = git.calls.map((call) => call.args.join(" "));
    assert.ok(ran.includes(DIRTY_READING.tracked.argv.join(" ")), "the declared tracked reading was not the one run");
    assert.ok(ran.includes(DIRTY_READING.untracked.argv.join(" ")), "the declared untracked reading was not the one run");
    assert.equal(DIRTY_READING.not_used, "git status");
    assert.match(DIRTY_READING.why, /339/, "the declaration lost the measurement that motivated it");
  } finally {
    ws.cleanup();
  }
});

// THE PIN, part two — the argv actually handed to the process. Asserted at `gitRead` with the
// exec injected, because that is the only level at which the composed argv is visible: a test
// that replaces the higher `read` seam never sees the option get prepended.
test("every Git process is started with --no-optional-locks BEFORE the subcommand", () => {
  const seen = [];
  const exec = (bin, argv) => {
    seen.push({ bin, argv: [...argv] });
    return "output\n";
  };

  for (const argv of [DIRTY_READING.tracked.argv, DIRTY_READING.untracked.argv, ["rev-parse", "HEAD"]]) {
    assert.equal(gitRead("git", "/some/root", argv, exec), "output");
  }

  assert.equal(seen.length, 3);
  for (const call of seen) {
    assert.equal(
      call.argv[0],
      "--no-optional-locks",
      `the option is not first: git ${call.argv.join(" ")} — an invocation like this can leave a .git/index.lock`
    );
    assert.equal(call.argv.filter((arg) => arg === "--no-optional-locks").length, 1);
    assert.notEqual(call.argv[1], "--no-optional-locks", "the option was passed twice instead of once before the subcommand");
    assert.notEqual(call.argv[1], "status");
  }

  // No binary means no process is started at all, and the answer is null rather than a guess.
  const before = seen.length;
  assert.equal(gitRead(null, "/some/root", ["rev-parse", "HEAD"], exec), null);
  assert.equal(seen.length, before, "a process was started with no resolved git binary");

  // A failing process is null, not a throw and not a partial reading.
  assert.equal(
    gitRead("git", "/some/root", ["rev-parse", "HEAD"], () => {
      throw new Error("fatal: not a git repository");
    }),
    null
  );
});

test("a clean tree is is_dirty false with both lists empty — and it is a measurement, not a default", () => {
  const ws = makeWorkspace([{ key: "limpio", spec: { layout: "repo_root", runs: [["R-1", "active", 1]] } }]);
  try {
    const git = fakeGit({ limpio: { head: "b".repeat(40), branch: "main", tracked: [], untracked: [] } });
    const [project] = build(ws.registryPath, git).projects;
    assert.equal(project.git.dirty.is_dirty, false);
    assert.deepEqual(project.git.dirty.tracked_changed, []);
    assert.deepEqual(project.git.dirty.untracked, []);
  } finally {
    ws.cleanup();
  }
});

test("the emitter's SOURCE never composes a Git invocation without --no-optional-locks, and never calls status", () => {
  const source = readFileSync(join(REPO_ROOT, "tools", "project-console", "build-registry-digest.mjs"), "utf8");
  // One place starts a Git process for readings, and it prepends the option itself.
  const prepends = source.match(/\["--no-optional-locks", \.\.\.args\]/g) || [];
  assert.equal(prepends.length, 1, "the single point where --no-optional-locks is prepended has moved or multiplied");
  // `git status` appears only inside the prose that explains why it is not used.
  for (const match of source.matchAll(/"status"|'status'|`status`/g)) {
    assert.fail(`the emitter names a \`status\` subcommand at index ${match.index}`);
  }
});

// ---------------------------------------------------------------- self-exclusion

test("the digest's own path is excluded from its own dirty reading, and the exclusion is DECLARED", () => {
  // A registry whose FIRST entry resolves to the repo root being emitted into.
  const dir = mkdtempSync(join(tmpdir(), "registry-digest-self-"));
  try {
    const repoRoot = join(dir, "repo");
    makeProjectRoot(repoRoot, { layout: "repo_root", runs: [["R-1", "active", 1]] });
    const registryPath = join(repoRoot, REGISTRY_RELATIVE_PATH);
    writeJson(registryPath, {
      registry_model: "project_registry_v1",
      projects: [{ key: "yo", root: ".." }, { key: "vecino", root: "../../vecino" }]
    });
    makeProjectRoot(join(dir, "vecino"), { layout: "repo_root", runs: [["R-2", "active", 1]] });

    const selfPath = DIGEST_RELATIVE_PATH.split(/[\\/]/).join("/");
    const git = fakeGit({
      repo: { head: "c".repeat(40), branch: "main", tracked: [selfPath, "otro.txt"], untracked: [selfPath] },
      vecino: { head: "d".repeat(40), branch: "main", tracked: [selfPath], untracked: [] }
    });
    const digest = buildRegistryDigest({ repoRoot, registryPath, now: FIXED_NOW, bin: "git-fake", read: git.read });

    const yo = digest.projects[0];
    assert.deepEqual(yo.git.dirty.tracked_changed, ["otro.txt"], "the digest reported itself as dirty");
    assert.deepEqual(yo.git.dirty.untracked, []);
    assert.deepEqual(yo.git.dirty.self_excluded, [selfPath], "the exclusion happened but was not declared");

    // The neighbour is NOT this repo, so nothing is excluded there: a same-named file next door
    // is a real change and is reported. The match is on the resolved root, not on the key.
    const vecino = digest.projects[1];
    assert.deepEqual(vecino.git.dirty.tracked_changed, [selfPath]);
    assert.deepEqual(vecino.git.dirty.self_excluded, []);

    // And the no-claim says it in the artifact, naming the file.
    assert.ok(digest.no_claims.some((claim) => claim.includes(selfPath)), "the artifact does not announce the exclusion");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

// ---------------------------------------------------------------- staleness: dated and SHA'd

test("every sha1 is the Git blob hash of the bytes that were read, computed independently here", () => {
  const ws = makeWorkspace([
    { key: "huella", spec: { layout: "repo_root", runs: [["R-1", "active", 1]], claims: ["x"] } }
  ]);
  try {
    const digest = build(ws.registryPath, fakeGit({}));
    const root = join(ws.dir, "huella");
    for (const source of digest.projects[0].sources) {
      const bytes = readFileSync(join(root, source.path));
      // The independent reference implementation of `git hash-object`, written out in full.
      const expected = createHash("sha1")
        .update(Buffer.concat([Buffer.from(`blob ${bytes.length}\0`, "utf8"), bytes]))
        .digest("hex");
      assert.equal(source.sha1, expected, `${source.path}: sha1 is not the Git blob hash`);
      assert.equal(source.bytes, bytes.length);
      assert.match(source.sha1, /^[0-9a-f]{40}$/);
    }
    // The registry itself is fingerprinted too — it is the input that decides the project list.
    assert.equal(digest.registry.sha1, blobSha(readFileSync(ws.registryPath)));
    assert.match(digest.staleness.how, /hash-object --no-filters/, "the file does not say how to check its own age");
  } finally {
    ws.cleanup();
  }
});

test("editing a canonical source moves its sha1 — which is what makes staleness detectable", () => {
  const ws = makeWorkspace([{ key: "cambia", spec: { layout: "repo_root", runs: [["R-1", "active", 1]] } }]);
  try {
    const before = build(ws.registryPath, fakeGit({})).projects[0].sources[0].sha1;
    writeJson(join(ws.dir, "cambia", "roadmap", "roadmap.json"), tree([["R-1", "completed", 1]]));
    const after = build(ws.registryPath, fakeGit({})).projects[0].sources[0].sha1;
    assert.notEqual(after, before);
  } finally {
    ws.cleanup();
  }
});

test("the digest is dated and, with the same inputs and the same instant, byte-identical", () => {
  const ws = makeWorkspace([
    { key: "estable", spec: { layout: "repo_root", runs: [["R-1", "active", 1], ["R-2", "planned", 2]] } }
  ]);
  try {
    const git = () => fakeGit({ estable: { head: "e".repeat(40), branch: "main", tracked: ["z.txt"], untracked: [] } });
    const first = JSON.stringify(build(ws.registryPath, git()), null, 2);
    const second = JSON.stringify(build(ws.registryPath, git()), null, 2);
    assert.equal(first, second, "two builds of the same inputs differ: the artifact would churn on every run");
    assert.match(JSON.parse(first).generated_at, /^\d{4}-\d{2}-\d{2}T[\d:.]+Z$/);
  } finally {
    ws.cleanup();
  }
});

// ---------------------------------------------------------------- derived, and never hand-edited

test("the artifact says of ITSELF that it is derived and must not be hand-edited, and names its emitter", () => {
  const ws = makeWorkspace([{ key: "uno", spec: { layout: "repo_root", runs: [["R-1", "active", 1]] } }]);
  try {
    const digest = build(ws.registryPath, fakeGit({}));
    assert.equal(digest.derived, true);
    assert.equal(digest.do_not_edit, DERIVED_BANNER);
    assert.match(digest.do_not_edit, /DO NOT EDIT BY HAND/);
    assert.match(digest.do_not_edit, /build-registry-digest\.mjs/);
    assert.equal(digest.emitter, "tools/project-console/build-registry-digest.mjs");
    assert.equal(digest.emitted_to, DIGEST_RELATIVE_PATH.split(/[\\/]/).join("/"));
    assert.ok(Array.isArray(digest.no_claims) && digest.no_claims.length > 0);
    // The limitation the derivation actually has is announced, not absorbed.
    assert.ok(digest.no_claims.some((claim) => /barrier/i.test(claim)), "the barrier limitation is not declared");
  } finally {
    ws.cleanup();
  }
});

// ---------------------------------------------------------------- writing: ONE file, ONE place

test("writing lands exactly ONE file at the declared path, and touches no other registered root", () => {
  const dir = mkdtempSync(join(tmpdir(), "registry-digest-write-"));
  try {
    const repoRoot = join(dir, "repo");
    makeProjectRoot(repoRoot, { layout: "repo_root", runs: [["R-1", "active", 1]] });
    const vecino = join(dir, "vecino");
    makeProjectRoot(vecino, { layout: "repo_root", runs: [["R-2", "active", 1]] });
    const registryPath = join(repoRoot, REGISTRY_RELATIVE_PATH);
    writeJson(registryPath, {
      registry_model: "project_registry_v1",
      projects: [{ key: "yo", root: ".." }, { key: "vecino", root: "../../vecino" }]
    });

    const listing = (root) => readdirSync(root, { recursive: true }).map(String).sort();
    const vecinoBefore = listing(vecino);

    const result = writeRegistryDigest({ repoRoot, registryPath, now: FIXED_NOW, bin: null });

    assert.equal(result.ok, true);
    assert.equal(result.path, join(repoRoot, DIGEST_RELATIVE_PATH));
    assert.ok(existsSync(result.path));
    // The neighbour is byte-for-byte the same directory it was: it was READ, not written.
    assert.deepEqual(listing(vecino), vecinoBefore, "the emitter wrote into another registered root");
    // No temp file survived the rename.
    assert.equal(existsSync(`${result.path}.tmp`), false);

    const onDisk = readFileSync(result.path, "utf8");
    assert.equal(onDisk, JSON.stringify(result.digest, null, 2) + "\n");
    assert.equal(onDisk.includes("\r\n"), false, "the artifact was written with CRLF");
    assert.ok(onDisk.endsWith("\n"));
    assert.deepEqual(JSON.parse(onDisk), result.digest);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("a destination outside the repo root is REFUSED, not written", () => {
  const dir = mkdtempSync(join(tmpdir(), "registry-digest-guard-"));
  try {
    assert.throws(() => resolveDigestPath(dir, join("..", "escapado.json")), /Refusing to write outside/);
    assert.throws(() => resolveDigestPath(dir, resolve(dir, "..", "otro.json")), /Refusing to write outside/);
    // The declared destination resolves.
    assert.equal(resolveDigestPath(dir), join(dir, DIGEST_RELATIVE_PATH));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("the emitter declares ONE destination, and it is beside the registry rather than inside .project/", () => {
  const digestPath = DIGEST_RELATIVE_PATH.split(/[\\/]/).join("/");
  const registryPath = REGISTRY_RELATIVE_PATH.split(/[\\/]/).join("/");
  // The whole point of the placement: it is not a seventh file in the per-project contract folder.
  assert.doesNotMatch(digestPath, /(^|\/)\.project\//, "the digest was placed inside the .project/ contract folder");
  assert.equal(dirname(digestPath), dirname(registryPath), "the digest no longer sits beside the registry it derives from");
});

// ---------------------------------------------------------------- the one live check, no figures

// Mirrors tests/real-projects-smoke.test.mjs: the real registry is read, and all that is asked is
// that each root it lists still resolves to a canonical this emitter can locate. NO count, run
// total, branch, SHA or title of any real project is asserted — those move when work happens.
const realRegistry = join(REPO_ROOT, REGISTRY_RELATIVE_PATH);
const skipReal = existsSync(realRegistry) ? false : "this repository has no project registry";

test("the real registry still measures: every root it lists resolves to a canonical", { skip: skipReal }, () => {
  const digest = buildRegistryDigest({ registryPath: realRegistry, now: FIXED_NOW, bin: null });
  assert.ok(digest.projects.length > 0, "the registry lists no project at all");
  for (const project of digest.projects) {
    if (!project.measured) {
      // An absent sibling on this machine is a declared absence, not a failure of the contract.
      assert.match(project.absent_reason, /\S/, `${project.key}: not measured and gave no reason`);
      continue;
    }
    assert.match(project.canonical.roadmap, /\S/, `${project.key}: measured without a canonical path`);
    assert.ok(
      project.sources.some((source) => source.path === project.canonical.roadmap),
      `${project.key}: the canonical it named is not among the sources it fingerprinted`
    );
    assert.ok(project.runs.total > 0, `${project.key}: a canonical with no runs at all is not a measurement`);
  }
});
