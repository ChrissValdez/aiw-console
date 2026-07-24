# Project Console (transplanted, read-only)

The Project Console of `cantu-studio`, transplanted onto this project's own sources. It is the
**real** console — the same `index.html`, the same `project-console.css`, the same renderer — not a
rewrite and not a console "inspired by" it.

## Run it

```bash
node project-console/serve.mjs
```

Then open <http://127.0.0.1:8788/project-console/index.html>. `PC_PORT` overrides the port.

The server serves the repository root read-only: **GET and HEAD only, every other method answers
405**. It runs no Git command, rebuilds nothing, and has no edit endpoint. Nothing in this folder
can write to disk.

## What it reads

Everything comes from `.project/`, the contract folder emitted by `tools/projector/project.mjs`
(`context/aiw-console/CONTRATO.md`). Nothing is read from `.aiw/`, which is the delivery area of
the AIW projection and not this project's own state.

| Route | Status | Feeds |
|---|---|---|
| `.project/snapshot.json` | **required** | gate for the whole console |
| `.project/roadmap.json` | optional, emitted | Overview, Roadmap, Run Queue |
| `.project/docs_index.json` | optional, emitted | Docs navigation |
| `.project/guardrails.json` · `.project/no_claims.json` | optional, emitted | Status → Governance State |
| `.project/git_history.json` | optional, **not emitted yet** | History (shows its empty state) |
| 9 further optional routes | **not emitted** | nothing live; listed as failures in Console Diagnostics |

Missing optional sources degrade fail-soft: the affected surface shows its empty state, the
aggregate banner appears, and every missing file is named one by one in
**Status → Console Diagnostics → State Sources**. Nothing is stubbed, simulated or invented to
make a panel look full.

Document bodies in the Docs tab are the repository's real Markdown files, fetched repo-locally and
rendered by the same conservative escape-first renderer as the source console. No network fetch.

## Two deliberate differences from the source console

1. **Docs opens in `all`, not `newera`.** The `newera` mode filters by `operator_review_status`,
   a field this project's emitter does not emit because it means "a run recorded an operator
   review" and no run recorded one. The field stays absent; the opening mode moves instead.
2. **No write path.** The roadmap edit endpoint and its tooling did not travel. The *Edit roadmap*
   button is still in the toolbar (it is part of the layout) and says so when pressed.

Everything else — layout, styles, tabs, subviews, drawers, empty states, wording — is the source
console's, unchanged. The identity that was baked into it (run ids, project names, doc-path maps,
branch names, `.aiw/` routes) was removed; what the console shows about *this* project comes from
the data.

Full account of what was transplanted verbatim, what was touched, and why:
`context/aiw-console/records/PORT-IDENTICO-CONSOLA-O4-P11.md`.
