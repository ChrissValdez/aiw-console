# MIGRACIÓN O0 — extracción del roadmap de Cantu a aiw-console

Estado: EJECUTADA, fechada **2026-07-24** (fecha leída del sistema, no asumida).
No es contrato ni decisión: registra una operación de datos de dos lados y su
verificación. No se ejecutó git en ninguna forma. No se tocó código, ni el emisor,
ni el validador, ni la consola.

**Operación.** Los 12 runs del objetivo O0 se extrajeron del roadmap canónico de
Cantu y estrenaron el roadmap propio de aiw-console. Operación atómica de dos
lados: ningún run existe en ambos ni en ninguno (verificado, §4).

**Archivos escritos:**

- **CREADO** `projects/aiw-console/roadmap/roadmap.json` — 1 objetivo, 12 runs,
  `schema_version: "roadmap_tree_v1"`.
- **EDITADO** `projects/cantu-studio/.aiw/roadmap/roadmap.json` — de 8 objetivos /
  65 runs a **7 objetivos / 53 runs**; `schema_version` intacto.

Alias de este record: **CANTU** = `projects/cantu-studio/.aiw/roadmap/roadmap.json`;
**CONSOLE** = `projects/aiw-console/roadmap/roadmap.json`.

---

## 1. Puerta previa — barrido de anchors: **PASA**

Pregunta: ¿algún `run_id` de O0 o el literal `"O0"` está horneado en código que
la consola ejecuta, de modo que sacar O0 cambie su comportamiento? **Respuesta:
NO. Cero anchors horneados.**

Barrido (read-only) sobre `validate-project-console-state.mjs`,
`docs/project-console/assets/project-console.js`,
`tools/project-console/build-git-history-snapshot.mjs`, y los árboles `tools/` y
`docs/` de `cantu-studio`. Los 12 `run_id` de O0 y el literal `"O0"` aparecen solo
en tres clases, ninguna de ellas lógica:

- **Comentarios de procedencia**, no ejecutables: validador
  `validate-project-console-state.mjs:798, :1321, :1454, :1692, :1709, :1740`;
  consola `docs/project-console/assets/project-console.js:41, :4354`; CSS
  `project-console.css:172, :2984, :4894`. Sacar O0 del roadmap no toca un
  comentario.
- **Archivos de datos / históricos / propuesta**, no código y no el roadmap vivo:
  `docs/archive/**`, `docs/_historical_run_record/**`, `docs/ops/NAMING_DISPOSITION_MAP.md`,
  y `docs/project-console/roadmap-delta-proposal-docs-corpus-curation.json` (una
  propuesta de delta que declara no editar el roadmap; nombra `"O0"` y un `run_id`
  en `depends_on`, pero es artefacto estático, no anchor de comportamiento).
- **Fixtures de test** sintéticos (`RUN-PLAIN-001`, `RUN-A1-001`, …), que no son
  ids de O0.

Prueba dura de ausencia de lógica horneada, medida de primera mano:

- **Cero** literales `"O0"` / `'O0'` en cualquier `.mjs`/`.js` del repo.
- Todas las comparaciones `objective_id === …` comparan contra una **variable**
  (`objectiveId`, `id`, `t.id`, `target.id`) — nunca contra un id literal
  (`roadmap-core.mjs:98, :816, :1099`; `project-console.js:4544, :4680, :5011`).
  La consola deriva los objetivos genéricamente del dato canónico.
- El history-builder (`build-git-history-snapshot.mjs`) lee el roadmap
  **read-only** para verificar asociaciones run↔commit (`:12`), sin `run_id` ni
  `objective_id` horneado.

Conclusión: quitar O0 del roadmap no altera ninguna rama de la consola, del
validador ni del builder.

---

## 2. Por qué el destino cambió respecto del encargo

