# SHELL MULTIPROYECTO — la consola agrega N proyectos con menú lateral (`O4.P3`)

> Entregable de conocimiento del run `RUN-CONSOLE-SHELL-MULTIPROYECTO-001` (fase `O4.P3`).
> Documenta **las cuatro decisiones de arquitectura con su razón**, **la forma del registro de
> proyectos**, **cómo se probó la capacidad de N con un proyecto sintético**, **el anuncio de
> ausencia por superficie (§20) y el fix de layout del banner**, y **qué necesita cada proyecto
> para entrar al menú** — el insumo directo de `O4.P4` (cantu-studio) y `O4.P6` (aiw).
>
> Fecha: 2026-07-25. **No se ejecutó git en ninguna forma.** No se tocó el roadmap canónico,
> `DECISIONES.md`, `CONTRATO.md` ni ningún record existente. **`cantu-studio` no fue modificado**
> (md5 de sus tres archivos de consola idénticos a los del ACABADO: `a0bf2e15…af165b` y
> `4000bebd…528860`, mtime `2026-07-22 19:25`). **`aiw` y `cantu-lessons` no fueron tocados.**
> **El `.aiw/` de este repo sigue NO EXISTIENDO** (estado que ACABADO E.3 dejó registrado); este
> trabajo tampoco lo creó. **`.project/` no fue re-emitido**: el emisor no se corrió y los seis
> archivos emitidos siguen byte-idénticos; por eso Docs sigue listando 28 documentos y este record
> aparecerá en el índice cuando el emisor vuelva a correr, no antes.
>
> **Archivos escritos por este trabajo, y ninguno más:**
> `project-console/index.html` · `project-console/assets/project-console.js` ·
> `project-console/assets/project-console.css` · `project-console/assets/project-shell.js` (nuevo) ·
> `project-console/serve.mjs` · `project-console/projects.json` (el registro, nuevo) ·
> `project-console/README.md` ·
> `tests/shell-server.test.mjs` · `tests/shell-model.test.mjs` · `tests/shell-switch.test.mjs` ·
> `tests/helpers/console-dom.mjs` (todos nuevos) ·
> los fixtures bajo `tests/fixtures/multi/` (registro de prueba + `hilo-verde/` + `roto/` +
> `vacio/`) · este record.
> **No se tocó** el fork D-035 (`docs/project-console/`), el prototipo retirado (`console/`), el
> tooling viejo (`tools/project-console/` y su `projects.config.json`), el proyector
> (`tools/projector/`) ni ninguna fuente bajo `.project/`.

