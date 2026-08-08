# Reparación del selector de icono — «Nota desplegable» (`details`) — `cantu-studio`, `queue_order` 32

> Encargo de taller sobre `RUN-JAME-WEB-DETAILS-REPAIR-001`, título `Audit and implement the Details component`, `status` `active`.
> **Este record documenta una ejecución que paró una vez y se reanudó con un ticket corrector.**
> **Ningún status se cambió.** `.project/` no se re-emitió. **Git no se ejecutó.** Ningún run se insertó, movió ni renumeró.
> Segundo record sobre este componente. El primero es `REVALIDACION-COMPONENTE-NOTA-DESPLEGABLE-CANTU.md`, que fue la auditoría; este es la reparación.

**Titular:** la mitad *icon selector* del defecto registrado **queda reparada de extremo a extremo**, salvo una esquina que vive en una pieza compartida con «Tarjeta» y que el run no tenía autorizado tocar. Por el camino, **dos afirmaciones del encargo original resultaron falsas contra el disco** y el taller paró la primera vez por una de ellas.

---

## 1. Alcance original de `#32` y por qué esto no fue un run nuevo

El `full_description` del canónico dice, verbatim:

> "Audit the Details component against the color and palette compatibility contract, using the current component inventory as the starting point. Where the inventory shows the component carries hardcoded or local colors instead of the shared palette, or lacks a required integration point, implement the missing integration. Repair only what the audit and human visual QA show to be a real defect; do not rewrite accepted behavior. Verify the result by human visual QA rather than an automated test suite, since the repository has no test runner."

Tres cláusulas del propio run cubren lo que se hizo, y por eso **no hizo falta abrir un run nuevo**:

1. *«lacks a required integration point, implement the missing integration»* — el punto de integración que faltaba era el selector de icono, que «Tarjeta» ya tenía y «Nota desplegable» no.
2. *«Repair only what the audit and human visual QA show to be a real defect»* — la QA humana del operador señaló exactamente esta mitad, sobre los checks 6 y 7 del packet de la ronda 1.
3. *«do not rewrite accepted behavior»* — por eso los borradores sin icono conservan el suyo y no se tocó ninguna de las otras cuatro mitades del defecto registrado.

El run seguía `active`. Reparar dentro de un run activo, sobre el defecto que su propia QA declaró, es continuación, no alcance nuevo.

---

## 2. Qué reveló la QA humana

El packet de la ronda 1, `docs/_historical_run_record/RUN-JAME-WEB-DETAILS-REPAIR-001-OPERATOR-QA-PACKET.md`, declaró la mitad *icon selector* **VIVA** en sus checks 6 y 7:

- **Check 6:** con tres detalles en colores `def`, `wrn` y `res`, salían **tres iconos distintos que el autor no había elegido**. No existía ningún control de icono en el editor.
- **Check 7:** un detalle en **«Personalizado»** con un hex arbitrario **caía a la brújula**, porque un hex no es un token y la resolución de icono caía al token de respaldo `ctx`.

**El operador lo confirmó y pidió repararlo.** Las otras cuatro mitades quedaron como estaban: *naming* viva y sin reparar, *«Resumen» → «Título»* y *color controls* no reproducibles, y *group-vs-single* decisión abierta.

---

## 3. Este encargo paró una vez. Por qué

**Parada en el turno 1, con cero archivos modificados.** Causa: el `# Scope` del encargo listaba los dos `draftSchema.js`, `iconLibraryData.js`, `WebBlockEditor.jsx` y `renderDetails.js`, **pero no `tools/author-lite/compiler-api/services/compiler.js`**.

Medido entonces: `buildDetailsOutput` es una lista blanca cerrada que emite `summary`, `content`, `variant` y los colores derivados, y nada más. El renderizador solo ve el objeto compilado. **Sin tocar esa función, el autor habría visto el selector, el icono se habría guardado en el borrador, y las dos salidas habrían seguido pintando la brújula.** Los criterios 3, 4, 5 y 9 del encargo eran inalcanzables.

No se amplió el alcance por cuenta propia por dos razones concretas, y las dos son de gobernanza del repo, no de criterio:

- `CLAUDE.md`, Reglas de código nº5: *«No modifiques comportamiento del compiler sin instrucción explícita.»*
- `CLAUDE.md`, Disciplina de ejecución paralela: la lista de `# Scope` funciona como **contrato de superficie de escritura entre carriles** — *«NUNCA se lanzan dos runs simultáneos que toquen el MISMO archivo»*. Escribir en un archivo no declarado puede chocar con otro carril en marcha.

**La cabina emitió un ticket corrector que autorizó el archivo explícitamente**, acotado a `buildDetailsOutput` y a lo que esa función necesite, y la ejecución se reanudó.

---

## 4. Las dos afirmaciones del encargo que resultaron falsas

Van aquí para que no se repitan. **Las dos son de la cabina, ninguna es del taller**, y las dos nacieron del packet de la ronda 1.

### 4.1 La omisión del compilador

Ya descrita en §3. El encargo describía correctamente el defecto y el remedio, pero su lista de archivos omitía el único punto por el que el dato viaja del borrador a la pantalla. **Origen probable:** el encargo listaba `compiler-api/schemas/draftSchema.js` y se dio por hecho que el paquete `compiler-api` quedaba cubierto; el esquema y el compilador son archivos distintos con responsabilidades distintas.

### 4.2 El «único componente Web sin `.strict()`»

El encargo afirmaba, y la línea 131 del packet de la ronda 1 antes que él, que «Nota desplegable» era el único componente Web sin `.strict()`. **Es falso.** Recuento propio sobre los **16** esquemas de nivel superior de la unión de bloques Web, en **los dos** `draftSchema.js`, con resultado idéntico en ambos:

| | Cuenta | Cuáles |
|---|---|---|
| **Con `.strict()`** | **8** | `WebCardSchema`, `WebVisualSchema`, `WebRuleSchema`, `WebConceptGridSchema`, `WebTableSchema`, `WebArithmeticSchema`, `WebHierarchySchema`, `WebTimelineSchema` |
| **Sin `.strict()`** | **8** | `WebHeaderSchema`, `WebCalloutSchema`, `WebNarrativeSchema`, `WebListSchema`, `WebColumnsSchema`, `WebIconListSchema`, `WebVideoSchema`, **`WebDetailsSchema`** |

**Matiz medido, que cambia la lectura:** `WebHeaderSchema`, `WebListSchema`, `WebIconListSchema` y `WebNarrativeSchema` **sí** reciben `.strict()`, pero solo en su forma de hijo dentro de «Dos columnas» (`editor-ui/src/schemas/draftSchema.js:918-923`). En nivel superior no lo llevan.

**El criterio se aplicó igualmente, con otra justificación:** este run ya abría los cuatro esquemas de «Nota desplegable» para añadir el icono, y se midieron **0** borradores afectados. No porque fuera el único.

### 4.3 Los siete que siguen sin `.strict()` — para enrutar, no para reparar

`WebHeaderSchema`, `WebCalloutSchema`, `WebNarrativeSchema`, `WebListSchema`, `WebColumnsSchema`, `WebIconListSchema` y `WebVideoSchema`. Cada uno aceptará y descartará en silencio los campos que no reconozca, igual que hacía «Nota desplegable». **Son de sus propios runs. No se tocaron.**

---

## 5. Qué se añadió, archivo por archivo

**Seis archivos de código, dos de documentación.** Todo aditivo; ninguna firma existente cambió de significado.

| Archivo | Qué se hizo | Líneas finales |
|---|---|---|
| `editor-ui/src/schemas/draftSchema.js` | `icon: CardIconEnum.optional()` en `DetailsItemSchema`, más `.strict()` en él y en `WebDetailsSchema` | **317-324** y **783-787** |
| `compiler-api/schemas/draftSchema.js` | Lo mismo, gemelo | **320-327** y **811-815** |
| `editor-ui/.../constants/iconLibraryData.js` | Entrada `details` en `COMPONENT_ICON_RULES`, con `allowedIconIds: 'usable-library'`, `allowNone: true`, sin iconos reservados | **75-80**; las entradas `card` (69-74), `callout` (81-86) e `iconList` (87-92) **sin tocar** |
| `compiler-api/services/compiler.js` | `assertKnownDetailsIcon` (**427-431**) y `buildDetailsIconOutput` (**436-440**) nuevos; una línea añadida al objeto que emite `buildDetailsOutput` | uso en **453** |
| `src/builders/web/partials/renderDetails.js` | `resolveItemIcon`, y el `<div>` del icono ahora es condicional | **29-37**, uso en **83**, marcado condicional en **105-107** |
| `editor-ui/.../components/web/WebBlockEditor.jsx` | `iconLibrary` en la firma de `DetailsFields`, `IconSelectField` entre «Color» y «Contenido», y la prop en el punto de llamada | **2419**, **2472-2477**, **4229** |
| `docs/_historical_run_record/RUN-JAME-WEB-DETAILS-REPAIR-001-OPERATOR-QA-PACKET-ROUND-2.md` | Packet nuevo, 30 checks | nuevo |
| Este record | | nuevo |

