# Inserción de tres runs de piezas compartidas en el roadmap canónico de Cantu

**Fecha:** 2026-08-01
**Encargo:** insertar tres runs en las posiciones 17, 19 y 29 del roadmap canónico de
`cantu-studio`, más seis aristas `depends_on` sobre runs existentes, conduciendo el motor
de roadmap del repo con dry-run antes de aplicar.
**Resultado del acto I:** **PARADA POR CRITERIO 12. NO SE ESCRIBIÓ UN BYTE EN EL CANÓNICO.**
El canónico quedó byte a byte como se encontró.

> ## ⚠ ESTADO DEL DOCUMENTO — LEER ANTES QUE NADA
>
> Este record tiene **dos actos**, escritos en dos encargos distintos.
>
> **Acto I — §0 a §12 (2026-08-01, primer encargo).** La parada. Todo su análisis, sus
> mediciones y su recomendación **siguen siendo válidos y no se han reescrito**. Pero su
> veredicto —«no se escribió un byte»— describe el estado **de aquel momento**, no el de hoy.
>
> **Acto II — §13 en adelante (2026-08-01, segundo encargo).** La aplicación real.
> **El plan SE APLICÓ.** El canónico pasó de 63 a **66 runs** y su md5 es ahora
> `d458523c719683cd5dd316a4f5cc7016`. La afirmación del ticket original sobre la posición 36
> quedó **corregida y descartada**, y quien la corrigió fue el operador, no este record.
>
> Si buscas el estado actual del canónico, ve a **§13**. Si buscas por qué se paró la primera
> vez y qué se midió para decidirlo, quédate en el acto I.

---

# ACTO I — La parada (primer encargo)

## 0. Veredicto en una página

La inserción **es enteramente ejecutable** y está **planificada, ejecutada en sombra y
verificada campo a campo**. Las trece operaciones del motor planifican sin un solo error.
La tabla de posiciones 17→35 del criterio 8 **casa entera, verbatim, las diecinueve filas**.
Las seis aristas entran sin tocar ningún otro campo. Los tres runs nacen en el objetivo y
la fase declarados, con el `lane` declarado.

Se para por **una sola discrepancia**, y es una discrepancia del ticket contra el disco, no
del motor contra el ticket:

> El criterio 8 declara que `Audit the Web components as a whole` queda en **36**.
> Medido: parte de **39** y el dry-run lo lleva a **42**.

Entre `Audit and implement the Visual component` (que sí queda en 35, como declara la tabla)
y ese run hay **seis runs que el ticket no contempla** y que existen hoy en el canónico.
Llevar el audit de conjunto a 36 exigiría **mover esos seis runs**, una reordenación que este
encargo no pide en ninguna parte y que no es una verificación sino una operación.

El criterio 12 manda parar cuando «el dry-run desplaza algo distinto de lo declarado».
Se cumple esa condición, así que se para y se entrega este informe con coste medido y
recomendación explícita, sin decidir.

**Hallazgo adicional, y es estructural:** el motor de roadmap que vive dentro de
`cantu-studio` **no puede conducir esta inserción ni ninguna otra** contra el canónico actual.
Rehúsa en pre-flight. El motor que sí puede es el de la consola global. Está medido en §3.

---

## 1. Respaldo antes de escribir (criterio 1)

Copia byte a byte tomada **antes** de cualquier operación, fuera de los dos repos:

```
C:\Users\chris\AppData\Local\Temp\claude\C--Users-chris-Documents-AIW-Workspace\
  8780e1a8-aca9-4332-916b-f946c08419b2\scratchpad\roadmap.json.BACKUP-PRE-INSERCION
```

| dato | valor |
|---|---|
| md5 del canónico al abrir | `6d13a7c617801b4b197b6075f418cbac` |
| md5 del respaldo | `6d13a7c617801b4b197b6075f418cbac` |
| tamaño | 105 490 bytes |
| `cmp` byte a byte | idénticos |

**Comprobación de cierre.** Al terminar el trabajo se volvió a medir el canónico:

```
6d13a7c617801b4b197b6075f418cbac *.aiw/roadmap/roadmap.json
cmp .aiw/roadmap/roadmap.json <respaldo>  ->  sin diferencias
```

El canónico **no fue tocado**. El respaldo no ha hecho falta como vía de reversión porque no
hubo nada que revertir, y sigue en pie por si el operador decide aplicar más adelante.

---

## 2. Precondiciones medidas (criterio 2)

Medidas sobre `projects/cantu-studio/.aiw/roadmap/roadmap.json`. **Todas casan.**

| exigido | medido | veredicto |
|---|---|---|
| total 63 runs | **63** | casa |
| `queue_order` 1..63 denso, único, contiguo | denso, 63 únicos, min 1, max 63 | casa |
| 17 `completed` / 46 `planned` | `{"planned":46,"completed":17}` | casa |
| ningún `active` | 0 | casa |

Y los cinco títulos por `queue_order`, verbatim contra el ticket:

| `qo` | título en disco | ¿casa? |
|---:|---|---|
| 7 | `Define the color and palette compatibility contract` | verbatim |
| 9 | `Define shared component contracts and the revalidation checklist` | verbatim |
| 16 | `Unify the color selector across every Web component` | verbatim |
| 17 | `Audit the documentation corpus and produce the disposition list` | verbatim |
| 18 | `Audit and implement the List component` | verbatim |

No hubo que corregir ninguno por parecido. Ninguno estaba desplazado.

### 2.1 Un dato que las precondiciones no pedían pero que manda sobre todo lo demás

El canónico tiene **una arista `depends_on` que no resuelve dentro de sí mismo**:

```
RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001
  -> RUN-CANTU-ROADMAP-CONTENT-AUDIT-001
```

No es basura. Es una **dependencia externa legal** del CONTRATO §10.d Regla 2: ese run existe,
`completed`, en `queue_order` 4 del roadmap de `aiw-console`
(`projects/aiw-console/roadmap/roadmap.json`). Medido, no supuesto.

Esto parte a los dos motores en dos y es la razón de §3.

---

## 3. El motor: cuál es, dónde está, y cuál NO sirve (criterio 4)

### 3.1 El motor de `cantu-studio` REHÚSA. Medido.

`projects/cantu-studio/tools/roadmap/roadmap-edit.mjs` es un CLI con dry-run por defecto y
`--apply` para confirmar, sobre `roadmap-plan.mjs` → `roadmap-core.mjs`. Es el motor que la
consola *local* de ese repo usa. Se le pidió un dry-run inocuo y contestó:

```
Refusing; nothing written.
  - target file already fails the invariants; fix it before editing
    (C:\...\projects\cantu-studio\.aiw\roadmap\roadmap.json):
  - run RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 depends on unknown run
    RUN-CANTU-ROADMAP-CONTENT-AUDIT-001 (orphaned dependency)
```

Su `checkInvariants` no tiene el concepto de dependencia externa, así que trata la arista
§10.d como huérfana y **falla el pre-flight**. Con ese pre-flight rojo el motor local no
planifica nada: ni esta inserción, ni ninguna edición futura de este canónico.

Hay una segunda razón, independiente y también terminal para este encargo. Su núcleo declara
por escrito que no escribe `lane`:

> `[lanes: TOLERATE, NOT ADOPT]` … *este módulo no deriva ningún lane, no resuelve ningún
> defecto, no impone ninguna barrera y **no ofrece ninguna operación que escriba** ninguno de
> los tres.* — `roadmap-core.mjs:27-36`

El criterio 6 exige `lane: DOCUMENTATION` escrito explícitamente en el primer run. El motor
local no tiene con qué.

