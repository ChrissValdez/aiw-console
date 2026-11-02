# HANDOFF — hilo `cantu-lessons` (LECCIONES)

> **Quinto relevo de este hilo.** Lo escribió la cabina el **2026-10-31 a las 00:05** en la PC (`DESKTOP-525K0IS`), antes
> de que el operador compactara la conversación de la cabina (la que abrió el 2026-10-29). Sustituye al cuarto relevo
> (2026-10-29, con añadidos del 30; está en git, `aiw-console` `f118fed`, con la tabla de lo que salió del relevo de
> septiembre).
>
> **Todo lo de aquí está medido y lleva fecha. Contrástalo contra el disco al abrir. Gana el disco.**
>
> **La cabina abre leyendo enteros** `context/cabinas/lecciones/CLAUDE.md` y `context/cabinas/REGLAS-DE-CABINA.md`. La
> app abre la sesión en `AIW_Workspace`, así que ese `CLAUDE.md` **no se carga solo**.

## Dónde estamos (2026-10-31, 00:05)

- **Sin runs (D-083).** El tablero es la **«Galería de lecciones»**: la plataforma de revisión, y cuando el operador dice
  «la galería» es ella entera. El trabajo va por tickets RW, y el siguiente libre es **RW-76**.
  `cantu-lessons/roadmap/roadmap.json` está congelado como historia, y ninguna respuesta abre con la línea del run.
- **Desde el 31-oct (00:32) se revisa por lección,** en orden y por tandas, con L01 de piloto. Es un ticket corrector de
  web y uno de slide por tanda. Está en el contrato de la cabina, «Revisar por lección», y el mensaje del operador en el
  veredicto. **Desde el 1-nov los correctores por tanda los sustituyen los carriles (abajo); L01 quedó aprobada sin correcciones y RW-74 no se usó.** Antes: el corrector de la web de L01 se lanzaba cuando el operador
  diga «L01 revisada».
- **RW-72 está cerrado: sin servidor 24/7 (D-084, 31-oct).** El operador, tras leer el informe: «seguimos con el metodo
  de trabajo actual con la pc como trabajo local y trabajando remotanete es lo que nos ha jalado mejor». El informe
  (`docs/informes/RW-72.md`) queda como punto de partida si se reabre. Después dijo: «procedere a dar mi veredicto
  leccion a leccion».
- **Las 29 lecciones, de L01 a L29** (RW-66), con **29 webs y 29 slides** compiladas. La última que faltaba era la slide
  de L12 (antes L11B), escrita el 30-oct en la ronda 2 de RW-68.
- **La normalización que pidió el operador está hecha:** la numeración, los estados, la slide de L12 y las galerías
  completas con «Hoy» (RW-71).
- **HEAD** (en los tres, HEAD = `origin/main` y el árbol limpio):

  | repo | sha |
  |---|---|
  | `projects/cantu-lessons` | `aec3f72` (el encargo de CR-PL·04) |
  | `projects/cantu-revisiones` | `85c30fc` en `origin/main` (CR-PL·03 integrado). El checkout de la PC ya está en `85c30fc` (el operador pulsó «Traer lo nuevo»), limpio; el 8791 corre, y la cabina publica desde una copia aparte (`git worktree add --detach`, `CANTU_REVISIONES_DIR=<copia> node tools/revision/publicar-paginas.mjs`). Las galerías que los carriles escriben en la PC se pasan a la copia con un índice temporal y `git diff --binary origin/main <árbol> -- <galería> ":!galerias/*/respuestas.*" | git apply --index`; después, en la PC, `git checkout -- galerias` y `git clean -f -- galerias`. Los votos de L12 a L29 aún no están publicados |
  | `projects/aiw-console` | el commit de este relevo |

- **Trabajan RW-59, RW-60 y RW-64** con los votos que el operador pegó en el chat el 31-oct (19:23; veredicto, «El
  operador vota RW-59, RW-60 y RW-64…»). Esperan al operador RW-61 y RW-68. **RW-73 corre en su propia sesión desde el 31-oct,
  19:27** (el operador escribió desde la PC: «Lo lanzo desde la PC»).
  Las de los tickets cerrados están archivadas.
