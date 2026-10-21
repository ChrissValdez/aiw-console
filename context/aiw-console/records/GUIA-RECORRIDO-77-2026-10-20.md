# Guía de recorrido del `#77` — 2026-10-20

Run: `#77` `RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001` «Deep visual audit of the console, led by the
operator». Primer tiempo del plan en tres tiempos (`ENCUADRE-PARADA-77-2026-10-20.md`): un taller
vuelve a medir los diez hallazgos pendientes contra el código de hoy y escribe esta guía. **No decide
qué está mejor ni qué se arregla**: eso lo dice el operador al recorrer la consola (segundo tiempo) y
lo convierte en runs la cabina (tercer tiempo).

Código medido: `aiw-console` en `e6662b3`, árbol limpio (`git status --porcelain` vacío antes de
escribir esta guía).

## 0. Cómo se midió

- **Leyendo el código** de `project-console/index.html`, `project-console/assets/*.js|css` y
  `project-console/serve.mjs`, y los `.project/` de los seis proyectos registrados.
- **Y abriendo la consola real en un navegador**: `node project-console/serve.mjs` con
  `PC_PORT=8797` (el mismo comando que lanza `start-console.ps1`; ver §1), registro real
  `project-console/projects.json`, ventana de 1440×900. Se recorrieron los seis proyectos sin
  pulsar ningún botón que escriba. El modo edición se encendió (sólo hace un GET de sondeo) y se
  abrió un editor sin previsualizar ni confirmar nada.
- Cada afirmación lleva su marca: **[medido]** = visto funcionando en el navegador;
  **[inferido del código]** = leído en el código, no visto funcionando.
- No se corrió la suite: no se cambió código.

## 1. Cómo arrancar

1. Doble clic en
   `C:\Users\chris\Documents\AIW_Workspace\projects\aiw-console\start-console.cmd`.
2. Ese `.cmd` sólo llama a
   `C:\Users\chris\Documents\AIW_Workspace\projects\aiw-console\start-console.ps1`
   (`start-console.cmd:8`), que comprueba que está en la raíz del repo, para **cualquier proceso
   node que escuche en el puerto** y arranca en primer plano
   `node C:\Users\chris\Documents\AIW_Workspace\projects\aiw-console\project-console\serve.mjs`
   (`start-console.ps1:223-225`).
3. Cuando el puerto responde abre el navegador en
   **`http://127.0.0.1:8788/project-console/index.html`** (`start-console.ps1:33-34`, `:190`,
   `:218`). La URL también se imprime en la ventana.
4. Deja esa ventana abierta: cerrarla para el servidor.

Lo que hay que saber antes de pulsar:

- **Hoy ya hay una consola en el 8788**: PID 32576,
  `node C:\Users\chris\Documents\AIW_Workspace\projects\aiw-console\project-console\serve.mjs`,
  arrancada a las 15:50 de hoy, **antes** de que cambiara `serve.mjs` (modificado a las 17:17). El
  lanzador la parará y arrancará otra con el código actual (`start-console.ps1:89-120`); es lo que
  está diseñado para hacer. [medido: `Get-NetTCPConnection` y `Win32_Process`]
- Otro puerto: `$env:PC_PORT = 8790; .\start-console.ps1` desde PowerShell
  (`start-console.README.md:32`). Hoy el 8790 también está ocupado por un node (PID 19176).
- En esta medición **no** se ejecutó el `.cmd` (habría parado el PID 32576, que no es de este
  taller); se ejecutó el mismo comando que el `.ps1` lanza, en el puerto 8797. Arrancó y sirvió sin
  errores. [medido]

## 2. Botones que escriben en disco

El recorrido no necesita pulsar ninguno. Se nombran para que el operador sepa cuáles escriben si
decide pulsarlos (`serve.mjs:16-41` describe las cuatro rutas de escritura):

