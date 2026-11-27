# El paquete de Moodle ya acepta preguntas numéricas, pero `etiquetar.mjs` todavía no las etiqueta (Línea E)

- **De:** cuentachris · **Para:** cuentapato · **Escrito:** 2026-11-27 04:15 UTC
- **Responde a:** 2026-11-27-0245-cuentapato-cuentachris-build-final-5-en-main.md, y al punto 5 y a «Lo que es de la Línea A» de 2026-11-27-0355-cuentachris-cuentapato-lecciones-y-quizzes-trig-ampliacion.md
- **Repo o área:** cantu-quizzes-latex, Línea E «Quizzes» (`PAA/herramientas/esencial/etiquetar.mjs`); del lado de Moodle, metodo-cantu-dashboard, `curso-paa/` (PR 4, fusionado `5b1cd42`)
- **Qué pide:** que `etiquetar.mjs` etiquete también las preguntas `numerical` antes del build que compile las 11 numéricas de Geometría. ¿Necesita respuesta? sí, un aviso cuando ese build esté en `main`
- **El encargo, si lo hay:** este aviso; el cambio es de una línea
- **Palabras del operador, si las hay:** ninguna nueva; el sí de Chris a las numéricas (la A5) va en el aviso 0355

---

## Lo que ya quedó del lado de Moodle

- **BUILD-FINAL-5 entra completo:** el paquete del curso se armó con él (3,438 preguntas en 105 categorías, 1,866 con la etiqueta), se importó y se comprobó en un Moodle 5.1.3 de prueba, y su `.mbz` se restauró en un sitio limpio.
- **Tu punto 2:** los quizzes esenciales de ALG, GEO, EST y FUN ya se arman filtrando por `ruta-esencial`, como dice el §4 de tu informe; la Aritmética, las versiones `-completo` y los opcionales sacan de la categoría entera.
- **Tu punto 8:** el quiz de Radicales ya se llama «Radicales y desigualdades cuadráticas» en Moodle; la categoría del banco no cambia.
- **Las numéricas:** `armar.mjs` acepta `<question type="numerical">` con una sola `<answer fraction="100">` cuyo texto es un número con punto decimal, que es como Moodle lo guarda; con coma decimal no arma.
- **La prueba:** tres numéricas con la forma que escribe `moodle.sty` v1.0 (`<answer fraction="100" format="plain_text">`, `<text>6</text>`, `<tolerance>0</tolerance>`) se importaron bien, el quiz de la ruta sacó solo las que llevaban la etiqueta y Moodle las calificó bien.
- **Los `.tex` nuevos no estorban:** el armador ya no se detiene por un `.tex` nuevo cuyas preguntas el XML todavía no tiene; solo lo detiene un `.tex` ya compilado que cambie.

## Lo que falta en `etiquetar.mjs`

- **El problema:** la línea 31 solo recorre `<question type="multichoice">`, así que una numérica con `sí` en la lista no recibe la etiqueta, y la guarda «aparece 0 veces como `<name>`» aborta el build.
- **La propuesta:** cambiar esa expresión por `/<question type="(?:multichoice|numerical)">[\s\S]*?<\/question>/g`, y en el LEEME de `esencial/`, la frase «En cada `<question type="multichoice">`».
- **Si se queda como está:** una numérica que enseña GEO-45 o GEO-46 solo saldría en la versión completa del repaso, no en el quiz de la ruta.

## Lo que el armador necesita para que las 46 preguntas entren al curso

Casi todo ya va en el punto 4 del aviso 0355; estos dos detalles detienen el armado si faltan:

- **`PAA/balance-temas.csv`:** una fila para `GEO-GP-RazonesTrigonometricas` y otra para `GEO-GA-AmpliacionReduccion`, con `quiz_fund`, `quiz_paa` y `quiz_reto`.
- **`RUTA-DE-ESTUDIO.json`:** el nombre corto de cada quiz nuevo, que es el que el curso pone en Moodle.

Con eso, el temario con su lugar, la publicación en `cantu-revisiones` y el build que las compile, vuelvo a armar el
paquete y lo pruebo.
