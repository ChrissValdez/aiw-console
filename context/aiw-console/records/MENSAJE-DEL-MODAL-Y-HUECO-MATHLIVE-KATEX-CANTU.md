# Mensaje del modal de fórmula, medición del hueco MathLive/KaTeX y constantes rectas (cantu-studio)

- **Run:** `RUN-CANTU-MATH-ALLOWLIST-EXPANSION-AND-FORMULA-EDITOR-001` (queue_order 11, carril DEVELOPMENT, objetivo O5 «Editor and Engine Shared Features», fase O5.P1 «Smart Formula Field and Keyboard»)
- **Fecha:** 2026-07-29 · **Segundo encargo** del mismo run. El primero quedó en `AMPLIACION-ALLOWLIST-MATH-Y-EDITOR-FORMULAS-CANTU.md`, leído entero antes de tocar nada.
- **Guarda del canónico:** el `run_id` se derivó de `.aiw/roadmap/roadmap.json` por `queue_order` 11 y el título coincide verbatim: «Expand the math allowlist and repair the formula editor surface». **La guarda NO saltó.**
- **Roadmap medido en esta sesión, no heredado:** **7 objetivos / 28 fases / 73 runs**.

## El run, leído verbatim del canónico (sus tres campos)

- **`title`:** «Expand the math allowlist and repair the formula editor surface».
- **`summary`:** «Expand the rule.math allowlist to cover upper-secondary and undergraduate mathematics, repair the error message so it names the rejected command, and fix the formula editor surface shared by every math-capable component.»
- **`full_description`:** pide, entre otras cosas, «Repair the rejection message so it names the offending command and its position instead of stating only that the value is invalid, which is the accepted UI behavior gap this project has carried since the MathLive integration readiness run». **El texto no distingue superficie**, así que el modal del editor visual entra en el encargo: es lo que fundamenta (A).

`status` leído: `active`. `depends_on`: `[]`.

## (A) El modal nombra el comando y la causa

**Dónde estaba el mensaje realmente.** El literal «La fórmula no es válida.» no vivía en `SmartFormulaModal.jsx` sino en `SmartFormulaField.jsx:216`, dentro de `resolveSmartFormulaFieldMessage`. El modal monta ese campo, así que hereda el mensaje: reparar el campo repara el modal, y no hay dos implementaciones que sincronizar.

**Cómo se adaptó el helper, no el componente.** `smartFormulaValidationMessages.js` gana una tercera función, `describeSmartFormulaFieldMessage(errors)`, construida **sobre** `describeSmartFormulaValidationErrors` — la misma que consume el campo textual. El componente solo la llama:

```js
return describeSmartFormulaFieldMessage(output?.errors);
```

`SmartFormulaField.jsx` no contiene ningún código de `UNKNOWN_LATEX_COMMAND` / `BLOCKED_LATEX_COMMAND` / `INVALID_ENVIRONMENT` (verificado con `assert.doesNotMatch` en el test aditivo). Refactor interno del helper: los tres literales repetidos de la causa genérica se extrajeron a una constante `GENERIC_CAUSE`; no cambia ningún output.

**Los cuatro ejemplos ya medidos, verificados por el path real del modal** (`createSmartFormulaBlockGroupOutput` → `errors` → helper). Idioma: español, el medido de la UI.

| Entrada | Mensaje del modal, medido |
|---|---|
| `\notacommand{x}` | «La fórmula no es válida: el comando \notacommand **no está en la lista de comandos permitidos** (posición 1).» |
| `\def\x{y}` | «La fórmula no es válida: el comando \def está **bloqueado por seguridad** (posición 1) (+1 más).» |
| `\frac{1}` | «La fórmula no es válida: **\frac requiere 2 grupo(s) entre llaves**.» |
| `\begin{center}…` | «La fórmula no es válida: **el entorno "center" no está permitido** (+1 más).» |

Extras medidos: multilínea nombra la línea («… (línea 2, posición 1)»); `\dddot{x}` → «… el comando \dddot no está en la lista de comandos permitidos (posición 1)».

