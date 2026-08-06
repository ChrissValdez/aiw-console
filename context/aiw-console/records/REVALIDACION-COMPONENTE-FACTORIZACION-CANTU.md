# Revalidación de componente — «Factorización» (`arithmetic`) — `cantu-studio`, `queue_order` 33

> Encargo de taller. Ejecuta `docs/reference/REFERENCE-COMPONENT-REVALIDATION-DEFINITION-OF-DONE.md` sobre el
> componente `arithmetic`, cuya etiqueta de plataforma es **«Factorización»**.
> **Nada se reparó.** **Nada se cerró.** **Ningún status se cambió.** `.project/` no se re-emitió. Git no se ejecutó.
> Contenido de documentos del repo citado **verbatim en inglés**, sin traducir.
> Segundo de tres records del mismo lote: los otros dos son «Nota desplegable» (32) y «Regla matemática» (34).

**Titular, porque cambia cómo se lee todo lo demás:** este componente **entra sin defecto nombrado**. La QA
humana lo difirió a ticket propio por *«varios errores»* que **ningún documento del repo enumera** (§9.1),
así que S8 no tiene nada que reproducir. Lo que sí hay es **un defecto que el taller midió y nadie había
nombrado**: el esquema **acepta que el autor escriba delimitadores de fórmula** y el renderer **los envuelve
otra vez**, partiendo además el resultado por el `=`. La fórmula sale rota, sin ningún mensaje de error
(§9.3). `rule` y `table` sí rechazan delimitadores; **este componente no**.

---

## 1. Identidad del run, derivada del canónico — NO tecleada

Derivación por `queue_order` 33 sobre `objectives[].phases[].runs[]` de
`projects/cantu-studio/.aiw/roadmap/roadmap.json`. **Una sola coincidencia** en los 73 runs del archivo.

| Campo | Valor derivado |
|---|---|
| `run_id` | **`RUN-JAME-WEB-ARITHMETIC-AUDIT-AND-REPAIR-001`** |
| `title` | `Audit and implement the Arithmetic component` |
| `queue_order` | 33 |
| `status` | `active` |
| Ruta en el árbol | `objectives[2].phases[3].runs[0]` |
| Carril | `DEVELOPMENT` (derivado de `lanes[].default: true`; el run **no lleva clave `lane`**) |

**Comprobación de título, verbatim, exigida por el encargo:** el título derivado es exactamente
`Audit and implement the Arithmetic component`. **Coincide carácter a carácter. No se para.**

`depends_on`, **tres, y las tres `completed`**: `RUN-JAME-WEB-COMPONENT-CONTRACT-STANDARDIZATION-001`,
`RUN-JAME-WEB-COMPONENT-BASELINE-RECONCILIATION-001`, `RUN-JAME-MATH-FORMULA-COMPATIBILITY-CONTRACT-001`.

**Es el único de los tres del lote sin la dependencia del motor de paleta**, y eso ya anticipaba lo que §5
mide: este componente **no tiene superficie de color**.

### 1.1 El `full_description` íntegro, leído antes de empezar

> "Audit the Arithmetic component against the color and palette compatibility contract and the math and Formula Inserter compatibility contract, using the current component inventory as the starting point. Where the inventory shows the component carries hardcoded or local colors instead of the shared palette, or lacks a required integration point, implement the missing integration. Repair only what the audit and human visual QA show to be a real defect; do not rewrite accepted behavior. Verify the result by human visual QA rather than an automated test suite, since the repository has no test runner."

Campos de clasificación: `correctness_model: JUDGED_DEFINES`, `work_type: FUNCTIONAL`,
`blast_radius: ADJACENT`, `failure_surfaces: VISIBLE`.

### 1.2 Dónde el run y el disco discrepan, y quién gana

**(a) El run dice que no hay test runner.** Resolución heredada, sin sexta lectura: la DoD §12 la declara
obsoleta y §6 fija que los tests se corren **como medición**. **Ningún texto de run se enmienda.**

**(b) El run ordena auditar contra el contrato de color; el disco dice que no hay superficie de color.** El
`full_description` manda auditar *«against the color and palette compatibility contract»* e implementar la
integración *«where the inventory shows the component carries hardcoded or local colors»*. **Medido: este
componente no expone ningún color al autor** (§5). La condición **no se cumple**, así que la orden **no se
activa**. La DoD §5 lo confirma en su propia tabla: `arithmetic` es uno de los tres kinds sin superficie de
color. Se declara para que no se lea como omisión.

**(c) El run nombra el «Formula Inserter»; este componente no lo lleva.** El insertor está montado en
**cinco campos de prosa**, y ninguno es de `arithmetic` (`tests/webInlineFormulaProseBehaviourLock.test.mjs:61-114`).
Los dos campos matemáticos de este bloque son campos de math, no de prosa. **Se declara y no se instala
nada**: instalarlo sería capacidad nueva.

---

## 2. Resoluciones adoptadas de los seis runs anteriores — sin séptima lectura

Adoptadas sin cambio, las mismas diez que enumera el record de «Nota desplegable» §2, con dos precisiones
propias de este componente:

| Resolución | Origen | Cómo se aplica aquí |
|---|---|---|
| I-4 — responder las diez preguntas de S3 marcando VACÍA con su razón | piloto §11.2 | §5 — **nueve de las diez salen vacías** |
| El patrón de respuesta de un S3 vacío demuestra la ausencia **en varias capas** | `video` §16.1(b) | §5 — es el segundo componente sin color desde `video`, y se usa su patrón exacto |
| Un defecto que el taller mide y ningún veredicto de QA nombra se trata como **pendiente de veredicto, anotado, no resuelto por criterio propio** | piloto §11.3(a) | §9.3 — **es toda la sustancia de este record** |
| El «delta packet» se deriva por cuenta propia | `iconList` §13.1(c) | §11 — **no aplica**: no hay veredicto anterior. Packet **completo** |

