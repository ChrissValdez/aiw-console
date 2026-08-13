# SUPERFICIE DE REPORTES EN LA CONSOLA

`RUN-CONSOLE-REPORTS-SURFACE-001` — «The reports surface in the console, reached from the run it
belongs to» (`queue_order` 53, derivado del roadmap por orden y verificado contra el título
exacto antes de empezar; no se tecleó el id).

**Todas las cifras de este record son una MEDICIÓN FECHADA DEL 2026-08-10.** Este run monta el
renderizador del `#52` y no lo reescribe: es el segundo que aplica el procedimiento que aquel
piloto dejó escrito, y su §F se leyó entera antes de tocar nada. Los siete consejos de ese §F
aparecen cumplidos o contestados a lo largo de este documento; el segundo («escribe el test de
tokens ANTES») mordió igual que allí, y se cuenta en §D.

---

## A. Qué se entregó, y dónde

| Pieza | Ruta |
|---|---|
| El montaje: modelo del índice, sección del run, capa del reporte, agregación | `project-console/assets/run-report-surface.js` |
| Su chrome (capa, barra de vuelta, sección, panel de la cartera) | `project-console/assets/run-report-surface.css` |
| La capa en la página, y los tres scripts cargados en orden | `project-console/index.html` |
| Ruta del índice, caché por proyecto, sección en el detalle del run, Escape | `project-console/assets/project-console.js` |
| Lectura de los índices de todos los proyectos + panel de la cartera | `project-console/assets/project-shell.js` |
| Fixture de volumen (28 ítems, criterio 6) | `tests/fixtures/reports-volume/CASO-2-volumen-28.report.json` |
| Proyecto de QA con reportes (los cuatro casos + volumen + roto + carpeta vacía) | `tests/fixtures/reports-qa/` |
| Proyecto con índice legible y VACÍO — el estado real de hoy | `tests/fixtures/reports-empty/` |
| Suite del montaje (incluye el veto de 94 tokens y el criterio 6) | `tests/run-report-surface.test.mjs` (21 tests) |
| Suite de la RUTA, conducida por la consola misma | `tests/run-report-route-from-run.test.mjs` (13 tests) |
| Pins de los fixtures de QA | `tests/reports-qa-fixture.test.mjs` (6 tests) |
| `alsoLoad` + un `querySelector` con registro, para cargar los tres scripts | `tests/helpers/console-dom.mjs` |

**El renderizador y su CSS NO SE TOCARON.** `project-console/assets/run-report-renderer.{js,css}`
salen de este run byte a byte como entraron, y `project-console/assets/project-console.css`
también (se verificó con `git diff --stat`: sin salida). No hizo falta ni una dependencia.

---

## B. CÓMO SE MONTA EL RENDERIZADOR (criterio 10)

**Tres scripts clásicos, en el orden en que `index.html` los declara con `defer`:** el
renderizador (`run-report-renderer.js`), el montaje (`run-report-surface.js`) y la consola
(`project-console.js`). Los tres comparten el ámbito global, que es exactamente el mecanismo con
el que el shell ya inyecta los modelos de clasificación y de progreso: la consola llama a
funciones que otro fichero declaró, y nadie importa nada. Dos hojas de estilo acompañan:
`run-report-renderer.css` (la del `#52`, intacta, todo bajo `.rr-root`) y
`run-report-surface.css` (el chrome de este run).

**El montaje vive en fichero aparte a propósito**, y esa es la decisión de diseño de este run. El
renderizador es ciego al dominio y su suite lo prueba mecánicamente; el código que lo monta era
justo el sitio por donde esa propiedad se podía perder sin que nadie mirase. Separándolo, el
mismo veto mecánico corre sobre el montaje (§D). Si el montaje hubiese ido dentro de los 393 KB
de `project-console.js`, no habría forma barata de afirmar lo mismo.

**La puerta está en el detalle del run, y no hay otra.** `v3OpenRunDetail` inserta una sección
`Run report` entre Dependencies y la aprobación humana, construida por
`runReportSectionHtml(model, run_id, { indexPath })`. La consola le pasa un IDENTIFICADOR y una
ruta que nombrar en las ausencias; recibe markup terminado. No hay selector de casos, no hay
navegador global de reportes, y el único disparador (`data-run-report-open`) sólo existe dentro
de un detalle de run.

**Dónde se pinta: una capa a pantalla completa, no el cajón.** El renderizador pinta una
superficie con barra superior propia (`position: sticky`), un raíl de índice y una columna de
880–1180 px; el cajón del run mide 560 px y no la sostiene. La capa (`z-index` 60) se abre SOBRE
el cajón, que queda abierto debajo — por eso la vuelta tiene dónde aterrizar. Medido en
navegador: capa `fixed` de 1280×720 en el viewport, barra de vuelta de 47 px, y la barra del
propio reporte pegada justo debajo, en `top: 47`.

