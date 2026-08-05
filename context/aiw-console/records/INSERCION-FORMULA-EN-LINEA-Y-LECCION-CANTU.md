# INSERCIÓN DE DOS RUNS EN CANTU — FÓRMULA EN LÍNEA Y LECCIÓN QUE NO CARGA

**Fecha:** 2026-08-04
**Encargo:** escritura sobre el roadmap canónico de `cantu-studio`, conducida por el
motor de roadmap de `aiw-console`. Taller, no run.
**Ficheros escritos:** `projects/cantu-studio/.aiw/roadmap/roadmap.json` (vía motor);
este record.
**Ficheros NO tocados:** `.project/` de ningún proyecto, ningún test, fixture, código de
producción ni documento fuera de este record. No se ejecutó Git en ninguna forma.

---

## 0. Este encargo NO TUVO RUN, y por qué

**No se abrió, no se cerró y no se tocó el `status` de ningún run** — ni de los dos
nuevos, que nacen `planned` y siguen `planned`. El run `active` al empezar y al terminar
es el mismo, `RUN-JAME-WEB-NARRATIVE-REPAIR-001`, en `queue_order` 24.

La razón es de naturaleza, no de conveniencia: **este encargo no ejecuta trabajo del
roadmap, escribe el roadmap**. Es mantenimiento de la cola — la operación que decide qué
runs existen y en qué orden — y colocarla dentro de un run la volvería su propio sujeto.
El trabajo que los dos runs nuevos describen **no se ha ejecutado ni una línea**; queda
íntegro para cuando cada uno se abra.

## 1. Respaldo, antes de escribir un byte

Copia byte a byte fuera de los dos repos, en el scratchpad de sesión. Es la vía de
reversión: **`git checkout` no se usa para deshacer en este workspace porque reescribe
los finales de línea**, y el canónico es CRLF.

| | ruta | md5 | bytes |
|---|---|---|---|
| origen | `projects/cantu-studio/.aiw/roadmap/roadmap.json` | `db5e4d067ecb4bc671ad88748b3c051a` | 122 332 |
| respaldo | `…/scratchpad/roadmap.BACKUP.json` | `db5e4d067ecb4bc671ad88748b3c051a` | 122 332 |

`cmp` byte a byte: idénticos. El respaldo se volvió a medir al terminar y **sigue en
`db5e4d067ecb4bc671ad88748b3c051a`**: nada lo tocó durante la operación.

## 2. Precondiciones medidas — todas casan

Medidas sobre el canónico antes de cualquier escritura, con guarda que abortaba si algo
no casaba.

- **Total: 66 runs.** Verificado contra disco, no dado por bueno desde el ticket.
- **`queue_order` 1..66 denso, único y contiguo.** 66 valores, 66 únicos, min 1, max 66,
  cada uno igual a su índice + 1.
- **Exactamente un run `active`**, y es el de `queue_order` 24:
  `RUN-JAME-WEB-NARRATIVE-REPAIR-001`.
- 7 objetivos / 28 fases. 0 fases con 0 runs. `run_id` todos únicos.

**Los cuatro títulos ancla, verbatim:**

| `qo` | `run_id` | título en disco |
|---:|---|---|
| 8 | `RUN-JAME-MATH-FORMULA-COMPATIBILITY-CONTRACT-001` | `Define the math, formula, and Formula Inserter compatibility contract` |
| 24 | `RUN-JAME-WEB-NARRATIVE-REPAIR-001` | `Audit and implement the Narrative component` |
| 25 | `RUN-JAME-WEB-CALLOUT-REPAIR-001` | `Audit and implement the Callout component` |
| 26 | `RUN-JAME-WEB-DETAILS-REPAIR-001` | `Audit and implement the Details component` |

**Objetivos y fases nombrados por el encargo — existen los dos, con ese título exacto:**

- `Editor and Engine Shared Features` → objetivo **`O5`**; fase
  `Math and Formula Compatibility Contract` → **`O5.P7`**, que contenía 1 run (el de
  `qo` 8).
- `Lessons, Production, and Deployment` → objetivo **`O7`**; fase
  `Production Lesson Validation` → **`O7.P1`**, que contenía 1 run (el de `qo` 58).

Ninguno se creó, renombró ni movió.

### 2.b El `run_id` de la dependencia, DERIVADO y no tecleado

El `depends_on` del primer run nuevo se leyó del canónico buscando el run con
`queue_order === 8` y tomando su `run_id`:

> **`RUN-JAME-MATH-FORMULA-COMPATIBILITY-CONTRACT-001`**

Su título en disco coincide verbatim con el que el encargo declara para esa posición, lo
que confirma que la derivación apunta al run que el encargo nombraba.

### 2.c Contigüidad de fase: no es una invariante de este canónico

