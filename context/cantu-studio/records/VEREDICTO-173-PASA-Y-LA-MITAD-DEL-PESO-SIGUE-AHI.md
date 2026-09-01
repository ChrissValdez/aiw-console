# VEREDICTO — `#173` «Emit each component stylesheet once per file, not once per instance»

**Fecha:** 2026-09-01 · **Run:** `RUN-CANTU-WEB-INTRA-FILE-STYLE-DEDUP-001`
**Emisor:** Christopher Valdez Cantu · **Vehículo:** en la respuesta, cinco pasos

---

## El veredicto, VERBATIM

```
pass
```

---

## Lo que se le pidió mirar, y cómo hay que leer ese «pass»

La hoja tenía cinco pasos, dos de ellos con consecuencia de parada:

1. ⛔ Web antes/después lado a lado, saltando entre pestañas — **tienen que verse idénticas**
2. Redimensionar la ventana en «después» — tablas y fórmulas se reajustan
3. ⛔ Slide antes/después, recorriendo todas las diapositivas
4. Moodle: subir el `.MOODLE.html` de después a su página
5. Una lección suya, tras cerrar y reabrir el lanzador

**El operador contestó con un `pass` global, no con cinco líneas.** Se registra como aprobación
del conjunto, y se deja escrito aquí que **no hay detalle por paso**: si más adelante aparece
un defecto en la superficie de alguno, este veredicto no permite decir cuál de los cinco lo
cubría. Es la forma en que él contesta cuando no hay nada que reportar, y se ha comportado así
en runs anteriores.

## Qué queda sin mirar, declarado

Nada de la superficie visual: la pareja antes/después cubría los tres carriles —WEB, SLIDE y
MOODLE— construida desde la misma fuente el mismo minuto.

**Lo que este `pass` NO cubre y no pretendía cubrir:** el peso que sigue en el fichero. El run
capturó el desperdicio de identidad exacta y **dejó 1435,9 KiB en SLIDE que no puede alcanzar**.
Eso no es un defecto del run: era su condición de parada, se levantó como PARA Y REPORTA 1, y
el operador ya decidió sobre ello — abrió `#174` como piloto para atacarlo.

## Rompe la racha de cierres sin QA

`#165` y `#167` cerraron **sin QA ejecutada**, dos seguidos sobre la misma superficie, y así se
declaró en su momento. **`#173` sí tuvo QA ejecutada por el operador.** La racha queda rota y
conviene que quede escrito, porque el riesgo que se estaba acumulando era acumulativo y ahora
no lo es.

## Decisiones del operador en el mismo turno

Aprobó las tres recomendaciones de la cabina: abrir el run del reparto código/datos, borrar los
huérfanos de `dist/author_lite` y borrar los respaldos `.intacto-r2`. Ejecutadas y verificadas
en los commits `524a5931` y `5fd9d3c9`.
