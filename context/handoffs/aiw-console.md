# HANDOFF — hilo `aiw-console` (la consola)

> **Este archivo es EFÍMERO y se SOBRESCRIBE.** Es el relevo del hilo de la
> consola: se reescribe al cerrar cada sesión y se consume al abrir la siguiente.
> No es un record — no acumula historia, no se versiona por tramo. Lleva **solo**
> lo que la próxima sesión necesita para arrancar sin releerlo todo. Lo que
> seguirá siendo cierto dentro de un mes vive en el roadmap, el contrato o un
> record — no aquí.

**Estado del hilo:** O4 — **tramo 1 ENTREGADO**. Siguiente: **tramo 2**
(`aiw-console` emite su propia carpeta de contrato, `.project/`).
Última actualización: 2026-07-24, al cerrar la redacción de O4.

## El plan y el estado viven en el roadmap — no aquí

El plan de O4 (las diez fases `O4.P0…P9`, lo que antes eran "los nueve tramos") y
el estado de cada run son ahora el propio roadmap, en `roadmap_tree_v1`:

    projects/aiw-console/roadmap/roadmap.json

Ésa es **la fuente del plan y del estado**. El handoff apunta ahí y no lo duplica:
ésa fue la razón de ser del tramo 1 —sacar el plan de este archivo efímero y darle
estado duradero (D-046)—. Hoy el roadmap tiene 2 objetivos (O0 "Project Console",
12 runs; O4 "Consola global", 17 runs), `queue_order` 1..29 contiguo. O4 deriva
`in_progress` (8 `completed`, 9 `planned`); el status de objetivo se calcula al
leer, no se almacena.

## Lecturas de arranque (en orden de utilidad)

1. `projects/aiw-console/roadmap/roadmap.json` — el plan y el estado de O4/O0.
2. `context/aiw-console/CONTRATO.md` — el contrato de la carpeta, en tres capas.
3. `context/DECISIONES.md` — de **D-039 en adelante** (contrato, enmiendas,
   migración de O0, redacción de O4). D-046 cierra el tramo 1.
4. Records por tema, en `context/aiw-console/records/`:
   - `REDACCION-O4.md` + `MEDICION-O4.md` — cómo nació O4 y qué se inventó.
   - `AUDIT-CONSOLE-O4-PHASE0.md` — el mapa de acoplamientos (tramo 0).
   - `MEDICION-PROYECTOR.md` — el emisor por dentro (insumo del tramo 2).
   - `MIGRACION-O0.md` — la migración de O0 y el hallazgo del `.aiw/`.
   - `MEDICION-VALIDADOR-ROJO.md` — la deuda del validador (tramo 3).

## El punto de arranque del tramo 2, ya localizado

`aiw-console` debe **emitir su propia carpeta de contrato** (`.project/`, familia
v1, aditiva junto a `.aiw/` — D-036). El obstáculo es único, con archivo y línea:

- `resolveInsideAiw` (`tools/projector/project.mjs:475-483`) **LANZA** si el
  destino sale de `.aiw/`. El emisor, tal como está, **no puede escribir bajo
  `.project/` en absoluto**. **Emitir a `.project/` empieza ahí.** Ahí se decide
  también si, durante la convivencia aditiva, el emisor escribe en ambos destinos o
  sólo en el nuevo.

### Los cuatro arreglos de identidad pendientes del emisor

El proyector nació apuntado a AIW/JAME; para emitir identidad-neutral falta:

1. **`taxonomy_model` horneado** (`tools/projector/project.mjs:463`) — valor fijo,
   no derivado del proyecto.
2. **`run_id` derivado del nombre de archivo** — muta cuando el objetivo se archiva
   o renombra; la identidad no debe depender de la ruta.
3. **`jame.git_history_snapshot.v1` literal** — cadena de esquema con la marca JAME
   horneada.
4. **La ruta de emisión** — hoy `.aiw/`, atada por `resolveInsideAiw` (arriba).

Líneas exactas y detalle en `MEDICION-PROYECTOR.md`.

## El `.aiw/` de `aiw-console` NO es estado propio

Es el área de trabajo de la **proyección de AIW**: el proyector vive en este repo,
lee `../../aiw/objectives/` y entrega ahí (`.aiw/roadmap/roadmap.json` es la copia
de entrega de AIW —16 runs—, regenerada por `serve-project-console.mjs` en cada
arranque). **La simetría con Cantu no existe** — allá `.aiw/` sí es del proyecto.
Es un supuesto tácito que **ya hizo fallar un encargo**: la cabina dio ese path por
libre y el taller lo detuvo antes de escribir. Evidencia: D-044,
`MEDICION-PROYECTOR.md §5.a`.

## Deuda medida para el tramo 3 — NO arreglada

Tres sitios del **validador de Cantu**
(`projects/cantu-studio/tools/project-console/validate-project-console-state.mjs`,
abreviado `CANTU-VALID`) asumen que **todo `run_id` vive en el roadmap local**; con
O0 ya fuera, esa suposición es falsa. Medidos, **no tocados** —la consola de Cantu
muere en el tramo 7 y el sitio correcto es el shell que carga todos los proyectos—:

- `CANTU-VALID:847` — `roadmapV3QueueGroupKey` mal-agrupa el run externo en `later`
  de forma permanente.
- `CANTU-VALID:1059-1069` — el DFS de ciclos salta ids externos con `?.`: no
  detecta ciclos que crucen proyectos.
- `build-git-history-snapshot.mjs:103-108` — `deriveRunId` degrada limpio a `null`.

El rojo agudo de la extracción ya se cerró: D-045 relajó la regla dura de
`depends_on` a advertencia y el validador de Cantu sale VERDE. Lo de arriba es la
deuda estructural que queda.

## Decisión abierta

- **¿El validador viaja a la consola global?** Recomendación de la cabina: **que
  NO viaje.** Los tres únicos ROMPE viven en él y desaparecen con la consola de
  Cantu en el tramo 7; lo que protege son anchors de *la consola de Cantu*, no de
  la que se va a construir. La red se rehace después, contra la consola nueva, si
  se quiere.

## Pendientes menores (siguen vivos)

- `aiw-console/package.json:6` se autodescribe como "verbatim fork" — falso
  respecto a los bytes. Corregir.
- `aiw-console/projects.config.json.bak` sin trackear: borrar o commitear, que no
  quede en limbo.
- `aiw/.aiw/project_console.snapshot.json` — copia stale (1 jul 2026); residuo a
  limpiar.
