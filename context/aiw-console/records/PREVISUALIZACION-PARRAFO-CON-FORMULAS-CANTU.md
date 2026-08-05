# PREVISUALIZACIÓN DEL PÁRRAFO CON FÓRMULAS (cantu-studio)

**Fecha:** 2026-08-05
**Run:** `RUN-CANTU-INLINE-FORMULA-PREVIEW-001` — **derivado, no tecleado** (§1).
**Repo escrito:** `projects/cantu-studio` — **siete archivos**: 2 nuevos de producción,
3 modificados, 1 test nuevo y el packet de QA (§6, §9).
**Repo escrito:** `projects/aiw-console` — **este record.**
**Veredicto:** **CONSTRUIDO. Ninguna compuerta de parada se disparó.** La ruta elegida
**no necesita ninguna dependencia nueva**, y la razón está medida: **el motor que hace falta
YA ES dependencia del editor** — que es justo lo contrario de lo que el `full_description`
supone (§3.1). **Se corrige por escrito.**

---

## 1. EL RUN, DERIVADO DEL CANÓNICO

Recorrido de `projects/cantu-studio/.aiw/roadmap/roadmap.json`
(`schema_version = jame.roadmap_v3.v0.2-progress`), buscando `queue_order === 28`.
**Una sola coincidencia sobre 71 runs.**

| Campo | Valor derivado |
|---|---|
| `run_id` | **`RUN-CANTU-INLINE-FORMULA-PREVIEW-001`** |
| ubicación | objetivo `O5`, fase `O5.P3` |
| `queue_order` | 28 |
| `status` | `active` — **y es el ÚNICO run `active` del canónico**, verificado |
| `depends_on` | `RUN-CANTU-INLINE-FORMULA-INSERTER-MOUNT-001` — `queue_order 27`, **`status=completed`**: satisfecha |

**Título en disco, VERBATIM:**

```
Show the author a rendered preview of a prose paragraph that contains formulas
```

**Casa carácter a carácter con el objetivo del ticket. No hay parada por este motivo.**
El validador lo confirma de forma independiente:
`Roadmap v3 active run derived stages: RUN-CANTU-INLINE-FORMULA-PREVIEW-001=none` (§10).

El `full_description` se leyó íntegro antes de tocar nada.

### 1.1 La única tensión entre el ticket y el run, declarada y resuelta

El `full_description` dice, VERBATIM:

> `…implements the one the operator chooses; if no choice is on record, it STOPS and returns`
> `the options with measured cost rather than picking one.`

**El ticket de este encargo dice lo contrario en su criterio 2: «Elige una, impleméntala, y
escribe por qué las otras no».** No es una contradicción: **el ticket ES la elección en
registro.** El operador lo escribe después del `full_description` y acota la única condición
que sigue siendo suya —el criterio 3: si la ruta exigiera una dependencia, se para—. **Se
ejecuta bajo esa lectura, y la ruta elegida no exige ninguna.** Se declara para que quede
escrito por qué no se paró aquí.

### 1.2 Deriva de cifra contra los tres records leídos

`CONSTRUCCION` §1 y `REGLAS` §1 midieron **70 runs**; hoy hay **71**. La diferencia es
`RUN-CANTU-LESSON-LOAD-FAILURE-SURFACING-001`, en `queue_order 26`, que el operador dio de
alta entre aquella medición y esta. **Las cifras previas eran correctas en su fecha; por eso
el ticket manda medirlas.** El `queue_order` sigue denso y contiguo: **1..71, sin hueco ni
repetido**, verificado.

---

## 2. LOS TRES RECORDS — VERIFICADOS, NO HEREDADOS

| Afirmación de los records | Verificación de hoy | Resultado |
|---|---|---|
| `CONSTRUCCION`/`REGLAS`: el insertor vive en los **cinco campos**, **7 sitios**, **8 colocaciones** | recuento de `<InlineFormulaField` y de `<CardFields` sobre `WebBlockEditor.jsx`, y lectura de `COLUMN_CHILD_OPTIONS` | **CONFIRMADA — 7 y 8** (§3.3) |
| `REGLAS` §4.2: el conjunto reconocido son **cinco tokens** | **derivado en runtime**, importando el módulo | **CONFIRMADA — 5** (§3.4) |
| `BLOQUEO`: **trece** tests fijan la forma delimitada | recuento de `^test(` **y** ejecución | **CONFIRMADA — 13, y 13 en verde hoy** (§8.3) |
| `REGLAS` §0: MathLive carga la prosa **como matemáticas** —cursiva, espacios perdidos— | no se remidió en vivo; **se toma como medición fechada del operador** y es la razón por la que el párrafo se parte antes de tocar el motor | **USADA COMO PREMISA, declarada** (§4) |
| `CONSTRUCCION` §2.2: `TextAreaField` no expone `ref` y son **31 líneas** | archivo leído entero | **CONFIRMADA** — y este run tampoco lo toca (§8.1) |

---

## 3. LA MEDICIÓN DEL CRITERIO 1 — ARCHIVO Y LÍNEA

Todo lo de este apartado se leyó de disco en esta sesión, **antes de escribir una sola línea**.

### 3.1 QUÉ MOTOR USA CADA SUPERFICIE — **y la premisa del run es FALSA A MEDIAS**

**Hay DOS motores de matemáticas en juego, no uno, y la confusión entre ellos es lo que hace
que el `full_description` se equivoque.**

