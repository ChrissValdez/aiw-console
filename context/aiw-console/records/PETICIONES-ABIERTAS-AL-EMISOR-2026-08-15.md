# Peticiones abiertas al emisor `cantu-quizzes-latex` — 2026-08-15

**Escrito por:** hilo `aiw-console` · **Medido el 2026-08-15 entre las 16:04 y las 16:15 CST.**

Este documento es el **contrato entre hilos en forma de fichero**, en el sentido de salida:
lo que este hilo pide al emisor. **No se escribe ni un byte en su repo.** Cada petición va
con el comando que la produjo, y **son peticiones, no imposiciones**: su cola es suya.

**Aprobadas por el operador el 2026-08-15.** Las dos primeras venían del relevo; la tercera
la encontró el operador mirando la pantalla durante la QA del `#60`, que es exactamente lo
que ninguna medición de la cabina había visto.

---

## 1. Que commiteen la adopción del sobre

Su árbol tiene la adopción **sin versionar**, y **nuestros fixtures copian ese disco**. Si se
descartara, tendríamos pruebas apuntando a algo que nunca existió en la historia.

*(Medido el 2026-08-15 a las 16:04: el reporte en su árbol es de las 11:00 de hoy.)*

## 2. `QZ-R-06`

Dicen que va citada en `header_satisfies` y **en el reporte hay cero apariciones de
`QZ-R-06` ni de ningún `QZ-R-*`**. Puede que se refieran a su perfil. **Sin confirmar.**

## 3. NUEVA — el campo `command` lleva una nota pegada dentro

**Cómo apareció:** el operador la vio en pantalla durante la QA del `#60` y le chirrió.
**Tenía razón, y la consola no tiene la culpa: pinta el dato verbatim, que es su obligación.**

El valor en disco, medido con `repr` para que se vean los espacios:

```
'xelatex -shell-escape Matematicas.tex  (con los tres \\input de Fracciones activos)'
```

**Por qué importa, y es más que cosmético:**

- Un campo que se llama `command` existe **para poder reproducirlo**. Ése, copiado tal cual,
  **no corre**: el `\input` lo rompe.
- Y el paréntesis **no es adorno: es una precondición**. El comando solo **no** reproduce el
  resultado — hay que descomentar tres líneas antes. La nota es necesaria, y el sitio donde
  está la inutiliza para las dos cosas: ni el comando se puede copiar, ni la precondición se
  lee como el requisito que es.

**Y hay casa para ella, sin inventar nada.** Medido en
`project-console/assets/run-report-renderer.js` (líneas 233, 255 y 1632): el renderizador
**ya pinta `verification_note`** en la raíz del reporte, con etiqueta escrita en los dos
idiomas — **«Nota sobre la verificación»** / *"Note on the verification"*. El reporte **no
trae esa clave** (medido: `'verification_note' in report` → `False`).

**La petición:** que `verification.command` lleve el comando y nada más, y que la
precondición viaje en `verification_note`.

**Quién lo escribió:** el propio bloque declara
`derived_by: "cabina, leyendo el .log del arbol el 2026-08-15"`. **Es de su cabina, no de su
taller.**

### Lo que NO se pide, y se declara

**No se toca el contrato del sobre.** Medido: el sobre v1 obliga a que la clave
`verification` **exista** y regula el caso `null` **con su razón** (§ tabla de la línea 125),
pero **no dice nada de la forma de dentro** — ni que `command` deba ser reproducible tal cual.
**Esto no viola ninguna regla: cae donde no hay regla.**

Se decidió **no** subirlo a decisión numerada hoy. Razón declarada: el contrato está
**CONGELADO como v1** y sólo se mueve por decisión numerada; con **un** caso medido no se
sabe si el patrón —prosa metida en un campo que promete dato— es un caso suelto o una
familia. **El catálogo de criterios es quien lo va a enseñar**, porque su `check` obliga a
distinguir enunciado de chequeo en cada ficha. Si aparece una segunda vez, entonces sí: una
decisión que diga que un campo que nombra un comando lleva el comando y nada más.

---

## 4. Lo que su commit de hoy provocó en NUESTRO repo — no es petición, es un hecho nuestro

Su commit `b2e3ede` movió el reporte a las **11:00**, **un minuto después** de que el `#60`
commiteara a las **10:59**. Consecuencia medida a las 16:04 con
`diff` de los dos ficheros normalizados a LF, **completo y no truncado — 40 líneas, 4 hunks,
enumerados los cuatro**:

`tests/fixtures/reports/CASO-1-audit-contenido.report.json` **ya no es byte a byte con su
original.** Difieren en: `gate` (`both` vs `human_judgment`), el bloque `verification` entero,
el `why_not` del punto ciego con su marca `[RESUELTO]` y su bloque `resolved`, y el bloque
`compilation` de los recuentos.

**Ninguna de las cifras que la suite fija toca ese bloque** — 14 citados · 13 cumplidos ·
16 declarados · 0 en silencio siguen siendo las del reporte de hoy. **El `#60` no queda
tocado.**

**Pero la identidad declarada de esa copia —«copia versionada del piloto», byte a byte— hoy
es FALSA.** Es un texto vencido de la misma familia que persigue el `#65`, sólo que recién
nacido. **Queda nombrado, sin decidir aquí**: refrescar la copia es barato pero vuelve a
envejecer con el commit siguiente del emisor, y esa es una pregunta de diseño de fixtures que
no se resuelve de paso durante una QA.
