// Cabina cantu-studio -- cambio de status por la consola. Uso:
//   node status.mjs <queue_order> <run_id> <status_esperado> <status_nuevo> dry|apply [baseline] [closeoutFile]
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import net from 'net';
import { spawn } from 'child_process';
const W = process.env.W;
const [qo, runId, expected, next, mode, baseline, closeoutFile] = process.argv.slice(2);
const AC = path.join(W, 'projects/aiw-console');
const C = path.join(W, 'projects/cantu-studio/.aiw/roadmap/roadmap.json');
const md5 = (b) => crypto.createHash('md5').update(b).digest('hex');
const flat = (r) => { const a = []; for (const o of r.objectives) for (const p of o.phases) for (const x of p.runs) a.push(x); return a; };
const before = fs.readFileSync(C);
const r0 = JSON.parse(before.toString('utf8'));
const hit = flat(r0).find((x) => x.queue_order === Number(qo));
// GUARDAS: run_id, titulo y status copiados del canonico
if (!hit || hit.run_id !== runId || hit.status !== expected) {
  console.log('GUARDA ABORTA', JSON.stringify({ qo, found: hit && { id: hit.run_id, st: hit.status, t: hit.title } }));
  process.exit(3);
}
console.log('guarda OK:', hit.queue_order, hit.run_id, '|', hit.title, '|', hit.status);
console.log('md5 canonico (arbol) antes:', md5(before));
const bdir = path.join(W, '_backups');
const bfile = path.join(bdir, `cantu-studio-roadmap-${runId}-${expected}-to-${next}.json`);
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
const args = { run: runId, status: next };
if (closeoutFile) args.closeoutResult = fs.readFileSync(closeoutFile, 'utf8').replace(/\r/g, '').trim();
const body = { op: 'set-status', args, apply: mode === 'apply' };
if (mode === 'apply') body.baseline = baseline;
const res = await fetch(`http://127.0.0.1:${port}/projects/cantu-studio/__project-console/roadmap/edit`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
const j = await res.json();
srv.kill();
console.log('HTTP', res.status, JSON.stringify({ ok: j.ok, applied: j.applied, dryRun: j.dryRun, remap: j.remap, warnings: j.warnings, baseline: j.baseline, reemit: j.reemit, errors: j.errors, reason: j.reason }));
if (mode !== 'apply' || !j.applied) process.exit(j.ok ? 0 : 6);
// VERIFICACION CAMPO A CAMPO contra el respaldo: solo debia cambiar status (y closeout_result si se paso)
const after = fs.readFileSync(C);
console.log('md5 canonico (arbol) despues:', md5(after));
const a = flat(JSON.parse(after.toString('utf8'))), b = flat(JSON.parse(fs.readFileSync(bfile, 'utf8')));
const allowed = new Set(['status', ...(closeoutFile ? ['closeout_result'] : [])]);
let diffs = [];
if (a.length !== b.length) diffs.push('numero de runs');
for (let i = 0; i < b.length; i++) {
  const x = b[i], y = a[i];
  const keys = new Set([...Object.keys(x), ...Object.keys(y)]);
  for (const k of keys) if (JSON.stringify(x[k]) !== JSON.stringify(y[k])) diffs.push(`${x.queue_order}.${k}`);
}
const expectedDiffs = diffs.filter((d) => d.startsWith(`${qo}.`) && allowed.has(d.split('.')[1]));
console.log('campos cambiados:', JSON.stringify(diffs), '| fuera de lo declarado:', JSON.stringify(diffs.filter((d) => !expectedDiffs.includes(d))));
const r1 = JSON.parse(after.toString('utf8'));
const rest = { ...r1 }; delete rest.objectives; const rest0 = { ...r0 }; delete rest0.objectives;
console.log('cabecera intacta:', JSON.stringify(rest) === JSON.stringify(rest0));
