# HANDOFF — O4 tramo 1: el contrato de normalización

Cierre de la sesión de cabina del 2026-07-23 (audit Phase 0).
Este documento abre la sesión del tramo 1. No repite el audit: lo referencia.

## Insumos que la sesión nueva necesita adjuntos

1. `aiw/records/AUDIT-CONSOLE-O4-PHASE0.md` — el mapa (commit `dc76b49`)
2. `projects/cantu-studio/.aiw/roadmap/roadmap.json` — el roadmap real de Cantu
3. `aiw/DECISIONES.md` — al día hasta D-036
4. `aiw/roadmap_AIW_temp.md` — el roadmap de AIW en Markdown (a convertir)

Antes de abrir: **sincronizar el repo `aiw` como knowledge del proyecto.** Acaba de
recibir el audit y el DECISIONES nuevo. Sin sync, la cabina los lee viejos y hay que
tratarlos como `[NO VERIFICADO]`.

Modelo recomendado: **Fable, potencia alta o max.** Es deliberación de diseño, no
volumen: poca lectura, mucha consecuencia. (Fable no tiene modalidad rápida; en una
sesión de decisión eso pesa poco.)

## Dónde estamos

O1 cerrado (workspace único + respaldo remoto verificado con el push `89fd992..dc76b49`).
O4 en curso: el audit Phase 0 está hecho, commiteado y adjudicado. Sigue el tramo 1.

Plan de O4, tramos:

| # | Tramo | Estado |
|---|---|---|
| 0 | Audit read-only | **HECHO** |
| 1 | **Contrato de la carpeta (schemas, nombres, formatos)** | **AQUÍ** |
| 2 | `aiw-console` emite su propia carpeta | pendiente |
| 3 | Shell multi-proyecto leyendo solo `aiw-console` | pendiente |
| 4 | Cantu emite la carpeta nueva al lado de `.aiw` | pendiente |
| 5 | Consola global renderiza Cantu (paridad, QA de operador) | pendiente |
| 6 | AIW como tercer proyecto (roadmap Markdown → v3) | pendiente |
| 7 | Corte: retiro de la consola de Cantu + borrado de `.aiw` | pendiente |
| 8 | UI/UX | pendiente |

Más un tramo intercalado entre 1 y 3: **migración de O0 (Project Console) del roadmap
de Cantu al de la consola**, con tabla de remap de `queue_order`.

## Lo que ya está resuelto — NO volver a deliberar

- **El fork de `aiw-console` está descartado como base de UI** (D-035). La base es la
  consola VIVA de Cantu. Del fork sobrevive solo `tools/projector/project.mjs`, la única
  pieza identidad-neutral del toolchain.
- **La carpeta de contrato se crea ADITIVA** (D-036). `.aiw` se conserva hasta el corte.
  Verificado en el audit (C.4): una carpeta nueva es invisible para el validador de Cantu.
- **El costo del corte está medido:** el día que `.aiw` se borre se ponen rojas exactamente
  10 rutas (`CANTU-VALID:153-166`).
- **Solo hay tres cosas que ROMPEN** en todo el barrido de identidad, y las tres viven en
  el validador de Cantu: `project_id === "jame_system_dual"` (`:609`), schema
  `jame.roadmap_v3.v0.2-progress` (`:963`), anchor `"RUN-JAME-"` en el builder (`:1665`).
  Todo lo demás degrada o es cosmético.
- **Solo UN archivo del contrato es requerido:** `project_console.snapshot.json`. Los otros
  14 son fail-soft con degradación por panel. → El contrato puede definirse POR CAPAS.
- **12 de los 15 archivos del contrato no tienen emisor** en Cantu (`project.json`,
  `state/*`, `ledgers/*`, `guardrails/*`, `docs/*`). Se mantienen a mano.
- **La pantalla de portafolio es construcción NUEVA.** El substring `portfolio` no existe
  en ningún fuente de consola. No arrastra anchors.

## El hallazgo que define el tramo 1

**El snapshot de Cantu no tiene emisor y está podrido.**

- `roadmap.json` — última escritura 22 jul 2026.
- `project_console.snapshot.json` — última escritura **1 jul 2026**. Tres semanas.
- Declara `"generated_from_run": "RUN-JAME-ROADMAP-STANDARDIZATION-AIW-COMPATIBLE-AUDIT-001"`
  → lo escribió un run, a mano. No hay herramienta que lo produzca.
- Su campo `run_queue_ref` apunta a `.aiw/roadmap/queue.json`, archivo **borrado del disco**
  en el retiro del legacy.

Consecuencia viva: la consola de Cantu hoy muestra **dos verdades a la vez** — vistas
primarias del snapshot de hace tres semanas, pestaña Roadmap del `roadmap.json` de ayer.

## El roadmap v3 real (medido en disco)

```
nivel superior:  schema_version, roadmap_id, title, objectives
objetivo:        objective_id, title, phases          (SIN status)
fase:            phase_id, title, runs                (SIN status)
run:             run_id, queue_order, title, summary,
                 full_description, status, depends_on  (los 65)
                 + closeout_result (9/65), progress (1/65)
```

