# CORRECCIONES DEL QA DE CARRILES, Y LA REGLA DE IDIOMA DE LA CONSOLA

> Encargo de taller. Tres correcciones sobre lo entregado en D-051, detectadas por el operador
> en el QA visual con el fixture: **(A)** numeración local al carril cuando hay filtro,
> **(B)** tipografía del selector de carril, **(C)** el idioma de la interfaz.
>
> Fecha: 2026-07-27. **Ningún comando de git que escriba.** Git se usó SOLO EN LECTURA:
> `status --porcelain` (probar intacto, antes y después, aquí y en `cantu-studio`),
> `diff`/`show HEAD:` (reconstruir el renderer pre-corrección para el A/B en memoria del
> Bloque E). No se tocó ningún record existente, ni `CONTRATO.md`, ni `DECISIONES.md`, ni el
> roadmap, ni el fork D-035 (`docs/project-console/`), ni el prototipo retirado (`console/`),
> ni el tooling viejo (`tools/project-console/`). **`cantu-studio` quedó intacto**
> (`git status --porcelain` VACÍO antes y después). El motor
> (`tools/roadmap/`), el emisor (`tools/projector/`), el server (`project-console/serve.mjs`)
> y el markup (`project-console/index.html`) **no se tocaron en un byte**: esta corrección
> vive entera en el renderer, su CSS y los tests.
>
> **NO SE RESERVA NÚMERO DE DECISIÓN.** Estas tres correcciones no cambian el contrato: A y B
> corrigen la VISTA que D-051 entregó aplicando los principios de D-051 sin moverlos, y C es
> una regla de producto que se fija aquí (y que `DECISIONES.md` — fuera de alcance para este
> encargo — podrá recoger cuando la cabina quiera). Las marcas en el código dicen
> `[D-051 QA-A]`, `[D-051 QA-B]` y `[UI language: English]`, nunca un `D-052` que nadie
> registró.
>
> **Archivos escritos por este encargo, y ninguno más:**
> `project-console/assets/project-console.js` (A + una cadena de comentario) ·
> `project-console/assets/project-console.css` (A + B) ·
> `project-console/assets/project-shell.js` (C: una cadena de UI) ·
> `tests/fixtures/carriles/` → **renombrado** a `tests/fixtures/lanes/` y traducido entero,
> con su `.project/` re-emitido · `tests/roadmap-lane-numbering.test.mjs` (NUEVO, 9 tests) ·
> `tests/roadmap-lanes.test.mjs`, `tests/roadmap-engine.test.mjs`,
> `tests/serve-write-routes.test.mjs` (C: idioma; ninguna aserción cambió de significado) ·
> este record. Además `.project/git_history.json` de ESTE repo, reescrito por el test de sync
> de la suite (derivado con emisor propio — la misma nota de O4.P12 F.2 y de D-051 G).
> **Los dos canónicos reales: byte-idénticos** (md5 en Bloque F).

---

## BLOQUE A — Numeración local al carril

### A.1 El defecto, dicho como lo dijo el operador

Con un carril activo en el filtro, las filas seguían mostrando el `queue_order` GLOBAL. El
primer run del carril de documentación aparecía como **#3**, el siguiente como **#7**, luego
**#8**, luego **#10**. La cola se leía SALTEADA — que es exactamente el desorden visual que
los carriles existían para quitar. Un orden global leído a través de un filtro no es un
orden: es una muestra.

### A.2 La regla, como queda

| Estado | Posición PRIMARIA de la fila | Dónde queda el otro número |
|---|---|---|
| **Sin filtro** (All lanes) | el `queue_order` **global** — sin cambio alguno | la etiqueta de carril `<lane_id>-NN` que D-051 ya ponía |
| **Con un carril activo** | la posición **dentro del carril**: 1, 2, 3… contigua | un chip secundario en la MISMA fila: **`#8 global`** |

Aplica a **las dos subvistas del Roadmap**: la Run Queue **y el árbol Roadmap**, que sí
muestra la misma numeración (`#N` en la línea de título) y recibió el mismo criterio. Nunca
discrepan sobre qué significa el número de una fila.

