# UN REGISTRO PARA LA FONTANERÍA — y el chip de `closure_mode` en la fila del run

Run `RUN-CONSOLE-FIELD-PLUMBING-REGISTRY-001` (`queue_order` **47**, `O4` → `O4.P19`).

Dos alcances, ambos entregados en este run:

- **ALCANCE A** — colapsar la enumeración mecánica que cada campo opcional de run repite en
  tres archivos de código, en tres registros.
- **ALCANCE B** — pintar `closure_mode` junto a `severity` en la fila del run.

> **Alcance de escritura.** Se escribieron **5 archivos**: **3 de código**
> (`tools/roadmap/roadmap-core.mjs`, `tools/roadmap/roadmap-plan.mjs`,
> `project-console/assets/project-console.js`), **1 de test existente**
> (`tests/classification-transport-and-console.test.mjs`) y **este record**.
>
> **NO se tocó** `roadmap/roadmap.json`, **no** se re-emitió `.project/`, **no** se ejecutó
> Git en forma alguna, **no** se tocó `.gitattributes`, **no** se tocó
> `docs/project-console/` ni `console/`, y **no** se insertó, movió ni renumeró ningún run.
>
> Ruta base de todo camino relativo: `projects/aiw-console`. Toda cifra viaja con el comando
> que la produjo.

---

## BLOQUE A — La guarda de identidad, antes de tocar nada

### A.1 — PASA

Los runs no viven en un array de primer nivel: se aplanó `objectives → phases → runs`. **El
`run_id` no se tecleó: se derivó.**

```bash
node -e "const r=JSON.parse(require('fs').readFileSync('roadmap/roadmap.json','utf8'));const runs=[];for(const o of r.objectives)for(const p of o.phases)for(const x of p.runs)runs.push(x);console.log(JSON.stringify(runs.filter(x=>x.queue_order===47).map(x=>({run_id:x.run_id,title:x.title})),null,2))"
```

| Derivado | Valor |
|---|---|
| `run_id` en disco | `RUN-CONSOLE-FIELD-PLUMBING-REGISTRY-001` |
| `run_id` del ticket | `RUN-CONSOLE-FIELD-PLUMBING-REGISTRY-001` |
| `title` en disco | `One registry for the plumbing every optional run field repeats` |
| `title` del ticket | `One registry for the plumbing every optional run field repeats` |
| ubicación | `O4` → `O4.P19` |

Los dos coinciden **exactamente**. Total de runs aplanados: **56**.

### A.2 — La segunda guarda que aborta: las dos superficies comparten `v3RunRowTags` — **PASA**

Verificado **antes** de tocar el render, anclando al NOMBRE de la función y nunca a una línea:

```bash
grep -n "v3RunRowTags(model, run)" project-console/assets/project-console.js
```

| Sitio | Superficie |
|---|---|
| `project-console/assets/project-console.js:3465` | `v3RoadmapRunRow` — el **árbol del Roadmap** |
| `project-console/assets/project-console.js:4537` | la fila de la **Run Queue** (vía `v3QueueRowHtml`) |

**Dos llamadas, una función.** El alcance «1 sitio de código» es cierto, y el alcance B se
entrega en un único sitio. Queda **pinneado por test** (§E.2), no sólo comprobado aquí.

---

## BLOQUE B — Lo que había: las 17 sitios, re-medidos

**Unidad, declarada antes de las cifras.** Un **SITIO** es un lugar distinto y contiguo dentro
de un archivo donde hay que nombrar el campo (o su op) para que exista, se valide, se
transporte o se pinte. Es la misma granularidad de
`ALTA-DEPENDS-ON-HUMAN-APPROVED.md` §C.1 y de `MEDICION-PILOTO-CLASIFICACION-AIW-CONSOLE.md`
§B.4, para que las tres cifras se puedan comparar.

### B.1 — Reproducción de la medición anterior: **17 CONFIRMADO**

