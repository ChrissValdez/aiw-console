# Reparación del componente «Regla matemática» — centrado, placement y el color del título

Run canónico: `RUN-JAME-RULE-COMPONENT-REPAIR-AND-ACTIVATION-001`, `queue_order` **35**,
`status: active`. Título verificado contra `.aiw/roadmap/roadmap.json`: coincide exactamente
con `Audit and implement the Rule component`. El aviso de coordenadas del ticket es correcto:
este run era `#34` y hoy `#34` es `RUN-CANTU-ACCENT-INK-CONTRAST-ROLE-001`.

**Tres reparaciones pedidas, las tres entregadas, en dos pasadas.** La primera cerró el
centrado del título y la retirada de «Placement avanzado», y **paró** en el color del título
por una guarda del propio ticket. La parada resultó correcta: el operador cambió la forma
—de tres estados a dos— y la segunda pasada la implementó.

Packet del operador:
`docs/_historical_run_record/RUN-JAME-RULE-COMPONENT-REPAIR-AND-ACTIVATION-001-OPERATOR-QA-PACKET-ROUND-2.md`

**Es ronda 2 a propósito.** La ronda 1 (`...-OPERATOR-QA-PACKET.md`, 2026-08-06) era el
packet de auditoría *previa* al trabajo, y sigue vigente: sus checks 1-4, 6-8, 12-29 no los
toca este run. Este run retira de su tablero el check **5** (esperaba ver «Placement
avanzado» vivo) y los **9, 10 y 11** (título ilegible sobre color claro, que cerró `#34`).

---

## 1. Lo que entró

### 1.1 El título de la franja se centra

Una propiedad, en la franja, no en el cuerpo:

```js
// src/builders/web/partials/renderRule.js, dentro del estilo de .j-rule-header
text-align: center;
```

La ubicación real es **`:58-77`**, no `:66-71` como decía el ticket — que ya pedía
verificarlo. La franja abre en la 58 y el título se interpola en la 76.

El centrado **no depende de ningún breakpoint**, y eso está medido, no supuesto:

- Las únicas media queries del pipeline Web están en `renderLayout.js:55` y `:95`, y tocan
  `.j-columns-wrapper`, `.j-column-item` y el widget de accesibilidad. Ninguna toca la franja.
- **Cero hojas de estilo del pipeline Web declaran `.j-rule-header`.** El estilo va inline y
  ganaría igualmente. La `.j-rule-header` de `slides/components/renderRule.js:26` es del
  pipeline Slides, independiente, no tocado.
- Al ser `text-align` sobre el contenedor, cada línea de un título envuelto se centra por
  separado.

Verificado renderizando el partial real con un título de ~100 caracteres. **La confirmación
en píxeles queda para el operador: no hay navegador headless en este entorno** (ni Puppeteer
ni Playwright instalados), y el roadmap ya declara este run como verificable por QA visual
humana.

### 1.2 «Placement avanzado» retirado del editor, entero

**Las tres coordenadas del ticket eran exactas:** montaje dentro de columna `:1930`, montaje
a nivel superior `:4224`, `PlacementFields` en `:1034`. `RulePlacementFields` estaba en
`:1270-1272`.

**El conteo real, medido:**

| Medida | Valor |
|---|---|
| Montajes de `RulePlacementFields` | **2**, los dos dentro de `rule` |
| Consumidores de `PlacementFields` | **1**: `RulePlacementFields` |
| Otros componentes que montaban el control | **0** |
| Apariciones de la cadena `Placement avanzado` en código | **1**, la retirada |

Ninguno de los dos componentes estaba exportado; eran locales del módulo. Los aciertos de
`PlacementFields` fuera de `WebBlockEditor.jsx` están todos en `docs/archive/` y describen que
`CardFields` montaba este control **en su día** — ya no lo hace.

Retirados los dos montajes, los dos componentes quedaban muertos y se fueron con ellos.
`grep PlacementFields` sobre el archivo devuelve hoy una línea, un comentario que explica la
retirada. Lint limpio.

### 1.3 Lo que deliberadamente NO se tocó

