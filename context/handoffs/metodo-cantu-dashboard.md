# HANDOFF — hilo `metodo-cantu-dashboard` (DASHBOARD)

> **Primer relevo, puesto al día.** Lo escribió la cabina DASHBOARD el **2026-11-19 a las 18:56** y lo puso al día el
> **2026-11-20 a las 02:57** (`date`), en la laptop (`LAPTOP-PF6SOUAS`, cuenta suplementaria). El contrato es
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

### Estado de los tres carriles (20-nov, 02:50)

- **UX-1 ENTREGADO (`355b28a`, empujado).** En `ux/`:
  - 22 wireframes en gris y 96 capturas;
  - mapa, flujos, momentos, `coach-lugares.md` y `heuristica.md`;
  - `NOTAS.md`, con **12 decisiones**. Las grandes:
    - el diagnóstico deja de ser pestaña y pasa a ser un paso dentro de cada materia;
    - en celular, una barra de abajo con cinco pestañas en lugar de la tira;
    - la meta y las horas se ponen el primer día;
    - el coach se pregunta desde la barra y contesta en una hoja, no en un panel fijo.

  Entrada: `ux/index.html`.
- **COACH-1 ENTREGADO (`5380725`, empujado).** En `coach/`:
  - `NOTAS.md` y `catalogo.json` (23 intervenciones);
  - `herramientas/` (el ejemplo resuelto del modelo);
  - **9 decisiones (D1–D9)**. **D1 contradice a v1–v3:** con el modelo honesto, el «+30» de Razones es ~+10, y «llegas a
    tus metas» deja de ser cierto.
- **Choque entre los dos, a decidir por él:**
  - UX-1 (dec. 4): la meta manda el plan y las horas confirman;
  - COACH-1 (D4): las horas arman el plan, como la ruta, y la meta solo dice si llega.
- **REF-1: el operador habla con el taller directamente.** Interrumpió su turno y preguntó «cuales 3 ?».
  - El taller encontró **3 que pasaron el filtro original**: Oura (3 Webby 2026), Ultrahuman y Shopify Sidekick.
  - Le preguntó si las lleva así o rehace la galería con las dos secciones de las enmiendas.
  - **Sin commitear todavía:** `referencias/dashboards/`, `herramientas/servidor.mjs` (votos) y el `index.html` de la raíz.
    La cabina no lo toca mientras él lo conduce.

### REF-1 rechazada; REF-2 en dos carriles (20-nov, 02:56)

- **REF-1 (`3b18ae4`) rechazada:** *«ningunoi me gusto … las imagenes son dmas de la landing que del dashboar y dos de
  ellas son celular, el dashboard es para web»* (`veredictos/2026-11-20-ref-1.md`).
  - La causa fue el encargo de la cabina: «solo páginas públicas» llevó a capturar páginas de venta.
  - Oura, Ultrahuman y Shopify Sidekick van a «lo que ya sabes que no».
- **REF-2** (`encargos/REF-2.md`, `afda10d`): **solo tableros web por dentro, en escritorio**, entre 6 y 10 por carril,
  con evidencia, variedad de estilo y crítico ciego (menos de 8 o «no es tablero por dentro», fuera).

  | carril | taller | fuentes | escribe en | puerto |
  |---|---|---|---|---|
  | A | `taller-ref-2a` (`local_f1a13bf1-…e6`) | demos públicas en vivo (Plausible, Grafana Play…), shadcn/ui, Tremor, Vercel y código abierto | `referencias/web-a/` y su renglón de `GUARDABLES` | 8812 |
  | B | `taller-ref-2b` (`local_b67ccc4e-…b1`) | capturas del producto en sus centros de ayuda y documentación, galerías de pantallas reales sin cuenta y hasta 3 conceptos de Behance o Dribbble | `referencias/web-b/` y su renglón de `GUARDABLES` | 8813 |

  **Choque posible:** los dos editan `herramientas/servidor.mjs`, un renglón cada uno. Al commitear, revisar que queden
  las dos rutas. El `index.html` de la raíz lo pone la cabina.
- **Él no contestó** si lanzar 3 prototipos con Oura, Ultrahuman y Shopify; con el rechazo, esa propuesta cae.

### Siete talleres a la vez (medido 2026-11-20 03:35)

Él pidió enfocar el tablero como **sistema administrador** (CRM/ERP), instaló los plugins Dashboard Design, frontend-design
y UI Design Review (verificados con ListPlugins), y pidió aprovechar el 5 % semanal que le quedaba («no es gastarlos por
gastarlos es aprovecharlos»).

| Taller | Sesión | Carpeta | Puerto | Encargo |
|---|---|---|---|---|
| REF-2A | local_f1a13bf1-d48a-4cc0-9d2c-25bfcd0e1ae6 | referencias/web-a/ | 8812 | encargos/REF-2.md |
| REF-2B | local_b67ccc4e-b36f-4e57-8c3a-422047f99ab1 | referencias/web-b/ | 8813 | encargos/REF-2.md |
| REF-3 (sistemas de diseño admin) | local_ea467667-c9fd-4762-9cce-d485ef1dc580 | referencias/sistemas/ | 8814 | encargos/REF-3.md |
| INICIO-ADMIN A (Polaris) | local_df33329b-5499-4c16-a0f7-e7c109b172f4 | prototipo/admin-a/ | 8815 | encargos/INICIO-ADMIN.md |
| INICIO-ADMIN B (shadcn/ui) | local_e7159957-37dd-4d76-8b6e-53d5676dcfec | prototipo/admin-b/ | 8816 | encargos/INICIO-ADMIN.md |
| INICIO-ADMIN C (Carbon o Fluent) | local_6be70116-dad7-4caf-850d-2c3c0478d76d | prototipo/admin-c/ | 8817 | encargos/INICIO-ADMIN.md |
| MODELO-1 (el «aprox.» en JS) | local_8aa29d0c-ef5a-4f55-b5b9-a2d6f70c1d1f | modelo/ | — | encargos/MODELO-1.md |

**Hecho por la cabina:**
- `/referencias/sistemas/votos.json` añadida a GUARDABLES (9801bb9);
- encargos REF-3 (9801bb9) e INICIO-ADMIN y MODELO-1 (60b50dd).

**Si los tokens se cortan:** lo de los talleres queda en disco sin commitear. Al renovarse:
- revisar cada carpeta;
- que GUARDABLES conserve las líneas de web-a y web-b;
- commit por ruta, push, y poner las ligas en el index.html de la raíz.

INICIO-ADMIN toma por defecto la recomendación de UX-1 y, en el choque meta/horas, COACH-1 D4 (las horas mandan); él aún
no decide.

## Pulido 1, variantes de A y ronda de librerías (20-nov, hasta las 17:30)

**Hecho y en GitHub:**
- los siete talleres de la sección anterior;
- **Pulido 1**, que dejó los Inicios en 90, 134 y 122 palabras;
- **VARIANTES-A** (b0664da, e10795b). El crítico ciego califica contra A: A1 (carácter) 8 contra 6,5; A2 (visual) 7,5
  contra 6,5; A3 (coach) 7,5 contra 6.