El encargo original nombraba `projects/aiw-console/.aiw/roadmap/roadmap.json` como
destino a "estrenar". **Ese path estaba ocupado y no es estado propio de
aiw-console:** contiene la **copia de entrega del proyector de AIW** —16 runs que
describen el proyecto `aiw` (`005-roadmap-contract-fix`, … `HUMAN_REVIEW-*`), con
`generated_from: "aiw-projector@0.1.0"`—. Esa copia la produce el **server**, no
una mano: `MEDICION-PROYECTOR §5.a` (tabla, fila 4) la identifica como
`<repo>/.aiw/roadmap/roadmap.json | el server (copia de entrega) | SERVE:71
(deliverTo), SERVE:13, :21-22`, y el run `006-roadmap-delivery-path` del propio
roadmap de AIW existe precisamente para entregarla a esa ruta (la que el lector
congelado fetcha, `pc.js:11`).

Sobrescribirla habría sido: (a) **autorreversible** —la siguiente corrida de
`serve-project-console.mjs` la regenera con los 16 runs de AIW—; (b) **contra el
contrato** —§2/§18: nada escrito a mano vive en un path con emisor—; (c)
**destructivo** de la proyección de AIW mientras tanto.

**Hallazgo registrado (decisión del operador):** en aiw-console, **`.aiw/` es el
área de la proyección de AIW, no estado propio de aiw-console**. Ningún path bajo
`.aiw/` sirve para el roadmap propio, aunque esté libre. Por eso el roadmap propio
se estrena **fuera de `.aiw/`**, en `projects/aiw-console/roadmap/roadmap.json`.

**Puerta previa del destino nuevo:** `projects/aiw-console/roadmap/` **no existía**
antes de esta operación (verificado). Se creó para alojar el archivo.

---

## 3. Tabla de remap recalculada — 12/53 (los 65 runs, ninguno omitido)

Renumeración densa por `queue_order` ascendente, preservando el orden relativo, en
cada lado por separado. `run_id` intactos carácter por carácter; el único campo que
cambia es `queue_order`.

### 3.a aiw-console — CONSOLE (12 runs, `queue_order` 1..12)

| nuevo | viejo | fase | status | run_id |
|---:|---:|---|---|---|
| 1 | 1 | O0.P1 | completed | RUN-JAME-PROJECT-CONSOLE-FOUNDATION-001 |
| 2 | 2 | O0.P2 | completed | RUN-JAME-ROADMAP-V3-DESIGN-001 |
| 3 | 4 | O0.P2 | completed | RUN-JAME-PROJECT-CONSOLE-ROADMAP-V3-PROTOTYPE-001 |
| 4 | 5 | O0.P3 | completed | RUN-CANTU-ROADMAP-CONTENT-AUDIT-001 |
| 5 | 6 | O0.P3 | completed | RUN-JAME-ROADMAP-MAINTENANCE-HELPER-001 |
| 6 | 7 | O0.P3 | completed | RUN-CANTU-PROJECT-CONSOLE-ROADMAP-EDITING-001 |
| 7 | 8 | O0.P3 | completed | RUN-CANTU-DEV-LAUNCHERS-001 |
| 8 | 9 | O0.P3 | completed | RUN-CANTU-ROADMAP-EDITOR-USABILITY-001 |
| 9 | 10 | O0.P3 | completed | RUN-CANTU-ROADMAP-CLOSE-ACTIVE-RUN-001 |
| 10 | 11 | O0.P3 | **active** | RUN-CANTU-PROJECT-CONSOLE-LATENT-DEFECTS-001 |
| 11 | 12 | O0.P3 | planned | RUN-CANTU-ROADMAP-PHASE-OBJECTIVE-OPS-001 |
| 12 | 61 | O0.P3 | planned | RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001 |

Composición: O0.P1 (1 run), O0.P2 (2), O0.P3 (9). Prefijos: `RUN-JAME-` 4,
`RUN-CANTU-` 8 — mixtos, que es lo correcto (§10.d Regla 1.a: el prefijo es
procedencia). Un run lleva `progress`: `RUN-JAME-PROJECT-CONSOLE-ROADMAP-V3-PROTOTYPE-001`
(preservado íntegro).

