# Cuatro roles al render y selector personalizado — `cantu-studio`, `queue_order` 19

**Proyecto:** cantu-studio (implementación) · aiw-console (motor de roadmap, record)
**Fecha:** 2026-08-02
**Naturaleza:** ejecución de la **opción B** que el operador eligió con el informe de opciones
delante. Amplía el alcance del run abierto `queue_order` 19 bajo la política `D-061`, enmienda
su texto **antes** de implementar, e implementa.
**Archivos escritos:** ver §11.

---

## 1. Identidad del run, derivada del canónico — NO tecleada

| Campo | Valor derivado del canónico |
|---|---|
| `queue_order` | 19 |
| `run_id` | `RUN-CANTU-AUTHOR-PALETTE-COMPILER-ENGINE-001` |
| `title` | `Carry the author palette through the compiler and the Web engine` |
| Objetivo / fase contenedora | `O5` / `O5.P5` |
| `status` | `active` (no se toca) |

**El título casa VERBATIM con el criterio del encargo.** La compuerta de parada no se dispara.
El run **no tiene campo `phase` propio**: la fase es la del contenedor, dato que importa porque
la condición 3 de `D-061` prohíbe cambiarla.

Totales verificados en disco, no heredados: **66 runs**, `queue_order` **1..66 denso**, sin
huecos ni duplicados.

---

## 2. La ampliación, declarada en la forma que exige `D-061`

**Alcance original del run.** Su `full_description` vigente declaraba la base medida —desde la
unificación del selector de color el editor ofrece la paleta activa a componentes cuya salida
compilada lleva solo el id del token, y el motor Web lo resuelve contra un mapa fijo en
`src/builders/web/partials/commons.js`, de modo que un token que no sea clave de ese mapa cae
en silencio— y **dos rutas medidas entre las que el run decidía e implementaba una**. Declaraba
que el run escribe los tests que no existían, que **exige QA visual del operador** y que la
reparación se autoriza solo por ese veredicto; y fijaba tres fronteras: los conjuntos cerrados
de variante del compilador, el motor Slide, y ninguna revalidación de componente aquí.

**Qué reveló la QA humana.** El operador ejecutó la QA y devolvió **`CHANGES_REQUIRED`**: los
componentes que solo ofrecían la lista de tokens **no ofrecían color personalizado con picker**.
Esa limitación existía porque un hex personalizado no llegaba a la salida en los componentes que
el compilador no resolvía — exactamente la limitación que ese mismo run acababa de levantar.

**Qué se añadió.** Los cuatro puntos que el `full_description` enmendado enumera: emisión de los
roles derivados, reparación del descarte del hex, lectura del rol compilado en el único renderer
que lo consume, y el picker en las ocho colocaciones que tenían el desplegable sin él.

**Por qué no era un run nuevo.** Cumple las cuatro condiciones de `D-061`: (1) lo pidió el
operador por escrito como veredicto de QA; (2) cae sobre la superficie que la QA ejercitó y
sobre la pieza cuya limitación este mismo run levantó; (3) **no cambia la identidad del run** —
el título vigente ya nombra el motor Web, y ni `title`, ni objetivo, ni fase, ni `run_id`, ni
`status` se tocaron; (4) el texto se enmendó en este mismo encargo.

**Cómo se enmendó el texto.** Vía el motor de `projects/aiw-console/tools/roadmap/`, operación
`set-text` sobre `full_description` y nada más. Detalle en §7.

**Corolario vigilado.** `D-061` dice que una segunda ampliación se para y se devuelve al
operador. Este encargo **no** amplió por segunda vez: lo único que apareció fuera de la lista y
se hizo es la apertura del **segundo esquema** y el renombrado de una clave de salida, ambos
condición necesaria de lo ya autorizado, no alcance nuevo. Se declaran en §9.

---

## 3. La medición, hecha antes de tocar nada — con archivo y línea

**No se heredó ninguna cifra del encargo anterior.** Donde discrepa, gana el disco y la
discrepancia se declara (§10).

### 3.1 La función de derivación y los nombres exactos de sus roles

`deriveColorRolesFromAccent`, en
`tools/author-lite/editor-ui/src/features/editor/constants/colorSystem.js:373-385`.

