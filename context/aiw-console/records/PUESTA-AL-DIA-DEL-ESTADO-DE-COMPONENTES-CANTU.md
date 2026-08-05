# Puesta al día del estado de componentes — `cantu-studio` — 2026-08-05

> Encargo de taller **SIN RUN**: no existe ningún run en el canónico para este trabajo, no se
> cierra ninguno, no se cambia el `status` de ninguno, no se toca el roadmap canónico ni
> `.project/`, y no se ejecuta Git. La razón: es mantenimiento de dos superficies de estado
> (`component_status.json` y la matriz de la Definition of Done) contra lo ya medido y cerrado
> por runs anteriores — no produce trabajo de componente nuevo que el roadmap deba rastrear.
> Contenido de documentos del repo citado **verbatim en inglés**.

**Titular.** Las dos listas difieren en exactamente un componente (`columns`, presente en el
catálogo y ausente del archivo de estado). La fuente única de estado
(`COMPONENT_CERTIFICATION_MATRIX.md`) tiene **cinco contradicciones internas duras** y cuatro
tensiones de la misma causa raíz. Se pusieron al día **cinco entradas** del archivo de estado
(`list`, `iconList`, `card`, `video`, `narrative`) y **tres puntos** de la sección de matriz de
la Definition of Done; `callout` **no se tocó** porque su run está `active` ahora mismo. Los
defectos medidos y no reparados **no desaparecieron**: quedaron recogidos entrada a entrada.
El validador pasó **antes y después con cifras idénticas**.

---

## 1. Nota de interpretación, declarada antes de todo

El ticket usa «la matriz» para dos documentos distintos, y este record lo separa así:

- **La matriz de certificación** — `docs/archive/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md`,
  la «single source of component status» según la DoD §9. Es donde está medida la contradicción
  de `callout` que el criterio 2 cita (record de «Nota destacada», D7). **Se lee y se reporta; NO
  se edita**: la superficie de escritura del ticket no la incluye, y resolver sus contradicciones
  exige elegir cuál de dos lecturas manda — decisión del operador.
- **La Definition of Done** — `docs/reference/REFERENCE-COMPONENT-REVALIDATION-DEFINITION-OF-DONE.md`,
  cuyas cifras «thirty / 323» son las que el criterio 10 llama desfasadas (su §6; la matriz de
  certificación no contiene esas cifras — verificado con búsqueda). Su superficie de escritura
  autorizada es «la sección de matriz»: se leyó como las dos estructuras por-componente (la tabla
  de aplicabilidad §5 y la tabla de estados previos de §6) más la cifra de tests de §6 que el
  propio ticket señala como vencida. Toda edición fue quirúrgica y está listada en §6 de este
  record.

---

## 2. Criterio 1 — Censo de las dos listas, con su unidad

Medido hoy, no heredado:

| Lista | Unidad | Cuenta | Fuente |
|---|---|---|---|
| Archivo de estado | entradas `components[].component_id` | **16** | `.aiw/state/component_status.json` (y el validador: `Component statuses: 16`) |
| Catálogo de bloques | entradas con `flow: 'web'` | **17** | `tools/author-lite/editor-ui/src/features/editor/constants/blockCatalog.js:140-1086` (las mismas 17 claves en `WEB_COMPONENT_UI`, `:11-113`) |

**No son la misma lista, y la diferencia es exactamente una:** **`columns`** («Dos columnas»,
entrada `web-columns`, `blockCatalog.js:946-950`) está en el catálogo y **no** tiene entrada en el
archivo de estado. Las otras dieciséis coinciden id a id en ambas direcciones — ningún componente
del archivo de estado falta en el catálogo. El catálogo tiene además tres entradas `flow: 'slide'`
(`slide-title`, `slide-columns`, `slide-visual`) que no son componentes Web y no cuentan.