### 3.b cantu-studio — CANTU (53 runs, `queue_order` 1..53)

| nuevo | viejo | obj | fase | status | run_id |
|---:|---:|---|---|---|---|
| 1 | 3 | O5 | O5.P1 | completed | RUN-JAME-SMART-FORMULA-FIELD-RULE-ONLY-BASELINE-001 |
| 2 | 13 | O2 | O2.P2 | planned | RUN-JAME-DOCUMENTATION-CANONICAL-MODEL-001 |
| 3 | 14 | O2 | O2.P2 | planned | RUN-JAME-COMPONENT-DOC-SINGLE-SOURCE-CONTRACT-001 |
| 4 | 15 | O2 | O2.P4 | planned | RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 |
| 5 | 16 | O2 | O2.P4 | planned | RUN-CANTU-NAMING-AUDIT-DISPOSITION-001 |
| 6 | 17 | O2 | O2.P5 | planned | RUN-CANTU-REPO-RENAME-001 |
| 7 | 18 | O5 | O5.P5 | planned | RUN-JAME-COLOR-PALETTE-COMPATIBILITY-CONTRACT-001 |
| 8 | 19 | O5 | O5.P7 | planned | RUN-JAME-MATH-FORMULA-COMPATIBILITY-CONTRACT-001 |
| 9 | 20 | O5 | O5.P6 | planned | RUN-JAME-WEB-COMPONENT-CONTRACT-STANDARDIZATION-001 |
| 10 | 21 | O5 | O5.P1 | planned | RUN-JAME-VIRTUAL-KEYBOARD-KATEX-COMPATIBILITY-001 |
| 11 | 22 | O1 | O1.P1 | planned | RUN-JAME-WEB-COMPONENT-BASELINE-RECONCILIATION-001 |
| 12 | 23 | O1 | O1.P1B | planned | RUN-JAME-WEB-COLUMNS-REVALIDATION-001 |
| 13 | 24 | O1 | O1.P1C | planned | RUN-JAME-WEB-HEADER-REVALIDATION-001 |
| 14 | 25 | O1 | O1.P1C | planned | RUN-JAME-WEB-LIST-REVALIDATION-001 |
| 15 | 26 | O1 | O1.P1C | planned | RUN-JAME-WEB-ICONLIST-REVALIDATION-001 |
| 16 | 27 | O1 | O1.P1C | planned | RUN-JAME-WEB-CARD-REVALIDATION-001 |
| 17 | 28 | O1 | O1.P1C | planned | RUN-JAME-WEB-VIDEO-REVALIDATION-001 |
| 18 | 29 | O1 | O1.P1C | planned | RUN-JAME-WEB-NARRATIVE-REPAIR-001 |
| 19 | 30 | O1 | O1.P1C | planned | RUN-JAME-WEB-CALLOUT-REPAIR-001 |
| 20 | 31 | O1 | O1.P1C | planned | RUN-JAME-WEB-DETAILS-REPAIR-001 |
| 21 | 32 | O1 | O1.P2 | planned | RUN-JAME-WEB-ARITHMETIC-AUDIT-AND-REPAIR-001 |
| 22 | 33 | O1 | O1.P2 | planned | RUN-JAME-RULE-COMPONENT-REPAIR-AND-ACTIVATION-001 |
| 23 | 34 | O1 | O1.P1C | planned | RUN-JAME-WEB-SPLIT-SCOPE-AND-REPAIR-001 |
| 24 | 35 | O1 | O1.P1C | planned | RUN-JAME-WEB-TABLE-AUDIT-AND-REPAIR-001 |
| 25 | 36 | O1 | O1.P2 | planned | RUN-JAME-WEB-CONCEPTGRID-AUDIT-AND-REPAIR-001 |
| 26 | 37 | O1 | O1.P2 | planned | RUN-JAME-WEB-HIERARCHY-AUDIT-AND-REPAIR-001 |
| 27 | 38 | O1 | O1.P2 | planned | RUN-JAME-WEB-TIMELINE-AUDIT-AND-REPAIR-001 |
| 28 | 39 | O1 | O1.P1C | planned | RUN-JAME-WEB-VISUAL-AUDIT-AND-REPAIR-001 |
| 29 | 40 | O1 | O1.P4 | planned | RUN-JAME-WEB-READINESS-EVIDENCE-001 |
| 30 | 41 | O5 | O5.P2 | completed | RUN-JAME-MATHLIVE-INTEGRATION-READINESS-001 |
| 31 | 42 | O5 | O5.P3 | planned | RUN-JAME-FORMULA-INSERTER-INTEGRATION-001 |
| 32 | 43 | O3 | O3.P1 | planned | RUN-CANTU-SLIDE-GRID-SYSTEM-001 |
| 33 | 44 | O3 | O3.P1 | planned | RUN-JAME-SLIDE-ARCHITECTURE-BASELINE-001 |
| 34 | 45 | O3 | O3.P2 | planned | RUN-JAME-SLIDE-SANDBOX-PARITY-001 |
| 35 | 46 | O3 | O3.P2 | planned | RUN-CANTU-SLIDE-COMPONENT-GUIDE-001 |
| 36 | 47 | O3 | O3.P3 | planned | RUN-JAME-SLIDE-BOUNDED-RUN-PLAN-001 |
| 37 | 48 | O3 | O3.P3 | planned | RUN-JAME-SLIDE-FIRST-BOUNDED-COMPONENT-BATCH-001 |
| 38 | 49 | O3 | O3.P4 | planned | RUN-JAME-SLIDE-READINESS-EVIDENCE-001 |
| 39 | 50 | O4 | O4.P5 | planned | RUN-JAME-AUTHORING-WORKSPACE-UX-AUDIT-001 |
| 40 | 51 | O6 | O6.P1 | planned | RUN-JAME-HTML-PAYLOAD-MEASUREMENT-001 |
| 41 | 52 | O6 | O6.P2 | planned | RUN-JAME-ASSET-REGISTRY-DESIGN-001 |
| 42 | 53 | O6 | O6.P3 | planned | RUN-JAME-CTX-ASSETS-CONTRACT-001 |
| 43 | 54 | O6 | O6.P4 | planned | RUN-JAME-RENDERER-ASSET-INTEGRATION-001 |
| 44 | 55 | O6 | O6.P4 | planned | RUN-JAME-ASSET-DEDUP-EQUIVALENCE-VALIDATION-001 |
| 45 | 56 | O7 | O7.P1 | planned | RUN-JAME-PRODUCTION-LESSON-VALIDATION-001 |
| 46 | 57 | O7 | O7.P2 | planned | RUN-JAME-PRODUCTION-EXPORT-FLOW-001 |
| 47 | 58 | O7 | O7.P3 | planned | RUN-JAME-HOSTING-DEPLOYMENT-PLAN-001 |
| 48 | 59 | O2 | O2.P3 | planned | RUN-JAME-PROJECT-CONSOLE-DOCS-V3-001 |
| 49 | 60 | O2 | O2.P1 | planned | RUN-CANTU-DOCUMENTATION-DEEP-AUDIT-001 |
| 50 | 62 | O2 | O2.P5 | planned | RUN-CANTU-INTERNAL-CODE-RENAME-001 |
| 51 | 63 | O2 | O2.P5 | planned | RUN-CANTU-DOCS-DIRECTORY-RENAME-001 |
| 52 | 64 | O2 | O2.P5 | planned | RUN-CANTU-RUNTIME-JAME-CLASS-RENAME-001 |
| 53 | 65 | O2 | O2.P5 | planned | RUN-CANTU-RUNTIME-J-NAMESPACE-RENAME-001 |

