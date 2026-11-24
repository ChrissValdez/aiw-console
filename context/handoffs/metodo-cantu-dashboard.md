# HANDOFF — hilo `metodo-cantu-dashboard` (DASHBOARD)

> **Primer relevo, puesto al día.** Lo escribió la cabina DASHBOARD el **2026-11-19 a las 18:56** y lo puso al día el
> **2026-11-20 a las 02:57** (`date`), en la laptop (`LAPTOP-PF6SOUAS`, cuenta suplementaria). El contrato es
> `context/cabinas/dashboard/CLAUDE.md`.
>
> - **DASHBOARD nunca toca lo de LECCIONES**, y nunca trabaja a la vez que LANDING en el mismo repo.
> - **Todo lo de aquí está medido y lleva fecha. Contrástalo con el disco al abrir: gana el disco.**

## Dónde estamos

- **El repo existe:** `Metodo_Cantu/metodo-cantu-dashboard`, rama `main`, con remoto
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

## PIEZAS-10 votado y PIEZAS-11 publicado (2026-11-22 17:25 – 19:38)

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

## RELEVO A LA PC (2026-11-22 20:17): PIEZAS-12 escrito, sin lanzar

**Por qué:** él sigue el trabajo en la **PC**; la cabina de la laptop se queda quieta. La memoria de Claude (`~/.claude/.../memory/`) **no viaja** entre computadoras: lo que la cabina de la PC necesita está aquí y en el repo.

**Estado exacto:**
- Los repos `metodo-cantu-dashboard` y `aiw-console` quedaron limpios e iguales a `origin/main` (último commit del tablero: fadb784).
- **PIEZAS-11:** él no votó en el panel; dio feedback por chat. Está tal cual en `veredictos/2026-11-22-piezas-11.md`.
- **PIEZAS-12:** el encargo está en `encargos/PIEZAS-12.md` (2b8fe01) y `prototipo/p12-comun/` ya está copiada (fadb784).
  - **Él pidió confirmar el plan antes de lanzar, y no lo ha confirmado.** Los cuatro talleres se lanzaron por error y se detuvieron un minuto después sin escribir nada; no se reanudan. En la PC se lanzan **sesiones nuevas**.
  - **Lo único abierto del plan:** el orden de las dos tarjetas de arriba del Resumen. Dijo las dos cosas, así que va como opción (§14).
- **Artifact:** versión 12 = PIEZAS-11, https://claude.ai/artifact/JLDqDNMqEVUPe1X2aMMhTq.

**Lo primero en la PC:** confirmarle el plan de PIEZAS-12 (está en el encargo) y esperar su «sí, lánzalo».

**Cómo se trabaja (resumen de lo aprendido; detalle en las secciones de arriba):**
- **Talleres:** cuatro sesiones anidadas (`start_session`, `user_asked`, `fresh`, `use_worktree: false`, `effort: high`, nunca Fable), una por carril (L1 inicio y simuladores + `empaquetar.mjs`; L2 resumen; L3 temario; L4 `pN-comun` + `GLOBALES` de `panel.js` + `probar-v4.mjs`). Los briefs de PIEZAS-11 sirven de plantilla: cada uno dice su encargo, su carpeta, su puerto y su marca, y las reglas duras. Puertos de PIEZAS-12: 8869 a 8872.
- **Revisión según la fase (él, 22-nov):** mientras sea lluvia de ideas, revisión ligera (lo nuevo en 1440 y 375, un crítico, solo el par 3 en claro; lo que no cambia, una pasada), meta de ~30 min por taller. La revisión a fondo de las secciones aprobadas va **al final, todas juntas**, después del rediseño.
- **Menos texto (él, 22-nov):** nada de leyendas ni frases que expliquen la interfaz.
- **Commits:** uno por carril (`git -c user.name=ChrissValdez …`, con la línea Co-Authored-By). **Súbelos uno por uno** (`git push origin <sha>:refs/heads/main`), en segundo plano: juntos dan HTTP 408 por las capturas. Si hay cambios sin commit de los talleres, `pull --rebase` falla: si `fetch` dice que solo vas adelante, empuja directo.
- **Antes del commit:** LF (no CRLF; revisa con Python), fijas con el mismo número en las cuatro páginas, sin «PAA Tec», sin tiempos, sin sesskey, sin corchetes en el CSS. Si la página sale de un generador (`curso.mjs`, `temario.mjs`), el arreglo va también ahí.
- **Publicar:** `node prototipo/panel/herramientas/empaquetar.mjs <scratch>/piezasN-art`, luego `node herramientas/vendorizar-artifact.mjs <scratch>/piezasN-art <scratch>/cdn <scratch>/piezasN-pub` (el `cdn` de la laptop no viaja; en la PC se vuelve a llenar). Publicar con `url` del Artifact, `file_path` = `…pub/index.html`, `root` = `…pub` y el mapa `files` (los archivos que ya no existen, con `null`).
- **Votos:** al «ya voté», `node herramientas/servidor.mjs --leer-votos piezas-N` y `ArtifactData list votos`; veredicto tal cual en `veredictos/`; luego `index.html` (sección nueva arriba), este relevo, commit y push.
- **Mensajes:** cerrar con «Qué necesito de ti», «Qué procede» y «⏳ EN ESPERA de …». La hora, con `date`. Antes de crear o cambiar archivos, decirle qué se va a hacer.

## PIEZAS-12 lanzado, integrado y publicado, en la PC (2026-11-22 20:29 – 20:57)

**Plan confirmado:** a las 20:29 la cabina de la PC le confirmó el plan, y él contestó «Sí, lánzalo».

**Talleres:** cuatro sesiones nuevas, todas terminadas, con su servidor apagado.

| Carril | Sesión | Commit |
|---|---|---|
| L1 | `local_1bb82b71-c729-4b60-b006-16db06ff5caa` | 583f7ba: Simuladores sin simulador y el empaque de las p12 |
| L2 | `local_c206b392-84b7-4233-acb0-0408dec27981` | 0770ae8: el Resumen, con §13, §2/§16, §15 y §14; §3 sale |
| L3 | `local_e24535fc-bb87-49d9-992e-b252ba12f6cf` | 6907c07: el Temario sin los tres textos; §17 |
| L4 | `local_bb062702-e638-4a57-befe-9e945835dbb9` | e00be32: §0 en dos colores (contraste mínimo 4,85:1), contrato y `probar-v4` |

Lo que dijeron los talleres:
- **Corrección de L4 al encargo:** §0 de PIEZAS-11 tenía 3 opciones, no la 2 a la 4. Tomó esas tres, y la 4 y la 5 son nuevas. Su crítico recomienda la 5.
- **`probar-v4`:** 620 pruebas y 9 fallas, todas de GitHub (en un taller siempre fallan).
- **El aviso de L4 sobre la integración:** pidió volver a correr `probar-v4` si L2 cambiaba algo después de las 20:47. **La cabina no lo volvió a correr.**

