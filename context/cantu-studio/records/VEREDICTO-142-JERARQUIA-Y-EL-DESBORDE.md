# VEREDICTO 142 — «Jerarquía» pasa, y aparece el desborde

**Proyecto:** `cantu-studio` · carril `diapositiva`
**Run:** `RUN-CANTU-SLIDE-HIERARCHY-TYPE-EXPOSE-001` (`#142`)
**Fecha:** 2026-08-26
**Quien lo emite:** el operador Christopher Valdez Cantu

---

## Los veredictos, VERBATIM

**Sobre la exposición del tipo, tras pegar el material por «Insertar JSON»:**

> ya jalo

**Sobre la enmienda D-061 de la fórmula:**

> pero la formula ya la leyo bien

**Y el defecto nuevo, con captura de la escena «QA 1 — Colores y orientación horizontal»:**

> ya jalo pero ahora tenemos un nuevo problema te muestro mira como se encima el arbol con
> el titulo y con el borde inferior
>
> ayudame a arreglarlo si no cabe que se escale todo hasta que quepa
>
> igual en horizontal

**Y su instrucción sobre qué hacer al cerrar:**

> Ahora ya que arreglemos esto en el siguiente ticket y pasemos el qA, es decir cuando
> complemtemos y cerremos este run correctamente, pon un recordatorio de no abrir otro run,
> sino de hcaer el handsoff y abir una nueva sesion

---

## Qué queda cerrado con esto

- **La exposición del tipo.** «Jerarquía» aparece en el mazo, se inserta, se edita, se pega
  por «Insertar JSON» y compila. Los colores salen de la paleta: la raíz sin color pinta el
  azul de la paleta y no el hex legado.
- **La fórmula.** La salida «C» de la enmienda D-061 funciona en el píxel. El nodo pinta la
  fórmula de su captura original renderizada, no en LaTeX crudo.

## Qué NO queda cerrado, y por eso `#142` sigue `active`

El árbol **desborda su lámina**: se encima con el encabezado por arriba y se sale por el
borde inferior. Medido en la captura del operador sobre una escena de cuatro niveles.

**La decisión del operador sobre la forma del arreglo, y es la misma que ya dio el
2026-08-20 para las celdas (VEREDICTO-126):** si no cabe, **se escala todo hasta que
quepa**. No se corta, no se recorta, no se hace scroll.

---

## Lo que la cabina midió después de recibir el veredicto

- `src/builders/slides/helpers/fitEngine.js` **ya mecaniza exactamente esa decisión**, con
  el texto del propio operador citado en su cabecera. 327 líneas, script de runtime.
- **Y NO ALCANZA A «Jerarquía».** Su pasada recorre `document.querySelectorAll('.j-columns-stage')`
  y sus hijos. Los tipos de **pantalla completa** quedan fuera del selector por
  construcción.
- **Hay precedente de cómo se resolvió antes en un tipo de pantalla completa:**
  `renderStackSlide.js` escribió su propio `fitHistory()` y **copió el patrón de
  disparadores** de `fitEngine.js:290-324` —`fonts.ready`, dos pasadas tardías y un
  observador de mutaciones con freno— en vez de extender la pieza compartida. Su comentario
  lo dice literal: «Se copia en vez de inventar otro».
- Ese mismo comentario deja medido **por qué el ajuste tiene que esperar a KaTeX**: con solo
  los disparadores tempranos el hueco medía cero o se medía texto en crudo, y el ítem seguía
  desbordando 106 px.

## La pregunta que el arreglo tiene que contestar midiendo, no razonando

Extender el selector de `fitEngine` alcanza a Jerarquía **y a todos los demás tipos de
pantalla completa a la vez**. Copiar el mecanismo lo deja acotado pero sería **la tercera
copia** del mismo patrón. Es una decisión de pieza compartida y se contesta con el coste
medido, no con la costumbre.

---

## La instrucción de cierre, y no es negociable

**Cuando `#142` cierre correctamente —arreglo aplicado y QA pasada— NO se abre otro run.**
Se escribe el handoff y se abre **sesión nueva**. Lo pidió el operador por escrito en este
mismo veredicto.
