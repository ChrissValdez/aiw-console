# Propuesta de la Fase 1 del `#70` — el reporte HTML de cada hilo — 2026-10-19

Run: `#70` `RUN-CONSOLE-THREAD-HTML-REPORTS-CONTRACT-001` «Each thread's HTML report: where it lives,
how the console links it, how the verdict comes back — the contract». Guarda verificada contra
`roadmap/roadmap.json` (`queue_order` 70, `run_id` exacto, título con el prefijo pedido, `active`).

**Es la propuesta del taller, no una decisión.** Las decisiones son del operador; están al final, una
por pregunta, cada una con su recomendación. **No se construyó nada.** Lo único que el taller escribió
es este fichero.

Medido el 2026-10-19 leyendo los seis repos registrados, sirviendo la consola con una instancia propia
(`PC_PORT=8790`) y un servidor desechable del scratchpad que sólo LEE `cantu-lessons`. Ningún repo
ajeno quedó tocado: `git status --porcelain` da 0 en `cantu-quizzes-latex`, `cantu-studio`,
`phd-p2-experiment` y `aiw`; los 14 cambios de `cantu-lessons` son de su propio hilo y anteriores a
esta sesión (13 y 18 de octubre).

Suite antes de tocar nada: **945 tests · 943 pass · 2 fail**, los dos conocidos
(`tests/registry-digest.test.mjs:645` y `tests/roadmap-engine.test.mjs:93`). Comando `node --test`,
salida en `scratchpad/suite-base-run70.txt`.

---

## 0. Lo que va a cambiar para ti, en corto

- **Abres un run de `cantu-lessons` en la consola** (por ejemplo el `#22`, L18) y en su detalle ves
  sus páginas: `web.html ↗`, `slide.html ↗`. Un clic y se abre en otra pestaña la misma página que hoy
  abres desde `lecciones/index.html`.
- **El veredicto vuelve como hoy:** copias en la página y lo pegas en cabina, o descargas un fichero
  si es largo. La cabina lo guarda tal cual. La consola no guarda veredictos de estos reportes.
- **El reporte viejo sigue funcionando para CQL**, y deja de decir «No report has been emitted» en
  los proyectos que nunca tuvieron reportes.
- **El lector de documentos** se abre con un botón «Documents» en el detalle de cualquier run, no
  sólo dentro del reporte viejo.

---

## 1. Lo medido: qué produce un run en cada proyecto

| proyecto | qué deja un run | dónde | HTML | `reports/` |
|---|---|---|---|---|
| `cantu-lessons` | páginas de lección | `lecciones/<Lnn-slug>/` | sí (ver §2) | no |
| `cantu-quizzes-latex` | un `report.json` (el formato que se congela); lo demás son PDF y MD por ticket | `reports/RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001/`; `PAA/revision-cambios/`, `PAA/tickets/informes-*/` | **0** en disco y en git | sí, 1 reporte, **sin** `verdict.json` (el de prueba está retirado) |
| `cantu-studio` (en pausa, D-079) | `99-REPORTE.md` + `QA-OPERADOR.md` por run | `QA/temp/<run_id>/` (137 de 267 runs cerrados); 8 páginas `QA/RUN-<id>-<SLUG>.html`, la última del 2026-09-25 | sí, pero no por run desde hace un mes | no |
| `aiw` | documentos Markdown | `docs/kernel/` | **0**, tampoco en la historia | no; su `.project/` ni siquiera tiene `reports_index.json` |
| `phd-p2-experiment` | nada todavía: **0 runs** | — | 0 | no |
| `aiw-console` | código y records Markdown | `context/aiw-console/records/` (200) | 4, ninguno por run (prototipos) | no |

**Hoy sólo `cantu-lessons` produce HTML por run.** CQL dejó de producir reportes después del piloto
de agosto, y sus 100 runs están `completed`.

**Ningún proyecto guarda el `run_id` junto a su HTML.** Studio lo hace de hecho con el nombre de
carpeta (`QA/temp/<run_id>/`), pero su resultado es Markdown.

---

## 2. `cantu-lessons` en detalle — el dato vencido y si una lección es un run

