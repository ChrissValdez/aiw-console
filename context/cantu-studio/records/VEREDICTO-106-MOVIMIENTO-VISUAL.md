# VEREDICTO DEL OPERADOR — `#106` `RUN-CANTU-SLIDE-VISUAL-MOVE-001`

> **Recogido por la cabina el 2026-08-16.** El operador ejecutó la QA con la interfaz delante y
> adjuntó captura: rejilla con la celda abierta, la tarjeta «Punto clave», la barra de flechas
> en el borde inferior de la celda, y debajo del mapa el mensaje con el desplegable «Mover a…».

## SUS PALABRAS, VERBATIM

    ahi te va, mejoro si jala el sistema de flechitas pero se ve feo

    primero que nada abajo tiene un mensahe y un boton (dropdown) de mover a)
    hay que eliminarlo ese no aporta ndaa
    y iba a haber un boton de swap no se ha puesto pero podemos no ponerlo, no aporta nada
    mejor solo hay que arreglar el diseño de las flechitas

    quisiera que fueran como no en linea sino la flechita de arriba
    arriba
    a los lados izquierda y derecha
    Y abajo la dea abjo, simulando un control remoto

    en el centor del comopnente

## LECTURA DE LA CABINA — no es un fail, es un rediseño de forma

**El mecanismo funciona: «mejoró, sí jala el sistema de flechitas».** Lo que rechaza es la
**forma**, y una decisión de alcance.

1. **EL DESPLEGABLE SE ELIMINA, Y CON ÉL SU MENSAJE.** «no aporta nada». **Esto veta la decisión
   que el taller tomó midiendo** en el punto 3 del ticket anterior.
2. **EL BOTÓN DE INTERCAMBIO NO SE PONE.** Nunca existió; queda descartado antes de nacer.
3. **LAS CUATRO FLECHAS DEJAN DE IR EN LÍNEA Y PASAN A CRUZ** — arriba arriba, izquierda y
   derecha a los lados, abajo abajo, **«simulando un control remoto»**.
4. **LA CRUZ VA EN EL CENTRO DEL COMPONENTE**, no en el borde inferior de la celda.

## LO QUE SU VETO CUESTA, Y HAY QUE NOMBRÁRSELO — medido por el taller, no opinión

El taller **no** dejó el desplegable por inercia: lo midió. En una rejilla **2×2 con tres
componentes**, el de la primera celda tiene **las cuatro flechas apagadas** —sus tres vecinas
adyacentes están ocupadas— y sin embargo **`(2,2)` es un destino legal y libre**, en diagonal.

**Sin desplegable, y sin intercambio, ese movimiento se vuelve inalcanzable.** No es un caso de
laboratorio: la 2×2 es la rejilla más común.

**No se le discute la decisión: se le nombra el coste y se ejecuta lo que pidió.** El run
siguiente debe **medir cuántos movimientos quedan inalcanzables** y declararlo, para que el
operador lo sepa con números y no con una advertencia.

## LO QUE ESTE VEREDICTO NO ES

**No es un fail del run.** El objetivo —mover desde el mapa en vez del formulario— está
cumplido y él lo confirma. Es **corrección de forma dentro del alcance**, así que va como
**segunda ronda del mismo run** y **no** necesita D-061: no se amplía el alcance, se termina de
hacer bien lo encargado.