`fullWidth` y `colSpan` siguen en esquema, compilador y `renderColumns.js`, como ordenaba el
criterio 5. Dos precisiones sobre las coordenadas:

- `PlacementMetadataSchema` está en `draftSchema.js:583-584` en el gemelo de `editor-ui` y en
  **`:595-596`** en el de `compiler-api`. **Los dos archivos difieren**; no son copias byte a
  byte.
- `renderColumns.js` vive en **`src/builders/web/`**, no en `src/builders/web/partials/`.

---

## 2. La corrección que este run devuelve a la cabina

**El criterio 5 afirma que `colSpan` «de verdad hace algo» y que la capacidad «sigue
alcanzable por Insertar JSON». Medido: no lo está — y no por culpa de este run.**

`renderColumns` lee `fullWidth` / `colSpan` **solo en las entradas de primer nivel de
`data.columns`** (`renderColumns.js:93-100`). El compilador de Author Lite envuelve
**siempre** cada columna:

```js
// compiler.js:1272-1280
columns: block.columns.map((column, columnIndex) => ({
  type: 'column',
  slot: columnIndex === 0 ? 'left' : 'right',
  blocks: column.blocks.map(...)
}))
```

El `colSpan` de la regla queda dentro de `blocks`, un nivel por debajo de donde
`renderColumns` mira. Comprobado de punta a punta:

| Forma de `columns` | ¿`colSpan: 2` ensancha? |
|---|---|
| La que compila Author Lite (`{type:'column', slot, blocks:[…]}`) | **NO** |
| La nativa de JAME Core (bloques directos, como los fixtures sandbox) | SÍ |

El campo **sobrevive al esquema y sobrevive al compilador** —entra `colSpan: 2` por JSON,
sale `colSpan: 2` en la salida compilada—; simplemente nadie lo lee después.

**Esto no invalida la decisión de retirar el control, la refuerza:** el control del editor
escribía campos que en este pipeline nunca hicieron nada. Retirarlo no quita ninguna
capacidad viva. Y mantener los campos en esquema y compilador sigue siendo correcto, porque
ningún borrador guardado se rompe.

**No se arregló.** `renderColumns.js` está fuera de scope y el ticket lo enruta. **Queda para
la cabina decidir si el run enrutado de `fullWidth`/`colSpan` debe además cerrar esta brecha,
o si es un tercer run.**

---

## 3. La medición del corpus

**Borradores de autor** (`src/content/author_lite/drafts/`, 10 archivos): **0 bloques `rule`**
en todo el corpus, luego **0** con `fullWidth` o `colSpan`. No hay workspace externo —
`AUTHOR_LITE_WORKSPACE_ROOT` no está puesto y la ruta que citan documentos archivados,
`C:\Users\Chris\Documents\JAME_Parallel_Workspace`, **no existe en disco**.

**Evidencia de runs** (`QA/temp/`, 124 JSON — artefactos de QA, no borradores de autor): 42
bloques `rule` en 8 archivos; **26 con `colSpan`**, de los cuales 24 llevan `colSpan: 1` (que
`buildPlacementOutput` descarta por diseño: solo emite `> 1`) y 2 llevan `colSpan: 2`.
Ninguno lleva `fullWidth`.

**Ninguno de los dos corpus tiene un `rule` con estos campos fuera de una columna.** Ninguna
cifra viene del ticket; todas salen de recorrer el disco.

---

## 4. El color del título: la parada, y lo que se construyó después

**La primera pasada paró aquí.** El criterio 10 ordenaba reutilizar `VariantSelect` con
`allowCustom` y, si no encajara, parar y reportar qué haría falta en vez de resolverlo por
cuenta propia. No encajaba: **la pieza no sabía representar «sin elegir»**. Se reportaron tres
formas posibles sin elegir ninguna. **El operador eligió**, y de paso cambió el fondo del
encargo: de tres estados a dos.

### 4.0 Lo que decidió el operador, y por qué se descartaron las otras dos formas