```
deriveColorRolesFromAccent("#FF007F")
  = {"accent":"#FF007F","surface":"#FFEBF5","border":"#FFA6D2","text":"#1E293B"}
NOMBRES EXACTOS: ["accent","surface","border","text"]
```

`surface` = mezcla con blanco al 0,92; `border` = al 0,65; `text` = constante
`DEFAULT_TEXT_COLOR` (`:13`, `#1E293B`). Se alcanza desde el compilador sin escribir nada nuevo:
`resolveAuthorColorToken` (`:777-804`) ya la llama para un hex sin token (`:797`), y
`createAuthorColorToken` (`:426-450`) **prefiere el rol autorado sobre el derivado**
(`normalizeRoleHex(token?.surface, roles.surface)`, `:445-447`). Ese detalle es la clave de la
regresión cero: un token de la paleta aporta sus roles **autorados**, no los derivados.

### 3.2 Qué emitía el compilador por componente, y en qué punto — ANTES

Tres funciones de resolución y diez puntos de emisión, todos en
`tools/author-lite/compiler-api/services/compiler.js`:

| Función (antes) | Línea | Devolvía | Puntos de emisión |
|---|---|---|---|
| `resolveCardColor` | `:150` | `.accent` | `:316` metric, `:344` persona, `:367` card normal |
| `resolveVariantAccentColor` | `:174` | `.accent` | `:1091` header, `:1137` list |
| `resolvePaletteAccentColorIfDefined` | `:184` | `.accent` **o `undefined`** | `:375` rule, `:392` details item, `:408` conceptGrid item, `:540` table, `:1103` callout |

**Cero `surface`, cero `border`, cero `text` en la salida de los diez.** Solo el acento.

### 3.3 Qué roles leía cada renderer, y de dónde — ANTES

Medido cargando los módulos y renderizando HTML real, no leyendo código:

| Renderer | Acento | ¿Algún otro rol atado a la variante? | De dónde |
|---|---|---|---|
| `renderCallout` | `data.color` \|\| mapa | **SÍ — el fondo suave**, `:52` `bg: paletteConfig.bg` | `commons.PALETTE[...].bg` |
| `renderHeader` | `data.color` \|\| mapa | no | — |
| `renderCard` | `data.color` \|\| mapa | no (`C.bg`, `C.border` son neutros fijos) | — |
| `renderList` | `data.color` \|\| mapa | no | — |
| `renderRule` | `data.color` \|\| mapa | no (`paletteConfig.bg` solo se **compara**, `:42`) | — |
| `renderDetails` | `item.color` \|\| mapa | no | — |
| `renderConceptGrid` | `item.color` \|\| **mapa propio** | no (`theme.bg` nunca se usa) | `src/design/tokens/tokens.js` |
| `renderTable` | `data.color` \|\| mapa | no (`border`, `bgHeader`, `textHead` son neutros fijos) | — |
| `renderIconList`, `renderHierarchy` | hex crudo | no | — |

**Resultado central de la medición: `renderCallout` es el ÚNICO renderer Web que toma del mapa
fijo un rol atado a la variante además del acento.** Los "fondo suave, borde y texto" del
enunciado son, en disco, exactamente **un rol en un renderer**.

### 3.4 Componentes con selector de color author-facing, control y estado del personalizado

| Componente / superficie | Control | Colocaciones | ¿Personalizado antes? |
|---|---|---|---|
| `header` | `ColorTokenOrCustomField` propio | 2 | **sí** |
| `list` | `VariantSelect` + `allowCustom` | 2 | **sí** |
| `callout` | `VariantSelect` / `ColumnColorSelectField` sin `allowCustom` | 2 | no |
| `rule` | ídem | 2 | no |
| `table` (selector principal) | ídem | 2 | no |
| `details` items | `VariantSelect` sin `allowCustom` | 1 | no |
| `conceptGrid` items | ídem | 1 | no |
| `card` | control propio + `input type="color"` crudo | 2 | sí (control propio) |
| `iconList` items | control propio + crudo (`IconListFields.jsx`) | 2 | sí (control propio) |
| `hierarchy` nodos | control propio + crudo | 1 | sí (control propio) |
| `visual` fondo | crudo, **no es selector de paleta** | 1 | n/a |
| `split`, `timeline` detalle, `table` badge | listas fijas | — | no, y así se quedan |
| `narrative`, `arithmetic`, `video`, `columns` | **sin superficie de color** | — | n/a |