**El chip de carril y el chip global se turnan, no se suman.** Con el filtro puesto, la
etiqueta `<lane_id>-02` junto a una fila numerada `2` repetiría dos tercios de sí misma (el
selector ya nombra el carril, y todas las filas visibles están en él). Lo que el filtro
ESCONDE es el orden global, y eso es lo que el chip lleva. **Una etiqueta en cada estado: la
fila no crece ni un píxel.**

### A.3 Dónde vive cada número, exhaustivamente

- **Fila de la Run Queue**: primaria en el `v3-order-tile` (filas vivas) o en el `#N` en línea
  (filas de History). Secundaria: `v3-global-order-tag`.
- **Fila del árbol Roadmap**: primaria en el `#N` de la línea de título. Secundaria: el mismo
  chip.
- **Detalle del run (drawer)**: **SIEMPRE global, con filtro o sin él.** El drawer es la
  superficie de IDENTIDAD del run, no una lista ordenada: su cabecera dice `#7` y su celda
  "Run order" dice `#7 of 12`, mientras la celda **"Lane"** lleva `<lane_id>-02` — es decir,
  la posición dentro del carril está ahí también, en la etiqueta que D-051 ya definía. Se
  eligió así porque desde el drawer se navega a dependencias de OTROS carriles (el botón
  "Held by barrier" salta a un barrier ajeno): dos runs de carriles distintos serían ambos
  "#1" en una misma pila de navegación. Medido en DOM: fila clicada "2" → drawer `#7`
  + `Run order = #7 of 12` + `Lane = CHRONICLE-02 Chronicle — documentation`.
- **Referencias cruzadas** ("Waiting on: #4 Component 2", las dependencias del drawer, el
  "Back to Run #7"): **global siempre**. Apuntan a otros runs, posiblemente de otros carriles,
  y el global es el único lenguaje correcto entre carriles.
- **Overview**: no lo alcanza el filtro (el selector vive en la barra de subvistas del
  Roadmap), así que sigue en global, sin una línea de cambio.

### A.4 Se DERIVA. Cero posiciones almacenadas: el invariante de D-051 intacto

La posición dentro del carril sale de FILTRAR el `queue_order` global por carril resuelto —
la misma derivación que D-051 ya usaba para las etiquetas. `v3RunPosition(model, run)` lee
`laneInfoByRunId`, que el modelo calcula al leer y no persiste en ninguna parte.

Probado por dos tests distintos:

1. **Recorrido de claves** sobre los SEIS archivos JSON que participan — el canónico del
   fixture, sus TRES emitidos (`.project/roadmap.json`, `snapshot.json`, `docs_index.json`) y
   **los dos canónicos reales** — buscando cualquier clave del tipo `lane_position`,
   `lane_order`, `lane_index`, `position_in_lane`, `lane_seq`, `lane_label`… **Ninguna
   existe.** (Más el pin previo de D-051: toda clave de run ⊆ allowlist.)
2. **Reproducibilidad**: la secuencia se recalcula desde el canónico, sin ningún estado de
   consola, y coincide con la que el DOM pinta. Si alguna posición se leyera de un archivo,
   esa igualdad no podría sostenerse.

### A.5 Medido en DOM, con el fixture, en los dos estados

Server real con el registro QA. Filas de la Run Queue, `posición [chip]`:

| Carril | Filas | `queue_order` global de esos runs |
|---|---|---|
| **All lanes** | `4 [FORGE-03]` `3 [CHRONICLE-01]` `5 [FORGE-04]` `6 [FORGE-05]` `7 [CHRONICLE-02]` `8 [CHRONICLE-03]` `9 [SAIL-01]` `10 [CHRONICLE-04]` `11 [FORGE-06]` `12 [SAIL-02]` `#1 [FORGE-01]` `#2 [FORGE-02]` | el global, intacto |
| **FORGE** | `3` `4` `5` `6` · History `#1` `#2` → **1…6** | `#1 #2 #4 #5 #6 #11` |
| **CHRONICLE** | `1` `2` `3` `4` | `#3 #7 #8 #10` ← **el defecto exacto que reportó el operador** |
| **SAIL** | `1` `2` | `#9 #12` |

