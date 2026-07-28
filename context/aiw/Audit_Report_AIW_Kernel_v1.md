# Audit Report — AIW Kernel v1

- **Ticket:** AUDIT-AIW-KERNEL-001 (audit-only, solo lectura + un único reporte)
- **Fecha del reporte:** 2026-07-24
- **Repo auditado:** `aiw/` (kernel)
- **Rama:** `main` (`aiw/.git/HEAD` → `refs/heads/main`)
- **Último commit:** `ca3087d8c2686c8250f512838b36ce6cd590800a` — "chore(context): rutas a context/DECISIONES.md (D-038)" (leído de `.git/refs/heads/main` y `.git/logs/HEAD`; no se ejecutó ningún comando de git)
- **Alcance excluido (respetado):** no se leyó `projects/aiw-console/`. Los documentos de gobernanza que `CLAUDE.md`/`CONTEXTO.md` apuntan a `projects/aiw-console/context/aiw/` (ESTADO, DECISIONES, roadmap, DELEGACION) quedan **fuera de alcance**; donde su contenido sería necesario se marca "no determinado".

Convención: todas las referencias `archivo:línea` apuntan a rutas reales dentro de `aiw/`.

---

## A. Evidencia y telemetría

### 1. Artefactos de evidencia que produce hoy un run

Un run del kernel escribe todo en `aiw/logs/<id>/`, donde `<id>` es el basename del objetivo en minúsculas y saneado (`kernel.mjs:281`), y `logDir` se deriva de ahí (`kernel.mjs:283`). Artefactos por run:

| Archivo | Formato | Se escribe en | Condición |
|---|---|---|---|
| `objective.md` | Markdown (copia literal del objetivo) | `kernel.mjs:337` | siempre |
| `preflight.txt` | Texto | `kernel.mjs:326` | siempre (baseline verde) |
| `STAGE.txt` | Texto (una línea por transición) | `stage()` `kernel.mjs:88-92` | siempre; append incremental |
| `round<N>_executor.md` | Markdown + header HTML | `kernel.mjs:354` | por ronda |
| `round<N>_tests.txt` | Texto | `kernel.mjs:384` | por ronda con executor OK |
| `round<N>_reviewer.md` | Markdown + header HTML | `kernel.mjs:402` | por ronda que llega al reviewer |
| `summary.md` | Markdown | `kernel.mjs:445` | siempre (closeout) |
| `proposed_followup.md` | Markdown | `kernel.mjs:437` | solo si estado BLOCKED o HUMAN_REVIEW |
| `network_note.txt` | Texto | `kernel.mjs:338` | solo si `git fetch` falló |
| `parking_note.txt` | Texto | `kernel.mjs:454` / `:458` | solo si árbol sucio al cierre o falló el `checkout` de parking |

Artefactos fuera de `logs/<id>/`:
- **Lockfile** `locks/<base>-<hash>.lock` — JSON transitorio, se borra en el `finally` (`kernel.mjs:298`, `:464`).
- **Notificación ntfy** (push HTTP, no archivo) — `notify()` `kernel.mjs:240-250`; su status se registra en `summary.md`.
- **Archivado de objetivos**: `queue.mjs` mueve cada objetivo a `objectives/processed/<STATE>-<nombre>` (`queue.mjs:58`), lo que deja un registro de resultado por objetivo fuera de `logs/`.

No existe hoy ningún artefacto de evidencia en JSON emitido por el kernel (ver A.4).

### 2. Campos que captura la evidencia por run (lista exhaustiva de campos reales)