Antes de decidir la vía se midió si una fase debe ocupar `queue_order` contiguos, porque
los dos runs nuevos entran en fases (`O5.P7`, `O7.P1`) muy lejos de sus posiciones
finales (25, 26). **No lo es, y ya no lo era:** el canónico llegaba con **8 fases no
contiguas**, entre ellas `O1.P1C` → `[15,16,20,21,22,23,24,25,26,30,31,35]` y `O5.P5` →
`[7,19,29]`. Colocar un run de `O5.P7` en `qo` 25 no introduce una forma nueva; reproduce
la que el archivo ya tenía. `checkInvariants` lo confirma: no hay regla de contigüidad
por fase, sólo unicidad y contigüidad **globales** de `queue_order`.

## 3. El motor, no el JSON

**Ningún byte del roadmap se editó a mano.** Todo el contenido escrito lo produjo el
motor.

### 3.a Por qué NO se usó el CLI local de `cantu-studio` — medido, no supuesto

`projects/cantu-studio/tools/roadmap/roadmap-edit.mjs` **rehúsa el pre-flight** contra su
propio canónico. Reconfirmado de primera mano en esta sesión (dry-run, sin `--apply`, no
escribió nada):

```
Refusing; nothing written.
  - target file already fails the invariants; fix it before editing (…\cantu-studio\.aiw\roadmap\roadmap.json):
  - run RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 depends on unknown run RUN-CANTU-ROADMAP-CONTENT-AUDIT-001 (orphaned dependency)
```
exit 1.

La causa está medida y es **legal**: el motor local (1 213 líneas) no acepta un conjunto
de ids externos, así que una arista entre proyectos le resulta indistinguible de una
errata. El motor de `aiw-console` (2 170 líneas) sí, por CONTRATO §10.d. Los dos ficheros
**difieren** — md5 `8e603f1f…` (cantu) contra `4d56934…` (console) — y el de la consola es
el superset.

### 3.b Ruta del motor y firma de la operación

```
projects/aiw-console/tools/roadmap/roadmap-plan.mjs     (pipeline y dry-run)
projects/aiw-console/tools/roadmap/roadmap-core.mjs      (mutaciones y renumeración)
```

```js
planEdit({ filePath, op, args, externalRunIds })
  -> { stage: read|parse|preflight|mutate|postcheck|ok, errors, warnings, remap, serialized }

core.insertRun(obj, { runId, title, summary, fullDescription, status, dependsOn,
                      after | before | endOfPhase })
core.moveRun  (obj, { run, after | before | toOrder, toPhase })
applyPlan({ filePath, serialized, validate })   // core.applyWrite: backup en tmpdir ->
                                                // temp en el mismo dir -> fsync -> rename
```

`externalRunIds` se compuso con `externalRunIdsFor("cantu-studio")` de
`project-console/serve.mjs`, que lo lee del registry de proyectos. **No se levantó ningún
servidor:** `serve.mjs` sólo llama `server.listen` bajo su guarda `RUN_DIRECTLY`, e
importarlo no la dispara. Resultado: **102 ids externos**, y el id de la arista discutida
**resuelve entre ellos** — dependencia externa legal confirmada contra el conjunto de
proyectos, no supuesta.

### 3.c Renumera de forma estable

`applyOrder` (`roadmap-core.mjs:339`) asigna `queue_order = índice + 1` sobre el orden
global y luego reordena los `runs` de cada fase por ese valor. Determinista, sin huecos y
sin depender del orden de llegada. Es lo que el criterio exigía comprobar antes de
escribir.

### 3.d Las cuatro operaciones, y por qué son cuatro y no dos

`insertRun` **deriva la fase del ancla**: `--before` habría metido el primer run nuevo en
`O1.P1C`, la fase del Callout, no en `O5.P7`. Y `insert` **no es batchable** (cambia
identidad). La única vía que da fase correcta *y* posición correcta son dos pasos por run:

| # | op | args | efecto |
|---:|---|---|---|
| 1 | `insert` | `endOfPhase: O5.P7` | nace en la fase correcta, en `qo` 9 |
| 2 | `move` | `toOrder: 25` | a su posición final |
| 3 | `insert` | `endOfPhase: O7.P1` | nace en la fase correcta, en `qo` 60 |
| 4 | `move` | `toOrder: 26` | a su posición final |

`move` sin `--to-phase` **no reubica entre fases**: cada run conserva la fase en que el
`insert` lo puso. Las cuatro pasaron `stage: ok` — pre-flight, mutación y post-check.

## 4. El dry-run, reportado antes de aplicar

El ensayo se corrió **completo y encadenado fuera de los dos repos**: copia del respaldo
en el scratchpad, las cuatro operaciones sobre esa copia, y verificación del criterio 8
sobre el resultado — **todo antes de que el canónico recibiera un solo byte**.

