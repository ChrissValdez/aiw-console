# AUDIT-CONSOLE-O4-PHASE0 — Mapa de estado real

> Auditoría READ-ONLY. Ningún archivo fuera de este reporte fue creado, modificado ni
> borrado. No se ejecutó git en ninguna forma. No se levantó la consola, el validador,
> el proyector ni el tooling de roadmap.
>
> Fecha del reporte: 2026-07-23.
> Único archivo escrito: `aiw/records/AUDIT-CONSOLE-O4-PHASE0.md` (este).

## Leyenda de evidencia

- **[VERIFICADO EN DISCO]** — leído de disco; lleva cita `ruta:línea`.
- **[NO VERIFICABLE]** — no comprobable desde disco en esta sesión.
- **[REQUIERE OPERADOR]** — depende de git u otro estado que el operador debe aportar.

Las rutas se citan relativas a la raíz de trabajo `C:\Users\chris\Documents\AIW_Workspace`.
Abreviaturas de archivos muy citados:

- **CANTU-PCJS** = `projects/cantu-studio/docs/project-console/assets/project-console.js`
- **CANTU-VALID** = `projects/cantu-studio/tools/project-console/validate-project-console-state.mjs`
- **CANTU-BUILD** = `projects/cantu-studio/tools/project-console/build-git-history-snapshot.mjs`
- **CANTU-SERVE** = `projects/cantu-studio/tools/project-console/serve-project-console.mjs`
- **CON-PCJS** = `projects/aiw-console/docs/project-console/assets/project-console.js`
- **CON-VALID** = `projects/aiw-console/tools/project-console/validate-project-console-state.mjs`
- **CON-PROJ** = `projects/aiw-console/tools/projector/project.mjs`

## Nota de método (honestidad de evidencia)

Los hechos portantes (contrato de datos, mecanismo y anchors del validador, proyector,
history-builder, config y roadmap de AIW, divergencias de la consola) fueron leídos de
primera mano por quien firma esta auditoría, con cita `ruta:línea`. Los **inventarios de
forma** de los ~25 archivos bajo `.aiw/**` de cada repo (lista de claves de cada JSON,
campos de una línea de cada `.jsonl`) fueron reunidos por una pasada de descubrimiento
READ-ONLY sobre los archivos reales (no desde memoria ni desde el nombre del archivo); la
estructura de directorios que los enmarca sí fue verificada de primera mano. Donde una
afirmación depende de esa pasada y no de una lectura directa línea a línea, el hecho sigue
siendo de disco y citado, pero se marca el método aquí para que el lector lo pese.

---

## Hallazgos de premisa (leer antes de los bloques)

Ninguno alcanza el umbral de "PARAR: premisa falsa que invalida el ticket" (el repo AIW es
el correcto, la consola de Cantu existe, y el contrato es reversible). Se listan porque
tuercen premisas de redacción del ticket y condicionan la lectura:

1. **Ubicación de los repos.** El ticket dice que desde la raíz "son visibles: aiw,
   aiw-console y los repos de proyecto". En disco, `aiw/` está en la raíz pero
   `aiw-console`, `cantu-studio` y `cantu-lessons` cuelgan de `projects/`, no de la raíz.
   [VERIFICADO EN DISCO] `projects/` contiene `aiw-console/`, `cantu-lessons/`,
   `cantu-studio/`. No es premisa falsa: los repos existen y son legibles.

2. **Hay DOS validadores divergentes, no uno.** El ticket habla de "el validador" en
   singular. Existen dos copias divergentes del validador (CANTU-VALID 2044 líneas,
   CON-VALID 3087 líneas). [VERIFICADO EN DISCO] (Bloque A, Bloque C). Esto es material
   para el Bloque F.1.

3. **La "tarjeta de portafolio del prototipo" NO existe como código hoy.** El substring
   `portfolio` no aparece en ningún fuente de consola de ninguno de los dos repos.
   [VERIFICADO EN DISCO] búsqueda `portfolio` sobre `*.js/*.mjs/*.html` de `aiw-console` y
   `cantu-studio` devuelve solo `cantu-studio/.aiw/docs/docs_corpus_curation_audit.json` y
   `cantu-studio/prompts/ChatGPT_Global_AI_Architect_v1.md` (ningún fuente de consola). En
   el Bloque B se mapea cada campo pedido a su fuente real o a **[NO EXISTE]**.

4. **La config de AIW no conoce a Cantu.** `aiw/config.json` lista dos proyectos:
   `sandbox` y `console` (= aiw-console). Cantu Studio no aparece.
   [VERIFICADO EN DISCO] `aiw/config.json:4-17`.

---

## BLOQUE 0 — Terreno

### 0.1 Directorios bajo la raíz de trabajo

[VERIFICADO EN DISCO] Contenido de `C:\Users\chris\Documents\AIW_Workspace`:

| Directorio | Rol observado | ¿repo git? |
|---|---|---|
| `aiw/` | Kernel AIW v2 + su estado | Sí — `aiw/.git` es **directorio** |
| `projects/aiw-console/` | Fork de la consola + proyector | Sí — `.git` es **directorio** |
| `projects/cantu-studio/` | JAME Core / Author Lite + consola viva | Sí — `.git` es **directorio** |
| `projects/cantu-lessons/` | (no auditado en detalle; fuera de foco) | Sí — `.git` es **directorio** |
| `_reference/` | 3 diagnósticos `.md` sueltos | No |

Presencia de `.git` comprobada como tipo de nodo, sin ejecutar git: los cuatro `\.git`
son directorios. [VERIFICADO EN DISCO] test `-d`/`-f` sobre cada `<repo>/.git`.

### 0.2 Rutas absolutas de los repos relevantes

[VERIFICADO EN DISCO]

- AIW: `C:\Users\chris\Documents\AIW_Workspace\aiw`
- aiw-console: `C:\Users\chris\Documents\AIW_Workspace\projects\aiw-console`
- cantu-studio: `C:\Users\chris\Documents\AIW_Workspace\projects\cantu-studio`
- cantu-lessons: `C:\Users\chris\Documents\AIW_Workspace\projects\cantu-lessons`

### 0.3 Señal de identidad de AIW (v2 vs Legacy)

