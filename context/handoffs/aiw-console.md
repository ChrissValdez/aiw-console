# Relevo — hilo `aiw-console`

**Fecha:** 2026-10-29 · **Sustituye** al relevo del 2026-10-21 y a sus avisos de la mudanza del 10-28 y el 10-29.

Esta fue **la primera sesión de la cabina en Claude Code**, en la PC (`DESKTOP-525K0IS`), el 2026-10-29 de las 10:17 a
las 10:30 más o menos, hora de la PC (UTC−6). Es el piloto de D-081 para este hilo. Solo hubo arranque y cierre:
**no se tocó el canónico, no se emitió ningún ticket y no se abrió ni cerró ningún run.** La cola sigue sin nada que la
cabina pueda ejecutar sola.

> ➡ **La próxima sesión también es en Claude Code.** El contrato es `context/cabinas/aiw-console/CLAUDE.md` (v0), con
> `context/cabinas/REGLAS-DE-CABINA.md`. Lee los dos enteros antes de contestar, porque la app abre la sesión en
> `AIW_Workspace` y ninguno de los dos se carga solo (pasó otra vez el 10-29). Junto al CLAUDE.md está su veredicto,
> `VEREDICTO-PILOTO-2026-10-29.md`, con lo que debería cambiar en una v1. **Mientras el operador no apruebe la v1,
> manda la v0.**

La sustancia va DENTRO. Los punteros a records son procedencia, no respuesta.

---

## 0. LA SESIÓN DEL 2026-10-29 (Claude Code)

Medido por la cabina, hora de la PC:

| hora | qué | resultado |
|---|---|---|
| 10:17:45 y 10:22:38 | locks en los **nueve** repos del workspace: `Acervo`, `PHD`, `aiw` y, en `projects/`, `aiw-console`, `cantu-lessons`, `cantu-quizzes-latex`, `cantu-revisiones`, `cantu-studio` y `phd-p2-experiment` | ninguno. A las 10:17 solo se miraron siete: `Acervo` y `PHD` entraron a las 10:22 (ver §6) |
| 10:18:07 | `git pull --ff-only` en `aiw-console`, con `GIT_TERMINAL_PROMPT=0` y `GCM_INTERACTIVE=never` | `Already up to date`. No pidió credenciales ni abrió ventanas |
| 10:18:12 | `ls-remote origin main` contra `origin/main` | los dos en `04f780c` |
| 10:18:15 | `git push --dry-run origin main` | `04f780c..8dc9458  main -> main`, exit 0 |
| 10:18:39 – 10:18:53 | el canónico | igual que el relevo del 10-21 (§1) |
| 10:19:00 | suite | **982 / 982 / 0**, en 3,6 s |
| 10:19:24 | HEAD | cambió mientras se medía: el hilo `phd-p2-experiment` commiteó su relevo (`0b4235a`) |

**Commits que no eran de esta cabina.** Al arrancar había en local tres commits sin publicar, de otros hilos o de la
cabina de Cowork: `85eee7c` (mudanza de `cantu-studio`, 10:15), `8dc9458` (el `CLAUDE.md` v0 de esta cabina, 10:16) y
`0b4235a` (relevo de `phd-p2-experiment`, 10:19). La cabina avisó de que su push los publicaría, y el operador respondió
«Cierra ahora». **Pero a las 10:20:30 alguien los publicó desde esta PC** (el reflog de `origin/main` dice «update by
push»). No fue esta cabina, y no se sabe quién. A las 10:24, `phd-p2-experiment` commiteó `9a90a72` (su `CLAUDE.md` v0),
y a las 10:26:39 también se publicó desde esta PC, de la misma forma.

**El primer push real de la cabina es el del commit que trae este relevo**, y solo lleva ese commit. Si lo lees en
GitHub o en la otra computadora, entró. **Para la prueba del push de la próxima sesión:** el HEAD tiene que ser ese
commit (hijo de `9a90a72`) o uno posterior.

---

