# DECISIÓN DE DISEÑO DEL OPERADOR — el botón de agregar va PUNTEADO ABAJO, en todos los componentes de los dos carriles

> Dicha por **Christopher Valdez Cantu** el **2026-08-27**, con **dos capturas de pantalla**,
> justo después de aprobar la inserción de los dos runs del porte.
> **Se guarda verbatim.** Y trae una corrección que hay que publicar igual de fuerte.

---

## VERBATIM

> **«me dic uenta en procedimiento matematico que agregar paso lo tiene en azul arriba en pequeño
> y lo quiero como lo vi en calculo aritmetico (en web=»**
>
> **«con agregar paso punteado abajo del ultimo paso y ahi se agrega al final»**
>
> **«pero quiero esto en todos los compoentne web y slide es mejor diseño, no cambia
> funcionalidad cambia diseño»**
>
> **«quisiera un run para estandarizar esto tu escoge donde agregarlo»**

**Las dos capturas:** la primera, «PASOS» con **«+ Agregar paso» en azul, pequeño, arriba a la
derecha**, y debajo «PASO 0 · TÍTULO DEL PASO · Ecuación lineal» — es **«Procedimiento
matemático», de DIAPOSITIVA**. La segunda, «PASO 7 · VALOR · DIVISOR» y debajo un **botón
punteado de ancho completo con «+ Agregar paso»** — es **«Cálculo aritmético», de WEB**.

---

## ⚠ CORRECCIÓN: EL RECORD ANTERIOR TENÍA LA DIRECCIÓN AL REVÉS

`DECISION-LOS-CAMPOS-DE-WEB-ESTAN-PULIDOS-Y-HAY-QUE-TRAERLOS.md`, en su pieza 2, dice:

> «**«+ Agregar factor» y «+ Agregar paso».** En Web son **un enlace azul pequeño arriba**; en
> diapositiva es **el botón punteado de ancho completo abajo**.»

**ESO ESTÁ AL REVÉS, y lo desmintió el ojo del operador antes que ninguna sonda.**

**Medido contra disco el 2026-08-27, 18:0x CST:**

| forma | dónde vive | prueba |
|---|---|---|
| **enlace azul pequeño ARRIBA** | `CabeceraDeColeccion`, declarada y exportada en **`SlideSplitFields.jsx:193`** — o sea **DIAPOSITIVA** | `text-[11px] text-indigo-600`, dentro de un `flex items-center justify-between` con el rótulo |
| **botón punteado de ancho completo ABAJO** | **`WebBlockEditor.jsx:4356`** («+ Agregar paso») y **`:4484`** («+ Agregar factor») — o sea **WEB** | `w-full … border border-dashed border-zinc-300`, colocado **después** del `map` de la colección |

**El principio del operador no cambia** —«los campos de Web están pulidos, hay que traerlos»—:
**cambia qué es lo pulido.** La forma buena es **la punteada de abajo, que está en Web**, y la que
hay que retirar es el enlace azul de arriba, **que es de diapositiva**.

**No se reescribe hacia atrás.** El record anterior se queda como está; **se corrige hacia
adelante**, y esta corrección viaja dentro del texto de los runs afectados.

---

## LO QUE SE MIDIÓ DEL TERRENO, Y CUÁNTO CUESTA

**La forma «enlace arriba» está centralizada:** `CabeceraDeColeccion` es **una sola pieza**, y la
consumen **seis sitios en cuatro ficheros de diapositiva**:

    SlideArithmeticFields.jsx  · «+ Agregar paso» (:157) · «+ Agregar factor» (:228)
                               · «+ Agregar paso» de la matriz (:357)
    SlideSplitFields.jsx       · «+ Agregar fila» / «+ Agregar paso» (:306)
    SlideStackEditor.jsx       · «+ Agregar paso» (:634)   ← el de la captura
    SlideTableFields.jsx       · «+ Agregar fila» (:289)

**EL HALLAZGO QUE MÁS IMPORTA: LAS DOS FORMAS YA CONVIVEN DENTRO DE CADA CARRIL.** No es «Web
tiene una y diapositiva la otra». `SlideArithmeticFields.jsx` monta `CabeceraDeColeccion` **y
además** tiene un botón punteado; `SlideConceptGridFields.jsx`, `SlideHierarchyEditor.jsx` y
`IconListFields.jsx` ya usan **la punteada**. **La incoherencia es interna, y por eso
estandarizar tiene más valor del que parecía.**

**⚠ LÍMITE DECLARADO DE ESTA MEDICIÓN, Y ES DE SONDA:** el censo de la forma punteada se hizo
contando `border-dashed`, que **NO distingue** un botón de «agregar elemento» de otras piezas
punteadas —`AddBlockZone`, `ComponentPicker`, el modal de ajustes y la previa de fórmula también
lo usan—. **El recuento exacto de botones de agregar es trabajo del run, no de este record.**
La cifra bruta, para verificar y no para creer: **13 en `WebBlockEditor.jsx`** y **1 por fichero
en ocho ficheros más**.

---

## LO QUE LA DECISIÓN DICE, Y LO QUE NO

**Dice:** la forma estándar de «agregar un elemento a una colección» es **un botón punteado de
ancho completo, debajo del último elemento, que añade al final**. En **todos** los componentes,
de **los dos** carriles.

**Dice también, y con sus palabras:** **«no cambia funcionalidad, cambia diseño»**. Un cambio que
altere qué pasa al pulsar —dónde se inserta, qué topes se comprueban, qué se prerrellena— **ya no
es este run**.

**NO dice** que se borre `CabeceraDeColeccion`. El rótulo de la colección sigue haciendo falta;
lo que se va es **el botón que lleva encima**. Si tras vaciarla la pieza queda sin razón de ser,
**eso se nombra y se pregunta, no se decide de paso.**

---

## CONSECUENCIA INMEDIATA SOBRE UN RUN QUE SE ACABA DE INSERTAR

`RUN-CANTU-EDITOR-PORT-WEB-FORM-SHAPES-001` se insertó hace minutos con un punto 2 que decía —
siguiendo el record equivocado — que «Terminos» debía pasar a usar `CabeceraDeColeccion`
**porque ésa era la forma de Web**. **Con esta decisión, ese punto ordenaría lo contrario de lo
que el operador quiere.** Se enmienda su `full_description` en el mismo turno, antes de que
ningún taller lo lea.

**Y la pieza compartida se arregla antes que sus consumidores:** el run de estandarización se
inserta **por delante** de los dos del porte.

---

## REGLA NUEVA DEL OPERADOR — LA RECOMENDACIÓN DE MODELO Y ESFUERZO VUELVE

> **«cuando hagas sesion nueva en un ticket recuerda siempre darme el modelo ye sfeurzo
> recomendado»**

**Sustituye a la regla anterior**, que decía que a este operador **no** se le recomendaba modelo
ni esfuerzo. **Desde el 2026-08-27, toda respuesta que preceda a un ticket declara las tres
juntas: MODELO, ESFUERZO y SESIÓN.** La sesión ya se declaraba siempre; las otras dos vuelven.