[VERIFICADO EN DISCO] `aiw/kernel.mjs` existe (26954 bytes). `aiw/bin` NO existe;
`aiw/src` NO existe (`ls` de ambos = ausente). Por la regla del ticket, esto es **AIW v2**,
no Legacy. El diagnóstico NO se apoya en `bin/aiw.js` ni en `src/core/*.js` (no existen).
Corroborado por `aiw/CLAUDE.md` ("AIW v2 es el kernel mínimo…", "No es AIW Core (v1). Ese
repo está CONGELADO en …AI_Workflow_Workspace…") — pero la señal portante es la presencia
de `kernel.mjs` y la ausencia de `bin/`+`src/`. **No hay PARAR por repo equivocado.**

### 0.4 Estado de rama/HEAD/limpieza

[REQUIERE OPERADOR] para los cuatro repos. Comandos exactos que hacen falta (a ejecutar
por el operador, uno por repo):

```
git -C <repo> rev-parse --abbrev-ref HEAD      # rama actual
git -C <repo> rev-parse HEAD                    # HEAD sha
git -C <repo> status --porcelain                # limpieza / cambios sin commitear
git -C <repo> branch --list                     # ramas locales
```

---

## BLOQUE A — Inventario de superficie de la consola

### A.1 Tabla archivo → repo → rol → lee → escribe

Rol, lecturas y escrituras verificados en el propio fuente salvo donde se anota. "Lee/
escribe" = lo que el archivo toca en disco en operación normal (no en tiempo de test).

| Archivo (subruta) | Repos donde existe | Rol | Lee de disco | Escribe |
|---|---|---|---|---|
| `docs/project-console/index.html` | ambos | Cascarón HTML de la consola (tabs, contenedores) | — (estático) | — |
| `docs/project-console/assets/project-console.js` | ambos | **Renderer frontend** de la consola | 15–20 rutas bajo `../../.aiw/**` vía `fetch` (Bloque B) + endpoints internos | nada en disco; POST a `/__project-console/roadmap/edit` (solo CANTU-PCJS) |
| `docs/project-console/assets/project-console.css` | ambos | Estilos | — | — |
| `tools/project-console/serve-project-console.mjs` | ambos | **Servidor** local que sirve la consola, corre proyección en arranque, vigila `.git`, y expone endpoints internos | `projects.config.json`, `.git`, y lo que el proyector/history-builder necesiten | `.aiw/views/project_console.snapshot.json`, `.aiw/views/roadmap.json`, copia `.aiw/roadmap/roadmap.json`, `.aiw/views/git_history.snapshot.json` (según schema-doc §5; ver A.4) |
| `tools/project-console/validate-project-console-state.mjs` | ambos | **Validador de estado** de la consola | 10 archivos `.aiw/**` + fuente de consola (`.js/.css/index.html`) + history-builder + server (Bloque C) | nada (solo `console.log` + exit code) |
| `tools/project-console/build-git-history-snapshot.mjs` | ambos | **Constructor del snapshot de historia de git** | ejecuta git read-only (`for-each-ref`/`rev-parse`/`branch`/`log`) | `.aiw/views/git_history.snapshot.json` (`CANTU-BUILD:24`) |
| `tools/project-console/run-state-normalization.mjs` | ambos | Módulo compartido de normalización de estado de run (enum/campos); lo importa el validador | — (biblioteca pura) | — |
| `tools/projector/project.mjs` | **solo aiw-console** | **Proyector**: construye el snapshot de la consola desde un project root | `<root>/.aiw/` (lectura pura; `CON-PROJ:412` "Pure read: touches nothing on disk") | `<root>/.aiw/views/project_console.snapshot.json` y `.aiw/views/roadmap.json` (atómico temp+rename, `CON-PROJ:32,35,495-497`) |
| `tools/roadmap/roadmap-core.mjs` | **solo cantu-studio** | Núcleo del tooling de roadmap (edición acotada de `roadmap.json`) | `.aiw/roadmap/roadmap.json` | `.aiw/roadmap/roadmap.json` (vía plan/edit) |
| `tools/roadmap/roadmap-plan.mjs` | **solo cantu-studio** | Orquestación de plan (dry-run→apply) sobre roadmap-core; la importa el endpoint del server | idem | idem |
| `tools/roadmap/roadmap-edit.mjs` | **solo cantu-studio** | CLI de edición del roadmap | idem | idem |

Notas de existencia [VERIFICADO EN DISCO]:
- Proyector presente solo en aiw-console: `aiw-console/tools/projector/project.mjs` existe;
  `cantu-studio/tools/projector/project.mjs` NO existe.
- Tooling de roadmap presente solo en cantu-studio: `cantu-studio/tools/roadmap/roadmap-core.mjs`
  existe; `aiw-console/tools/roadmap/` NO existe.

### A.2 Idénticos vs divergentes (archivos presentes en LOS DOS repos)

[VERIFICADO EN DISCO] md5 + conteo de líneas, ambos repos:

| Archivo | aiw-console | cantu-studio | Veredicto |
|---|---|---|---|
| `build-git-history-snapshot.mjs` | 236 L, md5 `28bf238e…` | 236 L, md5 `28bf238e…` | **IDÉNTICO** |
| `run-state-normalization.mjs` | 593 L, md5 `659f126d…` | 593 L, md5 `659f126d…` | **IDÉNTICO** |
| `serve-project-console.mjs` | 401 L, md5 `861e86da…` | 442 L, md5 `b047da61…` | **DIVERGENTE** (cantu +41 L) |
| `validate-project-console-state.mjs` | 3087 L, md5 `9d71d14a…` | 2044 L, md5 `1ad47e13…` | **DIVERGENTE** (aiw-console +1043 L) |
| `docs/project-console/index.html` | 155 L, md5 `30f4c94e…` | 183 L, md5 `c633c744…` | **DIVERGENTE** (cantu +28 L) |
| `assets/project-console.js` | 3894 L, md5 `01ec91d8…` | 5631 L, md5 `4000bebd…` | **DIVERGENTE** (cantu +1737 L) |
| `assets/project-console.css` | 4690 L, md5 `6c363845…` | 5689 L, md5 `a0bf2e15…` | **DIVERGENTE** (cantu +999 L) |

### A.3 Naturaleza de la divergencia y quién va adelante

La divergencia NO es simétrica: cada archivo va adelante en un repo distinto, y la causa
raíz es una **línea de tiempo de "retiro del roadmap legacy"** que cantu ya cruzó y
aiw-console no.

- **Frontend (`project-console.js`): cantu va ADELANTE.** El fork en aiw-console es una
  foto **anterior** al retiro del roadmap legacy. Evidencia: CON-PCJS aún lista en su tabla
  de rutas los sources legacy `objectives.jsonl`, `phases.jsonl`, `runs.jsonl`, `queue.json`,
  `roadmap_v2.json` [VERIFICADO EN DISCO] `CON-PCJS:6-10`; CANTU-PCJS los borró y documenta
  el porqué: "Legacy roadmap sources (objectives/phases/runs/queue) were deleted from disk…
  The console reads only the v3 roadmap below." [VERIFICADO EN DISCO] `CANTU-PCJS:6-8`.
  CON-PCJS tampoco tiene el endpoint de edición de roadmap (`roadmapEdit`), que CANTU-PCJS sí
  [VERIFICADO EN DISCO] `CANTU-PCJS:26` vs ausencia en `CON-PCJS:1-27`.
- **Validador: aiw-console es MÁS GRANDE porque aún valida el modelo legacy.** CON-VALID lee
  `.aiw/roadmap/objectives.jsonl`, `phases.jsonl`, `runs.jsonl`, `queue.json`, `roadmap_v2.json`
  [VERIFICADO EN DISCO] `CON-VALID:181-185`, más `human_decisions.jsonl` (`CON-VALID:1793`) y
  artefactos de migración (`CON-VALID:2550-2551`); CANTU-VALID retiró esas lecturas y lo dice:
  "Legacy roadmap model retired (RUN-CANTU-ROADMAP-LEGACY-RETIREMENT-VALIDATOR-001)"
  [VERIFICADO EN DISCO] `CANTU-VALID:157-160`. Por eso "más grande" aquí = **más viejo**, no
  "más completo hacia v3".
- **Server: cantu va adelante** (tiene el endpoint de edición de roadmap y su handler; ver
  Bloque C anchors del server), lo que explica sus +41 líneas.
- **`build-git-history-snapshot.mjs` y `run-state-normalization.mjs`: idénticos** (md5
  igual), es decir el fork no tocó ni el constructor de historia ni la normalización.

Lectura conjunta: **aiw-console = fork de la consola de Cantu tomado ANTES del retiro del
roadmap legacy (v1/v2), más el proyector nuevo. Cantu = misma consola pero post-retiro
(solo v3) y con edición de roadmap.** El fork no ha seguido re-sincronizando desde Cantu.

### A.4 Pregunta explícita del bloque

**¿aiw-console contiene hoy una copia de la consola de Cantu, contiene solo el proyector,
o contiene otra cosa?**

[VERIFICADO EN DISCO] **Contiene AMBOS: una copia (divergente y anterior) de la consola de
Cantu — index.html + assets + los 4 tools de `project-console/` — Y, adicionalmente, el
proyector `tools/projector/project.mjs`, que NO existe en Cantu.** Además trae una
`projects.config.json` que apunta el proyector al repo AIW: `{ "projects": [ { "root":
"../../aiw", "id": "aiw" } ] }` [VERIFICADO EN DISCO] `aiw-console/projects.config.json:1-4`.
El `package.json` se autodescribe como "AIW project console — verbatim fork of the JAME
project console (zero dependencies)" [VERIFICADO EN DISCO] `aiw-console/package.json:6`; el
adjetivo "verbatim" ya es **falso/obsoleto** respecto a los bytes (A.2). Lo que aiw-console
NO contiene: el tooling de roadmap (`tools/roadmap/*`), que sigue solo en Cantu.

---

## BLOQUE B — El contrato de datos implícito

Ingeniería inversa desde el renderer de la consola de Cantu (CANTU-PCJS), que es la consola
de referencia del ticket. Donde aiw-console difiere se anota.

### B.1 Lista COMPLETA de rutas que el frontend busca (tabla PATHS)

[VERIFICADO EN DISCO] `CANTU-PCJS:1-27`, objeto `const PATHS = { … }`, verbatim (rutas
relativas a `docs/project-console/`, o sea `../../` = raíz del repo):

| Clave | Ruta | Tipo |
|---|---|---|
| `snapshot` | `../../.aiw/views/project_console.snapshot.json` | JSON |
| `project` | `../../.aiw/project.json` | JSON |
| `projectStatus` | `../../.aiw/state/project_status.json` | JSON |
| `componentStatus` | `../../.aiw/state/component_status.json` | JSON |
| `roadmapV3` | `../../.aiw/roadmap/roadmap.json` | JSON |
| `events` | `../../.aiw/state/events.jsonl` | JSONL |
| `changeLedger` | `../../.aiw/ledgers/change_ledger.jsonl` | JSONL |
| `gitProvenance` | `../../.aiw/ledgers/git_provenance.jsonl` | JSONL |
| `humanQa` | `../../.aiw/ledgers/human_qa.jsonl` | JSONL |
| `aiReviews` | `../../.aiw/ledgers/ai_reviews.jsonl` | JSONL |
| `docsIndex` | `../../.aiw/docs/docs_index.json` | JSON |
| `guardrails` | `../../.aiw/guardrails/project_guardrails.json` | JSON |
| `noClaims` | `../../.aiw/guardrails/no_claims.json` | JSON |
| `memory` | `../../.aiw/guardrails/project_memory.jsonl` | JSONL |
| `gitHistory` | `../../.aiw/views/git_history.snapshot.json` | JSON |
| `historySync` | `/__project-console/history/sync` | endpoint (POST) |
| `roadmapEdit` | `/__project-console/roadmap/edit` | endpoint (GET/POST) |

`roadmap_v2.json` **no** está en PATHS de Cantu: solo aparece como texto en un panel
("Reads .aiw/roadmap/roadmap_v2.json (optional, fail-soft)", `CANTU-PCJS:1824`), no como
fetch. [VERIFICADO EN DISCO]

**Divergencia aiw-console:** CON-PCJS agrega 5 rutas legacy a PATHS —
`objectives:../../.aiw/roadmap/objectives.jsonl`, `phases:…/phases.jsonl`,
`runs:…/runs.jsonl`, `queue:…/queue.json`, `roadmapV2:…/roadmap_v2.json`
[VERIFICADO EN DISCO] `CON-PCJS:6-10` — y NO trae `roadmapEdit` (solo `historySync`,
`CON-PCJS:23`).

### B.2 Requerida vs fail-soft, por ruta

Mecánica [VERIFICADO EN DISCO]: los helpers `fetchText(path, required=false)` y
`fetchJson(path, required=false)` empujan a `failedSources` y, si `required`, relanzan; si
no, devuelven `null`. `fetchJsonl(path)` **no** tiene parámetro `required`: siempre es
fail-soft y devuelve `[]`. `CANTU-PCJS:914-954`. La orquestación
`loadData()` llama exactamente una ruta con `required=true`:
`const snapshot = await fetchJson(PATHS.snapshot, true);` `CANTU-PCJS:5559`; las otras 14 van
sin flag (fail-soft), `CANTU-PCJS:5576-5589`.

| Ruta | ¿Requerida? |
|---|---|
| `snapshot` (`project_console.snapshot.json`) | **REQUERIDA** (única) — `CANTU-PCJS:5559` |
| Las otras 14 (`project`, `projectStatus`, `componentStatus`, `roadmapV3`, `events`, `changeLedger`, `gitProvenance`, `humanQa`, `aiReviews`, `docsIndex`, `guardrails`, `noClaims`, `memory`, `gitHistory`) | **FAIL-SOFT** — `CANTU-PCJS:5576-5589` |

Corroborado por el schema-doc del proyecto: "The forked console reads many `.aiw/*`
sources, but **exactly one is required**: `project_console.snapshot.json`. Everything else
is fail-soft enrichment." [VERIFICADO EN DISCO]
`aiw-console/docs/snapshot-schema-v1.md:11-13`.

### B.3 Degradación por ruta fail-soft

Mecánica de degradación [VERIFICADO EN DISCO]:

- **Falla `snapshot` (requerida):** `init()` cae al `catch` y llama `showFetchFallback(error)`
  — banner `readonly-banner` "Could not load the Project Console snapshot." + pista de
  `file://` + mensaje de error — y reemplaza tres contenedores por estados vacíos:
  `project-overview` → "Primary snapshot could not be loaded.", `next-pending-runs` → "No
  queue data is available without the snapshot.", `overview-activity` → "Overview
  restrictions are unavailable without the snapshot." `CANTU-PCJS:5616-5628`, banner en
  `CANTU-PCJS:4309-4318`. Es decir: sin snapshot, la consola no renderiza sus vistas
  primarias.
- **Falla cualquier ruta fail-soft:** `showOptionalSourceNotice()` levanta **un** banner
  agregado `readonly-banner`: "Rendered from the primary snapshot. Some optional local
  state files could not be loaded. Open the Console Diagnostics panel in the Status tab for
  details." `CANTU-PCJS:4320-4326`. No hay banner por-archivo; el detalle vive en el panel
  Console Diagnostics (Status).

Degradación concreta de UI por ruta ausente (a qué cae la vista que la consume):

| Ruta fail-soft | Consumidor principal | Degradación al faltar |
|---|---|---|
| `project.json` | manifiesto/encabezado (`renderGovernance`/sources) | campos de manifiesto vacíos; banner agregado |
| `projectStatus` | `nextRun()` (`next_recommended_run_id`), status | "Next up" sin candidato si tampoco lo trae el snapshot; banner |
| `componentStatus` | panel de componentes (Status) | panel de componentes vacío; banner |
| `roadmapV3` (`roadmap.json`) | Roadmap tab (`v3Model`), Overview v3 | Roadmap/Overview muestran su banner de "source unavailable"/estado vacío (schema-doc §6, `aiw-console/docs/snapshot-schema-v1.md:101`) |
| `events` / `changeLedger` / `gitProvenance` / `humanQa` / `aiReviews` | feeds de Status/actividad | listas vacías (`fetchJsonl`→`[]`); banner |
| `docsIndex` | Docs tab (árbol) | Docs tab sin documentos (pestaña muerta/estado vacío) |
| `guardrails` / `noClaims` / `memory` | Governance tab | chips/estado vacíos; banner |
| `gitHistory` | History tab (`renderCommitHistory`) | History sin commits (estado vacío); banner |

[VERIFICADO EN DISCO] para el mecanismo y los consumidores citados; la frase exacta de cada
estado vacío por-panel no se transcribió una por una (se cita el mecanismo `emptyState`/
banner y el consumidor). Marca de alcance: donde arriba se dice "estado vacío" sin cita de
la cadena literal exacta del panel, léase **[VERIFICADO EN DISCO parcial]** — verificado el
camino fail-soft y el consumidor, no la cadena de cada panel.

### B.4 Snapshot requerido: forma esperada

El único archivo requerido tiene contrato documentado (schema v1) y, en disco, **dos formas
distintas** entre repos:

- Contrato v1 (lo que el proyector emite), claves requeridas [VERIFICADO EN DISCO]
  `aiw-console/docs/snapshot-schema-v1.md:33-45`: `schema_version` (entero), `project_id`,
  `operational_status` (string), `project_summary` (string), `current_status_summary`,
  `roadmap_tree` (objeto), `blockers` (array), `followups` (array), `no_claims_summary`,
  `validation_summary`, `taxonomy_model`.
- En disco, **Cantu** emite schema v0.3 con `operational_status`/`project_summary` como
  **objetos anidados** y `"schema_version": "aiw.project_console_snapshot.v0.3"`; **aiw-console**
  emite v1 con esos campos como **strings** más `roadmap_tree` (`"model":
  "aiw_flat_objectives_v1"`) y `"schema_version": 1`. [VERIFICADO EN DISCO — inventario de
  forma] `cantu-studio/.aiw/views/project_console.snapshot.json` vs
  `aiw-console/.aiw/views/project_console.snapshot.json`. Son **familias de schema distintas**;
  el validador de Cantu exige claves de la v0.3 (Bloque C), no de la v1.

### B.5 Campos que alimentan la "tarjeta de portafolio del prototipo"

**Premisa:** no existe tarjeta de portafolio en el código (Hallazgo de premisa 3). Lo que
sigue mapea cada campo pedido a la fuente que HOY alimenta la vista single-project
equivalente (Overview v3 de Cantu), que es lo más cercano a lo que una tarjeta agregada
consumiría, o marca **[NO EXISTE]**.

| Campo pedido | Fuente (archivo · campo) | Estado |
|---|---|---|
| **Active Run** | `roadmap.json` (v3) → run con `status:"active"`, derivado en `renderOverviewV3`/`v3DeriveCurrent` `CANTU-PCJS:3527,3120` | Derivado en render desde `roadmap.json`. [VERIFICADO EN DISCO] |
| **Queue** | `roadmap.json` (v3) → grupos derivados por `v3QueueGroupKey`/`groupCounts` `CANTU-PCJS:3585` | Derivado en render; el proyector **no** persiste el grupo (schema-doc §6, `snapshot-schema-v1.md:148-153`). [VERIFICADO EN DISCO] |
| **Blocked** | `roadmap.json` → conteo de runs `status:"blocked"` (stat v3) `CANTU-PCJS:3175-3185,795` | Derivado en render. [VERIFICADO EN DISCO] |
| **Human Review** | grupo `needs_human_decision` / "Needs Human Decision", derivado en render `CANTU-PCJS:44-45,3585` | **[NO EXISTE campo persistido]** — "local UI state only and is never persisted into Roadmap or project data" `CANTU-PCJS:81-83`; se deriva de `status`+`depends_on`. |
| **conteos de roadmap** | `roadmap.json` → `v3ObjectiveStats`/`groupCounts` `CANTU-PCJS:842-843,3585` | Derivado en render. [VERIFICADO EN DISCO] |
| **Next Run** | `project_status.json:next_recommended_run_id` → si no, `snapshot.project_summary.next_recommended_run_id`; resuelto contra runs de `roadmap.json` `CANTU-PCJS:980-982` | Sale de `project_status.json` (fail-soft) o del snapshot. [VERIFICADO EN DISCO] |
| **Last Commit** | `git_history.snapshot.json` → `head`/`commits[0]` `snapshot-schema-v1.md:100`, consumido por `renderCommitHistory` (`CANTU-VALID:1780`) | Fail-soft; ausente → History vacío. [VERIFICADO EN DISCO] |

Nota agregación multi-proyecto: **[NO EXISTE]** hoy ninguna capa que agregue estos campos
de N proyectos en una tarjeta; el snapshot y el roadmap son **por-proyecto** y el server,
si se listan varios proyectos, "populate the same canonical file (last successful
projection wins; the console renders one project)" [VERIFICADO EN DISCO]
`aiw-console/docs/snapshot-schema-v1.md:139-141`.

