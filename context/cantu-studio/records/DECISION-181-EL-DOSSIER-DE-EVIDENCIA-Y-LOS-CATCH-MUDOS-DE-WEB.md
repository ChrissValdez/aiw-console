# DECISIÓN DEL OPERADOR — `#181`: el dossier de evidencia y los `catch` mudos de web

**Fecha: 2026-09-02** · **Run:** `RUN-JAME-ASSET-REGISTRY-DOC-AMENDMENT-001`
**Commit del trabajo:** `a5ddfe4f`

---

## Lo que dijo el operador, VERBATIM

```
vamos con tus recomendaciones
```

Aceptó las **tres**, todas en su opción **A**.

---

## ⚠ LA FECHA, Y ES UN FALLO DE LA CABINA DE LOS QUE TIENE TIPIFICADOS

**Hoy es 2026-09-02.** La cabina midió `2026-09-01` al abrir la sesión y **siguió usando esa
fecha veintidós horas**, hasta que el taller de este run fechó su banner en `2026-09-02` y la
cabina fue a cuestionarlo.

Es la **cuarta forma de fallar** de su propia configuración: *citar una medición PROPIA que
envejeció dentro de la misma sesión*. La fecha de apertura es tan fechada como un record.

**El banner del taller es el correcto.** Varios records de esta sesión en `aiw-console` llevan
`2026-09-01` y se escribieron el `02`. **No se reescriben.** Se corrige hacia adelante, y esta
es la corrección.

---

## Decisión 1 — la tabla de historial se queda

El documento es ahora **el único de los siete de `docs/architecture/` con tabla de historial**.
Ninguno la tenía; el criterio 4 del ticket la daba por existente y **era premisa falsa de la
cabina**. El taller tenía autorización para parar por la condición 5 y eligió no hacerlo,
derivando el formato de `DOCUMENTATION-BLUEPRINT.md` sin inventar una columna. Fue la decisión
correcta: parar habría bloqueado cuatro criterios sanos.

**Se queda.** Es información real, el formato sale del repo, y hace de precedente para los
otros seis cuando les toque enmienda.

---

## Decisión 2 — se abre un run de SPLIT de la evidencia

**El conflicto es real y lo midió el taller:** la regla 4h.G del Blueprint nombra los *audit
counts* como lo primero que hay que quitar de un documento de arquitectura, y este documento
tiene **cuatro tablas de medición**. Quitarlas lo dejaría en ~198 líneas. El ticket las
protegió, así que la compresión paró en **246 líneas con 4 de holgura**.

**Este documento no puede cumplir 4h.G y conservar sus mediciones a la vez.** La salida que el
propio Blueprint prescribe en 4b es el **split**: mover la evidencia a un dossier y citarla.

**Se abre run.** Aplazarlo significa que la próxima enmienda vuelve a no caber, y esta cadena
ya lo ha pagado dos veces: la corrección de la Regla 4.4 costó borrar una cláusula solo para
hacer sitio, y esta compresión no llegó al objetivo por el mismo muro.

---

## Decisión 3 — los `catch` mudos de web quedan como superficie viva, sin run

**Hallazgo del taller, verificado por la cabina en el fuente:** las dos puertas de compilación
web se tragan un fallo de renderizador **sin mensaje ninguno**. `buildSingleWebLesson.js` tiene
un `catch {}` con solo un comentario; la rama moodle de `main.js`, un `catch (e) {}` vacío. Un
renderizador que falle ahí **no emite su bloque y nadie se entera**.

**Son peores que los dos de diapositiva** que el operador ya decidió dejar en `#179`: aquellos
al menos pintan un mensaje. Pero son igual de preexistentes y ajenos a los activos, y **el
activo no viaja por web hoy**.

**Quedan nombrados, sin run.** Con ellos son **cuatro** las superficies que se tragan el throw,
no dos, y esa cifra corregida es lo que hay que recordar si algún día se reabre el
endurecimiento.

---

## El defecto menor que va al run de split

La Regla 5.6 enmendada dice que el throw *«lands instead in the operator's build, before the
artifact exists»*. **El artefacto sí existe**: se produce con el error dentro. Su propio párrafo
siguiente lo desmiente con etiqueta `[M]`, así que quien lea los tres lo entiende, pero la
cláusula sigue afirmando algo que el documento niega cuatro líneas más abajo.

**Son cuatro palabras y las corrige el run de split**, que va a tocar ese fichero de todos modos.

---

## Lo verificado por la cabina en este run

246 líneas contra un tope de 250; 0 caracteres no ASCII. **Nada normativo se movió**, contado a
los dos lados del cambio: etiquetas `[M]` 13, `[P]` 7, `[J]` 12 idénticas; 8 invariantes
idénticas; **19 reglas y ninguna desapareció**. La cláusula «*That ratio is the standard*»,
borrada en la corrección anterior solo para hacer sitio, está recuperada. Un solo fichero
tocado: 116 inserciones, 120 supresiones.
