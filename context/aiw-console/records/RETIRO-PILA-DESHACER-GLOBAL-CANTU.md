# RETIRO DE LA PILA DE DESHACER GLOBAL (cantu-studio)

**Fecha:** 2026-08-05
**Run retirado:** `RUN-CANTU-EDITOR-UNDO-REDO-001` — **derivado por `queue_order 29`, no tecleado** (§1).
**Repo escrito:** `projects/cantu-studio` — **desmontaje de código** (§3) **y el canónico** (§6).
**Repo escrito:** `projects/aiw-console` — **este record.**
**Veredicto:** **RETIRADO. Ninguna compuerta de parada se disparó.** El run se construyó
entero y **la QA del operador lo devolvió con CHANGES_REQUIRED**. Se retira porque **el
primero de sus tres fallos no es un defecto de implementación: es la forma** (§2).

**ESTE RECORD NO REESCRIBE HACIA ATRÁS** `DESHACER-Y-REHACER-GLOBAL-CANTU.md`. Aquella es
**una medición fechada y su trabajo existió**; se verificó contra disco (§3.1) y se confirmó
casi entera —con **dos cifras suyas que hoy no se reproducen y se declaran** (§3.3)—. Este
record dice qué pasó **después**.

---

## 1. EL RUN, DERIVADO DEL CANÓNICO

Recorrido de `projects/cantu-studio/.aiw/roadmap/roadmap.json`
(`schema_version = jame.roadmap_v3.v0.2-progress`) buscando `queue_order === 29`.
**Una sola coincidencia sobre 71 runs.**

| Campo | Valor derivado |
|---|---|
| `run_id` | **`RUN-CANTU-EDITOR-UNDO-REDO-001`** |
| ubicación | objetivo `O4`, fase `O4.P5`, índice 0 |
| `status` de partida | `active` — **el único `active` del canónico** |
| `depends_on` | `[]` |

**Título en disco, VERBATIM:**

```
Give the author undo and redo across the whole editor
```

**Comparación estricta contra el título del encargo: `true`, 53 caracteres contra 53**, y
**códigos de carácter idénticos uno a uno**. Casa carácter a carácter. **No hay parada por
este motivo.**

---

## 2. LA DECISIÓN Y SU RAZÓN

**El run se construyó entero. La QA del operador lo devolvió con `CHANGES_REQUIRED`, con
tres fallos:**

1. **Deshacer revierte todo de una vez**, incluidos cambios hechos en componentes distintos.
2. **Rehacer no funciona.**
3. **El control de deshacer sigue habilitado** cuando ya no queda nada que deshacer.

**EL PRIMERO NO ES UN DEFECTO DE IMPLEMENTACIÓN: ES LA FORMA.** Y la propia medición del
run construido lo dice sin saberlo: **hay UN SOLO `useForm` en todo el editor**
(`EditorPage.jsx:253`, §3.4 del record de la construcción), así que el borrador vive
**por documento entero** y cada entrada de la pila es **un estado del documento completo**.
Una pila de estados de documento solo puede restaurar estados de documento: **no puede
distinguir el cambio de un bloque del de otro**, porque en el punto donde registra esa
distinción no existe. Repararlo no es un arreglo dentro de este run: es **rediseñar a
transacciones por campo** —registrar QUÉ campo cambió y revertir solo eso—, **un sistema
mucho mayor del que este run encuadraba**.

El segundo y el tercero **sí son defectos ordinarios** y serían baratos por separado, pero
**no compensa arrastrarlos sobre una forma que hay que sustituir**.

**LA DECISIÓN DEL OPERADOR:** retirar la pila y abrir **dos runs nuevos** —uno con el
arreglo mínimo del insertor, y otro, más adelante, para el sistema de historial hecho como
debe—. **Esos dos runs los inserta OTRO encargo; este no los crea** (§11).

---

## 3. BLOQUE A — EL CÓDIGO

### 3.1 LA MEDICIÓN DEL CRITERIO 1 — ARCHIVO Y LÍNEA, VERIFICADA CONTRA DISCO

**Se midió ANTES de tocar nada.** El record de la construcción declara seis archivos; los
cinco de código se verificaron uno a uno.

| Archivo | Qué fue | Medido hoy, antes de tocar | ¿Casa con el record? |
|---|---|---|---|
| `features/editor/utils/draftHistory.js` | **NUEVO** — el módulo puro | **205 líneas**, 7 813 bytes, LF | **SÍ** (205) |
| `features/editor/hooks/useDraftHistory.js` | **NUEVO** — el cableado | **175 líneas**, 6 789 bytes, LF | **SÍ** (175) |
| `features/editor/EditorPage.jsx` | **MODIFICADO** | **1082 líneas**, CRLF | **SÍ** (1082) |
| `features/editor/components/layout/TopBar.jsx` | **MODIFICADO** | **474 líneas**, CRLF | **SÍ** (474) |
| `compiler-api/tests/webEditorUndoRedoGlobal.test.mjs` | **NUEVO** — 490 líneas, 15 tests | **490 líneas**, 20 435 bytes | **SÍ** |

**UNA CORRECCIÓN DE RUTA, dicha en voz alta:** el record de la construcción escribe
`components/layout/TopBar.jsx`. **La ruta real es
`features/editor/components/layout/TopBar.jsx`.** Es una abreviatura del record, no un
archivo distinto: se localizó por barrido y es el único `TopBar` del repo.

**Y UNA CONFIRMACIÓN INDEPENDIENTE:** los md5 de los tres archivos de producción medidos hoy
—`f015d5ae…` (`draftHistory.js`), `d67b66ff…` (`useDraftHistory.js`), `ce887e36…`
(`EditorPage.jsx`)— **son exactamente los tres que el record de la construcción dejó
fechados en su §8.4**. El disco es lo que aquel run dejó, sin deriva.

