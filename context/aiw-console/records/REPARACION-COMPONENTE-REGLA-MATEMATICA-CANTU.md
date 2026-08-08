# Reparación del componente «Regla matemática» — centrado, placement y el color del título

Run canónico: `RUN-JAME-RULE-COMPONENT-REPAIR-AND-ACTIVATION-001`, `queue_order` **35**,
`status: active`. Título verificado contra `.aiw/roadmap/roadmap.json`: coincide exactamente
con `Audit and implement the Rule component`. El aviso de coordenadas del ticket es correcto:
este run era `#34` y hoy `#34` es `RUN-CANTU-ACCENT-INK-CONTRAST-ROLE-001`.

**Tres reparaciones pedidas, las tres entregadas, en cuatro pasadas.** La primera cerró el
centrado del título y la retirada de «Placement avanzado», y **paró** en el color del título
por una guarda del propio ticket. La parada resultó correcta: el operador cambió la forma —de
tres estados a dos— y la segunda pasada la implementó. **La QA humana aprobó el control y
rechazó su lista de opciones**; la tercera la sustituyó por una lista fija de cuatro. **La QA
volvió a mirar y echó de menos «Automático» en el desplegable**; la cuarta lo convirtió en
entrada real.

**Las dos correcciones de la QA fueron a órdenes de la cabina, no a defectos del taller**, y
las dos venían de la misma raíz: reglas escritas cuando la lista salía de la paleta, que
dejaron de valer al hacerla fija.

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

**La forma que el operador eligió entonces: «Automático» como estado de VISUALIZACIÓN más un
botón de retorno.** La QA la rechazó después y hoy la forma es otra —entrada real más botón,
ver 4.3—, pero la tabla se conserva porque explica las dos que siguen descartadas y por qué:

| Descartada | Por qué |
|---|---|
| **Dos campos: modo + color** | No toca la pieza compartida, pero pone dos controles donde el autor entiende uno, y deja estados imposibles que alguien tiene que impedir (modo «automático» con color puesto). **Sigue descartada.** |
| **Reservar un sentinel de autor** | Si el desplegable **escribiera** el sentinel en el campo habría colisión real: `COLOR_TOKEN_ID_PATTERN` es `/^[a-z][a-z0-9_-]{1,31}$/`, un token etiquetado «Automático» produce el id `automatico`, y `createColorTokenId` no sabe de sentinels inventados. Reservarlo obligaba a tocar `colorSystem.js`. **Sigue descartada** — y no hizo falta. |

**Lo que se aprendió al rehacerlo:** la objeción de la segunda fila daba por supuesto que una
opción en la lista tiene que escribir su propio valor en el campo. **No es cierto.** La
entrada «Automático» tiene un `value` de presentación, `__empty`, que el manejador intercepta
para emitir `undefined`. **El sentinel nunca llega al dato**, así que no hay nada que reservar
y `colorSystem.js` no se tocó por este motivo. Con eso, «una opción Automático en la lista»
dejó de tener coste — y era lo que el autor esperaba ver.

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

### 4.3 Las dos props opt-in del selector compartido

`ColorTokenOrCustomField` gana **dos props opcionales, las dos apagadas por defecto**.

**`emptyStateLabel = null`** — la entrada «Automático». Encendida, la lista gana una **primera
entrada real y elegible** con ese rótulo, y un campo vacío se muestra en ella. Elegirla emite
`undefined`: borra el campo. El sentinel `__empty` es solo el `value` del `<option>` y lo
intercepta el manejador antes de escribir nada — **esa** es la guarda; que además empiece por
`_` cuando el patrón de ids exige minúscula inicial es la segunda.

> **Esta prop nació con otra forma, por una orden de la cabina que resultó equivocada.** El
> ticket que la pidió decía literalmente que «Automático» era «un estado de VISUALIZACIÓN, no
> una entrada del desplegable» y ordenaba no añadirlo a la lista; se implementó así, con
> `hidden` y `disabled`. **La QA humana lo rechazó:** el autor veía tres opciones donde
> esperaba cuatro. La cabina retiró la orden — tenía sentido cuando la lista salía de la
> paleta y pegarle una entrada ajena era raro, y dejó de tenerlo con una lista fija de cuatro.
> **Lo demás de esa entrega se conservó íntegro**, incluida la segunda prop y la decisión de
> no tocar `getColorFieldSelection`.

**`optionsAreColors = false`** — la añadió la tercera pasada. Encendida, la lista guarda
**colores** en vez de ids de token, y un valor que sea exactamente uno de esos colores se
muestra con **su nombre** en vez de como «Personalizado». Sin ella, «Blanco» se leería
«Personalizado».

**`getColorFieldSelection` quedó literalmente intacta**, y eso importa: la regla de la sección
7 del contrato de color —un hex es «Personalizado»— sigue escrita en un solo sitio y sigue
mandando en las cuatro colocaciones que consumen la paleta, donde un `option.value` es un id
de token y la rama nueva **no puede activarse**.

**Cómo se llegó a esa forma.** El primer intento metía el casado por color **dentro** de
`getColorFieldSelection`. Puso en rojo `webColorSelectorCustomPicker.test.mjs` → *«a custom
colour is stored as a hex and reads back as Personalizado»*, cuya parte de conducta seguía
verde pero que afirma sobre el fuente que esa regla vive **en un solo sitio** y con esa forma
exacta. **En vez de tocar la prueba se rehízo el cambio** como prop opt-in fuera de la
función. Cero pruebas modificadas. La prueba hizo exactamente su trabajo.

