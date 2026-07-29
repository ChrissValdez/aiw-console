# Señal de vista previa inválida, botón y tipografía del editor de fórmulas (cantu-studio)

- **Run:** `RUN-CANTU-MATH-ALLOWLIST-EXPANSION-AND-FORMULA-EDITOR-001` (queue_order 11, carril `DEVELOPMENT`, objetivo O5 «Editor and Engine Shared Features», fase O5.P1 «Smart Formula Field and Keyboard»)
- **Fecha:** 2026-07-29 · **Tercer y último encargo** del run. Los dos anteriores (`AMPLIACION-ALLOWLIST-MATH-Y-EDITOR-FORMULAS-CANTU.md` y `MENSAJE-DEL-MODAL-Y-HUECO-MATHLIVE-KATEX-CANTU.md`) se leyeron enteros antes de tocar nada.
- **Guarda del canónico:** el `run_id` se derivó de `.aiw/roadmap/roadmap.json` por `queue_order` 11 — hay **exactamente un** run con ese `queue_order` — y el título coincide verbatim con el del encargo: «Expand the math allowlist and repair the formula editor surface». **La guarda NO saltó.**
- **Carril:** el run no lleva campo `lane` propio; `DEVELOPMENT` es el carril `"default": true` del canónico (`lanes[0]`), que es de donde sale la asignación. Medido, no heredado.
- **Roadmap medido en esta sesión:** **7 objetivos / 28 fases / 73 runs**.

## El run, leído verbatim del canónico (sus tres campos)

- **`title`:** «Expand the math allowlist and repair the formula editor surface».
- **`summary`:** «Expand the rule.math allowlist to cover upper-secondary and undergraduate mathematics, repair the error message so it names the rejected command, and fix the formula editor surface shared by every math-capable component.»
- **`full_description`:** cierra con «Repair the formula editor surface that every math-capable component shares: the advanced LaTeX field, its typography and sizing, and the formula editing entry point. This Run owns the shared formula authoring surface because six components consume it and Rule is the reference implementation the others will copy». **Ese es exactamente el alcance de este encargo**, la parte (C) del run.

`status` leído: `active`. `depends_on`: `[]`.

## Medición ANTES de tocar

### (A) ¿Qué patrón visual usa este editor para «contenido no válido»?

Se midió antes de inventar nada. El editor ya tiene **dos niveles distintos**. Todas las referencias `archivo:línea` de este record apuntan al **estado actual** de los archivos, para que se puedan abrir tal cual:

| Recurso | Dónde (archivo:línea) | Clases medidas | Qué marca |
|---|---|---|---|
| Textarea del fallback | `SmartFormulaField.jsx:31` | `border-amber-200 bg-amber-50/40 … focus:border-amber-300 focus:ring-2 focus:ring-amber-100` | Ámbar **sobre la superficie de contenido misma** |
| Banner del fallback | `SmartFormulaField.jsx:879` | `border border-amber-200 bg-amber-50 … text-amber-800` | Ámbar |
| Chip de mensaje del campo | `SmartFormulaField.jsx:892` | `border-amber-200 bg-amber-50 … text-amber-800` | Ámbar |
| Mensaje del LaTeX textual | `WebBlockEditor.jsx:675` | `text-amber-700` cuando el texto contiene «inválido» | Ámbar |
| `FieldError` | `common/FieldError.jsx:5` | `text-red-600` | **Rojo** = error de formulario/schema, otro nivel |

**Conclusión medida: el ámbar es el recurso vigente para «contenido no válido / se conserva el valor seguro», y ya se aplica a superficies de contenido, no solo a chips.** Es el que se reutiliza. No se inventó ningún patrón nuevo y no se tocó el rojo.

### (A-bis) ¿El campo textual avanzado tiene el mismo problema? **NO.** Medido.

`WebBlockEditor.jsx:633` monta `<SmartFormulaPreview value={field.value} …>`: la previa se alimenta del valor **commiteado**. En la rama inválida (`WebBlockEditor.jsx:586-597`) **nunca se llama `field.onChange`**, así que la previa sigue dibujando el último valor válido — literalmente lo que dice el mensaje, «el valor seguro anterior se conserva». **No hay contradicción que señalar ahí**, y por eso, conforme al criterio 2, **la señal NO se aplicó al campo textual**. Está fijado por test (`(A) the advanced textual field does NOT have the same problem…`).

### (B) Geometría real del botón «Editar fórmula» y de su contenedor

