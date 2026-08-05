# DESHACER Y REHACER EN TODO EL EDITOR (cantu-studio)

**Fecha:** 2026-08-05
**Run:** `RUN-CANTU-EDITOR-UNDO-REDO-001` — **derivado por `queue_order 29`, no tecleado** (§1).
**Repo escrito:** `projects/cantu-studio` — **seis archivos**: 2 de producción nuevos,
3 de producción modificados, 1 test nuevo, más el packet de QA (§6, §11).
**Repo escrito:** `projects/aiw-console` — **este record.**
**Veredicto:** **CONSTRUIDO. Ninguna compuerta de parada se disparó.** La hipótesis de la
cabina **resultó CIERTA y además CORTA**: la escritura de la herramienta no solo no se
registra en la pila nativa, **INUTILIZA la que ya había** (§3). Y **se midió en un navegador
real**, contra lo que el record anterior declaró imposible (§3.1).

---

## 1. EL RUN, DERIVADO DEL CANÓNICO

Recorrido de `projects/cantu-studio/.aiw/roadmap/roadmap.json`
(`schema_version = jame.roadmap_v3.v0.2-progress`) buscando `queue_order === 29`.
**Una sola coincidencia sobre 71 runs.**

| Campo | Valor derivado |
|---|---|
| `run_id` | **`RUN-CANTU-EDITOR-UNDO-REDO-001`** |
| ubicación | objetivo `O4`, fase `O4.P5` |
| `queue_order` | 29 |
| `status` | `active` — **y es el ÚNICO `active` del canónico**, verificado |
| `depends_on` | `[]` — sin dependencias |

**Título en disco, VERBATIM:**

```
Give the author undo and redo across the whole editor
```

**Casa carácter a carácter con el del encargo. No hay parada por este motivo.** El validador
lo confirma de forma independiente:
`Roadmap v3 active run derived stages: RUN-CANTU-EDITOR-UNDO-REDO-001=none` (§10).

El `full_description` se leyó íntegro antes de tocar nada. Pide exactamente lo que el ticket:
medir antes de construir, medir para **todos** los escritores programáticos y no solo el
insertor, comparar el coste de cada ruta **incluida la que la librería de formularios ya
ofrezca**, no romper el deshacer del editor visual ni el formato guardado ni la vía de
guardado, y **parar si hiciera falta una dependencia nueva**. Cierra con
*«This run requires operator visual QA»*.

---

## 2. LOS TRES RECORDS PREVIOS — VERIFICADOS, NO HEREDADOS

Se leyeron enteros los tres que el encargo nombra. **Lo esencial se reproduce; hay dos
correcciones y un hallazgo nuevo, y los tres se dicen en voz alta.**

| Afirmación previa | Verificación de hoy |
|---|---|
| `CONSTRUCCIÓN` §4.3 y §2.2: el insertor escribe con el **setter nativo del prototipo** + evento `input`, y `TextAreaField` no expone `ref` | **CONFIRMADO.** `InlineFormulaField.jsx:57-70`, y `descriptor.set.call` en `:64` |
| `CONSTRUCCIÓN` §2.1: **7 sitios, 8 colocaciones, 5 campos de prosa** | **CONFIRMADO** por recuento propio (§9) |
| `REGLAS` §8: «deshacer NO SE PUDO MEDIR; el navegador integrado sirve la página como instantánea estática y **no ejecuta scripts**» | **NO SE REPRODUCE. El navegador SÍ ejecuta scripts** con el archivo dentro de la carpeta del proyecto. **Es la corrección importante de este run** y es lo que permitió medir (§3.1) |
| `CONSTRUCCIÓN` §4.3: «`setValue` … no llega a estos componentes: solo `LessonContextBar.jsx` lo recibe» | **CORREGIDO EN SU CONSECUENCIA.** `LessonContextBar.jsx` tiene **CERO importadores**: es un huérfano. Por tanto **`setValue` no se usa en NINGÚN sitio vivo del editor** (§4) |
| `RETIRO` §3.1: la previsualización se desmontó y el insertor quedó intacto | **CONFIRMADO.** No queda residuo, y los 39 tests de aquella tanda siguen verdes dentro de los 345 de hoy (§8) |
| `RETIRO` §3.6: el paquete volvió a **762,12 kB / gzip 209,95** y CSS **75,46 kB** | **CONFIRMADO AL DÍGITO, y no heredado**: se reconstruyó el estado previo a este run y se construyó de verdad (§7) |

---

## 3. LA MEDICIÓN DEL CRITERIO 1 — LA COMPUERTA

### 3.1 POR QUÉ DESHACER NO REVIERTE LO QUE ESCRIBE EL INSERTOR — **MEDIDO, NO DEDUCIDO**

**Se midió en un navegador real.** Sonda escrita en
`tools/author-lite/editor-ui/dist/` —carpeta que `.gitignore` ignora (`dist/`, `**/dist/`),
así que no hay ruido de commit— y cargada por `file://`. **Los scripts se ejecutan.**
`navigator.userAgent`:

```
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)
Claude/1.24012.9 Chrome/148.0.7778.280
```

**Motor: Chromium 148.** *(Las sondas se retiraron: `vite build` vacía `dist/`; verificado
después — sólo queda `index.html`.)*

**MEDICIÓN A — la vía del insertor, reproducida literalmente** (misma función
`writeUncontrolledValue` de `InlineFormulaField.jsx:57-70`):

```
valor tras escribir                     "base\(x^2\)"      <- la escritura SÍ llega
document.queryCommandEnabled('undo')    false
document.execCommand('undo')            false              <- el navegador rehúsa
valor tras deshacer                     "base\(x^2\)"      <- NO CAMBIA NADA
```

**MEDICIÓN B — el mismo resultado escrito con `document.execCommand('insertText')`:**

```
valor tras escribir                     "base\(x^2\)"      <- IDÉNTICO
document.queryCommandEnabled('undo')    true
valor tras deshacer                     "base"             <- REVIERTE EXACTO
```

**MEDICIÓN C — Y AQUÍ ESTÁ LO QUE NADIE HABÍA VISTO. La escritura de la herramienta no
solo no se registra: DESTRUYE el historial que el autor ya tenía.**