La ausencia de `columns` **no es un descuido nuevo**: la DoD §6 la declara (*«holding sixteen of
the seventeen components - `columns` has no entry»*) y el validador **exige exactamente las 16
entradas actuales** y no exige `columns` (`tools/project-console/validate-project-console-state.mjs:709-732`,
lista `requiredComponents`). **No se añadió ni se quitó ninguna entrada: añadir `columns` es
decisión del operador.** Si la toma, el validador de hoy la tolera (exige presencia de 16, no
ausencia de la 17ª), pero la fila de la DoD §6 y el propio censo cambiarían con ella.

## 3. Criterio 2 — Las contradicciones internas de la matriz de certificación

`docs/archive/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md`, leída entera hoy.
**Cinco contradicciones duras** — dos estados mutuamente excluyentes del mismo eje, afirmados en
presente en secciones distintas — y **cuatro tensiones blandas** de la misma causa:

| # | Componente | Un estado | El otro | Líneas |
|---|---|---|---|---|
| C1 | `callout` | `HUMAN_QA_FAILED_REPAIR_REQUIRED` — §5.1 `:99`, §7 `:186`, §10 `:312` y `:325` | `HUMAN_QA_PENDING_OR_DEFERRED` — §10 Nota Phase 2 `:329`, §12 `:386` | la que el ticket citaba, medida por el record de «Nota destacada» (D7) y verificada hoy |
| C2 | `details` | `HUMAN_QA_FAILED_REPAIR_REQUIRED` — §5.1 `:100`, §7 `:193`, §10 `:313` y `:325` | `HUMAN_QA_PENDING_OR_DEFERRED` — §10 `:329`, §12 `:387` | misma estructura que C1 |
| C3 | `video` | PASS humano explícito (`COMPONENT_QA_APPROVED_FROM_HUMAN_QA`) — §5.1 `:108`, §6.2 `:176`, §7 `:192`, §10 `:321` y `:325` | `HUMAN_QA_PENDING_OR_DEFERRED` + *«Siguiente accion: USER_VIDEO_HUMAN_QA_RESULT»* — §10 Actualización video `:339` | la actualización fechada 2026-06-22 pide un resultado que `:325` ya registró como PASS |
| C4 | `header` | `POST_CERT_COLOR_UI_REGRESSION_REPAIR_REQUIRED` — §5.1 `:96`, §5.2 `:126`, §7 `:184`, §10 `:306` y `:325` | `COLOR_PALETTE_RECONCILED` sin el flag de reparación — §10 `:329`, §12 `:382` | reparación-requerida vs reconciliado, mismo eje de color |
| C5 | `list` | `POST_CERT_COLOR_UI_REGRESSION_REPAIR_REQUIRED` — §5.1 `:95`, §5.2 `:127`, §7 `:188`, §10 `:307` y `:325` | `COLOR_PALETTE_RECONCILED` — §10 `:329`, §12 `:381` | gemela de C4 |

**Tensiones blandas (4), no computadas como contradicciones duras:** las Actualizaciones fechadas
2026-06-22 de `arithmetic` (`:331`), `hierarchy` (`:333`), `timeline` (`:335`) y la de `visual`
(`:337`) dicen `HUMAN_QA_PENDING_OR_DEFERRED` y piden `USER_*_HUMAN_QA_RESULT`, cuando la
reconciliación batch (`:325`) ya registró `HUMAN_QA_DEFERRED_OWN_TICKET_REQUIRED` para los cuatro.
«Pendiente o diferido» contiene a «diferido», así que no hay exclusión mutua de estado — pero el
«siguiente paso» que piden ya ocurrió.

**Causa raíz común, medida:** la §10 «Nota Phase 2» (`:329`), la §12 entera (`:379-388`, que se
presenta como *«estado vigente actualizado por PASS-4D Phase 2»*) y las Actualizaciones
`:331-339` quedaron congeladas en el estado **anterior** al batch de Human QA que `:325`
reconcilia. El único banner de supersede (`:327`) reemplaza **solo la recomendación** de `:329`
(*«su recomendacion … queda reemplazada»*), no sus estados. Elegir qué lectura manda y retirar o
abanderar las secciones congeladas **es decisión del operador**; este encargo no edita esa matriz.

