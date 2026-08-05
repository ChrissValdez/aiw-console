# ENMIENDA DEL RUN 27 Y ALTA DE LA PREVISUALIZACIÓN — CANTU

**Fecha:** 2026-08-04
**Encargo:** escritura sobre el roadmap canónico de `cantu-studio`, conducida por el motor
de roadmap de `aiw-console`. Taller, no run.
**Ficheros escritos:** `projects/cantu-studio/.aiw/roadmap/roadmap.json` (vía motor); este
record. **Nada más, en ninguno de los dos repos.**
**Veredicto:** **LAS DOS COSAS HECHAS.** Todas las precondiciones casaron, el ensayo
predijo el resultado byte a byte, el criterio 8 pasa con **0 fallos** y no hubo que
restaurar nada.

Sucede a `MONTAJE-INSERTOR-FORMULA-CANTU.md` (la medición que motiva las dos cosas) y a
`INSERCION-MONTAJE-INSERTOR-FORMULA-CANTU.md` (la vía de inserción). Los dos se leyeron
íntegros antes de planificar y **sus afirmaciones se verificaron contra disco, no se
heredaron** (§9).

---

## 0. Este encargo NO TUVO RUN, y por qué

**No se abrió, no se cerró y no se tocó el `status` de ningún run.** El run enmendado
—`queue_order` 27— **sigue `active`**, y el run nuevo nace `planned` y sigue `planned`. Al
empezar había **exactamente un run `active`** y al terminar sigue habiendo **exactamente
uno, el mismo**.

La razón es de naturaleza, no de conveniencia: **este encargo no ejecuta trabajo del
roadmap, escribe el roadmap.** Es mantenimiento de la cola —la operación que decide qué
runs existen, qué dicen y en qué orden— y colocarla dentro de un run la volvería su propio
sujeto. Además, una de las dos cosas es **enmendar la descripción del run que hoy está
abierto**: hacerlo desde dentro de ese mismo run sería que el run se reescribiese su
propio encargo mientras lo ejecuta.

**El trabajo que describen los dos runs —el del 27 y el del 28— no se ejecutó ni una
línea.** Queda íntegro para cuando se tomen.

---

## 1. Respaldo, antes de escribir un byte

Copia byte a byte **fuera de los dos repos**, en el scratchpad de sesión. Es la vía de
reversión: **`git checkout` no se usa para deshacer en este workspace porque reescribe los
finales de línea**, y el canónico es CRLF.

| | ruta | md5 | bytes |
|---|---|---|---|
| origen | `projects/cantu-studio/.aiw/roadmap/roadmap.json` | `d3d8c2b19de154ab88c9ea0bf3a9044e` | 129 819 |
| respaldo | `…/scratchpad/roadmap.BACKUP.json` | `d3d8c2b19de154ab88c9ea0bf3a9044e` | 129 819 |

`cmp` byte a byte: **idénticos**. El respaldo se volvió a medir al terminar y **sigue en
`d3d8c2b1…`**: nada lo tocó durante la operación.

El canónico se midió también **después del ensayo y antes de aplicar**: seguía en
`d3d8c2b1…`, intacto. Y las tres operaciones comprobaron su **baseline** (compare-and-swap
sha256 del motor) contra lo que esperaban: **los tres baselines del canónico son idénticos
a los del ensayo** (§4), lo que prueba que nadie escribió el archivo entre medias.

**El respaldo de hoy NO casa con el md5 que dejó `INSERCION-…` (`977a5035…`, 129 706
bytes).** El archivo cambió entre aquel record y hoy: allí el reparto era `completed` 26 /
`planned` 43 / `active` 0, y hoy al empezar era **`completed` 28 / `planned` 40 /
`active` 1**. **Por eso el encargo manda medir y no heredar.**

---

## 2. Precondiciones medidas — todas casan

Medidas sobre el canónico antes de cualquier escritura, con **guarda que abortaba** si algo
no casaba. La misma guarda volvió a correr, íntegra, antes de la aplicación real.

- **Total: 69 runs.** Verificado contra disco, no dado por bueno desde el encargo. **La
  cifra del encargo (N = 69) es la real.**
- **`queue_order` 1..69 denso, único y contiguo.** 69 valores, 69 únicos, min 1, max 69,
  cada uno igual a su índice + 1.
- **Exactamente un run `active`, y es el de `queue_order` 27.** Reparto: `completed` 28,
  `planned` 40, `active` 1.
- 7 objetivos / 28 fases. **0 fases con 0 runs.** `run_id` todos únicos (69 de 69).
- **1 `depends_on` colgante**, el conocido:
  `RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 -> RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`.
- El `run_id` nuevo **no existía** ya en el canónico.
- `schema_version = jame.roadmap_v3.v0.2-progress`. Sin BOM, **1 329 CRLF sobre 1 329 LF**
  (ningún LF suelto), cerrando en `}\r\n`.

