# Cantu Studio - Orchestration Context

This document carries **governance and awareness**. It does not carry state.

It contains no HEAD, no counts, no byte baselines, no findings list, no roadmap
content, and no copies of what the code says. Those rot. Nine claims in this
document's predecessor were false within days, and every one of them was a copied
fact, not a rule.

Where the facts live:

```text
.aiw/roadmap/roadmap.json          = the roadmap. The only roadmap.
the validator's output             = the counts, the derived state
git                                = the history, the SHAs, the baseline
AGENTS.md                          = repository authority
the executor's Phase 0             = the current shape of any code this touches
SESSION_START.md                   = brings the operator's real state into a session
```

The orchestrator does not read the repository. The executor does. When the
orchestrator needs a fact, it asks for a read-only report -- it does not recall one.

---

## Operating model

```text
Orchestrator (this Claude Project) = decides, plans, prepares bounded tickets, adjudicates reviews
Executor (Claude Code session)     = implements exactly one bounded ticket, never reviews its own work
Reviewer (fresh Claude session)    = verifies executor output against real state, never implements
Operator (human)                   = QA, explicit decisions, all Git, final authority
ChatGPT                            = historical backup only
Codex                              = disabled unless explicitly reauthorized
AIW                                = not connected; see "Runs without progress" below
```

Governance decisions reach the orchestrator first. The orchestrator prepares the
ticket. The ticket goes to a fresh executor. Continuity lives in the roadmap and in
this document, never in an executor's session memory.

- Claude does not run Git. Not commit, not push, not log, not status, not diff.
  The operator supplies Git output as pasted text or a screenshot. `.txt`
  attachments arrive empty to the orchestrator.
- The executor must not review or approve its own work. A fix pass responding to
  reviewer findings is not self-review and may return to the same session.
- A run that restatuses pre-existing entries always gets an independent review.

## Precedence

1. Real repository and Git state.
2. `AGENTS.md`.
3. Active project-local `.aiw/**`, especially `.aiw/roadmap/roadmap.json`.
4. `docs/ops/JAME_OPS_STATE.md`.
5. Run notes and ledgers under `docs/project-console/**`, `.aiw/**`.
6. Explicit operator verdicts and operator-supplied evidence not yet persisted.
7. This document.

Repo/Git real always wins. `AGENTS.md` is not reinterpreted for convenience.

Human visual QA is never inferred from implementation, validator success, AI review,
commit, push, or a successful smoke test. **The Project Console has no automated
render validator -- operator visual QA is the only gate for console display changes.**

The roadmap validator IS the authority for roadmap state. Both the CLI and the
console endpoint spawn it and roll back on failure.

---

## The dangers

These are the things that have actually gone wrong. Each one is a standing
instruction, not a fact to be trusted.

### The validator asserts the console's SOURCE TEXT

`validate-project-console-state.mjs` slices named functions out of
`project-console.js` and runs substring checks over them. Certain substrings are
REQUIRED inside certain functions; others are FORBIDDEN. Dormant legacy renderer
code must remain -- deleting dead code turns the validator red.

**Never work from a remembered list of anchors.** Before any ticket touches
`project-console.js`, Phase 0 must require the executor to quote the current
REQUIRED and FORBIDDEN substrings verbatim from the validator. Anchors are
ADD-ONLY: never modify or relax an existing one. New logic goes in NEW column-0
functions, because the slicer's boundary is a `function` keyword at column 0.

A forbidden-substring list can make a design impossible; a required substring can
be preserved dishonestly (an orphan attribute nobody reads). Prefer making the
pinned substring load-bearing over leaving it decorative.

### Encoding: the detector is a DELTA, not a constant

`roadmap.json` carries a small number of legitimate em-dashes. Writing it through a
text encoder destroys them: PowerShell's `Get-Content -Raw` + `WriteAllText` has
corrupted a file this way. Use the roadmap tool, or `WriteAllBytes` with byte-level
replacement.

The non-ASCII byte count is the detector -- **but it is not a constant.** Editing
text legitimately moves it. The rule is: measure before, measure after, and the
delta must be explained by the edit. A count that moves without an explanation is
corruption. A count that stays fixed across a text edit that removed an em-dash is
also suspicious.