**El texto del `#70` y la D-076 tienen un dato vencido.** Dicen que CL escribe HTML en
`docs/guiones/`. Esa carpeta se vació el **2026-10-13** (commit `52f8a93`, «lecciones: orden de
carpetas aprobado»): `git ls-files docs/guiones` da 0, y la carpeta no existe. El propio roadmap de CL
la cita todavía 2 veces, en la historia del `#3`.

**Dónde viven hoy:** `lecciones/<Lnn-slug>/`, 28 carpetas, con `lecciones/index.html` encima.

| fichero | quién lo escribe | ¿en git? |
|---|---|---|
| `guion-web.html` (7: L01–L06, L08) | el taller de guion, sobre `lecciones/_plantilla/` | **sí** |
| `web.html`, `slide.html`, `slide-mazo.html` | `tools/revision/build.mjs`, que compila el borrador con el motor de Studio | **no** (`.gitignore`) |
| `_generado/web.informe.{md,json}` | la misma herramienta: la revisión automática con semáforo | no |
| `_historial/` | `tools/revision/historial.mjs`, desde git | no |
| `lecciones/index.html` | `build.mjs`, `estado.mjs`, `historial.mjs` | no |

**¿Una lección es un run?** Casi siempre, y no siempre:

- **26 carpetas son exactamente un run** cada una (`#3`–`#7`, `#9`, `#10`, `#12`–`#30`).
- **2 carpetas no tienen run:** L09B y L20B. Son particiones propuestas dentro del `#13` y del `#24`, y
  ningún run del canónico las nombra.
- **4 runs no tienen carpeta:** `#1` y `#2` (temario), `#8` (la L06 vieja, cerrada por partición el
  2026-10-16) y `#11`, cuyo resultado es el índice `lecciones/index.html`.
- **Un run deja varias páginas, por pasos:** en el lote 1, guion → web → slide; en los lotes 2 y 3, sin
  guion, web → slide.
- **Las carpetas se renombran.** Git registra una: `lecciones/L06-operar-enteros-y-decimales/` pasó a
  `lecciones/L06-sumar-y-restar-decimales/` (`8de598d`, 2026-10-17). Después, el temario subió un
  número de L07 en adelante (`b9994d1`). Las carpetas sin versionar no dejan rastro, así que no sé si
  se movieron. El `run_id` no cambia nunca.
- **Lo único que une run y lección** es el título («L18 · Reading a fraction problem») y la prosa del
  `full_description`, que nombra el borrador `.json`, no el HTML.

**Veredictos de CL:** `docs/veredictos/AAAA-MM-DD-<slug>.md`, 63 ficheros, escritos tal cual por la
cabina. 58 nombran la lección, 44 un `#NN`, y **1** un `RUN-…`. Un mismo fichero acumula días
(`2026-10-16-lectura-de-las-seis-lecciones-web.md` se tocó hasta el 19).

---

## 3. Lo medido en la consola

- **Ya puede servir cualquier HTML de un proyecto**, en `/projects/<clave>/<ruta>`. Probado con
  `lecciones/index.html`, `web.html` y `slide.html` de L18, el guion de L03 y `_plantilla/guion.js`:
  todos dan 200 con su tipo. **No lista carpetas:** `lecciones/L18-…/` y `reports/` dan 404.
- **No puede abrir un fichero del disco.** Un enlace `file://` desde la consola da «Not allowed to load
  local resource».
- **El «Copiar» de CL funciona servido por la consola.** Lo probé en el guion v3.9 de L03: «Copiado ✓».
  Copió `L03·S1 = A · L03·S2 = A · L03·EG = A`, **sin el run ni la versión**.
- **Lo que ves hoy en CL contradice la D-075:**
  - cada detalle de run dice «Run report — No report has been emitted for this run» (visto en el `#5`);
  - el Portfolio dice «no reports emitted» en cuatro proyectos y «no reports index» en `aiw`;
  - CQL lleva «1 of 1 awaiting a verdict» desde agosto.

### 3.1 La seguridad: el hallazgo que cambia cómo se abre la página

**El `#56` (`RUN-CONSOLE-PREVIEW-SANDBOX-001`) ya midió y cerró esta exposición** para las vistas
previas. Su texto, verbatim: «THE EXPOSURE OPENS THE DAY ANY PROJECT EMITS ITS OWN PREVIEW». El
problema:

- una página de un hilo, servida por la consola, corre **en el mismo origen** que las cuatro rutas que
  escriben (editar el canónico, re-emitir `.project/`, sincronizar la historia, firmar un veredicto);