**El campo textual avanzado produce exactamente los mismos mensajes que antes.** Verificado letra por letra en el test aditivo contra los cuatro ejemplos del record anterior. Sigue cableado a la función de **causa**, no a la de mensaje (`assert.doesNotMatch(webBlockEditor, /describeSmartFormulaFieldMessage/)`).

**Sin causa nombrable el mensaje es el viejo, exacto:** «La fórmula no es válida.» — para `[]`, `undefined` y códigos desconocidos. Nunca empeora respecto de la línea base. La rama `MATH_BLOCK_GROUP_LINE_EMPTY`, que ya devolvía «Completa o elimina las líneas vacías.», **quedó intacta**.

## (B) Los dos tests guarda: antes/después declarado

Se leyeron enteros antes de tocarlos. Ambas aserciones son un `grep` del **texto fuente de `SmartFormulaField.jsx`**, dentro de un bloque que fija «el campo tiene una superficie de mensaje humana y no filtra códigos crudos». Ese propósito no es ninguno que este ticket no contemple: el mensaje se movió al helper compartido, así que el literal ya no está en ese archivo y la aserción tenía que moverse con él. **No paré: el ticket autoriza justo este cambio.**

| # | Archivo | Línea (antes) | Aserción ANTES | Aserción DESPUÉS |
|---|---|---|---|---|
| 1 | `tools/author-lite/compiler-api/tests/mathAuthoringSmartFormulaField.test.mjs` | 475 | `assert.match(field, /La fórmula no es válida\./u);` | `assert.match(field, /describeSmartFormulaFieldMessage\(output\?\.errors\)/u);` |
| 2 | `tools/author-lite/compiler-api/tests/webRuleSmartFormulaFieldRulePilot.test.mjs` | 293 | `assert.match(field, /La fórmula no es válida\./u);` | `assert.match(field, /describeSmartFormulaFieldMessage\(output\?\.errors\)/u);` |

**Por qué es deliberado y no una comodidad:** la nueva aserción es más fuerte, no más débil. Fija que el mensaje sale del **helper compartido**, que es precisamente la regla «no una implementación paralela» del criterio 2. El texto exacto que ve el autor pasa a estar cubierto por el test aditivo, que lo compara completo en vez de buscar una subcadena.

**Una línea por archivo.** Todo lo demás que esos tests aseguran quedó intacto y en verde: layout del teclado (`virtualKeyboard.layouts = ['numeric','symbols','alphabetic','greek']`), altura del cajón (`clamp(23rem, 50vh, 29rem)`, `maxHeight 86vh`, `height: '94vh'`), curación de menú (`createSmartFormulaCuratedMenuItems`), conservación del valor seguro, `LATEX_EMPTY` sin filtrarse a la UI, clase del chip ámbar, un solo `<math-field>`, `data-smart-formula-*`. Se añadió un comentario con el antes/después junto a cada línea tocada.

## (C) El hueco MathLive/KaTeX: MEDIDO, no reparado

**Versión de MathLive: 0.110.0** — verificada dos veces: `mathlive/package.json` del `node_modules` de `editor-ui` reporta `0.110.0`, y `editor-ui/package.json` la fija **exacta** (`"mathlive": "0.110.0"`, sin rango). Coincide con lo que midió el run del teclado. KaTeX: **0.16.9**, fijado en `src/builders/web/buildSingleWebLesson.js`.

### Método e instrumentos

MathLive 0.110.0 trae un build para Node, `mathlive-ssr.min.mjs`, con `validateLatex()` y `convertLatexToMarkup()`: **se interrogó al propio motor**, no a su documentación. KaTeX 0.16.9 se instaló ex profeso **fuera del repo** (scratchpad de la sesión) y se llamó `renderToString(..., { throwOnError: true, displayMode: true })` — display mode porque es lo que hace el path real: `renderRule.js` envuelve `rule.math` en `\[ … \]`.