**Los dos títulos ancla, VERBATIM, comparados carácter a carácter por la guarda:**

| `qo` | `run_id` en disco | título en disco | ¿casa? |
|---:|---|---|:--:|
| 27 | `RUN-CANTU-INLINE-FORMULA-INSERTER-MOUNT-001` | `Mount the formula inserter so an author can place a formula at the cursor inside prose` | **OK** |
| 28 | `RUN-JAME-WEB-CALLOUT-REPAIR-001` | `Audit and implement the Callout component` | **OK** |

**Objetivo y fase — DERIVADOS del disco, no tecleados, y únicos con ese título:**

- Objetivo: **`O5` — `Editor and Engine Shared Features`**. Único con ese título en todo el
  archivo, y es el del `queue_order` 27, como el encargo exige.
- Fase: **`O5.P3` — `Formula Inserter`**. **Derivada del `queue_order` 27**, única con ese
  título en todo el archivo. Contenía 2 runs: el 27 y `RUN-JAME-FORMULA-INSERTER-INTEGRATION-001`
  en `queue_order` 47.

Ninguno se creó, renombró ni movió.

### 2.b El `run_id` de la dependencia, DERIVADO y no tecleado

El `run_id` del `queue_order` 27 se leyó del canónico buscando el run con
`queue_order === 27` y tomando su `run_id`:

> **`RUN-CANTU-INLINE-FORMULA-INSERTER-MOUNT-001`**

**Ese mismo valor derivado se usó para las dos cosas**: como `targetId` de la enmienda y,
verbatim, como único elemento del `depends_on` del run nuevo. La derivación se repitió
dentro del script de aplicación, contra el canónico y no contra el respaldo, para que el
valor escrito no dependiese de ninguna transcripción.

### 2.c Contigüidad de fase: sigue sin ser una invariante de este canónico

`checkInvariants` exige unicidad y contigüidad **globales** de `queue_order`, **no por
fase**. Tras escribir, `O5.P3` queda con `qo` **27, 28 y 48** —los dos primeros
adyacentes, el tercero lejos—, una forma que el archivo ya tenía. No se introdujo nada
nuevo. `applyOrder` reordena físicamente los runs de cada fase por `queue_order`, así que
el orden en el array casa con el de la cola.

---

## 3. El motor, no el JSON

**Ningún byte del roadmap se editó a mano.** Todo el contenido escrito lo produjo el motor.

### 3.a Por qué NO se usó el CLI local de `cantu-studio` — reconfirmado de primera mano

`projects/cantu-studio/tools/roadmap/roadmap-edit.mjs` **rehúsa el pre-flight** contra su
propio canónico. Reconfirmado hoy en esta sesión con la operación que este encargo
necesitaba (dry-run, sin `--apply`, no escribió nada):

```
Refusing; nothing written.
  - target file already fails the invariants; fix it before editing (C:\Users\chris\Documents\AIW_Workspace\projects\cantu-studio\.aiw\roadmap\roadmap.json):
  - run RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 depends on unknown run RUN-CANTU-ROADMAP-CONTENT-AUDIT-001 (orphaned dependency)
```

La causa está medida y es **legal**: el motor local (1 213 líneas) no acepta un conjunto de
ids externos, así que una arista entre proyectos le resulta indistinguible de una errata.
El de `aiw-console` (2 170 líneas) sí, por CONTRATO §10.d.

### 3.b Ruta y firma del motor

```
projects/aiw-console/tools/roadmap/roadmap-plan.mjs    343 líneas   md5 2ca431015b3e3a580a218f758fb0fa93
projects/aiw-console/tools/roadmap/roadmap-core.mjs   2170 líneas   md5 4d56934608216f7a2e6323f209abf7d9
```

Para contraste, el CLI local que rehúsa:

```
projects/cantu-studio/tools/roadmap/roadmap-core.mjs  1213 líneas  md5 8e603f1f3309b055b0e7fe60c285f7eb
projects/cantu-studio/tools/roadmap/roadmap-plan.mjs   271 líneas  md5 8ec46545900a7c8c7e978fe103532600
projects/cantu-studio/tools/roadmap/roadmap-edit.mjs   468 líneas  md5 dcf7bd60af022d3de6f90858b3166cda
```

**Los seis md5 son idénticos a los que registró `INSERCION-…`: el motor no ha cambiado
entre las dos escrituras.**

Firma de las operaciones usadas:

