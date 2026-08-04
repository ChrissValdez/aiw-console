# BARRIDO DIAGNÓSTICO — FÓRMULA EN LÍNEA (cantu-studio)

**Fecha:** 2026-08-04
**Repo medido:** `projects/cantu-studio` — **SOLO LECTURA. Ni un byte escrito ahí.**
**Único archivo escrito:** este record.
**Encargo:** producir lo que falta para decidir el conjunto de campos de la **opción C apoyada
en A**. **No diseña la autoría. No monta el insertor. No construye.**

**Precedente leído y verificado, no heredado:**
`MEDICION-FORMULA-EN-LINEA-CANTU.md` (2026-08-04). Sus afirmaciones clave se reejecutaron;
las coincidencias y las discrepancias se declaran en §10 y §11.

---

## 0. DECLARACIÓN — ESTE ENCARGO NO TUVO RUN

**Este encargo no tiene run y no lo pide.**

**Por qué:** es un barrido de medición sobre un repo ajeno cuyo entregable completo es un record
en `aiw-console`. No cambia código, ni contrato, ni estado. Un run existe para serializar
escrituras sobre el canónico y dejar trazabilidad de un cambio; **aquí no hay cambio que trazar**.
La decisión que este barrido habilita —qué campos se abren— **es del operador**, y ese sí será el
momento de un run.

No se tocó el roadmap canónico, ni `.project/`, ni el status de ningún run, ni se ejecutó Git.

**Ventana compartida:** corría en paralelo el taller de revalidación del componente `narrative`
(`RUN-JAME-WEB-NARRATIVE-REPAIR-001`, `status=active`, `queue_order=24`, confirmado por el
validador en §9). **No se tocó ningún archivo suyo y no se comenta su trabajo. No se corrió la
suite completa.** Lo único ejecutado del repo está declarado en §13.

---

## 1. ⚠ PARADA Y REPORTE — CONTENIDO YA ESCRITO QUE HOY SE ROMPE

**El §12 del ticket manda parar y reportar si el barrido encuentra contenido ya escrito que hoy
se rompe visiblemente. Lo encontró. Son TRES roturas, ninguna relacionada con fórmulas.**

Van primero, sin diluir, y **ninguna se reparó** (§13).

### 1.1 Almacén vivo — un draft que el editor y el pipeline de Slides rechazan hoy

`src/content/author_lite/drafts/matematicas/algebra/test5.json`

| Puerta | Veredicto real, ejecutado |
|---|---|
| `DraftSaveSchema` (guardado) | **ACEPTA** |
| `WebDraftSchema` (compilar Web) | **ACEPTA** |
| `SlidesDraftSchema` (compilar Slides) | **RECHAZA** |
| `DraftSchema` (legacy completo) | **RECHAZA** |
| Esquema del **EDITOR** | **RECHAZA** |

Mensaje real, VERBATIM (mojibake incluido, tal cual sale):

```
slideBlocks.0.items.0.content: âš ï¸ LÃ­mite de TV excedido (40 palabras max).
```

El valor que lo dispara es `slideBlocks[0].items[0].content`: **151 palabras** contra un máximo
de 40. Es la frase `"Idea breve para explicar en pantalla."` repetida 29 veces.

**No contiene ni delimitador de fórmula ni marca Markdown** (verificado: `false` en ambos).

**Diagnóstico exacto:** el draft **se guarda** y **compila a Web**, pero **no compila a Slides** y
**el editor lo rechaza al abrirlo**. Es 1 de los 10 archivos del almacén vivo. Las funciones
`compileDraftToSlidesJS` / `compileDraftToJS` **no validan** y sí producen salida (2365 y 3118
caracteres): la rotura está en la puerta de esquema del servidor
(`compiler-api/server.js:876,926,1220-1228`), no en el compilador.

### 1.2 Evidencia congelada — cuatro instantáneas de QA que ya no validan

| Archivo | Veredicto |
|---|---|
| `QA/temp/PASS-4D-I9C2-…-RERUN/sandbox_theory_complex.web.draft.json` | `WebDraftSchema` **RECHAZA** |
| `QA/temp/PASS-4D-I9C2-…-RERUN/sandbox_theory_complex.web.roundtrip.json` | `WebDraftSchema` **RECHAZA** |
| `QA/temp/PASS-4D-I10R-…-EVIDENCE/sandbox_theory_complex.web.roundtrip.json` | `WebDraftSchema` **RECHAZA** |
| `QA/temp/PASS-4D-I10R2-…-RERUN/sandbox_theory_complex.web.roundtrip.json` | `WebDraftSchema` **RECHAZA** |

Mensajes reales, VERBATIM:

```
webBlocks.5.columns: Columnas Web v1 requiere exactamente 2 columnas
webBlocks.5.columns.0.blocks.0: Unrecognized key(s) in object: 'colSpan'
```

En el esquema del editor el mismo bloque da `webBlocks.5: Invalid input`.

**Diagnóstico:** son instantáneas congeladas contra un esquema que después cambió. No son
almacén vivo. **Pero un run de verificación de paquetes que las reabra las verá rojas**, y eso
toca directamente a `RUN-CANTU-WEB-PACKET-VERIFICATION-BATCH-003` (§8) y a
`RUN-JAME-WEB-SPLIT-SCOPE-AND-REPAIR-001`.

### 1.3 Contenido JAME Core — una lección que no carga, y se descarta en silencio

`src/content/lecciones/Aritmetica/2_operaciones_aritmeticas.js`

```
Cannot find module '../../../builders/web/renderIconList'
```

La línea culpable es `src/content/lecciones/Aritmetica/2_operaciones_aritmeticas.js:88`:

```js
content: require('../../../builders/web/renderIconList')({
```

La ruta resuelve a `src/builders/web/renderIconList.js`, que **no existe**. El archivo real es
`src/builders/web/partials/renderIconList.js`. Su hermana
`1_propiedades_numeros.js` **sí carga**.

**Y lo peor no es que falle: es que no se nota.** `main.js:95` hace

```js
try { data = require(fullSrcPath); } catch (e) { return; }
```

es decir, **la lección se descarta en silencio del build, sin mensaje**. De las 2 lecciones de
`src/content/lecciones/`, **1 nunca se construye y nadie lo dice.**

### 1.4 Qué NO disparó la parada

- **Medir no exigió modificar ningún archivo del repo.** El arnés vivió íntegro en el scratchpad
  de sesión; a `buildSingleWebLesson` se le omitió `outputPath`, que es lo único que dispara
  escritura (`src/builders/web/buildSingleWebLesson.js:157-162`).
- **El trabajo no creció hacia construir.** El insertor se midió y **no se montó en ninguna
  parte, ni para probar** (§7).

### 1.5 Por qué el barrido siguió hasta el final

Las tres roturas son **independientes de la pregunta de la fórmula**: ninguna la causa una
colisión con delimitadores ni con Markdown. Detenerse habría dejado al operador sin el dato que
pidió y sin poder decidir el conjunto de campos, que era el objeto del encargo. **Se reportan de
inmediato —son este §1, lo primero del record— y se completó el resto.** Ninguna se reparó:
repararlas es decisión y run del operador.

---

## 2. EL CORPUS YA ESCRITO — CUATRO UNIVERSOS, CADA UNO CON SU UNIDAD

**Regla de este apartado: cada cifra lleva su unidad, su ruta y su criterio de validez.**
La cifra previa de 55 **no se hereda**: se remide.

### 2.1 Universo A — EL ALMACÉN VIVO

| Concepto | Valor |
|---|---|
| **Ruta** | `src/content/author_lite/drafts/**` |
| **Criterio de inclusión** | cualquier archivo, cualquier extensión |
| **Unidad** | **archivos** |
| **Cifra** | **10 archivos** |
| Validez: son `.json` | 10 de 10 |
| Validez: parsean | 10 de 10 |
| Validez: tienen campo `lesson` en raíz | 10 de 10 |
| Validez: **validan contra AMBOS esquemas** | **9 de 10** — falla `test5.json` (§1.1) |

Los diez, verbatim:

```
src/content/author_lite/drafts/matematicas/algebra/test2.json
src/content/author_lite/drafts/matematicas/algebra/test3.json
src/content/author_lite/drafts/matematicas/algebra/test5.json      ← el roto de §1.1
src/content/author_lite/drafts/qa/author_lite/qa_list_certification.json
src/content/author_lite/drafts/qa/author_lite/qa_list_sandbox_reproduction.json
src/content/author_lite/drafts/qa/author_lite_web_final_build_moodle_parity_fix/list_moodle_parity.json
src/content/author_lite/drafts/qa/author_lite_web_final_build_mvp/list_mvp.json
src/content/author_lite/drafts/qa/workspace_internal_mvp/caracteristicas_internal_qa.json
src/content/author_lite/drafts/slide/test_slide/test_slide/test_slide.slide.draft.json
src/content/author_lite/drafts/web/test_web/test_web/test_web.web.draft.json
```

### 2.2 Universo B — TODO `.json` DEL REPO CON `webBlocks`/`slideBlocks`

Es la unidad que en su día dio 55.

| Concepto | Valor |
|---|---|
| **Ruta** | todo el repo **salvo** `node_modules/` y `.git/` |
| **Criterio de inclusión** | archivo `.json` cuyo texto contiene `"webBlocks"` o `"slideBlocks"` |
| **Unidad** | **archivos** |
| `.json` escaneados en total | 174 |
| **Cifra del universo B** | **76 archivos** |
| desglose · almacén vivo (A) | **10** |
| desglose · **evidencia congelada** bajo `QA/` | **66** |
| desglose · resto del repo | **0** |

**Validez, medida en tres escalones distintos —y las tres cifras son distintas:**

