// Project Console — Git commit history snapshot builder.
//
// Regenerates the derived read-only view file
//   .aiw/views/git_history.snapshot.json   (schema jame.git_history_snapshot.v1)
// from the LOCAL Git repository using read-only Git commands. It is invoked once at
// startup and on every relevant .git change by serve-project-console.mjs.
//
// Boundaries:
//   - Node built-ins only. No dependencies, no package.json required.
//   - Runs only READ-ONLY Git commands (for-each-ref / rev-parse / branch / log).
//   - Writes ONLY .aiw/views/git_history.snapshot.json (atomic temp + rename).
//   - Reads .aiw/roadmap/roadmap.json READ-ONLY to verify run associations.
//   - Never mutates Git, ledgers, state, or canonical roadmap data.
//   - If Git is unavailable or a build step fails, the existing snapshot is left
//     untouched and the function reports the reason instead of writing garbage.

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync, renameSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..", "..");
const OUT_PATH = join(REPO_ROOT, ".aiw", "views", "git_history.snapshot.json");
const ROADMAP_PATH = join(REPO_ROOT, ".aiw", "roadmap", "roadmap.json");
const SCHEMA = "jame.git_history_snapshot.v1";
const US = String.fromCharCode(31); // unit separator between fields (0x1F)
const RS = String.fromCharCode(30); // record separator between commits (0x1E)

// Local backup/safety branches (e.g. backup/*) are excluded from the human-facing History
// model so the branch tabs show only real working branches. This filters the GENERATED
// snapshot only; it never deletes, renames, checks out, or otherwise touches any Git branch.
const HIDDEN_HISTORY_BRANCH = /^backup\//;
export function isHiddenHistoryBranch(name) {
  return HIDDEN_HISTORY_BRANCH.test(String(name || ""));
}

// Resolve a git binary: PATH first, then the common Windows install locations. Returns
// the binary string or null when git cannot be found/run.
let cachedGitBin;
export function resolveGitBin() {
  if (cachedGitBin !== undefined) return cachedGitBin;
  const candidates = [
    "git",
    "C:\\Program Files\\Git\\cmd\\git.exe",
    "C:\\Program Files (x86)\\Git\\cmd\\git.exe"
  ];
  for (const bin of candidates) {
    try {
      execFileSync(bin, ["--version"], { stdio: "ignore" });
      cachedGitBin = bin;
      return bin;
    } catch {
      // try next candidate
    }
  }
  cachedGitBin = null;
  return null;
}

function git(bin, args) {
  return execFileSync(bin, ["-C", REPO_ROOT, ...args], {
    encoding: "utf8",
    maxBuffer: 128 * 1024 * 1024
  });
}

// Cheap change signature used by the server's watch gate: HEAD sha plus every local
// branch tip. It changes on commit / branch switch / merge / pull / reset and stays
// stable through object/index churn. Returns null when Git is unavailable.
export function gitSignature() {
  const bin = resolveGitBin();
  if (!bin) return null;
  try {
    const head = git(bin, ["rev-parse", "HEAD"]).trim();
    const refs = git(bin, ["for-each-ref", "--format=%(objectname) %(refname)", "refs/heads"]).trim();
    return `${head}\n${refs}`;
  } catch {
    return null;
  }
}

function loadRoadmapRunIds() {
  const runIds = new Set();
  try {
    if (!existsSync(ROADMAP_PATH)) return runIds;
    const roadmap = JSON.parse(readFileSync(ROADMAP_PATH, "utf8"));
    (roadmap.objectives || []).forEach((objective) =>
      (objective.phases || []).forEach((phase) =>
        (phase.runs || []).forEach((run) => {
          if (run && run.run_id) runIds.add(run.run_id);
        })
      )
    );
  } catch {
    // A malformed roadmap only means no associations can be verified; commits still build.
  }
  return runIds;
}

// Explicit-only association: a single distinct RUN-JAME-... id in subject/body that is a
// real canonical Roadmap v3 run. Never inferred from order, paths, tickets, or wording.
function deriveRunId(subject, body, runIds) {
  const text = `${subject}\n${body || ""}`;
  const mentions = Array.from(new Set(text.match(/RUN-JAME-[A-Z0-9-]+[A-Z0-9]/g) || []));
  const verified = mentions.filter((id) => runIds.has(id));
  return verified.length === 1 ? verified[0] : null;
}

