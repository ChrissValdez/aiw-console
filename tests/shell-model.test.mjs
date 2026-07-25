// Pure model layer of the multi-project shell (O4.P3): registry parsing, and the
// taxonomy-driven status derivation — the shell's ONLY status derivation, executed from the
// derivation table each snapshot carries (envelope decision, O4.P2). The foreign-vocabulary
// fixture (hilo-verde) proves the shell respects a project's own tokens with zero code
// changes; the real aiw-console snapshot proves the derived tokens match what O4.P2 and
// O4.P11 measured (O0 -> active, O4 -> in_progress).
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  parseRegistry,
  projectBaseForKey,
  evaluateDerivationTable,
  deriveCollectionStatus,
  snapshotSummary,
  projectStateLine,
  projectAbsenceMessage
} from "../project-console/assets/project-shell.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");

const readJson = (path) => JSON.parse(readFileSync(path, "utf8"));
const realSnapshot = readJson(join(REPO_ROOT, ".project", "snapshot.json"));
const fixtureSnapshot = readJson(join(REPO_ROOT, "tests", "fixtures", "multi", "hilo-verde", ".project", "snapshot.json"));

// --------------------------- registry parsing ---------------------------

test("parseRegistry accepts the shipped registry shape and keeps entry order", () => {
  const shipped = readJson(join(REPO_ROOT, "project-console", "projects.json"));
  const { title, projects, errors } = parseRegistry(shipped);
  assert.equal(errors.length, 0);
  assert.equal(typeof title, "string");
  assert.ok(projects.length >= 1);
  assert.deepEqual(projects.map((p) => p.key), shipped.projects.map((p) => p.key));
});

test("parseRegistry drops bad entries with a named error instead of throwing", () => {
  const { projects, errors } = parseRegistry({
    title: "x",
    projects: [
      { key: "ok-one", root: "./a" },
      { key: "bad key with spaces", root: "./b" },
      { key: "ok-one", root: "./duplicate" },
      { key: "no-root" },
      null,
      { key: "../escape", root: "./c" }
    ]
  });
  assert.deepEqual(projects.map((p) => p.key), ["ok-one"]);
  // bad key, duplicate, missing root, null entry, and a key that is itself a traversal.
  assert.equal(errors.length, 5);
});

test("parseRegistry is fail-soft on a registry that is not a registry", () => {
  assert.deepEqual(parseRegistry(null).projects, []);
  assert.deepEqual(parseRegistry([1, 2]).projects, []);
  assert.deepEqual(parseRegistry({ projects: "nope" }).projects, []);
});

test("projectBaseForKey builds the server's virtual base and escapes the key", () => {
  assert.equal(projectBaseForKey("hilo-verde"), "/projects/hilo-verde/");
  assert.equal(projectBaseForKey("a b"), "/projects/a%20b/");
});

// --------------------------- derivation table ---------------------------

test("evaluateDerivationTable executes precedence in order (any / all / otherwise)", () => {
  const table = fixtureSnapshot.taxonomy_model.derivations.collection_status_from_runs;
  assert.equal(evaluateDerivationTable(table, ["hecho", "haciendo"]), "en_marcha");
  assert.equal(evaluateDerivationTable(table, ["hecho", "atascado"]), "atascado");
  assert.equal(evaluateDerivationTable(table, ["hecho", "hecho"]), "hecho");
  assert.equal(evaluateDerivationTable(table, ["hecho", "por_hacer"]), "empezado");
  assert.equal(evaluateDerivationTable(table, ["por_hacer"]), "pendiente");
});

test("empty input follows the table's empty_input: malformed yields NO token", () => {
  const table = fixtureSnapshot.taxonomy_model.derivations.collection_status_from_runs;
  assert.equal(evaluateDerivationTable(table, []), null);
  const projectTable = fixtureSnapshot.taxonomy_model.derivations.project_operational_status_from_runs;
  assert.equal(evaluateDerivationTable(projectTable, []), "quieto");
});

test("no table declared -> nothing derived (nothing is invented)", () => {
  assert.equal(evaluateDerivationTable(null, ["x"]), null);
  assert.equal(deriveCollectionStatus({}, "objective", ["x"]), null);
  assert.equal(deriveCollectionStatus({ vocabularies: { "objective.status": { stored: true } } }, "objective", ["x"]), null);
});

