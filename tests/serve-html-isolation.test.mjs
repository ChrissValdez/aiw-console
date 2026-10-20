// [#70] A THREAD'S HTML REPORT OPENS ISOLATED FROM THE CONSOLE.
//
// RUN-CONSOLE-THREAD-HTML-REPORTS-CONTRACT-001, decision 2 of its Phase 1 proposal, approved by
// the operator on 2026-10-20 together with this one change to the server.
//
// THE EXPOSURE, measured before any code: a project's page served under /projects/<key>/ runs on
// the console's OWN origin, beside the four routes that write. #56 closed that for the preview
// frame ("THE EXPOSURE OPENS THE DAY ANY PROJECT EMITS ITS OWN PREVIEW"); a run detail that links
// a thread's page in a new tab would reopen it, top-level and with nothing in the way. Another
// port or another host name does NOT close it: the write routes accept any loopback origin, read
// any body as JSON and answer no preflight. Only an OPAQUE origin does, because a document with
// one is forced to send `Origin: null`, which the gate refuses at 403.
//
// THE DECISION: every `.html` response in the per-project namespace carries
// `Content-Security-Policy: sandbox …` WITHOUT `allow-same-origin`. Measured on the real pages of
// the pilot project with that header: the page's origin is "null", its copy button still copies,
// its formulas render identically, and what it keeps in browser storage is refused (its own code
// already tolerates that). The console's OWN page is not in that namespace and is never touched.
import test from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { server, HOST } from "../project-console/serve.mjs";
import { serialize } from "../tools/roadmap/roadmap-core.mjs";

let workDir = "";
let baseUrl = "";

function fixtureTree() {
  return {
    schema_version: "roadmap_tree_v1",
    roadmap_id: "iso",
    title: "Isolation fixture",
    objectives: [{
      objective_id: "ISO-O1",
      title: "Objective",
      phases: [{
        phase_id: "ISO-O1.P1",
        title: "Phase",
        runs: [{
          run_id: "RUN-ISO-ONE-001", queue_order: 1, title: "One", summary: "s", full_description: "f",
          status: "active", depends_on: [], report_html: ["pages/report.html"]
        }]
      }]
    }]
  };
}

test.before(async () => {
  workDir = mkdtempSync(join(tmpdir(), "html-isolation-"));
  const root = join(workDir, "thread");
  mkdirSync(join(root, "roadmap"), { recursive: true });
  mkdirSync(join(root, "pages"), { recursive: true });
  writeFileSync(join(root, "roadmap", "roadmap.json"), serialize(fixtureTree(), "\n"), "utf8");
  writeFileSync(join(root, "pages", "report.html"), "<!doctype html><title>r</title><p>report</p>", "utf8");
  writeFileSync(join(root, "pages", "OLD.HTML"), "<!doctype html><title>o</title>", "utf8");
  writeFileSync(join(root, "pages", "data.json"), "{\"a\":1}", "utf8");
  writeFileSync(join(root, "notes.md"), "# notes", "utf8");
  writeFileSync(join(workDir, "registry.json"), JSON.stringify({
    registry_model: "project_registry_v1",
    title: "Isolation fixtures",
    projects: [{ key: "thread", root: "./thread" }]
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

const csp = (response) => response.headers.get("content-security-policy");
const tokens = (header) => String(header || "").trim().split(/\s+/);

test("I.1: a thread's page is served SANDBOXED — scripts, forms, popups, downloads and dialogs run; the console's origin is never granted", async () => {
  const response = await fetch(`${baseUrl}/projects/thread/pages/report.html`);
  assert.equal(response.status, 200);
  const header = csp(response);
  assert.ok(header, "a project page must carry a Content-Security-Policy");
  const list = tokens(header);
  assert.equal(list[0], "sandbox", "the policy is the sandbox directive");
  for (const allowed of ["allow-scripts", "allow-forms", "allow-popups", "allow-downloads", "allow-modals"]) {
    assert.ok(list.includes(allowed), `${allowed} keeps the thread's page working`);
  }
  // The three that would hand the page back what the sandbox takes away.
  assert.ok(!list.includes("allow-same-origin"), "allow-same-origin would give the page the console's origin back");
  assert.ok(!list.includes("allow-popups-to-escape-sandbox"), "a popup must inherit the sandbox, or its new tab is same-origin again");
  assert.ok(!list.includes("allow-top-navigation"), "the page must not steer the tab it was opened from");
  assert.match(await response.text(), /report/, "the page itself is served unchanged");
});

test("I.2: HEAD answers the same way — it is how the console checks that a declared page is on disk", async () => {
  const present = await fetch(`${baseUrl}/projects/thread/pages/report.html`, { method: "HEAD" });
  assert.equal(present.status, 200);
  assert.ok(tokens(csp(present)).includes("sandbox"));
  const missing = await fetch(`${baseUrl}/projects/thread/pages/never-built.html`, { method: "HEAD" });
  assert.equal(missing.status, 404, "a declared page that is not on disk answers 404, which the console states");
});

test("I.3: the extension is matched case-insensitively — .HTML is a page too", async () => {
  const response = await fetch(`${baseUrl}/projects/thread/pages/OLD.HTML`);
  assert.equal(response.status, 200);
  assert.ok(tokens(csp(response)).includes("sandbox"));
});

test("I.4: what the console READS from a project is untouched — JSON and Markdown carry no policy", async () => {
  for (const path of ["pages/data.json", "notes.md", "roadmap/roadmap.json"]) {
    const response = await fetch(`${baseUrl}/projects/thread/${path}`);
    assert.equal(response.status, 200, path);
    assert.equal(csp(response), null, `${path} must be served as before`);
  }
});

test("I.5: the console's OWN page is never sandboxed — it is not in the per-project namespace", async () => {
  const response = await fetch(`${baseUrl}/project-console/index.html`);
  assert.equal(response.status, 200);
  assert.equal(csp(response), null, "sandboxing the console would make its own writes send Origin: null");
});

test("I.6: the chain this header leans on — what a sandboxed page sends, Origin: null, is refused before any write route runs", async () => {
  const response = await fetch(`${baseUrl}/projects/thread/__project-console/roadmap/edit`, {
    method: "POST",
    headers: { "Content-Type": "text/plain", Origin: "null" },
    body: "{}"
  });
  assert.equal(response.status, 403);
  assert.equal(JSON.parse(await response.text()).reason, "forbidden_origin");
});