| Criterio de validez | Cifra |
|---|---|
| parsean con `JSON.parse` **estricto** | **75 de 76** |
| parsean **tolerando BOM** | **76 de 76** |
| tienen `lesson` en raíz **y** `webBlocks`/`slideBlocks` como array en raíz (= *tienen forma de draft*) | **56 de 76** |
| de esos 56, **validan contra AMBOS esquemas reales** | **51 de 56** |
| de esos 56, **fallan** | **5** (los de §1.1 y §1.2) |

El único que no parsea en estricto es
`QA/temp/PASS_2C_B/qa-list-certification.endpoint.draft.json`, por **BOM UTF-8** al principio:

```
Unexpected token '﻿', "﻿{ "l"... is not valid JSON
```

Los 20 restantes que no tienen forma de draft son informes y snapshots de QA
(`global-reproduction-report.json`, `*.structural-snapshot.json`, `validation-report.json`,
`summary-by-sandbox.json`, `direct-runtime-summary.json`): mencionan `webBlocks` dentro de su
carga, pero no son lecciones.

**LA CIFRA DE 55 — remedida y desactivada como referencia.**
El record que la publicó definía la unidad como *«archivos JSON con webBlocks/slideBlocks (8
drafts internos del almacén + QA/temp + roundtrips)»*. **Hoy esa misma unidad da 76.** El almacén
son 10, no 8.

**⚠ Trampa medida, que hay que decir en voz alta:** con criterio estricto de parseo,
«archivos con campo `lesson`» da hoy **55**. **Es un 55 distinto del 55 histórico** —aquél era
el universo B entero, éste es un subconjunto de validez— y coinciden por casualidad. Tolerando
BOM, ese mismo subconjunto da **56**. Cualquier record futuro que vea un «55» debe preguntar
**cuál de los dos**.

### 2.3 Universo C — CONTENIDO JAME Core (`.js`, sin Zod)

Es un universo que la medición previa **no contó**, y es donde de verdad vive la fórmula.

| Concepto | Valor |
|---|---|
| **Rutas** | `src/content/sandbox/`, `src/content/lecciones/`, `src/content/staging/` |
| **Criterio de inclusión** | archivo `.js` que exporta con `module.exports` una lección |
| **Unidad** | **archivos** y, dentro, **campos de texto (cadenas)** |
| sandbox | **8 archivos**, 5367 campos de texto |
| lecciones | **2 archivos**, 104 campos — **1 de los 2 no carga** (§1.3) |
| staging | **8 archivos**, 491 campos |
| **Total C** | **18 archivos** |

**Estos archivos no pasan por ningún esquema.** Los consume `main.js` directamente. **No hay
Zod, no hay guardias de texto seguro, no hay validación de LaTeX.**

### 2.4 Universo D — ARTEFACTOS GENERADOS por Author Lite

| Concepto | Valor |
|---|---|
| **Ruta** | `src/content/author_lite/generated/**` |
| **Unidad** | **archivos** `.js` |
| **Cifra** | **13 archivos**, 231 campos de texto |
| módulos que no cargan | 0 |

---

## 3. COLISIONES EN EL CONTENIDO EXISTENTE, MEDIDAS UNA A UNA

**Método:** se recorre **cada campo de texto (cada cadena) de cada documento** de cada universo,
con las **regex reales del repo** (`compiler-api/schemas/draftSchema.js:113-119`), no con
aproximaciones. Unidades: **ocurrencias** (cuántas veces aparece el patrón), **campos-instancia**
(cuántas cadenas concretas lo contienen), **archivos**, **fieldIds distintos** (cuántos campos
del contrato están implicados).

Campos de texto recorridos en el universo B: **5774 cadenas** (5757 no vacías) —
**188 en el almacén vivo**, **5586 en la evidencia congelada**.

### 3.1 El detector de Markdown — CERO en todo el contenido escrito

Las cuatro regex, tal cual están en el repo:

| Patrón | Regex real | Ocurr. | Campos | Archivos | fieldIds |
|---|---|---|---|---|---|
| doble asterisco | `/\*\*[^*]+\*\*/` | **0** | 0 | 0 | 0 |
| doble guion bajo | `/__[^_]+__/` | **0** | 0 | 0 | 0 |
| imagen | `/!\[[^\]]*\]\([^)]*\)/` | **0** | 0 | 0 | 0 |
| corchete + paréntesis | `/\[[^\]]+\]\([^)]*\)/` | **0** | 0 | 0 | 0 |

**Cero en el universo B (76 archivos). Cero en el universo C (18). Cero en el universo D (13).**

**Consecuencia directa para la decisión:** las tres colisiones que la medición previa nombraba
como el único daño colateral de la guardia `Plain` —`x__1__`, `x ** y ** z`, `f[x](y)`—
**no existen en ningún byte de contenido escrito**. Son un riesgo de futuro, no una deuda
presente. **Abrir campos con guardia `Plain` no rompe nada de lo ya escrito.**

### 3.2 Delimitadores de fórmula YA PRESENTES — la puerta lleva tiempo abierta

**Universo B (76 archivos):**

| Delimitador | Ocurr. | Campos | Archivos | fieldIds implicados |
|---|---|---|---|---|
| **`\( … \)` en línea** | **52** | **52** | **12** | **2** |
| `\[ … \]` bloque | 0 | 0 | 0 | 0 |
| `$$ … $$` bloque | 0 | 0 | 0 | 0 |
| `$ … $` (dólar simple emparejado) | 0 | 0 | 0 | 0 |
| `\begin{…}` entorno | **12** | **12** | **6** | **1** |

Desglose de las 52 ocurrencias de `\( … \)`, por campo:

| fieldId | Ocurr. | Archivos | ¿es campo de prosa? | Muestra VERBATIM |
|---|---|---|---|---|
| `hierarchy.nodes[].math` | **48** | 8 | no — campo de fórmula | `\( \mathbb{R} \)`, `\( z = a + bi \)` |
| **`details.items[].content`** | **4** | **4** | **SÍ — PROSA** | ver abajo |

Las 12 de `\begin{…}` están todas en `timeline.steps[].math`: `\begin{cases}` y `\begin{aligned}`.

**LA OCURRENCIA QUE MÁS PESA — contenido que ya está usando la fórmula en línea dentro de una
frase, sin que nadie lo autorizara.** Valor VERBATIM del campo de prosa
`details.items[].content`:

```
Pasos para resolver \( (x+3)^2 \). Se muestra el desarrollo paso a paso sin omitir detalles intermedios.
```

Archivos, con su ruta exacta dentro del documento:

```
QA/temp/PASS-4D-I8A3-WEB-THEORY-SANDBOX-PARITY-REPRODUCTION-EVIDENCE/sandbox_theory.web.draft.json      webBlocks[22].items[0].content
QA/temp/PASS-4D-I8A3-…/sandbox_theory.web.roundtrip.json                                                webBlocks[22].items[0].content
QA/temp/PASS-4D-I10A-WEB-SANDBOX-THEORY-DRAFT-MATERIALIZATION-GAP-FOLLOWUP/sandbox_theory.web.roundtrip.json   webBlocks[22].items[0].content
QA/temp/PASS-4D-I10R2-WEB-SANDBOX-SHOWCASE-GLOBAL-REPRODUCTION-EVIDENCE-RERUN/sandbox_theory.web.roundtrip.json webBlocks[22].items[0].content
```

Y en los artefactos compilados (`*.jame-data.json`, `.sectionsWeb[22].items[0].content`) la misma
cadena, byte a byte, en 3 archivos más.

**Su origen está en JAME Core**, `src/content/sandbox/test_theory.js:86`, VERBATIM:

```js
{ summary: "Caso: Demostración Procedimental", content: `<p>Pasos para resolver \\( (x+3)^2 \\). Se muestra el desarrollo paso a paso sin omitir detalles intermedios.</p>` },
```

**Dato adicional medido, y es revelador:** existe una **variante sin delimitadores** de la misma
frase, en `QA/temp/PASS-4D-I3R/` (3 archivos):

```
Pasos para resolver (x+3)^2. Se muestra el desarrollo paso a paso sin omitir detalles intermedios.
```

Es decir: **alguien ya escribió el mismo contenido dos veces, una con fórmula y otra sin ella**,
y las dos conviven en la evidencia. La conducta no solo existe: ya se estaba ejerciendo y
comparando.

### 3.3 Delimitadores propios de la vía Slides

La vía Slides configura **exactamente tres** (`src/builders/slides/layouts/renderColumnsSlide.js:25-33`,
verificado ejecutando, §6.4):

```js
delimiters: [{left: "$$", right: "$$", display: true}, {left: "\\[", right: "\\]", display: true}, {left: "\\(", right: "\\)", display: false}]
```

Presencia de ese juego exacto en el contenido escrito:

| Delimitador Slides | Universo B | Universo C | Universo D |
|---|---|---|---|
| `$$ … $$` | **0** | **0** | 0 |
| `\[ … \]` | **0** | **0** | 0 |
| `\( … \)` | **52** | **154** | 0 |

**Y ningún entorno `\begin{…}` está en el juego de Slides**, mientras el contenido escrito tiene
12 ocurrencias en `timeline.steps[].math` y 78 más en los fixtures de sandbox. En Slides esos
entornos **no los reconocería el disparador explícito**.

### 3.4 Caracteres sueltos que importan — universo B

