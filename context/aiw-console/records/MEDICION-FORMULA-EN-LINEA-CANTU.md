# MEDICIÓN — FÓRMULA EN LÍNEA EN CAMPOS DE PROSA (cantu-studio)

**Fecha:** 2026-08-04
**Repo medido:** `projects/cantu-studio` — **SOLO LECTURA. Ni un byte escrito ahí.**
**Único archivo escrito:** este record.
**Encargo:** medición + informe de opciones. **No hay diseño de autoría. No hay construcción.**

---

## 0. DECLARACIÓN — ESTE ENCARGO NO TUVO RUN

Este encargo **no tiene run** y no lo pide.

**Por qué:** es un trabajo de medición y de informe de opciones sobre un repo ajeno, cuyo
entregable completo es un record en `aiw-console`. No cambia código, no cambia contrato, no
cambia estado. Un run existe para serializar escrituras sobre el canónico y para dejar
trazabilidad de un cambio; aquí no hay cambio que trazar. La decisión que este informe habilita
—si se abre la fórmula en línea, y por qué opción— **es del operador**, y ese sí será el
momento de un run, con su clasificación y su cola.

No se tocó el roadmap canónico, ni `.project/`, ni el status de ningún run, ni se ejecutó Git.

**Ventana compartida:** corría en paralelo el taller de revalidación del componente `video`
(`RUN-JAME-WEB-VIDEO-REVALIDATION-001`, `status=active`, `queue_order=23`). No se tocó ningún
archivo suyo y no se comenta su trabajo. **No se corrió la suite completa.** Lo que sí se
corrió está declarado en §11.

---

## 1. LA RESPUESTA A LA PREGUNTA CENTRAL, EN UNA LÍNEA

> Si hoy un autor escribe a mano una fórmula delimitada dentro de un campo de prosa de un
> componente cualquiera, ¿qué le pasa a esa marca en las tres capas?

**No le pasa nada. Sobrevive intacta, byte a byte, en las tres capas, en los seis campos de
prosa sondados, y el HTML final la entrega a un barrido de KaTeX que recorre el documento
entero.** La marca ni se escapa, ni se rechaza, ni se transforma.

**La puerta que el operador cree cerrada está abierta.** Lo que falta no es la tubería: es la
autoría (un editor visual que inserte la fórmula en medio del párrafo), la garantía (nadie
valida ese tramo delimitado como LaTeX) y el contrato (nadie declara que ese campo pueda llevar
matemáticas). Eso cambia por completo el coste de las opciones de §9.

---

## 2. LA SONDA DE TRES CAPAS, EJECUTADA

**Arnés:** `probe-three-layers.mjs`, en el scratchpad de sesión, **fuera de los dos repos**.
Importa los dos esquemas, el compilador y el builder web reales del repo. No escribe en
`cantu-studio` (a `buildSingleWebLesson` se le omite `outputPath`, que es lo único que
dispararía escritura — `src/builders/web/buildSingleWebLesson.js:157-162`). Se retira al
terminar.

### 2.1 La cadena que entró — VERBATIM

```
la formula \(ax^2+bx+c\) tiene las siguientes caracteristicas
```

(Un solo backslash antes de cada paréntesis. Es exactamente la frase del encargo del operador.)

### 2.2 Resultado capa por capa

Seis campos de prosa de seis componentes distintos. Todos dieron el mismo resultado.

| Campo | 1a. Esquema EDITOR | 1b. Esquema COMPILADOR | 1c. Guardado relajado | 2. COMPILAR | 3. PINTAR |
|---|---|---|---|---|---|
| `narrative.text` | ACEPTA, intacta | ACEPTA, intacta | ACEPTA | intacta | en el HTML |
| `card.content` (normal) | ACEPTA, intacta | ACEPTA, intacta | ACEPTA | intacta | en el HTML |
| `list.items[0]` | ACEPTA, intacta | ACEPTA, intacta | ACEPTA | intacta | en el HTML |
| `iconList.items[0].text` | ACEPTA, intacta | ACEPTA, intacta | ACEPTA | intacta | en el HTML |
| `callout.content` | ACEPTA, intacta | ACEPTA, intacta | ACEPTA | intacta | en el HTML |
| `details.items[0].content` | ACEPTA, intacta | ACEPTA, intacta | ACEPTA | intacta | en el HTML |

**La cadena que salió del compilador**, en los seis casos, idéntica a la que entró:

```
la formula \(ax^2+bx+c\) tiene las siguientes caracteristicas
```

**Los fragmentos de HTML final, VERBATIM** (recortados alrededor de la fórmula):

```html
<div class="j-narrative-text">
                la formula \(ax^2+bx+c\) tiene las siguientes caracte…
```
```html
 <div class="j-web-card-body">
                la formula \(ax^2+bx+c\) tiene las siguientes caracte…
```
```html
<span style="color: #475569; line-height: 1.6;">la formula \(ax^2+bx+c\) tiene las siguientes caracte…
```

### 2.3 Los DOS esquemas, por separado — dónde divergen y dónde no

Divergen a propósito, y el propio repo lo documenta. Diferencias medidas (`diff` de los dos
archivos):

| Aspecto | `editor-ui/src/schemas/draftSchema.js` | `compiler-api/schemas/draftSchema.js` |
|---|---|---|
| `list.items` | solo `array` (`:729`) | `array` **o** `string` partido por líneas, vía `preprocess` (`:754-757`) |
| Esquemas exportados | solo `DraftSchema` (`:1046`) | `DraftSaveSchema` (`:1086`), `DraftSchema` (`:1098`), `WebDraftSchema` (`:1110`), `SlidesDraftSchema` (`:1122`) |
| `parseVideoUrl` | interno | exportado (`:275`) |
| Guardias de texto | **idénticas byte a byte** (`:98-264` en ambos) | **idénticas byte a byte** (`:98-264`) |

**La divergencia de `list.items` está declarada como intencional** en un comentario del propio
compilador (`compiler-api/schemas/draftSchema.js:736-747`): compatibilidad defensiva para drafts
legacy en disco.

**Para la fórmula en línea, la divergencia es irrelevante:** en los 69 campos de texto libre
medidos (§5), **editor y compilador dieron el mismo veredicto en el 100 % de las sondas**. No
hay ni un campo donde uno acepte la fórmula y el otro la rechace.

**El guardado relajado no valida nada.** `DraftSaveSchema`
(`compiler-api/schemas/draftSchema.js:1086-1090`) declara `webBlocks: z.array(z.any())`. Un
draft con la fórmula dentro se guarda en disco sin ninguna comprobación. La validación solo
ocurre al compilar.

---

## 3. QUÉ HACEN EXACTAMENTE LAS GUARDIAS DE TEXTO SEGURO

Las guardias viven, idénticas, en los dos esquemas
(`compiler-api/schemas/draftSchema.js:98-128` y `editor-ui/src/schemas/draftSchema.js:98-128`),
y una tercera copia en el compilador (`compiler-api/services/compiler.js:256-279`).

Son **cuatro** predicados, y **ninguno de ellos mira los caracteres de LaTeX**:

| Guardia | Archivo:línea | Qué busca |
|---|---|---|
| `containsUnsafeInlineText` | `draftSchema.js:98-104` | tag HTML, `on…=`, `javascript:`, `data:text/html` |
| `containsUnsafeCodeText` | `draftSchema.js:106-111` | igual, **sin** la comprobación de tag HTML |
| `containsUnsafeMarkdownText` | `draftSchema.js:113-119` | `**…**`, `__…__`, `![…](…)`, `[…](…)` |
| `containsUnsafePlainText` | `draftSchema.js:121-123` | `Inline` **+** `Markdown` |
| `containsUnsafeMathRuntimeText` | `draftSchema.js:125-128` | `MathJax =`, `renderMathInElement(`, `katex.` |

Y una quinta pieza en el compilador, `escapeHtml`
(`compiler-api/services/compiler.js:99-106`), que escapa **exactamente cinco** caracteres:
`&`, `<`, `>`, `"`, `'`.

### 3.1 Carácter a carácter — el resultado real

`true` = la guardia dispara y **rechaza**. Última columna = qué hace `escapeHtml` en el
compilador.