**El tercer estado se retiró del encargo.** «El título toma el color del acento» dejó de ser
una opción tras la medición de 4.5: mismo color sobre mismo color da contraste **1:1 en los
dieciocho tokens**. La cabina lo había especificado por analogía con «Nota destacada» sin
comprobarlo. **No era una opción, era un defecto**, y con él fuera el problema pasó de tres
estados a dos.

**La forma elegida: «Automático» como estado de VISUALIZACIÓN más un botón de retorno.**

| Descartada | Por qué |
|---|---|
| **Una opción «Automático» en la lista** | Habría que reservar un sentinel que el desplegable escribe en el campo. `COLOR_TOKEN_ID_PATTERN` es `/^[a-z][a-z0-9_-]{1,31}$/`, así que un token de autor etiquetado «Automático» produce el id `automatico` y colisiona; `createColorTokenId` solo evita chocar con ids existentes y con los del set por defecto, no con un sentinel inventado. Reservarlo obligaba a tocar `colorSystem.js`, pieza de todo el sistema de color. |
| **Dos campos: modo + color** | No toca la pieza compartida, pero pone dos controles donde el autor entiende uno, y deja estados imposibles que alguien tiene que impedir (modo «automático» con color puesto). |
| **La elegida: display + botón** | El campo guarda **solo colores**; su ausencia *es* «Automático». Nada que reservar, ningún estado imposible, y un único control. El sentinel `__empty` vive dentro del componente y **nunca se escribe en el campo**. |

### 4.1 La corrección del criterio 7, verificada — el ticket tiene razón

La cabina había afirmado que «Nota destacada» ya traía este control y bastaba copiarlo. Es
falso, y este run lo confirma de forma independiente:

- `titleColor` como parámetro de autor existe **solo** en `renderCallout.js:46-51`.
- **Cero apariciones** en los dos `draftSchema.js`, en `compiler.js` y en `WebBlockEditor.jsx`.
- `WebCalloutSchema` está en **`:724`** (el ticket decía ~`:721`) y **no lleva `.strict()`**.
  Zod sin `.strict()` **descarta en silencio** las claves desconocidas, así que pegarlo por
  «Insertar JSON» no llega al renderer y no avisa.
- Los otros dos aciertos en el repo (`slides/components/renderCard.js:241`,
  `renderSplitCard.js:137`) son variables locales, no un parámetro de entrada.

**Es un parámetro de renderer inalcanzable.** «Nota destacada» no se tocó, ni entonces ni
ahora: se usó como referencia de **forma**, nunca de código. **La afirmación falsa no se
heredó.**

### 4.2 El nombre: `titleVariant` en el borrador, `titleColor` compilado

**`titleVariant`** es lo que el autor elige y lo que guarda el borrador: id de token de la
paleta activa **o** `#RRGGBB`, excluyentes, en un solo campo. Es exactamente la forma de
`variant`, porque es exactamente la misma elección de autor.

**`titleColor`** es lo que emite el compilador: el color ya resuelto, siempre un hex.

Dos nombres y no uno porque **ese par ya existe en esta salida**: `variant` (elección) →
`color` (resuelto). El prefijo `title` dice sobre qué elemento actúa; el sufijo dice en qué
capa vive. No se confunde con `variant`, que es la franja y va sin prefijo, ni con
`accentTextColor`, que **nadie elige nunca** —lo deriva `#34`— y solo existe compilado. Es la
misma disciplina de nombres que el propio compilador se impuso en `#34` al renombrar el rol
`text` a `textColor` para no chocar con el cuerpo de `renderCard`.

### 4.3 La prop nueva del selector compartido

`ColorTokenOrCustomField` gana **una sola prop opcional, `emptyStateLabel`, con valor por
defecto `null`**. Encendida, un campo vacío deja de mostrarse como el token de respaldo y pasa
a mostrar ese rótulo, pintado por una opción **`hidden` y `disabled`**: se ve como valor
seleccionado pero no es una entrada de la lista, así que **no se puede elegir y el sentinel
nunca llega al campo**. El sentinel es `__empty`, que no puede colisionar con un id de autor
porque empieza por `_` y el patrón exige letra minúscula inicial — la misma guarda que ya
usaba `__custom`.

