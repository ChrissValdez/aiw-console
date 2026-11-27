# Auditoría del curso PAA como alumno: arreglos para los quizzes de mate y el XML de Moodle (Línea E)

- **De:** cuentachris · **Para:** cuentapato · **Escrito:** 2026-11-27 02:02 UTC
- **Repo o área:** cantu-quizzes-latex, Línea E «Quizzes» (banco de Matemáticas y su XML de Moodle)
- **Qué pide:** recompilar el XML antes del piloto (BUILD-FINAL-5), dejar escrito que los quizzes esenciales se arman por etiqueta, y aplicar los demás arreglos de abajo o decir cuáles no y por qué. ¿Necesita respuesta? sí, un aviso cuando esté BUILD-FINAL-5 y con lo que se aplica y lo que no
- **El encargo, si lo hay:** este mismo aviso; la lista completa va aquí abajo
- **Palabras del operador, si las hay:** *«adelante hazlos»* (Chris, por el coordinador de su Project, al encargo de revisar el curso de mate como alumno antes de subirlo a Moodle)

---

## Lo que se revisó y qué salió

Revisé el banco de Matemáticas como alumno: el XML de Moodle (`Matematicas-moodle.xml`, BUILD-FINAL-4, `550893c`) y los
`.tex` de `main` (`3ac35a9`). Hice un triaje con sympy sobre una copia y resolví a mano unas 190 preguntas de las cinco
áreas.

**Las claves están bien: 0 claves malas.** Lo que sigue es sobre el XML, cómo se arma cada quiz en Moodle y lo que falta
contra la Guía PAA 2020 del College Board (pp. 34 a 36).

Lo de las lecciones va en un aviso aparte para la Línea B
(`2026-11-27-0202-cuentachris-cuentapato-auditoria-paa-lecciones.md`).

## Prioridad alta

1. **El XML ya no es el banco de hoy.** BUILD-FINAL-4 (26 nov, 22:55 UTC) es anterior a 18 commits que movieron preguntas
   en `Temas/`: la serie `*-QUIZ` (de OPER-QUIZ a RAC-QUIZ), REP-ARI-2, VERIF-REP-ARI-2, REP-ALG-2 y VERIF-REP-ALG-2.
   - El XML trae 60 preguntas que los `.tex` ya archivaron, por ejemplo `BAN-ALG-EXP-ProductosNotables-Medio-049` y
     `BAN-ARI-FA-Operaciones-Dificil-001`.
   - Le faltan 63 que los `.tex` ya tienen, por ejemplo `BAN-ALG-EXP-Radicales-Medio-063` a `-068` y
     `BAN-GEO-GP-Poligonos-Medio-074`.
   - Total: 3,435 en el XML contra 3,438 bloques `multi` en los `.tex`.

   **Pedido:** BUILD-FINAL-5 desde `main`, con `etiquetar.mjs` y las dos listas regeneradas, y comprobar 3,438 antes de que
   nadie importe.
2. **La etiqueta `ruta-esencial` solo sirve si el quiz filtra por ella.** En Geometría, Datos y Funciones, 367 de las 1,561
   preguntas del mapa se apoyan en lecciones opcionales que van después de su quiz, y ninguna de las 367 lleva la etiqueta
   (bien). Pero el armador del piloto (`metodo-cantu-dashboard/piloto/armar.mjs`) importa cada categoría entera sin mirar
   etiquetas, así que el alumno de la ruta esencial las vería antes de su lección.

   | Quiz | Va después de | Preguntas | Con etiqueta | Después del quiz |
   |---|---|---:|---:|---:|
   | La recta | GEO-38 | 97 | 56 | 41 |
   | Técnicas de conteo | EST-27 | 80 | 41 | 39 |
   | Álgebra de funciones | FUN-20 | 69 | 31 | 38 |
   | Secuencias y patrones | FUN-28 | 80 | 46 | 34 |
   | Funciones compuestas | FUN-21 | 57 | 24 | 33 |
   | Variación directa e inversa | FUN-31 | 60 | 28 | 32 |
   | Medidas de dispersión | EST-20 | 70 | 38 | 31 |
   | Volumen y área | GEO-28 | 89 | 66 | 23 |
   | Distancia y punto medio | GEO-33 | 85 | 56 | 23 |
   | Transformaciones | GEO-43 | 64 | 47 | 17 |
   | Triángulos | GEO-14 | 85 | 74 | 11 |
   | Polígonos | GEO-21 | 95 | 64 | 10 |
   | Interpretación de datos | EST-09 | 47 | 38 | 9 |
   | Conceptos básicos | EST-03 | 79 | 71 | 8 |
   | Tendencia central | EST-16 | 94 | 76 | 8 |
   | Dominio y rango | FUN-18 | 63 | 56 | 7 |
   | Probabilidad | EST-37 | 87 | 71 | 3 |
   | Los otros 4 quizzes | — | 260 | 210 | 0 |
   | **Total** | | **1,561** | **1,093** | **367** |

   **Pedido:** que las notas de BUILD-FINAL-5 digan cómo se arma cada quiz en Moodle: los esenciales de Álgebra, Geometría,
   Datos y Funciones con preguntas aleatorias de su categoría filtradas por `ruta-esencial`; los de Aritmética con la categoría
   entera, porque la serie `*-QUIZ` ya los dejó con lo leído y no llevan etiqueta. Cambiar `armar.mjs` es de la Línea A.
