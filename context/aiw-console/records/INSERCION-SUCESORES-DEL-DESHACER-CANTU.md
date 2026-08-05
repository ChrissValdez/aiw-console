# INSERCIÓN DE LOS DOS SUCESORES DEL DESHACER RETIRADO (cantu-studio)

**Fecha:** 2026-08-05
**Encargo:** escritura sobre el roadmap canónico de `cantu-studio`, conducida por el motor
de roadmap de `aiw-console`. Taller, no run.
**Ficheros escritos:** `projects/cantu-studio/.aiw/roadmap/roadmap.json` (vía motor);
este record.
**Ficheros NO tocados:** `.project/` de ningún proyecto, ningún test, fixture, código de
producción ni documento fuera de este record. No se ejecutó Git en ninguna forma.

Sucede a `RETIRO-PILA-DESHACER-GLOBAL-CANTU.md`, que dejó escrito (§2, §11) que el reparto
del alcance retirado lo insertaría **otro encargo**. Éste es ese encargo. Se leyeron enteros
los tres records que el ticket nombra —`INSERCION-MONTAJE-INSERTOR-FORMULA-CANTU.md`,
`DESHACER-Y-REHACER-GLOBAL-CANTU.md` y `RETIRO-PILA-DESHACER-GLOBAL-CANTU.md`— **antes** de
planificar, y sus afirmaciones se verificaron contra disco en vez de heredarse (§10).

**Ninguna compuerta de parada se disparó.**

---

## 0. Este encargo NO TUVO RUN, y por qué

**No se abrió, no se cerró y no se tocó el `status` de ningún run** — tampoco el de los dos
runs nuevos, que nacen `planned` y siguen `planned`. Al empezar había **cero runs `active`**
y al terminar sigue habiendo **cero**.

La razón es de naturaleza, no de conveniencia: **este encargo no ejecuta trabajo del
roadmap, escribe el roadmap**. Es mantenimiento de la cola —la operación que decide qué runs
existen y en qué orden— y colocarla dentro de un run la volvería su propio sujeto. El
trabajo que los dos runs nuevos describen **no se ha ejecutado ni una línea**; en particular
**no se hizo el arreglo mínimo del insertor**, que el ticket excluye de forma expresa. Queda
íntegro para cuando el operador abra el run.

## 1. Respaldo, antes de escribir un byte

Copia byte a byte fuera de los dos repos, en el scratchpad de sesión. Es la vía de
reversión: **`git checkout` no se usa para deshacer en este workspace porque reescribe los
finales de línea**, y el canónico es CRLF puro.

| | ruta | md5 | bytes |
|---|---|---|---|
| origen | `projects/cantu-studio/.aiw/roadmap/roadmap.json` | `7b52581a7a8906423d822e39865b5e68` | 140 547 |
| respaldo | `…/scratchpad/roadmap.BACKUP.json` | `7b52581a7a8906423d822e39865b5e68` | 140 547 |

`cmp` byte a byte: **idénticos**. El respaldo se volvió a medir al terminar y **sigue en
`7b52581a…`**: nada lo tocó durante la operación.

**El canónico no estaba siendo escrito por otro proceso.** Dos muestras de `mtime` y tamaño
separadas por 3 s dieron el mismo valor (`2026-08-05 03:35:48.060196900`, 140 547 bytes), y
además cada una de las tres operaciones comprobó el **baseline** (compare-and-swap sha256
del motor) contra lo que esperaba antes de aplicar: las tres casaron.

## 2. Precondiciones medidas — todas casan

Medidas sobre el canónico antes de cualquier escritura, con guarda que abortaba si algo no
casaba (`preconditions.mjs`, exit 0).

- **Total: 71 runs.** Verificado contra disco, no dado por bueno desde el ticket.
- **`queue_order` 1..71 denso, único y contiguo.** 71 valores, 71 únicos, min 1, max 71,
  cada uno igual a su índice + 1.
- **Cero runs `active`.** Reparto de status: `completed` 31, `planned` 40. La cifra que el
  encargo daba (`history=31`, cero `active`) es la real.
- 7 objetivos / 28 fases. 0 fases con 0 runs. `run_id` todos únicos (71 de 71).
- 1 `depends_on` colgante, el conocido:
  `RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 -> RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`.
