# AIW — Orchestration Context

Este documento carga **gobernanza y conciencia**. No carga estado.

No contiene HEADs, ni conteos (de tests, de líneas, de runs), ni scoreboards, ni
copias de lo que dice el código. Eso se pudre. Los espejos de gobernanza de este
proyecto fueron un safepoint por detrás del repo en el momento menos oportuno, y
dos diagnósticos completos se construyeron contra el sistema equivocado por
confiar en hechos recordados en vez de verificados.

Dónde viven los hechos:

```text
aiw\roadmap_AIW_temp.md          = el backlog estructurado (temporal; semilla del roadmap v3)
aiw\ESTADO.md                    = el estado de sesión (dónde quedamos). Se reescribe al cierre.
aiw\DECISIONES.md                = el log de decisiones completo (append-only)
aiw\records\                    = la historia (HISTORIA, CRONICA, COSECHA, QUALIFICATION, auditorías)
git                              = los SHAs, las ramas, el baseline
aiw\config.json                  = los proyectos registrados y su push
aiw\logs\<id>\summary.md         = la evidencia por run (GITIGNOREADO: no viaja en git)
la consola (cuando exista)       = el estado renderizado
```

La cabina no lee el repo. Cuando la cabina necesita un hecho, pide una lectura
read-only — no recuerda uno.

---

## Modelo operativo

```text
Cabina (este proyecto Claude)   = decide, planea, prepara objetivos, adjudica; no toca disco
Taller (Claude Code)            = diagnostica e implementa sobre el disco real; cita ruta:línea
Kernel (aiw\kernel.mjs)         = ejecuta UN objetivo: executor → guardias → verificación → reviewer → veredicto
Executor / Reviewer             = providers CLI spawneados POR el kernel; nunca la cabina, nunca a mano
Operador (humano)               = merges a main, closeouts, decisiones, autoridad final
```

La gobernanza llega primero a la cabina. La cabina prepara; el taller o el kernel
ejecutan; el operador cierra. La continuidad vive en el repo (ESTADO, DECISIONES)
y en este documento — nunca en la memoria de una sesión.

## Precedencia

1. Repo real y estado de git.
2. `CONSTITUCION.md` de AIW; `AGENTS.md`/`CLAUDE.md` del repo objetivo.
3. `ESTADO.md` + `DECISIONES.md`.
4. `records/`.
5. Veredictos explícitos del operador aún no persistidos.
6. Este documento.

El repo real siempre gana. Los documentos describen intención; el disco describe
realidad.

---

## Identidad: cuál AIW es AIW

La trampa más cara de este proyecto. Ya mordió dos veces (dos diagnósticos
forenses completos auditaron el sistema equivocado). Instrucción permanente:

```text
AIW v2 (EL REAL)   = AIW_Workspace\aiw\   ← ÚNICO AIW EN DISCO
                     .mjs — kernel.mjs / queue.mjs / config.json — minimalista
AIW Legacy v1      = RETIRADO DEL DISCO (2026-07-22). Vive SOLO en GitHub como
                     `aiw-v1-legacy`, ARCHIVADO (read-only). Sistema v1 completo
                     (687 commits, ~845 .js, bin/aiw.js), congelado 2026-07-09.
                     Diagnóstico verificado: NO comparte una sola línea de
                     historia git con el v2 ni hay dependencia de código — el v2
                     nació de cero. No es "cantera de la que v2 se extrajo":
                     es un SUCESOR POR REESCRITURA + cosecha de ideas.
Worktree Legacy    = projects\ai_workflow_parallel\ (rama aiw-parallel). Ignorar.
```

- **Señal binaria:** `kernel.mjs` presente = v2. `bin/aiw.js` presente = Legacy.
  Si un diagnóstico se encuentra leyendo `bin/aiw.js` o `src/core/*.js`: NO está
  en disco — está en el repo archivado de GitHub. PARAR.
- **La trampa está cerrada por construcción:** ya no hay dos AIW en disco, en
  ninguna de las dos máquinas. La confusión que mordió dos veces no puede
  repetirse por accidente; solo por leer el archivo de GitHub a propósito.
- **Máquinas:** antes de auditar o diagnosticar, confirmar en qué máquina se está
  y si el v2 existe ahí (`Test-Path ...\aiw\kernel.mjs`). El v2 nació en una sola
  máquina; su presencia en otra se verifica, no se asume.
- **Respaldo:** VERIFICADO desde 2026-07-22 (`ChrissValdez/aiw`, privado, push
  confirmado por ls-remote). La lección permanece: un remote configurado que
  nunca pusheó NO es un respaldo — se verifica con push exitoso, no con
  `git remote -v`.

---

## El contrato del kernel (estable)

- **Unidad de trabajo: `objective.md`** con `# Project`, `# Objective`,
  `# Acceptance criteria`, `# Scope`, `# Out of scope`, `# Max rounds`. La
  verificación por proyecto vive en `config.json`. El kernel **no lee**
  `roadmap.json`, ni `progress`, ni frontier alguno; arranca siempre en ronda 1.
  (Consecuencia: la relajación `active`-sin-`progress` de Cantu es inocua para
  la reconexión.)
