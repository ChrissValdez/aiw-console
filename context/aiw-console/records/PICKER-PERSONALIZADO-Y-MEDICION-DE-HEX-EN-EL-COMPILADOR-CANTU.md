# Picker «Personalizado» y medición del hex en el compilador

**Proyecto:** cantu-studio
**Run:** `RUN-CANTU-COLOR-SELECTOR-UNIFICATION-001` — `queue_order` 16, carril DEVELOPMENT
**Fecha:** 2026-07-31
**Tipo:** ENTREGA PARCIAL VERIFICADA, con el alcance decidido por medición y declarado.
**Estado declarado del run:** `active` — no lo cierra este encargo.

**Resultado en una línea:** la medición del criterio 2 encontró que **el compilador acepta un
`#RRGGBB` en los siete componentes candidatos, pero solo `header` y `list` lo resuelven y lo
pintan**; los otros cinco emiten el `variant` a secas y el motor cae a su mapa fijo, de modo
que darles el picker habría sido un control que le miente al autor. `header` y `list` reciben
el picker real en sus **dos colocaciones**, con el patrón exacto de `iconList`; los cinco se
miden, se reportan y **quedan con la muestra de solo lectura**. Y se midió algo que decide el
diseño: **un segundo campo `color` al estilo de `card` no sobrevive el camino de entrada** —lo
descarta el schema arriba y lo rechaza dentro de un slot de columnas—, y aunque sobreviviera,
**el compilador no lo lee**. Por eso el par token/hex vive en **un solo campo**.

---

## 1. Guarda de identidad, antes de nada

Derivada del canónico `cantu-studio/.aiw/roadmap/roadmap.json` por `queue_order`, no por
nombre. Ruta recorrida en el JSON: objetivo `O1` «Cantu Studio Web Components» / fase `O1.P1C`
«Web Components - Basics». `schema_version: jame.roadmap_v3.v0.2-progress`.

| Campo | Valor leído verbatim del canónico |
|---|---|
| `run_id` | `RUN-CANTU-COLOR-SELECTOR-UNIFICATION-001` |
| `title` | `Unify the color selector across every Web component` |
| `status` | `active` |
| `queue_order` | `16` |
| `depends_on` | `RUN-JAME-WEB-HEADER-REVALIDATION-001` |

Claves del run, completas: `run_id, queue_order, title, summary, full_description, status,
depends_on`. **No lleva clave `lane`**; `lanes[]` declara `DEVELOPMENT` con `default: true`,
luego es DEVELOPMENT. **Único match de `queue_order` 16 en todo el canónico.**

**La guarda pasa.** El título coincide carácter por carácter con el del encargo. Se sigue.

El canónico está hoy en md5 `128a233c64c44f16872dd2108f936bca`, **el mismo con que cerró la
primera ronda**. No se movió entre las dos rondas y no lo tocó este encargo.

### 1.1 El requerimiento, leído verbatim del canónico

**`title`:**

> Unify the color selector across every Web component

**`summary`:**

> Give every Web component with a color surface the same selector: a clean dropdown of the
> active palette tokens with a colour swatch beside it, sourced from the palette with no fixed
> list and no cap on token count.

**`full_description`** (se cita entero porque su última frase es la que gobierna el criterio 11):

> Every Web component that lets the author pick a colour must offer the same control, sourced
> from the active palette: a plain dropdown listing the palette tokens with a colour swatch
> shown beside the field rather than tinting the option rows, following the pattern the icon
> list editor already uses. Twelve of the seventeen components do not receive the palette at
> all and paint a fixed nine-name constant; six of those twelve share one common variant
> selector, so wiring that single piece reaches all six at once. Five component families
> additionally carry a closed enum in their schema that truncates the palette to a fixed number
> of values: split accepts three, timeline four, and the author is already at the ceiling on
> split. Header established the pattern in its own revalidation run: the closed enum was
> replaced with a token id string, the palette is read live, and a synthetic palette of
> twenty-four tokens was offered in full with nothing dropped. No count may be baked into any
> schema, selector or test: a palette may hold seven tokens or a hundred. Storage stays per
> component: a component whose field holds a token reference keeps storing the token id so it
> continues to follow the palette when a colour is edited, while a component whose field holds
> a literal hex keeps that behaviour and its documented consequence that the value is frozen
> and no longer tracks the palette. This Run unifies the authoring surface only; it changes no
> renderer and no compiled output.

Se leyeron enteros antes de tocar nada: el record de la primera ronda
(`UNIFICACION-SELECTOR-COLOR-WEB-Y-COMPUERTA-DEL-COMPILADOR-CANTU.md`), las §3, §4 y §7 del
contrato de color (`docs/reference/REFERENCE-COLOR-PALETTE-COMPATIBILITY.md`), el editor de
`card` (`CardColorField`), el de `iconList` (`common/IconListFields.jsx`) y los dos
`draftSchema.js`.

---

## 2. CRITERIO 2 — LA MEDICIÓN QUE DECIDE EL ALCANCE

**Sección propia, como manda el criterio.** El compilador se invocó directamente, saltándose el
schema, igual que la ronda anterior hizo con las compuertas. Paleta: la activa real del
operador (`cantu-lessons/metadata/color-palettes/web/metodo_cantu_2.json`, 11 tokens,
`metodo_cantu_2`). Hex de prueba: `#123456`, que **no empareja con el accent de ningún token**.

### 2.1 La tabla, por componente

| # | Componente | Campo | ¿Compila un `#RRGGBB`? | ¿Qué emite? | ¿El renderer lo pinta? | Veredicto |
|---|---|---|---|---|---|---|
| 1 | `header` | `variant` | **COMPILA** | `variant: "#123456"` **+ `color: "#123456"`** | **SÍ** — `renderHeader` prefiere `data.color` | **APROBADO** |
| 2 | `list` | `variant` | **COMPILA** | `variant: "#123456"` **+ `color: "#123456"`** | **SÍ** — `renderList` prefiere `data.color` | **APROBADO** |
| 3 | `callout` | `variant` | COMPILA | `variant: "#123456"` **y nada más** | **NO** — cae a `ctx` | **FUERA** |
| 4 | `rule` | `variant` | COMPILA | `variant: "#123456"` y nada más | **NO** — cae a `ctx` | **FUERA** |
| 5 | `table` (bloque) | `variant` | COMPILA | `variant: "#123456"` y nada más | **NO** — cae a `ctx` | **FUERA** |
| 6 | `details` | `items[].variant` | COMPILA | `variant: "#123456"` y nada más | **NO** — cae a `ctx` | **FUERA** |
| 7 | `conceptGrid` | `items[].variant` | COMPILA | `variant: "#123456"` y nada más | **NO** — cae a `roleMap.default` | **FUERA** |
| 8 | `hierarchy` | `nodes[].color` | **COMPILA** | `color: "#123456"` | **SÍ** | **YA LO TENÍA** (§5) |