Total remap: **12 + 53 = 65 filas, ninguna omitida.**

---

## 4. Verificación posterior — números medidos sobre los archivos escritos

Medido re-leyendo CONSOLE y CANTU de disco tras escribir.

**Conservación.**

- 53 + 12 = **65**. ✓
- Unión de ids después = **65**; conjunto antes = 65. **Diferencia vacía en ambos
  sentidos**: perdidos 0, ganados 0. ✓
- Runs en ambos archivos (overlap): **0**. ✓
- Duplicados dentro de cada archivo: **0** (Cantu), **0** (console). ✓

**Integridad de campos.** Comparando cada campo de cada uno de los 65 runs antes y
después, con `queue_order` excluido: runs con alguna otra diferencia = **0**.
Cero cambios en `run_id`, `status`, `depends_on`, `title`, `summary`,
`full_description`, `closeout_result`, `progress`. ✓

**`queue_order`.** CONSOLE denso, único y contiguo **1..12**; CANTU denso, único y
contiguo **1..53**. ✓

**`depends_on`.**

- CANTU: **exactamente 1** referencia que no resuelve localmente —la externa
  legítima (§5)—. Ninguna otra. ✓
- CONSOLE: **0** referencias sin resolver. ✓

**Parseo y estructura.** Ambos JSON parsean. CANTU conserva **7 objetivos**
(O2, O5, O1, O4, O3, O6, O7) y `schema_version: "jame.roadmap_v3.v0.2-progress"`
intacto (`CANTU-VALID:963` lo exige exacto), `roadmap_id`/`title` intactos. CONSOLE
tiene **1 objetivo** (O0), root con las 4 claves `schema_version`, `roadmap_id`,
`title`, `objectives`; objetivo con 3 claves; fase con 3 claves; run con las 9
documentadas (8 base + `progress` en 1). ✓

