# Revalidación de componente — «Regla matemática» (`rule`) — `cantu-studio`, `queue_order` 34

> Encargo de taller. Ejecuta `docs/reference/REFERENCE-COMPONENT-REVALIDATION-DEFINITION-OF-DONE.md` sobre el
> componente `rule`, cuya etiqueta de plataforma es **«Regla matemática»**.
> **Nada se reparó.** **Nada se cerró.** **Ningún status se cambió.** `.project/` no se re-emitió. Git no se ejecutó.
> Contenido de documentos del repo citado **verbatim en inglés**, sin traducir.
> Tercero de tres records del mismo lote: los otros dos son «Nota desplegable» (32) y «Factorización» (33).

**Titular, porque cambia cómo se lee todo lo demás:** de las **cuatro mitades** del defecto que la QA humana
registró, **una reproduce** —la caja «Placement avanzado» que la QA pidió quitar sigue puesta, arriba y
dentro de columna (§9.2)—. Y el taller midió **un defecto nuevo, visible y con causa exacta**: la franja del
título toma el color del autor pero **el color del texto de esa franja lo decide el nombre del token, no el
color real**, así que un color claro deja el título en blanco sobre claro (§9.4). **El compilador ya calcula
un color de texto legible y el renderer lo tira.** Además, la fila de este componente en la Definition of
Done §5 está **desfasada** en color, igual que la de «Nota desplegable» (§5.1).

---

## 1. Identidad del run, derivada del canónico — NO tecleada

Derivación por `queue_order` 34 sobre `objectives[].phases[].runs[]` de
`projects/cantu-studio/.aiw/roadmap/roadmap.json`. **Una sola coincidencia** en los 73 runs del archivo.

| Campo | Valor derivado |
|---|---|
| `run_id` | **`RUN-JAME-RULE-COMPONENT-REPAIR-AND-ACTIVATION-001`** |
| `title` | `Audit and implement the Rule component` |
| `queue_order` | 34 |
| `status` | `active` |
| Ruta en el árbol | `objectives[2].phases[3].runs[1]` |
| Carril | `DEVELOPMENT` (derivado de `lanes[].default: true`; el run **no lleva clave `lane`**) |

**Comprobación de título, verbatim, exigida por el encargo:** el título derivado es exactamente
`Audit and implement the Rule component`. **Coincide carácter a carácter. No se para.**

`depends_on`, **cinco, y las cinco `completed`**: `RUN-JAME-WEB-COMPONENT-CONTRACT-STANDARDIZATION-001`,
`RUN-JAME-WEB-COMPONENT-BASELINE-RECONCILIATION-001`, `RUN-JAME-MATH-FORMULA-COMPATIBILITY-CONTRACT-001`,
`RUN-JAME-SMART-FORMULA-FIELD-RULE-ONLY-BASELINE-001`, `RUN-CANTU-AUTHOR-PALETTE-COMPILER-ENGINE-001`.

**Es el componente con más dependencias de toda la serie de diecisiete** —una más que `callout`, que tenía
cuatro—, y las dos últimas son precisamente el piloto del campo de fórmula inteligente y el motor de paleta.
La estructura del run ya anticipaba que aquí había mucho trabajo ajeno que comprobar (§7).

### 1.1 El `full_description` íntegro, leído antes de empezar

> "Audit the Rule component against the color and palette compatibility contract and the math and Formula Inserter compatibility contract, using the accepted RULE_ONLY Smart Formula Field baseline. Bring its color and math integration to the shared contracts where the inventory shows a gap, implement what is missing, and verify the result by human visual QA rather than an automated test suite, since the repository has no test runner. Preserve the accepted keyboard and Smart Formula Field baseline."

Campos de clasificación: `correctness_model: JUDGED_DEFINES`, `work_type: FUNCTIONAL`,
`blast_radius: ADJACENT`, `failure_surfaces: VISIBLE`.

**Este `full_description` se diferencia de los otros dos del lote en dos cosas, y las dos importan:**

1. **Lleva un mandato de preservación explícito**: *«Preserve the accepted keyboard and Smart Formula Field
   baseline»*. Es la única de las diecisiete descripciones que ordena preservar algo por nombre. **Se
   preservó: no se tocó nada** (§7).
2. **Nombra `RULE_ONLY`**, la línea de base aceptada del campo de fórmula inteligente. Verificada viva y con
   dieciséis pruebas verdes (§13).

### 1.2 Dónde el run y el disco discrepan, y quién gana

**(a) El run dice que no hay test runner.** Resolución heredada. Los tests de §13 se corren **como
medición**. **Ningún texto de run se enmienda.**

**(b) El run ordena traer la integración de color al contrato compartido «where the inventory shows a gap»;
el disco dice que ya no hay hueco.** El inventario que el run toma como punto de partida clasifica `rule`
entre los que no resuelven paleta; **medido, la resuelve entera, tokens y hex personalizado, y emite los
cuatro roles derivados** (§5). La condición **no se cumple**, así que la orden **no se activa**. Es el mismo
encuadre que resolvió `callout` §1.2(b): verificar lo que otro run hizo, no rehacerlo.

**(c) El run habla de «activation» en su `run_id`.** `RUN-JAME-RULE-COMPONENT-REPAIR-AND-ACTIVATION-001`.
**Ni el `title` ni el `full_description` mandan activar nada**, y el componente ya está activo en el catálogo
(`blockCatalog.js:84-89`, sin `disabled`). **No se activó nada.** Se declara para que el nombre del run no se
lea como una orden que su texto no da.

---

## 2. Resoluciones adoptadas de los seis runs anteriores — sin séptima lectura

Adoptadas sin cambio, las mismas del record de «Nota desplegable» §2. Precisiones propias:

| Resolución | Origen | Cómo se aplica aquí |
|---|---|---|
| `NOT_APPLICABLE` de math para prosa con botón | `narrative`, estirado por `callout` §17.2(a) | **NO se usa aquí.** Este componente tiene campo de math de verdad; la clase sale limpia (§6) |
| Un defecto que el taller mide y ningún veredicto de QA nombra: **pendiente de veredicto, anotado** | piloto §11.3(a) | §9.4 |
| S2 audita el archivo delegado | `iconList` §13.1(a), `card` §15.1(a) | §4 — aquí el editor **no delega**: escribe la rama entera en línea |
| Las asimetrías entre colocaciones se miden | `card` §15.1 | §8.1 — **aquí hay una asimetría real y medida** |
| El «delta packet» | `iconList` §13.1(c) | §11 — **no aplica**: entra con FAIL. Packet **completo** |

