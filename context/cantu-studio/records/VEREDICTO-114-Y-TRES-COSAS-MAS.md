# VEREDICTO DEL OPERADOR — `#114`, y tres cosas más

> **Recogido por la cabina el 2026-08-17.** Cierra
> `RUN-CANTU-SLIDE-SIZE-SELECT-DROP-AUTOMATIC-DEFAULT-001` **con QA ejecutada**, y abre **un
> defecto nuevo, una corrección de diseño y una nota que pidió por escrito**.

## SUS PALABRAS, VERBATIM

    todo jalo, comentairo lista con etiquetas es un componente bloqueado no puedo verificar lo
    del tamaño de texto no puedo ni insertarlo
    pero en su propio run lo podemos revisar


    ahora surgio un error en portada

    dice
    Etiqueta opcional

    pero si dejo en blanco la etiqueta automaticamente me pone system showcase

    si la dejo en blanco me la debe de eliminar, sino no es opcional se llena sola y es un
    comportamiento erratico

    Admas Espaciado título–párrafo
    si aparece en narrativa, pero esta equivocado no debe de aparecer en narrativa sino en el
    titulo mismo

    sino tengo que crear ese campo en cada componente en vez de ponerlo una vez ahi

    otra cosa importante es que
    Narrativa, «Tamaño del texto»: SIGUE teniendo «Automático»,
    se que fue a proposito pero es iportante mencioanrlo para que se arregle en su debido momento
    y quede por escrito

## 1 · QUÉ APRUEBA — «todo jaló»

Los diez controles de la QA, **menos uno que no se podía ejecutar**: «Lista con etiquetas» es un
componente **contenido**, así que no se puede ni insertar. **El paso 6 era inverificable y la
cabina no lo vio al escribir la QA.** Se revisará en el run que levante ese componente.

**El paso 1 —la prueba de la regla nueva— pasó:** el encabezado se ve igual con «Mediano» que
como se veía con «Automático». **El re-anclado funcionó.**

## 2 · DEFECTO NUEVO — la etiqueta «opcional» de la Portada se rellena sola

**Medido por la cabina al recibirlo.** `renderTitleSlide.js:150`:

    const badgeText = data.badge || data.topic || 'SYSTEM SHOWCASE';

**Dejarla en blanco no la vacía: la rellena.** Primero con el tema de la lección; si no hay, con
ese literal. Y el corpus tiene lecciones cuyo tema **es** «System Showcase», así que lo que vio
es **la primera caída, no la segunda**.

**Su argumento es de contrato, no de gusto:** *«si la dejo en blanco me la debe de eliminar,
sino no es opcional se llena sola y es un comportamiento errático»*.

**Y no es un descuido: era diseño deliberado.** El editor documenta que sus textos de ayuda
«dicen el RESPALDO del motor para el campo vacío — tema como etiqueta». **El operador está
revocando esa decisión**, y eso es legítimo y hay que escribirlo así, no como si se hubiera
encontrado un error.

## 3 · CORRECCIÓN DE DISEÑO — el espaciado es del título de la DIAPOSITIVA

Se le preguntó entre tres lecturas y eligió: **el control vive en el encabezado de la
diapositiva, y Narrativa pierde el suyo.**

**Su razón, que es de arquitectura:** *«sino tengo que crear ese campo en cada componente en vez
de ponerlo una vez ahí»*.

**CONSECUENCIA QUE LA CABINA LE NOMBRÓ AL PREGUNTAR, Y ÉL ACEPTÓ:** eso lo hace **el mismo
control** que ya había pedido como separación bajo el título. **No son dos, es uno.** El run que
ya estaba abierto para esa separación absorbe la retirada del de Narrativa.

**Retirar `titleSpacing` de Narrativa es sustractivo y rompe contrato** — la misma clase de
operación que la descripción del gráfico. **Medido: hoy ningún borrador ni contenido elige
`titleSpacing`**, así que la retirada debería salir gratis. **Valor a verificar.**

## 4 · LA NOTA QUE PIDIÓ POR ESCRITO

*«se que fue a proposito pero es iportante mencioanrlo para que se arregle en su debido momento y
quede por escrito»*.

**Queda:** «Narrativa · texto» y «Lista con etiquetas · texto» **conservan «Automático»** porque
pintan 1,6rem y 1,25rem y **ninguno de los cuatro peldaños vale eso**. Su run es
`RUN-CANTU-SLIDE-BODY-TEXT-OWN-SCALES-001`, y **ya está en la cola, inmediatamente después del
que se cierra aquí**.

**Y su observación tiene una consecuencia de orden que la cabina no había visto:** si «Lista con
etiquetas» no se puede ni insertar, **la mitad de ese run no se puede revisar con la vista hasta
que se levante su contención**. Queda declarado en el run.

## 5 · LO QUE LA RONDA 2 ENTREGÓ

El control **nace sin la opción**; la escala del encabezado **se re-ancló** desplazando un
peldaño y añadiendo **un solo número nuevo**, con las dos mitades viajando juntas. **Las siete
superficies que entraron no mueven un píxel**, medido en navegador con las fuentes cargadas. Los
**4 borradores** que ganan la clave cambian **lo que se guarda, no lo que se pinta**.

**Trece pruebas previas se pusieron rojas haciendo su trabajo y se enmendaron con su nota.** La
más significativa fijaba `automatico = true` como defecto: **protegía el alcance de su run y a
la vez congelaba la fábrica de defectos.**

**Y se desmintió una acusación que llevaba tiempo escrita:** una nota de `tokens.js` decía que la
Portada «ROMPE UNA PROMESA». **La Portada no era la excepción: era la primera en cumplir la
regla** que ahora se generaliza.
