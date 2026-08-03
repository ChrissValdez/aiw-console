# Clasificación y reparación de texto del run `queue_order` 47 — «One registry for the plumbing every optional run field repeats»

**Proyecto:** aiw-console
**Fecha:** 2026-08-03 (hora local `-0600`; el instante que estampó el motor es UTC y se cita literal)
**Naturaleza:** encargo de escritura sobre el canónico. **Se ejecutó completo. Ninguna parada se disparó.**
**Archivos escritos en el repo:** `roadmap/roadmap.json` y este record. Ningún otro.
**Bytes de `roadmap/roadmap.json`: 138 161** (entró con **137 889**; delta **+272 bytes**).

Este encargo **no decidió ningún valor**. Los cuatro tokens de clasificación y la identidad
del run que posee la medición venían dados en el ticket y se transcribieron.

---

## Resultado en una línea

**1 run tocado, 55 intactos. 6 diferencias contra el respaldo, las 6 en ese único run: sus
4 campos de clasificación, su `classified_at` y su `full_description`. 0 diferencias en los
8 campos intocables de los 56 runs. `severity` derivada: `MAJOR`. `closure_mode` derivado:
`SEMI_ATTENDED`. Ninguno de los dos se escribió.**

---

## A. Antes de escribir

### A.1 — Respaldo del canónico, fuera del repo

El repo es `projects/aiw-console/`; el respaldo vive en `_backups/`, que es hermana de
`projects/` y por tanto **fuera del árbol versionado**.

| dato | valor |
|---|---|
| ruta | `C:\Users\chris\Documents\AIW_Workspace\_backups\aiw-console\roadmap.json.2026-08-03.pre-clasificacion-qo47.bak` |
| bytes | **137 889** |
| md5 | `0753d4e83d1b13667d65514c15e8149d` |

Comando:

```bash
cp roadmap/roadmap.json "C:/Users/chris/Documents/AIW_Workspace/_backups/aiw-console/roadmap.json.2026-08-03.pre-clasificacion-qo47.bak" && md5sum roadmap/roadmap.json "C:/Users/chris/Documents/AIW_Workspace/_backups/aiw-console/roadmap.json.2026-08-03.pre-clasificacion-qo47.bak"
```

El md5 del origen y el del respaldo salieron **idénticos** en la misma invocación, que es lo
que prueba que el respaldo es el canónico y no otra cosa.

**Segundo respaldo, el del propio motor.** `core.applyWrite` guarda su copia previa antes del
rename atómico; la escritura la reportó en
`C:\Users\chris\AppData\Local\Temp\roadmap-backup-27212-roadmap.json`. No es el respaldo que
pide el criterio 1 —vive en el temp del proceso— pero se declara porque existió.

### A.2 — El `run_id`, derivado por `queue_order`. No tecleado

El arnés (`scratchpad/edit-qo47.mjs`) recorre el árbol, filtra por `queue_order === 47`,
**exige exactamente una coincidencia** y toma de ella el `run_id`. La constante que sí está
tecleada en el arnés es el **título esperado**, y es la guarda, no la selección:

```js
const hits = runs0.filter((r) => r.queue_order === 47);
if (hits.length !== 1) die(...);
const RUN_ID = hits[0].run_id;                  // derivado
if (target.title !== EXPECTED_TITLE) die(...);  // GUARDA QUE ABORTA
```

Medido:

- `run_id` derivado: **`RUN-CONSOLE-FIELD-PLUMBING-REGISTRY-001`**
- runs en `queue_order` 47: **1**
- `title` contra `One registry for the plumbing every optional run field repeats`:
  **coincidencia exacta** (`===`, sin normalizar espacios ni mayúsculas).

**La guarda no se disparó.**

### A.3 — Los conteos, medidos y no supuestos

| magnitud | esperado por el ticket | **medido** | ¿coincide? |
|---|---|---|---|
| runs en el árbol | 56 | **56 runs** | sí |
| `queue_order` único | sí | **56 valores distintos** | sí |
| `queue_order` denso 1..56 | sí | **denso, sin huecos** | sí |
| runs con `classified_at` | 12 | **12 runs** | sí |

Comando (lectura pura, antes de escribir):

