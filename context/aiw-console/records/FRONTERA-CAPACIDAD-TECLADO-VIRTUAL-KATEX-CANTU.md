# FRONTERA DE CAPACIDAD DEL TECLADO VIRTUAL CONTRA KATEX — CANTU

> Encargo de taller de **desarrollo** sobre `cantu-studio`, carril `DEVELOPMENT`.
> Ejecuta el run de `queue_order` **10**.
>
> Fecha: 2026-07-28. **Git no se usó en ninguna forma.** No se levantó ningún servidor.
> No se corrió ninguna suite de `aiw-console`. **No se re-emitió `.project/`.** No se tocó
> ningún `status`, `progress` ni `closeout_result` de ningún run. No se tocó el canónico
> `.aiw/roadmap/roadmap.json`. No se tocó la allowlist de `rule.math`, ni el layout del
> teclado, ni la altura del cajón, ni la curación del menú.

## Archivos escritos por este encargo, y ninguno más

| Repo | Archivo | Qué |
|---|---|---|
| `cantu-studio` | `docs/reference/REFERENCE-VIRTUAL-KEYBOARD-CAPABILITY-BOUNDARY.md` | el entregable documental: la frontera de capacidad (nuevo) |
| `cantu-studio` | `tools/author-lite/editor-ui/src/features/math-authoring/smartFormulaField/smartFormulaCommandNormalizer.js` | la reparación de compatibilidad (nuevo) |
| `cantu-studio` | `tools/author-lite/editor-ui/src/features/math-authoring/smartFormulaField/SmartFormulaField.jsx` | 2 líneas: import + un `.map` encadenado en `emitOutput` |
| `cantu-studio` | `tools/author-lite/editor-ui/src/features/editor/components/web/WebBlockEditor.jsx` | 2 líneas: import + un `.map` encadenado en `handleAdvancedChange` |
| `cantu-studio` | `tools/author-lite/editor-ui/src/features/math-authoring/smartFormulaField/index.js` | re-export del normalizador nuevo |
| `cantu-studio` | `tools/author-lite/compiler-api/tests/mathAuthoringVirtualKeyboardKatexCompatibility.test.mjs` | cobertura **aditiva** (nuevo, 7 tests) |
| `cantu-studio` | `.aiw/docs/docs_index.json` | **una** entrada nueva, edición quirúrgica |
| `aiw-console` | `context/aiw-console/records/FRONTERA-CAPACIDAD-TECLADO-VIRTUAL-KATEX-CANTU.md` | este record |

Barrido de `cantu-studio` por `mtime` posterior al inicio del encargo, excluidos `.git/`,
`node_modules/` y `dist/`: **exactamente 7 archivos**, los siete de la tabla. Ninguno más.

Todo el andamiaje de medición (arnés, `katex@0.16.9`, `jsdom`, resultados JSON, respaldos)
vive en el scratchpad de sesión, **fuera de los tres repos**. Ni `package.json` ni
`node_modules` de `cantu-studio` se tocaron.

---

## BLOQUE A — LA GUARDA

### A.1 El run derivado por `queue_order`, no tecleado

Se leyó `.aiw/roadmap/roadmap.json` y se buscó `queue_order === 10` recorriendo
`objectives[] -> phases[] -> runs[]`. **Coincidencia única.**

| Campo | Valor |
|---|---|
| `run_id` | `RUN-JAME-VIRTUAL-KEYBOARD-KATEX-COMPATIBILITY-001` |
| Objetivo / fase | `O5` "Editor and Engine Shared Features" / `O5.P1` "Smart Formula Field and Keyboard" |
| `queue_order` | 10 |
| `status` | `active` |
| `depends_on` | `RUN-JAME-SMART-FORMULA-FIELD-RULE-ONLY-BASELINE-001` |
| Carril | `DEVELOPMENT` — el run no lleva campo `lane`; el único carril declarado por run en todo el canónico es `DOCUMENTATION`, y `DEVELOPMENT` es el `default: true` de `lanes` |

Título del canónico: **"Validate virtual keyboard KaTeX compatibility"**. Coincide con el
del ticket. **La guarda no saltó.**

### A.2 Los tres campos, verbatim del canónico

- `title`:
  > Validate virtual keyboard KaTeX compatibility