8 objetivos · 30 fases · 65 runs. `queue_order` 1..65 **contiguo y sin duplicados**.
Status de run observados: `planned` (53), `completed` (11), `active` (1).
Prefijos: 48 `RUN-JAME`, 17 `RUN-CANTU`.

Dos observaciones que el contrato debe resolver:

- **Objetivos y fases no llevan status; se deriva de los runs.** Pero el roadmap de AIW en
  Markdown SÍ pone status en los objetivos (`## O1 — active`). Al convertir: o se descarta
  como derivable, o el contrato crece.
- **No hay campo de categoría (D-029: manual/semi/autónomo) ni de batch (D-030).** El
  contrato tiene que dejarles lugar aunque nazcan vacíos; agregarlos después cuesta
  migración en tres repos.

## Decisiones del tramo 1

### 1. Familia de schema del snapshot — RECOMENDADA, falta ratificar

Dos familias en disco: **v0.3 anidado** (Cantu) y **v1 de strings + `roadmap_tree`**
(proyector, documentado en `aiw-console/docs/snapshot-schema-v1.md`).

**Recomendación: v1 del proyector.** v0.3 no es un formato que Cantu emita — es un
artefacto escrito a mano que se pudrió. Elegirlo compromete a mantener a mano un archivo
que ya demostró que nadie mantiene. v1 tiene emisor real, identidad-neutral y apuntable a
cualquier repo. Corolario: el proyector debería pasar a emitir también el snapshot de
Cantu, lo que arregla la podredumbre de paso.

### 2. Alcance de la migración de O0 — RECOMENDADA, falta ratificar

D-034 dice "migrar los runs `RUN-CANTU-PROJECT-CONSOLE-*`". Medido, eso es ambiguo por 3x:

- Por patrón de `run_id`: **6 runs** (5 en O0 + `RUN-JAME-PROJECT-CONSOLE-DOCS-V3-001`).
- Por objetivo: **O0 "Project Console" = 17 runs** en 3 fases.

**Recomendación: migrar O0 completo.** Un objetivo partido deja los dos roadmaps
incoherentes (`depends_on` cruzando repos, objetivo huérfano en Cantu). Es enmienda a
D-034 y debe registrarse como tal.

Datos para el remap: los `queue_order` de O0 son **1, 2, 4–12, 17, 61–65** — sacarlos
fragmenta la numeración global en cuatro huecos, así que la tabla de remap es obligatoria.
O0 mezcla 13 `RUN-CANTU` y 4 `RUN-JAME`; como `run_id` es identidad inmutable, el roadmap
de la consola nacería heredando ids `RUN-JAME`. Legítimo, pero decidirlo a sabiendas.

### 3. F.1 — ¿el validador viaja a la consola global? — ABIERTA

**Recomendación de la cabina: que NO viaje.** Los únicos tres ROMPE viven ahí y
desaparecen con él; el validador que ya viajó al fork no pasa ni contra sus propios datos
(exige ~15 archivos `.aiw/**` que `aiw-console` no tiene); y lo que protege son ~56 anchors
que congelan la forma de *la consola de Cantu*, no de la que se va a construir. La red se
rehace después, contra la consola nueva, si se quiere.

## Reglas de la cabina vigentes

- **Sync del repo:** cada push a un repo espejado, o cada encargo que dependa de leer
  código, exige "sincroniza el repo en el proyecto antes de continuar". Sin confirmación,
  lo leído del knowledge es `[NO VERIFICADO]` y se dice.
- **Tickets:** siempre en bloque de código Markdown, estructura fija
  (`# Project / # Objective / # Acceptance criteria / # Scope / # Out of scope /
  # Max rounds`). Nunca prosa, nunca artifact. En tickets de taller (Claude Code),
  `# Max rounds` se declara `N/A — encargo de taller; campo del kernel; no aplica`.
- **Modelo:** antes de cada ticket, la cabina recomienda modelo y potencia.
- **Cierre:** cada respuesta termina diciendo qué procede; toda decisión abierta va con
  recomendación explícita.
- **Autonomía de sesión:** el operador decide cuándo cerrar y descansar. La cabina solo
  menciona el contexto si su agotamiento afecta la precisión del trabajo.
- **El taller no corre git.** El estado de git lo aporta el operador.

## Pendientes menores (no bloquean el tramo 1)

- Reconciliar `roadmap_AIW_temp.md` contra disco: "Merge de 005 en aiw-console" está
  `planned` y cayó en `29c9478`; "Respaldo remoto del v2" está `active` y ya está
  verificado. Retirar el no-claim `NOT_REMOTE_BACKED`.
- `aiw-console/package.json:6` se autodescribe como "verbatim fork" — falso respecto a los
  bytes. Corregir.
- `aiw-console/projects.config.json.bak` sin trackear: borrar o commitear, que no quede en
  limbo.
- `aiw/.aiw/project_console.snapshot.json` es una copia stale; residuo a limpiar.
