// AIW Project Console — Projector v0.
//
// TWO ROOT MODES, one emitter. The mode is detected from the shape of the project root
// (`detectRootMode`), never from its name — no project identity is baked in anywhere.
//
//   1. `aiw_objectives` (the original, unchanged). A project root in AIW format (an
//      `objectives/` tree, a `logs/` run-evidence tree, and a Git repository) emits the
//      single REQUIRED console artifact
//        <project-root>/.aiw/views/project_console.snapshot.json
//      conforming to docs/snapshot-schema-v1.md (schema_version 1) — the canonical path
//      the frozen console UI fetches — plus the optional Roadmap view.
//
//   2. `roadmap_tree` (added by O4.P2, RUN-CONSOLE-EMISOR-CARPETA-PROPIA-001; generalized to
//      N projects by O4.P4). A project root whose own plan is an objective→phase→run tree
//      (context/aiw-console/CONTRATO.md capa 2) — no objectives/, no logs/, no config.json.
//      WHERE that tree lives is a LAYOUT (`ROOT_LAYOUTS`), and WHICH model it declares is the
//      tree's own business: the mode is claimed by the tree's SHAPE, and the declared model
//      identifier is carried through verbatim. Neither a path nor a model string names a
//      project, so a second project needed no entry of its own here.
//      It emits the contract folder of CONTRATO §1/§1.b:
//        <project-root>/.project/snapshot.json      (REQUIRED, capa 1)
//        <project-root>/.project/roadmap.json       (optional, §19; added by O4.P11)
//        <project-root>/.project/git_history.json   (optional, §19; added after O4.P11)
//        <project-root>/.project/docs_index.json    (optional, §18.b)
//        <project-root>/.project/guardrails.json    (optional, §18.b)
//        <project-root>/.project/no_claims.json     (optional, §18.b)
//
// The two modes share nothing but the atomic-write helper: mode 2 is purely ADDITIVE and
// mode 1 keeps writing exactly what it wrote before, to exactly where it wrote it.
//
// Boundaries (see objective 001):
//   - Node built-ins only. No dependencies.
//   - Reads ONLY inside the given project root (mode 1: objectives/, logs/, config.json;
//     mode 2: roadmap/, governance/, package.json, the repo's Markdown corpus, and — for the
//     git-history artifact only — the root's own Git repository, through READ-ONLY commands).
//   - Writes ONLY under <project-root>/.aiw/ (mode 1) or <project-root>/.project/ (mode 2),
//     atomically (temp + rename), each destination behind its own path guard.
//   - Fail-soft: a missing input yields an empty group or an omitted key, never an error.
//   - No Git command that writes, ever: only for-each-ref / rev-parse / branch / log. Neither
//     mode DEPENDS on Git — with Git absent, or the root not being its own repository, mode 2
//     simply omits git_history.json (§18/§20: an announced absence, never an invented file).

import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  statSync,
  writeFileSync
} from "node:fs";
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

export const SCHEMA_VERSION = 1;
// CONTRATO §6 — `generated_from` names tool AND version, so the version moves whenever the
// emitter's behaviour moves. 0.2.0 added root mode 2 (O4.P2); 0.3.0 added the optional
// `.project/roadmap.json` of §19 (O4.P11): an emitter that writes five files is not the same
// emitter that wrote four, and two different behaviours must not answer to one version.
// 0.4.0 adds the other optional of §19, `.project/git_history.json` — and with it the first
// input this emitter reads that is not a file: the root's own Git repository.
// 0.5.0 (O4.P4) makes root mode 2 serve N projects: the inputs are resolved through a LAYOUT
// instead of one hardcoded path set, and the mode is claimed by the tree's SHAPE instead of by
// a model string this emitter recognises. An emitter that can read a second project's layout is
// not the same emitter that could read only one, so the version moves (§6).
// 0.6.0 (O4.P5) adds the docs index to the layout bundle and, with it, TRANSPORT: a project that
// curated its own index has that index republished instead of overwritten by a scan of its
// corpus. An emitter that republishes a curated selection is not the emitter that could only
// scan, so the version moves again — and it moves for every file, because `generated_from`
// identifies the emitter, not the artifact.
export const PROJECTOR_VERSION = "0.6.0";
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

// ---------------------------------------------------------------------------
// ROOT MODE 2 — `roadmap_tree`: the contract folder (.project/)
//
// Everything below is additive. It reads a project whose own plan is a `roadmap_tree_v1`
// tree at <root>/roadmap/roadmap.json and emits <root>/.project/, the folder specified by
// context/aiw-console/CONTRATO.md. Nothing above this line changed behaviour.
// ---------------------------------------------------------------------------

// CONTRATO §1.a — the base path of the contract folder is ONE constant in ONE file. Every
// emitted path below is derived from it; no route literal is repeated anywhere else.
export const PROJECT_DIR = ".project";
export const PROJECT_SNAPSHOT_RELATIVE_PATH = join(PROJECT_DIR, "snapshot.json");
export const PROJECT_ROADMAP_RELATIVE_PATH = join(PROJECT_DIR, "roadmap.json");
export const PROJECT_GIT_HISTORY_RELATIVE_PATH = join(PROJECT_DIR, "git_history.json");
export const PROJECT_DOCS_INDEX_RELATIVE_PATH = join(PROJECT_DIR, "docs_index.json");
export const PROJECT_GUARDRAILS_RELATIVE_PATH = join(PROJECT_DIR, "guardrails.json");
export const PROJECT_NO_CLAIMS_RELATIVE_PATH = join(PROJECT_DIR, "no_claims.json");