**QUÉ DE LO MODIFICADO NO ES DE LA PILA Y SE QUEDA:**

| Pieza | Archivo · línea | Dueño | Destino |
|---|---|---|---|
| El `useForm` único, `useFieldArray`, `useWatch` | `EditorPage.jsx:248-272` | el editor | **INTACTO** |
| **`getValues`** de la desestructuración | `EditorPage.jsx:252` | el editor | **INTACTO** — tiene **10 usos previos** al run (`:380, :388, :397, :400, :416, :451, :727, :764, :909, :1005`); solo se retira su paso al hook |
| Las seis llamadas a `reset(...)` de los cambios de documento | `EditorPage.jsx:340, 359, 422, 472, 505, 532` | el editor | **INTACTAS** — lo que se retira es la línea `resetDraftHistoryStack(...)` de al lado, no el `reset` |
| `AutoSaveManager.jsx` | — | el editor | **INTACTO, sin tocar** |
| Los 8 iconos restantes de `lucide-react` y todo el resto de la cabecera | `TopBar.jsx` | el editor | **INTACTO** |
| El fragmento `<>` de `renderRegularModeButtons` y el de `isCompactMode` | `TopBar.jsx:180, 452` | el editor | **INTACTOS** — envuelven varios hijos y siguen haciendo falta |
| **El insertor de fórmulas entero** | `math-authoring/inlineFormula/` | run 27 | **INTACTO** |
| **Los controles de deshacer/rehacer de MathLive** | `smartFormulaField/SmartFormulaField.jsx:740, :743` | anterior al run 29 | **INTACTOS** — son del editor visual, no de la pila |

**El insertor de fórmulas y sus reglas de selección siguen vivos y NO se tocaron**, medido
después: `InlineFormulaField.jsx` **230 líneas**, `inlineFormulaSplice.js` **309**,
`WebBlockEditor.jsx` **4118**. Las tres cifras casan con los records previos.

### 3.2 EL CRITERIO 2 — QUÉ MÁS CONSUME LO QUE SE IBA A BORRAR

**Barrido de importadores y menciones sobre TODO `projects/cantu-studio`** (excluyendo
`node_modules` y `dist`), buscando los dos módulos y sus identificadores.

**Consumidores encontrados — TODOS de la pila:**

| Consumidor | Qué usa | ¿Fuera de la pila? |
|---|---|---|
| `compiler-api/tests/webEditorUndoRedoGlobal.test.mjs` | las 9 exportaciones + las rutas de los dos módulos | **NO** — es el test del propio run |
| `EditorPage.jsx:14` | `useDraftHistory` | **NO** — el montaje del run 29 |
| `hooks/useDraftHistory.js:5-15` | `utils/draftHistory` | **NO** — uso interno de la pila |

**NADA FUERA DE LA PILA LOS CONSUME. No se disparó la parada del criterio 2.**

**Y un barrido complementario de `undo|redo|execCommand` sobre `editor-ui/src`** (sin
`experiments/`) para localizar qué NO era de este run y no debía tocarse: los dos controles
de MathLive (`SmartFormulaField.jsx:740, :743`) y un `execCommand('copy')` en
`ComponentGuide.jsx:1071`, que es copiar al portapapeles. **Ninguno se tocó.**

### 3.3 EL DESMONTAJE

**Borrados enteros — existían solo para la pila:**

- `features/editor/utils/draftHistory.js` (205 líneas)
- `features/editor/hooks/useDraftHistory.js` (175 líneas)

**`EditorPage.jsx` — 9 cortes, 27 líneas**, cada uno con **aserción de unicidad que aborta
si el fragmento aparece más de una vez**:

| Corte | Líneas |
|---|---|
| el `import` del hook (`:14`) | 1 |
| el comentario del run + la desestructuración del hook + su línea en blanco (`:274-287`) | 14 |
| en `handleRestoreDraft`: su comentario de dos líneas + la llamada | 3 |
| en `handleDiscardDraft`, `switchFlow`, `handleCreateLesson`, `handleLoadDraft`, `handleDeleteDraft`: la llamada | 1 cada uno |
| las 4 props a la cabecera (`onUndo`, `onRedo`, `canUndo`, `canRedo`) | 4 |

**`TopBar.jsx` — 5 cortes, 41 líneas más 2 iconos:**

| Corte | Líneas |
|---|---|
| `Undo2` y `Redo2` fuera del `import` de `lucide-react` | (2 iconos, misma línea) |
| las 4 props | 4 |
| el comentario del run + `historyButtonClass` + `renderHistoryButtons()` + su blanco | 33 |
| el punto de pintado en modo ancho + su blanco | 2 |
| el punto de pintado en modo compacto + su blanco | 2 |

**Los dos puntos de pintado se anclaron al `<>` que los precede.** Sin ese ancla, el
fragmento de 6 espacios es **subcadena** del de 12 y el corte habría sido ambiguo: la guarda
de unicidad lo detectó y abortó **antes de escribir nada**. Se rehízo anclado.

**La captura de atajos de teclado se fue con `useDraftHistory.js`**, que era donde vivía el
`addEventListener` sobre `document` con su `preventDefault`. **No quedó ningún manejador de
Ctrl/Cmd+Z en el editor**, que es como estaba antes de este run.

**No había barriles que restaurar en esta ruta:** los dos módulos se importaban por ruta
directa, no por un `index.js`. **`math-authoring/index.js` e `inlineFormula/index.js` no se
tocaron** —este run nunca los modificó—; siguen en **114** y **16** líneas, las cifras que
dejó el retiro anterior.

