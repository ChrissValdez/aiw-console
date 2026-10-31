# HANDOFF — hilo `cantu-lessons` (LECCIONES)

> **Cuarto relevo de este hilo.** Lo escribió la cabina el **2026-10-29** en la PC (`DESKTOP-525K0IS`), al cerrar la
> primera sesión en Claude Code (el piloto, del 2026-10-28 a las 23:19 al 2026-10-29 a las 08:55, hora de CDMX).
> Sustituye al relevo del 2026-10-28 (escrito en la laptop). El bloque de septiembre que ese relevo llevaba dentro se
> revisó contra el disco: lo vigente está aquí, y lo que salió va al final con el porqué.
>
> **Todo lo de aquí está medido y lleva fecha. Contrástalo contra el disco al abrir. Gana el disco.**
>
> **La cabina abre leyendo enteros** `context/cabinas/lecciones/CLAUDE.md` y `context/cabinas/REGLAS-DE-CABINA.md`.
> Medido el 2026-10-28: la app abrió la sesión en `AIW_Workspace` y no en `context/cabinas/lecciones/`, así que el
> `CLAUDE.md` **no se cargó solo**; los leyó porque lo pedía el mensaje de arranque del operador. El veredicto del piloto
> sobre ese `CLAUDE.md` está al lado: `context/cabinas/lecciones/VEREDICTO-PILOTO-2026-10-28.md`.

## Dónde estamos

- **La cabina corre en Claude Code, en la PC, y publica ella misma.** La prueba del push pasó el 2026-10-28 a las 23:20:
  Git Credential Manager pone la credencial sin preguntar (`401` y luego `200 OK` en `git-receive-pack`). Pushes reales
  de esta sesión: `cantu-lessons` `5b15678` y `8004ff4`, `cantu-revisiones` `956bccb`, `aiw-console` `b9e75d9` y el
  commit de este relevo.
- **HEAD al cerrar** (2026-10-29 08:54; en todos, HEAD = `origin/main` y el árbol limpio):

  | repo | sha | nota |
  |---|---|---|
  | `projects/cantu-lessons` | `8004ff4` | |
  | `projects/cantu-revisiones` | `956bccb` | estrenado en esta sesión |
  | `projects/aiw-console` | el commit de este relevo | después de `b9e75d9` |
  | `aiw`, `Acervo`, `PHD`, `cantu-quizzes-latex`, `cantu-studio`, `phd-p2-experiment` | el de la laptop (`repos-laptop.tsv`) | `cantu-studio` con `M tools/studio/editor-ui/package-lock.json`, de su hilo |

- **La mudanza NO está verificada.** Medido el 2026-10-28 entre las 23:22 y las 23:45:
  - el `comparar` de ficheros da **NO**: faltan 10 499, **ninguno versionado**. Lo que difiere es casi todo CRLF contra
    LF; solo 94 ficheros difieren de verdad, y son de otros hilos;
  - el de repos da NO solo por las dos diferencias esperadas;
  - el build de L02 `--slide` sale **VERDE**, después del `npm ci` de `tools/render`.

  Leyendo las cifras, la PC no se rehízo con la copia entera de la laptop: es su workspace de antes, con los repos al día
  por git y `_scratch`, `Dieta_Chris` y `Acervo` copiados encima. El detalle está en el veredicto de `cantu-lessons`
  («La cabina, ya en la PC y en Claude Code…»).
- **Falta que el operador copie de la laptop** lo de `_scratch/cabina/mudanza/faltan-en-la-pc.txt`:
  - `cantu-lessons/fuentes/`: 13 ficheros, 18,4 MB. Son evidencia y nunca entran a git, así que **solo existen allí**;
  - `PHD/Paper 2/`: `00_HANDOFFS/DESDE_DEV.md` y `HANDOFF_P2.md`, con cambios sin commitear en la laptop, y 35 ficheros
    sin seguimiento;
  - `phd-p2-experiment/data/manual/`, `Claude outputs/`, `_demos/`, `.claude/launch.json` y
    `PARADA-MONTAJE-MAQUINA-NUEVA.md`.

  `_backups` no se copia (D-081). Lo de `cantu-quizzes-latex` (1 617) lo decide su hilo. Decisión del operador al
  cerrar: «Cierra ya»; **cuando copie, la cabina vuelve a correr el `comparar` y añade el resultado al veredicto.**
