// [#70] `report_html` — WHERE A RUN'S OWN HTML REPORT LIVES, DECLARED IN THE RUN.
//
// RUN-CONSOLE-THREAD-HTML-REPORTS-CONTRACT-001, decision 1 of its Phase 1 proposal
// (context/aiw-console/records/PROPUESTA-FASE-1-70-REPORTES-HTML-DE-CADA-HILO-2026-10-19.md),
// approved by the operator on 2026-10-20. Each thread writes its report in HTML, in whatever
// format its project needs (D-076); the ONE thing in common is where it lives. The thread that
// produced the page says so in the run it belongs to, and the console links what the run says.
//
// THREE LAYERS, each measured where it lives:
//
//   1. the schema     — an OPTIONAL run key, ABSENT by default, so every existing roadmap stays
//                       valid and byte-identical; it serializes LAST
//   2. the invariants — a PRESENT key is a non-empty list of repo-relative paths to `.html`
//                       files, refused by name otherwise. EXISTENCE IS NOT CHECKED: the pages a
//                       project generates are often ignored by Git and absent from a clone, and
//                       the console states that absence itself (one HEAD per path)
//   3. the transport  — the emitter carries it into `.project/` untouched, without naming it
//
// AND WHAT THIS RUN DOES NOT BUILD: no edit op writes the key. The thread writes it into its own
// canonical; the console only reads it. The last test pins that boundary.
import test from "node:test";
import assert from "node:assert/strict";
import { cpSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import * as core from "../tools/roadmap/roadmap-core.mjs";
import { KNOWN_OPS } from "../tools/roadmap/roadmap-plan.mjs";
import { buildRoadmapTreeSnapshot, buildProjectRoadmap } from "../tools/projector/project.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const LANES_ROOT = join(HERE, "fixtures", "lanes", "project");

const FIELD = "report_html";

function tree(...overrides) {
  const run = (n, extra) => ({
    run_id: `RUN-T-${String(n).padStart(3, "0")}`,
    queue_order: n,
    title: `Run ${n}`,
    summary: `Summary ${n}`,
    full_description: `Description ${n}`,
    status: "planned",
    depends_on: [],
    ...(extra || {})
  });
  return {
    schema_version: "roadmap_tree_v1",
    roadmap_id: "t",
    title: "T",
    objectives: [{
      objective_id: "O1",
      title: "O",
      phases: [{ phase_id: "O1.P1", title: "P", runs: [run(1, overrides[0]), run(2, overrides[1])] }]
    }]
  };
}

const fieldErrors = (obj) => core.checkInvariants(obj).filter((e) => e.includes(FIELD));

// ======================================================== 1. THE SCHEMA

test("R.1: the key is OPTIONAL and ALLOWED — in RUN_OPTIONAL_FIELDS, never in RUN_REQUIRED_FIELDS", () => {
  assert.ok(core.RUN_OPTIONAL_FIELDS.includes(FIELD), "it must be optional");
  assert.ok(!core.RUN_REQUIRED_FIELDS.includes(FIELD), "it must never be required");
  assert.ok(core.RUN_ALLOWED_FIELDS.includes(FIELD), "an allowed key, or every run carrying it reads as 'unexpected field'");
});

test("R.2: it serializes LAST — after the outcome keys, because it names what the run left behind", () => {
  const order = core.CANONICAL_RUN_KEY_ORDER;
  assert.equal(order[order.length - 1], FIELD);
  assert.equal(order[order.length - 2], "progress");
  const run = { [FIELD]: ["a/b.html"], status: "planned", depends_on: [], run_id: "RUN-T-001", queue_order: 1, title: "t", summary: "s", full_description: "f" };
  core.normalizeRunKeyOrder(run);
  const keys = Object.keys(run);
  assert.equal(keys[keys.length - 1], FIELD);
});

test("R.3: ABSENT by default — a tree without the key validates clean and serializes byte-identically", () => {
  const obj = tree();
  assert.deepEqual(core.checkInvariants(obj), []);
  const before = core.serialize(obj, "\n");
  const again = core.serialize(core.parseRoadmap(before), "\n");
  assert.equal(again, before);
  assert.ok(!before.includes(FIELD), "nothing writes the key into a run that did not carry it");
});

// ======================================================== 2. THE INVARIANTS

test("R.4: a list of repo-relative .html paths validates — spaces, accents, parentheses and an upper-case extension included", () => {
  const obj = tree({
    [FIELD]: [
      "lessons/L01-example/web.html",
      "lessons/L01-example/slide.html",
      "Exam Simulator (Free Edition)/review página.HTML",
      "index.html"
    ]
  });
  assert.deepEqual(fieldErrors(obj), []);
  assert.deepEqual(core.checkInvariants(obj), []);
});

test("R.5: EXISTENCE IS NOT CHECKED — a path to a page that is not on disk is still a valid declaration", () => {
  // A generated page ignored by Git is absent from every fresh clone; the console says so per path.
  const obj = tree({ [FIELD]: ["generated/never-built-here.html"] });
  assert.deepEqual(core.checkInvariants(obj), []);
});

test("R.6: a present key that is not a non-empty list is refused by name — a run with no HTML report omits the key", () => {
  for (const bad of ["lessons/a.html", [], null, {}, 3]) {
    const errors = fieldErrors(tree({ [FIELD]: bad }));
    assert.equal(errors.length, 1, `${JSON.stringify(bad)} must be refused exactly once`);
    assert.match(errors[0], /RUN-T-001/, "the refusal names the run");
    assert.match(errors[0], /non-empty array/, "the refusal says what the key must be");
  }
});

test("R.7: every entry is held to the path shape, and each refusal names the entry", () => {
  const cases = [
    ["", /non-empty string/],
    [42, /non-empty string/],
    ["/abs/page.html", /relative/],
    ["C:/abs/page.html", /relative/],
    ["https://example.org/page.html", /relative/],
    ["a\\b\\page.html", /relative/],
    ["../outside.html", /segments/],
    ["a/../b/page.html", /segments/],
    ["./page.html", /segments/],
    ["a//page.html", /segments/],
    [".git/page.html", /\.git\/ or \.project\//],
    [".project/page.html", /\.git\/ or \.project\//],
    ["a/report.json", /end in \.html/],
    ["a/page.html.txt", /end in \.html/],
    ["a/page.htm", /end in \.html/]
  ];
  for (const [entry, reason] of cases) {
    const errors = fieldErrors(tree({ [FIELD]: [entry] }));
    assert.equal(errors.length, 1, `${JSON.stringify(entry)} must be refused exactly once`);
    assert.match(errors[0], reason, `${JSON.stringify(entry)}: wrong reason — ${errors[0]}`);
    if (typeof entry === "string" && entry) assert.ok(errors[0].includes(JSON.stringify(entry)), "the refusal quotes the entry");
  }
});

test("R.8: the same path twice is refused — one declaration per page", () => {
  const errors = fieldErrors(tree({ [FIELD]: ["a/page.html", "b/page.html", "a/page.html"] }));
  assert.equal(errors.length, 1);
  assert.match(errors[0], /twice/);
});

// ======================================================== 3. THE TRANSPORT

test("R.9: the EMITTER carries the key into .project/ verbatim — snapshot and roadmap.json alike, without naming it", () => {
  const dir = mkdtempSync(join(tmpdir(), "report-html-emit-"));
  try {
    cpSync(LANES_ROOT, dir, { recursive: true });
    const file = join(dir, "roadmap", "roadmap.json");
    const obj = core.parseRoadmap(core.loadRaw(file));
    const target = core.globalOrdered(obj)[0];
    const declared = ["pages/first.html", "pages/second.html"];
    target[FIELD] = declared;
    assert.deepEqual(core.checkInvariants(obj).filter((e) => e.includes(FIELD)), []);
    writeFileSync(file, core.serialize(obj, core.detectEol(core.loadRaw(file))));

    const findRun = (block) => block.objectives
      .flatMap((o) => o.phases).flatMap((p) => p.runs).find((r) => r.run_id === target.run_id);
    assert.deepEqual(findRun(buildRoadmapTreeSnapshot(dir, {}).roadmap_tree)[FIELD], declared);
    assert.deepEqual(findRun(buildProjectRoadmap(dir, {}))[FIELD], declared);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

// ======================================================== THE BOUNDARY

test("R.10: no edit op writes the key — the thread declares its pages in its own canonical; the console only reads them", () => {
  const ops = [...KNOWN_OPS].map((op) => String(op).toLowerCase());
  assert.ok(ops.length > 0, "the op list is real");
  for (const op of ops) {
    assert.ok(!op.includes("report") && !op.includes("html"), `op ${op} would let the console write where a thread's report lives`);
  }
});
