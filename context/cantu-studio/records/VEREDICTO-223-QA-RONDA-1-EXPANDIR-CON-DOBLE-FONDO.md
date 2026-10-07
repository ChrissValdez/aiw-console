# #223 · QA ronda 1 (parcial): «Expandir» trae un segundo fondo, y los márgenes no le bastan

**Fecha:** 2026-10-07 · **Run:** `#223` `RUN-CANTU-PREVIEW-IS-THE-PUBLISHED-PAGE-001`
«The editor's preview is the page the student sees» · sigue `active`.

---

## El veredicto, verbatim

> varias cosas, expandir dejo de jalar ahora tiene un segundo fondo
> Abrir vista
> si jala pero sigo viendolo giual con la badge arriba del titulo, con el los margenes no lo suficientemente grandes (margenes internos del fondo blanco=)

**Adjuntó dos capturas.** No se guardan aquí: son imágenes del chat. Lo que la cabina midió en ellas, píxel a
píxel, a las ~14:40 UTC:

1. **«Expandir»** (1 742 × 962, con el botón × de salir). Fondo del editor `#F1F5F9` hasta x = 165. Ahí empieza
   el marco del iframe, con borde y sombra, de 165 a 1 407 (~1 240 px: el tope `WEB_FULLSCREEN_FRAME_MAX_WIDTH`).
   Dentro, la banda gris de la página y su tarjeta blanca de 1 120 px (220-1 340). **Son dos marcos uno dentro
   del otro**: el del editor y el de la página. Es lo que él llama «un segundo fondo». La lección es «Operar con
   signos».
2. **«Abrir vista»** (1 817 × 946). La tarjeta blanca de 1 120 px centrada (309-1 429) con 60 px de margen
   interior, y la insignia «ARITMÉTICA» en su propio renglón, sobre el título. **Es la página publicada tal cual**,
   que es lo que el run entrega.

## Lo que significa

- **«Expandir»: defecto del run.** El taller lo dejó como no verificado. La página ya trae su propio fondo y su
  tarjeta, y el editor la sigue metiendo en su marco redondeado de 1 240 px. Va a una ronda 2 del mismo run: es la
  misma superficie y no cambia su identidad.
- **«dejo de jalar»: lectura de la cabina, no confirmada.** La captura muestra que Expandir abre. Se lee como «ya
  no se ve bien» por el doble fondo.
- **La insignia sobre el título: no es de este run.** Es la petición 13, `RUN-CANTU-THEME-BADGE-BESIDE-THE-TITLE-001`,
  que va después.
- **Los márgenes interiores (60 px) son los de la página PUBLICADA.** La vista previa ahora los copia, que era el
  encargo. Que no le basten es un cambio de diseño de todas las lecciones publicadas: no cabe en este run, que
  prohíbe cambiar un byte de lo publicado.
- **Sin respuesta en esta ronda:** el paso 2 (comparar con el WEB.html generado), el 3 (otros anchos) y el 4 (Slide).