test("VOCABULARIO POR PROYECTO: the fixture's own tokens come out of ITS table", () => {
  const taxonomy = fixtureSnapshot.taxonomy_model;
  const objectives = fixtureSnapshot.roadmap_tree.objectives;
  const statusesOf = (objective) => objective.phases.flatMap((phase) => phase.runs.map((run) => run.status));
  assert.equal(deriveCollectionStatus(taxonomy, "objective", statusesOf(objectives[0])), "en_marcha");
  assert.equal(deriveCollectionStatus(taxonomy, "objective", statusesOf(objectives[1])), "hecho");
  const phases = objectives[0].phases;
  const phaseStatuses = (phase) => phase.runs.map((run) => run.status);
  assert.equal(deriveCollectionStatus(taxonomy, "phase", phaseStatuses(phases[0])), "en_marcha");
  assert.equal(deriveCollectionStatus(taxonomy, "phase", phaseStatuses(phases[1])), "empezado");
});

test("aiw-console's real snapshot derives the measured statuses (O0 active, O4 in_progress)", () => {
  const taxonomy = realSnapshot.taxonomy_model;
  const objectives = realSnapshot.roadmap_tree.objectives;
  assert.equal(objectives.length, 2);
  const statusesOf = (objective) => objective.phases.flatMap((phase) => phase.runs.map((run) => run.status));
  const derived = objectives.map((objective) => deriveCollectionStatus(taxonomy, "objective", statusesOf(objective)));
  assert.deepEqual(derived, ["active", "in_progress"]);
});

// --------------------------- snapshot summary ---------------------------

test("snapshotSummary counts by the snapshot's OWN run.status tokens, in declared order", () => {
  const summary = snapshotSummary(fixtureSnapshot);
  assert.equal(summary.projectId, "hilo_verde");
  assert.deepEqual(summary.counts, { objectives: 2, phases: 3, runs: 6 });
  assert.deepEqual(summary.runStatusCounts, [
    { token: "por_hacer", count: 1 },
    { token: "haciendo", count: 1 },
    { token: "hecho", count: 4 },
    { token: "atascado", count: 0 }
  ]);
  assert.deepEqual(summary.objectives.map((o) => o.status), ["en_marcha", "hecho"]);
  assert.equal(summary.operationalStatus, "en_marcha");
});

test("snapshotSummary on the real snapshot matches the measured 2/15/31", () => {
  const summary = snapshotSummary(realSnapshot);
  assert.equal(summary.projectId, "aiw_console");
  assert.deepEqual(summary.counts, { objectives: 2, phases: 15, runs: 31 });
  const byToken = Object.fromEntries(summary.runStatusCounts.map(({ token, count }) => [token, count]));
  assert.equal(byToken.completed, 18);
  assert.equal(byToken.active, 1);
});

test("a token present in data but missing from the declaration is reported, not hidden", () => {
  const snapshot = JSON.parse(JSON.stringify(fixtureSnapshot));
  snapshot.roadmap_tree.objectives[0].phases[0].runs[0].status = "no_declarado";
  const summary = snapshotSummary(snapshot);
  const tokens = summary.runStatusCounts.map(({ token }) => token);
  assert.ok(tokens.includes("no_declarado"));
});

test("snapshotSummary refuses a snapshot without project_id (shell marks it invalid)", () => {
  assert.equal(snapshotSummary({}), null);
  assert.equal(snapshotSummary(null), null);
  assert.equal(snapshotSummary({ project_id: "" }), null);
});

// --------------------------- menu state lines ---------------------------

test("menu state lines announce absence naming the file (§20 at shell level)", () => {
  const missing = { key: "vacio", status: "missing", summary: null };
  assert.equal(projectStateLine(missing), "no snapshot");
  assert.equal(projectAbsenceMessage(missing), "projects/vacio/.project/snapshot.json could not be loaded");
  const invalid = { key: "roto", status: "invalid", summary: null };
  assert.equal(projectStateLine(invalid), "snapshot unreadable");
  assert.equal(projectAbsenceMessage(invalid), "projects/roto/.project/snapshot.json is not a readable snapshot");
});