- la única puerta de esas rutas es el origen (`serve.mjs:337-350`);
- no exigen JSON ni contestan CORS, así que tampoco sirve otro puerto u otro nombre de host: el
  servidor acepta cualquier origen `127.0.0.1`/`localhost`;
- **sólo un origen opaco** (`Origin: null`, que es lo que manda una página con `sandbox` sin
  `allow-same-origin`) queda fuera;
- **y `web.html` de CL carga KaTeX desde `cdn.jsdelivr.net`**: código de un tercero correría con los
  permisos de la consola.

**Medí la página de CL aislada**, como pestaña con cabecera `Content-Security-Policy: sandbox
allow-scripts allow-popups allow-downloads allow-modals`:

| | sin aislar | aislada |
|---|---|---|
| origen de la página | `http://127.0.0.1:8790` (el de la consola) | `null` |
| «Copiar» del guion de L03 | «Copiado ✓» | «Copiado ✓» |
| fórmulas KaTeX en `web.html` de L18 | 75, 0 errores, 5 896 px de alto | 75, 0 errores, 5 896 px de alto |
| `localStorage` | funciona | `SecurityError` |

**Dos costos medidos del aislamiento:**

1. **La elección del guion de CL no sobrevive a recargar la página.** `guion.js:40-41` ya atrapa el
   error, así que la página funciona. Lo copiado sale igual.
2. **El botón de letra A+/A− de las lecciones compiladas por Studio falla.** Su código usa
   `localStorage` sin atrapar el error (`web.html:107`, «Uncaught SecurityError»). El arreglo es de
   Studio, que está en pausa.

**La forma de marco aislado no la pude medir:** este navegador bloquea todo sub-marco
(`ERR_BLOCKED_BY_CLIENT`, incluso en el mismo origen).

---

## 4. DECISIÓN 1 — cómo sabe la consola qué HTML es de qué run

Comparé las cuatro formas candidatas con el caso real de L18, el `#22`
`RUN-LESSONS-ARI-READING-FRACTION-PROBLEMS-001`.

| forma | qué le cuesta a CL | qué le cuesta al sistema | D-075 |
|---|---|---|---|
| **A. Carpeta por convención** `reports/<run_id>/index.html` | Una página nueva por run (~26) que repite `lecciones/index.html`, con enlaces que se rompen cuando renumeran. `tools/revision` no sabe el `run_id`. | El proyector ya lista esa carpeta como «sin `report.json`», y la sección congelada diría «A folder was filed… no report was written into it», que es falso. Habría que tocar lo congelado. | ✗ fabrica un artefacto para la consola |
| **B. Clave en el run del canónico** | **Una línea por run**, escrita cuando la cabina ya marca el paso («PASOS — se marcan aquí al avanzar»). Si renumeran, la corrige junto a la prosa, como ya hace. **Ningún fichero nuevo.** | **Cambio de esquema.** `roadmap-core.mjs:608` rechaza todo campo fuera de `RUN_ALLOWED_FIELDS`; hay que añadirlo como opcional, con su regla de forma y el párrafo en CONTRATO §10.a. **El proyector no cambia:** los campos opcionales ya viajan tal cual a `.project/roadmap.json` (`closeout_result`: 5 de 30 en CL). El motor local de Studio la rechazaría hasta que su hilo la acepte (precedente §9.6), y está en pausa. | ✓ no es un artefacto: dice dónde vive, en el registro del run |
| **C. Índice por proyecto** escrito por su hilo | Un fichero nuevo con 25–30 entradas `run_id → rutas`, que mantener a cada paso. | La consola lo lee en una ruta fija, o el proyector lo transporta (cambio). | ✗ artefacto sólo para la consola |
| **D. Derivarlo de lo que existe** | Nada… | …y no encuentra nada: las páginas de CL están en `.gitignore` (nunca salen en un commit); sólo 3 de 302 commits nombran un `RUN-`, y uno toca diez runs; el `full_description` del `#22` sólo nombra el borrador `.json`; el índice de documentos de CL se arma escaneando `.md`. | ✓ pero inútil |

**Recomendación: B.** Una clave opcional en el run:

```json
"report_html": [
  "lecciones/L18-leer-un-problema-de-fracciones/web.html",
  "lecciones/L18-leer-un-problema-de-fracciones/slide.html"
]
```

