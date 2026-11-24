// La cabina de LECCIONES · publica una galería en cantu-revisiones con las comprobaciones de siempre (TALLER-COMUN v14, 9.5·6).
//   node _scratch/cabina-lecciones/publicar-galeria.mjs --de <carpeta de la copia de prueba> --galeria <NOMBRE>
//        [--md5 <el que avisó el carril>] [--mensaje "<línea del commit>"] [--seco] [--sin-push] [--puerto 8795]
// Pasos: 1 md5 del galeria.html nuevo (y si coincide con el avisado); 2 trae lo de origin (los votos de las laptops) por ff;
// 3 el diff por vista (<section class="vista" id="v-…">) y el CAT, con CRLF → LF; 4 copia galeria.html y las img/ nuevas (nunca
// pisa una img que ya está, nunca toca respuestas.*); 5 que cada <img src="img/…"> exista; 6 la prueba en su servidor (nunca el
// 8791): la galería sola y la portada, sin errores de página, todas las img con 200, sin scroll lateral a 1366 ni a 380, y los
// «Votos de sistema»; 7 commit por ruta y push por sha, solo si origin/main..HEAD es solo ese commit.
// --seco: hace 1, 3 y 5 contra la carpeta de origen y no copia nada.
import { spawn, execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const W = 'C:/Users/chris/Documents/AIW_Workspace';
const REV = W + '/Metodo_Cantu/cantu-revisiones', LES = W + '/Metodo_Cantu/cantu-lessons';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const a = process.argv.slice(2);
const opt = (k, d) => { const i = a.indexOf('--' + k); return i >= 0 ? a[i + 1] : d; };
const flag = (k) => a.includes('--' + k);
const DE = opt('de'), G = opt('galeria'), MD5 = opt('md5'), PUERTO = Number(opt('puerto', 8795));
const SECO = flag('seco'), SIN_PUSH = flag('sin-push');
if (!DE || !G) { console.error('Faltan --de y --galeria.'); process.exit(2); }
if (PUERTO === 8791) { console.error('El 8791 es del operador.'); process.exit(2); }
const DEST = path.join(REV, 'galerias', G);
const fallos = [], avisos = [];
const md5 = (b) => crypto.createHash('md5').update(b).digest('hex');
const lf = (s) => s.replace(/\r\n/g, '\n');
const env = { ...process.env, GIT_TERMINAL_PROMPT: '0', GCM_INTERACTIVE: 'never' };
const git = (...args) => execFileSync('git', ['-C', REV, ...args], { env, stdio: ['ignore', 'pipe', 'pipe'], timeout: 60000 }).toString().trim();
const espera = (ms) => new Promise((r) => setTimeout(r, ms));

// 1 · el md5
const nuevoB = fs.readFileSync(path.join(DE, 'galeria.html'));
const huella = md5(nuevoB);
console.log(`1 · md5 ${huella}${MD5 ? (MD5 === huella ? ' (el avisado)' : ` ≠ el avisado ${MD5}`) : ''}`);
if (MD5 && MD5 !== huella) { console.error('El md5 no es el avisado: paro.'); process.exit(1); }

// 2 · lo de origin
if (!SECO) {
  git('fetch', '-q', 'origin');
  const sucio = git('status', '--short', '--', 'galerias/' + G);
  if (sucio) { console.error('galerias/' + G + ' tiene cambios sin commit:\n' + sucio); process.exit(1); }
  const detras = git('rev-list', '--count', 'HEAD..origin/main');
  if (detras !== '0') { git('merge', '--ff-only', '-q', 'origin/main'); console.log(`2 · traídos ${detras} commits de origin por ff`); }
  else console.log('2 · al día con origin');
}

// 3 · el diff por vista y el CAT
const vistas = (h) => { const m = new Map(); const re = /<section class="vista"[^>]*id="v-([^"]+)"[\s\S]*?<\/section>/g; let x; while ((x = re.exec(h))) m.set(x[1], x[0]); return m; };
const cat = (h) => (h.match(/var CAT = .*/) || [''])[0];
const nuevo = lf(nuevoB.toString('utf8'));
const viejoP = path.join(DEST, 'galeria.html');
const viejo = fs.existsSync(viejoP) ? lf(fs.readFileSync(viejoP, 'utf8')) : '';
const vn = vistas(nuevo), vv = vistas(viejo);
const altas = [...vn.keys()].filter((k) => !vv.has(k)), bajas = [...vv.keys()].filter((k) => !vn.has(k));
const cambian = [...vn.keys()].filter((k) => vv.has(k) && vv.get(k) !== vn.get(k));
console.log(`3 · ${vn.size} vistas (antes ${vv.size}): nuevas ${altas.length}${altas.length ? ' [' + altas.join(', ') + ']' : ''}; cambian ${cambian.length}${cambian.length ? ' [' + cambian.join(', ') + ']' : ''}; quitadas ${bajas.length}${bajas.length ? ' [' + bajas.join(', ') + ']' : ''}; el CAT ${cat(nuevo) === cat(viejo) ? 'igual' : 'cambia'}`);
if (viejo && nuevo === viejo) avisos.push('el galeria.html es igual al publicado');
if (bajas.length) avisos.push('se quitan vistas: ' + bajas.join(', '));
// Una vista por sección o slide: una vista nueva cuyo id es el de otra con un sufijo (v-ALG-04-S1-195 junto a v-ALG-04-S1)
// repite la sección, y la plataforma no la junta (CR-GW·25, 2026-11-08). Para antes de copiar nada.
const repetidas = altas.filter((k) => [...vn.keys()].some((j) => j !== k && k.startsWith(j + '-')) || /-(?:S\d+|D\d+|EG|AP)-[^-]+$/.test(k));
if (repetidas.length) { console.error('   FALLA: vista que repite una sección (una vista por sección; la opción nueva va dentro de la que ya está): ' + repetidas.join(', ')); process.exit(1); }