**En la Definition of Done:** cero contradicciones internas **no declaradas**. Existe una
divergencia interna **declarada y reconciliada por el propio texto** sobre `timeline` (fila §5
«closed enum», §8 «carries the palette-regression pattern»; §5 la nombra: *«the two are
reconciled by it»*). Lo que la DoD dice de `callout` es internamente coherente — y está **vencido
contra el disco** (§5 de este record), que es otra cosa.

## 4. Criterio 3 — Qué afirma cada fuente frente al disco, componente a componente

Todo lo de la columna «disco hoy» lo medí yo en esta sesión (lectura estática de código; los
records se usaron como mapa de dónde mirar, no como fuente de verdad). «Archivo» = estado previo
a esta puesta al día.

| Componente | Archivo de estado decía | Matriz de certificación dice | Disco hoy (mediciones mías) |
|---|---|---|---|
| `list` | `POST_CERT_COLOR_UI_REGRESSION_REPAIR_REQUIRED`, `blocked_by: color_palette_sync_custom_picker_issue` | C5: `:95/:127/:188/:307/:325` repair-required vs `:329/:381` reconciled; DoD §6 lo daba como candidato S8 | El defecto **no reproduce**: `renderList.js:94` prefiere `data.color` compilado; el selector con `allowCustom` está en las dos ramas (`WebBlockEditor.jsx:3970`, `:1805-1814`, medido por el piloto; ramas verificadas hoy). Run q20 `completed`; QA del operador PASS (afirmado por cuatro records posteriores) |
| `iconList` | `EXPLICIT_HUMAN_PASS_PRESERVED`, badge-width repair histórico | `:97/:129/:173/:190/:308`: `COMPONENT_QA_APPROVED / DOCS_PENDING / NOT_CERTIFIED` — coherente | PASS preservado sigue describiendo; la reparación del badge sigue en pie. **Defectos vivos**: semilla hex hardcodeada en las tres factorías (`blockFactory.js:47` `#B48EAD`, `:247` `#5E81AC`, `:313` `#B48EAD` — verificado hoy) y texto blanco fijo sobre fondo de autor (`renderIconList.js:117-118`, `color: #FFF` — verificado hoy). Run q21 `completed` |
| `card` | `EXPLICIT_HUMAN_PASS_PRESERVED`, `NO_CURRENT_RUNTIME_REPAIR_IN_THIS_ROUND` | `:98/:130/:185/:309`: `COMPONENT_QA_APPROVED / DOCS_BATCH_PENDING` — coherente | Sin síntoma de semilla: la factoría siembra `colorToken: 'ctx'`, token id, no hex (`blockFactory.js:16-25`, verificado hoy). `renderCard.js:62` toma `directColor = getHexColor(data.color)` y `:306` lo prefiere — la viñeta §8 de la DoD «only reconciled renderers: header, list» está vencida para `card`. Run q22 `completed`, `closeout_result: "completed"` |
| `video` | `blocked_by: not_authorized_as_next_component`; `follow_up: "Keep video out of next implementation scope unless explicitly approved."` | C3: PASS explícito en cinco sitios vs PENDING en `:339` | **La autorización vencida es falsa hoy**: el run q23 corrió y está `completed` (`closeout_result: "done as specified"`) — la aprobación explícita que la frase pedía ocurrió. Sin superficie de color (`buildVideoOutput`, `compiler.js:335-340`, sin `context` — verificado hoy). **Defecto vivo**: tope de id de Vimeo dispar — schema sin tope vs `VIMEO_ID_RE = /^\d{1,32}$/` (`renderVideo.js:4`, verificado hoy) → salida en blanco sin error |
| `narrative` | `HUMAN_QA_FAILED_REPAIR_REQUIRED / REPAIR_REQUIRED` | `:187/:310/:325`: FAILED — coherente | **El defecto REPRODUCE hoy**: `top` sigue vivo en los dos schemas (`compiler-api/schemas/draftSchema.js:731`, `editor-ui:718` — verificado hoy) mientras el editor lo oculta (`editorOptions.js:33`, `legacy: true` — verificado hoy); la constante con nombre ajeno sigue (`CARD_LEGACY_MODE_VALUES`, `compiler.js:22` — verificado hoy). El run q24 `completed` lo declaró `REPAIR_REQUIRED_OWN_SCOPE`: toda superficie de reparación es compartida |
| `callout` | `HUMAN_QA_FAILED_REPAIR_REQUIRED / REPAIR_REQUIRED`; `source_refs` cita `docs/author-lite/NEXT_STEPS.md`, **que no existe en disco** (verificado hoy) | C1, la contradicción del ticket | Las cuatro mitades del defecto registrado **no reproducen** (record de hoy de «Nota destacada» §9.2); el compilador resuelve la paleta y emite los roles (`compiler.js:1142-1153`, `resolvePaletteColorTokenIfDefined` + `buildColorRolesOutput` — verificado hoy), así que la fila `callout` de la DoD §5 («no - regression pattern») y la excepción §8 están vencidas contra disco. **Run q31 `active` — NADA SUYO SE TOCÓ** |

