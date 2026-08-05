# CONSTRUCCIÓN DEL INSERTOR DE FÓRMULA EN LÍNEA (cantu-studio)

**Fecha:** 2026-08-04
**Run:** `RUN-CANTU-INLINE-FORMULA-INSERTER-MOUNT-001` — **derivado, no tecleado** (§1).
**Repo escrito:** `projects/cantu-studio` — **ocho archivos**: 4 nuevos + 3 modificados (§5)
y el packet de QA del operador (§10 del ticket, ruta en §14).
**Repo escrito:** `projects/aiw-console` — **este record.**
**Veredicto:** **CONSTRUIDO. Ninguna compuerta de parada se disparó.** El coste que el
record anterior temía —reescribir el control compartido de área de texto— **resultó
innecesario, y la medición dice por qué** (§4).

---

## 1. EL RUN, DERIVADO DEL CANÓNICO

Recorrido de `projects/cantu-studio/.aiw/roadmap/roadmap.json`
(`schema_version = jame.roadmap_v3.v0.2-progress`), buscando `queue_order === 27`.
**Una sola coincidencia sobre 70 runs.**

| Campo | Valor derivado |
|---|---|
| `run_id` | **`RUN-CANTU-INLINE-FORMULA-INSERTER-MOUNT-001`** |
| ubicación | `objectives[1].phases[5].runs[0]` — objetivo `O5`, fase `O5.P3` |
| `queue_order` | 27 |
| `status` | `active` |
| `depends_on` | `RUN-CANTU-INLINE-FORMULA-BEHAVIOUR-LOCK-001` — `queue_order 25`, **`status=completed`**: satisfecha |

**Título en disco, VERBATIM:**

```
Mount the formula inserter so an author can place a formula at the cursor inside prose
```

**Casa carácter a carácter con el objetivo del ticket. No hay parada por este motivo.**
El validador lo confirma de forma independiente:
`Roadmap v3 active run derived stages: RUN-CANTU-INLINE-FORMULA-INSERTER-MOUNT-001=none` (§11).

### 1.1 El `full_description` fue enmendado, y la enmienda corrige su propia premisa falsa

Se leyó íntegro antes de empezar. **Su primera frase declara la corrección, VERBATIM:**

> `MEASURED BASIS, AND IT CORRECTS THIS RUN'S OWN EARLIER PREMISE. An earlier version of`
> `this description claimed the inserter shell was ready to mount and that its action`
> `evaluators already decided what to insert given a cursor position and a selection.`
> `MEASUREMENT SHOWED BOTH CLAIMS FALSE.`

**La premisa anterior era falsa y ahora está retirada por escrito.** Lo que sí se midió, y
el texto enmendado ya lo dice: la carcasa tiene su propio área de texto, nunca abre el
editor visual y al aceptar sustituye el valor entero; los evaluadores no toman como
parámetro el texto a insertar y con selección solo aceptan un token pelado; y su
comprobación de LaTeX mal formado mide el campo entero.

**Este taller reverifica esas afirmaciones contra disco y NO las hereda.** Resultado: **todas
se reproducen** (§2, §4, §6), **con una excepción de matiz que se declara en §12.2**.

### 1.2 Ticket contra run — no discrepan, y la única diferencia de cifra se declara

El ticket y el `full_description` piden lo mismo. **La única discrepancia encontrada es de
cifra, y no es del run: es de los records previos.** `MONTAJE` §1 y `BLOQUEO` §1 midieron
**69 runs**; hoy hay **70**, porque el operador dio de alta
`RUN-CANTU-INLINE-FORMULA-PREVIEW-001` en `queue_order 28` —«la posición siguiente», tal como
el ticket dice— entre aquella medición y esta. **Las cifras previas eran correctas en su
fecha. Por eso el ticket manda medirlas.**

---

## 2. LA MEDICIÓN DEL CRITERIO 1 — VERIFICADA, NO HEREDADA

Todo lo de este apartado se leyó de disco en esta sesión, **antes de escribir una sola línea**.

### 2.1 Los siete sitios de código y las ocho colocaciones

**Todos en `tools/author-lite/editor-ui/src/features/editor/components/web/WebBlockEditor.jsx`**,
que tenía **4082 líneas** antes de este run. **Líneas de la medición previa a construir:**

| # | Campo | Colocación | Línea (antes) | Componente contenedor | Control |
|---|---|---|---|---|---|
| 1 | `details.items[].content` | primer nivel | `:2442` | `DetailsFields` (`:2425`) | `TextAreaField` |
| 2 | `callout.content` | primer nivel | `:3949` | rama `field.kind === 'callout'` (`:3941`) | `TextAreaField` |
| 3 | `callout.content` | **hijo de columnas** | `:1853` | `ColumnChildFields`, rama `:1836` | **`<textarea>` nativo en línea** |
| 4 | `card(normal).content` | primer nivel **y** columna | `:1153` | `CardFields` (`:1085`) → helper local `renderTextArea` (`:1126-1143`) | **`<textarea>` nativo en línea** |
| 5 | `conceptGrid.items[].content` | primer nivel | `:2602` | `ConceptGridFields` (`:2577`) | `TextAreaField` |
| 6 | `rule.description` | primer nivel | `:4044` | rama `field.kind === 'rule'` (`:4025`) | `TextAreaField` |
| 7 | `rule.description` | **hijo de columnas** | `:1891` | `ColumnChildFields`, rama `:1873` | **`<textarea>` nativo en línea** |

**CIFRAS CONFIRMADAS: 7 sitios de código, 8 colocaciones visibles para el autor.**
La diferencia es la tarjeta: `CardFields` es **un solo sitio** servido en **dos colocaciones**
(`<CardFields …/>` sin `isColumn` en el primer nivel, y con `isColumn` dentro de columnas).
Colocaciones por campo: **details 1 · callout 2 · card 2 · conceptGrid 1 · rule 2 = 8.**

