# INSERCIÓN DE UN RUN EN CANTU — DESHACER Y REHACER GLOBAL DEL EDITOR

**Fecha:** 2026-08-05
**Encargo:** escritura sobre el roadmap canónico de `cantu-studio`, conducida por el
motor de roadmap de `aiw-console`. Taller, no run.
**Ficheros escritos:** `projects/cantu-studio/.aiw/roadmap/roadmap.json` (vía motor);
este record.
**Ficheros NO tocados:** `.project/` de ningún proyecto, ningún test, fixture, código de
producción ni documento fuera de este record. No se ejecutó Git en ninguna forma.

Sucede a `INSERCION-MONTAJE-INSERTOR-FORMULA-CANTU.md`, que se leyó **antes** de
planificar y cuya vía se reutilizó sin cambio. La lección que aquel record dejó — el alta
deriva la fase del ancla, así que hay que dar de alta al final de la fase propia y luego
mover — se aplicó tal cual y volvió a funcionar. Es la tercera inserción consecutiva que
la confirma.

---

## 0. Este encargo NO TUVO RUN, y por qué

**No se abrió, no se cerró y no se tocó el `status` de ningún run** — tampoco el del run
nuevo, que nace `planned` y sigue `planned`. Al empezar había **cero runs `active`** y al
terminar sigue habiendo **cero**.

La razón es de naturaleza, no de conveniencia: **este encargo no ejecuta trabajo del
roadmap, escribe el roadmap**. Es mantenimiento de la cola — la operación que decide qué
runs existen y en qué orden — y colocarla dentro de un run la volvería su propio sujeto.
El trabajo que el run nuevo describe **no se ha ejecutado ni una línea**; queda íntegro
para cuando se abra, incluida la medición que el propio run exige antes de construir.

## 1. Respaldo, antes de escribir un byte

Copia byte a byte fuera de los dos repos, en el scratchpad de sesión. Es la vía de
reversión: **`git checkout` no se usa para deshacer en este workspace porque reescribe los
finales de línea**, y el canónico es CRLF.

| | ruta | md5 | bytes |
|---|---|---|---|
| origen | `projects/cantu-studio/.aiw/roadmap/roadmap.json` | `c485e440abcea18ed4cfe105d359e93d` | 132 660 |
| respaldo | `…/scratchpad/undo/roadmap.BACKUP.json` | `c485e440abcea18ed4cfe105d359e93d` | 132 660 |

`cmp` byte a byte: idénticos. El respaldo se volvió a medir al terminar y **sigue en
`c485e440abcea18ed4cfe105d359e93d`**: nada lo tocó durante la operación.

**El canónico no estaba siendo escrito por otro proceso.** Tres muestras de `mtime` y
tamaño separadas por 3 s dieron el mismo valor (`2026-08-05 00:19:40.242746200`,
132 660 bytes), y además cada una de las dos operaciones comprobó el **baseline**
(compare-and-swap sha256 del motor) contra lo que esperaba antes de aplicar. El de la
op 1 se fijó por adelantado desde el ensayo y casó exacto:
`sha256:4782d92ca0ed3e53953ad23fe21b4ff8cf6912db6e8983d9e94e38649c2ba743`.

## 2. Precondiciones medidas — todas casan

Medidas sobre el canónico antes de cualquier escritura, con guarda que abortaba si algo no
casaba.

- **Total: 70 runs.** Verificado contra disco, no dado por bueno desde el ticket.
- **`queue_order` 1..70 denso, único y contiguo.** 70 valores, 70 únicos, min 1, max 70,
  cada uno igual a su índice + 1.
- **Cero runs `active`.** Reparto de status: `completed` 29, `planned` 41. Las cifras que
  el encargo daba (70 de partida, `history=29`, cero `active`) son las reales.
- 7 objetivos / 28 fases. 0 fases con 0 runs. `run_id` todos únicos (70 de 70).
- 1 `depends_on` colgante, el conocido:
  `RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 -> RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`.
- El `run_id` nuevo **no existía** ya en el canónico.

**Los dos títulos ancla, verbatim:**

| `qo` | `run_id` en disco | título en disco | ¿casa? |
|---:|---|---|:--:|
| 28 | `RUN-CANTU-INLINE-FORMULA-PREVIEW-001` | `Show the author a rendered preview of a prose paragraph that contains formulas` | OK |
| 29 | `RUN-JAME-WEB-CALLOUT-REPAIR-001` | `Audit and implement the Callout component` | OK |

Comparación de cadena completa, no por parecido.

**Objetivo y fase nombrados por el encargo — existen los dos, con ese título exacto:**

