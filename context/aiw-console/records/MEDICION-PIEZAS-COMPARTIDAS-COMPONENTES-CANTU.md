# Medición de las piezas compartidas que consumen los quince runs de componente

**Proyecto medido:** `cantu-studio` (lectura). **Proyecto escrito:** `aiw-console` (este record).
**Fecha:** 2026-08-01. **Tipo:** encargo de taller, **sin run**. **No se escribió un solo byte
dentro de `projects/cantu-studio`.**

**Resultado en una línea:** los quince runs pasan la guarda de identidad y son exactamente los
que el ticket describe; comparten **catorce piezas** medidas en disco, de las cuales **cinco
están listas**, **siete no lo están** y **dos exigen una decisión del operador**; de las siete
no listas, **cuatro no tienen dueño en el canónico** —el mapa fijo del motor Web, la segunda
compuerta del compilador, el montaje del insertor de fórmulas y los helpers de test, que no
existen—; el insertor de fórmulas en `queue_order` 41 **está en una posición honesta como
verificación pero descansa sobre una premisa falsa**, porque el `FormulaInserterShell` no está
montado en ninguna superficie del editor y por tanto no hay integración que verificar; y de las
diez cifras que el ticket daba, **ocho son exactas, una es incorrecta** (el mapa fijo del motor
tiene **trece** claves, no doce) y una es ambigua y se desglosa.

**Se PARA Y REPORTA por el criterio 11, primer supuesto:** dos piezas compartidas exigen
decisiones del operador que no están tomadas —el alias `success` / los alias de feedback del
enum de la paleta, y si el compilador entra en alcance para retirar la segunda compuerta—, más
la del alcance de `split`. Se miden, se costean y **se devuelven sin decidir** (§10).

---

## 1. Criterio 1 — Los quince runs, derivados del canónico, con guarda

Derivados de `projects/cantu-studio/.aiw/roadmap/roadmap.json` recorriendo
`objectives[].phases[].runs[]` y filtrando por `queue_order` 18..32. Ningún `run_id` tecleado de
memoria. `schema_version: jame.roadmap_v3.v0.2-progress`. md5 del canónico al abrir y al cerrar:
`6d13a7c617801b4b197b6075f418cbac` — **idéntico**, y **el mismo** que registró
`RELEVO-CANTU-AL-CIERRE-2026-08-01.md`.

**Cada `queue_order` de 18 a 32 tiene un único match. Los quince títulos son catorce de la forma
«Audit and implement the X component» más «Decide scope and enable the Split component».
LA GUARDA PASA.** No se corrige nada por parecido y se sigue.

| `queue_order` | `run_id` | `title` (verbatim) | Objetivo / Fase | `depends_on` |
|---:|---|---|---|---|
| 18 | `RUN-JAME-WEB-LIST-REVALIDATION-001` | Audit and implement the List component | O1 / O1.P1C | `…CONTRACT-STANDARDIZATION-001`, `…BASELINE-RECONCILIATION-001`, `…COLOR-PALETTE-COMPATIBILITY-CONTRACT-001` |
| 19 | `RUN-JAME-WEB-ICONLIST-REVALIDATION-001` | Audit and implement the IconList component | O1 / O1.P1C | los mismos tres |
| 20 | `RUN-JAME-WEB-CARD-REVALIDATION-001` | Audit and implement the Card component | O1 / O1.P1C | los mismos tres |
| 21 | `RUN-JAME-WEB-VIDEO-REVALIDATION-001` | Audit and implement the Video component | O1 / O1.P1C | STANDARDIZATION + BASELINE |
| 22 | `RUN-JAME-WEB-NARRATIVE-REPAIR-001` | Audit and implement the Narrative component | O1 / O1.P1C | STANDARDIZATION + BASELINE |
| 23 | `RUN-JAME-WEB-CALLOUT-REPAIR-001` | Audit and implement the Callout component | O1 / O1.P1C | los tres con COLOR |
| 24 | `RUN-JAME-WEB-DETAILS-REPAIR-001` | Audit and implement the Details component | O1 / O1.P1C | los tres con COLOR |
| 25 | `RUN-JAME-WEB-ARITHMETIC-AUDIT-AND-REPAIR-001` | Audit and implement the Arithmetic component | O1 / **O1.P2** | STANDARDIZATION + BASELINE + **MATH-FORMULA** |
| 26 | `RUN-JAME-RULE-COMPONENT-REPAIR-AND-ACTIVATION-001` | Audit and implement the Rule component | O1 / **O1.P2** | + **MATH-FORMULA** + **SMART-FORMULA-FIELD-RULE-ONLY-BASELINE** |
| 27 | `RUN-JAME-WEB-SPLIT-SCOPE-AND-REPAIR-001` | **Decide scope and enable the Split component** | O1 / O1.P1C | STANDARDIZATION + BASELINE |
| 28 | `RUN-JAME-WEB-TABLE-AUDIT-AND-REPAIR-001` | Audit and implement the Table component | O1 / O1.P1C | STANDARDIZATION + BASELINE |
| 29 | `RUN-JAME-WEB-CONCEPTGRID-AUDIT-AND-REPAIR-001` | Audit and implement the ConceptGrid component | O1 / **O1.P2** | STANDARDIZATION + BASELINE |
| 30 | `RUN-JAME-WEB-HIERARCHY-AUDIT-AND-REPAIR-001` | Audit and implement the Hierarchy component | O1 / **O1.P2** | STANDARDIZATION + BASELINE |
| 31 | `RUN-JAME-WEB-TIMELINE-AUDIT-AND-REPAIR-001` | Audit and implement the Timeline component | O1 / **O1.P2** | STANDARDIZATION + BASELINE |
| 32 | `RUN-JAME-WEB-VISUAL-AUDIT-AND-REPAIR-001` | Audit and implement the Visual component | O1 / O1.P1C | STANDARDIZATION + BASELINE |

Objetivo `O1` = «Cantu Studio Web Components». Fases: `O1.P1C` «Web Components - Basics» (10 de
los quince), `O1.P2` «Web Components - Math» (5: 25, 26, 29, 30, 31).
Ninguno lleva clave `lane`; `lanes[]` declara `DEVELOPMENT` con `default: true`, luego los quince
son DEVELOPMENT. Los quince están `planned`, `work_type: FUNCTIONAL`, `blast_radius: ADJACENT`,
`failure_surfaces: VISIBLE`.

### 1.1 Dos observaciones sobre las aristas, medidas

1. **Sólo cinco de los quince declaran la dependencia del contrato de color**, y sólo tres la del
   de math. Los otros diez **consumen la pieza de color igualmente** —lo demuestra §2— sin
   declararla. La arista está en el texto de nueve de los quince `full_description` pero no en el
   `depends_on` de diez. No es bloqueante: los tres contratos están `completed`. Se declara.
2. **Los quince son elegibles hoy**: todas sus aristas apuntan a runs `completed`. La cola de
   veinte elegibles los contiene enteros (más `#17`, `#33`, `#41`, `#42`, `#58`).

### 1.2 La frase que los quince `full_description` repiten, y que es falsa

Los quince cierran con esta cláusula, verbatim:

> Verify the result by human visual QA rather than an automated test suite, since the repository
> has no test runner.

**Medido: el repositorio sí tiene con qué correr tests.** Hay **30 archivos `*.test.mjs`** en
`tools/author-lite/compiler-api/tests/` con **323 declaraciones `test(` de primer nivel** (conteo
estático, no ejecutado), más 8 archivos en `tools/roadmap/tests/`. Lo que **no** hay es un script
`"test"` en ningún `package.json` del repo —barrido completo, cero coincidencias—: se corren con
`node --test`. La frase es cierta como «no hay `npm test`» y **falsa como «no hay suite»**. Los
quince runs la llevan idéntica. **Se nombra y no se toca.**

---

## 2. Criterio 2 — Tabla PIEZA COMPARTIDA × CONSUMIDORES

Catorce piezas con dos o más consumidores entre los quince, más dos que se incluyen con un solo
consumidor porque el encargo las nombra explícitamente (el insertor de fórmulas y la allowlist).
**Todos los conteos salen de leer el código**, no los `full_description`. La columna «¿aparece
por texto del run?» declara si el consumo está además escrito en el run.

### P1 · Control de UI del selector de color

**Ruta:** `tools/author-lite/editor-ui/src/features/editor/components/common/VariantSelect.jsx`
(170 líneas, md5 `f00668e304fbe4865f27fe5a0bcbf915`). Exporta cinco piezas: `VariantSelect`
(default), `ColorTokenOrCustomField`, `ColorTokenSwatch`, `ColorTokenPicker`,
`RegisteredColorSwatch`.

**Consumidores entre los quince: 6 de 15**, en **10 colocaciones**.

| Componente | `qo` | Colocación top-level | Colocación en slot de `columns` |
|---|---:|---|---|
| `list` | 18 | `WebBlockEditor.jsx:3971` (`<VariantSelect … allowCustom />`) | `:1807` (`ColumnColorSelectField … allowCustom`) |
| `callout` | 23 | `:3946` | `:1841` |
| `details` | 24 | `:2435` (por ítem, dentro de `DetailsFields`) | — no es child de `columns` |
| `rule` | 26 | `:4032` | `:1877` |
| `table` | 28 | `:3070` | `:1966` |
| `conceptGrid` | 29 | `:2581` (por ítem) | — no es child de `columns` |

`ColumnColorSelectField` (`WebBlockEditor.jsx:732-767`) no es una pieza distinta: importa
`ColorTokenOrCustomField` (`:740`) y `RegisteredColorSwatch` (`:762`) del mismo módulo.

**Consumidores FUERA de los quince: 2.**
- `header` (`qo` 15, `completed`) — `WebBlockEditor.jsx:127` y `:1777`, vía `ColorTokenOrCustomField`.
- **La superficie Slides** — `SlideCardEditor.jsx:26`, `<VariantSelect register name>` **sin
  `palette` ni `control`**, que es la rama `if (!control) return select;` (`VariantSelect.jsx:161`).

**¿Aparece por texto del run? NO, en ninguno de los seis.** Los seis `full_description` nombran
«the color and palette compatibility contract» y «the current component inventory»; **ninguno
nombra `VariantSelect`, ni el control compartido, ni sus dos colocaciones**. Los seis consumidores
**aparecen sólo por código**. Se declara explícitamente.

### P2 · Resolvedor de color y paleta

