// Project Console — REGISTRY DIGEST builder (O4.P18, RUN-CONSOLE-DIGEST-CABINA-001).
//
// ONE derived file with the state of every project the console REGISTERS, dated and
// fingerprinted so a reader can tell whether it has aged:
//
//   project-console/projects.digest.json     (schema aiw_registry_digest_v1)
//
// WHY IT IS NOT IN `.project/`. `.project/` is the per-project contract folder of
// CONTRATO §1: each registered root has its OWN, and the cabin's emission writes into it
// only files that speak about THAT project. This digest is the other axis — it is ONE file
// ABOUT ALL of them, derived from the REGISTRY, so no single project's folder is its home:
// filed under one project's `.project/` it would be that project making claims about the
// others, which is exactly what it is not.
//
// THE ARGUMENT IS THE AXIS, NEVER THE COUNT. This comment used to add that a further file
// "would break the pins that count those six", and that reason has since been read as though
// the number were the objection. It was not, and O4.P17 settled it in the other direction: a
// reports index IS per project — `reports/` is a folder of that repository — so it became the
// seventh artifact of `.project/`, pins and all. What still rules this file out is that it is
// cross-project, and that has nothing to do with how many files sit beside it. It lives
// beside the registry it derives from instead:
// `projects.json` decides which projects exist, `projects.digest.json` reports on them,
// and the two sort next to each other so the derivation is legible at `ls` time.
//
// Boundaries:
//   - Node built-ins only. No dependencies.
//   - Reads the registry, and inside each registered root ONLY the canonical sources its
//     LAYOUT declares (the projector's `ROOT_LAYOUTS`): the roadmap tree and no_claims.
//     WHERE the canonical lives is measured per project, never assumed — the registered
//     roots do not all keep it at the same path.
//   - Writes exactly ONE file, `project-console/projects.digest.json`, inside THIS repo,
//     atomically (temp + rename), behind a path guard. It writes into no registered root:
//     the other projects are READ.
//   - Runs only READ-ONLY Git commands, always with `--no-optional-locks` BEFORE the
//     subcommand so no invocation can leave a `.git/index.lock` behind for the operator.
//   - Never a Git command that writes. No add, no commit, no checkout, no restore.
//   - Fail-soft and NEVER inventive: a root that cannot be measured is reported ABSENT
//     with the reason. An absence is announced, never filled in.
//
// THE DIRTY READING, and why it is not `git status`. `git status` was measured on this repo
// reporting 339 modified files with zero real changes — the index's `stat` cache had gone
// stale (a `.gitattributes` renormalisation is the usual cause), and a reading that can be
// wrong by 339 is not a reading. What this emitter uses instead compares CONTENT:
//   tracked   → `git --no-optional-locks diff HEAD --numstat`
//   untracked → `git --no-optional-locks ls-files --others --exclude-standard`
// The first opens the files and compares them against HEAD through the same clean filters
// Git would apply, so it is correct even in a root configured with `core.autocrlf=true`
// (where a raw `hash-object --no-filters` against the blob reports every text file dirty).
// The second is a directory walk with no `stat`-cache involvement at all. Neither writes.
// The reading this emitter chose is DECLARED in the artifact, under `dirty_reading`.

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, renameSync, statSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import {
  ROOT_LAYOUTS,
  declaredRoadmapModel,
  deriveProjectOperationalStatus,
  detectRootLayout,
  flattenRoadmapTree,
  roadmapQueueGroup
} from "../projector/project.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = resolve(HERE, "..", "..");

export const DIGEST_SCHEMA = "aiw_registry_digest_v1";
// The version moves whenever this emitter's OUTPUT moves, for the same reason the projector's
// does (CONTRATO §6): an emitter that reports a new field is not the emitter that did not.
export const DIGEST_VERSION = "1.0.0";
export const DIGEST_GENERATED_FROM = `aiw-registry-digest@${DIGEST_VERSION}`;