**Una predicción anterior que aquí NO aplica, y se dice para que no se herede mal.** `callout` §17.1 predijo
que `details` (32), `rule` (34) y `conceptGrid` (38) entrarían por el hueco de la prosa con insertor.
**`arithmetic` no está en esa lista y, medido, no debe estarlo**: no tiene campo de prosa con botón.

**No se propone enmendar la Definition of Done.** §15 mide y reporta.

---

## 3. La tabla de evidencia de la Definition of Done §7 — estructura verbatim

```
Component: arithmetic    Run: RUN-JAME-WEB-ARITHMETIC-AUDIT-AND-REPAIR-001 (queue_order 33)    Date: 2026-08-06

| Step | Measured against | Result | Evidence |
|---|---|---|---|
| S1 identity | .aiw/roadmap/roadmap.json | PASS | RUN-JAME-WEB-ARITHMETIC-AUDIT-AND-REPAIR-001 + "Audit and implement the Arithmetic component"; objectives[2].phases[3].runs[0] |
| S2 state audit | catalog / schemas / compiler / renderer / fixture | PASS | §4, quince capas citadas, cero UNKNOWN; fixture Web PRESENTE (test_arithmetic.js:15,56) |
| S3 color audit | color contract Section 9 | PASS + COLOR_PALETTE_NOT_APPLICABLE | bloque en §5; confirma la fila de DoD §5 |
| S4 math audit | math contract Section 10 | PASS + MATH_FORMULA_TEXT_SURFACE_ONLY | bloque en §6; confirma Superficie B de DoD §5 |
| S5 columns placement | top-level + both slots | PASS | §8; RECHAZADO en slots por los dos esquemas; coincide con catálogo y matriz |
| S6 persistence | save/load + import | PASS | §10; ida y vuelta byte a byte idéntica por parseAndValidateBlocks |
| S7 human qa | Section 6 boundary | PREPARED (completo, no delta) | docs/_historical_run_record/RUN-JAME-WEB-ARITHMETIC-AUDIT-AND-REPAIR-001-OPERATOR-QA-PACKET.md |
| S8 repair gate | reproduced QA defects | NOT_APPLICABLE (ningun veredicto de QA nombra defecto alguno) | §9 |
| S9 packet | single-source contract | PASS | ningun packet ni Guide escrito; dos discrepancias enrutadas en §12 |
| S10 registry + no-claims | docs_index + conflicts | PASS | §12; docs_index.json sin escribir; conflicto `list` intacto |

Verdict: READY_FOR_OPERATOR_QA
Open decisions touched: none of the fourteen the two compatibility contracts declare
```

**El veredicto, justificado, y por qué NO es `REPAIR_REQUIRED_OWN_SCOPE`.** La DoD §4 S8 es explícita:
*«No QA verdict names a defect: NOT_APPLICABLE»* y *«An observation made by the workshop itself is a
measurement to declare, never a repair authorization»*. El defecto de §9.3 es **medición del taller**, no
veredicto consumido, así que **no puede mover el veredicto del run**. Todos los pasos salen PASS o
justificados, y el packet está entregado: la salida literal es `READY_FOR_OPERATOR_QA`.

**Esto no dice que el componente esté bien.** Dice que el procedimiento se ejecutó entero y que el defecto
medido espera veredicto humano. La distinción está escrita en el packet y en §9.3 para que un `PASS` del
operador no la borre.

**Ejecución paso a paso. Ninguno omitido, ninguno BLOCKED.**

| Paso | Nombre en la DoD | Resultado | Dónde |
|---|---|---|---|
| S1 | Identity gate | PASS | §1 |
| S2 | Current-state audit | PASS | §4 |
| S3 | Color palette compatibility audit | PASS + `COLOR_PALETTE_NOT_APPLICABLE` | §5 |
| S4 | Math and formula compatibility audit | PASS + `MATH_FORMULA_TEXT_SURFACE_ONLY` | §6 |
| S5 | Columns placement check | PASS | §8 |
| S6 | Persistence roundtrip | PASS | §10 |
| S7 | Human QA | PREPARED | §11 |
| S8 | Repair gate | **NOT_APPLICABLE** | §9 |
| S9 | Packet and Guide, both out of scope | PASS | §12 |
| S10 | No-claims | PASS | §12 |

---

## 4. S2 — Auditoría de estado, con archivo y línea

**Quince capas. Cero UNKNOWN.**

