# Tinta contrastada sobre el acento del autor — `accentText`

Run canónico: `RUN-CANTU-ACCENT-INK-CONTRAST-ROLE-001`, `queue_order` 34, `status: active`.
Título verificado contra `.aiw/roadmap/roadmap.json` en la primera ronda: coincide.

Cuatro rondas. La primera **paró** ante dos guardas del propio ticket; ambas paradas
resultaron correctas. La segunda las desbloqueó y ejecutó el run. La tercera cerró una
octava aserción. **La cuarta sustituyó la regla de derivación tras la QA del operador**, que
es lo que este documento describe como estado final.

---

## 1. Dos reglas: la que se probó y la que quedó

### 1.1 Lo que se implementó primero — derivación por mezcla

```js
accentText = mixWithBlack(rgb, 0.62)
             // si contraste(accent, esa tinta) < 3.0:
             mixWithWhite(rgb, 0.86)
```

Era deliberadamente la misma familia que produce `surface` y `border`, con el extremo
contrario. Cumplía todos sus números: cero tintas puras, cuatro tokens en rama clara, peor
contraste 3.25, y ninguna prueba en rojo.

### 1.2 Por qué el operador la rechazó

**No por ilegible: por cómo combina.** El operador la ejecutó en QA sobre los dieciocho
tokens, probó cuatro fórmulas más en comparadores visuales y la descartó.

El diagnóstico que salió de ahí, y que es la razón real del cambio: **la paleta es Nord.**
Siete de los dieciocho acentos son colores Nord literales y el resto están en su idioma.
**Nord no deriva tintas.** Su armonía está construida sobre dos neutros fijos, `#2E3440` y
`#ECEFF4`, y **este motor ya los usa emparejados** — verificado en
`src/builders/web/partials/commons.js`, **línea 67**:

```js
code:   { color: '#ECEFF4', bg: '#2E3440' }  // Snippets
```

Una tinta derivada por mezcla es un color **cromático**: hereda el matiz del acento y mete un
segundo color en la composición, que compite con él. Un neutro no compite: deja que el
acento sea el único color de la pieza. Eso es lo que el operador vio en el comparador y lo
que ninguna métrica de contraste capturaba.

**Y sale mejor también en número:** peor contraste **3.50** frente al **3.25** de la regla
derivada.

### 1.3 La regla final

```js
accentText = L*(accent) > 55 ? '#2E3440' : '#ECEFF4'
```

Nada más. Sin ratio, sin mezcla, sin rama por luminancia relativa.

`L*` es la claridad perceptual de CIE, derivada de la luminancia relativa que el módulo ya
calculaba: `Y > 0.008856 ? 116·∛Y − 16 : 903.3·Y`. Vive en `colorSystem.js` como
`getPerceptualLightness`, junto a las otras tres funciones de color. Sin dependencias nuevas.

No es lo mismo que la luminancia relativa: `L*` reparte la escala como la ve el ojo, y por
eso una frontera única sobre `L*` separa bien claros de oscuros, cosa que una frontera sobre
`Y` no hace.

Las dos anclas y el umbral son constantes con nombre, no literales dentro de la función:
`ACCENT_TEXT_DARK`, `ACCENT_TEXT_LIGHT`, `ACCENT_TEXT_LIGHTNESS_THRESHOLD`.

**`mixWithBlack` se retiró.** Lo había añadido este mismo run y quedó sin uso; verificado que
nada más en el repositorio lo llamaba. `mixWithWhite`, `surface`, `border` y `text` no se
tocaron.

### 1.4 La tercera opción, evaluada y descartada

Se evaluó también una **cabecera de fondo pálido**, estilo «Nota destacada»: resolvía el
contraste con holgura. **Se descartó por decisión de diseño del operador**: duplicaba la
forma de un componente ya existente y le costaba identidad visual a «Regla matemática», que
dejaría de distinguirse de un callout. No es un problema de contraste, es de repertorio de
formas.

---

## 2. El nombre del rol, y por qué

**`accentText`**, con salida compilada **`accentTextColor`**.

- **Comparte raíz con `text`**, que es lo que lo identifica de inmediato como rol de tinta
  y no de fondo. `accent`, `surface` y `border` nombran superficies; `text` y `accentText`
  nombran tintas.
- **El calificador es exactamente el eje que lo distingue.** `text` es tinta sobre
  `surface`; `accentText` es tinta sobre `accent`. La ambigüedad que había que evitar
  —«¿cuál de las dos tintas es?»— la resuelve el nombre de la superficie, no un adjetivo de
  intensidad tipo `textStrong`, que no diría sobre qué va.
