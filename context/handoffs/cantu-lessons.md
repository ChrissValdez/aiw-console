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
- **El canónico** es `cantu-lessons/roadmap/roadmap.json` (md5 de disco `22f67745`, medido el 2026-10-28 a las 23:21):
  1 objetivo y 30 runs, 25 `active` y 5 `completed`; sin las claves `barrier`, `lane` ni `batch`. `active` no significa
  que un taller esté corriendo. Los tickets RW no tienen run.

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

## En vuelo

- **Nada.** RW-54 cerró el 2026-10-29: el servidor está en `cantu-revisiones/servidor/`, y su cierre en el veredicto
  («RW-54 terminado»). La vía provisional ya salió del README y del molde v3. Lo que falta es estrenarlo con una galería
  real en `cantu-revisiones/galerias/`.
- **Pendiente de la palabra del operador:** el falso ROJO de la escala de letra en la PC. Toda web compilada aquí sale
  en ROJO porque `docs/referencias/escala-de-letra.css` se saca en CRLF (md5 `829e22d1`) y el bloque es LF (`f6c1a477`,
  el del blob). La cabina recomienda `docs/referencias/escala-de-letra.css text eol=lf` en el `.gitattributes`.

## Pendientes

Del relevo del 2026-10-28; esta sesión no los volvió a medir:

- L11 slide desde su web; L11B sin slide; L02·D9 (opciones); L20·D3 a las variantes de L20.
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
- **Tickets:** `projects/cantu-lessons/docs/encargos/REVISION-WEB-TICKETS.md`, hasta RW-54.
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
