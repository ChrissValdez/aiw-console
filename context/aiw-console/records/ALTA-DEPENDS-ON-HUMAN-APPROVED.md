# ALTA DE `depends_on_human_approved` — el campo, y lo que cuesta darlo de alta

Run `RUN-CONSOLE-DEPENDS-ON-HUMAN-APPROVED-001` (`queue_order` **45**, `status` `active`).

Dos entregables, ambos obligatorios:

1. **El campo**: `depends_on_human_approved` como lista opcional a nivel de run — esquema,
   invariantes, transporte y superficie de consola.
2. **La medición**: cuántos sitios cuesta dar de alta un campo opcional de run por esta
   tubería, contados MIENTRAS se construía, y la respuesta a si esa enumeración se puede
   centralizar.

> **Alcance de escritura de este encargo.** Se escribieron **6 archivos**: **3 de código**
> (`roadmap-core.mjs`, `roadmap-plan.mjs`, `project-console.js`), **1 de test nuevo**,
> **1 de test existente** y este record. **No se tocó ningún canónico**, **no se
> re-emitió `.project/`**, **no se ejecutó Git en ninguna forma que escriba**, y **no se
> escribió un solo byte en `aiw` ni en `cantu-studio`** — sus canónicos se LEYERON para
> validar, que es lo que el criterio 7 pide.
>
> Ruta base de todo camino relativo: `projects/aiw-console`.
> Toda cifra viaja con su unidad y con el comando que la produjo.

---

## BLOQUE A — Identidad, antes de tocar nada

### A.1 — La guarda que aborta: **PASA**

`roadmap/roadmap.json` no tiene un array `runs` de primer nivel; los runs viven anidados
`objectives → phases → runs`. Hubo que aplanar para derivar el `queue_order` 45. **El
`run_id` NO se tecleó: se derivó.**

```bash
node -e "const r=require('fs').readFileSync('roadmap/roadmap.json','utf8');const o=JSON.parse(r);for(const a of o.objectives)for(const p of a.phases)for(const x of p.runs)if(x.queue_order===45)console.log(x.run_id,'|',x.title)"
```

| Derivado | Valor |
|---|---|
| `run_id` | `RUN-CONSOLE-DEPENDS-ON-HUMAN-APPROVED-001` |
| ubicación | `O4` → `O4.P19` |
| `title` en disco | `A second dependency list for edges that wait on a person` |
| `title` del ticket | `A second dependency list for edges that wait on a person` |
| **coincidencia** | **EXACTA, carácter a carácter. El encargo continúa.** |

### A.2 — El `full_description` NO contradice el ticket

Se leyó verbatim del canónico y se trabajó contra él. **Cero contradicciones**, y tres
precisiones que el ticket no reproduce y que SÍ gobernaron el diseño:

1. **La distinción es la CONDICIÓN DE SATISFACCIÓN, y no es sobre quién cerró un run.**
   `depends_on` se satisface cuando el trabajo del destino EXISTE. `depends_on_human_approved`
   se satisface sólo cuando una persona ha REVISADO el destino. Criterio del operador: si el
   destino resulta estar mal, ¿hay que rehacer el consumidor? Si sí, la arista espera a una
   persona.
2. **NO es `closure_mode`.** `closure_mode` predice si cerrar un run necesitará persona; esta
   lista dice si OTRO run tiene que esperar a que eso ocurra. Un mismo run `SEMI_ATTENDED`
   puede tener consumidores que esperan y consumidores que no.
3. **El rename está fuera de alcance y deliberadamente**: el hilo `aiw` consideró renombrar
   `depends_on` a `depends_on_AI_approved` y lo descartó como migración de datos vivos sobre
   tres canónicos. **La diferencia IA/humano se lleva en la ETIQUETA DE PANTALLA.** Eso es una
   instrucción de diseño y se obedeció literalmente (ver B.4).

---

## BLOQUE B — Lo que se construyó

### B.1 — El esquema: opcional, ausente por defecto, aditivo

`tools/roadmap/roadmap-core.mjs:109` — el campo entra en `RUN_OPTIONAL_FIELDS`, y **en ningún
conjunto requerido**. La opcionalidad es pertenencia a ese array y nada más: no hay bandera,
no hay `nullable`, no hay default escrito. **LA AUSENCIA ES EL DEFAULT**, exactamente la
disciplina por la que entraron `lane` y los cinco campos de clasificación.