- **Sobrevive el renombrado de salida sin colisión.** El compilador ya emite `text` como
  `textColor` por una colisión medida (`renderCard` desestructura `text` y lo usa como
  cuerpo de la tarjeta). `accentText` → `accentTextColor` sigue esa misma convención.
  Verificado: ninguno de los dos nombres existía en `src/` ni en `tools/author-lite/`.
- Se descartó `onAccent` —más claro en jerga de design systems— porque rompe el patrón
  sustantivo de los otros cuatro, y `accentInk` porque «ink» no es vocabulario de este repo.

---

## 3. La tabla de dieciocho, con la regla final

Recalculada de cero y re-medida al final a través del módulo real ya modificado.
**Coincide con la de la cabina en las dieciocho filas.**

| acento | L\* | tinta | contraste |
|---|---|---|---|
| `#D6CFC2` | 83.35 | `#2E3440` | 8.07 |
| `#C9BFAE` | 77.72 | `#2E3440` | 6.87 |
| `#88C0D0` | 74.50 | `#2E3440` | 6.24 |
| `#A3BE8C` | 73.87 | `#2E3440` | 6.13 |
| `#C2B280` | 72.81 | `#2E3440` | 5.93 |
| `#6EB4C7` | 69.53 | `#2E3440` | 5.36 |
| `#B69F58` | 66.09 | `#2E3440` | 4.81 |
| `#87A96B` | 65.43 | `#2E3440` | 4.71 |
| `#B48EAD` | 63.40 | `#2E3440` | 4.41 |
| `#D08770` | 63.27 | `#2E3440` | 4.39 |
| `#C97353` | **57.37** | `#2E3440` | 3.60 |
| `#5E81AC` | **53.01** | `#ECEFF4` | **3.50** |
| `#9B6FA5` | **53.01** | `#ECEFF4` | **3.50** |
| `#BF616A` | 52.58 | `#ECEFF4` | 3.55 |
| `#4F75A8` | 48.53 | `#ECEFF4` | 4.10 |
| `#B24B5A` | 45.95 | `#ECEFF4` | 4.50 |
| `#4C566A` | 36.43 | `#ECEFF4` | 6.40 |
| `#3F4A5D` | 31.22 | `#ECEFF4` | 7.76 |

Ordenada por `L*` para que la frontera se vea: **`#C97353` (57.37) es el último oscuro y
`#5E81AC` (53.01) el primer claro.** Entre ambos hay 4.4 puntos de `L*`, así que el umbral 55
no está pegado a ningún token de la paleta.

Invariantes, medidas por el módulo real:

- **Once `#2E3440`, siete `#ECEFF4`.** Coincide con la tabla del ticket token a token.
- **Solo dos valores distintos** en los dieciocho. No hay tinta derivada.
- **Peor contraste real: 3.4959**, en `#5E81AC`. `#9B6FA5` queda a 3.4965, empatado a dos
  decimales. Ambos redondean al **3.50** que midió la cabina, y ambos superan 3.0.

### Comprobación cruzada obligatoria: cero discrepancias

Para los dieciocho, el umbral `L* > 55` y la comparación «gana el ancla que más contraste
dé» **coinciden en los dieciocho. Discrepancias: 0.** El umbral está bien colocado: no hay
ningún token al que el umbral asigne un ancla y la métrica de contraste prefiera la otra.

### El caso al filo

**`#FF007F` → `L*` = 54.86.** A 0.14 de la frontera, por debajo, así que recibe `#ECEFF4`.
Coincide con el 54.9 de la cabina; la diferencia es de presentación, no de cálculo. Es el
valor que usa `webAuthorPaletteDerivedRolesAndCustomHex.test.mjs:108`, y por eso se verificó
antes de escribir nada: una implementación de `L*` con otro redondeo lo habría volteado a
`#2E3440` y la prueba habría quedado escrita sobre un valor equivocado.

### El hex libre recorre el mismo camino

Sin trato especial: `resolveAuthorColorToken` esparce `deriveColorRolesFromAccent` para
cualquier `#RRGGBB` fuera de la paleta.

| hex libre | L\* | tinta |
|---|---|---|
| `#EBCB8B` (claro) | 83.04 | `#2E3440` |
| `#C97353` (al filo, arriba) | 57.37 | `#2E3440` |
| `#FF007F` (al filo, abajo) | 54.86 | `#ECEFF4` |
| `#123456` (oscuro) | 21.04 | `#ECEFF4` |

