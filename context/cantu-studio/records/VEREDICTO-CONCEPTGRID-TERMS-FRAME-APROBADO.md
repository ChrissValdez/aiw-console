# VEREDICTO DE QA — `RUN-CANTU-EDITOR-CONCEPTGRID-TERMS-FRAME-001`

> Dado por **Christopher Valdez Cantu** el **2026-08-27**. **APROBADO.**

---

## VERBATIM

> **«pass»**
>
> y al desambiguarlo:
>
> **«si hice el qa y paso»**

---

## POR QUÉ HAY DOS FRASES, Y ES UNA LECCIÓN DE LA CABINA

El operador contestó **«pass»** a un turno donde la cabina le pedía **dos cosas a la vez**: el
veredicto de los tres pasos **y** una decisión de diseño. La misma palabra había significado
«paso de decidir» el turno anterior, en `#137`.

**La cabina no lo adivinó.** Preguntó, porque el registro cambia: *«cerrado con aprobación
visual»* y *«cerrado sin QA»* no son lo mismo, y el segundo hay que nombrarlo. La respuesta fue
que **sí ejecutó la QA y pasó**.

**REGLA QUE SALE DE AQUÍ, y va al relevo:** no juntar en el mismo turno un veredicto de QA y una
decisión de diseño. Se piden por separado, o al menos con etiquetas distintas, porque una
respuesta de una palabra no puede contestar a dos preguntas y **la cabina habría escrito un
registro falso si lo hubiera supuesto**.

---

## QUÉ SE LE PIDIÓ MIRAR

1. Editor · «Anatomía de fórmula» · zona de términos — que **no** haya recuadro grande envolviendo
   todos los términos, y que cada término **sí** conserve su cajita.
2. Los tres rótulos — «Terminos», «Etiqueta» y «Contenido» **alineados** en el mismo margen.
3. La previa de la diapositiva — **igual que antes**. Este run no toca el motor; si cambió, es
   defecto.

**Los tres, aprobados. Ningún `mal`.**

---

## ⚠ LO QUE QUEDÓ DIFERIDO, Y NO ES UN DEFECTO

**La separación de la colección.** Se le preguntó si, sin marco, los términos se separan bien de
«Etiqueta» y «Contenido». **Contestó «pass».** Se registra como **diferido**, no como aprobado.

**La propuesta ya está escrita y no se aplicó a propósito:** la misma línea `border-t` que ya usan
los pasos de «Procedimiento matemático» — **pieza existente, no inventada**. Vive en el §7.1 del
reporte del run. Aplicarla el día que quiera **cuesta una línea**.

**Y hay una segunda diferencia nombrada y no abierta:** «Terminos» sigue usando controles propios
—papelera con icono, botón punteado abajo— en vez de `CabeceraDeColeccion` / `ItemDeColeccion`.
Igualarlos exigía tocar lo que el criterio B del ticket prohibía, así que va como **propuesta**.

Las dos cosas caen sobre el mismo formulario que va a tocar
`RUN-CANTU-SLIDE-CONCEPTGRID-BADGE-INK-AND-TABLE-001`. **Se le vuelven a poner delante cuando ese
run se encuadre**, para que decida las tres juntas si quiere.
