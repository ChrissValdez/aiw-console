// The transplanted roadmap engine (O4.P12): tools/roadmap/roadmap-core.mjs + roadmap-plan.mjs,
// copied byte-for-byte from the source project's tooling and then touched in exactly the places
// the phase record enumerates. These tests pin the four properties the transplant must hold:
//
//   1. BYTE-EXACT round-trip against BOTH real canonical roadmaps (read-only): parse + serialize
//      with the file's own detected line endings reproduces each file byte-identical. This is
//      the property that makes "an edit changes only what the operation changed" true.
//   2. ADMISSION BY SHAPE, never by schema-name string: the same structure under two different
//      schema_version identifiers plans identically; a tree of another SHAPE is refused.
//   3. CONTRATO §10.d external dependencies: an id declared by another registered project's
//      tree is legal (supplied to the engine as DATA — a set, never a name), an id declared
//      nowhere is dangling, and the pre-flight refuses a file only for the latter.
//   4. Invariants and atomicity: queue_order stays dense/unique/contiguous, no id is ever
//      renumbered, a violating edit is refused at dry-run (nothing written), and a write whose
//      post-write re-check fails is rolled back to the previous bytes.
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import * as core from "../tools/roadmap/roadmap-core.mjs";
import { planEdit, applyPlan, loadCurrent, computeBaseline, KNOWN_OPS } from "../tools/roadmap/roadmap-plan.mjs";
import { detectRootLayout, flattenRoadmapTree } from "../tools/projector/project.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const SIBLING_ROOT = resolve(REPO_ROOT, "..", "cantu-studio");

// ---------------------------------------------------------------- fixtures

// A minimal conforming tree. `schemaName` is the whole point: the SAME structure is exercised
// under different identifiers to prove no gate compares the string.
function fixtureTree(schemaName) {
  return {
    schema_version: schemaName,
    roadmap_id: "roadmap",
    title: "Fixture roadmap",
    objectives: [
      {
        objective_id: "OF-1",
        title: "Primer objetivo",
        phases: [
          {
            phase_id: "OF-1.P1",
            title: "Fase uno",
            runs: [
              { run_id: "RUN-FIX-UNO-001", queue_order: 1, title: "Uno", summary: "s", full_description: "f", status: "completed", depends_on: [] },
              { run_id: "RUN-FIX-DOS-001", queue_order: 2, title: "Dos", summary: "s", full_description: "f", status: "active", depends_on: ["RUN-FIX-UNO-001"] },
              { run_id: "RUN-FIX-TRES-001", queue_order: 3, title: "Tres", summary: "s", full_description: "f", status: "planned", depends_on: ["RUN-FIX-DOS-001"] }
            ]
          }
        ]
      }
    ]
  };
}

let workDir = "";

function writeFixtureFile(name, tree, eol) {
  const filePath = join(workDir, name);
  writeFileSync(filePath, core.serialize(tree, eol), "utf8");
  return filePath;
}

test.before(() => {
  workDir = mkdtempSync(join(tmpdir(), "roadmap-engine-"));
});

test.after(() => {
  rmSync(workDir, { recursive: true, force: true });
});

// ---------------------------------------------------------------- 1. byte-exact round-trip

// The two REAL canonical roadmaps, read-only. They differ in layout, in schema identifier and
// in line endings (one LF, one CRLF) — measured, which is why serialize() takes the file's own
// detected EOL. If either assertion ever fails, an edit of that file would churn bytes the
// operation never touched.
const REAL_ROOTS = [REPO_ROOT, SIBLING_ROOT].filter((root) => detectRootLayout(root));

test("round-trip: parse + serialize(detectEol) reproduces every real canonical byte-identical", () => {
  assert.ok(REAL_ROOTS.length >= 1, "at least this repository must resolve a layout");
  for (const root of REAL_ROOTS) {
    const layout = detectRootLayout(root);
    const raw = readFileSync(resolve(root, layout.paths.roadmap), "utf8");
    const eol = core.detectEol(raw);
    assert.equal(core.serialize(core.parseRoadmap(raw), eol), raw, `round-trip failed for ${layout.paths.roadmap} of ${root}`);
  }
});

