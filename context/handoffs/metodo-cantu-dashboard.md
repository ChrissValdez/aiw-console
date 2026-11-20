# HANDOFF — hilo `metodo-cantu-dashboard` (DASHBOARD)

> **Primer relevo, puesto al día.** Lo escribió la cabina DASHBOARD el **2026-11-19 a las 18:56** y lo puso al día a las
> **22:43** (`date`), en la laptop (`LAPTOP-PF6SOUAS`, cuenta suplementaria). El contrato es
> `context/cabinas/dashboard/CLAUDE.md`.
>
> - **DASHBOARD nunca toca lo de LECCIONES**, y nunca trabaja a la vez que LANDING en el mismo repo.
> - **Todo lo de aquí está medido y lleva fecha. Contrástalo con el disco al abrir: gana el disco.**

## Dónde estamos

- **El repo existe:** `projects/metodo-cantu-dashboard`, rama `main`, con remoto
  `github.com/ChrissValdez/metodo-cantu-dashboard` (privado; lo creó el operador el 19-nov y la cabina lo conectó y
  empujó a las 22:19). `HEAD` = `origin/main` = `c7b0842` a las 22:19. Commit `8954a09` (22:07): sus palabras del
  arranque y la captura de su Moodle, en `veredictos/`.
- **Él contestó las preguntas del arranque** (`veredictos/2026-11-19-arranque.md`). Lo esencial:
  - el dashboard es **una capa encima de Moodle tal cual está**; portarlo a Moodle es **fase 2**: ahora solo el diseño
    (cómo se ve y cómo funciona);
  - el problema 1 es el **diagnóstico**: largo, cansa, el alumno olvida; su caso: un alumno de 85 sacó 28/100 y le salió
    estudiar ~80 % de los temas. Lo quiere **por partes**, y que cada parte actualice el dashboard;
  - el problema 2 es **la presentación de temas**: 217 lecciones de Matemáticas (152 esenciales, 65 de ventaja) de golpe
    abruman. El dashboard muestra **el siguiente bloque** y su quiz, y cuánto subiría el puntaje (aproximado);
  - **historial de simuladores** (calificaciones); el simulador se queda como está: largo y con Mate y Español juntos;
  - **el coach** (un plugin suyo, por pulir) ya tiene acceso a quizzes, simuladores y diagnósticos y estima el puntaje.
    **No lo quiere como chat lateral:** integrado al dashboard, que recomiende sin que le pregunten (y se le puede
    preguntar). Motivación: «estudié 5 temas y mi puntaje subió aprox 30 puntos»; **puntaje meta** según su objetivo;
  - identidad visual: los dos headers de su Moodle (marino, y el banner verde azulado → ocre) y su logo; el footer es
    neutro. No hay que calcarlos, pero no desentonar.
- **Su «adelante» llegó (guardado a las 22:12),** con una aclaración: *«no porqeu apruebe el plan actual, sino porque es
  mas facil evaluar el prototipo construido y sobre eso dar feedback»*. Las tres decisiones abiertas (escala, Español
  igual, repo de GitHub) no las contestó: van las recomendaciones de la cabina (puntos como la meta del coach; Español
  igual; sin remoto hasta que él lo cree).
- **Encargo `encargos/PROTO-V1.md`** (commit `c7b0842`). **Taller lanzado** en su propia conversación,
  `taller-proto-v1` (`local_7856604c-348d-413d-a083-efbaccf92efb`), «fresh», sin worktree, Opus, esfuerzo alto,
  puerto 8803. Escribe en `prototipo/v1/` y el `index.html` de la raíz; no toca git.
- **PROTO-V1 ENTREGADO (22:33, `65f034c`, empujado; `HEAD` = `origin/main`).** El taller terminó a las 22:31:
  - siete pantallas en `prototipo/v1/`: `index.html` (Inicio), `diagnostico`, `plan-matematicas`, `plan-espanol`,
    `bloque`, `simuladores` y `meta`;
  - la página de entrada `index.html` en la raíz;
  - 31 capturas;
  - `NOTAS.md`;
  - sus herramientas, copiadas por la cabina a `prototipo/v1/herramientas/`: `gen.mjs` genera las siete páginas desde
    los datos de la alumna; sus rutas `SCR` apuntan al temporal de esa sesión.

  La cabina volvió a medir: cero corchetes y cero `<svg>` en HTML/CSS. Le mandó 8 capturas (las siete a 1440 y el
  Inicio a 390).
- **Lo que el taller decidió o inventó** (detalle en `NOTAS.md`):
  - la alumna ficticia es «Mariana Robles»;
  - la escala es de 200–800 por materia y 400–1600 en el simulador. **NO VERIFICADA**;
  - la meta es 1300 = 640 + 660;
  - «cuánto sube» se calcula con preguntas por examen del tema (las reales de la ruta) × 11 puntos;
  - para llegar a 217 inventó los conteos de lecciones de Geometría, Datos y Funciones;
  - los bloques de Español los agrupó a partir de los nombres del diagnóstico.
