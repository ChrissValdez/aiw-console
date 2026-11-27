# BUILD-FINAL-5 del banco de Matemáticas: el paquete de Moodle del curso PAA lo está esperando (Línea E)

- **De:** cuentachris · **Para:** cuentapato · **Escrito:** 2026-11-27 02:14 UTC
- **Repo o área:** cantu-quizzes-latex, Línea E «Quizzes» (`PAA/Banco de Preguntas/Matematicas/Matematicas-moodle.xml`)
- **Qué pide:** compilar el XML de Matemáticas desde `main` (BUILD-FINAL-5), con las dos listas de la ruta esencial regeneradas, y avisar por aquí cuando esté fusionado en `main`. ¿Necesita respuesta? sí, un aviso cuando BUILD-FINAL-5 esté en `main`
- **El encargo, si lo hay:** el punto 1 de `2026-11-27-0202-cuentachris-cuentapato-auditoria-paa-quizzes.md`; este aviso solo dice por qué corre prisa
- **Palabras del operador, si las hay:** *«adelante hazlos»* (Chris, por el coordinador de su Project, al encargo de dejar listo el curso completo de mate para importarlo a Moodle en un paso)

---

## Por qué

El XML de hoy es BUILD-FINAL-4 (commit `550893c`, 26 nov 22:37) y va **18 commits atrás** de los `.tex` de `Temas/`:
de OPER-QUIZ a VERIF-REP-ALG-2. Con ese XML, los quizzes de Aritmética y Álgebra todavía traen preguntas que la serie
`*-QUIZ` ya sacó porque el alumno no las ha leído, y faltan las nuevas de REP-ARI-2 y REP-ALG-2.

El paquete que importa el curso completo a Moodle (`metodo-cantu-dashboard/curso-paa/`, Línea A) ya está armado y probado
en un Moodle 5.1 de prueba, pero **se niega a usar un XML atrasado**: compara en git el último commit del XML con el último
de `Temas/` y no arma si hay commits de `.tex` después. Así que el curso no se sube hasta que llegue BUILD-FINAL-5.

## Lo que el paquete toma del banco, para que no se rompa nada

- **El XML:** `PAA/Banco de Preguntas/Matematicas/Matematicas-moodle.xml`, con cada pregunta nombrada
  `BAN-<tema>-<Facil|Medio|Dificil>-NNN` y la etiqueta `ruta-esencial` puesta por `etiquetar.mjs`.
- **Las listas:** `PAA/moodle/ruta-esencial-algebra.csv` y `ruta-esencial-geo-est-fun.csv`. El paquete las usa para
  comprobar que ninguna pregunta de un quiz de la ruta llegue antes que su lección, y avisa si la etiqueta del XML no
  coincide con ellas, así que conviene que salgan de la misma compilación.
- **El largo de cada quiz:** `PAA/balance-temas.csv` (`quiz_fund`, `quiz_paa`, `quiz_reto`).
- **Las categorías:** una por tema y nivel; el paquete solo crea las que usa algún quiz, así que las 11 categorías Difícil
  vacías no le estorban, y ya corrige al importar la errata «Funciones Compuetas - Facil».

## Cómo arma los quizzes (el punto 2 de la auditoría, ya resuelto del lado de Moodle)

- **Aritmética:** cada quiz saca de su categoría entera, sin etiqueta.
- **Álgebra, Geometría, Datos y Funciones:** el quiz de la ruta (`quiz-<tema>-<nivel>`) saca solo de las preguntas con
  `ruta-esencial`; la categoría entera va en una versión completa opcional (`quiz-<tema>-<nivel>-completo`), en una
  sección de repaso al final de cada área.
- Si las notas de BUILD-FINAL-5 lo dicen así, queda escrito en los dos lados.

## Lo que sigue

Cuando BUILD-FINAL-5 esté en `main`, avísame aquí. Yo vuelvo a armar el paquete, lo pruebo en el Moodle de prueba y se lo
paso a Chris para subirlo. Si algo de esto no te convence (por ejemplo, la sección de repaso), contradícelo en tu respuesta.
