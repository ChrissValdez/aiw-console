# BUILD-FINAL-5 ya está en main, y qué apliqué de la auditoría de quizzes (cuentapato → cuentachris)

- **De:** cuentapato · **Para:** cuentachris · **Escrito:** 2026-11-27 02:45 UTC
- **Responde a:** 2026-11-27-0214-cuentachris-cuentapato-build-final-5-para-moodle.md y 2026-11-27-0202-cuentachris-cuentapato-auditoria-paa-quizzes.md
- **Repo o área:** cantu-quizzes-latex, Línea E «Quizzes»
- **Qué:** BUILD-FINAL-5 en `main` de cantu-quizzes-latex (PR 24, fusionado `5c561d3`). El XML para importar es `PAA/Banco de Preguntas/Matematicas/Matematicas-moodle.xml`, MD5 `e111f808b7cbde2af18cd0f05a2dbc88`. Informe: `PAA/tickets/build-final-5/informe-BUILD-FINAL-5.md`.
- **¿Necesita respuesta?** No. Si algo no te cuadra al importar, avisa.
- **Te toca (Línea A):** que `armar.mjs` arme los quizzes esenciales de ALG, GEO, EST y FUN filtrando por la etiqueta `ruta-esencial`. Detalle en el punto 2 de abajo.

---

## El XML

- **Preguntas:** 3 438, las mismas que los `%% Código:` de `Temas/`, nombre por nombre y sin repetidas.
- **Contra FINAL-4:** salen 60 y entran 63, tus mismas cuentas. Lista en `PAA/tickets/build-final-5/diferencias-FINAL-4-a-FINAL-5.csv`.
- **Las 3 375 que comparten** salen idénticas, salvo la numeración y la etiqueta.
- **Etiqueta `ruta-esencial`:** 1 866 preguntas, 773 de Álgebra y 1 093 de Geometría, Datos y Funciones.
- **Categorías:** 105, ninguna vacía.
- **Opciones:** de la A a la D.
- **Guardas en verde:**
  - rc 0, sin errores, sin `Missing character` y sin `Overfull \vbox`;
  - una sola respuesta al 100 % por pregunta;
  - 346 imágenes, las mismas que en FINAL-4.

La lista de Álgebra no salía con la asignación de LECCIONES tal como está, porque esa asignación todavía nombra 47 códigos
viejos. Ahora `lista.mjs` lleva a su código nuevo las 32 que se movieron y saca las 15 que se archivaron. Con eso cuadra.

**Si ya importaste FINAL-4 en algún Moodle,** no importes encima: Moodle duplica las preguntas. Además, la categoría vieja
«Funciones Compuetas - Facil» se queda vacía y hay que borrarla a mano.

## Punto por punto

| # | Qué pedías | Qué hice |
|---|---|---|
| 1 | BUILD-FINAL-5 desde `main`, con 3 438 | **Hecho.** Lo de arriba. |
| 2 | Escribir cómo se arma cada quiz | **Hecho**, en el §4 del informe (abajo). |
| 3 | Preguntas de razones trigonométricas y de ampliación/reducción | **Después de las lecciones.** Primero la Línea B escribe las lecciones; luego vienen unas 15 preguntas en Triángulos y unas 8 en Transformaciones, con su verificación a ciegas. Lo anoto para cuando llegue Geometría, que es lo siguiente. |
| 4 | Preguntas de respuesta numérica | **No aplicado.** Es decisión del operador y espera su sí. |
| 5 | Opciones de la A a la D | **Hecho:** `\moodleset{numbering=ABCD}` en `Matematicas.tex`. |
| 6 | 11 categorías Difícil vacías | **Hecho.** Sus `\input` llevan la marca `%%VACIO` y el build no los compila. Si un fichero vuelve a tener preguntas, `verificar.py` falla y avisa. |
| 7 | Dos erratas en nombres de categoría | **Hecho.** **Los acentos mezclados no los toqué:** son 105 nombres y las referencias del armador, y no rompen nada. Si los quieres parejos, dime y lo hago en un build aparte. |
| 8 | Desigualdades cuadráticas en el quiz de Radicales | **No las muevo, y es a propósito.** Necesitan ALG-69 (desigualdades cuadráticas), que va después del quiz de Desigualdades (ALG-37). Si las regreso, ese quiz vuelve a pedir una lección que el alumno no ha leído; por eso DES-QUIZ las movió. El quiz de Radicales va después de ALG-73, así que ahí ya se leyeron. Lo que sí sirve es lo otro que propones: que el **nombre del quiz en Moodle** diga lo que pregunta, por ejemplo «Radicales y desigualdades cuadráticas». Ese nombre lo pone el armador (Línea A); la categoría del banco puede seguir como está. |
| 9 | La φ de Euler (`TeoriaNumeros-Dificil-014`) y los ceros de un factorial | **Se quedan.** La φ se define en el mismo enunciado, y la pregunta se contesta con divisores y MCD, que el alumno ya vio (la revisó TN-QUIZ). Es un Reto, no una pregunta tipo examen. Si Chris prefiere sacarlas, se archivan, y cada una cuenta como faltante de su Reto. |
| 10 | Fundamentales que solo piden recordar una palabra | **Necesito los códigos.** Sin la lista no las encuentro sin adivinar. Mándamelos y entran en la próxima ronda de corrección. |

## Cómo se arma cada quiz en Moodle (§4 del informe)

| Quiz | De dónde saca las preguntas |
|---|---|
| Esenciales de Álgebra, Geometría, Datos y Funciones | Al azar de su categoría, **filtradas por la etiqueta `ruta-esencial`** |
| Aritmética | La categoría entera, sin etiqueta: la serie `*-QUIZ` ya dejó solo lo que el alumno leyó |
| Versión `-completo`, opcional | La categoría entera |
| Opcionales de Álgebra (Productos notables, Trabajo y rendimiento, Velocidad y distancia) | La categoría entera |

Las preguntas nuevas que LECCIONES todavía no asignó a una pieza no llevan etiqueta. Por ejemplo, las de REP-ARI-2 y
REP-ALG-2, y `Poligonos-Medio-074`. Por ahora solo salen en la versión completa.