**Ocho colocaciones sin picker.** Ése es el alcance real del punto 4.

### 3.5 Las claves del mapa fijo, cargando el módulo

`src/builders/web/partials/commons.js` (CommonJS, `require`):

```
commons.PALETTE  (10): ["gray","blue","purple","cyan","gold","champagne","green","orange","red","code"]
commons.VARIANTS (13): ["def","ctx","ex","meta","focus","str","res","success","wrn","warning","err","error","code"]
forma de cada entrada de PALETTE: ["color","bg"]   → el mapa fijo NO tiene border ni text
```

Segundo mapa, propio de un renderer: `src/design/tokens/tokens.js`, 12 claves, forma
`["main","bg","label"]`. Lo consume `renderConceptGrid` en Web (y varios renderers Slide).

### 3.6 Coincidencia mapa fijo vs paleta por defecto, rol a rol

```
id    | palKey     | fijo.color | pal.accent | accent  | fijo.bg   | pal.surface | surface
def   | purple     | #B48EAD    | #B48EAD    | IGUAL   | #F9F5F8   | #F9F5F8     | IGUAL
ctx   | blue       | #5E81AC    | #5E81AC    | IGUAL   | #F2F6FA   | #F2F6FA     | IGUAL
ex    | cyan       | #88C0D0    | #88C0D0    | IGUAL   | #F0F6F4   | #F0F6F4     | IGUAL
focus | gold       | #C2B280    | #C2B280    | IGUAL   | #F9F8F6   | #F9F8F6     | IGUAL
str   | champagne  | #D6CFC2    | #D6CFC2    | IGUAL   | #FDFBF5   | #FDFBF5     | IGUAL
res   | green      | #A3BE8C    | #A3BE8C    | IGUAL   | #F4F8F4   | #F4F8F4     | IGUAL
wrn   | orange     | #D08770    | #D08770    | IGUAL   | #FCF7F5   | #FCF7F5     | IGUAL
err   | red        | #BF616A    | #BF616A    | IGUAL   | #FCF5F5   | #FCF5F5     | IGUAL
meta  | gray       | #4C566A    | #4C566A    | IGUAL   | #F4F6F8   | #F4F6F8     | IGUAL

RESUMEN: accents iguales 9/9 · surfaces iguales 9/9
```

**Verificado por mí, no heredado.** Y el matiz que lo hace funcionar: la surface **derivada**
difiere de la **autorada** en los nueve tokens (p. ej. `ctx` autorada `#F2F6FA` vs derivada
`#F2F5F8`). Si el compilador emitiera la derivada, todos los drafts cambiarían. Emite la del
token, que es la autorada, porque `createAuthorColorToken` la prefiere. Por eso 9/9.

---

## 4. La cifra de drafts, su unidad, y la discrepancia resuelta

Las dos mediciones previas —**55** y **10**— **no son la misma cosa contada distinto: son dos
universos distintos**, y además la grande está desfasada.

| Unidad | Criterio exacto | Hoy |
|---|---|---|
| **A — el almacén vivo** | archivos bajo `src/content/author_lite/drafts/`, cualquier extensión | **10** |
| A válidos | de esos, con campo `lesson` y parseables | **10 de 10** |
| **B — "JSON con `webBlocks`/`slideBlocks`"** | cualquier `.json` del repo (sin `node_modules`/`.git`) que contenga esas claves | **76** |
| B, desglose | almacén vivo 10 · evidencia congelada y roundtrips bajo `QA/temp/` 66 | |

- **El "10" es la unidad A**, el almacén vivo, y es la que gobierna la afirmación «ningún draft
  cambia»: son los drafts que un autor abre y re-renderiza.
- **El "55" es la unidad B**, que mezcla el almacén con instantáneas congeladas de QA. El record
  que la publicó lo dice: *«55 archivos JSON con webBlocks/slideBlocks (8 drafts internos del
  almacén + QA/temp + roundtrips)»*. **Hoy esa misma unidad da 76, no 55**, y el almacén son 10,
  no 8: la cifra grande envejeció 21 archivos desde que se midió.

**Contenido del almacén, medido:** 24 `webBlocks` y 4 `slideBlocks`; kinds `callout` 6, `list` 7,
`card` 4, `narrative` 4, `header` 2, `columns` 1; variantes en uso `ctx` 16, `wrn` 5, `def` 2;
**cero hex literales en los diez**. Se verificaron **ambos** universos (§8).