### B.6 Docs: qué formato consume y por qué índice se descubren

- **Descubrimiento:** `.aiw/docs/docs_index.json`, un objeto con array `docs[]`; cada
  entrada trae `title`, `path`, `nav_tier`, `ia_bucket`, `default_visible`, etc. (sin campo
  `format` explícito; el formato se implica por la extensión del `path`). [VERIFICADO EN
  DISCO — inventario de forma] `cantu-studio/.aiw/docs/docs_index.json`. El frontend lo
  consume vía `PATHS.docsIndex` (`CANTU-PCJS:14`).
- **Formato que renderiza:** **Markdown local del repo**, con un renderer conservador
  "escape-first". El validador pinta el contrato: la Docs view "fetches and renders the real
  repository-local document body … with a conservative escape-first renderer, guards against
  remote/network fetches" `CANTU-VALID:1811-1816`, y exige las funciones
  `renderDocMarkdownLite`, `loadDocBody`, `renderDocBodyContent`, `isRepoLocalDocPath`
  (entre otras) `CANTU-VALID:1825`. El cuerpo se cachea en `docBodyCache`
  `CANTU-PCJS:2019`.
- **Acoplamiento adicional:** además del índice, el renderer trae un mapa **horneado**
  doc→categoría de "nueva era" con rutas de doc específicas de Cantu, p.ej.
  `"docs/START-HERE.md": "START HERE"`, `"docs/EDITOR-ARCHITECTURE.md": "ARCHITECTURE"`
  `CANTU-PCJS:2273-2298`. [VERIFICADO EN DISCO] (ver Bloque E).