```bash
node -e "const o=require('fs').readFileSync('roadmap/roadmap.json','utf8');const j=JSON.parse(o);const r=[];for(const a of j.objectives)for(const p of a.phases)for(const x of p.runs)r.push(x);console.log(r.length, new Set(r.map(x=>x.queue_order)).size, r.filter(x=>'classified_at' in x).length)"
```

**Ninguna cifra difirió. La parada del criterio 3 no se disparó.**

### A.4 — El run no traía ningún campo de clasificación

Se comprobaron los **seis** campos almacenados de §1
(`correctness_model`, `work_type`, `blast_radius`, `failure_surfaces`, `external_effects`,
`classified_at`) con `in` sobre el objeto del run. **Presentes: 0 de 6.**

**La parada del criterio 4 no se disparó.**

---

## B. La clasificación

### B.1 — Todo por el motor. Ni un byte a mano

La escritura fue **una sola** `planEdit` + `applyPlan` de
[`tools/roadmap/roadmap-plan.mjs`](tools/roadmap/roadmap-plan.mjs:245), con la operación
`batch` y **dos sub-ops** sobre el mismo run: `set-classification` y `set-text`. Ambas están
en el conjunto batcheable declarado en
[`roadmap-plan.mjs:214`](tools/roadmap/roadmap-plan.mjs:214), y la razón por la que se
usó `batch` es la que el propio código escribe en su comentario: son claves opcionales de
**un** run, no entregan ningún `*_id`, y «clasificar un run y editarlo son una sola edición
en la cabeza del operador, y deben ser una sola previsualización y una sola escritura».

La secuencia ejecutada es la misma que corre la ruta de escritura de la consola
([`project-console/serve.mjs:489`](project-console/serve.mjs:489) y siguientes):

```
loadCurrent -> planEdit -> compare-and-swap sobre baseline -> applyPlan(validador de relectura)
```

El validador inyectado es el mismo `writtenFileValidator` en sustancia: relee el fichero ya
renombrado, lo parsea y le pasa `checkInvariants`. Su salida literal fue
`re-read OK: invariants verified on the written file`.

**Lo que NO se hizo, deliberadamente:** no se reeemitió `.project/` (fuera de alcance; lo hace
el operador desde la consola). La ruta de la consola sí lo hace tras escribir; este arnés no.

### B.2 — Los valores escritos, tal como los da el ticket

| campo | valor pedido | **en disco** |
|---|---|---|
| `correctness_model` | `SPECIFIED` | `"SPECIFIED"` |
| `work_type` | `FUNCTIONAL` | `"FUNCTIONAL"` |
| `blast_radius` | `ADJACENT` | `"ADJACENT"` |
| `failure_surfaces` | `SILENT` | `"SILENT"` |
| `external_effects` | ausente | **ausente** (la clave no existe) |

`external_effects` **no se pasó al motor en absoluto**. En `setClassification`, una opción
ausente significa «déjalo como está» (`if (!(option in opts) ...) continue`,
[`roadmap-core.mjs:1405`](tools/roadmap/roadmap-core.mjs:1405)); el run no la tenía, así que
sigue sin tenerla. No se pasó `""` ni `null`, que habrían sido «bórrala» — mismo efecto aquí,
pero distinta afirmación.

Medido en disco:
[`roadmap/roadmap.json:909-913`](roadmap/roadmap.json:909).

### B.3 — `classified_at` no se escribió: lo estampó el motor

El arnés **no pasó `now` ni ninguna forma de instante**. `setClassification` lo estampa él
mismo ([`roadmap-core.mjs:1464`](tools/roadmap/roadmap-core.mjs:1464)), y `roadmap-plan.mjs`
ni siquiera relaya la clave. Valor estampado:

**`2026-08-03T06:31:16.363Z`** — [`roadmap/roadmap.json:913`](roadmap/roadmap.json:913).

Es UTC, en la misma forma `Date#toISOString` que el resto del repo. La hora local del encargo
era 2026-08-03 00:31 (`-0600`); las dos son el mismo instante.

### B.4 — El motor no rechazó la combinación

`planEdit` devolvió `ok: true`, `stage: "ok"`, **0 errores y 0 warnings**. Las combinaciones
ilegales de §3 las cacha `checkInvariants` una etapa después
([`roadmap-plan.mjs:304`](tools/roadmap/roadmap-plan.mjs:304)), y son `SPECIFIED`+`FOUNDATIONAL`
y `FOUNDATIONAL`+`LOUD`; esta es `SPECIFIED`+`FUNCTIONAL`, y pasó.