Cada fila filtrada lleva su chip `#3 global`, `#7 global`, `#8 global`, `#10 global`, y CERO
etiquetas de carril. El árbol Roadmap con el mismo filtro rinde `#1 #2 #3 #4` y los mismos
cuatro chips. Volver a "All lanes" restituye el HTML **byte a byte** (test).

---

## BLOQUE B — La tipografía del selector

El control estaba en **11 px** (etiqueta) y **12 px** (`<select>`) en una fila donde las
subvistas van a **22 px** y el botón "Edit roadmap" a **13 px**: leía como letra pequeña al
lado de aquello a lo que pertenece.

Queda en **14 px** el `<select>` — que es el tamaño que ESTE stylesheet ya usa para
desplegables (`.select-sm`, 14 px) — y **12 px** la etiqueta `LANE`, un escalón por debajo.
Padding `3px 8px` → `5px 10px`, gap 7 → 8, margen 14 → 16, `max-width` 250 → 280 px.
**Solo tamaño y espaciado**: ni un color, ni una familia tipográfica, ni un elemento nuevo;
`color`, `background` y `border` siguen siendo los mismos tokens por referencia
(`--text-primary`, `--bg-subtle`, `--border-default`, `--text-tertiary`).

**Medido en DOM, computado, en las dos anchuras:**

| Medición | 1280 | 1920 |
|---|---|---|
| Toolbar (ancho × alto) | **962 × 49** | **1602 × 49** |
| Alto del toolbar en `aiw-console` / `cantu-studio` (sin selector) | **49** | **49** |
| `<select>` | 280 × 33 px, `font-size: 14px` | 280 × 33 |
| Hijos del toolbar | `segmented-control` x=284 w=496.6 · `roadmap-lane-slot` x=780.6 w=352.1 · `roadmap-edit-controls` x=1132.7 w=113.3 | ídem, corrido |
| ¿Renglón nuevo? | **NO** — los tres hijos en la misma fila | **NO** |
| Scroll horizontal (página / toolbar) | **ninguno / ninguno** | **ninguno / ninguno** |
| Ancho de las dos subvistas | **962 / 962** | **1602 / 1602** |

El alto de la fila lo sigue marcando el `.segment` (48 px); el selector mide 33 px y **no
toca la altura del toolbar**: 49 px con selector y sin él, en los tres proyectos. El ancho y
el padding de las fases anteriores quedaron donde estaban.

---

## BLOQUE C — La regla de idioma, tal como queda fijada

> **La INTERFAZ de la consola es producto y va en INGLÉS.** Etiquetas, mensajes, estados
> vacíos, textos de error, ayudas, nombres de tests, comentarios de código y **fixtures de
> prueba** (que son código, no contenido) se escriben en inglés — como la consola de Cantu de
> la que esto se trasplantó.
>
> **El CONTENIDO de cada proyecto va en el idioma que el proyecto use.** Títulos y resúmenes
> de runs, descripciones, documentos, tokens de status: la consola los muestra VERBATIM, no
> los traduce y no opina sobre ellos. Es el mismo principio que ya gobierna los vocabularios:
> **el proyecto declara, el consumidor obedece.**
>
> La frontera es limpia y ya estaba dibujada por el código: lo que la consola INVENTA va en
> inglés; lo que la consola TRANSPORTA va como venga.

### C.1 Corregido en `project-console/` (cadenas y comentarios)

| Archivo | Qué era | Qué es |
|---|---|---|
| `assets/project-shell.js:148` | `"(sin status)"` — **cadena de UI real**: el cubo sintético del contador de runs sin token de status | `"(no status)"`, con el comentario que dice por qué esta sí es de la consola y los tokens de al lado no |
| `assets/project-console.js:14` | comentario `// Capa 1, the ONE required artifact` | `// Layer 1, …` |

**Y nada más: no había más español en `project-console/`.** El barrido (Bloque C.4) devuelve
cero sobre `.js`, `.css`, `.html`, `serve.mjs` y `projects.json`.

### C.2 El fixture de carriles: traducido entero y RENOMBRADO