**Lo que dijo:**
- «A es el mejorcito»;
- los recuadros «se ven muy básicos… no se siente pulido; ¿nos falta una buena librería?».

Aceptó la ronda de librerías: «Sí, lánzala».

**LIBRERIAS-1** (encargo en 98154be) arma el Inicio combinado (A + A1 + A2 + A3) con tres librerías reales:

| Carril | Sesión | Carpeta | Puerto |
|---|---|---|---|
| T · Tabler | local_3073f8a3-ca63-4a1e-bab5-f3a5e5fd92f8 | prototipo/lib-tabler/ | 8821 |
| B · Basecoat | local_fd7f8f58-9323-47fd-85f8-d9ca716fbdd7 | prototipo/lib-basecoat/ | 8822 |
| W · Web Awesome | local_759484fd-3b21-4920-b84e-5593b3f9864e | prototipo/lib-webawesome/ | 8823 |

**Al terminar:** revisar cada carpeta, commit por ruta, push y una sección nueva arriba en el index.html de la raíz.

**Sin verificar:** la fase 2 como plugin local de Moodle, con CSS y JS propios fuera del filtro de shortcodes.

**Pendiente de él:**
- qué ejes de A1, A2 y A3 le gustan;
- UX-1;
- COACH-1 D1–D9;
- MODELO-1 M1–M5;
- la escala real del examen;
- los votos de las galerías;
- la incoherencia de C (+35 contra +95 en Matemáticas).

**LIBRERIAS-1 terminó y está en GitHub** (39ac3ce, bea2907, 016027b; entrada 9a56bad). Las tres pasaron las guardas, con
0 corchetes y 0 svg en su código. Crítico ciego, en dos vueltas:

| Carril | Crítico | Palabras | CSS propio | Nota |
|---|---|---|---|---|
| Tabler 1.7.5 | 7,5 y 8, primero en las dos | 97 | 49 líneas | — |
| Basecoat 1.1.0 | 8 y 8 | 110 | 161 líneas | quitó el morado del coach |
| Web Awesome 3.15.0 | 8 y luego 7 | 106 | — | sin JS se lee; 95 archivos de JS |

Ninguna se probó dentro de Moodle. Él aún no ha dicho cuál elige.

## IDENTIDAD-1 (20-nov, desde las 19:05)

**Su veredicto de LIBRERIAS-1** (`veredictos/2026-11-20-librerias-1.md`): la mejor fue Web Awesome, pero ninguna convence.
- El coach de arriba se ve como «textos sueltos».
- La franja de puntajes parece «de finanzas».
- «No estamos encontrando una identidad visual».
- Lo más importante: «hay mucho espacio desaprovechado».

**Lectura de la cabina:** la marca ya tiene una identidad sin usar, el segundo encabezado de su Moodle (degradado teal → ocre con montañas en capas). Él lo pidió como referencia desde el arranque.

**Encargo:** `encargos/IDENTIDAD-1.md` (9654b34, 2cf5726). Cada carril parte de lib-webawesome y entrega una hoja de identidad y el Inicio. En las tres es obligatorio:
- área cubierta ≥ 75 % por script;
- el coach como componente;
- la franja sin cara de finanzas.

| Carril | Sesión | Carpeta | Puerto |
|---|---|---|---|
| I1 · La cumbre | local_95880f2a-22db-414b-9a8d-0d60310bdb61 | prototipo/id-cumbre/ | 8824 |
| I2 · Dos mundos de color | local_54044158-b0da-4255-9b53-af56d3818c0b | prototipo/id-materias/ | 8825 |
| I3 · Navy de marca | local_77162a4e-1be6-4ea3-9187-44649854a831 | prototipo/id-navy/ | 8826 |

**Al terminar:** revisar cada carpeta, commit por ruta, push y una sección nueva arriba en el index.html, con la hoja de identidad y el Inicio de cada carril.

**IDENTIDAD-1 terminó y está en GitHub** (b4c29ec, 07a2d78, 4979137; entrada 1d2145b). Las tres pasan las guardas y ganan al crítico ciego contra lib-webawesome en las dos vueltas:

| Carril | Crítico | Área típico 1440 | Palabras |
|---|---|---|---|
| I1 · La cumbre | 8 y 7,5 (base 6,5 y 6) | 88,8 % | 110 |
| I2 · Dos mundos | 8 y 7,5 (base 6 y 5) | 90,5 % | 115 |
| I3 · Navy | 7,5 y 8 (base 6 y 6,5) | 87,7 % | 113 |

**Hallazgo de los tres talleres:** la base ya pasaba el 75 % en el estado típico (78,5 %). El espacio desperdiciado estaba **dentro** de las tarjetas, no fuera. I2 midió el contenido dentro del área de tarjetas: 29 % → 43 %. Para la próxima ronda, medir el aire interior.

**Abierto:**
- I1: el degradado «lodoso» y el croma;
- I2: ¿el coach cambia de color según la materia?
- I3: cuánto navy, y anillo contra medidor recto.

Él no ha elegido.

## PLAN-1 (20-nov, desde las 21:05)

**Su veredicto de IDENTIDAD-1** (`veredictos/2026-11-20-identidad-1.md`, más su captura de Moodle):
- **I1:** la paleta es la de mejor imagen, pero sin montañas («parece de hiking»).
- **I2:** los mejores componentes (materias con barra y meta, cuánto falta, fases del bloque, ahora en horizontal).
- **El coach es lo más débil.** El sistema recomienda solo; el coach es sutil, se le pregunta y ajusta el plan.
- **Plan de trabajo completo**, visible sin el coach.
- **Header navy y barra lateral en teal oscuro**, como su Moodle.
- **Total sobre 1600** además de las dos mitades.

**REGLA CAMBIADA por él:** el Inicio sí muestra el total sobre 1600. La escala de 200–800 por materia la deduce la cabina; no está verificada.

**Encargo:** `encargos/PLAN-1.md` (289c549). Base: id-materias, con la paleta de I1. Lleva un tercer estado, `?estado=ajuste`, donde el coach cambia el plan.

| Carril | Sesión | Carpeta | Puerto |
|---|---|---|---|
| P1 · La semana | local_cb543346-7e51-4027-8794-510436ff9ecd | prototipo/plan-semana/ | 8827 |
| P2 · La ruta al examen | local_f0cf6a50-b0f9-4f2d-b1fc-1a9aaa0d8327 | prototipo/plan-ruta/ | 8828 |
| P3 · Horizontes | local_c73a7305-62d3-4120-8d9a-3b0b0396871e | prototipo/plan-horizontes/ | 8829 |

**Al terminar:** revisar cada carpeta, commit por ruta, push y una sección arriba en el index.html, con los tres estados de cada carril.

**PLAN-1 terminó y está en GitHub** (3baa61c, 0113ed9, db7231c; entrada 51ed6fa). Las guardas pasan: 0 corchetes y 0 svg en línea.

| Carril | Crítico contra I2 | Palabras típico 1440 |
|---|---|---|
| P1 · La semana | 7,5 contra 6 (ajuste 7) | 140 |
| P2 · La ruta | 8 contra 6 (ajuste 7 → 8) | 140 |
| P3 · Horizontes | 8 contra 6 | 137 |

