# Audit Report — Contexto y Metodología (v1)

> **Ticket:** AUDIT-AIW-CONTEXTO-METODOLOGIA-001 — audit-only (solo lectura + un único reporte).
> **Fecha:** 2026-07-24.
> **Naturaleza:** solo lectura. No se ejecutó código, no se corrió Git de escritura, no se
> modificó ningún archivo. La única escritura es este archivo.
> **Método:** cada afirmación proviene de abrir el archivo real. Donde no se leyó por restricción
> de alcance o porque el dato no existe en disco, se marca **`no determinado`** en vez de inferir.
> **Idioma:** español, por convención del workspace.

## Repos auditados — rama y último commit

| Repo | Rama | Último commit | Alcance de lectura aplicado |
|---|---|---|---|
| `aiw/` | `main` | `ca3087d` 2026-07-23 — "chore(context): rutas a context/DECISIONES.md (D-038)" | Documentación, contexto y metodología (NO se re-auditó el kernel `.mjs`). |
| `projects/cantu-studio/` | `main` | `8e9991e3` 2026-07-24 — "validator: depends_on no resuelto con forma valida degrada a warning; regenerar snapshot" | Documentación, contexto, roadmaps y metodología. |
| `projects/cantu-lessons/` | `main` | `0952ccb` 2026-07-22 — "docs(rename): JAME_Lessons -> cantu-lessons; refs a cantu-studio en prosa" | Documentación, contexto y metodología. |
| `projects/aiw-console/` | `main` | `e50a3a3` 2026-07-24 — "roadmap: reorden de O4, prototipo primero y UI/UX antes del corte; handoff" | **SOLO inventario superficial** (estructura de primer nivel + existencia de archivos de contexto). No se leyó su código ni su documentación interna. |

> **Nota de alcance importante (afecta B, C, D del sistema AIW):** El contexto de gobernanza de
> AIW **ya no vive en `aiw/`**; se mudó a `aiw-console/context/aiw/` (D-037), repo que este ticket
> restringe a inventario superficial. Por tanto, el contenido de `ESTADO.md`, `DECISIONES.md`,
> `DELEGACION.md` y `roadmap_AIW_temp.md` de AIW **no fue leído** y aparece como `no determinado`
> en las secciones donde correspondería. Se verificó únicamente su **existencia** por nombre de
> archivo (ver F y A).

---

## A. Inventario de artefactos de contexto

### A.1 — Archivos de contexto por repo

#### `aiw/` (taller del kernel)

| Ruta | Propósito aparente | Tamaño |
|---|---|---|
| `aiw/CLAUDE.md` | Reglas operativas que el agente lee del repo donde trabaja; puntero a dónde vive cada cosa. | 46 líneas |
| `aiw/claude.md` | Segundo archivo de mismo nombre lógico que `CLAUDE.md` (colisión de casing en Windows; contenido idéntico al leído como `CLAUDE.md`). | 46 líneas |
| `aiw/CONSTITUCION.md` | Constitución del kernel v2: invariantes, piso de severidad del reviewer, anti-auto-hosting, presupuesto de complejidad, topología de seguridad Git, métrica de éxito. | 46 líneas |
| `aiw/CONTEXTO.md` | Puntero: declara que el contexto de gobernanza se mudó a `aiw-console/context/aiw/`. | 37 líneas |
| `aiw/config.json` | Config de proyectos del kernel (2 proyectos: `sandbox`, `console`), `verification`, `push:false`. | 18 líneas |
| `aiw/prompts/executor.md` | Prompt del rol executor del loop. | 82 líneas |
| `aiw/prompts/reviewer.md` | Prompt del rol reviewer del loop. | 80 líneas |
| `aiw/templates/objective.md` | Plantilla-contrato de objetivo (secciones `# Project`, `# Objective`, `# Acceptance criteria`, `# Scope`, `# Out of scope`, `# Max rounds`, `# Verification`). | 23 líneas |
| `aiw/records/COSECHA.md` | Prompts, vocabulario y lecciones extraídas de v1. | 772 líneas |
| `aiw/records/AUDITORIA_ESTADO.md` | Auditoría histórica de estado. | 671 líneas |
| `aiw/records/AUDITORIA_CONTEXTO.md` | Auditoría histórica de contexto. | 293 líneas |
| `aiw/records/CRONICA.md` | Crónica de sesiones/incidentes. | 99 líneas |
| `aiw/records/QUALIFICATION.md` | Registro de cualificación. | 119 líneas |
| `aiw/records/HISTORIA.md` | Qué fue v1 y dónde vive su archivo. | 18 líneas |

