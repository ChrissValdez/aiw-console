# LOTES EN EL SCHEMA — y la rama que determinan

Run `RUN-CONSOLE-BATCHES-001` (`queue_order` **48**). Los lotes (`batches`) entran al schema
del roadmap copiando la forma de los carriles: vocabulario declarado en la raíz del canónico,
clave opcional `batch` en el run, transporte verbatim, y un desplegable en la consola junto al
de carriles. Lo que un lote tiene y un carril no: **`branch`** — la rama contra la que el
kernel commiteará sus runs (D-030). La pieza propia del run: el **invariante del interbloqueo**
— una arista `depends_on_human_approved` cuyo origen y destino comparten lote FALLA la
validación, porque la aprobación humana ocurre una sola vez, sobre el lote entero, al final,
y esa arista no puede satisfacerse nunca.

> **Alcance de escritura.** Se escribieron **4 archivos de código**
> (`tools/roadmap/roadmap-core.mjs`, `tools/roadmap/roadmap-plan.mjs`,
> `tools/projector/project.mjs`, `project-console/assets/project-console.js`),
> **1 archivo de test existente** (`tests/roadmap-engine.test.mjs`, el pin de `KNOWN_OPS`,
> por su propio protocolo), **1 suite nueva** (`tests/roadmap-batches.test.mjs`, 29 tests),
> **1 fixture nuevo** (`tests/fixtures/batches/project/`) y este record.
>
> **NO se tocó** `roadmap/roadmap.json` (su único diff es el flip `planned→active` de este
> run, hecho por la cabina antes de esta sesión), **no** se re-emitió `.project/` (los diffs
> preexistentes bajo `.project/` son de la cabina y quedaron intactos), **no** se ejecutó Git
> en forma alguna (solo lecturas `git show`/`git diff` para medir deltas), **no** se tocó
> `.gitattributes`, **no** se tocaron `docs/project-console/` ni `console/` (fork descartado
> por D-035 y prototipo retirado), **no** se tocó
> `tools/project-console/validate-project-console-state.mjs`, **no** se tocó
> `tests/depends-on-human-approved.test.mjs` (fuera de alcance; `V3_BATCHABLE_OPS` sigue sin
> absorberse, ver §H), y **no** se insertó, movió ni renumeró ningún run.
>
> `project-console/serve.mjs` está EN el alcance y quedó **sin cambios con razón medida**:
> su endpoint deriva de `KNOWN_OPS` (`serve.mjs:473`) y su validador de escritura ES
> `checkInvariants` (`serve.mjs:359-374`), así que las dos ops nuevas y el invariante viajan
> solos. `project-console/index.html` y `project-console.css` NO están en el alcance y no se
> tocaron: el selector crea su slot dinámicamente y reutiliza las clases del de carriles (§D).
>
> Ruta base de todo camino relativo: `projects/aiw-console`.

---

## BLOQUE A — La guarda de identidad, antes de tocar nada

El `run_id` no se tecleó: se derivó aplanando `objectives → phases → runs` del canónico.

```bash
node -e "const r=JSON.parse(require('fs').readFileSync('roadmap/roadmap.json','utf8'));const runs=[];for(const o of r.objectives)for(const p of o.phases)for(const x of p.runs)runs.push(x);const x=runs.find(r=>r.queue_order===48);console.log(x.run_id, JSON.stringify(x.title))"
```

| Derivado | Valor |
|---|---|
| `run_id` en disco | `RUN-CONSOLE-BATCHES-001` |
| `title` en disco | `Batches in the roadmap schema, with the branch they determine` |
| `status` al arrancar | `active` (flip de la cabina, preexistente) |
| runs aplanados | **56** |

Los dos coinciden **exactamente** con la guarda del ticket. La `full_description` entera se
leyó antes de empezar y manda sobre el ticket; el disco mandó sobre las dos (§F).

## BLOQUE B — La línea base de la suite, medida antes de escribir una línea

```bash
node --test
```

| | tests | pass | fail |
|---|---:|---:|---:|
| **Línea base** | **500** | **498** | **2** |