| Superficie que renderiza fórmulas | Motor | Cómo llega | ¿Dependencia del editor? |
|---|---|---|---|
| **HTML Web generado** | **KaTeX 0.16.9** | **CDN**, `src/builders/web/buildSingleWebLesson.js:4` | **NO** |
| **Previsualización de lección** (`compiler-api`) | **KaTeX 0.16.9** | **CDN**, `services/previewRenderer.js:12-14` | **NO** |
| **Moodle** | ninguno propio | el filtro MathJax de la instalación | **NO** |
| **La superficie de fórmula del editor** (`SmartFormulaPreview`, `SmartFormulaField`) | **MathLive 0.110.0** | **`import('mathlive')`** desde `smartFormulaField/mathLiveLoader.js:14-15` | **SÍ** |

**LA AFIRMACIÓN DEL `full_description`, VERBATIM:**

> `THE MATH ENGINE IS NOT A DEPENDENCY OF THE EDITOR`

**VEREDICTO: cierta para KaTeX, FALSA para MathLive.** La evidencia, toda verificable:

1. `editor-ui/package.json` lista **`"mathlive": "0.110.0"`** en `dependencies`. **KaTeX no
   aparece ni en `dependencies` ni en `devDependencies`.**
2. `tools/author-lite/editor-ui/node_modules/mathlive` existe en disco: **5,7 MB**. **No hay
   ningún `node_modules/katex` en el repo**, en ningún nivel.
3. `vite build` ya emite hoy un chunk **`mathlive.min-*.js` de 808,02 kB** (gzip 221,48 kB),
   **más las fuentes `KaTeX_*.woff2`** — que MathLive trae dentro y que por eso ya están en el
   paquete sin que KaTeX lo esté.
4. Barrido de `katex` en todo el repo fuera de `node_modules`, `dist` y `QA`: **10 resultados,
   y NINGUNO es un import.** Dos son las etiquetas de CDN; tres son la misma expresión regular
   de rechazo de scripts (`draftSchema.js:127` en los dos esquemas y `compiler.js:278`,
   más `safeSvg.js:166`); el resto son reglas de CSS de los renderers.

**ESTO ES LO QUE CAMBIA LA COMPARACIÓN DE RUTAS ENTERA**, y es un hallazgo, no un matiz: el
run está encuadrado sobre la idea de que meter matemáticas en el editor cuesta una dependencia.
**No la cuesta, siempre que el motor sea el que el editor ya tiene.**

### 3.2 QUÉ HACE EXACTAMENTE EL COMPONENTE DE PREVISUALIZACIÓN QUE YA EXISTE

`features/math-authoring/smartFormulaField/SmartFormulaPreview.jsx`, **99 líneas, leído entero.**

| Pregunta del criterio | Respuesta medida |
|---|---|
| **qué recibe** | seis props (`:7-14`): `value`, `fallback`, `label`, `className`, `emptyText`, `variant`. `value` puede ser cadena, `mathNode` o `mathBlockGroup`; lo resuelve `resolveSmartFormulaRenderLatex` (`:15-18`, adaptador `:199-214`) |
| **qué renderiza** | **UNA sola fórmula**, en un `<math-field readOnly>` de MathLive (`:75-82`), dentro de un `<div className="flex min-h-12 items-center justify-center …">` |
| **cómo carga el motor** | `loadMathLiveBoundary()` en un `useEffect` (`:30-41`); si falla, `formatLatexForSafeVisualFallback` (`:92`) |
| **¿SABE manejar un párrafo que mezcla prosa y fórmulas?** | **NO.** Lo que reciba entra entero a `mathfield.setValue()` (`:55`): **todo se compone como matemáticas.** No parte, no distingue prosa, y no conoce ningún delimitador |
| **quién lo usa hoy** | **un solo sitio de producción**: `WebBlockEditor.jsx:647`, en el campo de fórmula de la **regla matemática** (`rule.math`) — **no en ninguno de los cinco campos de prosa** |

### 3.3 LOS CINCO CAMPOS, SUS SITIOS Y SUS COLOCACIONES — remedidos

**Todos en `WebBlockEditor.jsx`, que sigue en 4118 líneas.** Las líneas de los **siete usos de
`<InlineFormulaField`**, contadas hoy:

| # | Campo | Colocación | Línea | Control del campo |
|---|---|---|---|---|
| 1 | `card(normal).content` | primer nivel **y** columna | `:1162` (helper `renderTextArea`, flag en `:1179`) | `<textarea>` nativo |
| 2 | `callout.content` | **hijo de columnas** | `:1874` | `<textarea>` nativo |
| 3 | `rule.description` | **hijo de columnas** | `:1914` | `<textarea>` nativo |
| 4 | `details.items[].content` | primer nivel | `:2468` | `TextAreaField` |
| 5 | `conceptGrid.items[].content` | primer nivel | `:2630` | `TextAreaField` |
| 6 | `callout.content` | primer nivel | `:3981` | `TextAreaField` |
| 7 | `rule.description` | primer nivel | `:4076` | `TextAreaField` |

**CIFRAS CONFIRMADAS: 7 sitios de código, 8 colocaciones visibles.** La tarjeta es **un solo
sitio** servido en **dos colocaciones**: `<CardFields` aparece **dos veces** (`:1933` y
`:3962`). `COLUMN_CHILD_OPTIONS` (`:258-267`) declara **ocho** hijos —`header, list, iconList,
rule, card, callout, narrative, table`— y **ni `details` ni `conceptGrid` están**, que es por
lo que esos dos tienen una sola colocación. **details 1 · callout 2 · card 2 · conceptGrid 1 ·
rule 2 = 8.**

**DÓNDE IRÍA LA PREVISUALIZACIÓN — y aquí está la decisión de forma de este run.** Los siete
sitios **ya están envueltos** por `InlineFormulaField`, que el run anterior montó. **Colgar la
previsualización de ese envoltorio la pone en los cinco campos, los siete sitios y las ocho
colocaciones con UN SOLO SITIO DE CÓDIGO, y sin un solo diff en `WebBlockEditor.jsx`.**