**La parada del criterio 6 no se disparó.**

### B.5 — `severity` y `closure_mode` derivados. Reportados, no escritos

Calculados con `deriveClassification` de
[`tools/classification/classification.mjs:223`](tools/classification/classification.mjs:223)
sobre el run **ya escrito**:

| derivado | valor |
|---|---|
| `severity` | **`MAJOR`** |
| `closure_mode` | **`SEMI_ATTENDED`** |

La traza, contra las tablas del módulo:

- **`severity`** (regla `severity_from_work_type_and_blast_radius`): la tabla da
  `FUNCTIONAL` × `ADJACENT` = **`MODERATE`**; el ajuste por `failure_surfaces` es
  `SILENT: +1` y satura entre `MINOR` y `CRITICAL`; `MODERATE` + 1 = **`MAJOR`**.
  [`classification.mjs:81-96`](tools/classification/classification.mjs:81).
- **`closure_mode`** (regla `closure_mode_from_correctness_model_and_severity`): la segunda
  regla de precedencia es `SPECIFIED` con `severity ∈ {MAJOR, CRITICAL}` → **`SEMI_ATTENDED`**.
  La guarda de `external_effects` no aplica: la clave está ausente, y el módulo declara que
  ausente y `[]` son la misma respuesta.
  [`classification.mjs:107-127`](tools/classification/classification.mjs:107).

**El ticket no traía cifra esperada, así que no había nada contra qué comparar, y esta cabina
tampoco declara una: se limita a reportar lo que el código deriva.** Lo que sí se verificó es
que **no están almacenados**: `"severity" in run || "closure_mode" in run` → **`false`**.

---

## C. La reparación del texto

### C.1 — Por qué la frase era falsa

La frase decía que la medición de 17 sitios venía «del run inmediatamente anterior al de
batches». Medido en el canónico **de hoy**:

| `queue_order` | `run_id` | título |
|---|---|---|
| 45 | `RUN-CONSOLE-DEPENDS-ON-HUMAN-APPROVED-001` | A second dependency list for edges that wait on a person |
| 47 | `RUN-CONSOLE-FIELD-PLUMBING-REGISTRY-001` | **este mismo run** |
| 48 | `RUN-CONSOLE-BATCHES-001` | Batches in the roadmap schema, with the branch they determine |

El run de batches está en 48, y el inmediatamente anterior es **el 47, este mismo**. La frase
era autorreferencial y falsa **desde el instante de la inserción**. La medición pertenece al
run **45**, que es el que añadió `depends_on_human_approved`.

Comando: listado de `queue_order` 43..51 más búsqueda por título, del arnés de verificación.

### C.2 — La guarda: la frase aparece tal como el ticket la describe

El arnés exigió **exactamente una** ocurrencia del literal
`the run immediately before the batches one` en el `full_description`. Medido: **1**.

**La parada del criterio 11 no se disparó.**

### C.3 — La sustitución: identidad en vez de posición

Una única sustitución de subcadena, `String#replace` sobre la primera y única ocurrencia:

> `the run immediately before the batches one`
> → `the run titled "A second dependency list for edges that wait on a person"`

**La frase, antes:**

> MEASURED, NOT ASSUMED, and the number comes from **the run immediately before the batches
> one**: adding depends_on_human_approved cost 17 SITES across 3 code files.

**La frase, después:**

> MEASURED, NOT ASSUMED, and the number comes from **the run titled "A second dependency list
> for edges that wait on a person"**: adding depends_on_human_approved cost 17 SITES across 3
> code files.

Se nombra **por título**, que es lo que no se mueve, y no por `run_id` ni por posición. Las
comillas rectas son las que ese mismo `full_description` ya usa (`\"fields holding run
references\"`); no se introdujo un segundo estilo de comilla en el campo.

### C.4 — Que fue la ÚNICA edición de texto: la prueba, no la promesa

Dos comprobaciones independientes, y las dos pasaron:

1. **En el arnés, antes de planificar:** deshacer la sustitución tiene que devolver el
   original byte a byte.
   `fd_nuevo.replace(NUEVA, VIEJA) === fd_viejo` → **`true`**.
2. **En la verificación, contra el respaldo, sobre el fichero ya escrito:** la misma
   igualdad, releyendo ambos ficheros de disco → **`true`**.