```
el autor teclea                         "trabajo del autor"
queryCommandEnabled('undo')             true               <- había historial
la herramienta escribe (setter)         "trabajo del autor + HERRAMIENTA"
queryCommandEnabled('undo')             true               <- el navegador dice que sí
execCommand('undo') x3                  true, true, true   <- y devuelve true tres veces
valor tras los tres                     "trabajo del autor + HERRAMIENTA"  <- SIN CAMBIAR
lo que el autor tecleó, recuperable     NO
```

**LA MISMA SECUENCIA CON `insertText`:**

```
execCommand('undo')  ->  "trabajo del autor"   <- se va SOLO la fórmula
execCommand('undo')  ->  ""                    <- y luego lo tecleado
```

**ESTO EXPLICA EXACTAMENTE LO QUE EL OPERADOR VIO EN PANTALLA:** no es que deshacer «no
alcance» a la fórmula; es que **después de insertar, deshacer deja de funcionar del todo en
ese campo**, incluso para el texto que el autor había tecleado antes. Y el navegador
**miente al preguntarle**: `queryCommandEnabled('undo')` sigue diciendo `true`.

**MEDICIÓN D — no es el truco del descriptor, es el propio setter de `value`.** Con
`element.value = x` a secas ocurre lo mismo: `execCommand('undo')` devuelve `true` y el valor
no cambia. La diferencia entre las dos formas es otra, y también se midió (§3.4).

**MEDICIÓN E — la pila nativa es POR ELEMENTO y sigue al foco.** Con dos `<textarea>`, un
`execCommand('undo')` con el foco en el segundo deshace **sólo el segundo**. Y con el foco
fuera de todo campo editable, `queryCommandEnabled('undo')` es **`false`**. **La pila nativa
no puede dar nunca un deshacer de documento.**

**MEDICIÓN F — la granularidad no es nuestra.** Tres `insertText` consecutivos —`uno`,
`dos`, `tres`— se agrupan en **UN solo paso** de deshacer nativo.

**Y LA SEGUNDA MITAD DEL PORQUÉ, medida en disco, no en el navegador:** barrido de
`undo|redo|execCommand` sobre todo `editor-ui/src` fuera de `experiments/`:

| Acierto | Qué es |
|---|---|
| `smartFormulaField/SmartFormulaField.jsx:740` y `:743` | **los únicos controles de deshacer/rehacer que existían** — los de MathLive, dentro del editor visual |
| `preview/ComponentGuide.jsx:1071` | `document.execCommand('copy')` — copiar al portapapeles, no es deshacer |

**Barrido de manejadores de Ctrl/Cmd+Z: CERO.** La única mención de `ctrlKey` en todo
`editor-ui/src` es `SmartFormulaField.jsx:395`, y es para **excluir** las combinaciones con
Ctrl de su propio manejador. **Antes de este run el campo de prosa no tenía más deshacer que
el nativo, y el nativo estaba roto por la escritura de la herramienta.**

### 3.2 CUÁNTOS ESCRITORES PROGRAMÁTICOS HAY — **CENSO SOBRE EL GRAFO VIVO**

No se contó por texto. Se recorrió el grafo de módulos **alcanzable desde `src/main.jsx`**:
**87 módulos vivos de 107 archivos `.js/.jsx` en `src` sin `experiments/`. 20 huérfanos**,
que se listan al final de este apartado porque uno de ellos corrige un record previo.

**EL CENSO, por clase de escritura, sólo sobre módulos vivos:**

| Clase | Sitios | Archivos | Qué es |
|---|---|---|---|
| **A. Escritura directa al DOM del campo** | **1** | 1 | `InlineFormulaField.jsx:161` — `writeUncontrolledValue`. **El del insertor. Es el único de su clase en todo el editor.** |
| **B. `setValue` de RHF** | **0** | 0 | **Ninguno vivo.** El único del repo está en un archivo huérfano |
| **C. `reset` de RHF (documento entero)** | **8** | 1 | `EditorPage.jsx` — restaurar, descartar, cambiar de flujo, crear, cargar, borrar, guardar, compilar |
| **D. Mutadores de `useFieldArray`** | **18** | 5 | añadir/quitar/mover bloques, ítems de detalles, de comparador, de lista con etiquetas, de slide |
| **E. `onChange` con valor COMPUESTO por código** | **50** | 5 | selectores de color, filas de tabla, pasos, términos, nodos de jerarquía, columnas… |
| **F. `onChange` pasarela (`event.target.*` tal cual)** | **4** | 1 | 2 desplegables y 2 campos de texto controlados de jerarquía |

**LA CIFRA QUE EL TICKET PIDE: 77 puntos** fijan el valor de un campo sin que el autor teclee
en ese campo (A+B+C+D+E). **81 si se cuentan también los 4 de la clase F**, donde el gesto es
del autor pero no es tecleo en el campo destino.

**Y LA CONCLUSIÓN QUE IMPORTA, medida y no supuesta: NINGUNO de los 81 estaba en la pila
nativa del navegador.** La pila nativa sólo registra ediciones hechas por el autor dentro de
un control de texto. Un `field.onChange`, un `append`, un `reset` y la escritura del insertor
son, para el navegador, la misma clase de cosa: invisibles. **El hueco no era del insertor:
era de los 81.**

*(Se excluyeron del censo 3 `onChange` de `preview/ComponentGuide.jsx` porque ese componente
**no toca React Hook Form en absoluto** —sin `useForm`, sin `Controller`, sin `register`,
sin `control`—: su estado es local de la guía y no es borrador. Verificado leyendo el
archivo, no asumido.)*

