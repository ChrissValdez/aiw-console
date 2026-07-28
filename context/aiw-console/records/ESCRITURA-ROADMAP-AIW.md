# ESCRITURA DEL ROADMAP CANÓNICO DE AIW

**Fecha:** 2026-07-28 · **Naturaleza:** ESCRITURA, acotada a **un** archivo nuevo
en `aiw` (`roadmap/roadmap.json`) más este record. No emite, no commitea, no
ejecuta ningún run del árbol que escribe. · **Máquina:** PC (Windows 10,
`C:\Users\chris\Documents\AIW_Workspace\`).

## Qué hizo este encargo

Escribió **el primer canónico de AIW**: `aiw/roadmap/roadmap.json`, conforme a
`roadmap_tree_v1`, layout `repo_root`, en inglés. Es el primer byte escrito en
`aiw` en toda esta línea de trabajo. Con eso **voltea el modo del root** de
`aiw_objectives` a `roadmap_tree`, que es lo que [[D-052]] autoriza.

La estructura venía **acordada con el operador** y se transcribió; el taller
autoró la prosa inglesa de cada run desde las fuentes. No se inventaron objetivos,
fases ni runs, y no se reordenó nada. Las desviaciones respecto de la estructura
acordada están todas en el bloque 7, con su razón.

Insumos leídos completos y en orden: `DECISIONES.md` D-052 a D-056;
`CONTRATO.md` §10 completo, §11, §12, §18; `MEDICION-ESTADO-DE-AIW.md`;
`AUDIT-CONTENIDO-AIW.md`; `aiw/CONSTITUCION.md`; `roadmap_AIW_temp.md` (localizado
en `projects/aiw-console/context/aiw/`, **no** en `aiw`);
`aiw-console/roadmap/roadmap.json` como modelo de forma.

**Las dos mediciones son insumo y no se re-midió nada de lo que contienen.** Sus
cifras se citan como `MEDICION §n` / `AUDIT §n` y son de segunda mano salvo donde
se diga «medido aquí».

## Abreviaturas de cita

| Abreviatura | Archivo |
|---|---|
| `MEDICION` | `context/aiw-console/records/MEDICION-ESTADO-DE-AIW.md` |
| `AUDIT` | `context/aiw-console/records/AUDIT-CONTENIDO-AIW.md` |
| `CONST` | `aiw/CONSTITUCION.md` |
| `CORE` | `projects/aiw-console/tools/roadmap/roadmap-core.mjs` |
| `PROJ` | `projects/aiw-console/tools/projector/project.mjs` |
| `RM-AIW` | `projects/aiw-console/context/aiw/roadmap_AIW_temp.md` |
| `RM-CONSOLE` | `projects/aiw-console/roadmap/roadmap.json` |
| `RM-CANTU` | `projects/cantu-studio/.aiw/roadmap/roadmap.json` |

Lo medido de primera mano en este encargo va sin marca. Lo demás va marcado
**[INFERENCIA]** o **[NO VERIFICADO]**.

---

# 1. La frontera de `aiw`, antes y después

## 1.1 A la entrada — los cuatro números coincidieron, por eso el encargo siguió

| Medida | Declarado por el encargo | Medido a la entrada | ¿Coincide? |
|---|---|---|---|
| `git rev-parse HEAD` | `ca3087d8…` | `ca3087d8c2686c8250f512838b36ce6cd590800a` | **sí** |
| `git status --porcelain` | 0 líneas | 0 líneas | **sí** |
| archivos (excl. `.git`) | 146 | 146 | **sí** |
| md5 del manifiesto | `b59bf289515c212ae4ddfee9049a5aa6` | `b59bf289515c212ae4ddfee9049a5aa6` | **sí** |

**Receta exacta del manifiesto**, tomada de `MEDICION:48` («`find` excl. `.git` →
`md5sum` de todos los archivos → `md5sum`») y reproducida aquí:

```
find . -type f -not -path "./.git/*" -print0 | sort -z | xargs -0 md5sum | md5sum
```

Nota de método, porque cuesta un intento: la receta es **contenido**, no lista de
rutas, y **el orden importa**. `git ls-files` da 52 (los trackeados,
`MEDICION §3.1`) y no es el manifiesto; la lista de rutas sin `md5sum` por archivo
da `b3508a11…`; y `find … -exec md5sum {} +` sin `sort` da `7bcc14ce…`. Solo la
variante ordenada de arriba reproduce `b59bf289…`.

## 1.2 A la salida

| Medida | Antes | Después | Lectura |
|---|---|---|---|
| `git rev-parse HEAD` | `ca3087d8…` | `ca3087d8…` | **sin cambio** — no se commiteó |
| `git status --porcelain` | 0 líneas | 1 línea: `?? roadmap/` | un solo path nuevo |
| `git status --porcelain -uall` | 0 líneas | 1 línea: `?? roadmap/roadmap.json` | **exactamente un archivo nuevo** |
| líneas de porcelain que NO son `??` | 0 | **0** | **cero modificados, cero staged, cero borrados** |
| `git diff HEAD --stat` | vacío | **vacío** | ni un byte de archivo trackeado cambió |
| archivos (excl. `.git`) | 146 | **147** | +1, el archivo nuevo |
| md5 del manifiesto | `b59bf289515c212ae4ddfee9049a5aa6` | `c05c72fbd88cb7c78e5e63e11b88d53b` | **cambia, y debe cambiar**: el manifiesto es de contenido y hay un archivo más |

**El único archivo escrito en `aiw`:**

| | |
|---|---|
| Ruta | `aiw/roadmap/roadmap.json` |
| Tamaño | 98.697 bytes |
| Líneas | 634 |
| md5 | `7373934529883642eaafc7088578f7b3` |
| Fin de línea | **LF**, con newline final |

**Fuera de `aiw` solo se escribió este record.** No se tocó `CONTRATO.md`, ni
`DECISIONES.md`, ni ningún handoff, ni ningún record existente, ni ningún roadmap
de la consola o de Cantu. No se emitió ni re-emitió ningún `.project/`. No se
levantó la consola, el proyector, el server legacy ni el validador. No se corrió
la suite de AIW. **git se usó solo en lectura** (`rev-parse`, `status`, `diff
--stat`, `ls-files`, `log -1`) y **no se commiteó**.

`cantu-studio` se leyó solo para el criterio de unicidad (bloque 4) — su canónico,
como archivo. Nada más.

**Escritura concurrente de otro carril, detectada y NO tocada.** Al cerrar, el
árbol de `aiw-console` tiene **dos** archivos sin trackear: este record
(mtime `14:36:18`) y `records/REENCUADRE-OCHO-RUNS-CON-TEXTO-VENCIDO-CANTU.md`
(mtime `14:33:15`), que **no es de este encargo** — es del hilo paralelo de
`cantu-studio`, que el encargo declaró abierto y fuera de alcance. Este encargo
hizo exactamente dos escrituras: `aiw/roadmap/roadmap.json` y este archivo. Se
registra por el mismo motivo por el que `MEDICION` registró el caso equivalente el
2026-07-28 a las 00:53: es el escenario de carriles paralelos operando de verdad, y
callarlo dejaría un archivo nuevo sin dueño en el reporte de frontera. Verificado
además que `roadmap/roadmap.json` de `aiw-console` **no cambió** (`git diff --stat`
vacío).

---

# 2. El conteo real

Medido de primera mano sobre el archivo escrito, importando `CORE` como módulo
(funciones puras, solo leen; importar no dispara ningún CLI).

## 2.1 Totales

| Nivel | Contado | Esperado por la estructura | ¿Coincide? |
|---|---:|---:|---|
| Objetivos | **6** | 7 | **NO — ver 7.1** |
| Fases | **29** | 29 | sí |
| Runs | **42** | 42 | sí |

## 2.2 Por objetivo

| `objective_id` | Título | Fases | Runs | `completed` | `planned` | Status derivado (`§12.a`) |
|---|---|---:|---:|---:|---:|---|
| O1 | House in order | 2 | 11 | 11 | 0 | `completed` (rama 3) |
| O2 | AIW is readable | 7 | 10 | 1 | 9 | `in_progress` (rama 4) |
| O3 | Reliable autonomous run | 6 | 6 | 0 | 6 | `planned` (rama 5) |
| **O4** | **— NO EXISTE, hueco permanente —** | — | — | — | — | — |
| O5 | Run evidence and observability | 4 | 5 | 0 | 5 | `planned` (rama 5) |
| O6 | Categories and batches | 4 | 4 | 0 | 4 | `planned` (rama 5) |
| O7 | Long unattended execution (batches, lanes and parallelism) | 6 | 6 | 0 | 6 | `planned` (rama 5) |
| **Total** | | **29** | **42** | **12** | **30** | |

La columna «status derivado» es **derivación de `CONTRATO §12.a` aplicada a los
conteos medidos**, no un dato del archivo: `§10.b` prohíbe almacenar status de
objetivo, y el archivo no lo almacena. Se incluye porque es lo que un consumidor
mostrará.

## 2.3 Por status

| Token | Runs | Nota |
|---|---:|---|
| `completed` | **12** | los 11 de O1 (historia) + `RUN-AIW-CANONICAL-ROADMAP-001`, que nace `completed` porque escribirlo ES el trabajo |
| `planned` | **30** | |
| `active` | **0** | |
| `blocked` | **0** | |

Cero `active` y cero `blocked` es **coherente con la fuente**: `RM-AIW:13` declara
los cuatro tokens pero el Markdown solo usa dos, 20 `planned` y 12 `completed`
(`MEDICION §1.3`). No se inventó ningún estado que la fuente no afirmara.

## 2.4 Por carril

| Carril | Runs (resuelto al leer) | Runs con clave `lane` explícita |
|---|---:|---:|
| `DEVELOPMENT` (default) | **36** | 0 |
| `DOCUMENTATION` | **6** | 6 |

Los 36 de `DEVELOPMENT` **omiten la clave** y resuelven al default al leer, que es
la disciplina de `CONTRATO §10.e`: «todo run tiene carril se satisface leyendo, no
escribiendo». Los 6 de `DOCUMENTATION` son `O2.P5`(a) y (b), `O3.P6`, `O5.P4`,
`O6.P4` y `O7.P6`.

Vocabulario declarado en la raíz, con **exactamente un default**:

| `lane_id` | `title` | `default` |
|---|---|---|
| `DEVELOPMENT` | Development — kernel, queue, launchers and guards | `true` |
| `DOCUMENTATION` | Documentation — writing, updating and organising AIW's docs | (ausente) |

El título de `DEVELOPMENT` cita deliberadamente el alcance de «mecanismo» de
[[D-055]] («código o paso nuevo en `aiw` — kernel, cola, lanzadores, guards»), para
que el carril y la norma nombren la misma superficie. Es forma con ejemplar:
`RM-CANTU` declara el mismo par de `lane_id` (medido aquí).

## 2.5 Los dos barriers, y solo dos

| Run | `queue_order` | Alcance | Carril resuelto | Qué retiene |
|---|---:|---|---|---|
| `RUN-AIW-EVIDENCE-PORTABILITY-001` | 12 | **`global`** | `DEVELOPMENT` | todo run `planned` con `queue_order` > 12, en todos los carriles |
| `RUN-AIW-DOCS-CONVENTION-001` | 18 | **`lane`** | `DOCUMENTATION` | los 5 runs `DOCUMENTATION` posteriores (q19, q27, q32, q36, q42) |

Ningún tercer barrier. Ninguno se materializó como aristas: son un campo en dos
runs, que es exactamente lo que `§10.e` exige («un barrier es una REGLA de un solo
campo, nunca aristas escritas»).

---

# 3. Los runs que añaden mecanismo — el barrido de `D-055`, cerrado

La norma de [[D-055]]: todo run que **añada mecanismo** lleva tres criterios de
aceptación fijos — (1) la cita de la entrada de `DECISIONES.md` que documenta su
incidente con los cuatro campos de `CONST:30-32`; (2) su criterio de borrado
escrito en esa misma entrada (`CONST:33`); (3) su presupuesto declarado de líneas
contra el techo (`CONST:28-29`). Alcance de «mecanismo», transcrito: código o paso
nuevo en `aiw` — kernel, cola, lanzadores, guards. **No lo son** papeles,
ediciones de `.gitignore`, archivado de tickets, ni trabajo del lado consola.

**Clasificación aplicada run por run sobre los 42.** Los tres criterios van
**dentro del `full_description`** de cada run que añade mecanismo, verbatim, no en
una tabla aparte.

| # | Run | Fase | Incidente | Borrado | Presup. | **Estado `D-055`** |
|---|---|---|---|---|---|---|
| 1 | `RUN-AIW-SCOPE-PREFLIGHT-GUARD-001` | O3.P1 | ✗ | ✗ | ✓ | **PENDIENTE** |
| 2 | `RUN-AIW-TICKET-PARSE-REGRESSION-TEST-001` | O3.P4 | ✓ | ✓ | ✓ | **COMPLETO** |
| 3 | `RUN-AIW-RUN-IDENTITY-001` | O5.P1 | ✓ | ✗ | ✓ | **PARCIAL** |
| 4 | `RUN-AIW-RUN-MANIFEST-001` | O5.P2 | ✓ | ✓ | ✓ | **COMPLETO** |
| 5 | `RUN-AIW-RUN-COST-ACCOUNTING-001` | O5.P2 | ✗ | ✗ | ✓ | **PENDIENTE** |
| 6 | `RUN-AIW-MID-RUN-SIGNALS-001` | O5.P3 | ✗ | ✗ | ✓ | **PENDIENTE** |
| 7 | `RUN-AIW-RUN-CATEGORY-FIELD-001` | O6.P2 | ✗ | ✗ | ✓ | **PENDIENTE** |
| 8 | `RUN-AIW-BATCH-TO-BRANCH-001` | O6.P3 | ✗ | ✗ | ✓ | **PENDIENTE** |
| 9 | `RUN-AIW-DECOUPLED-QUEUE-LAUNCHER-001` | O7.P1 | ✓ | ✓ | ✓ | **COMPLETO** |
| 10 | `RUN-AIW-ORPHAN-LOCK-RECOVERY-001` | O7.P2 | ✓ | ✗ | ✓ | **PARCIAL** |
| 11 | `RUN-AIW-WORKTREES-PER-RUN-001` | O7.P3 | ✗ | ✗ | ✓ | **PENDIENTE** |
| 12 | `RUN-AIW-KERNEL-READS-LANES-001` | O7.P4 | ✗ | ✗ | ✓ | **PENDIENTE** |

**3 COMPLETO · 2 PARCIAL · 7 PENDIENTE.** Los 12 nacen `planned`; ninguno puede
ejecutarse sin su entrada, y los tres COMPLETO pueden hacerlo hoy.

## 3.1 Los tres COMPLETO — de dónde sale cada uno

- **#2, test de parseo de tickets** — [[D-055]] caso 4, con el criterio de borrado
  **corregido por [[D-056]]**: la cláusula (b) es **conjunción**, no disyunción.
  El `full_description` lleva la corrección entera y su razón (el daño 2 es
  subconjunto del daño 1; el texto viejo permitía retirar el vigilante reparando
  solo el daño menor). Presupuesto **0 líneas**: el test vive en la suite, no en
  `kernel.mjs`.
- **#4, manifest por run** — [[D-055]] caso 1, cuatro campos completos.
- **#9, lanzador desacoplado** — [[D-055]] caso 2, cuatro campos, **más su
  derogación escrita**: la regla operativa «el terminal del queue se queda abierto
  e intocado durante toda la ventana» (`AUDIT §6.5`) **queda derogada el día que el
  lanzador entre**, nombrándola, al estilo de la caducidad explícita de
  `CONTRATO §9`. La derogación aparece dos veces a propósito: en el run que la
  causa (`O7.P1`) y en el run que documenta la operación desatendida (`O7.P6`),
  porque un documento operativo que la omitiera dejaría viva la regla retirada en
  el único sitio que un operador lee.

## 3.2 Los dos PARCIAL — y por qué no son COMPLETO

Son el hallazgo de este barrido y merecen su renglón, porque a primera vista
parecen tener incidente y lo tienen — pero no el criterio que `D-055` exige en
segundo lugar.

- **#3, `RUN-AIW-RUN-IDENTITY-001`.** Su incidente **está documentado con los
  cuatro campos** en [[D-055]] caso 1, que nombra `K:283` y este defecto
  literalmente. Lo que `D-055` **no** contiene es un criterio de borrado para
  ESTE mecanismo: el que escribió es el **del manifest**, y ahí un `logDir`
  irrepetible figura como una de las **alternativas** que retirarían al manifest —
  así que no puede servir además como criterio propio de la alternativa. Falta su
  «se elimina si X».
- **#10, `RUN-AIW-ORPHAN-LOCK-RECOVERY-001`.** Mismo patrón. Su incidente es el
  mismo que documenta [[D-055]] caso 2, y **el lock huérfano está nombrado
  literalmente** en el campo «qué costó» de esa entrada. El criterio de borrado
  escrito allí es **el del lanzador** y está atado a si suben las noches
  desatendidas tras su estreno — lo cual no dice nada sobre si la recuperación de
  lock sigue haciendo falta. Falta su «se elimina si X».

## 3.3 El caso que más se discutió: `O3.P1`, y por qué queda PENDIENTE

`RUN-AIW-SCOPE-PREFLIGHT-GUARD-001` implementa [[D-028]]. Es tentador contarlo como
resuelto porque D-028 existe, está fechada y trae criterio de borrado. **No cumple
`D-055`**, y las razones son tres, leídas de primera mano sobre D-028:

1. La fuga está **verificada en disco** como defecto de código, pero **ningún run
   la ha sufrido**: la propia D-028 registra que «los dos únicos blocks observados
   en la calificación (E4, E5b) fueron por causas menores, no graves».
2. Le falta el **cuarto campo** de `CONST:30-32` — «por qué el diff matinal no lo
   cazó» — que no aparece en ninguna forma.
3. Su criterio de borrado dice **«N/A (endurece un invariante; se mantiene)»**, que
   no es la forma «se elimina si X» que `CONST:33` exige.

Y [[D-055]] adjudicó cuatro candidatos a mecanismo; **éste no estuvo entre ellos**.
«Una idea no es un incidente» (`CONST:32`) corta también hacia aquí: un defecto
leído en el código y nunca sufrido no es un incidente. Queda PENDIENTE y nace
`planned`.

## 3.4 El gate de evals NO aparece en el árbol

Verificado sobre el archivo: **no existe ningún run de gate de evals**, en ninguna
fase. Es [[D-055]] caso 3 — no entra por doble motivo (no tiene incidente y es de
la clase «detector» que `CONST:34-35` prohíbe reintroducir sin uno). Su **condición
de disparo** queda donde `D-055` la puso y **no se movió al árbol**; se cita dentro
del `full_description` de `O3.P4` para que quien lea el test de parseo encuentre
ahí por qué su vecino no está, en vez de creerlo un olvido.

## 3.5 Los 30 runs restantes

19 declaran explícitamente **«No mechanism under CONST §4»** con su razón
(papel, `.gitignore`, archivado de tickets, o trabajo de consola). Los 11 de O1 no
la llevan porque son **historia ya ejecutada**: `D-055` gobierna lo que se va a
construir, y aplicarle la norma a un run cerrado en 2026-07 sería pedirle un
criterio de borrado a un hecho. 19 + 11 + 12 = **42** ✓.

---

# 4. Conformidad verificada, no asumida

Todo lo de este bloque se ejecutó contra el archivo escrito, importando el motor de
`aiw-console` **en modo lectura**. Ninguna operación de escritura del motor se
invocó — y no podría: `CORE` no tiene operación de crear objetivo ni fase, que es
justamente la razón por la que un archivo nuevo se escribe a mano, legal por
[[D-044]] («escribir a mano en `roadmap/` no viola `§18`»).

## 4.1 Invariantes del motor

`checkInvariants(obj, { externalRunIds })` → **0 errores**.

Cubre, según `CORE` leído de primera mano: allowlist de campos en raíz, objetivo,
fase y run; forma del vocabulario de carriles con **exactamente un default**;
`lane` usado ⇒ declarado; `barrier` ∈ {`lane`, `global`}; `run_id` duplicados;
`queue_order` entero positivo, único y **contiguo 1..N**; `depends_on` array, sin
auto-referencia, sin duplicados, **sin colgantes** y con **precedencia estricta**;
aciclicidad por DFS; y satisfacibilidad de barriers.

## 4.2 Lo que el motor NO comprueba y se comprobó aparte

| Comprobación | Fuente de la exigencia | Resultado |
|---|---|---|
| Ninguna fase con 0 runs | `CONTRATO §12.b` (malformado) | **0 fases vacías** — el motor no lo verifica |
| Ningún objetivo con 0 fases | `§12.b` por analogía | **0** |
| Forma de `run_id` | `§10.d` Regla 1.a | **42/42** casan `RUN-<PROYECTO>-<SLUG>-<NNN>`. `CORE:64` la declara **advisory only** («warn, never block»), así que el motor no la impone |
| Unicidad GLOBAL de `run_id` | `§10.d` Regla 1 | bloque 4.3 |
| Orden canónico de claves | `CORE` `CANONICAL_ROOT_KEY_ORDER` / `CANONICAL_RUN_KEY_ORDER` | raíz **y los 42 runs**, 0 desviaciones |
| Vocabulario de `status` cerrado | `§11.a` | 42/42 dentro de los cuatro tokens |
| `closeout_result`/`progress`/`category`/`batch` ausentes | `§14`, `§15`, `§16` | **los cuatro ausentes en los 42** |

## 4.3 Unicidad global — comprobada leyendo, no suponiendo

Se leyeron **los otros dos roadmaps reales** y se extrajeron sus `run_id`:

| Archivo | `schema_version` | Objetivos | Fases | Runs | `run_id` únicos |
|---|---|---:|---:|---:|---:|
| `RM-CONSOLE` | `roadmap_tree_v1` | 2 | 19 | 45 | 45 |
| `RM-CANTU` | `jame.roadmap_v3.v0.2-progress` | 7 | 28 | 72 | 72 |

**117 `run_id` distintos, intersección con los 42 de AIW = CERO.** Además: hoy
existen **0** ids con prefijo `RUN-AIW-` en ambos archivos, así que los 42 estrenan
el prefijo que [[D-046]] había reservado («ése es del kernel»). Prefijos en disco
antes de este encargo: `JAME` 48, `CANTU` 36, `CONSOLE` 33.

Ésta es **la única unicidad que el contrato exige** (`§10.d` Regla 1 no dice nada
del `objective_id`), y por eso la colisión léxica de `O1..O3, O5..O7` con los de
Cantu se acepta a sabiendas, según [[D-054]].

Nota de cifra: `RM-CANTU` da **72** runs medidos aquí. `MEDICION-DERIVA-ROADMAP-CANTU-71-RUNS.md`
nombra 71 en su título. No se investiga la diferencia — Cantu está fuera de
alcance y la unicidad se comprobó contra **los 72 que el archivo tiene hoy**, que
es el conjunto conservador.

## 4.4 Roundtrip byte-idéntico

| Prueba | Resultado |
|---|---|
| `serialize(parseRoadmap(raw), detectEol(raw)) === raw` | **idéntico byte a byte** |
| `JSON.stringify(parse(raw), null, 2) === raw` sin el newline final | **idéntico** |
| `JSON.stringify` en segunda pasada | **idempotente** |

`detectEol` devuelve **LF**. Se eligió LF y no CRLF porque `RM-CONSOLE` —el otro
ejemplar de `roadmap_tree_v1`, y el otro layout `repo_root`— es LF (medido aquí);
`RM-CANTU` es CRLF y es de otro schema y otro layout. `CORE:87` documenta que el
default del serializador es CRLF y que la línea se mide del archivo que se edita,
así que un archivo LF es exactamente lo que ese parámetro existe para soportar.

**No hizo falta corregir la serialización**, porque el archivo se escribió ya en la
forma canónica (2 espacios, orden de claves canónico, newline final). Si el
roundtrip hubiera fallado se habría corregido el archivo, nunca el test.

---

# 5. El volteo, medido

Criterio: **medir el volteo, no suponerlo.** Se importó `detectRootMode` de `PROJ`
como módulo —igual que el audit importó `parseObjective`— y se ejecutó sobre el
root real de `aiw`. **Sin levantar ningún servidor.** Importar no dispara el bloque
CLI de `PROJ`, que compara `process.argv[1]` con la URL del módulo
(`MEDICION`, nota de método).

| Root | `detectRootMode` ANTES (`MEDICION §3.2`) | `detectRootMode` DESPUÉS (medido aquí) | Layout |
|---|---|---|---|
| **`aiw`** | **`aiw_objectives`** | **`roadmap_tree`** | **`repo_root`** ← antes: ninguno |
| `aiw-console` | `roadmap_tree` | `roadmap_tree` | `repo_root` |
| `cantu-studio` | `roadmap_tree` | `roadmap_tree` | `project_local_aiw` |

`detectRootLayout(aiw)` reclama ahora el root y resuelve `roadmap` →
`roadmap\roadmap.json`. **El volteo ocurrió y está medido**, que es lo que [[D-052]]
anticipaba (`PROJ:792-793` vía `MEDICION` R2: los dos modos son excluyentes por
root).

Lo que **no** cambia, y conviene repetirlo aquí porque es el hecho que separa las
aguas: el volteo cambia lo que la consola **muestra** de AIW, no lo que el kernel
**hace**. Ni `kernel.mjs` ni `queue.mjs` leen ningún roadmap.

Sigue **[NO VERIFICADO]**, exactamente como `D-052` lo dejó, si las dos vistas
mode-1 del servidor legacy seguirían emitiéndose tras el volteo: ese servidor llama
`buildSnapshot`/`buildRoadmap` incondicionalmente sin consultar el modo
(`SERVE-LEGACY:56-72` vía `MEDICION` R2). **No se despejó aquí porque despejarlo
exige levantar el servidor**, y eso está fuera de alcance. La decisión no dependía
de despejarlo.

---

# 6. La fecha de `7659ff3` — `[NO VERIFICADO]` despejado

Es el `[NO VERIFICADO]` que [[D-055]] (caso 4) y [[D-056]] dejaron abierto porque
ningún encargo anterior había abierto el repo del kernel. Lectura pura:

```
git log -1 --format=%cI 7659ff3
```

| | |
|---|---|
| **Fecha de commit** | **`2026-07-10T15:24:15-06:00`** |
| Asunto | `aiw2: english normalization + green-baseline preflight + supervised-run prep` |

Coincide literalmente con el nombre que `AUDIT §1.2.a` le da al commit. Sitúa la
rotura de los seis tickets el **2026-07-10**, es decir **18 días antes** de que el
audit la constatara el 2026-07-28 al correr `parseObjective` contra los archivos
reales — un día más que los «17 días» que `D-055` y `D-056` citan, que estaban
contados contra la fecha de constatación con la del commit aún sin verificar.

La fecha **se reporta aquí y se escribió dentro del `full_description` de
`RUN-AIW-TICKET-PARSE-REGRESSION-TEST-001`**, que es donde el incidente vive.

**NO se escribió ninguna entrada de `DECISIONES.md`**, incluida ésta. Ese es otro
acto, y [[D-045]] es el precedente exacto de cómo se cierra un `[NO VERIFICADO]`
hacia adelante: con una entrada nueva, que este encargo no tiene mandato de
escribir.

---

# 7. Desviaciones respecto de la estructura acordada

Todas, con su razón. Ninguna se forzó para cuadrar.

## 7.1 Objetivos: **6**, no 7

La estructura declaraba «7 objetivos, 29 fases, 42 runs». **Fases y runs coinciden
exactamente.** Los objetivos son **6**.

**Razón:** el array de objetivos es `O1, O2, O3, O5, O6, O7` — seis entradas. El 7
sale de contar el **rango de identificadores** (`O1`..`O7`), no las entradas.
[[D-054]] fija que **`O4` no existe y su hueco es permanente**, y la propia
estructura lo dice con todas sus letras («el array de objetivos salta de `O3` a
`O5`»). Un séptimo objetivo solo podría aparecer creando el `O4` que la decisión
prohíbe.

No se ajustó nada para llegar a 7. Se reporta la cifra real, que es lo que el
encargo pedía hacer si difería.

## 7.2 La nota de nivel roadmap no tiene clave de raíz — dónde quedó

El criterio 5 pedía «nota de nivel roadmap». **`roadmap_tree_v1` no tiene campo de
nota de raíz**: `CORE:35` fija la allowlist en exactamente `schema_version`,
`roadmap_id`, `title`, `objectives`, `lanes`, y `checkInvariants` rechaza cualquier
clave extra («root carries unexpected field»). Añadir una `note` habría producido
un archivo que el motor declara malformado.

**Dónde quedó:** dentro del `full_description` de
`RUN-AIW-CANONICAL-ROADMAP-001` (`O2.P3`), en un bloque delimitado y rotulado
`=== ROADMAP-LEVEL NOTE ===`, con las tres piezas que `MEDICION §2` marcó como
imprescindibles:

1. **el hueco permanente de `O4` y su razón**;
2. **la excepción de que los runs contra `aiw-console` sí son delegables al
   kernel** — el matiz de `RM-AIW:15-16` que `D-046` midió como sin destino;
3. **el puntero al Markdown que se retira**, con su ruta real (vive en
   `aiw-console`, no en `aiw`) y la constancia de la ventana deliberada.

**El precedente es exacto y medido, no una salida inventada:** `MEDICION §2.3.a`
constata que el marco del objetivo O4 de la consola («SECUENCIA ACORDADA» + la
definición de «consola estable») está preservado **literal dentro del
`full_description` de `RUN-CONSOLE-AUDIT-PHASE0-001`**, un run ya `completed`, y
que el propio run declara la razón: «no home at objective level under
roadmap_tree_v1». Aquí se hizo lo mismo, por lo mismo, y se rotuló para que se vea
que es prosa de nivel roadmap y no del run.

**Esto no resuelve el hueco de capa 2** — lo aloja. `D-046` cerró que la enmienda
del contrato se delibera aparte y no se revierte por decreto; este encargo no la
delibera.

## 7.3 `closeout_result` no se escribió en ningún run `completed`

Los 12 `completed` **no llevan `closeout_result`**. Es opcional (`§14`), y
`MEDICION §3.3` lo marca como **INVENCIÓN** para los bullets `completed` del
Markdown: la fuente no lo trae. Escribirlo habría sido inventar un desenlace.

## 7.4 El barrido de `D-055` alcanzó a 12 runs, no a los 7 que la estructura rotula

La estructura marca explícitamente **«Mecanismo»** en **7** runs: `O3.P4`,
`O5.P2`(a), `O5.P3`, `O7.P1`, `O7.P2`, `O7.P3` y `O7.P4`. Aplicando la
**definición** de `D-055` run por run, el barrido alcanzó a **12** (bloque 3). Los
**5 añadidos** son `O3.P1`, `O5.P1`, `O5.P2`(b), `O6.P2` y `O6.P3`.

**Razón:** el criterio 3 pedía «`D-055` aplicado run por run, y el barrido se
cierra aquí». `D-055` define mecanismo por lo que el run **hace** («código o paso
nuevo en `aiw`»), no por el rótulo. Los cinco añadidos añaden código al kernel o a
la cola —un guard de pre-flight, la derivación de `logDir`, campos nuevos escritos
por el kernel, una rama de closeout por categoría, y el parámetro de batch que
decide la rama— así que dejarlos fuera habría dejado el barrido abierto justo donde
`D-055` existe para cerrarlo.

**Casos frontera declarados, porque son discutibles y conviene que se vean:**

- **`O6.P1`, activación de push: NO se contó como mecanismo.** La ruta de push ya
  existe en el kernel y se auto-reporta como `push: not configured for this
  project` en los 8 runs con desenlace (`AUDIT §1.3`); lo que cambia es
  `config.json`. Su `full_description` **declara el límite**: si la activación
  resultara exigir código nuevo en vez de un flag, ese código sí es mecanismo y cae
  bajo `D-055` con los tres criterios.
- **`O3.P5`, convención de instrucciones: NO se contó.** Reorganizar prosa es
  papel. Su `full_description` declara el mismo límite: si implementarla añade un
  paso de carga al kernel, ese paso sí es mecanismo.
- **`O3.P2` y `O7.P5`: NO se contaron.** Miden y ejercitan; no añaden mecanismo
  propio.
- **`O2.P2`(c), reparar los 6 tickets: NO se contó.** Editar archivos de ticket es
  reparación de dato. El vigilante que habría cazado la rotura es `O3.P4`, que sí
  es mecanismo y sí depende de esta reparación.

## 7.5 `prepared/` y `staged/` — medidos aquí, y son menos que «0»

La estructura los nombra con «(0)». Medido de primera mano (lectura pura de
directorio; **no está en las dos mediciones**, que solo contaron las cinco carpetas
con archivos): las dos **existen en disco y están vacías**, y además **no están
trackeadas** — git no trackea directorio vacío y ninguna de las dos lleva
`.gitkeep`; los dos `.gitkeep` del repo están en `pending/` y `processed/`
(`git ls-files objectives`, que da las 24 entradas que `AUDIT §1` reporta).

**Consecuencia, y por eso se escribió en el run:** no existen en un clon fresco ni
en la laptop. «0 archivos» subestima el caso; el estado real es «carpeta que solo
existe en esta máquina». El `full_description` de
`RUN-AIW-QUEUE-FOLDER-DISPOSITION-001` lo dice así.

## 7.6 La nota de frontera de O1 se preservó, sin que se pidiera

`RM-AIW:202-208` cierra el Markdown con una nota de frontera: los tres pasos
lado-Cantu de O1 se ejecutan bajo gobierno de Cantu aunque esta migración los
ordene, y la consolidación de `main` **no** es parte de la migración.
`MEDICION §2.3.d` la lista como prosa de nivel archivo **sin destino**.

Se plegó al `full_description` de los tres runs que nombra (`…-CANTU-MOVE-AND-RENAME-001`,
`…-CANTU-MAIN-CONSOLIDATION-001`, `…-OLD-CHECKOUT-RETIREMENT-001`), rotulada como
«Boundary note, preserved from the closing note of the backlog Markdown». Es
preservación adicional, no una desviación de contenido: nada se reordenó y ningún
run se añadió.

## 7.7 La tabla de equivalencia de numeración se declara, no se publica aquí

El criterio pedía que `O2.P6` «publique la tabla de equivalencia de numeración».
`O2.P6` es **un run del árbol que no se ejecuta aquí**, así que su entregable no
puede existir todavía. Lo que sí quedó escrito en su `full_description` es **el
mapeo completo** (O2 viejo → O3 nuevo; O3 → O6; O6 → O7; O4 se fue a otro
proyecto; O5 se partió) y la instrucción explícita de publicarlo, más la
advertencia medida de que **las 8 citas por línea del canónico de la consola al
Markdown ya están rotas** con 8 líneas de desplazamiento (`MEDICION` R1): retirar
el archivo sin resolverlas convierte un número de línea equivocado en un archivo
ausente.

---

# 8. Lo que este encargo NO hizo

- **No emitió ni re-emitió ningún `.project/`**, ni de `aiw` ni de nadie. La
  emisión de AIW es encargo posterior ([[D-052]], consecuencia c).
- **No ejecutó [[D-053]]**: no se tocó el `.gitignore` de `aiw`, no se mudaron los
  audit reports, no se borró el residuo de `.aiw/`.
- **No ejecutó ningún run del roadmap que escribió.** Los 6 tickets rotos siguen
  rotos; los 2 muertos siguen sin archivar; `governance/` no existe; el índice de
  docs no se curó.
- **No retiró `roadmap_AIW_temp.md`** — es `O2.P6`, un run del árbol. Los dos
  documentos conviven hasta que ese run corra.
- **No escribió ninguna entrada de `DECISIONES.md`**, incluida la fecha de
  `7659ff3`.
- **No creó ningún run en el roadmap de `aiw-console`.** Este encargo no tiene run
  y no lo crea; la consola no se tocó.
- **No corrió la suite de AIW.** Que los 49 tests estén verdes sigue
  **[NO VERIFICADO]**, como ya lo dejó `AUDIT`.
- **No levantó** la consola, el proyector, el server legacy ni el validador. La
  única ejecución de código fue la importación como módulo de `CORE` y de `PROJ`
  (funciones puras de lectura), más `node` sobre scripts propios que viven en el
  scratchpad de la sesión, fuera del workspace.
- **No commiteó.** El archivo queda **sin trackear**, a la espera del acto humano.
