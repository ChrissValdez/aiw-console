// roadmap-plan.mjs
//
// Shared orchestration for safe roadmap-tree edits. TRANSPLANTED byte-for-byte from the
// source project's roadmap tooling (O4.P12) alongside roadmap-core.mjs; the touches on
// the copy are marked [O4.P12]. The write endpoint of the global console runs this exact
// sequence over the transplanted core primitives:
//
//   loadRaw -> parseRoadmap -> checkInvariants (pre-flight: refuse an already-red file)
//   -> capture queueOrderMap + collectIds -> dispatch to the requested core mutation
//   -> checkInvariants (post) + checkIdentityPreserved -> buildRemap -> serialize.
//
// It adds NO new rule. Every invariant, every mutation and the byte-exact serializer live
// in roadmap-core.mjs. This module is pure: no console output, no process.exit, no argv
// parsing, no Git. The only I/O is reading the file it is handed (via core.loadRaw) and,
// in applyPlan, delegating the atomic write to core.applyWrite.
//
// baseline: a content hash of the file exactly as read at plan time. The endpoint uses it
// for optimistic concurrency (compare-and-swap) so an apply never overwrites a file that
// changed underneath it (CLI, editor, git) since the dry-run was computed.
//
// [O4.P12] planEdit gained two pass-throughs, no new rules: the file's detected line
// ending feeds core.serialize (byte-exactness is relative to the file being edited), and
// the caller-supplied externalRunIds set feeds the §10.d external-dependency resolution
// in checkInvariants / set-deps. Both are data handed in; nothing here names a project.

import { createHash } from "node:crypto";
import * as core from "./roadmap-core.mjs";

