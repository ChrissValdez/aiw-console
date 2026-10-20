// [#70] The operator-QA fixture for the HTML-report link, kept honest: what the QA steps promise
// the operator will see is what the fixture on disk actually holds.
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as core from "../tools/roadmap/roadmap-core.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const FIXTURE = join(HERE, "fixtures", "html-reports");
const ROOT = join(FIXTURE, "proyecto");
const runsOf = (tree) => tree.objectives.flatMap((o) => o.phases).flatMap((p) => p.runs);

test("Q.1: the registry serves exactly the fixture project, and its canonical passes the engine", () => {
  const registry = JSON.parse(readFileSync(join(FIXTURE, "projects.json"), "utf8"));
  assert.deepEqual(registry.projects, [{ key: "html-reports-qa", root: "./proyecto" }]);
  const canonical = core.parseRoadmap(core.loadRaw(join(ROOT, "roadmap", "roadmap.json")));
  assert.deepEqual(core.checkInvariants(canonical), []);
});

test("Q.2: the emitted roadmap carries every declaration of the canonical — the emission is not behind", () => {
  const canonical = runsOf(JSON.parse(readFileSync(join(ROOT, "roadmap", "roadmap.json"), "utf8")));
  const emitted = runsOf(JSON.parse(readFileSync(join(ROOT, ".project", "roadmap.json"), "utf8")));
  assert.deepEqual(emitted.map((r) => [r.run_id, r.report_html]), canonical.map((r) => [r.run_id, r.report_html]));
});

test("Q.3: one declared page is on disk and one never was; one run declares nothing; reports/ does not exist", () => {
  const runs = runsOf(JSON.parse(readFileSync(join(ROOT, "roadmap", "roadmap.json"), "utf8")));
  const declared = [...new Set(runs.flatMap((r) => r.report_html || []))];
  assert.deepEqual(declared.map((p) => existsSync(join(ROOT, p))), [true, false]);
  assert.equal(runs.filter((r) => !("report_html" in r)).length, 1);
  assert.equal(existsSync(join(ROOT, "reports")), false);
  const index = JSON.parse(readFileSync(join(ROOT, ".project", "reports_index.json"), "utf8"));
  assert.equal(index.reports_source.directory_present, false, "the frozen surface must have nothing to say here");
});

test("Q.4: the page's copy names the run first — the verdict line the contract asks for", () => {
  const page = readFileSync(join(ROOT, "paginas", "primera-entrega", "reporte.html"), "utf8");
  assert.match(page, /data-run="RUN-HTMLQA-TWO-PAGES-001"/);
  assert.match(page, /cuerpo\.dataset\.run \+ ' · ' \+ cuerpo\.dataset\.pagina/);
  assert.match(page, /'veredicto-' \+ cuerpo\.dataset\.run/);
});