**La predicción de `callout` §17.1 se confirma, y con el agravante que aquel anticipó.** Escribió que
*«`rule` lleva además el campo del piloto de la fórmula inteligente»*. **Se confirma**: este componente lleva
`description` entre los cinco campos de prosa con insertor **y** el campo `math` con su propio botón. **Son
dos botones distintos que pueden decir lo mismo**, y por eso el packet abre con un aviso propio (§11).

**No se propone enmendar la Definition of Done.** §15 mide y reporta.

---

## 3. La tabla de evidencia de la Definition of Done §7 — estructura verbatim

```
Component: rule    Run: RUN-JAME-RULE-COMPONENT-REPAIR-AND-ACTIVATION-001 (queue_order 34)    Date: 2026-08-06

| Step | Measured against | Result | Evidence |
|---|---|---|---|
| S1 identity | .aiw/roadmap/roadmap.json | PASS | RUN-JAME-RULE-COMPONENT-REPAIR-AND-ACTIVATION-001 + "Audit and implement the Rule component"; objectives[2].phases[3].runs[1] |
| S2 state audit | catalog / schemas / compiler / renderer / fixture | PASS | §4, diecisiete capas citadas, cero UNKNOWN; fixture Web PRESENTE (test_theory.js:72-77) |
| S3 color audit | color contract Section 9 | PASS + COLOR_PALETTE_VARIANT_OR_TOKEN_ONLY | bloque en §5; DIVERGENCIA declarada contra DoD §5 |
| S4 math audit | math contract Section 10 | PASS + MATH_FORMULA_SANITIZED_LATEX | bloque en §6; confirma Superficie A de DoD §5 |
| S5 columns placement | top-level + both slots | PASS | §8; VALIDO en los dos slots; asimetria de Markdown medida en §8.1 |
| S6 persistence | save/load + import | PASS | §10; ida y vuelta byte a byte identica por parseAndValidateBlocks |
| S7 human qa | Section 6 boundary | PREPARED (completo, no delta) | docs/_historical_run_record/RUN-JAME-RULE-COMPONENT-REPAIR-AND-ACTIVATION-001-OPERATOR-QA-PACKET.md |
| S8 repair gate | reproduced QA defects | DECLARED (una mitad reproduce; fuera de alcance; nada tocado) | §9 |
| S9 packet | single-source contract | PASS | ningun packet ni Guide escrito; tres discrepancias enrutadas en §12 |
| S10 registry + no-claims | docs_index + conflicts | PASS | §12; docs_index.json sin escribir; conflicto `list` intacto |

Verdict: REPAIR_REQUIRED_OWN_SCOPE
Open decisions touched: none of the fourteen the two compatibility contracts declare
```

**El veredicto, justificado.** La DoD §4 define `REPAIR_REQUIRED_OWN_SCOPE` como *«A reproduced defect
exceeds the run's scope; declared, nothing touched»*. La mitad *«remover placement avanzado»* **reproduce**
(§9.2) y quitarla exige tocar `WebRuleSchema` en los dos `draftSchema.js` y una salida del compilador que
comparten `card` y `callout` (§17). **Fuera de alcance.**

**No se adopta la reserva del piloto §11.3(b)** —`READY_FOR_OPERATOR_QA` con reserva— porque su supuesto era
*«un componente que entra con QA fallida cuya causa ya fue reparada por una pieza compartida»*, y **aquí una
mitad no está reparada por nadie: sigue viva**. Es la misma lectura que hicieron `narrative` y «Nota
desplegable».

**Ejecución paso a paso. Ninguno omitido, ninguno BLOCKED.**

| Paso | Nombre en la DoD | Resultado | Dónde |
|---|---|---|---|
| S1 | Identity gate | PASS | §1 |
| S2 | Current-state audit | PASS | §4 |
| S3 | Color palette compatibility audit | PASS + `COLOR_PALETTE_VARIANT_OR_TOKEN_ONLY` | §5 |
| S4 | Math and formula compatibility audit | PASS + `MATH_FORMULA_SANITIZED_LATEX` | §6 |
| S5 | Columns placement check | PASS | §8 |
| S6 | Persistence roundtrip | PASS | §10 |
| S7 | Human QA | PREPARED | §11 |
| S8 | Repair gate | **DECLARED** | §9 |
| S9 | Packet and Guide, both out of scope | PASS | §12 |
| S10 | No-claims | PASS | §12 |

---

## 4. S2 — Auditoría de estado, con archivo y línea

**Diecisiete capas. Cero UNKNOWN.** Es el componente con más superficie de los tres del lote.

| Capa | Archivo y línea | Qué hay |
|---|---|---|
| Etiqueta de plataforma | `blockCatalog.js:85` | `label: 'Regla matemática'` en `WEB_COMPONENT_UI` |
| Etiqueta en el catálogo de bloques | `blockCatalog.js:548` | `label: 'Regla matemática'` en `BLOCK_CATALOG`, id `web-rule` |
| Categoría y riel | `blockCatalog.js:86-88` | `category: 'math'`, **`rail: false`**, `order: 130` |
| Riel izquierdo | `blockCatalog.js:116-127` | **NO aparece** en ningún grupo de `WEB_RAIL_GROUPS` |
| Vía de inserción | `palette/ComponentPicker.jsx:150` | «Agregar componente» → «Biblioteca Web» → categoría «Matemáticas» |
| Etiqueta en la lista del flujo | `web/WebBlockEditor.jsx:402` | `'Regla matemática sin título'` |
| Rama del editor (top-level) | `web/WebBlockEditor.jsx:4059-4087` | escrita **en línea**, no delegada: «Color», «Titulo», «Fórmula», «Descripcion», «Placement avanzado» |
| Rama del editor (dentro de columna) | `web/WebBlockEditor.jsx:1899-1929` | los mismos cinco, con controles de columna y `defaultValue="def"` en el color |
| Campo de fórmula inteligente | `web/WebBlockEditor.jsx:710-718` (`RuleMathField`) y `:550-640` (`RuleMathControl`) | etiqueta **«Fórmula»** (`:626` columna, `:629` top-level) |
| Botón del campo inteligente | `math-authoring/smartFormulaField/ruleSmartFormulaPilot.js:12` | **«Editar fórmula»** si hay fórmula, **«Insertar fórmula»** si no |
| Insertor en línea sobre `description` | `web/WebBlockEditor.jsx:4076-4084` y `:1914-1925` | `InlineFormulaField`, botón **«Insertar fórmula»** (`InlineFormulaField.jsx:115`) |
| Caja de colocación | `web/WebBlockEditor.jsx:1266-1268` (`RulePlacementFields`) → `:1030-1084` (`PlacementFields`) | **«Placement avanzado»** (`:1040`), **«Full width»** (`:1055`), **«Col span»** (`:1064`) |
| Esquema del editor | `editor-ui/src/schemas/draftSchema.js:748-755` | `WebRuleSchema`, `.strict()`, con `...PlacementMetadataSchema` |
| Esquema del hijo de columna | `editor-ui/src/schemas/draftSchema.js:757-759` | `WebColumnRuleChildSchema`, que **añade `rejectMarkdown: true`** al campo `math` |
| Esquema del compilador | `compiler-api/schemas/draftSchema.js:776-787` | idénticos a los del editor |
| Caso del compilador | `compiler-api/services/compiler.js:409-422` (`buildRuleOutput`), despacho en `:1211` | emite `type: 'rule'`, resuelve paleta, normaliza la fórmula |
| Renderer | `src/builders/web/partials/renderRule.js:13-120` | caja con franja de título de color, fórmula centrada y descripción |
| Fixture sandbox | `src/content/sandbox/test_theory.js:72-77` | **seis variantes**: `def`, `ctx`, `str`, `res`, `wrn`, `err` |
| Fábrica de bloques | `editor-ui/.../utils/blockFactory.js:66-73` (top-level) y `:250` (hijo de columna) | Pitágoras, `variant: 'def'` |

