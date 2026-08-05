# DESHACER NATIVO DEL INSERTOR DE FÓRMULA (cantu-studio)

**Fecha:** 2026-08-05
**Run:** `RUN-CANTU-INSERTER-NATIVE-UNDO-001` — **derivado por `queue_order 30`, no tecleado** (§1).
**Repo escrito:** `projects/cantu-studio` — **tres archivos**: 1 de producción modificado,
1 test nuevo y el packet de QA (§5, §9, §11).
**Repo escrito:** `projects/aiw-console` — **este record.**
**Veredicto:** **CONSTRUIDO. Ninguna compuerta de parada se disparó.** La compuerta del
criterio 1 se midió en un navegador real **antes de escribir una sola línea** y pasó en sus tres
condiciones. La equivalencia byte a byte salió **idéntica en los cuatro casos, medida dos
veces**. Hay **dos correcciones a records previos** y las dos se dicen en voz alta (§2).

---

## 1. EL RUN, DERIVADO DEL CANÓNICO

Recorrido de `projects/cantu-studio/.aiw/roadmap/roadmap.json`
(`schema_version = jame.roadmap_v3.v0.2-progress`) buscando `queue_order === 30`.
**Una sola coincidencia sobre 73 runs.**

| Campo | Valor derivado |
|---|---|
| `run_id` | **`RUN-CANTU-INSERTER-NATIVE-UNDO-001`** |
| ubicación | objetivo `O5`, fase `O5.P3` |
| `queue_order` | 30 |
| `status` | `active` — **y es el ÚNICO `active` del canónico**, verificado |
| `depends_on` | `[]` — sin dependencias |

**Título en disco, VERBATIM:**

```
Make the formula inserter write through a path the browser records for undo
```

**Comparado carácter a carácter contra el del encargo: `true`. No hay parada por este motivo.**
El validador lo confirma de forma independiente:
`Roadmap v3 active run derived stages: RUN-CANTU-INSERTER-NATIVE-UNDO-001=none` (§12).

El `full_description` se leyó íntegro antes de tocar nada. Pide exactamente lo que el ticket:
verificar que la vía elegida **sigue disponible y se comporta como se midió** antes de fiarse de
ella y parar si no; el alcance es **el insertor y nada más**, unas diez líneas; **no** afirma
cubrir los demás escritores programáticos, que son del run del sistema de historial; y manda
**verificar el recuento contra disco en vez de tomarlo de ahí**. Cierra con
*«This run requires operator visual QA»*.

---

## 2. LOS TRES RECORDS PREVIOS — VERIFICADOS, NO HEREDADOS

Se leyeron enteros los tres que el encargo nombra. **Lo esencial se reproduce; hay DOS
correcciones y las dos se declaran.**

| Afirmación previa | Verificación de hoy |
|---|---|
| `DESHACER-Y-REHACER` §3.1-A/C: la vía del setter **INUTILIZA** la pila nativa, y `queryCommandEnabled('undo')` miente | **CONFIRMADO, reproducido literalmente** en Chromium 148 (§3.1) |
| `DESHACER-Y-REHACER` §3.1-B: `insertText` produce el mismo valor y **deshacer revierte exacto** | **CONFIRMADO** (§3.1) |
| `DESHACER-Y-REHACER` §4-C: la equivalencia byte a byte con el empalme «ya está comprobada» en dos casos | **CONFIRMADA Y AMPLIADA A LOS CUATRO**, medida de nuevo y de dos formas independientes (§4) |
| `DESHACER-Y-REHACER` §3.1-F: «tres `insertText` consecutivos se agrupan en **UN solo paso** de deshacer» | **NO SE REPRODUCE. Es la corrección importante de este run.** Reproducida su secuencia literal —`uno`,`dos`,`tres`—: **son TRES pasos**, no uno (§3.3) |
| `DESHACER-Y-REHACER` §3.2: **81 escritores programáticos**, de los que el del insertor es el único de su clase | **CONFIRMADA LA PARTE QUE IMPORTA —clase A = 1, el del insertor— y CORREGIDA LA CIFRA GLOBAL: mi medición da 96**, y digo por qué difiere (§13) |
| `DESHACER-Y-REHACER` §7: el paquete previo a aquel run era **762,12 kB / gzip 209,95 / CSS 75,46** | **CONFIRMADO AL DÍGITO con un build real** (§10) |
| `CONSTRUCCIÓN` §4.3 y §2.2: el insertor escribe con el **setter del prototipo** + evento `input`; `TextAreaField` no expone `ref` | **CONFIRMADO.** `InlineFormulaField.jsx:57-70` antes de este run; `TextAreaField.jsx` sigue en **31 líneas** y no se tocó |
| `CONSTRUCCIÓN` §2.1: **7 sitios, 8 colocaciones, 5 campos de prosa** | **CONFIRMADO** por recuento propio, y **en las mismas líneas** (§13) |
| `REGLAS` §8: «deshacer **NO SE PUDO MEDIR**», convertido en el paso 7 de su packet | **MEDIDO HOY, y este run es la respuesta a ese paso 7** (§3) |
| `REGLAS` §10.5: el md5 del empalme tras restaurar las mordidas fue `a07d6a19…` | **CONFIRMADO HOY, mismo md5**: el módulo de empalme **no se ha tocado desde entonces** (§8.4) |

**Y un hecho de estado que el encargo obliga a comprobar y que no es menor:** el
`full_description` llama al run 29 *«the retired editor-wide undo run»*. **Verificado en disco:
la ruta B que aquel record describe como construida NO ESTÁ.** No existen
`features/editor/utils/draftHistory.js`, ni `features/editor/hooks/useDraftHistory.js`, ni
`compiler-api/tests/webEditorUndoRedoGlobal.test.mjs`. El run 29 figura como `completed` en el
canónico. **El operador cerró aquel run retirando su implementación y quedándose con la ruta C,
que es la que este run ejecuta.** Se dice porque quien lea aquel record sin esta nota creerá que
hay una pila propia viva, y no la hay.

---

## 3. LA MEDICIÓN DEL CRITERIO 1 — LA COMPUERTA