## 1. DÓNDE ESTAMOS

`projects/aiw-console/roadmap/roadmap.json`, medido el 2026-10-29 a las 10:18:
- md5 **normalizado (LF) `3e088141bcb1b7196f0540b8b10a1067`**, el mismo que da el blob de HEAD y el mismo que el del
  10-21;
- md5 del **árbol (CRLF, en la PC) `927c6670a6623510ae7c26f8a7ebceac`**.

Ningún commit lo toca desde `6ac4128` (2026-10-21, el cierre del `#78`). Tiene **82 runs**: `completed 79 · planned 3 ·
active 0`, densidad `1..82`, ids únicos, y `checkInvariants` sin errores con el motor de este repo
(`tools/roadmap/roadmap-core.mjs`, 2 558 líneas, que conoce `barrier`, `lane` y `batch`; el canónico no declara lanes
ni batches). El árbol está limpio y no hay ningún `index.lock`.

**La suite da 982 / 982 / 0** (2026-10-29, 10:19, medida por la cabina). Desde el `#76` **cualquier fallo es nuevo**.

| # | run | estado | por qué espera |
|---|---|---|---|
| 80 | `RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001` «Deep visual audit of the console, led by the operator» | planned | **PAUSADO por el operador** tras su primer tiempo. Se reanuda cuando el operador quiera recorrer la consola |
| 81 | `RUN-CONSOLE-CANTU-CANONICAL-OUT-OF-AIW-001` «Move cantu-studio's canonical roadmap out of .aiw before the cutover can delete it» | planned | Cantu Studio sigue pausado por D-079 (su relevo, 2026-10-29: «CANTU STUDIO ESTÁ EN PAUSA»). Escribe en `cantu-studio` |
| 82 | `RUN-CONSOLE-CORTE-RETIRO-LOCAL-001` «Cutover: retirement of Cantu's local console and deletion of .aiw» | planned | depende del #80 y del #81. **Su primer paso es la compuerta** («¿algo es PEOR que en la consola local de Cantu?»), que salió del `#80` |

**Los `#N` son coordenadas medidas el 2026-10-29 a las 10:18.** Derívalos del canónico. El texto de los tres dice
«PAUSED».

### Al reanudar el `#80`

Su primer tiempo está hecho: `context/aiw-console/records/GUIA-RECORRIDO-77-2026-10-20.md` (18 superficies, cómo llegar
a cada una, los diez hallazgos vueltos a medir). **Pero la guía es una medición fechada y el `#78` ya cambió la
consola**: resolvió H1 y H8, quitó del Portfolio dos superficies (la lista de objetivos y el panel «Awaiting a verdict»)
y renunció a H7. **Antes de que el operador recorra nada, un taller vuelve a medir la guía.** Lo dice el propio texto del
run (párrafo «PAUSED 2026-10-21»). Las herramientas de captura del `#78` están en `tools/capturas/`; su README dice qué
ajustar antes de reusarlas.

Reanudar el `#80` sería además **el primer ciclo completo en Claude Code**: `set-status` por la consola en otro puerto,
ticket, commit y push. El arranque del 10-29 no pudo probar eso.

---

## 2. LO QUE HIZO LA SESIÓN DEL 2026-10-04 AL 2026-10-21 (Cowork)