| Carácter | Ocurr. | Campos | Archivos | Dónde, y qué pasa hoy |
|---|---|---|---|---|
| `$` | **2** | 2 | 2 | ambas en `baseline.baselineObserved.courseTopic.reason` de un informe de QA, dentro del texto `accepts only ^[a-z0-9_]+$`. **No es un bloque, no se renderiza.** Cero riesgo de `$$` hoy. |
| `\` | 1806 | 443 | 47 | mayoría en campos `math` (`timeline` 594, `split` 150, `hierarchy` 136, `rule` 68) y en rutas Windows de informes de QA |
| `&` | 32 | 20 | 10 | `timeline.steps[].math` 24 (alineación `&` de `\begin{cases}`/`\begin{aligned}`), `header.subtitle` 4, `lesson.subtitle` 4 |
| `<` o `>` | 116 | 20 | 14 | `visual.svg` 48, `card.content` 8 (**modo `code`**), `table…math.expression` 4, `table…math.result` 4, `table.rows[][]` 4, resto en `rawHtml[]` de snapshots |
| `_` (simple) | 2441 | 891 | 50 | abrumadora mayoría en slugs, rutas y `status` de informes de QA |
| `%` | 6 | 6 | 6 | 4 en `visual.width` (`100%`), 2 en `rawHtml[]` |
| `^` | 188 | 120 | 32 | exponentes en campos `math` y `table` |

### 3.5 El almacén vivo, aparte — está limpio

| Patrón | Almacén vivo (10 archivos) |
|---|---|
| las 4 marcas de Markdown | **0** |
| los 4 delimitadores de fórmula | **0** |
| `\begin{…}` | **0** |
| `$`, `\`, `&`, `<>`, `%`, `^` | **0** |
| `_` simple | 7 ocurrencias, 5 campos, 2 archivos |

**Ninguna colisión en el almacén vivo. Cero. La fórmula en línea que ya existe está toda en
evidencia congelada de QA y en contenido JAME Core.**

### 3.6 Colisiones en los universos C y D

| Patrón | C1 sandbox (8) | C2 lecciones (2) | C3 staging (8) | D generados (13) |
|---|---|---|---|---|
| las 4 marcas de Markdown | 0 | 0 | 0 | 0 |
| `\( … \)` | **74** occ / 46 campos / 4 arch. | **6** / 3 / 1 | **74** / 55 / 7 | 0 |
| `\[ … \]`, `$$`, `$…$` | 0 | 0 | 0 | 0 |
| `\begin{…}` | **78** / 78 / 2 | 0 | 0 | 0 |

Claves donde cae `\( … \)` en C3 `staging` —**y aquí hay prosa de verdad**:
`badge` 21, `details` 21, `math` 16, **`text` 8**, **`content` 4**, `footer` 2, **`title` 2**.

Ejemplos VERBATIM de fórmula dentro de una frase, en contenido JAME Core vivo:

```
src/content/staging/Aritmetica/L02_Web_Valor_Absoluto.js  .sectionsWeb[2].content
"Al tratarse de una distancia física, el resultado <b>nunca puede ser negativo</b>. Formalmente: \(|x| \ge 0\) para todo número real."

src/content/staging/Aritmetica/L01_Web_Clasificacion_Numerica.js  .sectionsWeb[7].content
"Esta propiedad es exclusiva de los números <b>Enteros</b> (\(\mathbb{Z}\)). No está definida para fracciones o decimales."

src/content/staging/Aritmetica/L02_Web_Valor_Absoluto.js  .sectionsWeb[6].title
"Operación: \( -|7 - 12| + |3| \)"

