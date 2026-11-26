// node --test: las reglas de LINEAS.md contra ASIGNACIONES.md (lineas.mjs).
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import { leerLineas, leerAsignaciones, revisar, estado } from './lineas.mjs';

const L = (filas) => `| Línea | Nombre | Cuenta | Estado | Regresa a | Repos | Desde | Nota |\n|---|---|---|---|---|---|---|---|\n${filas.join('\n')}\n`;
const A = (filas) => `| Repo | Área | Dueño | Estado | Desde | Nota |\n|---|---|---|---|---|---|\n${filas.join('\n')}\n`;
const chequeo = (l, a) => revisar(leerLineas(L(l)), leerAsignaciones(A(a)));

test('los ficheros reales no se contradicen', () => {
  const u = new URL('.', import.meta.url);
  const errores = revisar(leerLineas(fs.readFileSync(new URL('LINEAS.md', u), 'utf8')),
    leerAsignaciones(fs.readFileSync(new URL('ASIGNACIONES.md', u), 'utf8')));
  assert.deepEqual(errores, []);
});

test('línea activa cuyo repo es de la otra cuenta', () => {
  const e = chequeo(['| A | Dashboard | `cuentachris` | activa | — | `r1` | x | |'], ['| `r1` | x | `cuentapato` | activo | x | |']);
  assert.match(e.join(), /es de «cuentapato»/);
});

test('línea archivada con repo tomado', () => {
  const e = chequeo(['| G | Studio | — | archivada | — | `r1` | x | |'], ['| `r1` | x | `cuentachris` | activo | x | |']);
  assert.match(e.join(), /sigue tomado/);
});

test('dos líneas activas de cuentas distintas no comparten repo', () => {
  const e = chequeo(['| B | Mate | `cuentachris` | activa | — | `r1` | x | |', '| F | Rev | `cuentapato` | activa | — | `r1` | x | |'],
    ['| `r1` | x | `cuentachris` | activo | x | |']);
  assert.match(e.join(), /comparten r1/);
});

test('repo sin línea, letra repetida, estado inventado y préstamo a sí misma', () => {
  const e = chequeo(['| A | X | `cuentachris` | activa | `cuentachris` | — | x | |', '| A | Y | `cuentapato` | dormida | — | — | x | |'],
    ['| `r9` | x | — | libre | x | |']);
  assert.equal(e.length, 4);
});

test('el Estado se ve al revés desde cada cuenta y oculta las archivadas', () => {
  const ls = leerLineas(L(['| A | Dash | `cuentachris` | activa | — | — | x | |', '| C | Esp | `cuentapato` | activa | — | — | x | |',
    '| G | Studio | — | archivada | — | — | x | |']));
  const chris = estado(ls, 'cuentachris'), pato = estado(ls, 'cuentapato');
  assert.match(chris, /Aquí \(Cuenta Chris\)\n- \*\*Línea A/);
  assert.match(pato, /Aquí \(Cuenta Pato\)\n- \*\*Línea C/);
  assert.doesNotMatch(chris + pato, /Studio/);
  assert.doesNotMatch(chris, /Pausadas/);
});