**Finales de línea:** los dos archivos modificados eran **CRLF puro** (1082 y 474 `\r\n`, 0
LF sueltos). Se editaron con cortes de cadena exacta sobre `\r\n`, y tras el desmontaje
siguen en **CRLF puro, 0 LF sueltos**. **Los dos archivos LF que el run dejó desaparecen con
el borrado**, así que la observación cosmética del record de la construcción (§13, «los dos
archivos nuevos quedan en LF») **se resuelve sola**.

**BARRIDO DE RESIDUO tras el borrado:** cero aciertos en todo el repo (sin `node_modules` ni
`dist`) para `draftHistory`, `useDraftHistory`, `resetDraftHistoryStack`,
`renderHistoryButtons`, `historyButtonClass`, `canUndoDraft`, `canRedoDraft`, `undoDraft`,
`redoDraft` y `EDITOR-UNDO-REDO-001` en código fuente. *(El packet de QA sí lo nombra: es
evidencia y se queda, §3.7.)*

**Comprobación de que no quedó nada colgando en la cabecera:** de los **10** iconos que
`TopBar.jsx` sigue importando, **ninguno queda sin usar**, y **ningún componente usado quedó
sin definir**.

**DOS CIFRAS DEL RECORD ANTERIOR QUE HOY NO SE REPRODUCEN, Y SE DECLARAN:**

| Archivo | «Antes» según el record de la construcción | Con la pila (medido hoy) | **Tras desmontar (medido)** | Diferencia contra el record |
|---|---|---|---|---|
| `EditorPage.jsx` | 1053 | 1082 ✅ | **1055** | **+2** |
| `TopBar.jsx` | 442 | 474 ✅ | **433** | **−9** |

**Las cifras «con la pila» casan al dígito; las cifras «antes» no.** Y el desajuste tiene una
explicación aritmética limpia: **el record contó las adiciones funcionales y no las
accesorias.** En `TopBar.jsx` las accesorias son exactamente **9**: el comentario del run
(3), `historyButtonClass` (2), y las **4** líneas en blanco que separaban los bloques.
474 − 32 = 442 sale de contar solo `renderHistoryButtons()` (26), sus dos puntos de pintado
(2) y las 4 props. En `EditorPage.jsx` el desajuste es de **2** en la misma dirección
contraria y es un sobreconteo del bloque del comentario.

**LA PRUEBA DE QUE EL CÓDIGO VOLVIÓ AL ESTADO ANTERIOR NO ES EL RECUENTO DE LÍNEAS: ES EL
PAQUETE** (§3.6), que vuelve **al dígito** a las tres cifras que dos records independientes
midieron para el estado previo. Los comentarios y las líneas en blanco no sobreviven a la
minificación, pero **las 26 líneas de JSX de `renderHistoryButtons()` sí lo harían**: si el
desmontaje hubiera cortado de más, el paquete saldría **más pequeño** que 762,12 kB. Sale
exactamente 762,12 kB. **La conclusión es que las cifras «antes» del record anterior estaban
mal contadas, no que este desmontaje se pasara.**

### 3.4 EL CRITERIO 4 — NADA MÁS SE ROMPE, VERIFICADO ANTES Y DESPUÉS

**La tanda obligatoria del criterio, aislada, DESPUÉS del desmontaje:**

```bash
node --test \
  tools/author-lite/compiler-api/tests/webInlineFormulaProseBehaviourLock.test.mjs \
  tools/author-lite/compiler-api/tests/webInlineFormulaInserterMount.test.mjs \
  tools/author-lite/compiler-api/tests/webInlineFormulaSelectionRules.test.mjs
```

```
ℹ tests 39
ℹ suites 0
ℹ pass 39
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 335.6335
```

**39 = 13 del bloqueo + 16 del montaje del insertor + 10 de las reglas de selección. Los
trece del bloqueo, los del insertor y los de sus reglas de selección SIGUEN VERDES. Ninguno
se puso rojo. No hay nada que reportar por el criterio 4.**

### 3.5 EL CRITERIO 5 — LOS TESTS ELIMINADOS, CON SU RAZÓN

**Se eliminó UN archivo, con sus 15 declaraciones:**

`tools/author-lite/compiler-api/tests/webEditorUndoRedoGlobal.test.mjs` (490 líneas)

**La razón, declarada:** las 15 afirman **conducta de la pila** —qué se apila, qué devuelve
deshacer y rehacer, el truncado de la cola, la fusión por ráfaga, el límite de 50 entradas,
los atajos, los controles visibles, qué cambios de documento limpian la pila—. **Todas
importan `utils/draftHistory.js` o leen `hooks/useDraftHistory.js`**, así que sin los dos
módulos no son tests que fallen: son tests que **no pueden ni cargarse**.

**NO SE ELIMINÓ NINGUNO QUE AFIRME CONDUCTA DEL INSERTOR O DEL DATO.** Cuatro de los 15
rozaban esa frontera y **se comprobó que su contenido ya está cubierto fuera**:

| Test eliminado | Qué afirmaba | Por qué su pérdida no descubre nada |
|---|---|---|
| `the inserter is reached without reopening it: its write is not touched, only made undoable` | que `InlineFormulaField.jsx` no se tocó, con su lista exacta de imports | **Lo siguen fijando los 16 de `webInlineFormulaInserterMount.test.mjs`**, que afirman lo mismo sobre el mismo archivo |
| `a programmatic write is undoable…` | usaba el empalme de verdad (`classifyInlineFormulaSelection` + `spliceInlineFormula`) | **El empalme lo siguen fijando los 10 de `webInlineFormulaSelectionRules.test.mjs`**, que son sus dueños |
| `the stored draft format is untouched: only whole snapshots travel, and they round-trip` | el formato del borrador guardado | **Lo siguen fijando los 13 del bloqueo de conducta**, y el formato no lo tocó ni la pila ni su retiro |
| `no new dependency: the stack is written with what the project already has` | que no entró ninguna dependencia | **Sin pila no hay nada que pudiera haberla introducido**; el `package.json` no se tocó en ninguno de los dos sentidos |

