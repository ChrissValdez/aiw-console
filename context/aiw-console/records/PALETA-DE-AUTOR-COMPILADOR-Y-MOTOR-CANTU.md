# Paleta de autor a través del compilador y el motor Web — ejecución del run 19

**Proyecto escrito:** `cantu-studio` (código, tests, packet de QA) y `aiw-console` (este record).
**Fecha:** 2026-08-01. **Tipo:** encargo de taller que ejecuta un run del canónico.
**Run derivado:** `RUN-CANTU-AUTHOR-PALETTE-COMPILER-ENGINE-001`, `queue_order` **19**, título verbatim
`Carry the author palette through the compiler and the Web engine` — **LA GUARDA PASA**; objetivo O5
«Editor and Engine Shared Features», fase O5.P5, `status: active`, `depends_on:`
`RUN-JAME-COLOR-PALETTE-COMPATIBILITY-CONTRACT-001` + `RUN-CANTU-COLOR-SELECTOR-UNIFICATION-001`.
md5 del canónico: `E069249F635B55CEC08A262687106D70` al derivar y al cerrar — idéntico; el canónico
no se tocó.

**Resultado en una línea:** el hueco está cerrado por la ruta del compilador — los cinco componentes
del patrón de regresión (`callout`, `rule`, `details`, `conceptGrid`, `table`) ahora compilan el
accent resuelto contra la paleta activa y sus cinco renderers lo prefieren, exactamente el patrón ya
certificado de `header`/`list`/`card` — con emisión **condicionada a que la paleta defina el id**,
de modo que **ningún draft existente cambia de color renderizado** (medido: los 55 drafts usan sólo
los 9 tokens por defecto, cuyos accents son hex-idénticos al mapa fijo), **los alias de feedback
siguen intactos** (la decisión abierta 4 del contrato de color queda sin decidir), y el cableado
queda protegido por **13 tests nuevos** más 4 shapes fijados actualizados — **140/140 verdes** en
los 14 archivos corridos con `node --test`.

**Ninguna condición de PARA Y REPORTA se disparó** (§6). Las dos rutas coinciden en lo que el autor
ve sobre el estado actual del disco; la elegida no toca los conjuntos cerrados del compilador, ni el
motor Slide, ni cambia el color de ningún draft, ni exige decidir nada de la paleta del operador.

---

## 1. Criterio 1 — Medición, con archivo y línea (estado ANTES del cambio)

### 1.1 Qué componentes emitían color resuelto desde el compilador y cuáles sólo el id

`tools/author-lite/compiler-api/services/compiler.js` (líneas pre-cambio):

| Componente | Emite | Evidencia |
|---|---|---|
| `header` | `variant` + `color` resuelto | compiler.js:1066 `color: resolveVariantAccentColor(block.variant, context)` |
| `list` | `variant` + `color` resuelto | compiler.js:1108 |
| `card` | `color` resuelto desde `colorToken`, o el hex del autor | compiler.js:150-172 `resolveCardColor`; emitido en :305/:333/:356 |
| `callout` | **sólo `variant`** | compiler.js:1077-1084 |
| `rule` | **sólo `variant`** | compiler.js:362-373 `buildRuleOutput` |
| `details` | **sólo `items[].variant`** | compiler.js:375-383 |
| `conceptGrid` | **sólo `items[].variant`** | compiler.js:385-396 |
| `table` | **sólo `variant`** (+ `badgeColor` de enum cerrado) | compiler.js:513-528; badge :479-511 |

`iconList` (items :272-281), `hierarchy` (nodos :899) y `visual` (:287) pasan hex del autor sin
resolver — «preserved unchanged», fuera del patrón. `split` (:646-693) y `timeline`
(detailsVariant :1038) emiten ids de enums cerrados del compilador (:66 `SPLIT_VARIANT_VALUES`,
:55 `TIMELINE_DETAILS_VARIANT_VALUES`) — run del `queue_order` 29.

### 1.2 Renderers del motor Web: mapa fijo, color compilado, mapa propio