```bash
grep -n "depends_on_human_approved\|dependsOnHumanApproved\|set-human-deps\|setHumanApprovedDeps\|humandeps\|humanDependents\|currentHumanDeps\|v3HumanApprovalSection" tools/roadmap/roadmap-core.mjs tools/roadmap/roadmap-plan.mjs project-console/assets/project-console.js
```

Los 17 sitios, con las líneas **que tenían al empezar este run** (el record anterior los
registró con las suyas; el mapa es el mismo, las líneas se desplazaron):

| # | `archivo:línea` (antes) | Qué hace | Clase |
|---|---|---|---|
| 1 | `roadmap-core.mjs:123` | alta en `RUN_OPTIONAL_FIELDS` | declaración |
| 2 | `roadmap-core.mjs:610` | bloque de invariantes en `checkInvariants` | validación |
| 3 | `roadmap-core.mjs:982` | `removeRun`: reunir dependientes + rechazo | integridad referencial |
| 4 | `roadmap-core.mjs:1008` | `removeRun`: rama de reasignación | integridad referencial |
| 5 | `roadmap-core.mjs:1019` | `removeRun`: rama de soltar aristas | integridad referencial |
| 6 | `roadmap-core.mjs:1170` | `setHumanApprovedDeps`, la op de escritura | escritura |
| 7 | `roadmap-plan.mjs:29` | `KNOWN_OPS` | fontanería de plan |
| 8 | `roadmap-plan.mjs:92` | `case` del despachador | fontanería de plan |
| 9 | `roadmap-plan.mjs:214` | lista `batchable` | fontanería de plan |
| 10 | `project-console.js:4574` | `v3HumanApprovalSection`, la sección de lectura | **render** |
| 11 | `project-console.js:4850` | su montaje en el detalle del run | **render** |
| 12 | `project-console.js:5798` | lectura del valor actual para el editor | **render** |
| 13 | `project-console.js:5837` | bloque del editor + picker propio (`data-v3edit-op`) | **render** |
| 14 | `project-console.js:6414` | `V3_BATCHABLE_OPS` | fontanería de consola |
| 15 | `project-console.js:6476` | `v3BatchOpChanged` | fontanería de consola |
| 16 | `project-console.js:6635` | `v3EditBuildPayload` | fontanería de consola |
| 17 | `project-console.js:6865` | fila de diff de la previa (`v3EditDiffHtml`) | fontanería de consola |

**CÓDIGO: 17 sitios en 3 archivos.** La cifra de la cabina se **confirma**.

**TESTS: 1 sitio en 1 archivo existente**, `tests/roadmap-engine.test.mjs:296` — el pin literal
del vocabulario de ops. **Confirmado**, y sigue costando exactamente 1 después de este run: el
pin compara el **VALOR** de `KNOWN_OPS`, no su texto fuente, así que derivarlo no lo rompe.

---

## BLOQUE C — Lo que este run absorbe de verdad

### C.1 — La cifra: **9 de 17**, no 10

La cabina midió **10**. Lo medido es **9**, y la diferencia tiene una causa exacta, no es ruido.

| Capa | Sitios antes | Después | Absorbidos | Cómo |
|---|---:|---:|---:|---|
| Integridad referencial (`removeRun`) | 3 | **0** | **3** | `RUN_REFERENCE_FIELDS` + un bucle de reunión y otro de reescritura. El campo **ya no se nombra en `removeRun`**. |
| Fontanería de plan | 3 | **1** | **3** | `OP_DESCRIPTORS`: una fila `{name, apply, batchable, identity}`. `KNOWN_OPS`, `BATCHABLE_OPS` e `IDENTITY_OPS` se **derivan** de ella. |
| Fontanería de consola | 4 | **2** | **3** | `V3_OP_DESCRIPTORS`: una entrada `{targetKind, payload, changed, requiresBefore, diffRows\|diffHtml}`. **`V3_BATCHABLE_OPS` sobrevive** — ver C.2. |
| | **10** | **3** | **9** | |

Los tres registros **introducen 3 sitios nuevos** (una fila cada uno) donde había 9. El neto es
**−6**, y ése es el número que importa para el campo siguiente (§D).