### 3.2 El motor que sí conduce

| dato | valor |
|---|---|
| núcleo | `projects/aiw-console/tools/roadmap/roadmap-core.mjs` (94 822 bytes) |
| orquestación | `projects/aiw-console/tools/roadmap/roadmap-plan.mjs` (16 135 bytes) |
| superficie que lo conduce | `projects/aiw-console/project-console/serve.mjs` |
| registro de proyectos | `projects/aiw-console/project-console/projects.json` |

El registro incluye `cantu-studio` explícitamente, así que **el roadmap de Cantu se edita desde
la consola global**, no desde la local:

```json
{ "key": "aiw-console", "root": ".." },
{ "key": "cantu-studio", "root": "../../cantu-studio" },
{ "key": "aiw",          "root": "../../../aiw" }
```

Ese motor resuelve la arista §10.d porque recibe el conjunto de ids declarados por los **otros**
proyectos registrados (`serve.mjs:335 externalRunIdsFor`), y con él pasa el pre-flight.

### 3.3 Firma del flujo dry-run → confirm

```js
// roadmap-plan.mjs
export function planEdit({ filePath, op, args, externalRunIds = null })
//   -> { ok, stage, errors[], warnings[], remap[], serialized, bytes,
//        structural, baseline, eol }
//   stage ∈ read | parse | preflight | mutate | postcheck | ok
//   NO ESCRIBE NADA. Es el dry-run (apply:false).

export function applyPlan({ filePath, serialized, validate = null })
//   -> { written, rolledBack, backupPath, validatorOutput, bytes }
//   Escritura atómica: backup en tmpdir -> fichero temporal -> fsync -> rename.
//   `validate` es la autoridad post-escritura; su salida != 0 revierte desde el backup.
//   Es el confirm (apply:true).
```

Secuencia interna, idéntica en las dos superficies:

```
loadRaw -> parseRoadmap -> checkInvariants (pre-flight)
  -> queueOrderMap + collectIds
  -> dispatch(op)
  -> checkInvariants (post) + checkIdentityPreserved
  -> buildRemap -> serialize(obj, eol)
```

### 3.4 Firma de la inserción y prueba de renumeración estable

```js
// roadmap-core.mjs:723
export function insertRun(obj, {
  runId, title, summary, fullDescription,
  status = "planned", dependsOn = [],
  after, before, endOfPhase        // exactamente uno de los tres
})
// -> { errors, warnings, newRun, addedRun }
```

La renumeración es estable y la hace `applyOrder` (`roadmap-core.mjs:291`):

```js
function applyOrder(obj, ordered) {
  ordered.forEach((run, index) => { run.queue_order = index + 1; });
  for (const objective of obj.objectives || [])
    for (const phase of objective.phases || [])
      phase.runs.sort((a, b) => a.queue_order - b.queue_order);
}
```

Reasigna `queue_order = índice+1` sobre el orden global deseado y deja cada fase físicamente
ascendente. No hay huecos, no hay saltos, no hay reasignación arbitraria: **renumeración
estable, confirmada por lectura del código y por los remaps de §5.**

### 3.5 Las otras dos operaciones que el encargo necesita

```js
// roadmap-core.mjs:1067
export function setLane(obj, { run, lane })
// Rechaza un lane_id no declarado en root.lanes, nombrando el vocabulario.

// roadmap-core.mjs:974
export function setDeps(obj, { run, dependsOn, addDep, removeDep, externalRunIds })
// Exactamente uno de los tres modos. addDep es idempotente:
//   next = current.includes(addDep) ? current : [...current, addDep]
// Toca SOLO depends_on. No roza title, summary, full_description ni status.
```

**El motor sí sabe añadir una arista a un run existente** (criterio 7 / criterio 12): es
`set-deps --add-dep`, y añade sin reemplazar.

`root.lanes` del canónico de Cantu declara el vocabulario que el encargo usa:

```json
[{"lane_id":"DEVELOPMENT","title":"Development — code, structure, tooling","default":true},
 {"lane_id":"DOCUMENTATION","title":"Documentation — writing, updating, reorganising docs"}]
```

`DEVELOPMENT` es el `default:true`, así que un run **sin clave `lane`** se resuelve a
`DEVELOPMENT` al leer. Eso es exactamente lo que el criterio 6 pide para los runs (2) y (3).

### 3.6 Una limitación real del motor, que no bloquea pero que hay que decir

`insertRun` coloca el run nuevo **en la fase del ancla**: `--before X` lo mete en la fase de X.
No existe una operación que fije **posición global y fase** en un solo paso.

Los tres runs van a fases del objetivo `O5` (`Editor and Engine Shared Features`), pero sus
anclas de posición viven en `O2` y `O1`. Así que cada inserción son **dos operaciones del
motor**: `insert --before <ancla>` y después `move --to-phase <fase> --to-order <posición>`.

Esto **no crea ni modifica ninguna fase** — las tres fases de destino existen y ya tienen runs —
así que no dispara la última condición del criterio 12. `move --to-order N` sobre un run que ya
está en N no mueve nada: los pasos 2, 5 y 7 de §5 devuelven **0 runs re-secuenciados**, medido.

Se descartó la alternativa `insert --end-of-phase O5.P6` precisamente porque su dry-run
anunciaría un desplazamiento desde la posición 10, que **no** es el declarado por el criterio 8.
Con `--before` el desplazamiento anunciado es exactamente el declarado.

---

## 4. Los `run_id` derivados del canónico (criterio 3)

Derivados, no tecleados. Verbatim:

| origen | `run_id` |
|---|---|
| `queue_order` 7 | `RUN-JAME-COLOR-PALETTE-COMPATIBILITY-CONTRACT-001` |
| `queue_order` 9 | `RUN-JAME-WEB-COMPONENT-CONTRACT-STANDARDIZATION-001` |
| `queue_order` 16 | `RUN-CANTU-COLOR-SELECTOR-UNIFICATION-001` |

Y los cinco de componente, derivados **por título verbatim** (criterio 7). Los cinco títulos
dan exactamente una coincidencia cada uno; ninguno faltó:

| título buscado | `run_id` derivado | aristas hoy |
|---|---|---:|
| `Audit and implement the Callout component` | `RUN-JAME-WEB-CALLOUT-REPAIR-001` | 3 |
| `Audit and implement the Details component` | `RUN-JAME-WEB-DETAILS-REPAIR-001` | 3 |
| `Audit and implement the Rule component` | `RUN-JAME-RULE-COMPONENT-REPAIR-AND-ACTIVATION-001` | 4 |
| `Audit and implement the Table component` | `RUN-JAME-WEB-TABLE-AUDIT-AND-REPAIR-001` | 2 |
| `Audit and implement the ConceptGrid component` | `RUN-JAME-WEB-CONCEPTGRID-AUDIT-AND-REPAIR-001` | 2 |

Y las anclas de posición usadas por las tres inserciones:

| run nuevo | posición | ancla `--before` |
|---|---:|---|
| `RUN-CANTU-REVALIDATION-DOD-REFRESH-001` | 17 | `RUN-CANTU-DOCUMENTATION-DEEP-AUDIT-001` |
| `RUN-CANTU-AUTHOR-PALETTE-COMPILER-ENGINE-001` | 19 | `RUN-JAME-WEB-LIST-REVALIDATION-001` |
| `RUN-CANTU-COMPILER-VARIANT-GATES-001` | 29 | `RUN-JAME-WEB-SPLIT-SCOPE-AND-REPAIR-001` |

---

## 5. El dry-run (criterio 5)

### 5.1 Cómo se ejecutó, y por qué no se levantó la consola

