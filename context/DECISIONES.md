# DECISIONES.md — log append-only. Nunca reescribir; solo agregar.

## D-001 — 2026-07-10 — Congelar AIW v1, construir kernel v2
AIW Core congelado en main (f2c122e4), read-only, como cantera. Se construye
AIW v2: kernel mínimo executor/reviewer apuntado a JAME. Razón: v1 divergió
(deuda descubierta > retirada; ~200 runs sin una noche autónoma).

## D-002 — 2026-07-10 — Repo-como-estado; retiro de context packs
El estado vive en el repo (ESTADO.md, DECISIONES.md). Los context packs
v1–v134 se congelan como historia y dejan de mantenerse.

## D-003 — 2026-07-10 — Taller / cabina
Claude Code = taller (repo, ejecución). Project de Claude.ai = cabina
(estrategia, decisiones). No mezclar. ChatGPT = auditor externo puntual.

## D-004 — 2026-07-10 — Supervisor v1 determinista
La supervisión post-veredicto es una tabla determinista; lo ambiguo va a
humano (fail-closed). Supervisor-LLM solo con incidente que lo justifique.

## D-005 — 2026-07-10 — Piso de severidad del reviewer
El reviewer solo bloquea por criterios declarados, tests o seguridad.
Todo lo demás son NOTAS y no generan trabajo. (CONSTITUCION.md §2.)

## D-006 — 2026-07-10 — aiw2 como repo independiente
ai_workflow_parallel es worktree vinculado del Core (.git puntero);
inutilizable como casa de v2. aiw2 nace con git init propio, historia
limpia. Parallel queda estacionado en aiw-parallel @ 8b73816c.

## D-007 — 2026-07-10 — Poda de prompts
De los prompts v1 (450/214 líneas) sobrevive lo conductual y el
vocabulario de veredictos; muere lo estructural (familias, contratos,
gates). Topes: executor ≤120, reviewer ≤80 con piso de severidad.

## D-008 — 2026-07-10 — ntfy reimplementado
No se importa el módulo v1 (acoplado a cycleNext/runComplete). notify()
de ~10 líneas, mismo topic, en fin-de-run y fin-de-cola.

## D-009 — 2026-07-10 — jame_snapshot como banco de pruebas
El kernel no corre contra el JAME real hasta nueva decisión. Se crea
aiw2\jame_snapshot: clon local de JAME_System_Dual (main @ 88eb722a),
sin remotes (origin eliminado tras el clon), push:false en config.json,
gitignorado en aiw2. El humano decide cuándo y cómo re-sincronizarlo.
Criterio de borrado: se elimina cuando el kernel se gradúe a correr contra
un checkout del JAME real con rama y remote propios.
(Nota: registrada en la sesión nocturna a partir del resumen de la Fase 1;
el texto íntegro del prompt de preparación no fue pegado — revisar redacción.)
(Addendum 2026-07-10: nota cerrada — revisada y ratificada por el humano + sesión de estrategia.)

## D-010 — 2026-07-10 — Autorización reencuadrada + guardia de árbol sucio
El prompt del executor deja de "prevalecer sobre" las reglas del proyecto:
el objetivo.md ES el ticket aprobado del pipeline (compatible con el
CLAUDE.md de JAME, "Claude ejecuta solo tickets aprobados"); las demás
reglas del repo siguen vigentes (sin commits del agente, sin certificar,
sin cerrar gates ni matrices). Se confirma como invariante la guardia de
árbol sucio: el kernel aborta si el repo objetivo tiene cambios sin
commitear y nunca estaciona con árbol sucio.
(Nota: registrada igual que D-009, reconstruida del resumen — revisar.)
(Addendum 2026-07-10: nota cerrada — revisada y ratificada por el humano + sesión de estrategia.)

## D-010-enmienda — 2026-07-10 — Clon aceptado en aiw2\jame_snapshot sin remote
Confirmado el check de identidad del punto 1 de esta sesión: jame_snapshot y
projects\JAME_System_Dual están ambos en main @ 88eb722a (sin drift). Se acepta
el clon local aiw2\jame_snapshot como banco de pruebas del kernel, sin remote.
Razones: sin drift de pull (no hay origin que diverja), desechable (se puede
reclonar), y projects\ queda prístino (nunca se muta en las sesiones de kernel).
El humano decide cuándo re-sincronizar o graduar el kernel al JAME real.

## D-011 — 2026-07-10 — Regex de secretos se queda conservador
La guardia de secretos mantiene su regex amplio. Los falsos positivos
(`.env.example`, nombres de código tipo `credentialFormatter.mjs`) se aceptan
como costo de fail-closed. NO se añade whitelist salvo incidente real en un run
productivo que lo justifique. (Cierra el hallazgo H2 de QUALIFICATION.md como
"aceptado", no "pendiente".)

## D-012 — 2026-07-10 — Pre-flight de baseline verde
Antes de crear la rama de trabajo (tras la guardia de árbol sucio, ya sobre la
rama base), el kernel corre la verificación del proyecto una vez. Si falla:
libera el lock y aborta exit 1 con "red baseline: human intervention required".
Incidente que lo justifica: 16 tests rojos por dependencias ausentes en
jame_snapshot habrían quemado el run supervisado en HUMAN_REVIEW, atribuyendo al
executor un fallo que no era suyo. Consecuencia de diseño: el sandbox ahora nace
con baseline verde (create-sandbox commitea `add` correcto + test que pasa) y su
objetivo es green->green (añadir `subtract`), porque un baseline rojo aborta
antes del executor. Criterio de borrado: si el costo por-run de la doble
verificación (pre-flight + post-executor) se vuelve prohibitivo.

## D-013 — 2026-07-10 — Normalización de idioma
Código, nombres de archivo/carpeta, estados, mensajes de log/error, mensajes de
commit y payloads de ntfy: 100% inglés. Los docs de gobernanza (CONSTITUCION.md,
DECISIONES.md, ESTADO.md, COSECHA.md, HISTORIA.md, CLAUDE.md) conservan su prosa
española y sus nombres actuales; QUALIFICATION.md y la evidencia archivada de la
calificación (objectives/qualification, objectives/queue-e7, objectives/processed)
se tratan como registros y conservan su español. La coordinación con el humano
sigue en español. El keyword de veredicto pasó de VEREDICTO: a VERDICT: (prompt
del reviewer + parser del kernel en sincronía).

## Doctrina H1 — 2026-07-10 — Guardias como segunda línea
Las guardias deterministas (alcance, secretos) son segunda línea de defensa; la
primera es el executor cooperativo autolimitándose. Las guardias existen para
cuando la primera falle (bug, inyección, versión futura menos cuidadosa), no
como mecanismo cotidiano. Su lógica está cubierta por tests/guards.test.mjs.

## D-014 — 2026-07-10 — Eliminada la entrada "jame" de config.json
Se elimina la entrada "jame" (projects\JAME_System_Dual, push:true) de
config.json; solo quedan jame_snapshot y sandbox. Razón: era un footgun — un typo
en "# Project" (p. ej. "jame" en vez de "jame_snapshot") habría corrido el kernel
contra el repo real CON push. El destino productivo se registrará deliberadamente
en la fase estratégica, no antes.