### C.2 — El décimo sitio: por qué `V3_BATCHABLE_OPS` NO se absorbe

`tests/depends-on-human-approved.test.mjs:341` pinnea la lista **como TEXTO FUENTE**:

```js
assert.match(source, /V3_BATCHABLE_OPS = \[[^\]]*"set-human-deps"/);
```

Derivar `V3_BATCHABLE_OPS` de `V3_OP_DESCRIPTORS` **produce un tercer fallo en la suite** — el
gatillo de parada del criterio 5. Repararlo exige editar
`tests/depends-on-human-approved.test.mjs`, **un archivo fuera de la lista de alcance de este
run**. Las tres salidas eran: romper la suite, ampliar el alcance por mi cuenta, o dejar el
sitio. **Se dejó el sitio**, que es la única de las tres que entrega.

No es una pérdida silenciosa, y tiene una lectura defendible que queda escrita en el código:
`V3_BATCHABLE_OPS` es hoy la **única declaración** de batchabilidad en la consola —no está
duplicada en el registro— y la **autoridad** vive en la columna `batchable` de la tabla del
motor (`roadmap-plan.mjs`), de la que la lista de la consola es un espejo de pantalla. El
registro lo dice en su propio comentario.

### C.3 — Las tres colas de la propia consola, medidas

En la consola el descriptor colapsa **3** enumeraciones (`v3BatchOpChanged`,
`v3EditBuildPayload`, `v3EditDiffHtml`) en **1** entrada. Además, la entrada **nombra su op
UNA sola vez**: el `payload` devuelve sólo los `args` y `v3EditBuildPayload` estampa el nombre
desde la clave bajo la que está registrada, así que una entrada no puede estar archivada bajo
un nombre y enviar otro.

---

## BLOQUE D — Los dos números que este run existe para mover

### D.1 — Sitios que enumeran el NOMBRE DE UNA OP

```bash
grep -n "set-human-deps" tools/roadmap/roadmap-plan.mjs project-console/assets/project-console.js
```

| Capa | Cabina | Texto del run | **Medido antes** | **Medido después** |
|---|---:|---:|---:|---:|
| Plan (`roadmap-plan.mjs`) | 3 | 3 | **3** | **1** |
| Consola (`project-console.js`) | 5 | 4 | **5 líneas / 4 de fontanería** | **2 de fontanería** |

**LA DISCREPANCIA, que es parte de la entrega: las dos cifras son correctas, sobre preguntas
distintas.**

- El **4** del texto del run cuenta la **fontanería de ops**: `V3_BATCHABLE_OPS`,
  `v3BatchOpChanged`, `v3EditBuildPayload`, `v3EditDiffHtml`. Son exactamente los sitios 14–17
  de la tabla del §B.1.
- El **5** de la cabina es el `grep` literal del nombre de la op sobre el archivo, que atrapa
  además `data-v3edit-op="set-human-deps"` en el marcado del bloque del editor
  (`project-console.js:5837` antes → `:5853` ahora). Ése es el **sitio 13**, y el record
  anterior ya lo clasificó como **RENDER/EDITOR**: uno de los cuatro sitios que el criterio 3
  declara innegociables.

**La cabina contó un sitio de render entre los de fontanería.** No es un error de medición: es
el `grep` respondiendo a «¿dónde aparece este nombre?» en lugar de a «¿dónde lo enumera la
fontanería?». Absorberlo obligaría a tocar la capa de render, que es la condición de parada
del ticket. **Queda fuera, y la cifra buena para «fontanería de ops en la consola» es 4 → 2.**

### D.2 — Cuánto cuesta un campo opcional de run DESPUÉS del registro

**17 sitios → 11 sitios**, en los mismos 3 archivos de código, para un campo **de la misma
clase** que `depends_on_human_approved` (lista de referencias a runs, con op propia).