// 4 · copiar (galeria.html y las img nuevas; nunca respuestas.*)
const imgDe = path.join(DE, 'img'), imgA = path.join(DEST, 'img');
const nuevas = [], distintas = [];
if (fs.existsSync(imgDe)) for (const f of fs.readdirSync(imgDe)) {
  const d = path.join(imgA, f);
  if (!fs.existsSync(d)) nuevas.push(f);
  else if (md5(fs.readFileSync(d)) !== md5(fs.readFileSync(path.join(imgDe, f)))) distintas.push(f);
}
if (distintas.length) avisos.push(`${distintas.length} img con el mismo nombre y otro contenido; no se pisan: ${distintas.join(', ')}`);
// estado.json (aprobadas y nota) viaja con el plegado (CR-AS·15: se quedaba atrás)
const estadoDe = path.join(DE, 'estado.json');
const conEstado = fs.existsSync(estadoDe) && (!fs.existsSync(path.join(DEST, 'estado.json')) ||
  md5(fs.readFileSync(estadoDe)) !== md5(fs.readFileSync(path.join(DEST, 'estado.json'))));
if (!SECO) {
  fs.mkdirSync(imgA, { recursive: true });
  fs.copyFileSync(path.join(DE, 'galeria.html'), viejoP);
  for (const f of nuevas) fs.copyFileSync(path.join(imgDe, f), path.join(imgA, f));
  if (conEstado) fs.copyFileSync(estadoDe, path.join(DEST, 'estado.json'));
  console.log(`4 · copiados galeria.html${conEstado ? ', estado.json' : ''} y ${nuevas.length} img nuevas`);
} else console.log(`4 · (seco) se copiarían galeria.html${conEstado ? ', estado.json' : ''} y ${nuevas.length} img nuevas`);

