# MEDICION-FUENTES-CONSOLA — Qué datos tiene HOY aiw-console para una consola idéntica a la de Cantu

> Medición READ-ONLY. Ningún archivo fuera de este record fue creado, modificado ni
> borrado. No se ejecutó git en ninguna forma. No se levantó ningún server, proyector,
> validador ni consola. No se emitió ni regeneró ningún snapshot.
>
> Fecha: 2026-07-24. Único archivo escrito:
> `context/aiw-console/records/MEDICION-FUENTES-CONSOLA.md` (este).
>
> Qué mide: los DATOS disponibles en disco de `projects/aiw-console`, fuente por
> fuente, contra lo que cada pestaña de la consola local de Cantu consume. No re-mide
> el código ni el acoplamiento de identidad (eso es Phase 0,
> `records/AUDIT-CONSOLE-O4-PHASE0.md`, aquí **AUDIT**). Es el insumo del reorden
> (D-048) y del emisor (`O4.P2`).

## Leyenda de evidencia

- **[VERIFICADO EN DISCO]** — leído de primera mano en esta sesión; lleva cita `ruta:línea`.
- **[VERIFICADO EN DISCO — inventario]** — claves/conteos extraídos del archivo real con una
  pasada de lectura (node/find/md5), no línea a línea.
- **[DEL AUDIT]** — hecho tomado del AUDIT como mapa, no re-medido aquí (así lo pide el encargo).

Rutas relativas a `C:\Users\chris\Documents\AIW_Workspace`. Abreviaturas heredadas del AUDIT:
**CANTU-PCJS** = `projects/cantu-studio/docs/project-console/assets/project-console.js`;
**CANTU-HTML** = `projects/cantu-studio/docs/project-console/index.html`;
**CON-PCJS** = `projects/aiw-console/docs/project-console/assets/project-console.js`;
**CON-SERVE** = `projects/aiw-console/tools/project-console/serve-project-console.mjs`;
**CON-PROJ** = `projects/aiw-console/tools/projector/project.mjs`.

---

## BLOQUE A — Las pestañas de la consola de Cantu y qué lee cada una

### A.1 Las pestañas, verificadas en el HTML real

[VERIFICADO EN DISCO] `CANTU-HTML:13-17` — la consola tiene **exactamente 5 pestañas**:

| Pestaña | `data-tab` | Dónde está lo demás que el ticket nombra |
|---|---|---|
| Overview | `overview` (activa por defecto) | — |
| Roadmap | `roadmap` | **la "Cola" NO es pestaña**: es el subview `Run Queue` (`data-subview="v3queue"`, activo por defecto) junto al subview `Roadmap` (`v3roadmap`) — `CANTU-HTML:51-52` |
| History | `history` | — |
| Docs | `docs` | nav + reader (`CANTU-HTML:89-96`) |
| Status | `status` | **"Governance" NO es pestaña**: es la sección `Governance State` (`#status-governance`, activa por defecto) dentro de Status, junto a `Console Diagnostics` (`#status-diagnostics`) — `CANTU-HTML:101-102,106,136` |

No existe pestaña "Governance" ni pestaña "Cola" separadas. El conjunto a portar es:
Overview, Roadmap (con 2 subviews), History, Docs, Status (con 2 secciones).

### A.2 Mecánica de carga: una requerida, 14 fail-soft (confirma AUDIT B.2)

[VERIFICADO EN DISCO] `CANTU-PCJS:5558-5609` (`loadData`): la única ruta con
`required=true` es el snapshot (`:5559`); las otras 14 van fail-soft (`:5576-5589`).
Si el snapshot falla, `init()` cae al fallback y las vistas primarias se reemplazan
por estados vacíos (`:5623-5628`). La tabla PATHS con las 15 rutas + 2 endpoints se
releyó verbatim: `CANTU-PCJS:1-27`. Coincide 1:1 con AUDIT B.1.

### A.3 Fuente → pestaña, distinguiendo superficie VIVA de código dormido

