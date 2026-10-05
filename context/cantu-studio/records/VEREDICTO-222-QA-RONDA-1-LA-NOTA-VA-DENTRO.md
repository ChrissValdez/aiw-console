# #222 · QA ronda 1 (parcial): la nota va DENTRO de la tarjeta

**Fecha:** 2026-10-05 · **Run:** `#222` `RUN-CANTU-HIGHLIGHT-NOTE-BESIDE-THE-CARD-001`
«A highlighted note sits beside the card on the L01 script, and its title stops uppercasing formulas» ·
sigue `active`.

---

## El veredicto, verbatim

> paso 2:
> No se insertó nada. Corrige y reintenta:
>
> * Bloque 1 (columnsSlide): Invalid input
>
> paso 3:
> si aparece la nota abajo de la tarjeta
> pero eso no  es lo qu queria, no entiendo lo que queria es que la nota destacada estuviera adentro de la tarjeta
> asi:
> como en el archivo que te mande la clasiifcacion binaria estaba intentando reproducir eso, pero con componentes validos en cantu studio por eso ocupaba nota destacada dentro de una tarjeta

**Adjuntó** `L02_Web_Valor_Absoluto.WEB.html` (60 773 caracteres). **Ese fichero no contiene «Clasificación
binaria»**: lo midió la cabina. La referencia a la que se refiere es, por sus palabras, la «Clasificación binaria»
de `cantu-studio/src/content/staging/Aritmetica/L01_Web_Clasificacion_Numerica.js` (~líneas 66-88). Ahí cada
tarjeta lleva dentro un recuadro con borde lateral de color, título «Forma General: \(2n\)» y una línea de texto,
escrito como HTML crudo en `card.content`.

**Sin respuesta en esta ronda:** pasos 0, 1 y 4.

## Lo que significa

1. **Paso 3: el operador RECHAZA la forma B para L01.** Es la PARADA que el propio run preveía (su
   `full_description`: «if, seeing it, he rejects form B for this case, that is a result -- STOP AND REPORT,
   and the form goes back to him»).
2. **Esto revoca, para este caso, el encuadre del `#221`.** El operador eligió la forma B el 2026-10-04 con
   «vamos con tus recomendaciones», aceptando opciones que dibujó la cabina. Al verla en pantalla, no era lo
   que quería. Es la trampa (H) del prompt de la cabina: un «sí» a una opción redactada por la cabina es un
   acuerdo sobre un relato, no una medición. El hilo LECCIONES había pedido la nota DENTRO tres veces
   (2026-09-18, 09-19 y 10-03), y la cabina le comunicó la forma B como decisión.
3. **Paso 2: NO es un defecto del run.** La cabina reprodujo el error a las 23:47 UTC con la función real de
   «Insertar JSON» (`parseAndValidateBlocks`). El mismo JSON da `ok` en el carril Slide y exactamente
   «Bloque 1 (columnsSlide): Invalid input» en el carril Web. Se pegó con «Web» activo. **Hallazgo:** el mensaje
   no dice que el bloque es de Diapositiva y se está en Web. Es la familia de
   `RUN-CANTU-EDITOR-PREVIEW-NAMES-THE-FAILING-FIELD-001`.