**LOS 20 HUÉRFANOS, y por qué se declaran:** `config/apiConfig.js`, `EmptyState.jsx`,
`WebModeSelect.jsx`, `EditorShell.jsx`, `LessonBreadcrumbBar.jsx`, **`LessonContextBar.jsx`**,
`ThreePaneLayout.jsx`, `FocusPreviewOverlay.jsx`, `PreviewPanel.jsx`, `PreviewToolbar.jsx`,
`SlidePreviewPanel.jsx`, `WebPreviewPanel.jsx`, `SlideFlowEditor.jsx`, `WebFlowEditor.jsx`,
`WorkspaceTabs.jsx`, `blockDefaults.js`, `editorTabs.js`, `useSelectedBlock.js` (0 bytes),
`previewMappers.js`, `slugHelpers.js`. **Y `FormulaInserterShell.jsx`, que sigue con cero
importadores.** **No se tocó ninguno.** Se nombran porque `LessonContextBar.jsx` es el que
corrige la afirmación previa sobre `setValue` (§2), y porque `WebFlowEditor.jsx` y
`blockDefaults.js` aparecen en `CLAUDE.md` como referencias vivas y **no lo son**. Retirarlos
o revivirlos **no es de este run**.

### 3.3 QUÉ OFRECE YA LA LIBRERÍA DE FORMULARIOS — **NADA, Y ESTÁ MEDIDO**

**React Hook Form 7.75.0**, la versión instalada.

**Barrido de `undo|redo|history` sobre TODO el `dist/` del paquete —`index.esm.mjs`,
`index.cjs.js`, `index.umd.js` y los `.d.ts`—: CERO ocurrencias.** No hay API de historial,
ni parcial ni experimental.

**Lo que sí ofrece, y que se midió leyendo su código porque la ruta elegida depende de ello:**

| Pieza | Dónde | Qué hace de verdad |
|---|---|---|
| `reset(valores, opciones)` | `index.esm.mjs:2435` | **Sustituye el documento entero Y actualiza los elementos del DOM.** Vacía `_fields`, reemite a `useFieldArray`, y al reregistrarse cada campo `updateValidAndValue` → `setFieldValue` escribe `ref.value` (`:1875`) |
| `setValues(valores)` | `:1949-1960` | **Fusión superficial en `_formValues` + notificación. NO escribe en los elementos registrados.** Con los cinco campos de prosa —`<textarea {...register()}/>`, no controlados— el borrador cambiaría por dentro y **el autor seguiría viendo el texto viejo**. **Descartado por medición, no por gusto** |
| `KeepStateOptions` | `types/form.d.ts:114-127` | doce banderas; la que importa es **`keepDefaultValues`** |
| `isDirty` | `:2528-2534` | se calcula **contra `_defaultValues`**, y `_reset` **reasigna `_defaultValues` salvo con `keepDefaultValues`** (`:2439-2441`) |

**ESA ÚLTIMA LÍNEA ES LO QUE PROTEGE LA VÍA DE GUARDADO** y por eso está medida: el editor
marca «guardado» haciendo `reset(draft)` tras guardar (`EditorPage.jsx:719`). Un deshacer sin
`keepDefaultValues` **volvería a declarar guardado el estado deshecho** y el aviso de cambios
sin guardar mentiría.

### 3.4 DÓNDE VIVE EL ESTADO DEL BORRADOR — **POR DOCUMENTO ENTERO**

**Medido: hay UN SOLO `useForm` en todo el editor**, `EditorPage.jsx:253`, con
`resolver: zodResolver(DraftSchema)` y `defaultValues: createEmptyDraft()`. Ni un `useForm`
más, ni un `FormProvider`, ni `useFormContext`.

```
EditorPage.useForm  ->  { lesson, webBlocks[], slideBlocks[] }   <- EL BORRADOR ENTERO
   |- useFieldArray('webBlocks')       bloques web
   |- useFieldArray('slideBlocks')     bloques slide
   |- useWatch({control})              -> `values`, que alimenta la vista previa
   \- AutoSaveManager(control)         -> useWatch -> localStorage 'jame_draft_buffer'
```

**Ni por campo ni por bloque: por DOCUMENTO.** Los bloques no tienen estado propio; son
índices dentro de dos arreglos de un único formulario. **Por eso una pila de documento es la
forma natural aquí y no una imposición**: cualquier otra granularidad habría que inventarla.

**La vía de autoguardado, medida:** `AutoSaveManager.jsx` — `useWatch({control})` y un
`useEffect` que escribe `localStorage['jame_draft_buffer']` en cada cambio con contenido útil.
**La vía de guardado formal:** `handleSaveDraft` → `saveToServer(draft, activeTab, ruta)` →
`saveToBuffer(draft)` → `reset(draft)`.

**Y un detalle medido que decidió la forma de la escritura de vuelta:** se replicó el
**rastreador de valor de React** (el `inputValueTracking` de ReactDOM: `get`/`set` en la
instancia delegando en el descriptor del prototipo) y se comprobó cuál de las vías lo deja
obsoleto, que es la condición para que React entregue `onChange`:

| Vía | ¿deja obsoleto el rastreador? | ¿React dispara `onChange`? |
|---|---|---|
| `execCommand('insertText')` | **sí** | **sí** |
| deshacer nativo (`inputType: historyUndo`) | **sí** | **sí** |
| rehacer nativo (`inputType: historyRedo`) | **sí** | **sí** |
| setter del prototipo (lo que hace el insertor) | **sí** | **sí** |
| `element.value = x` a secas | **no** | **no** |

**El comentario que el run del insertor dejó escrito en `writeUncontrolledValue` es correcto y
queda confirmado por medición.** Y los eventos que emite deshacer/rehacer nativos son
`isTrusted: true`.

---

## 4. LAS TRES RUTAS, COMPARADAS CON NÚMEROS

### RUTA A — usar lo que la librería de formularios ya ofrece

| | |
|---|---|
| **Archivos que toca** | ninguno |
| **Qué cubre** | **NADA** |
| **Qué NO cubre** | todo |
| **Qué añade al paquete** | 0 kB |
| **Qué rompe** | nada |

**MEDIDA Y MUERTA: cero ocurrencias de `undo|redo|history` en todo el `dist/` de React Hook
Form 7.75.0** (§3.3). No es que sea insuficiente: **no existe**.

### RUTA B — pila propia sobre el estado del borrador ← **LA ELEGIDA**