**Reparto de forma de control, confirmado: 4 de 7 con `TextAreaField`, 3 de 7 con
`<textarea>` nativo.** Es el reparto que el ticket describe.

**Por qué `details` y `conceptGrid` no tienen colocación en columna** —remedido, no heredado—:
`COLUMN_CHILD_OPTIONS` (`WebBlockEditor.jsx:253-262`) declara ocho hijos —`header, list,
iconList, rule, card, callout, narrative, table`— y **ninguno de los dos está**.

**Un hallazgo propio que ningún record previo separaba:** el helper `renderTextArea` de la
tarjeta **sirve a tres tipos de tarjeta**, no a uno: `normal` (`:1151`), `code` (`:1158`) y
`persona` (`:1166`), los tres sobre `${baseName}.content`. **Solo `normal` está en el conjunto
de los cinco.** Montar el control en el helper sin condición lo habría colado en el campo de
código y en el de persona. Se resolvió con un parámetro explícito (§5.3) y **hay un test que
lo fija en los tres sentidos**.

### 2.2 ¿Expone `TextAreaField` una referencia al elemento? — **NO. Confirmado.**

`tools/author-lite/editor-ui/src/features/editor/components/common/TextAreaField.jsx`,
**31 líneas, leído entero.** Hace `<textarea {...registerProps} … />` (`:17-22`) y nada más.
**Sin `useRef`, sin `forwardRef`, sin `ref=`, sin ningún manejador propio, y sin recoger props
sueltas** —no hay `...rest`—. El único `ref` que llega es el de React Hook Form, dentro de
`registerProps`. **La afirmación del ticket es correcta.**

### 2.3 Qué recibe y qué devuelve el editor visual existente

`features/math-authoring/smartFormulaField/SmartFormulaModal.jsx`, **246 líneas**.

| Prop | `:10-18` | Papel |
|---|---|---|
| `isOpen` | | abre/cierra |
| `mode` | | `INLINE` **es su valor por defecto** (`:12`), y `:19` normaliza a `INLINE` todo lo que no sea `BLOCK` |
| `value` | | cadena, `mathNode` o `mathBlockGroup` — resuelto por `resolveSmartFormulaInitialLines` (`:21`) |
| `title` | | etiqueta de la acción |
| `onCancel` / `onConfirm` | | los dos callbacks |
| `colorPalette` | | opcional, `null` por defecto |

**Devuelve `onConfirm(pendingOutput)` (`:117`)**, donde `pendingOutput` es la salida de
`createSmartFormulaBlockGroupOutput(lines, {mode})`. **Es un objeto, no una cadena
delimitada**, y su campo `latex` es el LaTeX canónico —`createSmartFormulaFieldOutput` lo
toma de `result.value.latex` (`smartFormulaFieldAdapter.js:250`) para una línea, y de
`getMathBlockGroupLatex` (`:337`) para varias—. **El botón de confirmar solo se habilita si
`pendingOutput.ok` (`:98`, `:116`)**, así que lo que llega al empalme ya pasó por la
validación de `math-authoring`.

**Y la precarga funciona con una cadena pelada, verificado leyendo la cadena de llamadas:**
`resolveSmartFormulaInitialLines(value)` → `resolveSmartFormulaInitialLatex` →
`resolveFormulaInserterText`, que en `formulaInserter.controller.js:58-60` devuelve
**el propio string** si le pasas un string. **Por eso el texto seleccionado se puede pasar tal
cual como `value`, sin envolverlo en nada.**

**Se puede abrir fuera del componente de regla: ninguna de sus siete props es específica de
la regla.** La compuerta C del record anterior sigue sin dispararse, y este run lo confirma
usándola.

---

## 3. LA CARCASA — MEDIDA Y **NO** MONTADA, CON SU PORQUÉ

`formulaInserter/FormulaInserterShell.jsx`, **163 líneas. Importadores hoy: CERO.** Barrido
completo de `tools/` y `src/` (sin `node_modules`) por el identificador: **cuatro
resultados**, su definición (`:45`), sus dos exports (`:161`, `:163`) y **una aserción
negativa** en `webRuleSmartFormulaFieldRulePilot.test.mjs:259`. **Ni uno es un importador.**

**No se montó, no se reescribió y no se retiró.** El `full_description` enmendado ya dice que
este run **construye en vez de cablear**, y montar la carcasa habría producido un segundo
área de texto de LaTeX junto a cada campo de prosa, que no es lo que el run pide. **Queda
huérfana, exactamente como estaba. Retirarla es decisión aparte y no se tocó** (§13).

---

## 4. LA POSICIÓN DEL CURSOR — EL CERO, VERIFICADO Y **CORREGIDO EN SU LETRA**

### 4.1 El número real

**El ticket dice «cero sitios del editor capturan hoy la posición del cursor». La afirmación
es CORRECTA. La formulación del record anterior, que la respalda, NO lo es, y se corrige.**

`MONTAJE-INSERTOR-FORMULA-CANTU.md` §3.5 escribió, VERBATIM:

> **Barrido de `onSelect` y `selectionStart` sobre todos los `.jsx` de `features/editor`:
> cero ocurrencias** sobre campos de texto.

**Barrido rehecho hoy: `selectionStart` tiene DOS ocurrencias en `features/editor`**, ambas
en `WebBlockEditor.jsx` — `:204-205` y `:217-218`. **No son cero.** Leídas una a una:

| Línea | Dónde | Qué hace | ¿Es una captura? |
|---|---|---|---|
| `:202-212` | `ListItemsTextarea`, `handlePaste` | lee `selectionStart/End` del evento **para proyectar cuántos ítems quedarían** y cancelar el pegado si pasan de 30 | **NO** |
| `:214-225` | `ListItemsTextarea`, `handleKeyDown` | idéntico, para la tecla Enter | **NO** |

