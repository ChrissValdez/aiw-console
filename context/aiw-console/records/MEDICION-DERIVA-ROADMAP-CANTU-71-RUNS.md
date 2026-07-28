# MEDICIÓN DE DERIVA ROADMAP↔DISCO DE CANTU — LOS 71 RUNS, UNO A UNO

> Encargo de taller de **medición pura** sobre `cantu-studio`. Barre los 71 runs del canónico
> (`.aiw/roadmap/roadmap.json`) y clasifica, run por run y contra el texto verbatim de cada uno,
> cuánto de su entregable ya existe en disco.
>
> Fecha: 2026-07-28. **Git no se usó en ninguna forma** — ni lectura ni escritura de comandos git;
> la única traza de git leída fue el archivo `.aiw/views/git_history.snapshot.json`, que es un
> artefacto en disco. No se levantó ningún servidor. No se corrió ninguna suite, ni de `cantu-studio`
> ni de `aiw-console`. No se corrió el validador. No se re-emitió `.project/`. No se tocó ningún
> status, texto, orden, dependencia ni `barrier` del roadmap. **No se escribió un solo byte en
> `cantu-studio`** (verificado por doble huella del árbol, Bloque F).
>
> **Archivos escritos por este encargo, y ninguno más:**
>
> | Repo | Archivo | Qué |
> |---|---|---|
> | `aiw-console` | `context/aiw-console/records/MEDICION-DERIVA-ROADMAP-CANTU-71-RUNS.md` | este record — **la única escritura de la sesión** |
>
> Todo lo demás que la sesión produjo (extracción de los 71 runs, huellas del árbol antes/después)
> vive en el scratchpad, fuera de los tres repos.

---

## BLOQUE A — MÉTODO, Y LOS LÍMITES QUE TIENE

### A.1 De dónde sale el texto de cada run

De `cantu-studio/.aiw/roadmap/roadmap.json` (81 319 bytes, mtime **2026-07-28 03:06:53**), recorrido
`objectives[] → phases[] → runs[]` y ordenado por `queue_order`. Resultado: **71 runs, `queue_order`
1..71, sin huecos ni duplicados**. Cada run se juzgó contra sus tres campos de texto (`title`,
`summary`, `full_description`) leídos íntegros, no contra su `run_id` ni contra su título solo.

Dos hechos del canónico que conviene fijar antes de leer la tabla:

- **`lane` está ausente en 48 de los 71 runs.** El schema declara `DEVELOPMENT` como
  `"default": true`, así que esos 48 son DEVELOPMENT por defecto y los 23 restantes llevan
  `DOCUMENTATION` explícito. En la tabla se marcan `DEV`\* los que heredan el default.
- **Los `status` cambiaron entre el q3 y este encargo.** El record de q3 declaró el canónico con
  mtime `2026-07-27 23:36:30`; hoy tiene mtime `2026-07-28 03:06:53` y **q2 figura ya `completed`**.
  Hoy el reparto es `completed: 3` (q1, q2, q48) y `planned: 68`. La semilla del encargo decía que
  q2 estaba `planned`; el operador lo cerró en el intervalo. Se mide sobre el estado de hoy.

### A.2 Qué se recorrió en disco

Árbol completo de `cantu-studio`: **21 322 archivos** (excluido `.git/`, que es churn y no entregable).
Incluye `docs/` entero con `docs/archive/`, `.aiw/`, `.project/`, `src/`, `tools/` (con
`node_modules/` y `dist/` en el conteo pero fuera del juicio), `QA/`, `prompts/`, y los archivos de
raíz. Contexto leído además: los records de q2 y q3 en `aiw-console` y los dos documentos que
produjeron.

### A.3 Una advertencia de método sobre los `mtime`

**El `mtime` de casi todo `docs/archive/` es `2026-07-22 19:01:55`** — un evento de sistema de
archivos masivo (reorganización/checkout), no la fecha de autoría. Los mismos segundos aparecen en
177 720 bytes de dossier y en 2 276 bytes de packet. Donde importa la antigüedad real, la fecha se
tomó de la **cabecera del propio documento** y se dice de dónde sale. Los `mtime` de la tabla son
fieles a disco; su lectura como "fecha de creación" sería falsa y aquí no se hace.

### A.4 Las dos reglas que separan `PRESENTE Y ANTERIOR` de `PARCIAL`

Treinta y cuatro de los 71 runs son dos familias casi idénticas (17 revalidaciones de componente y
17 doc-runs). Para no repartir el mismo veredicto por corazonada, se fijó el criterio antes de
clasificar:

- **`PRESENTE Y ANTERIOR`** — el texto del run está sustancialmente satisfecho por algo que existe,
  pero ese algo es previo a un contrato, a la reorganización documental o a una decisión que lo
  afecta. Necesita refresco, no producción.
- **`PARCIAL`** — una parte nombrada del texto está satisfecha y otra parte nombrada no lo está.
  Se dice cuál es cada una.

Cuando ambas caben, manda la que describe mejor **qué trabajo queda**: si queda verificar, es
ANTERIOR; si queda producir, es PARCIAL.

---

## BLOQUE B — LA TABLA: LOS 71 RUNS POR `queue_order`

`DEV`\* = carril DEVELOPMENT heredado del default (campo `lane` ausente). Los `mtime` van
`YYYY-MM-DD HH:MM`. Las referencias `[F1]`..`[F4]` remiten a los bloques de familia (Bloque C),
donde vive el detalle de qué parte del texto satisface cada puntero.

