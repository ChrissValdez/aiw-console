// El vigilante de los votos (2026-11-02): mira los respuestas.log de las galerías en la PC. Cuando el operador marca
// algo y pasan QUIETO segundos sin otro cambio, dice qué claves cambiaron, por galería, y termina (despierta a la cabina).
// node vigilar-votos.mjs [segundos de quietud, 120 por omisión]
// 2026-11-04: también los votos de las laptops. Cada minuto trae origin/main a un espejo aparte, sin blobs, para no tocar
// el checkout de la PC ni sus candados. Si llegó un «respuestas de <galería> desde <aparato>» de otro aparato, lo dice y
// termina. El espejo se rehace con: git clone --bare --filter=blob:none <url de cantu-revisiones> espejo-revisiones.git
//
// CR-PL·82 (2026-11-16) · PROPUESTA para _scratch/cabina-lecciones/vigilar-votos.mjs (de la cabina; no lo toco). Esta copia
// despierta también con el estado de un aparato: al darle a «Reiniciar», cada aparato (la PC incluida) publica
// estado/<aparato>.json, con su foto y su veredicto contra la medida de la cabina (estado/cabina.json, de tools/cabina/cierre.mjs).
// En el espejo llega como «estado de <aparato> desde <host>» (o «estado del aparato desde <host>», si lo subió después
// «Sincronizar»). Lo lee del espejo (git show: el blob se trae solo) y dice, en una línea, si cuadra: «al día con la cabina»
// o «NO CUADRA», con lo que dice la franja de ese aparato; y si la cabina midió otra vez después, que esa comparación ya es
// vieja. Lo de la propia cabina («estado de la cabina…») no despierta.
// Cambios respecto del original: VIGILAR_ESPEJO y VIGILAR_GALERIAS (para probar en una caja), el bloque del estado dentro del
// intervalo del espejo, y nada más: lo de los votos sigue igual.
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
const ESPEJO = process.env.VIGILAR_ESPEJO || 'C:/Users/chris/Documents/AIW_Workspace/_scratch/cabina-lecciones/espejo-revisiones.git', ESTE = 'DESKTOP-525K0IS';
const ENV = { ...process.env, GIT_TERMINAL_PROMPT: '0', GCM_INTERACTIVE: 'never' };
const git = (...a) => execFileSync('git', ['-C', ESPEJO, ...a], { env: ENV, timeout: 60000, stdio: ['ignore', 'pipe', 'pipe'] }).toString().trim();
const traer = () => { git('fetch', '-q', 'origin', '+refs/heads/main:refs/heads/main'); return git('rev-parse', 'refs/heads/main'); };
// CR-PL·82: los estados que llegaron entre dos puntas del espejo, en una línea cada uno.
const ES_ESTADO = /^estado (de (?!la cabina)(.+)|del aparato) desde (\S+)$/;
const hora = (iso) => { const d = new Date(iso); if (Number.isNaN(d.getTime())) return '¿?'; const hh = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`; return d.toDateString() === new Date().toDateString() ? hh : `${hh} del ${d.getDate()}-${['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'][d.getMonth()]}`; };
const leerDelEspejo = (punta, ruta) => { try { return JSON.parse(git('show', `${punta}:${ruta}`).replace(/^\uFEFF/, '')); } catch { return null; } };
function estadosNuevos(desde, hasta) {
  const asuntos = git('log', '--format=%s', `${desde}..${hasta}`).split('\n').filter((s) => ES_ESTADO.test(s));
  if (!asuntos.length) return [];
  const rutas = [...new Set(git('diff', '--name-only', desde, hasta, '--', 'estado').split('\n').filter((f) => /^estado\/[^/]+\.json$/.test(f) && !/\/(cabina|aparatos)\.json$/.test(f)))];
  const cabina = leerDelEspejo(hasta, 'estado/cabina.json');
  return rutas.map((ruta) => {
    const e = leerDelEspejo(hasta, ruta);
    if (!e || !e.veredicto) return `${ruta}: no se lee (${asuntos.join('; ')})`;
    const v = e.veredicto, quien = `${e.aparato}${e.host ? ` (${e.host})` : ''}`;
    let vieja = '';
    if (cabina && e.cabina && cabina.medido !== e.cabina.medido && Date.parse(cabina.medido) > Date.parse(e.cabina.medido)) vieja = ` · ojo: comparó con tu medida de las ${hora(e.cabina.medido)}; la de ahora es de las ${hora(cabina.medido)}`;
    if (!e.cabina) vieja = ' · comparó sin medida de la cabina (no había estado/cabina.json en ese aparato)';
    return v.tono === 'verde'
      ? `ESTADO de ${quien}, Reiniciar de las ${hora(e.medido)}: al día con la cabina${vieja}.`
      : `ESTADO de ${quien}, Reiniciar de las ${hora(e.medido)}: NO CUADRA — ${(v.lineas && v.lineas.length ? v.lineas : [v.linea]).map((l) => l.replace(/\.$/, '')).join(' | ')}${vieja}.`;
  });
}
let tope = null;
try { tope = traer(); } catch (x) { console.error('sin espejo, solo la PC: ' + String(x.message).split('\n')[0]); }
if (tope) setInterval(() => {
  try {
    const nuevo = traer();
    if (nuevo === tope) return;
    const ajenos = git('log', '--format=%s', tope + '..' + nuevo).split('\n').filter((s) => /^respuestas de .+ desde /.test(s) && !s.endsWith(' desde ' + ESTE));
    const estados = estadosNuevos(tope, nuevo);
    tope = nuevo;
    if (estados.length) for (const l of estados) console.log(l);
    if (ajenos.length) console.log('VOTOS NUEVOS de otro aparato, publicados: ' + [...new Set(ajenos)].join('; '));
    if (estados.length || ajenos.length) process.exit(0);
  } catch (x) { console.error(new Date().toISOString() + ' espejo: ' + String(x.message).split('\n')[0]); }
}, Number(process.env.VIGILAR_CADA_MS || 60000));
const G = process.env.VIGILAR_GALERIAS || 'C:/Users/chris/Documents/AIW_Workspace/Metodo_Cantu/cantu-revisiones/galerias/';
const QUIETO = (+process.argv[2] || 120) * 1000, CADA = 5000;
const foto = () => {
  const r = {};
  for (const g of fs.readdirSync(G)) {
    const f = G + g + '/respuestas.log';
    try { const s = fs.statSync(f); r[g] = { size: s.size, mtime: s.mtimeMs }; } catch (x) {}
  }
  return r;
};
const base = foto();
console.error(new Date().toISOString() + ' vigilando ' + Object.keys(base).length + ' galerías');
let ultimo = null, prev = base;
const distinto = (a, b) => Object.keys({ ...a, ...b }).some(g => !a[g] || !b[g] || a[g].size !== b[g].size || a[g].mtime !== b[g].mtime);
setInterval(() => {
  let ahora;
  try { ahora = foto(); } catch (x) { console.log('ERROR: no puedo leer ' + G + ': ' + x.message); process.exit(2); }
  if (distinto(prev, ahora)) { ultimo = Date.now(); prev = ahora; return; }
  if (ultimo && Date.now() - ultimo >= QUIETO) {
    const partes = [];
    for (const g of Object.keys(ahora)) {
      const a = base[g], b = ahora[g];
      if (a && a.size === b.size && a.mtime === b.mtime) continue;
      let claves = {};
      try {
        const buf = fs.readFileSync(G + g + '/respuestas.log');
        const desde = a && b.size >= a.size ? a.size : 0;
        buf.slice(desde).toString('utf8').split('\n').filter(Boolean).forEach(l => { try { const k = JSON.parse(l).k; const s = k.split(':')[1] || k; claves[s] = (claves[s] || 0) + 1; } catch (x) {} });
      } catch (x) {}
      partes.push(g + ' (' + Object.keys(claves).join(', ') + ')');
    }
    console.log('VOTOS NUEVOS en la PC, quietos ' + QUIETO / 1000 + ' s: ' + (partes.join('; ') || 'cambió un log, sin claves legibles'));
    process.exit(0);
  }
}, CADA);