**Lo tocado y lo directamente relacionado — NO la suite completa.** La tanda se **derivó por
barrido**, no de memoria: todos los `.test.mjs` que nombran alguna superficie tocada por el
run 29 —`EditorPage`, `TopBar`, `AutoSaveManager`, `draftHistory`, `features/editor/utils`,
`WebBlockEditor`, el insertor— más el trío obligatorio del criterio 4 y el conjunto de
`math-authoring` directamente vecino. **29 archivos antes, 28 después del borrado.**

**ANTES del desmontaje:**

```
ℹ tests 343
ℹ suites 0
ℹ pass 343
ℹ fail 0
ℹ duration_ms 1488.4732
```

**DESPUÉS del desmontaje** (los mismos 29 archivos menos el borrado, = 28):

```
ℹ tests 328
ℹ suites 0
ℹ pass 328
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 1593.6157
```

**328 de 328 en verde. La aritmética cierra sola: 343 − 15 = 328.** Se perdieron
**exactamente** las 15 declaraciones del archivo borrado y **ni una más**. Nada verde se
puso rojo.

**NO se corrió la suite completa**, que el encargo excluye.

### 3.6 EL CRITERIO 6 — LINT, BUILD Y PAQUETE

**`eslint .` sobre `editor-ui`: LIMPIO**, sin errores ni avisos.

**`vite build`: correcto**, con el aviso preexistente de tamaño de chunk, que no es de este
trabajo.

**EL TAMAÑO DEL PAQUETE, ANTES Y DESPUÉS, medido con dos `vite build` reales en esta misma
sesión:**

| Recurso | **Antes** (con la pila) | **Después** (sin ella) | Diferencia |
|---|---|---|---|
| `dist/assets/index-*.js` | **766,19 kB** (gzip 211,19) | **762,12 kB** (gzip 209,95) | **−4,07 kB** (gzip **−1,24**) |
| `dist/assets/index-*.css` | **75,62 kB** (gzip 13,48) | **75,46 kB** (gzip 13,45) | **−0,16 kB** (gzip −0,03) |
| `dist/assets/mathlive.min-_xLHa7o0.js` | 808,02 kB | 808,02 kB | **0 — mismo hash** |

**CONFIRMADO: el paquete vuelve EXACTAMENTE a lo que era antes de este run.** El record de la
construcción midió el estado previo en **762,12 kB / gzip 209,95** para `index.js` y
**75,46 kB / gzip 13,45** para `index.css`, y el retiro anterior había medido las mismas
cifras de forma independiente. **Las cuatro casan al dígito.** El chunk de MathLive conserva
**el mismo hash `_xLHa7o0`**: byte a byte el mismo archivo.

**LA CIFRA DEL ENCARGO, VERIFICADA Y NO HEREDADA:** el encargo dice «unos 4 kB». **La cifra
real es 4,07 kB en JS** (gzip 1,24) **y 0,16 kB en CSS**. **CONFIRMADA.**

### 3.7 EL CRITERIO 7 — EL COMENTARIO QUE ESTE RUN AJUSTÓ

**El hecho, verificado contra disco y no heredado.** El test
`Smart Formula Field productive UI remains rule-only and WebBlockEditor has no MathLive import`
(`webRuleSmartFormulaFieldRulePilot.test.mjs:369`) **barre por texto** todos los archivos de
`features/editor` buscando `/SmartFormulaField|SmartFormulaModal|smartFormulaField/u` y
afirma que **el único acierto es `WebBlockEditor.jsx`**. El run 29 lo puso en rojo porque
`draftHistory.js` mencionaba el identificador **en un comentario**, y **el encargo anterior
arregló su propio comentario y no el test** —lo dejó describiendo la ubicación sin el
literal, en `draftHistory.js:10-11`—.

**COMPROBACIÓN TRAS EL DESMONTAJE, y su declaración:**

- **El ajuste sigue coherente.** El archivo que llevaba el comentario ajustado **ya no
  existe**, así que la colisión **no puede reaparecer por esta vía**.
- **El test está verde**, aislado: `webRuleSmartFormulaFieldRulePilot.test.mjs` → **16 de 16**.
- **El barrido reproducido a mano** sobre `features/editor` devuelve **un solo archivo**:
  `WebBlockEditor.jsx`. Exactamente lo que el test espera.
- **No se tocó el test, no se relajó y no se borró ninguna aserción.**

**Y la lección que el record anterior dejó escrita sigue viva y vale la pena repetirla:** ese
test casa **por texto, no por import**, así que **cualquier archivo nuevo bajo
`features/editor/` que mencione el identificador en un comentario lo pondrá en rojo**. El
arreglo correcto es el comentario, no el test.

### 3.8 EL CRITERIO 8 — LA EVIDENCIA QUE NO SE BORRA

**El packet de QA de este run NO se borró y no se movió.** Sigue donde estaba:

```
projects/cantu-studio/docs/_historical_run_record/RUN-CANTU-EDITOR-UNDO-REDO-001-OPERATOR-QA-PACKET.md
```

**10 221 bytes**, verificado en disco después del desmontaje. **Es evidencia de lo que se
construyó y de lo que la QA encontró, y la política de retención lo protege.**

**`.aiw/docs/docs_index.json` NO se tocó**: `md5 = bc708a5847f66291ea1cd719eb6a0ecb`, el
mismo que dejaron los dos records anteriores, y `Docs indexed: 149` no se movió ni antes ni
después.

---

## 4. EL PRECEDENTE DE RETIRO — DERIVADO DEL DATO EN DISCO

**El encargo manda derivar la forma DEL DATO, no de la prosa de ningún log. Así se hizo.**

Barrido de `closeout_result` sobre los **71** runs del canónico. **Diez runs lo llevan**, y
**DOS son retiros:**

