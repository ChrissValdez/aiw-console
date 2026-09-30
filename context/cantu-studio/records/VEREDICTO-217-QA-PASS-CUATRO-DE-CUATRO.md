# #217 · La QA de pantalla del operador: los cuatro pasos, tal como se esperaban

**Fecha:** 2026-09-30 · **Run:** `#217` `RUN-CANTU-WEB-PROSE-GATE-STEP-DETAILS-AND-UNCLOSED-COMMENT-001`
«Web step details and rule descriptions take the published format, and an unclosed comment stops passing the gate» · **Cerrado** `active → completed`.

Primera QA que se le dio **completa en el chat**, por su regla del mismo día. Cada paso llevaba el JSON
para pegar, lo que tenía que ver y el formato de respuesta. El operador no contestó con SÍ/NO: **pegó
lo que vio en cada paso**, que es mejor evidencia.

---

## Lo que el operador vio, verbatim

**Paso 1 · Web, comentario sin cerrar en un texto**

> No se insertó nada. Corrige y reintenta:
>
> * Bloque 1 (narrative) — text: El texto no puede incluir HTML, scripts, eventos o URLs peligrosas

**Paso 2 · Slide, el mismo comentario en una nota**

> No se insertó nada. Corrige y reintenta:
> Bloque 1 (columnsSlide) — items.0.content: El contenido no puede incluir scripts, eventos ni URLs peligrosas (el formato <b>, <strong>, <br> y <div> si se admite)

**Paso 3 · Web, su nota «Error Común: Doble Signo» sigue entrando**

> 1 bloque insertado al final del flujo Web.

**Paso 4 · Web, su procedimiento y su regla siguen sin entrar**

> No se insertó nada. Corrige y reintenta:
>
> * Bloque 1 (timeline) — steps.1.details: El detalle no puede incluir HTML, scripts, eventos, URLs peligrosas, Markdown o rich text
> * Bloque 1 (timeline) — steps.2.details: El detalle no puede incluir HTML, scripts, eventos, URLs peligrosas, Markdown o rich text
> * Bloque 1 (timeline) — steps.3.details: El detalle no puede incluir HTML, scripts, eventos, URLs peligrosas, Markdown o rich text
> * Bloque 1 (timeline) — steps.4.details: El detalle no puede incluir HTML, scripts, eventos, URLs peligrosas, Markdown o rich text
> * Bloque 1 (timeline) — steps.5.details: El detalle no puede incluir HTML, scripts, eventos, URLs peligrosas, Markdown o rich text
> * Bloque 2 (rule) — description: La descripcion no puede incluir HTML, scripts, eventos o URLs peligrosas

## La lectura de la cabina, paso a paso

| paso | se esperaba | vio | |
|---|---|---|---|
| 1 | recuadro rojo con la línea de `narrative · text` | idéntica | **pasa** |
| 2 | recuadro rojo con la línea de `columnsSlide · items.0.content` | idéntica | **pasa** |
| 3 | la ventana se cierra y la nota aparece al final | «1 bloque insertado al final del flujo Web.» | **pasa**: es el aviso del editor de que el bloque entró al final. La hoja no lo había escrito literal |
| 4 | seis líneas rojas: cinco `steps.N.details` y una `rule · description` | las seis, idénticas | **pasa**: lo parado sigue parado, y lo resuelve el `#218` |

**El paso 3 dejó un bloque de prueba en su lección de Web.** Se le pidió borrarlo o no guardar; no
consta cuál de las dos hizo.
