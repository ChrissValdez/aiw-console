# HANDOFF — hilo `aiw-console` (la consola)

> **Este archivo es EFÍMERO y se SOBRESCRIBE.** Es el relevo del hilo de la
> consola: se reescribe al cerrar cada sesión y se consume al abrir la siguiente.
> No es un record — no acumula historia, no se versiona por tramo. Lleva **solo**
> lo que la próxima sesión necesita para arrancar sin releerlo todo. Lo que
> seguirá siendo cierto dentro de un mes vive en el roadmap, el contrato o un
> record — no aquí.

> **Disciplina de este handoff:** no afirma hechos, apunta a dónde están medidos.
> Si da una cifra, la da con su cita. Las cinco afirmaciones falsas que se
> arrastraron esta sesión venían todas de handoffs, ninguna de un record: por eso
> aquí las cifras viajan con su fuente y nada se declara "hecho" sin puntero.

**Estado del hilo:** O4 — **fase 1 ENTREGADA** (el contrato en tres capas y las
migraciones; ver D-046). Siguiente: **el prototipo** (`O4.P10`), **no el emisor**.
El orden cambió en `D-047`: el prototipo se adelantó a tercer lugar para probar
`roadmap_tree_v1` contra datos reales antes de construir el emisor, y la revisión
UI/UX subió a compuerta del corte. Última actualización: 2026-07-24, al cerrar el
reorden de O4.

## El plan y el estado viven en el roadmap — no aquí

El plan de O4 (las fases `O4.P0…P10`) y el estado de cada run son el propio
roadmap, en `roadmap_tree_v1`:

    projects/aiw-console/roadmap/roadmap.json

Ésa es **la fuente del plan y del estado**. El handoff apunta ahí y no lo duplica.
Al cierre de esta sesión el roadmap tiene 2 objetivos (O0 "Project Console", 12
runs; O4 "Consola global", 18 runs), `queue_order` 1..30 denso y contiguo. O4
deriva `in_progress` (8 `completed`, 10 `planned`); el status de objetivo se calcula
al leer, no se almacena. El orden de fases de O4 y su razón están en `D-047`; el
detalle de la redacción original en `D-046` y `records/REDACCION-O4.md`.

## Las dos compuertas de aprobación del operador (son `depends_on` en el roadmap)

Escritas como dependencias reales, no como intención — se leen en el roadmap:

- **prototipo → shell:** `RUN-CONSOLE-SHELL-MULTIPROYECTO-001` **depende de**
  `RUN-CONSOLE-PROTOTIPO-CONSOLA-001`. El shell se construye sobre el prototipo
  aprobado, no en paralelo.
- **UI/UX → corte:** `RUN-CONSOLE-CORTE-RETIRO-LOCAL-001` **depende de**
  `RUN-CONSOLE-UI-UX-001` **y** de `RUN-CONSOLE-PARIDAD-RENDER-CANTU-001`. El corte
  es irreversible: no procede sin la revisión de uso.

Ambas exigen aprobación explícita del operador, anotada en el `full_description` de
los runs de compuerta. La razón del reorden vive en `D-047`.

## Qué se ve y cuándo (en fases)

- **Lo primero visible es el prototipo** (`O4.P10`): la consola global leyendo el
  roadmap real de `aiw-console` (2 objetivos, 30 runs). Ese es el resultado
  temprano que el operador pidió para no trabajar a ciegas.
- **La consola multi-proyecto con Cantu llega tras la fase de paridad** (`O4.P5`):
  el shell (`O4.P3`) primero lee solo `aiw-console`, y la paridad levanta la global
  sobre Cantu en read-only. Hasta ahí no hay "los tres proyectos en una pantalla".
- Edición y UX (`O4.P8`) y el tercer proyecto AIW (`O4.P6`) vienen después de la
  paridad; el corte de la consola local (`O4.P7`) es el último acto, tras las dos
  compuertas.

## Qué se puede mirar HOY

La **consola de Cantu** (la avanzada, base de la global) levanta con:

    node tools/project-console/serve-project-console.mjs

en el puerto 8787 (dentro de `projects/cantu-studio`). Tras la migración de O0 su
roadmap muestra **7 objetivos en vez de 8** — la cifra sale del record de migración
(`records/MIGRACION-O0.md`, adjudicado en `D-044`: Cantu quedó en 7 objetivos). La
**dependencia externa que quedó cruzando repos aparece como advertencia del
validador**, no como rojo: `D-045` relajó la regla dura de `depends_on` a
advertencia (`records/MEDICION-VALIDADOR-ROJO.md`).

La consola de AIW también enciende (mismo server, `project=aiw`), según el record
de merge de 005 (`RUN-CONSOLE-MERGE-005-001`, `completed`).

## Regla de cierre de la cabina

Cada cierre de fase termina con **el mapa** —dónde estamos, qué falta para ver la
consola multi-proyecto, qué se habilita después— y con **qué se puede mirar**. Si
un encargo no cambia nada observable, se dice explícitamente. Esta disciplina
existe porque el operador necesita orientarse entre iteraciones sin releerlo todo.

## Lecturas de arranque (en orden de utilidad)

1. `projects/aiw-console/roadmap/roadmap.json` — el plan y el estado de O4/O0.
2. `context/aiw-console/CONTRATO.md` — el contrato de la carpeta, en tres capas.
3. `context/DECISIONES.md` — de **D-039 en adelante** (contrato, enmiendas,
   migración de O0, redacción de O4). **D-047 es la última**: reorden de O4, con el
   prototipo primero y la revisión UI/UX antes del corte. D-046 cierra la fase 1.