- `summary`:
  > Audit supported keyboard commands against the real rendering pipeline while preserving the accepted keyboard UX baseline.

- `full_description`:
  > Test visible keyboard commands against the actual MathLive input, normalization, compile, and KaTeX rendering path. Identify unsupported commands and repair compatibility without replacing the accepted keyboard layout or visual baseline. This is a cross-cutting math-authoring capability boundary, not a component repair.

Nada del ticket contradice al run. El run gobierna y el ticket lo describe fielmente.

### A.3 Cifras del ticket, verificadas una a una

| Cifra del ticket | Verificada | Resultado |
|---|---|---|
| 7 objetivos / 28 fases / 72 runs | sí | **exacto** |
| Component statuses: 16 | sí | **exacto** (`components` de `.aiw/state/component_status.json`) |
| `docs_index.json` tenía 146 entradas | sí | **exacto** |
| `#8` cerrado hoy, mide 39 comandos / 9 entornos / 25 bloqueados / tope 1024 | sí | **exacto**, contados en `constants.js` líneas 33-73, 79-89, 94-122 y 26 |
| Los seis componentes con math medidos por `#8` | sí | **exacto**: `table` (`draftSchema.js:401`), `arithmetic` (`:426`), `hierarchy` (`:453`), `timeline` (`:470`), `rule` (`:770` y `:776`), `split` (`:833`) |
| `#1` `completed` y fija la línea base | sí | `RUN-JAME-SMART-FORMULA-FIELD-RULE-ONLY-BASELINE-001`, `status: completed` |
| Los cuatro REFERENCE de esta sesión | sí | COLOR-PALETTE, MATH-FORMULA, COMPONENT-REVALIDATION-DoD y NAMING-DISPOSITION, los cuatro con `mtime` 2026-07-28; los otros tres REFERENCE son del 2026-07-22 |

### A.4 Insumo leído entero antes de medir

`docs/reference/REFERENCE-MATH-FORMULA-COMPATIBILITY.md`, 328 líneas, leído completo.
Su Sección 12 dice literalmente que la cobertura de comandos del teclado virtual **no** se
decide ahí y que es de este run. Este encargo la cierra.

---

## BLOQUE B — MÉTODO: EL PATH SE RECORRIÓ, NO SE RAZONÓ

Se construyó un arnés en el scratchpad que ejecuta el camino real de punta a punta:

1. **Emisión.** Los 156 keycaps de los cuatro layouts se resolvieron desde las tablas
   `LAYOUTS`, `KEYCAP_SHORTCUTS` y `alphabeticLayout()` del bundle instalado
   `tools/author-lite/editor-ui/node_modules/mathlive/mathlive.mjs` (MathLive **0.110.0**),
   normalizados igual que `normalizeKeycap()` y despachados igual que
   `executeKeycapCommand()` — `command`, si no `insert`, si no `key` como texto tecleado,
   si no `latex`, si no la etiqueta como texto tecleado.
2. **MathLive de verdad.** Cada keycap se ejecutó contra un `MathfieldElement` real
   levantado en `jsdom`, configurado con las mismas opciones que
   `configureMathLiveAuthoringSurface()`, y el valor se leyó con `getValue('latex')` — la
   misma llamada que hace el campo en `SmartFormulaField.jsx:34`.
3. **Normalización.** Cada payload pasó por `normalizeRuleMathValue()` de
   `tools/author-lite/editor-ui/src/features/math-authoring/ruleMathAdapter.js`.
4. **Schema y compilador.** Cada payload se compiló con `WebDraftSchema` y
   `compileDraftToJameData()`, como bloque `rule` y otra vez como paso de `timeline`, para
   ejercitar **las dos superficies**.
5. **Render.** Los valores compilados se renderizaron con
   `src/builders/web/partials/renderRule.js` y `partials/renderTimeline.js`, se decodificaron
   las entidades HTML como haría el navegador, se extrajo la math delimitada y se le pidió
   a **KaTeX 0.16.9** —el runtime fijado en `src/builders/web/buildSingleWebLesson.js:4`—
   que la renderizara.

`renderMathInElement` captura el `ParseError` y reinserta el LaTeX crudo como texto literal:
por eso un fallo de parseo **es** el defecto que ve el autor.