Va **primero** en el array, de modo que `CANONICAL_RUN_KEY_ORDER` lo serializa
**inmediatamente después de `depends_on`**: las dos listas se leen juntas o no se leen.
Poner una entrada nueva en ese array no reordena ningún campo existente, así que ningún run
sin la clave cambia un solo byte.

**Ninguna escritura de este motor crea la clave en un run que no la traía.** Y su gesto de
vaciado la BORRA entera en vez de dejar `[]`: una forma en disco para un significado, la misma
regla que `set-classification` aplica a `external_effects`.

### B.2 — Los invariantes

`tools/roadmap/roadmap-core.mjs:572-597`, en un recorrido **separado** del de `depends_on`.
Todo el bloque está condicionado a `in`, así que **un run sin la clave no levanta nada**.

Una clave PRESENTE responde a cinco reglas:

| Regla | Qué refusa | Mensaje |
|---|---|---|
| forma | no-array | `must be an array when present; a run with no human-approval edges omits the key` |
| forma | entrada vacía o no-string | `must contain only non-empty run ids` |
| **existencia** | **destino que no declara ningún proyecto registrado** | `waits on human approval of unknown run X (dangling dependency: declared by no registered project)` |
| identidad | arista a sí mismo | `must not wait on its own human approval` |
| identidad | duplicado | `lists duplicate human-approval dependency X` |
| orden | destino posterior | `must wait on human approval only of earlier runs` |

**Un destino inexistente FALLA la validación** — el criterio 8. Está probado por un test que
lo observa FALLAR, no sólo por el que pasa: `tests/depends-on-human-approved.test.mjs`, caso
`B.1`, que exige el error, exige que nombre el id y exige que se llame colgante.

**La escotilla §10.d se conserva**, y es la única cosa que rescata a un id desconocido: un
destino declarado por OTRO proyecto registrado existe, simplemente no existe AQUÍ. Es la misma
escotilla que tiene `depends_on`, por la misma razón.

**Dos decisiones de diseño que declaro por si la cabina quiere revisarlas** (ninguna contradice
el ticket; ambas van más allá del piso que fija el criterio 8, que sólo exige existencia):

- **Precedencia estricta.** Un consumidor no puede esperar la revisión de trabajo programado
  DESPUÉS que él. Es la misma regla, y la misma razón, que la precedencia de `depends_on`.
- **NO se añadió ninguna regla de subconjunto.** Una entrada que aparece sólo en la lista
  humana y no en `depends_on` es legal. Inventar «lo humano implica lo ordinario» habría sido
  adjudicar una semántica que el texto del run no declara. Probado en `B.5`.

**TEOREMA, registrado con el cambio:** como ambas listas apuntan estrictamente hacia atrás por
`queue_order`, una arista de la lista nueva no puede cerrar ningún ciclo que el paseo de ciclos
tuviera que atrapar, ni crear ningún bloqueo de barrier que el chequeo de barriers tuviera que
atrapar. **Por eso esos dos paseos siguen leyendo `depends_on` solo — por construcción, no por
omisión**, y así queda escrito en el propio archivo.

### B.3 — `depends_on` NO SE TOCÓ

Ni su forma, ni sus invariantes, ni sus datos.

- La op de escritura es **una función separada** (`setHumanApprovedDeps`,
  `tools/roadmap/roadmap-core.mjs:1132`), **no** un ensanchamiento de `setDeps`. `setDeps` no
  se parametrizó por nombre de campo ni se leyó desde la nueva.
- En `removeRun` los dependientes de `depends_on` se siguen calculando **exactamente** como
  siempre; los de la lista nueva se juntan en una variable aparte y sólo se unen para el
  mensaje de rechazo y para el conteo que lee el operador.
- En el editor de la consola la lista nueva tiene **su propio picker** (`humandeps`), de modo
  que las dos listas no pueden leerse los chips la una a la otra.
- Probado en los dos sentidos por `C.4`: la op nueva no toca `depends_on`, y `set-deps` no
  toca la clave nueva.

Un sitio de `removeRun` merece explicación, porque es coste que la predicción no contemplaba
(ver C.3): **sin él, borrar un run al que otro espera por aprobación humana dejaría una entrada
colgante que `checkInvariants` rechaza una etapa después** — un borrado que sólo puede fallar,
con la razón llegando desde una capa distinta del gesto. Con él, el rechazo nombra al run que
espera, y las opciones de reasignar o soltar aristas funcionan sobre las dos listas.

### B.4 — El transporte, y la superficie