| `queue_order` | `run_id` | `closeout_result` literal |
|---|---|---|
| 1 | `RUN-JAME-SMART-FORMULA-FIELD-RULE-ONLY-BASELINE-001` | `completed_successfully` |
| 22 | `RUN-JAME-WEB-CARD-REVALIDATION-001` | `completed` |
| 23, 24, 25, 26, 27 | *(cinco runs)* | `done as specified` |
| **28** | **`RUN-CANTU-INLINE-FORMULA-PREVIEW-001`** | **`discarded_by_RETIRO-PREVISUALIZACION-PARRAFO-CANTU`** |
| **34** | **`RUN-CANTU-COMPILER-VARIANT-GATES-001`** | **`discarded_by_RETIRO-RUN-COMPUERTAS-VARIANTE-CANTU`** |
| 48 | `RUN-JAME-MATHLIVE-INTEGRATION-READINESS-001` | *(frase larga en prosa)* |

**LOS DOS PRECEDENTES, VERBATIM:**

```
discarded_by_RETIRO-PREVISUALIZACION-PARRAFO-CANTU
discarded_by_RETIRO-RUN-COMPUERTAS-VARIANTE-CANTU
```

**El molde, que los dos comparten: `discarded_by_` + el nombre del record del retiro, sin la
extensión `.md`.** Los dos runs están en `status = completed` con su `queue_order` intacto,
que es exactamente la forma que este encargo manda repetir.

**EL VALOR APLICADO AQUÍ:**

```
discarded_by_RETIRO-PILA-DESHACER-GLOBAL-CANTU
```

**El vocabulario de `status` es cerrado y no se inventó ningún token.** Se verificó en el
propio motor: `STATUSES = ["planned", "active", "completed", "blocked"]`
(`roadmap-core.mjs:175`), con `TERMINAL_STATUSES = ["completed", "blocked"]` (`:176`).
**No existe token de descarte, y no se creó ninguno.**

**EL SEPARADOR DE LA NOTA, COPIADO DEL DATO leyendo sus códigos de carácter**, no de la
prosa: los dos precedentes separan su nota del `full_description` original con
**`\n\n` — códigos `10,10`, solo LF, sin CR** —, aunque **el archivo entero es CRLF**. Los
dos abren con `WITHDRAWN <fecha> by the operator`. **Esta nota usa el mismo separador y la
misma apertura**, y **el guion se escribe `--` en ASCII**, como en los dos precedentes.
**El script de escritura lleva una guarda que aborta si el separador del precedente no es
`10,10`.**

**Y los dos precedentes comparten un esqueleto que esta nota también sigue:** apertura
`WITHDRAWN … withdrawn is not deleted`, la frase del vocabulario cerrado, `WHY IT WAS
WITHDRAWN` / el porqué, `WHERE THE SCOPE WENT`, y cierre con `NOTHING ELSE MOVED: …`.

---

## 5. BLOQUE B — EL RESPALDO Y LAS PRECONDICIONES

### 5.1 EL RESPALDO (criterio 10)

Copia **byte a byte** al scratchpad de sesión, **fuera de los dos repos**:

```
C:\Users\chris\AppData\Local\Temp\claude\…\scratchpad\roadmap.BACKUP.json
```

| | |
|---|---|
| **md5 del canónico y del respaldo** | **`5307a53d582b3a98284da85adf4d5bbe`** — idénticos |
| **tamaño** | **137 258 bytes**, los dos |
| **`cmp`** | **idénticos byte a byte** |

**`git checkout` NO se usó para nada**, porque reescribe finales de línea. El canónico es
**CRLF puro** (1351 `\r\n`, 0 LF sueltos) y el motor detectó `eol = "\r\n"` y **serializó con
los finales del propio archivo**.

*(También se respaldaron al scratchpad los cinco archivos de código antes del desmontaje, con
su md5.)*

### 5.2 LAS PRECONDICIONES, CON GUARDA QUE ABORTA (criterio 11)

| Precondición | Medido | Resultado |
|---|---|---|
| `queue_order` denso `1..N` | mín 1, máx 71, `every(v,i) => v === i+1` | **OK** |
| **`N = 71`** | recuento sobre el árbol | **OK — 71** |
| `queue_order` único | `Set(71) === 71` | **OK** |
| `run_id` único | `Set(71) === 71` | **OK** |
| **exactamente un run `active`** | recuento por `status` | **OK — 1** |
| **y es el de `queue_order 29`** | `RUN-CANTU-EDITOR-UNDO-REDO-001` | **OK** |
| fases vacías | recuento | **OK — 0** |

Recuento por status de partida: **`completed=30`, `planned=40`, `active=1`**. 30+40+1 = 71.

**Además, el propio motor corre un pre-flight que rehúsa editar un archivo ya roto**
(`planEdit` → `checkInvariants` antes de mutar). **Sobre esto hubo un hallazgo real, §6.1.**

---

## 6. LA ESCRITURA — CONDUCIDA POR EL MOTOR DE `aiw-console`

**El CLI local de `cantu-studio` rehúsa el pre-flight**, así que se condujo el motor de
`projects/aiw-console/tools/roadmap/` — `roadmap-plan.mjs` sobre `roadmap-core.mjs`—, que es
la misma secuencia que ejecuta el endpoint de escritura de la consola global:

```
loadRaw → parseRoadmap → checkInvariants (pre-flight)
→ queueOrderMap + collectIds → mutación → checkInvariants (post) + checkIdentityPreserved
→ buildRemap → serialize (con los finales del propio archivo) → applyWrite (atómico)
```

### 6.1 UN HALLAZGO: EL PRE-FLIGHT ABORTÓ AL PRIMER INTENTO, Y ESTUVO BIEN

**El primer `planEdit` se detuvo en `stage: preflight`**, sin escribir nada:

```
target file already fails the invariants; fix it before editing:
run RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 depends on unknown run
RUN-CANTU-ROADMAP-CONTENT-AUDIT-001 (dangling dependency: declared by no registered project)
```

**No es una rotura del canónico: es que el motor no sabía nada de los otros proyectos.**
`checkInvariants` acepta un set `externalRunIds` (CONTRATO §10.d Regla 2) y **sin él toda
dependencia externa parece colgante**.

**El set NO se inventó: se derivó del registro con la MISMA función que usa el endpoint de
escritura de la consola**, `externalRunIdsFor('cantu-studio')` de
`project-console/serve.mjs:335` —importarlo no levanta ningún puerto, hay guarda
`RUN_DIRECTLY`—. Devuelve **102 ids** y **contiene `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`**.

**Y se verificó dónde vive ese run, contra disco:** `projects/aiw-console/roadmap/roadmap.json`,
objetivo `O0`, fase `O0.P3`, `queue_order 4`, `status completed`, titulado
*«Audit and correct the roadmap content objective by objective»*. **Es una dependencia
externa legal, no un error de escritura.** Queda declarado y **NO se reparó**: no es de este
run.

### 6.2 LA OPERACIÓN

**Una sola operación `batch` con dos sub-operaciones**, para que ambas lleguen a disco en una
escritura o en ninguna:

1. `set-status` → `status = completed`, `closeoutResult = discarded_by_RETIRO-PILA-DESHACER-GLOBAL-CANTU`
2. `set-text` → `full_description` = el original **+ `\n\n` + la nota de retiro**

**Se hizo primero un DRY RUN completo**, que no escribe nada:

```
stage: ok | ok: true
errors: []
warnings: []
remap (runs cuyo queue_order cambia): []
eol detectado: "\r\n"
bytes: antes 137258 -> despues 140547
```

**Y solo después el apply.** La escritura llevó **el validador como guarda**: `applyWrite`
restaura desde su propio respaldo si el validador no devuelve 0.

```
written: true | rolledBack: false | bytes: 140547
```

**Devolvió 0 y no hubo rollback.**

**NO se cambiaron** `run_id`, `title`, `queue_order`, `objective` ni `phase`. Verificado: la
ubicación del run sigue siendo `O4` / `O4.P5` / índice 0 **antes y después**, y el `remap`
del motor salió **vacío: `[]`**.

### 6.3 LA NOTA DE RETIRO — TEXTO TAL COMO QUEDÓ EN DISCO

> WITHDRAWN 2026-08-05 by the operator, and withdrawn is not deleted: this run keeps its run_id, its title and its queue_order, nothing moves behind it, and it closes as completed with a closeout_result that says how it closed. The run status vocabulary is closed and carries no discard token; none is invented here, following the precedent already on record for the withdrawal of a prototype run. THIS RUN WAS BUILT IN FULL AND THE OPERATOR QA RETURNED IT WITH CHANGES_REQUIRED, with three failures: undo reverts EVERYTHING AT ONCE, including changes made in different components; redo does not work; and the undo control stays enabled when there is nothing left to undo. THE FIRST IS NOT AN IMPLEMENTATION DEFECT: IT IS THE FORM. The stack this run built is a stack PER DOCUMENT, and the editor holds the whole draft in a single form, so every entry on the stack is a whole-document state. A stack of whole-document states can only ever restore whole-document states: it cannot tell one block's change from another's, because at the point where it records, that distinction does not exist. Repairing it is not a fix inside this run; it is a redesign to per-field transactions -- recording WHICH field changed and reverting only that -- which is a much larger system than this run framed, and would carry its own decisions about granularity, cursor position and how a transaction is bounded. The second and third failures are ordinary defects and would be cheap on their own, but they are not worth carrying on a form that has to be replaced. WHERE THE SCOPE WENT: it is SPLIT IN TWO, and neither destination is created here. The operator opens one run for the MINIMAL INSERTER FIX -- the measured ten-line route that makes the inserter write through the browser's own text-editing command so the native per-field undo records it, which repairs the exact case the operator originally reported and nothing more -- and a second run, LATER, for the HISTORY SYSTEM DONE AS IT SHOULD BE, at the granularity this run could not reach. BOTH OF THOSE RUNS ARE INSERTED BY ANOTHER COMMISSION; this one creates neither. A KNOWN STEP BACKWARDS, DECLARED AND ACCEPTED BY THE OPERATOR: with the stack dismantled, UNDO AFTER AN INSERTER WRITE IS BROKEN AGAIN -- exactly as it was before this run -- and stays broken until the minimal inserter fix run lands. That is the accepted cost of not shipping the wrong form, not an oversight. The code was dismantled in the same workshop: the two stack-only modules and the stack-only test file were deleted, the visible undo and redo controls, their wiring and the keyboard shortcut capture were removed, and the barrels and export points were restored to their pre-run state; the bundle returned to its pre-run size to the digit. The formula inserter and its selection rules were not touched and stay in production, and their tests and the thirteen of the behaviour-lock run stay green. The operator QA packet of this run is NOT deleted: it is evidence of what was built and the retention policy protects it. NOTHING ELSE MOVED: no run_id, title, queue_order, objective or phase changed here, no run was inserted, removed or renumbered, and no other run's status changed.

**Verificado en disco tras la escritura:** el separador es **`10,10`** (LF LF, sin CR), el
`full_description` **no contiene ni un CR**, y pasó de **1 667** a **4 867** caracteres.

**El run tras la escritura:**

