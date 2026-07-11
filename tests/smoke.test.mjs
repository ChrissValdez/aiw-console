// Smoke test for the forked console: a pure util imports from the real console code and behaves.
// isHiddenHistoryBranch is the git-history builder's branch filter — backup/* branches are hidden
// from the rendered commit history. This satisfies the AIW target checklist (a repo with 1 commit
// plus a real passing test) without pulling in the server or the JAME-specific validator.
import test from 'node:test';
import assert from 'node:assert/strict';
import { isHiddenHistoryBranch } from '../tools/project-console/build-git-history-snapshot.mjs';

test('isHiddenHistoryBranch hides backup/* branches', () => {
  assert.equal(isHiddenHistoryBranch('backup/jame-before-squash'), true);
  assert.equal(isHiddenHistoryBranch('backup/x'), true);
});

test('isHiddenHistoryBranch keeps normal branches visible', () => {
  assert.equal(isHiddenHistoryBranch('main'), false);
  assert.equal(isHiddenHistoryBranch('aiw/console-projector'), false);
  assert.equal(isHiddenHistoryBranch(''), false);
});