**`mathlive-keyboard-calibration.html` se leyó y no se cita como prueba.** Su propia
cabecera lo declara arnés DEV-ONLY fuera del build de producción y su objeto es CSS.

---

## BLOQUE C — LA ENUMERACIÓN (el entregable central)

### C.1 Lo que el teclado expone hoy, desde el código

`SmartFormulaField.jsx:94` fija `virtualKeyboard.layouts = ['numeric','symbols','alphabetic','greek']`.
`KEYBOARD_LAYOUT_BY_INDEX` (`smartFormulaFieldState.js:313`) está congelado como
`['123','symbols','abc','greek']` y `resolveActiveKeyboardLayoutKey` (`:352`) mapea el tab
seleccionado sobre ese arreglo. **Ambos verificados**, no asumidos.

| Layout | Tab | Keycaps | De contenido | De acción | Shift |
|---|---|---|---|---|---|
| `numeric` | `123` | 35 | 29 | 5 | 1 |
| `symbols` | `symbols` | 38 | 33 | 4 | 1 |
| `alphabetic` | `abc` | 47 | 41 | 5 | 1 |
| `greek` | `greek` | 36 | 31 | 4 | 1 |
| **Total** | | **156** | **134** | **18** | **4** |

De los 134 de contenido, **60 emiten solo caracteres planos** (dígitos, letras, operadores,
coma, y la tecla de espacio que emite `\;`) y **74 emiten al menos un comando LaTeX**. Entre
todos producen **66 comandos LaTeX distintos**.

### C.2 Cuáles sobreviven al path completo

| Clase | Comandos | Qué significa |
|---|---|---|
| `SUPPORTED` | **25** | la allowlist lo acepta y KaTeX lo dibuja |
| `POLICY` | **38** | KaTeX lo dibuja; la allowlist de `rule.math` lo rechaza |
| `CAPABILITY` | **3** | KaTeX no lo sabe parsear |

Por keycap, contra `rule.math`: **81 de 134 aceptados, 53 rechazados**. Por layout:
`abc` 41/41 aceptados y **0 fallos posibles**; `123` 18 aceptados / 11 rechazados;
`greek` 12 / 19; `symbols` 10 / 23.

### C.3 La asimetría de `#8` aplicada al teclado

Medido en código, no supuesto: **el teclado virtual solo se monta dentro del Smart Formula
Field** (`SmartFormulaField.jsx:94` es el único sitio que configura
`window.mathVirtualKeyboard`), y el Smart Formula Field solo se monta para `kind === 'rule'`
(`RuleMathField` en `WebBlockEditor.jsx:1778` dentro de slots de `columns` y `:3856` a nivel
superior, y en ningún otro sitio).

**Consecuencia: todo comando del teclado aterriza siempre en la Superficie A.** Los cinco
campos math de Superficie B —`table`, `arithmetic`, `split`, `timeline`, `hierarchy`— son
inputs de texto plano sin teclado. La asimetría de `#8` §2, aplicada al teclado, es esta: el
teclado **solo escribe en la superficie validada**, y por eso sus fallos se parten en dos
clases que hay que contar por separado.

La Superficie B sigue sirviendo de prueba: un payload que KaTeX no parsea falla **también**
ahí, donde no hay allowlist ninguna. Eso es exactamente lo que demuestra que un fallo es de
capacidad y no de política. Se verificó compilando y renderizando cada payload como paso de
`timeline`: `\exponentialE` llega a KaTeX sin validación y **falla igual**.

### C.4 Los 38 de POLÍTICA — declarados, no tocados

KaTeX los dibuja todos. `rule.math` los rechaza con `UNKNOWN_LATEX_COMMAND` por no estar en
la allowlist de 39 comandos (`constants.js:33-73`).

- **Letras griegas fuera de la allowlist, 19:** `\chi` `\eta` `\iota` `\kappa` `\nu`
  `\omicron` `\psi` `\rho` `\tau` `\upsilon` `\varepsilon` `\varkappa` `\varphi` `\varpi`
  `\varrho` `\varsigma` `\vartheta` `\xi` `\zeta`