Levantar la consola está fuera de alcance. El motor se condujo **por importación directa** de
`planEdit`, replicando lo que `serve.mjs` hace en su ruta de escritura: mismo `planEdit`, mismos
`externalRunIds` compuestos desde el registro, `applyPlan` **jamás invocado**.

Como una inserción no es agrupable con un `move` (`insert` cambia identidad y no es
*batchable*), la secuencia son trece operaciones encadenadas. Para encadenarlas sin escribir
el canónico, cada paso planifica sobre una **sombra** en el scratchpad y el `serialized` del
paso alimenta al siguiente. El canónico se leyó **una vez** y nunca se escribió.

```
externalRunIds resueltos: 97
  contiene RUN-CANTU-ROADMAP-CONTENT-AUDIT-001: true
```

### 5.2 Las trece operaciones, todas OK

| # | operación | run | bytes | re-secuenciados |
|---:|---|---|---:|---:|
| 1 | `insert --before RUN-CANTU-DOCUMENTATION-DEEP-AUDIT-001` | DOD-REFRESH | 107 584 | 48 |
| 2 | `move --to-phase O5.P6 --to-order 17` | DOD-REFRESH | 107 584 | 0 |
| 3 | `set-lane DOCUMENTATION` | DOD-REFRESH | 107 624 | 0 |
| 4 | `insert --before RUN-JAME-WEB-LIST-REVALIDATION-001` | AUTHOR-PALETTE | 109 949 | 47 |
| 5 | `move --to-phase O5.P5 --to-order 19` | AUTHOR-PALETTE | 109 949 | 0 |
| 6 | `insert --before RUN-JAME-WEB-SPLIT-SCOPE-AND-REPAIR-001` | VARIANT-GATES | 111 892 | 38 |
| 7 | `move --to-phase O5.P5 --to-order 29` | VARIANT-GATES | 111 892 | 0 |
| 8 | `set-deps --add-dep` | FORMULA-INSERTER | 111 948 | 0 |
| 9 | `set-deps --add-dep` | CALLOUT | 112 013 | 0 |
| 10 | `set-deps --add-dep` | DETAILS | 112 078 | 0 |
| 11 | `set-deps --add-dep` | RULE | 112 143 | 0 |
| 12 | `set-deps --add-dep` | TABLE | 112 208 | 0 |
| 13 | `set-deps --add-dep` | CONCEPTGRID | 112 273 | 0 |

**Ni un error, ni un warning, en las trece.** Ninguna alcanzó `stage: mutate` ni `postcheck`
con refusal; las trece llegaron a `stage: ok`.

Coste en bytes: 105 490 → **112 273** (+6 783, +6,4 %).

### 5.3 El desplazamiento que anuncia el dry-run

**Inserción 1 — DOD-REFRESH en 17.** 48 runs re-secuenciados, todos +1 desde el 17:

```
RUN-CANTU-REVALIDATION-DOD-REFRESH-001            (new) -> 17
RUN-CANTU-DOCUMENTATION-DEEP-AUDIT-001               17 -> 18
RUN-JAME-WEB-LIST-REVALIDATION-001                   18 -> 19
RUN-JAME-WEB-ICONLIST-REVALIDATION-001               19 -> 20
...
RUN-JAME-WEB-VISUAL-AUDIT-AND-REPAIR-001             32 -> 33
RUN-CANTU-COMPONENT-GUIDE-PACKET-WIRING-001          33 -> 34
RUN-CANTU-COMPONENT-GUIDE-CONTENT-001                34 -> 35
RUN-CANTU-WEB-PACKET-VERIFICATION-BATCH-001          35 -> 36
RUN-CANTU-WEB-PACKET-VERIFICATION-BATCH-002          36 -> 37
RUN-CANTU-WEB-PACKET-VERIFICATION-BATCH-003          37 -> 38
RUN-CANTU-WEB-PACKET-VERIFICATION-BATCH-004          38 -> 39
RUN-JAME-WEB-READINESS-EVIDENCE-001                  39 -> 40      <-- AQUÍ
...
RUN-CANTU-RUNTIME-J-NAMESPACE-RENAME-001             63 -> 64
```

**Inserción 2 — AUTHOR-PALETTE en 19.** 47 re-secuenciados, +1 desde el 19.
`RUN-JAME-WEB-READINESS-EVIDENCE-001` **40 → 41**.

**Inserción 3 — VARIANT-GATES en 29.** 38 re-secuenciados, +1 desde el 29.
`RUN-JAME-WEB-READINESS-EVIDENCE-001` **41 → 42**.

Los tres remaps completos quedan en la salida de `dryrun.mjs` (§9).

### 5.4 Dónde el dry-run desplaza algo distinto de lo declarado

Para las filas 17→35 el dry-run desplaza **exactamente** lo declarado. La única fila del
criterio 8 que el dry-run contradice es la afirmación final:

| declarado por el criterio 8 | anunciado por el dry-run |
|---|---|
| `Audit the Web components as a whole` en **36** | en **42** (partiendo de 39) |

Esto es lo que dispara el criterio 12. Se detalla en §7.

---

## 6. Qué se escribió (criterio 11)

**Nada.**

- Canónico `projects/cantu-studio/.aiw/roadmap/roadmap.json`: **sin tocar**,
  md5 `6d13a7c617801b4b197b6075f418cbac`, verificado con `cmp` contra el respaldo al cerrar.
- `applyPlan` no se llamó ni una vez. No hay backups del motor, no hay ficheros temporales,
  no hay rename.
- Lo único escrito fuera de los repos: el respaldo, la sombra y los scripts de medición, todos
  en el scratchpad de sesión.
- Lo único escrito dentro de un repo: **este record**.

---

## 7. Verificación del criterio 8, campo a campo

Ejecutada sobre la **sombra final** (`shadow-FINAL-13-OPS.json`,
md5 `d458523c719683cd5dd316a4f5cc7016`, 112 273 bytes), que es byte a byte lo que el motor
habría escrito.

### 7.1 Estructura

| exigido | medido | veredicto |
|---|---|---|
| total **66** | **66** | OK |
| `queue_order` 1..66 denso, único, contiguo | sí | OK |
| `run_id` únicos | sí | OK |
| **0** `depends_on` colgantes | **0** | OK |
| **0** fases con 0 runs | **0** | OK |
| ningún run `active` | **0** | OK |
| `#1`–`#16` byte-idénticos al respaldo | idénticos | OK |

Sobre los colgantes: son 0 resolviendo contra el conjunto de proyectos registrados, que es la
regla del CONTRATO §10.d y la que aplica el motor. Sin resolver contra los otros proyectos
sería 1, y sería **la misma arista externa que ya existía antes** de este encargo — la
inserción no introduce ninguna nueva.

### 7.2 La tabla 17→35, título verbatim

| `qo` | título esperado | en la sombra | ¿casa? |
|---:|---|---|---|
| 17 | Update the revalidation Definition of Done to match the measured surfaces | ídem | OK |
| 18 | Audit the documentation corpus and produce the disposition list | ídem | OK |
| 19 | Carry the author palette through the compiler and the Web engine | ídem | OK |
| 20 | Audit and implement the List component | ídem | OK |
| 21 | Audit and implement the IconList component | ídem | OK |
| 22 | Audit and implement the Card component | ídem | OK |
| 23 | Audit and implement the Video component | ídem | OK |
| 24 | Audit and implement the Narrative component | ídem | OK |
| 25 | Audit and implement the Callout component | ídem | OK |
| 26 | Audit and implement the Details component | ídem | OK |
| 27 | Audit and implement the Arithmetic component | ídem | OK |
| 28 | Audit and implement the Rule component | ídem | OK |
| 29 | Align the compiler variant gates with the author palette | ídem | OK |
| 30 | Decide scope and enable the Split component | ídem | OK |
| 31 | Audit and implement the Table component | ídem | OK |
| 32 | Audit and implement the ConceptGrid component | ídem | OK |
| 33 | Audit and implement the Hierarchy component | ídem | OK |
| 34 | Audit and implement the Timeline component | ídem | OK |
| 35 | Audit and implement the Visual component | ídem | OK |

