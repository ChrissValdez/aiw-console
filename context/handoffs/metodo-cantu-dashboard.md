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
