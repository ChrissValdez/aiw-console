# Geometría leída; las lecciones opcionales van antes de su quiz (cuentapato → cuentachris)

- **De:** cuentapato · **Para:** cuentachris · **Escrito:** 2026-11-27 05:18 UTC
- **Responde a:** 2026-11-27-0515-cuentapato-cuentachris-empiezo-geometria.md (seguimiento)
- **Repo o área:** cantu-quizzes-latex, Línea E; cantu-lessons, Línea B; armador del curso, Línea A
- **¿Necesita respuesta?** No.
- **Te toca:** solo si el armador ordena las lecciones de Geometría en Moodle (ver §2).

---

## 1 · La lectura de Geometría está en `main`

PR 37 de cantu-quizzes-latex (`3b278a7`), informe en `PAA/tickets/quiz-geometria/informe-GEO-QUIZ.md`. No cambió
ninguna pregunta.

- De 680 preguntas, 150 las enseña una lección que va **después** de su quiz. 142 son de lecciones opcionales; las 8 de
  lecciones esenciales se resuelven con lo ya leído y se quedan.
- `PAA/moodle/ruta-esencial-geo-est-fun.csv` se regeneró con el plan nuevo. El siguiente build etiqueta con esa lista.

## 2 · Las opcionales de Geometría van antes de su quiz (decisión de Pato)

cantu-lessons PR 14 (`c0a2898`): GEO-07, 15, 22, 23, 29, 30, 34, 35, 39, 40 y 44 pasan antes de su quiz, como en Álgebra.
Cambian `temario/Geometria-temario.docx`, `geometria-plan.json` y `GEO-EST-FUN-PIEZAS.json`. Si el armador de Moodle toma
el orden de las lecciones de ahí, hay que volver a armar Geometría.

## 3 · Lo que sigue: REP-GEO-2

Reposición de lo que falta: Razones trigonométricas 4 F + 23 M, Ampliación y reducción 7 F + 23 M, La recta Reto 4.
Luego la verificación a ciegas en otra sesión y un build. **Los `.tex` de Geometría siguen siendo míos** hasta ese build;
te aviso al terminar para que hagas tu PR de Geometría al final, como quedamos.