| # | run | clase | en una línea |
|---|---|---|---|
| 64 | `RUN-CONSOLE-SHARED-RENDERER-QUOTES-001` | — | citas multilínea; QA visual cerrada |
| 65 | `RUN-CONSOLE-DOCS-TITLE-SEARCH-001` | — | buscar títulos de documentos en Docs y en el lector |
| 66 | `RUN-CONSOLE-ROADMAP-DEFAULT-TAB-001` | — | los proyectos abren en Roadmap (D-075) |
| 67 | `RUN-CONSOLE-PROJECT-CONFIG-BUTTON-001` | — | care budget y nota de sin-clasificar detrás de un botón de configuración (D-075) |
| 68 | `RUN-CONSOLE-CLASSIFICATION-CLASS-RELATION-CONTRACT-001` | DOCUMENTATION | `work_class` entra a la clasificación; la relación entre runs se deriva (D-080) |
| 69 | `RUN-CONSOLE-CLASSIFICATION-CLASS-RELATION-UI-001` | UX_DESIGN | la consola muestra clase y relación |
| 70 | `RUN-CONSOLE-THREAD-HTML-REPORTS-CONTRACT-001` | FUNCTIONALITY | el reporte HTML de cada hilo, fase 1 (D-076). **El contrato sigue en BORRADOR, sin piloto**, y el operador decidió que CL no lo adopta |
| 71 | `RUN-CONSOLE-CONTENT-BATCH-VIEW-001` | UX_DESIGN | un lote de contenido se lee como unidad |
| 72, 73 | paridad y UI/UX | — | **RETIRADOS sin ejecutar** (repaso de cola); absorbidos por la auditoría |
| 74, 75, 77 | `RUN-CONSOLE-STALE-TEXTS-REPAIR-001/002/003` | DOCUMENTATION | textos que describían el repo en falso; el lanzador ya no dice ser de sólo lectura |
| 76 | `RUN-CONSOLE-EOL-TEST-PREMISE-REPAIR-001` | FUNCTIONALITY | el test de finales de línea caducado, sustituido: suite limpia |
| 78 | `RUN-CONSOLE-UI-POLISH-001` | UX_DESIGN | **pulido visual** (Fable 5.1, Max) en `8992b6d`; **ampliación** del Portfolio en `e61e36a`. Cada uno se revierte solo |
| 79 | `RUN-CANTU-ROADMAP-PHASE-OBJECTIVE-OPS-001` | FUNCTIONALITY | **RETIRADO sin ejecutar**: la cabina ya hace esas operaciones |

### Lo que el `#78` quitó, y no está en ninguna otra parte

- La **palabra de estado de cada objetivo** (COMPLETED / ACTIVE / PLANNED): el segmento «Roadmap» sólo muestra recuentos
  y porcentaje.
- El **recuento de veredictos pendientes entre proyectos**. El de cada run sigue en su detalle, sección «Run report»,
  píldora «no verdict yet».

Se le dijo al operador antes de su «pass».

---

## 3. DECISIONES

Escritas por este hilo en `context/DECISIONES.md`:

- **D-074** — AIW resuelve trabajo **secuencial**, y se prueba en un **proyecto de prueba**, no en uno vivo. **No tiene
  run todavía.**
- **D-075** — la consola muestra lo que ya existe; la capa AIW va detrás de configuración; los proyectos abren en
  Roadmap.
- **D-076** — cada hilo hace su propio reporte HTML y la consola lo enlaza.
- **D-080** — `work_class` entra a la clasificación; la relación entre runs se deriva.

D-077 a D-079 las escribió el hilo `cantu-studio`. **D-079 pausa Cantu Studio**, y por eso esperan el `#81` y el `#82`.
D-081 (la mudanza a la PC) la escribió el hilo `cantu-lessons`. **La última era D-081 el 2026-10-29 a las 10:19.
Mide el siguiente número antes de escribir una D**: escriben varios hilos.

**Hueco propio, declarado en el cierre del `#75`:** `CONTRATO.md:55` pide que la decisión que hace caducar un texto del
contrato anote esa corrección. D-076 y D-080 no lo hicieron; `DECISIONES.md` es append-only y no se reescriben. La
próxima D que caduque un texto del CONTRATO lo anota al escribirse.

---

## 4. LAS REGLAS DEL OPERADOR

Verbatim en `context/aiw-console/records/REGLAS-DE-OPERACION-DEL-OPERADOR.md`. En vigor:

- **R-01** — QA de fixtures con los comandos completos, cada vez.
- **R-02** — el push **no se recuerda** salvo cuando el operador declare que se cierra el hilo. **En Claude Code se queda
  sin objeto mientras el push funcione**, porque lo hace la cabina (`CLAUDE.md`, «Git»).