| Botón (etiqueta en pantalla) | Dónde | Qué escribe |
|---|---|---|
| «Re-emit .project/» | Roadmap, barra superior | los siete artefactos de `.project/` del proyecto activo |
| «Sync History» | History | `.project/git_history.json` del proyecto activo |
| «Confirm and write» | editor de un run/fase/objetivo, tras «Preview…» | el roadmap canónico del proyecto |
| «Confirm» del care budget, tras «Preview care budget» | diálogo Project configuration, con «Editing on» | `care_budget` en la raíz del roadmap canónico |
| «Write verdict.json» | reporte de un run, al firmar | `verdict.json` junto al `report.json` |

Los «Preview…» del editor hacen un POST en seco (`apply:false`) que no escribe nada
(`serve.mjs:18-19`). «Edit roadmap» sólo hace un GET de sondeo (`project-console.js:6396-6411`).

## 3. Inventario de superficies, en el orden del recorrido

Recorrido propuesto, por proyecto para no saltar de uno a otro: **A** el armazón → **B**
`AIW Console` → **C** `Phd P2 Experiment` → **D** `Cantu Quizzes Latex` → **E** `Cantu Studio`.
Unos 30 minutos. Rutas relativas a
`C:\Users\chris\Documents\AIW_Workspace\projects\aiw-console\`. «Hallazgos» remite a §4.

### A. El armazón

**S1 · Barra lateral.** Siempre visible a la izquierda. Muestra «GLOBAL» › «Project Portfolio» y
«PROJECTS» con los seis proyectos (inicial, nombre y estado: active / idle). Arriba a la derecha de
la marca hay un botón **sin etiqueta en pantalla** (icono de tres rayas; al pasar el ratón dice
«Toggle sidebar») que pliega la barra. Vive en `project-console/index.html:30-51`; la lista la pinta
`project-console/assets/project-shell.js:272` (`sidebarProjectsHtml`). [medido]

**S2 · Project Portfolio.** Es lo que abre la consola. Arriba, el panel «Awaiting a verdict» (hoy:
«1 across 1 project», Cantu Quizzes Latex 1 of 1); debajo, una tarjeta por proyecto con «Runs by
status», «Roadmap», «Objectives», «Current status» y el botón «Open Project». Vive en
`project-console/index.html:54-69`; panel en `project-console/assets/run-report-surface.js:243-290`,
tarjetas en `project-console/assets/project-shell.js:293-342`. [medido]

### B. AIW Console (clic en «AIW Console» en la barra lateral)

**S3 · Cabecera del proyecto.** Cinco pestañas «Overview», «Roadmap», «History», «Docs», «Status»
(«Status» en gris atenuado) y, a la derecha, un botón **sin etiqueta en pantalla** (icono de
engranaje; al pasar el ratón: «Project configuration»). El proyecto abre en **Roadmap**. Vive en
`project-console/index.html:74-92`; las pestañas las cablea `project-console/assets/project-console.js:8121-8164`.
[medido]

**S4 · Roadmap › Run Queue.** Lo primero que se ve. Grupos plegables «Needs Human Decision», «Now»,
«Upcoming», «History» con su número; cada fila lleva número de cola, título, etiquetas (clase,
gravedad, modo de cierre), una celda («Stage», «Dependencies» o «Waiting on») y el estado. En la
misma barra: el selector «CLASS» («All classes (79)»), «Re-emit .project/» y «Edit roadmap». Vive en
`project-console/index.html:123-162`; filas en `project-console/assets/project-console.js:5122-5183`
y `:3805-3880`; selector de clase en `:4082-4125`. Hallazgos: H2 (la celda «Stage»). [medido]

**S5 · Detalle de un run (panel lateral derecho).** Clic en una fila, por ejemplo #77 y luego #79.
Arriba: «‹ Run Queue» (vuelve al origen), «Documents», el estado y «✕». Debajo: «Summary» con «Full
description»; las celdas «Run order» y «Current stage» (más «Lane» / «Barrier» si el proyecto los
tiene); «Details»; «Dependencies»; «Classification» con su bloque «Derived — computed at read time,
never stored, not editable»; «Progress». Los runs de una dependencia se abren encima y «‹ Run #N»
vuelve. Vive en `project-console/index.html:260-270` y
`project-console/assets/project-console.js:5370-5543`. Hallazgos: H1, H2, H5, H9. [medido]

**S6 · Lector de documentos (modal centrado).** Desde el detalle de un run, botón «Documents».
Título «Documents of this project», ruta del índice, «READ ONLY», «Close»; a la izquierda «Filter by
title», la cuenta («452 documents indexed by this project» en Cantu Quizzes Latex) y la lista; a la
derecha el documento. Escape vacía el filtro si tiene el foco y, si no, cierra. Vive en
`project-console/index.html:324-360` y `project-console/assets/doc-side-reader.js:685-785`.
Hallazgos: H7, H8. [medido]

**S7 · Roadmap › Roadmap.** Botón «Roadmap» junto a «Run Queue». Una tarjeta por objetivo («Project
Console», «Global Console») con «Runs / Completed / Active / Blocked», barra «Progress» y el
desplegable «Phases»; dentro, una banda por fase con su título y «N of M done», y sus runs. Vive en
`project-console/index.html:164-166` y `project-console/assets/project-console.js:4204-4272`
(fase: `:3883-3900`). Hallazgos: H6. [medido]

**S8 · Diálogo «Project configuration».** El engranaje de la cabecera. Muestra «Care budget» (en AIW
Console: «Configured», la línea «ADVICE», tabla Severity / Model / Effort y «Turn on Edit roadmap to
change this.») y, si el proyecto tiene runs vivos sin clasificar, «Unclassified live runs N» con un
botón por run. Vive en `project-console/index.html:388-401` y
`project-console/assets/project-console.js:4621-4701` (care budget `:4456-4620`, lista
`:4343-4364`). Hallazgos: H3, H10. [medido]

**S9 · Modo edición.** Botón «Edit roadmap» de la barra; pasa a «Editing on». En la subvista Roadmap
aparecen botones «Edit» en cada objetivo y «Edit» / «Add run» en cada fase; en el detalle de un run
abierto desde Run Queue o Roadmap aparece «Edit» junto a «✕». Vive en
`project-console/index.html:154` y `project-console/assets/project-console.js:6419-6447`,
`:6507-6542`. Se apaga pulsando otra vez. [medido]

**S10 · Editor (modal centrado).** «Edit» en el detalle de un run: título «Edit run #N», bloques
«TEXT», «POSITION», «DEPENDENCIES», «WAITS ON A PERSON», «BARRIER», «CLASSIFICATION», «STATUS»,
«SWAP POSITION», «REMOVE RUN» («LANE» si el proyecto tiene carriles), botones «Preview all changes»,
«Preview swap», «Preview removal» y «Close». Las variantes «Edit phase», «Edit objective» e «Insert
run» salen de los botones de S9. Para mirarlo basta con abrirlo y cerrarlo con «Close». Vive en
`project-console/index.html:362-372` y `project-console/assets/project-console.js:6572-6630`
(contenido `:6645-6990`). Hallazgos: H4. [medido: el editor de un run; inferido del código: fase,
objetivo e inserción]

**S11 · «Re-emit .project/».** Botón de la barra de Roadmap, con una línea de acuse a su izquierda
que da cifras al terminar. **Escribe** (§2): mirar, no pulsar salvo que se quiera re-emitir. Vive en
`project-console/index.html:145-146` y `project-console/assets/project-console.js:6238-6388`.
[inferido del código: el acuse]

**S12 · Overview.** Pestaña «Overview». Tres tarjetas: «Current work» («Current work item» y «Next
up»), «Next action» (los siguientes runs pendientes) y «Queue snapshot» («Needs Human Decision», «Now»,
«Ready Next», «Later», «History», «Pending runs»). Cada run abre su detalle. Vive en
`project-console/index.html:101-120` y `project-console/assets/project-console.js:4703-4794`
(títulos `:1224-1235`). [medido]

**S13 · History.** Pestaña «History». Pastillas de rama (en AIW Console sólo «main»), «Sync
History» y los commits agrupados «Today / Yesterday / Earlier»; un commit enlazado a un run lleva
«run #N», que abre su detalle. Se refresca solo cada 8 s mientras está abierta. «Sync History»
**escribe** (§2). Vive en `project-console/index.html:169-187` y
`project-console/assets/project-console.js:4913-4998` (refresco `:5028-5057`). [medido]

**S14 · Docs.** Pestaña «Docs». A la izquierda «DOCUMENTATION», «Collapse all», «Filter by title» y
el árbol por carpetas con su cuenta; a la derecha el documento, con «METADATA» plegado. Vive en
`project-console/index.html:189-196` y `project-console/assets/project-console.js:2640-2786`
(documento `:3155-3170`). Hallazgos: H8. [medido]

**S15 · Status.** Pestaña «Status». Dos enlaces arriba: «Governance State» (tres secciones
numeradas: «Review & Approval Policy», «Project Guardrails», «Claims Not Allowed Yet») y «Console
Diagnostics» («State Sources», «Repo Structure», «Console Source Files»: qué ficheros se cargaron y
cuáles el proyecto no emite). Vive en `project-console/index.html:198-252` y
`project-console/assets/project-console.js:3171-3375`, `:6191-6236`. [medido]

### C. Phd P2 Experiment (clic en «Phd P2 Experiment»)

**S16 · Selector «LANE».** En la barra de Roadmap, a la izquierda de «Re-emit .project/»: «All lanes
(5)», «DEVELOPMENT — …», «INTERFACE — …». Sólo existe en proyectos con más de un carril (hoy:
Cantu Studio, AIW y Phd P2 Experiment). Vive en `project-console/index.html:132` y
`project-console/assets/project-console.js:3946-4006`. [medido]

En este proyecto se vuelve a abrir **S8**: aquí sí aparece «Unclassified live runs 1» con «#5 Build
the two independent algebra readers…». Clic en ese run: se abre **S5** con «‹ Project configuration»
arriba, que devuelve al diálogo. En ese detalle se ven H1 («Classification 0») y H2. [medido]

### D. Cantu Quizzes Latex (clic en «Cantu Quizzes Latex»)

**S17 · Sección «Run report» del detalle.** Roadmap › Run Queue › desplegar «History» › #2 «Review
ARI-FA-Fracciones against the rubric, as the pilot». En el detalle, la sección «Run report» con la
ruta del reporte, «no verdict yet» y el botón «Open the run report». Sólo aparece en proyectos que
tienen `reports/` (hoy sólo este). Vive en `project-console/assets/run-report-surface.js:147-205`,
llamada desde `project-console/assets/project-console.js:5569-5576`. [medido]

**S18 · Reporte del run (capa a pantalla completa).** «Open the run report». Barra de la consola:
«‹ Back to Run #2», título, id y «Documents» (abre S6 encima del reporte). Dentro, el renderizador:
«RUN REVIEW», «gate · both», contador, «Previous (←)» / «Next (→)», «EN» (idioma) y un botón
**sin etiqueta en pantalla** (icono de sol; al pasar el ratón: «Switch theme»); a la izquierda
«INDEX» con «All / Pending / Stops»; cada ítem con «APPROVED» / «CHANGES_REQUIRED» y «Note
(optional)». Al final, la firma («Type your name to sign») y «Write verdict.json», que **escribe**
(§2). Escape cierra primero el lector, luego el reporte, y deja el detalle del run. Vive en
`project-console/index.html:278-297`, `project-console/assets/run-report-surface.js:397-487` y
`project-console/assets/run-report-renderer.js` (textos `:47-150`, firma `:1364`). [medido: barra,
índice, ítems, Escape; inferido del código: el bloque de firma]

### E. Cantu Studio (clic en «Cantu Studio»)

- **S14 otra vez:** su pestaña Docs lista **50** documentos de los **153** de su índice (abre en la
  vista curada por `operator_review_status`, `project-console/assets/project-console.js:2674-2681`);
  ningún texto en pantalla dice que hay más. El lector S6 («Documents» de cualquier run) lista los
  153. [medido]
- **S7 otra vez:** al final de la subvista Roadmap aparece el plegable «Archive» (sólo Cantu Studio
  tiene un objetivo archivado). `project-console/assets/project-console.js:4253-4257`.
  [inferido del código]

### Superficies que hoy no aparecen con los datos reales

No se pueden recorrer; se listan para que no se busquen.

| Superficie | Por qué no aparece hoy | Dónde vive |
|---|---|---|
| Sección «HTML report» del detalle | ningún run de ningún proyecto declara `report_html` | `project-console/assets/run-html-reports.js:82-110` |
| Selector «Batch» | ningún proyecto declara lotes | `project-console/assets/project-console.js:4008-4067` |
| Tarjeta degradada del Portfolio y aviso de carga | sólo si un proyecto no carga | `project-console/assets/project-shell.js:344-364`, `project-console/index.html:99` |
| «Handle the dependents before removing» | sólo tras previsualizar la baja de un run con dependientes | `project-console/assets/project-console.js:7998-8013` |
| Formulario editable del care budget | sólo con «Editing on», y su «Confirm» escribe | `project-console/assets/project-console.js:4456-4620` |

## 4. Los diez hallazgos, vueltos a medir

Seis de 2026-07-31 (párrafo REFRAMED 2026-08-01) y cuatro de diseño (párrafo ABSORBS). Resultado:
**nueve siguen en el código; uno está resuelto (H3); de los nueve, uno (H10) no se puede ver hoy
con los datos reales.**

**H1 · El contador de clasificación muestra un cero sin unidad.** **Sigue.** Un run sin
clasificación pinta «Classification 0» con el 0 escrito tal cual
(`project-console/assets/project-console.js:5313`); uno clasificado pinta sólo el número de campos
(`:5354`, «Classification 6» en el #79), nunca «de N». Se ve en C (detalle del #5 de Phd P2
Experiment) y en B, S5. [medido]

**H2 · Un run activo dice «Current stage: Not started».** **Sigue.** Sin `progress`, la celda dice
«Closed» si el run está completado y «Not started» en cualquier otro caso, activo incluido
(`project-console/assets/project-console.js:5440-5447`); la sección «Progress» repite «not started ·
no progress recorded yet» (`:3646-3649`). Mientras, la fila de la cola del mismo run dice «Stage In
progress» (`:3824`). Hoy afecta a **29 runs activos**: 1 en AIW Console (#77), 25 en Cantu Lessons,
2 en AIW y 1 en Phd P2 Experiment; en los seis proyectos sólo un run lleva `progress` (el #3 de AIW
Console, completado). Se ve en B, S4 + S5 con el #77. [medido]

**H3 · La lista de runs vivos sin clasificar no está en pantalla.** **Resuelto: hoy está en
pantalla.** El `#43` la pintó (en Overview) y el `#67` la movió al diálogo «Project configuration»
(`project-console/assets/project-console.js:4343-4364`, `:4621-4624`;
`project-console/index.html:399`). Hoy lista 7 runs en Cantu Studio, 25 en Cantu Lessons y 1 en Phd
P2 Experiment; en AIW Console, Cantu Quizzes Latex y AIW no hay ninguno y la sección no se pinta. El
`full_description` del `#77` la da como ausente: **el código lo contradice**. Se ve en C, S8.
[medido]