Los dos fallos son **exactamente** los dos pines de registro deliberados, verificados por
mensaje: `tests/roadmap-engine.test.mjs:93` («both real roadmaps now share one EOL; the
parameter is no longer load-bearing (**update the record, keep the test**)») y
`tests/classification-care-budget.test.mjs:153` («this repo declares no care budget, and that
is valid»). **No se repararon y no se usaron como gatillo de parada.**

## BLOQUE C — La forma de los carriles, medida punto por punto, y qué se copió

Los cinco puntos que el ticket ordena medir, con su dirección en el código y lo que los lotes
copiaron de cada uno:

| Punto | Carriles (medido) | Lotes (copiado) |
|---|---|---|
| Declaración en raíz | `root.lanes` en `ROOT_ALLOWED_FIELDS` y `CANONICAL_ROOT_KEY_ORDER`; entrada `{lane_id, title, default?}` (`LANE_ALLOWED_FIELDS`) | `root.batches` en las mismas dos listas (`roadmap-core.mjs:75,84`); entrada `{batch_id, title, branch}` (`BATCH_ALLOWED_FIELDS:95`) |
| Op de declaración | `declareLanes`: reemplazo ENTERO, guardas G1 forma / G2 clear-en-uso / G3 redeclarar-huérfano / G4 duplicado; no batchable | `declareBatches` (`:1888`): las cuatro guardas, mismo texto de refusal adaptado; no batchable (`roadmap-plan.mjs:216`) |
| Op de asignación | `setLane`: clave opcional de UN run; set/clear; refusal si no declarado; batchable | `setBatch` (`:1550`): idéntico gesto (`roadmap-plan.mjs:173`); batchable |
| Invariante | bloque de forma de `root.lanes` + «every lane USED must be DECLARED» en el run | bloque de forma (`:484`) + «every batch USED must be DECLARED» (`:611`) + **el interbloqueo (`:744`), que es lo propio de este run** (§E) |
| Transporte | `roadmapTreeBlock` lleva `lanes` verbatim, una sola copia, ausente no emite (`project.mjs:1127`) | línea gemela para `batches` (`project.mjs:1131`); la clave `batch` del run viaja sola con el árbol |
| Selector | `renderLaneSelector`: dropdown en la barra del subview, opciones = lo declarado, filtro sobre `v3VisibleRuns`, estado por proyecto | `renderBatchSelector` (`project-console.js:3682`): mismo gesto, mismo slot-vecino, mismas clases CSS (§D) |

### C.1 — Las diferencias con la forma de los carriles, cada una con su razón

**Ninguna es una invención; cada una sale del propio texto del run o de una restricción de
alcance, y ninguna disparó la condición de parada («la forma no sirve») porque la forma
SIRVIÓ — solo que dos de sus piezas existen para una semántica que los lotes no tienen.**

1. **Sin `default`.** Los carriles marcan exactamente un default porque todo run SIN clave
   resuelve a él («every run has a lane»). El run de lotes declara lo contrario:
   «Belonging to a batch is NOT mandatory» — un run sin `batch` no está en NINGÚN lote. Un
   default almacenado haría la pertenencia obligatoria en silencio. Se refuerza con test:
   `default: true` en una entrada de lote es **refusado** como campo inesperado.
   Consecuencia: no existen `defaultBatchId` ni `resolveRunBatch` — solo `declaredBatches`
   (`roadmap-core.mjs:357`), y el `batchOf` de la consola devuelve `null` sin resolver nada.
2. **`branch` REQUERIDO.** Es lo que un lote tiene y un carril no (D-030: «la rama es un
   PARÁMETRO del batch»). Un lote sin rama no determina nada, así que la entrada lo exige
   (`missing string branch; the branch is what a batch determines...`). QUÉ rama no se juzga:
   es parámetro del operador, como el título de un carril. No se inventó unicidad de ramas:
   dos lotes sobre una rama es una decisión del operador, no una contradicción comprobable.