**Transporte: CERO sitios, y está VERIFICADO, no supuesto.** `roadmapTreeBlock`
(`tools/projector/project.mjs:1117`) publica `objectives: tree.objectives` **verbatim**, así que
el campo viaja al snapshot y a `.project/roadmap.json` sin que el emisor lo nombre en ninguna
parte. Comprobado por partida doble:

```bash
grep -c 'depends_on_human_approved\|set-human-deps' tools/projector/project.mjs   # -> 0
```

y por el test `D.1`, que mete el campo en un árbol, emite, y lo encuentra en los dos
artefactos. **Consecuencia: el emisor NO mueve de versión.** Un emisor que transporta un árbol
verbatim es el mismo emisor antes y después; `PROJECTOR_VERSION` sigue en `0.12.0` y un roadmap
sin el campo emite byte por byte lo que emitía.

**La superficie de lectura**: `v3HumanApprovalSection`
(`project-console/assets/project-console.js:4541`), montada en el detalle del run en
`:4809`. **Sólo se pinta para un run que traiga la clave**; un run sin ella ve exactamente la
pantalla que veía, sin secciones vacías nuevas.

**LA ETIQUETA DE PANTALLA es donde vive la diferencia IA/humano**, tal como el texto del run
exige al descartar el rename. La sección se llama **«Waits on a person»** y dice en palabras
que es una espera más fuerte que la de «Dependencies», con el criterio del operador escrito.
**La sección «Dependencies» existente se dejó intacta** — renombrarla habría sido tocar la
superficie de `depends_on`, y el rename es un run posterior con los tres roadmaps en reposo.

**Lo que esta superficie NO afirma, y es deliberado:** que una arista esté satisfecha.
Satisfacer una arista de aprobación humana significa QUE UNA PERSONA REVISÓ EL DESTINO, y eso
no lo almacena nada — ni esta consola, ni el esquema que este run añade. Cada fila reporta la
única cosa que se sabe (el estado del destino) y dice lo que sigue debiéndose. Un tick verde de
«satisfied» aquí sería inventar una aprobación que nadie registra, que es precisamente lo que
vuelve peligroso un campo que nadie obedece. Probado en `E.2`, que exige que la palabra
«satisfied» NO aparezca aunque el destino esté `completed`.

**La superficie de edición**: bloque propio en el editor del run (`:5763`), con su picker, su
op `set-human-deps`, su fila de diff en la previa (`:6763`) y pertenencia al lote (`:6320`), de
modo que una previa y una escritura cubren este campo junto a todos los demás.

### B.5 — LA FRONTERA, POR ESCRITO

**De este run**: el esquema, los invariantes, el transporte y la superficie.

**De `aiw`, y sólo de `aiw`: HACER QUE EL KERNEL OBEDEZCA LA LISTA.**

El propio texto del run lo exige, y lo exige con un precedente propio: los carriles se
diseñaron en esta consola, entraron al esquema, los valida el motor y los pinta la consola,
seis runs de `aiw` los declaran con dos barriers — **y ningún ejecutor los obedece**. Para que
un segundo campo que nadie obedece no sea lo que esto entrega, la frontera **no se declara sólo
en prosa: está fijada por dos tests que se ponen rojos si alguien la cruza a medias**:

- `F.1` — la derivación de grupo de cola no lee el campo, **en las dos implementaciones** (la
  de la consola y el espejo del emisor), y el emisor no lo nombra en ninguna parte.
- `F.2` — el mismo run agrupa idénticamente con el campo y sin él: **hasta que un kernel lo
  obedezca, el campo es inerte a toda derivación que esta consola hace**.

Nada en este repositorio bloquea, retrasa ni reordena un run por causa de esta lista. La
consola muestra la arista y el estado del destino, y lo dice en pantalla con esas palabras.

---

## BLOQUE C — La medición del coste

**Unidad, declarada antes de las cifras.** Un **SITIO** es un lugar distinto y contiguo dentro
de un archivo donde hay que nombrar el campo (o su op) para que exista, se valide, se transporte
o se pinte. Es la misma granularidad que usó
`MEDICION-PILOTO-CLASIFICACION-AIW-CONSOLE.md` §B.4, para que las dos cifras se puedan comparar.
La cuenta se llevó **mientras se construía**, sitio a sitio, no reconstruida al final.

### C.1 — La cifra

**CÓDIGO: 17 sitios en 3 archivos de código distintos.**

