# VEREDICTO DE QA de `#150` — PASS — y la descripción del paso pasa a OPCIONAL en diapositiva

> Dado por **Christopher Valdez Cantu** el **2026-08-28**. **Verbatim.**

---

## VERBATIM

> **«jalo, pero tengo una cosa que mencionar»**
>
> **«la descripcion del paso debe ser opcional no obligatoria en slide»**
>
> **«ahorita si no lo pongo marca error»**

**PASS en los cinco pasos**, incluido el 5 —el del corpus—, que era el único que cambiaba
contenido que ya existía.

---

## ⚠ Y ANTES, UNA CORRECCIÓN DE LA CABINA SOBRE SU PROPIO MATERIAL DE QA

**El paso 5 estaba mal planteado y lo dijo el operador:** *«esto no se puede hacer, mis archivos
de sandbox son js y draft le json, es decir tengo que recrearlos»*. **No hay camino de un `.js`
del corpus al editor.** Pedirle abrir la escena era pedirle recrearla.

**El material de QA lo produjo la cabina**, renderizando la escena con `buildSingleSlideLesson` —
**la función que el `#149` acababa de extraer**. Antes de ese run no habría sido posible sin
duplicar el cascarón.

**Y en el intento la cabina se equivocó dos veces, y las dos las cazó antes de publicar:**

1. **Su primera sonda dijo que la escena contenía «undefined».** Quitaba `<style>` pero **no
   `<script>`**, y el documento lleva el motor de encaje dentro. **Los 11 viven en el JavaScript;
   en el texto visible hay CERO.** El taller tenía razón.
2. **Intentó dar un «antes» y un «después» y le salieron idénticos byte a byte.** Podó el campo
   del dato esperando que el párrafo desapareciera —el motor lo emite con compuerta— y no cambió
   nada. **No se publicó: se borró el fichero.** La causa **no está averiguada**.

---

## LO QUE PIDE, Y EL PRECEDENTE QUE HAY QUE MIRAR

**`desc` debe ser OPCIONAL en diapositiva.** Hoy el run la dejó **obligatoria en modo matriz**,
copiando a Web, donde lo es «desde siempre».

**ESTE PROYECTO YA VIVIÓ ESTA MISMA FRASE.** El 2026-08-18, sobre la lista con etiquetas, el
operador dijo:

> «otro detalle, la etiquet y el titulo son obligatorios pero la descricpion es opcional»

**Y allí se eligió lo contrario de lo obvio:** se le ofrecieron dos salidas y eligió **hacerla
opcional TAMBIÉN en Web**, para que *«el contrato siga siendo UNO»*. Se descartó partir el
esquema porque **habría creado dos representaciones vivas del mismo contrato**.

## POR QUÉ AQUÍ LA RAZÓN DEL PRECEDENTE NO ATA — medido

**El caso de la lista era UN SOLO ESQUEMA compartido por los dos carriles**: hacer una parte
opcional exigía partirlo.

**Aquí ya son dos objetos distintos.** `SlideArithmeticStepSchema` existe aparte, y **deriva el
átomo de Web** —`ArithmeticMatrixStepSchema.shape.desc`— mientras la **obligatoriedad la pone la
regla relacional de cada carril**. Es el patrón que este componente ya usa: **el átomo es UNO, la
obligación es POR CARRIL** — igual que `div`, que es opcional en factorización y obligatorio en
matriz.

> **Así que hacer `desc` opcional en diapositiva NO crea una representación nueva.** Cambia una
> obligación, que es justo lo que ese esquema está diseñado para expresar por carril. **Y Web no
> se toca.**

**Y el motor ya lo aguanta:** el `<p>` sale **con compuerta**, escrito en este mismo run, y está
medido que una escena sin `desc` sale byte a byte como salía. **No hay riesgo de «undefined».**

---

## LA DIVERGENCIA, DECLARADA EN VEZ DE TAPADA

**Web seguirá exigiendo la descripción y diapositiva no.** Es una divergencia deliberada entre
carriles, pedida por el operador con el componente delante, **y va escrita** — para que nadie la
descubra dentro de seis meses y la lea como un descuido.
