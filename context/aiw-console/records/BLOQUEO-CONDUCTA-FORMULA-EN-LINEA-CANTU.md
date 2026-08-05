# BLOQUEO DE CONDUCTA — FÓRMULA EN LÍNEA EN CAMPOS DE PROSA (cantu-studio)

**Fecha:** 2026-08-04
**Run:** `RUN-CANTU-INLINE-FORMULA-BEHAVIOUR-LOCK-001` — **derivado, no tecleado** (§1).
**Repo escrito:** `projects/cantu-studio` — **un solo archivo, y es de test.**
**Repo escrito:** `projects/aiw-console` — **este record.**
**Encargo:** declarar con tests una conducta que ya existe. **Ni una línea de producción.**

---

## 1. EL RUN, DERIVADO DEL CANÓNICO

Recorrido de `projects/cantu-studio/.aiw/roadmap/roadmap.json`
(`schema_version = jame.roadmap_v3.v0.2-progress`), buscando `queue_order === 25`.
**Una sola coincidencia sobre 69 runs.**

| Campo | Valor derivado |
|---|---|
| `run_id` | **`RUN-CANTU-INLINE-FORMULA-BEHAVIOUR-LOCK-001`** |
| ubicación | objetivo `O5`, fase `O5.P7` |
| `queue_order` | 25 |
| `status` | `active` |
| `depends_on` | `RUN-JAME-MATH-FORMULA-COMPATIBILITY-CONTRACT-001` — `queue_order 8`, **`status=completed`**: la dependencia está satisfecha |

**Título en disco, VERBATIM:**

```
Lock the existing inline formula behaviour with tests before any component consumes it
```

**Casa carácter a carácter con el objetivo del ticket. No hay parada por este motivo.**

El validador lo confirma de forma independiente:
`Roadmap v3 active run derived stages: RUN-CANTU-INLINE-FORMULA-BEHAVIOUR-LOCK-001=none` (§9).

---

## 2. LOS CINCO CAMPOS — DERIVADOS DEL DISCO Y CONFIRMADOS

El `full_description` acota «the five prose fields the operator selected». La traducción
del ticket se resolvió contra los esquemas reales, no contra los records.

| # | Descripción del ticket | Campo real | Símbolo de esquema | Guardia |
|---|---|---|---|---|
| 1 | contenido de la nota desplegable por ítem | `details.items[].content` | `DetailsItemSchema.content` | `Inline` |
| 2 | contenido de la nota destacada | `callout.content` | `WebCalloutSchema.content` → `safeRequiredPlainText` | `Inline` |
| 3 | contenido de la tarjeta en su modo normal | `card(normal).content` | `WebCardShape.content` (`safeOptionalCardCodeText`) **+** `refineWebCard` → `requireSafeCardText` | `Code` **∪** `Inline` |
| 4 | contenido del comparador de conceptos por ítem | `conceptGrid.items[].content` | `ConceptGridItemSchema.content` → `safeRequiredLimitedPlainText(320)` | `Inline` + máx. 320 |
| 5 | descripción de la regla matemática | `rule.description` | `WebRuleSchema.description` → `safeOptionalPlainText` | `Inline`, opcional |

**Los cinco existen con la forma que los records describen. No hay parada por este motivo.**

Ubicación en los dos esquemas, y comparación ejecutada de cada definición:

| Símbolo | `compiler-api/schemas/draftSchema.js` | `editor-ui/src/schemas/draftSchema.js` | Comparación |
|---|---|---|---|
| `DetailsItemSchema` | `:320` | `:317` | **IDÉNTICOS byte a byte** |
| `ConceptGridItemSchema` | `:332` | `:329` | **IDÉNTICOS byte a byte** |
| `WebCardShape` | `:621` (`content` en `:635`) | `:608` (`:622`) | **IDÉNTICOS byte a byte** |
| `WebCalloutSchema` | `:715` | `:702` | **IDÉNTICOS byte a byte** |
| `WebRuleSchema` | `:776` (`description` en `:781`) | `:748` (`:753`) | **IDÉNTICOS byte a byte** |

Y las guardias de texto seguro, `:98-264` en ambos: **`diff` vacío. IDÉNTICAS byte a byte.**
Esto es lo que hace que la guardia esté **duplicada** y lo que justifica que los tests afirmen
**los dos** esquemas (§5).

### 2.1 Un hallazgo que ningún record previo separaba: **no hay una sola función de emisión**

Los cinco campos **no salen del compilador por la misma puerta**:

| Campo | Emisión | Archivo:línea |
|---|---|---|
| `details.items[].content` | `escapeHtmlWithLineBreaks` | `compiler.js:432` |
| `callout.content` | `escapeHtmlWithLineBreaks` | `compiler.js:1150` |
| `card(normal).content` | `escapeHtmlWithLineBreaks` | `compiler.js:401` |
| `conceptGrid.items[].content` | `escapeHtmlWithLineBreaks` | `compiler.js:452` |
| **`rule.description`** | **`escapeHtml`** | **`compiler.js:419`** |

