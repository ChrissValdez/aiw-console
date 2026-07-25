// O4.P5 — the Docs index is TRANSPORTED when the project curated one, and SCANNED when it did not.
//
// What these tests defend, in one line each:
//   - the decision is made by the PRESENCE of an index at the layout's path, never by a name;
//   - a curated index travels with its SELECTION and its ORDER intact;
//   - each entry travels VERBATIM, and only the reader-facing fields it lacks are filled in;
//   - the curation's grouping wins; the folder-derived bucket is only the backup;
//   - curated freshness travels as-is, and the disk mtime is still recorded in `sources`;
//   - a curated path that does not resolve is OMITTED and DECLARED — never invented;
//   - a root with no curated index still gets the scan, unchanged.
//
// Every test here runs on a synthetic temp root. The two real projects are asserted in
// projector-cantu.test.mjs, which reads them and never writes to them.
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";
import {
  PROJECT_DOCS_INDEX_RELATIVE_PATH,
  ROOT_LAYOUTS,
  buildDocsIndex,
  detectRootLayout,
  writeProjectFolder
} from "../tools/projector/project.mjs";

const FIXED_NOW = "2026-07-25T00:00:00.000Z";

const TREE = {
  schema_version: "some.vendor.roadmap.v0.2",
  roadmap_id: "roadmap",
  title: "Docs Transport Roadmap",
  objectives: [
    {
      objective_id: "OA",
      title: "Objective A",
      phases: [
        {
          phase_id: "OA.P1",
          title: "Phase",
          runs: [{ run_id: "RUN-ONE-001", queue_order: 1, title: "One", summary: "s", full_description: "d", status: "planned", depends_on: [] }]
        }
      ]
    }
  ]
};

function writeFile(root, relativePath, body) {
  const abs = join(root, relativePath);
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, body, "utf8");
  return abs;
}

// A root in the given layout, with a documentation corpus and (optionally) a curated index at
// exactly the path that layout declares. `layoutName` selects which of the real layouts is
// exercised, so nothing here depends on one particular directory convention.
function makeRoot({ layoutName = "project_local_aiw", curated = null, corpus = true } = {}) {
  const layout = ROOT_LAYOUTS.find((entry) => entry.layout === layoutName);
  const root = mkdtempSync(join(tmpdir(), `projector-docs-${layoutName}-`));
  writeFile(root, layout.roadmap, JSON.stringify(TREE, null, 2));
  if (corpus) {
    writeFile(root, "README.md", "# The Readme\n");
    writeFile(root, join("docs", "GUIDE.md"), "# The Guide\n");
    writeFile(root, join("docs", "deep", "NOTE.md"), "# The Note\n");
    writeFile(root, join("notes", "SCRATCH.md"), "# Scratch\n");
  }
  if (curated) writeFile(root, layout.docs_index, JSON.stringify(curated, null, 2));
  return { root, layout };
}

// ---------------------------------------------------------------------------
// The decision: PRESENCE at the layout path, and nothing else.
// ---------------------------------------------------------------------------

