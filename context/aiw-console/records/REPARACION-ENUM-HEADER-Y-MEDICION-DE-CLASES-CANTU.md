# Reparación del enum de Header y medición de clases de defecto

**Proyecto:** cantu-studio
**Run:** `RUN-JAME-WEB-HEADER-REVALIDATION-001` — `queue_order` 15, carril DEVELOPMENT
**Fecha:** 2026-07-30
**Tipo:** Tercera ronda de REPARACIÓN. Ejecuta la decisión del operador: **opción B + opción C**
del informe de `MEDICION-ENUM-HEADER-Y-INFORME-DE-OPCIONES-CANTU.md`.
**Estado declarado del run:** `active` — no lo cierra este encargo.

**Resultado en una línea:** el enum cerrado de `header.variant` está retirado y el resultado es
**agnóstico a la cantidad de tokens** —verificado con una paleta sintética de 24, ofrecida entera,
guardada entera y compilada entera—; el selector muestra color; **un solo test rompió, el previsto**,
y se reescribió; y la medición de alcance encontró que **Header no era el único con enum cerrado:
hay cuatro más**, uno de ellos —`split`— recorta la paleta a tres valores.

---

## 1. Guarda de identidad, antes de nada

Derivada del canónico por `queue_order`, no por nombre. Ruta recorrida en el JSON:
`objectives[2].phases[2].runs[0]` — objetivo «Cantu Studio Web Components» / fase
«Web Components - Basics». `schema_version: jame.roadmap_v3.v0.2-progress`.

| Campo | Valor leído verbatim del canónico |
|---|---|
| `run_id` | `RUN-JAME-WEB-HEADER-REVALIDATION-001` |
| `title` | `Audit and implement the Header component` |
| `status` | `active` |

Carril: el run **no lleva clave `lane`**; `lanes[]` declara `DEVELOPMENT` con `default: true`,
luego es DEVELOPMENT.

**La guarda pasa.** El título coincide exacto con el del encargo. Se sigue.

**Deriva del canónico desde el record anterior: ninguna.** md5 `1dfcf17eccb7ec79b0864f040a5714b9`,
el mismo valor con que cerraron los dos records previos, mtime 2026-07-30 18:22:20 — anterior a
esta sesión. `queue_order` 14 sigue `completed`, 16 sigue `planned`.

Los tres records previos se leyeron enteros antes de tocar nada.

---

## 2. Criterio 2 — (B) el enum retirado, y agnóstico a la cantidad

### 2.1 El patrón de `card`, leído antes de copiarlo

`card` no tiene enum en su campo de color: `colorToken: z.string().regex(COLOR_TOKEN_ID, …)`
(`editor-ui/src/schemas/draftSchema.js:627`). Su selector deriva la lista con
`getAuthorColorOptions(palette)` **sin filtro** (`WebBlockEditor.jsx:894`, `CardColorField`).

**Header ahora hace exactamente eso.** Un solo campo cambia en cada schema:

| Antes | Después | Ruta y línea |
|---|---|---|
| `variant: VariantEnum.optional()` | `variant: z.string().regex(COLOR_TOKEN_ID, "Token de color invalido").optional()` | `editor-ui/src/schemas/draftSchema.js:550` |
| ídem, carácter por carácter | ídem | `compiler-api/schemas/draftSchema.js:563` |

**`VariantEnum` NO se tocó.** Sigue declarado y sigue en uso por `list`, `callout`, `rule`,
`table`, `details`, `conceptGrid` y la superficie Slides. Retirar el enum **de Header** no es
retirar el enum. Un test nuevo lo fija.

En el selector desapareció el filtro y el respaldo estático:

| Antes (`:75-87`) | Después |
|---|---|
| `getHeaderColorOptions` filtraba `getAuthorColorOptions(palette)` contra `VARIANT_OPTIONS` y caía a `VARIANT_OPTIONS` si quedaba vacío | `const getHeaderColorOptions = (palette) => getAuthorColorOptions(palette);` (`:83`) |
| `normalizeHeaderVariant(value)` validaba contra `VARIANT_OPTIONS` | `normalizeHeaderVariant(value, colorOptions)` valida contra la paleta activa (`:75`) |

**Por qué desapareció también el respaldo:** se midió que `getAuthorColorOptions` **nunca**
devuelve lista vacía — con `null`, `undefined`, `[]` y `{}` devuelve los nueve por defecto. El
`|| VARIANT_OPTIONS` era código muerto, y dejarlo habría sido dejar una lista fija en el camino.

### 2.2 LA VERIFICACIÓN DE CANTIDAD — paleta sintética de 24 tokens, fuera del repo

Ejecutada sobre el código real (schema + compiler + `getAuthorColorOptions`), con una paleta
construida en el scratchpad de sesión, **fuera de los dos repos y fuera de la paleta del operador**.

| Medición | Resultado |
|---|---|
| Tokens sintéticos | **24** |
| Opciones que ofrece el desplegable | **33** — los 24 más los 9 por defecto que la paleta no sobrescribe |
| Sintéticos **no** ofrecidos | **0** |
| Guardados por `WebDraftSchema` | **24 de 24** |
| Resueltos por el compiler al accent exacto | **24 de 24** |
| Token nº 24 de punta a punta | `{"type":"header","level":2,"variant":"synth_24","color":"#8858B8","title":"T"}` |

Y el test aditivo repite el experimento **duplicando** la paleta: pasar de 24 a 48 tokens añade
exactamente 24 opciones, ni una menos. **Sin recorte, sin tope, sin lista fija.**

### 2.3 Ninguna cifra horneada — y la constante de longitud que sí apareció, declarada

Barrido de los tres sitios que el criterio nombra:

| Sitio | ¿Hay cifra de cantidad? |
|---|---|
| Schema (`draftSchema.js:550` / `:563`) | **No.** Un regex de forma de id, ningún conteo |
| Selector (`WebBlockEditor.jsx:75-155`, `:1760-1780`) | **No.** `.map` sobre la lista entera; cero `.filter`, cero `.slice`, cero longitud |
| Test nuevo | **No.** La paleta se construye a partir de un tamaño (`makeSyntheticPalette(size)`), y las aserciones son relativas (`>= size`, `length + 1`, `bigger - offered === size`) |

