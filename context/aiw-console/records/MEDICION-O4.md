# MEDICIÓN O4 — el objetivo "Consola global" en el roadmap de AIW

Estado: MEDICIÓN read-only, fechada **2026-07-24** (fecha del sistema, no asumida).
No es contrato ni decisión ni conversión: mide el estado en disco de O4 como
insumo de su futura conversión al roadmap de `aiw-console`. **Solo mide. No
convierte, no redacta roadmap.** No se escribió ni editó ningún roadmap. No se
tocó `CONTRATO.md`, `DECISIONES.md` ni ningún record existente. **No se ejecutó
git en ninguna forma.**

## Nota de verificación

Rutas relativas a la raíz de trabajo `C:\Users\chris\Documents\AIW_Workspace`.
Toda afirmación lleva cita `archivo:línea` o medición en disco (`stat` de `mtime`,
read-only). Lo no comprobable desde disco en esta sesión se marca
**[NO VERIFICADO]**. Archivos leídos completos antes de redactar:

- **RM-AIW** = `projects/aiw-console/context/aiw/roadmap_AIW_temp.md`
  (`mtime` `2026-07-23T12:54:06`).
- **CONTRATO** = `projects/aiw-console/context/aiw-console/CONTRATO.md`
  (`mtime` `2026-07-24T03:09:41`) — capas 1 y 2.
- **RM-CONSOLE** = `projects/aiw-console/roadmap/roadmap.json`
  (`mtime` `2026-07-24T02:23:50`).
- **HANDOFF** = `projects/aiw-console/context/handoffs/aiw-console.md`
  (`mtime` `2026-07-23T14:07:34`).
- **DECISIONES** = `projects/aiw-console/context/DECISIONES.md`
  (`mtime` `2026-07-24T03:09:02`).
- **MIGRACION-O0** = `projects/aiw-console/context/aiw-console/records/MIGRACION-O0.md`.

> **Aviso de homonimia — CRÍTICO para leer esta medición.** Hay **dos** objetos
> distintos llamados «O4» en este repo, y no son el mismo:
> 1. **O4 de AIW** = "Consola global", en RM-AIW:98. **Es el objeto de esta
>    medición.** Tiene 10 unidades de trabajo (§3).
> 2. **O4 de Cantu** = un objetivo del roadmap v3 de Cantu con **1** run, que
>    aparece en la tabla de derivación de CONTRATO:1293 (`| 5 | O4 | 1 | …`) y en
>    `MEDICION-ROADMAP-V3.md`. **NO es el de esta medición.**
>
> Cada vez que abajo se cite un «O4» de CONTRATO o de la medición del roadmap de
> Cantu, se dice explícitamente. Confundirlos invalida los puntos 4 y 5.

---

## 1. Dónde vive el roadmap de AIW y en qué formato

**Fuente única y vigente: RM-AIW, Markdown.** El propio archivo se autodescribe:
"Hasta entonces, este archivo ES el estado estructurado de AIW" (RM-AIW:4-5). Es
una **semilla** del futuro `.aiw/roadmap/roadmap.json` v3 que "se convierte a JSON
cuando exista el tooling de la consola global" (RM-AIW:3-4). Vocabulario declarado:
`planned | active | completed | blocked` (RM-AIW:13).

### Candidatos y su papel (fuente vs derivado)

| Archivo | Formato | Papel | Contiene O4 (Consola global) |
|---|---|---|---|
| RM-AIW (`context/aiw/roadmap_AIW_temp.md`) | Markdown | **FUENTE** del roadmap de AIW | **SÍ** — RM-AIW:98-157 |
| `projects/aiw-console/.aiw/views/roadmap.json` | JSON | **DERIVADO** — 16 objetivos que el proyector deriva de `aiw/objectives/` (CONTRATO:589, :620-623) | NO — describe los *objectives* del kernel, no los O1..O6 del backlog |
| `projects/aiw-console/.aiw/roadmap/roadmap.json` | JSON | **DERIVADO** — copia de entrega byte-idéntica del anterior (patrón canónico+copia, CONTRATO:591, :819-820) | NO |
| `aiw/.aiw/project_console.snapshot.json` | JSON | **DERIVADO stale** — snapshot del proyector, modelo `aiw_flat_objectives_v1` (CONTRATO:469, :649); residuo a limpiar (HANDOFF:165) | NO |
| RM-CONSOLE (`projects/aiw-console/roadmap/roadmap.json`) | JSON `roadmap_tree_v1` | **Roadmap propio de `aiw-console`**, nacido 2026-07-24 con la migración de O0 (§7); NO es el roadmap de AIW | NO — solo O0 hoy |

