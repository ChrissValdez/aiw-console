# RETIRO DE LA PREVISUALIZACIÓN DEL PÁRRAFO (cantu-studio)

**Fecha:** 2026-08-05
**Run retirado:** `RUN-CANTU-INLINE-FORMULA-PREVIEW-001` — **derivado por `queue_order 28`, no tecleado** (§1).
**Repo escrito:** `projects/cantu-studio` — **desmontaje de código** (§3) **y el canónico** (§6).
**Repo escrito:** `projects/aiw-console` — **este record.**
**Veredicto:** **RETIRADO. Ninguna compuerta de parada se disparó.** El run **no se retira por
defectuoso**: se construyó entero y **pasó la QA del operador**. Se retira porque **la superficie
no compensa su coste**, medido en pantalla por el operador (§2).

**ESTE RECORD NO REESCRIBE HACIA ATRÁS** `PREVISUALIZACION-PARRAFO-CON-FORMULAS-CANTU.md`. Aquel
es **una medición fechada y su trabajo existió**; se verificó contra disco (§3.1) y se confirmó
casi entero. Este record dice qué pasó **después**.

---

## 1. EL RUN, DERIVADO DEL CANÓNICO

Recorrido de `projects/cantu-studio/.aiw/roadmap/roadmap.json`
(`schema_version = jame.roadmap_v3.v0.2-progress`) buscando `queue_order === 28`.
**Una sola coincidencia sobre 71 runs.**

| Campo | Valor derivado |
|---|---|
| `run_id` | **`RUN-CANTU-INLINE-FORMULA-PREVIEW-001`** |
| ubicación | objetivo `O5`, fase `O5.P3`, índice 1 |
| `status` de partida | `active` — **el único `active` del canónico** |

**Título en disco, VERBATIM:**

```
Show the author a rendered preview of a prose paragraph that contains formulas
```

**Comparación estricta contra el título del encargo: `true`, 78 caracteres contra 78.**
Casa carácter a carácter. **No hay parada por este motivo.**

---

## 2. LA DECISIÓN Y SU RAZÓN

**El run se construyó entero y pasó la QA del operador. No se retira por defectuoso.**

**Lo que el operador midió en pantalla, y que es la razón del retiro:**

1. **Con texto largo la previsualización estorba.** La caja empuja el campo y sus controles
   hacia abajo en el formulario.
2. **Duplica el texto cuando no hay fórmula.** Un párrafo de prosa sin una sola fórmula se
   enseña dos veces: en el campo y debajo.
3. **El visualizador del HTML ya cubre la necesidad.** Lo que el autor de verdad necesita
   comprobar —el resultado compuesto— ya se ve ahí, renderizado con el motor real.

**Y una razón que añade la cabina, no el operador:** cuando el autor usa el insertor, **ya ve
la fórmula compuesta dentro del editor visual** antes de que se escriba en el campo. La
previsualización **solo aportaba para fórmulas tecleadas a mano**.

**MANTENER ESA SUPERFICIE NO COMPENSA SU COSTE.**

---

## 3. BLOQUE A — EL CÓDIGO

### 3.1 LA MEDICIÓN DEL CRITERIO 1 — ARCHIVO Y LÍNEA, VERIFICADA CONTRA DISCO

El record de la construcción declara **siete archivos**. **Se verificaron uno a uno antes de
tocar nada** y las cifras casaron **exactamente**:

| Archivo | Qué fue | Líneas medidas hoy | ¿Casa con el record? |
|---|---|---|---|
| `math-authoring/inlineFormula/inlineFormulaSegments.js` | **NUEVO** — el partidor | **131** | **SÍ** (131) |
| `math-authoring/inlineFormula/InlineFormulaParagraphPreview.jsx` | **NUEVO** — la superficie | **186** | **SÍ** (186) |
| `math-authoring/inlineFormula/InlineFormulaField.jsx` | **MODIFICADO** — el envoltorio | **268** | **SÍ** (268) |
| `math-authoring/inlineFormula/index.js` | **MODIFICADO** — barril | **25** | **SÍ** (16 → 25) |
| `math-authoring/index.js` | **MODIFICADO** — barril | **124** | **SÍ** (aditivo) |
| `compiler-api/tests/webInlineFormulaParagraphPreview.test.mjs` | **NUEVO** — test | **446**, 16 declaraciones | **SÍ** |
| `docs/_historical_run_record/…-PREVIEW-001-OPERATOR-QA-PACKET.md` | **NUEVO** — packet | 8 782 bytes | **SÍ** |