`tests/fixtures/carriles/` → **`tests/fixtures/lanes/`**. Es código de prueba introducido por
la fase anterior, y su ruta se lee tanto como su contenido.

| Antes | Ahora |
|---|---|
| `fixture.carriles.v1` / `FIXTURE-CARRILES` / `"Carriles y barriers — fixture"` | `fixture.lanes.v1` / `FIXTURE-LANES` / `"Lanes and barriers — fixture"` |
| `package.json` name `fixture-carriles` (⇒ `project_id: fixture_carriles`) | `fixture-lanes` (⇒ `fixture_lanes`) |
| Carriles `FORJA` / `CRONICA` / `VELA` | **`FORGE`** / **`CHRONICLE`** / **`SAIL`** |
| `"Forja — construcción"` · `"Crónica — documentación"` · `"Vela — operación"` | `"Forge — building"` · `"Chronicle — documentation"` · `"Sail — operations"` |
| 3 objetivos, 4 fases, 12 runs: títulos, `summary` y `full_description` en español | los mismos, en inglés |
| Registros `"Carriles fixture registry"` / `"AIW Console (QA: reales + fixture de carriles)"`, clave `carriles` | `"Lanes fixture registry"` / `"AIW Console (QA: real projects + lanes fixture)"`, clave **`lanes`** |

Las claves siguen siendo **arbitrarias a propósito** — es su función: el pin que prohíbe
hornear un `lane_id` en motor/emisor/server/renderer/markup sigue verde con las tres nuevas
(y **cazó un comentario mío** durante el desarrollo, que es exactamente su trabajo).
Los `run_id` no se tocaron: ya estaban en inglés y son identidad.

El canónico pasa invariantes y hace **roundtrip byte-idéntico**; su `.project/` se **re-emitió**
con el emisor de siempre (`node tools/projector/project.mjs tests/fixtures/lanes/project` —
0.9.0, sin cambios) porque su FUENTE cambió: 3 objetivos / 12 runs, `lanes` verbatim.

### C.3 Corregido en el código de tests

| Archivo | Qué se tradujo |
|---|---|
| `tests/roadmap-lanes.test.mjs` | rutas y claves del fixture, los tres `lane_id`, `FANTASMA`→`PHANTOM`, `NUEVA`/"Carril recién declarado"→`NEWLANE`/"Newly declared lane", proyectos temporales `roto`/`atascado`→`broken`/`stuck`, títulos "Componente 3"→"Component 3", un nombre de test |
| `tests/roadmap-engine.test.mjs` | el árbol de fixture en línea: "Primer objetivo"→"First objective", "Fase uno"→"Phase one", `RUN-FIX-UNO/DOS/TRES/NUEVO-001`→`ONE/TWO/THREE/NEW`, "Uno/Dos/Tres/Nuevo", "Tres renombrado", "Nunca debe quedar"/"Debe quedar", `RUN-OTRO-PROYECTO-001`→`RUN-OTHER-PROJECT-001`, `RUN-DE-NADIE-001`→`RUN-NOBODYS-001` |
| `tests/serve-write-routes.test.mjs` | "Objetivo"→"Objective", "Fase"→"Phase", `-UNO/DOS/TRES-001`→`-ONE/TWO/THREE-001`, "Movido por otro editor"→"Moved by another editor", "Dos editado por confirm"→"Two edited by confirm", "Objetivo ajeno editado"→"Foreign objective edited", `otro.proyecto.plan.v9`→`other.project.plan.v9` |

**Ninguna aserción cambió de significado**: son datos de fixture y literales que las mismas
aserciones comparan consigo mismas. Suite verde antes y después de cada tanda.

### C.4 El barrido, y su resultado

Barrido por acentos (`áéíóúüñ¿¡`) **y** por lista de palabras españolas, sobre contenido Y
sobre rutas (script en el scratchpad; el mismo criterio para las tres superficies):