- Los dos `run_id` nuevos **no existían** ya en el canónico.

**Los dos títulos ancla del criterio 2, verbatim:**

| `qo` | `run_id` en disco | título en disco | `status` | ¿casa? |
|---:|---|---|---|:--:|
| 29 | `RUN-CANTU-EDITOR-UNDO-REDO-001` | `Give the author undo and redo across the whole editor` | `completed` | **OK** |
| 30 | `RUN-JAME-WEB-CALLOUT-REPAIR-001` | `Audit and implement the Callout component` | `planned` | **OK** |

El `queue_order 29` es el run retirado, ya cerrado con
`closeout_result = discarded_by_RETIRO-PILA-DESHACER-GLOBAL-CANTU` y su `queue_order`
intacto. **Verificado en disco**, no heredado del record del retiro.

**Objetivos y fases nombrados por el encargo — existen los cuatro, con ese título exacto:**

| objetivo | id | fase | id | runs en la fase (antes) |
|---|---|---|---|---|
| `Editor and Engine Shared Features` | **`O5`** | `Formula Inserter` | **`O5.P3`** | 3 — `qo` 27, 28, 49 |
| `Cantu Studio UX` | **`O4`** | `Cantu Studio UX Audit` | **`O4.P5`** | 2 — `qo` 29, 57 |

Los dos títulos de fase son **únicos en todo el archivo** y cada uno vive dentro del objetivo
que el encargo nombra. Ninguno se creó, renombró ni movió.

## 3. EL ANCLA DEL SEGUNDO RUN — DERIVADA DE DISCO, NO DEL TICKET

El ticket no da la posición del segundo run a propósito. Se localizó en el canónico el único
run cuyo título es, verbatim, `Audit Cantu Studio UX and route concrete follow-up runs`:

| campo | valor derivado |
|---|---|
| **`queue_order`** | **57** (antes de escribir) |
| **`run_id`** | **`RUN-JAME-AUTHORING-WORKSPACE-UX-AUDIT-001`** |
| **objetivo** | **`O4` Cantu Studio UX** |
| **fase** | **`O4.P5` Cantu Studio UX Audit** |
| `status` | `planned` |
| `depends_on` | `["RUN-JAME-WEB-READINESS-EVIDENCE-001","RUN-JAME-SLIDE-READINESS-EVIDENCE-001"]` |

**Una sola coincidencia sobre 71 runs.** No hay parada por este motivo. Ese `run_id` es el
que viajó verbatim al `depends_on` del segundo run, y la derivación **se repitió dentro del
script de aplicación**, contra el canónico y no contra el respaldo, para que el valor escrito
no dependiese de ninguna transcripción.

**Y un dato que decidió la vía de inserción:** el ancla vive en `O4.P5`, que es **exactamente
la fase de destino del segundo run**. Eso no se supuso: se comprobó, y el script aborta si no
coincide.

## 4. El motor, no el JSON

**Ningún byte del roadmap se editó a mano.** Todo el contenido escrito lo produjo el motor.

### 4.a Por qué NO se usó el CLI local de `cantu-studio`

`projects/cantu-studio/tools/roadmap/roadmap-edit.mjs` **rehúsa el pre-flight** contra su
propio canónico: su motor (1 213 líneas) no acepta un conjunto de ids externos, así que la
arista entre proyectos le resulta indistinguible de una errata. El motor de `aiw-console`
(2 170 líneas) sí, por CONTRATO §10.d. **No se tocó el CLI local para hacerle aceptar el
archivo**; queda exactamente como estaba.

### 4.b Ruta y firma del motor

```
projects/aiw-console/tools/roadmap/roadmap-plan.mjs   343 líneas   md5 2ca431015b3e3a580a218f758fb0fa93
projects/aiw-console/tools/roadmap/roadmap-core.mjs  2170 líneas   md5 4d56934608216f7a2e6323f209abf7d9
```

Para contraste, el CLI local que rehúsa:

```
projects/cantu-studio/tools/roadmap/roadmap-core.mjs  1213 líneas  md5 8e603f1f3309b055b0e7fe60c285f7eb
projects/cantu-studio/tools/roadmap/roadmap-plan.mjs   271 líneas  md5 8ec46545900a7c8c7e978fe103532600
projects/cantu-studio/tools/roadmap/roadmap-edit.mjs   468 líneas  md5 dcf7bd60af022d3de6f90858b3166cda
```

