# MONTAJE DEL INSERTOR DE FÓRMULA — PARADA MEDIDA (cantu-studio)

**Fecha:** 2026-08-04
**Run:** `RUN-CANTU-INLINE-FORMULA-INSERTER-MOUNT-001` — **derivado, no tecleado** (§1).
**Repo escrito:** `projects/cantu-studio` — **NINGUNO. Cero bytes.**
**Repo escrito:** `projects/aiw-console` — **este record, y es el único archivo escrito.**
**Veredicto:** **PARADA POR COMPUERTA.** Dos de las tres compuertas del criterio 1 se
disparan. **La decisión es del operador** (§11).

---

## 1. EL RUN, DERIVADO DEL CANÓNICO

Recorrido de `projects/cantu-studio/.aiw/roadmap/roadmap.json`
(`schema_version = jame.roadmap_v3.v0.2-progress`), buscando `queue_order === 27`.
**Una sola coincidencia sobre 69 runs.**

| Campo | Valor derivado |
|---|---|
| `run_id` | **`RUN-CANTU-INLINE-FORMULA-INSERTER-MOUNT-001`** |
| ubicación | `objectives[1].phases[5].runs[0]` |
| `queue_order` | 27 |
| `status` | `active` |
| `depends_on` | `RUN-CANTU-INLINE-FORMULA-BEHAVIOUR-LOCK-001` — `queue_order 25`, **`status=completed`**: la dependencia está satisfecha |

**Título en disco, VERBATIM:**

```
Mount the formula inserter so an author can place a formula at the cursor inside prose
```

**Casa carácter a carácter con el objetivo del ticket. No hay parada por este motivo.**

El validador lo confirma de forma independiente:
`Roadmap v3 active run derived stages: RUN-CANTU-INLINE-FORMULA-INSERTER-MOUNT-001=none` (§9).

### 1.1 La frase del propio run que manda parar

El `full_description` se leyó íntegro antes de empezar. **Contiene su propia condición de
parada, VERBATIM:**

> `If mounting turns out to require rewriting the shell, changing the stored format, or a`
> `rich text editor, STOP and return options with measured cost rather than building the`
> `larger thing.`

**La medición demuestra que montar exige reescribir la carcasa.** Por tanto la parada no
es una lectura conservadora del ticket: es la instrucción literal del run.

### 1.2 Dónde el run y el disco discrepan — gana el disco, y se declara

El `full_description` afirma, VERBATIM:

> `its action evaluators — which decide what to insert given a cursor position and a`
> `selection — are already wired and covered by tests. The missing piece is the wiring`
> `between them and a prose field.`

**Medido: los evaluadores no deciden «qué insertar». Deciden UNA sola cosa —si un token
se convierte en fracción— y el texto que insertan es un literal fijo en el código, no un
parámetro.** Detalle con archivo y línea en §3.2. **El run manda («gana el run») en lo que
decide; pero un hecho de disco no se puede obedecer: se declara.** El propio run lo
anticipa en su última frase: *«Every count referenced anywhere for this work is a dated
measurement and is to be verified against disk.»*

---

## 2. LA PARADA, PRIMERO Y SIN DILUIR

El criterio 1 del ticket manda parar si se cumple **cualquiera** de tres condiciones.
**Se cumplen dos.**

| # | Compuerta del criterio 1 | Veredicto medido |
|---|---|---|
| A | «la carcasa no es montable sin reescribirla» | **DISPARADA** (§3.1) |
| B | «los evaluadores no cubren la inserción en un campo de texto plano» | **DISPARADA** (§3.2) |
| C | «el editor visual no se puede abrir fuera del componente de regla» | **NO disparada** — sí se puede (§3.3) |

**En resumen, en una frase:** el editor visual está listo para reutilizarse, pero **entre
él y un campo de prosa no hay ninguna pieza**: la carcasa es un segundo editor de LaTeX
con su propio `<textarea>` que nunca abre ese modal, y los evaluadores solo saben
convertir un token en `\frac{}{}` dentro de una expresión LaTeX. **Lo que falta no es
cableado: son piezas que no existen.**

**No se escribió ni una línea de producción, ni un test, ni un packet.** §12.

---

## 3. LA MEDICIÓN DEL CRITERIO 1, COMPLETA

Todo lo de este apartado está **verificado sobre disco en esta sesión**, no heredado de
`BARRIDO-DIAGNOSTICO-FORMULA-EN-LINEA-CANTU.md` ni de
`BLOQUEO-CONDUCTA-FORMULA-EN-LINEA-CANTU.md`, que se leyeron íntegros antes de empezar.

### 3.1 LA CARCASA DEL INSERTOR — compuerta A, **DISPARADA**

**Pieza:**
`tools/author-lite/editor-ui/src/features/math-authoring/formulaInserter/FormulaInserterShell.jsx`,
**164 líneas**.

**Qué exporta** — tres exports, verificados leyendo el archivo:

| Export | Línea | Qué es |
|---|---|---|
| `export default FormulaInserterShell` | `:161` | el componente |
| `export { FORMULA_INSERTION_HINTS }` | `:162` | **reexport** de `formulaInserter.types.js` |
| `export { FormulaInserterShell }` | `:163` | el mismo componente, con nombre |

**Qué props espera** — once, `:45-57`, VERBATIM:

```jsx
const FormulaInserterShell = ({
  value, onValueChange, onMathNodeChange, onBlur,
  mode = 'inline', disabled = false, readOnly = false,
  placeholder = 'a^2 + b^2 = c^2', error, className = '', helperText = '',
}) => {
```

