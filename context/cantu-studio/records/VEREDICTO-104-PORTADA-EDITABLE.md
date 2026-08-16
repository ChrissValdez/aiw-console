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

---

# SEGUNDO VEREDICTO — la QA de la RONDA 2, con captura de pantalla

> **Recogido por la cabina el 2026-08-16**, después de que el operador ejecutara la QA de la
> divergencia. **Es un PASS con detalles**, y adjuntó una captura del panel de la Portada
> (bloque `02`, «Portada sin título», los cuatro campos con sus marcas de agua).

## SUS PALABRAS, VERBATIM

    mucho mejor, jala como esperaba pero con varios detalles

    primero, los holdplacer hcaen que se vea demasiado texto
    en vez de holdplace con el titulo subtitulo y etiqueta prellenada
    ademas si el titulo es obligatorio, deberia estar prellenado con la palabra Titulo para que compile

    pero... si lo elimino y lo dejo vacio que me aparezca el mesnaje rojo de error

    ademas Titulo por ser obligatorio deberia tener el asterizco en Titulo*

    admeas la badge por dejecto no deberia ser system showcase deberia ser el tiutlo del tema

    las careptas estan organizadas por
    proyecto, tema leccion

    entonces que agarre el nombre del tema para el badge como default, igual es editable es solo el prellando que hace cuando lo agregas

## LECTURA DE LA CABINA

**PASS explícito a la ronda 2** — «jala como esperaba». La divergencia, la multi-portada y la
siembra quedan aceptadas. Lo que sigue son refinamientos de la misma superficie.

1. **Menos ruido de texto.** Los cuatro placeholders son largos —el de descripción se corta en
   pantalla— y con los campos prellenados sobran.
2. **`title` pasa a OBLIGATORIO**, con su mensaje rojo si se vacía y su asterisco en el rótulo.
3. **Prellenado de garantía:** si la lección no tiene título, el campo nace con la palabra
   `Título` **«para que compile»** — sus palabras.
4. **La etiqueta se siembra del TEMA.** Hoy la semilla sale sólo de `lesson.titleBadge`, así que
   nace vacía cuando el autor no declaró «Etiqueta de portada». Él da la razón estructural:
   **«las carpetas están organizadas por proyecto, tema, lección»**, así que el tema es el
   rótulo natural. **Editable: es sólo el prellenado al agregarlo.**

## MEDIDO POR LA CABINA AL RECIBIR ESTE VEREDICTO — y ahorra la mitad del trabajo

**EL ASTERISCO Y EL ERROR ROJO YA EXISTEN Y SON AUTOMÁTICOS.** `TextInputField` los pinta solo:
el rojo sale de `error`, y **el asterisco se DERIVA DEL ESQUEMA** a través de
`registerProps.name`, vía `esCampoObligatorio`. Su cabecera lo dice literal: *«aquí NO hay
ninguna lista de campos obligatorios; hay una función que le PREGUNTA AL ESQUEMA»*, y **los 32
sitios que montan el campo no declaran nada**.

**Consecuencia: las tres peticiones —obligatorio, asterisco, mensaje rojo— son UNA SOLA
cosa.** Declarar `title` requerido en los dos gemelos las cumple las tres. **Nadie debe pintar
un asterisco a mano**, y hacerlo sería romper la regla que ese fichero existe para sostener.

**Es la SEXTA vez del patrón «capacidad ya construida, cerrada aguas arriba»** en este proyecto.

**Sobre `SYSTEM SHOWCASE`, y hay que verificarlo antes de tocar:** el motor resuelve
`badge || topic || 'SYSTEM SHOWCASE'`, y el compilador **hace viajar `topic` siempre, en las dos
ramas**. Con tema no vacío, ese literal **no debería alcanzarse nunca**. Lo que él pide —que la
etiqueta nazca prellenada con el tema— **se resuelve en la semilla** y es independiente del
respaldo del motor. **Que el taller mida por qué lo vio antes de cambiar el motor.**