Comprobado de extremo a extremo: compilar un bloque `rule` con `variant: '#EBCB8B'` emite
`accentTextColor: '#2E3440'` y `renderRule` lo pinta; con `#5E81AC`, `#ECEFF4`.

---

## 4. El cálculo de contraste se movió; no se copió

La cabina midió que no existía cálculo de contraste en el repo. **Existía** — el grep se
hizo excluyendo `.jsx`. Estaba en `ComponentGuide.jsx` (~1351-1390): `parseHexChannel`,
`getRelativeLuminance` y `getColorContrastRatio`, la fórmula WCAG completa y correcta.

Las tres **se movieron** a `constants/colorSystem.js`. Verificado y reportado:

- **El cuerpo llegó idéntico**, comparado carácter a carácter contra el original. El único
  cambio es `const getColorContrastRatio` → `export const getColorContrastRatio`, que es
  visibilidad, no cuerpo. `parseHexChannel` y `getRelativeLuminance` siguen privadas del
  módulo, igual que `mixWithWhite`.
- **El movimiento elimina una dependencia cruzada en vez de crearla**, como anticipaba el
  ticket: las dos primeras ya llamaban a `normalizeHexColor`, que `ComponentGuide.jsx`
  importaba de `colorSystem.js`. Ahora la llaman desde su propio módulo.
- **`ComponentGuide.jsx` importa solo `getColorContrastRatio`.** Es la única de las tres que
  se usa desde fuera (`getSemanticPreviewText`, línea ~1398). Importar las otras dos habría
  dejado dos símbolos sin usar y roto lint.
- **Su único consumidor vivo no cambió de conducta.** `getSemanticPreviewText` no se tocó.
  Se capturó su salida para los dieciocho acentos más los nueve tokens de la paleta antes
  del movimiento y se comparó después: **27 entradas, igualdad de cadena byte a byte,
  IDÉNTICO.** Se comparó también la luminancia cruda a doce decimales y el ratio contra
  blanco, no solo el hex final.
- **No hay duplicado.** Queda una sola implementación de luminancia en el repositorio.

---

## 5. Qué renderers acabaron consumiéndola, y cuáles no

De los seis del ticket, **cuatro la consumen de verdad hoy** y **dos la consumen pero no la
reciben**, por una razón estructural que la cabina no había medido.

### Consumen y reciben (vivos)

| Renderer | Sitio real | De dónde llega |
|---|---|---|
| `renderRule.js` | franja del título | `buildRuleOutput`, nivel de bloque |
| `renderCard.js` | badge sólido (`:39`) | `buildCardOutput`, nivel de bloque |
| `renderConceptGrid.js` | badge (`:146`) | `buildConceptGridOutput`, **por ítem** |
| `renderBadge.js` | rama `solid` (`:40`, no `:39`) | reenviado por `renderCard` |

### Consumen pero no reciben (inertes hoy)

| Renderer | Por qué |
|---|---|
| `renderIconList.js` (`:117`) | `buildIconListOutput` **no resuelve ningún token de color**: pasa `item.color` tal cual, sin derivar roles. El badge sí lleva texto (`escapeHtml(item.badge)`, `:140`), así que el consumo es correcto — pero el valor nunca llega. |
| `renderArithmetic.js` | `buildArithmeticFactorizationOutput` emite `themeColor` pero **no resuelve token ni roles**. |

Emitir el rol para estos dos exige tocar `buildIconListOutput` y
`buildArithmeticFactorizationOutput`, y el scope del run limita `compiler.js` a **solo**
`buildColorRolesOutput`.

**Declaración explícita, para que nadie lo lea mal:**

- El consumo **está cableado**, con respaldo a la conducta de hoy: si el valor no llega,
  ambos pintan exactamente el blanco que pintaban antes. Verificado renderizando los seis
  sin el valor: respaldo byte a byte idéntico, incluido el `#FFF` corto de `renderIconList`.
- Ambos **se encienden solos** el día que el compilador emita el rol para sus bloques.
- **Ese día NO es este run.** «Lista con etiquetas» y la franja de «Factorización»
  **no cambian de aspecto hoy**. Cero cambio visual en esos dos. No hay nada que revisar en
  ellos en el QA de este run, y si el operador mira y no ve diferencia, eso es lo correcto,
  no un defecto.
- La cabina lo enruta como run propio. `buildIconListOutput` y
  `buildArithmeticFactorizationOutput` quedaron **sin tocar**.