**La constante de longitud que sí encontré, y se declara como manda el criterio:**
`COLOR_TOKEN_ID = /^[a-z][a-z0-9_-]{1,31}$/` (`draftSchema.js:91` en los dos schemas). **Cap de
32 caracteres por id, no de cantidad de tokens.** Tres hechos medidos sobre ella:

1. Es **exactamente** la que `card.colorToken` ya usaba. Copiar el patrón de `card` es heredarla.
2. `createColorTokenId` (`colorSystem.js:336-348`) **ya trunca a 32** al generar ids, así que el
   editor de paletas no puede producir un id que el schema rechace por largo.
3. Su mínimo de 2 caracteres es inalcanzable desde el editor: `createColorTokenId` cae a `'color'`
   ante una etiqueta de un carácter. Medido con `'x'`, `'A'` y `''` → los tres dan `'color'`.

**No limita la cantidad. Limita la forma, igual que en `card`, y por eso se deja.**

### 2.4 Comportamiento ante un token desconocido — la caída a `ctx`, con evidencia

Es lo que protegía el enum, y el criterio pide verificar que la cadena sigue en pie.

| Capa | `azulito` (id que la paleta no tiene) |
|---|---|
| `WebDraftSchema.parse` | **ACEPTA** — es un id bien formado |
| `resolveAuthorColorToken('azulito', {palette, fallbackId:'ctx'})` | devuelve el token **`ctx`** |
| Compiler → nodo emitido | `{"type":"header","level":2,"variant":"azulito","color":"#5E81AC","title":"T"}` |
| `#5E81AC` | es **exactamente** el accent de `ctx` en la paleta activa |

Verificado también **sin paleta**: cae al `ctx` por defecto. Y verificado que el valor escrito
**se conserva** (`variant: "azulito"`): la referencia no se reescribe, solo el color resuelve.

`resolveAuthorColorToken` (`colorSystem.js:777-803`): busca por id → busca por hex → cae a
`fallbackId`. El compiler llega ahí por `resolveVariantAccentColor` (`compiler.js:174-180`) y el
swatch del editor por `resolveHeaderAccent` (`WebBlockEditor.jsx:104`). **Misma función, misma
caída, editor y salida no pueden separarse.**

**Lo que sí se pierde, declarado:** un `variant` con typo ya no se rechaza al guardar. Se
renderiza en `ctx` en silencio. Es el coste que el informe §5.3 anunció, y `card` vive con él
desde siempre. El regex conserva lo que se podía conservar: `''`, `Mayus`, `con espacio`,
`9leading` y un id de 33 caracteres **siguen rechazándose**. Los cinco están en el test.

---

## 3. Criterio 3 — (C) la muestra de color, derivada del editor

**Ni `card` ni `iconList` la pintan**, así que no había nada que copiar de ellos. Se derivó del
editor de paletas, que es la superficie del propio repo que ya resuelve este problema:

| Pieza | Origen exacto | Dónde queda ahora |
|---|---|---|
| El cuadro de color | `ColorRoleInput` en `preview/ComponentGuide.jsx:1453-1457` — `<span aria-hidden className="h-8 w-8 shrink-0 rounded border border-zinc-200" style={{backgroundColor: …}} />` | `HeaderColorSwatch`, `WebBlockEditor.jsx:87-93`, **markup idéntico** |
| El uso de roles del token como color de fondo | `ComponentGuide.jsx:1327` y `:2257` pintan con `entry.accent` / `roles.surface` del propio token | `getHeaderColorOptionStyle`, `WebBlockEditor.jsx:97-100` |

**Qué muestra cada cosa, y por qué esos roles:**

- **El valor seleccionado** → un cuadro con el **`accent`**, que es el hex que el compiler emite y
  el que pinta la barra izquierda del header. Es el dato que importa, y es el que un `<select>`
  nativo no puede enseñar.
- **Cada opción** → fondo `option.border`, letra `option.text`.

**Por qué `border` y no `accent` en las opciones, medido y no inventado:** el rol `text` de los
once tokens de la paleta activa es `#1E293B` para todos. Sobre los `accent` saturados u oscuros
—`meta` `#4C566A`, `err` `#BF616A`— ese texto queda ilegible; sobre `surface` los once tintes son
casi blancos y no se distinguen entre sí. `border` es el tinte pastel del propio accent —`#AFC0D6`
para `ctx`, `#FBE6BF` para Ámbar, `#DCD7FF` para Lavanda—: **cada opción se ve de su color y el
texto es legible en las once**. Los dos roles salen de la paleta; ninguno se calcula aquí.
`option.border || option.accent` cubre un token con `border` vacío.

**Las dos colocaciones la llevan:**

| Colocación | Muestra del valor | Color por opción |
|---|---|---|
| Top-level, `HeaderColorSelect` (`:135-160`) | `<HeaderColorSwatch accent={selectedAccent} />` (`:148`) | `style={getHeaderColorOptionStyle(option)}` |
| Dentro de slot de `columns` (`:1762-1779`) | `<ColumnHeaderColorSwatch …/>` (`:1765`), que lee el campo con `useWatch` | ídem |

**`ColumnRegisteredSelectField` no se tocó** — la comparte `split`. La rama de header replica su
estructura (label, select registrado, `FieldError`) y le suma el swatch. **`VariantSelect` tampoco
se tocó.**

---

## 4. Criterio 4 — el test que rompe: reescrito, con antes/después y razón

**Rompió exactamente uno, el previsto**, y está reescrito, no borrado.

### 4.1 El test

`compiler-api/tests/webHeaderColorPaletteAuthoringSurface.test.mjs`