| Superficie | Resultado |
|---|---|
| `project-console/` (js, css, html, serve.mjs, projects.json) | **CERO** |
| `project-console/README.md` | 1 línea: cita el NOMBRE de un record (`PORT-IDENTICO-CONSOLA-O4-P11.md`). Es una referencia a un documento del operador, no una cadena de UI. **No tocado.** |
| `tests/fixtures/lanes/` | **CERO** |
| `tests/roadmap-lanes.test.mjs`, `tests/roadmap-lane-numbering.test.mjs`, `tests/roadmap-engine.test.mjs`, `tests/serve-write-routes.test.mjs` | **CERO** |

### C.5 ESPAÑOL HALLADO Y **NO** CORREGIDO — para que la cabina decida

Tres cosas quedaron en español, y las nombro sin tocarlas.

**(1) Los fixtures ANTERIORES a las fases recientes.** El encargo acota el barrido a "lo que
las fases recientes introdujeron", y estos son de O4.P2/P3 y de las fases de Docs. Traducirlos
NO es un cambio de cadenas: sus claves y sus RUTAS están afirmadas en cinco archivos de test,
así que es un renombre transversal de la suite. Lista exacta:

- `tests/fixtures/multi/` — registro `"Consola de prueba (fixtures)"`; proyectos `hilo-verde`,
  `roto`, `vacio`; `hilo-verde/README.md` ("Nota del telar"), `hilo-verde/docs/trama.md`
  ("La trama, explicada"), su `.project/` entero (roadmap, snapshot, docs_index, guardrails,
  no_claims); `roto/.project/snapshot.json` (clave `"nota"`); `vacio/LEEME.txt`.
  **Afirmados en**: `shell-switch`, `shell-server`, `shell-model`, `shell-two-real-projects`,
  y por regex de fuga de identidad en `projector-cantu` y `projector-docs-transport`.
- `tests/fixtures/rutas/` — `mixto/` y `bajo-una-carpeta/`, con rutas de documento
  (`manual/instalacion/paso-1.md`, `manual/uso/diario.md`, `notas/suelta.md`,
  `notas/ARCHIVE-POLITICA.md`, `documentacion/guia/a.md`, `documentacion/referencia/c.md`,
  `LEEME.md`, …) y sus `docs_index.json`. **Afirmados en** `docs-path-grouping` — y el
  agrupamiento por ruta ORDENA por esas rutas, así que renombrarlas puede mover asertos de
  orden. Es el más delicado de los tres.
- `tests/fixtures/declarado/` — `todo-presente/`, `falta-uno/`, `sin-declaracion/`,
  `con-revision/`, más su `README.md`. **Afirmados en** `declared-sources-and-docs-mode`.

**Y una advertencia sobre `hilo-verde` en particular:** su vocabulario de status
(`por_hacer` / `haciendo` / `hecho` / `atascado`; `pendiente` / `empezado` / `en_marcha` / …)
es **deliberadamente ajeno** — existe para que cualquier vocabulario horneado en el shell
falle a la vista. Traducirlo a `todo`/`doing`/`done` lo volvería *menos* ajeno y por tanto un
peor test. Si la cabina manda traducir ese fixture, mi recomendación es traducir su PROSA
(README, docs, títulos) y **dejar los tokens de status como están**, con la razón escrita al
lado.

**(2) `tests/shell-two-real-projects.test.mjs`** afirma sobre la cadena `"Consola global"`.
No es español del test: es un **título de run del roadmap real de aiw-console**, usado como
marcador de fuga entre proyectos. Por la regla misma de C, el contenido del proyecto no se
traduce — así que esto es correcto tal cual, y lo será mientras el roadmap real lo diga así.

**(3) Fuera de alcance por mandato explícito del encargo, y no medido:** el contenido de los
roadmaps reales, los records existentes, `CONTRATO.md`, `DECISIONES.md` y los handoffs. Son
documentos de trabajo del operador; su idioma es decisión suya, aparte. (Este record se
escribe en español por consistencia con esa carpeta: **un record no es interfaz.**)

---

## BLOQUE D — Tests

**224/224 verde** (`npm test`): 215 previas + **9 nuevas** en
`tests/roadmap-lane-numbering.test.mjs`. Ningún pin previo cambió de significado.

Las nueve, por criterio de aceptación:

1. **Sin filtro**: la posición primaria es el `queue_order` global en las DOS subvistas; 12
   filas, máximo 12; 12 etiquetas de carril y **cero** chips globales.