### 3.4 EL CONJUNTO DE DELIMITADORES — DERIVADO EN RUNTIME, NO TECLEADO

Dos fuentes, las dos que el ticket nombra, y las dos leídas por código:

1. **Del adaptador.** `ADVANCED_OUTER_WRAPPERS` (`smartFormulaFieldAdapter.js:137-141`), el
   único sitio del editor que declara el conjunto. **Importado y volcado en runtime:**
   `[{"open":"$$","close":"$$"},{"open":"\\[","close":"\\]"},{"open":"\\(","close":"\\)"}]`
   → `RECOGNIZED_DELIMITER_TOKENS` = **`$$`, `\[`, `\]`, `\(`, `\)` — cinco tokens.**
2. **De los trece tests del bloqueo.** El literal de
   `const FORMULA_PROSE = '…';` (`webInlineFormulaProseBehaviourLock.test.mjs:118`), del que
   sale el **par en línea `\(…\)`, sin relleno interno**.

**EL PARTIDOR DE ESTE RUN SOLO PARTE POR EL PAR EN LÍNEA**, y no lo teclea: lo **importa** de
`INLINE_FORMULA_DELIMITERS`. **Hay un test que lo fija por dos vías**: comprueba que el par
importado es el que se deriva del archivo del run del bloqueo, **y** que el partidor no declara
ningún `open:`/`close:` propio.

**Por qué `\[…\]` y `$$…$$` NO se parten, declarado:** componer una fórmula de **bloque** dentro
de un párrafo es una decisión de producto —¿en línea, o en su propia línea centrada?— y no del
taller. Una selección así ya cae al cuarto caso del insertor por la misma razón (`REGLAS` §6).
**Aquí se quedan como prosa cruda y se ven tal cual.** Se declara como límite, no como olvido.

---

## 4. LAS TRES RUTAS, COMPARADAS CON NÚMEROS

Las tres que el `full_description` nombra, más una cuarta que la medición obligó a separar.
**Los números de paquete salen de `vite build` real, antes y después.**

### Ruta A — Añadir el motor de matemáticas al editor (KaTeX)

| | |
|---|---|
| **Archivos que toca** | `editor-ui/package.json` + `package-lock.json` + el componente nuevo |
| **Qué añade al paquete** | **`katex@0.16.9`: 3 968 911 bytes descomprimidos, 205 archivos.** Medido con `npm view katex@0.16.9 dist.unpackedSize`, **consulta de solo lectura al registro; NO se instaló nada** |
| **Qué se rompe** | **Nada técnico conocido** — pero **exige una dependencia nueva**, y el criterio 3 la reserva al operador |
| **Qué NO cubre** | nada de lo pedido; lo cubriría todo |
| **Veredicto** | **DESCARTADA.** Compra 3,97 MB de dependencia nueva **para hacer lo que un motor ya presente hace**. Sería pagar dos veces |

### Ruta B — Reutilizar lo que la superficie de previsualización ya carga, tal cual

Pasar el párrafo entero a un `<math-field>`, que es lo que `SmartFormulaPreview` hace con su
`value`.

| | |
|---|---|
| **Archivos que toca** | 1 (`InlineFormulaField.jsx`) |
| **Qué añade al paquete** | **0 bytes** |
| **Qué se rompe** | **el resultado en pantalla.** MathLive compone **matemáticas**: la prosa saldría en cursiva y con los espacios perdidos |
| **Qué NO cubre** | **el caso central del run.** Un párrafo mixto es exactamente lo que no sabe hacer |
| **Veredicto** | **DESCARTADA, y no por conjetura.** Es el **fallo (b) que la QA del operador ya midió** sobre la precarga del insertor (`REGLAS` §0): «el editor la cargó como matemática —letras en cursiva, espacios perdidos—». **Ya está medido que esto falla** |

### Ruta C — Partir el párrafo y reusar `SmartFormulaPreview` por cada tramo

| | |
|---|---|
| **Archivos que toca** | 2 nuevos + 2 barriles + `InlineFormulaField.jsx` |
| **Qué añade al paquete** | **0 bytes** |
| **Qué se rompe** | **la forma de párrafo.** `SmartFormulaPreview` devuelve un `<div className="flex min-h-12 items-center justify-center …">`: un **bloque centrado de 48 px de alto mínimo**. Un párrafo con dos fórmulas daría **dos cajas apiladas de 48 px** con la prosa fuera. La prop `variant="flat"` cambia el fondo y el relleno (`:23-25`), **no** el `flex`, **ni** el `min-h-12`, **ni** el `justify-center` |
| **Qué NO cubre** | que se lea **como un párrafo**, que es literalmente lo que el título del run pide |
| **Veredicto** | **DESCARTADA en su forma literal.** Reusar el componente **entero** trae su caja; lo que hay que reusar es lo de dentro |

### Ruta D — Partir el párrafo y componer cada tramo con el MISMO motor, cargador y fallback que esa superficie ya usa · **ELEGIDA**

**Es la ruta C corregida por lo que C midió.** Se reusa lo que sirve —`loadMathLiveBoundary`,
`SMART_FORMULA_FIELD_STATUS`, `formatLatexForSafeVisualFallback`— y **no** la caja de bloque.