**Los dos md5 del motor de la consola son los mismos que registró
`INSERCION-MONTAJE-INSERTOR-FORMULA-CANTU.md`: el motor no ha cambiado entre las dos
inserciones.**

Firma de la operación:

```js
planEdit({ filePath, op, args, externalRunIds })
  -> { ok, stage: read|parse|preflight|mutate|postcheck|ok, errors, warnings, remap, serialized, bytes, baseline, eol }

core.insertRun(obj, { runId, title, summary, fullDescription, status, dependsOn,
                      after | before | endOfPhase })
core.moveRun  (obj, { run, after | before | toOrder, toPhase })
applyPlan({ filePath, serialized, validate })   // core.applyWrite: backup en tmpdir ->
                                                // temp en el mismo dir -> fsync -> rename
```

`externalRunIds` se compuso con `externalRunIdsFor("cantu-studio")` de
`project-console/serve.mjs:335`, que lo lee del registro (`project-console/projects.json`).
**No se levantó ningún servidor:** `serve.mjs` sólo llama `server.listen` bajo su guarda
`RUN_DIRECTLY` (`serve.mjs:947`), e importarlo no la dispara. Resultado: **102 ids
externos**, y el id de la arista colgante **resuelve entre ellos** — dependencia externa
legal confirmada contra el conjunto de proyectos, no supuesta.

**Un detalle medido, no heredado:** el registro tiene hoy **cuatro** entradas
(`aiw-console`, `cantu-studio`, `cantu-quizzes-latex`, `aiw`) frente a las tres que registró
el record anterior, y aun así el conjunto **sigue siendo de 102**: excluida la activa, los
102 salen de `aiw-console` (**56 runs**) y `aiw` (**46**), y **`cantu-quizzes-latex` no
aporta ninguno** porque su árbol no resuelve en la ruta que el registro apunta. **Se declara
y no se repara: no es de este encargo.**

La autoridad de escritura inyectada en `applyPlan` fue el propio validador de estado del
proyecto; un código distinto de 0 dispara rollback desde el respaldo del motor. **Las tres
operaciones devolvieron `written: true, rolledBack: false`.**

### 4.c Renumera de forma estable — comprobado antes de escribir

`applyOrder` (`roadmap-core.mjs:339`) asigna `queue_order = índice + 1` sobre el orden global
y luego reordena los `runs` de cada fase por ese valor. Determinista, sin huecos y sin
depender del orden de llegada. Es lo que el criterio 4 exigía comprobar antes de escribir, y
el ensayo lo confirmó en la práctica: **el resultado predicho y el escrito coinciden byte a
byte** (§5).

### 4.d La vía usada para insertar en cada fase — y por qué es distinta en cada una

Es la lección de `INSERCION-MONTAJE-INSERTOR-FORMULA-CANTU.md` §3.d, aplicada **y afinada con
el dato**. `insertRun` **deriva la fase del ancla** (`roadmap-core.mjs:845-857`:
`targetPhase = entry.phase`), y `moveRun` sin `toPhase` **no reubica entre fases**.

**Run 1 — dos pasos, porque el ancla de posición está en OTRA fase.** El `queue_order` 30 lo
ocupaba `RUN-JAME-WEB-CALLOUT-REPAIR-001`, que vive en `Web Components - Basics`. Un
`--before` sobre él habría metido el run nuevo en la fase del Callout, no en `O5.P3`.

| # | op | args | efecto |
|---:|---|---|---|
| 1 | `insert` | `endOfPhase: O5.P3` | nace en la fase correcta, en `qo` 50 |
| 2 | `move` | `toOrder: 30` | a su posición final, **sin** `toPhase` |

**Run 2 — un solo paso, y se justifica con la medición.** Su ancla de posición
—`RUN-JAME-AUTHORING-WORKSPACE-UX-AUDIT-001`— **ya vive en `O4.P5`, que es su fase de
destino**. La derivación de fase que en el run 1 es un peligro, aquí da precisamente el
resultado buscado, así que `insert --after <ancla>` da **fase correcta y posición correcta a
la vez**. No es un atajo tomado por gusto: el script comprueba
`ANCHOR.__phaseId === ph2.phaseId` y **aborta** si no casa.