**Conclusión:** el roadmap de AIW vive **solo** en RM-AIW, en Markdown. Los cuatro
JSON son proyecciones o roadmaps de otro proyecto; **ninguno** transporta O4
"Consola global". El JSON v3 del modelo canónico (`roadmap_tree`) aún **no
existe** para AIW: "AIW pasa de markdown temporal a JSON v3" es trabajo pendiente,
declarado por el propio O4 (RM-AIW:134) y por O5 (RM-AIW:179-181).

### El pendiente de reconciliación del audit — ¿sigue vigente?

HANDOFF:158-160 registra un pendiente: reconciliar RM-AIW contra disco, nombrando
dos discrepancias — "Merge de 005 en aiw-console" en `planned` y "Respaldo remoto
del v2" en `active`.

**Medido en disco hoy: ambas ya están corregidas en RM-AIW.**

- "Merge de 005 en aiw-console" figura `completed` (RM-AIW:100), no `planned`.
- "Respaldo remoto del v2" figura `completed` (RM-AIW:29), no `active`.

El archivo en disco **ya carga los valores que la reconciliación produciría**. Es
decir: para esas dos entradas, el pendiente **no está vigente contra el disco
actual** — el disco ya está reconciliado.

Matiz honesto: HANDOFF (`mtime` `…14:07:34`) es **posterior** a RM-AIW
(`mtime` `…12:54:06`) y aun así describe las dos entradas con los valores viejos.
Si el arreglo se aplicó antes de las 12:54 y el handoff quedó inexacto, o si hubo
otra secuencia, es **[NO VERIFICADO]**: requeriría historia git, que esta sesión
no consulta. Lo cierto de disco es lo de arriba. El tercer sub-item del pendiente
—"Retirar el no-claim `NOT_REMOTE_BACKED`" (HANDOFF:160)— vive en archivos de
no-claims fuera de RM-AIW; **[NO VERIFICADO]** si se retiró (no se localizó ni
midió en este encargo).

---

## 2. Contenido completo de O4 — transcripción fiel

Transcripción literal de RM-AIW:98-157 (el bloque del objetivo O4, incluida la
prosa de secuencia intercalada). No es paráfrasis.