**Las dos son lecturas efímeras dentro del propio manejador, se descartan al terminar, y
caen sobre `list.items` — que NO es ninguno de los cinco campos.**

**LA CIFRA REAL, dicha con precisión:**

- **capturas de la posición del cursor que sobrevivan al manejador: 0** — la afirmación del
  ticket se confirma;
- **lecturas efímeras de `selectionStart` en `features/editor`: 2**, ninguna sobre los cinco
  campos;
- **ocurrencias sobre los cinco campos de prosa: 0.**

**La diferencia importa porque una de las dos lecturas demuestra, dentro de este mismo
archivo, que `event.currentTarget` ya da el elemento sin necesidad de ningún `ref`.** Es
justo la puerta que el record anterior no vio.

Se confirma también, remedido: **cero ocurrencias** de
`FORMULA_CAPABLE|formulaEnabled|allowFormula|mathEnabled|FORMULA_FIELDS` en todo
`editor-ui/src`. No hay ningún registro de qué campo admite fórmula, y este run **no crea
uno**: el control se pone donde se pone y se cuenta con un test.

### 4.2 La vía implementada, y por qué **no** dispara la parada del criterio 2

**El criterio 2 manda parar si capturar el cursor exigiera reescribir `TextAreaField`.
NO lo exige, y esta es la medición que lo demuestra:**

1. **`event.target` YA ES el elemento.** No hace falta ningún `ref` para saber sobre qué
   `<textarea>` se está trabajando ni para leer sus offsets. El propio `ListItemsTextarea`
   (§4.1) ya lo hace así.
2. **Los eventos de React burbujean.** Poniendo `onSelect`, `onKeyUp`, `onClick`, `onFocus`,
   `onBlur` y `onInput` en el **`<div>` envoltorio**, los eventos del `<textarea>` de dentro
   llegan solos. **El campo no se toca: ni sus props, ni su `registerProps`, ni el control
   compartido.**
3. **`selectionStart`/`selectionEnd` sobreviven al blur.** Al pulsar el botón el campo pierde
   el foco, pero la posición ya está guardada por el `onBlur` del envoltorio.

**Coste real: CERO líneas de `TextAreaField.jsx`, y cero cambios en la forma de registrar de
los siete sitios.** El control se limita a envolver el campo tal como ya se pintaba.

**Y hay un test que fija que sigue siendo así**
(`the shared text area control was not rewritten to make the cursor capture possible`): afirma
que `TextAreaField` sigue sin `ref`, sin `useRef`, sin `forwardRef`, sin `onSelect` y sin
`selectionStart`, y que el `<textarea>` sigue siendo `{...registerProps}` y nada más.

### 4.3 La escritura de vuelta, declarada

El `<textarea>` es **no controlado**: React Hook Form lo registra por `ref` y su valor vive en
el DOM. Para escribir la cadena nueva se usa **el setter nativo del prototipo** y se emite un
evento `input` que burbujea. Esto es deliberado y está comentado en el código: asignar
`element.value` directamente deja al día el rastreador de valor de React y **React suprimiría
el evento sintético**, con lo que RHF nunca se enteraría del cambio. Con el setter del
prototipo el rastreador queda obsoleto, React ve un cambio real y entrega el evento al
`onChange` que RHF **ya tiene puesto en ese `<textarea>`**.

**Verificado contra la implementación de RHF 7.75.0** (`dist/index.esm.mjs:1961-1999`): su
manejador hace `const fieldValue = target.type ? getFieldValue(field._f) : getEventValue(event)`,
y `getFieldValue` (`:1047-1062`) lee `_f.ref.value`, o sea el valor del elemento registrado.
**Es exactamente el camino que recorre una pulsación de tecla del autor.** No hace falta
`setValue` —que además no llega a estos componentes: solo `LessonContextBar.jsx` lo recibe—,
ni `Controller`, ni pasar nada nuevo por props.

---

## 5. EL DIFF — SEIS ARCHIVOS

### 5.1 Nuevos (3)

| Archivo | Líneas | Qué es |
|---|---|---|
| `editor-ui/src/features/math-authoring/inlineFormula/inlineFormulaSplice.js` | 169 | **el módulo de empalme**: delimitadores, semilla de precarga, rango y empalme |
| `editor-ui/src/features/math-authoring/inlineFormula/InlineFormulaField.jsx` | 206 | **el control**: botón + captura por delegación + `SmartFormulaModal` |
| `editor-ui/src/features/math-authoring/inlineFormula/index.js` | 11 | barril del paquete |
| `compiler-api/tests/webInlineFormulaInserterMount.test.mjs` | 525 | **los tests de este run** (16) |

*(Los tres primeros son producción; el cuarto es test. Con los tres modificados de §5.2 y el
packet de QA del operador —`docs/_historical_run_record/RUN-CANTU-INLINE-FORMULA-INSERTER-MOUNT-001-OPERATOR-QA-PACKET.md`,
escrito junto a los otros trece— suman los **ocho** archivos que este run escribe en
`cantu-studio`.)*

### 5.2 Modificados (3)

| Archivo | Cambio | Alcance |
|---|---|---|
| `formulaInserter/formulaInserter.actions.js` | **+18 líneas al final: un `export` y su comentario.** `withReplacement` y `hasMalformedLaTeX` pasan de privadas a públicas | **Ni una línea de cuerpo tocada. Cero cambios de conducta.** Sus 5 tests siguen verdes sin tocarlos |
| `math-authoring/index.js` | +12 líneas: reexporta la lógica del empalme (no el componente) | aditivo |
| `editor/components/web/WebBlockEditor.jsx` | 1 import + **los 7 sitios envueltos**; el helper de tarjeta partido en `renderTextAreaBody` + `renderTextArea` con parámetro `inlineFormula` | 4082 → **4118 líneas** |