1. Universo: **3 475** tokens tipo identificador extraídos del bundle de MathLive. Superset bruto.
2. Filtro: `validateLatex('\name')` sin `unknown-command` → **994** sobreviven.
3. Por cada superviviente se probaron seis formas (`\n`, `\n{x}`, `\n{x}{y}`, `\n(x)`, `\n x`, `\left\n x\right.`) en **ambos** motores. Conoce el nombre quien lo acepta bajo **alguna** forma.

**Corrección de método declarada:** una primera pasada extrajo solo literales `\\name` del bundle y **perdió `\dddot` y `\ddddot`** — el ejemplo del propio operador — porque MathLive los registra bajo clave pelada. Se ensanchó el universo y se recuperaron. Una segunda pasada paraba en la primera forma que MathLive aceptaba, y como MathLive rellena argumentos faltantes con placeholders, culpaba a KaTeX de desajustes de aridad (`\frac` solo). Las cifras reportadas son las de la tercera pasada.

### Tamaño del hueco

| Métrica | Valor medido |
|---|---|
| Tokens candidatos | 3 475 |
| Sobreviven el filtro de MathLive | 994 |
| Conocidos por **ambos** motores | 806 |
| **HUECO: MathLive sí / KaTeX 0.16.9 no** | **183 crudo → 179 real** |
| Artefactos restados | 4 — `constructor`, `hasOwnProperty`, `propertyIsEnumerable`, `toString`: la tabla de búsqueda de MathLive filtra `Object.prototype` |
| Del hueco, **en la allowlist de `rule.math`** | **1** (`begin`, y es artefacto: se probó `\begin` sin nombre de entorno) |
| Del hueco, en el blocklist | 5 |
| Del hueco, fuera de ambas listas | 173 |

Recontado en display mode: **179, idéntico**.

### El hallazgo que cambia la lectura del problema

**La allowlist cerrada es un subconjunto estricto del vocabulario de KaTeX 0.16.9.** Medido: de los 230 comandos admitidos, los únicos 4 que KaTeX «no conoce» son `begin`, `end`, `left` y `right`, que ninguna sonda de comando suelto puede satisfacer — artefactos, no huecos. Y los **12** entornos admitidos renderizan en KaTeX en display mode, **incluidos `smallmatrix`, `array` y `split`**.

> Nota de método sobre `split`: fuera de display mode KaTeX lo rechaza con «{split} can be used only in display mode». No es un defecto del entorno ni un error del primer encargo: es la sonda. El path real es display mode y ahí renderiza.

Consecuencia: **ningún comando del hueco puede llegar a la lección.** El validador lo rechaza antes, y el modal mantiene `canConfirm = Boolean(pendingOutput?.ok)`, así que el botón «Actualizar/Insertar fórmula» **queda deshabilitado**. El síntoma real del hueco no era output roto, era **fricción muda**: el modal dibujaba la fórmula, el botón no dejaba confirmar y el mensaje no decía por qué. **Eso es exactamente lo que (A) reparó en este encargo.**

### Los tres casos, con ejemplos medidos

**(i) MathLive lo dibuja y KaTeX no lo parsea — 179 nombres.** El caso del operador, `\dddot{x}`: MathLive lo valida y dibuja; KaTeX 0.16.9 responde «Undefined control sequence: \dddot». Igual `\ddddot`, `\differentialD`, `\placeholder`, `\overarc`, `\parallelogram`, `\euro`, `\enclose{circle}{x}`, `\exponentialE`, `\imaginaryI`. Los 179 están fuera de la allowlist salvo el artefacto `begin`.

**(ii) Los dos lo dibujan, distinto.** Comparados los 230 comandos admitidos glifo a glifo entre ambos motores: **11 diferencias**, de las cuales **7 son artefactos de extracción** — KaTeX dibuja `\sqrt`, `\vec`, `\longrightarrow` y `\longleftarrow` con SVG en vez de glifo de texto, y `\binom`/`\dbinom`/`\tbinom` solo difieren en el orden DOM de numerador y denominador. Quedan **4 diferencias reales de codepoint**, y **una sola es visible para un lector**:

| Caso | MathLive 0.110.0 | KaTeX 0.16.9 | ¿Se nota? |
|---|---|---|---|
| **`\mathbb` fuera de A–Z** — `\mathbb{x}` | 𝕩 U+1D569 | `x` U+78 | **Sí.** Igual `\mathbb{n}` (𝕟 / n), `\mathbb{1}` (𝟙 / 1), `\mathbb{0}`. `\mathbb{R}` sí coincide |
| `\omicron` | `o` U+6F (latina) | `ο` U+3BF (griega) | No, indistinguibles |
| `\perp` | ⟂ U+27C2 | ⊥ U+22A5 | No, misma forma |
| `\notin` | ∉ U+2209 | ∈ + `/` compuesto | No, misma forma |

**`\mathbb{x}` es el único caso medido donde el dibujo del modal y el de la lección difieren de verdad, y encima sí llega al output**: `\mathbb` está en la allowlist, así que valida, pasa schema y el compiler lo emite verbatim (verificado). El autor ve doble trazo en el modal y la lección imprime una equis normal. **La validación no puede atraparlo**, porque no es un problema de vocabulario.

**(iii) MathLive descarta parte de la entrada y muestra el resto.** `\begin{center}x+1\end{center}`: MathLive valida sin error y dibuja **solo `x+1`**, tirando el entorno; KaTeX lo rechaza («No such environment: center»). Mismo patrón con `\begin{equation}a\end{equation}` → MathLive muestra solo `a`. Para contraste, `\begin{flushleft}` y `\begin{tabular}` sí los rechaza MathLive.

### Cobertura del método, declarada

- Sondas de **comando suelto** con seis formas de argumento; sin contexto alrededor. Un comando que solo parsea dentro de un contexto que ninguna forma provee cae de **ambos** motores y no se cuenta (5 casos).
- Entornos medidos aparte, los 12.
- **Escapes de un carácter (`\,` `\;` `\!` `\\`) fuera del alcance:** el extractor es alfabético.
- La detección del caso (ii) compara glifos de texto extraídos: es **ciega a diferencias de layout, tamaño y espaciado**, y produce los falsos positivos SVG ya nombrados.
- La extracción sale de un bundle minificado: es un superset filtrado por el propio MathLive. Un comando registrado bajo una clave que jamás aparece como subcadena identificadora se perdería. La primera pasada ya perdió `\dddot`; por eso se reporta la del universo ensanchado.

### Opciones con su costo — la decisión es del operador

| Opción | Estado real medido | Costo |
|---|---|---|
| **Validar contra la allowlist al confirmar en el modal** | **Ya ocurre.** `canConfirm = Boolean(pendingOutput?.ok)`: con una fórmula inválida el botón está deshabilitado | **Cero.** Es la conducta vigente; no hay nada que construir |
| **Avisar en el propio modal** | **Entregado por (A) en este encargo.** El aviso nombra comando y causa | **Cero adicional.** Ya está |
| **Dejarlo como está y documentarlo** | Es lo único que queda por decidir, y **solo para el caso (ii)** | Cero de código; un párrafo en `REFERENCE-VIRTUAL-KEYBOARD-CAPABILITY-BOUNDARY.md`, que es de otro run |

**Residual, para que el operador decida y no yo:** el caso (ii) de `\mathbb` fuera de A–Z sobrevive a las tres opciones, porque no es un problema de vocabulario y ninguna validación lo ve. Las salidas concebibles —quitar `\mathbb` de la allowlist (rompe `\mathbb{R}`, que es legítimo y frecuente), normalizarlo en el closed-loop como se hace con `\exponentialE`, o subir la versión de KaTeX— **tocan la allowlist, el render o el runtime fijado, las tres fuera del alcance de este encargo. No se hizo ninguna.**