**QUÉ DE LO MODIFICADO ES DEL INSERTOR Y SE QUEDA** — el insertor **sigue vivo y en
producción**, comparte archivos con la previsualización y **no se toca**:

| Pieza | Archivo · línea | Dueño | Destino |
|---|---|---|---|
| `inlineFormulaSplice.js` entero | `inlineFormula/inlineFormulaSplice.js` (**309 líneas**) | **insertor** (run 27) | **INTACTO** |
| El bloque de doc del montaje | `InlineFormulaField.jsx:11-45` | **insertor** | **INTACTO** |
| `writeUncontrolledValue` | `InlineFormulaField.jsx:72-85` | **insertor** | **INTACTO** |
| `capture` y la delegación de eventos | `InlineFormulaField.jsx:112-122` | **insertor** | **INTACTO** salvo una línea |
| Los seis manejadores del contenedor, **`onInput` incluido** | `InlineFormulaField.jsx:221-226` | **insertor** | **INTACTOS** |
| `handleOpen` / `handleCancel` / `handleConfirm` | `InlineFormulaField.jsx:155-215` | **insertor** | **INTACTOS** |
| El botón, el aviso del cuarto caso y `SmartFormulaModal` | `InlineFormulaField.jsx:234-262` | **insertor** | **INTACTOS** |
| El bloque de export del empalme | `inlineFormula/index.js:1-14`, `math-authoring/index.js:98-114` | **insertor** | **INTACTOS** |

**`onInput` SE QUEDA, y la razón está medida, no supuesta:** aparece nombrado en el bloque de
documentación **del propio run del insertor** (`:31`), escrito por el run 27 y que el run 28 no
reescribió —el 28 añadió su párrafo **detrás**, en las líneas 46-58—. Además
`writeUncontrolledValue` **emite ese mismo evento**, así que el insertor lo necesita para
refrescar el cursor tras insertar. **Quitarlo habría sido tocar el insertor.**

### 3.2 EL CRITERIO 2 — QUÉ MÁS CONSUME LO QUE SE IBA A BORRAR

**Barrido de importadores sobre todo `tools/` y `src/`** (excluyendo `node_modules` y `dist`),
buscando los dos módulos y **sus cuatro exportaciones**
(`splitInlineFormulaSegments`, `hasRenderableInlineFormula`, `INLINE_FORMULA_SEGMENT_KINDS`,
`INLINE_FORMULA_SEGMENT_REASONS`).

**Consumidores encontrados — TODOS de la previsualización:**

| Consumidor | Qué usa | ¿Fuera de la previsualización? |
|---|---|---|
| `webInlineFormulaParagraphPreview.test.mjs` | las cuatro exportaciones + los dos archivos | **NO** — es el test del propio run |
| `math-authoring/index.js:116-124` | las cuatro exportaciones | **NO** — bloque añadido por el run 28 |
| `math-authoring/inlineFormula/index.js:16-22, :25` | las cuatro + la superficie | **NO** — bloque añadido por el run 28 |
| `InlineFormulaField.jsx:5, :232` | la superficie | **NO** — el montaje del run 28 |
| `InlineFormulaParagraphPreview.jsx` | el partidor | **NO** — uso interno |

**NADA FUERA DE LA PREVISUALIZACIÓN LOS CONSUME. No se disparó la parada del criterio 2.**

### 3.3 EL DESMONTAJE

**Borrados enteros — existían solo para la previsualización:**

- `math-authoring/inlineFormula/inlineFormulaSegments.js` (131 líneas)
- `math-authoring/inlineFormula/InlineFormulaParagraphPreview.jsx` (186 líneas)

**Retirada de la superficie del campo** (`InlineFormulaField.jsx`), en cinco cortes:
el `import` de la superficie (`:5`), el bloque de doc del run 28 (`:46-58`), el estado
`previewText` (`:104-106`), la línea `setPreviewText(element.value)` dentro de `capture`
(`:121`), el efecto de sincronía con el DOM (`:124-137`) y el montaje en el JSX (`:230-232`).
Con el efecto se fue el `useEffect` del `import` de React, que **ya no lo usaba nadie más** en
el archivo.