| Capa | Archivo y línea | Qué hay |
|---|---|---|
| Etiqueta de plataforma | `blockCatalog.js:91` | `label: 'Factorización'` en `WEB_COMPONENT_UI` |
| Etiqueta en el catálogo de bloques | `blockCatalog.js:648` | `label: 'Factorización'` en `BLOCK_CATALOG`, id `web-arithmetic` |
| Categoría y riel | `blockCatalog.js:92-94` | `category: 'math'`, **`rail: false`**, `order: 140` |
| Riel izquierdo | `blockCatalog.js:116-127` | **NO aparece** en ningún grupo de `WEB_RAIL_GROUPS` |
| Vía de inserción | `palette/ComponentPicker.jsx:150` | «Agregar componente» → «Biblioteca Web» → categoría «Matemáticas» |
| Rama del editor (top-level) | `web/WebBlockEditor.jsx:4101-4103` | delega en `ArithmeticFields`, **sin pasar `colorPalette`** |
| Archivo delegado | `web/WebBlockEditor.jsx:3328-3364` | «Titulo», «Encabezado derecho», «Pasos», «Factores», «Resultado final» |
| Sub-editores | `web/WebBlockEditor.jsx:3116-3213` y `:3215-3326` | `ArithmeticStepsFields` («Valor», «Divisor») y `ArithmeticCountsFields` («Primo», «Repeticiones», «Expresion») |
| Rama del editor (dentro de columna) | — | **NO EXISTE** |
| Esquema del editor | `editor-ui/src/schemas/draftSchema.js:921-941` + `:409-435` | `WebArithmeticSchema`, `.strict()`; steps, counts y labels |
| Esquema del compilador | `compiler-api/schemas/draftSchema.js:949-969` + `:412-438` | idénticos a los del editor |
| Unión de bloques Web | `editor-ui/src/schemas/draftSchema.js:976` | `WebArithmeticSchema` en `WebBlockSchema` |
| Unión de hijos de columna | `editor-ui/src/schemas/draftSchema.js:898-908` | **`arithmetic` NO está** |
| Caso del compilador | `compiler-api/services/compiler.js:810-833` (`buildArithmeticFactorizationOutput`), con guardia previa en `:769-808`, despacho en `:1229` | emite `type: 'arithmetic'`, `mode: 'factorization'` |
| Renderer | `src/builders/web/partials/renderArithmetic.js:1-322` | escalera de divisiones, agrupación de primos y resultado |
| Fixture sandbox | `src/content/sandbox/test_arithmetic.js:15` (`atomFactorization`) y `:38` (`atomMatrix`), usados en `:56-57` | **dos modos, uno de ellos inalcanzable** — ver §4.3 |
| Fábrica de bloques | `editor-ui/.../utils/blockFactory.js:150-172` | la factorización del 360, siete pasos y tres factores |

### 4.1 Los dos schemas comparados entre sí — lo que S2 no pide

**Idénticos para este componente.** El `diff` completo de los dos archivos devuelve una sola divergencia de
bloque, y es de `list`, declarada intencional. Verificado además ejecutando: el default de fábrica y cuatro
casos límite dan **el mismo veredicto en los dos esquemas**.

### 4.2 La guardia doble del compilador — lo que S2 tampoco pide

Este componente es el único de los tres del lote con **una guardia imperativa propia en el compilador**
además del esquema: `assertBoundedArithmeticFactorizationShape` (`compiler.js:769-808`) vuelve a comprobar
modo, número de pasos, número de factores, tipos y obligatoriedad, y lanza con mensajes en español. **No es
redundancia inútil**: el compilador es alcanzable por rutas que no pasan por el esquema del editor. Se
declara como medición.

### 4.3 Capacidad del renderer inalcanzable desde el editor — y por qué NO es hueco

`renderArithmetic.js` sabe pintar `mode: "matrix"`, y el fixture del sandbox lo ejercita
(`test_arithmetic.js:38`). **Ningún esquema del editor puede producirlo**: `mode` es
`z.literal('factorization')` en los dos (`draftSchema.js:923` / `:951`).

Es exactamente la forma que la DoD §8 registra como **excepción** para `conceptGrid`. **Aquí NO es hueco**,
porque el catálogo la declara como frontera querida y la nombra: *«Solo mode factorization.»* y *«No matrix
mode.»* (`blockCatalog.js:675-676`), repetido en su nota de desarrollador (`:696`). **Lo resolví leyendo el
catálogo, y lo digo porque es elección mía**, con la misma regla que `callout` §17.3.

**Consecuencia para S2:** el fixture asignado a este componente **ejercita más de lo que el editor produce**.
El fixture no está mal; el componente es un subconjunto declarado de él. Se declara.

---

## 5. S3 — Color palette compatibility audit

| # | Pregunta | Respuesta medida |
|---|---|---|
| 1 | ¿Qué superficie de color expone al autor? | **NINGUNA.** No hay campo `variant`, `color` ni `colorToken` en `WebArithmeticSchema` (`draftSchema.js:921-941`) |
| 2 | ¿Qué control ofrece el editor? | **VACÍA** — `ArithmeticFields` **ni siquiera recibe `colorPalette`** (`web/WebBlockEditor.jsx:4101-4103`), a diferencia de las nueve ramas que sí lo reciben |
| 3 | ¿Qué acepta el esquema? | **VACÍA** — el esquema es `.strict()` y **rechazaría** un campo de color: medido, `variant` da `Unrecognized key(s)` |
| 4 | ¿Editor, Preview Real y Generate Web coinciden? | **Sí, por construcción y trivialmente**: sin color que resolver, no hay nada que pueda divergir |
| 5 | ¿El compilador resuelve contra la paleta activa? | **VACÍA** — `buildArithmeticFactorizationOutput(src)` **no toma `options`** (`compiler.js:810`), único de los tres del lote |
| 6 | ¿Qué emite? | **VACÍA** — la salida no lleva `color`, `surface`, `border` ni `textColor`. Medido |
| 7 | ¿Qué consume el renderer? | Colores **propios y fijos**: `THEME_COLOR` y `USER_CFG.textColors` con respaldos literales (`renderArithmetic.js:87-91`). **`USER_CFG` no lo produce ningún esquema** |
| 8 | ¿Un hex personalizado llega entero? | **VACÍA** — no hay campo por el que entre |
| 9 | ¿Qué pasa con un token que la paleta no define? | **VACÍA** — no hay token |
| 10 | ¿Cambia algo la colocación en columnas? | **VACÍA** — no es hijo de columna válido (§8) |