**Ninguna de las once es un `ref` externo, un offset de cursor, un campo destino, ni un
callback que lleve un rango.** `mode` por defecto ya es `'inline'`.

**De qué depende** — cuatro imports, `:1-4`, todos hermanos del propio paquete:
`react`, `./formulaInserter.types.js`, `./formulaInserter.actions.js`,
`./formulaInserter.controller.js`. **Cero dependencias externas nuevas.**

**Cuántos importadores tiene hoy — MEDIDO: CERO.**
Barrido de `tools/` y `src/` completos (sin `node_modules`) por el identificador
`FormulaInserterShell`, sobre `.js`, `.jsx`, `.mjs`, `.json` y `.md`. **Cuatro resultados
en total, y ni uno es un importador:**

```
tools/author-lite/editor-ui/.../FormulaInserterShell.jsx:45    su definición
tools/author-lite/editor-ui/.../FormulaInserterShell.jsx:161   su export default
tools/author-lite/editor-ui/.../FormulaInserterShell.jsx:163   su export con nombre
tools/author-lite/compiler-api/tests/webRuleSmartFormulaFieldRulePilot.test.mjs:259
```

La única mención externa es una **aserción negativa**, VERBATIM:

```js
assert.doesNotMatch(ruleMathFieldSource, /FormulaInserterShell|Insert fraction|Shortcuts:|\bInsert\b|Background|Fondo/u);
```

**La cifra del ticket se confirma: 0 importadores, sobre 56 archivos `.jsx` del editor**
(108 archivos `.js`+`.jsx` en `editor-ui/src`). Tampoco la reexporta
`math-authoring/index.js` — que sí reexporta a **todos** sus hermanos no visuales: los dos
evaluadores, los tres símbolos de `types` y los tres del `controller`. **La carcasa es la
única pieza del paquete que el índice no publica.**

#### Por qué la compuerta A se dispara

**La forma que el operador escribió en el run:** *«un control junto al campo de prosa abre
el MISMO editor visual que ya usa el componente de regla matemática, y al aceptar escribe
la fórmula delimitada en la posición del cursor»*.

**Lo que la carcasa es hoy, medido línea a línea:**

| Propiedad estructural | Estado en disco | ¿Sirve a la forma del run? |
|---|---|---|
| Es dueña de su propio `<textarea>` (`:141-154`), `value={inputValue}` | sí | **NO** — el run pide un control junto al campo, no un segundo campo |
| Lo que ese textarea contiene | **LaTeX pelado**, vía `controller.resolveFormulaInserterText(value)` (`:61`) | **NO** — el campo de prosa contiene prosa |
| Abre el editor visual | **NO.** No importa `SmartFormulaModal`, no tiene prop para abrirlo, no hay estado de modal | **NO** |
| Su único botón | `Insert fraction` (`:24`), que llama a `evaluateFormulaButtonAction` sobre **su propio** textarea (`:123-137`) | **NO** |
| Qué escribe al aceptar | `onValueChange(result.latexResult)` (`:78`) — **la cadena entera**, sustituyendo todo el valor | **NO** — el run pide escribir **en la posición del cursor** sin borrar lo de alrededor |
| Su lectura de cursor | `target.selectionStart/selectionEnd` **de su propio textarea** (`:96-97`, `:128-134`) | **NO** — necesita el cursor del campo ajeno |

**Montarla verbatim junto a un campo de prosa produce esto:** un segundo `<textarea>`
monoespaciado, más un botón que inserta `\frac{}{}` **en ese segundo textarea**. **Nada
llega al campo de prosa.** Para obtener la forma del run hay que cambiar seis de sus seis
propiedades estructurales. **Eso es reescribirla, y es exactamente el supuesto que el
`full_description` manda parar.**

### 3.2 LOS EVALUADORES DE ACCIÓN — compuerta B, **DISPARADA**

**Pieza:** `formulaInserter.actions.js`, **439 líneas**.

**Qué exponen — dos funciones, y nada más.** Verificado leyendo el archivo entero:

| Export | Línea | Firma |
|---|---|---|
| `evaluateFormulaSlashAction` | `:346` | `{latex, cursorStart, cursorEnd, selectionStart, selectionEnd, selectionText}` |
| `evaluateFormulaButtonAction` | `:373` | `{latex, latexBefore, cursorStart, selectionStart, selectionEnd, selectionText}` |
| `export { FORMULA_INSERT_ACTIONS, FORMULA_INSERTION_HINTS }` | `:435` | reexport de `types` |

**El empalme genérico existe pero NO está exportado.** `withReplacement(text, start, end,
replacementText)` vive en `:30-32` y es **privada del módulo**. Es la única función del
repo que hace `slice + inserto + slice`, y **no se puede llamar desde fuera**.

#### Qué deciden de verdad — medido, no supuesto

| Caso | Qué hacen | Línea |
|---|---|---|
| Botón, **sin selección** | `` `${candidate.slice(0,cursor)}\\frac{}{}${candidate.slice(cursor)}` `` | **`:420`** |
| Botón, **con selección** | si `isSafeToken(sel)` → `\frac{sel}{}`; **si no → `complexNoOp`, no hace nada** | `:393-418` |
| Barra `/`, sin selección | busca el token final y lo convierte en `\frac{token}{}`; si no es seguro, no hace nada | `:311-343` |
| Barra `/`, con selección | igual, sobre lo seleccionado | `:272-301` |
| **Guardia previa, siempre** | `hasMalformedLaTeX(valor entero)` → bloquea; en la vía de barra, además `findDangerousTextPattern(valor entero)` | `:264-270`, `:389` |

**Las tres razones por las que no cubren la inserción en un campo de texto plano:**

