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

export const KNOWN_OPS = ["insert", "move", "remove", "swap", "set-text", "set-deps", "set-status", "clear-progress", "move-objective", "set-objective-archived", "create-phase", "delete-phase", "create-objective", "delete-objective", "batch"];

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

// Dispatch one operation to its core mutation. args mirror the core option names exactly;
// this is a straight relay. [O4.P12] externalRunIds threads through to the one mutation
// that resolves dependency ids (set-deps) and to batch sub-dispatch.
function dispatch(op, obj, args, externalRunIds = null) {
  switch (op) {
    case "insert":
      return core.insertRun(obj, {
        runId: args.runId,
        title: args.title,
        summary: args.summary,
        fullDescription: args.fullDescription,
        status: args.status != null ? args.status : "planned",
        dependsOn: Array.isArray(args.dependsOn) ? args.dependsOn : [],
        after: args.after,
        before: args.before,
        endOfPhase: args.endOfPhase,
      });
    case "move":
      return core.moveRun(obj, {
        run: args.run,
        after: args.after,
        before: args.before,
        toOrder: args.toOrder,
        toPhase: args.toPhase,
      });
    case "remove":
      return core.removeRun(obj, {
        run: args.run,
        reassignDependentsTo: args.reassignDependentsTo,
        dropDependentEdges: Boolean(args.dropDependentEdges),
      });
    case "swap":
      return core.swapRuns(obj, { run: args.run, withRun: args.withRun });
    case "set-text":
      return core.setText(obj, {
        targetType: args.targetType,
        targetId: args.targetId,
        title: args.title,
        summary: args.summary,
        fullDescription: args.fullDescription,
      });
    case "set-deps":
      return core.setDeps(obj, {
        run: args.run,
        dependsOn: args.dependsOn != null ? args.dependsOn : null,
        addDep: args.addDep,
        removeDep: args.removeDep,
        externalRunIds,
      });
    case "set-status":
      return core.setStatus(obj, {
        run: args.run,
        status: args.status,
        closeoutResult: args.closeoutResult,
      });
    case "clear-progress":
      // --run is the WHOLE input. There is nothing to select or shape: the op removes the
      // progress key entirely, and it deliberately accepts no status argument -- closing the
      // run stays a separate set-status call.
      return core.clearProgress(obj, { run: args.run });
    case "move-objective":
      return core.moveObjective(obj, {
        objectiveId: args.objectiveId,
        toIndex: args.toIndex,
      });
    case "set-objective-archived":
      return core.setObjectiveArchived(obj, {
        objectiveId: args.objectiveId,
        archived: args.archived,
      });
    case "create-phase":
      return core.createPhase(obj, {
        objectiveId: args.objectiveId,
        phaseId: args.phaseId,
        title: args.title,
      });
    case "delete-phase":
      // phaseId ALONE: phase ids are globally unique, so core.deletePhase finds the
      // containing objective itself. No objectiveId is relayed because none is asked for.
      return core.deletePhase(obj, { phaseId: args.phaseId });
    case "create-objective":
      return core.createObjective(obj, {
        objectiveId: args.objectiveId,
        title: args.title,
      });
    case "delete-objective":
      // objectiveId ALONE: objectives live at the root, so there is no parent
      // container to relay. No cascade: core.deleteObjective refuses an objective
      // that still holds phases, and refuses the last one outright.
      return core.deleteObjective(obj, { objectiveId: args.objectiveId });
    case "batch": {
      // Ordered list of NON-IDENTITY sub-ops applied against the SAME obj. Aborts on the
      // first sub-op that errors (nothing is written -- planEdit returns before serialize).
      // Refuses nested batch, empty/non-array ops, and identity-changing ops because a batch
      // discards its sub-results and so surfaces no sanctioned id of its own, and because
      // checkIdentityPreserved sanctions at most a single added/removed id per kind.
      const ops = args.ops;
      if (!Array.isArray(ops)) {
        return { errors: ["batch requires args.ops to be an array"], warnings: [] };
      }
      if (ops.length === 0) {
        return { errors: ["batch requires a non-empty ops array"], warnings: [] };
      }
      const identityOps = ["insert", "remove", "create-phase", "delete-phase", "create-objective", "delete-objective"];
      // clear-progress joins the batchable set for the same reason set-status is in it: it
      // surrenders no *_id, so it needs no sanction from checkIdentityPreserved. Here the
      // pairing is also the ONLY way the closeout reaches disk -- clear-progress alone leaves
      // an active run with no progress, which the validator fails, so a lone apply would be
      // written and rolled back. batch [clear-progress, set-status] keeps both ops explicit
      // and named while persisting no invalid intermediate state.
      const batchable = ["set-text", "set-deps", "set-status", "clear-progress", "move", "move-objective", "set-objective-archived"];
      const warnings = [];
      for (let i = 0; i < ops.length; i++) {
        const sub = ops[i] || {};
        const subOp = sub.op;
        if (subOp === "batch") {
          return { errors: [`batch op ${i} (batch): nested batch is not allowed`], warnings };
        }
        if (identityOps.includes(subOp)) {
          return { errors: [`batch op ${i} (${subOp}): ${subOp} changes identity and is not batchable; apply it on its own`], warnings };
        }
        if (!batchable.includes(subOp)) {
          return { errors: [`batch op ${i} (${String(subOp)}): not a batchable op; allowed: ${batchable.join(", ")}`], warnings };
        }
        const r = dispatch(subOp, obj, sub.args || {}, externalRunIds);
        if (r.warnings && r.warnings.length) warnings.push(...r.warnings);
        if (r.errors && r.errors.length) {
          return { errors: [`batch op ${i} (${subOp}) failed:`, ...r.errors], warnings };
        }
      }
      return { errors: [], warnings };
    }
    default:
      return { errors: [`unknown op "${op}"; expected one of ${KNOWN_OPS.join(", ")}`], warnings: [] };
  }
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