## 5. Criterio 4 — Estado de cada run en el canónico, y qué se actualizó

Del canónico `.aiw/roadmap/roadmap.json` (73 runs), antes de tocar nada:

| Componente | Run | `queue_order` | `status` | `closeout_result` | ¿Entrada actualizada? |
|---|---|---|---|---|---|
| `list` | `RUN-JAME-WEB-LIST-REVALIDATION-001` | 20 | `completed` | — | **Sí** |
| `iconList` | `RUN-JAME-WEB-ICONLIST-REVALIDATION-001` | 21 | `completed` | — | **Sí** |
| `card` | `RUN-JAME-WEB-CARD-REVALIDATION-001` | 22 | `completed` | `"completed"` | **Sí** |
| `video` | `RUN-JAME-WEB-VIDEO-REVALIDATION-001` | 23 | `completed` | `"done as specified"` | **Sí** |
| `narrative` | `RUN-JAME-WEB-NARRATIVE-REPAIR-001` | 24 | `completed` | `"done as specified"` | **Sí** |
| `callout` | `RUN-JAME-WEB-CALLOUT-REPAIR-001` | 31 | **`active`** | — | **NO — run abierto, es el taller paralelo** |

**Sobre la firma de QA.** El canónico no lleva un campo de veredicto de QA separado y
`.aiw/state/events.jsonl` no registra estos cierres; los packets de operador tienen la columna de
veredicto vacía **por diseño** (*«Verdicts return to the operator»*). La firma se estableció así:
el cierre de un run lo ejecuta **solo el operador** desde la consola global (CLAUDE.md, DoD §6:
*«The operator alone: executing Human QA … and closing runs from the console»*), y la QA humana es
la compuerta de cierre que el `full_description` de estos runs fija — de modo que **`completed` en
el canónico es el acto de cierre del operador tras su compuerta de QA**. Para `list` hay además
afirmación explícita en cuatro records (desde `REVALIDACION-COMPONENTE-LISTA-CON-ETIQUETAS-CANTU.md`
DIV-3: *«El run de `queue_order` 20 cerró con QA del operador en PASS»*). Para `narrative`, el
cierre no borra el defecto: el taller lo reprodujo y lo declaró fuera de alcance, y esta puesta al
día **lo conserva**.

**Qué cambió en `.aiw/state/component_status.json`** (cinco entradas; ninguna clave añadida ni
retirada del esquema por entrada; `projection_only`, `source_of_truth`, `global_no_claims`,
`source_conflicts` y las otras once entradas intactos):

- **`list`** — `human_qa_status` → `EXPLICIT_HUMAN_PASS_PRESERVED`; `repair_status` →
  `NO_CURRENT_RUNTIME_REPAIR_IN_THIS_ROUND`; retirado `color_palette_sync_custom_picker_issue` de
  `blocked_by` (no reproduce + QA PASS); `follow_up_required` recoge los cinco defectos medidos
  pendientes de veredicto; el conflicto AGENTS-versus-matrix **se preserva** (en `docs_status`,
  `notes` y el `source_conflicts` raíz, sin tocar).
