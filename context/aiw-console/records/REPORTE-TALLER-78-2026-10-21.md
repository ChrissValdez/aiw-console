# Reporte del taller — `#78` `RUN-CONSOLE-UI-POLISH-001` — 2026-10-21

«Polish the console's visual design without changing what it does». Taller Fable 5.1, esfuerzo Max.
**EJECUTADO, sin commitear.** El árbol queda con cuatro ficheros modificados, todos en
`project-console/assets/`. Nada se escribió en disco por la consola: ningún botón que escribe fue
pulsado; los «Preview…» que se usaron son POST en seco (`apply:false`) y sólo sobre el fixture
`tests/fixtures/lanes/project`, que quedó byte-idéntico (`git status --porcelain` no lo lista).

## 0. Guarda y línea base

| Qué | Medido | Comando |
|---|---|---|
| `queue_order` 78 en `roadmap/roadmap.json` | `run_id` `RUN-CONSOLE-UI-POLISH-001` · `title` «Polish the console's visual design without changing what it does» · `status` `active` · `work_class` `UX_DESIGN` · objetivo «Global Console», fase «The console as a product» | `node -e` recorriendo `objectives[].phases[].runs[]` y filtrando `queue_order === 78` (un único run) |
| Árbol antes de tocar | `git status --porcelain` vacío | `git status --porcelain` |
| HEAD | `c2be3dd9758cad13bda26e9ac0a729d5a0b68d13` (`#78 … alta y apertura del pulido visual de la consola`), como dijo la cabina | `git rev-parse HEAD` |
| Suite antes | **982 / 982 / 0** (tests / pass / fail), 9674 ms | `node --test` en la raíz |
| Suite después del pulido | **982 / 982 / 0** | `node --test` |
| Suite después de la corrección del `sticky` (última edición) | **982 / 982 / 0** | `node --test` |
| Árbol al terminar | `M project-console/assets/doc-side-reader.css` · `M project-console/assets/project-console.css` · `M project-console/assets/project-console.js` · `M project-console/assets/run-report-surface.css` — nada fuera de `project-console/` | `git status --porcelain` |
| Tamaño del cambio | +584 / −1 líneas (CSS consola +551, lector +20, superficie del reporte +12, JS 1 línea sustituida) | `git diff --stat` |

El `full_description` se leyó entero; sus límites (sin cambio de conducta, datos, rutas, escritura,
motor ni servidor; textos de etiquetas intactos; ningún test editado; suite verde; capturas antes y
después tomadas por el taller) mandan sobre el ticket y se cumplen. Donde el disco contradice a la
guía del `#77` se dice abajo (§1).

## 1. Inventario: la guía del `#77` contra el código de hoy

Las 18 superficies S1–S18 de `context/aiw-console/records/GUIA-RECORRIDO-77-2026-10-20.md` siguen
existiendo y se llega a ellas como dice la guía. Lo que cambió desde su medición (`e6662b3`):

- La cola de AIW Console se movió: el `#77` está cerrado, el `#78` es este run (activo), el `#79`
  que la guía usaba como ejemplo CRITICAL es ahora un run **cerrado** («Expose the four container
  operations…», retirado sin ejecutar), y los CRITICAL vivos son el `#81` y el `#82`. Las capturas
  del detalle usan el `#79` (clasificación de 5 campos, cerrado), el `#78` (activo, sólo clase) y
  el `#77` (cerrado con cierre largo), que juntos cubren los tres estados del detalle.
- Phd P2 Experiment tiene ahora **2** runs vivos sin clasificar (`#9`, `#10`); el `#5` de la guía
  está cerrado y sigue pintando «Classification 0» (H1).
- Las superficies que la guía da como no visibles con datos reales se capturaron con fixtures:
  sección «HTML report» (`tests/fixtures/html-reports`), selector «Batch» (una registry propia que
  apunta a `tests/fixtures/batches/project`), tarjeta degradada del Portfolio
  (`tests/fixtures/multi`: «roto»), «Handle the dependents before removing» y el diff de previsualización
  (`tests/fixtures/lanes/qa-projects.json`, en seco), formulario editable del care budget (AIW
  Console con «Editing on», sin confirmar).

## 2. Cómo se midió

- Consola real: `PC_PORT=8797 node project-console/serve.mjs` (el 8788 y el 8790 estaban ocupados
  y no se tocaron). Fixtures: `PC_PORT=8798 PC_REGISTRY=tests/fixtures/multi/projects.json`,
  `PC_PORT=8799 PC_REGISTRY=tests/fixtures/html-reports/projects.json`,
  `PC_PORT=8800 PC_REGISTRY=<ruta absoluta>\herramientas\batches-registry.json`,
  `PC_PORT=8801 PC_REGISTRY=tests/fixtures/lanes/qa-projects.json`. Los cinco se apagaron al terminar.