- **Forma:** lista de rutas relativas a la raíz del proyecto, con `/`, terminadas en `.html`, sin
  `..` y fuera de `.git/` y `.project/`.
- **El motor no comprueba que existan,** porque las páginas de CL se generan y no están en git. Lo
  comprueba la consola al abrir el detalle (un HEAD por ruta) y, si falta, dice «declarada en el run,
  no está en disco».
- **Un proyecto que no la escribe no ve nada:** ni sección, ni «no configurado».

**Por qué B y no A:**

- **Contradigo el texto del run.** Pide «la convención de ubicación, por run». Medido, una ubicación
  común obliga a CL a duplicar o mover lo que ya produce.
- **La D-076 dice que lo común es «dónde vive» el reporte.** B dice dónde vive sin moverlo.

**Costo que tienes que aprobar:** B toca `tools/roadmap/roadmap-core.mjs` y
`context/aiw-console/CONTRATO.md` §10.a. **Los dos están fuera del alcance de la Fase 2 del encargo.**

**Si no quieres cambio de esquema:** la alternativa es A, y entonces hay que tocar el proyector o la
sección congelada, por el mensaje falso de arriba.

## 5. DECISIÓN 2 — cómo abre la consola el HTML

**Recomendación:**

- **En el detalle del run**, una sección con un enlace por ruta: el nombre del fichero y, debajo, la
  ruta completa.
- **Se abre en otra pestaña, AISLADA:** el servidor manda la cabecera
  `Content-Security-Policy: sandbox …` (sin `allow-same-origin`) en todo `.html` bajo
  `/projects/<clave>/`. **Es lo medido en §3.1**, y cierra también la exposición que hoy existe si
  alguien escribe esa URL a mano.
- **Junto a cada enlace, «Copiar ruta»**, con la ruta completa en disco, para abrir la página desde el
  explorador con todo funcionando (A+/A− y elección guardada). La consola no puede abrir `file://`
  (§3).
- **No pongo marca en la fila** de Run Queue: con varias páginas por run no hay un clic obvio, y la
  barra ya va llena a 1280 (`#69`). Si lo extrañas, se añade después.

**Costo:** una cabecera en `project-console/serve.mjs`. No es una ruta de escritura nueva, pero **el
encargo sólo admite `serve.mjs` si lo exige el veredicto, así que esto también necesita tu
aprobación.** Puede tocar un test del `#56` si mide que no hay CSP; si es así, lo nombraré.

**Alternativas:**

- Un **marco aislado** dentro de una página de la consola, en `assets/`. No toca `serve.mjs`, pero no
  lo pude medir aquí, y el «Copiar» dentro de un marco necesita un permiso que no verifiqué.
- **Abrirla sin aislar**, que reabre lo que cerró el `#56`. **No la recomiendo.**

## 6. DECISIÓN 3 — cómo vuelve el veredicto a disco

Lo medido:

- **Un HTML abierto desde disco no escribe en el repo.**
- **El botón «Copiar» de CL ya existe** (`lecciones/_plantilla/guion.js:250-295`, y en la página de
  slide `tools/revision/lib/paginaSlide.mjs:192,230`) y funciona aislado.
- **La descarga sí puede pedir carpeta,** pero no elegirla por ti: Chromium tiene `showSaveFilePicker`
  (presente en este navegador), y nadie puede preseleccionar la carpeta.

**Recomendación, de base a respaldo:**

1. **Copiar.** La primera línea de lo copiado nombra el `run_id` y la página, y lo demás es del hilo.
   Para L03 sería:
   ```text
   RUN-LESSONS-ARI-OPERATING-WITH-SIGNS-001 · lecciones/L03-operar-con-signos/guion-web.html v3.9
   L03·S1 = A · L03·S2 = A · L03·EG = A
   ```
   Hoy CL copia sólo la segunda línea. Lo pegas en cabina, y la cabina lo guarda verbatim donde su
   proyecto guarda veredictos (CL: `docs/veredictos/`).
2. **Descargar,** para lo largo. Un fichero `veredicto-<run_id>-<AAAA-MM-DD-HHMM>.md` que cae en
   **Descargas**. La cabina lo encuentra por el `run_id` del nombre y lo archiva verbatim en el
   proyecto. Si prefieres guardarlo tú directo en la carpeta del proyecto, el nombre es el mismo.
