# #220 · La decisión del operador: el arreglo es de la migración, y las siete etiquetas vuelven

**Fecha:** 2026-10-03 · **Run:** `#220` `RUN-CANTU-WEB-HIERARCHY-TAG-DROPPED-001`
«The hierarchy's published labels are silently dropped» · **Cerrado** `active → completed`,
**absorbido por** `#222` `RUN-CANTU-HANDWRITTEN-LESSONS-MIGRATION-001`.

---

## La decisión, verbatim

> vamos con tu recomendacion

**Es una aceptación de las tres recomendaciones de la cabina, no una elección redactada por él.**
Se marca así (trampa H): es un acuerdo sobre opciones que la cabina dibujó, no una medición. Las
opciones sí estaban medidas por el taller del `#220` antes de preguntárselas, y se le preguntó por la
PREFERENCIA, no por un hecho de pantalla.

Lo que se le preguntó, con lo que recomendó la cabina y por tanto eligió:

1. **¿Dónde se arregla?** — **B: lo arregla la migración (`#222`)**, no el motor Web. El `#220` se
   cierra absorbido, como prevé su propio texto. Descartado A (el motor Web vuelve a leer `tag` como
   alias): dejaba dos nombres para lo mismo, re-fijaba 3 árboles y cambiaba el sandbox cuya paridad
   aprobó en junio (PASS-4D-I2B2R).
2. **¿Qué hace la migración con las 7 etiquetas de L1?** — **1: se recuperan** (`tag` → `badge`).
   Vuelven a verse UNIVERSO, RECTA REAL, FRACCIONES, DISCRETOS, CONTEO, ABSTRACTO e INFINITOS, como
   se veían hasta el commit `18f2e304` del 2026-02-11. Es **el único cambio visible** que la `#222`
   queda autorizada a hacer en lo que ve el alumno. Descartado 2 (borrarlas): no cambiaba la vista,
   pero eliminaba siete textos del autor.
3. **¿Guarda en la migración?** — **Sí.** Falla si un nodo de jerarquía de una lección del carril Web
   lleva `tag` sin `badge`. El sandbox (`test_hierarchy.js` y su agregador `showcase_library.js`) se
   queda como está, como excepción **por su causa**, nunca por lista.

## De qué medición sale

`cantu-studio`: `QA/temp/RUN-CANTU-WEB-HIERARCHY-TAG-DROPPED-001/99-REPORTE.md`, §2 (el hecho:
7 nodos, 0/7 etiquetas en Web y Moodle), §5 (la historia: el motor Web leía `node.tag || node.badge`
desde `c9f920d0`, 2026-01-10, hasta `18f2e304`, 2026-02-11), §7 (los caminos). La historia la
verificó la cabina el 2026-10-03 corriendo una copia del guion desde `_scratch`: salida idéntica.

## Lo que queda nombrado y sin run

- La referencia `docs/reference/REFERENCE-SLIDE-WEB-COMPONENT-MAPPING.md:333-334` afirma lo contrario
  del código (H1 del reporte).
- El comentario «A. WEB (Mantiene badges…)» de `test_hierarchy.js:94` es falso desde febrero (H2).
- Los dos gemelos del esquema responden distinto a `tag` (H3).
- El taller **sí puede leer** `../cantu-lessons` (H4), contra lo que decían el `#216` y la `#222`.
  La `#222` se enmienda para decirlo.