- Capturas: el repo no tiene dependencias y no hay puppeteer en el workspace, así que se escribió un
  driver de 180 líneas sobre el protocolo DevTools de Chrome (`herramientas\shot.mjs`: Node 24 con
  `WebSocket` nativo + `chrome.exe --headless=new`). Un guion (`herramientas\plan.json`, 58 tomas)
  navega, pulsa y captura; el **mismo guion** corrió antes y después, a 1440×900 y, donde el
  amontonamiento cambia, a 1024 de ancho. Reproducir:
  `node herramientas\shot.mjs herramientas\plan.json <carpeta>` (con los cinco servidores arriba).
- La página de comparación: `node herramientas\build-comparison.mjs herramientas\notes.json comparacion.html`
  (imágenes embebidas en base64; 15,7 MB; 58 pares, con el nombre de la superficie tal como se ve en
  pantalla y una línea por cambio).
- Las cifras de «antes» de H1/H7/H8 son las de la guía del `#77`; las de «después» se midieron con
  `getBoundingClientRect()` en el navegador interno de la sesión, sobre la consola en el 8797.

## 3. Por superficie: qué cambió y por qué

Todo el pulido vive en **un bloque al final** de cada hoja (`[#78] VISUAL POLISH` en
`project-console.css`, y un bloque corto al final de `doc-side-reader.css` y de
`run-report-surface.css`), para que se lea en un sitio y se deshaga en un revert. Cada regla
restablece un valor que una regla anterior ya posee o añade un estado que faltaba. Tokens existentes;
sin colores nuevos, sin fuentes, sin dependencias.

### Los ejemplos del operador

**S10 · Editor (Edit run / phase / objective / Insert run).**
- Los campos numéricos («Move to position», «Position (1 to 83)», «Move to position (1 to 2)») no
  los cubría ninguna regla —sólo `input[type="text"]`— y salían con el cuadro claro del navegador a
  940 px de ancho para un número de dos cifras. Toman el estilo de los demás campos y se acotan a 180 px.
- «Preview all changes», la acción principal del editor, se estiraba a todo el ancho del modal
  (`.v3-edit-actions` era una columna flex) vestida como cualquier botón secundario. Ahora tiene su
  ancho, el acento de la consola (`--accent-solid`, el mismo de «Confirm and write» y «Open Project»)
  y su nota al lado. «Preview swap» / «Preview removal» siguen secundarios: son acciones aparte.
- Una casilla y su rótulo se apilaban en vertical («Archived», «I mean this as…», «Retire the
  progress record…») porque el campo es una columna; van en una fila, con la casilla en acento y el
  rótulo en frase (misma letra, sin la transformación a mayúsculas; véase §5).
- Títulos de bloque 12 → 12,5 px y en blanco, para separarse de las etiquetas de campo (11 px,
  mayúsculas, terciario); las notas 12 → 12,5 px, interlineado 1,4 → 1,5 y un máximo de 78
  caracteres por línea (corrían a ~150). La nota de cabecera del modal 12 → 13 px, secundario.
- Foco: los campos y selects tomaban el anillo blanco del navegador; ahora llevan el anillo de
  acento de la consola (`--accent-underline`, 2 px) y el borde `--accent-border`. Cursor de mano en
  los selects.
- Cabecera del modal 20/28 → 18/26 px de padding y título 20 → 19 px.

**S5 · Detalle de un run.** El «texto amontonado»:
- Las filas de Classification daban a su etiqueta 72 px en mono de 10 px con 0,08 em de tracking:
  «CORRECTNESS MODEL», «FAILURE SURFACES» y «CLASSIFIED AT» se partían en dos líneas y las dos
  filas derivadas en tres para meter la marca «derived». La columna pasa a **128 px**, 10,5 px y
  0,07 em: medido en el `#81` (7 etiquetas almacenadas), todas a **una línea** (16 px de alto);
  «CORRECTNESS MODEL» ocupa ≈121 px. La marca «derived» baja bajo su etiqueta, en las dos filas por
  igual (35 px de alto, dos líneas a propósito). A ≥1600 px la columna es 156 px.
- Los contadores de sección («Dependencies 0», «Classification 5») eran un número mono suelto junto
  al título; pasan a **píldora contadora**, el mismo idioma que los grupos de la cola. Es la
  resolución visual de **H1** (véase §6).
