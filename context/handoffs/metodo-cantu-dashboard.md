# HANDOFF — hilo `metodo-cantu-dashboard` (DASHBOARD)

> **Primer relevo, puesto al día.** Lo escribió la cabina DASHBOARD el **2026-11-19 a las 18:56** y lo puso al día el
> **2026-11-20 a las 02:21** (`date`), en la laptop (`LAPTOP-PF6SOUAS`, cuenta suplementaria). El contrato es
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
- **PUNTO 1 ENTREGADO (`a2559de`, empujado a las 23:01).** El taller terminó a las 23:00. En `prototipo/v2/`:
  - `NOTAS.md`;
  - `tokens.css`;
  - `analisis/`: 20 recortes de v1 con medidas;
  - `referencias/`: Linear Insights, Apple HIG Charts, Stripe Billing y Khan Academy (niveles de dominio), todas
    públicas;
  - y el `index.html` de la raíz, puesto al día.

  La cabina volvió a medir:
  - cero corchetes;
  - `prototipo/v1` intacto;
  - ligas sin rotas.

  Le mandó `NOTAS.md`, el recorte del primer pantallazo y las 4 referencias.
  - **Los 5 defectos que más pesan (del taller):**
    1. el primer pantallazo no dice cómo va (coach de 572 px; materias bajo el pliegue);
    2. todo pesa igual y hay demasiadas palabras (244 arriba, 22 tamaños de letra);
    3. no hay rejilla;
    4. el color no tiene sistema (materias grises para `dataviz`, dorado en 10 papeles);
    5. piezas de plantilla (la caja «TU COACH» con franja, las mayúsculas, el punto medio).
  - **Direcciones propuestas:**
    - A «Hoy primero» (la recomendada);
    - B «Dos columnas, dos materias»;
    - C «El cuaderno».
  - **Siete decisiones abiertas** (sección 6 de `NOTAS.md`), con su recomendación:
    1. los colores de las materias (turquesa `#099393` y ocre `#a86b16`, con tinta apagada para los nombres);
    2. «lo que sube» en un paso claro de la materia, no en dorado;
    3. las zonas que salen;
    4. las cuatro zonas nuevas;
    5. el banner;
    6. construir A, B y C;
    7. lo abierto de v1, sobre todo la escala.
- **Su respuesta al análisis: «Sí, todas»** (guardada a las 23:03 en `veredictos/2026-11-19-v2-analisis.md`, con lo que
  queda decidido). La escala sigue sin dar: 200–800, no verificada. Las dos preguntas de v1 van por omisión:
  - la meta por materia;
  - el diagnóstico en 6 + 3 partes.
- **Ronda 2 en curso:**
  - encargo `encargos/RONDA-2.md` (`093094b`, empujado);
  - **solo el Inicio**, en tres direcciones en `prototipo/v2/dashboard.html?v=a|b|c` y `?estado=nuevo`;
  - servidor `herramientas/servidor.mjs` en `127.0.0.1:8805`;
  - capturas a 1440×900, 1366×768 y 390×844, guardas por script y crítico ciego.
  - **Taller:** `taller-ronda-2` (`local_1e4e2acc-0af2-4b2d-9562-e4e205529dbb`), «fresh», sin worktree, Opus,
    esfuerzo alto.
- **RONDA 2 ENTREGADA (`31f12fc`, empujado a las 23:38).** El taller terminó a las 23:36. Entregó:
  - `prototipo/v2/dashboard.html` (+ `dashboard.css`), con seis vistas: `?v=a|b|c` y `&estado=nuevo`;
  - `herramientas/servidor.mjs`: `node herramientas/servidor.mjs` y abrir `http://127.0.0.1:8805/`;
  - las capturas a 3 anchos;
  - las guardas: todo pasa, salvo las palabras en el primer pantallazo (A 115 en el contenido contra la vara de ~80) y
    Español bajo el pliegue en C a 1366;
  - `sloplint`: 0 FAIL;
  - el crítico ciego (`prototipo/v2/critico-ronda-2.md`): A 7,5, B 6 y C 5.

  La cabina volvió a medir: cero corchetes y cero `<svg>`, `prototipo/v1` intacto y `NOTAS.md` solo añade. Le mandó 6
  capturas: A, B y C a 1440; A completa a 1440 y a 390; A en el primer día.
- **Recomendación del taller: A «Hoy primero»,** con dos piezas de las otras:
  - el «Después» por materia de B, en el primer día;
  - la voz de C, en el aviso del coach.