// ROOT LAYOUTS (O4.P4) — WHERE this mode's inputs live inside a project root.
//
// The first emitter of this mode had ONE hardcoded path set, which was the path set of the one
// project it emitted. A second project keeps its plan and its governance somewhere else, so the
// path set had to stop being a constant. It became a LIST OF LAYOUTS: each entry is a complete,
// self-consistent bundle of relative paths, and a root is matched against them IN ORDER.
//
// A layout is a SHAPE OF ROOT, not a project. No entry below contains a project name, a project
// id, or an absolute path — `repo_root` describes "the plan sits at the top of the repo" and
// `project_local_aiw` describes "the plan sits in the project-local AIW area". Any root with
// either shape is served, and a third shape is a fourth line here, not a branch anywhere.
//
// The bundle is resolved AS A UNIT: whichever layout supplies the roadmap tree also supplies the
// governance sources. Probing each input independently would let a root be read half in one
// layout and half in another — the emitter would then be reporting a project that does not exist.
//
// `docs_index` (O4.P5) joined the bundle by that same rule: it is WHERE a project keeps a docs
// index it curated itself. Its PRESENCE at that path — never a project's name — is what decides
// whether the Docs index is TRANSPORTED or scanned off the corpus (`buildDocsIndex`).
export const ROOT_LAYOUTS = [
  {
    layout: "repo_root",
    roadmap: join("roadmap", "roadmap.json"),
    guardrails: join("governance", "guardrails.json"),
    no_claims: join("governance", "no_claims.json"),
    contract_ref: join("governance", "contract.json"),
    docs_index: join("docs", "docs_index.json")
  },
  {
    layout: "project_local_aiw",
    roadmap: join(".aiw", "roadmap", "roadmap.json"),
    guardrails: join(".aiw", "guardrails", "project_guardrails.json"),
    no_claims: join(".aiw", "guardrails", "no_claims.json"),
    contract_ref: join(".aiw", "guardrails", "contract.json"),
    docs_index: join(".aiw", "docs", "docs_index.json")
  }
];

// Kept as an export because it is the DEFAULT layout's roadmap path and callers/tests name it.
// Code inside this file must use the layout-resolved path, never this constant.
export const ROADMAP_TREE_SOURCE_PATH = ROOT_LAYOUTS[0].roadmap;
// Layout-independent: identity is a property of the repo, not of where its plan lives.
const PACKAGE_SOURCE_PATH = "package.json";

// CONTRATO §10.c — the tree identifies its own model. This is the identifier of the model THIS
// CONTRACT specifies; it is what a tree that declares nothing is credited with, and the name the
// shape gate below checks conformance against. It is NOT a gate: a conforming tree that calls
// itself something else keeps its own name (`declaredRoadmapModel`).
export const ROADMAP_TREE_MODEL = "roadmap_tree_v1";

// CONTRATO §11.a — run status: STORED, four tokens, closed vocabulary.
const RUN_STATUSES = ["planned", "active", "blocked", "completed"];
// CONTRATO §11.b — objective/phase status: DERIVED, five tokens, never stored (§10.b, §12.c).
const DERIVED_COLLECTION_STATUSES = ["planned", "in_progress", "active", "blocked", "completed"];
// Project-level operational status (capa 1 §3, `operational_status`). A different axis from
// the two above — it qualifies the PROJECT, not a run — and it is declared as such so the
// lexical collision of `active`/`blocked` across axes stops being a trap (§11.c).
const PROJECT_OPERATIONAL_STATUSES = ["active", "blocked", "idle"];

// CONTRATO §12.a — the derivation function, as DATA, evaluated in order; the first rule that
// applies wins. It is written once, here: `deriveCollectionStatus` executes this table and
// `buildTaxonomyModel` declares this same table in the emitted envelope. Declaration and
// behaviour cannot drift apart, because they are the same array.
const COLLECTION_STATUS_RULES = [
  { token: "active", quantifier: "any", run_status: "active" },
  { token: "blocked", quantifier: "any", run_status: "blocked" },
  { token: "completed", quantifier: "all", run_status: "completed" },
  { token: "in_progress", quantifier: "any", run_status: "completed" },
  { token: "planned", quantifier: "otherwise" }
];

// Same shape, same discipline, for the project axis. `blocked` is reachable here — unlike the
// `pending.length > 0 ? "active" : "idle"` of mode 1, whose declared vocabulary was wider than
// anything it could emit (CONTRATO §17, last paragraph).
const PROJECT_STATUS_RULES = [
  { token: "active", quantifier: "any", run_status: "active" },
  { token: "blocked", quantifier: "any", run_status: "blocked" },
  { token: "idle", quantifier: "otherwise" }
];

// Docs navigation tiers, in the order the reader declares them, and the rule that assigns one.
// Navigation visibility only: it classifies nothing about a document's authority or freshness.
const DOCS_NAV_TIERS = ["primary", "secondary", "advanced", "evidence", "history", "proposal"];
// First match wins, on the repo-relative POSIX path. Derived from WHERE a document lives, so a
// new document classifies itself and no hand-kept curation list can rot (§2 applied to docs).
const DOCS_NAV_TIER_RULES = [
  { match: "^context/[^/]+/records/", tier: "evidence" },
  { match: "^context/handoffs/", tier: "secondary" },
  { match: "^console/", tier: "secondary" },
  { match: "^docs/", tier: "secondary" },
  { match: "^[^/]+$", tier: "primary" },
  { match: "^context/", tier: "primary" },
  { match: ".", tier: "secondary" }
];
// Directories never scanned for the docs corpus: VCS metadata, dependencies, the emitted
// folder itself, the AIW delivery area, and test fixtures (fixture Markdown is not documentation).
const DOCS_SKIP_DIRS = new Set([".git", ".aiw", PROJECT_DIR, "node_modules", "tests"]);

function safeReadJson(filePath) {
  if (!existsSync(filePath)) return null;
  try {
    return JSON.parse(readFileSync(filePath, "utf8"));
  } catch {
    return null;
  }
}

// Repo-relative POSIX path — the form CONTRATO §7 requires of every path in the artifact.
function repoRelative(root, absolutePath) {
  return relative(resolve(root), absolutePath).split(sep).join("/");
}

// A `{path, mtime}` source record (CONTRATO §6). Returns null when the file does not exist:
// §7 — a path that does not resolve is OMITTED, never emitted as a broken pointer.
function sourceRecord(root, relativePath) {
  const absolute = resolve(root, relativePath);
  if (!existsSync(absolute)) return null;
  try {
    return { path: repoRelative(root, absolute), mtime: statSync(absolute).mtime.toISOString() };
  } catch {
    return null;
  }
}