| # | op | args | efecto |
|---:|---|---|---|
| 3 | `insert` | `after: RUN-JAME-AUTHORING-WORKSPACE-UX-AUDIT-001` | nace en `O4.P5`, en `qo` 59, inmediatamente detrás del ancla |

**`insert` NO es batchable** —`roadmap-plan.mjs` lo rechaza expresamente por cambiar
identidad—, así que son tres operaciones y tres escrituras, no una. Las tres pasaron
`stage: ok`: pre-flight, mutación y post-check, más `checkIdentityPreserved`.

### 4.e Contigüidad de fase: sigue sin ser una invariante de este canónico

`checkInvariants` sólo exige unicidad y contigüidad **globales** de `queue_order`, no por
fase. Tras escribir, `O5.P3` queda con `qo` 27, 28, **30** y 50, y `O4.P5` con 29, 58 y
**59**. Es una forma que el archivo ya tenía. No se introdujo nada nuevo.

## 5. El dry-run, reportado antes de aplicar

El ensayo se corrió **completo y encadenado fuera de los dos repos**: copia del respaldo en
el scratchpad, las tres operaciones sobre esa copia, y verificación de los criterios 8 y 9
sobre el resultado — **todo antes de que el canónico recibiera un solo byte**. El canónico se
volvió a medir tras el ensayo: seguía en `7b52581a…`, intacto.

**OP 1** — `insert --end-of-phase O5.P3`. `stage: ok`, `eol "\r\n"`, 142 715 bytes,
`addedRun: RUN-CANTU-INSERTER-NATIVE-UNDO-001`. Remap de **23 filas**: el run nuevo entra en
`qo` 50 y los 22 que estaban en 50..71 suben a 51..72.

**OP 2** — `move --to-order 30`, sin `--to-phase`. `stage: ok`, 142 715 bytes. Remap de
**21 filas**: el run nuevo baja de 50 a 30 y los 20 que estaban en 30..49 suben a 31..50.

**OP 3** — `insert --after RUN-JAME-AUTHORING-WORKSPACE-UX-AUDIT-001`. `stage: ok`,
145 337 bytes, `addedRun: RUN-CANTU-EDITOR-HISTORY-SYSTEM-001`. Remap de **15 filas**: el run
nuevo entra en `qo` 59 y los 14 que estaban en 59..72 suben a 60..73.

Los dos remaps intermedios describen estados transitorios que la operación siguiente
reconduce. Lo que importa es el neto.

**Remap neto, respaldo → resultado, y su comparación con el criterio 8:**

```
runs añadidos: 2
  -> qo 30  RUN-CANTU-INSERTER-NATIVE-UNDO-001    (O5 / O5.P3)
  -> qo 59  RUN-CANTU-EDITOR-HISTORY-SYSTEM-001   (O4 / O4.P5)
runs sin mover:   29   (qo 1..29)
runs desplazados: 42   (origen qo 30..71  ->  destino qo 31..73)
```

| lo que declara el criterio 8 | lo que dio el dry-run | ¿casa? |
|---|---|:--:|
| `#1`–`#29` byte-idénticos al respaldo | 29 de 29 idénticos **con el objeto completo, `queue_order` incluido** | **OK** |
| del 30 hasta el ancla, todos **+1** | `qo` 30..**57** — 28 runs, **el ancla incluida** (57 → 58) — todos +1 | **OK** |
| del ancla en adelante, todos **+2** | `qo` **58**..71 — 14 runs — todos +2 | **OK** |

29 + 28 + 14 = 71, y 71 + 2 = 73. **Nada más se movió, así que no hubo motivo para parar.**

**El ensayo predijo el resultado exacto.** El archivo del ensayo y el canónico escrito son
**byte a byte idénticos**: mismo md5 `8b5d85778efa0acc0eecf96fcc056c84`. El ensayo se repitió
tras aplicar, partiendo otra vez del respaldo, y volvió a dar el mismo md5: **la operación es
reproducible desde el respaldo**.

## 6. Qué se escribió

**Dos runs nuevos, los dos `planned`, los dos sin clave `lane`** (el `DEVELOPMENT` por
defecto se resuelve al leer) y **sin ningún campo de clasificación**. Claves en disco, en
orden canónico y sin ninguna más, en los dos:

`run_id, queue_order, title, summary, full_description, status, depends_on`