**La guarda del empaque da 1 error, y es falso positivo:** «Al dominar lo esencial…» está en la respuesta del coach a «¿Para qué sirve el diagnóstico?» (Primer día), no en «Lo que sigue». Él pidió quitarlo solo de «Lo que sigue». **Queda sin tocar**, para que él lo vea.

**Publicado sin bajar el CDN.** Los `vendor/` ya estaban en el Artifact y se conservan al actualizarlo. Por eso, en lugar de `vendorizar-artifact.mjs`, se usó un script que solo reescribe las ligas del CDN a `vendor/` (`reescribir-sin-cdn.mjs`, en el temporal de la sesión):
- **Artifact versión 13** (1795402600-6f08), 63 archivos, más los `vendor/` que se conservan;
- 6 archivos nuevos, ninguno quitado.
- El Artifact **no se vio en el navegador**: la cabina no tiene sesión en claude.ai.

**Índice:** fee14a6.

**Cuando diga «ya voté»:** `node herramientas/servidor.mjs --leer-votos piezas-12` y `ArtifactData list votos`.

## PIEZAS-12 votado y PIEZAS-13 publicado, en la PC (2026-11-22 22:03 – 22:57)

**Votos de PIEZAS-12:** 9 secciones, por GitHub (`origin/votos` 5bb90ad; en el Artifact no hubo). Además mandó un feedback estructural por chat. Todo está tal cual en `veredictos/2026-11-22-piezas-12.md` (82cec75), con su «Sí, con esas» al análisis de la cabina (4679e3f).

**Lo que dijo:**
- «es un desorden porque salieron variantes sobre variantes»;
- en Primer día, «Lo que sigue» listaba áreas con «N bloques» en vez de lecciones;
- la palomita de §13 significaba «diagnóstico hecho» y él la leía como «área terminada».

**Lo que decidió con la cabina:**
- «¿Cómo voy?» = avance por área: palomita = terminada; la de en curso, punteada o llena; las demás, sin ícono;
- el diagnóstico, solo en el botón (§18: tres estados para «hecho»);
- §13 como tarjeta completa;
- §19, la segunda vuelta, en el mismo orden de áreas, con A, B y C (la A primero), y el escenario nuevo «Ruta esencial completa»;
- fijas: §2 en la 1 (con «Configura tu meta»), §8 en la 1, §15 en la 4 y §17 en la 5.

**Encargo:** `encargos/PIEZAS-13.md` (4679e3f). Cuatro sesiones nuevas, todas terminadas y con su servidor apagado:
- L1 (327d46e): `local_1415f86c-b620-4851-9a07-3136cd5d7b03`;
- L2 (e91b204): `local_23ae049b-7de4-4072-a2ce-4c89e5b837c0`;
- L3 (dcafba2): `local_28ad12b3-dee7-4c8e-84a8-32b9dd4b7e54`;
- L4 (16ed99d): `local_5ee66064-c347-4605-a524-021ace2a87ab`.

**Resultados:**
- `probar-v4`: 641 pruebas y 9 fallas, todas de GitHub;
- el empaque, sin errores (L1 ajustó la guarda que dio el falso positivo);
- L4 y su crítico recomiendan la 3 de §0 y la 1 de §11.

**Pendiente:** el Resumen manda «Configura tu meta» a `simuladores.html#meta` (la tarjeta del último simulador), pero Simuladores todavía no tiene dónde configurar la meta.

**Artifact versión 14**, publicado sin bajar el CDN: `scratchpad/reescribir-sin-cdn.mjs`, con el mismo método que la versión 13. Índice: 630d046.

**Cuando diga «ya voté»:** `--leer-votos piezas-13` y `ArtifactData list votos`.

## PIEZAS-13 votado y PIEZAS-14 publicado, en la PC (2026-11-22 23:07 – 23:49)

**Votos de PIEZAS-13:** 7 secciones, por GitHub (`origin/votos` 45ecb00), más comentarios por chat. Todo tal cual en `veredictos/2026-11-22-piezas-13.md` (3021e27).
- **Eligió:** §13 en la 1, §16 en la 1, §11 en la 3 y §18 en la 1.
- **§18:** pidió los botones alineados con los de §2, con el diagnóstico a la izquierda.
- **§19:** quiere combinar la 1 con el «Ruta esencial completa» de la 3.
- **§0:** marcó la 1 y la 4 con ~, sin comentario.

**Página nueva, el Historial** (su pedido; «Sí, van esas» a las recomendaciones):
- la pestaña «Historial»;
- se ordena por Materia → Área → Bloque → Quiz, con el diagnóstico a la cabeza de cada área;
- Fundamental y Nivel PAA con sus intentos; el Reto aparte;
- «Revisar» abre `revision.html`, una página mínima de muestra;
- los simuladores no van ahí;
- §20 con 4 opciones.

**Encargo:** `encargos/PIEZAS-14.md` (3021e27). Cuatro sesiones nuevas, todas terminadas y con su servidor apagado:
- L1 (21e9d0b): `local_b737f1ff-b9ed-4af6-a6df-4ca17155c310`;
- L2 (c8223b9): `local_85f73a53-58c6-41aa-9025-f83dc7757fdc`;
- L3, Historial y Temario (1848f2d): `local_5b089fb9-6852-46f4-bb10-fa635b170b46`;
- L4 (cf3e3c9): `local_11e25526-eb39-4b53-bfa9-6e345308f6a1`.

**Resultados:**
- `probar-v4` final: solo las 9 fallas de GitHub. §18 quedó alineada en 40 vistas.
- El empaque, sin errores: 67 archivos con `historial.html` y `revision.html`.
- **Los críticos recomiendan:** la 2 de §20 (tabla con filtros), la 2 de §0 y la 3 de §19.

**Artifact versión 15**, publicado sin bajar el CDN, como la 13 y la 14. Índice: 9237e4f.

**Sigue pendiente:** «Configura tu meta» lleva a Simuladores, y ahí no hay dónde configurarla.

**Cuando diga «ya voté»:** `--leer-votos piezas-14` y `ArtifactData list votos`.


## PIEZAS-14 votado y PIEZAS-15 publicado, en la PC (2026-11-23 00:05 – 01:18)

**Su voto y su foto** (`veredictos/2026-11-23-piezas-14.md`, con `…-primer-dia.png`; 1be7022):
- «Lo que sigue», en Primer día con dos filas: las tarjetas se enciman;
- las tarjetas sin puntos (Primer día, Sin simulador) dejan un hueco feo;
- §20 el Historial: las cuatro ✗, «no se lee la información de forma amigable».
- Al plan: «Lánzalo así; te mando feedback cuando salga».

