# VEREDICTO DEL OPERADOR — `#104` `RUN-CANTU-SLIDE-TITLE-SLIDE-AUTHORABLE-001`

> **Recogido por la cabina el 2026-08-16.** El operador ejecutó la QA en pantalla y respondió con
> **comentarios de diseño en vez de pass/fail paso a paso**. No dio veredicto de los diez pasos.
>
> **Su texto va VERBATIM abajo, sin corregir ortografía ni reordenar.** Lo que sigue después es
> lectura de la cabina y está marcado como tal.

---

## SUS PALABRAS, VERBATIM

    ya vi, tengo comentarios
    priimero el icono del tipo de slide
    portada
    es un icono que no asocio, y aprovechando eso el icono de slide libre, esta muy alargado sigo queriendo que sea rectangulo pero que sea un poquito mas alto

    ahora, el tema es este
    solo permite una title slide y automaticamente me dice esto y me bloquea su modificaicon:

    Lo demás lo pinta de los datos de la lección (barra superior)
    Título
    Por defecto: Título de la Presentación
    Subtítulo
    Por defecto: sin subtítulo
    Etiqueta
    Por defecto: el tem


    la slide portada en realidad podria existir mas de uan sldie portada
    si quisiera agregar una segunda slide portada deberia podersE
    y en cambio esto como que me abre y me bloquea en una sola

    la slide portada deberia dejarme modificar el tamaño de letra de titulo, subitutlo y badge

    Y cuando creo una leccion que automaticamente me cree el componente de la primera slide, con esos datos autollenados, pero igual me permite modificarlo, el titulo de slide no tiene uqe ser igual que el titulo de la leccion, se autollena con esos datos, pero puede diferir y ahorita no permite eso

---

## LECTURA DE LA CABINA — cinco peticiones, y dos de ellas desmienten el diseño del run

**Marcado como lectura, no como sus palabras.**

### 1 · El icono de «Portada» no se asocia
Superficie: la tarjeta de la paleta «Añadir diapositiva». Es cambio de superficie, sin contrato.

### 2 · El icono de «Libre» está muy alargado
**Quiere que siga siendo rectángulo, un poco más alto.** Es proporción, no forma. Va con el 1.

### 3 · LA UNICIDAD ESTÁ DESMENTIDA
**«la slide portada en realidad podria existir mas de uan sldie portada / si quisiera agregar una
segunda slide portada deberia podersE».**

`#104` implementó justo lo contrario: máximo una Portada, en el `superRefine` del array de **los
dos gemelos** del esquema, más el freno hablado de `handlePaletteAdd`. **Fue una invención de la
cabina y el operador la ha vetado.**

### 4 · EL ECO DE SÓLO LECTURA ESTÁ VETADO
**«esto como que me abre y me bloquea en una sola»** — citó el recuadro de eco entero.

Estaba marcado en la QA como invención de la cabina y vetable. **Lo vetó.** Título, subtítulo y
etiqueta tienen que ser **editables en el bloque**.

### 5 · Y NO SÓLO EDITABLES: PROPIOS, SEMBRADOS Y DIVERGIBLES
**«se autollena con esos datos, pero puede diferir y ahorita no permite eso»** — y
**«el titulo de slide no tiene uqe ser igual que el titulo de la leccion»**.

**Ésta es la petición grande y cambia el contrato**, no la interfaz: los campos dejan de ser una
vista viva de `lesson.*` y pasan a ser **datos del bloque**, que **nacen copiados** de la
metadata y **a partir de ahí divergen**. Es lo contrario de la razón que la cabina escribió en
`SlideTitleSlideEditor.jsx` para no duplicarlos.

### 6 · Tamaños de letra de título, subtítulo y badge
**«deberia dejarme modificar el tamaño de letra de titulo, subitutlo y badge».** Hay que medir si
el motor ya sabe pintarlos —el patrón «capacidad en el motor, cerrada en el esquema» ya lleva
cinco casos en este proyecto, y **los tamaños fueron uno de ellos**— antes de decidir nada.

---

## LO QUE ESTE VEREDICTO LE HACE A `#104`

**Lo entregado no está roto: está incompleto respecto de lo que él quiere.** La Portada ya es un
bloque real que nace con la presentación, se edita, compila en su sitio y conserva las 11
lecciones. Eso se sostiene y es la base de todo lo demás.

**Pero dos piezas concretas de `#104` hay que deshacerlas:** la regla de unicidad en los dos
gemelos, y el eco de sólo lectura. **Ninguna de las dos la pidió él; las dos las inventó la
cabina y las marcó como vetables en la QA.** El mecanismo funcionó: se marcaron, se miraron y se
vetaron.

**No se ejecutó la QA paso a paso.** Su reacción derivó a rediseño antes de dar pass/fail, así
que **los diez pasos quedan sin veredicto** y eso se declara en el cierre del run, no se disimula.