Bytes del `full_description`: **2 292 → 2 323** (delta **+31 bytes**, exactamente la
diferencia de longitud de las dos frases). Ni una coma más.

---

## D. Verificación

Todo lo de esta sección sale de `scratchpad/verify-qo47.mjs`, que compara **el fichero
escrito contra el respaldo de A.1**, campo a campo, run a run.

### D.1 — Las 6 diferencias, y de quién son (criterio 12)

**6 diferencias de campo en total.** Todas del mismo `run_id`:

| `run_id` | `queue_order` | campo |
|---|---|---|
| `RUN-CONSOLE-FIELD-PLUMBING-REGISTRY-001` | 47 | `full_description` |
| `RUN-CONSOLE-FIELD-PLUMBING-REGISTRY-001` | 47 | `correctness_model` |
| `RUN-CONSOLE-FIELD-PLUMBING-REGISTRY-001` | 47 | `work_type` |
| `RUN-CONSOLE-FIELD-PLUMBING-REGISTRY-001` | 47 | `blast_radius` |
| `RUN-CONSOLE-FIELD-PLUMBING-REGISTRY-001` | 47 | `failure_surfaces` |
| `RUN-CONSOLE-FIELD-PLUMBING-REGISTRY-001` | 47 | `classified_at` |

Son exactamente las tres cosas que el criterio 12 autoriza: los campos de clasificación, el
`classified_at` y el `full_description`. **0 diferencias fuera de ese run.**

Además, **0 `run_id` añadidos y 0 eliminados**, y la estructura de raíz / objetivos / fases
—reduciendo cada fase a la lista de `run_id` que contiene— es **idéntica**: ni objetivos, ni
fases, ni orden dentro de las fases, ni `care_budget`, ni `lanes` cambiaron.

### D.2 — Conteo de runs tocados (criterio 13)

**1 run tocado. 55 intactos.** Verificado: **coincide** con lo declarado en el ticket.

### D.3 — Los 8 campos intocables, en los 56 runs (criterio 14)

`run_id`, `title`, `summary`, `status`, `queue_order`, `depends_on`, `objective_id`,
`phase_id`, comparados en **los 56 runs, incluido el 47**:

**0 diferencias.** El `objective_id` y el `phase_id` no son campos del run sino su posición en
el árbol, y por eso se comparan como la fase y el objetivo que **contienen** al run.

### D.4 — Los 12 clasificados anteriores (criterio 15)

Se tomó la lista de los **12** runs que tenían `classified_at` **en el respaldo**, y se
compararon sus **seis** campos de clasificación uno a uno contra el fichero escrito:

**0 derivas.** Ni un valor movido, ni un `classified_at` reestampado.

**Clasificados ahora: 13.** (12 + este.)

### D.5 — Invariantes (criterio 16)

| comprobación | resultado |
|---|---|
| `core.checkInvariants(obj, { externalRunIds: null })` | **0 errores** |
| runs | **56** |
| `queue_order` denso 1..56 | **sí** |
| aristas colgantes (`depends_on` + `depends_on_human_approved` contra los `run_id` del árbol) | **0** |

Y, aparte del criterio, una propiedad que conviene dejar dicha porque prueba que la escritura
salió del serializador canónico y no de un editor: **el fichero escrito hace round-trip byte
a byte** (`serialize(parse(raw), detectEol(raw)) === raw` → **`true`**), con `eol` = `\r\n`,
el mismo que traía.

`externalRunIds: null` — ver §E.2.

### D.6 — La suite (criterio 17)

```bash
npm test
```

**464 tests · 462 pasan · 2 fallan · 0 saltados.**

Los dos fallos son **exactamente los dos preexistentes que nombra el ticket**, por fichero y
por línea:

| test | aserción que falla |
|---|---|
| `tests/classification-care-budget.test.mjs:153` | `"care_budget" in obj` da `true` y el test espera `false` |
| `tests/roadmap-engine.test.mjs:93` | los dos canónicos reales comparten un solo EOL; el test espera 2 |

**No apareció ningún tercero.** No hubo que registrar ningún pin.

**Y ninguno de los dos lo causó esta escritura**, medido y no supuesto — se comprobó la
propiedad exacta que cada test afirma, en el respaldo **y** en el fichero escrito:

| propiedad | respaldo | escrito |
|---|---|---|
| `care_budget` en la raíz | `true` | `true` |
| EOL detectado | `\r\n` | `\r\n` |
| round-trip byte-idéntico | `true` | `true` |

