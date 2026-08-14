// RUN-CONSOLE-VERDICT-POST-001 (#57) — the verdict write route, judged on its own behaviour.
// (The read-only matrix it sits inside is tests/serve-write-routes.test.mjs.)
//
// THE PROPERTY THAT GOVERNS EVERY OTHER ONE HERE: the endpoint's model IS the renderer's.
// serve.mjs loads project-console/assets/run-report-renderer.js and asks its own functions —
// the closed vocabularies, the `requires_verdict === false` derivation by field presence, the
// completeness gate, the run-APPROVED guard, the derived `stopped`. The parity test at the
// bottom proves it mechanically: the file the endpoint writes is `rrVerdictOutput` of the same
// state, byte for byte, except for `decided_at`, which the WRITER stamps.
//
// Runs the real serve.mjs on an ephemeral port against a GENERATED fixture registry
// (PC_REGISTRY) whose project lives in a temp dir, so no real repository is written.

import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { server, HOST, VERDICT_WRITE_SUFFIX } from "../project-console/serve.mjs";
import { serialize } from "../tools/roadmap/roadmap-core.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const RENDERER = join(REPO_ROOT, "project-console", "assets", "run-report-renderer.js");

// The fixture report: three items and one executor decision, exercising every derivation the
// route must inherit — a stop item, a plain item, an item that declares it needs no verdict
// (BY FIELD, not by type), and a decision that signs apart.
const REPORT_RUN = "RUN-VW-FIXTURE-001";
const FIXTURE_REPORT = {
  schema_version: 1,
  run_id: REPORT_RUN,
  project: "verdict-write-fixture",
  source_commit: "abc1234",
  gate: "human_judgment",
  items: [
    {
      item_id: "S1", stop: true, requires_verdict: true,
      headline: "the stop item", subject: { id: "SUBJ-1", label: "subject one" }
    },
    {
      item_id: "K1", stop: false, requires_verdict: true,
      headline: "the plain item", subject: { id: "SUBJ-2", label: "subject two" }
    },
    {
      item_id: "N1", stop: false, requires_verdict: false,
      headline: "the informative item nobody signs", subject: { id: "SUBJ-3", label: "subject three" }
    }
  ],
  self_decisions: [
    { decision_id: "D1", what: "a criterion the executor adopted on its own", requires_verdict: true }
  ]
};

function fixtureTree(runPrefix) {
  return {
    schema_version: "roadmap_tree_v1",
    roadmap_id: "roadmap",
    title: "Fixture " + runPrefix,
    objectives: [{
      objective_id: runPrefix + "-O1",
      title: "Objective",
      phases: [{
        phase_id: runPrefix + "-O1.P1",
        title: "Phase",
        runs: [
          { run_id: REPORT_RUN, queue_order: 1, title: "One", summary: "s", full_description: "f", status: "completed", depends_on: [] }
        ]
      }]
    }]
  };
}

// The complete, guard-clean payload the renderer would produce: every signing step decided,
// the free note in the language the operator wrote it, the signer typed. Cloned per test so a
// case can bend one field without leaning on another case's state.
function completeVerdict() {
  return {
    schema_version: 1,
    run_id: REPORT_RUN,
    project: "verdict-write-fixture",
    source_commit: "abc1234",
    gate: "human_judgment",
    verdict_by: "Operadora Q.",
    decided_at: null,
    run: { verdict: "APPROVED", disposition: null, chosen_option: null, note: "todo en orden — firmado en español, con acentos: sí" },
    items: [
      { item_id: "S1", verdict: "APPROVED", disposition: null, chosen_option: null, note: null },
      { item_id: "K1", verdict: "APPROVED", disposition: null, chosen_option: null, note: "nota libre del operador" },
      { item_id: "N1", verdict: null, disposition: null, chosen_option: null, note: null }
    ],
    self_decisions: [
      { decision_id: "D1", index: 0, verdict: "APPROVED", disposition: null, chosen_option: null, note: null }
    ]
  };
}

let workDir = "";
let baseUrl = "";
let projectRoot = "";
let reportDir = "";
let verdictPath = "";

const route = (key) => `/projects/${key}/${VERDICT_WRITE_SUFFIX}`;

async function post(path, body, headers) {
  const response = await fetch(baseUrl + path, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(headers || {}) },
    body: typeof body === "string" ? body : JSON.stringify(body)
  });
  const text = await response.text();
  let payload = null;
  try { payload = JSON.parse(text); } catch { /* non-JSON error page */ }
  return { status: response.status, payload, text };
}