### 4.1 Los dos schemas comparados entre sí — lo que S2 no pide

**Idénticos para este componente**, incluidos `WebRuleSchema` y `WebColumnRuleChildSchema`. Verificado por
`diff` completo y por ejecución de cinco casos por ambos: **mismo veredicto en los cinco**.

### 4.2 El fixture ejercita seis variantes, y ninguna es la que rompe

`test_theory.js:72-77` cubre seis tokens de la paleta de fábrica. **Ninguna reproduce el defecto de §9.4**,
porque los seis colores de fábrica o son oscuros o son los dos que el renderer trata a mano. Es la razón
mecánica de que el defecto haya sobrevivido a la paridad del sandbox. Se declara.

### 4.3 Capacidades del renderer inalcanzables desde el editor — y por qué NO son hueco

`renderRule.js` lee `data.textScale` (`:18`), `data.mathFontSize` (`:48`) y `data.descFontSize` (`:51`).
**Ningún esquema produce los tres.** Es la forma que la DoD §8 registra como excepción para `conceptGrid`.
**Aquí NO es hueco**: el catálogo declara los campos del autor y no los incluye
(`blockCatalog.js:563-570`), y la ficha de `hierarchy` declara explícitamente *«No color raw, textScale,
mathFontSize, style ni className»* (`:790`) como frontera de familia. **Lo resolví leyendo el catálogo, y lo
digo porque es elección mía**, con la regla de `callout` §17.3.

**Hay una cuarta que sí merece nombre aparte:** el renderer **no lee `data.textColor`**, y el compilador
**sí lo emite**. No es una capacidad inalcanzable desde el editor: es una **respuesta calculada que se tira**.
Ver §9.4.

---

## 5. S3 — Color palette compatibility audit

| # | Pregunta | Respuesta medida |
|---|---|---|
| 1 | ¿Qué superficie de color expone al autor? | `variant`, **uno por bloque**. `draftSchema.js:750` |
| 2 | ¿Qué control ofrece el editor? | `VariantSelect` con `allowCustom` arriba (`:4065`); `ColumnColorSelectField` con `allowCustom` y `defaultValue="def"` dentro de columna (`:1902-1911`) |
| 3 | ¿Qué acepta el esquema? | Token id (`COLOR_TOKEN_ID`) **o** `#RRGGBB`, opcional |
| 4 | ¿Editor, Preview Real y Generate Web coinciden? | **Sí, por construcción.** `previewRenderer.js:4` |
| 5 | ¿El compilador resuelve contra la paleta activa? | **SÍ.** `compiler.js:411` llama `resolvePaletteColorTokenIfDefined` |
| 6 | ¿Qué emite? | `color` (acento) **más los tres roles derivados**: `surface`, `border`, `textColor`. `compiler.js:416` |
| 7 | ¿Qué consume el renderer? | **Solo el acento**, y para la franja del título. `renderRule.js:28`. **Los otros tres viajan y nadie los lee** — y uno de ellos es justo el que haría falta (§9.4) |
| 8 | ¿Un hex personalizado llega entero? | **SÍ.** Medido: `#FFE699` → `color: "#FFE699"` |
| 9 | ¿Qué pasa con un token que la paleta no define? | Cae al respaldo `ctx` del motor (`#5E81AC`). Medido |
| 10 | ¿Cambia algo la colocación en columnas? | **En color, NO**: mismas opciones, mismo `allowCustom`. La única diferencia medida es de *default*, no de opciones. La asimetría real está en `math` (§8.1) |

**Clase asignada: `COLOR_PALETTE_VARIANT_OR_TOKEN_ONLY`** — *«A single discrete color control, no
multi-role mapping»*. Un control discreto; el renderer pinta un solo rol.

### 5.1 DIVERGENCIA declarada contra la Definition of Done §5

La fila `rule` de la DoD §5 dice `Palette-resolves | no - regression pattern`, y §5 clasifica a `rule` entre
*«Five accept an open palette token and emit only that token id»*.

**Falso en disco.** El compilador resuelve y emite `color` más tres roles (`compiler.js:411-416`), y el
renderer **prefiere el acento compilado** sobre el mapa fijo (`renderRule.js:28`). **Manda el código.** La
divergencia queda declarada; **no se enmienda la DoD**, que es del operador.

**Es la segunda vez que el lote la mide**: la misma fila desfasada afecta también a `details`
(record de «Nota desplegable» §5.1). **Dos de los cinco componentes del «patrón de regresión de paleta» ya
no lo cumplen.** El taller **no** midió los otros tres (`conceptGrid`, `table`; `callout` ya lo midió en su
run) y **no afirma nada sobre ellos**.

---

## 6. S4 — Math and formula compatibility audit

| # | Pregunta | Respuesta medida |
|---|---|---|
| 1 | ¿Tiene campo de math? | **SÍ, uno**: `math`, obligatorio. `draftSchema.js:752` |
| 2 | ¿Qué superficie de entrada? | **Superficie A**: `safeRuleMathValue()` delega en `validateRuleMathValue`, la **lista cerrada** de comandos, entornos y estructura. Es el **único** campo de math del editor con validación real |
| 3 | ¿Hay insertor de fórmula? | **SÍ, y son dos distintos**: el campo inteligente sobre `math` y el insertor en línea sobre `description` |
| 4 | ¿Valida LaTeX? | **SÍ.** Medido: `\frac{a}{b}` y `\begin{matrix}` pasan; `\href{javascript:...}` se rechaza con *«javascript: URLs are not allowed in math authoring payloads»*; vacío se rechaza |
| 5 | ¿Quién pone los delimitadores? | **El renderer, y solo él.** `renderRule.js:101` envuelve en `\[ ... \]`, y el esquema **rechaza** los del autor: `\[ a=b \]` da *«No incluyas delimitadores \\[ ... \\]»*. **Exclusividad garantizada** — al contrario que en «Factorización» (33) |
| 6 | ¿Produce KaTeX? | **SÍ.** `previewRenderer.js:14` |
| 7 | ¿Sobrevive el roundtrip? | **SÍ, byte a byte.** §10 |
| 8 | ¿Comportamiento en columnas? | **DISTINTO, y medido.** El hijo de columna añade `rejectMarkdown: true` (§8.1) |
| 9 | ¿Renderiza el math que emite? | **SÍ**, en display y centrado |
| 10 | ¿Decisiones abiertas tocadas? | Ninguna de las ocho |