test("round-trip: the two real canonicals do NOT share a line-ending convention (why detectEol exists)", { skip: existsSync(SIBLING_ROOT) ? false : "sibling project not present" }, () => {
  const eols = REAL_ROOTS.map((root) => {
    const layout = detectRootLayout(root);
    return core.detectEol(readFileSync(resolve(root, layout.paths.roadmap), "utf8"));
  });
  assert.deepEqual(new Set(eols).size, 2, "both real roadmaps now share one EOL; the parameter is no longer load-bearing (update the record, keep the test)");
});

// ---------------------------------------------------------------- 2. admission by shape

test("shape not name: the same structure plans identically under two schema identifiers", () => {
  const a = writeFixtureFile("shape-a.json", fixtureTree("roadmap_tree_v1"), "\n");
  const b = writeFixtureFile("shape-b.json", fixtureTree("jame.roadmap_v3.v0.2-progress"), "\n");
  for (const filePath of [a, b]) {
    const plan = planEdit({ filePath, op: "set-text", args: { targetType: "run", targetId: "RUN-FIX-TRES-001", title: "Tres renombrado" } });
    assert.equal(plan.ok, true, `plan refused for ${filePath}: ${plan.errors.join(" | ")}`);
  }
});

test("shape not name: a tree of another SHAPE is refused at pre-flight, whatever it calls itself", () => {
  const alien = fixtureTree("roadmap_tree_v1");
  alien.portfolio = { invented: true }; // root field outside the allowlist
  delete alien.objectives[0].phases[0].runs[0].status; // run missing a required field
  const filePath = writeFixtureFile("shape-bad.json", alien, "\n");
  const plan = planEdit({ filePath, op: "set-text", args: { targetType: "run", targetId: "RUN-FIX-TRES-001", title: "x" } });
  assert.equal(plan.ok, false);
  assert.equal(plan.stage, "preflight");
  assert.ok(plan.errors.some((e) => e.includes("unexpected field portfolio")));
  assert.ok(plan.errors.some((e) => e.includes("missing required field status")));
});

// ---------------------------------------------------------------- 3. external dependencies (§10.d)

test("external deps: an id declared by another registered project is legal; one declared nowhere is dangling", () => {
  const tree = fixtureTree("roadmap_tree_v1");
  tree.objectives[0].phases[0].runs[2].depends_on = ["RUN-FIX-DOS-001", "RUN-OTRO-PROYECTO-001"];
  const filePath = writeFixtureFile("external-dep.json", tree, "\n");

  // Without the set: the pre-flight refuses the whole file.
  const closed = planEdit({ filePath, op: "set-text", args: { targetType: "run", targetId: "RUN-FIX-UNO-001", title: "x" } });
  assert.equal(closed.ok, false);
  assert.equal(closed.stage, "preflight");
  assert.ok(closed.errors.some((e) => e.includes("dangling dependency")));

  // With the set (data handed in by the caller): the same file plans.
  const external = new Set(["RUN-OTRO-PROYECTO-001"]);
  const open = planEdit({ filePath, op: "set-text", args: { targetType: "run", targetId: "RUN-FIX-UNO-001", title: "x" }, externalRunIds: external });
  assert.equal(open.ok, true, open.errors.join(" | "));

  // An id in NEITHER place stays an error even with the set supplied.
  tree.objectives[0].phases[0].runs[2].depends_on = ["RUN-DE-NADIE-001"];
  const nowhereFile = writeFixtureFile("external-dep-nowhere.json", tree, "\n");
  const nowhere = planEdit({ filePath: nowhereFile, op: "set-text", args: { targetType: "run", targetId: "RUN-FIX-UNO-001", title: "x" }, externalRunIds: external });
  assert.equal(nowhere.ok, false);
  assert.ok(nowhere.errors.some((e) => e.includes("RUN-DE-NADIE-001")));
});