**Las diecinueve filas casan verbatim. La tabla entera.**

### 7.3 La fila que NO casa

| exigido | medido |
|---|---|
| `Audit the Web components as a whole` en **36** | en **42** |
| sus **17** aristas intactas | **17**, intactas — OK |

Las 17 aristas del audit de conjunto están confirmadas y sin tocar. Lo que no casa es la
posición, y la razón está medida: entre `Visual` (35) y el audit de conjunto hay **seis runs**
que el ticket no contempla y que existen hoy en el canónico:

| `qo` en la sombra | título |
|---:|---|
| 36 | Unify the Component Guide mechanism and fix its template |
| 37 | Write the Component Guide for the seventeen Web components |
| 38 | Verify the Header, List, IconList, and Card component packets |
| 39 | Verify the Video, Narrative, Callout, and Details component packets |
| 40 | Verify the Arithmetic, Rule, Split, and Table component packets |
| 41 | Verify the ConceptGrid, Hierarchy, Timeline, and Visual component packets |

La aritmética es cerrada: el audit de conjunto está hoy en 39, las tres inserciones caen todas
por delante de él, luego acaba en 42. Para que acabase en 36 tendría que estar hoy en 33, es
decir, esos seis runs tendrían que no existir. Existen. El ticket midió la posición del audit
de conjunto **antes de que esos seis entraran** en el roadmap, y esa cifra llegó fechada y
desactualizada — que es exactamente el riesgo que el criterio 10 anticipa.

**La tabla 17→35 y la afirmación del 36 se contradicen entre sí.** No pueden ser ciertas a la
vez sobre este disco: la tabla describe el resultado de insertar tres runs sin mover nada, y el
36 describe el resultado de insertar tres runs **y además** adelantar el audit de conjunto seis
posiciones. La primera es lo que el encargo pide; la segunda no se pide en ninguna parte.

### 7.4 Los tres runs nuevos, campo a campo

**(1)**
```
run_id      RUN-CANTU-REVALIDATION-DOD-REFRESH-001
queue_order 17
title       Update the revalidation Definition of Done to match the measured surfaces
status      planned
objetivo    Editor and Engine Shared Features (O5)          <- el declarado
fase        Shared Component Contracts and Revalidation Checklist (O5.P6)  <- la declarada
lane        "DOCUMENTATION"                                  <- escrito explícitamente
depends_on  ["RUN-JAME-WEB-COMPONENT-CONTRACT-STANDARDIZATION-001",   (qo 9)
             "RUN-CANTU-COLOR-SELECTOR-UNIFICATION-001"]              (qo 16)
claves      run_id, queue_order, title, summary, full_description, status, depends_on, lane
```

**(2)**
```
run_id      RUN-CANTU-AUTHOR-PALETTE-COMPILER-ENGINE-001
queue_order 19
title       Carry the author palette through the compiler and the Web engine
status      planned
objetivo    Editor and Engine Shared Features (O5)
fase        Color and Palette Compatibility Contract (O5.P5)
lane        (sin clave -> DEVELOPMENT por defecto)           <- como pide el ticket
depends_on  ["RUN-JAME-COLOR-PALETTE-COMPATIBILITY-CONTRACT-001",     (qo 7)
             "RUN-CANTU-COLOR-SELECTOR-UNIFICATION-001"]              (qo 16)
claves      run_id, queue_order, title, summary, full_description, status, depends_on
```

**(3)**
```
run_id      RUN-CANTU-COMPILER-VARIANT-GATES-001
queue_order 29
title       Align the compiler variant gates with the author palette
status      planned
objetivo    Editor and Engine Shared Features (O5)
fase        Color and Palette Compatibility Contract (O5.P5)
lane        (sin clave -> DEVELOPMENT por defecto)
depends_on  ["RUN-CANTU-AUTHOR-PALETTE-COMPILER-ENGINE-001",          (qo 19)
             "RUN-JAME-COLOR-PALETTE-COMPATIBILITY-CONTRACT-001"]     (qo 7)
claves      run_id, queue_order, title, summary, full_description, status, depends_on
```

Los tres nacen **sin campos de clasificación**, como manda el alcance: nadie clasifica hasta que
el piloto de `aiw-console` entregue su procedimiento. Los tres nacen `planned` y ningún `status`
se tocó en ninguna parte.

Precedencia de dependencias, verificada por el motor en cada paso: 9 y 16 < 17; 7 y 16 < 19;
19 y 7 < 29. Ninguna arista apunta hacia adelante.

### 7.5 Las seis aristas

Las seis entran, y **ningún otro campo se mueve** en ninguno de los seis runs:

| run | arista añadida | aristas | `title`/`summary`/`full_description`/`status` |
|---|---|---:|---|
| `RUN-JAME-FORMULA-INSERTER-INTEGRATION-001` | `+ RUN-JAME-WEB-READINESS-EVIDENCE-001` | 1 → 2 | intactos |
| `RUN-JAME-WEB-CALLOUT-REPAIR-001` | `+ RUN-CANTU-AUTHOR-PALETTE-COMPILER-ENGINE-001` | 3 → 4 | intactos |
| `RUN-JAME-WEB-DETAILS-REPAIR-001` | `+ RUN-CANTU-AUTHOR-PALETTE-COMPILER-ENGINE-001` | 3 → 4 | intactos |
| `RUN-JAME-RULE-COMPONENT-REPAIR-AND-ACTIVATION-001` | `+ RUN-CANTU-AUTHOR-PALETTE-COMPILER-ENGINE-001` | 4 → 5 | intactos |
| `RUN-JAME-WEB-TABLE-AUDIT-AND-REPAIR-001` | `+ RUN-CANTU-AUTHOR-PALETTE-COMPILER-ENGINE-001` | 2 → 3 | intactos |
| `RUN-JAME-WEB-CONCEPTGRID-AUDIT-AND-REPAIR-001` | `+ RUN-CANTU-AUTHOR-PALETTE-COMPILER-ENGINE-001` | 2 → 3 | intactos |

Comprobado por comparación directa de los cuatro campos contra el respaldo, run por run.

---

## 8. El validador (criterio 9)

Corrido desde `projects/cantu-studio`. Salida completa, verbatim:

```
Project Console state validation passed.
Roadmap v3 prototype: 7 objectives / 28 phases / 63 runs; queue groups needs_human_decision=0 now=0 ready_next=20 later=26 history=17
Docs indexed: 149
Docs curated primary-visible: 60 of 149 registered
Component statuses: 16
Git provenance episodes: 9
Git history snapshot: 918 commits / 2 branches (2 visible, 0 backup hidden); current=main; run-associated=6; source=local_git_autosync
Roadmap rebase warnings (non-blocking):
- .aiw/roadmap/roadmap.json run RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 depends on RUN-CANTU-ROADMAP-CONTENT-AUDIT-001, which does not resolve in this roadmap. With a single roadmap loaded this cannot be decided: it may be a legal external dependency — a run that lives in another project (CONTRATO §10.d Regla 2) — or a typo in the run id. Both are possible and one loaded roadmap cannot tell them apart; resolve it against the full set of projects to distinguish external from write error.
```

