# DECISIÓN — el color del paso de «Procedimiento matemático», y sus tres mandos

> Tomada por **Christopher Valdez Cantu** el **2026-08-26**, mirando la previa de la QA de
> `#134`. Se guarda porque es una decisión de diseño del operador, y las decisiones de diseño
> se guardan como un veredicto: con sus palabras.

---

## LO QUE ÉL VIO

En «Procedimiento matemático», el **paso 1**. Sus palabras, verbatim:

> *«en el procedimiento en el paso 1*
> *hizo algo raro me la puso de ese color y el color del numero de paso es oscuro que no*
> *combina con ese color, lo que me hace pensar*
>
> *TEnemos que agregar el color del paso y podemos usar como referencia como definirlo sobre*
> *regla matematica*
>
> *tiene color*
> *color del titulo (que en color de titulo tiene 4 opciones, automatico, blanco, negro y*
> *personalizado - con color picker el personalizado)*
>
> *aca podria ser*
> *color*
> *color titulo y color numero de paso*
>
> *y los ultimos dos tener las mismas opciones blanco, negro y personalizado*
> *y que automaticamente escoga blanco para colores oscuros de fondo y negro para claros*
> *simplemente que ahga la seleccion automatica*
>
> *eso es lo que se me ocurre para arreglar esto*
> *lo demas jalo ya con este json»*

**Y dijo también lo que SÍ funcionó:** con el payload derivado de la fábrica, todo lo demás de
la QA de `#134` pasó. Éste es el único hallazgo.

---

## EL DISEÑO QUE PIDE — tres mandos, y el modelo ya existe

«Regla matemática» —`split`— es la referencia explícita del operador. Monta hoy
`ColorTokenOrCustomField` (`SlideSplitFields.jsx:475`), la misma pieza interior que ya usan la
Tarjeta, la Nota, «Jerarquía», «Anatomía de fórmula», la Tabla y la Portada.

Para «Procedimiento matemático» pide **tres**:

| mando | qué pinta | opciones |
|---|---|---|
| **Color** | el acento del paso | la paleta global + personalizado |
| **Color del título** | el rótulo del paso | Automático · Blanco · Negro · Personalizado |
| **Color del número de paso** | la tinta de la insignia | Automático · Blanco · Negro · Personalizado |

**Y «Automático» tiene que ser LISTO, no ausente:** blanco sobre fondos oscuros, negro sobre
claros. Eso es lo que hoy hace mal.

---

## LO QUE LA CABINA MIDIÓ, Y ES LO QUE MÁS PESA

**`#134` PROMETIÓ ESTO EN SU PROPIO TEXTO Y NO LO ENTREGÓ.** El `full_description` del run lo
nombra el primero de los pendientes que «ya se acumulan esperando este run»:

> *«EL COLOR DEL PASO de «Procedimiento matemático» — su acento sale de `variantMap`
> (renderStackSlide.js:265), un mapa CERRADO de siete tokens. #135 montó el color de la NOTA
> porque tenía punto de inyección propio; el del PASO no.»*

Y el propio editor lo dice en su cabecera (`SlideStackEditor.jsx:108`): el componente
**«carece de canal»**, su acento sale de `variantMap`, «una tabla privada de siete tokens».

**El lote 1 arregló la TINTA de la insignia y NO abrió el CANAL del color.** Son dos cosas
distintas y sólo se hizo una. Medido en `renderStackSlide.js:336-395`: la tinta se resuelve por
`accentTextColor` o por `resolveVariantInk`, y ninguna de las dos da al autor un mando.

**Es el patrón que este proyecto lleva encontrando toda la semana:** capacidad en el motor,
cerrada en el esquema. Aquí ni siquiera está en el motor: el mapa es cerrado.

## POR QUÉ EL NÚMERO SALE OSCURO Y NO COMBINA

La tinta se deriva con umbral **3:1**, el de texto grande de la WCAG, y se declaró así en el
lote 1. Sobre un acento de tono medio —el `def` de la paleta, `#9B6FA5`— la derivación elige
oscuro y **despeja el umbral sin quedar bien**. Pasar el umbral y combinar no son lo mismo, y
el operador está juzgando lo segundo, que es lo que sólo el ojo ve.

---

## LO QUE ESTO ABRE, Y ES DEL OPERADOR DECIDIR

`#134` se llama «Make the author palette win over the engine fixed colour tables». **Un paso
cuyo color el autor no puede elegir es exactamente una tabla fija del motor ganándole a la
paleta.** Así que esto cae dentro del título del run, no fuera.

Criterio de borrado: la sustituye una decisión que retire alguno de los tres mandos, que cambie
el juego de opciones, o que traslade la selección automática a un umbral distinto del de
contraste.