| q | Título | Carril | Status | Clasificación | Puntero (ruta · mtime · qué satisface) |
|---:|---|---|---|---|---|
| 1 | Establish the Smart Formula Field RULE_ONLY baseline | DEV\* | completed | **PRESENTE Y CONFORME** | `.aiw/ledgers/human_qa.jsonl` · 2026-07-22 19:01 · entrada `human-qa-smart-formula-field-case-h` → `QA_RECONCILED_SMART_FORMULA_FIELD_RULE_ONLY_NOT_CERTIFIED` = el «completed Human QA result»; `tools/author-lite/compiler-api/tests/mathAuthoringSmartFormulaFieldContractStability.test.mjs` · 2026-06-24 23:16 · congela el contrato; `mathAuthoringSmartFormulaField.test.mjs` · 2026-06-24 19:04 · `KEYBOARD_LAYOUT_BY_INDEX` (:20), `resolveActiveKeyboardLayoutKey` (:29), menú MathLive-nativo y control único de teclado (:400) = «keyboard profiles, drawer-height alignment, menu curation» |
| 2 | Define the canonical documentation model, IA, and cadence | DOC | completed | **PRESENTE Y CONFORME** | `docs/docs_management/DOCUMENTATION-CANONICAL-MODEL.md` · 2026-07-28 02:06 · 8 882 B · las 8 clases de documento, frescura, cadencia, metadata de índice, reglas de reconciliación e IA Docs/Governance/Sources; registrado en `.aiw/docs/docs_index.json` |
| 3 | Define the component-doc single-source contract | DOC | **planned** | **PRESENTE Y CONFORME** | `docs/docs_management/COMPONENT-DOC-SINGLE-SOURCE-CONTRACT.md` · 2026-07-28 02:48 · 8 548 B · packet canónico único, los dos consumidores nombrados, modelo preferido como future work; registrado en el índice. **Entregable completo con el run en `planned`** |
| 4 | Update the operating methodology to roadmap-first ordering | DEV\* | planned | **SIN EVIDENCIA** | `AGENTS.md` · 2026-07-27 22:36 · **cero ocurrencias de la cadena `roadmap`** en 24 041 B (verificado por grep sobre el archivo entero); sigue mandando a `docs/author-lite/NEXT_STEPS.md` como lectura obligatoria (:155) y lo declara vigente (:93). `generate_prompt_context.js` · 2026-07-22 19:01 · :167 sigue listando `NEXT_STEPS.md` bajo `DOCS_AUTHOR_LITE_DIR`, sin roadmap. Ninguna de las tres superficies nombra el canónico |
| 5 | Freeze the naming disposition map and exclusion list | DEV\* | planned | **PARCIAL** | Satisfecho: el mapa existe — `docs/archive/ops/NAMING_DISPOSITION_MAP.md` · 2026-07-22 19:01 · 36 877 B · define la lista de exclusión. **No satisfecho:** (a) el run lo ubica en `docs/ops/NAMING_DISPOSITION_MAP.md`, ruta que **no existe** (`docs/ops/` está vacío); (b) su propia cabecera dice `**Status:** ANALYSIS ONLY` y escaneó otra raíz (`JAME_Parallel_Workspace\JAME_System_Dual`) y otra rama; (c) **no existe la decisión de adopción/congelación**, que es el entregable: `.aiw/ledgers/human_decisions.jsonl` · 2026-07-22 19:01 · tiene 3 decisiones (2026-07-02/03/04), ninguna sobre naming |
| 6 | Rename the repository folder and update its cosmetic references | DEV\* | planned | **PARCIAL** | Satisfecho: la carpeta ya es `cantu-studio` (raíz del repo medida); el *file-tree label* cosmético ya dice `cantu-studio/` — `generate_prompt_context.js` · 2026-07-22 19:01 · :500 y :507; el *launcher error string* ya está actualizado — `tools/dev/start-editor.ps1` · 2026-07-22 19:01 · :29 «cantu-lessons is expected as a sibling of cantu-studio»; `.aiw/views/git_history.snapshot.json` · 2026-07-27 14:21 · :117 registra el commit «chore(rename): JAME_System_Dual -> cantu-studio». **No satisfecho:** la prosa — `docs/operations/OPERATIONS-STATE.md` · 2026-07-22 19:01 · :31 sigue declarando «Primary repo `…\JAME_Parallel_Workspace\JAME_System_Dual`» en un doc canónico vivo. Además se ejecutó **antes que su dependencia** q5 |
| 7 | Define the color and palette compatibility contract | DEV\* | planned | **PARCIAL** | Satisfecho, disperso y **archivado**: `docs/archive/author-lite/sandbox/PASS-4D-PHASE2-AUTHOR-LITE-COLOR-SYSTEM-V2-WEB-SLIDE-SPEC.md` · 2026-07-22 19:01 · 20 904 B · §5 persistencia y §11 ColorRef v2 = «how the Editor stores variant»; §13 «Resolucion Web» = «how the compiler resolves it against the active Web palette». `…/PASS-4D-PHASE2-WEB-COLOR-PALETTE-RECONCILIATION-LEGACY-CERTIFIED-COMPONENTS-001.md` · 2026-07-22 19:01 · 8 830 B · §§1-14 = «the known palette-regression pattern found after component approval», con test vivo `tools/author-lite/compiler-api/tests/webLegacyCertifiedColorPaletteReconciliation.test.mjs` · 2026-06-21 20:20. `docs/archive/author-lite/component-qa/WEB_COLOR_PALETTE_CROSS_CUTTING_QA_CONTRACT.md` · 2026-07-22 19:01 · 5 591 B · §C sección obligatoria de 10 preguntas + §D taxonomía de 5 clases. **No satisfecho:** no existe un contrato único consumible (son 5+ documentos archivados); «current-palette sync y custom picker» solo aparece en fixes sueltos (`…-PALETTE-PROFILES-001`, `…-PALETTE-EDITOR-FIX-001`, `…-PALETTE-PREVIEW-*`); y el spec declara **6 decisiones abiertas** en su §20 |
| 8 | Define the math, formula, and Formula Inserter compatibility contract | DEV\* | planned | **PARCIAL** | Satisfecho: «security boundaries» y «compile expectations» están **en código vivo** — `tools/author-lite/compiler-api/services/compiler.js` · 2026-06-25 05:38 · :235 y :563 rechazan config runtime de MathJax/KaTeX; normalización cubierta por `tests/mathAuthoringFoundation.test.mjs` · 2026-06-23 15:59 y `webArithmeticFactorizationSafety.test.mjs` · 2026-06-12 18:45. **No satisfecho:** no existe artefacto que defina «the supported LaTeX/KaTeX input surface» ni «how a component declares math/formula compatibility». Lo más cercano, `docs/archive/author-lite/math-authoring/MATHLIVE_PRODUCTION_DEPENDENCY_GATE.md` · 2026-07-22 19:01, es un gate de dependencia (materia de q48), y **las dos piezas de diseño que él mismo cita** (`MATH_AUTHORING_CONTRACT_DESIGN.md`, `SHARED_SMART_FORMULA_FIELD_UX_DESIGN.md`) **no existen en ninguna parte del árbol** (búsqueda sobre 21 322 archivos: 0 aciertos) |
| 9 | Define shared component contracts and the revalidation checklist | DEV\* | planned | **PARCIAL** | Satisfecho a medias y archivado: `docs/archive/author-lite/components/WEB_AUTHOR_FACING_CONTRACTS.md` · 2026-07-22 19:01 · 32 685 B · contratos author-facing, pero su §Alcance dice literalmente `list, video, details, rule` = **4 de 17**. `…/COMPONENT_CERTIFICATION_MATRIX.md` · 2026-06-22 17:43 · 50 998 B · §5 criterios y §8 «Checklist estandar de certificacion por componente» = un Definition of Done por componente. **No satisfecho:** ese DoD es el de *certificación*, concepto retirado; ninguno de los dos referencia el contrato de color (q7), el de math (q8) ni el packet canónico (q3, posterior a ambos), que son las tres piezas que el texto del run exige encadenar |
| 10 | Validate virtual keyboard KaTeX compatibility | DEV\* | planned | **SIN EVIDENCIA** | No existe artefacto que pruebe comandos de teclado contra el path real de render KaTeX ni que enumere comandos no soportados. El candidato de nombre sugerente **no satisface el texto**: `tools/author-lite/editor-ui/mathlive-keyboard-calibration.html` · 2026-06-24 01:57 · 22 174 B · su propia cabecera lo declara «DEV-ONLY CALIBRATION HARNESS», fuera del build de producción, y su objeto es CSS («every calibratable literal is replaced by a `--cal-*` variable») — es calibración **visual** del teclado, no compatibilidad de comandos. Los tests de Smart Formula Field asertan wiring de layout/policy/toggle, no render por comando |
| 11 | Inventory the Web components and their color and math integration points | DEV\* | planned | **PARCIAL** | Satisfecho: `docs/archive/rewrite-dossiers/WEB-ENGINE-CODE-AUDIT-DOSSIER.md` · 2026-07-22 19:01 · 177 720 B (fecha propia 2026-07-11) · PART C §7 «Component inventory at CODE level»; §7.5 tabla resumen con **exactamente los 17** tipos author-pipeline × 5 capas; §7.1 resolución de paleta/variante por componente con `archivo:línea`. Renderer file por componente: sí. **No satisfecho:** el estado de integración no está normalizado como campo por componente («lee la paleta compartida vs. colores hardcodeados/locales», «tiene punto de integración math»); y el run dice que el inventario «replaces the older status-group classification» — esa clasificación **sigue viva y sin reemplazar** en `.aiw/state/component_status.json` · 2026-06-27 16:06 · 16 componentes con «approved / requires repair / deferred». El dossier además se declara «DRAFT EVIDENCE — internal working material, not documentation, not registered» |
| 12 | Audit and implement the Columns component | DEV\* | planned | **PRESENTE Y ANTERIOR** | `docs/archive/author-lite/sandbox/PASS-4D-PHASE2-WEB_COMPONENT_COLUMNS_PARENT_LAYOUT_QA_AUDIT.md` (32 867 B), `…_HUMAN_QA_PACKET.md` (18 146 B), `…_QA_RECONCILIATION.md` (6 047 B) + `docs/archive/author-lite/components/PASS-3L-COLUMNS-A/B/C_*` · todos 2026-07-22 19:01 · auditoría + Human QA + reconciliación completas. Deuda de color respondida en `…-COLOR-PALETTE-RECONCILIATION-LEGACY-CERTIFIED-COMPONENTS-001.md` §8. Ver **[F1]** |
| 13 | Document the Columns component | DOC | planned | **PRESENTE Y ANTERIOR** | `docs/components/web/COLUMNS.md` · 2026-07-22 19:01 · 2 657 B · 8 secciones. Ver **[F2]** |
| 14 | Audit and implement the Header component | DEV\* | planned | **PRESENTE Y ANTERIOR** | `docs/archive/author-lite/components/PASS-3C-HEADER-A_HEADER_WEB_CERTIFICATION_TRACK.md` (2 842 B) y `PASS-3C-HEADER-B_HEADER_WEB_EVIDENCE_RUN.md` (4 912 B) + `docs/archive/author-lite/sandbox/PASS-4D-PHASE2-WEB_COMPONENT_HEADER_QA_RECONCILIATION.md` (5 305 B) · 2026-07-22 19:01; color reconciliado explícitamente en `…-LEGACY-CERTIFIED-COMPONENTS-001.md` §§3,5. Ver **[F1]** |
| 15 | Document the Header component | DOC | planned | **PRESENTE Y ANTERIOR** | `docs/components/web/HEADER.md` · 2026-07-22 19:01 · 2 857 B. Ver **[F2]** |
| 16 | Audit and implement the List component | DEV\* | planned | **PRESENTE Y ANTERIOR** | `docs/archive/author-lite/components/PASS-3C-LIST-F_DECISION_PACKET.md`, `PASS-3C-LIST-F2_EVIDENCE_RUN.md`, `PASS-3G-J/K_LISTA_WEB_*` + `docs/archive/author-lite/sandbox/PASS-4D-PHASE2-WEB-COMPONENT-LIST-QA-AUDIT.md` (11 285 B), `…-HUMAN-QA-PACKET.md` (16 697 B), `…-QA-RECONCILIATION.md` · 2026-07-22 19:01; color reconciliado en `…-LEGACY-CERTIFIED-COMPONENTS-001.md` §§4,6. Ver **[F1]** |
| 17 | Document the List component | DOC | planned | **PRESENTE Y ANTERIOR** | `docs/components/web/LIST.md` · 2026-07-22 19:01 · 2 399 B. Ver **[F2]** |
| 18 | Audit and implement the IconList component | DEV\* | planned | **PRESENTE Y ANTERIOR** | `docs/archive/author-lite/sandbox/PASS-4D-PHASE2-WEB-COMPONENT-ICONLIST-QA-AUDIT.md` (19 021 B), `…-HUMAN-QA-PACKET.md` (22 152 B), `…-QA-RECONCILIATION.md`, **más dos rechequeos de color**: `…-ICONLIST-COLOR-SYSTEM-RECHECK.md` (14 512 B) y `…-COLOR-SYSTEM-V2-RECHECK.md` (8 214 B) · 2026-07-22 19:01. `.aiw/state/component_status.json` · 2026-06-27 16:06 · «Human QA PASS is preserved for iconList». Ver **[F1]** |
| 19 | Document the IconList component | DOC | planned | **PRESENTE Y ANTERIOR** | `docs/components/web/ICON-LIST.md` · 2026-07-22 19:01 · 2 652 B. Ver **[F2]** |
| 20 | Audit and implement the Card component | DEV\* | planned | **PRESENTE Y ANTERIOR** | `docs/archive/author-lite/sandbox/PASS-4D-PHASE2-WEB-COMPONENT-CARD-QA-AUDIT.md` (18 892 B), `…-QA-REAUDIT.md` (13 840 B), `…-HUMAN-QA-PACKET.md` (31 251 B), `…-QA-RECONCILIATION.md`, `…-CARD-COLUMNS-PLACEMENT-CONTRACT-FIX-001.md` · 2026-07-22 19:01. `component_status.json`: «Human QA PASS is preserved for card». Ver **[F1]** |
| 21 | Document the Card component | DOC | planned | **PRESENTE Y ANTERIOR** | `docs/components/web/CARD.md` · 2026-07-22 19:01 · 3 079 B. Ver **[F2]** |
| 22 | Audit and implement the Video component | DEV\* | planned | **PRESENTE Y ANTERIOR** | `docs/archive/author-lite/sandbox/PASS-FUTURE-WEB-COMPONENT-VIDEO-QA-AUDIT.md`, `…-HUMAN-QA-PACKET.md`, `…-VIDEO-IFRAME-SECURITY-REPAIR.md`, `…-TECHNICAL-REAUDIT-AFTER-IFRAME-SECURITY-REPAIR.md` · 2026-07-22 19:01 + test vivo `tools/author-lite/compiler-api/tests/webVideoIframeSecurity.test.mjs` · 2026-06-22 05:33. `component_status.json`: «Human QA PASS … for the bounded YouTube/Vimeo behavior». Ver **[F1]** |
| 23 | Document the Video component | DOC | planned | **PRESENTE Y ANTERIOR** | `docs/components/web/VIDEO.md` · 2026-07-22 19:01 · 2 276 B. Ver **[F2]** |
| 24 | Audit and implement the Narrative component | DEV\* | planned | **PARCIAL** | Satisfecho («Audit … verify by human visual QA»): `docs/archive/author-lite/sandbox/PASS-FUTURE-WEB-COMPONENT-NARRATIVE-QA-AUDIT.md` y `…-NARRATIVE-HUMAN-QA-PACKET.md` · 2026-07-22 19:01. **No satisfecho («implement … repair»):** `.aiw/state/component_status.json` · 2026-06-27 16:06 · «Narrative **failed** Phase 2 Human QA and **requires repair**; not certified». La QA se corrió y salió negativa; la reparación no consta. Ver **[F1]** |
| 25 | Document the Narrative component | DOC | planned | **PRESENTE Y ANTERIOR** | `docs/components/web/NARRATIVE.md` · 2026-07-22 19:01 · 2 431 B. Ver **[F2]** |
| 26 | Audit and implement the Callout component | DEV\* | planned | **PARCIAL** | Satisfecho: `docs/archive/author-lite/sandbox/PASS-4D-PHASE2-WEB-COMPONENT-CALLOUT-HUMAN-QA-PACKET.md` (8 269 B), `…-CALLOUT-COLUMNS-RENDERER-FIX-001.md`, `…-CALLOUT-TECHNICAL-REAUDIT-AFTER-COLUMNS-RENDERER-FIX-001.md` (9 812 B) · 2026-07-22 19:01 — hubo auditoría, QA, fix de renderer y reauditoría; `src/builders/web/partials/renderCallout.js` · 2026-06-25 05:38. **No satisfecho:** la proyección posterior al fix, `component_status.json` · 2026-06-27 16:06, sigue diciendo «Callout **failed** Phase 2 Human QA and requires repair». Ver **[F1]** |
| 27 | Document the Callout component | DOC | planned | **PRESENTE Y ANTERIOR** | `docs/components/web/CALLOUT.md` · 2026-07-22 19:01 · 2 377 B. Ver **[F2]** |
| 28 | Audit and implement the Details component | DEV\* | planned | **PARCIAL** | Satisfecho: `docs/archive/author-lite/sandbox/PASS-FUTURE-WEB-COMPONENT-DETAILS-QA-AUDIT.md` y `…-DETAILS-HUMAN-QA-PACKET.md` · 2026-07-22 19:01; `src/builders/web/partials/renderDetails.js` · 2026-06-25 05:25. **No satisfecho:** `component_status.json` · 2026-06-27 16:06 · «Details **failed** Phase 2 Human QA and requires repair». Ver **[F1]** |
| 29 | Document the Details component | DOC | planned | **PRESENTE Y ANTERIOR** | `docs/components/web/DETAILS.md` · 2026-07-22 19:01 · 2 460 B. Ver **[F2]** |
| 30 | Audit and implement the Arithmetic component | DEV\* | planned | **PARCIAL** | Satisfecho: `docs/archive/author-lite/sandbox/PASS-FUTURE-WEB-COMPONENT-ARITHMETIC-QA-AUDIT.md`, `…-ARITHMETIC-HUMAN-QA-PACKET.md` · 2026-07-22 19:01 + test vivo `webArithmeticFactorizationSafety.test.mjs` · 2026-06-12 18:45 (cubre el eje math que el run nombra). **No satisfecho:** `component_status.json` · 2026-06-27 16:06 · «Arithmetic is **deferred** to own ticket; not certified» — sin resultado de Human QA. Ver **[F1]** |
| 31 | Document the Arithmetic component | DOC | planned | **PRESENTE Y ANTERIOR** | `docs/components/web/ARITHMETIC.md` · 2026-07-22 19:01 · 2 901 B. Ver **[F2]** |
| 32 | Audit and implement the Rule component | DEV\* | planned | **PARCIAL** | Satisfecho — el eje math está hecho y con QA: `docs/archive/author-lite/sandbox/PASS-FUTURE-WEB-COMPONENT-RULE-QA-AUDIT.md`, `…-MATH-AUTHORING-RULE-HUMAN-QA-PACKET.md`, `…-SHARED-SMART-FORMULA-FIELD-RULE-PILOT-HUMAN-QA-PACKET-001.md` · 2026-07-22 19:01; tests vivos `webRuleSmartFormulaFieldRulePilot.test.mjs` (20 181 B, 2026-06-24 23:17) y `webRuleMathAuthoringIntegration.test.mjs` (2026-06-24 19:53); `.aiw/ledgers/human_qa.jsonl` `QA_RECONCILED_…_RULE_ONLY_NOT_CERTIFIED`. **No satisfecho:** el eje color («Bring its **color** and math integration to the shared contracts») no tiene auditoría propia, y `component_status.json` deja Rule `NOT_CERTIFIED`. Ver **[F1]** |
| 33 | Document the Rule component | DOC | planned | **PRESENTE Y ANTERIOR** | `docs/components/web/RULE.md` · 2026-07-22 19:01 · 2 618 B. Ver **[F2]** |
| 34 | Decide scope and enable the Split component | DEV\* | planned | **PARCIAL** | Satisfecho (material de decisión abundante): `docs/archive/author-lite/sandbox/PASS-FUTURE-WEB-COMPONENT-SPLIT-QA-AUDIT.md`, `…-SPLIT-HUMAN-QA-PACKET.md`, `PASS-4D-I5_WEB_SANDBOX_THEORY_COMPLEX_SPLIT_READINESS.md` (23 522 B), `PASS-4D-I9*-THEORY-COMPLEX-SPLIT-PARITY-*` · 2026-07-22 19:01. **No satisfecho — la decisión sigue abierta y así consta:** `.aiw/ledgers/human_decisions.jsonl` · 2026-07-22 19:01 · `HD-JAME-ROADMAP-V2-CONTENT-NORMALIZATION-DIRECTION-001` incluye literalmente «Split remains a human decision, not an instantiated repair»; y el catálogo sigue deshabilitado: `tools/author-lite/editor-ui/src/features/editor/constants/blockCatalog.js` · 2026-06-25 05:55 · :867 `id: 'web-split'`, :872 `disabled: true`, :873 «Pendiente de habilitación como componente» |
| 35 | Document the Split component | DOC | planned | **PRESENTE Y ANTERIOR** | `docs/components/web/SPLIT.md` · 2026-07-22 19:01 · 3 161 B (el packet más largo de los 17). Ver **[F2]**; además documenta un componente que el editor mantiene deshabilitado |
| 36 | Audit and implement the Table component | DEV\* | planned | **PARCIAL** | Satisfecho: `docs/archive/author-lite/sandbox/PASS-FUTURE-WEB-COMPONENT-TABLE-QA-AUDIT.md`, `…-TABLE-HUMAN-QA-PACKET.md`, `…-TABLE-FIX-SWEEP.md`, `PASS-4D-I8B_WEB_TABLES_COLUMNS_BADGES_MATH_PARITY_CONTRACT.md` (42 462 B) · 2026-07-22 19:01 + tests vivos `webTableSafety.test.mjs`, `webTablesParitySchemaCompiler.test.mjs`. **No satisfecho:** `component_status.json` · 2026-06-27 16:06 · «Human QA is **deferred** to own ticket; not certified». Ver **[F1]** |
| 37 | Document the Table component | DOC | planned | **PRESENTE Y ANTERIOR** | `docs/components/web/TABLE.md` · 2026-07-22 19:01 · 2 488 B. Ver **[F2]** |
| 38 | Audit and implement the ConceptGrid component | DEV\* | planned | **PARCIAL** | Satisfecho: `docs/archive/author-lite/sandbox/PASS-FUTURE-WEB-COMPONENT-CONCEPTGRID-QA-AUDIT.md`, `…-CONCEPTGRID-HUMAN-QA-PACKET.md` · 2026-07-22 19:01 + test vivo `webConceptGridSafety.test.mjs` · 2026-06-14 11:56. **No satisfecho:** `component_status.json` · «ConceptGrid is **deferred** to own ticket; not certified». Ver **[F1]** |
| 39 | Document the ConceptGrid component | DOC | planned | **PRESENTE Y ANTERIOR** | `docs/components/web/CONCEPT-GRID.md` · 2026-07-22 19:01 · 2 660 B. Ver **[F2]** |
| 40 | Audit and implement the Hierarchy component | DEV\* | planned | **PARCIAL** | Satisfecho: `docs/archive/author-lite/sandbox/PASS-4D-I2B-WEB-SANDBOX-HIERARCHY-DIAGRAM-OVERFLOW-PARITY-FIX.md`, `…-I2B2-HIERARCHY-COLOR-LABEL-PARITY-FOLLOWUP.md`, `…-I2B2R-HIERARCHY-HUMAN-QA-RECONCILIATION.md`, `WEB_HIERARCHY_FLAT_NODE_CONTRACT_AUDIT.md` · 2026-07-22 19:01 + test vivo `webHierarchyFlatNodeSafety.test.mjs` · 2026-06-13 23:48. **No satisfecho:** `component_status.json` · «Hierarchy is **deferred** to own ticket». Ver **[F1]** |
| 41 | Document the Hierarchy component | DOC | planned | **PRESENTE Y ANTERIOR** | `docs/components/web/HIERARCHY.md` · 2026-07-22 19:01 · 2 623 B. Ver **[F2]** |
| 42 | Audit and implement the Timeline component | DEV\* | planned | **PARCIAL** | Satisfecho: `docs/archive/author-lite/sandbox/PASS-4D-I2A-WEB-SANDBOX-TIMELINE-DETAIL-CARDS-PARITY-FIX.md`, `…-I2A1-TIMELINE-MATH-DETAILS-EDITOR-PARITY-FOLLOWUP.md`, `…-I2A1R-TIMELINE-HUMAN-QA-RECONCILIATION.md`, `WEB_TIMELINE_NORMAL_STEPS_CONTRACT_AUDIT.md`, `WEB_TIMELINE_RESULT_NESTED_CONTRACT_AUDIT.md` · 2026-07-22 19:01 + test vivo `webTimelineNormalStepsSafety.test.mjs` · 2026-06-13 20:28. **No satisfecho:** `component_status.json` · «Timeline is **deferred** to own ticket». Ver **[F1]** |
| 43 | Document the Timeline component | DOC | planned | **PRESENTE Y ANTERIOR** | `docs/components/web/TIMELINE.md` · 2026-07-22 19:01 · 2 640 B. Ver **[F2]** |
| 44 | Audit and implement the Visual component | DEV\* | planned | **PARCIAL** | Satisfecho: `docs/archive/author-lite/sandbox/PASS-FUTURE-WEB-COMPONENT-VISUAL-QA-AUDIT.md`, `…-VISUAL-HUMAN-QA-PACKET.md`, `…-VISUAL-SVG-SAFETY-REPAIR.md`, `…-TECHNICAL-REAUDIT-AFTER-SVG-SAFETY-REPAIR.md` · 2026-07-22 19:01 + test vivo `webVisualSvgSafety.test.mjs` · 2026-06-22 04:42. **No satisfecho:** `component_status.json` · «Visual is **deferred** to own ticket». Ver **[F1]** |
| 45 | Document the Visual component | DOC | planned | **PRESENTE Y ANTERIOR** | `docs/components/web/VISUAL.md` · 2026-07-22 19:01 · 2 532 B. Ver **[F2]** |
| 46 | Audit the Web components and their documentation as a whole | DEV\* | planned | **PARCIAL** | Satisfecho («Consolidate the remaining blockers … into one readiness evidence package»): `docs/archive/author-lite/sandbox/PASS-FUTURE-WEB-CERTIFICATION-READINESS-BLOCKER-AUDIT-001.md` · 2026-07-22 19:01 · 11 675 B · veredicto `WEB_CERTIFICATION_READINESS_BLOCKER_AUDIT_COMPLETE / P1_HUMAN_QA_BATCH_PENDING / NOT_READY_FOR_WEB_CERTIFICATION`, con `PASS-FUTURE-WEB-HUMAN-QA-BATCH-RUNBOOK-AND-PACKET-INDEX-001.md` y `…-BATCH-RESULT-RECONCILIATION-001.md`. **No satisfecho:** verifica contra el concepto de certificación (retirado), no contra los contratos de color/math; y no puede verificar «each component's canonical packet … follows the component-doc single-source contract» porque el contrato es del 2026-07-28, posterior |
| 47 | Audit the Web component documentation as a whole | DOC | planned | **SIN EVIDENCIA** | No existe auditoría de conjunto de los 17 packets contra el contrato. Lo más cercano, `docs/archive/author-lite/sandbox/PASS-FUTURE-WEB-COMPONENT-GUIDE-BATCH-RECONCILIATION-001.md` · 2026-07-22 19:01 · 7 095 B, reconcilia el `AUTHOR_COMPONENT_GUIDE.md` legacy, **no** los packets. La medición 17/17 que sí existe vive en el record de q3, en `aiw-console`, fuera de `cantu-studio`, y es de otro run |
| 48 | Establish MathLive integration readiness | DEV\* | **completed** | **PARCIAL** | Satisfecho, y es exactamente lo que su `closeout_result` declara: `tools/author-lite/editor-ui/package.json` · 2026-06-22 18:31 · :16 `"mathlive": "0.110.0"`; montaje DOM asertado en `tools/author-lite/compiler-api/tests/mathAuthoringSmartFormulaField.test.mjs` · 2026-06-24 19:04 · :96 «MathLive loader registers browser element and virtual keyboard boundary»; `docs/archive/author-lite/math-authoring/MATHLIVE_PRODUCTION_DEPENDENCY_GATE.md` · 2026-07-22 19:01 · 13 246 B · el gate de dependencia. **No satisfecho:** el texto pide además «the supported MathLive integration **contract**», «normalization requirements», «accepted UI behavior» y «a clear **go/no-go boundary for Formula Inserter integration**» — ninguno consta como artefacto. **El run está `completed` con un closeout más estrecho que su propio texto** |
| 49 | Verify global Formula Inserter integration after component revalidation | DEV\* | planned | **SIN EVIDENCIA** | El motor existe — `tools/author-lite/editor-ui/src/features/math-authoring/formulaInserter/` (3 archivos, `formulaInserter.controller.js` · 2026-06-23 15:53) + `tests/mathAuthoringFormulaInserter.test.mjs` · 2026-06-23 04:20 — pero eso es lo que el run **da por hecho** («already ships integrated … and is RULE_ONLY today»). Lo que el run pide es la verificación *transversal* posterior a la ronda de revalidación: no existe ningún artefacto de auditoría cross-component, y la ronda que auditaría no ha ocurrido |
| 50 | Audit and define the Slide grid system | DEV\* | planned | **SIN EVIDENCIA** | No existe auditoría ni definición del grid de slide, ni integración en el editor. Hay CSS grid **dentro de un layout concreto** — `src/builders/slides/layouts/renderColumnsSlide.js` · 2026-05-31 04:30 · :65-80 `gridTemplateCols`/`gridTemplateRows` — que es el layout Columns, no un modelo de grid de slide; y el editor no tiene integración: `tools/author-lite/editor-ui/src/features/editor/components/slide/SlideFlowEditor.jsx` está **a 0 bytes** |
| 51 | Establish the Slide architecture baseline | DEV\* | planned | **PARCIAL** | Satisfecho: `docs/archive/rewrite-dossiers/SLIDES-ENGINE-CODE-AUDIT-DOSSIER.md` · 2026-07-22 19:01 · 173 040 B (fecha propia 2026-07-11) · §1 árbol, §2 módulos, §3 data flow end-to-end, §4 «Contracts and interfaces AS OBSERVED IN CODE», §7 inventario de componentes a nivel código, §8 divergencias código-vs-docs, §9 open questions, más «Coverage gaps» — todo con `archivo:línea`. Complementos registrados: `docs/architecture/ARCHITECTURE-SLIDES-ENGINE.md` · 2026-07-22 19:01 · 5 220 B y `docs/reference/REFERENCE-SLIDES-ENGINE-API.md` · 6 906 B. **No satisfecho:** el run pide también «Editor integration» y «sandbox fixtures», y el dossier declara sus source roots como `src/builders/slides/**`, main.js, `src/design/**`, `src/content/**` — **`tools/author-lite/` queda fuera**. Y se declara «not documentation, not registered» |
| 52 | Reproduce the sandbox files in the editor | DEV\* | planned | **SIN EVIDENCIA** | No hay reproducción de sandbox de Slide en el editor. Los `dist/sandbox/*.SLIDE.html` (8 archivos · 2026-05-31 04:30) son salida del **motor** vía `main.js`, no reproducción desde el editor. El único draft de slide en el workspace del editor es `src/content/author_lite/drafts/slide/test_slide/test_slide/test_slide.slide.draft.json` · 2026-06-11 22:43 · **504 B** — un stub. Toda la campaña PASS-4C/4D de reproducción de sandbox es **Web**. No existe inventario de componentes Slide ni registro del «supported parity boundary» |
| 53 | Establish the Slide Component Guide from the Web template | DOC | planned | **SIN EVIDENCIA** | `docs/components/slides/` **no existe** (verificado; solo existe `docs/components/web/`). Ningún artefacto adapta la estructura del packet Web a especificidades de Slide ni a compatibilidad de grid |
| 54 | Audit the reproduced components and define the per-component runs | DEV\* | planned | **SIN EVIDENCIA** | Depende del inventario de q52, que no existe. En el canónico (`.aiw/roadmap/roadmap.json` · 2026-07-28 03:06) **no hay ningún run por componente de Slide**: los 71 runs están íntegramente contabilizados en esta tabla y q55 sigue siendo el marcador de posición vacío |
| 55 | Per-component Slide runs, to be created by the definer run | DEV\* | planned | **NO DETERMINABLE** | **Por qué no se puede decidir desde disco:** el texto del run especifica un entregable **nulo** — «These runs do not exist yet… This placeholder holds the position in the phase and **carries no implementation work itself**». No hay artefacto que pueda confirmarlo ni refutarlo: su único referente es la propia entrada del canónico, y medir un run contra el roadmap que lo contiene es circular. **Qué haría falta:** una decisión de cabina sobre si el marcador sigue siendo el instrumento correcto una vez q52/q54 produzcan el inventario — no un archivo |
| 56 | Assemble the Slide whole-set audit and readiness evidence | DEV\* | planned | **SIN EVIDENCIA** | No existe paquete de readiness de Slide. Búsqueda de `*READINESS*` sobre los 21 322 archivos: 2 aciertos, ambos Web (`PASS-4D-I5_…SPLIT_READINESS.md`, `PASS-FUTURE-WEB-CERTIFICATION-READINESS-BLOCKER-AUDIT-001.md`) |
| 57 | Audit Cantu Studio UX and route concrete follow-up runs | DEV\* | planned | **PARCIAL** | Satisfecho: **una** de las seis superficies que el run nombra — `docs/archive/author-lite/sandbox/PASS-4D-PHASE2-WEB-DESIGN-SYSTEM-SETTINGS-AND-ICON-LIBRARY-AUDIT-001.md` · 2026-07-22 19:01 · 23 680 B (fecha propia 2026-06-20) · audita el panel de settings del design system y la librería de iconos; veredicto `…AUDIT_CONTRACT_COMPLETED / IMPLEMENTATION_PENDING`. **No satisfecho:** preview surface, editor chrome, toolbar, panel layout y shared authoring controls no tienen auditoría (lo más cercano, `…AUTHOR_LITE_SHELL_CANVAS_INTERMEDIATE_WIDTH_POLISH_P2.md`, es un polish puntual); y **no se ruteó ningún follow-up run**, que es la mitad del encargo del texto |
| 58 | Measure the generated HTML payload | DEV\* | planned | **SIN EVIDENCIA** | No existe medición de payload duplicado. `.aiw/docs/docs_index.json` · 2026-07-28 02:49 · :140 lo dice al revés: «ADR-026 keeps Asset Dedup future/blocked; **no ctx.assets or Asset Registry implementation**» |
| 59 | Design the Asset Registry | DEV\* | planned | **SIN EVIDENCIA** | Sin diseño de identidades de asset ni reglas de dedup. Misma nota del índice (:140); `.aiw/docs/docs_corpus_curation_audit.json` · 2026-07-22 19:01 · :1101 recoge el no-claim explícito de ADR-026: «no Asset Dedup implemented, no Asset Registry, no ctx.assets contract approved, no HTML payload measured» |
| 60 | Define the ctx.assets contract | DEV\* | planned | **SIN EVIDENCIA** | **Cero ocurrencias de `ctx.assets` en código** (`src/`, `tools/author-lite/compiler-api/`, `tools/author-lite/editor-ui/src/`). La única mención de intención es `docs/archive/author-lite/DECISIONS.md` · 2026-06-21 20:08 · :809 «renderCard registra assets requeridos en ctx.assets» — que el código contradice |
| 61 | Integrate the Asset Registry into renderers | DEV\* | planned | **SIN EVIDENCIA** | Ningún renderer de `src/builders/` registra assets; sin tests de registro/orden/reuso/fallback |
| 62 | Validate Asset Dedup output equivalence | DEV\* | planned | **SIN EVIDENCIA** | No hay dedup que validar; no existe comparación pre/post-dedup |
| 63 | Validate the production lesson workflow | DEV\* | planned | **SIN EVIDENCIA** | Existen lecciones (`src/content/lecciones/Aritmetica/*.js` · 2026-05-31 04:30, 2 archivos) y salida en `dist/staging/`, pero **no existe validación de flujo de lección de producción**. La evidencia de regresión global que sí existe — `QA/temp/PASS-4D-I10R2-…/global-reproduction-report.json` · 2026-06-14 18:46 · 77 393 B — es reproducción de **sandbox**, no de lecciones de producción, y no registra fallos como follow-up runs acotados |
| 64 | Implement and validate the production export flow | DEV\* | planned | **PARCIAL** | Satisfecho: **uno** de los seis elementos que el texto nombra, «output locations» — `tools/author-lite/compiler-api/services/workspaceStorage.js` · 2026-06-17 23:31 · :148-149 y :196-208 definen `<exportsLocalWeb>/<course>/<topic>/<title>.WEB.html` y su gemelo MOODLE, con artefactos reales en `dist/author_lite/**`. **No satisfecho:** packaging rules, validation checks, operator workflow, y la verificación de que los artefactos exportados son «complete and reproducible». Además el código es preexistente del editor, no producido por este run, y el run se ordena «after lesson validation closes» (q63, sin evidencia) |
| 65 | Define the hosting and deployment plan | DEV\* | planned | **SIN EVIDENCIA** | Búsqueda de `*HOSTING*` y `*DEPLOY*` sobre los 21 322 archivos: **0 aciertos**. Sin arquitectura de despliegue, entorno, release, rollback ni observabilidad |
| 66 | Implement the canonical Docs view rendering real bodies | DEV\* | **planned** | **PRESENTE Y ANTERIOR** | **Funciona hoy** — `docs/project-console/assets/project-console.js` · 2026-07-22 19:01 · 283 684 B: :14 consume `../../.aiw/docs/docs_index.json`; :2775 `renderDocBodyContent()` y :2777 `renderDocMarkdownLite(stripLeadingStatusHeader(rawText))` = **cuerpos reales, no tarjetas de metadata**; :2792-2805 fetch por ruta registrada + `docBodyCache`; :2180-2187 `nav_tier` = navegación; :2817-2835 tokens de frescura desde `freshness_status` = frescura; :2164-2167 categoría vía `ia_bucket`/`source_role` = source role; :2004-2018 comentario de cabecera que fija read-only y sin semántica de aprobación. Servido por `tools/project-console/serve-project-console.mjs` · 2026-07-22 19:01 · :54. **Por qué ANTERIOR y no CONFORME:** el código es del 2026-07-22 y el modelo canónico que debe consumir (q2) es del 2026-07-28; **«authority» no se renderiza** como campo (el único acierto de `authority` en 283 KB es la clave de un mapa de categorías, :2320, y encima con **ruta staleada** `docs/GOVERNANCE-AUTHORITY-AND-NO-CLAIMS.md`, hoy `docs/governance/…`); y no consume packets vía el contrato de q3, sino por ruta del índice. **Entregable funcionando con el run en `planned`** |
| 67 | Deep documentation audit | DOC | planned | **PRESENTE Y ANTERIOR** | `.aiw/docs/docs_corpus_curation_audit.json` · 2026-07-22 19:01 · **321 207 B** · «Full documentation-corpus curation audit … per-file curation depth via eleven bounded read-only family audits» = «a thorough audit and classification of every documentation source». **Por qué ANTERIOR:** su `scope_note` (:16) dice literalmente «for **JAME_System_Dual**» — es era JAME, previo al rename (q6) y a la reorganización del Blueprint que movió el corpus a `docs/archive/`. Además el propio run pone dos condiciones de compuerta que hoy no se cumplen: «until Cantu Studio is further developed and **the lessons material exists**». El diferimiento es decisión del operador y así lo dice el texto |
| 68 | Rename internal code directories and their references | DEV\* | planned | **SIN EVIDENCIA** | Nada renombrado: `tools/author-lite/` y `src/content/author_lite/` existen ambos y siguen poblados (verificado por `ls`). El ancla del launcher sigue apuntando ahí (`tools/dev/lib/dev-common.ps1` · 2026-07-22 19:01) |
| 69 | Rename documentation directories and sweep prose | DOC | planned | **SIN EVIDENCIA** | Nada renombrado ni barrido. **Y hay un matiz medido que cambia el sentido del run:** `docs/author-lite/` y `docs/jame-core/` **existen pero están vacíos** — 0 archivos, con todos sus subdirectorios (`audits`, `components`, `coverage`, `handoffs`, `sandbox`, `api`) también a 0; el contenido se movió físicamente a `docs/archive/author-lite/` y `docs/archive/jame-core/`. Las referencias entrantes **no** se actualizaron: `AGENTS.md` · 2026-07-27 22:36 · :93 y :155; `CLAUDE.md` · 2026-07-27 22:36; `generate_prompt_context.js` · :167; `docs/operations/OPERATIONS-STATE.md` · :31; y los 17 packets de `docs/components/web/` |
| 70 | Rename the jame-prefixed editor UI classes | DEV\* | planned | **SIN EVIDENCIA** | Los identificadores siguen vivos: **40 ocurrencias** de `jame-smart-formula` / `data-jame-active-layout` en `tools/author-lite/editor-ui/src/**` (`.css`/`.js`/`.jsx`) |
| 71 | Rename the Core j-prefix render namespace | DEV\* | planned | **SIN EVIDENCIA** | El namespace sigue vivo: **336 tokens `j-*` distintos** en `src/builders/` + `src/design/` [NO VERIFICADO como equivalente exacto a los «334 j-prefix classes» del texto: mi extracción es por regex `j-[a-z][a-z0-9-]*` y captura también ids]. El id nombrado existe: `j-infinity-root` en `src/builders/slides/renderSlides.js` · 2026-05-31 04:30 · :60, `helpers/inkEngine.js` :143 y `helpers/slidesPlayer.js` :32 |