### 5.1 Dónde `details` NO copia a `card`, a propósito

**`'none'` sobrevive al compilador en `details` y no en `card`.** `buildCardIconBadgeOutput` descarta `'none'` (`compiler.js:236`) y a «Tarjeta» le funciona porque su renderizador trata la ausencia como «sin icono». En «Nota desplegable» la ausencia significa **«deriva el icono del token de color»**, que es justo el defecto que se repara. Si `'none'` se perdiera, elegir «Sin icono» devolvería la brújula. **El paralelismo se rompe aquí a propósito y está comentado en el código.**

**Validación del identificador: se decidió no reutilizar `assertKnownCardIcon`.** Las dos opciones se midieron y **ninguna obliga a modificar `assertKnownCardIcon` ni `CARD_ICON_VALUES`**, así que no hubo motivo de parada:

| Opción | Coste |
|---|---|
| Reutilizar `assertKnownCardIcon` (`compiler.js:132`) | Cero código nuevo. Pero lanza `[Compiler] Icono de card no permitido: X.` — un bloque «Nota desplegable» reportaría un error que nombra a «Tarjeta» y enviaría al operador al componente equivocado |
| `assertKnownDetailsIcon` propio | Cinco líneas. **Solo lee** `CARD_ICON_VALUES`, no lo modifica. Mensaje `[Compiler] Icono de details no permitido: X.` |

**Se eligió la segunda.** El mensaje llega al operador durante «Generar Web»; misdirigirlo es exactamente el tipo de fallo que este run existe para corregir.

`CARD_ICON_VALUES`, `CARD_ICON_SCHEMA_VALUES`, `CardIconEnum` y `getCardIconOptions` **conservan su nombre**, mal puesto para un segundo consumidor pero renombrarlos toca «Tarjeta», que es otro run.

---

## 6. Lo que queda vivo y sin reparar — hallazgo nuevo de esta ronda

**La opción «Sin icono» del selector no funciona todavía, y un detalle sin icono elegido muestra «Sin icono» aunque en pantalla salga un icono.** Dos caras de la misma causa, en una pieza compartida con «Tarjeta» que el `# Scope` no incluía:

| Punto | Qué hace | Por qué le funciona a «Tarjeta» y no aquí |
|---|---|---|
| `editor-ui/.../components/common/IconPicker.jsx:90` | Al elegir «Sin icono» ejecuta `onChange(undefined)`: **vacía el campo en vez de escribir `'none'`** | En «Tarjeta» vacío **es** «sin icono». En «Nota desplegable» vacío es «deriva del color» |
| `editor-ui/.../components/web/WebBlockEditor.jsx:899` | Muestra `field.value ?? 'none'`: **con el campo vacío rotula «Sin icono»** | Mismo motivo |

**Consecuencia para el autor:** puede elegir cualquiera de los 36 iconos y funciona; **no puede elegir «ninguno»** desde el control. El valor `'none'` sí funciona de extremo a extremo si entra por «Insertar JSON» — el esquema lo acepta, el compilador lo conserva y el renderizador compone sin icono y sin hueco muerto.

**Arreglo mínimo posible, medido pero NO aplicado:** una prop opcional en `IconPicker` para que el llamante decida qué se escribe al elegir «Sin icono», y otra para el valor mostrado cuando el campo está vacío. Ambas con el valor por defecto actual, de modo que **«Tarjeta» no cambiaría en nada**. Toca `common/IconPicker.jsx`, que no está en ningún `# Scope` de este encargo, y `IconSelectField`, que sí está en un archivo del alcance pero fuera del recorte declarado (*«solo `DetailsFields`, su punto de llamada, y el enhebrado de `iconLibrary`»*).

**Queda enrutado, con los checks 25 y 26 del packet nuevo para que la QA lo confirme.**