Insumos, usados y no re-medidos: `ACABADO-DOCS-Y-EMISOR-GIT-HISTORY.md` (Bloque G, puntos
abiertos 2 y su asignación de §20 a esta fase), `PORT-IDENTICO-CONSOLA-O4-P11.md` (Bloque H, "para
el shell en concreto"), `EMISOR-CARPETA-PROPIA-O4-P2.md` (Bloque B, la decisión del envelope),
`MEDICION-FUENTES-CONSOLA.md`, `CONTRATO.md` (§1.a, §18, §19, §20). Referencia visual:
`design/AIW-Dashboard-prototype.html`.

---

## BLOQUE A — Qué es el shell, en una frase por pieza

- **`project-console/projects.json`** — el REGISTRO: la lista operator-maintained de proyectos
  que esta consola agrega. Es el único lugar, fuera del dato, donde vive identidad de proyecto.
- **`serve.mjs`** — gana un espacio virtual **`/projects/<key>/**`** que mapea cada key del
  registro a su root en disco (hermanos incluidos), read-only, con guarda de contención por root
  y sin `.git`. Fuera de ese espacio sigue sirviendo solo el root del repo, como antes.
- **`project-shell.js`** (nuevo, módulo) — la capa de agregación: lee el registro, carga UN
  snapshot por proyecto, pinta el menú lateral y el tablero Portfolio, y le entrega el proyecto
  activo al renderer trasplantado. No pinta ninguna vista por-proyecto.
- **`project-console.js`** (el port de O4.P11) — sigue pintando UN proyecto, exactamente como
  antes. Ganó tres hooks que el shell conduce: `setActiveProjectBase(base)`,
  `resetProjectScopedState()` y `loadActiveProject()`. Sus vistas no se rediseñaron.

El prototipo del operador se tomó como blanco de COMPOSICIÓN y componentes del chrome nuevo
(sidebar oscuro persistente con brand + items por proyecto + colapso; header global; tablero de
tarjetas de tres zonas). La PALETA de la superficie compartida es la del port: el chrome nuevo
envuelve vistas que ya son oscuras, y un flip de tema claro/oscuro por vista sería exactamente el
choque que el encargo manda resolver a favor del renderer portado en lo que ya existe. Del
prototipo no se copiaron los controles sin dato ni función (botón "Scan Workspace", "Last scan",
celda "Last Commit" del tablero — su fuente sería `git_history.json`, que es carga pesada
por-proyecto y opcional; History la muestra a un clic). Mismo criterio que el ACABADO aplicó en
Docs: un control sin dato detrás no se embarca.

---

## BLOQUE B — Las cuatro decisiones de arquitectura

### B.1 CÓMO SE DESCUBREN los proyectos: un registro nuevo, no el config viejo

**Archivo:** `project-console/projects.json`. **Forma:**

```json
{
  "registry_model": "project_registry_v1",
  "title": "AIW Console",
  "projects": [
    { "key": "aiw-console", "root": ".." },
    { "key": "cantu-studio", "root": "../../cantu-studio" },
    { "key": "aiw", "root": "../../../aiw" }
  ]
}
```

- **`key`** — el segmento de URL bajo `/projects/`; charset `[A-Za-z0-9][A-Za-z0-9._-]*`, así una
  key jamás puede colar un separador ni un traversal. Es identidad ESTABLE previa al dato: el menú
  necesita nombrar a un proyecto aunque su snapshot no cargue.
- **`root`** — la raíz del REPO del proyecto, **relativa a la carpeta del registro**
  (`project-console/`). Hermanos bajo `projects/<repo>/` se alcanzan con `../../<repo>` y `aiw`
  (que vive en la raíz del workspace) con `../../../aiw`: cero rutas absolutas. Se registra el
  root y no la ruta a `.project/` porque la consola lee DOS cosas por proyecto — la carpeta del
  contrato Y los cuerpos `.md` del repo (Docs) — y `«root»/.project/` es derivable porque §1 fija
  el nombre de la carpeta; al revés no.
- **`title`** — el nombre de la consola agregadora (brand del sidebar y título de pestaña del
  Portfolio). Vive en el registro y no en el código por la misma razón que el `<title>` del port
  salió del HTML en O4.P11 (C.9): identidad en el dato, no en el código.

**Por qué NO se reutilizó `projects.config.json`** (raíz del repo): ese archivo es del tooling
viejo (`tools/project-console/serve-project-console.mjs`, fuera de alcance) y su semántica es
otra — "qué roots PROYECTAR al arrancar", corriendo el proyector viejo y escribiendo `.aiw/views/`.
Reutilizarlo habría hecho que el server viejo intentara proyectar entradas del shell. Dos
consumidores con dos semánticas no comparten un archivo de configuración; el registro nuevo vive
junto a su único consumidor.

**Cómo lo sirve el server.** La URL del registro es fija para el cliente
(`/project-console/projects.json`); el ARCHIVO detrás la decide `PC_REGISTRY` (ruta relativa al
root del repo, o absoluta), que es como la suite y el QA sirven los fixtures sin editar el
registro real. El server relee el registro en cada petición `/projects/**` (un archivo pequeño;
el operador puede añadir un proyecto sin reiniciar). Entradas inválidas se saltan una a una
(fail-soft), nunca tumban a las demás. El registro es dato del operador: puede apuntar a
cualquier root de su disco, y ese root se sirve **solo dentro de sí mismo** (contención por
`resolve` + prefijo, traversal crudo y codificado probados 403/404, `.git` prohibido en cualquier
namespace, 127.0.0.1, GET/HEAD).

### B.2 QUÉ SE LEE PARA EL MENÚ: un snapshot por proyecto al arrancar; lo pesado, al seleccionar

Al arrancar, el shell hace N+1 fetches: el registro y **`snapshot.json` de cada proyecto** — el
único artefacto requerido de la capa 1. Con eso el menú marca a cada entrada (label + estado) y el
Portfolio pinta sus tarjetas. Las fuentes pesadas del proyecto (roadmap.json, docs_index.json +
cuerpos `.md`, git_history.json, guardrails.json, no_claims.json) cargan **solo cuando el proyecto
se vuelve activo**, y se recargan en cada selección (frescura, y de paso hace trivial el "cero
estado cruzado").

Razones, en orden de peso: (1) el label y el estado del menú deben salir del DATO, no de una copia
en el registro — y el archivo diseñado para describir un proyecto es su snapshot (§3); no hay
"encabezado" aparte que leer sin inventar un artefacto nuevo. (2) El snapshot es un archivo (~53KB
local); N es el tamaño del workspace del operador (hoy 3). (3) Cargar N roadmaps + N índices de
docs + N historias al arrancar compraría exactamente cero píxeles: solo un proyecto se inspecciona
a la vez, que es el flujo declarado del operador. La tarjeta del Portfolio se limita a lo que el
snapshot solo puede decir con verdad (identidad, `operational_status`, conteos por token de
`run.status`, conteos del árbol, statuses derivados por objetivo, `current_status_summary`).

Cada fetch de arranque es fail-soft por proyecto: `missing` (no se pudo traer),
`invalid` (trajo pero no parsea o no trae `project_id`), u `ok`. Al seleccionar, el resultado real
de la carga ACTUALIZA el estado del menú: un proyecto puede sanar (su emisor corrió) o romperse
entre el arranque y el clic, y el chip debe decirlo.

### B.3 IDENTIDAD Y VOCABULARIO POR PROYECTO: el shell ejecuta la tabla del snapshot activo

El shell es **el primer consumidor real de la decisión del envelope de O4.P2**: la única
derivación de status que hace — el token de cada objetivo del tablero Portfolio — sale de
**ejecutar la tabla `taxonomy_model.derivations[...]` que el propio snapshot declara**, eje por
eje (`vocabularies["objective.status"].derived_by` → tabla → precedencia en orden, cuantificadores
`any`/`all`/`otherwise`, `empty_input: "malformed"` → ningún token). Los conteos de runs de la
tarjeta iteran los tokens de `vocabularies["run.status"].tokens` del propio snapshot, en su orden
declarado; un token presente en el dato pero no declarado se reporta verbatim, no se esconde.

**Cero vocabulario horneado, medido:** grep de los diez tokens de ambos proyectos (`planned`,
`active`, `blocked`, `completed`, `in_progress`, `idle`, `por_hacer`, `haciendo`, `hecho`,
`en_marcha`) sobre `project-shell.js` → **0 comparaciones contra tokens de status**. Las tres
apariciones de la cadena `"active"` son `classList.toggle("active", …)` — la clase CSS del item
de navegación activo, no un token de datos. Grep `-ci "jame\|cantu"` sobre los seis archivos de
consola escritos → **0, 0, 0, 0, 0, 0**; el único hit fuera de tests es la entrada
`cantu-studio` **del registro**, que es exactamente donde la identidad debe vivir. Cero rutas
absolutas en todo lo escrito (grep reportado).

**La prueba con vocabulario ajeno** (fixture `hilo_verde`, B.4): runs `por_hacer`/`haciendo`/
`hecho`/`atascado`, colecciones `pendiente`/`empezado`/`en_marcha`/`atascado`/`hecho`, modelo
`test_tree_v1` — ni un token ni el identificador del modelo coinciden con los de aiw-console, y el
shell lo pinta **sin un solo cambio de código**: tarjeta con `en_marcha`/`hecho` derivados,
conteos por sus tokens, chips de run verbatim en las vistas. Que el modelo se llame distinto
también prueba que **ningún gate del shell compara cadenas de modelo** (la misma doctrina del gate
por forma que el port aplicó en C.7).

**El límite honesto, dicho como tal:** el renderer trasplantado conserva de Cantu heurísticas de
DISPLAY que comparan `run.status` contra sus cuatro tokens (agrupación de la cola en
Now/Upcoming/History, conteo de la barra de progreso por objetivo, "current work" del Overview).
Con un vocabulario ajeno esas heurísticas degradan con gracia (todos los runs caen al grupo
History; los chips muestran el token real de cada run; nada revienta ni miente), pero no son
taxonomy-driven. Rediseñarlas es rediseñar las vistas portadas — fuera de alcance explícito de
esta fase. La recomendación 2 del VEREDICTO ("una sola implementación compartida de la
derivación") queda cumplida para el shell (una implementación, `evaluateDerivationTable`, probada
contra la tabla real y la ajena) y ANOTADA para las vistas por-proyecto como trabajo del pulido
(`O4.P8`) o del corte (`O4.P7`), donde tocar el renderer sí esté en mandato.

### B.4 DEGRADACIÓN POR PROYECTO: presente en el menú, marcada, sin contagio

Estados por entrada: `ok` (subtítulo = su `operational_status`), `missing` ("no snapshot"),
`invalid` ("snapshot unreadable"). Un proyecto degradado:

- **Aparece en el menú y en el Portfolio** con su estado y una tarjeta que nombra EL ARCHIVO
  (`projects/<key>/.project/snapshot.json …`), no desaparece en silencio (§20).
- **Se puede abrir**: la vista de proyecto anuncia el snapshot ausente en el banner (con la causa
  real — p.ej. el error de parse JSON con línea y posición) y en CADA superficie, porque el reset
  ya borró los píxeles del proyecto anterior y una superficie en blanco afirmaría que el dato no
  existe.
- **No rompe nada**: seleccionar `roto` y volver a `aiw-console` repinta 0/1/9/3/18 intacto
  (probado en navegador y en la suite).

Los DOS sabores reales están cubiertos con fixtures: `vacio/` (root sin `.project/` — el estado
HOY de cantu-studio y aiw) y `roto/` (snapshot con JSON truncado a propósito).

---

## BLOQUE C — Cero estado cruzado: dónde vive y cómo se probó

Todo el estado por-proyecto del renderer se resetea en UN lugar (`resetProjectScopedState()`), que
el shell invoca antes de fijar la base nueva: datos (`appData`), los arrays de diagnóstico
(`loadedSources`/`failedSources`), el cache del modelo v3, la pila y origen del run-detail, los
seis flags del editor (inalcanzable, pero se resetea igual), el cache de cuerpos de Docs, la
selección y modo de Docs, la rama y marcador de History con su timer de polling, el estado del
drawer y del modal **incluido su innerHTML oculto**, el banner, y el chrome a sus defaults
(pestaña Overview, subview Run Queue, sección Governance, scroll arriba) más `document.title`
neutro.

**Probado, no asumido, en dos capas:**

1. **Suite (vm-harness).** `tests/shell-switch.test.mjs` corre el renderer REAL dentro de
   `node:vm` sobre un stub mínimo de DOM (`tests/helpers/console-dom.mjs`), sirviendo por el
   mismo layout `/projects/<key>/` del server. Afirmaciones: tras cambiar A→B, ningún marcador de
   A (run-ids `RUN-CANTU-`/`RUN-JAME-`/`RUN-CONSOLE-`, títulos de objetivos, título del roadmap)
   sobrevive en ninguna superficie pintada; y tras A→B→A el dump de superficies es **igual** al
   primer render de A (tiempos relativos de History normalizados). El stub es deliberadamente
   pequeño y sus límites están escritos en su cabecera (sin layout, sin CSS, sin clicks reales).
2. **Navegador (DOM real).** Con estado ensuciado a propósito en `hilo-verde` (pestaña Docs
   abierta, subview Roadmap, documento no-default en el lector), el cambio a `aiw-console` dejó:
   pestaña Overview, subview Run Queue, sección Governance, scroll 0, lector en el doc default de
   aiw-console, 28 docs, cola 0/1/9/3/18, History con commits — y un barrido de residuos con los
   marcadores distintivos del fixture (`hilo_verde`, `RUN-HILO-`, `Telar`, `Urdimbre`,
   `haciendo`, `en_marcha`) = **0 hits**. (Un barrido ingenuo por la subcadena `hilo` da 2 hits
   que son DATO REAL de aiw-console — el commit "handoffs por hilo" y el doc "HANDOFF — hilo
   aiw-console" — anotado aquí para que nadie lo lea como fuga.)

---

## BLOQUE D — §20 por superficie, y el fix del banner

### D.1 El anuncio por archivo, en la vista afectada

Era el punto abierto 2 del Bloque G del ACABADO, asignado por §20 explícitamente a esta fase. Cada
superficie viva que pierde su fuente lo dice EN la superficie, NOMBRANDO el archivo con su
proyecto (`projects/<key>/.project/<archivo>`):

| Superficie | Fuente | Anuncio |
|---|---|---|
| History | `git_history.json` | ya lo hacía (port C.7); ahora la ruta mostrada incluye el proyecto |
| Overview · Roadmap · Run Queue | `roadmap.json` | "could not be loaded" nombrando la ruta; distingue "cargó pero no trae `objectives[]`" |
| Docs (navegación) | `docs_index.json` | "Docs index unavailable" + ruta; distingue índice ausente de índice vacío |
| Governance → Guardrails | `guardrails.json` | banner en SU sección + ruta |
| Governance → Claims | `no_claims.json` | banner en SU sección + ruta |
| Toda la vista de proyecto | `snapshot.json` (requerido) | banner con la causa + cada superficie anuncia |

Una tabla que CARGÓ vacía conserva su estado vacío de siempre ("No records available…"): ausencia
y vacío son verdades distintas y §20 exige decir la correcta (probado por test). Las 9 fuentes
diferidas no alimentan hoy ninguna superficie viva del port (sus consumidores de Cantu están
dormidos o retirados), así que su ausencia se sigue anunciando donde único tiene efecto: el banner
agregado —que §20 permite como resumen— y Console Diagnostics, archivo por archivo. El día que una
gane emisor y superficie, entra por la misma puerta que estas seis.

### D.2 El defecto de layout, medido y corregido

**El defecto:** `.docs-layout` usaba `height: calc(100vh - 48px)` + `margin: -28px -32px`. Esa
aritmética supone que el panel arranca pegado a la barra de pestañas; con el banner de opcionales
visible (que en este proyecto es SIEMPRE, faltan 9), el margen negativo lo subía por encima del
banner y el alto fijo lo desbordaba por debajo del viewport — el encimado que el operador reportó.

**El fix:** `.content` es ahora una columna flex; con Docs activa, la columna cede su padding
(`:has(> #tab-docs.active)`), el banner conserva su inset con margen propio y **reserva su alto
como item normal del flujo**, y el panel de Docs flexiona a exactamente el alto restante — sin
márgenes negativos y sin aritmética de viewport. El banner NO se suprime: §20 lo exige.

**Verificado en DOM real (1366×800):** overlap banner↔panel = **0 px**; panel a ras del borde
inferior (`bottom === innerHeight`) y del derecho; **0 px** de scroll residual en `.content`
(antes había doble scroll); nav y reader scrollean internamente como siempre. En ≤1040px el panel
vuelve al flujo apilado preexistente, con su inset.

---

## BLOQUE E — La capacidad de N, demostrada con un segundo proyecto sintético

`tests/fixtures/multi/hilo-verde/` es un proyecto SINTÉTICO: `.project/` mínimo escrito a mano
(snapshot + roadmap + docs_index + guardrails + no_claims; git_history ausente a propósito),
`project_id: "hilo_verde"`, 2 objetivos / 3 fases / 6 runs, dos cuerpos `.md` reales, y el
vocabulario ajeno del B.3. Su `generated_from` dice en texto plano que es un fixture no emitido, su
guardrail y su no-claim declaran que no describe trabajo real, y **no está en el registro real**:
vive en el registro de fixtures (`tests/fixtures/multi/projects.json`), que se sirve con
`PC_REGISTRY` — presentarlo en el menú de producción sería presentarlo como proyecto verdadero.

**La prueba, reportada:**

- **Suite** (85/85 verde: 49 previas + 36 nuevas): el server sirve su snapshot y sus cuerpos por
  `/projects/hilo-verde/**` byte-iguales al disco; la derivación con SU tabla da
  `en_marcha`/`hecho` (objetivos) y `en_marcha`/`empezado` (fases) — los cinco cuantificadores
  ejercitados; el vm-harness lo renderiza al seleccionarlo, con History anunciando SU
  `git_history.json` ausente; A→B→A limpio en ambas direcciones.
- **Navegador** (server de fixtures, puerto 8799): aparece en el menú como "Hilo Verde /
  en_marcha"; su tarjeta pinta `por_hacer 1 · haciendo 1 · hecho 4 · atascado 0`,
  "2 objectives · 3 phases · 6 runs", objetivos "Tejido base en_marcha" y "Remate hecho", y su
  `current_status_summary`; al abrirlo, las cinco pestañas repintan con sus datos (2 docs con
  cuerpo renderizado, guardrail y claim propios, History con su §20).
- **aiw-console al lado, intacto:** con el shell puesto, renderiza exactamente lo medido en
  O4.P11/ACABADO — Overview con el run #10 activo, cola 0/1/9/3/18 (13 pendientes), árbol con 2
  objetivos/15 fases/31 runs, 28 docs con títulos limpios, History con los commits reales, 7
  guardrails, 5 claims, Diagnostics 6 Loaded / 9 Failed, botón Edit `hidden` con
  `display: none` computado.

---

## BLOQUE F — Qué necesita un proyecto para entrar al menú (insumo de O4.P4 y O4.P6)

1. **Una línea en el registro**: `{ "key": "<url-safe>", "root": "<ruta relativa a
   project-console/>" }`. Con solo eso ya aparece en el menú — marcado "no snapshot" — porque §20
   prefiere la ausencia anunciada a la invisibilidad. cantu-studio y aiw **ya tienen su línea**;
   hoy se ven así, que es su estado verdadero.
2. **`«root»/.project/snapshot.json`** (capa 1 del CONTRATO) con: `project_id`,
   `operational_status`, `project_summary`, `current_status_summary`, `roadmap_tree` (3 niveles,
   nada derivado almacenado) y **`taxonomy_model` con `vocabularies` + `derivations`** — el shell
   deriva con LA TABLA DEL ARCHIVO; un snapshot sin taxonomy no revienta nada, pero sus objetivos
   salen sin token (guion), no con un token inventado.
3. **Opcionales, cada uno compra su superficie**: `roadmap.json` (Overview/Roadmap/Cola),
   `docs_index.json` + los `.md` en el repo (Docs), `guardrails.json` y `no_claims.json`
   (Governance), `git_history.json` (History). Cada ausencia se anuncia en su vista, nombrando el
   archivo — no hay que stubbear nada para "verse bien".
4. **Nada más.** Ni package.json, ni config, ni registro en el server: la key del registro es el
   único acoplamiento, y el emisor de O4.P2 (modo `roadmap_tree`) ya produce exactamente los
   archivos de 2–3 para cualquier root con la forma correcta.

---

## BLOQUE G — Verificaciones y fronteras

- **Suite: 85/85 verde** (`node --test`): 49 previas intactas + 14 de modelo/registro/taxonomía
  (`shell-model`) + 13 de server (`shell-server`) + 9 de cambio/degradación (`shell-switch`).
  Las nuevas cubren los cuatro mandatos del encargo: descubrimiento (registro y namespace
  virtual), cambio sin estado cruzado (contra el renderer real), vocabulario por proyecto (tabla
  ajena ejecutada + la real derivando `active`/`in_progress` como lo midieron O4.P2 y el
  VEREDICTO), y proyecto ilegible que no rompe (roto + vacio + registro ilegible + key no
  registrada).
- **Read-only probado por método**: POST/PUT/PATCH/DELETE → 405 `read_only_console` en rutas
  reales, virtuales, el registro y rutas inexistentes; HEAD sin cuerpo; traversal crudo y
  codificado → 403/404; `.git` → 403 en los dos namespaces. El server no tiene una sola ruta de
  escritura; los roots hermanos se LEEN.
- **QA en navegador**: contra el DOM renderizado (el panel de esta sesión no compositaba cuadros
  para captura — la misma limitación que el ACABADO F documentó; la evidencia DOM es la fuerte
  aquí: dice qué nodos existen y qué geometría tienen). Ambos servers levantados (8788 registro
  real, 8799 fixtures), verificado todo lo reportado en los bloques C, D y E, más el colapso del
  sidebar (256→56→256 px) y la vuelta al Portfolio.
- **Greps de identidad**: Bloque B.3. **Fronteras**: cabecera de este record.

## BLOQUE H — Qué queda abierto, dicho como tal

1. **Las 9 fuentes diferidas** — sin cambio: sin emisor, anunciadas en agregado + Diagnostics.
   Entran por §18.b cuando tengan emisor, y entonces su superficie deberá anunciar por archivo
   como las seis de D.1.
2. **Las heurísticas de display del renderer siguen atadas al vocabulario de Cantu** (B.3, límite
   honesto). Taxonomy-driven para las vistas por-proyecto = trabajo de `O4.P7`/`O4.P8`, no de
   este encargo.
3. **El Portfolio no muestra "Last Commit"** (prototipo) — requiere decidir si `git_history.json`
   entra a la carga de arranque. Decisión pendiente de pulido, anotada en A.
4. **El registro no se valida contra el server al arrancar** más allá del fetch por proyecto: una
   key registrada dos veces se reporta (parse), pero no hay superficie que liste los errores del
   registro al operador — hoy van a la consola del navegador. Pulido.
5. **`cantu-lessons` no está en el registro** — ninguna fase lo emite ni lo nombra; añadirlo es
   una línea del operador cuando lo decida.
6. **Los tests de cambio corren sobre un stub de DOM** cuyos límites están declarados en su
   cabecera; el complemento browser-real quedó hecho a mano en este QA. Si algún día hay harness
   de navegador en la suite, el vm-harness es reemplazable pieza por pieza.
7. **Récord pendiente del emisor**: cuando el proyector vuelva a correr, este record entra al
   `docs_index` (29.º) y Docs lo mostrará; nada que hacer aquí.

## REPORTE para QA del operador

**Arranque:** `node project-console/serve.mjs` → **http://127.0.0.1:8788/project-console/index.html**
(`PC_PORT` cambia el puerto). La consola abre en el **Project Portfolio**.

**Para ver el fixture sintético en el menú** (demo de N sin tocar el registro real):
`PC_REGISTRY=tests/fixtures/multi/projects.json node project-console/serve.mjs` y abrir la misma
URL — el menú lista además `Hilo Verde` (vocabulario ajeno), `roto` y `vacio` (degradados).

**Qué mirar al cambiar de proyecto:**

1. En el **menú lateral**, `AIW Console` con subtítulo `active`; `cantu-studio` y `aiw` con
   `no snapshot` (su estado real hasta O4.P4/O4.P6). Sus tarjetas del Portfolio nombran el
   archivo exacto que falta.
2. Clic en `AIW Console` → las cinco pestañas de siempre, idénticas al port (cola 0/1/9/3/18, 28
   docs, History con commits). El banner de opcionales sigue ahí (dice la verdad de 9 fuentes) y
   en **Docs ya no se encima**: empuja el panel hacia abajo.
3. Con fixtures: abrir `Hilo Verde`, ensuciar estado (abrir un doc, cambiar de subview), volver a
   `AIW Console` → todo abre en sus defaults y ningún dato del otro proyecto queda a la vista; el
   camino inverso igual.
4. Abrir `roto` → banner nombrando `projects/roto/.project/snapshot.json` con la causa; volver a
   cualquier otro → intacto.