**Clase asignada: `MATH_FORMULA_SANITIZED_LATEX`** — *«The field validates through the closed LaTeX
allowlist»*.

**Confirma la fila de la DoD §5** en math: `math (Surface A, closed allowlist)`, `renders: yes`. **Sin
divergencia en math.** La divergencia de este componente es solo de color (§5.1).

**Y la clase encaja sin estirar nada.** El hueco de `callout` §17.2(a) —las cinco clases sin sitio para
«prosa con fórmula y con botón»— **no aplica aquí**, porque el campo principal es de math de verdad. El campo
de prosa con botón (`description`) existe, pero **no es el que decide la clase**. Se dice para que el
estiramiento de `callout` y «Nota desplegable» no se herede donde no toca.

---

## 7. Lo que otros runs dejaron aquí — verificado, no rehecho

La DoD no tiene paso para esto (hueco de `callout` §17.1). **Este componente es, con cinco dependencias, el
caso más cargado de la serie.** Se mide igual.

| Capacidad instalada por otro run | Estado medido | Dónde |
|---|---|---|
| Resolución de paleta, tokens y hex | **VIVA** | §5, preguntas 5-8 |
| Los tres roles derivados en la salida | **VIVOS, y uno de ellos ignorado con consecuencia** | §5 pregunta 7, §9.4 |
| Selector de color unificado con «Personalizado» | **VIVO**, en las dos colocaciones | §5 pregunta 2; ocho pruebas verdes |
| Campo de fórmula inteligente `RULE_ONLY` | **VIVO** | §6 pregunta 3; dieciséis pruebas verdes |
| La lista cerrada de comandos y su ampliación | **VIVA** | §6 pregunta 4; nueve pruebas verdes |
| Insertor de fórmula en línea sobre `description` | **VIVO**, en las dos colocaciones | §6 pregunta 3; trece pruebas verdes |
| Reglas de selección y deshacer nativo del insertor | **VIVOS** | §13 — **solo como test corrido, fuera de todo paso** |

**Siete capacidades de cinco runs ajenos, y el `full_description` ordena preservar dos de ellas por nombre.
Las siete siguen vivas y ninguna se tocó.** Dos no caben en ningún paso S1–S10 y solo constan aquí porque
corrí sus tests: es la asimetría que `callout` §17.1 midió, confirmada en su caso más extremo.

---

## 8. S5 — Colocación en columnas

**`rule` SÍ es hijo de columna válido**, y es el único de los tres del lote que lo es. Medido en tres capas:
`WebColumnsChildSchema` lo incluye vía `WebColumnRuleChildSchema` (`draftSchema.js:902`), el editor tiene
rama propia (`web/WebBlockEditor.jsx:1899-1929`), y el catálogo lo confirma en las dos fichas
(`blockCatalog.js:987` y `:1017`). Verificado ejecutando: un `columns` con un `rule` dentro **valida en los
dos esquemas**.

**S5 = PASS**: las dos colocaciones registradas y las dos válidas.

### 8.1 La asimetría medida entre colocaciones

`WebColumnRuleChildSchema` no es `WebRuleSchema`: **le añade `rejectMarkdown: true` al campo `math`**
(`draftSchema.js:757-759`). Medido ejecutando:

| `math` | Top-level | Dentro de columna |
|---|---|---|
| `a^2 + b^2 = c^2` | acepta | acepta |
| `**negrita**` | **acepta** | **rechaza** |

**Consecuencia para el autor:** una regla escrita arriba y luego movida a una columna puede **empezar a dar
error sobre contenido que antes valía**. La asimetría es deliberada —está escrita a mano en el esquema— pero
**no está declarada en ninguna superficie de autor**: ni el catálogo ni la ficha del componente la mencionan.

**No es defecto y no se cuenta como tal.** Es exactamente la forma que `card` §15.1 declaró como hueco —S6 y
las asimetrías entre colocaciones—, ahora instanciada. **Está en el packet como check 18**, marcado ❗ y con
la pregunta explícita de si al operador le parece razonable. **El taller no lo decide.**

---

## 9. S8 — La compuerta de reparación, y los defectos medidos ANTES de tocar nada

### 9.1 El estado de QA registrado

`.aiw/state/component_status.json`, entrada `rule`:
`human_qa_status: HUMAN_QA_FAILED_REPAIR_REQUIRED_FOR_RULE_COMPONENT_SMART_FORMULA_CASE_H_RULE_ONLY_PASS_SEPARATE`,
`repair_status: REPAIR_REQUIRED_OR_DEFERRED_NO_RUNTIME_WORK_THIS_ROUND`.

**El desglose no está en esa entrada.** Cuarto componente seguido con el hueco de `callout` §17.2(b).
Seguidas las `source_refs`: de las cuatro, **dos no existen en el disco**
(`docs/author-lite/NEXT_STEPS.md` y `docs/ops/JAME_OPS_STATE.md`), otra es `AGENTS.md`, y la cuarta es la
matriz, donde sí está (`:311`, también `:200`), y en inglés en el ledger (`:91`):

> "Icon selector, remove advanced placement, color sync/custom picker; Math Authoring cross-cutting issue registered."

**Precisión sobre las `source_refs` rotas:** en «Nota desplegable» y «Factorización» faltaba **una**; aquí
faltan **dos**, y una de ellas —`docs/ops/JAME_OPS_STATE.md`— la nombra además la matriz como *«Siguiente
paso recomendado»* (`:371`). **El puntero roto no es solo de la proyección: la fuente única también apunta a
un archivo que no existe.** Se declara.

### 9.2 Reproducción contra código vivo — mitad por mitad