---

## 7. El `case 'details'` muerto del motor de diapositivas — declarado, no tocado

`src/builders/slides/renderSlides.js:44-50` tiene una entrada para `details` y `detailsSlide` que **no compone nada**: devuelve el literal `<section><h1>Feature Pending: Details Slide</h1></section>`. Su propio comentario dice que `renderDetailsSlide` no existe. **No existe ningún renderizador de detalles en `src/builders/slides/components/`**, que contiene 11 renderizadores y ninguno es este.

No es un camino de diapositivas: es un marcador de posición. **Se declara para que quede enrutado. No se tocó.**

---

## 8. Todas las cifras medidas, con su unidad

### 8.1 Corpus de borradores guardados

Barrido de los dos espacios de trabajo: `src/content/author_lite/drafts` (interno) y `../cantu-lessons/drafts` (externo).

| Medida | Valor | Unidad |
|---|---|---|
| Archivos `.json` escaneados | **26** | archivos |
| Bloques `kind: "details"` | **4** | bloques |
| Ítems de detalle | **10** | ítems |
| Ítems **con** campo `icon` | **0** | ítems |
| Ítems **sin** campo `icon` | **10** | ítems |
| Campos extra en bloque `details` | **0** | campos |
| Campos extra en ítem de detalle | **0** | campos |
| Borradores afectados por `.strict()` | **0** | archivos |
| Bloques que siguen validando tras el cambio | **4 de 4** | bloques |
| Ítems que componen el icono idéntico al de antes | **10 de 10** | ítems |

Los 4 bloques viven en 3 archivos: `sandbox_theory.web.draft.json` (1 bloque / 4 ítems), `sandbox_theory_bounded.web.draft.json` (1 / 4) y `test_web.web.draft.json` (2 / 2).

### 8.2 Paridad de identificadores de icono

| Lista | Valor | Unidad |
|---|---|---|
| `Commons.ICONS` — el motor | **36** | identificadores |
| `SUPPORTED_ICON_IDS` — catálogo completo | **37** | identificadores |
| `SUPPORTED_AUTHOR_ICON_IDS` — ofrecibles al autor | **36** | identificadores |
| `DEFAULT_USABLE_ICON_IDS` | **36** | identificadores |
| `CARD_ICON_SCHEMA_VALUES` | **37** | valores (36 + `'none'`) |
| Ofrecibles que **faltan** en `Commons.ICONS` | **0** | identificadores |
| Del motor que **no** son ofrecibles | **0** | identificadores |

Los dos conjuntos de 36 son idénticos. El 37.º del catálogo es `persona-quote`, con estado `RESERVED`, y el generador de opciones lo excluye. **Ningún icono ofrecible se compone vacío.**

### 8.3 Esquemas

| Medida | Valor | Unidad |
|---|---|---|
| Esquemas Web de nivel superior en la unión | **16** | esquemas, por archivo |
| Con `.strict()` antes de este run | **8** | esquemas |
| Sin `.strict()` antes de este run | **8** | esquemas |
| Puestos en `.strict()` por este run | **4** | esquemas (2 por archivo × 2 archivos) |
| Que siguen sin `.strict()` tras este run | **7** | esquemas de nivel superior |

### 8.4 Compilador

| Medida | Valor | Unidad |
|---|---|---|
| Funciones `build*Output` en `compiler.js` | **18** | funciones |
| Modificadas por este run | **1** | función (`buildDetailsOutput`) |
| Puntos de invocación de `buildDetailsOutput` | **1** | punto (línea 1291) |
| Funciones auxiliares añadidas | **2** | funciones |

Verificado que la invocación es única: el radio de las dos funciones nuevas dentro del archivo es `details` y nada más.

### 8.5 Deriva de citas en el packet de la ronda 1

**El encargo corrector hablaba de «las seis derivas». Contadas una a una son 8, sobre 31 citas comprobadas, en 4 archivos.** La discrepancia sale de contar como una sola las dos citas de `WebDetailsSchema`, que son dos archivos distintos, y de que la fila de `«Contenido»` y `«+ Agregar detalle»` se contó junta en el informe intermedio.