| | |
|---|---|
| **Archivos que toca** | **2 nuevos** (partidor + superficie), **3 modificados** (el envoltorio y dos barriles). **`WebBlockEditor.jsx` NO se toca** |
| **Qué añade al paquete** | **medido con `vite build` antes y después:** `index.js` **762,12 kB → 765,15 kB** (**+3,03 kB**; gzip 209,95 → 210,74, **+0,79 kB**); `index.css` 75,46 → 75,49 kB (**+0,03 kB**); **`mathlive.min.js` 808,02 kB → 808,02 kB, MISMO HASH `_xLHa7o0`: byte a byte el mismo archivo.** **Motor añadido: 0 bytes** |
| **Qué se rompe** | **nada medido.** 229 tests de 17 archivos en verde, `eslint` limpio, `vite build` correcto |
| **Qué NO cubre** | fórmulas de **bloque** (`\[…\]`, `$$…$$`): se ven crudas (§3.4). Y **no** compone en el campo — el campo sigue siendo texto plano, que es lo que el criterio 6 exige |
| **Coste en tiempo de ejecución, declarado** | el chunk de MathLive **hoy solo se descarga si el autor abre una regla**. Con este run se descargaría también al abrir cualquiera de los cinco campos **que contenga al menos una fórmula componible**. **Mitigado y fijado con un test:** un párrafo sin fórmulas **no toca el cargador** |

**Por qué esta y no las otras, en una frase: es la única que produce un párrafo, y lo hace sin
comprar nada.**

---

## 5. EL CRITERIO 3 — NINGUNA DEPENDENCIA NUEVA

**La ruta elegida no exige ninguna, así que no hay nada que devolver al operador y no se paró.**
Verificado por tres vías:

1. `editor-ui/package.json` **no se tocó**. Ni `dependencies` ni `devDependencies` cambian.
2. **Hay un test que lo fija sin depender de la memoria de nadie:** extrae las importaciones no
   relativas del componente nuevo y afirma que **todas** están declaradas en el manifiesto.
   Resultado: la lista es **exactamente `['react']`**.
3. El mismo test afirma que **ni el componente ni el partidor importan `mathlive`
   directamente**, que es lo que exige la restricción viva del repo (§8.2).

---

## 6. EL DIFF CONCEPTUAL

### 6.1 Producción — 2 nuevos, 3 modificados

| Archivo | Qué es | Líneas (medidas hoy) |
|---|---|---|
| `math-authoring/inlineFormula/inlineFormulaSegments.js` | **NUEVO — el partidor.** Recorre el párrafo y devuelve tramos `PROSE`/`FORMULA`. Importa el par de delimitadores y `hasMalformedLaTeX`; no declara ninguno propio | **131** |
| `math-authoring/inlineFormula/InlineFormulaParagraphPreview.jsx` | **NUEVO — la superficie.** Pinta prosa como prosa y cada fórmula en un `<math-field>` en línea, por el cargador central | **186** |
| `math-authoring/inlineFormula/InlineFormulaField.jsx` | **el envoltorio**: guarda una **copia de lectura** del valor del campo y monta la previsualización bajo el hijo | **268** *(`REGLAS` §9.1 lo dejó en 230; **no reverifiqué esa cifra previa**, solo la de hoy)* |
| `math-authoring/inlineFormula/index.js` | barril: publica el partidor y la superficie | 16 → **25** |
| `math-authoring/index.js` | barril: publica **solo la lógica**, como ya hacía | aditivo |

*(Y el test nuevo, `compiler-api/tests/webInlineFormulaParagraphPreview.test.mjs`: **446** líneas,
16 declaraciones.)*

**`WebBlockEditor.jsx` NO se tocó: sigue en 4118 líneas**, con sus siete
`<InlineFormulaField>` en las mismas líneas. **Es la señal de que el envoltorio del run
anterior estaba bien puesto**, y hay un test que afirma que el editor **no menciona** la
previsualización.

### 6.2 Las tres decisiones de forma que no eran obvias

1. **La previsualización se monta en el ENVOLTORIO, no en los siete sitios.** Un sitio de
   código en vez de siete diffs. Y hay una razón que no es solo de elegancia: **dos tests
   vivos del repo prohíben que `WebBlockEditor.jsx` mencione `SmartFormula` cerca de
   `field.kind === 'callout'|'card'|…`** (`webRuleSmartFormulaFieldRulePilot.test.mjs:388`).
   Montarla en los sitios habría corrido ese riesgo; montarla en el envoltorio lo evita de raíz.

2. **El texto se lee del DOM, no de React Hook Form.** El `<textarea>` es **no controlado** y su
   valor vive en el elemento. Pedirlo con `useWatch` habría exigido pasar `control` y `name` por
   props **a los siete sitios**. La delegación que el envoltorio **ya tenía** lo da gratis:
   `onInput` burbujea en cada pulsación —y también cuando el propio insertor escribe, porque
   `writeUncontrolledValue` **emite ese mismo evento**—. **El campo no se toca.**

3. **El `<math-field>` de un tramo que falla se OCULTA, no se desmonta.** Si se desmontara, su
   `ref` moriría con él y ese tramo **no podría recuperarse nunca**, ni aunque el autor
   arreglara la fórmula. Hay un test que fija las dos mitades.

### 6.3 Qué hace la previsualización con cada clase de tramo

| Entrada | Qué se ve |
|---|---|
| prosa | tal cual, con sus espacios y saltos (`whitespace-pre-wrap`) |
| `\(latex\)` con estructura equilibrada | **compuesto** por MathLive |
| **`\(` sin `\)`** — a medio escribir | **texto crudo desde el `\(` hasta el final**; todo lo anterior se sigue componiendo |
| `\(\)` vacío, o interior mal formado | **texto crudo de ese tramo**, con su razón dicha |
| `setValue` falla en runtime | **texto crudo de ESE tramo**, el resto sigue |
| el motor no carga | **el texto de respaldo que la superficie de fórmula ya usa**, nunca blanco |