**Ruta:** `tools/author-lite/editor-ui/src/features/editor/constants/colorSystem.js`
(826 líneas). Funciones compartidas: `resolveAuthorColorToken` (`:777`), `getAuthorColorOptions`
(`:817`), `normalizeAuthorColorPalette` (`:452`), `getAuthorColorRoles` (`:806`).

Se consume en **dos capas distintas**, y la distinción es la que importa:

**Capa A — el editor OFRECE la paleta activa. Consumidores entre los quince: 9 de 15.**
`list`(18), `iconList`(19, vía `common/IconListFields.jsx:10`), `card`(20, vía `CardColorField`
`WebBlockEditor.jsx:903`), `callout`(23), `details`(24), `rule`(26), `table`(28),
`conceptGrid`(29), `hierarchy`(30, vía `HierarchyNodeColorField` `:3395`).
**No lo consumen:** `video`(21), `narrative`(22) y `arithmetic`(25) —sin superficie de color—;
`split`(27) —lista fija `SPLIT_VARIANT_OPTIONS` de 3, `:354`—; `timeline`(31) —lista fija
`TIMELINE_DETAIL_VARIANT_OPTIONS` de 3, `:58`—; `visual`(32) —`<input type="color">` crudo en
`common/VisualFields.jsx`—.

**Capa B — el compilador RESUELVE el accent contra la paleta. Consumidores entre los quince: 2 de 15.**
`list`(18) — `compiler.js:1108` `color: resolveVariantAccentColor(block.variant, context)`; y
`card`(20) — `compiler.js:356` `color: resolveCardColor(src, options, variant)`.
Fuera de los quince: `header` (`compiler.js:1066`).
**Los otros siete de la capa A no llegan a la capa B.** Ver P5.

**Consumidores fuera de los quince:** `header`; `ComponentGuide.jsx:38`;
`useAuthorColorPalette.js:10`; `smartFormulaColorNormalizer.js:2`; `smartFormulaFieldState.js:12`;
y `compiler-api/services/compiler.js:8-13`.

**¿Por texto del run?** Nueve de los quince nombran «the color and palette compatibility
contract» en su `full_description` (18, 19, 20, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32 lo
nombran; 21 y 22 también). **Ninguno nombra el archivo ni la función.** El mapeo texto→código lo
hace el lector, no el run.

### P3 · Entrega de la paleta activa al editor

**Rutas:** `features/editor/hooks/useAuthorColorPalette.js` (hook, `:17`),
`features/editor/services/colorPaletteApi.js`, y la plomería
`EditorPage.jsx:162 → :886/:928/:959/:982 → WebFlowEditor → WebBlockEditor(colorPalette)`.

**Consumidores entre los quince:** los mismos **9** de la capa A de P2 (el prop `colorPalette`
recorre `WebBlockEditor` y llega a `DetailsFields`, `ConceptGridFields`, `TableFields`,
`HierarchyFields`, `CardFields` y a las cuatro colocaciones de slot).
**Consumidor estructural adicional:** `columns` no tiene superficie propia y **propaga**
`colorPalette` a sus hijos (`compiler.js:1121-1125` en compilación; el prop en el editor).

**Deriva medida y ya declarada por el contrato** (`REFERENCE-COLOR-PALETTE-COMPATIBILITY.md` §6):
el valor que reciben los controles de bloque está **atado incondicionalmente a la paleta Web**,
aunque el editor de paletas esté editando el target Slide.

### P4 · La segunda compuerta dentro del compilador

**Ruta:** `tools/author-lite/compiler-api/services/compiler.js` (1354 líneas, md5
`c1177c44c6db3270ba83f1817827f28f`). Cuatro compuertas, tres de ellas del mismo patrón:

| Compuerta | Declaración | Uso | Mensaje |
|---|---|---|---|
| `SPLIT_VARIANT_VALUES` (3 valores) | `:66` | `:579-581` | `[Compiler] Split Web tiene variant no permitido: …` |
| `TIMELINE_DETAILS_VARIANT_VALUES` (4 valores) | `:55` | `:985-987` | `[Compiler] Timeline Web paso N tiene variante de detalle no permitida.` |
| `TABLE_BADGE_VARIANT_MAP` + `normalizeTableBadgeVariant` | `:24-34` | `:479-483` | `[Compiler] Variante de badge de tabla no permitida: …` |
| `context.allowSplit` | — | `:1151-1155` | `[Compiler] Split Web solo se permite como child directo de Columns.` |

**Consumidores entre los quince: 3 de 15** — `split`(27), `table`(28, superficie badge),
`timeline`(31). **Consumidores fuera de los quince: 0.**

**¿Por texto del run? NO, en ninguno de los tres.** Ni `qo` 27, ni 28, ni 31 mencionan el
compilador, la compuerta o el enum. Aparecen **sólo por código**. Es la misma medición que hizo
`UNIFICACION-SELECTOR-COLOR-WEB-Y-COMPUERTA-DEL-COMPILADOR-CANTU.md` §2.2-1, y sigue en pie: el
md5 del compilador no se ha movido desde entonces.

### P5 · El mapa fijo del motor Web

**Ruta:** `src/builders/web/partials/commons.js` (96 líneas).
`PALETTE` (`:50-68`, **10 claves**: gray, blue, purple, cyan, gold, champagne, green, orange,
red, code) y `VARIANTS` (`:71-90`, **13 claves**: def, ctx, ex, meta, focus, str, res, success,
wrn, warning, err, error, code — las tres últimas de feedback marcadas `// Alias`).

**Consumidores entre los quince, por renderer:**

| Renderer | Componente | `qo` | Cómo |
|---|---|---:|---|
| `renderCallout.js:27` | `callout` | 23 | `Commons.VARIANTS[k] \|\| Commons.VARIANTS.ctx` |
| `renderCard.js:296-297` | `card` | 20 | `Commons.VARIANTS[variant]` |
| `renderDetails.js:54` | `details` | 24 | ídem, por ítem |
| `renderHierarchy.js:20-21` | `hierarchy` | 30 | `Commons.PALETTE[Commons.VARIANTS[n.variant].palette].color` |
| `renderList.js:92` | `list` | 18 | ídem, pero **prefiere `data.color`** |
| `renderRule.js:13` | `rule` | 26 | ídem |
| `renderSplitCard.js:9` | `split` | 27 | ídem |
| `renderTable.js:12` | `table` | 28 | ídem |
| `renderBadge.js:12` | `table` (badge) | 28 | `Commons.VARIANTS[v] \|\| Commons.VARIANTS.meta` |
| `renderArithmetic.js:18-31` | `arithmetic` | 25 | `Commons.PALETTE.*` para el mapa de primos y `THEME_COLOR` |

**Diez de los quince.** Además, **tres de los quince pintan contra un mapa fijo PROPIO**, que es
la misma enfermedad en otro archivo: `renderConceptGrid.js:10-19` (`roleMap`, 8 claves, `conceptGrid`
29), `renderNarrative.js:18-27` (`themeColors`, 9 claves, `narrative` 22),
`renderTimeline.js:11-13` (constantes hex sueltas, `timeline` 31).
**Total de los quince tocados por «un mapa fijo del motor»: 13 de 15.** Sólo `video`(21) y
`visual`(32) quedan fuera.

**¿EXCEDE a los quince? SÍ, y en tres direcciones.**
1. **`header`** (`qo` 15, `completed`) — `renderHeader.js:18-22`.
2. **El motor Slide tiene SU PROPIO mapa fijo**, `src/builders/slides/helpers/commons.js:15`,
   consumido por `slides/components/renderCallout.js:73`, `renderCard.js:203`,
   `renderRule.js:71` y `layouts/renderHierarchySlide.js:21-22`; y
   `layouts/renderConceptGridSlide.js:6` declara **otro mapa más**, local.
   Los quince runs son Web; **el objetivo Slide (O-Slide, `qo` 42..48) heredará el mismo problema
   sin haberlo tocado**.
3. **La Guía de componentes** (`ComponentGuide.jsx:38`) importa `colorSystem.js`, de modo que lo
   que la Guía muestra al autor sale de la paleta y lo que el motor pinta sale del mapa fijo: los
   dos textos que el autor lee pueden discrepar.

**¿Por texto del run? NO, en ninguno.** Cero runs del canónico mencionan el mapa del motor —
barrido con `/Commons\.VARIANTS|hardcoded map|fixed map|engine map/i` sobre `title + summary +
full_description` de los 63: **0 coincidencias**.

### P6 · El insertor de fórmulas

**Rutas:** `features/math-authoring/formulaInserter/` — `FormulaInserterShell.jsx` (163 líneas),
`formulaInserter.actions.js`, `formulaInserter.controller.js`, `formulaInserter.types.js`.

**Consumidores del `FormulaInserterShell`: CERO.** Barrido de todo `tools/` excluyendo
`node_modules`: las únicas apariciones del identificador son su propia definición
(`FormulaInserterShell.jsx:45`, `:161`, `:163`) y **un test que afirma su AUSENCIA**
(`webRuleSmartFormulaFieldRulePilot.test.mjs:259`,
`assert.doesNotMatch(ruleMathFieldSource, /FormulaInserterShell|…/u)`). Ninguna superficie del
editor lo importa.

**Lo que sí está montado es el campo de fórmula visual**, `RuleMathField`
(`WebBlockEditor.jsx:705`), que consume `SmartFormulaModal`/`SmartFormulaPreview`
(`math-authoring/smartFormulaField/index.js`). **Consumidores entre los quince: 1** — `rule`(26),
en dos colocaciones: `:4042` (top-level) y `:1887` (slot de `columns`).

**¿Por texto del run? SÍ, y en cinco, lo que es el problema.** Los `full_description` de
`arithmetic`(25), `rule`(26), `conceptGrid`(29), `hierarchy`(30) y `timeline`(31) dicen, verbatim:

> Audit the X component against the color and palette compatibility contract **and the math and
> Formula Inserter compatibility contract**, using the current component inventory as the
> starting point.

**Cuatro de esos cinco no tienen ninguna superficie de insertor que auditar**, y el propio
contrato lo dice (`REFERENCE-MATH-FORMULA-COMPATIBILITY.md` §8, verbatim):

> The Formula Inserter engine is wired; its UI is not. The slash and button action evaluators are
> consumed by the Smart Formula Field state module, but `FormulaInserterShell` is defined and
> exported and imported by no editor surface — the only other reference in the tree is a test
> asserting its absence from the Rule field. There is no global Formula Inserter today.