**El comportamiento de renderizado del modal NO se tocó.** El operador reporta que «jala excelente» con fórmulas válidas y ese es el caso explícito de no tocar lo que funciona.

## (D) `\exponentialE → \mathrm{e}` e `\imaginaryI → \mathrm{i}`

Aplicado en `smartFormulaCommandNormalizer.js`. El primer encargo lo recomendó sin aplicarlo; el operador lo aprobó.

**Verificado de punta a punta, no por inferencia.** `\exponentialE` → normalizador → `\mathrm{e}` → `validateLatexPayload` ACEPTA → `normalizeRuleMathValue` ACEPTA → `WebDraftSchema` ACEPTA → `compileDraftToJameData` emite **verbatim** → `renderRule.js` envuelve en `\[ … \]` → **KaTeX 0.16.9 renderiza** en display mode. Igual para `\mathrm{i}`, para `\mathrm{e}^{\mathrm{i}\pi} + 1 = 0`, para `\pi\mathrm{e}` y para `\frac{\mathrm{e}}{2}`.

**El glifo recto se midió, no se supuso.** En el HTML de KaTeX, `\mathrm{e}` sale **sin** la clase `mathnormal`; `e` pelada y `{e}` salen **con** ella. La `e` itálica que el primer encargo reportó como el precio de no tener `\mathrm` era real, y ese precio ya no se paga.

**Sigue sin pegarse al comando anterior**, que era la razón de no emitir la letra pelada: `\pi\exponentialE` → `\pi\mathrm{e}`, inequívoco (una letra pelada daría `\pie`).

**Los drafts guardados con `{e}` y `{i}` siguen siendo válidos. No hay migración y no se escribió ninguna.** Verificado y declarado: `{e}`, `{i}`, `{e}^{{i}\pi} + 1 = 0`, `\pi{e}` y `\frac{{e}}{2}` siguen pasando sanitizador, adapter y schema, y el compiler los emite **verbatim**. Nunca dependieron de la allowlist: `{`, `}` y las letras sueltas no son comandos.

**El LaTeX crudo de MathLive sigue rechazado sin normalizar:** `\exponentialE` e `\imaginaryI` siguen dando `UNKNOWN_LATEX_COMMAND`. El closed-loop es la única puerta.

**Test aditivo del run del teclado actualizado**, porque fijaba la forma `{e}`: `mathAuthoringVirtualKeyboardKatexCompatibility.test.mjs`, siete aserciones de igualdad — `'{e}'`→`'\\mathrm{e}'`, `'{i}'`→`'\\mathrm{i}'`, `'{e}^2'`→`'\\mathrm{e}^2'`, `'\\frac{{e}}{2}'`→`'\\frac{\\mathrm{e}}{2}'`, `'\\pi{e}'`→`'\\pi\\mathrm{e}'`, `'\\sin{i}'`→`'\\sin\\mathrm{i}'`, y la salida del compiler `'{e} + {i}'`→`'\\mathrm{e} + \\mathrm{i}'`. Nada más de ese archivo se tocó: la guarda del layout del teclado y el cableado en las dos costuras siguen igual y en verde.

## (6) La documentación falsa, corregida

`docs/reference/REFERENCE-MATH-FORMULA-COMPATIBILITY.md` §3. **Edición mínima; el documento no se reescribió.**

| Afirmación | Antes | Después |
|---|---|---|
| Comandos admitidos | «39 commands» + enumeración de los 39 | «230 commands», **sin transcribir**, remitiendo a `ALLOWED_LATEX_COMMANDS` en `tools/author-lite/editor-ui/src/features/math-authoring/constants.js` como fuente |
| Entornos | «9»: `gathered`…`cases` | «12»: los 9 + `smallmatrix`, `array`, `split`, remitiendo a `ALLOWED_LATEX_ENVIRONMENTS` |
| Bloqueados | «Blocked outright, **25**» contra una lista de 27 | «Blocked outright, **27**», con la corrección declarada en el propio texto |