Contexto de gobernanza vivo de AIW: `no determinado` (reside en `aiw-console/context/aiw/`, fuera de alcance de lectura).

#### `projects/cantu-studio/` (motor JAME Core + Author Lite)

Tiene **dos capas de contexto que coexisten**: (1) instrucciones para el agente en la raíz
(`CLAUDE.md` / `AGENTS.md` + sistema de contextos generados `ctx_*.md`), y (2) un cuerpo
documental en `docs/` gobernado por un blueprint, más artefactos-máquina en `.aiw/`.

| Ruta | Propósito aparente | Tamaño |
|---|---|---|
| `CLAUDE.md` | Contrato operativo del executor: identidad, pipeline multi-modelo, fuentes de verdad por tarea, orden de autoridad, reglas de código/doc. | 629 líneas |
| `AGENTS.md` | Variante de `CLAUDE.md` para la "fase Codex-era / AIW-prep"; mismo esqueleto, pipeline y reglas parcialmente divergentes (ver A.2 y F). | 637 líneas |
| `README.md` | Descripción del repo. | 76 líneas |
| `README_PHASE1.md` | Notas de fase 1. | 28 líneas |
| `prompts/_CONTEXT_GUIDE.md` | Guía de qué contexto generado usar según la tarea. | 405 líneas |
| `prompts/generated/ctx_*.md` | Contextos IA derivados y regenerables (perfiles por tarea: orchestrator, lesson_author, jame_builder, author_lite_builder, component_bridge, dual_builder, architect, deep_repo + legacy). | ~12+ archivos (regenerables por `generate_prompt_context.js`) |
| `prompts/*.md` (ChatGPT/Gemini) | Prompts manuales mantenidos por el usuario; no canónicos. | varios |
| `docs/START-HERE.md` | Punto de entrada documental (orienta y enruta por categoría). | 63 líneas |
| `docs/DOCUMENTATION-BLUEPRINT.md` | Estándar de escritura para toda doc nueva. | 674 líneas |
| `docs/CANONICAL_SOURCES.md` | Fuentes canónicas por dominio. | 62 líneas |
| `docs/ARCHITECTURE-*.md` (4) | Arquitectura por subsistema (system-overview, web-engine, slides-engine, project-console). | 111–122 líneas c/u |
| `docs/REFERENCE-*.md` (3) | Contratos de motores y Draft JSON. | 116–153 líneas c/u |
| `docs/HOW-TO-*.md`, `docs/OPERATIONS-*.md` | Tareas paso a paso y estado/protocolo de run. | 63–125 líneas |
| `docs/GOVERNANCE-AUTHORITY-AND-NO-CLAIMS.md` | Orden de autoridad, no-claims, gates. | 100 líneas |
| `docs/shared/DOCUMENT_CLASSES.md` | Clases documentales y reglas de gobernanza (Canónico/Activo/Histórico/Generado/Prompt/Auditoría/Handoff). | 84 líneas |
| `docs/shared/AI_CONTEXT_POLICY.md` | Política de contextos IA. | 80 líneas |
| `docs/shared/AIW-CERTIFIED-RETIREMENT-HANDOFF.md` | Handoff del retiro del estado `CERTIFIED`. | 67 líneas |
| `docs/decisions/ADR-001..005 + README.md` | ADRs aceptados. | ~2.5 KB c/u |
| `docs/ops/JAME_OPS_STATE.md` | Estado operativo detallado. | 15110 líneas (~muy grande) |
| `docs/ops/NAMING_DISPOSITION_MAP.md` | Mapa de disposición de renombrados. | 613 líneas |
| `docs/archive/**` | Corpus histórico de "passes" (author-lite, componentes, sandbox). | Cientos de archivos `PASS-*`. |
| `.aiw/project.json` | Contrato "Contract Lite" del proyecto para consola. | 1.1 KB |
| `.aiw/guardrails/{project_guardrails.json, no_claims.json, project_memory.jsonl}` | Reglas duras, prohibiciones de claims y memoria de decisiones. | 0.5–2.8 KB |
| `.aiw/roadmap/{roadmap.json, roadmap_v2.json, ROADMAP_V2_ARCHITECTURE.md, ...}` | Roadmap canónico + versiones e histórico. | 42–148 KB por archivo |
| `.aiw/ledgers/*.jsonl` | Ledgers append-only (change_ledger, human_decisions, human_qa, ai_reviews, git_provenance). | 3–39 KB |
| `.aiw/state/*.json{l}` | Estado de proyecto/componentes + `events.jsonl`. | 16–38 KB |
| `.aiw/views/*.json` | Snapshots proyectados para la consola. | 38–489 KB |
| `.claude/settings.local.json` | Settings locales de Claude Code. | 281 B |

