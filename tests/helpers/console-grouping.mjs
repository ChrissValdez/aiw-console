// THE CONSOLE'S OWN queue-group derivation, taken from the renderer that runs.
//
// `v3QueueGroupKey(run, runsById, model)` is a top-level function of
// project-console/assets/project-console.js. The renderer is a browser script, not a module, so
// it is loaded the same way every consumer suite loads it — inside node:vm over the minimal DOM
// stub — and the function is read off the resulting context. Nothing is copied here.
//
// Why this exists. `tools/projector/project.mjs` exports `roadmapQueueGroup()`, which its own
// comment declares a mirror of this function, and the suite used to assert against that mirror.
// The two have diverged: the console returns `needs_human_decision` for an active run whose
// derived current stage is human QA and waiting, and it treats a planned run barred by a
// D-051 barrier as `later` even when every dependency is complete. The mirror knows neither, and
// takes no `model` argument at all. A suite that asserts against the copy goes green over a
// description of the console that no longer describes it.
//
// Repairing the mirror belongs to the console-defects run, not here. This helper only makes the
// tests ask the real function.

import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createConsoleHarness } from "./console-dom.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const RENDERER = join(resolve(HERE, "..", ".."), "project-console", "assets", "project-console.js");

// One context for the whole file: the function is pure over its arguments.
let cached = null;

function rendererContext() {
  if (!cached) cached = createConsoleHarness({ rendererPath: RENDERER, rootsByKey: new Map() }).sandbox;
  return cached;
}

// The console's semantic queue group for a run: "now" | "needs_human_decision" | "ready_next" |
// "later" | "history". `model` is optional and only barrier-aware callers pass it, exactly as in
// the renderer.
export function consoleQueueGroupKey(run, runsById, model) {
  const fn = rendererContext().v3QueueGroupKey;
  if (typeof fn !== "function") {
    throw new Error("project-console.js no longer defines v3QueueGroupKey; the tests must follow the rename");
  }
  return fn(run, runsById, model);
}

// Guard for the tests: proves the function came out of the renderer source rather than from a
// stale context or a stub that happens to answer.
export function rendererDefinesQueueGroupKey() {
  return /function\s+v3QueueGroupKey\s*\(/.test(readFileSync(RENDERER, "utf8"));
}