| Carácter que la fórmula necesita | Inline | Plain (=Inline+Markdown) | Code | MathRuntime | `escapeHtml` |
|---|---|---|---|---|---|
| barra invertida `\` | false | false | false | false | **NO lo toca** |
| signo de dólar `$` | false | false | false | false | **NO lo toca** |
| llave abre `{` | false | false | false | false | **NO lo toca** |
| llave cierra `}` | false | false | false | false | **NO lo toca** |
| paréntesis `(` `)` | false | false | false | false | **NO lo toca** |
| guion bajo `_` (uno) | false | false | false | false | **NO lo toca** |
| guion bajo `__` (dos) | false | **true** | false | false | no lo toca |
| ampersand `&` | false | false | false | false | **SÍ → `&amp;`** |
| corchetes `[` `]` | false | false | false | false | **NO lo toca** |
| circunflejo `^` | false | false | false | false | **NO lo toca** |
| porcentaje `%` | false | false | false | false | **NO lo toca** |
| almohadilla `#` | false | false | false | false | **NO lo toca** |
| menor `<` | false | false | false | false | **SÍ → `&lt;`** |
| mayor `>` | false | false | false | false | **SÍ → `&gt;`** |
| asterisco `**…**` | false | **true** | false | false | no lo toca |
| `f[x](y)` (corchete + paréntesis) | false | **true** | false | false | no lo toca |

**Lectura directa:** de los seis caracteres que el encargo nombra —barra invertida, dólar,
llaves, paréntesis, guion bajo, ampersand— **cinco pasan intactos por todas las guardias y por
`escapeHtml`**. El sexto, el ampersand, pasa las guardias pero **`escapeHtml` lo convierte en
`&amp;`**.

**El `&amp;` no rompe la fórmula.** El navegador decodifica la entidad a `&` en el DOM *antes*
de que KaTeX barra el documento; KaTeX ve `&`. Esto no es deducción mía: es la conducta que el
propio repo ya tiene medida y comentada en dos tests vivos
(`compiler-api/tests/mathAuthoringSmartFormulaFieldContractStability.test.mjs:100` y
`compiler-api/tests/webRuleMathAuthoringIntegration.test.mjs:117`).

### 3.2 Los mismos caracteres, ejecutados en campos reales

Seis campos, dos familias de guardia + la familia sin guardia. Todo confirmado E2E:

- **`narrative.text`, `card.content`** (guardia `Inline`): **los 16 payloads aceptados** por
  editor y compilador. Solo `&`, `<`, `>` cambian en la salida, y solo por `escapeHtml`.
- **`list.items[0]`, `iconList.items[].text`** (**sin guardia**): idéntico.
- **`timeline.steps[].description`, `hierarchy.nodes[].description`** (guardia `Plain`):
  aceptan **13 de 16**. Rechazan tres, y los tres son colisiones con el detector de Markdown,
  no con LaTeX:
  - `x__1__` → `RECHAZA` (`__[^_]+__`)
  - `x ** y ** z` → `RECHAZA` (`\*\*[^*]+\*\*`)
  - `f[x](y)` → `RECHAZA` (`\[[^\]]+\]\([^)]*\)`)

  Mensaje real del compilador:
  `[Compiler] Timeline Web paso 1 descripcion no puede incluir HTML, scripts, eventos, URLs peligrosas, Markdown o rich text.`

**Estas tres colisiones son el único daño colateral medido que la guardia `Plain` hace a
notación matemática**, y son casos de borde: `x__1__` (doble subíndice pegado), un producto
escrito `** `, y `f[x](y)`. Ninguna de las tres aparece en la sintaxis LaTeX habitual dentro de
`\( … \)`.

### 3.3 Delimitadores, medidos por capa

| Delimitador | `narrative.text` | `list.items[]` | `timeline.…description` |
|---|---|---|---|
| `\( … \)` (en línea) | INTACTO | INTACTO | INTACTO |
| `\[ … \]` (bloque) | INTACTO | INTACTO | INTACTO |
| `$$ … $$` (bloque) | INTACTO | INTACTO | INTACTO |
| `$ … $` | INTACTO | INTACTO | INTACTO |
| `\begin{aligned}x&=1\end{aligned}` | `\begin{aligned}x&amp;=1\end{aligned}` | ídem | ídem |

Los cuatro delimitadores atraviesan las tres capas sin tocarse. El entorno solo cambia por el
`&amp;` ya explicado.

---

## 4. EL RENDERIZADO DE MATEMÁTICAS ES GLOBAL — CONFIRMADO, CON UNA EXCEPCIÓN MEDIDA

### 4.1 Las dos vías del ticket: idénticas, byte a byte

| Vía | Archivo:línea | Línea de auto-render |
|---|---|---|
| HTML generado | `src/builders/web/buildSingleWebLesson.js:4` | `<script defer src="…/katex@0.16.9/dist/contrib/auto-render.min.js" onload="renderMathInElement(document.body);"></script>` |
| Previsualización | `tools/author-lite/compiler-api/services/previewRenderer.js:14` | *(la misma cadena)* |

Comparación ejecutada de la etiqueta `<script>` completa extraída de cada HTML producido:

```
previsualizacion: <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js" onload="renderMathInElement(document.body);">
html generado   : <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js" onload="renderMathInElement(document.body);">
¿IDENTICAS?     : true
```

Medido en ambas:
- **una sola** invocación, `renderMathInElement(document.body)`;
- **sin segundo argumento** → **sin objeto `delimiters`** → **rige el juego de delimitadores por
  defecto de KaTeX 0.16.9 auto-render**, el mismo en las dos vías;
- ámbito `document.body` → **barrido del documento entero**, sin importar qué componente emitió
  el texto;
- misma versión fijada: `katex@0.16.9`.

**Confirmado: el renderizado es global, y las dos vías reconocen exactamente los mismos
delimitadores, porque ninguna los configura.** No difieren. Eso *abarata* todo lo demás: no hay
que reconciliar dos regímenes.

**Límite honesto de esta medición:** que ese juego por defecto incluya `\( … \)` es
comportamiento de la librería KaTeX, y **no lo pude ejecutar localmente**: `katex` no está en
ningún `node_modules` del repo (verificado: 0 resultados para el paquete y para
`auto-render*`), se carga desde CDN y no hice red. Lo que sí está medido y es verificable en el
repo: **ninguna de las dos vías pasa un objeto `delimiters`**, así que **sea cual sea** el juego
por defecto, **es el mismo en las dos**.

### 4.2 La excepción: `format=moodle` no lleva KaTeX

Medido: `buildSingleWebLesson({…, format:'moodle'})` produce un HTML donde

- `¿trae assets KaTeX?` → **false**
- `¿trae renderMathInElement?` → **false**
- la fórmula sí está en el cuerpo (3 de 3 ocurrencias).

`src/builders/web/partials`… no: la causa está en
`src/builders/web/buildSingleWebLesson.js:153-155`, `renderMoodleHtml` devuelve solo
`MOODLE_LAYOUT_FIX + bodyContent`. Y `MOODLE_LAYOUT_FIX`
(`buildSingleWebLesson.js:5`) apunta a `.filter_mathjaxloader_equation`, la clase del filtro
**MathJax** de Moodle. **En Moodle el motor de matemáticas no es KaTeX y sus delimitadores son
los de MathJax, que Moodle configura fuera de este repo.** Es una tercera vía con régimen
distinto, y toda opción de §9 tiene que contarla.

### 4.3 Y una cuarta: Slides sí configura delimitadores, y son otros

`src/builders/slides/layouts/renderColumnsSlide.js:25-33` inyecta su propio disparador con
delimitadores **explícitos**:

```js
delimiters: [{left: "$$", right: "$$", display: true}, {left: "\\[", right: "\\]", display: true}, {left: "\\(", right: "\\)", display: false}]
```

Tres delimitadores, y **ningún entorno** `\begin{…}`. La vía Web no configura nada; la vía
Slides configura tres. **No son el mismo juego.** Fuera del alcance de este encargo, pero es el
dato que dice que "los delimitadores son uniformes" es cierto **solo dentro de Web**.

---

## 5. INVENTARIO DE CAMPOS DE PROSA — 17 COMPONENTES

**Método:** inventario **ejecutable**, no leído. A cada campo se le inyectaron seis sondas
discriminantes (`<b>x</b>`, `**negrita**`, `\[ y \]`, `MathJax = { tex: {} }`, `\(x^2\)`,
`\zzzz`) y **la guardia se dedujo del veredicto real de los dos esquemas**, no del código.