**Se midió en un navegador real, y ANTES de escribir una línea de producción.** Sonda escrita en
`tools/author-lite/editor-ui/dist/undo-probe.html` —carpeta que `.gitignore` ignora
(`dist/`, `**/dist/`)— y cargada por `file://`. **Los scripts se ejecutan.**
`navigator.userAgent`:

```
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)
Claude/1.25927.0 Chrome/148.0.7778.280 Electron/42.7.0 Safari/537.36 MSIX
```

**Motor: Chromium 148.** *(La sonda se retiró: `vite build` vacía `dist/`; verificado después —
sólo quedan `index.html` y `assets/`.)*

### 3.1 LAS TRES CONDICIONES DE LA COMPUERTA

**(a) ¿ESTÁ DISPONIBLE?**

```
typeof document.execCommand                       'function'
document.queryCommandSupported('insertText')      true
document.execCommand('insertText', false, …)      true      <- aplica
```

**SÍ. Y sin requerir activación de usuario:** la sonda la invoca desde script sobre un
`<textarea>` enfocado y aplica.

**(b) ¿CONSERVA EL HISTORIAL NATIVO?** Las dos vías, con la misma entrada:

```
VIA ACTUAL — writeUncontrolledValue, copiada literal de InlineFormulaField.jsx:57-70
  el autor teclea (por insertText)        "base"
  queryCommandEnabled('undo')             true              <- había historial
  la herramienta escribe (setter)         "base\(x^2\)"     <- la escritura SÍ llega
  queryCommandEnabled('undo')             true              <- el navegador dice que sí
  execCommand('undo')  #1                 true   -> "base\(x^2\)"   <- devuelve true y NO CAMBIA
  execCommand('undo')  #2                 false  -> "base\(x^2\)"
  execCommand('undo')  #3                 false  -> "base\(x^2\)"
  lo tecleado, recuperable                NO

VIA CANDIDATA — setSelectionRange + execCommand('insertText')
  el autor teclea                         "base"
  la herramienta escribe                  "base\(x^2\)"     <- IDÉNTICO byte a byte
  queryCommandEnabled('undo')             true
  execCommand('undo')  #1                 true   -> "base"          <- REVIERTE EXACTO
  execCommand('undo')  #2                 true   -> ""
```

**CONFIRMADO en las dos direcciones.** No es que la escritura del insertor no se registre: es
que **inutiliza la pila que ya había**, y el navegador **miente al preguntarle**.

**(c) ¿DESHACER QUITA LA FÓRMULA Y OTRO DESHACER LO TECLEADO ANTES?** La secuencia exacta del
operador, con las dos vías:

```
VIA CANDIDATA                                 VIA ACTUAL
  teclea    "trabajo del autor "                teclea    "trabajo del autor "
  inserta   "trabajo del autor \(x^2\)"         inserta   "trabajo del autor \(x^2\)"
  undo   -> "trabajo del autor "   <- FÓRMULA   undo   -> "trabajo del autor \(x^2\)"  <- NADA
  undo   -> ""                     <- TECLEADO  undo   -> "trabajo del autor \(x^2\)"  <- NADA
```

**LAS TRES CONDICIONES SE CUMPLEN. LA COMPUERTA NO SE DISPARA.**

### 3.2 EL ESTADO DE OBSOLESCENCIA, CON SU FUENTE

**`document.execCommand` está marcado `Deprecated` Y `Non-standard`.** Fuente:
`developer.mozilla.org/en-US/docs/Web/API/Document/execCommand`, consultada hoy. Sus dos
banderas dicen, en resumen fiel, que la función ya no se recomienda, que puede haber sido
retirada de los estándares y que **puede dejar de funcionar en cualquier momento**; y que la
funcionalidad no está estandarizada.

**Y LA MISMA PÁGINA declara este caso exacto como excepción.** Su nota, en paráfrasis fiel del
original en inglés: aunque el método esté obsoleto, quedan casos de uso válidos que todavía no
tienen alternativa viable — y el ejemplo que da es precisamente que, **a diferencia de la
manipulación directa del DOM, lo que hace `execCommand()` conserva el búfer de deshacer**; para
esos casos recomienda seguir usándolo comprobando el soporte con `queryCommandSupported()`.
**Es literalmente nuestro caso, y es lo que la vía hace.**

**QUÉ PASARÍA SI DEJARA DE EXISTIR — medido, no supuesto:**

| Alternativa | Medida | Resultado |
|---|---|---|
| `element.setRangeText(…)` — la única escritura por rango del estándar | escrita y deshecha en la sonda | **NO conserva la pila**: tras escribir, `undo` no cambia el valor. **No sirve** |
| una API de historial de edición (`document.undo`, `element.insertText`) | `typeof` en la sonda | **`undefined` las dos. No existe** |
| `beforeinput` / `InputEvent` (Input Events L2) | presentes | sirven para **observar** ediciones, no para **provocarlas** conservando la pila |

**Y por eso el punto de escritura lleva una red de seguridad de una línea:** si
`execCommand` desapareciera o devolviera `false`, la escritura **cae al setter de siempre**.
**Se perdería el deshacer; nunca la escritura.** Está afirmado por un test (§9).

### 3.3 LA CORRECCIÓN A `DESHACER-Y-REHACER` §3.1-F — LA GRANULARIDAD **NO** SE AGRUPA

Aquel record midió que tres `insertText` consecutivos se agrupan en **un solo** paso de
deshacer. **Se reprodujo su secuencia literal y NO se reproduce el resultado:**

```
insertText 'uno','dos','tres'   ->  "unodostres"
  undo -> "unodos"      undo -> "uno"      undo -> ""        TRES pasos, no uno
insertText 'uno ','dos ','tres ' (con espacios)               TRES pasos
insertText '\(a\)','\(b\)','\(c\)'                            TRES pasos
```

**Cada llamada es su propio paso de deshacer.** Importa, y por eso se corrige: significa que
**dos fórmulas insertadas seguidas se deshacen una a una**, que es lo que el packet promete. Si
la cifra de aquel record fuera la buena, el packet estaría prometiendo algo falso.

**Y rehacer también funciona:** tras deshacer, `queryCommandEnabled('redo')` es `true` y
`execCommand('redo')` devuelve la fórmula. No se construyó nada para eso: es la pila nativa.