| # | Sitio (después) | ¿Nuevo o heredado? |
|---|---|---|
| 1 | `roadmap-core.mjs:122` — `RUN_OPTIONAL_FIELDS` | heredado, irreducible |
| 2 | `roadmap-core.mjs:640` — bloque de `checkInvariants` | heredado |
| 3 | `roadmap-core.mjs:197` — **una fila** de `RUN_REFERENCE_FIELDS` | **sustituye a 3** |
| 4 | `roadmap-core.mjs:1202` — su op de escritura | heredado |
| 5 | `roadmap-plan.mjs:71` — **una fila** de `OP_DESCRIPTORS` | **sustituye a 3** |
| 6 | `project-console.js:6522` — **una entrada** de `V3_OP_DESCRIPTORS` | **sustituye a 3** |
| 7 | `project-console.js:6430` — `V3_BATCHABLE_OPS` | heredado (§C.2) |
| 8–11 | los cuatro sitios de render | heredados, **intocables por diseño** |

**Tests: 1 sitio en 1 archivo existente**, sin cambio.

### D.3 — El caso que el run nombra explícitamente: **el tercer campo de referencias cuesta CERO ramas**

No estimado — **ejecutado**. Se copió el motor a un temporal, se le añadió un tercer campo
(`blocked_by_review_of`) con **2 ediciones** (la declaración irreducible y **una fila** del
registro), **sin tocar una sola línea de `removeRun`**, y se ejercitaron las tres conductas:

| Conducta | Resultado |
|---|---|
| Rechazo al borrar con dependientes | cuenta la arista del tercer campo, sin línea escrita para él |
| `--reassign-dependents-to` | reapunta las **tres** listas |
| `--drop-dependent-edges` | limpia las tres; `depends_on` conserva `[]` (REQUERIDO), las dos opcionales **pierden la clave** |

`RUN_REFERENCE_FIELDS` declara exactamente **una** cosa por campo además del nombre:
`absentWhenEmpty`. Es la única diferencia real entre las dos listas —`depends_on` es requerido
y su vacío es `[]`; `depends_on_human_approved` es opcional y su vacío es la ausencia de la
clave— y estaba antes repartida por cuatro ramas.

### D.4 — El ahorro es condicional a la CLASE del campo

El hallazgo transferible del record anterior se mantiene y ahora tiene su cifra de después:

| Clase de campo | Antes | Después | Qué se ahorra |
|---|---:|---:|---|
| Lista de REFERENCIAS a runs, con op propia | 17 | **11** | las 3 ramas de `removeRun`, las 3 del plan y 3 de las 4 de la consola |
| Campo con op propia que **no** guarda referencias | 14 | **10** | las 3 del plan y 3 de la consola; no paga fila de `RUN_REFERENCE_FIELDS` |
| Token de vocabulario cerrado (quinto campo de clasificación) | ~2 + render | ~2 + render | **nada nuevo**: no trae op, y la pieza compartida de clasificación ya absorbe vocabulario y derivación |

---

## BLOQUE E — Alcance B: el chip de `closure_mode`

### E.1 — Qué se hizo

`v3RunRowTags` (`project-console/assets/project-console.js:3419`) ya llamaba a
`v3DerivedClassification(run)` y **descartaba** `.closure_mode`. Ahora pinta los dos.

**Misma disciplina que `severity`, punto por punto:**

- **Derivado en lectura, NUNCA almacenado.** El chip llama a la misma función; no se escribe
  nada en ningún sitio. El test `C.3` de la suite (una escritura real por el motor) sigue
  comprobando que ningún run gana las claves `severity` ni `closure_mode`.
- **NO aparece sobre un run sin clasificar.** El chip está guardado por `if
  (derived.closure_mode)`, igual que el de severidad por `if (derived.severity)`. Un chip
  sobre un run que nadie clasificó sería una afirmación que el fichero no hace.
- **Los dos son INDEPENDIENTES**, y quedó pinneado en las dos direcciones: un run con
  `work_type` y `blast_radius` pero sin `correctness_model` muestra **sólo** severidad; un run
  con `correctness_model: JUDGED_ACCEPTS` y nada más muestra **sólo** `closure_mode` (la rama
  `JUDGED_*` de §2.2 no lee la severidad).