> ```
> ## O4 — Consola global (migrará a su propio roadmap cuando nazca)
>
> - **Merge de 005 en aiw-console** — `completed`
>   La honestidad de estados del proyector (ERROR/HUMAN_REVIEW → blocked,
>   parked → Later, títulos desde `# Objective`). Verificado por tests ANTES de
>   mergear: rama de 005 con 31 tests verdes (5 archivos), re-verde en main tras
>   merge `--no-ff` (`29c9478`), pusheado. Ajuste de acoplamiento de la mudanza:
>   `projects.config.json` corregido `"../aiw"`→`"../../aiw"` (el kernel subió un
>   nivel al mudarse). **La consola de AIW ENCIENDE**: el server
>   (`serve-project-console.mjs`, puerto 8787) re-proyecta al arrancar (project=aiw,
>   objectives=16), Overview/Roadmap/Cola vivas con datos reales, QA visual de
>   operador OK. 006 ya estaba mergeado de antes.
>   Pulidos MENORES pendientes (no bloquean): banner "some optional local state
>   files could not be loaded" (archivos de estado local gitignoreados que no se
>   movieron; benigno), y el diseño se ve algo desplazado (probable caché/estado).
>   Se atienden en la fase de consola maestra.
> **SECUENCIA ACORDADA (D-034) — la consola es lo SIGUIENTE y va primero.** Razón:
> no es solo que dé orden de trabajo, es que la consola es la CONDICIÓN que hace
> seguro el modelo de 3 conversaciones en paralelo (sin ella, cada conversación
> lee packs pegados a mano y las verdades divergen). Definición de "consola
> estable" = renderiza los tres proyectos, leyendo de sus propios repos,
> roadmap + docs + status, READ-ONLY. Nada más; edición y UX vienen después y ya
> pueden ir en paralelo.
>
> - **1. Audit / Phase 0 de la migración** — `planned` — SIGUIENTE
>   Read-only. Qué hace la consola hoy vs qué necesita la maestra, y los tres
>   acoplamientos que la atan a Cantu: anchors del validator sobre el fuente de la
>   consola, endpoint de edición (tooling Cantu-local), regex `RUN-JAME-` del
>   history builder. Sale un MAPA, no código. Con el sync del repo, buena parte de
>   la lectura la hace la cabina; lo que sea hecho de disco se verifica igual.
> - **2. Contrato de normalización** — `planned`
>   Qué expone un proyecto y DÓNDE, para que la consola lo lea igual en los tres
>   (roadmap v3, docs canónicos, status). Es la decisión de diseño de la que cuelga
>   todo. **Aquí se resuelve el desorden de contextos de AIW**: al definir qué es
>   canónico, qué derivado y qué histórico, el criterio de limpieza sale solo.
> - **3. Los tres roadmaps al contrato** — `planned`
>   Cantu ya está en v3; AIW pasa de markdown temporal a JSON v3; el de la consola
>   nace. Incluye migrar al roadmap de la consola los runs que hoy viven en el de
>   Cantu (`RUN-CANTU-PROJECT-CONSOLE-*`): pocos e identificables, PERO los
>   `run_id` son identidad inmutable (conservan su nombre) y `queue_order` es
>   global y contiguo, así que sacarlos obliga a renumerar con tabla de remap.
> - **4. La consola los lee** — `planned` (ver pantalla multi-proyecto, abajo).
> - **Context pack de la consola** — `planned`
>   Lleva REGLAS, no el plan (el plan es estado y vive en este roadmap): qué es la
>   consola, el peligro del validador que asserta texto fuente, qué es derivado vs
>   canónico, la estructura de carpetas como regla.
> - **Digest para la cabina** — `planned`
>   Una vista más del proyector: UN archivo con el estado de los tres proyectos
>   (HEAD+rama+sucio, conteos por estado, runs activos, siguiente paso, no-claims),
>   fechado y con SHA para detectar obsolescencia. Chico, derivado, jamás editado a
>   mano. Con el sync del repo ya no es prerequisito: es optimización de contexto.
> - **Consola global en aiw-console** — `planned`
>   Base: la consola de Cantu (la más avanzada). Se levanta AL LADO de la local,
>   apuntando a Cantu en read-only primero. La local no se toca hasta paridad.
> - **Pantalla multi-proyecto** — `planned`
>   Proyectos: Project Console, AIW, Cantu Studio (y los que vengan). AIW aparece
>   como proyecto de runs manuales renderizado — el kernel nunca lo ejecuta.
> - **Paridad y corte** — `planned`
>   Cuando la global renderice y edite igual que la local, la local se retira como
>   acto deliberado y registrado. Features nuevas (batches, UI) solo en la global.
> ```

Contexto de cabecera aplicable a O4 (no dentro del bloque, pero lo rige):
RM-AIW:13-16 declara vocabulario `planned|active|completed|blocked` y que **todos**
los runs son categoría **manual** (D-029), con el matiz de que "los runs contra
`aiw-console` sí son delegables al kernel cuando se retome ese flujo" (RM-AIW:15-16).

---

## 3. Estructura de O4

### ¿Fases declaradas? **NO.**

O4 **no tiene ninguna fase declarada**. No hay encabezados de fase, ni ids de
fase, ni agrupación bajo fases dentro de RM-AIW:98-157. Las diez unidades cuelgan
directas del encabezado del objetivo como una lista plana de bullets, más un
párrafo de secuencia intercalado (la "SECUENCIA ACORDADA", RM-AIW:114-120), que es
prosa de justificación, no una fase.

### Unidades de trabajo: **10 bullets — prosa con título, NO runs identificables**

No son runs en sentido formal: ninguna lleva `run_id`, `queue_order` ni los demás
campos de §10.a de CONTRATO. Son **bullets en prosa**, cada uno con un título en
negrita y un token de status entre backticks. Son *identificables* como ítems
discretos, pero como candidatos-a-run, no como runs. Enumeración con su texto-guía:

| # | Título (negrita) | Línea | Status escrito |
|---|---|---|---|
| 1 | Merge de 005 en aiw-console | RM-AIW:100 | `completed` |
| 2 | 1. Audit / Phase 0 de la migración | RM-AIW:122 | `planned` — SIGUIENTE |
| 3 | 2. Contrato de normalización | RM-AIW:128 | `planned` |
| 4 | 3. Los tres roadmaps al contrato | RM-AIW:133 | `planned` |
| 5 | 4. La consola los lee | RM-AIW:139 | `planned` |
| 6 | Context pack de la consola | RM-AIW:140 | `planned` |
| 7 | Digest para la cabina | RM-AIW:144 | `planned` |
| 8 | Consola global en aiw-console | RM-AIW:149 | `planned` |
| 9 | Pantalla multi-proyecto | RM-AIW:152 | `planned` |
| 10 | Paridad y corte | RM-AIW:155 | `planned` |

Reparto de status: **1 `completed`, 9 `planned`** (uno de ellos marcado además
"SIGUIENTE"). Nótese la numeración interna heterogénea: cuatro bullets llevan
prefijo "1.".."4." (unidades 2-5) y seis no. Esa numeración 1-4 es de la cabina,
no es `queue_order`, y **no coincide** con los nueve tramos del plan de trabajo
(§6): los tramos son otra descomposición.

---

## 4. Qué le falta a O4 para cumplir la capa 2 del contrato

Convención de este punto, exigida por el encargo:

- **Acuñar** = crear un identificador para algo que **ya existe** en la fuente
  (p. ej. dar un `run_id` a un bullet que ya tiene título y prosa).
- **Inventar** = crear contenido que **no está** en la fuente (p. ej. una
  estructura de fases que el documento no declara, o valores nuevos).

Contraste contra las claves del modelo canónico `roadmap_tree` (CONTRATO §10.a):
**9 de run, 3 de fase, 3 de objetivo.**

### 4.1 Las 9 claves de run (CONTRATO:692-702)

| Clave | ¿Existe en O4 hoy? | Veredicto |
|---|---|---|
| `run_id` | NO | **ACUÑAR** — cada bullet es identificable y tiene título; darle id es acuñar, no inventar. Sujeto a Regla 1 (§10.d): unicidad global (§7). |
| `queue_order` | NO | **INVENTAR** (asignar). El valor no está en la fuente; debe generarse como entero global, único y contiguo, encajando tras los 1..12 de O0 en RM-CONSOLE (§7). El *orden* de los bullets sugiere secuencia, pero el número es dato nuevo. |
| `title` | SÍ (negrita de cada bullet) | Existe. A lo sumo limpiar el prefijo "1.".."4." decorativo. |
| `summary` | PARCIAL | La prosa existe pero no separada. Un `summary` de una línea distinto del `full_description` habría que **redactarlo desde** la prosa existente: acuñar/derivar el recorte, no inventar de cero. |
| `full_description` | SÍ (la prosa de cada bullet) | Existe como texto; mapea directo. |
| `status` | SÍ (token por bullet) | Existe; token dentro del vocabulario cerrado de §11.a. |
| `depends_on` | NO explícito | **ACUÑAR desde prosa** (parcial) + **INVENTAR** (parcial). La fuente declara ordenamientos en prosa ("SIGUIENTE", "va primero", "no se toca hasta paridad", numeración 1-4, "gated por la consola"); traducir esas frases a aristas `run_id` es acuñar. Donde la prosa no fija dependencia, cualquier arista es invención. |
| `closeout_result` | NO (opcional, §14) | Ausente es válido. No hace falta. |
| `progress` | NO (opcional, §15) | Ausente es válido. No hace falta. |

Además, las dos claves RESERVADAS de §16 (`category`, `batch`): nacen ausentes por
norma (CONTRATO:704-705). `category` tiene una particularidad: RM-AIW:14 **ya
declara** que todos los runs son `manual` (D-029) — el valor existe como hecho a
nivel de roadmap; materializarlo por run sería acuñar, no inventar. Pero §16 manda
que nazca vacío, así que hoy no se escribe.

### 4.2 Las 3 claves de fase (CONTRATO:669-675: `phase_id`, `title`, `runs`)

O4 **no declara fases** (§3). Las tres claves **no existen**.

- `phase_id`, `title` de fase: **INVENTAR** — no hay agrupación en fases en la
  fuente. Habría que crear la estructura. (Candidato de importación: la tabla de
  nueve tramos del HANDOFF podría dar títulos de fase, pero vive fuera del roadmap
  y es efímera —§6—; tomarla sigue siendo traer estructura que el roadmap no tiene.)
- `runs`: se pobla con los bullets una vez acuñados como runs.

### 4.3 Las 3 claves de objetivo (CONTRATO:661-667: `objective_id`, `title`, `phases`)

- `objective_id`: PARCIAL. La etiqueta "O4" existe como encabezado (RM-AIW:98),
  pero su reuso en RM-CONSOLE **está sin decidir**: DECISIONES:994-995 deja abierto
  "si al llegar O4 el roadmap conserva `O0`/`O4` con hueco o se renumeran los
  `objective_id`. El contrato no lo fija. Se decide en el encargo de O4." → **ACUÑAR
  o renumerar**, decisión pendiente, no invención de contenido.
- `title`: SÍ — "Consola global" existe (RM-AIW:98); el paréntesis "(migrará a su
  propio roadmap cuando nazca)" es meta, no título, y caería al migrar.
- `phases`: se pobla con las fases una vez inventadas (4.2).

### 4.4 Lo que explícitamente NO está en la fuente

- Ninguna fase (ni ids, ni títulos, ni agrupación).
- Ningún `run_id`, `queue_order`, `depends_on` formal, `summary` separado.
- Ningún `status` de objetivo almacenable de forma canónica (§5).

**Balance:** de las 15 claves (9+3+3), O4 aporta hoy —de forma utilizable— `title`
de run, `status` de run, `full_description` de run y `title` de objetivo. Todo lo
demás es **acuñar** (`run_id`, `objective_id`, `summary`/`depends_on` derivables de
prosa) o **inventar** (`queue_order`, y sobre todo la **capa de fases entera**).
La invención estructural mayor es la de fases: es el único nivel del árbol que la
fuente no insinúa siquiera.

---

## 5. Status

### Lo que O4 declara

**O4 no declara status de objetivo.** Su encabezado (RM-AIW:98) es
`## O4 — Consola global (migrará a su propio roadmap cuando nazca)` — **sin token
de status**.