- **Sus dos preguntas al operador:**
  - partir Álgebra y Lectura del diagnóstico (las de ~40–45 min); recomienda sí;
  - meta solo por materia y el total solo en Simuladores; recomienda sí.
- **Su veredicto sobre v1 (guardado a las 22:40, `ebfc014`):** *«el diseño del dashboard esta muy feo»*. Trajo de
  LANDING un método de siete puntos y pidió aplicarlo «tal cual»; **desde ahí es el método del hilo** (verbatim en
  `veredictos/2026-11-19-v1-comentarios.md`; resumido en el contrato, «El método de rondas», commit `7652e4c` en
  `aiw-console`). Lo que cambia: 3 direcciones por ronda en el mismo archivo por `?v=`, análisis escrito antes de
  diseñar, skills `frontend-design`/`hallmark`/`dataviz`, capturas a 3 anchos con guardas por script y un crítico ciego.
- **Punto 1 en curso:** encargo `encargos/ANALISIS-V1.md` (`2880fc8`). **Taller lanzado:** `taller-analisis-v1`
  (`local_d26e28e1-6e27-4a2c-94da-0ba77d55f452`), una conversación nueva (no la que hizo v1), «fresh», sin worktree,
  Opus, esfuerzo alto, puerto 8804. Escribe en `prototipo/v2/` (`NOTAS.md`, `analisis/`, `referencias/`, `tokens.css`)
  y el `index.html` de la raíz. **No diseña.**
- **Al llegar su nota:** leer `NOTAS.md`, los recortes y las referencias; commitear; enseñárselo al operador **antes de
  diseñar** (lo pidió así). Siguen sin contestar: las dos preguntas del taller de v1 y la escala real.

## Lo que ya existe en disco y sirve de dato de ejemplo (medido 22:05, solo lectura)

- `cantu-lessons/docs/referencias/RUTA-DE-ESTUDIO.json` (RW-85, 7-nov): **la ruta de estudio de Matemáticas definida
  para el coach y la página «Mi plan»**. Cinco áreas en orden (Aritmética, Álgebra, Geometría, Datos, Funciones), la
  secuencia lección/quiz con marca esencial/opcional, peso de cada tema en el examen, horas [ESTIMADO], y las reglas del
  coach («nunca cambia el orden, solo quita»). Es de LECCIONES: **se lee, no se escribe**. Sus cifras (101 lecciones)
  no coinciden con las 217 del operador: el prototipo usa las del operador y la estructura de este fichero.
- `cantu-quizzes-latex/PAA/Examen Diagnostico/Secciones/`: el diagnóstico ya está partido en ficheros por tema dentro de
  Lectura, Redacción y Matemáticas (61 `.tex`). Tiene 730 preguntas (`PAA/ESTADO.md`) con quinta opción «No conozco la
  respuesta». Es la base natural del «diagnóstico por partes».
- **El plugin del tutor y coach** (`local_metodocantu_ai_chat`, OpenAI), copiado tal cual a
  `metodo-cantu-dashboard/referencias/plugin-tutor-coach-contexto.md` (`ceadde0`, 22:09; sin claves ni valores de
  `sesskey`: se buscó). Él: *«no creo que ocupemos usarlo mcuho pero sirve como referencia nadamas»*. Lo que sirve al
  prototipo:
  - el coach ya pinta un mini tablero **dentro del cajón del chat**: «Récord Simulador», la meta con lápiz
    (`target_score`, ej. 1400), y barras de Matemáticas (Esencial, Complementaria) y Español (Lectura, Redacción).
    Es justo lo que él quiere sacar del chat;
  - los datos: `cognitive_map` (tema → calificación 0–100 del último quiz, por el `exam_dictionary`), `target_score`,
    los 5 últimos intentos de quiz, y un `paa_domain_map` que agrupa temas en esas cuatro barras y el simulador;
  - **hallazgo:** la barra del simulador compara el récord (un 0–100) contra la meta en puntos (ej. 1400): no son la misma
    escala. El prototipo no debe heredarlo.
- `metodo-cantu-landing/prototipos/diseño-actual/imgs/logo-largo.png`: el logo (de ahí se copia, sin escribir en ese
  repo).

## Lo que sigue, en orden (propuesto, sin aprobar)

1. Con su «adelante»: un taller en su propia conversación (Opus, esfuerzo alto) construye el **prototipo v1**, HTML
   estático con un alumno ficticio, en el repo.
2. Capturas (escritorio y celular) al chat, commit, y aviso.
3. Rondas sobre sus comentarios, una propuesta por ronda.
4. **Fase 2, aparte:** dónde se monta en Moodle y de dónde salen los datos reales.

## Hallazgos sobre otros hilos (se nombran, no se corrigen)

- **El relevo de LANDING está atrasado respecto a su repo:** dice `a38a4d4` y «vuelve a la PC» (19-nov, 02:58), y
  `origin/main` de `metodo-cantu-landing` estaba en `aa0fe02` (18:55), 64 commits después. Es de LANDING.
