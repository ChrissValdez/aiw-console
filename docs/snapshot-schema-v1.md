# Snapshot schema v1 — `project_console.snapshot.json`

> Derived from the JAME console data contract (audit §B.2, snapshot v0.3). This is the AIW
> projection contract: the shape the AIW projector emits at
> `<project-root>/.aiw/views/project_console.snapshot.json`. **Finalized by objective 001**
> (`001-console-projector`), which built the projector (`tools/projector/project.mjs`) and its
> fixture tests; this document matches that implementation. See §5 for the canonical location
> and the server startup projection flow.

## Why this file exists
The forked console reads many `.aiw/*` sources, but **exactly one is required**:
`project_console.snapshot.json`. Everything else is fail-soft enrichment. So the smallest useful
projector emits just this file; richer views come from the optional groups (§3).

## 1. Envelope
```jsonc
{
  "schema_version": 1,              // integer; AIW contract. (JAME used the string "0.3".)
  "project_id": "aiw_console",      // stable id of the projected project
  "generated_at": "2026-07-10T00:00:00.000Z",  // ISO-8601 of projection
  "generated_from": "aiw-projector@0.1.0"       // provenance of this snapshot (tool + version)
}
```

The projector writes exactly one file, atomically (temp + rename), at
`<project-root>/.aiw/views/project_console.snapshot.json`, and never writes, moves, or deletes
anything outside `<project-root>/.aiw/`. See §5 for the canonical location and flow.

## 2. Required keys (the console reads these directly)
Top-level keys observed as read by the console (audit §B.2). Required for the console to render
its primary views without falling back to empty states:

| Key | Type | Meaning |
|---|---|---|
| `schema_version` | integer | Contract version. Console may refuse mismatches. |
| `project_id` | string | Stable project identifier. |
| `operational_status` | string | One-line operator status (e.g. `active`, `blocked`, `idle`). |
| `project_summary` | string | Short human summary of the project. |
| `current_status_summary` | string | What is happening right now (current/next work item). |
| `roadmap_tree` | object | Hierarchical work model the Overview/Roadmap views render. For AIW v1 this is a flat list of objectives (pending/parked/processed) rather than JAME's objective→phase→run tree. The projector emits `{ model: "aiw_flat_objectives_v1", counts: {pending, parked, processed, total}, objectives: [{id, title, classification, source}] }`. |
| `blockers` | array | Active blockers (each: `id`, `summary`, optional `run_id`). |
| `followups` | array | Proposed follow-ups (each: `id`, `summary`). |
| `no_claims_summary` | object | Disallowed-claims / guardrail summary (may be empty). |
| `validation_summary` | object | Result of the last validation pass (may be empty). |
| `taxonomy_model` | object | Labels/enums the UI uses to group and colour items. |

`*_ref` keys (e.g. `roadmap_ref`, `queue_ref`) are optional pointers to the enrichment files in §3;
absent → the console uses only what is inline here.

## 3. Optional enrichment groups (fail-soft; absent → empty state, never an error)

### 3a. Inline snapshot enrichment (emitted by the projector; objective 004)
Optional top-level snapshot keys the projector emits when it can honestly derive them from
AIW state. Each is OMITTED (never faked) when its source is absent, and every consuming
Overview panel reads it fail-soft (absent → the panel falls back to its other sources):

- `latest_history_items` — per-run history derived from `logs/<id>/summary.md`, one entry per
  run-evidence folder in ascending run-id order. Consumed by `historyItems()` /
  `renderHistory()` (`docs/project-console/assets/project-console.js`), which reads
  `type`, `id`, `summary`, `source_refs`. Each entry:

  ```jsonc
  {
    "type": "RUN",                              // history-item kind
    "id": "005-shipped-objective",              // logs/<id> folder name
    "state": "APPROVED",                        // OPTIONAL — first token of the summary.md "State:" field, uppercased
    "rounds": 1,                                // OPTIONAL — integer from the "Rounds:" field
    "timestamp": "2026-07-08T09:15:00.000Z",    // OPTIONAL — parseable date from the "Completed:" field
    "summary": "Shipped the objective …",       // first narrative line of summary.md, else composed from state/rounds
    "source_refs": ["logs/005-shipped-objective/summary.md"]  // evidence pointer (the folder when no summary.md)
  }
  ```

  **Derivation & honesty.** `state`/`rounds`/`timestamp` are parsed from labelled lines in
  `summary.md` (tolerating `- ` bullets and `**bold**` wrappers); any field that is absent or
  unparseable is OMITTED from the entry, not invented. A run with no `summary.md` still yields
  an entry (id + a composed summary + a folder `source_ref`). The whole key is omitted when the
  project has no `logs/` run-evidence folders.

  **Current/last run.** `current_status_summary` (a required string, §2) is likewise enriched
  from this history: with no pending objectives it names the last recorded run and, when known,
  its final state (`… last recorded run 006-abandoned-objective (REJECTED).`). The queue /
  operational counts the Overview needs by folder are already carried by `roadmap_tree.counts`
  (`pending`/`parked`/`processed`/`total`, §2).

  > Object-shaped Overview reads that collide with the §2 required *string* fields
  > (`project_summary.current_run_id`, `operational_status.summary`,
  > `current_status_summary.current_focus`) are the forked UI's secondary fallbacks; the v1
  > required fields stay strings and those sub-fields are omitted rather than restructure the
  > finalized §2 contract. Reconciling that wiring would be a UI-file change (out of scope,
  > cf. the §6 path note).