Precisión sobre la premisa del encargo ("El Markdown de AIW lleva status en el
objetivo, `## O1 — active`"): en disco el patrón es **más débil de lo enunciado**.
Solo **O1** lleva token, y no es `active` sino `COMPLETADO`
(`## O1 — … — **COMPLETADO**`, RM-AIW:20). O2, O3, O4, O5 y O6 **no llevan token
en el encabezado** (RM-AIW:78, :87, :98, :159, :183). El status de objetivo en el
Markdown es una excepción de un solo caso (O1), no una convención uniforme; O4 cae
en la mayoría sin token.

### Qué status derivarían sus unidades bajo §12

Aplicando la función de derivación de CONTRATO §12.a a los 10 bullets de O4 (1
`completed`, 9 `planned`, 0 `active`, 0 `blocked`):

1. ¿algún `active`? No. 2. ¿algún `blocked`? No. 3. ¿todos `completed`? No. 4.
**¿algún `completed` pero no todos? SÍ** → rama 4 → **`in_progress`**.

Es decir, O4 de AIW derivaría **`in_progress`** (el vocabulario de objetivo de
§11.b, cinco tokens `planned·in_progress·active·blocked·completed`). Este token
**no existe en el archivo**; nombra el resultado de la función y solo existe al
aplicarla (CONTRATO:1187-1190).

> **No confundir con la tabla de CONTRATO:1293.** Esa fila —`| 5 | O4 | 1 | 1
> planned | … | planned |`— es el **O4 de Cantu** (1 run, deriva `planned`), no
> este. Ver el aviso de homonimia. El O4 de AIW tiene 10 unidades y deriva
> `in_progress`.

### §12.c — el status de objetivo NO se almacena

CONTRATO:1259-1279 (§12.c) manda que la función es normativa **y su resultado NO
se escribe** en el snapshot: ninguna clave del árbol lo transporta (§10.b). Por
tanto, al convertir O4 a `roadmap_tree_v1`:

- El `COMPLETADO` que O1 lleva hoy en el Markdown **se descarta** como derivable
  (lo confirma HANDOFF:96-98: "o se descarta como derivable, o el contrato crece";
  el contrato resolvió descartarlo).
- O4 **no** obtiene ningún campo de status de objetivo; su `in_progress` se
  **calcula al leer**, nunca se persiste.

---

## 6. Los nueve tramos de O4 — ¿escritos en algún archivo?

**Respuesta: SÍ, pero en UN solo lugar, y es efímero — el HANDOFF.**

La enumeración completa de los nueve tramos (0..8) existe como tabla en
HANDOFF:30-40:

> ```
> | # | Tramo | Estado |
> | 0 | Audit read-only | HECHO |
> | 1 | Contrato de la carpeta (schemas, nombres, formatos) | AQUÍ |
> | 2 | aiw-console emite su propia carpeta | pendiente |
> | 3 | Shell multi-proyecto leyendo solo aiw-console | pendiente |
> | 4 | Cantu emite la carpeta nueva al lado de .aiw | pendiente |
> | 5 | Consola global renderiza Cantu (paridad, QA de operador) | pendiente |
> | 6 | AIW como tercer proyecto (roadmap Markdown → v3) | pendiente |
> | 7 | Corte: retiro de la consola de Cantu + borrado de .aiw | pendiente |
> | 8 | UI/UX | pendiente |
> ```
> (más "un tramo intercalado entre 1 y 3: migración de O0", HANDOFF:42-43)

**Peso del hallazgo, dicho en claro:**

- El HANDOFF es, por su propia declaración, **EFÍMERO y se SOBRESCRIBE**
  (HANDOFF:3-6): "no es un record — no acumula historia". El plan de nueve tramos
  **no está respaldado en ningún archivo permanente.**
- **No está en el roadmap.** RM-AIW:98-157 no contiene la tabla de tramos; sus
  diez bullets son otra descomposición (§3).
- **No está enumerado en DECISIONES ni en CONTRATO.** Barrido en disco: los tramos
  se citan **de forma suelta** —`tramo 1..4` y `tramo 7` en CONTRATO; `tramo 1` y
  `tramo 2` en DECISIONES— pero **nunca como plan 0..8**. Los literales "tramo 0",
  "tramo 5", "tramo 6", "tramo 8" y frases como "nueve/9 tramos" o "Audit
  read-only" **no aparecen** fuera del HANDOFF (grep read-only 2026-07-24 sobre
  `context/**/*.md`, cero coincidencias fuera de `handoffs/aiw-console.md`).