| Cita de la ronda 1 | Real medido hoy | Deriva |
|---|---|---|
| `WebBlockEditor.jsx:2424` «Titulo del grupo» | **2428** | +4 |
| `:2453` «Título» del detalle | **2457** | +4 |
| `:2462` «Color» | **2466** | +4 |
| `:2470` «Contenido» | **2481** | +11 |
| `:2488` «+ Agregar detalle» | **2499** | +11 |
| `blockFactory.js:77` título de fábrica «Detalles» | **108** | +31 |
| `draftSchema.js:761-765` / `:789-793` (`WebDetailsSchema`) | **783-787** / **811-815** | +22 |

Las dos últimas derivas de `WebBlockEditor.jsx` son +11 y no +4 porque incluyen las líneas que **este run** insertó: los +4 de deriva previa más el campo «Icono». Las citas del encargo, en cambio, **coincidieron exactas las 11**, medidas antes de tocar nada.

Confirmadas correctas y sin tocar: `blockCatalog.js:5,13,55,57,598,988`, `ComponentPalette.jsx:47-48`, `AddBlockZone.jsx:15`, `ComponentPicker.jsx:150,171`, `CenterWorkspace.jsx:75,78`, `RightPanel.jsx:220`, `RealPreviewPanel.jsx:6`, `EditorPage.jsx:276`, `ComponentGuide.jsx:1894,1909`, `VariantSelect.jsx:116`, `InlineFormulaField.jsx:115`, `previewRenderer.js:4`.

### 8.6 Corrección de un dato del encargo sobre el mensaje de error

El encargo pedía como prueba del `.strict()` que un `details` con campo inventado diera `Unrecognized key(s) in object` en **«Insertar JSON»**, «igual que ya hace «Factorización»». Medido:

| Superficie | «Nota desplegable» | «Factorización» |
|---|---|---|
| **«Insertar JSON»** | `Bloque 1 (details): Invalid input` | `Bloque 1 (arithmetic): Invalid input` |
| **Guardado del borrador** | `Unrecognized key(s) in object: 'inventado'` | `Unrecognized key(s) in object: ...` |

**La paridad que pedía el encargo se cumple.** El texto que anunciaba **no existe en «Insertar JSON» para ningún componente**: el validador colapsa el detalle al elegir entre los dieciséis tipos posibles. La cadena literal aparece en la superficie de guardado. Corregido en el packet nuevo.

### 8.7 Verificación automática

| Medida | Valor | Unidad |
|---|---|---|
| Pruebas de `compiler-api/tests` ejecutadas | **436** | pruebas |
| Pasan | **436** | pruebas |
| Fallan | **0** | pruebas |
| `npm run lint` en `editor-ui` | limpio | — |
| `npm run build` en `editor-ui` | limpio | — |

Ninguna prueba existente tuvo que modificarse. Se comprobó además que «Tarjeta» sigue descartando `'none'` en el compilador, es decir, **que no cambió**.

### 8.8 Packet nuevo

| Medida | Valor | Unidad |
|---|---|---|
| Checks heredados de la ronda 1 | **22** | checks |
| De ellos, con expectativa cambiada | **5** | checks (6, 7, 14, 19, 22) |
| Checks nuevos | **8** | checks (23 a 30) |
| Total en el packet de la ronda 2 | **30** | checks |

El encargo anunciaba que cambiaban **3** (6, 7 y 19). **El taller midió que cambian 5:** el **14** enumera los controles del bloque y ahora hay uno más; el **22** comprueba la ida y vuelta a disco y ahora hay un campo más que puede perderse.

---

## 9. Estado en que queda `#32`

- **`status` sigue `active`.** No se tocó. Lo cierra la cabina desde la consola.
- **La mitad *icon selector* queda reparada** salvo la esquina de §6, que queda enrutada con los checks 25 y 26.
- **Las otras cuatro mitades siguen como estaban**: *naming* viva y sin reparar (check 14); *«Resumen» → «Título»* y *color controls* no reproducen (checks 4 y 5); *group-vs-single* decisión abierta del operador (check 8).
- **Pendiente de decisión del operador**, en orden de coste creciente:
  1. Autorizar el arreglo mínimo de `IconPicker` descrito en §6, que cierra los checks 25 y 26.
  2. Enrutar los **7** esquemas Web sin `.strict()` de §4.3.
  3. Enrutar el `case 'details'` muerto del motor de diapositivas de §7.
  4. Tomar la decisión *group-vs-single*, que sigue abierta desde la ronda 1.