Las cinco colocaciones en slot de columnas se midieron aparte y dan **exactamente lo mismo que
su gemela de nivel superior**: `col/header` y `col/list` emiten el `color` resuelto;
`col/callout`, `col/rule` y `col/table` emiten solo el `variant`.

**Salida verbatim de la sonda, nivel superior:**

```
header.variant       COMPILA  {"type":"header","level":2,"variant":"#123456","color":"#123456","title":"T"}
list.variant         COMPILA  {"type":"list","title":"T","variant":"#123456","color":"#123456",...}
callout.variant      COMPILA  {"type":"callout","variant":"#123456","content":"c"}
rule.variant         COMPILA  {"type":"rule","variant":"#123456","title":"T",...}
table.variant        COMPILA  {"type":"table","variant":"#123456","headers":["T"],...}
details item         COMPILA  {"summary":"s","content":"c","variant":"#123456"}
conceptGrid item     COMPILA  {"variant":"#123456","title":"i","terms":[],"content":"c"}
```

**Renderers reales, invocados sobre el nodo compilado:**

```
header       emite color=#123456          render: PINTA EL HEX
list         emite color=#123456          render: PINTA EL HEX
callout      emite variant only           render: CAE A CTX
rule         emite variant only           render: CAE A CTX
table        emite variant only           render: CAE A CTX
details      emite variant only           render: CAE A CTX
conceptGrid  emite variant only           render: no pinta ni el hex ni ctx (cae a roleMap.default)
```

### 2.2 Matiz honesto sobre el criterio de exclusión

El criterio 2 dice «un componente cuyo compilador **rechace** hex queda fuera». **Medido:
ninguno rechaza.** Los cinco lo aceptan y lo **descartan en silencio**, que es peor que
rechazarlo: no hay error que avise. Por eso el alcance se decide con la tercera pregunta del
propio criterio —«¿el renderer lo pinta correctamente?»—, que es la que separa un picker útil
de uno decorativo. **Se declara el matiz y se aplica el criterio por su propósito.**

Esto no es una regresión ni un hallazgo nuevo del comportamiento: es la misma asimetría que la
ronda 1 ya midió y declaró en su §6.1 —de los siete, solo `header` y `list` emiten un hex
resuelto—. Lo nuevo es que ahora decide el alcance de una función.

### 2.3 LA MEDICIÓN QUE DECIDE EL DISEÑO: un segundo campo `color` no llega

El criterio 6 pide dos campos excluyentes «como en `card`». Se midió si eso es posible sin
tocar el compilador. **No lo es, por tres barreras independientes:**

| # | Barrera | Medida |
|---|---|---|
| 1 | **El schema lo borra** | `WebDraftSchema.parse` sobre un `header` de nivel superior con `{variant:'ctx', color:'#123456'}` devuelve `{"kind":"header","level":2,"variant":"ctx","title":"T"}` — **la clave `color` desaparece** |
| 2 | **El schema lo rechaza dentro de columnas** | el mismo bloque en un slot: `Unrecognized key(s) in object: 'color'` — ahí `WebHeaderSchema` es `.strict()` |
| 3 | **El compilador no lo lee** | añadiendo la clave por la vía directa, la salida de los siete es idéntica a la de sin clave: `case 'header'` resuelve `resolveVariantAccentColor(block.variant, ...)` y `case 'callout'` emite `normalizeVariant(block.variant)`. Ninguno mira `block.color` |

Las tres se levantan solo tocando schema **y compilador**. El criterio 11 lo prohíbe y el texto
del run manda. **Por eso el par token/hex vive en un solo campo**, que es el único que el
compilador lee, y por eso la exclusión mutua no necesita `refine`: **es estructural**.

Esto es una **desviación declarada de la letra del criterio 6** —«los dos campos»— hecha para
cumplir su propósito, que el propio encargo enuncia: «un valor elegido de la paleta sigue siendo
token y sigue la paleta; solo el elegido como personalizado queda congelado». Eso es
exactamente lo que entrega el campo único, y §6 lo verifica de punta a punta. El criterio 6
prevé el caso: «**si el schema necesita expresarlo**, hazlo como `card` ya lo hace» — con un
campo no necesita expresarlo. **El informe de coste de hacerlo con dos campos está en §11.**

---

## 3. Lo que se leyó antes de escribir: los dos patrones

El criterio 3 pide combinar el **almacenamiento** de `card` con la **interfaz** de `iconList`,
sin inventar un tercero. Los dos se recorrieron línea a línea.

| | `card` — la referencia de **almacenamiento** | `iconList` — la referencia de **interfaz** |
|---|---|---|
| Dónde | `WebBlockEditor.jsx:894` `CardColorField`; schema `:626-627` | `common/IconListFields.jsx:26` `IconListColorField` |
| Campos | `colorToken` (token id) **o** `color` (`#RRGGBB`) | uno solo, `items[].color`, siempre hex |
| Exclusión | `refineWebCard` (`:650`) marca los dos si conviven; el compilador lanza (`compiler.js:151`) | n/a — un campo |
| Interfaz | desplegable + `Personalizado` + `<input type="color">` | idéntica (`:58-79`) |
| Al elegir token | `tokenField.onChange(v); colorField.onChange(undefined)` | escribe el accent del token |
| Al elegir color | `tokenField.onChange(undefined); colorField.onChange(hex)` | escribe el hex |
| Mostrar `Personalizado` | cuando `color` tiene un hex válido, **aunque coincida con el accent de un token** | cuando el hex no empareja con ningún accent |