- El AUDIT (`AUDIT-CONSOLE-O4-PHASE0.md`) **tampoco** enumera los nueve tramos
  (mismo barrido).

**Consecuencia para la pregunta que este dato decide** (si O4 se convierte o se
redacta): la fuente estructurada de O4 —el roadmap— **no contiene el plan de nueve
tramos**; solo el HANDOFF efímero lo hace, y solo de forma piecemeal las decisiones
individuales. Una conversión mecánica del roadmap **no** produciría los nueve
tramos; produciría los diez bullets de §3. Traer la estructura de nueve tramos a un
`roadmap_tree_v1` sería, en los términos del punto 4, **inventar** (importar desde
un archivo efímero una descomposición que el roadmap no tiene).

---

## 7. Riesgo de duplicación contra O0 de `aiw-console`

**Verificado: O4 NO duplica ningún run de O0. Riesgo de duplicación de trabajo:
nulo. Riesgo de colisión de identificadores/orden: real y ya anotado.**

RM-CONSOLE (`projects/aiw-console/roadmap/roadmap.json`) contiene hoy **un solo
objetivo, O0 "Project Console", con 12 runs** (`queue_order` 1..12, tres fases
O0.P1/P2/P3), `schema_version: "roadmap_tree_v1"` (RM-CONSOLE:2, :7-8, :13-239).
Estos 12 runs se migraron desde el roadmap de Cantu el 2026-07-24 (MIGRACION-O0,
que registra "Los 12 runs del objetivo O0 se extrajeron del roadmap canónico de
Cantu y estrenaron el roadmap propio de aiw-console").

Los 12 `run_id` de O0:

```
RUN-JAME-PROJECT-CONSOLE-FOUNDATION-001         (q1, completed)
RUN-JAME-ROADMAP-V3-DESIGN-001                  (q2, completed)
RUN-JAME-PROJECT-CONSOLE-ROADMAP-V3-PROTOTYPE-001 (q3, completed)
RUN-CANTU-ROADMAP-CONTENT-AUDIT-001             (q4, completed)
RUN-JAME-ROADMAP-MAINTENANCE-HELPER-001         (q5, completed)
RUN-CANTU-PROJECT-CONSOLE-ROADMAP-EDITING-001   (q6, completed)
RUN-CANTU-DEV-LAUNCHERS-001                     (q7, completed)
RUN-CANTU-ROADMAP-EDITOR-USABILITY-001          (q8, completed)
RUN-CANTU-ROADMAP-CLOSE-ACTIVE-RUN-001          (q9, completed)
RUN-CANTU-PROJECT-CONSOLE-LATENT-DEFECTS-001    (q10, active)
RUN-CANTU-ROADMAP-PHASE-OBJECTIVE-OPS-001       (q11, planned)
RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001        (q12, planned)
```

**Naturaleza de O0:** construcción y mantenimiento de la **consola LOCAL** de
Cantu (Project Console) — su fundación read-only, el prototipo del roadmap v3, el
tooling y editor del roadmap, y su auditoría. Es trabajo **ya hecho o en curso**
sobre la consola existente.

**Naturaleza de O4 (Consola global):** construir la consola **GLOBAL multi-proyecto
NUEVA** — audit de migración, contrato de normalización, los tres roadmaps al
contrato, shell multi-proyecto, paridad y corte de la local. Trabajo **futuro** que
usa la local como base (RM-AIW:150 "Base: la consola de Cantu").

**Cotejo bullet-a-bullet:** ninguno de los 10 bullets de O4 (§3) reproduce ninguno
de los 12 runs de O0. La adyacencia más cercana es conceptual, no duplicación:

- O0 q4/q8 (`ROADMAP-CONTENT-AUDIT`, `ROADMAP-EDITOR-USABILITY`) auditan/editan el
  roadmap **de Cantu en la consola local**; O4 bullet 2 ("Audit / Phase 0")
  audita **la migración a la consola global** — otro objeto, ya separado por el
  propio AUDIT de Phase 0.
- O0 vive y se completa **antes** que O4; O4 lo presupone. No hay solapamiento de
  entregable.

**Colisión que SÍ existe (no de trabajo, de estructura):** cuando O4 se convierta y
aterrice en RM-CONSOLE, convivirá con O0 bajo el mismo `roadmap_tree_v1`, lo que
obliga a resolver (a) el hueco/renumeración de `objective_id` O0↔O4
(DECISIONES:994-995, abierto) y (b) la continuidad de `queue_order` global tras el
12 de O0 (§4.1). Son decisiones del encargo de conversión, **no** duplicación de
runs.

---

## Resumen para la cabina (texto, como pide el Scope)

- **Unidades de trabajo de O4:** **10** bullets en prosa (1 `completed`, 9
  `planned`); **0 fases declaradas**; **0 runs formales** (ningún `run_id` ni
  `queue_order`).
- **Los nueve tramos:** escritos en **un solo sitio, el HANDOFF efímero**
  (HANDOFF:30-40). **No** en el roadmap, **no** enumerados en DECISIONES/CONTRATO/
  AUDIT. Sin respaldo permanente.
- **Cuánto habría que inventar:** los `title`/`status`/`full_description` de run y
  el `title` de objetivo existen. Todo lo demás es **acuñar** (`run_id`,
  `objective_id`, `summary` y `depends_on` derivables de la prosa) o **inventar**
  (`queue_order`, y —la pieza mayor— **la capa de fases completa**, que la fuente
  no insinúa). El plan de nueve tramos, si se adopta como estructura, también es
  invención traída de un archivo efímero.
- **Duplicación con O0:** **ninguna** de trabajo; sí una colisión estructural
  pendiente (`objective_id` con hueco, `queue_order` global) que decide el encargo
  de conversión.

## No-claims de esta medición

- No se levantó la consola, el validador ni el proyector. No se ejecutó el emisor.
- No se ejecutó git en ninguna forma. La procedencia de la reconciliación (§1) y el
  estado del no-claim `NOT_REMOTE_BACKED` quedan **[NO VERIFICADO]**.
- No se midieron los archivos de no-claims ni el snapshot de AIW más allá de su
  papel de derivado (§1).
- Esta medición mide RM-AIW tal como está en disco al 2026-07-24; no lo corrige ni
  lo convierte.