test("external deps: set-deps accepts an external id with a warning, refuses an unknown one", () => {
  const filePath = writeFixtureFile("external-setdeps.json", fixtureTree("roadmap_tree_v1"), "\n");
  const external = new Set(["RUN-OTRO-PROYECTO-001"]);
  const accepted = planEdit({ filePath, op: "set-deps", args: { run: "RUN-FIX-TRES-001", dependsOn: ["RUN-FIX-DOS-001", "RUN-OTRO-PROYECTO-001"] }, externalRunIds: external });
  assert.equal(accepted.ok, true, accepted.errors.join(" | "));
  assert.ok(accepted.warnings.some((w) => w.includes("external")));
  const refused = planEdit({ filePath, op: "set-deps", args: { run: "RUN-FIX-TRES-001", dependsOn: ["RUN-DE-NADIE-001"] }, externalRunIds: external });
  assert.equal(refused.ok, false);
});

test("external deps: BOTH real canonicals pass pre-flight when each is given the other's run ids", { skip: existsSync(SIBLING_ROOT) ? false : "sibling project not present" }, () => {
  const layouts = new Map(REAL_ROOTS.map((root) => [root, detectRootLayout(root)]));
  for (const root of REAL_ROOTS) {
    const external = new Set();
    for (const [otherRoot, otherLayout] of layouts) {
      if (otherRoot === root) continue;
      for (const { run } of flattenRoadmapTree(otherLayout.tree)) external.add(run.run_id);
    }
    const layout = layouts.get(root);
    const firstRun = flattenRoadmapTree(layout.tree)[0].run.run_id;
    const plan = planEdit({
      filePath: resolve(root, layout.paths.roadmap),
      op: "set-text",
      args: { targetType: "run", targetId: firstRun, title: "PROBE dry-run only" },
      externalRunIds: external
    });
    assert.equal(plan.ok, true, `${root}: ${plan.errors.join(" | ")}`);
  }
});

// ---------------------------------------------------------------- 4. invariants + atomicity

test("invariants: a move that would invert a dependency is refused at dry-run; nothing is written", () => {
  const filePath = writeFixtureFile("inversion.json", fixtureTree("roadmap_tree_v1"), "\n");
  const before = readFileSync(filePath, "utf8");
  // RUN-FIX-UNO-001 is depended on by DOS; moving it to the end puts it after its dependent.
  const plan = planEdit({ filePath, op: "move", args: { run: "RUN-FIX-UNO-001", toOrder: 3 } });
  assert.equal(plan.ok, false);
  assert.ok(plan.errors.some((e) => e.includes("must depend only on earlier runs")));
  assert.equal(readFileSync(filePath, "utf8"), before, "a refused dry-run must leave the file untouched");
});

test("invariants: queue_order stays dense/unique/contiguous through insert and remove, and no surviving id is renumbered", () => {
  const filePath = writeFixtureFile("dense.json", fixtureTree("roadmap_tree_v1"), "\n");
  const inserted = planEdit({
    filePath,
    op: "insert",
    args: { runId: "RUN-FIX-NUEVO-001", title: "Nuevo", summary: "s", fullDescription: "f", after: "RUN-FIX-UNO-001" }
  });
  assert.equal(inserted.ok, true, inserted.errors.join(" | "));
  const tree = core.parseRoadmap(inserted.serialized);
  const orders = flattenRoadmapTree(tree).map(({ run }) => run.queue_order).sort((a, b) => a - b);
  assert.deepEqual(orders, [1, 2, 3, 4]);
  assert.deepEqual(core.checkInvariants(tree), []);
  // Identity: the three original ids all survive, exactly once, under their original names.
  const ids = flattenRoadmapTree(tree).map(({ run }) => run.run_id);
  for (const id of ["RUN-FIX-UNO-001", "RUN-FIX-DOS-001", "RUN-FIX-TRES-001", "RUN-FIX-NUEVO-001"]) {
    assert.equal(ids.filter((x) => x === id).length, 1, `id ${id} must appear exactly once`);
  }
  // Remove closes the hole it opens: write the inserted state, remove the new run, re-check.
  writeFileSync(filePath, inserted.serialized, "utf8");
  const removed = planEdit({ filePath, op: "remove", args: { run: "RUN-FIX-NUEVO-001" } });
  assert.equal(removed.ok, true, removed.errors.join(" | "));
  const after = core.parseRoadmap(removed.serialized);
  assert.deepEqual(flattenRoadmapTree(after).map(({ run }) => run.queue_order).sort((a, b) => a - b), [1, 2, 3]);
  assert.deepEqual(core.checkInvariants(after), []);
});

