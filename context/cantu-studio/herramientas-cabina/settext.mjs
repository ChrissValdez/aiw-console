// Cabina cantu-studio -- enmienda de full_description por sustituciones exactas, via la consola.
//   node settext.mjs <queue_order> <run_id> <status_esperado> <pares.json> dry|apply [baseline]
// pares.json: [[viejo, nuevo], ...]. Cada `viejo` debe aparecer EXACTAMENTE una vez o aborta.
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import net from 'net';
import { spawn } from 'child_process';
const W = process.env.W;
const [qo, runId, expected, pairsFile, mode, baseline] = process.argv.slice(2);
const AC = path.join(W, 'projects/aiw-console');
const C = path.join(W, 'projects/cantu-studio/.aiw/roadmap/roadmap.json');
const md5 = (b) => crypto.createHash('md5').update(b).digest('hex');
const flat = (r) => { const a = []; for (const o of r.objectives) for (const p of o.phases) for (const x of p.runs) a.push(x); return a; };
const before = fs.readFileSync(C);
const r0 = JSON.parse(before.toString('utf8'));
const hit = flat(r0).find((x) => x.queue_order === Number(qo));
if (!hit || hit.run_id !== runId || hit.status !== expected) {
  console.log('GUARDA ABORTA', JSON.stringify({ qo, found: hit && { id: hit.run_id, st: hit.status, t: hit.title } }));
  process.exit(3);
}
console.log('guarda OK:', hit.queue_order, hit.run_id, '|', hit.title, '|', hit.status);
console.log('md5 canonico (arbol) antes:', md5(before));
const pairs = JSON.parse(fs.readFileSync(pairsFile, 'utf8'));
let text = hit.full_description;
for (const [oldS, newS] of pairs) {
  const n = text.split(oldS).length - 1;
  if (n !== 1) { console.log('SUSTITUCION ABORTA: aparece', n, 'veces:', JSON.stringify(oldS.slice(0, 80))); process.exit(7); }
  text = text.replace(oldS, () => newS);
}
console.log('full_description:', hit.full_description.length, '->', text.length, 'caracteres;', pairs.length, 'sustituciones');
const bfile = path.join(W, '_backups', `cantu-studio-roadmap-${runId}-settext.json`);
if (mode === 'apply') {
  fs.writeFileSync(bfile, before);
  if (md5(fs.readFileSync(bfile)) !== md5(before)) { console.log('RESPALDO NO BYTE A BYTE'); process.exit(4); }
  console.log('respaldo:', bfile);
}
const port = 8790 + Math.floor(Math.random() * 100);
const srv = spawn(process.execPath, [path.join(AC, 'project-console/serve.mjs')], { cwd: AC, env: { ...process.env, PC_PORT: String(port) }, stdio: ['ignore', 'pipe', 'pipe'] });
let log = ''; srv.stdout.on('data', (d) => (log += d)); srv.stderr.on('data', (d) => (log += d));
const up = async () => { for (let i = 0; i < 100; i++) { const ok = await new Promise((res) => { const s = net.connect(port, '127.0.0.1', () => { s.end(); res(true); }); s.on('error', () => res(false)); }); if (ok) return true; await new Promise((r) => setTimeout(r, 200)); } return false; };
if (!(await up())) { console.log('consola no levanto', log.slice(0, 500)); srv.kill(); process.exit(5); }
const body = { op: 'set-text', args: { targetType: 'run', targetId: runId, fullDescription: text }, apply: mode === 'apply' };
if (mode === 'apply') body.baseline = baseline;
const res = await fetch(`http://127.0.0.1:${port}/projects/cantu-studio/__project-console/roadmap/edit`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
const j = await res.json();
srv.kill();
console.log('HTTP', res.status, JSON.stringify({ ok: j.ok, applied: j.applied, remap: j.remap, warnings: j.warnings, baseline: j.baseline, reemit: j.reemit, errors: j.errors, reason: j.reason }));
if (mode !== 'apply' || !j.applied) process.exit(j.ok ? 0 : 6);
const after = fs.readFileSync(C);
console.log('md5 canonico (arbol) despues:', md5(after));
const a = flat(JSON.parse(after.toString('utf8'))), b = flat(JSON.parse(fs.readFileSync(bfile, 'utf8')));
const diffs = [];
if (a.length !== b.length) diffs.push('numero de runs');
for (let i = 0; i < b.length; i++) { const keys = new Set([...Object.keys(b[i]), ...Object.keys(a[i])]); for (const k of keys) if (JSON.stringify(b[i][k]) !== JSON.stringify(a[i][k])) diffs.push(`${b[i].queue_order}.${k}`); }
console.log('campos cambiados:', JSON.stringify(diffs), '| fuera de lo declarado:', JSON.stringify(diffs.filter((d) => d !== `${qo}.full_description`)));
console.log('texto escrito == texto calculado:', a.find((x) => x.queue_order === Number(qo)).full_description === text);
