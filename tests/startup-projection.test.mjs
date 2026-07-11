// Fixture-based tests for the server's startup projection
// (tools/project-console/serve-project-console.mjs).
//
// They assert that runStartupProjection() reads a projects.config.json, runs the projector
// for each listed project, and lands the resulting console snapshot at the canonical
// <repo>/.aiw/views/project_console.snapshot.json — and that a missing or invalid config is
// fail-soft (no snapshot written, no throw), matching "serve exactly as today".
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { loadProjectsConfig, runStartupProjection } from "../tools/project-console/serve-project-console.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const FIXTURE = join(HERE, "fixtures", "sample-project");
const FIXED_NOW = "2026-07-10T00:00:00.000Z";

// A fake "repo" with its own config + .aiw/views/, isolated in tmp so tests never touch the
// real repo snapshot. Returns { repoRoot, viewsDir, snapshotPath, cleanup }.
function makeFakeRepo(prefix) {
  const repoRoot = mkdtempSync(join(tmpdir(), prefix));
  const viewsDir = join(repoRoot, ".aiw", "views");
  return {
    repoRoot,
    viewsDir,
    snapshotPath: join(viewsDir, "project_console.snapshot.json"),
    roadmapPath: join(viewsDir, "roadmap.json"),
    cleanup: () => rmSync(repoRoot, { recursive: true, force: true })
  };
}

test("runStartupProjection lands the snapshot in .aiw/views/ for a configured fake project root", () => {
  const repo = makeFakeRepo("aiw-startup-");
  try {
    // Point the config at the sample-project fixture as an absolute root.
    writeFileSync(
      join(repo.repoRoot, "projects.config.json"),
      JSON.stringify({ projects: [{ root: FIXTURE, id: "sample" }] }) + "\n",
      "utf8"
    );
    const logs = [];
    const result = runStartupProjection({ repoRoot: repo.repoRoot, now: FIXED_NOW, log: (m) => logs.push(m) });

    assert.equal(result.projected.length, 1, "expected exactly one projected project");
    assert.ok(existsSync(repo.snapshotPath), "snapshot did not land in .aiw/views/");
    assert.equal(result.projected[0].path, resolve(repo.snapshotPath));

    const onDisk = JSON.parse(readFileSync(repo.snapshotPath, "utf8"));
    assert.equal(onDisk.schema_version, 1);
    assert.equal(onDisk.project_id, "sample_aiw_project"); // from the fixture config.json
    assert.equal(onDisk.generated_at, FIXED_NOW);
    // Tracks the shared sample-project fixture: 2 pending + 2 parked + 3 processed.
    assert.equal(onDisk.roadmap_tree.counts.total, 7);
  } finally {
    repo.cleanup();
  }
});

test("runStartupProjection also lands roadmap.json alongside the console snapshot", () => {
  const repo = makeFakeRepo("aiw-startup-roadmap-");
  try {
    writeFileSync(
      join(repo.repoRoot, "projects.config.json"),
      JSON.stringify({ projects: [{ root: FIXTURE, id: "sample" }] }) + "\n",
      "utf8"
    );
    const result = runStartupProjection({ repoRoot: repo.repoRoot, now: FIXED_NOW, log: () => {} });

    // Both canonical views land for the configured project.
    assert.ok(existsSync(repo.snapshotPath), "console snapshot did not land");
    assert.ok(existsSync(repo.roadmapPath), "roadmap.json did not land in .aiw/views/");
    assert.equal(result.projected.length, 1);
    assert.equal(result.projected[0].views["roadmap.json"], resolve(repo.roadmapPath));
    assert.equal(result.projected[0].views["project_console.snapshot.json"], resolve(repo.snapshotPath));

    const roadmap = JSON.parse(readFileSync(repo.roadmapPath, "utf8"));
    assert.equal(roadmap.generated_at, FIXED_NOW);
    // Roadmap flattens every objective into one queue: 2 pending + 2 parked + 3 processed = 7 runs.
    assert.equal(roadmap.objectives[0].phases[0].runs.length, 7);
  } finally {
    repo.cleanup();
  }
});

test("runStartupProjection resolves a relative project root against the repo root", () => {
  const repo = makeFakeRepo("aiw-startup-rel-");
  try {
    // A relative root (like the shipped sample's "../aiw") must resolve against repoRoot.
    const relRoot = relative(repo.repoRoot, FIXTURE);
    writeFileSync(
      join(repo.repoRoot, "projects.config.json"),
      JSON.stringify({ projects: [{ root: relRoot }] }) + "\n",
      "utf8"
    );
    const result = runStartupProjection({ repoRoot: repo.repoRoot, now: FIXED_NOW, log: () => {} });
    assert.equal(result.projected.length, 1);
    assert.equal(result.projected[0].root, resolve(FIXTURE));
    assert.ok(existsSync(repo.snapshotPath));
  } finally {
    repo.cleanup();
  }
});

test("missing projects.config.json is fail-soft: no snapshot, no throw", () => {
  const repo = makeFakeRepo("aiw-startup-missing-");
  try {
    const logs = [];
    const result = runStartupProjection({ repoRoot: repo.repoRoot, log: (m) => logs.push(m) });
    assert.deepEqual(result.projected, []);
    assert.ok(!existsSync(repo.snapshotPath), "no snapshot should be written without a config");
    assert.ok(!existsSync(repo.roadmapPath), "no roadmap should be written without a config");
    assert.ok(logs.some((m) => /without startup projection/.test(m)), "expected a fail-soft log line");
  } finally {
    repo.cleanup();
  }
});

test("invalid projects.config.json is fail-soft: no snapshot, no throw", () => {
  const repo = makeFakeRepo("aiw-startup-invalid-");
  try {
    writeFileSync(join(repo.repoRoot, "projects.config.json"), "{ not valid json", "utf8");
    const logs = [];
    const result = runStartupProjection({ repoRoot: repo.repoRoot, log: (m) => logs.push(m) });
    assert.deepEqual(result.projected, []);
    assert.ok(!existsSync(repo.snapshotPath));
    assert.ok(!existsSync(repo.roadmapPath));
    assert.ok(logs.some((m) => /invalid JSON/.test(m)));
  } finally {
    repo.cleanup();
  }
});

test("a configured project root that does not exist is skipped, not written", () => {
  const repo = makeFakeRepo("aiw-startup-nonexistent-");
  try {
    writeFileSync(
      join(repo.repoRoot, "projects.config.json"),
      JSON.stringify({ projects: [{ root: join(tmpdir(), "definitely-not-here-xyz") }] }) + "\n",
      "utf8"
    );
    const result = runStartupProjection({ repoRoot: repo.repoRoot, log: () => {} });
    assert.deepEqual(result.projected, []);
    assert.ok(!existsSync(repo.snapshotPath));
    assert.ok(!existsSync(repo.roadmapPath));
  } finally {
    repo.cleanup();
  }
});

test("loadProjectsConfig skips entries without a usable root string", () => {
  const dir = mkdtempSync(join(tmpdir(), "aiw-cfg-"));
  try {
    const cfg = join(dir, "projects.config.json");
    writeFileSync(cfg, JSON.stringify({ projects: [{ root: "../aiw" }, { id: "noroot" }, { root: "  " }, "junk"] }), "utf8");
    const parsed = loadProjectsConfig(cfg, () => {});
    assert.equal(parsed.length, 1);
    assert.equal(parsed[0].root, "../aiw");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