**Los 7 sitios, ahora:** `:1162` (tarjeta, vía helper — el flag está en `:1179`), `:1874`
(callout columna), `:1914` (rule columna), `:2468` (details), `:2630` (conceptGrid), `:3981`
(callout primer nivel), `:4076` (rule primer nivel).

### 5.3 La única decisión de forma que no era obvia, declarada

**El control se escribió como envoltorio que recibe el campo COMO HIJO**, no como campo nuevo
ni como render prop. Las dos alternativas se descartaron con motivo medido:

- **Campo nuevo que sustituya a `TextAreaField`**: habría duplicado un control compartido,
  que el criterio 6 prohíbe, y habría cambiado el marcado de 4 sitios sin necesidad.
- **Render prop** (`children(propsCompuestas)`): **la regla `react-hooks/refs` del lint del
  proyecto la rechaza.** Se probó y se midió: pasar a una función desconocida un objeto que
  contiene un cierre que toca un `ref` produce
  `Error: Cannot access refs during render`. **La delegación de eventos evita el problema de
  raíz y además es menos invasiva**, porque no hay que componer nada sobre `registerProps`.

---

## 6. EL EMPALME — EL GENÉRICO EXISTÍA, NO ESTABA EXPORTADO, **SIRVE, Y SE REUSA**

**Verificado:** `withReplacement(text, start, end, replacementText)` vive en
`formulaInserter.actions.js:30-32` y su cuerpo entero es
`` `${text.slice(0, start)}${replacementText}${text.slice(end)}` ``. **Era privada del módulo:
el `export` del final (`:435-438`) publicaba solo los dos evaluadores y dos símbolos de
`types`.**

**¿Sirve? SÍ, y a los dos casos de este run sin cambiarla:** con `start === end` inserta en el
cursor; con `start < end` sustituye la selección. **Se exportó y se reusa. No se escribió un
segundo empalme**, y hay un test que lo comprueba llamando a las dos y comparando el
resultado (`the splice reuses the exported generic replacement instead of a second implementation`).

**Se exportó también `hasMalformedLaTeX` (`:39-51`)**, por la misma razón: acotarla al
fragmento (§8) exige llamarla, y escribir una segunda comprobación de estructura habría
duplicado la regla. **Ninguna de las dos cambió de cuerpo.**

**Lo que NO se reusó, y por qué:** los dos evaluadores. El `full_description` enmendado ya lo
dice y se reverifica: `evaluateFormulaButtonAction` inserta el literal `\frac{}{}` escrito en
el código (`:420`) y no admite ningún argumento por el que pedirle otra cosa. **No hay forma
de pedirle que inserte una fórmula.**

---

## 7. LOS DELIMITADORES — NADIE LOS EMITÍA, Y LA FORMA SE DERIVA

### 7.1 La medición, confirmada

Barrido de `\(` como literal sobre todo `editor-ui/src` (fuera de `experiments/`):

- **Ninguna función los EMITE.** Confirmado.
- **La única que los toca los QUITA:** `ADVANCED_OUTER_WRAPPERS` en
  `smartFormulaFieldAdapter.js:130-134`, usada por `normalizeAdvancedLatexInput` (`:145-151`),
  que retira un envoltorio externo `$$`, `\[…\]` o `\(…\)`.
- Las otras dos apariciones del par en el editor son **textos de ayuda que dicen al autor que
  NO los use** (`WebBlockEditor.jsx:3048`, `blockCatalog.js:923`).

**Producirlos es de este run, y se producen en un solo sitio:**
`INLINE_FORMULA_DELIMITERS` en `inlineFormulaSplice.js`.

### 7.2 La forma, DERIVADA de los trece tests del run anterior

**No se tecleó.** El primer test de este run lee
`compiler-api/tests/webInlineFormulaProseBehaviourLock.test.mjs`, extrae el literal de
`const FORMULA_PROSE = '…';` con una expresión regular, **comprueba que el literal no lleva
ningún escape que la derivación no sepa convertir** —si lo llevara, el test cae ahí en vez de
mentir— y lo convierte a su valor de runtime.

Después **parte la cadena bloqueada por el par que este run emite**. Si el par no fuera el
mismo, no habría por dónde partirla. Y con el prefijo, el LaTeX y el sufijo así obtenidos,
coloca la fórmula en el cursor sobre la prosa sin fórmula y **afirma que reproduce la cadena
bloqueada byte a byte**.

**La forma resultante, dicha para que se lea, pero derivada en el test:** el par de
delimitadores en línea de LaTeX, **sin relleno interno** — el LaTeX va pegado a las dos
marcas. Es la forma de `FORMULA_PROSE`. *(La cadena real del corpus,
`CORPUS_PROSE`, sí lleva espacios dentro; eso es contenido ya escrito por un autor, no la
forma que el emisor produce, y el run anterior ya fija que ambas viajan intactas.)*

**Esta derivación muerde: la comprobación de mordida 1 (§9.3) la puso en rojo.**

### 7.3 Lo que el emisor rechaza en vez de estropear

- **Fragmento vacío** → no-operación, el campo no cambia.
- **Fragmento que ya trae delimitadores** → no-operación, en vez de anidarlos y producir
  `\(\(x\)\)`. El editor visual no los devuelve nunca (§7.1), pero la guardia es barata.

---

## 8. LA RESTRICCIÓN DE UN SOLO TOKEN — MEDIDA, LEVANTADA Y DECLARADA

### 8.1 Qué comprueba

`isSafeToken` (`formulaInserter.actions.js:166-171`) exige que el texto case con **una** de
tres formas (`SAFE_TOKEN_PATTERNS`, `:8-12`) — solo dígitos, solo letras, o un paréntesis
sencillo sin anidar — **y** que no contenga ninguno de cuatro comandos prohibidos
(`FORBIDDEN_TOKEN_PATTERNS`, `:14-19`). **Un espacio la hace fallar.**

