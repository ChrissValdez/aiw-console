# Tinta contrastada sobre el acento del autor — `accentText`

Run canónico: `RUN-CANTU-ACCENT-INK-CONTRAST-ROLE-001`, `queue_order` 34, `status: active`.
Título verificado contra `.aiw/roadmap/roadmap.json` en la primera ronda: coincide.

Dos rondas. La primera **paró** ante dos guardas del propio ticket; ambas paradas
resultaron correctas. La segunda las desbloqueó con autorización explícita del operador y
ejecutó el run. **Queda una tercera parada abierta**, al final de este documento.

---

## 1. La regla y sus tres decisiones

```js
// existente, colorSystem.js
surface: mixWithWhite(rgb, 0.92)
border:  mixWithWhite(rgb, 0.65)

// nuevo
accentText = mixWithBlack(rgb, 0.62)
             // si contraste(accent, esa tinta) < 3.0:
             mixWithWhite(rgb, 0.86)
```

Es deliberadamente **la misma familia** que ya produce `surface` y `border`, con el extremo
contrario. La simetría es la razón de la elección, no un detalle de implementación.

1. **Ratio fijo, nunca resuelto por token.** Resolverlo daba resultados erráticos: dos
   azules casi idénticos recibían tintas opuestas. Con ratio fijo eso desaparece —
   `#5E81AC` y `#4F75A8` son vecinos y **sí** caen en ramas distintas (3.28 oscura vs 3.97
   clara), pero por una diferencia de luminancia real y estable, no por búsqueda.
2. **Ni blanco ni negro puros en ninguna rama.** Medido sobre los dieciocho: **cero tintas
   puras**. Es consecuencia de que ambos ratios sean menores que 1.
3. **Un solo rol para todas las superficies.** No se derivan dos tintas, una para texto
   grande y otra para pequeño. El umbral **3.0** es el de texto grande porque la superficie
   de referencia es la franja de título de «Regla matemática», en mayúsculas y negrita.

Umbral y ratios viven como constantes con nombre en `colorSystem.js`:
`ACCENT_TEXT_CONTRAST_THRESHOLD`, `ACCENT_TEXT_DARK_RATIO`, `ACCENT_TEXT_LIGHT_RATIO`.

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

## 3. La tabla de dieciocho

Recalculada de cero con `mixWithBlack` como espejo literal de `mixWithWhite` y la fórmula
WCAG. **Coincide con la de la cabina en las dieciocho filas: mismo hex, misma rama, mismo
contraste a dos decimales. Cero discrepancias, ni de redondeo.**

| acento | tinta | rama | contraste |
|---|---|---|---|
| `#B48EAD` | `#443642` | oscura | 4.00 |
| `#5E81AC` | `#243141` | oscura | 3.28 |
| `#88C0D0` | `#34494F` | oscura | 4.75 |
| `#C2B280` | `#4A4431` | oscura | 4.61 |
| `#D6CFC2` | `#514F4A` | oscura | 5.28 |
| `#A3BE8C` | `#3E4835` | oscura | 4.72 |
| `#D08770` | `#4F332B` | oscura | 4.01 |
| `#BF616A` | `#492528` | oscura | 3.25 |
| `#4C566A` | `#E6E7EA` | **clara** | 5.97 |
| `#9B6FA5` | `#3B2A3F` | oscura | 3.28 |
| `#4F75A8` | `#E6ECF3` | **clara** | 3.97 |
| `#6EB4C7` | `#2A444C` | oscura | 4.44 |
| `#B69F58` | `#453C21` | oscura | 4.21 |
| `#C9BFAE` | `#4C4942` | oscura | 4.94 |
| `#87A96B` | `#334029` | oscura | 4.15 |
| `#C97353` | `#4C2C20` | oscura | 3.59 |
| `#B24B5A` | `#F4E6E8` | **clara** | 4.28 |
| `#3F4A5D` | `#E4E6E8` | **clara** | 7.14 |

Invariantes, re-medidas al final a través del módulo real ya modificado:

- **Tintas puras `#FFFFFF` o `#000000`: 0.**
- **Rama clara: exactamente 4** — `#4C566A`, `#4F75A8`, `#B24B5A`, `#3F4A5D`.
- **Peor contraste real: 3.2519**, en `#BF616A` → `#492528`. Es el token más apretado de la
  paleta y el primero que se caería si alguien moviera el ratio 0.62.

### El hex libre recorre el mismo camino

Sin trato especial: `resolveAuthorColorToken` esparce `deriveColorRolesFromAccent` para
cualquier `#RRGGBB` fuera de la paleta.

| hex libre | tinta | rama | contraste |
|---|---|---|---|
| `#EBCB8B` (claro) | `#594D35` | oscura | 5.30 |
| `#2E3440` (oscuro) | `#E2E3E4` | **clara** | 9.72 |
| `#FF007F` | `#610030` | oscura | 3.58 |
| `#123456` | `#DEE3E7` | **clara** | 9.84 |

Comprobado de extremo a extremo: compilar un bloque `rule` con `variant: '#EBCB8B'` emite
`accentTextColor: '#594D35'` y `renderRule` lo pinta. Con `#2E3440`, `#E2E3E4`.

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

Comprobado de extremo a extremo: `str` pasa de `#6B6352` a `#514F4A`, `focus` de `#8C7B50` a
`#4A4431`, `ex` de `#4C566A` a `#34494F`.

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

| # | Archivo | Línea original | Gana |
|---|---|---|---|
| 1 | `authorLiteColorSystem.test.mjs` | 59 | `accentText: '#DEE3E7'` |
| 2 | `authorLiteColorSystem.test.mjs` | 73 | `accentText: '#4F332B'` |
| 3 | `authorLiteColorSystem.test.mjs` | 121 | `accentText: '#594D35'` |
| 4 | `webAuthorPaletteDerivedRolesAndCustomHex.test.mjs` | 108 | `accentText: '#610030'` |
| 5 | `webTableSafety.test.mjs` | 63 | `accentTextColor: '#243141'` |
| 6 | `webTablesParitySchemaCompiler.test.mjs` | 148 | `accentTextColor: '#243141'` |
| 7 | `webColumnsChildExpansionSafety.test.mjs` | 518 | `accentTextColor: '#243141'` |
| 8 | `webConceptGridSafety.test.mjs` | 78 | `accentTextColor: '#443642'` **y** `'#4A4431'` |

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

*Ronda 1: parada correcta ×2. Ronda 2: ejecutado, con una parada abierta.
Ronda 3: octava aserción autorizada y actualizada; suite en 436/436.
El `status` del run lo cierra la cabina.*