| Campo | Valor |
|---|---|
| `run_id` | `RUN-CANTU-EDITOR-UNDO-REDO-001` — **sin cambio** |
| `queue_order` | **29** — sin cambio |
| `title` | `Give the author undo and redo across the whole editor` — sin cambio |
| `objective` / `phase` | `O4` / `O4.P5`, índice 0 — sin cambio |
| `depends_on` | `[]` — sin cambio |
| `status` | **`completed`** |
| `closeout_result` | **`discarded_by_RETIRO-PILA-DESHACER-GLOBAL-CANTU`** |
| orden de claves | `run_id,queue_order,title,summary,full_description,status,depends_on,closeout_result` |

**El orden de claves casa exactamente con el del precedente (`queue_order 28`)**, porque lo
impone el propio motor con `normalizeRunKeyOrder`.

**El canónico sigue en CRLF puro** tras la escritura: 1352 `\r\n`, **0 LF sueltos**. *(Sube
una línea física respecto de las 1351 de partida: es la clave `closeout_result` añadida al
run.)*

---

## 7. LA VERIFICACIÓN DEL CRITERIO 14 — NADIE MÁS SE MOVIÓ

Comparación **del árbol entero** contra el respaldo, campo a campo sobre los 71 runs:

| # | Comprobación | Resultado |
|---|---|---|
| 1 | total de runs = **71** | **OK** |
| 2 | `queue_order` **1..71** denso | **OK** |
| 3 | `queue_order` **idéntico al respaldo**, run por run | **OK — 0 desplazados** |
| 4 | `run_id` únicos | **OK — 71** |
| 5 | `depends_on` colgantes | **OK — exactamente 1**, el externo legal |
| 6 | fases vacías | **OK — 0** |
| 7 | runs `active` | **OK — cero** |
| 8 | **campos cambiados en TODO el árbol** | **OK — exactamente 3** |
| 9 | raíz (`schema_version`, `roadmap_id`, `title`, `lanes`, `care_budget`) | **OK — idéntica** |
| 10 | objetivos / fases | **OK — 7 / 28, sin cambio** |

**Los únicos tres campos cambiados en todo el árbol:**

```
RUN-CANTU-EDITOR-UNDO-REDO-001 :: status
RUN-CANTU-EDITOR-UNDO-REDO-001 :: closeout_result
RUN-CANTU-EDITOR-UNDO-REDO-001 :: full_description
```

**Ni uno más, y los tres del `queue_order 29`.** La comparación cubrió además `objective`,
`phase` e **índice dentro de la fase** de los 71, y ninguno se movió.

**El único colgante, que es el conocido y legal:**

```
RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 -> RUN-CANTU-ROADMAP-CONTENT-AUDIT-001
```

**No hizo falta restaurar desde el respaldo.**

---

## 8. EL CRITERIO 15 — ¿ALGUIEN DEPENDÍA DE ÉL?

Recorrido de las `depends_on` **de los 71 runs**: **141 aristas revisadas**.

**NADIE nombra a `RUN-CANTU-EDITOR-UNDO-REDO-001`. Cero runs.**

**No hay ninguna dependencia que declarar como vaciada de contenido**, y por tanto tampoco
hay nada que advertir al operador por este motivo. *(El run tampoco dependía de nadie: su
`depends_on` era y sigue siendo `[]`.)*

---

## 9. EL VALIDADOR — SALIDA COMPLETA, ANTES Y DESPUÉS

Ejecutado por **la vía que no escribe**, desde `projects/cantu-studio`:

```bash
node tools/project-console/validate-project-console-state.mjs
```

### ANTES