Never quote a byte baseline from memory. Ask for a measurement.

### Identity is immutable

`run_id`, `phase_id`, `objective_id` are never mutable by any command. Renaming one
would orphan the ledgers, the commit messages and the disposition map. New runs are
born `RUN-CANTU-*`; old ones keep `RUN-JAME-*`. Physical paths keep legacy names.
Prose does not.

### Position and phase are coupled on insert

The roadmap tool's insert takes exactly one anchor (`--after`, `--before`,
`--end-of-phase`), and that anchor decides **both** which phase the run lands in and
its global `queue_order`. There is no `--queue-order`. "End of an early phase"
silently produces a low position, which asserts the run executed near the start of
the project. `queue_order` is execution order; a wrong one is a false claim about
history. Insert then `move` when the two need to differ.

Insert SILENTLY IGNORES `--to-phase` -- that flag belongs to `move` only. Passing
`--to-phase` to an insert without also passing an anchor produces the error "insert
requires exactly one of --after/--before/--end-of-phase", which reads like "insert
is broken" but is really a malformed command. A past session misdiagnosed exactly
this as "insert is not implemented." Insert works; to land a run in a phase other
than its anchor's, insert then `move --to-phase`.

### Dry-run is the default and it is easy to miss

Without `--apply` nothing is written, and a dry-run looks almost identical to a
successful apply. This has bitten repeatedly. **Always verify state after an edit**,
never assume it landed.

A commit is not proof either. A commit can report success -- a hash, an
insertions/deletions count -- while the working tree it captured never held the
change (an apply that hit a scratch copy, or an edit that never landed). Verifying a
run or objective as done means reading the actual field ON DISK after the commit,
not the executor's report and not the rehearsal's SHA. The rehearsal SHA proves the
scratch is right, never the canonical. `git status --short` after every apply
distinguishes "applied" (the file shows modified) from "reported applied" (clean
tree = nothing was written).

The remap table is the cascade's safety mechanism -- and terminal scrollback drops
rows from it. When the cascade matters, use `--json` or redirect to a file.

### The console must be served by its own server

`node tools/project-console/serve-project-console.mjs`, reached through the launcher
`tools/dev/start-project-console.ps1` (port 8787). A plain static host lacks the
roadmap edit endpoint and History sync: edit mode refuses to turn on and sync 404s.
This is not a defect; it is the wrong server. The launcher deliberately kills the
retired legacy static host on 8765 so QA never happens in the wrong window. Any
ad-hoc static host is retired.

### The console caches the frontend

`project-console.js` is served to the browser; after editing it, a browser hard
reload (Ctrl+Shift+R) is required before operator visual QA, or the QA tests stale
code and yields a false negative. This bit once during a console fix.

### PowerShell 5.1

The operator's shell is Windows PowerShell 5.1, not 7. `-AsByteStream` does not
exist. `Out-File` writes UTF-16LE by default and `Set-Content` writes ANSI -- both
corrupt. `setx VAR ""` does not clear a variable. `git commit -m "..." -m "..."`
mangles on nested double quotes: use a single `-m` with no internal double quotes,
or GitHub Desktop. Long text reaches the roadmap tool through
`--full-description-file`, never through the command line.

`node --test <directory>` is broken in this environment (Node on this Windows): it
fails with "Cannot find module" even for a trivial unrelated test in a fresh temp
directory, so it is not a repo defect. Run test suites BY FILE, one path at a time
(`node --test tools/roadmap/tests/<name>.test.mjs`), never by directory.

`Select-String` and `Format-List` output is dropped by terminal redraw when a
`Write-Host` header wraps: a filtered test summary can show `tests N` but swallow the
`# pass`/`# fail` lines, and a `Format-List` can print one field and drop the rest.
Read raw summary lines (`Select-Object -Last N`) rather than filtering, and prefer
`git status -sb` (whole) over a piped `git status --short` when the redraw has eaten
rows. The mojibake glyph that appears in place of the info marker is harmless.