*(Detalle honesto: `execCommand('undo')` sigue devolviendo `true` cuando ya no queda nada que
deshacer, exactamente igual que en la vía vieja. **El valor de retorno no es de fiar en ninguna
de las dos vías**; lo que se mide es el valor del campo.)*

---

## 4. LA EQUIVALENCIA BYTE A BYTE — MEDIDA DOS VECES, CASO POR CASO

**No se tecleó ninguna cadena de resultado.** Las cuatro entradas se pasaron al empalme REAL
(`spliceInlineFormula`) y su salida se usó como referencia. El rango de escritura se derivó
**exactamente como lo hace el punto de escritura nuevo** —`writeStart = cursor − inserted.length`,
`writeEnd = writeStart + replacedText.length`— y se escribió por la vía candidata **en el
navegador**, sobre un valor sembrado por la propia vía del navegador para que la pila existiera
igual que si lo hubiera tecleado el autor.

| Caso | Antes | Rango | Después — vía nueva | Empalme actual | ¿Idéntico? | Cursor | Un deshacer devuelve |
|---|---|---|---|---|---|---|---|
| **1 · sin selección** (`NONE`) | `El resultado es final.` | 15–15 | `El resultado es\(y^2\) final.` | igual | **SÍ** | 22 = 22 | `El resultado es final.` |
| **2 · prosa intacta** (`NO_DELIMITERS`) | `El resultado es la mitad del total.` | 24–24 | `El resultado es la mitad\(y^2\) del total.` | igual | **SÍ** | 31 = 31 | el original |
| **3 · una fórmula** (`ONE_FORMULA`) | `resultado \(12 \\ 32\) final` | 10–22 | `resultado \(y^2\) final` | igual | **SÍ** | 17 = 17 | `resultado \(12 \\ 32\) final` |
| **4 · mixta** (`MIXED`) | `mira \(a\) y \(b\) aqui` | 18–18 | `mira \(a\) y \(b\)\(y^2\) aqui` | igual | **SÍ** | 25 = 25 | el original |

**CUATRO DE CUATRO IDÉNTICOS, y el cursor cae en el mismo sitio en los cuatro.** El caso 3 es el
único que **sustituye** —`writeStart < writeEnd`—; los otros tres insertan. **El único que la
medición previa no había cubierto es justamente el que sustituye una fórmula existente, y
también sale idéntico.**

**Y la segunda medición, independiente del navegador:** un test ejecuta la semántica de la
inserción por rango escrita **a mano en el propio test** —`value.slice(0,start) + inserted +
value.slice(end)`, deliberadamente sin reusar `withReplacement`, para que la comparación no sea
una tautología contra la misma función que produjo el valor esperado— y compara **byte a byte**
convirtiendo las dos cadenas a `Buffer`. **Cuatro de cuatro.**

**Una comprobación adicional que la medición previa no hacía:** el rango derivado del resultado
del empalme coincide con `writeStart`/`writeEnd` del clasificador **en los cuatro casos**. Hay un
test que lo fija, y es lo que garantiza que derivar del resultado no es un atajo frágil.

---

## 5. EL PUNTO DE ESCRITURA — ARCHIVO Y LÍNEA, ANTES Y DESPUÉS

**Un solo archivo de producción:**
`tools/author-lite/editor-ui/src/features/math-authoring/inlineFormula/InlineFormulaField.jsx`,
**230 → 287 líneas**.

| | ANTES | DESPUÉS |
|---|---|---|
| **el punto de escritura** | `:161` — `writeUncontrolledValue(element, result.value);` | `:207-217` — derivar el rango, escribir por la vía nueva, y caer al setter sólo si no dejó la cadena exacta |
| **la función que escribe** | `:57-70` `writeUncontrolledValue` | `:78-90` `writeThroughNativeInsertText` (**nueva**) · `:99-112` `writeUncontrolledValue` (**sin una línea de cambio**, es ahora la red de seguridad) |

**El diff completo, en dos piezas:**

```js
// :207-217 — DESPUES
const writeStart = result.cursor - result.inserted.length;
const writeEnd = writeStart + result.replacedText.length;

const wroteNatively = writeThroughNativeInsertText(element, writeStart, writeEnd, result.inserted)
  && element.value === result.value;

if (!wroteNatively) {
  writeUncontrolledValue(element, result.value);
}
```

```js
// :78-90 — la funcion nueva
function writeThroughNativeInsertText(element, start, end, inserted) {
  if (typeof document === 'undefined' || typeof document.execCommand !== 'function') return false;
  try {
    element.focus();
    element.setSelectionRange(start, end);
    return document.execCommand('insertText', false, inserted) === true;
  } catch { return false; }
}
```

**Once líneas de código efectivas.** El resto del crecimiento del archivo es comentario: la
medición, la obsolescencia y su consecuencia, escritas donde se leen.

### 5.1 LAS DOS DECISIONES QUE NO ERAN OBVIAS, DECLARADAS

**(a) EL RANGO SE DERIVA DEL RESULTADO, NO SE RECLASIFICA.** La alternativa era volver a llamar
a `classifyInlineFormulaSelection` en el confirmar para leer su `writeStart`/`writeEnd`. **Se
descartó con motivo escrito en el propio módulo por el run anterior:** clasificar dos veces es
exactamente lo que aquel run cerró, porque abrir y aceptar podrían discrepar. La derivación sale
del **mismo objeto** que produjo `result.value`, así que no puede discrepar por construcción. Hay
un test que fija que el control sigue clasificando **una sola vez**.

**(b) LA COMPARACIÓN `element.value === result.value` NO ES DECORATIVA.** Es lo que convierte el
criterio 3 en una garantía de ejecución y no sólo de test: si la vía nueva dejara cualquier otra
cosa en el campo —en un motor distinto, en una versión futura, con un `<textarea>` que se
comporte de otro modo—, **se reescribe por la vía de siempre y el dato es el del empalme**. El
precio de equivocarse aquí es una pila de deshacer sucia; el precio de no comprobarlo sería un
dato distinto, que es peor. Hay un test que fija que la comparación existe.

---

## 6. LO QUE NO CAMBIÓ, VERIFICADO