2. **Con filtro, los tres carriles**: la Run Queue y el árbol numeran `1..n`, contiguos, sin
   un solo hueco (la contigüidad se afirma vecino a vecino, y el primero es 1).
3. **El defecto, pinneado por su forma**: el carril de 4 runs (globales `#3 #7 #8 #10`) lee
   `1 2 3 4`, con sus cuatro chips `#N global` en ambas subvistas, y **cero** etiquetas de
   carril. El carril se busca por FORMA, no por nombre: tampoco este test hornea una clave.
4. **Apagar el filtro** restituye el HTML de las dos subvistas **byte a byte** — el estado es
   de display y no deja residuo.
5. **El drawer habla global** con el filtro puesto: `#7`, `Run order = #7 of 12`, y la celda
   `Lane` con `…-02`.
6. **Cero posiciones almacenadas** (A.4, punto 1).
7. **Reproducibilidad desde el canónico** (A.4, punto 2), más que el orden global crece
   estrictamente dentro de cada carril — que es lo que hace la secuencia estable Y contigua.
8. **Sin regresión, en DOM, sobre los DOS reales**: cero hijos en el slot del selector, cero
   etiquetas de carril, cero chips globales, cero marcas de barrier; y **un carril seleccionado
   a la fuerza sobre un proyecto sin carriles no cambia un byte** de ninguna subvista.
9. **Los conteos reales contra los canónicos en disco**: 35 posiciones en `aiw-console`, 53 en
   `cantu-studio`, y el conjunto de números pintado **igual** al conjunto de `queue_order` del
   archivo.

Nota de método: el filtro es un `let` de módulo, así que el test lo mueve dentro del contexto
`vm` (`v3SelectedLane = …; renderRunQueueV3(appData)`) — que es el gesto que hace el propio
handler del `<select>`. El único apaño del harness es una cabecera de drawer para el test 5:
el renderer la alcanza por selector CSS y el stub indexa por id.

---

## BLOQUE E — Sin regresión: el A/B contra el renderer anterior

Método D.4 de O4.P12: renderer **pre-corrección** reconstruido con `git show HEAD:` y corrido
en el mismo harness de DOM, contra el vigente, sobre los dos proyectos reales.

| Comparación | Resultado |
|---|---|
| `aiw-console` — 21 superficies pintadas | **IDÉNTICAS, byte a byte** |
| `cantu-studio` — 21 superficies pintadas | **IDÉNTICAS, byte a byte** |

Las 21 son todas las que el renderer pinta directamente (Overview, Run Queue, árbol, History,
Docs, Governance, State/Sources, drawer, avisos) más `document.title`. **Cero diferencias.**

Y en navegador real, misma sesión, los dos reales:

| Medición | `aiw-console` | `cantu-studio` |
|---|---|---|
| Slot del selector / etiquetas / chips globales / marcas de barrier | **0 / 0 / 0 / 0** | **0 / 0 / 0 / 0** |
| Filas de cola · grupos | 35 · Now 1 / Upcoming 9 / History 25 | 53 · Now 0 / Upcoming 51 / History 2 |
| Subtabs | Run Queue 10 · Roadmap 2 | Run Queue 51 · Roadmap 7 |
| Árbol | 2 objetivos / 16 fases / 35 filas | **7 objetivos / 28 fases / 53 filas** |
| Ancho de las dos subvistas @1280 / @1920 | **962 / 1602 en AMBAS** | **962 / 1602 en AMBAS** |
| Toolbar | 962×49 / 1602×49 | 962×49 / 1602×49 |
| Scroll horizontal | ninguno | ninguno |

(Las cifras de ancho de D-051 eran 962.4/1602.4 en la máquina del operador; aquí el mismo
número sin el decimal de su barra de scroll. Lo que importa es que **las dos subvistas
coinciden entre sí** y que el número no se movió con el cambio.)

---

## BLOQUE F — Verificación sin daño: los números

