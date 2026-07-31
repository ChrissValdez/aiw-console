# Unificación del selector de color Web y la compuerta del compilador

**Proyecto:** cantu-studio
**Run:** `RUN-CANTU-COLOR-SELECTOR-UNIFICATION-001` — `queue_order` 16, carril DEVELOPMENT
**Fecha:** 2026-07-30
**Tipo:** ENTREGA PARCIAL VERIFICADA, declarada como tal por el criterio 12.
**Estado declarado del run:** `active` — no lo cierra este encargo.

**Resultado en una línea:** ocho componentes Web quedan con el mismo control —desplegable
limpio de la paleta activa entera, muestra de color al lado del campo—, siete campos de schema
salen de su enum cerrado en los dos schemas con **coste medido de cero tests**, Header vuelve
al patrón limpio que el operador aprobó; y la medición encontró **lo que el run 15 no midió:
`split`, `timeline` y el badge de `table` tienen una SEGUNDA compuerta cerrada dentro del
compilador**, de modo que retirarles el enum del schema habría producido un editor que ofrece
valores que el compilador rechaza. Los tres se miden, se reportan y **no se tocan**.

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
| `depends_on` | `RUN-JAME-WEB-HEADER-REVALIDATION-001` |

Carril: el run **no lleva clave `lane`**; `lanes[]` declara `DEVELOPMENT` con `default: true`,
luego es DEVELOPMENT. **Único match de `queue_order` 16 en todo el canónico.**

**La guarda pasa.** El título coincide carácter por carácter con el del encargo. Se sigue.

**La renumeración del encargo, verificada:** el canónico tiene hoy **74 runs**, no 73, y su
md5 es `128a233c64c44f16872dd2108f936bca`, distinto del `1dfcf17eccb7ec79b0864f040a5714b9` con
que cerraron los tres records del run 15. Su mtime es **22:38**, anterior a mi primera lectura.
Es la reemisión de la consola que el encargo anuncia. `queue_order` 15 sigue `active`.

### 1.1 El requerimiento, leído verbatim del canónico

**`title`:**

> Unify the color selector across every Web component

**`summary`:**

> Give every Web component with a color surface the same selector: a clean dropdown of the
> active palette tokens with a colour swatch beside it, sourced from the palette with no fixed
> list and no cap on token count.

**`full_description`:**

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

Los tres records de insumo —`REPARACION-ENUM-HEADER-Y-MEDICION-DE-CLASES-CANTU.md`,
`MEDICION-ENUM-HEADER-Y-INFORME-DE-OPCIONES-CANTU.md` y la DoD compartida— se leyeron enteros
antes de tocar nada.

---

## 2. Criterio 2 — LA TABLA DE CLASES, RE-MEDIDA CONTRA CÓDIGO VIVO

**Sección propia y visible.** Ninguna cifra heredada del run 15: las diecisiete filas se
recorrieron de nuevo en esta sesión. Rutas relativas a
`tools/author-lite/editor-ui/src/features/editor/components/` y a los dos `draftSchema.js`.
Líneas **anteriores** a mis ediciones, para que la tabla describa el estado que encontré.

| # | Componente | ¿Recibe la paleta activa? | ¿Qué guarda? | ¿Enum cerrado en schema? | ¿Pasa por `VariantSelect`? |
|---|---|---|---|---|---|
| 1 | `header` | **Sí** — `HeaderColorSelect` `WebBlockEditor.jsx:135`, slot `:1762` | **token id** | **No** — regex, retirado por el run 15 (`:550` / `:563`) | no — control propio |
| 2 | `card` | **Sí** — `CardColorField` `:894` | token id **o** hex (`Personalizado`) | **No** — `colorToken` regex `:627`. Su `variant` es alias de `cardType`, no campo de color | no — control propio |
| 3 | `iconList` | **Sí** — `common/IconListFields.jsx:26` | **hex** | **No** — `HEX_COLOR` `:293` | no — control propio |
| 4 | `list` | **NO** — constante fija de 9 | token id | **SÍ** — `VariantEnum`, 9 (`WebListSchema:721`) | **SÍ** — `:3878`; slot con `VARIANT_OPTIONS` inline `:1798` |
| 5 | `callout` | **NO** | token id | **SÍ** — `VariantEnum`, 9, en **dos** schemas (`:699` y `:706`) | **SÍ** — `:3853`; slot inline `:1829` |
| 6 | `rule` | **NO** | token id | **SÍ** — `VariantEnum`, 9 (`WebRuleSchema:744`) | **SÍ** — `:3939`; slot inline `:1863` |
| 7 | `table` (bloque) | **NO** | token id | **SÍ** — `VariantEnum`, 9 (`WebTableSchema:775`) | **SÍ** — `:3051`; slot inline `:1950` |
| 8 | `details` | **NO** | token id, por ítem | **SÍ** — `VariantEnum`, 9 (`DetailsItemSchema:320`) | **SÍ** — `:2416` |
| 9 | `conceptGrid` | **NO** | token id, por ítem | **SÍ** — `VariantEnum`, 9 (`ConceptGridItemSchema:330`) | **SÍ** — `:2562` |
| 10 | `table` (badge) | **NO** — `TABLE_BADGE_VARIANT_OPTIONS` `:360`, 18 entradas | token id o hex de fixture | **SÍ** — `TableBadgeVariantEnum`, 18 (`:393`) | no — select propio `:2982` |
| 11 | `split` | **NO** — `SPLIT_VARIANT_OPTIONS` `:380`, **3** | token id | **SÍ — el más corto: `z.enum(['ctx','focus','wrn'])`** (`:834`) | no — `ColumnRegisteredSelectField` `:1674` |
| 12 | `timeline` | **NO** — `TIMELINE_DETAIL_VARIANT_OPTIONS` `:58`, **3 opciones para un enum de 4** | token id | **SÍ — `z.enum(['def','ctx','wrn','success'])`** (`:479`) | no — select propio `:3709` |
| 13 | `hierarchy` | **NO** — input de texto «Color hex» `:3438` y `:3509` | **hex** | **No** — `HEX_COLOR` `:449` | no — input de texto |
| 14 | `visual` | **NO** — `<input type="color">` crudo, `common/VisualFields.jsx:33` | **hex** | **No** — `HEX_COLOR` `:301` | no |
| 15 | `narrative` | n/a | n/a | n/a | sin superficie de color |
| 16 | `video` | n/a | n/a | n/a | sin superficie de color |
| 17 | `arithmetic` | n/a | n/a | n/a | sin superficie de color |
| — | `columns` | n/a | n/a | n/a | sin superficie propia; propaga `colorPalette` a sus hijos |

**Diecisiete componentes** contados en `blockCatalog.js` (`WEB_COMPONENT_UI`, claves: **17**),
y **dieciocho filas** porque `table` expone dos superficies de color independientes.

### 2.1 Cuenta por clase, medida