---

## BLOQUE C — EL DETALLE DE LAS DOS FAMILIAS, CITADO UNA VEZ

### [F1] Las 17 revalidaciones de componente (q12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44)

Todas comparten el mismo texto salvo el nombre del componente: «Audit the X component against the
**color and palette compatibility contract**, using the **current component inventory** as the
starting point… Verify the result by **human visual QA**».

**Lo que satisface el texto, para las 17:** existe auditoría técnica archivada por componente, y en
la mayoría también packet de Human QA y reconciliación, con `archivo:línea` y tests vivos en
`tools/author-lite/compiler-api/tests/`. La tabla cita los de cada uno.

**Lo que ninguna de las 17 satisface, y por eso todas son ANTERIOR o PARCIAL, nunca CONFORME:**

1. **El contrato contra el que deben auditar (q7) no existe como artefacto aceptado** — está
   disperso y archivado (fila q7). Las auditorías se hicieron contra el concepto de
   *certificación*, hoy retirado.
2. **El inventario que es su punto de partida (q11) no existe normalizado** — la clasificación que
   ese inventario debía reemplazar sigue viva en `.aiw/state/component_status.json` · 2026-06-27
   16:06, con 16 componentes y **`columns` ausente** (el 17.º).
3. **La evidencia es anterior a la reorganización documental**: todo vive bajo `docs/archive/`.