**Lo combinado, y de quién viene cada mitad:**

- De `card`: la **semántica** —token id sigue la paleta, hex congelado, excluyentes— y su regla
  de visualización: **un hex es `Personalizado` aunque coincida con el accent de un token**,
  porque lo que lo distingue no es el color sino que dejó de seguir la paleta. Se prefirió la
  regla de `card` a la de `iconList` justo por eso: `iconList` guarda siempre hex, así que para
  él la distinción no existe.
- De `iconList`: la **interfaz completa** —desplegable limpio, `Personalizado` como última fila
  después de la paleta entera, y `<input type="color">` al lado del campo—.
- **Ninguna pieza nueva de concepto.** La única adaptación es que las dos mitades del par viven
  en un campo, forzado por §2.3.

---

## 4. La reparación entregada

### 4.1 `common/VariantSelect.jsx` — dos piezas compartidas nuevas

| Pieza | Qué es |
|---|---|
| `ColorTokenPicker` | el mismo cuadro que `ColorTokenSwatch`, con **geometría idéntica** (`h-8 w-8 shrink-0 rounded border border-zinc-200`), pero `<input type="color">`. El aspecto que el operador aprobó no se mueve; lo que cambia es que ahora se pulsa |
| `ColorTokenOrCustomField` | el control completo: desplegable de la paleta entera + fila `Personalizado` + el picker al lado. Recibe `value`/`onChange`/`onBlur`, así que sirve tanto al `Controller` de `list` como al control propio de `header` |

`getColorFieldSelection` (interno) es la regla de visualización, en un solo sitio:

```js
if (normalizeHexColor(value)) return CUSTOM_COLOR_VALUE;
return colorOptions.some((option) => option.value === value) ? value : fallbackId;
```

**`ColorTokenSwatch` y `RegisteredColorSwatch` siguen vivas y en uso**, porque son las que
conservan los cinco componentes que el criterio 2 dejó fuera.

### 4.2 El picker es opt-in, y por defecto va apagado

`VariantSelect` gana `allowCustom = false` y `ColumnColorSelectField` gana `allowCustom = false`.
Apagado, **el markup es literalmente el que ya había**: la rama del `<select>` con `register()`
y la muestra de solo lectura quedaron intactas. Solo `list` lo enciende, una vez por colocación.

| Consumidor | `allowCustom` | Resultado |
|---|---|---|
| `list` nivel superior (`VariantSelect`) | **sí** | picker |
| `list` en slot (`ColumnColorSelectField`) | **sí** | picker |
| `callout`, `rule`, `table`, `details`, `conceptGrid` | no | muestra, sin cambio |
| `callout`, `rule`, `table` en slot | no | muestra, sin cambio |
| **Superficie Slides** (`SlideCardEditor.jsx:26`) | no pasa ni `palette` ni `control` | **devuelve el `<select>` pelado**, exactamente igual que antes |

**md5 de `SlideCardEditor.jsx`: `1d8a949594f608e7d9644b2c80f09b54` antes y después.**
`SlideItemEditor.jsx`: `ae92e5f90142a2c50195c807996019a7`, y no aparece en el barrido de mtime.

### 4.3 `header` — las dos colocaciones

`HeaderColorSelect` conserva su firma —un test del run 15 la fija— y pasa a renderizar
`ColorTokenOrCustomField`. La rama de slot hace lo mismo vía `Controller`, y **conserva la
cadena literal `getHeaderColorOptions(colorPalette)`** que el mismo test exige. `getHeaderColorOptions(`
sigue apareciendo **exactamente 2 veces**, como el test pide.

`normalizeHeaderVariant` se amplió: **un `#RRGGBB` válido es un valor legítimo y se conserva**,
en vez de reescribirse a `ctx`. Un id que la paleta no tiene sigue cayendo a `ctx`, sin cambio.

**Dos piezas quedaron muertas y se eliminaron:** `resolveHeaderAccent` y el import de
`ColorTokenSwatch` en `WebBlockEditor.jsx`. Ningún test las afirmaba —la única mención de
`resolveHeaderAccent` en la suite es un comentario—, y dejarlas habría dado aviso de eslint.

### 4.4 Los schemas — dos campos, en los dos archivos

```js
variant: z.string().regex(COLOR_TOKEN_ID, "Token de color invalido")
  .or(z.string().regex(HEX_COLOR, "Color invalido (usa formato #RRGGBB)")).optional(),
```

| # | Schema | editor-ui | compiler-api |
|---|---|---|---|
| 1 | `WebHeaderSchema` | `:555` | `:568` |
| 2 | `WebListSchema` | `:727` | `:752` |

**Cuatro ediciones de campo en total, más su comentario.** El diff de los dos schemas contra su
baseline es exactamente eso y nada más. Las colocaciones en slot **no necesitaron edición
propia**: `WebColumnsChildSchema` consume `WebHeaderSchema.strict()` y `WebListSchema.strict()`.

**Los cinco de fuera conservan su campo token-only**, y un test lo fija en los dos schemas.

---

## 5. `hierarchy`, `iconList` y `card` — ya lo tenían, no se tocaron

| Componente | Recorrido contra el patrón | Estado |
|---|---|---|
| `iconList` | desplegable limpio · paleta entera · `Personalizado` · `<input type="color">` | es **la referencia**. md5 `c3c7d8a6a3b54b99158158235d942636`, sin cambio |
| `card` | `colorToken`/`color` excluyentes · `Personalizado` · picker | es **la referencia de almacenamiento**. Sin cambio |
| `hierarchy` | `HierarchyNodeColorField` (`:3395`) ya tiene desplegable + `Sin color` + `Personalizado` + `<input type="color">`, puesto por la ronda 1 | **ya cumple el criterio 4 entero.** Sin cambio |

`hierarchy` estaba en la lista del criterio 7 y **el criterio 2 lo aprueba** —su campo es hex,
el compilador lo emite y el renderer lo pinta: verificado—. **No hacía falta tocarlo**, y no se
tocó: el barrido de mtime lo confirma y su región del archivo no aparece en ningún hunk del diff.

---

## 6. Criterio 5 — el seguimiento de paleta, verificado de punta a punta

