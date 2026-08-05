# INSERCIÓN DE UN RUN EN CANTU — MONTAJE DEL INSERTOR DE FÓRMULA

**Fecha:** 2026-08-04
**Encargo:** escritura sobre el roadmap canónico de `cantu-studio`, conducida por el
motor de roadmap de `aiw-console`. Taller, no run.
**Ficheros escritos:** `projects/cantu-studio/.aiw/roadmap/roadmap.json` (vía motor);
este record.
**Ficheros NO tocados:** `.project/` de ningún proyecto, ningún test, fixture, código de
producción ni documento fuera de este record. No se ejecutó Git en ninguna forma.

Sucede a `INSERCION-FORMULA-EN-LINEA-Y-LECCION-CANTU.md`, que se leyó antes de
planificar y cuya vía se reutilizó. La lección que aquel record dejó — el alta deriva la
fase del ancla, así que hay que dar de alta al final de la fase propia y luego mover — se
aplicó tal cual y volvió a funcionar.

---

## 0. Este encargo NO TUVO RUN, y por qué

**No se abrió, no se cerró y no se tocó el `status` de ningún run** — tampoco el del run
nuevo, que nace `planned` y sigue `planned`. Al empezar había **cero runs `active`** y al
terminar sigue habiendo **cero**.

La razón es de naturaleza, no de conveniencia: **este encargo no ejecuta trabajo del
roadmap, escribe el roadmap**. Es mantenimiento de la cola — la operación que decide qué
runs existen y en qué orden — y colocarla dentro de un run la volvería su propio sujeto.
El trabajo que el run nuevo describe **no se ha ejecutado ni una línea**; queda íntegro
para cuando se abra.

## 1. Respaldo, antes de escribir un byte

Copia byte a byte fuera de los dos repos, en el scratchpad de sesión. Es la vía de
reversión: **`git checkout` no se usa para deshacer en este workspace porque reescribe los
finales de línea**, y el canónico es CRLF.

| | ruta | md5 | bytes |
|---|---|---|---|
| origen | `projects/cantu-studio/.aiw/roadmap/roadmap.json` | `0fd19f944f1a5c7061efdb73d016b6a1` | 126 655 |
| respaldo | `…/scratchpad/roadmap.BACKUP.json` | `0fd19f944f1a5c7061efdb73d016b6a1` | 126 655 |

`cmp` byte a byte: idénticos. El respaldo se volvió a medir al terminar y **sigue en
`0fd19f944f1a5c7061efdb73d016b6a1`**: nada lo tocó durante la operación.

**El canónico no estaba siendo escrito por otro proceso.** Dos muestras de `mtime` y
tamaño separadas por 3 s dieron el mismo valor (`2026-08-04 19:49:56.330361200`,
126 655 bytes), y además cada una de las dos operaciones comprobó el **baseline**
(compare-and-swap sha256 del motor) contra lo que esperaba antes de aplicar: las dos
casaron.

## 2. Precondiciones medidas — todas casan

Medidas sobre el canónico antes de cualquier escritura, con guarda que abortaba si algo no
casaba.

- **Total: 68 runs.** Verificado contra disco, no dado por bueno desde el ticket.
- **`queue_order` 1..68 denso, único y contiguo.** 68 valores, 68 únicos, min 1, max 68,
  cada uno igual a su índice + 1.
- **Cero runs `active`.** Reparto de status: `completed` 26, `planned` 42. La cifra que el
  encargo daba (`history=26`, cero `active`) es la real.
- 7 objetivos / 28 fases. 0 fases con 0 runs. `run_id` todos únicos (68 de 68).
- 1 `depends_on` colgante, el conocido:
  `RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 -> RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`.
- El `run_id` nuevo **no existía** ya en el canónico.

**Los tres títulos ancla, verbatim:**

| `qo` | `run_id` en disco | título en disco | ¿casa? |
|---:|---|---|:--:|
| 25 | `RUN-CANTU-INLINE-FORMULA-BEHAVIOUR-LOCK-001` | `Lock the existing inline formula behaviour with tests before any component consumes it` | OK |
| 26 | `RUN-CANTU-LESSON-LOAD-FAILURE-SURFACING-001` | `Repair the lesson that fails to load and stop the build from swallowing the failure` | OK |
| 27 | `RUN-JAME-WEB-CALLOUT-REPAIR-001` | `Audit and implement the Callout component` | OK |