- **31-oct, 23:57: el operador votó L02 a L04** (veredicto, «El operador vota L02 a L04 y pide carriles…»). RW-64
  escribió sus tres nuevas (`4e31d8d`, páginas en `45fe87c`). **RW-75 está integrado (1-nov)**: carriles «Web · Slide»,
  «Copiar» por lección (por omisión, solo lo nuevo) y los estados después del voto, con un ojo por lección (veredicto,
  «RW-64 escribe L02·S1, L02·S2 y L04·S1, y se integra RW-75»).
- **1-nov, 20:53: los carriles de corrección** (el operador; veredicto, «El operador pide los carriles de corrección»).
  Sustituyen a los tickets correctores por tanda y a la recomendación de la cabina del 31-oct (dos sesiones).
  - **Son cinco sesiones de larga vida:** CR-GW (guion web), CR-GS (guion slide), CR-LW (lección web), CR-LS
    (lección slide) y CR-PL (plataforma).
  - **Guion decide y Lección escribe.** El contrato es `cantu-lessons/docs/carriles/CARRILES.md` (v1).
  - **Lanzados a las 21:06**, cada uno con su primer encargo en `docs/carriles/CR-xx/01-encargo.md` (`ab663f1`). Los
    seis tickets dejaron su traspaso en su informe (`c100f2b`) y están archivados. El contrato de la cabina tiene
    ahora «Los carriles de corrección».
  - **La web de L01 está aprobada:** «Hoy» ✓ en sus cinco secciones, sin correcciones.

## Cómo se trabaja ahora

**La Galería de lecciones** (`cantu-revisiones`):
- **Se abre con `cantu-revisiones/abrir-galeria.cmd`** en `http://127.0.0.1:8791/`. **El 8791 es del operador:** la
  cabina no lo toca ni lo para; sus pruebas van en otro puerto (8799 suele estar libre), paradas por PID.
- **El botón trae los dos repos** (`cantu-lessons`, solo si está limpio y en `main`). Corre `renumerar.mjs` primero en
  simulación y arranca el servidor en un hilo (`servidor/arranque.mjs`). Con Enter, publica los votos.
- **«Traer lo nuevo»** (RW-70) es un botón de la barra. Trae lo nuevo sin cerrar la ventana, publica los votos y recarga
  la misma vista.
- **Cada lección tiene sus pestañas:** Guion web y Guion slide, que son sus galerías; Lección web y Lección slide, que
  abren aparte; e Historial.
  - Donde una galería de ticket trae opciones, sale su vista.
  - Donde no, la vista **«Hoy»** (RW-71), con sus votos en `galerias/HOY/respuestas.json`.
  - **Tras cada pull, la cabina lee los ~ y ✗ de «Hoy»:** le tocan a ella, y van a la bandeja o a un ticket.
- **Desde RW-75 (1-nov):**
  - **Votar por carril:** el control «Web · Slide» deja las flechas y «lo siguiente por votar» en una pieza.
  - **«Copiar»:** por lección, primero la web y después la slide, con la galería de cada sección. Por omisión copia
    solo lo nuevo, y «Copiar todo» está al lado.
  - **Los estados por sección y por slide:** votada sin decisión, por escribir, escrita y por revisar, revisada.
  - **El ojo de cada lección** vuelve solo cuando su página cambia. «✓ La revisé» se marca en la propia lección, y se
    guarda en `galerias/REVISADAS/`.
  - **«Escrita» la apunta el taller** con `node tools/revision/escrita.mjs` en el commit en que escribe la opción
    (MOLDE-DE-GALERIA, punto 6). Si un taller no lo hizo, la cabina lo apunta al integrar. Una decisión de sistema se
    apunta con las lecciones y la pieza.
  - **Si el 8791 está corriendo,** la cabina integra el código de `cantu-revisiones` en una copia aparte (worktree
    `--detach` en `origin/main`) y empuja desde ahí. Al operador le llega con «Traer lo nuevo», que vuelve a arrancar
    la galería.