// THE SHAPE GATE (O4.P4). A tree claims this mode by CONFORMING to capa 2, not by declaring a
// string this emitter recognises.
//
// The first emitter gated on `schema_version === "roadmap_tree_v1"`. That gate is exactly the
// baked identity §10.c warns about, one level up: the only trees that could ever pass it were
// trees written by whoever chose that name. A second project's tree is the same three levels
// with the same keys under a name of its own, and it was refused for its name alone.
//
// What is checked is what this emitter actually CONSUMES: three levels, each level identified
// (`objective_id` / `phase_id` / `run_id`) and each run carrying a `status`. Those are the exact
// fields `flattenRoadmapTree`, the derivations and `currentStatusSummary` read, so a tree that
// passes can be emitted in full and a tree that fails could only have been emitted with holes.
//
// The identification fields are load-bearing beyond documentation: mode 1's OWN emitted roadmap
// view (`buildRoadmap`) is also objectives→phases→runs, but its levels carry `title` and no ids.
// Requiring the ids is what keeps a projected AIW root — which gains `.aiw/roadmap/roadmap.json`
// at startup projection — in mode 1 instead of flipping it into mode 2 on the next run.
export function hasRoadmapTreeShape(tree) {
  if (!tree || typeof tree !== "object" || !Array.isArray(tree.objectives)) return false;
  const named = (value) => typeof value === "string" && value.length > 0;
  return tree.objectives.every(
    (objective) =>
      objective && typeof objective === "object" &&
      named(objective.objective_id) &&
      Array.isArray(objective.phases) &&
      objective.phases.every(
        (phase) =>
          phase && typeof phase === "object" &&
          named(phase.phase_id) &&
          Array.isArray(phase.runs) &&
          phase.runs.every((run) => run && typeof run === "object" && named(run.run_id) && named(run.status))
      )
  );
}

// CONTRATO §10.c — the model identifier the tree declares for ITSELF, carried verbatim into
// everything emitted from it. A conforming tree that declares no model at all is credited with
// this contract's own identifier: the shape was verified, so naming it is a measurement, not an
// invention. What is never done is RELABELLING a tree that named itself.
export function declaredRoadmapModel(tree) {
  return typeof tree?.schema_version === "string" && tree.schema_version
    ? tree.schema_version
    : ROADMAP_TREE_MODEL;
}

// Match a root against the layouts, in order, and return the FIRST whose roadmap file both parses
// and conforms. Returns { layout, paths, tree } or null. This — and nothing else — is what decides
// that a root is a roadmap_tree root, so "the shape of the root picks the mode" stays literally true.
export function detectRootLayout(root) {
  for (const paths of ROOT_LAYOUTS) {
    const tree = safeReadJson(resolve(root, paths.roadmap));
    if (hasRoadmapTreeShape(tree)) return { layout: paths.layout, paths, tree };
  }
  return null;
}

// The tree of whichever layout claimed the root, or null when no layout did.
export function readRoadmapTree(root) {
  return detectRootLayout(root)?.tree || null;
}

// Which root mode a project root is in, decided ONLY by what the root contains. A root that
// publishes a conforming objective→phase→run tree in any known layout is mode 2; everything else
// keeps the original mode 1 behaviour, including every AIW root in existence.
export function detectRootMode(root) {
  return detectRootLayout(root) ? "roadmap_tree" : "aiw_objectives";
}

// Flatten the three levels into runs, each carrying the ids of the objective and phase it came
// from. Used for derivation and counting; the emitted tree keeps its own nesting untouched.
export function flattenRoadmapTree(tree) {
  const runs = [];
  for (const objective of tree.objectives || []) {
    for (const phase of objective.phases || []) {
      for (const run of phase.runs || []) {
        runs.push({ objective_id: objective.objective_id, phase_id: phase.phase_id, run });
      }
    }
  }
  return runs;
}

function applyStatusRules(rules, runStatuses) {
  for (const rule of rules) {
    if (rule.quantifier === "otherwise") return rule.token;
    if (rule.quantifier === "any" && runStatuses.some((status) => status === rule.run_status)) {
      return rule.token;
    }
    if (rule.quantifier === "all" && runStatuses.every((status) => status === rule.run_status)) {
      return rule.token;
    }
  }
  return null;
}

// CONTRATO §12/§13 — derive the status of any collection of runs (an objective's runs, or a
// phase's). Returns null for an empty collection: §12.b makes that MALFORMED, and a malformed
// input gets NO token rather than an invented one ([].every() === true would say `completed`).
export function deriveCollectionStatus(runStatuses) {
  if (!runStatuses.length) return null;
  return applyStatusRules(COLLECTION_STATUS_RULES, runStatuses);
}

// Project-level `operational_status`, derived from every run in the tree by the same mechanism.
export function deriveProjectOperationalStatus(runStatuses) {
  if (!runStatuses.length) return "idle";
  return applyStatusRules(PROJECT_STATUS_RULES, runStatuses);
}

// CONTRATO §17 — `taxonomy_model` declares the vocabulary of the tree this snapshot carries,
// AND the derivation rule for the tokens that are not stored. Both are read off the same
// constants the emitter itself executes, so the declaration is derived, never a parallel literal
// (the defect §17 measured in mode 1, `PROJ:38,40` → `:463-466`).
function buildTaxonomyModel(root, layout) {
  // Pointer to the normative document, when the PROJECT declares where its own contract lives
  // (the layout's `contract_ref`). No document path is baked in here: a project that declares
  // nothing simply gets no pointer, and a declared path that does not resolve is omitted (§7).
  const declared = safeReadJson(resolve(root, layout.paths.contract_ref));
  const specifiedBy =
    declared && typeof declared.specified_by === "string"
      ? sourceRecord(root, declared.specified_by)
      : null;
  return {
    // The vocabulary declared here is the vocabulary of THIS tree, so it is named with THIS
    // tree's own model identifier — not with the identifier of the contract that specifies the
    // shape. Two projects with different model names get two different declarations, which is
    // what lets one reader execute both without knowing either emitter.
    model: declaredRoadmapModel(layout.tree),
    // One entry per axis. `axis` names WHAT the tokens qualify, so two axes sharing a token
    // (`active` on a run vs on the project) can never be read as one vocabulary.
    vocabularies: {
      "project.operational_status": { axis: "project", stored: true, tokens: PROJECT_OPERATIONAL_STATUSES },
      "run.status": { axis: "run", stored: true, tokens: RUN_STATUSES },
      "objective.status": {
        axis: "objective",
        stored: false,
        derived_by: "collection_status_from_runs",
        tokens: DERIVED_COLLECTION_STATUSES
      },
      "phase.status": {
        axis: "phase",
        stored: false,
        derived_by: "collection_status_from_runs",
        tokens: DERIVED_COLLECTION_STATUSES
      }
    },
    // Executable declaration: evaluate `precedence` in order against the `status` of the runs in
    // the collection; the first rule whose quantifier holds wins. An empty collection is
    // malformed and yields no token at all.
    derivations: {
      collection_status_from_runs: {
        applies_to: ["objective", "phase"],
        input: "run.status",
        precedence: COLLECTION_STATUS_RULES,
        empty_input: "malformed"
      },
      project_operational_status_from_runs: {
        applies_to: ["project"],
        input: "run.status",
        precedence: PROJECT_STATUS_RULES,
        empty_input: "idle"
      }
    },
    ...(specifiedBy ? { specified_by: specifiedBy.path } : {})
  };
}

