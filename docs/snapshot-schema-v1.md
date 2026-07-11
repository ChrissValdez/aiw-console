# Snapshot schema v1 — `project_console.snapshot.json` (DRAFT)

> **DRAFT.** Derived from the JAME console data contract (audit §B.2, snapshot v0.3). This is the
> AIW projection contract: the shape an AIW projector must emit at
> `<project-root>/.aiw/views/project_console.snapshot.json`. **Finalized by objective 001**
> (`001-console-projector`), which builds the projector and its fixture tests and then removes this
> DRAFT flag to match the implementation. Until then, treat every field below as provisional.

## Why this file exists
The forked console reads many `.aiw/*` sources, but **exactly one is required**:
`views/project_console.snapshot.json`. Everything else is fail-soft enrichment. So the smallest
useful projector emits just this file; richer views come from the optional groups (§3).

## 1. Envelope
```jsonc
{
  "schema_version": 1,              // integer; AIW contract. (JAME used the string "0.3".)
  "project_id": "aiw_console",      // stable id of the projected project
  "generated_at": "2026-07-10T00:00:00.000Z",  // ISO-8601 of projection
  "generated_from": "aiw-projector@<version>"   // provenance of this snapshot
}
```

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
| `roadmap_tree` | object | Hierarchical work model the Overview/Roadmap views render. For AIW v1 this is a flat list of objectives (pending/parked/processed) rather than JAME's objective→phase→run tree. |
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