---

## 5. El diff conceptual

**Antes:** la salida compilada llevaba el acento y nada más. El fondo suave del callout salía
del mapa fijo del motor. Un `#RRGGBB` no llegaba: lo paraban **dos** compuertas, no una.

**Ahora:** la salida lleva los cuatro roles, producidos por la función que ya existía. Un token
de la paleta aporta sus roles autorados; un hex los suyos derivados; **el camino es el mismo**.
El callout toma su fondo de ahí y el mapa fijo queda de respaldo. **Ningún componente cambió qué
roles pinta**: los que solo usaban el acento siguen igual e ignoran el resto.

**Las dos compuertas del hex, y esto corrige al record anterior.** El encargo anterior atribuyó
el descarte solo a `resolvePaletteAccentColorIfDefined`. Medido aislando cada capa —entregando
el bloque crudo al compilador, sin validar esquema— hay **dos**:

1. **El esquema**, que rechazaba antes de que el compilador viera nada: `variant` aceptaba solo
   un id de token en callout, rule, details item, conceptGrid item y table.
2. **El compilador**, que sí descartaba: con el esquema saltado, emitía `variant:"#FF007F"` y
   **ningún `color`**, porque `token.id === variantId` nunca se cumple para un hex (resuelve al
   pseudo-token `custom`). El renderer caía entonces al azul `ctx`.

Ambas reparadas. Con una sola, el picker habría seguido mintiendo.

---

## 6. Puntos de emisión y de lectura tocados

### 6.1 Emisión — `tools/author-lite/compiler-api/services/compiler.js`

| Pieza | Línea | Qué hace |
|---|---|---|
| `buildColorRolesOutput` | `:162` | **nuevo**; mapea el token a `surface`/`border`/`textColor` |
| `resolveCardColorToken` | `:172` | devuelve el token, no `.accent`; el hex directo pasa ahora por `resolveAuthorColorToken`, así que deriva sus roles |
| `resolveVariantColorToken` | `:199` | devuelve el token |
| `resolvePaletteColorTokenIfDefined` | `:213` | devuelve el token o `undefined`; **repara el descarte del hex** |

Diez puntos de emisión, todos tocados: `:348` card metric, `:377` card persona, `:394` card
normal, `:411` rule, `:428` details item, `:444` conceptGrid item, `:576` table, `:1123` header,
`:1143` callout, `:1173` list.

**Reparación del descarte (punto 2 del encargo, `:213`):** un `#RRGGBB` válido emite siempre; un
id que la paleta no define sigue sin emitir, que es la decisión abierta del operador sobre los
alias de feedback y no se toca.

### 6.2 Lectura — `src/builders/web/partials/renderCallout.js`

| Línea | Antes | Ahora |
|---|---|---|
| `:43` | — | `const surfaceColor = normalizeHexColor(data.surface) \|\| paletteConfig.bg;` |
| `:56` | `bg: paletteConfig.bg` | `bg: surfaceColor` |

**Un solo punto de lectura, porque la medición dice que solo hay uno.** El acento (`:38`) ya
prefería el compilado y no se tocó.

**Renderers con mapa fijo propio, y si entran:**

- **`renderConceptGrid`** usa `src/design/tokens/tokens.js` en vez de `commons.js`. **No entra**,
  y no por su mapa sino porque de él solo lee `theme.main`, el acento, que ya prefiere el
  compilado (`item.color`). Su `theme.bg` no se usa en ninguna línea.
- **Los renderers Slide** consumen ese mismo `tokens.js`. **No entran**: el motor Slide está
  fuera por el propio texto del run.
- **`renderCard`, `renderTable`, `renderRule`, `renderHeader`, `renderList`, `renderDetails`**
  tienen constantes neutras propias (`#E2E8F0`, `#F8FAFC`, `#475569`…) que **no están atadas a
  la variante**. **No entran**: cablearlas cambiaría qué roles pinta el componente, que es
  justo lo prohibido, y movería el aspecto de los drafts existentes.

### 6.3 El picker — ocho colocaciones encendidas