1. **El texto a insertar es un literal, no un parámetro.** `:420` inserta la cadena
   `\frac{}{}` escrita a mano en el código. **No hay ningún argumento por el que pedirles
   que inserten `\(x^2\)` ni ninguna otra cosa.** La firma no lo admite y el cuerpo no lo
   contempla.
2. **Su regla de selección, aplicada a prosa, destruye prosa.** `isSafeToken` (`:8-12`,
   `:166-171`) acepta exactamente tres formas: `^\d+$`, `^[a-zA-Z]+$` y
   `^\([^()\\{}]*\)$`. Seleccionar la palabra `mitad` en un párrafo pasa el filtro **y la
   sustituye por `\frac{mitad}{}`**. Seleccionar `la mitad` no pasa (lleva espacio) y
   **no hace nada**. Ninguno de los dos resultados es «insertar una fórmula delimitada».
3. **Su guardia previa mide el campo entero como si fuera LaTeX.**
   `hasMalformedLaTeX` (`:39-51`) cuenta llaves, paréntesis y corchetes de **todo el
   valor** y bloquea si no casan. Un párrafo castellano con un paréntesis sin cerrar
   —`«el resultado (ver figura 2»`— **bloquea la inserción entera**. Es correcto para una
   expresión LaTeX y es un falso positivo para prosa.

#### Qué tests los cubren

**`compiler-api/tests/mathAuthoringFormulaInserter.test.mjs` — 5 declaraciones `test()`.**
Títulos VERBATIM:

```
evaluateFormulaSlashAction converts safe simple trailing-token cases to fraction
evaluateFormulaSlashAction converts selection + slash when token is safe
evaluateFormulaSlashAction blocks complex contexts and recommends explicit selection
evaluateFormulaSlashAction blocks malformed or unsafe payloads by default
evaluateFormulaButtonAction inserts empty and selected fractions conservatively
```

**Los cinco afirman la fracción dentro de LaTeX. Ninguno afirma prosa, ningún delimitador
`\( \)`, ningún campo de texto plano.** Es cobertura real y buena — **de otra cosa**.

**Conclusión de la compuerta B:** el criterio 4 del ticket dice *«Con selección activa,
sigue lo que los evaluadores existentes ya decidan; no inventes una regla nueva: mide la
suya y respétala»*. **Medida su regla, respetarla y cumplir el criterio 4 son
incompatibles**: su regla es «convierte el token seleccionado en fracción», no «inserta
una fórmula delimitada». **Esa contradicción es justo lo que la compuerta existe para
detectar.**

### 3.3 EL EDITOR VISUAL DE LA REGLA — compuerta C, **NO disparada**

**Pieza:** `smartFormulaField/SmartFormulaModal.jsx`, **247 líneas**.

**Dónde se monta hoy — un solo sitio:**
`editor/components/web/WebBlockEditor.jsx:691`, dentro de `RuleMathControl` (`:545-703`),
que a su vez lo envuelve `RuleMathField` (`:705-713`) con un `Controller` de React Hook
Form. El botón que lo abre está en `:649-661` (icono `Sigma` + etiqueta
`Insertar fórmula` / `Editar fórmula`), y el estado es un `useState` local, `:546`.

**Qué recibe** — siete props, `:10-18`:

| Prop | Papel |
|---|---|
| `isOpen` | abre/cierra |
| `mode` | `MATH_NODE_MODES.BLOCK` en la regla; el modal acepta `INLINE` y es su rama normalizada por defecto (`:19`) |
| `value` | valor actual (cadena, mathNode o mathBlockGroup — `resolveSmartFormulaInitialLines`, `:21`) |
| `title` | etiqueta de la acción |
| `onCancel` / `onConfirm` | los dos callbacks |
| `colorPalette` | opcional, `null` por defecto |

**Qué devuelve:** `onConfirm(pendingOutput)` (`:117`), donde `pendingOutput` es la salida
de `createSmartFormulaBlockGroupOutput(lines, {mode})` — un objeto `{ok, mathNode |
mathBlockGroup, errors, …}`. **No devuelve una cadena delimitada.**

**Veredicto: SE PUEDE ABRIR FUERA DEL COMPONENTE DE REGLA.** Ninguna de sus siete props
es específica de la regla; no importa nada de `rule`; es un overlay `fixed` autónomo.
**La compuerta C no se dispara y el criterio 3 —«no se escribe un editor nuevo»— es
satisfacible.** Esta es la buena noticia de la medición.

**Pero falta la pieza de salida, y no existe:** para llevar lo aceptado a un campo de
prosa hace falta convertir ese objeto en `\(latex\)`. **En todo `editor-ui/src` no hay
ninguna función que EMITA los delimitadores `\(` y `\)`.** Lo único que existe es su
opuesto: `ADVANCED_OUTER_WRAPPERS` en `smartFormulaFieldAdapter.js:132-136`, que **los
quita**. Las otras dos apariciones del par en el editor son textos de ayuda que dicen al
autor que **no** los use (`WebBlockEditor.jsx:3048`, `blockCatalog.js:923`).

### 3.4 LOS PUNTOS DE MONTAJE REALES

**Todos en un solo archivo: `editor/components/web/WebBlockEditor.jsx` (4082 líneas).**
Medidos leyendo cada rama, no por conteo de texto.