| | Antes | Después |
|---|---|---|
| Nombre | `a palette token WebHeaderSchema cannot store is never offered` | `any token of the active palette is offered, storable and resolvable` |
| Qué afirmaba | que un token extra de la paleta (`brandx`) **se filtraba** del control, y que `WebDraftSchema` lo **rechazaba** (`assert.throws`) | que **todos** los tokens de la paleta se ofrecen, se guardan y resuelven al accent mostrado; que crecer la paleta crece el control uno a uno; que un id desconocido cae a `ctx`; y que el campo **sigue validado** (cinco formas inválidas siguen rechazándose) |
| Por qué cambia | codificaba **el límite que este encargo retira**. Su `assert.throws` dejó de lanzar en cuanto el enum salió del schema | el límite ya no existe; lo que debe quedar fijado es lo que lo sustituye |

Su probe usa **12 ids nuevos** que jamás estuvieron en el enum, y verifica el crecimiento con un
token 13. **La cifra no está horneada:** todas las aserciones son relativas al tamaño de la paleta.

### 4.2 Dos piezas de andamiaje del mismo archivo, y por qué se tocaron

No son aserciones; son el espejo del código bajo prueba, y el propio archivo lo dice:
«Mirrors `getHeaderColorOptions` in `WebBlockEditor.jsx`».

| Pieza | Cambio | Efecto en las aserciones de los otros cuatro tests |
|---|---|---|
| `deriveHeaderColorOptions` (`:52-57` → `:47-49`) | se le quitó el filtro, para que siga siendo espejo fiel | **ninguno** |
| `makeProbePalette` (`:36-48` → `:34-41`) | se le quitó el `push` de `brandx`, que solo existía para el test retirado | **ninguno** |

**Cero aserciones de otros tests reescritas.** Los cuatro restantes de ese archivo pasan con su
texto intacto. Se declara porque dejar el espejo desactualizado habría hecho que cuatro tests
afirmaran una ficción.

### 4.3 El segundo test que rompió, y por qué NO se reporta como imprevisto

**Honestidad sobre el camino, no sobre el resultado.** Mi **primera** forma de implementar (C)
extrajo el `<select>` de la rama de slot a un componente propio. Eso rompió un **segundo** test,
`Header color control is wired to the active palette in both placements`, cuya aserción `:85`
exige la cadena literal `getHeaderColorOptions(colorPalette)` **dentro** de la rama de slot.

No lo rompió la retirada del enum: lo rompió mi estructura. **Se reestructuró** — el `<select>`
vuelve a la rama y solo el swatch vive en un componente que lee el campo — y ese test **pasa con
su texto intacto**. La cifra final es la que el criterio 4 permite: **un solo test roto, el
previsto**. La cifra intermedia de dos se declara aquí porque ocurrió, no porque mida nada.

---

## 5. Criterio 5 — los drafts guardados siguen cargando, sin migración

**Ningún draft se tocó.** Barrido de **26** archivos JSON de los dos orígenes reales — el workspace
del operador (`projects/cantu-lessons/drafts/`, donde vive también la paleta activa) y los drafts
internos del repo — contra el `WebDraftSchema` y el compiler **nuevos**.

| Medición | Resultado |
|---|---|
| JSON barridos | **26** |
| Con bloques `header` | **14** (incluye hijos de slot y la forma `type:`) |
| Cargan y compilan | **13 de 14** |
| El que no carga | `cantu-lessons/drafts/web/sandbox_reproductions/bounded/sandbox_theory_complex.web.draft.json` |
| Sus dos issues, verbatim | `webBlocks.5.columns` → «Columnas Web v1 requiere exactamente 2 columnas»; `webBlocks.5.columns.0.blocks.0` → «Unrecognized key(s) in object: 'colSpan'» |
| Bloques `header` totales | **53** |
| Valores de `variant` en los 53 | **`ctx` ×18 y ausente ×35.** Ningún otro |
| Drafts que ganaron clave `color` | **cero** |

**El único fallo es preexistente y ajeno a color:** sus dos issues son de `columns` y de
`colSpan`, exactamente los que el record anterior ya midió antes de que existiera este cambio.
**Ningún draft usa un valor que el enum retirado hubiera aceptado y el regex rechace**, ni al
revés. **Migración: ninguna, y no hacía falta ninguna.**

La paleta del operador se **leyó** y no se escribió.

---

## 6. Criterio 6 — cobertura aditiva, suite y lint

### 6.1 Las cifras

| Métrica | Antes | Después |
|---|---|---|
| Suite `compiler-api` | **302/302**, EXIT 0 | **308/308**, EXIT 0 |
| De los cuales, nuevos | — | **+6**, todos del archivo nuevo |
| Fallos | 0 | **0** |
| `eslint` (editor-ui) | **EXIT 0** | **EXIT 0** |

**La cifra 302 del ticket se verificó corriéndola, y es cierta.** Comandos:
`node --test "tools/author-lite/compiler-api/tests/*.test.mjs"` y
`npm --prefix tools/author-lite/editor-ui run lint`. **No se corrió ninguna suite de `aiw-console`.**

### 6.2 El archivo nuevo

`compiler-api/tests/webHeaderPaletteQuantityAndSwatch.test.mjs` — **6 casos**, ninguno reescrito.

| Caso | Qué asegura |
|---|---|
| Sin enum en ninguno de los dos schemas | `header.variant` es el regex en los dos, con la misma forma que `card.colorToken`; y **`VariantEnum` sigue declarado y vivo** para quien lo usa |
| El control deriva la paleta entera | `getHeaderColorOptions` es `getAuthorColorOptions` sin más; cero `.filter`, cero `.slice`, cero `VARIANT_OPTIONS` en su cuerpo |
| **Cantidad** | 24 tokens sintéticos ofrecidos, guardados y compilados; duplicar la paleta añade exactamente 24 opciones |
| Caída a `ctx` | El id desconocido cae a `ctx` en el editor y en el compiler, con paleta y sin ella |
| **La muestra, en las dos colocaciones** | El swatch existe y su markup es el del editor de paletas; las opciones se pintan con roles del token; el swatch de slot **lee** el campo con `useWatch` y no lo posee |
| Editor y salida concuerdan | Token por token, el hex del swatch es el hex que el compiler emite |

**Ningún test existente se reescribió salvo el del criterio 4.**

---

## 7. LA TABLA DE ALCANCE — clase de defecto de los diecisiete componentes