- Las frases dentro de una sección («none — this run has no upstream dependencies», el párrafo «No
  risk classification yet…») eran mono 12,5 px en `#565e6e` (2,6:1 sobre el panel). Se leen como
  frases: sans 13 px, terciario (≈5:1). Las notas mono de una línea de la cola conservan su aspecto.
- La nota de Progress de un run cerrado imprimía todo el cierre —párrafos de hasta quince líneas—
  en mono verde de 12,5 px. La única línea de JS que cambia: el «run closed» y el texto del cierre
  quedan en dos `span` (mismo texto, dos clases). El «run closed» conserva mono y verde; el cierre
  se compone como frase (sans 13,5 px, interlineado 1,6, terciario).
- El `run_id` de la cabecera sube de `#666e7e` a terciario: es la identidad y lo que más se copia.
- Las celdas de metadatos cortaban un valor largo con una elipsis que el botón de dentro no podía
  dibujar («Held by barrier» quedaba cortado a media palabra en el fixture); los valores envuelven.

**S2 · Project Portfolio.**
- Las tres columnas de cada tarjeta se centraban en vertical: en una tarjeta alta (Cantu Studio,
  ocho objetivos) el nombre del proyecto flotaba a media altura y «Open Project» con él. Todas
  arrancan arriba; el botón se ancla al pie de la tarjeta (`margin-top: auto`), donde se espera la
  acción de una tarjeta. A ≤1300 px, donde la columna de estado baja a lo ancho, el estado y el
  botón van en una sola línea.
- En «Awaiting a verdict» la fila era `1fr / auto / 2fr`: la cifra flotaba a media anchura, lejos
  del proyecto que cuenta. Ahora el nombre toma su ancho, la cifra le sigue y la nota ocupa el resto
  (`run-report-surface.css`).
- Etiquetas de los contadores («planned», «active»…) en versalitas con 0,05 em, como las demás
  etiquetas de sección de la tarjeta; filas de objetivos con 6 px de alto en vez de 5.
- El título de la marca en la barra lateral termina en elipsis en vez de cortarse a media letra
  (visible con la registry de prueba «Consola de prueba (fixtures)»).

**S4/S7 · Las etiquetas en las filas.** Clase, gravedad, cierre y carril iban en línea con el
texto del título, así que cuando el título envolvía (todas las filas a 1024, dos a 1440) las
etiquetas se repartían una en cada línea. El título es ahora una línea flex que envuelve: un título
corto conserva sus etiquetas al lado; uno largo envuelve como texto y las etiquetas caen detrás como
grupo, centradas en su línea. El marcado no se toca (lo fijan los goldens); sólo la disposición.

### El armazón

- **Estados que faltaban.** Los botones tenían transición y ningún hover; botones y campos tomaban
  el anillo blanco del navegador al enfocar. Un hover para `.btn-primary` (`--accent-underline`) y
  `.btn-secondary` (borde más claro, fondo `--bg-inset`); un anillo de acento de 2 px para botones,
  pestañas, segmentos, ítems de la barra lateral, filas y cabeceras del árbol de Docs, enlaces de
  Status y campos. «Editing on» (el toggle con `aria-pressed="true"`) muestra su estado con fondo y
  borde de acento.
- **Dos tokens que no existían.** `--mono` (usado por las etiquetas de carril, orden global, clase
  y la nota derivada del editor) nunca se declaró, así que esas etiquetas caían en la mono del
  sistema en vez de la de la consola; ahora usan `--font-mono`. `--bg-default` (campos y
  previsualización del care budget) tampoco: los campos del formulario no tenían fondo; ahora
  `--bg-inset`. `--green-text` tenía fallback a texto primario; el estado «Applied» usa `--green`.
- **Avisos (`.readonly-banner`).** Eran una fila flex de tres frases: con una frase larga en medio
  la última se aplastaba en una columna estrecha al borde derecho (medido en el fixture de lotes con
  13 ficheros ausentes). Se leen como un párrafo. Afecta al aviso de fuentes opcionales, al de
  proyecto no renderizable y a los de ausencia de cada panel.
- **Barra de herramientas del Roadmap a 1024.** Se desbordaba: «Edit roadmap» quedaba cortado por
  el borde del panel (pestañas 293 px + selector de clase + dos botones no caben en 712 px). Bajo
  1180 px de ventana los controles pasan a una segunda línea alineada a la derecha y las pestañas
  conservan su subrayado. A 1280 y más nada cambia.