| # | Campo | Colocación | Archivo:línea | Componente contenedor | Control |
|---|---|---|---|---|---|
| 1 | `details.items[].content` | primer nivel | `WebBlockEditor.jsx:2442` | `DetailsFields` (invocado en `:4053`) | `TextAreaField` |
| 2 | `callout.content` | primer nivel | `WebBlockEditor.jsx:3949` | rama `field.kind === 'callout'` (`:3941`) | `TextAreaField` |
| 3 | `callout.content` | **hijo de columnas** | `WebBlockEditor.jsx:1853` | `ColumnChildFields`, rama `:1836` | **`<textarea>` nativo en línea** |
| 4 | `card(normal).content` | primer nivel **y** hijo de columnas | `WebBlockEditor.jsx:1153` | `CardFields` → helper local `renderTextArea` (`:1135-1143`), invocado en `:3929` y `:1903` | **`<textarea>` nativo en línea** |
| 5 | `conceptGrid.items[].content` | primer nivel | `WebBlockEditor.jsx:2602` | `ConceptGridFields` (invocado en `:4057`) | `TextAreaField` |
| 6 | `rule.description` | primer nivel | `WebBlockEditor.jsx:4044` | rama `field.kind === 'rule'` (`:4025`) | `TextAreaField` |
| 7 | `rule.description` | **hijo de columnas** | `WebBlockEditor.jsx:1891` | `ColumnChildFields`, rama `:1873` | **`<textarea>` nativo en línea** |

**Cuentas exactas: 7 sitios de código, 8 colocaciones visibles para el autor.**
La diferencia es la tarjeta: `CardFields` es **un solo sitio de código** que sirve **dos
colocaciones** (primer nivel y columna) mediante la prop `isColumn`.

Colocaciones por campo: **details 1 · callout 2 · card 2 · conceptGrid 1 · rule 2 = 8.**

**Por qué `details` y `conceptGrid` no tienen colocación en columna — medido, no supuesto.**
`COLUMN_CHILD_OPTIONS` (`WebBlockEditor.jsx:253-262`) declara **ocho** hijos posibles:
`header, list, iconList, rule, card, callout, narrative, table`. **`details` y
`conceptGrid` no están.** `ColumnChildFields` (`:1749`) tampoco tiene rama para ellos: sus
ramas son `header:1750`, `list:1793`, `callout:1836`, `iconList:1864`, `rule:1873`,
`card:1903`, `narrative:1918`, `split:1943`, `table:1955`.

### 3.5 ¿CONTROL PROPIO DEL REPO O ELEMENTO NATIVO? — **las dos cosas, y eso es coste**

| Forma | Sitios | Cuáles |
|---|---|---|
| `TextAreaField` (control del repo, **31 líneas**) | **4 de 7** | details `:2442`, conceptGrid `:2602`, callout primer nivel `:3949`, rule primer nivel `:4044` |
| `<textarea>` nativo escrito en línea con `{...register(...)}` | **3 de 7** | callout columna `:1853`, rule columna `:1891`, card `:1153` |

**En los siete el elemento final es un `<textarea>` nativo registrado por React Hook
Form.** Es decir: **sí se puede insertar en el cursor** —`selectionStart`/`selectionEnd`
son propiedades del elemento nativo—, **pero hoy nadie los lee y nadie tiene el `ref`.**

Lo que falta, verificado en disco:

- **`TextAreaField.jsx` (31 líneas) no expone ningún `ref`.** Hace `{...registerProps}`
  sobre el `<textarea>` (`:17-22`) y punto. El `ref` que llega es el de React Hook Form;
  añadir otro exige fusionarlos.
- **No hay captura de selección en ninguna superficie del editor.** Barrido de
  `onSelect` y `selectionStart` sobre todos los `.jsx` de `features/editor`: **cero
  ocurrencias** sobre campos de texto. Los `onSelect` que aparecen son callbacks de
  selección de lección y de bloque (`LessonExplorerModal`, `ComponentPalette`,
  `SlideBlockEditor`), sin relación.
- **No hay ningún registro de qué campo admite fórmula.** Barrido de
  `FORMULA_CAPABLE|formulaEnabled|allowFormula|mathEnabled|FORMULA_FIELDS` sobre todo
  `editor-ui/src`: **cero ocurrencias.**

**Consecuencia práctica medida:** al pulsar un botón junto al campo, el `<textarea>`
pierde el foco y **la posición del cursor se pierde**, porque nadie la ha guardado. Sin
esa captura, «insertar en el cursor» no tiene dónde insertar.

### 3.6 LA PREVISUALIZACIÓN DEL CRITERIO 5 — no hay ninguna reutilizable

El criterio 5 dice: *«Si resulta que ya existe una previsualización reutilizable, úsala y
dilo; no escribas una segunda.»* **Medido: no existe.**

| Candidata | Qué hace de verdad | ¿Sirve? |
|---|---|---|
| `SmartFormulaPreview.jsx` (98 líneas) | monta un `math-field` de MathLive con **una fórmula**, vía `resolveSmartFormulaRenderLatex` | **NO** — renderiza una fórmula, no un párrafo de prosa con fórmula dentro |
| `WebPreviewPanel` / `RealPreviewPanel` | previsualización **de la lección entera**, servida por `compiler-api` (`previewRenderer`) | **NO** — no es «bajo el campo» ni es por campo |

**Y hay un dato que decide el coste:** `editor-ui/package.json` declara `mathlive`
(`0.110.0`) **y no declara `katex`**. Comprobado en disco: `editor-ui/node_modules/katex`
**AUSENTE**, `compiler-api/node_modules/katex` **AUSENTE**,
`editor-ui/node_modules/mathlive` **PRESENTE**. En Web y en la previsualización, KaTeX
llega **por CDN**, no por el bundle del editor.