```js
planEdit({ filePath, op, args, externalRunIds })
  -> { ok, stage: read|parse|preflight|mutate|postcheck|ok, errors, warnings, remap, serialized, baseline, eol }

core.setText   (obj, { targetType: "run", targetId, title, summary, fullDescription })
core.insertRun (obj, { runId, title, summary, fullDescription, status, dependsOn,
                       after | before | endOfPhase })
core.moveRun   (obj, { run, after | before | toOrder, toPhase })
applyPlan({ filePath, serialized, validate })   // core.applyWrite: backup en tmpdir ->
                                                // temp en el mismo dir -> fsync -> rename
```

`externalRunIds` se compuso con `externalRunIdsFor("cantu-studio")` de
`project-console/serve.mjs`, que lo lee del registry (`project-console/projects.json`,
entradas `aiw-console`, `cantu-studio`, `aiw`). **No se levantó ningún servidor:**
`serve.mjs` sólo llama `server.listen` bajo su guarda `RUN_DIRECTLY` (`serve.mjs:947-957`),
e importarlo no la dispara. Resultado: **102 ids externos**, y el id de la arista colgante
**resuelve entre ellos** —dependencia externa legal **confirmada** contra el conjunto de
proyectos, no supuesta. La guarda abortaba si no resolvía.

La autoridad de escritura inyectada en `applyPlan` es la misma que usa la consola
(`writtenFileValidator`, `serve.mjs:359-374`): releer el archivo recién renombrado y
correrle `checkInvariants` con las dependencias externas resueltas; un código distinto de 0
dispara rollback desde el respaldo del motor. **Las tres operaciones devolvieron
`re-read OK`.**

### 3.c Renumera de forma estable — comprobado antes de escribir

`applyOrder` (`roadmap-core.mjs:339-348`) asigna `queue_order = índice + 1` sobre el orden
global y luego reordena los `runs` de cada fase por ese valor. Determinista, sin huecos y
sin depender del orden de llegada. Es lo que el criterio 4 exigía comprobar antes de
escribir, **y el ensayo lo confirmó en la práctica: el resultado predicho y el escrito son
byte a byte idénticos** (§4).

### 3.d Enmendar un run `active` SÍ es posible por el motor — comprobado en el código

El criterio 12 manda parar sin escribir nada si el motor no permitiera enmendar el
`full_description` de un run `active`. **Se leyó `core.setText` (`roadmap-core.mjs:1057-1101`)
antes de tocar nada: localiza el run por `run_id` y no consulta su `status` en ningún
punto.** Ni `setText` ni el post-check acoplan texto y estado —`statusProgressErrors` sólo
se invoca desde `insertRun` y `setStatus`—. La compuerta no se dispara, y la op 1 lo
confirmó en la práctica: `stage: ok`, `re-read OK`, y el `status` del 27 sigue `active`
después (§6).

### 3.e Las tres operaciones, y por qué son tres y no una

`batch` **no acepta `insert`** (`roadmap-plan.mjs:192, 222-224`): las ops que cambian
identidad no son agrupables, porque `checkIdentityPreserved` sanciona a lo sumo un id
añadido por clase. Así que la enmienda y el alta van por separado; y el alta, a su vez,
necesita dos pasos por la lección de `INSERCION-…`, **reconfirmada leyendo el código, no
heredada**:

- `insertRun` **deriva la fase del ancla**: con `--before` toma `entry.phase` del ancla
  (`roadmap-core.mjs:852-858`). `--before RUN-JAME-WEB-CALLOUT-REPAIR-001` habría metido el
  run nuevo en `O1.P1C`, la fase del Callout, no en `O5.P3`.
- `moveRun` **sin `--to-phase` no reubica entre fases**: la reubicación está dentro de
  `if (toPhaseEntry)` (`roadmap-core.mjs:947-952`), así que el run conserva la fase en que
  el `insert` lo puso.

**La única vía que da fase correcta *y* posición correcta son dos pasos:**

| # | op | args | efecto |
|---:|---|---|---|
| 1 | `set-text` | `run: <qo27>`, `fullDescription` | enmienda; **no mueve nada** |
| 2 | `insert` | `endOfPhase: O5.P3` | nace en la fase correcta, en `qo` **48** |
| 3 | `move` | `toOrder: 28` | a su posición final, **sin** `toPhase` |

Las tres pasaron `stage: ok` —pre-flight, mutación y post-check, más
`checkIdentityPreserved`.

---

## 4. El dry-run, reportado antes de aplicar

El ensayo se corrió **completo y encadenado fuera de los dos repos**: copia del respaldo en
el scratchpad, las tres operaciones sobre esa copia, y verificación **entera** de los
criterios 7 y 8 sobre el resultado —**todo antes de que el canónico recibiera un solo
byte**.

**Op 1 — `set-text --run RUN-CANTU-INLINE-FORMULA-INSERTER-MOUNT-001`**