### E.2 — SIN CSS NUEVO, y el color queda reservado a la severidad

**No se tocó `project-console.css`.** El chip usa la regla base `.v3-severity-tag` —la misma
con la que el cajón de detalle ya pinta un `closure_mode`— y **ninguna clase `is-`**.

La decisión de omitir el modificador, y no de copiar el `is-${valor}` que usa el cajón, es
deliberada y está escrita en el código: `is-unattended` / `is-semi_attended` / `is-attended` no
tienen regla detrás, así que **hoy** pintarían idéntico, pero serían un gancho que invita a
darles color mañana. El color es la **única** señal cromática que la fila tiene, y es de la
severidad. Queda comprobado contra la hoja de estilos, no afirmado en prosa: un test lee
`project-console.css` y falla si aparece cualquier regla de closure mode.

### E.3 — Eso NO es generalizar el render

El criterio 3 se respeta al pie de la letra. Los cuatro sitios de render de
`depends_on_human_approved` (sitios 10–13) **están hoy exactamente como estaban**: nadie
renombró `depends_on`, nadie introdujo un renderizador genérico, y ninguna etiqueta de pantalla
cambió. `v3HumanApprovalSection` sigue sin poder afirmar «satisfied», y `depends_on` sigue
pudiendo. Añadir un chip a `v3RunRowTags` no toca esa frontera.

---

## BLOQUE F — El fixture de la prueba, y lo que el disco dijo del ticket

**El criterio 4 pidió verificar que el fixture «con clasificación» lleva
`correctness_model: "SPECIFIED"`. NO LO LLEVABA.** El fixture de
`F.3: the row chip carries the DERIVED severity…` era:

```js
{ run_id: "RUN-X-001", queue_order: 1, work_type: "FOUNDATIONAL", blast_radius: "SYSTEMIC", failure_surfaces: "VISIBLE" }
```

Sin `correctness_model` no hay `closure_mode` que derivar y la aserción nueva pasaría en vacío.
Se añadió, como el ticket ordena.

**Y aquí el disco corrigió al ticket, en un punto que el ticket no podía prever.**
`SPECIFIED + FOUNDATIONAL` es una de las **COMBINACIONES ILEGALES de §3**, que
`checkInvariants` rechaza por su nombre (`roadmap-core.mjs:586`):

> `illegal classification SPECIFIED + FOUNDATIONAL: foundational work cannot have its correctness fully specified up front`

Añadir `SPECIFIED` al fixture **tal como estaba** habría producido un run que **no puede existir
en disco**. Se resolvió sin renunciar a nada:

| | antes | después | por qué |
|---|---|---|---|
| `correctness_model` | *(ausente)* | `SPECIFIED` | lo que el criterio 4 pide |
| `work_type` | `FOUNDATIONAL` | `FUNCTIONAL` | para que la combinación sea **legal** |
| `blast_radius` | `SYSTEMIC` | `SYSTEMIC` | sin cambio |
| `failure_surfaces` | `VISIBLE` | `SILENT` | para conservar la severidad derivada |

`FUNCTIONAL × SYSTEMIC` da `MAJOR`, y el ajuste `SILENT` sube un escalón: la severidad derivada
**sigue siendo `CRITICAL`**. **Las tres aserciones que ya había en esa prueba están intactas** —
`is-critical`, `CRITICAL` y el texto del `title`—; ahora se alcanzan a través de un run legal.
`closure_mode` deriva a `SEMI_ATTENDED` (§2.2, regla 2 de precedencia).

### F.1 — Las aserciones añadidas

**3 pruebas nuevas** en `tests/classification-transport-and-console.test.mjs`:

1. **el chip de `closure_mode`**: aparece, dice `SEMI_ATTENDED`, declara en su `title` que es
   derivado y nunca almacenado, **lleva la clase base y nada más**, y la fila tiene 2 chips con
   la severidad conservando su color.