- `Cantu Studio UX` → objetivo **`O4`**, único con ese título.
- `Cantu Studio UX Audit` → fase **`O4.P5`**, única con ese título **en todo el archivo**,
  y dentro de `O4`. Contenía **1 run**: `RUN-JAME-AUTHORING-WORKSPACE-UX-AUDIT-001`, en
  `queue_order` 56, `planned`.

Ninguno se creó, renombró ni movió. No hizo falta la rama de «para y reporta con los
títulos reales»: los dos casaron a la primera.

### 2.a `depends_on` vacío: nada que derivar

A diferencia de las dos inserciones anteriores, este run **nace sin dependencias**. El
encargo lo declara vacío y así se escribió: `"depends_on": []`. No hubo ningún `run_id`
que derivar del canónico, y por tanto ninguna transcripción que pudiera fallar. Es también
la causa medida del único movimiento que se ve en el validador (§7).

### 2.b Contigüidad de fase: sigue sin ser una invariante de este canónico

El run nuevo entra en `O4.P5`, cuyo único run vivía en `queue_order` 56, y su destino es el
29. Los records anteriores ya midieron que **una fase no tiene por qué ocupar `queue_order`
contiguos** en este archivo, y sigue siendo así: `checkInvariants` sólo exige unicidad y
contigüidad **globales** de `queue_order`, no por fase. Tras escribir, `O4.P5` queda con
`qo 29` y `qo 57`. Medido sobre el archivo escrito: **12 de las 28 fases** tienen
`queue_order` no contiguos, entre ellas `O2.P1 [18, 67]`, `O2.P3 [41, 42, 66]` y
`O2.P5 [6, 68, 69, 70, 71]`. **No se introdujo ninguna forma nueva.**

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

Las cinco firmas son **idénticas a las que registró el record anterior**: ni el motor de la
consola ni el CLI local han cambiado entre las dos inserciones.

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
`project-console/serve.mjs:335`, que lo lee del registry. **No se levantó ningún
servidor:** `serve.mjs` sólo llama `server.listen` bajo su guarda `RUN_DIRECTLY`
(`serve.mjs:947`), e importarlo no la dispara. Resultado: **102 ids externos**, y el id de
la arista colgante **resuelve entre ellos** — dependencia externa legal confirmada contra
el conjunto de proyectos, no supuesta. La cifra coincide con la del record anterior.

La autoridad de escritura inyectada en `applyPlan` es la misma que usa la consola
(`serve.mjs:359`): releer el archivo recién renombrado y correrle `checkInvariants` con las
dependencias externas resueltas; un código distinto de 0 dispara rollback desde el respaldo
del motor. Las dos operaciones devolvieron `re-read OK`.

### 3.c Renumera de forma estable — comprobado antes de escribir

`applyOrder` (`roadmap-core.mjs:339`) asigna `queue_order = índice + 1` sobre el orden
global y luego reordena los `runs` de cada fase por ese valor. Determinista, sin huecos y
sin depender del orden de llegada. Es lo que el criterio 3 exigía comprobar antes de
escribir, y el ensayo lo confirmó en la práctica: **el resultado predicho y el escrito
coinciden byte a byte** (§4).

### 3.d Las dos operaciones, y por qué son dos y no una

Es la lección del record anterior, aplicada. `insertRun` **deriva la fase del ancla**
(`roadmap-core.mjs:845-872`): `--before RUN-JAME-WEB-CALLOUT-REPAIR-001` habría metido el
run nuevo en la fase del Callout, no en `O4.P5`. Y `move` sin `--to-phase` **no reubica
entre fases**, así que el run conserva la fase en que el `insert` lo puso. La única vía que
da fase correcta *y* posición correcta son dos pasos:

| # | op | args | efecto |
|---:|---|---|---|
| 1 | `insert` | `endOfPhase: O4.P5` | nace en la fase correcta, en `qo` 57 |
| 2 | `move` | `toOrder: 29` | a su posición final, **sin** `toPhase` |

Las dos pasaron `stage: ok` — pre-flight, mutación y post-check, más
`checkIdentityPreserved`. La op 1 declaró `addedRun: RUN-CANTU-EDITOR-UNDO-REDO-001`; la
op 2, `movedRun` el mismo id. Ninguna emitió avisos.

## 4. El dry-run, reportado antes de aplicar

El ensayo se corrió **completo y encadenado fuera de los dos repos**: copia del respaldo en
el scratchpad, las dos operaciones sobre esa copia, y verificación de los criterios 6 y 7
sobre el resultado — **todo antes de que el canónico recibiera un solo byte**. El canónico
se volvió a medir tras el ensayo: seguía en `c485e440…`, intacto.

