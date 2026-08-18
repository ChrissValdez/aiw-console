# VEREDICTO 117 — La separación bajo el título de la diapositiva, y Narrativa pierde la suya

> Run: `RUN-CANTU-SLIDE-HEADER-BOTTOM-SPACING-001` · `queue_order` 117 al momento de escribir.
> Veredicto emitido por el operador **Christopher Valdez Cantu** el **2026-08-18**, tras abrir
> `QA/temp/RUN-CANTU-SLIDE-HEADER-BOTTOM-SPACING-001/QA-117.html`.
> Transcrito por la cabina **VERBATIM**. No se parafrasea, no se completa.

---

## SUS PALABRAS, ÍNTEGRAS

```
se ve bien pass
```

---

## CÓMO SE PIDIÓ Y CÓMO LLEGÓ

La QA se entregó en **seis pasos**, con formato de respuesta pedido literal
(`1 ok / 1 falla` … y una línea de porqué en el 4, el 5 y el 6). **El veredicto llegó en una
sola línea.** Es el SEGUNDO veredicto seguido que llega así, y se registra el patrón en vez
de normalizarlo en silencio.

| Paso | Qué pedía | Cómo se resuelve |
|---|---|---|
| 1 · Caso peor: 4 filas llenas, separación al máximo, sin desborde | parada si se sale | **PASA** |
| 2 · El gráfico de la fila 4 sigue dibujando (55,7 → 50,11 px) | parada si queda vacío | **PASA** |
| 3 · «HOY» == «Mediano» en el encabezado, los dos 48 px | verificación de ancla | **PASA** |
| 4 · Calibración de los cuatro peldaños, con la alternativa dibujada al lado | veredicto + porqué | **PASA sin porqué.** No pidió la alternativa `0,5 · 1 · 1,5 · 2` |
| 5 · **EL RÓTULO** «Separación bajo el encabezado», entregado como PROPUESTA | «dime si te vale o cómo lo quieres» | **ACEPTADO POR «pass».** Ver abajo |
| 6 · La Narrativa al perder su espaciado: ¿se ve apretada? | veredicto suyo, no del taller | **PASA sin porqué.** No pidió recuperar el efecto |

### El paso 5 merece su propio párrafo, y es el que más pesa

El `full_description` de este run advertía por escrito: **«EL RÓTULO QUE LEA EL AUTOR SE
PROPONE Y SE MARCA COMO PROPUESTA. Los rótulos los decide el operador, y hay un conflicto
abierto en este proyecto por no haberlo hecho.»**

El rótulo **«Separación bajo el encabezado»** se le presentó marcado como propuesta y él
respondió `pass`. **Se toma por aceptado y así queda en el editor.** Pero queda escrito que
**nunca lo escribió con sus propias palabras**, y por tanto:

- **Es vetable y barato de revertir:** es una cadena en un formulario, ninguna prueba lo
  clava, ningún contrato depende de él.
- **Se juzga por si seguirá siendo verdad dentro de seis meses.** «Separación bajo el
  encabezado» describe lo que hace y no se ata a la implementación, que es la prueba que
  «Columns Slide» no pasó.

### La calibración también quedó aceptada sin palabras propias

Tabla anclada en el ancla medida en navegador — `.j-header-v3 { margin-bottom: 3rem }` = **48
px enteros**:

| | Chico | **Mediano** | Grande | Extra grande |
|---|---|---|---|---|
| rem | 2.5 | **3** | 3.6 | 4.4 |
| px | 40 | **48 ← lo de hoy** | 57,6 | 70,4 |

El taller NO heredó el juego `0,5 · 1 · 1,5 · 2` de la tabla retirada, y su razón está medida:
aquel juego existía porque sobre una base de `0.8rem` las razones de la casa daban pasos de
2,1 px, invisibles. Aquí el paso más pequeño es de **8 px**, así que la condición que
justificaba apartarse del molde **no se cumple**. La alternativa se dibujó al lado y el
operador no la pidió.

---

## LAS DOS PARADAS QUE NO SE DISPARARON, Y POR QUÉ IMPORTA QUE SE MIDIERAN

**`titleSpacing` en el corpus: CERO.** La retirada es sustractiva y rompe contrato, así que
la medición era la condición para poder hacerla. Sonda de **dos caminos**, porque hay dos
clases de fuente: 143 `.json` **parseados enteros** (5 recuperados con BOM/UTF-16, 0
ilegibles) y 31 `.js` de `src/content` **cargados con `require` y recorridos sobre el objeto
ya construido** — el único camino que ve un campo que entre por `spread`.

**El gráfico de la fila 4 no vuelve a cero:** 55,7 px → **50,11 px** con la separación al
máximo. Era la parada que el propio run declaraba como decisión del operador si se disparaba.

**Su condición de aceptación, verificada:** ninguna celda se sale en los cuatro peldaños,
incluido el caso peor de cuatro filas con ocho celdas — la más baja termina en **1016 px
sobre 1080**. Las bandas encogen de 171,2 a 165,6 px.

---

## LO QUE QUEDÓ ABIERTO Y NO SE TOCÓ

- **UN COMENTARIO QUE AHORA ES FALSO, EN LOS DOS GEMELOS DEL ESQUEMA.** Lo encontró la
  cabina al verificar, no el taller: *«la misma forma con la que `SlideNarrativeItemSchema`
  declara sus `titleSize` y `titleSpacing` unas líneas más arriba»*. Ya no declara
  `titleSpacing`. Es texto, no conducta. **Nombrado y no corregido**, porque corregirlo sería
  la cabina haciendo el trabajo de un run.
- **`SlideNarrativeItemSchema` NO LLEVA `.strict()`.** Un borrador con `titleSpacing`
  seguiría siendo válido y **perdería el campo en silencio** en vez de ser rechazado. Hoy no
  muerde —cero usuarios—, y endurecerlo afectaría a todas las claves desconocidas del
  esquema. **Decisión que este run no tenía encargada.**
- **EL INVENTARIO DE PISTAS OBSOLETAS DEL TICKET ESTABA INCOMPLETO, Y ERA DE LA CABINA.**
  Nombró tres; `narrative.titleSpacing` desapareció sola con el campo, y hay una CUARTA
  —`headerSize` en `SlideBlockEditor.jsx`— que la lista no cubría **porque está en otro
  fichero**. Es el patrón de sonda que no distingue, esta vez en un ticket. Quedan **tres**
  pistas vivas, no dos.
- **«Extra grande» contra «muy grande»** sigue abierto, sin run, y es del operador.
- **El suelo del dibujo del gráfico en la fila 4** sigue siendo decisión abierta suya.