// Identity of the projected project, taken FROM the project: package.json `name` when it has
// one, else the root folder name. Same normalization as mode 1's `readProjectId`. Nothing here
// knows the name of any particular project.
function readRoadmapTreeProjectId(root) {
  const pkg = safeReadJson(resolve(root, PACKAGE_SOURCE_PATH));
  const raw = pkg && typeof pkg.name === "string" && pkg.name ? pkg.name : basename(resolve(root));
  const slug = raw.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
  return slug || "project";
}

// The envelope every emitted file of this folder carries: what it is, whose it is, when it was
// emitted, by what tool, and off which files (CONTRATO §4, §5, §6). `sources` is what makes
// staleness detectable, so the optional files get it too, not just the required snapshot.
function projectFileEnvelope(root, opts, sourcePaths) {
  return {
    schema_version: SCHEMA_VERSION,
    project_id: readRoadmapTreeProjectId(root),
    generated_at: opts.now || new Date().toISOString(),
    generated_from: GENERATED_FROM,
    sources: sourcePaths.map((path) => sourceRecord(root, path)).filter(Boolean)
  };
}

// The tree, verbatim, under the identifier key mode 1 already established for the model
// (`model`; CONTRATO §10.c leaves the carrying key to this emitter). The tree's own
// `schema_version` is not re-emitted: two `schema_version` keys at two depths inside one file
// is the exact confusion §10.c warns about, and `model` already carries it. No counts, no
// per-level status: §10.b — nothing derivable is stored.
//
// It is written ONCE, here, because two artifacts transport it: the required snapshot
// (`roadmap_tree`) and the optional `.project/roadmap.json` (§19). Same function, so the two
// copies of the tree cannot drift apart — the same discipline `COLLECTION_STATUS_RULES` gets.
function roadmapTreeBlock(tree) {
  return {
    model: declaredRoadmapModel(tree),
    ...(tree.roadmap_id ? { roadmap_id: tree.roadmap_id } : {}),
    ...(tree.title ? { title: tree.title } : {}),
    objectives: tree.objectives
  };
}

// CONTRATO §19 — `.project/roadmap.json`, OPTIONAL: the same tree the snapshot transports,
// published as its own file. Not a second derivation and not a new reading of the roadmap: the
// tree block is the one above, byte for byte. Returns null when the root is not a
// `roadmap_tree` root, in which case §18/§20 apply — the file is simply not emitted.
export function buildProjectRoadmap(root, opts = {}) {
  const layout = detectRootLayout(root);
  if (!layout) return null;
  return {
    ...projectFileEnvelope(root, opts, [layout.paths.roadmap]),
    ...roadmapTreeBlock(layout.tree)
  };
}

// Build the REQUIRED snapshot (CONTRATO capa 1) from a roadmap-tree root. Pure read.
export function buildRoadmapTreeSnapshot(root, opts = {}) {
  const layout = detectRootLayout(root);
  if (!layout) {
    throw new Error(
      `No ${ROADMAP_TREE_MODEL}-shaped roadmap under ${resolve(root)} ` +
      `(layouts tried: ${ROOT_LAYOUTS.map((entry) => entry.roadmap).join(", ")})`
    );
  }
  const tree = layout.tree;

  const flat = flattenRoadmapTree(tree);
  const runStatuses = flat.map(({ run }) => run.status);
  const objectiveCount = (tree.objectives || []).length;
  const phaseCount = (tree.objectives || []).reduce((total, o) => total + (o.phases || []).length, 0);
  const byStatus = RUN_STATUSES.map((status) => ({
    status,
    n: runStatuses.filter((value) => value === status).length
  })).filter((entry) => entry.n > 0);

  const activeRuns = flat.filter(({ run }) => run.status === "active");
  const completed = runStatuses.filter((status) => status === "completed").length;
  let currentStatusSummary;
  if (activeRuns.length) {
    const first = activeRuns[0];
    currentStatusSummary =
      `Active run: ${first.run.run_id} (${first.objective_id}/${first.phase_id}, queue ${first.run.queue_order})` +
      `${activeRuns.length > 1 ? ` (+${activeRuns.length - 1} more active)` : ""}.`;
  } else if (flat.length) {
    currentStatusSummary = `No active run; ${completed} of ${flat.length} runs completed.`;
  } else {
    currentStatusSummary = "No runs in the roadmap.";
  }

  const noClaims = safeReadJson(resolve(root, layout.paths.no_claims));
  const noClaimsCount = noClaims && Array.isArray(noClaims.claims) ? noClaims.claims.length : null;
  const noClaimsSource = sourceRecord(root, PROJECT_NO_CLAIMS_RELATIVE_PATH);

  return {
    ...projectFileEnvelope(root, opts, [layout.paths.roadmap, PACKAGE_SOURCE_PATH]),
    operational_status: deriveProjectOperationalStatus(runStatuses),
    project_summary:
      `${tree.title || tree.roadmap_id || "Roadmap"}: ${objectiveCount} objectives, ` +
      `${phaseCount} phases, ${flat.length} runs.`,
    current_status_summary: currentStatusSummary,
    // The tree, verbatim (see `roadmapTreeBlock`): same block the optional `.project/roadmap.json`
    // publishes, built by the same function so the two cannot drift.
    roadmap_tree: roadmapTreeBlock(tree),
    // Runs the tree itself marks blocked. Derived at emission, never a hand-kept list.
    blockers: flat
      .filter(({ run }) => run.status === "blocked")
      .map(({ objective_id, phase_id, run }) => ({
        run_id: run.run_id,
        objective_id,
        phase_id,
        title: run.title
      })),
    followups: [],
    // §3.b left this OPAQUE "until there is an emitter and an example". This phase gives it
    // both, so it opens — minimally, pointing at the file that holds the claims.
    no_claims_summary:
      noClaimsCount != null && noClaimsSource
        ? { total: noClaimsCount, source: noClaimsSource.path }
        : {},
    // Still opaque, and honestly so: the capa-3 validator does not exist, so nothing real
    // fills this. §3.b — no schema without emitter and example.
    validation_summary: {},
    taxonomy_model: buildTaxonomyModel(root, layout)
  };
}

