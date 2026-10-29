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
La cabina sigue en **Cowork**.

## §1 · Reglas propias del hilo, además de las de la cabina (`context/cabinas/REGLAS-DE-CABINA.md`)

- **Respuestas en español.**
- **Carpeta del paper** (`AIW_Workspace/PHD/Paper 2/`): es la fuente de verdad y es de **solo lectura**. Única
  excepción: `00_HANDOFFS/DESDE_DEV.md`, y solo **añadiendo** entradas con su formato. Nunca se tocan el `.tex`, el
  registro de citas, `REGLAS.md`, `ESPEC_TUTOR_P2.md` ni el `HANDOFF_P2.md`.
- **Desarrollo decide cómo se construye.** No decide las reglas de la política, qué es una violación, los pasos de
  PAF, la muestra de validación ni los límites de ESPEC §9: eso va a `DESDE_DEV.md`.
- **Decisiones de diseño:** no se preguntan en un menú. Se analizan, se ponen los datos delante, se recomienda y se dice
  bajo qué condición cambiaría la recomendación. Se dice siempre qué se probó y qué no.
- **Modelos:** por CLI de suscripción, sin API. Codex para el tutor y el alumno; Claude Code para el evaluador.
- **Los talleres no guardan memoria de Claude Code**: lo que deba durar va al informe del run.
- **Git (D-081):** el operador hace pull antes de que la cabina escriba y hace el push. Desde el entorno de la
  cabina no hay fetch ni pull: GitHub pide usuario (medido el 2026-10-29).

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
  tutor real) y sus decisiones H1–H3 del informe (§7): rotar las tácticas del adverso por sesión, que solo cuente como
  señal un mensaje con contenido del paso, y la paciencia del adverso.
- Hecho, de ESPEC §11: los pasos 1 a 3 (formatos, PAF sobre trazas a mano, el tutor completo) y el alumno simulado
  (contrato aprobado y construido). Más: la superficie visible, PAF sobre sesiones manuales y el lanzador. Sin
  empezar: el arnés de escenarios y la cobertura (O4.P2, O4.P3), los interruptores (O5), los brazos de RQ3 y la
  exportación (O6), el piloto (O7) y la validación (O8).

## §4 · Pendientes que no tienen run

- **De la mudanza (§6):** rehacer la `.venv` en la PC (el operador; sale de `requirements.lock`); copiar `data/` desde
  la laptop (el operador) y verificarla contra el manifiesto (la cabina); versionar `data/manual/` en el próximo
  ticket de DEVELOPMENT (una excepción en `.gitignore` y una nota en el contrato de datos §11).
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

Lo que falta de la mudanza está en el §4.