test.before(async () => {
  workDir = mkdtempSync(join(tmpdir(), "serve-verdict-write-"));
  projectRoot = join(workDir, "conreporte");
  mkdirSync(join(projectRoot, "roadmap"), { recursive: true });
  writeFileSync(join(projectRoot, "roadmap", "roadmap.json"), serialize(fixtureTree("VW"), "\n"), "utf8");
  reportDir = join(projectRoot, "reports", REPORT_RUN);
  mkdirSync(reportDir, { recursive: true });
  writeFileSync(join(reportDir, "report.json"), JSON.stringify(FIXTURE_REPORT, null, 2) + "\n", "utf8");
  verdictPath = join(reportDir, "verdict.json");
  // A registered root that is NOT a project — no layout claims it — for the refusal path.
  mkdirSync(join(workDir, "outside-target"), { recursive: true });
  writeFileSync(join(workDir, "registry.json"), JSON.stringify({
    registry_model: "project_registry_v1",
    title: "Verdict-write fixtures",
    projects: [
      { key: "conreporte", root: "./conreporte" },
      { key: "fuera", root: "./outside-target" }
    ]
  }, null, 2), "utf8");
  process.env.PC_REGISTRY = join(workDir, "registry.json");
  await new Promise((resolveListen) => server.listen(0, HOST, resolveListen));
  baseUrl = `http://${HOST}:${server.address().port}`;
});

test.after(async () => {
  delete process.env.PC_REGISTRY;
  await new Promise((resolveClose) => server.close(resolveClose));
  rmSync(workDir, { recursive: true, force: true });
});

// Each case leaves no verdict behind, so every case starts from "never signed".
test.beforeEach(() => {
  if (existsSync(verdictPath)) rmSync(verdictPath);
});

// ---------------------------------------------------------------- the gates, in their order

test("method gate: only POST is a method of this route", async () => {
  for (const method of ["GET", "PUT", "PATCH", "DELETE"]) {
    const response = await fetch(baseUrl + route("conreporte"), { method });
    const payload = JSON.parse(await response.text());
    assert.equal(response.status, 405, method);
    assert.equal(payload.reason, "method_not_allowed", method);
  }
});

test("origin gate: a non-local browser origin is refused before anything is read", async () => {
  const answer = await post(route("conreporte"), { run_id: REPORT_RUN, verdict: completeVerdict() }, { Origin: "http://evil.example" });
  assert.equal(answer.status, 403);
  assert.equal(answer.payload.reason, "forbidden_origin");
  assert.equal(existsSync(verdictPath), false, "nothing was written");
});

test("body gate: non-JSON, a non-object, a missing verdict and a bad run_id are each 400 bad_request", async () => {
  for (const body of ["no json {", JSON.stringify([1, 2]), JSON.stringify({ verdict: {} }), JSON.stringify({ run_id: REPORT_RUN }), JSON.stringify({ run_id: REPORT_RUN, verdict: [] })]) {
    const answer = await post(route("conreporte"), body);
    assert.equal(answer.status, 400, body);
    assert.equal(answer.payload.reason, "bad_request", body);
  }
});

test("the run folder name is ONE path segment: traversal and .git never reach the filesystem", async () => {
  for (const runId of ["../escape", "..", "a/b", "a\\b", ".git", ".hidden", ""]) {
    const answer = await post(route("conreporte"), { run_id: runId, verdict: completeVerdict() });
    assert.equal(answer.status, 400, JSON.stringify(runId));
    assert.equal(answer.payload.reason, "bad_request", JSON.stringify(runId));
  }
  assert.equal(existsSync(join(workDir, "escape")), false, "nothing landed outside the project");
});

test("project gate: an unknown key and a root no layout claims are refused with named reasons, and nothing is created", async () => {
  const unknown = await post(route("no-registrado"), { run_id: REPORT_RUN, verdict: completeVerdict() });
  assert.equal(unknown.status, 404);
  assert.equal(unknown.payload.reason, "unknown_project");
  const fuera = await post(route("fuera"), { run_id: REPORT_RUN, verdict: completeVerdict() });
  assert.equal(fuera.status, 404);
  assert.equal(fuera.payload.reason, "project_not_editable_no_layout");
  assert.deepEqual(readdirSync(join(workDir, "outside-target")), [], "the refused root must stay byte-empty");
});

