# VEREDICTO DE QA — `#132` «Tabla», ronda 1

> Recogido por la cabina el **2026-08-23**. El operador es Christopher Valdez Cantu.
> **Veredicto POR CAPTURA Y DICTADO, no paso a paso.** No ejecutó los nueve pasos del
> packet de la ronda 1. **Tercer turno consecutivo sin QA paso a paso sobre esta
> superficie**, y se declara.

---

## EL VEREDICTO, VERBATIM

> primero, en tabal no deberia tener el campo resultado
> la formula insertada puedo insertar el igual ahi para una formula completa, ese campo confunde mas que ayudar
>
> el campo con descripcion y sin descripcion (aqui esto aplica a web y slide), ambos casos no creoque apliquen si lo quiero sin descripcion basta con dejar el campo vacio, no tieen caso tener que seleccionar con y sin
>
> ademas. mira con en web la etiquet atiene modo contorno y solido ademas de escoger el color (con la paleta de color global y personalizado)
>
> para que lo corrijas en slide
>
> ademas, qisiera tener una manera de ajustar e ltamaño de la tabla
>
> eso en slide y web el tamaño actual esta bien como mediano (el default)
>
> ademas, no pongas el tamaño extra automatico, simplemente chico, mediano, grande, extra grande
>
> Y como default que cuando inserto una slie que por deafult aparezca mediano

**Adjuntó una captura** de la fila de Web: `ETIQUETA` · `COLOR DE ETIQUETA` («Azul acero»
con muestra) · `ESTILO` («Contorno»).

---

## LO QUE ESTO DESTAPÓ — y es la TERCERA vez del mismo patrón

### 1 · EL «ESTILO» DE ETIQUETA: OTRO LÍMITE QUE ERA UNA PIEZA SIN CABLEAR

La ronda 1 lo dejó fuera **declarándolo midiendo**, y la medición era correcta:
`.j-math-badge` no declara ni borde ni contorno —solo radio— y el motor no lee ningún
`badgeStyle`. **Pero «el motor no lo tiene» no es «el motor no puede tenerlo».**

Medido el 2026-08-23 en `src/builders/web/partials/renderBadge.js`: Web resuelve los dos
modos en **dos ramas de seis líneas** — `solid` da `border: 1px solid ${mainColor}` con
relleno; `outline` da `border: 2px solid ${mainColor}` con fondo transparente.

> **Es el tercer caso seguido del mismo patrón en este run: el icono, las piezas de
> colección, y ahora el estilo de etiqueta.** Las tres veces la cabina declaró una
> frontera, y las tres veces detrás había una pieza construida que solo había que cablear.

### 2 · EL TAMAÑO YA ESTÁ CONSTRUIDO, Y YA HACE LO QUE PIDE

**Medido, y cambia el encargo entero:**

- `TEXT_SIZE_OPTIONS` es **exactamente** «Chico · Mediano · Grande · Extra grande». Los
  cuatro rótulos que dictó, verbatim, ya existen.
- `RUN-CANTU-SLIDE-SIZE-SELECT-DROP-AUTOMATIC-DEFAULT-001`, del **2026-08-18 y por
  decisión suya**, ya invirtió el defecto: **el control NACE SIN «Automático»**, y solo lo
  lleva quien lo pida a propósito. Su queja de entonces está citada en el fichero: *«el
  automatico no debe exisitr (…) pide la correccion y lleva tiempo este error»*.
- Con «Automático» apagado, **«Mediano» es el arranque explícito** por `defaultValue`.

> **Sus peticiones 4 y 5 NO son construir un control: son montar el que ya existe.**
> «Tabla» nunca lo montó. Decírselo como si fuera trabajo nuevo sería venderle algo que ya
> compró.

**Quién honra `textSize` en el motor de diapositiva, medido:** `renderCard`,
`renderCallout`, `renderIconList`, `renderNarrative`, `renderRule`, `renderSplitCard` —
**seis**. `renderTable` y `renderConceptGrid`, **no**. «Tabla» sería el **séptimo**.

**Y el camino tiene mapa escrito.** `SlideItemEditor.jsx` documenta la trampa tres veces:
la lista del despachador es ESPEJO del esquema, y la lista de abajo se DERIVA de ella, así
que añadir arriba sin excluir abajo mete el tipo en la cola compartida y pone roja la
guarda `C3` de `#119`. Se hace en el mismo commit.

### 3 · `result` — RETIRAR EL CONTROL, NO EL CAMPO

**Medido: las 22 filas de tabla de `test_tables.js` tienen `result`. Las 22.**

Retirar el campo del motor **borraría 22 valores escritos**. La casa ya tiene el patrón
correcto para esto y es el que `#131` aplicó a `variant`: **se retira el CONTROL, no el
campo** — *«un campo sin control no le miente a nadie: le da respaldo»*.

### 4 · EL DESPLEGABLE «CON / SIN DESCRIPCIÓN» CRUZA A WEB

Él lo dice explícito: *«aquí esto aplica a web y slide»*. La parte de diapositiva cabe en
`#132`; **la de Web NO**, porque el `run_id` de este run dice `SLIDE-TABLE` y la identidad
no se enmienda.

---

## LO QUE QUEDA SIN MIRAR

Los nueve pasos del packet de la ronda 1 **no se ejecutaron**. Sin veredicto: el recuadro
único, el control de icono, el icono en la previa, el control de fórmula, y el estado «El
de la tabla» del color de etiqueta vacío.

**Y sigue sin contestar, por tercera vez, la pregunta de «Anatomía de fórmula»**, que
ahora acumula DOS carencias frente a «Tabla»: el doble recuadro y el `textSize`.