**Barriles y puntos de exportación restaurados** al estado previo al run: se retiró el bloque
del partidor y la línea de la superficie de `inlineFormula/index.js`, y el bloque del partidor
de `math-authoring/index.js`.

**LA PRUEBA DE QUE VOLVIÓ AL ESTADO ANTERIOR ES ARITMÉTICA, no una afirmación:**

| Archivo | Antes del run 28 (según el record previo) | Con la previsualización | **Hoy, tras desmontar** |
|---|---|---|---|
| `InlineFormulaField.jsx` | **230** | 268 | **230** ✅ |
| `inlineFormula/index.js` | **16** | 25 | **16** ✅ |
| `math-authoring/index.js` | (aditivo) | 124 | **114** ✅ |

La cifra de **230** es notable: el record de la construcción la citaba de un record anterior y
**declaró expresamente que no la había reverificado**. El desmontaje **cae exactamente en 230
por sustracción**, así que **hoy queda verificada de forma independiente**.

**El campo de prosa queda como estaba:** control de texto plano (`<textarea>` nativo o
`TextAreaField`, según el sitio) con el control de insertar fórmula al lado.

**Barrido de residuo tras el borrado:** cero referencias supervivientes a los dos módulos, a sus
exportaciones, a `previewText` o a `INLINE-FORMULA-PREVIEW-001` en código fuente. *(Los tres
únicos aciertos de `previewText` son `previewTextColor` en `ComponentGuide.jsx:2247,2266,2271`,
una variable de color de otra superficie que **no es de este run**.)*

### 3.4 EL CRITERIO 4 — EL INSERTOR SIGUE INTACTO, VERIFICADO

**Se midió ANTES de tocar nada y DESPUÉS, para que la comparación sea empírica y no un
razonamiento.**

```bash
node --test \
  tools/author-lite/compiler-api/tests/webInlineFormulaProseBehaviourLock.test.mjs \
  tools/author-lite/compiler-api/tests/webInlineFormulaInserterMount.test.mjs \
  tools/author-lite/compiler-api/tests/webInlineFormulaSelectionRules.test.mjs
```

**ANTES del desmontaje** (con el test de la previsualización incluido en la tanda): **55 de 55
en verde** — 13 del bloqueo + 16 del montaje + 10 de las reglas de selección + 16 de la
previsualización.

**DESPUÉS del desmontaje:**

```
ℹ tests 39
ℹ suites 0
ℹ pass 39
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 342.4192
```

**39 = 13 del bloqueo + 26 del insertor. Los trece del bloqueo y los veintiséis del insertor
SIGUEN VERDES. Ninguno se puso rojo. No hay nada que reportar por el criterio 4.**

**Por qué no se pusieron rojos, además de la ejecución:** los tests del insertor **leen el
archivo del envoltorio** y afirman sobre `onSelect={capture}`, `onKeyUp={capture}`,
`element.selectionStart`, el `SmartFormulaModal`, y que las importaciones no relativas sean
**exactamente `['react', 'lucide-react']`**. **Ninguna de esas afirmaciones toca la
previsualización**, y la de las importaciones sigue casando porque lo retirado era relativo.

### 3.5 EL CRITERIO 5 — LOS TESTS ELIMINADOS, CON SU RAZÓN

**Se eliminó UN archivo, con sus 16 declaraciones:**

`tools/author-lite/compiler-api/tests/webInlineFormulaParagraphPreview.test.mjs` (446 líneas)

**La razón, declarada:** las 16 afirman **conducta de la previsualización** —cómo se parte el
párrafo, qué se compone, qué cae a crudo, dónde se monta la superficie, que el motor no se carga
sin fórmula—. **Todas ellas importan o leen los dos archivos borrados**, así que sin ellos no
son tests que fallen: son tests que **no pueden ni cargarse**.

**NO SE ELIMINÓ NINGUNO QUE AFIRME CONDUCTA DEL INSERTOR O DEL DATO.** Dos de las 16 rozaban esa
frontera y **se comprobó que su contenido ya está cubierto fuera**:

| Test eliminado | Qué afirmaba | Por qué su pérdida no descubre nada |
|---|---|---|
| `previewing never writes: the field stays plain text and stores exactly what it stored` | que previsualizar no escribe | **La previsualización ya no existe.** Que el insertor sea la única escritura de vuelta lo siguen fijando los 26 del insertor y los 13 del bloqueo |
| `the shared text area control was not touched to make the preview possible` | que `TextAreaField.jsx` no se tocó | **Lo sigue fijando el test del insertor** `the shared text area control was not rewritten to make the cursor capture possible` (`webInlineFormulaInserterMount.test.mjs:516`), que ya afirmaba lo mismo |

**Lo tocado y lo directamente relacionado — NO la suite completa.** Los **16** archivos que el
run construyó como conjunto relacionado, menos el borrado:

```bash
node --test \
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
ℹ tests 213
ℹ suites 0
ℹ pass 213
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 794.43
```

**213 de 213 en verde. La aritmética cierra sola: el run dejó 229 en 17 archivos; 229 − 16 = 213
en 16 archivos.** Nada verde se puso rojo y **no se perdió ni un test que no fuera de la
previsualización**.

**NO se corrió la suite completa**, que el encargo excluye.

### 3.6 EL CRITERIO 6 — LINT, BUILD Y PAQUETE

**`eslint .` sobre `editor-ui`: LIMPIO**, sin errores ni avisos.

**`vite build`: correcto**, con el aviso preexistente de tamaño de chunk, que no es de este
trabajo.

**EL TAMAÑO DEL PAQUETE, ANTES Y DESPUÉS, medido con `vite build` real:**

| Recurso | **Antes** (con previsualización) | **Después** (sin ella) | Diferencia |
|---|---|---|---|
| `dist/assets/index-*.js` | **765,15 kB** (gzip 210,74) | **762,12 kB** (gzip 209,95) | **−3,03 kB** (gzip **−0,79**) |
| `dist/assets/index-*.css` | **75,49 kB** (gzip 13,46) | **75,46 kB** (gzip 13,45) | **−0,03 kB** |
| `dist/assets/mathlive.min-_xLHa7o0.js` | 808,02 kB | 808,02 kB | **0 — mismo hash** |

**CONFIRMADO: el paquete vuelve EXACTAMENTE a lo que era antes de este run.** El record de la
construcción midió el estado previo en **762,12 kB / gzip 209,95** para `index.js` y **75,46 kB**
para `index.css`. **Las tres cifras casan al dígito.** El chunk de MathLive conserva **el mismo
hash `_xLHa7o0`**: byte a byte el mismo archivo, porque el motor nunca fue de este run.

### 3.7 EL CRITERIO 7 — LA EVIDENCIA QUE NO SE BORRA

**El packet de QA de este run NO se borró y no se movió.** Sigue donde estaba:

```
projects/cantu-studio/docs/_historical_run_record/RUN-CANTU-INLINE-FORMULA-PREVIEW-001-OPERATOR-QA-PACKET.md
```

**8 782 bytes**, verificado en disco después del desmontaje. **Es evidencia de lo que se
construyó y la política de retención lo protege.**

**`.aiw/docs/docs_index.json` NO se tocó**: `md5 = bc708a5847f66291ea1cd719eb6a0ecb`, y
`Docs indexed: 149` no se movió ni antes ni después.

---

## 4. EL PRECEDENTE DE RETIRO — DERIVADO DEL DATO EN DISCO

**El encargo advierte que el log narra el precedente con un texto y el canónico lo guarda con
otro, y manda derivar la forma DEL DATO. Así se hizo: no se leyó la prosa de ningún log.**

Barrido de los 71 runs del canónico buscando **`closeout_result`**. **Nueve runs lo llevan**, y
**uno solo** es un retiro:

| `queue_order` | `run_id` | `closeout_result` literal |
|---|---|---|
| 1 | `RUN-JAME-SMART-FORMULA-FIELD-RULE-ONLY-BASELINE-001` | `completed_successfully` |
| 22 | `RUN-JAME-WEB-CARD-REVALIDATION-001` | `completed` |
| 23, 24, 25, 26, 27 | *(cinco runs)* | `done as specified` |
| 48 | `RUN-JAME-MATHLIVE-INTEGRATION-READINESS-001` | *(frase larga en prosa)* |
| **34** | **`RUN-CANTU-COMPILER-VARIANT-GATES-001`** | **`discarded_by_RETIRO-RUN-COMPUERTAS-VARIANTE-CANTU`** |

