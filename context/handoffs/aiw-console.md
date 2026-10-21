# Relevo — hilo `aiw-console`

**Fecha:** 2026-10-21 · **Sustituye** al relevo del 2026-09-25 (mudanza de computadora, `#64` activo).
Esta sesión corrió en la **máquina nueva**, del 2026-10-04 al 2026-10-21.

Aquella sesión cerró con **71 runs** y el `#64` activo. Ésta deja **82 runs** y **cero activos**:
**la cola no tiene nada ejecutable**. Lo que queda espera a una decisión del operador (la auditoría
pausada) o a que Cantu Studio salga de su pausa (D-079).

La sustancia va DENTRO. Los punteros a records son procedencia, no respuesta.

---

## 1. DÓNDE ESTAMOS

`projects/aiw-console/roadmap/roadmap.json` · md5 **`3e088141bcb1b7196f0540b8b10a1067`** (2026-10-21,
tras cerrar el `#78`) · **82 runs** · `completed 79 · planned 3 · active 0` · densidad `1..82` ·
`checkInvariants` sin errores. Árbol de trabajo **limpio**. Cero `index.lock`.

**Suite: 982 / 982 / 0** (2026-10-21, dada por el taller del `#78`). **Es la primera vez en semanas
que sale limpia**: el fallo «conocido» de finales de línea lo retiró el `#76`. Desde ahora **cualquier
fallo es nuevo** y no se esconde detrás del de siempre.

| # | run | estado | por qué espera |
|---|---|---|---|
| 80 | `RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001` «Deep visual audit of the console, led by the operator» | planned | **PAUSADO por el operador** tras su primer tiempo. Se reanuda cuando él quiera recorrer la consola |
| 81 | `RUN-CONSOLE-CANTU-CANONICAL-OUT-OF-AIW-001` | planned | Cantu Studio pausado (D-079). Escribe en `cantu-studio` |
| 82 | `RUN-CONSOLE-CORTE-RETIRO-LOCAL-001` | planned | depende de los dos de arriba. **Su primer paso es ahora la compuerta** («¿algo es PEOR que en la consola local de Cantu?»), que salió del `#80` |

**Los `#N` son COORDENADAS del 2026-10-21.** Esta sesión insertó cinco runs y la auditoría pasó de
`#77` a `#80` en dos días. Derívalos del canónico.

### Al reanudar el `#80`

Su primer tiempo está hecho: `context/aiw-console/records/GUIA-RECORRIDO-77-2026-10-20.md` (18
superficies, cómo llegar a cada una, los diez hallazgos vueltos a medir). **Pero la guía es una
medición fechada y el `#78` ya cambió la consola**: resolvió H1 y H8, quitó del Portfolio dos
superficies (la lista de objetivos y el panel «Awaiting a verdict») y renunció a H7. **Antes de que
el operador recorra nada, un taller vuelve a medir la guía.** Lo dice el propio texto del run
(párrafo «PAUSED 2026-10-21»).

---

## 2. LO QUE HIZO ESTA SESIÓN

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

- La **palabra de estado de cada objetivo** (COMPLETED / ACTIVE / PLANNED): el segmento «Roadmap»
  sólo muestra recuentos y porcentaje.
- El **recuento de veredictos pendientes entre proyectos**. El de cada run sigue en su detalle,
  sección «Run report», píldora «no verdict yet».

Se le dijo al operador antes de su «pass».

---

## 3. DECISIONES

Escritas por esta cabina en `context/DECISIONES.md`:

- **D-074** — AIW resuelve trabajo **secuencial**, y se prueba en un **proyecto de prueba**, no en uno
  vivo. **No tiene run todavía.**
- **D-075** — la consola muestra lo que ya existe; la capa AIW va detrás de configuración; los
  proyectos abren en Roadmap.
- **D-076** — cada hilo hace su propio reporte HTML y la consola lo enlaza.
- **D-080** — `work_class` entra a la clasificación; la relación entre runs se deriva.

D-077 a D-079 las escribió el hilo `cantu-studio`. **D-079 pausa Cantu Studio**, y por eso esperan el
`#81` y el `#82`. **Mide el siguiente número antes de escribir una D**: escriben varios hilos.

**Hueco propio, declarado en el cierre del `#75`:** `CONTRATO.md:55` pide que la decisión que hace
caducar un texto del contrato anote esa corrección. D-076 y D-080 no lo hicieron; `DECISIONES.md` es
append-only y no se reescriben. La próxima D que caduque un texto del CONTRATO lo anota al escribirse.

---

## 4. LAS REGLAS DEL OPERADOR

Verbatim en `context/aiw-console/records/REGLAS-DE-OPERACION-DEL-OPERADOR.md`. En vigor:

- **R-01** — QA de fixtures con los comandos completos, cada vez.
- **R-02** — el push **no se recuerda** salvo cuando el operador declare que se cierra el hilo.
- **R-03** — todo ticket termina con `# Sesión`: mismo taller (sin modelo) o nuevo (con modelo y
  esfuerzo).
- **R-04** (2026-10-05) — **rutas completas en forma Windows**, listas para pegar en el Explorador.
- **R-05** (2026-10-21) — **no se pide QA en runs sin superficie que mirar.** Textos, contratos, `.md`,
  tests: la cabina verifica en disco y cierra declarando que no hubo QA. La QA humana es para lo que
  se ve en pantalla o para un punto crítico, y acotada. **Ésta es la que más cambia el ritmo.**

---

## 5. NOMBRADO Y SIN TOCAR