- **Cómo se vuelve a verificar:**
  1. Los pasos 6 y 7 de `_scratch/cabina/mudanza/README.md`.
  2. Las tres sondas de esta sesión, en `_scratch/cabina/mudanza/sondas/`:
     - `analizar-mudanza.mjs`: por carpeta, y si lo que difiere es solo CRLF/LF;
     - `clasificar-git.mjs`: si lo que falta está en HEAD, ignorado o suelto;
     - `eol-contra-head.mjs`: si el tamaño de la laptop sale del blob de HEAD.

     Cada una lleva su uso en la cabecera.
  3. **El criterio:** todo lo de la lista está en la PC con su tamaño. El resto del NO tiene que tener explicación:
     finales de línea, salidas que el build regenera, o cosas de otros hilos.
- **La laptop sigue congelada** hasta que la copia esté verificada.
- **Sin runs (D-083, 2026-10-30):** este hilo ya no trabaja con runs ni con la consola de *features*. Su tablero es la
  «Galería de lecciones» (la plataforma de revisión), y el trabajo va por tickets RW. `cantu-lessons/roadmap/roadmap.json` queda congelado como
  historia, y ninguna respuesta abre con la línea del run.

## Lo que se hizo en esta sesión

- **Las decisiones del operador**, verbatim en el veredicto de `cantu-lessons`: «Sí, las cinco» y «Cierra ya».
- **`cantu-revisiones`, estrenado:** el README con la estructura (`galerias/<ticket>/`, `lecciones/<Lnn-slug>/`,
  `servidor/`) y el ciclo (el taller escribe, la cabina publica, el operador hace pull, vota y push), más un `.gitignore`.
  Es privado.
- **`MOLDE-DE-GALERIA` v3 y `TALLER-COMUN` v8:** la galería va en `cantu-revisiones/galerias/<ticket>/`, y al cerrar
  cada ticket `respuestas.json` se copia a `cantu-lessons/docs/informes/<ticket>.respuestas.json`.
- **Ticket RW-54**, el servidor de las galerías, en `docs/encargos/REVISION-WEB-TICKETS.md`. Va con Opus 5.5 extra: la
  cabina dijo «alto» en el chat y se corrigió por la tabla de `TALLER-COMUN` §8.
- **La enmienda a D-081:** lo que por regla no entra a git se copia a mano y se verifica con el manifiesto.
- **Borrado** `AIW_Workspace\_cabina-lecciones\`, que estaba vacía. **`npm ci`** en `cantu-lessons/tools/render`.

## En vuelo (puesto al día el 2026-10-30 a las 17:30)

**Para orientarse, el tablero:** `cantu-lessons/lecciones/index.html` tiene las 29 lecciones, con la columna
«Pendientes», y cada lección tiene su tablero, con su estado, lo que está en curso, sus decisiones y su historial
(RW-62). Lo que no se deduce vive en `lecciones/tablero.json`, que escribe **solo la cabina**: un renglón por ticket o
decisión, y luego `node tools/revision/tablero.mjs`. Cómo hacerlo está en `tools/revision/README.md`, «El tablero por
lección».

**La numeración (RW-66, integrado el 2026-10-30):** las 29 lecciones van de L01 a L29, seguidas y sin «B».
- La tabla de antes a hoy está en `cantu-lessons/docs/referencias/NUMERACION-DE-LECCIONES.md`.
- **La historia** (veredictos, informes y tickets anteriores) usa los códigos de antes, y el tablero y la plataforma la traducen.
- **En un aparato nuevo,** el botón de la galería trae `cantu-lessons` y corre `renumerar.mjs`, primero en simulación,
  para renombrar las carpetas de `lecciones/` (RW-69). Ojo: a mano y sin opciones, `renumerar.mjs` puede tocar variantes
  que ya citan códigos de hoy (informe RW-69, §3; en la bandeja).
- **Ninguna lección sin estado:** L10, L22 y L26 pasaron a «En revisión». «En revisión» lleva un borde gris, para el daltonismo leve del operador.


**Para votar y para orientarse, una sola plataforma (RW-65, integrada el 2026-10-30):**
- **Se abre con `cantu-revisiones/abrir-galeria.cmd`**, en `http://127.0.0.1:8791/`. Tiene servidor, así que cada voto se guarda al momento.
- **El inicio** muestra las 29 lecciones con lo que le espera al operador.
- **Cada lección tiene sus pestañas:** Resumen, Guion web (con ✓ ~ ✗ por variante, en `guiones-web/respuestas.json`), Guion slide (su galería), Lección web, Lección slide e Historial.
- **Los tickets no se ven.** Los talleres siguen armando sus galerías por ticket.
- **Pulida con el operador en dos rondas más** (`cantu-revisiones` `0cd35c2`, `cantu-lessons` `3fe5d21`):
  - el inicio es la tabla por área, con el diseño de dentro;
  - ya no hay pestaña Resumen, y Lección web y Lección slide abren aparte;
  - el guion web tiene un solo formato, el de galería;
  - los guiones enseñan la lección entera en miniatura, con la marca de cada slide o sección.