**Remap neto, respaldo → resultado:**

```
runs añadidos: 2
  -> qo 25  RUN-CANTU-INLINE-FORMULA-BEHAVIOUR-LOCK-001
  -> qo 26  RUN-CANTU-LESSON-LOAD-FAILURE-SURFACING-001
runs sin mover: 24  (qo 1..24)
runs desplazados: 42
  origen qo: 25 .. 66     destino qo: 27 .. 68
  todos desplazados exactamente +2:      true
  ningún run de qo 1..24 desplazado:     true
```

Es **exactamente** lo que declara el criterio 8: los 24 primeros quietos, los 42 restantes
+2, dos altas en 25 y 26. Nada más se movió, así que no hubo motivo para parar.

Los remaps por operación (59, 17, 9 y 35 filas) se imprimieron íntegros; los intermedios
de la op 1 y la op 3 son estados transitorios que la op 2 y la op 4 revierten, y el neto
de arriba es lo que llegó a disco.

**El ensayo predijo el resultado exacto.** Re-corrido después partiendo del respaldo,
produce un archivo **byte a byte idéntico** al canónico escrito: mismo md5
`d19949d60d3d0efdf8d3f278b146636f`. La operación es reproducible desde el respaldo.

## 5. Qué se escribió

Dos runs nuevos, ambos `planned`, ambos **sin clave `lane`** (el `DEVELOPMENT` por
defecto se resuelve al leer) y **sin ningún campo de clasificación**. Claves en disco, en
orden canónico y sin ninguna más:

`run_id, queue_order, title, summary, full_description, status, depends_on`

| | `qo` 25 | `qo` 26 |
|---|---|---|
| `run_id` | `RUN-CANTU-INLINE-FORMULA-BEHAVIOUR-LOCK-001` | `RUN-CANTU-LESSON-LOAD-FAILURE-SURFACING-001` |
| objetivo | `O5` Editor and Engine Shared Features | `O7` Lessons, Production, and Deployment |
| fase | `O5.P7` Math and Formula Compatibility Contract | `O7.P1` Production Lesson Validation |
| `status` | `planned` | `planned` |
| `depends_on` | `["RUN-JAME-MATH-FORMULA-COMPATIBILITY-CONTRACT-001"]` | `[]` |
| `full_description` | 1 936 caracteres | 1 133 caracteres |

`title`, `summary` y `full_description` se escribieron verbatim desde el encargo y se
verificaron carácter a carácter contra la fuente después de escribir.

El archivo pasó de **122 332 a 126 597 bytes**, md5 `db5e4d06…` →
**`d19949d60d3d0efdf8d3f278b146636f`**. CRLF preservado (1 315 CRLF sobre 1 315 LF: ningún
LF suelto), sin BOM, cerrando en `}\r\n` igual que el respaldo.

## 6. Verificación posterior, campo a campo contra el respaldo

Todo medido sobre el canónico ya escrito, comparándolo con el respaldo.

| comprobación del criterio 8 | resultado |
|---|---|
| total = 68 | **OK** — 68 |
| `queue_order` 1..68 denso, único y contiguo | **OK** — min 1, max 68, 68 únicos |
| `run_id` únicos | **OK** — 68 de 68 |
| 0 `depends_on` colgantes salvo exactamente uno, el externo legal | **OK** — sólo `RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 -> RUN-CANTU-ROADMAP-CONTENT-AUDIT-001` |
| 0 fases con 0 runs | **OK** — `[]` |
| exactamente un run `active`, el de `qo` 24 | **OK** — `RUN-JAME-WEB-NARRATIVE-REPAIR-001` |
| **#1–#24 byte-idénticos al respaldo, incluido `queue_order`** | **OK — 24/24**, objeto completo y mismo orden de claves |
| 7 objetivos / 28 fases, sin cambio | **OK** |

**La cola de 24 a 30, título verbatim:**

| `qo` | título en disco | ¿casa? |
|---:|---|:--:|
| 24 | Audit and implement the Narrative component | OK |
| 25 | Lock the existing inline formula behaviour with tests before any component consumes it | OK |
| 26 | Repair the lesson that fails to load and stop the build from swallowing the failure | OK |
| 27 | Audit and implement the Callout component | OK |
| 28 | Audit and implement the Details component | OK |
| 29 | Audit and implement the Arithmetic component | OK |
| 30 | Audit and implement the Rule component | OK |

**Ningún run existente se modificó.** Los 66 runs previos se compararon uno a uno con el
respaldo tras retirar `queue_order` del objeto: **0 con cualquier otro campo alterado**.
Ni `title`, ni `summary`, ni `full_description`, ni `status`, ni `depends_on`. Los 42 que
cambiaron de `queue_order` lo hicieron sólo por efecto del desplazamiento.