| Qué | Dónde | Valor medido |
|---|---|---|
| Tarjeta contenedora | `WebBlockEditor.jsx:621` | `rounded-lg border border-zinc-200 bg-white p-3 shadow-sm` (padding 12px) |
| Fila que alinea | `WebBlockEditor.jsx:632` | Antes: `flex flex-col gap-3 sm:flex-row **sm:items-start** sm:justify-between` |
| ¿Contenedor compartido? | grep sobre el archivo | **No.** `sm:items-start` aparecía **una sola vez**; la fila se declara inline dentro de `RuleMathControl`, cuyos únicos dos puntos de montaje son `RuleMathField` en `WebBlockEditor.jsx:1815` (columna) y `:3893` (nivel superior). Es la superficie de fórmula que este run posee, no un contenedor de otros componentes |
| Alto de la previa | `SmartFormulaPreview.jsx:72` + `className="min-h-16 flex-1"` (`WebBlockEditor.jsx:636`) | Conviven `min-h-12` y `min-h-16`. Compilado el CSS del propio proyecto: `.min-h-12` se emite en la línea 184 y `.min-h-16` en la 187 → **gana `min-h-16`**. Con `--spacing: 0.25rem` medido → **64px** |
| Posición del contenido de la previa | `SmartFormulaPreview.jsx:72` | `items-center` → la fórmula queda **centrada** en esos 64px, es decir a **32px** del borde superior |
| Alto del botón | `WebBlockEditor.jsx:648` | `py-2` (2×8px) + line-height de `text-sm` (`--text-sm: 0.875rem`, `calc(1.25/0.875)` → 20px) = **36px**, sin borde |

**La desalineación, encontrada y cuantificada:** `sm:items-start` clavaba el botón al borde superior de la fila, así que su centro caía a **18px**, mientras el centro de la fórmula caía a **32px**. **El botón se veía 14px por encima de la fórmula con la que se lee en pareja.** No se dio por supuesta: se localizó.

### (C) Tamaño de fuente actual del campo textual avanzado, y del resto

| Campo | Dónde | Tamaño medido |
|---|---|---|
| LaTeX textual avanzado, **nivel superior** | clase inline, hoy extraída a `FORMULA_TEXTAREA_CLASS` (`WebBlockEditor.jsx:534`) | Antes: `font-mono text-sm leading-relaxed` → **14px** |
| LaTeX textual avanzado, **dentro de `columns`** | vía `COLUMN_TEXTAREA_CLASS` (`:500`) → `COLUMN_INPUT_CLASS` (`:498`) | `text-sm` → **14px** |
| `COLUMN_INPUT_CLASS` / `COLUMN_PRIMARY_INPUT_CLASS` (inputs de prosa) | `:498`, `:499` | `text-sm` → 14px |
| `DEFAULT_LIST_TEXTAREA_CLASS` | `:141` | `text-sm` → 14px |

**Todos los inputs del editor están en 14px.** El campo de fórmula estaba igualado a ellos por consistencia, que es justo la decisión que el operador pide revisar.

**Hallazgo que cambió la implementación:** en el Tailwind v4 de este proyecto, **`.text-base` se emite ANTES que `.text-sm`** (líneas 266 y 270 del CSS compilado con el propio `tailwindcss` de `editor-ui`). Añadir `text-base` a `COLUMN_TEXTAREA_CLASS` habría sido un **no-op**: habría seguido ganando `text-sm`. Por eso la clase se **deriva sustituyendo el token**, no concatenando. Medido, no supuesto.

## Cambios visuales, uno a uno, con antes / después y razón

