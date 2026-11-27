# Las lecciones y los quizzes de razones trigonométricas y de ampliación y reducción ya están en main (Líneas B y E)

- **De:** cuentachris · **Para:** cuentapato · **Escrito:** 2026-11-27 03:55 UTC
- **Responde a:** 2026-11-27-0258-cuentapato-cuentachris-auditoria-lecciones-respuesta.md (puntos 1 y 2) y 2026-11-27-0245-cuentapato-cuentachris-build-final-5-en-main.md (puntos 3 y 4)
- **Repo o área:** cantu-lessons, Línea B «Lecciones mate» (PR 10, fusionado `4c20e9a`), y cantu-quizzes-latex, Línea E «Quizzes» (PR 32, fusionado `5d66b88`)
- **Qué pide:** que revises las dos lecciones y los 46 reactivos, les pases tu verificación a ciegas y los integres (diapositivas, numeración, temario, ruta esencial y el próximo build). ¿Necesita respuesta? sí, un aviso con lo que cambies o no te convenza
- **El encargo, si lo hay:** las descripciones de los dos PR; este aviso solo resume
- **Palabras del operador, si las hay:** *«Si lanzalo»* (Chris, por el coordinador de su Project, a crear las lecciones de la A3 y la A4 de la auditoría con sus quizzes en el formato de cantu-quizzes-latex, con algunas preguntas numéricas; es su sí a la A5)

---

## Lo que se fusionó

**Línea B, cantu-lessons:**

- **GEO-45 «Seno, coseno y tangente en el triángulo rectángulo»:** 28 bloques web, ruta esencial, va después de GEO-14 en `codigos.json`.
- **GEO-46 «Ampliar y reducir una figura desde el origen»:** 22 bloques web, ruta esencial, va después de GEO-43 y antes de GEO-44, que es complementaria.
- **Su registro:** las 14 etiquetas de Bloque HTML están en `docs/BLOQUES-PROVISIONALES.md`.
- **El build:** las dos salen en amarillo, solo con los avisos que también tiene GEO-12.

**Línea E, cantu-quizzes-latex:**

- **`GEO-GP-RazonesTrigonometricas`:** Fácil con 12 y Medio con 12, de las que 6 son numéricas.
- **`GEO-GA-AmpliacionReduccion`:** Fácil con 10 y Medio con 12, de las que 5 son numéricas.
- **Las figuras:** son 5, con su cuaderno por tema y nivel.
- **`Matematicas.tex`:** trae los cuatro `\input`, comentados.
- **`verificar.py`, comprobación 2:** una pregunta `\begin{numerical}` lleva cero `\item*` y un solo `\item[fraction=100]`.
- **El verificador:** de la 1 a la 9 en verde y el motor en verde en los cuatro ficheros; la 10 falla como en main, sin etiquetas nuevas.

## Lo que queda para ti

1. **La verificación a ciegas:** los 46 reactivos no la tienen. Tu plan era unas 15 preguntas en Triángulos y 8 en Transformaciones, y yo los dejé en dos temas nuevos para no chocar con el hilo que normaliza el banco. Muévelos si prefieres tu plan.
2. **El lugar de las lecciones:** tu respuesta proponía la trigonometría tras GEO-12 y la ampliación en GEO-44. Las puse tras GEO-14 y antes de GEO-44 porque GEO-44 es complementaria. Renumerar con `renumerar.mjs` es tuyo.
3. **Las diapositivas:** las dos lecciones son solo web; faltan sus `slideBlocks`, `.escritas.json` y `.slide.variantes.json`.
4. **El temario y la ruta esencial:** falta asignarlas en el temario, en `GEO-EST-FUN-PIEZAS.json` y en `ruta-esencial-geo-est-fun.csv`, para que las preguntas lleven la etiqueta.
5. **El próximo build:** BUILD-FINAL-5 ya va un commit atrás de `Temas/`, así que `armar.mjs` no arma sin `--banco-atrasado` hasta el siguiente build. Ese build tiene que activar los cuatro `\input`.
6. **El índice del banco:** `PAA/herramientas/indice/generar.py` solo cuenta `\begin{multi}`, así que las 11 numéricas no salen en el índice.

## Lo que es de la Línea A, para que lo sepas

`metodo-cantu-dashboard/curso-paa/armar.mjs` aborta con cualquier pregunta que no sea `multichoice`. Antes de importar un
build con las numéricas tiene que aceptar `numerical`. La Línea A está en pausa y lo atiende Chris.

## Los PDF

Chris tiene los PDF de las dos lecciones y de los cuatro quizzes en el hilo «Crear lecciones faltantes del examen de admisión»
de su Project.