## D-015 — 2026-07-10 — JAME estacionado
Snapshot borrado (260 MB, sin ramas aiw/*, reproducible desde
projects\JAME_System_Dual); objetivos 001-003 movidos a objectives\parked\;
JAME vetado como target hasta roadmap listo + go explícito del humano.

## D-016 — 2026-07-10 — Nombres: AIW / AIW Legacy
Sistema nuevo = AIW (carpeta aiw\); v1 = AIW Legacy (carpeta ai_workflow en
disco, intacta). Factura del rename (§A.6): 13 referencias. Críticas de
ejecución: config.json ×2 corregidas; settings.local.json:32 NO editable (el
permission layer prohíbe editar ese archivo) — inocua porque la línea 31 ya
cubre las lecturas de aiw\; queda como fix manual del humano. Cosméticas
(const AIW2->AIW, strings de runtime, aiw2-sandbox) corregidas en kernel.mjs,
queue.mjs, create-sandbox.mjs. Registros históricos (DECISIONES, AUDITORIA,
QUALIFICATION, logs) conservan "aiw2".

## D-017 — 2026-07-10 — Consola = repo objetivo #1 de AIW
Forma: FORK de la consola de JAME (90-95% portable, cero deps) a repo
aiw-console + patrón proyector; el kernel no se toca.

## D-018 — 2026-07-10 — Criterios "AIW listo para JAME"
Cerrados: (1) ≥3 noches desatendidas contra repo real; (2) ≥2 diffs
mergeados sin reescritura; (3) consola v1 muestra runs/detalle/cola;
(4) roadmap JAME aterrizado + go del humano; (5) el humano enmienda a mano el
CLAUDE.md de JAME autorizando commits del kernel solo en ramas aiw/*;
(6) primeros objetivos JAME en compiler-api o test-first (editor-ui: cero tests).

## D-019 — 2026-07-10 — Rondas configurables
"# Max rounds" por objetivo, default 3, rango 1..10, fail-closed ante valor
inválido. Implementado en kernel.mjs (parseMaxRounds + loop) y
templates/objective.md; CONSTITUCION §5 y claude.md amendados en consecuencia.

## D-020 — 2026-07-10 — Doctrina de delegación
DELEGACION.md v1 en el repo; se refina con la práctica vía la escalera §4.

## D-021 — 2026-07-10 — Adoptar antes que construir
Ninguna capacidad nueva de AIW se construye sin revisar el ecosistema; se
construye solo lo diminuto o lo único-nuestro. Nunca construir: paralelismo
multi-agente, ejecución cloud, kanban genérico.

## D-022 — 2026-07-10 — Deuda del kernel cerrada antes de la primera noche
Fixes F1-F4 + suite de regresión. F1: lock por ruta REAL del repo (hash), no
por clave de config — dos entradas al mismo repo colisionan. F2: push
suprimido si apareció un secreto, gane el guard que gane (combo scope+secreto
incluido). F3: una tabla OUTCOMES = única fuente de exit codes (nada por match
de strings). F4: labels de queue.mjs = estados que el kernel emite (muerto el
fantasma CHANGES_REQUIRED; exit 2 y 4 -> HUMAN_REVIEW). Suite: 41 tests verdes
(node --test, sin llamada a claude en vivo): veredicto, supervisor, scope/
porcelain, secretos, preflight, checkpoint. La primera noche no corre sin esto
verde.

## D-023 — 2026-07-10 — Una consola multi-proyecto
Un solo código en aiw-console; el contrato es project_console.snapshot.json
versionado (schema_version); los datos viven en el repo de cada proyecto; la
consola no tiene estado propio (toda escritura aterriza como archivos en el
repo del proyecto afectado, versionados en git); modo local read-only por
proyecto; vista portfolio = la "consola general"; superficie de escritura
graduada: v1 = solo intake.

## D-024 — 2026-07-11 — Incidente de ventana muerta + hardening M1-M4
La ventana 06:04Z murió dentro del await del executor (terminal del queue
cerrado/interrumpido, INFERIDO); lock huérfano + executor claude huérfano
(shell:true+windowsHide lo desacopla de la consola). Evidencia y análisis:
logs/INCIDENT-2026-07-11.md. Hardening: M1 objetivo sandbox dentro de
sandbox/ (nunca en objectives/pending/); M2 queue archiva objetivos
tracked con git mv SIN auto-commit — el commit queda en el ritual humano
(el queue no escribe historia de aiw desatendido; un auto-commit añade
rutas de fallo propias); M3 heartbeat de etapas (stdout + STAGE.txt) +
handlers SIGINT/SIGTERM/SIGHUP/SIGBREAK que matan el subárbol de hijos y
liberan el lock; M4 execProc con string único (DEP0190). Regla operativa:
el terminal del queue se queda abierto e intocado durante la ventana.
Suite 49 tests; kernel 478/500 líneas.

## D-025 — 2026-07-11 — Reconciliación de consolas
La consola de JAME (original) y aiw-console (fork verbatim, `4f3ab11`) divergen
A PROPÓSITO durante la calificación: aiw-console avanza con el patrón proyector
(001-003b) mientras la consola JAME evoluciona por su lado. NO se reconcilia
incrementalmente. Se reconcilia UNA sola vez, en sesión ATENDIDA, en la Fase 4
(cuando JAME entra a AIW como objetivo real, D-018). Mientras tanto, cada
divergencia intencional en aiw-console se anota como miga en un
`CONSOLE_CHANGES.md` del lado JAME — que AÚN NO EXISTE; ratificar esta decisión
implica crearlo — para que la reconciliación sea un replay guiado, no
arqueología. Criterio de borrado: reconciliada en Fase 4, el breadcrumb pasa a
histórico.
**[SUPERADA 2026-07-23 por D-035]** — su condición de viabilidad expiró: el
`CONSOLE_CHANGES.md` nunca se creó y la divergencia medida hace inviable el
replay guiado. No se reconcilia; el fork se descarta.

## D-026 — 2026-07-11 — Doctrina test-de-consumidor
Todo objetivo que EMITA un artefacto para un consumidor EXISTENTE debe incluir
un test que asserte los requisitos exactos de ese consumidor, citados por
archivo+línea (su ruta de lectura, los campos que lee, las formas/enums que
espera). "Pasa mi propio schema" es insuficiente: el test debe cargar el
artefacto como lo carga el consumidor. Incidente que la justifica: 003 emitió
`roadmap.json` "conforme al lector" sin ejercitar el lector real → ruta y
contenido equivocados (`.aiw/views/roadmap.json` emitido vs
`.aiw/roadmap/roadmap.json` leído en `pc.js:11`; título/summary/estado
deshonestos), detectados solo en el ritual matinal → costó DOS tickets de
reparación (005 y 006). Se integra a los criterios de aceptación del reviewer.
Sin criterio de borrado (doctrina).

## D-027 — 2026-07-20 — Taxonomía de BLOCKED: blocked = human-only, sin follow-up automático
Diagnóstico verificado en disco del kernel v2 (`kernel.mjs`): exactamente TRES
eventos producen BLOCKED (exit 3): `BLOCKED_SCOPE` (guardia de alcance),
`BLOCKED_SECRETS` (guardia de secretos), y `VERDICT: BLOCKED` del reviewer. Todo
lo demás —timeouts, tests rojos, fallo del executor, rondas agotadas— va a
HUMAN_REVIEW y SÍ reintenta dentro del loop de rondas. Decisión: **BLOCKED es
parada para el humano (human decision), no se construye recuperación automática.**
El "follow-up automático" NO existe en v2 (el kernel escribe un borrador
`logs/<id>/proposed_followup.md` en un directorio gitignoreado y para; nada lo
lee, la cola solo mira `objectives/pending/`) y NO se construye. Racional: el
over-blocking de v1 (28-50% de runs eran reparaciones) fue un problema de
CLASIFICACIÓN, no de recuperación — un ticket mal formado se bloqueaba en vez de
rechazarse en pre-flight. El follow-up automático de v1 fue un parche a ese
síntoma (y de hecho su router de 8 rutas nunca se cableó al flujo, COSECHA §2).
Con la clasificación correcta (dedazos → pre-flight, corregibles → CHANGES_REQUIRED
en rondas, solo lo grave → BLOCKED), el volumen de blocked es bajo y la
intervención humana deja de ser carga: significa "esto es lo bastante serio para
que lo veas tú" (seguridad, secreto real, alcance genuinamente violado, criterio
imposible). Sin criterio de borrado (doctrina de clasificación).

## D-028 — 2026-07-20 — Pre-flight de scope debe exigir match real (fuga a cerrar)
Fuga verificada en disco: el `# Scope` de un objetivo solo se valida por
NO-VACÍO (`kernel.mjs:152`). Un scope en prosa o con un typo pasa el pre-flight,
quema una corrida completa del executor, y vuelve como `BLOCKED_SCOPE` con
`break rounds` inmediato (sin rondas de corrección) — un dedazo disfrazado de
blocked grave, exactamente el patrón de v1 que D-027 busca eliminar. Los dos
únicos blocks observados en la calificación (E4, E5b) fueron por causas menores,
no graves. Decisión: **añadir un check de pre-flight — "el scope debe apuntar a
al menos un archivo/glob que matchee un archivo real del repo objetivo"** — que
rechace el ticket ANTES de invocar al executor (aborta como rechazo de entrada,
no como BLOCKED). Mueve la fuga de "blocked aguas abajo" a "rechazo de entrada
aguas arriba", donde pertenece. Nota: esto es una decisión + un objetivo de
implementación pendiente (pequeño, con test). Es la mejor inversión de
complejidad para hacer confiable el run autónomo. Criterio de borrado: N/A
(endurece un invariante; se mantiene).

## D-029 — 2026-07-20 — Tres categorías de run por closeout (manual / semi-autónomo / autónomo)
El eje de clasificación de un run NO es "cuánta supervisión siento" sino "qué pasa
en el cierre". Tres categorías, asignadas POR EL HUMANO al crear el run (guidelines,
no reglas rígidas que el sistema interprete):
- **Manual:** no toca AIW. Trabajo de altísima intervención (prototipos visuales,
  el primer template de un componente) hecho por el humano con Claude directamente.
  El roadmap lo refleja como run para que el estado quede normalizado, pero su
  "ejecutor" es el humano, no el kernel.
- **Semi-autónomo:** AIW corre solo hasta AI-approved, commitea y pushea su rama
  `aiw/<id>` en el repo del proyecto (safepoint), y PARA. El humano revisa y emite
  el human-approved (o changes-required). El cierre oficial es humano.
- **Autónomo:** AIW corre solo hasta AI-approved, pushea su rama, se marca
  **AI-completed** (NO "completed" pleno) y sigue con el siguiente. La supervisión
  no desaparece: se DIFIERE y AGRUPA en una auditoría humana posterior (ver D-030).
Matiz clave: **"AI-completed" ≠ "completed" pleno.** La aprobación del reviewer no
es aprobación humana (CONSTITUCION §1); el run autónomo cierra su propia fase
(AI-completed, rama pusheada) pero el "completed" definitivo lo pone la auditoría
humana, no el run. La guideline de clasificación (criterio del humano, no regla del
sistema): trabajo de bajo riesgo y reversible (p.ej. documentar) puede ser autónomo;
lo que exige juicio visual o toca superficie sensible va semi o manual. Cuando surja
un tipo de run no anticipado, se decide su categoría en el momento. Sin criterio de
borrado (modelo de ejecución).

## D-030 — 2026-07-20 — Modelo batch→rama y merge a main humano
Complementa D-029. Cada run pertenece a un **batch** que el humano define al
encolar, y el batch determina la rama (en el repo del proyecto) donde se apilan sus
runs. La rama es un PARÁMETRO del batch, no una propiedad derivada del tipo de run:
al armar la cola, el humano dice "estos runs a la rama A, estos a la B". El sistema
solo obedece la etiqueta; la inteligencia de agrupación es humana. Guideline (criterio
del humano): **agrupar en la misma rama lo que se aprobaría o rechazaría junto**
(comparten destino y corrección); separar lo que se querría tratar distinto. Reglas
firmes:
- AIW commitea y pushea SIEMPRE sobre el repo del PROYECTO (rama `aiw/<id>` o rama de
  batch), NUNCA sobre el repo de AIW. AIW no deja registro de avances de otros
  proyectos dentro de sí; solo se auto-commitea si se modifica el código de AIW.
- El merge de la rama a `main` del proyecto es SIEMPRE acto humano: semi-autónomo →
  human-approved; autónomo → auditoría agrupada. NUNCA el run mergea a main solo.
Racional de "por qué rama y no main directo": (1) reversión limpia — un run malo se
descarta tirando su rama, sin cirugía sobre main; (2) main = "lo revisado", frontera
de confianza entre lo auditado y lo no auditado; (3) la auditoría agrupada necesita
la rama como unidad concreta que revisar; (4) protección contra runs interrumpidos —
si un run muere a media ejecución (incidente ventana muerta, D-024), su rama queda a
medias pero main sigue limpio y el siguiente run arranca sin árbol sucio. La auditoría
agrupada se apoya en la consola LOCAL del proyecto (que vive en el repo); la consola
maestra multi-proyecto (D-023) es conveniencia de operador, no requisito de este flujo.
Sin criterio de borrado (modelo de ejecución).

## D-031 — 2026-07-22 — Workspace único AIW_Workspace: sistema vs portafolio
Rediseño de disco aprobado por el operador. UN solo workspace: `AIW_Workspace`
(carpeta nueva; los viejos `AI_Workflow_Workspace` y `JAME_Parallel_Workspace`
se demuelen al vaciarse, verificados vacíos). Regla estructural: el nivel raíz
contiene solo el SISTEMA (`aiw\` — lo único que el kernel jamás ejecuta;
anti-auto-hosting hecho carpeta); `projects\` contiene el PORTAFOLIO (todo lo
ejecutable por el kernel): `aiw-console`, `cantu-studio` (hoy JAME_System_Dual),
`cantu-lessons` (hoy JAME_Lessons), y los futuros (tutor-cantu, dc-studio, el
proyecto del PhD, etc.). Renames aprobados: el Legacy v1 → `aiw-v1-legacy` en
GitHub, ARCHIVADO (read-only) y SIN copia local (antes de borrar: verificar
todas las ramas en origin, sin stashes ni untracked, worktree paralelo
removido); JAME_System_Dual → cantu-studio y JAME_Lessons → cantu-lessons
(trabajo lado Cantu: candado de migración física levantado por el operador y
registrado allá, Lessons añadida al alcance como enmienda, un run por repo con
Phase 0 + QA de operador, rutas de lecciones actualizadas dentro de
cantu-studio). El checkout monitoreado viejo (`projects\JAME_System_Dual`,
patrón v1) se retira con enmienda a AGENTS.md. La consola conserva el nombre
`aiw-console` (D-023: la consola es de AIW; evita colisión con la Project
Console local de Cantu durante la paridad). Puerta dura de toda la migración:
NADA se mueve ni se borra sin respaldo remoto verificado (push exitoso
confirmado en terminal). Ejecución incremental, un paso a la vez, con el plan
vivo en O1 del roadmap. Criterio de borrado: N/A (define la topología del
disco; la sustituye una decisión futura, no el tiempo).


## D-032 — 2026-07-22 — Respaldo de refugio antes de retirar el Legacy; el Legacy NO es "cantera congelada"
Al preparar el retiro del Legacy (`ai_workflow`) se halló trabajo no-commiteado
que solo vivía en un disco: 4 stashes y 2 ramas backup solo-local. La inspección
reveló que NO era WIP desechable — dos de los stashes eran RUNS DE AIW COMPLETOS
con evidencia (R34R1R1-NSFC-OL ~13k líneas; SAFETY-BLOCKER-AUTONOMY-PROFILES
~7.7k líneas, con tests y doc), más features del CLI. Decisión: respaldo de
refugio ANTES de tocar nada — cada stash convertido a rama `refuge/*`
(`git stash branch` + commit) y empujado a origin; la rama backup con commit
único (`5490a310`) también subida; la backup redundante (sin commits únicos) se
descarta al retirar. ~21k líneas aseguradas en GitHub. HALLAZGO que reencuadra el
plan: el árbol del Legacy contiene runs de junio-2026 y desarrollo reciente del
CLI, lo que CONTRADICE la afirmación del pack de que es "cantera congelada v1
extraída". Por doctrina papel≠disco, esto NO se resuelve de memoria: el retiro
del Legacy queda CONGELADO hasta un diagnóstico de IDENTIDAD read-only por Claude
Code (qué es el árbol, qué relación tiene con el v2, qué stashes necesita el v2).
Nada del Legacy se borra ni archiva hasta ese diagnóstico. Criterio de borrado:
N/A (regla permanente de proceso para retiros que involucren trabajo no-commiteado).

## D-033 — 2026-07-22 — Limpieza del cascarón viejo: historial del workaround manual del Legacy se descarta
El workspace viejo `AI_Workflow_Workspace` acumulaba artefactos sueltos fuera de
git: `_manual_prompts` (437 MB), `_operator_requests`, `_local_tool_backups`,
`_local_tool_logs`, `_tmp`, `.claude`, un baseline suelto. El operador confirmó
que `_manual_prompts` (y por extensión `_operator_requests`/`_local_tool_backups`)
son el HISTORIAL del workaround manual del Legacy: prompts y correcciones hechos a
mano sobre AIW para NO usar runs que trabajaran sobre sí mismo (el problema de
auto-hosting que el v2 resolvió por diseño con la regla anti-auto-hosting). Es la
bitácora de un método OBSOLETO desde que nació el v2 — ruido histórico, no trabajo
que el sistema actual necesite, y todo fuera de git (borrarlo no toca la historia
del Legacy). Decisión: descartar. PRESERVADOS en `AIW_Workspace\_reference\`: los
dos diagnósticos verificados-en-disco del 20-jul (`DIAGNOSTICO-AIW-V2-CANTU.md`,
`DIAGNOSTICO-BLOCKED-TAXONOMIA.md`) — insumo del diagnóstico de identidad del
Legacy (D-032). El backup #1 de Cantu (`_git_backups`, 88 KB, trabajo de Details
revertido a propósito el 25-jun) también se descartó por decisión del operador:
es un draft de un run `planned` de Cantu que se reconstruiría fresco si se retoma,
y conservarlo generaba más ruido que valor. Regla derivada: los artefactos de
trabajo del sistema viven DENTRO del repo del proyecto (repo-como-estado); lo que
quedó suelto en la raíz de un workspace es scratch, se clasifica y se descarta o
se reubica, nunca se demuele a ciegas.

## D-034 — 2026-07-22 — Consola primero; 3 proyectos en paralelo DESPUÉS; el repo como contexto
Con la migración cerrada, el operador definió el orden de trabajo. **La consola
maestra va PRIMERO**, antes de trabajar los tres repos (aiw, aiw-console,
cantu-studio) en paralelo. Razón registrada: la consola no es solo "orden de
trabajo", es la CONDICIÓN que hace seguro el paralelismo — sin ella, cada
conversación depende de packs y roadmaps pegados a mano, y tres conversaciones
producen tres verdades divergentes. Definición acotada de **"consola estable"**
(para no gold-platear): renderiza los tres proyectos, leyendo de sus propios
repos, roadmap + docs + status, READ-ONLY. Edición desde la consola, UX y
features nuevas vienen después y ya pueden ir en paralelo. Secuencia interna:
(1) audit/Phase 0 read-only → mapa; (2) contrato de normalización (qué expone un
proyecto y dónde) — que es TAMBIÉN donde se resuelve el desorden de contextos de
AIW, porque define qué es canónico vs derivado vs histórico; (3) los tres
roadmaps al contrato (AIW markdown→JSON v3; migrar los runs
`RUN-CANTU-PROJECT-CONSOLE-*` del roadmap de Cantu al de la consola, respetando
que los `run_id` son identidad inmutable y que `queue_order` es global y contiguo
→ obliga a renumerar con tabla de remap); (4) la consola los lee.
**Metodología de paralelismo (gated por lo anterior):** UNA sola Project de
Claude con tres conversaciones abiertas, NO tres Projects — porque la frontera
entre proyectos es gobernanza que la cabina necesita ver (AIW ejecuta sobre
Cantu, la consola renderiza a ambos). Reparto de responsabilidades: **los packs
cargan reglas; la consola y el repo cargan estado.**
**Contexto de la cabina:** el repo `aiw` se sincroniza como knowledge del
proyecto Claude, de modo que la cabina lee el repo real en vez de recibir
pegados. Se evaluaron y descartaron dos alternativas: el conector MCP de GitHub
(las herramientas no aparecen en una conversación ya iniciada; queda como opción
a probar en conversación nueva) y publicar un repo con digests (se descartó por
no querer publicar estado; además es una puerta de un solo sentido). Disciplina
permanente asociada: **push → sync**; si el operador no confirma el sync, lo
leído del knowledge es `[NO VERIFICADO]` y la cabina lo dice. El conector y el
digest quedan como optimizaciones, no como prerequisitos.
El pack de la consola llevará REGLAS, no el plan: el plan es estado y vive en el
roadmap. Criterio de borrado: N/A (define el orden de trabajo; la sustituye una
decisión futura).

## D-035 — 2026-07-23 — Fork de la consola descartado como base de UI; el proyector sobrevive (reemplaza D-025)
El audit Phase 0 de O4 (`records/AUDIT-CONSOLE-O4-PHASE0.md`, commit `dc76b49`)
midió en disco la divergencia entre la consola de `cantu-studio` y el fork de
`aiw-console`, y el resultado invalida el plan de reconciliación de D-025.
**Hechos medidos:** el fork es una foto ANTERIOR al retiro del roadmap legacy
v1/v2 — su frontend aún lista `objectives.jsonl`/`phases.jsonl`/`runs.jsonl`/
`queue.json`/`roadmap_v2.json` en su tabla de rutas (`CON-PCJS:6-10`) que Cantu
ya borró y documentó (`CANTU-PCJS:6-8`); frontend +1737 líneas del lado Cantu,
validador +1043 del lado del fork (más grande = más viejo: aún valida el modelo
legacy, `CON-VALID:181-185`); el fork no tiene el endpoint de edición de roadmap.
El `CONSOLE_CHANGES.md` de migas que D-025 exigía **nunca se creó**, así que la
reconciliación de Fase 4 sería arqueología — exactamente lo que D-025 quería
evitar. Además el `package.json` del fork se sigue autodescribiendo como
"verbatim fork of the JAME project console" (`aiw-console/package.json:6`), lo
cual es **falso respecto a los bytes** y debe corregirse.
**Decisión:** el fork **se descarta como base de UI**. La base de la consola
global es la consola VIVA de `cantu-studio` (la avanzada, post-retiro de legacy),
portada limpia. **Sobrevive el proyector** `tools/projector/project.mjs`, que el
audit midió como la ÚNICA pieza identidad-neutral de todo el toolchain: no hornea
`JAME`, ni `Cantu`, ni ids de run o rama; deriva el `project_id` genéricamente
(`CON-PROJ:391-399`). El proyector es la semilla de la capa de datos de la
consola global.
**Consecuencias registradas:** (a) el validador divergente de 3087 líneas del
fork deja de ser algo que reparar — es residuo, y el audit probó que no pasa
contra los propios datos de `aiw-console` (exige ~15 archivos `.aiw/**` que ese
repo no tiene, C.6); (b) los anchors que hay que respetar son los de Cantu, no
los del fork; (c) la pantalla de portafolio no arrastra anchors: el substring
`portfolio` no existe en ningún fuente de consola de ningún repo, o sea que es
construcción NUEVA; (d) los archivos del fork se quedan en disco hasta el corte
(retiro de la consola de Cantu), y se borran ahí — borrarlos antes no desbloquea
nada y arriesga tumbar algo que el proyector use.
**NO decidido aquí (queda abierto):** si el validador de la consola viaja o no a
la consola global (bifurcación F.1 del audit). Se decide con evidencia propia.
Criterio de borrado: N/A (reemplaza a D-025; la sustituye una decisión futura).

## D-036 — 2026-07-23 — La carpeta de contrato se crea ADITIVA; `.aiw` se conserva hasta el corte
Al diseñar la normalización de datos que la consola global consumirá, el operador
descartó renombrar `.aiw` en `cantu-studio`. **Se crea una carpeta NUEVA y ahí se
migran los datos, dejando intacto todo lo que está en `.aiw`.** Solo cuando la
consola lea correctamente de la carpeta nueva, esté estable, y haya absorbido
todo el diseño que le falta de la consola de Cantu, es seguro borrar `.aiw`.
**Por qué es la forma correcta, verificado en el audit:** el validador de Cantu
**no referencia ninguna ruta fuera de las que enumera**, así que una carpeta
nueva es INVISIBLE para él y no dispara ningún check (audit C.4). Renombrar
`.aiw` en cambio lo habría puesto rojo — es cirugía sobre la autoridad del repo,
y esta decisión la saca de la ruta crítica y la mueve al final, donde pertenece.
El costo del corte quedó MEDIDO: el día que `.aiw` se borre se ponen en rojo
exactamente 10 rutas (las que el validador lee en `CANTU-VALID:153-166`), más los
checks de contenido que penden de ellas.
**Riesgo asumido y su mitigación:** dos copias del mismo estado derivan. Como la
convivencia es una ventana corta (solo dura la migración), no se construye
mecanismo de sincronización: **durante la ventana, el roadmap de Cantu no se
edita.** Si hay que editarlo, se edita el canónico y se regenera la copia.
**Nombre de la carpeta: PENDIENTE, deliberadamente.** `.aiw` incomoda porque la
carpeta no es "de AIW" (ahí viven roadmap, docs, status y runs; varios
consumidores la leen); `.console` sería igual de equivocado por simetría. El
nombre se decide en el contrato de normalización. Regla operativa mientras tanto:
**en la consola, la ruta base es UNA constante en UN archivo**, para que el
rename cueste una línea.
Criterio de borrado: se cierra cuando `.aiw` se borre en el corte.

## D-037 — 2026-07-23 — El contexto de cabina se muda a aiw-console (enmienda el mecanismo de D-034)
D-034 registró que el repo `aiw` se sincronizaría como knowledge del Project de
Claude. **Esa premisa era falsa:** solo `aiw-console` resultó sincronizable. El
mecanismo se reemplaza sin cambiar el propósito.
**Decisión:** el contexto de gobernanza se **MUDA** (no se copia) a
`aiw-console/context/`, con estructura simétrica por proyecto: `context/aiw/`,
`context/cantu-studio/`, y `context/aiw-console/` cuando exista. El operador
descartó explícitamente el espejo con manifest: sin copia no hay deriva.
**Ejecutado y verificado:** 7 archivos mudados desde `aiw` con hash SHA-256
comprobado antes de borrar el origen (`DECISIONES.md`, `ESTADO.md`,
`AIW_CONTEXT.md`, `roadmap_AIW_temp.md`, `DELEGACION.md`, y los dos records de
O4); puntero `aiw/CONTEXTO.md` creado; rutas actualizadas en `claude.md` y
`CONSTITUCION.md`; prosa de registros históricos NO tocada. Commits `48c427b`
(aiw) y `a229785`/`fbbae21` (aiw-console).
**`CANTU_STUDIO_CONTEXT.md` adoptado:** se verificó que **no existía en ningún
repo** — vivía solo como adjunto del Project, huérfano y sin forma de
verificarlo. Se adopta como canónico en `context/cantu-studio/`.
**Lo que NO se muda, por dos razones independientes:** `CLAUDE.md`, `AGENTS.md` y
`CONSTITUCION.md` son reglas que el agente lee del repo donde trabaja; y en
`cantu-studio` además están listados en `.aiw/docs/docs_index.json`, cuyo
validador exige su existencia física (medido: `AGENTS.md`, `CLAUDE.md` y
`README.md` están en `docs[]`; solo `README_PHASE1.md` queda fuera).
**Acoplamiento nuevo, declarado:** `aiw/claude.md` y `aiw/CONSTITUCION.md` ahora
referencian `../projects/aiw-console/context/aiw/…` — una ruta relativa que SALE
del repo. Funciona dentro del workspace; si alguien clona `aiw` solo, esas
referencias apuntan al vacío. Se acepta a sabiendas.
**Disciplina que reemplaza a la de D-034:** el ciclo ya no es "push → sync" sino
**"editar contexto en `aiw-console` → commit → push → sync"**. Un cierre de
sesión toca DOS repos: `aiw` para código, `aiw-console` para contexto. Prohibido
subir archivos sueltos al knowledge del Project: crean una segunda copia que
deriva (ocurrió con `roadmap_AIW_temp.md`, que llegó a contradecir al del repo
sobre el estado del merge de 005).
**Pendientes derivados:** (a) corregir el párrafo de `context/README.md` que dice
que `cantu-studio` no tiene carpeta — ya la tiene; (b) reconciliar
`CANTU_STUDIO_CONTEXT.md` contra la topología nueva: apunta a
`AI_Workflow_Workspace`, workspace retirado en D-031, y probablemente tenga más
rutas viejas; (c) escribir `context/aiw-console/` al cerrar el tramo 1 de O4,
cuando el contrato le dé forma a la identidad de la consola.
Criterio de borrado: N/A (define dónde vive el contexto; la sustituye una
decisión futura).



## D-038 — 2026-07-23 — Taxonomía del contexto: permanente vs efímero; DECISIONES es del sistema
Al preguntar el operador por qué el handoff de O4 vivía en `context/aiw/records/`,
se destaparon tres errores de modelado con una raíz común: **`aiw` nombra dos
cosas** — el SISTEMA (nivel raíz del workspace, D-031) y el kernel como proyecto —
y lo transversal se estaba archivando como si fuera del kernel.
**1. Handoff ≠ record.** Un record (audit, diagnóstico) mide un estado real con
evidencia citada y sigue valiendo como prueba: es **permanente**. Un handoff es
empaquetado de conveniencia para cruzar una frontera de sesión: es **efímero** y
muere al ser leído. Guardarlos juntos convertía estado que se pudre en contexto
canónico. Decisión: los handoffs salen de las carpetas de proyecto y pasan a
`context/handoffs/`, **uno por hilo de conversación, siempre sobrescrito**
(`orquestacion.md`, `aiw.md`, `aiw-console.md`, `cantu-studio.md`). Sin sufijos de
tramo ni fecha: solo hay uno, así que nunca hay ambigüedad sobre cuál es el
vigente. Git conserva las versiones anteriores. Esto es además lo que hace
operable el modelo de conversaciones simultáneas de D-034: cada hilo tiene un
archivo obvio que leer al abrir y que reescribir al cerrar. Se nombra un cuarto
hilo que no tenía casa: **orquestación general** (topología, metodología,
decisiones de sistema) — es el hilo en el que se tomó esta decisión.
**2. `DECISIONES.md` es el log del SISTEMA, no de AIW.** Su contenido reciente es
transversal (D-031 topología, D-033 limpieza, D-035 el fork, D-036 la carpeta de
Cantu, D-037 la mudanza) y casi nada es del kernel. Sube a `context/DECISIONES.md`.
Rutas actualizadas en `aiw/claude.md` y `aiw/CONSTITUCION.md`.
**3. El audit de O4 pertenece a la consola.** Midió el código de la consola, no del
kernel. Va a `context/aiw-console/records/`, que es también el nacimiento de esa
carpeta (pendiente (c) de D-037, cerrado).
**Regla que ordena todo:** contexto de proyecto es permanente y va en la carpeta
del proyecto; relevo de sesión es efímero y va en `handoffs/`. Ante la duda:
¿seguirá siendo cierto dentro de un mes?
**Anomalía declarada, con fecha de caducidad:** O4 vive en el roadmap de AIW
porque la consola aún no tiene roadmap propio — el propio roadmap lo dice
("migrará a su propio roadmap cuando nazca"). El handoff quedó ahí por herencia,
no por diseño. Esa migración es trabajo del tramo 1, junto con la migración de O0
desde el roadmap de Cantu (D-034).
**Pendiente (a) de D-037 cerrado:** el `README.md` de `context/` se reescribió con
esta taxonomía y ya no afirma que `cantu-studio` carece de carpeta.
Criterio de borrado: N/A (define cómo se organiza el contexto).

## D-039 — 2026-07-23 — Contrato de la carpeta, capa 1: familia v1, `.project/`, frescura
Tramo 1 de O4. El contrato queda escrito en `context/aiw-console/CONTRATO.md` y
**supersede a `docs/snapshot-schema-v1.md` como norma**; ese documento pasa a valer
como evidencia de lo que el proyector emite hoy. Vive en la carpeta de la consola
porque el contrato lo cumplen todos los proyectos pero lo define y lo consume la
consola: la norma la escribe quien lee.
**Familia de schema: v1 del proyector.** Se descarta la v0.3 de Cantu, y el motivo
no es estético. La v0.3 no es un formato *emitido*: es un artefacto **escrito a
mano** que se pudrió. Adoptarla habría comprometido al sistema a mantener a mano
exactamente lo que nadie mantuvo. La v1 tiene emisor real
(`tools/projector/project.mjs`) y es identidad-neutral — el audit la midió como la
única pieza del toolchain que no hornea `JAME`, `Cantu`, ni ids de run o rama.
**Corolario:** el proyector pasa a emitir también el snapshot de Cantu, con lo que
la podredumbre se arregla como efecto lateral en vez de como ticket propio.
**Nombre de la carpeta: `.project/`.** Cierra el pendiente que D-036 dejó abierto
a propósito; **no lo enmienda**. El criterio que decide: `.aiw` nombra al emisor y
un nombre tomado de la consola nombraría al consumidor — ninguno de los dos nombra
el **contenido**, que es lo único que no cambia. Que hoy lea esa carpeta una
consola es circunstancial. La vaguedad de `.project/` no es defecto sino el
requisito: debe servir a cualquier proyecto y a cualquier consumidor. D-036 ya
había anticipado el error de simetría (`:447`) y tenía razón. **`.project/`
reemplaza también al nivel `views/`**: la carpeta entera es derivada, así que
`views/` ya no distingue nada. Se conserva la regla operativa de D-036 (`:448-450`)
—la ruta base como UNA constante en UN archivo— pero con justificación nueva: ya no
por provisionalidad (el nombre está decidido) sino como disciplina permanente
contra el acoplamiento que el audit midió (15 literales `../../.aiw/…` horneados en
`CANTU-PCJS:1-27`, más el prefijo repetido en server, builder y validador).
**Frescura.** `generated_at` pasa a **REQUERIDA** — no es clave nueva: ya existe en
v1 (`snapshot-schema-v1.md:20`) y el proyector la emite (`CON-PROJ:274,444`); lo que
cambia es que deja de ser presente-de-hecho para ser exigida-de-derecho. `sources`
es la **única clave nueva**, con `{path, mtime}` por fuente leída. Se elige `mtime`
sobre hash de contenido **por modo-de-fallo**: un checkout de git resetea mtimes
hacia adelante, así que su error es "stale cuando está fresco" — falla **ruidoso,
nunca silencioso**, y el fallo que este contrato existe para impedir es el
silencioso. Revisión a hash si aparece un falso positivo real en operación, no por
hipótesis. **`generated_from` NO se renombra:** v1 ya cumple el requisito emitiendo
`aiw-projector@0.1.0` (`CON-PROJ:30-31`); renombrarla habría sido churn.
**Provenance de Cantu — triple fallo medido en disco.** El snapshot de Cantu falla
en las tres a la vez: `generated_from_run` lleva un run_id (un run es un evento, no
una herramienta, y no se lo puede volver a correr); `generated_from` está ocupado
por una cadena que no nombra herramienta ni versión; y `generated_at` está
**ausente por completo**. Ese tercero es el portante: sin fecha de emisión, su
staleness **no es detectable ni en principio**, porque no hay contra qué comparar
ningún `mtime`. Medido aparte con `stat`: el snapshot lleva **21.57 días** sin
tocarse mientras el roadmap que dice describir se tocó hoy — cifra que solo se pudo
obtener desde fuera del artefacto, que es el argumento entero. Su `run_queue_ref`
apunta además a un archivo que no existe en disco.
**`no_claims_summary` y `validation_summary` quedan OPACOS** — tipo objeto,
contenido sin especificar, pass-through. Su única evidencia es `{}` en los dos
snapshots que el proyector emite. Especificar un schema sin emisor y sin un solo
ejemplo **es exactamente cómo nació la v0.3**; fijar su forma ahora repetiría, con
la misma mecánica, el error que este tramo existe para corregir. Se decide en el
tramo donde algo real las llene. `taxonomy_model` no queda opaco: tiene contenido,
es idéntico en ambos archivos y es candidato a la capa 2.
**D-026 no aplica en el tramo 1** — por su propio texto, que la condiciona a un
consumidor **EXISTENTE** (`:198`). Ningún lector en disco lee la ruta nueva: los dos
que hay fetchan el literal `../../.aiw/views/project_console.snapshot.json`
(`CANTU-PCJS:2` required en `:5559`; `CON-PCJS:2` en `:3806`). Tampoco se emite copia
de entrega en la ruta vieja: del lado de `aiw-console` el único lector pertenece al
fork descartado por D-035, y del lado de Cantu la copia pisaría el único archivo
requerido de la consola viva, contra la premisa aditiva de D-036. **D-026 se activa
en el tramo 3**, contra el shell multi-proyecto, y el apartado que la exime lleva
caducidad explícita escrita en el contrato.
Criterio de borrado: N/A — lo sustituye una revisión futura del contrato.

## D-040 — 2026-07-23 — Contrato de la carpeta, capas 2 y 3: el roadmap; los opcionales y su degradación

Cierra la redacción del contrato inicial de `.project/` (la capa 1 es D-039). Una
sola entrada para las dos capas.

**Capa 2 — el roadmap (`roadmap_tree`).** Dos vocabularios de status DISTINTOS, y
la diferencia es deliberada: el run almacena cuatro tokens (`planned · active ·
blocked · completed`; `blocked` se declara aunque 0/65 lo instancien — declarado y
vacío es honesto, quitarlo obligaría a re-agregarlo) y el objetivo deriva cinco
(`planned · in_progress · active · blocked · completed`). No se reusan tokens
porque miden cosas distintas: un run `active` corre AHORA; un objetivo puede
llevar meses empezado sin que nada corra — reusar `active` habría metido dos
significados bajo una palabra, la misma colisión de ejes que ya existe entre el
modelo plano y el v3 (`active`/`blocked` califican allá al proyecto y acá al run).
La función de derivación es NORMATIVA y NO ALMACENADA, con precedencia estricta de
cinco ramas (`active` > `blocked` > `completed`-todos > `in_progress` >
`planned`): almacenar el derivado sería la segunda copia que se pudre; no
especificarla dejaría a cada consumidor derivar a su gusto y dos consolas
mostrarían dos verdades — probado con datos, la regla vieja y la nueva difieren
exactamente en O5 (2/7 completados: `planned` contra `in_progress`). Objetivo o
fase con 0 runs = **MALFORMADO, sin token**: `[].every() === true` declararía
terminado lo que nunca existió. El roadmap bajo `.project/` se identifica
**`roadmap_tree_v1`** — nombra el contenido, no a JAME ni al emisor — y el
`schema_version` del roadmap de `.aiw` queda INTACTO hasta el corte, porque el
validador exige la cadena exacta (`CANTU-VALID:963`) y tocarla contradiría D-036.
`closeout_result` queda string sin enum (en disco: 8 constantes y 1 párrafo de
prosa; enumerar eso sería inventar schema) y opcional aun en `completed` (11
completados, solo 9 con closeout). `progress` se documenta y NO se congela (1/65:
caso único, no norma). `category` (D-029) y `batch` (D-030) quedan RESERVADOS como
claves opcionales de run, ausentes por defecto, sin tipo fijado: la medición
devolvió ausencia explícita — nada que reciclar, nada con qué chocar; nombrar hoy
es gratis y agregar después son tres repos. `taxonomy_model` es FUNCIÓN del modelo
transportado en `roadmap_tree`, no constante del contrato — y eso es norma, no
descripción del emisor actual: si el proyector lo tiene horneado (hipótesis
[NO VERIFICADO]), adecuarlo es trabajo del tramo 2.

**Capa 3 — los opcionales y su degradación.** `.project/` es derivada, así que
**sin emisor no se entra**: los 12 de 15 archivos del contrato de Cantu que se
mantienen a mano (`project.json`, `state/*`, `ledgers/*`, `guardrails/*`,
`docs/*` — audit F.2) se quedan en `.aiw` hasta tener emisor, y entran por la
puerta normal (ruta nombrada por contenido, opcional por defecto, degradación
declarada al entrar). Hoy entran dos: `.project/roadmap.json` y
`.project/git_history.json`, ambos OPCIONALES; el conjunto requerido sigue siendo
uno. La ausencia de un no-requerido NUNCA rompe al consumidor, y **la degradación
se anuncia por archivo ausente, en la superficie afectada — no en agregado**: el
banner único medido en la consola de Cantu ("Some optional local state files
could not be loaded…", `CANTU-PCJS:4320-4325`) no dice qué falta y esconde el
detalle en otro panel; eso no basta — renderizar vacío sin anunciar es afirmar
que el dato no existe. Es requisito sobre el shell del tramo 3, no sobre el
emisor. `closeout_result ⇒ completed` entra como ADVERTENCIA del validador, nunca
requisito duro: regularidad observada de 9 ejemplares, no invariante de diseño, y
este par de campos ya probó que endurecerlo pone rojos 2 runs legítimos.

**ERRATA sobre `MEDICION-ROADMAP-V3.md`.** Su glosa de `current_stage`
(`MEDICION:306-307`) leyó la leyenda del audit al revés: **P significa prohibido,
no presunto** (`AUDIT:417-418`). El validador PROHÍBE leer `run.current_stage`
(`CANTU-VALID:1387`, `:1408`, `:1426`) mientras EXIGE la celda "Current stage"
(`:1421`, `:1166`), que se deriva de `progress` — presente en 1/65 runs. La
sustancia del hallazgo (el lector espera un campo que el v3 nunca almacenó) queda
en pie. El record NO se reescribe; la precisión vive en el Anexo B.1 del contrato
y queda registrada aquí.

**Asimetría anotada, no resuelta:** si `aiw_flat_objectives_v1` (y de paso
`jame.git_history_snapshot.v1`, anotado en la capa 3) incurre en el mismo defecto
que `jame.roadmap_v3.v0.2-progress` depende de si el modelo plano es genérico o
específico del kernel de AIW. Se resuelve leyendo el emisor, en el tramo 2.

Criterio de borrado: N/A — lo sustituye una revisión futura del contrato.

## D-041 — 2026-07-23 — Enmienda a D-034: la migración es O0 COMPLETO (17 runs); `depends_on` puede cruzar proyectos
Enmienda a D-034; **no la reemplaza.** El orden de trabajo que D-034 fija —consola
primero, tres proyectos en paralelo después— sigue vigente sin cambios. Se enmienda
el punto (3) de su secuencia interna (qué runs migran del roadmap de Cantu al de la
consola) y se añade la pieza de contrato que esa migración necesitaba y no existía.
Insumo: `records/MEDICION-GRAFO-O0.md`, medición read-only del grafo alrededor de
O0, reproducida de primera mano hoy con recorrido propio del roadmap.

**El «6» de D-034 no se deriva de su propio texto. Dos errores de derivación,
citados por línea.**
**(a) El patrón.** D-034 escribe «migrar los runs `RUN-CANTU-PROJECT-CONSOLE-*`»
(`DECISIONES.md:370-371`; el literal está en `:371`). En disco ese patrón encuentra
**3** runs —`…ROADMAP-EDITING-001`, `…LATENT-DEFECTS-001`, `…DEEP-AUDIT-001`— y
**4** sumando el que el encargo nombraba aparte
(`RUN-JAME-PROJECT-CONSOLE-DOCS-V3-001`). El 6 solo aparece **ensanchando** el
patrón a `RUN-*-PROJECT-CONSOLE-*`, es decir ignorando el prefijo que D-034 sí
escribió (MEDICION-GRAFO:144-164; recuento propio 2026-07-23: literal 3,
ensanchado 6).
**(b) El objetivo.** Uno de esos 6 **no vive en O0**:
`RUN-JAME-PROJECT-CONSOLE-DOCS-V3-001` está en **O2**, `queue_order` 59
(MEDICION-GRAFO:159, :166-168; verificado de primera mano). «Migrar los 6» no es
«migrar un trozo de O0»: parte **DOS** objetivos.
**La cardinalidad era correcta; la derivación no.** El 6 del handoff coincide con
lo que hay en disco bajo la lectura ensanchada — el error estaba en el camino, no
en el número, y por eso nadie lo vio: el resultado validaba un razonamiento que no
se sostiene.

**Alcance ratificado: O0 COMPLETO, 17 runs.** Razón medida, no preferencia. Migrar
O0 entero rompe **8** aristas de `depends_on` y **las 8 van entre objetivos
distintos**, dejando **0 objetivos partidos**. El escenario-6 rompe solo 4, pero
las **4 son INTRA-objetivo** y parten O0 y O2 entre dos repos
(MEDICION-GRAFO:218-223; recuento propio: 8 aristas 0-intra/8-inter frente a 4
aristas 4-intra/0-inter, objetivos partidos {O0, O2}). **Menos aristas no es menos
daño:** una arista entre objetivos distintos ya cruzaba una frontera conceptual
antes de cruzar una de repo; una arista intra-objetivo partida en dos repos deja un
objetivo que ya no existe como unidad en ninguno de los dos. El conteo bruto
favorece al escenario-6 y **pierde en toda otra dimensión medida**.

**Escenario «O0 menos rename» (12 runs, 1 arista): MEDIDO, NO ADOPTADO.** Excluir
los 5 runs de rename del repo `cantu-studio` (`REPO-RENAME`,
`INTERNAL-CODE-RENAME`, `DOCS-DIRECTORY-RENAME`, `RUNTIME-JAME-CLASS-RENAME`,
`RUNTIME-J-NAMESPACE-RENAME`) dejaría **1** sola arista cruzada, y encima histórica
—entrante desde O2 contra un run ya `completed` (MEDICION-GRAFO:237-241; recuento
propio: 12 runs, 1 arista, destino `completed`). Es el mejor número de los tres y
**aun así no se adopta**, porque el número no es el problema: esos 5 runs son
trabajo del repo de Cantu, no de la consola, y **su pertenencia a O0 es en sí el
dato a revisar** (MEDICION-GRAFO:241-245; que «deberían» o no estar en O0 queda
**[NO VERIFICADO]** — el roadmap no declara criterio de pertenencia). Si resultan
mal archivados, el arreglo correcto es **re-archivarlos dentro del roadmap de Cantu
como cambio propio**, no excluirlos por la puerta de atrás de una migración:
componer primero, mudar después. Una migración que además reorganiza esconde dos
cambios en uno y deja los dos sin revisar.
**Queda como PENDIENTE con condición de tiempo:** ese re-archivado, si se hace, va
**ANTES del tramo 4** —el tramo en que la migración ocurre
(`context/aiw-console/CONTRATO.md:1224`, §18)— porque a partir de ahí D-036 congela
ese roadmap: «durante la ventana, el roadmap de Cantu no se edita»
(`DECISIONES.md:443-444`). Pasada esa puerta el arreglo deja de ser barato: hay que
hacerlo en dos repos.

**`depends_on` que cruza proyectos — la pieza que faltaba** (contrato, capa 2,
§10.d; decisiones `r`, `s`, `t`). La medición dejó explícito que 8 vs 4 «no son
traducibles a coste hasta que el contrato defina la arista cruzada»
(MEDICION-GRAFO:247-255). Definida así:
**(1) `run_id` es GLOBALMENTE ÚNICO** en todos los proyectos que exponen
`.project/` — extensión de la identidad inmutable que D-034 ya fijó
(`DECISIONES.md:372`), porque inmutabilidad sin unicidad no identifica nada. Y
gratis: medidos los dos únicos roadmaps vigentes con runs (Cantu 65 + el que el
proyector emite para AIW, 16), los **81 ids son distintos, intersección 0**.
**(2) Una entrada que no resuelve en el roadmap local es LEGAL** y significa
dependencia externa; **colgante** —un id que no existe en ninguna parte— sigue
siendo malformado. Eran dos casos que el contrato confundía en uno solo.
**(3) El consumidor resuelve globalmente** contra los proyectos que carga y, si no
puede, **lo declara SIN RESOLVER en la superficie afectada**, nombrando el
`run_id`: misma doctrina que §20 del contrato, aplicada a un campo en vez de a un
archivo. Precisión que la hace implementable: «sin resolver» es lo que un consumidor
sabe; «colgante» es un veredicto que solo puede emitir quien tiene cargados todos
los proyectos — por eso el deber es **declarar**, no **clasificar**.
**(4) La forma calificada (`{project, run_id}`) NO se adopta hoy:** un campo nuevo
cuesta migración en tres repos y no compra nada mientras la unicidad global sea
cierta de hecho. Queda como salida disponible, con condición de disparo escrita —la
primera colisión real de `run_id`— y aditiva el día que se adopte.
**Consecuencia directa:** las 8 aristas de la migración de O0 dejan de ser un daño
a reparar y pasan a ser 8 dependencias externas legales y declarables. El coste de
una arista cruzada es **cero en forma de dato** y **un requisito de declaración
sobre el consumidor**.

**Tensión registrada, no resuelta:** los dos espacios de `run_id` medidos son
disjuntos por **convención**, no por regla — el contrato no fija en ninguna parte la
FORMA de un `run_id`, y la familia que el proyector emite para AIW se deriva de
nombres de carpeta (`005-roadmap-contract-fix`, `APPROVED-001-console-projector`),
que es la clase de id más fácil de colisionar si un tercer proyecto numera igual.
Que la colisión llegue a ocurrir es **[NO VERIFICADO]**: es inferencia sobre la
forma de los ids medidos, no un hecho en disco. Se registra porque es el escenario
concreto que dispararía la salida del punto (4).

Criterio de borrado: N/A — enmienda a D-034; la sustituye una decisión futura sobre
el alcance de la migración.

## D-042 — 2026-07-23 — Re-archivo del bloque de rename; O0 queda en 12 runs
**Ejecutado:** los 5 runs de rename (`queue_order` 17, 62, 63, 64, 65 —
`RUN-CANTU-REPO-RENAME-001`, `…INTERNAL-CODE-RENAME-001`,
`…DOCS-DIRECTORY-RENAME-001`, `…RUNTIME-JAME-CLASS-RENAME-001`,
`…RUNTIME-J-NAMESPACE-RENAME-001`) pasaron de `O0.P3` a una fase nueva **`O2.P5`
«Naming Rename Execution»** dentro del roadmap de Cantu. Evidencia, criterio y
verificación completa en `context/aiw-console/records/REARCHIVO-BLOQUE-RENAME.md`.

**Por qué O2 y no O0.** Los cinco renombran repo, código, docs y runtime de
`cantu-studio` — no la consola. Y su prerequisito
`RUN-CANTU-NAMING-AUDIT-DISPOSITION-001`, que vive en O2, los nombra literalmente
como «the execution runs» de un contrato que vive en O2. El objetivo que los
gobierna ya estaba escrito; lo que estaba mal era dónde colgaban.

**Por qué fase nueva y no `O2.P4`.** El run 16 declara «nothing is renamed by this
run». Meter las ejecuciones en la fase de la decisión borraría esa frontera: la
fase que decide y la fase que ejecuta dejarían de distinguirse. `O2.P5` es la
forma que el roadmap ya usa para eso, y la dependencia queda intra-objetivo
(`O2.P4 → O2.P5`).

**Invariantes preservados.** Comparando cada campo de cada run antes y después,
**0/65 runs** presentan diferencia alguna fuera de la reubicación. `run_id`,
`queue_order`, `depends_on`, `status` y `schema_version` intactos; `queue_order`
sigue denso y contiguo 1..65; no se renumeró nada.

**Cierra el pendiente con condición de tiempo de D-041**, y por la ruta que D-041
prescribía: componer primero dentro del roadmap propio, mudar después. El arreglo
se hizo antes del tramo 4, que es la puerta tras la cual D-036 congela ese roadmap
(`DECISIONES.md:443-444`) y el mismo cambio costaría dos repos.

**Enmienda de cifras a D-041.** Su «O0 completo = 17 runs, 8 aristas» describe el
estado **PREVIO** al re-archivo. Tras él, **O0 = 12 runs** y las aristas que cruzan
su frontera son **1** — la entrante histórica desde O2 contra un run ya
`completed`. **La decisión de alcance NO cambia:** la migración sigue siendo O0
COMPLETO. Lo que cambia es qué contiene O0, no cuánto de O0 se migra. Nótese que
las cifras resultantes coinciden con el escenario «O0 menos rename» que D-041
midió y NO adoptó: se llegó ahí por la puerta correcta —re-archivo revisable en el
roadmap de Cantu— y no excluyendo runs por la puerta de atrás de una migración.

**Consecuencia declarada.** La tabla de remap 7.A de
`records/MEDICION-GRAFO-O0.md` queda **obsoleta**: fue calculada para la partición
17/48 y la partición vigente es 12/53. El record NO se reescribe —es medición
fechada—; la migración recalcula el remap cuando toque.

**Pendiente trasladado al hilo `cantu-studio`.** Si O2 —«Knowledge Base and
Documentation SoT»— es el objetivo correcto para renames de runtime queda
**[NO VERIFICADO]**: el roadmap no declara criterio de pertenencia de run a
objetivo, así que la pregunta no es decidible desde disco. Lo que sí está medido es
que O2 es donde vive el contrato que ordena estos renames. La revisión de si ese
objetivo debe alojar ejecución de runtime pertenece al hilo de Cantu; no se fuerza
desde el hilo de la consola.

Criterio de borrado: N/A.

## D-043 — 2026-07-23 — Forma y estabilidad de `run_id`; el emisor medido
Enmienda la capa 2 del contrato (`context/aiw-console/CONTRATO.md`, §10.d, Reglas
1.a y 1.b, decisiones `u` y `v`); **no reemplaza a D-041**, que queda íntegra. Y
registra las cuatro respuestas del record
`context/aiw-console/records/MEDICION-PROYECTOR.md`, medición read-only del emisor
leída completa antes de redactar. Todas las citas de código se releyeron de primera
mano. No se ejecutó el proyector. No se ejecutó git en ninguna forma.

**FORMA — `RUN-<PROYECTO>-<SLUG>-<NNN>`, sólo hacia adelante.** Se adopta la
convención que Cantu ya sigue de facto: medición propia, **65 de 65** `run_id`
casan la forma, 0 excepciones, prefijos `JAME` (48) y `CANTU` (17), 0 minúsculas.
No se inventó una mejor porque una convención con 65 ejemplares en disco **tiene
emisor y evidencia** —lo contrario del patrón que §3.b del contrato prohíbe—, y
una forma inventada declararía ilegales 65 ids existentes. Límite medido y escrito:
`<NNN>` es `001` en los 65 —la secuencia nunca se ejerció más allá del primero—,
así que **la unicidad la carga hoy el `<SLUG>`, no el número**. **El prefijo es
PROCEDENCIA, no propiedad:** nombra al proyecto que CREÓ el run, no al que lo aloja.
Consecuencia declarada, no deuda: **los 12 runs de O0 que migran conservan
`RUN-CANTU-` (8) y `RUN-JAME-` (4)** —recuento propio tras el re-archivo de D-042—
y el roadmap de `aiw-console` **nace con prefijos mixtos**; cambiarlos al migrar
rompería la inmutabilidad justo cuando el id es lo único que sobrevive al cambio de
repo. Corolario: **`RUN-JAME-` sobrevive aunque JAME sea un nombre muerto** — un id
nombra a quien creó un evento que ya ocurrió, y ese hecho no caduca; la
inmutabilidad gana sobre la limpieza de nombres. Distinto de
`jame.roadmap_v3.v0.2-progress`, que nombra al emisor de un modelo que se sigue
emitiendo (§10.c). `<PROYECTO>` **no es `project_id`** (los 48 `RUN-JAME-*` son de
`jame_system_dual`, `CANTU-VALID:609`) y **nadie ramifica sobre él**: §5 aplicado a
este campo. **Los `run_id` existentes no se regularizan.**

**ESTABILIDAD — y el emisor la viola, medido.** El `run_id` se asigna al crear el
run y **no cambia nunca**: ni por `status`, ni al archivarse, ni al migrar de
proyecto. Escrito además lo que D-034 (`DECISIONES.md:372`) y D-041 no escribieron:
**un emisor que derive `run_id` de una fuente mutable VIOLA el contrato.** Hay uno
midiendo: el proyector fabrica el id con el nombre del archivo
(`projects/aiw-console/tools/projector/project.mjs:192` — en adelante
`project.mjs`) y lo emite tal cual (`:235`, `:247`, `:262`),
mientras el kernel **renombra el archivo al archivarlo con el estado como prefijo**
(`aiw/queue.mjs:58`) — en disco, `APPROVED-001-console-projector.md`,
`ERROR-000-sandbox.md`, `HUMAN_REVIEW-999-sandbox-imposible.md`. El mismo objetivo
que pendiente proyecta `001-console-projector` proyecta, completado,
`APPROVED-001-console-projector`: **muta en la transición que más importa**, y en
silencio. **La razón de fondo:** el prefijo de estado es **status codificado dentro
de la identidad** — el defecto que §12.c prohíbe un nivel más arriba (guardar lo
que se deriva) en su forma más dañina, porque corrompe la única cosa que el
contrato declara inmutable. Y es copia redundante, medida: la clasificación ya sale
de la carpeta (`project.mjs:38` → `:188-190`, `:202`) y el desenlace ya se extrae
aparte (`:196`) y viaja en **dos** campos derivados, `status` (`:258-260`) y
`closeout_result` (`:269`). Un derivado de más se recalcula; una identidad rota no
se repara. **Trabajo del tramo 2:** derivar el id de fuente estable —punto de
cambio único, `project.mjs:192`— y aplicarle la forma. **Regularizar los 16 ids de
AIW no rompe ninguna promesa porque hoy no son identidad: mutan.** Es la única
ventana en que ese arreglo es gratis. **[NO VERIFICADO]** si algún consumidor
guarda esos `run_id` entre proyecciones: no se midieron los consumidores.

**Regla 4 de D-041: vigente, disparo más improbable.** Con la forma fijada, la
«primera colisión real» exige ahora que dos proyectos compartan prefijo, además de
slug y número. **No se retira:** la forma no es un mecanismo de asignación —nada
reserva prefijos—, y la salida sigue siendo aditiva, así que mantenerla anotada
cuesta cero.

**Q1 — `taxonomy_model` está HORNEADO** (`project.mjs:38,40` → `:463-466`). La
hipótesis que §17 del contrato marcó **[NO VERIFICADO]** era **cierta**: la norma
pide función del modelo transportado y el emisor pone constante literal. Trabajo
del tramo 2, exactamente como §17 anticipó. Precisión: hoy no lo hace incorrecto
—el proyector emite un solo modelo, así que constante y derivación coinciden en
valor—; el defecto es latente y se manifiesta con el segundo modelo. **Extra
medido:** `OPERATIONAL_STATUSES` declara `blocked` (`project.mjs:40`) y el cálculo
real del campo, `pending.length > 0 ? "active" : "idle"` (`:423`), **no puede
producirlo nunca**. Hay que distinguirlo del `blocked` de §11.a: aquél está
**declarado y no instanciado** —honesto, el vocabulario dice lo que un run PUEDE
decir—; éste es **estructuralmente inalcanzable**, una promesa que el emisor no
puede cumplir por construcción. El vocabulario declarado es más ancho que lo que el
emisor sabe emitir, y eso es prueba adicional de que es literal y no derivación.

**Q2 — la asimetría que D-040 dejó anotada (`DECISIONES.md:660-663`) queda CERRADA
en positivo.** `aiw_flat_objectives_v1` (`project.mjs:450`) **nombra al CONTENIDO,
no al emisor**, y lo que lo hace legítimo es que el modelo esté **atado al kernel de
AIW**: el proyector no lista qué subcarpetas existen, itera tres literales
(`:38`, recorridos en `:98` y `:188-190`, sobre una raíz fija en `:96`/`:186`)
mientras el kernel tiene **siete** bajo `objectives/`
—ignora cuatro en silencio—, traduce prefijos que son los estados terminales del
kernel (`:58-65`, vía la convención de archivado de `queue.mjs:58`) y extrae el
prefijo con regex sobre el nombre de archivo (`:196`). Un repo con carpetas
`todo/doing/done` produciría un árbol vacío, no uno equivalente. Es decir: `aiw_`
nombra una **forma de datos** que sólo existe donde ese ciclo de vida existe;
`jame.` nombra a una **organización emisora** y sigue siendo defecto. La asimetría
era aparente. Contorno honesto: esto dice que el identificador está bien formado
bajo §1, **no** que el modelo plano deba sobrevivir.

**Q3 — `jame.git_history_snapshot.v1` es literal horneado**
(`projects/cantu-studio/tools/project-console/build-git-history-snapshot.mjs:26` →
`:186`): constante de módulo, ni derivada ni
configurable —el único `opts` reconocido es `opts.now`—, y duplicada en las dos
copias del builder (Cantu y consola), igual que su ruta de salida. **Tercer
identificador con nombre muerto**, y aquí el prefijo **sí** nombra al emisor: es el
defecto que Q2 descartó para `aiw_flat_objectives_v1`. Renombrarlo es tramo 2, como
ya anotaba la capa 3 del contrato; coste medido: una línea, en dos copias, más
cualquier consumidor que compare el string.

**Bloqueo del tramo 2 identificado.** `resolveInsideAiw`
(`project.mjs:475-483`) **LANZA** si la ruta de salida no cae dentro de
`<root>/.aiw/`, y está declarada como frontera del proyector en su cabecera
(`:12-13`). El emisor, tal como está, **no puede escribir bajo `.project/` en
absoluto**. La buena noticia es la forma del obstáculo: **no es acoplamiento
disperso** —como sí lo es la tabla `PATHS` con 15 literales del renderer (§1.a del
contrato)— **sino una guarda única, con archivo y línea**. Emitir a `.project/`
empieza ahí, y ahí se decide también si durante la convivencia aditiva (D-036) el
emisor escribe en ambos destinos o sólo en el nuevo. Lo demás del inventario del
tramo 2 son constantes de ruta.

**No se editó ningún record.** MEDICION-PROYECTOR es medición fechada y se cita, no
se reescribe. **Tensión abierta, no resuelta aquí:** §17 del contrato sigue
marcando **[NO VERIFICADO]** la hipótesis que Q1 acaba de verificar; actualizar ese
párrafo quedó fuera del alcance de este encargo (que era §10.d) y va en uno aparte.

(Addendum 2026-07-24 — pase de coherencia del contrato, el "uno aparte" anunciado
arriba. Aplicado en `context/aiw-console/CONTRATO.md`, sin tocar records: §17 pasa
de **[NO VERIFICADO]** a **VERIFICADO** para el `taxonomy_model` horneado, con el
hallazgo extra de `blocked` inalcanzable (`PROJ:423`); se corrigieron las cifras de
aristas caducadas por D-042 en §10.d "El hueco, medido" (8→1) y se conservaron con
puntero las que reproducen mediciones fechadas (nota de verificación de la capa 2;
tabla-evidencia §12.d, con O0 17→12 y O2 6→11 pero **misma derivación**); §16
corrobora por D-043 la lectura de procedencia del prefijo. Se añadieron al contrato
un índice y una subsección "Cómo se mantiene este documento" que fija el criterio
—qué se corrige, qué se conserva con puntero, y por qué el contrato no se rige por
la regla de records de D-042—. Punteros internos y citas `DECISIONES.md:línea` del
contrato verificados: **ninguna se desplazó**, porque este log es append-only y
D-040…D-043 se agregaron al final. No se ejecutó git.)

Criterio de borrado: N/A.

## D-044 — 2026-07-24 — Migración de O0; el roadmap propio de aiw-console y dónde vive
Registra la operación de datos ya ejecutada y el hallazgo que la reencuadró.
Evidencia completa en `context/aiw-console/records/MIGRACION-O0.md`. No se editó
`CONTRATO.md` ni ningún record; no se ejecutó git en ninguna forma.

**Ejecutado.** Los 12 runs de O0 pasaron del roadmap de Cantu a
`projects/aiw-console/roadmap/roadmap.json`, con `schema_version:
"roadmap_tree_v1"` (§10.c). Cantu queda con **7 objetivos y 53 runs**,
`schema_version` intacto. Conservación verificada: 53+12=**65**, unión 65, **0
perdidos, 0 duplicados, 0 solapamiento, 0 runs con diferencia fuera de
`queue_order`**.

**HALLAZGO — `.aiw/` en `aiw-console` NO es estado propio de `aiw-console`.** Es
el área de trabajo de la proyección de AIW: el proyector vive en este repo, lee
`../../aiw/objectives/` y entrega ahí. `.aiw/roadmap/roadmap.json` contiene la
copia de entrega de AIW (16 runs, `aiw-projector@0.1.0`), producida por el run
`006-roadmap-delivery-path` y regenerada por `serve-project-console.mjs` en cada
arranque. **La simetría con Cantu no existe:** allá `.aiw/` sí es del proyecto. Un
encargo de la cabina dio ese path por libre y el taller lo detuvo antes de
escribir; la evidencia ya estaba medida en `MEDICION-PROYECTOR.md §5.a` y no se
había leído.

**Ruta del roadmap propio: `roadmap/roadmap.json` en la raíz del repo.** Fuera de
`.aiw/`, nombra el contenido (§1). Es **FUENTE AUTORADA, no derivada:** el contrato
rige `.project/`, que nacerá emitida desde aquí en el tramo 2. Escribir a mano en
`roadmap/` no viola §18; hacerlo en `.project/` sí lo violaría.

**Primer ejemplar real de la Regla 2 (§10.d).** La arista
`RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` (Cantu, O2.P4) →
`RUN-CANTU-ROADMAP-CONTENT-AUDIT-001` (ahora aiw-console, O0.P3) se conservó
literal y es hoy la única referencia de Cantu que no resuelve localmente.
Dependencia externa **legal, no colgante**.

**Consecuencia operativa.** Cantu queda **sin ningún run `active`** — el único se
fue con O0. Derivación medida tras la extracción: O5 `in_progress`, los otros seis
`planned`. En `aiw-console`, O0 deriva `active`.

**Puerta de anchors: PASA.** Cero literales `"O0"` en código; todo `objective_id
===` compara contra variable; los 12 `run_id` solo aparecen en comentarios,
archivos históricos y fixtures. Sacar O0 no cambia ninguna rama.

**Estado del validador de Cantu tras la extracción: [NO VERIFICADO]** — el operador
no aportó resultado en este encargo.

**Pendiente abierto.** Si al llegar O4 el roadmap conserva `O0`/`O4` con hueco o se
renumeran los `objective_id`. El contrato no lo fija. Se decide en el encargo de O4.

Criterio de borrado: N/A.

## D-045 — 2026-07-24 — El validador de Cantu y el consumidor que sí existía
Cierra el rojo que dejó abierto la extracción de O0 ([[D-044]]). Fuente medida:
`context/aiw-console/records/MEDICION-VALIDADOR-ROJO.md`. Se editó
`projects/cantu-studio/tools/project-console/validate-project-console-state.mjs`
(solo la regla roja de `depends_on`) y `context/aiw-console/CONTRATO.md` (solo la
afirmación de alcance de D-026, sin cambiar norma). No se tocó el roadmap de
ningún repo; no se ejecutó git en ninguna forma.

**Hecho medido.** La extracción de O0 puso rojo el validador de Cantu, verde antes.
Dos errores. El de `git_history.snapshot.json` se cura regenerando —`deriveRunId`
produce `null` hoy y `null` es aceptado; 1 commit de 771 afectado, puntual no
sistémico—. El de `depends_on` exigía decisión. Verificado al correr el validador
en este encargo (permitido): sale VERDE (exit 0); el snapshot ya venía regenerado
por el operador y solo restaba la arista de `depends_on`, ahora advertencia.

**Arreglo adoptado.** Una referencia de `depends_on` que no resuelve localmente
pero tiene forma de `run_id` canónico degrada de `fail()` a `warn()`; una que no
tiene forma de `run_id` sigue siendo error duro. Razón: el contrato ya lo mandaba
(§10.d Regla 3, §20); el validador es anterior a esa doctrina y la violaba. Es el
**primer uso real de `warn()`**, que llevaba definido (`:20-22`) y sin invocar
desde el primer día. Verificado que las advertencias se imprimen en el resumen
final ("Roadmap rebase warnings (non-blocking)", `:2039-2044`) sin afectar el exit
code: el arreglo no convierte un rojo en silencio.

**Coste aceptado a sabiendas.** El validador, cargando un solo roadmap, no puede
distinguir externo de typo, así que un `run_id` mal escrito degrada de error a
advertencia. Se mitiga con el mensaje, que nombra ambas posibilidades explícitamente
(dependencia externa legal §10.d Regla 2 **o** error de escritura). El arreglo real
—el que sí puede resolver globalmente— es el shell del tramo 3; este parche es la
salida barata y contractual.

**Rechazada la opción de borrar la entrada `depends_on`.** Destruiría una
dependencia real que existe, solo que cruzando repos
(`RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` →
`RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`, hoy en aiw-console O0.P3), conservada a
propósito como el primer ejemplar de la Regla 2 ([[D-044]]). §10.d Regla 3 paso 2
lo prohíbe; además toca `cantu-studio` fuera del alcance de escritura.

**Deuda medida, NO arreglada, para el tramo 3.** Tres sitios comparten el supuesto
"todo `run_id` vive en el roadmap local" y NO se tocaron: `CANTU-VALID:847`
(`roadmapV3QueueGroupKey` mal-agrupa el run externo en `later` de forma
permanente, aun con la regla dura relajada), `CANTU-VALID:1059-1069` (el DFS de
ciclos salta ids externos con `?.` → no detecta ciclos que crucen proyectos), y
`build-git-history-snapshot.mjs:103-108` (`deriveRunId` degrada limpio a `null`).
No se tocan: la consola de Cantu muere en el tramo 7 y el sitio correcto es el
shell que carga todos los proyectos.

**CORRECCIÓN a [[D-044]].** Su campo "Estado del validador de Cantu tras la
extracción: [NO VERIFICADO]" quedó ahora medido: verde con la arista externa
presente como advertencia. D-044 no se reescribe; esta entrada lo verifica.

**CORRECCIÓN de alcance sobre [[D-026]].** El contrato afirmaba que D-026 se activa
en el tramo 3 "porque no hay consumidor existente". Es falso. `depends_on` tenía un
consumidor vivo —este validador— desde el primer día. El error fue leer
"consumidor" como consumidor del ARTEFACTO nuevo (`.project/`) en vez de consumidor
de CUALQUIER COSA cuyo significado el contrato cambie. La Regla 2 redefinió un
campo en uso sin ejercitarlo contra quien lo usaba. D-026 se activa cuando el
contrato cambia el significado de algo que un consumidor ya lee, no solo cuando
estrena un artefacto. La enmienda al pasaje correspondiente va en `CONTRATO.md`
en este mismo encargo; ninguna norma cambia, solo la afirmación de alcance.

Criterio de borrado: N/A.

## D-046 — 2026-07-24 — Redacción de O4; el tramo 1 entregado y el hueco de capa 2
Registra la escritura de O4 en el roadmap propio de `aiw-console` y cierra el tramo 1.
Evidencia completa en `context/aiw-console/records/REDACCION-O4.md` (y su insumo,
`MEDICION-O4.md`). No se editó `CONTRATO.md` ni ningún record; no se ejecutó git en
ninguna forma.

**Ejecutado.** O4 "Consola global" redactado en
`projects/aiw-console/roadmap/roadmap.json`: **17 runs** (8 `completed`, 9
`planned`), **10 fases**, `queue_order` **13..29**, contiguos tras los 1..12 de O0.
Los **12 runs de O0 quedaron intactos**: comparación campo a campo contra el
respaldo pre-escritura, **0 diferencias**. Evidencia en `records/REDACCION-O4.md`.

**Fases = tramos, y es INVENCIÓN declarada.** La fuente (`roadmap_AIW_temp.md`) no
declara fases, y los nueve tramos vivían solo en el handoff efímero. Se adoptó como
la mejor descomposición disponible; el propósito mismo de la redacción era
precisamente sacar el plan de un archivo que se sobrescribe y darle estado
duradero. No se presenta como si la fuente la prefigurara.

**`O4.P9` transversal** aloja los tres ítems sin hogar en la secuencia de tramos,
**ninguno descartado**: `Merge de 005` (`completed`, anterior al plan de tramos),
`Context pack` (`planned`, parcialmente superado por [[D-038]] —el contexto de
cabina ya se movió—, tensión anotada en el propio run), y `Digest` (`planned`,
degradado por la propia fuente de prerequisito a optimización). §12.b del contrato
exige ≥1 run por fase; P9 lo cumple con 3.

**`objective_id` conserva el hueco (`O0`, `O4`)** —es identidad, no se renumeró; el
hueco dice la verdad, O0 y O4 vienen de numeraciones distintas— y los `run_id`
nuevos estrenan el prefijo `RUN-CONSOLE-` (§10.d Regla 1.a), no `RUN-AIW-` (ése es
del kernel). Cierra el pendiente que [[D-044]] dejó abierto.

**HUECO DE CAPA 2, descubierto por uso, mayor de lo previsto.** Tres declaraciones
sin destino en `roadmap_tree_v1`:
- **(a)** la declaración de **vocabulario de `status` a nivel de roadmap**
  (`roadmap_AIW_temp.md:13`): el árbol no tiene clave de vocabulario a nivel de raíz
  ni de objetivo; hoy vive en el contrato (§11.a), no en el dato.
- **(b)** el matiz de que **los runs contra `aiw-console` sí serían delegables al
  kernel** (`roadmap_AIW_temp.md:15-16`) — una **EXCEPCIÓN** a la regla de categoría
  `manual`, que ni siquiera con `category` materializado tendría dónde alojarse a
  nivel de roadmap.
- **(c)** —la mayor— **un objetivo no puede declarar su propia definición de
  terminado**: el criterio "consola estable" (`roadmap_AIW_temp.md:114-120`) tuvo
  que alojarse en el `full_description` de un run ya `completed`
  (`RUN-CONSOLE-AUDIT-PHASE0-001`), porque el objetivo bajo el modelo canónico solo
  tiene `objective_id`, `title`, `phases` (§10.a) — no hay campo de prosa donde
  poner el marco del objetivo.

Raíz medida: `RUN-CANTU-ROADMAP-EDITOR-USABILITY-001` quitó `summary` y
`full_description` de los objetivos **deliberadamente**, y el contrato respetó esa
decisión. Ahora tiene costo documentado. **La enmienda se delibera aparte, con las
dos evidencias enfrente; no se revierte por decreto.**

**Pendiente: prioridad O0 vs O4 en la cola.** O0 conserva 1 run `active` y 2
`planned` con `queue_order` bajo (q10..q12), así que preceden a todo O4 en la cola
global. **NO se decide hoy**: el `queue_order` gobierna cuando el trabajo se ordena
desde la cola, y hoy lo ordena la cabina. Debe resolverse **antes del tramo 5**,
cuando la consola global pase a ser la fuente del orden.

**EL TRAMO 1 QUEDA ENTREGADO.** Contrato en tres capas ([[D-039]], [[D-040]]),
enmiendas ([[D-041]], [[D-043]], [[D-045]]), migración de O0 ([[D-042]], [[D-044]])
y la redacción de O4 registrada aquí. Sigue el **tramo 2**.

Criterio de borrado: N/A.

## D-047 — 2026-07-24 — Reorden de O4: el prototipo primero, la revisión UI/UX antes del corte
Reordena las fases de O4 en `projects/aiw-console/roadmap/roadmap.json`, sin tocar
O0 ni renumerar identidades. Enmienda el orden que [[D-046]] dejó asentado; no lo
reemplaza. Solo se editó el roadmap; no se tocó `CONTRATO.md`, ningún record, ni
código; no se ejecutó git en ninguna forma.

**El defecto que se corrige.** [[D-046]] dejó la revisión UI/UX (`O4.P8`) DESPUÉS
del corte (`O4.P7`). Eso significaba apagar la consola que funciona y pulir
después: si la revisión de uso descubría un problema, ya no había a qué volver. El
orden más caro posible para descubrirlo.

**Cambio 1 — prototipo como fase nueva `O4.P10`, en tercer lugar** (tras el
contrato `O4.P1`, antes del emisor `O4.P2`). Corre CONTRA DATOS REALES: lee
`projects/aiw-console/roadmap/roadmap.json`, que ya existe con 2 objetivos y 30
runs. NO maquetas ni datos inventados — sería el patrón de la v0.3 que el contrato
existe para matar ([[D-039]]). Adelanta la prueba de consumidor de `roadmap_tree_v1`
([[D-026]]) a ANTES de construir el emisor: si el formato no aguanta, se sabe aquí y
no tres fases más tarde. Y da resultado visible temprano —tras trece horas de
trabajo sin nada que mirar, que es el motivo declarado por el operador—.
Run: `RUN-CONSOLE-PROTOTIPO-CONSOLA-001`, `planned` (§10.d Regla 1.a).

**Cambio 2 — UI/UX sube a compuerta del corte.** Deja de ser fase final y pasa a
decidir si el corte procede.

**Cambio 3 — AIW como tercer proyecto (`O4.P6`) baja tras la revisión.** No entra
un tercer proyecto mientras la consola se pule con dos.

**Dos compuertas de aprobación del operador, escritas como `depends_on` reales, no
como intención:**
- prototipo → shell: `RUN-CONSOLE-SHELL-MULTIPROYECTO-001` **depende de**
  `RUN-CONSOLE-PROTOTIPO-CONSOLA-001`. El shell se construye sobre el prototipo
  aprobado, no en paralelo.
- UI/UX → corte: `RUN-CONSOLE-CORTE-RETIRO-LOCAL-001` **depende ahora de**
  `RUN-CONSOLE-UI-UX-001`, conservando su dependencia previa de
  `RUN-CONSOLE-PARIDAD-RENDER-CANTU-001`. El corte es irreversible: no procede sin
  la revisión de uso.

Ambas requieren aprobación explícita del operador, anotada en el `full_description`
de los runs de compuerta.

**`phase_id` NO se renumeran** — `O4.P2` sigue siendo `O4.P2` aunque ahora vaya en
cuarto lugar. Están citados en `REDACCION-O4.md` y en [[D-046]]; renumerar rompe
referencias a cambio de estética. El orden lo cargan la posición en el array y
`queue_order`, no el número del id (precedente en disco: las fases de Cantu O2 van
`P1, P2, P4, P3`). Mismo criterio de identidad-sobre-estética con que [[D-046]]
conservó el hueco `O0`/`O4`.

**La alineación "número de fase = número de tramo" que [[D-046]] estableció queda
RETIRADA por este reorden.** No se deja envejecer en silencio: con `O4.P10`
intercalada en tercer lugar y el resto reordenado, la fase ya no nombra al tramo.
Los `phase_id` pasan a ser identidad opaca, como los `run_id`.

**Verificación con números.** Roadmap: 2 objetivos, 30 runs, `queue_order` 1..30
denso, único y contiguo. O4: 11 fases, 18 runs (8 `completed`, 10 `planned`). Los
12 runs de O0 sin tocar: comparación campo a campo contra el respaldo pre-escritura,
0 diferencias (byte-idénticos). 0 `depends_on` colgantes; ninguna fase con 0 runs;
cada dependencia precede a su dependiente. Ningún `run_id` ni `phase_id` cambió;
ningún `status`, `title`, `summary` o `closeout_result` cambió; solo los tres
`full_description` de compuerta (el nuevo prototipo, más shell y corte con la nota
de aprobación).

Criterio de borrado: N/A.

## D-048 — 2026-07-24 — Migración idéntica antes que multiconsola: reorden de O4, retiro del prototipo y emisor redefinido por medición
Revierte el orden que [[D-047]] estableció (el prototipo primero) y redefine el
alcance del emisor con dos mediciones enfrente:
`context/aiw-console/records/MEDICION-FUENTES-CONSOLA.md` (qué datos tiene HOY
aiw-console para una consola idéntica) y
`context/aiw-console/records/VEREDICTO-ROADMAP-TREE-V1.md` (el veredicto que dejó el
prototipo). Se editaron **solo tres archivos**:
`projects/aiw-console/roadmap/roadmap.json`, este log y el handoff del hilo. No se
tocó `CONTRATO.md` ni ningún record —son insumo, no se editan—; no se borró el
prototipo `console/`; no se ejecutó git en ninguna forma.

**El defecto que se corrige.** [[D-047]] puso el prototipo primero para dar
resultado visible temprano y ejercitar `roadmap_tree_v1` antes del emisor. Cumplió:
el veredicto existe y es favorable. Pero el operador no quiere un prototipo propio
como camino a la consola: quiere una **MIGRACIÓN IDÉNTICA** de la consola de Cantu
—la avanzada, la que ya funciona— antes de que aparezca la multiconsola. Un
prototipo nuevo por delante de un port es trabajo que hay que tirar: lo que se
aprende construyendo una vista propia no se reusa al trasplantar el renderer real.
El orden se invierte.

**Cambio 1 — el prototipo se RETIRA como entregable de fase, y no se borra.**
`RUN-CONSOLE-PROTOTIPO-CONSOLA-001` pasa a `completed` con
`closeout_result: "descartado_por_D-048"`, su `full_description` gana la nota del
retiro, y su fase (`O4.P10`, retitulada "…(RETIRADO por D-048 — historia)") baja al
**final** de O4: es historia, no plan. **El `summary` y el veredicto se conservan
intactos** — `records/VEREDICTO-ROADMAP-TREE-V1.md` no se tocó, y su hallazgo pasa
entero al emisor: el árbol suelto **no es auto-descriptivo** (ni el vocabulario de
`status` ni la regla de derivación de §12 viajan dentro del archivo), así que el
envelope del snapshot debe cargar `taxonomy_model` (§17). El código de `console/`
sigue en disco.
*Nota de vocabulario, escrita para que no se lea como descuido:* **no existe token
`descartado`** en el vocabulario cerrado de run (§11.a: `planned·active·blocked·
completed`) y esta decisión **no lo inventa** —acuñar un quinto token es enmienda de
contrato, no efecto lateral de un reorden—. Por eso el retiro viaja en
`closeout_result`, que §14 mantiene string libre sin enum, y en la prosa del run. El
`status: completed` dice lo cierto: el run corrió y cerró (hay código y hay
veredicto); el `closeout_result` dice **cómo** cerró. §21 lo admite: la implicación
`closeout_result ⇒ completed` se respeta.

**Cambio 2 — nuevo orden de O4: EMISOR → PORT IDÉNTICO → MULTICONSOLA → aguas
abajo.** Posición por posición: `O4.P0` audit, `O4.P1` contrato/migraciones (ambas
`completed`, intactas), **`O4.P2` el emisor**, **`O4.P11` el port idéntico (fase
nueva)**, `O4.P3` la multiconsola, `O4.P4` Cantu emite, `O4.P5` paridad, `O4.P8`
UI/UX, `O4.P6` AIW tercer proyecto, `O4.P7` corte, `O4.P9` transversal, `O4.P10`
prototipo retirado. El emisor va primero por una razón medida, no por gusto: **el
snapshot es la única ruta `required` de las 15**; sin él las vistas primarias caen a
fallback completo, así que un port sin fuentes propias no tendría qué renderizar.

**Cambio 3 — fase nueva `O4.P11`, el PORT IDÉNTICO**, con
`RUN-CONSOLE-PORT-IDENTICO-001` (`planned`, prefijo `RUN-CONSOLE-` por §10.d Regla
1.a). Su `full_description` fija el trasplante en concreto: las **tres piezas
reales** de `projects/cantu-studio/docs/project-console/` — `index.html` con sus
cinco pestañas (Overview; Roadmap con sus dos subviews Run Queue y Roadmap; History;
Docs; Status con Governance State y Console Diagnostics), `assets/project-console.css`
y `assets/project-console.js`, **el renderer real, no una reescritura**—; la capa de
datos **reapuntada** de `../../.aiw/**` (que en este repo es el área de entrega de la
proyección de AIW, [[D-044]]) a las fuentes propias que emite el run anterior; y la
**identidad JAME quitada** en los puntos ya localizados por el audit (Bloque E):
regex `RUN-JAME-` del history-builder y el de strip del renderer (E.1), constantes de
run y `RUN_OPERATOR_OVERRIDES` (E.2), rutas `.aiw/` horneadas (E.3), fallback de rama
`jame-parallel-audit-001` (E.4). Es la consola idéntica **de un solo proyecto**: el
menú lateral y la pantalla multiproyecto quedan explícitamente fuera. `phase_id`
opaco (`O4.P11` es el siguiente id libre, no una posición), como fijó [[D-047]].

**Cambio 4 — el emisor (`O4.P2`) redefinido por la medición: 3 + 3, y 9 diferidas.**
La medición contó, renderer en mano, cuántas de las 15 rutas **pintan píxeles
vivos**: seis. Tres ya tienen origen y emisor —snapshot (compuerta), roadmap propio
(Overview + Roadmap + Cola) e historia git (History, 42 commits ya materializados)—;
tres **no existen y sí pintan**: `docs/docs_index.json` (la pestaña Docs entera),
`guardrails/project_guardrails.json` y `guardrails/no_claims.json` (las dos tablas de
datos de Governance). Ése es el **mínimo funcional**. Las otras **nueve** de las doce
sin emisor —`project.json`, `state/project_status.json`,
`state/component_status.json`, `state/events.jsonl`, `ledgers/change_ledger.jsonl`,
`ledgers/git_provenance.jsonl`, `ledgers/human_qa.jsonl`, `ledgers/ai_reviews.jsonl`,
`guardrails/project_memory.jsonl`— **no compran un solo píxel vivo**: alimentan
código dormido (la `renderHistory` huérfana, la `renderOverview` legacy), silencian el
banner de fuentes opcionales, y dos de ellas llenan dos conteos de Diagnostics;
`project_memory.jsonl` no tiene **ningún** consumidor en el renderer. Se **DIFIEREN a
una fase de paridad cosmética posterior y OPCIONAL**, y esta decisión **NO la abre**:
se abrirá solo si el operador la pide, y cada fuente entra por la puerta normal del
contrato (§18.b) el día que tenga emisor. Nombrarlas diferidas es la mitad del valor
de la medición: son deuda de paridad-con-Cantu, no de consola funcional.

**Cambio 5 — los dos trabajos NUEVOS que la medición destapó, anotados en el emisor.**
Ninguno estaba en el alcance que [[D-046]] le escribió:
- **(a) el proyector no puede proyectar `aiw-console` hoy.** Lee el layout
  `objectives/{pending,parked,processed}/*.md` + `logs/<id>/summary.md` +
  `config.json` de un project root, y **aiw-console no tiene ninguno de los tres**.
  Hay que enseñarle a proyectar este proyecto tomando su propio
  `roadmap/roadmap.json` (`roadmap_tree_v1`) **como raíz del árbol** y `package.json`
  como identidad mínima. Sumado al bloqueo ya conocido de `resolveInsideAiw`
  ([[D-043]]), el emisor tiene ahora **dos** trabajos de fondo, no uno.
- **(b) `docs_index.json` hay que CREARLO desde cero.** No existe en ninguna ruta del
  repo (glob de todo el repo = 0 hits), pero el corpus sí: **23 `.md` reales**. Es el
  único caso "cuerpos sin índice": crear el índice **es** crear la fuente, con
  curaduría de `nav_tier`/`default_visible` y paths que existan en disco.

**Cambio 6 — la compuerta prototipo→shell se disuelve; las de [[D-047]] se
conservan.** `RUN-CONSOLE-SHELL-MULTIPROYECTO-001` deja de depender del prototipo
retirado y **depende ahora de `RUN-CONSOLE-PORT-IDENTICO-001`**; el port, a su vez,
**depende del emisor**. La cadena queda emisor → port → multiconsola. **Las dos
compuertas que [[D-047]] existía para poner siguen en pie, sin cambio**:
`RUN-CONSOLE-CORTE-RETIRO-LOCAL-001` conserva su `depends_on` de
`RUN-CONSOLE-PARIDAD-RENDER-CANTU-001` **y** de `RUN-CONSOLE-UI-UX-001`, y UI/UX
sigue **antes** del corte en la secuencia (posiciones 8 y 10). El corte es
irreversible y no procede sin la revisión de uso: esa era la corrección central de
[[D-047]] y este reorden no la toca.

**Lo que NO se hizo, dicho explícitamente.** No se renumeró ningún `phase_id` ni
`objective_id` —identidad opaca ([[D-047]])—; ningún `run_id` cambió; no se borró el
prototipo ni su run; no se abrió la fase de paridad cosmética; no se construyó
emisor, port ni fuente alguna: esta decisión **solo reordena y registra el plan**.

**Verificación con números, post-edición.** Roadmap: **2 objetivos, 31 runs**,
`queue_order` **1..31** único, denso y contiguo. **O4: 12 fases, 19 runs — 9
`completed`, 10 `planned`** (el prototipo pasó de `planned` a `completed`; el port
nace `planned`). O0: 3 fases, 12 runs (9 `completed`, 1 `active`, 2 `planned`), **sin
tocar** — comparación campo a campo contra el respaldo pre-escritura: **0
diferencias, byte-idéntico** (19 844 bytes de un lado y del otro), `queue_order` 1..12
inalterados. **7 aristas `depends_on`** (eran 6; el par shell→prototipo se sustituyó
por port→emisor y shell→port): **0 colgantes**, **0 dependencias que no precedan a su
dependiente**. **0 fases con 0 runs.** `run_id` y `phase_id` únicos. Un solo run
`active` en todo el roadmap, como manda la convención observada (§11.a).

Referencias: [[D-047]] (el orden que esto revierte, y las compuertas que conserva),
[[D-046]] (la redacción original de O4), [[D-044]] (el `.aiw/` que no es estado
propio), [[D-043]] (`resolveInsideAiw` y la forma de `run_id`), y los dos records de
medición citados arriba.

Criterio de borrado: N/A.

## D-049 — 2026-07-25 — El envelope transporta el vocabulario y la regla de derivación; el resultado no viaja
Decisión **tomada en `O4.P2` y ya aplicada en código desde entonces**, nunca
registrada aquí. Se escribe seis piezas después de aplicarse, en el cierre de
registro que puso el papel al día: **no cambia nada en disco**, cierra un hueco de
registro. Evidencia:
`context/aiw-console/records/EMISOR-CARPETA-PROPIA-O4-P2.md` (Bloque B, donde se
tomó) y `context/aiw-console/records/VEREDICTO-ROADMAP-TREE-V1.md` (la medición
que la forzó).

**El problema medido.** El VEREDICTO midió que `roadmap_tree_v1` **no es
autodescriptivo**: el archivo trae `status: "active" | "completed" | "planned"`
pero **no trae en ninguna parte la lista de tokens válidos**
(`taxonomy_model in file: false`), y **la función que deriva el estado de un
objetivo o de una fase tampoco viaja** — el consumidor la tuvo que traer del
CONTRATO §12. Su conclusión desde el lado del lector: para un prototipo de un
proyecto es tolerable; para un shell que leerá árboles de N emisores, no.

**La decisión, en tres partes.**
1. **El VOCABULARIO viaja, completo y POR EJE.** `taxonomy_model` declara los
   cuatro vocabularios que el árbol pone en juego —`project.operational_status` y
   `run.status` (almacenados), `objective.status` y `phase.status` (derivados)—,
   cada uno con el eje que califica. El campo `axis` no es adorno: desarma la
   trampa que §11.c midió, que `active` y `blocked` existen en dos ejes distintos
   con significados distintos. Declarados por eje, un lector genérico ya no puede
   confundirlos **y no necesita saber de antemano de qué proyecto viene el
   archivo**.
2. **La REGLA DE DERIVACIÓN viaja como TABLA EJECUTABLE, no como resultado.**
   `taxonomy_model.derivations` transporta la precedencia de §12.a en forma de
   datos: `active` (any) → `blocked` (any) → `completed` (all) → `in_progress`
   (any) → `planned` (otherwise), con `empty_input: "malformed"`. Un lector que
   evalúe esa tabla en orden obtiene el mismo token que el emisor, y la suite lo
   prueba ejecutando la tabla **leída del archivo emitido** contra
   `deriveCollectionStatus` en los cinco casos.
3. **Lo que NO viaja: el RESULTADO.** Ningún objetivo y ninguna fase del árbol
   emitido lleva `status` ni contadores. Verificado por test sobre cada nivel.

**Por qué esto no contradice §12.c.** §12.c prohíbe **almacenar el resultado**, por
dos razones nombradas: la copia que se pudre y los dos consumidores que derivan a
su gusto. Esta decisión ataca las dos y no crea la primera — no se persiste ningún
token derivado (no hay copia que pudrir) y se publica la regla para que dos
consumidores no puedan divergir. **Declarar la FUNCIÓN es lo contrario de almacenar
su SALIDA.**

**Por qué declaración y comportamiento no pueden divergir.** La objeción legítima
—"la regla ya vive en el CONTRATO; el envelope la duplica"— se resuelve por dónde
vive la copia: la regla existe **UNA vez en el código**, el array
`COLLECTION_STATUS_RULES`. `deriveCollectionStatus` lo **ejecuta**;
`buildTaxonomyModel` lo **declara**. Son **el mismo array**, así que no pueden
divergir dentro del emisor ni con un error de tipeo. Es exactamente el defecto que
§17 midió en el modo 1 y que aquí no se reproduce: allá `OBJECTIVE_CLASSIFICATIONS`
y `OPERATIONAL_STATUSES` son literales que el emisor declara pero no usa —tan
desacoplados que `OPERATIONAL_STATUSES` declara un `blocked` que el cálculo real
**no puede producir nunca**—. Queda **una junta que el emisor no puede cerrar
solo**: entre el TEXTO del contrato y la TABLA del código. Es una junta humana
(enmendar §12 obliga a tocar la tabla) y el emisor la hace visible en vez de
taparla — `taxonomy_model.specified_by` apunta al documento normativo, ruta que
**no está horneada**: la declara el proyecto en `governance/contract.json` y el
puntero se emite solo si el archivo existe (§7).

**Ya está ejercitada por dos consumidores reales, y ése era el punto.** El shell
(`O4.P3`) lee el vocabulario y la regla **del propio archivo** y no conoce a ningún
emisor por su nombre; Cantu (`O4.P4`) entró como **segundo emisor** y el shell lo
renderizó sin aprenderse nada suyo. Sin esto, el shell tendría que hornear por
proyecto qué significan sus tokens y cómo derivar el estado de un objetivo — la
definición exacta de lo que el tramo entero existe para eliminar. La recomendación
2 del VEREDICTO —"la derivación debe ser código compartido, una sola
implementación"— sigue viva: el envelope garantiza que todos deriven **lo mismo**;
compartir la implementación es lo que evita escribirla N veces.

Referencias: [[D-048]] (que al retirar el prototipo ya anticipó que el snapshot
debía cargar `taxonomy_model`), [[D-039]] y [[D-040]] (las capas del contrato que
esto ejerce), CONTRATO §10.b, §11.c, §12.a/§12.c y §17.
Criterio de borrado: la sustituye una decisión que cambie qué viaja en el envelope.

## D-050 — 2026-07-25 — La edición deja de estar diferida: entra como fase nueva, antes de paridad y del corte
**Revierte el diferimiento de la edición que fijó [[D-034]].** Aquella decisión
acotó "consola estable" —deliberadamente, para no gold-platear— a: renderiza los
tres proyectos, leyendo de sus propios repos, roadmap + docs + status,
**READ-ONLY**, con "edición desde la consola, UX y features nuevas" explícitamente
**después**. Lo que se revierte es **sólo eso**: el diferimiento de la EDICIÓN. El
resto de D-034 —el orden consola-primero, la metodología de paralelismo, el reparto
packs/consola— **sigue en pie**, y la UX (`O4.P8`) **no** se adelanta con esto.

**Por qué, con su evidencia.** El operador, tras el **QA visual** de la consola
portada, pide la edición como lo más importante: **la consola global no puede
reemplazar a la de Cantu si no puede hacer lo que la de Cantu hace.** Y el corte
(`O4.P7`) es **irreversible**. La pérdida estaba **prevista y medida desde el
audit**: `AUDIT-CONSOLE-O4-PHASE0.md` **Bloque F.3** la nombró entera — lo que se
perdería el día del corte, si la consola global se lleva la consola pero **no** el
tooling de roadmap (que hoy sólo está en Cantu), es (a) el **endpoint** de escritura
desde la UI y (b) la capacidad de editar el roadmap **desde el navegador** con el
flujo dry-run→confirm. D-034 no ignoró esa pérdida: la difirió **antes** de que ese
audit existiera.

**Entra como FASE NUEVA: `O4.P12`**, "Escritura — la consola edita el roadmap
(dry-run→confirm) y sincroniza la historia", con
`RUN-CONSOLE-ESCRITURA-ROADMAP-HISTORY-001` (`planned`, prefijo `RUN-CONSOLE-` por
§10.d Regla 1.a). `phase_id` **opaco**: `O4.P12` es el siguiente id libre, **no una
posición** ([[D-047]]). **Alcance: las DOS rutas de escritura ausentes, y ninguna
más** — (1) **edición del roadmap** desde la UI con flujo dry-run (`apply:false`) →
confirm (`apply:true`), el flujo que la consola de Cantu ya tiene medido (endpoint
`/__project-console/roadmap/edit`, `handleRoadmapEdit`, que "writes nothing but the
canonical roadmap.json"); y (2) **history sync**, el endpoint que regenera la
historia git, hoy ausente **por construcción** — `project-console/serve.mjs` lo
declara en su propio encabezado: "no roadmap edit endpoint, no history sync
endpoint, no snapshot rebuild, no Git command, no watcher".

**Ubicación: lo SIGUIENTE.** Va después del cierre de registro y **antes de
`O4.P5`** (paridad), **`O4.P6`** (AIW tercer proyecto) y **`O4.P7`** (corte). Razón
de orden, no de gusto: pedirle paridad a una consola a la que le falta la mitad de
lo que el original hace es medir contra una vara equivocada, y el corte no procede
sin ella. El orden lo cargan **la posición en el array y `queue_order`**, no el
número del `phase_id`. **No se añadió ninguna arista `depends_on` nueva hacia
paridad, AIW ni corte:** la ubicación es orden, no compuerta, y este proyecto
declara `depends_on` sólo donde hay compuerta real ([[D-046]]).

**Esta decisión NO diseña la fase.** El encargo que la abre la **registra y la
ubica**; el diseño es trabajo suyo el día que se planee en detalle. Lo que sí
quedan fijados son **dos hechos medidos en disco el 2026-07-25** que la fase tendrá
que resolver, anotados aquí para que no se re-descubran:
- **(a) El motor de edición no está en este repo.** `roadmap-core.mjs`,
  `roadmap-plan.mjs` y `roadmap-edit.mjs` existen **SÓLO** en
  `cantu-studio/tools/roadmap/`; **`aiw-console/tools/roadmap/` NO EXISTE**. En
  Cantu, endpoint y CLI comparten la **misma** orquestación `roadmap-plan.mjs`
  sobre `roadmap-core.mjs` — de modo que lo que falta aquí es **el motor entero**,
  no un endpoint encima de un motor presente.
- **(b) La ruta del roadmap canónico difiere por proyecto.** En `aiw-console` es
  `roadmap/roadmap.json`; en `cantu-studio` es `.aiw/roadmap/roadmap.json`. Un
  escritor multiproyecto **no puede hornear una ruta**: la resuelve por proyecto,
  como el emisor ya resuelve el layout por la FORMA del root. **Corolario que
  ninguno de los dos deja negociar:** `.project/` es **DERIVADA** (§1.b, §2, §18) y
  **NO es destino de escritura** — se escribe el canónico y se re-emite; escribir
  en `.project/` sería editar la copia que se pudre, que es el modo de fallo contra
  el que el contrato entero existe.

**Puerta ya preparada, y es trabajo que no hay que rehacer.** El ACABADO del port
dejó el botón *Edit roadmap* **`hidden`, no borrado**, conservando el elemento con
su `id`, el call site, el sondeo del endpoint, el texto de la negativa y **el modal
de edición entero**: restaurarlo el día que exista ruta de escritura **es borrar un
atributo** (`records/ACABADO-DOCS-Y-EMISOR-GIT-HISTORY.md`, Bloque C).

Referencias: [[D-034]] (lo que esto revierte, y lo que de ella sigue en pie),
[[D-047]] (identidad opaca de `phase_id`; y la compuerta paridad+UI/UX → corte, que
esto **no** toca), [[D-048]] (el orden vigente de O4 sobre el que esto inserta),
[[D-049]] (la otra decisión escrita en el mismo cierre de registro),
`records/AUDIT-CONSOLE-O4-PHASE0.md` Bloque F.3 (la pérdida prevista),
`records/ACABADO-DOCS-Y-EMISOR-GIT-HISTORY.md` Bloque C (el botón oculto).
Criterio de borrado: N/A (abre una fase; la sustituye una decisión futura).

## D-051 — 2026-07-27 — Carriles y barriers en el roadmap: vocabulario por proyecto, posición derivada, barrier como regla
**Cambio de contrato** (CONTRATO §10.e, decisiones `w`–`z` de la capa 2) que los
tres proyectos heredan. Motivación medida por el operador: el roadmap solo podía
expresar una fila india — trabajo que no compite (construir un componente,
documentar el anterior) se escribía como si dependiera, y el orden de la cola
sugería restricciones falsas. El principio: separar lo que no depende de
funcionalidad para trabajarlo en paralelo; la dependencia entre carriles crea
RETRASO de un run, no bloqueo de su carril.

**Lo decidido, en cinco piezas.**
1. **El vocabulario de carriles lo declara el PROYECTO** (`root.lanes`, opcional:
   `{lane_id, title, default?}` con exactamente UN default explícito — no
   posicional, porque reordenar la declaración no puede re-alojar runs). Mismo
   patrón que [[D-049]]: el proyecto declara, el consumidor obedece, cero carriles
   horneados (pin de suite: grep de las claves del fixture sobre motor, emisor,
   server y renderer = 0). Viaja en el envelope DENTRO de `roadmap_tree`, verbatim
   y una sola vez; no se duplica en `taxonomy_model` (dos copias divergen — y a
   diferencia de los status, este vocabulario es dato del árbol, no constante del
   emisor).
2. **`lane` es opcional en el dato y ausente resuelve al default AL LEER**: los
   tres roadmaps reales siguen válidos sin migrar un byte (verificado: md5
   idénticos, DOM idéntico, cero superficies nuevas sin `lanes` declarado). Un
   proyecto sin paralelismo tiene un carril implícito: el caso simple es el
   general degenerado.
3. **`queue_order` sigue global, denso y único; la posición del carril se DERIVA
   filtrando y no se almacena en ninguna parte** (§12: lo derivable no se
   persiste). Etiqueta por CLAVE + posición (`DEV-12`), estable al declarar
   carriles nuevos (probado).
4. **BARRIER se deriva de UN campo** (`barrier: "lane"|"global"`), nunca de
   aristas materializadas (el caso motivador —45 runs tras 5— serían 225 aristas a
   mano; el fixture prueba 5 almacenadas donde la materialización exigiría 13).
   Retiene el ARRANQUE de runs `planned` posteriores por `queue_order` (global) o
   por carril resuelto (`lane`); `active`/terminales conservan su verdad
   almacenada; las `depends_on` normales no cambian; dos barriers → se nombra el
   más temprano incompleto (la frontera activa) y se cuenta el resto; barrier con
   `depends_on` es ordinario; ningún barrier cruza archivos. El GLOBAL es visible
   y distinguible del de carril en toda superficie — sincronizar todo es legítimo
   pero nunca cómodo. La consola NOMBRA el barrier que retiene ("Barrier
   FORJA-04 (global barrier)"), jamás un "bloqueado" a secas (§20).
5. **Invariantes nuevos en el motor** (la allowlist creció: `lanes` en raíz,
   `lane`/`barrier` en run): forma del vocabulario, todo `lane` usado declarado,
   `barrier` en vocabulario cerrado, y satisfacibilidad — con el TEOREMA
   registrado: bajo la precedencia estricta de `depends_on`, un barrier
   insatisfacible es IMPOSIBLE de escribir (las dependencias apuntan atrás, el
   barrier retiene adelante); el chequeo guarda la construcción y dispara junto a
   la violación de precedencia nombrando el deadlock (probado en dry-run por
   HTTP). Op nueva `set-lane` (asignar/limpiar carril; batchable), expuesta en el
   modal de edición SOLO cuando el proyecto declara carriles. Los barriers, por
   ahora, se escriben editando el canónico a mano — dicho como pendiente, no
   implícito.

**Impacto medido sobre el tooling local de cantu-studio (NO se tocó).** Su motor
(`cantu-studio/tools/roadmap/roadmap-core.mjs:27,36`) y su validador
(`tools/project-console/validate-project-console-state.mjs:810-815`, rechazos en
`:966-968` y `:1018-1021`) llevan allowlists propias SIN estos campos: ejecutados
en memoria contra su canónico decorado con carriles devuelven "root carries
unexpected field lanes" / "carries unexpected field lane|barrier" — un roadmap de
Cantu con carriles deja de ser editable por su consola local y falla su
validador. Contexto que abarata la decisión: su motor YA no puede editar su
propio canónico hoy (la arista externa de §10.d, medida en O4.P12 y reproducida
ahora), y el corte (`O4.P7`) retira ese tooling. La cabina decide al migrar
Cantu: actualizar su tooling o aceptar que solo la consola global lo edite hasta
el corte.

**Verificación.** Suite 215/215 (23 tests nuevos); A/B en memoria contra el
proyector pre-enmienda: modo 1 (aiw) y modo 2 (ambos roots reales) IDÉNTICOS
salvo `generated_from` (0.8.0→0.9.0, movida por §6); DOM verificado a 1280 y 1920
sin scroll horizontal y con el ancho de subvistas de la fase anterior intacto
(962.4 / 1602.4 en ambas subvistas de ambos proyectos reales); canónicos
byte-idénticos (md5) y `cantu-studio` con `git status --porcelain` vacío antes y
después. Evidencia completa: `context/aiw-console/records/CARRILES-Y-BARRIERS-ROADMAP.md`.

**Fuera de esta decisión:** BATCH (otro eje — supervisión, no paralelismo — con
reglas sin definir; meter dos campos a la vez sobre la allowlist duplicaba el
riesgo); migrar cualquier roadmap real (los carriles de cantu-studio los escribe
el operador después, viéndolos aparecer); columnas lado a lado o cualquier diseño
más allá del selector y las etiquetas (se decide con roadmaps reales enfrente).

Referencias: [[D-049]] (el patrón de vocabulario declarado), [[D-050]] (el motor
y la ruta de escritura que esto extiende), CONTRATO §10.a, §10.e, §12, §20.
Criterio de borrado: la sustituye una decisión que cambie el modelo de carriles o
adopte batch sobre estos campos.