**Encargo:** `encargos/PIEZAS-15.md` (puertos 8881–8884). Cuatro sesiones, todas terminadas y con su servidor apagado:
- L1, copias y empaque (733ace1): `local_a4dbfbb6-d0cd-40e3-a035-c52c5fcf4b61`;
- L2, el encime y §21 (31d681b): `local_55d33e93-dde0-4b92-8e20-a6cd87569804`;
- L3, §20 con 4 nuevas (fccfebd): `local_14594cab-fa03-45b2-8708-d8a1348d1648`;
- L4, contrato y probar-v4 (46ca2eb): `local_1394057e-bd52-47ff-90d7-c30809519679`.

**Resultados:**
- El encime: la causa era el `row-gap: 0` de `ol.t9s` (subgrid). Corregido; el grupo p15 de probar-v4 da 45/0, y solo quedan las 9 fallas de GitHub.
- §21: el crítico ordena 1 > 2 > 3 > 4.
- §20: el crítico pasó las pruebas de lectura; su orden es 1 > 2 > 4 > 3.
- El empaque, sin errores: 68 archivos (nuevo: `curso-p15.css`).

**Artifact versión 16**, publicado sin bajar el CDN. Índice: 07927cc.

**Sigue pendiente:** «Configura tu meta» lleva a Simuladores, y ahí no hay dónde configurarla. La próxima ronda empieza en el puerto 8885.

**Cuando diga «ya voté»:** `--leer-votos piezas-15` y `ArtifactData list votos`.


## PIEZAS-15 votado y PIEZAS-16 publicado, en la PC (2026-11-23 01:34 – 02:28)

**Su voto** (`veredictos/2026-11-23-piezas-15.md`, 34be461):
- §21: la 1 ✓, así que queda fija en la 1.
- §20: 1, 2 y 3 ✗; la 4 ~. «No solo deja mucho que desear visualmente, sino que tampoco me encanta cómo está organizado. Quizás con un sistema de filtros».
- Al plan: «Sí, lánzalo».

**Encargo:** `encargos/PIEZAS-16.md` (68af381; puertos 8885–8887). Tres sesiones, todas terminadas y con su servidor apagado:
- L1, copias, §21 fija y empaque (d2e4e73): `local_59c696e3-4c7d-4cba-9008-bf6d0a0f717c`;
- L3, §20 con 4 nuevas, todas con filtros (187fef6): `local_37c2a8f9-3d81-45e0-8da9-da3b298d20b2`;
- L4, contrato y probar-v4 (e1827a3): `local_6c81ba90-4232-4e2d-86c6-f7565456c343`.

**Resultados:**
- `probar-v4`: 901 pruebas y solo las 9 fallas de GitHub; la guarda de filtros, 39/0.
- El crítico de §20 hizo dos rondas. En la segunda acertó seguro en las cuatro preguntas (la de filtros incluida). Su orden: 3 > 4 > 2 > 1. Ve la 2 «algo más reporte».
- El empaque: 68 archivos y 0 errores.
- L3 le mandó a piezas14-l4, por error, el aviso de los filtros; L4 lo recibió reenviado.

**Artifact versión 17**, publicado sin bajar el CDN. Índice: a2d8f61.

**Sigue pendiente:** «Configura tu meta» lleva a Simuladores, y ahí no hay dónde configurarla. La próxima ronda empieza en el puerto 8888.

**Cuando diga «ya voté»:** `--leer-votos piezas-16` y `ArtifactData list votos`.


## PIEZAS-16 votado y PIEZAS-17 publicado, en la PC (2026-11-23 02:32 – 04:00)

**Su voto** (`veredictos/2026-11-23-piezas-16.md`, con dos fotos; f68bb05):
- §4.5: la 3 ✓, así que queda fija en la 3.
- §20: la 4 ~, otra vez. «Los filtros son la dirección correcta»; las tarjetas «se ven bonitas, pero cuestan para leer»; la tabla de la 4 «intenta tanto ser moderna que se ve mal».
- Arreglos que pidió: la meta en Sin simulador (§16), el Historial descentrado y el número de «Lo que sigue» en lista pegado a la orilla.
- Al plan: «Sí, lánzalo». Ya lanzado, pidió **8 variantes de alta calidad** del Historial (adenda 7f4d258) y **apagar la PC al cerrar el encargo**.

**Encargo:** `encargos/PIEZAS-17.md` (01cbfa0, con las adendas 7f4d258 y f3f2dd4; puertos 8888–8890). Tres sesiones, todas terminadas y con su servidor apagado:
- L1 (0ce6dc8): `local_5c30e180-5391-4be5-9df6-159a5c03e007`;
- L3 (3f20dcb): `local_59beef6d-cc6f-4960-a41b-e873c410d22e`;
- L4 (2147d10): `local_f948463a-4fe6-444f-829e-b4885bc289f5`.

**Resultados:**
- §20 tiene 8 tablas sobrias con filtros, y el Historial queda centrado como el Resumen.
- Dos críticos ciegos, en 3 o 4 rondas:
  - el de estética entrega las ocho; su orden es 7, 6, 2, 1, 3, 8 (nota 8), y 4 y 5 (7,5);
  - el de lectura da a la 4 «con esfuerzo» (es un estado de cuenta de intentos) y a la 6 «la más directa».
- `probar-v4`: 925 pruebas y solo las 9 fallas de GitHub. El centrado y la meta pasan.
- El empaque: 68 archivos y 0 errores.

**Artifact versión 18**, publicado sin bajar el CDN. Índice: 8ed73ca.

**Al cerrar:** la PC se apaga por su pedido (protocolo de aviso, `shutdown /s /t 300` y `shutdown /a`).

**Sigue pendiente:** «Configura tu meta» lleva a Simuladores, y ahí no hay dónde configurarla. La próxima ronda empieza en el puerto 8891.

**Cuando diga «ya voté»:** `--leer-votos piezas-17` y `ArtifactData list votos`.

## PIEZAS-17 votado, PIEZAS-18 publicado, la auditoría de Moodle y dos prototipos nuevos (2026-11-23 15:00 – 18:56)

**Sus votos de PIEZAS-17:** están en `veredictos/2026-11-23-piezas-17.md` (509e77b).
- **§20:** 1 ~, 2 ✗, 3 ✗, 4 ~, 5 ~, 6 ✗, 7 ✗, 8 ✗. La base queda así: agrupar por área como la 5, la tabla de la 1, los filtros por estado y una lista de filtros para votar.
- **El panel:** pidió números en tres modos (Pendientes, Todas, Ocultar), las fijas plegadas y un botón «Ir a [escenario]».
- **La meta en Primer día:** seguía desacomodada.