| | |
|---|---|
| **Archivos que toca** | **5**: 2 nuevos (`utils/draftHistory.js` 205 líneas, `hooks/useDraftHistory.js` 175) + 3 modificados (`EditorPage.jsx` 1053→1082, `TopBar.jsx` 442→474, y el test nuevo) |
| **Qué cubre** | **los 81 escritores del censo, sin excepción**: tecleo, escritura del insertor, añadir/borrar/mover bloques, selectores de color, desplegables, filas de tabla, pasos, términos, nodos. Y **alcanzable por control visible Y por atajo**, en todo el editor |
| **Qué NO cubre** | la **posición del cursor** (restaurar vuelve a montar los campos y el foco se pierde); la **granularidad por carácter** dentro de un campo, que pasa a ser por ráfaga; lo que **no es borrador** —paleta guardada, biblioteca de iconos, ancho de panel, pestaña activa—; y **no sobrevive a recargar**, porque vive en memoria |
| **Qué añade al paquete** | **+4,07 kB** (gzip **+1,24 kB**) en JS y **+0,16 kB** (gzip +0,03) en CSS. **MEDIDO CON DOS BUILDS REALES** (§7) |
| **Qué rompe** | **una cosa, y hay que aprobarla:** Ctrl+Z dentro de un campo de texto deja de deshacer carácter a carácter. Es el precio de que mande **una sola** pila (§5.2) |

### RUTA C — que cada escritura programática se registre en la pila nativa

| | |
|---|---|
| **Archivos que toca** | **1**: `InlineFormulaField.jsx`, unas 10 líneas — sustituir `writeUncontrolledValue` por `setSelectionRange` + `document.execCommand('insertText', …)` |
| **Qué cubre** | **el caso exacto del operador, y lo cubre bien.** Medido: produce **byte a byte el mismo valor** que el empalme actual —se comparó contra `withReplacement(text, start, end, frag)` en los dos casos, inserción en el cursor y sustitución de selección, y salió `true` en ambos—, deja el cursor en el mismo sitio, y **deshacer revierte exacto** |
| **Qué NO cubre** | **los otros 80 escritores.** Añadir un bloque, borrarlo, moverlo, cambiar un color, un desplegable, una fila de tabla: **nada de eso toca la pila de texto de ningún campo, y nunca lo hará**. Y medido: la pila nativa **es por elemento y sigue al foco** (§3.1-E), así que **un botón visible en la cabecera no puede funcionar de forma fiable** —con el foco fuera de todo campo editable, `queryCommandEnabled('undo')` es `false`—. Tampoco se controla la **granularidad** (§3.1-F) |
| **Qué añade al paquete** | **~0 kB** (sustituye código por código) |
| **Qué rompe** | nada. `execCommand` está **deprecado** pero es la vía que usan todos los editores de texto del navegador; funcionó en Chromium 148 sobre `<textarea>` y sobre `<input type=text>` |

### POR QUÉ SE ELIGE B, Y POR QUÉ NO LAS OTRAS

**A no existe.** No hay decisión que tomar.

**C NO PUEDE CUMPLIR EL CRITERIO 4.** El criterio dice, literalmente, *«EL ALCANCE ES EL
EDITOR, NO UN CAMPO»* y *«alcanzables por control visible y por los atajos habituales»*. La
ruta C es **por campo por construcción** —la pila nativa vive en el elemento— y su control
visible **depende del foco**, cosa que se midió y falla. Cubriría 1 de 81 escritores.

**Y hay una razón más dura, que sólo apareció al medir: B y C NO PUEDEN CONVIVIR.** Si la
pila nativa sigue viva dentro de los campos y además hay una pila de documento, **un solo
Ctrl+Z dispararía las dos** y el resultado sería un doble deshacer impredecible: exactamente
el «restaura estado viejo sobre trabajo nuevo» del criterio 6. Se buscó una salida —activar
la nuestra sólo cuando la nativa no tenga nada— y **se midió que no es posible**:
`queryCommandEnabled('undo')` devuelve `true` incluso cuando deshacer no hace nada (§3.1-C).
**No hay forma fiable de preguntarle al navegador si le queda algo.** Por tanto: **una sola
pila, la nuestra, y se le quita el evento al navegador con `preventDefault`.**

**Se implementa B. C se descarta escrita, con su medición entera guardada aquí** por si el
operador prefiere el arreglo mínimo en vez del alcance completo: es un cambio de 10 líneas y
la equivalencia byte a byte con el empalme actual **ya está comprobada**. **No se decide aquí.**

---

## 5. LO CONSTRUIDO

### 5.1 El módulo puro — `features/editor/utils/draftHistory.js` (205 líneas)

Sin React, sin dependencias, **cero imports**. Estado inmutable `{ entries, index }`.
`entries[0]` es el documento tal como se cargó.

`createDraftHistory` · `resetDraftHistory` · `recordDraftHistory` · `undoDraftHistory` ·
`redoDraftHistory` · `canUndoDraftHistory` · `canRedoDraftHistory` ·
`currentDraftHistorySnapshot` · `isSameDraftSnapshot` · `resolveDraftHistoryShortcut` ·
`isShortcutOwnedByAnotherStack`.

**Las tres guardas contra el riesgo del criterio 6, cada una con su test:**

1. **Nunca se fusiona sobre `entries[0]`.** Si se pudiera, la primera tecla pisaría el
   documento cargado y deshacer no tendría a dónde volver.
2. **Registrar una instantánea igual a la vigente es NO-OPERACIÓN.** Es lo que impide que el
   propio `reset` de un deshacer se apile como edición nueva y mate el rehacer. La igualdad
   es **estructural, no por `JSON.stringify`**: el orden de claves puede cambiar tras un
   `reset` y comparar cadenas produciría entradas duplicadas.
3. **Registrar después de deshacer TRUNCA la cola de rehacer.**

Más: **límite de 50 entradas**, descartando siempre las más viejas.

### 5.2 El cableado — `features/editor/hooks/useDraftHistory.js` (175 líneas)

Sólo importa `react`. Se engancha a `values`, la señal de cambio de `useWatch` **que ya
existía** en `EditorPage.jsx:268`: **no se abre una segunda suscripción**.

