// node relevo.mjs <relevo.md> <HH:MM> <texto.txt>: añade el renglón del texto tras el último «(apuntado a las HH:MM)» del relevo.
// El relevo va en CRLF: si encuentra un LF suelto, para. La cabina, 2026-11-12 (antes, relevo-1705.mjs en la carpeta temporal).
import fs from 'fs';
const [f, hora, txt] = process.argv.slice(2);
let s = fs.readFileSync(f, 'utf8');
if (/(^|[^\r])\n/.test(s)) throw new Error('LF suelto');
const L = s.split('\r\n'); let i = -1;
L.forEach((l, k) => { if (/\(apuntado a las \d\d:\d\d\)\s*$/.test(l)) i = k; });
if (i < 0) throw new Error('sin línea apuntada');
const t = '      - ' + fs.readFileSync(txt, 'utf8').replace(/\r?\n+$/, '').replace(/^\s*-?\s*/, '');
L.splice(i + 1, 0, t + ' (apuntado a las ' + hora + ')');
s = L.join('\r\n');
if (/(^|[^\r])\n/.test(s)) throw new Error('quedó LF suelto');
fs.writeFileSync(f, s); console.log('relevo', hora, 'línea', i + 2);
