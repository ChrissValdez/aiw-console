# Veredicto · `#238` RUN-CANTU-MATH-PROCEDURE-STEP-NOTES-CONTRACT-001 · QA ronda 2 · las pestañas pasan; el rojo se oscurece; el móvil se arregla

**2026-10-09.**

## Vehículo

- **Borrador:** el mismo montado en la ronda 1, `qa_cabina/qa_2026_10_09/dos_notas_por_paso_el_contrato`, con
  `start-editor` reiniciado.
- **En el chat:** las capturas `WEB.R2.3-error-comun-abierta.png` y `WEB.R2.7-movil-375.png`.
- **Señalado por la cabina en la captura del móvil:** con «Ver cálculo» abierta, la pestaña de «Error común» queda
  entre la de «Ver cálculo» y su panel, y la fórmula se corta en «4 − 9 =».

## Corrección de la cabina, publicada al operador

«El texto oscuro de `res`» que ofreció la ronda 1 no es verde: es `#1E293B`, gris pizarra, el `text` de todos los
tokens. Lo contradijo el taller. El verde se obtuvo oscureciendo el acento hasta 4,55:1, sin cambiar el tono
(`#A3BE8C` → `#5E7A45`).

## Las respuestas del operador, verbatim (componente de preguntas; las preguntas las redactó la cabina)

1. **«#238 · Las pestañas en el editor: ¿una sola abierta a la vez, a todo lo ancho, y la segunda pulsación la cierra?»**
   → «Pasa»
2. **«#238 · El rojo de «✖ Incorrecto:» mide 3,85:1, también por debajo del mínimo. ¿Lo oscurecemos igual que el verde?»**
   → «Sí, igual que el verde (Recomendado)»
3. **«#238 · En el móvil la pestaña de «Error común» queda entre «Ver cálculo» y su panel, y la fórmula se corta. ¿Lo arreglamos?»**
   → «se ve mal como se corta con error comun la nota deberia venir error comun abajo del contenido de vercaluclo no en medio»
4. **«#238 · En navegadores viejos (anteriores a Chrome 131 o Safari 18.4) las notas salen plegadas una debajo de otra, sin pestañas. ¿Vale?»**
   → «Vale así (Recomendado)»

## Lo que se sigue (ronda 3 del `#238`)

- **El rojo** se oscurece con la misma regla que el verde (el taller lo calculó en `#B9515B`, 4,50:1).
- **En lo estrecho** (móvil y «Diseño de página» angosto), el panel de «Ver cálculo» va justo debajo de su pestaña,
  y la pestaña «Error común» va **debajo de ese contenido**, no en medio. La fórmula no se corta.
- **Lo ancho no cambia:** las pestañas pasan.
