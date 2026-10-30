# Relevo — hilo `phd-p2-experiment`

> **La mudanza del 2026-10-28 (D-081), hecha en este hilo el 2026-10-29.** Git es la fuente de verdad entre la PC
> y la laptop, y se trabaja en un aparato a la vez; `_scratch` y `_backups` son desechables. El aviso lo puso la
> cabina de LECCIONES a pedido del operador; el §2 de `context/cabinas/MUDANZA-2026-10-28.md` lo hizo esta cabina
> el 2026-10-29, y su resultado está en el §6 de este relevo.

**Fecha: 2026-10-29 (UTC), en la PC (`desktop-525k0is`).** Sustituye al relevo del 2026-10-22, escrito en la laptop.
Las cifras son mediciones fechadas: se vuelven a medir al abrir.

## §0 · Qué es este hilo

Desarrollo del experimento del Paper 2 del doctorado de Chris (PAF: medir si un tutor con LLM cumple una política
explícita). Repo `projects/phd-p2-experiment`. El canónico es `roadmap/roadmap.json` y el motor que lo conduce es el
de `aiw-console` (por `serve.mjs`). Carriles: `DEVELOPMENT` (el que se usa si no se dice otro) e `INTERFACE` (`ui/`).
**La cabina se muda a Claude Code** (pedido del operador, 2026-10-29): su configuración es
`context/cabinas/phd-p2-experiment/CLAUDE.md` v0, y la sesión se abre en esa carpeta, nunca en el repo del proyecto
(allí el `CLAUDE.md` carga las reglas de los talleres).

## §1 · Reglas propias del hilo, además de las de la cabina (`context/cabinas/REGLAS-DE-CABINA.md`)

- **Respuestas en español.**
- **Formato de cierre, vigente desde el 2026-10-29 en todos los hilos (pedido del operador; D-082):** **todo** mensaje al
  operador, no solo el del cierre de sesión, termina con dos bloques, en este orden: **«Qué necesito de ti»** (lo que le
  toca hacer o decidir, cada cosa con su recomendación; si no hay nada, «Nada por ahora») y **«Qué procede»** (lo
  siguiente y quién lo hace: la cabina, un taller o el operador; si es esperar algo —un taller, una compilación, un
  push, su respuesta—, una línea que se vea de lejos: **⏳ EN ESPERA de** <qué>, y quién lo tiene). Si hubo mediciones,
  la tabla con la hora va antes de los dos bloques. Detalle en `context/cabinas/phd-p2-experiment/CLAUDE.md`, «Cómo
  termina todo mensaje».
- **Carpeta del paper** (`AIW_Workspace/PHD/Paper 2/`): es la fuente de verdad y es de **solo lectura**. Única
  excepción: `00_HANDOFFS/DESDE_DEV.md`, y solo **añadiendo** entradas con su formato; tras cada entrada, la cabina
  commitea y publica en `PHD` ese fichero y ningún otro (palabra del operador, 2026-10-29). Nunca se tocan el `.tex`, el
  registro de citas, `REGLAS.md`, `ESPEC_TUTOR_P2.md` ni el `HANDOFF_P2.md`.
- **Desarrollo decide cómo se construye.** No decide las reglas de la política, qué es una violación, los pasos de
  PAF, la muestra de validación ni los límites de ESPEC §9: eso va a `DESDE_DEV.md`.
- **Decisiones de diseño:** no se preguntan en un menú. Se analizan, se ponen los datos delante, se recomienda y se dice
  bajo qué condición cambiaría la recomendación. Se dice siempre qué se probó y qué no.
- **Modelos:** por CLI de suscripción, sin API. Codex para el tutor y el alumno; Claude Code para el evaluador.
- **Los talleres no guardan memoria de Claude Code**: lo que deba durar va al informe del run.
- **Git (D-081):** en Cowork, el operador hacía pull y push; desde la VM no había ruta con credenciales a GitHub
  (medido el 2026-10-29). En Claude Code, la cabina hace pull, commit y push (`CLAUDE.md`, «Git»).
