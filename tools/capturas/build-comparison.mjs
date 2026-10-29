// Builds the self-contained before/after comparison page.
//   node build-comparison.mjs <notes.json> <outHtml>
// notes.json: { "title": "...", "intro": "...", "groups": [ { "title": "...", "items": [ { "shot": "S02-portfolio", "surface": "Project Portfolio", "note": "..." } ] } ] }
// Images are read from <root>/antes/<shot>.png and <root>/despues/<shot>.png and embedded as data URIs.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";

const [notesPath, outPath] = process.argv.slice(2);
const notes = JSON.parse(readFileSync(notesPath, "utf8"));
const root = dirname(outPath);
const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const img = (folder, shot) => {
  const p = join(root, folder, `${shot}.png`);
  if (!existsSync(p)) return "";
  return "data:image/png;base64," + readFileSync(p).toString("base64");
};

let n = 0;
const sections = notes.groups.map((group) => `
  <section class="group">
    <h2>${esc(group.title)}</h2>
    ${group.items.map((item) => {
      n += 1;
      const a = img("antes", item.shot);
      const b = img("despues", item.shot);
      return `
    <article class="pair" id="${esc(item.shot)}">
      <header>
        <span class="num">${n}</span>
        <h3>${esc(item.surface)}</h3>
        <code>${esc(item.shot)}.png</code>
      </header>
      <p class="note">${esc(item.note)}</p>
      <div class="side">
        <figure>
          <figcaption>Antes</figcaption>
          ${a ? `<img src="${a}" alt="Antes — ${esc(item.surface)}" loading="lazy">` : "<div class='missing'>sin captura</div>"}
        </figure>
        <figure>
          <figcaption>Después</figcaption>
          ${b ? `<img src="${b}" alt="Después — ${esc(item.surface)}" loading="lazy">` : "<div class='missing'>sin captura</div>"}
        </figure>
      </div>
    </article>`;
    }).join("")}
  </section>`).join("");

const toc = notes.groups.map((group) => `<li><strong>${esc(group.title)}</strong><ul>${group.items.map((item) => `<li><a href="#${esc(item.shot)}">${esc(item.surface)}</a></li>`).join("")}</ul></li>`).join("");

const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(notes.title)}</title>
<style>
  :root { color-scheme: dark; --bg: #1c1d27; --panel: #252631; --text: #dee2e6; --muted: #8b93a5; --line: rgba(255,255,255,0.1); --accent: #8f9aec; }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--bg); color: var(--text); font: 15px/1.55 "Segoe UI", system-ui, sans-serif; }
  main { max-width: 1900px; margin: 0 auto; padding: 28px 32px 80px; }
  h1 { font-size: 24px; margin: 0 0 6px; }
  .intro { color: var(--muted); margin: 0 0 18px; max-width: 90ch; white-space: pre-line; }
  nav.toc { border: 1px solid var(--line); border-radius: 8px; padding: 12px 18px; background: var(--panel); margin-bottom: 28px; columns: 3; column-gap: 32px; font-size: 13.5px; }
  nav.toc > ul { margin: 0; padding: 0; list-style: none; }
  nav.toc > ul > li { break-inside: avoid; margin-bottom: 10px; }
  nav.toc ul ul { margin: 2px 0 0; padding-left: 14px; }
  nav.toc a { color: var(--accent); text-decoration: none; }
  nav.toc a:hover { text-decoration: underline; }
  h2 { font-size: 18px; margin: 36px 0 12px; padding-bottom: 6px; border-bottom: 1px solid var(--line); color: var(--accent); letter-spacing: 0.02em; }
  .pair { border: 1px solid var(--line); border-radius: 10px; background: var(--panel); padding: 14px 18px 18px; margin-bottom: 22px; }
  .pair header { display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap; }
  .pair .num { display: inline-flex; align-items: center; justify-content: center; min-width: 26px; height: 22px; padding: 0 7px; border-radius: 11px; background: rgba(91,105,188,0.22); color: #a8b1f0; font-size: 12px; font-weight: 700; }
  .pair h3 { margin: 0; font-size: 16px; }
  .pair code { color: var(--muted); font-size: 12px; }
  .note { margin: 6px 0 12px; color: var(--text); max-width: 110ch; }
  .side { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  figure { margin: 0; min-width: 0; }
  figcaption { font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); margin-bottom: 6px; }
  img { display: block; width: 100%; height: auto; border: 1px solid var(--line); border-radius: 6px; background: #000; }
  .missing { padding: 40px; color: var(--muted); border: 1px dashed var(--line); border-radius: 6px; text-align: center; }
  @media (max-width: 1100px) { .side { grid-template-columns: 1fr; } nav.toc { columns: 1; } }
</style>
</head>
<body>
<main>
  <h1>${esc(notes.title)}</h1>
  <p class="intro">${esc(notes.intro)}</p>
  <nav class="toc"><ul>${toc}</ul></nav>
  ${sections}
</main>
</body>
</html>
`;
writeFileSync(outPath, html);
console.log(`wrote ${outPath} (${(html.length / 1048576).toFixed(1)} MB, ${n} pairs)`);