**Sección propia y visible, como pide el criterio 16. Es el insumo del run general.**
**Read-only: no se reparó ninguno.** Rutas relativas a
`tools/author-lite/editor-ui/src/features/editor/components/` y a
`tools/author-lite/editor-ui/src/schemas/draftSchema.js`. Líneas actuales, medidas en esta sesión.

Las tres clases del enunciado, verificadas y con una corrección medida:

- **Clase 1** — el control no recibe la paleta activa.
- **Clase 2** — la recibe pero guarda hex y pierde el vínculo.
- **Clase 3** — enum cerrado que recorta la paleta.

| # | Componente | Clase 1 | Clase 2 | Clase 3 | Pieza del editor | Campo y gate del schema |
|---|---|---|---|---|---|---|
| 1 | **`header`** | **NO — reparado** | no | **NO — reparado en este encargo** | `HeaderColorSelect` `WebBlockEditor.jsx:135` · slot `:1762` | `variant` regex `draftSchema.js:550` |
| 2 | `card` | no — recibe paleta | **parcial** — con `Personalizado` guarda hex | no — su control escribe `colorToken` | `CardColorField` `:894` | `colorToken` regex `:627` + `color` hex `:626` |
| 3 | `iconList` | no — recibe paleta | **SÍ** | no | `IconListColorField` `common/IconListFields.jsx:26` | `color` hex `:293` |
| 4 | `list` | **SÍ** (`VariantSelect`) | no | **SÍ** — `VariantEnum`, 9 | `common/VariantSelect.jsx:3`, uso `:3878` | `variant` `VariantEnum` `:721` |
| 5 | `callout` | **SÍ** (`VariantSelect`) | no | **SÍ** — `VariantEnum`, 9, en **dos** schemas | `VariantSelect.jsx:3`, uso `:3853` | `:699` y `:706` (slot) |
| 6 | `rule` | **SÍ** (`VariantSelect`) | no | **SÍ** — `VariantEnum`, 9 | `VariantSelect.jsx:3`, uso `:3939` | `variant` `:744` |
| 7 | `table` (bloque) | **SÍ** (`VariantSelect`) | no | **SÍ** — `VariantEnum`, 9 | `VariantSelect.jsx:3`, uso `:3051` | `variant` `:775` |
| 8 | `details` | **SÍ** (`VariantSelect`) | no | **SÍ** — `VariantEnum`, 9, por ítem | `VariantSelect.jsx:3`, uso `:2416` | `DetailsItemSchema.variant` `:320` |
| 9 | `conceptGrid` | **SÍ** (`VariantSelect`) | no | **SÍ** — `VariantEnum`, 9, por ítem | `VariantSelect.jsx:3`, uso `:2562` | `ConceptGridItemSchema.variant` `:330` |
| 10 | `table` (badge de fila) | **SÍ** — constante local | no | **SÍ** — `TableBadgeVariantEnum`, **18 valores, cuatro de ellos hex literales** | `TABLE_BADGE_VARIANT_OPTIONS` `:360` | `TableRichBadgeSchema.variant` `:393` |
| 11 | **`split`** | **SÍ** — constante local de 3 | no | **SÍ — el más severo: `z.enum(['ctx','focus','wrn'])`, 3 valores** | `SPLIT_VARIANT_OPTIONS` `:380` | `WebSplitColumnsChildSchema.variant` `:834` |
| 12 | **`timeline`** | **SÍ** — constante local de 3 | no | **SÍ — `z.enum(['def','ctx','wrn','success'])`, 4; y `success` no es token de paleta** | `TIMELINE_DETAIL_VARIANT_OPTIONS` `:58` | `TimelineStepSchema.detailsVariant` `:479` |
| 13 | `hierarchy` | **SÍ** — input de texto «Color hex» | **SÍ** — guarda hex | no — sin enum | `WebBlockEditor.jsx:3438`, `:3509` | `HierarchyNodeSchema.color` hex `:449` |
| 14 | `visual` | **SÍ** — `<input type="color">` crudo | **SÍ** — guarda hex | no — sin enum | `common/VisualFields.jsx:33` | `visualShape.background` hex `:301` |
| 15 | `narrative` | n/a | n/a | n/a | sin superficie de color | — |
| 16 | `video` | n/a | n/a | n/a | sin superficie de color | — |
| 17 | `arithmetic` | n/a | n/a | n/a | sin superficie de color | — |
| — | `columns` | n/a | n/a | n/a | sin superficie propia | — |

Son 17 componentes del catálogo (`blockCatalog.js`, contados: **17**) y 18 filas, porque `table`
expone **dos** superficies de color independientes.

### 7.1 Lo que esta tabla corrige o añade respecto a lo que el encargo daba por medido

Cuatro cosas, todas medidas, y las tres primeras **agrandan** el problema:

1. **«Header medido» era el único de clase 3. Falso: hay cinco.** Además de Header, tienen enum
   cerrado sobre un campo de color `list`, `callout`, `rule`, `table` (bloque), `details`,
   `conceptGrid` — los seis por `VariantEnum` de 9 — más `table` (badge) con 18, **`split` con 3**
   y **`timeline` con 4**. El caso de `split` es el más severo del repo: recorta una paleta de
   once tokens a tres.
2. **`timeline.detailsVariant` admite `success`, que no es un token de ninguna paleta.** Su
   desplegable ofrece `''`, `wrn` y `success`. Es un enum cerrado que además **no es un subconjunto
   de la paleta**, a diferencia de todos los demás.
3. **La clase 1 y la clase 3 casi siempre van juntas.** De los once componentes con superficie de
   color que hoy no reciben paleta, **nueve** tienen además enum o constante cerrada. Arreglar solo
   el cableado (clase 1) dejaría el recorte (clase 3) en pie, que es exactamente lo que le pasó a
   Header entre la ronda 2 y esta.
4. **Los doce de clase 1 son once ahora.** Header salió de la lista.

### 7.2 Clase 2 — `iconList`, medido y nombrado como lo que es

**Es el diseño documentado del contrato §7, no un bug.** `IconListColorField`
(`common/IconListFields.jsx:26`) **sí** recibe la paleta y **sí** ofrece los once tokens. Lo que
guarda es el **hex resuelto**, no el id (`:45`). Al abrir, `getPaletteIdFromHex` (`:15-24`) mapea
ese hex contra la paleta; si el operador movió el accent, ya no casa con ningún token, **el
desplegable cae a `Personalizado`** y el color compilado se queda en el viejo.