- **Ventana de silencio de 450 ms.** Un cambio dentro de ella se fusiona; uno fuera apila su
  propia entrada. **Una escritura del insertor cae siempre fuera** —el autor estuvo segundos
  dentro del editor visual—, así que **tiene siempre su propio paso de deshacer**. Es lo que
  hace que el paso 1 del packet dé exactamente lo que debe dar.
- **Restaurar es `reset(snapshot, { keepDefaultValues: true })`** (§3.3).
- **La supresión durante el aplicado guarda la INSTANTÁNEA, no un booleano.** Un booleano que
  nadie consumiera se tragaría la siguiente edición de verdad; guardando la instantánea la
  guarda **se corrige sola**, porque una edición real nunca es igual a lo que se acaba de
  aplicar. La no-operación por igualdad de §5.1 es la segunda red.
- **Atajos sobre `document`**: Ctrl/Cmd+Z, Ctrl/Cmd+Shift+Z, Ctrl+Y. Con `preventDefault`,
  porque manda una sola pila (§4).
- **Y se aparta donde el atajo no es suyo**: `<math-field>`, cualquier descendiente de uno, y
  cualquier `[role="dialog"][aria-modal="true"]`. **El editor visual conserva su pila.**

### 5.3 Los tres modificados

| Archivo | Cambio | Alcance |
|---|---|---|
| `EditorPage.jsx` | 1 import, el hook, 6 llamadas a `resetDraftHistoryStack` en los seis cambios de documento, 4 props a la cabecera | 1053 → **1082** líneas |
| `components/layout/TopBar.jsx` | 2 iconos, 4 props, `renderHistoryButtons()` y sus dos puntos de pintado | 442 → **474** líneas |
| `compiler-api/tests/webEditorUndoRedoGlobal.test.mjs` | **NUEVO**, 490 líneas, **15 tests** | — |

**`WebBlockEditor.jsx` NO se tocó: sigue en 4118 líneas**, con sus 7
`<InlineFormulaField>` en las mismas líneas. **`InlineFormulaField.jsx` NO se tocó**, y hay
un test que lo fija.

### 5.4 Los seis cambios de documento que limpian la pila — y los dos que NO

**Limpian** (`resetDraftHistoryStack`): `handleRestoreDraft`, `handleDiscardDraft`,
`switchFlow`, `handleCreateLesson`, `handleLoadDraft`, `handleDeleteDraft`. **Si no lo
hicieran, deshacer restauraría el documento ANTERIOR sobre el actual** — el daño exacto que
este run existe para impedir.

**NO limpian**, y es deliberado: `handleSaveDraft` y `handleCompileActiveMode`. Sus `reset`
sólo **re-basan** el mismo documento. Borrar ahí le quitaría al autor su deshacer sin motivo.
**Hay un test que fija las dos listas.**

---

## 6. QUÉ QUEDA DENTRO Y QUÉ QUEDA FUERA — DECLARADO CON PRECISIÓN

**DENTRO:**

- lo que el autor **teclea** en cualquier campo del borrador;
- lo que **el insertor de fórmulas escribe** por él;
- **añadir, borrar y mover bloques**; añadir y quitar ítems de detalles, comparador y lista
  con etiquetas;
- **selectores de color** (token y hex personalizado), desplegables de variante, modo,
  tamaño, nivel de encabezado;
- **filas de tabla, pasos de secuencia, términos, nodos de jerarquía, columnas**;
- alcanzable por **dos botones visibles en la cabecera** —en modo ancho y compacto— y por
  **Ctrl/Cmd+Z, Ctrl/Cmd+Shift+Z y Ctrl+Y**.

**FUERA, y se dice en vez de dejarlo ambiguo:**

- **La posición del cursor y la selección.** Restaurar vuelve a montar los campos; el foco se
  pierde. **La ruta elegida no puede cubrirlo** sin guardar además foco y offsets por
  instantánea, que es otro run.
- **La granularidad por carácter dentro de un campo.** Pasa a ser **por ráfaga** (~450 ms).
  **Es un cambio de conducta y el packet lo pone a aprobación expresa.**
- **Todo lo que no es el borrador**: la paleta de colores guardada en el servidor, la
  biblioteca de iconos, el ancho del panel, la pestaña activa, el explorador. No son estado
  del documento.
- **No sobrevive a recargar la página.** La pila vive en memoria. El autoguardado sigue
  conservando el **contenido**, pero no el historial.
- **El interior del editor visual de fórmulas.** Tiene su pila y la conserva.

---

## 7. EL PAQUETE — MEDIDO CON DOS BUILDS REALES, NO HEREDADO

Se reconstruyó el estado **previo** a este run —los dos archivos nuevos apartados fuera del
repo y las adiciones retiradas de los otros dos— y se construyó de verdad. Después se
restauró y se volvió a construir.

| Recurso | **Antes** | **Después** | Diferencia |
|---|---|---|---|
| `dist/assets/index-*.js` | **762,12 kB** (gzip 209,95) | **766,19 kB** (gzip 211,19) | **+4,07 kB** (gzip **+1,24**) |
| `dist/assets/index-*.css` | **75,46 kB** (gzip 13,45) | **75,62 kB** (gzip 13,48) | **+0,16 kB** (gzip +0,03) |
| `dist/assets/mathlive.min-_xLHa7o0.js` | 808,02 kB | 808,02 kB | **0 — mismo hash** |

**El «antes» casa AL DÍGITO con la cifra que `RETIRO` §3.6 dejó fechada** (762,12 / 209,95 /
75,46). Es una confirmación independiente en las dos direcciones: la reconstrucción es fiel y
aquella medición era correcta.

**Restauración verificada por md5 contra los respaldos previos**, los cuatro archivos
**IDÉNTICOS**. Los respaldos vivieron en el scratchpad de sesión, **fuera de los dos repos**.

`eslint .` sobre `editor-ui`: **limpio** en los dos estados.
`vite build`: **correcto** en los dos, con el aviso preexistente de tamaño de chunk.

---

## 8. LOS TESTS

### 8.1 El archivo nuevo — 15 declaraciones

```bash
node --test tools/author-lite/compiler-api/tests/webEditorUndoRedoGlobal.test.mjs
```