**H4 · El confirm del modal salta al cancelar.** **Sigue.** El texto de julio no dice qué modal ni
qué gesto; el único `window.confirm` de la consola es el del editor: «Discard unsaved changes to
this item?» (`project-console/assets/project-console.js:6621`). Medido: cerrar el editor sin tocar
nada no pregunta; escribir una letra y borrarla deja el editor marcado como cambiado y al pulsar
«Close» salta la pregunta. Causa en el código: cualquier `input` dentro de un bloque y cualquier
`change` en el modal lo marcan como cambiado, sin comparar con el valor original (`:7223`, `:7266`),
y el «Cancel» de una previsualización no borra esa marca (`:8076-8081`), así que tras «Preview…» →
«Cancel» → «Close» también pregunta. Se ve en B, S10. [medido: cerrar limpio y cerrar tras escribir
y deshacer; inferido del código: el caso «Cancel» de la previsualización]

**H5 · Un run que deriva CRITICAL no muestra el consejo del care budget en su detalle.** **Sigue.**
El detalle (`project-console/assets/project-console.js:5370-5543`) y su sección de clasificación
(`:5265-5367`) no leen `taxonomy_model.care_budget`; la tabla sólo se pinta en el diálogo
(`:4456-4620`, `project-console/index.html:398`). Hoy sólo AIW Console declara care budget (CRITICAL →
Fable / Max) y en él derivan CRITICAL el #78 y el #79: el detalle del #79 muestra «Severity derived
CRITICAL» y ninguna mención de modelo ni esfuerzo. Se ve en B, S5 (#79) frente a S8. [medido]

**H6 · Las fases se leen desordenadas contra el `queue_order`.** **Sigue.** Las fases ya se ordenan
por una clave derivada —el menor `queue_order` de sus runs pendientes, o de todos si están cerradas—
(`project-console/assets/project-console.js:4184-4202`), y esa ordenación existe desde `c534036`
(2026-07-24), antes de la medición de julio. La cabecera de una fase sólo pinta título y «N of M
done» (`:3890-3895`), sin el tramo de la cola. En Global Console se lee: Stage 0, Stage 1, Stage 2,
Identical port, Stage 3, Stage 4, Write, Finishing…, Lanes…, Manual re-emission…, Stage 6, Prior and
cross-cutting (#33–#49, que contiene el #38 de la fase siguiente y se cruza con el #44–#48 de las
dos de después), Global console prototype (#38), Cockpit (#44, #50, #68, #74, #75), Roadmap schema
(#45–#48), The console as a product (#51–#77), The cutover (#72, #73, #78, #79), y al final tres
fases vacías en el orden Stage 5, Stage 8, Stage 7. Se ve en B, S7. [medido]

**H7 · El lector modal limita el texto a 66ch y las tablas no.** **Sigue.** Regla
`project-console/assets/doc-side-reader.css:159-163` (párrafos, elementos de lista y citas); las
tablas no tienen límite. Medido en «Estado del proyecto» (Cantu Quizzes Latex): párrafos de 640 px,
tabla de 938 px en una columna de 939 px. La pestaña Docs no tiene ese límite. Se ve en D, S6
(«Documents» del reporte → filtrar «Estado del proyecto»). [medido]

**H8 · El filtro de títulos no se queda fijo al bajar la lista.** **Sigue, en las dos listas.** En
la pestaña Docs el campo va dentro del bloque de controles
(`project-console/assets/project-console.js:2750-2753`) que se desplaza con la columna
(`.docs-nav`, `project-console/assets/project-console.css:1581-1586`); en el lector modal va en
`#doc-side-reader-filter` (`project-console/index.html:351`) dentro de la columna que se desplaza, sin
posición fija (`project-console/assets/doc-side-reader.css:288-290`). Medido: tras bajar 800 px en
Docs (Cantu Studio) y 1000 px en el lector (Cantu Quizzes Latex), el campo queda 691 y 884 px por
encima del borde visible. Se ve en B, S14 y D, S6. [medido]

**H9 · El detalle no dice quién espera a este run (la arista inversa).** **Sigue: no existe.** Las
secciones del detalle (`project-console/assets/project-console.js:5499-5534`) sólo miran hacia
arriba: «Dependencies» lee `run.depends_on` (`:5520-5528`) y «Waits on a person» lee
`depends_on_human_approved` (`:5217-5255`). Ejemplo: el #77 dice «Dependencies 0 — none» y nada
dice que el #79 lo espera. Se ve en B, S5 (#77 y luego #79). [medido]

**H10 · El diálogo de configuración debería decir qué runs sin clasificar ya llevan clase de
trabajo.** **Sigue en el código; hoy no se puede ver.** Cada run de la lista se pinta sólo como «#N
título» (`project-console/assets/project-console.js:4357-4359`), aunque el emisor publica en
`stored_fields` si el run lleva `work_class` (`tools/projector/project.mjs:127-130`). El caso que lo
originó (#69–#71 de AIW Console) ya no está en la lista porque esos runs están completados. Hoy
ningún run vivo sin clasificar lleva clase: AIW Console no tiene runs sin clasificar y los otros cinco
proyectos no tienen ningún `work_class`. Aparecería en S8. [inferido del código: no hay dato con
el que verlo]

## 5. Defectos encontrados al recorrer

**Ninguno confirmado.** Dos sospechas se descartaron al medirlas en el navegador:

- El texto «History combines verified project events and local change ledger entries…»
  (`project-console/index.html:173`) no corresponde a lo que pinta History (sólo commits), pero
  **no está en pantalla**: esa cabecera y los botones de filtro de debajo se ocultan por CSS
  (`project-console/assets/project-console.css:4632-4642`; medido `display: none`).
- Tres Escape seguidos cerraron lector, reporte **y** detalle del run. Repetido paso a paso, cada
  Escape cierra una sola capa; la primera vez el foco no estaba en el filtro.

## 6. Formato de respuesta

Una línea por superficie y una por hallazgo vigente. Copiar, rellenar y devolver:

```text
S1 Barra lateral: nada / mejoraría: <qué>
S2 Project Portfolio: nada / mejoraría: <qué>
S3 Cabecera del proyecto (pestañas y engranaje): nada / mejoraría: <qué>
S4 Roadmap › Run Queue: nada / mejoraría: <qué>
S5 Detalle de un run: nada / mejoraría: <qué>
S6 Lector de documentos (modal): nada / mejoraría: <qué>
S7 Roadmap › Roadmap: nada / mejoraría: <qué>
S8 Diálogo Project configuration: nada / mejoraría: <qué>
S9 Modo edición (Edit roadmap): nada / mejoraría: <qué>
S10 Editor (Edit run / phase / objective / Insert run): nada / mejoraría: <qué>
S11 Re-emit .project/: nada / mejoraría: <qué>
S12 Overview: nada / mejoraría: <qué>
S13 History: nada / mejoraría: <qué>
S14 Docs: nada / mejoraría: <qué>
S15 Status: nada / mejoraría: <qué>
S16 Selector LANE: nada / mejoraría: <qué>
S17 Sección Run report del detalle: nada / mejoraría: <qué>
S18 Reporte del run: nada / mejoraría: <qué>
H1 Classification 0 sin unidad: arreglar / dejar / <otra cosa>
H2 Run activo con «Not started»: arreglar / dejar / <otra cosa>
H4 Confirm del editor al cerrar tras deshacer o cancelar: arreglar / dejar / <otra cosa>
H5 CRITICAL sin consejo del care budget en su detalle: arreglar / dejar / <otra cosa>
H6 Orden de las fases contra el queue_order: arreglar / dejar / <otra cosa>
H7 Lector a 66ch con tablas a todo el ancho: arreglar / dejar / <otra cosa>
H8 Filtro de títulos que no queda fijo: arreglar / dejar / <otra cosa>
H9 Quién espera a este run: arreglar / dejar / <otra cosa>
H10 Clase de trabajo en la lista de sin clasificar: arreglar / dejar / <otra cosa>
```