3. **La cabina, siempre.**

**La consola no entra en este camino.** No recomiendo una ruta nueva para pegar veredictos en la
consola: volvería a hacerla almacén de veredictos, que es lo que la D-076 dejó atrás.

**Advertencia medida:** lo que eliges en un guion se guarda por origen. Lo elegido abriendo desde
disco no aparece al abrirlo desde la consola, ni al revés (y aislado no se guarda). Copiar y descargar
lo sacan igual.

## 7. DECISIÓN 4 — la puerta propia del lector de documentos

Lo medido:

- **El lector ya recibe los documentos del proyecto activo cada vez que lo abres**
  (`project-console.js:5658`), así que funciona sin reporte. Le falta la puerta.
- **Su único botón está dentro de la vista del reporte viejo** (`index.html:289`), que hoy sólo puede
  abrir CQL, con un reporte.
- **Cualquier elemento con `data-doc-reader-open` lo abre** (`doc-side-reader.js:528`).
- **Por capas, el lector ya queda encima del detalle del run** (cajón 50, reporte 60, lector 65/70).

**Recomendación:** un botón **«Documents»** en la cabecera del detalle del run, junto a ✕.

- **El texto del run es el que cita documentos:** el `#22` cita `docs/DISENO-DE-LECCIONES.md` y
  `docs/veredictos/…`.
- **En la barra de pestañas no se alcanza con un run abierto:** el velo del cajón la cubre
  (`.drawer-overlay`, fijo, `inset: 0`). Sin un run abierto, ya tienes la pestaña Docs.
- **El botón del reporte viejo se queda,** congelado.

**Alternativa:** en la barra de pestañas, junto al engrane.

## 8. DECISIÓN 5 — congelar el formato actual sin romperlo

Lo que depende de él, medido:

| pieza | qué hace |
|---|---|
| `assets/run-report-renderer.js` + `.css` | pinta un `report.json` |
| `assets/run-report-surface.js` + `.css` | el índice, la sección «Run report» del detalle, la capa del reporte y el panel «Awaiting a verdict» |
| `project-console.js` | `v3RunReportSection` (5539), `v3OpenRunReport` (5548), `v3VerdictWriter` (5597), el modelo en `renderAll` (5648) |
| `project-shell.js` | `reportsIndexUrlForKey` (226), `verdictPanelHtml` (242, pintado en 465) |
| `index.html` | la capa `#run-report-view` (275–294), con «Documents» |
| `serve.mjs` | `POST …/verdict/write` (`#57`), con el modelo del renderizador en un `vm` |
| `tools/projector/project.mjs` | emite `.project/reports_index.json` |
| `docs/SOBRE-DEL-REPORTE-v1.md` | el sobre; su cabecera sigue diciendo BORRADOR, NO APROBADO |
| tests | **188 tests en 14 ficheros**: los once `run-report-*`, más `serve-verdict-write`, `projector-reports-index` y `reports-qa-fixture` |

**Recomendación:**

- **No se borra nada,** y esos 188 tests siguen en verde. Lo nuevo vive en un fichero propio, con su
  propio veto de ceguera.
- **Y, por la D-075, la sección «Run report» y las filas de «Awaiting a verdict» sólo se pintan en
  proyectos cuyo índice dice que existe `reports/`.** Hoy eso es sólo CQL.
- **Se cambian las dos llamadas** (`project-console.js` y `project-shell.js`), **no los ficheros
  congelados.** Si algún test del `#53` o del `#58` supone la sección en un proyecto sin `reports/`, lo
  nombraré.

## 9. DECISIÓN 6 — dónde vive el contrato

**Recomendación:** `docs/CONTRATO-REPORTE-HTML-DE-CADA-HILO-v1.md`, en este repo.

- Es la convención del workspace para piezas que leen otros hilos: el `docs/` del repo dueño, con `-v1`.
- Queda **BORRADOR hasta que el piloto de CL devuelva su veredicto.**
- Con B, la clave queda descrita ahí y en CONTRATO §10.a.

---

## 10. Lo que cambia para cada hilo

