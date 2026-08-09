// A DISPOSABLE COPY of this repository, in a temp dir, for the tests that must EMIT.
//
// Why this exists. Two write-route tests used to register this repository itself (`self`) and
// then POST the emit / history-sync route at it. That is what those routes do, so the tests were
// honest — but the effect was that running the suite REWROTE the real artifacts under
// `.project/` and left the working tree dirty every time. Under parallel lanes that is not a
// nuisance, it is a hazard: the suite could not be run while another workshop had the tree open,
// and a `git status` after a test run no longer told the operator what they had changed.
//
// The copy carries every SOURCE a full emission reads, and nothing else:
//
//   roadmap/roadmap.json        the canonical -> snapshot + roadmap
//   governance/*.json           -> guardrails + no_claims (absent, they are SKIPPED)
//   README.md, docs/            a documentation corpus -> docs_index
//   package.json                identity
//   .git                        a real work tree -> git_history
//
// SEVEN ARTIFACTS FROM SIX SOURCES, and the mismatch is deliberate (O4.P17). `reports_index`
// derives from a `reports/` folder, and `reports/` is NOT copied — for the plain reason that
// this repository has none, so copying it would copy nothing. The emission writes the index
// anyway, empty and declared, because that artifact is unconditional. A project WITH reports is
// therefore not testable through this helper at all; it needs a fixture of its own, which is
// what tests/projector-reports-index.test.mjs builds.
//
// `.git` is COPIED as bytes; no Git command is run to produce it, and nothing here writes to the
// original. What the tests then assert is unchanged in kind: a real project with all its sources
// emits the full set, skips none, and leaves its canonical byte-identical.

import { cpSync, existsSync, mkdtempSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..", "..");

// Everything the emitter reads for a `repo_root` layout. `docs/` and `README.md` give the docs
// scan a corpus; `.git` makes it a work tree so git_history is derivable rather than skipped.
const COPIED = ["roadmap", "governance", "docs", "README.md", "package.json", ".git"];

// Builds the copy and returns { root, cleanup }. The caller owns the cleanup, and should call it
// from test.after so a failing assertion cannot leave a temp tree behind.
export function makeRealLikeProject(prefix = "emit-real-like-") {
  const root = mkdtempSync(join(tmpdir(), prefix));
  for (const entry of COPIED) {
    const from = join(REPO_ROOT, entry);
    if (existsSync(from)) cpSync(from, join(root, entry), { recursive: true });
  }
  return {
    root,
    cleanup: () => rmSync(root, { recursive: true, force: true })
  };
}

export { REPO_ROOT };