**Cómo se abre.** `openRunReport({ runId, reportUrl, previewBase, title, subtitle, backLabel,
onBack })` hace `fetch` de la ruta, y **entrega el CUERPO COMO TEXTO** a
`renderRunReport(container, texto, { previewBase })`. El montaje no parsea el reporte: no hay un
solo `JSON.parse` en el fichero, y hay un test que lo afirma. Lo único que se deserializa en todo
este camino es el ÍNDICE, y lo hace la consola con el resto de artefactos.

**Cómo se vuelve.** Un pulsador «Back to Run #N» en la barra de la capa, `Escape`, y el `onBack`
que la consola pasa (`v3OpenRunDetail(runId, "back")`). `Escape` cierra PRIMERO el reporte y deja
al operador en el run: cerrar el run por debajo tiraría el juicio a medio escribir que hay en
pantalla. Al cambiar de proyecto la capa se derriba con `{ silent: true }` — sin callback —
porque volver a abrir un detalle del proyecto que se está dejando pintaría el proyecto anterior.

**La base de los previews, que el `#52` dejó abierta en su §F:** `previewBase = REPO_BASE`, o
sea `/projects/<clave>/`. Las rutas de un reporte son relativas al repo que lo emitió y la
consola sirve ese repo bajo su base, así que resuelven dentro del proyecto propietario y nunca
contra los ficheros de la consola. Verificado en navegador con el CASO-3: los dos previews caen
en 404 (sus assets no viajan con el fichero) y cada panel dice **la ruta que no alcanzó**, en
modo Comparar, en vez de fingir un artefacto.

**La única compensación que el montaje añade, y por qué no es un cambio al renderizador.** El
renderizador llama a `window.scrollTo` al cambiar de paso. En esta consola el documento no
scrollea nunca (`body { overflow: hidden }`), así que esa llamada es un no-op y el operador se
quedaba a media página del paso anterior. El montaje escucha en su PROPIO scroller, un nivel por
encima del delegado del renderizador —así corre después del redibujo— y lo lleva a `scrollTop: 0`
cuando la acción es `prev`, `next` o `goto`. Lee que hubo una acción y nada más. Medido: tras un
click en «siguiente» con el scroller en 900, queda en 0 y el contador pasa a `2 / 30`.

---

## C. QUÉ LEE DEL ÍNDICE (criterio 10)

`.project/reports_index.json`, séptimo artefacto emitido, **leído por primera vez**. Hasta este
run la consola lo declaraba y no lo pedía, porque indexar no añadía superficie; el comentario de
`project-console.js` que fijaba «seis de quince» ahora dice siete de dieciséis, y la ruta aparece
en Console Diagnostics como una más.

Lo que la superficie saca de él, y NADA más:

| Campo del índice | Para qué |
|---|---|
| `reports[].run_id` | Casar el reporte con el run. Es el NOMBRE DE LA CARPETA, no un campo de dentro del fichero |
| `reports[].report_path` | La URL que se abre. Se compone contra la base del proyecto; nunca se fabrica desde el `run_id` |
| `reports[].emitted_at` | Se muestra cuando está; ausente, no se muestra nada (el emisor no sustituye por mtime) |
| `reports[].verdict_present` | «no verdict yet» / «a verdict is filed beside it», y el conteo de la cartera |
| `reports[].read_error` | El reporte no parseó: se dice, y **se ofrece abrirlo igual** |
| `reports_source.unresolved[]` con `reason: "no report.json"` | Carpeta filada sin reporte dentro: emisión empezada, no ausente |
| `reports_source.directory_present` | Transportado en el modelo; hoy no se pinta |

**CINCO ESTADOS, porque el índice distingue cinco**, y juntar dos cualesquiera sería afirmar algo
que nadie midió:

1. `index_unavailable` — no hay índice legible. «nothing can be said about this run's report —
   neither that it exists nor that it does not», con el fichero nombrado (§20).
2. `ready` — entrada parseada. Se ofrece abrir.
3. `unreadable` — entrada con `read_error`. Se dice, se muestra el mensaje del parser, y **se
   ofrece abrir**: el operador merece el mensaje del parser, no una ausencia falsa.
4. `filed_empty` — carpeta sin `report.json`. «A folder was filed for this run, and no report was
   written into it. That is a started emission, not a missing one.»
5. `not_emitted` — ni entrada ni carpeta. «No report has been emitted for this run.»

**No se recorre ninguna carpeta.** Ni aquí ni en el servidor: el `report.json` se sirve por el
namespace virtual `/projects/<clave>/…` que ya existía, sin una línea nueva en `serve.mjs`.

---

## D. EL CRITERIO 4 SOBREVIVE AL MONTAJE — y mordió otra vez

`tests/run-report-domain-blind.test.mjs` sigue en verde sin tocarlo: **3 tests, los 94 tokens
vetados, cero apariciones** en `run-report-renderer.{js,css}`. Se corrió antes y después de
montar.

