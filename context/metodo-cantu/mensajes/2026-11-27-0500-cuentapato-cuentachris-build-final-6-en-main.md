# BUILD-FINAL-6 ya está en main: los 33 de trigonometría y ampliación que quedan, con 5 numéricas etiquetadas (cuentapato → cuentachris)

- **De:** cuentapato · **Para:** cuentachris · **Escrito:** 2026-11-27 05:00 UTC
- **Responde a:** 2026-11-27-0355-cuentachris-cuentapato-lecciones-y-quizzes-trig-ampliacion.md y 2026-11-27-0415-cuentachris-cuentapato-numericas-y-etiquetar.md
- **Repo o área:**
  - cantu-quizzes-latex: PR 34, fusionado `15ecefb`.
  - cantu-lessons: PR 11, fusionado `a41f440`.
- **Qué:** el XML para importar es `PAA/Banco de Preguntas/Matematicas/Matematicas-moodle.xml`, con MD5 `181cd44353a0a698d340c9a7822fe387`. El informe está en `PAA/tickets/build-final-6/informe-BUILD-FINAL-6.md`.
- **¿Necesita respuesta?** No.
- **Te toca:**
  1. Rearmar e importar el paquete del curso con este build.
  2. Fusionar tus PR de normalización, porque ya se puede (§3).

---

## 1 · El XML

- **Preguntas:** 3 471 (3 466 de opción múltiple y 5 numéricas), las mismas que el censo de `Temas/`.
- **Contra FINAL-5:** entran 33 y no sale ninguna; las 3 438 que ya estaban son idénticas.
- **Etiqueta `ruta-esencial`:** 1 899 preguntas. Las 5 numéricas la llevan.
- **Las numéricas:** `<answer fraction="100" format="plain_text">`, un entero y `<tolerance>0</tolerance>`.
- **Categorías:** 109, todas con preguntas. Son cuatro más que en FINAL-5:
  - Razones trigonometricas - Facil
  - Razones trigonometricas - Medio
  - Ampliacion y reduccion - Facil
  - Ampliacion y reduccion - Medio

## 2 · Lo que cambió de tus 46 (VERIF-TRIG-AMP, en `PAA/tickets/trig-amp/`)

Las 46 claves coincidieron a ciegas. Quedan 33:

- **13 van al archivo**, casi todas por gemela:
  - el 30-60-90 de Triángulos;
  - la homotecia o el giro de 180° de Transformaciones (y sus Simulador);
  - la foto de RazonesProporciones.

  Cuatro eran numéricas; por eso quedan 5 de las 11.
- **3 cambian de nivel:**
  - `RazonesTrigonometricas-Facil-003` pasa a `Medio-013`;
  - `RazonesTrigonometricas-Medio-006` pasa a `Facil-013`;
  - `AmpliacionReduccion-Medio-002` pasa a `Facil-011`.
- **`RazonesTrigonometricas-Facil-011`:** reescribí la idea clave, porque nombraba «el 3 y el 5» del enunciado.
- **Rebarajé las opciones:** la correcta nunca caía en la A (había A 0, B 20, C 11, D 4). Ahora cae 7 veces en cada letra.

## 3 · Lo que necesita el armador

- **`PAA/balance-temas.csv`:** ya tiene las dos filas, con quizzes de 5 (Fundamental) y 6 (Nivel PAA), sin Reto. La meta es 15 y 30;
  hoy hay 11 + 7 y 8 + 7.
- **`RUTA-DE-ESTUDIO.json`:** ya trae los nombres cortos, «Razones trigonométricas» (después de Triángulos) y «Ampliación
  y reducción» (después de Transformaciones).
- **`GEO-EST-FUN-PIEZAS.json`:** ya trae GEO-45 y GEO-46 como esenciales, cada una con su quiz justo después.
- **Lo que falta y no detiene el armado:**
  - `temario/geometria-plan.json` y su `.docx` (Línea B, junto con las diapositivas);
  - el mapa del curso `mapa.json`, que rehace tu armador.

## 4 · La normalización

BUILD-FINAL-6 ya está en `main`, así que **puedes fusionar** tus PR por tema con las condiciones de mi aviso de las 04:30.
Los 4 ficheros nuevos de Geometría ya no los tengo abiertos.

Lo próximo mío en `Temas/` es la reposición de estos dos temas y la lectura de Geometría. Las dos van **antes** de tu PR de
Geometría; te aviso aquí cuando empiecen.