**Reproducido en vivo, y es exactamente lo que el ticket dice:** con `selectionText: 'mitad'`
el evaluador aplica y devuelve la fracción; con `selectionText: 'la mitad'` devuelve
`applied: false` y el valor sin tocar. **Las dos ejecuciones están afirmadas en un test de
este run**, para que la regla vieja quede escrita en vez de contada.

### 8.2 Qué protegía — y es una cosa real y correcta

**Protegía la construcción de `\frac{numerador}{}` dentro de una expresión LaTeX.** El
evaluador no «inserta una fórmula»: **convierte lo seleccionado en el numerador de una
fracción**. Con `mitad` produce `\frac{mitad}{}`, que es LaTeX válido. Con `la mitad`
produciría `\frac{la mitad}{}`, y con cualquier cosa que llevara llaves o barras
desequilibradas rompería la expresión de alrededor. **En su sitio la restricción es correcta y
sigue siéndolo.**

### 8.3 Qué tests la afirman — **medido: NINGUNO afirma el caso multi-palabra**

Barrido de los 33 archivos de test previos. **`selectionText` aparece tres veces en toda la
suite**: `mathAuthoringFormulaInserter.test.mjs:65` (`'3'`), `:146` (`'x'`) y
`mathAuthoringSmartFormulaField.test.mjs:247` (`'x'`). **Los tres son tokens seguros de un
solo carácter.** El test que sí bloquea —`evaluateFormulaSlashAction blocks complex contexts`—
recorre ocho entradas **sin selección** (`selectionStart === selectionEnd`).

**Conclusión: ningún test existente fija que una selección de varias palabras no haga nada.
Por tanto no hubo ningún test que ajustar, y no se borró ninguno.** Es el condicional del
criterio 5 y no se cumplió; se declara en vez de inventar un ajuste.

### 8.4 Cómo se levanta, y por qué así

**La restricción se levanta NO ENRUTANDO esta vía por los evaluadores.** El empalme en línea
no llama a `isSafeToken`: la selección se precarga **verbatim y de cualquier longitud** y se
sustituye entera al aceptar. **`la mitad` funciona igual que `mitad`.**

**Se consideró la alternativa y se descarta con motivo:** relajar `isSafeToken` para que
aceptara varias palabras habría hecho que el evaluador construyera `\frac{la mitad}{}`, que es
**peor**, no mejor; habría cambiado la conducta de un módulo con 5 tests verdes; y no habría
servido a este run, porque el problema de fondo no es el filtro sino que el texto a insertar
es un literal en el código (§6). **Los evaluadores conservan su regla para su propósito.**
Esto queda afirmado por un test que ejecuta **las dos vías en la misma función**: el evaluador
sigue sin hacer nada con dos palabras, y el empalme sí.

---

## 9. LOS TESTS

### 9.1 El archivo nuevo — 16 declaraciones

`tools/author-lite/compiler-api/tests/webInlineFormulaInserterMount.test.mjs`

```bash
node --test tools/author-lite/compiler-api/tests/webInlineFormulaInserterMount.test.mjs
```

```
✔ the delimited string this run emits is byte-for-byte the form the preceding run locked (5.7901ms)
✔ the string produced at the cursor survives every gate and compiles unchanged in the five fields (22.033ms)
✔ inserting at the cursor keeps every character around it (0.5585ms)
✔ the splice reuses the exported generic replacement instead of a second implementation (0.2509ms)
✔ the cursor falls to the end of the value when nothing was captured, which destroys nothing (0.2888ms)
✔ a multi-word selection is preloaded verbatim and replaced by the formula (0.2954ms)
✔ the single-token restriction that blocked two words is measured, and it is not on this path (0.6579ms)
✔ no selection means no seed, so the visual editor opens empty (0.192ms)
✔ a paragraph with an unbalanced parenthesis no longer blocks the insertion (0.205ms)
✔ a malformed fragment is still refused, and the field is left untouched (0.2461ms)
✔ an empty or already delimited fragment is refused instead of nesting delimiters (0.2823ms)
✔ the control is mounted at the five prose fields, on seven code sites (8.2801ms)
✔ the seven code sites cover eight author-visible placements (1.4015ms)
✔ the control opens the existing visual editor and adds no second editor (2.3022ms)
✔ the shared text area control was not rewritten to make the cursor capture possible (2.1178ms)
✔ a prose field outside the five gets no control and is left exactly as it was (0.8088ms)
ℹ tests 16
ℹ suites 0
ℹ pass 16
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 256.8689
```

**Cobertura contra el criterio 9, punto por punto:**

| Lo que el criterio pide | Test |
|---|---|
| el control existe en los 5 campos y en los 7 sitios | `the control is mounted at the five prose fields, on seven code sites` |
| … y en las 8 colocaciones | `the seven code sites cover eight author-visible placements` |
| insertar en el cursor produce la cadena esperada sin destruir lo de alrededor | `inserting at the cursor keeps every character around it` + `the delimited string this run emits is byte-for-byte…` |
| con selección de varias palabras se precarga y se sustituye | `a multi-word selection is preloaded verbatim and replaced by the formula` |
| un campo sin usar el control no cambia | `a prose field outside the five gets no control and is left exactly as it was` |

**FRONTERA DECLARADA: no se ejecuta React.** La existencia del control se afirma sobre el
**código fuente** de `WebBlockEditor.jsx`, que es el método que ya usan otros nueve tests de
esa carpeta. Lo que el autor ve en pantalla lo verifica el packet del operador (§10).

### 9.2 El archivo nuevo más los directamente relacionados