// [#47] THE OP TABLE — one row per op, and the row is the whole registration.
//
// WHAT IT REPLACES. Registering an op used to mean naming it in THREE places in this file:
// the `KNOWN_OPS` literal, a `case` in the dispatcher, and the `batchable` literal buried in
// the batch body. Nothing about those three was op-specific -- it is dispatch plumbing, and
// the record ALTA-DEPENDS-ON-HUMAN-APPROVED §C.4 measured it as such. A new op now costs ONE
// ROW, and the three enumerations are DERIVED from it below, so they cannot drift apart.
//
// The row:
//   `name`       the op name as the wire carries it.
//   `apply`      (obj, args, externalRunIds) -> the core mutation. A straight relay: `args`
//                mirror the core option names exactly. This module adds NO rule.
//   `batchable`  may appear inside a `batch`. See the note below.
//   `identity`   surrenders an added/removed *_id, so `checkIdentityPreserved` must sanction
//                it and a batch may never contain it.
//
// ORDER IS LOAD-BEARING: `KNOWN_OPS` is this table's order, and it is the published order of
// registration (tests/roadmap-engine.test.mjs pins it verbatim, with the reason each op was
// added recorded beside it). A new op is appended where its story says it belongs, never
// sorted.
//
// WHY `batchable` IS A COLUMN AND NOT A LIST. A batch discards its sub-results, so it
// surfaces no sanctioned id of its own and `checkIdentityPreserved` sanctions at most one
// added/removed id per kind -- which is exactly why `identity` and `batchable` are mutually
// exclusive here and why the two derived lists come from the same rows. The per-op reasons,
// preserved verbatim from where they were written:
//
//   - clear-progress is batchable for the same reason set-status is: it surrenders no *_id.
//     Here the pairing is also the ONLY way a closeout reaches disk -- clear-progress alone
//     leaves an active run with no progress, which the validator fails, so a lone apply would
//     be written and rolled back. batch [clear-progress, set-status] keeps both ops explicit
//     and named while persisting no invalid intermediate state.
//   - set-lane / set-barrier / set-classification are batchable because each is optional keys
//     on ONE run. It makes "this run is on lane X, is a barrier, is FUNCTIONAL / SYSTEMIC and
//     moves to position 7" a SINGLE preview and a single write, which is how the operator
//     means it.
//   - declare-lanes is deliberately NOT batchable: it is a root-level vocabulary change, not
//     a per-run edit, and pairing it with the set-lane calls that depend on it would hide
//     which half of the pair a refusal came from. [#43] declare-care-budget is NOT batchable
//     for exactly that reason, inherited: it is the second root-level configuration op, and a
//     per-project advisory written in the same breath as a run edit would hide which of the
//     two a refusal belongs to.
const OP_DESCRIPTORS = [
  {
    name: "insert",
    identity: true,
    apply: (obj, args) => core.insertRun(obj, {
      runId: args.runId,
      title: args.title,
      summary: args.summary,
      fullDescription: args.fullDescription,
      status: args.status != null ? args.status : "planned",
      dependsOn: Array.isArray(args.dependsOn) ? args.dependsOn : [],
      after: args.after,
      before: args.before,
      endOfPhase: args.endOfPhase,
    }),
  },
  {
    name: "move",
    batchable: true,
    apply: (obj, args) => core.moveRun(obj, {
      run: args.run,
      after: args.after,
      before: args.before,
      toOrder: args.toOrder,
      toPhase: args.toPhase,
    }),
  },
  {
    name: "remove",
    identity: true,
    apply: (obj, args) => core.removeRun(obj, {
      run: args.run,
      reassignDependentsTo: args.reassignDependentsTo,
      dropDependentEdges: Boolean(args.dropDependentEdges),
    }),
  },
  {
    name: "swap",
    apply: (obj, args) => core.swapRuns(obj, { run: args.run, withRun: args.withRun }),
  },
  {
    name: "set-text",
    batchable: true,
    apply: (obj, args) => core.setText(obj, {
      targetType: args.targetType,
      targetId: args.targetId,
      title: args.title,
      summary: args.summary,
      fullDescription: args.fullDescription,
    }),
  },
  {
    name: "set-deps",
    batchable: true,
    // [O4.P12] externalRunIds threads through to the mutations that resolve dependency ids.
    apply: (obj, args, externalRunIds) => core.setDeps(obj, {
      run: args.run,
      dependsOn: args.dependsOn != null ? args.dependsOn : null,
      addDep: args.addDep,
      removeDep: args.removeDep,
      externalRunIds,
    }),
  },
  {
    name: "set-human-deps",
    batchable: true,
    // [#45] The SECOND dependency list — the edges that wait for a PERSON to review the
    // target, not merely for the target's work to exist. Replaced whole; an empty list
    // clears the key. `externalRunIds` threads through for the same §10.d reason set-deps
    // gets it: a target declared by another registered project exists, just not here.
    apply: (obj, args, externalRunIds) => core.setHumanApprovedDeps(obj, {
      run: args.run,
      dependsOnHumanApproved: args.dependsOnHumanApproved != null ? args.dependsOnHumanApproved : null,
      addDep: args.addDep,
      removeDep: args.removeDep,
      externalRunIds,
    }),
  },
  {
    name: "set-status",
    batchable: true,
    apply: (obj, args) => core.setStatus(obj, {
      run: args.run,
      status: args.status,
      closeoutResult: args.closeoutResult,
    }),
  },
  {
    name: "set-lane",
    batchable: true,
    // [D-051] lane is a declared lane_id to assign, or null/"" to clear back to the
    // project default. The core refuses an undeclared key, naming the vocabulary.
    apply: (obj, args) => core.setLane(obj, { run: args.run, lane: args.lane != null ? args.lane : null }),
  },
  {
    name: "set-barrier",
    batchable: true,
    // [D-051] barrier is "lane" | "global" to mark, or null/"" to clear the key. The
    // core refuses an unknown scope, and refuses a lane barrier where no lane exists.
    apply: (obj, args) => core.setBarrier(obj, { run: args.run, barrier: args.barrier != null ? args.barrier : null }),
  },
  {
    name: "set-classification",
    batchable: true,
    // [#43] The six STORED classification fields of context/CLASIFICACION-DE-RUNS.md §1 on
    // one run. A field the caller omits is left alone; null/"" clears that key. The core
    // refuses a token outside its closed vocabulary, naming it.
    //
    // `classified_at` is deliberately NOT relayed: the core writes the mark itself, so the
    // console cannot type an instant and no request body can carry one.
    apply: (obj, args) => core.setClassification(obj, {
      run: args.run,
      correctnessModel: args.correctnessModel,
      workType: args.workType,
      blastRadius: args.blastRadius,
      failureSurfaces: args.failureSurfaces,
      externalEffects: args.externalEffects,
    }),
  },
  {
    name: "declare-lanes",
    // [D-051] The root lane vocabulary, replaced WHOLE (or cleared with null / []).
    // The core refuses a malformed entry, a missing/ambiguous default, and any
    // declaration that would orphan a lane runs still carry.
    apply: (obj, args) => core.declareLanes(obj, { lanes: args.lanes != null ? args.lanes : null }),
  },
  {
    name: "declare-care-budget",
    // [#43] The root care budget of context/CLASIFICACION-DE-RUNS.md §5, replaced WHOLE (or
    // cleared with null / {}). PER-PROJECT CONFIGURATION, not a run field: it takes no --run
    // and there is no run it could take. The core refuses a malformed table, naming the level
    // and the key; it refuses NOTHING about the values, because §5 lets a project fix its own.
    apply: (obj, args) => core.setCareBudget(obj, { careBudget: args.careBudget != null ? args.careBudget : null }),
  },
  {
    name: "clear-progress",
    batchable: true,
    // --run is the WHOLE input. There is nothing to select or shape: the op removes the
    // progress key entirely, and it deliberately accepts no status argument -- closing the
    // run stays a separate set-status call.
    apply: (obj, args) => core.clearProgress(obj, { run: args.run }),
  },
  {
    name: "move-objective",
    batchable: true,
    apply: (obj, args) => core.moveObjective(obj, {
      objectiveId: args.objectiveId,
      toIndex: args.toIndex,
    }),
  },
  {
    name: "set-objective-archived",
    batchable: true,
    apply: (obj, args) => core.setObjectiveArchived(obj, {
      objectiveId: args.objectiveId,
      archived: args.archived,
    }),
  },
  {
    name: "create-phase",
    identity: true,
    apply: (obj, args) => core.createPhase(obj, {
      objectiveId: args.objectiveId,
      phaseId: args.phaseId,
      title: args.title,
    }),
  },
  {
    name: "delete-phase",
    identity: true,
    // phaseId ALONE: phase ids are globally unique, so core.deletePhase finds the
    // containing objective itself. No objectiveId is relayed because none is asked for.
    apply: (obj, args) => core.deletePhase(obj, { phaseId: args.phaseId }),
  },
  {
    name: "create-objective",
    identity: true,
    apply: (obj, args) => core.createObjective(obj, {
      objectiveId: args.objectiveId,
      title: args.title,
    }),
  },
  {
    name: "delete-objective",
    identity: true,
    // objectiveId ALONE: objectives live at the root, so there is no parent
    // container to relay. No cascade: core.deleteObjective refuses an objective
    // that still holds phases, and refuses the last one outright.
    apply: (obj, args) => core.deleteObjective(obj, { objectiveId: args.objectiveId }),
  },
  {
    name: "batch",
    // Neither batchable (no nesting) nor identity-changing (it refuses every op that is).
    apply: (obj, args, externalRunIds) => applyBatch(obj, args, externalRunIds),
  },
];