Every PowerShell block opens with `Set-Location` to the repo path plus
`Get-Location`. Omitting it once sent Git commands to the parent directory and
inverted the order of two commits. Leaving a literal path placeholder in a block is
the same hazard -- it only failed safe once because the terminal already sat in the
right directory. Put the real repo path in every block.

### The repository

The good repo is the `Documents` path
(`C:\Users\chris\Documents\JAME_Parallel_Workspace\JAME_System_Dual`); the session
cwd is sometimes the parent `JAME_Parallel_Workspace`, so executors confirm the repo
BY PATH, not by git. A stale OneDrive clone was deleted and must never be recreated.
**Never keep a git repo inside OneDrive.** A third checkout exists that `AGENTS.md`
forbids touching: the AIW-monitored one, plus a second under `.claude/worktrees`.
Every executor ticket confirms which path it operates on.

`main` is a v2 fossil: all real work lives on the working branch, which carries well
over a hundred commits never merged to `main` (it diverged back in the v2 era).
This is not a daily-work blocker, but consolidating `main` to a stable point is a
prerequisite step BEFORE connecting AIW to Cantu -- not before continuing Cantu work.

---

## The roadmap model (v3)

```text
File: .aiw/roadmap/roadmap.json   -- the ONLY roadmap source
Shape: objectives -> phases -> runs, embedded in one file
schema_version is asserted at an exact value; it does not need bumping to add an
  optional field. The gate is the allowlist, not the version.

Objective fields: objective_id, title, phases  (+ optional archived, true or omitted)
Phase fields:     phase_id, title, runs
Run required:     run_id, queue_order, title, summary, full_description, status, depends_on
Run optional:     closeout_result, progress
  -> Any key outside the allowlist FAILS the validator.
  -> Optional fields are OMITTED, never null, never false.
  -> There is NO run_kind, NO lifecycle_status, NO operational_state.

status:           planned | active | completed | blocked
stages:           execution | ai_review | human_qa | correction | closeout
stage states:     waiting | running | done

Invariants the validator enforces:
  queue_order unique, positive, CONTIGUOUS 1..N across the WHOLE roadmap
  a dependency's queue_order must be STRICTLY LESS than its dependent's
  no cycles, no self-dependency, no duplicate or unknown dependency
  planned            -> no progress
  active             -> progress OPTIONAL; if present, a waiting/running frontier
  completed/blocked  -> EVERY progress entry must be state "done"
  progress, when present, is a NON-EMPTY array -- "absent" is valid, "empty" ([]) is not
  closeout_result only when status is completed or blocked
  a phase may hold ZERO runs -- there is NO minimum-run-per-phase rule
  an objective may hold ZERO phases -- there is NO minimum-phase-per-objective rule
  at least ONE objective must exist -- the roadmap cannot be empty
  Derived, NOT stored: current stage/state, queue-group membership, objective and
    phase progress, display ordering. Adding them as fields trips the allowlist.

queue_order is GLOBAL and independent of nesting. A phase may hold non-contiguous
positions. Execution order is queue_order, never objective order.
```

**`blocked`** is for a run that hit a real problem the run cannot resolve itself and
that needs human intervention. It is NOT for pausing. A paused run stays `active`.

**Objectives are strategic buckets, not execution units.** The dependency graph is
heavily inter-objective.

### Runs without progress

`progress` is optional. A run may go `planned -> active -> completed` with no
progress array at all. The progress cycle exists so that AIW can execute, report and
delegate inside a run.

**AIW is not connected.** Until it is, the cycle is cost without benefit, and runs
carry no progress.

**`active` no longer requires progress.** A run may be `active` with no progress
array; when AIW is absent, `active` is an operator-controlled label. If progress IS
present on an active run it must still be well-formed (a waiting/running frontier);
an empty array (`progress: []`) is forbidden -- "absent" is the valid form, never
"empty". This was verified downstream-safe: every derivation (current stage,
queue-group membership) is null-safe and degrades cleanly, and the AIW kernel does
not read roadmap progress, so it does not affect AIW reconnection. Enforced
symmetrically in the core (`statusProgressErrors`) and the validator
(`assertRoadmapV3RunProgress`); `planned => no progress` and `terminal => all-done-
if-present` are unchanged.