**Derivación (§12).**

- CONSOLE — **O0 → `active`** (rama 1: tiene el único run `active`,
  `RUN-CANTU-PROJECT-CONSOLE-LATENT-DEFECTS-001`). ✓
- CANTU — deriva por objetivo: **O2 `planned`, O5 `in_progress`, O1 `planned`,
  O4 `planned`, O3 `planned`, O6 `planned`, O7 `planned`**. Cantu queda con
  **0 runs `active`** (el único vivía en O0). ✓

**Identidad de los 12 `run_id`.** Los 12 ids están en CONSOLE **carácter por
carácter** idénticos a los originales. ✓

---

## 5. La arista externa — primer ejemplar real de la Regla 2 (§10.d)

La única arista que cruza la frontera de O0 es **entrante**, así que vive del lado
de Cantu y **se conservó tal cual** —no se borró, no se tradujo, no se marcó—:

    RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001  (CANTU, O2.P4, queue_order 4)
        depends_on → RUN-CANTU-ROADMAP-CONTENT-AUDIT-001  (ahora en CONSOLE, O0.P3, queue_order 4)

Tras la extracción, esa entrada **deja de resolver localmente** en el roadmap de
Cantu y pasa a ser una **dependencia EXTERNA, que es LEGAL** (§10.d, Regla 2). Es
el primer ejemplar real de la regla: una entrada de `depends_on` que apunta a un
run que hoy vive en otro proyecto. El destino existe (en CONSOLE), así que no es
colgante; un consumidor que cargue ambos proyectos la resuelve globalmente (Regla
3). Medida: es la **única** no-resuelta de Cantu (§4).

---

## 6. Alcance tocado y no tocado

- **Escrito:** CONSOLE (creado), CANTU (editado), este record.
- **Creado:** el directorio `projects/aiw-console/roadmap/` (no existía).
- **No tocado:** código, emisor (`project.mjs`, `serve-project-console.mjs`),
  validador, consola; `CONTRATO.md`, `DECISIONES.md`, ningún record existente;
  nada bajo `.aiw/` de aiw-console (incluida la copia de entrega de AIW, intacta);
  `.project/` (no existe y no se creó). No se levantó la consola ni el validador.
  **No se ejecutó git en ninguna forma.**

Criterio de borrado: N/A — registro de una operación ejecutada.