- **`cantu-lessons`:**
  - Cuando la cabina marca un paso de un run, añade a su `report_html` la página que ese paso dejó.
    Ejemplo, el `#5` (L03):
    `["lecciones/L03-operar-con-signos/guion-web.html", "lecciones/L03-operar-con-signos/web.html", "lecciones/L03-operar-con-signos/slide.html"]`.
    El `#11` puede declarar `lecciones/index.html`.
  - `tools/revision`, `lecciones/index.html` y el `.gitignore` se quedan como están.
  - L09B y L20B entran en la lista del `#13` y del `#24`, o en sus runs cuando existan.
  - Si lo aprueba su hilo, el «Copiar» antepone la línea del `run_id`.
- **`cantu-quizzes-latex`:** nada. Su `report.json` sigue abriéndose como hoy.
- **`cantu-studio`:** nada durante la pausa. Al adoptar, su motor tiene que aceptar la clave, y puede
  declarar sus `QA/*.html`.
- **`aiw`, `phd-p2-experiment` y `aiw-console`:** nada. No producen HTML por run, así que no aparece
  nada.

## 11. Lo que la Fase 2 tocaría

| si apruebas | ficheros |
|---|---|
| **lo recomendado** | `project-console/assets/` (la sección del HTML, la puerta, las dos llamadas congeladas), `project-console/index.html`, `tests/`, `docs/CONTRATO-REPORTE-HTML-DE-CADA-HILO-v1.md` **+ `tools/roadmap/roadmap-core.mjs` + CONTRATO §10.a (por B) + `project-console/serve.mjs`, sólo una cabecera (por la decisión 2)** |
| A + marco aislado | `assets/`, `index.html`, `tests/`, el contrato, **+ la sección congelada o el proyector** |

**Los tres «+» de la primera fila están fuera del alcance escrito del encargo.** Necesitan tu
aprobación explícita.

## 12. Lo que NO pude verificar

- **El marco aislado (alternativa de la decisión 2):** este navegador bloquea todo sub-marco.
- **El «Copiar» abriendo la página desde disco** (`file://`): sólo lo probé servido por la consola,
  aislado y sin aislar.
- **Qué navegador usas tú.** Medí en el panel del navegador de esta app, que es Chromium. Ahí existe
  `showSaveFilePicker`; en Firefox no.
- **Si el kernel de `aiw` valida las claves del run.** Sólo medí el motor de esta consola, y del de
  Studio sé lo que dice la D-080.
- **Si `lecciones/index.html` tiene anclas por lección** (`#L18`).
- **Por qué el `.project/` de `aiw` no tiene `reports_index.json`.**
- **Los números de línea de `paginaSlide.mjs`** son de la copia de trabajo de CL, que su hilo tiene
  modificada sin commitear.

---

## Anexo — de dónde sale cada cifra

| cifra | comando o ruta |
|---|---|
| suite 945/943/2 | `node --test > scratchpad/suite-base-run70.txt` |
| guarda del `#70` | `node -e` sobre `roadmap/roadmap.json`, `queue_order === 70` |
| CL: 30 runs (5 `completed`, 25 `active`) | `node -e` sobre `cantu-lessons/roadmap/roadmap.json` |
| CL: lo versionado de `lecciones/` (13 ficheros: 7 guiones, la plantilla y dos JSON) | `git ls-files lecciones` |
| `docs/guiones/` vaciada el 2026-10-13 | `git log --diff-filter=D -- 'docs/guiones/*'` → `52f8a93` |
| CL: commits que nombran un run | `git log --oneline --grep=RUN-LESSONS` (3 de 302) |
| CL: veredictos | `grep -l` sobre `docs/veredictos/*.md` (63; 58 con Lnn, 44 con #NN, 1 con RUN-) |
| CQL: 0 HTML, 1 reporte | `git ls-files \| grep -ci '\.html$'`; `.project/reports_index.json` |
| Studio, `aiw`, `phd-p2-experiment` | agentes de sólo lectura (`ls`, `find`, `git ls-files`, `git log`, `git show --stat`) |
| campos opcionales que viajan a `.project/` | `node -e` sobre `cantu-lessons/.project/roadmap.json`: 5 de 30 con `closeout_result` |
| la página aislada y sin aislar | instancia propia `PC_PORT=8790` y `scratchpad/sandbox-probe/server.mjs` (8791), en el panel del navegador |
| 188 tests del formato congelado | `grep -cE "^\s*test\("` sobre los 14 ficheros |