**EL VALOR ENCONTRADO, VERBATIM:**

```
discarded_by_RETIRO-RUN-COMPUERTAS-VARIANTE-CANTU
```

**El molde: `discarded_by_` + el nombre del record del retiro, sin la extensión `.md`.** Ese run
está en `status = completed` con su `queue_order` intacto, que es exactamente la forma que este
encargo manda repetir.

**EL VALOR APLICADO AQUÍ:**

```
discarded_by_RETIRO-PREVISUALIZACION-PARRAFO-CANTU
```

**El vocabulario de `status` es cerrado y no se inventó ningún token.** Se verificó en el propio
motor: `STATUSES = ["planned", "active", "completed", "blocked"]` (`roadmap-core.mjs:175`).
**No existe token de descarte, y no se creó ninguno.**

**También se copió del dato la forma de la nota**, no de la prosa: el precedente separa su nota
del `full_description` original con **`\n\n` (solo LF, sin CR)** y su bloque abre con
`WITHDRAWN <fecha> by the operator`. **Esta nota usa el mismo separador y la misma apertura**,
verificado leyendo los códigos de carácter del precedente antes de escribir.

---

## 5. BLOQUE B — EL RESPALDO Y LAS PRECONDICIONES

### 5.1 EL RESPALDO (criterio 9)

Copia **byte a byte** al scratchpad de sesión, **fuera de los dos repos**:

```
C:\Users\chris\AppData\Local\Temp\claude\…\scratchpad\roadmap.BACKUP.json
```

| | |
|---|---|
| **md5 del canónico y del respaldo** | **`a929bdfee9fa48086bff2efa2482e5f3`** — idénticos |
| **tamaño** | **134 840 bytes**, los dos |
| **`cmp`** | **idénticos byte a byte** |

**`git checkout` NO se usó para nada**, porque reescribe finales de línea. El motor detectó que
el archivo usa **CRLF (`\r\n`)** y serializó **con los finales del propio archivo**.

### 5.2 LAS PRECONDICIONES, CON GUARDA QUE ABORTA (criterio 10)

| Precondición | Medido | Resultado |
|---|---|---|
| `queue_order` denso `1..N` | mín 1, máx 71, `every(v,i) => v === i+1` | **OK** |
| `N = 71` | recuento sobre el árbol | **OK — 71** |
| `queue_order` único | `Set(71) === 71` | **OK** |
| `run_id` único | `Set(71) === 71` | **OK** |
| **exactamente un run `active`** | recuento por `status` | **OK — 1** |
| **y es el de `queue_order 28`** | `RUN-CANTU-INLINE-FORMULA-PREVIEW-001` | **OK** |

Recuento por status de partida: **`completed=29`, `planned=41`, `active=1`**. 29+41+1 = 71.

**Además, el propio motor corre un pre-flight que rehúsa editar un archivo ya roto**
(`planEdit` → `checkInvariants` antes de mutar). **Pasó.**

---

## 6. LA ESCRITURA — CONDUCIDA POR EL MOTOR DE `aiw-console`

**El CLI local de `cantu-studio` rehúsa el pre-flight**, así que se condujo el motor de
`projects/aiw-console/tools/roadmap/` — `roadmap-plan.mjs` sobre `roadmap-core.mjs`—, que es la
misma secuencia que ejecuta el endpoint de escritura de la consola global:

```
loadRaw → parseRoadmap → checkInvariants (pre-flight)
→ queueOrderMap + collectIds → mutación → checkInvariants (post) + checkIdentityPreserved
→ buildRemap → serialize (con los finales del propio archivo) → applyWrite (atómico)
```

**Una sola operación `batch` con dos sub-operaciones**, para que ambas lleguen a disco en una
escritura o en ninguna:

1. `set-status` → `status = completed`, `closeoutResult = discarded_by_RETIRO-PREVISUALIZACION-PARRAFO-CANTU`
2. `set-text` → `full_description` = el original **+ `\n\n` + la nota de retiro**