function docNavTier(relativePosixPath) {
  for (const rule of DOCS_NAV_TIER_RULES) {
    if (new RegExp(rule.match).test(relativePosixPath)) return rule.tier;
  }
  return "secondary";
}

// Every Markdown document of the repo, in stable path order. Fail-soft on unreadable dirs.
function listMarkdownFiles(root, dir = resolve(root), found = []) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return found;
  }
  // Code-unit order, like `safeReadDirNames` above: locale-aware collation would make the
  // emitted order depend on the machine that ran the emitter.
  for (const entry of entries.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))) {
    const absolute = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (DOCS_SKIP_DIRS.has(entry.name)) continue;
      listMarkdownFiles(root, absolute, found);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
      found.push(absolute);
    }
  }
  return found;
}

// THE DOCS INDEX: TRANSPORTED when the project curated one, SCANNED when it did not (O4.P5).
//
// The first version of this function only scanned. That was right for the project it was written
// for, which had no index at all — the index was built from nothing, so deriving it from the
// corpus was the only honest option, and §2 (a hand-kept list rots) made it the preferred one.
// Applied to a project that DOES keep a curated index, the same scan silently replaced a
// deliberate selection with a dump of every `.md` in the repo: the same project rendered ~38
// documents in its own console and 342 here. A projection that disagrees with the project it
// projects is not a projection.
//
// So the rule is the one the roadmap and the governance sources already follow — CANONICAL
// OUTSIDE, DERIVED INSIDE. If the layout's `docs_index` path holds a conforming index, this
// emitter REPUBLISHES it under the contract envelope, preserving its SELECTION and its ORDER.
// The scan stays as the BACKUP, for a root with no curated index to transport.
//
// The decision is made by PRESENCE at the layout path. No project name is consulted, here or
// anywhere below: a root that grows a curated index starts being transported on its next run,
// and one that loses it falls back to the scan, with no edit to this file.
export function buildDocsIndex(root, opts = {}) {
  const curated = readCuratedDocsIndex(root);
  return curated ? transportDocsIndex(root, curated, opts) : scanDocsIndex(root, opts);
}

// The curated index of this root, or null. Conformance is the same bar `buildTransportedList`
// applies to guardrails: it must parse and it must carry the array this emitter would republish.
// A file that is present but malformed transports nothing — it falls through to the scan, which
// is a real index built from real files, rather than an empty Docs tab.
function readCuratedDocsIndex(root) {
  const layout = detectRootLayout(root);
  const relativePath = layout?.paths.docs_index;
  if (!relativePath) return null;
  const index = safeReadJson(resolve(root, relativePath));
  if (!index || !Array.isArray(index.docs)) return null;
  return { path: relativePath, index };
}

// Republish a curated index under the contract envelope.
//
// SELECTION and ORDER are the curation's, untouched: this function filters nothing and sorts
// nothing. Each entry travels VERBATIM — including the fields this emitter could never derive
// (audience, canonicality, related_*, notes, …), which are the project's own statements about its
// own documents and are republished, not authored, exactly as the roadmap tree is. What is added
// is only what is MISSING among the fields the reader consumes, each by the same rule the scan
// uses, so a partially-filled curated entry still renders instead of degrading the tab.
function transportDocsIndex(root, curated, opts) {
  const docs = [];
  const unresolved = [];

  for (const entry of curated.index.docs) {
    const path = typeof entry?.path === "string" ? entry.path.trim() : "";
    // A curated entry with no usable path cannot be transported at all: there is nothing to
    // point at. Counted below with the paths that do not resolve, never silently dropped.
    if (!path) {
      unresolved.push({ path: null, reason: "no path" });
      continue;
    }
    const absolute = resolve(root, path);
    // The path must land INSIDE the root, and the file must exist. A curated index that names a
    // document which is not on disk is a stale curation, and §7 forbids emitting a pointer that
    // does not resolve — so the entry is OMITTED from `docs[]` and DECLARED in `docs_source`
    // below (§20: an announced absence, never a silent one). The file is never invented.
    const inside = relative(resolve(root), absolute);
    if (inside.startsWith("..") || isAbsolute(inside)) {
      unresolved.push({ path, reason: "outside the project root" });
      continue;
    }
    if (!existsSync(absolute)) {
      unresolved.push({ path, reason: "no such file" });
      continue;
    }

    const transported = { ...entry, path: repoRelative(root, absolute) };

    // title — the curation's, else the same derivation the scan uses.
    if (typeof transported.title !== "string" || !transported.title.trim()) {
      transported.title = titleFromMarkdown(safeReadText(absolute), basename(path));
    }
    // nav_tier / default_visible — the curation's, else derived from where the document lives.
    if (!DOCS_NAV_TIERS.includes(transported.nav_tier)) {
      transported.nav_tier = docNavTier(transported.path);
    }
    if (typeof transported.default_visible !== "boolean") {
      transported.default_visible = transported.nav_tier === "primary";
    }
    // ia_bucket — the curation's GROUPING wins, and the folder is only the backup. The reader
    // falls back through category / related_area / source_role before giving up, so a folder
    // bucket is written only when the entry offers no grouping of its own at all: filling it
    // sooner would overwrite curated grouping with a directory name.
    if (!hasGroupingSignal(transported)) {
      const directory = dirname(transported.path);
      transported.ia_bucket = directory === "." ? "root" : directory;
    }
    // freshness — the curation's own value travels verbatim, whatever KIND of value it is: it is
    // the project's statement about its document, and overwriting it with an mtime would be this
    // emitter telling the project how current its own documents are. When an entry carries none,
    // the file's mtime fills it, which is a measurement. Either way the disk mtime is not lost:
    // `sources` below records it for every transported document (§6).
    if (typeof transported.freshness !== "string" || !transported.freshness.trim()) {
      const source = sourceRecord(root, transported.path);
      if (source) transported.freshness = source.mtime;
      else delete transported.freshness;
    }

    docs.push(transported);
  }

  return {
    // The curated index is a source of this file (it decides the selection), and so is every
    // document it names (its mtime is that document's freshness on disk). Both travel, so a
    // change to either is detectable — which is the whole job of `sources` (§6).
    ...projectFileEnvelope(root, opts, [curated.path, ...docs.map((doc) => doc.path)]),
    // How this file was built, declared in the file, same doctrine as `nav_tier_model` and
    // `taxonomy_model`: a reader never has to know this emitter's conventions in advance. It is
    // emitted only on this path — the scanned file already declares its own construction through
    // `nav_tier_model.derived_by`, and adding a key there would rewrite a file that has not
    // changed.
    docs_source: {
      mode: "transported",
      curated_index: curated.path.split(sep).join("/"),
      curated_entries: curated.index.docs.length,
      transported: docs.length,
      selection: "curated: the index's own selection and order, preserved verbatim",
      // Only the reader-facing fields are listed: they are the ones this emitter may fill in.
      // Everything else in an entry is the curation's and is copied untouched.
      field_rules: {
        title: "curated `title`; else the document's first Markdown H1; else its filename",
        nav_tier: "curated `nav_tier`; else derived from the repo path prefix (`nav_tier_model`)",
        default_visible: "curated `default_visible`; else nav_tier === 'primary'",
        ia_bucket: "curated grouping (ia_bucket, category, related_area or source_role); else the document's directory",
        freshness: "curated `freshness`, verbatim; else the document's mtime on disk"
      },
      unresolved_policy:
        "A curated entry whose path does not resolve on disk is OMITTED from docs[] and listed " +
        "in `unresolved`: a pointer that does not resolve is never emitted (§7), and the absence " +
        "is declared rather than left silent (§20). No document is invented to fill it.",
      unresolved
    },
    // The curation's own model declaration travels with it when it has one. It describes the rule
    // THIS index was built with, which is the curation's rule and not this emitter's; publishing
    // this emitter's rule over a selection it did not make would be a false statement about how
    // the file came to be.
    ...(curated.index.nav_tier_model ? { nav_tier_model: curated.index.nav_tier_model } : {}),
    docs
  };
}

