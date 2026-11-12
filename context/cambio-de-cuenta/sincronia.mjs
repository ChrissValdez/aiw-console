// node sincronia.mjs: ¿está todo el avance en GitHub? Lo corren la cuenta que se va (antes del cambio) y la que llega (al
// arrancar), según PROTOCOLO.md. Solo lee y hace `git fetch`; no cambia nada. La cabina de LECCIONES, 2026-11-12.
// Bloquean el cambio los repos de LECCIONES; los de otras cabinas se listan para que su cabina los vea, pero no bloquean.
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const P = path.resolve(AQUI, '..', '..', '..');            // AIW_Workspace/projects
const PROPIOS = ['cantu-lessons', 'cantu-revisiones', 'aiw-console'];
const revisadas = new Set(fs.readFileSync(path.join(AQUI, 'ramas-integradas.txt'), 'utf8')
  .split(/\r?\n/).filter((l) => l && !l.startsWith('#')).map((l) => l.trim()));
const g = (dir, ...a) => execFileSync('git', ['-C', dir, ...a], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trimEnd();

const faltas = [], avisos = [];
for (const r of fs.readdirSync(P).sort()) {
  const dir = path.join(P, r);
  if (!fs.existsSync(path.join(dir, '.git'))) continue;
  const propio = PROPIOS.includes(r);
  const mal = (t) => (propio ? faltas : avisos).push(`${r}: ${t}`);
  try { g(dir, 'fetch', '-q'); } catch (e) { mal('no pude hacer fetch (' + String(e.message).split('\n')[0] + ')'); }
  const rama = g(dir, 'rev-parse', '--abbrev-ref', 'HEAD');
  const sucios = g(dir, 'status', '--porcelain').split('\n').filter(Boolean);
  let ade = '?', atr = '?';
  try { [ade, atr] = g(dir, 'rev-list', '--left-right', '--count', 'HEAD...@{u}').split(/\s+/); } catch { mal('la rama ' + rama + ' no sigue a ninguna remota'); }
  console.log(`${propio ? '●' : '○'} ${r.padEnd(22)} ${rama.padEnd(6)} sin commitear ${String(sucios.length).padStart(2)} · sin empujar ${ade} · sin bajar ${atr}`);
  if (rama !== 'main') mal(`está en la rama ${rama}, no en main`);
  if (sucios.length) {
    const votos = sucios.filter((l) => /galerias\/.*respuestas\./.test(l)).length;
    mal(`${sucios.length} sin commitear` + (votos ? ` (${votos} de votos: que el operador pulse «Sincronizar»)` : '') + ': ' + sucios.slice(0, 4).map((l) => l.slice(3)).join(', ') + (sucios.length > 4 ? '…' : ''));
  }
  if (ade !== '0' && ade !== '?') mal(`${ade} commits sin empujar`);
  if (atr !== '0' && atr !== '?') mal(`${atr} commits de GitHub sin bajar (git pull --rebase)`);
  if (!propio) continue;
  // Ramas locales con trabajo que no está en main (por contenido del parche), salvo las ya revisadas.
  for (const b of g(dir, 'for-each-ref', '--format=%(refname:short)', 'refs/heads').split('\n').filter(Boolean)) {
    if (b === 'main') continue;
    const n = g(dir, 'cherry', 'origin/main', b).split('\n').filter((l) => l.startsWith('+')).length;
    if (!n || revisadas.has(`${r} ${b} ${g(dir, 'rev-parse', b)}`)) continue;
    mal(`la rama local ${b} trae ${n} commit(s) que no están en main (¿un carril sin integrar?)`);
  }
  // Worktrees de carriles: que no quede nada sin commitear.
  const wts = g(dir, 'worktree', 'list', '--porcelain').split('\n').filter((l) => l.startsWith('worktree ')).map((l) => l.slice(9)).slice(1);
  for (const w of wts) {
    let s = [];
    try { s = g(w, 'status', '--porcelain').split('\n').filter(Boolean); } catch { mal(`worktree ${w}: no se puede leer (¿borrado a mano? git worktree prune)`); continue; }
    console.log(`    worktree ${w} · sin commitear ${s.length}`);
    if (s.length) mal(`worktree ${w}: ${s.length} sin commitear`);
  }
}
console.log('');
if (avisos.length) { console.log('De otras cabinas (no bloquean; que las vea su cabina):'); avisos.forEach((a) => console.log('  - ' + a)); console.log(''); }
if (faltas.length) {
  console.log('NO CAMBIAR TODAVÍA. Falta:'); faltas.forEach((a) => console.log('  - ' + a));
  process.exit(1);
}
console.log('EN ORDEN: todo lo de LECCIONES está en GitHub. Se puede cambiar de cuenta.');