La lista de 230 **no se transcribe**: una transcripción de ese tamaño caduca igual que caducó la de 39, y los diecisiete runs de componente leen este documento como autoridad. El banner lleva nota de actualización con el antes/después. **Error de «25» declarado como previo a este run**: la lista enumeraba 27 desde el día que se escribió; la lista estaba bien y la cifra mal. **El blocklist no se tocó.** ASCII puro verificado: **0 caracteres no-ASCII**, LF, 345 líneas.

**Afirmaciones caducadas encontradas al editar — nombradas y NO tocadas:** §12 dice que el «accepted UI behavior» del run de MathLive readiness «queda huérfano, ningún artefacto lo define». Dejó de ser cierto en dos pasos: el primer encargo lo definió para el campo textual y este lo extiende al editor visual. **No se editó**, porque el criterio 6 acota la edición a §3 y porque §12 habla del estado de otro run.

## (8) y (9) Medido y reportado, NO aplicado

- **Allowlist y blocklist intactos:** 230 comandos, 12 entornos, **27** entradas de blocklist. Congelados por cifra en el test aditivo.
- **`\dddot` sigue fuera de la allowlist.** La medición de (C) confirma que KaTeX 0.16.9 no lo define, así que admitirlo produciría output roto. **Reportado, no admitido.**
- **`\lt` y `\gt`: NO están hoy en la allowlist** — medido. Ambos motores los conocen: MathLive 0.110.0 los dibuja y KaTeX 0.16.9 los renderiza como `<` y `>`. Hoy `a \lt b` falla con `UNKNOWN_LATEX_COMMAND:lt`, y `a < b` falla con `ANGLE_BRACKET_PAYLOAD`: **no hay forma de escribir una desigualdad estricta en `rule.math`**, que es notación de secundaria. **Solo medido y reportado; NO admitidos aquí.** Si el operador quiere cerrarlo, corresponde a un encargo que sí pueda tocar la allowlist.
- **Reglas estructurales sin relajar.** `ANGLE_BRACKET_PAYLOAD` vigente, verificado en el test aditivo: `<` y `>` pelados siguen rechazados.

## Tests, lint y validador

- Suite completa de `compiler-api`: **274/274 antes** (verificado) → **284/284 después**. Cero fallos.
- Cobertura **aditiva** nueva: `tools/author-lite/compiler-api/tests/mathAuthoringFormulaEditorMessageAndUprightConstants.test.mjs`, **10 tests** — los cuatro ejemplos de (A) con el mensaje completo; el caso multilínea y los fallbacks genéricos; el campo textual sin mover una letra; el cableado al helper compartido y la ausencia de implementación paralela en el componente y en el modal; el gate de confirmación del modal; (D) constantes, cadena completa, drafts viejos válidos y crudo aún rechazado; y el congelado de allowlist/blocklist/estructurales.
- `eslint` (editor-ui): **EXIT 0**.
- **No se corrió ninguna suite de `aiw-console`.**
- Validador, por la vía que **no escribe** (`node tools/project-console/validate-project-console-state.mjs`): **EXIT 0 antes y después**. Medido: **7 objetivos / 28 fases / 73 runs**; **Docs indexed 147** antes y después; **Component statuses 16**, sin moverse. Único aviso: el **no bloqueante** de la arista externa (`RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`), intacto.

## Índice de documentos

`.aiw/docs/docs_index.json` — **147 entradas**, medidas, no heredadas. **Único escritor en esta ventana.** Edición quirúrgica de **una sola entrada** (índice 99, la de `REFERENCE-MATH-FORMULA-COMPATIBILITY.md`): `last_update_source`, `freshness` (`produced_2026-07-28` → `updated_2026-07-29`, vocabulario ya existente en el archivo) y `notes` (520 caracteres **añadidos**, prefijo previo intacto).