### 3b. Sidecar enrichment files
Each lives at its own `.aiw/...` path and is loaded only if present:

- `project.json` (`aiw.project.v0.1`) — `project_id`, `mode`, `source_control`, dashboard hints.
- `state/project_status.json` — `status`, `current_run_id`, `next_recommended_run_id`.
- `roadmap/queue.json` — ordered queue: `order`, `run_id`/`objective_id`, `classification`, `blocked_by[]`.
- `roadmap/objectives.jsonl` / `runs.jsonl` — per-item legacy records for the run drawer.
- `views/git_history.snapshot.json` (`aiw.git_history_snapshot.v1`) — `head`, `current_branch`, `branches[]`, `commits[]` (produced by `build-git-history-snapshot.mjs`; git-ignored, regenerated locally).
- `views/roadmap.json` — the Roadmap tab's **Roadmap v3** source (see §6). Emitted by the projector alongside the required snapshot (`writeSnapshot` / `writeRoadmap` in `tools/projector/project.mjs`). Absent → the Roadmap/Overview tabs show their read-only "source unavailable" banner; the rest of the console is unaffected.
- `docs/docs_index.json` + doc bodies — governance docs (CONSTITUCION, DECISIONES, …) for the Docs tab.
- `guardrails/*.json`, `project_memory.jsonl` — guardrails / no-claims / memory for the Governance tab.

## 4. AIW mapping notes (for the projector, objective 001)
- AIW has no phases/roadmap tree yet: project `objectives/{pending,parked,processed}/*.md` → a flat
  `roadmap_tree` (a queue of objectives) and a minimal `queue.json`. Project the JAME hierarchy only
  if AIW ever adopts one.
- AIW run evidence is `logs/<id>/{summary.md, round*_*, preflight.txt}` + branches `aiw/<id>` and
  commits `aiw r<N>: <id>` in the target repo. Map `summary.md` → the run drawer; reuse
  `build-git-history-snapshot.mjs` (parametrize the run-id regex `RUN-JAME-…` → `aiw/<id>` and the
  branch fallback) for `git_history.snapshot.json`.
- `config.json` (`projects{path,base_branch,verification,push}`) → `project.json` 1:1.
- The projector MUST NOT write anywhere except the given project root's `.aiw/` (see objective 001).

## 5. Canonical location & flow
There is exactly one canonical path for the console snapshot, and one flow that keeps it fresh —
no manual projection step.

- **Projector output path.** `tools/projector/project.mjs` writes to
  `<project-root>/.aiw/views/project_console.snapshot.json` (atomic temp + rename). This is the
  canonical location: it sits next to `views/git_history.snapshot.json`, and it is exactly what
  the UI fetches (`docs/project-console/assets/project-console.js` →
  `../../.aiw/views/project_console.snapshot.json`).
- **Server startup projection.** `tools/project-console/serve-project-console.mjs` reads an
  optional `projects.config.json` at the repo root on startup and, for each listed project, runs
  the projector and writes the resulting snapshot into **this repo's**
  `.aiw/views/project_console.snapshot.json` — the same auto-rebuild treatment
  `git_history.snapshot.json` already gets. The config shape is:

  ```jsonc
  {
    "projects": [
      { "root": "../aiw", "id": "aiw" }   // root: project root, relative to the repo root or absolute; id: optional log label
    ]
  }
  ```

  Only `root` is required per entry; entries without a usable `root` are skipped. When several
  projects are listed they populate the same canonical file (last successful projection wins; the
  console renders one project). A **missing or invalid** `projects.config.json`, or a project root
  that does not exist, is **fail-soft**: it is logged and the server serves exactly as it did
  before, leaving any existing snapshot untouched.
