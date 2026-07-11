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
Each lives at its own `.aiw/...` path and is loaded only if present:

- `project.json` (`aiw.project.v0.1`) — `project_id`, `mode`, `source_control`, dashboard hints.
- `state/project_status.json` — `status`, `current_run_id`, `next_recommended_run_id`.
- `roadmap/queue.json` — ordered queue: `order`, `run_id`/`objective_id`, `classification`, `blocked_by[]`.
- `roadmap/objectives.jsonl` / `runs.jsonl` — per-item legacy records for the run drawer.
- `views/git_history.snapshot.json` (`aiw.git_history_snapshot.v1`) — `head`, `current_branch`, `branches[]`, `commits[]` (produced by `build-git-history-snapshot.mjs`; git-ignored, regenerated locally).
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
