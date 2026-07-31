// O4.P13 — the git-history artifact is SCOPED TO THE REPOSITORY'S DEFAULT BRANCH.
//
// CONTRATO §19 registered, as a FACT, that this was the one emitted artifact whose content
// depended on the machine emitting it: it read every LOCAL branch, and local branches are
// whatever a checkout happens to have fetched (§19 measured 35 commits against 42). It named two
// possible resolutions and left the choice open. The choice is now made — scope to the default
// branch — and these tests hold it to two things: that the branch is DETECTED from what the
// repository declares (never a name written into the emitter), and that the narrowing is real.
//
// Same discipline as the sibling suite: every Git command reachable from here is read-only, and
// nothing inits, commits, branches or checks out anything — in this repository or a temporary
// one. The detection CHAIN is exercised through an injected reader, so it needs no repository at
// all; the artifact is then measured against the real repositories, read-only.
import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildGitHistory, detectDefaultBranch, resolveGitBin } from "../tools/projector/project.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const CANTU = resolve(REPO_ROOT, "..", "cantu-studio");
const FIXED_NOW = "2026-07-27T00:00:00.000Z";

// A stub Git reader: answers the four read-only questions the chain can ask, from a plain
// object. Anything not answered throws, exactly as Git does for a ref that does not exist.
function reader(answers) {
  return (bin, root, args) => {
    const key = args.join(" ");
    if (!(key in answers)) throw new Error(`no answer for: ${key}`);
    return answers[key];
  };
}

// ---------------------------------------------------------------------------
// The chain, without a repository
// ---------------------------------------------------------------------------

test("the default branch is what the REMOTE declares as its HEAD", () => {
  const read = reader({
    "remote": "origin\n",
    "symbolic-ref --short refs/remotes/origin/HEAD": "origin/main\n",
    "branch --show-current": "feature/whatever\n"
  });
  // The checkout is parked on a feature branch; the answer is still the declared trunk.
  assert.equal(detectDefaultBranch(null, "/x", ["main", "feature/whatever", "old"], read), "main");
});

test("no branch name is written into the emitter: a repo whose trunk is called something else works", () => {
  const read = reader({
    "remote": "upstream\n",
    "symbolic-ref --short refs/remotes/upstream/HEAD": "upstream/trunk\n",
    "branch --show-current": "wip\n"
  });
  assert.equal(detectDefaultBranch(null, "/x", ["trunk", "wip"], read), "trunk");
  // Same shape, a different word: nothing here prefers `main`.
  const other = reader({
    "remote": "origin\n",
    "symbolic-ref --short refs/remotes/origin/HEAD": "origin/master\n",
    "branch --show-current": "wip\n"
  });
  assert.equal(detectDefaultBranch(null, "/x", ["master", "main", "wip"], other), "master");
});

test("remotes are asked IN ORDER, and one with no recorded HEAD is skipped, not fatal", () => {
  const read = reader({
    "remote": "fork\norigin\n",
    // `fork` has no HEAD recorded locally -> the stub throws, like Git.
    "symbolic-ref --short refs/remotes/origin/HEAD": "origin/main\n",
    "branch --show-current": "wip\n"
  });
  assert.equal(detectDefaultBranch(null, "/x", ["main", "wip"], read), "main");
});

test("a declared default that is NOT a local branch is not used: it cannot be logged from local refs", () => {
  const read = reader({
    "remote": "origin\n",
    "symbolic-ref --short refs/remotes/origin/HEAD": "origin/main\n",
    "branch --show-current": "wip\n"
  });
  // `main` was never checked out here. Falling through to the checked-out branch is honest;
  // reading the remote-tracking ref instead would put "what this machine fetched" back in.
  assert.equal(detectDefaultBranch(null, "/x", ["wip", "old"], read), "wip");
});

test("with no remote at all, the branch this checkout is on decides", () => {
  const read = reader({ "remote": "", "branch --show-current": "main\n" });
  assert.equal(detectDefaultBranch(null, "/x", ["main", "other"], read), "main");
});

test("a detached HEAD with one local branch resolves to it; with several, to nothing", () => {
  const one = reader({ "remote": "", "branch --show-current": "" });
  assert.equal(detectDefaultBranch(null, "/x", ["solo"], one), "solo");
  const many = reader({ "remote": "", "branch --show-current": "" });
  assert.equal(detectDefaultBranch(null, "/x", ["a", "b"], many), null);
});