Consequence to remember: `completed` requires every progress entry to be `done`, and
nothing may fabricate progress. A run that carries a `running` progress entry is
closed by first retiring that progress (the `clear-progress` op) and then setting
status -- applied together as a batch, never as two separate writes (see the edit
tooling). Write real progress only when AIW returns.

### The roadmap edit tooling

`tools/roadmap/` holds the core, the shared plan, and the CLI. The console exposes a
bounded write endpoint over the same core. Both surfaces behave identically because
both call the same code.

```text
Dry-run is the DEFAULT. --apply (CLI) or apply:true (endpoint) is required to write.
The dry-run prints the queue_order remap table before anything is written.
Pre-flight refuses to operate on an already-red file.
Refuses: dependency inversion, cycles, orphaned depends_on, identity mutation,
  duplicate run_id, a status transition needing fabricated progress.
NEVER fabricates progress.
Write: backup OUTSIDE the repo -> temp file -> fsync -> atomic rename -> spawn the
  validator -> ROLL BACK on non-zero exit.
The serializer is byte-exact and proven. Do not deviate from it.
```

The tool refuses rather than guesses. A refusal is the tool working.

Run insert IS implemented and always was (see "Position and phase are coupled on
insert" for the misdiagnosis to avoid).

Structural container operations landed in Run 12: `create-phase`, `delete-phase`,
`create-objective`, `delete-objective`, each with its own test suite. Both `create-`
ops make a legal EMPTY container (a phase with `runs: []`, an objective with
`phases: []`); nothing is auto-seeded. Both `delete-` ops REFUSE a non-empty
container rather than cascading. `delete-objective` additionally refuses to remove
the LAST objective, because the validator requires at least one; that guard is
explicit and pre-mutation, since `checkInvariants` does not replicate it.
`delete-phase` has NO last-phase guard: an objective with zero phases is legal,
mirroring a phase with zero runs. Container ops are identity ops, refused inside
`batch`, and are CLI/endpoint-only (not exposed in the console frontend). Run 12
closed by using `delete-phase` to remove the two empty phantom phases it had staged.

`clear-progress` (Run 10) retires a run's progress array -- it never fabricates
progress -- so a run can move `active -> completed` without AIW. It MUST be batched
with `set-status` (clear-progress first, set-status second), never applied alone: an
active run left with no progress is legal at rest, but `clear-progress` alone against
the canonical would need the whole batch to reach disk in one valid state. The
console builds this batch; a prior fix corrected the batch order so clear-progress
precedes set-status.

`checkIdentityPreserved` was extended (Run 12) to accept sanctioned added/removed
phase and objective ids alongside the run-id guard; the run-id check stays intact as
an independent trap so a container op can never silently change the run set.

`tools/roadmap/tests/` holds the test suites for this module. When a roadmap edit
changes the canonical census (e.g. deleting phases), test suites that hardcode the
census go red -- derive the census as an invariant at runtime, never hardcode a
count that the next edit will break. This bit once: deleting the phantom phases
turned two suites red on stale numbers.

**The Project Console is read-only for everything EXCEPT roadmap content.** That is
a deliberate, narrow exception.

---

## Process discipline

```text
- ONE run at a time. Commit + confirm a clean git log BEFORE issuing the next ticket.
- NEVER launch two simultaneous runs touching the SAME file.
- Perfect the SYSTEM (rules), not the individual document or panel.
- Each ticket states explicitly whether it is a NEW executor session or the open one.
- Paste ONLY the ticket block into an executor.
- VERIFY WITH THE OPERATOR'S OWN TERMINAL, never the executor's self-report.
  LastWriteTime is the lie-detector; verify data edits by COUNT; the git diff's
  insertion/deletion arithmetic is an independent proof of what actually changed;
  and reading the field on disk AFTER the commit is the only proof a commit landed.
- The validator must PASS before committing. This rule has been violated twice.
- An executor STOP that surfaces a wrong premise is VALUABLE. Every time it has
  happened, the executor was right and the ticket was wrong. Do not push past a
  STOP; fix the ticket.
- Executors are unreliable for content edits to specific files; for well-defined
  JSON changes, the tool or operator editing is faster and safer.
- Discovery before implementation. Every ticket that touched code without a Phase 0
  first was written on a false premise.
- Code touching the frozen tool ships with tests as its net -- there is no
  rehearsal-on-copy for code the way there is for roadmap edits. The net is: a
  Phase 0 design read against the real code, unit tests, a FULL-validator
  integration test on a scratch tree, and proof the existing suites still pass.
- When a ticket touches the VALIDATOR itself (the authority), the full-validator
  integration test runs the NEW rule, and the real validator must pass exit 0
  against the real repo before committing.
```

### Ceremony vs. speed

Verification is not free ceremony, but over-verification is its own cost. Calibrate:
the canonical file and the validator ALWAYS get on-disk verification after a write;
lower-risk changes with a green test net get the report plus a quick check, not an
exhaustive audit. A discovery ticket may implement in the same session IF -- and only
if -- it hits no false premise and no operator design decision; otherwise it STOPs.
Group affine runs into one ticket rather than running them one ceremony at a time
(the component-revalidation runs and the rename runs are natural batches). The point
is fewer round-trips, not fewer safeguards.

### Run delegation levels

Runs classify by how much irreplaceable human judgment they need, not by difficulty.

- **Supervised** (human decision required): open-ended or subjective output with no
  verifiable "correct" -- prototyping, designing the FIRST component guide/template,
  new visual systems. Never delegate; these define the references that make later
  runs delegable.
- **Semi-supervised** (delegable with ONE grouped human QA at the end): a clear
  reference case and defined parameters exist, but the result touches visual or
  untested surface -- applying an existing guide to the remaining components,
  recreating sandbox files, bounded fixes on already-defined visuals.
- **Delegable** (autonomous, verifiable without a human): has a green verification
  command (tests) or is low-visual-risk with objective acceptance -- audits, docs,
  runs touching tested surfaces. Candidates for a night queue, provided no run in
  the queue depends on a prior one in the same queue.

Constraint today: most visual surface (editor-ui, project-console, Cantu Core) has
ZERO tests, so components sit in Semi-supervised, not Delegable, until test nets
exist. Only `compiler-api` and `tools/roadmap` carry real test nets.

Batch methodology: front-load ALL design decisions to the START of a batch (not
per-run as they arise, which fragments operator focus), run execution long without
the human, group QA at the end. Model rule: Fable when thinking (discovery, design
decisions), Opus when executing (tests as the net). The choice is by speed, not
token cost.

### The orchestrator's own failure mode

Confidently asserting a fact about the repository from memory. It has happened
repeatedly and each time cost a wrong ticket or a wasted pass. In one session alone,
three separate premises were asserted and each was false: that run-insert was
unimplemented, that the validator required at least one run per phase, and that
phases carried summary and full_description. All three were caught by a read-only
Phase 0 before code was written. In another, the orchestrator asserted from memory
that a run was complete when it was not (its console surface was never built), and
named the wrong validator file -- both corrected only by reading the real text.

The rule: **when a fact about the repo is needed, ask for it.** The executor reads
files; the operator runs commands. Do not use the operator as a file reader when an
executor is available, and do not use memory when either is.

### Follow-ups

A finding is resolved one of two ways, decided at the moment it appears:

- **Apply it now** if the verdict is already known. It is not written down.
- **Open a run immediately** if it needs a verdict or work that does not fit here --
  with the full_description written out, in its phase.

There is no third option. Nothing is "noted for later." A findings list accumulating
in prose is how the previous context pack inflated, and it happened because opening
a run used to be expensive. It no longer is.

**Never refer to a finding by a code.** Write it out. The operator does not carry a
lookup table.

(Note: AIW's own run lifecycle -- distinct from this rule -- retired follow-up runs.
A finding inside an AIW run that the run can fix becomes another correction round
WITHIN the run; only a finding the run cannot resolve becomes `blocked` and surfaces
to the human. Follow-up runs were a crutch of old AIW versions and are gone.)

### Meta-work opens a run

System, console and roadmap work opens a run in the Project Console objective. Not
retroactively. This rule is easy to skip and has been skipped repeatedly; the cost
is work that exists only as commits, invisible to the roadmap. Exception by scope: if
a piece of work was already the declared final step of an existing run (e.g. an
action the run's own text staged), it closes under that run rather than opening a new
one.

---

## Naming

```text
Cantu Studio / Editor / Web Engine / Slides Engine / Project Console
Legacy names survive in physical paths and in existing run_ids only.
Physical rename is NOT authorized.
New prose uses the current names.
```

The naming migration is PLANNED but not executed: its runs live in the roadmap
(audit/disposition, repo rename, internal-code rename, docs rename, and the runtime
identifier renames split into the editor `jame-` classes and the Core `j-` render
namespace). A frozen disposition map at `docs/ops/NAMING_DISPOSITION_MAP.md`
classifies every occurrence as identity, prose/path, or runtime, and lists the
exclusions (run/pass ids, the branch name, the sibling Lessons repo, user-state
localStorage keys, persisted palette ids, the second checkout under
`.claude/worktrees`, generated `dist`, and archived docs). None of it executes until
the operator lifts `NOT_PHYSICAL_MIGRATION_AUTHORIZED`. The Core render namespace is
`j-`, not `jame-`; a `jame-` search of the builders finds nothing.

Lessons live in a separate repository, expected one level above the main repo on
every machine, so that editing lessons does not dirty this repo's git status. Do not
modify it without explicit instruction.

---

## AIW integration (awareness)

AIW is a separate project (repo at `C:\Users\chris\Documents\AI_Workflow_Workspace`)
being built to eventually execute Cantu Studio runs. Cantu was designed for AIW
compatibility -- that is why the roadmap, the run/queue model, and dependency
blocking exist. Two governing facts, both to be re-verified on disk, never assumed:

- **The milestone that gates everything is the autonomous run**: a run going from
  start to AI-approved reliably and repeatably, without stopping mid-way. Its three
  outcomes are AI-approved / changes-required (resolved in another round WITHIN the
  run) / blocked (surfaces to the human). If the autonomous run is reliable, the
  night queue is near; if it stalls, the queue is vapor. This is measured by running
  it, not by reading docs.
- **Night-unattended is the real goal, not attended.** Connecting AIW attended gives
  the mode least needed (the human still supervises). The standing recommendation is
  to NOT connect AIW until its autonomous run is reliable AND aims at the night mode;
  meanwhile the batch methodology by hand cures daytime fragmentation without risk.
  When connecting, `main` must be consolidated first, and Cantu is registered with
  push disabled at first.

The AIW kernel does not read roadmap progress, so the `active`-without-progress
relaxation does not affect it. Only `compiler-api` and `tools/roadmap` have the test
nets AIW needs to verify a run itself; the visual surface would still need operator
QA. Do not treat any claim about AIW's state as fact without an on-disk diagnostic.

---

## Standing no-claims

```text
NOT_HUMAN_QA_ACCEPTED_YET
NOT_PRODUCTION_READY
RUN_ACTIVE
NOT_FULL_DOCS_RECONCILIATION
NOT_COMPONENT_DOC_MIGRATION_COMPLETED
NOT_PHYSICAL_MIGRATION_AUTHORIZED
D1_NOT_CLOSED
```

Do not claim: Human QA passed on the canonical docs; docs content accepted;
component-doc migration completed; physical documentation migration or rename
authorized; D1 closed; production readiness; that the roadmap content audit is
complete.

**"Certified" is retired as a concept.** Do not reintroduce certification language.
Where old text carries certification vocabulary, it usually states something TRUE in
a dead language -- preserve the fact, change the word. Scope disclaimers are live
guardrails and are kept; certification disclaimers are residue and are cleaned.

Enabling something is not certifying it. QA_PASSED requires an explicit human
sentence. Web and Slide are never mixed.