3. **El selector pinta desde UN lote declarado** (los carriles se esconden bajo dos). La
   regla de los carriles tiene razón escrita: con un solo carril todo run está en él y el
   filtro no estrecha nada. Con un solo lote la población se parte en dentro/fuera, así que
   el filtro ya significa algo. Se copió la razón, no el literal.
4. **El slot del selector se crea dinámicamente** (`roadmap-batch-slot`, insertado junto a
   `roadmap-lane-slot`) en vez de vivir en `index.html`: ese archivo está FUERA de la lista
   de alcance de este run. Un proyecto sin lotes lo REMUEVE — su barra queda byte-idéntica a
   la de antes de que los lotes existieran. Cero CSS nuevo: reutiliza `v3-lane-picker` /
   `v3-lane-select`, la disciplina «sin CSS nuevo» del record anterior.
5. **Sin renumeración en-lote.** El filtro de carril renumera (posición dentro del carril)
   porque un carril ES una cola. Un lote no es una cola: es la unidad de rama/aprobación.
   Con filtro de lote activo la posición primaria sigue siendo el `queue_order` global.
6. **Sin UI de edición en la consola.** El texto del run nombra UNA superficie de consola:
   «a dropdown at the top showing batches instead of lanes». La asignación y la declaración
   viajan por el endpoint como `declare-lanes` siempre lo hizo (que nunca tuvo pantalla:
   «a project vocabulary could only be declared from a script», medido en el record #47).
   Consecuencia medida en §G: los sitios 6-7 de la predicción (fontanería de consola de la
   op) **no se pagan**.
7. **Colocación en la tabla de ops.** `set-batch` va tras `set-barrier` (el clúster de claves
   de planificación de un run). `declare-batches` va tras `declare-care-budget` y NO pegado a
   `declare-lanes`, para no falsificar el comentario ya escrito en el pin («declare-care-budget
   … sits immediately after declare-lanes»). El orden es load-bearing y está pinneado; los dos
   párrafos de registro nuevos quedan en el pin con su razón, como exige su protocolo.

## BLOQUE D — Qué quedó construido, sitio por sitio

**23 sitios en 4 archivos de código** (unidad del record #47: lugar distinto y contiguo donde
hay que nombrar el campo o su op para que exista, se valide, se transporte o se pinte).

| # | Sitio | Qué hace |
|---|---|---|
| 1 | `roadmap-core.mjs:75` | `batches` en `ROOT_ALLOWED_FIELDS` |
| 2 | `roadmap-core.mjs:84` | `batches` en `CANONICAL_ROOT_KEY_ORDER` (junto a `lanes`; `objectives` sigue último) |
| 3 | `roadmap-core.mjs:95` | `BATCH_ALLOWED_FIELDS = ["batch_id", "title", "branch"]` |
| 4 | `roadmap-core.mjs:146` | `batch` en `RUN_OPTIONAL_FIELDS` (tras `barrier`: clave de planificación) |
| 5 | `roadmap-core.mjs:357` | `declaredBatches` (el único helper; sin default, ver §C.1.1) |
| 6 | `roadmap-core.mjs:484` | invariante: forma de `root.batches` |
| 7 | `roadmap-core.mjs:611` | invariante: todo `batch` usado está declarado |
| 8 | `roadmap-core.mjs:744` | **invariante: el interbloqueo (§E)** |
| 9 | `roadmap-core.mjs:1550` | `setBatch`, la op de asignación |
| 10 | `roadmap-core.mjs:1888` | `declareBatches`, la op de vocabulario |
| 11 | `roadmap-plan.mjs:173` | **una fila** `set-batch` en `OP_DESCRIPTORS` (batchable) |
| 12 | `roadmap-plan.mjs:216` | **una fila** `declare-batches` (no batchable) |
| 13 | `project.mjs:1131` | transporte: `batches` verbatim en el bloque del árbol, ausente no emite |
| 14 | `project-console.js:236` | estado `v3SelectedBatch`, por proyecto |
| 15 | `project-console.js:3133` | `v3Model`: `batches` / `batchById` / `batchOf` |
| 16 | `project-console.js:3154` | el objeto que `v3Model` devuelve, ensanchado |
| 17 | `project-console.js:3600-3621` | `v3BatchFilterActive` + `v3AnyRunFilterActive` + composición en `v3VisibleRuns` |
| 18 | `project-console.js:3682` | `renderBatchSelector` |
| 19 | `project-console.js:3810` | llamada + `filtering` en `renderRoadmapV3` |
| 20 | `project-console.js:3857` | la nota de vista vacía nombra el caso lote |
| 21 | `project-console.js:3876` | conteo de objetivos del sub-tab vía `v3VisibleRuns` |
| 22 | `project-console.js:4611` | llamada en `renderRunQueueV3` |
| 23 | `project-console.js:5321-5323` | reset por cambio de proyecto (estado + slot removido) |

**Tests: 1 sitio en 1 archivo existente** (`tests/roadmap-engine.test.mjs:306`, el pin de
`KNOWN_OPS` por valor — mismo único sitio que el record #47 predijo que seguiría costando 1).

## BLOQUE E — El interbloqueo, y sus pruebas en LAS DOS direcciones

La regla (`roadmap-core.mjs:744`): para cada run con `batch` y `depends_on_human_approved`,
si algún destino de esa lista almacena EL MISMO lote, error nombrando run, destino y lote:

> `run X waits on human approval of Y, and both sit in batch B: human approval happens once,
> over the whole batch, at its end, so this edge can never be satisfied — move one of the two
> runs out of the batch, or drop the edge`

«Compartir lote» = los DOS almacenan la misma clave. No hay default que resolver, así que un
run sin clave no puede compartir nada (§C.1.1). La precedencia estricta ya garantiza que el
destino es el run ANTERIOR. Un destino externo (§10.d) se salta: no puede compartir lote de
este archivo. `setBatch` y `setHumanApprovedDeps` NO duplican la regla: es de `checkInvariants`
y el `postcheck` de `planEdit` la atrapa — la disciplina escrita de `setBarrier`.

**EL PROBLEMA QUE EL TICKET EXIGÍA RESOLVER, verificado: en este canónico CERO runs llevan
`depends_on_human_approved` como campo.** Medido: las únicas apariciones de la cadena son
**6, todas en prosa, repartidas en 4 runs** — 5 en `full_description` y **1 en un `summary`**
(el ticket decía «la prosa de cuatro full_description»; el conteo de runs es exacto, la
ubicación fina añade ese summary de `RUN-CONSOLE-DEPENDS-ON-HUMAN-APPROVED-001`; este propio
run lleva 2 en su descripción). **No hay dato real que ejercite el invariante**, así que las
pruebas van sobre el fixture construido a propósito (`tests/fixtures/batches/project/`,
generado A TRAVÉS del motor: orden de claves canónico, roundtrip byte-idéntico, `.project/`
emitido por el proyector real), y cubren:

| Dirección | Prueba |
|---|---|
| **FALLA** — arista dentro de un lote | re-alojar al consumidor en el lote de su destino (`set-batch` delta→NIGHT-A) y también al consumidor no-loteado (omega→NIGHT-A): 1 error, con el mensaje entero |
| **FALLA en la escritura, por los DOS lados que la crean** | `planEdit set-batch` (re-alojar) y `planEdit set-human-deps` (crear la arista dentro): ambos `stage: "postcheck"`, **nada llega al disco** (byte-idéntico verificado) |
| **PASA** — la misma arista ENTRE lotes | el fixture tal cual: delta (NIGHT-B) espera la aprobación de alpha (NIGHT-A); validador limpio |
| **PASA** — un solo extremo loteado, por CUALQUIERA de los dos lados | consumidor sin lote (omega→gamma, en disco) y destino sin lote (copia sin el lote de alpha) |
| **PASA** — `depends_on` plano DENTRO de un lote | beta→alpha, mismo lote: esperar que el trabajo EXISTA es legal; solo la espera de aprobación interbloquea |
| **PASA** — varios runs con aprobación pendiente en UN lote | alpha y gamma comparten NIGHT-A con consumidores fuera: exactamente lo que la regla permite |
| **PASA** — roadmap sin lotes con aristas humanas | regresión: el walk nuevo no levanta nada |

Un invariante probado solo por el lado que falla no demuestra que deje pasar lo legítimo; las
cinco filas de PASA existen por eso.

## BLOQUE F — LA FRONTERA CON `aiw`, por escrito

**Este run construyó: el schema (`root.batches` + `run.batch`), los invariantes (forma,
declaración, interbloqueo), las dos ops de escritura, el transporte del emisor y el selector
de consola. HACER QUE EL KERNEL COMMITEE A LA RAMA DEL LOTE ES TRABAJO DE `aiw` Y SOLO DE
`aiw`. Nada de lo entregado aquí ejecuta, obedece ni interpreta la rama: la transporta.**

El precedente que obliga a escribir esto, re-medido en esta sesión (criterio 4 del ticket —
las cifras del ticket eran de la cabina y había que volver a medirlas; el método es el del
record `MEDICION-PILOTO-CLASIFICACION-AIW-CONSOLE.md` §B.1, sitios = líneas con la subcadena):

| Medición | Ticket (cabina, entonces) | **Disco (esta sesión, antes de tocar)** |
|---|---|---|
| `lane` CÓDIGO | 8 archivos, 333 sitios | **8 archivos, 375 sitios, 635 ocurrencias** |
| `lane`+`barrier` CÓDIGO | 430 sitios | **488 sitios, 852 ocurrencias** |
| `lane` TESTS | 25 archivos | **29 archivos, 637 sitios** |
| claves `"lane"`/`"lanes"`/`"barrier"` en el canónico | ni una | **0** (las 38 apariciones de `lanes` son prosa) |
| `lane`/`barrier` en `aiw/kernel.mjs` | 0 | **0** (y `batch` tampoco: 0) |

El método reproduce; las cifras crecieron porque el código creció desde aquella medición.
La lectura no cambia: **los carriles se pagaron enteros en dos lados y hoy ningún ejecutor
los obedece.** Un tercer campo que nadie obedece no es lo que este run entrega — por eso la
frontera va escrita y con lista.

**Lo que queda del lado de `aiw`, para que ese hilo lo recoja sin reconstruirlo:**

1. **Leer el vocabulario**: `roadmap/roadmap.json → batches[]` del PROYECTO (o su
   `.project/roadmap.json` / `snapshot.roadmap_tree`, donde ya viaja verbatim), y la clave
   `batch` del run encolado.
2. **Resolver la rama de trabajo**: run con `batch` → checkout/creación de la RAMA DEL LOTE
   (`batches[].branch`) y commit de sus runs APILADOS ahí (run dos VE el trabajo de run uno —
   la razón de existir del modelo, medida en el propio kernel: hoy cada run parte de la rama
   base); run sin `batch` → la conducta actual (`aiw/<id>` desde la base), intacta.
3. **La aprobación humana del lote entero, una vez, al final**: el merge de la rama del lote a
   `main` sigue siendo acto humano SIEMPRE (D-030); el kernel jamás mergea. La auditoría
   agrupada revisa LA RAMA como unidad.
4. **La secuencia dentro del lote la da el `queue_order` global** — el lote no declara orden
   propio, y el invariante de este run garantiza al kernel que NINGUNA arista de aprobación
   humana apunta hacia dentro del lote que está ejecutando: puede correr el lote entero sin
   esperar a nadie a mitad de la noche.
5. **Dónde termina la ventana desatendida**: cada arista `depends_on_human_approved` que cruza
   una frontera de lote es un punto donde el dispatcher NO debe despachar al consumidor hasta
   que la aprobación del lote destino exista. Hoy nada almacena esa aprobación — ese registro
   (dónde vive, quién lo escribe) es diseño de `aiw`, no de esta consola.
6. `aiw/kernel.mjs` no contiene hoy ni `lane` ni `barrier` ni `batch` (verificado: 0). El
   primer consumo real del schema por el kernel empieza exactamente en esta lista.

## BLOQUE G — El registro del run anterior, consumido y medido (criterio 3)

**La predicción a verificar:** el record #47 (§D.2) predijo que un campo opcional de run nuevo
costaría **11 sitios** después del registro, bajando de 17 — **para un campo de la clase de
`depends_on_human_approved`: lista de REFERENCIAS a runs, con op propia**. Su §D.4 ya
condicionaba el ahorro a la clase.

**El número real de este run: 23 sitios (§D) — pero la comparación honesta separa mitades,
porque `batch` no es de la clase de la predicción** (es un token de vocabulario cerrado
declarado en la raíz, la clase de `lane`, que la predicción no cubría):

**Mitad campo-de-run** (lo que los 11 median), sitio contra sitio:

| Predicción #47 (11 sitios) | `batch` real | Δ y causa |
|---|---|---|
| 1. `RUN_OPTIONAL_FIELDS` | sitio 4 | = (irreducible, como predicho) |
| 2. bloque de `checkInvariants` | sitios 7 **y 8** | **+1**: el interbloqueo es un SEGUNDO bloque — es la semántica del campo, no fontanería |
| 3. fila de `RUN_REFERENCE_FIELDS` | — | **−1**: `batch` no guarda referencias; `removeRun` no se nombra NI UNA VEZ (la promesa del registro, cumplida por no-aplicación) |
| 4. op de escritura | sitio 9 | = |
| 5. fila de `OP_DESCRIPTORS` | sitio 11 | = (**una** fila; antes del registro eran 3 sitios) |
| 6. entrada de `V3_OP_DESCRIPTORS` | — | **−1**: sin UI de edición en consola (§C.1.6), nada viaja del modal |
| 7. `V3_BATCHABLE_OPS` | — | **−1**: ídem; la lista no se tocó y su pin de texto fuente (`depends-on-human-approved.test.mjs:341`) ni se acercó |
| 8-11. cuatro sitios de render | sitios 14-23 (**10**) | **+6**: la superficie de lote no es una sección de detalle sino un FILTRO — estado, reset, dos superficies, composición, nota, conteo. Coste de superficie, no de registro |

Mitad campo-de-run: **15 reales vs 11 predichos** (+4 netos: +1 invariante propio, +6
superficie-filtro, −3 clase sin referencias y sin modal).

**Mitad vocabulario** (la clase de `lane`, fuera de toda predicción del #47): 8 sitios —
raíz (1-3), helper (5), forma (6), op (10), fila de plan (12), transporte (13).

**Las tres respuestas que el criterio 3 exige:**

- **¿Cuántos absorbió el registro y cuántos se enumeraron a mano?** `OP_DESCRIPTORS` absorbió
  la alta de las DOS ops: **2 filas donde la forma pre-registro cobraba 6 sitios** (3 por op:
  `KNOWN_OPS` + `case` + lista batchable) — **ahorro real: 4 sitios**, y es TODO lo que el
  registro podía absorber aquí. Los otros 21 sitios se enumeraron a mano, como siempre:
  ninguno era del dominio de los tres registros. `RUN_REFERENCE_FIELDS` no cobró ni ahorró
  (campo sin referencias: tampoco habría pagado `removeRun` antes del registro).
- **¿La clase del campo cambia el coste respecto a la predicción, y en cuánto?** Sí, en las
  dos direcciones: **−3** (sin fila de referencias, sin fontanería de consola de la op) y
  **+8 de vocabulario** que la clase-referencia no paga, **+1** de invariante propio, **+6**
  de superficie-filtro. La fila de §D.4 del record anterior más cercana («campo con op propia
  que no guarda referencias»: 10) tampoco cubre las mitades de vocabulario ni de filtro: la
  clase `lane` completa — vocabulario + clave + selector — cuesta hoy **23**, y esa cifra no
  existía escrita en ningún lado hasta este record.
- **¿El registro estorbó en algún punto?** **No.** Las dos filas fueron genuinamente una
  entrada cada una y el pin de `KNOWN_OPS` siguió costando exactamente 1 sitio de test, como
  el #47 predijo. La única fricción real no es del registro sino de su PIN: el orden de la
  tabla es publicado y los comentarios ya escritos constriñen dónde puede sentarse una op
  nueva (`declare-batches` no pudo ir pegada a `declare-lanes` sin falsificar el «sits
  immediately after declare-lanes» de `declare-care-budget`). Coste: 0 sitios, algo de
  cuidado. Se registra porque nadie más lo va a medir.

**Medición por subcadena, para continuidad con el método piloto, con su límite dicho:** la
subcadena `batch` está CONTAMINADA por la op `batch` preexistente (lote de ediciones) y su
vocabulario (`batchable`, `applyBatch`, `V3_BATCHABLE_OPS`), así que el valor absoluto no
aísla el campo; el DELTA de esta sesión sí: líneas con `batch` **+138** en `roadmap-core.mjs`
(10→148), **+13** en `roadmap-plan.mjs` (37→50), **+3** en `project.mjs` (0→3), **+46** en
`project-console.js` (27→73), **0** en `serve.mjs` (0→0). Total **+200 líneas** (comentarios
incluidos, como el método piloto).

## BLOQUE H — Lo que este run NO hizo, a propósito

1. **Nada del lado kernel** — §F entera. Ni una línea de `aiw` se tocó.
2. **Ningún lote real en el canónico**: `roadmap/roadmap.json` no declara `batches` y ningún
   run lleva `batch`. La capacidad queda; poblarla es del operador. Pinneado en la suite
   nueva: «both real canonicals are batch-less» — si un canónico gana lotes, es una decisión
   y ese test es donde se registra (el gesto del pin lane-less de D-051).
3. **`V3_BATCHABLE_OPS` sigue sin absorberse** — su pin de texto fuente vive en
   `tests/depends-on-human-approved.test.mjs:341`, archivo fuera del alcance de este run,
   exactamente como el #47 lo dejó medido (una edición, trabajo de un run con ese archivo en
   su alcance). `set-batch` NO se añadió a esa lista: es el espejo de pantalla del modal, y
   el modal no ofrece la op (§C.1.6).
4. **Ni rename de `depends_on`, ni unificación de `setDeps`** — la ventana de «tres roadmaps
   en reposo» sigue teniendo dos runs esperándola.
5. **Sin status flip ni re-emisión de `.project/`** — lo hace la cabina desde la consola.
6. **QA de operador del selector**: pendiente como siempre — el harness DOM no es un browser
   (layout y CSS quedan con el pase de QA del operador, la nota estándar de los records de
   consola). La conducta — opciones, conteos, filtro en ambas superficies, reset, ausencia en
   proyectos sin lotes — quedó probada contra el renderer REAL en `node:vm` (5 tests).

**Sobre el criterio 6 («no puramente aditivo»):** ninguna estructura existente hubo de
ROMPERSE; todo fue añadir junto a — entradas en las tres listas del schema (el orden relativo
de las claves existentes no cambió y los roundtrips byte-idénticos de los dos canónicos lo
prueban en la suite), tres bloques nuevos en `checkInvariants`, y en la consola dos filtros
compuestos donde había uno (`v3VisibleRuns`, `filtering`, conteo de objetivos: conducta
idéntica verificada con el filtro de lote inactivo, que es el estado de todo proyecto real
hoy). La condición de parada no se disparó porque no hubo qué romper.

## BLOQUE I — La suite al cierre

| | tests | pass | fail |
|---|---:|---:|---:|
| Línea base | 500 | 498 | 2 |
| **Al cierre** | **529** | **527** | **2** |

**+29 tests** (la suite nueva entera). **Los 2 fallos son los mismos dos pines de registro,
con los mismos dos mensajes** (`roadmap-engine.test.mjs:93`,
`classification-care-budget.test.mjs:153`). **CERO fallos nuevos sobre la línea base.**
No apareció ningún tercer fallo en ningún punto de la sesión.
