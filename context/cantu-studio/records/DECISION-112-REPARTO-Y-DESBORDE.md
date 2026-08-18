# DECISIONES DEL OPERADOR — `#112`, el reparto de la rejilla y el desborde

> **Recogidas por la cabina el 2026-08-17**, al cerrar la ronda 1 de
> `RUN-CANTU-SLIDE-GRID-ROW-HEIGHT-DISTRIBUTION-001`.

## SUS PALABRAS, VERBATIM

    vamos con tu recomendaicon B

    No te recomiendo ninguna: esto es juicio visual y por eso está dibujado. Míralas y señala una.

    tomemos tus recomendaciones

## DECISIÓN 1 — LA PUERTA: `min-height: 0` EN EL ENVOLTORIO

Elegida sobre la alternativa, con las dos medidas delante.

| | Mueve el corpus | Cubre |
|---|---|---|
| `minmax(0, Nfr)` | 0 de 50 | Sólo las que declaran filas. **Deja fuera 32 sin declarar y las recién creadas** |
| **`min-height: 0`** ← elegida | **8 de 50**, entre 11,6 y 35,4 px | **Todo** |

**La razón que decidió:** una diapositiva nueva nace con `layout: { cols: 2 }` **y sin filas** —
verificado en `blockFactory.js`—, así que con la otra puerta **el defecto que el operador acaba
de encontrar seguiría apareciendo al crear una diapositiva nueva**. Se paga con 8 diapositivas
moviéndose entre 11 y 35 px, y esas 8 se le enseñan en la QA de la ronda 2.

**Se le nombró un tercer camino y lo descartó con el resto:** `minmax(0, Nfr)` más sembrar las
filas al crear. Daría 0 movimiento y cubriría lo nuevo, **pero deja rotas las 32 que ya existen
sin filas declaradas**.

## DECISIÓN 2 — EL DESBORDE: DELEGADA EN LA CABINA, Y HAY QUE DECIR CÓMO

**La cabina se había negado a recomendar**, con esta razón: *«esto es juicio visual y por eso
está dibujado»*. **El operador citó esa frase y respondió «tomemos tus recomendaciones».**

**Delegó a sabiendas, así que la cabina recomienda — pero NO fingiendo que ve.** La distinción
que se le dio, y que es la que hace legítima la recomendación:

- **Lo que la cabina SÍ puede hacer: leer los números que el taller midió.** En esos números,
  **encoger sólo el gráfico domina en los tres ejes a la vez** — perdido **0**, fuera **0**,
  escala del texto **1,00** en los tres casos. La conducta que las palabras del operador
  sugerían —escalarlo todo— deja el texto al **0,77** y al **0,65**.
- **Lo que la cabina NO puede hacer, y se declara:** juzgar si un gráfico encogido **se ve
  bien**, y si desentona al lado de un vecino a tamaño completo. **El proyecto no tiene
  renderizador y la cabina no ve interfaces.** Eso sigue siendo del operador, y por eso la
  ronda 2 tiene orden de ponérselo delante en la QA.

**LA RECOMENDACIÓN: ENCOGER SÓLO EL GRÁFICO.** Y con un principio detrás, porque va a gobernar
más que este caso:

> **El dibujo vectorial no tiene suelo de legibilidad; el texto sí.** Un SVG encogido sigue
> siendo el mismo dibujo. Una letra encogida deja de leerse. Cuando algo tiene que ceder alto,
> **cede lo que puede ceder sin perder información**.

## LA CONSECUENCIA QUE HAY QUE VIGILAR — es de pieza compartida

**Esa regla no es sólo de este caso: es una conducta POR TIPO de componente**, y por delante
quedan **siete componentes más** del plan que caerán en la misma rejilla. Cada uno tendrá que
responder la misma pregunta: **¿cede alto, y cómo?**

**Si la ronda 2 la escribe como una regla general en vez de como un caso particular, se
convierte en contrato**, y entonces la decisión pesa más de lo que parece hoy. **Queda nombrado
para que el operador lo sepa antes de que ocurra**, no después.

## LO QUE LA RONDA 1 CORRIGIÓ DE LA CABINA — cinco veces

Todas verificadas contra disco por la cabina antes de aceptarlas:

1. **«El número no va a ser cero» — era cero.** La cabina colapsó dos cosas distintas: **0 de
   50 diapositivas se mueven un píxel**; lo que cambia es el HTML, **18 de 50**.
2. **Las cifras del `#108` que la cabina puso en el texto del run NO reproducen** — decía
   `228,3 / 83,3 / 83,3 / 288,7` y hoy mide `316,7 / 43,1 / 43,1 / 201,5`. **Era una medición
   PROPIA envejecida DENTRO DE LA MISMA SESIÓN**, porque el componente narrativa se movió en
   las rondas 2 y 3 de aquel mismo run. Es una de las formas de fallar que este proyecto tiene
   documentadas, y la cabina la cometió de manual.
3. **El recorte de la fila 4 no se arregla con el reparto: EMPEORA**, de 390 px fuera a 546,3.
   La cabina lo había agrupado como «el mismo defecto». **Son dos caras**, y la segunda la
   cierra la decisión del desborde.
4. **«Una fila vacía conserva su altura» es CONDICIONALMENTE cierto**, no falso como la cabina
   sospechaba: se cumple exacto salvo con un vecino alto arriba, y **nunca colapsa**.
5. **Cuatro citas de línea corridas** en cuatro ficheros. Verificado: `gridTemplateRows` está
   en la **76**, no en la 77.

**Y la mitad de la causa que la cabina no nombró:** `1fr` es `minmax(auto, 1fr)`, sí, **pero el
mínimo lo pone el envoltorio de columna**, que declara `min-width: 0` y **no** `min-height: 0`.
**Dos puertas al mismo mecanismo** — y es lo que hizo posible la decisión 1.