| Clase | Cuántos | Cuáles |
|---|---|---|
| Con superficie de color | **14 de 17** | todos menos `narrative`, `video`, `arithmetic` |
| **Clase 1** — no recibe la paleta activa | **11** | `list`, `callout`, `rule`, `table` (bloque), `details`, `conceptGrid`, `table` (badge), `split`, `timeline`, `hierarchy`, `visual` |
| **Clase 2** — guarda hex y pierde el vínculo | **3, más `card` parcial** | `iconList`, `hierarchy`, `visual`; `card` solo si el autor usa `Personalizado` |
| **Clase 3** — enum cerrado que recorta la paleta | **10 campos en 9 componentes** | `list`, `callout` (×2 schemas), `rule`, `table` (bloque), `details`, `conceptGrid`, `table` (badge), `split`, `timeline` |
| Ya en el patrón de referencia | **3** | `header`, `card`, `iconList` |

### 2.2 DIVERGENCIAS con la medición del run 15 — cinco, todas medidas

**1. LA MÁS GRAVE, Y NO ESTABA MEDIDA: `split`, `timeline` y el badge de `table` tienen una
segunda compuerta cerrada DENTRO DEL COMPILADOR.** El run 15 midió solo compuertas de schema.

| Compuerta | Ruta | Qué hace |
|---|---|---|
| `SPLIT_VARIANT_VALUES` | `compiler-api/services/compiler.js:66`, usada en `:579` | lanza si `split.variant` no es uno de tres |
| `TIMELINE_DETAILS_VARIANT_VALUES` | `compiler.js:55`, usada en `:985` | lanza si `detailsVariant` no es uno de cuatro |
| `normalizeTableBadgeVariant` | `compiler.js:479-483` | lanza si el badge no está en `TABLE_BADGE_VARIANT_MAP` ni en `VARIANT_VALUES` (9) |

Probado de punta a punta, saltándose el schema y llamando al compilador con la paleta activa:

```
split variant=focus (del enum)       COMPILA
split variant=color_2 (paleta)       THROW -> [Compiler] Split Web tiene variant no permitido: color_2.
timeline detailsVariant=success      COMPILA
timeline detailsVariant=color_2      THROW -> [Compiler] Timeline Web paso 1 tiene variante de detalle no permitida.
table badge variant=res (del enum)   COMPILA
table badge variant=color_2 (paleta) THROW -> [Compiler] Variante de badge de tabla no permitida: color_2.
callout variant=color_2 (paleta)     COMPILA
list    variant=color_2 (paleta)     COMPILA -> {"variant":"color_2","color":"#F4B847",...}
```

**Consecuencia directa sobre el plan del encargo:** el criterio 4 nombra `split`, `timeline` y
el badge de `table` como enums a retirar, y el criterio 15 pone el compilador fuera de alcance.
Los dos no pueden cumplirse a la vez. Retirar su enum de schema **sin** tocar el compilador
produce exactamente lo que el criterio 7 manda evitar: un autor que elige Ámbar y una compilación
que falla. **Se paró en los tres y se reporta.** El coste medido que el ticket daba —`split` 0
tests, `timeline` 1, `table` badge 2— **es correcto como coste de la suite y engañoso como coste
real**: mide el schema, no la cadena.

**2. La cifra «doce de clase 1» ya no vale; son once.** Header salió en el run 15. Coincide con
lo que el propio run 15 corrigió.

**3. «Seis componentes Web consumen `VariantSelect`»: CIERTA, y el conteo se queda corto.** Los
seis son `list`, `callout`, `rule`, `table` (bloque), `details` y `conceptGrid`. Pero **la
colocación de esos componentes dentro de un slot de `columns` NO pasa por `VariantSelect`**:
`list`, `callout`, `rule` y `table` pintan `VARIANT_OPTIONS` en línea a través de
`ColumnRegisteredSelectField` (`:1798`, `:1829`, `:1863`, `:1950`). Cablear la pieza compartida
alcanza seis **colocaciones**, no seis componentes enteros. **Hay diez sitios, no seis.**

**4. `VariantSelect` lo consume también la superficie Slides.** `SlideCardEditor.jsx:26`.
Medido y respetado: ver §3.2. **Slides no se tocó.**

**5. `timeline` ofrece TRES opciones para un enum de CUATRO.** `TIMELINE_DETAIL_VARIANT_OPTIONS`
(`:58`) declara `''`, `wrn` y `success`; el enum admite además `def` y `ctx`. El desplegable es
**más corto** que su propio enum, y `''` no es ninguno de los cuatro. Dato nuevo, no medido antes.

---

## 3. La reparación entregada

### 3.1 Criterio 3 — `common/VariantSelect.jsx`, la pieza compartida, primero

**Antes:** 17 líneas. Importaba `VARIANT_OPTIONS` y pintaba nueve nombres fijos. Ni paleta, ni
muestra, ni un solo test que afirmara su cableado.

**Después:** deriva la lista de `getAuthorColorOptions(palette)` sin filtro, sin `slice` y sin
lista fija de respaldo, y exporta dos piezas compartidas.

| Pieza | Qué es |
|---|---|
| `ColorTokenSwatch` | el cuadro de color; markup del editor de paletas (`ColorRoleInput`) |
| `RegisteredColorSwatch` | la muestra de un campo registrado; **solo lee** con `useWatch`, el `<select>` sigue siendo el dueño |
| `resolveColorTokenAccent` | interno; misma cadena que `resolveVariantAccentColor` del compiler |

**Lo que la hace agnóstica a la cantidad, y por qué NO quedó una lista fija de respaldo:** se
midió que `getAuthorColorOptions(null | undefined | [] | {})` devuelve **los mismos nueve
valores Y las mismas nueve etiquetas, en el mismo orden**, que la constante `VARIANT_OPTIONS`
—`Morado, Azul, Cian, Dorado, Champagne, Verde, Naranja, Rojo, Gris`—. Por eso el import de
`VARIANT_OPTIONS` **desapareció del archivo** en vez de quedarse como respaldo: no hacía falta.
`VARIANT_OPTIONS` sigue declarada y en uso en `editorOptions.js`, que **no se tocó**.

### 3.2 Slides: nombrado y dejado, con markup idéntico

`SlideCardEditor.jsx:26` consume `VariantSelect` y **no se tocó**. La pieza recibe `palette` y
`control` como opcionales:

- Sin `control` devuelve **el `<select>` pelado**, con la misma cadena de clases que tenía. La
  rama es literal: `if (!control) return select;`.
- Sin `palette`, la lista es la de los nueve por defecto, **byte por byte la que Slides pintaba**.

**md5 de `SlideCardEditor.jsx`: `1d8a949594f608e7d9644b2c80f09b54` antes y después.** Un test
fija las dos cosas.

### 3.3 Criterio 4 — los enums retirados, con el patrón exacto de Header

`VariantEnum.optional()` → `z.string().regex(COLOR_TOKEN_ID, "Token de color invalido").optional()`,
que es lo que `card.colorToken` ya usaba. **Siete campos, en los dos schemas, catorce ediciones.**

| # | Schema | editor-ui | compiler-api | Componente |
|---|---|---|---|---|
| 1 | `DetailsItemSchema` | `:320` | `:323` | `details` |
| 2 | `ConceptGridItemSchema` | `:330` | `:333` | `conceptGrid` |
| 3 | `WebCalloutSchema` | `:699` | `:712` | `callout` |
| 4 | `WebColumnsCalloutSchema` | `:706` | `:719` | `callout` en slot |
| 5 | `WebListSchema` | `:721` | `:746` | `list` |
| 6 | `WebRuleSchema` | `:744` | `:772` | `rule` |
| 7 | `WebTableSchema` | `:775` | `:803` | `table` (bloque) |