- **`iconList`** — estados sin cambio (seguían exactos); `status_summary`, `follow_up_required`,
  `source_refs` y `notes` recogen el run 21 cerrado y los seis defectos vivos.
- **`card`** — estados sin cambio; recoge el run 22 y los siete defectos vivos.
- **`video`** — retirado `not_authorized_as_next_component` de `blocked_by` y el
  `follow_up_required` vencido («Keep video out…»): la autorización que pedían ocurrió (run
  activado y cerrado por el operador). Recoge los ocho defectos vivos.
- **`narrative`** — `repair_status` `REPAIR_REQUIRED` → **`REPAIR_REQUIRED_OWN_SCOPE`** (valor ya
  existente en el archivo, entrada `details`); `human_qa_status` **se mantiene**
  `HUMAN_QA_FAILED_REPAIR_REQUIRED` porque el defecto reproduce; recoge las dos mitades
  reproducidas (autorizadas, fuera de alcance) y los ocho defectos adicionales.

**Qué cambió en la DoD** (tres puntos, todos en las estructuras de matriz):

1. §6, límite automatizado: `thirty` → `thirty-six` y `323` → `398`, con la marca *«Measured
   2026-08-05 (static count, not an execution)»*. El resto de la frase (8 archivos en
   `tools/roadmap/tests/`, cuatro `package.json` sin script `test`, `compiler-api` sin clave
   `scripts`) **sigue exacto hoy y no se tocó** — verificado: son 4 `package.json` contando
   `tools/prototypes/author-lite-workbench-v1/`, ninguno declara `test`, y
   `compiler-api/package.json` no tiene `scripts`.
2. §6, tabla de estados previos: `list` movida de la fila «Mixed, with preserved conflicts» a la
   fila `EXPLICIT_HUMAN_PASS_PRESERVED`, con la procedencia de su PASS dicha en la celda; la fila
   «Mixed» queda con `header` y anota que la observación de `list` fue consumida y su conflicto
   AGENTS-versus-matrix sigue preservado.
3. Nada más. La tabla §5 **no se tocó**: las filas de los cinco componentes cerrados coinciden con
   el disco (verificado), y las filas vencidas (`callout`) o potencialmente vencidas (`details`,
   `conceptGrid`, `table`, `rule`) pertenecen a componentes con run abierto o `planned` — ver §8.

## 6. Criterio 5 — Defectos vivos por componente

Ninguno desapareció. Dónde se recogieron: **el archivo de estado tiene dónde** —
`follow_up_required` y `notes` son texto libre por entrada— y ahí quedaron apuntados, por conteo y
con su record como fuente de detalle. **La DoD no tiene dónde** recoger defectos vivos por
componente (su §8 es una lista fija de excepciones de procedimiento, no un registro), **y no se
inventó un campo**.

| Componente | Defectos vivos | Detalle |
|---|---|---|
| `list` | **5** (D1-D5) | pendientes de veredicto — guardias de texto ausentes, resolución fuera-de-paleta compartida, tres defectos del packet canónico |
| `iconList` | **6** (D1-D6) | pendientes de veredicto — semilla hardcodeada, contraste del badge, dos del packet, guardias, campos huérfanos del renderer |
| `card` | **7** (D1-D7) | pendientes de veredicto — compuerta de badge sin dueño, dos-de-cuatro modos, descarte silencioso en `code`, contraste, `textScale`, punteros del packet |
| `video` | **8** (D1-D8) | pendientes de veredicto — id de Vimeo con salida en blanco, query descartada, dos parsers de URL, id aleatorio del motor, punteros |
| `narrative` | **10** (D1-D10) | **D1-D2 reproducidos y autorizados por QA, fuera de alcance del run de componente** (informe de opciones en el record de «Texto» §16); D3-D10 pendientes de veredicto |
| `callout` | **10** (D1-D10) | del record de hoy de «Nota destacada»; **su entrada no se tocó** (run activo); incluye C1 (la matriz contra sí misma) y el `source_ref` muerto de su propia entrada |