- **Modo edición en el árbol.** El «N of M done» se iba al centro de la banda porque el grupo
  Edit / Add run también pedía `margin-left: auto`; queda a la derecha y los botones le siguen.
- **Contraste en el texto más tenue que lleva información** (≤12 px): contadores de sub-pestaña,
  notas vacías, cuentas a cero, rótulo «Current work item / Next up», «TODAY», SHA y hora de cada
  commit (eran `#565e6e`, 2,6:1) suben un paso (`--text-faint` o terciario). La escala recesiva del
  prototipo se conserva en todo lo demás.

### El resto

- **S8 · Project configuration.** Un diálogo de 680 px compuesto en 11 px. Un paso arriba en todo
  (11 → 12, 11,5 → 12,5): consejo, razón, tabla (filas 4 → 6 px de padding), nota de sin clasificar
  y lista de runs. Los campos del formulario tienen fondo y anillo de foco.
- **S14 · Docs (H8).** El bloque de controles (título, «Collapse all», filtro) queda fijo arriba de
  la columna mientras el árbol pasa por debajo. Medido tras bajar 800 px en Cantu Studio: el campo
  queda a **55 px** del borde superior visible (antes: 691 px por encima). En reposo la columna no
  se mueve (CONSOLE (1) sigue en el mismo píxel en las capturas antes/después). Detalle técnico: un
  bloque `sticky` no puede salir del content-box de su scroller, así que el `padding-top: 24px` de
  `.docs-nav` lo habría dejado 24 px corto y con filas asomando por encima (ocurrió en la primera
  pasada y se corrigió); ese inset pasa al bloque fijo y `.docs-nav` queda a 0 arriba; la navegación
  sin documentos conserva su inset por `#docs-nav-list > .docs-nav-title`.
- **S6 · Lector (H8).** La ranura del filtro (`.dsr-filter:not(:empty)`) queda fija arriba del
  índice con una línea fina debajo. Medido tras bajar 1000 px el índice de Cantu Quizzes Latex: el
  filtro a **0 px** del borde (antes: 884 px por encima); en reposo la cuenta «452 documents indexed
  by this project» sigue visible bajo el filtro (a 75 px del borde). El lector no redeclara ninguna
  regla compartida (lo fija el test) y la ranura vacía cede su inset al bloque siguiente.
- **S15 · Status › Console Diagnostics.** «NOT EMITTED» cabía en dos líneas en una columna de 92 px;
  112 px, una línea.
- **S12 Overview, S13 History, S7 Roadmap, S16 selector LANE, S17 sección Run report, S18 reporte:**
  sin cambio de diseño; sólo lo transversal de arriba (foco, contraste, etiquetas de fila, mono).

## 4. Ficheros tocados

| Fichero | Cambio |
|---|---|
| `project-console/assets/project-console.css` | +551 líneas al final: el bloque `[#78] VISUAL POLISH` (todas las reglas de §3) |
| `project-console/assets/doc-side-reader.css` | +20 líneas al final: la ranura del filtro fija y el inset de la ranura vacía |
| `project-console/assets/run-report-surface.css` | +12 líneas al final: las columnas de la fila de «Awaiting a verdict» |
| `project-console/assets/project-console.js` | 1 línea (`v3ProgressTimeline`): el «run closed» y el texto del cierre en dos `span`; mismo texto |

`index.html` no se tocó: todo cupo en CSS, y sus regiones están fijadas por los tests
(`console-default-tab`, `project-config-surface`, `doc-side-reader`, `docs-title-filter`).

## 5. Lo que dejé sin tocar y por qué

- **`run-report-renderer.css` / `.js` (S18).** Es el prototipo congelado del `#52`, con sus propios
  tokens `--rr-*` y sus tests de dominio; `index.html` dice «loaded, never edited». Fuera.
- **El marcado de las filas de la cola y del árbol, el selector de carril, la sección Classification
  y el panel del care budget.** Los fijan byte a byte `tests/fixtures/work-class-ui/class-less-render.golden.json`
  (`surfaces.run-queue-v3`, `roadmap-v3-tree`, `roadmap-lane-slot`, `rowTags`, `section`) y
  `tests/fixtures/project-config/care-budget-panel.golden.json`; el árbol de Docs y la lista del
  lector, los goldens de `tests/fixtures/docs-title-filter/`. Ahí sólo CSS.
- **La anchura del cajón (560 px), la escala ≥1600 px, el layout de Overview, History y Governance.**
  Diseño del prototipo que al operador le gusta; no había amontonamiento que resolver.