- **R-03** — todo ticket termina con `# Sesión`: mismo taller (sin modelo) o nuevo (con modelo y esfuerzo).
- **R-04** (2026-10-05) — **rutas completas en forma Windows**, listas para pegar en el Explorador.
- **R-05** (2026-10-21) — **no se pide QA en runs sin superficie que mirar.** Textos, contratos, `.md`, tests: la cabina
  verifica en disco y cierra declarando que no hubo QA. La QA humana es para lo que se ve en pantalla o para un punto
  crítico, y acotada. **Ésta es la que más cambia el ritmo.**

Y una que el operador pidió en la cabina de LECCIONES y que esta cabina también aplica (memoria de Claude Code, no record):
**todo mensaje cierra con «Qué necesito de ti» y «Qué procede»**, y si se espera algo, con **«⏳ EN ESPERA de …»**.

---

## 5. NOMBRADO Y SIN TOCAR

Ninguno es urgente. Juntos podrían ser un run de documentación cuando haga falta, **no por goteo**: tres rondas de textos
falsos demostraron que cada una encuentra otra capa.

- `project-console/serve.mjs` líneas 16, 135 y 1252 («four write routes»), y 27 y 778 («ALL SEVEN artifacts», falso
  donde la raíz no es su propio repo).
- `context/aiw-console/CONTRATO.md` §16, «Qué función esperan»: describe D-029 sin el reencuadre de D-057.
- `docs/CONTRATO-REPORTE-HTML-DE-CADA-HILO-v1.md:138`: dice dónde aparece el panel que el `#78` quitó.
- Títulos de `tests/run-report-surface.test.mjs:281` y `tests/run-html-reports.test.mjs:227`: dicen que el Portfolio
  cuenta veredictos.
- Tests que fijan el estado de datos reales y pueden caducar como caducó el de finales de línea:
  `tests/roadmap-batches.test.mjs:101`, `tests/roadmap-lanes.test.mjs:87`, `tests/roadmap-engine.test.mjs:160`.
- Propuestas del `#78` no aplicadas: la palabra de unidad del contador de clasificación, y H7 (el lector limita la prosa
  a 66ch y las tablas no; lo fijan dos tests de `doc-side-reader`).