Ninguno es urgente. Juntos podrían ser un run de documentación cuando haga falta, **no por goteo**:
tres rondas de textos falsos demostraron que cada una encuentra otra capa.

- `project-console/serve.mjs` líneas 16, 135 y 1252 («four write routes»), y 27 y 778 («ALL SEVEN
  artifacts», falso donde la raíz no es su propio repo).
- `context/aiw-console/CONTRATO.md` §16, «Qué función esperan»: describe D-029 sin el reencuadre de
  D-057.
- `docs/CONTRATO-REPORTE-HTML-DE-CADA-HILO-v1.md:138`: dice dónde aparece el panel que el `#78` quitó.
- Títulos de `tests/run-report-surface.test.mjs:281` y `tests/run-html-reports.test.mjs:227`: dicen
  que el Portfolio cuenta veredictos.
- Tests que fijan el estado de datos reales y pueden caducar como caducó el de finales de línea:
  `tests/roadmap-batches.test.mjs:101`, `tests/roadmap-lanes.test.mjs:87`,
  `tests/roadmap-engine.test.mjs:160`.
- Propuestas del `#78` no aplicadas: la palabra de unidad del contador de clasificación, y H7 (el
  lector limita la prosa a 66ch y las tablas no; lo fijan dos tests de `doc-side-reader`).
- Renombrar `project-console/assets/doc-side-reader.js` (dice «side reader» y es un modal desde el `#63`).
- La raíz `/` de `serve.mjs` pinta la consola sin estilos.
- El taller del `#78` añadió dos entradas a `AIW_Workspace\.claude\launch.json` (fuera de todo repo):
  se dejaron.

---

## 6. LA MÁQUINA Y EL OFICIO

**Modo COWORK CONECTADO.** La ruta de montaje se deriva cada sesión.

**El permiso de borrado CADUCA a menudo** en esta máquina. Síntoma: `rm` da `Operation not
permitted`, o `git add` deja ficheros `tmp_obj_*` en `.git/objects/`. Se vuelve a pedir y se limpian
los restos. Comprobar `index.lock` **y** `tmp_obj_*` después de cada escritura de git.

**Escribir el canónico.** Por la consola: `PC_PORT=<puerto> node project-console/serve.mjs` (el flag
`--port` se ignora) y POST a `/projects/aiw-console/__project-console/roadmap/edit` con
`{op,args,apply:false}`, luego `{…,apply:true,baseline}`. **El servidor muere entre llamadas de
shell**: arrancarlo en la misma llamada que el driver. Nombres de argumentos medidos: `set-status`
→ `run`, `status`, `closeoutResult`; `set-text` → `targetType:"run"`, `targetId`, `fullDescription`;
`insert` → `runId`, `title`, `summary`, `fullDescription` y uno de `after`/`before`/`endOfPhase`
(hereda la fase del ancla); `move` → `run` y uno de `after`/`before`/`toOrder`, con `toPhase` para
cambiar de fase (**`move … before` de un run de otra fase NO cambia la fase: fue un no-op**);
`set-classification` → `run`, `workClass`. Re-emitir a mano: POST
`/projects/aiw-console/__project-console/project/emit`.

**`pkill -f serve.mjs` mata la propia shell** de la cabina (el patrón casa con su línea de comando).

**Verificar tras escribir:** diff campo a campo contra la copia de `_scratch`, raíz idéntica,
densidad, `checkInvariants` (importado por un script en `$HOME`, nunca en el repo) y el `.project/`
emitido. **Parsear el JSON, no buscar con ventanas de texto**: dos sondas de este tipo dieron
resultados falsos esta sesión (leían la entrada siguiente).

**La suite en la VM de la cabina es lenta**: se parte en tandas con timeout, y un test de historia de
git tarda unos 80 s solo. Normalmente la da el taller.

**La consola del operador en el 8788** se arrancó con un `serve.mjs` anterior. Las hojas de estilo se
leen del disco, así que un cambio visual se ve con Ctrl+F5; un cambio de servidor necesita relanzar
`start-console.cmd`, que para lo que haya en el 8788.

---

## 7. RECORDS DE ESTA SESIÓN

Todos en `context/aiw-console/records/`:

- `REFLEXION-DEL-OPERADOR-2026-10-04-PROPOSITO-Y-FRICCION-DE-LA-CONSOLA.md` (origen de D-074 a D-076)
- `REGLAS-DE-OPERACION-DEL-OPERADOR.md` (R-04, R-05 añadidas)
- `REPASO-COLA-72-78-2026-10-20.md`
- `ENCUADRE-PARADA-68-2026-10-19.md`, `ENCUADRE-PARADA-77-2026-10-20.md` (encuadre y pausa de la
  auditoría, y la aprobación de los runs `#76`/`#77`)
- `PROPUESTA-FASE-1-70-REPORTES-HTML-DE-CADA-HILO-2026-10-19.md`
- `GUIA-RECORRIDO-77-2026-10-20.md`
- `PETICION-PULIDO-UI-2026-10-21.md`
- Reportes de taller: `REPORTE-TALLER-65` a `-70`, `-74`, `-75`, `-76`, `-77` (es la guía de la
  auditoría), `-77-STALE-TEXTS`, `-78`, y `REPORTE-AMPLIACION-78`
- Veredictos: `VEREDICTO-64` a `-70`, `-74`, `-75`, `-78`

Las capturas y comparaciones del `#78` están fuera del repo, en
`C:\Users\chris\Documents\AIW_Workspace\_scratch\pulido-ui-78\`, y son desechables.