- **Los votos:** «✓ Se queda · ~ Referencia · ✗ Fuera», con una sola ✓ por slide o sección. Una con una sola ✓ y sin
  opciones nuevas se escribe en la lección. Está en `MOLDE-DE-GALERIA`: «Los votos…» y «La vista «Hoy»».
- **En la laptop** (`LAPTOP-PF6SOUAS`) se ven las páginas que la cabina publica en `cantu-revisiones/lecciones/`, sin
  compilar. El operador lo probó el 30-oct.
  - El Historial dice «historial sin leer».
  - **Su ventana abierta es de antes de RW-70:** con Enter y otro doble clic le llegan «Traer lo nuevo» y «Hoy».

**Compilar y publicar** (`cantu-lessons`):
- **`node tools/revision/build.mjs --todas --sin-git`** (RW-67) compila solo lo que no está al día, 3 a la vez, y pinta
  las miniaturas. Sin cambios tarda 0,8 s; todo, unos 15 min. `--simular` dice antes qué compilaría. Una corrida a la
  vez por checkout.
- **Tras compilar, la cabina publica para la laptop:**
  1. `node tools/revision/publicar-paginas.mjs [Lnn…]`;
  2. en `cantu-revisiones`, `git add -- lecciones`, commit por ruta y push.

  Que lo haga solo el build está en la bandeja, con la duda 7 de RW-67.
- **Los estados**, con `node tools/revision/estado.mjs <Lnn> <guion|leccion|slide> <estado>`. Lo que no se deduce va en
  `lecciones/tablero.json`, que escribe **solo la cabina**. Después, `node tools/revision/tablero.mjs`.
- **La numeración:** la tabla de antes a hoy está en `docs/referencias/NUMERACION-DE-LECCIONES.md`. La historia
  (veredicto, informes, tickets de antes) usa los códigos viejos.

**Los tickets:**
- **La cabina escribe el ticket** en `docs/encargos/REVISION-WEB-TICKETS.md`, lo publica y **lo lanza sin preguntar**
  como sesión anidada (`start_session`). Solo pregunta antes de una decisión altamente crítica. Contrato, «Lanzar
  tickets».
- **Si la herramienta toca `tools/` o la galería,** el taller trabaja en worktrees que le prepara la cabina
  (`_scratch/RW-xx/<repo>`, rama `rw-xx-…`). Hace commit en su rama con identidad explícita, sin push ni merge.
- **La cabina integra:** revisa, `merge --no-ff -F <fichero>`, push, quita el worktree y borra la rama.
- **En un turno abierto por un aviso automático, o con el operador en Remote Control,** la app no deja abrir sesiones.
  - Si el turno lo abrió un aviso: tarjeta (`own_initiative`).
  - Si el operador escribe por Remote Control: que pulse la tarjeta desde la PC. Si pide «hazlo aquí», va como agente de
    fondo de la cabina. Así corrió RW-71.
- **Al terminar cada taller, la cabina archiva las sesiones que ya no hacen falta** (el operador, 30-oct). Antes mira
  `list_events` y apaga el Remote Control. Las que esperan un voto siguen activas.

**Git:**
- **Credenciales:** `GIT_TERMINAL_PROMPT=0 GCM_INTERACTIVE=never` en lo que va a la red. Si algo pide credenciales, se
  para y se da el error literal.
- **El índice:** `--no-optional-locks` para leer; `add` por nombre; identidad con `-c`, nunca escrita en
  `.git/config`.
- **`aiw-console` es de todas las cabinas:**
  - commit siempre con `-- <ruta>`;
  - después, `git log origin/main..HEAD` en una llamada aparte: si hay commits ajenos, no se empuja;
  - push por sha: `git push origin <sha>:refs/heads/main`.
- **Los finales de línea:** en `cantu-lessons`, el veredicto, los tickets, `tablero.json`, los README, el molde y
  TALLER-COMUN están en CRLF; la bandeja y este relevo, en LF. Se miden con node, porque grep y sed de Git Bash no ven el
  `\r`. Se escriben con scripts de node que conservan el final de línea, no con heredocs.

