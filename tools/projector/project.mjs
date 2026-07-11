// AIW Project Console — Projector v0.
//
// Given a project root in AIW format (an `objectives/` tree, a `logs/` run-evidence
// tree, and a Git repository), emits the single REQUIRED console artifact
//   <project-root>/.aiw/views/project_console.snapshot.json
// conforming to docs/snapshot-schema-v1.md (schema_version 1). This is the canonical
// path the console UI fetches (docs/project-console/assets/project-console.js).
//
// Boundaries (see objective 001):
//   - Node built-ins only. No dependencies.
//   - Reads ONLY inside the given project root (objectives/, logs/, config.json).
//   - Writes ONLY <project-root>/.aiw/views/project_console.snapshot.json (atomic temp + rename).
//     Never writes, moves, or deletes anything outside <project-root>/.aiw/.
//   - Fail-soft: a missing objectives/ or logs/ tree yields empty groups, never an error.
//   - Git history is optional §3 enrichment produced by build-git-history-snapshot.mjs,
//     not this file; the required snapshot does not depend on Git being present.

import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  writeFileSync
} from "node:fs";
import { basename, dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

export const SCHEMA_VERSION = 1;
export const PROJECTOR_VERSION = "0.1.0";
export const GENERATED_FROM = `aiw-projector@${PROJECTOR_VERSION}`;
export const SNAPSHOT_RELATIVE_PATH = join(".aiw", "views", "project_console.snapshot.json");
// Optional emitted view (§3 enrichment): the console's Roadmap tab reads this file
// (Roadmap v3 model, `v3Model()` in docs/project-console/assets/project-console.js).
export const ROADMAP_RELATIVE_PATH = join(".aiw", "views", "roadmap.json");

// The three AIW objective lifecycle folders, in operator reading order.
const OBJECTIVE_CLASSIFICATIONS = ["pending", "parked", "processed"];
// One-line operator status values the UI groups/colours by.
const OPERATIONAL_STATUSES = ["active", "blocked", "idle"];

// Roadmap-v3 run statuses the console recognises (ROADMAP_V3_STATUS_TONES). The console
// derives the Now/Ready Next/Later/History queue groups from status + depends_on
// (`v3QueueGroupKey`); it never reads a persisted group field, so we emit none.
const ROADMAP_RUN_STATUSES = ["planned", "active", "completed", "blocked"];
// processed/<PREFIX>-*.md → a terminal run status. Anything not listed as a negative
// outcome (including APPROVED- and no prefix) is treated as a successful completion.
const PROCESSED_STATUS_BY_PREFIX = {
  REJECTED: "blocked",
  BLOCKED: "blocked",
  FAILED: "blocked",
  CANCELLED: "blocked"
};

function safeReadText(filePath) {
  try {
    return readFileSync(filePath, "utf8");
  } catch {
    return "";
  }
}

function safeReadDirNames(dirPath, opts = {}) {
  if (!existsSync(dirPath)) return [];
  try {
    const entries = readdirSync(dirPath, { withFileTypes: true });
    return entries
      .filter((entry) => (opts.dirsOnly ? entry.isDirectory() : entry.isFile()))
      .map((entry) => entry.name)
      .sort();
  } catch {
    return [];
  }
}

// First Markdown H1 as the human title, else the id.
function titleFromMarkdown(body, fallback) {
  const match = body.match(/^#\s+(.+?)\s*$/m);
  return match ? match[1].trim() : fallback;
}

// Read objectives/{pending,parked,processed}/*.md into flat objective records.
function readObjectives(root) {
  const objectivesDir = join(root, "objectives");
  const objectives = [];
  for (const classification of OBJECTIVE_CLASSIFICATIONS) {
    const dir = join(objectivesDir, classification);
    for (const name of safeReadDirNames(dir)) {
      if (!name.toLowerCase().endsWith(".md")) continue;
      const id = name.replace(/\.md$/i, "");
      const body = safeReadText(join(dir, name));
      objectives.push({
        id,
        title: titleFromMarkdown(body, id),
        classification,
        source: `objectives/${classification}/${name}`
      });
    }
  }
  return objectives;
}

// First non-empty line of the body after the H1 title, as a one-line summary.
function summaryFromMarkdown(body, fallback) {
  const lines = body.split(/\r?\n/);
  let seenTitle = false;
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    if (!seenTitle && /^#\s+/.test(line)) {
      seenTitle = true;
      continue;
    }
    if (/^#{1,6}\s+/.test(line)) continue; // skip further headings
    return line;
  }
  return fallback;
}

// Read objectives/{pending,parked,processed}/*.md into detailed records (title,
// summary, full body, and — for processed — the UPPERCASE filename status prefix).
function readObjectiveDetails(root) {
  const objectivesDir = join(root, "objectives");
  const byClassification = { pending: [], parked: [], processed: [] };
  for (const classification of OBJECTIVE_CLASSIFICATIONS) {
    const dir = join(objectivesDir, classification);
    for (const name of safeReadDirNames(dir)) {
      if (!name.toLowerCase().endsWith(".md")) continue;
      const id = name.replace(/\.md$/i, "");
      const body = safeReadText(join(dir, name));
      const prefixMatch = id.match(/^([A-Z][A-Z0-9]*)-/);
      byClassification[classification].push({
        id,
        title: titleFromMarkdown(body, id),
        summary: summaryFromMarkdown(body, `Objective ${id}.`),
        full_description: body.trim(),
        classification,
        prefix: prefixMatch ? prefixMatch[1] : null,
        source: `objectives/${classification}/${name}`
      });
    }
  }
  return byClassification;
}

// Build the Roadmap-v3 view the console's Roadmap tab reads. Mapping (per objective 003):
//   pending/*   → first alphabetical = active (Now); the rest = planned (Ready Next)
//   parked/*    → planned, waiting on the pending queue → Later
//   processed/* → terminal (completed / blocked from the filename prefix) → History
// AIW has no phase tree, so all runs live under a single objective/phase container; the
// console flattens runs across objectives for the queue groups, so the shape is faithful.
export function buildRoadmap(root, opts = {}) {
  const config = readConfig(root);
  const projectId = readProjectId(root, config);
  const { pending, parked, processed } = readObjectiveDetails(root);

  // depends_on target for parked runs: the pending run ids. The Now run is `active`
  // (never `completed`), so the dependency is unsatisfied → the console files parked
  // runs under Later. With no pending objectives this list is empty (parked would then
  // read as Ready Next — the degenerate "nothing ahead of it" case).
  const pendingIds = pending.map((o) => o.id);

  let queueOrder = 0;
  const runs = [];

  pending.forEach((objective, index) => {
    runs.push({
      run_id: objective.id,
      queue_order: ++queueOrder,
      title: objective.title,
      summary: objective.summary,
      full_description: objective.full_description,
      status: index === 0 ? "active" : "planned",
      depends_on: []
    });
  });

  parked.forEach((objective) => {
    runs.push({
      run_id: objective.id,
      queue_order: ++queueOrder,
      title: objective.title,
      summary: objective.summary,
      full_description: objective.full_description,
      status: "planned",
      depends_on: [...pendingIds]
    });
  });

  processed.forEach((objective) => {
    const status = objective.prefix
      ? PROCESSED_STATUS_BY_PREFIX[objective.prefix] || "completed"
      : "completed";
    runs.push({
      run_id: objective.id,
      queue_order: ++queueOrder,
      title: objective.title,
      summary: objective.summary,
      full_description: objective.full_description,
      status,
      depends_on: [],
      closeout_result: objective.prefix ? objective.prefix.toLowerCase() : "completed"
    });
  });

  return {
    generated_at: opts.now || new Date().toISOString(),
    generated_from: GENERATED_FROM,
    objectives: [
      {
        title: projectId,
        summary: `${runs.length} AIW objectives (pending, parked, processed).`,
        phases: [
          {
            title: "Objective queue",
            runs
          }
        ]
      }
    ]
  };
}

// Mirror of the console's `v3QueueGroupKey`: derive an objective's queue group from a
// run's status + depends_on exactly as the Roadmap tab does. Used by tests to assert the
// mapping rules against the console's own grouping logic; not part of the emitted view.
export function roadmapQueueGroup(run, runsById) {
  if (run.status === "active") return "now";
  if (run.status === "planned") {
    const ready = (run.depends_on || []).every((id) => runsById.get(id)?.status === "completed");
    return ready ? "ready_next" : "later";
  }
  return "history";
}

// Read logs/<run-id>/ run-evidence folders into flat run records.
function readRuns(root) {
  const logsDir = join(root, "logs");
  const runs = [];
  for (const id of safeReadDirNames(logsDir, { dirsOnly: true })) {
    const runDir = join(logsDir, id);
    runs.push({
      id,
      has_summary: existsSync(join(runDir, "summary.md")),
      source: `logs/${id}`
    });
  }
  return runs;
}

// project_id from config.json when it declares one, else the root folder name
// normalized to a stable slug.
function readProjectId(root, config) {
  if (config && typeof config.project_id === "string" && config.project_id) {
    return config.project_id;
  }
  const slug = basename(resolve(root))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return slug || "aiw_project";
}

function readConfig(root) {
  const configPath = join(root, "config.json");
  if (!existsSync(configPath)) return null;
  try {
    return JSON.parse(readFileSync(configPath, "utf8"));
  } catch {
    return null;
  }
}

// Build the snapshot object from the project root. Pure read: touches nothing on disk.
// opts.now: injected ISO timestamp (defaults to current time) so callers/tests are deterministic.
export function buildSnapshot(root, opts = {}) {
  const config = readConfig(root);
  const objectives = readObjectives(root);
  const runs = readRuns(root);

  const pending = objectives.filter((o) => o.classification === "pending");
  const parked = objectives.filter((o) => o.classification === "parked");
  const processed = objectives.filter((o) => o.classification === "processed");

  const operationalStatus = pending.length > 0 ? "active" : "idle";

  const projectId = readProjectId(root, config);
  const projectSummary =
    (config && typeof config.summary === "string" && config.summary) ||
    (config && typeof config.description === "string" && config.description) ||
    `AIW project ${projectId}: ${objectives.length} objectives, ${runs.length} recorded runs.`;

  let currentStatusSummary;
  if (pending.length > 0) {
    currentStatusSummary = `Next objective: ${pending[0].id}${pending.length > 1 ? ` (+${pending.length - 1} more pending)` : ""}.`;
  } else if (runs.length > 0) {
    currentStatusSummary = `No pending objectives; last recorded run ${runs[runs.length - 1].id}.`;
  } else {
    currentStatusSummary = "No pending objectives and no recorded runs.";
  }

  return {
    schema_version: SCHEMA_VERSION,
    project_id: projectId,
    generated_at: opts.now || new Date().toISOString(),
    generated_from: GENERATED_FROM,
    operational_status: operationalStatus,
    project_summary: projectSummary,
    current_status_summary: currentStatusSummary,
    roadmap_tree: {
      model: "aiw_flat_objectives_v1",
      counts: {
        pending: pending.length,
        parked: parked.length,
        processed: processed.length,
        total: objectives.length
      },
      objectives
    },
    blockers: [],
    followups: [],
    no_claims_summary: {},
    validation_summary: {},
    taxonomy_model: {
      objective_classifications: OBJECTIVE_CLASSIFICATIONS,
      operational_statuses: OPERATIONAL_STATUSES
    }
  };
}

// Resolve <root>/<relativePath> and prove it lives inside <root>/.aiw/. Throws otherwise
// so the projector can never write outside the project root's .aiw/.
function resolveInsideAiw(root, relativePath) {
  const aiwDir = resolve(root, ".aiw");
  const outPath = resolve(root, relativePath);
  const rel = relative(aiwDir, outPath);
  if (rel.startsWith("..") || rel.includes("..") || rel.startsWith(sep) || resolve(aiwDir, rel) !== outPath) {
    throw new Error(`Refusing to write outside ${aiwDir}: ${outPath}`);
  }
  return { aiwDir, outPath };
}

export function resolveSnapshotPath(root) {
  return resolveInsideAiw(root, SNAPSHOT_RELATIVE_PATH);
}

export function resolveRoadmapPath(root) {
  return resolveInsideAiw(root, ROADMAP_RELATIVE_PATH);
}

// Atomically write `data` (pretty JSON) to `outPath`, creating parent dirs first.
function writeJsonAtomic(outPath, data) {
  mkdirSync(dirname(outPath), { recursive: true });
  const tmp = `${outPath}.tmp`;
  writeFileSync(tmp, JSON.stringify(data, null, 2) + "\n", "utf8");
  renameSync(tmp, outPath);
}

// Build and atomically write the Roadmap-v3 view to <root>/.aiw/views/roadmap.json.
// Returns { ok, path, roadmap }.
export function writeRoadmap(root, opts = {}) {
  const roadmap = buildRoadmap(root, opts);
  const { outPath } = resolveRoadmapPath(root);
  writeJsonAtomic(outPath, roadmap);
  return { ok: true, path: outPath, roadmap };
}

// Build and atomically write the snapshot to <root>/.aiw/views/project_console.snapshot.json,
// and emit the optional Roadmap-v3 view alongside it. Returns { ok, path, snapshot,
// roadmap, roadmapPath }.
export function writeSnapshot(root, opts = {}) {
  const snapshot = buildSnapshot(root, opts);
  const { outPath } = resolveSnapshotPath(root);
  writeJsonAtomic(outPath, snapshot);
  const roadmapResult = writeRoadmap(root, opts);
  return {
    ok: true,
    path: outPath,
    snapshot,
    roadmap: roadmapResult.roadmap,
    roadmapPath: roadmapResult.path
  };
}

// CLI entry: `node tools/projector/project.mjs [project-root]` (defaults to cwd).
const invokedDirectly = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  const root = resolve(process.argv[2] || process.cwd());
  try {
    const result = writeSnapshot(root);
    console.log(
      `[projector] wrote ${result.path} — project=${result.snapshot.project_id}; ` +
      `status=${result.snapshot.operational_status}; objectives=${result.snapshot.roadmap_tree.counts.total}`
    );
    console.log(`[projector] wrote ${result.roadmapPath} — Roadmap view (${result.roadmap.objectives[0].phases[0].runs.length} runs)`);
    process.exit(0);
  } catch (error) {
    console.error(`[projector] failed: ${String(error.message || error)}`);
    process.exit(1);
  }
}