Por tanto la previsualización del criterio 5 solo tiene dos caminos: **(a)** un módulo
partidor que separe `[texto, fórmula, texto…]` y monte MathLive por tramo —**el partidor
no existe**—, o **(b)** añadir KaTeX al editor, que el propio ticket prohíbe
(*«Cualquier dependencia nueva»* está en Out of scope). **Las dos son trabajo nuevo, no
reutilización.**

### 3.7 EL DISPARADOR CON BARRA — nombrado y fuera

El criterio 6 lo admite *«solo si la medición muestra que los evaluadores existentes ya lo
cubren»*. **Medido: no lo cubren.** `evaluateFormulaSlashAction` reacciona a `/` para
convertir el token anterior en fracción **dentro de una expresión LaTeX**; no abre ningún
editor visual, no emite delimitadores y su guardia bloquea prosa con paréntesis
desemparejados. **En un campo de prosa, `/` es un carácter normal** (fechas, «y/o», rutas).
**Se nombra y se deja fuera.**

---

## 4. LOS CINCO CAMPOS — DERIVADOS DEL DISCO

El `full_description` del run 27 **no los enumera**: dice *«WHICH PROSE FIELDS GET THE
CONTROL, which is the set the operator selected»*. La enumeración se derivó de dos fuentes
de disco, y **coinciden**:

1. **El `full_description` del run 25** (`status=completed`), en el mismo canónico:
   *«for the five prose fields the operator selected»*, y explícitamente
   *«The prose field of the narrative component is NOT in this first set»*.
2. **El archivo de tests que ese run dejó en el repo**,
   `compiler-api/tests/webInlineFormulaProseBehaviourLock.test.mjs:35-39`, que los declara
   uno a uno junto a su símbolo de esquema.

| # | Campo | Símbolo de esquema | Bloque | **Etiqueta de plataforma** (derivada de `blockCatalog.js`) |
|---|---|---|---|---|
| 1 | `details.items[].content` | `DetailsItemSchema.content` | `web-details` (`:597`) | **Nota desplegable** (`:598`) |
| 2 | `callout.content` | `WebCalloutSchema.content` | `web-callout` (`:188`) | **Nota destacada** (`:189`) |
| 3 | `card(normal).content` | `WebCardShape.content` + `refineWebCard` | `web-card` (`:164`) | **Tarjeta** (`:165`) |
| 4 | `conceptGrid.items[].content` | `ConceptGridItemSchema.content` | `web-concept-grid` (`:814`) | **Comparador de conceptos** (`:815`) |
| 5 | `rule.description` | `WebRuleSchema.description` | `web-rule` (`:547`) | **Regla matemática** (`:548`) |

**Las cinco etiquetas se encontraron en el catálogo. Ninguna se inventó.** El contenedor de
las colocaciones en columna es `web-columns` (`:946`) → **Dos columnas** (`:947`).

**`narrative.text` queda FUERA por decisión escrita** en el `full_description` del run 25.
**No me parece incoherente y lo digo:** su propio run de revalidación
(`RUN-JAME-WEB-NARRATIVE-REPAIR-001`) estaba abierto cuando se decidió, y meterlo habría
cruzado dos talleres sobre el mismo archivo, que es justo lo que la regla 7 de `CLAUDE.md`
prohíbe. **No se incluyó y no se tocó.**

---

## 5. EL DIFF CONCEPTUAL

**No hay diff. Cero archivos escritos en `projects/cantu-studio`.**

Lo que se habría tocado si la parada no se hubiera disparado, con su coste medido, está en
§11 como opciones. **No se tocó nada de eso.**

| Archivo que el trabajo habría tocado | Líneas hoy | Estado |
|---|---|---|
| `formulaInserter/FormulaInserterShell.jsx` | 164 | **intacto** |
| `editor/components/common/TextAreaField.jsx` | 31 | **intacto** |
| `editor/components/web/WebBlockEditor.jsx` | 4082 | **intacto** |
| `math-authoring/index.js` | 96 | **intacto** |
| módulo de empalme + delimitadores | **0 — no existe** | **no se creó** |

---

## 6. CRITERIO 7 — EL DATO NO CAMBIA

**Verificación antes y después: son el mismo estado, porque no hubo cambio de producción.**
El criterio 7 se cumple por construcción, y aun así se ejecutó la comprobación en vez de
darla por buena.

**Los trece tests que el run anterior escribió: 13 de 13 EN VERDE, hoy, ejecutados.**
Salida completa en §7.1. **Ninguno se puso rojo. No hay nada que reportar por este motivo.**

Mismo valor guardado, mismo valor leído, misma salida compilada, mismo HTML: los tests 1–6
del archivo del run anterior afirman exactamente esas cuatro cosas sobre los cinco campos,
y siguen verdes sin tocarlos.

---

## 7. TESTS

**No se escribió ningún test nuevo.** El criterio 8 pide tests **del control montado**; el
control no se montó, así que no hay nada que afirmar. **Escribir un test de algo que no
existe sería inventar la conducta, no fijarla.**

**Por la misma razón no hay comprobación de mordida.** Los dos runs anteriores rompieron a
propósito un test nuevo, vieron el rojo y restauraron. **Aquí no hay test nuevo que
morder, y no se simuló ninguna.** Se declara en vez de disfrazarlo.

**Lo que sí se ejecutó**, para verificar que la precondición del run sigue en pie y que
nada verde se puso rojo.

### 7.1 Los trece del run anterior

```bash
node --test tools/author-lite/compiler-api/tests/webInlineFormulaProseBehaviourLock.test.mjs
```

