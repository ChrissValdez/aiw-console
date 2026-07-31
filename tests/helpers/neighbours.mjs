// FROZEN NEIGHBOUR FIXTURES — the emitted contract folders of the two real projects, captured
// once as DATA and never regenerated from the live repositories.
//
// Why this exists. The consumer suites used to point at `../../cantu-studio` and at this
// repository's own working tree, and assert their real counts: 71 runs, 38 reviewed documents,
// 45 runs of our own roadmap. None of those is an invariant of the CODE. Every one of them moved
// the moment a neighbour committed, or the moment the cabin closed a run here, and the suite went
// red without a single line of the console changing. A suite that does that cannot arbitrate a
// change, because a real regression is indistinguishable from a neighbour having moved.
//
// What is frozen here is the same shape the console reads at runtime — a `.project/` folder of
// emitted artifacts, plus the canonical roadmap each project keeps in its own layout — so the
// assertions that used to run against the live repositories run unchanged against these, with
// their expected values intact. The numbers below are the fixtures' numbers, and they are stable
// because a fixture is a file, not a neighbour.
//
// FROZEN ON 2026-07-30 from the two real roots. Refreshing them is a deliberate act with its own
// re-measurement; nothing in the suite regenerates them, and no test may read the live neighbours
// to build them (that would restore exactly the coupling this replaced).
//
// The one thing that stays live is the smoke test in tests/real-projects-smoke.test.mjs: that the
// real projects still load. No figure of a neighbour is asserted anywhere else.

import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = resolve(HERE, "..", "..");
export const NEIGHBOURS_DIR = join(REPO_ROOT, "tests", "fixtures", "neighbours");

// The two frozen roots, keyed the way the registry and the harness key them.
export const AIW_CONSOLE_FIXTURE = join(NEIGHBOURS_DIR, "aiw-console");
export const CANTU_FIXTURE = join(NEIGHBOURS_DIR, "cantu-studio");

// Drop-in replacement for the `rootsByKey` maps the console harness takes.
export const FROZEN_ROOTS = new Map([
  ["aiw-console", AIW_CONSOLE_FIXTURE],
  ["cantu-studio", CANTU_FIXTURE]
]);

const rootOf = (key) => {
  const root = FROZEN_ROOTS.get(key);
  if (!root) throw new Error(`no frozen neighbour fixture for "${key}"`);
  return root;
};

const readJson = (path) => JSON.parse(readFileSync(path, "utf8"));

export const frozenSnapshot = (key) => readJson(join(rootOf(key), ".project", "snapshot.json"));
export const frozenDocsIndex = (key) => readJson(join(rootOf(key), ".project", "docs_index.json"));
export const frozenProjectFile = (key, name) => readJson(join(rootOf(key), ".project", name));
export const frozenDocsIndexPath = (key) => join(rootOf(key), ".project", "docs_index.json");

// Each project keeps its canonical roadmap in its own layout (`roadmap/roadmap.json` here,
// `.aiw/roadmap/roadmap.json` in cantu-studio). The frozen copies are stored under a single
// neutral name: the layout question is the projector's, and it is tested on its own fixtures.
export const frozenCanonicalPath = (key) => join(rootOf(key), "canonical", "roadmap.json");
export const frozenCanonical = (key) => readJson(frozenCanonicalPath(key));

// The measured content of the fixtures, as of the freeze. Exported for the record and for
// readers; the tests pin their numbers as literals, so that a fixture edited without a
// re-measurement fails loudly instead of quietly agreeing with itself.
export const FROZEN_ON = "2026-07-30";