| campo | RUN 1 | RUN 2 |
|---|---|---|
| `run_id` | `RUN-CANTU-INSERTER-NATIVE-UNDO-001` | `RUN-CANTU-EDITOR-HISTORY-SYSTEM-001` |
| `queue_order` | **30** | **59** |
| `title` | `Make the formula inserter write through a path the browser records for undo` (75 car.) | `Design and build a per-field editing history for the editor` (59 car.) |
| objetivo | `O5` Editor and Engine Shared Features | `O4` Cantu Studio UX |
| fase | `O5.P3` Formula Inserter, índice 2 | `O4.P5` Cantu Studio UX Audit, índice 2 |
| `status` | `planned` | `planned` |
| `depends_on` | `[]` | `["RUN-JAME-AUTHORING-WORKSPACE-UX-AUDIT-001"]` — **derivado del §3** |
| `lane` | **sin clave** | **sin clave** |
| `summary` | 189 caracteres | 194 caracteres |
| `full_description` | 1 609 caracteres | 1 998 caracteres |

`title`, `summary` y `full_description` se escribieron verbatim desde el encargo — que viajó
en un JSON, no por ningún shell — y se verificaron carácter a carácter contra esa fuente
después de escribir. **El único carácter fuera de ASCII en los seis campos es una raya
`—` (U+2014) en el `full_description` del run 1**; ninguno de los dos lleva CR ni LF.

El archivo pasó de **140 547 a 145 337 bytes**, md5 `7b52581a…` →
**`8b5d85778efa0acc0eecf96fcc056c84`**. CRLF preservado (1 372 CRLF sobre 1 372 LF: ningún LF
suelto), sin BOM, cerrando en `}\r\n` igual que el respaldo.

## 7. Verificación posterior, campo a campo contra el respaldo (criterio 9)

Todo medido sobre el canónico ya escrito, comparándolo con el respaldo.

| comprobación | resultado |
|---|---|
| total = 73 | **OK** — 73 |
| `queue_order` 1..73 denso, único y contiguo | **OK** — min 1, max 73, 73 únicos |
| `run_id` únicos | **OK** — 73 de 73 |
| 0 `depends_on` colgantes salvo exactamente uno, el externo legal | **OK** — sólo `RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 -> RUN-CANTU-ROADMAP-CONTENT-AUDIT-001` |
| 0 fases con 0 runs | **OK** — `[]` |
| **cero runs `active`** | **OK** — 0. Reparto: `completed` 31, `planned` 42 |
| 7 objetivos / 28 fases, mismos ids y títulos | **OK** — comparados en bloque contra el respaldo |
| raíz idéntica (`schema_version`, `roadmap_id`, `title`, `lanes`, `care_budget`) | **OK** |

**Las tres posiciones que el criterio 9 exige:**

| `qo` | título en disco | ¿casa? |
|---:|---|:--:|
| 30 | `Make the formula inserter write through a path the browser records for undo` | **OK** |
| 31 | `Audit and implement the Callout component` | **OK** |
| 58 | `Audit Cantu Studio UX and route concrete follow-up runs` — **el ancla** | — |
| 59 | `Design and build a per-field editing history for the editor` | **OK — inmediatamente después de su ancla** |

**La cola de 27 a 34, para ver el entorno del run 1:**

| `qo` | `status` | título |
|---:|---|---|
| 27 | completed | Mount the formula inserter so an author can place a formula at the cursor inside prose |
| 28 | completed | Show the author a rendered preview of a prose paragraph that contains formulas |
| 29 | completed | Give the author undo and redo across the whole editor *(el retirado)* |
| **30** | **planned** | **Make the formula inserter write through a path the browser records for undo** |
| 31 | planned | Audit and implement the Callout component |
| 32 | planned | Audit and implement the Details component |
| 33 | planned | Audit and implement the Arithmetic component |
| 34 | planned | Audit and implement the Rule component |

**Ningún run existente se modificó** (criterio 8). Los 71 runs previos se compararon uno a
uno con el respaldo tras retirar `queue_order` del objeto: **0 con cualquier otro campo
alterado**, 0 con el orden de claves alterado, 0 desaparecidos, 0 cambiados de objetivo o
fase. Ni `title`, ni `summary`, ni `full_description`, ni `status`, ni `depends_on`. Los
**29** primeros son **byte-idénticos al respaldo con el objeto completo, `queue_order`
incluido** (29 de 29).

