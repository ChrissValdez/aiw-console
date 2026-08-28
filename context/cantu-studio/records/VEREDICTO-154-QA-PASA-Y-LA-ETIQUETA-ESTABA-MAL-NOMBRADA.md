# VEREDICTO DEL OPERADOR — `#154`: **la QA pasa, y la etiqueta la nombré por el mecanismo**

> Dado por **Christopher Valdez Cantu** el **2026-08-28**, sobre los cuatro pasos de QA visual de
> `RUN-CANTU-SLIDE-STACK-PER-STEP-FORMULA-SIZE-001`. **Verbatim.**

---

## VERBATIM

> **«jalo pero el concepto de Tamaño máximo de las fórmulas**
> **es incorrecto**
> **en readliad es tamaño de la formula (con un techo limitado a que quepa)**
>
> **pero no estas definiendo el techo estas definiendo el tamaño acutal de la formula entonce es
> confuso esa etiqueta, jala bien solo hay que cambiar, ademas que venga esa linea abajo del
> titulo y antes de la formula de partida en el editor del componente**
>
> **pero dentro de todo jalo bien»**

---

## QUÉ DECIDE

**1 · LA FUNCIÓN PASA.** Los cuatro pasos de QA. No reportó ningún fallo de conducta: ni el
peldaño de arranque, ni el crecimiento, ni el techo actuando, ni la escalera distinta de la vista
única.

**2 · LA ETIQUETA SE CAMBIA.** «Tamaño máximo de las fórmulas» → **«Tamaño de la fórmula»**, que
son sus palabras.

**3 · EL MANDO SE MUEVE.** De donde está hoy —**al final del paso, tras las dos fórmulas**
(`SlideStackEditor.jsx:845`)— a **entre «Título del paso» (`:741`) y «Fórmula de partida»
(`:777`)**.

---

## ⚠ POR QUÉ LA ETIQUETA ESTABA MAL, Y EL ERROR ES DE LA CABINA

**La nombré por el MECANISMO, no por lo que el autor hace con ella.** Y eso es exactamente lo que
la configuración de esta cabina prohíbe: *«al operador se le nombran las cosas como las ve en
pantalla»*.

**Su argumento, y es correcto:**

> **El autor no está definiendo un techo. Está definiendo el tamaño de la fórmula.** Que el
> autoajuste lo baje si no cabe es **conducta de la casa**, no lo que el autor cree estar
> pidiendo. Poner «máximo» en la etiqueta obliga al autor a pensar en el mecanismo para entender
> un mando que, el 100 % de las veces que no desborda, **pinta exactamente el número que dice**.

**Y la medición del propio run lo respalda:** de las siete filas del recorrido de punta a punta,
**seis pintan el número exacto** y sólo la que se pasa a propósito —8rem— actúa como techo.
**Nombrar el mando por el caso raro era describir la excepción en el sitio de la regla.**

## LO QUE **NO** CAMBIA, Y ESTÁ RAZONADO

**El nombre interno del campo se queda: `formulaMaxSize` → `formulaMaxFontSize`.**

- **Identificador y etiqueta no son sinónimos**, y esta casa lo tiene escrito. La etiqueta es lo
  que el autor lee; el identificador describe **lo que el motor hace**, y **`Max` sigue siendo
  literalmente verdad**: entra como `maxFont` en `calculateFit`.
- **Renombrarlo cuesta nueve ficheros, dos esquemas gemelos y sus guardas, para cero beneficio
  del autor.**
- **Y aguanta la prueba de los seis meses:** si algún día se retirara el autoajuste, `Max`
  dejaría de ser cierto — pero eso no puede pasar en silencio, porque hay guarda.

## LA AMBIGÜEDAD QUE CREA EL MOVIMIENTO, NOMBRADA

**Al subir el mando por encima de los dos campos de fórmula**, una etiqueta en singular puede
leerse como que gobierna **sólo el campo siguiente** —«Fórmula de partida»— cuando gobierna
**las dos**, por `Math.min(sizeIn, sizeOut)`.

**Se resuelve en el texto de ayuda, no en la etiqueta.** La etiqueta son sus palabras y sus
palabras ganan; **la ayuda dice que son las dos.** Si al verlo prefiere el plural, es una palabra.

---

## ⚠ LO QUE ESTE VEREDICTO NO CIERRA

**No contestó la línea 5**, que no era un paso de QA sino una decisión suya:

> **El suelo de 14 px es un suelo de DECREMENTO, no un tope inferior.** La valla del esquema
> admite `0.5rem`, y con el techo ya por debajo el bucle no llega a correr: **el taller midió 8 px
> pintados**. Hoy el mando le deja empequeñecer la fórmula por debajo del suelo.

**Se le vuelve a preguntar en texto plano. El run no cierra sin esa línea.**