- **Los colores de estado y la escala recesiva** salvo los seis usos de ≤12 px nombrados en §3.
- **Las notas del editor como texto**: su longitud y su cantidad son del operador; sólo se acotó la
  medida de línea.
- **El `.v3-edit-danger`** (sin estilo propio): el fichero dice «state is distinguished by weight
  and copy, not colour» y se respeta.
- **La transformación a mayúsculas de los rótulos de casilla** se quitó (presentación, no texto):
  «I mean this as a project-wide synchronisation point» en mayúsculas de 11 px no se leía. Si el
  operador prefiere mayúsculas, es una regla (`.v3-edit-check .v3-edit-label`).

## 6. Los tres hallazgos de la auditoría pausada

- **H1 · «Classification 0» sin unidad — resuelto visualmente, con propuesta.** El contador pasa de
  número mono suelto a píldora contadora (la de los grupos de la cola), así que un cero se lee como
  «cero elementos» y no como un nivel. Añadir la unidad en palabras («0 fields», «none», «not
  classified») cambia texto en pantalla y el marcado de la sección está fijado por golden: va como
  propuesta (§7). Se ve en Phd P2 Experiment `#5` y en el fixture lanes `#6`.
- **H7 · Lector a 66ch con tablas a todo el ancho — RENUNCIADO: lo bloquean dos tests.**
  `tests/doc-side-reader.test.mjs:1590` fija que la regla `.dsr-measure p, li, blockquote` existe
  y sólo declara `max-width: 66ch`; `:1614` fija que los únicos selectores `.dsr-measure <elemento>`
  del lector son exactamente `p`, `li` y `blockquote` («prose only — no table, no pre, no figure»).
  Acotar las tablas (o quitar la medida de la prosa) exige editar esos tests, y el run lo prohíbe.
  Propuesta en §7.
- **H8 · El filtro no quedaba fijo — resuelto en las dos listas** (Docs y lector), con las medidas de §3.

## 7. Propuestas no aplicadas

1. **H1, palabra de unidad.** Que `v3ClassificationSection` pinte «0 fields» / «5 fields» (o «none»
   para el cero) en el contador. Cambia texto y el golden `section[...]`; es un run propio.
2. **H7, decisión del operador.** Dos salidas: (a) acotar en el lector también tablas, código y
   `hr` a la misma medida (una regla `.dsr-measure div:has(> table), .dsr-measure pre, .dsr-measure hr
   { max-width: 640px }` —640 px es el 66ch de la prosa a 18 px—, más la edición de los dos tests);
   (b) dejarlo como está (la hoja del lector argumenta que las tablas no se leen en líneas y que
   acotarlas cuesta scroll horizontal). El taller no decide.
3. **«Preview all changes» en acento.** Es un juicio de diseño: la acción principal del editor con
   peso propio. Si el operador prefiere que sólo «Confirm and write» lleve acento, se quita la regla
   `.v3-edit-actions > .btn` y el botón queda secundario con su ancho natural.
4. **El cierre de un run como párrafos.** El texto del cierre sigue siendo un `span` en una línea
   continua; partirlo por puntos sería interpretar el texto. Si se quiere, es un run de marcado.
5. **La pestaña «Status» atenuada (0,55)** y el engranaje sin etiqueta: se dejan como están; son
   decisiones del `#67` y D-075.

## 8. Rutas de capturas (Windows, completas)

Carpeta: `C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\`
- Página de comparación: `C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\comparacion.html`
- Este reporte: `C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\REPORTE-TALLER-78-2026-10-21.md`
- Herramientas de captura: `C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\herramientas\`
  (`shot.mjs`, `plan.json`, `notes.json`, `build-comparison.mjs`, `batches-registry.json`)

Un par por superficie (mismo nombre en `antes\` y `despues\`):

```text
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\antes$f
C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\despues$f
```

## 9. Estado final

```text
$ git status --porcelain
 M project-console/assets/doc-side-reader.css
 M project-console/assets/project-console.css
 M project-console/assets/project-console.js
 M project-console/assets/run-report-surface.css

$ git diff --stat
 project-console/assets/doc-side-reader.css    |  20 +
 project-console/assets/project-console.css    | 551 ++++++++++++++++++++++++++
 project-console/assets/project-console.js     |   2 +-
 project-console/assets/run-report-surface.css |  12 +
 4 files changed, 584 insertions(+), 1 deletion(-)
```

La cabina decide el commit (uno solo, propio, para que deshacerlo sea un `git revert`), el estado del run y la re-emisión de `.project/`.