---

## BLOQUE C — Anchors del validador, verbatim

Se audita **CANTU-VALID** (el validador vivo de la consola de referencia). Las diferencias
de CON-VALID se anotan en C.6. Todos los substrings se reproducen **verbatim**.

### C.1 Qué archivos lee cada validador

[VERIFICADO EN DISCO] CANTU-VALID lee (y por tanto **exige que existan**, ver C.4):

- `.aiw/project.json` `:153`, `.aiw/state/project_status.json` `:154`,
  `.aiw/state/component_status.json` `:155`, `.aiw/views/project_console.snapshot.json`
  `:156`, `.aiw/roadmap/roadmap.json` `:161`, `.aiw/state/events.jsonl` `:162`,
  `.aiw/ledgers/change_ledger.jsonl` `:163`, `.aiw/ledgers/git_provenance.jsonl` `:164`,
  `.aiw/docs/docs_index.json` `:165`, `.aiw/guardrails/no_claims.json` `:166`.
- Fuente de consola: `docs/project-console/assets/project-console.js` `:167`,
  `…/project-console.css` `:168`, `docs/project-console/index.html` `:1310`.
- History-builder: `tools/project-console/build-git-history-snapshot.mjs` `:1663`.
- Server: `tools/project-console/serve-project-console.mjs` `:1683`.
- `git_history.snapshot.json`: **condicional/opcional**, `gitHistoryPresent ? readJson(...)
  : null` `:1566` (no exige existencia).

**La premisa del ticket se confirma:** el validador SÍ impone substrings sobre el fuente de
la consola, sobre el constructor de historia y sobre el servidor. [VERIFICADO EN DISCO].

### C.2 Regla de frontera del rebanador (`functionSource`), verbatim

[VERIFICADO EN DISCO] `CANTU-VALID:144-151`:

```js
function functionSource(source, functionName) {
  const start = source.indexOf(`function ${functionName}`);
  if (start === -1) {
    return "";
  }
  const next = source.indexOf("\nfunction ", start + 1);
  return next === -1 ? source.slice(start) : source.slice(start, next);
}
```

Regla exacta de frontera: el cuerpo de una función se rebana desde la primera aparición del
literal `function <nombre>` hasta la siguiente aparición de `"\nfunction "` (salto de línea
seguido de `function ` al inicio de línea), o hasta el fin del archivo si no hay otra. Es
decir, la frontera es la siguiente **declaración `function` a nivel de línea**; funciones
anidadas o `arrow` internas no cortan. Si `function <nombre>` no existe, devuelve `""` (y
los checks sobre ese slice pasan por vacío).

### C.3 Lista COMPLETA de substrings — verbatim

Enumeración exhaustiva de los 56 checks de substring sobre fuentes (todos los
`.includes(...)`/`.indexOf(...)` cuyo receptor es un string de fuente), agrupados por
objetivo. Cada línea de check está citada. **R** = requerido (falla si falta), **P** =
prohibido (falla si aparece).

#### C.3.1 Sobre `project-console.js` (renderer)

- **R** estructuras del modelo operador `CANTU-VALID:1107-1114`:
  `"canonicalStatusFromAxes("`, `"runSecondaryMetadata("`, `"operatorRun("`,
  `"operatorBadge("`, `"operatorKindLabel("`, `"operatorQueueModel("`,
  `"renderStageStrip("`. (Re-checadas en `:1986`, `:1990`.)
- **P** `"Roadmap Map"` `CANTU-VALID:1103`.
- **P** en `overviewDisplayRenderer`: `"Recent Activity"`, `"Recent activity"`
  `CANTU-VALID:1134`.
- **R** labels de Overview en `overviewDisplayRenderer` `CANTU-VALID:1141-1148`:
  `"Current work"`, `"Current work item"`, `"Next up"`, `"Next action"`, `"Queue snapshot"`,
  `"Needs Human Decision"`, `"Pending runs"`.
- **R** estructura de Overview en `overviewRenderer` `CANTU-VALID:1156`: `"v3Model("`,
  `"data-v3-run"`, `'"Overview"'`, `"slice(0, 4)"`, `"v3QueueGroupKey("`.
- **R** labels del run drawer en `projectConsoleJs` `CANTU-VALID:1162-1169`:
  `"What will happen"`, `"Why it matters"`, `"What closes this run"`, `"Current stage"`,
  `"Blockers / dependencies"`, `"Next operator action"`, `"Technical details"`.
- **R** `"operator.kindLabel"` en `primaryRowRenderers` `CANTU-VALID:1176`.
- **P** `"runSecondaryMetadata("` en `primaryRowRenderers` `CANTU-VALID:1180`.
- **P** en `primaryRowRenderers` `CANTU-VALID:1184-1190`: `"Area:"`, `"Kind:"`,
  `"Certification state"`, `"certification_state"`, `"Not certified"`, `"not certified"`.
- **P** en `primaryRowRenderers` `CANTU-VALID:1198-1200`: `"operator.type"`,
  `"currentOperator.type"`, `"nextOperator.type"`.
- **P** en `primaryRowRenderers` `CANTU-VALID:1205-1214`: `"Web components"`,
  `"Project Console"`, `"Color System"`, `"Not certified"`, `"not certified"`,
  `"No Web certification"`, `"No Slide certification"`, `"Generator-safe"`, `"RULE_ONLY"`.
- **P** `"certification_state"` en `secondaryMetadataRenderer` `CANTU-VALID:1221`.
- **R** métricas de queue en `queueRenderer` `CANTU-VALID:1225-1230`: `"Now"`, `"Next"`,
  `"Blocked"`, `"Later"`, `"Total remaining"`.
- **R** `"Model stats"` en `queueRenderer` `CANTU-VALID:1237`; **R** `"Plan groups"`
  `CANTU-VALID:1255`.
- **R+orden** en `queueRenderer` (deben ir tras "Model stats") `CANTU-VALID:1242-1245`:
  `"Primary work items"`, `"Lifecycle stages"`, `"Technical records"`.
- **P** en `phaseRenderer` `CANTU-VALID:1259`: `"technical records"`, `"records</span>"`.
- **P** `"lifecycle_status"` en `operatorStatusRenderer` `CANTU-VALID:1263`.
- **R** `"renderRoadmapV2Draft("` `CANTU-VALID:1267`.
- **R** boundary v2 draft `CANTU-VALID:1271`: `"Draft preview"`, `"Not active"`,
  `"Legacy Roadmap"`.