**`VariantEnum` NO se tocó.** Sigue declarada y sigue consumida por `SlideCardItemSchema` en los
dos schemas. Un test lo fija. `CardVariantEnum` y `TableBadgeVariantEnum` tampoco se tocaron.

**No retirados, y por qué:**

| Campo | Razón medida |
|---|---|
| `WebSplitColumnsChildSchema.variant` | segunda compuerta en `compiler.js:579` |
| `TimelineStepSchema.detailsVariant` | segunda compuerta en `compiler.js:985` **y** decisión abierta del `success` (§4) |
| `TableRichBadgeSchema.variant` | segunda compuerta en `compiler.js:481-483` |
| `SlideCardItemSchema.variant` | superficie Slides, fuera de alcance |
| `WebCardShape.variant` | **no es un campo de color**: `CardVariantEnum` mezcla los nueve tokens con los tres alias de `cardType` (`metric`, `code`, `persona`) que `resolveCardType` (`compiler.js:90-93`) consume. El control de color de `card` escribe `colorToken`, que ya es regex. El ticket lo daba como «coste 0 tests»; el coste es 0 porque **no hay enum de color que retirar ahí** |

**Coste medido, corriendo la suite entera: los siete campos juntos rompieron CERO tests.**

### 3.4 Criterio 9 — Header vuelve al patrón limpio

| | Antes (salida del run 15) | Después |
|---|---|---|
| Filas del desplegable | tintadas con `getHeaderColorOptionStyle(option)` — fondo `border`, letra `text` | **limpias**: solo `{option.label}` |
| El helper del tinte | `getHeaderColorOptionStyle`, `WebBlockEditor.jsx:97-100` | **eliminado**; cero apariciones en el archivo |
| Muestra | **delante** del campo | **detrás**, a la derecha |
| Componente de la muestra | `HeaderColorSwatch` y `ColumnHeaderColorSwatch`, propios de Header | los compartidos `ColorTokenSwatch` y `RegisteredColorSwatch` |

**Su enum no se volvió a tocar**, como manda el criterio: `WebHeaderSchema.variant` sigue siendo
el regex que dejó el run 15, byte a byte.

### 3.5 Criterio 12(c) — las colocaciones en slot de columnas

`ColumnColorSelectField` (nuevo en `WebBlockEditor.jsx`) replica la estructura de
`ColumnRegisteredSelectField` —**que no se tocó, porque la comparte `split`**— y le suma la
muestra al lado. Lo usan las cuatro colocaciones que pintaban `VARIANT_OPTIONS` en línea:
`list`, `callout`, `rule` y `table`. La rama de `header` en slot conserva su estructura propia
—el test del run 15 exige la cadena literal `getHeaderColorOptions(colorPalette)` dentro de
ella— y recibe el mismo tratamiento visual. **Cero `VARIANT_OPTIONS.map` quedan en el editor.**

### 3.6 `hierarchy` — el único de clase 1 + clase 2 que sí se pudo cerrar

Cambió el input de texto libre «Color hex» por `HierarchyNodeColorField`, que es **el control de
`iconList`**: desplegable limpio de la paleta activa, `Personalizado`, y el selector de color al
lado. Dos colocaciones —nodo raíz y nodos hijos—.

**`Personalizado` está aquí porque el campo YA guardaba hex**, que es la regla exacta del
operador. **El almacenamiento no cambió**: sigue escribiendo `#RRGGBB`, y la opción **«Sin
color»** conserva el vacío que el campo admite hoy —verificado: `''` sigue llegando al schema
como `undefined` y el nodo compilado sigue sin clave `color`—.

---

## 4. Criterio 5 — EL `success` DE `timeline`: MEDIDO, REPORTADO, NO DECIDIDO

**Parada declarada.** Es decisión de producto del operador y este encargo no la toma.

### 4.1 Qué pasa HOY con un `detailsVariant: success` guardado

| Capa | Resultado medido |
|---|---|
| `WebDraftSchema.parse` | **ACEPTA** — está en el enum |
| Compilador | **ACEPTA** — está en `TIMELINE_DETAILS_VARIANT_VALUES` |
| Nodo emitido | `detailsVariant: "success"`, verbatim |
| Motor Web | **LO DEFINE**: `VARIANTS.success = { palette: 'green', icon: 'check', label: 'Éxito' }` (`src/builders/web/partials/commons.js:82`), marcado `// Alias` |
| Paleta activa del operador | **NO define ningún token `success`** |
| `resolveAuthorColorToken('success', {palette})` | cae al fallback → token **`ctx`**, `#5E81AC` |

**Es exactamente el desdoblamiento que el contrato de color §5 describe:** el valor **renderiza
bien** (verde, por el alias del motor) y **no existe** para la paleta del autor, que lo resolvería
a `ctx`. Nada está roto hoy; lo que hay es una referencia que vive en el motor y no en la paleta.

### 4.2 Cuántos drafts reales lo usan: **CERO**

Barrido de los **26** JSON de draft de los dos orígenes reales. Único valor hallado de
`detailsVariant`: **`wrn` ×3**. Ni un `success`, ni un `def`, ni un `ctx`.

### 4.3 Corrección a la premisa del ticket

El ticket dice «Retirar el enum lo dejaría huérfano». **Medido: no del todo.** La cadena
`success` **pasa el regex `COLOR_TOKEN_ID`** (`^[a-z][a-z0-9_-]{1,31}$`), así que retirar el
enum **no lo haría inguardable**: seguiría guardándose y seguiría compilando. Lo que perdería es
su sitio en la **lista ofrecida**, porque esa lista pasaría a ser la paleta y la paleta no lo
tiene. La orfandad es de la superficie de autoría, no del dato.

### 4.4 Las opciones, con coste medido — se recomienda, no se decide

| | **A — promover `success` a token real de la paleta** | **B — quitarlo del desplegable y del enum** | **C — mapearlo a un token existente** |
|---|---|---|---|
| Qué cambia | el operador añade un token `success` a su paleta (verde) desde el editor de paletas | se retira `success` de `TIMELINE_DETAIL_VARIANT_OPTIONS` y del enum | el editor escribe `res` donde hoy escribiría `success` |
| ¿Toca código del repo? | **No, ninguna línea.** Es un dato de la paleta del operador | sí: editor + los dos schemas | sí: editor, y una decisión de qué token |
| Drafts afectados | **0** (§4.2) | **0** (§4.2) | **0** (§4.2) |
| **Tests rotos, medido** | **0** | **1** — `timeline details reject unsafe payloads and unsupported variants` | **0** |
| ¿Desbloquea el enum de `timeline`? | **No por sí sola** — falta la compuerta del compilador | **No por sí sola** — ídem | **No** |
| Efecto en el render | el alias verde del motor sigue en pie; además el swatch del editor mostraría el verde real | los drafts que lo tuvieran seguirían renderizando verde, pero el autor ya no podría elegirlo | pierde el verde del alias y toma el accent de `res` de la paleta |
| Lo que se pierde | nada; queda un token de paleta que el motor además reconoce por nombre | una capacidad expresiva que el motor sí soporta | la equivalencia exacta con el alias del motor |