`WebBlockEditor.jsx`: seis `<VariantSelect … allowCustom />` (`:2438` details item, `:2584`
conceptGrid item, `:3073` table, `:3949` callout, `:3974` list —ya lo tenía—, `:4035` rule) y
cuatro `<ColumnColorSelectField … allowCustom />` (`:1807` list —ya—, `:1841` callout, `:1878`
rule, `:1968` table). **Se reusó el patrón ya habilitado; no se duplicó el control.**

### 6.4 Los tres controles crudos

`card`, `iconList` y `hierarchy` tenían cada uno su propio `<input type="color">`. Ahora usan el
compartido `ColorTokenPicker`. Para no cambiar su aspecto —que ya pasó QA— se **expuso algo que
ya existía**: `ColorTokenPicker` acepta `className` y por defecto conserva su geometría. Su
almacenamiento y sus opciones no se tocaron.

Quedan dos `input type="color"` en el editor, y **ninguno es selector de paleta de componente**:
el **fondo libre** de `visual` (`VisualFields.jsx:33`) y el `CompactAccentPicker` del **editor de
paletas** (`ComponentGuide.jsx:1476`).

---

## 7. Cómo se editó el roadmap

**Respaldo byte a byte fuera de los dos repos, antes de escribir**, en el scratchpad de sesión:
`sha256 0800fdb8…dccef6`, 112 273 bytes, **CRLF 1292 / LF 0** — el dato que explica por qué
`git checkout` no sirve para deshacer aquí.

**Motor:** `projects/aiw-console/tools/roadmap/roadmap-plan.mjs`, `planEdit` con op `set-text`,
y `applyPlan` después de un dry-run limpio.

**El pre-flight rechazó la primera vez**, y con razón: `run RUN-JAME-DOCUMENTATION-METHODOLOGY-
ROADMAP-FIRST-001 depends on unknown run RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`. Antes de
declararlo externo **se verificó en disco** que ese id es un run real de
`projects/aiw-console/roadmap/roadmap.json` (`O0`/`O0.P3`, `queue_order` 4, `completed`,
*Audit and correct the roadmap content objective by objective*). Es dependencia externa legal
(CONTRATO §10.d Regla 2) y el mismo aviso no bloqueante que el validador ya publica, así que se
declaró por la vía que **el propio motor** provee (`externalRunIds`). **No se tocó ningún
`depends_on`.**

**Verificación posterior contra el respaldo pristino:**

```
finales de linea  pristino: {"crlf":1292,"lf":0}   en disco: {"crlf":1292,"lf":0}
runs: pristino 66 · en disco 66
queue_order 1..66 denso: true · duplicados: []
campos distintos entre pristino y disco: ["RUN-CANTU-AUTHOR-PALETTE-COMPILER-ENGINE-001.full_description"]
=> CORRECTO: solo el full_description del run 19.
```

`run_id`, `queue_order`, `title`, `summary`, `status`, `depends_on`, `lane`,
`correctness_model`, `work_type`, `blast_radius`, `failure_surfaces` y `classified_at`
**INTACTOS**, y la raíz también. El texto pasó de 1 658 a 3 819 caracteres.

---

## 8. Tests y regresión cero

### 8.1 Tests

Archivo nuevo: `tools/author-lite/compiler-api/tests/webAuthorPaletteDerivedRolesAndCustomHex.test.mjs`,
que cubre lo que el encargo pide: el hex se guarda como hex y se lee como personalizado; genera
sus roles derivados **comparando contra la propia función**, de modo que una segunda derivación
rompería el test; los roles llegan al HTML de `callout`; un componente de solo acento no cambia
—comparación **byte a byte** del HTML con y sin los roles en el data—; un token sigue a la
paleta mientras un hex queda congelado; los dos modos nunca coexisten; un valor ausente cae al
respaldo; y los conjuntos cerrados siguen cerrados.

Corridos **solo los archivos tocados y los directamente relacionados**, no la suite completa:

```
node --test  (18 archivos)
  webAuthorPaletteDerivedRolesAndCustomHex · webAuthorPaletteCompilerEngineReconciliation
  webColorSelectorCustomPicker · webSharedColorSelectorUnification
  webHeaderColorPaletteAuthoringSurface · webHeaderPaletteQuantityAndSwatch
  webLegacyCertifiedColorPaletteReconciliation · authorLiteColorSystem
  webConceptGridSafety · webTableSafety · webTablesParitySchemaCompiler
  webTheoryCardsRuleBoxesParitySafety · webTheoryTextBlocksSafety
  webColumnsChildExpansionSafety · webIconListBadgeWidth · webHierarchyFlatNodeSafety
  webTheoryComplexSplitSchemaCompiler · webTimelineNormalStepsSafety

ℹ tests 193
ℹ pass 193
ℹ fail 0
```