**Encargo:** `encargos/PIEZAS-18.md` (b0f0d8e, puertos 8891 a 8893). Tres carriles, todos terminados y con su servidor apagado:
- **L1** (081ff35): `local_d53a3930-3adc-4c5d-9e7a-580229f5ad27`. Reprodujo lo de la meta en Primer día (21 de 96 vistas salían mal) y lo arregló en `p18-curso/curso-p14.css`.
- **L3** (0be2757): `local_92c4a748-a2d5-4a61-8cc0-1eb2e6bdfa23`. §20 en 4 opciones sobre la misma base, y §22 con la lista de filtros para votar.
- **L4** (44bd886): `local_932a7199-9ebe-4d1c-986a-9d1b246b621e`. Los tres cambios del panel. `probar-v4` corrió 1066 pruebas y solo fallaron las 9 de GitHub.
- **L4 no verificó:**
  - lo nuevo en modo oscuro;
  - si la prueba de escenarios en vivo hace parpadear la página;
  - el botón «Ir a» cambia el escenario, pero no la materia; él tiene que decidir si eso basta.

**Lo que se publicó:**
- **El empaque:** 68 archivos y 0 errores. La única liga externa sigue siendo el cargador de Web Awesome, igual que en la v18.
- **La versión 19 del Artifact,** con la etiqueta «PIEZAS-18».
- **El índice:** 4b71ff0.

**Lo que se habló aparte:**
- **Los tipos de curso y el acceso:** `veredictos/2026-11-23-tipos-de-curso.md`.
  - **Lo que decidió él:**
    - un curso por cada cosa que se estudia;
    - el switch es por materia, y Español lleva dentro Lectura y Redacción;
    - el acceso se quita por fecha, puesta por grupo o por alumno;
    - el aviso de que se acaba va por correo;
    - sin tarjetas de «Terminado»;
    - agrupar los cursos se diseña pensando en la UANL.
  - **Lo que propuso la cabina y él no ha confirmado:**
    - dos tipos de curso: Examen de admisión y Materia;
    - el simulador de la UANL vive en el curso de áreas comunes.
- **La auditoría de Moodle,** de solo lectura y por SSH: `fase2/AUDITORIA.md` y `fase2/INVENTARIO.md` (c9b6a37).
  - **Los seis hallazgos altos:**
    - no hay respaldo;
    - no hay servicio de correo;
    - el modo debug se muestra en pantalla;
    - el chat hace llamadas que esperan hasta 120 s;
    - el servidor tiene 1.9 GB de RAM y no tiene swap;
    - el chat carga sus librerías de un CDN sin versión fija.
  - **La recomendación:** un plugin local, `local_metodocantu_dashboard`.
  - **Las decisiones que esperan a Chris:** la fase 0 y su presupuesto, el servicio de correo, qué fuente manda sobre el avance, plan por bloque o por lección, y la prueba de carga.

**Los prototipos nuevos**, que él pidió con un «sí, los dos». Sus encargos están en c88e411:
- **MAESTRO-1** (puerto 8894, `prototipo/maestro-1/`): `local_aaa2c2ed-e684-480c-8530-d5e79c4523d6`. Son las pantallas del maestro: sus cursos y grupos, la tabla del grupo, la ficha del alumno y la vista por quiz.
- **CURSOS-1** (puerto 8895, `prototipo/cursos-1/`): `local_d0259e07-dbfc-4f2a-9fbf-acfde1d88a80`. Es «Mis cursos» agrupado por familia.
- A las 18:56 los dos esperaban a su crítico ciego. **Falta ver si el panel de votar funciona fuera de una carpeta `pN-`:** `prefijo()` en `panel.js` solo reconoce las carpetas `pN-`.

**La próxima ronda de piezas empieza en el puerto 8896.**

**Cuando diga «ya voté»:** `--leer-votos piezas-18` y `ArtifactData list votos`.

**Adenda de las 19:03 (`date`): MAESTRO-1 y CURSOS-1 publicados en un Artifact aparte.**
- **El Artifact:** https://claude.ai/artifact/FWp12BZQX2Z1DLmQf88U2M (v1). Trae una portada con las dos ligas y declara la misma base `votos` que el principal. Los votos se guardan aparte de PIEZAS-18: sus nombres son `maestro-1` y `cursos-1`.
- **Cómo quedó el empaque:** se conserva la forma del repo, con `maestro-1/`, `cursos-1/`, `p18-comun/` y, copiados del Artifact principal, `kit/`, `panel/` y `vendor/`. El script es `<scratch>/empacar-nuevos.mjs`.
- **La liga «Seguir» de CURSOS-1** quedó en `#`.
- **Los commits:** CURSOS-1 22d54df, MAESTRO-1 f5ff479 e índice 3000ddd.
- **Las sesiones:** `local_aaa2c2ed-e684-480c-8530-d5e79c4523d6` (maestro1) y `local_d0259e07-dbfc-4f2a-9fbf-acfde1d88a80` (cursos1).
- **Lo que reportaron los talleres:**
  - el panel funciona fuera de `pN-`, aunque pide las páginas `p3-*` de más;
  - el «Escenario» del panel no hace nada en CURSOS-1, que tiene su propio selector al pie;
  - «Ver la sección» no cambia de pantalla en MAESTRO-1; se arregla si `irA()` manda el evento `a3:ver`, y eso le toca a L4.
- **Para él:**
  - el nombre del PAA, porque «Curso para Examen de admisión» no dice PAA;
  - la etiqueta «En curso», que se repite en todas las tarjetas;
  - el nombre «Nivel parcial» para Cálculo;
  - revisar las preguntas del maestro, en `prototipo/maestro-1/NOTAS.md` §0.
- **Cuando diga «ya voté» en estos:** `ArtifactData list votos` en la liga nueva. `--leer-votos` no los ve.

## PIEZAS-18 y MAESTRO-1 votados; PIEZAS-19 y MAESTRO-2 publicados (2026-11-23 19:22 – 20:50)

**La meta en Sin simulador** («ya van como 3 rondas»): la cabina la reprodujo en su navegador a 900 px.
- **La causa:** `.p16__pie` iba con `flex-end`, y en Típico es `space-between`.
- **El arreglo:** 8a58936, publicado en la v20.
- **La guarda nueva:** cada escenario se compara contra Típico al mismo ancho. Está en `probar-v4` desde PIEZAS-19, con 221 de 221.

