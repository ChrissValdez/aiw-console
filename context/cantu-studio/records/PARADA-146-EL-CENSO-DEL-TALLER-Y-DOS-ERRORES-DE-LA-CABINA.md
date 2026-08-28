# PARADA de `#146` — el censo del taller, DOS errores de la cabina, y el precedente que resuelve la pregunta

> `RUN-CANTU-EDITOR-ADD-ITEM-AFFORDANCE-STANDARD-001`, `active` desde el **2026-08-27**.
> El taller **paró y reportó sin escribir código**, como el ticket le autorizaba.
> **El packet se transcribe, no se sustituye.** Y lo que la cabina midió después va detrás,
> declarado como suyo.

---

## ⚠ LO PRIMERO: LA CABINA SE EQUIVOCÓ DOS VECES, Y SE PUBLICA IGUAL DE FUERTE

### Error 1 — «las dos formas ya conviven dentro de cada carril»

**Lo escribí en un record, en el `full_description` del run y en un mensaje de commit:**

> «`SlideArithmeticFields.jsx` monta `CabeceraDeColeccion` **y además** tiene un botón punteado.»

**ES FALSO, y lo verifiqué contra disco el 2026-08-27 después de que el taller me contradijera.**
Ese fichero tiene **un solo** `border-dashed`, en la línea 421, y **no es un botón**:

    421:  <div className="mt-2 border-t border-dashed border-zinc-200 pt-2">

Es un **separador `border-t`** dentro del último ítem, el que abre «Fila de resultado».
**No hay ningún `<button>` con `w-full` y `dashed` en ese fichero.** `SlideArithmeticFields.jsx`
monta **tres enlaces azules y cero botones punteados**.

**Cómo se produjo:** conté `border-dashed` y leí cada aparición como «botón de agregar». Es la
quinta forma de fallar del manual —**medir con la sonda equivocada y publicar el resultado**—
y produjo un hallazgo que sonaba interesante y era mentira.

**Lo que SÍ es cierto, y el taller lo mantiene:** la incoherencia del carril de diapositiva
existe, pero **entre ficheros** —`SlideConceptGridFields` y `SlideHierarchyEditor` punteados,
frente a los otros cuatro con enlace azul—, **no dentro de un fichero**.

### Error 2 — «1 por fichero en ocho ficheros más»

**Mi propia sonda había impreso `dashed x3  AddBlockZone.jsx`**, y al escribir el record lo
comprimí como «1 por fichero». Es la tercera forma de fallar: **repetir una medición correcta,
comprimida mal**. Verificado: `AddBlockZone.jsx` tiene `border-dashed` en `:23`, `:42` y `:53`.

**No se reescribe hacia atrás.** El record y el texto del run se quedan como están; **la
corrección va hacia adelante** y viaja dentro del ticket de la ronda siguiente.

---

## EL CENSO DEL TALLER — transcrito

**19 controles** de «agregar un elemento a una colección». **13 punteados · 6 enlace azul.**

**Forma punteada (la que se queda) — 13**, y **10 de ellos en `WebBlockEditor.jsx`**: filas y
pasos de «Explicación guiada» (`:2023`, `:2151`), «Detalles» (`:3188`), términos de «Anatomía de
fórmula» (`:3522`), filas de «Tabla» (`:4178`), pasos y factores de «Cálculo aritmético»
(`:4351`, `:4479` — **las dos referencias del operador**), pasos de la matriz (`:5158`), nodos de
«Jerarquía» (`:6180`) y pasos de «Línea de tiempo» (`:6677`). Más `IconListFields.jsx:310`
—compartido por los dos carriles— y, en diapositiva, `SlideConceptGridFields.jsx:394` y
`SlideHierarchyEditor.jsx:352`.

**Forma enlace azul (la que se retira) — 6, TODOS de diapositiva**, todos por
`CabeceraDeColeccion`: `SlideArithmeticFields.jsx:157`, `:228`, `:357`; `SlideSplitFields.jsx:304`;
`SlideTableFields.jsx:287`; y **`SlideStackEditor.jsx:632`, que es el de la captura del operador**.

**CONSECUENCIA QUE ACOTA EL RUN: Web ya tiene la forma estándar en el 100 % de sus controles.**
Por el criterio escrito en el propio ticket —«si Web ya la tiene en todos, no se toca Web»—,
**este run NO TOCA WEB**. Cinco de los seis cambios son mecánicos.