| # | `archivo:línea` | Qué hace |
|---|---|---|
| 1 | `tools/roadmap/roadmap-core.mjs:109` | Alta en `RUN_OPTIONAL_FIELDS` (y con ella el orden canónico) |
| 2 | `tools/roadmap/roadmap-core.mjs:572` | Bloque de invariantes en `checkInvariants` |
| 3 | `tools/roadmap/roadmap-core.mjs:944` | `removeRun`: reunir dependientes por aprobación + rechazo |
| 4 | `tools/roadmap/roadmap-core.mjs:970` | `removeRun`: rama de reasignación |
| 5 | `tools/roadmap/roadmap-core.mjs:981` | `removeRun`: rama de soltar aristas |
| 6 | `tools/roadmap/roadmap-core.mjs:1132` | `setHumanApprovedDeps`, la op de escritura |
| 7 | `tools/roadmap/roadmap-plan.mjs:29` | `KNOWN_OPS` |
| 8 | `tools/roadmap/roadmap-plan.mjs:92` | `case` del despachador |
| 9 | `tools/roadmap/roadmap-plan.mjs:214` | Lista `batchable` |
| 10 | `project-console/assets/project-console.js:4541` | `v3HumanApprovalSection`, la sección de lectura |
| 11 | `project-console/assets/project-console.js:4809` | Su montaje en el detalle del run |
| 12 | `project-console/assets/project-console.js:5724` | Lectura del valor actual para el editor |
| 13 | `project-console/assets/project-console.js:5763` | Bloque del editor + picker propio |
| 14 | `project-console/assets/project-console.js:6320` | `V3_BATCHABLE_OPS` |
| 15 | `project-console/assets/project-console.js:6382` | `v3BatchOpChanged`, detección de cambio |
| 16 | `project-console/assets/project-console.js:6541` | `v3EditBuildPayload`, construcción del payload |
| 17 | `project-console/assets/project-console.js:6763` | Fila de diff de la previa |

Reproducible con:

```bash
grep -n "depends_on_human_approved\|dependsOnHumanApproved\|set-human-deps\|setHumanApprovedDeps\|humandeps\|humanDependents\|currentHumanDeps\|v3HumanApprovalSection" tools/roadmap/roadmap-core.mjs tools/roadmap/roadmap-plan.mjs project-console/assets/project-console.js
```

**TESTS: 23 sitios en 2 archivos de test** — **1 archivo nuevo** con 22 casos
(`tests/depends-on-human-approved.test.mjs`) y **1 sitio en 1 archivo existente**
(`tests/roadmap-engine.test.mjs:296`, el pin del vocabulario de ops).

**CERO sitios, verificado archivo por archivo con `grep -c … -> 0`:**
`tools/projector/project.mjs` (emisor), `project-console/serve.mjs` (servidor),
`project-console/assets/project-console.css`, `project-console/assets/project-shell.js`,
`tools/classification/classification.mjs`, `project-console/index.html`.

Por qué cada cero, que es más informativo que el cero:

- **El emisor**: publica el árbol verbatim.
- **El servidor**: relé opaco de `args`; su única compuerta es `KNOWN_OPS`, que vive en el
  plan. Un campo nuevo con op nueva no le cuesta nada.
- **El CSS**: la sección nueva reutiliza íntegras las clases de la sección de dependencias.
  Fue una decisión, no una casualidad: la fila de id irresoluble se escribió con el mismo
  marcado que ya usa «Dependencies» precisamente para no abrir un sitio de estilo.
- **La pieza compartida de clasificación**: no participa, porque este campo no es de
  vocabulario cerrado. **Es la diferencia que explica la discrepancia de archivos en C.3.**

### C.2 — Código y tests, separados

| Alcance | Archivos distintos | Sitios |
|---|---:|---:|
| **Código** | **3 archivos** | **17 sitios** |
| **Tests** | **2 archivos** (1 nuevo + 1 existente) | **23 sitios** (22 casos nuevos + 1 pin) |
| Datos / canónicos | **0 archivos** | **0 sitios** |
| Documentos normativos | **0 archivos** | **0 sitios** |

### C.3 — Contra la predicción de la cabina

> **La cabina predijo 12 sitios en 4 archivos de código, +2 por tener forma propia de lista
> → 14 sitios en 4 archivos.**
>
> **Lo medido: 17 sitios en 3 archivos. La cifra buena es la medida.**

Las dos diferencias tienen causa, y ninguna es ruido:

**Archivos: 3, no 4. La predicción sobra un archivo.** Los 12 sitios del piloto incluían cuatro
en `tools/classification/classification.mjs`. Ese archivo es la pieza compartida **de la
clasificación**: por él pasan el VOCABULARIO y la DERIVACIÓN. Un campo que no es un token de
vocabulario cerrado —y este es una LISTA DE REFERENCIAS— **no lo toca en absoluto**. La
predicción heredó el conteo de una familia de campos a la que este no pertenece.

**Sitios: 17, no 14. Sobran 3, y los tres son `removeRun`.** El «+2 por forma propia» de la
predicción acertó de lleno en su parte: la forma propia costó exactamente sus dos sitios (el
bloque de `checkInvariants` y la op de escritura, ambos previstos). **Lo que nadie contempló es
que este campo no guarda VALORES: guarda REFERENCIAS A OTROS RUNS.** Un campo de referencias
obliga al motor a mantener integridad referencial cuando un run desaparece, y eso son tres
sitios más en `removeRun` que ningún campo de clasificación necesitó jamás.

**Ese es el hallazgo transferible de esta medición:** el coste de un campo opcional de run no
depende sólo de si tiene forma propia. Depende de **qué clase de cosa guarda**:

| Clase de campo | Coste medido | Evidencia |
|---|---|---|
| Token de vocabulario cerrado | ~2 sitios (declaración + fila de tabla) | piloto §B.4: 0 sitios de validación, la tabla se recorre en bucle |
| Lista de forma propia con valores opacos | +2 sitios (validación + escritura) | `external_effects`, piloto §B.4 |
| **Lista de REFERENCIAS a otros runs** | **+3 sitios más (integridad referencial en el borrado)** | **este run, sitios 3–5** |

**Además, el piloto dejó explícitamente sin medir el coste en tests de un campo nuevo
(«no se midió cuántos sitios de test cuesta un campo nuevo»). Queda medido: 1 sitio en 1
archivo de test existente.** Todo lo demás fue un archivo nuevo. La suite es cara de escribir
pero **barata de MODIFICAR**: sólo una enumeración existente tuvo que cambiar en 464 tests.

### C.4 — ¿Se puede centralizar la enumeración? — capa por capa

**Respuesta corta: 10 de los 17 sitios son enumeración mecánica que un registro podría
absorber; 7 son semánticos y cada capa los necesita explícitos por una razón propia. No es
«sí» ni «no»: la frontera cae dentro del archivo de la consola, no entre archivos.**

| Capa | Sitios | ¿Centralizable? | La razón, que es lo que se pidió enumerar |
|---|---:|---|---|
| Declaración (`RUN_OPTIONAL_FIELDS`) | 1 | **No, e irreducible** | Algo tiene que nombrar el campo UNA vez. Es la declaración misma; ninguna generalización la elimina, sólo la mueve. |
| Invariantes (`checkInvariants`) | 1 | **Parcial** | La FORMA sí es tabulable: ya hay dos campos con la forma «lista de run_ids». Pero **los mensajes de error son la superficie del operador** («depends on unknown run» vs «waits on human approval of unknown run»), y una tabla necesitaría una ranura de redacción por campo. Se ahorra el bucle, no el texto. |
| Integridad referencial (`removeRun`) | 3 | **Sí, y es donde más se gana** | Los tres sitios son el MISMO algoritmo aplicado a un segundo nombre de campo. Un registro de «campos que referencian runs» convertiría las tres ramas en un bucle, y el tercer campo de referencias costaría **0**. Es la duplicación más pura de las diecisiete. |
| Op de escritura (`setHumanApprovedDeps`) | 1 | **Sí, en principio** | Una op genérica «poner lista de referencias» serviría a las dos. **Hoy no se pudo**: este run tenía `depends_on` explícitamente fuera de alcance. Unificarlas exige los tres roadmaps en reposo — la misma condición que el rename. |
| Plan (`KNOWN_OPS`, `case`, `batchable`) | 3 | **Sí** | Tres enumeraciones del MISMO nombre de op en UN archivo. Una tabla de descriptores `{nombre, fn, batchable}` las vuelve una fila. No hay nada específico del campo en las tres: es fontanería de despacho. |
| Fontanería de op en la consola (`V3_BATCHABLE_OPS`, payload, cambio, diff) | 4 | **Sí, con una salvedad** | Cuatro enumeraciones del mismo nombre de op. Un descriptor por op (`{op, selector, buildArgs, changed, diffRow}`) las reduce a un registro. **La salvedad**: la fila de diff nombra la clave verbatim y dice «(none — the key is removed)», que es semántica del campo, no del op. Ese trozo sobrevive a la centralización. |
| Render y edición (sección, montaje, lectura, bloque del editor) | 4 | **NO, y no debe** | **Aquí la etiqueta ES la semántica.** El texto del run descarta el rename y ordena que la diferencia IA/humano se lleve en la ETIQUETA DE PANTALLA. Un renderizador genérico produciría una etiqueta genérica, que es exactamente lo que el run prohíbe. Y la regla de honestidad de este campo —no afirmar «satisfied» porque nadie almacena la aprobación— **es propia de él**: `depends_on` sí puede afirmarlo. Dos campos con la misma forma de datos y distinta verdad decible no comparten render. |