**Los votos** llegaron por `origin/votos` (b8faedc), porque votó en las páginas del repo; en los Artifacts no había nada.
- **Corrección a la adenda de las 19:03:** `--leer-votos maestro-1` y `cursos-1` sí los ven.
- **Los veredictos:** `veredictos/2026-11-23-piezas-18.md`, `-maestro-1.md` y `-cursos-1.md` (a7e6d35).
- **PIEZAS-18:** §0 y §14 sin votar.
- **CURSOS-1:** solo §1 (1 ~ y 3 ~, «muy monocromático»), sin enviar.

**Las rondas nuevas**, con los encargos `PIEZAS-19.md` y `MAESTRO-2.md` (067615b):
- **PIEZAS-19:**
  - L1 1b08bb8, `local_f0f3f29e-4290-41af-9bbc-b4948f36a265`;
  - L3 40152fd, `local_c1c8f0dd-f068-4d34-9cb7-7dfb5e39cba2`;
  - L4 5b04659, `local_3973d18f-4a56-47ce-acb2-19098120d0e8`;
  - 1300 pruebas, y solo fallan las 9 de GitHub;
  - lo que trae: §20 con 4 opciones (un renglón por nivel), §22 decidida (los seis filtros), §6 con 2 opciones, §19 con 3 y el evento `a3:ver` en el panel.
- **MAESTRO-2:** c7eea77, `local_303828f8-739f-4cb1-aacd-5b3a24690863`. 108 de 108 guardas; el crítico pasó las 6 pruebas.

**Lo publicado:**
- **El Artifact del alumno, v21:** 70 archivos.
- **El Artifact de maestro y cursos, v2:** MAESTRO-2 en lugar de MAESTRO-1, más CURSOS-1 y el panel nuevo, copiado del principal.
  - El empaque es `<scratch>/empacar-nuevos2.mjs <proto> <salida> maestro-2 cursos-1`.
  - Ojo: borra la salida, así que hay que reponer el `index.html` desde `<scratch>/portada-v1.html`, con su ronda.
- **El índice:** 7fad4f1.

**Quedan para él:**
- cómo seguía su comentario de §22, que se cortó en «el área de filtros»;
- qué opción del Historial «no jala»;
- las 4 decisiones de MAESTRO-2 que el taller dejó en `NOTAS.md` §5;
- §2 y §3 de CURSOS-1;
- §0 y §14 del alumno.

**La próxima ronda empieza en el puerto 8900.**

**Cuando diga «ya voté»:** `--leer-votos piezas-19`, `maestro-2` y `cursos-1`, más `ArtifactData list votos` en las dos ligas.

## PIEZAS-19 y MAESTRO-2 votados; PIEZAS-20 y MAESTRO-3 publicados; UNIR-1 en curso (2026-11-23 22:10 – 23:35)

**Los votos** llegaron por `origin/votos` (9ec1832); en los Artifacts, nada.
- **Los veredictos:** `veredictos/2026-11-23-piezas-19.md` y `-maestro-2.md` (997a75e).
- **CURSOS-1:** sin enviar; solo §1 de antes.
- **Comentarios cortados:** §1 de MAESTRO-2 («Además...») y §22 de PIEZAS-18 («el área de filtros»). Se le preguntaron; sin respuesta aún.

**Las rondas**, con los encargos `PIEZAS-20.md` y `MAESTRO-3.md` (6b2fba5):
- **PIEZAS-20:**
  - L1 86d9e7f, `local_067c917a-d4b6-493f-ad05-8760782b90a5`: paleta 0 por omisión, escenario «Cambio de área», §20 fija en la 3 sin medallas, contrato, `probar-v4` (1367, solo las 9 de GitHub) y empaque;
  - L2 57d689b, `local_7f299984-329a-4a2d-b55e-0f0eff88e6df`: §6 con 3 variantes de la 1;
  - L3 0e95739, `local_7765bce0-8983-44bd-9eef-d0060cfea76b`: §0 y §14 fijas, §19 con 3 y §23 (el bloqueo por diagnóstico) con 3.
- **MAESTRO-3:** 242e358, `local_dde117eb-14a7-402a-8a53-167d2f09e384`. §1 fija en la 2, §2 con 4, §3 y §4 con 3; 124 de 124 guardas.

**Lo publicado:**
- **El Artifact del alumno, v22:** 72 archivos.
- **El Artifact de maestro y cursos, v3:** MAESTRO-3 en lugar de MAESTRO-2, más CURSOS-1; el panel, copiado del principal v22.
  - La portada se repone con `<scratch>/portada-m3.mjs <portada-nuevos-v2.html> <nuevos-pub>/index.html`.
- **El índice:** 38430dd.

**Su pedido para la siguiente ronda** (23:19, «no lo juntes en esta»):
- Un solo prototipo de alumno y maestro, con un switch en el panel y en el menú de la bolita, y una portada mínima de dos botones.
- Está tal cual en `veredictos/2026-11-23-siguiente-ronda-alumno-y-maestro.md` (6b20113).
- Dijo «Sí, en cuanto se libere», así que se lanzó **UNIR-1** (`encargos/UNIR-1.md`, 6dcc832) tras integrar L1: puerto 8904, `local_6538bfc9-f159-4bec-9d28-9f93fedb3b76`.
- Escribe en el panel, en la cabecera de `p20-comun` y `maestro-3`, en `vigente.json` y en el empaque unido.
- **Al integrarlo**, publicar el empaque unido en la liga principal (JLDq…) y dejar de usar la de maestro (FWp1…).

**La próxima ronda empieza en el puerto 8905.**

**Cuando diga «ya voté»:** `--leer-votos piezas-20` y `maestro-3`, más `ArtifactData list votos` en las ligas.

## UNIR-1 integrado: alumno y maestro en una sola liga (2026-11-24 00:23)

**Integrado:** addff38, `local_6538bfc9-f159-4bec-9d28-9f93fedb3b76`.
- El switch Alumno | Maestro en el panel.
- El menú de la bolita, en `p20-comun/cabecera.*` y en `maestro-3/yo.*`.
- `prototipo/vigente.json`.
- `empaquetar-unido.mjs`.

**Pruebas:**
- 125/0 en el repo y 125/0 empacado.
- `probar-v4`: 1372, y solo fallan las 9 de GitHub.
- Las guardas de MAESTRO-3, sin fallas.
- El crítico: 4/5 en computadora y 3/5 en celular.

**Publicado en la liga principal, v23** (JLDq…), con la portada de dos botones y las rutas `alumno/…` y `maestro/…`.
- El empaque: `node prototipo/panel/herramientas/empaquetar-unido.mjs <scratch>/unido --vendor`.
- Se publica todo menos `unido.json`.
- Los archivos viejos de la raíz (curso.html, etc.) siguen en el Artifact, sin ligas; no se borraron.
- La cabina no pudo abrirlo: el navegador del panel no tiene sesión de claude.ai.

