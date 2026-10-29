// Cabina cantu-studio -- cadena de escrituras estructurales. Uso: node cadena.mjs <cadena.json> dry|apply
// dry: planEdit paso a paso sobre una COPIA del canonico (nunca toca el real).
// apply: por la consola (serve.mjs), cada paso con dry-run + apply con baseline; respaldo antes; verificacion campo a campo.
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import net from 'net';
import { spawn } from 'child_process';
import { pathToFileURL } from 'url';
const W = process.env.W;
const [chainFile, mode] = process.argv.slice(2);
const AC = path.join(W, 'projects/aiw-console');
const C = path.join(W, 'projects/cantu-studio/.aiw/roadmap/roadmap.json');
const S = path.dirname(new URL(import.meta.url).pathname);
const md5 = (b) => crypto.createHash('md5').update(b).digest('hex');
const flat = (r) => { const a = []; for (const o of r.objectives) for (const p of o.phases) for (const x of p.runs) a.push({ ...x, _ph: p.title }); return a; };
const core = await import(pathToFileURL(path.join(AC, 'tools/roadmap/roadmap-core.mjs')).href);
const plan = await import(pathToFileURL(path.join(AC, 'tools/roadmap/roadmap-plan.mjs')).href);
const serve = await import(pathToFileURL(path.join(AC, 'project-console/serve.mjs')).href);
const ext = await serve.externalRunIdsFor('cantu-studio');
const chain = JSON.parse(fs.readFileSync(chainFile, 'utf8'));
const orig = fs.readFileSync(C);
console.log('md5 canonico (arbol) antes:', md5(orig), '| externalRunIds', ext.size);
const resolve = (file, step) => {
  if (step.op !== 'set-text-pairs') return step;
  const run = flat(JSON.parse(fs.readFileSync(file, 'utf8'))).find((x) => x.run_id === step.args.run);
  let t = run.full_description;
  for (const [o, n] of step.args.pairs) {
    const k = t.split(o).length - 1;
    if (k !== 1) throw new Error(`SUSTITUCION: aparece ${k} veces: ${o.slice(0, 60)}`);
    t = t.replace(o, () => n);
  }
  return { op: 'set-text', args: { targetType: 'run', targetId: step.args.run, fullDescription: t } };
};
let target = C;
let srv, port;
if (mode === 'dry') {
  target = path.join(S, 'copia-canonico.json');
  fs.writeFileSync(target, orig);
} else if (mode === 'apply') {
  const bfile = path.join(W, '_backups', 'cantu-studio-roadmap-orientacion-2026-10-04.json');
  fs.writeFileSync(bfile, orig);
  if (md5(fs.readFileSync(bfile)) !== md5(orig)) { console.log('RESPALDO NO BYTE A BYTE'); process.exit(4); }
  console.log('respaldo:', bfile);
  port = 8790 + Math.floor(Math.random() * 100);
  srv = spawn(process.execPath, [path.join(AC, 'project-console/serve.mjs')], { cwd: AC, env: { ...process.env, PC_PORT: String(port) }, stdio: 'ignore' });
  for (let i = 0; i < 100; i++) { const ok = await new Promise((r) => { const s = net.connect(port, '127.0.0.1', () => { s.end(); r(true); }); s.on('error', () => r(false)); }); if (ok) break; await new Promise((r) => setTimeout(r, 200)); }
}
const post = async (body) => (await fetch(`http://127.0.0.1:${port}/projects/cantu-studio/__project-console/roadmap/edit`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) })).json();
let i = 0;
for (const raw of chain) {
  i++;
  const step = resolve(target, raw);
  const label = `${i}. ${step.op} ${step.args.runId || step.args.run || step.args.targetId}`;
  if (mode === 'dry') {
    const p = plan.planEdit({ filePath: target, op: step.op, args: step.args, externalRunIds: ext });
    if (!p.ok) { console.log('ABORTA', label, JSON.stringify(p.errors)); process.exit(6); }
    fs.writeFileSync(target, p.serialized);
    console.log(label, '| remap', JSON.stringify(p.remap), '| warnings', JSON.stringify(p.warnings || []));
  } else {
    const d = await post({ op: step.op, args: step.args, apply: false });
    if (!d.ok) { console.log('ABORTA dry', label, JSON.stringify(d)); srv.kill(); process.exit(6); }
    const a = await post({ op: step.op, args: step.args, apply: true, baseline: d.baseline });
    if (!a.applied) { console.log('ABORTA apply', label, JSON.stringify(a)); srv.kill(); process.exit(7); }
    console.log(label, '| aplicado | remap', JSON.stringify(a.remap), '| reemit', a.reemit && a.reemit.ok);
  }
}
if (srv) srv.kill();
const after = JSON.parse(fs.readFileSync(target, 'utf8'));
const errs = core.checkInvariants(after, { externalRunIds: ext });
const A = flat(after), B = flat(JSON.parse(orig.toString('utf8')));
console.log('validador:', errs.length, 'errores', JSON.stringify(errs.slice(0, 3)), '| runs', B.length, '->', A.length, '| completed', A.filter((x) => x.status === 'completed').length);
const qo = A.map((x) => x.queue_order).sort((a, b) => a - b);
console.log('densidad 1..N:', qo.every((v, k) => v === k + 1), '| ids unicos:', new Set(A.map((x) => x.run_id)).size === A.length);
console.log('== la cola desde el 222');
for (const x of A.filter((x) => x.queue_order >= 222).sort((a, b) => a.queue_order - b.queue_order)) {
  const old = B.find((y) => y.run_id === x.run_id);
  console.log(String(x.queue_order).padStart(3), old ? `(era #${old.queue_order})` : '(NUEVO)   ', x.status.padEnd(9), x.run_id, '|', x.title, '| deps', (x.depends_on || []).length);
}
const changed = [];
for (const y of B) { const x = A.find((z) => z.run_id === y.run_id); for (const k of new Set([...Object.keys(x), ...Object.keys(y)])) if (k !== '_ph' && JSON.stringify(x[k]) !== JSON.stringify(y[k])) changed.push(`${y.run_id}.${k}`); }
console.log('campos cambiados en runs existentes:', JSON.stringify(changed));
console.log('md5 resultado:', md5(fs.readFileSync(target)));