**Los 17 componentes web** (verificado en `blockCatalog.js`, ids `web-header`…`web-video`, y en
la unión `WebBlockSchema`, `compiler-api/schemas/draftSchema.js:990-1007`, que tiene 16 miembros
**+ `split`**, que solo existe como hijo directo de `columns`,
`compiler-api/schemas/draftSchema.js:865-936`).

### 5.1 CONTEO — LA UNIDAD ES **CAMPOS**, NO COMPONENTES

- **69 campos de texto libre** sondados, repartidos en los 17 componentes.
- **69 de 69 aceptan hoy una fórmula en línea `\( … \)` sin rechazo de esquema.**
- **0 la rechazan.**

Reparto por guardia, **en campos**:

| Guardia | Campos |
|---|---|
| `NINGUNA` (ni HTML ni Markdown se frenan en el esquema) | **14** |
| `Inline` (`containsUnsafeInlineText`) | **31** |
| `Inline+Math` (Inline + veto de `\[ \]` o de config runtime) | **2** |
| `Plain` (`containsUnsafePlainText` = Inline + Markdown) | **18** |
| `Plain+Math` | **4** |
| **Total** | **69** |

De esos 69, **20 son prosa** —texto corrido a nivel de frase, donde una fórmula en línea tiene
sentido—. Los otros 49 son títulos, etiquetas, badges, términos y campos de fórmula.

### 5.2 La tabla completa

`DIV` significaría divergencia entre los dos esquemas. **No apareció en ningún campo.**
Columna «prosa» = donde una fórmula en línea tendría sentido.

| Componente | Campo | Guardia | Esquema | prosa | ¿acepta `\(..\)`? |
|---|---|---|---|---|---|
| header | `title` | NINGUNA | ambos | | SÍ |
| header | `subtitle` | NINGUNA | ambos | ● | SÍ |
| card (normal) | `title` | Inline | ambos | | SÍ |
| card (normal) | `content` | Inline | ambos | ● | SÍ |
| card (normal) | `badge` | Inline | ambos | | SÍ |
| card (metric) | `value` | Inline | ambos | | SÍ |
| card (metric) | `label` | Inline | ambos | | SÍ |
| card (code) | `content` | NINGUNA | ambos | | SÍ |
| card (code) | `lang` | Inline | ambos | | SÍ |
| card (persona) | `author` | Inline | ambos | | SÍ |
| card (persona) | `role` | Inline | ambos | | SÍ |
| card (persona) | `content` | Inline | ambos | ● | SÍ |
| callout | `title` | Inline | ambos | | SÍ |
| callout | `content` | Inline | ambos | ● | SÍ |
| narrative | `title` | Inline | ambos | | SÍ |
| narrative | `text` | Inline | ambos | ● | SÍ |
| list | `title` | NINGUNA | ambos | | SÍ |
| list | `items[]` | NINGUNA | ambos | ● | SÍ |
| iconList | `title` | NINGUNA | ambos | | SÍ |
| iconList | `items[].badge` | NINGUNA | ambos | | SÍ |
| iconList | `items[].title` | NINGUNA | ambos | | SÍ |
| iconList | `items[].text` | NINGUNA | ambos | ● | SÍ |
| visual | `title` | NINGUNA | ambos | | SÍ |
| visual | `caption` | NINGUNA | ambos | ● | SÍ |
| video | `title` | NINGUNA | ambos | | SÍ |
| video | `caption` | NINGUNA | ambos | ● | SÍ |
| rule | `title` | Inline | ambos | | SÍ |
| rule | `math` | **LaTeX** (allowlist) | ambos | | SÍ |
| rule | `description` | Inline | ambos | ● | SÍ |
| details | `title` | Inline | ambos | | SÍ |
| details | `items[].summary` | Inline | ambos | ● | SÍ |
| details | `items[].content` | Inline | ambos | ● | SÍ |
| conceptGrid | `title` | Inline | ambos | | SÍ |
| conceptGrid | `items[].title` | Inline | ambos | | SÍ |
| conceptGrid | `items[].badge` | Inline | ambos | | SÍ |
| conceptGrid | `items[].terms[]` | Inline | ambos | | SÍ |
| conceptGrid | `items[].content` | Inline | ambos | ● | SÍ |
| table (simple) | `title` | Inline | ambos | | SÍ |
| table (simple) | `rows[][]` (celda) | Inline | ambos | ● | SÍ |
| table (rica) | `rows[].label.title` | Inline | ambos | | SÍ |
| table (rica) | `rows[].label.description` | Plain | ambos | ● | SÍ |
| table (rica) | `rows[].value.math.expression` | Inline+Math | ambos | | SÍ |
| table (rica) | `rows[].value.math.result` | Plain+Math | ambos | | SÍ |
| table (rica) | `rows[].value.badge.label` | Inline | ambos | | SÍ |
| arithmetic | `title` | Inline | ambos | | SÍ |
| arithmetic | `labels.rightHeader` | Inline | ambos | | SÍ |
| arithmetic | `counts[].math` | Inline | ambos | | SÍ |
| arithmetic | `result` | Inline | ambos | | SÍ |
| hierarchy | `nodes[].title` | Plain | ambos | | SÍ |
| hierarchy | `nodes[].badge` | Plain | ambos | | SÍ |
| hierarchy | `nodes[].math` | Plain | ambos | | SÍ |
| hierarchy | `nodes[].description` | Plain | ambos | ● | SÍ |
| timeline | `sectionTitle` | Plain | ambos | | SÍ |
| timeline | `steps[].title` | Plain | ambos | | SÍ |
| timeline | `steps[].badge` | Plain | ambos | | SÍ |
| timeline | `steps[].math` | Plain+Math | ambos | | SÍ |
| timeline | `steps[].description` | Plain | ambos | ● | SÍ |
| timeline | `steps[].detailsLabel` | Plain | ambos | | SÍ |
| timeline | `steps[].details` | Plain | ambos | ● | SÍ |
| columns | `title` | NINGUNA | ambos | | SÍ |
| split (hijo) | `title` | Plain | ambos | | SÍ |
| split (hijo) | `description` | Plain | ambos | ● | SÍ |
| split (hijo) | `steps[].badge` | Plain | ambos | | SÍ |
| split (hijo) | `steps[].math` | Plain+Math | ambos | | SÍ |
| split (hijo) | `result` | Plain+Math | ambos | | SÍ |
| split rows (hijo) | `rows[].label` | Plain | ambos | | SÍ |
| split rows (hijo) | `rows[].value` | Plain | ambos | ● | SÍ |
| split rows (hijo) | `rows[].badge` | Plain | ambos | | SÍ |
| split rows (hijo) | `footer` | Plain | ambos | | SÍ |

**14 campos sin ninguna guardia de esquema.** Ver §8 — no es un agujero, pero sí una asimetría
medida que la decisión debe conocer.

---

## 6. LA MATEMÁTICA QUE YA EXISTE, Y QUIÉN PONE LOS DELIMITADORES

### 6.1 Régimen de validación — medido, no leído

Nueve campos de matemáticas, siete sondas. `RECHAZA` = el esquema lo para.

| Campo | `\zzzz` inexistente | `\href` bloqueado | entorno `tikz` | llaves rotas | `\[ \]` | config runtime | prosa normal |
|---|---|---|---|---|---|---|---|
| **`rule.math`** | **RECHAZA** | **RECHAZA** | **RECHAZA** | **RECHAZA** | **RECHAZA** | acepta | acepta |
| `table.…math.expression` | acepta | acepta | acepta | acepta | RECHAZA | RECHAZA | acepta |
| `table.…math.result` | acepta | acepta | acepta | acepta | RECHAZA | RECHAZA | acepta |
| `arithmetic.counts[].math` | acepta | acepta | acepta | acepta | acepta | acepta | acepta |
| `arithmetic.result` | acepta | acepta | acepta | acepta | acepta | acepta | acepta |
| `hierarchy.nodes[].math` | acepta | acepta | acepta | acepta | acepta | acepta | acepta |
| `timeline.steps[].math` | acepta | acepta | acepta | acepta | acepta | RECHAZA | acepta |
| `split.steps[].math` | acepta | acepta | acepta | acepta | RECHAZA | RECHAZA | acepta |
| `split.result` | acepta | acepta | acepta | acepta | RECHAZA | RECHAZA | acepta |

