# #218 · QA de pantalla, primera pasada: 2 de 4 como se esperaba, y dos peticiones nuevas

**Fecha:** 2026-09-30 · **Run:** `#218` `RUN-CANTU-WEB-STEP-DETAILS-AND-RULE-FORMAT-THROUGH-COMPILER-001`
«Web step details and rule descriptions take the published format, through the schema and the compiler together» · sigue `active`.

**Veredicto PARCIAL.** Los pasos 1 y 2 no dieron lo esperado, y la causa está por confirmar con el
operador (ver abajo). No se cierra el run.

---

## Lo que el operador escribió, verbatim

> 1. lo isnerte, se inserto pero en vista previa dice:   No se pudo generar la vista previa Web
> Fallo de validación para Preview Real Web
>
> El bloque 1 tiene campos faltantes
>
>
> 2. mismo error dice: No se pudo generar la vista previa Web
> Fallo de validación para Preview Real Web
>
> Los bloques 1 y 2 tienen campos faltantes.
>
>
> ahora otro problema que note, no me marca que campo itene el error
> agregalo al roadmap un run para esto
>
> agregalo al final, no es algo urgente pero si es relevante
>
> el 3 dice:
> No se insertó nada. Corrige y reintenta:
> Bloque 1 (timeline) — steps.0.details: El fragmento acaba con etiquetas abiertas: <div>. Una etiqueta sin cerrar se traga los bloques siguientes de la leccion.
> Bloque 2 (rule) — description: La descripcion no puede incluir scripts, eventos ni URLs peligrosas (el formato <b>, <strong>, <br> y <div> si se admite)
>
> no se inserto:
> el cuatro se inserto y jalo pero el timeline se ve horrible, creo que es porque dejaste las formulas vacias entonces en vez de marcar error, lo compilo mal amontonado
>
> ahi deberia bloquearlo o vista previa marcarlo como campo obligatorio, lo que sea menos costoso

## Lectura de la cabina, paso a paso

| paso | resultado | lectura |
|---|---|---|
| 1 | el editor lo acepta; la vista previa falla con «Fallo de validación para Preview Real Web» | **no pasa todavía**. Ese texto sale de `server.js:1241`: es el **esquema del servidor** rechazando el borrador. La hoja predecía este síntoma para un servidor sin reiniciar |
| 2 | igual que el 1 | igual que el 1 |
| 3 | las dos líneas rojas, idénticas a lo prometido | **pasa** |
| 4 | entra y se pinta; el procedimiento sale «amontonado» | **pasa** en lo que el paso medía (lo que no lleva formato sale igual que antes). Lo amontonado es otra cosa: pasos sin fórmula (ver abajo) |

**Medición de la cabina, 2026-09-30 ~07:50 UTC.** Levantó el `server.js` del código commiteado
(`64fe655b`) en un puerto propio y pasó la hoja tal cual: pasos 1, 2 y 4 responden **HTTP 200** en
`/api/preview/web/render`. Con el código actual la vista previa se genera. El patrón visto
(falla lo que lleva formato y pasa lo que no) es el de un servidor que sigue con el esquema viejo.
**No está confirmado**: se le pregunta al operador qué hizo antes de pegar.

## Las dos peticiones nuevas

1. **«no me marca que campo itene el error»**: la vista previa dice «El bloque N tiene campos
   faltantes» sin nombrar el campo. Pedido como run **al final de la cola**, «no es algo urgente pero
   si es relevante».
2. **Pasos del «Procedimiento matemático» sin fórmula**: se compilan «mal amontonado» en vez de
   avisar. «bloquearlo o vista previa marcarlo como campo obligatorio, lo que sea menos costoso».

La cabina los mete **en el mismo run**, porque los dos son el aviso de la vista previa sobre un campo
que falta, y declara la agrupación.