#### `projects/cantu-lessons/` (workspace de contenido autoral)

| Ruta | Propósito aparente | Tamaño |
|---|---|---|
| `README.md` | Qué es el workspace, cómo activarlo, qué se versiona/ignora, permisos AIW futuros. | 40 líneas |
| `docs/README.md` | Índice operativo de docs. | 40 líneas |
| `docs/AIW_POLICY.md` | Permisos futuros de AIW (lectura, escritura bajo gates, fuera de alcance). | 51 líneas |
| `docs/AIW_AUTHORING_CONTRACTS.md` | Contrato operativo mínimo para authoring asistido por IA. | 48 líneas |
| `docs/AUTHORING_POLICY.md` | Reglas de edición y límites de cambio en `drafts/`. | 26 líneas |
| `docs/VALIDATION_WORKFLOW.md` | Flujo mínimo de validación (10 pasos) + criterios de rechazo. | 30 líneas |
| `docs/DOCUMENTATION_MAP.md` | Relación documental y clases de documento. | 54 líneas |
| `docs/DOCUMENT_STATUS.md` | Tabla de estado de docs (ACTIVE/MVP/PLACEHOLDER/DEFERRED, con Owner). | 23 líneas |
| `docs/OUTPUTS_WEB_MOODLE.md` | Semántica de artefactos `.WEB.html` / `.MOODLE.html`. | 26 líneas |
| `docs/qa/README.md` | Centro de referencia de fixtures QA y reglas de estabilidad. | — |
| `docs/components/{README.md, lista.md}` | Plantilla de doc por componente + contrato MVP de Lista. | — |
| `metadata/README.md` + catálogos JSON | Metadata futura (paletas, icon-library). | 0.2–0.8 KB |

#### `projects/aiw-console/` (inventario superficial — restringido)

Estructura de **primer nivel** (carpetas): `.aiw/`, `.git/`, `context/`, `docs/`, `roadmap/`,
`tests/`, `tools/`. Archivos raíz: `README.md` (1.3 KB), `package.json`, `projects.config.json`
(+ `.bak`), `.gitignore`.

Verificación de existencia de archivos de contexto (sin leer contenido):
- `CLAUDE.md` en la raíz: **no existe**.
- `AGENTS.md` en la raíz: **no existe**.
- `README.md` en la raíz: **existe**.
- Carpeta `context/` **existe** y contiene (por nombre): `DECISIONES.md`, `MIGRATION-REPORT.md`,
  `README.md`, y subcarpetas `aiw/`, `aiw-console/`, `cantu-studio/`, `handoffs/`. Aquí residen
  los context packs canónicos de AIW mudados desde `aiw/` (D-037).
- Carpeta `roadmap/` **existe** con `roadmap.json`.
- Contenido de cualquiera de estos archivos: `no determinado` (fuera de alcance por restricción del ticket).

### A.2 — ¿Convención consistente entre repos, o estructura propia?