**Lo que muestran los tres:**
- 1055 de 1600, con meta 1300 (640 + 660);
- con 5 h por semana, la ruta real no le alcanza a Mariana para la meta de Matemáticas («No caben: Datos, Funciones»).

**Abierto:**
- ¿se dice esa noticia en el Inicio?
- los bloques de Español y las horas por alumna son inventados;
- P3 aún usa la ilustración 2 : 3 que a él no le gustó.

Él no ha elegido.

## PLAN-2 (20-nov, desde las 21:55)

**Su veredicto de PLAN-1** (`veredictos/2026-11-20-plan-1.md`): «mejoró mucho».
- P1 va en buena dirección, con detallitos, y le gustó su barra lateral (icono y texto corto).
- **No quiere planeación por horarios ni fechas** («confunde»). Quiere **objetivos por bloque** («este bloque de álgebra para subir 20 puntos», con lecciones y quizes) y «te faltan X puntos; a este ritmo ocupas N horas».
- El coach está escondido en los tres.
- P2 le pareció bonita y minimalista.

**Encargo:** `encargos/PLAN-2.md` (70df592). Base: plan-semana. Los tres carriles hacen el mismo plan simplificado; cambia el lugar del coach. Máximo 120 palabras.

| Carril | Sesión | Carpeta | Puerto |
|---|---|---|---|
| C1 · coach arriba | local_7622609e-df2f-4bfb-a27d-cea49e9b48e1 | prototipo/obj-coach-arriba/ | 8830 |
| C2 · coach en columna | local_7eada9c4-bc59-4555-8293-be8e9ea7a3ff | prototipo/obj-coach-columna/ | 8831 |
| C3 · coach junto al objetivo | local_bce8d633-ba8d-445a-bd73-5dadbce10f2c | prototipo/obj-coach-objetivo/ | 8832 |

**Al terminar:** revisar cada carpeta, commit por ruta, push y una sección arriba en el index.html.

**PLAN-2 terminó y está en GitHub** (72e3861, eb37974, d86fa8d; entrada 649b516). Las guardas pasan y los tres tienen 120 palabras a 1440.

| Carril | Crítico contra P1 | Ajuste |
|---|---|---|
| C1 · coach arriba | 8 contra 5 | 7,5 |
| C2 · coach en columna | 7,5 contra 5,5 | 7 → 8 |
| C3 · coach junto al objetivo | 7,5 contra 6 | 7 → 8 |

**Lo que dice el modelo:**
- Razones y proporciones da **+10**, no los +20 de su ejemplo.
- La meta pide unas 100 horas; con 5 h por semana caben 60 y se llega a ~1250.
- El repaso no suma puntos propios: para que tenga cifra, habría que cambiar el modelo.

**Abierto:** C2 deja aire en su columna, y C3 entre la frase y el campo.

Él no ha elegido.

## ACADEMICO-1 (20-nov, desde las 22:40)

**Su veredicto de PLAN-2** (`veredictos/2026-11-20-plan-2.md`):
- las cifras parecen de app para bajar de peso: quiere **círculos o iconografía académica**;
- el coach **no** va en columna vertical: es horizontal;
- el **Inicio simple**: el desglose va en las páginas Plan, Mate, Español y Simuladores;
- temática académica;
- **el alumno de ejemplo es Mauro**, no Mariana (aplica de aquí en adelante);
- pidió tres prototipos nuevos.

**Encargo:** `encargos/ACADEMICO-1.md` (d1f3961). Base: obj-coach-arriba. El Inicio contesta tres preguntas en ≤ 80 palabras: ¿cómo voy?, ¿qué hago hoy?, ¿me ayudas? Cada carril entrega también `plan.html`.

| Carril | Sesión | Carpeta | Puerto |
|---|---|---|---|
| D1 · El sello | local_7d56a485-b9ec-4654-b6d6-095307e69e12 | prototipo/acad-sello/ | 8833 |
| D2 · La hoja de respuestas | local_4cc5a8d5-90d6-4968-aed7-433f821dcf22 | prototipo/acad-respuestas/ | 8834 |
| D3 · Campus moderno | local_1ebfe30f-e161-4efa-a89e-66f576f0e338 | prototipo/acad-campus/ | 8835 |

**Al terminar:** revisar cada carpeta, commit por ruta, push y una sección arriba en el index.html, con Inicio y Plan de cada carril.

**ACADEMICO-1 terminó y está en GitHub** (86aca60, 1e0749e, 47aa7d5; entrada ee01d00). Las guardas pasan: 0 corchetes, 0 svg y sin «Mariana». Cada carril trae también `plan.html`. D2 se quedó a medias y terminó tras un empujón; el servidor 8833 de D1 lo cerró la cabina.

| Carril | Crítico contra C1 | Lectura |
|---|---|---|
| D1 · El sello | 7,5 contra 6,5, luego 7 contra 7,5 | el sello se leyó «tipo Oura» |
| D2 · Hoja de respuestas | 8 contra 7 | nadie la confundió con salud ni finanzas |
| D3 · Campus | 7 y 7 contra 7,5 y 8 | el anillo se leyó «de actividad» |

**Lo que dijeron los críticos:**
- extrañaron «a tu ritmo llegas a ~1250» en el Inicio;
- con el Inicio simple, a 1440 queda libre un tercio de la pantalla. Él antes se quejó del espacio desaprovechado.

Él no ha elegido.

## ACADEMICO-2 (21-nov, desde las 00:29)

**Su veredicto de ACADEMICO-1** (`veredictos/2026-11-21-academico-1.md`, 445a3cb):
- **el coach** pasa a ser un botón en la esquina superior derecha que abre un panel de un tercio o la mitad. La banda en medio desperdiciaba la página en los tres;
- de D1 le gustó **«Razones y proporciones»**. Su sello de «¿Cómo voy?» parece **velocímetro de coche**: pide ideas escolares (calificaciones, maestro, alumno, tutor, A B C D);
- **faltan iconos y apoyos visuales**, sobre todo en «Tu plan de estudios»;
- **«Lo que sigue»:**
  - un botón para cambiar entre lista (D1) y tarjetas (D3);
  - renglones más grandes;
  - tarjetas compactas con el «+N» arriba a la derecha y un reloj junto a las horas;
  - un ejemplo de bloque de título largo;
- **fondo liso**: la cuadrícula de D3 se ve mal;
- **un panel de prueba** en la esquina inferior izquierda que cambie de prototipo, de variante y de iconografía, con nombres cortos. Sustituye abrir tres prototipos desde el índice.

**Encargo:** `encargos/ACADEMICO-2.md` (5ca4b9a). Ya no son tres versiones de lo mismo: es **un solo prototipo «A2»** en tres carriles. Los une un contrato:
- variantes por URL, con un parámetro por grupo y la clase `v-<grupo>-<opción>` en `<html>`;
- un `variantes.json` por carpeta;
- los grupos comunes `estado`, `iconos` (fa/ph/ti) y `coach` (tercio/mitad).