**Nueve de diez vacías, cada una con su razón, siguiendo I-4.** La ausencia queda demostrada **en cinco
capas independientes**: esquema, editor, compilador, salida y renderer — que es el patrón que `video` §16.1(b)
fijó para un componente sin color.

**Clase asignada: `COLOR_PALETTE_NOT_APPLICABLE`** — *«No color, variant, or token surface at all»*.

**Confirma la fila de la DoD §5**, que dice `Color surface today: none` y `Palette-resolves: -`. **Sin
divergencia.** Es el único de los tres del lote cuya fila de color sale exacta.

---

## 6. S4 — Math and formula compatibility audit

| # | Pregunta | Respuesta medida |
|---|---|---|
| 1 | ¿Tiene campo de math? | **SÍ, dos**: `counts[].math` (`draftSchema.js:423-427`) y `result` (`:936-940`) |
| 2 | ¿Qué superficie de entrada? | **Superficie B**: texto opaco. `safeRequiredLimitedMathText` limita longitud (240) y rechaza HTML, `on*`, `javascript:` y `data:text/html`, **pero no valida LaTeX** |
| 3 | ¿Hay insertor de fórmula? | **NO.** Ninguno de los dos campos va envuelto en `InlineFormulaField`. Ninguno está entre los cinco campos de prosa |
| 4 | ¿Valida LaTeX? | **NO.** No hay lista cerrada de comandos, a diferencia de `rule.math` |
| 5 | ¿Quién pone los delimitadores? | **El renderer, siempre**: `\( ... \)` en `renderArithmetic.js:225`, `:250` y `:251`. **Y el esquema no impide que el autor ponga los suyos** — ver §9.3 |
| 6 | ¿Produce KaTeX? | **SÍ.** `previewRenderer.js:14` corre `renderMathInElement(document.body)` sobre la página entera |
| 7 | ¿Sobrevive el roundtrip? | **SÍ, byte a byte.** Medido en §10, incluidas las barras invertidas de `\times` |
| 8 | ¿Comportamiento en columnas? | **VACÍA** — no es hijo de columna válido |
| 9 | ¿Renderiza el math que emite? | **SÍ.** Los dos campos llegan a la salida y se componen. No es el caso de `hierarchy`, que emite math que nunca renderiza |
| 10 | ¿Decisiones abiertas tocadas? | Ninguna de las ocho del contrato de math |

**Clase asignada: `MATH_FORMULA_TEXT_SURFACE_ONLY`** — *«A math field exists but validates only as opaque
text; LaTeX correctness is the author's burden»*.

**Confirma la fila de la DoD §5**, que dice `Math surface today: counts[].math, result (Surface B)` y
`Math renders: yes`. **Sin divergencia.**

**Y aquí la clase encaja sin estirar nada**, al revés que en «Nota desplegable» y «Nota destacada». Se dice
porque el hueco de `callout` §17.2(a) —las cinco clases sin sitio para «prosa con fórmula y con botón»— **no
se toca aquí**: este componente tiene campo de math de verdad y ninguno de prosa con botón.

---

## 7. Lo que otros runs dejaron aquí — verificado, no rehecho

**Prácticamente nada, y esa es la medición.** La DoD no tiene paso para esto (hueco de `callout` §17.1); se
mide igual.

| Capacidad instalada por otro run | Estado medido |
|---|---|
| Resolución de paleta | **NO INSTALADA, y correctamente**: el componente no tiene color |
| Selector de color unificado | **NO INSTALADO, y correctamente** |
| Insertor de fórmula en línea | **NO INSTALADO, y correctamente**: no hay campo de prosa |
| Campo de fórmula inteligente | **NO INSTALADO**: es `RULE_ONLY` por línea de base aceptada |
| El paso global de composición matemática | **VIVO**: `previewRenderer.js:14`, compartido por toda la página |

**Solo una de las cinco capacidades compartidas llega hasta aquí.** Es el componente **menos acoplado** de
los tres del lote, y por eso el más barato de reparar si el operador lo autoriza (§17).

---

## 8. S5 — Colocación en columnas

**`arithmetic` NO es hijo de columna válido.** Medido en tres capas: `WebColumnsChildSchema` no lo incluye
(`draftSchema.js:898-908`), el compilador no lo despacha en la rama de hijos, y el editor no tiene rama para
él dentro de un slot. Verificado ejecutando: `webBlocks.0: Invalid input` en los dos esquemas.

**Las tres capas coinciden con la documentación, y esto sí es limpio:** el catálogo lo dice en su ficha de
usuario de este componente —*«No Web Columns.»*, `blockCatalog.js:679`— y en la de «Dos columnas»
—*«Top-level-only en Phase 2: video, arithmetic, hierarchy, timeline»*, `:989`—; y la matriz lo repite
(`COMPONENT_CERTIFICATION_MATRIX.md:104`). **Cuatro fuentes, ninguna contradicción.** Al contrario que
«Nota desplegable», donde el catálogo se contradice a sí mismo.

**S5 = PASS**: las dos colocaciones registradas.

---

## 9. S8 — La compuerta de reparación

### 9.1 El estado de QA registrado, y por qué S8 sale `NOT_APPLICABLE`

`.aiw/state/component_status.json`, entrada `arithmetic`:
`human_qa_status: HUMAN_QA_DEFERRED_OWN_TICKET_REQUIRED`,
`repair_status: DEFERRED_OWN_TICKET_REQUIRED`,
`status_summary: "Arithmetic is deferred to own ticket; not certified."`

