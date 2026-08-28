# VEREDICTO DEL OPERADOR — `#154`: **la fórmula grande sí, el historial no**

> Dado por **Christopher Valdez Cantu** el **2026-08-28**, sobre la parada del taller que
> desmintió cuatro de las cinco mediciones del encuadre de la cabina. **Verbatim.**

---

## VERBATIM

> **«si»**

Sobre esta pregunta, y **sobre la explicación que la precede**, que es la parte que importa
porque el «sí» es a ella:

> **«un mando por paso que fija HASTA QUÉ TAMAÑO crecen las dos fórmulas de ese paso,
> encogiendo sólo si no caben»**

Y antes, sobre la recomendación de alcance:

> **«¿Confirmas: la fórmula grande sí, el historial no?»** → **sí**

---

## QUÉ DECIDE, Y SON TRES COSAS

### 1 · EL ALCANCE: la fórmula **grande**, no el historial

**La grande** es la del paso enfocado — la tarjeta central, con la fórmula de partida arriba,
la flecha, y la del paso abajo. **El historial** es la barra lateral de pasos pasados.

**Por qué la grande:** es la que **no tiene canal de autor ninguno** —medido: el motor no lee
ningún campo de tamaño para ella— y su techo es una constante en el código.

**Por qué el historial NO, y no es pereza:**

- **No es aditivo.** Hoy todo el historial pinta por debajo de un tope fijo; abrirlo hace que
  **51 ítems ya declarados** empiecen a pintar el suyo. **Mueve 63 árboles fijados y cambia
  contenido ya escrito.**
- **Y revierte una decisión suya del 2026-08-24** — *«ninguno de los dos: automático»*— tomada
  precisamente porque el tamaño del autor había dejado de tener efecto visual.

**Queda nombrado y sin run.** Si algún día el historial le estorba, se abre con su propio coste
a la vista.

### 2 · LA SEMÁNTICA: el número es un **TECHO**, no un tamaño exacto

**Es lo que el guion ya hace, y por eso encaja con su frase original:**

    let fontSize = maxFont;                              // arranca del número del autor
    while (se_desborda && fontSize > 14) fontSize -= 1;  // y SÓLO baja

**Nunca sube por encima. Sólo baja si no cabe, con suelo 14 px.** Su petición original
—*«mientras no se desborda tener control del tamaño; si se desborda, techo automático»*— **es
literalmente esta función.** Lo único que cambia es de dónde sale `maxFont`.

### 3 · LAS DOS MITADES COMPARTEN UN SOLO TAMAÑO, y él lo aceptó sabiéndolo

    const finalSize = Math.min(sizeIn, sizeOut);

**Si la fórmula de abajo tiene que bajar a 30, la de arriba baja a 30 también**, aunque ella
sola cupiera a 45. **El mando es «el tamaño de las fórmulas de este paso», no de una.**

**Se le puso delante como tercera opción** —«quería poder darle tamaños distintos a las dos»—
**y no la eligió.** No es un descubrimiento pendiente: **es alcance descartado.**

---

## ⚠ LO QUE LA CABINA MIDIÓ AL PREPARAR ESTE VEREDICTO, Y NO ESTABA EN NINGUNA PARTE

### `contentScale` — la palanca que YA existe sobre esta misma fórmula, y es la equivocada

**El motor lee `focusStep.contentScale`** y hace dos cosas con él:

    const scaleStyle  = scaleVal !== 1 ? `transform: scale(${scaleVal});` : '';
    const manualFlag  = scaleVal !== 1 ? 'true' : 'false';
    …
    if (wrapper.dataset.manualScale === 'true') return maxFont;   // dentro de calculateFit

> **Agrandar con `contentScale` APAGA EL AUTOAJUSTE.** No es un techo más alto: **es no tener
> techo.** Es exactamente la mitad de la petición que el operador NO pidió.

**Y no está admitido en el esquema:** sus **tres** apariciones en `draftSchema.js` son
**comentarios**; cero claves de zod. **Uno de esos comentarios ya lo declara fuera de alcance y
explica por qué.**

**Es la SEXTA vez del patrón «capacidad en el motor, cerrada en el esquema» — y la primera en la
que la respuesta correcta es DEJARLA CERRADA.** Se nombra; no se abre.

### La unidad no cuadra sola, y es el único punto de diseño abierto

| canal | forma | cómo se aplica |
|---|---|---|
| `problemSize`, `historySize`, `detailsSize` | **cadena `rem`** (`SlideTextSizeValue` = enum ∪ rem libre) | **CSS directo** |
| el techo de la fórmula grande | **número en `px`** (`capSize = isSingle ? 75 : 45`) | **JavaScript** |

**Todos los tamaños de autor de esta casa son `rem` en cadena. Éste es el primero que tiene que
llegar a JavaScript como NÚMERO.** La conversión es del taller decidirla; **la cabina la nombra
y no la resuelve.**

### El corpus no se mueve

**Cero escenas declaran un tamaño para la fórmula grande.** Con control positivo: la misma sonda
**sí** encuentra los `historyFontSize` del corpus. **El cambio es aditivo de verdad**, y ésa es
la mitad de la razón por la que la grande sí y el historial no.
