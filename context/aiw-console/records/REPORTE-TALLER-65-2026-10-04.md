# Reporte del taller del `#65` — transcrito verbatim

Run: `#65` `RUN-CONSOLE-DOCS-TITLE-SEARCH-001` «Search document titles in Docs and in the reader's
list». Trabajo en `00c2e06`; cerrado en `1e91330` con la QA visual del operador.

**Por qué este fichero llega tarde.** La cabina cerró el run leyendo sólo el disco: no tenía este
reporte y lo dijo. El operador lo pegó en la cabina el 2026-10-05, ya cerrado el run. Se transcribe
**verbatim**, sin sustituirlo; lo que la cabina mide sobre él va aparte, al final.

## El reporte del taller

```text
Guarda OK: `run_id`, `title` y `status: active` coinciden. Leo la D-075 y el veredicto.

Guarda verificada; estoy leyendo el lector modal antes de lanzar la línea base de la suite.

Línea base terminada; la reviso.

Línea base 841/840/1 confirmada. Encontré un veto de «sólo lectura» del `#62` que prohíbe cualquier campo en el modal; lo estoy evaluando antes de diseñar.

Ahora verifico las cifras de la cabina (326 y 452) contra los índices reales.

Verifiqué las cifras: la pestaña Docs de `aiw-console` ahora muestra 371 (el índice se re-emitió hoy a las 18:18) y el modal de `cantu-quizzes-latex` confirma 452. Ahora reviso el manejo de Escape y escribo los tests.

Diseño decidido; antes de tocar código capturo «cómo se ve hoy» (golden) y escribo los tests. Miro los fixtures.

Creo el fixture sintético `titulos` y capturo el golden del código sin cambiar.

Golden capturado del código sin cambiar. Escribo ahora la suite nueva.

Tests escritos. Los corro contra el código SIN cambiar:

Antes del arreglo tengo 27 tests nuevos: 21 fallan y 6 pasan (4 son pines de regresión del modal y 2 pasan porque el lector aún no filtra). Ahora implemento la solución.

Ahora el bloque compartido y el árbol en `project-console.js`.

Ahora `renderDocsNav` usa el árbol compartido y pinta el campo:

Ahora el lector modal:

Ahora `index.html` (el hueco del campo encima de la lista) y su comentario, que hoy dice «no field»:

Uso el mismo patrón de campo que ya tiene la consola (`.v3-edit-field`). Estilos compartidos en `project-console.css`:

Dos rojos legítimos: mi consulta «e» lo encontraba todo, y el veto cazó «slide» en un comentario heredado que moví. Corrijo ambos.

Los 27 nuevos en verde. Ahora enmiendo el veto de «sólo lectura» del `#62` para que diga la verdad: el panel tiene ya UN campo, el filtro, y no escribe nada.

Reparo dos escapes que el shell corrompió en la edición del test (un `\b` convertido en carácter de control).

Relacionados 149/149. Lanzo la suite completa y, mientras, preparo la verificación en el navegador.

Hay un servidor de la consola corriendo en 8788 que ya sirve los ficheros nuevos. Me engancho a él (sólo lectura) para verificar.

Suite después: **869 / 868 / 1** — el mismo fallo conocido (`roadmap-engine.test.mjs:93`), ninguno nuevo. Ahora la verificación en el navegador.

Campo presente, 371 ítems, 14 carpetas. Escribo de verdad en el campo, con acento:

Funciona: tras 19 teclas reales el foco sigue en el campo (no se reemplazó) y queda 1 resultado. Captura:

Veo el árbol filtrado con "1 of 371 titles match" y las carpetas Context › AIW Console › Records expandidas. Ahora probaré Escape, el caso sin coincidencias y la restauración de carpetas cerradas con pulsaciones reales de teclas.

Confirmo que en el navegador real Escape vacía el filtro y devuelve el foco, "zzqx" muestra el mensaje de sin coincidencias, y al vaciar el filtro se restauran las carpetas cerradas y las 371 filas. Ahora probaré abrir un resultado y usar "Collapse all" con el filtro activo.

Abrir un resultado funciona y «Collapse all» actúa sobre las carpetas filtradas. Paso al lector modal en `cantu-quizzes-latex`:

Modal: 452 filas ✓, campo enfocado. Escribo con teclas reales:

Modal filtrado: «1 of 452 titles match» → «Estado del proyecto». Clic real en la fila, luego Escape dos veces:

Todo se comporta en el navegador real. Reviso errores de consola y restauro el viewport.

Hay 404 en la consola del navegador; compruebo de qué son antes de darlos por ajenos.

Los 404 son artefactos opcionales que el cargador de la consola siempre solicita (ledgers/, state/, reports_index.json…), ninguno relacionado con el filtro. Ahora cuento las líneas de los ficheros nuevos.