**Recomendación, sin decidir:** **opción A.** Es la única que no toca ni una línea del repo,
cierra el desdoblamiento en el lado correcto —el dato, no el código—, cuesta cero tests y cero
drafts, y deja `success` siendo a la vez token de paleta y alias del motor. **B** es defendible
si el operador considera que `success` nunca debió ser author-facing. **C** se desaconseja:
compra consistencia perdiendo la única variante del motor que la paleta no puede expresar.

### 4.5 Y aun así, `timeline` queda sin tocar

**Aunque el operador elija hoy mismo, la decisión no basta.** La compuerta
`TIMELINE_DETAILS_VARIANT_VALUES` del compilador (§2.2) seguiría rechazando cualquier token de
paleta que no sea uno de los cuatro. **`timeline` necesita dos permisos: éste y el del
compilador.** Se deja sin tocar y se dice, como manda el criterio 5. El resto del run siguió.

---

## 5. Criterio 6 — EL REQUISITO DE CANTIDAD, verificado con paleta sintética fuera del repo

Sonda ejecutada sobre el código real (los dos schemas + el compilador + `getAuthorColorOptions`),
con una paleta construida en el **scratchpad de sesión, fuera de los dos repos y fuera de la
paleta del operador**.

| Medición | 24 tokens | 48 tokens |
|---|---|---|
| **Opciones que ofrece el desplegable** | **33** — los 24 más los 9 por defecto que la paleta no sobrescribe | **57** |
| Sintéticos **no** ofrecidos | **0** | **0** |
| Duplicar la paleta añade | — | **exactamente +24 opciones** |

**Cifra real de opciones ofrecidas, por componente tocado** (idéntica en los siete, porque los
siete derivan de la misma función):

| Componente | Ofrecidas | Guardadas | Resueltas al accent exacto | Rechazadas |
|---|---|---|---|---|
| `list` | 33 | **24 / 24** | **24 / 24** | 0 |
| `callout` | 33 | **24 / 24** | **24 / 24** | 0 |
| `rule` | 33 | **24 / 24** | **24 / 24** | 0 |
| `table` (bloque) | 33 | **24 / 24** | **24 / 24** | 0 |
| `details` | 33 | **24 / 24** | **24 / 24** | 0 |
| `conceptGrid` | 33 | **24 / 24** | **24 / 24** | 0 |
| `header` | 33 | **24 / 24** | **24 / 24** | 0 |

`hierarchy` se verificó en su forma propia —guarda hex—: los 24 accents sintéticos se ofrecen,
se escriben y se guardan; el vacío sigue siendo vacío.

**Ninguna cifra horneada**, barrido de los tres sitios que el criterio nombra:

| Sitio | ¿Hay cifra de cantidad? |
|---|---|
| Los siete campos de schema | **No.** Un regex de forma de id; ningún conteo |
| `VariantSelect.jsx`, `ColumnColorSelectField`, `HierarchyNodeColorField` | **No.** `.map` sobre la lista entera; cero `.filter`, cero `.slice`, cero `VARIANT_OPTIONS` |
| Tests nuevos | **No.** La paleta se construye desde un tamaño y las aserciones son relativas (`>= size`, `bigger - offered === size`, `length + 1`) |

La única constante de longitud sigue siendo `COLOR_TOKEN_ID = /^[a-z][a-z0-9_-]{1,31}$/` —**cap
de 32 caracteres por id, no de cantidad de tokens**—, heredada de `card.colorToken` y ya
declarada por el run 15. No se tocó.

---

## 6. Criterio 10 — comportamiento ante token desconocido: la caída a `ctx`, medida por capa

Es lo que protegían los enums. La cadena sigue en pie **en cada componente tocado**, con la
paleta sintética de 24 y con un id que no existe (`azulito`):

| Componente | Valor guardado | Hex resuelto que emite el compilador | Render medido con el renderer real |
|---|---|---|---|
| `header` | `azulito`, conservado | `#5E81AC` = accent de `ctx` | `ctx` |
| `list` | `azulito`, conservado | `#5E81AC` = accent de `ctx` | `ctx` |
| `callout` | `azulito`, conservado | no emite hex resuelto | **`ctx`** — `Commons.VARIANTS[k] \|\| Commons.VARIANTS.ctx` |
| `rule` | `azulito`, conservado | no emite hex resuelto | **`ctx`** — mismo patrón, `renderRule.js:13` |
| `table` | `azulito`, conservado | no emite hex resuelto | **`ctx`** — `renderTable.js:12` |
| `details` | `azulito`, conservado | no emite hex resuelto | **`ctx`** — `renderDetails.js:54` |
| `conceptGrid` | `azulito`, conservado | no emite hex resuelto | **`ctx`** — `roleMap[item.variant] \|\| roleMap.default`, `renderConceptGrid.js:52` |

Verificado también **sin paleta**: cae al `ctx` por defecto. Y verificado que el valor escrito
**se conserva** en los siete: la referencia no se reescribe, solo el color resuelve.

### 6.1 LA CONSECUENCIA QUE HAY QUE SABER, medida invocando el renderer real

De los siete, **solo `header` y `list` emiten un hex resuelto** (`resolveVariantAccentColor`).
Los otros cinco emiten **solo el token id**, y el motor Web lo mapea contra
`Commons.VARIANTS`, que es un **mapa fijo de doce claves** definido en el motor
(`src/builders/web/partials/commons.js:71-90`) y **no derivado de la paleta del autor**.

Medido llamando a los renderers de verdad:

```
callout variant=ctx      -> #5E81AC
callout variant=wrn      -> #D08770
callout variant=color_2  -> #5E81AC   (cae a ctx: el motor no conoce color_2)
list    variant=color_2  -> #F4B847   (el hex resuelto del compiler manda)
```

**Lectura honesta:** este run entrega lo que su propio texto declara —«unifies the authoring
surface only; it changes no renderer and no compiled output»—. Para `callout`, `rule`, `table`,
`details` y `conceptGrid` el autor **ya puede elegir cualquier token de su paleta, y el draft lo
guarda y lo transporta**, pero el color **pintado** seguirá siendo el de `ctx` mientras el motor
no conozca ese token. No es una regresión: es el comportamiento que ya tenían, ahora visible
porque el control dejó de esconder la mitad de la paleta. **Cerrarlo exige tocar compilador o
renderer, y los dos están fuera de alcance.** Es material para un run propio y se nombra aquí.

---

## 7. Criterio 7 — el almacenamiento NO cambió, verificado campo por campo

| Componente | Guardaba antes | Guarda ahora |
|---|---|---|
| `header`, `list`, `callout`, `rule`, `table` (bloque), `details`, `conceptGrid` | **token id** | **token id** |
| `card` | token id, o hex con `Personalizado` | idéntico — no se tocó |
| `iconList` | **hex** | **hex** — no se tocó |
| `hierarchy` | **hex**, o vacío | **hex, o vacío** — verificado con el schema y con el nodo compilado |
| `visual`, `split`, `timeline`, `table` (badge) | — | no se tocaron |

