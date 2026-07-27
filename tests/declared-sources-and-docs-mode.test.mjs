// O4.P13 — TWO CONSUMER RULES, both decided by DATA the project transports, neither by a name
// this console knows:
//
//   A. §20's absence banner fires for the files a project DECLARES emitting and that fail to
//      load — and for nothing else. It used to fire on any fetch failure, and the renderer
//      fetches nine legacy routes no emitter of this contract writes (§18.a), so it was on
//      permanently: an alarm that never goes off announces nothing.
//   B. The Docs tab opens on the mode the project's OWN index supports: `newera` when its
//      entries carry `operator_review_status`, `all` when they do not.
//
// Same harness and same limits as the other consumer suites: the REAL renderer inside node:vm
// over a DOM stub (tests/helpers/console-dom.mjs), fetching from the virtual /projects/<key>/
// layout the read-only server exposes. CSS and real clicks stay with the operator QA pass.
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createConsoleHarness } from "./helpers/console-dom.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const RENDERER = join(REPO_ROOT, "project-console", "assets", "project-console.js");
const FIX = join(REPO_ROOT, "tests", "fixtures", "declarado");
const CANTU = resolve(REPO_ROOT, "..", "cantu-studio");

const ROOTS = new Map([
  ["todo-presente", join(FIX, "todo-presente")],
  ["falta-uno", join(FIX, "falta-uno")],
  ["sin-declaracion", join(FIX, "sin-declaracion")],
  ["con-revision", join(FIX, "con-revision")],
  ["aiw-console", REPO_ROOT],
  ["cantu-studio", CANTU]
]);

const REAL_EMITTED =
  existsSync(join(REPO_ROOT, ".project", "snapshot.json")) &&
  existsSync(join(CANTU, ".project", "snapshot.json"));

async function select(key) {
  const harness = createConsoleHarness({ rendererPath: RENDERER, rootsByKey: ROOTS });
  harness.sandbox.resetProjectScopedState();
  harness.sandbox.setActiveProjectBase(`/projects/${key}/`);
  const result = await harness.sandbox.loadActiveProject();
  await harness.flush();
  return { harness, result };
}