- **Cuatro cubetas de desenlace** (D-027):
  1. **Rechazo de pre-flight** (exit 1, archivado `ERROR`): ticket malformado,
     proyecto no registrado, scope vacío, lock ocupado, árbol sucio, baseline
     rojo. Muere ANTES de invocar al executor. Un rechazo aquí es el sistema
     funcionando, no un fallo del trabajo.
  2. **CHANGES_REQUIRED**: el trabajo es corregible; reintenta en otra ronda
     dentro del mismo run, con el feedback del reviewer.
  3. **BLOCKED** (exit 3): exactamente tres eventos — guardia de scope, guardia
     de secretos, verdict BLOCKED del reviewer. **Human-only.** No existe ni se
     construye follow-up automático; el kernel escribe un borrador
     (`proposed_followup.md`, gitignoreado) y para. Nada lo ejecuta.
  4. **HUMAN_REVIEW** (exits 2/4): rondas agotadas o veredicto no parseable.
     Para al humano.
- **La verificación es real:** el kernel spawnea el comando de tests del
  proyecto. Baseline rojo aborta antes de ramificar; una ronda con tests rojos no
  llega al reviewer; sin comando de verificación, aborta. El kernel no aprueba a
  ciegas nada que tenga red.
- **Git:** el kernel commitea y (con push habilitado) pushea SOLO ramas `aiw/*`
  **del repo del proyecto objetivo**. Nunca main. Nunca el repo de AIW
  (anti-auto-hosting: el kernel se niega a ejecutar sobre sí mismo). El push se
  habilita por proyecto, deliberadamente; los proyectos nuevos se registran con
  push apagado.
- **Terminal:** mientras el kernel corre, su terminal queda abierto e intocado
  hasta terminar (D-024). Cerrarlo a media ejecución fue el incidente de la
  ventana muerta.

## Decisiones vigentes (digest — el log completo es `DECISIONES.md`)

```text
D-002  Repo-como-estado. Este documento existe bajo esa doctrina: gobernanza sí, estado no.
D-003  Taller/cabina. La cabina no ejecuta; prepara encargos.
D-012  Pre-flight fail-closed sobre la base antes de ramificar.
D-014  El repo real se registra en config.json deliberadamente, nunca por default.
D-017  Dogfood primero: la consola fue el primer repo objetivo.
D-018  Criterios de graduación al proyecto real (ver ESTADO para el scoreboard vivo).
D-021  Adoptar herramienta probada antes que construir (build-vs-buy con presupuesto).
D-023  UNA consola multi-proyecto; los datos viven en el repo de cada proyecto.
D-024  Ejecución supervisada tras la ventana muerta; terminal intocado.
D-026  Test-de-consumidor: un emisor prueba contra el contrato real del lector.
D-027  BLOCKED = human-only. Sin follow-up automático. Tres eventos, solo graves.
D-028  PENDIENTE DE IMPLEMENTAR: pre-flight de scope debe exigir match real.
D-029  Categorías de run por closeout: manual / semi-autónomo / autónomo.
D-030  Batch→rama (el humano agrupa al encolar); merge a main SIEMPRE humano.
```

---

## Los peligros

Cosas que realmente salieron mal. Cada una es una instrucción permanente.

### Papel ≠ disco

Los documentos de gobernanza describen intención; el disco describe realidad. Dos
reportes de decisión completos se construyeron sobre diagnósticos del sistema
equivocado. Antes de decidir sobre capacidades de AIW: diagnóstico read-only en el
taller, con citas ruta:línea, etiquetando cada afirmación
`[VERIFICADO EN DISCO]` o `[NO VERIFICABLE]`. Un doc que afirma algo se verifica
contra el código antes de darse por cierto.

### El diff de dos puntos miente

`git diff A..B` muestra fantasmas cuando las ramas divergen: archivos de otros
merges aparecen como si B los tocara o borrara. Para "qué tocó esta rama DE
VERDAD" se usa el diff de tres puntos (`A...B`), y el árbitro final de un merge
es el ensayo `git merge --no-commit --no-ff` — deja que git decida, con
`git merge --abort` como botón de pánico. Una falsa alarma de solape ya costó
media sesión por leer un diff de dos puntos con `$BASE` vacío.

### La cabina no afirma defectos de código

Una revisión de diff en la cabina "vio" un bug (una variable sin declarar) que no
existía en el archivo real. La cabina puede sospechar; el defecto lo confirma el
taller leyendo el archivo en disco. Sospecha ≠ hallazgo.

### No asumir que un mecanismo existe porque la pregunta lo menciona

Un prompt de diagnóstico que dice "traza el mecanismo X" empuja a encontrar algo
parecido y describirlo como si fuera X. Los prompts preguntan primero **si**
existe; si no existe, se dice explícitamente en vez de describir lo más parecido.
(Así se descubrió que el follow-up automático nunca existió en ninguna versión.)

### PowerShell no es bash