**Ningún cambio visual obligó a cambiar el almacenamiento.** El único que estuvo cerca fue
`hierarchy`: si su control nuevo hubiera escrito siempre un hex, los nodos sin color habrían
ganado uno. Por eso lleva la opción **«Sin color»**, y por eso hay un test que afirma que un
vacío sigue siendo un vacío en el schema y en la salida compilada.

**`Personalizado` no se añadió a ningún componente que guarde token id.** Existe solo en `card`,
`iconList` y `hierarchy`, los tres campos que ya guardaban hex.

---

## 8. Criterio 8 — `iconList` no se rediseñó, y no le faltaba nada

Recorrido contra el patrón aprobado, punto por punto (`common/IconListFields.jsx`):

| Rasgo del patrón | `iconList` |
|---|---|
| Desplegable limpio, sin fondo tintado | **Sí** — `<option>` con `{option.label}` y nada más (`:65-68`) |
| Lista derivada de la paleta activa, entera | **Sí** — `getAuthorColorOptions(palette)` sin filtro (`:31`) |
| Muestra de color a la derecha del campo | **Sí** — `<input type="color">` en la segunda columna del grid (`:71-78`) |
| `Personalizado` donde el campo guarda hex | **Sí** (`:69`) |

**No le falta nada del patrón. No se tocó.** md5 `c3c7d8a6a3b54b99158158235d942636` antes y
después. `card` cumple el mismo recorrido y tampoco se tocó.

---

## 9. Criterio 11 — los drafts guardados siguen cargando, sin migración

**Ningún draft se tocó.** Barrido de **26** archivos JSON de los dos orígenes reales —el
workspace del operador (`projects/cantu-lessons/drafts/`, donde vive también la paleta activa) y
los drafts internos del repo— contra el `WebDraftSchema` y el compilador **nuevos**.

| Medición | Resultado |
|---|---|
| JSON de draft barridos | **26** |
| Con `webBlocks` | **25** |
| Cargan y compilan con el schema nuevo | **24 de 25** |
| El que no carga | `cantu-lessons/drafts/web/sandbox_reproductions/bounded/sandbox_theory_complex.web.draft.json` |
| Sus dos issues, verbatim | `webBlocks.5.columns` → «Columnas Web v1 requiere exactamente 2 columnas»; `webBlocks.5.columns.0.blocks.0` → «Unrecognized key(s) in object: 'colSpan'» |

**El único fallo es preexistente y ajeno a color:** son los mismos dos issues que los dos records
anteriores ya midieron antes de que existiera este cambio.

Valores de color hallados en drafts reales, por componente:

| Campo | Valores | ¿Alguno fuera del enum retirado? |
|---|---|---|
| `header` | `ctx` ×18 | no |
| `list` | `ctx` ×14, `def` ×1 | no |
| `callout` | `wrn` ×9, `ctx` ×3, y los otros siete del enum | no |
| `rule` | `def` ×3, `ctx`/`str`/`res`/`wrn`/`err` ×2, `ex` ×1 | no |
| `table` | `ctx` ×5, `def` ×4, `str`/`wrn`/`err`/`res` ×2 | no |
| `details` | `ctx` ×4, `wrn` ×2, `err` ×2 | no |
| `conceptGrid` | `def` ×3, `focus` ×3 | no |
| `hierarchy.color` | 4 hex distintos, ×7 usos | hex, sin cambio |
| `card.variant` | `ctx` ×9, `def` ×3, `meta` ×3, + `metric`/`code`/`persona` ×1 | alias de `cardType`, no tocado |
| `card.color` | `#434C5E` ×1 | hex personalizado, no tocado |
| `iconList.color` | 4 hex distintos, ×5 usos | hex por diseño, no tocado |
| `split` | `ctx` ×3, `focus` ×2, `wrn` ×1 | **usa los tres** que su enum admite; no tocado |
| `table.badge` | `res` ×6, `err` ×5, `wrn`/`ctx` ×3, `focus` ×2, `meta`/`ex` ×1 | no tocado |
| `timeline.detailsVariant` | **`wrn` ×3, y nada más** | no tocado |
| `visual.background` | `#FFFFFF` ×1 | no tocado |

**Migración: ninguna, y no hacía falta ninguna.** Cero drafts ganaron o perdieron una clave. La
paleta del operador se **leyó** y no se escribió.

---

## 10. Criterios 13 y 14 — cobertura aditiva, suite y lint

### 10.1 Las cifras

| Métrica | Antes | Después |
|---|---|---|
| Suite `compiler-api` | **308 / 308**, EXIT 0 | **316 / 316**, EXIT 0 |
| De los cuales, nuevos | — | **+8** |
| Tests rotos por el cambio | — | **1**, el previsto, reescrito |
| Fallos | 0 | **0** |
| `eslint` (editor-ui) | **EXIT 0**, 0 avisos | **EXIT 0**, 0 avisos |

**La cifra 308 del ticket se verificó corriéndola, y es cierta.** Comandos:
`node --test "tools/author-lite/compiler-api/tests/*.test.mjs"` y
`npm --prefix tools/author-lite/editor-ui run lint`. **No se corrió ninguna suite de
`aiw-console`.**

### 10.2 Criterio 13 — el test que `VariantSelect` no tenía

`compiler-api/tests/webSharedColorSelectorUnification.test.mjs` — **archivo nuevo, 8 casos.**
El run 15 midió que **cero** tests afirmaban el cableado de la pieza más compartida del sistema.
Ya no.

| Caso | Qué asegura |
|---|---|
| El control deriva la paleta activa | `getAuthorColorOptions(palette)` sin filtro ni slice; **`VARIANT_OPTIONS` ni siquiera se importa** |
| Los seis están cableados en las dos colocaciones | seis `<VariantSelect …palette…control…>`, ninguno sin paleta; cuatro `ColumnColorSelectField`; cero `VARIANT_OPTIONS.map` |
| Ninguno carga enum, en los dos schemas | los siete campos son el regex; **`VariantEnum` sigue viva y consumida por `SlideCardItemSchema`** |
| **Cantidad** | 24 tokens sintéticos ofrecidos, guardados y compilados por los seis; duplicar la paleta añade exactamente 24 |
| Caída a `ctx` | id desconocido conservado y resuelto a `ctx` en los seis, con paleta y sin ella; y las cinco formas inválidas siguen rechazándose |
| **El aspecto** | cero `<option style=>` en el editor y en la pieza compartida; la muestra va **después** del campo en las dos colocaciones |
| `hierarchy` | control nuevo con la paleta entera; **el almacenamiento no se movió**: hex sigue hex y vacío sigue vacío |
| **Slides intacto** | el consumidor no pasa paleta ni control; sin paleta la lista es **idéntica en valor y etiqueta** a `VARIANT_OPTIONS` |

### 10.3 El único test reescrito, con antes/después y razón

`compiler-api/tests/webHeaderPaletteQuantityAndSwatch.test.mjs`