```
stage: ok   ok: true   bytes: 129645
baseline: sha256:c68f34861d19c55a81feaa58e5c9d7e584b6b636608cb187df860fe956014c1a
eol: "\r\n"
set-text before[full_description] chars: 2351
set-text after[full_description]  chars: 2179
remap: 0 filas
validator: re-read OK: invariants verified on the written file
```

**`remap: 0 filas` es el dato que importa: la enmienda no desplaza absolutamente nada.**

**Op 2 — `insert --end-of-phase O5.P3`**

```
stage: ok   ok: true   bytes: 131550
baseline: sha256:af02691e4fa724330760ec0a5ca6c980401fcf33ce8293a1a1868d8af5d80413
addedRun: RUN-CANTU-INLINE-FORMULA-PREVIEW-001
remap: 23 filas
   {"run_id":"RUN-CANTU-INLINE-FORMULA-PREVIEW-001","before":null,"after":48}
   {"run_id":"RUN-CANTU-SLIDE-GRID-SYSTEM-001","before":48,"after":49}
   … 21 filas más, todas +1, hasta
   {"run_id":"RUN-CANTU-RUNTIME-J-NAMESPACE-RENAME-001","before":69,"after":70}
validator: re-read OK: invariants verified on the written file
```

El run nuevo entra en `qo` 48 (fin de `O5.P3`, cuyo máximo era 47) y los 22 que estaban en
48..69 suben a 49..70. **Nace en `O5.P3`, objetivo `O5`, como se buscaba.**

**Op 3 — `move --to-order 28`, sin `--to-phase`**

```
stage: ok   ok: true   bytes: 131550
baseline: sha256:65e4eee0ef645b73c9405baedd816e9e17e2090b30764cd2830826d834643251
movedRun: RUN-CANTU-INLINE-FORMULA-PREVIEW-001
remap: 21 filas
   {"run_id":"RUN-CANTU-INLINE-FORMULA-PREVIEW-001","before":48,"after":28}
   {"run_id":"RUN-JAME-WEB-CALLOUT-REPAIR-001","before":28,"after":29}
   {"run_id":"RUN-JAME-WEB-DETAILS-REPAIR-001","before":29,"after":30}
   {"run_id":"RUN-JAME-WEB-ARITHMETIC-AUDIT-AND-REPAIR-001","before":30,"after":31}
   … 17 filas más, todas +1, hasta
   {"run_id":"RUN-JAME-FORMULA-INSERTER-INTEGRATION-001","before":47,"after":48}
validator: re-read OK: invariants verified on the written file
```

Los remaps intermedios describen un estado transitorio que la op 3 reconduce. Lo que
importa es el neto.

**Remap neto, respaldo → resultado:**

```
runs añadidos: 1
  -> qo 28  RUN-CANTU-INLINE-FORMULA-PREVIEW-001  (fase O5.P3, objetivo O5)
runs sin mover: 27  (qo 1..27)
runs desplazados: 42
  origen qo: 28 .. 69     destino qo: 29 .. 70
  todos desplazados exactamente +1:      true
  ningún run de qo 1..27 desplazado:     true
  todo run de qo 28..69 desplazado:      true
```

Es **exactamente** lo que declara el criterio 7: los 27 primeros quietos —el 27 sólo cambia
de texto, no de posición—, los 42 restantes +1, un alta en 28. **Nada más se movió, así que
no hubo motivo para parar.**

**El ensayo predijo el resultado exacto.** El archivo del ensayo y el canónico escrito son
**byte a byte idénticos** (`cmp` limpio, mismo md5 `377fe5a695f8c9bb1b8a528b7b308f1b`), y
**los tres baselines del canónico coinciden uno a uno con los del ensayo**. La operación es
reproducible desde el respaldo.

---

## 5. Qué se escribió

### 5.a La enmienda del `queue_order` 27

**Sólo el `full_description`.** `run_id`, `title`, `objective`, `phase`, `status`,
`summary` y `depends_on` quedan **exactamente como estaban** —verificado campo a campo
contra el respaldo (§6)—. El título se conserva aunque la palabra «mount» haya quedado
optimista: en este sistema **el título es identidad**.

| | chars | rayas `—` | no-ASCII |
|---|---:|---:|---|
| antes | 2 351 | 1 | sólo `—` U+2014 |
| después | **2 179** | **4** | sólo `—` U+2014 |

**El texto que se retiró, VERBATIM** (queda aquí porque es la premisa falsa que se corrige,
y sin él la enmienda no se puede auditar):