function parseCommits(raw, branch, runIds) {
  const commits = [];
  raw.split(RS).forEach((record) => {
    if (!record.trim()) return;
    const f = record.replace(/^\n/, "").split(US);
    if (f.length < 6) return;
    const parents = (f[4] || "").trim();
    const subject = f[5] || "";
    const body = f.length > 6 ? (f[6] || "").trim() : "";
    commits.push({
      branch,
      sha: (f[0] || "").trim(),
      full_sha: (f[1] || "").trim(),
      author: f[2] || "",
      date: f[3] || "",
      parents,
      subject,
      body,
      is_merge: parents.split(/\s+/).filter(Boolean).length > 1,
      run_id: deriveRunId(subject, body, runIds)
    });
  });
  return commits;
}

// Build the snapshot. Returns a result object; only writes on full success.
// opts.now: injected timestamp string (defaults to the current time).
export function buildGitHistorySnapshot(opts = {}) {
  const bin = resolveGitBin();
  if (!bin) {
    return { ok: false, written: false, reason: "git_unavailable" };
  }
  let branches;
  let currentBranch;
  let head;
  try {
    const allBranches = git(bin, ["for-each-ref", "--format=%(refname:short)", "refs/heads"])
      .split(/\r?\n/)
      .map((b) => b.trim())
      .filter(Boolean);
    if (!allBranches.length) return { ok: false, written: false, reason: "no_local_branches" };
    // Drop backup/* branches from the History model (see isHiddenHistoryBranch).
    branches = allBranches.filter((b) => !isHiddenHistoryBranch(b));
    if (!branches.length) return { ok: false, written: false, reason: "no_visible_branches" };
    currentBranch = git(bin, ["branch", "--show-current"]).trim();
    head = git(bin, ["rev-parse", "HEAD"]).trim();
  } catch (error) {
    return { ok: false, written: false, reason: `git_meta_failed: ${String(error.message || error).slice(0, 200)}` };
  }
  // main first (prototype tab order), then the rest sorted. Default selection is
  // current_branch when it is a visible branch, else a safe fallback (audit branch, then
  // main, then the first visible branch) so a checkout on a hidden backup/* branch never
  // leaves History without a valid selected branch.
  branches.sort((a, b) => (a === "main" ? -1 : b === "main" ? 1 : a.localeCompare(b)));
  const resolvedCurrent = branches.includes(currentBranch)
    ? currentBranch
    : branches.includes("jame-parallel-audit-001")
      ? "jame-parallel-audit-001"
      : branches.includes("main")
        ? "main"
        : branches[0];

  const runIds = loadRoadmapRunIds();
  const format = ["%h", "%H", "%an", "%ad", "%p", "%s", "%b"].join(US) + RS;
  const commits = [];
  try {
    for (const branch of branches) {
      const raw = git(bin, ["log", branch, "--date=iso-strict", `--pretty=format:${format}`]);
      commits.push(...parseCommits(raw, branch, runIds));
    }
  } catch (error) {
    return { ok: false, written: false, reason: `git_log_failed: ${String(error.message || error).slice(0, 200)}` };
  }

  const generatedAt = opts.now || new Date().toISOString();
  const snapshot = {
    schema: SCHEMA,
    source: "local_git_autosync",
    note: "Derived read-only Project Console view data, regenerated automatically from the local Git repository by serve-project-console.mjs. Not canonical roadmap data, not operational ledger data, not run-state evidence.",
    generated_at: generatedAt,
    head,
    current_branch: resolvedCurrent,
    branches,
    commit_total: commits.length,
    commits
  };

  try {
    mkdirSync(dirname(OUT_PATH), { recursive: true });
    const tmp = `${OUT_PATH}.tmp`;
    writeFileSync(tmp, JSON.stringify(snapshot, null, 2) + "\n", "utf8");
    renameSync(tmp, OUT_PATH);
  } catch (error) {
    return { ok: false, written: false, reason: `write_failed: ${String(error.message || error).slice(0, 200)}` };
  }

  return {
    ok: true,
    written: true,
    head,
    current_branch: resolvedCurrent,
    branches: branches.length,
    commit_total: commits.length,
    run_associated: commits.filter((c) => c.run_id).length,
    generated_at: generatedAt
  };
}

// CLI entry: run the build once and report. Exit 0 on success or when git is simply
// unavailable (nothing to do); exit 1 only on an unexpected build/write failure.
const invokedDirectly = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  const result = buildGitHistorySnapshot();
  if (result.ok) {
    console.log(
      `[git-history] wrote ${OUT_PATH} — ${result.commit_total} commits / ${result.branches} branches; ` +
      `current=${result.current_branch}; head=${result.head.slice(0, 8)}; run-associated=${result.run_associated}`
    );
    process.exit(0);
  }
  if (result.reason === "git_unavailable") {
    console.warn("[git-history] git is unavailable; existing snapshot left untouched.");
    process.exit(0);
  }
  console.error(`[git-history] build failed (${result.reason}); existing snapshot left untouched.`);
  process.exit(1);
}