- **P** wording v2 stale `CANTU-VALID:1280-1282`: `"No phase carries deliverables yet"`,
  `"Deliverables are not defined yet"`.
- **R** `"Deliverable"` en `rv2DraftDeliverableRow` `CANTU-VALID:1292`; **R**
  `"phase.deliverables"` en `rv2DraftPhaseBlock` `CANTU-VALID:1297`.
- **R** boundary familia v2 `CANTU-VALID:1301`: `"Candidate family"`,
  `"not instantiated executable runs"`.
- **R** funciones v3 (checadas como `function <nombre>(`) `CANTU-VALID:1360`:
  `renderRoadmapV3`, `renderRunQueueV3`, `v3OpenRunDetail`, `v3QueueGroupKey`,
  `v3QueueRowHtml`, `v3QueueRowCells`, `v3RoadmapRunRow`, `v3AttachHandlers`,
  `v3DeriveCurrent`, `v3ProgressTimeline`, `v3UpdateSubtabCounts`, `v3ObjectiveStats`,
  `v3PhaseRatio`, `v3StageText`, `v3ResultText`, `v3ProgressDisc`, `v3DetailCell`.
- **P** `"PROTOTYPE"`, `"NOT ACTIVE"` en los slices de los renderers v3 `CANTU-VALID:1365-1367`;
  **P** `"v3PrototypeStrip"` `CANTU-VALID:1373`.
- en `v3QueueRowHtml`: **R** `"run.queue_order"`, `"run.title"`, `"run.summary"`
  `CANTU-VALID:1382`; **P** `"run.status"`, `"run.full_description"`, `"run.depends_on"`,
  `"run.current_stage"`, `"run.closeout_result"`, `"run.progress"` `CANTU-VALID:1387`.
- **R** `"v3TerminalIcon("` en `v3RoadmapRunRow` `CANTU-VALID:1518`.
- **R** back-nav `CANTU-VALID:1523`: `"function v3BackRunDetail("`, `"let v3DetailStack"`,
  `"data-v3-back"`.
- **R** auto-refresh de History `CANTU-VALID:1672`: `"function refreshGitHistory("`,
  `"startHistoryAutoRefresh("`, `"historySnapshotMarker("`.
- **R** UI de edición de roadmap `CANTU-VALID:1717-1722`: `"function v3RenderRunEditor("`,
  `"function v3MountRunEditor("`, `"function v3EditPreview("`, `"function v3EditConfirm("`,
  y `roadmapEditRoute` (= `"/__project-console/roadmap/edit"`).
- **R** `"apply: false"` en `v3EditPreview` `CANTU-VALID:1733`; **R** `"apply: true"` en
  `v3EditConfirm` `CANTU-VALID:1737` (contrato dry-run→confirm).
- **R** superficie Run C `CANTU-VALID:1749-1755`: `"function v3OpenEditModal("`,
  `"function v3CloseEditModal("`, `"function v3RenderDepPicker("`,
  `"function v3RenderInsertForm("`, `"function v3EditEnrichMoveErrors("`,
  `"data-v3edit-open-run"`.
- **R** `'data-v3edit-op="move"'` en `v3RenderRunEditor` `CANTU-VALID:1763`.
- **R** sync manual `CANTU-VALID:1766`: `"/__project-console/history/sync"`, `"data-hist-sync"`,
  `"function manualSyncHistory("`.
- **R** History tab `CANTU-VALID:1780`: `"function renderCommitHistory("`,
  `"git_history.snapshot.json"`, `"data-hist-branch"`, `"v3-hist-run"`, `"v3-hist-branch"`,
  `"historyVisibleBranches"`. **P** en `renderCommitHistory`: `"historyItems("`,
  `"data.events"`, `"data.changeLedger"`, `"data.humanQa"`, `"data.aiReviews"`,
  `"data.gitProvenance"` `CANTU-VALID:1794`; **R** `'"History"'` `:1799`,
  `"historyVisibleBranches("` `:1802`; **P** `"Reads the local Git repository"` `:1806`.
- **R** funciones Docs (como `function <nombre>(`) `CANTU-VALID:1825`: `renderDocs`,
  `renderDocsNav`, `renderSelectedDoc`, `loadDocBody`, `renderDocBodyContent`,
  `renderDocMarkdownLite`, `isRepoLocalDocPath`, `deriveDocGroup`, `docGroupLabel`,
  `buildDocsNavTree`, `renderDocMetadataDetails`, `deriveDocNavTier`, `isDefaultVisibleDoc`.
- **R** en `renderDocsNav` `CANTU-VALID:1836`: `"buildDocsNavTree("`, `"docs-nav-group"`,
  `"docsEntriesForMode("`, `'data-docs-mode="primary"'`, `'data-docs-mode="all"'`.
- **R** `'docsVisibilityMode = "primary"'` `CANTU-VALID:1846`; **P** `'byId("docs-meta")'`
  `CANTU-VALID:1893`.
- **R** (contexto docs, `:684`) `"function deriveDocNavTier("`.

#### C.3.2 Sobre `index.html`

- **R** selección por defecto `CANTU-VALID:1311-1314`:
  `'class="tab active" type="button" data-tab="overview"'`,
  `'class="segment active" type="button" data-subview="v3queue"'`,
  `'id="roadmap-sub-v3queue" class="roadmap-subview active"'`.
- **R** anchors v3 `CANTU-VALID:1329-1333`: `'data-subview="v3queue">Run Queue<'`,
  `'data-subview="v3roadmap">Roadmap<'`, `'id="roadmap-sub-v3queue" class="roadmap-subview active"'`,
  `'id="roadmap-sub-v3roadmap" class="roadmap-subview"'`.
- **P** subviews retirados `CANTU-VALID:1339-1354`: `'data-subview="queue"'`,
  `'data-subview="map"'`, `'data-subview="v2draft"'`, `'data-subview="create"'`,
  `'id="roadmap-sub-queue"'`, `'id="roadmap-sub-map"'`, `'id="roadmap-sub-v2draft"'`,
  `'id="roadmap-sub-create"'`, `'id="run-queue"'`, `'id="roadmap-tree"'`,
  `'id="roadmap-v2-draft"'`, `'>Legacy Roadmap<'`, `'>Roadmap v2 Draft<'`,
  `'Roadmap v3 Prototype'`, `'Run Queue v3 Prototype'`.
- **R** `"data-roadmap-edit-toggle"` `CANTU-VALID:1714`; **R** `'id="edit-modal"'`
  `CANTU-VALID:1746`.
- **P** `'id="docs-meta"'` `CANTU-VALID:1896`.

#### C.3.3 Sobre `build-git-history-snapshot.mjs` (constructor de historia)

- **R** existencia del archivo (junto al server) `CANTU-VALID:1655-1657`:
  `"tools/project-console/build-git-history-snapshot.mjs"`,
  `"tools/project-console/serve-project-console.mjs"`.
- **R** anchors del builder `CANTU-VALID:1665`: `"jame.git_history_snapshot.v1"`,
  `"git_history.snapshot.json"`, **`"RUN-JAME-"`**, `"isHiddenHistoryBranch"`, `"backup/"`.
  (El `"RUN-JAME-"` es acoplamiento de identidad exigido; ver Bloque E.)

#### C.3.4 Sobre `serve-project-console.mjs` (servidor)

- **R** `"/__project-console/history/sync"` `CANTU-VALID:1685`; **R**
  `"buildGitHistorySnapshot"` `CANTU-VALID:1688`.
- **R** `"/__project-console/roadmap/edit"` `CANTU-VALID:1699`; **R**
  `"function handleRoadmapEdit("` `CANTU-VALID:1702`; **R** `"roadmap-plan.mjs"`
  `CANTU-VALID:1705`.

### C.4 Pregunta 1 — ¿El validador afirma la EXISTENCIA de rutas bajo `.aiw/**`?

**SÍ.** Los helpers `readJson`/`readJsonl`/`readText` hacen `fail("Missing …")` si el archivo
no existe [VERIFICADO EN DISCO] `CANTU-VALID:26-27,40-41,77-78`. Por tanto, cada ruta leída
en `:153-166` es una ruta cuya **ausencia pone el validador en rojo**. Lista de rutas
`.aiw/**` cuya existencia afirma CANTU-VALID:

1. `.aiw/project.json` (además exige `project_id === "jame_system_dual"`, `CANTU-VALID:609`)
2. `.aiw/state/project_status.json`
3. `.aiw/state/component_status.json`
4. `.aiw/views/project_console.snapshot.json`
5. `.aiw/roadmap/roadmap.json`
6. `.aiw/state/events.jsonl`
7. `.aiw/ledgers/change_ledger.jsonl`
8. `.aiw/ledgers/git_provenance.jsonl`
9. `.aiw/docs/docs_index.json`
10. `.aiw/guardrails/no_claims.json`