- Renombrar `project-console/assets/doc-side-reader.js` (dice «side reader» y es un modal desde el `#63`).
- La raíz `/` de `serve.mjs` pinta la consola sin estilos.
- Las dos entradas que el taller del `#78` añadió a `AIW_Workspace\.claude\launch.json` eran de la laptop. **En la PC
  ese fichero no existe**: `AIW_Workspace\.claude\` está vacío (medido el 2026-10-29).
- **Nuevo, 2026-10-29:** la topología de `REGLAS-DE-CABINA.md` («CINCO proyectos», «cuatro relevos») está vencida. En
  disco hay **nueve repos** (§0) y **seis relevos** en `context/handoffs/`. Las reglas son copia verbatim del Project:
  ponerlas al día le toca al operador.

---

## 6. LA MÁQUINA Y EL OFICIO

### En Claude Code, en la PC (medido el 2026-10-29)

- **Windows, con Git Bash y PowerShell.** El disco va directo, sin el puente de Cowork y sin el tope de 180 s.
- **Locks: los nueve repos** de §0. El `CLAUDE.md` v0 dice «`aiw` y los de `projects/`», y con eso **se quedan fuera
  `Acervo` y `PHD`**, que también son repos. Se miran con `ls` o `find` sobre `<repo>/.git/*.lock`, sin correr git.
- **Git a la red** siempre con `GIT_TERMINAL_PROMPT=0` y `GCM_INTERACTIVE=never`. `credential.helper=manager`.
  `pull --ff-only`, `ls-remote` y `push --dry-run` respondieron sin pedir nada. La app corrió en modo *bypass*, así que
  **el permiso de Claude Code para `git push` no se probó**.
- **CRLF en el árbol.** `core.autocrlf=true` viene de `C:/Program Files/Git/etc/gitconfig` (el de sistema), y
  `ls-files --eol` da `i/lf w/crlf`. **Todo md5 dice si es del árbol o normalizado.**
- **La suite corre directa:** `node --test` desde la raíz del repo, 982 tests en 3,6 s. Lo de partirla en tandas era de
  la VM de Cowork.
- **`checkInvariants`** se importa desde un script fuera del repo (en el scratchpad de la sesión) con
  `import(pathToFileURL(<repo>/tools/roadmap/roadmap-core.mjs))`, y luego `loadRaw` → `parseRoadmap` → `checkInvariants`.
- **Puerto 8788**: es el de la consola del operador. A las 10:19 no escuchaba nadie. Según lo que midió LECCIONES en
  esta PC, Windows reserva los puertos **49705–50944** (`listen` da EACCES): elige uno fuera de ese rango.
- **Cuidado al leer fuera de esta carpeta:** al leer un fichero de `context/cabinas/lecciones/`, Claude Code cargó el
  `CLAUDE.md` de LECCIONES en esta sesión, porque carga el `CLAUDE.md` de la carpeta de cada fichero leído. No mandó
  nada aquí, pero es el contrato de otra cabina.

### Escribir el canónico, medido en Cowork y SIN PROBAR en Claude Code

Lo que es de `serve.mjs` sigue valiendo:

- `PC_PORT=<puerto> node project-console/serve.mjs`; **el flag `--port` se ignora**.
- POST a `/projects/aiw-console/__project-console/roadmap/edit` con `{op,args,apply:false}` y luego
  `{…,apply:true,baseline}`.
- Nombres de argumentos medidos:
  - `set-status` → `run`, `status`, `closeoutResult`;
  - `set-text` → `targetType:"run"`, `targetId`, `fullDescription`;
  - `insert` → `runId`, `title`, `summary`, `fullDescription` y uno de `after`/`before`/`endOfPhase` (hereda la fase
    del ancla);
  - `move` → `run` y uno de `after`/`before`/`toOrder`, con `toPhase` para cambiar de fase (**`move … before` de un run
    de otra fase NO cambia la fase: fue un no-op**);
  - `set-classification` → `run`, `workClass`.
- Re-emitir a mano: POST `/projects/aiw-console/__project-console/project/emit`.
- **Verificar tras escribir:** diff campo a campo contra la copia de antes, raíz idéntica, densidad, `checkInvariants` y
  el `.project/` emitido. **Parsear el JSON, no buscar con ventanas de texto**: dos sondas de ese tipo dieron resultados
  falsos (leían la entrada siguiente).
- La consola del operador lee las hojas de estilo del disco: un cambio visual se ve con Ctrl+F5. Un cambio de servidor
  necesita relanzar `start-console.cmd`, que para lo que haya en el 8788.

Lo que era de la VM de Cowork, y **no se ha comprobado aquí** ni en un sentido ni en otro:

- «el servidor muere entre llamadas de shell» (había que arrancarlo en la misma llamada que el driver);
- «`pkill -f serve.mjs` mata la propia shell»;
- «el permiso de borrado caduca» y los `tmp_obj_*` o el `maintenance.lock` que dejaba git.

En Claude Code, el `CLAUDE.md` manda levantarlo en segundo plano con `PC_PORT` y **pararlo por su PID**, nunca por un
patrón. Según LECCIONES, el PID sale de `Get-NetTCPConnection -LocalPort P -State Listen`, y antes de `Stop-Process` se
comprueba su `CommandLine`. **El primer `set-status` real es la prueba**: el md5 lo delata.

---

## 7. RECORDS

En `context/aiw-console/records/`, de la sesión del 10-04 al 10-21:

- `REFLEXION-DEL-OPERADOR-2026-10-04-PROPOSITO-Y-FRICCION-DE-LA-CONSOLA.md` (origen de D-074 a D-076)
- `REGLAS-DE-OPERACION-DEL-OPERADOR.md` (R-04, R-05 añadidas)
- `REPASO-COLA-72-78-2026-10-20.md`
- `ENCUADRE-PARADA-68-2026-10-19.md`, `ENCUADRE-PARADA-77-2026-10-20.md` (encuadre y pausa de la auditoría, y la
  aprobación de los runs `#76`/`#77`)
- `PROPUESTA-FASE-1-70-REPORTES-HTML-DE-CADA-HILO-2026-10-19.md`
- `GUIA-RECORRIDO-77-2026-10-20.md`
- `PETICION-PULIDO-UI-2026-10-21.md`
- Reportes de taller: `REPORTE-TALLER-65` a `-70`, `-74`, `-75`, `-76`, `-77` (es la guía de la auditoría),
  `-77-STALE-TEXTS`, `-78`, y `REPORTE-AMPLIACION-78`
- Veredictos: `VEREDICTO-64` a `-70`, `-74`, `-75`, `-78`

De la sesión del 2026-10-29: `context/cabinas/aiw-console/VEREDICTO-PILOTO-2026-10-29.md`, el veredicto de la cabina
sobre su `CLAUDE.md` v0.

Las capturas y comparaciones del `#78` están fuera del repo, en
`C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\`, y son desechables.

---

## 8. LA MUDANZA A LA PC (D-081)

**Hecha en dos tiempos, los dos el 2026-10-29:**

1. Por la cabina de Cowork en la PC, por la mañana: arranque de §2 de `context/cabinas/MUDANZA-2026-10-28.md` y
   revisión de su parte de `_scratch` (abajo).
2. Por esta cabina en Claude Code: el arranque del `CLAUDE.md` y el primer push real (§0).

Git es la fuente de verdad entre la PC y la laptop: **`pull --ff-only` antes de escribir, y un aparato a la vez.** En
este repo escriben varios hilos, también en vivo: el 10-29, de 10:15 a 10:24, entraron cuatro commits de otros hilos o de Cowork, y alguien publicó desde esta PC a
las 10:20 y a las 10:26. Por eso,
`add` por nombre y pull justo antes de cada escritura.

**`_scratch`: lo que se revisó** (de las 32 entradas que la lista de §3 de la mudanza daba a este hilo):

- **Copiadas a `tools/capturas/`, sin cambiar un byte** (comprobado con `cmp`): el programa de capturas, el que monta la
  comparación y los planes del `#78`, de `_scratch/pulido-ui-78/herramientas/` y `…/ampliacion/herramientas/`.
- **Ya estaban en el repo:** los dos reportes del `#78`. Mismo texto, sólo cambian los finales de línea.
- **No vigentes; se quedan en `_scratch`** (desechables):
  - las capturas y las páginas de comparación del `#78` (unos 33 MB);
  - 22 programas de los runs `#47` a `#56`, de agosto;
  - `dsr-head.txt`, `cabina-arranque-20260823.mjs` y `cuenta-lineas-arboles.mjs`.
- **No son de este hilo**, aunque la lista de §3 se los daba; nombrados y sin tocar: `cabina-20260828`,
  `msg-prompt-guarda-indice.txt`, `msg-records-2026-09-14.txt`, `msg-records-valvula-qatemp.txt`,
  `msg-run-lista-canonico.txt` y `commitear-records-cabina.ps1`. Por su contenido son de **Cantu Studio**.
- **Para el hilo de CQL:** su relevo decía que sus herramientas viven en `_scratch/cql-lectura-simulador/`, y esa carpeta
  no existe en la PC. Ese hilo hizo después su propia mudanza (`04f780c`, «el relevo de cantu-quizzes-latex apunta al
  vigente»): lo que haya en su `_scratch` es suyo.

**Nada se borró de `_scratch`.** Borrar es sólo con la palabra del operador. Los respaldos de antes de escribir el
canónico van a `_scratch` y se borran al terminar la misma operación.