`escapeHtmlWithLineBreaks` (`compiler.js:108-110`) es `escapeHtml` **más** `\n → <br />`.
La consecuencia está medida en §3.4 y fijada por un test.

---

## 3. LA MEDICIÓN — TRES CAPAS, CON LAS CADENAS EXACTAS

**Arnés:** en el scratchpad de sesión, **fuera de los dos repos**. Importa los dos esquemas,
el compilador, el `previewRenderer` y el builder Web reales. A `buildSingleWebLesson` se le
**omite `outputPath`**, que es lo único que dispara escritura
(`src/builders/web/buildSingleWebLesson.js:157-162`). **Se retira al terminar.**

La barra invertida se construyó con `String.fromCharCode(92)` para que ninguna capa de shell
pudiera comerse un nivel de escape — es la corrección de método que los dos records previos
declararon haber tenido que hacer.

### 3.1 La cadena que entra, VERBATIM

```
la formula \(ax^2+bx+c\) tiene las siguientes caracteristicas
```

### 3.2 Capa 1 — GUARDADO, en los cuatro pórticos

| Pórtico | Veredicto | Los cinco campos |
|---|---|---|
| `compiler-api` `DraftSaveSchema` (guardado relajado) | **ACEPTA** | **INTACTA** |
| `compiler-api` `WebDraftSchema` (compilar Web) | **ACEPTA** | **INTACTA** |
| `compiler-api` `DraftSchema` (legacy completo) | **ACEPTA** | **INTACTA** |
| **`editor-ui` `DraftSchema`** | **ACEPTA** | **INTACTA** |

**Cero divergencias entre los dos esquemas, en los cinco campos.**

### 3.3 Capa 2 — COMPILAR

```
ENTRA: la formula \(ax^2+bx+c\) tiene las siguientes caracteristicas
SALE : la formula \(ax^2+bx+c\) tiene las siguientes caracteristicas
```

**Idéntica en los cinco campos.**

**Y la cadena REAL del corpus ya publicado**, la que vive hoy en `details.items[].content`
en 4 archivos:

```
ENTRA: Pasos para resolver \( (x+3)^2 \). Se muestra el desarrollo paso a paso sin omitir detalles intermedios.
SALE : Pasos para resolver \( (x+3)^2 \). Se muestra el desarrollo paso a paso sin omitir detalles intermedios.
```

**⚠ TRAMPA MEDIDA, que ningún record previo declaraba.** El artefacto que se escribe a disco,
`compileDraftToWebJS`, **no contiene la subcadena literal**:

```
la fuente del artefacto contiene  \(ax^2+bx+c\)  : false
la fuente del artefacto contiene \\(ax^2+bx+c\\) : true
```

Recorte VERBATIM de la fuente emitida: `la formula \\(ax^2+bx+c\\) tiene las siguientes…`

**No es una transformación: es la representación de fuente.** El artefacto es JavaScript y la
barra invertida va escapada **para el literal de cadena**. Evaluado el artefacto, el valor de
runtime es `la formula \(ax^2+bx+c\) tiene las siguientes caracteristicas`, **idéntico a la
entrada**. Cualquier test que buscara la subcadena literal en el texto del artefacto daría un
falso negativo. **Este record lo declara para que nadie lo interprete como corrupción.**

### 3.4 Capa 3 — HTML FINAL

| Vía | Ocurrencias de la fórmula | `renderMathInElement` | `auto-render.min.js` | objeto `delimiters` |
|---|---|---|---|---|
| **Web generado** | **5 de 5** (una por campo) | **1** | 1 | **0** |
| **Previsualización** | **5 de 5** | **1** | 1 | **0** |
| **Moodle** | **5 de 5** | **0** | **0** | 0 |

Cadena exacta del disparador en Web y en previsualización:

```
onload="renderMathInElement(document.body);"
```

Primeros caracteres del documento Moodle, VERBATIM:

```html
<style>.filter_mathjaxloader_equation { display: block !important; width: 100% !important; }</style>
```

**El barrido es global, único y sin configurar.** Eso es lo que hace que ningún renderer tenga
que saber nada de matemáticas — y es exactamente lo que los tests fijan.

### 3.5 El salto de línea — la frontera de «no cambia nada»

```
ENTRA: primera linea\nsegunda linea

details.items[].content       -> primera linea<br />segunda linea
callout.content               -> primera linea<br />segunda linea
card(normal).content          -> primera linea<br />segunda linea
conceptGrid.items[].content   -> primera linea<br />segunda linea
rule.description              -> primera linea\nsegunda linea        ← NO cambia
```