| Pieza | Verificación | Resultado |
|---|---|---|
| `inlineFormulaSplice.js` | md5 hoy `a07d6a192532f47bf777e76b27bab52b` — **el mismo que `REGLAS` §10.5 dejó fechado** | **309 líneas, INTACTO** |
| las cuatro reglas de selección | los 10 tests que las fijan, ejecutados | **10 de 10 verdes** (§9.2) |
| `WebBlockEditor.jsx` | recuento y líneas de los 7 sitios | **4118 líneas, los 7 en `:1162, :1874, :1914, :2468, :2630, :3981, :4076` — las mismas** |
| `TextAreaField.jsx` | leído | **31 líneas, sin tocar** |
| el editor visual de fórmulas | `math-authoring/smartFormulaField/` sin tocar; sus tests verdes | **INTACTO** |
| el formato del dato guardado | los 13 del bloqueo, ejecutados | **13 de 13 verdes** (§9.3) |
| `.aiw/docs/docs_index.json` | md5 antes y después | `bc708a5847f66291ea1cd719eb6a0ecb` — **el mismo que dejó el record anterior** |

---

## 7. EL CRITERIO 5 — EL FORMULARIO SE ENTERA. MEDIDO, NO SUPUESTO

**Es la comprobación que el ticket declara más importante que el deshacer**, y se midió en el
navegador replicando el **rastreador de valor de React** (el `inputValueTracking` de ReactDOM:
`get`/`set` sobre la instancia delegando en el descriptor del prototipo), que es la condición
para que React entregue `onChange` y, por tanto, para que React Hook Form lea el campo:

| | evento `input` | `isTrusted` | `bubbles` | `inputType` | ¿rastreador obsoleto al dispararse? |
|---|---|---|---|---|---|
| **vía nueva** (`insertText`) | **1** | **true** | true | `insertText` | **SÍ** |
| vía actual (setter) | 1 | false | true | `null` | sí |

**LAS DOS DEJAN EL RASTREADOR OBSOLETO Y LAS DOS EMITEN UN `input` QUE BURBUJEA.** La diferencia
es que el de la vía nueva es **de confianza y lo emite el propio navegador**, no un
`new Event('input')` fabricado. **React lo entrega igual al `onChange` que RHF ya tiene puesto en
ese `<textarea>`, y RHF lee `_f.ref.value`, o sea el valor del elemento registrado.** No hace
falta `setValue`, ni `Controller`, ni pasar nada nuevo por props: es el mismo camino de siempre.

**La compuerta del criterio 5 no se dispara.** Hay dos tests que lo fijan: uno para la vía nueva
y otro para la red de seguridad.

**FRONTERA DECLARADA:** esto se midió sobre una réplica del rastreador de React, no sobre React
ejecutándose. **El borrador guardado y la vía de autoguardado se comprueban en el paso 2 del
packet**, que manda guardar y reabrir.

---

## 8. LO CONSTRUIDO Y LO RESTAURADO

### 8.1 Producción (1 modificado, 0 nuevos)

| Archivo | Cambio | Alcance |
|---|---|---|
| `math-authoring/inlineFormula/InlineFormulaField.jsx` | la función de escritura nueva, la derivación del rango y la red de seguridad | 230 → **287** líneas · **11 líneas de código** |

### 8.2 Tests (1 nuevo, 0 ajustados)

| Archivo | Qué |
|---|---|
| `compiler-api/tests/webInlineFormulaInserterNativeUndo.test.mjs` | **NUEVO, 9 tests** |

**Ningún test existente se tocó, se relajó ni se borró.** Que no hiciera falta ajustar ninguno es
la señal de que la conducta no cambió: el ticket dice que sólo cambia **cómo** se escribe, y
ningún test afirmaba nada sobre el cómo.

### 8.3 El packet de QA

`docs/_historical_run_record/RUN-CANTU-INSERTER-NATIVE-UNDO-001-OPERATOR-QA-PACKET.md`
(§11).

### 8.4 Restauraciones verificadas

Todo lo que se rompió a propósito se restauró y se comprobó:

```
InlineFormulaField.jsx   md5 b792c7f8b93589343575aad1952db1e0   diff vacío
inlineFormulaSplice.js   md5 a07d6a192532f47bf777e76b27bab52b   diff vacío
```

**Los respaldos vivieron en el scratchpad de sesión, fuera de los dos repos.**

---

## 9. LOS TESTS

### 9.1 El archivo nuevo — 9 declaraciones

```bash
node --test tools/author-lite/compiler-api/tests/webInlineFormulaInserterNativeUndo.test.mjs
```

```
✔ the write point goes through the browser's own insert-text path, bounded to the splice range (4.9426ms)
✔ the range the write point derives reproduces the splice value byte for byte, in the four selection cases (1.3609ms)
✔ the range derived from the splice result is the range the classifier decided, in the four cases (0.2516ms)
✔ the derivation the control uses is the one measured here, not a second classification (1.4534ms)
✔ the form still finds out: the native path leaves an input event and the exact spliced value on the field (0.5182ms)
✔ the safety net keeps the data when the deprecated path refuses: the value still lands and the form is still told (0.2281ms)
✔ the splice module and the selection rules were not touched: only how the result is written (1.0085ms)
✔ no other programmatic writer was reached: the insert-text path exists in exactly one file (38.3374ms)
✔ no new dependency and no undo stack of our own: the control imports exactly what it imported (1.1488ms)
ℹ tests 9
ℹ suites 0
ℹ pass 9
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 148.539
```

**Cobertura contra el criterio 8, punto por punto:**

| Lo que el criterio pide | Test |
|---|---|
| que la escritura usa la vía nueva | `the write point goes through the browser's own insert-text path…` — y afirma también **el orden**: la vía nueva primero, el setter sólo como red |
| que el resultado es idéntico en los cuatro casos | `the range the write point derives reproduces the splice value byte for byte…` + `the range derived from the splice result is the range the classifier decided…` |
| que el formulario recibe el valor | `the form still finds out…` + `the safety net keeps the data when the deprecated path refuses…` |

Los tres restantes impiden que el cambio crezca: que el empalme sigue puro, que la vía nueva
existe **en exactamente un archivo** de todo el editor, y que no entra ninguna dependencia ni
ninguna pila propia ni ningún atajo de teclado.