Total: **46 defectos medidos vivos**, cero reparados por este encargo.

## 7. Criterio 6 — Vocabulario derivado del dato en disco

Conjunto de valores realmente presentes en `component_status.json` antes de esta escritura (por
campo; los valores usados en la puesta al día se marcan con ✔ y **todos existían ya**):

- `human_qa_status`: `DROPDOWN_BEHAVIOR_PASSED_FROM_OPERATOR_REPORT_COLOR_DESYNC_OBSERVED`,
  `HISTORICAL_MANUAL_QA_APPROVED_PER_AGENTS_PHASE2_COLOR_UI_ISSUE_ACTIVE_PER_MATRIX`,
  `EXPLICIT_HUMAN_PASS_PRESERVED` ✔, `HUMAN_QA_FAILED_REPAIR_REQUIRED` ✔ (conservado),
  `HUMAN_QA_FAILED_REPAIR_REQUIRED_WITH_OLDER_NOT_STARTED_CONTEXT`,
  `HUMAN_QA_FAILED_REPAIR_REQUIRED_FOR_RULE_COMPONENT_SMART_FORMULA_CASE_H_RULE_ONLY_PASS_SEPARATE`,
  `HUMAN_QA_DEFERRED_OWN_TICKET_REQUIRED`, `HUMAN_QA_PENDING_OR_DEFERRED_NO_EXPLICIT_RESULT`.
- `repair_status`: `HEADER_HIERARCHY_DROPDOWN_REPAIR_COMMITTED_A6B0213F_COLOR_PALETTE_SYNC_OPEN`,
  `POST_CERT_COLOR_UI_REGRESSION_REPAIR_REQUIRED`,
  `LABEL_ICONLIST_BADGE_WIDTH_REPAIR_VISIBLE_IN_COMMIT_HISTORY` ✔ (conservado),
  `NO_CURRENT_RUNTIME_REPAIR_IN_THIS_ROUND` ✔, `BOUNDED_BEHAVIOR_ONLY_NO_NEW_WORK_THIS_ROUND` ✔
  (conservado), `REPAIR_REQUIRED`, `REPAIR_REQUIRED_OWN_SCOPE` ✔,
  `REPAIR_REQUIRED_OR_DEFERRED_NO_RUNTIME_WORK_THIS_ROUND`, `DEFERRED_OWN_TICKET_REQUIRED`,
  `PENDING_OR_DEFERRED`.
- `docs_status`: `DOCS_APPROVED_WITH_CURRENT_STATUS_CONFLICT_NOTED`,
  `DOCS_APPROVED_WITH_STATUS_CONFLICT_NOTED` ✔ (conservado), `DOCS_PENDING` ✔ (conservado),
  `DOCS_BATCH_PENDING` ✔ (conservado), `HUMAN_QA_PACKET_READY` ✔ (conservado),
  `HUMAN_QA_PACKET_READY_COMPONENT_QA_APPROVED_FROM_HUMAN_QA` ✔ (conservado),
  `RULE_ONLY_NO_CLAIMS_RECONCILED_IN_OPS`.
- `certification_status`: `COMPONENT_HISTORY_CERTIFIED_NOT_WEB_GLOBAL_CERTIFIED` ✔ (conservado),
  `NOT_CERTIFIED` ✔ (conservado).

**El estado real de los cinco componentes cupo entero en este vocabulario. No se acuñó ningún
valor nuevo**, y por eso no se disparó la condición de PARA Y REPORTA del criterio 6. (La DoD §6
usa los mismos tokens en su tabla de estados previos; tampoco allí se estrenó ninguno.)

## 8. Qué NO se actualizó, y por qué

- **`callout`, nada suyo** — entrada del archivo, fila §5 de la DoD (vencida contra disco), texto
  §5 (*«Five accept … (`callout`, …)»* — hoy son cuatro), excepción §8. **Su run está `active`**
  (es el taller paralelo) y el criterio 4 lo prohíbe. Sus cuatro divergencias quedan aquí
  reportadas para cuando su run cierre.