## En vuelo: lo que espera al operador

| ticket | qué | dónde va | qué espera |
|---|---|---|---|
| CR-GW (guion web; `local_ec02efe0-9621-4021-bb4a-7d666e418d3f`) | las galerías de la web (hereda RW-64 y RW-73) | CR-GW·03 hecho y publicado (`e52bb80`): RW-73 con la 11 donde la votó, ronda 3 (banda/11; la 15 centrada en L28 y L29) y ronda 4 (el nombre de la 11: la 20 o la 21, recomendada); RW-64 con 16 aprobadas y siete rondas; 17 entregas nuevas | los votos de las rondas 3 y 4 de RW-73 y las de RW-64 |
| CR-GS (guion slide; `local_49a75736-5723-47eb-8d03-a0d0bd4bdb55`) | las galerías de la slide (hereda RW-59, RW-60, RW-61 y RW-68) | CR-GS·03 hecho y publicado (`71221b5`, la foto de L14·D4 en `40fa18c`) | los votos de L11·D8–D11, L13·D12, L14·D2 y RW-61 desde L14·D3 |
| CR-LW (lección web; `local_4a414da2-60b9-4ccf-b42b-ddecaee83b21`) | escribe la web decidida | CR-LW·03 hecho y publicado (informe `9a8363b`, páginas `eed4a61`): 18 en 11 lecciones. En espera: L18·S5–S7, L23·S4, L25·S2, y el arreglo de L04·S3 y L12·S4–S5, hasta el voto de la ronda 4 | el voto de la ronda 4 (la 20 o la 21) y los de las rondas 3 de RW-73 y RW-64 |
| CR-LS (lección slide; `local_7c6e3e45-a14b-4444-bb79-721be4b4083a`) | escribe la slide decidida | CR-LS·03 hecho y publicado (informe `721ead5`, páginas `eed4a61`): las 29 portadas en Ocre, L13, L14·D4 y L12 apuntada | los votos de L11·D8–D11 (con D7), L13·D12, L14·D2 |
| CR-PL (plataforma; `local_947c3c68-6237-48d1-b3f0-62e616d967ef`) | la Galería de lecciones y sus herramientas | CR-PL·03 integrado (`98b0512`, `85c30fc`): `escrita.mjs --en` y con CR-GS/CR-GW; lo decidido por sistema sin vista sale decidido; «– Sin cambio» (`lecciones/sin-cambio.json`, lo lleva la cabina); L08·D2 con la miniatura de la lección. «Falta decidir» de 243 a 5 (L11·D12–D16 esperan la ronda 2 de L11·D8–D11). **CR-PL·04 en marcha** (`docs/carriles/CR-PL/04-encargo.md`, 2026-11-02 11:24): «Decidida» en el verde de «Aprobada» y «Por votar» con el diseño de «En revisión», que se distingan de lejos (lo pidió el operador; daltonismo leve, RW-66); rama `cr-pl-04-marcas` en `_scratch/CR-PL/cantu-revisiones` (desde `85c30fc`) y `_scratch/CR-PL/cantu-lessons` (desde `aec3f72`); fotos en `_scratch/CR-PL/04/` | que entregue; la cabina integra, publica y le manda al operador el antes y el después |
| RW-31 a RW-33 | el plan de fracciones de L18 (antes L17) | en espera | la aprobación de la web de L17 (antes L16), que está en la galería de RW-64 |

- **Desde el 31-oct, el voto va por lección y en orden** (contrato, «Revisar por lección»). Las galerías de estos
  tickets ya salen dentro de cada lección, y lo que el operador elija ahí lo aplica el corrector de su tanda. Antes del
  primer corrector, la cabina mide si las opciones están en disco; si alguna no está, ese voto vuelve a su ticket.
  Así pasó el 31-oct con RW-59 y RW-64: sus opciones solo estaban en las copias de los talleres, y los votos volvieron a
  sus tickets. **La paleta de RW-60 ya está votada** (la 1, Ocre).