// The registry this digest derives from, and the digest's own destination. Both are ONE
// constant in ONE file; nothing below repeats either literal.
export const REGISTRY_RELATIVE_PATH = join("project-console", "projects.json");
export const DIGEST_RELATIVE_PATH = join("project-console", "projects.digest.json");

// Said in the artifact itself, so the file argues for its own discipline where a reader who
// opened it by accident will see it — not only here, where only a maintainer looks.
export const DERIVED_BANNER =
  "DERIVED FILE — DO NOT EDIT BY HAND. Regenerate with " +
  "`node tools/project-console/build-registry-digest.mjs`. Every field below is measured " +
  "from the registry and from each registered project's own canonical sources; a hand edit " +
  "is overwritten by the next run and, until then, is a claim no measurement supports.";

// THE READING, as data, so the declaration in the artifact and the commands actually run are
// the same strings. `argv` is spread straight into the Git invocation below.
export const DIRTY_READING = {
  reading: "content_vs_head",
  tracked: {
    argv: ["diff", "HEAD", "--numstat"],
    reports: "tracked files whose CONTENT differs from HEAD"
  },
  untracked: {
    argv: ["ls-files", "--others", "--exclude-standard"],
    reports: "files present in the worktree that Git neither tracks nor ignores"
  },
  not_used: "git status",
  why:
    "`git status` was measured on this repository reporting 339 modified files with zero real " +
    "changes, from a stale `stat` cache in the index. Both commands above compare CONTENT " +
    "(or walk the directory) instead of trusting cached `stat` data, and `diff` applies the " +
    "same clean filters Git applies, so a root with `core.autocrlf=true` is not reported " +
    "wholly dirty the way a raw `hash-object --no-filters` comparison would report it.",
  no_optional_locks:
    "every invocation passes `--no-optional-locks` BEFORE the subcommand, so no reading can " +
    "leave a `.git/index.lock` behind and block the operator."
};

// ---------------------------------------------------------------- fingerprints (staleness)

// The Git blob SHA-1 of `bytes` — byte for byte what `git hash-object` computes. Chosen over a
// bare content hash precisely because it is REPRODUCIBLE BY THE READER with one command:
//   git --no-optional-locks hash-object --no-filters -- <path>
// so the freshness check needs nothing but Git and this file. It is computed in-process from
// the bytes on disk, which also makes it honest for a source that is UNCOMMITTED: a HEAD blob
// SHA would fingerprint a version of the file that is not the one that was read.
export function blobSha(bytes) {
  const header = Buffer.from(`blob ${bytes.length}\0`, "utf8");
  return createHash("sha1").update(Buffer.concat([header, Buffer.from(bytes)])).digest("hex");
}

// POSIX, root-relative — the form every path in this artifact takes (CONTRATO §7), so the
// artifact never carries an absolute path off the machine that generated it.
export function rootRelative(root, absolutePath) {
  return relative(resolve(root), absolutePath).split(sep).join("/");
}