- **`header`** — run q15 `completed`, pero no es de los seis del encargo, su record no está en la
  lectura del ticket y su estado no se midió aquí; tocarlo sería expandir.
- **Las filas §5 de `details`, `conceptGrid`, `table`, `rule`** — posiblemente vencidas por el
  trabajo de paleta (el test del run 19 cubre «las cinco del patrón»), pero sus runs están
  `planned`, sin QA firmada; el criterio 4 las excluye. Sus runs las medirán.
- **`COMPONENT_CERTIFICATION_MATRIX.md`** — fuera de la superficie de escritura; sus cinco
  contradiciones exigen decisión del operador (§3).
- **Los punteros muertos** — `docs/author-lite/NEXT_STEPS.md` citado por `source_refs` de varias
  entradas **no existe en disco** (verificado hoy); los packets canónicos arrastran la pareja
  conocida. «Reparar derivas conocidas: … punteros muertos» está **expresamente fuera de alcance**,
  así que los `source_refs` heredados se dejaron intactos y solo se **añadieron** referencias
  nuevas (canónico y packet de cada run).
- **El banner de la DoD** (`Status: Draft | Last verified: 2026-07-28`) — no se re-verificó el
  documento entero; las ediciones llevan su propia fecha inline.
- **`columns`** — no se añadió (decisión del operador, §2).
- El roadmap canónico, `.project/`, el `status` de cualquier run, `docs_index.json`, los packets,
  la Guía, los contratos, el catálogo de bloques, y todo código.

## 9. Criterios 7 y 9 — Validador, antes y después

Comprobación previa hecha: el validador **sí** depende de `component_status.json`
(`validate-project-console-state.mjs:703-749`) — exige `source_of_truth: false`,
`projection_only: true`, las **16** entradas nombradas (sin `columns`), once claves por entrada y
`generator_safe: false` en todas. Ninguna de esas condiciones se alteró.

**ANTES** (primera acción de la sesión, vía que no escribe, desde `projects/cantu-studio`):

```
Project Console state validation passed.
Roadmap v3 prototype: 7 objectives / 28 phases / 73 runs; queue groups needs_human_decision=0 now=1 ready_next=14 later=26 history=32
Roadmap v3 active run derived stages: RUN-JAME-WEB-CALLOUT-REPAIR-001=none
Docs indexed: 149
Docs curated primary-visible: 60 of 149 registered
Component statuses: 16
Git provenance episodes: 9
Git history snapshot: 508 commits / 1 branches (1 visible, 0 backup hidden); current=main; run-associated=3; source=local_git_autosync
Roadmap rebase warnings (non-blocking):
- .aiw/roadmap/roadmap.json run RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 depends on RUN-CANTU-ROADMAP-CONTENT-AUDIT-001, which does not resolve in this roadmap. With a single roadmap loaded this cannot be decided: it may be a legal external dependency — a run that lives in another project (CONTRATO §10.d Regla 2) — or a typo in the run id. Both are possible and one loaded roadmap cannot tell them apart; resolve it against the full set of projects to distinguish external from write error.
```

**DESPUÉS** (tras las siete ediciones): **salida íntegramente idéntica a la de arriba**, línea a
línea — `Project Console state validation passed.`, mismas cifras, mismo aviso conocido no
bloqueante (la dependencia cross-project legal; no es hallazgo).

**Cifras medidas que el ticket no daba a propósito:** total de runs **73**; `history=32`;
`ready_next=14`; además `now=1`, `later=26`, `needs_human_decision=0`; componentes contados por el
validador: **16**. No se puso rojo; no hubo que restaurar.

## 10. Criterio 10 — Las cifras del ticket, verificadas una a una