Seguidas las `source_refs`: de las dos, **una no existe en el disco** (`docs/author-lite/NEXT_STEPS.md`) y la
otra es la matriz. En la matriz el motivo es:

> "Human QA batch posterior difiere `arithmetic` a ticket propio por varios errores." (`:197`; también `:317`)

Y en inglés, en el ledger:

> "User reported several errors; leave for dedicated ticket." (`PASS-FUTURE-WEB-HUMAN-QA-BATCH-RESULT-RECONCILIATION-001.md:96`)

**«Varios errores» no es un defecto nombrado.** Ninguna de las tres fuentes enumera uno solo. **No hay nada
que reproducir**, y la DoD §4 S8 tiene salida literal: *«No QA verdict names a defect: NOT_APPLICABLE»*.

**S8 = NOT_APPLICABLE.** El packet se prepara **completo**, no delta, según DoD §6 (fila
`HUMAN_QA_DEFERRED_OWN_TICKET_REQUIRED`: *«No verdict to consume; prepare the full packet»*).

### 9.2 Este componente es el ticket propio que la QA pidió

La QA difirió a *«dedicated repair ticket»*. **`RUN-JAME-WEB-ARITHMETIC-AUDIT-AND-REPAIR-001` es ese
ticket.** Se dice porque cambia cómo se lee el packet: no es una re-verificación, es **la primera pasada
humana completa** que este componente recibe con procedimiento.

### 9.3 EL DEFECTO MEDIDO POR EL TALLER — uno, visible, no reparado

**Los delimitadores del autor se envuelven otra vez y la fórmula sale rota.**

**Qué mide cada capa:**

- El renderer envuelve **siempre**: `\( ${grp.math} \)` (`renderArithmetic.js:225`), `\( ${pre} \)` (`:250`)
  y `\( ${val} \)` (`:251`).
- El esquema **no rechaza delimitadores** en `result` ni en `counts[].math`. Comparación medida dentro del
  mismo archivo: `TableRichMathSchema` **sí** los rechaza (`draftSchema.js:377` y `:383`) y `WebRuleSchema`
  también, por `validateRuleMathValue`.
- El editor solo **avisa**, en el texto de ayuda de «Resultado final»: *«El renderer agrega delimitadores»*
  (`web/WebBlockEditor.jsx:3359`). **Los campos «Expresion» de los factores no llevan ni ese aviso.**

**Medido ejecutando**, compilando y renderizando:

| Entrada del autor | HTML resultante | Roto |
|---|---|---|
| `result: "4 = 2^2"` | `\( 4 = \)` y `\( 2^2 \)` | no |
| `result: "\\( 4 = 2^2 \\)"` | `\( \( 4 = \)` y `\( 2^2 \) \)` | **sí** |
| `result: "\\[ 4 = 2^2 \\]"` | `\( \[ 4 = \)` y `\( 2^2 \] \)` | **sí** |
| `counts[0].math: "\\( 2^2 \\)"` | `\( \( 2^2 \) \)` | **sí** |

**Agravante medido:** el renderer **parte `result` por el `=`** y envuelve cada mitad por separado, así que
un `result` con delimitadores no queda solo anidado: queda **partido en dos expresiones inválidas**.

**Por qué es plausible que el autor lo haga:** en otros bloques del mismo editor los delimitadores sí se
escriben —el insertor de fórmula en línea los pone él mismo en los cinco campos de prosa—. Un autor que
aprenda el gesto allí lo traerá aquí, y **aquí no hay nada que se lo impida ni le avise**.

**Ningún veredicto de QA nombra este defecto** —la QA solo dijo «varios errores»—, así que, por resolución
del piloto §11.3(a), queda **pendiente de veredicto, anotado, no resuelto por criterio propio**. **Está en
el packet como checks 3 a 6**, con la instrucción explícita de que se espera ver algo roto.

**No se reparó.** La reparación mínima —añadir el rechazo de delimitadores a los dos campos— toca **los dos
`draftSchema.js`**, que el encargo nombra como pieza compartida. Coste y recomendación en §17.

### 9.4 Lo que NO es defecto, y se dice para que no se cuente dos veces

- **`escapeHtml` sobre los campos de math.** `compiler.js:829` y `:831` escapan `counts[].math` y `result`.
  Un `&` de LaTeX viaja como `&amp;` en el objeto compilado —medido—. **Es la misma observación que
  `callout` declaró para su campo de prosa**, ya fijada por tests en aquel run. **No se cuenta como defecto
  nuevo de este componente**; está en el packet solo como observación heredada, y el packet dice
  explícitamente que el taller **no pudo medir qué hace el navegador con la entidad**.
- **`steps[].val` y `div` salen como cadena.** `escapeHtml(step.val)` convierte el número a string
  (`compiler.js:823-824`): la salida lleva `val: "360"`, no `val: 360`. El renderer los interpola como texto
  y se ven bien. **Medido, sin efecto visible.** Se declara y no se cuenta.
- **`mode: "matrix"` inalcanzable.** Frontera declarada, no hueco (§4.3).

---

## 10. S6 — Ida y vuelta de persistencia

Medido ejecutando `parseAndValidateBlocks` sobre el fixture completo —siete pasos con y sin divisor, tres
factores, y un `result` con `\times`— y comparando con la entrada:

**`JSON.stringify(salida) === JSON.stringify(entrada)` → verdadero. Ida y vuelta byte a byte idéntica.**