Además, del repo: `npm --prefix tools/author-lite/editor-ui run build` → `✓ built in 373ms`, y
`run lint` → sin hallazgos. (El build escribe `dist/`, que está en `.gitignore`.)

**Seis tests existentes se actualizaron**, y conviene decir por qué cada grupo:

- **Cuatro instantáneas de forma exacta** (`webConceptGridSafety`, `webTableSafety`,
  `webTablesParitySchemaCompiler`, `webColumnsChildExpansionSafety`): un `deepEqual` de bloque
  entero que ahora lleva tres claves más.
- **Dos aserciones de contrato que fijaban el límite anterior** y que el veredicto de QA revocó:
  la de `webAuthorPaletteCompilerEngineReconciliation` decía *«callout surface keeps the engine
  map background»*, y la de `webColorSelectorCustomPicker` decía *«only the two placements the
  compiler resolves opt in; the other five keep the swatch»*. Reescritas al contrato nuevo, y se
  les añadió su contraparte: que el respaldo al mapa fijo sigue vivo, y que los conjuntos
  cerrados no se movieron.

### 8.2 Regresión cero — compilada y renderizada, no razonada

Se **reconstruyó el pipeline anterior** en el scratchpad (copia del árbol + reversión textual de
cada edición, abortando si algún texto no aparecía) y se renderizó **cada draft por las dos
ramas**, comparando el HTML.

Antes hizo falta un control: el motor genera **ids aleatorios por render** (`narr-…`,
`j-visual-…`, `j-video-…`). Dos renders de la **misma** rama ya difieren en ellos, así que se
normalizan; se deja constancia de la comprobación.

```
control de nodeterminacion — dos renders de la MISMA rama, mismo draft:
  sin normalizar : DISTINTOS (el motor genera ids aleatorios)
  normalizados   : iguales

REGRESION CERO — 10 drafts del almacen: los 10 IDENTICO
drafts con HTML renderizado DISTINTO : 0
SEGUNDA PASADA — evidencia congelada de QA/temp: identicos 14 · distintos 0 · no comparables 1
```

El no comparable es
`QA/temp/PASS-4D-I9C2-…-EVIDENCE-RERUN/sandbox_theory_complex.web.draft.json`, que **ya no
valida contra el esquema vigente** por un `columns` con distinto de 2 columnas. Falla igual en
las dos ramas y es anterior a este encargo; se declara en vez de callarse.

### 8.3 Lo que la medición de regresión encontró, y que el encargo no anticipaba

La primera pasada dio **4 drafts cambiados**, y el diff mostró el cuerpo de una card
renderizando `#1E293B` en vez de su texto. **Colisión de nombres real:** `renderCard.js:59-61`
desestructura `text` de su data y lo usa como cuerpo (`const finalContent = text || content`),
así que emitir el rol `text` reemplazaba el contenido de **toda card**.

Reparado emitiendo el rol como **`textColor`**. No es una licencia: la salida compilada **ya
renombraba**, porque el rol `accent` viaja como `color` desde siempre. Se barrieron las tres
claves en todo el motor Web antes de decidir: `surface` y `border` no colisionan con nada.
Se añadió un test que fija la ausencia de la clave `text` en la salida y comprueba que el cuerpo
de la card sigue siendo su contenido, para que la colisión no pueda volver en silencio.

---

## 9. Lo que se hizo y no estaba en la lista literal, y por qué no es una segunda ampliación

Dos cosas, ambas **condición necesaria de lo ya autorizado**, no alcance nuevo:

1. **El segundo esquema.** Hay dos `draftSchema.js` —`compiler-api/schemas/` y
   `editor-ui/src/schemas/`— y ambos limitaban `variant` a un id. El *Scope* nombra
   `compiler.js`, no los esquemas; pero sin abrir **los dos** el picker seguiría mintiendo: el
   editor rechazaría el hex al guardar, o lo aceptaría y el compilador lo rechazaría después.
   Abiertas las mismas seis superficies en cada uno, con el patrón id-o-hex que `header` y
   `list` ya llevaban (compiler-api `:323 :333 :717 :724 :778 :809`; editor-ui `:320 :330 :704
   :711 :750 :781`). **Los cuatro conjuntos cerrados siguen intactos en ambos**, verificado.