Y se EXTENDIÓ. El primer test de `tests/run-report-surface.test.mjs` deriva los mismos 94 tokens
de los mismos cuatro fixtures, de la misma forma (≥4 caracteres, insensible a mayúsculas, +3
manuales), y los prohíbe en `run-report-surface.{js,css}`. **La primera corrida cazó la palabra
«tests» en un comentario de este propio fichero** —la etiqueta de `locations` del CASO-4— y hubo
que reescribirlo. Es exactamente lo que el §F del `#52` anunciaba que le pasaría al segundo, y
está bien que pasase: la guarda funciona en el sitio nuevo igual que en el viejo.

Ese fue el motivo de sacar el CSS del montaje a fichero propio: al escribirlo primero dentro de
`project-console.css`, el veto cazaba «slide» — un nombre de animación que ya vivía ahí desde
antes y que no tiene nada que ver con este run. Un veto que sólo se puede cumplir editando
código ajeno no es un veto, es ruido; el montaje se separó y `project-console.css` volvió a ser
byte-idéntico.

Un segundo test cierra la puerta por donde el dominio entraría de verdad: el montaje **no lee
ningún campo de un reporte**. Sin `JSON.parse`, con `response.text()` y sin `response.json()`, y
sin un solo `.items`, `.subject`, `.counts`, `.gate`, `.locations`, `.blind_spots`,
`.self_decisions` ni `.verdict_options` en el fuente. Un tercero comprueba que
`reportStateForRun` recibe una CADENA: pasarle un objeto de run no casa con nada, así que no hay
un segundo campo del roadmap que pueda acabar leyendo.

**Montar no exigió meter conocimiento de dominio en la consola, y no hubo que parar.**

---

## E. AGREGACIÓN SÍ, TRADUCCIÓN NO (criterio 3)

En «Project Portfolio», sobre las tarjetas, un panel **«Awaiting a verdict»**. El shell pide en
el arranque un fichero más por proyecto —el índice, no un reporte— y el conteo lo hace el MISMO
modelo que lee el detalle del run: «esperando a una persona» es una pregunta con una respuesta, y
una segunda copia en el shell serían dos verdades en cuanto una se moviera. El shell sólo es la
costura (`verdictPanelHtml`), y sin el montaje cargado no pinta nada en vez de imprimir un total
que nadie midió.

Medido en vivo sobre los seis proyectos del registro de QA:

```
Awaiting a verdict
6 across 4 projects — each one is reached from the run it belongs to
Reports QA Fixture      6   6 of 6 awaiting a verdict · 1 unreadable
Reports Empty Fixture   0   no reports emitted
AIW Console             0   no reports emitted
Cantu Studio            0   no reports emitted
Cantu Quizzes Latex         no reports index
AIW                         no reports index
```

**Es un CONTEO y jamás una puerta.** Hay un test que lo fija: el panel no lleva
`data-run-report-open`, no lleva ningún `<a>`, no imprime ninguna ruta `report.json` y no nombra
ni un solo `run_id`. Un enlace ahí sería el navegador global de reportes que este run no entrega,
y la puerta al reporte es el run.

**Ninguna traducción.** El panel no abre ni un reporte; los cuenta. Y en la superficie del
reporte no hay una sola adaptación: los bytes van del `fetch` al renderizador sin tocarse, y un
reporte no conforme falla en el proyecto que lo emitió.

**La regla de idioma que la `full_description` introduce se cumple y se probó.** El chrome es
traducible (el propio renderizador trae ES/EN y su botón está en la barra); el CONTENIDO no se
traduce nunca. Un test compara el HTML pintado contra el fichero en disco y exige que el titular
del ítem de parada y el `gate_reason` estén ahí, verbatim, en el idioma en que se escribieron.

---

## F. CRITERIO 6 — EL VOLUMEN, CON SU NÚMERO

El fixture: `tests/fixtures/reports-volume/CASO-2-volumen-28.report.json`. Es el run que el
CASO-2 declara en su propio `items_note` — **22 check + 5 decision + 1 info = 28 ítems** — con
los 2 checks, la 1 decisión y el 1 info MEDIDOS tal cual, y los otros 24 replicados. Cada réplica
lo dice dos veces: en `replica_of` (máquina) y en su titular en pantalla («[réplica N de K1] …»).
Ninguna cifra del fichero es una medición nueva: `counts.checks.after` sigue siendo 22, que es lo
que el CASO-2 midió.

**Está en carpeta aparte, y hay que decir por qué.** `tests/run-report-domain-blind.test.mjs:52`
afirma `reports.length === 4` sobre `tests/fixtures/reports/`: meter allí un quinto fichero pone
esa suite en rojo. El §F del `#52` dice que «un quinto fixture extiende el veto solo con copiarse
a la carpeta», y con ese aserto delante no es cierto sin editar la suite. Se eligió no editarla
—los cuatro casos reales son el corpus que el ticket nombra— y el fixture de volumen vive en
`tests/fixtures/reports-volume/`. **Queda dicho para el tercero:** o ese aserto pasa a `>= 4`, o
la frase del §F se corrige.

### Qué aguanta a 28 ítems

