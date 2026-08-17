# DECISIÓN DE DISEÑO DEL OPERADOR — `#109`, la fusión por ocupación

> **Recogida por la cabina el 2026-08-17**, al celebrarse la parada de análisis de
> `RUN-CANTU-SLIDE-GRID-MERGE-OCCUPANCY-RULE-001`. Se guarda igual que un veredicto porque es
> una decisión de diseño que de otro modo habría muerto en el chat.

## LA SECUENCIA, PORQUE IMPORTA QUE PIDIÓ LA EXPLICACIÓN ANTES

    Operador: explicame la regla A antes de aprobarla
    [la cabina explica qué cambia, qué no cambia, y qué principio se rompe]
    Operador: apruebo

**No aprobó una recomendación: aprobó un cambio cuyo coste le habían puesto delante.** Esa
secuencia queda escrita porque es la diferencia entre una decisión informada y un visto bueno.

## QUÉ APROBÓ

**Que la fusión deje de preguntar «¿dónde está el componente?» y pregunte «¿cuántos hay?».**

Si dentro de lo marcado hay **exactamente un componente**, se fusiona **esté donde esté**, y el
componente pasa a ocupar el bloque entero. Hoy tiene que estar ya en la esquina de arriba a la
izquierda, y si no, el editor se niega y le dice que lo mueva primero: dos operaciones donde
debería haber una.

## EL PRINCIPIO QUE SE ROMPE, Y SE ROMPE SABIÉNDOLO

**«Nada se reubica solo».** Gobierna hoy las flechas de movimiento y el botón de separar, y no
tiene excepciones. **Fusionar pasa a ser la única acción que reubica.**

Se le presentaron las dos lecturas:

- **A favor** — el componente no viaja a ningún sitio nuevo. Se queda dentro del mismo bloque
  que acaba de marcar; lo que hace es llenarlo. Desde su punto de vista no se ha movido: ha
  crecido.
- **En contra** — es una excepción a una regla que hoy no tiene ninguna, y las excepciones hay
  que recordarlas. «Nada se reubica solo, salvo al fusionar» es una frase que alguien tendrá
  que saber dentro de seis meses.

**Eligió con las dos delante.**

## EL OPERADOR ESTÁ CAMBIANDO SU PROPIA DECISIÓN ANTERIOR

Y esto se le dijo en el momento, no se descubrió después. El comentario de
`slideGridGeometry.js` documenta que la forma de pedir la fusión —marcar celdas en el mapa— la
eligió **él, contra la recomendación de la cabina**, con sus palabras dentro del código:
*«porque es lo más fácil de entender»*. La regla de la esquina superior izquierda vino con
aquella elección.

**Cambiar de opinión sobre la propia decisión es legítimo. Que el código siga diciendo lo
contrario, no.** Por eso el run ordena actualizar ese comentario: dejarlo afirmando lo que el
código ya no hace es peor que no haberlo escrito.

## LO QUE LA PARADA DE ANÁLISIS PRODUJO — y por qué se pagó sola

**La parada desmintió la mitad de la premisa del run.**

**LA REGLA B YA EXISTÍA**, y en las dos puertas: `describeSlideGridMerge` rechaza lo marcado
cuando cubre más de un componente, y el esquema comprueba colisiones **celda a celda** para que
un borrador que entre por «Insertar JSON» no se salte la regla.

**Y la versión anterior del texto del run decía que la regla B «puede invalidar borradores que
hoy son legales».** Era falso: no puede haberlos, porque las dos puertas llevan rechazándolos
desde que existen. **Se corrigió hacia adelante, dentro del propio run, sin reescribir hacia
atrás.**

Las otras tres respuestas: **una sola superficie** a tocar —la geometría del editor—; **no**
hace falta partir el run en contrato e interfaz, y la cabina retiró esa sospecha; y el
componente cae **en la esquina del rectángulo**, con **una sola respuesta para todos los
tipos**, porque la tabla de huella mínima sigue vacía.

**Si se hubiera encadenado el ticket sin pararse, un taller entero se habría gastado
redescubriéndolo.** Es la segunda vez que este mecanismo se usa y la segunda que desmiente la
premisa del run al que protege.

## LO QUE SIGUE ABIERTO Y NO ENTRA AQUÍ

- **Las pistas `1fr` no reparten en partes iguales** — nombrado en el cierre de `#108`, misma
  superficie, sin dueño.
- **El puesto del control «Espaciado título–párrafo»** en el formulario de Narrativa, que es
  derivación de la cabina y él no ha confirmado.
- **«Extra grande» vs «Muy grande»**, abierto desde la ronda 2 de `#108`.