Con **la paleta activa real del operador**, moviendo el accent del token `color_2` de
`#F4B847` a `#0A7B55` **en memoria** —el archivo del operador se leyó y no se escribió: md5
`3628359e8e3d9bce51061a510b00d029` antes y después—.

| Componente | Colocación | Valor guardado | Color antes | Color después | ¿Sigue la paleta? |
|---|---|---|---|---|---|
| `header` | nivel superior | `color_2` | `#F4B847` | `#0A7B55` | **SÍ** |
| `header` | nivel superior | `#123456` | `#123456` | `#123456` | **NO — congelado** |
| `header` | en columna | `color_2` | `#F4B847` | `#0A7B55` | **SÍ** |
| `header` | en columna | `#123456` | `#123456` | `#123456` | **NO — congelado** |
| `list` | nivel superior | `color_2` | `#F4B847` | `#0A7B55` | **SÍ** |
| `list` | nivel superior | `#123456` | `#123456` | `#123456` | **NO — congelado** |
| `list` | en columna | `color_2` | `#F4B847` | `#0A7B55` | **SÍ** |
| `list` | en columna | `#123456` | `#123456` | `#123456` | **NO — congelado** |

Y el renderer real, con el hex personalizado: **`header` lo pinta, `list` lo pinta.**

**El hex congelado es la consecuencia inherente y documentada** que el contrato de color §7
enuncia —«Custom values are not palette-tracked»— y que el propio `full_description` del run
acepta. No es una pérdida de seguimiento: es la mitad hex del par, funcionando.

**Volver a token descarta el hex** por construcción: `onChange(nextValue === CUSTOM_COLOR_VALUE
? currentAccent : nextValue)` escribe el id encima del hex, en el mismo campo.

---

## 7. Criterio 6 — los dos modos nunca conviven

| Vía | Por qué no pueden convivir |
|---|---|
| **Estructural** | es **un campo**. No hay un segundo donde poner el otro valor |
| **El schema** | un `color` extra **se borra** al parsear arriba y **se rechaza** dentro de un slot (§2.3). Un test fija las dos mitades |
| **El control** | el `onChange` del desplegable y el del picker escriben **el mismo campo** |
| **El compilador** | lee ese campo y solo ese |

Frente a `card`, que necesita `refine` porque tiene dos campos, aquí **el `refine` sobraría**.

---

## 8. Criterio 8 — el requisito de cantidad, verificado otra vez

Paleta sintética construida **desde un tamaño**, en el scratchpad de sesión, fuera de los dos
repos y fuera de la paleta del operador.

| Medición | 20 tokens | 40 tokens |
|---|---|---|
| Opciones de paleta ofrecidas | **29** — los 20 más los 9 por defecto que la paleta no sobrescribe | **49** |
| Filas totales del desplegable | **30** — las 29 más `Personalizado` | **50** |
| Sintéticos **no** ofrecidos | **0** | **0** |
| Duplicar la paleta añade | — | **exactamente +20 opciones** |

**El picker no reduce el número de opciones ofrecidas: lo aumenta en exactamente uno**, y esa
fila va **después** de la paleta entera, nunca en lugar de un token. Un test lo fija:
`(body.match(/>Personalizado</g) || []).length === 1`, y `{options.map(` aparece antes.

**Ninguna cifra horneada**, barrido de los tres sitios:

| Sitio | ¿Hay cifra de cantidad? |
|---|---|
| Los cuatro campos de schema | **No.** Dos regex de forma; ningún conteo |
| `ColorTokenOrCustomField`, `VariantSelect`, `ColumnColorSelectField`, `HeaderColorSelect` | **No.** `.map` sobre la lista entera; cero `.filter`, cero `.slice`. Un test lo fija |
| Tests nuevos | **No.** La paleta se construye desde un tamaño y las aserciones son relativas |

La única constante de longitud sigue siendo `COLOR_TOKEN_ID` —**32 caracteres por id, no
cantidad de tokens**—, y `HEX_COLOR`, que es forma, no cantidad.

---

## 9. Criterio 9 — token desconocido sigue cayendo a `ctx`, en las tres capas

Con la paleta sintética de 20 y el id inexistente `azulito`:

| Capa | `header` | `list` |
|---|---|---|
| **1. Editor** — `resolveAuthorColorToken('azulito', {palette, fallbackId:'ctx'})` | accent de `ctx` | accent de `ctx` |
| **2. Schema** — el valor se acepta y **no se reescribe** | `azulito` conservado | `azulito` conservado |
| **3. Compilador** — el `color` emitido | accent de `ctx` | accent de `ctx` |

Verificado también **sin paleta**: cae al `ctx` por defecto.

**Y ampliar el campo no lo convirtió en texto libre.** Siguen rechazándose, en los dos
componentes: `''`, `'Mayus'`, `'con espacio'`, 33 caracteres, `'9leading'`, y ahora también las
tres formas de hex malo — `'#12345'`, `'#12345G'`, `'123456'`.

---

## 10. Criterio 10 — los drafts guardados siguen cargando, sin migración

**Ningún draft se tocó.** El barrido es **más ancho que el de la ronda anterior**: cubre los dos
orígenes reales del operador y los del repo, incluidas las carpetas de evidencia de QA.

| Medición | Resultado |
|---|---|
| Drafts barridos | **70** (la ronda 1 barrió 26) |
| Con `webBlocks` | **70** |
| Cargan y compilan con los schemas nuevos | **65 de 70** |
| Fallos | **5** |

Los cinco fallos son **el mismo fixture `sandbox_theory_complex` y sus cuatro copias de
evidencia**, con los **mismos dos issues preexistentes y ajenos al color** que los records
anteriores ya midieron: `webBlocks.5.columns` → «Columnas Web v1 requiere exactamente 2
columnas», y `webBlocks.5.columns.0.blocks.0` → «Unrecognized key(s) in object: 'colSpan'».

Valores hallados en los dos campos tocados, en drafts reales: `header.variant` = `ctx` ×30;
`list.variant` = `ctx` ×19, `def` ×1. **Ni un solo hex.** Migración: **ninguna, y no hacía falta
ninguna.** La paleta del operador se leyó y no se escribió.