- **Las dudas que quedaron con la recomendación del taller,** mientras el operador no diga otra cosa:
  - **RW-70:** la barra crece una fila a 380 px; en la PC, «Traer lo nuevo» sale en ámbar.
  - **RW-71:** una ✓ con comentario cuenta como decidida; un ~ o una ✗ sin comentario, como votada; L18 y L19 se
    pueden votar; la carpeta se llama `HOY`.

## Pendientes de la cabina

- **La bandeja** (`cantu-lessons/docs/encargos/BANDEJA.md`), con lo abierto:
  - que la compilación publique sola (duda 7 de RW-67);
  - la regla de 3 en la web de L08 (necesita la palabra del operador);
  - la guarda del ± de slide;
  - `build.mjs --slide` a 1366 × 768;
  - `studio.mjs` sin `--no-optional-locks`;
  - los subtítulos de las slides;
  - el ± en MathJax;
  - las filas de slide de L03, L04, L06 y L07 en el registro;
  - y las demás que tiene ahí.
- **Las copias de los talleres en `lecciones/`:** son 60 carpetas fuera de `codigos.json` (L01W, L02P…), y `tablero.mjs`
  las avisa. Quitarlas es limpieza que espera la palabra del operador.
- **`renumerar.mjs --comprobar`** marca `galerias/RW-68` por 7 «B» en su texto («antes L11B»). Está así a propósito,
  pero hay que decidir si la guarda lo admite o si se cambia el texto.
- **El temario** (`temario/01-aritmetica.md`) tiene su propia numeración, que no coincide con los códigos.
- **De relevos anteriores, sin volver a medir:**
  - L20·D3 a las variantes de L20;
  - el ticket de herramientas: las guardas de la regla 41 v62, las piezas del lote, las guardas de RW-45, las mutaciones
    débiles, los nombres de consola y los `_generado` viejos de `lecciones/L02-…/`, que necesitan la palabra del
    operador;
  - probar `problema-slide` con más problemas;
  - la pregunta de Moodle.
- **La regla de archivar, pasada a otras cabinas** (el operador: «Sí, pásasela»): P2 contestó que ya la aplicaba;
  Acervo no había contestado al cerrar.
- `drafts/web/_pendiente-qa/casilla-2-operar-con-signos/` **no se borra**: es la etapa 2 de la regla 17. Sus scripts
  están en `_scratch/_LEC_variantes5/`.

## Cerrado (29 y 30 de octubre)

| qué | dónde |
|---|---|
| RW-54 (el servidor), RW-55 (el riel de L02·D9), RW-56 (el botón), RW-58 (L02·D5, el ±) y la regla 41 v63–v64 | ver el veredicto |
| las slides de L01 y L02, «Aprobadas» | `cantu-lessons` `3cba4fe` |
| RW-62 (el tablero por lección) y RW-63 (una sola galería, por lección) | `bb7cc21`, `b4db0bf` |
| RW-65 (la plataforma única, pulida en tres rondas) | `cantu-revisiones` `6522562`, `cantu-lessons` `70fff6f` |
| RW-66 (L01 a L29 y los estados) | `cantu-lessons` `3195e1f`, `cantu-revisiones` `ce11878` |
| RW-67 (compilar solo lo que cambió) | `cantu-lessons` `ba52f04`; la primera completa, 57 piezas en 15 min 27 s |
| RW-69 (la galería en la laptop) | `935a659`, `e591e92`; páginas publicadas `dffdac0` |
| RW-70 («Traer lo nuevo»; `renumerar.mjs` sin opciones) | `cantu-revisiones` `430989f`, `cantu-lessons` `8fd045c` |
| RW-71 (las galerías completas, con «Hoy»; corrió como agente de la cabina) | `cantu-revisiones` `ba0580e`, `cantu-lessons` `6064fcc` |
| RW-75 (carriles, «Copiar» por lección, los estados y el ojo; `escrita.mjs`) | `cantu-lessons` `c673503`, `66c9006` y `9366b3d`; `cantu-revisiones` `6507a85` |
| el nombre «Galería de lecciones» | veredicto `02a3fdf`; contrato `f51bc43` |
| D-082 (el cierre de cada mensaje) y D-083 (sin runs) | `aiw-console` `context/DECISIONES.md` |