**Lo que más importa aquí:** las **barras invertidas de LaTeX sobreviven verbatim**. `360 = 2^3 \times 3^2 \times 5`
entra y sale igual, sin escapado extra ni normalización. Es lo que el contrato de math §10 exige para
Superficie B.

**S6 = PASS.**

---

## 11. S7 — El packet de QA para el operador

Escrito en `docs/_historical_run_record/RUN-JAME-WEB-ARITHMETIC-AUDIT-AND-REPAIR-001-OPERATOR-QA-PACKET.md`,
con la forma del packet más reciente.

**Packet COMPLETO, no delta**, por la fila `HUMAN_QA_DEFERRED_OWN_TICKET_REQUIRED` de la DoD §6.

**18 checks.** Los dos de consecuencia de parada van primeros y marcados ⛔. Los checks 3 a 6 son el defecto
de §9.3, marcados ❗ y con la instrucción explícita de que **se espera ver algo roto** —para que el operador
no lo lea como error suyo—. Incluye sección propia sobre **cómo insertar el bloque**, porque `rail: false`.

**Un check mide, desde aquí, algo que le falta a otro componente del lote.** El check 18 comprueba que el
esquema estricto de «Factorización» rechaza campos desconocidos, **precisamente porque «Nota desplegable»
(32) no lo hace y se los traga en silencio**. Se mide aquí porque aquí es donde está bien; el defecto es del
otro y está declarado en su record y en su packet.

---

## 12. S9, S10 y las divergencias declaradas

**S9 = PASS.** No se escribió `docs/components/web/arithmetic.md` ni ninguna fuente del Component Guide.

**S10 = PASS.** `.aiw/docs/docs_index.json` **no se escribió**. El conflicto preservado de `list` sigue
intacto.

**Dos discrepancias enrutadas, ninguna reparada:**

1. **`source_refs` de la entrada `arithmetic` apunta a un archivo que no existe** —
   `docs/author-lite/NEXT_STEPS.md`—. **Tercer componente seguido con el mismo puntero roto** (`callout`
   §17.2(b), «Nota desplegable» §12, y este). **Se confirma y se fecha, no se repara.**
2. **La matriz da a este componente dos estados en el mismo documento**: `HUMAN_QA_DEFERRED_OWN_TICKET_REQUIRED`
   en `:104`, `:197` y `:317`, y en el bloque de reconciliación de `:325` lo lista entre los `DEFERRED` —
   coherente—, pero `:371` lo mete en la lista de *«Human QA queda acumulado como pendiente/diferido»* junto a
   componentes que la propia matriz clasifica como `FAILED`. **Es contradicción más leve que la de `callout`
   y «Nota desplegable»**, pero es la misma familia: la fuente única no es consistente consigo misma y **ningún
   paso pregunta si lo es**. Se declara.

**Sin divergencia contra la DoD §5.** Las dos filas de este componente —color y math— **salen exactas**. Es
el único de los tres del lote del que se puede decir eso.

---

## 13. Tests — qué corrí, con su salida

Corridos **como medición**, según DoD §6. **Ninguno es autorización de reparación.**

| Archivo | pass | fail | Qué fija de este componente |
|---|---|---|---|
| `webArithmeticFactorizationSafety.test.mjs` | 11 | 0 | modo único, topes de pasos y factores, rechazo de campos extra, sanitización |
| `webColumnsChildExpansionSafety.test.mjs` | 27 | 0 | qué se admite como hijo de columna; `arithmetic` fuera |
| `mathAuthoringAllowlistExpansion.test.mjs` | 9 | 0 | la lista cerrada, que **no** aplica a este componente |
| `webInlineFormulaProseBehaviourLock.test.mjs` | 13 | 0 | los cinco campos de prosa; **ninguno es de `arithmetic`** |

**Total corrido para este componente: 60 aserciones de nivel superior, 0 fallos.**

**Aserción que NO existe, y es la medición más importante de esta sección:** ninguna de las once pruebas de
`webArithmeticFactorizationSafety.test.mjs` comprueba qué pasa si el autor escribe delimitadores. **El
defecto de §9.3 no está cubierto por ningún test.** Por eso pasó desapercibido: los tests verdes no lo
tocan.

**Lo que NO se afirma:** que los tests aprueben nada.

---

## 14. Las cifras del encargo, verificadas una a una

Verificadas en el record de «Nota desplegable» §14 y no repetidas aquí; **las catorce dan el mismo
resultado**, medidas sobre el mismo disco en la misma sesión: **doce exactas, dos desfasadas**, y las dos
desfasadas están en la Definition of Done y **no afectan a este componente** (sus dos filas de §5 salen
exactas).

Añadidas por este componente:

| Cifra | Fuente | Verificado | Resultado |
|---|---|---|---|
| `queue_order` 33 → `RUN-JAME-WEB-ARITHMETIC-AUDIT-AND-REPAIR-001` | encargo | roadmap canónico | **EXACTA**, coincidencia única |
| Título verbatim | encargo | roadmap canónico | **EXACTA**, carácter a carácter |
| DoD §5: `arithmetic` sin superficie de color | DoD §5 | cinco capas | **EXACTA** |
| DoD §5: `counts[].math` y `result`, Superficie B, renderiza | DoD §5 | esquema, compilador, renderer | **EXACTA** |
| DoD §8: *«`arithmetic`, `timeline`, and `hierarchy` keep authored delimiters that the renderer wraps again»* | DoD §8 | ejecución | **EXACTA, y es el defecto de §9.3.** La DoD ya lo decía; **ningún run lo había medido en salida visible** |
| Topes `MAX_ARITHMETIC_STEPS` / `_COUNTS` / `_COUNT_VALUE` = 8 | esquema | disco | **EXACTOS**, los tres |