Protocolo cumplido: respaldo fuera del repo (scratchpad, md5 idéntico verificado); **roundtrip byte-exacto verificado ANTES de tocar** — `JSON.stringify(j, null, 2)` + CRLF + CRLF final reproduce el archivo byte a byte, así que la reescritura es demostrablemente inocua fuera de la entrada editada; diff a nivel de entradas = **1 entrada cambiada, 147 antes y 147 después, claves raíz idénticas, orden de campos de la entrada preservado**; escaneo no-ASCII antes y después = **1 carácter, un em-dash U+2014 preexistente en una entrada ajena**, sin cambio; CRLF y CRLF final preservados.

md5 `docs_index.json`: `dbe003bb01bdbe7100bc56958d847738` → `157eabdee5652310cbd4f4ba3148c51e`.

## Superficies protegidas y `.project/`

- **`.project/` NO se re-emitió y no se movió:** los seis archivos conservan md5 y mtime `2026-07-29 00:16:30` idénticos antes y después (docs_index `3ace29ad…`, git_history `9e246f56…`, guardrails `eb2b5e9b…`, no_claims `7b2616c5…`, roadmap `3371fd28…`, snapshot `fd37ccdc…`).
- **Canónico intacto:** `.aiw/roadmap/roadmap.json` md5 `9b30ef9952491ccfda9ac87e69c10faf` antes = después. Ningún `status`, `progress` ni `closeout_result` tocado.
- **Superficies del hilo paralelo intactas**, md5 antes = después: `aiw-console/roadmap/roadmap.json` `f299d968fdf781bf31863d696bd9610e`; `aiw-console/context/DECISIONES.md` `3f6bdf8816a0b43818519eb3582f6511`; `aiw-console/context/aiw-console/CONTRATO.md` `f77ccec64d99f2048d4bde41638cb228`. No se tocaron `context/aiw/`, handoffs, tests ni records existentes de aiw-console.
- **No tocado en cantu-studio:** el layout del teclado, la altura del cajón, la curación de menú, el renderizado del modal, «Placement avanzado», «Col span», el Formula Inserter, el resto del editor de bloques, la allowlist, el blocklist, y el artefacto de frontera del teclado.
- Sin git, sin servidores, sin suites de aiw-console. KaTeX 0.16.9 se instaló **fuera del repo** para medir.

## Status declarado (no aplicado)

El run queda en **`active`**, con la QA humana preparada y detenida. Ningún `status`, `progress` ni `closeout_result` fue tocado, ni se insertó, movió o renumeró ningún run. Al aprobar la QA, el cierre lo ejecuta el operador desde la consola global. **No se certifica nada:** la certificación no es concepto retirado, lo deprecado es `certified` como etiqueta primaria de status de un run, y aquí no se reclama ninguna.

## Archivos escritos por este encargo, y ninguno más

| # | Archivo (ruta repo-relativa) | Acción |
|---|---|---|
| 1 | `cantu-studio/tools/author-lite/editor-ui/src/features/math-authoring/smartFormulaField/smartFormulaValidationMessages.js` | Editado — `describeSmartFormulaFieldMessage` + `SMART_FORMULA_FIELD_INVALID_HEADING` + `GENERIC_CAUSE` |
| 2 | `cantu-studio/tools/author-lite/editor-ui/src/features/math-authoring/smartFormulaField/index.js` | Editado — dos exports nuevos |
| 3 | `cantu-studio/tools/author-lite/editor-ui/src/features/math-authoring/smartFormulaField/SmartFormulaField.jsx` | Editado — consume el helper (A) |
| 4 | `cantu-studio/tools/author-lite/editor-ui/src/features/math-authoring/smartFormulaField/smartFormulaCommandNormalizer.js` | Editado — (D) `\mathrm{e}` / `\mathrm{i}` |
| 5 | `cantu-studio/tools/author-lite/compiler-api/tests/mathAuthoringSmartFormulaField.test.mjs` | Editado — **una** aserción (B) |
| 6 | `cantu-studio/tools/author-lite/compiler-api/tests/webRuleSmartFormulaFieldRulePilot.test.mjs` | Editado — **una** aserción (B) |
| 7 | `cantu-studio/tools/author-lite/compiler-api/tests/mathAuthoringVirtualKeyboardKatexCompatibility.test.mjs` | Editado — siete igualdades `{e}`/`{i}` → `\mathrm{…}` (D) |
| 8 | `cantu-studio/tools/author-lite/compiler-api/tests/mathAuthoringFormulaEditorMessageAndUprightConstants.test.mjs` | Nuevo — cobertura aditiva (A) y (D), 10 tests |
| 9 | `cantu-studio/docs/reference/REFERENCE-MATH-FORMULA-COMPATIBILITY.md` | Editado — §3 y banner, edición mínima |
| 10 | `cantu-studio/.aiw/docs/docs_index.json` | Editado — quirúrgico, 1 entrada de 147 |
| 11 | `aiw-console/context/aiw-console/records/MENSAJE-DEL-MODAL-Y-HUECO-MATHLIVE-KATEX-CANTU.md` | Nuevo — este record |