## Lo que el operador tiene que decidir (con la recomendación de la cabina)

1. **Pasar el `CLAUDE.md` de la cabina a v1:** sigue marcado «v0 · PILOTO», aunque ya lleva muchas enmiendas.
   *Recomendación: sí, en una sesión tranquila, con el veredicto del piloto al lado.*
2. **Versionar `mudanza.mjs` y las tres sondas** en `context/cabinas/lecciones/herramientas/`. *Recomendación: sí.*
3. **Los permisos de Claude Code en `.claude/settings.json`.** *Recomendación: todavía no.* La cabina corre en modo
   *bypass*.

## La mudanza de la laptop a la PC (abierta desde el 28-oct)

- **No está verificada.** El `comparar` dio NO el 28-oct: faltan 10 499 ficheros, ninguno versionado, y casi todo lo que
  difiere es CRLF contra LF.
- **Falta que el operador copie de la laptop** lo de `_scratch/cabina/mudanza/faltan-en-la-pc.txt`:
  - `cantu-lessons/fuentes/`: 13 ficheros, 18,4 MB. Son evidencia y no van a git, así que **solo están en la laptop**;
  - `PHD/Paper 2/` y `phd-p2-experiment/` (lo de su hilo).

  Cuando copie, la cabina vuelve a correr el `comparar` (pasos 6 y 7 de `_scratch/cabina/mudanza/README.md` y las
  sondas de `sondas/`) y añade el resultado al veredicto. `_scratch/cabina/mudanza/` **no se borra hasta verificar**.
- **La laptop ya se usa para revisar** con la galería (RW-69), pero no para escribir en los repos.

## Dónde está todo

- **El veredicto del hilo**, con todas las palabras del operador:
  `projects/cantu-lessons/docs/veredictos/2026-10-16-lectura-de-las-seis-lecciones-web.md`.
- **Los tickets:** `docs/encargos/REVISION-WEB-TICKETS.md`, hasta RW-71. **La bandeja**: `docs/encargos/BANDEJA.md`.
- **Los informes:** `docs/informes/RW-xx.md`.
- **El molde de galería:** `docs/referencias/MOLDE-DE-GALERIA.md` v3, con «Los votos…» y «La vista «Hoy»».
- **El común de los talleres:** `docs/encargos/TALLER-COMUN.md` v8, con §5 al día con RW-67.
- **Las herramientas:** `tools/revision/README.md` (compilar, publicar, renumerar, el tablero, la plataforma).
- **La galería:** `projects/cantu-revisiones`: su README; `galerias/<ticket>/`, `galerias/HOY/` y `lecciones/`, que es lo
  publicado.
- **Los bancos de prueba de los talleres** (desechables): `_scratch/RW-69/`, `_scratch/RW-70/` y `_scratch/RW-71/`, en
  `trabajo/` y `capturas/`.

## La capacidad de la cabina, medida en la PC

- **Claude Code con el disco directo:** git (`add`, `commit` y `push`), `npm` y `node` v24.12.0. Y **Python 3.12.10** desde
  el 29-oct, por usuario: se llama por ruta completa (memoria de la cabina).
- **GitHub Desktop** está abierto y hace fetch solo. No estorba.
- **La app de Claude** es el `.msix`, y `AllowAllTrustedApps` está en 0: sus actualizaciones pueden fallar. Es cosa del
  operador.

## Lecciones que siguen valiendo

1. **Un `comparar` en NO no es un diagnóstico.** Se desglosa antes de decir qué falló.
2. **Antes de afirmar que algo no existe, se mira también GitHub.**
3. **Una regla escrita no protege si el encargo no la cita.**
4. **Donde el `CLAUDE.md` dice que se abre la sesión no es donde la abre la app.** El mensaje de arranque es la red.
5. **El final de línea se mide con node, no con grep.** Un script que falla «sin ancla» casi siempre es por un CRLF.
6. **El operador no ve la caja de la pregunta cuando escribe por Remote Control.** Cada mensaje se cierra con lo que
   necesita la cabina, dicho en el texto.
