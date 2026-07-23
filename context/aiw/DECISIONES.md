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