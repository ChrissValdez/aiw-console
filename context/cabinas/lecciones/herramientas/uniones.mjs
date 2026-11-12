import fs from 'fs';
import path from 'path';
// Lista enlaces y uniones bajo cada raíz sin entrar en ellos (lstat).
for (const raiz of process.argv.slice(2)) {
  let n = 0; const enlaces = [];
  const pila = [raiz];
  while (pila.length) {
    const d = pila.pop();
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name); n++;
      const s = fs.lstatSync(p);
      if (s.isSymbolicLink()) enlaces.push(p + ' -> ' + fs.readlinkSync(p));
      else if (s.isDirectory()) pila.push(p);
    }
  }
  console.log(raiz, 'entradas', n, 'enlaces', enlaces.length);
  for (const x of enlaces) console.log('   ', x);
}