**No hubo que restaurar nada.**

## 8. Validador, por la vía que no escribe

`node tools/project-console/validate-project-console-state.mjs`, desde `projects/cantu-studio`.

**ANTES** (exit 0):

```
Project Console state validation passed.
Roadmap v3 prototype: 7 objectives / 28 phases / 71 runs; queue groups needs_human_decision=0 now=0 ready_next=15 later=25 history=31
Docs indexed: 149
Docs curated primary-visible: 60 of 149 registered
Component statuses: 16
Git provenance episodes: 9
Git history snapshot: 508 commits / 1 branches (1 visible, 0 backup hidden); current=main; run-associated=3; source=local_git_autosync
Roadmap rebase warnings (non-blocking):
- .aiw/roadmap/roadmap.json run RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 depends on RUN-CANTU-ROADMAP-CONTENT-AUDIT-001, which does not resolve in this roadmap. With a single roadmap loaded this cannot be decided: it may be a legal external dependency — a run that lives in another project (CONTRATO §10.d Regla 2) — or a typo in the run id. Both are possible and one loaded roadmap cannot tell them apart; resolve it against the full set of projects to distinguish external from write error.
```

**DESPUÉS** (exit 0):

```
Project Console state validation passed.
Roadmap v3 prototype: 7 objectives / 28 phases / 73 runs; queue groups needs_human_decision=0 now=0 ready_next=16 later=26 history=31
Docs indexed: 149
Docs curated primary-visible: 60 of 149 registered
Component statuses: 16
Git provenance episodes: 9
Git history snapshot: 508 commits / 1 branches (1 visible, 0 backup hidden); current=main; run-associated=3; source=local_git_autosync
Roadmap rebase warnings (non-blocking):
- .aiw/roadmap/roadmap.json run RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 depends on RUN-CANTU-ROADMAP-CONTENT-AUDIT-001, which does not resolve in this roadmap. With a single roadmap loaded this cannot be decided: it may be a legal external dependency — a run that lives in another project (CONTRATO §10.d Regla 2) — or a typo in the run id. Both are possible and one loaded roadmap cannot tell them apart; resolve it against the full set of projects to distinguish external from write error.
```

El aviso es **el conocido y es legal**: la arista resuelve entre los 102 ids externos (§4.b).
No es hallazgo, no se reparó, y es idéntico antes y después, palabra por palabra. La línea de
`active run derived stages` no aparece en ninguna de las dos: no hay run `active` del que
derivar etapas, ni antes ni después.

### El movimiento, medido

| grupo | antes | después | Δ |
|---|---:|---:|---:|
| runs | 71 | **73** | **+2** |
| `needs_human_decision` | 0 | 0 | 0 |
| `now` | 0 | 0 | 0 |
| **`ready_next`** | **15** | **16** | **+1** |
| **`later`** | **25** | **26** | **+1** |
| `history` | 31 | 31 | **0** |

**El encargo no daba `ready_next` a propósito. Medida antes y después: sube en uno.** La suma
cierra en las dos: 31+0+15+25 = 71 y 31+0+16+26 = 73.

**El movimiento se explica exactamente con el dato de las dependencias, y los dos runs nuevos
caen en grupos distintos por construcción:**

- **El run 1 no tiene dependencias** (`depends_on: []`), así que **nada le impide tomarse** y
  entra en **`ready_next` (+1)**.
- **El run 2 cuelga de `RUN-JAME-AUTHORING-WORKSPACE-UX-AUDIT-001`, que está `planned`**, no
  `completed`. Su dependencia no está satisfecha, así que **no puede estar listo para
  tomarse** y cae en **`later` (+1)**. Es deliberado: el propio texto del run dice por qué se
  sienta ahí y no antes — los runs de componentes escriben sobre las mismas superficies del
  editor, y este run sigue a la auditoría de UX que enruta el trabajo concreto.

**`history=31` y `now=0` no se mueven** — coherente con no haber cerrado ni abierto nada.

## 9. Las cifras del encargo — verificadas una a una

**El encargo avisa de que pueden estar mal. Se midieron todas. Todas eran correctas.**