| Mitad | Reproduce | Evidencia |
|---|---|---|
| **remover placement avanzado** | **SÍ** | La caja **«Placement avanzado»** con **«Full width»** y **«Col span»** sigue montada en las dos colocaciones: `web/WebBlockEditor.jsx:4085` arriba y `:1926` dentro de columna, las dos vía `RulePlacementFields` (`:1266-1268`) → `PlacementFields` (`:1030`, título en `:1040`). El esquema sigue aceptando los dos campos (`draftSchema.js:754`, `...PlacementMetadataSchema`) y el compilador sigue emitiéndolos (`compiler.js:420`). **Medido ejecutando:** un `rule` con `fullWidth: true` valida y compila |
| **color sync / custom picker** | **NO** | Selector unificado con paleta activa entera y «Personalizado» en las dos colocaciones; ocho pruebas verdes que cubren `rule` por nombre (§13) |
| **icon selector** | **NO ES REPARACIÓN** | `renderRule.js` **no pinta ningún icono** —a diferencia de `renderDetails.js`, que sí—, y no hay campo de icono en ninguna capa. La QA pidió **añadir** un selector que hoy no existe en ninguna parte. **Es capacidad nueva.** El taller no amplía alcance por iniciativa propia (D-061) |
| **Math Authoring cross-cutting** | **NO ES DE ESTE COMPONENTE** | La propia QA lo registró como *«cross-cutting issue registered»*, es decir, follow-up transversal. Se declara y no se toca |

### 9.3 La salida que la Definition of Done ordena

Una mitad reproduce. La DoD S8: *«Reproduced and out of scope: declare REPAIR_REQUIRED_OWN_SCOPE, touch
nothing»*.

Quitar «Placement avanzado» de `rule` exige, medido:

- Retirar `...PlacementMetadataSchema` de `WebRuleSchema` en **los dos `draftSchema.js`**, que el encargo
  nombra como pieza compartida. `PlacementMetadataSchema` lo comparte además `WebCardSchema`
  (`draftSchema.js:694`).
- Retirar `buildPlacementOutput(src)` de `buildRuleOutput` (`compiler.js:420`). Esa función la comparten
  `card` (`:344`) y `callout` (`:1151`).
- Quitar dos usos en el editor y dejar huérfanos `RulePlacementFields` y `PlacementFields` — que hoy **solo**
  usa `rule` (verificado: no hay más llamantes).
- Y decidir qué pasa con los borradores ya guardados que lleven `fullWidth` o `colSpan` en un `rule`: con
  esquema `.strict()`, **dejarían de cargar**.

**Fuera de alcance. Nada se tocó.** Coste y recomendación en §17.

### 9.4 EL DEFECTO MEDIDO POR EL TALLER — uno, visible, con causa exacta

**El contraste del título está atado al nombre del token, no al color del autor.**

`renderRule.js:31` fija `headerTx = '#FFFFFF'` y solo lo cambia en tres casos, **todos comparando el
identificador de la variante** (`:34-44`):

- `variantKey === 'str'` → `#6B6352`
- `variantKey === 'focus'` → `#8C7B50`
- `['ex','def'].includes(variantKey)` **y** el mapa fijo tiene fondo blanco → `#4C566A`

El propio archivo lo declara en un comentario: *«El contraste del texto del header sigue atado al id de la
variante»* (`:27`).

**Las dos vías por las que se rompe, medidas:**

| Vía | Qué pasa | Medido |
|---|---|---|
| **Hex personalizado claro** | `variantKey` es el hex; `Commons.VARIANTS[hex]` es `undefined`; cae a `VARIANTS.ctx`, que no es ninguno de los tres casos → **blanco fijo**. Y el acento **sí** es el hex del autor | `#FFE699` → franja `#FFE699`, texto `#FFFFFF` |
| **Token reteñido claro** | El autor pone el acento de `ctx` (o cualquiera que no sea `str`, `focus`, `ex`, `def`) en un color claro → **blanco fijo** | acento claro, texto `#FFFFFF` |

**Y la respuesta ya estaba calculada.** La salida compilada trae `textColor` derivado del color del autor por
la **misma función que usa el editor de paletas** (`compiler.js:150-161`). Medido sobre trece variantes:
`textColor: #1E293B` en las trece. **`renderRule.js` no lee `data.textColor` ni una sola vez.**

**Precisión que evita una reparación mal dirigida, y por eso se escribe:** `textColor` es el rol de **tinta
sobre la superficie suave**, no un contraste calculado contra el acento. Usarlo tal cual para el texto sobre
la franja **sería otra suposición**, no la solución. La reparación correcta exige **calcular contraste contra
el acento**, que hoy **ningún rol de la salida proporciona**. Se dice porque el diagnóstico obvio —«el
renderer ignora `textColor`»— llevaría a arreglarlo mal.

**Por qué sobrevivió:** los seis colores del fixture de paridad (§4.2) o son oscuros o son los dos que el
renderer trata a mano. **El sandbox nunca lo pudo enseñar.**

**Ningún veredicto de QA lo nombra** —la mitad *«color sync/custom picker»* es otra cosa y está reparada—,
así que, por resolución del piloto §11.3(a), queda **pendiente de veredicto, anotado, no resuelto por
criterio propio**. **Está en el packet como checks 9 a 11**, con la instrucción explícita de que se espera
ver el título ilegible.

### 9.5 Lo que NO es defecto, y se dice para que no se cuente dos veces

- **`surface` y `border` sin consumir.** El renderer no los lee. El compilador lo declara intencional:
  *«el renderer que hoy solo usa el acento sigue usando solo el acento e ignora el resto»* (`compiler.js:155-156`).
  **No se cuenta.** Es distinto de `textColor`, que sí tiene consecuencia visible.
- **La asimetría de Markdown entre colocaciones** (§8.1). Deliberada y escrita a mano. Se declara, no se cuenta.
- **`textScale`, `mathFontSize`, `descFontSize` inalcanzables.** Fronteras declaradas (§4.3).
- **Dos botones que pueden decir «Insertar fórmula».** Es consecuencia de dos runs que instalaron dos cosas
  distintas en el mismo bloque, cada uno con su propia QA cerrada. **No se cuenta como defecto**; se declara
  y el packet abre con un aviso propio para que el operador no los confunda.

---

## 10. S6 — Ida y vuelta de persistencia

Medido ejecutando `parseAndValidateBlocks` sobre un fixture con token, hex, fórmula con barras invertidas y
descripción con fórmula en línea, y comparando con la entrada:

**`JSON.stringify(salida) === JSON.stringify(entrada)` → verdadero. Ida y vuelta byte a byte idéntica.**

Cubre: `variant` como token y como `#RRGGBB` —la referencia **sigue siendo referencia**, que es lo que el
contrato de color §3 exige—, `math` con `\frac` y `\pm` y `\sqrt` intactos, y `description` con sus
delimitadores `\( \)` intactos, que es lo que el contrato de math §10 exige.

**S6 = PASS.**

---

## 11. S7 — El packet de QA para el operador

Escrito en `docs/_historical_run_record/RUN-JAME-RULE-COMPONENT-REPAIR-AND-ACTIVATION-001-OPERATOR-QA-PACKET.md`,
con la forma del packet más reciente.

