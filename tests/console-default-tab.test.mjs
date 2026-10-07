// #66 RUN-CONSOLE-ROADMAP-DEFAULT-TAB-001 — projects open on the Roadmap tab (D-075).
//
// Two places decide the opening tab, and both have to agree with what is SEEN, not only with the
// highlighted button:
//   1. index.html — the markup the browser paints before any script runs: the `active` tab button
//      AND the `active` .tab-content section.
//   2. resetChromeToDefaults() in project-console.js — what the shell runs on every project open
//      (first selection included) through resetProjectScopedState().
// The general harness answers [] to every querySelectorAll, so no earlier test could see a tab at
// all. These tests hand the REAL renderer the REAL tab buttons and sections of index.html.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createConsoleHarness } from "./helpers/console-dom.mjs";
import { AIW_CONSOLE_FIXTURE } from "./helpers/neighbours.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const RENDERER = join(REPO_ROOT, "project-console", "assets", "project-console.js");
const INDEX_HTML = readFileSync(join(REPO_ROOT, "project-console", "index.html"), "utf8");

const ROOTS = new Map([
  ["aiw-console", AIW_CONSOLE_FIXTURE],
  ["hilo-verde", join(REPO_ROOT, "tests", "fixtures", "multi", "hilo-verde")]
]);

function classesOf(tag) {
  const match = tag.match(/\bclass="([^"]*)"/);
  return match ? match[1].split(/\s+/).filter(Boolean) : [];
}

// The tab buttons and the tab sections exactly as index.html declares them.
function markupTabs() {
  return Array.from(INDEX_HTML.matchAll(/<button\b[^>]*\bdata-tab="([^"]+)"[^>]*>/g))
    .map(([tag, tab]) => ({ tab, classes: classesOf(tag) }));
}

function markupPanels() {
  return Array.from(INDEX_HTML.matchAll(/<section\b[^>]*\bid="(tab-[^"]+)"[^>]*>/g))
    .map(([tag, id]) => ({ id, classes: classesOf(tag) }))
    .filter((panel) => panel.classes.includes("tab-content"));
}

// Minimal clickable stand-ins for the tab buttons/sections, seeded from the markup.
function stubNode(fields, classes) {
  const set = new Set(classes);
  const listeners = [];
  return {
    ...fields,
    classList: {
      toggle(name, force) {
        const on = force === undefined ? !set.has(name) : !!force;
        if (on) set.add(name); else set.delete(name);
        return on;
      },
      contains: (name) => set.has(name),
      add: (name) => set.add(name),
      remove: (name) => set.delete(name)
    },
    addEventListener(type, fn) { if (type === "click") listeners.push(fn); },
    click() { listeners.forEach((fn) => fn({ target: this })); }
  };
}

function makeHarness() {
  const harness = createConsoleHarness({ rendererPath: RENDERER, rootsByKey: ROOTS });
  const buttons = markupTabs().map(({ tab, classes }) => stubNode({ dataset: { tab } }, classes));
  const panels = markupPanels().map(({ id, classes }) => stubNode({ id }, classes));
  harness.sandbox.document.querySelectorAll = (selector) => {
    if (selector === "[data-tab]") return buttons;
    if (selector === ".tab-content") return panels;
    return [];
  };
  // Wire the real click handlers onto the stand-ins (the boot-time setupTabs saw no buttons).
  harness.sandbox.setupTabs();
  const activeTabs = () => buttons.filter((b) => b.classList.contains("active")).map((b) => b.dataset.tab);
  const activePanels = () => panels.filter((p) => p.classList.contains("active")).map((p) => p.id);
  const click = (tab) => buttons.find((b) => b.dataset.tab === tab).click();
  return { harness, activeTabs, activePanels, click };
}

async function select(harness, key) {
  harness.sandbox.resetProjectScopedState();
  harness.sandbox.setActiveProjectBase(`/projects/${key}/`);
  const result = await harness.sandbox.loadActiveProject();
  await harness.flush();
  return result;
}

test("first paint: index.html marks Roadmap active on the button AND on the section it shows", () => {
  const activeTabs = markupTabs().filter((t) => t.classes.includes("active")).map((t) => t.tab);
  const activePanels = markupPanels().filter((p) => p.classes.includes("active")).map((p) => p.id);
  assert.deepEqual(activeTabs, ["roadmap"], "the highlighted tab button in the markup");
  assert.deepEqual(activePanels, ["tab-roadmap"], "the visible tab section in the markup");
});

test("first paint: Overview is still declared, as a tab button and as its section", () => {
  assert.ok(markupTabs().some((t) => t.tab === "overview"), "the Overview tab button is gone");
  assert.ok(markupPanels().some((p) => p.id === "tab-overview"), "the Overview section is gone");
  // The renderer boots its chrome on finding #tab-overview; that guard must keep finding it.
  assert.match(INDEX_HTML, /<section id="tab-overview" class="tab-content\b/);
});

test("first project open from the shell lands on Roadmap (button and section)", async () => {
  const { harness, activeTabs, activePanels } = makeHarness();
  const result = await select(harness, "aiw-console");
  assert.equal(result.ok, true);
  assert.deepEqual(activeTabs(), ["roadmap"]);
  assert.deepEqual(activePanels(), ["tab-roadmap"]);
});

for (const from of ["overview", "history", "docs", "status"]) {
  test(`switching project from the ${from} tab lands back on Roadmap (button and section)`, async () => {
    const { harness, activeTabs, activePanels, click } = makeHarness();
    await select(harness, "aiw-console");
    click(from);
    assert.deepEqual(activeTabs(), [from]);
    await select(harness, "hilo-verde");
    assert.deepEqual(activeTabs(), ["roadmap"]);
    assert.deepEqual(activePanels(), ["tab-roadmap"]);
  });
}

test("Overview still opens exactly as before: one click shows its button and its section", async () => {
  const { harness, activeTabs, activePanels, click } = makeHarness();
  await select(harness, "aiw-console");
  click("overview");
  assert.deepEqual(activeTabs(), ["overview"]);
  assert.deepEqual(activePanels(), ["tab-overview"]);
  // And it is painted: the Overview surface is rendered on load regardless of which tab is open.
  assert.match(harness.element("project-overview").innerHTML, /\S/);
});