**El corte entre las dos clases** es el resultado de Human QA registrado en
`.aiw/state/component_status.json`:

| Resultado registrado | Componentes | Clase |
|---|---|---|
| Human QA PASS preservado, o historia component-level/doc-approved | columns, header, list, iconList, card, video | **PRESENTE Y ANTERIOR** (6) |
| **Failed** Phase 2 Human QA, requiere reparación | narrative, callout, details | **PARCIAL** (3) |
| **Deferred** / sin resultado explícito de Human QA | rule, table, conceptGrid, split, arithmetic, hierarchy, timeline, visual | **PARCIAL** (8) |

### [F2] Los 17 doc-runs de componente (q13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45)

Todos comparten el mismo `full_description` de una frase: «Once the component-doc single-source
contract is defined, document the X component in its canonical packet that feeds the Component
Guide.»

**Lo que satisface el texto, para los 17:** el packet existe. `docs/components/web/` contiene
exactamente **17 archivos Markdown**, uno por componente, 2 276–3 161 B, todos con mtime
**2026-07-22 19:01:55**, y con banner propio `Status: Draft | Last verified: **2026-07-12**` — que
es la fecha de autoría real. Estructura uniforme 17/17: banner + tabla de metadata + 8 secciones
(What it is · When to use · Author fields · Layout compatibility · Example · Guardrails · Similar
components · Status and evidence). Los 17 están **registrados**: `.aiw/docs/docs_index.json` ·
2026-07-28 02:49 · 17 entradas con `source_role: component_doc_web`, `canonicality:
canonical_active`, `nav_tier: primary`, `freshness: produced_2026-07-12`, `related_run_id:
RUN-CANTU-DOCS-PARALLEL-COMPONENTS-WEB-001`, indexadas por
`RUN-CANTU-DOCS-PARALLEL-WAVE-INDEXING-001`.