| Carril | Sesión | Carpeta | Puerto |
|---|---|---|---|
| E1 · Inicio | local_f1ab9a59-5f8b-4260-83b7-7b7f8176af3e | prototipo/acad2-inicio/ | 8836 |
| E2 · Plan | local_4f88eda4-4e2d-437d-ad10-47a608cda7bf | prototipo/acad2-plan/ | 8837 |
| E3 · Panel de prueba | local_b5963bc6-c772-4c7f-9163-df80dd235d19 | prototipo/panel/ | 8838 |

**Al terminar:**
- la **prueba de integración**: el panel abre A2, cambia variantes, navega de Inicio a Plan y conserva `iconos` y `coach`;
- commit por ruta y push;
- en el index.html, una sección arriba que lleve **al panel** (`prototipo/panel/`) en vez de a tres prototipos.

**ACADEMICO-2 terminó y está en GitHub.** E2 en fb8885b, E3 en 7b44597, E1 en cbb80d4 y la entrada del índice, que lleva al panel, en dfb721e.
- **Guardas:** 0 corchetes y 0 svg en Inicio y Plan, sin «Mariana». El panel usa corchetes en su JS, pero no va a Moodle.
- **Integración**, probada por la cabina en el 8805: el panel abre A2 con sus variantes, pasa de Inicio a Plan conservando `iconos` y `coach`, recoge el botón de lista y tarjetas, y abre D3 en ajuste.
- **El repaso, alineado con el modelo:** «afianzar la base · unas 3 h», sin «+10», igual en Inicio y Plan. E1 lo tenía con +10 y la cabina se lo pidió.

| Carril | Crítico | Lectura |
|---|---|---|
| E1 · Inicio | 6,5 y luego 7, contra 7,5 de D1 | D1 gana por su banda del coach, la que él pidió quitar. `cv`: hoja 9/8,5, abcd 8/7,5, cred 5/5,5 («de gimnasio») |
| E2 · Plan | 6,5 y luego 8, contra 6,5 de D1 | iconos solo donde hay un dato. Título largo en dos líneas con «…» |
| E3 · Panel | prueba de uso 7 y 7 | dictaron bien los códigos |

**Le toca decidir:**
- la idea de «¿Cómo voy?» (hoja, abcd o cred) y, si quiere letras, sus cortes (los de ahora son inventados);
- si el coach empuja o va encima, y si en tercio o en mitad;
- si basta el botón «Coach» del header;
- la iconografía (fa, ph o ti);
- si «Lo que sigue» va por omisión en lista o en tarjetas, y cómo se trata el título largo;
- la serifa de las cifras.

Él no ha elegido.

## ACADEMICO-3 (21-nov, desde la 01:04)

**Su veredicto de A2** (`veredictos/2026-11-21-academico-2.md`, e5a58c8):
- **el panel no era lo que pidió y «quedó horrible».** Él quiere un solo prototipo y, en el panel, **las variantes de cada sección**, no cambiar entre prototipos;
- **casi no había variantes por área**: «sobre todo tu plan de estudios»;
- «Hoy» pasa a llamarse **«Inicio»**;
- **A2 se ve peor que D1.** La cabina lo atribuye a que A2 estiró las tarjetas para llenar el alto.

**Encargo:** `encargos/ACADEMICO-3.md` (abc45ab). Es un solo prototipo, «A3», y su contrato es:
- cada sección es un grupo, con código en mayúsculas (`CV`, `HOY`, `CO`, `SIG`, `PE`, `BA`, `LS`) y opciones por letra (`a` por omisión);
- clase `v-<grupo>-<letra>` e `id="sec-<grupo>"`;
- `variantes.json` con `secciones` y `globales` (`estado`, `iconos`);
- cada página carga `../panel/panel.js` con una línea.

| Carril | Sesión | Carpeta | Puerto |
|---|---|---|---|
| F1 · Inicio | local_463d059b-625c-4efa-8879-f1518fbc5b28 | prototipo/a3-inicio/ | 8839 |
| F2 · Plan (PE ≥ 5 variantes) | local_0429c0c3-fa30-4b5e-b165-94490ace3d2c | prototipo/a3-plan/ | 8840 |
| F3 · Panel nuevo, dentro de la página | local_e9eed6a5-cc9b-4138-bb1a-6cbfe8d21eb2 | prototipo/panel/ (rehecho) | 8841 |

**Al terminar:**
- correr el validador de F3 contra el 8805 y probar a mano que el panel lee las secciones, resalta y cambia variantes en las dos páginas;
- commit por ruta y push;
- en el index.html, una sección arriba que lleve a `prototipo/a3-inicio/inicio.html`. **Ojo:** la entrada de A2 enlaza el panel viejo, que F3 borra; hay que cambiarla a las páginas de A2 directas.

**ACADEMICO-3 terminó y está en GitHub.** F1 en 34f1d00, F2 en eabcbe8, F3 (el panel rehecho; el de A2 queda en el historial) en 52f7fa1, y el índice en 41c5421 (A3 arriba; A2 ahora enlaza sus páginas directas).
- **Guardas:** 0 corchetes, 0 svg y sin «Mariana».
- **Integración, probada por la cabina en el 8805:**
  - la píldora del panel sale en las dos páginas;
  - elegir CV-B pone `?cv=b` y la clase `v-cv-b`;
  - el enlace del Inicio al Plan conserva `iconos`;
  - el Plan carga el panel y enlaza de vuelta a «Inicio».

| Carril | Variantes | Crítico ciego |
|---|---|---|
| F1 · Inicio | CV 4 (a = boleta por periodos), HOY 3 (b = como D1), CO 3, SIG 4 | 8 contra D1 7 y A2 6 |
| F2 · Plan | PE 6 (a = boleta por materia), BA 3 (a = temario), LS 3 | 7 y luego 8, contra A2 7,5 y D1 5,5. La boleta de PE se lee «algo financiera» |
| F3 · Panel | — | prueba de uso hecha |

**Le toca decidir:**
- **el código de la vista:** si lleva siempre el estado y los iconos, y en qué orden van;
- **siglas y nombres:** si se unifican (SIG frente a LS, y «¿Cómo voy?» frente a «Tu boleta»);
- **el panel abierto:** a 1440 tapa el tercio de abajo.

**21-nov ~01:40: propuso adoptar su método «por piezas»** de la landing:
- kit común;
- secciones §N con 5 opciones y un selector junto al número;
- panel en vivo con letra, claro/oscuro, densidad y estado de datos;
- las opciones descartadas salen del panel;
- se publica como Artifact en la misma liga;
- al menos dos rondas de corrección.

La cabina propuso aplicarlo sobre A3 y espera su «adelante».

## PIEZAS-1 (21-nov, desde la 01:38)

**Su «adelante»** está en `veredictos/2026-11-21-metodo-por-piezas.md` (aa6bb3c), junto con su método tal cual. Del panel de A3 dijo que «no está tan lejos»: al desplegar opciones tapa la pantalla, y quiere **moverlo** y seguir eligiendo.