// 5 · cada img que pide la página existe
const pedidas = [...new Set([...nuevo.matchAll(/src="(img\/[^"]+)"/g)].map((m) => m[1]))];
const base = SECO ? DE : DEST;
const faltan = pedidas.filter((s) => !fs.existsSync(path.join(base, decodeURIComponent(s))));
console.log(`5 · ${pedidas.length} img pedidas, faltan ${faltan.length}${faltan.length ? ': ' + faltan.join(', ') : ''}`);
if (faltan.length) fallos.push('faltan img: ' + faltan.join(', '));

// 6 · la prueba en su servidor
if (!SECO) {
  const require = createRequire(LES + '/tools/render/package.json');
  const puppeteer = require('puppeteer-core');
  const srv = spawn(process.execPath, ['servidor/servidor-galeria.mjs', String(PUERTO)], { cwd: REV, env: { ...process.env, CANTU_LESSONS_DIR: LES }, stdio: 'ignore' });
  let nav;
  try {
    let listo = false;
    for (let i = 0; i < 60 && !listo; i++) { try { listo = (await fetch(`http://127.0.0.1:${PUERTO}/`)).ok; } catch {} if (!listo) await espera(250); }
    if (!listo) throw new Error('el servidor no arrancó en el ' + PUERTO);
    nav = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-first-run'] });
    const p = await nav.newPage(); p.setDefaultNavigationTimeout(150000); // la portada tarda hasta 31 s (CR-PL·84, 18-nov)
    const errores = [];
    p.on('pageerror', (e) => errores.push('pageerror: ' + e.message));
    p.on('console', (m) => { if (m.type() === 'error' || /REGLAS-/.test(m.text())) errores.push(m.type() + ': ' + m.text()); });
    p.on('response', (r) => { if (r.status() >= 400) errores.push(r.status() + ' ' + r.url()); });
    const e = Date.now();
    await p.setViewport({ width: 1366, height: 900 });
    await p.goto(`http://127.0.0.1:${PUERTO}/galerias/${G}/?e=${e}`, { waitUntil: 'networkidle0' });
    await espera(800);
    const enPagina = await p.evaluate(() => document.querySelectorAll('section.vista').length);
    if (enPagina !== vn.size) fallos.push(`la página muestra ${enPagina} vistas y el fichero tiene ${vn.size}`);
    const malas = await p.evaluate(async () => { const s = [...new Set([...document.querySelectorAll('img')].map((i) => i.getAttribute('src')).filter(Boolean))]; const r = []; for (const u of s) { try { const x = await fetch(u, { method: 'HEAD' }); if (!x.ok) r.push(x.status + ' ' + u); } catch { r.push('sin red ' + u); } } return r; });
    if (malas.length) fallos.push('img rotas: ' + malas.join(', '));
    const lateral = [];
    for (const ancho of [1366, 380]) {
      await p.setViewport({ width: ancho, height: 900 });
      for (const k of vn.keys()) {
        const sobra = await p.evaluate(async (id) => { location.hash = id; await new Promise((r) => setTimeout(r, 60)); const d = document.documentElement; return d.scrollWidth - d.clientWidth; }, k);
        if (sobra > 1) lateral.push(`${k} a ${ancho} (+${sobra} px)`);
      }
    }
    if (lateral.length) fallos.push('scroll lateral: ' + lateral.join(', '));
    await p.setViewport({ width: 1366, height: 900 });
    await p.goto(`http://127.0.0.1:${PUERTO}/?e=${e}`, { waitUntil: 'networkidle0' });
    await espera(1500);
    const votos = await p.evaluate(() => (document.body.innerText.match(/Votos de sistema \(\d+\)|Sin votos de sistema/) || ['¿?'])[0]);
    const enPortada = await p.evaluate((g) => !!document.querySelector(`a[href="#${g}"]`), G);
    if (!enPortada) avisos.push('la portada no enlaza #' + G);
    if (errores.length) fallos.push('errores en la página: ' + [...new Set(errores)].slice(0, 8).join(' | '));
    console.log(`6 · en el ${PUERTO}: ${enPagina} vistas, img rotas ${malas.length}, scroll lateral ${lateral.length}, errores ${errores.length}; portada: «${votos}»${enPortada ? '' : ', sin enlace'}`);
  } catch (err) { fallos.push('la prueba no corrió: ' + err.message); }
  finally { if (nav) await nav.close(); srv.kill(); }
}

for (const x of avisos) console.log('   aviso: ' + x);
if (fallos.length) {
  for (const x of fallos) console.log('   FALLA: ' + x);
  if (!SECO) console.log('   No hay commit: lo copiado queda en el disco para mirarlo (git -C cantu-revisiones checkout -- galerias/' + G + ' lo deshace).');
  process.exit(1);
}
if (SECO) { console.log('Seco: todo bien.'); process.exit(0); }

// 7 · commit por ruta y push por sha
const rutas = ['galerias/' + G + '/galeria.html', ...(conEstado ? ['galerias/' + G + '/estado.json'] : []), ...nuevas.map((f) => 'galerias/' + G + '/img/' + f)];
if (!git('status', '--short', '--', ...rutas)) { console.log('7 · nada que publicar: igual a lo publicado'); process.exit(0); }
git('add', '--', ...rutas);
const linea = opt('mensaje', `${G}: publicada (md5 ${huella.slice(0, 8)})`);
git('-c', 'user.name=ChrissValdez', '-c', 'user.email=christopherkntu@gmail.com', 'commit', '-q', '-m', `${linea}\n\nmd5 ${huella}; vistas ${vn.size} (nuevas ${altas.length}, cambian ${cambian.length}); img nuevas ${nuevas.length}.\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`, '--', ...rutas);
const s = git('rev-parse', 'HEAD');
console.log(`7 · commit ${s.slice(0, 7)}`);
if (SIN_PUSH) { console.log('   sin push (--sin-push)'); process.exit(0); }
git('fetch', '-q', 'origin');
const delante = git('log', '--format=%h %s', 'origin/main..HEAD').split('\n').filter(Boolean);
if (delante.length !== 1) { console.log('   NO empujo: origin/main..HEAD tiene ' + delante.length + ' commits:\n   ' + delante.join('\n   ')); process.exit(1); }
git('push', '-q', 'origin', s + ':refs/heads/main');
console.log(`   empujado ${s.slice(0, 7)} a origin/main`);