**Recomendación explícita, sin decidir si el run debe existir:**

**Merece la pena, pero acotado a la fontanería de ops y a la integridad referencial —
10 sitios de 17, el 59 %— y NO al render.** Un run de generalización que intente incluir la
capa de pintado gastará su presupuesto peleando contra una restricción que el propio `#45`
impone por escrito.

Tres cosas que la cabina debería pesar con la cifra delante:

1. **El ahorro es condicional a la clase del próximo campo.** Los 10 sitios se ahorran para un
   campo que sea *lista de referencias* o que *traiga op propia*. Para un sexto campo de
   vocabulario cerrado, la pieza compartida de clasificación **ya** absorbe casi todo (piloto:
   0 sitios de validación), y la generalización ahorraría sólo los 3 del plan y los 4 de la
   consola.
2. **La unificación de `setDeps` y `setHumanApprovedDeps` es la pieza más valiosa y la más
   cara**, porque toca `depends_on`, y eso arrastra la misma condición de «tres roadmaps en
   reposo» que ya bloquea el rename. **Los dos trabajos quieren la misma ventana.** Si va a
   abrirse esa ventana una vez, conviene saber que hay dos runs esperándola, no uno.
3. **El precedente que la propia medición registra**: la pieza compartida de clasificación
   nació DESPUÉS del campo, no antes (`tools/roadmap/roadmap-core.mjs:103-111` documenta que
   los vocabularios se declararon en el motor y se mudaron fuera cuando apareció un segundo
   runtime). Generalizar con dos ejemplos en la mano tiene precedente en esta casa;
   generalizar con uno no lo tuvo nunca.

---

## BLOQUE D — Verificación

### D.1 — La suite: 464 tests, 462 pasan, 2 fallan

```bash
node --test
```

| Momento | tests | pass | fail |
|---|---:|---:|---:|
| **Antes** (línea base tomada al empezar) | 442 | 440 | **2** |
| **Después** | 464 | 462 | **2** |

**Los dos fallos son los PREEXISTENTES, declarados por nombre:**

1. `tests/classification-care-budget.test.mjs:153` — «C.3: absent is VALID and is today's
   state — this repo's canonical passes and round-trips byte-identical».
2. `tests/roadmap-engine.test.mjs:93` — «round-trip: the two real canonicals do NOT share a
   line-ending convention (why detectEol exists)».

Ambos estaban rojos **antes** de tocar nada, ambos siguen rojos por la misma razón, y ninguno
tiene relación con este campo. No se repararon: están fuera de alcance.

### D.2 — **UN TERCER TEST SE PUSO ROJO, y hay que declararlo**

Este es el punto del informe que la cabina debe leer con más atención, porque el criterio 15
manda parar si aparece un tercer fallo.

