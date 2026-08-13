// Minimal DOM + fetch harness that runs the REAL renderer (project-console.js) inside
// node:vm, so the switch/degradation tests exercise the actual code path — not a mirror
// of it. It stubs exactly what the renderer touches: getElementById-registered elements
// with innerHTML/classList/dataset, a fetch that serves files from registered project
// roots the same way the read-only server's /projects/<key>/ namespace does, and no-op
// event wiring. It is NOT a browser: layout, CSS and real event dispatch are out of its
// reach and stay with the operator QA pass.
//
// Known harness artifact, on purpose: elements live in a flat id registry and are never
// destroyed, while a real DOM drops nodes when a parent's innerHTML is replaced (e.g. the
// #docs-body node inside the docs reader). Tests therefore assert on the surface ids the
// renderer paints directly, and treat detached ids accordingly.

import { readFileSync } from "node:fs";
import { join, normalize, sep } from "node:path";
import vm from "node:vm";

class StubClassList {
  constructor() { this.set = new Set(); }
  add(...names) { names.forEach((name) => this.set.add(name)); }
  remove(...names) { names.forEach((name) => this.set.delete(name)); }
  toggle(name, force) {
    const on = force === undefined ? !this.set.has(name) : !!force;
    if (on) this.set.add(name); else this.set.delete(name);
    return on;
  }
  contains(name) { return this.set.has(name); }
}

class StubElement {
  constructor(id = "") {
    this.id = id;
    this.innerHTML = "";
    this.textContent = "";
    this.hidden = false;
    this.disabled = false;
    this.className = "";
    this.classList = new StubClassList();
    this.dataset = {};
    this.style = {};
    this.scrollTop = 0;
    this.attributes = new Map();
    this.children = [];
    // Selector -> element, for the few structural children the renderer resolves by CSS rather
    // than by id (the drawer header it injects the Back control into). Empty by default, so
    // querySelector keeps answering null everywhere it always did.
    this.stubQuery = null;
  }
  addEventListener() {}
  removeEventListener() {}
  setAttribute(name, value) { this.attributes.set(name, String(value)); }
  getAttribute(name) { return this.attributes.has(name) ? this.attributes.get(name) : null; }
  removeAttribute(name) { this.attributes.delete(name); }
  hasAttribute(name) { return this.attributes.has(name); }
  appendChild(child) { this.children.push(child); return child; }
  insertAdjacentHTML() {}
  remove() {}
  querySelector(selector) {
    if (this.stubQuery && Object.prototype.hasOwnProperty.call(this.stubQuery, selector)) return this.stubQuery[selector];
    return null;
  }
  querySelectorAll() { return []; }
  closest() { return null; }
  focus() {}
  scrollIntoView() {}
}

// fetch stub: serves /projects/<key>/<relative> from the roots map, mirroring the server's
// virtual namespace (read-only, files straight from disk). Any other URL is 404.
function makeFetch(rootsByKey) {
  return async function fetchStub(url) {
    const path = String(url).split("?")[0];
    const match = /^\/projects\/([^/]+)\/(.+)$/.exec(path);
    let filePath = null;
    if (match) {
      const root = rootsByKey.get(decodeURIComponent(match[1]));
      if (root) {
        const abs = normalize(join(root, match[2]));
        const base = root.endsWith(sep) ? root : root + sep;
        if (abs === root || abs.startsWith(base)) filePath = abs;
      }
    }
    if (filePath) {
      try {
        const body = readFileSync(filePath, "utf8");
        return {
          ok: true,
          status: 200,
          statusText: "OK",
          text: async () => body,
          json: async () => JSON.parse(body)
        };
      } catch {
        // fall through to 404
      }
    }
    return {
      ok: false,
      status: 404,
      statusText: "Not Found",
      text: async () => "not found",
      json: async () => { throw new Error("not found"); }
    };
  };
}

// `alsoLoad` runs further classic scripts into the SAME context, in the order given, before the
// renderer — which is what index.html does with `defer`. It is how the report surface (#53) is
// exercised: the mount and the report renderer are separate shipped files whose top-level
// functions the console renderer calls, so a harness that loads only one of the three would be
// testing a page that does not exist.
export function createConsoleHarness({ rendererPath, rootsByKey, alsoLoad = [] }) {
  const elements = new Map();
  const byId = (id) => {
    if (!elements.has(id)) elements.set(id, new StubElement(id));
    return elements.get(id);
  };
  // The run drawer's header is the one node the renderer reaches by CSS and then writes into
  // (it injects the Back pill there before painting a run detail). Registering it keeps that
  // path from throwing on a stub whose querySelector answers null for everything.
  byId("run-drawer").stubQuery = { ".drawer-header": byId("(drawer-header)") };
  const documentStub = {
    title: "Project Console",
    hidden: false,
    getElementById: byId,
    querySelector: () => null,
    querySelectorAll: () => [],
    createElement: (tag) => new StubElement(`(created:${tag})`),
    addEventListener() {},
    removeEventListener() {}
  };
  const sandbox = {
    document: documentStub,
    fetch: makeFetch(rootsByKey),
    console,
    setInterval,
    clearInterval,
    setTimeout,
    clearTimeout,
    URL,
    window: undefined
  };
  sandbox.window = sandbox; // window.confirm is never reached (modal close is forced)
  vm.createContext(sandbox);
  for (const extra of alsoLoad) {
    vm.runInContext(readFileSync(extra, "utf8"), sandbox, { filename: extra });
  }
  const source = readFileSync(rendererPath, "utf8");
  vm.runInContext(source, sandbox, { filename: rendererPath });
  return {
    sandbox,
    element: byId,
    // Let async work the renderer fired without awaiting (doc bodies) settle.
    async flush(times = 4) {
      for (let i = 0; i < times; i += 1) {
        await new Promise((resolve) => setImmediate(resolve));
      }
    },
    // The surfaces the renderer paints directly, for cross-state sweeps.
    surfaceIds: [
      "project-overview", "next-pending-runs", "overview-activity",
      "run-queue-v3", "roadmap-v3-tree",
      "history-list",
      "docs-nav-list", "docs-reader", "docs-body",
      "review-policy", "project-guardrails", "no-claims",
      "state-sources", "repo-structure", "console-source-files",
      "drawer-title", "drawer-id", "drawer-body", "edit-modal-body",
      "load-notice"
    ],
    dump(ids) {
      const list = ids || this.surfaceIds;
      const out = new Map();
      list.forEach((id) => {
        const el = elements.get(id);
        out.set(id, el ? `${el.innerHTML}||${el.textContent}` : "");
      });
      out.set("(document.title)", documentStub.title);
      return out;
    }
  };
}