Código de salida **0**. Estado verde.

Cifras reales pedidas por el criterio 9:

| grupo | valor real |
|---|---:|
| `needs_human_decision` | 0 |
| `now` | 0 |
| `ready_next` | **20** |
| `later` | 26 |
| `history` | **17** |

Estas son las cifras del **estado actual**, que es el estado sin aplicar. La medición
posterior a la escritura **no existe porque no se escribió**.

### 8.1 `RUN-JAME-FORMULA-INSERTER-INTEGRATION-001`: confirmado con el dato

El criterio 9 pide confirmar o negar que ese run sale del conjunto elegible. Se puede
responder con dato duro sin escribir, porque la regla de agrupación del validador es una línea
y está en el propio validador (`validate-project-console-state.mjs:906-909`):

```js
if (run.status === "planned") {
  const ready = (run.depends_on || []).every((id) => runsById.get(id)?.status === "completed");
  return ready ? "ready_next" : "later";
}
```

Aplicada esa regla —la del validador, literal— a la sombra final:

| grupo | canónico hoy | sombra tras las 13 ops |
|---|---:|---:|
| `ready_next` | 20 | **16** |
| `later` | 26 | 33 |
| `history` | 17 | 17 |
| `now` | 0 | 0 |
| `needs_human_decision` | 0 | 0 |

**Confirmado: `RUN-JAME-FORMULA-INSERTER-INTEGRATION-001` sale del conjunto elegible.**
Hoy es elegible porque su única dependencia (`RUN-JAME-MATHLIVE-INTEGRATION-READINESS-001`)
está `completed`. Al añadirle `RUN-JAME-WEB-READINESS-EVIDENCE-001`, que está `planned`, deja
de serlo. Es justo el efecto que la arista busca.

Salen seis del conjunto elegible, entran dos:

```
salen:   RUN-JAME-FORMULA-INSERTER-INTEGRATION-001
         RUN-JAME-WEB-CALLOUT-REPAIR-001
         RUN-JAME-WEB-DETAILS-REPAIR-001
         RUN-JAME-WEB-TABLE-AUDIT-AND-REPAIR-001
         RUN-JAME-RULE-COMPONENT-REPAIR-AND-ACTIVATION-001
         RUN-JAME-WEB-CONCEPTGRID-AUDIT-AND-REPAIR-001
entran:  RUN-CANTU-AUTHOR-PALETTE-COMPILER-ENGINE-001
         RUN-CANTU-REVALIDATION-DOD-REFRESH-001
```

Los cinco componentes salen porque ahora esperan a `AUTHOR-PALETTE`, que es exactamente lo que
el encargo quiere: que consuman la pieza compartida en vez de tropezar con ella. Neto: 20 → 16.

**Marca de honestidad:** la fila «sombra» de esa tabla es la regla del validador aplicada por
mí a la sombra, no la salida del binario del validador. El validador lee una ruta canónica fija
y apuntarlo a la sombra exigiría escribir el canónico. La regla usada es la del validador,
copiada literal; la cifra es derivada, no impresa por él. **[NO VERIFICADO POR EL VALIDADOR]**

---

## 9. Cifras del ticket contra cifras medidas (criterio 10)

Ninguna se dio por buena. Todas se midieron.

| cifra del ticket | medida | veredicto |
|---|---|---|
| 63 runs de partida | 63 | **correcta** |
| 66 runs de llegada | 66 en la sombra | **correcta** |
| 17 `completed` | 17 | **correcta** |
| 46 `planned` | 46 | **correcta** |
| 126 aristas antes | 126 | **correcta** |
| 17 aristas del audit de conjunto | 17 | **correcta** |
| audit de conjunto queda en 36 | queda en **42** | **INCORRECTA** |

Seis de siete correctas. La séptima es la que para el encargo.

Cifras nuevas que el ticket no daba y que quedan medidas aquí:

| dato | valor |
|---|---:|
| aristas después | 138 (126 + 6 de los runs nuevos + 6 del criterio 7) |
| `planned` después | 49 |
| bytes antes → después | 105 490 → 112 273 (+6 783) |
| objetivos / fases | 7 / 28, sin cambio |
| posición de partida del audit de conjunto | 39 |
| runs entre `Visual` y el audit de conjunto | 6 |

---

## 10. Qué NO se hizo

- **No se escribió el canónico.** `applyPlan` no se invocó.
- **No se editó ningún JSON a mano**, en ningún momento, con ningún pretexto.
- **No se cambió ningún `status`**, ni de los existentes ni de los tres nuevos.
- **No se tocó `title`, `summary` ni `full_description`** de ningún run existente.
- **No se creó, borró, renombró ni movió** ningún objetivo ni ninguna fase.
- **No se clasificó ningún run.** Los tres nuevos nacen sin campos de clasificación.
- **No se re-emitió `.project/`.**
- **No se ejecutó Git** en ninguna forma.
- **No se levantó la consola** ni ningún servidor.
- **No se ejecutó** ningún trabajo descrito por los tres runs nuevos.
- **No se corrigió** la posición esperada del audit de conjunto ni se movió ningún run para
  hacerla casar. Esa decisión es del operador.

---

## 11. Coste medido y recomendación (criterio 12)

### 11.1 Coste de aplicar, medido

Todo el trabajo está hecho y verificado. Aplicar cuesta:

- **13 llamadas** al motor, en el orden de §5.2, ya validadas de principio a fin.
- **13 escrituras atómicas** con backup y rollback automático por validador.
- **+6 783 bytes** en el canónico.
- **~1 minuto** de reloj.
- Riesgo de corrupción: **muy bajo**. Cada `applyPlan` hace backup en tmpdir, escribe temporal,
  `fsync`, `rename`, y revierte si el validador sale distinto de 0. Y las trece ya pasaron el
  `postcheck` completo del motor en sombra.
- Efecto en la cola: `ready_next` 20 → 16.

### 11.2 Las tres salidas, sin decidir por el operador

**A — Aplicar tal cual y corregir la expectativa del criterio 8.**
Es lo que el encargo pide de verdad. Se ejecutan las 13 operaciones, la tabla 17→35 casa
entera, y el audit de conjunto queda en 42 en vez de 36. Coste: el de §11.1. No mueve ningún
run existente. La única acción adicional es enmendar la cifra del ticket, que ya está medida.

**B — Aplicar y además adelantar el audit de conjunto a 36.**
Haría verdadera la letra completa del criterio 8, pero exige **mover seis runs** que el
encargo no menciona: los dos de Component Guide y los cuatro de Packet Verification pasarían
por detrás del audit de conjunto. Eso **cambia el orden de trabajo**, no solo la numeración:
el audit de conjunto de los componentes Web pasaría a ejecutarse **antes** de que se escriban
las guías y se verifiquen los paquetes. Es una decisión de secuencia del proyecto, no un
detalle de numeración, y por eso no se ha tomado aquí.

**C — No aplicar.**
El canónico sigue como está. Los cinco componentes con superficie de color siguen sin
depender de la pieza compartida, y `FORMULA-INSERTER` sigue siendo elegible antes de que el
audit de conjunto cierre. Coste: el que el propio ticket describe — quince runs declarando la
misma divergencia por separado.

### 11.3 Recomendación explícita

**Opción A.** La tabla 17→35 casa entera y verbatim; las seis aristas entran limpias; los tres
runs nacen en el objetivo, la fase y el `lane` declarados. La única discrepancia es una cifra
fechada del ticket que el propio criterio 10 avisó de que podía estar mal, y **está mal**: el
audit de conjunto no puede quedar en 36 sin mover seis runs que el encargo nunca nombra.