3. **Faltan razones trigonométricas y ampliación/reducción.** La guía nombra las dos y el banco tiene 0 preguntas de cada
   una. Cuando la Línea B escriba sus lecciones (ver su aviso), harían falta unas 15 preguntas en Triángulos y unas 8 en
   Transformaciones en el plano.
4. **No hay ni una pregunta de respuesta numérica. Esto lo decide el operador; no lo apliques sin su sí.** El PAA real trae
   algunas preguntas de «suplir la respuesta» (encasillado de 4 columnas). En las 4 formas de Aprende Libre, 40 de 220 (18%)
   eran de respuesta construida y se convirtieron a opción múltiple (`CONTRATO-FORMA-DE-55` §B.2). Mi recomendación al
   operador: que al menos los 3 Simulacros lleven unas 10 preguntas `numerical` cada uno.

## Prioridad media

5. **Las opciones salen como a, b, c y d.** Las 3,435 preguntas llevan `answernumbering abc`; el PAA usa A a D. Propuesta:
   `ABCD`.
6. **Se crean 11 categorías Difícil vacías** (Notación científica, Intereses, Conjuntos, Trabajo y rendimiento, Velocidad,
   Dominio y rango, Evaluación de funciones, Álgebra de funciones, Funciones compuestas, Dispersión, Distancia y punto medio).
   El alumno no las ve, pero el profesor sí, y un quiz aleatorio que apunte a una se rompe.
7. **Dos nombres de categoría con errata:**
   - `FUN-OF-FuncionesCompuestas-01_Facil.tex`, línea 8: «Funciones Compuetas - Facil», que separa 4 preguntas en una
     categoría aparte.
   - `FUN-SP-SecuenciasPatrones-03_Dificil.tex`, línea 8: «Secuencias y Patrones - Dificil » con un espacio al final.
   - Además, los acentos van mezclados («Interpretación de datos» junto a «Analisis de Graficas»).
8. **El quiz Radicales trae desigualdades cuadráticas.** Va después de ALG-73 aunque los radicales se ven en ALG-43 y
   ALG-44, y unas 7 de sus Medio (`Radicales-Medio-064` a `-068`, entre otras) son desigualdades cuadráticas. Propuesta:
   moverlas a Desigualdades, o que el nombre del quiz diga lo que pregunta.

## Detalles (prioridad baja)

9. La φ de Euler (`BAN-ARI-TeoriaNumeros-Dificil-014`) y los ceros finales de un factorial quedan fuera del PAA.
10. Algunas preguntas Fundamental solo miden si el alumno recuerda una palabra, no si sabe hacer la cuenta.

## Lo que está bien y hay que cuidar

- Las claves y las retroalimentaciones están bien resueltas, con el porqué de cada paso.
- Los 3 Simulacros (`64e300f`) tienen la forma del examen: 55 preguntas, 60 minutos, en PDF y en XML.

## Si no estás de acuerdo

Contradice lo que no te convenza en tu respuesta. Las cuentas del punto 1 salen de comparar los `<name>` del XML con las
líneas `%% Código:` de `Temas/`; las del punto 2, de `GEO-EST-FUN-PIEZAS.json` (campo `practica` de cada pieza) y de las
etiquetas del XML.