test("report gate: a folder with no report answers 409 report_missing and NAMES the file it looked for", async () => {
  const answer = await post(route("conreporte"), { run_id: "RUN-VW-NO-EXISTE-001", verdict: completeVerdict() });
  assert.equal(answer.status, 409);
  assert.equal(answer.payload.reason, "report_missing");
  assert.equal(answer.payload.file, "reports/RUN-VW-NO-EXISTE-001/report.json");
});

test("report gate: a report that does not parse is 409 report_unparsable — a verdict cannot answer what cannot be read", async () => {
  const brokenDir = join(projectRoot, "reports", "RUN-VW-ROTO-001");
  mkdirSync(brokenDir, { recursive: true });
  writeFileSync(join(brokenDir, "report.json"), "{ broken", "utf8");
  try {
    const answer = await post(route("conreporte"), { run_id: "RUN-VW-ROTO-001", verdict: completeVerdict() });
    assert.equal(answer.status, 409);
    assert.equal(answer.payload.reason, "report_unparsable");
    assert.equal(existsSync(join(brokenDir, "verdict.json")), false);
  } finally {
    rmSync(brokenDir, { recursive: true, force: true });
  }
});

test("mismatch gate: a payload signed for one run posted at another's folder is 409 report_mismatch", async () => {
  const verdict = completeVerdict();
  verdict.run_id = "RUN-VW-OTRO-001";
  const answer = await post(route("conreporte"), { run_id: REPORT_RUN, verdict });
  assert.equal(answer.status, 409);
  assert.equal(answer.payload.reason, "report_mismatch");
  assert.equal(existsSync(verdictPath), false);
});

// ---------------------------------------------------------------- the model gate — the renderer's own

test("completeness: a missing verdict or a missing signature refuses with the model's own words, and writes nothing", async () => {
  const unsigned = completeVerdict();
  unsigned.items = unsigned.items.filter((entry) => entry.item_id !== "K1");
  let answer = await post(route("conreporte"), { run_id: REPORT_RUN, verdict: unsigned });
  assert.equal(answer.status, 422);
  assert.equal(answer.payload.reason, "verdict_refused");
  assert.ok(answer.payload.errors.some((e) => /missing 1 verdict/.test(e)), JSON.stringify(answer.payload.errors));

  const anonymous = completeVerdict();
  anonymous.verdict_by = "   ";
  answer = await post(route("conreporte"), { run_id: REPORT_RUN, verdict: anonymous });
  assert.equal(answer.status, 422);
  assert.ok(answer.payload.errors.some((e) => /the signature/.test(e)), JSON.stringify(answer.payload.errors));
  assert.equal(existsSync(verdictPath), false, "nothing was written on either refusal");
});

test("closed vocabularies: an item token outside its two and a run token outside its three are refused by name", async () => {
  const invented = completeVerdict();
  invented.items[1].verdict = "MAYBE";
  let answer = await post(route("conreporte"), { run_id: REPORT_RUN, verdict: invented });
  assert.equal(answer.status, 422);
  assert.ok(answer.payload.errors.some((e) => /K1: verdict "MAYBE" is outside the closed set APPROVED, CHANGES_REQUIRED/.test(e)),
    JSON.stringify(answer.payload.errors));

  const blockedItem = completeVerdict();
  blockedItem.items[1].verdict = "BLOCKED";
  answer = await post(route("conreporte"), { run_id: REPORT_RUN, verdict: blockedItem });
  assert.equal(answer.status, 422, "BLOCKED is the run's third token, never an item's");

  const inventedRun = completeVerdict();
  inventedRun.run.verdict = "DONE";
  answer = await post(route("conreporte"), { run_id: REPORT_RUN, verdict: inventedRun });
  assert.equal(answer.status, 422);
  assert.ok(answer.payload.errors.some((e) => /__run__: verdict "DONE" is outside the closed set APPROVED, CHANGES_REQUIRED, BLOCKED/.test(e)));
});

test("requires_verdict false is INHERITED: a verdict on the item that asks none is refused, by field and never by type", async () => {
  const overreach = completeVerdict();
  overreach.items[2].verdict = "APPROVED"; // N1 declares requires_verdict: false
  const answer = await post(route("conreporte"), { run_id: REPORT_RUN, verdict: overreach });
  assert.equal(answer.status, 422);
  assert.ok(answer.payload.errors.some((e) => /N1: declares requires_verdict false/.test(e)), JSON.stringify(answer.payload.errors));
});