Refinamiento medido sobre AUDIT B.3: `renderAll` (`CANTU-PCJS:4088-4134`) llama
exactamente a `renderOverviewV3`, `renderRoadmapV3`, `renderRunQueueV3`,
`renderCommitHistory`, `renderDocs`, `renderGovernance`, `renderSources`. Los
renderers legacy quedan en el fuente pero **dormidos** — lo dicen sus propios
comentarios (`:4089-4090` "the legacy renderOverview stays in source, dormant";
`:4106-4107` "the retired mixed operational feed (renderHistory/historyItems) stays
in source, dormant") y lo confirma la búsqueda de llamadores: `renderHistory` se
define en `:1979` y **nadie la llama**; `currentRun`/`nextRun` (`:976,:981`) solo se
llaman desde la dormida `renderOverview` (`:1067,:1076`). [VERIFICADO EN DISCO]

Consumo VIVO por pestaña (todo [VERIFICADO EN DISCO]):

| Pestaña / sección | Render vivo | Fuente(s) que pintan píxeles | Cita |
|---|---|---|---|
| Overview | `renderOverviewV3` | `roadmap/roadmap.json` vía `v3Model` (deriva activo/next/upcoming del propio roadmap) | `:3527-3541`, gate en `:3071-3073` |
| Roadmap → Run Queue (la Cola) | `renderRunQueueV3` | `roadmap/roadmap.json` | `:3915`, `:4101-4105` |
| Roadmap → Roadmap | `renderRoadmapV3` | `roadmap/roadmap.json` | `:3464`, `:4096-4100` |
| History | `renderCommitHistory` | `views/git_history.snapshot.json` — **gate de schema en render**: exige `schema === "jame.git_history_snapshot.v1"` | `:3719-3723` |
| Docs | `renderDocs` | `docs/docs_index.json` (`docsIndex.docs`) + fetch del cuerpo `.md` local por entrada | `:2390-2407` |
| Status → Governance State | `renderGovernance` | `guardrails/project_guardrails.json` (tabla `guardrails[]`, `:2953`) y `guardrails/no_claims.json` (tabla `claims[]`, `:2959`); la tabla "Review & Approval Policy" es HTML estático | `:2889-2959` |
| Status → Console Diagnostics | `renderSources` | meta (loadedSources/failedSources) + conteos: objetivos v3 (`:3044`), docs indexados (`:3052`), `component_status.components` (`:3053`), `git_provenance` length (`:3054`) | `:3013-3054` |
| (todas) | compuerta | `views/project_console.snapshot.json` — requerido; sin él, fallback total | `:5559,:5623-5628` |

Y el reverso, que es lo que decide cuánto cuesta cada fuente ausente
[VERIFICADO EN DISCO]:

- **Sin ninguna superficie viva** (solo alimentan código dormido y/o el banner
  agregado de fuentes opcionales): `project.json` (único consumo `:1064`, dentro de
  la dormida `renderOverview`), `state/project_status.json` (`:976,:981,:1574` —
  todos en funciones dormidas), `state/events.jsonl`, `ledgers/change_ledger.jsonl`,
  `ledgers/human_qa.jsonl`, `ledgers/ai_reviews.jsonl` (los cuatro solo en
  `historyItems` `:995-1036`, cuyo único llamador es la huérfana `renderHistory`
  `:1980`), y `guardrails/project_memory.jsonl` (**cero consumidores en todo el
  renderer** — solo se fetchea y se devuelve, `:17,:5588,:5606`).
- **Solo un conteo en Diagnostics**: `state/component_status.json` (`:3053`) y
  `ledgers/git_provenance.jsonl` (`:3054`).
- **Contenido del snapshot**: todos sus consumidores de campos (`:976,:981,:1036,
  :1066-1073`) viven en funciones dormidas. En la consola viva el snapshot requerido
  funciona como **compuerta pura**: su presencia abre la consola, su contenido no
  pinta ningún píxel vivo.

Consecuencia medida: de las 15 rutas, las que pintan contenido vivo son **6**:
snapshot (compuerta), roadmap (3 vistas), git_history (History), docs_index (Docs),
project_guardrails y no_claims (Governance). Las otras 9 solo evitan el banner
agregado y/o llenan conteos de Diagnostics.

---

## BLOQUE B — Las 15 rutas del contrato, EN DISCO DE AIW-CONSOLE

### B.1 Lo que hay: 4 archivos, y de quién son

[VERIFICADO EN DISCO] `projects/aiw-console/.aiw/**` contiene exactamente 4 archivos
(los cuatro con mtime 2026-07-22 15:38 local, consistente con el `generated_at`
2026-07-22T21:38Z de sus contenidos — una sola corrida del server):

| Archivo | Bytes | Contenido observado |
|---|---|---|
| `.aiw/views/project_console.snapshot.json` | 6 282 | `schema_version: 1`, **`project_id: "aiw"`**, `generated_from: "aiw-projector@0.1.0"`, `roadmap_tree.model: "aiw_flat_objectives_v1"` con los 16 objetivos de AIW, `latest_history_items` apuntando a `logs/<id>/summary.md` de AIW |
| `.aiw/views/roadmap.json` | 28 035 | vista v3-compatible con los objetivos de AIW ("16 AIW objectives") |
| `.aiw/roadmap/roadmap.json` | 28 035 | **byte-idéntica** a la anterior (md5 `08b9d813d6e3ee31aee464eb02294b61` ambas) — el patrón canónica + copia de entrega |
| `.aiw/views/git_history.snapshot.json` | 19 302 | `schema: "jame.git_history_snapshot.v1"`, `commit_total: 42`, `current_branch: "main"`, ramas `main` + 5 `aiw/<id>`, commits "aiw r1: …" / merges del proyector — **historia del propio repo aiw-console** |

### B.2 La tabla: estado por ruta

Estados: **PRESENTE** / **AUSENTE** / **PRESENTE-PERO-OTRA-FORMA** (existe en la ruta
que el frontend fetchea, pero con forma y/o dueño distintos de lo que "la consola de
aiw-console" necesitaría). Emisor: **(a)** lo regenera un tool, **(b)** estático sin
emisor, **(c)** no existe. [VERIFICADO EN DISCO] salvo donde se marca.

| # | Ruta (PATHS) | Estado en `aiw-console/.aiw/` | Forma observada | Emisor |
|---|---|---|---|---|
| 1 | `views/project_console.snapshot.json` | **PRESENTE-PERO-OTRA-FORMA/OTRO DUEÑO** | snapshot v1 (strings + `roadmap_tree`) — familia distinta del v0.3 de Cantu (AUDIT B.4) — y con **datos del proyecto AIW**, no de aiw-console | **(a)** proyector, invocado por el server en arranque (`CON-SERVE:224-231`; `CON-PROJ:12,32` vía AUDIT) |
| 2 | `project.json` | **AUSENTE** | — (forma de referencia en Cantu: claves `schema_version, project_id, display_name, instance_id, mode, …`; `project_id: "jame_system_dual"`) | **(c)** |
| 3 | `state/project_status.json` | **AUSENTE** | — (Cantu: ~30 claves, `next_recommended_run_id` etc.) | **(c)** |
| 4 | `state/component_status.json` | **AUSENTE** | — (Cantu: `projection_only`, `components[]`) | **(c)** |
| 5 | `roadmap/roadmap.json` | **PRESENTE-PERO-OTRO-DUEÑO** | copia de entrega de la proyección de AIW (B.1); NO es el roadmap del proyecto aiw-console | **(a)** server (`deliverTo`, `CON-SERVE:71,239-247`) |
| 6 | `state/events.jsonl` | **AUSENTE** | — (Cantu: 38 líneas; `event_id, event_type, project_id, summary, …`) | **(c)** |
| 7 | `ledgers/change_ledger.jsonl` | **AUSENTE** | — (Cantu: 28 líneas) | **(c)** |
| 8 | `ledgers/git_provenance.jsonl` | **AUSENTE** | — (Cantu: 9 líneas) | **(c)** |
| 9 | `ledgers/human_qa.jsonl` | **AUSENTE** | — (Cantu: 4 líneas) | **(c)** |
| 10 | `ledgers/ai_reviews.jsonl` | **AUSENTE** | — (Cantu: 4 líneas) | **(c)** |
| 11 | `docs/docs_index.json` | **AUSENTE** (no existe en NINGUNA ruta del repo — glob `**/docs_index.json` = 0) | — (forma esperada: Bloque C) | **(c)** |
| 12 | `guardrails/project_guardrails.json` | **AUSENTE** | — (Cantu: `{schema_version, project_id, guardrails[]}`) | **(c)** |
| 13 | `guardrails/no_claims.json` | **AUSENTE** | — (Cantu: `{schema_version, project_id, claims[]}`) | **(c)** |
| 14 | `guardrails/project_memory.jsonl` | **AUSENTE** | — (Cantu: 6 líneas) | **(c)** |
| 15 | `views/git_history.snapshot.json` | **PRESENTE** | mismo schema que Cantu (`jame.git_history_snapshot.v1`); 42 commits **del propio repo aiw-console** | **(a)** history-builder, regenerado por el server (arranque + watch de `.git` + endpoint sync; `CON-SERVE:115,306,390-394`) |

(La 16ª pieza en disco, `views/roadmap.json`, no es ruta de PATHS: es la canónica del
patrón canónica+copia, emisor el proyector — `CON-SERVE:56-73`.)

### B.3 La confirmación de los 3 con emisor y los 12 sin emisor (CONTRATO §18.a)

- **Los 3 con emisor del CONTRATO §18.a existen y son exactamente los 4 archivos de
  B.1** (3 rutas de contrato + la canónica). Sus emisores están en disco:
  `tools/projector/project.mjs`, `tools/project-console/build-git-history-snapshot.mjs`,
  `tools/project-console/serve-project-console.mjs` [VERIFICADO EN DISCO — árbol de
  `tools/`]. El server declara y cumple su frontera: "Mutates ONLY this repo's .aiw/"
  (`CON-SERVE:20-22`).
- **Los 12 sin emisor: en aiw-console la categoría (b) "estático sin emisor" está
  VACÍA.** En Cantu los 12 existen como archivos mantenidos a mano; en aiw-console
  **ninguno de los 12 existe siquiera como archivo estático** — son todos categoría
  **(c)**. No hay `state/`, `ledgers/`, `guardrails/` ni `docs/` bajo su `.aiw/`.
- En Cantu, de referencia, los 15 del contrato están todos en disco
  [VERIFICADO EN DISCO — árbol de `cantu-studio/.aiw/`: 25 archivos, los 15 del
  contrato + extras (`ledgers/human_decisions.jsonl`, 5 `docs/*.json` más, 4
  artefactos legacy de `roadmap/`)]. Nota lateral: Cantu NO tiene
  `views/roadmap.json` — su canónico editable es `roadmap/roadmap.json` directo.

---

## BLOQUE C — DOCS, medido

- **Índice:** `docs_index.json` **NO existe** para aiw-console — ni bajo `.aiw/docs/`
  ni en ninguna otra ruta del repo (glob de todo el repo = 0 hits). [VERIFICADO EN DISCO]
- **Forma que la consola espera** [VERIFICADO EN DISCO — inventario de
  `cantu-studio/.aiw/docs/docs_index.json`]: objeto con `schema_version, project_id,
  …, nav_tier_model` y **`docs[]`** (140 entradas en Cantu); cada entrada:
  `title, path, nav_tier, default_visible, audience, freshness, freshness_status,
  source_role, canonicality, related_*, last_update_source, last_reconciled_by_run,
  notes, ia_bucket`. El renderer consume `docsIndex.docs` y, por entrada, fetchea el
  cuerpo `.md` local del repo (`CANTU-PCJS:2390-2407`; mecanismo AUDIT B.6). Sin
  índice: "No docs index could be loaded." (`CANTU-PCJS:2395-2397`).
- **Cuerpos:** el corpus `.md` de aiw-console **SÍ existe**: 23 documentos reales
  [VERIFICADO EN DISCO — find]: `README.md`, `console/README.md`,
  `docs/snapshot-schema-v1.md`, y 20 bajo `context/` (CONTRATO.md, DECISIONES.md,
  MIGRATION-REPORT.md, README.md, 10 records, 4 de `context/aiw/`, 1 de
  `context/cantu-studio/`, 1 handoff). (+15 `.md` de fixtures bajo `tests/`, que no
  son documentación.) Es decir: **hay qué indexar; no hay índice.**
- Restricción heredada: el validador de Cantu exige que cada `doc.path` del índice
  exista en disco (AUDIT C.5, `CANTU-VALID:645` [DEL AUDIT]). Un índice para
  aiw-console debe referenciar paths reales del repo.

---

## BLOQUE D — ¿De quién es el `.aiw/` de aiw-console? (la advertencia del handoff, medida)

**CONFIRMADO, con una excepción medida.** El `.aiw/` de aiw-console NO es estado del
proyecto aiw-console:

1. **El mecanismo lo dice y lo hace.** `projects.config.json:1-4` apunta el único
   proyecto a `../../aiw`. El server, en arranque, corre el proyector por cada
   proyecto de esa config y escribe las vistas resultantes **en el `.aiw/` de este
   repo** (`CON-SERVE:9-14` comentario; `:44,:47` REPO_ROOT/VIEWS_DIR; `:224-231`
   escribe con `writeView(viewsDir,…)`; `:239-247` la copia de entrega). El proyector
   además **no puede** escribir fuera de un `.aiw/`: `resolveInsideAiw` lanza
   (`CON-PROJ:475-483`, releído verbatim).
2. **El contenido lo confirma.** Los 3 archivos de proyección llevan datos de AIW:
   `project_id: "aiw"`, 16 objetivos de AIW (`005-roadmap-contract-fix`,
   `APPROVED-000-sandbox-suma`, …), historia de runs apuntando a `logs/` de AIW
   (B.1). Nada en ellos describe al proyecto aiw-console.
3. **La excepción:** `views/git_history.snapshot.json` SÍ contiene datos de
   aiw-console — pero del **repo** (42 commits, ramas de trabajo `aiw/<id>` que el
   kernel creó ahí, merges del proyector), no del proyecto como plan/estado. Es el
   subproducto de que el history-builder corre sobre el repo donde vive
   (`CON-SERVE:115`).
4. **El eco en AIW:** `aiw/.aiw/` contiene solo `project_console.snapshot.json`
   (2 727 bytes, mtime 2026-07-10) — la copia stale que el AUDIT ya anotó; el área
   de entrega vigente es la de aiw-console. [VERIFICADO EN DISCO]

**Consecuencia directa para el emisor (P2):** "emitir las fuentes de aiw-console" NO
puede leer de `aiw-console/.aiw/` — ahí no hay origen del proyecto aiw-console. El
origen propio vive fuera de `.aiw/` (Bloque E). La simetría con Cantu no existe:
allá `.aiw/` sí es del proyecto (Bloque B.3, referencia).

---

## BLOQUE E — Las fuentes PROPIAS de aiw-console que sí existen en disco

[VERIFICADO EN DISCO] fuera de `.aiw/`, el proyecto aiw-console tiene hoy:

- **Su roadmap real: `roadmap/roadmap.json`** — `schema_version: "roadmap_tree_v1"`,
  título "AIW Console Roadmap", **2 objetivos** (O0 con 12 runs, O4 con 18), **30
  runs**, `queue_order` 1..30 denso, claves por run: `run_id, queue_order, title,
  summary, full_description, status, depends_on, closeout_result`; estados
  `completed | active | planned`. Mtime 2026-07-24 (vivo; los `.aiw/` datan del 22).
  Dos datos de compatibilidad medidos en el lector de Cantu:
  - el **lector vivo NO valida schema**: `v3Model` solo exige
    `roadmap.objectives[]` anidado con `phases[].runs[]` (`CANTU-PCJS:3071-3087`) —
    `roadmap_tree_v1` tiene exactamente esa forma;
  - el **validador** sí exige el literal `jame.roadmap_v3.v0.2-progress`
    (AUDIT C, `CANTU-VALID:963` [DEL AUDIT]) — validador ≠ consola;
  - los runs de `roadmap_tree_v1` no traen `current_stage` ni `progress`, que las
    celdas v3 de Cantu leen (AUDIT C.3.1): esas celdas caerían a su fallback, no
    rompen la vista.
- **Su historia git:** el repo tiene `.git/` y el history-builder ya la emite (el
  snapshot de 42 commits de B.1 ES esta fuente, ya materializada). La asociación
  commit↔run degrada por el regex `RUN-JAME-` (AUDIT E.1): los commits del kernel
  ("aiw r1: …") salen con `run_id: null` — visto en el snapshot real.
- **Su corpus de docs:** los 23 `.md` del Bloque C. Sin índice.
- **Su identidad mínima:** `package.json:2` `"name": "aiw-console"` (la descripción
  `:6` sigue diciendo "verbatim fork", ya sabido falso — AUDIT A.4). No hay
  `config.json` en la raíz.
- **Su material histórico-de-gobernanza en prosa:** `context/DECISIONES.md`,
  `context/aiw-console/CONTRATO.md`, 10 records — material que PODRÍA alimentar
  ledgers/guardrails/eventos, pero es prosa Markdown, no datos estructurados.

Y lo que NO existe, medido porque el proyector lo necesitaría como entrada
[VERIFICADO EN DISCO — ls raíz]: aiw-console **no tiene `objectives/` ni `logs/` ni
`config.json`** — el layout que `buildSnapshot` lee de un project root (AUDIT D.3:
`objectives/{pending,parked,processed}/*.md` → árbol; `logs/<id>/summary.md` →
historia). **El proyector actual no puede proyectar a aiw-console como proyecto**:
su entrada no existe aquí; su roadmap propio vive en otro formato
(`roadmap_tree_v1`) que el proyector no lee.

Observación lateral, fechada, sin adjudicar: el prototipo `console/` existe en disco
(mtime 2026-07-24 14:18-14:23) y es read-only estricto — "NO corre el proyector…
NO escribe NADA en disco"; sirve `roadmap/roadmap.json` crudo en `/data/roadmap.json`
(`console/serve.mjs:1-31`). En el roadmap, `RUN-CONSOLE-PROTOTIPO-CONSOLA-001`
(O4.P10) aparece aún `planned` — trabajo en vuelo o roadmap por actualizar; esta
medición solo deja constancia de ambos hechos.

---

## BLOQUE F — VEREDICTO

### F.1 Los tres escenarios de "consola idéntica" hoy, tal cual el disco los daría

1. **Levantar la consola de Cantu tal cual sobre aiw-console HOY** (PATHS
   `../../.aiw/**` del repo servidor): la consola **abre** — el snapshot requerido
   existe — pero muestra **el proyecto AIW** (Overview/Roadmap/Cola desde la
   proyección de AIW) mezclado con la **historia git del repo aiw-console** en
   History, Docs vacío, Governance vacío. Identidad mezclada: es la consola de la
   proyección, no la de aiw-console.
2. **Apuntarla a los datos PROPIOS de aiw-console sin emisor nuevo:** no hay
   snapshot propio → la compuerta requerida falla → **fallback total en todas las
   pestañas** (`CANTU-PCJS:5623-5628`). Único matiz: si además se entregara
   `roadmap/roadmap.json` propio donde PATHS lo espera, seguiría sin renderizar:
   sin snapshot no hay render primario.
3. **Con el emisor (P2) emitiendo snapshot propio + roadmap propio + historia:** las
   tres vistas de contenido principal (Overview, Roadmap/Cola, History) tienen
   origen de datos REAL hoy; Docs y Governance nacen vacías hasta crear sus fuentes
   (F.3).

### F.2 Veredicto por fuente: emitir vs crear

**YA EMITIBLES — hay origen en disco y emisor existente o adaptable:**

| Fuente | Origen HOY en disco | Qué falta para emitirla como "de aiw-console" |
|---|---|---|
| `roadmap` (alimenta Overview + Cola + Roadmap) | `roadmap/roadmap.json` (`roadmap_tree_v1`, 2 obj/30 runs, VIVO) | solo entrega/ruteo: el lector vivo ya traga la forma anidada; el emisor debe LEER este archivo (no `.aiw/`) y decidir destino (`.project/` — bloqueado hoy por `resolveInsideAiw`, `CON-PROJ:475-483`) |
| `git_history` (History) | `.git/` del repo; snapshot de 42 commits ya materializado | ya se emite solo (server/builder); pendientes conocidos: renombrar el id `jame.git_history_snapshot.v1` (CONTRATO §19) recordando que el render vivo hace gate de ese literal (`CANTU-PCJS:3723`), y la asociación run↔commit degrada por `RUN-JAME-` (AUDIT E.1) |
| `snapshot` (la compuerta requerida) | origen PARCIAL: todo lo que un snapshot v1 transporta puede derivarse de `roadmap/roadmap.json` + `package.json`; la entrada que el proyector actual lee (`objectives/`+`logs/`+`config.json`) NO existe en aiw-console | **adaptación del emisor**: derivar el snapshot desde `roadmap_tree_v1` (nueva derivación en P2) o crear el layout de entrada — decisión de P2; el proyector como está no puede proyectar aiw-console (Bloque E) |

**HAY QUE CREAR desde cero — no existe origen estructurado en aiw-console** (los 12
de CONTRATO §18.a, confirmados categoría (c) en B.2/B.3). Con su costo real medido
en la consola viva (A.3):

| Fuente a crear | ¿Qué pierde la consola idéntica mientras no exista? |
|---|---|
| `docs/docs_index.json` | la pestaña **Docs entera** (el corpus de 23 `.md` ya existe; falta el índice — candidato natural a emisor-generador + curaduría de `nav_tier`/`default_visible`) |
| `guardrails/project_guardrails.json` | la tabla Project Guardrails de Governance (Status) |
| `guardrails/no_claims.json` | la tabla Claims Not Allowed Yet de Governance (Status) |
| `project.json` | **nada vivo** (solo código dormido + banner); el validador de Cantu sí lo exige (AUDIT C.4) — pero validador ≠ consola |
| `state/project_status.json` | **nada vivo** (consumidores dormidos) |
| `state/component_status.json` | un conteo en Diagnostics |
| `ledgers/git_provenance.jsonl` | un conteo en Diagnostics |
| `state/events.jsonl`, `ledgers/change_ledger.jsonl`, `ledgers/human_qa.jsonl`, `ledgers/ai_reviews.jsonl` | **nada vivo** (solo el feed retirado/dormido) |
| `guardrails/project_memory.jsonl` | **nada, ni dormido** (cero consumidores en el renderer) |

**Lectura para D-048:** de los 12 sin emisor, solo **3** compran píxeles vivos
(docs_index, project_guardrails, no_claims). Los otros **9** solo silencian el banner
de fuentes opcionales y llenan 2 conteos de Diagnostics. Priorizar emisores por
superficie viva reordena el trabajo: snapshot+roadmap+git_history (F.2 arriba) dan
las 3 vistas de contenido; docs_index+guardrails+no_claims completan las 5 pestañas;
los 9 restantes son deuda de paridad-con-Cantu, no de consola funcional.

### F.3 Pestañas que nacerían vacías (consola idéntica sobre datos propios, con P2 emitiendo lo emitible)

| Pestaña | Al nacer |
|---|---|
| Overview | **CON CONTENIDO** (roadmap propio) |
| Roadmap → Run Queue / Roadmap | **CON CONTENIDO** (30 runs reales; celdas `current_stage`/`progress` en fallback) |
| History | **CON CONTENIDO** (42 commits propios; run_id sin asociar) |
| Docs | **VACÍA** — "No docs index could be loaded." hasta que exista `docs_index.json` |
| Status → Governance State | **VACÍA en datos** (sus 2 tablas de fuentes) — la tabla de política, estática, sí pinta |
| Status → Console Diagnostics | pinta siempre (es meta), reportando las fuentes ausentes como failed y conteos en 0 |

### F.4 Insumo directo para el emisor (P2)

Lo que esta medición fija para `RUN-CONSOLE-EMISOR-CARPETA-PROPIA-001`:

1. El origen del snapshot/roadmap propio es `roadmap/roadmap.json`
   (`roadmap_tree_v1`) — no `.aiw/` (que es de AIW, Bloque D) y no
   `objectives/`+`logs/` (no existen, Bloque E).
2. `resolveInsideAiw` (`CON-PROJ:475-483`) sigue siendo el candado de la ruta de
   emisión — sin tocarlo no se escribe `.project/` (ya localizado por el handoff;
   esta medición lo releyó verbatim).
3. El history-builder ya emite la fuente de History correcta para aiw-console; el
   rename del schema id arrastra el gate de render (`CANTU-PCJS:3723`) — emisor y
   consola nueva deben moverse juntos en ese literal.
4. Docs es el único caso "corpus sin índice": crear el índice es crear LA fuente;
   los cuerpos ya están.
5. Guardrails/no_claims/ledgers/state: no hay origen estructurado — cada uno entra
   por la puerta normal del CONTRATO (§18.b) el día que tenga emisor; su ausencia
   solo cuesta píxeles en Governance (2 tablas) y conteos.

---

## Estado de completitud

- Bloque A (pestañas + fuente→pestaña, vivo vs dormido) — COMPLETO.
- Bloque B (15 rutas en disco de aiw-console, con emisor a/b/c) — COMPLETO.
- Bloque C (Docs: índice/corpus/forma) — COMPLETO.
- Bloque D (dueño del `.aiw/`, con la excepción git_history) — COMPLETO.
- Bloque E (fuentes propias existentes y entradas faltantes del proyector) — COMPLETO.
- Bloque F (veredicto: emitir vs crear vs pestañas vacías; insumo D-048/P2) — COMPLETO.

Ningún bloque quedó "NO ALCANZADO". No se escribió nada fuera de este record.
