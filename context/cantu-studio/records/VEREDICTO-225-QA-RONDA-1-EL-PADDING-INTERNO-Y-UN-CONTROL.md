# #225 (y #224) · QA ronda 1: el padding exterior sobra, el interno es el problema, y quiere un control

**Fecha:** 2026-10-07 · **Runs:** `RUN-CANTU-LESSON-PAGE-BREATHING-ROOM-001` (`#225`, `active`) y
`RUN-CANTU-PREVIEW-PANEL-OPENS-AT-ITS-WIDTH-001` (`#224`, `active`).

## El veredicto, verbatim

> varias cosas que noto primero agregaste padding exterior al cuadro blanco :
> ahi no aporta nada ese padding exterior porque tengo espacio limitado y cuando expando la ventana tiene un monto nde espacio con el fondo gris
>
> el problema es el padding interno
> Segundo la badge sigue viendose arriba del titulo
>
> tercero no quiero hacer QA con la consola me quita mucho tiempo
>
> intentemos agregar el boton  necesario para cambiar esas cosas y sobre eso definri esto

**Adjuntó una captura:** la vista previa Web de «Qué es cada número» en el panel, a unos 887 px. Se ven la banda gris
alrededor de la tarjeta blanca, la tarjeta con su margen interior, y la insignia «ARITMÉTICA» en su propio renglón,
encima del título.

## Lo que significa (lectura de la cabina)

- **La banda gris exterior no la añadió nadie ahora.** Es la `body{padding:40px}` de la página publicada. La vista
  previa la muestra desde el `#223`, que era su encargo. Que «no aporta nada» es una decisión de diseño sobre la
  página publicada, y entra en el `#225` por D-061: lo pide él por escrito, cae sobre la superficie que se revisó y no
  cambia la identidad del run.
- **«Cuando expando la ventana tiene un montón de espacio con el fondo gris»:** es el ancho máximo de la tarjeta
  (1 000 px de texto más 120 de margen). También entra en el `#225`.
- **«El problema es el padding interno»:** confirma la queja de la ronda 1 del `#223`.
- **La insignia:** es la petición 13, `RUN-CANTU-THEME-BADGE-BESIDE-THE-TITLE-001`. Se adelanta a justo después del
  `#225`.
- **«No quiero hacer QA con la consola»:** el paso 0 de la QA del `#224` le pedía borrar una clave desde DevTools.
  Queda prohibido como forma de QA.
- **«Agregar el botón necesario para cambiar esas cosas y sobre eso definir esto»:** la cabina lo lee como un control
  en la vista previa del editor. Con él mueve en vivo la banda exterior, el margen interior, el espacio antes del
  título, el ancho máximo y la posición de la insignia, y elige ahí las cifras. A eso se suma un botón para
  restablecer el ancho del panel. Va a un run nuevo del carril del editor.
- **Las seis preguntas de la hoja del `#225` y las seis del ADR-007 (`RUN-CANTU-HIGHLIGHTED-BLOCKS-SHARED-CONTRACT-001`) siguen sin respuesta.**
