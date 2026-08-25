# DECISIÓN — el gris de la nota, y la frontera de `L7`

> Tomadas por **Christopher Valdez Cantu** el **2026-08-25**, sobre las dos que el lote 1 de
> `#134` le devolvió. Pidió la recomendación de la cabina para proceder y la aceptó.

---

## 1 · EL GRIS DE LA NOTA CONVERGE A `meta`

Era la **cuarta pregunta** del troceo, y el operador la dejó **abierta a propósito** para
decidirla mirando. El lote 1 se la dibujó.

**Lo medido, y es lo que decide:**

| | `ctx` | `meta` |
|---|---|---|
| distancia al gris actual (ΔE) | 16,98 | 17,26 |
| contraste | 4,55:1 | **8,10:1** |
| coherencia | es el respaldo que el compilador ya declara | — |

**Los dos están a 0,28 de diferencia — por debajo del umbral de percepción.** A la vista son
el mismo color.

> **Por eso el desempate NO puede ser estético: tiene que ser funcional.** `meta` casi dobla
> el contraste, y cuando dos candidatos son indistinguibles, gana el que se lee mejor.

## 2 · LA FRONTERA DE `L7`: SE SIGUE, NO SE REVIERTE

El `§6` del encargo mandaba parar si **una línea de árbol se mueve sin cambiar un hex**.
Bajo esa letra **no hubo parada**: cero líneas.

Pero **`L7` —la guarda del lote 0— mide más estricto**: exige línea idéntica salvo hexes, y
las ocho insignias **ganan un atributo**.

**El taller siguió, y lo devolvió explícito** — «si lo lees como lo lee `L7`, esto es una
parada y se revierte». Devolver una ambigüedad de frontera en vez de resolverla por cuenta
propia es exactamente lo que hay que hacer.

**Se sigue, y por dos razones:**

- **La alternativa es peor por el mismo criterio.** Meter la tinta en el CSS movería
  **45 líneas sin cambiar ni un hex** — justo lo que `L7` existe para impedir.
- **`L7` se escribió antes de saber que haría falta.** Fijó la huella exacta del lote 0
  cuando nadie preveía que el lote 1 tendría que dar tinta a la insignia.

> **Una guarda que se pone roja porque el trabajo avanzó no está cazando un defecto: está
> pidiendo que la muevan.** Y se mueve declarándolo, que es lo que se hizo.

## LO QUE ESTA PAREJA DE DECISIONES DEJA DICHO

El lote 1 tuvo **dos preguntas y ninguna la resolvió el taller solo**: una porque el
operador la había reservado, y otra porque era una frontera ambigua del propio encargo. Las
dos volvieron con su medición delante.