**Las tres razones por las que los 17 son ANTERIOR y no CONFORME:**

1. **Son anteriores a su propia precondición.** El texto dice «Once the contract is defined» —
   los packets son del 2026-07-12 y el contrato (q3) del **2026-07-28 02:48**. Se documentó
   dieciséis días antes de que existiera el contrato que debían seguir.
2. **La cláusula «that feeds the Component Guide» no se cumple para ninguno.** El Component Guide
   no lee ningún packet: `tools/author-lite/editor-ui/src/features/editor/components/preview/ComponentGuide.jsx`
   · 2026-06-25 05:38 · 103 985 B · tiene guías **inline y hardcodeadas para 3 de 17**
   (`listGuide` :42, `headerGuide` :169, `columnsGuide` :291) más un `GenericComponentGuide` :2329,
   sin un solo `fetch`/import de `docs/`.
3. **Los 17 portan dos punteros staleados.** Cada packet cita
   `docs/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` (ruta real hoy:
   `docs/archive/author-lite/components/…`) y `docs/REFERENCE-DRAFT-JSON.md` (ruta real hoy:
   `docs/reference/REFERENCE-DRAFT-JSON.md`) — verificado en `COLUMNS.md` :12 y :26, y presente en
   los 17 por uniformidad de plantilla.