**La liga de maestro y cursos (FWp1…, v3)** queda vieja; ya no se publica ahí.
- CURSOS-1 no entra en la liga única.

**El índice:** cfc4602.

**Para la siguiente ronda:**
- cambiar `vigente.json` y volver a empacar;
- un `maestro-4/` necesita `yo.js` y `yo.css` (ver `prototipo/panel/NOTAS-unir1.md` §2).

**Lo que señaló el crítico y queda para él** (NOTAS-unir1 §3):
- en el celular, la burbuja de votar cambia de forma;
- la bolita no indica que abre un menú;
- no hay vuelta a la portada;
- el maestro no tiene botón de tema.

## PIEZAS-20 y MAESTRO-3 votados; PIEZAS-21 y MAESTRO-4 publicados en la liga única (2026-11-24 00:36 – 01:28)

**Los votos** llegaron por `origin/votos` (7f12dbc). Los veredictos son `veredictos/2026-11-24-piezas-20.md` y `-maestro-3.md` (47f659c); el de maestro trae su mensaje tal cual.
- **Lo que pidió para el maestro:**
  - opciones **por componente**, no por pantalla;
  - tablas que no se vean básicas ni saturadas;
  - más variantes.
- **El error de la cabina:** fijar §1 de MAESTRO-3 por un ✓ que traía cambios.
- **La regla nueva** (en `encargos/PIEZAS-21.md`): un ✓ con comentario de cambios no fija la sección.

**Las rondas**, con los encargos `PIEZAS-21.md` y `MAESTRO-4.md` (1528e76):
- **MAESTRO-4:** 8485239, `local_9b3ba984-41e9-46f1-b94b-fa0200773f4f`.
  - §0, el estilo de tabla global, con 5 opciones.
  - §1 en tabla, con 3.
  - §2, la tabla de alumnos, con 4; lo de arriba, fijo.
  - §3, las tablas de la ficha, con 3; el acomodo, fijo.
  - §4, la tabla de quizzes, con 3.
- **PIEZAS-21 L1:** 1ee85c6, `local_8f7fbe34-816b-4985-9c66-7dea1bbef19b`.
  - §6 fija; §20 con aire y el diagnóstico al inicio; §22 con tres filtros.
  - El menú: Resumen, Simuladores, Historial, Temario.
  - `vigente.json` con PIEZAS-21 y MAESTRO-4.
  - `probar-v4`: 1319, con 2 fallas de la prueba, ya arregladas.
- **PIEZAS-21 L2:** f7c9ebd, `local_a8608df3-51ea-431e-8cc1-e0cd33d96458`. §23 fija en la 3, §19 con 3 y el menú.

**Publicado:**
- **La liga única v24** (JLDq…), con el empaque unido `--vendor`, de 88 archivos.
- **El índice:** c9f07fb.

**La próxima ronda empieza en el puerto 8908.**

**Cuando diga «ya voté»:** `--leer-votos piezas-21` y `maestro-4`.

## MAESTRO-4 y PIEZAS-21 votados; MAESTRO-5 y PIEZAS-22 publicados en la liga única (2026-11-24 02:11 – 02:55)

**Los votos:**
- **MAESTRO-4:** `veredictos/2026-11-24-maestro-4.md` (4be2356). Pidió:
  - ninguna tabla que se abra;
  - menos datos en §1;
  - la fecha fin de curso;
  - el buscador junto a «Alumnos»;
  - propuestas para el último simulador;
  - otros colores para el diagnóstico.
- **PIEZAS-21:** `veredictos/2026-11-24-piezas-21.md` (a60baa4). El primer envío llegó vacío («no había votado»); el bueno es el de las 02:18.

**Las rondas:**
- **MAESTRO-5:** encargo 21c6870; trabajo 2330431, `local_7a576bd7-cd21-4df2-94bc-bb0958c2bf6c`.
  - Fijos con sus cambios: §0 (el estilo 1), §1 (la 1 limpia) y §2 (la tabla sola de la 2).
  - Se votan §D con 4, §3 con 3 y §4 con 3.
- **PIEZAS-22:** encargo 55eca97; trabajo 79faadf, `local_5b0826c6-dfb3-449b-8c55-90e46411f491`, un solo carril.
  - El brazo es `p22-curso/brazo.svg`, un archivo con un solo path, sin script, en §19 y §45.
  - §19 y §11 (los botones del coach), con 3 cada una.

**Pidió que le avise de cada ronda en cuanto salga, sin esperar a la otra.**
- MAESTRO-5 salió primero y se publicó solo en la v25, con el alumno de PIEZAS-21.
- Para eso se empacó desde un `git worktree` aparte con un `vigente.json` temporal, porque el del repo ya apuntaba a p22. El worktree se quitó después.
- Luego PIEZAS-22 + MAESTRO-5 en la **v26**.

**El índice:** cce8103.

**La próxima ronda empieza en el puerto 8910.**

**Cuando diga «ya voté»:** `--leer-votos piezas-22` y `maestro-5`. Si alguno llega vacío, preguntarle: puede no haber votado.

## PIEZAS-22 y MAESTRO-5 votados; PIEZAS-23 publicado, MAESTRO-6 en taller (2026-11-24 03:02 – 03:53)

**Los votos:**
- **PIEZAS-22:** `veredictos/2026-11-24-piezas-22.md` (a494fe0).
  - §11 en la 1.
  - §19 en la 3, con el brazo también en la lista de «Lo que sigue».
- **MAESTRO-5:** `veredictos/2026-11-24-maestro-5.md` (0e490d6).
  - §D en la 4.
  - §3: las tres ~. Quiere la gráfica que crece hacia la derecha, cómo ver la lista completa cuando hay 15 simuladores, y los intentos de cada examen como en el historial del alumno.
  - §4: la 2 ~, con seis cambios.

**Las rondas:**
- **PIEZAS-23:** encargo 9cac8da; trabajo 660e3a9, `local_90655ab0-ef04-41b9-a574-4d5a9729ae83`.
  - §11 y §19 fijas; el brazo en la lista; nada que votar en el alumno.
  - `probar-v4` da 1002/0.
  - Quedan dos `fa-star` en chips del coach («¿Qué sigue?»): no marcan refuerzo y se quedaron.
  - Publicada sola en la **v27**, con MAESTRO-5. El índice va en c37558d.
- **MAESTRO-6:** encargo 5d5e09e; `local_43d8c581-6f17-498c-8d63-186b981bface`, en el puerto 8911. Sigue en taller.
  - §D fija en la 4.
  - §3 con 3 opciones: gráfica hacia la derecha, lista completa con 15, intentos por examen.
  - §4 con 3 variantes de la 2.

**Al integrar MAESTRO-6:**
- poner `vigente.json` en MAESTRO-6;
- empacar y publicar la v28;
- avisarle.