**Concatenar el `raw` de todos los tramos reproduce la entrada byte a byte.** Es la garantía de
que previsualizar no puede inventar ni perder texto, **y hay un test que la fija.**

---

## 7. LA VERIFICACIÓN DEL CRITERIO 5 — EL DATO NO CAMBIA

**Los trece tests del run del bloqueo: 13 de 13 EN VERDE**, ejecutados hoy después de todo el
cambio (§8.3). **Los del insertor: 26 de 26 en verde** — los 16 del montaje y los 10 de las
reglas de selección. **Ninguno se puso rojo, así que no hay nada que reportar por ese motivo.**

**Y hay una razón estructural por la que el dato no podía cambiar, además de la ejecución:**

- **la previsualización es SOLO LECTURA.** Hay un test que afirma que ni el partidor ni la
  superficie contienen `writeUncontrolledValue`, `dispatchEvent` ni ninguna asignación `.value =`;
- **la única escritura de vuelta del control sigue siendo la del insertor**, y el test cuenta que
  `writeUncontrolledValue` aparece **exactamente dos veces** en el archivo: su definición y su
  única llamada;
- **no se tocó** el compilador, ni los renderers, ni ninguno de los dos esquemas, ni el formato
  guardado. El campo sigue siendo un `<textarea>` de texto plano;
- **el control compartido `TextAreaField.jsx` no se tocó**, y hay un test que lo fija.

---

## 8. LOS TESTS

### 8.1 El archivo nuevo — 16 declaraciones

`tools/author-lite/compiler-api/tests/webInlineFormulaParagraphPreview.test.mjs`

```bash
node --test tools/author-lite/compiler-api/tests/webInlineFormulaParagraphPreview.test.mjs
```

```
✔ a paragraph mixing prose and a formula splits into the preview the author expects (6.4782ms)
✔ the preview splits on the same delimiter pair the locking run fixed, derived and not typed (1.5517ms)
✔ two formulas in one paragraph each reach the engine on their own (0.8316ms)
✔ a paragraph with no formulas is shown as prose and loads no math engine (0.6965ms)
✔ the engine is loaded only when there is something to typeset (1.1129ms)
✔ an empty value renders the empty hint instead of an empty box (0.6005ms)
✔ a half-written formula shows as raw text and the rest of the paragraph still renders (0.7303ms)
✔ a closed but malformed formula shows raw and the other formula still typesets (0.6316ms)
✔ an empty pair is refused as a formula and shown raw instead of typesetting nothing (0.7111ms)
✔ the surface shows raw text per unrenderable segment, never a blank preview (0.8176ms)
✔ the preview adds no new dependency and reaches MathLive through the central loader (2.2889ms)
✔ the preview reuses the existing single-formula fallback instead of writing a second one (0.8769ms)
✔ the preview is mounted inside the wrapper, so it reaches the five prose fields on seven sites (1.2121ms)
✔ the seven sites still cover the same eight author-visible placements (1.2068ms)
✔ previewing never writes: the field stays plain text and stores exactly what it stored (1.8612ms)
✔ the shared text area control was not touched to make the preview possible (0.6465ms)
ℹ tests 16
ℹ suites 0
ℹ pass 16
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 105.4707
```

**Cobertura contra el criterio 7, punto por punto:**

| Lo que el criterio pide | Test |
|---|---|
| un párrafo con prosa y fórmula produce la previsualización esperada | `a paragraph mixing prose and a formula splits into the preview the author expects` (+ `two formulas in one paragraph…`) |
| un párrafo sin fórmulas se muestra como prosa | `a paragraph with no formulas is shown as prose and loads no math engine` |
| una fórmula a medio escribir no rompe nada y el resto sigue mostrándose | `a half-written formula shows as raw text and the rest of the paragraph still renders` (+ `a closed but malformed formula…`, `an empty pair…`) |

**FRONTERAS DECLARADAS, no disfrazadas:**

- **NO se ejecuta React.** Que cada tramo llegue a la pantalla con su marcado se afirma sobre el
  **código fuente** del componente, que es el método que ya usan los otros tests de esa carpeta.
- **NO se ejecuta MathLive.** Que `<math-field>` componga el LaTeX es de la librería y del
  navegador. Lo que sí se afirma es que **cada tramo componible llega al motor** y que **ninguno
  puede dejar la previsualización en blanco**.
- Lo que el autor **ve** lo verifica el packet (§9).

### 8.2 Lo tocado y lo directamente relacionado — **NO la suite completa**

**17 archivos:** los tres del hilo de la fórmula en línea, los del insertor y el campo
inteligente, y los de los componentes de los cinco campos.

```bash
node --test \
  tools/author-lite/compiler-api/tests/webInlineFormulaParagraphPreview.test.mjs \
  tools/author-lite/compiler-api/tests/webInlineFormulaSelectionRules.test.mjs \
  tools/author-lite/compiler-api/tests/webInlineFormulaInserterMount.test.mjs \
  tools/author-lite/compiler-api/tests/webInlineFormulaProseBehaviourLock.test.mjs \
  tools/author-lite/compiler-api/tests/mathAuthoringFormulaInserter.test.mjs \
  tools/author-lite/compiler-api/tests/mathAuthoringSmartFormulaField.test.mjs \
  tools/author-lite/compiler-api/tests/mathAuthoringSmartFormulaFieldContractStability.test.mjs \
  tools/author-lite/compiler-api/tests/webRuleSmartFormulaFieldRulePilot.test.mjs \
  tools/author-lite/compiler-api/tests/webRuleMathAuthoringIntegration.test.mjs \
  tools/author-lite/compiler-api/tests/mathAuthoringAllowlistExpansion.test.mjs \
  tools/author-lite/compiler-api/tests/mathAuthoringFormulaEditorMessageAndUprightConstants.test.mjs \
  tools/author-lite/compiler-api/tests/mathAuthoringFormulaEditorSurfaceState.test.mjs \
  tools/author-lite/compiler-api/tests/mathAuthoringVirtualKeyboardKatexCompatibility.test.mjs \
  tools/author-lite/compiler-api/tests/webTheoryCardsRuleBoxesParitySafety.test.mjs \
  tools/author-lite/compiler-api/tests/webConceptGridSafety.test.mjs \
  tools/author-lite/compiler-api/tests/webTheoryTextBlocksSafety.test.mjs \
  tools/author-lite/compiler-api/tests/webColumnsChildExpansionSafety.test.mjs
```