**Se hizo primero un DRY RUN completo**, que no escribe nada, y **solo después el apply**. La
escritura llevó **el validador como guarda**: `applyWrite` restaura desde su propio respaldo si
el validador no devuelve 0. **Devolvió 0 y no hubo rollback.**

**NO se cambiaron** `run_id`, `title`, `queue_order`, `objective` ni `phase`. Verificado: la
ubicación del run sigue siendo `{"obj":"O5","phase":"O5.P3","idx":1}` **antes y después**.

### 6.1 LA NOTA DE RETIRO — TEXTO TAL COMO QUEDÓ EN DISCO

> WITHDRAWN 2026-08-05 by the operator, and withdrawn is not deleted: this run keeps its run_id, its title and its queue_order, nothing moves behind it, and it closes as completed with a closeout_result that says how it closed. The run status vocabulary is closed and carries no discard token; none is invented here, following the precedent already on record for the withdrawal of a prototype run. THIS RUN WAS NOT WITHDRAWN AS DEFECTIVE. It was built in full and it PASSED THE OPERATOR'S QA: the paragraph split as specified, prose rendered as prose, formulas were typeset by the engine the editor already carries, no new dependency was bought, and a half-written formula never blanked the preview. WHY IT WAS WITHDRAWN ANYWAY: the operator measured on screen that the surface does not pay for itself. With a long paragraph the preview GETS IN THE WAY, pushing the field and its controls down the form; with a paragraph that carries no formula it merely DUPLICATES THE TEXT the author is already looking at; and the rendered result the author actually needs to check is ALREADY COVERED BY THE HTML VIEWER, which renders the compiled lesson with the real engine. One further reason the workshop adds: when the author uses the inserter, the composed formula is ALREADY VISIBLE inside the visual editor before it is written into the field, so the preview only ever added anything for formulas typed by hand. KEEPING THIS SURFACE DOES NOT PAY FOR ITS COST. WHERE THE SCOPE WENT: NOWHERE. It did not travel to any other run and no successor was created to carry it, because this capability is DECLINED, NOT TRANSFERRED. The code was dismantled in the same workshop: the two preview-only modules and the preview-only test file were deleted, the barrels and export points were restored to their pre-run state, and the prose field is again a plain-text control with the insert-formula control beside it. The formula inserter of the preceding run is untouched and stays in production; its tests and the thirteen of the behaviour-lock run stay green. The operator QA packet of this run is NOT deleted: it is evidence of what was built and the retention policy protects it. NOTHING ELSE MOVED: no run_id, title, queue_order, objective or phase changed here, no run was inserted, removed or renumbered, and no other run's status changed.

**El run tras la escritura:**

| Campo | Valor |
|---|---|
| `run_id` | `RUN-CANTU-INLINE-FORMULA-PREVIEW-001` — **sin cambio** |
| `queue_order` | **28** — sin cambio |
| `title` | *(el mismo, verbatim)* — sin cambio |
| `status` | **`completed`** |
| `closeout_result` | **`discarded_by_RETIRO-PREVISUALIZACION-PARRAFO-CANTU`** |
| orden de claves | `run_id,queue_order,title,summary,full_description,status,depends_on,closeout_result` |

**El orden de claves casa exactamente con el del precedente (`queue_order 34`)**, porque lo
impone el propio motor con `normalizeRunKeyOrder`.

---

## 7. LA VERIFICACIÓN DEL CRITERIO 13 — NADIE MÁS SE MOVIÓ

Comparación **del árbol entero** contra el respaldo, campo a campo sobre los 71 runs:

| # | Comprobación | Resultado |
|---|---|---|
| 1 | total de runs = **71** | **OK** |
| 2 | `queue_order` **1..71** denso | **OK** |
| 3 | `queue_order` **idéntico al respaldo**, run por run | **OK — nadie se desplazó** |
| 4 | `run_id` únicos | **OK** |
| 5 | `depends_on` colgantes | **OK — exactamente 1**, el externo legal |
| 6 | fases vacías | **OK — 0** |
| 7 | runs `active` | **OK — cero** |
| 8 | **campos cambiados en TODO el árbol** | **OK — exactamente 3** |
| 9 | raíz (`schema_version`, `roadmap_id`, `title`, `lanes`, `care_budget`) | **OK — idéntica** |

**Los únicos tres campos cambiados en todo el árbol:**