test("an entry naming a step the report does not declare is an error, never silently dropped", async () => {
  const stray = completeVerdict();
  stray.items.push({ item_id: "X9", verdict: "APPROVED", disposition: null, chosen_option: null, note: null });
  const answer = await post(route("conreporte"), { run_id: REPORT_RUN, verdict: stray });
  assert.equal(answer.status, 422);
  assert.ok(answer.payload.errors.some((e) => /names X9, which the report does not declare/.test(e)));
});

test("THE GUARD travels: run APPROVED over a CHANGES_REQUIRED without disposition, or owed here, refuses in the guard's own words", async () => {
  const noDisposition = completeVerdict();
  noDisposition.items[1].verdict = "CHANGES_REQUIRED";
  let answer = await post(route("conreporte"), { run_id: REPORT_RUN, verdict: noDisposition });
  assert.equal(answer.status, 422);
  assert.ok(answer.payload.errors.some((e) => /APPROVED is not available for the run: 1 change still carries no disposition\./.test(e)),
    JSON.stringify(answer.payload.errors));

  const owedHere = completeVerdict();
  owedHere.items[1].verdict = "CHANGES_REQUIRED";
  owedHere.items[1].disposition = "this_run";
  answer = await post(route("conreporte"), { run_id: REPORT_RUN, verdict: owedHere });
  assert.equal(answer.status, 422);
  assert.ok(answer.payload.errors.some((e) => /APPROVED is not available for the run: 1 fix is owed to this run itself\./.test(e)));
  assert.equal(existsSync(verdictPath), false);
});

test("the guard is a guard, not an aggregation: APPROVED with every fix travelling elsewhere WRITES", async () => {
  const forward = completeVerdict();
  forward.items[1].verdict = "CHANGES_REQUIRED";
  forward.items[1].disposition = "new_run";
  const answer = await post(route("conreporte"), { run_id: REPORT_RUN, verdict: forward });
  assert.equal(answer.status, 200, JSON.stringify(answer.payload));
  const written = JSON.parse(readFileSync(verdictPath, "utf8"));
  assert.equal(written.run.verdict, "APPROVED", "the run verdict is the operator's, never computed from the items");
  assert.equal(written.items.find((i) => i.item_id === "K1").disposition, "new_run");
});

test("a disposition without CHANGES_REQUIRED is refused: it would travel with nothing", async () => {
  const dangling = completeVerdict();
  dangling.items[1].disposition = "new_run"; // verdict stays APPROVED
  const answer = await post(route("conreporte"), { run_id: REPORT_RUN, verdict: dangling });
  assert.equal(answer.status, 422);
  assert.ok(answer.payload.errors.some((e) => /K1: a disposition travels only with CHANGES_REQUIRED/.test(e)));
});

test("stopped is DERIVED, never chosen: a payload that tries to choose it differently is refused saying so", async () => {
  const choosing = completeVerdict();
  choosing.items[0].verdict = "CHANGES_REQUIRED"; // S1 is the stop item -> derived stopped: true
  choosing.items[0].disposition = "new_run";
  choosing.stopped = false; // the choice
  const answer = await post(route("conreporte"), { run_id: REPORT_RUN, verdict: choosing });
  assert.equal(answer.status, 422);
  assert.ok(answer.payload.errors.some((e) => /stopped is derived .* never chosen/.test(e)), JSON.stringify(answer.payload.errors));
  assert.equal(existsSync(verdictPath), false);
});

// ---------------------------------------------------------------- the write