- **`STAGE.txt`** (`stageLine`, `kernel.mjs:87`): por cada transición → `timestamp ISO` + `label`. Labels reales: `preflight: started`, `preflight: finished exit=<n> [TIMEOUT]`, `round <N>: executor started`, `round <N>: executor finished exit=<n> [TIMEOUT]`, `round <N>: tests started/finished exit=<n> [TIMEOUT]`, `round <N>: reviewer started/finished`, `round <N>: verdict <V> -> <decision>`, `closeout: <state> (<reason>)`.
- **`round<N>_executor.md`** (`kernel.mjs:354-355`): header con `timestamp`, `exit`, `error` (mensaje o `no`); luego `stdout` + bloque `--- stderr ---`.
- **`round<N>_tests.txt`** (`kernel.mjs:383-384`): `timestamp`, string de comando (`$ <verifyCmd>`), `exit`, flag `(TIMEOUT)`, `stdout`, `stderr`.
- **`round<N>_reviewer.md`** (`kernel.mjs:402-403`): header con `timestamp`, `exit`, `error`; `stdout` + `--- stderr ---`.
- **`preflight.txt`** (`kernel.mjs:326`): `timestamp`, comando, `exit`, flag TIMEOUT, tail combinado de out+err (8000 chars).
- **`summary.md`** (`kernel.mjs:445-448`): `Final state`, `Reason`, `Project` (nombre + ruta del repo), `Branch` (+ base), `Rounds` (usadas/max), `pushNote`, `ntfy notification` status, `Closed` timestamp, lista de **Touched files** (`git diff --name-only base..HEAD`), comandos de revisión matinal.
- **`proposed_followup.md`** (`kernel.mjs:437-441`): `State`, `Reason`, `Rounds`, último reporte del reviewer, última verificación (tail 6000), y los `acceptance criteria` del objetivo.
- **Lockfile** (`kernel.mjs:298`): `pid`, `started` (ts), `objective` (id), `repo` (ruta).

### 3. Presencia de campos clave (sí / no / parcial)

| Campo | Estado | Dónde se ve (o su ausencia) |
|---|---|---|
| **Modelo usado** | **NO** | `invokeClaude` (`kernel.mjs:232-237`) lanza `claude -p --output-format text …` sin fijar ni capturar modelo; ningún artefacto lo registra. |
| **Versión/hash del contrato** | **NO** | El objetivo se copia verbatim a `logs/<id>/objective.md` (`kernel.mjs:337`), pero `parseObjective` (`kernel.mjs:129-149`) no define campo de versión ni se calcula hash. |
| **Versión del prompt** | **NO** | Las plantillas `prompts/executor.md` y `prompts/reviewer.md` se leen frescas (`kernel.mjs:340-341`); no se registra versión ni hash del prompt usado. |
| **Costo / conteo de tokens** | **NO** | No se captura en ningún punto; la salida es `--output-format text`. |
| **Número de ronda** | **SÍ** | Prefijo `round<N>` en nombres de archivo, líneas de `STAGE.txt` (`kernel.mjs:410`), y `Rounds: X/Y` en `summary.md` (`kernel.mjs:447`). |
| **Timestamps por paso** | **SÍ** | `STAGE.txt` sella cada transición con ISO (`kernel.mjs:87-92`); además cada `round<N>_*` y `preflight.txt` llevan timestamp propio. Registra inicio y fin de cada etapa. |

### 4. ¿Evidencia consultable programáticamente o texto libre?

**Texto libre / semi-estructurado.** Los artefactos por run son `.md` y `.txt` pensados para lectura humana; `summary.md` y `STAGE.txt` tienen forma regular pero sin esquema formal. El único artefacto JSON que emite el kernel es el **lockfile transitorio** (`kernel.mjs:298`), que se borra al cerrar. No hay JSON de evidencia por run consultable. (Existe `aiw/.aiw/project_console.snapshot.json`, pero lo produce el proyector de `aiw-console` leyendo `objectives/`, no el kernel; su emisor está fuera de alcance de lectura.)

---

## B. Contratos y specs

### 5. Formato del contrato/ticket de run; dónde se define/valida

- **Formato:** `objective.md` en Markdown con secciones marcadas por encabezados `#`. Plantilla en `templates/objective.md`. Secciones: `# Project`, `# Objective`, `# Acceptance criteria`, `# Scope`, `# Out of scope`, `# Max rounds` (opcional), `# Verification` (opcional).
- **Dónde se parsea/valida:** `parseObjective` (`kernel.mjs:129-149`) — extrae secciones, exige `project`, `objective`, `acceptance criteria` (falla con `Abort` si faltan, `kernel.mjs:146-147`). `parseGlobs` (`kernel.mjs:150-158`) valida que `Scope` declare al menos un glob y compila cada glob a regex. `parseMaxRounds` (`kernel.mjs:122-128`) valida entero 1..10 (fail-closed). No hay JSON Schema; la validación es por parser markdown, fail-closed vía `Abort`.

### 6. Identificador/versión del contrato; vínculo contrato↔evidencia

