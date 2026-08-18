# VEREDICTO DEL OPERADOR — `#112`, el reparto de la rejilla

> **Recogido por la cabina el 2026-08-17.** Cierra
> `RUN-CANTU-SLIDE-GRID-ROW-HEIGHT-DISTRIBUTION-001` en dos rondas, y **abre dos peticiones
> nuevas que NO son de este run**.

## SUS PALABRAS, VERBATIM

    me agrada,  funciona bien pero quitemos la descripcion del grafico, no gtiene buena medida
    y es una lata darle mantenimietno prefiero que si quiero describir use la narrativa y ya


    adeams el titulo pongamos el tamaño con los posibles tamaños
    chico, mediano, grande muy grande
    pero la funcion del grid jalo como deberia

## QUÉ APRUEBA

**El reparto de la rejilla, que era el objeto del run.** Sus palabras: *«la función del grid
jaló como debería»* y *«funciona bien»*.

**Y con eso aprueba las dos decisiones que había tomado antes:** la puerta `min-height: 0` —con
sus 8 diapositivas moviéndose entre 14,6 y 35,2 px, que se le enseñaron por nombre— y el
desborde por encogido del gráfico, **que él había delegado en la cabina y la cabina recomendó
por números declarando que no podía verlo**. Lo vio en el paso 3 y no lo objetó.

**LO QUE NO CONSTA:** no dijo nada del **caso 4**, donde el dibujo se acota a **0 px** en cuatro
filas porque el armazón del componente se lleva unos 162 de los 185,7 disponibles. **Estaba en
la QA como paso con consecuencia de parada y no la disparó, pero tampoco lo mencionó.** Sigue
abierto y sigue siendo suyo.

## LAS DOS PETICIONES NUEVAS — y ninguna es de este run

### 1 · QUITAR LA DESCRIPCIÓN DEL GRÁFICO

Sus razones, y son de mantenimiento, no de estética: *«no tiene buena medida y es una lata darle
mantenimiento»*. Su alternativa ya existe: *«prefiero que si quiero describir use la narrativa y
ya»*.

**ES UN CAMBIO QUE ROMPE CONTRATO, y por eso no es trivial.** `SlideVisualItemSchema` es
**`.strict()`** — medido —, así que retirar el campo hace que **todo borrador que lo lleve deje
de validar**.

**Y el corpus lo usa.** Medido: `test_multimedia.js` tiene un `DATA_SVG` con
`caption: "Fig 1. Representación del Radio…"`. **La cabina NO tiene un recuento fiable de
cuántos más** — su sonda por expresión regular no distinguía bien los límites del ítem, y
publicar ese número habría sido la clase de falsedad que este proyecto lleva persiguiendo. **El
run tiene orden de contarlo con la herramienta correcta y PARAR si el número no es cero.**

**UNA COLISIÓN QUE HAY QUE NOMBRAR ANTES DE QUE MUERDA:** el componente **Video también tiene
`caption`**, en el mismo fichero — `DATA_VIDEO`. Es **otro campo de otro tipo** y **no entra en
esta petición**. Una retirada por nombre de campo en vez de por tipo se lo llevaría por delante.

### 2 · EL TÍTULO DEL GRÁFICO, CON LOS CUATRO PELDAÑOS

*«el titulo pongamos el tamaño con los posibles tamaños / chico, mediano, grande muy grande»*.

**Hay molde y no se inventa:** la escala del título de Narrativa se construyó en `#108` sobre el
patrón de `tokens.js`, y el formulario ya tiene la convención de **campo seguido de su control
de tamaño**, que el propio operador pidió.

## «MUY GRANDE», Y VA POR LA SEGUNDA VEZ

**El operador ha escrito «muy grande» DOS VECES** — en la ronda 2 de `#108` y ahora. La lista
compartida rotula ese peldaño **«Extra grande»**.

**Esto ya no es una discrepancia aislada: es un patrón.** Y el dato que lo hace decidible está
medido desde `#110`: dentro del propio proyecto **ya conviven los dos rótulos** — la lista del
Espaciador de Web dice **«Muy grande»** para el mismo valor, y hay una decisión anterior escrita
de que esa lista **no se toca ni se alinea**.

**Sigue sin resolverse a propósito**, porque cambiar `TEXT_SIZE_OPTIONS` mueve **Slide y Web a
la vez**. Pero la evidencia de que el rótulo que el operador usa es «Muy grande» **ya es doble**,
y eso se le dice.

## POR QUÉ NO SE ENMENDÓ `#112`

Su `run_id` es `GRID-ROW-HEIGHT-DISTRIBUTION` y su título habla del **reparto del alto de las
filas**. Retirar un campo del componente y darle una escala a su título **no es eso**. Cuando el
identificador describe el alcance y el alcance cambia, **el run se cierra y se abre otro**.

**Es la misma decisión que se tomó con `#110`, y la contraria a la de `#108`**, donde el
identificador decía «auditar e implementar Narrativa» y todo lo pedido seguía siendo eso.

## LO QUE LA RONDA 2 CORRIGIÓ, Y ES DE LAS BUENAS

**La formulación obvia del acotado era la mala.** `max-height: min(600px, 100%)` no añade una
cota: **sustituye** la barrera de 600 px y mete una circularidad de porcentaje que el navegador
resolvió a 635,6 px, **moviendo dos gráficos del corpus que nadie había aprobado mover**. Lo
escrito toca `height` y la barrera sigue intacta.

**Y un regalo que el run no se había propuesto:** «una fila vacía conserva su altura» —decisión
4 del contrato de rejilla— pasa de `316,4 / 199,2 / 199,2` a `238,3` en las tres. **Queda
cumplida sin condiciones.**