// The three enumerations, DERIVED from the one table so they cannot disagree with it.
export const KNOWN_OPS = OP_DESCRIPTORS.map((d) => d.name);
const OP_BY_NAME = new Map(OP_DESCRIPTORS.map((d) => [d.name, d]));
const BATCHABLE_OPS = OP_DESCRIPTORS.filter((d) => d.batchable).map((d) => d.name);
const IDENTITY_OPS = OP_DESCRIPTORS.filter((d) => d.identity).map((d) => d.name);

// Content baseline for compare-and-swap. Hash of the exact bytes read (utf8), so any change
// -- including a single CRLF or em-dash byte -- produces a different token.
export function computeBaseline(raw) {
  return "sha256:" + createHash("sha256").update(Buffer.from(raw, "utf8")).digest("hex");
}

// Read the current file and its baseline without planning or mutating anything.
export function loadCurrent(filePath) {
  const raw = core.loadRaw(filePath);
  return { raw, baseline: computeBaseline(raw) };
}

// Dispatch one operation to its core mutation, through the op table above. args mirror the
// core option names exactly; this is a straight relay and adds no rule. [O4.P12]
// externalRunIds threads through to the mutations that resolve dependency ids (set-deps,
// set-human-deps) and to batch sub-dispatch.
function dispatch(op, obj, args, externalRunIds = null) {
  const descriptor = OP_BY_NAME.get(op);
  if (!descriptor) {
    return { errors: [`unknown op "${op}"; expected one of ${KNOWN_OPS.join(", ")}`], warnings: [] };
  }
  return descriptor.apply(obj, args, externalRunIds);
}

// The `batch` op's body, lifted out of the dispatcher so its table row stays a row.
//
// Ordered list of NON-IDENTITY sub-ops applied against the SAME obj. Aborts on the first
// sub-op that errors (nothing is written -- planEdit returns before serialize). Refuses
// nested batch, empty/non-array ops, and identity-changing ops because a batch discards its
// sub-results and so surfaces no sanctioned id of its own, and because checkIdentityPreserved
// sanctions at most a single added/removed id per kind.
//
// [#47] The two membership lists it consults are DERIVED from the op table: an op declares
// `batchable` / `identity` on its own row and this function only reads them, so a new op can
// never be batchable in one list and absent from the other.
function applyBatch(obj, args, externalRunIds) {
  const ops = args.ops;
  if (!Array.isArray(ops)) {
    return { errors: ["batch requires args.ops to be an array"], warnings: [] };
  }
  if (ops.length === 0) {
    return { errors: ["batch requires a non-empty ops array"], warnings: [] };
  }
  const warnings = [];
  for (let i = 0; i < ops.length; i++) {
    const sub = ops[i] || {};
    const subOp = sub.op;
    if (subOp === "batch") {
      return { errors: [`batch op ${i} (batch): nested batch is not allowed`], warnings };
    }
    if (IDENTITY_OPS.includes(subOp)) {
      return { errors: [`batch op ${i} (${subOp}): ${subOp} changes identity and is not batchable; apply it on its own`], warnings };
    }
    if (!BATCHABLE_OPS.includes(subOp)) {
      return { errors: [`batch op ${i} (${String(subOp)}): not a batchable op; allowed: ${BATCHABLE_OPS.join(", ")}`], warnings };
    }
    const r = dispatch(subOp, obj, sub.args || {}, externalRunIds);
    if (r.warnings && r.warnings.length) warnings.push(...r.warnings);
    if (r.errors && r.errors.length) {
      return { errors: [`batch op ${i} (${subOp}) failed:`, ...r.errors], warnings };
    }
  }
  return { errors: [], warnings };
}