test("HAPPY PATH: writes verdict.json BESIDE the report, note verbatim, signer as typed, decided_at stamped by the writer", async () => {
  const before = Date.now();
  const answer = await post(route("conreporte"), { run_id: REPORT_RUN, verdict: completeVerdict() });
  assert.equal(answer.status, 200, JSON.stringify(answer.payload));
  assert.equal(answer.payload.ok, true);
  assert.equal(answer.payload.path, `reports/${REPORT_RUN}/verdict.json`, "the answer names the repo-relative file");
  assert.equal(answer.payload.overwrote, false);
  assert.equal(answer.payload.stopped, false);
  assert.equal(answer.payload.reemitted, false, "one file was written; the derived index is not touched");
  assert.equal(answer.payload.committed, false, "no Git ran");

  const written = JSON.parse(readFileSync(verdictPath, "utf8"));
  assert.equal(written.run_id, REPORT_RUN);
  assert.equal(written.verdict_by, "Operadora Q.", "the signer is what the person typed — no constant");
  assert.equal(written.run.note, "todo en orden — firmado en español, con acentos: sí", "the note travels VERBATIM, in its own language");
  assert.equal(written.items.find((i) => i.item_id === "K1").note, "nota libre del operador");
  assert.equal(written.items.find((i) => i.item_id === "N1").verdict, null, "the unsignable item carries no verdict");
  assert.equal(written.stopped, false);
  assert.ok(typeof written.decided_at === "string" && !Number.isNaN(Date.parse(written.decided_at)), "decided_at is a stamp");
  assert.ok(Date.parse(written.decided_at) >= before - 1000, "stamped now, not transcribed from the payload");
  // And ONLY the verdict landed: the report is untouched and no other file appeared beside it.
  assert.deepEqual(readdirSync(reportDir).sort(), ["report.json", "verdict.json"]);
  assert.equal(existsSync(join(projectRoot, ".project")), false, "no re-emission happened");
});

test("stopped: a rejected stop item derives true into the written file — the field only states the consequence", async () => {
  const halted = completeVerdict();
  halted.items[0].verdict = "CHANGES_REQUIRED";
  halted.items[0].disposition = "new_run";
  halted.run.verdict = "BLOCKED";
  delete halted.stopped; // nothing chosen; the writer derives
  const answer = await post(route("conreporte"), { run_id: REPORT_RUN, verdict: halted });
  assert.equal(answer.status, 200, JSON.stringify(answer.payload));
  assert.equal(answer.payload.stopped, true);
  const written = JSON.parse(readFileSync(verdictPath, "utf8"));
  assert.equal(written.stopped, true);
  assert.equal(written.run.verdict, "BLOCKED", "and the run verdict stays the operator's own");
});

test("re-signing OVERWRITES with a backup, and says both", async () => {
  const first = await post(route("conreporte"), { run_id: REPORT_RUN, verdict: completeVerdict() });
  assert.equal(first.status, 200);
  const second = completeVerdict();
  second.run.note = "segunda firma, tras corregir la nota";
  const answer = await post(route("conreporte"), { run_id: REPORT_RUN, verdict: second });
  assert.equal(answer.status, 200, JSON.stringify(answer.payload));
  assert.equal(answer.payload.overwrote, true);
  assert.ok(typeof answer.payload.backupPath === "string" && answer.payload.backupPath.length > 0,
    "the replaced verdict's backup is named");
  const written = JSON.parse(readFileSync(verdictPath, "utf8"));
  assert.equal(written.run.note, "segunda firma, tras corregir la nota");
});

// ---------------------------------------------------------------- parity with the view

test("PARITY: the written file IS rrVerdictOutput of the same state — the endpoint asked the renderer, it did not re-implement it", async () => {
  const verdict = completeVerdict();
  verdict.items[1].verdict = "CHANGES_REQUIRED";
  verdict.items[1].disposition = "operator_fixed";
  verdict.items[1].note = "lo arreglo yo esta tarde";
  const answer = await post(route("conreporte"), { run_id: REPORT_RUN, verdict });
  assert.equal(answer.status, 200, JSON.stringify(answer.payload));
  const written = JSON.parse(readFileSync(verdictPath, "utf8"));

  // The same renderer, the same state, the same output — built the way the view builds it.
  const sandbox = { console };
  vm.createContext(sandbox);
  vm.runInContext(readFileSync(RENDERER, "utf8"), sandbox, { filename: RENDERER });
  const state = { report: FIXTURE_REPORT, v: {}, reviewer: verdict.verdict_by, lang: "en" };
  state.v.S1 = { verdict: "APPROVED" };
  state.v.K1 = { verdict: "CHANGES_REQUIRED", disposition: "operator_fixed", note: "lo arreglo yo esta tarde" };
  state.v.D1 = { verdict: "APPROVED" };
  state.v.__run__ = { verdict: "APPROVED", note: verdict.run.note };
  // JSON round-trip pulls the expected object into this realm: deepEqual under strict assert
  // compares prototypes, and a vm-born object would fail on realm alone, not on content.
  const expected = JSON.parse(JSON.stringify(sandbox.rrVerdictOutput(FIXTURE_REPORT, state)));
  expected.decided_at = written.decided_at; // the one field the writer stamps
  assert.deepEqual(written, expected);
});