**Apagadas, que es como las consumen los cuatro sitios previos, no cambia nada.** Comprobado
de tres formas: barrido (ninguno de los cuatro las pasa), equivalencia de **conducta y
marcado** ejecutada vieja contra nueva sobre **12 entradas** —incluidos `undefined`, `null`,
`''`, `0`, `false`, un token desconocido y un hex que es el acento real de un token— con
**cero diferencias**, y las pruebas que ya bloqueaban esta pieza, en verde sin tocarlas.

**Hay dos caminos al estado automático y es deliberado:** la entrada del desplegable y el
botón «Volver a automático». Medido: los dos escriben `undefined`, idénticos por `Object.is`,
y ninguno escribe el sentinel ni una cadena vacía. El botón se queda porque la QA lo aprobó y
porque es la salida visible mientras hay color.

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

### 4.6 La lista que rechazó la QA, y la que la sustituye

**La QA humana aprobó el control y rechazó la lista.** Alimentarla de la paleta global era el
error, y por la misma razón que retiró el tercer estado: los dieciocho acentos son colores
apagados de tono medio y, usados como tinta **sobre la propia franja**, dan contrastes de 1 a
2 en la mayoría. Ofrecerlos allí era ofrecer dieciocho formas de no verse el título.

La lista pasa a ser **fija, de cuatro entradas, y no depende de la paleta**:

| Opción | Valor guardado | Qué pinta |
|---|---|---|
| **Automático** | ninguno — campo vacío | `accentTextColor`, el derivado de `#34` |
| **Blanco** | `#ECEFF4` | el ancla clara, forzada |
| **Negro** | `#2E3440` | el ancla oscura, forzada |
| **Personalizado** | el `#RRGGBB` del autor | el suyo |

Las tres primeras quedan siendo «decide tú por mí», «fuerzo la clara» y «fuerzo la oscura».
**Blanco y Negro no son `#FFFFFF` ni `#000000`**: son las dos anclas Nord de `accentText`, y
el blanco puro es exactamente lo que `#34` retiró por duro sobre estos acentos. Las etiquetas
que ve el autor sí dicen «Blanco» y «Negro».

**Nada nuevo que mantener:** las dos anclas guardan su hex **en el mismo campo**. No hay
tokens inventados ni segundo campo, y **el esquema no cambió** — ya aceptaba hex. Consecuencia
querida: elegir «Blanco» y elegir «Personalizado» con `#ECEFF4` producen **el mismo dato**, y
el desplegable muestra «Blanco» en los dos casos. No hay que distinguirlos porque no son cosas
distintas.

**«El campo sigue a la paleta» queda retirado.** Fue cierto mientras la lista salía de la
paleta; con la lista fija, los cuatro valores son fijos o del autor y **ninguno sigue a un
token**. Medido antes de darlo por bueno: **cero** de los 87 bloques `rule` del disco guarda
un token id en ese campo, así que el cambio no toca ningún dato existente.

**Queda una vía declarada y no cerrada:** el esquema sigue aceptando un token id en
`titleVariant`, porque no se tocó, y la UI ya no lo ofrece. Por «Insertar JSON» todavía podría
entrar uno; el control lo mostraría como «Blanco» y el compilador lo resolvería contra la
paleta. Estrecharlo a solo-hex es otro run.

### 4.7 Una desviación de scope que hay que declarar

Las dos anclas existían en `colorSystem.js` con los nombres exactos que decía el ticket,
`ACCENT_TEXT_DARK` y `ACCENT_TEXT_LIGHT`, **pero no estaban exportadas**. La orden de
importarlas y no teclearlas no se podía cumplir sin añadir `export`, y ese archivo no figuraba
en el scope.

**Se añadió: dos palabras.** Cero valores tocados, cero usos internos tocados, ni el umbral ni
la derivación de `#34`. Se dice aquí en vez de pasarlo por alto. Si la cabina prefiere ese
archivo intacto, la alternativa es derivarlas con `deriveColorRolesFromAccent('#FFFFFF')` y
`('#000000')`, que da las mismas dos y tampoco las teclea.

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

**Archivos tocados en total: 7.** `renderRule.js`, `WebBlockEditor.jsx`, `VariantSelect.jsx`,
los dos `draftSchema.js`, `compiler.js` y —solo dos `export`— `colorSystem.js`. Ningún otro
renderer, ningún otro esquema de bloque y ninguna otra salida del compilador.

Las dos primeras pasadas están **commiteadas** (`4341581`). La tercera deja pendientes tres
archivos: `WebBlockEditor.jsx`, `VariantSelect.jsx` y `colorSystem.js`.

**Queda enrutado:**

- `fullWidth` / `colSpan` fuera de esquema, compilador y `renderColumns.js` — ya enrutado por
  el ticket, **más la brecha de la sección 2**, que la cabina registró después: el campo no
  lo lee nadie en los bloques hijos porque `renderColumns` lo busca en el envoltorio de
  columna que el compilador emite siempre.
- «Nota destacada» y su `titleColor` inalcanzable — no se tocó. Sigue siendo un parámetro
  muerto, y ahora hay al lado un campo vivo que hace lo mismo bien, por si algún día se
  repara: la diferencia es que el de «Regla matemática» recorre las cuatro capas y está en un
  esquema con `.strict()`.
- La QA humana del packet ROUND-2, **19 checks**.
- **Estrechar `titleVariant` a solo-hex** en los dos esquemas. Hoy sigue aceptando un token id
  que la UI ya no ofrece; por «Insertar JSON» es alcanzable. Cero casos en disco, pero la vía
  existe. Toca esquema, fuera del scope de la tercera pasada.
- **Si la cabina quiere `colorSystem.js` intacto**, revertir los dos `export` y derivar las
  anclas con `deriveColorRolesFromAccent`. Ver 4.7.
- El commit. Lo hace el operador desde GitHub Desktop.

**El `status` del run lo cierra la cabina.** Este documento no lo toca.