**Op 1** — `insert --end-of-phase O4.P5`. `stage: ok`, `eol "\r\n"`,
`addedRun: RUN-CANTU-EDITOR-UNDO-REDO-001`. Remap de 15 filas: el run nuevo entra en `qo`
57 y los 14 que estaban en 57..70 suben a 58..71. Nace en `O4.P5`, objetivo `O4`, como se
buscaba.

**Op 2** — `move --to-order 29`, sin `--to-phase`. `stage: ok`. Remap de 29 filas: el run
nuevo baja de 57 a 29 y los 28 que estaban en 29..56 suben a 30..57.

Los dos remaps intermedios describen un estado transitorio que la op 2 reconduce. Lo que
importa es el neto.

**Remap neto, respaldo → resultado:**

```
runs añadidos: 1
  -> qo 29  RUN-CANTU-EDITOR-UNDO-REDO-001  (fase O4.P5)
runs sin mover: 28  (qo 1..28)
runs desplazados: 42
  origen qo: 29 .. 70     destino qo: 30 .. 71
  todos desplazados exactamente +1:      true
  ningún run de qo 1..28 desplazado:     true
  todo run de qo 29..70 desplazado:      true
```

Es **exactamente** lo que declara el criterio 6: los 28 primeros quietos, los 42 restantes
+1, un alta en 29. Nada más se movió, así que no hubo motivo para parar.

**El ensayo predijo el resultado exacto.** El archivo del ensayo y el canónico escrito son
**byte a byte idénticos** (`cmp` limpio, mismo md5 `8d6793452ccc14c09d548dcfdc20533a`,
134 841 bytes). La operación es reproducible desde el respaldo.

## 5. Qué se escribió

Un run nuevo, `planned`, **sin clave `lane`** (el `DEVELOPMENT` por defecto se resuelve al
leer) y **sin ningún campo de clasificación**. Claves en disco, en orden canónico y sin
ninguna más:

`run_id, queue_order, title, summary, full_description, status, depends_on`

| campo | valor |
|---|---|
| `run_id` | `RUN-CANTU-EDITOR-UNDO-REDO-001` |
| `queue_order` | 29 |
| `title` | `Give the author undo and redo across the whole editor` (53 car.) |
| objetivo | `O4` Cantu Studio UX |
| fase | `O4.P5` Cantu Studio UX Audit |
| `status` | `planned` |
| `depends_on` | `[]` |
| `summary` | 170 caracteres |
| `full_description` | 1 667 caracteres, 1 raya `—`, ningún otro carácter fuera de ASCII |

`title`, `summary` y `full_description` se escribieron verbatim desde el encargo — que
viajó en un JSON en el scratchpad, no por ningún shell — y se verificaron carácter a
carácter contra esa fuente después de escribir: los tres idénticos.

El archivo pasó de **132 660 a 134 841 bytes**, md5 `c485e440…` →
**`8d6793452ccc14c09d548dcfdc20533a`**. CRLF preservado (1 350 CRLF sobre 1 350 LF: ningún
LF suelto), sin BOM, cerrando en `}\r\n` igual que el respaldo. Escrito a las
**00:24:58**.

## 6. Verificación posterior, campo a campo contra el respaldo

Todo medido sobre el canónico ya escrito, comparándolo con el respaldo.

| comprobación del criterio 7 | resultado |
|---|---|
| total = 71 | **OK** — 71 |
| `queue_order` 1..71 denso, único y contiguo | **OK** — min 1, max 71, 71 únicos |
| `run_id` únicos | **OK** — 71 de 71 |
| 0 `depends_on` colgantes salvo exactamente uno, el externo legal | **OK** — sólo `RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 -> RUN-CANTU-ROADMAP-CONTENT-AUDIT-001` |
| 0 fases con 0 runs | **OK** — `[]` |
| **cero runs `active`** | **OK** — 0. Reparto: `completed` 29, `planned` 42 |
| 7 objetivos / 28 fases, sin cambio | **OK** — y ningún título de objetivo o fase alterado |
| guarda del motor sobre el archivo escrito (`checkInvariants` con externas resueltas) | **OK** — 0 errores, `re-read OK` en las dos operaciones |

**La cola de 27 a 32, título verbatim contra la tabla del encargo:**

| `qo` | título en disco | ¿casa? |
|---:|---|:--:|
| 27 | Mount the formula inserter so an author can place a formula at the cursor inside prose | OK |
| 28 | Show the author a rendered preview of a prose paragraph that contains formulas | OK |
| 29 | Give the author undo and redo across the whole editor | OK |
| 30 | Audit and implement the Callout component | OK |
| 31 | Audit and implement the Details component | OK |
| 32 | Audit and implement the Arithmetic component | OK |