```
ℹ tests 229
ℹ suites 0
ℹ pass 229
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 813.2921
```

**229 de 229 en verde. Nada verde se puso rojo. Ningún test existente se ajustó ni se borró.**

**Dos restricciones vivas del repo que este run tenía que respetar, y respeta —medidas, no
supuestas—:**

1. `MathLive direct package access remains limited to prototype and central loader` (dos copias,
   con `assert.deepEqual` sobre la lista **exacta** de archivos que importan `mathlive`: son
   **tres** y ninguno es de este run). **La previsualización llega al motor por
   `loadMathLiveBoundary`, no por el paquete.**
2. `Smart Formula Field productive editor integration remains limited to Web rule` (barrido de
   `features/editor/**`; **solo `WebBlockEditor.jsx` puede casar**). Los archivos nuevos viven en
   `features/math-authoring/`, **fuera de ese barrido**, igual que el envoltorio del run anterior.

### 8.3 Los trece del run del bloqueo — criterio 5

```bash
node --test tools/author-lite/compiler-api/tests/webInlineFormulaProseBehaviourLock.test.mjs
```

```
ℹ tests 13
ℹ suites 0
ℹ pass 13
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 313.3332
```

**13 de 13 EN VERDE después del cambio.**

### 8.4 LA COMPROBACIÓN DE MORDIDA — **DOS mordidas, con su rojo y su restauración**

Se rompió a propósito, se vio el rojo y se restauró.

**MORDIDA 1 — la fórmula a medio escribir se descarta en vez de enseñarse crudo.** Se sustituyó
el tramo `UNTERMINATED` por un `break` seco:

```
✖ a half-written formula shows as raw text and the rest of the paragraph still renders
ℹ tests 16 | pass 15 | fail 1
```

**Muerde, y muerde sobre el caso que el criterio 7 nombra por su nombre.**

**MORDIDA 2 — la previsualización se retira del envoltorio** (queda construida pero sin montar):

```
✖ the preview is mounted inside the wrapper, so it reaches the five prose fields on seven sites
ℹ tests 16 | pass 15 | fail 1
```

**Muerde el test del montaje**, que es el que garantiza que llega a los cinco campos.

**Restauración verificada byte a byte con `diff` y `md5` contra los respaldos previos a las
mordidas: LOS TRES ARCHIVOS IDÉNTICOS (diff vacío).**
`inlineFormulaSegments.js` `52033adc629173b2bc874959bd618e03` ·
`InlineFormulaField.jsx` `03101fe61ff8b902eeb491c5e9ee3d19` ·
`InlineFormulaParagraphPreview.jsx` `5c9e1a6eb914af704632ba448abe8adb`, antes y después.
Los 16 y los 229 vuelven a estar en verde. **Los respaldos vivieron en el scratchpad de sesión,
fuera de los dos repos.**

### 8.5 Lint y build

`eslint .` sobre `editor-ui`: **limpio, sin errores ni avisos.** **Se declara que no lo estuvo
al primer intento:** la primera versión produjo **2 errores y 1 aviso**, todos de este run
—`react-hooks/set-state-in-effect` en dos sitios y `react-hooks/exhaustive-deps` en uno—.
**Se arreglaron adoptando el patrón que `SmartFormulaPreview` ya usa** (diferir el cambio de
estado un frame y arrancar el estado en `LOADING` en vez de moverlo desde el cuerpo del efecto).
**No se silenció ninguna regla y no se añadió ninguna excepción.**

`vite build`: **correcto** (`✓ built in 689ms`), con el aviso preexistente de tamaño de chunk,
que no es de este run. La salida cae en `dist/`, que `.gitignore` ignora.

---

## 9. EL PACKET DE QA

```
projects/cantu-studio/docs/_historical_run_record/RUN-CANTU-INLINE-FORMULA-PREVIEW-001-OPERATOR-QA-PACKET.md
```

Colocado **junto a los otros quince packets**. **`.aiw/docs/docs_index.json` NO se tocó**, que
es lo que el ticket manda; `Docs indexed: 149` no se movió y eso es lo correcto.

**Ocho comprobaciones. Los dos pasos de parada van primero:**

- **Paso 1 (parada)** — el párrafo mixto se compone: prosa como prosa, fórmula compuesta, sin
  `\(` ni `\)` visibles en la caja.
- **Paso 2 (parada)** — **la fórmula a medio escribir**: se teclea `la primera \(x^2\) y la
  segunda \(\frac{1` y **se deja sin cerrar**. Se espera ver la primera fórmula **compuesta** y
  el trozo abierto **crudo**, a la vez. Fallar aquí significa que un LaTeX a medias tumba la
  previsualización entera, que es el fallo más grave posible en este run.
- Pasos 3–8: prosa sin fórmulas (con el precio `$5`), el botón y la previsualización juntos, los
  cinco campos uno a uno más las dos colocaciones en columnas, **los tres campos que NO deben
  tenerla**, el dato guardado tras cerrar y reabrir, y el motor sin conexión.