4. Records por tema, en `context/aiw-console/records/`:
   - `REDACCION-O4.md` + `MEDICION-O4.md` — cómo nació O4 y qué se inventó.
   - `AUDIT-CONSOLE-O4-PHASE0.md` — el mapa de acoplamientos (Phase 0).
   - `MEDICION-PROYECTOR.md` — el emisor por dentro (insumo del emisor, `O4.P2`).
   - `MIGRACION-O0.md` — la migración de O0 y el hallazgo del `.aiw/`.
   - `MEDICION-VALIDADOR-ROJO.md` — la deuda del validador (shell, `O4.P3`).

## El prototipo (`O4.P10`) no tiene bloqueo: lee datos reales que ya existen

El prototipo lee `projects/aiw-console/roadmap/roadmap.json` directamente. **No
necesita el emisor ni la carpeta `.project/`** — por diseño: es el primer
consumidor real de `roadmap_tree_v1` (D-026) y su valor es ejercitar el formato
antes de construir el emisor. Su `full_description` fija ese alcance.

## El punto de arranque del emisor (`O4.P2`), ya localizado — es la fase que SIGUE al prototipo

`aiw-console` debe **emitir su propia carpeta de contrato** (`.project/`, familia
v1, aditiva junto a `.aiw/` — D-036). El obstáculo es único, con archivo y línea:

- `resolveInsideAiw` (`tools/projector/project.mjs:475-483`) **LANZA** si el
  destino sale de `.aiw/`. El emisor, tal como está, **no puede escribir bajo
  `.project/` en absoluto**. **Emitir a `.project/` empieza ahí.** Ahí se decide
  también si, durante la convivencia aditiva, el emisor escribe en ambos destinos o
  sólo en el nuevo.

### Los cuatro arreglos de identidad pendientes del emisor

El proyector nació apuntado a AIW/JAME; para emitir identidad-neutral falta (líneas
exactas y detalle en `MEDICION-PROYECTOR.md`):

1. **`taxonomy_model` horneado** (`tools/projector/project.mjs:463`) — valor fijo,
   no derivado del proyecto.
2. **`run_id` derivado del nombre de archivo** — muta cuando el objetivo se archiva
   o renombra; la identidad no debe depender de la ruta.
3. **`jame.git_history_snapshot.v1` literal** — cadena de esquema con la marca JAME
   horneada.
4. **La ruta de emisión** — hoy `.aiw/`, atada por `resolveInsideAiw` (arriba).

## El `.aiw/` de `aiw-console` NO es estado propio

Es el área de trabajo de la **proyección de AIW**: el proyector vive en este repo,
lee `../../aiw/objectives/` y entrega ahí (`.aiw/roadmap/roadmap.json` es la copia
de entrega de AIW, regenerada por `serve-project-console.mjs` en cada arranque).
**La simetría con Cantu no existe** — allá `.aiw/` sí es del proyecto. Es un
supuesto tácito que **ya hizo fallar un encargo**: la cabina dio ese path por libre
y el taller lo detuvo antes de escribir. Evidencia: D-044,
`MEDICION-PROYECTOR.md §5.a`.

## Deuda medida para el shell (`O4.P3`) — NO arreglada

Tres sitios del **validador de Cantu**
(`projects/cantu-studio/tools/project-console/validate-project-console-state.mjs`,
abreviado `CANTU-VALID`) asumen que **todo `run_id` vive en el roadmap local**; con
O0 ya fuera, esa suposición es falsa. Medidos, **no tocados** —la consola de Cantu
muere en el corte (`O4.P7`) y el sitio correcto es el shell que carga todos los
proyectos—:

- `CANTU-VALID:847` — `roadmapV3QueueGroupKey` mal-agrupa el run externo en `later`
  de forma permanente.
- `CANTU-VALID:1059-1069` — el DFS de ciclos salta ids externos con `?.`: no
  detecta ciclos que crucen proyectos.
- `build-git-history-snapshot.mjs:103-108` — `deriveRunId` degrada limpio a `null`.

El rojo agudo de la extracción ya se cerró (D-045: regla dura de `depends_on`
relajada a advertencia, validador de Cantu VERDE). Lo de arriba es la deuda
estructural que queda.

## Decisión abierta

- **¿El validador viaja a la consola global?** Recomendación de la cabina: **que
  NO viaje.** Los tres únicos ROMPE viven en él y desaparecen con la consola de
  Cantu en el corte (`O4.P7`); lo que protege son anchors de *la consola de Cantu*,
  no de la que se va a construir. La red se rehace después, contra la consola nueva,
  si se quiere. (Bifurcación F.1 del audit, aún sin cerrar — D-035.)
- **Prioridad O0 vs O4 en la cola** (heredada de D-046): O0 conserva runs `active`/
  `planned` de `queue_order` bajo que preceden a todo O4 en la cola global. No urge
  mientras la cabina ordene el trabajo; **debe resolverse antes de la paridad**
  (`O4.P5`), cuando la consola global pase a ser la fuente del orden.

## Pendientes menores (siguen vivos)

- `aiw-console/package.json:6` se autodescribe como "verbatim fork" — falso
  respecto a los bytes. Corregir.
- `aiw-console/projects.config.json.bak` sin trackear: borrar o commitear, que no
  quede en limbo.
- `aiw/.aiw/project_console.snapshot.json` — copia stale (1 jul 2026); residuo a
  limpiar.