2. **independencia**: severidad sin closure mode, closure mode sin severidad, y un run sin
   clasificar **sin ninguno de los dos** ni ninguno de los siete tokens.
3. **sin CSS nuevo**: la hoja declara la regla base y **ninguna** de closure mode; y
   `v3RunRowTags` es llamada por las **dos** superficies (el pin del §A.2, mecanizado).

---

## BLOQUE G — La suite

### G.1 — Línea base, medida antes de tocar nada

```bash
node --test
```

| | tests | pass | fail |
|---|---:|---:|---:|
| **Línea base** | **497** | **495** | **2** |

Los dos fallos son **exactamente** los dos pines de registro declarados, **verificados uno a
uno por su mensaje**:

- `tests/roadmap-engine.test.mjs:93` — «both real roadmaps now share one EOL; the parameter is
  no longer load-bearing (**update the record, keep the test**)».
- `tests/classification-care-budget.test.mjs:153` — «this repo declares no care budget, and
  that is valid».

**No se repararon**, y no se usaron como gatillo de parada: un test cuyo propósito es
dispararse ante un cambio deliberado no puede serlo.

### G.2 — Al cierre

| | tests | pass | fail |
|---|---:|---:|---:|
| **Al cierre** | **500** | **498** | **2** |

**+3 tests** (los del alcance B). **Los 2 fallos son los mismos dos pines**, con los mismos dos
mensajes. **CERO fallos nuevos sobre la línea base.**

### G.3 — El tercer fallo que sí apareció, y cómo se resolvió

Durante el alcance A, la primera versión del registro de la consola **sí produjo un tercer
fallo**, y se resolvió reparando el CÓDIGO, no el test:

`tests/depends-on-human-approved.test.mjs:335` (`E.4`) exige que el literal
`data-v3edit-picker="deps"` aparezca en el fuente — «las dos listas no pueden leerse los chips
la una a la otra». La primera versión pasaba una **clave** (`pickerValues("deps")`) y componía
el selector dentro del ayudante, con lo que el literal desaparecía del archivo. Se cambió el
ayudante para recibir el **SELECTOR completo**, que además es lo correcto: el selector es
conocimiento de la op, no del ayudante, y así sigue siendo *greppable*. El fallo desapareció y
la suite volvió a los dos pines.

**Se reporta porque ocurrió**, no porque quedara abierto.

---

## BLOQUE H — Sitios que se dejaron a propósito, con su razón

**8 sitios de los 17.** No es un remanente: cada uno se deja por una razón distinta y escrita.

| # | Sitio | Por qué se deja |
|---|---|---|
| 1 | `RUN_OPTIONAL_FIELDS` (`roadmap-core.mjs:122`) | **Irreducible.** Algo tiene que nombrar el campo UNA vez. Ninguna generalización lo elimina; sólo lo mueve. |
| 2 | bloque de `checkInvariants` (`roadmap-core.mjs:640`) | La FORMA es tabulable —ya hay dos campos con forma «lista de run_ids»—, pero **los mensajes de error son la superficie del operador** («depends on unknown run» vs «waits on human approval of unknown run»). Una tabla necesitaría una ranura de redacción por campo: se ahorra el bucle, no el texto. **El ticket no lo pide**, y ampliarlo por mi cuenta habría sido ampliar el alcance. |
| 6 | `setHumanApprovedDeps` (`roadmap-core.mjs:1202`) | Unificarla con `setDeps` está **explícitamente fuera de alcance**: toca `depends_on` y arrastra la ventana de «tres roadmaps en reposo». **Ya hay dos runs esperando esa ventana.** |
| 14 | `V3_BATCHABLE_OPS` (`project-console.js:6430`) | Pin de **texto fuente** en `tests/depends-on-human-approved.test.mjs:341`, archivo fuera del alcance de escritura. Ver §C.2. |
| 10 | `v3HumanApprovalSection` (`project-console.js:4590`) | **RENDER — criterio 3.** La etiqueta ES la semántica. |
| 11 | su montaje en el detalle del run | **RENDER — criterio 3.** |
| 12 | lectura del valor actual para el editor | **RENDER — criterio 3.** |
| 13 | bloque del editor + picker + `data-v3edit-op` | **RENDER — criterio 3.** Es además el sitio que explica la discrepancia 5-vs-4 del §D.1. |