**Se mide y se nombra. No se cambia.** Cambiar su diseño está fuera de alcance por decisión
explícita del encargo. `card` comparte la mitad del patrón: cuando el autor elige `Personalizado`
guarda hex en `color` en vez de id en `colorToken`, y ese valor tampoco sigue a la paleta — pero
`card` conserva la vía del token id, así que solo cae en clase 2 **si** el autor usa la opción
personalizada. Se declara como «parcial» por eso.

**Consecuencia para el contrato de color §7, nombrada y no editada:** el contrato describe la
invariancia de scope y la regla «save and load preserve the reference». Con Header ya fuera del
enum, el §7 y el §6 quedan **desactualizados en un punto concreto**: dicen que el control debe
ofrecer los tokens que resolverán el valor al compilar, y ya no hay ningún componente Web para el
que eso signifique «un subconjunto acotado». **Se nombra. No se edita**, como manda el alcance.

---

## 8. Criterio 8 — el coste MEDIDO de arreglar cada componente

**No son estimaciones.** Para cada componente se parcheó su bloque de schema en **los dos**
schemas —sustituyendo su enum por el mismo regex que ahora usa Header—, se corrió **la suite
entera**, se contaron los fallos y se restauró desde copia. **md5 antes y después: idénticos,
verificado por el propio script** (`md5 restaurado OK: true`).

| Componente | Schema parcheado | **Tests rotos** | Cuáles |
|---|---|---|---|
| `list` | `WebListSchema` | **0** | — |
| `callout` | `WebCalloutSchema` | **0** | — |
| `callout` (slot) | `WebColumnsCalloutSchema` | **0** | — |
| `rule` | `WebRuleSchema` | **0** | — |
| `table` (bloque) | `WebTableSchema` | **0** | — |
| `details` | `DetailsItemSchema` | **0** | — |
| `conceptGrid` | `ConceptGridItemSchema` | **0** | — |
| `split` | `WebSplitColumnsChildSchema` | **0** | — |
| `card` | `WebCardShape` | **0** | — |
| `timeline` | `TimelineStepSchema` | **1** | `timeline details reject unsafe payloads and unsupported variants` |
| `table` (badge) | `TableRichBadgeSchema` | **2** | `rich table rows validate, roundtrip through import, and compile to Core object cells`; `table is accepted as a structured Web Columns child after I8B3` |

**Los seis de `VariantSelect` cuestan CERO tests entre los once.** Ninguno quedó sin medir.

### 8.1 El coste del cableado del selector, medido aparte

Retirar el enum es la mitad; pasarle la paleta a `VariantSelect` es la otra. **Su coste en tests
también es cero, y por una razón que conviene saber:**

| Medición | Resultado |
|---|---|
| Archivos de test que citan `VariantSelect` o `VARIANT_OPTIONS` | **2**, y **los dos son de Header** — el reescrito y el nuevo de este encargo |
| Tests que afirman el cableado de `VariantSelect` para los seis | **cero** |

**No hay ninguna red que proteja hoy el comportamiento del selector compartido.** Repararlo no
rompe nada, y tampoco hay nada que avise si se rompe. Es un dato de riesgo, no de coste.

### 8.2 Drafts reales que usarían un valor hoy fuera de rango

Barrido de los mismos 26 JSON, por componente:

| Componente | Valores de color hallados en drafts reales | ¿Alguno fuera del enum actual? |
|---|---|---|
| `header` | `ctx` ×18 | no |
| `list` | `ctx` ×14, `def` ×1 | no |
| `callout` | `wrn` ×9, `ctx` ×3, y los otros siete del enum | no |
| `rule` | `def` ×3, `ctx` ×2, `str`, `res`, `wrn`, `err` ×2 c/u, `ex` ×1 | no |
| `table` | `res` ×8, `ctx` ×8, `err` ×7, `wrn` ×5, `def` ×4, `str`/`focus` ×2, `meta`/`ex` ×1 | no |
| `details` | `ctx` ×4, `wrn` ×2, `err` ×2 | no |
| `conceptGrid` | `def` ×3, `focus` ×3 | no |
| `split` | `ctx` ×3, `focus` ×2, `wrn` ×1 | **no**, pero usa **los tres** que su enum admite |
| `card` | `ctx` ×14, `def` ×3, `meta` ×3, + `metric`/`code`/`persona` ×1 | los tres últimos son alias de `cardType`, dentro de `CardVariantEnum` |
| `card.color` | `#434C5E` ×1 | hex personalizado, clase 2 |
| `iconList.color` | 4 hex distintos, ×5 usos | hex, clase 2 por diseño |
| `hierarchy.color` | 4 hex distintos, ×7 usos | hex a mano |
| `timeline` | **ningún valor** de `detailsVariant` | — |

**Cero drafts reales quedarían fuera si se retirara cualquiera de los enums.** El riesgo de
migración medido para los diez componentes restantes es **cero**, igual que lo fue para Header.

**Dato que ordena el run general:** `split` ya agotó su enum de tres. Es el candidato con la
relación coste/beneficio más clara — 0 tests, 0 drafts, y su autor ya usa el 100 % de lo que le
dejan elegir.

---

## 9. Criterio 9 — NINGÚN otro componente reparado

**Cero archivos de código de otro componente modificados.** En particular:

- **`common/VariantSelect.jsx` no se tocó.** md5 sin cambio, mtime sin cambio. Arreglarlo cerraría
  seis componentes de una vez y cuesta cero tests (§8.1) — **y sigue siendo decisión de alcance del
  operador**. Cláusula «observación ≠ autorización» de la Definition of Done.
- **`ColumnRegisteredSelectField` no se tocó**, aunque la rama de header dejó de usarlo: lo comparte
  `split`.
- **`iconList` no se tocó.** Su defecto de clase 2 es más visible que el de Header y no es de aquí.
- **`VariantEnum`, `CardVariantEnum` y `TableBadgeVariantEnum` no se tocaron.** Los tres siguen
  declarados, vigentes y con sus mismos consumidores.
