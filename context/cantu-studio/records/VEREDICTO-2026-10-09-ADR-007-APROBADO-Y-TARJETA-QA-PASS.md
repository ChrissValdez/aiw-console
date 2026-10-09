# Veredicto · 2026-10-09 · ADR-007 aprobado, QA de la Tarjeta en verde, y el panel sin probar

**Hilo:** `cantu-studio`. Las tres preguntas se hicieron con el componente de preguntas, después de que el operador
dijera, verbatim: «no estoy entedniendo que te falta para avanzar».

## Las respuestas, verbatim (la opción que eligió)

1. **ADR del contrato común** (`RUN-CANTU-HIGHLIGHTED-BLOCKS-SHARED-CONTRACT-001`, ronda 2): «Sí, apruebo
   (Recomendado)». Aprueba las 9 recomendaciones del §11 del ADR-007. La 8, el arreglo de `legacyDocsPathSweep`
   para que no confunda las rutas de Lecciones con las de Studio, la hace un taller, no la cabina.
2. **La Tarjeta** (`RUN-CANTU-CARD-INNER-BOX-CONTRACT-001`), parte A del borrador `qa_cabina/.../tarjeta_y_aire`:
   «Sí, se ve bien». Responde a la pregunta: «¿la insignia dice 2n en minúscula, «cero» va en negrita y los recuadros
   «Forma general» salen azul y verde?».
3. **El panel** (`RUN-CANTU-PREVIEW-PANEL-OPENS-AT-ITS-WIDTH-001`): «Aún no lo he probado». Sigue `active`.

## Lo que añadió después, verbatim, con una captura

> mira como en al lado del titulo cuando agrando se ve el titulo, la badge y el primer parrafo en tres colkumnas en vez como deberia titulo y badge solamente en la primera linea

**Es el defecto ya registrado** en `VEREDICTO-225-QA-RONDA-1-EL-CONTROL-DEL-AIRE.md`. En la captura, el «primer
párrafo» es el subtítulo de la lección. Lo corrige `RUN-CANTU-PAGE-DESIGN-CONTRACT-001` (punto 3 de su texto), que
está `active` y todavía sin taller.