- **`aiw-console` es un checkout compartido (D-081, «Segunda enmienda», 2026-10-29):** varias cabinas en Claude Code
  comparten su índice y su rama. Antes del commit, `git diff --cached --name-only`; **el commit va siempre con ruta**
  (`git commit -m "…" -- <ruta>…`); y **antes del push, `git log origin/main..HEAD`**: si hay commits de otro hilo sin
  publicar, no se empuja —se espera a que su hilo los publique, o se le dice al operador—. Vale en cualquier repo con
  más de una cabina a la vez. Detalle en `CLAUDE.md`, «Git», punto 8.
- **El pull que falla por dos `fetch` a la vez** (`fatal: Cannot fast-forward to multiple branches.`) se repite **una
  vez** si se mide que no hay divergencia; si vuelve a fallar, se para y se dice. Palabra del operador del 2026-10-29,
  verbatim en `CLAUDE.md`, «Git», punto 2.

## §2 · Dónde está cada cosa

| Qué | Dónde |
|---|---|
| Lanzador del tutor | `start-p2-tutor.cmd`, en la raíz del repo |
| El alumno simulado y su conductor | `src/p2exp/learner/`, `src/p2exp/play/` (`python src/p2exp/play`), `profiles/` |
| PAF sobre una sesión manual | `tools/paf_manual.py` (gasta llamadas de Claude Code) |
| Veredictos de Chris, verbatim | `docs/verdicts/` |
| Contratos | `docs/contracts/` (datos, rúbrica, servidor, PAF manual y alumno siguen en borrador) |
| Informes de cada run | `docs/runs/<RUN_ID>.md` |
| Sesiones manuales | `data/manual/<session_id>/`. Pasarán a git (decisión de Chris del 2026-10-29), cuando se copien de la laptop |
| Lo que oye el hilo del paper | `PHD/Paper 2/00_HANDOFFS/DESDE_DEV.md` |
| La nota del hito 1 | `docs/hitos/2026-10-22-hito-1.md`, **histórica**: la junta pasó y la copia para la demo se retiró (2026-10-29) |

## §3 · Estado, medido el 2026-10-30

- **`#21` «Pin LF line endings in the repository and measure the PC's Claude Code version for its adapter»
  (`RUN-P2-PC-UPKEEP-001`) está `active`.** Lo creó la cabina el 2026-10-30, por orden de Chris («Sí, ábrelo»), y con
  sus campos aprobados («Sí, créalo»).
  - Por la consola: `insert` después del `#20` (remap: solo el nuevo, en el 21), y luego un lote `move` a O1.P2
    «Stack and repository skeleton» sin cambiar el orden + `set-status active`.
  - Campo a campo: un solo cambio, el run nuevo, igual a lo pedido. md5 `75ca7398…` → `7fd2fd68…`; `.project/`
    re-emitido.
  - Commit `c3020de`, publicado. Respaldo: `_backups\phd-p2-experiment\RUN-P2-PC-UPKEEP-001\roadmap.json`; se borra al
    cerrar.
  - **Taller lanzado** como sesión enlazada: «Taller #21: LF en el repo y Claude 2.1.284»,
    `local_0e0f1b7b-7c1f-45ce-844f-393ddf3d6d98`, `p2-pc-upkeep`; Opus, esfuerzo medio, sin worktree. No lleva QA
    humana y gasta como mucho 2 llamadas de Claude.
  - Al cerrarlo, la cabina hace un clon nuevo con el gitconfig de la PC y comprueba que sale en LF.
  - **La sesión del CLI de Claude está caducada**: «Login: Expired — log in again» a las 17:04 UTC. Iniciar sesión es
    de Chris (`claude auth login`). El taller hace primero lo de LF y, si la sesión sigue caducada, para sin la parte
    de pago.