**Un solo campo de los nueve se valida como LaTeX contra la lista blanca: `rule.math`.**
`compiler-api/schemas/draftSchema.js:780` → `safeRuleMathValue()` (`:161-177`) →
`validateRuleMathValue` (`math-authoring/ruleMathAdapter.js:143-145`) → `validateRuleLatex`
(`:40-74`) → `validateLatexPayload` (`math-authoring/latexSanitizer.js:263-348`).

**Los otros ocho viajan como texto opaco.** Solo los frenan las guardias genéricas de texto de
§3, más un veto puntual de `\[ \]` y de config runtime en algunos. `arithmetic` no tiene ni
eso: acepta las siete sondas.

Cifras de la lista blanca, leídas del módulo en ejecución:

- **230** comandos en `ALLOWED_LATEX_COMMANDS` (`math-authoring/constants.js:39-270`)
- **27** comandos en `BLOCKED_LATEX_COMMANDS` (`:296-324`)
- **12** entornos en `ALLOWED_LATEX_ENVIRONMENTS` (`:276-291`): `gathered, aligned, matrix,
  pmatrix, bmatrix, vmatrix, Vmatrix, Bmatrix, cases, smallmatrix, array, split`
- límite LaTeX: **1024** caracteres; segmento de texto: **10000**; segmentos por RichText:
  **96**; segmentos math por RichText: **24** (`:25-31`)

### 6.2 Quién pone los delimitadores — NO es uniforme

Medido inyectando `x^2` en cada campo y leyendo la salida compilada y el renderer:

| Campo | Salida del compilador | Quién pone el delimitador | Archivo:línea |
|---|---|---|---|
| `table` (fila rica) | `"\\( x^2 = y \\)"` | **EL COMPILADOR** | `compiler.js:529-536` (`buildTableMathContent`) |
| `rule.math` | `"x^2"` (pelado) | **EL RENDERER** → `\[ … \]` | `compiler.js:418` / `renderRule.js:101` |
| `split.steps[].math`, `split.result` | `"x^2"` (pelado) | **EL RENDERER** → `\[ … \]` | `compiler.js:733,737,745,749` / `renderSplitCard.js:91,105,130,145` |
| `timeline.steps[].math` | `"x^2"` (pelado) | **EL RENDERER** → `\[ … \]` | `compiler.js:1095` / `renderTimeline.js:255` |
| `arithmetic.counts[].math`, `result` | `"2^2"` (pelado) | **EL RENDERER** → `\( … \)` | `compiler.js:829,831` / `renderArithmetic.js:225,250,251,316,317` |
| **`hierarchy.nodes[].math`** | `"x^2"` (pelado) | **NADIE** | `compiler.js:961` / `renderHierarchy.js:174,197` |

**Tres regímenes distintos, y un cuarto que es un hueco.** `renderHierarchy.js:174` y `:197`
interpolan `node.math` directamente en un `<div class="j-t-math">` **sin ningún delimitador**.
Si el autor no escribe él mismo `\( … \)`, ese campo **nunca se pinta como matemática**: sale
como texto plano. No es un defecto que este encargo repare (§12), pero es dato duro para
cualquier opción que prometa "matemáticas uniformes".

El compilador además **quita** delimitadores en línea antes de reemitir:
`stripInlineMathDelimiters` (`compiler.js:523-527`) desnuda un `\( … \)` que envuelva el campo
entero, en `table` y en `split`. Es una normalización de campo completo, **no de fragmento**.

---

## 7. EL EDITOR DE FÓRMULAS, MEDIDO COMO PIEZA — NO CONSTRUIDO

### 7.1 Dónde vive y qué exporta

**Pieza:** `SmartFormulaField`
(`tools/author-lite/editor-ui/src/features/math-authoring/smartFormulaField/SmartFormulaField.jsx`,
**901 líneas**), exportada por defecto y con nombre (`:900-901`), y reexportada desde
`smartFormulaField/index.js:54`.

Módulos del paquete `smartFormulaField/` (13 archivos): adaptador, estado, fallback, cargador de
MathLive, normalizador de color, normalizador de comandos, mensajes de validación, formateador
de vista previa, más `SmartFormulaModal.jsx` (246 líneas) y `SmartFormulaPreview.jsx` (98).

**De qué depende** (imports reales, `SmartFormulaField.jsx:1-27`): `react` (5 hooks),
`lucide-react` (6 iconos), `MATH_NODE_MODES`, `MATH_BLOCK_GROUP_LINE_SEPARATOR`,
`loadMathLiveBoundary` (carga diferida de **MathLive**), y seis módulos hermanos del propio
paquete. **No importa nada del editor**: no conoce React Hook Form, ni `WebBlockEditor`, ni el
catálogo. Su acoplamiento con el resto del editor es cero.

### 7.2 ¿Es montable en un contexto distinto sin reescribirlo?

**Medido: sí, y ya nace preparado para ello.** Su firma de props
(`SmartFormulaField.jsx:224-241`) incluye:

```jsx
mode = MATH_NODE_MODES.INLINE,   // ← el valor POR DEFECTO ya es inline
value, initialLatex, onChange, onValidationChange,
label, disabled, readOnly, autoFocus, className,
onKeyboardVisibilityChange, keyboardContainerRef, isKeyboardOpen,
onKeyboardToggle, onActiveLayoutChange, colorPalette
```

Es un componente controlado, con `value`/`onChange`, sin dependencia de contexto ni de estado
global. **El único consumidor real hoy lo monta forzando el modo contrario:**
`WebBlockEditor.jsx:691-698` monta `<SmartFormulaModal … mode={MATH_NODE_MODES.BLOCK} …/>`, y
`WebBlockEditor.jsx:590-593` construye su salida con `{ mode: MATH_NODE_MODES.BLOCK }`.

**Lo que no está resuelto no es la pieza, es su punto de anclaje.** Hoy se monta como un
**modal** que edita **un campo entero**. Un punto de inserción dentro de un párrafo necesita
otra cosa: saber en qué offset del texto insertar, y devolver el resultado como un trozo, no
como el valor del campo. Eso no existe. **No se montó en ninguna parte. No se prototipó.**

### 7.3 El insertor global — el cero, verificado

**Pieza de interfaz:** `FormulaInserterShell`
(`math-authoring/formulaInserter/FormulaInserterShell.jsx`, **163 líneas**), definida en `:45`,
exportada por defecto en `:161` y con nombre en `:163`.

**Número real de superficies del editor que la importan: `0` (CERO).**

Barrido completo de `tools/` y `src/` (excluyendo `node_modules`) buscando
`FormulaInserterShell`. Los **únicos tres** resultados son las tres líneas del propio archivo:
su definición y sus dos exports. **Ni un solo importador.** Tampoco la reexporta
`math-authoring/index.js` (que sí exporta sus hermanos no-visuales, `:81-96`). La única mención
externa en todo el repo es una aserción **negativa** en un test
(`compiler-api/tests/webRuleSmartFormulaFieldRulePilot.test.mjs:259`), que comprueba que la
superficie de `rule` **NO** la contiene.

**El cero está verificado. La cifra real es 0, sobre 56 archivos `.jsx` del editor.**

Sus hermanos **no visuales** sí están cableados:
`formulaInserter.controller.js` → `smartFormulaFieldAdapter.js:18`;
`formulaInserter.actions.js` + `.types.js` → `smartFormulaFieldState.js:5,9` y
`math-authoring/index.js:81-96`; y dos tests los ejercitan
(`mathAuthoringFormulaInserter.test.mjs:7,11`, `mathAuthoringSmartFormulaField.test.mjs:40`).

**Traducción:** la lógica del insertor global existe, está probada y está conectada. **Lo único
huérfano es su carcasa de interfaz.**

---

## 8. LA PREGUNTA DE SEGURIDAD

### 8.1 ¿La validación de LaTeX sirve para un FRAGMENTO o está atada al campo entero?

**Está atada al campo entero. No hay ninguna forma de invocarla sobre un tramo.**

`validateLatexPayload(latex, opciones)` (`math-authoring/latexSanitizer.js:263-348`) recibe
**una cadena** y la valida **toda**: normaliza espacios de la cadena completa (`:271`), aplica
los patrones peligrosos a la cadena completa (`:282-286`), veta `<` y `>` **en cualquier
posición** (`:288-290`), exige **balance global** de `{}`, `()` y `[]` (`:292-302`), y exige que
**todo** `\comando` de la cadena esté en la lista blanca (`:304-313`). No acepta offsets, ni
rangos, ni una lista de tramos. **No hay parámetro que la limite a un fragmento.**