**Objetivo y fase nombrados por el encargo — existen los dos, con ese título exacto:**

- `Editor and Engine Shared Features` → objetivo **`O5`**, único con ese título.
- `Formula Inserter` → fase **`O5.P3`**, única con ese título **en todo el archivo**, y
  dentro de `O5`. Contenía **1 run**: `RUN-JAME-FORMULA-INSERTER-INTEGRATION-001`, en
  `queue_order` 46, `planned`.

Ninguno se creó, renombró ni movió.

### 2.b El `run_id` de la dependencia, DERIVADO y no tecleado

El `depends_on` del run nuevo se leyó del canónico buscando el run con
`queue_order === 25` y tomando su `run_id`:

> **`RUN-CANTU-INLINE-FORMULA-BEHAVIOUR-LOCK-001`**

Su título en disco coincide verbatim con el que el encargo declara para esa posición, lo
que confirma que la derivación apunta al run que el encargo nombraba. La derivación se
repitió dentro del script de aplicación, contra el canónico y no contra el respaldo, para
que el valor escrito no dependiese de ninguna transcripción.

### 2.c Contigüidad de fase: sigue sin ser una invariante de este canónico

El run nuevo entra en `O5.P3`, cuyo único run vive en `queue_order` 46, y su destino es el
27. El record anterior ya midió que **una fase no tiene por qué ocupar `queue_order`
contiguos** en este archivo, y sigue siendo así: `checkInvariants` sólo exige unicidad y
contigüidad **globales** de `queue_order`, no por fase. Tras escribir, `O5.P3` queda con
`qo 27` y `qo 47`, una forma que el archivo ya tenía en otras fases. No se introdujo nada
nuevo.

## 3. El motor, no el JSON

**Ningún byte del roadmap se editó a mano.** Todo el contenido escrito lo produjo el motor.

### 3.a Por qué NO se usó el CLI local de `cantu-studio` — reconfirmado, no heredado

`projects/cantu-studio/tools/roadmap/roadmap-edit.mjs` **rehúsa el pre-flight** contra su
propio canónico. Reconfirmado de primera mano en esta sesión (dry-run, sin `--apply`, no
escribió nada):

```
Refusing; nothing written.
  - target file already fails the invariants; fix it before editing (C:\Users\chris\Documents\AIW_Workspace\projects\cantu-studio\.aiw\roadmap\roadmap.json):
  - run RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 depends on unknown run RUN-CANTU-ROADMAP-CONTENT-AUDIT-001 (orphaned dependency)
```
exit 1.

La causa está medida y es **legal**: el motor local (1 213 líneas) no acepta un conjunto de
ids externos, así que una arista entre proyectos le resulta indistinguible de una errata.
El motor de `aiw-console` (2 170 líneas) sí, por CONTRATO §10.d.

### 3.b Ruta y firma del motor

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

El `roadmap-core.mjs` de la consola sigue en el mismo md5 que registró el record anterior:
el motor no ha cambiado entre las dos inserciones.

Firma de la operación:

```js
planEdit({ filePath, op, args, externalRunIds })
  -> { ok, stage: read|parse|preflight|mutate|postcheck|ok, errors, warnings, remap, serialized, baseline, eol }

core.insertRun(obj, { runId, title, summary, fullDescription, status, dependsOn,
                      after | before | endOfPhase })
core.moveRun  (obj, { run, after | before | toOrder, toPhase })
applyPlan({ filePath, serialized, validate })   // core.applyWrite: backup en tmpdir ->
                                                // temp en el mismo dir -> fsync -> rename
```

`externalRunIds` se compuso con `externalRunIdsFor("cantu-studio")` de
`project-console/serve.mjs`, que lo lee del registry
(`project-console/projects.json`, entradas `aiw-console`, `cantu-studio`, `aiw`).
**No se levantó ningún servidor:** `serve.mjs` sólo llama `server.listen` bajo su guarda
`RUN_DIRECTLY` (`serve.mjs:947`), e importarlo no la dispara. Resultado: **102 ids
externos**, y el id de la arista colgante **resuelve entre ellos** — dependencia externa
legal confirmada contra el conjunto de proyectos, no supuesta.