**«Un campo sin fórmula no cambia en nada» es cierto para UNA SOLA LÍNEA.** Con salto de línea,
cuatro de los cinco insertan `<br />`. Se midió, y **se fijó con un test que declara el límite
en vez de esconderlo**. Prosa castellana normal de una línea —con `%`, con `_`— sale intacta en
los cinco.

---

## 4. LOS CARACTERES, UNO A UNO — Y LA DISTINCIÓN QUE IMPORTA

**Las dos columnas de la derecha son cosas distintas, y confundirlas es lo que produjo la
afirmación falsa del `<`.**

| Carácter | Sonda medida (prosa con fórmula) | ¿La GUARDIA rechaza? (los 2 esquemas) | ¿El COMPILADOR lo transforma? | Qué queda en el HTML final |
|---|---|---|---|---|
| barra invertida `\` | `La letra \(\alpha\) es griega.` | **NO** | **NO** | `\` literal |
| dólar `$` | `El coste \(\$5\) sube.` | **NO** | **NO** | `$` literal |
| llaves `{` `}` | `La mitad es \(\frac{1}{2}\) exacta.` | **NO** | **NO** | `{` `}` literales |
| paréntesis `(` `)` | `Resolver \((x+3)^2\) paso a paso.` | **NO** | **NO** | `(` `)` literales |
| guion bajo `_` | `El termino \(x_1\) es el primero.` | **NO** | **NO** | `_` literal |
| ampersand `&` | `El sistema \(\begin{aligned}x&=1\end{aligned}\) se resuelve.` | **NO** | **SÍ → `&amp;`** | **entidad HTML `&amp;`** |
| **menor que `<`** | `Si \(x < 5\) entonces la desigualdad se cumple.` | **NO** | **SÍ → `&lt;`** | **entidad HTML `&lt;`** |
| mayor que `>` | `Si \(x > 5\) entonces la desigualdad se cumple.` | **NO** | **SÍ → `&gt;`** | **entidad HTML `&gt;`** |
| comilla simple `'` | `La derivada \(f'(x)\) existe.` | **NO** | **SÍ → `&#39;`** | **entidad HTML `&#39;`** |

**Resultado idéntico en los cinco campos, sin una sola excepción.**

**Dos lecturas, y sólo la primera es de este repo:**

1. **Lo que la guardia hace: NADA.** Ninguna de las nueve sondas es rechazada por ninguno de los
   dos esquemas, en ninguno de los cinco campos. **La guardia de esquema no toca un solo
   carácter de LaTeX.** Lo que transforma es el **compilador**, al emitir, y sólo cinco
   caracteres: `&`, `<`, `>`, `"`, `'` (`compiler.js:99-106`).
2. **Los delimitadores nunca se tocan.** En las nueve sondas, `\(` y `\)` sobreviven enteros.
   El escapado cambia el carácter de dentro, **no la marca que delimita la fórmula**.

---

## 5. VEREDICTO SOBRE LA AFIRMACIÓN DEL `<`

**Dónde vive la afirmación:** no está en los dos records que el ticket manda leer. Está en
**`REVALIDACION-COMPONENTE-TEXTO-CANTU.md:481-493`**, en una tabla de once formas medidas sobre
`narrative.text`. VERBATIM, las tres filas:

```
| **ampersand de LaTeX** | ACEPTA | `Matriz \(\begin{matrix} a &amp; b \end{matrix}\) en linea.` | sí, **corrompido** |
| **comilla dentro**     | ACEPTA | `El caso \(x&#39;=2\) tambien.`                            | sí, **corrompido** |
| **menor que**          | ACEPTA | `Si \(a &lt; b\) entonces sigue.`                          | sí, **corrompido** |
```

Y su explicación, VERBATIM:

> **Las tres corrupciones y el `<br />` tienen una sola causa, y está citada:**
> `escapeHtmlWithLineBreaks` … Los caracteres que escapa son exactamente los que LaTeX usa para
> alinear matrices (`&`), para la derivada (`'`) y para desigualdades (`<`, `>`).

### 5.1 El veredicto

**LA MEDICIÓN ES CORRECTA. LA PALABRA ES FALSA.**

- **Lo que ese record midió bien:** el compilador escapa. `\(a < b\)` sale como `\(a &lt; b\)`.
  **Lo reproduzco exactamente**, en los cinco campos y también en `narrative.text` (§7).
- **Lo que ese record afirma de más:** llamar a eso «corrompido». **«Corrompido» es una
  afirmación sobre lo que el lector recibe, y ese record no midió al lector: midió la fuente
  del HTML.** Escapado ≠ corrompido. Una entidad HTML en un nodo de texto **es** el carácter;
  es su representación obligatoria en la fuente del documento.

### 5.2 La evidencia que lo desmiente, y toda es verificable

1. **El operador lo probó en pantalla.** Escribió `Si \(x < 5\) entonces la desigualdad se
   cumple.` en un campo de prosa y salió correctamente compuesta.
2. **El propio repo ya lo tiene declarado, en dos tests vivos y verdes.** Verificado leyéndolos,
   no heredado. `mathAuthoringSmartFormulaFieldContractStability.test.mjs:100-102`, VERBATIM:

   > `// En el compilado, el `&` estructural va escapado como `&amp;` (escapeHtml); el`
   > `// browser lo decodifica a `&` en el DOM antes de KaTeX.`

   E idéntico en `webRuleMathAuthoringIntegration.test.mjs:113-115`.
3. **El repo ya DEPENDE de ello en producción.** `rule.math` —el único campo con lista blanca
   LaTeX— también pasa por `escapeHtml` (`compiler.js:418`), y el corpus tiene 12 ocurrencias de
   `\begin{cases}` / `\begin{aligned}` con `&` en `timeline.steps[].math`. Si el escapado
   rompiera las matemáticas, **eso ya estaría roto y visible hoy**.
4. **Y existe ya un test que afirma exactamente el caso `<`**, que ningún record previo citó:
   `webHierarchyFlatNodeSafety.test.mjs:527` inyecta `math: '\( a < b \)'` y `:550` afirma
   `assert.equal(hierarchy.nodes[0].math, '\( a &lt; b \)')`. **El repo ya trata ese escapado
   como conducta correcta, no como rotura.**

### 5.3 Lo que NO puedo afirmar, y no lo afirmo

**No ejecuté un parser HTML.** El navegador integrado de esta sesión no ejecuta páginas
`file://` (las sirve como instantánea estática), la extensión de Chrome no está conectada, y
levantar un servidor está fuera de alcance. **Por tanto no medí yo mismo el `textContent` del
nodo de texto.**

Lo que sí medí llega hasta el HTML final y ahí se detiene. **La decodificación de la entidad
ocurre fuera de este repositorio** y por eso **ningún test de este run la afirma** (§6). La
declaro como frontera en vez de disfrazarla.

**Redacción correcta, y es la que usan los tests:** el `<` **se escapa**; **no se corrompe**.

---

## 6. LOS TESTS ESCRITOS

**Un solo archivo nuevo. Cero archivos de producción tocados.**

```
tools/author-lite/compiler-api/tests/webInlineFormulaProseBehaviourLock.test.mjs
```

**13 declaraciones `test()`.** Ninguna afirma nada que no esté medido en §3, §4 o §7.

| Test | Qué fija | Medición que lo respalda |
|---|---|---|
| 1 | guardado intacto en los **3 pórticos de `compiler-api`**, los 5 campos | §3.2 |
| 2 | guardado intacto en el **esquema del editor**, los 5 campos | §3.2 |
| 3 | compilado intacto, los 5 campos | §3.3 |
| 4 | **la cadena real del corpus** de `details.items[].content` compila intacta | §3.3 |
| 5 | llega al HTML Web **5 de 5** + **un solo** `renderMathInElement(document.body)` + **sin** `delimiters` | §3.4 |
| 6 | ídem en la previsualización | §3.4 |
| 7 | prosa sin fórmula: sin cambios en los 5 | §3.5 |
| 8 | **el límite de esa afirmación**: 4 de 5 convierten `\n` en `<br />`; `rule.description` no | §3.5 |
| 9 | **ninguna guardia rechaza** ninguno de los 9 caracteres, en **los dos esquemas** | §4 |
| 10 | `\ $ { } ( ) _` llegan intactos al HTML | §4 |
| 11 | `& < > '` se escapan, **y ése es el único cambio**; los delimitadores sobreviven | §4 |
| 12 | **frontera Moodle**: la fórmula llega literal **y no llega ningún motor** | §3.4, §8 |
| 13 | **frontera Slides**: los 5 kinds **no son bloques de diapositiva** | §8 |

**Decisión declarada — el test 2 estrena un acoplamiento.** Es el **primer test de
`compiler-api` que importa el esquema del editor** (verificado: 0 de los 32 archivos previos lo
hacían). Se hizo a propósito: **la guardia está duplicada byte a byte**, y sin esta aserción un
cambio en la copia del editor no pondría nada en rojo — que es justo el agujero que este run
existe para cerrar. **Coste:** los tests de `compiler-api` pasan a necesitar
`editor-ui/node_modules` instalado, y cargan una segunda mayor de `zod` (4.4.2 en el editor,
3.25.76 en el compilador) en el mismo proceso. **Medido: funciona, 13 de 13 en verde.** Queda
declarado por si el operador prefiere revertir esa aserción.

### 6.1 Salida — el archivo nuevo

```
node --test tools/author-lite/compiler-api/tests/webInlineFormulaProseBehaviourLock.test.mjs
```

```
✔ the five prose fields store a delimited inline formula unchanged in every compiler-api gate (9.9097ms)
✔ the five prose fields store a delimited inline formula unchanged in the editor-ui schema (8.9978ms)
✔ the compiler emits the delimited inline formula unchanged for the five prose fields (5.8051ms)
✔ the formula already published in details.items[].content compiles unchanged (0.8495ms)
✔ the delimited formula reaches the generated web HTML where the global math pass can see it (21.5823ms)
✔ the preview path carries the delimited formula with the same single global math pass (21.0821ms)
✔ prose with no delimited formula is left untouched in the five fields (8.1177ms)
✔ the untouched claim is bounded: four of the five fields turn a newline into <br /> (1.8052ms)
✔ no guard of the five fields rejects any character a formula needs, in either schema (8.1502ms)
✔ backslash, dollar, braces, parentheses and underscore reach the HTML untouched (39.9733ms)
✔ ampersand, angle brackets and apostrophe are HTML-escaped, and that is the only change (2.9879ms)
✔ the Moodle output carries the formula literally and carries no math engine of its own (6.1249ms)
✔ the five prose fields never travel the Slides delimiter set (0.8097ms)
ℹ tests 13
ℹ suites 0
ℹ pass 13
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 360.464
```

### 6.2 Salida — el nuevo **más los directamente relacionados**

**NO se corrió la suite completa.** Los 9 archivos que sí se corrieron, y por qué: los que
tocan los componentes de los cinco campos, más los tres que ya contenían un delimitador en
línea.

```
node --test \
  tools/author-lite/compiler-api/tests/webInlineFormulaProseBehaviourLock.test.mjs \
  tools/author-lite/compiler-api/tests/webTheoryTextBlocksSafety.test.mjs \
  tools/author-lite/compiler-api/tests/webTheoryCardsRuleBoxesParitySafety.test.mjs \
  tools/author-lite/compiler-api/tests/webConceptGridSafety.test.mjs \
  tools/author-lite/compiler-api/tests/webRuleMathAuthoringIntegration.test.mjs \
  tools/author-lite/compiler-api/tests/webRuleSmartFormulaFieldRulePilot.test.mjs \
  tools/author-lite/compiler-api/tests/webHierarchyFlatNodeSafety.test.mjs \
  tools/author-lite/compiler-api/tests/webTablesParitySchemaCompiler.test.mjs \
  tools/author-lite/compiler-api/tests/webColumnsChildExpansionSafety.test.mjs
```

```
ℹ tests 117
ℹ suites 0
ℹ pass 117
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 771.1607
```

**117 de 117 en verde. Nada verde se puso rojo.**

---

## 7. OBSERVACIÓN — EL CAMPO DE PROSA DEL COMPONENTE DE TEXTO

`narrative.text` está **FUERA del conjunto por decisión escrita en el `full_description`**
del run: *«The prose field of the narrative component is NOT in this first set: its own run is
open while this is written, and it enters on a second pass.»*

**Se midió. NO se escribió ningún test que lo fije.** Ni se tocó ningún archivo suyo.

| Sonda | Guardia (los 2 esquemas) | ENTRA → SALE |
|---|---|---|
| fórmula limpia | ACEPTA | `la formula \(ax^2+bx+c\)…` → **idéntica** |
| **cadena del operador con `<`** | ACEPTA | `Si \(x < 5\)…` → `Si \(x &lt; 5\)…` **escapada** |
| ampersand | ACEPTA | `…x&=1…` → `…x&amp;=1…` **escapada** |
| comilla simple | ACEPTA | `\(f'(x)\)` → `\(f&#39;(x)\)` **escapada** |
| sin fórmula | ACEPTA | **idéntica** |
| dos líneas | ACEPTA | `\n` → `<br />` |

**Conducta idéntica a los cuatro campos que emiten por `escapeHtmlWithLineBreaks`.** Cuando
`narrative.text` entre en la segunda pasada, **no hay sorpresa que descubrir**: la medición ya
está hecha y coincide.

---

## 8. LAS FRONTERAS, DECLARADAS Y NO DISFRAZADAS

| Frontera | ¿Se puede afirmar desde un test? | Qué se hizo |
|---|---|---|
| La fórmula llega al HTML y el HTML dispara **un** barrido global sin `delimiters` | **SÍ** | **Afirmado** (tests 5 y 6) |
| **Que KaTeX componga `\( … \)`** | **NO.** `katex` no está en ningún `node_modules` del repo; se carga por CDN. **No se ejecutó.** | **NO se afirma.** Declarado en la cabecera del archivo de test |
| **Que el navegador decodifique `&lt;` antes del barrido** | **NO.** Exige un parser HTML; ninguno disponible (§5.3) | **NO se afirma.** Declarado en el comentario del test 11 |
| **Moodle: la fórmula llega literal y no hay motor propio** | **SÍ** | **Afirmado** (test 12) |
| **Moodle: qué ve el alumno** | **NO.** Lo decide el filtro MathJax de esa instalación, fuera del repo | **NO se afirma.** Declarado en el test 12 y aquí |
| **Slides: corre su propio juego de delimitadores** | **SÍ, y la frontera real es más fuerte** | **Afirmado** (test 13) |

**Sobre Slides — el dato que precisa la frontera, y es mejor que la formulación del ticket.**
`SlideBlockSchema` es una unión de **dos** miembros: `columnsSlide` y `titleSlide`. Los ítems de
diapositiva son `SlideCardItem`, `SlideIconListItem`, `SlideNarrativeItem`, `SlideVisualItem`,
`SlideVideoItem`. **Ninguno de los cinco kinds del conjunto es un bloque de diapositiva.**
Medido: `SlidesDraftSchema` **RECHAZA** los cinco. Es decir, no es que los delimitadores de
Slides sean otros para estos campos: **es que el juego de Slides nunca ve estos campos.**

---

## 9. VALIDADOR — SALIDA COMPLETA

Ejecutado por la vía que **no escribe**, desde `projects/cantu-studio`:

```bash
node tools/project-console/validate-project-console-state.mjs
```

**Salida completa, VERBATIM:**

```
Project Console state validation passed.
Roadmap v3 prototype: 7 objectives / 28 phases / 69 runs; queue groups needs_human_decision=0 now=1 ready_next=16 later=26 history=26
Roadmap v3 active run derived stages: RUN-CANTU-INLINE-FORMULA-BEHAVIOUR-LOCK-001=none
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
- **`history=26`**
- **`ready_next=16`**
- otros grupos: `needs_human_decision=0`, `now=1`, `later=26`
- 7 objetivos / 28 fases

**Recuento propio sobre `roadmap.json`, independiente:** 69 runs — `completed=26`, `planned=42`,
`active=1`. **`completed=26` casa con `history=26`.**

**El aviso no bloqueante de la dependencia externa apareció, y es el conocido y legal.**
No es hallazgo. **No se reparó** (§11).

---

## 10. CIFRAS DEL TICKET — VERIFICADAS UNA A UNA

| Cifra | Cómo se verificó | Resultado |
|---|---|---|
| **Cero tests que afirmen hoy esta conducta** | barrido de los 32 `.test.mjs` previos buscando `\( … \)`, y lectura de **todas** las ocurrencias | **CONFIRMADA — 0.** Detalle en §10.1 |
| **52 ocurrencias en 12 archivos del corpus escrito** | recorrido de los `.json` con `webBlocks`/`slideBlocks` | **CONFIRMADA — 52 en 12.** Desglose en §10.2 |
| **74 ocurrencias más en el contenido vivo de lecciones** | recorrido por **valor en runtime** de los `.js` de `src/content/` | **CONFIRMADA — 74.** Con una ambigüedad declarada en §10.3 |
| **17 componentes** | 17 ids `web-*` en `blockCatalog.js` | **CONFIRMADA — 17** |
| **350 de 350 en la suite del compilador** | **NO se corrió la suite entera** | **NO SE AFIRMA.** Ver §10.4 |

### 10.1 El cero — verificado, y con los casi-aciertos declarados

**Sólo 4 de los 32 archivos previos contienen un delimitador `\( … \)`.** Se leyeron **todas**
sus ocurrencias, una a una:

| Archivo | Ocurrencias | Dónde caen | ¿Cuenta? |
|---|---|---|---|
| `webHierarchyFlatNodeSafety.test.mjs` | 18 | `hierarchy.nodes[].math` — **campo de fórmula, no de prosa** | **NO** |
| `webTablesParitySchemaCompiler.test.mjs` | 3 | salida de celda de tabla rica: **el delimitador lo pone el compilador** (`buildTableMathContent`) | **NO** |
| `webColumnsChildExpansionSafety.test.mjs` | 1 | ídem | **NO** |
| `mathAuthoringSmartFormulaField.test.mjs` | 1 | es una **regex** de aserción, no una fórmula | **NO** |

**Tests que afirman una fórmula delimitada dentro de uno de los cinco campos de prosa: 0.**
**El cero del ticket es correcto.** Con este run pasa a ser **13**.

**Dato que ningún record previo expuso, y que refuerza el §5:** `webHierarchyFlatNodeSafety`
**ya afirma el caso `<`** (`:527` → `:550`), sobre un campo de matemáticas. La conducta estaba
declarada en el repo; lo que no estaba declarado era **para los campos de prosa**.

### 10.2 Las 52 ocurrencias, por campo

| fieldId | Ocurrencias | Archivos | ¿Es de los cinco? |
|---|---|---|---|
| `hierarchy.nodes[].math` | **48** | 8 | no — campo de fórmula |
| **`details.items[].content`** | **4** | **4** | **SÍ — es el campo #1 del conjunto** |
| **Total** | **52** | **12** | |

**Reproduce exactamente el desglose del BARRIDO.** Y es el hecho que sostiene todo el run:
**hay contenido publicado usando la fórmula en línea dentro de uno de los cinco campos**, y
hasta hoy ningún test lo sabía. Es la cadena anclada en el test 4.

### 10.3 Las 74 — y una ambigüedad que hay que decir en voz alta

Contadas por **valor en runtime** (`require()` del módulo y recorrido de cada cadena), que es el
método del BARRIDO y el que refleja lo que de verdad se publica:

| Universo | Archivos | Ocurrencias | Campos |
|---|---|---|---|
| `src/content/sandbox/` | 8 | **74** | 46 |
| `src/content/lecciones/` | 2 (**1 no carga**) | 6 | 3 |
| `src/content/staging/` | 8 | **74** | 55 |
| `src/content/author_lite/generated/` | 13 | 0 | 0 |

**⚠ Hay DOS universos distintos que dan 74.** `sandbox` (fixtures) y `staging` (lecciones en
preparación). El `full_description` dice *«seventy-four more occurrences across the live lesson
content»*, lo que apunta a **`staging` = 74**. **Ambos reproducen; la cifra no distingue cuál.**
Es la misma clase de trampa que el BARRIDO declaró para el «55», y se declara igual.

**Contando por TEXTO FUENTE en vez de por valor, las cifras cambian:** sandbox 10, lecciones 15,
staging 74. **Sólo `staging` coincide en los dos métodos.** Cualquier record futuro que vea un
«74» debe preguntar **con qué método**.

**Se reproduce también la rotura del BARRIDO §1.3:** `src/content/lecciones/` tiene 2 archivos y
**1 no carga**. **No se reparó** (§11).

### 10.4 Las 350 — lo que sí puedo afirmar y lo que no

**Recuento estático, ejecutado:** los 32 archivos previos declaran **350** `test()` a principio
de línea. Sin `t.test(` (0) ni `describe(` (0), así que no hay subtests que inflen la cifra.
**Con este run: 33 archivos, 363 declaraciones** (350 + 13).

**NO afirmo «350 de 350 en verde».** Eso exigiría correr la suite entera, que el ticket excluye
y que `CLAUDE.md` desaconseja con talleres en paralelo. **Lo que sí está ejecutado y verde son
117 tests en 9 archivos** (§6.2). **La cifra de 350 queda confirmada como recuento, no como
resultado de ejecución.**

---

## 11. DISCREPANCIAS CONTRA LOS RECORDS PREVIOS

| Afirmación previa | Hoy, medido |
|---|---|
| `REVALIDACION-COMPONENTE-TEXTO-CANTU.md:481-493`: `&`, `'` y `<` llegan al DOM **«corrompidos»** | **La medición se reproduce; la palabra es falsa.** Se **escapan**, y el escapado no es corrupción (§5). Los delimitadores nunca se tocan |
| `MEDICION` §11: 66 runs, `history=24`, `ready_next=16`, `later=25`, `completed=24` | **69 runs, `history=26`, `ready_next=16`, `later=26`, `completed=26`.** La previa era correcta en su fecha |
| `BARRIDO` §9/§10: 66 runs, `history=25`, `ready_next=15`, `completed=25` | **69 / 26 / 16 / 26.** Ídem |
| `MEDICION` §10 y `BARRIDO` §8: run activo = `video` (23) / `narrative` (24) | **ahora `RUN-CANTU-INLINE-FORMULA-BEHAVIOUR-LOCK-001` (25)** |
| `MEDICION` §5: **69** campos de texto libre / `BARRIDO` §4.1: **78** | **No se remidió.** Fuera del alcance: este run sólo toca cinco campos |
| `BARRIDO` §5.4: «3 archivos de test NUEVOS + 9 existentes a ampliar + 1 transversal» | **Se escribió sólo el transversal, 1 archivo.** No se amplió ninguno existente: ampliarlos no era necesario para declarar la conducta, y tocarlos ensancha la superficie sin añadir garantía |
| Ningún record previo separaba las **dos funciones de emisión** de los cinco campos | **Medido y fijado**: `rule.description` usa `escapeHtml`; los otros cuatro `escapeHtmlWithLineBreaks` (§2.1, §3.5) |
| Ningún record previo declaraba el **doble escape del artefacto `.js`** | **Medido y declarado** (§3.3) |
| `BARRIDO` §3.3: «Slides configura tres delimitadores» — cierto, pero deja implícito que afecta a estos campos | **Frontera más fuerte: los cinco kinds no son bloques de diapositiva.** El juego de Slides nunca los ve (§8) |

---

## 12. QUÉ **NO** SE HIZO

**Por prohibición explícita del encargo:**

- **Ni una línea de producción.** No se tocó ningún esquema, ni el compilador, ni ningún
  renderer, ni ninguna superficie del editor. **El único archivo escrito en `cantu-studio` es
  `tools/author-lite/compiler-api/tests/webInlineFormulaProseBehaviourLock.test.mjs`.**
- **No se abrió ningún campo más de los cinco.** No se tocó `narrative.text`: se midió y se
  reportó como observación (§7), **sin un solo test que lo fije**.
- **No se montó el insertor de fórmulas.** Tiene su propio run más adelante en la cola.
- **No se documentó la conducta** en la Guía ni en los packets canónicos.
- **No se tocó** la Definition of Done, el contrato de color, `docs_index.json`,
  `component_status.json`.
- **No se tocó** el roadmap canónico, `.project/`, ni el status de ningún run. **No se
  re-emitió `.project/`.** No se insertó, movió ni renumeró ningún run. **No se clasificó
  ninguno.** No se ejecutó Git. No se levantó ningún servidor.
- **No se corrió la suite completa.**
- **No se reparó ninguna deriva conocida:** ni el mojibake de los dos esquemas (`LÃ­mite`,
  `âš ï¸`, `tÃ­tulo`), ni los punteros muertos, ni el CLI local de roadmap, ni el draft del
  almacén vivo que no valida, ni los defectos sin dueño de los componentes ya revalidados, ni
  el aviso de dependencia externa del validador, ni la lección
  `src/content/lecciones/Aritmetica/2_operaciones_aritmeticas.js` que **se reproduce que no
  carga** (§10.3), ni la discrepancia `Component statuses: 16` contra 17 componentes.

**Por límite de la medición, declarado:**

- **No se ejecutó KaTeX** (no está en ningún `node_modules` del repo; se carga por CDN).
- **No se ejecutó ningún parser HTML** (§5.3). La decodificación de la entidad **no se midió y
  no se afirma en ningún test**.
- **No se comprobó qué ve un alumno en Moodle.**

**Por decisión de alcance, con su porqué:**

- **No se disparó ninguna parada del §12 del ticket.** El canónico casa con el objetivo; los
  cinco campos existen con la forma descrita; los cinco admiten la fórmula **sin tocar
  producción**; y la conducta medida **no contradice** lo que el `full_description` supone —lo
  precisa, en el punto del escapado, que ese texto ya anticipaba al pedir *«that the characters
  a formula needs survive each field's guard»*. **La guardia no toca ninguno; el compilador
  escapa cuatro. Se declara así y no hizo falta ampliar nada.**

**Arnés:** vivió íntegro en el scratchpad de sesión, fuera de los dos repos —`ctx.mjs`,
`m1-fields.mjs`, `m2-layers.mjs`, `m3-js.mjs`, `m4-chars.mjs`, `m5-reader.mjs`, `m6-escape.mjs`,
`m7-cifras.mjs`, `m8-runtime-corpus.mjs`, `m9-fieldids.mjs`, `m10-exact.mjs`,
`m11-narrative.mjs`. **Se retira al terminar.**

---

## 13. STATUS DEL RUN — DECLARADO, NO CAMBIADO

**El run queda en `active`. Este taller NO lo cambia.** Lo cierra el operador desde la consola
global, que es el punto de serialización y la que re-emite `.project/` de forma atómica.

**Status al que debe pasar: `completed`.**

**Qué falta para llegar ahí — sólo la revisión del operador:**

1. **Leer este record** y aceptar el veredicto del §5 sobre la afirmación del `<`, que corrige
   por escrito a `REVALIDACION-COMPONENTE-TEXTO-CANTU.md:481-493`.
2. **Decidir sobre el acoplamiento declarado en §6**: el test 2 hace que los tests de
   `compiler-api` dependan de `editor-ui/node_modules`. **Se recomienda mantenerlo** —sin él,
   la mitad de la guardia queda sin red—, pero es decisión del operador y revertirlo es borrar
   una sola aserción.
3. **Cerrar el run desde la consola global.**

**No hay trabajo técnico pendiente dentro del alcance de este run.** Los cinco campos están
medidos y declarados, los 13 tests están en verde y los 117 de los archivos relacionados
siguen en verde.

**Lo que queda FUERA y no bloquea este cierre:** `narrative.text` entra en la segunda pasada con
su propio run; el insertor de fórmulas tiene el suyo más adelante en la cola; y la pregunta de
qué ve un alumno en Moodle **sigue sin dueño y sigue sin poderse medir desde este repositorio**.
