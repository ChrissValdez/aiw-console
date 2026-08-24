# VEREDICTO DE QA — `#134` «Procedimiento matemático»

> Recogido por la cabina el **2026-08-23**. El operador es Christopher Valdez Cantu.
> **Es la PRIMERA QA real de este run**, y llegó después de cerrarlo: su `closeout` ya
> declaraba que cerraba sin QA visual. Salió de la prueba de estrés que él pidió —
> reproducir el sandbox entero— y esa prueba **hizo su trabajo**.

---

## EL VEREDICTO, VERBATIM

> ya salieron varios errores gracias a esto
>
> primero
> Enunciado, no existe, deberia ser en todo caso el titulo inerno para el problema a resolver, pero en realidad no se imprime en ningun lado
>
> lo que en realidad estas marcando es el paso 0
> Se neceita poner en las filas el paso 0 para que exista
> Ademas todas las formuasl deben e ser con insertar formula
>
> Papel del paso
> deberia ser simplemente el color, con configuaricon global y el color personalizado igual que siempre
>
> debe de existir el color del paso y el color de la nota destacada abajo (la nota destacada abajo es opcional)
>
> ademas pones Tono de la nota
> y pone el color y el titulo, deberia ser el titulo (que existe el campo)
> Y el color ser escogible y el icono vener la lista de iconos (de la configuracion global de iconos, que despliega el icono, como en todos los compoentnes que hemos puesto los iconos)
>
> nota del pie
> deberia ser texto, con editor de fomrula (inline)
> no deberia haber un checklist de Es el resultado final
> Deberia haber una ultimo paso que habilita ser resultado final, pero solo el ultimo paso, no en medio, no cada paso?
>
> en procedimiento matematico web viene justo asi en el ultimo paso habilitado el checkbox de:
>
> Cerrar con este paso como resultado
> pero solo aparece en el ultimo paso

---

## EL HALLAZGO DE ENCUADRE, Y ES DE LA CABINA — POR CUARTA VEZ EN ESTA FAMILIA

**LOS SIETE PUNTOS YA ESTÁN RESUELTOS EN WEB.** Medido el 2026-08-23 en
`WebBlockEditor.jsx:6454`, `TimelineStepsFields` — el editor de pasos de «Procedimiento
matemático» de Web — que recibe `colorPalette` e `iconLibrary` y monta:

| lo que pide el operador | lo que Web YA tiene |
|---|---|
| el color del paso, paleta global + personalizado | **«Color del paso»** con `ColorTokenOrCustomField` |
| todas las fórmulas con insertar fórmula | **`InlineFormulaField`** envolviendo fórmula y descripción |
| el título de la nota, que el campo ya existe | **«Etiqueta detalle»** |
| el color de la nota, escogible | **«Color de detalle»** |
| el icono de la lista global | **«Icono de detalle»** con `TimelineIconField` |
| el resultado solo en el último paso | **«Cerrar con este paso como resultado»**, `stepIndex === steps.length - 1` |

Y el rótulo que él cita textualmente es **exactamente** el de Web.

> **El ticket de `#134` cita del plan que «la correspondencia N:1 con el `timeline` de Web
> es la referencia de diseño» — y NUNCA le dijo al taller que ABRIERA
> `TimelineStepsFields` y copiara su juego de controles.** El taller construyó un editor de
> pasos desde cero y no reprodujo ninguna de las decisiones ya tomadas.
>
> **Es la CUARTA vez en esta familia de runs**: el icono del catálogo, las piezas de
> colección, el estilo de etiqueta, y ahora el editor de pasos entero. **Siempre el mismo
> defecto de la cabina: un hermano ya lo resolvió y el ticket no apunta al hermano.**

Y hay un aviso escrito en el propio Web, que la cabina debería haber leído: un comentario
de ese fichero dice que «Etiqueta» e «Icono de etiqueta» **se retiraron porque la cabina
los ordenó leyendo mal**. Ya había pasado ahí mismo.

## EL PASO CERO — MEDIDO, Y CON UN MATIZ QUE HAY QUE DECIR

El operador dice que «Enunciado» *«no se imprime en ningún lado»*. **Medido: SÍ se
imprime** — `renderStackSlide.js:246-251` lo pinta arriba de la barra lateral.

**Pero su conclusión es correcta, y por una razón mejor que la que dio:**

> **En los TRES problemas del corpus, `problem` es un DUPLICADO BYTE A BYTE de
> `steps[0].math`.** Verificado uno a uno.

Y el motor ya tiene la caída escrita: `data.problem || steps[0].math` (`:216`). O sea que
**el enunciado ES el paso cero**, y el campo separado obliga al autor a escribir dos veces
lo mismo y a mantenerlas sincronizadas a mano.

**Lo que pide es que el paso 0 exista como fila y el enunciado se derive de él.** El motor
ya lo soporta sin tocarlo.

## «PAPEL DEL PASO» Y «TONO DE LA NOTA» — NOMBRES QUE NO DICEN LO QUE HACEN

Los dos rótulos que la cabina y el taller pusieron describen un **concepto interno**
(`variant`, `detailsVariant`), no lo que el autor elige. El autor elige **un color**. Web
lo rotula «Color del paso» y «Color de detalle», que es lo que son.

Es la regla de nombrar por pantalla, incumplida: **el nombre se juzga por si seguirá siendo
verdad, y «Papel del paso» no dice qué se elige.**

## LO QUE ESTA QA CONFIRMA DEL RUN, Y NO ES POCO

La derivación funciona: **3 procedimientos → 22 escenas, 22 de 22 pintan, cero rotas, cero
«undefined»**, verificado por la cabina. **Lo que falla es la SUPERFICIE DE AUTORÍA, no el
modelo.** El run acertó en lo caro y falló en lo que ya estaba resuelto al lado.

## Y UN FALLO DE LA CABINA EN LA ENTREGA MISMA

El primer JSON que le dio **rebotó en la importación**: se lo pasó por el esquema y por el
compilador, y **ninguna de las dos es la puerta que él usa**. La suya es
`parseAndValidateBlocks`, que rechaza el envoltorio `lesson/webBlocks/slideBlocks` a
propósito. **Tres puertas verdes y ninguna era la suya.**