Guardo la memoria del run.

El buscador de títulos está hecho y funciona en las dos listas: el árbol de la pestaña Docs y la lista del lector modal. La suite completa no gana ningún fallo nuevo y no hice nada en git.

**Guarda:** el run 65 es `RUN-CONSOLE-DOCS-TITLE-SEARCH-001`, el título coincide y está `active`. Leí la especificación entera y la D-075.

**Dónde no coincido con la cabina:**
- **326 está desactualizado.** El índice de `aiw-console` se re-emitió hoy a las 18:18 y la pestaña Docs lista **371** documentos (14 carpetas). Lo medí cargando el proyecto real con el arnés de la consola y en el navegador. El encargo no cambia: la lista es aún más larga.
- **Los 452** del lector modal en `cantu-quizzes-latex` sí cuadran.
- **La suite tarda unos 7 segundos** en esta máquina, no más de dos minutos.

**Una cosa que tienes que saber:** un test del `#62` exigía que el modal no tuviera **ningún campo**, y este encargo pide justo uno. No lo trato como condición de parada porque no es un veto de ceguera de dominio. Lo enmendé en [doc-side-reader.test.mjs](tests/doc-side-reader.test.mjs) y quedó más estricto: el único campo del panel es el filtro, de tipo búsqueda, sin `name` ni formulario, y nunca dentro de la lista. La regla de fondo (nada en el lector escribe) sigue igual.

## 1. Ficheros tocados

| Fichero | + / − |
|---|---|
| [project-console.js](project-console/assets/project-console.js) | +223 / −46 |
| [doc-side-reader.js](project-console/assets/doc-side-reader.js) | +83 / −3 |
| [project-console.css](project-console/assets/project-console.css) | +40 / −0 |
| [doc-side-reader.css](project-console/assets/doc-side-reader.css) | +7 / −0 |
| [index.html](project-console/index.html) | +7 / −2 |
| [doc-side-reader.test.mjs](tests/doc-side-reader.test.mjs) | +37 / −2 |
| [docs-title-filter.test.mjs](tests/docs-title-filter.test.mjs) (nuevo) | +544 |
| `tests/fixtures/titulos/` (nuevo, fixture sintético) | +190 |
| `tests/fixtures/docs-title-filter/` (nuevo, 12 HTML de referencia) | +2913 |

La lógica está una sola vez. Las funciones `docTitleFilter*` son globales de la consola y el lector las busca al llamarlas, igual que hace con `renderDocBodyContent`. Si no las encuentra, no ofrece campo y no se fabrica un filtro propio. No toqué `serve.mjs`, el proyector ni `.project/`.

## 2. Tests nuevos
- **27 nuevos: 21 en rojo y 6 en verde contra el código sin cambiar.**
- De los 6 verdes, 4 fijan que la lista del modal con el filtro vacío sigue igual. Los otros 2 pasaban antes simplemente porque el lector no tenía ningún filtro.
- Además, el test enmendado del `#62`.
- La lista vacía se compara **byte a byte** con una referencia capturada del código sin cambiar, en cuatro proyectos de prueba; lo único que se quita antes de comparar es el campo añadido.

## 3. Suite completa
- **Antes:** 841 tests, 840 pass, 1 fail.
- **Después:** 869 tests, 868 pass, 1 fail.
- El fallo es el mismo de siempre (`tests/roadmap-engine.test.mjs:93`, finales de línea).
- Los vetos de ceguera de dominio siguen verdes. Uno de los tests nuevos aplica el mismo veto a cada función del filtro, y cazó la palabra «slide» en un comentario heredado que yo había movido; lo reescribí.
- Salidas: `C:\Users\chris\AppData\Local\Temp\claude\C--Users-chris-Documents-AIW-Workspace\0aeb04e2-c3f3-430c-ab3e-30b689cc6c86\scratchpad\suite-antes.txt` y `suite-despues.txt`.

## 4. Decisiones
- **La ruta no entra en la búsqueda, sólo el título que imprime la fila.**
  - Ninguna de las dos listas muestra la ruta, así que una fila encontrada por su ruta aparecería sin motivo visible.
  - Los tramos comunes de las rutas coinciden con casi todo: `records` está en 345 de las 371 rutas de `aiw-console`, `PAA` en 449 de las 452 de `cantu-quizzes-latex`, y `.md` en todas.
  - El precio: un documento se encuentra por las palabras de su título, no por su nombre de fichero.
- **Cómo compara:**
  - Cada palabra que escribas tiene que aparecer en el título, en cualquier orden, sin distinguir mayúsculas ni acentos.
  - La «ñ» cuenta como «n».
  - Un campo vacío o con sólo espacios muestra todo.