- **Lo que debe decidir** (sección «Lo que necesito que decidas» de `NOTAS.md`):
  1. la dirección;
  2. el menú en celular: tira deslizable o dos renglones;
  3. cuántas palabras (quitar «puntos estimados» y los ejes repetidos);
  4. «¿Voy a tiempo?» en horas totales;
  5. lo abierto de v1: escala, 6 + 3 partes, meta por materia y meta desde el primer día.
- **Su elección (guardada el 20-nov a las 00:38):** *«A, con lo de B y C»*
  (`veredictos/2026-11-20-ronda-2.md`).
  - Las direcciones B y C salen; se recuperan desde `31f12fc`.
  - Los detalles 2 a 4 van por la recomendación de la cabina, porque él no opinó: el menú como tira, menos palabras y
    las horas totales.
  - Lo abierto de v1 sigue por omisión.
- **Ronda 3 en curso:**
  - encargo `encargos/RONDA-3.md` (`db891f9`, empujado);
  - el tablero completo en A, en `prototipo/v3/`: Inicio, Diagnóstico, los dos planes, Bloque, Simuladores y Mi meta;
  - una versión por pantalla, con variantes por parámetro solo si hay una pregunta abierta;
  - capturas a 3 anchos, guardas por script y crítico ciego por pantalla y del conjunto.
- **Taller:** `taller-ronda-3` (`local_f2981d51-e183-4c38-a1b8-a75b63c4abea`), «fresh», sin worktree, Opus, esfuerzo
  alto, puerto 8806.
- **RONDA 3 PARADA (00:56).** Desde la PC, a las 00:48, él escribió: *«el tablero se ve visualmente horrible / parece
  un diseño de hace 20 años»* (`veredictos/2026-11-20-se-ve-de-hace-20-anos.md`).
  - **Diagnóstico de la cabina:** es la regla del arranque «papel y tinta, Literata en todo» (serifa en cifras, pestañas
    y botones), con blanco plano, filetes, enlaces subrayados y radios de 4 px.
  - Él contestó *«Sí, para y cambia»* (`-para-y-cambia.md`).
  - La ronda 3 había hecho las siete pantallas en el look viejo, sin `NOTAS.md`, guardas ni crítico. Se commiteó como
    parcial (`51e0b5f`): es la estructura que se volverá a vestir. `taller-ronda-3` quedó parado e inactivo.
  - **Literata dejó de ser obligatoria:** contrato, punto 2 (`b3591d0` en `aiw-console`).
- **`abrir-tablero.cmd`** (`50e892a`): él lo pidió para la PC. Con doble clic hace `git pull`, arranca el servidor en
  `127.0.0.1:8805` si no corre y abre la página de entrada. Probado en la laptop; **no en la PC**. Él tiene el repo
  clonado en la PC y hace `pull` para ver.
- **Ronda de look en curso:**
  - encargo `encargos/LOOK-1.md` (`7bf41be`, empujado);
  - **solo el Inicio A**, en tres pieles por `?piel=producto|mixta|editorial`: Producto es la recomendada (sin serifa,
    tarjetas blancas sobre gris claro, radios 12–16, sombra suave, pestañas píldora, nada subrayado);
  - se hace como capa de CSS que viaje a las siete pantallas, y se prueba en Mi plan de Matemáticas;
  - lleva referencias de look actual y un crítico ciego con la A vieja como control («¿de qué año parece?»).
  - **Taller:** `taller-look-1` (`local_b7386350-0480-47f1-8ce2-5c1a744b3e53`), «fresh», sin worktree, Opus, esfuerzo
    alto, puerto 8807.
