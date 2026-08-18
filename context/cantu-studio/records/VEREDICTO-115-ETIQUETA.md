# VEREDICTO DEL OPERADOR — `#115`, la etiqueta opcional de la Portada

> **Recogido por la cabina el 2026-08-18.** Cierra
> `RUN-CANTU-TITLE-SLIDE-OPTIONAL-BADGE-STAYS-EMPTY-001` en dos rondas.

## SUS PALABRAS, VERBATIM

    ya lo revise y se corrijio doy el pass

## LO QUE DECIDIÓ, Y ES LO QUE HIZO BARATO EL RUN

Tres decisiones, con las mediciones delante:

1. **Las 33 portadas se MIGRAN** — se les escribe el tema que ya pintaban.
2. **El literal `'SYSTEM SHOWCASE'` MUERE.**
3. **La siembra del editor SE QUEDA.**

**La distinción que deshizo el nudo salió de la quinta puerta que encontró la ronda 1:**
`blockFactory` siembra la etiqueta con el tema, **y eso lo pidió el operador**, citado verbatim
allí — *«que agarre el nombre del tema para el badge como default, igual es editable es solo el
prellando»*.

- **La siembra** escribe un valor **real, visible y borrable**. Borrarlo significa vacío.
- **La caída del motor** pintaba lo que el campo **no decía**.

**No eran la misma cosa y no murieron juntas.** Sin esa lectura, el run habría matado también
una petición suya.

**Y la migración disolvió las dos paradas a la vez:** las 33 siguen pintando lo mismo, y el
desplazamiento de la Portada queda **sólo para las que el autor vacíe a propósito**, que es
justo cuando debe ocurrir.

## LO QUE LA RONDA 1 APORTÓ, Y ERA LO QUE DECIDÍA

**Confirmó que el operador veía la caída al TEMA, no al literal** — y añadió lo que nadie había
visto: **son indistinguibles en pantalla** porque la hoja declara versales. **Arreglar sólo el
literal no habría cambiado un píxel de lo que él ve.**

**Y lo reprodujo en el disco propio del operador**, no sólo en el corpus: dos lecciones de
`cantu-lessons` con ese tema y sin etiqueta.

**Paró sin escribir ni las guardas**, deliberadamente, porque escribirlas habría fijado una
decisión que él no había tomado. **Fue lo correcto.**

## LA VERIFICACIÓN QUE VALE MÁS QUE EL CÓDIGO

**Las 38 portadas se compararon contra los árboles fijados del repositorio** —la salida
**anterior** al run— y no contra la propia salida del taller. **38/38 coinciden, 0
discrepancias.** Árboles movidos: **22 → 0**, y **0 de 38** en Web.

**El dato migrado no quedó en versales**: se guardó `System Showcase`, no `SYSTEM SHOWCASE`. Era
el cambio invisible que había que impedir, y **tiene guarda que lo mide sobre el fichero**.

**Siete guardas, las siete rojas por mutación y restauradas**, comprobando además que **cae la
que toca y no otra**. Una esquiva una trampa real: el comentario del motor **cita el literal**
para dejar escrito qué decía, así que la guarda despoja comentarios y mide el código.

## DEFECTO DEL TICKET DE LA CABINA — el cuarto de la sesión

**El criterio E pedía escribir dentro de `blockFactory` por qué se queda la siembra, y el
`Scope` y el `Out of scope` decían no tocarlo.** Órdenes incompatibles otra vez.

**El taller respetó el alcance** y lo escribió en la QA y en dos guardas que fijan la siembra y
la protegen de que alguien la retire «por coherencia». **Fue la lectura correcta**, y lo dejó
dicho en vez de resolverlo por su cuenta.

## LO QUE QUEDA ABIERTO DE ESTE RUN

- **Una etiqueta de sólo espacios sigue pintando una píldora vacía.** Es inalcanzable desde el
  editor porque el compilador recorta; sólo llega por contenido escrito a mano. **Cuesta un
  `trim` y mueve 0 árboles — medido.** El ticket enumeró qué muere y esto no estaba, así que el
  taller **no lo decidió**.
- **El desplazamiento no es un número fijo:** es `(alto de la etiqueta + 32) / 2`, y el navegador
  ajusta ese alto al píxel de la pantalla — **46,60 px al 100 %, 47,20 px al 125 %**. La QA lo
  dice como fórmula en vez de fijar una cifra que el operador mediría distinta.
- **Tres textos fuera de alcance quedaron falsos y nombrados**, sin tocar.