```
✔ a programmatic write is undoable: the tool-written text goes onto the stack like any edit (1.7077ms)
✔ undo and redo return exactly the text before and after, byte for byte (0.2072ms)
✔ undo does not step on later work: a new edit after undo truncates the redo tail (0.1891ms)
✔ re-recording the state already on top is a no-operation, so undo never takes a false step (0.1643ms)
✔ coalescing groups a typing burst but NEVER overwrites the loaded document (0.178ms)
✔ changing document resets the stack, so undo can never restore the previous lesson (0.1594ms)
✔ the stack is bounded and drops the oldest entries, never the newest (0.5984ms)
✔ the stored draft format is untouched: only whole snapshots travel, and they round-trip (0.1843ms)
✔ the visual formula editor keeps its own stack: the shortcut is not taken inside it (5.2966ms)
✔ the usual keyboard shortcuts are recognised, and nothing else is (0.312ms)
✔ undo and redo are reachable by a visible control and by the keyboard (1.3261ms)
✔ the save path is protected: restoring keeps the saved baseline instead of re-declaring it (2.5275ms)
✔ every document swap clears the stack, and the ones that only re-baseline do not (0.9149ms)
✔ the inserter is reached without reopening it: its write is not touched, only made undoable (0.7719ms)
✔ no new dependency: the stack is written with what the project already has (1.6186ms)
ℹ tests 15
ℹ suites 0
ℹ pass 15
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 101.8952
```

**Cobertura contra el criterio 8, punto por punto:**

| Lo que el criterio pide | Test |
|---|---|
| una escritura programática se puede deshacer | `a programmatic write is undoable…` — y usa **el empalme de verdad**, `classifyInlineFormulaSelection` + `spliceInlineFormula`, no una cadena inventada |
| deshacer y rehacer devuelven exactamente el texto anterior y posterior | `undo and redo return exactly the text before and after, byte for byte` |
| no pisa trabajo posterior | `undo does not step on later work…` + `re-recording the state already on top…` + `changing document resets the stack…` |
| la pila del editor visual sigue independiente | `the visual formula editor keeps its own stack…` |

Los otros siete fijan lo que la medición encontró y no se puede suponer: el formato del
borrador, la vía de guardado, los atajos, los controles visibles, el límite de la pila, que el
insertor no se reabre, y que no entra ninguna dependencia.

**FRONTERA DECLARADA: no se ejecuta React ni un navegador en los tests.** El módulo puro se
ejecuta de verdad; el cableado se afirma sobre el **código fuente**, que es el método que ya
usan los demás tests de esa carpeta. Lo que el autor ve lo verifica el packet.

### 8.2 Lo tocado y lo directamente relacionado — **NO la suite completa**

**30 archivos**: el nuevo, los 13 del bloqueo, los 16 del montaje, los 10 de las reglas de
selección, los del insertor y el campo inteligente, y **todos los que leen el código fuente de
`EditorPage.jsx`, `TopBar.jsx`, `AutoSaveManager.jsx`, `WebBlockEditor.jsx` o
`features/editor/utils`** — localizados por barrido, no por memoria.

```
ℹ tests 345
ℹ suites 0
ℹ pass 345
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 1367.1468
```

**345 de 345 en verde.**

### 8.3 ALGO VERDE SE PUSO ROJO — Y SE REPORTA

**Sí ocurrió, y se dice antes que nada.** En la primera tanda:

```
✖ Smart Formula Field productive UI remains rule-only and WebBlockEditor has no MathLive import
  actual:   [ '…/web/WebBlockEditor.jsx', '…/editor/utils/draftHistory.js' ]
  expected: [ '…/web/WebBlockEditor.jsx' ]
  webRuleSmartFormulaFieldRulePilot.test.mjs:383
```

**Diagnóstico: NO era una regresión de conducta.** Ese test barre **por texto** todos los
archivos de `features/editor` buscando el identificador del componente del editor visual, para
fijar que sólo se alcanza desde la regla matemática. Mi archivo nuevo casaba **por una mención
en un COMENTARIO** que citaba dónde vivía el único deshacer previo. No hay import, ni render,
ni referencia en código.

**Se arregló EN MI ARCHIVO, no en el test.** El comentario ahora describe la ubicación sin el
literal, y deja escrito por qué. **No se tocó, no se relajó y no se borró ninguna aserción ya
verde.** Tras el cambio: verde. **Es una colisión de un barrido de texto con un comentario, y
queda escrita aquí para que la próxima vuelta no la repita.**

### 8.4 LA COMPROBACIÓN DE MORDIDA — dos mordidas, con su rojo y su restauración

**MORDIDA 1 — se quita el truncado de la cola de rehacer** (`entries.slice(0, index+1)` →
`entries.slice(0)`), que es literalmente el defecto que destruye trabajo:

```
✖ undo does not step on later work: a new edit after undo truncates the redo tail
ℹ tests 15 | pass 14 | fail 1
```

**Muerde, y muerde sobre el riesgo propio del criterio 6.**

**MORDIDA 2 — se quita `resetDraftHistoryStack` de `handleLoadDraft`**, o sea la pila
sobrevive al cambio de lección:

```
✖ every document swap clears the stack, and the ones that only re-baseline do not
ℹ tests 15 | pass 14 | fail 1
```

**Muerde, y muerde sobre el otro modo de destruir contenido: restaurar una lección sobre otra.**

**Restauración verificada byte a byte con `diff` y md5 contra los respaldos previos a las
mordidas: los tres archivos IDÉNTICOS** (`f015d5ae…`, `d67b66ff…`, `ce887e36…`). Los 15 y los
345 vuelven a estar en verde y `eslint` limpio. **Los respaldos vivieron en el scratchpad de
sesión, fuera de los dos repos.**

---

## 9. LA VERIFICACIÓN DEL CRITERIO 5 — LO QUE NO PUEDE ROMPERSE

