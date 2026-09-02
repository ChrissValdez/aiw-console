# VEREDICTO Y DECISIÓN — `#178` «Define the asset emit surface»

**Fecha:** 2026-09-01 · **Run:** `RUN-JAME-ASSET-EMIT-SURFACE-001`
**Entregable juzgado:** `docs/architecture/ARCHITECTURE-ASSET-EMIT-SURFACE.md` (222 líneas)
**Commit del entregable:** `26d30f0a`

---

## Lo que dijo el operador, VERBATIM

```
tomo tus reocmendaciones procede
```

Aceptó **las tres** recomendaciones que se le dieron juntas:

1. **QA: `pass`.**
2. **Decisión de la Regla 5.6: opción `A`** — lanzar en los tres fallos de declaración.
3. **La enmienda de la 5.6 y la compresión 4h.G van en UN solo run documental**, después
   de la integración.

**Es una aceptación GLOBAL, sin detalle por punto.** Ningún punto de la QA tiene veredicto
propio, y de ninguno consta que se mirara por separado.

---

## ⚠ EL ALCANCE, Y NO SE PUEDE DEJAR CAER

**El operador no leyó el documento.** Preguntó *«como hago el QA nen que superficie ?»*, la
cabina le explicó que este run no produce nada mirable y que los cuatro puntos resumidos
eran el QA entero, y él pidió recomendaciones y las tomó.

**Es el SEGUNDO run seguido aprobado sobre resumen de la cabina y no sobre el documento**
—el primero fue `#176`—, y se nombra aquí explícitamente para que quede contado. En este
caso, a diferencia de `#176`, **no se le entregó el texto literal de ninguna regla**: los
cuatro puntos fueron paráfrasis de la cabina, incluido el de parada.

La cabina se lo advirtió en el mismo turno: *«estos runs de diseño no tienen QA visual, y
la tendrán `#179` en adelante, cuando se cree código y haya salida que mirar»*.

---

## El matiz que la cabina puso sobre la mesa antes del `pass`

**El diseño NO elimina la propagación entre componentes. La hace ruidosa.** Si once
componentes comparten un cuerpo y el dueño lo cambia, cambia para los once — eso es
propagación, y es el propósito de compartir. Lo que el diseño garantiza es que no ocurra
**en silencio**: `INV-8` de `#176` lanza ante dos versiones del mismo cuerpo bajo un
nombre, `INV-S4` lanza si alguien descongela la tabla, `INV-S1` lanza si un cuerpo alcanza
fuera de su documento.

Las palabras del operador eran *«reduzco el riesgo de propagación de errores de forma
silenciosa»*. **El diseño cumple eso literalmente, y no promete cero propagación.** Se le
dijo antes de pedirle el veredicto, y aprobó con esa distinción delante.

---

## La decisión de la Regla 5.6, y por qué se decidió así

`#176` Regla 5.6 manda caer al inline con contador cuando el registro no resuelve, y
**seguir construyendo**. Bajo la superficie por import, tras la migración **no existen bytes
inline a los que caer**: el paso 6 del capítulo 5 borra el literal. El contador atado pierde
su referente.

Tres fallos posibles, y **sólo uno tenía alternativa material**:

| fallo | ¿hay cuerpo que emitir? | alternativa |
|---|---|---|
| `assetId` desconocido | no | ninguna |
| cuerpo sin publicar | no | ninguna |
| **ranuras que no cuadran** | **sí** | un fallback contado era posible |

**Se eligió A: lanza en los tres.** El argumento que decidió no fue doctrinal sino **dónde
aparece el fallo**:

- **A** para el build **en el terminal del operador**, en compilación, antes de que el
  artefacto exista. Ninguna lección publicada se ve afectada.
- **B** habría dejado seguir el build y publicado un cuerpo con una ranura sin valor, que en
  ejecución se lee como `undefined` **en la lección, delante del alumno**, sin crecer un byte
  y sin que el contador lo delate, porque cuenta fallbacks y no consecuencias.

**B convierte un fallo barato del operador en uno caro del alumno, y además silencioso** —
justo la familia de defecto contra la que se diseñó toda esta capa (`#176` Regla 1.3).

**Precio de A, declarado antes de decidir:** durante la migración, una declaración mal
escrita para el build en seco.

---

## LA DEUDA QUE ESTA DECISIÓN CREA

**La Regla 5.6 de `#176` queda con una enmienda pendiente en su propio documento.** Se agrupa
con la deuda que ya existía sobre ese mismo fichero —la pasada de compresión 4h.G, porque
quedó clavado en 250/250 y su primera corrección ya costó borrar una cláusula— en **un solo
run documental**, por la regla del operador de agrupar los arreglos del mismo componente. Se
ayudan: la compresión libera las líneas que la enmienda necesita.

**Corrección de la propia cabina, hecha al medir el terreno:** propuso ese run *«después de
`#179`»* y el operador lo aceptó así, pero al derivar la estructura de `O6` la cabina vio que
el sitio correcto es **después de `#180`**, la validación de equivalencia — porque es la que
de verdad puede desmentir cosas del diseño, y enmendar dos veces el mismo documento es lo que
esta cadena ya pagó caro. La enmienda es puramente documental y no bloquea a nadie, así que
retrasarla una posición no tiene coste. **Se declara como ajuste de la cabina, no como algo
que el operador aprobara.**