```
✔ the five prose fields store a delimited inline formula unchanged in every compiler-api gate (10.2027ms)
✔ the five prose fields store a delimited inline formula unchanged in the editor-ui schema (10.8446ms)
✔ the compiler emits the delimited inline formula unchanged for the five prose fields (3.8105ms)
✔ the formula already published in details.items[].content compiles unchanged (0.6263ms)
✔ the delimited formula reaches the generated web HTML where the global math pass can see it (19.9257ms)
✔ the preview path carries the delimited formula with the same single global math pass (20.0094ms)
✔ prose with no delimited formula is left untouched in the five fields (6.8837ms)
✔ the untouched claim is bounded: four of the five fields turn a newline into <br /> (1.6666ms)
✔ no guard of the five fields rejects any character a formula needs, in either schema (7.4283ms)
✔ backslash, dollar, braces, parentheses and underscore reach the HTML untouched (37.1779ms)
✔ ampersand, angle brackets and apostrophe are HTML-escaped, and that is the only change (3.1827ms)
✔ the Moodle output carries the formula literally and carries no math engine of its own (6.4663ms)
✔ the five prose fields never travel the Slides delimiter set (0.4873ms)
ℹ tests 13
ℹ suites 0
ℹ pass 13
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 347.4602
```

### 7.2 Los directamente relacionados

**NO se corrió la suite completa.** Los 9 archivos que sí se corrieron son los de las
piezas medidas —el insertor, el campo inteligente, el piloto de la regla— más los de los
componentes de los cinco campos.

```bash
node --test \
  tools/author-lite/compiler-api/tests/webInlineFormulaProseBehaviourLock.test.mjs \
  tools/author-lite/compiler-api/tests/mathAuthoringFormulaInserter.test.mjs \
  tools/author-lite/compiler-api/tests/mathAuthoringSmartFormulaField.test.mjs \
  tools/author-lite/compiler-api/tests/webRuleSmartFormulaFieldRulePilot.test.mjs \
  tools/author-lite/compiler-api/tests/webRuleMathAuthoringIntegration.test.mjs \
  tools/author-lite/compiler-api/tests/webTheoryCardsRuleBoxesParitySafety.test.mjs \
  tools/author-lite/compiler-api/tests/webConceptGridSafety.test.mjs \
  tools/author-lite/compiler-api/tests/webTheoryTextBlocksSafety.test.mjs \
  tools/author-lite/compiler-api/tests/webColumnsChildExpansionSafety.test.mjs
```

```
ℹ tests 128
ℹ suites 0
ℹ pass 128
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 666.9138
```

**128 de 128 en verde. Nada verde se puso rojo.**

---

## 8. EL PACKET DE QA — NO SE PRODUJO, Y POR QUÉ

**No se escribió ningún packet.** No hay control montado, luego no hay nada que el
operador pueda abrir, pulsar ni ver. **Un packet de QA sobre trabajo no hecho sería
fabricar evidencia.**

**Ruta donde iría, junto a los trece packets existentes:**
`projects/cantu-studio/docs/_historical_run_record/RUN-CANTU-INLINE-FORMULA-INSERTER-MOUNT-001-OPERATOR-QA-PACKET.md`
— **no creada.**

**Lo que sí se entrega por adelantado, porque está medido y el packet lo necesitará:** las
cinco etiquetas de plataforma derivadas del catálogo de bloques, en §4. **Las cinco se
encontraron; ninguna se inventó.**

**`.aiw/docs/docs_index.json` no se tocó.**

---

## 9. VALIDADOR — SALIDA COMPLETA

Ejecutado por la vía que **no escribe**, desde `projects/cantu-studio`:

```bash
node tools/project-console/validate-project-console-state.mjs
```

**Salida completa, VERBATIM:**

```
Project Console state validation passed.
Roadmap v3 prototype: 7 objectives / 28 phases / 69 runs; queue groups needs_human_decision=0 now=1 ready_next=15 later=25 history=28
Roadmap v3 active run derived stages: RUN-CANTU-INLINE-FORMULA-INSERTER-MOUNT-001=none
Docs indexed: 149
Docs curated primary-visible: 60 of 149 registered
Component statuses: 16
Git provenance episodes: 9
Git history snapshot: 508 commits / 1 branches (1 visible, 0 backup hidden); current=main; run-associated=3; source=local_git_autosync
Roadmap rebase warnings (non-blocking):
- .aiw/roadmap/roadmap.json run RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 depends on RUN-CANTU-ROADMAP-CONTENT-AUDIT-001, which does not resolve in this roadmap. With a single roadmap loaded this cannot be decided: it may be a legal external dependency — a run that lives in another project (CONTRATO §10.d Regla 2) — or a typo in the run id. Both are possible and one loaded roadmap cannot tell them apart; resolve it against the full set of projects to distinguish external from write error.
```

**Cifras reales leídas de la salida — el ticket no las daba a propósito:**

- **total de runs: 69**
- **`history=28`**
- **`ready_next=15`**
- otros grupos: `needs_human_decision=0`, `now=1`, `later=25`
- 7 objetivos / 28 fases

**Recuento propio sobre `roadmap.json`, independiente:** 69 runs — `completed=28`,
`planned=40`, `active=1`. **`completed=28` casa con `history=28`.**

**El aviso no bloqueante de la dependencia externa apareció, y es el conocido y legal. No
es hallazgo. No se reparó** (§12).

**Deriva contra el record anterior, declarada:** `BLOQUEO` §9 midió, el mismo día,
`history=26 / ready_next=16 / later=26`. Hoy: **28 / 15 / 25**, con los mismos 69 runs.
**Dos runs pasaron a `completed` entre las dos mediciones.** La cifra previa era correcta
en su momento; **por eso el ticket manda medirlas y no heredarlas.**

---

## 10. CIFRAS DEL TICKET — VERIFICADAS UNA A UNA