El índice, el progreso y el rendimiento aguantan **sin esfuerzo**: 30 pasos (28 ítems + la
decisión propia + el run), 30 filas de índice, contador `1 / 30`, progreso `0 / 30`, la compuerta
pide los 30 veredictos más la firma, y firmando los 30 la salida lleva los 28 ítems. 24,6 KB de
markup. Medido en navegador real: redibujo p50 **3,2 ms**, y un click completo en «siguiente»
(delegación + redibujo + layout) **14,3 ms**.

### A partir de cuántos ítems deja de ser usable

Lo que se midió es el REDIBUJO, porque el renderizador repinta la superficie entera
(`innerHTML`) en **cada cambio accionado** — cada click de veredicto, cada cambio de paso. Ese es
el coste que el operador siente y el único que crece con el número de ítems. El umbral es 100 ms,
el clásico «sigue pareciendo instantáneo» de una manipulación directa.

Navegador real (Chromium, 1274 px de ancho, 21 muestras por tamaño):

| ítems | redibujo p50 | p90 |
|---:|---:|---:|
| 28 | 3,2 ms | 5,2 ms |
| 112 | 6,6 ms | 10,6 ms |
| 448 | 45,7 ms | 52,3 ms |
| 640 | 83,1 ms | 94,4 ms |
| **704** | **101,0 ms** | 106,8 ms |
| 768 | 112,3 ms | 127,6 ms |
| 896 | 150,8 ms | 165,6 ms |

**RESPUESTA: deja de ser usable a partir de ≈700 ítems** — a 640 el redibujo va en 83 ms y a 704
cruza los 100 ms. El crecimiento es superlineal (28→112 son 4× ítems y 2× coste; 112→448 son 4× y
7×), así que el techo no se mueve mucho con la máquina: en la medición sin navegador (construcción
de la cadena HTML sola, en `node:vm`) el cruce está en ≈800 ítems, lo que confirma que **el coste
dominante es la construcción del markup y no el layout**, y que la cifra del navegador es la
operativa.

**Los 28 ítems del run declarado están 25 veces por debajo del techo.** No hay nada que arreglar
aquí, y el techo queda medido para que nadie tenga que volver a preguntárselo.

Dos matices honestos: (1) el raíl indexa 1 fila por paso, así que a 700 ítems el índice es un
scroll de 700 filas — inservible como índice mucho antes de que el reloj se note; el filtro
«Pending / Stops» es lo que lo salva y es del renderizador, no de este run. (2) La medición es de
una máquina y un día; lo que no cambia con la máquina es la FORMA de la curva.

---

## G. CRITERIO 5 — EL VEREDICTO NO SE ESCRIBE

No se añadió ningún `POST`. El montaje hace un `fetch` de lectura y nada más. No hay un solo
`verdict.json` en disco en ninguno de los fixtures entregados, y hay un test que recorre los tres
árboles de fixtures para afirmarlo.

**Una tensión de redacción, que se reporta y no se arregla aquí.** El pulsador de firma del
renderizador se llama **«Write verdict.json»** y lo que hace es DESCARGAR el fichero al equipo del
operador (`Blob` + `<a download>`), tal como el prototipo — está en la §D.6 del record del `#52`.
Leído desde esta superficie, ese verbo suena a escritura en el repositorio, que es justo lo que el
criterio 5 prohíbe. No se toca porque el renderizador no se reescribe. **Para el `#54`:** cuando
llegue el endpoint, o el verbo pasa a ser cierto o la etiqueta se cambia; hoy dice más de lo que
hace. El packet de QA (paso 15) hace que el operador lo compruebe con sus ojos.

---

## H. LA SUITE

**Base verificada antes de tocar nada: 594 / 593 / 1.** Es exactamente la que el `#52` dejó
escrita, y el único rojo es su pin deliberado, `classification-care-budget.test.mjs:153` («this
repo declares no care budget, and that is valid»). No se reparó y no se usó como gatillo.

**Después: 634 / 633 / 1.** 40 tests nuevos, todos en verde, **cero fallos nuevos**, el mismo
único pin. Reparto: 21 del montaje, 13 de la ruta, 6 de los fixtures de QA.

Dos cambios en el arnés compartido (`tests/helpers/console-dom.mjs`), los dos compatibles hacia
atrás y ninguno inventado para hacer pasar un aserto:

- **`alsoLoad`**: carga más scripts clásicos en el MISMO contexto antes del renderizador, que es
  lo que `index.html` hace con `defer`. Sin esto la suite probaría una página que no existe.
- **`stubQuery`**: el cajón del run es el único nodo que el renderizador resuelve por CSS y luego
  escribe (inyecta la píldora de vuelta en `.drawer-header`). Se registra ese hijo y sólo ese; el
  `querySelector` del stub sigue devolviendo `null` para todo lo demás, así que ninguna suite
  anterior cambia de rama. Es un hueco viejo del arnés que este run destapó al ser el primero que
  abre un detalle de run desde los tests.

**QA de navegador real, además de la suite** (con el servidor sobre el registro de QA): la ruta
entera run → reporte → run, el `Escape`, el reporte roto, el cambio de tema (`#f2f3f9` en el
contenedor mientras el cuerpo de la consola sigue en `#1c1d27`), la barra pegajosa, la
compensación de scroll, los previews inalcanzables y las mediciones de la §F.