**Packet COMPLETO, no delta**: entra con `HUMAN_QA_FAILED_REPAIR_REQUIRED`, no con PASS preservado.

**29 checks**, el más largo de los tres del lote, por las siete capacidades ajenas que hay que verificar
(§7). Los cuatro de consecuencia de parada van primeros y marcados ⛔ —dos de ellos son los dos botones de
fórmula, cada uno de un run distinto—. Los checks 5 a 8 cubren las cuatro mitades del defecto registrado.
Los checks 9 a 11 son el defecto de §9.4, marcados ❗ y con la instrucción de que **se espera ver el título
ilegible**.

**El packet abre con un aviso propio, antes del primer check:** una tabla que distingue los **dos botones
que pueden decir «Insertar fórmula»**, con su archivo y línea. Sin esa tabla, los checks 4, 14 y 19 se
confunden entre sí. **Ningún paso de la DoD pide ese aviso** (§15.1).

Incluye además sección propia sobre **cómo insertar el bloque**, porque `rail: false`.

**Un check mide, desde aquí, algo que le falta a otro componente del lote.** El check 15 comprueba que el
esquema de «Regla matemática» rechaza los delimitadores del autor, **precisamente porque «Factorización»
(33) los acepta y luego rompe la fórmula**.

---

## 12. S9, S10 y las divergencias declaradas

**S9 = PASS.** No se escribió `docs/components/web/rule.md` ni ninguna fuente del Component Guide.

**S10 = PASS.** `.aiw/docs/docs_index.json` **no se escribió**. El conflicto preservado de `list` sigue
intacto.

**Tres discrepancias enrutadas, ninguna reparada:**

1. **DoD §5, fila `rule`, `Palette-resolves: no`** — falso en disco (§5.1).
2. **DoD §8, *«`header` and `list` are the only reconciled renderers»*** — falso en disco. Medido: **siete**
   renderers prefieren el acento compilado (`renderCallout.js:38`, `renderConceptGrid.js:59`,
   `renderDetails.js:66`, `renderHeader.js:49`, `renderList.js:94`, `renderRule.js:28`, `renderTable.js:30`).
   Es la misma discrepancia que declara «Nota desplegable» §12, confirmada desde un segundo componente.
3. **Dos `source_refs` apuntan a archivos que no existen**, y una de ellas —`docs/ops/JAME_OPS_STATE.md`— la
   nombra también la matriz como siguiente paso recomendado (§9.1). **Se declara y no se repara.**

**Contradicción interna de la fuente única:** para `rule` la matriz es **consistente** —`:200`, `:311` y
`:329` dicen lo mismo—, a diferencia de `callout` y `details`. **Se dice explícitamente para que la
contradicción de los otros dos no se herede aquí por parecido.**

---

## 13. Tests — qué corrí, con su salida

Corridos **como medición**, según DoD §6. **Ninguno es autorización de reparación.**

| Archivo | pass | fail | Qué fija de este componente |
|---|---|---|---|
| `webRuleSmartFormulaFieldRulePilot.test.mjs` | 16 | 0 | la línea de base `RULE_ONLY` que el `full_description` ordena preservar |
| `webRuleMathAuthoringIntegration.test.mjs` | 7 | 0 | la integración del campo de math |
| `mathAuthoringSmartFormulaField.test.mjs` | 28 | 0 | el campo inteligente completo |
| `mathAuthoringAllowlistExpansion.test.mjs` | 9 | 0 | la lista cerrada de comandos |
| `webTheoryCardsRuleBoxesParitySafety.test.mjs` | 18 | 0 | paridad de las cajas de regla contra el fixture de teoría |
| `webSharedColorSelectorUnification.test.mjs` | 8 | 0 | `rule` entre los seis del selector unificado |
| `webColorSelectorCustomPicker.test.mjs` | 8 | 0 | «Personalizado» y su muestra |
| `webAuthorPaletteDerivedRolesAndCustomHex.test.mjs` | 12 | 0 | roles derivados y hex personalizado |
| `webAuthorPaletteCompilerEngineReconciliation.test.mjs` | 14 | 0 | el acento compilado manda sobre el mapa fijo |
| `webInlineFormulaProseBehaviourLock.test.mjs` | 13 | 0 | `rule.description` entre los cinco campos de prosa |
| `webInlineFormulaInserterMount.test.mjs` | 16 | 0 | montaje del insertor |
| `webColumnsChildExpansionSafety.test.mjs` | 27 | 0 | `rule` como hijo de columna válido |

**Total corrido para este componente: 176 aserciones de nivel superior, 0 fallos.** Es el componente con más
cobertura de los tres del lote, coherente con sus cinco dependencias.

**Aserción que NO existe, y es la medición más importante de esta sección:** de las 176, **ninguna comprueba
el color del texto de la franja del título**. `webAuthorPaletteCompilerEngineReconciliation.test.mjs`
comprueba que el acento compilado manda; **ninguna comprueba que el texto encima de ese acento se lea**. Por
eso el defecto de §9.4 convive con 176 pruebas verdes.

**Lo que NO se afirma:** que los tests aprueben nada.

---

## 14. Las cifras del encargo, verificadas una a una

Verificadas en el record de «Nota desplegable» §14 y no repetidas: **doce exactas, dos desfasadas**, medidas
sobre el mismo disco en la misma sesión.

Añadidas por este componente:

| Cifra | Fuente | Verificado | Resultado |
|---|---|---|---|
| `queue_order` 34 → `RUN-JAME-RULE-COMPONENT-REPAIR-AND-ACTIVATION-001` | encargo | roadmap canónico | **EXACTA**, coincidencia única |
| Título verbatim | encargo | roadmap canónico | **EXACTA**, carácter a carácter |
| DoD §5: `rule` con `math` en Superficie A, lista cerrada, renderiza | DoD §5 | esquema, compilador, renderer | **EXACTA** |
| DoD §5: `rule` no resuelve paleta | DoD §5 | compilador y renderer vivos | **DESFASADA** — §5.1 |
| DoD §5: *«`rule.math` validates against the closed Surface A allowlist»*, y es el único | DoD §5 | los seis campos de math del editor | **EXACTA**: los otros cinco son texto opaco |
| Cinco dependencias, todas `completed` | derivado | roadmap canónico | **EXACTA**; es el máximo de la serie |

**El total del lote:** entre los tres records se comprobaron **veintiséis** cifras —catorce en «Nota
desplegable» §14, seis añadidas por «Factorización» §14 y seis por ésta—. **Veintitrés son exactas y tres
están desfasadas.** Las tres desfasadas están en la Definition of Done, y **dos de ellas son la misma fila
de §5 aplicada a dos componentes distintos** (`details` y `rule`).

---

## 15. HUECOS NUEVOS DEL PROCEDIMIENTO — solo los que los seis runs anteriores no declararon

