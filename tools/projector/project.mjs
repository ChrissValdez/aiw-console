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
// A `planned` run reaches the console's Later group ONLY when it has ≥1 unsatisfied
// dependency (v3QueueGroupKey, pc.js:2654-2655). Parked objectives are deferred behind
// the pending queue; they depend on the pending run ids so the never-`completed` Now run
// keeps them Later. When there are no pending objectives, they depend on this sentinel
// instead — it matches no run_id, so `runsById.get(sentinel)` is undefined and the
// dependency is unsatisfied, keeping parked runs in Later rather than Ready Next.
const PARKED_QUEUE_SENTINEL = "__pending_queue__";
// processed/<PREFIX>-*.md → a terminal run status. Anything not listed as a negative
// outcome (including APPROVED- and no prefix) is treated as a successful completion.
// ERROR- and HUMAN_REVIEW- runs must NOT read as clean green completions: the reader's
// only non-green terminal icon is `blocked` (v3TerminalIcon, pc.js:2625-2626), so they
// map to `blocked` with their real outcome preserved in closeout_result.
const PROCESSED_STATUS_BY_PREFIX = {
  REJECTED: "blocked",
  BLOCKED: "blocked",
  FAILED: "blocked",
  CANCELLED: "blocked",
  ERROR: "blocked",
  HUMAN_REVIEW: "blocked"
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

// AIW objective files lead with a `# Project` H1 (the project name) then a `# Objective`
// section holding the actual objective prose. Return the trimmed text between the
// `# Objective` heading and the next heading, or null when the file has no such heading
// (older/flat objective files that carry the objective directly in their H1).
function objectiveSectionBody(body) {
  let inSection = false;
  const collected = [];
  for (const raw of body.split(/\r?\n/)) {
    if (/^#{1,6}\s+/.test(raw.trim())) {
      if (inSection) break; // the next heading closes the Objective section
      if (/^#\s+objective\s*$/i.test(raw.trim())) inSection = true;
      continue;
    }
    if (inSection) collected.push(raw);
  }
  return inSection ? collected.join("\n").trim() : null;
}

// First sentence of a block of prose: collapse whitespace and cut at the first sentence
// terminator (., !, ?), keeping it. Returns the whole text when it has no terminator.
function firstSentence(prose) {
  const normalized = prose.replace(/\s+/g, " ").trim();
  if (!normalized) return "";
  const match = normalized.match(/^(.*?[.!?])(?:\s|$)/);
  return match ? match[1].trim() : normalized;
}

// Roadmap run title: the first non-empty line under the objective file's `# Objective`
// heading (NOT the `# Project` H1). Falls back to the H1 for flat objective files that
// have no `# Objective` section. Reader consumes this at pc.js:2812.
function roadmapTitle(body, fallbackId) {
  const section = objectiveSectionBody(body);
  if (section) {
    const firstLine = section.split(/\r?\n/).map((l) => l.trim()).find(Boolean);
    if (firstLine) return firstLine;
  }
  return titleFromMarkdown(body, fallbackId);
}

// Roadmap run summary: the first sentence of the objective body under `# Objective` (NOT
// the project-name line). Falls back to the first post-H1 line for flat objective files.
// Reader consumes this at pc.js:2813.
function roadmapSummary(body, fallbackId) {
  const section = objectiveSectionBody(body);
  if (section) {
    const sentence = firstSentence(section);
    if (sentence) return sentence;
  }
  return summaryFromMarkdown(body, `Objective ${fallbackId}.`);
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
      // Include `_` so underscore prefixes like HUMAN_REVIEW- are captured whole
      // (not truncated to HUMAN); the trailing `-` still bounds the prefix.
      const prefixMatch = id.match(/^([A-Z][A-Z0-9_]*)-/);
      byClassification[classification].push({
        id,
        title: roadmapTitle(body, id),
        summary: roadmapSummary(body, id),
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
  // runs under Later. With no pending objectives, fall back to PARKED_QUEUE_SENTINEL so
  // parked runs still carry an unsatisfied dependency and stay in Later (the reader's
  // only route there, pc.js:2654-2655) rather than degenerating into Ready Next.
  const pendingIds = pending.map((o) => o.id);
  const parkedDependsOn = pendingIds.length ? pendingIds : [PARKED_QUEUE_SENTINEL];

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
      depends_on: [...parkedDependsOn]
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

// Pull a single labelled metadata field out of a run summary.md body. Tolerates
// Markdown list bullets (`- State: …`) and bold wrappers (`**State:** …`), returning
// the trimmed first capture or null when the field is absent. Honest by construction:
// a field that is not written is not derived.
function matchSummaryField(body, labelPattern) {
  const re = new RegExp(
    `^\\s*[-*]?\\s*(?:\\*\\*)?\\s*(?:${labelPattern})\\s*(?:\\*\\*)?\\s*[:=]\\s*(?:\\*\\*)?\\s*(.+?)\\s*(?:\\*\\*)?\\s*$`,
    "im"
  );
  const match = body.match(re);
  return match ? match[1].trim() : null;
}

// First narrative line of a run summary.md: skips the H1/headings and the labelled
// metadata lines (state/rounds/completed) so the human summary is the prose, not a field.
function firstNarrativeLine(body) {
  const metaLabel = /^\s*[-*]?\s*(?:\*\*)?\s*(?:final\s+state|state|result|outcome|rounds?|completed(?:\s+at)?|finished(?:\s+at)?|timestamp|date|when)\s*(?:\*\*)?\s*[:=]/i;
  for (const raw of body.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    if (/^#{1,6}\s+/.test(line)) continue; // heading
    if (metaLabel.test(line)) continue; // labelled metadata
    return line.replace(/^[-*]\s+/, "").trim();
  }
  return "";
}

// Read logs/<run-id>/ run-evidence folders into per-run history records, parsing the
// optional summary.md for final state, round count and completion timestamp. Every parsed
// field is fail-soft: absent or unparseable → the field is OMITTED, never invented. Returns
// records in ascending run-id (directory) order — oldest first, newest last.
function readRunHistory(root) {
  const logsDir = join(root, "logs");
  const runs = [];
  for (const id of safeReadDirNames(logsDir, { dirsOnly: true })) {
    const summaryPath = join(logsDir, id, "summary.md");
    const hasSummary = existsSync(summaryPath);
    const body = hasSummary ? safeReadText(summaryPath) : "";

    const stateRaw = matchSummaryField(body, "final\\s+state|state|result|outcome");
    const state = stateRaw ? stateRaw.split(/\s+/)[0].toUpperCase() : null;

    const roundsRaw = matchSummaryField(body, "rounds?");
    const rounds = roundsRaw && /^\d+$/.test(roundsRaw) ? Number(roundsRaw) : null;

    const timestampRaw = matchSummaryField(body, "completed(?:\\s+at)?|finished(?:\\s+at)?|timestamp|date|when");
    const timestamp = timestampRaw && !Number.isNaN(Date.parse(timestampRaw)) ? timestampRaw : null;

    let summary = firstNarrativeLine(body);
    if (!summary) {
      const bits = [];
      if (state) bits.push(state);
      if (rounds != null) bits.push(`${rounds} round${rounds === 1 ? "" : "s"}`);
      summary = bits.length ? `Run ${id}: ${bits.join(", ")}.` : `Run ${id}.`;
    }

    runs.push({
      id,
      has_summary: hasSummary,
      source: hasSummary ? `logs/${id}/summary.md` : `logs/${id}`,
      state,
      rounds,
      timestamp,
      summary
    });
  }
  return runs;
}

// Project the run history into the console's optional `latest_history_items` group
// (docs/snapshot-schema-v1.md §3; consumed by `historyItems()` in
// docs/project-console/assets/project-console.js). Each entry carries the reader-required
// fields (type, id, summary, source_refs) plus the honestly-derived run fields — state,
// rounds, timestamp — which are OMITTED per-field when they could not be parsed.
function latestHistoryItems(runHistory) {
  return runHistory.map((run) => {
    const item = { type: "RUN", id: run.id };
    if (run.state) item.state = run.state;
    if (run.rounds != null) item.rounds = run.rounds;
    if (run.timestamp) item.timestamp = run.timestamp;
    item.summary = run.summary;
    item.source_refs = [run.source];
    return item;
  });
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
  const runs = readRunHistory(root);

  const pending = objectives.filter((o) => o.classification === "pending");
  const parked = objectives.filter((o) => o.classification === "parked");
  const processed = objectives.filter((o) => o.classification === "processed");

  const operationalStatus = pending.length > 0 ? "active" : "idle";

  const projectId = readProjectId(root, config);
  const projectSummary =
    (config && typeof config.summary === "string" && config.summary) ||
    (config && typeof config.description === "string" && config.description) ||
    `AIW project ${projectId}: ${objectives.length} objectives, ${runs.length} recorded runs.`;

  const lastRun = runs.length > 0 ? runs[runs.length - 1] : null;
  let currentStatusSummary;
  if (pending.length > 0) {
    currentStatusSummary = `Next objective: ${pending[0].id}${pending.length > 1 ? ` (+${pending.length - 1} more pending)` : ""}.`;
  } else if (lastRun) {
    currentStatusSummary = `No pending objectives; last recorded run ${lastRun.id}${lastRun.state ? ` (${lastRun.state})` : ""}.`;
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
    },
    // Optional §3 enrichment: per-run history derived from logs/<id>/summary.md. Omitted
    // entirely (fail-soft) when the project has no run-evidence folders.
    ...(runs.length > 0 ? { latest_history_items: latestHistoryItems(runs) } : {})
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