**Diez renderers consultan el mapa fijo** (`Commons.VARIANTS` de
`src/builders/web/partials/commons.js`), verificado con barrido: renderBadge.js:12,
renderCallout.js:27, renderCard.js:296-298, renderDetails.js:54, renderHeader.js:18/22,
renderHierarchy.js:20-21, renderList.js:92, renderRule.js:13, renderSplitCard.js:9,
renderTable.js:12. **Diez archivos exactos.**

**Preferían color compilado (pre-cambio):** renderHeader.js:49-52
(`directAccent || resolveVariantAccent(...)`) y renderList.js:94
(`normalizeHexColor(data.color) || palette.color`) — los dos que nombra el DoD como «the only
reconciled renderers». Matiz medido y declarado: renderCard.js:62/:306 también prefiere
`data.color`, como parte del diseño de `colorToken` de card; el DoD cuenta a card por el lado del
compilador.

**Tres renderers con mapa fijo PROPIO:** renderArithmetic.js:17-28 (`SYSTEM_PALETTE` por divisor
primo, + `THEME_COLOR` :31), renderTimeline.js:10-15 (objeto `C` con hex literales),
renderConceptGrid.js:3+:47-49 (`src/design/tokens/tokens.js`, fallback propio `tokens.clean`
#D8DEE9). Los `main` de tokens.js son hex-idénticos a los accents por defecto para los 9 roles
(def/ctx/ex/focus/str/res/wrn/err/meta) — medido valor a valor.

### 1.3 Las claves del mapa fijo, contadas cargando el módulo

`require('src/builders/web/partials/commons.js')` →
`VARIANTS` = **13 claves**: `def, ctx, ex, meta, focus, str, res, success, wrn, warning, err,
error, code`; `PALETTE` = **10 claves**: `gray, blue, purple, cyan, gold, champagne, green,
orange, red, code`. De las 13, **cuatro no tienen token en la paleta del autor**: los tres alias
de feedback `success`/`warning`/`error` (commons.js:82/84/86, «Alias») y `code`.

### 1.4 Superficie de color en el editor y en cada schema

Editor (`WebBlockEditor.jsx`; el selector unificado `VariantSelect`/`ColorTokenOrCustomField` de
`common/VariantSelect.jsx` ofrece **la paleta activa entera** vía `getAuthorColorOptions`,
VariantSelect.jsx:79/:145): header :3913-3924 (+hijo de columns :1774-1788), card :1180/:1202/
:1229/:3937, callout :3946 (+columns :1968-1973), list :3971 (único con `allowCustom`), rule
:4032 (+columns :1879-1884), details por item :2435, conceptGrid por item :2581, table :3070.
Cerrados en el editor: badge de table :2996-3007 (lista :334-336), split :1683-1684, timeline
«Tipo detalle» :3797-3808 (lista :58). Hex directo: hierarchy :3395-3414, iconList :1869/:4015.

Schemas — `tools/author-lite/compiler-api/schemas/draftSchema.js` /
`tools/author-lite/editor-ui/src/schemas/draftSchema.js`: token abierto (regex `COLOR_TOKEN_ID`)
en callout :717/:724 ↔ :704/:711, rule :778 ↔ :750, details items :323 ↔ :320, conceptGrid items
:333 ↔ :330, table :809 ↔ :781; token-o-hex en header :568 ↔ :555 y list :752 ↔ :727; card
:644-645 ↔ :632; enums cerrados en split :868 ↔ :840, timeline :482 ↔ :479, badge :28+:396 ↔
:28+:393; sólo-hex en iconList :296, hierarchy :452, visual :304. Los dos schemas son espejo en
esta superficie. (El mojibake de los mensajes de error del schema se cruzó en la lectura y **no se
tocó** — deriva declarada con dueño ajeno.)

**El defecto, confirmado en el cruce:** los cinco con token abierto en schema+editor emiten sólo el
id (§1.1) y sus renderers resuelven contra mapa (§1.2) con fallback silencioso a `ctx`
(`Commons.VARIANTS[k] || Commons.VARIANTS.ctx`) — o a `tokens.clean` en conceptGrid.

### 1.5 Discrepancias con records previos, declaradas

- `MEDICION-PIEZAS-COMPARTIDAS-COMPONENTES-CANTU.md` midió el canónico **antes** de la inserción
  de los tres runs de piezas compartidas: entonces `queue_order` 19 era IconList y los quince
  ocupaban 18..32. Hoy 19 es este run y el de los enums cerrados es 29
  (`RUN-CANTU-COMPILER-VARIANT-GATES-001`, «Align the compiler variant gates with the author
  palette», verificado en el canónico de hoy). **Gana el disco**; la renumeración viene de
  `INSERCION-TRES-RUNS-PIEZAS-COMPARTIDAS-CANTU.md`.
- Ese mismo record ya había corregido «doce claves» → **trece**; esta medición confirma trece
  cargando el módulo.
- El DoD (refrescado hoy, run 17 `completed`) fija en su §5 la misma partición 3/3/5/2 que esta
  medición reproduce desde disco. Sin divergencia.

## 2. Criterio 2 — Las dos rutas, comparadas con números

Hecho de arquitectura que gobierna la comparación: el motor llama `renderer(section.data)`
(`buildSingleWebLesson.js:139`) — **el único canal paleta→renderer es el dato compilado del
bloque**. Preview Real, Compile Web y Generate Web comparten `compileDraftToJameData`
(previewRenderer.js:4/:684/:695/:741) — «agree by construction».

| | **Ruta (a): el compilador resuelve** | **Ruta (b): los renderers prefieren color compilado** |
|---|---|---|
| Qué hace sola | Emite `color` para los cinco; **0 de sus 5 renderers leía `data.color`** (medido §1.2) → el autor no ve nada | Los 5 renderers prefieren `data.color`; **el compilador no lo emitía para los cinco** (medido §1.1) → el autor no ve nada en contenido Author Lite |
| Componentes que toca | callout, rule, details, conceptGrid, table | los mismos cinco |
| Archivos | compiler.js (1) | renderCallout/renderRule/renderDetails/renderConceptGrid/renderTable (5) |
| Si el dato falta | La salida gana un campo que nadie pinta | El renderer cae al mapa: contenido Core/sandbox intacto (medido: **0 bloques** de los cinco con `color` en los fixtures sandbox) |
| Mapas propios | No los ve | conceptGrid: la preferencia se antepone a su mapa `tokens`; arithmetic y timeline no tienen superficie abierta → no se tocan |

**Ninguna mitad sola cierra el hueco: son las dos mitades del patrón de reconciliación ya
certificado para header/list** — así lo evidencia
`webLegacyCertifiedColorPaletteReconciliation.test.mjs`, que afirma AMBAS mitades a la vez, y el
contrato de color §8, que registra la reparación de header/list como el par completo. **Se eligió
e implementó la ruta (a) — la resolución vive en el COMPILADOR — con su contraparte mínima de
preferencia en los cinco renderers (el patrón exacto de renderHeader:49/renderList:94).** El scope
del ticket lo contempla («compiler.js **y/o** src/builders/web/**»).

**Por qué no la (b) como dueña de la resolución:** el contrato de color fija que «the Editor saves
the reference, the compiler resolves it against the active Web palette, and the Web Engine renders
it»; los renderers no conocen la paleta ni tienen canal para conocerla (§ arquitectura), así que
una ruta renderer-céntrica exigiría inventarle al motor un canal nuevo de paleta — más blast, sin
precedente, y contradiciendo el contrato. La (a) extiende un patrón certificado sin superficie
nueva.

**El refinamiento de la (a), declarado:** header/list/card emiten SIEMPRE con fallback `ctx`
(decidido en su reconciliación certificada). Los cinco nuevos emiten **sólo si la paleta activa
define el id** (`resolvePaletteAccentColorIfDefined`, compiler.js). La divergencia es deliberada y
es lo que mantiene el run dentro de sus fronteras: emitir-siempre habría hecho que `success` en un
callout compilara azul `ctx` en vez del verde del alias del motor — es decir, **habría hecho
importar a los alias** (STOP del criterio 9) y habría cambiado comportamiento potencial sin
decisión del operador. Con la emisión condicional, un id fuera de la paleta no emite nada y el
motor conserva su comportamiento actual completo. Unificar header/list/card a la regla condicional
cambiaría su comportamiento ya certificado — **no se hizo** y queda declarado (§8).

## 3. Criterio 3 — Las rutas ante lo que el autor ve: NO difieren sobre el disco actual

Con la paleta activa por defecto (no existe `src/content/author_lite/metadata/` en disco → no hay
paletas guardadas → activa = `DEFAULT_AUTHOR_LITE_COLOR_PALETTE`), los 9 accents son hex-idénticos
a los del mapa fijo (medido token a token, §1.3) y los drafts sólo usan esos 9 tokens (§4). Ambas
rutas — y su combinación implementada — dejan **cada píxel de cada draft existente exactamente
igual**. La diferencia entre rutas es de implementación, no de resultado visible hoy. **El STOP
del criterio 3 no se dispara.**

## 4. Criterio 4 — Drafts existentes, medidos

**55 archivos JSON** con `webBlocks`/`slideBlocks` (8 drafts internos del almacén + QA/temp +
roundtrips). Bloques con superficie en los componentes de interés: callout **65**, table **48**,
rule **42**, details **6**, conceptGrid **6** (más card 59, header 186, list 13). Valores usados
en variant/colorToken/itemVariants/badgeVariants — censo completo: `ctx` 92, `err` 44, `res` 44,
`def` 41, `wrn` 41, `focus` 20, `meta` 18, `str` 18, `ex` 10, más `metric`/`code`/`persona` (4
c/u, tipos de card, no tokens) y un hex congelado `#434C5E` en una card metric. **Cero alias,
cero tokens custom, cero hex en los cinco afectados.**

**Ningún draft cambia de color renderizado.** Bajo paleta por defecto la emisión nueva produce el
mismo hex que el mapa pintaba; para ids fuera de paleta no hay emisión. Lo que SÍ cambia, y se
declara: **la salida compilada** (Generate/Compile/Preview) de los drafts que usan los cinco
componentes **gana un campo `color`** con el mismo hex que ya se pintaba — cambio de forma, no de
píxel. Los artefactos ya generados en `src/content/author_lite/generated/` quedan sin regenerar
(regenerarlos es del operador).

## 5. Criterio 5 — Tests: cero verificado, trece escritos, salida pegada

**Verificación del cero:** 30 archivos `*.test.mjs` en `tools/author-lite/compiler-api/tests/`;
**0** combinan paleta activa con un renderer de los cinco afectados (barrido programático:
`webColorPalette|colorPalette` ∧ `renderCallout|renderRule|renderDetails|renderConceptGrid|`
`renderTable`). El cableado de header/list/card sí estaba protegido
(`webLegacyCertifiedColorPaletteReconciliation.test.mjs`); el de los cinco, por nadie. **Cifra del
ticket: exacta.** También verificado: **4** `package.json` en el repo (author-lite, compiler-api,
editor-ui, prototypes/author-lite-workbench-v1) y **ninguno declara script `test`** — se corre
`node --test <ruta>`, la vía que el DoD refrescado fija como frontera.

**Nuevo:** `tools/author-lite/compiler-api/tests/webAuthorPaletteCompilerEngineReconciliation.test.mjs`
— 13 tests: token de paleta → color pintado (los cinco, dos paletas cuyo resultado difiere); token
custom de punta a punta; id no definido → **sin campo `color`** y cada renderer en SU fallback
declarado (`success` → verde del alias del motor, no ctx; desconocido → ctx `#5E81AC` en cuatro,
`tokens.clean` `#D8DEE9` en conceptGrid); sin paleta → hex del mapa y píxeles idénticos (incl. bg
`#FCF7F5` del callout); bloque Core sin `color` → intacto; hijos de columns con contexto; badge de
table pintando el `res` del mapa aunque la paleta redefina `res` (frontera del run 29);
header/list/card sin cambio; roundtrip Draft JSON sin `color` persistido.

**Ampliados (4):** un `deepEqual` de shape compilado por archivo, para el campo `color` nuevo:
`webTableSafety.test.mjs`, `webTablesParitySchemaCompiler.test.mjs`,
`webConceptGridSafety.test.mjs`, `webColumnsChildExpansionSafety.test.mjs`.

**Corridos** (no la suite completa; los tocados + los directamente relacionados, 14 archivos):
el nuevo, los 4 ampliados, y `webLegacyCertifiedColorPaletteReconciliation`,
`webTheoryTextBlocksSafety`, `webTheoryCardsRuleBoxesParitySafety`, `webRuleMathAuthoringIntegration`,
`authorLiteColorSystem`, `webSharedColorSelectorUnification`, `webColorSelectorCustomPicker`,
`webHeaderColorPaletteAuthoringSurface`, `webHeaderPaletteQuantityAndSwatch`.

```
node --test <14 archivos>   →   ℹ tests 140   ℹ pass 140   ℹ fail 0
(archivo nuevo aislado:          ℹ tests 13    ℹ pass 13    ℹ fail 0)
```

Los 4 fallos intermedios durante el desarrollo fueron los 4 shapes fijados esperando la salida
antigua; se actualizaron con el hex correcto por defecto (`#5E81AC` ctx, `#B48EAD` def,
`#C2B280` focus) y quedaron verdes.

## 6. Condiciones de PARA Y REPORTA, evaluadas una a una

| Condición (criterios 3, 9, 14) | ¿Se dispara? | Evidencia |
|---|---|---|
| Canónico no casa con el Objective | **No** | título verbatim en queue 19 (§ cabecera) |
| Las rutas difieren en lo que el autor ve | **No** | §3 — coinciden sobre el disco actual |
| Exigiría tocar los conjuntos cerrados del compilador | **No** | split/timeline/badge intactos; test de frontera del badge |
| Exigiría tocar el motor Slide | **No** | `compileSlideItem` no pasa por los builders tocados; 0 escrituras bajo `src/builders/slides/` |
| Cambiaría el color renderizado de un draft existente | **No** | §4 — censo completo |
| Exigiría decidir sobre la paleta del operador | **No** | emisión condicional: alias (decisión 4) y roles no-accent (decisión 6) quedan abiertos tal cual |
| Criterio 9: ¿la ruta hace importar a los alias? | **No** | id fuera de paleta → sin emisión → motor intacto; test que fija `success` → verde del alias |

## 7. Diff conceptual de lo escrito

**`tools/author-lite/compiler-api/services/compiler.js`** — nuevo
`resolvePaletteAccentColorIfDefined(variant, options)`: resuelve el id contra la paleta activa y
devuelve el accent **sólo si `token.id === variantId`**; en otro caso `undefined` y no se emite.
Aplicado en: case `'callout'`, `buildRuleOutput`, `buildDetailsOutput` (por item),
`buildConceptGridOutput` (por item), `buildTableOutput` — cada uno con
`...(accentColor ? { color: accentColor } : {})` — y sus call sites ahora reciben `context`. El
camino Slide no pasa por estos builders: sin cambio.

**Cinco renderers** (`src/builders/web/partials/`) — la preferencia mínima de renderHeader/
renderList, con helper local `normalizeHexColor` (patrón existente): renderCallout.js (accent en
borde, icono y título 'theme'; **bg sigue saliendo del mapa** — sólo el accent viaja),
renderRule.js (bg del header; contraste sigue atado al id — declarado), renderDetails.js (por
item), renderConceptGrid.js (por item, antepuesto a su mapa `tokens`), renderTable.js (`C.main`;
badge explícitamente fuera).

**Sin tocar:** commons.js, el mapa fijo y sus 13 claves; los enums del compilador; el editor;
los schemas; el motor Slide; ningún draft; `.aiw/docs/docs_index.json`;
`.aiw/state/component_status.json`; `.project/`; el canónico.

## 8. Criterio 6 — El alcance real de la ruta elegida

La medición previa (`MEDICION-PIEZAS-COMPARTIDAS-COMPONENTES-CANTU.md` §2) contaba esta pieza
como «compiler.js + renderers de los cinco» — el alcance ejecutado coincide, con estas
precisiones medidas al implementar:

- **conceptGrid**: la preferencia se antepone a su **mapa propio** (`design/tokens/tokens.js`),
  no al de commons; sus `main` son hex-idénticos a los accents por defecto, así que no hay cambio
  visible por defecto, y su fallback para ids fuera de paleta sigue siendo `tokens.clean` — **su
  run de revalidación (`RUN-JAME-WEB-CONCEPTGRID-AUDIT-AND-REPAIR-001`, hoy queue 32) debe
  re-verificar contra esta preferencia**.
- **4 tests existentes de shape** entraron al blast (los `deepEqual` de §5) — actualizados aquí;
  ningún otro archivo de test fija la salida compilada de los cinco.
- Los runs de componente de los cinco — derivados del canónico de hoy: callout queue 25
  (`RUN-JAME-WEB-CALLOUT-REPAIR-001`), details 26, rule 28, table 31, conceptGrid 32 —
  **consumen este cableado**: su S2/S3 del DoD encontrará `color` en la salida compilada y la
  clase de color de los cinco deja de ser «no - regression pattern». La fila §5 del DoD y la
  tabla §4 del contrato de color quedan **desactualizadas por este run** (dicen que sólo
  header/list/card resuelven); refrescarlas es del carril DOCUMENTATION, no de este run — se
  declara para que no se descubra.
- `renderCard` también prefiere `data.color` (§1.2) — matiz para el refresco documental citado.

## 9. Criterio 7 — Packet de QA

**`docs/_historical_run_record/RUN-CANTU-AUTHOR-PALETTE-COMPILER-ENGINE-001-OPERATOR-QA-PACKET.md`**
— junto a los packets vigentes del repo (patrón `RUN-<ID>-OPERATOR-QA-PACKET.md`). Sigue el DoD
refrescado hoy: §6 (frontera Human QA + frontera de tests: los `node --test` van como medición en
la tabla de evidencia, nunca como sustituto del QA del operador) y §7 (tabla de evidencia en su
forma verbatim, adaptada con NA justificados). Nueve checks autocontenidos con resultado esperado
único y columna de veredicto vacía: invariancia bajo paleta por defecto, token redefinido, token
nuevo de punta a punta (Preview + Generate), la frontera del bg del callout **vista a propósito**,
el contraste del rule bajo accent claro, los tres cerrados del run 29 vistos como frontera,
no-regresión de header/list/card, y un draft real (`test5.json`) intacto. Sin remitir a ningún
record. `.aiw/docs/docs_index.json` **no se tocó**.

## 10. Criterio 10 — Validador, vía que no escribe, salida completa

```
Project Console state validation passed.
Roadmap v3 prototype: 7 objectives / 28 phases / 66 runs; queue groups needs_human_decision=0 now=2 ready_next=13 later=33 history=18
Roadmap v3 active run derived stages: RUN-CANTU-DOCUMENTATION-DEEP-AUDIT-001=none RUN-CANTU-AUTHOR-PALETTE-COMPILER-ENGINE-001=none
Docs indexed: 149
Docs curated primary-visible: 60 of 149 registered
Component statuses: 16
Git provenance episodes: 9
Git history snapshot: 918 commits / 2 branches (2 visible, 0 backup hidden); current=main; run-associated=6; source=local_git_autosync
Roadmap rebase warnings (non-blocking):
- .aiw/roadmap/roadmap.json run RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 depends on RUN-CANTU-ROADMAP-CONTENT-AUDIT-001, which does not resolve in this roadmap. With a single roadmap loaded this cannot be decided: it may be a legal external dependency — a run that lives in another project (CONTRATO §10.d Regla 2) — or a typo in the run id. Both are possible and one loaded roadmap cannot tell them apart; resolve it against the full set of projects to distinguish external from write error.
```

**`history=18`**; **66 runs reales** (7 objetivos / 28 fases). El warning de rebase es la deriva
conocida de la dependencia externa — no de este run, no se tocó. Los dos runs `active` son los dos
carriles en paralelo (18 DOCUMENTATION, 19 este); superficies de escritura disjuntas.

## 11. Criterio 11 — Las cifras del ticket, verificadas contra disco

| Cifra del ticket | Valor real medido | Veredicto |
|---|---:|---|
| Trece claves en el mapa fijo del motor | **13** (cargando el módulo) | exacta |
| Cinco componentes sólo-token bajo paleta abierta | **5** (callout, rule, details, conceptGrid, table) | exacta |
| Siete contando los de enum cerrado | **7** (+ split, + timeline detailsVariant) | exacta |
| Diez renderers consultan el mapa | **10** archivos con `Commons.VARIANTS` | exacta |
| Tres con mapa fijo propio | **3** (arithmetic, timeline, conceptGrid) | exacta |
| Cero tests que protejan el cableado | **0** (de 30 archivos, ninguno cruza paleta × renderers de los cinco) | exacta |
| 66 runs | **66** (validador) | exacta |
| `history=18` | **18** (validador) | exacta |

Ocho de ocho exactas — ninguna se dio por buena desde el ticket.

## 12. Qué NO se hizo (criterio 8 y hallazgos declarados sin reparar)

- **Los conjuntos cerrados del compilador** — split, detalle de timeline, badge de table — intactos:
  son `RUN-CANTU-COMPILER-VARIANT-GATES-001` (queue 29 hoy). El test nuevo fija la frontera del
  badge para que no se cruce en silencio.
- **El motor Slide** y su mapa propio: cero escrituras.
- **Revalidación de componente**: ninguna; los quince consumen este run.
- **Texto de runs del roadmap**: ninguno; el canónico idéntico byte a byte (md5).
- **Los alias de feedback**: sin promover, sin remapear, sin hacerlos importar (decisión 4 del
  contrato, del operador).
- **Los roles no-accent de la paleta** (`surface`/`border`/`text`): no se emiten (decisión 6). El
  costo visible — el bg del callout no sigue al accent custom — quedó fijado en test y en el check
  5 del packet, para el veredicto del operador.
- **Emisión-siempre en header/list/card**: conservan su regla certificada (id desconocido → ctx);
  unificarlos a la condicional es cambio de comportamiento certificado y queda para quien decida
  los alias.
- **Contraste del header de rule** bajo accents custom claros: medido, declarado en packet
  (check 6), no reparado — la lógica de contraste por id es del run de rule.
- **Derivas conocidas cruzadas en la lectura, no tocadas**: mojibake de los schemas, punteros de
  packets archivados, el CLI local de roadmap, el warning de rebase del validador, los artefactos
  `generated/` sin regenerar, y la fila §5 del DoD + tabla §4 del contrato de color que este run
  deja desactualizadas (dueño: carril DOCUMENTATION).
- **Script `test` en package.json**: no se añadió (decisión pendiente del operador con run propio).

## 13. Criterio 13 — Status declarado

El run debe quedar **`active` hasta que el operador ejecute el packet de QA** (el run exige QA
visual del operador y la reparación sólo la autoriza ese veredicto); con veredicto PASS en los
nueve checks, **el status de llegada es `completed`, cerrado por el operador desde la consola
global** — el punto de serialización. Falta exactamente eso: ejecutar
`RUN-CANTU-AUTHOR-PALETTE-COMPILER-ENGINE-001-OPERATOR-QA-PACKET.md` y cerrar desde la consola.
Este taller no cambió el status ni re-emitió `.project/`.

## 14. Superficie de escritura exacta de este encargo

En `cantu-studio`: `tools/author-lite/compiler-api/services/compiler.js`;
`src/builders/web/partials/renderCallout.js`, `renderRule.js`, `renderDetails.js`,
`renderConceptGrid.js`, `renderTable.js`;
`tools/author-lite/compiler-api/tests/webAuthorPaletteCompilerEngineReconciliation.test.mjs`
(nuevo) y los 4 tests de shape ampliados;
`docs/_historical_run_record/RUN-CANTU-AUTHOR-PALETTE-COMPILER-ENGINE-001-OPERATOR-QA-PACKET.md`.
En `aiw-console`: este record. Nada más.
