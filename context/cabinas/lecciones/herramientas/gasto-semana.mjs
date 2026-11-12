// ¿Qué gasta los tokens de la semana? Suma el «usage» de cada respuesta del modelo en los transcripts de ~/.claude/projects, desde el
// último reinicio del tope semanal (2026-11-06 11:00Z). Cada respuesta se cuenta una vez (por message.id). La cabina, 2026-11-10.
// El peso es un sustituto del consumo del plan, con las proporciones de precio de la API: entrada 1, lectura de caché 0.1, escritura de
// caché 1.25 (5 min) o 2 (1 h), salida 5; Sonnet 0.6 de Opus, Haiku 0.2. Es una estimación, no lo que cuenta el plan.
import fs from 'node:fs';
import path from 'node:path';
const RAIZ = 'C:/Users/chris/.claude/projects';
const DESDE = Date.parse('2026-11-06T11:00:00Z');
const OUT = process.argv[2];
const archivos = [];
(function rec(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) rec(p); else if (e.name.endsWith('.jsonl') && fs.statSync(p).mtimeMs >= DESDE) archivos.push(p); } })(RAIZ);
const pesoModelo = (m) => (/sonnet/.test(m) ? 0.6 : /haiku/.test(m) ? 0.2 : 1);
const sesiones = {};
const vistos = new Set();
for (const f of archivos) {
  const sub = /subagents/.test(f);
  const sid = sub ? f.split(path.sep).slice(-3)[0] : path.basename(f, '.jsonl');
  const S = (sesiones[sid] ??= { sid, proyecto: f.split(path.sep)[f.split(path.sep).indexOf('projects') + 1], titulo: '', primer: '', pasos: 0, pasosSub: 0, peso: 0, pesoSub: 0, leer: 0, escribir: 0, entrada: 0, salida: 0, ctxMax: 0, ctxSum: 0, imagenes: 0, modelos: {}, primero: null, ultimo: null });
  for (const l of fs.readFileSync(f, 'utf8').split('\n')) {
    if (!l) continue;
    let j; try { j = JSON.parse(l); } catch { continue; }
    if (j.type === 'custom-title' || j.type === 'summary') S.titulo = j.customTitle || j.summary || S.titulo;
    if (j.type === 'user' && !sub) {
      const c = j.message && j.message.content;
      if (!S.primer && typeof c === 'string' && !c.startsWith('<')) S.primer = c.slice(0, 140).replace(/\s+/g, ' ');
      if (Array.isArray(c)) for (const x of c) if (x.type === 'tool_result' && Array.isArray(x.content)) S.imagenes += x.content.filter((y) => y.type === 'image').length;
      if (!S.primer && Array.isArray(c)) { const t = c.find((x) => x.type === 'text' && !String(x.text).startsWith('<')); if (t) S.primer = t.text.slice(0, 140).replace(/\s+/g, ' '); }
    }
    if (j.type !== 'assistant' || !j.message || !j.message.usage) continue;
    const t = Date.parse(j.timestamp);
    if (!(t >= DESDE)) continue;
    const id = j.message.id || j.requestId || j.uuid;
    if (vistos.has(id)) continue;
    vistos.add(id);
    const u = j.message.usage, m = j.message.model || '?';
    if (m === '<synthetic>') continue;
    const cc = u.cache_creation || {};
    const w1h = cc.ephemeral_1h_input_tokens || 0, w5m = cc.ephemeral_5m_input_tokens ?? Math.max(0, (u.cache_creation_input_tokens || 0) - w1h);
    const leer = u.cache_read_input_tokens || 0, ent = u.input_tokens || 0, sal = u.output_tokens || 0;
    const peso = pesoModelo(m) * (ent + 0.1 * leer + 1.25 * w5m + 2 * w1h + 5 * sal);
    S.modelos[m] = (S.modelos[m] || 0) + 1;
    S.peso += peso; S.leer += leer; S.escribir += w5m + w1h; S.entrada += ent; S.salida += sal;
    const ctx = ent + leer + w5m + w1h;
    if (sub) { S.pasosSub++; S.pesoSub += peso; } else { S.pasos++; S.ctxSum += ctx; S.ctxMax = Math.max(S.ctxMax, ctx); }
    S.primero = S.primero ? Math.min(S.primero, t) : t; S.ultimo = Math.max(S.ultimo || 0, t);
  }
}
const L = Object.values(sesiones).filter((s) => s.peso > 0).sort((a, b) => b.peso - a.peso);
const total = L.reduce((a, s) => a + s.peso, 0);
const M = (x) => (x / 1e6).toFixed(1) + 'M';
const tot = L.reduce((a, s) => ({ leer: a.leer + s.leer, escribir: a.escribir + s.escribir, entrada: a.entrada + s.entrada, salida: a.salida + s.salida }), { leer: 0, escribir: 0, entrada: 0, salida: 0 });
console.log(`archivos ${archivos.length}, sesiones con gasto ${L.length}, peso total ${M(total)}`);
console.log(`lectura de caché ${M(tot.leer)} (peso ${(100 * 0.1 * tot.leer / total).toFixed(0)} % aprox), escritura ${M(tot.escribir)}, entrada ${M(tot.entrada)}, salida ${M(tot.salida)}`);
const fila = (s) => `${(100 * s.peso / total).toFixed(1).padStart(5)} % | ${String(s.pasos).padStart(4)} pasos (+${s.pasosSub} sub ${(100 * s.pesoSub / (s.peso || 1)).toFixed(0)} %) | ctx medio ${Math.round(s.ctxSum / (s.pasos || 1) / 1000)}k máx ${Math.round(s.ctxMax / 1000)}k | img ${s.imagenes} | ${Object.keys(s.modelos).map((m) => m.replace('claude-', '')).join(',')} | ${new Date(s.primero).toISOString().slice(5, 16)}→${new Date(s.ultimo).toISOString().slice(5, 16)} | ${s.sid.slice(0, 8)} | ${(s.titulo || s.primer).slice(0, 110)}`;
L.slice(0, 45).forEach((s) => console.log(fila(s)));
fs.writeFileSync(OUT, JSON.stringify({ desde: '2026-11-06T11:00:00Z', medido: new Date().toISOString(), total, tot, sesiones: L }, null, 1));
