# VEREDICTO DEL OPERADOR — `#106`, ronda 2 (la cruz)

> **Recogido por la cabina el 2026-08-16.** El operador ejecutó la QA con la cruz delante.

## SUS PALABRAS, VERBATIM

    mejoro solo hay que hacer masg randes los botones de las flechas

    Y cuando los pones al centor se deja de leer el nombre del ocmponetne y el tipo de comopnente hay que hacer que se siga leyendo abajo de la flechas en cruz

## LECTURA DE LA CABINA

**La cruz le sirve: «mejoró».** Pide dos cosas de tamaño y de sitio:

1. **Botones más grandes.** Hoy miden 16px.
2. **El nombre y el tipo del componente vuelven, y van DEBAJO de la cruz.**

**Y eso es exactamente la variante que el taller dejó declarada en su packet** —conservar el
nombre y ocultarlo sólo cuando no quepa—. El operador la está pidiendo sin haberla leído.

## LAS DOS PETICIONES SE PELEAN ENTRE SÍ, Y HAY QUE DECÍRSELO CON NÚMEROS

Botones más grandes **suben** la altura de la cruz; devolver el texto **necesita** altura. En la
celda más pequeña las dos no caben a la vez. Lo que decide si eso importa es **qué celda es «la
más pequeña» de verdad**, y ahí la ronda 2 se midió mal.

## LA INCOHERENCIA DE LA RONDA 2 — medida por la cabina, y juega a favor del operador

**El taller usó dos varas distintas para el mismo espacio de casos, y lo hizo en el mismo
reporte:**

- **Para las cifras del veto** descartó el 4×4 con razón escrita: *«el 4×4 aporta él solo
  524 288 de las 578 305 configuraciones y **ninguna plantilla lo ofrece**»*. Sus porcentajes
  los calculó **sólo sobre las geometrías que las plantillas alcanzan**.
- **Para decidir que el texto no cabe** usó **la celda del 4×4** —127,75 × 69,5 px—, que es
  precisamente el caso que acababa de descartar por inalcanzable desde plantilla.

**Medido por la cabina en `slideGridGeometry.js`:** las **seis** plantillas son `1×1`, `2×1`
(iguales), `2×1` (35/65), `3×1`, `2×2` y `3×2`. **El máximo de filas que ofrece cualquiera es
DOS.** Con dos filas la celda es el doble de alta que con cuatro, y la cruz de 50px más el
texto de ~27px —77px— **sí cabe**.

**El 4×4 sigue siendo alcanzable a mano**, porque el contrato lo permite hasta `4×4`. Así que el
caso pequeño existe; lo que no es, es el caso común. **La regla correcta no es «nunca se
escribe» ni «siempre se escribe»: es que se escriba cuando quepa.**

## LO QUE ESTO NO ES

**No es un fallo del taller.** Sus dos mediciones son correctas por separado y la segunda venía
de una pregunta legítima —qué pasa en el peor caso del contrato—. Lo que falló fue **aplicar el
peor caso del contrato como si fuera el caso normal**, después de haber demostrado en el mismo
reporte que no lo es.