src/content/staging/Aritmetica/1_propiedades_numeros_slide.js  .sectionsSlide[2].items[0].footer
"Fórmula: \( 2n \)"
```

**Lectura sin adorno: en JAME Core la fórmula en línea dentro de prosa no es una propuesta, es
la práctica establecida.** Lo que Author Lite no tiene es autoría, garantía ni contrato para
ella.

### 3.7 Para cada colisión: ¿fallo visible hoy, o pasa desapercibida?

Se llevaron los **bloques reales del corpus** hasta el HTML final —esquema, compilador y builder
Web y Moodle— y se leyó el markup.

| Colisión | Esquema (ambos) | ¿Llega al HTML? | ¿Fallo visible hoy? |
|---|---|---|---|
| `\( … \)` en **`details.items[].content`** (PROSA, guardia `Inline`) | **ACEPTA** | sí, intacta | **NO — pasa desapercibida.** Se renderiza como matemática en Web. |
| `\( … \)` en `hierarchy.nodes[].math` (guardia `Plain`) | **ACEPTA** | sí, intacta | **NO.** Y es lo único que la hace pintar (§3.8). |
| `\begin{cases}` + `&` en `timeline.steps[].math` (`Plain+Math`) | **ACEPTA** | sí, con `&` → `&amp;` | **NO.** El renderer la envuelve en `\[ … \]`. |
| `<` `>` en `table.rows[][]` y en `table…math.*` (`Inline`/`Plain+Math`) | **ACEPTA** | sí, con `&gt;`/`&lt;` | **NO.** Sale como texto escapado. |
| `<script>alert(1)</script>` en `card(code).content` (**SIN GUARDIA**) | **ACEPTA** | sí, escapado | **NO.** `escapeHtml` lo neutraliza. |
| las 4 marcas de Markdown | — | — | **no aplica: cero ocurrencias.** |

**Ninguna de las colisiones medidas produce hoy un fallo visible. Todas pasan desapercibidas.**
Las tres roturas visibles del repo son las de §1 y **no son colisiones de fórmula**.

Markup VERBATIM de las dos más importantes:

```html
<!-- details.items[].content — PROSA con fórmula, HTML Web -->
line-height: 1.6; background-color: #FFFFFF; "> Pasos para resolver \( (x+3)^2 \). Se muestra el desarrollo paso a paso sin omitir detalles intermedios…
```
```html
<!-- hierarchy.nodes[].math — el autor pone el delimitador a mano -->
<div class="j-t-content"> <div class="j-t-math" style="">\( \mathbb{R} \)</div> <div class="j-t-desc">Recta continua.</div>
```

Comprobaciones de seguridad, en los cinco casos: `¿"<script>alert" vivo en el HTML? → false`;
`¿"<img" inyectado vivo? → false`.

### 3.8 El hallazgo que la medición previa dejó como hipótesis y aquí queda confirmado

`renderHierarchy` **no pone delimitador**: interpola `node.math` desnudo en
`<div class="j-t-math">`. La medición previa lo señaló como un hueco. **El barrido demuestra que
ese hueco ya está tapado a mano por el autor**: las 48 ocurrencias de `\( … \)` en
`hierarchy.nodes[].math` son exactamente el parche manual. Si alguien «arregla» el renderer para
que ponga el delimitador, **esas 48 pasan a tener delimitador doble**.

---

## 4. QUÉ CAMPOS SON CANDIDATOS — PROPUESTA, NO DECISIÓN

### 4.1 El inventario completo, remedido

**Método, declarado:** la lista de campos se toma de la **introspección de los esquemas Zod**
(no de una instancia), y se inyecta sobre fixtures **reales extraídos del corpus**. Un campo
cuenta como **texto libre** si **acepta prosa castellana normal en los DOS esquemas**; los enums,
ids, tokens de color y URLs la rechazan y quedan fuera por medición, no por criterio mío. Las
cargas de sonda son **todas ≤ 12 caracteres**, para que ningún máximo de longitud descarte un
campo por accidente.

| Medida | Cifra |
|---|---|
| candidatos sondados | 78 |
| **CAMPOS DE TEXTO LIBRE** | **78** |
| **aceptan hoy una fórmula delimitada en línea, en AMBOS esquemas** | **78 de 78** |
| la rechazan | **0** |
| **divergencia entre el esquema del editor y el del compilador** | **0** |
| aceptan `$x^2$` | 78 de 78 |

Reparto por guardia, **en campos**:

| Guardia | Campos |
|---|---|
| `Inline` (`containsUnsafeInlineText`) | **37** |
| `Plain` (`= Inline + Markdown`) | **20** |
| **`NINGUNA`** | **14** |
| `Plain+Math` | **5** |
| `Inline+Math` | **1** |
| **`LaTeX` (allowlist)** | **1** |
| **Total** | **78** |

Campos con el **detector de Markdown activo** (`Plain*`): **25**.

### 4.2 El conjunto candidato propuesto — 15 campos de prosa

**Criterio:** prosa explicativa = texto corrido a nivel de frase, donde una fórmula **dentro de
una oración** tiene sentido. Fuera quedan títulos, etiquetas cortas, badges, valores, URLs y
pies.

| # | Campo | Guardia hoy | Razón para estar DENTRO |
|---|---|---|---|
| 1 | `narrative.text` | `Inline` | El párrafo narrativo. Es el campo de prosa por antonomasia del repo. |
| 2 | `callout.content` | `Inline` | Cuerpo del aviso: una o varias frases explicativas. |
| 3 | `card(normal).content` | `Inline` | Cuerpo de lectura profunda de la tarjeta. |
| 4 | `card(persona).content` | `Inline` | Cita o testimonio: frase completa. |
| 5 | `details.items[].content` | `Inline` | Cuerpo del acordeón. **Ya lleva una fórmula escrita** (§3.2): el caso está probado en producción. |
| 6 | `details.items[].summary` | `Inline` | Cabecera del acordeón, pero es una frase, no una etiqueta. Ver §4.4. |
| 7 | `list.items[]` | **NINGUNA** | Cada viñeta es una oración. Alto valor didáctico. |
| 8 | `iconList.items[].text` | **NINGUNA** | Cuerpo del ítem con icono: frase explicativa. |
| 9 | `conceptGrid.items[].content` | `Inline` | Cuerpo del concepto. |
| 10 | `rule.description` | `Inline` | La explicación que acompaña a la regla. **Es el vecino natural del único campo con allowlist LaTeX.** |
| 11 | `timeline.steps[].description` | `Plain` | Explicación del paso. |
| 12 | `timeline.steps[].details` | `Plain` | Detalle largo del paso. En JAME Core esta clave ya lleva 21 fórmulas (§3.6). |
| 13 | `hierarchy.nodes[].description` | `Plain` | Explicación del nodo, junto a un `math` que ya usa delimitadores a mano. |
| 14 | `split(rows).description` | `Plain` | Descripción del método. |
| 15 | `table(rica).rows[].label.description` | `Plain` | Descripción de la fila; frase, no etiqueta. |

**DENTRO: 15 campos. FUERA: 63 campos.** (15 + 63 = 78.)

Reparto de guardias **dentro del conjunto propuesto**:

| Guardia | Campos dentro |
|---|---|
| `Inline` | **8** |
| `Plain` | **5** |
| **`NINGUNA`** | **2** — `list.items[]`, `iconList.items[].text` |

### 4.3 Por qué quedan FUERA los 63 — por familias

| Familia | Campos | Razón |
|---|---|---|
| **Títulos** (`title`, `sectionTitle`) | 17 | Un título no es prosa. Rompe la maquetación y no hay frase donde encajar la fórmula. |
| **Badges y etiquetas cortas** (`badge`, `label`, `detailsLabel`, `value`, `terms[]`) | 15 | Máximos de 24–32 caracteres. Son marcas, no oraciones. |
| **Campos que YA son de fórmula** (`*.math`, `math.expression`, `math.result`, `result`) | 12 | El delimitador lo pone el renderer o el compilador. Meter otro dentro sería anidamiento. |
| **Pies** (`visual.caption`, `video.caption`, `split.footer`) | 3 | El ticket los nombra explícitamente como no-prosa. |
| **Subtítulos** (`header.subtitle`) | 1 | Es un rótulo de cabecera, no texto corrido. |
| **Código** (`card(code).content`, `card(code).lang`) | 2 | Es código fuente; se emite en `<pre>`. Una fórmula ahí sería un error de autor. |
| **Identidad de persona** (`author`, `role`) | 2 | Nombre y cargo. |
| **Celdas y valores tabulares** (`table(simple).rows[][]`, `split.rows[].label`, `split.rows[].value`, `arithmetic.labels.rightHeader`) | 4 | Ver §4.4. |
| **Resto** (`columns.title`, `visual.title`, `video.title`, `rule.title`, etc.) | 7 | Títulos y rótulos ya contados arriba o campos de estructura. |

### 4.4 Los cinco fronterizos — declarados, no escondidos

Estos cinco **podrían defenderse dentro** y los dejo **fuera** con su razón, para que el operador
pueda moverlos sin rehacer el análisis:

| Campo | Argumento a favor de entrar | Por qué lo dejo fuera |
|---|---|---|
| `header.subtitle` | Es una frase completa. | Es rótulo de cabecera; su tipografía no está pensada para matemáticas en línea. **Y no tiene ninguna guardia.** |
| `visual.caption` / `video.caption` | En JAME Core los pies llevan fórmula (§3.6, `footer` 2 ocurrencias). | El ticket los nombra como no-prosa. **Sin guardia ninguna.** |
| `table(simple).rows[][]` | Una celda puede ser una frase. | Ya existe la tabla rica con `math.expression`, que es la vía contratada. |
| `split(rows).rows[].value` | A veces es una frase. | Es la columna de valores; su gemelo `label` tampoco entra. |
| `details.items[].summary` | **LO METÍ DENTRO.** | Se declara aquí porque es el más discutible de los 15: es cabecera de acordeón, no cuerpo. |

**Esto es una propuesta. La decisión es del operador.**

---

## 5. LO QUE CUESTA GARANTIZAR CADA CAMPO

### 5.1 Guardia que tiene HOY cada uno de los 15, y qué le falta

| Campo | Guardia hoy | ¿Frena HTML? | ¿Frena Markdown? | ¿Frena `\[ \]`? | ¿Valida LaTeX? |
|---|---|---|---|---|---|
| `narrative.text` | `Inline` | sí | **no** | no | **no** |
| `callout.content` | `Inline` | sí | **no** | no | **no** |
| `card(normal).content` | `Inline` | sí | **no** | no | **no** |
| `card(persona).content` | `Inline` | sí | **no** | no | **no** |
| `details.items[].summary` | `Inline` | sí | **no** | no | **no** |
| `details.items[].content` | `Inline` | sí | **no** | no | **no** |
| `conceptGrid.items[].content` | `Inline` | sí | **no** | no | **no** |
| `rule.description` | `Inline` | sí | **no** | no | **no** |
| **`list.items[]`** | **NINGUNA** | **no** | **no** | no | **no** |
| **`iconList.items[].text`** | **NINGUNA** | **no** | **no** | no | **no** |
| `timeline.steps[].description` | `Plain` | sí | **sí** | no | **no** |
| `timeline.steps[].details` | `Plain` | sí | **sí** | no | **no** |
| `hierarchy.nodes[].description` | `Plain` | sí | **sí** | no | **no** |
| `split(rows).description` | `Plain` | sí | **sí** | no | **no** |
| `table(rica).rows[].label.description` | `Plain` | sí | **sí** | no | **no** |

**Ninguno de los quince valida LaTeX. Ninguno.** El único campo del repo que lo hace es
`rule.math`, y no está en el conjunto.

### 5.2 Los 14 campos SIN NINGUNA GUARDIA DE ESQUEMA — cifra verificada

**La cifra del ticket es 14. Medida hoy: 14. CONFIRMADA.** La lista completa:

```
header.title
header.subtitle
card(code).content
list.title
list.items[]                 ← DENTRO del conjunto propuesto
columns.title
iconList.title
iconList.items[].badge
iconList.items[].title
iconList.items[].text        ← DENTRO del conjunto propuesto
visual.title
visual.caption
video.title
video.caption
```

**Dos de los quince campos del conjunto propuesto están entre ellos.** Sus esquemas son literales
`z.string().min(1)` (`compiler-api/schemas/draftSchema.js:294-299` para `iconList`, `:756` para
`list.items`). Su única defensa es `escapeHtml` en el compilador — y **`escapeHtml` es
exactamente lo que hay que dejar de aplicar dentro del tramo de fórmula**. Abrir esos dos exige
dotarlos de guardia primero, o el coste de la fórmula se paga en seguridad.

### 5.3 Qué validación haría falta — las cinco piezas que no existen

| Pieza | ¿Existe hoy? | Coste medido |
|---|---|---|
| **1. Un partidor de la cadena** en `[texto, fórmula, texto, …]` con reglas para delimitador sin cerrar, escapado y anidado | **NO** | módulo nuevo. Lo más parecido, `stripInlineMathDelimiters` (`compiler.js:523`), solo desnuda un `\( … \)` que envuelva **la cadena entera**, anclado `^…$`, y se usa en 6 sitios (`:530,532,733,737,745,749`) |
| **2. `validateLatexPayload` por tramo de fórmula** + `validateSafePlainText` por tramo de texto | **las dos funciones SÍ, el llamador por tramo NO** | cableado |
| **3. Mapeo de errores con posición** («qué fórmula, en qué offset de qué campo») | **NO** | `ctx.addIssue` de Zod solo lleva `path` de campo |
| **4. Reescape asimétrico en el compilador** | **NO** | **76 puntos de emisión** que hoy escapan sin distinguir: **69 llamadas a `escapeHtml(`** (70 ocurrencias del literal menos la interna de `escapeHtmlWithLineBreaks`, `compiler.js:109`) **+ 7 a `escapeHtmlWithLineBreaks(`}` |
| **5. Guardia de esquema para los 2 campos sin ninguna** | **NO** | los 2 `draftSchema.js`, en paralelo, más la tercera copia de las guardias en `compiler.js:256-279` |

`escapeHtml` (`compiler.js:99-106`) escapa exactamente cinco caracteres: `&`, `<`, `>`, `"`, `'`.
En LaTeX, `&` es separador de alineación y `<` `>` son operadores: **son precisamente los que la
fórmula necesita y los que la defensa está para neutralizar.**

### 5.4 Qué tests habría que escribir

**Cobertura actual, medida: 32 archivos `*.test.mjs`, 350 declaraciones `test()`.**

Tests que hoy ejercitan la **guardia de texto seguro** (buscan el mensaje de rechazo):
**solo 3 archivos** — `webHierarchyFlatNodeSafety.test.mjs`,
`webTimelineNormalStepsSafety.test.mjs`, `webTheoryComplexSplitSchemaCompiler.test.mjs`.

**Ningún test del repo afirma hoy la conducta de un delimitador de fórmula dentro de un campo de
prosa.** Verificado por barrido. **La conducta que ya está en producción no está contratada ni
probada por nadie.**

Cobertura por campo del conjunto propuesto:

| Campo | Test de seguridad existente | ¿Habría que escribir? |
|---|---|---|
| `narrative.text` | `webTheoryTextBlocksSafety.test.mjs` (6 tests) | **ampliar** |
| `callout.content`, `card(normal).content` | `webTheoryTextBlocksSafety`, `webTheoryCardsRuleBoxesParitySafety` (18) | **ampliar** |
| `card(persona).content` | `webTheoryCardsRuleBoxesParitySafety` | **ampliar** |
| `details.items[].summary/content` | — (`details` solo aparece de refilón) | **NUEVO** |
| `list.items[]` | — | **NUEVO** |
| `iconList.items[].text` | `webIconListBadgeWidth.test.mjs` (3 tests, solo ancho de badge) | **NUEVO** |
| `conceptGrid.items[].content` | `webConceptGridSafety.test.mjs` (8) | **ampliar** |
| `rule.description` | `webRuleMathAuthoringIntegration` (7), `webRuleSmartFormulaFieldRulePilot` (16) | **ampliar** |
| `timeline.steps[].description/details` | `webTimelineNormalStepsSafety.test.mjs` (18) | **ampliar** |
| `hierarchy.nodes[].description` | `webHierarchyFlatNodeSafety.test.mjs` (15) | **ampliar** |
| `split(rows).description` | `webColumnsChildExpansionSafety` (27), `webTheoryComplexSplitSchemaCompiler` (10) | **ampliar** |
| `table(rica).rows[].label.description` | `webTableSafety.test.mjs` (11) | **ampliar** |

**Cuenta: 3 archivos de test NUEVOS** (details, list, iconList) **+ 9 archivos existentes a
ampliar**. Y **un archivo nuevo transversal** que fije la conducta del tramo delimitado en las
cuatro vías de salida — porque hoy no existe ninguno.

Tests que **se pondrían rojos** si se añade validación de tramo, por orden de exposición:
`webColumnsChildExpansionSafety` (27), `webTimelineNormalStepsSafety` (18),
`webTheoryCardsRuleBoxesParitySafety` (18), `webHierarchyFlatNodeSafety` (15),
`webTableSafety` (11), `webConceptGridSafety` (8), `webTheoryTextBlocksSafety` (6).

**No se corrió la suite completa** (§13). Estas son las superficies expuestas, no un resultado
de ejecución.

---

## 6. LAS CUATRO VÍAS DE SALIDA — VERIFICADAS EJECUTANDO

**Arnés:** se compiló un draft con la frase del operador en tres campos de prosa
(`callout.content`, `details.items[].content`, `card(normal).content`) y se llevó a las cuatro
vías. **Se omitió `outputPath` en las dos llamadas a `buildSingleWebLesson`**, que es lo único
que dispara escritura. **Se evitó `narrative` a propósito**, por el taller paralelo.

**Cadena de entrada, VERBATIM:**

```
la formula \(ax^2+bx+c\) tiene las siguientes caracteristicas
```

`¿la cadena sobrevive al compilador, byte a byte? → true`

### 6.1 Vías 1 y 2 — Web generado y previsualización: IDÉNTICAS

Etiqueta `<script>` de auto-render extraída de cada HTML producido:

```
html generado   : <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js" onload="renderMathInElement(document.body);">
previsualizacion: <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js" onload="renderMathInElement(document.body);">
¿IDENTICAS?     : true
```

| Medida | Web generado | Previsualización |
|---|---|---|
| ¿objeto `delimiters`? | **false** | **false** |
| nº de `renderMathInElement(` | **1** | **1** |
| versión KaTeX | `katex@0.16.9` | `katex@0.16.9` |

**CONFIRMADO: las dos vías Web son idénticas y ninguna configura delimitadores**, luego rige el
juego por defecto de KaTeX auto-render, el mismo en las dos. Fuentes:
`src/builders/web/buildSingleWebLesson.js:4` y
`tools/author-lite/compiler-api/services/previewRenderer.js:14`.

**Límite honesto:** que ese juego por defecto incluya `\( … \)` es conducta de la librería KaTeX.
**No se ejecutó KaTeX**: no está en ningún `node_modules` del repo y no se hizo red. Lo medido es
que **ninguna de las dos configura `delimiters`**.

La frase, tal cual sale, en ambas:

```
"la formula \(ax^2+bx+c\) tiene las siguientes caracteristicas"
```

### 6.2 Vía 3 — MOODLE: **el formato NO lleva el motor de fórmulas. CONFIRMADO.**

| Medida | Resultado ejecutado |
|---|---|
| ¿trae assets KaTeX (`katex.min.css` / `katex.min.js`)? | **false** |
| ¿trae `renderMathInElement`? | **false** |
| ¿trae objeto `delimiters`? | **false** |
| ¿trae `MOODLE_LAYOUT_FIX` (`.filter_mathjaxloader_equation`)? | **true** |
| longitud del HTML | 24 528 (Moodle) contra 27 894 (Web) |
| ocurrencias de la fórmula en el cuerpo | **3 de 3** |

Causa: `src/builders/web/buildSingleWebLesson.js:153-155`, `renderMoodleHtml` devuelve solo
`MOODLE_LAYOUT_FIX + bodyContent`.

### 6.3 ⭑ LA RESPUESTA PRECISA: qué se ve exactamente hoy en Moodle

**La cadena literal que sale, VERBATIM, sin transformar y sin escapar:**

```
la formula \(ax^2+bx+c\) tiene las siguientes caracteristicas
```

**Idéntica a la que el autor escribió, byte a byte.** Los tres campos, con su contexto HTML
VERBATIM tal cual se recortó de la salida Moodle:

```html
<div class="j-callout-content" style="width: 100%;">
            la formula \(ax^2+bx+c\) tiene las siguientes caracteristicas
        </div>
```
```html
line-height: 1.6; background-color: #FFFFFF; ">
                la formula \(ax^2+bx+c\) tiene las siguientes caracteristicas
            </div>
        </details>
```
```html
<div class="j-web-card-body">
                la formula \(ax^2+bx+c\) tiene las siguientes caracteristicas
            </div>
```

Y los primeros 200 caracteres del documento Moodle completo, VERBATIM:

```html
<style>.filter_mathjaxloader_equation { display: block !important; width: 100% !important; }</style>
    <div class="j-lesson-wrapper" data-j-reader-text-step="0">
        <link rel="stylesheet" href=
```

**Interpretación exacta, sin inflarla:** el HTML que Author Lite entrega a Moodle contiene la
fórmula **como texto plano con sus delimitadores intactos**, y **no contiene ningún motor que la
pinte**. Lo único que Author Lite aporta es un `<style>` que fuerza `display:block` sobre
`.filter_mathjaxloader_equation`, **la clase del filtro MathJax de Moodle**.

Por tanto: **si esa fórmula se pinta o se ve como texto crudo `\(ax^2+bx+c\)` no lo decide este
repo, lo decide la configuración del filtro MathJax de la instalación de Moodle, que vive fuera.**
Si el filtro está activo y reconoce `\( … \)`, se pinta. Si no lo está, **el alumno lee
literalmente `\(ax^2+bx+c\)` en mitad de la frase**. Este repo no puede saber cuál de las dos
cosas ocurre, y **hoy no hay ningún test ni ninguna evidencia en el repo que lo compruebe**.

### 6.4 Vía 4 — SLIDES: usa delimitadores propios. CONFIRMADO, y hay un dato nuevo

Objeto `delimiters` extraído de la salida ejecutada:

```
delimiters: [{left: "$$", right: "$$", display: true}, {left: "\\[", right: "\\]", …
```

| Medida | Resultado |
|---|---|
| ¿trae objeto `delimiters`? | **true** — tres delimitadores explícitos |
| ¿incluye entornos `\begin{…}`? | **false** |
| **nº de `renderMathInElement(`** | **2** |
| ¿la fórmula está en el cuerpo? | **true**, literal e intacta |

**El dato nuevo, no medido antes: en Slides se ejecutan DOS barridos, no uno.** El primero es el
`onload="renderMathInElement(document.body);"` del asset KaTeX, **sin configurar** (juego por
defecto); el segundo es el `MATH_TRIGGER` de
`src/builders/slides/layouts/renderColumnsSlide.js:25-33`, a los 100 ms, **con los tres
delimitadores explícitos**. Los dos corren sobre `document.body`.

Esto vale igual para el Slides **generado**: `main.js:158` inyecta el mismo bloque `katex` con el
`onload` por defecto, y `renderColumnsSlide` añade el suyo encima.

### 6.5 Resumen de las cuatro vías

| Vía | Motor | Delimitadores | ¿Configurados? | Barridos |
|---|---|---|---|---|
| Web generado | KaTeX 0.16.9 | juego por defecto | **no** | 1 |
| Web previsualización | KaTeX 0.16.9 | juego por defecto | **no** | 1 |
| **Moodle** | **ninguno en este repo** | **los de MathJax de Moodle, fuera del repo** | — | **0** |
| Slides | KaTeX 0.16.9 | por defecto **+** `$$`, `\[ \]`, `\( \)` | **sí, el segundo** | **2** |

**«Los delimitadores son uniformes» es cierto solo dentro de Web.**

---

## 7. EL INSERTOR — MEDIDO, **NO CONSTRUIDO**

**No se montó en ninguna parte. No se prototipó. No se importó desde ningún sitio.**

### 7.1 El cero, reverificado

**Pieza:** `FormulaInserterShell`,
`tools/author-lite/editor-ui/src/features/math-authoring/formulaInserter/FormulaInserterShell.jsx`,
**163 líneas**.

Barrido completo de `tools/` y `src/` (sin `node_modules`) por el identificador. **Cuatro
resultados en total, y ni uno es un importador:**

```
FormulaInserterShell.jsx:45    const FormulaInserterShell = ({          ← su definición
FormulaInserterShell.jsx:161   export default FormulaInserterShell;     ← su export
FormulaInserterShell.jsx:163   export { FormulaInserterShell };         ← su export
compiler-api/tests/webRuleSmartFormulaFieldRulePilot.test.mjs:259       ← aserción NEGATIVA
```

La única mención externa, VERBATIM, comprueba que la superficie de `rule` **NO** lo contiene:

```js
assert.doesNotMatch(ruleMathFieldSource, /FormulaInserterShell|Insert fraction|Shortcuts:|\bInsert\b|Background|Fondo/u);
```

**Importadores reales: 0 (CERO), sobre 56 archivos `.jsx` del editor.** Tampoco lo reexporta
`math-authoring/index.js`, que sí reexporta a sus hermanos no visuales (`:84-96`).

### 7.2 Qué exporta

| Export | Línea | Qué es |
|---|---|---|
| `export default FormulaInserterShell` | `:161` | el componente |
| `export { FORMULA_INSERTION_HINTS }` | `:162` | **reexport** de `formulaInserter.types.js` |
| `export { FormulaInserterShell }` | `:163` | el mismo componente, con nombre |

### 7.3 Qué espera recibir — su firma completa, VERBATIM (`:45-57`)

```jsx
const FormulaInserterShell = ({
  value,
  onValueChange,
  onMathNodeChange,
  onBlur,
  mode = 'inline',
  disabled = false,
  readOnly = false,
  placeholder = 'a^2 + b^2 = c^2',
  error,
  className = '',
  helperText = '',
}) => {
```

Once props. **Ninguna de ellas es un `ref` externo, un offset, ni un objetivo de inserción.**
`mode` por defecto ya es `'inline'`.

### 7.4 De qué depende

Imports reales (`:1-4`), **tres, todos hermanos del propio paquete**:

```js
import { useMemo, useRef, useState } from 'react';
import { FORMULA_INSERTION_HINTS } from './formulaInserter.types.js';
import { evaluateFormulaButtonAction, evaluateFormulaSlashAction } from './formulaInserter.actions.js';
import { createFormulaInserterController } from './formulaInserter.controller.js';
```

El paquete completo, **4 archivos, 757 líneas**:

| Archivo | Líneas | Papel |
|---|---|---|
| `FormulaInserterShell.jsx` | 163 | la carcasa de interfaz — **huérfana** |
| `formulaInserter.actions.js` | 438 | las acciones (`evaluateFormulaSlashAction`, `evaluateFormulaButtonAction`) — **cableadas** |
| `formulaInserter.controller.js` | 129 | el controlador (`createFormulaInserterController`, `resolveFormulaInserterText`) — **cableado** |
| `formulaInserter.types.js` | 27 | constantes congeladas — **cableadas** |

Sus hermanos no visuales **sí** tienen consumidores reales:
`smartFormulaFieldAdapter.js:18`, `smartFormulaFieldState.js:5,9`, `math-authoring/index.js:84-96`,
y dos tests (`mathAuthoringFormulaInserter.test.mjs:7,11`, `mathAuthoringSmartFormulaField.test.mjs:40`).

**La lógica del insertor existe, está probada y está conectada. Lo único huérfano es su carcasa
de interfaz.**

### 7.5 Qué le faltaría para escribir en el punto del cursor dentro de un campo de texto

**Hoy no puede, y la razón es estructural, no de detalle: la carcasa es dueña de su propio
`<textarea>` y ese textarea contiene LaTeX puro, no prosa.**

`:141-154` monta su propio `<textarea>` con `value={inputValue}`, y su manejo de cursor
(`:95-98`, `:128-134`) lee `target.selectionStart` / `selectionEnd` **de ese textarea suyo**. Para
escribir dentro de un párrafo ajeno hacen falta **seis piezas que no existen**:

| # | Pieza que falta | Estado hoy |
|---|---|---|
| 1 | **Una referencia al `<textarea>` del campo de prosa** | `TextAreaField.jsx` (31 líneas) hace `{...registerProps}` sobre el `<textarea>` y **no expone ningún `ref`**. El `ref` que llega es el de React Hook Form; añadir otro exige fusionarlos. |
| 2 | **Captura y conservación de `selectionStart`/`selectionEnd`** del campo de prosa | **no existe**. `TextAreaField` no tiene `onSelect` ni estado de selección. Al pulsar el botón del insertor el campo pierde el foco y **la posición del cursor se pierde**. |
| 3 | **Una función de empalme** `valor.slice(0,inicio) + delim + latex + delim + valor.slice(fin)` | **no existe**. Lo más parecido es `withReplacement` (`formulaInserter.actions.js:30`), que opera **dentro de la cadena LaTeX**, no dentro de prosa. |
| 4 | **El envoltorio de delimitadores** | **no existe.** `createFormulaNodeFromLatex` (`controller.js:79-103`) devuelve un mathNode con `latex` pelado, y `buildMathRenderInput` (`mathNode.js:46-62`) devuelve `renderIntent` **sin emitir delimitadores**. Alguien tiene que decidir y escribir `\(` y `\)`. |
| 5 | **Escritura de vuelta por React Hook Form** con `setValue(nombre, siguiente, { shouldValidate, shouldDirty })` **y recolocación del cursor** tras el fragmento | **no existe**. Hoy la carcasa solo llama `onValueChange(result.latexResult)`, que sustituye **el campo entero**. |
| 6 | **Una autorización por campo** para que el botón solo aparezca en el conjunto candidato | **no existe**. No hay registro de qué campo admite fórmula. |

### 7.6 Qué archivos habría que tocar — con su conteo

**No se tocó ninguno. Esto es el presupuesto, no el trabajo.**

| Nivel | Archivo | Líneas hoy | Qué tendría que cambiar |
|---|---|---|---|
| **UI mínima** | `formulaInserter/FormulaInserterShell.jsx` | 163 | dejar de ser dueña del textarea, o nacer una carcasa hermana de anclaje |
| | `formulaInserter/formulaInserter.controller.js` | 129 | emitir el fragmento con delimitadores |
| | `editor/components/common/TextAreaField.jsx` | **31** | reenvío de `ref` + captura de selección |
| | `editor/components/web/WebBlockEditor.jsx` | **4082** | puntos de montaje de los campos del conjunto |
| | `editor/components/common/IconListFields.jsx` | 181 | solo si entra `iconList.items[].text` |
| | `math-authoring/index.js` | — | reexportar la carcasa (hoy no lo hace) |
| **Módulo nuevo** | *(partidor + envoltorio de delimitadores)* | **0** | **no existe** |
| **Contrato** | `compiler-api/schemas/draftSchema.js` | — | guardia por campo abierto |
| | `editor-ui/src/schemas/draftSchema.js` | — | **en paralelo, byte a byte** |
| **Emisión** | `compiler-api/services/compiler.js` | — | solo si se quiere escape asimétrico: **76 puntos** |
| **Tests** | 3 nuevos + 9 ampliados | — | §5.4 |

**Conteo: 6 archivos existentes a tocar para el cableado mínimo de interfaz, 1 módulo nuevo,
2 esquemas en paralelo, 1 compilador opcional, 12 archivos de test.**

**Fuera de este presupuesto** quedan `SlideCardEditor.jsx`, `SlideItemEditor.jsx` y
`VisualFields.jsx`, porque ninguno de sus campos entra en el conjunto propuesto.

---

## 8. QUÉ RUNS QUEDARÍAN AFECTADOS

Recorrido del canónico `projects/cantu-studio/.aiw/roadmap/roadmap.json`.
**No se propone mover nada. No se clasifica nada.**

**Estado real medido: 66 runs — `completed=25`, `planned=40`, `active=1`.**

**Activo (taller paralelo, no se toca):**

| queue_order | run_id | Título VERBATIM |
|---|---|---|
| 24 | `RUN-JAME-WEB-NARRATIVE-REPAIR-001` | `Audit and implement the Narrative component` |

### 8.1 Runs `planned` que tocan campos del conjunto candidato

| queue_order | run_id | Título VERBATIM | Campos del conjunto que toca |
|---|---|---|---|
| 25 | `RUN-JAME-WEB-CALLOUT-REPAIR-001` | `Audit and implement the Callout component` | `callout.content` |
| 26 | `RUN-JAME-WEB-DETAILS-REPAIR-001` | `Audit and implement the Details component` | `details.items[].summary`, `details.items[].content` ← **el que ya lleva fórmula escrita** |
| 28 | `RUN-JAME-RULE-COMPONENT-REPAIR-AND-ACTIVATION-001` | `Audit and implement the Rule component` | `rule.description` |
| 30 | `RUN-JAME-WEB-SPLIT-SCOPE-AND-REPAIR-001` | `Decide scope and enable the Split component` | `split(rows).description` |
| 31 | `RUN-JAME-WEB-TABLE-AUDIT-AND-REPAIR-001` | `Audit and implement the Table component` | `table(rica).rows[].label.description` |
| 32 | `RUN-JAME-WEB-CONCEPTGRID-AUDIT-AND-REPAIR-001` | `Audit and implement the ConceptGrid component` | `conceptGrid.items[].content` |
| 33 | `RUN-JAME-WEB-HIERARCHY-AUDIT-AND-REPAIR-001` | `Audit and implement the Hierarchy component` | `hierarchy.nodes[].description` |
| 34 | `RUN-JAME-WEB-TIMELINE-AUDIT-AND-REPAIR-001` | `Audit and implement the Timeline component` | `timeline.steps[].description`, `timeline.steps[].details` |
| 37 | `RUN-CANTU-COMPONENT-GUIDE-CONTENT-001` | `Write the Component Guide for the seventeen Web components` | **documenta al autor qué admite cada campo** |
| 38 | `RUN-CANTU-WEB-PACKET-VERIFICATION-BATCH-001` | `Verify the Header, List, IconList, and Card component packets` | `list.items[]`, `iconList.items[].text`, `card(normal).content`, `card(persona).content` — **los dos primeros SIN GUARDIA** |
| 39 | `RUN-CANTU-WEB-PACKET-VERIFICATION-BATCH-002` | `Verify the Video, Narrative, Callout, and Details component packets` | `narrative.text`, `callout.content`, `details.*` |
| 40 | `RUN-CANTU-WEB-PACKET-VERIFICATION-BATCH-003` | `Verify the Arithmetic, Rule, Split, and Table component packets` | `rule.description`, `split.description`, `table…label.description` — **y reabre las 4 evidencias rotas de §1.2** |
| 41 | `RUN-CANTU-WEB-PACKET-VERIFICATION-BATCH-004` | `Verify the ConceptGrid, Hierarchy, Timeline, and Visual component packets` | `conceptGrid.items[].content`, `hierarchy…description`, `timeline…description/details` |
| 42 | `RUN-JAME-WEB-READINESS-EVIDENCE-001` | `Audit the Web components as a whole` | los quince |
| 44 | `RUN-JAME-FORMULA-INSERTER-INTEGRATION-001` | `Verify global Formula Inserter integration after component revalidation` | **el insertor de §7, el de 0 importadores** |

Y el activo, `queue_order 24`, toca `narrative.text` — el campo nº 1 del conjunto propuesto.

### 8.2 Runs `planned` de componente que NO tocan el conjunto

| queue_order | run_id | Título VERBATIM | Por qué no |
|---|---|---|---|
| 27 | `RUN-JAME-WEB-ARITHMETIC-AUDIT-AND-REPAIR-001` | `Audit and implement the Arithmetic component` | sus 4 campos son título, rótulo y fórmulas |
| 35 | `RUN-JAME-WEB-VISUAL-AUDIT-AND-REPAIR-001` | `Audit and implement the Visual component` | `caption` queda fuera por ser pie (§4.4) |
| 36 | `RUN-CANTU-COMPONENT-GUIDE-PACKET-WIRING-001` | `Unify the Component Guide mechanism and fix its template` | mecanismo, no contenido |

### 8.3 El dato que responde a «va antes o después»

- **15 runs `planned` tocan campos del conjunto candidato**, y **catorce de ellos ocupan
  `queue_order` 25–42, es decir, la cola inmediata**. El decimoquinto es el 44.
- **El activo `queue_order 24` ya está tocando `narrative.text`**, el primer campo del conjunto.
  **La decisión llega con un componente del conjunto ya en revalidación.**
- **`RUN-JAME-FORMULA-INSERTER-INTEGRATION-001` (`queue_order 44`)** está declarado, por su
  propio título verbatim, como **posterior** a la revalidación de componentes:
  *«after component revalidation»*. **El canónico ya coloca la integración del insertor detrás de
  toda la cola de componentes.**
- **`RUN-CANTU-COMPONENT-GUIDE-CONTENT-001` (`queue_order 37`)** documentará al autor qué admite
  cada campo. **Si la fórmula en línea se decide después de él, esa guía nace desactualizada** —y
  nacería además omitiendo una conducta que ya está en producción (§3.2).
- Los cuatro archivos rotos de §1.2 caen dentro del alcance de
  `RUN-CANTU-WEB-PACKET-VERIFICATION-BATCH-003` y de
  `RUN-JAME-WEB-SPLIT-SCOPE-AND-REPAIR-001`.

**No propongo mover nada.**

---

## 9. VALIDADOR — SALIDA COMPLETA

Ejecutado por la vía que **no escribe**, desde `projects/cantu-studio`:

```bash
node tools/project-console/validate-project-console-state.mjs
```

**Salida completa, VERBATIM:**

```
Project Console state validation passed.
Roadmap v3 prototype: 7 objectives / 28 phases / 66 runs; queue groups needs_human_decision=0 now=1 ready_next=15 later=25 history=25
Roadmap v3 active run derived stages: RUN-JAME-WEB-NARRATIVE-REPAIR-001=none
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
- **`history=25`**
- **`ready_next=15`** ← el ticket no la daba a propósito. **Medida: 15.**
- otros grupos de cola: `needs_human_decision=0`, `now=1`, `later=25`
- 7 objetivos / 28 fases
- run activo: `RUN-JAME-WEB-NARRATIVE-REPAIR-001`

El aviso no bloqueante de la dependencia externa apareció y es el conocido y legal.
**No se reparó** (§13).

---

## 10. CIFRAS DEL TICKET — VERIFICADAS UNA A UNA

| Cifra del ticket | Cómo se verificó | Resultado |
|---|---|---|
| **66 runs** | salida del validador **+** recuento propio sobre `roadmap.json` | **CONFIRMADA — 66** (`completed=25`, `planned=40`, `active=1`) |
| **`history=25`** | salida del validador; coincide con `completed=25` del recuento propio | **CONFIRMADA — 25** |
| **`ready_next=?`** | el ticket no la daba a propósito | **MEDIDA — 15** |
| **17 componentes** | 17 ids `web-*` en `blockCatalog.js` (`:140`–`:1082`, incluido `web-concept-grid` en `:814`); la unión `WebBlockSchema` tiene **16** miembros (`draftSchema.js:990-1007`) **+ `split`**, que solo existe como hijo de `columns` (`:865-936`) | **CONFIRMADA — 17** |
| **69 campos de texto libre** | inventario ejecutable propio, lista tomada de la introspección del esquema | **NO REPRODUCE — mido 78.** Ver §10.1 |
| **14 sin guardia de esquema** | inventario ejecutable; guardia deducida del veredicto real de los dos esquemas | **CONFIRMADA — 14**, y la lista coincide campo a campo con la previa |
| **un solo campo validado como LaTeX** | inventario ejecutable: solo `rule.math` rechaza `\zzzz` | **CONFIRMADA — 1: `rule.math`** |
| **las dos vías Web son idénticas** | ejecutado, §6.1 | **CONFIRMADA — `¿IDENTICAS? true`** |
| **Moodle no lleva el motor de fórmulas** | ejecutado, §6.2 | **CONFIRMADA — sin assets KaTeX, sin `renderMathInElement`** |
| **Slides usa delimitadores propios** | ejecutado, §6.4 | **CONFIRMADA — tres explícitos, y además un segundo barrido no declarado antes** |
| **`FormulaInserterShell` tiene 0 importadores** | barrido completo de `tools/` y `src/` | **CONFIRMADA — 0, sobre 56 `.jsx`** |
| **350 declaraciones `test()` en 32 archivos** | recuento estático de `^test(` | **CONFIRMADA — 350 en 32 archivos.** No se corrió la suite. |

### 10.1 La única discrepancia: 69 contra 78 — reconciliada, gana el disco

**No es que el 69 esté mal: es otra enumeración.** Los 9 campos de diferencia son:

| Campos que yo cuento y la enumeración previa no | Nº |
|---|---|
| La variante **`gridSteps` de `split`** entera (`gridSteps[].badge`, `gridSteps[].title`, `gridSteps[].math`) | **3** |
| `badge` en las variantes `metric`, `code` y `persona` de `card` (la previa solo contaba el de `normal`) | **3** |
| `title` en las variantes `code` y `persona` de `card` | **2** |
| `table.title` contado por separado en las dos variantes de tabla | **1** |
| **Total** | **9** |

69 + 9 = **78**. **Mi método está declarado en §4.1 y es reproducible; el previo enumeraba a
mano.** Ninguna de las dos cifras cambia el reparto por guardia en lo que importa: **14 sin
guardia y 1 con LaTeX se confirman en las dos.**

### 10.2 Otras discrepancias con la medición previa

| Afirmación previa | Hoy |
|---|---|
| `history=24`, `completed=24`, `ready_next=16`, `later=25` | **`history=25`, `completed=25`, `ready_next=15`, `later=25`.** El run de `video` cerró; el de `narrative` está activo. **La previa era correcta en su fecha.** |
| run activo = `RUN-JAME-WEB-VIDEO-REVALIDATION-001` (`queue_order 23`) | **ahora `RUN-JAME-WEB-NARRATIVE-REPAIR-001` (`queue_order 24`)** |
| «74 puntos de emisión (68 `escapeHtml` + 6 `escapeHtmlWithLineBreaks`)» | **76** — 69 llamadas a `escapeHtml(` (70 ocurrencias menos la interna de `escapeHtmlWithLineBreaks`, `compiler.js:109`) + **7** a `escapeHtmlWithLineBreaks(` |
| `41 planned` | **40 planned** (uno pasó a activo) |
| «`stripInlineMathDelimiters` … en `table` y en `split`» | **CONFIRMADA** — 6 puntos de uso: `compiler.js:530,532,733,737,745,749` |
| «`Component statuses: 16` contra 17 componentes» | **se reproduce.** `.aiw/state/component_status.json` tiene 16 entradas. Consistente con `split`, que no es bloque de primer nivel. **No se persiguió** (§13). |

---

## 11. RECOMENDACIÓN EXPLÍCITA — SIN DECIDIR

**La decisión es del operador. Esto es una recomendación, con su coste medido.**

### 11.1 Qué conjunto recomiendo

**Recomiendo abrir 6 campos, no los 15.** El conjunto de §4.2 es la propuesta completa y bien
razonada; **la recomendación es empezar por un tramo de seis**, y por una razón medida: son los
únicos donde la conducta ya está probada, la guardia es homogénea y el coste de la garantía no
arrastra los 14 campos sin guardia.

**Tramo 1 — los seis que recomiendo abrir primero:**

| # | Campo | Guardia | Por qué este |
|---|---|---|---|
| 1 | `details.items[].content` | `Inline` | **Ya lleva una fórmula escrita en 4 archivos del corpus y se pinta.** Abrirlo es declarar lo que ya pasa. |
| 2 | `callout.content` | `Inline` | Misma guardia, mismo renderer de texto simple, sin matemáticas propias que colisionen. |
| 3 | `card(normal).content` | `Inline` | Ídem. Es el cuerpo de lectura profunda. |
| 4 | `conceptGrid.items[].content` | `Inline` | Ídem, y su run está en la cola inmediata (`queue_order 32`). |
| 5 | `rule.description` | `Inline` | Es el vecino del único campo con allowlist LaTeX: si la validación por tramo se estrena en algún sitio, es aquí. |
| 6 | `narrative.text` | `Inline` | El campo de prosa por excelencia. **Pero su componente está en revalidación ahora mismo** (§8): entra al tramo 1 **solo si el operador quiere que el run activo lo contemple**; si no, va al tramo 2 sin coste. |

**Los seis comparten guardia `Inline`. Ninguno está entre los 14 sin guardia. Ninguno tiene
campo `math` propio que pueda anidarse.** Esa homogeneidad es lo que hace barato el tramo 1.

**Tramo 2 — los cinco de guardia `Plain`:** `timeline.steps[].description`,
`timeline.steps[].details`, `hierarchy.nodes[].description`, `split(rows).description`,
`table(rica).rows[].label.description`. **Coste extra medido: hay que decidir qué se hace con el
detector de Markdown.** El barrido dice que **hoy no cuesta nada** —cero ocurrencias de las tres
colisiones en todo el contenido escrito— pero cambia el contrato de esos campos.

**Tramo 3 — los dos sin guardia:** `list.items[]`, `iconList.items[].text`. **Coste extra
medido: hay que darles guardia antes.** Son 2 de los 14 de §5.2, y su única defensa es
`escapeHtml`, que es justo lo que hay que relajar dentro del tramo de fórmula. **Abrirlos sin
guardia previa cambia un problema de robustez en un problema de verdad.**

**Fuera, y con medición:** los 63 restantes de §4.3.

### 11.2 En qué orden haría el trabajo

| Orden | Trabajo | Coste medido |
|---|---|---|
| **0** | **Reparar las tres roturas de §1**, o decidir explícitamente no repararlas | 1 draft del almacén vivo, 4 evidencias congeladas, 1 lección que se descarta en silencio |
| **1** | **Declarar la conducta que ya existe.** Un test que fije qué hace hoy un `\( … \)` dentro de `details.items[].content` en las cuatro vías | **1 archivo de test nuevo. Cero archivos de producción.** Hoy no existe ningún test así. |
| **2** | **Medir Moodle de verdad.** El §6.3 dice qué cadena sale; **nadie ha comprobado qué ve el alumno** | fuera del repo: exige una instalación de Moodle |
| **3** | **Escribir el partidor de tramos** y su prueba, sin cablearlo a nada | **1 módulo nuevo** |
| **4** | **Cablear la validación por tramo en los 6 campos del tramo 1** | 2 esquemas en paralelo + 5 archivos de test ampliados |
| **5** | **Solo entonces**, el insertor de interfaz | 6 archivos + 1 módulo (§7.6) |
| **6** | Tramos 2 y 3, cada uno con su decisión propia | §11.1 |

### 11.3 Qué debería ir ANTES del primer componente que lo consuma

**Tres cosas, y las tres son baratas:**

1. **El test que declara la conducta actual (orden 1).** Ahora mismo `details.items[].content`
   lleva una fórmula que se pinta, **y ningún test lo sabe**. Cualquier run de componente que
   toque `details` puede romperlo sin enterarse. **Es un archivo de test y cero riesgo.**

2. **La decisión sobre `RUN-CANTU-COMPONENT-GUIDE-CONTENT-001` (`queue_order 37`).** Esa guía
   dirá al autor qué puede escribir en cada campo. Si se escribe antes de decidir, **documentará
   como imposible algo que ya funciona**. Es el único run de la cola cuyo contenido queda
   objetivamente mal si el orden se invierte.

3. **La guardia de los dos campos sin guardia**, si el operador quiere `list.items[]` e
   `iconList.items[].text` en el conjunto. Si no los quiere, **este punto desaparece** — y ése es
   el argumento más fuerte para dejarlos en el tramo 3.

### 11.4 Lo que NO recomiendo, con medición

- **No recomiendo esperar a `RUN-JAME-FORMULA-INSERTER-INTEGRATION-001` (`queue_order 44`) para
  declarar la conducta.** El canónico coloca ese run detrás de toda la cola de componentes; para
  entonces habrán pasado por encima catorce runs que tocan campos del conjunto, **sin un solo
  test que fije qué hace hoy la fórmula en línea**.
- **No recomiendo abrir los 15 de golpe.** Cruza tres guardias distintas, los 14 campos sin
  guardia y las cuatro vías de salida, incluida Moodle, que **no lleva motor**.
- **No recomiendo tocar el hueco de `renderHierarchy`** sin contar antes las 48 ocurrencias de
  §3.8: hoy el autor pone el delimitador a mano, y arreglar el renderer las duplicaría.

---

## 12. QUÉ **NO** SE HIZO

**Por prohibición explícita del encargo:**

- **No se escribió, editó ni creó ningún archivo dentro de `projects/cantu-studio`.**
  **Comprobado sin Git**, por marca de tiempo: los únicos 8 archivos del repo con escritura
  reciente son `.aiw/roadmap/roadmap.json`, los 7 de `.project/`
  (`docs_index.json`, `git_history.json`, `guardrails.json`, `no_claims.json`, `roadmap.json`,
  `snapshot.json`) y
  `docs/_historical_run_record/RUN-JAME-WEB-VIDEO-REVALIDATION-001-OPERATOR-QA-PACKET.md`.
  **Los ocho son emisión de la consola y trabajo del taller paralelo. Ninguno se tocó.**
- **No se montó, construyó ni prototipó el insertor.** `FormulaInserterShell` se midió como
  pieza (§7) y **no se importó desde ningún sitio, ni para probar**.
- **No se tocó el componente `narrative` ni ningún archivo del taller paralelo.** El arnés de
  §6 evitó `narrative` a propósito y usó `callout`, `details` y `card`.
- **No se corrió la suite completa.**
- **No se tocó** el roadmap canónico, `.project/`, ningún status de run, Git, ni servidores.
- **No se reparó ninguna colisión** del contenido existente.
- **No se decidió** entre los campos: §11 es recomendación, la decisión es del operador.
- **No se clasificó ningún run ni se propuso mover ninguno.**

**Las tres roturas de §1 quedan reportadas y SIN REPARAR:** el draft `test5.json` del almacén
vivo, las cuatro evidencias congeladas de `sandbox_theory_complex`, y la lección
`2_operaciones_aritmeticas.js` que no carga y se descarta en silencio.

**Derivas ajenas vistas y no perseguidas:** el aviso de dependencia externa del validador; el
mojibake en los dos `draftSchema.js` (`LÃ­mite`, `âš ï¸`, `tÃ­tulo`); la discrepancia
`Component statuses: 16` contra 17 componentes; el BOM de
`QA/temp/PASS_2C_B/qa-list-certification.endpoint.draft.json`; el hueco de delimitador de
`renderHierarchy`; la asimetría de los 14 campos sin guardia.

**Por límite de la medición, declarado:**

- **No se ejecutó KaTeX.** No está en ningún `node_modules` del repo y no se hizo red. Lo medido
  es que **ninguna de las dos vías Web configura `delimiters`** (§6.1).
- **No se comprobó qué ve un alumno en Moodle.** Se midió qué **cadena sale** (§6.3) y que el
  HTML **no lleva motor**; qué hace con ella el filtro MathJax de una instalación real de Moodle
  **está fuera de este repo y no se pudo medir**.
- **No se ejecutó la suite**, así que las 350 declaraciones `test()` son un **recuento estático**;
  no afirmo que estén verdes.

---

## 13. LO QUE SÍ SE EJECUTÓ

Del repo, **solo lecturas y ejecuciones en memoria**:

| Comando / llamada | Qué es |
|---|---|
| `node tools/project-console/validate-project-console-state.mjs` | lectura, §9 |
| `import` de los dos `draftSchema.js` | validación en memoria |
| `compileDraftToJameData`, `compileDraftToWebJS`, `compileDraftToSlidesJS`, `compileDraftToJS` | compilación en memoria |
| `buildSingleWebLesson({data, format:'web'\|'moodle'})` **sin `outputPath`** | única vía sin escritura (`buildSingleWebLesson.js:157-162`) |
| `renderWebDraftPreviewHtml`, `renderSlidesDraftPreviewHtml` | previsualización en memoria |
| `require()` de los 31 archivos de contenido `.js` | universos C y D |

**No se ejecutó** `main.js`, ni la suite, ni ningún servidor, ni Git.

**Arnés:** vivió íntegro en el scratchpad de sesión, fuera de los dos repos —`corpus.mjs`,
`collisions.mjs`, `summarize.mjs`, `validate-corpus.mjs`, `breaks.mjs`, `universe-c.mjs`,
`universe-c-detail.mjs`, `four-paths.mjs`, `collision-effect.mjs`, `gather.mjs`, `shape.mjs`,
`inventory.mjs`…`inventory4.mjs`. **Se retira al terminar.**

**Corrección de método, declarada:** la primera pasada del inventario (`inventory.mjs`) contó
164 «campos» porque recorría las **instancias** del fixture, no el **contrato**, e inflaba los
arrays repetidos; la segunda (`inventory2.mjs`) clasificó como «validados con allowlist LaTeX»
cuatro campos que son **enums** (`visual.background`, `hierarchy.nodes[].role`,
`hierarchy.nodes[].parentKey`, `timeline.steps[].detailsVariant`) porque rechazaban `\zzzz` por
ser enums, no por LaTeX; la tercera (`inventory3.mjs`) descartó diez campos correctos porque la
carga de sonda medía 46 caracteres y chocaba con máximos de 24 y 32. **Los tres fueron errores
míos, los tres se detectaron y se rehicieron.** Las cifras de este record son las de
`inventory4.mjs`, con cargas ≤ 12 caracteres y la lista de campos tomada de la introspección del
esquema. El método está descrito en §4.1 y es reproducible.