| | Antes | Después |
|---|---|---|
| Nombre | `both header placements show the real color of every option and of the selection` | `both header placements keep a clean dropdown with the swatch beside the field` |
| Qué afirmaba | que `getHeaderColorOptionStyle` existía y que **las dos colocaciones tintaban sus filas** con los roles del token | que **no hay ni una `<option style=>`** en el editor, que el helper del tinte desapareció, y que la muestra va **detrás** del campo en las dos colocaciones |
| Por qué cambia | codificaba **el diseño que el operador rechazó**. Es el mismo caso del criterio 14: un test que afirma un límite —aquí, una decisión visual— que este encargo retira | lo que debe quedar fijado es lo que lo sustituye, **en negativo**, para que el diseño rechazado no pueda volver sin romper el test |

**Cero aserciones de cualquier otro test reescritas.** Los cinco casos restantes de ese archivo y
los seis de `webHeaderColorPaletteAuthoringSurface.test.mjs` pasan **con su texto intacto** —md5
de este último `b2d049db10274f13e81b110a6f59d0c4`, sin cambio—.

---

## 11. Criterio 12 — QUÉ QUEDÓ FUERA, con su clase y su coste medido

**Entrega parcial, declarada.** El orden de prioridad del criterio se respetó.

| Prioridad | Estado |
|---|---|
| **(a)** `VariantSelect` — máxima palanca | **ENTREGADO** |
| **(b)** Enums cerrados sin decisión pendiente | **ENTREGADO** — los siete campos, 0 tests |
| **(c)** Selectores propios que no reciben la paleta | **PARCIAL** — las 4 colocaciones de slot y `hierarchy`, sí; ver abajo |
| **(d)** Pulido visual del resto | **ENTREGADO** para Header; `iconList` y `card` ya cumplían |

### Lo que queda fuera, uno a uno

| Componente | Clase | Por qué queda fuera | Coste medido de cerrarlo |
|---|---|---|---|
| **`split`** | 1 + 3 | **Compuerta del compilador** `compiler.js:579`. El compilador está fuera de alcance | schema: **0 tests**. Compilador: no medido, fuera de alcance. Drafts: **0** |
| **`timeline`** | 1 + 3 | **Dos bloqueos**: la compuerta `compiler.js:985` **y** la decisión abierta del `success` (§4) | schema: **1 test**. Decisión: del operador. Drafts: **0** |
| **`table` (badge)** | 1 + 3 | **Compuerta del compilador** `compiler.js:481-483`, con un mapa de alias de fixture que incluye cuatro hex literales | schema: **2 tests** medidos por el run 15. Drafts: **0** |
| **`visual`** | 1 + 2 | `common/VisualFields.jsx` **lo comparte la superficie Slides** (`SlideItemEditor.jsx:56`). Cablearlo sin tocar Slides exige el mismo desdoblamiento opcional que se hizo en `VariantSelect`; cabe, pero es superficie nueva y no entra en una entrega parcial | 0 tests estimado, **no medido**; se declara como no medido |
| Los cinco que no pintan la paleta al renderizar | — | `callout`, `rule`, `table`, `details`, `conceptGrid`: superficie de autoría cerrada; el color pintado depende del motor (§6.1) | exige compilador o renderer, los dos fuera de alcance |

---

## 12. Criterio 15 — lo que no se tocó

| Superficie | Estado | Evidencia |
|---|---|---|
| **Renderers** | **Intactos** | solo se **invocaron** en lectura para medir §6.1 |
| **Compilador** | **Intacto** | md5 `c1177c44c6db3270ba83f1817827f28f` antes y después |
| **Salida compilada** | **Intacta** para todo draft existente | §9: 24 de 25 compilan igual; el que no, por causa preexistente |
| **Mojibake de los schemas** | **Intacto.** Sigue en `:293`, `:301` y decenas más, en los dos schemas | los siete mensajes que este encargo escribe van en ASCII limpio |
| **«Full width» / «Col span»** | **Intactos.** `PlacementFields` sin cambio | — |
| **`docs/components/web/*.md`** | **Intactos**; `HEADER.md` md5 `90bb753cf028618ebf381cd9383f929b` | — |
| **`.aiw/docs/docs_index.json`** | **Intacto**, md5 `bc708a5847f66291ea1cd719eb6a0ecb` | el packet nuevo **NO se registró**; el registro es de quien tenga el turno de escritor del índice |
| **Superficie Slides** | **Intacta**, md5 `1d8a949594f608e7d9644b2c80f09b54` | §3.2 |
| **`editorOptions.js` / `VARIANT_OPTIONS`** | **Intacto**, md5 `ae571c0c697ed41c884a85589ace7a69` | sigue consumida por `TABLE_BADGE_VARIANT_OPTIONS` |
| **Los tres packets de Header anteriores** | **Intactos**; el de ronda 3, md5 `782e767ea24df2dc9259a205d8ba06f8` | son evidencia de rondas ejecutadas |
| **`ColumnRegisteredSelectField`** | **Intacto** | lo comparte `split` |
| **`.aiw/state/component_status.json`** | **Intacto**, md5 `f591165bbf19862b04433129d9edf2cb` | — |

---

## 13. Criterio 16 — QA humana PREPARADA Y DETENIDA

`docs/_historical_run_record/RUN-CANTU-COLOR-SELECTOR-UNIFICATION-001-OPERATOR-QA-PACKET.md`,
archivo nuevo junto a los tres de Header, formato §6 de la DoD, **ocho comprobaciones**,
**organizadas por componente** para que el operador recorra los diecisiete sin perderse.

| # | Componente | Verifica |
|---|---|---|
| 1 | `header` | **El aspecto**: filas limpias, sin fondo tintado, muestra a la derecha |
| 2 | `list`, `callout`, `rule`, `table` | Los cuatro que comparten el control ofrecen la paleta entera |
| 3 | `details`, `conceptGrid` | Los dos que colorean por ítem |
| 4 | cualquiera | **El requisito de cantidad**: añadir dos tokens a la paleta y verlos en todos |
| 5 | los cinco en slot de `columns` | La segunda colocación, idéntica a la primera |
| 6 | `hierarchy` | El que guarda hex: control nuevo, almacenamiento intacto |
| 7 | `split`, `timeline`, badge de `table` | **Los tres dejados a propósito**, para que el límite se vea y no se lea como olvido |
| 8 | drafts guardados, Slides | Que nada de alrededor se rompió |

**Inglés ASCII puro, verificado con barrido de bytes: cero bytes fuera de rango.**
**Ninguna casilla de veredicto se rellenó.** La QA humana no se ejecutó ni se simuló.

---

## 14. Criterio 17 — validador y cifras, medidas en esta sesión

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

**Component statuses: 16, sin moverse.** El único aviso es el no bloqueante de la arista externa,
que no se resolvió. **`Docs indexed` sigue en 149: el packet de QA nuevo NO se registró**, y se
declara.

---

## 15. Criterio 18 — cifras del ticket, verificadas y no creídas

