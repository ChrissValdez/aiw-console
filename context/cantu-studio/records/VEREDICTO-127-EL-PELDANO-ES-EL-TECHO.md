# VEREDICTO 127 — el peldaño es el techo, y el motor vive fuera del renderizador

> Run: `RUN-CANTU-SLIDE-CELL-GEOMETRY-FIT-001` · `queue_order` 127.
> Operador **Christopher Valdez Cantu**, **2026-08-20**. Transcrito **VERBATIM**.

---

## SUS PALABRAS, ÍNTEGRAS

```
el ittulo de regla matematica deberia estar centrado

respecto a este run pass
```

---

## PARTE 1 — EL RUN PASA, Y SU ACIERTO ES DÓNDE PUSO EL MOTOR

El modelo **B** queda construido: **el peldaño que el autor elige es el máximo, no el fijo.**
Si cabe se pinta; si no, baja hasta caber; **y nunca sube por encima** —tope `k=1`, así que
«Automático» no vuelve por la puerta de atrás.

**LO QUE HACE QUE ESTO SEA POSIBLE ES DÓNDE VIVE:** `fitEngine.js` se inyecta desde **los dos
cascarones del documento** y **jamás desde `renderSlides()`**, que es lo que los 63 árboles
fijados capturan byte a byte. **Verificado por la cabina: cero cambios en `renderSlides.js` y en
`layouts/`, y cero de 63 árboles movidos.**

Si cabe, **no escribe ni un atributo**. Si no cabe, baja toda la celda por un mismo factor
—texto y longitudes `rem` en línea, incluidos los armazones que son proporción declarada de la
letra; las constantes de familia en `px` no se tocan—. Y **lo que pasa se declara en el DOM**.

**El taller re-midió las cifras del ticket y ganó el disco:** la Regla se sale **69/122/182/265
px**, no 67/118/179/261. Las del ticket eran fechadas.

**Y el criterio 6 se resolvió sin tocar el reparto de filas:** con pistas `fr`, cada celda
negocia solo con su banda.

---

## PARTE 2 — DOS DECISIONES ACEPTADAS POR EL «pass», NO CON SUS PALABRAS

| | Qué quedó | Reversible |
|---|---|---|
| **El suelo** | **12 px** — el más alto que aún resuelve su captura; con 14 se queda a 11 px | una línea |
| **El aviso al autor** | **pasa callado** cuando el texto baja del peldaño pedido | una línea |

Se le entregaron **tres HTML para comparar mirando** el suelo, y **tres salidas dibujadas** para
el aviso. **Su «pass» las acepta tal como se entregaron.** Se registra así —aceptadas por el
pass y no con sus palabras— porque es el cuarto caso de esta cadena y conviene que la cuenta
esté escrita.

**La razón del aviso callado la puso él mismo sin saberlo:** un aviso convertiría cada celda
apretada en una decisión suya, que es exactamente lo que le molestaba del «Automático».

---

## PARTE 3 — LO QUE ESTE RUN NO RESUELVE, Y ESTÁ BIEN NOMBRADO

**EL VÍDEO.** La B no lo resuelve sola: **un vídeo no encoge de letra.** Necesita su propia
decisión —franjas 16:9, huella mínima, o recorte—. Queda excluido del motor y pinta como ayer.

---

## PARTE 4 — UN DEFECTO DE LA CABINA EN GIT, DETECTADO MIDIENDO

**El commit de `#126` dejó fuera `SlideRuleMathField.jsx`, y con él la rama quedaba sin
compilar:** `SlideItemEditor.jsx` entró **con su `import`** y el fichero importado **no entró en
ningún commit**.

**Causa:** la cabina usó `git add -u` sobre directorios en vez de añadir por nombre. **`-u` solo
escenifica modificaciones de ficheros ya seguidos; los nuevos no los ve.** En el árbol de trabajo
no se notaba porque el fichero sí estaba en disco.

**Lo detectó la cabina midiendo el `git status` del run siguiente**, no una revisión. Corregido
en un commit propio, junto con el packet y el HTML de aquel run, que se quedaron fuera por lo
mismo.

**La regla violada estaba escrita** —«el `add` va siempre dirigido por nombre»— y **falló por el
lado contrario del que la regla teme**: en vez de arrastrar de más, dejó de menos.

---

## LO QUE PIDIÓ EN EL MISMO MENSAJE, Y NO ES DE ESTE RUN

> *«el ittulo de regla matematica deberia estar centrado»*

Es superficie de `RUN-CANTU-SLIDE-RULE-ADMIT-AND-IMPLEMENT-001`, **ya cerrado**. No se reabre:
se corrige hacia adelante. **Se suma a la lista de acabados pendientes**, que a estas alturas
tiene siete entradas y conviene agrupar en vez de abrir un run por cada una.
