# #221 · La parada de análisis se celebró: se encarga con las entradas corregidas

**Fecha:** 2026-10-03 · **Run:** `#221` `RUN-CANTU-COMPONENT-PETITIONS-ANALYSIS-STOP-001`
«ANALYSIS STOP — the component petitions, read together» · `planned → active` tras esta decisión.

---

## La decisión, verbatim

> vamos con tu recomendacion

**Es una aceptación de la opción A que recomendó la cabina, no una elección redactada por él.**
Queda marcada como acuerdo sobre opciones que la cabina dibujó (trampa H). Las opciones salían de
una medición de la cabina hecha antes de preguntar (2026-10-03, 01:27–01:28 UTC), y se le preguntó
por la PREFERENCIA, no por un hecho de pantalla.

Las tres opciones que se le dibujaron:

- **A — elegida:** un solo taller de análisis con las entradas corregidas. Entran «Pregunta», «El
  porqué», «Lo que te llevas», el interior de la Tarjeta, `calculation` (exponer lo que ya existe),
  el HTML en columna y la Nota desplegable con fórmulas. Punto de partida: el criterio del ancho que
  aprobó el 2026-08-12. Entrega la respuesta a la pregunta común y un orden de runs, y PARA.
- **B — descartada:** sacar `calculation` a un run corto propio. Descartada porque dónde vive
  `calculation` ES la pregunta común.
- **C — descartada:** posponer la parada hasta después de la migración. Descartada porque cuantas
  más lecciones se migren, más se rehace si la forma cambia.

## Lo que la medición de la cabina cambió en la premisa del run

- **El bloque de procedimiento sale de la parada:** lo construyó el `#214`, pass del 2026-09-21.
- **Los dos «undefined»** (`split`, `iconList`) probablemente los cerró el `#210`. Su cierre nombra
  `iconList`, no `split`. Se verifican, no se reabren.
- **`calculation` ya existe en el motor Web** (`renderCalculation.js`, 82 líneas, paleta propia con
  colores escritos a mano), pero solo lo enruta «Dos columnas». Ni el compilador, ni el esquema, ni
  el editor. Es el quinto caso de «capacidad en el motor, cerrada en el esquema».
- **La pregunta común ya tiene un criterio aprobado en disco:** el `#61` y el `#62`, más su QA del
  2026-08-12, retiraron de «Dos columnas» tres tipos anchos como rechazo de **alcance**. El criterio
  es el ancho.
- **Los hexadecimales de L01:** la cabina contó 25 de seis dígitos en todo el fichero (7 son
  `#5E81AC`). El texto del run decía 18, sin alcance declarado. El taller lo remide.
- **Entra la petición pequeña** del documento de Lecciones: que la Nota desplegable tipografíe
  fórmulas.
