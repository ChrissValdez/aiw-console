# VEREDICTO DEL OPERADOR — `#147`: se reapuntan las tres guardas, y la guarda `B` se arregla aquí bajo D-061

> Dado por **Christopher Valdez Cantu** el **2026-08-27**, sobre las dos preguntas de la ronda 2
> de `RUN-CANTU-EDITOR-PORT-WEB-FORM-SHAPES-001`. **Verbatim.**

---

## VERBATIM

> **«vamos con tu recomendacion»**

Se le pusieron **dos** preguntas, cada una con su recomendación explícita. Aprueba las dos:

1. **Las tres guardas rojas se REAPUNTAN**, sin tocar lo que afirman.
2. **La guarda `B` se arregla EN ESTE RUN, bajo D-061.**

---

## 1 · LAS TRES ROJAS — reapuntar no es aflojar

`B7`, `C` y `G` cayeron por **mudanza**: sus aserciones miran `SlideConceptGridFields.jsx` y el
rótulo se fue a `ItemDeColeccion`, en `SlideSplitFields.jsx`. **Ninguna es un fallo de
comportamiento.**

> **Una guarda que apunta a un sitio que dejó de ser el sitio está ROTA, no relajada.**

`G` es aparte: **la escribió el propio taller en la ronda 1 para caducar exactamente aquí**, y la
dejó roja a propósito para no mezclar su decisión con la del operador. **Se retira con nota.**

**Lo que afirman las tres no cambia ni una palabra, y eso lo verifica la cabina antes de
commitear** — no se acepta desde el reporte.

---

## 2 · LA GUARDA `B`, Y LAS CUATRO CONDICIONES DE D-061, UNA A UNA

**El defecto, verificado por la cabina el 2026-08-27:**
`slideConceptGridTermsFrame.test.mjs:127` hace
`region.slice(region.indexOf('grupos.map('))`, que **no cierra el `map`**: coge hasta el final de
la región y **se traga el botón «+ Agregar termino»**, que lleva `border` y `py-2`, y `esCaja` lo
cuenta como recuadro. **Así que `B` puede pasar con el recuadro del término borrado.**

**Y es un daño colateral del `#146`:** al pasar ese botón a la forma estándar punteada, se volvió
indistinguible de un recuadro para esa sonda. **Nadie lo hizo mal; se rompió al cambiar otra cosa.**

El taller lo probó **dos veces de forma independiente**: `M8` —quito el recuadro entero y `B` no
cae— y `M6` —muevo el botón fuera del recorte y `B` sí cae—.

### Las cuatro condiciones, y dos se declaran como tensión en vez de darse por buenas

**1 · La pide el operador por escrito.** ✅ Cumplida. Verbatim arriba, sobre una recomendación
que nombraba D-061 explícitamente.

**2 · Cae sobre la superficie que la QA ejercitó.** ⚠ **TENSIÓN DECLARADA.** La QA visual de este
run **todavía no se ha ejecutado**. Lo que sí es cierto: `B` vigila **«Terminos»**, que es
exactamente la superficie que este run está cambiando y cuya QA está pendiente. **Se cumple en
forma débil, y se dice en vez de taparse.**

**3 · No cambia la identidad del run.** ⚠ **TENSIÓN DECLARADA.** El `run_id` dice
`PORT-WEB-FORM-SHAPES`, y arreglar el recorte de una sonda **no es portar una forma**. No se
enmienda el identificador —enmendarlo dejaría la identidad mintiendo en todos los records
futuros—, así que **la tensión se queda escrita aquí y en el texto del run**.

**4 · El texto del run se enmienda en el MISMO encargo.** ✅ Cumplida. La cabina anexa el bloque
de ampliación al `full_description` **antes de emitir el ticket de la ronda 3**.

### Por qué aquí y no en un run propio

Vamos a abrir esos mismos ficheros de prueba de todas formas para reapuntar las otras tres. **El
diagnóstico ya está hecho, con dos pruebas independientes, y el arreglo es un `indexOf` que
cierre el `map`.** Abrir un run para eso **cuesta más en ceremonia que en trabajo**.

---

## LO QUE LA AMPLIACIÓN NO AUTORIZA

- **No autoriza tocar lo que `B` afirma.** Sólo **dónde recorta**. Si al cerrar el `map` la guarda
  se pusiera roja, eso significa que el recuadro del término **de verdad** no está, y **eso se
  para y se reporta**.
- **No autoriza revisar las guardas hermanas.** El taller declaró no haber comprobado si el mismo
  defecto de recorte se repite en otras. **Se nombra y se deja para otro run.**