- **Conjuntos y lógica, 8:** `\cap` `\complement` `\cup` `\exists` `\forall` `\in` `\ni` `\subset`
- **Flechas, 3:** `\larr` `\lrArr` `\rightarrow`
- **Estructura y notación, 8:** `\colon` `\exp` `\mathrm` `\overline` `\overrightarrow`
  `\prime` `\vert` `\Vert`

Más dos keycaps que caen por reglas estructurales, también política:

- Las teclas `<` y `>` del layout `123` emiten `<` y `>` pelados y se rechazan con
  `ANGLE_BRACKET_PAYLOAD` (`latexSanitizer.js:289`). **Un autor no puede escribir una
  desigualdad estricta con esas teclas en una fórmula `rule`.**
- La tecla `)` emite `)` pelado y cae por `MALFORMED_LATEX`. Esto es **artefacto de la
  medición aislada**, no defecto: la tecla `(` usa smart fences de MathLive y emite
  `\left(\right)` ya balanceado, así que un autor que abre antes de cerrar nunca lo pisa.

**Nada de esto se tocó.** Cambiar la allowlist es decisión de producto, fuera de este run, y
este record no recomienda dirección alguna.

### C.5 Los 3 de CAPACIDAD

| Comando | Teclas | KaTeX 0.16.9 | Trato |
|---|---|---|---|
| `\exponentialE` | `123` fila 0 col 8, `symbols` fila 0 col 9 | `ParseError: Undefined control sequence` | **reparado** |
| `\imaginaryI` | `123` fila 0 col 9 | `ParseError: Undefined control sequence` | **reparado** |
| `\placeholder` | 14 teclas de plantilla | `ParseError: Undefined control sequence` | **declarado, no reparado** |

`\exponentialE` y `\imaginaryI` son serializaciones propias de MathLive de las constantes
*e* e *i*. **Los keycaps muestran una `e` y una `i` dibujadas, así que nada advierte al
autor.** Están en el layout `123`, el tab con el que abre el cajón. Fallan en las dos
superficies, que es lo que los hace capacidad y no política.

`\placeholder{}` es el marcador de MathLive para un argumento sin rellenar. 14 teclas de
plantilla pueden emitirlo (división, potencias, `\sqrt`, integral definida, `\mathrm{abs}`,
`\overrightarrow`, `\lim`, `\overline`, `\exp`, `\vert`, `\Vert`, complemento y prima).
**Todas renderizan bien en cuanto el autor rellena el hueco**; el marcador solo sobrevive si
la fórmula se deja incompleta.

---

## BLOQUE D — LA REPARACIÓN

### D.1 Qué se reparó y dónde

`smartFormulaCommandNormalizer.js` mapea `\exponentialE` a `{e}` y `\imaginaryI` a `{i}`
**antes de validar**, en las dos mismas costuras de autoría donde ya corre el normalizador
de color:

- `SmartFormulaField.jsx`, salida del editor visual;
- `WebBlockEditor.jsx`, campo de LaTeX textual avanzado.

Es el patrón closed-loop que ya estableció `smartFormulaColorNormalizer.js`, cuyo propio
comentario enuncia la regla que el teclado estaba violando: **el editor visual nunca debe
producir una fórmula que su propio validador rechace.**

El equivalente va entre llaves y no como letra pelada porque una letra pelada se fundiría
con el comando anterior: `\pi\exponentialE` pasaría a ser `\pie`, que no existe. `\pi{e}` es
inequívoco, y las llaves mantienen el payload dentro de la allowlist sin añadirle ningún
comando.

**Matiz tipográfico, dicho y no escondido:** MathLive dibuja `\exponentialE` como una *e*
recta. `{e}` renderiza como *e* itálica, la forma normal de variable en KaTeX. La forma
recta exigiría `\mathrm`, que no está en la allowlist, y meterlo sería cambiar la allowlist.
**La matemática se preserva; la inclinación del glifo no.**

### D.2 Verificación de punta a punta, con el path real

