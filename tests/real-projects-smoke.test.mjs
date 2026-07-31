// THE ONLY TEST THAT TOUCHES THE REAL SIBLING PROJECTS — and all it asks is that they LOAD.
//
// Everything else that used to run against `../../cantu-studio` and against this repository's own
// emitted folder now runs against the frozen fixtures in tests/fixtures/neighbours/. The reason is
// recorded there: a neighbour's run count is not an invariant of this console's code, so asserting
// it turns every commit next door into a red suite here, and makes a real regression
// indistinguishable from a neighbour having moved.
//
// What is still worth checking against the real thing is exactly this: that a real emitted folder
// is still something this console can open. That is a property of the CONTRACT between emitter and
// reader, and it cannot go stale when a neighbour grows — it only breaks if the contract itself
// breaks, which is precisely when the suite should go red.
//
// No count, no title, no vocabulary and no document total of any real project is asserted here.
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createConsoleHarness } from "./helpers/console-dom.mjs";
import { snapshotSummary } from "../project-console/assets/project-shell.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const CANTU = resolve(REPO_ROOT, "..", "cantu-studio");
const RENDERER = join(REPO_ROOT, "project-console", "assets", "project-console.js");

const REAL = [["aiw-console", REPO_ROOT], ["cantu-studio", CANTU]]
  .filter(([, root]) => existsSync(join(root, ".project", "snapshot.json")));
const skipReal = REAL.length ? false : "no real project has an emitted folder beside this one";

test("every real project beside this one still LOADS: the shell opens its emitted folder and summarises it", { skip: skipReal }, async () => {
  for (const [key, root] of REAL) {
    const harness = createConsoleHarness({ rendererPath: RENDERER, rootsByKey: new Map([[key, root]]) });
    harness.sandbox.setActiveProjectBase(`/projects/${key}/`);
    const result = await harness.sandbox.loadActiveProject();
    await harness.flush();

    assert.equal(result.ok, true, `${key}: the shell could not load the real emitted folder`);
    assert.ok(result.snapshot, `${key}: loaded without a snapshot`);

    // The shell can execute the snapshot's OWN derivation table over it. This is the contract —
    // not what the table produces, which is the project's business and changes when it works.
    const summary = snapshotSummary(result.snapshot);
    assert.ok(summary, `${key}: the shell could not summarise the real snapshot`);
    assert.ok(summary.counts.runs > 0, `${key}: a real project with no runs at all is not a load`);

    // It painted something, and it did not announce a broken load.
    assert.match(harness.element("roadmap-v3-tree").innerHTML, /\S/, `${key}: the roadmap surface is empty`);
    assert.doesNotMatch(harness.element("load-notice").innerHTML, /could not be loaded/, `${key}: announced an absence`);
  }
});

test("every real project's emitted folder declares artifacts that are all on disk", { skip: skipReal }, () => {
  for (const [key, root] of REAL) {
    const snapshot = JSON.parse(readFileSync(join(root, ".project", "snapshot.json"), "utf8"));
    assert.ok(Array.isArray(snapshot.emitted_artifacts), `${key}: transports no declaration`);
    // The COUNT is deliberately not asserted: how many artifacts a root can emit depends on what
    // sources it happens to keep, which is the project's business. That every declared file
    // resolves is the contract, and it is what §7 promises.
    for (const entry of snapshot.emitted_artifacts) {
      assert.ok(existsSync(join(root, entry.path)), `${key}: declared but absent: ${entry.path}`);
    }
  }
});