---

## 11. Criterio 11 — «changes no renderer and no compiled output», comprobado

**No se paró, porque la medición dice que no hacía falta parar** para `header` y `list`: el
compilador ya acepta y resuelve el hex en su campo, sin tocar una línea suya. Se paró **para los
cinco** que sí lo habrían exigido, y aquí va su informe de coste.

### 11.1 La prueba de que la salida compilada no cambió

Se reconstruyó el árbol `tools/author-lite` **en el scratchpad**, se restauraron ahí los dos
schemas a su baseline, y se compilaron los 70 drafts reales con las dos versiones.

| Medición | Resultado |
|---|---|
| Drafts comparados | **70** |
| Salida compilada **idéntica** antes/después | **70 de 70** |
| Diferencias | **0** |
| md5 del compilador | `c1177c44c6db3270ba83f1817827f28f` **antes y después** |
| Renderers | **intactos**; solo se invocaron en lectura para medir §2.1 |

El único delta de comportamiento es la capacidad nueva:

```
Un #RRGGBB en header.variant:
  con los schemas de antes: ERR: webBlocks.0.variant | Token de color invalido
  con los schemas de ahora: OK
```

### 11.2 Informe de coste de lo que NO se ejecutó

Para dar el picker a los cinco de fuera, o para hacerlo con dos campos al estilo de `card`:

| Opción | Qué exige | Coste |
|---|---|---|
| **A — picker para los cinco, con campo único** | que el compilador emita un `color` resuelto para `callout`, `rule`, `table`, `details` y `conceptGrid`, como ya hace con `header` y `list` | **toca el compilador**: 5 emisores. Además **cambia la salida compilada de todo draft existente** de esos cinco: hoy no llevan clave `color` y pasarían a llevarla. Prohibido dos veces por el texto del run |
| **B — dos campos `variant`/`color` al estilo de `card`** | levantar las tres barreras de §2.3 | **toca schema y compilador**: 4 campos nuevos + `refine` en 4 schemas ×2 archivos, y el emisor de cada kind. Prohibido por el criterio 11 |
| **C — cerrar el motor Web** | que `Commons.VARIANTS` deje de ser un mapa fijo de 12 claves | **toca renderer**. Prohibido |

**Ninguna se ejecutó.** Es material para un run propio y se nombra aquí.

---

## 12. Criterio 12 — cobertura aditiva, suite y lint

### 12.1 Las cifras

| Métrica | Antes | Después |
|---|---|---|
| Suite `compiler-api` | **316 / 316**, EXIT 0 | **323 / 323**, EXIT 0 |
| De los cuales, nuevos | — | **+7** |
| Fallos | 0 | **0** |
| `eslint` (editor-ui) | **EXIT 0**, 0 avisos | **EXIT 0**, **0 avisos** |

**La cifra 316 del ticket se verificó corriéndola, y es cierta.** Comandos:
`node --test "tools/author-lite/compiler-api/tests/*.test.mjs"` y
`npm --prefix tools/author-lite/editor-ui run lint`. **No se corrió ninguna suite de
`aiw-console`.**

**Nota sobre el lint:** la primera versión exportaba `getColorFieldSelection` y eso produjo **un
aviso** de `react-refresh/only-export-components` donde la línea base tenía cero. Se dejó la
función privada al módulo y el aviso desapareció. **El lint cierra en EXIT 0 con cero avisos**,
igual que estaba.

### 12.2 El archivo nuevo — `webColorSelectorCustomPicker.test.mjs`, 7 casos

| Caso | Qué asegura |
|---|---|
| El cuadro es un control real | `ColorTokenPicker` es un `<input type="color">` con `onChange`; `iconList` es la referencia y se cita; `Personalizado` va **después** de la paleta entera |
| Solo entran los dos aprobados | `allowCustom` es opt-in y por defecto `false`; una sola colocación por componente lo enciende; **los cinco de fuera no aceptan `HEX_COLOR` en ninguno de los dos schemas** |
| **El picker guarda hex y muestra `Personalizado`** | el hex se guarda verbatim y se emite como `color`, en **las dos colocaciones**; la regla de visualización está en un solo sitio |
| **Volver a token restaura el seguimiento** | mover la paleta mueve el valor-token y **no** mueve el valor-hex, en los dos componentes |
| **Los dos campos no conviven** | un campo, sin gemelo `color` ni `colorToken` en el schema; un `color` extra **se borra arriba y se rechaza en slot**; el `onChange` escribe uno u otro |
| Cantidad | 20 y 40 tokens sintéticos ofrecidos enteros; `Personalizado` es **+1 fila**, nunca un reemplazo; cero `.filter`, cero `.slice` |
| Caída a `ctx` | las tres capas, con paleta y sin ella; y las ocho formas inválidas siguen rechazándose |

### 12.3 Los tests existentes tocados — dos aserciones, con antes/después y razón

**Ningún otro test se reescribió.** Los dos que sí afirmaban un límite retirado:

**(a) `webHeaderPaletteQuantityAndSwatch.test.mjs` — caso «both header placements keep a clean
dropdown with the swatch beside the field»**

| | Antes | Después |
|---|---|---|
| Qué afirmaba | que en las dos colocaciones de header **`</select>` va antes de `<ColorTokenSwatch …>` / `<RegisteredColorSwatch …>`** | que las dos colocaciones renderizan `<ColorTokenOrCustomField>` con su helper de paleta, y que **dentro de la pieza compartida `</select>` va antes de `<ColorTokenPicker`** |
| Por qué cambia | codificaba **que el cuadro es una muestra de solo lectura**, que es exactamente el límite que el operador manda retirar | lo que debe quedar fijado es la **geometría aprobada** —el cuadro después del campo— ahora que el cuadro es un control |
| Qué NO cambió | las cuatro aserciones de «desplegable limpio» —cero `<option style=>`, `getHeaderColorOptionStyle` ausente— y la de `useWatch` siguen intactas | |

**(b) `webSharedColorSelectorUnification.test.mjs` — caso «every component that shares the
control is wired to the palette in both placements»**