**Apagada, que es como la consumen los cuatro sitios previos, no cambia nada.** Se comprobó de
tres formas: barrido (ninguno de los cuatro la pasa), equivalencia de la lógica de decisión
ejecutada vieja contra nueva sobre **10 entradas** con **cero diferencias**, y las **8 pruebas
de `webSharedColorSelectorUnification.test.mjs`** que ya bloqueaban esta pieza y siguen en
verde sin tocarlas.

### 4.4 Las cuatro capas, cerradas y verificadas

| Capa | Dónde | Verificado |
|---|---|---|
| Esquema | `WebRuleSchema` en los dos gemelos | el hijo de columna **hereda** vía `.extend()`, y `.strict()` sigue rechazando claves inventadas |
| Editor | `RuleTitleColorField`, en **las dos** colocaciones | rótulo «Color del título», debajo de «Color» y encima de «Titulo» |
| Compilador | `buildRuleTitleColorOutput` → `buildRuleOutput` | token → acento, hex tal cual, **ausente no emite nada** |
| Renderer | `renderRule.js` | `titleColor` → `accentTextColor` → `#FFFFFF`, medido en los cinco casos |

La guarda de `undefined` en el compilador **no es adorno**: `normalizeVariant(undefined)`
devuelve `'ctx'`, así que llamar sin ella habría emitido un color para todo borrador que no
elige ninguno — y ese silencio es justo lo que deja mandar a `accentTextColor`.

El campo **sigue a la paleta** cuando es token y **queda congelado** cuando es hex, medido en
los dos sentidos moviendo el acento de `wrn` de `#EBCB8B` a `#AA5500`. No se escribió ninguna
regla nueva para eso: es la misma función que ya resuelve `variant`.

### 4.5 La medición que retiró el tercer estado

El encargo anterior pedía reportar si «el acento» era legible, y la cabina esperaba que no lo
fuera «en la mayoría de tokens». **No lo es en la mayoría: no lo es en ninguno, por
construcción.** `#34` derivó `accentText` precisamente para garantizar contraste **contra** el
acento; poner el título del **mismo** color que la franja da contraste 1:1 —texto invisible—
en los dieciocho tokens sin excepción.

**El operador retiró el estado a partir de esta medición.** Es la cuarta corrección de este
run que la cabina incorporó.

---

## 5. Estado

**Suite: 436/436.** Línea base verificada a mano antes de tocar nada, no heredada del ticket:
436/436. Cero pruebas modificadas, añadidas o en rojo. No hubo que clasificar ninguna como
aditiva o de conducta porque ninguna se movió. Lint y build limpios en las dos pasadas.

**Ningún borrador viejo cambia, medido contra el código nuevo:** de los **87 bloques `rule`**
del disco, **0 llevan `titleVariant`** y **los 87 renderizan byte a byte igual** que con la
precedencia anterior a C. Con control positivo: un `rule` construido *con* el campo sí difiere,
así que la comparación mide algo.

**Archivos tocados: 6.** `renderRule.js`, `WebBlockEditor.jsx`, `VariantSelect.jsx`, los dos
`draftSchema.js` y `compiler.js`. Ningún otro renderer, ningún otro esquema de bloque y
ninguna otra salida del compilador.

**Queda enrutado:**

- `fullWidth` / `colSpan` fuera de esquema, compilador y `renderColumns.js` — ya enrutado por
  el ticket, **más la brecha de la sección 2**, que la cabina registró después: el campo no
  lo lee nadie en los bloques hijos porque `renderColumns` lo busca en el envoltorio de
  columna que el compilador emite siempre.
- «Nota destacada» y su `titleColor` inalcanzable — no se tocó. Sigue siendo un parámetro
  muerto, y ahora hay al lado un campo vivo que hace lo mismo bien, por si algún día se
  repara: la diferencia es que el de «Regla matemática» recorre las cuatro capas y está en un
  esquema con `.strict()`.
- La QA humana del packet ROUND-2, **16 checks**.
- El commit. Lo hace el operador desde GitHub Desktop.

**El `status` del run lo cierra la cabina.** Este documento no lo toca.
