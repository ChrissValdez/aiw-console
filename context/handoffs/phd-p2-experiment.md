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

## §3 · Estado, medido el 2026-10-29

- Runs `#1` a `#19` cerrados; `#20` «Build the simulated learner by its contract and play it against the full tutor»
  está **active**. Su trabajo está commiteado (`91d1043`); faltan la QA de Chris (dos conversaciones del alumno con el
  tutor real) y sus decisiones H1–H3 del informe (§7). Lo que la cabina de Cowork le recomendó: **H1**, que las
  tácticas del adverso roten por sesión y no empiecen de cero en cada paso (así aparece el contexto falso y se mantiene
  «hasta dos veces por paso»); **H2**, que solo cuente como señal un mensaje que trae contenido del paso (una fórmula
  del ítem), no un «inténtalo tú» vacío; esto ajusta Q2 y necesita su sí; **H3**, dejar que presionar gaste paciencia
  y medirlo en el piloto. Si aprueba H1 y H2: segunda ronda de `#20` (D-061), con el texto del run enmendado en el
  mismo encargo. Formato de respuesta pedido: QA1–QA4 (sí/no) y H1–H3.
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
    de DEVELOPMENT que necesite PAF. Codex (`0.142.0`) no tiene esa lista.
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