| Cifra del ticket | Medida hoy | Veredicto |
|---|---|---|
| 16 entradas en el archivo de estado | **16** | exacta |
| 17 en el catálogo | **17** (`flow: 'web'`) | exacta |
| no son la misma lista | la diferencia es exactamente `columns` | confirmada |
| 6 componentes revalidados | **6 records** cerrados; **5 runs `completed` + 1 `active`** (`callout`) | exacta como records; el sexto run sigue abierto |
| 36 archivos de test | **36** en `tools/author-lite/compiler-api/tests/` | exacta — **recuento estático** |
| 398 declaraciones | **398** (`grep -c "^test("` sobre los 36) | exacta — **recuento estático, no ejecución: la suite no se corrió** |
| la matriz dice 30 y 323 | la DoD §6 decía `thirty`/`323` (la matriz de certificación no contiene esas cifras) | desfasado confirmado → **actualizado a 36/398 con marca de recuento estático** |

## 11. Archivos escritos — dos, y ninguno más

1. `projects/cantu-studio/.aiw/state/component_status.json` — cinco entradas puestas al día.
2. `projects/cantu-studio/docs/reference/REFERENCE-COMPONENT-REVALIDATION-DEFINITION-OF-DONE.md` —
   tres ediciones en §6 (cifras de test; dos filas de la tabla de estados previos).

Más este record. Ningún otro archivo se creó, modificó ni borró.

## 12. Lo que este encargo NO hizo

- **No tuvo run, y por eso no cerró ninguno**: mantenimiento de superficies de estado contra
  mediciones ya cerradas, sin trabajo de componente nuevo que rastrear en el roadmap.
- No revalidó ningún componente ni reparó ningún defecto de código — los 46 vivos siguen vivos.
- No tocó nada de `callout` (editor, compilador, renderer, tests, packet, entrada, filas) — su
  taller corre en paralelo. **No corrió la suite** (recuento estático solamente).
- No editó la matriz de certificación, el catálogo, la Guía, los packets, `docs_index.json`, los
  contratos, el roadmap canónico, `.project/`, ni clasificó runs. No ejecutó Git ni levantó
  servidores.
- No reparó derivas conocidas: mojibake, punteros muertos (incluido el `NEXT_STEPS.md` de los
  `source_refs`), el CLI local de roadmap, los HTML huérfanos, el anidamiento de fórmulas del
  insertor.
- No añadió `columns` al archivo de estado ni quitó entrada alguna.
- **Ninguna condición de PARA Y REPORTA se disparó**: el estado real de los cinco cupo en el
  vocabulario existente (§7); no hizo falta añadir/quitar entradas (la diferencia de listas se
  resuelve reportándola — añadir `columns` queda como decisión del operador, §2); el validador
  nunca se puso rojo (§9); las dos listas difieren de forma declarada y de resolución operatoria,
  no ambigua; y el trabajo no creció hacia revalidar ni reparar.

## 13. Procedencia

- Canónico: `projects/cantu-studio/.aiw/roadmap/roadmap.json` (73 runs), leído y no escrito.
- Records consumidos como mapa (cada afirmación re-medida en disco):
  `PILOTO-REVALIDACION-COMPONENTE-LISTA-CANTU.md`,
  `REVALIDACION-COMPONENTE-LISTA-CON-ETIQUETAS-CANTU.md`,
  `REVALIDACION-COMPONENTE-TARJETA-CANTU.md`, `REVALIDACION-COMPONENTE-VIDEO-CANTU.md`,
  `REVALIDACION-COMPONENTE-TEXTO-CANTU.md`, `REVALIDACION-COMPONENTE-NOTA-DESTACADA-CANTU.md`.
- Fuentes leídas: `COMPONENT_CERTIFICATION_MATRIX.md` (422 líneas, entera),
  la Definition of Done entera, `blockCatalog.js`, `blockFactory.js`, los dos `draftSchema.js`,
  `compiler.js`, `renderList.js`, `renderIconList.js`, `renderCard.js`, `renderVideo.js`,
  `editorOptions.js`, el validador entero, `events.jsonl`, los packets de operador.
- Validador: `node tools/project-console/validate-project-console-state.mjs`, antes y después,
  salida completa en §9.