- **Las miniaturas se pintan después de compilar:** `node tools/revision/miniaturas.mjs` en cantu-lessons. Solo repinta
  lo que cambió; las 29 lecciones tardan 4 min. Hasta que `build.mjs` la llame, la corre la cabina.
- **La galería, igual en la laptop (RW-69, integrado el 2026-10-30):** el botón trae los dos repos, y la galería enseña de
  cada pieza la más nueva: la compilada en ese aparato o la publicada en `cantu-revisiones/lecciones/`. **Tras compilar y
  pintar las miniaturas, la cabina publica:** `node tools/revision/publicar-paginas.mjs` en cantu-lessons (solo copia lo
  que cambió), y en cantu-revisiones `git add -- lecciones`, commit por ruta y push. La primera publicación, de las 29
  lecciones, es `dffdac0` (600 ficheros, unos 6 MB en git). La primera vez en la laptop van dos dobles clics. Allí no
  salen el historial de versiones ni la revisión de la slide de antes de las galerías.
- **Los votos** se llaman «✓ Se queda · ~ Referencia · ✗ Fuera», con una sola ✓ por slide o sección. Una con una sola
  ✓ y sin opciones nuevas se escribe en la lección (`MOLDE-DE-GALERIA`, «Los votos, y cuándo se escribe en la lección»).
- **Al cerrar un ticket**, su galería se marca con `galerias/<ticket>/estado.json` y no se quita.

| ticket | qué | dónde va | qué espera |
|---|---|---|---|
| RW-59 | slides de L03 a L08 | todas las escenas aprobadas, escritas y en VERDE (`6a902a7`) | que el operador revise los 6 mazos enteros («Primero las reviso»); luego, cerrar: lo aprendido a la regla 41, el generador de su galería a `docs/moldes/RW-59/`, sus respuestas a `docs/informes/`, su galería marcada cerrada y los estados |
| RW-60 | la paleta de los bordes de tarjeta | galería publicada: 7 slides, «Hoy» y 3 paletas al peso del Azul acero | el voto; el taller recomienda la 1, Ocre, y la cabina también |
| RW-61 | slides de L09 a L26 (tanda 3) | galería publicada: 125 vistas, con la decisión S4 y los tres patrones en «Con el molde» | el voto; también su duda 1, las escenas de L11B que hay dentro de L11 |
| RW-64 | la web de las 29 lecciones | galería publicada: 39 secciones por decidir (`966b658`) | el voto; no escribe borradores sin turno de la cabina, porque RW-61 escribe en los mismos |
| RW-31 a RW-33 | el plan de fracciones de L17 | en espera | la aprobación de la web de L16, que está en la galería de RW-64 |
| RW-67 | compilar solo lo que cambió, en paralelo y con sus miniaturas | el taller trabaja en `_scratch/RW-67/cantu-lessons`, rama `rw-67-compilar` | su entrega; al integrarla, que la compilación llame a `publicar-paginas.mjs` |
| RW-68 | la slide de L12 (antes L11B) | galería publicada: 8 vistas (`bd06fee`) | el voto |
| RW-70 | un botón en la galería para traer lo nuevo y recargar, y `renumerar.mjs` sin opciones | el taller trabaja en `_scratch/RW-70/{cantu-lessons,cantu-revisiones}`, rama `rw-70-traer` | su entrega; la cabina integra y pasa a `tools/revision/README.md` el texto de su informe |

- **El orden de voto que recomendó la cabina:** primero RW-60, porque su color cambia los cálidos de RW-61 y de RW-59.
  Después, los mazos de L03 a L08, RW-61 y RW-64.
- **Los votos de RW-59** (rondas 1 a 5) están publicados: la cabina hizo el commit (`26100f1`), porque la ventana del botón
  se cerró sin Enter.
- **La bandeja:** los comentarios sueltos del operador no abren ticket; van a `cantu-lessons/docs/encargos/BANDEJA.md`.

## Cerrado (2026-10-29 y 30)

- **RW-62** (el tablero por lección, con RW-57; `cantu-lessons` `bb7cc21`) y **RW-63** (una sola galería, por lección;
  `cantu-revisiones` `b4db0bf`), integrados el 2026-10-30.