| cifra del encargo | cómo se verificó | resultado |
|---|---|---|
| **71 de partida** | recuento sobre el árbol **y** salida del validador | **CONFIRMADA — 71** |
| **73 de llegada** | recuento sobre el árbol **y** salida del validador | **CONFIRMADA — 73** |
| **`history=31`** | validador antes y después; recuento propio `completed` | **CONFIRMADA — 31 en las dos, y `completed`=31 antes / 31 después** |
| **cero `active`** | recuento por status antes y después | **CONFIRMADA — 0 y 0** |
| `queue_order` 1..N denso y contiguo | `every(v,i) => v === i+1` antes y después | **CONFIRMADA — 1..71 y 1..73** |
| `qo` 29 y 30 con los títulos dados | comparación estricta de cadena | **CONFIRMADA — las dos** |

## 10. Las afirmaciones de los records, VERIFICADAS y no heredadas

El encargo manda leer `DESHACER-Y-REHACER-GLOBAL-CANTU.md` y
`RETIRO-PILA-DESHACER-GLOBAL-CANTU.md` y **verificar sus afirmaciones**, porque el texto de
los dos runs nuevos las transporta. Se comprobó contra disco lo que se puede comprobar sin
navegador y sin ejecutar el trabajo de los runs:

| afirmación que el texto de los runs transporta | verificación de hoy |
|---|---|
| «around eighty programmatic writers across the editor» | **CONFIRMADA por censo propio.** A (escritura directa al DOM) **1**; B (`setValue` de RHF vivo) **0** —el único del repo está en `LessonContextBar.jsx`, huérfano, y el otro acierto es `mathfield.setValue` de MathLive—; C (`reset` de RHF en `EditorPage.jsx`) **8**; D (mutadores de `useFieldArray`) **18 en 5 archivos**; E+F (`onChange` con valor por código) **54** = 57 `onChange(` menos los 3 de `ComponentGuide.jsx`, que **no toca RHF** (0 `useForm`/`Controller`/`register`/`control`). **Total 77, u 81 contando la clase F.** «Unos ochenta» es correcto |
| «the form library the editor uses offers no history of its own» | **CONFIRMADA.** React Hook Form **7.75.0** instalado; barrido de `undo\|redo\|history` sobre todo su `dist/`: **0 ocurrencias** |
| «the draft lives in a single form instance per document, not per block or per field» | **CONFIRMADA.** **Un solo `useForm` en todo `editor-ui/src`**, `EditorPage.jsx:253`. **Cero** `FormProvider` y **cero** `useFormContext` |
| «the stack was retired and the editor returned to its previous state» | **CONFIRMADA en lo que se puede medir sin construir.** Los tres archivos de la pila **ya no existen** en disco: `features/editor/utils/draftHistory.js`, `features/editor/hooks/useDraftHistory.js` y `compiler-api/tests/webEditorUndoRedoGlobal.test.mjs`. **Cero manejadores de Ctrl/Cmd+Z**: la única mención de `ctrlKey`/`metaKey` en todo `editor-ui/src` es `SmartFormulaField.jsx:395`, y es para **excluir** las combinaciones con Ctrl. Los únicos controles de deshacer/rehacer que quedan son los de MathLive (`SmartFormulaField.jsx:740` y `:743`) |
| «the inserter is one [of the writers]» | **CONFIRMADA.** `writeUncontrolledValue` sigue definida en `InlineFormulaField.jsx:57` y usada en `:161`, y es **la única de su clase** |
| el run retirado quedó cerrado sin moverse | **CONFIRMADA en disco.** `qo 29`, `RUN-CANTU-EDITOR-UNDO-REDO-001`, `status completed`, `closeout_result = discarded_by_RETIRO-PILA-DESHACER-GLOBAL-CANTU`, `O4/O4.P5`, `depends_on []` |

**UNA CORRECCIÓN DE RUTA, dicha en voz alta:** los records de la construcción y del retiro
escriben el insertor y el campo inteligente bajo `features/editor/…`. **La ruta real es
`src/features/math-authoring/inlineFormula/` y `src/features/math-authoring/smartFormulaField/`.**
Son abreviaturas de aquellos records, no archivos distintos: los números de línea que citan
casan al dígito con lo que hay en disco.