**FRONTERA DECLARADA, y es la misma de los tres runs anteriores: NO SE EJECUTA REACT NI UN
NAVEGADOR EN LOS TESTS.** El empalme y la semántica de la escritura por rango se ejecutan de
verdad; lo que se afirma sobre el control se afirma sobre su **código fuente**, que es el método
que ya usan los demás tests de esa carpeta. Lo que conserva el historial nativo se midió en el
navegador (§3) y lo que el autor ve lo comprueba el packet.

### 9.2 Los diez de las reglas de selección — criterio 4

```bash
node --test tools/author-lite/compiler-api/tests/webInlineFormulaSelectionRules.test.mjs
```

```
✔ with no selection the inserter still writes at the cursor and changes nothing around it (4.8993ms)
✔ a selection with no delimiters is left untouched and nothing is preloaded (0.3124ms)
✔ a price is prose, not a delimiter: a single dollar sign does not send the selection to the fourth case (0.1731ms)
✔ a selection that is exactly one formula loads without its delimiters and replaces that formula (1.7052ms)
✔ the formula is recognised with whitespace dragged around it, and only the formula is replaced (0.7504ms)
✔ a mixed selection replaces nothing, preloads nothing and tells the author why (0.83ms)
✔ the fourth case notice reaches the interface, in Spanish and on one line (0.8511ms)
✔ the operator failing case is caused by loading the delimiters, and stripping them fixes it (2.8985ms)
✔ the operator failing case round-trips byte for byte through the new rule (0.3499ms)
✔ the recognised delimiter set is derived from the one module that declares it (1.9715ms)
ℹ tests 10
ℹ pass 10
ℹ fail 0
```

**LAS CUATRO REGLAS SIGUEN INTACTAS**, cada una con su test verde: sin selección; prosa que queda
sin tocar; exactamente una fórmula editada sin sus delimitadores; selección mixta que avisa y no
reemplaza. **Ninguno se puso rojo. No hay nada que reportar por este motivo.**

### 9.3 Los trece del bloqueo — criterio 6

```bash
node --test tools/author-lite/compiler-api/tests/webInlineFormulaProseBehaviourLock.test.mjs
```

```
ℹ tests 13
ℹ pass 13
ℹ fail 0
```

**13 de 13 EN VERDE.** Y hay una razón estructural: este run **no tocó el compilador, ni los
renderers, ni ninguno de los dos esquemas, ni el formato guardado, ni la cadena que se escribe**.
Lo único que cambia es por qué camino llega esa cadena al campo. **Mismo valor guardado, mismo
leído, misma salida compilada.**

### 9.4 Lo tocado y lo directamente relacionado — **NO la suite completa**

**18 archivos**, localizados por barrido de los que mencionan el insertor, el control, el empalme
o `math-authoring`, **no por memoria**: el nuevo, los 10 de las reglas, los 16 del montaje, los 13
del bloqueo, los del insertor y el campo inteligente, y los de las superficies que comparten
código con ellos.

```bash
node --test \
  tools/author-lite/compiler-api/tests/webInlineFormulaInserterNativeUndo.test.mjs \
  tools/author-lite/compiler-api/tests/webInlineFormulaSelectionRules.test.mjs \
  tools/author-lite/compiler-api/tests/webInlineFormulaInserterMount.test.mjs \
  tools/author-lite/compiler-api/tests/webInlineFormulaProseBehaviourLock.test.mjs \
  tools/author-lite/compiler-api/tests/mathAuthoringFormulaInserter.test.mjs \
  tools/author-lite/compiler-api/tests/mathAuthoringFoundation.test.mjs \
  tools/author-lite/compiler-api/tests/mathAuthoringSmartFormulaField.test.mjs \
  tools/author-lite/compiler-api/tests/mathAuthoringSmartFormulaFieldContractStability.test.mjs \
  tools/author-lite/compiler-api/tests/mathAuthoringAllowlistExpansion.test.mjs \
  tools/author-lite/compiler-api/tests/mathAuthoringFormulaEditorMessageAndUprightConstants.test.mjs \
  tools/author-lite/compiler-api/tests/mathAuthoringFormulaEditorSurfaceState.test.mjs \
  tools/author-lite/compiler-api/tests/mathAuthoringVirtualKeyboardKatexCompatibility.test.mjs \
  tools/author-lite/compiler-api/tests/webRuleMathAuthoringIntegration.test.mjs \
  tools/author-lite/compiler-api/tests/webRuleSmartFormulaFieldRulePilot.test.mjs \
  tools/author-lite/compiler-api/tests/webColorSelectorCustomPicker.test.mjs \
  tools/author-lite/compiler-api/tests/webHeaderColorPaletteAuthoringSurface.test.mjs \
  tools/author-lite/compiler-api/tests/webHeaderPaletteQuantityAndSwatch.test.mjs \
  tools/author-lite/compiler-api/tests/webSharedColorSelectorUnification.test.mjs
```

```
ℹ tests 205
ℹ suites 0
ℹ pass 205
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 801.1778
```

**205 de 205 en verde. NADA VERDE SE PUSO ROJO, en ninguna tanda.** Se dice explícitamente
porque el record del run 29 sí tuvo que reportar un rojo, y este no.

### 9.5 LA COMPROBACIÓN DE MORDIDA — **TRES mordidas, con su rojo y su restauración**

**MORDIDA 1 — la derivación del rango en el control** (`writeEnd = writeStart`, que convertiría
toda sustitución en inserción):

```
✖ the derivation the control uses is the one measured here, not a second classification
ℹ tests 9 | pass 8 | fail 1
```

**MORDIDA 2 — el cursor que devuelve el empalme** (`cursor: end + inserted.length`, que rompe la
premisa de la que se deriva el rango):

```
✖ the range the write point derives reproduces the splice value byte for byte, in the four selection cases
✖ the range derived from the splice result is the range the classifier decided, in the four cases
✖ the form still finds out: the native path leaves an input event and the exact spliced value on the field
ℹ tests 9 | pass 6 | fail 3
```

**Muerde en los tres tests ejecutables a la vez, y muerde sobre el criterio 3.**

**MORDIDA 3 — se vuelve a la vía vieja como escritura principal**, que es literalmente el defecto
que este run existe para arreglar:

```
✖ the write point goes through the browser's own insert-text path, bounded to the splice range
ℹ tests 9 | pass 8 | fail 1
```

