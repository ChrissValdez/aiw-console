# #218 · QA de pantalla, segunda pasada: pass, tras reiniciar el servidor

**Fecha:** 2026-09-30 · **Run:** `#218` `RUN-CANTU-WEB-STEP-DETAILS-AND-RULE-FORMAT-THROUGH-COMPILER-001`
«Web step details and rule descriptions take the published format, through the schema and the compiler together» · **Cerrado** `active → completed`.

Sigue a `VEREDICTO-218-QA-RONDA-1-PARCIAL.md`. Allí los pasos 1 y 2 fallaban en la vista previa.

---

## Lo que el operador escribió, verbatim

> despuesa de este run, quiero hacer handsoff, dicho esto voyu a reiniciar el servidor y volver a hacer la prueba
>
> 1 y 2 jalaron y se ve bien, se insertaron correctamente
>
> el tres me marco esto:
> No se insertó nada. Corrige y reintenta:
> Bloque 1 (timeline) — steps.0.details: El fragmento acaba con etiquetas abiertas: <div>. Una etiqueta sin cerrar se traga los bloques siguientes de la leccion.
> Bloque 2 (rule) — description: La descripcion no puede incluir scripts, eventos ni URLs peligrosas (el formato <b>, <strong>, <br> y <div> si se admite)
>
> Y no se inserto
> Cuatro mismo problema, se inserta pero como tiene las formulas vacias se compila y se ve horrible
> se ve en vista previa amontonado, el problema no es que este vacio, el problema es que la seccion de la formula al estar vacia (la secccion con fondo gris) no se pone, si se pusiera no habria tanto problema)

## Lectura de la cabina

| paso | resultado | |
|---|---|---|
| 1 | tras reiniciar el servidor, «jalaron y se ve bien» | **pasa** |
| 2 | igual | **pasa** |
| 3 | las dos líneas rojas, idénticas a lo prometido | **pasa** |
| 4 | lo que no lleva formato sale igual que antes | **pasa** en lo que el paso medía |

**La causa de la ronda 1 queda confirmada por el propio operador:** el servidor no se había
reiniciado. La hoja lo decía como obligatorio y la cabina lo repitió en el chat. Aun así se saltó, y
la regla de reiniciar el servidor antes de una QA que toque el compilador sigue siendo necesaria.

**Detalle por paso de los pasos 1 y 2:** «jalaron y se ve bien», sin describir cada punto de «Tienes
que ver». Se acepta como aprobación del conjunto de esos dos pasos, y queda escrito que no hay más
detalle.

## Lo que corrige de la petición del `#227`

Sobre el paso 4, el operador precisó el mecanismo: **«el problema no es que este vacio, el problema es
que la seccion de la formula al estar vacia (la secccion con fondo gris) no se pone»**. La cabina lo
midió contra el motor el mismo día: `src/builders/web/partials/renderTimeline.js:101` declara
`.cs-card.no-math { grid-template-columns: 1fr; }` y `:126` hace lo mismo con el resultado. Sin
fórmula, el motor **quita a propósito** el panel gris y la tarjeta ocupa una sola columna. El
`#227` se enmienda con esto.
