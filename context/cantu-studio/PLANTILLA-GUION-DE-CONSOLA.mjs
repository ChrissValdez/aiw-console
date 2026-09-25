// PLANTILLA DEL GUION DE CONSOLA — hilo `cantu-studio`
//
// Copiada el 2026-09-25 desde `_scratch/_STUDIO_cerrar_211_y_abrir_212.mjs`, que es la forma mas
// madura a la que llego la sesion del 18 al 25 de septiembre: varios pasos encadenados, cada uno
// con su dry-run, su lista de cambios PERMITIDOS y su verificacion campo a campo.
//
// POR QUE VIVE AQUI Y NO EN `_scratch`: `_scratch` esta fuera de todo repo, asi que NO VIAJA entre
// computadoras. Los 185 guiones que esta cabina dejo alli eran de un solo uso -su contenido vive
// en el canonico y en los mensajes de commit-, pero la FORMA valia, y perderla costaba media
// sesion de redescubrimiento. Se guarda UNA, no 185.
//
// LO QUE HAY QUE CAMBIAR PARA REUSARLA: el PORT (uno libre), la ruta del respaldo, las constantes
// de identidad (orden, id y titulo esperados de cada ancla), y la lista `pasos`. NO se toca la
// maquinaria: las guardas que abortan, el respaldo byte a byte antes de escribir, el dry-run antes
// de cada apply, y la comparacion de lo que cambio contra lo PERMITIDO.
//
// LAS TRES COSAS QUE ESTA PLANTILLA HACE BIEN Y QUE SE PERDIERON UNA VEZ CADA UNA:
//   1. La guarda de ESTADO caza que la cabina emita un ticket sin abrir el run (paso el 2026-09-19).
//   2. El `remap` se PUBLICA desde el dry-run antes de aplicar, nunca se razona.
//   3. En dry-run solo se valida el PRIMER paso: los siguientes dependen de que el anterior se
//      haya escrito, y fingir lo contrario daria un verde que no significa nada.
//
// #211: enmienda con la decision (a), cierra; inserta el run de construccion tras el #212 del
// rowSpan; y abre el #212.   node _STUDIO_cerrar_211_y_abrir_212.mjs [--apply]
import { spawn } from 'node:child_process';
import { readFileSync, copyFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';

const WS      = path.join(process.env.HOME, 'mnt', 'AIW_Workspace');
const CONSOLE = path.join(WS, 'projects', 'aiw-console');
const STUDIO  = path.join(WS, 'projects', 'cantu-studio');
const SERVE   = path.join(CONSOLE, 'project-console', 'serve.mjs');
const CANON   = path.join(STUDIO, '.aiw', 'roadmap', 'roadmap.json');
const RESP    = path.join(WS, '_backups', 'roadmap-cantu-studio-antes-de-cerrar-211.json');
const PORT    = 8946;
const BASE    = `http://127.0.0.1:${PORT}/projects/cantu-studio/__project-console/roadmap/edit`;
const APLICAR = process.argv.includes('--apply');

const R211 = { orden: 211, id: 'RUN-CANTU-MATH-PROCEDURE-BLOCK-CONTRACT-001', titulo: 'Decide how a multi-line procedure is represented', estado: 'planned' };
const R212 = { orden: 212, id: 'RUN-CANTU-WEB-TABLE-ROWSPAN-OR-MIGRATE-001', titulo: 'A published lesson prints «undefined» eight times: the table and rowSpan', estado: 'planned' };
const NUEVO = {
  id: 'RUN-CANTU-MATH-PROCEDURE-BLOCK-BUILD-001',
  titulo: 'Build the procedure block, deciding the overflow first',
  summary: 'ADR-006 clause 2 as a rule, always on: every formula box of one procedure measures its longest line. In two of three real procedures that line does not fit, so overflow is decided before alignment.'
};

const leer = () => { const c = readFileSync(CANON); return { json: JSON.parse(c.toString('utf8')), md5: createHash('md5').update(c).digest('hex'), sha: 'sha256:' + createHash('sha256').update(c).digest('hex') }; };
const indexar = (j) => { const m = new Map(); for (const o of j.objectives ?? []) for (const p of o.phases ?? []) for (const r of p.runs ?? []) m.set(r.run_id, r); return m; };
let servidor = null, muerto = false;
const matar = () => { if (servidor && !muerto) { muerto = true; try { servidor.kill(); } catch {} } servidor = null; };
const parar = (m) => { console.error('\n  ######## PARO. ' + m + '\n'); matar(); process.exitCode = 1; throw new Error('PARADA CONTROLADA'); };
const post = async (op, args, apply, baseline) => (await fetch(BASE, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ op, args, apply, baseline }) })).json();
const esperar = async () => { for (let i = 0; i < 40; i++) { try { const r = await fetch(`http://127.0.0.1:${PORT}/project-console/index.html`); if (r.status) return true; } catch {} await new Promise((s) => setTimeout(s, 500)); } return false; };
const guarda = (idx, def) => {
  const e = [...idx.values()].filter((r) => r.queue_order === def.orden);
  if (e.length !== 1) parar(`esperaba UN run en #${def.orden} y hay ${e.length}.`);
  const r = e[0];
  if (r.run_id !== def.id)     parar(`GUARDA DE IDENTIDAD #${def.orden}: hay ${r.run_id}.`);
  if (r.title !== def.titulo)  parar(`GUARDA DE TITULO #${def.orden}: hay "${r.title}".`);
  if (r.status !== def.estado) parar(`GUARDA DE ESTADO #${def.orden}: esta "${r.status}", esperaba "${def.estado}".`);
  console.log(`  #${def.orden} ${def.id} — guardas OK (${r.status})`);
  return r;
};
const verificar = (antes, despues, permitidos, ignorarOrden) => {
  const mal = [];
  for (const [id, x] of antes) { const y = despues.get(id); if (!y) { mal.push(id + ' DESAPARECIÓ'); continue; }
    for (const k of new Set([...Object.keys(x), ...Object.keys(y)])) {
      if (ignorarOrden && k === 'queue_order') continue;
      if (JSON.stringify(x[k]) !== JSON.stringify(y[k])) mal.push(`${id}.${k}`); } }
  const sobra = mal.filter((m) => !permitidos.includes(m));
  if (sobra.length) parar('cambios indebidos: ' + sobra.join(', '));
  return mal;
};

