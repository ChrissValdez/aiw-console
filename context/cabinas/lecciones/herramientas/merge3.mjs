import { execFileSync } from 'child_process';
import fs from 'fs'; import path from 'path'; import os from 'os';
// Fusión a tres dentro de las cadenas JSON: parte cada «\n» escapado en su renglón, fusiona con git merge-file y deshace.
// Un choque se resuelve solo si un lado contiene al otro como prefijo (el otro hilo ya traía lo de este); si no, se para.
const [c, f, out] = process.argv.slice(2);
const sh = (r) => execFileSync('git', ['show', `${r}:${f}`], { encoding: 'utf8', maxBuffer: 1e8 });
const BS = String.fromCharCode(92);
const ex = (s) => s.split(BS + 'n').join(BS + 'n\n');
const un = (s) => s.split(BS + 'n\n').join(BS + 'n');
const d = fs.mkdtempSync(path.join(os.tmpdir(), 'm3-'));
const P = (n, s) => { const p = path.join(d, n); fs.writeFileSync(p, ex(s)); return p; };
const o = P('ours', sh('HEAD')), b = P('base', sh(c + '~1')), t = P('theirs', sh(c));
let r, n = 0;
try { r = execFileSync('git', ['merge-file', '--diff3', '-p', o, b, t], { encoding: 'utf8', maxBuffer: 1e8 }); }
catch (e) { r = e.stdout; n = e.status; }
let res = r;
if (n) {
  const L = r.split('\n'), R = []; let k = 0, fix = 0;
  while (k < L.length) {
    if (!L[k].startsWith('<<<<<<< ')) { R.push(L[k++]); continue; }
    const O = [], B = [], T = []; k++;
    while (!L[k].startsWith('||||||| ')) O.push(L[k++]); k++;
    while (!L[k].startsWith('=======')) B.push(L[k++]); k++;
    while (!L[k].startsWith('>>>>>>> ')) T.push(L[k++]); k++;
    const pref = (a, z) => a.length <= z.length && a.every((x, i) => x === z[i]);
    if (B.length === 0 && pref(O, T)) { R.push(...T); fix++; }
    else if (B.length === 0 && pref(T, O)) { R.push(...O); fix++; }
    else { console.log('CHOQUE REAL', f.split('/').pop()); fs.writeFileSync(out, r); process.exit(1); }
  }
  res = R.join('\n'); console.log('resueltos', fix, 'de', n);
}
res = un(res); JSON.parse(res); fs.writeFileSync(out, res); console.log('ok', f.split('/').pop(), res.length);