| # | Qué | Antes | Después | Razón |
|---|---|---|---|---|
| 1 | **(A)** Estado inválido de la vista previa del modal | La previa dibujaba la fórmula (con `\def\x{y}` MathLive ejecuta la macro y **dibuja `y`**) mientras el mensaje decía que `\def` está bloqueado. Nada indicaba cuál manda | La zona de fórmula lleva un aviso ámbar fijo **«Vista previa no válida: lo que ves aquí no es lo que se va a guardar.»**, anclado (`sticky top-0`) al tope de la zona | Es la contradicción que el operador midió. El texto dice explícitamente que lo que se ve **no** es lo que se guarda |
| 2 | **(A)** Caja de cada línea de fórmula | `border-zinc-200` (inactiva) / `border-indigo-300 ring-2 ring-indigo-100` (activa), `bg-white` siempre | Con fórmula inválida: `border-amber-200 bg-amber-50/40` (inactiva) / `border-amber-300 bg-amber-50/40 ring-2 ring-amber-100` (activa). Con fórmula válida, **idéntico a antes** | Reutiliza el ámbar que este editor ya usa para contenido no válido (`FALLBACK_TEXTAREA_CLASS`). No se inventó un patrón |
| 3 | **(A)** De dónde sale la señal | — | De la **validez del output** (`emitOutput`), no del texto del mensaje | Hay otros emisores de `message` (fallo al abrir el teclado, resultado de `/`) que no hablan de la validez del contenido. Si la señal colgara del texto, un `setMessage('')` ajeno la borraría y la previa volvería a mentir. Fijado por test |
| 4 | **(B)** Alineación del botón | `sm:items-start` → centro del botón a 18px, centro de la fórmula a 32px: **14px de desfase** | `sm:items-center` → los dos centros coinciden, y siguen coincidiendo cuando la fórmula crece | La desalineación medida. El contenedor es local a `RuleMathControl`, no compartido: se resolvió en su sitio |
| 5 | **(B)** Aspecto del botón | `shrink-0 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-sm …`, solo texto | Se añade `inline-flex items-center justify-center gap-2` y el icono `Sigma` (lucide, `size={16}`, `aria-hidden`). El resto del cromo **no cambió** | Icono + etiqueta es el patrón de los botones de la propia superficie de fórmula (`Teclado matemático` y `Línea`, `SmartFormulaField.jsx:746-766`) y de dos de los primarios indigo del editor (`DraftRecoveryModal.jsx:37`, `DesignSystemSettingsModal.jsx:242`). `justify-center` es obligado: al pasar a `inline-flex`, sin él la etiqueta dejaría de centrarse cuando el botón se estira a ancho completo en móvil |
| 6 | **(C)** LaTeX textual avanzado, nivel superior | `font-mono text-sm` (14px) | `font-mono text-base` (16px), extraído a `FORMULA_TEXTAREA_CLASS` | Es contenido tipo código, denso y monoespaciado; no comparte propósito con los inputs de prosa, que se quedan en 14px |
| 7 | **(C)** LaTeX textual avanzado, dentro de `columns` | `${COLUMN_TEXTAREA_CLASS} font-mono` → 14px | `FORMULA_COLUMN_TEXTAREA_CLASS = ${COLUMN_TEXTAREA_CLASS.replace('text-sm','text-base')} font-mono` → 16px | Mismo tamaño en los dos contextos. **`COLUMN_TEXTAREA_CLASS` global NO se tocó**: se deriva. Se sustituye el token en vez de concatenar porque concatenar no habría funcionado (ver el hallazgo de orden de emisión) |

**Lo que NO se cambió, a propósito:** el renderizado de MathLive. No se tocó el elemento `<math-field>`, ni su clase, ni el LaTeX que se le pasa, ni la cadena de validación. La señal es puramente de presentación en los contenedores. Fijado por test (`(A) the MathLive rendering path is untouched`). **La medición no reveló ninguna necesidad de tocar el render ni la validación, así que no hubo motivo para parar.**

## Guarda existente actualizada: antes / después declarado

Una sola aserción, y **no por comodidad: porque había dejado de probar lo que decía.**

| Archivo | Aserción ANTES | Aserción DESPUÉS |
|---|---|---|
| `tools/author-lite/compiler-api/tests/mathAuthoringAllowlistExpansion.test.mjs` (línea 219 antes, **223** hoy) | `assert.match(webBlockEditor, /\$\{COLUMN_TEXTAREA_CLASS\} font-mono/u);` | `assert.match(webBlockEditor, /FORMULA_COLUMN_TEXTAREA_CLASS = \`\$\{COLUMN_TEXTAREA_CLASS\.replace\('text-sm', 'text-base'\)\} font-mono\`/u);` |

**Por qué.** El literal `${COLUMN_TEXTAREA_CLASS} font-mono` **sigue existiendo en el archivo, dos veces**: son los campos «Math» de los pasos de `arithmetic` (`WebBlockEditor.jsx:1449`) y de `timeline` (`:1549`), que **no son** el LaTeX textual avanzado de `rule`. La aserción seguía en verde tras el cambio, pero pasando por la razón equivocada — verificado ejecutándola. Se reancló a la constante real del campo de fórmula. La segunda aserción del mismo test (la del nivel superior, hoy línea **224**) **no se tocó**: sigue coincidiendo con `FORMULA_TEXTAREA_CLASS`. El propósito del test, «el LaTeX avanzado es monoespaciado en sus dos contextos», se conserva y se refuerza.