| Lo que no puede romperse | Cómo se verificó | Resultado |
|---|---|---|
| **Deshacer dentro del editor visual de fórmulas** | (a) sus controles siguen en pie y siguen siendo comandos del propio mathfield; (b) el atajo se aparta ante `<math-field>` y ante cualquier diálogo modal; (c) los 16 tests del campo inteligente y los 21 de su estabilidad de contrato siguen verdes | **INTACTO.** Y **no se tocó ni una línea** de `math-authoring/` |
| **El formato del borrador guardado** | sólo viajan instantáneas enteras; test de ida y vuelta que compara **estructura y serialización**; los 13 tests del bloqueo de conducta siguen verdes | **INTACTO.** No se tocó el compilador, los renderers ni ninguno de los dos esquemas |
| **La vía de guardado y el autoguardado** | `keepDefaultValues: true` medido contra el código de RHF (§3.3); test que lo fija; `AutoSaveManager.jsx` **sin tocar** y con un test que afirma que no sabe de la pila; guardar y compilar **no** limpian la pila, y hay test | **INTACTO** |

**No hizo falta tocar ninguna de las tres. No se disparó la parada del criterio 5.**

---

## 10. VALIDADOR — SALIDA COMPLETA

Ejecutado por **la vía que no escribe**, desde `projects/cantu-studio`:

```bash
node tools/project-console/validate-project-console-state.mjs
```

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

**Cifras reales leídas de la salida — el ticket no las daba a propósito:**

- **total de runs: 71**
- **`history=30`**
- **`ready_next=15`**
- otros grupos: `needs_human_decision=0`, `now=1`, `later=25`
- 7 objetivos / 28 fases

**Recuento propio sobre `roadmap.json`, independiente:** 71 runs — `completed=30`,
`planned=40`, `active=1`. **`completed=30` casa con `history=30`, y 30+1+15+25 = 71.**
`queue_order` denso `1..71`, sin hueco ni repetido. El único `active` es el `queue_order 29`.

**Movimiento contra el record anterior:** `RETIRO` §9 dejó `history=30`, `now=0`,
`ready_next=16`, `later=25`. Hoy: `history=30`, **`now=1`**, **`ready_next=15`**, `later=25`.
**El run 29 pasó de `ready_next` a `now`** porque el operador lo activó. `history` no se movió.

**El aviso no bloqueante de la dependencia externa apareció, es el conocido y legal, no es
hallazgo y NO se reparó** (§13).

**`Docs indexed: 149` no se movió, y es lo correcto:** el packet nuevo se escribió junto a los
otros dieciséis pero **`.aiw/docs/docs_index.json` NO se tocó** —md5 `bc708a5847f66291ea1cd719eb6a0ecb`,
el mismo que dejó el record anterior—.

---

## 11. EL PACKET DE QA

```
projects/cantu-studio/docs/_historical_run_record/RUN-CANTU-EDITOR-UNDO-REDO-001-OPERATOR-QA-PACKET.md
```

**Colocado junto a los otros dieciséis packets. `.aiw/docs/docs_index.json` NO se tocó.**

**Diez comprobaciones. Los dos pasos de parada van primero:**

- **Paso 1 (parada) — EL CASO EXACTO QUE EL OPERADOR MIDIÓ**: teclear prosa en una **Nota
  destacada**, insertar una fórmula, y pulsar **Ctrl+Z en el campo de prosa**. Se espera que
  desaparezca la fórmula entera **y que el texto tecleado siga ahí**.
- **Paso 2 (parada) — DESHACER NO DESTRUYE TRABAJO POSTERIOR**: teclear detrás de la fórmula
  y deshacer una vez. Se espera que se vaya **sólo** lo tecleado después y que **la fórmula
  no se pierda**.
- Pasos 3 a 10: la pila del editor visual, los controles visibles y cuándo se apagan, bloques
  enteros, cambio de bloque, **guardar**, **abrir otra lección**, **recargar**, y los demás
  controles.

**Etiquetas de plataforma, DERIVADAS de `blockCatalog.js` y no inventadas:**

| `id` en el catálogo | `label` VERBATIM |
|---|---|
| `web-callout` | **Nota destacada** |
| `web-details` | **Nota desplegable** |
| `web-card` | **Tarjeta** |
| `web-concept-grid` | **Comparador de conceptos** |
| `web-rule` | **Regla matemática** |

**UNA ETIQUETA NO ENCONTRADA, Y NO SE INVENTA:** los dos botones nuevos viven en la **cabecera
del editor**, que **no es un bloque del catálogo y no tiene etiqueta de plataforma**. El
packet los identifica por su `aria-label` —**Deshacer** y **Rehacer**— y por su tooltip.

---

## 12. LAS CIFRAS DEL TICKET — VERIFICADAS UNA A UNA

| Cifra | Cómo se verificó | Resultado |
|---|---|---|
| **Cinco campos de prosa** | leídos los 7 sitios uno a uno: `details.items[].content`, `callout.content`, `card(normal).content`, `conceptGrid.items[].content`, `rule.description` | **CONFIRMADA — 5** |
| **Siete sitios del insertor** | recuento de `<InlineFormulaField` en `WebBlockEditor.jsx`: `:1162, :1874, :1914, :2468, :2630, :3981, :4076` | **CONFIRMADA — 7** |
| **Ocho colocaciones** | `COLUMN_CHILD_OPTIONS` (ocho hijos, sin `details` ni `conceptGrid`) + las **dos** invocaciones de `CardFields` (`:1933`, `:3962`) | **CONFIRMADA — 8**: details 1 · callout 2 · card 2 · conceptGrid 1 · rule 2 |
| **Trece tests del run del bloqueo** | recuento de `^test(` **y** ejecución | **CONFIRMADA — 13, y 13 en verde hoy** |
| **Recuento de la suite** | recuento estático de `^test(` sobre los `.test.mjs` | **36 archivos, 404 declaraciones — RECUENTO ESTÁTICO, NO resultado de ejecución** |

**La suite — lo que afirmo y lo que no.** **36** archivos, **404** declaraciones a principio de
línea. Sin `t.test(` (0) ni `describe(` (0): no hay subtests que inflen la cifra. Casa con el
`389 + 15` de este run, y el 389 casaba con el `379 + 10` del anterior. **NO afirmo «404 en
verde»**: eso exigiría correr la suite entera, que el ticket excluye. **Lo ejecutado y verde
son 345 tests en 30 archivos.**