Adelantar el audit de conjunto (opción B) es una decisión de secuencia con consecuencias
reales sobre el orden de ejecución del proyecto, y merece su propio encargo con su propio
razonamiento. Meterla de rondón dentro de una verificación de posiciones sería exactamente el
tipo de cambio silencioso que este roadmap está montado para impedir.

**Y una recomendación aparte, que no depende de cuál de las tres se elija:**

El motor de roadmap de `cantu-studio` está **inservible** contra su propio canónico. Rehúsa en
pre-flight por la dependencia externa §10.d y lo seguirá haciendo hasta que su `checkInvariants`
aprenda a resolver ids externos, como ya hace el de `aiw-console`. Hoy eso no bloquea nada
porque la consola global es la que escribe, pero significa que **el CLI local de ese repo es una
trampa**: parece disponible, está documentado, y falla en el primer intento contra cualquier
edición. O se le transplanta el `externalRunIds` del motor global, o se marca como retirado.
Merece un run propio.

---

## 12. Evidencia

Todo en el scratchpad de sesión, fuera de los dos repos:

```
scratchpad/
  roadmap.json.BACKUP-PRE-INSERCION   105 490 B  md5 6d13a7c617801b4b197b6075f418cbac
  shadow-FINAL-13-OPS.json            112 273 B  md5 d458523c719683cd5dd316a4f5cc7016
  medir.mjs        precondiciones y cola completa sobre el canónico (solo lectura)
  dryrun.mjs       las 13 operaciones vía planEdit sobre la sombra (no invoca applyPlan)
  verificar.mjs    criterio 8 campo a campo, sombra contra respaldo
  texto-1-full.txt / texto-2-full.txt / texto-3-full.txt   los tres full_description verbatim
```

`shadow-FINAL-13-OPS.json` es byte a byte lo que el motor habría escrito. Si el operador elige
la opción A, la vía correcta **no** es copiar esa sombra al canónico: es volver a correr
`dryrun.mjs` con `applyPlan` habilitado, para que cada paso pase por la escritura atómica y por
el validador como autoridad.

---
---

# ACTO II — La aplicación real (segundo encargo)

**Fecha:** 2026-08-01
**Encargo:** aplicar al canónico el plan que el acto I dejó validado en sombra, con la
corrección del criterio que provocó la parada.
**Resultado:** **APLICADO. Las trece operaciones escribieron el canónico. Verificación
posterior completa, validador verde.**

---

## 13. La corrección: era del ticket, no del canónico

El acto I paró porque el criterio 8 de aquel ticket afirmaba que
`Audit the Web components as a whole` debía quedar en `queue_order` **36**.

**Esa afirmación era falsa, y el operador la ha retirado.** Se saltaba seis runs que existen
hoy en el canónico entre `Audit and implement the Visual component` y el audit de conjunto:

| `qo` de partida | run que el ticket original no contemplaba |
|---:|---|
| 33 | Unify the Component Guide mechanism and fix its template |
| 34 | Write the Component Guide for the seventeen Web components |
| 35 | Verify the Header, List, IconList, and Card component packets |
| 36 | Verify the Video, Narrative, Callout, and Details component packets |
| 37 | Verify the Arithmetic, Rule, Split, and Table component packets |
| 38 | Verify the ConceptGrid, Hierarchy, Timeline, and Visual component packets |

La aritmética nunca dejó margen: el audit de conjunto partía de 39, las tres inserciones caen
todas por delante de él, luego acaba en **42**. Para acabar en 36 tendría que haber partido de
33, es decir, esos seis runs tendrían que no existir. Existen.

**Qué se corrigió y qué no.** Se corrigió **el ticket**. El canónico no tenía nada que
corregir: su cola era la correcta y la tabla 17→35 del acto I ya casaba entera contra ella.
**No se movió ningún run** para hacer casar la cifra falsa —ni el audit de conjunto, ni los
seis de Component Guide y Packet Verification, ni ningún otro—. Mover seis runs para satisfacer
una medición fechada mal habría cambiado el orden de ejecución del proyecto: el audit de
conjunto de los componentes Web habría pasado a ejecutarse *antes* de escribir las guías y
verificar los paquetes. Esa es una decisión de secuencia, y no se tomó.

La recomendación del acto I (§11.3) era la **opción A**: aplicar tal cual y enmendar la cifra.
Es lo que se hizo.

---

## 14. Precondición de la ventana (criterio 1)

Medido **antes** de escribir, no dado por bueno desde el ticket:

| dato | valor | veredicto |
|---|---|---|
| respaldo en el scratchpad | presente, 105 490 B | vigente |
| md5 del respaldo | `6d13a7c617801b4b197b6075f418cbac` | intacto |
| md5 del canónico al abrir | `6d13a7c617801b4b197b6075f418cbac` | **sin cambio** |
| `cmp` canónico ↔ respaldo | sin diferencias | ventana limpia |
| mtime del canónico | 2026-07-31 23:45:24 | anterior al acto I |

Nadie escribió el canónico durante la ventana entre los dos encargos. Se procedió.

---

## 15. Cómo se aplicó (criterio 2)

**No se copió la sombra sobre el canónico.** Cada una de las trece operaciones se
**re-planificó contra el disco real** tal como el paso anterior lo había dejado, y se escribió
con `applyPlan`. La sombra del acto I no se tocó: quedó como evidencia y como término de
comparación.

El flujo replica `serve.mjs` de la consola global paso por paso, incluida la autoridad
post-escritura que inyecta:

```js
planEdit({ filePath: CANON, op, args, externalRunIds })
applyPlan({ filePath: CANON, serialized: plan.serialized,
            validate: writtenFileValidator(CANON, externalRunIds) })
```

`writtenFileValidator` (`serve.mjs:359`) re-lee el fichero **ya renombrado en su sitio**,
le pasa `checkInvariants(parsed, { externalRunIds })` y comprueba que conserva la forma
`objectives -> phases -> runs` que el emisor sirve. Salida distinta de 0 revierte desde el
backup del motor. Se replicó su comportamiento verbatim, importando `checkInvariants` del
núcleo y `hasRoadmapTreeShape` de `tools/projector/project.mjs`.

Escritura atómica por paso: backup en tmpdir → fichero temporal en el mismo directorio →
`fsync` → `rename`.

```
externalRunIds resueltos: 97
canonico: .../projects/cantu-studio/.aiw/roadmap/roadmap.json
```

### 15.1 Las trece operaciones aplicadas

Las trece devolvieron el mismo veredicto del validador post-escritura:
`re-read OK: invariants and tree shape verified on the written file`.
**Ninguna revirtió. Ninguna emitió un warning.**