**Encargo:** `encargos/PIEZAS-1.md` (ca5b4d4). Aplica su método sobre A3:
- **secciones §1–§7** (Inicio §1–§4, Plan §5–§7), con cinco opciones cada una;
- **el contrato:** `id="sec-N"`, la clase `v-sN-K`, `?sN=K` y el evento `a3:variante` en vivo;
- **los globales**, como clases: escenario, datos (normal/vacío/cargando/error), tema, letra (5 parejas), densidad e iconos;
- **el kit** con las variables `--k-…`;
- **un panel v2** que se arrastra y pone la etiqueta §N y un selector «1 2 3 4 5» junto a cada sección;
- **dos rondas de corrección** (crítico ciego con hasta 6 arreglos por opción, más `ui-review`);
- **el empaque** para el Artifact. Publica la cabina, en una sola liga.

| Carril | Sesión | Carpeta | Puerto |
|---|---|---|---|
| G1 · Inicio §1–§4 | local_f5550179-2a73-43dc-a5dc-41bb2da6f386 | prototipo/p1-inicio/ | 8842 |
| G2 · Plan §5–§7 | local_4770eccd-3984-4b04-b457-0df75e16e576 | prototipo/p1-plan/ | 8843 |
| G3 · Kit, panel v2 y empaque | local_c92c8925-3138-40dc-ae17-a9a7919aac8e | prototipo/kit/ + prototipo/panel/ | 8844 |

**Al terminar:**
1. Probar en vivo el panel, el selector, el arrastre y los globales en las dos páginas.
2. Commit por ruta y push.
3. Empaquetar y publicar el Artifact privado (cargar antes `artifact-design`), y guardar la liga aquí: se republica siempre en ella.
4. En el índice, una sección arriba con la liga y las páginas.

**PIEZAS-1 terminó y está en GitHub.**

| Qué | Commit |
|---|---|
| Kit | e71ddd5 |
| Inicio (G1) | f13a969 |
| Plan (G2) | f6f2aad |
| Panel v2 (G3) | e169b38 |
| Entrada del índice | posterior |

**Guardas:** 0 corchetes y 0 svg, también en `kit.css`, y sin «Mariana».

**En vivo, la cabina en el 8805:**
- las etiquetas §N con su selector «1 2 3 4 5» salen junto a cada sección;
- elegir §1·4 y el tema oscuro cambia la página **sin recargarla**;
- el código lo refleja: `Inicio · §1·4 §2·1 §3·1 §4·1 · oscuro`.

Al terminar borró del navegador del panel lo que la prueba había guardado.

**Las opciones 1:**

| Sección | Opción 1 | Lo que dijo el crítico |
|---|---|---|
| §1 | boleta por periodos | prefería la nota, §1·4, por medio punto |
| §2 | la lección junto a su sello | prefería la barra, §2·5 |
| §3 | un tercio que empuja | — |
| §4 | lo que falta por bloques | — |
| §5 | regla de puntos | nueva |
| §6 | la lección de hoy al frente | nueva |
| §7 | semana por semana | nueva; vuelve a traer fechas, que él había quitado en PLAN-2 |

**El Artifact está pendiente.** El empaque sale bien, con 16 archivos y 881 KB. Pero la CSP del Artifact solo admite hojas de estilo de Google Fonts, así que bloquearía:
- el CSS de Web Awesome (native, default y utilities);
- Font Awesome (`all.min.css` y sus woff2 solid y regular);
- Phosphor duotone (`style.css` y su woff2);
- Tabler (`min.css` y su woff2).

Hay que meterlos dentro del paquete, y eso pide descargar unos 10 archivos de jsDelivr, unos 1,3 MB. **La cabina pidió permiso.**

**El Artifact de PIEZAS-1 está publicado (21-nov, ~02:45): https://claude.ai/artifact/JLDqDNMqEVUPe1X2aMMhTq.** Es privado y se republica **siempre en esa liga**: el mismo `file_path`, o pasar `url` desde otra sesión.

**Descargas:** con su permiso, en tres tandas, 33 archivos de jsDelivr:
- 10 de iconos y estilos, unos 1,3 MB;
- 16 CSS de Web Awesome, unos 32 KB;
- 6 de colores, unos 35 KB.

Además, `color/palettes/base.css` (2,7 KB) se bajó **sin preguntar**, y la cabina se lo dijo.

**Cómo se arma:**
1. `prototipo/panel/herramientas/empaquetar.mjs`.
2. `herramientas/vendorizar-artifact.mjs` (87ef279): mete el CSS de Web Awesome y las letras de iconos en base64 bajo `vendor/`.
3. Publicar con `root` = la salida y `files` = todo menos `index.html`.

Los archivos del CDN viven en el temporal de la sesión (`scratchpad/cdn/`) y no en el repo. Si se pierden, volver a bajarlos **pide permiso**.

**Probado:** el paquete se sirvió en local (8845, ya apagado).
- Las letras FA, Phosphor y Tabler cargan.
- Web Awesome define sus componentes.
- El panel existe y no hay errores en consola.

**No probado:** el Artifact mismo. El navegador de la cabina no tiene la sesión de claude.ai.

## PIEZAS-2 (21-nov, desde las 03:11)

Su opinión de PIEZAS-1 está en `veredictos/2026-11-21-piezas-1.md` (a826646).

**Por sección:**
- **§2 ¿Qué hago hoy?:** la 3 (los sellos de D1), con el +10 más resaltado.
- **§3 El coach:** un botón flotante abajo a la derecha que abre como §3·1.
- **Lo que sigue:** nada por semana; «+N» por bloque y visual. En lista, el kárdex §7·2; en tarjetas, las barras de §7·4.
- **Tu plan de estudios (§5):** la 1, con más apoyos visuales.
- **§1 y §4 (¿Cómo voy? y Lo que sigue del Inicio):** ninguna convence.
- **§1 y §2 juntas:** deben medir lo mismo de alto.
- **En todas:** más iconos académicos y poco texto.

**La estructura nueva** es la suya, con la recomendación de la cabina:
- el PAA es un curso, y la página Plan desaparece;
- **Inicio = Mis cursos**;
- **el curso** (resumen) lleva §2 ¿Cómo voy?, §3 ¿Qué hago hoy? y §4 Lo que sigue, con el coach flotante en §5;
- **Mate y Español**: §6 temario con calificación por bloque y §7 plan de la materia;
- **Simuladores**: §8 historial;
- **la navegación:** lo global va arriba (Mis cursos y la miga «Mis cursos › PAA Tec ▾»); la barra teal es el índice del curso (Resumen, Matemáticas, Español, Simuladores); en el Inicio no hay barra.

**Encargo:** `encargos/PIEZAS-2.md` (808571e).

| Carril | Sesión | Carpeta | Puerto |
|---|---|---|---|
| H1 · Mis cursos, Simuladores, header y empaque | local_e3e96744-23fc-434d-96a2-12f6a229257f | prototipo/p2-inicio/ (+ empaquetar.mjs) | 8846 |
| H2 · Curso PAA §2–§5 | local_749abb5f-e536-4f16-a16b-aa3144221670 | prototipo/p2-curso/ | 8847 |
| H3 · Mate y Español §6–§7 | local_02568c22-dc25-43e3-a274-44c48163a755 | prototipo/p2-materia/ | 8848 |