Sobre los cuatro de render, la razón del run, no la mía: el run que añadió
`depends_on_human_approved` **descartó renombrar `depends_on`** precisamente para que la
diferencia IA/humano viviera en la etiqueta de pantalla, y un renderizador genérico produce una
etiqueta genérica. La segunda razón, medida en ese mismo run:
`depends_on_human_approved` **nunca** puede afirmar que una arista está «satisfecha», porque
nadie almacena la aprobación humana, mientras que `depends_on` **sí** puede. **Dos campos con
la misma forma de dato y distinta verdad decible no comparten renderizador.**

---

## BLOQUE I — La condición de legibilidad del ticket

> «…o lo reduce a costa de hacer el código menos legible que la enumeración que sustituye.»

Los tres registros se juzgan contra eso, y la respuesta es que **no**, por una razón concreta
en cada capa:

- **`RUN_REFERENCE_FIELDS`.** Lo que antes estaba repartido en cuatro ramas era **una sola
  diferencia real** entre los dos campos: qué significa el vacío. Ahora esa diferencia se lee
  como un booleano con nombre (`absentWhenEmpty`) en la línea que declara el campo, y el
  algoritmo se lee una vez en lugar de dos.
- **`OP_DESCRIPTORS`.** Lo que antes obligaba a saltar entre la línea 29, la 92 y la 214 para
  saber qué es una op, ahora es una fila. Los comentarios que justificaban la batchabilidad
  —que vivían enterrados dentro del cuerpo de `batch`— se conservan **verbatim** y ahora están
  junto a la declaración que justifican.
- **`V3_OP_DESCRIPTORS`.** Lo mismo, con más distancia recorrida: las tres arms de una op
  estaban a ~400 líneas unas de otras. La entrada también **documenta como dato** una asimetría
  que antes era invisible: `requiresBefore` registra, op por op, quiénes estaban en la guarda
  escrita a mano de siete nombres — y deja constancia de que `set-human-deps`, `swap`, `remove`
  e `insert` **no** estaban en ella. **Se registró tal cual, no se ensanchó**: cambiar quién
  está dentro es un cambio de conducta y pertenece a un run que lo diga.

Ninguna cadena de texto de pantalla cambió en la absorción. La única diferencia observable es
el ORDEN de la lista en el mensaje `not a batchable op; allowed: …` del motor: `move` pasa de
la novena posición a la primera, porque la lista ahora se deriva de la tabla, que está en el
orden publicado de registro. El conjunto es idéntico y ninguna prueba fija ese texto.

---

## BLOQUE J — Trabajo que este run NO hizo y deja medido

1. **Unificar `setDeps` con `setHumanApprovedDeps`.** Fuera de alcance por el ticket. Sigue
   siendo la pieza más valiosa y la más cara; quiere la misma ventana de «tres roadmaps en
   reposo» que el rename, y **hay dos runs esperándola**.
2. **Tabular el bloque de `checkInvariants`.** Ahorraría 1 sitio de 11 y costaría una ranura de
   redacción por campo. Medido aquí, no hecho: el ticket no lo incluye entre lo que se absorbe.
3. **Absorber `V3_BATCHABLE_OPS`.** Cuesta **una** edición en
   `tests/depends-on-human-approved.test.mjs:341` (relajar un pin de texto fuente a un pin de
   valor). Es trabajo de un run que tenga ese archivo en su alcance; llevaría el coste del
   campo siguiente de **11 a 10**.
4. **El chip de `closure_mode` en el emisor.** No se tocó: el emisor transporta el árbol
   verbatim y no pinta filas. No hay nada que hacer allí.