| # | operación | run | bytes | re-secuenciados | baseline previo (sha256, 12) |
|---:|---|---|---:|---:|---|
| 1 | `insert --before RUN-CANTU-DOCUMENTATION-DEEP-AUDIT-001` | DOD-REFRESH | 107 584 | 48 | `6e7aa1e47370` |
| 2 | `move --to-phase O5.P6 --to-order 17` | DOD-REFRESH | 107 584 | 0 | `bd5272fb3f69` |
| 3 | `set-lane DOCUMENTATION` | DOD-REFRESH | 107 624 | 0 | `78dbffa8b744` |
| 4 | `insert --before RUN-JAME-WEB-LIST-REVALIDATION-001` | AUTHOR-PALETTE | 109 949 | 47 | `7f67e763444e` |
| 5 | `move --to-phase O5.P5 --to-order 19` | AUTHOR-PALETTE | 109 949 | 0 | `30d216d299c4` |
| 6 | `insert --before RUN-JAME-WEB-SPLIT-SCOPE-AND-REPAIR-001` | VARIANT-GATES | 111 892 | 38 | `938003996795` |
| 7 | `move --to-phase O5.P5 --to-order 29` | VARIANT-GATES | 111 892 | 0 | `f63166acdc92` |
| 8 | `set-deps --add-dep` | FORMULA-INSERTER | 111 948 | 0 | `5655314f94e2` |
| 9 | `set-deps --add-dep` | CALLOUT | 112 013 | 0 | `1cb79dbb80e8` |
| 10 | `set-deps --add-dep` | DETAILS | 112 078 | 0 | `e155eca9d269` |
| 11 | `set-deps --add-dep` | RULE | 112 143 | 0 | `2e9d9a926ca7` |
| 12 | `set-deps --add-dep` | TABLE | 112 208 | 0 | `14269b401ac4` |
| 13 | `set-deps --add-dep` | CONCEPTGRID | 112 273 | 0 | `faffeabf4f70` |

Los pasos 2, 5 y 7 re-secuencian **0 runs**: son las reubicaciones de fase sobre un run que ya
está en su posición final, tal como el acto I (§3.6) había previsto. El `baseline` distinto en
cada paso es el compare-and-swap del motor: cada operación planificó contra el contenido exacto
que la anterior dejó en disco.

Backup del motor por escritura: `C:\Users\chris\AppData\Local\Temp\roadmap-backup-9504-roadmap.json`.

**El respaldo del acto I no hizo falta.** No hubo nada que restaurar.

---

## 16. Verificación posterior (criterio 3)

Medida sobre el canónico ya escrito.

| exigido | medido | veredicto |
|---|---|---|
| total **66** | **66** | OK |
| `queue_order` **1..66** denso, único, contiguo | sí | OK |
| `run_id` únicos | sí | OK |
| **0** fases con 0 runs | **0** | OK |
| ningún run `active` | **0** | OK |
| `#1`–`#16` byte-idénticos al respaldo | idénticos | OK |
| **exactamente 1** `depends_on` colgante, el externo legal | **1**, y es ese | OK |
| colgantes distintos del esperado | **0** | OK |

El único colgante es el preexistente, sin cambio:

```
RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 -> RUN-CANTU-ROADMAP-CONTENT-AUDIT-001
```

Es la dependencia externa legal del CONTRATO §10.d Regla 2 hacia el roadmap de `aiw-console`
(qo 4, `completed`). **La inserción no introdujo ninguna nueva.**

Comprobación adicional, no pedida pero decisiva para el alcance:

| dato | antes | después |
|---|---:|---:|
| objetivos | 7 | 7 |
| fases | 28 | 28 |
| firma completa objetivo→fase (ids y títulos) | — | **idéntica al respaldo** |

**Ningún objetivo ni fase fue creado, movido, renombrado ni modificado.**

Y el estado global:

| dato | antes | después |
|---|---:|---:|
| runs | 63 | 66 |
| `completed` | 17 | 17 |
| `planned` | 46 | 49 |
| `active` | 0 | 0 |
| aristas `depends_on` | 126 | 138 |
| bytes | 105 490 | 112 273 |

Las 12 aristas nuevas son las 6 de los runs insertados más las 6 del criterio 5.

---

## 17. La cola de 17 a 35 (criterio 4)

Las diecinueve filas, verbatim contra la tabla del acto I. **Casa entera.**

| `qo` | título en el canónico | ¿casa? |
|---:|---|---|
| 17 | Update the revalidation Definition of Done to match the measured surfaces | OK |
| 18 | Audit the documentation corpus and produce the disposition list | OK |
| 19 | Carry the author palette through the compiler and the Web engine | OK |
| 20 | Audit and implement the List component | OK |
| 21 | Audit and implement the IconList component | OK |
| 22 | Audit and implement the Card component | OK |
| 23 | Audit and implement the Video component | OK |
| 24 | Audit and implement the Narrative component | OK |
| 25 | Audit and implement the Callout component | OK |
| 26 | Audit and implement the Details component | OK |
| 27 | Audit and implement the Arithmetic component | OK |
| 28 | Audit and implement the Rule component | OK |
| 29 | Align the compiler variant gates with the author palette | OK |
| 30 | Decide scope and enable the Split component | OK |
| 31 | Audit and implement the Table component | OK |
| 32 | Audit and implement the ConceptGrid component | OK |
| 33 | Audit and implement the Hierarchy component | OK |
| 34 | Audit and implement the Timeline component | OK |
| 35 | Audit and implement the Visual component | OK |

### 17.1 Dónde quedaron los siete, medido

Sin afirmar ninguna posición de antemano. Los siete se desplazaron **+3**, que es lo que
corresponde a tres inserciones por delante de ellos y a **ningún movimiento**:

| `qo` antes | `qo` después | título |
|---:|---:|---|
| 33 | **36** | Unify the Component Guide mechanism and fix its template |
| 34 | **37** | Write the Component Guide for the seventeen Web components |
| 35 | **38** | Verify the Header, List, IconList, and Card component packets |
| 36 | **39** | Verify the Video, Narrative, Callout, and Details component packets |
| 37 | **40** | Verify the Arithmetic, Rule, Split, and Table component packets |
| 38 | **41** | Verify the ConceptGrid, Hierarchy, Timeline, and Visual component packets |
| 39 | **42** | **Audit the Web components as a whole** |

`Audit the Web components as a whole` quedó en **42**, con sus **17 aristas byte-idénticas al
respaldo**. Ninguno de los siete fue tocado más allá de su renumeración.

### 17.2 Los tres runs nuevos, como quedaron en disco

```
run_id      RUN-CANTU-REVALIDATION-DOD-REFRESH-001
queue_order 17                     status  planned
objetivo    Editor and Engine Shared Features (O5)
fase        Shared Component Contracts and Revalidation Checklist (O5.P6)
lane        "DOCUMENTATION"                          <- escrito explícitamente
depends_on  ["RUN-JAME-WEB-COMPONENT-CONTRACT-STANDARDIZATION-001",  (qo 9)
             "RUN-CANTU-COLOR-SELECTOR-UNIFICATION-001"]             (qo 16)
claves      run_id, queue_order, title, summary, full_description, status, depends_on, lane

run_id      RUN-CANTU-AUTHOR-PALETTE-COMPILER-ENGINE-001
queue_order 19                     status  planned
objetivo    Editor and Engine Shared Features (O5)
fase        Color and Palette Compatibility Contract (O5.P5)
lane        (sin clave -> DEVELOPMENT por defecto)
depends_on  ["RUN-JAME-COLOR-PALETTE-COMPATIBILITY-CONTRACT-001",    (qo 7)
             "RUN-CANTU-COLOR-SELECTOR-UNIFICATION-001"]             (qo 16)
claves      run_id, queue_order, title, summary, full_description, status, depends_on

run_id      RUN-CANTU-COMPILER-VARIANT-GATES-001
queue_order 29                     status  planned
objetivo    Editor and Engine Shared Features (O5)
fase        Color and Palette Compatibility Contract (O5.P5)
lane        (sin clave -> DEVELOPMENT por defecto)
depends_on  ["RUN-CANTU-AUTHOR-PALETTE-COMPILER-ENGINE-001",         (qo 19)
             "RUN-JAME-COLOR-PALETTE-COMPATIBILITY-CONTRACT-001"]    (qo 7)
claves      run_id, queue_order, title, summary, full_description, status, depends_on
```