**NO se corrió la suite completa.** Los 18 archivos que sí se corrieron: el nuevo, los trece
del run anterior, los cuatro del insertor y del campo inteligente, los cuatro que leen el
código de `WebBlockEditor.jsx` por otro motivo, y los de los componentes de los cinco campos.

```bash
node --test \
  tools/author-lite/compiler-api/tests/webInlineFormulaInserterMount.test.mjs \
  tools/author-lite/compiler-api/tests/webInlineFormulaProseBehaviourLock.test.mjs \
  tools/author-lite/compiler-api/tests/mathAuthoringFormulaInserter.test.mjs \
  tools/author-lite/compiler-api/tests/mathAuthoringSmartFormulaField.test.mjs \
  tools/author-lite/compiler-api/tests/webRuleSmartFormulaFieldRulePilot.test.mjs \
  tools/author-lite/compiler-api/tests/webRuleMathAuthoringIntegration.test.mjs \
  tools/author-lite/compiler-api/tests/mathAuthoringAllowlistExpansion.test.mjs \
  tools/author-lite/compiler-api/tests/mathAuthoringFormulaEditorMessageAndUprightConstants.test.mjs \
  tools/author-lite/compiler-api/tests/mathAuthoringFormulaEditorSurfaceState.test.mjs \
  tools/author-lite/compiler-api/tests/mathAuthoringVirtualKeyboardKatexCompatibility.test.mjs \
  tools/author-lite/compiler-api/tests/webTheoryCardsRuleBoxesParitySafety.test.mjs \
  tools/author-lite/compiler-api/tests/webConceptGridSafety.test.mjs \
  tools/author-lite/compiler-api/tests/webTheoryTextBlocksSafety.test.mjs \
  tools/author-lite/compiler-api/tests/webColumnsChildExpansionSafety.test.mjs \
  tools/author-lite/compiler-api/tests/webColorSelectorCustomPicker.test.mjs \
  tools/author-lite/compiler-api/tests/webSharedColorSelectorUnification.test.mjs \
  tools/author-lite/compiler-api/tests/webHeaderColorPaletteAuthoringSurface.test.mjs \
  tools/author-lite/compiler-api/tests/webHeaderPaletteQuantityAndSwatch.test.mjs
```

```
ℹ tests 210
ℹ suites 0
ℹ pass 210
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 910.5601
```

**210 de 210 en verde. Nada verde se puso rojo.** También `eslint .` sobre `editor-ui`:
**limpio**, y `vite build`: **correcto** (§12.3).

### 9.3 La comprobación de mordida — **DOS mordidas, con su rojo y su restauración**

Se rompió a propósito, se vio el rojo y se restauró, como hicieron los runs anteriores.

**MORDIDA 1 — el delimitador de apertura y cierre, cambiado al par de bloque.**

```
✖ the delimited string this run emits is byte-for-byte the form the preceding run locked
ℹ tests 16
ℹ pass 15
ℹ fail 1
```

**El test de la derivación muerde.** *Dato honesto que se declara:* el segundo test —el de los
pórticos y el compilador— **siguió verde** con el par cambiado, porque las guardias aceptan
las dos formas. **Es exactamente por eso que el primer test existe:** el único que sabe cuál
es la forma correcta es el que la deriva del run anterior.

**MORDIDA 2 — se quitó el control del `callout` de primer nivel (7 sitios → 6).**

```
✖ the control is mounted at the five prose fields, on seven code sites
ℹ tests 16
ℹ pass 15
ℹ fail 1
```

**El test del montaje muerde.**

**Restauración verificada byte a byte con `diff` contra los respaldos previos a las mordidas:**
`inlineFormulaSplice.js` **IDÉNTICO**, `WebBlockEditor.jsx` **IDÉNTICO**. Los 16 y los 210
vuelven a estar en verde después (§9.1, §9.2). **Los respaldos vivieron en el scratchpad de
sesión, fuera de los dos repos, y se retiran.**

---

## 10. EL CRITERIO 8 — EL DATO NO CAMBIA, VERIFICADO

**Los trece tests del run anterior: 13 de 13 EN VERDE, ejecutados hoy después de todo el
cambio.**

```bash
node --test tools/author-lite/compiler-api/tests/webInlineFormulaProseBehaviourLock.test.mjs
```

```
✔ the five prose fields store a delimited inline formula unchanged in every compiler-api gate (7.9219ms)
✔ the five prose fields store a delimited inline formula unchanged in the editor-ui schema (8.5502ms)
✔ the compiler emits the delimited inline formula unchanged for the five prose fields (3.6096ms)
✔ the formula already published in details.items[].content compiles unchanged (0.8458ms)
✔ the delimited formula reaches the generated web HTML where the global math pass can see it (19.8439ms)
✔ the preview path carries the delimited formula with the same single global math pass (20.5236ms)
✔ prose with no delimited formula is left untouched in the five fields (5.8653ms)
✔ the untouched claim is bounded: four of the five fields turn a newline into <br /> (1.426ms)
✔ no guard of the five fields rejects any character a formula needs, in either schema (9.0271ms)
✔ backslash, dollar, braces, parentheses and underscore reach the HTML untouched (37.8651ms)
✔ ampersand, angle brackets and apostrophe are HTML-escaped, and that is the only change (2.7412ms)
✔ the Moodle output carries the formula literally and carries no math engine of its own (6.3889ms)
✔ the five prose fields never travel the Slides delimiter set (0.4594ms)
ℹ tests 13
ℹ suites 0
ℹ pass 13
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 329.4373
```

**Ninguno se puso rojo. No hay nada que reportar por este motivo.**

Y **este run añade su propia verificación, que los trece no cubrían:** el test
`the string produced at the cursor survives every gate and compiles unchanged in the five fields`
toma **la cadena que el control produce de verdad**, la mete en los cinco campos y comprueba
que **los cuatro pórticos** —`DraftSaveSchema`, `WebDraftSchema`, `DraftSchema` y el
`DraftSchema` del editor— la guardan intacta y que **el compilador la emite intacta** en los
cinco. **Mismo valor guardado, mismo valor leído, misma salida compilada.**