- Los runs `#1` a `#20` están cerrados. El `#20` «Build the simulated learner by its contract and play it against the
  full tutor» cerró el 2026-10-30 (commit `d9e1a95`, publicado). Su historia, abajo.
  - **H1–H3, decididas** (2026-10-29). A «¿Aceptas H1–H3 como te los recomiendo?», Chris contestó «Sí, las tres».
    Verbatim en `docs/verdicts/2026-10-29-learner-h1-h3.md` (commit `9272925`, publicado). **H1**: las tácticas del
    adverso cuentan por sesión, no por paso, para que aparezca el contexto falso; `press_limit` sigue en 2 (§4.3, nueva
    `dynamics_version`). **H2**: solo cuenta como pista un mensaje con contenido del paso, por ejemplo una fórmula del
    ítem, y no un «inténtalo tú» vacío. Ajusta Q2 (§3.5, nueva `perception_version`). **H3**: sin cambio, se mide en el
    piloto.
  - **La QA1–QA4, toda sí** (2026-10-29). A «¿Me pasas la QA1–QA4 del §8.3?», Chris contestó «Todo sí». Está en el
    mismo veredicto (commit `cf442c8`). La segunda ronda lleva solo H1 y H2.
  - **El texto del `#20` se enmendó con la «RONDA 2»** (D-061), por la consola: `set-text`, con prueba en seco
    (`remap: []`) y aplicación con su base. Solo cambió el `full_description` del `#20`. El canónico pasó de md5
    `2e1384c2…` a `4e53de05…` (árbol = LF); `.project/` lo re-emitió `serve.mjs`. Commit `31e0567`, publicado. El
    respaldo está en `_backups\phd-p2-experiment\RUN-P2-LEARNER-001-ronda2\roadmap.json` y se borra cuando cierre el
    `#20`.
  - **El taller de la segunda ronda lo lanzó la cabina el 2026-10-29**, como sesión enlazada a la suya
    («Taller #20 ronda 2: alumno simulado H1–H2», `local_340af2bb-37c8-40e2-8bce-546952159f00`, nombre
    `p2-learner-ronda2`; Opus, esfuerzo alto, en la carpeta del repo y sin worktree). Fue por orden de Chris, a quien
    la cabina le había dado el ticket para pegarlo: *«no me de slos tickets para lanzarlos, tu lanzalos en un ticket
    anidado a esta conversacion por eso nos cambiamos cabina a claude code entonces tu lanzalo directamente»*. Desde
    entonces la cabina lanza ella los talleres (`../cabinas/phd-p2-experiment/CLAUDE.md`, «Qué cambia respecto a
    Cowork»). El brief es el ticket entero, más un preámbulo: no escribir git, tocar solo «Scope», y abrir el último
    mensaje con `TERMINADO` o `PARADO: …`. Pide una sesión real del adverso, de pago: como
    mucho 2 sesiones de `--call-budget 96` cada una. Para la regla de H2, la cabina avisó de algo: en la sesión real
    (b), el primer «inténtalo» del tutor en `s1` traía \(6\) y \(-5\), así que con esa regla sigue contando como pista
    (sí trae contenido del paso). El taller debe clasificar los 12 mensajes reales con la regla vieja y con la nueva.
    Al terminar el taller toca el turno 2: leer su informe, cerrar el `#20` si la QA de la ronda pasa, y borrar el
    respaldo.
  - **El taller PARÓ en el criterio 6** (2026-10-29, informe §12). Construyó todo lo gratuito: H1
    (`p2-learner-dynamics-v2`, campo nuevo `adverse_turns_in_session`), H2 (`p2-learner-perception-v2`: es señal la
    matemática que no repite el enunciado), el contrato §13/§14, y el ejemplo pasa a la semilla 363. La suite queda en
    3383 passed, 1 skipped; 9 ficheros, todos en «Scope». La sesión real no corrió: el único Codex de la PC es
    `codex-cli 0.142.0`, que no trae `gpt-6-astra` en su catálogo. El adaptador se midió en `0.163.0-alpha.10.2`,
    que está en npm (la «latest» es 0.166.0); la app de Codex de la ronda 1 no está en esta PC. Gastó 0 llamadas.
    La cabina lo verificó en disco: suite 3383/1/25, 0 `w/crlf`, la omitida es la del enlace simbólico. Lo publicó
    en el commit `383567d`. El `#20` sigue `active`.
    Para la sesión, el taller eligió la semilla 18 (§12.7).
  - **Hallazgos nuevos, para Chris:**
    - **H6**: con H2, el adverso abandona 17 de 39 sesiones con el tutor simulado; H3 se decidió con 3 de 39.
    - **H7**: una pista sin fórmula ya no es señal (la de respaldo de nivel 1 de `s2`); no sale en los 12 mensajes
      reales.
    - **Seguimiento**: añadir `adverse_turns_in_session` a los dos `contract/examples/invalid/learner-event.*`, que
      ahora fallan por dos razones.
  - **Chris decidió las cuatro como las recomendó la cabina** (2026-10-29). A «¿Aceptas las cuatro como te las
    recomiendo?» contestó «Sí, las cuatro». Está en el mismo veredicto, en la sección «After the second round stopped» (commit `c2f7175`, publicado).
    - **Codex:** él instala `codex-cli 0.163.0-alpha.10.2` en la PC
      (`npm.cmd install -g @openai/codex@0.163.0-alpha.10.2`). A las 04:05 UTC seguía en `0.142.0`.
    - **H6:** se mantiene H3, y el piloto lo mide.
    - **H7:** se deja así.
    - **Seguimiento:** va en el mismo taller que la sesión real.
    - **Cuando `codex --version` dé la 0.163, la cabina lanza ese taller.** Primero corren las pruebas gratuitas del
      guard (d) con esa versión; solo si pasan, la sesión con la semilla 18 (≤ 96 llamadas, más una segunda solo si no
      aparece el contexto falso). Va también el campo en los dos ejemplos inválidos. Después vienen la QA de la ronda y
      el cierre del `#20`.
  - **Chris instaló Codex 0.163** (2026-10-29). Lo pegó del PowerShell: `npm.cmd install -g
    @openai/codex@0.163.0-alpha.10.2` → «changed 2 packages in 10s»; `codex --version` → `codex-cli
    0.163.0-alpha.10.2`. La cabina lo midió a las 04:07:44 UTC: misma versión, «Logged in using ChatGPT», árbol limpio
    en `c2f7175`. Le mandó el encargo de la segunda parte al **mismo** taller (`p2-learner-ronda2`), que tiene el
    contexto: la semilla 18, sus scripts y el §12. Pide la capa gratuita del guard (d) antes de gastar, los dos ejemplos
    inválidos, la sesión real (≤ 2 sesiones / 192 llamadas) y un §12.15 nuevo, sin tocar §12.1–§12.14.
  - **La segunda parte PARÓ en la sesión real** (informe §12.15).
    - Hecho y verificado por la cabina: el guard (d) gratuito pasa con la 0.163 (2 de 2); los dos ejemplos inválidos
      llevan el campo y fallan solo por su siembra; suite 3383/1/25; 0 `w/crlf`.
    - Publicado en el commit `d075882`.
    - La semilla 18 terminó en `error` en el turno 1: Codex no pudo renovar el token de ChatGPT («Please log out and
      sign in again», 04:12:23 UTC). Hubo 3 `codex exec` sin respuesta (3 de 192 como cota) y no se corrió la 26.
    - **Corrección de la cabina:** a las 04:07:44 leyó «Logged in using ChatGPT» y dijo que había sesión. Ese
      `login status` no prueba que el token se renueve; solo una llamada real lo prueba.
    - **Lo que sigue:** Chris hace `codex logout` y `codex login`. Luego, una llamada mínima de pago
      (`test_minimal_call`) antes de la sesión, y otra vez la semilla 18 (§12.15.4).
  - **Chris volvió a iniciar sesión en Codex** («Ya inicié sesión», 2026-10-29). A las 04:22:16 UTC la cabina mandó la
    tercera parte al mismo taller: `test_minimal_call` (1 llamada) y, si responde, la semilla 18 en una carpeta nueva
    (la 26 solo si no aparece el contexto falso; ≤ 192 en toda la ronda). El informe va en un §12.16 nuevo.
  - **La tercera parte TERMINÓ** (informe §12.16). Pasó la llamada mínima, y la sesión real `se_z7kwwvhtnc` (semilla
    18) cerró `item_closed` en 6 turnos. El contexto falso, `claims_authority_value`, salió en el turno 4; no hubo
    abandono, y ningún paso pasó de dos actos adversos. Gastó 26 llamadas; la ronda va en 30 de 192.
    - La cabina verificó en disco: suite 3383/1/25, 0 `w/crlf`, solo el informe con §12.16 al final.
    - Comparó los 12 mensajes del §12.16.8 con la traza nativa del scratchpad del taller: coinciden literal.
    - Publicado en el commit `7483881`.
    - **La QA de la ronda pasó** (2026-10-30). A «¿El contexto falso se lee como un alumno?», con lo que había que
      mirar (el (4), y el salto al (5) «No sé cómo hacer esta parte»), Chris contestó «Sí, se lee así». Está en el
      veredicto, sección «The QA of the second round».
  - **El `#20` se cerró por la consola**, `active` → `completed`, con `closeout_result` (1640 caracteres).
    - Prueba en seco con `remap: []` y aplicación con su base.
    - Campo a campo contra el respaldo: solo cambiaron `status` y `closeout_result`.
    - md5 `4e53de05…` → `75ca7398…` (árbol = LF = HEAD); `.project/` re-emitido.
    - Commit `d9e1a95`, publicado.
    - Respaldos borrados: `RUN-P2-LEARNER-001-ronda2` y `RUN-P2-LEARNER-001-cierre`, y el temporal de la consola.
  - **Sigue abierto del `#20`:** las entradas de H1–H7 y de las versiones nuevas en `DESDE_DEV.md`, cuando llegue la
    copia de la laptop (informe §12.11 y §12.16.9).