---

## BLOQUE D — AGREGADOS

### D.1 Por clasificación

| Clasificación | Runs | % de 71 |
|---|---:|---:|
| `SIN EVIDENCIA` | **20** | 28,2 % |
| `PRESENTE Y CONFORME` | **3** | 4,2 % |
| `PRESENTE Y ANTERIOR` | **25** | 35,2 % |
| `PARCIAL` | **22** | 31,0 % |
| `NO DETERMINABLE` | **1** | 1,4 % |
| **Total** | **71** | 100 % |

### D.2 Clasificación cruzada con carril

| Clasificación | DOCUMENTATION | DEVELOPMENT (incl. default) | Total |
|---|---:|---:|---:|
| `SIN EVIDENCIA` | 3 | 17 | 20 |
| `PRESENTE Y CONFORME` | 2 | 1 | 3 |
| `PRESENTE Y ANTERIOR` | 18 | 7 | 25 |
| `PARCIAL` | 0 | 22 | 22 |
| `NO DETERMINABLE` | 0 | 1 | 1 |
| **Total** | **23** | **48** | **71** |

Lectura: **el carril DOCUMENTATION no tiene ni un solo `PARCIAL`**. Sus runs o están hechos, o
están hechos-pero-anteriores (18 de 23, el 78 %), o no están. El carril DEVELOPMENT concentra los
22 `PARCIAL`, que es donde vive el trabajo a medias.