// True when the entry carries any grouping the reader can use before falling back to a folder.
// The chain is the reader's own (`ia_bucket` -> `category` -> `related_area` -> `source_role`).
function hasGroupingSignal(entry) {
  return ["ia_bucket", "category", "related_area", "source_role"].some(
    (key) => typeof entry[key] === "string" && entry[key].trim() !== ""
  );
}

// THE BACKUP. Build the docs index by scanning the corpus: `docs[]` with the navigation fields
// the renderer consumes (title, path, nav_tier, default_visible, ia_bucket) plus the file's own
// mtime as its freshness. Every field is derived from the corpus on disk; nothing is curated by
// hand, so a document added tomorrow indexes itself. Fields the emitter cannot honestly derive
// (audience, canonicality, review status, …) are OMITTED, never invented.
//
// This is what a root with no curated index gets, and it is unchanged from the version that had
// no alternative — byte for byte, for the same corpus and clock.
function scanDocsIndex(root, opts = {}) {
  const files = listMarkdownFiles(root);
  const docs = files
    .map((absolute) => {
      const path = repoRelative(root, absolute);
      const tier = docNavTier(path);
      const directory = dirname(path);
      const entry = {
        // First Markdown H1 of the document, else its filename — the same rule mode 1 uses.
        title: titleFromMarkdown(safeReadText(absolute), basename(path)),
        path,
        nav_tier: tier,
        default_visible: tier === "primary",
        ia_bucket: directory === "." ? "root" : directory
      };
      const source = sourceRecord(root, path);
      if (source) entry.freshness = source.mtime;
      return entry;
    })
    .sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));

  return {
    // Every document read IS a source of this index (§6), so `sources` means the same thing
    // here as in the snapshot. The per-entry `freshness` is the same mtime, kept because that
    // is the field the reader displays.
    ...projectFileEnvelope(root, opts, docs.map((doc) => doc.path)),
    // Same doctrine as `taxonomy_model`: the file declares the vocabulary AND the rule it was
    // built with, so a reader never has to know this emitter's conventions in advance.
    nav_tier_model: {
      tiers: DOCS_NAV_TIERS,
      derived_by: "repo_path_prefix",
      rules: DOCS_NAV_TIER_RULES,
      default_visible: "nav_tier === 'primary'",
      purpose: "Docs navigation visibility only. Assigns no authority, freshness or approval."
    },
    docs
  };
}

// Guardrails and no-claims are TRANSPORTED, not authored here: the project declares them in
// governance/*.json and this emitter republishes them under the contract envelope. An absent
// or malformed source yields null and the file is simply not emitted — §18/§20: better an
// announced absence than an invented table.
function buildTransportedList(root, sourcePath, key, opts) {
  if (!sourcePath) return null;
  const source = safeReadJson(resolve(root, sourcePath));
  if (!source || !Array.isArray(source[key])) return null;
  return {
    ...projectFileEnvelope(root, opts, [sourcePath]),
    [key]: source[key]
  };
}

// The governance sources come from the SAME layout that supplied the roadmap: a root whose plan
// this emitter cannot read is a root whose governance it has no business republishing either.
export function buildGuardrails(root, opts = {}) {
  return buildTransportedList(root, detectRootLayout(root)?.paths.guardrails, "guardrails", opts);
}

export function buildNoClaims(root, opts = {}) {
  return buildTransportedList(root, detectRootLayout(root)?.paths.no_claims, "claims", opts);
}

// ---------------------------------------------------------------------------
// CONTRATO §19 — `.project/git_history.json`, OPTIONAL: the commit and branch history of the
// project's own repository, in the shape the console's History tab reads (`renderCommitHistory`).
//
// The identifier is `git_history_v1`. The artifact the old builder wrote carried a vendor prefix
// naming the project that first emitted it, plus a `snapshot` level; §19 flagged both and left the
// rename to this emitter. Three cuts, each one already adjudicated elsewhere:
//   - the vendor prefix goes for the reason of §1/§10.c: an identifier names its CONTENT, not
//     whoever emitted it first. Same cut §10.c already made on the roadmap's identifier.
//   - the `snapshot` level goes for the reason of §19 and §1.b: under `.project/` EVERYTHING is
//     derived and regenerable, so saying "snapshot" is as redundant as saying `views/`.
//   - the version restarts at `v1` (§4/§10.c): it counts the lineage of THIS contract, not the
//     internal history of the name being abandoned.
// So the name is the artifact's own name plus this contract's version, and nothing else.
// The key it travels under is `model`, the same key `.project/roadmap.json` uses for the same
// question ("what model is the payload of this file?"), so the envelope's integer
// `schema_version` keeps meaning only what §4 says it means.
//
// The renderer's gate is on SHAPE, not on this string (project-console.js, `renderCommitHistory`),
// so no consumer had to be touched for the rename — which is exactly why the rename was cheap.
// ---------------------------------------------------------------------------
export const GIT_HISTORY_MODEL = "git_history_v1";