**La próxima ronda empieza en el puerto 8912.**

## MAESTRO-6 publicado en la liga única, v28 (2026-11-24 04:03)

**El trabajo:** fa73086, `local_43d8c581-6f17-498c-8d63-186b981bface`. `vigente.json` queda en PIEZAS-23 + MAESTRO-6, con el nombre «MAESTRO-6».

**Lo que trae:**
- §D fija en la 4.
- **§3, con 3 opciones.** Todas llevan la gráfica de barras del alumno hacia la derecha y el Historial con los intentos por quiz (una lista que se abre, no una tabla). Lo que cambia es cómo se ven los 15 simuladores:
  1. la gráfica se recorre de lado;
  2. «Ver los 15» en la misma caja;
  3. una página propia, `#/alumno/<id>/simuladores`.
- **§4, con 3 variantes de la 2.** Todas llevan los quizzes numerados, el switch de materia, el filtro esencial/complementaria, sin cifras arriba ni estrella/medalla, y «Aprobaron» en azul marino en lugar de verde. Varían así:
  1. la columna N.º y segmentados;
  2. una pastilla, pestañas y un menú;
  3. agrupados por área, un interruptor y botones.

**Datos inventados:** Bruno (`paa-a-11`) tiene 15 simuladores.

**Lo medido:** 164 vistas y 793 escenarios, 0 fallas. Con 15 simuladores, la columna mide 453 px contra 476 del avance por área.

**Para que decida Chris, del crítico:**
- el color de Español se parece al naranja de «sin aprobar»;
- el interruptor de §4·3 se lee peor que las pestañas;
- quedó una duda sobre qué color quería cambiar en «aprobado».

**El índice:** b9fa5d9.

**La próxima ronda empieza en el puerto 8912.**

**Cuando diga «ya voté»:** `--leer-votos maestro-6`. El alumno (PIEZAS-23) no trae nada que votar.

## PIEZAS-24 publicado, v29 (2026-11-24 04:43)

**Los votos:** `veredictos/2026-11-24-maestro-6.md` y `-piezas-23.md` (35c9e08). Pidió:
- §4: la agrupación por área de la 3 con el switch de la 1; ordenar dentro del área; colapsar por área.
- §3: las opciones se veían iguales (solo cambiaban con Bruno, que tiene 15).
- En el detalle del quiz, los intentos de cada alumno; el historial como el del alumno; el diagnóstico en su propio renglón.

**Encargos:** 556e2ce.

**PIEZAS-24:** c10fc5a, `local_ed45103b-3122-4c1a-9097-96a1e7ca4670`.
- En el Historial, el diagnóstico de cada área es un renglón como un quiz y despliega sus intentos.
- `probar-v4` da 1002/0.
- Publicado en la **v29**, con MAESTRO-6. El índice va en este mismo cierre.

**MAESTRO-7:** `local_1112902f-b56b-4662-8f78-75b967f31a5c`, en el puerto 8912. Sigue en taller.
- §4 fija con colapsar por área.
- §3 con 3 opciones que se distinguen.
- §5 nueva, el historial de la ficha.
- El detalle del quiz con intentos.
- Al integrarlo: `vigente.json` a MAESTRO-7 y publicar la v30.

**La próxima ronda empieza en el puerto 8914.**

## MAESTRO-7 publicado, v30 (2026-11-24 04:56)

**El trabajo:** 9e7ac39, `local_1112902f-b56b-4662-8f78-75b967f31a5c`. `vigente.json` queda en PIEZAS-24 + MAESTRO-7, con el nombre «MAESTRO-7».

**Lo fijo:**
- §4 agrupada por área como en la 3, con el switch de la 1. Ordenar ordena dentro del área, y cada área se colapsa.
- El detalle del quiz: tocar un alumno abre sus intentos de ese quiz.

**Lo que se vota:**
- **§3, con 3 opciones:**
  1. gráfica y tabla de todos;
  2. toda la gráfica y el detalle del simulador que toques;
  3. su página, con el botón «Historial completo».

  El panel lleva a Bruno (15 simuladores).
- **§5 nueva** (clave `6`, etiqueta «5»), con 3 opciones:
  1. renglones finos con los intentos en línea;
  2. tarjetitas con tejas, como el alumno;
  3. una tabla por área con colapsar, como §4.

  Las tres llevan switch de materia, sin «Todas (26)», y el diagnóstico en su propio renglón con sus intentos.

**Datos inventados:** los diagnósticos tienen 2 o 3 intentos. Bruno presentó el de Álgebra tres veces: 36, 50 y 62.

**Lo medido:** 222 vistas y 729 escenarios, 0 fallas.

**El crítico:**
- §3 con 4 simuladores: «se distinguen, aunque poco».
- Sus favoritas: §3·3 y §5·3.
- Sobre si el maestro se siente un solo sistema: «a medias», porque los menús de área de §5·1 y §5·2 no hablan igual que el colapsar.

**La próxima ronda empieza en el puerto 8914.**

**Cuando diga «ya voté»:** `--leer-votos maestro-7`, y también `piezas-24`, por si deja comentarios.

## MAESTRO-7 votado; MAESTRO-8 publicado, v31 (2026-11-24 05:12 – 06:11)

**Los votos:** `veredictos/2026-11-24-maestro-7.md` (14a16ff8).
- §3: la 3 ~.
- §5: la 3 ~.
- Pidió el acceso a la revisión de cada intento.
- §D: los encabezados se ven como renglones.
- El resaltado del renglón no se ve sobre el velo de color.
- Por chat (05:14): quitar la leyenda de §4 y usar verde, rojo y gris para los estados. Va copiado tal cual en el encargo.
- Tomé «otra cosa que agregar al ticket» como su sí para lanzar.

**La ronda:** encargo 30c9bdc7; trabajo f6d7dfd8, `local_9776236c-25ed-459d-bbb0-91824ce790e3`.