Scripts de medición, respaldo del índice e instalación de KaTeX 0.16.9 viven **fuera del repo**, en el scratchpad de la sesión. Records existentes antes de este: **59**; con este: **60**. **Sin colisión de nombre.**

## QA humana — preparada y detenida (formato DoD §6, máximo 6)

**Run:** `RUN-CANTU-MATH-ALLOWLIST-EXPANSION-AND-FORMULA-EDITOR-001` · **Superficie:** editor visual de fórmula del bloque `rule` (Author Lite Web). **Carga:** arranca el editor (`npm --prefix tools/author-lite run dev`), crea o abre un draft Web y agrega un bloque **rule**. Cada comprobación es autocontenida y ninguna pide comparar contra un estado anterior. Los veredictos vuelven al operador y por sí mismos no cambian ningún status.

| # | Qué hacer | Qué debe pasar | Veredicto |
|---|---|---|---|
| 1 | Pulsa «Editar fórmula». En el campo, escribe `\` (MathLive abre el modo de comando), teclea `dddot`, pulsa Enter y escribe `x` | La fórmula se ve dibujada, **y** aparece un aviso ámbar que dice que el comando `\dddot` **no está en la lista de comandos permitidos**. El botón «Actualizar fórmula» / «Insertar fórmula» está **deshabilitado** | |
| 2 | Borra todo y arma `\frac{1}{2}` con el teclado matemático (pestaña `123`) | No aparece **ningún** aviso, el botón de confirmar está **habilitado**, y al confirmar la fórmula queda guardada y se ve en la vista previa | |
| 3 | Vuelve a «Editar fórmula», borra todo, y con el teclado matemático (pestaña `123`) pulsa la tecla **e**, luego `+`, luego la tecla **i**; confirma | Confirma sin error, y en la vista previa la **e** y la **i** se ven **rectas** (verticales), no inclinadas en cursiva | |
| 4 | Con esa fórmula en el bloque, genera la lección (Compile Web) y abre el HTML con internet | La fórmula aparece renderizada por KaTeX en la página final, con la **e** y la **i** **rectas**, no como texto fuente | |
| 5 | En el mismo bloque rule, abre «LaTeX textual avanzado», borra todo y escribe `\notacommand{x}` | El aviso nombra `\notacommand`, dice que no está en la lista de comandos permitidos, y **la fórmula anterior se conserva** | |
| 6 | Vuelve a «Editar fórmula» con una fórmula válida, pulsa «Línea» para agregar una segunda línea y déjala vacía | Aparece el aviso «Completa o elimina las líneas vacías.» y el botón de confirmar está deshabilitado | |

## Cierre

Producto de este encargo: un record (este archivo). Todas las cifras son medidas en la sesión, no heredadas del ticket. El hueco MathLive/KaTeX se midió y se reportó, **no se reparó**; la allowlist, el blocklist y el renderizado del modal no se tocaron. La certificación no se reclama; la QA queda en manos del operador.