- **Identificador:** el `id` se deriva del **nombre del archivo** del objetivo (`kernel.mjs:281`), no de su contenido. No existe campo de versión ni hash del contrato.
- **Vínculo con la evidencia:** **SÍ por id/nombre**, **no por versión/hash**. El objetivo se copia a `logs/<id>/objective.md` (`kernel.mjs:337`) y todo el `logDir` se llavea por ese `id` (`kernel.mjs:283`). Como no hay hash de contenido, dos runs del mismo nombre con contenido distinto quedan bajo el mismo `id` sin distinción de versión. El nombre archivado (`processed/<STATE>-<nombre>`, `queue.mjs:58`) también preserva la traza por nombre.

---

## C. Ensamble de contexto

### 7. Cómo construye el kernel el contexto del executor (archivos, orden, completo o por partes)

El kernel **no carga código fuente del repo en el prompt**; ensambla un único string por rol y delega la lectura del repo al agente (que corre en `cwd = repo`).

- **Executor** (`invokeClaude('executor', …)`, `kernel.mjs:232-237`): prompt = plantilla `prompts/executor.md` (`kernel.mjs:340`) con dos sustituciones (`kernel.mjs:349-351`):
  1. `{{OBJECTIVE}}` = objetivo crudo **completo** (`objectiveRaw`).
  2. `{{LOG}}` = `logAccum` (historia acumulada de rondas previas) o `"(first round — no history)"`.
  Se pasa por **stdin** con `--permission-mode acceptEdits` (todas las herramientas). El executor lee el repo por su cuenta con sus tools; esa lectura no la dirige el kernel.
- **Reviewer** (`invokeClaude('reviewer', …)`, `kernel.mjs:235`): plantilla `prompts/reviewer.md` (`kernel.mjs:341`) con (`kernel.mjs:396-399`): `{{OBJECTIVE}}` completo; `{{DIFF}}` = `git diff --no-color base..HEAD` recortado a `MAX_DIFF`=150 000 chars (`kernel.mjs:393-394`); `{{TESTS}}` = tail 12 000 chars del último test (`kernel.mjs:399`). El reviewer va restringido a `Read,Grep,Glob` (`kernel.mjs:235`).
- **Orden:** objetivo primero, luego historia (executor) o diff+tests (reviewer). Todo lo que inyecta el kernel va **front-loaded en un solo string**, y el objetivo se pasa **completo**, no por partes.

### 8. ¿Carga condicional/selectiva o todo front-loaded?

**Todo front-loaded.** No hay mecanismo de recuperación/selección de contexto en el kernel. Lo único "condicional" son topes de tamaño/truncado: diff a 150 000 (`kernel.mjs:394`), tail de tests a 12 000 (`kernel.mjs:399`), `MAX_TAIL`=4 000 para tails de log (`kernel.mjs:22`). `logAccum` crece por append entre rondas (`kernel.mjs:411`, etc.). La lectura selectiva de archivos ocurre dentro del agente executor vía sus herramientas, pero no es dirigida por el kernel.

---

## D. Ciclo y puntos de extensión

### 9. Pipeline real del ciclo (según el código; rutas de módulos)

Todo el ciclo vive en `kernel.mjs`, función `main()` (`kernel.mjs:262`):