- **`split` y `timeline` no se tocaron**, aunque son los dos enums más severos del repo.

El experimento de medición de §8 modificó los dos schemas **once veces** de forma temporal y los
**restauró las once**, con md5 verificado por el propio script al cerrar.

---

## 10. Criterio 10 — lo que no se tocó

| Superficie | Estado |
|---|---|
| **Mojibake de los mensajes de schema** | **Intacto.** Sigue en `:293`, `:547`, y decenas más, en los dos schemas. El mensaje que este encargo añade va en ASCII limpio |
| **«Full width» y «Col span»** | **Intactos.** `PlacementFields` y sus dos sitios de montaje sin cambio |
| **`docs/components/web/HEADER.md`** | **Intacto**, md5 `90bb753cf028618ebf381cd9383f929b` antes y después |
| **`.aiw/docs/docs_index.json`** | **Intacto**, md5 `bc708a5847f66291ea1cd719eb6a0ecb`, mtime 18:13:52 anterior a la sesión |
| **Los dos packets anteriores** | **Intactos**, md5 `1adf2a37…` y `806290576…`. Son evidencia de rondas ejecutadas |

**Material que el packet del run 16 debe decir ahora, y que este encargo NO escribe** — corrige lo
que los dos records anteriores dejaron preparado, porque el límite que describían ya no existe:

- El desplegable de color de Header ofrece **todos** los tokens de la paleta Web activa. **No hay
  número máximo.** Un token que el operador añada a su paleta **aparece**.
- El valor guardado sigue siendo el token id, y sigue sin escribirse ningún hex en el draft.
- Un `variant` que la paleta no tenga **se acepta al guardar** y **se pinta en `ctx`** al compilar.
  Es el cambio de comportamiento que el packet debe documentar.
- El control **muestra el color**: cada opción con el suyo, y el valor elegido con un cuadro que
  lleva el accent exacto que el compiler emite.
- **No hay opción `Personalizado`**, a diferencia de `card` e `iconList`, y sigue sin haberla.
- Sigue pendiente todo lo de la §14 del primer record: los dos bloques de auditoría, los tres
  punteros rotos y los hechos que el packet no tiene.

---

## 11. Criterio 11 — re-QA PREPARADA Y DETENIDA

`docs/_historical_run_record/RUN-JAME-WEB-HEADER-REVALIDATION-001-OPERATOR-RE-QA-PACKET-ROUND-3.md`,
**archivo nuevo junto a los dos anteriores**, formato §6 de la DoD, **cinco comprobaciones**.

**Los dos packets anteriores se dejan byte-idénticos y se les cita.** Son evidencia de rondas ya
ejecutadas; añadirles secciones renumeraría runbooks ejecutados y volvería falsa su propia
cláusula de cierre.

Las cinco, todas autocontenidas y ninguna pidiendo comparar contra un «antes» no registrado:

| # | Verifica |
|---|---|
| 1 | **El requisito de cantidad.** Que `color_2` (Ámbar, `#F4B847`) y `color` (Lavanda, `#9A8CFF`) —los dos que la ronda 2 midió como ausentes— **aparecen** ahora en el desplegable |
| 2 | **Que se guarda y se renderiza.** Elegir Ámbar, guardar, cerrar, reabrir, compilar: `"variant":"color_2"`, `"color":"#F4B847"`, y la barra de acento en ese hex |
| 3 | **Que la cantidad no limita.** Añadir tres tokens nuevos a la paleta y ver los tres en el desplegable, con tantas entradas como tokens tenga la paleta |
| 4 | **Que el color se ve.** Cada opción tintada con su color, cuadro con el accent del valor elegido, y que ese cuadro sigue un cambio de accent |
| 5 | **Que nada de alrededor se rompió.** Las tres colocaciones, y un draft guardado que abre, conserva sus otros tres controles y compila a `ctx` / `#5E81AC` |

Inglés ASCII puro verificado con barrido de bytes: **cero** bytes fuera de rango.
**Ninguna casilla de veredicto se rellenó.** La QA humana no se ejecutó ni se simuló.

---

## 12. Criterio 12 — validador y cifras, medidas en esta sesión

Vía que no escribe: `node tools/project-console/validate-project-console-state.mjs`.

| Métrica | Antes | Después |
|---|---|---|
| Validador | **EXIT 0** | **EXIT 0** |
| **Objetivos / fases / runs** | **7 / 28 / 73** | **7 / 28 / 73** |
| **Component statuses** | **16** | **16** |
| `Docs indexed` | 149 | 149 |
| `Docs curated primary-visible` | 60 de 149 | 60 de 149 |
| Colas | `needs_human_decision=0 now=1 ready_next=20 later=37 history=15` | idéntico |
| Etapas del run activo | `RUN-JAME-WEB-HEADER-REVALIDATION-001=none` | idéntico |
| Episodios de procedencia git | 9 | 9 |
| Avisos | **1 no bloqueante**, arista externa `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001` | **el mismo, único** |

**Component statuses: 16, sin moverse.** El único aviso es el no bloqueante de la arista externa,
que no se resolvió. **`Docs indexed` sigue en 149: el packet de re-QA nuevo NO se registró**, y se
declara — el registro es de quien tenga el turno de escritor del índice.

---

## 13. Criterio 13 — cifras del ticket, verificadas y no creídas

