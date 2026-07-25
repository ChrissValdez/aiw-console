# Project Console (transplanted, read-only, multi-project)

The Project Console of `cantu-studio`, transplanted onto this project's own sources (O4.P11), now
wrapped by a **multi-project shell** (O4.P3): a persistent sidebar lists every registered project,
a Portfolio board summarises them, and selecting one hands it to the transplanted renderer — the
same `index.html` surface, the same `project-console.css`, the same renderer — not a rewrite and
not a console "inspired by" it.

## Run it

```bash
node project-console/serve.mjs
```

Then open <http://127.0.0.1:8788/project-console/index.html>. `PC_PORT` overrides the port.
`PC_REGISTRY` (path relative to the repo root, or absolute) points the server at an alternative
project registry — the test fixtures under `tests/fixtures/multi/` use this; the real registry is
never edited for QA.

The server serves the repository root read-only, plus one **virtual namespace**
`/projects/<key>/**` that maps onto the roots listed in the registry — that is how sibling
repositories' `.project/` folders and doc bodies are read. **GET and HEAD only, every other method
answers 405**, on every route. It runs no Git command, rebuilds nothing, has no edit endpoint, and
never serves any `.git/`. Nothing in this folder can write to disk; registered roots are read,
never written.

## The project registry

`project-console/projects.json` is the operator-maintained list of projects this console
aggregates — the only place project identity lives outside the data:

```json
{
  "registry_model": "project_registry_v1",
  "title": "AIW Console",
  "projects": [
    { "key": "aiw-console", "root": ".." },
    { "key": "cantu-studio", "root": "../../cantu-studio" }
  ]
}
```

`key` is the URL segment under `/projects/`; `root` is the project's repo root, **relative to this
folder** (sibling repos need no absolute paths). The console reads `<root>/.project/` per the
contract. A project whose `.project/` is missing or unreadable still appears in the menu, marked
with its state — it never breaks the shell or the other projects.

## What it reads

At boot the shell fetches the registry plus **one `snapshot.json` per project** (the required
artifact) to name and mark every menu entry and fill the Portfolio board. The heavy sources of a
project (roadmap, docs index and bodies, git history, governance) load when it becomes the active
project. Objective/phase status on the Portfolio board is derived by **executing the
`taxonomy_model` derivation table each snapshot carries** (O4.P2 envelope decision) — no status
vocabulary is baked into the shell, and a project with a different vocabulary renders without code
changes.

Everything per-project comes from that project's `.project/`, the contract folder
(`context/aiw-console/CONTRATO.md`). Nothing is read from `.aiw/`, which is the delivery area of
the AIW projection and not this project's own state.

| Route | Status | Feeds |
|---|---|---|
| `.project/snapshot.json` | **required** | gate for the whole console |
| `.project/roadmap.json` | optional, emitted | Overview, Roadmap, Run Queue |
| `.project/docs_index.json` | optional, emitted | Docs navigation |
| `.project/guardrails.json` · `.project/no_claims.json` | optional, emitted | Status → Governance State |
| `.project/git_history.json` | optional, emitted | History (commits and branches of this repo) |
| 9 further optional routes | **not emitted** | nothing live; listed as failures in Console Diagnostics |

Missing optional sources degrade fail-soft, and since O4.P3 the absence is announced **in the
affected view, naming the file** (CONTRATO §20): History, Overview/Roadmap/Run Queue, Docs and
each Governance table state which `.project/` file could not be loaded. The aggregate banner
remains as a summary — it reserves its own height and pushes content down instead of overlapping
it — and every missing file is also listed in **Status → Console Diagnostics → State Sources**.
Nothing is stubbed, simulated or invented to make a panel look full.

Document bodies in the Docs tab are the repository's real Markdown files, fetched repo-locally and
rendered by the same conservative escape-first renderer as the source console. No network fetch.

## Three deliberate differences from the source console

1. **Docs opens in `all`, not `newera`.** The `newera` mode filters by `operator_review_status`,
   a field this project's emitter does not emit because it means "a run recorded an operator
   review" and no run recorded one. The field stays absent; the opening mode moves instead.
2. **No write path.** The roadmap edit endpoint and its tooling did not travel. The *Edit roadmap*
   button is therefore `hidden` — its handler, its endpoint probe and its honest refusal all stay
   in code, so restoring it the day a write path exists is one attribute away.
3. **Two retired Docs controls.** The grouping toggle (*By category* / *By retention class*), its
   note, the per-document `retention_class` badge and the per-row nav-tier badge are gone. The
   first three read a field of the source project's own retention policy, which this project's
   `docs_index` does not carry — a control with no data behind it. They were invisible in the
   source console only because they render outside `newera`, its opening mode; difference 1
   uncovered them. Docs is a list of clean titles grouped by the data's own `ia_bucket`.

Everything else — layout, styles, tabs, subviews, drawers, empty states, wording — is the source
console's, unchanged. The identity that was baked into it (run ids, project names, doc-path maps,
branch names, `.aiw/` routes) was removed; what the console shows about *this* project comes from
the data.

Full account of what was transplanted verbatim, what was touched, and why:
`context/aiw-console/records/PORT-IDENTICO-CONSOLA-O4-P11.md`.