Los tres nacieron **sin campos de clasificación**, como manda la regla vigente: nadie clasifica
hasta que el piloto de `aiw-console` entregue su procedimiento. Los tres nacieron `planned`.

---

## 18. Las seis aristas, una a una (criterio 5)

Las seis entraron, y en los seis runs `title`, `summary`, `full_description` y `status` siguen
**byte-idénticos al respaldo**, comparados campo a campo:

| run | arista añadida | aristas | `title` | `summary` | `full_description` | `status` |
|---|---|---:|:-:|:-:|:-:|:-:|
| `RUN-JAME-FORMULA-INSERTER-INTEGRATION-001` | `+ RUN-JAME-WEB-READINESS-EVIDENCE-001` | 1 → 2 | = | = | = | = |
| `RUN-JAME-WEB-CALLOUT-REPAIR-001` | `+ RUN-CANTU-AUTHOR-PALETTE-COMPILER-ENGINE-001` | 3 → 4 | = | = | = | = |
| `RUN-JAME-WEB-DETAILS-REPAIR-001` | `+ RUN-CANTU-AUTHOR-PALETTE-COMPILER-ENGINE-001` | 3 → 4 | = | = | = | = |
| `RUN-JAME-RULE-COMPONENT-REPAIR-AND-ACTIVATION-001` | `+ RUN-CANTU-AUTHOR-PALETTE-COMPILER-ENGINE-001` | 4 → 5 | = | = | = | = |
| `RUN-JAME-WEB-TABLE-AUDIT-AND-REPAIR-001` | `+ RUN-CANTU-AUTHOR-PALETTE-COMPILER-ENGINE-001` | 2 → 3 | = | = | = | = |
| `RUN-JAME-WEB-CONCEPTGRID-AUDIT-AND-REPAIR-001` | `+ RUN-CANTU-AUTHOR-PALETTE-COMPILER-ENGINE-001` | 2 → 3 | = | = | = | = |

`set-deps --add-dep` añade sin reemplazar y es idempotente; toca únicamente `depends_on`.

---

## 19. El validador (criterio 6)

Corrido desde `projects/cantu-studio` por la vía que no escribe. Salida completa, verbatim:

```
Project Console state validation passed.
Roadmap v3 prototype: 7 objectives / 28 phases / 66 runs; queue groups needs_human_decision=0 now=0 ready_next=16 later=33 history=17
Docs indexed: 149
Docs curated primary-visible: 60 of 149 registered
Component statuses: 16
Git provenance episodes: 9
Git history snapshot: 918 commits / 2 branches (2 visible, 0 backup hidden); current=main; run-associated=6; source=local_git_autosync
Roadmap rebase warnings (non-blocking):
- .aiw/roadmap/roadmap.json run RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 depends on RUN-CANTU-ROADMAP-CONTENT-AUDIT-001, which does not resolve in this roadmap. With a single roadmap loaded this cannot be decided: it may be a legal external dependency — a run that lives in another project (CONTRATO §10.d Regla 2) — or a typo in the run id. Both are possible and one loaded roadmap cannot tell them apart; resolve it against the full set of projects to distinguish external from write error.
```

Código de salida **0**. Estado verde. El único warning es el §10.d preexistente, no bloqueante,
idéntico al de antes del encargo.

### 19.1 Cifras reales del binario

| grupo | antes (medido) | **ahora (medido)** |
|---|---:|---:|
| `needs_human_decision` | 0 | **0** |
| `now` | 0 | **0** |
| `ready_next` | 20 | **16** |
| `later` | 26 | **33** |
| `history` | 17 | **17** |

**`history=17` y `ready_next=16`**, del binario, no de memoria.

**Sobre la proyección de la sombra.** El acto I (§8.1) proyectó `ready_next=16` aplicando a
mano la regla del validador, y lo marcó explícitamente como `[NO VERIFICADO POR EL VALIDADOR]`.
Medido ahora con el binario: **16**. **No hay discrepancia.** La proyección era correcta y
queda confirmada; esa marca de no-verificado puede considerarse levantada.

`RUN-JAME-FORMULA-INSERTER-INTEGRATION-001` salió del conjunto elegible, como se buscaba: su
nueva dependencia hacia el audit de conjunto está `planned`. Salieron seis de `ready_next` y
entraron dos, neto 20 → 16.

---

## 20. Estado final del canónico

| dato | valor |
|---|---|
| ruta | `projects/cantu-studio/.aiw/roadmap/roadmap.json` |
| **md5** | **`d458523c719683cd5dd316a4f5cc7016`** |
| bytes | 112 273 |
| mtime | 2026-08-01 10:19:58 |
| md5 anterior | `6d13a7c617801b4b197b6075f418cbac` (105 490 B) |

**El canónico resultante es byte a byte idéntico a la sombra que el acto I planificó**
(`shadow-FINAL-13-OPS.json`, md5 `d458523c719683cd5dd316a4f5cc7016`), verificado con
comparación binaria. Esto cierra el círculo: lo aplicado es exactamente lo que se dijo que se
aplicaría, ni un byte más. Y se llegó ahí **conduciendo el motor trece veces**, no copiando el
fichero.

---

## 21. Qué NO se hizo en este acto

- **No se copió la sombra sobre el canónico.** Cada paso se re-planificó y se escribió con
  `applyPlan`.
- **No se movió ningún run existente**, incluido el audit de conjunto. Los desplazamientos son
  únicamente renumeración por inserción.
- **No se editó el JSON a mano** en ningún momento.
- **No se cambió ningún `status`.**
- **No se tocó `title`, `summary` ni `full_description`** de ningún run existente.
- **No se creó, borró, movió ni modificó** ningún objetivo ni ninguna fase.
- **No se clasificó ningún run.**
- **No se re-emitió `.project/`.** Lo hace el operador desde la consola.
- **No se ejecutó Git.**
- **No se levantó la consola** ni ningún servidor.
- **No se reparó el CLI local de `cantu-studio`.** Sigue siendo el hallazgo declarado en
  §3.1 y §11.3: rehúsa en pre-flight contra su propio canónico por no resolver dependencias
  externas §10.d. Su dueño no era este encargo y **el hallazgo sigue abierto**.
- **No se ejecutó** ningún trabajo descrito por los tres runs nuevos.

---

## 22. Evidencia del acto II

```
scratchpad/
  roadmap.json.BACKUP-PRE-INSERCION   105 490 B  md5 6d13a7c617801b4b197b6075f418cbac
                                                  (estado previo; no hizo falta restaurar)
  shadow-FINAL-13-OPS.json            112 273 B  md5 d458523c719683cd5dd316a4f5cc7016
                                                  (plan del acto I; idéntico al resultado)
  aplicar.mjs             las 13 operaciones vía planEdit + applyPlan sobre el CANONICO,
                          con writtenFileValidator inyectado y restauración automática
  verificar-canonico.mjs  criterios 3, 4 y 5 sobre el canónico ya escrito
```

Backups del motor por escritura, en el tmpdir del sistema:
`C:\Users\chris\AppData\Local\Temp\roadmap-backup-9504-roadmap.json`.

---

## 23. Siguiente paso, que no es de este encargo

El canónico está escrito y verde, pero `.project/` **no se ha re-emitido**: sigue proyectando
los 63 runs anteriores. **Lo re-emite el operador desde la consola**, que es el punto de
serialización. Hasta entonces la consola mostrará la cola vieja aunque el canónico ya tenga
la nueva.

Y el commit lo hace el operador con GitHub Desktop. Sugerencia de mensaje:

```
roadmap(cantu): insert three shared-piece runs at 17/19/29 and six depends_on edges
```
