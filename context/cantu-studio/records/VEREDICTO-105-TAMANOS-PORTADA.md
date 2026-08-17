# VEREDICTO DEL OPERADOR — `#105` `RUN-CANTU-SLIDE-TITLE-SLIDE-TYPE-SCALE-001`

> **Recogido por la cabina el 2026-08-16.** El operador ejecutó la QA de los siete pasos y dio
> **PASS**. Sus palabras, verbatim:

    mea grada pass

    puedes cerrar y abrir el siguiente

**Es un pass limpio y sin reservas**, y es el primero de la sesión que llega **con la QA
ejecutada paso a paso**. Los dos anteriores fueron: uno sin QA —la reacción derivó a rediseño—
y otro con pass pero comentarios de diseño encima.

---

## LO QUE EL TALLER LE CONTRADIJO A LA CABINA, Y TENÍA RAZÓN

**Es lo más importante de este run y no lo descubrió ninguna QA: lo descubrió el taller
midiendo lo que el ticket afirmaba.**

El ticket de la cabina decía que los 1536px de la descripción eran **«exactamente el
`max-width` que `.j-title-main` ya declara»**. **Es falso.** Verificado por el taller y
re-verificado por la cabina:

    .j-title-slide-container:  width 1920px · padding 0 5rem · box-sizing border-box
    caja de contenido:         1920 − 160 = 1760px
    max-width: 80% del título:  1408px          ← el tope REAL del título
    max-width de la descripción: 1536px         ← 128px MÁS ANCHO

**Los dos topes no son el mismo límite.** La cabina afirmó una identidad sin comprobar contra
qué resuelve el porcentaje, que es la primera pregunta que había que hacerse.

**Y el taller lo dejó así a propósito, con la razón correcta:** los números los aprobó el
operador **mirando el renderizado real** —donde el título ya rompía en 1408px— y son suyos;
igualar los topes exigiría mover el título, que el run declaraba sin cambio. **La medición
quedó escrita en la cabecera del motor y clavada por prueba.**

**Queda abierto, sin decidir:** si los dos textos deben romper contra el mismo límite de
verdad. Es decisión del operador mirando, no corrección de taller.

## DOS DECISIONES DEL TALLER QUE EL PASS ACEPTA POR OMISIÓN

Se anotan porque **el pass no las nombró** y conviene que consten como aceptadas y no como
inadvertidas:

1. **No hay opción «Automático»** en los tres desplegables de tamaño. Razón del taller: aquí no
   cuesta un píxel porque «Mediano» ya es lo de hoy, y es lo mismo que aceptó la Tarjeta.
   Consecuencia declarada: el formulario guarda `'medium'` explícito al montar.
2. **La descripción no tiene selector de tamaño.** El operador nombró tres superficies —título,
   subtítulo y etiqueta— y el taller no abrió la cuarta por su cuenta.

## UN LÍMITE DE LA CABINA, RE-MEDIDO Y PEOR DE LO QUE DECÍA EL RELEVO

`webCorpusFixtureNet.test.mjs` —**justo la prueba que este run re-ancló**, con sus 25 árboles—
**no cabe en una llamada de la cabina**, y ahora se sabe el motivo exacto: **el tope real por
llamada son unos 178 segundos, aunque se pidan 600.** La cabina **no ha visto correr esa
prueba** en este run. Se declara.