Medición directa:

```
formula sola: x^2 + y^2                              ACEPTA
formula con delimitador: \(x^2\)                     ACEPTA
FRASE + formula: "la formula x^2 tiene..."           ACEPTA
FRASE + formula delimitada EN LINEA                  ACEPTA
solo el FRAGMENTO extraido: ax^2+bx+c                ACEPTA
```

Que la frase completa «acepte» **no es una buena noticia: es la trampa.** Esa frase pasa porque
no contiene ni `<`, ni `\comando` desconocido, ni desbalance. **En cuanto la prosa lleva
castellano real, se rompe** — ver §8.2. La validación no está distinguiendo prosa de fórmula:
está tratando la frase entera como una expresión LaTeX que casualmente no infringe nada.

### 8.2 Qué rechaza hoy

Verificado por ejecución:

| Sonda | Veredicto | Código de error |
|---|---|---|
| `\zzzz` (comando inexistente) | RECHAZA | `UNKNOWN_LATEX_COMMAND` |
| `\href{http://a}{b}` | RECHAZA | `BLOCKED_LATEX_COMMAND` |
| `\htmlStyle{color:red}{y}` | RECHAZA | `BLOCKED_LATEX_COMMAND` |
| `\begin{tikzpicture}…\end{tikzpicture}` | RECHAZA | `INVALID_ENVIRONMENT` ×2 |
| `x < y` | RECHAZA | `ANGLE_BRACKET_PAYLOAD` |
| `\textcolor{url(javascript:1)}{x}` | RECHAZA | `JAVASCRIPT_URL`, `INVALID_COLOR_VALUE` |
| `\textcolor{#FF0000}{x}` | ACEPTA | — |

Es una lista blanca cerrada y estricta, con blocklist que gana
(`latexSanitizer.js:304-313`). Está bien construida.

### 8.3 Qué haría falta para validar solo el tramo delimitado — SIN IMPLEMENTARLO

Cuatro piezas que hoy **no existen** en ninguna de las capas:

1. **Un partidor de la cadena.** Una función que reciba una cadena de prosa y devuelva la
   secuencia `[texto, fórmula, texto, …]` reconociendo el delimitador elegido, con reglas para
   el delimitador sin cerrar, el delimitador escapado y el anidado. **No existe.** Lo más
   parecido, `stripInlineMathDelimiters` (`compiler.js:523-527`), solo desnuda un `\( … \)` que
   envuelva **la cadena entera**, anclado con `^…$`.
2. **La aplicación de `validateLatexPayload` a cada tramo de fórmula**, y de
   `validateSafePlainText` (`latexSanitizer.js:59-87`) a cada tramo de texto. Ambas ya existen y
   sirven tal cual; lo que falta es quién las llama por tramo.
3. **Un mapeo de errores con posición.** Hoy el error dice «la fórmula no es válida»; con
   fragmentos hay que decir **qué** fórmula, en qué offset de qué campo. El `ctx.addIssue` de
   Zod solo lleva `path` de campo (`draftSchema.js:161-177`), no offset dentro del valor.
4. **Un reescape asimétrico en el compilador.** Hoy `escapeHtml` se aplica a **todo** el valor
   (`compiler.js:99-106`). Con tramos hay que escapar el texto y **no** escapar (o escapar
   distinto) el LaTeX — porque en LaTeX `<`, `>` y `&` son significativos. Son **74 puntos de
   emisión** que hoy no distinguen (68 llamadas a `escapeHtml` + 6 a
   `escapeHtmlWithLineBreaks`).

**Ya existe media pieza, y es relevante: `RichTextV1`.** Contrato
`math-authoring/richText.js:98-167`, `kind: 'rich_text'`, versión `1.0.0`. **Ejecutado y
validado en esta medición**: una secuencia `[texto, math inline, texto]` **valida hoy sin tocar
nada**:

```json
{"kind":"rich_text","version":"1.0.0","segments":[
 {"kind":"text","type":"text","text":"la formula ","origin":"author"},
 {"kind":"math","type":"math","math":{"kind":"math-node","version":"1.0.0","mode":"inline",
   "latex":"ax^2+bx+c","source":"imported-json","textFallback":"ax^2+bx+c",
   "security":{"sanitized":true,"sanitizerVersion":"1.0.0"}}},
 {"kind":"text","type":"text","text":" tiene las siguientes caracteristicas","origin":"author"}]}
```

`getTextFallback` sobre esa estructura devuelve
`"la formula ax^2+bx+c tiene las siguientes caracteristicas"` — es decir, **ya hay una vía de
degradación a texto plano para consumidores que no entiendan trozos**. Y
`createRichTextFromLegacyString` (`math-authoring/legacyBridge.js`) ya convierte una cadena
legacy en un `RichTextV1` de un solo segmento de texto. **La opción B de §9 no parte de cero.**

También medido: `buildMathRenderInput` (`math-authoring/mathNode.js:46-62`) **no emite
delimitadores**. Devuelve `renderIntent: "inline"` y deja el delimitador a quien consuma — que
es exactamente la asimetría de §6.2, ya presente en el contrato.

### 8.4 ¿Hay hoy un campo de prosa que acepte contenido que no debería? — INVESTIGADO A FONDO

**Respuesta: no hay agujero de seguridad. Pero sí hay una asimetría de defensa que la decisión
debe conocer.**

**14 de los 69 campos no tienen ninguna guardia de esquema** — entre ellos `list.items[]`,
`list.title`, todos los de `iconList`, `header.title/subtitle`, `columns.title`,
`visual.title/caption`, `video.title/caption`, `card(code).content`. Sus esquemas son literales:
`z.string().min(1)` (`compiler-api/schemas/draftSchema.js:294-299` para `iconList`,
`:756` para `list.items`) y `z.string().optional()` (`:565-571` para `header`).

**Medido:** `<script>alert(1)</script>` y `<img src=x onerror=alert(1)>` **son aceptados por
ambos esquemas** en esos 14 campos. Los campos con guardia (`narrative.text`, `card.content`,
etc.) los rechazan.

**Pero no llegan vivos al HTML.** Comprobación decisiva, con el HTML VERBATIM:

```html
<span style="color: #475569; line-height: 1.6;">&lt;img src=x onerror=alert(1)&gt;</span>
```
```html
<div style="… line-height: 1.38; margin: 0;">
            &lt;img src=x onerror=alert(1)&gt;
          </div>
```
```html
<h3 style="font-size: calc(…);">&lt;img src=x onerror=alert(1)&gt;</h3>
```

En los tres campos: `¿existe "<img" en el HTML? → false`.
`¿existe "<script>alert" en el HTML? → false`.

`escapeHtml` (`compiler.js:99-106`) escapa `<`, `>`, `"`, `'`, `&` **antes** de que el valor
llegue a cualquier renderer, así que la carga cae en un nodo de texto y **no puede abrir un tag
ni romper un atributo**. La defensa es real y está en el compilador.

**El diagnóstico exacto, sin inflarlo:** no es una vulnerabilidad; es **una sola capa de defensa
donde en otros 55 campos hay dos**. Si algún día un renderer emitiera uno de esos 14 campos sin
pasar por `escapeHtml`, o si un consumidor distinto del builder web leyera la salida compilada,
el esquema no lo detendría. **Es un hallazgo de robustez, no de explotación, y por eso este
encargo NO se detiene** (§12): la condición de parada del ticket era «un campo de prosa acepta
contenido que no debería» **llegar**, y no llega.

**Y es exactamente el punto que decide el coste de abrir la puerta:** si un campo de prosa pasa
a llevar matemáticas, `escapeHtml` deja de poder ser la única defensa, porque la fórmula
necesita precisamente los caracteres que `escapeHtml` está para neutralizar.

---

## 9. LAS OPCIONES, CON COSTE MEDIDO

Magnitudes comunes, medidas:

- **74 puntos de emisión** de texto escapado en `compiler-api/services/compiler.js` (68
  `escapeHtml(` + 6 `escapeHtmlWithLineBreaks(`, descontando definiciones).
- **22 renderers** en `src/builders/web/partials/` — los puntos de lectura.
- **2 esquemas** que hay que mover en paralelo, más una tercera copia de las guardias en
  `compiler.js:256-279`.