| Cifra o afirmación del encargo | ¿Verificada? | Resultado |
|---|---|---|
| Suite **308** | sí, corriéndola | **cierta** antes; 316 después |
| **Component statuses: 16** | sí, dos veces | **cierta**, sin moverse |
| **7 / 28 / 74** | sí, dos veces | **cierta** |
| **17 componentes** | sí, contando `WEB_COMPONENT_UI` | **cierta** |
| «Roadmap renumerado de 73 a 74» | sí | **cierta**: md5 del canónico cambió y hay 74 runs |
| «Seis componentes Web consumen `VariantSelect`, coste 0 tests» | sí | **cierta**, y **corta**: son 6 colocaciones de 10 (§2.2-3). El coste 0 tests: **confirmado** |
| «El consumidor de Slides también la usa» | sí | **cierta** — `SlideCardEditor.jsx:26`. No se tocó |
| `split` **3 valores** / `timeline` **4** | sí | **ciertas las dos** en el schema. `timeline` **ofrece solo 3 de sus 4** en el editor |
| «El autor de `split` ya está en el techo» | sí, en drafts reales | **cierta**: usa los tres |
| Coste `split` 0 / `card` 0 / `timeline` 1 / `table` badge 2 | parcialmente | **ciertas como coste de suite**, **engañosas como coste real**: los tres tienen compuerta en el compilador (§2.2-1). `card` da 0 porque **no tiene enum de color que retirar** |
| «Retirar el enum dejaría `success` huérfano» | sí | **matizada**: `success` pasa el regex y seguiría guardándose; pierde su sitio en la lista ofrecida, no el dato (§4.3) |
| «El motor define `success` como alias y la paleta no» | sí | **cierta las dos mitades** (`commons.js:82`) |
| «Doce de clase 1» | sí | **ya no**: son **once** — Header salió en el run 15 |
| «Cinco familias con enum cerrado» | sí | **cierta y ampliable**: 10 campos de color con enum en 9 componentes |
| Paleta activa en `cantu-lessons/metadata/color-palettes/` | sí | **cierta**; 11 tokens, `metodo_cantu_2` |
| «`metadata/` de cantu-studio está vacío» | sí | **cierta** |

---

## 16. Criterio 19 — estado en que debe quedar el run

**`RUN-CANTU-COLOR-SELECTOR-UNIFICATION-001` debe quedar en `active`.**

Vocabulario del contrato, exclusivamente: `planned`, `active`, `blocked`, `completed`.

Razón: la parte que cabía está ejecutada y verificada, y su QA humana preparada, pero **la QA la
ejecuta el operador** y **quedan tres componentes esperando una decisión que no es de taller**
—la del `success` y la de si el compilador entra en alcance—. No es `blocked`: el run avanzó y
entregó, y nada impide que siga. No es `completed`: eso lo decide la cabina tras la QA y tras
resolver el alcance de §11.

**No se tocó `status`, ni `progress`, ni `closeout_result` de ningún run.** El canónico está
byte-idéntico: md5 `128a233c64c44f16872dd2108f936bca` antes y después.

---

## 17. Criterio 20 — `.project/` no se re-emitió

**No lo re-emití.** Sus seis archivos tienen mtime **22:38**, el mismo instante atómico que
`.aiw/roadmap/roadmap.json` — escritura de la consola al renumerar, **trece minutos antes de mi
primera escritura** (22:51:31). El barrido de mtime de §18 no devuelve ninguno.

---

## 18. Criterio 21 — archivos escritos por este encargo, y ninguno más

Barrido de mtime de **todo el repo** de cantu-studio, excluyendo `node_modules` y `.git`, con
corte en el minuto anterior a mi primera escritura. Devolvió **exactamente siete rutas, las
siete mías**.

| # | Archivo | Acción | md5 final |
|---|---|---|---|
| 1 | `tools/author-lite/editor-ui/src/schemas/draftSchema.js` | **Modificado** — 7 campos | `ba8c2f869d131e56d033caa14786bc2d` |
| 2 | `tools/author-lite/compiler-api/schemas/draftSchema.js` | **Modificado** — los mismos 7 | `0678754424b9c94ccb570d5e257fb8ad` |
| 3 | `tools/author-lite/editor-ui/src/features/editor/components/common/VariantSelect.jsx` | **Reescrito** — §3.1 | `58afff014516e7cec9612c5bbfb686fc` |
| 4 | `tools/author-lite/editor-ui/src/features/editor/components/web/WebBlockEditor.jsx` | **Modificado** — §19 | `e3408117ed47af72d5a34b945d8ed87f` |
| 5 | `tools/author-lite/compiler-api/tests/webHeaderPaletteQuantityAndSwatch.test.mjs` | **Modificado** — 1 caso reescrito | `09dbe0049ac8743de0fb007844fe714a` |
| 6 | `tools/author-lite/compiler-api/tests/webSharedColorSelectorUnification.test.mjs` | **Creado** — 8 casos | `7b415f6ef26437c739d2508a25ae0077` |
| 7 | `docs/_historical_run_record/RUN-CANTU-COLOR-SELECTOR-UNIFICATION-001-OPERATOR-QA-PACKET.md` | **Creado** | `c4e47c1ce3804126f9df87d73c7ae571` |
| 8 | `../aiw-console/context/aiw-console/records/UNIFICACION-SELECTOR-COLOR-WEB-Y-COMPUERTA-DEL-COMPILADOR-CANTU.md` | **Creado** | este record |

El archivo 8 se escribió después del barrido; el barrido cubre los siete de cantu-studio. Ningún
compiler, renderer, packet de componente, índice, draft ni test ajeno fue modificado. Los
archivos temporales de medición viven en el scratchpad de sesión, fuera de los dos repos.

**Nota declarada sobre los finales de línea.** El primer parche de los dos schemas los reescribió
en LF; los dos estaban en CRLF. Se detectó reconstruyendo el archivo revertido y comparando md5
contra el baseline, y **se restauró CRLF antes de seguir**. Prueba: revertir mis siete campos
sobre el archivo actual y volver a CRLF reproduce **exactamente** los md5 de partida
(`6238b4c615f99434fd4d36b25a714fcd` y `ef604b1c049f10b8a2a73578c57e4834`), lo que además
demuestra que **los siete campos son el único cambio de contenido en los dos schemas**.
`VariantSelect.jsx` se restauró igual a CRLF sin newline final, que era su convención.

**Records existentes:** había **76** antes de éste. Éste es el **77**. **Sin colisión de
nombre:** ningún otro record contiene `COMPUERTA`; los dos que contienen `SELECTOR` son
`ALTA-RUN-UNIFICACION-SELECTOR-COLOR-CANTU.md` y `REPARACION-SELECTOR-COLOR-HEADER-CANTU.md`,
de otro nombre completo.

---

## 19. Tabla componente por componente — qué se le hizo a cada uno

