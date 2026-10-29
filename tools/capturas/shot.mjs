// shot.mjs (copia de ../../herramientas/shot.mjs + opciones `full` y `measure`) — zero-dependency screenshot driver over the Chrome DevTools Protocol.
//   node shot.mjs <plan.json> <outDir>
// Env: CHROME (path), ONLY (comma list of shot names), SETTLE (ms).
import { spawn } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";

const CHROME = process.env.CHROME || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const [planPath, outDir] = process.argv.slice(2);
if (!planPath || !outDir) { console.error("usage: node shot.mjs <plan.json> <outDir>"); process.exit(2); }
const plan = JSON.parse(readFileSync(planPath, "utf8"));
mkdirSync(outDir, { recursive: true });
const only = process.env.ONLY ? new Set(process.env.ONLY.split(",").map((s) => s.trim()).filter(Boolean)) : null;

const port = 9400 + Math.floor(Math.random() * 400);
const profile = resolve(outDir, "..", `.chrome-profile-${port}`);
const chrome = spawn(CHROME, [
  "--headless=new",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`,
  "--no-first-run",
  "--no-default-browser-check",
  "--disable-gpu",
  "--disable-extensions",
  "--force-device-scale-factor=1",
  "--window-size=1440,900",
  "--lang=en-US",
  "about:blank"
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForDevtools() {
  const t0 = Date.now();
  while (Date.now() - t0 < 20000) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (res.ok) return await res.json();
    } catch { /* not up yet */ }
    await sleep(150);
  }
  throw new Error("Chrome devtools did not come up on port " + port);
}

function connect(url) {
  return new Promise((res, rej) => {
    const ws = new WebSocket(url);
    ws.addEventListener("open", () => res(ws));
    ws.addEventListener("error", (e) => rej(new Error("ws error " + (e.message || ""))));
  });
}

function cdp(ws) {
  let id = 0;
  const pending = new Map();
  const listeners = [];
  ws.addEventListener("message", (ev) => {
    const msg = JSON.parse(typeof ev.data === "string" ? ev.data : ev.data.toString());
    if (msg.id && pending.has(msg.id)) {
      const { res, rej } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) rej(new Error(`${msg.error.message} ${msg.error.data || ""}`.trim()));
      else res(msg.result);
    } else if (msg.method) {
      listeners.slice().forEach((l) => l(msg));
    }
  });
  return {
    send(method, params = {}, sessionId) {
      return new Promise((res, rej) => {
        const i = ++id;
        pending.set(i, { res, rej });
        ws.send(JSON.stringify(sessionId ? { id: i, method, params, sessionId } : { id: i, method, params }));
      });
    },
    waitEvent(method, sessionId, timeout = 30000) {
      return new Promise((res, rej) => {
        const timer = setTimeout(() => { off(); rej(new Error("timeout waiting " + method)); }, timeout);
        const l = (m) => {
          if (m.method === method && (!sessionId || m.sessionId === sessionId)) { off(); clearTimeout(timer); res(m.params); }
        };
        const off = () => { const k = listeners.indexOf(l); if (k >= 0) listeners.splice(k, 1); };
        listeners.push(l);
      });
    }
  };
}

const PREAMBLE = String.raw`
window.__h = {
  sleep: (ms) => new Promise((r) => setTimeout(r, ms)),
  waitFor: async (sel, timeout = 20000) => {
    const t0 = Date.now();
    while (Date.now() - t0 < timeout) {
      const el = document.querySelector(sel);
      if (el) return el;
      await window.__h.sleep(50);
    }
    throw new Error("waitFor timeout: " + sel);
  },
  waitText: async (sel, text, timeout = 20000) => {
    const t0 = Date.now();
    while (Date.now() - t0 < timeout) {
      const el = document.querySelector(sel);
      if (el && el.textContent.includes(text)) return el;
      await window.__h.sleep(50);
    }
    throw new Error("waitText timeout: " + sel + " ~ " + text);
  },
  click: async (sel) => {
    const el = await window.__h.waitFor(sel);
    el.click();
    await window.__h.sleep(150);
    return el;
  },
  project: async (key) => {
    await window.__h.click('.nav-item[data-project-key="' + key + '"]');
    await window.__h.waitFor('#run-queue-v3 .v3-queue-group');
    await window.__h.sleep(350);
  },
  tab: async (name) => {
    await window.__h.click('.tab[data-tab="' + name + '"]');
    await window.__h.sleep(350);
  },
  findRun: (n) => {
    const want = String(n);
    const rows = [...document.querySelectorAll('#run-queue-v3 .v3-queue-row')];
    return rows.find((r) => {
      const tile = r.querySelector('.v3-order-tile');
      const ord = r.querySelector('.v3-run-order');
      const txt = tile ? tile.textContent.trim() : (ord ? ord.textContent.trim().replace(/^#/, '') : '');
      return txt === want;
    }) || null;
  },
  openGroupOf: async (row) => {
    const body = row.closest('.v3-queue-group-body');
    if (body && body.hidden) {
      const toggle = document.querySelector('[aria-controls="' + body.id + '"]');
      if (toggle) { toggle.click(); await window.__h.sleep(150); }
    }
  },
  clickRun: async (n) => {
    await window.__h.waitFor('#run-queue-v3 .v3-queue-row');
    const row = window.__h.findRun(n);
    if (!row) throw new Error('no queue row #' + n);
    await window.__h.openGroupOf(row);
    row.click();
    await window.__h.waitFor('#run-drawer.open');
    await window.__h.sleep(450);
  },
  type: async (sel, text) => {
    const el = await window.__h.waitFor(sel);
    el.focus();
    el.value = text;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    await window.__h.sleep(200);
  },
  editOn: async () => {
    await window.__h.click('#roadmap-edit-toggle');
    await window.__h.waitText('#roadmap-edit-toggle', 'Editing on');
    await window.__h.sleep(300);
  },
  scrollTo: async (sel, y) => {
    const el = await window.__h.waitFor(sel);
    el.scrollTop = y;
    await window.__h.sleep(200);
  },
  scrollToEl: async (scrollerSel, targetSel, offset = 0) => {
    const scroller = await window.__h.waitFor(scrollerSel);
    const target = await window.__h.waitFor(targetSel);
    const top = target.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop;
    scroller.scrollTop = Math.max(0, top - offset);
    await window.__h.sleep(200);
  },
  blur: () => { if (document.activeElement && document.activeElement.blur) document.activeElement.blur(); }
};
true;
`;

async function run() {
  const info = await waitForDevtools();
  const ws = await connect(info.webSocketDebuggerUrl);
  const c = cdp(ws);
  const results = [];
  for (const shot of plan.shots) {
    if (only && !only.has(shot.name)) continue;
    const width = shot.width || 1440;
    const height = shot.height || 900;
    const base = shot.base || plan.base;
    const t0 = Date.now();
    let targetId = null;
    try {
      ({ targetId } = await c.send("Target.createTarget", { url: "about:blank" }));
      const { sessionId } = await c.send("Target.attachToTarget", { targetId, flatten: true });
      await c.send("Page.enable", {}, sessionId);
      await c.send("Runtime.enable", {}, sessionId);
      await c.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false }, sessionId);
      const loaded = c.waitEvent("Page.loadEventFired", sessionId);
      await c.send("Page.navigate", { url: base }, sessionId);
      await loaded;
      const evaluate = async (expression) => {
        const r = await c.send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true }, sessionId);
        if (r.exceptionDetails) {
          const d = r.exceptionDetails;
          throw new Error("page error: " + (d.exception && d.exception.description ? d.exception.description : d.text));
        }
        return r.result ? r.result.value : undefined;
      };
      await evaluate(PREAMBLE);
      await evaluate(`window.__h.waitFor('#shell-project-list .nav-item, .nav-empty').then(() => window.__h.sleep(400))`);
      for (const step of shot.steps || []) {
        await evaluate(`(async () => { const h = window.__h; ${step} })()`);
      }
      await evaluate(`window.__h.sleep(${Number(process.env.SETTLE || shot.settle || 700)})`);
      // [ampliación] `full`: grow the viewport to the scroller's whole height so every card is in one image.
      if (shot.full) {
        const need = await evaluate(`(() => { const s = document.querySelector(${JSON.stringify(shot.full)}); return Math.ceil(s.getBoundingClientRect().top + s.scrollHeight); })()`);
        await c.send("Emulation.setDeviceMetricsOverride", { width, height: Math.max(height, need), deviceScaleFactor: 1, mobile: false }, sessionId);
        await evaluate(`window.__h.sleep(500)`);
      }
      if (shot.measure) {
        const m = await evaluate(shot.measure);
        writeFileSync(join(outDir, `${shot.name}.json`), JSON.stringify(m, null, 2));
      }
      const { data } = await c.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false }, sessionId);
      writeFileSync(join(outDir, `${shot.name}.png`), Buffer.from(data, "base64"));
      results.push({ name: shot.name, ok: true, ms: Date.now() - t0 });
      console.log(`ok   ${shot.name} (${width}x${height}) ${Date.now() - t0}ms`);
    } catch (error) {
      results.push({ name: shot.name, ok: false, error: error.message });
      console.log(`FAIL ${shot.name}: ${error.message}`);
    } finally {
      if (targetId) { try { await c.send("Target.closeTarget", { targetId }); } catch { /* ignore */ } }
    }
  }
  writeFileSync(join(outDir, "_results.json"), JSON.stringify(results, null, 2));
  ws.close();
  chrome.kill();
  await sleep(300);
  try { rmSync(profile, { recursive: true, force: true }); } catch { /* ignore */ }
  const failed = results.filter((r) => !r.ok).length;
  console.log(`done: ${results.length - failed} ok, ${failed} failed`);
  process.exit(failed ? 1 : 0);
}

run().catch((error) => { console.error(error); chrome.kill(); process.exit(1); });
