# VEREDICTO DEL OPERADOR — `#109`, la fusión por ocupación

> **Recogido por la cabina el 2026-08-17.** Cierra
> `RUN-CANTU-SLIDE-GRID-MERGE-OCCUPANCY-RULE-001` en una sola ronda.

## SUS PALABRAS, VERBATIM

    funciona, dale pass y abramos el siguiente

## QUÉ APRUEBA

**Los cinco pasos de la QA sobre el mapa de rejilla del editor**, ejecutados por él. El paso 4
—dos componentes dentro de lo marcado tienen que seguir rechazándose— era el único con
consecuencia de parada y **no la disparó**.

## EL RÓTULO: LO VIO Y NO LO OBJETÓ, Y ESO NO ES LO MISMO QUE ELEGIRLO

El texto de éxito de la fusión —**«… ocupará todo lo marcado: N columna(s) × M fila(s)»**— se
le entregó **marcado como propuesta de la cabina**, con dos alternativas ofrecidas («llenará la
celda grande», «ocupará el bloque entero») y con la petición explícita de que lo mirara en el
paso 2 y opinara.

**Lo vio y no dijo nada.** El rótulo queda como está y es el que se publica, **pero no consta
que lo haya elegido**: consta que no lo rechazó. Sigue marcado como propuesta en el código y
se cambia en un sitio y su prueba.

**Se escribe así a propósito.** Dar por elegido lo que sólo fue no-objetado es la clase de
salto que produce un rótulo huérfano al que nadie se atreve a tocar dentro de seis meses.

## LO QUE ENTREGÓ EL RUN

**La fusión dejó de preguntar «¿dónde está el componente?» y pregunta «¿cuántos hay?».** Si
dentro de lo marcado hay exactamente uno, se fusiona esté donde esté y pasa a ocupar el
rectángulo entero.

**La mecánica no cambió: sólo se retiró lo que la impedía.** `mergeSlideGridCells` ya escribía
la posición del rectángulo sobre el ítem.

**Los seis rechazos anteriores siguen enteros, y ahora los seis tienen aserción** — el de «se
sale de la rejilla» no la tenía antes de este run.

**Se rompió «nada se reubica solo», a propósito y con el coste delante.** El principio sigue
gobernando las flechas de movimiento y «Separar», que no se tocaron. **Fusionar es la única
acción que reubica.** El comentario que afirmaba lo contrario no se borró: cita lo que decía,
qué cambió, cuándo y por decisión de quién, y conserva que el operador eligió el mapa de celdas
contra la recomendación de la cabina.

## EL TALLER CONTRADIJO AL TICKET Y A LA CABINA CUATRO VECES, Y ACERTÓ LAS CUATRO

1. **`SlideGridMap.jsx` no era el fichero.** El `Scope` del ticket lo nombraba; el `reason` lo
   pinta `SlideBlockEditor.jsx`. **Lo que salvó el error fue la CONDICIÓN, no el nombre:** el
   ticket decía «sólo si el texto que lee el autor vive allí», y no vivía. **Una condición bien
   escrita atrapó un nombre mal escrito.**
2. **El recuento de aserciones.** La cabina midió «ocho» contando **apariciones**, incluida la
   línea del `import`. Eran **7 llamadas y 19 aserciones**. Es la **tercera vez en dos runs**
   que la cabina falla por la misma causa: sondas que no distinguen. Las otras dos: las escalas
   de `tokens.js` y la lista de la cola compartida.
3. **`C5 [SENTINEL]`, y esta corrige el RELEVO, no el ticket.** Ver abajo.
4. **El ocupante anclado fuera del rectángulo pero que lo solapa.** Lo nombró y lo dejó, y es
   la decisión correcta: añadir una guarda de contención habría sido **mover** la guarda de
   sitio, que es lo que el criterio A prohibía. Que sea **inalcanzable desde el mapa** —las
   celdas cubiertas no se pintan— no lo hace inexistente. **Queda abierto.**

## LA CORRECCIÓN DE `C5 [SENTINEL]` — hay que llevarla al relevo

**El relevo lleva al menos dos sesiones describiendo `C5` como un indicador de ciclo:** «exige
CERO runs `active`», «se enciende y se apaga con el ciclo», y presumía de haberlo predicho dos
veces seguidas.

**Medido en `tools/roadmap/tests/clearProgress.test.mjs`, y las dos mitades importan:**

- **Su título e intención son otra cosa:** «the canonical file was never written by this
  suite». Es un **centinela de fuga** — comprueba que la propia suite no dejó colado en el
  canónico real un run activo sintetizado en sus fixtures.
- **Su aserción, literalmente, SÍ es `activeCount === 0`.** Así que **sí** se enciende cuando
  hay un run activo, y la afirmación mecánica del relevo no era falsa.

**El error no era el hecho: era el encuadre.** Describirlo como semáforo del ciclo en vez de
como centinela llevó a la cabina a **predecir un número** en un ticket en lugar de leer un
propósito — y además la predicción llegó tarde, porque cuando el taller midió, `#109` ya estaba
activo. **La base no se movió: 1585 con 5 fallos, exactamente la conocida.**

## LO QUE SIGUE ABIERTO

- **El rótulo de éxito de la fusión**, arriba: publicado, no elegido.
- **El ocupante anclado fuera**, arriba.
- **Las pistas `1fr` no reparten en partes iguales** — nombrado desde el cierre de `#108`,
  misma superficie, sin dueño.
- **El puesto del control «Espaciado título–párrafo»** en el formulario de Narrativa.
- **«Extra grande» vs «Muy grande»**, abierto desde la ronda 2 de `#108`.
