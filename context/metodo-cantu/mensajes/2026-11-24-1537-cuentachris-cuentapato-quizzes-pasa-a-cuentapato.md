# `cantu-quizzes-latex` pasa a cuentapato

- **De:** cuentachris · **Para:** cuentapato · **Escrito:** 2026-11-24 15:37 UTC
- **Repo o área:** cantu-quizzes-latex (Quizzes, CQL)
- **Qué pide:** que tomes el repo y cambies su línea de `ASIGNACIONES.md`. ¿Necesita respuesta? sí: una línea cuando lo tomes
- **El encargo, si lo hay:** los tres de abajo, ya escritos en el repo
- **Palabras del operador:** abajo, tal cual.

## El sí de Chris

Lo dijo en la sesión que suelta el repo, la del coordinador en la Cuenta Chris (D-087, respuesta 1). Antes se le explicó qué
quedaba pendiente y cuánto pesaría en tokens. Sus palabras, tal cual:

> si no es tan pesado entonces si mandaselo a la cuenta Pato

**Lo que cambia en el registro:**
- En el PR 1 (fe16441), `ASIGNACIONES.md` todavía dice `cantu-quizzes-latex · cuentachris · activo`.
- Cámbiala a `cuentapato · activo`, con fecha 2026-11-24 y estas palabras en «Nota». Hazlo en el PR, o en `main` si ya se fusionó.
- **La Cuenta Chris suelta el repo:** CQL_Cabina hizo su cierre (`0f5b7c2` en el repo y `3daff28` en aiw-console) y está archivada.
- Desde PC-Chris nadie escribe en `cantu-quizzes-latex` desde las 15:29 UTC.

## Por dónde empezar

1. **Lee el relevo:** `context/handoffs/cantu-quizzes-latex.md` (3daff28). Te manda al bloque «🧭 DÓNDE ESTAMOS — 2026-11-24»
   de `PAA/HANDOFF.md`, a `CABINA.md` y `AGENTS.md` del repo, y a `context/cabinas/quizzes/MEMORIA-PC-CHRIS.md` y
   `context/cabinas/MEMORIA-COMUN.md`.
2. **Los tres talleres pendientes:** sus encargos están emitidos (`cb9f952`). Sus tarjetas vivían en la sesión archivada, así
   que se lanzan desde el encargo. Este es el orden que le propuso el coordinador a Chris para gastar poco:
   1. **`PAA/tickets/quiz-propiedades/PROP-QUIZ.md`.** Es el que más urge: es el primer quiz del curso. Es ligero: revisa las 65
      preguntas y mueve unas 7 a Operaciones o a Fracciones.
   2. **`PAA/tickets/esencial-alg/ESENCIAL-ALG.md`.** Ligero y casi mecánico: la etiqueta de Moodle `ruta-esencial` en 774 de las
      1 019 preguntas.
   3. **`PAA/tickets/nuevas-fg/NUEVAS-FG.md`.** Es el más pesado: preguntas nuevas de la fórmula general, y después
      VERIF-NUEVAS-FG, la verificación ciega, cuyo encargo está por escribir. Sonnet para lo mecánico y Opus para la ciega.
3. **Después, BUILD-FINAL-4,** una sola vez y con todo junto: compila los cuatro documentos, aplica `ruta-esencial` y escribe
   una guía de QA nueva. Al final viene la importación a Moodle, que todavía no tiene encargo.

**Lo que espera de Chris, y no te toca:** la QA de BUILD-FINAL-3, sin respuesta desde el 11-06 (guía en
`PAA/tickets/build-final-3/qa-visual-FINAL-3.md`), y las decisiones chicas del relevo: RW-81, MCM o mcm, tres códigos, borrar
las 12 ramas `claude/*` y dos ficheros basura.

## Cuidado con el aparato

- **Compilar necesita TeX Live 2025 (xelatex) y `pdftotext`.** En PC-Chris están. En laptop-Chris y en PC-Pato no se ha
  comprobado. En la nube, TeX se instala cada vez (unos 5 min). Los dos primeros talleres no compilan el libro entero, pero
  BUILD-FINAL-4 sí.
- **Las 25 herramientas activas** tienen las rutas arregladas desde la mudanza (`81cf90d`), pero **ninguna se ha vuelto a
  correr** [NO VERIFICADO]. Corre una en seco antes de confiar en ella.
- **LECCIONES espera estos talleres.** Como LECCIONES también es tuya, el aviso de «integrado» queda entre tus sesiones.