1. **Carga y parseo** (`:267-283`): lee `config.json`; `parseObjective` (`:270`); `parseGlobs` (`:272`); resuelve proyecto en `config.projects` (`:274-279`); deriva `id`, `branch=aiw/<id>`, `logDir` (`:281-283`).
2. **Asserts de seguridad** (`:286-288`, CONSTITUCION §5): repo existe, tiene `.git`, y **anti-auto-hosting** (target ≠ el propio `aiw`).
3. **Lockfile** (`:291-300`): un run por repo, llaveado por ruta real (`lockPathFor`, `:254-259`); sin auto-limpieza (incidente → humano).
4. **Preparar rama** (`:305-319`): aborta si el árbol está sucio; `fetch`/`checkout base`/`pull --ff-only` si hay remoto.
5. **Pre-flight baseline verde** (D-012, `:321-328`): corre `verifyCmd` sobre la base con `execProc` (`:98-117`); si falla → `Abort` "red baseline".
6. **Crear rama** (`:330-335`): `checkout -b aiw/<id>`; asserts de rama (`!= base`, empieza con `aiw/`) y de `cwd`/toplevel.
7. **Round loop** (`:345-419`), por ronda:
   - **a+b. Executor** (`:349-357`): `invokeClaude('executor')`; escribe `round<N>_executor.md`.
   - **c+d. Guards SIEMPRE** (`:361-368`): `changedFiles` (`:177`) → `evaluateGuards` (`:183-189`) = scope (`BLOCKED_SCOPE`) + secretos (`BLOCKED_SECRETS`); si bloquea, `checkpoint` para preservar y `break`.
   - **e. Checkpoint** (`:370`): `checkpoint()` (`:199-207`) hace `add -A` + `commit`.
   - Manejo de fallo del executor (`:373-378`) — TIMEOUT → HUMAN_REVIEW.
   - **f. Verificación** (`:381-390`): `execProc(verifyCmd)`; escribe `round<N>_tests.txt`; si rojo, acumula y continúa/HUMAN_REVIEW.
   - **g. Reviewer** (`:392-405`): arma diff (`:393-395`), `invokeClaude('reviewer')`, escribe `round<N>_reviewer.md`.
   - **h+5. Veredicto** (`:407-418`): `parseVerdict` (`:211`) + `superviseVerdict` (`:218`) → `CONTINUE` (otra ronda) o estado terminal.
8. **Closeout** (`:424-462`): push con supresión si apareció secreto (`:427-433`); touched files (`:435`); `proposed_followup.md` si BLOCKED/HUMAN_REVIEW (`:436-442`); `notify` (`:443`); `summary.md` (`:445`); **parking** a la base solo con árbol limpio (`:452-459`); fija `process.exitCode` desde `OUTCOMES` (`:462`).
9. **`finally`** (`:463-466`): libera el lock.

Orquestación de la cola: `queue.mjs` recorre `objectives/pending/*.md` en orden alfabético, lanza `kernel.mjs` por objetivo con `spawnSync` (`queue.mjs:55`), mapea exit → estado (`queue.mjs:18`) y archiva (`queue.mjs:58`).

### 10. Puntos de extensión naturales para un gate adicional (p. ej. runner de evals)

(Solo localización; sin propuesta de implementación.)

- **Dentro del round loop, entre la verificación (`kernel.mjs:381-390`) y el reviewer (`kernel.mjs:392`)**: es el hueco secuencial donde un paso adicional se insertaría como otro `stage()` + `execProc()`, del mismo shape que la verificación.
- **`execProc` (`kernel.mjs:98`)** es el runner genérico de proceso externo que ya usa `verifyCmd`; un comando de evals tendría idéntica forma de invocación.
- **`superviseVerdict` (`kernel.mjs:218-225`) + tabla `OUTCOMES` (`kernel.mjs:28-33`)**: la escalera de decisión pura y determinista; un estado/decisión terminal nuevo extendería ambos, y `queue.mjs:18` (`STATES`) consume esos exit codes.
- **Funciones puras exportadas (`kernel.mjs:227-229`)**: seam testeable (guards, verdict, supervisor, checkpoint) donde encaja lógica pura nueva con sus tests.
- Restricción de hecho: techo de ~500 líneas (CONSTITUCION §4; kernel reportado en 478/500 en `logs/INCIDENT-2026-07-11.md` §6) y regla de "no mecanismo nuevo sin incidente documentado".

### 11. Cómo se registran hoy los veredictos y las correction rounds

- **Parseo del veredicto:** `parseVerdict` (`kernel.mjs:211-215`) — última línea no vacía, match exacto `VERDICT: (APPROVED|CHANGES_REQUIRED|BLOCKED)`; `null` = no parse (fail-closed).
- **Supervisión:** `superviseVerdict` (`kernel.mjs:218-225`) → `APPROVED`/`BLOCKED`/`CONTINUE`/`ROUNDS_EXHAUSTED`/`HUMAN_REVIEW`.
- **Dónde se registra el veredicto:** línea en `STAGE.txt` `round <N>: verdict <V> -> <decision>` (`kernel.mjs:410`); salida cruda del reviewer en `round<N>_reviewer.md` (`kernel.mjs:402`); estado y razón finales en `summary.md` (`kernel.mjs:446`).
- **Correction rounds:** `CHANGES_REQUIRED` con `round < maxRounds` → `CONTINUE` (`kernel.mjs:222`), y el reporte del reviewer se **acumula en `logAccum`** (`kernel.mjs:411`), que alimenta `{{LOG}}` del siguiente executor. Cada ronda escribe sus propios `round<N>_*`. `roundsUsed` se rastrea (`kernel.mjs:346`) y se reporta como `Rounds: X/Y`. Los exit codes de `OUTCOMES` (`kernel.mjs:28-33`) los traduce `queue.mjs` a etiquetas de archivado (`queue.mjs:18`).