| | Antes | Después |
|---|---|---|
| Qué afirmaba | dos regex que fijaban **la lista exacta de props** de `VariantSelect` y la **firma exacta** de `ColumnColorSelectField` | las mismas dos regex con **la cola opcional** `(?: allowCustom)?` y `(?:, allowCustom = false)?` |
| Por qué cambia | fijaban que **la pieza compartida tiene una sola forma**, y este encargo la retira al hacer el picker opt-in | |
| Qué NO cambió | **el conteo sigue siendo 6 y 4**, y sigue exigiéndose que **ningún** `VariantSelect` quede sin `palette` ni `control`. Lo que el caso protegía sigue protegido | |

`webHeaderColorPaletteAuthoringSurface.test.mjs` **no se tocó**: md5
`b2d049db10274f13e81b110a6f59d0c4`, sin cambio. El control se diseñó para que sus seis casos
—incluida la cadena literal `getHeaderColorOptions(colorPalette)` en la rama de slot y el
conteo de 2— siguieran pasando **con su texto intacto**.

---

## 13. Criterio 13 — finales de línea, antes y después, declarados

**El aviso del encargo se cumplió: sí hubo una conversión, se detectó y se restauró.**

| Archivo | CRLF antes | CRLF después | Lone LF final | Último byte |
|---|---|---|---|---|
| `editor-ui/src/schemas/draftSchema.js` | 1049 | **1055** | **0** | `0x0a` |
| `compiler-api/schemas/draftSchema.js` | 1120 | **1126** | **0** | `0x0a` |
| `common/VariantSelect.jsx` | 68 | **170** | **0** | `0x3b` — **sin newline final, su convención** |
| `web/WebBlockEditor.jsx` | 4072 | **4083** | **0** | `0x0a` |
| `tests/webHeaderPaletteQuantityAndSwatch.test.mjs` | 196 | **202** | **0** | `0x0a` |
| `tests/webSharedColorSelectorUnification.test.mjs` | 376 | **379** | **0** | `0x0a` |
| `tests/webColorSelectorCustomPicker.test.mjs` | — nuevo | **357** | **0** | `0x0a` |
| `docs/.../QA-PACKET-ROUND-2.md` | — nuevo | **77** | **0** | `0x0a` |

**El incidente, declarado:** la herramienta de edición conservó CRLF en `.js` y `.jsx`, pero
**convirtió a LF los dos `.mjs` de test** —quedaron en `CRLF=0, loneLF=202` y `CRLF=0,
loneLF=379`—. Se detectó midiendo bytes antes de cerrar, **se restauró CRLF en los dos**, y la
suite se volvió a correr en verde después de la restauración. Los archivos nuevos se
escribieron con CRLF forzado desde el primer byte. **Ningún archivo tocado queda con un solo
LF suelto.**

---

## 14. Criterio 14 — lo que no se tocó

| Superficie | Estado | Evidencia |
|---|---|---|
| **Compilador** | **Intacto** | md5 `c1177c44c6db3270ba83f1817827f28f` antes y después |
| **Renderers** | **Intactos** | solo se **invocaron** en lectura para medir §2.1 |
| **Salida compilada** | **Intacta** | §11.1: **70 de 70 drafts, byte a byte** |
| **Mojibake de los schemas** | **Intacto** | los cuatro mensajes que este encargo escribe van en ASCII limpio |
| **«Full width» / «Col span»** | **Intactos** | `PlacementFields` sin cambio; no aparece en ningún hunk |
| **`docs/components/web/*.md`** | **Intactos**; `HEADER.md` md5 `90bb753cf028618ebf381cd9383f929b` | — |
| **`.aiw/docs/docs_index.json`** | **Intacto**, md5 `bc708a5847f66291ea1cd719eb6a0ecb` | el packet nuevo **NO se registró**, y se declara |
| **Superficie Slides** | **Intacta**, md5 `1d8a949594f608e7d9644b2c80f09b54` | §4.2 |
| **`split`, `timeline`, badge de `table`** | **Intactos** | no aparecen en ningún hunk del diff |
| **`iconList`** | **Intacto**, md5 `c3c7d8a6a3b54b99158158235d942636` | §5 |
| **`colorSystem.js`** | **Intacto**, md5 `77ae8a66117672bfeff9aa3b1688c7c9` | — |
| **`editorOptions.js` / `VARIANT_OPTIONS`** | **Intacto**, md5 `ae571c0c697ed41c884a85589ace7a69` | — |
| **`ColumnRegisteredSelectField`** | **Intacto** | lo comparte `split` |
| **El packet de QA de la ronda 1** | **Intacto**, md5 `c4e47c1ce3804126f9df87d73c7ae571` | es evidencia de una ronda ya ejecutada |
| **`.aiw/state/component_status.json`** | **Intacto**, md5 `f591165bbf19862b04433129d9edf2cb` | — |
| **Contrato de color** | **Intacto**, md5 `9d2affcd85f18fda92032b341e6136f8` | §17 lo nombra como desactualizado y **no lo edita** |

---

## 15. Criterio 15 — QA humana PREPARADA Y DETENIDA

`docs/_historical_run_record/RUN-CANTU-COLOR-SELECTOR-UNIFICATION-001-OPERATOR-QA-PACKET-ROUND-2.md`

**Archivo nuevo**, junto al de la ronda 1, que **no se editó**. Formato §6 de la DoD.
**Seis comprobaciones**, el máximo, autocontenidas y **organizadas por componente**.

| # | Componente | Verifica |
|---|---|---|
| 1 | `header` | **El cuadro es un control**: se pulsa, abre el picker, el desplegable pasa a `Personalizado` |
| 2 | `list` | Lo mismo, y que `Personalizado` es la **última fila**, después de la paleta entera |
| 3 | `header`, `list` en slot de columnas | La segunda colocación, idéntica a la primera |
| 4 | `header`, `list` | **Volver a token restaura el seguimiento**: mover la paleta mueve el token y no mueve el hex |
| 5 | cualquiera | **El requisito de cantidad**: añadir dos tokens y verlos en las cuatro colocaciones |
| 6 | `callout`, `rule`, `table`, `details`, `conceptGrid` | **El límite, para que se vea deliberado**: ahí el cuadro no abre nada, y por qué |