No hubo que restaurar nada.

## 7. Validador, por la vía que no escribe

`node tools/project-console/validate-project-console-state.mjs`, desde
`projects/cantu-studio`.

**ANTES** (exit 0):

```
Project Console state validation passed.
Roadmap v3 prototype: 7 objectives / 28 phases / 66 runs; queue groups needs_human_decision=0 now=1 ready_next=15 later=25 history=25
Roadmap v3 active run derived stages: RUN-JAME-WEB-NARRATIVE-REPAIR-001=none
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
Roadmap v3 prototype: 7 objectives / 28 phases / 68 runs; queue groups needs_human_decision=0 now=1 ready_next=17 later=25 history=25
Roadmap v3 active run derived stages: RUN-JAME-WEB-NARRATIVE-REPAIR-001=none
Docs indexed: 149
Docs curated primary-visible: 60 of 149 registered
Component statuses: 16
Git provenance episodes: 9
Git history snapshot: 508 commits / 1 branches (1 visible, 0 backup hidden); current=main; run-associated=3; source=local_git_autosync
Roadmap rebase warnings (non-blocking):
- .aiw/roadmap/roadmap.json run RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 depends on RUN-CANTU-ROADMAP-CONTENT-AUDIT-001, which does not resolve in this roadmap. With a single roadmap loaded this cannot be decided: it may be a legal external dependency — a run that lives in another project (CONTRATO §10.d Regla 2) — or a typo in the run id. Both are possible and one loaded roadmap cannot tell them apart; resolve it against the full set of projects to distinguish external from write error.
```

El aviso es **el conocido y es legal**: la arista resuelve en otro proyecto registrado
(§3.b de este record). No es hallazgo. Es idéntico antes y después.

### El movimiento, medido

| grupo | antes | después | Δ |
|---|---:|---:|---:|
| runs | 66 | **68** | +2 |
| `needs_human_decision` | 0 | 0 | 0 |
| `now` | 1 | 1 | 0 |
| **`ready_next`** | **15** | **17** | **+2** |
| `later` | 25 | 25 | 0 |
| **`history`** | **25** | **25** | **0** |

El encargo no daba la cifra de `ready_next` a propósito. Medida antes y después:
**sube de 15 a 17**, y los dos que la suben son exactamente los dos runs nuevos. Ninguno
cayó en `later`: el primero depende de un run ya `completed` (`qo` 8) y el segundo no
depende de nada, así que ambos están listos para tomarse. `history=25` y `now=1` no se
mueven — coherente con no haber cerrado ni abierto nada.

El motor corrió además su propia guarda sobre el archivo escrito, `checkInvariants` con
las dependencias externas resueltas: **0 errores**.

## 8. Un detalle que el encargo previó y el disco no confirmó

El encargo anticipaba que los dos runs nuevos, al nacer sin campos de clasificación,
serían **reportados por el validador**, y que eso sería correcto. **El validador no emitió
ningún reporte sobre ellos.** Su única sección de avisos es la de dependencias, idéntica
antes y después.

Se anota, no se corrige: **los dos runs nacieron sin campos de clasificación como el
encargo mandaba**, y nadie clasifica hasta que el piloto de `aiw-console` entregue su
procedimiento. Lo que no se sostuvo fue la predicción sobre el comportamiento del
validador, no el estado del archivo.

## 9. Qué NO se hizo

- **No se editó el JSON a mano**, con ningún pretexto. Todo el contenido lo produjo el
  motor.
- **No se cerró ni se abrió ningún run.** Ningún `status` cambió, tampoco el de los dos
  nuevos.
- **No se re-emitió `.project/`** de ningún proyecto.
- **No se ejecutó Git** en ninguna forma, ni de lectura ni de escritura.
- **No se levantó la consola ni ningún servidor.** `serve.mjs` se importó para componer el
  conjunto de ids externos; su guarda `RUN_DIRECTLY` impide que importarlo escuche.
- **No se tocó `title`, `summary` ni `full_description`** de ningún run existente —
  verificado, 66 de 66.
- **No se creó, borró, renombró ni movió** ningún objetivo ni ninguna fase.
- **No se clasificó ningún run**, ni los nuevos ni los viejos.
- **No se ejecutó nada del trabajo que los dos runs nuevos describen.** No se escribió un
  test de fórmula en línea, no se reparó ningún import de lección, no se tocó el builder.
  Ese trabajo queda íntegro para cuando cada run se abra.
- **No se tocó el `roadmap-edit.mjs` de `cantu-studio`** para hacerle aceptar el archivo.
  Su rechazo se midió y se rodeó conduciendo el motor de la consola; el CLI local queda
  exactamente como estaba.