Y, dos párrafos después:

> A revalidation run must not treat the presence of `features/math-authoring/` as evidence that a
> component has a formula field. Only `rule` has one.

### P7 · La allowlist LaTeX (Superficie A)

**Rutas:** `features/math-authoring/latexSanitizer.js` + `validateRuleMathValue` (exportado por
`math-authoring/index.js`), consumido por `safeRuleMathValue` en **los dos** `draftSchema.js`
(`compiler-api/schemas/draftSchema.js:159-176`, usado en `:780` y `:786`).

**Consumidores entre los quince: 1** — `rule`(26), sus dos campos de schema.
**Los otros cinco campos de math de los quince NO la consumen**: `table`(28) `:401`,
`arithmetic`(25) `:426`, `hierarchy`(30) `:453`, `timeline`(31) `:470` y `split`(27) `:843`
validan como **texto opaco** (`safeRequiredLimitedMathText`, `safeOptionalHierarchyMathText`,
`safeOptionalTimelineMathText`, `safeRequiredSplitMathText`), no como LaTeX. Es la Superficie B
del contrato de math §4. Se incluye pese a tener un solo consumidor porque el criterio 6 la
necesita.

### P8 · El auto-render de KaTeX

**Rutas:** `compiler-api/services/previewRenderer.js:12-14` y
`src/builders/web/buildSingleWebLesson.js:4` — los dos inyectan
`katex@0.16.9` + `auto-render.min.js` con `onload="renderMathInElement(document.body)"`.
Es una **pieza global**: no se invoca por componente, barre el documento entero.

**Consumidores entre los quince: 6 de 15** —los que emiten delimitadores en la salida:

| Componente | `qo` | Quién pone los delimitadores |
|---|---:|---|
| `arithmetic` | 25 | el renderer — `renderArithmetic.js:225`, `:250-251`, `:316-317` |
| `rule` | 26 | el renderer — `renderRule.js:89` |
| `split` | 27 | el renderer — `renderSplitCard.js:91`, `:105`, `:130`, `:145` |
| `table` | 28 | **el compilador** — `compiler.js:470-477` `buildTableMathContent` devuelve `\( … \)` |
| `conceptGrid` | 29 | el renderer — `renderConceptGrid.js:90-91`, `:104` |
| `timeline` | 31 | el renderer — `renderTimeline.js:255` |

**`hierarchy`(30) es el consumidor roto:** `renderHierarchy.js:174` y `:197` emiten `node.math`
dentro de un `<div>` **sin ningún delimitador en todo el archivo**; el auto-render nunca lo ve y
la fórmula sale como texto plano. Es el patrón de math-regression del contrato §9, nombrado allí
y con la reparación asignada a su propio run.

### P9 · El formato del packet de documentación

**Rutas:** `docs/docs_management/COMPONENT-DOC-SINGLE-SOURCE-CONTRACT.md` (123 líneas) y los
**17 packets** de `docs/components/web/`.

**Consumidores entre los quince: 15 de 15.** Cada uno de los quince tiene su packet:
`LIST.md`, `ICON-LIST.md`, `CARD.md`, `VIDEO.md`, `NARRATIVE.md`, `CALLOUT.md`, `DETAILS.md`,
`ARITHMETIC.md`, `RULE.md`, `SPLIT.md`, `TABLE.md`, `CONCEPT-GRID.md`, `HIERARCHY.md`,
`TIMELINE.md`, `VISUAL.md`. **Fuera de los quince: 2** — `HEADER.md` y `COLUMNS.md`.

**¿Por texto del run? NO.** El §S9 de la DoD retira explícitamente el deber del packet de los
runs de componente y lo pasa a los lotes `qo` 35..38. Ninguno de los quince `full_description`
menciona el packet.

### P10 · Helpers de test compartidos

**NO EXISTEN como pieza.** Barrido de `tools/author-lite/compiler-api/tests/`: **30 archivos,
todos `*.test.mjs`, cero módulos de apoyo**. Ningún test importa de un `./helpers`; los imports
compartidos son `../services/compiler.js` (23 archivos), `../schemas/draftSchema.js` (23),
`../../editor-ui/src/features/editor/utils/jsonImporter.js` (12) y
`../services/previewRenderer.js` (5). Cada archivo redeclara sus propias fixtures y su propio
lector de fuente.

**Lo que sí es un patrón compartido de facto** —y por tanto una pieza que los quince heredarán—
es la aserción sobre **texto fuente**: 13 de los 30 archivos leen `WebBlockEditor.jsx` o los
schemas con `fs` y afirman con expresiones regulares sobre el código (p. ej.
`webColorSelectorCustomPicker.test.mjs:155-204`, que cuenta ocurrencias de `allowCustom />`).
Es frágil por construcción: cualquiera de los quince que reordene el editor rompe tests de
componentes que no tocó.

### P11 · El procedimiento (la DoD)

**Ruta:** `docs/reference/REFERENCE-COMPONENT-REVALIDATION-DEFINITION-OF-DONE.md` (364 líneas),
registrada en `.aiw/docs/docs_index.json`. **Consumidores: 15 de 15.** Ver §8.

### P12 · La superficie de escritura compartida

No es un artefacto de producto, pero es la pieza que más caro sale ignorar. **Los quince runs
escriben en los mismos cuatro archivos:**

| Archivo | Líneas | Quién lo toca |
|---|---:|---|
| `editor-ui/src/features/editor/components/web/WebBlockEditor.jsx` | 4083 | los 15 (cada uno tiene su rama `field.kind === …` y, ocho de ellos, su rama de slot) |
| `editor-ui/src/schemas/draftSchema.js` | 1055 | los 15 |
| `compiler-api/schemas/draftSchema.js` | 1126 | los 15 — **copia con divergencia intencional** (ADR-003), 117 líneas de diff |
| `compiler-api/services/compiler.js` | 1354 | los 15 |

`CLAUDE.md` regla 7 y la DoD §2 («Two runs never touch one file») convierten esto en una
**serialización estricta de los quince**. No hay paralelismo posible dentro del carril
DEVELOPMENT para este bloque.

### P13 · El catálogo y la Guía de componentes

**Rutas:** `editor-ui/src/features/editor/constants/blockCatalog.js` (1176 líneas),
`editor-ui/src/features/editor/components/preview/ComponentGuide.jsx` (2608 líneas),
`tools/author-lite/scripts/checkComponentGuideTextIntegrity.cjs` (42 líneas).

**Consumidores entre los quince: 15 de 15** (los 17 componentes viven en `WEB_COMPONENT_UI`, y
14 de los 17 alimentan la Guía desde el campo `docs` del catálogo; los tres restantes —`list`,
`header`, `columns`— desde objetos en línea `ComponentGuide.jsx:42`, `:169`, `:291`).
**`list`(18) es de los quince y es uno de los tres con contenido en línea protegido por script.**
`split`(27) además debe tocar `blockCatalog.js:872` (`disabled: true`) para cualquier decisión de
alcance.

### P14 · Defaults por bloque

**Ruta:** `editor-ui/src/features/editor/utils/blockFactory.js`. **Consumidores: 15 de 15** — un
`case` por `kind` para el bloque top-level (`:14-234`) y un segundo bloque de `case` para el hijo
de `columns` (`:236…`). La DoD §3 lo nombra como fuente de verdad de los defaults.

---

## 3. Criterio 3 — Estado de cada pieza, con evidencia en disco

| # | Pieza | Estado | Evidencia (archivo:líneas) |
|---|---|---|---|
| P1 | Control de UI del selector de color | **LISTA** | `VariantSelect.jsx:79` y `:145` derivan de `getAuthorColorOptions(palette)` sin `filter`, sin `slice` y sin lista fija de respaldo; `:104-110` mapea la lista entera; `ColumnColorSelectField` `WebBlockEditor.jsx:732-767` replica la estructura. Cero `VARIANT_OPTIONS.map` en el editor |
| P2 | Resolvedor de color y paleta | **LISTA en capa A · NO LISTA en capa B** | Capa A: `colorSystem.js:817-826` `getAuthorColorOptions` mapea la paleta normalizada entera; `:777-804` `resolveAuthorColorToken` cae a `ctx`. Capa B: `compiler.js:1066` y `:1108` son los **dos únicos** `resolveVariantAccentColor` del archivo, más `:356` para `card`; los otros cinco emiten sólo `variant` (`:1080`, `:367`, `:381`, `:390`, `:520`) |
| P3 | Entrega de la paleta activa | **LISTA para Web · REQUIERE DECISIÓN para Slide** | `useAuthorColorPalette.js:17-40`; deriva declarada en `REFERENCE-COLOR-PALETTE-COMPATIBILITY.md` §6 («the value the block controls receive is bound to the Web palette unconditionally»); decisión abierta 2 del mismo contrato |
| P4 | Segunda compuerta del compilador | **NO LISTA** | `compiler.js:66` + `:579-581`; `:55` + `:985-987`; `:24-34` + `:479-483`. Contradicen a P1: el editor de `table` ofrece la paleta entera para `variant` (`:3070`) mientras el badge sigue cerrado en 19 opciones (`WebBlockEditor.jsx:334-347`) |
| P5 | Mapa fijo del motor Web | **NO LISTA** | `commons.js:50-68` (10 claves) y `:71-90` (**13** claves). Diez renderers Web lo consumen; `renderList.js:92` y `renderHeader.js:22` son los únicos que prefieren `data.color`. Declarado ya en `REFERENCE-COLOR-PALETTE-COMPATIBILITY.md` §5 y §8 |
| P6 | Insertor de fórmulas | **NO LISTA** | `FormulaInserterShell.jsx:45-163` definido y exportado; **cero imports** en todo `tools/`; única otra referencia: `webRuleSmartFormulaFieldRulePilot.test.mjs:259`, que afirma su ausencia |
| P7 | Allowlist LaTeX (Superficie A) | **LISTA, y acotada a `rule` por diseño** | `draftSchema.js:159-176` `safeRuleMathValue`, usado en `:780` y `:786` y en ningún otro campo. Ampliada por `qo` 11 (`completed`) |
| P8 | Auto-render de KaTeX | **LISTA como pieza · NO LISTA para `hierarchy`** | `previewRenderer.js:12-14`, `buildSingleWebLesson.js:4`. `renderHierarchy.js:174` y `:197` sin delimitadores en todo el archivo (`grep '\\\\(' renderHierarchy.js` → 0) |
| P9 | Formato del packet | **NO LISTA** | 16 de los 17 packets llevan **4 punteros muertos cada uno** (64 en total): `docs/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` (la ruta real es `docs/archive/author-lite/…`) y `docs/REFERENCE-DRAFT-JSON.md` (la real es `docs/reference/…`). `LIST.md:12,26,51,69` es el patrón. **Sólo `COLUMNS.md` está reparado** (`:12`, `:26`, `:65`, `:134`) y es el único con `Last verified: 2026-07-30`; los otros dieciséis siguen en `2026-07-12` |
| P10 | Helpers de test compartidos | **NO EXISTEN** | `tools/author-lite/compiler-api/tests/` — 30 archivos, todos `*.test.mjs`, cero módulos de apoyo |
| P11 | El procedimiento (DoD) | **LISTA, con deriva declarada** | `REFERENCE-COMPONENT-REVALIDATION-DEFINITION-OF-DONE.md:87-169` (los diez pasos) y `:209-241` (la frontera de QA). Deriva: §5 y §2, ver §8.2 |
| P12 | Superficie de escritura compartida | **NO LISTA** (restricción, no artefacto) | Cuatro archivos, 7618 líneas entre los cuatro; regla 7 de `CLAUDE.md` y DoD `:43-44` |
| P13 | Catálogo y Guía | **NO LISTA** | `ComponentGuide.jsx:42`, `:169`, `:291` (tres guías en línea) frente a 14 alimentadas desde `blockCatalog.js`; modo Programador vivo (`:1211`, `:1243`, `:1275`); etiquetas de certificación en línea (`blockCatalog.js:414` `status: 'CERTIFIED'`) que contradicen a `component_status.json` |
| P14 | Defaults por bloque | **LISTA** | `blockFactory.js:14-234` cubre los 17 `kind`; segundo juego para hijos de `columns` desde `:236` |