### Corrección de coordenadas en `renderArithmetic`

La cabina citó `~224` y `~238`. **Ninguna de las dos pone texto sobre el acento del autor:**
son el badge de paso y las bolas, y ambas van sobre `PALETTE[dígito]` — el mapa fijo del
motor por divisor (`Commons.PALETTE`, líneas 16-24), no el acento. Derivar una sola tinta
para seis colores de dígito distintos habría sido incorrecto.

El sitio real donde `renderArithmetic` pone texto sobre el acento del autor es **la franja
del título**: `background-color: ${THEME_COLOR}` (~173) con `color: ${TXT_COLORS.mainTitle}`
(~177), y `mainTitle` caía a `'#FFFFFF'` a mano (~87). `THEME_COLOR` sí es
`data.themeColor`, el hex del autor. Ese es el sitio que se cableó.

Precedencia respetada: `USER_CFG.textColors.mainTitle` (escrito a mano) → `accentTextColor`
(derivado) → `'#FFFFFF'` (conducta de hoy).

### La tabla de excepciones de `renderRule`, y `headerBorder`

Se retiraron ambas. Hoy `renderRule` fijaba blanco y lo cambiaba solo para `str`, `focus` y
un caso de `ex`/`def`, atado al **identificador** de la variante — más un `border-bottom`
para los dos primeros. **El contraste pasa a depender del color real, no del nombre del
token**, así que un color personalizado deja de recibir trato distinto de un token.

`headerBorder` **no se derivó ni se conservó: se retiró**, por decisión de la cabina. Era la
misma compensación a mano atada al nombre. Verificado que no queda `border-bottom` residual
en ninguna variante. Declarado en el packet como cambio visible, no como defecto.

Comprobado de extremo a extremo con la regla final: los tres casos que tenían excepción
escrita a mano convergen ahora en el mismo ancla — `str` pasa de `#6B6352` a `#2E3440`,
`focus` de `#8C7B50` a `#2E3440`, y `ex` de `#4C566A` a `#2E3440`. Es exactamente el efecto
buscado: dejan de recibir trato distinto por su nombre.

---

## 6. Los tokens escritos a mano siguen mandando

El normalizador resuelve la tinta con **exactamente** el mismo patrón que los otros cuatro
roles: `accentText: normalizeRoleHex(token?.accentText, roles.accentText)`. Verificado: un
token con `accentText: '#123456'` escrito a mano conserva `#123456` y no lo pierde por lo
derivado. **No se añadió ninguna tinta literal a los tokens de la paleta: se derivan todas.**

---

## 7. Las ocho aserciones de forma: actualizadas, no aflojadas

Línea base: **436 pruebas, 436 pasan.** Resultado final: **436 pruebas, 436 pasan, 0
fallan.** Ninguna se convirtió en comparación parcial, `deepInclude` ni `match` sobre
subconjunto, y a ninguna se le borró una clave antes de comparar. **Cada una ganó la clave
nueva con su valor esperado escrito**, de modo que sigue fallando mañana si aparece una
clave que nadie espera. Eso era todo su valor y se conserva intacto.

| # | Archivo | Acento | Regla 1 (retirada) | **Regla final** |
|---|---|---|---|---|
| 1 | `authorLiteColorSystem.test.mjs` | `#123456` | `#DEE3E7` | **`#ECEFF4`** |
| 2 | `authorLiteColorSystem.test.mjs` | `#D08770` | `#4F332B` | **`#2E3440`** |
| 3 | `authorLiteColorSystem.test.mjs` | `#EBCB8B` | `#594D35` | **`#2E3440`** |
| 4 | `webAuthorPaletteDerivedRolesAndCustomHex.test.mjs` | `#FF007F` | `#610030` | **`#ECEFF4`** |
| 5 | `webTableSafety.test.mjs` | `#5E81AC` | `#243141` | **`#ECEFF4`** |
| 6 | `webTablesParitySchemaCompiler.test.mjs` | `#5E81AC` | `#243141` | **`#ECEFF4`** |
| 7 | `webColumnsChildExpansionSafety.test.mjs` | `#5E81AC` | `#243141` | **`#ECEFF4`** |
| 8 | `webConceptGridSafety.test.mjs` | `#B48EAD`, `#C2B280` | `#443642`, `#4A4431` | **`#2E3440`** en las dos |