2. **El renombrado a `textColor`**, obligado por la colisión medida en §8.3.

Ninguna de las dos toca la identidad del run ni añade capacidad que el operador no pidiera.

---

## 10. Discrepancias con los records previos — gana el disco

1. **«13 puntos de lectura del mapa fijo en 7 renderers».** El disco dice **1**: solo
   `renderCallout` toma del mapa un rol atado a la variante además del acento. La cifra anterior
   contaba **todo** acceso a `Commons.PALETTE`/`VARIANTS`, incluidos iconos, etiquetas y neutros
   por defecto, que no son roles de color de la paleta.
2. **«El hex se descarta en el compilador».** Cierto pero incompleto: **el esquema lo rechazaba
   antes** (§5). Con una sola de las dos reparaciones el picker seguiría mintiendo.
3. **«Los 55 drafts».** Unidad distinta de la de «10», y desfasada: esa misma unidad da **76**
   hoy (§4).
4. **`renderConceptGrid` "prefiere el acento compilado" contra el mapa fijo de `commons.js`.**
   Su mapa no es `commons.js` sino `src/design/tokens/tokens.js`.

---

## 11. Archivos escritos

**`cantu-studio`:**

1. `.aiw/roadmap/roadmap.json` — solo `full_description` del `queue_order` 19, vía el motor.
2. `tools/author-lite/compiler-api/services/compiler.js`
3. `tools/author-lite/compiler-api/schemas/draftSchema.js`
4. `tools/author-lite/editor-ui/src/schemas/draftSchema.js`
5. `src/builders/web/partials/renderCallout.js`
6. `tools/author-lite/editor-ui/src/features/editor/components/common/VariantSelect.jsx`
7. `tools/author-lite/editor-ui/src/features/editor/components/common/IconListFields.jsx`
8. `tools/author-lite/editor-ui/src/features/editor/components/web/WebBlockEditor.jsx`
9. `tools/author-lite/compiler-api/tests/webAuthorPaletteDerivedRolesAndCustomHex.test.mjs` (nuevo)
10. Seis tests existentes actualizados (§8.1).
11. `docs/_historical_run_record/RUN-CANTU-AUTHOR-PALETTE-COMPILER-ENGINE-001-OPERATOR-RE-QA-PACKET.md` (nuevo)

**`aiw-console`:** este record.

La sonda de medición y el pipeline reconstruido vivieron **solo en el scratchpad de sesión**;
no se escribió ningún archivo temporal dentro de los repos.

---

## 12. Validador

Por la vía que no escribe, desde `projects/cantu-studio`:

```bash
node tools/project-console/validate-project-console-state.mjs
```

```
Project Console state validation passed.
Roadmap v3 prototype: 7 objectives / 28 phases / 66 runs; queue groups needs_human_decision=0 now=2 ready_next=13 later=33 history=18
Roadmap v3 active run derived stages: RUN-CANTU-DOCUMENTATION-DEEP-AUDIT-001=none RUN-CANTU-AUTHOR-PALETTE-COMPILER-ENGINE-001=none
Docs indexed: 149
Docs curated primary-visible: 60 of 149 registered
Component statuses: 16
Git provenance episodes: 9
Git history snapshot: 918 commits / 2 branches (2 visible, 0 backup hidden); current=main; run-associated=6; source=local_git_autosync
Roadmap rebase warnings (non-blocking):
- .aiw/roadmap/roadmap.json run RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 depends on RUN-CANTU-ROADMAP-CONTENT-AUDIT-001, which does not resolve in this roadmap. With a single roadmap loaded this cannot be decided: it may be a legal external dependency — a run that lives in another project (CONTRATO §10.d Regla 2) — or a typo in the run id. Both are possible and one loaded roadmap cannot tell them apart; resolve it against the full set of projects to distinguish external from write error.
```

**Total de runs real: 66. `history=18`.** El aviso no bloqueante es el conocido de la dependencia
externa: es legal y **no es hallazgo**.

---

## 13. Lo que este run deja desactualizado — nombrado y NO reparado

Carril `DOCUMENTATION`, tienen dueño. **No se tocan.**