**Ya declarado y confirmado sin repetir:** todo lo del record de «Nota desplegable» §15 y lo de
«Factorización» §15. **De los cinco huecos de `callout`, cuatro se confirman aquí por cuarta vez**
—capacidades ajenas sin paso, S8 con el veredicto ausente de su fuente, S2 sin celda para la frontera
querida, y las preguntas vacías—; **el quinto, las cinco clases de S4, NO aplica** a este componente y se
dice para que no se herede por parecido (§6).

Lo que este componente añade:

### 15.1 NUEVO — ningún paso mira la coherencia del vocabulario de la interfaz cuando dos runs tocan el mismo bloque

Este bloque tiene **dos botones distintos que pueden mostrar la misma cadena**: «Insertar fórmula» en el
campo **«Fórmula»** (`ruleSmartFormulaPilot.js:12`) y «Insertar fórmula» en el campo **«Descripcion»**
(`InlineFormulaField.jsx:115`). Cada uno lo instaló un run distinto, cada uno cerró con su QA, y **cada uno
es correcto por separado**. Juntos, en el mismo bloque, **son ambiguos**.

Los diez pasos miden el componente por capas —catálogo, esquema, compilador, renderer— y **ninguno mira la
superficie visible como un todo**. S2 me hizo citar las dos ramas del editor; **ninguna celda me hizo
preguntar si el autor puede distinguirlas**. Lo detecté escribiendo el packet, no auditando.

Es distinto del hueco de `callout` §17.1 —allí faltaba paso para *verificar* capacidades ajenas—: aquí las
capacidades ajenas **funcionan** y el problema es que **se pisan en pantalla**. **Lo resolví con una tabla de
desambiguación al principio del packet, y lo digo porque es elección mía.** **Al menos un componente más
entra por aquí**: `conceptGrid` (38) lleva también campo de prosa con botón.

### 15.2 NUEVO — S3 no pregunta si el color emitido se puede leer

Las diez preguntas del bloque de color cubren superficie, control, esquema, coincidencia de salidas,
resolución, emisión, consumo, hex, token desconocido y columnas. **Ninguna pregunta si el resultado es
legible.**

Este componente contesta las diez **en verde** —resuelve, emite, el renderer consume el acento, el hex llega
entero— y **produce un título invisible** (§9.4). La pregunta que faltaba es: *«el texto que va encima del
color emitido, ¿de dónde saca su contraste?»*.

Es distinto del hueco de `card` §15.1(b), que declaró que S3 pregunta por *«el contraste»* como si hubiera
uno solo. **Aquí el problema es anterior**: en la partición del piloto, que los seis runs siguientes
adoptaron, **la pregunta de contraste no está entre las diez**. **Lo medí porque ejecuté el renderer con un
color claro, no porque el procedimiento me lo pidiera.**

**Consecuencia práctica, y por eso lo declaro:** un run que conteste las diez al pie de la letra cierra S3 en
verde con el título ilegible delante. **Este run lo hizo**, y solo lo vio al medir aparte.

### 15.3 NUEVO — S8 no distingue «reparar» de «añadir lo que la QA pidió»

De las cuatro mitades del defecto registrado, **una es una petición de capacidad que no existe en ninguna
capa** (*icon selector*, §9.2). Las cinco salidas de S8 —reparar, `REPAIR_REQUIRED_OWN_SCOPE`, declarar
irreproducible, `NOT_APPLICABLE`, observación propia— **no tienen sitio para eso**. No es irreproducible: no
hay nada que reproducir, porque nunca existió. No es `REPAIR_REQUIRED_OWN_SCOPE`: no es reparación.

**La traté como «no es reparación, es alcance nuevo» y la enruté al operador citando D-061.** Es la misma
familia que el hueco §15.2 del record de «Nota desplegable» —allí una mitad era *decidir*, aquí es
*añadir*—, pero no es la misma: aquella tenía un modelo que elegir, esta tiene una capacidad que construir.
**Lo digo porque es elección mía, y porque las dos aparecieron en el mismo lote.**

**Dato que lo hace más visible:** *icon selector* aparece en **las dos** listas de defectos del lote —`rule`
y `details`— y **significa cosas distintas en cada uno**. En `details` el icono **existe y el autor no lo
controla** (reproduce, §9.2 de aquel record). En `rule` **no existe ninguno** (no reproduce). **La misma
etiqueta de defecto, dos estados opuestos, y ningún paso obliga a distinguirlos.**

---

## 16. En qué status debe quedar el run, y qué falta para llegar ahí

**Este record NO cambia ningún status. Lo cierra el operador desde la consola. `.project/` no se re-emitió.**

**Status declarado: el run debe seguir `active`.**

Falta, y no es del taller:

1. Que el operador ejecute los 29 checks del packet y emita veredicto.
2. Que decida sobre «Placement avanzado», la mitad que reproduce (§17).
3. Que decida sobre el defecto de contraste (§9.4), que ningún veredicto de QA nombra.
4. Que decida si *icon selector* es alcance nuevo que quiere abrir (D-061).
5. Que decida si la asimetría de Markdown entre colocaciones (§8.1) se declara al autor o se elimina.
6. Que decida si enmienda la fila desfasada de la Definition of Done §5 —**la misma que afecta a `details`**—
   y la afirmación de §8 sobre los renderers reconciliados.

---

## 17. Informe de opciones de coste medido — para el operador, SIN DECIDIR

Dos trabajos: una mitad que reproduce y un defecto nuevo.

| Trabajo | Qué toca | Coste medido | Riesgo |
|---|---|---|---|
| **A. Quitar «Placement avanzado» de `rule`** | `...PlacementMetadataSchema` fuera de `WebRuleSchema` en **los dos `draftSchema.js`**; `buildPlacementOutput` fuera de `buildRuleOutput` (`compiler.js:420`); dos usos fuera del editor; `PlacementFields` y `RulePlacementFields` quedan huérfanos | **Medio.** Cuatro archivos. La constante `PlacementMetadataSchema` **se queda**, porque `card` la usa; `buildPlacementOutput` **se queda**, porque `card` y `callout` la usan | **Medio-alto.** Con `.strict()`, un borrador ya guardado con `rule.fullWidth` **dejaría de cargar**. Nadie ha inventariado esos borradores |
| **B. Quitar solo el control de la interfaz, dejando el esquema** | Dos usos fuera del editor | **Mínimo.** Un archivo | **Medio.** Deja el campo alcanzable por «Insertar JSON» pero no por la interfaz: la QA lo daría por quitado y seguiría vivo por la otra puerta. **Media reparación es peor que ninguna** |
| **C. Reparar el contraste del título** | `renderRule.js` (**JAME Core**), y decidir de dónde sale el contraste: **hoy ningún rol de la salida lo proporciona** (§9.4), así que o se calcula en el renderer o se añade un rol nuevo al compilador —y entonces también a `buildColorRolesOutput`, que comparten seis componentes— | **Alto.** Toca Core, y la versión limpia toca también el sistema de color compartido | **Alto.** Es el sistema de color, que el encargo nombra como pieza compartida |
| **D. Añadir un rol de contraste-sobre-acento al compilador** | `deriveColorRolesFromAccent` y `buildColorRolesOutput` (`compiler.js:162`), más el consumo en `renderRule.js` | **Alto**, pero **resuelve la familia entera**: cualquier renderer que ponga texto sobre el acento del autor tendría de dónde sacarlo | **Alto en alcance, bajo en concepto.** El camino ya existe: es el mismo por el que `surface` y `border` llegaron |