### D.3 La cifra que motivó el encargo

`planned` en el canónico: **68** de 71.

| De esos 68 `planned`… | Runs |
|---|---:|
| tienen entregable **de algún tipo** en disco (CONFORME + ANTERIOR + PARCIAL) | **47** |
| no tienen nada (`SIN EVIDENCIA`) | 20 |
| no determinables | 1 |

> **47 de los 68 runs `planned` — el 69 % — tienen ya trabajo en disco.** De ellos, **26 tienen
> entregable sustancialmente completo** (1 `PRESENTE Y CONFORME` + 25 `PRESENTE Y ANTERIOR`) y
> 21 lo tienen a medias.

Los cuatro casos de la semilla no eran excepciones: eran una muestra pequeña de un patrón que
cubre dos tercios de la cola.

---

## BLOQUE E — LOS RUNS CUYO TEXTO YA NO DESCRIBE LO QUE FALTA

Criterio 8 del encargo. **Se nombran; no se reescribe ninguno** — eso es edición de roadmap y no es
de este encargo. Para cada uno: qué dice hoy, y qué queda de verdad.

**1-17. Los diecisiete doc-runs de componente** — q13 (Columns), q15 (Header), q17 (List),
q19 (IconList), q21 (Card), q23 (Video), q25 (Narrative), q27 (Callout), q29 (Details),
q31 (Arithmetic), q33 (Rule), q35 (Split), q37 (Table), q39 (ConceptGrid), q41 (Hierarchy),
q43 (Timeline), q45 (Visual).

- **Qué dice hoy:** «Once the component-doc single-source contract is defined, **document** the X
  component in its canonical packet that feeds the Component Guide.»
- **Qué queda de verdad:** el packet ya existe, está registrado y es uniforme. Lo que queda no es
  escribir: es (a) **verificar** el packet contra el contrato de q3 (que llegó después), (b)
  **reparar los dos punteros staleados** que cada uno porta hacia la matriz y hacia
  REFERENCE-DRAFT-JSON, (c) **refrescar banner y registro juntos**, y (d) decidir qué hacer con
  «that feeds the Component Guide», cláusula que hoy **no es cierta para ninguno de los 17** y cuyo
  cumplimiento depende de un run de runtime del Guide que no existe en la cola.

**18. q4 — «Update the operating methodology to roadmap-first ordering»**

- **Qué dice hoy:** actualizar `AGENTS.md`, `generate_prompt_context.js` y **NEXT_STEPS**.
- **Qué queda de verdad:** el trabajo sobre AGENTS.md y el generador sigue íntegro (AGENTS.md no
  nombra el roadmap ni una vez). Pero **NEXT_STEPS ya no es un documento vivo**: está en
  `docs/archive/author-lite/NEXT_STEPS.md` · 2026-06-22 20:59, y la documentación archivada está en
  la lista de exclusión que el propio q5 congela. El run manda editar un archivo que la
  reorganización archivó; lo que queda es decidir si NEXT_STEPS conserva rol o si su mención
  desaparece de las otras dos superficies.

**19. q5 — «Freeze the naming disposition map and exclusion list»**

- **Qué dice hoy:** adoptar el mapa **«at `docs/ops/NAMING_DISPOSITION_MAP.md`»**.
- **Qué queda de verdad:** esa ruta no existe (`docs/ops/` está vacío); el mapa está en
  `docs/archive/ops/`. Y el mapa que se congelaría escaneó **otra raíz de repo y otra rama** y se
  autodeclara `ANALYSIS ONLY`. Lo que queda no es solo aprobar: es **re-medir el mapa contra el
  árbol de hoy** — que ya no es el que escaneó, porque q6 renombró la carpeta en el intervalo —
  y luego congelarlo.

**20. q6 — «Rename the repository folder and update its cosmetic references»**

- **Qué dice hoy:** «Rename the repository folder **from its legacy name** to the current Cantu
  Studio name», más label cosmético, string del launcher y prosa.
- **Qué queda de verdad:** **la carpeta ya se llama `cantu-studio`**, el label ya dice
  `cantu-studio/` y el string del launcher ya está actualizado. Lo único pendiente es **una línea de
  prosa** en `docs/operations/OPERATIONS-STATE.md:31`. El run describe un rename que ya ocurrió —
  y ocurrió **antes que su dependencia** q5, que debía autorizarlo.

**21. q11 — «Inventory the Web components and their color and math integration points»**

- **Qué dice hoy:** leer `src/builders/web/` y producir el inventario, que «replaces the older
  status-group classification».
- **Qué queda de verdad:** el dossier de WEB ENGINE ya leyó ese código y ya produjo el inventario
  de los 17 con renderer y resolución de paleta por componente. Lo que queda es **normalizarlo a
  los dos campos que el run pide** (paleta compartida sí/no, punto math sí/no), **registrarlo** —
  hoy es «DRAFT EVIDENCE, not registered» — y **retirar la clasificación vieja**, que sigue viva y
  además incompleta (16 de 17, sin `columns`).

**22. q51 — «Establish the Slide architecture baseline»**

- **Qué dice hoy:** auditar builders, contratos, integración de Editor, preview/compile, fixtures,
  documentación y limitaciones, y producir un baseline source-backed.
- **Qué queda de verdad:** 173 KB de baseline source-backed ya existen y cubren casi todo. Lo que
  queda es **la franja que el dossier excluyó por diseño** — integración con el Editor
  (`tools/author-lite/`) y fixtures de sandbox — más el registro del artefacto.

**23. q66 — «Implement the canonical Docs view rendering real bodies»**

- **Qué dice hoy:** «Update the read-only Docs view to … render **real documentation bodies — not
  metadata-only cards**».
- **Qué queda de verdad:** la vista **ya renderiza cuerpos reales**, con frescura, source role y
  navegación. Lo que queda es (a) **«authority», que no se muestra**, (b) consumir los packets **vía
  el contrato de q3** en lugar de por ruta del índice, y (c) reparar la ruta staleada del mapa de
  categorías (`project-console.js:2320`). El verbo del run es «implement»; el trabajo real es
  «completar y realinear».

**24. q69 — «Rename documentation directories and sweep prose»**

- **Qué dice hoy:** «Rename **the live documentation directories** carrying legacy names, primarily
  `docs/author-lite` and `docs/jame-core`, update their inbound references».
- **Qué queda de verdad:** esas dos direcciones **ya no son directorios vivos: están vacíos**
  (0 archivos, subdirectorios incluidos). Su contenido vive en `docs/archive/`, que el propio run
  manda dejar intacto. Renombrarlos no movería un solo documento. Lo que queda es (a) **decidir qué
  hacer con las cáscaras vacías** y (b) **repuntar las referencias entrantes** — que sí siguen
  rotas, en AGENTS.md, CLAUDE.md, el generador de contextos, OPERATIONS-STATE.md y los 17 packets.
  El barrido de prosa es todo el trabajo restante; el rename de directorios ya no tiene objeto.