**Etiquetas de plataforma, DERIVADAS de `blockCatalog.js` y no inventadas** — **se localizaron
las cinco, así que no hay ninguna que declarar como no encontrada**:

| `id` en el catálogo | `label` VERBATIM |
|---|---|
| `web-details` | **Nota desplegable** |
| `web-callout` | **Nota destacada** |
| `web-card` | **Tarjeta** |
| `web-concept-grid` | **Comparador de conceptos** |
| `web-rule` | **Regla matemática** |

*(y `web-narrative` = **Texto**, el campo que deliberadamente NO tiene previsualización.)*

---

## 10. VALIDADOR — SALIDA COMPLETA

Ejecutado por la vía que **no escribe**, desde `projects/cantu-studio`:

```bash
node tools/project-console/validate-project-console-state.mjs
```

**Salida completa, VERBATIM:**

```
Project Console state validation passed.
Roadmap v3 prototype: 7 objectives / 28 phases / 71 runs; queue groups needs_human_decision=0 now=1 ready_next=16 later=25 history=29
Roadmap v3 active run derived stages: RUN-CANTU-INLINE-FORMULA-PREVIEW-001=none
Docs indexed: 149
Docs curated primary-visible: 60 of 149 registered
Component statuses: 16
Git provenance episodes: 9
Git history snapshot: 508 commits / 1 branches (1 visible, 0 backup hidden); current=main; run-associated=3; source=local_git_autosync
Roadmap rebase warnings (non-blocking):
- .aiw/roadmap/roadmap.json run RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 depends on RUN-CANTU-ROADMAP-CONTENT-AUDIT-001, which does not resolve in this roadmap. With a single roadmap loaded this cannot be decided: it may be a legal external dependency — a run that lives in another project (CONTRATO §10.d Regla 2) — or a typo in the run id. Both are possible and one loaded roadmap cannot tell them apart; resolve it against the full set of projects to distinguish external from write error.
```

**Cifras reales leídas de la salida — el ticket no las daba a propósito:**

- **total de runs: 71**
- **`history=29`**
- **`ready_next=16`**
- otros grupos: `needs_human_decision=0`, `now=1`, `later=25`
- 7 objetivos / 28 fases

**Recuento propio sobre `roadmap.json`, independiente:** 71 runs — `completed=29`, `planned=41`,
`active=1`. **`completed=29` casa con `history=29`, y 29+1+16+25 = 71.**

**Deriva contra `REGLAS` §3, declarada:** aquel record midió **70 / `history=28` / `ready_next=15`
/ `later=26`**. Hoy: **71 / 29 / 16 / 25**. La diferencia es coherente: el operador **cerró el run
27** (por eso `history` sube de 28 a 29) y **dio de alta uno nuevo en `queue_order 26`** (por eso
el total sube a 71 y uno pasa de `later` a `ready_next`). **Las cifras previas eran correctas en
su fecha.**

**El aviso no bloqueante de la dependencia externa apareció, es el conocido y legal, no es
hallazgo y NO se reparó** (§11).

---

## 11. CIFRAS DEL TICKET — VERIFICADAS UNA A UNA

| Cifra | Cómo se verificó | Resultado |
|---|---|---|
| **Cinco campos de prosa** | leídos uno a uno en `WebBlockEditor.jsx` y contra los dos esquemas vía los tests del bloqueo | **CONFIRMADA — 5** |
| **Siete sitios** | recuento de `<InlineFormulaField` : `:1162, :1874, :1914, :2468, :2630, :3981, :4076` | **CONFIRMADA — 7** |
| **Ocho colocaciones** | `COLUMN_CHILD_OPTIONS` (8 hijos, sin `details` ni `conceptGrid`) + las **dos** invocaciones de `<CardFields` (`:1933`, `:3962`) | **CONFIRMADA — 8** |
| **Trece tests del run del bloqueo** | recuento de `^test(` **y** ejecución | **CONFIRMADA — 13, y 13 en verde hoy** |
| **Conjunto de delimitadores** | **derivado en runtime** del adaptador y del archivo de los trece tests | **CONFIRMADO — 5 tokens**; el partidor usa **solo el par en línea** |
| **Recuento de la suite** | recuento estático de `^test(` sobre los `.test.mjs` | **36 archivos, 405 declaraciones — RECUENTO ESTÁTICO, NO resultado de ejecución** (§11.1) |
| **Etiquetas de plataforma** | leídas de `blockCatalog.js` por `id` | **CONFIRMADAS, las cinco** (§9) |
| **17 ids `web-*` en el catálogo** | recuento sobre `blockCatalog.js` | **CONFIRMADA — 17.** Sigue sin casar con `Component statuses: 16` del validador, y **no se reparó** |

### 11.1 La suite — lo que afirmo y lo que no

**Recuento estático, ejecutado:** **36** archivos `.test.mjs`, **405** declaraciones `test()` a
principio de línea. Sin `t.test(` (0) ni `describe(` (0): no hay subtests que inflen la cifra.
Casa con el `389 + 16` de este run, y el 389 casaba con el `379 + 10` del anterior.

**NO afirmo «405 en verde».** Eso exigiría correr la suite entera, que el ticket excluye y que
`CLAUDE.md` desaconseja con talleres en paralelo. **Lo ejecutado y verde son 229 tests en 17
archivos** (§8.2).

---

## 12. QUÉ **NO** SE HIZO

**Por prohibición explícita del encargo:**

- **No se añadió ninguna dependencia.** La ruta elegida no la necesita, y hay un test que lo
  fija sobre el manifiesto (§5). **KaTeX no se instaló**; su tamaño se consultó al registro en
  modo solo lectura.