**Por qué el HTML no se reafirma aquí:** los tests 5, 6, 10, 11 y 12 del run anterior ya lo
fijan sobre la misma cadena, y siguen verdes. Reafirmarlo sería duplicar la red, no ampliarla.

**Y hay una razón estructural por la que el dato no podía cambiar:** este run **no tocó el
compilador, ni los renderers, ni ninguno de los dos esquemas, ni el formato guardado**. Lo
único que cambia es qué cadena escribe el autor, y sigue siendo una cadena.

---

## 11. VALIDADOR — SALIDA COMPLETA

Ejecutado por la vía que **no escribe**, desde `projects/cantu-studio`:

```bash
node tools/project-console/validate-project-console-state.mjs
```

**Salida completa, VERBATIM:**

```
Project Console state validation passed.
Roadmap v3 prototype: 7 objectives / 28 phases / 70 runs; queue groups needs_human_decision=0 now=1 ready_next=15 later=26 history=28
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

- **total de runs: 70**
- **`history=28`**
- **`ready_next=15`**
- otros grupos: `needs_human_decision=0`, `now=1`, `later=26`
- 7 objetivos / 28 fases

**Recuento propio sobre `roadmap.json`, independiente:** 70 runs — `completed=28`,
`planned=41`, `active=1`. **`completed=28` casa con `history=28`, y 28+1+15+26 = 70.**

**El aviso no bloqueante de la dependencia externa apareció, es el conocido y legal, no es
hallazgo y NO se reparó** (§13).

**`Docs indexed: 149` no se movió, y es lo correcto:** el packet nuevo (§10 del ticket) se
escribió junto a los otros trece, pero **`.aiw/docs/docs_index.json` no se tocó**, que es lo
que el ticket manda. El índice lo registra el operador si lo decide.

**Deriva contra el record anterior, declarada:** `MONTAJE` §9 midió, el mismo día,
**69 runs / `ready_next=15` / `later=25`**. Hoy: **70 / 15 / 26**. La diferencia es **el alta
del run de previsualización en `queue_order 28`**, que el operador hizo entre las dos
mediciones. `history` no se movió: 28 en las dos.

---

## 12. CIFRAS DEL TICKET — VERIFICADAS UNA A UNA

| Cifra | Cómo se verificó | Resultado |
|---|---|---|
| **7 sitios de código** | lectura de cada rama de `WebBlockEditor.jsx`, no conteo de texto | **CONFIRMADA — 7** (§2.1) |
| **8 colocaciones** | `COLUMN_CHILD_OPTIONS` + las dos invocaciones de `CardFields` | **CONFIRMADA — 8** (§2.1) |
| **4 con control compartido / 3 nativos** | leídos uno a uno | **CONFIRMADA — 4 y 3** |
| **`TextAreaField` no expone `ref`** | archivo entero, 31 líneas | **CONFIRMADA — no lo expone** (§2.2) |
| **Cero capturas de cursor** | barrido de `onSelect`/`selectionStart` en `features/editor` | **CONFIRMADA en el fondo, CORREGIDA en la letra: 0 capturas, pero 2 lecturas efímeras** (§4.1) |
| **Cero funciones emiten los delimitadores** | barrido de `\(` como literal en todo `editor-ui/src` | **CONFIRMADA — 0 emiten; 1 los quita; 2 textos de ayuda** (§7.1) |
| **El empalme genérico existe y no está exportado** | leído en `:30-32` y comprobado contra el `export` de `:435` | **CONFIRMADA, y sirve** (§6) |
| **Cero importadores de la carcasa** | barrido de `tools/` y `src/` completos | **CONFIRMADA — 0**, 4 menciones y ninguna es import (§3) |
| **Trece tests del run anterior** | recuento y ejecución | **CONFIRMADA — 13, y 13 en verde hoy** (§10) |
| **Recuento de la suite del compilador** | recuento estático de `^test(` sobre los 34 archivos | **34 archivos, 379 declaraciones — RECUENTO ESTÁTICO, NO resultado de ejecución** (§12.1) |

### 12.1 La suite del compilador — lo que afirmo y lo que no

**Recuento estático, ejecutado:** 34 archivos `.test.mjs`, **379** declaraciones `test()` a
principio de línea. Sin `t.test(` (0) ni `describe(` (0): no hay subtests que inflen la cifra.
Casa con el `363 + 16` de este run, y el 363 casa con el `350 + 13` del run anterior.

**NO afirmo «379 en verde».** Eso exigiría correr la suite entera, que el ticket excluye y que
`CLAUDE.md` desaconseja con talleres en paralelo. **Lo ejecutado y verde son 210 tests en 18
archivos** (§9.2).

### 12.2 La corrección al record anterior, dicha en voz alta

`MONTAJE-INSERTOR-FORMULA-CANTU.md` §3.5 afirmó **«cero ocurrencias»** de `onSelect` y
`selectionStart` en `features/editor`. **La medición se reproduce en su conclusión —nadie
captura el cursor— pero la palabra «cero» es falsa como resultado de barrido: hay dos.**
Detalle y consecuencia en §4.1. **No es una pega de estilo:** una de esas dos ocurrencias es
la prueba, dentro del mismo archivo, de que el elemento se obtiene del evento y de que
reescribir el control compartido nunca fue necesario — que es justo el coste que aquel record
puso como razón principal de su parada.

**Lo demás de aquel record se reproduce entero y se confirma.**

### 12.3 Lint y build

`eslint .` sobre `editor-ui`: **limpio, sin errores ni avisos.**
`vite build` sobre `editor-ui`: **correcto** (`✓ built in 720ms`), con el aviso preexistente
de tamaño de chunk, que no es de este run. **La salida cae en `tools/author-lite/editor-ui/dist/`,
que `.gitignore` ignora (`dist/`, `**/dist/`): no crea ruido de commit.**

---

## 13. QUÉ **NO** SE HIZO

**Por prohibición explícita del encargo:**

- **No se tocó** el compilador, los renderers, los dos esquemas ni el formato del dato
  guardado.
- **No se escribió la previsualización bajo el campo.** Tiene su propio run,
  `RUN-CANTU-INLINE-FORMULA-PREVIEW-001`, en `queue_order 28`, y este taller **no lo tocó, no
  lo movió y no lo clasificó**.
- **No se hizo que el campo renderice matemáticas.** Mientras se autora se ve el texto literal.
- **No se implementó editar una fórmula ya colocada.** Pulsar el botón otra vez inserta una
  nueva en el cursor.
- **No se abrió ningún campo más de los cinco.** `narrative.text` **no se tocó**, y hay un
  test que lo fija. Los modos `code` y `persona` de la tarjeta tampoco, y también están fijados.
- **No se añadió ninguna dependencia.** El control importa `react`, `lucide-react` —ya
  presentes y ya usados por este mismo archivo— y hermanos del propio paquete. Hay un test que
  afirma exactamente esa lista.
- **No se escribió ningún editor nuevo** ni se duplicó ningún control: se reutiliza
  `SmartFormulaModal` tal cual, sin cambiarlo.
- **No se tocó** `.aiw/docs/docs_index.json`, `component_status.json`, la Definition of Done,
  los contratos ni la Guía de componentes.
- **No se tocó** el roadmap canónico, `.project/`, ni el status de ningún run. **No se
  re-emitió `.project/`.** No se insertó, movió ni renumeró ningún run.
- **No se ejecutó Git. No se levantó ningún servidor. No se corrió la suite completa.**
- **No se revalidó ningún componente.**

**Por decisión de alcance, con su porqué:**

- **No se tocó `FormulaInserterShell.jsx`.** Sigue con 0 importadores. Retirarla o reescribirla
  no está en este run y habría ensanchado la superficie sin añadir nada (§3).
- **No se relajó `isSafeToken`.** La restricción se levanta no enrutando esta vía por los
  evaluadores; cambiarla habría empeorado su propio caso de uso (§8.4).
- **No se creó ningún registro de «qué campo admite fórmula».** No existía y no hacía falta:
  el control se pone donde se pone y un test lo cuenta.
- **No se tocó el disparador con barra.** En prosa castellana `/` es un carácter normal.

**Por límite de la medición, declarado:**

- **No se ejecutó la interfaz.** Todo lo de §2 y §4 es lectura de código, y los tests corren en
  Node. **No se abrió el editor en un navegador**, así que **no afirmo nada sobre lo que se ve
  en pantalla**: eso es exactamente lo que el packet del operador existe para comprobar.
- **No se ejecutó React en ningún test.** La existencia del control se afirma sobre el código
  fuente (§9.1).
- **No se ejecutó KaTeX** ni ningún parser HTML. Las fronteras que el run anterior declaró
  siguen en pie sin cambios.
- **La suite del compilador es un recuento estático** (§12.1), no un resultado de ejecución.

**No se reparó ninguna deriva conocida:** ni el mojibake de los dos esquemas, ni los punteros
muertos, ni el CLI local de roadmap, ni el draft del almacén vivo que no valida, ni los HTML
huérfanos, ni la lección de `src/content/lecciones/` que no carga, ni los defectos sin dueño de
los componentes ya revalidados, ni el aviso de dependencia externa del validador, ni la
discrepancia de `Component statuses: 16` contra los 17 ids del catálogo.

**Un defecto preexistente que se vio de paso y NO se tocó, por estar fuera de alcance:**
`formulaInserter.actions.js:430` devuelve `replacementText: '\\\\frac{}{}'` —doble escape— en
el caso de fracción vacía, mientras que el texto que de verdad inserta en `:420` es
`\frac{}{}`. **El campo `latexResult` sí es correcto**, y ningún test mira ese
`replacementText`, así que hoy no rompe nada. **Se nombra para que quede escrito; no es de
este run y no se corrigió.**

---

## 14. STATUS DEL RUN — DECLARADO, NO CAMBIADO

**El run queda en `active`. Este taller NO lo cambia.** Lo cierra el operador desde la consola
global, que es el punto de serialización y la que re-emite `.project/` de forma atómica.

**Status al que debe pasar: `completed`.**

**Qué falta para llegar ahí — solo la QA visual del operador, que el propio
`full_description` exige** (*«This run requires operator visual QA»*):

1. **Ejecutar el packet**
   `docs/_historical_run_record/RUN-CANTU-INLINE-FORMULA-INSERTER-MOUNT-001-OPERATOR-QA-PACKET.md`.
   Son nueve comprobaciones; **las dos con consecuencia de parada van primero** y ninguna
   requiere leer código.
2. **Fijarse en el paso 4**, que es la decisión del operador sobre la selección: seleccionar
   `la mitad` —dos palabras—, ver que se precarga en el editor visual y que se sustituye al
   aceptar. **Es lo que este run levantó y es lo único que ninguna medición puede cerrar sola.**
3. **Cerrar el run desde la consola global.**

**No hay trabajo técnico pendiente dentro del alcance de este run.** Los siete sitios están
montados, el empalme escribe en el cursor, los delimitadores se producen en la forma derivada
de los trece tests del run anterior, esos trece siguen verdes y los 210 de los dieciocho
archivos relacionados también.

**Lo que queda FUERA y no bloquea este cierre:** la previsualización bajo el campo, que tiene
su run en `queue_order 28`; editar una fórmula ya colocada; `narrative.text`; y la carcasa
huérfana, cuya retirada sigue sin dueño.