| Caso | Crudo | Normalizado | Compilado | Renderizado | KaTeX |
|---|---|---|---|---|---|
| `123` r0c8 "e" | `\exponentialE` | `{e}` | `{e}` | `{e}` | **renderiza** |
| `123` r0c9 "i" | `\imaginaryI` | `{i}` | `{i}` | `{i}` | **renderiza** |
| `symbols` r0c9 "e" | `\exponentialE` | `{e}` | `{e}` | `{e}` | **renderiza** |
| combinado | `\exponentialE + \imaginaryI` | `{e} + {i}` | `{e} + {i}` | `{e} + {i}` | **renderiza** |
| tras `\pi` | `\pi\exponentialE` | `\pi{e}` | `\pi{e}` | `\pi{e}` | **renderiza** |

Antes de la reparación los tres primeros eran rechazados por el schema con
`Unknown LaTeX command`, y en `timeline` llegaban a KaTeX y fallaban.

### D.3 Lo que la reparación NO toca

Layout del teclado, altura del cajón, curación del menú, allowlist, schema, compilador,
renderers y JAME Core. **Ningún keycap se añadió, quitó, reetiquetó ni remapeó.** El test
nuevo incluye una aserción explícita de que `virtualKeyboard.layouts` sigue siendo
`['numeric','symbols','alphabetic','greek']`.

### D.4 Lo que se decidió NO reparar, y por qué

- **Los 38 rechazos de política.** No son defecto por el propio texto del run. Decisión de
  producto.
- **`\placeholder{}`.** Rechazar una fórmula incompleta es comportamiento **correcto**, no
  defecto. Borrar el marcador en silencio guardaría `\frac{x}{}` — una fórmula a la que le
  falta un operando, que renderiza como matemática válida y **está mal**. La reparación
  sana sería un mensaje de autor mejor, y el texto de mensaje cae en el hueco de
  "accepted UI behavior" que `#8` §12 registra como huérfano.
- **Alcance de Superficie B.** `\exponentialE` pegado a mano en una fórmula de `timeline`
  sigue llegando a KaTeX y sigue fallando, porque la Superficie B no valida LaTeX. **El
  teclado no puede ponerlo ahí** (esos campos no tienen teclado), así que queda fuera del
  sujeto de este run. Registrado, no reparado.

---

## BLOQUE E — TESTS

Los tres tests vivos que aseguran la línea base se leyeron **antes** de tocar nada:
`mathAuthoringSmartFormulaField.test.mjs`, `mathAuthoringFoundation.test.mjs` y
`webArithmeticFactorizationSafety.test.mjs`.

| Momento | Qué se corrió | Resultado |
|---|---|---|
| Antes | los tres tests guarda | **53 pass / 0 fail** |
| Después | los tres tests guarda + los 2 que grepean los archivos editados | **90 pass / 0 fail** |
| Después | los 14 tests de math/rule/formula/tabla/timeline/split/hierarchy/aritmética | **188 pass / 0 fail** |
| Después | `mathAuthoringVirtualKeyboardKatexCompatibility.test.mjs` (nuevo) | **7 pass / 0 fail** |

La cobertura nueva es **aditiva**: archivo nuevo, ningún test existente editado ni
reescrito. Las dos ediciones de código conservan textualmente la expresión
`normalizeAuthorLatexColors(line, colorPalette)` que
`webRuleSmartFormulaFieldRulePilot.test.mjs:244` grepea; el `.map` nuevo va encadenado
detrás, no sustituye.

`eslint` sobre los cuatro archivos de editor tocados: **EXIT 0, sin avisos**.

**No se corrió ninguna suite de `aiw-console`.**

---

## BLOQUE F — REGISTRO EN EL ÍNDICE

Edición quirúrgica de `.aiw/docs/docs_index.json`, con contrato de roundtrip probado
**antes** de escribir: `JSON.stringify(obj, null, 2)` + CRLF + CRLF final reproduce el
archivo **byte a byte** (verificado `true` antes de tocar).

| Qué | Antes | Después |
|---|---|---|
| md5 | `1bcc50fe9a5a983519a4827e6215b5c6` | **`dac76d5d73283f6b3924fd825e796edd`** |
| Bytes | 313 802 | 316 113 |
| Entradas | **146** | **147** |
| Caracteres no-ASCII | 1 (U+2014, en una nota preexistente) | **1**, el mismo |

Respaldo previo fuera del repo: `<scratchpad>/docs_index.BACKUP.json`, md5 idéntico al
original (`1bcc50fe9a5a983519a4827e6215b5c6`).