| Verificación | Resultado |
|---|---|
| `aiw-console/roadmap/roadmap.json` | md5 `0a4c2d919279e1272c8f5400b78bbc2b` **antes = después** |
| `cantu-studio/.aiw/roadmap/roadmap.json` | md5 `58803b0afcae10142d5fe788ae9959ea` **antes = después** |
| `cantu-studio` entero | `git status --porcelain` **VACÍO antes y después**; no se leyó ni se ejecutó nada suyo |
| Motor, emisor, server, markup | `git diff --stat` **vacío**: `tools/`, `project-console/serve.mjs`, `project-console/index.html` sin tocar |
| Aditividad de la proyección | trivial y verificada: el emisor **no cambió**, así que la proyección por el camino viejo es idéntica **incluso en `generated_from`** |
| `.project/` de este repo | **NO se re-emitió** — el cambio no lo exige (ver F.1). Solo `git_history.json` quedó reescrito por el test de sync de la suite (derivado, emisor propio) |
| `.project/` del fixture de carriles | **SÍ re-emitido**: su fuente cambió (la traducción) |

### F.1 Por qué NO se re-emitió `.project/` de aiw-console, medido

Reconstruidos los cinco artefactos EN MEMORIA con el emisor vigente y comparados contra el
disco, línea a línea, normalizando `generated_at` y `mtime`:

- `roadmap.json`, `guardrails.json`, `no_claims.json`: **1 sola línea distinta cada uno** —
  `generated_from: aiw-projector@0.9.0` vs `@0.8.0` en disco.
- `snapshot.json`: esa línea **más** el bloque `emitted_artifacts`, que lo añade el ESCRITOR y
  no el constructor. Contenido idéntico.
- `docs_index.json`: esa línea más **2 documentos nuevos** —
  `records/ANCHO-DE-SUBVISTAS-CAUSA-RAIZ-FLEX.md` y `records/CARRILES-Y-BARRIERS-ROADMAP.md`.

Es decir: **todo el desfase que existe es de las DOS fases anteriores**, que decidieron
igualmente no re-emitir, y es exactamente el "byte-idéntico salvo `generated_from`" que el
criterio nombra. Este encargo no añade ni un byte de desfase: no toca el emisor ni el
canónico. Re-emitir aquí sería hacer, de paso, un cambio que nadie pidió. **Queda dicho, con
la medición al lado, para que la cabina lo ordene cuando quiera.**

---

## BLOQUE G — Qué queda abierto

1. **Los fixtures anteriores en español** (C.5.1): tres carpetas, cinco archivos de test,
   renombre transversal. Nombrados uno a uno, sin tocar. Decisión de la cabina.
2. **La regla de idioma en `DECISIONES.md`**: aquí queda escrita, pero `DECISIONES.md` está
   fuera de alcance. Si la cabina la quiere numerada, es una entrada de una línea que apunta a
   este record.
3. **Re-emisión de `.project/`** (F.1): el desfase de 0.8.0 → 0.9.0 y los dos records nuevos
   siguen esperando la decisión de re-emitir. Este record será el tercero.
4. **Nada de D-051 se reabrió**: barriers, `set-lane`, el transporte, los invariantes y el
   teorema quedan como estaban. BATCH sigue fuera. Ningún roadmap real se migró a carriles.

---

## REPORTE para QA del operador

Ningún proyecto real declara carriles todavía (a propósito), así que lo nuevo se ve con el
FIXTURE. El registro QA sirve los tres reales MÁS el fixture. **En PowerShell** (el reporte
anterior lo dio en bash; esto es lo que hay que pegar):

```powershell
$env:PC_REGISTRY = 'tests/fixtures/lanes/qa-projects.json'
$env:PC_PORT = '8799'
node project-console/serve.mjs
```

Abre <http://127.0.0.1:8799/project-console/index.html>. Para volver al registro real de
siempre, cierra esa ventana o limpia las variables:

```powershell
Remove-Item Env:PC_REGISTRY, Env:PC_PORT
```

