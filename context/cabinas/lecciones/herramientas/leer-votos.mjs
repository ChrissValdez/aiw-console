// node leer-votos.mjs <antes-sha> <galeria> [salida.md]
// Lo que cambió en las claves de una galería entre <antes-sha> y origin/main, agrupado por vista, con los comentarios tal cual.
import { execSync } from 'node:child_process';
import fs from 'node:fs';
const REV = 'C:/Users/chris/Documents/AIW_Workspace/projects/cantu-revisiones';
const [antes, g, salida] = process.argv.slice(2);
const leer = (ref) => { try { return JSON.parse(execSync(`git -C ${REV} show ${ref}:galerias/${g}/respuestas.json`, { maxBuffer: 1 << 26 }).toString()).claves || {}; } catch { return {}; } };
const A = leer(antes), B = leer('origin/main');
const vistas = {};
for (const k of new Set([...Object.keys(A), ...Object.keys(B)])) {
  if (JSON.stringify(A[k]) === JSON.stringify(B[k])) continue;
  const m = /^(v|c|c-antes|huella|ver|elegida|★|e)?:?([A-Z]+-[A-Z0-9]+(?:-[A-Z0-9]+)?)(?::(.*))?$/.exec(k);
  const vista = m ? m[2] : k;
  (vistas[vista] = vistas[vista] || []).push(k);
}
let t = `# ${g}: lo que cambió entre ${antes} y origin/main\n\n`;
for (const v of Object.keys(vistas).sort()) {
  t += `## ${v}\n\n`;
  // todas las claves de la vista, no solo las que cambiaron: el estado entero
  const ks = Object.keys(B).filter((k) => k.includes(':' + v + ':') || k.endsWith(':' + v) || k === v).filter((k) => /^(v|c):/.test(k)).sort();
  for (const k of ks) {
    if (/^v:/.test(k)) t += `- \`${k}\` = ${B[k]}${JSON.stringify(A[k]) !== JSON.stringify(B[k]) ? '  ← nuevo' : ''}\n`;
  }
  for (const k of ks) {
    if (/^c:/.test(k) && B[k] != null) t += `\n- \`${k}\`${JSON.stringify(A[k]) !== JSON.stringify(B[k]) ? ' (nuevo)' : ''}:\n\n  \`\`\`text\n${String(B[k]).split('\n').map((l) => (l ? '  ' + l : '')).join('\n')}\n  \`\`\`\n`;
  }
  const otras = vistas[v].filter((k) => !/^(v|c):/.test(k));
  if (otras.length) t += `\n- otras claves cambiadas: ${otras.map((k) => '`' + k + '`').join(', ')}\n`;
  t += '\n';
}
if (salida) fs.writeFileSync(salida, t);
console.log(t);