La autoridad de escritura inyectada en `applyPlan` es la misma que usa la consola: releer
el archivo recién renombrado y correrle `checkInvariants` con las dependencias externas
resueltas; un código distinto de 0 dispara rollback desde el respaldo del motor. Las dos
operaciones devolvieron `re-read OK`.

### 3.c Renumera de forma estable — comprobado antes de escribir

`applyOrder` (`roadmap-core.mjs:339`) asigna `queue_order = índice + 1` sobre el orden
global y luego reordena los `runs` de cada fase por ese valor. Determinista, sin huecos y
sin depender del orden de llegada. Es lo que el criterio 4 exigía comprobar antes de
escribir, y el ensayo lo confirmó en la práctica: el resultado predicho y el escrito
coinciden byte a byte.

### 3.d Las dos operaciones, y por qué son dos y no una

Es la lección del record anterior, aplicada. `insertRun` **deriva la fase del ancla**:
`--before RUN-JAME-WEB-CALLOUT-REPAIR-001` habría metido el run nuevo en la fase del
Callout, no en `O5.P3`. Y `move` sin `--to-phase` **no reubica entre fases**, así que el
run conserva la fase en que el `insert` lo puso. La única vía que da fase correcta *y*
posición correcta son dos pasos:

| # | op | args | efecto |
|---:|---|---|---|
| 1 | `insert` | `endOfPhase: O5.P3` | nace en la fase correcta, en `qo` 47 |
| 2 | `move` | `toOrder: 27` | a su posición final, **sin** `toPhase` |

Las dos pasaron `stage: ok` — pre-flight, mutación y post-check, más
`checkIdentityPreserved`.

## 4. El dry-run, reportado antes de aplicar

El ensayo se corrió **completo y encadenado fuera de los dos repos**: copia del respaldo en
el scratchpad, las dos operaciones sobre esa copia, y verificación de los criterios 7 y 8
sobre el resultado — **todo antes de que el canónico recibiera un solo byte**. El canónico
se volvió a medir tras el ensayo: seguía en `0fd19f94…`, intacto.

**Op 1** — `insert --end-of-phase O5.P3`. `stage: ok`,
`addedRun: RUN-CANTU-INLINE-FORMULA-INSERTER-MOUNT-001`. Remap de 23 filas: el run nuevo
entra en `qo` 47 y los 22 que estaban en 47..68 suben a 48..69. El run nuevo nace en
`O5.P3`, objetivo `O5`, como se buscaba.

**Op 2** — `move --to-order 27`, sin `--to-phase`. `stage: ok`. Remap de 21 filas: el run
nuevo baja de 47 a 27 y los 20 que estaban en 27..46 suben a 28..47.

Los dos remaps intermedios describen un estado transitorio que la op 2 reconduce. Lo que
importa es el neto.

**Remap neto, respaldo → resultado:**

```
runs añadidos: 1
  -> qo 27  RUN-CANTU-INLINE-FORMULA-INSERTER-MOUNT-001  (fase O5.P3)
runs sin mover: 26  (qo 1..26)
runs desplazados: 42
  origen qo: 27 .. 68     destino qo: 28 .. 69
  todos desplazados exactamente +1:      true
  ningún run de qo 1..26 desplazado:     true
  todo run de qo 27..68 desplazado:      true
```

Es **exactamente** lo que declara el criterio 7: los 26 primeros quietos, los 42 restantes
+1, un alta en 27. Nada más se movió, así que no hubo motivo para parar.

**El ensayo predijo el resultado exacto.** El archivo del ensayo y el canónico escrito son
**byte a byte idénticos**: mismo md5 `977a50351e8271861f0996ed8cf3944b`. La operación es
reproducible desde el respaldo.

## 5. Qué se escribió

Un run nuevo, `planned`, **sin clave `lane`** (el `DEVELOPMENT` por defecto se resuelve al
leer) y **sin ningún campo de clasificación**. Claves en disco, en orden canónico y sin
ninguna más:

`run_id, queue_order, title, summary, full_description, status, depends_on`

| campo | valor |
|---|---|
| `run_id` | `RUN-CANTU-INLINE-FORMULA-INSERTER-MOUNT-001` |
| `queue_order` | 27 |
| `title` | `Mount the formula inserter so an author can place a formula at the cursor inside prose` (86 car.) |
| objetivo | `O5` Editor and Engine Shared Features |
| fase | `O5.P3` Formula Inserter |
| `status` | `planned` |
| `depends_on` | `["RUN-CANTU-INLINE-FORMULA-BEHAVIOUR-LOCK-001"]` |
| `summary` | 223 caracteres |
| `full_description` | 2 351 caracteres, 5 rayas `—`, ningún otro carácter fuera de ASCII |

`title`, `summary` y `full_description` se escribieron verbatim desde el encargo — que
viajó en un JSON, no por ningún shell — y se verificaron carácter a carácter contra esa
fuente después de escribir.

El archivo pasó de **126 655 a 129 706 bytes**, md5 `0fd19f94…` →
**`977a50351e8271861f0996ed8cf3944b`**. CRLF preservado (1 327 CRLF sobre 1 327 LF: ningún
LF suelto), sin BOM, cerrando en `}\r\n` igual que el respaldo.

## 6. Verificación posterior, campo a campo contra el respaldo

Todo medido sobre el canónico ya escrito, comparándolo con el respaldo.

| comprobación del criterio 8 | resultado |
|---|---|
| total = 69 | **OK** — 69 |
| `queue_order` 1..69 denso, único y contiguo | **OK** — min 1, max 69, 69 únicos |
| `run_id` únicos | **OK** — 69 de 69 |
| 0 `depends_on` colgantes salvo exactamente uno, el externo legal | **OK** — sólo `RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 -> RUN-CANTU-ROADMAP-CONTENT-AUDIT-001` |
| 0 fases con 0 runs | **OK** — `[]` |
| **cero runs `active`** | **OK** — 0. Reparto: `completed` 26, `planned` 43 |
| 7 objetivos / 28 fases, sin cambio | **OK** — y ningún título de objetivo o fase alterado |
| guarda del motor sobre el archivo escrito (`checkInvariants` con externas resueltas) | **OK** — 0 errores |

**La cola de 25 a 31, título verbatim contra la tabla del encargo:**

| `qo` | título en disco | ¿casa? |
|---:|---|:--:|
| 25 | Lock the existing inline formula behaviour with tests before any component consumes it | OK |
| 26 | Repair the lesson that fails to load and stop the build from swallowing the failure | OK |
| 27 | Mount the formula inserter so an author can place a formula at the cursor inside prose | OK |
| 28 | Audit and implement the Callout component | OK |
| 29 | Audit and implement the Details component | OK |
| 30 | Audit and implement the Arithmetic component | OK |
| 31 | Audit and implement the Rule component | OK |

**Ningún run existente se modificó** (criterio 7). Los 68 runs previos se compararon uno a
uno con el respaldo tras retirar `queue_order` del objeto: **0 con cualquier otro campo
alterado**, 0 con el orden de claves alterado, 0 desaparecidos, 0 cambiados de fase. Ni
`title`, ni `summary`, ni `full_description`, ni `status`, ni `depends_on`. Los **26**
primeros son **byte-idénticos al respaldo con el objeto completo, `queue_order` incluido**
(26 de 26). Los **42** que cambiaron de `queue_order` lo hicieron sólo por el
desplazamiento, y todos exactamente **+1**, de 27..68 a 28..69.

No hubo que restaurar nada.

## 7. Validador, por la vía que no escribe

`node tools/project-console/validate-project-console-state.mjs`, desde
`projects/cantu-studio`.

**ANTES** (exit 0):

