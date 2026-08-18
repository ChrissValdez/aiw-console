# `#113` — cierre con QA parcial, y el «Automático» que vuelve por tercera vez

> **Recogido por la cabina el 2026-08-17.** El operador no ejecutó los siete pasos de la QA:
> miró el control de tamaño, **reconoció un defecto que ya había pedido corregir antes**, y lo
> reportó.

## SUS PALABRAS, VERBATIM

    de nuevo me genero los 4 tamaños y el tamaño autoatmico

    el automatico no debe exisitr, automaticamente escoge mediano y pero no hay un boton extra
    de automatico pide la correccion y lleva tiempo este error

## TENÍA RAZÓN, Y SU QUEJA ANTERIOR ESTÁ DENTRO DEL CÓDIGO

Medido en `SlideSizeSelect.jsx`. La pidió en `RUN-CANTU-SLIDE-CARD-REPAIR-001`, y quedó citada
verbatim allí:

> «no deberia tener modo autmatico el tamaño del texto porque **NO ME DEJA SABER SI AUTOMATICO
> ES TAMAÑO MEDIANO, PEQUEÑO O GRANDE**; simplemente seleccionar un tamaño en automatico que en
> este caso seria mediano»

**Y aquel run entendió bien la razón, que es general:** «Automático» nombra un **mecanismo**; los
otros cuatro nombran una **talla**, y el autor está eligiendo talla.

## POR QUÉ VUELVE — no es un olvido, es el valor por defecto

Aquel run **acotó la reparación a propósito**, y lo dejó escrito:

> «ES UNA BANDERA Y NO UN BORRADO… `iconList` y `narrative` comparten este control y **NO se
> tocan** —su «Automático» sigue exactamente donde estaba— porque son otros componentes y son
> otros runs. **Quien apaga la opción es el llamador, uno por uno.**»

**El control nace con «Automático» encendido, así que cada control nuevo nace con el defecto.**
Estado medido el 2026-08-17:

| Superficie | Estado |
|---|---|
| Portada — sus tres tamaños | **apagado** |
| Tarjeta | **apagado** |
| Lista con etiquetas · Narrativa | **encendido** |
| El título del gráfico, de la ronda 3 de `#113` | **encendido** |

**Y otro fichero ya lo sabía:** `SlideTitleSlideEditor.jsx` registra que *«el operador ya rechazó
ese rótulo una vez con razón general»*. **Se sabía que la razón era general y aun así el defecto
quedó por defecto.**

## LA PARTE QUE ES DE LA CABINA, Y ES DIRECTA

**El ticket de la ronda 3 ordenó reproducirlo.** Decía: *««Automático» se conserva — es lo que lo
mantiene aditivo»*. El taller cumplió. **La cabina le mandó montar el defecto.**

Y es la misma familia de error que esta sesión lleva acumulando: **proteger una propiedad
—aquí la aditividad— con una regla que arrastra un daño que nadie volvió a mirar.**

## LA DECISIÓN DEL OPERADOR

Se le ofrecieron cuatro caminos. **Eligió: dar la vuelta al valor por defecto, en su propio
run.**

- El control **pasa a nacer sin «Automático»**; la opción sólo queda donde alguien la pida a
  propósito.
- Se apaga en los tres que faltan.
- **El próximo componente nace bien sin que nadie tenga que acordarse.**

**Descartó explícitamente** apagarlo sólo donde falta — que es **literalmente lo que se hizo la
vez anterior** y lo que produjo esta tercera aparición.

**LA CONSECUENCIA MEDIDA QUE VIAJA CON LA DECISIÓN:** apagarlo hace que el campo **deje de ser
aditivo** — al montar, el formulario escribe `medium` en el borrador. Para las escalas nuevas es
inocuo en pantalla, porque están ancladas en «Mediano = exactamente lo de hoy». **Para la
Tarjeta hay una discrepancia medida de 24 contra 24,8 px**, que el operador ya decidió en su
momento. **El run tiene orden de medirlo control por control y parar si alguno no cuadra.**

## CÓMO CERRÓ `#113` — CON QA PARCIAL, Y SE DECLARA

**LO QUE SÍ MIRÓ:** el control de tamaño del título del gráfico en el formulario. De ahí salió
el reporte.

**LO QUE QUEDA SIN MIRAR POR OJO HUMANO:**

- El gráfico de diapositiva **sin descripción**.
- Los **cuatro peldaños** lado a lado, y que «Mediano» se vea igual que «Automático».
- Los **dos gráficos del corpus** antes y después, con sus 67 px de encogido.
- **El gráfico de Web con su descripción intacta** — era el paso 5, con consecuencia de parada.
- **Que el control esté pegado al Título** y no al final — era el paso 6, con consecuencia de
  parada.
- La **Previa Real**.

**Lo verificado contra disco no depende de esos pasos:** Web 0 de 38 renders movidos, los 5
`video` conservan su descripción, los 5 ítems con descripción siguen validando, ausente pinta
byte a byte lo mismo que Mediano, y la fila 4 recupera de 0 a 55,7 px. **Todo remedido al
terminar la ronda 3.**

**Y es el NOVENO run consecutivo** cuya superficie visual sólo puede juzgar el ojo del operador.
El anterior también cerró con QA parcial: **son dos seguidos, y eso se nombra por la regla de
acumulación.**
