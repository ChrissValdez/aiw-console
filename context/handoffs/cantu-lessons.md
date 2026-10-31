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
  «la galería» es ella entera. El trabajo va por tickets RW, y el siguiente libre es **RW-72**.
  `cantu-lessons/roadmap/roadmap.json` está congelado como historia, y ninguna respuesta abre con la línea del run.
- **Las 29 lecciones, de L01 a L29** (RW-66), con **29 webs y 29 slides** compiladas. La última que faltaba era la slide
  de L12 (antes L11B), escrita el 30-oct en la ronda 2 de RW-68.
- **La normalización que pidió el operador está hecha:** la numeración, los estados, la slide de L12 y las galerías
  completas con «Hoy» (RW-71).
- **HEAD** (en los tres, HEAD = `origin/main` y el árbol limpio):

  | repo | sha |
  |---|---|
  | `projects/cantu-lessons` | `8b7a07b` |
  | `projects/cantu-revisiones` | `3e5415a` |
  | `projects/aiw-console` | el commit de este relevo |

- **Ningún taller trabaja.** Siguen activas, esperando al operador, las sesiones de RW-59, RW-60, RW-61, RW-64 y RW-68.
  Las de los tickets cerrados están archivadas.

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
| RW-59 | slides de L03 a L08 | escenas aprobadas, escritas y en verde (`6a902a7`) | que el operador revise los 6 mazos («Primero las reviso»). Luego, cerrar: lo aprendido a la regla 41, el generador a `docs/moldes/RW-59/`, sus respuestas a `docs/informes/`, `estado.json` de su galería y los estados |
| RW-60 | la paleta de los bordes de tarjeta | galería: 7 slides, «Hoy» y 3 paletas | el voto; el taller y la cabina recomiendan la 1, Ocre. Después, el barrido de bordes (su duda 7) |
| RW-61 | slides de L09 a L29 (tanda 3) | galería: 125 vistas, con S4 y los patrones en «Con el molde» | el voto. Su duda 1: las escenas de L12 siguen dentro de la slide de L11, y hay que quitarlas (y la palabra «operar» de la portada de L11, duda 4 de RW-68). Antes de su próxima ronda, migra sus datos con `renumerar.mjs --traducir` |
| RW-64 | la web de las 29 lecciones | galería: 39 secciones por decidir | el voto. No escribe borradores sin turno de la cabina (RW-61 escribe en los mismos). Su galería tiene unas 60 fotos con insignias de antes de RW-66: se arreglan en su próxima ronda |
| RW-68 | la slide de L12 | **escrita** con lo que recomendó el taller (ronda 2, `c9410d6`), en verde, «En revisión», publicada (`3e5415a`) | el voto en su galería. Otra opción votada la reescribe desde `operar_en_notacion_cientifica.slide.variantes.json` |
| RW-31 a RW-33 | el plan de fracciones de L18 (antes L17) | en espera | la aprobación de la web de L17 (antes L16), que está en la galería de RW-64 |

- **El orden de voto que recomendó la cabina:** primero RW-60, porque su color cambia los cálidos de RW-61 y de RW-59.
  Después, los mazos de L03 a L08, RW-61, RW-64 y RW-68.
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