| Cifra o afirmación del encargo | ¿Verificada? | Resultado |
|---|---|---|
| Suite **302** | sí, corriéndola | **cierta** antes del cambio; 308 después |
| **Component statuses: 16** | sí, dos veces | **cierta**, sin moverse |
| **17 componentes** | sí, contando las claves de `blockCatalog.js` | **cierta** |
| Opción B rompe **1 test** | sí, aplicándola | **cierta** — el mismo test que el informe nombró |
| Opción C cuesta **0 tests** | sí | **cierta con matiz**: 0 si el `<select>` no sale de su rama; mi primera forma rompió uno (§4.3) |
| **0 drafts afectados**, 26 JSON, 12 con Header, 45 bloques | sí, rebarrido | **cierta en el fondo, corregida en las cifras**: 26 JSON, **14** con Header, **53** bloques. La diferencia es que cuento también los hijos de slot y la forma `type:`. **Cero afectados: confirmado** |
| Compilador y renderer ya aceptan tokens de fuera del enum | sí | **cierta**, y no se tocó ninguno de los dos |
| `color_2` → `#F4B847`, `color` → `#9A8CFF` | sí, en la paleta activa | **ciertas las dos** |
| El schema es el único gate | sí | **cierta** — retirado el gate, los 24 tokens sintéticos pasan de punta a punta |
| «Doce de clase 1, seis por `VariantSelect`» | sí | **seis por `VariantSelect`: cierta.** **Doce: ya no** — son **once**, porque Header salió |
| «Header medido» como único de clase 3 | sí | **FALSA por defecto.** Hay **cinco** familias de enum cerrado más (§7.1) |

---

## 14. Criterio 14 — estado en que debe quedar el run

**`RUN-JAME-WEB-HEADER-REVALIDATION-001` debe quedar en `active`.**

Vocabulario del contrato, exclusivamente: `planned`, `active`, `blocked`, `completed`.

Razón: la reparación que el operador decidió está ejecutada y su re-QA preparada, pero **la re-QA
la ejecuta el operador**. No es `blocked`: nada impide avanzar, y la decisión que bloqueaba la
ronda 2 ya está tomada. No es `completed`: eso lo decide la cabina tras la re-QA, y el run 16 sigue
`planned`.

**No se tocó `status`, ni `progress`, ni `closeout_result` de ningún run.** El canónico está
byte-idéntico.

---

## 15. Criterio 15 — `.project/` no se re-emitió

**No lo re-emití.** Sus seis archivos tienen mtime **2026-07-30 18:22:20**, el mismo instante
atómico que `.aiw/roadmap/roadmap.json` — escritura de la consola al cerrar el run 14, **casi tres
horas antes de mi primera escritura** (21:07:12). El barrido de mtime de §16 no devuelve ninguno.

---

## 16. Criterio 16 — archivos escritos por este encargo, y ninguno más

Barrido de mtime de **todo el repo** de cantu-studio, excluyendo `node_modules` y `.git`, con corte
en el minuto anterior a mi primera escritura. Devolvió **exactamente cinco rutas**, las cinco mías.

| # | Archivo | Acción | md5 final |
|---|---|---|---|
| 1 | `tools/author-lite/editor-ui/src/schemas/draftSchema.js` | **Modificado** — 1 campo + comentario | `6238b4c615f99434fd4d36b25a714fcd` |
| 2 | `tools/author-lite/compiler-api/schemas/draftSchema.js` | **Modificado** — 1 campo + comentario | `ef604b1c049f10b8a2a73578c57e4834` |
| 3 | `tools/author-lite/editor-ui/src/features/editor/components/web/WebBlockEditor.jsx` | **Modificado** — §17 | `a220f2c21dfad369d5d53b262f52ec15` |
| 4 | `tools/author-lite/compiler-api/tests/webHeaderColorPaletteAuthoringSurface.test.mjs` | **Modificado** — 1 test reescrito + 2 piezas de andamiaje | `b2d049db10274f13e81b110a6f59d0c4` |
| 5 | `tools/author-lite/compiler-api/tests/webHeaderPaletteQuantityAndSwatch.test.mjs` | **Creado** (cobertura aditiva, 6 casos) | `882aed5b60a4f7d9207836c137f1a2e7` |
| 6 | `docs/_historical_run_record/…-OPERATOR-RE-QA-PACKET-ROUND-3.md` | **Creado** (re-QA) | `782e767ea24df2dc9259a205d8ba06f8` |
| 7 | `../aiw-console/context/aiw-console/records/REPARACION-ENUM-HEADER-Y-MEDICION-DE-CLASES-CANTU.md` | **Creado** | este record |

Los archivos 6 y 7 se escribieron después del barrido; el barrido cubre los cinco de código.
Ningún compiler, renderer, packet de componente, índice, draft ni test ajeno fue modificado. Los
archivos temporales de medición y las copias del experimento de §8 viven en el scratchpad de
sesión, fuera de los dos repos.

**Nota sobre el mtime de los dos schemas:** marcan 21:12:46, posterior a mi última edición de
contenido. Lo movió la **restauración** del experimento de §8, que es una copia. Su md5 es el de mi
versión editada, y la suite en verde después lo confirma.

**Records existentes:** había **73** antes de éste. Éste es el **74**. **Sin colisión de nombre:**
ningún otro record contiene `CLASES`; el único que contiene `ENUM` es
`MEDICION-ENUM-HEADER-Y-INFORME-DE-OPCIONES-CANTU.md`, de otro nombre completo y de otro asunto.

---

## 17. El diff del editor, en seis puntos

| Punto | Línea | Cambio |
|---|---|---|
| 1 | `:75-77` | `normalizeHeaderVariant` pasa a validar contra las opciones de la paleta, no contra `VARIANT_OPTIONS` |
| 2 | `:79-83` | `getHeaderColorOptions` queda en `getAuthorColorOptions(palette)`. **Fuera el filtro y fuera el respaldo estático** |
| 3 | `:85-93` | **Añadido** `HeaderColorSwatch`, markup copiado de `ColorRoleInput` del editor de paletas |
| 4 | `:95-107` | **Añadidos** `getHeaderColorOptionStyle` y `resolveHeaderAccent` |
| 5 | `:135-160` | `HeaderColorSelect` envuelve su `<select>` en un flex con el swatch delante, y pinta cada `<option>` |
| 6 | `:750-757`, `:1762-1779` | **Añadido** `ColumnHeaderColorSwatch` (solo lee, vía `useWatch`); la rama de slot deja de usar `ColumnRegisteredSelectField` y replica su estructura con el swatch. **`getHeaderColorOptions(colorPalette)` sigue dentro de la rama** |

**`VariantSelect` no se tocó. `ColumnRegisteredSelectField` no se tocó. `VARIANT_OPTIONS` sigue
importado y en uso** por `callout`, `list`, `rule`, `table` y el badge — su import no quedó huérfano
y `eslint` da EXIT 0.