---

## I. LO QUE SE REPORTA (criterio 8) — nada de esto bloqueó

**1. No hay un solo reporte en disco en todo el espacio de trabajo, y por eso hay fixtures.**
Los cuatro proyectos registrados están así hoy: `aiw-console` y `cantu-studio` emiten el índice y
lista **cero** reportes (`directory_present: false`); `cantu-quizzes-latex` y `aiw` **no emiten
índice** — sus snapshots declaran 4 y 6 artefactos y `reports_index` no está entre ellos, porque
su `.project/` es de un proyector anterior al O4.P17. La superficie lo dice bien en los dos casos
y con frases distintas («no reports emitted» frente a «no reports index»), que es la diferencia
que importa. Pero significa que **la QA humana sobre datos reales sólo podría ejercitar la
ausencia**, así que se entregan dos proyectos de fixture (§J paso 0). Es una observación para el
operador, no un defecto de este run: los emisores de esos dos repos son suyos.

**2. El índice trae todo lo que la superficie necesita.** No hubo que parchear nada ni leer una
carpeta. Los cinco estados de §C salen los cinco del índice, incluido el que casi se pierde:
`unresolved` con `reason: "no report.json"` es lo que separa «emisión empezada» de «nunca
emitido», y sin ese campo habría habido que elegir una de las dos y mentir en la otra.

**3. La ruta desde el run no choca con nada que el ticket no contemple.** El cajón del run ya
tenía pila de navegación y control de vuelta propios; la capa se pone encima y les devuelve el
control al cerrarse. El único roce fue el `window.scrollTo`, resuelto en §B sin tocar el
renderizador.

**4. Ninguna dependencia.** Cero, como el resto de la consola.

**5. El fixture de volumen no cabe en `tests/fixtures/reports/`** por el aserto de los cuatro
casos. Explicado en §F, con la corrección que le toca al tercero.

**6. `design/run-review-prototype.html` YA ESTÁ VERSIONADO.** El §F del `#52` lo dejó dicho como
riesgo abierto («sin versionar, `??` en git»); hoy `git ls-files` lo lista. El modo de fallo que
aquel record temía está cerrado. **Su línea 389 no se leyó** (2,6 MB de bundle), como manda el
ticket.

**7. Superficie de escritura de este run**, medida con `git --no-optional-locks status`: los
ficheros de la tabla de §A y este record. Los ocho sin commitear (`roadmap/roadmap.json` + los
siete de `.project/`) **no se tocaron**: mismos tamaños en bytes antes y después
(150 060 / 94 530 / 98 436 / 3 056 / 2 833 / 1 348 / 150 006 / 162 545) y **LF los ocho**,
verificado en las dos puntas. No se re-emitió `.project/`, no se cambió el status del run, no se
escribió en ningún otro repositorio y no se corrió ningún git que escriba. Los otros tres
proyectos sólo se leyeron.

---

## J. PACKET DE QA HUMANA (criterio 9)

Para el operador. **Cada paso dice qué abrir, qué mirar, qué debería poner ANTES de mirarlo, y
qué significaría que fallase.** Las superficies se nombran como se ven en pantalla. Los cuatro
reportes de `tests/fixtures/reports/` son los casos, y llegan a la consola a través del proyecto
de fixture del paso 0.

### Paso 0 — Arrancar la consola sobre el registro de QA

**Qué abrir.** Una terminal en `projects/aiw-console` y, en PowerShell:

```powershell
$env:PC_REGISTRY = "tests/fixtures/reports-qa/projects.json"; node project-console/serve.mjs
```

Luego, en el navegador: `http://127.0.0.1:8788/project-console/index.html`.

**Qué mirar.** Las dos líneas que el servidor imprime, y la lista de proyectos de la barra
lateral.

**Qué debería poner.** El servidor dice `registry:` seguido de la ruta de
`tests/fixtures/reports-qa/projects.json`. La barra lateral lista **seis** proyectos, empezando
por **Reports QA Fixture** y **Reports Empty Fixture**.

**Qué significaría fallar.** Si dice otra ruta de registro, la variable no llegó: se estaría
haciendo QA sobre el registro real, donde no hay ningún reporte y nada de lo que sigue se ve.
Este paso NO modifica el registro del operador: al cerrar el servidor y volver a arrancarlo sin
la variable, la consola vuelve a sus cuatro proyectos de siempre.

### Paso 1 — El conteo de la cartera

**Qué abrir.** «Project Portfolio», en la barra lateral (es la vista con la que arranca).

**Qué mirar.** El panel **«Awaiting a verdict»**, encima de las tarjetas de proyecto.

**Qué debería poner.** «6 across 4 projects — each one is reached from the run it belongs to», y
seis filas: `Reports QA Fixture 6` con «6 of 6 awaiting a verdict · 1 unreadable»;
`Reports Empty Fixture 0`, `AIW Console 0` y `Cantu Studio 0` con «no reports emitted»; y
`Cantu Quizzes Latex` y `AIW` con **«no reports index»** y sin número.