```
Project Console state validation passed.
Roadmap v3 prototype: 7 objectives / 28 phases / 71 runs; queue groups needs_human_decision=0 now=1 ready_next=15 later=25 history=30
Roadmap v3 active run derived stages: RUN-CANTU-EDITOR-UNDO-REDO-001=none
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
Roadmap v3 prototype: 7 objectives / 28 phases / 71 runs; queue groups needs_human_decision=0 now=0 ready_next=15 later=25 history=31
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
| **`history`** | **30** | **31** | **+1** ✅ |
| **`now`** | **1** | **0** | **−1** |
| **`ready_next`** | **15** | **15** | **0** |
| `later` | 25 | 25 | 0 |
| `needs_human_decision` | 0 | 0 | 0 |
| objetivos / fases | 7 / 28 | 7 / 28 | 0 |

**`history` sube en uno al pasar el run a `completed`. CONFIRMADO CON EL DATO: 30 → 31.**
La suma cierra: **31 + 0 + 15 + 25 = 71.**

**Recuento propio sobre `roadmap.json`, independiente del validador:** `completed` **30 → 31**,
`planned` 40, `active` **1 → 0**. **Casa con `history` en las dos mediciones.**

**Y la señal que confirma el cierre:** la línea
`Roadmap v3 active run derived stages: …` **desaparece de la salida**, porque ya no hay
ningún run `active` del que derivar etapas. **`now` pasa de 1 a 0 por el mismo motivo.**

**El aviso no bloqueante de la dependencia externa aparece antes y después, es el conocido y
legal, no es hallazgo y NO se reparó.**

---

## 10. LAS CIFRAS DEL ENCARGO — VERIFICADAS UNA A UNA (criterio 17)

**El encargo avisa de que pueden estar mal. Se midieron todas. Todas eran correctas.**

| Cifra del encargo | Cómo se verificó | Resultado |
|---|---|---|
| **71 runs** | recuento sobre el árbol **y** salida del validador | **CONFIRMADA — 71** |
| **`history=30` de partida** | salida del validador antes de escribir | **CONFIRMADA — 30** |
| **un run `active` de partida** | recuento por status; es el `queue_order 29` | **CONFIRMADA — 1** |
| `queue_order` 29 = el run del título dado | derivación + comparación estricta de 53 caracteres y sus códigos | **CONFIRMADA** |
| **existen DOS precedentes de retiro** | barrido de `closeout_result` sobre los 71 | **CONFIRMADA — los `queue_order` 28 y 34** |
| `N = 71` denso y contiguo | `1..71`, sin hueco ni repetido | **CONFIRMADA** |
| **la pila añadió «unos 4 kB»** | dos `vite build` reales | **CONFIRMADA — 4,07 kB en JS** (gzip 1,24) **+ 0,16 kB en CSS** |

---

## 11. EL AVISO QUE HAY QUE DECLARAR

**AL DESMONTAR LA PILA, EL DESHACER DEL INSERTOR VUELVE A ESTAR ROTO.**

Con la pila fuera, el editor queda **exactamente como estaba antes del run 29**: el campo de
prosa no tiene más deshacer que el nativo del navegador, y **el nativo está roto por la
escritura de la herramienta**. La medición del run construido lo dejó fijado en un navegador
real (Chromium 148) y no es una deducción: tras una escritura del insertor,
`execCommand('undo')` **devuelve `true` y no cambia nada**, y **se pierde además el historial
que el autor ya tenía en ese campo**, incluido el texto que había tecleado antes.

**ES UN PASO ATRÁS CONOCIDO Y ACEPTADO POR EL OPERADOR, NO UN DESCUIDO.** Es el coste de no
enviar la forma equivocada. **Queda roto hasta que corra el run del arreglo mínimo del
insertor**, que es la ruta C ya medida en el record de la construcción: ~10 líneas en
`InlineFormulaField.jsx`, con la equivalencia byte a byte del empalme **ya comprobada**.

**Ese run no se crea aquí. Ni ése ni el del sistema de historial completo. Los inserta otro
encargo.**

---

## 12. QUÉ **NO** SE HIZO

**Por prohibición explícita del encargo:**

- **No se implementó el arreglo mínimo del insertor.** Tiene su propio run y no es éste.
- **No se tocó el insertor de fórmulas ni sus reglas de selección.** `InlineFormulaField.jsx`
  sigue en **230** líneas, `inlineFormulaSplice.js` en **309**, y sus tests siguen verdes.
- **No se creó ni se insertó ningún run.** Los dos sucesores los inserta otro encargo.
- **No se tocó el control compartido de área de texto**, ni el compilador, ni los renderers,
  ni los esquemas, ni el formato del dato guardado.
- **No se borró el packet de QA de este run** ni ninguna otra evidencia histórica (§3.8).
- **No se tocó** `.aiw/docs/docs_index.json` —md5 verificado antes y después—,
  `component_status.json`, la Definition of Done ni los contratos.
- **No se cambió el status de ningún otro run. No se insertó, movió ni renumeró ninguno.**
- **No se clasificó ningún run.**
- **No se re-emitió `.project/`. No se ejecutó Git. No se levantó ningún servidor. No se
  corrió la suite completa.**
- **No se tocó `WebBlockEditor.jsx`** — sigue en **4118** líneas. El run 29 nunca lo tocó,
  porque la pila se montó en `EditorPage.jsx` y en la cabecera. **Esa decisión de forma del
  run construido es justamente lo que hizo barato retirarlo.**

**Por límite de la medición, declarado:**

- **No se ejecutó la interfaz.** Todo el bloque A es lectura de código, ejecución en Node,
  lint y build. **No se abrió el editor en un navegador**, así que **no afirmo nada sobre lo
  que se ve en pantalla** tras el desmontaje. Lo que sí está medido es que el paquete vuelve
  al dígito a su tamaño previo, que `eslint` está limpio, que ningún icono quedó huérfano ni
  ningún componente sin definir, y que los 328 tests de la tanda están verdes.
- **La razón del retiro es una QA del operador, no mía.** Los tres fallos **están medidos en
  pantalla por el operador**; no se remidieron aquí. Lo que sí se verificó contra disco es
  **por qué el primero es de forma**: el `useForm` único y la pila por documento están
  medidos en el record de la construcción y se comprobaron leyendo `EditorPage.jsx`.
- **No se afirma «suite completa en verde».** Lo ejecutado y verde son **328 tests en 28
  archivos**, más los **39** de la tanda obligatoria del criterio 4.
- **Las cifras «antes» de líneas del record anterior no se reproducen** y se declara la
  diferencia con su explicación aritmética (§3.3). **La prueba de vuelta al estado previo es
  el paquete, no el recuento de líneas.**

**No se reparó ninguna deriva conocida:** ni el mojibake de los dos esquemas, ni los punteros
muertos, ni el CLI local de roadmap, ni los HTML huérfanos, ni el anidamiento de fórmulas del
insertor, ni los defectos sin dueño de los componentes ya revalidados, ni el aviso de
dependencia externa del validador, ni la discrepancia de `Component statuses: 16` contra los
17 ids del catálogo. **La carcasa huérfana `FormulaInserterShell.jsx` sigue con 0
importadores y no se tocó**, ni ninguno de los 20 huérfanos que el record de la construcción
censó.

---

## 13. ESTADO FINAL

**El run `RUN-CANTU-EDITOR-UNDO-REDO-001` queda `completed` con
`closeout_result = discarded_by_RETIRO-PILA-DESHACER-GLOBAL-CANTU`, en su `queue_order 29`,
en `O4.P5`, con su `run_id`, su `title`, su `objective` y su `phase` intactos.**

**Retirar no fue borrar:** el run sigue en el canónico, su nota dice cómo cerró y por qué, y
el packet de QA sigue en su sitio como evidencia de que el trabajo se hizo y de qué encontró
la QA.

**El código quedó como estaba antes del run 29**, verificado por tamaño de paquete
(762,12 kB / gzip 209,95 y 75,46 kB / gzip 13,45, **las cuatro cifras al dígito** contra dos
mediciones previas independientes), por lint limpio, por barrido de residuo a cero y por
tests (39 + 328 en verde, cero rojos).

**El insertor de fórmulas sigue vivo y en producción — y su deshacer, roto, hasta que corra
el run del arreglo mínimo** (§11).