**Hallazgo sobre la última fila:** la Definition of Done §8 **ya nombraba** esta conducta como excepción del
componente. Lo que este run añade es **la medición de su consecuencia visible**: no es una diferencia de
autoría de delimitadores, es una **fórmula rota partida en dos**. La DoD lo describía como reparto de
responsabilidad; en pantalla es un defecto.

---

## 15. HUECOS NUEVOS DEL PROCEDIMIENTO — solo los que los seis runs anteriores no declararon

**Ya declarado y confirmado sin repetir:** todo lo enumerado en el record de «Nota desplegable» §15, más los
tres huecos que aquel añadió (comparación entre componentes, S8 sin salida para «decidir», y la vía de
inserción). **El tercero se confirma aquí**: este componente también lleva `rail: false` y también necesitó
sección propia en el packet.

Lo que este componente añade:

### 15.1 NUEVO — S4 pregunta quién pone los delimitadores, pero no si los dos pueden ponerlos a la vez

La pregunta 5 del bloque de auditoría de math es *«quién pone los delimitadores»*, y admite una respuesta:
el autor, o el compilador, o el renderer. **Este componente rompe la pregunta**: los pone el renderer
**y también puede ponerlos el autor**, porque nada se lo impide. La respuesta honesta a la pregunta 5 no es
una de las tres opciones; es *«el renderer, y además el autor si quiere, y entonces salen los dos»*.

**Un paso que se conteste al pie de la letra escribe «el renderer» y cierra en verde.** Lo escribí así en
§6, pregunta 5, y **tuve que añadirle media frase que la pregunta no pide** para que el defecto no
desapareciera dentro de una respuesta correcta.

Es distinto del hueco de `video` §16.1 sobre la pregunta 6 —allí la pregunta presuponía de más—: aquí la
pregunta **presupone exclusividad** donde el código no la garantiza. **Al menos dos componentes más entran
por aquí**: la DoD §8 nombra a `timeline` y `hierarchy` con la misma conducta.

### 15.2 NUEVO — ningún paso distingue «la DoD ya lo nombró» de «la DoD midió su consecuencia»

La DoD §8 nombra esta conducta como excepción del componente, en una frase que la presenta como **reparto de
responsabilidad** entre compilador y renderer. Medida en salida, **es un defecto visible**. Los diez pasos
no tienen ninguna celda que obligue a preguntar *«esta excepción que la DoD ya declara, ¿qué produce en
pantalla?»*.

**Consecuencia práctica, y por eso lo declaro:** un run que lea la DoD §8, encuentre allí su excepción y la
cite, **cierra S4 en verde con la conducta ya "conocida" y no la mide nunca**. Yo la medí porque ejecuté el
renderer, no porque el procedimiento me lo pidiera. **Lo digo porque fue decisión mía.**

### 15.3 ¿Qué sobra? — hallazgo nuevo, no confirmación

**Nueve de las diez preguntas de S3 salieron vacías**, el máximo de todos los runs de la serie hasta hoy: en
`video` y `narrative` fueron menos. Y a diferencia de S4 en los componentes sin math —donde `callout` midió
que **dos** de las ocho vacías sí daban señal por el botón—, **aquí las nueve no dan ninguna**. No hay
control, ni campo, ni opción, ni resolución, ni emisión, ni consumo.

**No propongo quitarlas.** Digo que este componente es la prueba de que el coste es real: nueve respuestas
escritas para documentar una ausencia que la pregunta 1 ya cierra sola, y que **cinco capas independientes
confirman**. Ya lo declararon el piloto, `iconList`, `card`, `video`, `narrative` y `callout` para S4;
**aquí es la primera vez que ocurre en S3 con nueve de diez**, y por eso se cuenta como precisión y no como
repetición.

---

## 16. En qué status debe quedar el run, y qué falta para llegar ahí

**Este record NO cambia ningún status. Lo cierra el operador desde la consola. `.project/` no se re-emitió.**

**Status declarado: el run debe seguir `active`.**

Falta, y no es del taller:

1. Que el operador ejecute los 18 checks del packet y emita veredicto — **esta es la QA humana que la QA
   anterior difirió**, y este run es el ticket propio que pidió.
2. Que decida si el defecto de §9.3 se repara, y con qué alcance (§17 da coste y recomendación, sin decidir).
3. Que decida si los *«varios errores»* que la QA anterior no enumeró siguen existiendo: **el taller no
   pudo saberlo**, porque nadie los escribió.

---

## 17. Informe de opciones de coste medido — para el operador, SIN DECIDIR

Un defecto medido, tres formas de cerrarlo.

| Opción | Qué toca | Coste medido | Riesgo |
|---|---|---|---|
| **A. Rechazar delimitadores en el esquema** | Dos `.refine` en `result` y `counts[].math`, en **los dos `draftSchema.js`**. El patrón exacto ya existe copiable en `TableRichMathSchema` (`draftSchema.js:377`, `:383`) | **Bajo.** Cuatro líneas, dos archivos, patrón ya probado en el mismo archivo | **Medio.** Un borrador ya guardado con delimitadores **dejaría de cargar**. Hoy ese borrador estaría roto en pantalla, así que el rechazo lo hace visible en vez de silencioso |
| **B. Limpiar delimitadores en el compilador** | Una normalización en `buildArithmeticFactorizationOutput` (`compiler.js:810`) que quite los delimitadores del autor antes de emitir | **Bajo.** Un archivo, una función | **Medio-alto.** Cambia conducta del compilador sin avisar al autor: acepta lo que no debería y lo corrige a su espalda. Y `compiler.js` lo comparten los diecisiete |
| **C. Solo avisar en el editor** | Añadir el `helper` que falta a los campos «Expresion», igual que el que ya tiene «Resultado final» (`web/WebBlockEditor.jsx:3359`) | **Mínimo.** Un literal | **Bajo, y no arregla nada.** El aviso ya existe en un campo y aun así el defecto es posible: un aviso no es una guardia |

