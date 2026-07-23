# AIW — Roadmap (temporal)

Semilla del futuro `.aiw/roadmap/roadmap.json` (v3). Vive en el repo `aiw\` y se
convierte a JSON cuando exista el tooling de la consola global. Hasta entonces,
este archivo ES el estado estructurado de AIW. Desde 2026-07-22 el repo `aiw` se
sincroniza como knowledge del proyecto Claude (D-034), así que ya NO se pega a
mano — pero el espejo se pudre con cada push sin sync: si el operador no confirma
el sync, lo leído del knowledge es `[NO VERIFICADO]`.

División con `ESTADO.md`: aquí vive el BACKLOG (qué hay y en qué estado); en
`ESTADO.md` vive el estado de SESIÓN (dónde quedamos, se reescribe al cierre).

Vocabulario v3: `planned | active | completed | blocked`. Todos los runs de este
roadmap son categoría **manual** (D-029) mientras dure la regla anti-auto-hosting:
el kernel jamás ejecuta sobre AIW; los runs contra `aiw-console` sí son
delegables al kernel cuando se retome ese flujo.

---

## O1 — Casa en orden (migración al workspace único, D-031) — **COMPLETADO**

Destino alcanzado y verificado en AMBAS máquinas (PC DESKTOP-525K0IS y laptop
DESKTOP-1IJ3DOT): `Documents\AIW_Workspace\` con `aiw\` al nivel raíz (el
SISTEMA — lo único que el kernel jamás ejecuta) y `projects\` como PORTAFOLIO
(aiw-console, cantu-studio, cantu-lessons y los futuros). Ambos workspaces
viejos demolidos. Puerta respetada en todo momento: nada se movió ni borró sin
respaldo remoto verificado.

- **Respaldo remoto del v2** — `completed`
  `ChrissValdez/aiw` (privado), push verificado.
- **Respaldo remoto de aiw-console** — `completed`
  `ChrissValdez/aiw-console` (privado), toda la historia del dogfood en GitHub.
- **Esqueleto + mudanza de aiw y aiw-console** — `completed`
  Vía robocopy /COPY:DAT con conteos verificados y orígenes borrados.
  `config.json` corregido (rutas al workspace nuevo) y commiteado.
- **Retiro del Legacy** — `completed`
  Respaldo de refugio primero (D-032): 4 stashes -> ramas `refuge/*` en origin
  (incluían DOS runs de AIW completos, ~21k líneas) + rama backup con commit
  único. Luego DIAGNÓSTICO DE IDENTIDAD read-only (Claude Code, reporte en
  `_reference/DIAGNOSTICO-LEGACY-V1-IDENTIDAD-Y-RETIRO.md`): el Legacy es el
  sistema v1 COMPLETO y autónomo (687 commits, ~845 .js), **sin una sola línea
  de historia git compartida con el v2** (raíces y repos GitHub distintos, cero
  SHAs cruzados) y **sin dependencia de código**; el v2 nació de cero el
  2026-07-10, ~4 h después del último commit v1. "Congelado desde 2026-07-09" es
  VERDADERO con fecha exacta. Veredicto: seguro retirar
  (`rev-list --all --not --remotes = 0`). Ejecutado: worktree removido, local
  borrado, renombrado a `aiw-v1-legacy` en GitHub y ARCHIVADO (read-only).
  La trampa de identidad queda cerrada: ya no hay dos AIW en disco.
- **Mudanza + rename de Cantu Studio y Lessons** — `completed`
  Candado `NOT_PHYSICAL_MIGRATION_AUTHORIZED` levantado por el operador. Un
  ticket de Claude Code con Phase 0 en disco: `cantu-studio` y `cantu-lessons`
  (repo GitHub + carpeta + remote + ruta funcional a Lessons en
  `start-editor.ps1:22` + prosa de gobernanza viva + generador de contexto +
  bloque del checkout fantasma en AGENTS.md). QA de operador PASADO: launcher
  arranca, storage resuelve a `cantu-lessons`, lecciones Web y Slide cargan.
  Commit y push por el operador (guardrail `no-agent-git-mutation` respetado).
- **Consolidación de `main` en Cantu Studio** — `completed`
  `main` era un fósil; la rama de trabajo tenía 138 commits por delante y CERO
  divergencia (base común = HEAD de main). Fast-forward puro + push. Cae un
  PREREQUISITO declarado para conectar AIW a Cantu.
- **Retiro del checkout monitoreado viejo** — `completed`
  Sus 2 stashes (experimentos de UI de consola, "unaccepted") respaldados como
  ramas `refuge/*` en origin ANTES de borrar, con método aditivo que no tocó
  main ni los stashes originales.
- **Limpieza y demolición de cascarones** — `completed`
  Artefactos sueltos clasificados (D-033): descartado el historial del workaround
  manual del Legacy (`_manual_prompts` 437 MB, `_operator_requests`,
  `_local_tool_backups`, scratch); preservados en `_reference/` los diagnósticos.
  `AI_Workflow_Workspace/` y `JAME_Parallel_Workspace/` DEMOLIDOS en ambas
  máquinas (en la PC hizo falta robocopy /MIR contra carpeta vacía por rutas
  >260 chars, y matar handles por PID).
- **Actualizar GitHub Desktop** — `completed` (ambas máquinas, 4 repos).
- **Replicar estructura en la laptop** — `completed`
  Censo previo (halló repos en OneDrive y un worktree `.claude` vivo), limpieza
  verificada, y los 4 repos clonados de GitHub a su carpeta. `cantu-studio`
  clonó `main` ya consolidado.

## O2 — Run autónomo confiable (kernel)

- **D-028: check de pre-flight de scope** — `planned`
  "El scope debe matchear ≥1 archivo real del repo objetivo." Cierra la única
  fuga conocida (dedazo disfrazado de BLOCKED). Pequeño, con test.
- **Estrés en repo grande** — `planned`
  Todo lo aprobado fue sobre repos chicos en ronda 1. El primer objetivo real
  contra una superficie con red de tests es la medición, no un doc.

## O3 — Categorías y batches (D-029/D-030 → código)

- **Campo de categoría + closeout diferenciado** — `planned`
  El objetivo declara manual/semi-autónomo/autónomo; el kernel actúa distinto en
  el cierre según la categoría (parar en safepoint vs AI-completed y seguir).
- **Activación de push por proyecto** — `planned`
  Semi y autónomos pushean su rama `aiw/*` del repo del proyecto al llegar a
  AI-approved. Hoy push está apagado en todos los proyectos.
- **Batch→rama en la cola** — `planned`
  El operador agrupa runs en batches al encolar; el batch determina la rama.

## O4 — Consola global (migrará a su propio roadmap cuando nazca)

- **Merge de 005 en aiw-console** — `completed`
  La honestidad de estados del proyector (ERROR/HUMAN_REVIEW → blocked,
  parked → Later, títulos desde `# Objective`). Verificado por tests ANTES de
  mergear: rama de 005 con 31 tests verdes (5 archivos), re-verde en main tras
  merge `--no-ff` (`29c9478`), pusheado. Ajuste de acoplamiento de la mudanza:
  `projects.config.json` corregido `"../aiw"`→`"../../aiw"` (el kernel subió un
  nivel al mudarse). **La consola de AIW ENCIENDE**: el server
  (`serve-project-console.mjs`, puerto 8787) re-proyecta al arrancar (project=aiw,
  objectives=16), Overview/Roadmap/Cola vivas con datos reales, QA visual de
  operador OK. 006 ya estaba mergeado de antes.
  Pulidos MENORES pendientes (no bloquean): banner "some optional local state
  files could not be loaded" (archivos de estado local gitignoreados que no se
  movieron; benigno), y el diseño se ve algo desplazado (probable caché/estado).
  Se atienden en la fase de consola maestra.
**SECUENCIA ACORDADA (D-034) — la consola es lo SIGUIENTE y va primero.** Razón:
no es solo que dé orden de trabajo, es que la consola es la CONDICIÓN que hace
seguro el modelo de 3 conversaciones en paralelo (sin ella, cada conversación
lee packs pegados a mano y las verdades divergen). Definición de "consola
estable" = renderiza los tres proyectos, leyendo de sus propios repos,
roadmap + docs + status, READ-ONLY. Nada más; edición y UX vienen después y ya
pueden ir en paralelo.

- **1. Audit / Phase 0 de la migración** — `planned` — SIGUIENTE
  Read-only. Qué hace la consola hoy vs qué necesita la maestra, y los tres
  acoplamientos que la atan a Cantu: anchors del validator sobre el fuente de la
  consola, endpoint de edición (tooling Cantu-local), regex `RUN-JAME-` del
  history builder. Sale un MAPA, no código. Con el sync del repo, buena parte de
  la lectura la hace la cabina; lo que sea hecho de disco se verifica igual.
- **2. Contrato de normalización** — `planned`
  Qué expone un proyecto y DÓNDE, para que la consola lo lea igual en los tres
  (roadmap v3, docs canónicos, status). Es la decisión de diseño de la que cuelga
  todo. **Aquí se resuelve el desorden de contextos de AIW**: al definir qué es
  canónico, qué derivado y qué histórico, el criterio de limpieza sale solo.
- **3. Los tres roadmaps al contrato** — `planned`
  Cantu ya está en v3; AIW pasa de markdown temporal a JSON v3; el de la consola
  nace. Incluye migrar al roadmap de la consola los runs que hoy viven en el de
  Cantu (`RUN-CANTU-PROJECT-CONSOLE-*`): pocos e identificables, PERO los
  `run_id` son identidad inmutable (conservan su nombre) y `queue_order` es
  global y contiguo, así que sacarlos obliga a renumerar con tabla de remap.
- **4. La consola los lee** — `planned` (ver pantalla multi-proyecto, abajo).
- **Context pack de la consola** — `planned`
  Lleva REGLAS, no el plan (el plan es estado y vive en este roadmap): qué es la
  consola, el peligro del validador que asserta texto fuente, qué es derivado vs
  canónico, la estructura de carpetas como regla.
- **Digest para la cabina** — `planned`
  Una vista más del proyector: UN archivo con el estado de los tres proyectos
  (HEAD+rama+sucio, conteos por estado, runs activos, siguiente paso, no-claims),
  fechado y con SHA para detectar obsolescencia. Chico, derivado, jamás editado a
  mano. Con el sync del repo ya no es prerequisito: es optimización de contexto.
- **Consola global en aiw-console** — `planned`
  Base: la consola de Cantu (la más avanzada). Se levanta AL LADO de la local,
  apuntando a Cantu en read-only primero. La local no se toca hasta paridad.
- **Pantalla multi-proyecto** — `planned`
  Proyectos: Project Console, AIW, Cantu Studio (y los que vengan). AIW aparece
  como proyecto de runs manuales renderizado — el kernel nunca lo ejecuta.
- **Paridad y corte** — `planned`
  Cuando la global renderice y edite igual que la local, la local se retira como
  acto deliberado y registrado. Features nuevas (batches, UI) solo en la global.

## O5 — Metodología

- **Conversión del proyecto Claude** — `completed`
  Packs de gobernanza + roadmap como knowledge, instrucciones nuevas, estado
  fresco por conversación, prompt de reinicio. AMPLIADO (D-034): el repo `aiw` se
  sincroniza como knowledge, así que la cabina lee el repo real en vez de recibir
  pegados. Disciplina asociada: push -> sync; sin confirmación de sync, lo leído
  es `[NO VERIFICADO]`.
- **Metodología de 3 proyectos en paralelo** — `planned` (gated por la consola)
  UNA sola Project de Claude con 3 conversaciones abiertas (aiw, aiw-console,
  cantu-studio), no tres Projects — porque la frontera ENTRE proyectos es
  gobernanza que la cabina necesita ver (AIW ejecuta sobre Cantu, la consola
  renderiza a ambos). Reparto: **los packs cargan reglas; la consola y el repo
  cargan estado**. Así el cierre de cada conversación es ligero (commit +
  roadmap), no un ritual de sincronizar tres documentos. NO se abre hasta que la
  consola esté estable (ver O4): sin ella, tres conversaciones producen tres
  verdades divergentes.
- **Normalización de vocabulario de categorías** — `planned`
  Supervised/Semi-supervised/Delegable (pack Cantu) vs manual/semi-autónomo/
  autónomo (D-029): un solo nombre debe ganar, enmendado en ambos packs.
- **Roadmaps → JSON v3** — `planned`
  Este archivo y el de la consola se convierten al schema real cuando el tooling
  exista. AIW entra a la consola con su roadmap de verdad.

## O6 — Modo nocturno (horizonte; gated por O2 y O3)

- **Lanzador de cola desacoplado** — `planned`
  Hoy la cola muere con su terminal. Sin esto, ninguna noche desatendida es
  segura. No se construye hasta que el run autónomo sea confiable (O2).
- **Recuperación de lock huérfano** — `planned`
- **Noches desatendidas reales (criterio D-018)** — `planned`
  El contador honesto está en cero. Se mide corriéndolas, no declarándolas.

---

Nota de frontera: los tres pasos lado Cantu de O1 (mudanza+rename de Studio y
Lessons, retiro del checkout viejo) se EJECUTAN bajo gobierno de Cantu — runs en
su roadmap, Phase 0, QA de operador, candado levantado explícitamente — aunque
esta migración los ordene. La consolidación de la rama paralela a main de Cantu
NO es parte de la migración: sigue siendo trabajo de Cantu con su propio
Phase 0, y sigue siendo prerrequisito para conectar AIW (pack de Cantu). La
mudanza no toca ramas.