**Los campos Math de `arithmetic` y `timeline` quedan como estaban** (siguen en `text-sm`): pertenecen a otros componentes y a sus propios runs. Reportados, no tocados; congelados en cuenta por el test aditivo.

## Tests, lint y compilación

- Suite completa de `compiler-api`: **284/284 antes** (verificado en esta sesión, no heredado) → **296/296 después**. Cero fallos.
- Cobertura **aditiva** nueva: `tools/author-lite/compiler-api/tests/mathAuthoringFormulaEditorSurfaceState.test.mjs`, **12 tests**. Cubre lo verificable por test: el cableado de la señal a la validez del output y no al mensaje; que el handler del teclado **no** puede apagarla (conteo de llamadas + inspección del handler); los atributos y el texto del aviso; el ámbar en las cajas de línea y su procedencia (ya existía en el fallback y en el chip); que el render de MathLive y la compuerta `canConfirm` del modal están intactos; que el campo textual no necesita la señal; la fila `sm:items-center` y el cromo del botón; los dos contextos en `text-base`; y una comprobación **funcional** de la derivación de clase — recompone `COLUMN_TEXTAREA_CLASS` desde el fuente, verifica que `text-sm` aparece **exactamente una vez** (si algún día fueran dos, `.replace` dejaría una viva y volvería a ganar) y que el resultado lleva `text-base` y no `text-sm`.
- **Lo puramente visual no se forzó a test:** el color exacto, el tamaño del icono y la alineación óptica van a la QA humana, no a una aserción que no probaría nada. Lo que se prueba es el cableado.
- `eslint` (editor-ui): **EXIT 0**.
- **Compilación verificada:** los dos `.jsx` tocados se parsean sin error con el `@babel/parser` del propio proyecto (plugin `jsx`) — comprobado a propósito porque los comentarios explicativos quedaron **entre atributos** de una etiqueta JSX. No se corrió ningún build ni se escribió `dist/`.
- **No se corrió ninguna suite de `aiw-console`.**

## Validador

`node tools/project-console/validate-project-console-state.mjs`, la vía que **no escribe**: **EXIT 0 antes y después**.

| Métrica | Antes | Después |
|---|---|---|
| Objetivos / fases / runs | 7 / 28 / 73 | 7 / 28 / 73 |
| Docs indexed | 147 | 147 |
| **Component statuses** | **16** | **16** (sin moverse) |
| Avisos | 1, **no bloqueante**: la arista externa `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001` | idéntico, intacto |

`.aiw/docs/docs_index.json` **no se tocó** (md5 `157eabdee5652310cbd4f4ba3148c51e` antes = después): este encargo no escribe ni un documento bajo `docs/`, así que no hay entrada de índice que actualizar.

## Superficies protegidas y `.project/`

- **`.project/` NO se re-emitió y no se movió:** los seis archivos conservan md5 **y** mtime `2026-07-29 00:16:30` idénticos antes y después (docs_index `3ace29ad…`, git_history `9e246f56…`, guardrails `eb2b5e9b…`, no_claims `7b2616c5…`, roadmap `3371fd28…`, snapshot `fd37ccdc…`).
- **Canónico intacto:** `.aiw/roadmap/roadmap.json` md5 `9b30ef9952491ccfda9ac87e69c10faf` antes = después. Ningún `status`, `progress` ni `closeout_result` tocado; ningún run insertado, movido ni renumerado; ningún `barrier` aplicado; la arista externa sin resolver.
- **Superficies del hilo paralelo intactas**, md5 antes = después: `aiw-console/roadmap/roadmap.json` `f299d968fdf781bf31863d696bd9610e`; `aiw-console/context/DECISIONES.md` `3f6bdf8816a0b43818519eb3582f6511`; `aiw-console/context/aiw-console/CONTRATO.md` `f77ccec64d99f2048d4bde41638cb228`. No se tocaron `context/aiw/`, handoffs, tests ni records existentes de aiw-console.
- **Frontera dura de cantu-studio respetada**, verificada por test: layout del teclado (`['numeric','symbols','alphabetic','greek']`), altura del cajón (`clamp(23rem, 50vh, 29rem)`, `maxHeight 86vh`, `height 94vh`), curación de menú, renderizado del modal, allowlist (**230**), blocklist (**27**), entornos (**12**), reglas estructurales, normalizador, «Placement avanzado», «Col span» y el resto del editor de bloques de Rule. `COLUMN_TEXTAREA_CLASS` global y los demás estilos compartidos, sin tocar.
- Sin git, sin servidores, sin suites de aiw-console. Los archivos de medición de Tailwind viven **fuera del repo**, en el scratchpad de la sesión.