```
RUN-CANTU-INLINE-FORMULA-PREVIEW-001 :: status
RUN-CANTU-INLINE-FORMULA-PREVIEW-001 :: closeout_result
RUN-CANTU-INLINE-FORMULA-PREVIEW-001 :: full_description
```

**Ni uno más, y los tres del `queue_order 28`.** El `remap` que devuelve el motor —los runs cuyo
`queue_order` cambia— salió **vacío: `[]`**. El árbol de objetivos y fases es **idéntico**
(7 objetivos / 28 fases, con el mismo recuento de runs por fase).

**El único colgante, que es el conocido y legal:**

```
RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 -> RUN-CANTU-ROADMAP-CONTENT-AUDIT-001
```

**No hizo falta restaurar desde el respaldo.**

---

## 8. EL CRITERIO 14 — ¿ALGUIEN DEPENDÍA DE ÉL?

Recorrido de las `depends_on` **de los 71 runs**: **141 aristas revisadas**.

**NADIE nombra a `RUN-CANTU-INLINE-FORMULA-PREVIEW-001`. Cero runs.**

**No hay ninguna dependencia que declarar como vaciada de contenido**, y por tanto tampoco hay
nada que advertir al operador por este motivo. *(Sí existía la arista contraria: este run
dependía del 27, el del insertor, que sigue `completed`.)*

---

## 9. EL VALIDADOR — SALIDA COMPLETA, ANTES Y DESPUÉS

Ejecutado por **la vía que no escribe**, desde `projects/cantu-studio`:

```bash
node tools/project-console/validate-project-console-state.mjs
```

### ANTES

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

### DESPUÉS

```
Project Console state validation passed.
Roadmap v3 prototype: 7 objectives / 28 phases / 71 runs; queue groups needs_human_decision=0 now=0 ready_next=16 later=25 history=30
Docs indexed: 149
Docs curated primary-visible: 60 of 149 registered
Component statuses: 16
Git provenance episodes: 9
Git history snapshot: 508 commits / 1 branches (1 visible, 0 backup hidden); current=main; run-associated=3; source=local_git_autosync
Roadmap rebase warnings (non-blocking):
- .aiw/roadmap/roadmap.json run RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 depends on RUN-CANTU-ROADMAP-CONTENT-AUDIT-001, which does not resolve in this roadmap. With a single roadmap loaded this cannot be decided: it may be a legal external dependency — a run that lives in another project (CONTRATO §10.d Regla 2) — or a typo in the run id. Both are possible and one loaded roadmap cannot tell them apart; resolve it against the full set of projects to distinguish external from write error.
```

### EL MOVIMIENTO, DECLARADO

| Cifra | Antes | Después | Movimiento |
|---|---|---|---|
| **total de runs** | **71** | **71** | **0 — nadie entró ni salió** |
| **`history`** | **29** | **30** | **+1** ✅ |
| **`now`** | **1** | **0** | **−1** |
| **`ready_next`** | **16** | **16** | **0** |
| `later` | 25 | 25 | 0 |
| `needs_human_decision` | 0 | 0 | 0 |
| objetivos / fases | 7 / 28 | 7 / 28 | 0 |

**`history` sube en uno al pasar el run a `completed`. CONFIRMADO CON EL DATO: 29 → 30.**
La suma cierra: **30 + 0 + 16 + 25 = 71.**

**Y una señal que no estaba en el ticket pero que confirma el cierre:** la línea
`Roadmap v3 active run derived stages: …` **desaparece de la salida**, porque ya no hay ningún
run `active` del que derivar etapas. **`now` pasa de 1 a 0 por el mismo motivo.**

**El aviso no bloqueante de la dependencia externa aparece antes y después, es el conocido y
legal, no es hallazgo y NO se reparó.**

---

## 10. LAS CIFRAS DEL TICKET — VERIFICADAS UNA A UNA

**El ticket avisa de que pueden estar mal. Se midieron todas. Las tres eran correctas.**

