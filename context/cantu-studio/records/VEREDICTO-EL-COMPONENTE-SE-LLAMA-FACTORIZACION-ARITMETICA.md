# VEREDICTO DEL OPERADOR — el componente se llama «Factorización aritmética»

> Dado por **Christopher Valdez Cantu** el **2026-08-28**. **Verbatim.**
> **Cierra una decisión que llevaba abierta desde `RUN-CANTU-ARITHMETIC-MATRIX-MODE-001`**, donde
> el propio catálogo declaró que el nombre era *«una propuesta, no una decisión cerrada»*.

---

## VERBATIM

> **«quisiera cambiar el nombre de calculo aritmetico a factorizacion aritmetica»**
>
> **«va mas acorde a lo que hace el componente»**
>
> **«eso no cambia funcionamiento es nadamas cambio del titulo»**

Y sobre la objeción escrita que se le puso delante: **«si»**.

---

## LA OBJECIÓN QUE HABÍA ESCRITA, Y POR QUÉ SE DESCARTA

**El catálogo lleva esto dentro del propio componente:**

> «`RUN-CANTU-ARITHMETIC-MATRIX-MODE-001`. **«Factorización» dejó de ser cierto**: el bloque tiene
> dos modos y factorización es UNO. El nombre nuevo describe el componente, no uno de sus modos.
> **PENDIENTE DEL VEREDICTO DEL OPERADOR:** la superficie author-facing es suya y esta redacción
> es una propuesta, no una decisión cerrada. El identificador interno `arithmetic` NO se renombra.»

**PRIMERO, LO QUE NO ES:** esto **no deshace una decisión cerrada**. El texto dice, con todas las
letras, que estaba **esperando el veredicto del operador**. **Ahora lo tiene.**

**Y SEGUNDO, LA OBJECIÓN ERA UN ERROR DE LECTURA — medido el 2026-08-28:**

| modo | lo que siembra el botón |
|---|---|
| factorización | «Descomposición del 360» |
| matriz | **«MCD de 30, 45 y 60»** |

**LOS DOS MODOS FACTORIZAN.** Uno descompone **un** número; el otro descompone **tres a la vez**
para sacar el máximo común divisor. Aquella objeción trató «factorización» como **el nombre de un
modo** y no como **lo que hacen los dos**.

> **Así que «Factorización aritmética» no sólo es lo que el operador quiere: es MÁS cierto que el
> nombre que lo sustituyó.** Y pasa la prueba que este proyecto le aplica a todo nombre — **seguirá
> siendo verdad dentro de seis meses**, porque describe la operación, no una de sus dos formas.

---

## QUÉ CAMBIA Y QUÉ NO

**Cambia:** la **etiqueta que el autor ve**, en los **dos carriles**.

**NO cambia:** el identificador interno `arithmetic`, que **no se renombra** —eso tocaría Core,
los fixtures y el compilador por una razón cosmética, y ya está descartado por escrito—. Ni el
comportamiento, ni un solo campo. **Palabras del operador: «eso no cambia funcionamiento, es
nada más cambio del título».**

## EL COSTE, MEDIDO

- La etiqueta vive en el **catálogo** y en **`WEB_COMPONENT_UI`**, que es de donde diapositiva la
  **deriva** en vez de teclearla — así que **los dos carriles se mueven desde un sitio**.
- **HAY UNA GUARDA QUE FIJA LA CADENA EXACTA**, con estas palabras: *«con esa tilde y esas dos
  palabras»*. **Se mueve con el nombre. NO se afloja** — y ojo, que el nombre nuevo también tiene
  tilde y también son dos palabras.
- **73 ficheros nombran la cadena**, pero la mayoría son comentarios y material de `QA/temp`.
  **Cuáles son superficie viva y cuáles son historia lo separa el run**, no este record.

---

## LO QUE EL RUN TIENE QUE HACER CON EL COMENTARIO VIEJO

**No se borra.** Se actualiza diciendo **quién decidió, cuándo, y por qué la objeción de
`RUN-CANTU-ARITHMETIC-MATRIX-MODE-001` se descarta** — que es el idioma de este proyecto: **se
corrige hacia adelante y la traza se queda.**