**Qué significaría fallar.** Que los dos últimos mostrasen un `0` en vez de «no reports index»
sería la consola afirmando que esos proyectos no tienen nada pendiente, cuando lo cierto es que
nadie lo ha medido. Y si alguna fila fuese pulsable, o apareciese ahí el nombre de un run o una
ruta `report.json`, sería el navegador global de reportes que este run NO entrega.

### Paso 2 — Entrar al proyecto y encontrar la cola

**Qué abrir.** «Reports QA Fixture» en la barra lateral; después la pestaña **Roadmap** y el
segmento **Run Queue**.

**Qué mirar.** La lista de runs.

**Qué debería poner.** Ocho runs, del `#1` al `#8`, empezando por «A run whose report is a content
audit» y terminando por «A run for which no report was ever emitted».

**Qué significaría fallar.** Menos de ocho: el fixture se ha movido y los pasos siguientes no
cuadrarán.

### Paso 3 — La puerta al reporte, en el detalle del run

**Qué abrir.** El run **#1**, «A run whose report is a content audit». Se abre un panel por la
derecha.

**Qué mirar.** Bajar hasta la sección **«Run report»** (va justo después de «Dependencies»).

**Qué debería poner.** Cuatro cosas: `emitted 2026-08-08T22:40:00Z`, la ruta
`reports/RUN-QA-REPORT-AUDIT-001/report.json`, la etiqueta **«no verdict yet»** y un pulsador
**«Open the run report»**.

**Qué significaría fallar.** Que no hubiese sección «Run report»: la única puerta al reporte es
esta, y sin ella no hay camino. Que dijese «a verdict is filed beside it»: alguien ha escrito un
`verdict.json`, y este run no escribe ninguno.

### Paso 4 — El primer caso: la auditoría de contenido

**Qué abrir.** El pulsador «Open the run report».

**Qué mirar.** La pantalla entera, y sobre todo la barra de arriba y la primera tarjeta.

**Qué debería poner.** Arriba a la izquierda, **«Back to Run #1»** y, al lado, el título del run y
su identificador. Debajo, la barra del propio reporte: **RUN REVIEW**, `gate · human_judgment`,
`0 / 12` y `1 / 12`. A la izquierda el índice, con la cabecera **INDEX** y **doce** filas, y los
filtros **All / Pending / Stops**. La primera tarjeta es un **stop point**, con el titular
«LA BAJADA — la pregunta estaba clasificada por encima de su nivel» y su razonamiento ya
desplegado. Fondo oscuro.

**Qué significaría fallar.** Una pantalla en blanco, o el índice con un número de filas distinto
de doce. Que la primera tarjeta NO fuese el stop: los stop abren la sesión, y si no lo hacen el
operador juzga en el orden equivocado.

### Paso 5 — La vuelta al run

**Qué abrir.** El pulsador **«Back to Run #1»**. Después repetirlo con la tecla `Escape`.

**Qué mirar.** Qué queda en pantalla.

**Qué debería poner.** El reporte desaparece y **vuelve el panel del run #1**, con su sección «Run
report» y su pulsador otra vez. `Escape` hace exactamente lo mismo.

**Qué significaría fallar.** Que se cerrase también el panel del run y quedase la cola: la vuelta
tiene que aterrizar en el run al que el reporte pertenece, no en la lista. Que `Escape` cerrase el
run por debajo dejaría al operador sin sitio al que volver y tiraría lo que llevase marcado.

### Paso 6 — El caso que declara más ítems de los que trae

**Qué abrir.** Run **#2**, «A run whose report declares more items than it carries» → «Open the
run report». Ir al último paso del índice (la fila «the run») y **desplegar la sección
«Gate and verification»**, que llega plegada.

**Qué mirar.** El contador de la barra, el rótulo de esa sección, y su contenido una vez
desplegada.

**Qué debería poner.** `1 / 6` al abrir. El rótulo de la sección ya lleva la verificación a la
vista: **«Gate and verification · npm test · 436/436»**. Dentro, desplegada, la nota del propio
fichero: «22 ítems check en total; aquí van 2 como muestra. Más 5 de tipo decision y 1 info.»

**Qué significaría fallar.** Que la nota no apareciese. Ese fichero lleva 2 de sus 22 checks y lo
DICE; si la superficie se la come, el operador cree estar juzgando el run entero cuando ve una
muestra. Es el aviso nº 5 del record anterior, y es la razón de que exista el paso 9.

### Paso 7 — El caso con hijos y con previews

**Qué abrir.** Run **#3**, «A run whose report has an item with children» → «Open the run
report».

**Qué mirar.** El índice, y luego el segundo paso (`2 / 6`).

**Qué debería poner.** El índice lleva **seis** filas, y tres de ellas van **indentadas** bajo la
primera: un padre y sus tres hijos se firman por separado. Una de las filas hijas lleva la marca
de parada y **el padre la lleva atenuada**. En el paso `2 / 6` hay dos paneles lado a lado
(**Versión web** y **Versión diapositiva**, en modo **Compare**), y **cada panel muestra la ruta
que no pudo alcanzar** — `reports/RUN-LESSONS-FRACCIONES-EQUIVALENTES-001/assets/…` — porque esos
assets no viajan con el fichero.

