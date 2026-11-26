// node lineas.mjs --cuenta <cuentachris|cuentapato> | --revisar
// Lee LINEAS.md y ASIGNACIONES.md (al lado) y: (1) revisa que no se contradigan; (2) arma el 📍 Estado como lo ve una cuenta.
// Solo lee; no hace git ni cambia nada. Las reglas están en LINEAS.md, «Las reglas con ASIGNACIONES.md». 2026-11-26.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const CUENTAS = { cuentachris: 'Cuenta Chris', cuentapato: 'Cuenta Pato' };
const ESTADOS = ['activa', 'pausada', 'archivada', 'libre'];
const limpio = (c) => c.replace(/`/g, '').trim();
const filas = (texto, cabecera) => {
  // Las filas de la primera tabla cuya cabecera empieza con `cabecera`.
  const ls = texto.split(/\r?\n/);
  const i = ls.findIndex((l) => l.startsWith('| ' + cabecera + ' |'));
  if (i < 0) throw new Error(`no encontré la tabla que empieza con «${cabecera}»`);
  const out = [];
  for (const l of ls.slice(i + 2)) {
    if (!l.startsWith('|')) break;
    out.push(l.slice(1, l.endsWith('|') ? -1 : undefined).split(' | ').map((c) => c.replace(/^\s*\|?\s*|\s*$/g, '')));
  }
  return out;
};
const lista = (c) => (limpio(c) === '—' ? [] : limpio(c).split(',').map((s) => s.trim()).filter(Boolean));

export function leerLineas(texto) {
  return filas(texto, 'Línea').map(([letra, nombre, cuenta, estado, regresa, repos, desde, nota]) => ({
    letra: limpio(letra), nombre: limpio(nombre), cuenta: limpio(cuenta), estado: limpio(estado),
    regresa: limpio(regresa), repos: lista(repos), desde: limpio(desde), nota: (nota || '').trim(),
  }));
}

export function leerAsignaciones(texto) {
  return filas(texto, 'Repo').map(([repo, area, dueno, estado]) => ({
    repo: limpio(repo).split(' ')[0], completo: limpio(repo), dueno: limpio(dueno), estado: limpio(estado),
  }));
}

export function revisar(lineas, asig) {
  const errores = [];
  const porRepo = new Map(asig.filter((a) => a.repo !== 'aiw-console').map((a) => [a.repo, a]));
  const letras = new Set();
  for (const l of lineas) {
    const n = `Línea ${l.letra} (${l.nombre})`;
    if (letras.has(l.letra)) errores.push(`${n}: la letra ${l.letra} está repetida.`);
    letras.add(l.letra);
    if (!ESTADOS.includes(l.estado)) { errores.push(`${n}: el estado «${l.estado}» no existe (${ESTADOS.join(', ')}).`); continue; }
    const conCuenta = l.estado === 'activa' || l.estado === 'pausada';
    if (conCuenta && !CUENTAS[l.cuenta]) errores.push(`${n}: está ${l.estado} pero su cuenta es «${l.cuenta}»; debe ser ${Object.keys(CUENTAS).join(' o ')}.`);
    if (!conCuenta && l.cuenta !== '—') errores.push(`${n}: está ${l.estado}, así que su cuenta debe ser «—», no «${l.cuenta}».`);
    if (l.regresa !== '—') {
      if (!CUENTAS[l.regresa]) errores.push(`${n}: «Regresa a» es «${l.regresa}»; debe ser una cuenta o «—».`);
      else if (l.regresa === l.cuenta) errores.push(`${n}: «Regresa a» es la misma cuenta que la tiene.`);
    }
    for (const r of l.repos) {
      const a = porRepo.get(r);
      if (!a) { errores.push(`${n}: el repo ${r} no está en ASIGNACIONES.md.`); continue; }
      if (l.estado === 'activa' && (a.dueno !== l.cuenta || !a.estado.startsWith('activo')))
        errores.push(`${n}: está activa con ${l.cuenta}, pero en ASIGNACIONES.md ${r} es de «${a.dueno}» (${a.estado}).`);
      if ((l.estado === 'archivada' || l.estado === 'libre') && !a.estado.startsWith('libre'))
        errores.push(`${n}: está ${l.estado}, pero su repo ${r} sigue tomado en ASIGNACIONES.md (${a.dueno}, ${a.estado}).`);
    }
  }
  // Dos líneas activas de cuentas distintas no comparten repo.
  for (const a of lineas) for (const b of lineas) {
    if (a.letra >= b.letra || a.estado !== 'activa' || b.estado !== 'activa' || a.cuenta === b.cuenta) continue;
    for (const r of a.repos.filter((x) => b.repos.includes(x)))
      errores.push(`Líneas ${a.letra} (${a.nombre}) y ${b.letra} (${b.nombre}): las dos están activas en cuentas distintas y comparten ${r}.`);
  }
  // Todo repo del registro pertenece a alguna línea.
  const usados = new Set(lineas.flatMap((l) => l.repos));
  for (const r of porRepo.keys()) if (!usados.has(r)) errores.push(`El repo ${r} está en ASIGNACIONES.md pero no en ninguna línea.`);
  return errores;
}

const nombre = (l) => `**Línea ${l.letra}, ${l.nombre}**`;
export function estado(lineas, cuenta, errores = []) {
  if (!CUENTAS[cuenta]) throw new Error(`cuenta desconocida: ${cuenta}`);
  const otra = Object.keys(CUENTAS).find((c) => c !== cuenta);
  const de = (l) => (l.cuenta === cuenta ? '' : l.cuenta === '—' ? ', sin cuenta, en traspaso' : `, ${CUENTAS[l.cuenta]}`);
  const prestamo = (l) => (l.regresa !== '—' ? ` (regresa a la ${CUENTAS[l.regresa]})` : '');
  const grupos = [
    [`### 🟢 Aquí (${CUENTAS[cuenta]})`, lineas.filter((l) => l.estado === 'activa' && l.cuenta === cuenta), (l) => `${nombre(l)}${prestamo(l)}: …`],
    ['### ⏸️ Pausadas', lineas.filter((l) => l.estado === 'pausada' || l.estado === 'libre'), (l) => `${nombre(l)}${de(l)}: …`],
    [`### 👤 ${CUENTAS[otra]}`, lineas.filter((l) => l.estado === 'activa' && l.cuenta === otra), (l) => `${nombre(l)}${prestamo(l)}: …`],
  ];
  const out = [];
  if (errores.length) out.push('> ⚠️ LINEAS.md y ASIGNACIONES.md se contradicen:', ...errores.map((e) => '> - ' + e), '');
  out.push('# 📍 Estado');
  for (const [titulo, ls, f] of grupos) if (ls.length) out.push(titulo, ...ls.map((l) => '- ' + f(l)));
  out.push('### 🧩 Otros temas', '- (los trabajos sueltos de esta sesión; se omite si no hay)');
  return out.join('\n');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const AQUI = path.dirname(fileURLToPath(import.meta.url));
  const lineas = leerLineas(fs.readFileSync(path.join(AQUI, 'LINEAS.md'), 'utf8'));
  const asig = leerAsignaciones(fs.readFileSync(path.join(AQUI, 'ASIGNACIONES.md'), 'utf8'));
  const errores = revisar(lineas, asig);
  const i = process.argv.indexOf('--cuenta');
  if (i > 0) {
    console.log(estado(lineas, process.argv[i + 1], errores));
  } else if (process.argv.includes('--revisar')) {
    if (!errores.length) console.log(`EN ORDEN: ${lineas.length} líneas y ${asig.length} filas de ASIGNACIONES.md, sin contradicciones.`);
    else { console.log('SE CONTRADICEN:'); errores.forEach((e) => console.log('  - ' + e)); }
  } else {
    console.log('Uso: node lineas.mjs --cuenta cuentachris|cuentapato   ·   node lineas.mjs --revisar');
    process.exit(2);
  }
  process.exit(errores.length ? 1 : 0);
}