**Inglés ASCII puro, verificado con barrido de bytes: 0 bytes fuera de rango en 7 818.**
**Ninguna casilla de veredicto se rellenó.** La QA humana no se ejecutó ni se simuló.

---

## 16. Criterio 16 — validador y cifras, medidas en esta sesión

Vía que no escribe: `node tools/project-console/validate-project-console-state.mjs`.

| Métrica | Antes | Después |
|---|---|---|
| Validador | **EXIT 0** | **EXIT 0** |
| **Objetivos / fases / runs** | **7 / 28 / 74** | **7 / 28 / 74** |
| **Component statuses** | **16** | **16** |
| `Docs indexed` | 149 | 149 |
| `Docs curated primary-visible` | 60 de 149 | 60 de 149 |
| Colas | `needs_human_decision=0 now=1 ready_next=21 later=36 history=16` | idéntico |
| Etapas del run activo | `RUN-CANTU-COLOR-SELECTOR-UNIFICATION-001=none` | idéntico |
| Episodios de procedencia git | 9 | 9 |
| Avisos | **1 no bloqueante**, arista externa `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001` | **el mismo, único** |

**Component statuses: 16, sin moverse.** El único aviso es el no bloqueante de la arista
externa, que no se resolvió. **`Docs indexed` sigue en 149: el packet de QA nuevo NO se
registró**, y se declara.

---

## 17. Criterio 17 — cifras del ticket, verificadas y no creídas

| Cifra o afirmación del encargo | ¿Verificada? | Resultado |
|---|---|---|
| Suite **316** | sí, corriéndola | **cierta** antes; 323 después |
| **Component statuses: 16** | sí, dos veces | **cierta**, sin moverse |
| **7 / 28 / 74** | sí, dos veces | **cierta** |
| «El recuadro a la derecha es solo una muestra, no un selector» | sí | **cierta**: era un `<span>` con `backgroundColor` |
| «En `iconList` es un color picker real que pasa el desplegable a Personalizado» | sí | **cierta**, punto por punto (§3) |
| Contrato §3: `card` acepta `colorToken` **o** `color`, excluyentes | sí | **cierta**; el compilador lanza si conviven (`compiler.js:151`) |
| Contrato §4 paso 3: sintetiza un token desde un hex que no empareja | sí | **cierta**, y es **la razón por la que `header` y `list` funcionan sin tocar el compilador** |
| «El compilador acepta hex en los componentes candidatos» | sí | **cierta en los ocho**, y **engañosa sin la tercera pregunta**: cinco lo aceptan y lo descartan (§2.2) |
| «Los componentes tocados no tienen el picker» | sí | **cierta salvo `hierarchy`**, que sí lo tiene desde la ronda 1 (§5) |
| «`split`, `timeline` y el badge de `table` tienen compuerta cerrada» | heredada de la ronda 1, **no re-medida**; no se tocaron | se declara como **no re-verificada en esta sesión** |
| Paleta activa en `cantu-lessons/metadata/color-palettes/` | sí | **cierta**; 11 tokens, `metodo_cantu_2` |
| Records existentes | sí, contándolos | **77** antes de éste |

---

## 18. Criterio 18 — estado en que debe quedar el run

**`RUN-CANTU-COLOR-SELECTOR-UNIFICATION-001` debe quedar en `active`.**

Vocabulario del contrato, exclusivamente: `planned`, `active`, `blocked`, `completed`.

Razón: la parte que la medición aprobó está ejecutada y verificada, y su QA humana preparada,
pero **la QA la ejecuta el operador** y **quedan cinco componentes cuyo picker depende de una
decisión que no es de taller** —si el compilador entra en alcance—. No es `blocked`: el run
avanzó y entregó, y nada impide que siga. No es `completed`: eso lo decide la cabina tras la QA.

**No se tocó `status`, ni `progress`, ni `closeout_result` de ningún run.** El canónico está
byte-idéntico: md5 `128a233c64c44f16872dd2108f936bca` antes y después.

---

## 19. Criterio 19 — `.project/` no se re-emitió

**No lo re-emití.** El barrido de mtime de §20, que cubre el repo entero, **no devuelve ninguno
de sus seis archivos**, ni ningún archivo de `.aiw/`.

---

## 20. Criterio 20 — archivos escritos por este encargo, y ninguno más

Barrido de mtime de **todo el repo** de cantu-studio, excluyendo `node_modules` y `.git`, con
corte en el minuto anterior a mi primera escritura. Devolvió **exactamente ocho rutas, las ocho
mías**.

| # | Archivo | Acción | md5 final |
|---|---|---|---|
| 1 | `tools/author-lite/editor-ui/src/schemas/draftSchema.js` | **Modificado** — 2 campos | `275162cf6bea209b8450aa50a10685a6` |
| 2 | `tools/author-lite/compiler-api/schemas/draftSchema.js` | **Modificado** — los mismos 2 | `109535d843b25e92c926e2e9efbd90b8` |
| 3 | `tools/author-lite/editor-ui/src/features/editor/components/common/VariantSelect.jsx` | **Modificado** — §4.1, §4.2 | `f00668e304fbe4865f27fe5a0bcbf915` |
| 4 | `tools/author-lite/editor-ui/src/features/editor/components/web/WebBlockEditor.jsx` | **Modificado** — 9 hunks, §21 | `f7a81ff87675a17220568ecc0e1ec72e` |
| 5 | `tools/author-lite/compiler-api/tests/webHeaderPaletteQuantityAndSwatch.test.mjs` | **Modificado** — 1 caso, §12.3(a) | `c97dbdce4ceafde60cbfb248a68c69b0` |
| 6 | `tools/author-lite/compiler-api/tests/webSharedColorSelectorUnification.test.mjs` | **Modificado** — 2 regex, §12.3(b) | `1b4243d26c3e69921f82e51d759f0b6d` |
| 7 | `tools/author-lite/compiler-api/tests/webColorSelectorCustomPicker.test.mjs` | **Creado** — 7 casos | `cf0236278c51c5b3903b58692bf043d6` |
| 8 | `docs/_historical_run_record/RUN-CANTU-COLOR-SELECTOR-UNIFICATION-001-OPERATOR-QA-PACKET-ROUND-2.md` | **Creado** | `5968b7522f82f2340d948b70881a45a9` |
| 9 | `../aiw-console/context/aiw-console/records/PICKER-PERSONALIZADO-Y-MEDICION-DE-HEX-EN-EL-COMPILADOR-CANTU.md` | **Creado** | este record |