(La ruta del fixture **cambió de nombre**: era `tests/fixtures/carriles/…`, ahora es
`tests/fixtures/lanes/…`, y en el menú aparece como **"Fixture Lanes"**, no "Fixture
Carriles".)

**Qué mirar, corrección por corrección:**

1. **Sin regresión, primero.** Abre `AIW Console` y `Cantu Studio` → Roadmap. Nada nuevo: ni
   selector, ni etiquetas, ni chips. Misma cola (35 y 53), mismo árbol (2/16 y 7/28), mismo
   ancho en Run Queue y en Roadmap.

2. **(A) La numeración.** Abre `Fixture Lanes` → Roadmap → Run Queue. Con **"All lanes"** las
   filas van `3, 4, 5, 6, 7, 8, 9, 10, 11, 12` (y `#1`, `#2` en History): el orden global de
   siempre, con su etiqueta `FORGE-03`, `CHRONICLE-01`…
   Ahora elige **`CHRONICLE`** en el selector. Las cuatro filas pasan a leerse **1, 2, 3, 4**
   — antes leían 3, 7, 8, 10 — y cada una lleva a la derecha su chip **`#3 global`**,
   `#7 global`, `#8 global`, `#10 global`. La etiqueta de carril desaparece mientras el filtro
   está puesto (el selector ya dice en qué carril estás).
   Prueba `FORGE` (1…6, contando las dos de History) y `SAIL` (1, 2). Vuelve a "All lanes":
   todo regresa al global.

3. **(A) Las dos subvistas coinciden.** Con `CHRONICLE` puesto, pasa a la subvista **Roadmap**
   sin tocar el selector: el árbol numera `#1 #2 #3 #4`, los mismos chips. El número de una
   fila significa lo mismo en las dos vistas.

4. **(A) El detalle sigue en global.** Con `CHRONICLE` puesto, abre la fila **2**
   ("Document component 2"). El drawer dice **`#7`** en la cabecera y **`Run order = #7 of 12`**
   — es la identidad del run en el proyecto, no su sitio en la lista filtrada — y la celda
   **`Lane`** lleva `CHRONICLE-02`, que es la posición dentro del carril. Las dos cosas, en la
   misma pantalla. Igual el "Waiting on" de las filas: apunta a runs de otros carriles y por
   eso habla en global (`#4 Component 2`).

5. **(B) El selector.** Míralo en la fila de subvistas, entre "Run Queue / Roadmap" y "Edit
   roadmap": la etiqueta `LANE` y el desplegable ya no son letra pequeña. Comprueba que la fila
   **sigue siendo UNA** y que no aparece scroll horizontal — estréchala a 1280 y ensánchala a
   pantalla completa; el toolbar mide lo mismo de alto (49 px) con selector y sin él.

6. **(C) El idioma.** Todo lo que la consola escribe está en inglés, incluido el fixture:
   `Lanes and barriers — fixture`, `FORGE — Forge — building (default) (6)`,
   `Document component 1`, `Barrier · GLOBAL`. Lo que sigue en español es CONTENIDO de
   proyecto (los títulos de los runs reales de aiw-console, por ejemplo "Consola global
   renderiza Cantu") y así se queda: la consola no traduce lo que el proyecto declara.

7. **Nada que revertir.** Este QA es de solo lectura: no toca el fixture ni ningún canónico.
   Si además quieres probar la edición, sigue valiendo el punto 6 del reporte de D-051 (botón
   "Edit roadmap" → bloque "Lane"), sobre el fixture.

---

## Estado de completitud

- Bloque A (numeración local, ambas subvistas, dónde quedó cada número, cero persistencia,
  DOM en los dos estados) — COMPLETO.
- Bloque B (tipografía por tokens; una sola fila; sin scroll; medido a 1280 y 1920) — COMPLETO.
- Bloque C (regla escrita; `project-console/` y el fixture reciente en inglés; barrido con
  resultado; español fuera de alcance NOMBRADO sin tocar) — COMPLETO **con una acotación
  declarada**: los fixtures anteriores a las fases recientes quedan listados, no traducidos
  (C.5.1) — es el punto que espera decisión de cabina.
- Bloque D (224/224; 9 tests nuevos) — COMPLETO.
- Bloque E (A/B byte-idéntico contra el renderer anterior + DOM en navegador) — COMPLETO.
- Bloque F (md5, porcelain, fronteras, y por qué no se re-emite) — COMPLETO.
- Bloque G (lo abierto) — COMPLETO.