NO afirma existencia de: `component_status`… (sí, es #3), `humanQa`, `aiReviews`, `memory`,
`guardrails/project_guardrails.json`, ni `git_history.snapshot.json` (este último es
condicional, `CANTU-VALID:1566`). Es decir, esas rutas del PATHS del frontend **no** son
exigidas por el validador.

Implicaciones directas para las dos preguntas del ticket:
- **Crear una carpeta nueva de contrato (fuera de `.aiw/**`) es INVISIBLE para este
  validador**: no enumera ni referencia ninguna ruta fuera de las citadas; una carpeta nueva
  no dispararía ningún check.
- **El día que `.aiw/` se borre**, se pondrían en rojo exactamente las 10 rutas de arriba
  (más los checks de contenido que penden de ellas) — no las 4 fail-soft del frontend que el
  validador no lee.

### C.5 Pregunta 2 — ¿Afirma algo sobre archivos FUERA de `.aiw/**` y fuera del fuente de la consola?

**SÍ.** Fuera de `.aiw/**`:

- **Fuente de consola** (esperable): `project-console.js`, `.css`, `index.html`
  `CANTU-VALID:167,168,1310` — existencia + anchors.
- **History-builder y server**: exige que EXISTAN `tools/project-console/build-git-history-snapshot.mjs`
  y `tools/project-console/serve-project-console.mjs` `CANTU-VALID:1655-1661`, los lee
  (`:1663,:1683`) y les impone anchors (C.3.3, C.3.4).
- **Documentos del repo referenciados por `docs_index`**: para cada `doc` de `docsIndex.docs`
  exige `doc.path` y `fs.existsSync(path.join(root, doc.path))` `CANTU-VALID:645`; esos paths
  son documentos del repo (p.ej. `docs/…`, `CONSTITUCION.md`), **fuera de `.aiw/**`**. Si un
  doc listado no existe en disco, rojo.

### C.6 Divergencia de CON-VALID (el validador de aiw-console)

[VERIFICADO EN DISCO] CON-VALID conserva el mismo mecanismo (mismos helpers, mismo
`functionSource`, mismos anchors de consola/builder/server: `CON-VALID:2013` index.html,
`:2366` builder, `:2386` server) **pero además** lee y exige el modelo legacy:
`.aiw/roadmap/objectives.jsonl` `:181`, `phases.jsonl` `:182`, `runs.jsonl` `:183`,
`queue.json` `:184`, `roadmap_v2.json` `:185`, más `.aiw/ledgers/human_decisions.jsonl`
`:1793` y artefactos de migración `:2550-2551`. Consecuencia medida: CON-VALID exige la
existencia de ~15 archivos `.aiw/**` que **no existen** en `aiw-console/.aiw/` (que solo
tiene `roadmap/` y `views/`, ver Bloque D). Es decir, **el validador que viaja dentro de
aiw-console no pasa contra los propios datos de aiw-console**: es una copia vestigial que
afirma el layout de datos de Cantu, no el de aiw-console. Material para el Bloque F.1.

---

## BLOQUE D — Qué emite hoy cada repo

### D.1 Tabla de gap contra el contrato (Bloque B), por repo

Contrato = las rutas `.aiw/**` del PATHS (B.1). "✓" = existe con forma compatible; "≈" =
existe con forma divergente; "✗" = no existe. Formas [VERIFICADO EN DISCO — inventario de
forma], estructura de directorios [VERIFICADO EN DISCO de primera mano].

| Ruta del contrato | Cantu Studio | aiw-console | AIW (`aiw/`) | Gap principal |
|---|---|---|---|---|
| `views/project_console.snapshot.json` | ≈ v0.3 (objetos anidados) | ≈ v1 (strings + `roadmap_tree`) | ≈ v1 (copia stale del proyector, en `aiw/.aiw/`) | dos familias de schema; ver B.4 |
| `project.json` | ✓ (`project_id:"jame_system_dual"`) | ✗ | ✗ | aiw-console/AIW no lo emiten |
| `state/project_status.json` | ✓ | ✗ | ✗ | falta en ambos |
| `state/component_status.json` | ✓ (`projection_only`) | ✗ | ✗ | falta en ambos |
| `roadmap/roadmap.json` (v3) | ✓ (`jame.roadmap_v3.v0.2-progress`) | ≈ (sin `schema_version`; copia de entrega del proyector) | ✗ (AIW no tiene JSON de roadmap) | ver D.3 |
| `state/events.jsonl` | ✓ (heterogéneo por línea) | ✗ | ✗ | falta |
| `ledgers/change_ledger.jsonl` | ✓ | ✗ | ✗ | falta |
| `ledgers/git_provenance.jsonl` | ✓ | ✗ | ✗ | falta |
| `ledgers/human_qa.jsonl` | ✓ | ✗ | ✗ | falta |
| `ledgers/ai_reviews.jsonl` | ✓ | ✗ | ✗ | falta |
| `docs/docs_index.json` | ✓ (`docs[]`) | ✗ | ✗ | falta |
| `guardrails/project_guardrails.json` | ✓ | ✗ | ✗ | falta |
| `guardrails/no_claims.json` | ✓ | ✗ | ✗ | falta |
| `guardrails/project_memory.jsonl` | ✓ | ✗ | ✗ | falta |
| `views/git_history.snapshot.json` | ✓ (`jame.git_history_snapshot.v1`, `commit_total:771`) | ✓ (mismo schema, `commit_total:42`) | ✗ | único con schema idéntico entre Cantu/aiw-console |

Resumen de presencia [VERIFICADO EN DISCO — inventario de forma]: **Cantu** tiene los 15;
**aiw-console/.aiw/** solo tiene 3 (`views/project_console.snapshot.json`,
`roadmap/roadmap.json`, `views/git_history.snapshot.json`) porque su `.aiw/` no tiene
`state/`, `ledgers/`, `guardrails/`, `docs/` ni `project.json`; **AIW** tiene solo la copia
stale del snapshot en `aiw/.aiw/project_console.snapshot.json` (nada más bajo `aiw/.aiw/`).

### D.2 aiw-console/.aiw — qué emite el proyector

[VERIFICADO EN DISCO de primera mano] El proyector solo escribe bajo `.aiw/views/` y (por
el server) la copia de entrega `.aiw/roadmap/roadmap.json`: "Writes ONLY
`<project-root>/.aiw/views/project_console.snapshot.json` (atomic temp + rename)"
`CON-PROJ:12`, `SNAPSHOT_RELATIVE_PATH = join(".aiw","views","project_console.snapshot.json")`
`CON-PROJ:32`. Por eso `aiw-console/.aiw/` no tiene los 12 archivos de `state/ledgers/
guardrails/docs/project.json`.

### D.3 AIW (`aiw/`) — cobertura explícita

- **Dónde vive su roadmap y en qué formato.** [VERIFICADO EN DISCO] En **Markdown**:
  `aiw/roadmap_AIW_temp.md:1` "# AIW — Roadmap (temporal)"; se autodescribe como "Semilla del
  futuro `.aiw/roadmap/roadmap.json` (v3) … Hasta entonces, este archivo ES el estado
  estructurado de AIW" `:3-5`. Vocabulario `planned | active | completed | blocked` `:13`.
  Objetivos como headers `## O1 … O6` con token de estado inline. **No hay `roadmap.json` en
  ningún lado bajo `aiw/`** (los únicos JSON son `aiw/config.json`, `aiw/sandbox/package.json`
  y la copia stale `aiw/.aiw/project_console.snapshot.json`) [VERIFICADO EN DISCO —
  inventario].
- **Qué produce por run.** [VERIFICADO EN DISCO] Una **carpeta de evidencia por run** en
  `logs/<id>/` (`kernel.mjs:283` `const logDir = path.join(AIW, 'logs', id);`), donde `<id>`
  es el basename saneado del objetivo (`kernel.mjs:281`). Archivos escritos: `STAGE.txt`
  (timeline, `:91`), `preflight.txt` (`:326`), `objective.md` (`:337`),
  `round{N}_executor.md` (`:354`), `round{N}_tests.txt` (`:384`), `round{N}_reviewer.md`
  (`:402`), `proposed_followup.md` (`:437`), y **`summary.md`** (`:445`). El **resumen es
  Markdown**, no JSON (`kernel.mjs:445-448`, campos "Final state / Reason / Project / Branch /
  Rounds / push / …"). No se produce ningún manifiesto JSON por run; el único JSON que el
  kernel escribe es el lock transitorio (`:298`, borrado al cierre `:464`). [Citas de
  `kernel.mjs` provienen de la pasada de descubrimiento READ-ONLY; la estructura de
  `logs/<id>/` y `summary.md` es consistente con `aiw/CLAUDE.md` ("logs/ — evidencia por
  run").]
- **Config de proyectos y sus campos.** [VERIFICADO EN DISCO de primera mano]
  `aiw/config.json:1-18`: top-level `ntfy.url`, `timeouts_ms.{executor,reviewer,verification}`,
  y `projects` como **objeto keyed por id** (`sandbox`, `console`). Campos por proyecto:
  `path`, `base_branch`, `verification`, `push` (no hay `id`/`name`/`branch` interno; el id es
  la clave). `console.path` apunta a `…\projects\aiw-console` `:12`. **No lista cantu-studio.**
- **Qué hace el proyector con todo eso — hasta dónde llega, dónde se queda corto vs Bloque
  B.** [VERIFICADO EN DISCO] El proyector mapea (schema-doc §4, `snapshot-schema-v1.md:105-114`):
  `objectives/{pending,parked,processed}/*.md` → un `roadmap_tree` plano
  (`aiw_flat_objectives_v1`) y un `views/roadmap.json` v3-compatible; `logs/<id>/summary.md`
  → `latest_history_items`; `config.json` → `project.json` 1:1. **Se queda corto contra el
  Bloque B en:** no emite `state/*`, `ledgers/*`, `guardrails/*`, `docs/docs_index.json`, ni
  `project.json` bajo `.aiw/` de AIW (solo escribe `views/` del root objetivo, D.2); y la
  asociación de commits a runs del history-builder no aplica a AIW porque su regex es
  `RUN-JAME-…` mientras AIW usa ramas `aiw/<id>` y commits `aiw r<N>: <id>` (Bloque E, y
  schema-doc §4 lo anota como pendiente de parametrizar, `snapshot-schema-v1.md:110-112`).

---

## BLOQUE E — Acoplamientos de identidad, medidos

Convención de columnas: **ROMPE** = deja de funcionar / rojo; **DEGRADA** = funciona pero
pierde datos o cae a fallback; **COSMÉTICO** = solo texto/label. "Si ese repo no es Cantu"
se interpreta como: correr esta consola/tooling contra AIW u otro proyecto.

### E.1 Prefijos de run ID y regex del constructor de historia

- **Regex de extracción de run_id (history-builder), horneado a `RUN-JAME-`.**
  [VERIFICADO EN DISCO] `CANTU-BUILD:105`
  `const mentions = Array.from(new Set(text.match(/RUN-JAME-[A-Z0-9-]+[A-Z0-9]/g) || []));`
  **Archivo IDÉNTICO en ambos repos (md5), así que afecta a los dos en la misma línea.**
  → Si el repo no es Cantu: **DEGRADA** — los commits se listan pero ningún commit asocia
  `run_id` (History muestra historia sin vínculo a runs). No rompe el snapshot (el
  git-history es §3 opcional).
- **Segundo regex de strip en el renderer.** [VERIFICADO EN DISCO] `CANTU-PCJS:715`
  `.replace(/\bRUN-JAME-[A-Z0-9-]+/g, "project run");` (idéntico en `CON-PCJS:704`).
  → **COSMÉTICO/DEGRADA**: solo reemplaza ids `RUN-JAME-…` por "project run" en texto; ids de
  otro prefijo no se enmascaran.
- **Anchor del validador que exige el prefijo.** [VERIFICADO EN DISCO] `CANTU-VALID:1665`
  incluye `"RUN-JAME-"` en `requiredBuilderAnchor`. → Si se parametrizara el builder para
  quitar `RUN-JAME-`, **ROMPE el validador** (falla el anchor).

### E.2 IDs de run/objetivo/fase horneados en el renderer

- **Constantes de run del propio Project Console.** [VERIFICADO EN DISCO]
  `CANTU-PCJS:33` `PROJECT_CONSOLE_PARENT_RUN_ID = "RUN-JAME-PROJECT-CONSOLE-FULL-ROADMAP-QUEUE-REPAIR-003R1"`;
  `CANTU-PCJS:34-39` `PROJECT_CONSOLE_STAGE_IDS` con 4 ids `"RUN-JAME-PROJECT-CONSOLE-…"`
  (idéntico en `CON-PCJS:33-38`). Re-horneadas en el validador `CANTU-VALID:169-175`.
- **Mapa `RUN_OPERATOR_OVERRIDES` keyed por 12 run_id exactos** que inyectan copy de display
  por-run. [VERIFICADO EN DISCO] `CANTU-PCJS:248-311` (12 claves `"RUN-JAME-…"`, p.ej. `:249`,
  `:281`, `:311`); espejo en `CON-PCJS:237-300`.
- **Caso especial que sintetiza un stage id.** [VERIFICADO EN DISCO] `CANTU-PCJS:473-475`
  `if (runId === PROJECT_CONSOLE_PARENT_RUN_ID) { … run_id: \`${…}::implementation\` }`.
- **Provenance inline en el subview v2 draft.** [VERIFICADO EN DISCO] `CANTU-PCJS:1822-1823`
  (`"RUN-JAME-PROJECT-CONSOLE-ROADMAP-V2-…"`).
- No hay `objective_id`/`phase_id` string horneado: se leen del roadmap fetchado.
  → Efecto si el repo no es Cantu: **COSMÉTICO/DEGRADA** — estos ids simplemente no matchean
  ningún run del proyecto, así que los overrides de copy y el caso especial no se activan
  (el run se renderiza con su copy normal). No rompen.

### E.3 Rutas relativas horneadas

- **Tabla PATHS `../../.aiw/…`** [VERIFICADO EN DISCO] `CANTU-PCJS:2-20` (15 literales) +
  `historySync`/`roadmapEdit` `:23,:26`; `CON-PCJS:2-20` agrega 5 literales legacy `:6-10`.
  `repoHref` `CANTU-PCJS:972` y fetch de doc `CANTU-PCJS:2794` usan `../../${path}`.
- **Server / builder:** `CANTU-SERVE:30` `.git`, `:31` `/docs/project-console/index.html`,
  `:33` `/__project-console/history/sync`, `:38` `/__project-console/roadmap/edit`, `:39`
  `.aiw/roadmap/roadmap.json`, `:40` ruta del validador; `CANTU-BUILD:24-25` `OUT_PATH`/`ROADMAP_PATH`.
  → Efecto: son rutas **relativas al project root**, así que el mismo layout `.aiw/**` es el
  contrato que cualquier proyecto debe cumplir. Si el repo no cumple ese layout, **DEGRADA**
  (fail-soft) salvo el snapshot (**ROMPE** las vistas primarias). El `.aiw/` como prefijo
  está horneado en todas partes.

### E.4 Nombres de rama horneados

- **Cadena de fallback de rama, horneada a `jame-parallel-audit-001` → `main`.**
  [VERIFICADO EN DISCO] `CANTU-BUILD:166-169` (`: branches.includes("jame-parallel-audit-001")
  ? "jame-parallel-audit-001" : branches.includes("main") ? "main" : branches[0]`) — **archivo
  idéntico en ambos repos**. Espejo en el renderer `CANTU-PCJS:3714-3715` / `CON-PCJS:3179-3180`.
  Filtro `backup/` en `CANTU-BUILD:33`, renderer `CANTU-PCJS:3706`, validador
  `CANTU-VALID:1603-1610`.
  → Si el repo no es Cantu: **COSMÉTICO/DEGRADA** — si no existe `jame-parallel-audit-001`,
  cae a `main` y si no, a la primera rama visible; solo afecta qué tab de rama sale
  seleccionada por defecto. `main` recibe tint verde (`CANTU-PCJS:3751`). No hay literal
  `master`.

### E.5 Literales de nombre de proyecto

- **`"Cantu Studio"`** en comentarios del renderer: [VERIFICADO EN DISCO] `CANTU-PCJS:2023`,
  `:2245`. `cantu` (case-insensitive) = 23 hits en CANTU-PCJS, **0 en CON-PCJS**.
- **`RUN-CANTU-…`** ids de provenance (comentarios) en CANTU-PCJS, CANTU-SERVE y
  `CANTU-VALID:157,1692,1709,1740`. [VERIFICADO EN DISCO]
- **`"JAME Core"` / `jame_core`** (label + key de doc) en ambos renderers `CANTU-PCJS:2073` /
  `CON-PCJS:2055`. [VERIFICADO EN DISCO]
- **`"jame_system_dual"`** como `project_id` esperado — **en el validador** `CANTU-VALID:609`
  (`if (project.project_id !== "jame_system_dual")`). → **ROMPE el validador** si el
  `project.json` no dice `jame_system_dual`. [VERIFICADO EN DISCO]
- **Schemas con prefijo `jame.`**: `CANTU-BUILD:26` `"jame.git_history_snapshot.v1"`,
  `CANTU-VALID:963` `"jame.roadmap_v3.v0.2-progress"`. → El validador **ROMPE** si el schema
  no matchea. [VERIFICADO EN DISCO]
- Docs new-era map con rutas Cantu horneadas `CANTU-PCJS:2273-2298`. → **COSMÉTICO/DEGRADA**
  (categoriza; docs no listados caen a grupo por metadata).

### E.6 Contraste portante: el proyector es identidad-neutral

[VERIFICADO EN DISCO] `CON-PROJ` (el proyector) NO hornea `JAME`, `Cantu`, ni ids de run/
rama específicos. Deriva identidad genéricamente: `PROJECTOR_VERSION = "0.1.0"` /
`GENERATED_FROM = \`aiw-projector@${PROJECTOR_VERSION}\`` `CON-PROJ:30-31`; `readProjectId()`
lee `config.project_id` o slugifica el nombre de carpeta con fallback `"aiw_project"`
`CON-PROJ:391-399`; sentinela `"__pending_queue__"` `:52`. Es decir: **la identidad JAME está
horneada en el toolchain de cantu-studio + ambos renderers + ambas copias del history-builder;
el único componente genuinamente genérico y reusable es el proyector `project.mjs`.**

---

## BLOQUE F — Bifurcaciones abiertas

Se exponen con evidencia; **no se recomienda ninguna**. Enumerar opciones con evidencia no
es recomendar.

### F.1 ¿El validador viaja con la consola a aiw-console, o la consola global nace sin esa red?

Evidencia del Bloque C:
- El validador está **fuertemente acoplado a Cantu**: exige `project.json.project_id ===
  "jame_system_dual"` (`CANTU-VALID:609`), schema `jame.roadmap_v3.v0.2-progress` (`:963`),
  hornea los `RUN-JAME-PROJECT-CONSOLE-…` (`:169-175`) y exige `"RUN-JAME-"` en el builder
  (`:1665`).
- El validador que **ya viajó** a aiw-console (CON-VALID) **no pasa contra los datos de
  aiw-console**: exige ~15 archivos `.aiw/**` que aiw-console no tiene (C.6, Bloque D).
- El validador es también la **red de seguridad de los anchors** de UI/builder/server: sus
  ~56 substrings congelan la forma del renderer, del History tab, del endpoint de edición,
  etc. (C.3).

Rama "viaja con la consola": se gana la red de anchors (congela regressions de UI/endpoints);
se pierde/arrastra el acoplamiento a `jame_system_dual`/`RUN-JAME-`/schema `jame.`, que hoy
hace que falle contra cualquier proyecto que no sea Cantu (habría que reparametrizar los
puntos citados). Rama "nace sin esa red": se gana partir de un validador neutral (como el
proyector, E.6); se pierde la verificación estructural que hoy atrapa que el renderer o el
server pierdan un anchor. [Evidencia: C.3–C.6, E.1, E.5.]

### F.2 Convivencia de `.aiw` y la carpeta nueva en Cantu: canónica vs derivada

Qué escribe hoy en `.aiw` y por qué caminos [VERIFICADO EN DISCO]:
- El **proyector** escribe solo `.aiw/views/project_console.snapshot.json` (+ `views/roadmap.json`)
  atómico (`CON-PROJ:12,32,495-497`).
- El **server** en arranque corre el proyector por proyecto de `projects.config.json` y escribe
  el snapshot + copia de entrega `.aiw/roadmap/roadmap.json`, y regenera
  `.aiw/views/git_history.snapshot.json` (schema-doc §5, `snapshot-schema-v1.md:116-143`,
  y §"Delivery copy" `:202-216`).
- El **history-builder** escribe `.aiw/views/git_history.snapshot.json` (`CANTU-BUILD:24`).
- El **endpoint de edición** (server, vía `roadmap-plan.mjs`) escribe `.aiw/roadmap/roadmap.json`
  (canónico) (`CANTU-SERVE:39`, anchors C.3.4).
- El resto de `.aiw/**` de Cantu (`project.json`, `state/*`, `ledgers/*`, `guardrails/*`,
  `docs/*`) **no lo escribe ningún tool de la consola**: son fuentes que el frontend lee pero
  que se mantienen por fuera (no hay emisor entre los tools auditados).

Lecturas de bifurcación (sin resolver): quién es canónico. Hoy hay ya un patrón de
**canónico + derivado byte-idéntico** dentro de `.aiw`: `views/roadmap.json` es "the
canonical view … source of truth" y `roadmap/roadmap.json` es "a byte-identical **delivery
copy** … It exists only to satisfy the [frozen] reader" `snapshot-schema-v1.md:202-210`,
regenerada atómicamente por el server. Ese mismo mecanismo (una fuente canónica + una copia
regenerada por el server tras producir la canónica, fail-soft y contingente,
`snapshot-schema-v1.md:212-216`) es el único mecanismo de "no derivar" que hoy existe en el
código. Qué gana/pierde cada asignación (canónico=`.aiw` vs canónico=carpeta nueva) depende
de quién escribe cada archivo: los 12 archivos sin emisor (arriba) no tienen hoy regenerador
que los mantenga derivados. [Evidencia: D.1–D.2, `snapshot-schema-v1.md:195-216`.]

### F.3 El endpoint de escritura del roadmap: qué perdería Cantu el día del corte, y qué ya cubre el CLI

[VERIFICADO EN DISCO]
- El endpoint `/__project-console/roadmap/edit` vive en el **server** (`CANTU-SERVE:38`), con
  `handleRoadmapEdit` (anchor `CANTU-VALID:1702`) que **importa `roadmap-plan.mjs`** y "writes
  nothing but the canonical roadmap.json" (`CANTU-VALID:1692-1706`). La UI postea dry-run
  (`apply:false`) y luego confirm (`apply:true`) (`CANTU-VALID:1733,1737`; PATHS `roadmapEdit`
  `CANTU-PCJS:26`).
- El **CLI** `roadmap-edit.mjs` y el orquestador `roadmap-plan.mjs` viven en
  `cantu-studio/tools/roadmap/` (solo Cantu). El endpoint del server y el CLId comparten la
  **misma** orquestación `roadmap-plan.mjs` sobre `roadmap-core.mjs` (el anchor
  `"roadmap-plan.mjs"` en el server, `CANTU-VALID:1705`, prueba que el server no reimplementa
  lógica). [VERIFICADO EN DISCO de existencia: `cantu-studio/tools/roadmap/roadmap-{core,plan,edit}.mjs`.]

Lectura de bifurcación: dado que endpoint y CLI comparten `roadmap-plan.mjs`, lo que se
perdería el día del corte (si aiw-console/consola global se lleva la consola pero **no** el
tooling de roadmap, que hoy solo está en Cantu) es (a) el **endpoint** de escritura desde la
UI (que no existe en CON-PCJS/CON-SERVE — CON-PCJS ni siquiera tiene `roadmapEdit`, E.3) y
(b) la capacidad de editar el roadmap **desde el navegador** con el flujo dry-run→confirm. Lo
que **ya cubriría** el CLI: la misma escritura acotada de `roadmap.json` vía `roadmap-plan.mjs`
por línea de comandos, porque endpoint y CLI son la misma orquestación. Lo no cubierto por el
CLI: la superficie de edición en la UI (funciones `v3*Edit*`/modal, anchors C.3.1) y el propio
endpoint. [Evidencia: A.1, C.3.4, E.3, existencia de `tools/roadmap/*` solo en Cantu.]

---

## Apéndice — [REQUIERE OPERADOR]: comandos git necesarios

No se ejecutó git. Para cerrar el estado de rama/HEAD/limpieza (Bloque 0.4), el operador
debe correr, por repo (`aiw`, `projects/aiw-console`, `projects/cantu-studio`,
`projects/cantu-lessons`):

```
git -C <repo> rev-parse --abbrev-ref HEAD
git -C <repo> rev-parse HEAD
git -C <repo> status --porcelain
git -C <repo> branch --list
```

Además, la asociación real de commits→runs del History tab (Bloque E.1) y el `commit_total`
de cada `git_history.snapshot.json` dependen del estado git local; su frescura es
[REQUIERE OPERADOR] (el snapshot se regenera al correr el server, cosa que esta auditoría no
hizo).

---

## Estado de completitud de los bloques

- Bloque 0 — COMPLETO.
- Bloque A — COMPLETO.
- Bloque B — COMPLETO (con la marca de alcance de B.3 sobre cadenas por-panel).
- Bloque C — COMPLETO (56 checks de substring enumerados y citados; anchors verbatim).
- Bloque D — COMPLETO (tabla de gap de los 3 repos + cobertura AIW).
- Bloque E — COMPLETO.
- Bloque F — COMPLETO (opciones con evidencia, sin recomendación).

Ningún bloque quedó "NO ALCANZADO".