1. **`docs/reference/REFERENCE-COMPONENT-REVALIDATION-DEFINITION-OF-DONE.md` §5 —
   *«Applicability: color and math per component»***. Sus columnas *Color surface today* y
   *Palette-resolves* cambian al menos para `callout`, `rule`, `details`, `conceptGrid` y
   `table`. La sección declara que *«a divergence between this table and the live code is
   decided by the code»*, así que no miente mientras la divergencia se declare — pero queda
   desfasada.
2. **`docs/reference/REFERENCE-COLOR-PALETTE-COMPATIBILITY.md` §5 — *«Web Engine fallback
   behavior»***. **Ya estaba desfasada antes de este encargo**, como el anterior reportó, y
   ahora lo está más: su lista de renderers reconciliados se quedó corta entonces, y hoy además
   el callout ya no toma el fondo del mapa.
3. **`docs/reference/REFERENCE-COLOR-PALETTE-COMPATIBILITY.md` §7 — *«The custom picker»***. Su
   regla de invariancia de alcance pasa de describir dos componentes a describir todas las
   superficies author-facing de paleta.
4. **`docs/reference/REFERENCE-COLOR-PALETTE-COMPATIBILITY.md` §8 — *«The palette-regression
   pattern»***, subsección *Components carrying the pattern today*: el patrón queda cerrado para
   los cinco que nombra.

---

## 14. En qué status debe quedar el run, y qué falta

**El run sigue `active` y este encargo NO lo cambia.** No se re-emitió `.project/`.

Para llegar a cierre falta, en este orden: (1) la **re-QA humana** del operador con el packet de
§11.11, que cubre el alcance ampliado entero; (2) si vuelve `PASS`, el cierre. **Lo cierra el
operador desde la consola global, que es el punto de serialización.** Si vuelve
`CHANGES_REQUIRED` con un deseo adyacente nuevo, `D-061` dice que **se para y se devuelve**: la
segunda ampliación es otro run.

---

## 15. Lo que este encargo NO hizo

- **No escribió ninguna función de derivación.** Reusó `deriveColorRolesFromAccent` a través de
  `resolveAuthorColorToken`. Un test lo fija comparando contra la propia función.
- **No aplicó heurística de contraste** ni corrigió estéticamente ningún rol derivado.
- **No cambió qué roles usa ningún componente al pintar.** Solo de dónde los toma, y en un único
  renderer.
- **No tocó** `title`, `objective`, `phase`, `run_id` ni `status` de ningún run; no insertó,
  movió ni renumeró; no re-emitió `.project/`; **no ejecutó git en ninguna forma**.
- **No tocó** los conjuntos cerrados de variante del compilador ni el motor Slide.
- **No tocó** la Definition of Done, el contrato de color, `.aiw/docs/docs_index.json` ni
  `component_status.json`.
- **No dio superficie de color** a ningún componente que no la tuviera, ni convirtió el fondo
  libre de `visual` en selector de paleta.
- **No revalidó ningún componente**: este run entrega la pieza que los quince consumen.
- **No corrió la suite completa** ni levantó la consola ni ningún servidor.
- **No clasificó ningún run** ni reparó derivas cruzadas —mojibake, punteros muertos, el CLI
  local de roadmap—: tienen dueño o están declaradas sin él.

---

## 16. Procedencia

- Política que autoriza la ampliación: `context/DECISIONES.md`, **`D-061`**.
- Canónico editado: `projects/cantu-studio/.aiw/roadmap/roadmap.json`, 66 runs, 1..66 denso.
- Motor usado: `projects/aiw-console/tools/roadmap/roadmap-plan.mjs`.
- Record del encargo que midió y paró: `AMPLIACION-SELECTOR-COLOR-PERSONALIZADO-CANTU.md`.
- Records previos del hilo: `ALTA-RUN-UNIFICACION-SELECTOR-COLOR-CANTU.md`,
  `CONTRATO-COLOR-Y-PALETA-CANTU.md`, `PALETA-DE-AUTOR-COMPILADOR-Y-MOTOR-CANTU.md`.
- Packet de re-QA producido:
  `projects/cantu-studio/docs/_historical_run_record/RUN-CANTU-AUTHOR-PALETTE-COMPILER-ENGINE-001-OPERATOR-RE-QA-PACKET.md`.