test("invariants: the identity guard refuses a mutation that clobbers a run_id", () => {
  const tree = fixtureTree("roadmap_tree_v1");
  const beforeIds = core.collectIds(tree);
  tree.objectives[0].phases[0].runs[0].run_id = "RUN-FIX-RENOMBRADO-001"; // what no sanctioned op ever does
  const errors = core.checkIdentityPreserved(beforeIds, core.collectIds(tree), {});
  assert.ok(errors.some((e) => e.includes("RUN-FIX-RENOMBRADO-001")));
  assert.ok(errors.some((e) => e.includes("RUN-FIX-UNO-001")));
});

test("EOL preservation: an edit of an LF file stays LF, an edit of a CRLF file stays CRLF", () => {
  for (const [eol, label] of [["\n", "lf"], ["\r\n", "crlf"]]) {
    const filePath = writeFixtureFile(`eol-${label}.json`, fixtureTree("roadmap_tree_v1"), eol);
    const plan = planEdit({ filePath, op: "set-text", args: { targetType: "objective", targetId: "OF-1", title: "Retitulado" } });
    assert.equal(plan.ok, true);
    assert.equal(plan.eol, eol);
    const hasCrlf = plan.serialized.includes("\r\n");
    assert.equal(hasCrlf, eol === "\r\n", `serialized output must keep ${label} endings`);
  }
});

test("atomicity: a write whose post-write re-check fails is rolled back to the previous bytes", () => {
  const filePath = writeFixtureFile("rollback.json", fixtureTree("roadmap_tree_v1"), "\n");
  const before = readFileSync(filePath, "utf8");
  const plan = planEdit({ filePath, op: "set-text", args: { targetType: "objective", targetId: "OF-1", title: "Nunca debe quedar" } });
  assert.equal(plan.ok, true);
  const result = applyPlan({ filePath, serialized: plan.serialized, validate: () => ({ code: 1, output: "forced failure" }) });
  assert.equal(result.written, false);
  assert.equal(result.rolledBack, true);
  assert.equal(readFileSync(filePath, "utf8"), before, "the canonical must be byte-identical to its pre-write state");
  // No temp file may survive next to the target.
  const leftovers = readdirSync(workDir).filter((name) => name.includes(".tmp-"));
  assert.deepEqual(leftovers, []);
});

test("atomicity: a passing re-check leaves the new bytes in place and reports the backup", () => {
  const filePath = writeFixtureFile("commit.json", fixtureTree("roadmap_tree_v1"), "\n");
  const plan = planEdit({ filePath, op: "set-text", args: { targetType: "objective", targetId: "OF-1", title: "Debe quedar" } });
  assert.equal(plan.ok, true);
  const result = applyPlan({ filePath, serialized: plan.serialized, validate: () => ({ code: 0, output: "ok" }) });
  assert.equal(result.written, true);
  assert.equal(result.rolledBack, false);
  assert.equal(readFileSync(filePath, "utf8"), plan.serialized);
  assert.equal(loadCurrent(filePath).baseline, computeBaseline(plan.serialized));
});

test("the op vocabulary is the transplanted one, unchanged", () => {
  assert.deepEqual(
    KNOWN_OPS,
    ["insert", "move", "remove", "swap", "set-text", "set-deps", "set-status", "clear-progress", "move-objective", "set-objective-archived", "create-phase", "delete-phase", "create-objective", "delete-objective", "batch"]
  );
});