```
MEASURED BASIS, and it is why this is a mount rather than a build. A delimited formula typed by hand into a prose field already survives save, compile and render, and the operator verified it on screen. The visual formula editor already exists and ships in the mathematical rule component. The inserter shell is defined and exported and imported by NO editor surface, and its action evaluators — which decide what to insert given a cursor position and a selection — are already wired and covered by tests. The missing piece is the wiring between them and a prose field. THE SHAPE THE OPERATOR CHOSE: a control beside the prose field opens the SAME visual editor the rule component already uses, and on accept it writes the delimited formula at the cursor position inside the ordinary text field. THE STORED DATA DOES NOT CHANGE: the field stays a string, and everything already written keeps working. This adds authoring, it does not migrate a format. A slash trigger is in scope only if the measurement shows the existing evaluators already cover it; otherwise it is named and left out. A PREVIEW BENEATH THE FIELD, showing the paragraph rendered while the author edits, is in scope: the field itself shows plain text, so without it the author cannot see what they are composing. MAKING THE FIELD ITSELF RENDER MATHEMATICS IS EXPLICITLY OUT OF SCOPE — that is a rich text editor and a different data format, and the operator ruled it out. EDITING A FORMULA ALREADY PLACED IS ALSO OUT OF SCOPE for this run: reopening the editor over an existing formula requires detecting its bounds and deciding what happens when the author edited the delimiters by hand. First version inserts; changing an existing formula is done by selecting and inserting again, or by hand, which already works. MEASURE BEFORE BUILDING and report what mounting actually costs — which surfaces, which files, how many mount points — and WHICH PROSE FIELDS GET THE CONTROL, which is the set the operator selected and not every text field in the editor. If mounting turns out to require rewriting the shell, changing the stored format, or a rich text editor, STOP and return options with measured cost rather than building the larger thing. This run requires operator visual QA. Every count referenced anywhere for this work is a dated measurement and is to be verified against disk.
```

**El texto escrito, VERBATIM, tal como está hoy en disco:**

```
MEASURED BASIS, AND IT CORRECTS THIS RUN'S OWN EARLIER PREMISE. An earlier version of this description claimed the inserter shell was ready to mount and that its action evaluators already decided what to insert given a cursor position and a selection. MEASUREMENT SHOWED BOTH CLAIMS FALSE. The shell owns its own LaTeX text area, never opens the visual formula editor, and on accept replaces the whole field value. The evaluators do not take the text to insert as a parameter: what they insert is a literal in the code, and with a selection they accept only a single bare token, so selecting two words does nothing. Their malformed-LaTeX check measures the ENTIRE field, so a paragraph with one unclosed parenthesis would block insertion. WHAT DOES HOLD: the visual formula editor the mathematical rule component uses is reusable — it takes no rule-specific props and returns its output on confirm — and the run that precedes this one locked with tests that a delimited formula travels unchanged through the five prose fields. SO THIS RUN BUILDS RATHER THAN WIRES: a control beside each of the five prose fields, a splice module that writes at the cursor, and whatever is needed to open the existing visual editor from there. THE OPERATOR DECIDED WHAT HAPPENS WITH A SELECTION: the selected text is PRELOADED into the visual editor as the starting point, and replaced by the formula on accept. That requires lifting the single-token restriction, which is in scope and is to be measured before it is changed. NOTHING EMITS THE DELIMITERS TODAY — the one function that touches them strips them — so producing them is part of this run. THE STORED DATA DOES NOT CHANGE: the field stays a string, and the thirteen tests of the preceding run must stay green. OUT OF SCOPE AND MOVED TO ITS OWN RUN: the preview beneath the field, because the math engine is not a dependency of the editor and resolving that must not hold up the insertion. ALSO OUT: making the field itself render mathematics, editing a formula already placed, any new dependency, and any field beyond the five. This run requires operator visual QA. Every count is a dated measurement and is to be verified against disk.
```

### 5.b El run nuevo

Un run `planned`, **sin clave `lane`** (el `DEVELOPMENT` por defecto se resuelve al leer) y
**sin ningún campo de clasificación**. Claves en disco, en orden canónico y **sin ninguna
más**:

`run_id, queue_order, title, summary, full_description, status, depends_on`

| campo | valor |
|---|---|
| `run_id` | `RUN-CANTU-INLINE-FORMULA-PREVIEW-001` |
| `queue_order` | **28** |
| `title` | `Show the author a rendered preview of a prose paragraph that contains formulas` (78 car.) |
| objetivo | **`O5`** `Editor and Engine Shared Features` — derivado del disco |
| fase | **`O5.P3`** `Formula Inserter` — **derivada del `queue_order` 27**, no tecleada |
| `status` | `planned` |
| `depends_on` | `["RUN-CANTU-INLINE-FORMULA-INSERTER-MOUNT-001"]` — **derivado del `queue_order` 27** |
| `summary` | 139 caracteres, sin ningún carácter fuera de ASCII |
| `full_description` | 1 310 caracteres, 2 rayas `—`, ningún otro carácter fuera de ASCII |