**UNA FRONTERA DE LAS MORDIDAS, DECLARADA EN VEZ DE DISIMULADA.** La mordida 1 tocó el control y
**los tests de equivalencia siguieron verdes**: usan su propia copia de la derivación, así que
miden que **la regla** es correcta, no que el control la use. **Lo que ata el control a esa regla
es el cuarto test, y es el que se puso rojo.** Los dos se necesitan y por eso están los dos.

**Restauración verificada con `diff` y md5 contra los respaldos previos a las mordidas: los dos
archivos IDÉNTICOS** (`b792c7f8…`, `a07d6a19…`). Los 9 y los 205 vuelven a estar en verde,
`eslint` limpio y `vite build` correcto.

---

## 10. LINT, BUILD Y PAQUETE — CON DOS BUILDS REALES

`eslint .` sobre `editor-ui`: **limpio, sin errores ni avisos**, en los dos estados.
`vite build`: **correcto** en los dos, con el aviso preexistente de tamaño de chunk, que no es de
este run.

Se reconstruyó el estado **previo** —revirtiendo las dos ediciones sobre el archivo respaldado,
hasta dejarlo otra vez en 230 líneas— y se construyó de verdad. Después se restauró y se volvió a
construir.

| Recurso | **Antes** | **Después** | Diferencia |
|---|---|---|---|
| `dist/assets/index-*.js` | **762,12 kB** (gzip 209,95) | **762,42 kB** (gzip 210,04) | **+0,30 kB** (gzip **+0,09**) |
| `dist/assets/index-*.css` | **75,46 kB** (gzip 13,45) | **75,46 kB** (gzip 13,45) | **0 — sin cambio** |
| `dist/assets/mathlive.min-*.js` | 808,02 kB | 808,02 kB | **0 — mismo hash** |

**No se mueve de forma apreciable, y era lo esperado:** el cambio sustituye código por código.
Los **+0,30 kB** son la función nueva de nueve líneas más la derivación del rango, minificadas;
no entra ninguna dependencia y no se añade ni una regla de CSS.

**El «antes» casa AL DÍGITO con la cifra que `DESHACER-Y-REHACER` §7 dejó fechada como estado
previo a aquel run** (762,12 / 209,95 / 75,46 / 13,45). **Es una confirmación independiente en dos
direcciones a la vez:** que la reconstrucción del estado previo es fiel, y que **la retirada de la
ruta B dejó el paquete exactamente donde estaba antes de construirla.**

---

## 11. EL PACKET DE QA

```
projects/cantu-studio/docs/_historical_run_record/RUN-CANTU-INSERTER-NATIVE-UNDO-001-OPERATOR-QA-PACKET.md
```

**Colocado junto a los otros diecisiete packets. `.aiw/docs/docs_index.json` NO se tocó** —md5
verificado antes y después—.

**Seis comprobaciones. Las dos de parada van primero:**

- **Paso 1 (parada) — EL CASO EXACTO DEL RUN**: teclear prosa, insertar una fórmula, y pulsar
  **Ctrl+Z**. Se espera que **primero desaparezca la fórmula entera** y que **un segundo Ctrl+Z
  se lleve lo tecleado**. El orden es parte del resultado esperado.
- **Paso 2 (parada) — EL DATO NO CAMBIÓ**: leer la cadena carácter a carácter, **guardar y
  reabrir**. Es la comprobación del criterio 5 que el taller no puede hacer sin levantar el
  servidor.
- **Pasos 3 a 6: uno por cada una de las cuatro reglas de selección**, para confirmar que no se
  rompieron. El paso 5 añade además un deshacer sobre el único caso que **sustituye**.

**Y el packet responde por escrito al paso 7 del packet anterior**, que quedó sin resultado
esperado a propósito porque aquel taller no pudo medir deshacer.

**Etiquetas de plataforma, DERIVADAS de `blockCatalog.js` y no inventadas** — se localizaron las
cinco:

| `id` en el catálogo | `label` VERBATIM |
|---|---|
| `web-details` | **Nota desplegable** |
| `web-callout` | **Nota destacada** |
| `web-card` | **Tarjeta** |
| `web-concept-grid` | **Comparador de conceptos** |
| `web-rule` | **Regla matemática** |

*(y `web-narrative` = **Texto**, el campo que deliberadamente NO tiene control.)*

**NINGUNA ETIQUETA FALTA, y el packet lo dice explicando por qué:** este run **no añade ningún
control ni ninguna superficie nueva**, así que no hay nada nuevo que nombrar. Todos los elementos
que el operador toca ya existían y ya tenían su etiqueta. **No se inventó ninguna.**

---

## 12. VALIDADOR — SALIDA COMPLETA

Ejecutado por **la vía que no escribe**, desde `projects/cantu-studio`:

```bash
node tools/project-console/validate-project-console-state.mjs
```

```
Project Console state validation passed.
Roadmap v3 prototype: 7 objectives / 28 phases / 73 runs; queue groups needs_human_decision=0 now=1 ready_next=15 later=26 history=31
Roadmap v3 active run derived stages: RUN-CANTU-INSERTER-NATIVE-UNDO-001=none
Docs indexed: 149
Docs curated primary-visible: 60 of 149 registered
Component statuses: 16
Git provenance episodes: 9
Git history snapshot: 508 commits / 1 branches (1 visible, 0 backup hidden); current=main; run-associated=3; source=local_git_autosync
Roadmap rebase warnings (non-blocking):
- .aiw/roadmap/roadmap.json run RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 depends on RUN-CANTU-ROADMAP-CONTENT-AUDIT-001, which does not resolve in this roadmap. With a single roadmap loaded this cannot be decided: it may be a legal external dependency — a run that lives in another project (CONTRATO §10.d Regla 2) — or a typo in the run id. Both are possible and one loaded roadmap cannot tell them apart; resolve it against the full set of projects to distinguish external from write error.
```

**Cifras reales leídas de la salida — el ticket no las daba a propósito:**

- **total de runs: 73**
- **`history=31`**
- **`ready_next=15`**
- otros grupos: `needs_human_decision=0`, `now=1`, `later=26`
- 7 objetivos / 28 fases

**Recuento propio sobre `roadmap.json`, independiente:** 73 runs — `completed=31`, `planned=41`,
`active=1`. **`completed=31` casa con `history=31`, y 31+1+15+26 = 73.** El único `active` es el
`queue_order 30`.

