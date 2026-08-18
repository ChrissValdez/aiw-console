# `#111` — cierre con QA parcial, y el defecto de reparto de la rejilla

> **Recogido por la cabina el 2026-08-17.** El operador no ejecutó la QA de `#111`: mientras
> trabajaba en el editor **se topó con un defecto grave de la rejilla** y lo reportó con una
> captura. Este récord guarda las dos cosas.

## SUS PALABRAS, VERBATIM

    acabo de toparme con un error grave
    Y no se de donde salio
    estaba trabajando con el grid de la diapositiva libre

    lo tenia con dos columnas 1 fila
    lo cambio a dos columna y 2 filas
    Y no se escalo la diapositiva, mira como el componente 3 lo agrego fuera del tamaño de la
    diapositiva
    y los componentes iniciales, no los rediseño, no se porque pasa esto segun yo no pasaba y
    cro que solo pasa cuando esta el sgv pero no estoy seguro, pero si es un error grave, que
    no funcione como deberia respecto a los grids

Adjuntó una captura: mapa en «2 columnas × 2 filas» con Tarjeta y Gráfico SVG en la fila 1 y
Narrativa en la fila 2; en la vista previa, la fila 1 ocupa **toda** la altura útil y
«RENDERIZADO» cae **fuera** del área de la diapositiva.

## LO MEDIDO AL RECIBIRLO — y las tres preguntas que hizo

### 1 · «No sé de dónde salió» → NO SALIÓ DE ESTA SESIÓN

`src/builders/slides/layouts/renderColumnsSlide.js` **no se toca desde el run de la fusión de
celdas**. En toda la sesión el único commit que entró en `src/` fue el de la ronda 2 de
Narrativa, y tocó `renderNarrative.js` y `tokens.js`. **El motor de layout está byte a byte
como estaba al abrir.**

### 2 · «Creo que sólo pasa cuando está el SVG» → NO. El SVG sólo lo hace obvio

Es el ítem más alto, así que exagera el efecto. **El mismo defecto está medido dos veces antes,
y una sin ningún SVG:**

- **`#108`, sólo tarjetas:** cuatro filas declaradas `['1fr','1fr','1fr','1fr']` se pintaron
  **228,3 / 83,3 / 83,3 / 288,7 px**.
- **`#111`, hace un rato:** un gráfico en la fila 4 se recorta por abajo, **y la escena de
  control con sólo tarjetas cabía de sobra**.
- **El suyo de ahora**, que es el más claro: el componente sale de la diapositiva entera.

**Tercera vez, mismo defecto.**

### 3 · «Según yo no pasaba» → no lo había visto porque hasta ahora no había repartido

Con **una sola fila no hay nada que repartir**. El defecto aparece en cuanto hay dos.

## EL MECANISMO, MEDIDO — y NO es que falte el dato

Se comprobó la sospecha obvia y **es falsa**: el editor **sí escribe las pistas de fila**.
`applyGeometry` hace `rowsField.onChange(...)` y su comentario lo declara — *«Las pistas se
ESCRIBEN SIEMPRE, columnas y filas. Declarar las filas es lo que hace cierto que "una fila
vacía conserva su altura"»*. Su diapositiva **tiene `1fr 1fr` declarado**.

**El problema es lo que `1fr` significa: es `minmax(auto, 1fr)`.** Una pista **nunca encoge por
debajo de su contenido**. La fila 1 se queda con lo que su contenido pide y la fila 2 se va
fuera.

**Y de ahí sale la parte que el operador describe como «el mapa miente»:** el mapa reparte
igual porque él sí puede; el motor no. El propio código lo tenía escrito y nadie ató los cabos:
`rowHeightsAreAutomatic`, con el comentario *«el mapa las reparte iguales y lo DICE en la
interfaz en vez de fingir que sabe»* — pensado para el caso sin declarar, **pero el resultado
es el mismo con las pistas declaradas**.

**Consecuencia que aún no le ha mordido y está en el mismo sitio:** el contrato de la rejilla
promete que **«una fila vacía conserva su altura»**. Con este comportamiento **tampoco es
cierto**.

## POR QUÉ NO SE ARREGLÓ EN EL ACTO

La causa está **en el motor**, que el plan de quince declara de sólo lectura con parada
explícita, y **cambiar cómo se reparten las pistas cambia cómo se pinta toda diapositiva ya
escrita**. Necesita su run, con guarda de invariancia sobre el corpus y QA humana.

**LA CABINA ASUME SU PARTE:** lo nombró **dos veces** en esta sesión como «abierto y sin dueño»
en vez de recomendar un run. **Nombrar un defecto no es ocuparse de él**, y esa es la lección
que se lleva de aquí.

## CÓMO CERRÓ `#111` — CON QA PARCIAL, Y SE DECLARA

**El operador decidió cerrarlo así**, con las opciones y la recomendación delante.

**LO QUE SÍ ESTÁ VERIFICADO**, y contra disco, no contra el relato del taller: el puesto falso
retirado del catálogo y de las dos tablas de icono; `Gráfico SVG` ya no `disabled` en el
selector de celda; el importador ya no lo contiene; los topes 4×4; 10/10 en la prueba del run;
el corpus invariante carácter a carácter; y cero borradores con el tipo retirado, sobre 176
JSON.

**LO QUE QUEDA SIN MIRAR POR OJO HUMANO — y es lo que hay que decir en voz alta:**

- **Pasos 5 a 7** — que «Gráfico SVG» aparezca en el selector de celda, que se pinte en la
  vista previa real, y que «Insertar JSON» lo acepte.
- **Paso 8** — que el riel de diapositiva tenga **sólo dos botones**. Era el paso con
  consecuencia de parada.
- **Paso 9** — que «Recurso visual» de Web conserve su icono.

**Los pasos 1 a 4 no se pierden:** eran exactamente este defecto, y pasan al run que lo va a
arreglar.

**Y esto se nombra por la regla de acumulación:** `#110` cerró con QA completa, así que **no
son dos cierres seguidos a ciegas**. Pero es el **octavo run consecutivo** cuya superficie
visual sólo puede juzgar el ojo del operador.