- **The UI reads `.aiw/views/` only.** The console fetches the committed/regenerated snapshots
  from `.aiw/views/`; it never reads the legacy `<root>/.aiw/project_console.snapshot.json` path
  and never runs the projector itself.

## 6. `views/roadmap.json` — Roadmap v3 view (optional; objective 003)
The console's Roadmap tab reads this file with `v3Model()`
(`docs/project-console/assets/project-console.js`). The **format spec is that reader**: it
consumes `objectives[]` → `phases[]` → `runs[]`, and derives the Now / Ready Next / Later /
History queue groups itself from each run's `status` + `depends_on` (`v3QueueGroupKey`) — it
reads no persisted group field, so the projector emits none.

```jsonc
{
  "generated_at": "2026-07-10T00:00:00.000Z",
  "generated_from": "aiw-projector@0.1.0",
  "objectives": [{
    "title": "sample_aiw_project",
    "summary": "…",
    "phases": [{
      "title": "Objective queue",
      "runs": [{
        "run_id": "001-first-objective",   // objective filename stem
        "queue_order": 1,                    // dense 1..N, operator reading order
        "title": "First objective",          // first line under the `# Objective` heading
        "summary": "…",                      // first sentence of the objective body
        "full_description": "…",             // trimmed objective body
        "status": "active",                  // planned | active | completed | blocked
        "depends_on": [],                    // run_ids; drives Ready Next vs Later
        "closeout_result": "approved"        // processed runs only (History cell)
      }]
    }]
  }]
}
```

AIW has no phase tree, so every objective becomes a `run` under one synthetic
objective/phase container; the console flattens runs across objectives for the queue
groups, so the flat shape renders faithfully. Mapping (objective 003):

Run `title` is the first non-empty line under the objective file's `# Objective` heading
(AIW objective files lead with a `# Project` H1, then a `# Objective` section) and `summary`
is the first sentence of that objective body — never the `# Project` project name. Files
with no `# Objective` heading fall back to the H1/first-line derivation.

| Source | `status` / `depends_on` | Console group |
|---|---|---|
| `objectives/pending/*` (first alphabetical) | `active` | Now |
| `objectives/pending/*` (the rest) | `planned`, `depends_on: []` | Ready Next |
| `objectives/parked/*` | `planned`, `depends_on: [all pending ids]` (the `active` run is never `completed`, so unsatisfied); when pending is empty, `depends_on: ["__pending_queue__"]` (a sentinel that matches no run, so still unsatisfied) | Later |
| `objectives/processed/PREFIX-*` | terminal — `APPROVED-`/none → `completed`; `REJECTED-`/`BLOCKED-`/`FAILED-`/`CANCELLED-`/`ERROR-`/`HUMAN_REVIEW-` → `blocked` (with the real outcome kept in `closeout_result`, e.g. `error`, `human_review` — never a green `completed`) | History |

> Path note: the projector emits the canonical roadmap at `.aiw/views/roadmap.json`
> (objective 003), but the forked reader's `PATHS.roadmapV3` fetches
> `../../.aiw/roadmap/roadmap.json` (`docs/project-console/assets/project-console.js:11`). The UI
> is frozen, so instead of rewiring it, startup projection **also delivers an identical copy of the
> roadmap view at `.aiw/roadmap/roadmap.json`** — the delivery path the reader actually reads —
> so the Roadmap tab resolves instead of 404ing.

### Delivery copy — `.aiw/roadmap/roadmap.json`
After startup projection, the roadmap view lands at **two** paths for each configured project:

- `.aiw/views/roadmap.json` — the **canonical** view (unchanged; sits beside the console snapshot
  and `git_history.snapshot.json`, per §5). This is the source of truth.
- `.aiw/roadmap/roadmap.json` — a byte-identical **delivery copy**, written solely because the
  frozen console fetches the roadmap from that path (`PATHS.roadmapV3` →
  `../../.aiw/roadmap/roadmap.json`, `docs/project-console/assets/project-console.js:11`). It exists
  only to satisfy the reader; nothing else consumes it, and it is not a new schema.

Both are written atomically (temp + rename) by
`tools/project-console/serve-project-console.mjs` (`PROJECTED_VIEWS[].deliverTo` +
`writeJsonAtomic`). The delivery copy is **fail-soft and contingent**: it is written only after the
canonical view is produced, so a project that cannot produce the roadmap gets neither file, and a
failure writing the copy is logged and skipped, leaving the canonical view in place.