| Cifra del ticket | Cómo se verificó | Resultado |
|---|---|---|
| **Cero importadores de la carcasa** | barrido completo de `tools/` y `src/` por `FormulaInserterShell`, 4 resultados leídos uno a uno | **CONFIRMADA — 0**, sobre 56 `.jsx` |
| **Trece tests del run anterior** | `grep -c '^test('` + ejecución real | **CONFIRMADA — 13, y 13 en verde hoy** |
| **16 componentes** | tres recuentos distintos, y **no dan lo mismo** | **MATIZADA — ver §10.1** |
| **Recuento de la suite del compilador** | recuento estático de `^test(` sobre los 33 archivos | **363 declaraciones en 33 archivos — RECUENTO ESTÁTICO, NO resultado de ejecución** |

### 10.1 El «16» — tres medidas, dos coinciden y una no

| Fuente | Cifra | Contenido |
|---|---|---|
| `.aiw/state/component_status.json` → `components[]` | **16** | header, list, iconList, card, video, narrative, callout, details, rule, table, conceptGrid, split, arithmetic, hierarchy, timeline, visual |
| Unión `WebBlockSchema` (`compiler-api/schemas/draftSchema.js:990-1007`) | **16** | los mismos **menos `split`**, **más `columns`** |
| `blockCatalog.js`, ids `id: 'web-*'` | **17** | los 16 del catálogo de esquema **más `web-split`** |

**El 16 del ticket es correcto para `component_status.json` y para la unión de esquema, y
NO para el catálogo de bloques, que tiene 17.** La diferencia es `split`, que no es bloque
de primer nivel: existe solo como hijo de columnas. **Las dos listas de 16 tampoco son la
misma lista:** una tiene `split` y no `columns`; la otra al revés. **Cualquier record
futuro que vea un «16» debe preguntar de cuál de los tres.**

### 10.2 La suite del compilador — lo que afirmo y lo que no

**Recuento estático, ejecutado:** 33 archivos `.test.mjs`, **363** declaraciones `test()` a
principio de línea. Sin `t.test(` (0) ni `describe(` (0): no hay subtests que inflen la
cifra. Casa con el `350 + 13` que declaró el run anterior.

**NO afirmo «363 en verde».** Eso exigiría correr la suite entera, que el ticket excluye.
**Lo ejecutado y verde son 128 tests en 9 archivos** (§7.2).

---

## 11. INFORME DE OPCIONES, COSTE MEDIDO Y RECOMENDACIÓN — SIN DECIDIR

**La decisión es del operador. Esto es una recomendación con su coste medido.**

### 11.1 Las cuatro opciones

**Opción A — montar la carcasa tal cual, que es lo que el run supone.**
**Coste: no es ejecutable.** El resultado material sería un segundo `<textarea>` de LaTeX
junto a cada campo de prosa, con un botón que inserta `\frac{}{}` **en ese segundo
textarea**. No abre el editor visual (criterio 3 incumplido), no escribe en el campo de
prosa (criterio 4 incumplido) y no emite delimitadores. **Descartada por medición, no por
opinión.**

**Opción B — control nuevo junto al campo + módulo de inserción, reutilizando
`SmartFormulaModal`.** Es lo que la forma del run pide, con las piezas que de verdad
faltan.

| Pieza | Estado hoy | Coste |
|---|---|---|
| **Módulo nuevo**: empalme en cursor + envoltorio `\( \)` + recolocación del cursor tras el fragmento | **0 líneas — no existe** | módulo nuevo + sus tests |
| `TextAreaField.jsx` | **31 líneas**, sin `ref` y sin captura de selección | fusión de `ref` con el de RHF + `onSelect`/`onKeyUp`/`onClick` + conservar la selección al perder el foco |
| `WebBlockEditor.jsx` | **4082 líneas** | **7 sitios** (§3.4), en **dos formas distintas** de control: 4 con `TextAreaField`, 3 con `<textarea>` en línea |
| `math-authoring/index.js` | 96 líneas, **no publica la carcasa** | reexport del control nuevo |
| **Decisión de producto sobre la selección activa** | los evaluadores existentes **no sirven** (§3.2) | **es una decisión del operador, no una medición** |
| Previsualización del criterio 5 | **no hay ninguna reutilizable**; KaTeX **no** es dependencia del editor | módulo partidor + MathLive por tramo, **o** una dependencia nueva que el ticket prohíbe |
| `FormulaInserterShell.jsx` | 164 líneas, 0 importadores | queda **huérfana** o se retira — decisión aparte |

**Opción C — reescribir la carcasa para que sea ese control.** Mismo coste que B, más el
rediseño de sus once props. **El único ahorro es no dejar una pieza huérfana.** Sus 5
tests existentes no cubren nada de lo nuevo, así que tampoco protegen la reescritura.

**Opción D — recortar el alcance a lo que sí es montaje.** Botón junto a los cinco campos
que abre `SmartFormulaModal` y, al aceptar, **añade** la fórmula delimitada **al final del
campo**, sin tocar el cursor.
**Coste: sin `ref`, sin captura de selección, sin módulo de empalme.** Siguen haciendo
falta el envoltorio de delimitadores (una función) y los 7 sitios.
**Pero contradice el criterio 4 del ticket y la forma escrita en el `full_description`**
—«at the cursor position»—, así que **es un cambio de alcance del run, no su ejecución.**

### 11.2 La recomendación, explícita y sin decidir

**Recomiendo la Opción B, partida en dos runs, y que el `full_description` del run 27 se
corrija antes de reintentarlo.** Las razones son medidas, no de gusto:

1. **B es la única que cumple la forma que el operador escribió** sin escribir un editor
   nuevo (criterio 3) y sin tocar el dato guardado (criterio 7). `SmartFormulaModal` se
   reutiliza tal cual: la compuerta C no se dispara.
2. **Partirla en dos**, porque el criterio 5 arrastra un coste que no es del mismo
   tamaño: la inserción necesita un módulo de empalme; la previsualización necesita
   **además** un partidor de tramos y una decisión sobre cómo renderizar prosa+fórmula sin
   añadir KaTeX. **Meterlas en un run las hace fallar juntas.**
3. **Corregir el `full_description`**, porque su premisa sobre los evaluadores es falsa
   (§1.2) y cualquier ejecutor futuro volverá a chocar con la misma compuerta y volverá a
   parar. **El texto debería decir que el evaluador que hace falta no existe.**

**Lo que el operador tiene que decidir y yo no puedo medir:** qué pasa con una selección
activa. Los evaluadores existentes dicen «conviértela en fracción», que en prosa destruye
la palabra seleccionada. Las alternativas razonables —sustituir la selección por la
fórmula, o ignorarla e insertar en el inicio de la selección— **son reglas nuevas, y el
criterio 4 prohíbe inventarlas.** **Es una decisión de producto.**

**Lo que NO recomiendo, con su medición:**

- **No recomiendo montar la carcasa tal cual** (Opción A): el resultado no cumple ni el
  criterio 3 ni el 4, y deja un segundo campo de LaTeX visible al autor.
- **No recomiendo el disparador con barra** en esta pasada: `/` es un carácter normal en
  prosa castellana y el evaluador de barra bloquea prosa con paréntesis desemparejados.
- **No recomiendo añadir KaTeX al editor** para resolver la previsualización: es una
  dependencia nueva, está en Out of scope, y hay un camino sin ella (MathLive, ya
  presente en `0.110.0`).

---

## 12. QUÉ **NO** SE HIZO

**Por la parada del criterio 1 y del criterio 14:**

- **No se montó ningún control**, en ningún campo, en ninguna colocación.
- **No se escribió ningún test.** No hay comprobación de mordida, y no se simuló.
- **No se escribió el packet de QA.** Su ruta está en §8, sin crear.
- **No se creó ningún módulo nuevo** ni se tocó `FormulaInserterShell`, `TextAreaField`,
  `WebBlockEditor` ni `math-authoring/index.js`.
- **Cero bytes escritos en `projects/cantu-studio`.** El único archivo escrito en toda la
  sesión es este record.

**Por prohibición explícita del encargo:**

- **No se tocó** el compilador, los renderers, los dos esquemas ni el formato del dato
  guardado.
- **No se abrió ningún campo más de los cinco.** `narrative.text` se declaró (§4) y **no
  se tocó**.
- **No se tocó** `.aiw/docs/docs_index.json`, `component_status.json`, la Definition of
  Done, los contratos ni la Guía de componentes.
- **No se tocó** el roadmap canónico, `.project/`, ni el status de ningún run. **No se
  re-emitió `.project/`.** No se insertó, movió ni renumeró ningún run. **No se clasificó
  ninguno.**
- **No se ejecutó Git. No se levantó ningún servidor. No se corrió la suite completa.**
- **No se revalidó ningún componente.**
- **No se añadió ninguna dependencia.**

**Por límite de la medición, declarado:**

- **No se ejecutó la interfaz.** Todo lo de §3 es lectura de código y ejecución de tests
  en Node. **No se abrió el editor en un navegador**, así que no afirmo nada sobre lo que
  se ve en pantalla.
- **La suite del compilador es un recuento estático** (§10.2), no un resultado de
  ejecución.

**No se reparó ninguna deriva conocida:** ni el mojibake de los dos esquemas —se volvió a
ver, VERBATIM, en `draftSchema.js:1015`: `"El tÃ­tulo es requerido"`—, ni los punteros
muertos, ni el CLI local de roadmap, ni el draft del almacén vivo que no valida, ni los
HTML huérfanos, ni los defectos sin dueño de los componentes ya revalidados, ni el aviso
de dependencia externa del validador, ni la discrepancia de 16 contra 17 del §10.1.

---

## 13. STATUS DEL RUN — DECLARADO, NO CAMBIADO

**El run queda en `active`. Este taller NO lo cambia.** Lo cierra el operador desde la
consola global, que es el punto de serialización y la que re-emite `.project/` de forma
atómica.

**Status al que debe pasar: NINGUNO todavía. El run no está hecho y no puede cerrarse como
`completed`.**

**Lo que falta para llegar a `completed`, y es todo decisión del operador:**

1. **Leer §2 y §3** y aceptar que las compuertas A y B están disparadas.
2. **Decidir entre las opciones de §11.1.** Sin esa decisión no hay trabajo que ejecutar:
   la diferencia entre B, C y D no es de implementación, es de alcance.
3. **Decidir la regla de la selección activa** (§11.2). Es lo único que ninguna medición
   puede resolver.
4. **Corregir el `full_description` del run 27**, cuya premisa sobre los evaluadores es
   falsa (§1.2), o el siguiente ejecutor volverá a parar en el mismo punto.
5. Si el operador acepta la partición que recomiendo, **dar de alta el run de la
   previsualización** como pieza aparte. **Este taller no insertó, movió ni renumeró
   ningún run.**

**No hay trabajo técnico pendiente dentro de lo que este run cubre, porque lo que este run
cubre resultó no ser ejecutable tal como está escrito.** La precondición sí sigue en pie y
verificada: los 13 tests del run 25 están verdes hoy, y con ellos los 128 de los nueve
archivos relacionados.