test("the operator's global init.defaultBranch is never consulted", () => {
  // It is a preference for NEW repositories, not a statement by this one — and on the machine
  // this was written on it says `master`, which exists in neither real repo. Reading it would
  // swap one machine dependency for another. The stub refuses to answer it: if the chain asked,
  // this would throw rather than quietly return something.
  const read = reader({ "remote": "", "branch --show-current": "main\n" });
  assert.equal(detectDefaultBranch(null, "/x", ["main"], read), "main");
  assert.throws(() => read(null, "/x", ["config", "--get", "init.defaultBranch"]));
});

// ---------------------------------------------------------------------------
// The artifact, against the real repositories (read-only)
// ---------------------------------------------------------------------------

const GIT = resolveGitBin();
const gitRead = (root, args) => execFileSync(GIT, ["-C", root, ...args], { encoding: "utf8" });
// THIS repository only. These four tests need a real Git work tree, and they are self-verifying:
// each compares what the emitter produced against what Git itself reports for the same repo at
// the same moment, so no expected value can go stale. Running them over the sibling as well added
// no property — the loop already proves the rule on a real repo — and only made this suite depend
// on a neighbour's checkout being present and readable. What the sibling contributes is covered,
// once, by tests/real-projects-smoke.test.mjs.
const REAL_ROOTS = [REPO_ROOT].filter((root) => existsSync(join(root, ".git")));
const skipLive = GIT && REAL_ROOTS.length ? false : "no readable Git repository here";

test("the emitted history covers exactly ONE branch, and it is the one the repo declares", { skip: skipLive }, () => {
  for (const root of REAL_ROOTS) {
    const history = buildGitHistory(root, { now: FIXED_NOW });
    assert.ok(history, `no history emitted for ${root}`);

    // Independently of the emitter: ask Git what the remote declares.
    const declared = gitRead(root, ["symbolic-ref", "--short", "refs/remotes/origin/HEAD"]).trim().replace(/^origin\//, "");
    assert.equal(history.default_branch, declared, `${root}: emitted branch is not the declared default`);
    assert.equal(history.branch_scope, "default_branch");
    assert.deepEqual(history.branches, [declared]);

    // NOT vacuous: the repository has more local branches than the artifact carries.
    const local = gitRead(root, ["for-each-ref", "--format=%(refname:short)", "refs/heads"])
      .split(/\r?\n/).map((name) => name.trim()).filter(Boolean);
    assert.ok(local.length >= 1);
    if (local.length > 1) {
      assert.ok(history.branches.length < local.length, `${root}: nothing was narrowed`);
    }

    // Every commit belongs to the one emitted branch, and they are the REAL commits of it.
    assert.ok(history.commits.length > 0);
    assert.equal(history.commit_total, history.commits.length);
    for (const commit of history.commits) assert.equal(commit.branch, declared);
    const realCount = Number(gitRead(root, ["rev-list", "--count", declared]).trim());
    assert.equal(history.commit_total, realCount, `${root}: commit count is not the branch's real count`);
    const realHead = gitRead(root, ["rev-parse", declared]).trim();
    assert.equal(history.head, realHead, `${root}: head is not the tip of the emitted branch`);
  }
});

test("`current_branch` is gone: the artifact no longer names the checkout that produced it", { skip: skipLive }, () => {
  for (const root of REAL_ROOTS) {
    const history = buildGitHistory(root, { now: FIXED_NOW });
    assert.ok(!("current_branch" in history), `${root} still carries current_branch`);
    // What replaced it is a property of the REPOSITORY, and the reader can still open a tab:
    // the branch it would select is present in the list it is given.
    assert.ok(history.branches.includes(history.default_branch));
  }
});

test("the head no longer depends on which branch the checkout sits on", { skip: skipLive }, () => {
  // The measurable form of "machine-independent": `head` is the tip of the declared default,
  // and it is that whether or not HEAD happens to be there right now.
  for (const root of REAL_ROOTS) {
    const history = buildGitHistory(root, { now: FIXED_NOW });
    const checkoutHead = gitRead(root, ["rev-parse", "HEAD"]).trim();
    const defaultTip = gitRead(root, ["rev-parse", history.default_branch]).trim();
    assert.equal(history.head, defaultTip);
    if (checkoutHead !== defaultTip) {
      assert.notEqual(history.head, checkoutHead, "the artifact followed the checkout instead of the branch");
    }
  }
});

test("two reads of the same repository emit the same history (no wall-clock, no checkout state)", { skip: skipLive }, () => {
  for (const root of REAL_ROOTS) {
    const a = buildGitHistory(root, { now: FIXED_NOW });
    const b = buildGitHistory(root, { now: FIXED_NOW });
    assert.deepEqual(a, b);
  }
});
