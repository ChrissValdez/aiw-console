// Cabina cantu-studio — validador de arranque. Vive en _scratch, fuera de todo repo.
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
const W = process.env.W;
const AC = path.join(W, 'projects/aiw-console');
const core = await import(pathToFileURL(path.join(AC, 'tools/roadmap/roadmap-core.mjs')).href);
const serve = await import(pathToFileURL(path.join(AC, 'project-console/serve.mjs')).href).catch(e => ({ err: e }));
const C = path.join(W, 'projects/cantu-studio/.aiw/roadmap/roadmap.json');
const r = JSON.parse(fs.readFileSync(C, 'utf8'));
let ext;
if (serve.externalRunIdsFor) ext = await serve.externalRunIdsFor('cantu-studio');
else { console.log('serve import failed:', String(serve.err).slice(0, 200)); ext = new Set(); }
const errs = core.checkInvariants(r, { externalRunIds: ext });
const runs = []; for (const o of r.objectives) for (const p of o.phases) for (const x of p.runs) runs.push(x);
console.log('externalRunIds', ext.size, '| errors', errs.length, errs.slice(0, 5));
console.log('history(completed)=', runs.filter(x => x.status === 'completed').length);
const ready = runs.filter(x => x.status === 'planned').sort((a, b) => a.queue_order - b.queue_order)[0];
console.log('next planned by queue_order:', ready.queue_order, ready.run_id, '|', ready.title, '| deps', JSON.stringify(ready.depends_on || []), '| barrier', JSON.stringify(ready.barrier ?? null));
process.exit(0);