## Status declarado (no aplicado)

El run queda en **`active`**, con la QA humana preparada y detenida. Ningún `status`, `progress` ni `closeout_result` fue tocado. Al aprobar la QA, el cierre lo ejecuta el operador desde la consola global. **No se certifica nada.**

## Archivos escritos por este encargo, y ninguno más

| # | Archivo (ruta repo-relativa) | Acción |
|---|---|---|
| 1 | `cantu-studio/tools/author-lite/editor-ui/src/features/math-authoring/smartFormulaField/SmartFormulaField.jsx` | Editado — señal de estado inválido (A) |
| 2 | `cantu-studio/tools/author-lite/editor-ui/src/features/editor/components/web/WebBlockEditor.jsx` | Editado — botón (B) y tipografía del campo textual (C) |
| 3 | `cantu-studio/tools/author-lite/compiler-api/tests/mathAuthoringAllowlistExpansion.test.mjs` | Editado — **una** aserción reanclada, con antes/después declarado |
| 4 | `cantu-studio/tools/author-lite/compiler-api/tests/mathAuthoringFormulaEditorSurfaceState.test.mjs` | Nuevo — cobertura aditiva, 12 tests |
| 5 | `aiw-console/context/aiw-console/records/SENAL-DE-PREVIA-INVALIDA-Y-SUPERFICIE-DEL-EDITOR-DE-FORMULAS-CANTU.md` | Nuevo — este record |

Records existentes antes de este: **61**; con este: **62**. **Sin colisión de nombre.**

## QA humana — preparada y detenida (formato DoD §6, máximo 4)

**Run:** `RUN-CANTU-MATH-ALLOWLIST-EXPANSION-AND-FORMULA-EDITOR-001` · **Superficie:** editor de fórmula del bloque `rule` (Author Lite Web). **Carga:** arranca el editor (`npm --prefix tools/author-lite run dev`), crea o abre un draft Web y agrega un bloque **rule**. Cada comprobación es autocontenida; ninguna pide comparar contra un estado anterior. Los veredictos vuelven al operador y por sí mismos no cambian ningún status.

| # | Qué hacer | Qué debe pasar | Veredicto |
|---|---|---|---|
| 1 | Pulsa «Insertar fórmula». En el campo escribe `\` (MathLive entra en modo comando), teclea `def`, Enter, y luego `\x{y}` | Aunque MathLive dibuje algo, sobre la zona de fórmula aparece un aviso ámbar **«Vista previa no válida: lo que ves aquí no es lo que se va a guardar.»**, la caja de la línea se pone **ámbar**, el mensaje de abajo nombra `\def` como bloqueado por seguridad, y el botón de confirmar está **deshabilitado** | |
| 2 | Borra todo y arma `\frac{1}{2}` con el teclado matemático (pestaña `123`) | **No** hay aviso ámbar por ningún lado, la caja de la línea vuelve al borde indigo/gris de siempre, el botón de confirmar está **habilitado**, y al confirmar la fórmula queda guardada | |
| 3 | Con la fórmula ya guardada, mira la fila de la vista previa del bloque rule y su botón «Editar fórmula» | El botón lleva un icono Σ junto a la etiqueta y su **centro vertical coincide** con el centro de la fórmula de la previa: no se ve montado hacia arriba | |
| 4 | Abre «LaTeX textual avanzado» en ese bloque; después crea un bloque **columns**, mete un bloque rule en un slot y abre su «LaTeX textual avanzado» | En los **dos** casos el texto se ve monoespaciado y **del mismo tamaño**, visiblemente más grande que el de los demás campos de texto del editor | |

## Cierre

Producto de este encargo: un record (este archivo). Todas las cifras son medidas en la sesión, no heredadas del ticket. La vista previa del modal ya no se contradice con su propio mensaje, y lo hace **sin tocar el renderizado**: la señal vive en los contenedores y en el estado, y reutiliza el ámbar que el editor ya usaba para contenido no válido. El run queda `active`; la QA queda en manos del operador.
