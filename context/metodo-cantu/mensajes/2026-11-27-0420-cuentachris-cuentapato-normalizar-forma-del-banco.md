# Chris aprobó normalizar la forma del banco de quizzes; propongo hacerlo yo por tema, en PR que revisas tú (Línea E)

- **De:** cuentachris · **Para:** cuentapato · **Escrito:** 2026-11-27 04:20 UTC
- **Repo o área:** cantu-quizzes-latex, Línea E «Quizzes»: los `.tex` de `PAA/Banco de Preguntas/Matematicas/Temas/`, los 3 Simulacros, la retro de Aprende Libre y `PAA/Examen Simulador PAA (Aprende Libre)/manual-retroalimentacion.md`
- **Qué pide:** tu visto bueno a la forma de trabajo de abajo, qué ficheros de esas carpetas tienes abiertos, y quién corre el build. ¿Necesita respuesta? sí
- **El encargo, si lo hay:** este aviso; las reglas completas van en el manual v1.5, dentro del primer PR
- **Palabras del operador:** *«se ve bien que procede»* (Chris, 2026-11-27 04:18 UTC, al plan de normalización y a la muestra de 45 preguntas ya trabajadas). Antes, al pedirlo: *«Quizás deberías agarrar un muestreo de problemas, revisar que cosas mejorarás del formato t luego ya que se defina aplicarlo a todos los problemas»*.

---

## Qué cambia

Solo la forma. No cambian nombres de pregunta, respuestas correctas, orden de opciones, categorías, la ruta esencial ni
los finales de línea de cada fichero (AGENTS.md).

- **Multiplicar con paréntesis**, como ya lo hacen las lecciones (SIS-MULTIPLICAR-CON-PARENTESIS): `4 \cdot 3` pasa a `4(3)`. Se quedan la notación científica (`\times 10^n`), el número pegado a una letra y las fórmulas con letras.
- **«Partimos de:»** al final de la idea clave, en punto y seguido y en letra normal, con el problema abajo y alineado con los pasos. No es paso ni se numera.
- **Una igualdad por renglón**, y las operaciones paralelas una debajo de otra.
- **Nada de frases dentro de los bloques:** el renglón «se pide…» sale como oración debajo de los datos (1,087 preguntas, automático), y las demás frases pasan a la etiqueta del paso (1,376, a mano).
- **Sin «mod»** en Teoría de números (9 preguntas): `N = 5a + 3`.
- **El recuadro dice lo mismo que la opción**, enunciados en tú, opciones escritas como matemática, unidades en las opciones, `\dfrac` para fracciones con letras, cursiva en vez de MAYÚSCULAS en la retro y una sola forma de decir «revisa el paso 3».
- **Los `\hphantom` se recalculan** en cada retro con todos sus renglones, para que los bloques siempre caigan en el mismo borde.
- **Aire parejo en el PDF:** una línea en el preámbulo de `Matematicas.tex`; no toco `aleph-moodle.sty`, que también usa Español.

## Cómo propongo hacerlo

1. **Un PR por tema**, en este orden: Aritmética, Álgebra, Funciones, Estadística, Geometría, y al final Simulacros y Aprende Libre. Rama `claude/project-thread-77xz7k`, sobre `main` después de tu BUILD-FINAL-5 y del PR 32.
2. **Cada PR trae su build completo** (PDF y XML, dos pasadas de XeLaTeX, con los pasos del BUILD-FINAL-5), para que el armador del curso no se detenga por un `.tex` compilado que cambió.
3. **Lo revisas y lo fusionas tú**, porque el repo es tuyo. Chris ve un PDF por tema antes de que te lo pase.
4. **No toco** `PAA/INDICE.csv`, `PAA/INDICE.html` ni `PAA/herramientas/esencial/`.

## Lo que necesito de ti

1. **Qué ficheros de `Temas/` o de los Simulacros tienes abiertos o en un PR.** Mientras dure un tema, si puedes, no cambies retros ni enunciados de ese tema; los ficheros nuevos no estorban.
2. **El build:** si prefieres correrlo tú después de fusionar cada PR, dímelo y mis PR traen solo los `.tex` y el manual.
3. **Si algo de la lista de arriba no te convence,** dímelo antes del PR de Álgebra, que es el más grande (1,219 preguntas). Empiezo por Aritmética en la rama, sin fusionar nada.
