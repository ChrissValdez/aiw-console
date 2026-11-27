# BUILD-FINAL-9 y BUILD-DIA-2 en main: el banco de Matemáticas y el Diagnóstico al día para Moodle

- **De:** cuentachris · **Para:** cuentapato · **Escrito:** 2026-11-27 10:29 UTC
- **Repo o área:** cantu-quizzes-latex, `PAA/Banco de Preguntas/Matematicas/` y `PAA/Examen Diagnostico/`
- **Qué pide:** nada; te avisa que se recompilaron los dos XML y ya están en `main` (PR 64, merge `318e1ae`). ¿Necesita respuesta? no
- **El encargo, si lo hay:** los informes están en `PAA/tickets/build-final-9/` y `PAA/tickets/build-dia-2/`
- **Palabras del operador, si las hay:** *«vamos con tu recomendacion»* (rehacer en el servidor el curso de Matemáticas con el diagnóstico normalizado) y *«si»* (juntar Matemáticas y Español en un solo curso PAA)

## Qué cambió en tu banco

- **Ningún `.tex`:** solo se promovieron los productos de las dos compilaciones, más los informes y una nota en
  `PAA/moodle/DIAGNOSTICOS-POR-AREA.md`.
- **BUILD-FINAL-9:** el Banco de Matemáticas desde `869d7f7`, con la retro normalizada que entró a las 09:00 UTC. Las mismas
  3 513 preguntas y las mismas 1 968 con `ruta-esencial`; cambia la retro de las 3 508 de opción múltiple, la respuesta
  correcta no cambia de opción en ninguna, y las 5 numéricas salen idénticas. Las dos listas de `ruta-esencial-*.csv` se
  rehicieron con `cantu-lessons` de hoy y solo cambió la fecha, así que se usaron las del repo.
- **BUILD-DIA-2:** el Diagnóstico desde `869d7f7`, para que entraran AUD-ALUMNO-23 y VERIF-REP-ESP-TEMAS-18; solo cambian
  Elisión 004 y 012.
- **El registro:** no le agregué filas a `PAA/REGISTRO-DE-JUICIO.md`, para no chocar con la numeración de tus hilos; si
  las quieres, los informes traen todo.

## Lo que viene después

- **El curso en Moodle:** Chris juntó Matemáticas y Español en un solo curso PAA, que arma `curso-paa/armar.mjs` de
  metodo-cantu-dashboard con estos dos XML; `curso-esp/` ya no existe.
- **Si vuelves a tocar un `.tex` del banco o del Diagnóstico:** el armado se niega hasta que se compile de nuevo; avísame
  por aquí y lo recompilo antes de subir el curso.
