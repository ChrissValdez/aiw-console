// DOCS GROUPING BY REPOSITORY PATH — one rule, every project, every visibility mode.
//
// What changed and why these tests exist. Docs used to be grouped two different ways: by each
// entry's own grouping fields (`ia_bucket` / `category` / `related_area` / `source_role`), and — in
// the "newera" mode — by an explicit path -> category MAP written as forty-odd exact routes of the
// project this console was ported from. That map could not travel, so it travelled empty, and a
// project whose reviewed documents it used to place saw all of them in one UNCATEGORIZED drawer.
//
// The replacement is the repository's own folder hierarchy: WHERE a document lives is its group,
// with SUBGROUPS to whatever depth the repo has, and a folder named `archive` is not rendered at
// all. Three properties are load-bearing and each is tested here on a SYNTHETIC fixture first, so
// none of them depends on the real projects that motivated the change:
//
//   1. hierarchy — a folder with subfolders produces a group and subgroups
//   2. archive   — a document under an `archive/` folder is not rendered, in any mode
//   3. the path WINS over any grouping field an index may carry
//
// Then the same three are checked against the two real projects, where the numbers are known.
//
// Same harness and same limits as the other consumer suites: the REAL renderer inside node:vm over
// a DOM stub (tests/helpers/console-dom.mjs). Layout and real clicks stay with the operator QA pass.
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createConsoleHarness } from "./helpers/console-dom.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const RENDERER = join(REPO_ROOT, "project-console", "assets", "project-console.js");
const FIX = join(REPO_ROOT, "tests", "fixtures", "rutas");
const CANTU = resolve(REPO_ROOT, "..", "cantu-studio");

const ROOTS = new Map([
  ["mixto", join(FIX, "mixto")],
  ["bajo-una-carpeta", join(FIX, "bajo-una-carpeta")],
  ["aiw-console", REPO_ROOT],
  ["cantu-studio", CANTU]
]);

const REAL_EMITTED =
  existsSync(join(REPO_ROOT, ".project", "snapshot.json")) &&
  existsSync(join(CANTU, ".project", "snapshot.json"));

async function select(key, mode) {
  const harness = createConsoleHarness({ rendererPath: RENDERER, rootsByKey: ROOTS });
  harness.sandbox.resetProjectScopedState();
  harness.sandbox.setActiveProjectBase(`/projects/${key}/`);
  await harness.sandbox.loadActiveProject();
  await harness.flush();
  if (mode) { harness.sandbox.setDocsVisibilityMode(mode); await harness.flush(); }
  return harness;
}

// Reads the tree back out of the PAINTED navigation, not out of the model, so what these tests
// assert is what an operator would see. `--docs-nav-depth` is the nesting level the renderer
// stamps on each group; a group's own documents follow it until the next group opens.
function paintedTree(harness) {
  const html = harness.element("docs-nav-list").innerHTML;
  const groups = [];
  const stack = [];
  const token = /--docs-nav-depth:(\d+)"[\s\S]*?docs-nav-group-label">([^<]*)<[\s\S]*?docs-nav-group-count">\((\d+)\)|docs-nav-item-label">([^<]*)</g;
  let current = null;
  for (const match of html.matchAll(token)) {
    if (match[2] !== undefined) {
      stack.length = Number(match[1]);
      stack.push(match[2]);
      current = { path: stack.join(" / "), label: match[2], depth: Number(match[1]), count: Number(match[3]), titles: [] };
      groups.push(current);
    } else if (current) {
      current.titles.push(match[4]);
    }
  }
  return groups;
}

// Titles come back out of the HTML escaped, as the renderer wrote them; a title carrying quotes
// (several records here do) only matches once the expectation is escaped the same way.
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