```
Project Console state validation passed.
Roadmap v3 prototype: 7 objectives / 28 phases / 68 runs; queue groups needs_human_decision=0 now=0 ready_next=17 later=25 history=26
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
Roadmap v3 prototype: 7 objectives / 28 phases / 69 runs; queue groups needs_human_decision=0 now=0 ready_next=17 later=26 history=26
Docs indexed: 149
Docs curated primary-visible: 60 of 149 registered
Component statuses: 16
Git provenance episodes: 9
Git history snapshot: 508 commits / 1 branches (1 visible, 0 backup hidden); current=main; run-associated=3; source=local_git_autosync
Roadmap rebase warnings (non-blocking):
- .aiw/roadmap/roadmap.json run RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 depends on RUN-CANTU-ROADMAP-CONTENT-AUDIT-001, which does not resolve in this roadmap. With a single roadmap loaded this cannot be decided: it may be a legal external dependency — a run that lives in another project (CONTRATO §10.d Regla 2) — or a typo in the run id. Both are possible and one loaded roadmap cannot tell them apart; resolve it against the full set of projects to distinguish external from write error.
```

El aviso es **el conocido y es legal**: la arista resuelve entre los 102 ids externos
(§3.b). No es hallazgo. Es idéntico antes y después, palabra por palabra.

Nótese que la línea de `active run derived stages` que el record anterior recogía **ya no
aparece**: no hay run `active` del que derivar etapas.

### El movimiento, medido

| grupo | antes | después | Δ |
|---|---:|---:|---:|
| runs | 68 | **69** | **+1** |
| `needs_human_decision` | 0 | 0 | 0 |
| `now` | 0 | 0 | 0 |
| **`ready_next`** | **17** | **17** | **0** |
| **`later`** | **25** | **26** | **+1** |
| `history` | 26 | 26 | 0 |

**El encargo no daba `ready_next` a propósito. Medida antes y después: no se mueve.** El
que sube es `later`. La causa está medida y es correcta: el run nuevo depende de
`RUN-CANTU-INLINE-FORMULA-BEHAVIOUR-LOCK-001`, que está en **`planned`**, no `completed`,
así que el run nuevo **no puede estar listo para tomarse** y cae en `later` por
construcción. Es la diferencia con la inserción anterior, donde el run que se dio de alta
con dependencia colgaba de un run ya `completed` y por eso subió `ready_next`.

`history=26` y `now=0` no se mueven — coherente con no haber cerrado ni abierto nada.

## 8. Qué NO se hizo

- **No se editó el JSON a mano**, con ningún pretexto. Todo el contenido lo produjo el
  motor.
- **No se cerró ni se abrió ningún run.** Ningún `status` cambió, tampoco el del nuevo.
  Cero runs `active` antes y después.
- **No se re-emitió `.project/`** de ningún proyecto. Verificado por mtime: los seis
  ficheros de `projects/cantu-studio/.project/` llevan `2026-08-04 19:49:56`, el mismo
  instante que el canónico traía **antes** de esta sesión; la escritura del canónico fue a
  las **19:57:48**. **Consecuencia medida y deliberada: la emisión queda una vuelta por
  detrás** — `.project/roadmap.json` tiene **68 runs** frente a los **69** del canónico.
  Re-emitir estaba fuera de alcance, así que se deja así y se nombra.
- **No se ejecutó Git** en ninguna forma, ni de lectura ni de escritura.
- **No se levantó la consola ni ningún servidor.** `serve.mjs` se importó para componer el
  conjunto de ids externos; su guarda `RUN_DIRECTLY` impide que importarlo escuche.
- **No se tocó `title`, `summary` ni `full_description`** de ningún run existente —
  verificado, 68 de 68.
- **No se creó, borró, renombró ni movió** ningún objetivo ni ninguna fase. Los títulos de
  los 7 objetivos y las 28 fases se compararon en bloque contra el respaldo: idénticos.
- **No se clasificó ningún run**, ni el nuevo ni los viejos.
- **No se ejecutó nada del trabajo que el run nuevo describe.** No se montó ningún
  insertor, no se tocó ninguna superficie del editor, no se midió qué campos de prosa
  llevarían el control. Ese trabajo — incluida la medición que el propio run exige antes de
  construir — queda íntegro para cuando el run se abra.
- **No se tocó el `roadmap-edit.mjs` de `cantu-studio`** para hacerle aceptar el archivo.
  Su rechazo se reconfirmó y se rodeó conduciendo el motor de la consola; el CLI local
  queda exactamente como estaba.