- **LOOK-1 ENTREGADO (`bbf0615`, empujado el 20-nov a las 01:34).** El taller terminó a las 01:30. En `prototipo/look/`:
  - `inicio.html?piel=producto|mixta|editorial`;
  - `plan-matematicas.html` (la capa viaja: 0 reglas solo para Mi plan);
  - `tokens-piel.css` y `piel.css`, que **cargan las hojas de v3**: si v3 cambia, estas páginas cambian;
  - las referencias: Brilliant, Duolingo, Stripe y Notion;
  - las capturas y las guardas;
  - `sloplint`: 0 FAIL;
  - tres críticos ciegos (`critico.md`).

  La cabina volvió a medir: cero corchetes y cero `<svg>`, v1/v2/v3 intactos. Le mandó 6 capturas.
  - **El taller contradijo el encargo:** recomienda **Editorial** (Literata solo en el titular del coach y en los títulos;
    Figtree en la interfaz; tarjetas con filete, radio 20; botón dorado en píldora), no Producto.

    | piel | críticos | «parece de» |
    |---|---|---|
    | Editorial | 8, 7,5 y 8 | 2024–2025 |
    | Mixta | 7,5 | 2023–2024 |
    | Producto | 6,5–7, «plantilla de SaaS» | 2020–2023 |
    | la A vieja (control) | 5,5–6 | 2014–2019 |
  - **Sus decisiones abiertas** (§11 de `NOTAS.md`):
    1. la piel;
    2. el dorado como botón;
    3. Figtree o Roboto;
    4. volver a poner «puntos» bajo la cifra;
    5. reanudar la ronda 3.
- **Su respuesta a LOOK-1** (`veredictos/2026-11-20-look-1.md`, tres mensajes verbatim):
  - *«mejoro mucho, pero ninguna me convence»*: ninguna piel queda fija;
  - en la landing le funcionó buscar referencias de **excelente calidad fuera de su industria** (con las de su industria
    «se ciclaba»). Allá, 14 referencias no le encantaron, y sí «la correcta», Apple;
  - aquí, **Apple no**: *«ocupamos las mejores referenicas de dashboard, de preferencia con un chatbot incluido (e
    coach) de forma integral y con bunea UX»*;
  - elige él, por «espina», viendo link y captura. *«solo pueden entrar los de mejor calidad»*.
- **Galería de referencias en curso:**
  - encargo `encargos/REF-1.md` (`75a20a8`);
  - de 6 a 10 de los mejores dashboards con IA integrada, fuera de educación;
  - cada una con evidencia de calidad (premio o reseña), filtro de tres preguntas (diseño, UX de tablero, IA integrada)
    y crítico ciego: menos de 8, fuera;
  - votos ✓/~/✗ con comentario, que se guardan en `referencias/dashboards/votos.json` (el `servidor.mjs`, ampliado) y
    con «Copiar mis respuestas», porque él vota en la PC.
  - **Taller:** `taller-ref-1` (`local_7af61ef4-f242-413d-9ac0-e292f2a85213`), «fresh», sin worktree, Opus, esfuerzo
    alto, puerto 8808.
- **Al llegar su nota:**
  - leer `NOTAS.md`, las capturas y el crítico;
  - probar el servidor ampliado;
  - commit y push;
  - avisarle que abra `abrir-tablero.cmd` y vote.

  **Sus votos llegan por chat** («Copiar mis respuestas») o, si él hace commit y push desde la PC, en `votos.json`.
- **Después:** con su referencia elegida, extraer sus reglas, como el AB de la landing con Apple, y rehacer el Inicio A
  con ellas. Luego, reanudar la ronda 3 en las siete pantallas.

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

## Tres carriles en paralelo (20-nov, desde las 02:20)

Él (`veredictos/2026-11-20-acelerar.md`): le quedan **menos de 3 horas** de tokens semanales y pidió acelerar sin
desperdiciar. La cabina abrió carriles con superficies de escritura **disjuntas**, todos con Opus, esfuerzo alto, «fresh»
y sin worktree:

| carril | taller (id) | escribe en | puerto |
|---|---|---|---|
| REF-1: galería, con dos enmiendas (la IA es un plus, y una segunda sección «cómo integrar el coach») | `taller-ref-1` (`local_7af61ef4-…5213`) | `referencias/dashboards/`, `herramientas/servidor.mjs` y el `index.html` de la raíz | 8808 |
| UX-1: estructura, flujos y wireframes en gris (`encargos/UX-1.md`) | `taller-ux-1` (`local_d8d6b2d5-…f2`) | `ux/` | 8809 |
| COACH-1: qué dice el coach, cuándo, dónde y con qué datos (`encargos/COACH-1.md`) | `taller-coach-1` (`local_93d6b141-…06`) | `coach/` | 8810 |

- **Solo REF-1 toca el `index.html` de la raíz.** Las ligas de UX-1 y COACH-1 las pone la cabina al commitear.
- **Tras sus votos de REF-1:** varios prototipos del Inicio **simultáneos**, uno por referencia elegida, cada uno en su
  carpeta y con su puerto. Después, el elegido a las siete pantallas: **primero la capa compartida**, y luego las
  pantallas repartidas entre talleres.