| # | Componente | Qué se le hizo | Enum retirado | Recibe paleta | Muestra al lado | Almacenamiento |
|---|---|---|---|---|---|---|
| 1 | `header` | **Fondo tintado retirado**; muestra movida a la derecha; pasa a las piezas compartidas | ya lo estaba (run 15) | ya la recibía | **sí** | token id, sin cambio |
| 2 | `list` | Cableado a la paleta en **las dos colocaciones** | **sí**, `WebListSchema` | **sí** | **sí** | token id, sin cambio |
| 3 | `callout` | Cableado a la paleta en **las dos colocaciones** | **sí**, dos schemas | **sí** | **sí** | token id, sin cambio |
| 4 | `rule` | Cableado a la paleta en **las dos colocaciones** | **sí**, `WebRuleSchema` | **sí** | **sí** | token id, sin cambio |
| 5 | `table` (bloque) | Cableado a la paleta en **las dos colocaciones** | **sí**, `WebTableSchema` | **sí** | **sí** | token id, sin cambio |
| 6 | `details` | Cableado a la paleta, por ítem | **sí**, `DetailsItemSchema` | **sí** | **sí** | token id, sin cambio |
| 7 | `conceptGrid` | Cableado a la paleta, por ítem | **sí**, `ConceptGridItemSchema` | **sí** | **sí** | token id, sin cambio |
| 8 | `hierarchy` | Input «Color hex» → control de `iconList` con `Personalizado` y «Sin color» | no tenía | **sí** | **sí**, el picker | **hex, sin cambio** |
| 9 | `card` | **Nada.** Ya era el patrón | no tenía | ya | ya | sin cambio |
| 10 | `iconList` | **Nada.** Es el patrón de referencia (§8) | no tenía | ya | ya | sin cambio |
| 11 | `split` | **Nada.** Compuerta del compilador (§11) | **no** | no | no | sin cambio |
| 12 | `timeline` | **Nada.** Compuerta + decisión abierta (§4) | **no** | no | no | sin cambio |
| 13 | `table` (badge) | **Nada.** Compuerta del compilador (§11) | **no** | no | no | sin cambio |
| 14 | `visual` | **Nada.** Compartido con Slides (§11) | no tenía | no | ya, el picker | sin cambio |
| 15 | `narrative` | n/a — sin superficie de color | — | — | — | — |
| 16 | `video` | n/a — sin superficie de color | — | — | — | — |
| 17 | `arithmetic` | n/a — sin superficie de color | — | — | — | — |
| — | `columns` | Propaga `colorPalette` a los cinco hijos con color | — | — | — | — |

---

## 20. El diff del editor, en ocho puntos

| Punto | Cambio |
|---|---|
| 1 | Import: `VariantSelect, { ColorTokenSwatch, RegisteredColorSwatch }` |
| 2 | **Eliminados** `HeaderColorSwatch`, `getHeaderColorOptionStyle` y `ColumnHeaderColorSwatch`; sustituidos por las piezas compartidas. `getHeaderColorOptions` y `resolveHeaderAccent` se conservan |
| 3 | `HeaderColorSelect`: `<option>` sin `style`; `<ColorTokenSwatch>` **después** del `<select>` |
| 4 | **Añadido** `ColumnColorSelectField`, espejo de `ColumnRegisteredSelectField` más la muestra |
| 5 | Las cuatro colocaciones de slot de `list`, `callout`, `rule` y `table` pasan a usarlo; **fuera `VARIANT_OPTIONS` en línea** |
| 6 | Rama de `header` en slot: `<option>` sin `style`, muestra detrás, `<RegisteredColorSwatch>` |
| 7 | Los seis `<VariantSelect>` reciben `palette={colorPalette} control={control}`; `DetailsFields`, `ConceptGridFields` y `TableFields` reciben `colorPalette` |
| 8 | **Añadido** `HierarchyNodeColorField`; `HierarchyFields` recibe `colorPalette`; los dos «Color hex» sustituidos |

---

## 21. Criterio 22 — superficies disjuntas, md5 antes y después

**El árbol entero de `aiw-console` se hasheó fichero a fichero al abrir y al cerrar.**

| Medición | Antes | Después |
|---|---|---|
| Ficheros de `aiw-console` (sin `.git` ni `node_modules`) | **252** | **252** |
| md5 del manifiesto completo | **`d3af0f0f0d0b1288be4e6bf346eac3b2`** | **`d3af0f0f0d0b1288be4e6bf346eac3b2`** |
| Diferencias | — | **ninguna** |

**`aiw-console` está byte-idéntico**, incluidos `roadmap/roadmap.json`, `context/DECISIONES.md`,
`context/aiw-console/CONTRATO.md`, `.project/`, handoffs, tests y los 76 records preexistentes.
**A diferencia del run 15, el hilo paralelo no escribió durante mi ventana.** Este record es el
único archivo que añado a ese repo.

**La paleta del operador en `cantu-lessons` se leyó y no se escribió.**

---

## 22. No-claims de este record

- **No se tocó el compilador**, aunque la medición encontró que **es él, y no el schema, quien
  cierra `split`, `timeline` y el badge de `table`**. Tocarlo está fuera de alcance por el
  criterio 15. Cláusula «observación ≠ autorización».
- **No se decidió el `success` de `timeline`.** Se midió, se costearon tres opciones y se
  recomendó una. Elegir es del operador.
- **No se retiró el enum de `split`, `timeline` ni del badge de `table`**, aunque el criterio 4
  los nombra: hacerlo habría producido un editor que ofrece valores que el compilador rechaza.
- **No se tocó `visual`**, porque su editor lo comparte la superficie Slides.
- **No se tocó la superficie Slides.** `SlideCardEditor.jsx` con md5 tomado antes y después,
  idéntico (`1d8a949594f608e7d9644b2c80f09b54`); `SlideItemEditor.jsx` no aparece en el barrido
  de mtime de §18, luego no se escribió (md5 al cerrar `ae92e5f90142a2c50195c807996019a7`, sin
  baseline propio y declarado como tal). La lista que Slides pinta es la misma en valor, etiqueta
  y orden, fijada por test.
- **No se rediseñó `iconList`** ni `card`. Los dos ya cumplían el patrón; se midió punto por punto.
- **No se cambió el almacenamiento de ningún componente.** Token id sigue token id, hex sigue hex,
  y el vacío de `hierarchy` sigue vacío.
- **No se añadió `Personalizado`** a ningún componente que guarde token id.
- **No se migró ningún draft** ni se reescribió ninguno. La paleta del operador se leyó, no se
  escribió.
- **No se editó ningún packet de componente** ni `.aiw/docs/docs_index.json`. El packet de QA
  nuevo **no quedó registrado en el índice**, y se declara.
- **No se tocaron los tres packets de Header anteriores.** Son evidencia de rondas ejecutadas.
- **No se tocó el enum de Header**, ni el mojibake, ni «Full width», ni «Col span».
- **No se editó el contrato de color**, aunque su §6 y su §7 quedan más desactualizados que antes:
  ya son ocho los componentes Web para los que «el control ofrece los tokens que resolverán el
  valor» dejó de significar «un subconjunto acotado». **Se nombra y se deja.**
- **No se certifica nada.** Ningún status de componente cambió; su fuente sigue siendo la matriz.
- **La QA humana no se ejecutó, no se simuló y no se dio por pasada.** Las ocho casillas vacías.
- **No se editó el canónico**, ni status, ni orden de runs, ni `barrier`, ni la arista externa.
- **No se ejecutó git en ninguna forma**, no se levantaron servidores, no se corrieron suites de
  `aiw-console`, y `.project/` no se re-emitió.
- **La entrega es parcial y está declarada** en §11, con clase y coste por componente.
- **El run sigue abierto** hasta que el operador lo cierre desde la consola.