**Ningún run existente se modificó** (criterio 6). Los 70 runs previos se compararon uno a
uno con el respaldo tras retirar `queue_order` del objeto: **0 con cualquier otro campo
alterado**, 0 con el orden de claves alterado, 0 desaparecidos, 0 cambiados de fase. Ni
`title`, ni `summary`, ni `full_description`, ni `status`, ni `depends_on`. Los **28**
primeros son **byte-idénticos al respaldo con el objeto completo, `queue_order` incluido**
(28 de 28). Los **42** que cambiaron de `queue_order` lo hicieron sólo por el
desplazamiento, y todos exactamente **+1**, de 29..70 a 30..71.

No hubo que restaurar nada.

## 7. Validador, por la vía que no escribe

`node tools/project-console/validate-project-console-state.mjs`, desde
`projects/cantu-studio`.

**ANTES** (exit 0):

```
Project Console state validation passed.
Roadmap v3 prototype: 7 objectives / 28 phases / 70 runs; queue groups needs_human_decision=0 now=0 ready_next=16 later=25 history=29
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
Roadmap v3 prototype: 7 objectives / 28 phases / 71 runs; queue groups needs_human_decision=0 now=0 ready_next=17 later=25 history=29
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

No aparece ninguna línea de `active run derived stages`: no hay run `active` del que
derivar etapas, ni antes ni después.

### El movimiento, medido

| grupo | antes | después | Δ |
|---|---:|---:|---:|
| runs | 70 | **71** | **+1** |
| `needs_human_decision` | 0 | 0 | 0 |
| `now` | 0 | 0 | 0 |
| **`ready_next`** | **16** | **17** | **+1** |
| `later` | 25 | 25 | 0 |
| `history` | 29 | 29 | 0 |

Los grupos suman el total en los dos lados: 16+25+29 = 70 antes, 17+25+29 = 71 después.

**El encargo no daba `ready_next` a propósito. Medida antes y después: sube de 16 a 17.**
La causa está medida y es correcta: el run nuevo **no tiene dependencias** (`depends_on`
vacío), así que nada lo bloquea y cae en `ready_next` por construcción. Es la diferencia
con la inserción anterior, donde el run nuevo colgaba de un run `planned` y por eso cayó en
`later` sin mover `ready_next`.

`history=29` y `now=0` no se mueven — coherente con no haber cerrado ni abierto nada.

## 8. Qué NO se hizo

- **No se editó el JSON a mano**, con ningún pretexto. Todo el contenido lo produjo el
  motor.
- **No se cerró ni se abrió ningún run.** Ningún `status` cambió, tampoco el del nuevo.
  Cero runs `active` antes y después.
- **No se re-emitió `.project/`** de ningún proyecto. Verificado por mtime: los seis
  ficheros de `projects/cantu-studio/.project/` llevan `2026-08-05 00:19:40`, el mismo
  instante que el canónico traía **antes** de esta sesión; la escritura del canónico fue a
  las **00:24:58**. **Consecuencia medida y deliberada: la emisión queda una vuelta por
  detrás** — `.project/roadmap.json` tiene **70 runs** frente a los **71** del canónico.
  Re-emitir estaba fuera de alcance, así que se deja así y se nombra.
- **No se ejecutó Git** en ninguna forma, ni de lectura ni de escritura.
- **No se levantó la consola ni ningún servidor.** `serve.mjs` se importó para componer el
  conjunto de ids externos; su guarda `RUN_DIRECTLY` impide que importarlo escuche.
- **No se tocó `title`, `summary` ni `full_description`** de ningún run existente —
  verificado, 70 de 70.
- **No se creó, borró, renombró ni movió** ningún objetivo ni ninguna fase. Los títulos de
  los 7 objetivos y las 28 fases se compararon en bloque contra el respaldo: idénticos.
- **No se clasificó ningún run**, ni el nuevo ni los viejos. El run nuevo sale a disco sin
  ninguno de los seis campos de clasificación.
- **No se ejecutó nada del trabajo que el run nuevo describe.** No se midió ningún camino
  de escritura programática del editor, no se contaron los escritores, no se tocó ninguna
  pila de deshacer, no se evaluó la librería de formularios ni ninguna dependencia. Ese
  trabajo — incluida la medición que el propio run exige antes de construir, y la decisión
  de operador que el run reserva para cualquier dependencia nueva — queda íntegro para
  cuando el run se abra.
- **No se tocó el `roadmap-edit.mjs` de `cantu-studio`** para hacerle aceptar el archivo.
  Su rechazo se reconfirmó y se rodeó conduciendo el motor de la consola; el CLI local
  queda exactamente como estaba, con el mismo md5.