El `care_budget` de raíz ya estaba antes de tocar nada, y el EOL no se movió. Los dos tests
fallan por razones ajenas a este encargo, y ninguna de las dos propiedades está entre las 6
diferencias de D.1.

---

## E. Lo que no se pudo verificar, y por qué

### E.1 — La suite completa **antes** de la escritura no se corrió

Se corrió **después**. La razón es que la suite lee el canónico en su ruta real, así que
correrla «antes» habría exigido o bien restaurar el canónico (una escritura más sobre el
fichero, que este ticket no autoriza como paso intermedio) o bien redirigir la suite a otra
ruta (cambiar el sujeto medido).

Lo que sí se hizo en su lugar está en D.6: se midió **la propiedad concreta que cada test
afirma** en el respaldo y en el escrito, y salieron iguales. Eso demuestra que los dos fallos
son anteriores. **No demuestra** que la suite completa tuviera exactamente 462/2 antes de la
escritura; eso queda declarado como no verificado.

### E.2 — `externalRunIds` se pasó como `null`

La ruta de escritura de la consola construye ese conjunto leyendo los roadmaps de **los demás
proyectos registrados** ([`serve.mjs:489`](project-console/serve.mjs:489)), y este encargo
tiene prohibido leer `aiw` y `cantu-studio`. Se pasó `null`.

Es inocuo aquí, y se midió por qué: con `null`, `checkInvariants` **pre y post** dio **0
errores** —o sea, ninguna arista de este árbol necesita resolverse contra otro proyecto—, y
el run 47 tiene `depends_on: []`. Ninguna de las dos operaciones aplicadas
(`set-classification`, `set-text`) resuelve identificadores de dependencia.

**Consecuencia declarada:** si algún día un run de este árbol dependiera de un id externo, esta
misma invocación con `null` lo rechazaría en pre-flight. Hoy no ocurre.

### E.3 — Ni la consola ni la reemisión de `.project/`

No se levantó el servidor ni se ejecutó la ruta HTTP: se llamó a **los mismos módulos** que
esa ruta llama, en la misma secuencia. Lo que no está verificado es la ruta HTTP en sí
(parseo del cuerpo, códigos de estado, el lock de escritura).

**`.project/` no se reemitió** — está fuera de alcance. Hasta que el operador reemita desde la
consola, las vistas derivadas de `.project/` **no reflejan** ni la clasificación ni la frase
reparada.

### E.4 — Nada de Git

No se ejecutó ningún comando de Git que escriba. `git status --porcelain` (lectura) salió
**vacío** antes de empezar: no había records de otros hilos sin commitear que pudieran
confundirse con lo de aquí. Tras este encargo, el árbol tiene sin commitear
`roadmap/roadmap.json` y este record, y **nada más**.

---

## F. Estado final del run, en disco

[`roadmap/roadmap.json:902-913`](roadmap/roadmap.json:902) — orden de claves tal como lo dejó
`normalizeRunKeyOrder`:

```
run_id, queue_order, title, summary, full_description, status, depends_on,
correctness_model, work_type, blast_radius, failure_surfaces, classified_at
```

| dato | valor |
|---|---|
| `run_id` | `RUN-CONSOLE-FIELD-PLUMBING-REGISTRY-001` |
| `queue_order` | 47 |
| `correctness_model` | `SPECIFIED` |
| `work_type` | `FUNCTIONAL` |
| `blast_radius` | `ADJACENT` |
| `failure_surfaces` | `SILENT` |
| `external_effects` | ausente |
| `classified_at` | `2026-08-03T06:31:16.363Z` |
| `severity` (derivada, no almacenada) | `MAJOR` |
| `closure_mode` (derivado, no almacenado) | `SEMI_ATTENDED` |

**`roadmap/roadmap.json` tras la escritura: 138 161 bytes, md5
`5d6994f6067398bab00024da6b0413c8`.**

---

## G. Paradas

Las cinco paradas del ticket —título que no coincide (2), conteos que difieren (3), run ya
clasificado (4), motor que rechaza la combinación (6), frase que no aparece (11)— **estaban
todas implementadas como `die()` en el arnés, y ninguna se disparó**. No hubo escritura
parcial, así que no hubo nada que restaurar desde el respaldo, y no quedó ninguna decisión
pendiente de la cabina.