- **RW-69** (la galería igual en la laptop; `cantu-lessons` `935a659`, `cantu-revisiones` `e591e92`; páginas publicadas
  `dffdac0`), integrado el 2026-10-30. Su copia de trabajo ya se quitó y su sesión está archivada. El operador lo probó
  en la laptop (`LAPTOP-PF6SOUAS`): dos dobles clics, 57 páginas publicadas, 19 carpetas renombradas.
- **Archivar los tickets que terminan** (el operador, 2026-10-30): es regla del contrato. La sesión «Lecciones cabina
  setup» (el arranque a medias del 29-oct) también está archivada.
- **RW-65** (la plataforma única de revisión; `cantu-revisiones` `6522562`, `cantu-lessons` `70fff6f`), integrada el 2026-10-30. Las copias de trabajo de RW-62, RW-63 y RW-65 ya se quitaron.

- **RW-54** (el servidor de las galerías), **RW-55** (el riel de L02·D9), **RW-56** (el botón
  `cantu-revisiones/abrir-galeria.cmd`, `a0c716a`) y la **regla 41 v63**.
- **RW-58** (L02·D5, el ± y el aire del recuadro), en dos rondas: «D5 aprobada»; **regla 41 v64** (el ± de slide).
- **Las slides de L01 y L02, «Aprobadas»** (`cantu-lessons` `3cba4fe`).
- **El falso ROJO de la escala de letra**, arreglado en el `.gitattributes` (`9d67825`).
- **D-082:** el cierre de todo mensaje con «Qué necesito de ti» y «Qué procede».
- **La segunda enmienda a D-081:** en `aiw-console`, el commit va siempre con ruta.
- **Las 29 lecciones, compiladas en la PC** (10:11–10:55): 52 compilaciones, sin rojos. El índice vuelve a listarlas
  todas.

## Pendientes

Del relevo del 2026-10-28; esta sesión no los volvió a medir:

- L11 slide desde su web; L11B sin slide; L20·D3 a las variantes de L20. (L02·D9 ya se resolvió: RW-55.)
- **El ticket de herramientas:** las guardas de la regla 41 v62, las piezas del lote, las guardas de RW-45, las mutaciones
  débiles, nombres de consola, historial, y los `_generado` viejos de `lecciones/L02-…/` (no los creó la cabina: necesitan
  la palabra del operador).
- Probar la tarjeta del problema (`problema-slide`) con más problemas: lo pidió el operador.
- L16 por aprobar (desbloquea RW-31, RW-32 y RW-33); la revisión de L11 y L11B; la pregunta de Moodle.
- La siguiente tanda de slides: L03 en adelante, en orden, con el comentario del operador por escena.

Del relevo de septiembre, comprobado contra el disco el 2026-10-29:

- `drafts/web/_pendiente-qa/casilla-2-operar-con-signos/` existe (último commit, 2026-09-25). Es el material de la ronda
  5 para la etapa 2 de la regla 17 (forma visual por sección) y **no se borra**.
- Los scripts de esa ronda 5 (`construir.mjs`, `medir.mjs`, `validar.mjs`, `anchos.json` y otros) ya están en la PC, en
  `_scratch/_LEC_variantes5/`. `docs/moldes/DE-DONDE-VIENE.md` no los recoge. Si la etapa 2 sigue viva, pasan a
  `docs/moldes/`.

## Lo que el operador tiene que decidir (cada una con la recomendación de la cabina)

1. **Versionar `mudanza.mjs` y las tres sondas** en `context/cabinas/lecciones/herramientas/`. *Recomendación: sí.* La
   enmienda a D-081 apunta a `_scratch/cabina/mudanza/mudanza.mjs`, que es desechable.
2. **Pasar el `CLAUDE.md` a v1** con los cambios del veredicto del piloto. *Recomendación: sí, al abrir la sesión
   siguiente.*
3. **Los permisos de Claude Code en `.claude/settings.json`.** *Recomendación: todavía no.* La sesión corrió en modo
   *bypass* y la app no preguntó nada; primero se mide en la laptop qué pregunta.

## Dónde está todo

- **Veredicto del hilo:** `projects/cantu-lessons/docs/veredictos/2026-10-16-lectura-de-las-seis-lecciones-web.md`. Al
  final, la mudanza, la prueba del push y «Sí, las cinco».
- **Tickets:** `projects/cantu-lessons/docs/encargos/REVISION-WEB-TICKETS.md`, hasta RW-59. **La bandeja**, en
  `docs/encargos/BANDEJA.md`.
