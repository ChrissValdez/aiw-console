// node quitar-uniones.mjs <dir>…: quita cada unión o enlace dentro (sin tocar su destino), hasta 6 niveles.
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
function enlaces(dir, out, n) {
  if (n > 6) return out;
  let ents; try { ents = fs.readdirSync(dir); } catch { return out; }
  for (const e of ents) {
    if (e === '.git') continue;
    const p = path.join(dir, e);
    let st; try { st = fs.lstatSync(p); } catch { continue; }
    if (st.isSymbolicLink()) out.push(p); else if (st.isDirectory()) enlaces(p, out, n + 1);
  }
  return out;
}
for (const d of process.argv.slice(2)) {
  for (const e of enlaces(path.resolve(d), [], 0)) {
    let esDir = false; try { esDir = fs.statSync(e).isDirectory(); } catch {}
    if (esDir) execFileSync('cmd', ['/c', 'rmdir', e]); else fs.unlinkSync(e);
    console.log('quitada', e);
  }
}