**Qué significaría fallar.** Un panel vacío, o un panel que finge un artefacto. Decir la ruta que
no se alcanzó es la conducta correcta; fingir contenido sería lo grave.

### Paso 8 — El caso sin ningún check, con compuerta mecánica

**Qué abrir.** Run **#4**, «A run whose report has no checks at all» → «Open the run report». Ir
al último paso del índice.

**Qué mirar.** La barra de arriba, los rótulos de las secciones del paso del run, y la pregunta.

**Qué debería poner.** `gate · mechanical` en la barra, y `0 / 4`. Los rótulos dicen **«Blind
spots none»**, **«Discarded alternatives none»** y **«Unreviewed none»**, y contando raíl y
sección la palabra **«none» sale seis veces**; **ninguna** dice «sin declarar» / «not declared»:
vacío y ausente son dos hechos distintos y se ven distintos. La verificación viaja en el rótulo
de su sección **con el fallo dentro y sin suavizar**: «Gate and verification · npm test ·
541/540 pass · 1 fail (pin de registro)». Y la pregunta del run es **«Do you accept these
findings?»** — no la de siempre, porque la compuerta es mecánica.

**Qué significaría fallar.** Que algún bloque dijese «sin declarar»: ese fichero declara las tres
listas vacías, y confundirlo con «nadie lo miró» cambia el sentido del veredicto. Que la
verificación apareciese recortada a «npm test» o presentada como si hubiese pasado limpia: el
`1 fail` es del fichero y tiene que llegar entero.

### Paso 9 — El volumen

**Qué abrir.** Run **#5**, «A run whose report carries all twenty-eight of its items» → «Open the
run report».

**Qué mirar.** El contador, el índice, y cualquier tarjeta a partir de la tercera. Después pulsar
«siguiente» varias veces seguidas.

**Qué debería poner.** `0 / 30` y `1 / 30` en la barra, **treinta** filas de índice, y los
titulares de las réplicas empiezan por **«[réplica N de …]»** — ninguna réplica se hace pasar por
una medición. Al pulsar «siguiente» la vista **vuelve arriba** en cada paso y responde al
instante (medido: 14 ms por click).

**Qué significaría fallar.** Que al cambiar de paso la página se quedase a media altura, mostrando
la mitad de la tarjeta anterior. Que se notase espera: a este tamaño no debe notarse nada, y el
techo medido está en unos 700 ítems.

### Paso 10 — Un reporte que no parsea

**Qué abrir.** Run **#6**, «A run whose report does not parse». Leer primero la sección «Run
report» del panel, y luego abrirlo.

**Qué debería poner.** En el panel del run: «…could not be parsed. It opens anyway: the surface
shows the parser's own message rather than an empty screen», con el mensaje del parser al lado, y
el pulsador **sí está**. Al abrirlo: «This report could not be read as JSON. The file on disk is
the authority. Nothing below is rendered because nothing could be parsed: **Unexpected end of JSON
input**» — y **nada** debajo: ni índice, ni tarjetas, ni veredictos.

**Qué significaría fallar.** Una pantalla en blanco (es el fallo que esta superficie existe para
evitar). O un índice pintado encima de un reporte que no existe.

### Paso 11 — Una carpeta filada y vacía

**Qué abrir.** Run **#7**, «A run with a report folder and no report in it». Sólo el panel del
run.

**Qué debería poner.** «A folder was filed for this run, and no report was written into it. That
is a started emission, not a missing one.» **Sin** pulsador para abrir nada.

**Qué significaría fallar.** Que dijese lo mismo que el paso 12. Una emisión a medias y una
emisión que nunca ocurrió son dos hechos, y el operador actúa distinto ante cada uno.

### Paso 12 — Ningún reporte, nunca

**Qué abrir.** Run **#8**, «A run for which no report was ever emitted». Sólo el panel del run.

**Qué debería poner.** «No report has been emitted for this run.», seguido de «Measured from
`projects/reports-qa/.project/reports_index.json`, which lists no entry and no folder for it.»
Sin pulsador.

**Qué significaría fallar.** Silencio: que la sección «Run report» no apareciese. Un run sin
reporte lo tiene que decir, y tiene que decir de dónde lo sabe.

### Paso 13 — Un proyecto con índice legible y vacío

**Qué abrir.** «Reports Empty Fixture» en la barra lateral → pestaña **Roadmap** → cualquiera de
sus dos runs.

**Qué debería poner.** Lo mismo que el paso 12, en los dos runs: «No report has been emitted for
this run.» Es una propiedad del proyecto, no de un run.

**Qué significaría fallar.** Que dijese «could not be read»: ese proyecto SÍ emite el índice, y
confundir «leí y no hay nada» con «no pude leer» invierte el sentido.

### Paso 14 — Los proyectos reales