- **Informes:** `projects/cantu-lessons/docs/informes/`. El de RW-53 es `RW-53.md`; ya no está en `_scratch`.
- **Moldes y sondas:** `docs/moldes/` y `tools/sondas/`, con su procedencia en `docs/moldes/DE-DONDE-VIENE.md`.
- **El molde de galería** es `docs/referencias/MOLDE-DE-GALERIA.md` v3, y **el común de los talleres**,
  `docs/encargos/TALLER-COMUN.md` v8.
- **Lo que se revisa a distancia:** `projects/cantu-revisiones` (su README).
- **La mudanza:** `_scratch/cabina/mudanza/`, con el README, el script, los manifiestos de la laptop y de la PC,
  `faltan-en-la-pc.txt`, `difieren-en-contenido.txt` y `sondas/`. **No se borra hasta verificar.**

## La capacidad de la cabina, medida en la PC

Mediciones del 2026-10-28 y del 2026-10-29:

- **Claude Code, con el disco directo.** Lee y escribe el workspace, corre git con `add`, `commit` y `push`, borra, y
  corre `npm` y `node` v24.12.0. **No hay Python**: solo el alias de la Microsoft Store.
- **Las llamadas de git a la red** van con `GIT_TERMINAL_PROMPT=0` y `GCM_INTERACTIVE=never`: si algo pidiera
  credenciales, falla con el error literal en vez de quedarse esperando una ventana.
- **Los finales de línea:** `cantu-lessons`, `aiw-console` y `cantu-revisiones` se sacan en CRLF (`core.autocrlf=true`,
  del gitconfig de sistema); `cantu-quizzes-latex`, en LF (su config: `autocrlf=false`, `eol=lf`). En la laptop los
  árboles eran LF, y por eso un manifiesto por tamaño los da como diferentes.
- **GitHub Desktop** está abierto en la PC y hace fetch solo. No estorbó.
- **La app de Claude** es el `.msix` 4.29.0.0, en `C:\Program Files\WindowsApps\`. **`AllowAllTrustedApps` volvió a 0**
  (medido el 2026-10-29 a las 08:53), como avisaba el relevo de septiembre: la app funciona, pero sus actualizaciones
  pueden fallar. Es del operador.

## Lecciones que siguen valiendo

1. **Un `comparar` en NO no es un diagnóstico.** Se desglosa antes de decir qué falló: fuera de git, ignorado, finales
   de línea, commits de hoy. Aquí el NO sumaba 17 439 ficheros entre los que faltan y los que difieren, y lo que importaba
   eran unas pocas carpetas.
2. **Antes de afirmar que algo no existe, se mira también GitHub** (septiembre: `bc2455d` estaba en GitHub sin bajar).
3. **Una regla escrita no protege si el encargo no la cita** (septiembre: cinco rondas contra la regla 18).
4. **Donde el `CLAUDE.md` dice que se abre la sesión no es donde la abre la app.** El mensaje de arranque es la red.

## Lo que salió del relevo de septiembre, y por qué

| sección de septiembre | por qué salió (medido el 2026-10-29) |
|---|---|
| «Lo primero: el índice y dos ficheros» | el guion piloto `docs/guiones/L06-operar-con-signos.html` ya no existe. Los guiones viven en `lecciones/<Lnn-slug>/guion-web.html` (7 versionados). El catálogo sigue (último commit, 2026-10-07) |
| «El método» y «Lo que espera al operador», puntos 1 y 4 | se escribieron en `DISENO-DE-LECCIONES` v17 (2026-09-30): la regla 17 «El GUION» y la justificación del orden 4 → 5 en la regla 24. La cabecera ya está corregida; hoy va en v62. Los puntos 2 y 3 (variantes y notas del guion de L06, hoy L03) no se volvieron a medir: si siguen abiertos, los lleva el catálogo |
| «Estado, medido el 2026-09-30» | sha vencidos |
| «El cruce con `cantu-studio`» | `RUN-CANTU-COMPONENT-PETITIONS-ANALYSIS-STOP-001` está `completed` (`#221`), y Studio está en pausa (D-079) |
| «La capacidad de la cabina» (la terminal de Cowork) | la cabina ya no corre en Cowork. Queda la directiva de Appx, arriba |
| «Arranque en la laptop» | lo sustituye el `CLAUDE.md` |
| «Lo que no viajó» | ya viajó: `_scratch/_LEC_variantes5/` está en la PC. `_scratch/wireframes` no existe |