**Cada repo tiene estructura propia; no hay una convención única compartida.** Hechos:

- **Nombre del archivo de instrucciones al agente difiere:** `aiw/` usa `CLAUDE.md`/`CONSTITUCION.md`;
  `cantu-studio/` usa `CLAUDE.md` **y** `AGENTS.md` (ambos en raíz); `cantu-lessons/` **no tiene**
  `CLAUDE.md`/`AGENTS.md`, gobierna vía `docs/AIW_*` y `docs/AUTHORING_POLICY.md`;
  `aiw-console/` **no tiene** `CLAUDE.md`/`AGENTS.md` en raíz.
- **Convención de artefactos-máquina `.aiw/` sí es parcialmente compartida** entre `cantu-studio/`
  (rica: guardrails, ledgers, roadmap, state, views) y `aiw-console/` y `aiw/` (`.aiw/` existe en
  los tres), pero el contenido/densidad varía mucho: `cantu-studio/.aiw/` está poblado; `aiw/.aiw/`
  solo tiene `project_console.snapshot.json`.
- **Patrón de "orden de autoridad" documentado** existe en `cantu-studio` (CLAUDE.md §"Orden de
  autoridad") y en `aiw` (CONSTITUCION + jerarquía implícita), pero con formatos distintos.
- **Idioma mixto:** `aiw/` y `cantu-studio/` (raíz) en español; `cantu-studio/docs/` en inglés;
  `cantu-lessons/docs/` en español.
- Coincidencia transversal real: los cuatro comparten la doctrina **"no CERTIFIED / no auto-merge /
  gates humanos / AIW no toca código de motor sin ticket"**, expresada de forma distinta en cada repo.

---

## B. Estructura de los context packs

### B.3 — ¿Monolítico o modular? Secciones. ¿Carga condicional?

| Context pack | Monolítico / Modular | Secciones principales | Carga condicional |
|---|---|---|---|
| `aiw/CLAUDE.md` + `CONSTITUCION.md` + `CONTEXTO.md` | **Modular por función**: reglas (CLAUDE) / constitución dura (CONSTITUCION) / puntero (CONTEXTO). Cada uno monolítico y corto (~46 líneas). | CLAUDE: Qué es / Reglas / Dónde vive cada cosa / Modelo de trabajo / Idioma. CONSTITUCION: Invariantes v1 / Piso de severidad reviewer / Anti-auto-hosting / Presupuesto de complejidad / Topología Git / Métrica. | Sin disclosure progresivo formal; el pack apunta a archivos externos (ESTADO, DECISIONES, DELEGACION) que el agente carga "al iniciar sesión". |
| `cantu-studio/CLAUDE.md` | **Monolítico grande** (629 líneas) con **ruteo interno explícito**: incluye una sección "Fuentes de verdad **por tipo de tarea**" que lista qué leer según la tarea → disclosure progresivo manual. | Identidad / Proyecto / Pipeline / Estado documental / Sistema de contextos IA / Fuentes de verdad por tarea / Orden de autoridad / Fase actual / Certificación / Fixtures / Reglas arquitectónicas / Reglas de código / Reglas de doc / Comandos / Comunicación / Git. | **Sí, condicional por diseño:** los `prompts/generated/ctx_*.md` son perfiles por tarea (8 vigentes + legacy) que se cargan selectivamente; `_CONTEXT_GUIDE.md` decide cuál. |
| `cantu-studio/docs/` (blueprint system) | **Modular por categoría** con `START-HERE.md` como capa 0 que enruta a ARCHITECTURE / REFERENCE / COMPONENTS / HOW-TO / DECISIONS / OPERATIONS / GOVERNANCE / DOCS-MGMT. | Ver A.1. `DOCUMENTATION-BLUEPRINT.md` fija el estándar de cada doc. | Disclosure progresivo explícito: START-HERE → categoría → doc. |
| `cantu-lessons/docs/` | **Modular plano** (~9 docs cortos) con `README.md` + `DOCUMENTATION_MAP.md` como índice. | Policy / Contracts / Workflow / Outputs / QA / Components. | Índice-dirigido, sin perfiles cargables. |
| `aiw-console/context/` packs | `no determinado` (restringido). Solo se verificó que hay estructura por consumidor (`aiw/`, `aiw-console/`, `cantu-studio/`, `handoffs/`). | `no determinado`. | `no determinado`. |

### B.4 — Proporción de contenido por pack (estimación gruesa)

| Pack | Decisiones vigentes | Historia | Reglas de no-hacer | Referencia técnica |
|---|---|---|---|---|
| `aiw/CLAUDE.md` | ~25% | ~10% | ~40% | ~25% (dónde vive cada cosa) |
| `aiw/CONSTITUCION.md` | ~20% | ~15% (invariantes heredadas de v1) | ~55% (prohibiciones, presupuesto, topología) | ~10% |
| `cantu-studio/CLAUDE.md` | ~20% (fase actual, estado de componentes) | ~10% (docs históricos, legacy) | ~35% (reglas arquitectónicas/código/doc, "No…") | ~35% (fuentes por tarea, fixtures, comandos) |
| `cantu-studio/docs/` (agregado) | ~25% (ADRs, ops-state) | ~30% (archive/passes) | ~15% (governance/no-claims) | ~30% (architecture/reference) |
| `cantu-lessons/docs/` | ~30% (policies, status) | ~5% | ~40% (allowed/denied, criterios de rechazo) | ~25% (outputs, contracts) |

> Estimación por inspección; no es medición línea a línea. La categoría "reglas de no-hacer" es
> dominante y explícita en los cuatro repos (listas numeradas "No …" y guardrails).

### B.5 — ¿Existen secciones tipo "gotchas" (fallas conocidas del modelo, correcciones recurrentes)?

**Sí, existen, pero no bajo la etiqueta "gotchas" ni centralizadas en un solo lugar.** Se
encontraron estas formas equivalentes:

- **`cantu-studio/.aiw/guardrails/project_memory.jsonl`** — el artefacto más cercano a un registro
  de gotchas: cada línea es una decisión/guardrail con `rationale` derivado de una falla real.
  Ejemplos: `memory-no-retry-restricted-keyboard` ("un intento técnicamente viable fue rechazado
  por QA humano por regresión de UX → no reintentar sin estrategia UX-first");
  `memory-simple-web-ui-scope` ("historial reciente de repair/revert muestra que el alcance amplio
  aumenta riesgo de regresión").
- **`cantu-studio/.aiw/guardrails/project_guardrails.json`** — reglas duras de no-hacer
  (no tocar schema/compiler bajo tickets de UI simple; no cambiar paleta/renderers bajo UI no
  relacionada; no mutar Git como agente).
- **`cantu-studio/.aiw/guardrails/no_claims.json`** — prohibición de claims de estado "certified".
- **`cantu-studio/CLAUDE.md`** — sección "Reglas arquitectónicas inmutables" (16 puntos "No…") y
  "Comunicación" ("No asumas nombres antiguos como `blockRegistry.js`, `BlockEditor.jsx`…") — esto
  último es literalmente una corrección recurrente de alucinación de nombres.
- **`aiw/CONSTITUCION.md`** — el preámbulo entero es un anti-gotcha: "Estas reglas existen porque
  AIW v1 (200+ runs) divergió… Cada regla rompe un mecanismo específico de esa divergencia".
  §4 lista mecanismos "Prohibido reintroducir sin incidente".
- **`cantu-lessons/docs/VALIDATION_WORKFLOW.md`** — "Criterios de rechazo (no avanzar)".
- **`aiw-console`**: `no determinado`.

---

## C. Memoria entre sesiones

**Sí existen mecanismos de aprendizaje estructurado entre sesiones, con madurez desigual por repo.**

| Repo | Mecanismo | Naturaleza | ¿Automático o manual? |
|---|---|---|---|
| `cantu-studio` | `.aiw/ledgers/*.jsonl` (change_ledger, human_decisions, human_qa, ai_reviews, git_provenance) | Append-only, por evento. | Mezcla: parte emitida por herramientas, parte de decisiones humanas. `no determinado` qué proporción es automática. |
| `cantu-studio` | `.aiw/guardrails/project_memory.jsonl` | Memoria de decisiones/guardrails con `source_refs` y `rationale`. | Actualización parece **manual/curada** (entradas con `date_or_unknown`, refs a ADRs). |
| `cantu-studio` | `.aiw/state/events.jsonl` | Log de eventos de estado. | `no determinado`. |
| `aiw` | `logs/<run>/{STAGE.txt, summary.md, roundN_*.md, preflight.txt}` | Evidencia por run que el kernel escribe automáticamente (`summary.md` es el artefacto que la consola consume). | **Automático** (lo emite el kernel). |
| `aiw` | Ritual de cierre: actualizar `ESTADO.md` + registrar decisiones en `DECISIONES.md` + commit "docs: sesión AAAA-MM-DD" | Aprendizaje estructurado sesión→sesión. | **Manual del humano** (documentado en CLAUDE.md §"Modelo de trabajo"). Los archivos destino viven en `aiw-console` (contenido `no determinado`). |
| `aiw` | `records/CRONICA.md`, `records/COSECHA.md` | Crónica de sesiones/incidentes y cosecha de lecciones de v1. | **Manual/curado**. |
| `cantu-lessons` | — | No se encontró log de sesión ni archivo de memoria; la actualización de contexto es de docs manuales. | **Manual**. |
| `aiw-console` | `context/handoffs/` (existe por nombre) sugiere relevos efímeros entre sesiones. | `no determinado` (contenido restringido). | `no determinado`. |

**Síntesis:** el único aprendizaje **emitido automáticamente por la máquina** es el de `aiw/logs/`
(por run) y, parcialmente, los ledgers/events de `cantu-studio/.aiw/`. Todo lo que es "contexto de
cabina" (ESTADO/DECISIONES) se actualiza **manualmente por el humano** en el ritual de cierre. No se
observó un mecanismo que cierre el lazo falla→contexto de forma automática.

---

## D. Roadmaps y su formato

| Repo | Roadmap | Formato / jerarquía | Estados | Campos por run | Consistencia |
|---|---|---|---|---|---|
| `cantu-studio` | `.aiw/roadmap/roadmap.json` (68 KB, vivo) | JSON. `schema_version: jame.roadmap_v3.v0.2-progress`. Jerarquía **objectives → phases → runs**. | `planned`, `active`, `completed`, `blocked` (según diagnóstico y muestra leída). | `run_id`, `queue_order`, `title`, `summary`, `full_description`, `status`, `depends_on[]` (+ `progress[]` en runs activos). | Rico y estructurado; convive con `roadmap_v2.json`, `roadmap_v2_normalized_proposal.json` y `ROADMAP_V2_ARCHITECTURE.md` (versiones/propuestas). |
| `aiw` | `roadmap_AIW_temp.md` (referenciado en CLAUDE.md como backlog) | Markdown, reside en `aiw-console/context/aiw/`. | `no determinado` (contenido no leído). | `no determinado`. | Distinto medio (MD) y ubicación externa. |
| `aiw` (interno) | `objectives/{pending,parked,processed,prepared,qualification,queue-e7,staged}/*.md` | Carpetas por estado de ciclo de vida; cada objetivo es un `objective.md` con secciones fijas. | Estado por **carpeta** (pending/parked/processed…). | `# Project / # Objective / # Acceptance criteria / # Scope / # Out of scope / # Max rounds / # Verification`. | Convención propia, orientada al kernel; no comparte schema con el JSON de cantu-studio. |
| `aiw-console` | `roadmap/roadmap.json` (existe) + `context/aiw/roadmap_AIW_temp.md` | `no determinado` (contenido restringido). | `no determinado`. | `no determinado`. | `no determinado`. |
| `cantu-lessons` | — | No tiene roadmap propio; se gobierna por `DOCUMENT_STATUS.md` (tabla de estados de doc) y passes. | `ACTIVE/MVP/PLACEHOLDER/DEFERRED`. | Document / Status / Owner / Purpose / Notes. | Formato de "estado documental", no de roadmap de runs. |

**Consistencia entre repos:** baja. `cantu-studio` usa JSON jerárquico versionado
(`objectives→phases→runs`); `aiw` usa MD + carpetas-por-estado; `cantu-lessons` usa una tabla de
estado documental. El único punto de contacto es que **`aiw-console` es el consumidor/proyector** de
roadmaps (la consola lee `roadmap.json`), lo que impone al menos un formato JSON de destino, pero
cada repo origina el suyo. (Dato relevante para el ticket, dado que las mejoras futuras se insertarían
vía la consola: el schema de destino que la consola lee es el `roadmap_v3` de cantu-studio; `aiw`
emite un schema plano distinto — ver F y `_reference`.)

---

## E. Lugar natural para evals

| Repo | ¿Existe algo parecido a evals de fallas? | Dónde encajaría una carpeta de casos de eval |
|---|---|---|
| `aiw` | **Sí, lo más cercano del workspace.** `objectives/queue-e7/` contiene casos que parecen una batería de evaluación de la cola: `a-resta.md`, `b-multiplica.md` y `c-imposible.md`. Este último es un **caso de falla por diseño**: "Objetivo imposible por diseño (validación del camino triste dentro de la cola): la verificación siempre falla". Es un eval de regresión de comportamiento del kernel. También `sandbox/tests/` y `objectives/parked/00X-*.md` (guards derivados de fallas: p.ej. `001-arithmetic-columns-guard.md`). | Extender `objectives/queue-e7/` o una carpeta hermana `objectives/evals/`; ya hay convención de "objetivo = caso reproducible con `# Verification`". |
| `cantu-studio` | **Parcial.** Malla real `node --test` en `tools/author-lite/compiler-api/tests/` (~262 casos; incluye tests-guard nacidos de fallas, p.ej. `webColumnsChildExpansionSafety`). `parked/001-arithmetic-columns-guard` en `aiw` apunta a crear `webArithmeticColumnsChildGuard.test.mjs` siguiendo ese patrón. No hay carpeta rotulada "evals de fallas del modelo". Existe `QA/temp/`. | Bajo `tools/author-lite/compiler-api/tests/` (regresión de contrato) o una carpeta documentada bajo `docs/` para casos de falla de comportamiento del agente; encaja la clase "Auditoría" de `DOCUMENT_CLASSES.md`. |
| `cantu-lessons` | **Sí, incipiente.** `drafts/qa/` con fixture smoke provisional (`workspace_external_mvp/caracteristicas_external_qa.draft.json`), gobernado por `docs/qa/README.md` con "reglas de estabilidad" (no mover/borrar sin ticket). | Ampliar `drafts/qa/` (ya designada como ubicación esperada de fixtures QA) o `docs/qa/`. |
| `aiw-console` | `no determinado` (existe `tests/` de primer nivel; contenido restringido). | `no determinado`. |

**Síntesis:** el lugar más natural y ya existente para "casos de eval derivados de fallas reales" es
**`aiw/objectives/queue-e7/`** (donde `c-imposible.md` ya es un caso de camino-triste) para
comportamiento del kernel/cola, y **`compiler-api/tests/`** (cantu-studio) para regresión de
contrato. Ninguno está rotulado como "evals" ni centralizado.

---

## F. `_reference`

**Contenido de `_reference/`:** tres diagnósticos Markdown de solo-lectura, congelados con fecha:

| Ruta | Propósito | Tamaño |
|---|---|---|
| `_reference/DIAGNOSTICO-AIW-V2-CANTU.md` | Auditoría (2026-07-20) de AIW v2 `.mjs` ↔ Cantu Studio: modo nocturno, red de verificación, integración con la consola, modelo de estado, evaluación. | 461 líneas |
| `_reference/DIAGNOSTICO-BLOCKED-TAXONOMIA.md` | Diagnóstico (2026-07-20) de la taxonomía de `BLOCKED` en AIW v2. | 691 líneas |
| `_reference/DIAGNOSTICO-LEGACY-V1-IDENTIDAD-Y-RETIRO.md` | Diagnóstico (2026-07-22) de identidad y retiro del Legacy v1 `ai_workflow` (CommonJS). | 282 líneas |
| `_reference/audits/Audit_Report_Contexto_Metodologia_v1.md` | Este reporte. | — |

**Papel respecto a los repos:** `_reference/` es un **archivo transversal de evidencia congelada**
(auditorías fechadas, marcadas `[VERIFICADO EN DISCO]`), no contexto vivo. No es leído por ningún
agente como fuente de reglas; es material de consulta humana sobre el estado real de AIW v2 y v1.

**¿Duplica o contradice los context packs de los repos?** Hallazgos concretos (hechos, no juicios):

- **Deriva de rutas:** los tres diagnósticos auditan AIW en
  `C:\Users\chris\Documents\AI_Workflow_Workspace\aiw\`, mientras que el workspace actual y el repo
  vivo están en `C:\Users\chris\Documents\AIW_Workspace\aiw`. Los documentos apuntan a una ubicación
  distinta de la que este audit encontró en disco. (No determinado si son copias sincronizadas o
  rutas obsoletas.)
- **Contradicción sobre estado del `005`:** el diagnóstico afirma que el objetivo `005` estaba
  "APROBADO pero NO mergeado" a `main` de aiw-console (2026-07-20). En `aiw/objectives/pending/`
  siguen listados `005-roadmap-contract-fix.md` y `006-roadmap-delivery-path.md`. Estado de merge
  actual: `no determinado` (no se auditó el Git de aiw-console).
- **Cifras de roadmap:** el diagnóstico corrige "53 planned" → "65 runs / 55 planned" (2026-07-20).
  El `roadmap.json` vivo de cantu-studio (68 KB, commit 2026-07-24) puede diferir; conteo actual
  `no determinado` en este audit.

**Contradicción interna entre packs vivos (no en `_reference`, pero relevante para F):** dentro de
`cantu-studio`, `CLAUDE.md` mantiene `CERTIFIED` como estado central de certificación (gates,
"Regla central de certificación"), mientras `.aiw/guardrails/no_claims.json`, `AGENTS.md` y
`docs/shared/AIW-CERTIFIED-RETIREMENT-HANDOFF.md` declaran que **el estado `CERTIFIED` fue retirado**
en favor del modelo de run-state (approved/changes-requested/blocked). Además, `CLAUDE.md` nombra a
**Claude Code como executor principal** y `AGENTS.md` nombra a **Codex como executor** para la
misma fase. Y `CLAUDE.md` remite a `docs/DOCUMENTATION_MAP.md` y `docs/DOCUMENT_STATUS.md` como
vigentes, pero **esos dos archivos no existen** en `cantu-studio/docs/` (el sistema fue reemplazado
por `START-HERE.md` + `DOCUMENTATION-BLUEPRINT.md` + `CANONICAL_SOURCES.md`).

---

## Observaciones para parking

- Unificar el nombre del archivo de instrucciones al agente (CLAUDE.md vs AGENTS.md vs docs/policy) entre repos.
- Resolver la contradicción CERTIFIED (CLAUDE.md) vs run-state retirado (AGENTS.md/no_claims.json) en cantu-studio.
- Reconciliar executor nombrado: Claude Code (CLAUDE.md) vs Codex (AGENTS.md) para la misma fase.
- Corregir en CLAUDE.md las referencias a docs/DOCUMENTATION_MAP.md y DOCUMENT_STATUS.md (no existen).
- Considerar una sección "gotchas" rotulada y centralizada (hoy está dispersa en guardrails/CONSTITUCION/CLAUDE).
- Evaluar promover queue-e7/c-imposible.md a una carpeta `evals/` explícita con más casos de camino-triste.
- Actualizar/anotar la deriva de rutas AI_Workflow_Workspace vs AIW_Workspace en los diagnósticos de _reference.
- Cerrar el lazo falla→contexto de forma menos manual (hoy ESTADO/DECISIONES se actualizan a mano).
- Alinear el schema de roadmap emitido por aiw (MD/carpetas) con el roadmap_v3 JSON que la consola consume.
- Verificar estado de merge de objetivos 005/006 (pendiente desde el diagnóstico del 2026-07-20).
```
