# aiw-console

The AIW project console: a zero-dependency, vanilla-JS status console (a static UI plus Node
tooling — no framework, no bundler, no external dependencies). It is a **verbatim fork** of the
JAME project console, copied without modification from `JAME_Parallel_Workspace/JAME_System_Dual`
at HEAD `8ef319e` (branch `jame-parallel-audit-001`); nothing has been de-JAMEd yet — adapting the
readers to AIW state (a projector that emits `.aiw/views/project_console.snapshot.json` from an AIW
project's `objectives/`, `logs/`, and git) is the job of future AIW runs. The console reads a
single **required** artifact, `project_console.snapshot.json`; its shape is drafted in
[`docs/snapshot-schema-v1.md`](docs/snapshot-schema-v1.md) and is finalized by objective 001.

## Layout
- `docs/project-console/` — UI: `index.html` + `assets/project-console.{js,css}` (verbatim from JAME).
- `tools/project-console/` — Node tooling: server, git-history builder, state normalizer, validator (verbatim).
- `docs/snapshot-schema-v1.md` — DRAFT snapshot contract (this repo's own, not from JAME).
- `tests/smoke.test.mjs` — imports a pure util from the console and asserts it behaves.

## Test
`npm test` runs the smoke test with `node --test` (zero dependencies, no install needed).