**LO QUE NO SE VERIFICÓ, Y SE DECLARA:** las mediciones de navegador —que el setter del
prototipo inutiliza el deshacer nativo, que el navegador miente al preguntarle, y que
`execCommand('insertText')` conserva la pila— **no se remidieron aquí**. Remedirlas es
trabajo del run 1, que además **lo exige por escrito** («VERIFY ALSO that the chosen write
path is still available and behaves as measured before relying on it»). Tampoco se
reconstruyó el paquete para reconfirmar el «vuelve a su tamaño previo al dígito»: eso exige
`vite build`, que es ejecutar trabajo y está fuera de alcance. **Ambas fronteras quedan
declaradas en vez de darse por buenas en silencio.**

## 11. Qué NO se hizo

- **No se editó el JSON a mano**, con ningún pretexto. Todo el contenido lo produjo el motor.
- **No se cerró ni se abrió ningún run.** Ningún `status` cambió, tampoco el de los dos
  nuevos. Cero runs `active` antes y después.
- **No se re-emitió `.project/`** de ningún proyecto. Verificado por mtime: los seis ficheros
  de `projects/cantu-studio/.project/` llevan `2026-08-05 03:52:37/38`, y la escritura del
  canónico fue a las **13:27:09**. **Consecuencia medida y deliberada: la emisión queda una
  vuelta por detrás** — `.project/roadmap.json` tiene **71 runs** frente a los **73** del
  canónico. Re-emitir estaba fuera de alcance, así que se deja así y se nombra.
- **No se ejecutó Git** en ninguna forma, ni de lectura ni de escritura.
- **No se levantó la consola ni ningún servidor.** `serve.mjs` se importó para componer el
  conjunto de ids externos; su guarda `RUN_DIRECTLY` impide que importarlo escuche.
- **No se tocó `title`, `summary` ni `full_description`** de ningún run existente —
  verificado, 71 de 71.
- **No se creó, borró, renombró ni movió** ningún objetivo ni ninguna fase. Los títulos de
  los 7 objetivos y las 28 fases se compararon en bloque contra el respaldo: idénticos.
- **No se clasificó ningún run**, ni los nuevos ni los viejos. Ninguno de los dos lleva
  clave `lane`, ni `closeout_result`, ni `progress`.
- **No se ejecutó nada del trabajo que los dos runs nuevos describen.** En particular **no se
  hizo el arreglo mínimo del insertor**: `InlineFormulaField.jsx` no se abrió para
  modificarlo, sólo para verificar que `writeUncontrolledValue` sigue donde el record dice.
  No se escribió ninguna línea de sistema de historial. Ese trabajo —incluida la medición de
  navegador que el propio run 1 exige antes de construir— queda íntegro para cuando se abran.
- **No se tocó el `roadmap-edit.mjs` de `cantu-studio`** para hacerle aceptar el archivo. Su
  rechazo se rodeó conduciendo el motor de la consola; el CLI local queda como estaba.
- **No se reparó ninguna deriva conocida:** ni el aviso de dependencia externa del validador,
  ni la entrada `cantu-quizzes-latex` del registro que no aporta ids (§4.b), ni la
  discrepancia de `Component statuses: 16`, ni ninguna otra.

## 12. Estado final

**Dos runs nuevos en el canónico, los dos `planned`, ninguno tomado.**

- **`qo 30` — `RUN-CANTU-INSERTER-NATIVE-UNDO-001`**, en `O5.P3 Formula Inserter`, sin
  dependencias, **listo para tomarse** (`ready_next`). Es el arreglo mínimo que devuelve el
  deshacer del insertor, el paso atrás que el retiro declaró y aceptó.
- **`qo 59` — `RUN-CANTU-EDITOR-HISTORY-SYSTEM-001`**, en `O4.P5 Cantu Studio UX Audit`,
  colgando de la auditoría de UX que lo precede, **en espera** (`later`). Es el sistema de
  historial hecho por campo, con la medición del intento fallido dentro para que nadie lo
  repita.

**El reparto que `RETIRO-PILA-DESHACER-GLOBAL-CANTU.md` §2 dejó pendiente queda hecho, y
hecho por el motor.** Ningún run existente se modificó; el desplazamiento fue exactamente el
declarado; y el canónico queda en `8b5d85778efa0acc0eecf96fcc056c84`, 145 337 bytes, CRLF
puro, con el validador en verde.