**Recomendación explícita del taller, que NO es decisión:**

- **A** es la correcta. Es la que ya usan `table` y `rule`, deja el componente **consistente con sus pares**,
  y convierte un fallo silencioso en un mensaje de error. Debería ir **precedida de un inventario de
  borradores en disco** con delimitadores en esos dos campos, por el mismo motivo que en «Nota desplegable»:
  el riesgo no está en el cambio, está en lo ya guardado.
- **B** no la recomiendo: corregir a espaldas del autor es peor que rechazar, y toca una pieza que comparten
  los diecisiete.
- **C** la recomiendo **además de A**, no en lugar de A. Es una línea y cierra la asimetría de que un campo
  avise y el otro no.
- **A + C caben juntas en un run pequeño.** Es, con diferencia, la reparación más barata de las medidas en
  este lote de tres: este componente es el **menos acoplado** (§7) y su defecto vive entero en superficie
  propia. **Si el operador solo autoriza una reparación de las tres del lote, recomiendo esta.**

---

## 18. Archivos escritos — dos, y ninguno más

1. `projects/cantu-studio/docs/_historical_run_record/RUN-JAME-WEB-ARITHMETIC-AUDIT-AND-REPAIR-001-OPERATOR-QA-PACKET.md`
2. `projects/aiw-console/context/aiw-console/records/REVALIDACION-COMPONENTE-FACTORIZACION-CANTU.md` (este)

**Ningún archivo de `cantu-studio` fue modificado.**

---

## 19. Lo que este encargo NO hizo — y por qué

- **No reparó nada.** El único defecto medido no está autorizado por ningún veredicto de QA, y repararlo
  toca los dos `draftSchema.js`.
- **No cambió ningún status ni re-emitió `.project/`.** **No ejecutó git.** **No insertó, movió ni renumeró runs.**
- **No escribió `docs/components/web/arithmetic.md`** ni fuente del Component Guide (DoD §4 S9).
- **No escribió `.aiw/docs/docs_index.json`** (DoD §4 S10). **No editó `.aiw/state/component_status.json`.**
- **No habilitó `mode: "matrix"`**, pese a que el motor y el fixture lo soportan: es frontera declarada.
- **No instaló el insertor de fórmula** en los campos de math, pese a que el `full_description` nombra el
  Formula Inserter: sería capacidad nueva.
- **No amplió alcance.**

---

## 20. Procedencia

**Qué se midió, contra qué archivo, y con qué método.**

- **Identidad**: `projects/cantu-studio/.aiw/roadmap/roadmap.json`, recorrido completo del árbol, comparación
  de título con `JSON.stringify`.
- **Etiqueta de plataforma**: `blockCatalog.js`, `WEB_COMPONENT_UI.arithmetic.label` (`:91`) y la entrada
  `web-arithmetic` de `BLOCK_CATALOG` (`:648`). **No tomada del encargo ni de ningún record.**
- **Capas S2**: las quince citas de §4, cada una abierta en el archivo real.
- **Comparación de los dos esquemas**: `diff` completo, más ejecución del default de fábrica y cuatro casos
  límite por ambos.
- **Color**: ausencia demostrada en cinco capas, incluida la ejecución de un `variant` contra el esquema
  estricto para comprobar que lo rechaza.
- **Math y el defecto de §9.3**: banco de medición propio que valida por `WebDraftSchema`, compila por
  `compileDraftToJameData` y renderiza por `renderArithmetic.js`, sobre cuatro entradas —limpia, con `\( \)`,
  con `\[ \]`, y con delimitadores en `counts[].math`—, extrayendo por expresión regular los fragmentos
  `\(...\)` del HTML y comprobando si contienen delimitadores anidados.
- **Persistencia**: ejecución de `parseAndValidateBlocks` con comparación `JSON.stringify`.
- **Tests**: `node --test <ruta>`, un archivo por invocación, salidas de §13. Inspección del contenido de
  `webArithmeticFactorizationSafety.test.mjs` para verificar la ausencia de cobertura del defecto.
- **Estado de QA**: `.aiw/state/component_status.json` (entrada `arithmetic`),
  `COMPONENT_CERTIFICATION_MATRIX.md` (`:104`, `:197`, `:317`, `:325`, `:371`),
  `PASS-FUTURE-WEB-HUMAN-QA-BATCH-RESULT-RECONCILIATION-001.md:96`.

**Qué quedó sin reparar, y por qué.**

| Sin reparar | Por qué |
|---|---|
| Delimitadores del autor envueltos otra vez (§9.3) | **Ningún veredicto de QA lo nombra** —solo dice «varios errores»—, y la DoD §4 S8 dice que una observación del taller *«is a measurement to declare, never a repair authorization»*. Además toca **los dos `draftSchema.js`** |
| El `helper` que falta en los campos «Expresion» | Parte de la misma reparación; misma falta de autorización |
| `source_refs` con puntero a archivo inexistente | Editar la proyección **no es de este run** |
| Contradicción interna de la matriz | Elegir cuál lectura manda es **del operador** |
| Ausencia de test que cubra el defecto | Escribir el test es parte de la reparación, y la reparación no está autorizada |