### 3.1 La lectura que sostiene «NO LISTA» en P4 y P5 juntas

Las dos son la misma grieta vista desde dos lados. Después del run `qo` 16 (`completed`), el
editor **ofrece la paleta activa entera** a `callout`, `rule`, `table`, `details` y
`conceptGrid`. Pero:

- el compilador de esos cinco **no resuelve** el accent: emite `variant` a secas;
- el motor Web resuelve ese `variant` contra `Commons.VARIANTS`, **13 claves fijas**;
- un token de paleta que no esté entre las 13 **cae al `ctx`**.

Es decir: **el autor puede elegir hoy un color que la salida no pinta**, en cinco de los quince.
No es una regresión —es el comportamiento que ya tenían— pero ahora es visible porque el control
dejó de esconder media paleta. Está medido y declarado en
`UNIFICACION-SELECTOR-COLOR-WEB-Y-COMPUERTA-DEL-COMPILADOR-CANTU.md` §6.1 y en el contrato §5 y
§8. **Ningún run lo repara.**

---

## 4. Criterio 4 — Dueño de cada pieza NO lista

| Pieza no lista | ¿Hay run que la arregle? | `run_id` · `title` verbatim · `queue_order` | Posición frente al primer consumidor |
|---|---|---|---|
| **P4** · compuerta de `split` | **SIN DUEÑO** por texto. El único run cuyo alcance podría contenerla es `RUN-JAME-WEB-SPLIT-SCOPE-AND-REPAIR-001`, «Decide scope and enable the Split component», `qo` **27** — pero **su `full_description` no nombra el compilador ni la compuerta**; nombra sólo el catálogo y el contrato de color. No se le adjudica por afinidad | — | el propio `qo` 27 es su único consumidor: no hay problema de orden, sí de alcance no declarado |
| **P4** · compuerta de `timeline` (`detailsVariant`) | **SIN DUEÑO** | — | su consumidor es `qo` 31; ningún run posterior la nombra |
| **P4** · compuerta del badge de `table` | **SIN DUEÑO** | — | su consumidor es `qo` 28; ningún run posterior la nombra |
| **P5** · mapa fijo del motor Web | **SIN DUEÑO** | — | primer consumidor `qo` 18 (`list`). Barrido de los 63 runs: **cero** mencionan el mapa del motor. Los quince `full_description` dicen lo contrario de repararlo: el run 16 declaró «it changes no renderer and no compiled output» |
| **P6** · montaje del insertor de fórmulas | **SIN DUEÑO para el montaje.** `RUN-JAME-FORMULA-INSERTER-INTEGRATION-001`, «Verify global Formula Inserter integration after component revalidation», `qo` **41**, sólo **verifica**: su propio texto dice «This Run verifies and does not itself integrate» | `qo` 41 | **después** del primer consumidor (`qo` 25). Ver §6 |
| **P9** · formato/punteros del packet | **SÍ**, cuatro dueños. `RUN-CANTU-WEB-PACKET-VERIFICATION-BATCH-001` «Verify the Header, List, IconList, and Card component packets» `qo` **35**; `…BATCH-002` «Verify the Video, Narrative, Callout, and Details component packets» `qo` **36**; `…BATCH-003` «Verify the Arithmetic, Rule, Split, and Table component packets» `qo` **37**; `…BATCH-004` «Verify the ConceptGrid, Hierarchy, Timeline, and Visual component packets» `qo` **38** | 35–38 | **después** del primer consumidor (`qo` 18), **y los cuatro dependen explícitamente de los runs de componente que cubren**. La posición es deliberada: la DoD §S9 retira el deber del packet de los runs de componente |
| **P10** · helpers de test | **SIN DUEÑO** | — | primer consumidor `qo` 18 |
| **P12** · superficie de escritura compartida | **SIN DUEÑO** (no es reparable: es una restricción de orden) | — | afecta a los quince desde `qo` 18 |
| **P13** · catálogo y Guía | **SÍ**, dos dueños. `RUN-CANTU-COMPONENT-GUIDE-PACKET-WIRING-001` «Unify the Component Guide mechanism and fix its template» `qo` **33**; `RUN-CANTU-COMPONENT-GUIDE-CONTENT-001` «Write the Component Guide for the seventeen Web components» `qo` **34** | 33 y 34 | **después** del primer consumidor (`qo` 18). No bloquea: la DoD §S9 pone la Guía fuera de alcance de los runs de componente |
| **P8** · `hierarchy` sin delimitadores | **SÍ**, por adjudicación explícita del contrato, no por afinidad: `REFERENCE-MATH-FORMULA-COMPATIBILITY.md` §9 dice «the repair belongs to that component's own revalidation run», y la DoD §8 lo repite → `RUN-JAME-WEB-HIERARCHY-AUDIT-AND-REPAIR-001` «Audit and implement the Hierarchy component», `qo` **30** | `qo` 30 | **es su propio consumidor**. Posición correcta |
| **P2** capa B (cinco que no resuelven) | **SIN DUEÑO** | — | ver P5: es el mismo hueco |

**Cuatro huecos SIN DUEÑO con consumidores múltiples: P4 (tres compuertas), P5, P6 (montaje) y
P10.** Ninguno se adjudica por afinidad temática.

---

## 5. Criterio 5 — Tests que afirman el cableado de cada pieza compartida

**No se corrió la suite.** Conteo estático por lectura y `grep`. El repo declara 30 archivos de
test en `compiler-api/tests/` con **323 declaraciones `test(` de primer nivel**; el último conteo
por ejecución que consta en un record es **316/316 EXIT 0** el 2026-07-30
(`UNIFICACION-SELECTOR-COLOR-WEB-Y-COMPUERTA-DEL-COMPILADOR-CANTU.md` §10.1) — la diferencia no
se resuelve aquí y **se declara como no verificada**. Los «fallos previos conocidos» que el
encargo menciona son de **otra suite**: `tools/roadmap/tests/`, 4 fallos
(`clearProgress` 1, `createPhase` 2, `deletePhase` 1) según
`TOLERANCIA-DE-CLASIFICACION-EN-CANTU.md` §7, con causa en la arista huérfana
`RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`, que **sigue sin resolver en el canónico** (verificado hoy:
`RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` la declara y no existe tal `run_id`).