**Movimiento contra el record anterior:** `DESHACER-Y-REHACER` §10 dejó **71 runs**,
`history=30`, `now=1`, `ready_next=15`, `later=25`. Hoy: **73**, `history=31`, `now=1`,
`ready_next=15`, `later=26`. **Dos runs más y una entrada más en el historial**, movimientos del
operador entre las dos mediciones —entre ellos el cierre del `queue_order 29` y el alta de este—.
**Este taller no movió ninguno.**

**El aviso no bloqueante de la dependencia externa apareció, es el conocido y legal, no es
hallazgo y NO se reparó** (§14).

**`Docs indexed: 149` no se movió, y es lo correcto:** el packet nuevo se escribió junto a los
otros diecisiete pero **`.aiw/docs/docs_index.json` NO se tocó**.

---

## 13. LAS CIFRAS DEL TICKET — VERIFICADAS UNA A UNA

| Cifra | Cómo se verificó | Resultado |
|---|---|---|
| **Cinco campos de prosa** | leído el `register()` de cada uno de los 7 sitios: `details.items[].content`, `callout.content`, `card(normal).content`, `conceptGrid.items[].content`, `rule.description` | **CONFIRMADA — 5** |
| **Siete sitios** | recuento de `<InlineFormulaField` en `WebBlockEditor.jsx`: `:1162, :1874, :1914, :2468, :2630, :3981, :4076` | **CONFIRMADA — 7, y en las mismas líneas que el run anterior** |
| **Ocho colocaciones** | `COLUMN_CHILD_OPTIONS` leído entero —ocho hijos: header, list, iconList, rule, card, callout, narrative, table; **sin `details` ni `conceptGrid`**— + las **dos** invocaciones de `CardFields` (`:1933`, `:3962`) | **CONFIRMADA — 8**: details 1 · callout 2 · card 2 · conceptGrid 1 · rule 2 |
| **Trece tests del bloqueo** | recuento de `^test(` **y** ejecución | **CONFIRMADA — 13, y 13 en verde hoy** |
| **Unos ochenta escritores programáticos** | censo propio sobre el **grafo vivo** desde `src/main.jsx` | **EL ORDEN DE MAGNITUD SE CONFIRMA; LA CIFRA EXACTA DIFIERE: mi medición da 96, no 81** (§13.1) |
| **Recuento de la suite** | recuento estático de `^test(` sobre los `.test.mjs` | **36 archivos, 398 declaraciones — RECUENTO ESTÁTICO, NO resultado de ejecución** (§13.2) |
| **Etiquetas de plataforma** | leídas de `blockCatalog.js` por `id` | **CONFIRMADAS, las cinco** (§11) |

### 13.1 Los escritores programáticos — la cifra que corrijo, y por qué difiere

**Grafo vivo, remedido:** **86 módulos vivos** alcanzables desde `src/main.jsx`, de **107**
archivos `.js/.jsx` en `src` sin `experiments/`; **21 huérfanos**. *(`DESHACER-Y-REHACER` §3.2
midió 87 vivos y 20 huérfanos. La diferencia es exactamente el módulo de la ruta B que aquel run
creó y que ya no existe.)*

**El censo, sólo sobre módulos vivos y con la regla escrita:**

| Clase | Mi medición | La previa | Nota |
|---|---|---|---|
| **A. Escritura directa al DOM del campo** | **1 punto de escritura**, 1 archivo | 1 | **CASA. Es el del insertor, y sigue siendo el único de su clase en todo el editor vivo** |
| **B. `setValue` de React Hook Form** | **0** | 0 | **CASA.** El único `setValue` vivo es `SmartFormulaPreview.jsx:55`, y es **el de MathLive sobre un mathfield**, no el de RHF |
| **C. `reset` de RHF** | **8**, en `EditorPage.jsx` | 8 | **CASA** |
| **D. Mutadores de `useFieldArray`** | **12** llamados por su nombre en el archivo que los ata | 18 | **DIFIERE, y sé por qué:** `moveWeb`/`moveSlide` y otros **se pasan como props** y se invocan en el hijo con otro nombre; mi barrido no sigue props y los pierde. **La cifra previa es la mejor aquí** |
| **E+F. `onChange` puesto por código** | **74** en 4 archivos vivos que importan RHF | 54 en 6 | **DIFIERE:** yo cuento `onChange={` de forma mecánica; la previa los clasificó a mano en «compuesto» y «pasarela» y descartó los que no fijan un campo del borrador |
| **TOTAL** | **96** | 77 / 81 | |

**QUÉ SE PUEDE AFIRMAR Y QUÉ NO.** Las dos mediciones difieren en el método, no en el hecho: **hay
del orden de ochenta a cien puntos del editor que fijan el valor de un campo sin que el autor
teclee en él, y ninguno de ellos —salvo el que este run arregla— está en la pila nativa del
navegador.** La taxonomía exacta **es del run del sistema de historial**
(`RUN-CANTU-EDITOR-HISTORY-SYSTEM-001`, `queue_order 59`) y **no se cierra aquí**.

**Lo que sí se confirma con precisión, porque es de lo que depende este run: la clase A vale UNO,
es el del insertor, y es el único de su clase.** Hay un test que fija que la vía nueva vive en
**exactamente un archivo**.

### 13.2 La suite — lo que afirmo y lo que no

**Recuento estático, ejecutado:** **36** archivos `.test.mjs`, **398** declaraciones `test()` a
principio de línea. Sin `t.test(` (0) ni `describe(` (0): no hay subtests que inflen la cifra.
Casa con el `389 + 9` de este run; y el **389** es el `404 − 15` que dejó la retirada del archivo
de tests de la ruta B, confirmado en disco.

**NO afirmo «398 en verde».** Eso exigiría correr la suite entera, que el ticket excluye y que
`CLAUDE.md` desaconseja con talleres en paralelo. **Lo ejecutado y verde son 205 tests en 18
archivos** (§9.4).

**Otras cifras medidas de paso:** `WebBlockEditor.jsx` **4118** líneas, `inlineFormulaSplice.js`
**309**, `TextAreaField.jsx` **31** — **las tres sin moverse**. `InlineFormulaField.jsx` pasa de
**230** a **287**, y es el único archivo de producción que este run toca.