`title`, `summary` y `full_description` se escribieron verbatim desde el encargo —que viajó
en un JSON, **no por ningún shell**— y se verificaron carácter a carácter contra esa fuente
después de escribir.

**El archivo pasó de 129 819 a 131 550 bytes**, md5 `d3d8c2b1…` →
**`377fe5a695f8c9bb1b8a528b7b308f1b`**. CRLF preservado (**1 340 CRLF sobre 1 340 LF**:
ningún LF suelto), sin BOM, cerrando en `}\r\n` igual que el respaldo.

---

## 6. Verificación posterior, campo a campo contra el respaldo (criterio 8)

Todo medido sobre el canónico ya escrito, comparándolo con el respaldo. **0 fallos.**

| comprobación del criterio 8 | resultado |
|---|---|
| total = **70** | **OK** — 70 |
| `queue_order` 1..70 denso, único y contiguo | **OK** — min 1, max 70, 70 únicos |
| `run_id` únicos | **OK** — 70 de 70 |
| 0 `depends_on` colgantes salvo **exactamente uno**, el externo legal | **OK** — sólo `RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 -> RUN-CANTU-ROADMAP-CONTENT-AUDIT-001` |
| 0 fases con 0 runs | **OK** — `[]` |
| **exactamente un run `active`, el de `queue_order` 27** | **OK** — 1, `RUN-CANTU-INLINE-FORMULA-INSERTER-MOUNT-001`. Reparto: `completed` 28, `planned` 41, `active` 1 |
| **`#1`–`#26` byte-idénticos al respaldo** | **OK** — 26 de 26, objeto completo, `queue_order` incluido |
| **`#27` idéntico salvo su `full_description`** | **OK** — y con el mismo orden de claves |
| **del 28 al 69: todos suben exactamente +1** | **OK** — 42 de 42, y **nada más cambió en ninguno** |
| 7 objetivos / 28 fases, mismos ids y mismos títulos | **OK** |
| guarda del motor sobre el archivo escrito (`checkInvariants` con externas resueltas) | **OK** — `re-read OK` en las tres ops |

**Los campos del 27 que NO debían cambiar, uno a uno:**

| campo | valor tras la enmienda | ¿sin cambio? |
|---|---|:--:|
| `run_id` | `RUN-CANTU-INLINE-FORMULA-INSERTER-MOUNT-001` | **OK** |
| `title` | `Mount the formula inserter so an author can place a formula at the cursor inside prose` | **OK** |
| `status` | **`active`** | **OK** |
| `summary` | `The pipeline already carries an inline formula through the prose fields; …` | **OK** |
| `depends_on` | `["RUN-CANTU-INLINE-FORMULA-BEHAVIOUR-LOCK-001"]` | **OK** |
| objetivo / fase | `O5` / `O5.P3` | **OK** |

**La cola de 27 a 31, título VERBATIM contra la tabla del encargo:**

| `qo` | título en disco | ¿casa? |
|---:|---|:--:|
| 27 | Mount the formula inserter so an author can place a formula at the cursor inside prose | **OK** |
| 28 | Show the author a rendered preview of a prose paragraph that contains formulas | **OK** |
| 29 | Audit and implement the Callout component | **OK** |
| 30 | Audit and implement the Details component | **OK** |
| 31 | Audit and implement the Arithmetic component | **OK** |

**Ningún otro run se modificó** (criterio 7). Los 69 runs previos se compararon uno a uno
con el respaldo tras retirar `queue_order` del objeto —y, sólo en el 27, el
`full_description`—: **0 con cualquier otro campo alterado**, 0 con el orden de claves
alterado, 0 desaparecidos, 0 cambiados de fase. Ni `title`, ni `objective`, ni `phase`, ni
`summary`, ni `status`, ni `depends_on`.

**No hubo que restaurar nada.** El respaldo sigue en `d3d8c2b1…`.

---

## 7. Validador, por la vía que no escribe

`node tools/project-console/validate-project-console-state.mjs`, desde
`projects/cantu-studio`.

**ANTES** (exit 0):

```
Project Console state validation passed.
Roadmap v3 prototype: 7 objectives / 28 phases / 69 runs; queue groups needs_human_decision=0 now=1 ready_next=15 later=25 history=28
Roadmap v3 active run derived stages: RUN-CANTU-INLINE-FORMULA-INSERTER-MOUNT-001=none
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
Roadmap v3 prototype: 7 objectives / 28 phases / 70 runs; queue groups needs_human_decision=0 now=1 ready_next=15 later=26 history=28
Roadmap v3 active run derived stages: RUN-CANTU-INLINE-FORMULA-INSERTER-MOUNT-001=none
Docs indexed: 149
Docs curated primary-visible: 60 of 149 registered
Component statuses: 16
Git provenance episodes: 9
Git history snapshot: 508 commits / 1 branches (1 visible, 0 backup hidden); current=main; run-associated=3; source=local_git_autosync
Roadmap rebase warnings (non-blocking):
- .aiw/roadmap/roadmap.json run RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 depends on RUN-CANTU-ROADMAP-CONTENT-AUDIT-001, which does not resolve in this roadmap. With a single roadmap loaded this cannot be decided: it may be a legal external dependency — a run that lives in another project (CONTRATO §10.d Regla 2) — or a typo in the run id. Both are possible and one loaded roadmap cannot tell them apart; resolve it against the full set of projects to distinguish external from write error.
```