El archivo 9 se escribió después del barrido; el barrido cubre los ocho de cantu-studio.
Ningún compiler, renderer, packet de componente, índice, draft ni test ajeno fue modificado.
Los archivos temporales de medición —incluido el árbol de baseline de §11.1— viven en el
scratchpad de sesión, **fuera de los dos repos**.

**Records existentes:** había **77** antes de éste. Éste es el **78**. **Sin colisión de
nombre:** ningún otro record contiene `PICKER`, `PERSONALIZADO` ni `CUSTOM`.

---

## 21. El diff del editor, en ocho puntos

| Punto | Cambio |
|---|---|
| 1 | Import: `VariantSelect, { ColorTokenOrCustomField, RegisteredColorSwatch }`. **Fuera `ColorTokenSwatch`**, que dejó de usarse aquí |
| 2 | `normalizeHeaderVariant` acepta un `#RRGGBB` válido y lo conserva; un id desconocido sigue cayendo a `ctx` |
| 3 | **Eliminado** `resolveHeaderAccent`, muerto tras el punto 4. Ningún test lo afirmaba |
| 4 | `HeaderColorSelect` renderiza `ColorTokenOrCustomField`; **firma y `useEffect` intactos**, y sigue derivando de `getHeaderColorOptions` |
| 5 | Rama de `header` en slot: `Controller` + `ColorTokenOrCustomField`, **conservando la cadena literal `getHeaderColorOptions(colorPalette)`** |
| 6 | `ColumnColorSelectField` gana `allowCustom = false`; **apagado, su markup es el de antes, literal** |
| 7 | La colocación en slot de `list` enciende `allowCustom`. Las de `callout`, `rule` y `table` no |
| 8 | El `VariantSelect` de `list` a nivel superior enciende `allowCustom`. Los de `callout`, `rule`, `table`, `details` y `conceptGrid` no |

---

## 22. Criterio 21 — superficies disjuntas, md5 antes y después

**El árbol entero de `aiw-console` se hasheó fichero a fichero al abrir y al cerrar.**

| Medición | Antes | Después |
|---|---|---|
| Ficheros de `aiw-console` (sin `.git` ni `node_modules`) | **253** | **253** |
| md5 del manifiesto completo | **`d178b2dcae9c29479a964a7f57ea4c7b`** | **`d178b2dcae9c29479a964a7f57ea4c7b`** |
| Diferencias | — | **ninguna** |

**`aiw-console` está byte-idéntico**, incluidos `roadmap/roadmap.json`, `context/DECISIONES.md`,
`context/aiw-console/CONTRATO.md`, `.project/`, handoffs, tests y los 77 records preexistentes.
El hilo paralelo no escribió durante mi ventana. Este record es el único archivo que añado a
ese repo.

**La paleta del operador en `cantu-lessons` se leyó y no se escribió**: md5
`3628359e8e3d9bce51061a510b00d029` antes y después.

---

## 23. No-claims de este record

- **No se tocó el compilador.** md5 idéntico. La medición lo invocó, no lo modificó.
- **No se tocó ningún renderer.** Se invocaron en lectura para responder la tercera pregunta
  del criterio 2.
- **No se dio el picker a `callout`, `rule`, `table`, `details` ni `conceptGrid`**, aunque el
  criterio 7 los nombra: el criterio 2 los deja fuera y el criterio 11 prohíbe lo que haría
  falta. Se mide, se costea (§11.2) y **no se ejecuta**.
- **No se implementó el par de dos campos que pide la letra del criterio 6.** Se midió que no
  sobrevive el camino de entrada ni lo lee el compilador (§2.3). Se entrega el mismo contrato
  en un campo, con la exclusión estructural, y **la desviación se declara**.
- **No se tocó `hierarchy`.** Ya cumplía el criterio 4 entero desde la ronda 1.
- **No se tocó `iconList` ni `card`.** Son las dos referencias; se recorrieron punto por punto.
- **No se tocaron `split`, `timeline` ni el badge de `table`.** Su compuerta del compilador se
  cita de la ronda 1 y **no se re-midió en esta sesión**; se declara como heredada.
- **No se decidió el `success` de `timeline`.** Sigue abierto donde la ronda 1 lo dejó.
- **No se tocó la superficie Slides.** md5 de `SlideCardEditor.jsx` tomado antes y después,
  idéntico. `allowCustom` va apagado por defecto justo para eso.
- **No se cambió el almacenamiento de ningún componente más allá de admitir el hex opcional**
  en `header.variant` y `list.variant`. Token id sigue token id; el hex es una alternativa que
  ningún draft existente usa.
- **No se migró ningún draft** ni se reescribió ninguno. La salida compilada de los 70 es
  byte-idéntica. La paleta del operador se leyó, no se escribió.
- **No se editó ningún packet de componente** ni `.aiw/docs/docs_index.json`. El packet de QA
  nuevo **no quedó registrado en el índice**, y se declara.
- **No se tocó el packet de QA de la ronda 1.** Es evidencia de una ronda ya ejecutada.
- **No se editó el contrato de color**, aunque su §3 y su §4 quedan desactualizados: sus tablas
  siguen diciendo que `header` y `list` guardan «token id» a secas, y ya admiten también un
  hex. **Se nombra y se deja.**
- **No se certifica nada.** Ningún status de componente cambió; su fuente sigue siendo la matriz.
- **La QA humana no se ejecutó, no se simuló y no se dio por pasada.** Las seis casillas vacías.
- **No se editó el canónico**, ni status, ni orden de runs, ni `barrier`, ni la arista externa.
- **No se ejecutó git en ninguna forma**, no se levantaron servidores, no se corrieron suites de
  `aiw-console`, y `.project/` no se re-emitió.
- **La entrega es parcial y está declarada**, con el alcance decidido por la medición del
  criterio 2 y no por la lista del ticket.
- **El run sigue abierto** hasta que el operador lo cierre desde la consola.