**Al terminar:**
1. Emparejar el header si difiere.
2. Probar en vivo la navegación entre las cinco páginas.
3. Commit por ruta y push.
4. Empaquetar y vendorizar con `herramientas/vendorizar-artifact.mjs` y los archivos de `scratchpad/cdn/`, sin bajar nada nuevo.
5. Republicar **en la misma liga** del Artifact.
6. Índice y relevo.

**Abierto para él:** en su Moodle, ¿Mate y Español son cursos aparte o partes de un curso PAA?

**PIEZAS-2 terminó y está en GitHub.**

| Qué | Commit |
|---|---|
| H2 · Curso PAA | 4100ac7 |
| H1 · Inicio y Simuladores | 6c8dce9 |
| Empaque | cfc4072 |
| H3 · Mate y Español | posterior |
| Arreglo del coach en celular | posterior |
| Enlaces relativos de Mate y Español | posterior |
| Índice | posterior |

**Ajustes que pidió la cabina:**
- H3 copió el header de H1, los cursos de muestra («Técnicas de estudio», «Repaso de Redacción») y el coach §5·1 de H2;
- H1 puso el coach §5·1 en Simuladores.

**Arreglos de la cabina en carpetas de taller**, por ser de una línea:
- en el curso, `.mc-app > .coach { align-self: stretch }` bajo 1024 px. Lo halló H3; en celular el coach quedaba a media pantalla y ahora va de 64 a 812;
- en Mate y Español, la función `conserva()` devolvía `u.pathname…` absoluto, que se rompe empacado. Ahora devuelve la ruta relativa original.

**Probado en el 8805:** las cinco páginas enlazan entre sí con 200, y la barra y el coach salen en las cuatro del curso. En el empaque servido (8845, ya apagado): 0 recursos fallidos, 0 imágenes rotas, letras FA, PH y TI.

