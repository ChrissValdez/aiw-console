// node filas.mjs <informe> <LECCION>: copia al registro las filas «| LEC | `pieza` |» del informe que aún no estén.
import fs from 'fs';
const [inf, lec] = process.argv.slice(2);
const t = fs.readFileSync(inf, 'utf8').replace(/\r\n/g, '\n').split('\n');
const re = new RegExp('^\\| ' + lec + ' \\| `[a-z0-9-]+` \\|');
const filas = t.filter((l) => re.test(l));
const f = 'docs/BLOQUES-PROVISIONALES.md';
let s = fs.readFileSync(f, 'utf8');
const E = s.includes('\r\n') ? '\r\n' : '\n';
const nuevas = filas.filter((l) => { const c = l.split(' | '); return !s.includes(c[0] + ' | ' + c[1] + ' |'); });
if (nuevas.length) { if (!s.endsWith(E)) s += E; fs.writeFileSync(f, s + nuevas.join(E) + E); }
console.log(lec, 'filas en el informe', filas.length, '· nuevas', nuevas.length);