- **56 archivos `.jsx`** en el editor.
- **32 archivos de test**, **350 declaraciones `test()`**.
- **4 vías de render** con régimen de delimitadores distinto: Web-generado, Web-preview
  (idénticas entre sí), Moodle (sin KaTeX), Slides (delimitadores explícitos, otro juego).

---

### OPCIÓN A — Delimitadores dentro del texto

*El campo sigue siendo una cadena; la fórmula viaja marcada dentro.*

| Dimensión | Medición |
|---|---|
| **Archivos que toca** | **0 obligatorios para que funcione** — ya funciona (§2). Para *garantizarlo*: los 2 `draftSchema.js` (una guardia nueva por campo abierto) y opcionalmente el compilador. |
| **Puntos de emisión** | 0 si no se reescapa; **hasta 74** si se decide no escapar dentro del tramo. |
| **Puntos de lectura** | **0.** Los 22 renderers no cambian: el barrido global ya los cubre. |
| **Tests que se pondrían rojos** | **Ninguno se rompe por no hacer nada.** Si se añade validación de tramo, los candidatos son los que fijan la conducta de texto seguro: `webTheoryTextBlocksSafety`, `webTimelineNormalStepsSafety`, `webHierarchyFlatNodeSafety`, `webTableSafety`, `webConceptGridSafety`, `webColumnsChildExpansionSafety`. |
| **Contenido ya escrito** | **Intacto.** Una cadena sin delimitadores sigue siendo una cadena sin delimitadores. Riesgo real y medido: un texto que **ya** contenga `$…$` o `\(…\)` por accidente **ya se está renderizando hoy** sin que nadie lo haya decidido. |
| **Validación que exige** | Un partidor de tramos + `validateLatexPayload` por tramo (§8.3). Hoy no existe ninguna de las dos cosas. |
| **¿Cambia el formato guardado?** | **NO.** El campo sigue siendo `string`. **Esto es lo que no se hornea.** |

**Riesgo específico medido:** con la guardia `Plain` (18 + 4 = 22 campos), `x__1__`, `**`, y
`f[x](y)` ya se rechazan (§3.2). Abrir A en esos campos exige decidir qué hacer con esas tres
colisiones.

---

### OPCIÓN B — El texto deja de ser una cadena: pasa a ser una secuencia de trozos

| Dimensión | Medición |
|---|---|
| **Archivos que toca** | Los 2 `draftSchema.js`; `compiler.js`; los renderers de los campos abiertos; las superficies del editor de esos campos; `previewMappers.js`; el puente legacy. |
| **Puntos de emisión** | **Todos los del campo abierto**, de los 74. Cada uno pasa de `escapeHtml(valor)` a recorrer segmentos. |
| **Puntos de lectura** | **1 renderer por campo abierto**, de los 22. Hoy interpolan una cadena; tendrían que recibir HTML ya compuesto o recorrer segmentos. |
| **Tests que se pondrían rojos** | Los mismos de A, **más** todos los que afirman la forma `string` de la salida compilada. `webTheoryCardsRuleBoxesParitySafety` (18 tests), `webTheoryTextBlocksSafety` (6), `webColumnsChildExpansionSafety` (27) están entre los primeros expuestos. |
| **Contenido ya escrito** | **Requiere migración o doble lectura.** Mitigación **ya construida y medida**: `createRichTextFromLegacyString` (`legacyBridge.js`) y `getTextFallback` (`richText.js:173-189`) resuelven la degradación en las dos direcciones. |
| **Validación que exige** | **Ya existe entera**: `normalizeRichTextV1` valida cada segmento, límites incluidos (96 segmentos, 24 math, 10000 caracteres de texto). **Ejecutado en esta medición: `[texto, math inline, texto]` valida hoy.** |
| **¿Cambia el formato guardado?** | **SÍ, y es irreversible barato.** Un campo pasa de `"…"` a `{kind:"rich_text",…}` en el Draft JSON. **Esto es lo que se hornea.** |

**El dato que más pesa a favor de B:** el contrato **ya está construido, versionado (`1.0.0`),
probado y exportado**. B no es «inventar un formato»; es **cablear uno que ya existe y que hoy
no usa ningún campo de prosa**.

---

### OPCIÓN C — Solo algunos campos se abren

| Dimensión | Medición |
|---|---|
| **Archivos que toca** | Proporcional. Abrir 4 campos ≈ 2 esquemas + ≈4 puntos de emisión + ≈4 renderers + ≈4 superficies. |
| **Puntos de emisión / lectura** | Exactamente los del subconjunto. |
| **Tests rojos** | Solo los del subconjunto. |
| **Contenido ya escrito** | Intacto fuera del subconjunto. |
| **Validación** | La misma que A o B, según cómo se abra cada campo. |
| **¿Cambia el formato guardado?** | **Depende de si C se apoya en A (no cambia) o en B (cambia, solo en esos campos).** |

**Coste oculto y medido de C:** produce **dos regímenes de campo de prosa conviviendo**. El repo
ya paga ese precio en matemáticas —§6.2 tiene cuatro regímenes de delimitador y un hueco— y ya
lo tiene documentado como fricción. C lo replica en prosa.

---

### OPCIÓN D — Que TODO el texto de todos los componentes se trate como LaTeX

**El operador la consideró. La medición la descarta.**

Se ejecutó `validateLatexPayload` sobre trece frases de prosa castellana normal, **sin ninguna
intención matemática**:

| Prosa | Veredicto | Error |
|---|---|---|
| `El 50% de los alumnos aprobo el examen.` | ACEPTA | — |
| `El archivo se llama datos_finales y esta listo.` | ACEPTA | — |
| `El costo es de $250 pesos por hora.` | ACEPTA | — |
| `La empresa Gonzalez & Asociados publico el informe.` | ACEPTA | — |
| `El color de la marca es #FF6600 segun el manual.` | ACEPTA | — |
| `La lección explica la relación entre número y área.` | ACEPTA | — |
| `Segun el autor [1] el metodo es valido.` | ACEPTA | — |
| **`Abrimos un parentesis (y no lo cerramos`** | **RECHAZA** | `MALFORMED_LATEX` |
| **`Si la temperatura es < 0 grados, el agua se congela.`** | **RECHAZA** | `ANGLE_BRACKET_PAYLOAD` |
| **`Escribe la ruta C:\usuarios\datos en la consola.`** | **RECHAZA** | `UNKNOWN_LATEX_COMMAND` ×2 |
| **`La solucion es {a, b, c y ya.`** | **RECHAZA** | `MALFORMED_LATEX` |

**Cuatro de trece frases perfectamente normales quedan rechazadas.** Y con precisión sobre lo
que el operador preguntó:

- **el porcentaje `%` → SOBREVIVE.** `validateLatexPayload` no lo mira.
- **el guion bajo `_` → SOBREVIVE.** Ni la validación LaTeX ni la guardia `Inline` lo tocan.
  (Con `__` doble sí choca, pero contra el detector de **Markdown**, no contra LaTeX — §3.1.)
- **el signo de pesos `$` → SOBREVIVE** el validador… **pero es precisamente el que rompe el
  render**: `$$` es delimitador por defecto de KaTeX auto-render. Dos precios en una misma
  lección los interpretaría como una fórmula de display y se comería el texto intermedio. **El
  validador lo deja pasar y el navegador lo destroza.**