El aviso es **el conocido y es legal**: la arista resuelve entre los 102 ids externos
(§3.b). **No es hallazgo. No se reparó.** Es idéntico antes y después, palabra por palabra.

La línea `active run derived stages` **aparece en las dos**, con el mismo run y el mismo
`=none`: el `status` del 27 no se tocó y su `progress` tampoco.

### El movimiento, medido

| grupo | antes | después | Δ |
|---|---:|---:|---:|
| runs | 69 | **70** | **+1** |
| `needs_human_decision` | 0 | 0 | 0 |
| `now` | 1 | 1 | 0 |
| **`ready_next`** | **15** | **15** | **0** |
| **`later`** | **25** | **26** | **+1** |
| `history` | 28 | 28 | 0 |

**El encargo no daba `ready_next` a propósito. Medida antes y después: NO SE MUEVE.** El
que sube es `later`. **La causa está medida y es correcta:** el run nuevo depende de
`RUN-CANTU-INLINE-FORMULA-INSERTER-MOUNT-001`, que está **`active`**, no `completed`, así
que el run nuevo **no puede estar listo para tomarse** y cae en `later` por construcción.

`history=28` y `now=1` no se mueven — coherente con no haber cerrado ni abierto nada.

---

## 8. Cifras del encargo — verificadas una a una

| cifra | cómo se verificó | resultado |
|---|---|---|
| **69 de partida** | recorrido propio del canónico + línea del validador | **CONFIRMADA — 69** |
| **70 de llegada** | recorrido propio del canónico escrito + línea del validador | **CONFIRMADA — 70** |
| **`history=28`** | salida del validador, antes y después | **CONFIRMADA — 28 en las dos** |
| **un run `active`** | recorrido propio + `active run derived stages` | **CONFIRMADA — exactamente 1, el del `qo` 27, antes y después** |
| `ready_next` | el encargo no la daba; medida | **15 antes, 15 después — no se mueve** |
| 102 ids externos | `externalRunIdsFor("cantu-studio")` desde el registry | **CONFIRMADA — 102** |
| N = 69 denso y contiguo | 69 valores, 69 únicos, min 1, max 69 | **CONFIRMADA** |

**Ninguna cifra del encargo resultó estar mal.**

---

## 9. Los dos records que motivaron esto — qué se verificó y qué derivó

Se leyeron íntegros antes de planificar. **Sus afirmaciones se comprobaron contra disco.**

| afirmación heredada | fuente | veredicto hoy |
|---|---|---|
| El `queue_order` 27 es `RUN-CANTU-INLINE-FORMULA-INSERTER-MOUNT-001`, `active`, en `O5`/`O5.P3` | `MONTAJE` §1 | **CONFIRMADA** |
| 69 runs, `history=28`, `ready_next=15`, `now=1`, `later=25` | `MONTAJE` §9 | **CONFIRMADA, cifra por cifra** |
| El `full_description` del 27 afirma que los evaluadores «deciden qué insertar» y están cableados | `MONTAJE` §1.2 | **CONFIRMADA — el texto retirado (§5.a) lo dice literalmente. Es la premisa que esta enmienda corrige.** |
| El CLI local de `cantu-studio` rehúsa el pre-flight | `INSERCION` §3.a | **RECONFIRMADA de primera mano**, con la operación de este encargo |
| Los seis md5 de los dos motores | `INSERCION` §3.b | **CONFIRMADOS los seis. El motor no ha cambiado.** |
| 102 ids externos, y la arista colgante resuelve entre ellos | `INSERCION` §3.b | **CONFIRMADA — 102** |
| `insert` deriva la fase del ancla; `move` sin `--to-phase` no reubica entre fases | `INSERCION` §3.d | **RECONFIRMADA leyendo el código** (`roadmap-core.mjs:852-858` y `:947-952`), no sólo por resultado |
| `applyOrder` renumera de forma estable | `INSERCION` §3.c | **RECONFIRMADA** en el código y en el ensayo |
| md5 del canónico `977a5035…`, 129 706 bytes | `INSERCION` §5 | **YA NO CASA.** Hoy partía de `d3d8c2b1…`, 129 819 bytes. **Deriva declarada en §1.** |
| Reparto `completed` 26 / `planned` 43 / `active` 0 | `INSERCION` §6 | **YA NO CASA.** Hoy al empezar: 28 / 40 / 1. **Por eso se mide y no se hereda.** |