test("every layout declares WHERE a curated docs index lives, and none of those paths names a project", () => {
  for (const layout of ROOT_LAYOUTS) {
    assert.equal(typeof layout.docs_index, "string");
    assert.ok(layout.docs_index.length > 0, `${layout.layout} declares no docs_index path`);
    assert.doesNotMatch(layout.docs_index, /(jame|cantu|aiw-console|aiw_console|hilo|lessons)/i);
    assert.doesNotMatch(layout.docs_index, /^[A-Za-z]:|^\//, "docs_index path is absolute");
  }
});

test("two roots that differ ONLY by the presence of a curated index get different modes", () => {
  // Same layout, same corpus, same everything a name could be read from. The only difference is
  // the file at the layout's docs_index path — which is the entire decision.
  const withIndex = makeRoot({
    curated: { docs: [{ title: "Only The Guide", path: "docs/GUIDE.md", ia_bucket: "handbook", nav_tier: "primary", default_visible: true }] }
  });
  const without = makeRoot();
  try {
    const transported = buildDocsIndex(withIndex.root, { now: FIXED_NOW });
    const scanned = buildDocsIndex(without.root, { now: FIXED_NOW });

    assert.equal(transported.docs_source.mode, "transported");
    assert.deepEqual(transported.docs.map((d) => d.path), ["docs/GUIDE.md"]);

    // The backup, unchanged: the whole corpus, and no `docs_source` block at all.
    assert.equal("docs_source" in scanned, false);
    assert.deepEqual(scanned.docs.map((d) => d.path), ["README.md", "docs/GUIDE.md", "docs/deep/NOTE.md", "notes/SCRATCH.md"]);

    // And the same root flips back to the scan the moment the curated index is gone: the decision
    // is re-made from disk on every run, never remembered and never keyed to the project.
    rmSync(join(withIndex.root, withIndex.layout.docs_index));
    assert.equal("docs_source" in buildDocsIndex(withIndex.root, { now: FIXED_NOW }), false);
    assert.equal(buildDocsIndex(withIndex.root, { now: FIXED_NOW }).docs.length, 4);
  } finally {
    rmSync(withIndex.root, { recursive: true, force: true });
    rmSync(without.root, { recursive: true, force: true });
  }
});

test("transport works from EITHER layout: it is the bundle's path that decides, not one convention", () => {
  for (const layoutName of ROOT_LAYOUTS.map((entry) => entry.layout)) {
    const { root } = makeRoot({
      layoutName,
      curated: { docs: [{ title: "Picked", path: "notes/SCRATCH.md", ia_bucket: "notes" }] }
    });
    try {
      const index = buildDocsIndex(root, { now: FIXED_NOW });
      assert.equal(index.docs_source.mode, "transported", `${layoutName} did not transport`);
      assert.deepEqual(index.docs.map((d) => d.path), ["notes/SCRATCH.md"]);
      assert.equal(index.docs_source.curated_index, detectRootLayout(root).paths.docs_index.split("\\").join("/"));
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  }
});

test("an index that is present but malformed transports nothing and falls back to the scan", () => {
  // Not a conforming index: no `docs` array. Same bar `buildTransportedList` applies to
  // governance. Falling back gives a real index of real files instead of an empty Docs tab.
  for (const bad of ["{ not json", JSON.stringify({ documents: [] }), JSON.stringify({ docs: "no" })]) {
    const { root, layout } = makeRoot();
    try {
      writeFile(root, layout.docs_index, bad);
      const index = buildDocsIndex(root, { now: FIXED_NOW });
      assert.equal("docs_source" in index, false, `malformed index was transported: ${bad.slice(0, 20)}`);
      assert.equal(index.docs.length, 4);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  }
});

// ---------------------------------------------------------------------------
// Decision 1 — the shape mapping: selection, order, and the fields the reader consumes.
// ---------------------------------------------------------------------------

test("the curated SELECTION and ORDER are preserved exactly, including entries the scan would never emit", () => {
  const { root } = makeRoot({
    curated: {
      docs: [
        // Deliberately NOT alphabetical: the scan sorts by path, the transport must not.
        { title: "Scratch First", path: "notes/SCRATCH.md", ia_bucket: "notes" },
        { title: "Then The Guide", path: "docs/GUIDE.md", ia_bucket: "handbook" },
        // Not Markdown, and outside the scan's corpus entirely: the curation chose it, so it travels.
        { title: "A Data File", path: "data/thing.json", ia_bucket: "data" }
      ]
    }
  });
  writeFile(root, join("data", "thing.json"), "{}\n");
  try {
    const index = buildDocsIndex(root, { now: FIXED_NOW });
    assert.deepEqual(index.docs.map((d) => d.path), ["notes/SCRATCH.md", "docs/GUIDE.md", "data/thing.json"]);
    assert.deepEqual(index.docs.map((d) => d.title), ["Scratch First", "Then The Guide", "A Data File"]);
    // README.md and docs/deep/NOTE.md exist on disk and the scan would list them. The curation
    // did not select them, so they are not here: the selection is the project's, not the emitter's.
    assert.equal(index.docs.some((d) => d.path === "README.md"), false);
    assert.equal(index.docs_source.curated_entries, 3);
    assert.equal(index.docs_source.transported, 3);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("every curated field travels verbatim — including the ones this emitter could never derive", () => {
  const entry = {
    title: "Kept",
    path: "docs/GUIDE.md",
    nav_tier: "advanced",
    default_visible: true, // deliberately contradicts `nav_tier === "primary"`: the curation wins
    ia_bucket: "handbook",
    freshness: "reviewed_2026-05-01",
    freshness_status: "CURRENT_WITH_NOTES",
    audience: "operator,auditor",
    canonicality: "canonical_source",
    operator_review_status: "approved",
    related_run_id: "RUN-SOMETHING-001",
    notes: "A note the emitter has no way to invent."
  };
  const { root } = makeRoot({ curated: { docs: [entry] } });
  try {
    const [doc] = buildDocsIndex(root, { now: FIXED_NOW }).docs;
    for (const [key, value] of Object.entries(entry)) {
      assert.deepEqual(doc[key], value, `curated field "${key}" did not travel verbatim`);
    }
    // Nothing was added to an entry that already carried everything the reader reads.
    assert.deepEqual(Object.keys(doc).sort(), Object.keys(entry).sort());
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("only the MISSING reader-facing fields are filled, each by the rule the emitted file declares", () => {
  const { root } = makeRoot({
    curated: {
      docs: [
        { path: "README.md" }, // nothing but a path
        { path: "docs/deep/NOTE.md", title: "" }, // an empty title is still a missing title
        { path: "notes/SCRATCH.md", nav_tier: "not-a-tier", default_visible: "yes" } // unusable values
      ]
    }
  });
  try {
    const index = buildDocsIndex(root, { now: FIXED_NOW });
    const [readme, note, scratch] = index.docs;

    // title <- the document's own first H1, else its filename (the scan's rule).
    assert.equal(readme.title, "The Readme");
    assert.equal(note.title, "The Note");
    // nav_tier <- derived from the repo path prefix; default_visible <- nav_tier === "primary".
    assert.equal(readme.nav_tier, "primary");
    assert.equal(readme.default_visible, true);
    assert.equal(note.nav_tier, "secondary");
    assert.equal(note.default_visible, false);
    // A value that is not a tier at all is not a curation to preserve — it is derived.
    assert.equal(scratch.nav_tier, "secondary");
    assert.equal(scratch.default_visible, false);
    // ia_bucket <- the document's directory, "root" at the top (the scan's rule).
    assert.equal(readme.ia_bucket, "root");
    assert.equal(note.ia_bucket, "docs/deep");
    // freshness <- the file's own mtime, which is a measurement, not an invention.
    assert.equal(readme.freshness, statSync(join(root, "README.md")).mtime.toISOString());

    assert.equal(index.docs_source.field_rules.freshness, "curated `freshness`, verbatim; else the document's mtime on disk");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

// ---------------------------------------------------------------------------
// Decision 2 — grouping: the curation's, with the folder as the backup.
// ---------------------------------------------------------------------------

test("the curation's grouping wins over the folder, and the folder fills in only when the entry offers none", () => {
  const { root } = makeRoot({
    curated: {
      docs: [
        // Its folder says "docs"; the curation says "handbook". The curation wins.
        { path: "docs/GUIDE.md", ia_bucket: "handbook" },
        // No ia_bucket, but the reader's own fallback chain has something to read. Not overwritten,
        // because a folder name would preempt a real curated grouping.
        { path: "docs/deep/NOTE.md", related_area: "onboarding" },
        { path: "notes/SCRATCH.md", source_role: "scratch_notes" },
        // Nothing to group by at all: only here does the folder speak.
        { path: "README.md" }
      ]
    }
  });
  try {
    const [guide, note, scratch, readme] = buildDocsIndex(root, { now: FIXED_NOW }).docs;
    assert.equal(guide.ia_bucket, "handbook");
    assert.equal("ia_bucket" in note, false);
    assert.equal(note.related_area, "onboarding");
    assert.equal("ia_bucket" in scratch, false);
    assert.equal(readme.ia_bucket, "root");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

// ---------------------------------------------------------------------------
// Decision 3 — freshness: the curation's value, whatever kind of value it is.
// ---------------------------------------------------------------------------

test("curated freshness travels untouched, and the disk mtime is still recorded for every document", () => {
  const { root, layout } = makeRoot({
    curated: {
      docs: [
        { path: "docs/GUIDE.md", freshness: "active_handbook_source" }, // not a date at all
        { path: "README.md", freshness: "reviewed_2026-05-01" }
      ]
    }
  });
  try {
    const index = buildDocsIndex(root, { now: FIXED_NOW });
    assert.equal(index.docs[0].freshness, "active_handbook_source");
    assert.equal(index.docs[1].freshness, "reviewed_2026-05-01");

    // The mtime is NOT lost by keeping the curated value: `sources` carries it for the curated
    // index and for every transported document, which is what makes staleness detectable (§6).
    const sources = index.sources.map((s) => s.path);
    assert.equal(sources[0], layout.docs_index.split("\\").join("/"));
    assert.deepEqual(sources.slice(1), ["docs/GUIDE.md", "README.md"]);
    for (const source of index.sources) {
      assert.match(source.mtime, /^\d{4}-\d{2}-\d{2}T/);
      assert.ok(existsSync(join(root, source.path)));
    }
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

// ---------------------------------------------------------------------------
// Decision 4 — a curated path that does not resolve.
// ---------------------------------------------------------------------------

test("a curated path that does not resolve is omitted from docs[] and declared in docs_source", () => {
  const { root } = makeRoot({
    curated: {
      docs: [
        { title: "Real", path: "docs/GUIDE.md" },
        { title: "Deleted Last Week", path: "docs/GONE.md" },
        { title: "Escapes The Root", path: "../outside/SECRET.md" },
        { title: "No Path At All" },
        { title: "Also Real", path: "README.md" }
      ]
    }
  });
  try {
    const index = buildDocsIndex(root, { now: FIXED_NOW });

    // Only the entries that resolve are published: a pointer that does not resolve is never
    // emitted, and no file is invented to make one resolve.
    assert.deepEqual(index.docs.map((d) => d.path), ["docs/GUIDE.md", "README.md"]);
    assert.equal(existsSync(join(root, "docs", "GONE.md")), false, "the emitter created the missing file");

    // And the omission is ANNOUNCED, with the count and the reason — never a silent shortfall.
    assert.equal(index.docs_source.curated_entries, 5);
    assert.equal(index.docs_source.transported, 2);
    assert.deepEqual(index.docs_source.unresolved, [
      { path: "docs/GONE.md", reason: "no such file" },
      { path: "../outside/SECRET.md", reason: "outside the project root" },
      { path: null, reason: "no path" }
    ]);
    // `sources` never cites the unresolved path either (§7).
    assert.equal(index.sources.some((s) => s.path.includes("GONE")), false);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

// ---------------------------------------------------------------------------
// The emitted file, on disk.
// ---------------------------------------------------------------------------

test("the transported index is written atomically into .project/ and is repeatable with a fixed clock", () => {
  const { root, layout } = makeRoot({
    curated: {
      nav_tier_model: { declared_by: "the project", note: "a model of the curation's own shape" },
      docs: [{ title: "Kept", path: "docs/GUIDE.md", ia_bucket: "handbook" }]
    }
  });
  try {
    const before = readFileSync(join(root, layout.docs_index), "utf8");

    const first = writeProjectFolder(root, { now: FIXED_NOW });
    const firstText = readFileSync(join(root, PROJECT_DOCS_INDEX_RELATIVE_PATH), "utf8");
    const second = writeProjectFolder(root, { now: FIXED_NOW });
    const secondText = readFileSync(join(root, PROJECT_DOCS_INDEX_RELATIVE_PATH), "utf8");

    assert.equal(secondText, firstText);
    assert.equal(existsSync(join(root, `${PROJECT_DOCS_INDEX_RELATIVE_PATH}.tmp`)), false);
    assert.equal(first.files.find((f) => f.artifact === "docs_index").entries, 1);
    assert.equal(second.files.find((f) => f.artifact === "docs_index").entries, 1);

    // The curated index was READ, not rewritten: this emitter writes into .project/ and nowhere else.
    assert.equal(readFileSync(join(root, layout.docs_index), "utf8"), before);

    // The curation's own model declaration travels; this emitter's path rules are not substituted
    // for a selection it did not make.
    const parsed = JSON.parse(firstText);
    assert.deepEqual(parsed.nav_tier_model, { declared_by: "the project", note: "a model of the curation's own shape" });
    assert.equal(parsed.docs_source.mode, "transported");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