| Pieza | Tests que afirman su cableado | Archivo · nombre de test |
|---|---:|---|
| **P1** Control de color | **15** | `webSharedColorSelectorUnification.test.mjs` (8): «the shared color control derives the active palette, with no filter and no fixed list»; «every component that shares the control is wired to the palette in both placements»; «none of the six carries a closed enum any more, in either schema»; «a palette far larger than the retired enum is offered whole, stored and compiled by all six»; «an unknown token still falls back to ctx along the whole chain, for all six»; «the dropdown is clean and the colour lives in a swatch beside the field»; «hierarchy gains the palette without changing what it stores»; «the Slides surface keeps the control it had, untouched». `webColorSelectorCustomPicker.test.mjs` (7): «the box beside the field is a real picker, and it is the one iconList uses»; «only the two placements the compiler resolves opt in; the other five keep the swatch»; «a custom colour is stored as a hex and reads back as Personalizado, not as a token»; «a token keeps following the palette and a custom hex stays frozen, end to end»; «the two modes never coexist: one field, one value»; «the picker adds an option, it never removes one, whatever the palette holds»; «an unknown token id still falls back to ctx, in the three layers» |
| **P2** Resolvedor de color | **16** | `authorLiteColorSystem.test.mjs` (10): «author color palette exposes stable multi-role tokens»; «hex validation and normalization are strict and uppercase»; «token resolution supports ids, palette accents and custom hex colors»; «custom color role derivation is deterministic and rejects invalid input»; «author color options expose author-facing labels without mutating palette roles»; «workspace palette settings can add a token and derive roles from accent»; «workspace palette settings keep defaults and allow safe label/accent edits»; «v2 palette index keeps separate active web and slide palettes»; «v2 target palettes can share token ids while keeping different role values»; «v2 profiles expose active target palettes and preserve legacy token consumers». `webLegacyCertifiedColorPaletteReconciliation.test.mjs` (6): «header resolves its variant against the active Web palette and Core renderer honors compiled color»; «list resolves its variant…»; «legacy header and list drafts keep safe default palette fallbacks»; «columns has no own palette surface but propagates palette context to header and list children»; «iconList and card retain their existing bounded color behavior during reconciliation»; «Draft JSON save/load shape keeps header and list variant while Generate Web emits compiled color» |
| **P3** Entrega de la paleta | **1**, indirecto | `webLegacyCertifiedColorPaletteReconciliation.test.mjs` · «columns has no own palette surface but propagates palette context to header and list children». **Cero tests** afirman el cableado del hook `useAuthorColorPalette` ni la deriva Web/Slide |
| **P4** · compuerta `allowSplit` | **1** | `webTheoryComplexSplitSchemaCompiler.test.mjs:325` · «compiler rejects top-level split and unsafe direct split payloads even without schema parse» (`:329` casa `/solo se permite como child directo de Columns/`) |
| **P4** · compuerta `SPLIT_VARIANT_VALUES` | **CERO** | Barrido de los 30 archivos: el mensaje `Split Web tiene variant no permitido` **no aparece en ningún test**. Los tests de `split` sólo usan los tres valores admitidos (`:28`, `:42`, `:58`, `:73`, `:81`) |
| **P4** · compuerta `TIMELINE_DETAILS_VARIANT_VALUES` | **CERO para la compuerta del compilador; 1 para el enum del schema** | El mensaje `variante de detalle no permitida` **no aparece en ningún test**. Lo que sí hay: `webTimelineNormalStepsSafety.test.mjs:376` · «timeline details reject unsafe payloads and unsupported variants», que en `:388` rechaza `detailsVariant: 'warning'` **por schema**, no por compilador |
| **P4** · compuerta del badge de `table` | **1** | `webTablesParitySchemaCompiler.test.mjs:190` · «compiler fails closed for unknown rich table badge variants when called directly» (`:197` casa `/Variante de badge de tabla no permitida/`) |
| **P5** Mapa fijo del motor Web | **CERO** | Barrido de los 30 archivos por `commons` y `VARIANTS`: **cero coincidencias**. Ningún test afirma qué claves tiene el mapa, ni que un token de paleta ausente cae a `ctx` en el render |
| **P6** Insertor de fórmulas | **5 del motor, CERO del montaje, 1 de la ausencia** | `mathAuthoringFormulaInserter.test.mjs` (5): «evaluateFormulaSlashAction converts safe simple trailing-token cases to fraction»; «…converts selection + slash when token is safe»; «…blocks complex contexts and recommends explicit selection»; «…blocks malformed or unsafe payloads by default»; «evaluateFormulaButtonAction inserts empty and selected fractions conservatively». Los cinco prueban **evaluadores de acción**, no una UI montada. `webRuleSmartFormulaFieldRulePilot.test.mjs:259` afirma **que el shell NO está** en el campo de `rule` |
| **P7** Allowlist LaTeX | **9 + 7** | `mathAuthoringAllowlistExpansion.test.mjs` (9) y `webRuleMathAuthoringIntegration.test.mjs` (7) |
| **P8** Auto-render de KaTeX | **7 + referencias** | `mathAuthoringVirtualKeyboardKatexCompatibility.test.mjs` (7). Referencias a KaTeX además en `mathAuthoringAllowlistExpansion`, `mathAuthoringSmartFormulaFieldContractStability`, `webRuleMathAuthoringIntegration`, `webTheoryComplexSplitSchemaCompiler`, `webTimelineNormalStepsSafety`. **Cero tests** afirman que `hierarchy` renderiza math, que es justamente el hueco |
| **P9** Formato del packet | **CERO** | Barrido por `docs/components` y `COMPONENT-DOC-SINGLE-SOURCE`: **cero coincidencias** en los 30 archivos. Ningún test afirma que un packet tenga sus ocho secciones ni que sus punteros existan |
| **P10** Helpers de test | **CERO** — no hay pieza que afirmar | — |
| **P11** El procedimiento (DoD) | **CERO** | Ningún test lee la DoD ni verifica que un run la haya seguido |
| **P12** Superficie de escritura | **CERO como pieza**, pero **13 de los 30 archivos** afirman sobre el **texto fuente** de `WebBlockEditor.jsx` y los schemas, lo que convierte el archivo en superficie de test de facto |
| **P13** Catálogo y Guía | **CERO en la suite.** Fuera de la suite: `tools/author-lite/scripts/checkComponentGuideTextIntegrity.cjs`, 42 líneas, que la DoD `qo` 33 manda desmantelar | — |
| **P14** Defaults por bloque | **2**, indirectos | Dos archivos importan `blockFactory.js` |

**Cinco piezas compartidas con CERO tests que afirmen su cableado: P5, P9, P10, P11 y P13.** Y
dos de las tres compuertas del compilador (`split` variant y `timeline` detailsVariant) tienen
**CERO** tests que las ejerciten desde el compilador.

---

## 6. Criterio 6 — El insertor de fórmulas: ¿su posición es honesta o miente?

**Veredicto: SU POSICIÓN ES HONESTA. Lo que miente es la premisa sobre la que descansa.**

### 6.1 Lo que dice el run 41, verbatim

`RUN-JAME-FORMULA-INSERTER-INTEGRATION-001`, `queue_order` **41**, `status: planned`,
`depends_on: ["RUN-JAME-MATHLIVE-INTEGRATION-READINESS-001"]` (que está `completed`).

> Verify, after the Web component revalidation round, that the Formula Inserter was correctly
> integrated wherever components expanded it, rather than integrating it here. **The Formula
> Inserter engine already ships integrated into the Rule Smart Formula Field and is RULE_ONLY
> today; its expansion to specific components happens inside those components' own revalidation
> runs.** This Run audits the result across components: consistent editor entry, normalization,
> validation, preview, compile and rendered output within the accepted MathLive and RULE_ONLY
> boundaries, with no component made global-ready beyond what its own run established. This Run
> verifies and does not itself integrate; dependencies on the specific component runs it audits
> are added when the Web component objective is itself audited.

### 6.2 Por qué la posición es honesta

Un run de verificación **debe** ir después de lo que verifica. Los quince runs son los que, según
este texto, expandirían el insertor. Que 41 vaya después de 32 es correcto por construcción, y el
propio texto reconoce que **le faltan las aristas** («dependencies … are added when the Web
component objective is itself audited»): hoy `qo` 41 es **elegible** y no depende de ninguno de
los quince, lo que es una arista faltante declarada, no un orden mentiroso.

### 6.3 Por qué la premisa es falsa, y qué falta

**Medido en disco:**

| Afirmación del run 41 | Medición |
|---|---|
| «The Formula Inserter engine already ships integrated into the Rule Smart Formula Field» | **Parcialmente cierta.** Los evaluadores (`formulaInserter.actions.js`) los consume el módulo de estado del Smart Formula Field. **Pero `FormulaInserterShell.jsx` —la UI— no lo importa ninguna superficie del editor**: 0 imports en todo `tools/`, y un test (`webRuleSmartFormulaFieldRulePilot.test.mjs:259`) afirma que **no está** en el campo de `rule` |
| «its expansion to specific components happens inside those components' own revalidation runs» | **Ninguno de los quince `full_description` contiene la palabra "expand", "integrate" ni "mount"** aplicada al insertor. Los cinco que nombran el contrato de math dicen «Audit … against … the math and Formula Inserter compatibility contract» y «implement the missing integration» — **auditar contra un contrato no es montar una UI que no existe** |

### 6.4 ¿Existe trabajo de REPARACIÓN del insertor del que dependan los componentes? SÍ. ¿Tiene run? NO.

Tres piezas de trabajo, medidas:

| Trabajo requerido | ¿Existe hoy? | ¿Tiene run? |
|---|---|---|
| **Montar `FormulaInserterShell`** en alguna superficie de autoría | No — 0 imports | **SIN DUEÑO.** `qo` 41 sólo verifica; `qo` 11 (`completed`) reparó el campo avanzado de `rule`, no el shell |
| **Llevar el campo de fórmula visual a los otros componentes con math** (`arithmetic` 25, `split` 27, `table` 28, `hierarchy` 30, `timeline` 31) | No — los cinco usan `<input>`/`<textarea>` monoespaciados: `WebBlockEditor.jsx:1498`, `:1598` (split), `:2935`, `:2946` (table), `:3265` (arithmetic), `:3545`, `:3614` (hierarchy), `:3765` (timeline) | Formalmente sí, dentro de cada run de componente, **pero ninguno lo nombra**: los cinco dicen «implement the missing integration», que es ambiguo. La DoD §8 lo cierra en contra: «Only `rule` has one» |
| **Reparar `hierarchy`**, cuyo math se emite sin delimitadores | No | **SÍ** — `qo` 30, adjudicado explícitamente por el contrato §9 |

### 6.5 La corrección de premisa del run 11, que también hay que declarar

`RUN-CANTU-MATH-ALLOWLIST-EXPANSION-AND-FORMULA-EDITOR-001` (`qo` 11, `completed`) dice verbatim:

> This Run owns the shared formula authoring surface **because six components consume it** and
> Rule is the reference implementation the others will copy.

**Medido: la consume UN componente, `rule`, en dos colocaciones.** Los otros cinco «componentes
con math» comparten el *concepto*, no la *pieza*: sus campos son texto opaco validado por
refinamientos de texto plano, no por `validateRuleMathValue`
(`draftSchema.js:401`, `:426`, `:453`, `:470`, `:843` frente a `:780` y `:786`). La frase «the
others will copy» describe trabajo futuro sin dueño, no un cableado existente.

---

## 7. Criterio 7 — Color, paleta y compuerta del compilador: el alcance exacto

### 7.1 (a) Los cinco componentes que emiten sólo el token id contra un mapa fijo

**Medido hoy en `tools/author-lite/compiler-api/services/compiler.js`:**

| Componente | `qo` | Línea del compilador | Qué emite |
|---|---:|---|---|
| `callout` | 23 | `:1080` | `variant: normalizeVariant(block.variant)` — **sin `color`** |
| `details` | 24 | `:381` (por ítem) | `variant: normalizeVariant(item.variant)` — sin `color` |
| `rule` | 26 | `:367` | `variant: normalizeVariant(src.variant)` — sin `color` |
| `table` | 28 | `:520` | `variant: normalizeVariant(src.variant)` — sin `color` |
| `conceptGrid` | 29 | `:390` (por ítem) | `variant: normalizeVariant(item.variant)` — sin `color` |

**Cinco. La cifra del ticket es exacta.** Frente a ellos, los **dos** de los quince que sí emiten
un hex resuelto: `list`(18) en `:1108` y `card`(20) en `:356`. Fuera de los quince, `header` en
`:1066`.