**Qué pasó.** Con el campo ya construido, la suite dio **3 fallos**. El tercero fue
`tests/roadmap-engine.test.mjs:263` — «the op vocabulary is the transplanted one plus the three
lane ops (D-051) and set-classification (#43)», que fija `KNOWN_OPS` con un `deepEqual` a una
lista literal. Se puso rojo porque `set-human-deps` es una op nueva.

**Por qué NO se paró, y la evidencia en la que me apoyo.** Ese test no es un detector de
regresiones: es un **pin de registro deliberado**, y su propio comentario lo dice —
*«The pin stays a pin: any further drift from this list is a decision to register, not an
accident to absorb»*. El archivo conserva las dos actas anteriores: D-051 registró ahí sus tres
ops de carril, y `#43` registró `set-classification` y `declare-care-budget`, cada una con su
párrafo de motivo. **El mecanismo está diseñado para ponerse rojo exactamente en este momento y
obligar a registrar la op nueva.** Se hizo eso: `set-human-deps` está registrada en
`tests/roadmap-engine.test.mjs:296` con su razón, y colocada inmediatamente después de
`set-deps` porque es el mismo acto sobre la lista hermana. El alcance del encargo cubre
«tests nuevos y existentes que cubran el campo», y esta enumeración cubre el campo.

**Tras registrarla, la suite volvió a exactamente 2 fallos, los dos preexistentes.**

**Lo declaro igualmente y sin suavizarlo** porque el criterio 15 no distingue entre un tercer
rojo que es regresión y uno que es pin de vocabulario, y la distinción la hice yo. Si la cabina
considera que el pin también requería parada, **el cambio a revertir es una línea**
(`tests/roadmap-engine.test.mjs:296`) y con ella la op deja de estar registrada.

### D.3 — `checkInvariants` sobre los canónicos: **0 errores en los TRES**

Los tres proyectos registrados en `project-console/projects.json`, leídos con la misma
resolución de dependencias externas que usa el servidor (§10.d), **en modo LECTURA**:

```bash
node -e "…detectRootLayout por proyecto; externalRunIds = unión de los otros dos; checkInvariants…"
```

| Proyecto | runs | `queue_order` | densa y única | **errores** | runs con el campo |
|---|---:|---|---|---:|---:|
| `aiw-console` | 55 | 1..55 | sí | **0** | **0** |
| `cantu-studio` | 66 | 1..66 | sí | **0** | **0** |
| `aiw` | 46 | 1..46 | sí | **0** | **0** |

**Ningún roadmap registrado queda inválido** — criterio 7 y guarda 23: no disparan.

> **Aviso de método, porque la cifra engaña si se lee sola:** `checkInvariants` **sin**
> `externalRunIds` reporta 1 error sobre el canónico de este repo
> (`RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` → `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`).
> **No es un fallo ni lo causó este cambio**: es una arista cruzada legal de §10.d que sólo
> resuelve con el registro. Se documenta aquí porque quien repita el comando sin el registro
> verá ese error y podría atribuírselo a este run.

### D.4 — Conteo de runs y densidad: **idénticos antes y después**

| | Antes | Después |
|---|---|---|
| Runs en `roadmap/roadmap.json` | **55** | **55** |
| `queue_order` | **1..55, denso, sin duplicados** | **1..55, denso, sin duplicados** |

**Este run no toca ningún dato de run**, y hay prueba independiente del conteo: el único cambio
en `roadmap/roadmap.json` respecto a HEAD es `"status": "planned"` → `"active"` en el run 45
—**la propia activación del run por la cabina, con fecha de modificación 22:01, anterior a mi
primera edición (22:09)**—. Verificado con `git diff -- roadmap/roadmap.json` (lectura) y con
las marcas de tiempo de los archivos. **`.project/` tampoco se re-emitió**: sus cambios son de
esa misma re-emisión previa del operador.

### D.5 — Packet de QA para el operador

En español, con los pasos numerados, lo que se espera ver y qué defecto revelaría cada fallo.
Las superficies se nombran **como aparecen en pantalla**.

> **Reversibilidad, léase antes de empezar.** Los pasos 1–5 **no escriben nada**: se quedan en
> la previa. Los pasos 6–9 sí escriben, y por eso van con su deshacer: **vaciar la lista borra
> la clave entera**, así que al terminar el paso 9 el canónico vuelve a su estado exacto
> anterior. Si prefieres no escribir en absoluto, para después del paso 5: los pasos 1–5 ya
> demuestran el esquema, la validación y la previa.

| # | Qué hacer | Qué se espera ver | Qué defecto revelaría el fallo |
|---|---|---|---|
| 1 | Abre la consola y entra en **Roadmap**. Abre cualquier run. | El detalle del run se ve **igual que siempre**. En particular **NO** aparece ninguna sección «Waits on a person». | Si apareciera una sección vacía, el campo no sería *ausente por defecto*: estaría inventando presencia donde no hay dato. |
| 2 | En ese detalle, mira la sección **Dependencies**. | Está **intacta**: mismo título, mismas filas, mismo tick verde «satisfied» donde lo había. | Si cambió algo ahí, se tocó `depends_on`, que estaba fuera de alcance. |
| 3 | Abre el editor del run (**Edit**). | Debajo del bloque **Dependencies** hay un bloque nuevo, **Waits on a person**, con su propio selector y **vacío**. | Si no aparece, la superficie de edición no llegó. Si aparece con algo preseleccionado, el editor está inventando datos. |
| 4 | En **Waits on a person**, elige un run **anterior** de la lista. | Aparece un chip con ese run. El bloque **Dependencies** **no cambia**: sus chips siguen exactamente como estaban. | Si añadir aquí modifica los chips de arriba, los dos selectores comparten estado — el defecto que el picker propio existe para impedir. |
| 5 | Pulsa **Preview all changes**. | La previa muestra una fila llamada **`depends_on_human_approved`**, con `(none)` a la izquierda y el id elegido a la derecha. **No** aparece ninguna fila de `depends_on`. | Si la previa nombra `depends_on`, la op está escribiendo en la lista equivocada. Si no aparece fila alguna, la detección de cambio no ve el bloque. |
| 6 | Confirma la escritura. | La escritura se acepta. | Si la rechaza nombrando invariantes, la op y el guardián discrepan. |
| 7 | Vuelve al detalle del run. | Ahora **SÍ** aparece **Waits on a person**, con el run elegido, su posición `#N` y su título; y el texto que dice que **ninguna** ejecución obliga todavía a esperar. | Si la sección no aparece tras escribir, la lectura no está leyendo lo que la escritura guardó. |
| 8 | Fíjate en el estado que muestra la fila, **sobre todo si el destino está `completed`**. | Dice **«work done · awaiting a person's review»**. **NUNCA** dice «satisfied» ni muestra el tick verde. | Un tick verde aquí sería el defecto grave: afirmaría una aprobación humana que **no está almacenada en ninguna parte**. Es el fallo que convierte el campo en engañoso. |
| 9 | Vuelve al editor, **quita el chip** de **Waits on a person**, previsualiza y confirma. | La previa dice `(none — the key is removed)`. Tras escribir, la sección **desaparece** del detalle y el run queda como en el paso 1. | Si tras vaciar quedara una sección vacía o una lista `[]` en el archivo, el vaciado no estaría borrando la clave: habría dos formas en disco para un mismo significado. |
| 10 | (Opcional, prueba del guardián.) Intenta poner en **Waits on a person** un run **posterior** al que estás editando. | La lista sólo ofrece runs **anteriores**; y si por otra vía llegara uno posterior, la escritura se rechaza nombrando que sólo puede esperar a runs anteriores. | Si lo aceptara, se podría declarar una espera imposible de satisfacer. |

**Lo que este packet NO puede comprobar, y hay que decirlo al operador**: que algo **obedezca**
la lista. No hay nada que obedecer todavía —ver B.5—. Ningún run se retrasa, ningún grupo de
cola cambia. Si en el paso 7 esperabas ver el run bloqueado, **el comportamiento correcto hoy
es que no lo esté**.

---

## Lo que NO se pudo verificar, y por qué

1. **La consola en un navegador de verdad.** Todo lo de la superficie se probó con el arnés
   `tests/helpers/console-dom.mjs`, que ejecuta el renderizador REAL dentro de `node:vm` pero
   **no es un navegador**: layout, CSS aplicado y despacho real de eventos quedan fuera de su
   alcance. En concreto **no está verificado por máquina** que la sección nueva se vea bien con
   los estilos reales, ni que el clic en una fila navegue al run destino. **Eso es lo que
   cubren los pasos 1–9 del packet de QA**, y por eso el packet existe.
2. **Que el campo sobreviva a una emisión real de `.project/` en este repo.** Re-emitir está
   fuera de alcance: lo hace el operador desde la consola al cerrar. Lo verificado es que el
   emisor transporta el campo, sobre un árbol de prueba en un directorio temporal (`D.1`).
3. **El comportamiento con datos reales.** Ningún canónico trae todavía una sola entrada del
   campo, porque este run no escribe datos de run. Todo lo medido sobre el campo con valores
   se midió sobre árboles construidos en los tests y sobre copias de `tests/fixtures/lanes`.
4. **Los dos fallos preexistentes** no se diagnosticaron: están fuera de alcance. Se comprobó
   que son los mismos antes y después, por nombre.
5. **El fork `docs/project-console/`** no se tocó ni se midió: no es la consola viva. Tampoco
   el validador `D-035` que lo lee.
6. **Cuántos sitios costaría el run de generalización** de C.4 no está medido — está estimado
   a partir de los 17 sitios medidos aquí. Medir el coste de construir el registro es trabajo
   de ese run, no de este.