Diff a nivel de entradas: **añadida 1**
(`docs/reference/REFERENCE-VIRTUAL-KEYBOARD-CAPABILITY-BOUNDARY.md`), **eliminadas 0**.
Verificado además que las 146 entradas preexistentes quedan **byte-idénticas y en el mismo
orden**, y que los campos escalares de nivel superior no cambiaron. La entrada nueva es
**ASCII puro** (comprobado antes de insertar) y va inmediatamente después de la última
hermana REFERENCE, con la misma forma de campos que ellas.

Fui el **único escritor del índice** en esta ventana.

---

## BLOQUE G — VALIDADOR

Por la vía que no escribe (`node tools/project-console/validate-project-console-state.mjs`;
comprobado que el script no contiene ninguna llamada de escritura de `fs`).

| Métrica | Antes | Después |
|---|---|---|
| Salida | `Project Console state validation passed.` | igual |
| Exit code | **0** | **0** |
| Objetivos / fases / runs | 7 / 28 / 72 | **7 / 28 / 72** |
| Component statuses | 16 | **16** |
| Docs indexed | 146 | **147** (esperado: el artefacto nuevo) |
| Docs curated primary-visible | 58 de 146 | 59 de 147 |
| Avisos | solo el no bloqueante de la arista externa | **solo ese mismo** |

El único aviso sigue siendo el de `RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001`
dependiendo de `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`. **No se resolvió**: no es de este run.

---

## BLOQUE H — SUPERFICIES DISJUNTAS Y `.project/`

### H.1 `.project/` no se re-emitió, y nadie más lo movió en esta ventana

md5 y `mtime` idénticos al inicio y al cierre del encargo:

| Archivo | md5 (idéntico antes y después) | `mtime` |
|---|---|---|
| `docs_index.json` | `bd554272b94ea449d7141aac18edcf09` | 2026-07-28 22:13:49.896 |
| `git_history.json` | `5b9973b8d8ce11f043114ccce2e0cb40` | 2026-07-28 22:13:50.025 |
| `guardrails.json` | `2af035b9c3ae535e335a0c18b580bf4b` | 2026-07-28 22:13:49.877 |
| `no_claims.json` | `065cbb68d132e147a0e8f6e17947580c` | 2026-07-28 22:13:49.879 |
| `roadmap.json` | `8e8442bc371dd8a21f978fe85486cd69` | 2026-07-28 22:13:49.899 |
| `snapshot.json` | `20a6f4ba10ba874fa69c690324314d0d` | 2026-07-28 22:13:50.027 |

Todos los `mtime` son **anteriores** a la primera escritura de este encargo (22:29 local).
**No se detectó re-emisión concurrente durante esta ventana.** `.project/docs_index.json`
queda por tanto desfasado respecto al canónico en una entrada; lo reconcilia la consola al
re-emitir, que es su trabajo, no el de este encargo.

### H.2 `aiw-console` intacto

| Archivo | md5 al cierre | `mtime` |
|---|---|---|
| `roadmap/roadmap.json` | `f299d968fdf781bf31863d696bd9610e` | 2026-07-28 03:33:31 |
| `context/aiw-console/CONTRATO.md` | `f77ccec64d99f2048d4bde41638cb228` | 2026-07-27 15:48:27 |
| `context/DECISIONES.md` | `3f6bdf8816a0b43818519eb3582f6511` | 2026-07-28 14:10:46 |

Los tres `mtime` son anteriores al inicio del encargo. Ningún handoff, ningún test de
`aiw-console` y **ningún record existente** se tocó: el directorio tenía **55** records y
este es el **56**, con nombre nuevo y sin colisión (no existía ninguno con `KEYBOARD` ni
`KATEX` en el nombre).

---

## BLOQUE I — QA HUMANA, PREPARADA Y DETENIDA AQUÍ

Formato de la DoD de `#9` (`REFERENCE-COMPONENT-REVALIDATION-DEFINITION-OF-DONE.md` §6).
**El taller prepara; el operador ejecuta.** Ningún veredicto se simula ni se da por pasado.