- **No se hizo que el campo mismo renderice matemáticas.** Sigue siendo un `<textarea>` de texto
  plano y el autor sigue viendo ahí su LaTeX literal. **La previsualización va DEBAJO.**
- **No se cambió el formato guardado.** Mismo valor guardado, mismo leído, misma salida
  compilada (§7).
- **No se tocó** el compilador, los renderers ni ninguno de los dos esquemas.
- **No se tocó el control compartido de área de texto.** `TextAreaField.jsx` sigue igual, y hay
  un test de este run que lo fija además del del run anterior.
- **No se abrió ningún campo más de los cinco.** `narrative.text` sigue sin nada, y los modos
  `code` y `persona` de la tarjeta también. **El packet lo comprueba en su paso 6.**
- **No se tocó `WebBlockEditor.jsx`.** Sigue en 4118 líneas.
- **No se tocó** `.aiw/docs/docs_index.json`, `component_status.json`, la Definition of Done,
  los contratos ni la Guía de componentes.
- **No se tocó** el roadmap canónico, `.project/`, ni el status de ningún run. **No se re-emitió
  `.project/`.** No se insertó, movió ni renumeró ningún run. **No se clasificó ninguno.**
- **No se ejecutó Git. No se levantó ningún servidor. No se corrió la suite completa.**
- **No se revalidó ningún componente.**
- **No se tocó deshacer y rehacer**, que tienen su propio run —`RUN-CANTU-EDITOR-UNDO-REDO-001`,
  `queue_order 29`—.

**Por decisión de alcance, con su porqué:**

- **No se reconocen las fórmulas de BLOQUE** `\[…\]` ni `$$…$$` (§3.4). Componerlas dentro de un
  párrafo es una decisión de producto. **Se ven crudas, que es una conducta correcta y
  declarada, no un fallo.**
- **No se creó ningún registro de «qué campo tiene previsualización».** No hacía falta: va donde
  va el envoltorio, y un test lo cuenta.
- **No se tocó `SmartFormulaPreview.jsx`.** Se reusa lo que carga, no se modifica.
- **La carcasa huérfana `FormulaInserterShell.jsx` sigue con 0 importadores y no se tocó.**

**Por límite de la medición, declarado:**

- **No se ejecutó la interfaz.** Todo §3 es lectura de código y ejecución en Node. **No se abrió
  el editor en un navegador**, así que **no afirmo nada sobre lo que se ve en pantalla**: eso es
  exactamente lo que el packet existe para comprobar.
- **No se ejecutó React ni MathLive en ningún test** (§8.1).
- **NO SE MIDIÓ si un `reset` del formulario deja la copia de lectura desfasada.** El efecto que
  la sincroniza cubre el montaje y cada pulsación; un `reset` que reescriba el `<textarea>` sin
  remontar el componente **podría** dejarla atrás hasta la siguiente tecla. **No lo medí, así que
  no afirmo que no ocurra**: está declarado en el código y **es el paso 7 del packet**. No
  corrompe el dato en ningún caso.
- **La ruta B se descartó con una medición del operador, no con una mía** (§4). Que MathLive
  componga la prosa como matemáticas está medido en `REGLAS` §0 y no se remidió en vivo.
- **La suite es un recuento estático** (§11.1), no un resultado de ejecución.

**No se reparó ninguna deriva conocida:** ni el mojibake de los dos esquemas, ni los punteros
muertos, ni el CLI local de roadmap, ni los HTML huérfanos, ni el anidamiento de fórmulas del
insertor, ni la lección de `src/content/lecciones/` que no carga, ni los defectos sin dueño de
los componentes ya revalidados, ni el aviso de dependencia externa del validador, ni la
discrepancia de `Component statuses: 16` contra los 17 ids del catálogo, ni el
`replacementText: '\\\\frac{}{}'` doblemente escapado de `formulaInserter.actions.js:430` que
los dos records anteriores dejaron nombrado.

---

## 13. STATUS DEL RUN — DECLARADO, NO CAMBIADO

**El run queda en `active`. Este taller NO lo cambia.** Lo cierra el operador desde la consola
global, que es el punto de serialización y la que re-emite `.project/` de forma atómica.

**Status al que debe pasar: `completed`.**

**Qué falta para llegar ahí — solo la QA visual del operador:**

1. **Ejecutar el packet** de §9. Ocho comprobaciones; **las dos de parada van primero**, y la
   segunda es la que este run existe para garantizar: **una fórmula a medio escribir no deja la
   previsualización en blanco.**
2. **Contestar el paso 7**, que es el único límite de medición que este taller no pudo cerrar: si
   la caja aparece poblada al reabrir una lección guardada, o si espera a la primera pulsación.
3. **Decidir si las fórmulas de bloque deben componerse también** (§3.4). **No hace falta
   decidirlo para cerrar este run**: está fuera de alcance por escrito y su conducta actual
   —verse crudas— es correcta y está fijada.
4. **Cerrar el run desde la consola global.**

**No hay trabajo técnico pendiente dentro del alcance de este run.** La previsualización está en
los cinco campos por la vía del envoltorio, la prosa se ve como prosa y las fórmulas compuestas,
un tramo roto no puede tumbar el resto, el dato no cambia, los trece del bloqueo y los
veintiséis del insertor siguen verdes, y los dieciséis nuevos muerden.

**Lo que queda FUERA y no bloquea este cierre:** que el campo mismo renderice matemáticas;
las fórmulas de bloque dentro de un párrafo; `narrative.text`; deshacer y rehacer, que tienen su
run en `queue_order 29`; y la carcasa huérfana, cuya retirada sigue sin dueño.