**Qué abrir.** «AIW Console» en la barra lateral → **Roadmap** → cualquier run. Después la
pestaña **Status** → **Console Diagnostics**.

**Qué debería poner.** En el run: «No report has been emitted for this run.» — es el estado real
de este repositorio hoy. En **Console Diagnostics**, `reports_index.json` aparece bajo **State
Sources** como **Loaded**, y la ruta figura en **Repo Structure** como «Reports index».

**Qué significaría fallar.** Que `reports_index.json` apareciese bajo «Declared sources that
failed to load»: el proyecto declara emitirlo y estaría faltando. (Si se abre «Cantu Quizzes
Latex» o «AIW», que NO lo declaran, la ruta debe salir bajo «Not emitted by this project» y el
detalle de cualquier run debe decir «could not be read» — nunca «no report has been emitted».)

### Paso 15 — El veredicto queda listo, visible, y sin escribir

**Qué abrir.** Volver a «Reports QA Fixture», run **#4** → «Open the run report».

**Qué mirar y hacer.** Marcar un veredicto (`APPROVED`, `CHANGES_REQUIRED` o `BLOCKED`) en cada
uno de los cuatro pasos, escribir un nombre en **«verdict_by — who signs»**, y pulsar **«Write
verdict.json»**. Después mirar la carpeta de Descargas y, por separado,
`projects/aiw-console/tests/fixtures/reports-qa/reports/RUN-QA-REPORT-MECHANICAL-001/`.

**Qué debería poner.** Antes de completarlos todos, el pie dice **«Missing N verdicts and the
signature.»** y el pulsador no hace nada. Al marcar `CHANGES_REQUIRED` aparece una segunda fila,
**«And then»**, con las disposiciones; al cambiar a otro veredicto, desaparece. Con todo marcado y
firmado, el pulsador descarga un `verdict.json` **a la carpeta de Descargas del operador**. En la
carpeta del reporte, dentro del repositorio, **no aparece ningún fichero nuevo**.

**Qué significaría fallar.** Que apareciese un `verdict.json` dentro del repositorio: escribirlo
es el `#54` y esta superficie no lo hace. Ojo con el nombre del pulsador — dice «Write» y lo que
hace es descargar; está reportado en la §G y es la etiqueta del renderizador, no de este montaje.

### Paso 16 — El idioma, y lo que jamás se traduce

**Qué abrir.** Cualquier reporte. Pulsar el botón **EN** de la barra del reporte (pasa a **ES**),
y el botón de tema al lado.

**Qué mirar.** Qué cambia de idioma y qué no.

**Qué debería poner.** Cambian los rótulos de la interfaz: «What to expect», «The reasoning», «If
rejected», los filtros del índice. **No cambia ni una palabra del reporte**: titulares, razones,
antes/después y rutas siguen en el idioma en que se escribieron. El tema claro deja el reporte
sobre `#f2f3f9` **sin aclarar el resto de la consola**, que sigue oscura detrás.

**Qué significaría fallar.** Que se tradujese cualquier texto del reporte. Un reporte es prueba, y
un antes/y/después es una cita literal de lo que hay en disco: un veredicto dado sobre una
traducción no dice nada del fichero. Que el tema claro se derramase sobre la consola entera
significaría que los tokens del renderizador se han salido de su contenedor.

---

## K. Veredicto sobre el procedimiento heredado

El §F del `#52` decía que su criterio de salida «lo ejecuta la consola» quedaba **pendiente hasta
el `#53`**. Queda cerrado: hay un camino real de la consola que llama al renderizador, hay una
suite que lo conduce por ese camino, y hay QA de navegador sobre él. De los siete consejos del
§F, seis se aplicaron tal cual; el séptimo (el nombre del operador a mano en el test de tokens)
viaja heredado, porque este run deriva sus 94 agujas exactamente igual.

Lo que este run añade al procedimiento, para el tercero:

1. **Monta en un fichero aparte y extiende el veto a ese fichero.** Ceguera al dominio del
   renderizador no implica ceguera del montaje, y el montaje es donde el dominio entra sin
   ruido. Cuesta un fichero y una línea de `index.html`.
2. **El veto y el código ajeno no se llevan bien.** Si el chrome nuevo va a parar a un fichero
   viejo, el veto empieza a cazar palabras que llevaban ahí años. Chrome nuevo, fichero nuevo.
3. **El criterio de volumen debería venir con su umbral.** «Comprueba que aguanta» no es
   ejecutable sin decir qué se mide (aquí: el redibujo, porque es por click) ni contra qué
   (aquí: 100 ms). Se eligieron los dos y se dejan escritos para que el siguiente no elija otros
   y luego los veredictos no se comparen — que es el mismo hueco que el `#52` encontró en la
   regla de medición del criterio 4.
4. **Una QA humana necesita un proyecto con datos.** El packet de este run habría sido
   inejecutable —los cuatro repositorios reales tienen cero reportes— si no se entregara un
   proyecto de fixture y la forma de arrancar la consola contra él sin tocar el registro del
   operador. El procedimiento debería pedir esa pieza en el mismo sitio donde pide el packet.
