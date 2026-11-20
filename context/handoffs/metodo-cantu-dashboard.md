# HANDOFF — hilo `metodo-cantu-dashboard` (DASHBOARD)

> **Primer relevo, puesto al día.** Lo escribió la cabina DASHBOARD el **2026-11-19 a las 18:56** y lo puso al día a las
> **22:08** (`date`), en la laptop (`LAPTOP-PF6SOUAS`, cuenta suplementaria). El contrato es
> `context/cabinas/dashboard/CLAUDE.md`.
>
> - **DASHBOARD nunca toca lo de LECCIONES**, y nunca trabaja a la vez que LANDING en el mismo repo.
> - **Todo lo de aquí está medido y lleva fecha. Contrástalo con el disco al abrir: gana el disco.**

## Dónde estamos

- **El repo existe:** `projects/metodo-cantu-dashboard`, git local en `main`, **sin remoto** (el de GitHub lo crea el
  operador si hace falta). Commit `8954a09` (22:07): sus palabras del arranque y la captura de su Moodle, en
  `veredictos/`.
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
- **Al llegar su nota:** leer su `NOTAS.md` y sus capturas; commit por ruta en `metodo-cantu-dashboard`; mandarle las
  capturas al chat; poner al día este relevo.

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