**Otras cifras, medidas de paso:** `WebBlockEditor.jsx` sigue en **4118** líneas.
`InlineFormulaField.jsx`, **230**. `inlineFormulaSplice.js`, **309**. Las tres coinciden con
los records previos y **ninguna se movió en este run**.

---

## 13. QUÉ **NO** SE HIZO

**Por prohibición explícita del encargo:**

- **No se añadió ninguna dependencia.** El módulo puro no importa nada; el cableado sólo
  `react`; la cabecera sigue con `react` y `lucide-react`. **Hay un test que compara la lista
  entera de `dependencies` del `package.json` contra la de antes.** La compuerta del criterio
  3 **no se disparó**: la ruta elegida no necesita ninguna.
- **No se tocó** el compilador, los renderers, los dos esquemas ni el formato del dato
  guardado.
- **No se reabrió el insertor.** `InlineFormulaField.jsx` y `inlineFormulaSplice.js` **sin una
  línea de cambio**, y hay un test que lo fija —incluida su lista exacta de imports—.
- **No se tocó el control compartido de área de texto.** `TextAreaField.jsx` sigue en sus 31
  líneas y el test del run anterior que lo fija sigue verde.
- **No se rediseñó el editor.** No se movió ningún campo, ningún bloque ni ninguna superficie.
- **No se tocó** `.aiw/docs/docs_index.json` —md5 verificado antes y después—,
  `component_status.json`, la Definition of Done, los contratos ni la Guía de componentes.
- **No se tocó el roadmap canónico, `.project/`, ni el status de ningún run. No se re-emitió
  `.project/`.** No se insertó, movió, renumeró ni clasificó ningún run.
- **No se revalidó ningún componente.**
- **No se ejecutó Git. No se levantó ningún servidor. No se corrió la suite completa.**

**Por decisión de alcance, con su porqué:**

- **No se implementó la ruta C.** Su medición completa queda en §4 por si el operador prefiere
  el arreglo mínimo; **la decisión es suya y no se toma aquí**.
- **No se persiste la pila.** Recargar la vacía. Persistirla exigiría decidir cuánto historial
  guardar y dónde, y es otro run.
- **No se restaura el cursor.** Exigiría guardar foco y offsets en cada instantánea (§6).
- **No se tocó ninguno de los 20 huérfanos**, ni `LessonContextBar.jsx` ni la carcasa
  `FormulaInserterShell.jsx`, que sigue con cero importadores.

**Por límite de la medición, declarado:**

- **No se ejecutó la interfaz completa.** El navegador se usó para una **sonda aislada**, no
  para el editor: eso habría exigido levantar el servidor, que está fuera de alcance. **No
  afirmo nada sobre lo que se ve en pantalla**; eso es lo que el packet existe para comprobar.
- **No se ejecutó React en ningún test.**
- **La medición del navegador es de UN motor, Chromium 148.** No afirmo nada sobre Firefox ni
  Safari. Es el motor en el que trabaja el operador, así que cubre el caso real, pero la
  frontera se dice.
- **No se pudo sintetizar una pulsación real de Ctrl+Z** (los eventos de teclado desde script
  no son de confianza). Se midió `document.execCommand('undo')`, que es **el mismo comando de
  edición** al que el atajo llega. Que el atajo físico funcione lo comprueba el packet.
- **La suite es un recuento estático** (§12), no un resultado de ejecución.

**Una observación medida que NO se reparó:** los dos archivos nuevos quedan con finales de
línea **LF**, mientras 93 de los 110 archivos de `editor-ui/src` son **CRLF**. Los otros 5 LF
puros son precisamente los que creó el run del insertor. **Es cosmético, no rompe nada, y
normalizarlo no es de este run.**

**No se reparó ninguna deriva conocida:** ni el mojibake de los dos esquemas, ni los punteros
muertos, ni el CLI local de roadmap, ni los HTML huérfanos, ni la lección de
`src/content/lecciones/` que no carga, ni los defectos sin dueño de los componentes ya
revalidados, ni el aviso de dependencia externa del validador, ni la discrepancia de
`Component statuses: 16` contra los 17 ids del catálogo, ni el `replacementText: '\\\\frac{}{}'`
doblemente escapado de `formulaInserter.actions.js:430`, ni el **anidamiento de fórmulas del
insertor**, que sigue medido y sin dueño y **no es de este run**.

---

## 14. STATUS DEL RUN — DECLARADO, NO CAMBIADO

**El run queda en `active`. Este taller NO lo cambia.** Lo cierra el operador desde la consola
global, que es el punto de serialización y la que re-emite `.project/` de forma atómica.

**Status al que debe pasar: `completed`.**

**Qué falta para llegar ahí:**

1. **Ejecutar el packet de QA** de §11. Diez comprobaciones; **las dos de parada van primero y
   la primera es su caso exacto**.
2. **DECIDIR SOBRE EL CAMBIO DE GRANULARIDAD.** Dentro de un campo de texto, Ctrl+Z pasa a
   deshacer por ráfaga y no por carácter. **Es la única conducta que este run cambia y no se
   puede evitar teniendo una sola pila** (§4). El packet la pone a aprobación expresa. **Si el
   operador la rechaza, la alternativa está medida y escrita: la ruta C**, 10 líneas, que
   arregla su caso exacto conservando el deshacer nativo por carácter, **a cambio de cubrir 1
   escritor de 81 y sin control visible fiable.**
3. **Cerrar el run desde la consola global.**

**No hay trabajo técnico pendiente dentro del alcance de este run.** La pila cubre el
documento entero, los dos controles están en la cabecera en sus dos modos, los atajos
funcionan y se apartan del editor visual, los 15 tests nuevos muerden, y los 345 de los treinta
archivos relacionados están en verde.

**Lo que queda FUERA y no bloquea este cierre:** persistir la pila entre recargas; restaurar el
cursor; el anidamiento de fórmulas del insertor; los 20 huérfanos; y la ruta C, que es del
operador y no del taller.
