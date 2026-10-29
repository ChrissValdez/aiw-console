# Relevo — hilo `phd-p2-experiment`

> ⚠ **ANTES DE NADA — la mudanza del 2026-10-28 (D-081).** El trabajo pasó de la laptop a la PC y git es la fuente de
> verdad entre las dos computadoras; `_scratch` es desechable. Al reabrir este hilo, lee
> `context/cabinas/MUDANZA-2026-10-28.md` y haz su §2 antes que nada: el arranque en la PC, y revisar tu parte de
> `_scratch` (§3) para pasar a tu repo lo que siga vigente. Este aviso lo puso la cabina de LECCIONES a pedido del
> operador; lo de abajo es tu relevo, sin tocar.

**Fecha: 2026-10-22 (UTC).** Es el primer relevo de este hilo; antes no tenía ninguno en
`handoffs/`. Lo escribe la cabina a mitad de sesión para que la próxima sepa, como mínimo, dónde
está cada cosa. Las cifras son mediciones fechadas: se vuelven a medir al abrir.

## §0 · Qué es este hilo

Desarrollo del experimento del Paper 2 del doctorado de Chris (PAF: medir si un tutor con LLM cumple
una política explícita). Repo `projects/phd-p2-experiment`. El canónico es `roadmap/roadmap.json` y
el motor que lo conduce es el de `aiw-console` (por `serve.mjs`). Carriles: `DEVELOPMENT` (el que se
usa si no se dice otro) e `INTERFACE` (`ui/`).

## §1 · Reglas propias del hilo, además de las de la cabina

- **Respuestas en español.**
- **Carpeta del paper** (`AIW_Workspace/PHD/Paper 2/`): es la fuente de verdad y es de **solo
  lectura**. Única excepción: `00_HANDOFFS/DESDE_DEV.md`, y solo **añadiendo** entradas con su
  formato. Nunca se tocan el `.tex`, el registro de citas, `REGLAS.md`, `ESPEC_TUTOR_P2.md` ni el
  `HANDOFF_P2.md`.
- **Desarrollo decide cómo se construye.** No decide las reglas de la política, qué es una
  violación, los pasos de PAF, la muestra de validación ni los límites de ESPEC §9: eso va a
  `DESDE_DEV.md`.
- **Decisiones de diseño:** no se preguntan en un menú. Se analizan, se ponen los datos delante, se
  recomienda y se dice bajo qué condición cambiaría la recomendación. Se dice siempre qué se probó y
  qué no.
- **Modelos:** por CLI de suscripción, sin API. Codex para el tutor; Claude Code para el evaluador.
- **Los talleres no guardan memoria de Claude Code**: lo que deba durar va al informe del run.

## §2 · Dónde está cada cosa

| Qué | Dónde |
|---|---|
| **La copia para la demo de la junta (hito 1)** | `C:\Users\chris\Documents\AIW_Workspace\_demos\phd-p2-hito-1\`. Clon local fijado en el tag `hito-1` (commit `4644240`), sin remoto, con su propia `.venv`. Se arranca con doble clic en el `start-p2-tutor.cmd` **de esa carpeta**. Un solo servidor a la vez: comparte el puerto 8765 con el del repo |
| Nota del hito | `docs/hitos/2026-10-22-hito-1.md` en el repo: qué incluye, guion de la demo y qué no prometer |
| Lanzador del tutor (trabajo diario) | `start-p2-tutor.cmd`, en la raíz del repo |
| Veredictos de Chris, verbatim | `docs/verdicts/` |
| Contratos | `docs/contracts/` (datos, rúbrica y servidor siguen en borrador) |
| Informes de cada run | `docs/runs/<RUN_ID>.md` |
| Sesiones manuales | `data/manual/<session_id>/` (fuera de git; nunca son datos del estudio) |
| Lo que oye el hilo del paper | `PHD/Paper 2/00_HANDOFFS/DESDE_DEV.md` |

## §3 · Estado, medido el 2026-10-22

- Runs `#1` a `#17` cerrados. Hecho: los pasos 1 a 3 de ESPEC §11 (formatos, PAF sobre trazas
  escritas a mano, el tutor completo), más la superficie visible (visor, sesión en vivo, lanzador).
  Sin empezar: O4 a O8 (alumno simulado, interruptores, brazos de RQ3 y exportación, piloto,
  validación).
- **Hito 1** marcado para la próxima junta de Chris con sus asesores. El repo sigue sin
  restricciones; la demo sale de la copia del §2.
- Siguiente, decidido el 2026-10-22: PAF sobre sesiones manuales cerradas, en modo depuración, con un
  informe legible (`#18`). Después: una sesión del hilo del paper sobre `DESDE_DEV.md`, luego el
  alumno simulado.

## §4 · Pendientes que no tienen run

- Las cuatro carencias no bloqueantes del contrato del servidor (`docs/runs/RUN-P2-LIVE-VIEWER-001.md` §7).
- El feedback de diseño del visor de Chris: lo dará él, cuando abra ese run.
- Arreglar el contrato de «sin control» antes de O5.
- Para el hilo de `aiw-console`, solo nombrado: `start-console.ps1` devuelve 0 aunque el servidor
  salga con error tras Ctrl+C (`docs/runs/RUN-P2-TUTOR-LAUNCHER-001.md`, D2).
- `DESDE_DEV.md`: muchas entradas siguen pendientes del hilo del paper. Se cuentan al abrir.

## §5 · Entorno de la cabina

- La cabina mide en Python 3.10 con una venv propia (`$HOME/p2v`, fuera del montaje) hecha desde
  `requirements.lock`. Puede no sobrevivir entre sesiones: se rehace en un minuto.
- En el entorno de la cabina, `test_the_server_listens_on_127_0_0_1_only` falla porque el nombre del
  equipo no resuelve. Es un defecto del test y está en `#18`.
- Ediciones del canónico: por la consola (`PC_PORT=8797`), con dry-run y `remap` antes de aplicar.