// A `{path, sha1, bytes}` record for one canonical source, or null when it does not resolve —
// §7: a path that does not resolve is OMITTED, never emitted as a broken pointer. `mtime` is
// deliberately NOT carried: it would churn the digest on every regeneration while telling a
// reader nothing the content SHA does not already tell them, and staleness here is a question
// about CONTENT.
export function sourceFingerprint(root, relativePath) {
  const absolute = resolve(root, relativePath);
  if (!existsSync(absolute)) return null;
  try {
    const bytes = readFileSync(absolute);
    return { path: rootRelative(root, absolute), sha1: blobSha(bytes), bytes: bytes.length };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------- git (read-only, injectable)

// Resolved once, the way build-git-history-snapshot.mjs resolves it: PATH first, then the
// common Windows install locations. null when Git cannot be run at all.
let cachedGitBin;
export function resolveGitBin() {
  if (cachedGitBin !== undefined) return cachedGitBin;
  const candidates = ["git", "C:\\Program Files\\Git\\cmd\\git.exe", "C:\\Program Files (x86)\\Git\\cmd\\git.exe"];
  for (const bin of candidates) {
    try {
      execFileSync(bin, ["--version"], { stdio: "ignore" });
      cachedGitBin = bin;
      return bin;
    } catch {
      // try the next candidate
    }
  }
  cachedGitBin = null;
  return null;
}

// THE ONE PLACE a Git process is started. `--no-optional-locks` is prepended HERE, before the
// subcommand, so no caller can compose an invocation without it. Returns trimmed stdout, or
// null when the command fails (not its own repository, Git absent, anything else) — the caller
// turns a null into a declared absence and never into a guess.
//
// `exec` is a seam for the suite ALONE, and it exists one level lower than it looks like it
// should. The obvious seam is `read` (below), but a test that replaces `read` never sees the
// argv this function composes — so the guarantee that matters here, that the option lands BEFORE
// the subcommand, would be exactly the thing no test could observe. Injecting the exec instead
// keeps the single choke point and makes its output assertable.
export function gitRead(bin, root, args, exec = execFileSync) {
  if (!bin) return null;
  try {
    return exec(bin, ["--no-optional-locks", ...args], {
      cwd: root,
      encoding: "utf8",
      maxBuffer: 1 << 26,
      stdio: ["ignore", "pipe", "pipe"]
    }).trim();
  } catch {
    return null;
  }
}

const lines = (value) => (typeof value === "string" && value ? value.split("\n").filter(Boolean) : []);

// HEAD + branch + dirty, for one root. `read` is the seam: the suite injects a reader and no
// test starts a Git process or depends on any real repository's state.
//
// `exclude` removes this artifact's OWN path from both dirty lists. Without it the digest is
// self-invalidating — writing it makes the repository it just measured dirty, so every
// regeneration would report a change caused by the regeneration. The exclusion is DECLARED in
// the artifact (`self_excluded`) rather than done quietly.
export function readGitFacts(root, opts = {}) {
  const read = opts.read || gitRead;
  const bin = opts.bin === undefined ? resolveGitBin() : opts.bin;
  const exclude = new Set(opts.exclude || []);

  const head = read(bin, root, ["rev-parse", "HEAD"]);
  if (!head) {
    return {
      available: false,
      absent_reason: bin
        ? "git ran but this root is not its own repository at HEAD (no rev-parse HEAD)"
        : "no git binary could be resolved on this machine",
      head: null,
      branch: null,
      dirty: null
    };
  }

  // A detached HEAD answers `HEAD`; that is the measurement, and it is carried as-is rather
  // than resolved into a branch name this root does not have.
  const branch = read(bin, root, ["rev-parse", "--abbrev-ref", "HEAD"]);
  const tracked = lines(read(bin, root, DIRTY_READING.tracked.argv))
    .map((line) => line.split("\t")[2])
    .filter((path) => path && !exclude.has(path))
    .sort();
  const untracked = lines(read(bin, root, DIRTY_READING.untracked.argv))
    .filter((path) => !exclude.has(path))
    .sort();

  return {
    available: true,
    head,
    branch: branch || null,
    dirty: {
      is_dirty: tracked.length > 0 || untracked.length > 0,
      tracked_changed: tracked,
      untracked: untracked,
      counts: { tracked_changed: tracked.length, untracked: untracked.length },
      self_excluded: [...exclude].sort()
    }
  };
}

// ---------------------------------------------------------------- per-project derivation

// Run counts by status. Only statuses the tree ACTUALLY uses appear, sorted — the same call
// `buildRoadmapTreeSnapshot` makes when it filters `n > 0`. A status absent from a tree gets no
// zero here, because a zero would be a claim about a vocabulary this file does not own.
export function countsByStatus(flat) {
  const counts = {};
  for (const { run } of flat) {
    const status = typeof run.status === "string" ? run.status : "(unstated)";
    counts[status] = (counts[status] || 0) + 1;
  }
  return Object.fromEntries(Object.keys(counts).sort().map((key) => [key, counts[key]]));
}

// THE NEXT STEP — the lowest-`queue_order` run the projector's own queue grouping puts in
// `ready_next`. `roadmapQueueGroup` is used rather than a second reading of `depends_on`, so
// this file executes the projector's rule instead of restating it.
//
// WHAT IT DOES NOT KNOW, and says so. That function is barrier-aware only for a caller that
// hands it a barrier model, and the only thing that builds one is the console, in the browser.
// There is no server-side builder to hand it. So a run held by a barrier alone can appear here
// as ready, and the console remains authoritative. That limitation is carried into the artifact
// as a no-claim; it is not silently absorbed.
export function deriveNextStep(flat) {
  const runsById = new Map(flat.map(({ run }) => [run.run_id, run]));
  const ready = flat
    .filter(({ run }) => roadmapQueueGroup(run, runsById) === "ready_next")
    .sort((a, b) => (a.run.queue_order ?? Number.MAX_SAFE_INTEGER) - (b.run.queue_order ?? Number.MAX_SAFE_INTEGER));
  if (!ready.length) {
    return { present: false, absent_reason: "no run is in the queue group `ready_next`" };
  }
  const { objective_id, phase_id, run } = ready[0];
  return {
    present: true,
    run_id: run.run_id,
    title: run.title ?? null,
    queue_order: run.queue_order ?? null,
    objective_id,
    phase_id,
    queue_group: "ready_next"
  };
}

// The active runs, in queue order — the axis a reader asking "what is being worked on" needs.
export function activeRuns(flat) {
  return flat
    .filter(({ run }) => run.status === "active")
    .sort((a, b) => (a.run.queue_order ?? Number.MAX_SAFE_INTEGER) - (b.run.queue_order ?? Number.MAX_SAFE_INTEGER))
    .map(({ objective_id, phase_id, run }) => ({
      run_id: run.run_id,
      title: run.title ?? null,
      queue_order: run.queue_order ?? null,
      objective_id,
      phase_id
    }));
}

// The project's OWN no-claims, from the canonical path its layout declares — not from the
// emitted `.project/no_claims.json`, which is a projection of it. Absent is a valid answer and
// is reported as one.
export function noClaimsBlock(root, layout) {
  const source = sourceFingerprint(root, layout.paths.no_claims);
  if (!source) {
    return { present: false, absent_reason: `no file at the layout's no_claims path (${posix(layout.paths.no_claims)})` };
  }
  let claims = null;
  try {
    const parsed = JSON.parse(readFileSync(resolve(root, layout.paths.no_claims), "utf8"));
    claims = Array.isArray(parsed?.claims) ? parsed.claims.length : null;
  } catch {
    claims = null;
  }
  return claims == null
    ? { present: true, source, total: null, absent_reason: "the file does not carry a `claims` array to count" }
    : { present: true, source, total: claims };
}

const posix = (value) => String(value).split(sep).join("/");

// One project's entry. Every branch that cannot measure something returns a `measured: false`
// entry naming the reason: the digest reports four projects whatever happens to them, and a
// project it could not read is INFORMATION, not a hole and not an omission.
export function buildProjectDigest(entry, opts = {}) {
  const { key, root_declared, root } = entry;
  const base = { key, root_declared: posix(root_declared) };

  if (!existsSync(root)) {
    return { ...base, measured: false, absent_reason: "the registered root does not exist on this machine" };
  }

  const layout = detectRootLayout(root);
  if (!layout) {
    return {
      ...base,
      measured: false,
      absent_reason:
        "no layout claimed this root: none of the canonical roadmap paths tried holds a " +
        `conforming objective/phase/run tree (tried ${ROOT_LAYOUTS.map((l) => posix(l.roadmap)).join(", ")})`
    };
  }

  const flat = flattenRoadmapTree(layout.tree);
  const git = readGitFacts(root, { ...opts, exclude: opts.excludeByKey?.[key] || [] });

  return {
    ...base,
    measured: true,
    // WHERE the canonical lives, measured. The four registered roots do not agree on this, so
    // the layout that claimed the root travels with the path it supplied.
    canonical: {
      layout: layout.layout,
      roadmap: posix(layout.paths.roadmap),
      no_claims: posix(layout.paths.no_claims),
      declared_model: declaredRoadmapModel(layout.tree)
    },
    git,
    operational_status: deriveProjectOperationalStatus(flat.map(({ run }) => run.status)),
    runs: { total: flat.length, by_status: countsByStatus(flat) },
    active_runs: activeRuns(flat),
    next_step: deriveNextStep(flat),
    no_claims: noClaimsBlock(root, layout),
    // The SHAs that date this entry: recompute them to learn whether it has aged.
    sources: [sourceFingerprint(root, layout.paths.roadmap), sourceFingerprint(root, layout.paths.no_claims)].filter(Boolean)
  };
}

// ---------------------------------------------------------------- the registry, and the digest

// Parse the registry the way the shell parses it (project-console/serve.mjs `readRegistry`):
// roots resolve against the REGISTRY'S OWN directory, and the list of projects is whatever the
// registry lists. The project list is DERIVED here and typed nowhere.
export function readRegistry(registryPath) {
  const raw = readFileSync(registryPath, "utf8");
  const parsed = JSON.parse(raw);
  const listed = Array.isArray(parsed?.projects) ? parsed.projects : null;
  if (!listed) throw new Error(`registry has no \`projects\` array: ${registryPath}`);
  const registryDir = dirname(registryPath);
  return {
    path: registryPath,
    dir: registryDir,
    registry_model: typeof parsed.registry_model === "string" ? parsed.registry_model : null,
    title: typeof parsed.title === "string" ? parsed.title : null,
    bytes: Buffer.from(raw, "utf8"),
    projects: listed
      .filter((item) => typeof item?.key === "string" && item.key && typeof item?.root === "string" && item.root)
      .map((item) => ({ key: item.key, root_declared: item.root, root: resolve(registryDir, item.root) }))
  };
}

// What this artifact does NOT claim. §18/§20 doctrine: an absence is announced, and the
// announcement is part of the artifact rather than of a maintainer's memory.
function digestNoClaims(selfPath) {
  return [
    "It reports the projects the registry LISTS, and nothing about any project the registry " +
      "does not list. The count is whatever the registry holds — it is derived, never typed.",
    "`next_step` executes the projector's `roadmapQueueGroup` WITHOUT a barrier model, because " +
      "the only thing that builds one is the console in the browser. A run held by a barrier " +
      "alone can therefore appear as ready here. The console is authoritative on the queue.",
    "`git.dirty.untracked` uses `--exclude-standard`, so a file the project's own ignore rules " +
      "exclude is not reported. It is a reading of what Git would show, not of the filesystem.",
    `\`${posix(selfPath)}\` — this file — is excluded from its own dirty reading, because ` +
      "writing it would otherwise make every regeneration report a change it caused itself.",
    "It reads each project's CANONICAL sources. It says nothing about whether that project's " +
      "`.project/` folder has been re-emitted from them, which is the cabin's act, not this one's.",
    "It writes into no registered project. The other roots are read, and only this repository " +
      "receives a file."
  ];
}

// Build the digest. `now` and the Git seam are injectable so the artifact is deterministic
// under test; nothing else about the build differs between a test and a real run.
export function buildRegistryDigest(opts = {}) {
  const repoRoot = resolve(opts.repoRoot || REPO_ROOT);
  const registryPath = opts.registryPath ? resolve(opts.registryPath) : join(repoRoot, REGISTRY_RELATIVE_PATH);
  const selfRelative = posix(opts.selfRelativePath || DIGEST_RELATIVE_PATH);
  const registry = readRegistry(registryPath);

  // The digest's own path is dirty-excluded in whichever registered root IS this repository —
  // matched by resolved path, never by key, so a registry that renames the entry still matches.
  const excludeByKey = {};
  for (const project of registry.projects) {
    if (resolve(project.root) === repoRoot) excludeByKey[project.key] = [selfRelative];
  }

  const projects = registry.projects.map((project) => buildProjectDigest(project, { ...opts, excludeByKey }));

  return {
    schema: DIGEST_SCHEMA,
    generated_at: opts.now || new Date().toISOString(),
    generated_from: DIGEST_GENERATED_FROM,
    derived: true,
    do_not_edit: DERIVED_BANNER,
    emitted_to: selfRelative,
    emitter: "tools/project-console/build-registry-digest.mjs",
    registry: {
      path: posix(rootRelative(repoRoot, registryPath)),
      registry_model: registry.registry_model,
      title: registry.title,
      sha1: blobSha(registry.bytes),
      // The number the digest MEASURED, said out loud next to the list, so a reader comparing
      // this file against a prose description that says another number can see which is dated.
      project_count: registry.projects.length,
      keys: registry.projects.map((project) => project.key)
    },
    dirty_reading: DIRTY_READING,
    staleness: {
      how:
        "Every `sha1` in this file is a Git blob hash of the bytes that were read. Recompute one " +
        "with `git --no-optional-locks hash-object --no-filters -- <path>` inside that project: " +
        "if it differs, this entry is stale. A project's `git.head` moving means the same.",
      generated_at_is: "the instant this file was built, in UTC (ISO 8601)"
    },
    no_claims: digestNoClaims(selfRelative),
    projects
  };
}

// ---------------------------------------------------------------- write

// Resolve the destination and PROVE it is the declared one inside `repoRoot`. The mirror of the
// projector's `resolveInsideAiw` / `resolveInsideProject` guards: this emitter has exactly one
// legal destination, and a composed path that is not it is refused rather than written.
export function resolveDigestPath(repoRoot, relativePath = DIGEST_RELATIVE_PATH) {
  const root = resolve(repoRoot);
  const outPath = resolve(root, relativePath);
  const rel = relative(root, outPath);
  if (!rel || rel.startsWith("..") || isAbsolute(rel)) {
    throw new Error(`Refusing to write outside ${root}: ${outPath}`);
  }
  return outPath;
}

// Atomic (temp + rename), 2-space JSON, trailing newline, LF — the projector's own
// `writeJsonAtomic` shape, so this artifact matches every other derived file in the repo.
export function writeRegistryDigest(opts = {}) {
  const repoRoot = resolve(opts.repoRoot || REPO_ROOT);
  const relativePath = opts.selfRelativePath || DIGEST_RELATIVE_PATH;
  const digest = buildRegistryDigest({ ...opts, repoRoot, selfRelativePath: posix(relativePath) });
  const outPath = resolveDigestPath(repoRoot, relativePath);
  mkdirSync(dirname(outPath), { recursive: true });
  const tmp = `${outPath}.tmp`;
  writeFileSync(tmp, JSON.stringify(digest, null, 2) + "\n", "utf8");
  renameSync(tmp, outPath);
  return { ok: true, path: outPath, digest };
}

// CLI. One line per project so an operator sees what was measured without opening the file.
function main() {
  const { path, digest } = writeRegistryDigest({});
  const relative = rootRelative(REPO_ROOT, path);
  console.log(`[registry-digest] wrote ${relative} (${digest.registry.project_count} projects, ${digest.generated_at})`);
  for (const project of digest.projects) {
    if (!project.measured) {
      console.log(`[registry-digest]   ${project.key}: NOT MEASURED — ${project.absent_reason}`);
      continue;
    }
    const git = project.git.available
      ? `${project.git.head.slice(0, 8)} on ${project.git.branch}${project.git.dirty.is_dirty ? " DIRTY" : " clean"}`
      : `git ABSENT (${project.git.absent_reason})`;
    const next = project.next_step.present ? project.next_step.run_id : "next ABSENT";
    console.log(
      `[registry-digest]   ${project.key}: ${project.canonical.layout} @ ${project.canonical.roadmap} | ` +
        `${project.runs.total} runs | ${git} | active ${project.active_runs.length} | ${next}`
    );
  }
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  main();
}