Las cinco primeras usan la clave `accentText` (rol); las cuatro últimas `accentTextColor`
(salida compilada). El valor de la fila 1 no venía dado en el ticket: se derivó del acento
`#123456` de ese token, `L*` 21.04 → `#ECEFF4`.

La octava es la única que gana **dos** líneas, porque su `deepEqual` cubre dos ítems en una
sola aserción. Sus dos valores son las filas 1 y 4 de la tabla de dieciocho.

**Auditoría de lo tocado:** `accentText` aparece en `compiler-api/tests/` en 9 líneas, 6
archivos, 8 aserciones. **Ninguna prueba fuera de las ocho se tocó.** No apareció ninguna
novena roja.

Sobreviven intactas `authorLiteColorSystem.test.mjs:103` y `:143`: `getAuthorColorRoles`
proyecta las cuatro claves a mano y no se tocó.

---

## 8. Las tres correcciones a la cabina, para que no se hereden mal

Este run corrigió tres medidas de la cabina. Las tres estaban en el ticket como hechos y
las tres las desmintió el disco.

**1. El cálculo de contraste sí existía.** La cabina afirmó que no había ninguno en el
repositorio y pidió escribirlo. Estaba en
`tools/author-lite/editor-ui/src/features/editor/components/preview/ComponentGuide.jsx`,
líneas **1351-1390**: `parseHexChannel` (1351-1363), `getRelativeLuminance` (1365-1381) y
`getColorContrastRatio` (1383-1390), con la fórmula WCAG completa y un consumidor vivo en
`getSemanticPreviewText` (1392-1403). **Causa: el grep se hizo excluyendo `.jsx`.** De
haberse escrito, el repo habría quedado con dos implementaciones de luminancia.

**2. `renderArithmetic` ~224 y ~238 no van sobre el acento.** La cabina las citó como dos
de los seis sitios que fuerzan blanco sobre el acento del autor. **No lo son:** son el badge
de paso (**224**) y las bolas (**238**), y ambas pintan sobre `PALETTE[dígito]`, el mapa
fijo del motor por divisor construido en `renderArithmetic.js:16-24` desde
`Commons.PALETTE`, opcionalmente sobrescrito por `data.config.palette`. No es el acento del
autor, y derivar una sola tinta para seis colores de dígito distintos habría sido
incorrecto. **El sitio real** donde ese renderer pone texto sobre el acento del autor es la
franja del título: `background-color: ${THEME_COLOR}` (**~173**) con
`color: ${TXT_COLORS.mainTitle}` (**~177**), donde `mainTitle` caía a `'#FFFFFF'` a mano
(**~87**) y `THEME_COLOR = data.themeColor` (**~31**) sí es el hex del autor.

**3. El censo de aserciones de forma eran ocho, no siete.** La octava,
`webConceptGridSafety.test.mjs:78`, se perdió en la primera ronda porque el censo buscó
bloques `deepEqual` con `border:` dentro de ocho líneas de contexto, y ese fixture anida los
roles dentro de `items[]`, más abajo de esa ventana. **Error de enumeración del taller, no
de la cabina**, y por eso se reportó en vez de tocarla: el segundo ticket la pre-etiquetaba
como regresión de conducta, y el disco mostró que era aditiva.

Corrección menor de coordenadas, ya aceptada: la cita de `renderBadge` era **`:40`**, no
`:39`.

---

---

## 9. Los seis renderers no cambiaron de código

La ronda 4 sustituyó **solo la regla**. Los seis renderers ya consumían `accentTextColor` con
respaldo, así que únicamente cambió el valor que reciben. **Ninguno necesitó un cambio de
código**, y se verificó renderizando: `def` → `#2E3440`, `str` → `#2E3440`,
`focus` → `#2E3440`, `#5E81AC` → `#ECEFF4`, cada uno coincidiendo con lo que emite el
compilador. `compiler.js` y `ComponentGuide.jsx` tampoco se tocaron.

Se conservan íntegros de las rondas anteriores: el movimiento de las tres funciones de
contraste a `colorSystem.js`, la emisión desde `buildColorRolesOutput`, el consumo en los
seis renderers, la retirada de la tabla de excepciones y de `headerBorder` en `renderRule.js`,
y el nombre `accentText` / `accentTextColor`.

---

*Ronda 1: parada correcta ×2. Ronda 2: ejecutado, con una parada abierta.
Ronda 3: octava aserción autorizada y actualizada.
Ronda 4: regla sustituida tras la QA del operador; `mixWithBlack` retirado; suite en 436/436.
El `status` del run lo cierra la cabina.*