**Lo que realmente rompe a un autor no es lo que el operador temía:** son el **paréntesis sin
cerrar**, la **llave sin cerrar**, el **`<`** y **cualquier barra invertida**. Un autor que
escriba «(y no lo cerramos» o «si x < y» vería su párrafo rechazado por una guardia que no tiene
nada que ver con lo que está escribiendo.

**Veredicto: D queda descartada, sostenido por medición.** No es una cuestión de gusto: la
validación de LaTeX está construida para **expresiones**, y una expresión exige balance global
de delimitadores y una lista blanca de comandos. La prosa no cumple ninguna de las dos
condiciones y no puede cumplirlas.

---

### OPCIÓN E — *No estaba en el ticket; la medición la sugiere*
**Cerrar la puerta antes de decidir cómo abrirla.**

La medición de §2 dice que **la fórmula en línea ya funciona de hecho, sin que nadie lo haya
decidido**. Eso significa que **existe una conducta no declarada en producción**: un autor que
escriba `$…$` o `\(…\)` hoy obtiene matemáticas renderizadas, y un autor que escriba dos precios
con `$` obtiene un desastre — y **ninguno de los dos casos está contratado ni probado**.

| Dimensión | Medición |
|---|---|
| **Archivos que toca** | Los 2 `draftSchema.js`: una guardia que rechace delimitadores no declarados en campos de prosa. |
| **Puntos de emisión / lectura** | **0.** |
| **Tests rojos** | Ninguno previsible: ningún test afirma hoy que un campo de prosa acepte delimitadores. |
| **Contenido ya escrito** | **Riesgo real:** cualquier lección ya guardada con `$` en prosa pasaría a fallar al compilar. Exige un barrido previo del corpus. |
| **¿Cambia el formato guardado?** | **NO.** |

Es la opción que **reduce** superficie en vez de ampliarla, y la única que convierte la conducta
accidental en conducta declarada antes de construir nada encima.

---

### RECOMENDACIÓN EXPLÍCITA — SIN DECIDIR

**La decisión es del operador. Esto es una recomendación, con su porqué medido.**

**Recomiendo C apoyada en A**, precedida de la parte diagnóstica de E, y **descarto D**.

**Por qué C+A y no B:**

1. **A ya funciona.** La medición de §2 es inequívoca: 69 de 69 campos, tres capas, cadena
   intacta. El coste de A no es construir la tubería; es **declararla y validarla**. B, en
   cambio, cambia el formato guardado — **y eso es lo que se hornea y no se deshace barato**.
2. **El barrido de matemáticas es global y las dos vías Web son idénticas** (§4.1). Ese es el
   hecho que hace barato a A: **cero renderers tocados**. B, en cambio, obliga a tocar un
   renderer por campo abierto, y esos renderers están en `src/builders/` — JAME Core, la zona
   que el propio `CLAUDE.md` del repo protege con más celo.
3. **C acota el daño de la asimetría.** Abrir los 20 campos de prosa a la vez cruza los cuatro
   regímenes de delimitador de §6.2 y las cuatro vías de render de §4, incluida Moodle, que no
   lleva KaTeX. Abrir **pocos** campos permite medir el comportamiento real en Moodle antes de
   comprometerse.
4. **La parte diagnóstica de E va primero, y es barata:** antes de decidir qué campos abrir,
   conviene saber **cuántas lecciones ya escritas contienen delimitadores en prosa**. Es un
   barrido de lectura sobre `src/content/author_lite/generated/`. Ese número cambia el orden de
   todo lo demás, y **este encargo no lo midió porque no estaba pedido**.

**Por qué no descarto B del todo:** su contrato `RichTextV1` **ya está construido, versionado,
probado y con puente legacy en las dos direcciones** (§8.3). Si el operador quiere fórmula en
línea **con editor visual** —insertar desde `SmartFormulaField` en medio del párrafo, que es lo
que el insertor global huérfano de §7.3 apunta—, **B es el destino natural y A es un rodeo**.
La pregunta que decide entre A y B no es técnica, es de producto: **¿el autor escribe la
fórmula a mano, o la inserta con el editor visual?** Si es a mano, A. Si es visual, B.

**Qué NO recomiendo, con medición:** D, descartada en §9-D. Y no recomiendo abrir ningún campo
sin resolver antes el hueco de `hierarchy.nodes[].math` (§6.2) ni la asimetría de los 14 campos
sin guardia (§8.4): ambos son deuda que cualquier opción hereda.

---

## 10. QUÉ RUNS QUEDARÍAN AFECTADOS

Recorrido del canónico `projects/cantu-studio/.aiw/roadmap/roadmap.json`.
**No se propone mover nada. No se clasifica nada.**

**Estado real medido:** 66 runs — `completed=24`, `planned=41`, `active=1`.

**Activo (taller paralelo, no se toca):**

| queue_order | run_id | Título VERBATIM |
|---|---|---|
| 23 | `RUN-JAME-WEB-VIDEO-REVALIDATION-001` | `Audit and implement the Video component` |

**Runs `planned` de componente que tocan campos de prosa o de matemáticas.**
La columna «campos» viene del inventario de §5 y §6.

| queue_order | run_id | Título VERBATIM | Campos que toca |
|---|---|---|---|
| 24 | `RUN-JAME-WEB-NARRATIVE-REPAIR-001` | `Audit and implement the Narrative component` | **prosa** (`text`) |
| 25 | `RUN-JAME-WEB-CALLOUT-REPAIR-001` | `Audit and implement the Callout component` | **prosa** (`content`) |
| 26 | `RUN-JAME-WEB-DETAILS-REPAIR-001` | `Audit and implement the Details component` | **prosa** (`summary`, `content`) |
| 27 | `RUN-JAME-WEB-ARITHMETIC-AUDIT-AND-REPAIR-001` | `Audit and implement the Arithmetic component` | **matemáticas** (`counts[].math`, `result` — texto opaco, delimitador del renderer) |
| 28 | `RUN-JAME-RULE-COMPONENT-REPAIR-AND-ACTIVATION-001` | `Audit and implement the Rule component` | **matemáticas** (`math` — **el único con allowlist LaTeX**) + **prosa** (`description`) |
| 30 | `RUN-JAME-WEB-SPLIT-SCOPE-AND-REPAIR-001` | `Decide scope and enable the Split component` | **matemáticas** (`steps[].math`, `result`) + **prosa** (`description`, `rows[].value`) |
| 31 | `RUN-JAME-WEB-TABLE-AUDIT-AND-REPAIR-001` | `Audit and implement the Table component` | **matemáticas** (`math.expression`, `math.result` — **el único donde el delimitador lo pone el compilador**) + **prosa** (celdas, `label.description`) |
| 32 | `RUN-JAME-WEB-CONCEPTGRID-AUDIT-AND-REPAIR-001` | `Audit and implement the ConceptGrid component` | **prosa** (`items[].content`) |
| 33 | `RUN-JAME-WEB-HIERARCHY-AUDIT-AND-REPAIR-001` | `Audit and implement the Hierarchy component` | **matemáticas** (`nodes[].math` — **el hueco de §6.2: nadie pone delimitador**) + **prosa** (`description`) |
| 34 | `RUN-JAME-WEB-TIMELINE-AUDIT-AND-REPAIR-001` | `Audit and implement the Timeline component` | **matemáticas** (`steps[].math`) + **prosa** (`description`, `details`) |
| 35 | `RUN-JAME-WEB-VISUAL-AUDIT-AND-REPAIR-001` | `Audit and implement the Visual component` | **prosa** (`caption` — sin guardia) |
| 38 | `RUN-CANTU-WEB-PACKET-VERIFICATION-BATCH-001` | `Verify the Header, List, IconList, and Card component packets` | **prosa** (`list.items[]`, `iconList.items[].text`, `card.content`, `header.subtitle`) — **todos menos `card` sin guardia** |
| 39 | `RUN-CANTU-WEB-PACKET-VERIFICATION-BATCH-002` | `Verify the Video, Narrative, Callout, and Details component packets` | **prosa** |
| 40 | `RUN-CANTU-WEB-PACKET-VERIFICATION-BATCH-003` | `Verify the Arithmetic, Rule, Split, and Table component packets` | **matemáticas** + **prosa** |
| 41 | `RUN-CANTU-WEB-PACKET-VERIFICATION-BATCH-004` | `Verify the ConceptGrid, Hierarchy, Timeline, and Visual component packets` | **matemáticas** + **prosa** |
| 42 | `RUN-JAME-WEB-READINESS-EVIDENCE-001` | `Audit the Web components as a whole` | todos |
| 44 | `RUN-JAME-FORMULA-INSERTER-INTEGRATION-001` | `Verify global Formula Inserter integration after component revalidation` | **el insertor global de §7.3 — el que hoy tiene 0 importadores** |
| 37 | `RUN-CANTU-COMPONENT-GUIDE-CONTENT-001` | `Write the Component Guide for the seventeen Web components` | documenta lo que el autor puede escribir en cada campo |

**El dato que responde a «va antes o después»:**

- **17 runs `planned` de componente** tocan campos de prosa o de matemáticas, y **quince de
  ellos ocupan queue_order 24–42, es decir, la cola inmediata**.
- **`RUN-JAME-FORMULA-INSERTER-INTEGRATION-001` (queue_order 44)** está declarado, por su propio
  título verbatim, como **posterior** a la revalidación de componentes: *«after component
  revalidation»*. **El canónico ya coloca la integración del insertor global después de la cola
  de componentes.**
- **`RUN-CANTU-COMPONENT-GUIDE-CONTENT-001` (queue_order 37)** documentará para el autor qué
  admite cada campo. Si la fórmula en línea se decide **después** de él, esa guía nacerá
  desactualizada.

**No propongo mover nada.** El dato está expuesto para que el operador decida.

---

## 11. VALIDADOR — SALIDA COMPLETA

Ejecutado por la vía que **no escribe**, desde `projects/cantu-studio`:

```bash
node tools/project-console/validate-project-console-state.mjs
```

**Salida completa, VERBATIM:**

```
Project Console state validation passed.
Roadmap v3 prototype: 7 objectives / 28 phases / 66 runs; queue groups needs_human_decision=0 now=1 ready_next=16 later=25 history=24
Roadmap v3 active run derived stages: RUN-JAME-WEB-VIDEO-REVALIDATION-001=none
Docs indexed: 149
Docs curated primary-visible: 60 of 149 registered
Component statuses: 16
Git provenance episodes: 9
Git history snapshot: 508 commits / 1 branches (1 visible, 0 backup hidden); current=main; run-associated=3; source=local_git_autosync
Roadmap rebase warnings (non-blocking):
- .aiw/roadmap/roadmap.json run RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 depends on RUN-CANTU-ROADMAP-CONTENT-AUDIT-001, which does not resolve in this roadmap. With a single roadmap loaded this cannot be decided: it may be a legal external dependency — a run that lives in another project (CONTRATO §10.d Regla 2) — or a typo in the run id. Both are possible and one loaded roadmap cannot tell them apart; resolve it against the full set of projects to distinguish external from write error.
```

**Cifras reales leídas de la salida:**

- **total de runs: 66**
- **`history=24`**
- **`ready_next=16`** ← el ticket no la daba a propósito. **Medida: 16.**
- otros grupos de cola: `needs_human_decision=0`, `now=1`, `later=25`
- 7 objetivos / 28 fases

**El aviso no bloqueante de la dependencia externa apareció, y es el conocido y legal.** No se
reparó (§12).

---

## 12. CIFRAS — VERIFICADAS UNA A UNA

| Cifra del ticket | Verificación | Resultado |
|---|---|---|
| **66 runs** | salida del validador + recuento propio sobre `roadmap.json` | **CONFIRMADA — 66** (`completed=24`, `planned=41`, `active=1`) |
| **`history=24`** | salida del validador; coincide con `completed=24` del recuento propio | **CONFIRMADA — 24** |
| **`ready_next=?`** | el ticket no la daba | **MEDIDA — 16** |
| **17 componentes** | 17 ids `web-*` en `blockCatalog.js` (`:140`–`:1082`); unión `WebBlockSchema` con 16 miembros (`draftSchema.js:990-1007`) **+ `split`**, que solo existe como hijo de `columns` (`:865-936`) | **CONFIRMADA — 17** |
| **350 tests en la suite del compilador** | **NO se corrió la suite entera** (taller paralelo vivo). Recuento **estático** de declaraciones `test()` a principio de línea en los 32 archivos `.test.mjs`: **350**. Sin `t.test(` (0) ni `describe`/`it` (0), así que no hay subtests que inflen o desinflen la cifra. Método **validado** ejecutando un archivo pequeño: `webIconListBadgeWidth.test.mjs` declara 3 y el runner reporta `tests 3 / suites 0 / pass 3`. | **350 declaraciones `test()`, contadas estáticamente.** No afirmo que la suite ejecute 350 tests verdes: **eso exigiría correrla entera y no la corrí.** |

**Dato adicional no pedido, expuesto sin resolverlo:** el validador reporta
`Component statuses: 16`, mientras el catálogo y el esquema dan **17** componentes web. La
diferencia es consistente con `split`, que no es un bloque de primer nivel. **No lo perseguí:**
está fuera del alcance y sería reparar deriva ajena (§13).

---

## 13. QUÉ **NO** SE HIZO

**Por prohibición explícita del encargo:**

- **No se escribió, editó ni creó ningún archivo dentro de `projects/cantu-studio`.**
  `git status --short` mostró el árbol **ya modificado al empezar**: 7 archivos de `.aiw/` y
  `.project/`. Al cerrar apareció además un octavo, sin seguimiento:
  `docs/_historical_run_record/RUN-JAME-WEB-VIDEO-REVALIDATION-001-OPERATOR-QA-PACKET.md`.
  **Los ocho son trabajo del taller paralelo de `video`, en curso durante esta ventana. Ninguno
  se tocó.**
- **No se construyó, montó ni prototipó la fórmula en línea.** `SmartFormulaField` se midió como
  pieza (§7) y **no se montó en ninguna parte**.
- **No se tocó el componente `video`** ni ningún archivo del taller paralelo.
- **No se corrió la suite completa.** Lo único ejecutado del repo:
  `node tools/project-console/validate-project-console-state.mjs` (lectura) y
  `node --test tools/author-lite/compiler-api/tests/webIconListBadgeWidth.test.mjs`
  (3 tests, 3 verdes, elegido por ser el archivo más pequeño y por no tocar `video`, solo para
  validar el método de recuento de §12).
- **No se tocó** el roadmap canónico, `.project/`, ningún status de run, Git, ni servidores.
- **No se decidió entre las opciones.** §9 entrega una recomendación explícita **y la decisión
  queda en el operador**.
- **No se clasificó ningún run.**
- **No se reparó ninguna deriva cruzada:** ni el aviso de dependencia externa del validador, ni
  el mojibake presente en los dos `draftSchema.js` (`LÃ­mite`, `âš ï¸`, `tÃ­tulo`… en
  `compiler-api/schemas/draftSchema.js:15,17,296,298`…), ni la discrepancia 16/17 de §12, ni el
  hueco de delimitador de `hierarchy.nodes[].math` de §6.2, ni la asimetría de los 14 campos sin
  guardia de §8.4. **Los cuatro últimos quedan reportados como hallazgo, sin dueño y sin
  reparar.**

**Por límite de la medición, declarado:**

- **No se ejecutó KaTeX.** No está en ningún `node_modules` del repo (verificado) y no se hizo
  red. Lo medido es que **ninguna de las dos vías Web configura `delimiters`**, luego el juego
  es el mismo en ambas (§4.1). **Que ese juego por defecto incluya `\( … \)` es comportamiento
  documentado de la librería, no algo que yo ejecutara aquí.**
- **No se midió el corpus ya escrito.** Cuántas lecciones de
  `src/content/author_lite/generated/` contienen ya delimitadores en prosa **no se midió**
  porque no estaba pedido — y es, según §9, el número que más ordena las opciones.
- **No se midió el comportamiento en Moodle.** Solo que su HTML **no lleva KaTeX** (§4.2).

**Por decisión de alcance, con su porqué:**

- **No se disparó la parada del §14 del ticket.** La condición era «la sonda revela que un campo
  de prosa ya acepta contenido que no debería». Se investigó a fondo (§8.4): 14 campos aceptan
  HTML en el esquema, **pero `escapeHtml` lo neutraliza antes del HTML final, verificado con el
  markup VERBATIM y con `<img`/`<script>alert` ausentes**. Es **robustez, no explotación**, y
  por eso el encargo siguió hasta el final en vez de detenerse.

**Arnés:** vivió en el scratchpad de sesión, fuera de los dos repos
(`probe-three-layers.mjs`, `probe-guards.mjs`, `probe-security.mjs`, `probe-security-2.mjs`,
`ctx.mjs`, `probe-preview.mjs`, `probe-preview2.mjs`, `probe-inventory.mjs`,
`probe-latex-fragment.mjs`, `probe-richtext.mjs`, `probe-richtext2.mjs`,
`probe-math-regime.mjs`). **Se retira al terminar.**

**Corrección de método, declarada:** la primera sonda de seguridad (`probe-security.mjs`) marcó
como «markup vivo» cargas que simplemente no tenían ningún carácter escapable, y una sonda de
previsualización perdió un nivel de escape al pasar por un heredoc del shell. **Ambos fueron
falsos positivos míos, ambos se detectaron y se rehicieron** con
`probe-security-2.mjs` + `ctx.mjs` (contexto HTML verbatim) y `probe-preview2.mjs` (backslash
construido con `String.fromCharCode(92)`). **Las cifras de este record son las de las sondas
corregidas.**