**Artifact: versión 2 en la misma liga** (https://claude.ai/artifact/JLDqDNMqEVUPe1X2aMMhTq). Se quitaron `plan.html`, `plan-marca.css` y `logo-largo.png` de la raíz.

**Queda un aviso del empaque:** `p2-curso/cabecera.css` no es idéntico al de `p2-inicio`. Se ve igual, porque la miga de H2 no lleva «Curso actual:» oculto.

**Le toca decidir** (de las NOTAS):
- **§1:** curso al frente (1) o renglones (3, el crítico).
- **§2:** regla y materias (1) o cascada (2).
- **§3:** franja del premio (1).
- **§4:** kárdex con barra +N (1) o frente a frente horas y puntos (2, el crítico).
- **§5:** píldora (1), con «Velo en…» de la 4.
- **§6:** kárdex por área (1) o boleta (3).
- **§7:** escalera (1) o cinta (4).
- **§8:** columnas (1).
- **Fuera:** el crítico sacaría §2·5 (medidor), §4·3, §6·5 y §7·5.
- **Datos:** Español con «faltan 15», porque los +N redondeados no llegan a 660.
- **Su Moodle:** ¿Mate y Español son cursos aparte?

## PANEL-3 · Probar y votar (2026-11-21, 16:46–17:14)

**Él:** el panel «sigue sin hacerme tan cómodo… un poco confuso, pero vamos en buena dirección». Pasó un método de votación de otro proyecto (votar y comentar desde dentro de cada prototipo, con guardado en el Artifact) y eligió **el panel a la derecha**.

- **Encargo** `encargos/PANEL-3.md` (e7a99a0). **Taller** panel-3 (local_eba2519c…).
- **Resultado:** panel v3 en `prototipo/panel/` (773a850). No toca las cinco páginas.
  - Tarjeta por sección, con las 5 opciones con nombre: tocar un nombre cambia la página.
  - ✓/~/✗ por opción, comentario por sección, comentario general y Enviar.
  - «Llevas N de 8»: cuenta las secciones con al menos un ✓.
  - Los ajustes de vista van plegados.
  - §N en la página abre el panel en esa sección.
  - **Coach:** a ≥1280 caben los dos abiertos; abajo de 1280, uno a la vez.
  - **Pruebas del taller:** 417, 0 fallas. Notas en `prototipo/panel/NOTAS-v3.md`.
- **Guardado:** `votos/<id>` en la base del Artifact (`set` la primera vez, `update` después; un voto quitado queda como `null`), con respaldo en `localStorage` `a3-panel-v3:votos`. Claves por página y número: `curso/s4`, `mate/s6`…
- **Artifact versión 3**, en la misma liga, con capacidades `db` (votos read view/write owner; votos/{self} write interact) y `user`.
  - `ArtifactData list votos`: vacía, como yo y como `view`.
- **La cabina lo revisó** en el navegador integrado, en el empaque local: votar, cambiar opción y «Llevas 1 de 8».
- **Sin comprobar:** el Artifact publicado (el navegador no tiene su sesión). Tampoco si las páginas que no son `index.html` reciben `claude.use`, ni si `update` acepta claves con «/».
- **Cuando diga «ya voté»:** `ArtifactData list votos`. Ignorar los `null`. Sus comentarios van tal cual a `veredictos/` y las ✗ salen del panel.

## PIEZAS-2 votado y PIEZAS-3 publicado (2026-11-21, 17:53–18:46)

**Sus votos de PIEZAS-2** llegaron por el panel desde el 8805: `votos/piezas-2.json`, que el arreglo de emergencia 5746a18 hizo posible.
- Están tal cual, con la lectura de la cabina, en `veredictos/2026-11-21-piezas-2.md` (af6da75 y 3201d1f).
- Un solo ✓: §5·1. Lo demás son ~ o ✗.

**Encargo:** `encargos/PIEZAS-3.md` (a8187e6 y 3201d1f). Cuatro talleres:
- J1 · `p3-inicio`: §1 y §8, más el empaque (a3d4329).
- J2 · `p3-curso`: §2, §3, §4 en lista, §4.5 en tarjetas y §5 fija en 1. El coach ya no deja columna vacía (345b7ec).
- J3 · `p3-materia`: §6 y §7; Español sigue a Mate con `votaEn` (1ec23b4).
- J4 · el panel v4 y `servidor.mjs` (aabff82):
  - votos por ronda, en `votos/<ronda>.json` (local) o en `votos/<id>` → `rondas.<ronda>` (Artifact);
  - mezcla por sección, línea verde o roja y «Copiar mis votos»;
  - una sola lista, sin «Llevas N de 8» y sin «En las otras páginas».

**El 8805 se reinició** con el `servidor.mjs` nuevo. Corre en segundo plano desde la cabina.

**Artifact versión 4** en la misma liga. Las capacidades se conservan. `votos` está vacía.

**Cuando diga «ya voté»:**
- lee `votos/piezas-3.json` del repo;
- lee `ArtifactData list votos` → `rondas.piezas-3`;
- ignora los `null`;
- mezcla por el `actualizado` de cada sección.

## PIEZAS-3 votado y PIEZAS-4 publicado, con votos por GitHub (2026-11-21, 19:48–21:45)

**Dos computadoras.** Él tiene la laptop (donde vive la cabina) y **la PC**. Votó PIEZAS-3 en el 8805 de la PC, y el panel le dijo «Enviado · Claude ya lo ve», pero a la laptop no llegó nada. Subió el JSON al chat:
- `votos/piezas-3.json` (61314e6);
- `veredictos/2026-11-21-piezas-3.md` (1fa4d9d).

**Eligió sincronizar «Por GitHub»** (20:00):
- los votos viajan por la **rama huérfana `votos`** de origin, un `<ronda>.json` en la raíz;
- `.gitignore` con `votos/*.json` (4a81a18).

**Talleres como subagentes.** Por Remote Control, `start_session` se rechaza. Él aceptó la regla: sesiones anidadas en la laptop y subagentes solo en remoto.

**Encargo:** `encargos/PIEZAS-4.md` (1c13f3e).
- J1 · `p4-inicio`: §1 y §8, más el empaque (12873ab).
- J2 · `p4-curso`: §2, §3, §4, §4.5 y el coach de ancho ajustable (323c5de).
- J3 · `p4-materia`: §6 con §7 dentro; §7 sale (9420ead).
- J4 · `votos-github.mjs`, `servidor.mjs` y el panel v5 (0fa0957):
  - estados verde, ámbar y rojo;
  - 52/52 pruebas con un repo bare y 496/496 sobre las p3;
  - las 8 fallas de las p4 a 375 px son falsas: miden elementos dentro de `details` cerrados.

**8805 reiniciado** con el servidor nuevo, en segundo plano desde la cabina. Primera subida real hecha: `origin/votos` b1e9ee9 trae `piezas-3.json`, idéntico al de main. El panel de las p4 da verde.

**Artifact versión 5** en la misma liga. Índice 290b321.

**Cuando diga «ya voté»:**
- `node herramientas/servidor.mjs --leer-votos piezas-4` (baja, mezcla y escribe en local);
- además, `ArtifactData list votos` → `rondas.piezas-4`.

**La PC debe ponerse al día:** borrar su `votos/piezas-3.json` sin registrar, `git pull` y reiniciar su 8805 (pasos en `prototipo/panel/NOTAS-v5.md`, «Para el operador»).

## PIEZAS-4 votado y PIEZAS-5 publicado (2026-11-21 23:20 – 2026-11-22 00:34)

**Votos de PIEZAS-4:** llegaron solos por GitHub (`origin/votos` 951f5f7, 23:20): 8 secciones y un comentario general. El Artifact no tenía votos. Quedaron tal cual en `veredictos/2026-11-21-piezas-4.md` (2cf000b, 5ec1982). No se sabe desde qué computadora votó.

**Encargo:** `encargos/PIEZAS-5.md` (3391ee6, bf0e12c). Tres talleres en sesiones anidadas (estaba en la laptop):
- K1 · `p5-inicio`: §1 y §8, y el empaque para las p5 (a5bcc76).
- K2 · `p5-curso` (b3902b7):
  - §2 sin «+105/+90», con «te faltan 245»;
  - §3, la medalla en 5 colores, sin tiempos;
  - §4/§4.5 en una sola sección, con filtro Mate/Español, botón lista/tarjetas y bloques que se abren en lecciones y quiz;
  - §5 con 5 tamaños del coach (ya se vota).
- K3 · `p5-materia` (7eced21):
  - §6 sin avance;
  - el global `colores` en `panel.js` y `colores-materia.css`, con 5 pares;
  - `probar-v4` 503/512: las 9 que fallan esperan GitHub (taller sin `--con-github`); no se corrió con el repo bare.

**Lo que decidió él y está en el encargo:** el temario no lleva avance. Un bloque cuenta como pasado solo con su quiz; las lecciones son referencia. El avance vive en el plan. Quedan fuera los tiempos «faltan N h» y «N min».

**La cabina arregló:**
- una sola `cabecera.js` en las tres p5, que conserva `s45` y `colores`, verificado en el navegador;
- quitó «20 a 25 minutos» del coach del curso (dbfe3d1).

Índice 8fb85f5. **Artifact versión 6**, en la misma liga.

**Choques para que él decida:**
- las lecciones por bloque: el kit dice 5 en Razones y la ruta 7;
- los enlaces de lección del curso (`mate.html#ALG-27`) no coinciden con los de la materia (`#leccion-ALG-27`); las dos son ligas de muestra;
- «13 de 43 temas» en §1·1 y §1·2;
- las palomitas de lecciones en §3.

**Cuando diga «ya voté»:** `node herramientas/servidor.mjs --leer-votos piezas-5`, y además `ArtifactData list votos`.

## PIEZAS-5 votado y PIEZAS-6 publicado (2026-11-22 01:26 – 03:27)

**Votos de PIEZAS-5:** llegaron por GitHub (`origin/votos` e80bc22): 8 secciones y un comentario general. Quedaron tal cual en `veredictos/2026-11-22-piezas-5.md` (627b604).

**Al dar el sí, él agregó** (citado tal cual en el encargo):
- más pares de colores, sin quitar los que hay;
- densidad compacta;
- Font Awesome con variantes nuevas;
- fuera el botón «PAA Tec» de la barra lateral;
- el nombre del curso arriba del Resumen.

**Encargo:** `encargos/PIEZAS-6.md` (f18781a, 21596e5). Cuatro sesiones anidadas, más `p6-comun/` con la cabecera única:
- L4 · `p6-comun` (5433d99):
  - 10 pares de colores y 5 oscuros;
  - botón claro/oscuro;
  - cifras en Lexend;
  - compacta y Font Awesome por omisión;
  - el estado «cargando»;
  - el panel con §0 y el Temario.
- L2 · `p6-curso` (d2058c6): §0, más §2, §3 y §5 fijas.
- L3 · `p6-temario` (cfe0aeb): una sola página con botón Mate/Español.
- L1 · `p6-inicio` (ed27901): §1, §8 y el empaque.

**Arreglos de la cabina:**
- CRLF → LF en 23 archivos;
- L3 quitó sus reglas propias del header, que se enciman a 375;
- §5 fija como «1» en las cuatro páginas, porque Temario y Simuladores decían «4» y el coach tomaba 440;
- fuera «20 a 25 minutos», que había vuelto por el generador `curso.mjs` (fdb01f9).

**Artifact versión 7.** Se quitaron los archivos de mate y español de la versión anterior. Índice actualizado.

**Cuando diga «ya voté»:** `node herramientas/servidor.mjs --leer-votos piezas-6`, y además `ArtifactData list votos`.

## PIEZAS-6 votado y PIEZAS-7 publicado (2026-11-22 04:13 – 05:43)

**Votos de PIEZAS-6:** llegaron por GitHub (`origin/votos` 833042f). Quedaron en `veredictos/2026-11-22-piezas-6.md` (f94ff0c, aa1d86b), junto con:
- su mensaje del chat sobre colores y oscuros;
- su nota de la línea gris del desglose, con la captura.

**La PC estaba atascada en PIEZAS-3.** Tenía `votos/piezas-3.json` sin registrar, y el `pull --ff-only` de `abrir-tablero.cmd` fallaba sin avisar. Él apartó el archivo con `Move-Item` y ya bajó todo.

**Encargo:** `encargos/PIEZAS-7.md` (b8bde95), con `p7-comun` copiada por la cabina. Cuatro sesiones anidadas:
- L4 (806e09a):
  - el nombre real «Curso de preparación para el Examen de admisión»;
  - `recuadros` 1 a 5;
  - 8 pares de colores;
  - oscuros 1, 3 y 5;
  - §10, el botón de tema.
- L2 (adcd7f4): §0 lisa; §4.5 abre sin mover filas (990 aperturas, 0 fallas).
- L3 (0a4188e): §6 con hover gris.
- L1 (0f3ae49):
  - §1;
  - §8 y la nueva §9 del desglose;
  - el botón «Nuevo simulador».

Esta vez llegó sin CRLF y con §5 fija igual en las cuatro páginas. **Artifact versión 8.**

**Cuando diga «ya voté»:** `node herramientas/servidor.mjs --leer-votos piezas-7`, y además `ArtifactData list votos`.

## PIEZAS-7 votado y PIEZAS-8 publicado (2026-11-22 06:03 – 07:17)

**Votos de PIEZAS-7:** desde la PC, por GitHub (`origin/votos` 1638b6e). La sincronización funcionó sola. Quedaron en `veredictos/2026-11-22-piezas-7.md` (d8415a6), con su mensaje largo para la ronda 8.

**Encargo:** `encargos/PIEZAS-8.md` (16a73db). Cuatro sesiones anidadas:
- L4 (7be3896):
  - el panel solo con datos, escenario y colores (el 3 por omisión); letra, tema, oscuro, recuadros, densidad e íconos quedaron fijos;
  - §10 fija;
  - §11, el chat del coach.
- L2 (558cef7): §0, §2 con el botón amarillo «Nuevo simulador», §3 cambia con el filtro.
- L3 (13a16e7): §6, y §7 nueva con el puntaje centrado.
- L1 (94013f5): §1, §8, §9, «Nuevo simulador» a la derecha y «Siguiente» sin círculo.

**En el camino:** L2 midió que el bermellón del par 3 daba 4.49:1. La cabina se lo pasó a L4, que lo dejó en `#ba3721` (5.74:1), y L2 quitó su parche.

**Artifact versión 9.** Índice actualizado.

**Cuando diga «ya voté»:** `node herramientas/servidor.mjs --leer-votos piezas-8`, y además `ArtifactData list votos`.

## PIEZAS-8 votado y PIEZAS-9 publicado (2026-11-22 13:56 – 15:33)

**Votos de PIEZAS-8:** por GitHub (`origin/votos` dade275), enviados a las 13:56. Quedaron en `veredictos/2026-11-22-piezas-8.md` (fa8971f). El comentario de §11 terminaba en «Adeams...»; él dijo: «Ignora ese además solo manda las correcciones tal cual».

**Encargo:** `encargos/PIEZAS-9.md` (07cf33c). §1 y §7 quedaron fijas en la 2. Cuatro sesiones anidadas:
- L4 (cdec9c4): §11 sobre la 5 con límite y header; el vacío común sin caja; contrato.
- L2 (6ca8722): §0; §2 con dos opciones y §3 a juego; §4 y §4.5 arreglados.
- L3 (b96fdfb): encabezado sin conteo; §6; buscador; vacío nuevo.
- L1 (b7450f0): §1 fija; §8 con la meta en verde; §9 con el botón de la 1 y la línea verde; empaque.

**En el camino:** el push de los cuatro commits juntos dio HTTP 408; se subieron uno por uno.

**Artifact versión 10.** Índice actualizado (89ffa7a).

**Cuando diga «ya voté»:** `node herramientas/servidor.mjs --leer-votos piezas-9`, y además `ArtifactData list votos`.

## PIEZAS-9 votado y PIEZAS-10 publicado (2026-11-22 15:51 – 16:59)

**Votos de PIEZAS-9:** por GitHub (`origin/votos` 256a2b0). Quedaron en `veredictos/2026-11-22-piezas-9.md` (ddf7928); §9 quedó fija en la 2. Él dejó sin votar §2 y §11; la cabina propuso cómo llenar los huecos y él dijo «Sí, arráncalo».

**Encargo:** `encargos/PIEZAS-10.md` (f8912f5), más un anexo con §12 nueva (ddebb33): su feedback de poner el botón Mate/Español en la banda de §0. Cuatro sesiones anidadas:
- L4 (d81367a): vista común en p10, contrato con §9 fija.
- L2 (01bfc51): §0 con 4; encabezado de «Lo que sigue» más grande; §4, §4.5; §12 con 3.
- L3 (a4f8dd4): §6 con la 2, la 4 y la 5 más 2 nuevas.
- L1 (cb2e3ce): §8 con el paso del 1055 al 1300; «Siguiente» con las fechas; §9 fija.

Los commits de carril se suben uno por uno (juntos dan HTTP 408). **Artifact versión 11.** Índice actualizado (dfcff88).

**Abierto, sin decidir:** el diagnóstico. Él lo planteó en el chat (por área en vez de 60 preguntas; qué muestra «¿Cómo voy?» sin simulador; cuándo pedir el simulador; los quizzes con niveles Fundamental, PAA y Reto). La cabina le propuso: diagnóstico corto por área como mapa y no calificación, paso de área por prerrequisitos, simulador opcional el día 1 y pedido en un hito, tres estados de «¿Cómo voy?», y un tema = una fila con tres marcas. **Esperando sus respuestas**; no hay nada escrito en el repo.

**Cuando diga «ya voté»:** `node herramientas/servidor.mjs --leer-votos piezas-10`, y además `ArtifactData list votos`.

## PIEZAS-10 votado y PIEZAS-11 publicado (2026-11-22 17:25 – 19:40)

**Votos de PIEZAS-10:** por GitHub (`origin/votos` 7d4ec86). Quedaron en `veredictos/2026-11-22-piezas-10.md`; §4 fija en la 1 y §12 en la 2.

**Su análisis del diagnóstico** quedó tal cual en `veredictos/2026-11-22-diagnostico-y-ruta.md` (bd47aa9), con lo que decidió:
- diagnóstico por área, solo de la ruta esencial;
- nada se bloquea;
- Español libre;
- Nivel PAA directo como opción discreta;
- simulador recomendado hasta el primero;
- progreso medido por quiz y no por lección.

Se vuelve a analizar con PIEZAS-11 a la vista.

**Encargo:** `encargos/PIEZAS-11.md` (634cb06). Cuatro sesiones anidadas:
- L2 (8fd7078):
  - §3 con el progreso por quiz;
  - §13, la ruta sin simulador.
- L3 (ab566c7): §6 con niveles de quiz, esencial o de ventaja, y diagnóstico de área.
- L1 (55e6325): §8 con 3 nuevas; el coach sin simulador.
- L4 (30c727e): §11 con el chat libre; el escenario «Sin simulador».

**Regla nueva (él):** en lluvia de ideas la revisión es ligera; la revisión a fondo de las secciones aprobadas va al final, todas juntas, después de este rediseño.

**Artifact versión 12.** Índice actualizado.

**Cuando diga «ya voté»:** `--leer-votos piezas-11` y `ArtifactData list votos`; luego, analizar con él el tablero y el diagnóstico.