// Field/record separators for `git log --pretty`: control characters that cannot occur inside a
// commit subject or body, so no message can forge a record boundary.
const GIT_US = String.fromCharCode(31); // unit separator (0x1F), between fields
const GIT_RS = String.fromCharCode(30); // record separator (0x1E), between commits
// %h %H %ad %p %s %b — abbreviated sha, full sha, author DATE, parents, subject, body. The author's
// NAME is deliberately not requested: no surface of the consumer displays it, and a derived,
// republished artifact should not carry a person's name it has no use for. `parents` is requested
// although the consumer does not read it either — it is the input `is_merge` is derived from, and
// this emitter declares the input of every derivation it performs.
const GIT_LOG_FORMAT = ["%h", "%H", "%ad", "%p", "%s", "%b"].join(GIT_US) + GIT_RS;

// Resolve a git binary: PATH first, then the usual Windows install locations. Returns null when
// Git cannot be found or run at all — the first of the two fail-soft exits of this section.
let cachedGitBin;
export function resolveGitBin() {
  if (cachedGitBin !== undefined) return cachedGitBin;
  const candidates = [
    "git",
    "C:\\Program Files\\Git\\cmd\\git.exe",
    "C:\\Program Files (x86)\\Git\\cmd\\git.exe"
  ];
  for (const bin of candidates) {
    try {
      execFileSync(bin, ["--version"], { stdio: "ignore" });
      cachedGitBin = bin;
      return bin;
    } catch {
      // try the next candidate
    }
  }
  cachedGitBin = null;
  return null;
}

// Every Git call this file makes goes through here. READ-ONLY by construction: the caller passes
// a subcommand and `-C <root>` is prepended, so no command can act on another repository, and the
// four subcommands used (for-each-ref, rev-parse, branch --show-current, log) mutate nothing.
function gitRead(bin, root, args) {
  return execFileSync(bin, ["-C", resolve(root), ...args], {
    encoding: "utf8",
    maxBuffer: 128 * 1024 * 1024
  });
}

// True only when `root` is the top of its own Git work tree. A project root that merely SITS
// inside some larger repository gets no history: publishing the parent's commits under this
// project's `.project/` would attribute another project's work to this one, and §20 prefers an
// announced absence to a confident overstatement.
function isOwnGitRoot(bin, root) {
  try {
    const top = gitRead(bin, root, ["rev-parse", "--show-toplevel"]).trim();
    return !!top && resolve(top) === resolve(root);
  } catch {
    return false;
  }
}

// Every run_id declared by the project's OWN roadmap tree. This is the whole vocabulary against
// which a commit's run association is verified — it comes from the project's data, so no run-id
// prefix, project name, or ticket convention is baked into this file.
function roadmapRunIds(tree) {
  if (!tree) return new Set();
  return new Set(flattenRoadmapTree(tree).map(({ run }) => run.run_id).filter(Boolean));
}

// Characters that, sitting immediately beside a match, mean the run id is glued into a longer
// word and was not really named ("RUN-A-001-B" does not name "RUN-A-001"). Trailing sentence
// punctuation is NOT in the class, so an id at the end of a sentence still counts. The class does
// not encode the FORM of a run id (CONTRATO §10.d Regla 1.a) — only what would make a match part
// of something else — so an emitter reading a project with other id shapes needs no change here.
const RUN_ID_BOUNDARY = /[A-Za-z0-9_-]/;

// Explicit-only association. Each run id the project's own roadmap declares is looked for in the
// message, as a standalone token; an association is emitted only when the message names EXACTLY
// ONE distinct known run. Never inferred from order, touched paths, dates or wording, and never
// emitted for a run the roadmap does not declare — an unverifiable association is an invented
// claim, so the key is OMITTED instead.
export function deriveCommitRunId(subject, body, runIds) {
  if (!runIds.size) return null;
  const text = `${subject || ""}\n${body || ""}`;
  const named = new Set();
  for (const runId of runIds) {
    if (!runId) continue;
    for (let at = text.indexOf(runId); at !== -1; at = text.indexOf(runId, at + 1)) {
      const before = at > 0 ? text[at - 1] : "";
      const after = text[at + runId.length] || "";
      if (RUN_ID_BOUNDARY.test(before) || RUN_ID_BOUNDARY.test(after)) continue;
      named.add(runId);
      break;
    }
  }
  return named.size === 1 ? [...named][0] : null;
}

function parseGitLog(raw, branch, runIds) {
  const commits = [];
  for (const record of String(raw).split(GIT_RS)) {
    if (!record.trim()) continue;
    const fields = record.replace(/^\n/, "").split(GIT_US);
    if (fields.length < 5) continue;
    const parents = (fields[3] || "").trim();
    const subject = fields[4] || "";
    const body = fields.length > 5 ? (fields[5] || "").trim() : "";
    const runId = deriveCommitRunId(subject, body, runIds);
    commits.push({
      branch,
      sha: (fields[0] || "").trim(),
      full_sha: (fields[1] || "").trim(),
      date: fields[2] || "",
      parents,
      subject,
      body,
      is_merge: parents.split(/\s+/).filter(Boolean).length > 1,
      // OMITTED, not null, when no single roadmap run is named (§7's discipline applied to a field).
      ...(runId ? { run_id: runId } : {})
    });
  }
  return commits;
}