---

## E. Estado y deuda relevante

### 12. Partes en transición / incompletas / con convenciones inconsistentes

- **Migración de contexto (D-037/D-038):** el contexto de gobernanza se mudó a `projects/aiw-console/context/aiw/` (`CONTEXTO.md`, `CLAUDE.md`). `aiw/CLAUDE.md` referencia `../projects/aiw-console/context/…` para ESTADO/DECISIONES/roadmap/DELEGACION. Esos documentos **no son legibles en esta auditoría** (fuera de alcance): el **estado operativo actual del sistema no es determinable desde `aiw/` solo**.
- **Deriva de rutas en evidencia histórica:** `config.json:12` apunta a `…\AIW_Workspace\projects\aiw-console`, pero `logs/002-canonical-path-and-autoproject/summary.md:5` conserva la ruta antigua `…\AI_Workflow_Workspace\aiw-console`. El workspace fue renombrado/movido; la evidencia vieja arrastra rutas obsoletas.
- **Convenciones inconsistentes en `objectives/`:** conviven 5 carpetas de ciclo — `pending/`, `processed/`, `parked/`, `qualification/`, `queue-e7/`. `queue.mjs` **solo** consume `pending/` (`queue.mjs:14,49`); `qualification/` y `queue-e7/` no las procesa la cola (staging manual/experimental). Un run de mejora futuro debe conocerlo.
- **Artefactos de incidente mezclados en `logs/`:** `logs/002-…-orphan-20260711/` (evidencia parcial de un run huérfano), `logs/INCIDENT-2026-07-11.md` y `logs/DIAG-roadmap-invalid.md` conviven con los directorios por run.
- **Proyector de roadmap con contrato desalineado (documentado, código fuera de alcance):** `logs/DIAG-roadmap-invalid.md` detalla mismatches M1–M7 (ruta de entrega `.aiw/views/` vs `.aiw/roadmap/`, títulos/resúmenes = nombre de proyecto, `ERROR-`/`HUMAN_REVIEW-` renderizados como completados limpios). Objetivos pendientes `005-roadmap-contract-fix` y `006-roadmap-delivery-path` apuntan a ello, contra el proyecto `console` (fuera de alcance).
- **v1 congelado (D-032):** `CLAUDE.md` marca AIW Core v1 como read-only, retiro CONGELADO, y su ubicación en disco no se asume.
- **Techo del kernel:** ~478/500 líneas (`logs/INCIDENT-2026-07-11.md` §6); cerca del tope duro, por lo que añadir mecanismos exige borrar o un incidente documentado.
- **No determinado:** el contenido de ESTADO/DECISIONES/roadmap y la fase real de `aiw-console` no se pudieron verificar (fuera de alcance de lectura).

---

## Observaciones para parking

- La telemetría por run no captura modelo usado, tokens/costo, ni hash de prompt.
- La evidencia por run es texto libre/markdown; el kernel no emite JSON consultable.
- El contrato carece de versión/hash; el vínculo contrato↔evidencia es solo por nombre de archivo.
- Hueco natural para un gate extra entre verificación y reviewer (`kernel.mjs:390-392`).
- Ensamble de contexto 100% front-loaded, con truncados por tamaño; sin carga selectiva.
- `objectives/` tiene 5 carpetas de ciclo con convención inconsistente; la cola solo lee `pending/`.
- Rutas obsoletas (`AI_Workflow_Workspace`) persisten en evidencia histórica.
- El techo de ~500 líneas del kernel limita añadir gates sin borrar.
- El contexto de gobernanza vive fuera del repo (`aiw-console`), no auditable desde `aiw`.
- Artefactos de incidente/diagnóstico conviven con los runs dentro de `logs/`.