// Plan an edit end to end WITHOUT writing. Returns a fully-worded result that both surfaces
// can print (CLI) or serialize (endpoint). `stage` records how far it got so callers can map
// a failure to a message or an HTTP status:
//   read | parse | preflight | mutate | postcheck | ok
export function planEdit({ filePath, op, args, externalRunIds = null }) {
  const out = {
    ok: false,
    stage: "read",
    errors: [],
    warnings: [],
    remap: null,
    serialized: null,
    bytes: null,
    structural: null,
    baseline: null,
    eol: null,
  };

  // Load.
  let raw;
  try {
    raw = core.loadRaw(filePath);
  } catch (e) {
    out.errors = [`cannot read roadmap file ${filePath}: ${e.message}`];
    return out;
  }
  out.baseline = computeBaseline(raw);
  // [O4.P12] Byte-exactness is relative to the file being edited: serialize with ITS endings.
  out.eol = core.detectEol(raw);

  // Parse.
  out.stage = "parse";
  let obj;
  try {
    obj = core.parseRoadmap(raw);
  } catch (e) {
    out.errors = [`roadmap file is not valid JSON (${filePath}): ${e.message}`];
    return out;
  }

  // Pre-flight: never compound an existing breakage.
  out.stage = "preflight";
  const preErrors = core.checkInvariants(obj, { externalRunIds });
  if (preErrors.length) {
    out.errors = [`target file already fails the invariants; fix it before editing (${filePath}):`, ...preErrors];
    return out;
  }

  const beforeMap = core.queueOrderMap(obj);
  const beforeIds = core.collectIds(obj);

  // Dispatch to the core mutation.
  out.stage = "mutate";
  const result = dispatch(op, obj, args || {}, externalRunIds);
  out.warnings = result.warnings || [];
  if (result.errors && result.errors.length) {
    out.errors = [...result.errors];
    return out;
  }
  out.structural = result;

  // Post-mutation guards: limited invariants + identity immutability.
  out.stage = "postcheck";
  const postErrors = core.checkInvariants(obj, { externalRunIds });
  // Sanctioned ids come from result (what the mutation DID), never from args (what the caller
  // ASKED for): sanctioning caller input would let a mutation that clobbers an id be waved
  // through by the very guard meant to catch it.
  const idErrors = core.checkIdentityPreserved(beforeIds, core.collectIds(obj), {
    addedRun: result.addedRun || null,
    removedRun: result.removedRun || null,
    addedPhase: result.addedPhase || null,
    removedPhase: result.removedPhase || null,
    addedObjective: result.addedObjective || null,
    removedObjective: result.removedObjective || null,
  });
  if (postErrors.length || idErrors.length) {
    out.errors = ["the edit would break invariants (nothing written):", ...postErrors, ...idErrors];
    return out;
  }

  // Build the remap and serialize (byte-exact, via core, with the file's own endings).
  out.remap = core.buildRemap(beforeMap, obj);
  out.serialized = core.serialize(obj, out.eol);
  out.bytes = Buffer.byteLength(out.serialized, "utf8");
  out.stage = "ok";
  out.ok = true;
  return out;
}

// Write a planned serialization atomically, delegating entirely to the frozen core
// (tmpdir backup -> temp file -> fsync -> rename, with the injected validator as the
// authority and rollback on a non-zero validator exit). `validate` is the caller's spawn
// callback (or null to skip, e.g. a non-canonical target file).
export function applyPlan({ filePath, serialized, validate = null }) {
  const res = core.applyWrite(filePath, serialized, { validate });
  return {
    written: res.written,
    rolledBack: res.rolledBack,
    backupPath: res.backupPath,
    validatorOutput: res.validator ? res.validator.output : "",
    bytes: Buffer.byteLength(serialized, "utf8"),
  };
}
