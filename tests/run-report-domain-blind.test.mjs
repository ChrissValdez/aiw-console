// RUN-CONSOLE-REPORT-RENDERER-001, criterion 4 — THE RULE THAT GOVERNS EVERY OTHER ONE,
// proved mechanically. Measured on the prototype, its 39 project mentions all live in its
// data module and zero in its view; here the equivalent measurement is that ZERO tokens of
// the four real reports appear anywhere in the shipped renderer (JS or CSS). The needles are
// DERIVED from the fixtures, not hand-kept: a fifth project's report added to the fixtures
// extends the ban automatically.

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const JS_PATH = join(REPO_ROOT, "project-console", "assets", "run-report-renderer.js");
const CSS_PATH = join(REPO_ROOT, "project-console", "assets", "run-report-renderer.css");
const FIXTURES = join(HERE, "fixtures", "reports");

const RENDERER_SOURCES = [
  { path: JS_PATH, source: readFileSync(JS_PATH, "utf8") },
  { path: CSS_PATH, source: readFileSync(CSS_PATH, "utf8") }
];

function fixtureReports() {
  return readdirSync(FIXTURES)
    .filter((name) => name.endsWith(".report.json"))
    .map((name) => ({ name, report: JSON.parse(readFileSync(join(FIXTURES, name), "utf8")) }));
}

// Every place a report carries a NAME — of its project, its run, its subjects, its files,
// its counted things, its emitters. These are the words a domain-aware renderer would leak.
function domainTokens(report) {
  const tokens = [];
  const push = (value) => { if (typeof value === "string" && value.trim()) tokens.push(value.trim()); };
  push(report.project); push(report.run_id); push(report.run_title); push(report.profile);
  push(report.emitted_by);
  Object.keys(report.counts || {}).forEach(push);
  (report.locations || []).forEach((loc) => { push(loc.label); push(loc.path); });
  (Array.isArray(report.items) ? report.items : []).forEach((item) => {
    if (item.subject) {
      push(item.subject.id); push(item.subject.label);
      (item.subject.previews || []).forEach((p) => { push(p.label); push(p.target); push(p.path); });
    }
    if (item.location) push(item.location.path);
    // [#60] The profile ids an item cites are the emitter's vocabulary too.
    (Array.isArray(item.satisfies) ? item.satisfies : []).forEach(push);
  });
  // [#60] The citation era extends the ban: header citations carry profile ids, blind
  // spots carry scoped ids in `affects`, and profile_data's OWN keys are the profile's
  // namespace. `where` is deliberately NOT harvested — it names envelope keys (`counts`,
  // `profile_data.…`), which are the renderer's own working vocabulary.
  (Array.isArray(report.header_satisfies) ? report.header_satisfies : []).forEach((h) => {
    (Array.isArray(h.satisfies) ? h.satisfies : []).forEach(push);
  });
  (Array.isArray(report.blind_spots) ? report.blind_spots : []).forEach((b) => {
    (Array.isArray(b.affects) ? b.affects : []).forEach(push);
  });
  Object.keys(report.profile_data || {}).forEach(push);
  return tokens;
}

test("criterion 4: not one word of any fixture's domain appears in the renderer — zero mentions, like the prototype's view", () => {
  const reports = fixtureReports();
  assert.equal(reports.length, 4, "the four real cases are the corpus");
  // Tokens shorter than 4 characters ("web", ids like "R1") would ban single letters and
  // digraphs any source legitimately contains; names are longer, and names are the leak.
  const needles = [...new Set(reports.flatMap(({ report }) => domainTokens(report)))]
    .filter((token) => token.length >= 4)
    .map((token) => token.toLowerCase());
  assert.ok(needles.length > 40, "the fixtures feed a real corpus, not a token or two");
  // The measured failure this guards against by name: a discarded prototype shipped with
  // the operator's own name embedded, and the verdict asserted a signature nobody typed.
  needles.push("christopher", "valdez", "cantu");
  for (const { path, source } of RENDERER_SOURCES) {
    const haystack = source.toLowerCase();
    for (const needle of needles) {
      assert.ok(!haystack.includes(needle),
        path + " contains the domain token " + JSON.stringify(needle) + " — the renderer must not know it");
    }
  }
});

test("criterion 4: the renderer never compares a report field named type, kind or mode — items paint by field presence", () => {
  const { source } = RENDERER_SOURCES[0];
  // A branch needs a comparison. `step.kind` is the renderer's OWN step taxonomy (item /
  // decision / run — three different arrays of the report), so it is excluded; any
  // comparison against a report object's type/kind/mode is the defect the ticket names.
  const comparisons = source.match(/\b(?!step\b)(?!s\b)\w+\.(?:type|kind|mode)\s*[=!]==?/g) || [];
  assert.deepEqual(comparisons, [], "no equality test against a report's type/kind/mode fields");
  // And the closed item-type vocabulary never appears as a quoted literal to switch on.
  for (const typeValue of ["correction", "reclassification", "creation", "declared_gap", "info"]) {
    assert.ok(!source.includes('"' + typeValue + '"') && !source.includes("'" + typeValue + "'"),
      "no quoted item-type literal " + typeValue);
  }
  // "check" and "decision" are also step/console words; ban them as ITEM-TYPE comparisons
  // by checking every quoted occurrence either BUILDS a step kind or TESTS one.
  const decisionUses = source.match(/[^\n]*"decision"[^\n]*/g) || [];
  for (const line of decisionUses) {
    assert.ok(/kind\s*(?:===|:)\s*"decision"/.test(line),
      'every "decision" literal is a step-kind use, never an item-type test: ' + line.trim());
  }
  assert.ok(!/"check"/.test(source), 'no quoted "check" literal at all');
});

test("criterion 4 corollaries: the drift field is dead, the vocabulary is the kernel's, the signer is nobody until typed", () => {
  const { source } = RENDERER_SOURCES[0];
  // The per-item verdict vocabulary a report may carry is the drift this run closes.
  assert.ok(!source.includes("verdict_options"),
    "verdict_options is not even read — ignoring it is structural, not conditional");
  assert.ok(source.includes("verdict_disposition_options"),
    "the disposition options, which ARE per-item data, keep working");
  // Two closed sets since RUN-CONSOLE-VERDICT-MODEL-001: an item takes two tokens (halting
  // is the emitter's `stop`, derived into `stopped`, never a token the operator picks), and
  // the run takes the three the kernel parses at aiw/kernel.mjs:213 — no fourth on either.
  assert.ok(/RR_ITEM_VERDICTS\s*=\s*\["APPROVED",\s*"CHANGES_REQUIRED"\]/.test(source),
    "the item's closed verdict set, verbatim");
  assert.ok(/RR_RUN_VERDICTS\s*=\s*\["APPROVED",\s*"CHANGES_REQUIRED",\s*"BLOCKED"\]/.test(source),
    "the run's closed verdict set, verbatim");
  // No approve-all, in any spelling, in either language, code or copy.
  assert.ok(!/approve[\s_-]*all|aprobar[\s_-]*todo/i.test(source), "no approve-all anywhere");
  // The signer arrives from typing alone: the reviewer state is born empty.
  assert.ok(/reviewer:\s*""/.test(source), "the reviewer field initialises empty, never to a name");
});
