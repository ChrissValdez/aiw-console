// RW-20 (copia de _scratch/RW-15/trabajo/pintar.mjs) · Compila borradores con el motor de Studio (la cadena de build.mjs:
// validar, generar, ponerCodigos) y escribe la página con códigos en una carpeta de trabajo, SIN tocar lecciones/.
// Uso: node pintar.mjs <carpeta-salida> --todas                 (las 28 de comun.mjs, desde drafts/ del repo)
//      node pintar.mjs <carpeta-salida> <Lnn>=<borrador.web.draft.json> ...
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const R = process.env.HOME + '/mnt/AIW_Workspace/projects/cantu-lessons/'; const lecciones = async () => [];
const st = await import(pathToFileURL(R + 'tools/revision/lib/studio.mjs').href);
const cod = await import(pathToFileURL(R + 'tools/revision/lib/codigos.mjs').href);
let [salida, ...pares] = process.argv.slice(2);
if (pares[0] === '--todas') pares = (await lecciones()).map((l) => `${l.codigo}=${l.borrador}`);
await fs.mkdir(salida, { recursive: true });
const rutaStudio = await st.localizarStudio({ studio: null, raizLecciones: R });
const ajustes = await st.leerAjustesDelEspacio({ raizLecciones: R, rutaStudio });
const temporal = await fs.mkdtemp(path.join(os.tmpdir(), 'rw21-'));
try {
  for (const par of pares) {
    const i = par.indexOf('=');
    const codigo = par.slice(0, i); const ruta = par.slice(i + 1);
    const borrador = JSON.parse(await fs.readFile(ruta, 'utf8'));
    const val = await st.validar({ borrador, rutaStudio });
    if (!val.every((p) => p.ok)) { console.log(`${codigo} ✖ el esquema lo rechaza`, JSON.stringify(val.map((v) => v.problemas))); continue; }
    const { web } = await st.generar({ borrador, rutaStudio, ajustes, carpeta: temporal, base: codigo });
    const html = cod.ponerCodigos(await fs.readFile(web, 'utf8'), borrador, codigo).html;
    await fs.writeFile(path.join(salida, `${codigo}.html`), html, 'utf8');
    console.log(`${codigo} ✔ ${Buffer.byteLength(html)} bytes`);
  }
} finally {
  await fs.rm(temporal, { recursive: true, force: true });
}