Un sexto componente emite también sólo el token id —`split`(27), `compiler.js:651`
`variant: src.variant || 'ctx'`— pero **no está en el grupo de los cinco** porque su enum sigue
cerrado en tres valores y su compuerta lo rechaza todo lo demás: no puede llegarle un token de
paleta. Se declara para que el cinco no se lea como seis.

### 7.2 El mapa fijo contra el que resuelven: la cifra del ticket es INCORRECTA

`src/builders/web/partials/commons.js`:

- **`VARIANTS` (`:71-90`) tiene TRECE claves, no doce.** Contadas cargando el módulo:
  `def, ctx, ex, meta, focus, str, res, success, wrn, warning, err, error, code`.
  Tres están marcadas `// Alias` en el propio archivo (`success`, `warning`, `error`) y una es de
  snippets (`code`).
- `PALETTE` (`:50-68`) tiene **diez** claves.

El ticket dice doce y el record `UNIFICACION-…-COMPUERTA-…` §6.1 también dijo «un mapa fijo de
doce claves» citando `commons.js:71-90`. **El rango de líneas es correcto; el conteo no.**
Gana el disco: **trece**.

### 7.3 (b) La segunda compuerta dentro del compilador: tres componentes de los quince

| Compuerta | Componente afectado | `qo` | Valores que admite | Lo que el editor ofrece hoy |
|---|---|---:|---|---|
| `SPLIT_VARIANT_VALUES` (`:66`, usada `:579-581`) | `split` | 27 | **3** (`ctx`, `focus`, `wrn`) | `SPLIT_VARIANT_OPTIONS` `WebBlockEditor.jsx:354`, **3** — coinciden |
| `TIMELINE_DETAILS_VARIANT_VALUES` (`:55`, usada `:985-987`) | `timeline` | 31 | **4** (`def`, `ctx`, `wrn`, `success`) | `TIMELINE_DETAIL_VARIANT_OPTIONS` `:58`, **3** (`''`=Normal, `wrn`, `success`) — **el desplegable es MÁS CORTO que su propio enum**, y `''` no es ninguno de los cuatro |
| `TABLE_BADGE_VARIANT_MAP` + `normalizeTableBadgeVariant` (`:24-34`, `:479-483`) | `table` (badge) | 28 | los 9 de `VARIANT_VALUES` + **9 alias de fixture** (5 nombres de color + 4 hex literales) | `TABLE_BADGE_VARIANT_OPTIONS` `:334-347`: **19 entradas** (1 default + 9 de `VARIANT_OPTIONS` + 9 de fixture). **El record anterior dijo 18; medido hoy: 19** |
| `context.allowSplit` (`:1151-1155`) | `split` | 27 | sólo como hijo directo de `columns` | `blockCatalog.js:872` `disabled: true` — primera compuerta, en el catálogo |

**Lista de afectados por (b): `split`(27), `table`(28), `timeline`(31) — 3 de los quince.**

### 7.4 ¿La lista de afectados EXCEDE a los quince? SÍ

| Por (a) — el mapa fijo del motor | Detalle |
|---|---|
| **`header`**, `qo` 15, `completed` | `renderHeader.js:18-22` lo consulta; prefiere `data.color` cuando es hex válido, luego está **reconciliado**, pero sigue atado al mapa para el resto |
| **`narrative`**(22), **`arithmetic`**(25), **`conceptGrid`**(29), **`timeline`**(31), **`hierarchy`**(30) | pintan contra mapas fijos **propios** o contra `Commons.PALETTE`, no contra la paleta del autor: `renderNarrative.js:18-27`, `renderArithmetic.js:18-31`, `renderConceptGrid.js:10-19`, `renderTimeline.js:11-13`, `renderHierarchy.js:20-21` |
| **La superficie Slide entera** | `src/builders/slides/helpers/commons.js:15` es **otro mapa fijo**, con sus propios consumidores: `slides/components/renderCallout.js:73`, `renderCard.js:203`, `renderRule.js:71`, `layouts/renderHierarchySlide.js:21-22`; y `layouts/renderConceptGridSlide.js:6` declara un tercero. El objetivo Slide del roadmap (`qo` 42..48) **heredará el problema intacto** |
| **La Guía de componentes** | `ComponentGuide.jsx:38` importa `colorSystem.js`: la Guía enseña la paleta y el motor pinta el mapa |
| **El editor de paletas** | expone los cuatro roles por token (`accent`, `surface`, `border`, `text`); **ningún compilador ni renderer lee otro rol que `accent`** — decisión abierta 6 del contrato de color |

| Por (b) — la compuerta | Detalle |
|---|---|
| Sólo `split`, `table` y `timeline`. **No excede a los quince.** El schema de Slides (`SlideCardItemSchema:1014`) conserva `VariantEnum` cerrado, pero eso es enum de schema, no compuerta de compilador |

---

## 8. Criterio 8 — El procedimiento, que también es pieza compartida

### 8.1 ¿Existe el ciclo en cuatro tiempos? SÍ

**`docs/reference/REFERENCE-COMPONENT-REVALIDATION-DEFINITION-OF-DONE.md` — 364 líneas**,
registrada en `.aiw/docs/docs_index.json`. Producida por
`RUN-JAME-WEB-COMPONENT-CONTRACT-STANDARDIZATION-001` (`qo` 9, `completed`), que es dependencia
declarada de los quince.

Los cuatro tiempos están, con estas etiquetas:

| Tiempo del encargo | Dónde está | Líneas |
|---|---|---|
| **Medir** | S1 identidad, S2 auditoría de estado, S3 color, S4 math, S5 colocación en `columns`, S6 persistencia | `:96-122` |
| **QA del operador** | S7, más la frontera completa de §6 («Human QA is executed by the operator, never by the workshop») | `:123-125` y `:209-241` |
| **Reparar** | S8, la compuerta de reparación: «Repair is authorized only by a Human QA verdict» | `:126-133` |
| **Re-QA** | dentro de S8: «then re-run the affected steps S2-S6 and re-prepare the S7 packet», y el veredicto `REPAIR_DECLARED_REVERIFIED` | `:128-129`, `:163` |

Lleva además cinco veredictos cerrados (`:160-166`), una tabla de evidencia por componente
(`:247-265`), la matriz de aplicabilidad color/math por componente (`:179-197`) y nueve
excepciones por componente (`:272-297`).

### 8.2 Tres derivas de la DoD contra el disco, que hay que declarar

La propia DoD manda que gane el disco («if the live measurement diverges from the matrix row, the
disk wins and the divergence is declared»). Se declaran:

1. **§5, la matriz de aplicabilidad, está vencida en al menos cinco filas.** Dice «Color surface
   today: none» para `details`, `split`, `table`, `conceptGrid` y `rule`. Medido: los cinco
   **tienen** superficie de color —`DetailsItemSchema:323`, `WebSplitColumnsChildSchema:868`,
   `WebTableSchema:809`, `ConceptGridItemSchema:333`, `WebRuleSchema:778`— y cuatro de ellos
   reciben la paleta activa desde el run 16. La DoD es del **2026-07-28**; el run 16 cerró el
   **2026-07-30**.
2. **§2 dice «seventeen run pairs … thirty-four runs in total».** El canónico de hoy tiene
   **17 runs de desarrollo** (13, 15 y los quince — dos ya `completed`) y **5 de documentación**
   (`qo` 14 más los cuatro lotes 35..38): **22, no 34**. Es el rediseño del carril DOCUMENTATION
   ya registrado en `REDISENO-CARRIL-DOCUMENTATION-CANTU.md`.
3. **§9 y §3 apuntan a `docs/archive/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md`
   como fuente única de estado** — esa ruta **sí existe**. Pero los 16 packets apuntan a
   `docs/author-lite/components/…`, que **no existe**. La DoD está bien y los packets mal.

### 8.3 ¿Existe una lista de comprobación de QA por componente? NO para los quince

- **El molde existe:** DoD §6 (`:219-226`) fija el contenido del packet de QA, y §7 (`:247-265`)
  la tabla de evidencia. Son plantilla, no lista rellenada.
- **Packets de QA reales en disco: 6**, todos en `docs/_historical_run_record/`:

| Archivo | Líneas | Componente |
|---|---:|---|
| `RUN-JAME-WEB-COLUMNS-REVALIDATION-001-OPERATOR-QA-PACKET.md` | 120 | `columns` |
| `RUN-JAME-WEB-HEADER-REVALIDATION-001-OPERATOR-QA-PACKET.md` | 132 | `header` |
| `RUN-JAME-WEB-HEADER-REVALIDATION-001-OPERATOR-RE-QA-PACKET.md` | 79 | `header` (re-QA) |
| `RUN-JAME-WEB-HEADER-REVALIDATION-001-OPERATOR-RE-QA-PACKET-ROUND-3.md` | 90 | `header` (ronda 3) |
| `RUN-CANTU-COLOR-SELECTOR-UNIFICATION-001-OPERATOR-QA-PACKET.md` | 95 | transversal, 8 comprobaciones |
| `RUN-CANTU-COLOR-SELECTOR-UNIFICATION-001-OPERATOR-QA-PACKET-ROUND-2.md` | 77 | transversal |

**Para los quince componentes: CERO packets de QA.** Y de los seis, **sólo uno está registrado**
en `.aiw/docs/docs_index.json` (el de `columns`); los cinco de `header` y del selector de color
**no lo están** — el índice tiene 149 entradas, todas apuntando a archivos que existen, y ninguna
apunta a esos cinco.

**Este encargo no escribe ninguna: sólo mide si está.**

---

## 9. Criterio 9 — Veredicto ordenado, sin tocar nada

Lo que debe ocurrir **antes** de que se ejecute el primero de los quince (`qo` 18, `list`), en
orden, con el coste medido de no hacerlo. **No se edita el roadmap y no se redacta texto de run
nuevo como si fuera a escribirse.**

### 0 · Antes de todo: dos decisiones del operador (§10)

No son trabajo de taller. Sin ellas, tres de los quince (`split` 27, `table` 28, `timeline` 31)
entran con una pieza compartida sin resolver y **la DoD los obliga a terminar en
`BLOCKED_ON_OPEN_DECISION`** (`:165`, `:319-327`). **Coste de no hacerlo:** tres de los quince
producen un veredicto bloqueado en vez de un componente revalidado, y hay que volver a pasar por
los tres.