| Cifra del ticket | Cómo se verificó | Resultado |
|---|---|---|
| **71 runs** | recuento sobre el árbol **y** salida del validador | **CONFIRMADA — 71** |
| **`history=29` de partida** | salida del validador antes de escribir | **CONFIRMADA — 29** |
| **un run `active` de partida** | recuento por status; es el `queue_order 28` | **CONFIRMADA — 1** |
| `queue_order` 28 = el run del título dado | derivación + comparación estricta de 78 caracteres | **CONFIRMADA** |
| existe precedente de retiro | barrido de `closeout_result` sobre los 71 | **CONFIRMADA — uno, el `queue_order 34`** |
| `N = 71` denso y contiguo | `1..71`, sin hueco ni repetido | **CONFIRMADA** |

**Recuento propio, independiente del validador:** `completed` **29 → 30**, `planned` 41,
`active` **1 → 0**. Casa con `history` en las dos mediciones.

---

## 11. QUÉ **NO** SE HIZO

**Por prohibición explícita del encargo:**

- **No se tocó el insertor de fórmulas ni sus reglas de selección.** `inlineFormulaSplice.js`
  sigue en sus 309 líneas y sus 26 tests siguen verdes.
- **No se tocó el control compartido de área de texto**, ni el compilador, ni los renderers, ni
  los esquemas, ni el formato del dato guardado.
- **No se borró el packet de QA de este run** ni ninguna otra evidencia histórica (§3.7).
- **No se tocó** `.aiw/docs/docs_index.json` —md5 verificado—, `component_status.json`, la
  Definition of Done ni los contratos.
- **No se insertó, movió ni renumeró ningún run. No se cambió el status de ningún otro run.**
- **No se clasificó ningún run.**
- **No se re-emitió `.project/`. No se ejecutó Git. No se levantó ningún servidor. No se corrió
  la suite completa.**
- **No se tocó `WebBlockEditor.jsx`** — nunca hizo falta, porque la previsualización se montaba
  en el envoltorio y no en los siete sitios. **Esa decisión de forma del run construido es
  justamente lo que hizo barato retirarlo.**

**No se reparó ninguna deriva conocida:** ni el mojibake de los dos esquemas, ni los punteros
muertos, ni el CLI local de roadmap, ni los HTML huérfanos, ni el anidamiento de fórmulas del
insertor, ni los defectos sin dueño de los componentes ya revalidados, ni el aviso de dependencia
externa del validador, ni la discrepancia de `Component statuses: 16` contra los 17 ids del
catálogo. **La carcasa huérfana `FormulaInserterShell.jsx` sigue con 0 importadores y no se
tocó.**

**Por límite de la medición, declarado:**

- **No se ejecutó la interfaz.** Todo el bloque A es lectura de código, ejecución en Node, lint y
  build. **No se abrió el editor en un navegador**, así que **no afirmo nada sobre lo que se ve
  en pantalla** tras el desmontaje. Lo que sí está medido es que el campo vuelve a ser el control
  de texto plano con su botón al lado, por recuento de líneas y por los tests del insertor.
- **La razón del retiro es una medición del operador, no mía** (§2). Que la previsualización
  estorbe con texto largo y duplique el texto sin fórmula **está medido en pantalla por el
  operador**; no se remidió aquí.
- **No se afirma «suite completa en verde».** Lo ejecutado y verde son **213 tests en 16
  archivos**, más los **39** de la tanda del insertor y el bloqueo.

**Por decisión de alcance:**

- **El alcance de este run NO viajó a ningún otro run.** No se creó sucesor, no se amplió el
  `full_description` de ningún otro run y no se movió nada de sitio. **La capacidad se declina,
  no se traslada**, y así queda dicho en la nota de retiro.

---

## 12. ESTADO FINAL

**El run `RUN-CANTU-INLINE-FORMULA-PREVIEW-001` queda `completed` con
`closeout_result = discarded_by_RETIRO-PREVISUALIZACION-PARRAFO-CANTU`, en su `queue_order 28`,
en `O5.P3`, con su `run_id`, su `title`, su `objective` y su `phase` intactos.**

**Retirar no fue borrar:** el run sigue en el canónico, su nota dice cómo cerró y por qué, y el
packet de QA sigue en su sitio como evidencia de que el trabajo se hizo y se aprobó.

**El código quedó como estaba antes del run 28**, verificado por recuento de líneas (230 / 16 /
114), por tamaño de paquete (762,12 kB / 75,46 kB, las dos cifras al dígito) y por tests
(39 + 213 en verde, cero rojos).

**El insertor de fórmulas sigue vivo y en producción.**