**El taller corrigió mi cifra con más precisión que yo:** de los 13 `border-dashed` de
`WebBlockEditor.jsx`, sólo **10** son botones de agregar; `:3036` y `:5109` son separadores y
`:3054` es un recuadro de estado vacío.

---

## POR QUÉ PARÓ — y la parada es legítima

`SlideStackEditor.jsx:474-498`: si el último paso lleva `isResult`, «+ Agregar paso» **inserta en
`cuantosPasos - 1`**, delante del resultado, en vez de al final.

El taller lo leyó contra las palabras del operador —«punteado abajo del último paso **y ahí se
agrega al final**»— y concluyó que un botón de ancho completo **debajo** del resultado que
inserta **encima** del resultado **dice con su posición lo contrario de lo que hace**.

**Y no entregó cinco de seis, con una razón que es correcta:** `CabeceraDeColeccion` es **una
pieza compartida**; vaciarla para cinco consumidores y dejar el sexto **obliga a bifurcarla**.

---

## ⚠ EL PRECEDENTE QUE LA CABINA MIDIÓ DESPUÉS, Y CAMBIA LA PREGUNTA

**El propio comentario del código lo señalaba, y ninguno de los dos lo siguió hasta el final.**
`SlideStackEditor.jsx:463` dice: *«§5, copiado de `TimelineStepsFields` (`WebBlockEditor.jsx:6478-6490`)»*.

**Medido el 2026-08-27, 18:3x CST, en «Línea de tiempo» de WEB:**

| | qué tiene Web hoy | dónde |
|---|---|---|
| botón | `w-full … border border-dashed`, **debajo** del mapa de pasos, «+ Agregar paso» | `WebBlockEditor.jsx:~6676` |
| lógica | `if (lastIsResult) → [...cabeza, nuevo, resultado]` — **inserta ANTES del resultado** | `WebBlockEditor.jsx:~6490-6496` |

**O sea: la combinación que el taller señaló como contradictoria YA ESTÁ EN PRODUCCIÓN EN WEB,
en el carril que el operador llamó «bien pulido».** Y está ahí **por criterio del propio
operador**, escrito en el comentario de la ronda 4: *«EL AUTOR NO PUEDE LLEGAR AL ESTADO MALO,
en vez de validárselo después»*.

**Lo que esto convierte:** la opción A deja de ser «aceptar una rareza» y pasa a ser **portar la
forma de Web con fidelidad, comportamiento incluido**. Diapositiva ya copió la lógica de Web y se
quedó a medias: **copió el `insert` y no copió el botón.** Este run termina esa copia.

**Lo que esto NO decide:** el operador dijo «se agrega al final» con sus palabras, y en el caso
del paso de resultado eso no se cumple — **ni en Web ni en diapositiva**. Esa tensión es suya y
se le pone delante en vez de resolverla por él.

---

## LO QUE EL TALLER DECLARÓ NO PODER VERIFICAR — y se conserva

- **La pantalla.** No condujo el editor. Todo su censo es lectura de fuente.
- **Si `isResult` está marcado en un borrador vivo.** Leyó la lógica, no un dato.
- **Si al vaciar `CabeceraDeColeccion` la pieza queda sin razón de ser.** Quedaría un `div` con
  un `span` y dos props muertas en seis sitios. **Se nombra y se pregunta; no se borra de paso.**
- **Si dos guardas se pondrían rojas. LA CABINA LO VERIFICÓ Y CONFIRMA EL ANCLAJE**, sin correr
  la suite: `slideTableAdmitAndImplement.test.mjs` la nombra **cinco veces** —incluida
  `assert.match(fuenteSplit, /export const CabeceraDeColeccion/)` en `:939` y el montaje en
  `:924`— y `slideConceptGridTermsFrame.test.mjs:174` la usa como ancla. **Son las dos únicas
  pruebas del repo que la nombran.** Si el botón sale de la pieza, esas asertos hay que
  actualizarlos, y eso es trabajo declarado, no sorpresa.

## LA TERCERA FORMA, NOMBRADA Y DEJADA FUERA

El taller encontró controles con una tercera forma —«Agregar bloque» (`WebBlockEditor.jsx:3072`),
`AddBlockZone.jsx:22`/`:52`, «Insertar aquí» (`SlideBlockEditor.jsx:1155`), «Línea»
(`SmartFormulaField.jsx:759`) y los dos de `ComponentGuide.jsx`— y **los dejó fuera con razón
escrita: ninguno agrega un elemento a una colección de campos.** Agregan un bloque al lienzo o a
una celda, o una línea a una fórmula. **Se nombran, no se abren.**