- Hecho, de ESPEC §11: los pasos 1 a 3 (formatos, PAF sobre trazas a mano, el tutor completo) y el alumno simulado
  (contrato aprobado y construido). Más: la superficie visible, PAF sobre sesiones manuales y el lanzador. Sin
  empezar: el arnés de escenarios y la cobertura (O4.P2, O4.P3), los interruptores (O5), los brazos de RQ3 y la
  exportación (O6), el piloto (O7) y la validación (O8).

## §4 · Pendientes que no tienen run

- **De la mudanza (§6):**
  - **`DESDE_DEV.md` no viajó** (§6): copiarlo desde la laptop (el operador) y comprobar su md5 LF
    `67a2a6bc5d2bd96cf384f46ad8dc6c80` (860 líneas) antes de añadir nada. El operador ya aprobó que, tras cada entrada,
    la cabina commitee y publique en `PHD` solo ese fichero (2026-10-29, «Sí, solo ese fichero»; `CLAUDE.md`, «El canal
    con el paper»).
  - **La `.venv` está rehecha** (2026-10-29, 19:37–19:38 UTC). El operador instaló Python 3.12.10 con
    `winget install --id Python.Python.3.12 -e --source winget`, para su usuario
    (`C:\Users\chris\AppData\Local\Programs\Python\Python312\`; el lanzador `py.exe` está en `…\Python\Launcher\`).
    Una consola abierta antes de instalar no ve el `PATH` nuevo, y la app tampoco: la cabina llama a `py` por su ruta
    completa. La suite da **3370 passed, 1 skipped, 25 deselected** (19:55 UTC). La omitida es
    `tests/test_manual_server.py:508`, que necesita crear un enlace simbólico (`WinError 1314`; hace falta el Modo de
    programador o ser administrador). A la pregunta «¿Dejo la prueba del enlace simbólico omitida en esta PC?», el
    operador contestó «Sí, déjala» (2026-10-29). En esta PC esa es la cuenta esperada.
  - **El checkout de la PC escribía CRLF** (medido el 2026-10-29). El Git de la PC trae `core.autocrlf=true` en
    `C:/Program Files/Git/etc/gitconfig`. En la laptop este repo tenía `core.autocrlf=false` en su `.git/config`
    (`docs/runs/RUN-P2-TUTOR-LAUNCHER-001.md`, D7), y eso no viajó. Con `* text=auto`, 307 de los 381 ficheros quedaron
    en CRLF y 4 tests fallaban: los ejemplos `.jsonl` del contrato traían CR. A la pregunta «¿Pongo `core.autocrlf
    input` en phd-p2-experiment y paso los 307 ficheros a LF?», el operador contestó «Sí, adelante» (2026-10-29). La
    cabina puso `core.autocrlf input` en el `.git/config` de `phd-p2-experiment` (solo ahí) y pasó los 307 a LF. Cada
    uno se escribió solo si quedaba idéntico a su blob del índice: cuadraron 307 de 307. Un `git add` de esas rutas
    puso el índice al día sin cambiar contenido (`diff --cached` vacío; `status` limpio). Para un clon nuevo en Windows,
    lo duradero es del repo: un `.gitattributes` que fije LF (por ejemplo `*.jsonl text eol=lf`). Va en el próximo
    ticket de DEVELOPMENT.
  - **El adaptador de Claude acepta solo `2.1.226 (Claude Code)`** (`src/p2exp/llm/claude.py`, `MEASURED_VERSIONS`) y en
    la PC hay `2.1.284` (medido el 2026-10-29): el evaluador de PAF se niega aquí hasta que un taller corra las pruebas
    gratis de `tests/integration/test_claude_live.py` y añada la versión si pasan (`AGENTS.md`). Va en el próximo ticket
    de DEVELOPMENT que necesite PAF. El adaptador de Codex no tiene esa lista, pero sus opciones se midieron en
    `0.163.0-alpha.10.2`, la que Chris instaló en la PC el 2026-10-29 (antes había `0.142.0`, sin `gpt-6-astra`). Su
    `login status` no prueba que el token se renueve: la prueba es `test_minimal_call` (1 llamada).
  - Copiar `data/` desde la laptop (el operador) y verificarla contra el manifiesto (la cabina).
  - Versionar `data/manual/` en el próximo ticket de DEVELOPMENT (una excepción en `.gitignore` y una nota en el
    contrato de datos §11).
- La revisión a fondo de Chris del informe de PAF (`data/manual/se_x9629szb4q/paf/002/report.md`), con la legibilidad
  que pidió para el run del visor (O9.P4).
- Las cuatro carencias no bloqueantes del contrato del servidor (`docs/runs/RUN-P2-LIVE-VIEWER-001.md` §7).
- El feedback de diseño del visor de Chris: lo dará él, cuando abra ese run.
- Arreglar el contrato de «sin control» antes de O5.
- Para el hilo de `aiw-console`, solo nombrado: `start-console.ps1` devuelve 0 aunque el servidor salga con error tras
  Ctrl+C (`docs/runs/RUN-P2-TUTOR-LAUNCHER-001.md`, D2).
- `DESDE_DEV.md`: muchas entradas siguen pendientes del hilo del paper. Se cuentan al abrir.

## §5 · Entorno de la cabina

- La cabina mide en Python 3.10 con una venv propia (`$HOME/p2v`, fuera del montaje) hecha desde `requirements.lock`.
  No sobrevive entre sesiones: se rehace en un minuto. La suite ya no cabe en una llamada de 180 s: se corre en dos
  mitades.
- El permiso de borrado es por sesión: sin él, git deja `index.lock` y temporales en `.git`. Se pide antes de commitear.
- Ediciones del canónico: por la consola (`PC_PORT=8797`), con dry-run y `remap` antes de aplicar.

## §6 · La mudanza, medida en la PC el 2026-10-29 (UTC)

| Hora | Qué | Resultado |
|---|---|---|
| 15:47:52 | Carpeta conectada; `aiw-console` contiene `a0c3d9c` | `AIW_Workspace` en `desktop-525k0is`; sí (HEAD `ad00bfa`) |
| 15:48 | `index.lock` en los 7 repos | ninguno |
| 15:48:32 | `phd-p2-experiment`: HEAD frente a `origin/main` | `91d1043` = `91d1043`, igual que en la laptop (`repos-laptop.tsv`); árbol limpio |
| 15:48:32 | Tag `hito-1` | no está en la PC; el commit `4644240` sí. Ya no hace falta (§2) |
| 15:49 | Lo de este hilo en `_scratch` (MUDANZA §3) | nada: 0 entradas por nombre, ninguna asignada; la cabina nunca escribió ahí |
| 15:49 | `data/` (27 ficheros, 185 KB en la laptop) | no existe en la PC |
| 15:49 | `.venv` | no existe en la PC |
| 15:49 | `_demos/phd-p2-hito-1` (343 ficheros, 8,6 MB en la laptop) | no existe en la PC; retirada por Chris el 2026-10-29 |
| 15:49 | `_backups/phd-p2-experiment_roadmap.json_pre-20_2026-10-22` | no llegó; no hace falta: el roadmap de ese momento está en git (`0492e25`) |
| 16:19–16:22 | `PHD/Paper 2/00_HANDOFFS/DESDE_DEV.md` | **no viajó lo que la cabina escribió después de la sesión 15 del paper**: en la PC, 181 líneas (la versión de `PHD` `e9d38b6`, árbol limpio); en la laptop, 69 036 bytes y 860 líneas, sin commitear. El manifiesto lo marca en `difieren-en-contenido.txt` |
| 16:22:35 | HEAD frente a `origin/main`, tras el push del operador | `phd-p2-experiment` `deb51ee` = `deb51ee`; `aiw-console` `0b4235a` = `0b4235a` |

Lo que falta de la mudanza está en el §4.