- **Las carpetas mientras hay texto en el filtro:**
  - Sólo se ven las que tienen coincidencias, todas abiertas, y su número entre paréntesis pasa a ser el de coincidencias.
  - Cada carpeta conserva su nombre y su profundidad: el árbol se poda, no se reconstruye a partir de las coincidencias. Si se reconstruyera, una coincidencia solitaria acabaría en «Root».
  - Arriba aparece una línea «N of M titles match».
  - «Collapse all» actúa sólo sobre las carpetas visibles, y se oculta cuando no hay ninguna.
- **Al vaciar el filtro:**
  - Las carpetas vuelven a estar abiertas o cerradas como las dejaste antes de escribir.
  - Lo que hagas con las carpetas mientras filtras se descarta.
- **Sin coincidencias:** una línea, «No document title matches “…”».
- **Escape:** con texto en el campo, lo vacía y no hace nada más (no cierra el modal). Con el campo vacío, se comporta como siempre.
- **En el modal:**
  - El filtro se mantiene mientras abres documentos desde los resultados.
  - Al cerrar el modal se borra.
  - Los documentos archivados aparecen en el modal (su índice los lista) y no en Docs, igual que hoy.
- **El campo nunca se repinta mientras escribes.** Si se reemplazara, perdería el cursor y rompería los acentos de tecla muerta. Lo comprobé en el navegador: tras 19 pulsaciones reales el foco sigue en el campo.

## 5. Cómo abrir cada superficie para la QA
- **Pestaña Docs:** proyecto `aiw-console` → Docs → escribe «contenedores código». Aparece «CONTENEDORES SIN RUNS — MANDA EL CÓDIGO» dentro de Context › AIW Console › Records. Con «hallazgos 67» aparece el documento del `#67`. Para ver la restauración: cierra una carpeta, escribe algo y vacía el campo.
- **Lector modal:** proyecto `cantu-quizzes-latex` → run `#2` («Review ARI-FA-Fracciones…») → reporte → Documents → escribe «estado proyecto». Aparece «1 of 452 titles match» con «Estado del proyecto». Haz clic en él, luego Escape (vacía el campo) y Escape otra vez (cierra el modal).

## 6. Lo que no pude verificar
- **El juicio visual de las dos superficies es tuyo:** espaciado, que el campo se lea bien y si las cuentas te sirven.
- **La tecla muerta de un teclado español físico.** Mis pulsaciones de prueba escribieron «ó» directamente, sin pasar por la composición de acento.
- **El campo no se queda fijo arriba** al desplazar la lista: se va con ella. No lo hice fijo porque habría cambiado cómo se ve la lista con el filtro vacío. Si lo quieres, es un ajuste aparte.
- **No probé** anchos estrechos ni lectores de pantalla.

Lo demás lo comprobé en el navegador con el servidor que ya estaba corriendo, sin arrancar ni parar nada. Los 404 de la consola del navegador son artefactos opcionales que el cargador pide siempre, nada del filtro.

Queda para la cabina: commit, cambiar el status del run y re-emitir `.project/`.
```

## Lo que la cabina mide sobre el reporte — 2026-10-05

1. **El taller tiene razón en el 326, y el error es de la cabina.** La cabina midió 326 entradas en
   `.project/docs_index.json` a las 15:08 del 2026-10-04 y las escribió en el ticket horas después.
   Entre medias, **la propia cabina re-emitió `.project/` tres veces** (la inserción de siete runs y
   los dos cierres), y cada re-emisión recoge los documentos nuevos del repo: 371 tras la de las
   18:19, 372 hoy. Es la cuarta forma de fallar de las reglas: una medición propia que envejeció
   dentro de la misma sesión.
2. **La suite: los dos números son ciertos y son de máquinas distintas.** ~7 s es en el Windows del
   operador, donde corre el taller; más de dos minutos es en la VM Linux de la cabina, que lee el
   disco a través del montaje. El ticket del `#66` repitió la cifra de la cabina: el taller la medirá.
3. **La cabina no vio, al leer el disco, que el taller ENMENDÓ un test de regresión del `#62`** —el
   que exigía «ningún campo» en el lector modal— y su parte de cierre dijo «respetó el alcance» sin
   nombrarlo. Estaba dentro del alcance (`tests/`) y el test quedó **más estricto**, no más laxo
   (verificado en `00c2e06`: un solo `<input>`, `type="search"`, sin `name`). **Se declara ahora**
   porque el operador pasó la QA sin saberlo.
4. **Quedan sin verificar, y el `closeout_result` no los nombra:** la tecla muerta de un teclado
   español físico (el taller escribió «ó» directo, sin composición); el campo no queda fijo al
   desplazar la lista; anchos estrechos y lectores de pantalla.