```
Componente: rule (Smart Formula Field / teclado virtual)
Run: RUN-JAME-VIRTUAL-KEYBOARD-KATEX-COMPATIBILITY-001 (queue_order 10)
Fecha: 2026-07-28

Fixture: un bloque `rule` con título cualquiera. No hace falta draft en disco: las
comprobaciones se hacen tecleando en el campo de fórmula del editor.

Pasos de carga:
  1. Levantar el editor (Author Lite) y crear o abrir una lección Web.
  2. Añadir un bloque `rule`.
  3. Abrir el campo de fórmula y abrir el cajón del teclado virtual.

| # | Comprobación | Resultado esperado | Veredicto |
|---|---|---|---|
| 1 | El cajón abre en el tab `123` y muestra los cuatro tabs `123 / symbols / abc / greek` | los cuatro tabs, en ese orden | |
| 2 | Altura del cajón y tamaño de tecla en los cuatro tabs | iguales que antes de este encargo; sin banda vacía con el teclado cerrado | |
| 3 | Menú nativo de la fórmula (botón de menú) | mismas entradas curadas que antes | |
| 4 | Pulsar la tecla `e` del tab `123` | la fórmula queda válida (sin mensaje de error) y la vista previa muestra una `e` | |
| 5 | Pulsar la tecla `i` del tab `123` | igual que 4, con una `i` | |
| 6 | Pulsar la tecla `e` del tab `symbols` | igual que 4 | |
| 7 | Escribir `\pi` y luego pulsar `e` | se ve pi seguido de e; sin mensaje de error | |
| 8 | Preview Real del bloque `rule` de los pasos 4-7 | KaTeX dibuja la fórmula; NO aparece LaTeX crudo en pantalla | |
| 9 | Compile Web de la misma lección y abrir el HTML | igual que 8 en el HTML generado | |
| 10 | Pulsar la tecla de raíz cuadrada y NO rellenar el hueco | el campo marca la fórmula como no válida (comportamiento correcto, no defecto) | |
| 11 | Pulsar `\forall` en el tab `symbols` | el campo la rechaza — POLÍTICA de allowlist, no defecto; se documenta, no se repara | |
| 12 | Campo "LaTeX textual avanzado": escribir `\exponentialE` a mano | mismo resultado que 4 (la normalización corre también ahí) | |
| 13 | Fórmula multilínea existente y fórmula con color de paleta | siguen funcionando igual que antes | |

Nota de cierre: los veredictos vuelven al operador. Por sí solos no cambian ningún
status, ni de run ni de componente.
```

---

## BLOQUE J — STATUS DECLARADO Y NO-CLAIMS

**El run no se cerró.** No se tocó `status`, `progress` ni `closeout_result` de ningún run,
ni se aplicó `barrier`, ni se editó el canónico.

**Status en el que debe quedar: `active`.** El trabajo de taller está completo —medición,
reparación, tests, artefacto y registro— pero la QA humana del Bloque I está **preparada, no
ejecutada**, y es del operador. El run pasa a `completed` cuando el operador emita los
veredictos y cierre desde la consola.

- **No certifica nada.** Ni componente, ni motor, ni campo, ni resultado de QA cambia de
  estado por este encargo. La certificación **no es un concepto retirado** —sigue viva en
  `docs/governance/GOVERNANCE-AUTHORITY-AND-NO-CLAIMS.md` §2 y §3—; lo deprecado es
  `certified` como etiqueta primaria de status de un run
  (`JAME_HUMAN_GATE_POLICY_LITE.md` §9 y §15). No se confunden y aquí no se certifica nada.
- **No sustituye la línea base de `#1`:** layout, altura del cajón y curación de menú
  intactos, con test explícito que lo asegura.
- **No cambia la allowlist de `rule.math`** y no toma posición sobre si debería cambiar.
- **No repara ningún componente.** `hierarchy` sigue con el patrón de regresión math,
  `conceptGrid` sigue en la categoría math sin campo math, y el alias `success` de
  `detailsVariant` sigue resolviendo al fallback `ctx`. Los tres son de sus propios runs.
- **No decide ninguna de las ocho decisiones abiertas de `#8`** ni ninguna de las de la DoD
  de `#9`, y no edita esos contratos.
- **No toca el Formula Inserter** (`#49`), ni JAME Core, ni el runtime KaTeX del builder.
- **No resuelve la arista externa** del validador.