---

## 14. QUÉ **NO** SE HIZO

**Por prohibición explícita del encargo:**

- **No se tocó ningún otro escritor programático.** La vía nueva vive en **exactamente un
  archivo**, y hay un test que barre `features/` y `components/` enteros para fijarlo. Los demás
  son del run del sistema de historial y **no se abrieron**.
- **No se añadió ningún control visible de deshacer, ninguna pila propia, ningún atajo de
  teclado.** Hay un test que lo fija sobre el código del control.
- **No se tocó el editor visual de fórmulas.** `math-authoring/smartFormulaField/` sin una línea
  de cambio; conserva su pila.
- **No se cambió la lógica del empalme ni las reglas de selección.** `inlineFormulaSplice.js` con
  el **mismo md5** que dejó fechado el record anterior. Sólo cambia **cómo** se escribe.
- **No se tocó** el compilador, los renderers, los dos esquemas ni el formato del dato guardado.
- **No se tocó el control compartido de área de texto.** `TextAreaField.jsx` sigue en 31 líneas.
- **No se añadió ninguna dependencia.** El control importa lo mismo que importaba —`react`,
  `lucide-react` y hermanos del propio paquete— y hay un test que compara la lista entera. **La
  compuerta del criterio 15 por dependencia nueva no se disparó**: la vía elegida no necesita
  ninguna, porque es del propio navegador.
- **No se revalidó ningún componente.** No se tocó la Guía de componentes,
  `component_status.json`, la Definition of Done ni los contratos.
- **No se tocó** `.aiw/docs/docs_index.json` —md5 verificado antes y después—.
- **No se tocó el roadmap canónico, `.project/`, ni el status de ningún run. No se re-emitió
  `.project/`.** No se insertó, movió, renumeró ni clasificó ningún run.
- **No se ejecutó Git. No se levantó ningún servidor. No se corrió la suite completa.**

**Por decisión de alcance, con su porqué:**

- **No se retiró la vía vieja.** Queda como red de seguridad y es deliberado: es la única
  escritura que no depende de una API deprecada (§3.2, §5.1b). Borrarla habría dejado el insertor
  sin escribir el día que el navegador retire `execCommand`.
- **No se cerró la taxonomía de los escritores programáticos** (§13.1). Es del run del sistema de
  historial.
- **No se tocó `FormulaInserterShell.jsx`**, que sigue con cero importadores, ni ninguno de los
  otros 20 huérfanos.

**Por límite de la medición, declarado:**

- **No se ejecutó la interfaz completa.** El navegador se usó para una **sonda aislada**, no para
  el editor: eso habría exigido levantar el servidor, que está fuera de alcance. **No afirmo nada
  sobre lo que se ve en pantalla**; eso es lo que el packet existe para comprobar.
- **No se ejecutó React en ningún test**, y la verificación del criterio 5 se hizo sobre una
  **réplica** del rastreador de valor de ReactDOM, no sobre React ejecutándose (§7).
- **La medición del navegador es de UN motor, Chromium 148.** No afirmo nada sobre Firefox ni
  Safari. Es el motor en el que trabaja el operador, así que cubre el caso real, pero la frontera
  se dice.
- **No se pudo sintetizar una pulsación real de Ctrl+Z** (los eventos de teclado desde script no
  son de confianza). Se midió `document.execCommand('undo')`, que es **el mismo comando de edición
  al que el atajo llega**. Que el atajo físico funcione lo comprueba el paso 1 del packet.
- **La suite es un recuento estático** (§13.2), no un resultado de ejecución.

**No se reparó ninguna deriva conocida:** ni el mojibake de los dos esquemas, ni los punteros
muertos, ni el CLI local de roadmap, ni los HTML huérfanos, ni el anidamiento de fórmulas del
insertor, ni la lección de `src/content/lecciones/` que no carga, ni los defectos sin dueño de los
componentes ya revalidados, ni el aviso de dependencia externa del validador, ni la discrepancia
de `Component statuses: 16` contra los 17 ids del catálogo, ni el
`replacementText: '\\\\frac{}{}'` doblemente escapado de `formulaInserter.actions.js:430`.

---

## 15. STATUS DEL RUN — DECLARADO, NO CAMBIADO

**El run queda en `active`. Este taller NO lo cambia.** Lo cierra el operador desde la consola
global, que es el punto de serialización y la que re-emite `.project/` de forma atómica.

**Status al que debe pasar: `completed`.**

**Qué falta para llegar ahí:**

1. **Ejecutar el packet de QA** de §11. Seis comprobaciones; **las dos de parada van primero y la
   primera es el caso exacto que motivó el run**: teclear, insertar, deshacer, y ver volver la
   fórmula primero y lo tecleado después.
2. **Fijarse en el paso 2**, que es lo único que este taller no pudo cerrar sin levantar el
   servidor: que el valor llega igual al borrador guardado y sobrevive a reabrirlo.
3. **Cerrar el run desde la consola global.**

**No hay trabajo técnico pendiente dentro del alcance de este run.** La vía se verificó en un
navegador real antes de usarla y cumple las tres condiciones de la compuerta; el punto de
escritura es el único cambio; la equivalencia byte a byte sale idéntica en los cuatro casos
medida de dos formas; las cuatro reglas de selección siguen verdes; los trece del bloqueo siguen
verdes; los nueve nuevos muerden; y el paquete se mueve **+0,30 kB**.

**Lo que queda FUERA y no bloquea este cierre:** los demás escritores programáticos del editor y
su taxonomía exacta, que son de `RUN-CANTU-EDITOR-HISTORY-SYSTEM-001` en `queue_order 59`;
cualquier control visible de deshacer; el anidamiento de fórmulas del insertor; y los 21
huérfanos.

**Una advertencia que este record deja escrita para quien venga después:** la vía que este run
usa está **deprecada y no es estándar**, y su propia documentación avisa de que puede dejar de
funcionar en cualquier momento. **Hoy es la única que conserva el historial de edición, y está
medido que la alternativa del estándar no lo hace.** Si algún día desaparece, el insertor seguirá
escribiendo por la red de seguridad y **el deshacer volverá a perderse en silencio**: conviene que
el run del sistema de historial lo tenga delante cuando decida su arquitectura.