**Lo que este taller ejecuta de la recomendación de `MONTAJE` §11.2:** sus puntos 4 y 5
—corregir el `full_description` del 27 y dar de alta el run de la previsualización—.
**Sus puntos 1, 2 y 3 son decisión del operador y NO se tocan aquí:** aceptar las
compuertas, elegir entre las opciones de §11.1 y decidir la regla de la selección activa.
**El texto escrito registra que la tercera ya está decidida** —«THE OPERATOR DECIDED WHAT
HAPPENS WITH A SELECTION: the selected text is PRELOADED…»— porque venía decidida en el
encargo; **este taller no la decidió.**

---

## 10. Qué **NO** se hizo

- **No se editó el JSON a mano**, con ningún pretexto. Todo el contenido lo produjo el
  motor.
- **No se cerró ni se abrió ningún run. Ningún `status` cambió**, tampoco el del run
  enmendado —que sigue **`active`**— ni el del nuevo, que nace y sigue `planned`.
- **No se tocó `title`, `objective`, `phase`, `summary` ni `depends_on` de ningún run**,
  incluido el 27. Verificado 69 de 69 contra el respaldo.
- **No se tocó ningún otro `full_description`.** Sólo el del 27.
- **No se re-emitió `.project/`** de ningún proyecto. Verificado por mtime: los seis
  ficheros de `projects/cantu-studio/.project/` llevan `2026-08-04 21:43:09/10`, el mismo
  instante que el canónico traía **antes** de esta sesión; la escritura del canónico fue a
  las **22:24:23**. **Consecuencia medida y deliberada: la emisión queda una vuelta por
  detrás** — `.project/roadmap.json` tiene **69 runs** frente a los **70** del canónico.
  Re-emitir estaba fuera de alcance, así que se deja así y se nombra.
- **No se ejecutó Git** en ninguna forma, ni de lectura ni de escritura.
- **No se levantó la consola ni ningún servidor.** `serve.mjs` se importó para componer el
  conjunto de ids externos; su guarda `RUN_DIRECTLY` impide que importarlo escuche.
- **No se creó, borró, renombró ni movió** ningún objetivo ni ninguna fase. Los ids y
  títulos de los 7 objetivos y las 28 fases se compararon en bloque contra el respaldo:
  **idénticos**.
- **No se clasificó ningún run**, ni el nuevo ni los viejos. El run nuevo no lleva
  `correctness_model`, `work_type`, `blast_radius`, `failure_surfaces` ni `classified_at`.
- **No se tocó `roadmap-edit.mjs` de `cantu-studio`** para hacerle aceptar el archivo. Su
  rechazo se reconfirmó y se rodeó conduciendo el motor de la consola; el CLI local queda
  exactamente como estaba.
- **No se ejecutó nada del trabajo que describen los dos runs.** No se montó ningún
  insertor, no se escribió ningún módulo de empalme, no se tocó ninguna superficie del
  editor, no se midió ninguna ruta de previsualización, no se añadió ninguna dependencia.
  **Cero bytes escritos en código, tests, fixtures o documentos de `cantu-studio`.**
- **No se corrió ningún test de `cantu-studio`.** Este encargo no toca código, así que no
  hay nada que pudiera ponerse rojo por su causa; los trece del run 25 se dejaron como
  estaban y no se volvieron a ejecutar.
- **No se reparó ninguna deriva conocida:** ni el aviso de dependencia externa del
  validador, ni el desfase de `.project/`, ni el CLI local que rehúsa, ni nada de lo que
  `MONTAJE` §12 dejó listado.

---

## 11. Status de los dos runs — declarado, no cambiado

**El 27 queda en `active`. El 28 nace y queda en `planned`. Este taller no cambia
ninguno.** Los mueve el operador desde la consola global, que es el punto de serialización
y la que re-emite `.project/` de forma atómica.

**Lo que la enmienda cambia para el siguiente ejecutor del 27:** ya no chocará con la
compuerta que paró al anterior, porque el texto ya no afirma que la carcasa esté lista ni
que los evaluadores decidan qué insertar. **Dice que hay que construir**, y trae decidida
la regla de la selección activa, que era lo único que ninguna medición podía resolver.

**Lo que el alta cambia:** la previsualización deja de colgar del run de inserción y ya no
puede arrastrarlo. Su propio texto la obliga a **medir las tres rutas y volver con el coste
antes de construir**, y a **parar si no hay decisión del operador en el registro** — no a
elegir por su cuenta. **Añadir una dependencia sigue siendo decisión del operador.**