### 1 · El mapa fijo del motor Web (P5) — la más cara, y la que no tiene dueño

**Qué falta:** decidir y ejecutar cómo llega la paleta activa al color pintado de los cinco que
hoy emiten sólo el token id. Hay dos vías medidas: (a) que el compilador resuelva el accent para
los cinco, como ya hace con `header`, `list` y `card` —tres llamadas más a
`resolveVariantAccentColor` en `compiler.js`—; (b) que los renderers prefieran `data.color`, como
ya hacen `renderHeader.js:18-22` y `renderList.js:92`.

**Recomendación de posición si se decide insertar un run:** **antes de `qo` 18**, es decir en la
posición 18, desplazando a los quince. Razón medida: es la única pieza cuya reparación **cambia
el criterio de la QA humana** de cinco de los quince. Si se repara después, los cinco packets de
QA ya firmados por el operador quedan describiendo un color que dejó de ser el que se pinta.

**Coste medido de no hacerla antes:**
- **5 de los quince** (`callout` 23, `details` 24, `rule` 26, `table` 28, `conceptGrid` 29) pasan
  QA humana con un control que ofrece la paleta entera y una salida que pinta 13 claves fijas.
- **10 de los quince** consumen el mapa por renderer, más 3 con mapas propios: **13 de 15**
  quedan sujetos a una segunda pasada.
- **0 tests** protegen hoy el comportamiento, así que la segunda pasada no tiene red.
- La regla del encargo se cumple aquí literalmente: **N consumidores ya copiados obligan a
  rehacer N.** N = 5 como mínimo, 13 como máximo.

### 2 · La segunda compuerta del compilador (P4) — sin dueño, tres consumidores

**Qué falta:** decidir si el compilador entra en alcance y, si entra, retirar o ampliar las tres
compuertas. Está medido que retirar sólo el enum del schema **produce un editor que ofrece
valores que el compilador rechaza** (`UNIFICACION-…` §2.2-1, probado punta a punta).

**Recomendación de posición:** **antes de `qo` 27** (el primero de los tres consumidores). No
hace falta antes de 18.

**Coste medido de no hacerla antes:** `split`(27), `table`(28) y `timeline`(31) revalidan y pasan
QA con una superficie de color que sus propios runs no pueden cerrar; los tres vuelven. Además,
`timeline` arrastra la decisión del `success` (§10.1) y **su compuerta de compilador no tiene ni
un test**, luego una reparación posterior es ciega.

### 3 · El montaje del insertor de fórmulas (P6) — sin dueño, cinco runs lo dan por hecho

**Qué falta:** decidir si el `FormulaInserterShell` se monta y dónde; y, con ello, si los cinco
componentes con math de Superficie B reciben el campo visual o se quedan en texto opaco.

**Recomendación de posición:** **antes de `qo` 25** (`arithmetic`, el primero de los cinco cuyo
texto nombra el contrato del insertor). Si la decisión es «no se monta», entonces **no hace falta
ningún run**, pero sí hace falta que el operador sepa que `qo` 41 auditará una integración que no
existe.

**Coste medido de no hacerla antes:** cinco de los quince (25, 26, 29, 30, 31) auditan «against
the … Formula Inserter compatibility contract» sobre una UI ausente; el resultado de esa
auditoría será, en cuatro de los cinco, `MATH_FORMULA_NOT_APPLICABLE` o
`MATH_FORMULA_TEXT_SURFACE_ONLY` — correcto, pero **el run 41 llegará a verificar una expansión
que nadie hizo** y no podrá cerrar.

### 4 · Refrescar la §5 de la DoD (P11)

**Qué falta:** que la matriz de aplicabilidad describa el disco de hoy, no el del 2026-07-28.
**Recomendación de posición:** **antes de `qo` 18**. Es lectura y escritura de un solo archivo de
documentación; no toca código.
**Coste medido de no hacerlo:** los quince ejecutan S3 y S4 contra una fila vencida y **los
quince tendrán que declarar la divergencia por separado** — quince declaraciones de la misma
cosa, que es exactamente el patrón que el encargo llama caro. Es la corrección **más barata de
las cinco** y la que ahorra más repetición.

### 5 · Los helpers de test (P10) y la superficie de escritura (P12) — no se reparan antes, se declaran

**Qué falta:** nada que un run pueda entregar. Son restricciones.
**Recomendación:** ninguna inserción. Lo que sí conviene fijar **antes de `qo` 18** es la
**disciplina de orden**: los quince tocan `WebBlockEditor.jsx` (4083 líneas), los dos
`draftSchema.js` y `compiler.js`; y 13 de los 30 archivos de test afirman sobre el **texto
fuente** del editor. **Coste medido de no declararlo:** cualquier reordenación del editor por uno
de los quince rompe tests de componentes que no tocó, y el fallo aparece en el run siguiente, no
en el causante.

### 6 · Lo que NO hay que hacer antes, y por qué

| Pieza | Por qué puede esperar |
|---|---|
| **P9** packets (64 punteros muertos) | Sus dueños existen (`qo` 35..38), dependen de los runs de componente y la DoD §S9 retira ese deber de los quince **a propósito**. Coste de no adelantarlo: **cero para los quince** |
| **P13** catálogo y Guía | Sus dueños existen (`qo` 33 y 34) y la DoD §S9 pone la Guía fuera de alcance. Excepción: `split`(27) **debe** tocar `blockCatalog.js:872` para decidir su alcance, y `list`(18) tiene guía en línea protegida por script — dos casos puntuales, no un bloqueo general |
| **P8** `hierarchy` | Su dueño es su propio run, `qo` 30. Posición correcta |
| **P7** allowlist LaTeX | Está lista y acotada a `rule` por diseño |

### 7 · Resumen del orden recomendado

1. **Decisiones del operador** (§10): alias de feedback / `success`; alcance del compilador; alcance de `split`.
2. **Refrescar la §5 de la DoD** — barato, evita quince declaraciones repetidas.
3. **El mapa fijo del motor Web** — antes de `qo` 18, o se rehacen entre 5 y 13.
4. **La segunda compuerta del compilador** — antes de `qo` 27.
5. **La decisión sobre el insertor** — antes de `qo` 25.
6. **Declarar la disciplina de orden y la fragilidad de los tests de texto fuente** — antes de `qo` 18.

---

## 10. Criterio 11 — PARA Y REPORTA: informe de opciones, con coste medido y recomendación

**Se para en tres decisiones. Son del operador y este encargo no las toma.**

### 10.1 Decisión A — Los alias de feedback del motor y el `success` de `timeline`

**El hecho medido:** `commons.js:71-90` define `success`, `warning` y `error` como alias
(`// Alias`); la paleta del autor no define ninguno de los tres; y
`TIMELINE_DETAIL_VARIANT_OPTIONS` (`WebBlockEditor.jsx:58-62`) **sí ofrece `success` al autor**.
Un `success` guardado renderiza verde por el alias del motor y **resuelve a `ctx`** contra la
paleta del autor. Es la decisión abierta 4 del contrato de color, transcrita allí en español.

| | **A — promover los alias a tokens reales de la paleta** | **B — retirar `success` del desplegable y del enum** | **C — mapearlo a `res`** |
|---|---|---|---|
| ¿Toca código del repo? | **No, ninguna línea** — es un dato de la paleta del operador | Sí: editor + los dos schemas | Sí: editor, más decidir qué token |
| Drafts afectados | **0** (medido en la sesión del run 16: único valor hallado, `wrn` ×3) | **0** | **0** |
| Tests rotos (medido entonces) | **0** | **1** | **0** |
| ¿Desbloquea el enum de `timeline`? | **No por sí sola** — falta la compuerta del compilador | **No por sí sola** — ídem | **No** |
| Lo que se pierde | nada | una capacidad expresiva que el motor sí soporta | la equivalencia con el alias verde del motor |

**Recomendación, sin decidir: A.** Es la única que no toca una línea del repo y cierra el
desdoblamiento en el lado del dato. **B** es defendible si `success` nunca debió ser
author-facing. **C** se desaconseja. Coincide con la recomendación del contrato de color y con la
del record del run 16; **este encargo no aporta razón nueva para cambiarla, y tampoco decide**.

### 10.2 Decisión B — ¿Entra el compilador en alcance?

**El hecho medido:** las tres compuertas de `compiler.js` (`:66`/`:579`, `:55`/`:985`,
`:24-34`/`:479`) son la razón por la que `split`, `timeline` y el badge de `table` quedaron fuera
de la unificación del selector de color. Mientras el compilador esté fuera de alcance, esos tres
**no pueden** cerrar su superficie de color, y sus runs (27, 28, 31) terminarán con la superficie
a medias.

| | **A — el compilador entra en alcance dentro de cada run de componente** | **B — el compilador entra en un run propio, antes de `qo` 27** | **C — no entra: los tres quedan acotados y se documenta** |
|---|---|---|---|
| ¿Quién lo toca? | `qo` 27, 28 y 31, cada uno su compuerta | un run nuevo, uno solo | nadie |
| Superficie de escritura | `compiler.js` tocado por **tres** runs distintos — choca con la regla 7 si no van en serie (van en serie de todos modos) | `compiler.js` tocado **una vez** | intacto |
| Tests que hoy protegen lo que se cambiaría | `split`: **0**; `timeline`: **0** (sólo el enum del schema, 1); `table` badge: **1** | los mismos | — |
| Coste de no hacerlo | tres de los quince vuelven | tres de los quince vuelven | el autor de `split` sigue en el techo de 3; `timeline` ofrece 3 de sus 4; el badge de `table` mantiene 19 opciones fijas frente a una paleta ilimitada |
| Riesgo | tres reparaciones ciegas (dos sin ningún test) | una reparación, con margen para escribir los tests que faltan primero | ninguno técnico; sí de expectativa del autor |

**Recomendación, sin decidir: B**, y con una precondición medida — **escribir primero los tests
que faltan** (`split` variant: 0; `timeline` `detailsVariant` en el compilador: 0), porque hoy
dos de las tres compuertas se pueden romper sin que nada falle. **C** es perfectamente
defendible si el operador prefiere congelar la salida compilada; en ese caso lo que hay que
hacer es **documentarlo en los tres packets**, y eso ya tiene dueño (`qo` 37 y 38).

### 10.3 Decisión C — El alcance de `split`

