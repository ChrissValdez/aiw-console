# VEREDICTO — `#176` «Design the Asset Registry»

**Fecha:** 2026-09-01 · **Run:** `RUN-JAME-ASSET-REGISTRY-DESIGN-001`
**Entregable juzgado:** `docs/architecture/ARCHITECTURE-ASSET-REGISTRY.md` (250 líneas)
**Commit del entregable:** `3bca05e5`

---

## El veredicto, VERBATIM

```
pass
```

**Es un `pass` GLOBAL. NO hay detalle por punto.** El operador aprobó el conjunto,
que es como contesta, y así queda registrado: **ninguno de los cinco puntos tiene
veredicto propio**, y de ninguno consta que se mirara por separado.

---

## ⚠ EL ALCANCE DEL VEREDICTO, Y NO SE PUEDE DEJAR CAER

**El operador aprobó sobre un RESUMEN escrito por la cabina, no sobre el documento
de 250 líneas.** Lo pidió él —«explícame qué se hizo en este run y por qué quieres
que lea un documento para el QA»— y la cabina recomendó el resumen porque los
hechos ya estaban verificados contra disco y lo que faltaba era juicio.

**Consecuencia, declarada y no disimulada:** el `pass` cubre las cinco decisiones
tal como la cabina las presentó. **No es una lectura del documento.** Si el resumen
tradujo mal una regla, el `pass` heredó el error.

**La mitigación que sí se tomó:** en el punto 1 —el único con consecuencia de
parada— la cabina entregó el **texto original y literal** de las Reglas 5.1, 5.2,
5.6 y del tercer caso de la 5.5, precisamente para que ese juicio no pasara por una
paráfrasis. Los puntos 2 a 5 sí se juzgaron sobre paráfrasis de la cabina.

---

## Los cinco puntos que se le presentaron

1. **Autocontención — el de parada.** Un `assetId`, un solo dueño; los demás piden,
   no redefinen. Dos cuerpos distintos bajo un mismo `globalName` **lanzan al
   emitir** en vez de dejar que el primero gane en silencio. Si el registro no
   resuelve, cada componente vuelve a emitir lo suyo, como antes de compartir.
2. **Parametrizar puede ser reescribir, y se presupuesta.** Clase de coste por
   activo, decidida por lo que el cuerpo hace al parsearse y no por lo poco que
   varíe.
3. **El orden de una migración.** Censo primero; una guarda que el cambio rompe se
   sustituye, nunca se borra; los árboles se re-fijan al final y a mano.
4. **Las ocho invariantes atadas**, y las que el documento declara **no** atables,
   con su razón.
5. **La frontera con `#177`.**

**Coste declarado al pedirla:** ~10 minutos. **Vehículo:** resumen en la respuesta
del chat, por decisión del operador.

---

## LO QUE ESTE VEREDICTO NO CUBRE

**El defecto de la Regla 4.4, que sigue ABIERTO.** La cabina lo encontró
verificando, DESPUÉS de que el taller entregara y ANTES de pedir la QA, y **no se
metió en la hoja de QA**: no es un juicio del operador, es un hecho falso sobre el
disco.

> La Regla 4.4 afirma en presente que el cuarto documento completo de
> `previewRenderer.js` —el del `catch` de `renderSlidesDraftPreviewHtml`— «lleva su
> exención en un comentario al lado». **Medido: no existe tal comentario en todo el
> fichero.** `INV-5` está especificada contra ese estado inexistente, así que tal
> como está redactada fallaría el día que se implemente.

El operador eligió corregirlo **antes** de cerrar `#176`, y agrupado en un solo
encargo con lo que saliera de la QA. Como la QA salió `pass` sin ítems, **el
encargo se reduce a este defecto**.

---

## Cómo se llegó aquí, para que el record no mienta por omisión

El operador **no leyó el documento**. Preguntó por qué se le pedía leerlo, la
cabina se lo explicó, pidió recomendación y la cabina recomendó el resumen. **La
decisión de no leer el documento fue informada y es suya**; la recomendación de no
leerlo fue de la cabina.