const groupPaths = (harness) => paintedTree(harness).map((group) => `${group.path} (${group.count})`);
const paintedTitles = (harness) => paintedTree(harness).flatMap((group) => group.titles);
const navItemCount = (harness) => (harness.element("docs-nav-list").innerHTML.match(/class="docs-nav-item /g) || []).length;

// ---------------------------------------------------------------------------
// 1 — hierarchy, on a synthetic fixture
// ---------------------------------------------------------------------------

test("a folder with subfolders paints a group WITH subgroups, to the depth the repo has", async () => {
  const harness = await select("mixto");
  assert.deepEqual(groupPaths(harness), [
    "Manual (3)",
    "Manual / Instalacion (2)",
    "Manual / Uso (1)",
    "Notas (2)",
    "Root (1)"
  ]);
  // A parent's count is everything reachable under it: Manual holds no document of its own.
  const manual = paintedTree(harness).find((group) => group.path === "Manual");
  assert.deepEqual(manual.titles, [], "Manual has no documents of its own; its 3 are in its subgroups");
});

test("documents with no folder at all land in Root, rendered last", async () => {
  const harness = await select("mixto");
  const tree = paintedTree(harness);
  const root = tree.at(-1);
  assert.equal(root.path, "Root");
  assert.deepEqual(root.titles, ["Leeme"]);
});

test("the shared leading folder is not a group: it cannot separate documents that all share it", async () => {
  // Every document of this fixture lives under `documentacion/`, so the groups are the folders
  // INSIDE it. No folder name is written down in the console — the shared prefix is measured.
  const harness = await select("bajo-una-carpeta");
  assert.deepEqual(groupPaths(harness), ["Guia (2)", "Referencia (1)"]);
  assert.ok(
    !groupPaths(harness).some((path) => path.startsWith("Documentacion")),
    "the folder every document shares was painted as a group"
  );
});

// ---------------------------------------------------------------------------
// 2 — the archive rule, on a synthetic fixture
// ---------------------------------------------------------------------------

test("a document under an archive/ folder is not rendered, and neither is the folder", async () => {
  const harness = await select("mixto");
  const html = harness.element("docs-nav-list").innerHTML;
  assert.equal(navItemCount(harness), 6, "the two archived documents were rendered");
  assert.ok(!paintedTitles(harness).includes("Retirado"), "manual/archive/retirado.md was rendered");
  assert.ok(!paintedTitles(harness).includes("Muy viejo"), "notas/archive/2024/muy-viejo.md was rendered");
  assert.ok(!/Archive/i.test(html.replace(/ARCHIVE-POLITICA/g, "")), "an archive group was painted");
});

test("archived documents are unreachable in EVERY visibility mode, not just the opening one", async () => {
  for (const mode of ["all", "primary", "newera"]) {
    const harness = await select("mixto", mode);
    const titles = paintedTitles(harness);
    assert.ok(!titles.includes("Retirado"), `mode ${mode} rendered an archived document`);
    assert.ok(!titles.includes("Muy viejo"), `mode ${mode} rendered an archived document`);
  }
});

test("only FOLDER segments count: a document named for archiving is not an archived document", async () => {
  const harness = await select("mixto");
  assert.ok(
    paintedTitles(harness).includes("Politica de archivado"),
    "notas/ARCHIVE-POLITICA.md was excluded by its filename"
  );
});

test("the archive rule is applied in the CONSUMER: the emitted index still carries the entries", async () => {
  // The rule hides documents from the view; it does not edit anybody's index. The fixture's own
  // docs_index still lists all eight, and the console still renders six of them.
  const index = JSON.parse(readFileSync(join(FIX, "mixto", ".project", "docs_index.json"), "utf8"));
  assert.equal(index.docs.length, 8);
  assert.equal(index.docs.filter((doc) => doc.path.includes("/archive/")).length, 2);
  const harness = await select("mixto");
  assert.equal(navItemCount(harness), 6);
});

// ---------------------------------------------------------------------------
// 3 — the path wins over the index's own grouping fields
// ---------------------------------------------------------------------------

test("the path OVERRIDES ia_bucket, category, related_area and source_role", async () => {
  // Every entry of the fixture carries a grouping field naming a group that does not exist in its
  // path. Under the previous rule those four fields WERE the groups, so if any of them still had
  // an effect it would be visible here as an extra group.
  const index = JSON.parse(readFileSync(join(FIX, "mixto", ".project", "docs_index.json"), "utf8"));
  const declared = index.docs.flatMap((doc) =>
    [doc.ia_bucket, doc.category, doc.related_area, doc.source_role].filter(Boolean)
  );
  assert.ok(declared.length >= 6, "the fixture no longer carries the grouping fields under test");

  const harness = await select("mixto");
  const painted = groupPaths(harness).join(" | ");
  for (const value of new Set(declared)) {
    assert.ok(!painted.toLowerCase().includes(value.toLowerCase()), `group "${value}" came from an index field`);
  }
  assert.ok(!painted.toLowerCase().includes("uncategorized"), "an Uncategorized group survived");
});

// ---------------------------------------------------------------------------
// 4 — the same rule on the two real projects
// ---------------------------------------------------------------------------

test("cantu-studio: its 38 reviewed documents paint the nine categories its own console shows", { skip: !REAL_EMITTED }, async () => {
  const harness = await select("cantu-studio");
  assert.equal(navItemCount(harness), 38);
  assert.deepEqual(groupPaths(harness), [
    "Architecture (5)",
    "Components (17)",
    "Components / Web (17)",
    "Decisions (6)",
    "Docs Management (1)",
    "Governance (1)",
    "How-To (2)",
    "Operations (2)",
    "Reference (3)",
    "Start Here (1)"
  ]);
  assert.ok(!groupPaths(harness).join(" ").toLowerCase().includes("uncategorized"));
});

test("cantu-studio: every document the console paints is one the project's index carries a review for", { skip: !REAL_EMITTED }, async () => {
  // The categories above must be the categories of the REVIEWED set, not of some other selection.
  const docs = JSON.parse(readFileSync(join(CANTU, ".project", "docs_index.json"), "utf8")).docs;
  const reviewed = docs.filter((doc) =>
    Object.prototype.hasOwnProperty.call(doc, "operator_review_status") &&
    String(doc.operator_review_status || "").trim() !== ""
  );
  assert.equal(reviewed.length, 38);
  const harness = await select("cantu-studio");
  const titles = new Set(paintedTitles(harness));
  for (const doc of reviewed) {
    assert.ok(titles.has(escapeHtml(doc.title)), `reviewed document "${doc.title}" was not painted`);
  }
});

test("cantu-studio: its archived documents are absent from All registered too", { skip: !REAL_EMITTED }, async () => {
  const docs = JSON.parse(readFileSync(join(CANTU, ".project", "docs_index.json"), "utf8")).docs;
  const archived = docs.filter((doc) => doc.path.split("/").slice(0, -1).includes("archive"));
  assert.ok(archived.length > 0, "the project has nothing archived; this test would prove nothing");
  const harness = await select("cantu-studio", "all");
  assert.equal(navItemCount(harness), docs.length - archived.length);
  const html = harness.element("docs-nav-list").innerHTML;
  for (const doc of archived.slice(0, 25)) {
    assert.ok(!html.includes(`>${escapeHtml(doc.title)}<`), `archived document "${doc.title}" is reachable under All registered`);
  }
});

test("aiw-console: every registered document stays grouped by its folders, none uncategorized", { skip: !REAL_EMITTED }, async () => {
  // Counts are read off the emitted index rather than written here: this project's corpus grows by
  // one document every time a run leaves a record, and a hardcoded total would only measure how
  // recently the number was updated. What IS pinned is the SHAPE — which folders are groups and
  // which of them nest inside which — because that is what the path rule decides.
  const docs = JSON.parse(readFileSync(join(REPO_ROOT, ".project", "docs_index.json"), "utf8")).docs;
  const harness = await select("aiw-console");
  assert.equal(navItemCount(harness), docs.length);
  assert.deepEqual(paintedTree(harness).map((group) => group.path), [
    "Console",
    "Context",
    "Context / AIW",
    "Context / AIW-Console",
    "Context / AIW-Console / Records",
    "Context / Cantu-Studio",
    "Context / Handoffs",
    "Docs",
    "Project-Console",
    "Root"
  ]);
  // Three levels deep, and a parent's count is everything under it — not just its own documents.
  const tree = paintedTree(harness);
  const context = tree.find((group) => group.path === "Context");
  const records = tree.find((group) => group.path === "Context / AIW-Console / Records");
  assert.equal(records.depth, 2, "the records folder did not nest two levels under Context");
  assert.equal(records.count, records.titles.length);
  assert.ok(context.count > context.titles.length, "the parent count does not include its subgroups");
});

test("aiw-console: the group of every document is the folder its own path names", { skip: !REAL_EMITTED }, async () => {
  // Not a restatement of the tree above: it re-derives the expected group from each entry's path
  // straight out of the emitted index and checks the painted tree against it, document by
  // document. This is what "the path always wins" has to mean, entry by entry.
  const docs = JSON.parse(readFileSync(join(REPO_ROOT, ".project", "docs_index.json"), "utf8")).docs;
  const harness = await select("aiw-console");
  const tree = paintedTree(harness);
  const groupOfTitle = new Map(tree.flatMap((group) => group.titles.map((title) => [title, group.path])));
  for (const doc of docs) {
    const folders = doc.path.split("/").slice(0, -1);
    const expected = folders.length ? folders.map((segment) => segment.toLowerCase()).join(" / ") : "root";
    const painted = groupOfTitle.get(escapeHtml(doc.title));
    assert.ok(painted, `"${doc.title}" (${doc.path}) was not painted in any group`);
    assert.equal(painted.toLowerCase(), expected, `"${doc.path}" was painted under ${painted}`);
  }
});

// ---------------------------------------------------------------------------
// 5 — no baked identity survives
// ---------------------------------------------------------------------------

test("the renderer holds no category map, no project folder names and no project names", () => {
  const source = readFileSync(RENDERER, "utf8");
  // The tables the port emptied are now GONE, not empty: an empty table is still a place a name
  // can be written back into.
  for (const symbol of [
    "DOCS_NEW_ERA_CATEGORY_BY_PATH", "DOCS_NEW_ERA_BLUEPRINT_ORDER", "DOCS_NEW_ERA_UNCATEGORIZED",
    "DOCS_NEW_ERA_COMPONENT_SUBGROUP_ORDER", "DOCS_GROUP_ORDER", "DOCS_GROUP_LABELS",
    "DOCS_GROUP_ALIASES", "buildDocsNewEraTree", "buildComponentSubgroups", "deriveDocGroup"
  ]) {
    assert.ok(!new RegExp(`\\b${symbol}\\b`).test(source), `${symbol} still exists in the renderer`);
  }
  // No executable string names a documentation folder of either real project. Comments are
  // excluded: they explain the rule and naming an example there costs nothing.
  const code = source.split("\n").filter((line) => !/^\s*(\/\/|\*|\/\*)/.test(line)).join("\n");
  for (const folder of [
    "docs/components", "docs/decisions", "docs/architecture", "docs/start_here", "docs/how-to",
    "context/aiw-console", "cantu", "jame", "aiw_console", "cantu_studio"
  ]) {
    assert.ok(!code.toLowerCase().includes(folder.toLowerCase()), `the renderer names "${folder}"`);
  }
  // `archive` is the ONE folder name the rule needs, and it is generic: it names no project.
  assert.match(code, /DOCS_ARCHIVE_SEGMENT = "archive"/);
});