**El hecho medido:** `split` tiene **dos** compuertas cerradas —`blockCatalog.js:872`
`disabled: true` con `disabledReason`, y `compiler.js:1151-1155` `allowSplit`— y **una tercera**
en su enum (`:66`). Su propio run, `qo` 27, se titula «Decide scope and enable the Split
component», y su `full_description` ofrece **tres salidas explícitas**:

> Determine whether to enable it as a full author-facing component, keep it as a Columns child
> only, or defer it, then implement that decision against the color and palette compatibility
> contract where applicable.

| | **A — componente author-facing completo** | **B — sólo hijo de `columns`** (estado de hecho actual) | **C — diferirlo** |
|---|---|---|---|
| Qué se toca | `blockCatalog.js:872`, `compiler.js:1151-1155`, el enum `:66`, el editor y los dos schemas | nada, o sólo el enum si además entra la decisión B de §10.2 | nada |
| Drafts existentes | 6 usos medidos en la sesión del run 16 (`ctx` ×3, `focus` ×2, `wrn` ×1): **usa los tres valores del techo** | siguen igual | siguen igual |
| Tests que hoy lo fijan | 10 en `webTheoryComplexSplitSchemaCompiler.test.mjs`, de los cuales 1 afirma que **no** se permite top-level | los mismos, intactos | los mismos |
| Efecto en `qo` 37 | el packet `SPLIT.md` cambia de raíz | cambio menor | se documenta como diferido |

**Recomendación, sin decidir: B**, porque es el estado que el código, los tests y los drafts
sostienen hoy, y porque **A obliga a retirar la única compuerta con test** (`:329`,
«compiler rejects top-level split»). **La decisión es del operador y su run es el 27**; lo único
que este informe añade es que **la parte de la decisión que toca el compilador no está nombrada
en el texto del run**, y por tanto hoy nadie la ha adjudicado formalmente.

### 10.4 Los otros tres supuestos del criterio 11

| Supuesto | ¿Se dio? |
|---|---|
| El canónico no coincide con lo que el ticket afirma | **NO se dio.** La guarda de §1 pasa carácter por carácter |
| Haría falta modificar algún archivo para observar algo | **NO se dio.** Todo se midió leyendo y con `grep`; los scripts de medición viven en el scratchpad de sesión, fuera de los dos repos |
| Una pieza compartida con consumidores **fuera de Cantu** | **NO se dio.** Todos los consumidores medidos viven dentro de `projects/cantu-studio`. Sí hay consumidores **fuera de los quince** —`header` (`qo` 15), la superficie Slides (`SlideCardEditor.jsx:26`, `SlideItemEditor.jsx` vía `VisualFields`), la Guía y el motor Slide—, y se declaran en §2 y §7.4, pero **ninguno está fuera del proyecto** |

---

## 11. Criterio 10 — Las cifras del ticket, verificadas una a una

**Ninguna se dio por buena. Todas re-medidas hoy.**

| Cifra del ticket (relevo del 2026-08-01) | Medido hoy | Veredicto |
|---|---|---|
| Total de runs: **63** | 63 (7 objetivos, 28 fases, 126 aristas `depends_on`) | **EXACTA** |
| `planned`: **46** | 46 `planned` / 17 `completed` | **EXACTA** |
| Elegibles: **20** | 20 `planned` con todas sus aristas en `completed`: `qo` 17..33, 41, 42, 58 | **EXACTA** |
| Runs de componente: **15**, `queue_order` **18..32** | 15, densos, sin hueco ni duplicado | **EXACTA** |
| Packets en `docs/components/web/`: **17** | 17 archivos `.md` | **EXACTA** |
| Componentes que emiten sólo token id: **5** | `callout`, `details`, `rule`, `table`, `conceptGrid` | **EXACTA** — con el matiz de que `split` también emite sólo token id pero está tras compuerta (§7.1) |
| Claves del mapa fijo del motor Web: **12** | **13** en `VARIANTS` (`commons.js:71-90`); 10 en `PALETTE` (`:50-68`) | **INCORRECTA.** Gana el disco: **trece** |
| Ids en `.aiw/state/component_status.json`: **16** | 16 `component_id`; falta `columns`, que es el decimoséptimo | **EXACTA** |
| «La suite de este repo tiene fallos previos conocidos» | Los 4 fallos conocidos son de **`tools/roadmap/tests/`**, no de `compiler-api/tests/`. La suite de `compiler-api` constaba **316/316 EXIT 0** el 2026-07-30. Hoy hay **30 archivos** con **323 declaraciones `test(`** estáticas | **AMBIGUA, desglosada.** No se corrió ninguna suite |
| — añadida por medición — «los quince no tienen test runner» (texto de los quince runs) | Hay 30 archivos de test y `node --test`; **no** hay script `"test"` en ningún `package.json` | **La frase de los quince runs es engañosa** (§1.2) |

### 11.1 Cifras heredadas de otros records, también re-medidas

| Cifra | Fuente | Medido hoy | Veredicto |
|---|---|---|---|
| `TABLE_BADGE_VARIANT_OPTIONS` = **18** | `UNIFICACION-…` §2.2 fila 10 | **19** (1 + 9 + 9), `WebBlockEditor.jsx:334-347` | **corregida a 19** |
| «mapa fijo de **doce** claves» | `UNIFICACION-…` §6.1 | **13** | **corregida a 13** |
| «**seis** componentes consumen la superficie de fórmula compartida» | `full_description` de `qo` 11 | **1** (`rule`), 2 colocaciones | **corregida a 1** |
| Canónico: **74 runs**, md5 `128a233c…` | `UNIFICACION-…` §1 (2026-07-30) | **63 runs**, md5 `6d13a7c617801b4b197b6075f418cbac` | el canónico se rehízo entre medias; el md5 coincide con el del relevo del 2026-08-01 |
| `docs_index`: **149** entradas | `UNIFICACION-…` §14 | 149, y **las 149 apuntan a archivos que existen** | **EXACTA** |
| md5 de `compiler.js` `c1177c44…` | `UNIFICACION-…` §12 | `c1177c44c6db3270ba83f1817827f28f` | **sin mover** |
| md5 de `VariantSelect.jsx` `58afff01…` y de `WebBlockEditor.jsx` `e3408117…` | `UNIFICACION-…` §18 | `f00668e304fbe4865f27fe5a0bcbf915` y `f7a81ff87675a17220568ecc0e1ec72e` | **movidos** — hubo una ronda posterior (la del picker personalizado, `webColorSelectorCustomPicker.test.mjs`), y `RUN-CANTU-COLOR-SELECTOR-UNIFICATION-001` figura hoy `completed`, no `active` |

---

## 12. Discrepancias declaradas entre records y disco (gana el disco)

Ningún record se reescribe hacia atrás. Se declaran aquí:

1. **`UNIFICACION-SELECTOR-COLOR-WEB-Y-COMPUERTA-DEL-COMPILADOR-CANTU.md` §6.1** dice «mapa fijo
   de doce claves». Disco: **trece**. El rango de líneas que cita es correcto.
2. **Mismo record, §2.2 fila 10**: `TABLE_BADGE_VARIANT_OPTIONS` «18 entradas». Disco: **19**.
3. **Mismo record, §16**: deja el run 16 en `active`. Canónico de hoy: **`completed`**.
4. **Mismo record, §1**: 74 runs. Canónico de hoy: **63**.
5. **`REFERENCE-COMPONENT-REVALIDATION-DEFINITION-OF-DONE.md` §5**: cinco filas dan «Color
   surface today: none» para componentes que sí la tienen (§8.2-1).
6. **Misma DoD §2**: «thirty-four runs in total». Canónico: **22** (§8.2-2).
7. **`full_description` de `RUN-CANTU-MATH-ALLOWLIST-EXPANSION-AND-FORMULA-EDITOR-001`**: «six
   components consume it». Disco: **uno** (§6.5).
8. **Los quince `full_description`**: «the repository has no test runner». Disco: 30 archivos de
   test y `node --test`; lo que falta es el script `npm` (§1.2).
9. **`RUN-JAME-FORMULA-INSERTER-INTEGRATION-001`**: «The Formula Inserter engine already ships
   integrated into the Rule Smart Formula Field». Disco: los evaluadores sí; **la UI no está
   montada en ninguna parte** (§6.3).
10. **`CLAUDE.md` del repo** describe la fase 8.6 y una matriz de estados (`list` =
    `MANUAL_QA_APPROVED`, `video`/`details` = `NOT_STARTED`, `rule` = `DEFERRED`) que ni el
    roadmap ni `component_status.json` sostienen hoy. Se nombra; no se toca.
11. **Los 16 packets de `docs/components/web/`** (todos menos `COLUMNS.md`) apuntan a dos rutas
    que no existen, cuatro veces cada uno: **64 punteros muertos**.

---

## 13. No-claims de este record

- **No se escribió ni un byte dentro de `projects/cantu-studio`.** Sólo lectura, `grep`,
  `md5sum`, y carga en lectura de tres módulos del repo (`commons.js`, `roadmap.json`,
  `component_status.json`) para contar claves.
- **No se corrió ninguna suite**, ni la de `compiler-api` ni la de `tools/roadmap`. Los conteos
  de tests son estáticos y se declaran como tales.
- **No se editó el roadmap canónico**, ni `status`, ni `queue_order`, ni `depends_on`, ni
  `.project/`, ni `component_status.json`, ni `docs_index.json`.
- **No se redactó texto de run nuevo.** Las inserciones de §9 son recomendaciones de posición con
  coste medido, no propuestas de redacción.
- **No se tomó ninguna de las tres decisiones abiertas del operador** (§10). Se midieron, se
  costearon y se recomendó; elegir es suyo.
- **No se reparó ninguna deriva**, aunque se cruzaron once (§12).
- **No se certifica ningún componente, contrato ni superficie.** El estado de componente sigue
  teniendo una sola fuente, la matriz que la DoD §9 nombra.
- **No se ejecutó Git en ninguna forma**, no se levantaron servidores, no se abrió la consola.
- **Archivos escritos por este encargo: uno.** Este record. Los archivos temporales de medición
  viven en el scratchpad de sesión, fuera de los dos repos.
- **Records en `context/aiw-console/records/` antes: 94. Después: 95.** Sin colisión de nombre:
  ningún otro contiene `PIEZAS`; el único que contiene `COMPARTID` es
  `DOD-REVALIDACION-COMPONENTES-Y-CONTRATOS-COMPARTIDOS-CANTU.md`, de nombre completo distinto.