**Recomendación explícita del taller, que NO es decisión:**

- **A**, no **B**. Media reparación aquí es peor que ninguna, porque la QA la daría por hecha. **A** debería
  ir precedida de un inventario de borradores con `fullWidth`/`colSpan` en bloques `rule`.
- **C** no la recomiendo tal cual: parchear `renderRule.js` con un cálculo propio **crearía una segunda
  verdad de color**, que es exactamente lo que el comentario de `compiler.js:150-156` dice que se evitó a
  propósito.
- **D** es la correcta si el operador quiere resolverlo bien, **pero no cabe en un run de revalidación de
  componente**: es un run del sistema de color, y afecta a los seis que emiten roles derivados.
- **Orden recomendado si se autoriza algo:** primero **A** (defecto reproducido, autorizado por veredicto de
  QA); **D** después y como run propio del sistema de color; **C** nunca sola.
- **Comparado con los otros dos del lote:** este componente es el **más caro de reparar** de los tres. Si el
  operador solo autoriza una reparación, la de «Factorización» (33) es la más barata y la más contenida;
  ésta es la más acoplada.

---

## 18. Archivos escritos — dos, y ninguno más

1. `projects/cantu-studio/docs/_historical_run_record/RUN-JAME-RULE-COMPONENT-REPAIR-AND-ACTIVATION-001-OPERATOR-QA-PACKET.md`
2. `projects/aiw-console/context/aiw-console/records/REVALIDACION-COMPONENTE-REGLA-MATEMATICA-CANTU.md` (este)

**Ningún archivo de `cantu-studio` fue modificado.**

---

## 19. Lo que este encargo NO hizo — y por qué

- **No reparó nada.** La mitad que reproduce cae fuera de alcance por pieza compartida; el defecto nuevo vive
  en JAME Core.
- **Preservó la línea de base que el `full_description` ordena preservar**: el campo de fórmula inteligente
  `RULE_ONLY` y el teclado. Verificados vivos, no tocados.
- **No activó nada**, pese a que el `run_id` dice «ACTIVATION»: ni el título ni la descripción lo mandan, y
  el componente ya está activo.
- **No cambió ningún status ni re-emitió `.project/`.** **No ejecutó git.** **No insertó, movió ni renumeró runs.**
- **No escribió `docs/components/web/rule.md`** ni fuente del Component Guide (DoD §4 S9).
- **No escribió `.aiw/docs/docs_index.json`** (DoD §4 S10). **No editó `.aiw/state/component_status.json`.**
- **No añadió selector de icono**, pese a que un veredicto de QA lo pide: es capacidad nueva (D-061).
- **No amplió alcance.**

---

## 20. Procedencia

**Qué se midió, contra qué archivo, y con qué método.**

- **Identidad**: `projects/cantu-studio/.aiw/roadmap/roadmap.json`, recorrido completo del árbol, comparación
  de título con `JSON.stringify`.
- **Etiqueta de plataforma**: `blockCatalog.js`, `WEB_COMPONENT_UI.rule.label` (`:85`) y la entrada
  `web-rule` de `BLOCK_CATALOG` (`:548`). **No tomada del encargo ni de ningún record.**
- **Capas S2**: las diecisiete citas de §4, cada una abierta en el archivo real.
- **Comparación de los dos esquemas**: `diff` completo, más ejecución de cinco casos por ambos.
- **Color y el defecto de §9.4**: banco de medición propio que valida por `WebDraftSchema`, compila por
  `compileDraftToJameData` y renderiza por `renderRule.js`, sobre **trece variantes** —los nueve tokens de la
  paleta de fábrica más cuatro hex, incluidos dos claros—, extrayendo por expresión regular el
  `background-color` y el `color` de la franja del título y comparándolos con el `textColor` de la salida
  compilada.
- **Asimetría de §8.1**: ejecución del mismo `math` con Markdown, arriba y dentro de un `columns`, contra el
  esquema del compilador.
- **Delimitadores**: ejecución de `\[ a=b \]`, `\frac{a}{b}`, `\begin{matrix}`, `\href{javascript:...}` y
  cadena vacía contra el esquema.
- **Persistencia**: ejecución de `parseAndValidateBlocks` con comparación `JSON.stringify`.
- **Tests**: `node --test <ruta>`, un archivo por invocación, salidas de §13. Inspección del contenido de los
  archivos de paleta para verificar la ausencia de cobertura del contraste.
- **Estado de QA**: `.aiw/state/component_status.json` (entrada `rule`),
  `COMPONENT_CERTIFICATION_MATRIX.md` (`:200`, `:311`, `:329`, `:371`),
  `PASS-FUTURE-WEB-HUMAN-QA-BATCH-RESULT-RECONCILIATION-001.md:91`.

**Qué quedó sin reparar, y por qué.**

| Sin reparar | Por qué |
|---|---|
| «Placement avanzado» (reproduce) | Toca **los dos `draftSchema.js`** y una salida del compilador compartida por `card` y `callout`. Y arriesga borradores ya guardados |
| Contraste del título (defecto nuevo) | `renderRule.js` es **JAME Core**, y la reparación limpia toca además el **sistema de color** compartido |
| `icon selector` | **Capacidad nueva, no reparación.** La ampliación solo procede por veredicto escrito de QA humana del operador (D-061) |
| Math Authoring transversal | La propia QA lo registró como follow-up transversal, no como defecto de este componente |
| Asimetría de Markdown entre colocaciones | **Deliberada en código y no declarada al autor.** Declararla o quitarla es del operador |
| Ambigüedad de los dos botones de fórmula | Cada uno es correcto y cerrado por su run. **Resolverlo toca superficie de dos runs ajenos** |
| Fila desfasada de DoD §5 y afirmación de DoD §8 | Enmendar la DoD es **del operador**; su ejecución es otro run |
| Dos `source_refs` a archivos inexistentes | Editar la proyección y la matriz **no es de este run** |
| Ausencia de test que cubra el contraste | Escribir el test es parte de la reparación, y la reparación no está autorizada |