`VAR=$(...)`, `&&` y `cd <placeholder>` fallan en PowerShell. `2>&1` sobre un
`fatal:` de git lanza NativeCommandError. Cada bloque abre con `Set-Location` a
la ruta real del repo. Los quirks completos de PowerShell 5.1 viven en el pack de
Cantu (misma máquina, misma shell) — no se duplican aquí; se consultan allá.

### `logs/` está gitignoreado

La evidencia cruda de los runs no viaja en git y no sobrevive a un sandbox
recreado. Lo que debe perdurar de un run vive en `records/` (narrativo) o se
persiste explícitamente. No prometer evidencia de logs viejos sin verificar que
existen.

### Scope débil (hasta que D-028 se implemente)

Hoy el `# Scope` de un objetivo solo se valida por no-vacío. Un scope en prosa o
con un typo pasa el pre-flight, quema una corrida del executor y vuelve como
`BLOCKED_SCOPE` falso — un dedazo disfrazado de bloqueo grave. Al escribir
objetivos: globs que matcheen archivos reales del repo objetivo, verificados
antes de encolar.

---

## Disciplina de proceso

```text
- UNA cosa a la vez, con puertas: verificar (read-only) → actuar → verificar → siguiente.
- Ritual de merge: base común por tres puntos → ensayo --no-commit --no-ff →
  tests verdes → borrar rama con -d (que se niega si algo no quedó mergeado).
- Los diagnósticos del taller son read-only, no sobrescriben reportes previos,
  y cierran con "lo que NO pude verificar".
- ESTADO.md se reescribe al cierre de sesión; DECISIONES.md es append-only.
- Un STOP del taller que revela una premisa falsa es VALIOSO. No empujar el
  encargo; corregir el encargo.
- Las decisiones nuevas se registran cuando se toman, no cuando se recuerdan.
```

## Categorías de run (D-029 / D-030)

Tres categorías, asignadas por el operador al crear el run, definidas por el
closeout:

```text
manual         = no toca AIW. Operador + Claude directo. El roadmap lo refleja.
semi-autónomo  = kernel hasta AI-approved → pushea su rama → PARA → human closeout.
autónomo       = kernel hasta AI-approved → pushea su rama → AI-completed → sigue.
                 La supervisión se DIFIERE y AGRUPA en auditoría humana posterior.
```

- **AI-completed ≠ completed pleno.** El completed definitivo lo pone la
  auditoría humana, no el run.
- **Batch→rama:** el operador agrupa runs en batches al encolar; el batch
  determina la rama (en el repo del proyecto). Guideline: misma rama = lo que se
  aprobaría o rechazaría junto.
- **El merge a main es siempre acto humano** (directo o vía auditoría). Nunca el
  run solo.
- Equivalencia con el pack de Cantu: manual ≈ Supervised, semi-autónomo ≈
  Semi-supervised, autónomo ≈ Delegable. **La normalización de vocabulario está
  PENDIENTE** — un solo nombre debe ganar en ambos documentos.

---

## Integración AIW ↔ Cantu (conciencia)

- **La puerta que manda es el run autónomo confiable**: arranque → AI-approved,
  repetible, sin detenerse a la mitad. Se mide corriéndolo, no leyendo docs.
- **Posición vigente (pack de Cantu, prevalece):** NO conectar AIW a Cantu hasta
  que el run autónomo sea confiable Y apunte al modo nocturno. Mientras, la
  metodología de batch a mano cura la fragmentación diurna sin riesgo. Al
  conectar: `main` de Cantu consolidado primero, Cantu registrado con push
  apagado.
- Solo `compiler-api` y `tools/roadmap` de Cantu tienen red de tests que el
  kernel pueda ejecutar; la superficie visual siempre requiere QA de operador.
- La consola es de AIW (D-023): un solo código que renderiza a todos los
  proyectos; cada repo de proyecto carga solo sus datos (`.aiw/roadmap/`). AIW
  mismo aparece en la consola como proyecto de runs manuales — el kernel jamás
  ejecuta sobre AIW (anti-auto-hosting), pero su estado sí se renderiza.

---

## No-claims vigentes

```text
NOT_NIGHT_CAPABLE            (no existe lanzador desacoplado; la cola muere con su terminal)
NOT_CONNECTED_TO_CANTU
SCOPE_CHECK_NOT_IMPLEMENTED  (D-028 decidido, no construido)
NOT_STRESSED_ON_LARGE_REPO   (lo aprobado hasta hoy fue sobre repos chicos)
NOT_GRADUATED                (criterios D-018 abiertos; noches desatendidas reales: cero)
```

No afirmar: que existe modo nocturno; que AIW está conectado a un proyecto real;
que el run autónomo es confiable bajo estrés; que algún criterio de graduación se
cumplió — sin verificarlo en el repo primero.

RESUELTOS el 2026-07-22 (ya NO son no-claims): respaldo remoto del v2
(verificado), y el `main` de Cantu consolidado — que era prerequisito declarado
para conectar AIW a Cantu. La puerta que sigue mandando es el RUN AUTÓNOMO
CONFIABLE, no la consolidación.