console.log('\n==== ' + (APLICAR ? 'APLICANDO' : 'DRY-RUN') + ' — cierre del #211, run de construccion y apertura del #212 ====\n');
let est = leer(); let idx = indexar(est.json);
const run211 = guarda(idx, R211); guarda(idx, R212);
if (idx.has(NUEVO.id)) parar('ya existe ' + NUEVO.id);
const original = run211.full_description ?? '';
if (original.includes('AMENDMENT 2026-09-19')) parar('el #211 YA lleva la enmienda.');
const APENDICE = readFileSync(path.join(WS, '_scratch', '_STUDIO_enmendar_211.txt'), 'utf8');
const CIERRE = readFileSync(path.join(WS, '_scratch', '_STUDIO_cerrar_211.txt'), 'utf8').trim();
console.log(`  md5 inicial: ${est.md5}`);
console.log(`  #211 full_description: ${original.length} -> ${(original + APENDICE).length}`);
console.log(`  closeout del #211: ${CIERRE.length} caracteres\n`);

servidor = spawn('node', [SERVE], { cwd: CONSOLE, env: { ...process.env, PC_PORT: String(PORT) }, stdio: 'ignore' });
if (!(await esperar())) parar('la consola no llegó a escuchar.');
console.log('  consola en el puerto ' + PORT + '\n');

const pasos = [
  { nombre: 'set-status: #211 planned -> active (la cabina emitio su ticket SIN ABRIRLO; la guarda lo caza)', op: 'set-status', args: () => ({ run: R211.id, status: 'active' }), permitidos: [`${R211.id}.status`] },
  { nombre: 'set-text: enmienda del #211', op: 'set-text', args: () => ({ targetType: 'run', targetId: R211.id, fullDescription: original + APENDICE }), permitidos: [`${R211.id}.full_description`] },
  { nombre: 'set-status: #211 -> completed', op: 'set-status', args: () => ({ run: R211.id, status: 'completed', closeoutResult: CIERRE }), permitidos: [`${R211.id}.status`, `${R211.id}.closeout_result`] },
  { nombre: 'insert: run de construccion tras el #212', op: 'insert', args: () => ({ runId: NUEVO.id, title: NUEVO.titulo, summary: NUEVO.summary, fullDescription: readFileSync(path.join(WS, '_scratch', '_STUDIO_run_procedimiento.txt'), 'utf8'), status: 'planned', after: R212.id }), permitidos: [], ignorarOrden: true },
  { nombre: 'set-status: #212 (rowSpan) -> active', op: 'set-status', args: () => ({ run: R212.id, status: 'active' }), permitidos: [`${R212.id}.status`] }
];

if (APLICAR) {
  copyFileSync(CANON, RESP);
  if (createHash('md5').update(readFileSync(RESP)).digest('hex') !== est.md5) parar('el respaldo no coincide byte a byte.');
  console.log('  respaldo: ' + RESP + '  (md5 idéntico)\n');
}

for (const p of pasos) {
  const d = await post(p.op, p.args(), false, est.sha);
  console.log(`  --- ${p.nombre}: dry-run ok=${d.ok} errors=${JSON.stringify(d.errors ?? [])}`);
  for (const m of d.remap ?? []) console.log(`        remap ${m.run_id}: ${m.before} -> ${m.after}`);
  if (!d.ok) parar('rechazado: ' + JSON.stringify(d.errors ?? []));
  if (!APLICAR) { console.log('        (en dry-run solo se valida el primer paso; los siguientes dependen del anterior)\n'); break; }
  const a = await post(p.op, p.args(), true, est.sha);
  if (!a.ok || !a.applied) parar('falló: ' + JSON.stringify(a));
  const fin = leer(); const idxF = indexar(fin.json);
  const cambios = verificar(idx, idxF, p.permitidos, p.ignorarOrden);
  console.log(`        aplicado · md5 -> ${fin.md5} · cambios: ${JSON.stringify(cambios)}${p.ignorarOrden ? ' (+ queue_order de los desplazados)' : ''}`);
  est = fin; idx = idxF;
}

if (APLICAR) {
  const runs = [...idx.values()];
  const c = {}; for (const r of runs) c[r.status] = (c[r.status] || 0) + 1;
  const ords = runs.map((r) => r.queue_order).sort((x, y) => x - y);
  console.log(`\n  total ${runs.length} · densidad 1..N: ${ords.every((v, i) => v === i + 1) ? 'OK' : 'ROTA'} · ${JSON.stringify(c)}`);
  console.log(`  activos: ${runs.filter((r) => r.status === 'active').map((r) => '#' + r.queue_order + ' ' + r.run_id).join(' | ')}`);
  console.log(`  nuevo: #${idx.get(NUEVO.id).queue_order} ${NUEVO.id}`);
}
matar(); process.exit(0);