// Build the git-history artifact from the root's own repository. Pure read. Returns null — and the
// file is then simply not written — when Git is unavailable, when the root is not its own repo, when
// the repo has no local branches, or when any read fails. Nothing partial and nothing invented.
export function buildGitHistory(root, opts = {}) {
  const bin = resolveGitBin();
  if (!bin) return null;
  if (!isOwnGitRoot(bin, root)) return null;

  let branches;
  let currentBranch;
  let head;
  try {
    branches = gitRead(bin, root, ["for-each-ref", "--format=%(refname:short)", "refs/heads"])
      .split(/\r?\n/)
      .map((name) => name.trim())
      .filter(Boolean);
    if (!branches.length) return null; // an initialized repo with no commits yet
    currentBranch = gitRead(bin, root, ["branch", "--show-current"]).trim();
    head = gitRead(bin, root, ["rev-parse", "HEAD"]).trim();
  } catch {
    return null;
  }

  // `main` first (the reader tints it as the trunk), then code-unit order — the same determinism
  // rule `listMarkdownFiles` follows, so the emitted order never depends on the machine's locale.
  // EVERY local branch is emitted: hiding a branch is a display policy and belongs to the reader,
  // which already filters its own (`historyVisibleBranches`). An emitter that drops data is lying.
  branches.sort((a, b) => (a === "main" ? -1 : b === "main" ? 1 : a < b ? -1 : a > b ? 1 : 0));

  const layout = detectRootLayout(root);
  const runIds = roadmapRunIds(layout?.tree);
  const commits = [];
  try {
    for (const branch of branches) {
      commits.push(...parseGitLog(
        gitRead(bin, root, ["log", branch, "--date=iso-strict", `--pretty=format:${GIT_LOG_FORMAT}`]),
        branch,
        runIds
      ));
    }
  } catch {
    return null;
  }

  return {
    // `sources` names the two inputs that are FILES on disk: the repository itself (`.git`, whose
    // commits this is) and the roadmap tree (read only to verify run associations). Repository
    // freshness is carried better by `head` than by any mtime — a sha changes exactly when the
    // history does — so §6 is served by both together.
    ...projectFileEnvelope(root, opts, [".git", ...(layout ? [layout.paths.roadmap] : [])]),
    model: GIT_HISTORY_MODEL,
    head,
    // Omitted on a detached HEAD rather than emitted empty: the reader then picks its own default
    // branch (`historyDefaultBranch`) instead of being handed a branch name that is not current.
    ...(currentBranch ? { current_branch: currentBranch } : {}),
    branches,
    commit_total: commits.length,
    commits
  };
}

// Resolve <root>/<relativePath> and prove it lives inside <root>/.project/. The mirror of
// `resolveInsideAiw`, guarding the other destination; neither can write where the other writes.
function resolveInsideProject(root, relativePath) {
  const projectDir = resolve(root, PROJECT_DIR);
  const outPath = resolve(root, relativePath);
  const rel = relative(projectDir, outPath);
  if (rel.startsWith("..") || rel.includes("..") || rel.startsWith(sep) || resolve(projectDir, rel) !== outPath) {
    throw new Error(`Refusing to write outside ${projectDir}: ${outPath}`);
  }
  return { projectDir, outPath };
}

export function resolveProjectFilePath(root, relativePath) {
  return resolveInsideProject(root, relativePath);
}

// Emit the whole contract folder for a `roadmap_tree` root. Every file is written atomically
// (temp + rename, the same helper mode 1 uses). Order matters once: the two optional governance
// files land BEFORE the snapshot, because the snapshot's `no_claims_summary` cites one of them
// by path and §7 forbids emitting a path that does not resolve.
// Returns { ok, mode, project_id, files: [{ artifact, path, bytes, ... }] }.
export function writeProjectFolder(root, opts = {}) {
  const now = opts.now || new Date().toISOString();
  const layout = detectRootLayout(root);
  const written = [];

  const write = (artifact, relativePath, data, summary) => {
    if (!data) return;
    const { outPath } = resolveInsideProject(root, relativePath);
    writeJsonAtomic(outPath, data);
    written.push({
      artifact,
      path: outPath,
      relative_path: repoRelative(root, outPath),
      bytes: statSync(outPath).size,
      ...summary
    });
  };

  const guardrails = buildGuardrails(root, { now });
  write("guardrails", PROJECT_GUARDRAILS_RELATIVE_PATH, guardrails, {
    entries: guardrails ? guardrails.guardrails.length : 0
  });

  const noClaims = buildNoClaims(root, { now });
  write("no_claims", PROJECT_NO_CLAIMS_RELATIVE_PATH, noClaims, {
    entries: noClaims ? noClaims.claims.length : 0
  });

  const docsIndex = buildDocsIndex(root, { now });
  write("docs_index", PROJECT_DOCS_INDEX_RELATIVE_PATH, docsIndex, {
    entries: docsIndex.docs.length
  });

  const roadmap = buildProjectRoadmap(root, { now });
  write("roadmap", PROJECT_ROADMAP_RELATIVE_PATH, roadmap, {
    entries: roadmap ? roadmap.objectives.length : 0
  });

  // §19's other optional. `buildGitHistory` returns null when there is no repository to read, and
  // `write` skips a null artifact, so a Git-less root emits the same five files it always did.
  const gitHistory = buildGitHistory(root, { now });
  write("git_history", PROJECT_GIT_HISTORY_RELATIVE_PATH, gitHistory, {
    entries: gitHistory ? gitHistory.commit_total : 0
  });

  const snapshot = buildRoadmapTreeSnapshot(root, { now });
  const flat = flattenRoadmapTree(snapshot.roadmap_tree);
  write("snapshot", PROJECT_SNAPSHOT_RELATIVE_PATH, snapshot, {
    objectives: snapshot.roadmap_tree.objectives.length,
    runs: flat.length
  });

  return {
    ok: true,
    mode: "roadmap_tree",
    // Which layout claimed this root, and which model its tree declares. Both are measurements of
    // the root, reported so an operator never has to guess how their project was read.
    layout: layout?.layout || null,
    roadmap_model: snapshot.roadmap_tree.model,
    project_id: snapshot.project_id,
    files: written
  };
}

// CLI entry: `node tools/projector/project.mjs [project-root]` (defaults to cwd). The root's own
// shape picks the mode; an AIW root behaves exactly as it always did.
const invokedDirectly = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  const root = resolve(process.argv[2] || process.cwd());
  try {
    if (detectRootMode(root) === "roadmap_tree") {
      const result = writeProjectFolder(root);
      console.log(
        `[projector] mode=roadmap_tree layout=${result.layout} ` +
        `model=${result.roadmap_model} project=${result.project_id}`
      );
      for (const file of result.files) {
        const detail = file.artifact === "snapshot"
          ? `objectives=${file.objectives}; runs=${file.runs}`
          : `entries=${file.entries}`;
        console.log(`[projector] wrote ${file.relative_path} — ${detail}; ${file.bytes} bytes`);
      }
      process.exit(0);
    }
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