---

## BLOQUE F — CERO ESCRITURAS EN `cantu-studio`, VERIFICADO POR DOBLE HUELLA

Antes de leer nada y después de terminar toda la medición, se tomó el árbol completo de
`cantu-studio` excluyendo `.git/` (churn del autosync, no entregable) por dos vías independientes.

| Huella | Antes | Después | ¿Coinciden? |
|---|---|---|---|
| Rutas + tamaños + mtimes (`%p\|%s\|%T@`, ordenado) | `43e28a1baee0d296254afc9c7d06887c` | `43e28a1baee0d296254afc9c7d06887c` | **Sí** |
| md5 **por archivo** de los 21 322 archivos (ordenado) | `169918180340987e11237aee9c21a491` | `169918180340987e11237aee9c21a491` | **Sí** |

`diff` de ambos listados: **idénticos, sin una sola línea de diferencia**. Conteo estable en
**21 322 archivos**. La segunda huella es la fuerte: cubre contenidos, no solo metadatos, así que
descarta también una escritura que hubiera restaurado el mtime.

Ni un archivo temporal: todo lo que la sesión produjo (extracción de los 71 runs, ambos listados)
vive en el scratchpad de sesión, fuera de los tres repos.

**Superficies prohibidas del hilo paralelo, md5 de control tras terminar:**
`aiw-console/roadmap/roadmap.json` = `e620f0702ed7d0130048bc7c65a914ae`,
`context/aiw-console/CONTRATO.md` = `f77ccec64d99f2048d4bde41638cb228`,
`context/DECISIONES.md` = `135080acd696a76ec67008722038762e` — **los tres idénticos a los que
declaró el record de q3 en su Bloque H**, sin escritura mía en medio. Handoffs, tests y todos los
records existentes: intactos; este estrena nombre y es el 36.º.

**Un escritor paralelo, observado y no tocado:** al abrir la sesión había 34 records; al cerrarla
hay 36. El que no es mío es `DECISION-ROADMAP-AIW.md` · 2026-07-28 03:25 · 34 814 B, del hilo
paralelo de `aiw-console` — superficie disjunta, nombre distinto, sin colisión con este. Se deja
constancia por la misma razón que la dejaron los records de q2 y q3.

**Ninguna suite se corrió, ni completa ni parcial. El validador tampoco.**

---

## BLOQUE G — HALLAZGOS NOMBRADOS, NINGUNO TOCADO

Fuera de alcance por encargo explícito. Se nombran porque estorban a la medición o a runs futuros;
**no se arregló ninguno**.

1. **`docs/author-lite/`, `docs/jame-core/`, `docs/ops/`, `docs/human/`, `docs/generated/`,
   `docs/shared/`, `docs/_legacy/` y `docs/_historical_run_record/` son cáscaras vacías** — 0
   archivos cada una, subdirectorios incluidos. La reorganización movió el contenido a
   `docs/archive/` y dejó los directorios. Afecta directamente a q69.
2. **`AGENTS.md` y `CLAUDE.md` siguen apuntando al árbol pre-reorganización** — `AGENTS.md` :93 y
   :155 declaran vigentes `docs/author-lite/DECISIONS.md` y `NEXT_STEPS.md`, hoy archivados;
   `CLAUDE.md` cita `docs/DOCUMENTATION_MAP.md`, `docs/DOCUMENT_STATUS.md`,
   `docs/shared/AI_CONTEXT_POLICY.md` y toda la familia `docs/author-lite/…`, todas hoy bajo
   `docs/archive/`. Es la misma familia de drift que ya nombraron los hallazgos 2 de q2 y 2 de q3;
   aquí se confirma que alcanza también a los dos documentos de gobernanza de raíz.
3. **`columns` sigue faltando en `.aiw/state/component_status.json`** — 16 de 17, verificado por
   `component_id`. Confirmado, no tocado (hallazgo 6 de q3).
4. **`statusLabel: 'Certificado'` sigue hardcodeado** en `ComponentGuide.jsx:45`, más
   `'COMPONENT_CERTIFIED / DOCS_APPROVED / NOT_WEB_CERTIFIED'` en :172 y :294, con un script que
   protege ese texto (`tools/author-lite/scripts/checkComponentGuideTextIntegrity.cjs` ·
   2026-06-19 05:31). Confirmado, no tocado (hallazgo 4 de q3).
5. **`project-console.js:2320` porta una ruta staleada** en su mapa de categorías:
   `"docs/GOVERNANCE-AUTHORITY-AND-NO-CLAIMS.md"`, hoy `docs/governance/…`. Hallazgo nuevo de esta
   medición; afecta a q66.
6. **Dos documentos de diseño de math-authoring citados por un gate vigente no existen.**
   `MATHLIVE_PRODUCTION_DEPENDENCY_GATE.md` §2 cita como fuentes inspeccionadas
   `docs/author-lite/math-authoring/MATH_AUTHORING_CONTRACT_DESIGN.md` y
   `SHARED_SMART_FORMULA_FIELD_UX_DESIGN.md`; **ninguno de los dos está en el árbol** (0 aciertos
   sobre 21 322 archivos). O se perdieron en la reorganización o nunca se materializaron. Es
   materia directa de q8 y merece decisión del operador, no de un encargo de medición.
7. **q48 está `completed` con un closeout más estrecho que su propio texto.** Su
   `closeout_result` justifica la dependencia y el montaje DOM de MathLive — que son reales — pero
   el `full_description` pide además contrato de integración, requisitos de normalización,
   comportamiento de UI aceptado y **un go/no-go explícito para el Formula Inserter**, y de eso no
   hay artefacto. Se declara como medición; el status es del operador y no se tocó.
8. **`.aiw/docs/docs_index.json` está sano en rutas.** Se verificaron las 142 entradas contra
   disco: **0 rutas rotas**. El drift de rutas vive en la prosa de los documentos y en AGENTS/CLAUDE,
   no en el registro.
9. **`SlideFlowEditor.jsx` está a 0 bytes**, igual que `EditorShell.jsx`, `ThreePaneLayout.jsx`,
   `PreviewPanel.jsx`, `FocusPreviewOverlay.jsx` y `EmptyState.jsx`. Relevante para q50 y q52; no
   se juzga si es intencional.
10. **El campo `lane` está ausente en 48 de 71 runs** y se resuelve por el `default: true` de
    DEVELOPMENT. Funciona, pero significa que dos tercios del roadmap no declaran carril
    explícitamente. Se deja constancia por honestidad de medición; no se propone cambio.

---

## BLOQUE H — NO-CLAIMS DE ESTE ENCARGO

Este encargo **mide y clasifica**. No arregla nada de lo que encontró: ni el drift de rutas de
AGENTS.md/CLAUDE.md, ni las cáscaras vacías de `docs/`, ni el `columns` ausente de
`component_status.json`, ni el `'Certificado'` hardcodeado del Component Guide, ni la ruta staleada
del mapa de categorías, ni los dos documentos de math-authoring desaparecidos. **No edita el roadmap
en ninguna forma** — ni status, ni texto, ni orden, ni dependencias, ni `barrier`; **no reescribe el
`full_description` de ninguno de los 24 runs del Bloque E**; no ejecutó ni una operación del motor
de roadmap. **No planifica:** no propone orden de trabajo, no crea runs, no recomienda qué hacer
primero — decidir es de la cabina con el operador. **No re-emite `.project/`.** No usó git en
ninguna forma. No levantó servidores. No corrió suites ni el validador.

**No afirma Human QA ni aceptación de contenido de nada.** No certifica ningún componente, motor ni
superficie — el concepto está retirado y la matriz sigue siendo la única fuente de status. No
declara ningún run `completed`: las 3 clasificaciones `PRESENTE Y CONFORME` son una medición de
disco, **no un cierre**; el cierre es del operador desde la consola global, único punto de
serialización. No declara production readiness. No cierra D1. No decide la arista pendiente del q63
ni ningún `barrier`.

**Límites de la medición, declarados:** el juicio es *desde disco*. Un run clasificado
`SIN EVIDENCIA` puede tener trabajo hecho fuera del repo o en la cabeza del operador, y esta
medición no lo vería. Un run `PRESENTE Y CONFORME` significa que el entregable existe y satisface el
texto **leído**, no que haya pasado QA de contenido. Los `mtime` de `docs/archive/` no son fechas de
autoría (Bloque A.3). El único dato marcado `[NO VERIFICADO]` es el conteo de 336 tokens `j-*` de
q71, por diferencia de método con los «334» del texto del run.