const banner = (harness) => harness.element("load-notice");
const diagnostics = (harness) => harness.element("state-sources").innerHTML;
// Docs visibility is a module-local `let`, so it is observed the way the operator sees it:
// through how many entries the navigation lists. Counted on the row's own class attribute —
// each row also carries a `docs-nav-item-label` span, so a bare substring count doubles.
const navItemCount = (harness) =>
  (harness.element("docs-nav-list").innerHTML.match(/class="docs-nav-item /g) || []).length;

// ---------------------------------------------------------------------------
// A — the banner is about what the project declared
// ---------------------------------------------------------------------------

test("everything declared loads: the banner stays OFF, even though the nine never-declared routes 404", async () => {
  const { harness, result } = await select("todo-presente");
  assert.equal(result.ok, true);
  assert.equal(banner(harness).hidden, true, "the banner fired with nothing declared missing");
  assert.equal(banner(harness).innerHTML, "");

  // Not vacuous: the fetches that used to light it up DID fail on this load. The nine legacy
  // routes of §18.a are still requested and still 404 — they are simply not absences.
  const panel = diagnostics(harness);
  assert.match(panel, /Not emitted by this project/);
  for (const route of ["project.json", "state/project_status.json", "ledgers/change_ledger.jsonl", "guardrails/project_memory.jsonl"]) {
    assert.ok(panel.includes(route), `Console Diagnostics does not account for ${route}`);
  }
});

test("a DECLARED file that does not load turns the banner ON and NAMES it (§20)", async () => {
  const { harness, result } = await select("falta-uno");
  assert.equal(result.ok, true);
  const notice = banner(harness);
  assert.equal(notice.hidden, false, "a declared artifact was missing and nothing was announced");
  assert.match(notice.innerHTML, /declares emitting/);
  // §20's requirement, literally: the announcement names the file.
  assert.match(notice.innerHTML, /projects\/falta-uno\/\.project\/docs_index\.json/);
  // And it names ONLY that one — the nine undeclared routes failed on this load too.
  assert.doesNotMatch(notice.innerHTML, /project_memory\.jsonl/);
  assert.doesNotMatch(notice.innerHTML, /change_ledger\.jsonl/);
});

test("Console Diagnostics separates declared-and-loaded, declared-and-failed, and not-declared", async () => {
  const { harness } = await select("falta-uno");
  const panel = diagnostics(harness);

  // Three groups, and the two failure groups are labelled differently on purpose.
  assert.match(panel, /Declared sources that failed to load/);
  assert.match(panel, /Not emitted by this project/);

  const rows = [...panel.matchAll(/<div class="source-status-label">([^<]+)<\/div>\s*<div class="source-path">([^<]*)</g)]
    .map(([, label, path]) => ({ label: label.trim(), path: path.trim() }));
  const state = (needle) => rows.filter((row) => row.path.includes(needle)).map((row) => row.label);

  assert.deepEqual(state(".project/snapshot.json"), ["Loaded"]);
  assert.deepEqual(state(".project/roadmap.json"), ["Loaded"]);
  // Declared, absent -> a real absence.
  assert.deepEqual(state(".project/docs_index.json"), ["Failed"]);
  // Never declared, absent -> not an absence. All nine of §18.a land here, none as "Failed".
  const undeclared = [
    "project.json", "state/project_status.json", "state/component_status.json",
    "state/events.jsonl", "ledgers/change_ledger.jsonl", "ledgers/git_provenance.jsonl",
    "ledgers/human_qa.jsonl", "ledgers/ai_reviews.jsonl", "guardrails/project_memory.jsonl"
  ];
  for (const route of undeclared) {
    assert.deepEqual(state(route), ["Not emitted"], `${route} is not reported as "Not emitted"`);
  }
  assert.equal(rows.filter((row) => row.label === "Failed").length, 1, "exactly one real absence was expected");
});

test("a snapshot with NO declaration cannot narrow, so it does not: any failure lights the banner", async () => {
  const { harness, result } = await select("sin-declaracion");
  assert.equal(result.ok, true);
  const snapshot = JSON.parse(readFileSync(join(FIX, "sin-declaracion", ".project", "snapshot.json"), "utf8"));
  assert.ok(!("emitted_artifacts" in snapshot), "this fixture is only meaningful without the declaration");
  assert.equal(banner(harness).hidden, false, "with nothing to narrow by, the console must fail loud");
  // The fallback is loud, not silent: it names what it could not load.
  assert.match(banner(harness).innerHTML, /\.project\//);
});

test("the two REAL projects open with NO banner: everything each one declares is on disk", { skip: !REAL_EMITTED }, async () => {
  for (const key of ["aiw-console", "cantu-studio"]) {
    const { harness, result } = await select(key);
    assert.equal(result.ok, true, `${key} did not render`);
    assert.equal(banner(harness).hidden, true, `${key} opened with the optional-source banner on`);

    // Every artifact the project declares is accounted for as Loaded, and none as Failed.
    const declared = result.snapshot.emitted_artifacts;
    assert.ok(Array.isArray(declared) && declared.length > 0, `${key} transports no declaration`);
    const panel = diagnostics(harness);
    for (const entry of declared) {
      const file = entry.path.split("/").pop();
      assert.ok(panel.includes(file), `${key}: ${entry.path} is missing from Console Diagnostics`);
    }
    assert.doesNotMatch(panel, /Declared sources that failed to load/, `${key} reports a declared failure`);
    assert.match(panel, /Not emitted by this project/, `${key} does not account for the never-declared routes`);
  }
});

test("the declaration does not cross projects: it is re-read per load", { skip: !REAL_EMITTED }, async () => {
  const harness = createConsoleHarness({ rendererPath: RENDERER, rootsByKey: ROOTS });
  const load = async (key) => {
    harness.sandbox.resetProjectScopedState();
    harness.sandbox.setActiveProjectBase(`/projects/${key}/`);
    const result = await harness.sandbox.loadActiveProject();
    await harness.flush();
    return result;
  };
  // falta-uno declares a file it does not have; aiw-console declares six and has six.
  await load("falta-uno");
  assert.equal(banner(harness).hidden, false);
  await load("aiw-console");
  assert.equal(banner(harness).hidden, true, "the previous project's failure survived the switch");
  await load("falta-uno");
  assert.equal(banner(harness).hidden, false, "the banner did not come back for the project that needs it");
});

// ---------------------------------------------------------------------------
// B — the Docs opening mode is decided by the presence of the field
// ---------------------------------------------------------------------------

test("an index WITH operator_review_status opens Docs on the reviewed subset", async () => {
  const docs = JSON.parse(readFileSync(join(FIX, "con-revision", ".project", "docs_index.json"), "utf8")).docs;
  const reviewed = docs.filter((doc) => "operator_review_status" in doc).length;
  assert.equal(docs.length, 4);
  assert.equal(reviewed, 2, "the fixture must distinguish the subset from the whole");

  const { harness } = await select("con-revision");
  assert.equal(navItemCount(harness), reviewed, "Docs did not open on the reviewed subset");
});

test("an index WITHOUT the field opens Docs on the full registry (never an empty tab)", async () => {
  const docs = JSON.parse(readFileSync(join(FIX, "todo-presente", ".project", "docs_index.json"), "utf8")).docs;
  assert.ok(docs.every((doc) => !("operator_review_status" in doc)));
  const primary = docs.filter((doc) => doc.default_visible).length;
  assert.ok(primary < docs.length, "the fixture must distinguish `all` from `primary`");

  const { harness } = await select("todo-presente");
  assert.equal(navItemCount(harness), docs.length, "Docs did not open on the full registry");
});

test("the opening mode is the FIELD's presence, not the project — the same code decides both ways", async () => {
  // The two fixtures differ in exactly one thing: whether their index entries carry the field.
  // Same renderer, same call path, opposite outcomes.
  const withField = await select("con-revision");
  const without = await select("todo-presente");
  assert.notEqual(navItemCount(withField.harness), navItemCount(without.harness));
  // And neither console wrote the field into anything: the fixture on disk is unchanged.
  const before = readFileSync(join(FIX, "todo-presente", ".project", "docs_index.json"), "utf8");
  assert.ok(!before.includes("operator_review_status"), "the console invented operator_review_status");
});

test("the REAL projects open Docs on what their own index supports (38 of 140 / 33 of 33)", { skip: !REAL_EMITTED }, async () => {
  const indexOf = (root) => JSON.parse(readFileSync(join(root, ".project", "docs_index.json"), "utf8")).docs;
  const carries = (doc) =>
    Object.prototype.hasOwnProperty.call(doc, "operator_review_status") &&
    String(doc.operator_review_status || "").trim() !== "";

  const cantuDocs = indexOf(CANTU);
  const cantuReviewed = cantuDocs.filter(carries).length;
  assert.ok(cantuReviewed > 0 && cantuReviewed < cantuDocs.length);
  const cantu = await select("cantu-studio");
  assert.equal(navItemCount(cantu.harness), cantuReviewed, "cantu-studio did not open on its curated selection");

  const consoleDocs = indexOf(REPO_ROOT);
  assert.equal(consoleDocs.filter(carries).length, 0, "aiw-console's index gained operator_review_status");
  const console_ = await select("aiw-console");
  assert.equal(navItemCount(console_.harness), consoleDocs.length, "aiw-console did not open on its full index");
});

test("NOTHING writes operator_review_status: the emitted indexes are unchanged by rendering", { skip: !REAL_EMITTED }, async () => {
  const path = join(REPO_ROOT, ".project", "docs_index.json");
  const before = readFileSync(path, "utf8");
  await select("aiw-console");
  assert.equal(readFileSync(path, "utf8"), before, "rendering modified the emitted docs index");
  assert.ok(!before.includes("operator_review_status"),
    "aiw-console's emitted index carries operator_review_status; no run recorded one");
});