---

## 18. Criterio 17 — superficies disjuntas, md5 antes y después

| Ruta | md5 antes | md5 después | ¿Cambió? |
|---|---|---|---|
| cantu `.aiw/roadmap/roadmap.json` | `1dfcf17eccb7ec79b0864f040a5714b9` | `1dfcf17eccb7ec79b0864f040a5714b9` | **No** |
| cantu `.aiw/state/component_status.json` | `f591165bbf19862b04433129d9edf2cb` | `f591165bbf19862b04433129d9edf2cb` | **No** |
| cantu `.aiw/docs/docs_index.json` | `bc708a5847f66291ea1cd719eb6a0ecb` | `bc708a5847f66291ea1cd719eb6a0ecb` | **No** |
| cantu `docs/components/web/HEADER.md` | `90bb753cf028618ebf381cd9383f929b` | `90bb753cf028618ebf381cd9383f929b` | **No** |
| cantu packet de QA (ronda 1) | `1adf2a37eae904326ec2bcb15cf5eabd` | `1adf2a37eae904326ec2bcb15cf5eabd` | **No** |
| cantu packet de re-QA (ronda 2) | `806290576cc79c39994f5e7a630f7bc5` | `806290576cc79c39994f5e7a630f7bc5` | **No** |
| aiw-console `.aiw/roadmap/roadmap.json` | `08b9d813d6e3ee31aee464eb02294b61` | `08b9d813d6e3ee31aee464eb02294b61` | **No** |
| aiw-console `context/aiw-console/CONTRATO.md` | `f77ccec64d99f2048d4bde41638cb228` | `f77ccec64d99f2048d4bde41638cb228` | **No** |
| aiw-console `context/DECISIONES.md` | `0bdfe5a19ee0ce59b55526f2719a3088` | `0bdfe5a19ee0ce59b55526f2719a3088` | **No** |
| aiw-console `context/CLASIFICACION-DE-RUNS.md` | `3770e67255df2dce6ae1225367ebbcb4` | `3770e67255df2dce6ae1225367ebbcb4` | **No** |
| aiw-console `roadmap/roadmap.json` | `68b6fd8a2f13312cff386bf8b390ca17` | `41839f226c0b9c82e763f9ad37ecb44f` | **SÍ — no fui yo, ver abajo** |

**Nota honesta sobre `roadmap/roadmap.json` de aiw-console.** Su md5 **cambió** durante la sesión.
**Nunca lo abrí**, ni para leer más allá de tomarle el md5 al empezar y al cerrar; el criterio 17 lo
declara expresamente fuera de mi superficie y así se respetó. Es el hilo paralelo trabajando sobre
`aiw-console`, exactamente como el criterio advierte. Se declara porque es prueba directa de que
los dos talleres están en vuelo y de que las superficies fueron disjuntas.

`context/aiw/`, `.project/` de aiw-console, handoffs, tests y records existentes de aiw-console:
**sin tocar**. **La paleta del operador en `cantu-lessons` se leyó y no se escribió.**

### 18.1 Dos cosas ocurridas en el repo que no son mías, declaradas

1. **El repositorio git se movió.** El barrido de mtime devuelve objetos, refs y `COMMIT_EDITMSG`
   nuevos dentro de `.git/`. **No fui yo:** el operador hace sus commits desde GitHub Desktop, y el
   validador registra `918 commits` con `source=local_git_autosync`. Se declara porque el barrido
   lo devuelve.
2. **Ejecuté `git stash list` una vez, por error**, dentro de un comando compuesto. Es una lectura,
   no modificó nada, y **no volvió a ejecutarse git en ninguna forma**. Devolvió una entrada de
   stash preexistente y ajena a este encargo. Se declara porque el encargo pone git fuera de alcance
   y la regla es reportar lo que pasó, no lo que debía pasar.

---

## 19. No-claims de este record

- **No se reparó ningún otro componente**, aun habiendo medido que **cinco familias de enum cerrado
  más** existen, que los seis de `VariantSelect` cuestan **cero** tests y **cero** drafts, y que
  arreglar esa única pieza los cerraría de golpe. Cláusula «observación ≠ autorización».
- **No se tocó `VariantSelect.jsx`**, ni `ColumnRegisteredSelectField`, ni `VariantEnum`, ni
  `CardVariantEnum`, ni `TableBadgeVariantEnum`, ni los enums de `split` y `timeline`.
- **No se cambió el diseño de `iconList`.** Que guarde hex es su contrato documentado; se midió y se
  nombró como lo que es, no como bug.
- **No se tocaron el compiler ni el renderer.** El único gate era el schema, y la salida compilada de
  un draft existente es idéntica bajo la paleta por defecto.
- **No se migró ningún draft** ni se reescribió ninguno. La paleta del operador se leyó, no se
  escribió.
- **No se añadió opción `Personalizado`** a Header: exigiría un campo hex nuevo en el schema.
- **No se editó el packet del componente** ni `.aiw/docs/docs_index.json`. El packet de re-QA nuevo
  **no quedó registrado en el índice**, y se declara.
- **No se tocaron los dos packets anteriores.** Son evidencia de rondas ejecutadas.
- **No se tocó el mojibake**, ni «Full width», ni «Col span».
- **No se editó el contrato de color** aunque su §6 y su §7 quedan desactualizados por este cambio.
  Se nombra en §7.2 y se deja.
- **No se certifica nada.** Ningún status de componente cambió; su fuente sigue siendo la matriz.
- **La re-QA no se ejecutó, no se simuló y no se dio por pasada.** Las cinco casillas vacías.
- **No se editó el canónico**, ni status, ni orden de runs, ni `barrier`, ni la arista externa.
- **No se decide ninguna decisión abierta.** La medición de §7 y §8 **prepara** el run general; no
  ejecuta ninguna parte de él.
- **No se levantaron servidores**, no se corrieron suites de `aiw-console`, y `.project/` no se
  re-emitió. Sobre git, ver §18.1.
- **El run sigue abierto** hasta que el operador lo cierre desde la consola.