**Lo fijo:**
- §4 sin leyenda.
- Los estados en todo el maestro: verde aprobado, rojo sin aprobar (carmesí #a3124f, que ya no se confunde con Español) y gris faltan.
- El resaltado del renglón se ve sobre el velo de color.
- «Ver revisión» en cada intento, que lleva a una pantalla de muestra sin preguntas inventadas.
- §3 en la 3 y §5 con la 3 como base.

**Lo que se vota:**
- **§3a**, el acceso a la página de simuladores (clave 3), con 4 opciones.
- **§3b**, el estilo de la gráfica (clave 7), con 3.
- **§5** (clave 6), con 4.
- **§D** (clave 5), con 3.

**Las favoritas del crítico:** §3a·2, §3b·1, §5·1 y §D·1. Dijo que el maestro «en general sí» se siente un solo sistema.

**Lo medido:** 352 vistas y 818 escenarios, 0 fallas. Lo publicado es la **v31**, con PIEZAS-24.

**La próxima ronda empieza en el puerto 8915.**

**Cuando diga «ya voté»:** `--leer-votos maestro-8`.

## MAESTRO-8 votado; MAESTRO-9 publicado, v32. Relevo antes de la mudanza (2026-11-24 06:27 – 07:22)

**Los votos:** `veredictos/2026-11-24-maestro-8.md` (2fa9a277).

**La ronda:** encargo d5766666; trabajo 3dccd4eb, `local_fc377491-1d58-4884-b2c2-ad8bc08a751e`.

**Lo fijo:**
- §3a en la 1: la meta va arriba de «Ver revisión», y «Ver revisión» queda donde decía «Los últimos 6 de 15».
- §3b en la 1, con una notita por materia.
- §5 en la 2, con el resalte sutil (filete y cifra 800).
- §D en la 1, con el título y el buscador en un renglón.
- El resaltado de renglones: el hover no toca la línea, y lo abierto lleva el tinte teal.

**Lo que se vota:**
- **§G** (clave 8), con 3.
- **§Q** (clave 9), con 4; la 3 es la recomendada.
- **§P** (clave 10), con 3. La tabla de preguntas más falladas salió.
- **§C**, «Mis cursos» (clave 1), con 3.

**Las favoritas del crítico:** §G·2, §Q·3, §P·3 y §C·1.

**Lo medido:** 286 vistas y 1104 escenarios, 0 fallas. Lo publicado es la **v32**, con PIEZAS-24. El índice va en 801550d8.

**Cuando diga «ya voté»:** `--leer-votos maestro-9`. Él pidió votar **después** de la mudanza.

**La mudanza a `AIW_Workspace\Metodo_Cantu` (aprobada por él el 24-nov):**
- Se hace paso a paso, comprobando cada paso. La hace una sesión nueva en la raíz de `AIW_Workspace`, no la cabina DASHBOARD.
- El plan es el de la otra cuenta (Laptop-Chris). Ojo con:
  - **las memorias de las cabinas**, que cuelgan de la ruta de `AIW_Workspace`;
  - **el `git worktree prune`** de lessons (40 de 147 ya no existen) y revisiones (2), que necesita su sí;
  - **los servidores apagados**.
- **Medido a las 07:22, antes de la mudanza:** en origin/main solo traen `Metodo_Cantu` aiw-console (1 archivo), cantu-studio (88) y cantu-lessons (8). Dashboard, landing, quizzes y revisiones no traen ninguno. cantu-studio tiene 1 archivo sin commit.
- Después de la mudanza, DASHBOARD se reabre desde su lugar nuevo y retoma aquí. Los scripts de publicar de la cabina, que viven fuera del repo, usan la ruta vieja y se ajustan al retomar.

**La próxima ronda empieza en el puerto 8916.**

## Mudanza hecha en la PC; DASHBOARD listo para el coordinador (2026-11-24 08:09 – 08:42)

**La mudanza:**
- Las carpetas de la PC (DESKTOP-525K0IS) quedaron iguales a las de la laptop. El repo vive ahora en **`AIW_Workspace\Metodo_Cantu\metodo-cantu-dashboard`**.
- El plan, el paso a paso y lo medido están en `AIW_Workspace\MUDANZA-PC.md`, que no está en ningún repo.
- **El empaque unido, corrido desde la ruta nueva, sale idéntico a la v32:** 90 ficheros, y solo cambia la hora en `unido.json`.

**Lo que aún cita la ruta vieja:** las herramientas de rondas cerradas (`prototipo/<ronda>/herramientas/*.mjs`) y `prototipo/panel/herramientas/probar.mjs`. Fallan si se corren tal cual, y no se tocan a mano.

**El coordinador:**
- Desde hoy, Método Cantú tiene un **coordinador** que reparte el trabajo en hilos: `aiw-console/context/metodo-cantu/PROYECTO.md`.
- La receta para mudarlo a un Project de claude.ai/code está en `MIGRAR-A-PROJECTS.md`. **En esta cuenta Projects todavía no está disponible.**
- DASHBOARD sigue como hasta ahora: su cabina, o un hilo que abra el coordinador, retoma desde este bloque.

**El estado:**
- **Lo publicado:** la **v32**, en https://claude.ai/artifact/JLDqDNMqEVUPe1X2aMMhTq. Lleva MAESTRO-9 y PIEZAS-24.
- **`vigente.json`:** apunta a MAESTRO-9 (`maestro-9/maestro.html`) y PIEZAS-24 (`p24-inicio/inicio.html`).
- **Los votos están guardados:** `veredictos/2026-11-24-maestro-9.md` y `veredictos/2026-11-24-piezas-24.md` (13e58922). No hay votos sin leer.
- **El congelamiento terminó:** el operador congeló encargos y talleres hasta la mudanza, y la mudanza ya está hecha.

**Lo propuesto, que espera su «sí» para escribir los encargos:**
- **MAESTRO-10**, en el puerto 8916.
  - **Fijo:**
    - §Q, las barras: «Sin presentar» a la izquierda de «menos de 60», con una línea que los separe;
    - §P en la 2;
    - §G, el botón sutil, con un texto más claro, como «Ver resultados del grupo».
  - **Se vota:**
    - §C en 3 variantes, todas en tabla, con encabezado en la columna de los botones;
    - la calificación y la fecha del desglose, en 3 formas que no parezcan fracción;
    - lo abierto en las listas, en 3 variantes: una que solo deja abrir uno a la vez y dos con otro tratamiento, sin fondo gris.
- **PIEZAS-25**, en el puerto 8917: en el Historial del alumno, solo un quiz abierto a la vez, como en el Temario. Fijo.

**Cómo publicar desde una sesión nueva:**
1. Desde el repo, en una carpeta temporal: `node prototipo/panel/herramientas/empaquetar-unido.mjs <temporal>/unido --vendor`.
2. Antes de publicar, la sesión nueva hace **`Artifact read`** de la liga. Una publicación a una liga que esa sesión no ha leído se rechaza.
3. Se publica `index.html` con `url` = la liga y `root` = `<temporal>/unido`, y en `files` cada fichero del paquete **menos `vendor/`**. Font Awesome ya está en la liga desde una publicación anterior.
4. Lo publicado es la v33 o la que siga.

**Leer votos:** `git fetch origin votos` y luego `git show origin/votos:<slug>.json`. El script que los pasaba a veredicto vivía en el scratchpad de la sesión de la cabina. Una sesión nueva escribe el veredicto con los votos y comentarios **tal cual**, con el formato de los anteriores.
