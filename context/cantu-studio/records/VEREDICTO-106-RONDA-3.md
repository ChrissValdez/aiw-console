# VEREDICTO DEL OPERADOR — `#106`, ronda 3 (cruz de 28px + nombre debajo)

> **Recogido por la cabina el 2026-08-16.** Ejecutó la QA con captura: plantilla de 2 columnas
> × 1 fila, celda seleccionada, cruz centrada de 28px, y debajo «Punto clave / TARJETA»
> **pegado al borde izquierdo de la celda**.

## SUS PALABRAS, VERBATIM

    jala bien pero se ve mal que el texto se ponga orientado a  la izquierda de repetne deberia estar abajo de las flechas y centrado

## LECTURA DE LA CABINA

**«Jala bien»: el mecanismo, el tamaño de 28px y el umbral quedan aceptados.** Lo único que
rechaza es **la alineación del rótulo**.

**Lo que pide, y es una sola cosa:** el nombre y el tipo van **centrados bajo la cruz**, no
alineados a la izquierda de la celda.

**Su palabra «de repente» es la pista del defecto:** no le molesta que el texto esté a la
izquierda en abstracto —así estaba antes—, le molesta que **cambie de eje** respecto de la cruz
que tiene justo encima. Un elemento centrado con otro a bandera debajo se lee como dos cosas
sueltas en vez de un bloque.

## HIPÓTESIS DE LA CABINA, A VERIFICAR POR EL TALLER

El taller declaró en la ronda 3 que **«el rótulo se pinta en dos sitios desde un solo
componente, para que no puedan discrepar»**. Es probable que el componente compartido conserve
la alineación que tenía en su sitio original —donde estar a la izquierda era correcto— y que al
reutilizarlo bajo la cruz haya heredado esa alineación.

**Si es así, el arreglo no es tocar el componente compartido, sino que cada sitio declare su
alineación** — porque en el otro sitio la izquierda puede seguir siendo la correcta. **Que lo
mida antes de cambiar nada.**
