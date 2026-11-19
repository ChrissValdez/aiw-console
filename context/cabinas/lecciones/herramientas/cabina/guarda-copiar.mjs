// Envuelve el bloque de «copiar / pegar» de una galería sin barra (nada que votar) para que el script no truene.
import fs from 'node:fs';
const f = process.argv[2];
let t = fs.readFileSync(f, 'utf8');
const ini = "  var caja = document.getElementById('copia');";
const fin = '  if (SERVIDOR) {';
const a = t.indexOf(ini), b = t.indexOf(fin, a);
if (a < 0 || b < 0 || b < a || t.indexOf(ini, a + 1) >= 0) throw new Error('no casa una sola vez');
if (t.includes("if (document.getElementById('copia') && document.querySelector('.copiar')) {")) throw new Error('ya tiene la guarda');
t = t.slice(0, a) + "  if (document.getElementById('copia') && document.querySelector('.copiar')) {\n" + t.slice(a, b) + '  }\n' + t.slice(b);
fs.writeFileSync(f, t);
console.log('guarda puesta');
