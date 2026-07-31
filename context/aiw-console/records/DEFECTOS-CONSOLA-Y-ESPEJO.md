# Defectos de la consola global y del espejo del proyector

Run: `RUN-CANTU-PROJECT-CONSOLE-LATENT-DEFECTS-001` (`queue_order` 41).
Título verificado contra `roadmap/roadmap.json` en disco, coincidencia exacta con la guarda del
encargo.

**Todas las cifras de este documento son medición de hoy, 2026-07-30**, tomadas del árbol de
trabajo de `projects/aiw-console` y de los bytes de `HEAD` para el estado previo a la reparación.

La consola intervenida es la VIVA, `project-console/`. No se tocó `docs/project-console/` (fork
descartado por `D-035`) ni `console/` (prototipo retirado).

---

## Estado del árbol al empezar

`git status --porcelain`, literal:

```
 M .project/docs_index.json
 M .project/git_history.json
 M .project/guardrails.json
 M .project/no_claims.json
 M .project/roadmap.json
 M .project/snapshot.json
 M roadmap/roadmap.json
```

Solo la escritura de apertura del run, como el encargo preveía.

---

## Los cuatro defectos

### (A) El desajuste de espacio de claves en el bloque «Current work»

**Conteos medidos hoy, valores reales.** La pregunta B1 del encargo esperaba cinco contra cuatro;
se verificó y es exactamente eso:

| Declaración | Dónde | Claves |
|---|---|---|
| `v3QueueGroupKey` (deriva) | `project-console/assets/project-console.js:3146` (pre-fix) | **5** — `needs_human_decision`, `now`, `ready_next`, `later`, `history` |
| `ROADMAP_V3_QUEUE_GROUPS` (etiquetas) | `project-console/assets/project-console.js:87` (pre-fix) | **4** — `needs_human_decision`, `now`, `upcoming`, `history` |

**Ausentes de la tabla: `ready_next` y `later`.** Confirmado ejecutando la función de `HEAD` sobre
una tabla de runs que alcanza las cinco ramas.

**Causa real.** `renderOverviewV3` buscaba su clave SEMÁNTICA dentro de la tabla de DISPLAY del
Run Queue. Son dos espacios de claves distintos a propósito: `v3QueueDisplayGroup`
(`…project-console.js:3171`) colapsa `ready_next` + `later` en la sección `upcoming`. El lookup
cruzaba esa frontera, devolvía `undefined` para dos claves y disparaba el literal del call site —
**sea cual sea el status del run**. La causa NO era «no hay run activo», tal como el encargo
advertía.

Además, `renderOverviewV3` elegía el run con `runs.find(active) || runs[0]`
(`…project-console.js:3689`, pre-fix). Sin run activo eso es la cabeza de la cola, que en un
proyecto en marcha es un run **completed** pintado bajo «Current work item».

**Medición del estado real, con los bytes de `HEAD`:**

```
renderOverviewV3 sobre [completed, completed, planned]
  -> "Current work item" PINTADO; chip = "History"
renderOverviewV3 sobre [completed, completed]   (nada activo, nada elegible)
  -> hidden=false; innerHTML = <button class="v3-ov-card" … data-v3-run="R1">
```

La etiqueta «History» es la que el texto del run reportaba. Se reprodujo idéntica.

**Qué se cambió.**

- Nueva tabla `ROADMAP_V3_QUEUE_GROUP_LABELS` sobre las **cinco** claves semánticas
  (`project-console/assets/project-console.js:105`). `ROADMAP_V3_QUEUE_GROUPS` sigue siendo la
  tabla de display de cuatro secciones, intacta: el Run Queue no ganó ni perdió una sección.
- `renderOverviewV3` lee la tabla semántica y se le quitaron los literales de reserva
  (`|| "Now"`, `|| "Ready Next"`): el espacio de claves es total por construcción y hay un test
  que lo mantiene así.
- `const active = runs.find((run) => run.status === "active") || null` — sin reserva a la cabeza
  de la cola.
- Sin run activo, el bloque muestra el SIGUIENTE RUN ELEGIBLE bajo «Next up» (la maquinaria ya
  existía: `nextWork`). Sin ninguno de los dos, el bloque se oculta entero mediante
  `v3SetOverviewCurrentWorkVisible` (`…project-console.js:3697`), que pone `hidden` sobre el
  contenedor y sobre su `.overview-card` — el eyebrow «Current work» desaparece con el cuerpo.
  Decisión del operador, sin margen de interpretación, tal como el encargo la fijó.
- El `emptyState("No runs in the roadmap.")` desapareció: solo se alcanzaba cuando la reserva a la
  cabeza fallaba, y afirmaba que el roadmap estaba vacío sobre un roadmap lleno.
- Los caminos que SÍ deben ver el bloque (roadmap ausente, error de render, blanqueo al cambiar de
  proyecto) restauran la visibilidad explícitamente.

**B4 — el estado prohibido.** Un run `completed` bajo «Current work item» ya no puede ocurrir por
ningún camino: `active` solo puede ser un run cuyo `status === "active"`. Cubierto por dos tests
que barren los cuatro status.

**Test que lo cubre:** `tests/console-overview-current-work.test.mjs` (14 tests).
**Prueba de que fallaba antes:** 9 de esos 14 fallan contra los fuentes de `HEAD`, entre ellos
`a COMPLETED head of queue is never painted under Current work item`,
`the measured state — zero active runs, head of queue completed — paints no current work` y
`with neither an active run nor an eligible one, the block is HIDDEN — not filled with a lie`.

---

### (B) La lectura asimétrica de la caché de modelo

**Las DOS funciones, con archivo y línea (pre-fix):**

| Función | Línea | Lectura |
|---|---|---|
| `v3OpenEditModal` | `project-console/assets/project-console.js:5108` | `roadmapV3ModelCache \|\| v3Model(appData)` — **con** reserva |
| `v3RenderObjectiveEditorExtras` | `project-console/assets/project-console.js:5335` | `roadmapV3ModelCache \|\| v3Model(appData)` — **con** reserva |
| `v3EditBeforeNode` | `project-console/assets/project-console.js:5678` | `roadmapV3ModelCache` — **sin** reserva |

**Causa real.** La caché es `null` en todo el tramo entre `resetProjectScopedState()` (que la
limpia) y el primer render de una superficie Roadmap (que la repuebla). En ese tramo el modal
pintaba sus campos desde la reserva mientras `v3EditBeforeNode` devolvía `null`; con
`beforeNode === null`, `v3BatchOpChanged` responde `false` para **todas** las ops
(`…project-console.js:5737`), `v3EditBuildBatch` devuelve cero ops, y *Preview all changes* imprime
«No changes to preview» sobre un modal con cambios reales.

**Medición con los bytes de `HEAD`,** mismo modal, mismo título cambiado, solo cambia la caché:

```
caché VACÍA      -> v3EditBeforeNode()=null ; batch.considered=1 ; batch.ops=0
caché POBLADA    -> batch.ops=1
```

Este es el peor de los cuatro porque no se ve: no hay error, hay una frase que hace concluir al
operador que no había nada que aplicar.

**Qué se cambió.** La reparación es **la lectura**, no el mensaje. Un solo accesor,
`v3EditModel()` (`project-console/assets/project-console.js:5169`), devuelve
`roadmapV3ModelCache || v3Model(appData)`, y **todas** las superficies de edición pasan por él —
las que ya tenían reserva y los once sitios que leían la caché desnuda, repartidos en nueve funciones
(`v3EditBeforeNode`, `v3BatchOpChanged` en `move-objective`, el diff de `move-objective`,
`v3EditBuildPayload` en `insert`, `v3DecorateDrawerEditButton`, `v3InsertOnPositionChange`,
`v3EditPickerRender` — con sus dos llamadas a `v3DepChipHtml` —, `v3EditRemoveChoiceUi` y el
diff de `set-barrier`). El mensaje «No changes to preview» sigue
existiendo, y sigue siendo correcto cuando de verdad no hay cambios.

**Test que lo cubre:** `tests/console-edit-modal.test.mjs`, siete tests de la sección (B),
incluido `an UNCHANGED modal still reports no changes — the repair did not invent one` para que
la reparación no invente cambios, y uno estructural
(`no edit-surface function reads the bare cache any more`) que vuelve a ponerse rojo si alguien
reintroduce una lectura desnuda.
**Prueba de que fallaba antes:** 5 de los 7 fallan contra `HEAD`.

---

### (C) El default de posición al añadir un run

**Causa real.** `v3InsertDefaultOrder` (`project-console/assets/project-console.js:5394`,
pre-fix) devolvía `maxOrder + 1` de los runs de la fase ancla — fin-de-fase. Pulsado sobre una
fase temprana produce un `queue_order` bajo, y un `queue_order` no es un hueco: **afirma cuándo se
ejecuta el run**. El texto original del run registra que el run de los lanzadores estuvo a punto
de aterrizar en la posición 2 por esta vía.

Medición con los bytes de `HEAD`, sobre una fase de tres runs:

```
<input type="number" data-v3edit-insert-position min="1" max="4" value="4">
```

**DECISIÓN DE PRODUCTO — no la tomó este run.** El texto del run no fija el reemplazo: la regla
que lo gobierna («un run se inserta donde de verdad se va a ejecutar, nunca al final ni al
principio por comodidad») excluye fin-de-fase, fin-de-cola y posición 1, pero no dice qué poner en
su lugar. Se paró y se reportó, como el encargo exige. **Decisión de cabina, 2026-07-30: sin
prefill.**

Razón registrada por la cabina, literal en sustancia: los cuatro defectos de este run son la
misma clase — la consola afirma lo que no sabe. Un default distinto sustituye una afirmación falsa
por otra; solo el campo vacío la elimina. La opción «frontera de ejecución» queda descartada por
sí sola: es insertar al principio por comodidad, el reflejo exacto de lo que la regla prohíbe, e
ignora en silencio la fase desde la que se pulsó.

**Qué se cambió.**

- `v3InsertDefaultOrder` **desaparece**. No hay función de default porque no hay default.
- `v3InsertCurrentPosition` (`…project-console.js:5485`) devuelve `null` cuando el campo está
  vacío o no lleva número. `null` es una respuesta real — «el operador aún no lo ha dicho» — y
  todos los llamantes la tratan en vez de sustituir una suposición. El recorte a `[1, total+1]`
  para valores fuera de rango se conserva.
- El campo nace vacío, con `placeholder`, sin atributo `value`.
- *Preview insert* se niega con un motivo nombrado (`V3_INSERT_NEEDS_POSITION_MESSAGE`) en vez del
  `return` mudo que había: un botón silencioso se lee como roto, no como una negativa.
- `v3EditBuildPayload("insert")` devuelve `null` sin posición, para que el ancla no se invente.
- El picker de dependencias no ofrece nada hasta que hay posición: «anterior al run nuevo» no
  significa nada sin un «nuevo».
- **Contexto permitido por la cabina, y solo porque cuesta una línea:** el bloque muestra, como
  texto de solo lectura, el total de la cola y el tramo de `queue_order` que ocupa hoy la fase
  ancla («… currently holds #12 to #19»). Es contexto, no prefill; el campo sigue vacío.

**Test que lo cubre:** `tests/console-edit-modal.test.mjs`, seis tests de la sección (C).
**Prueba de que fallaba antes:** 6 de los 6 fallan contra `HEAD`.

---

### (D) El espejo del proyector

**Divergencia RE-VERIFICADA hoy**, no heredada del run anterior. Ejecutando la función de `HEAD`
contra la de la consola sobre la misma tabla de runs:

```
firma pre-fix:  roadmapQueueGroup(run, runsById)      [la consola toma (run, runsById, model)]

R1 activo, sin progreso            : espejo=now         consola=now
R2 activo, human_qa waiting        : espejo=now         consola=needs_human_decision   <-- DIVERGE
R3 completed                       : espejo=history     consola=history
R4 planned, deps OK, barrier activo: espejo=ready_next  consola=later                  <-- DIVERGE
```

Las tres divergencias que el encargo nombraba, confirmadas: falta la rama
`needs_human_decision`, falta la rama de `barrier`, y no recibe el argumento `model`.

**Qué se cambió.** `roadmapQueueGroup` (`tools/projector/project.mjs:368`) recupera las dos ramas
y el tercer argumento, con dos ayudantes espejo de los de la consola:
`deriveCurrentProgressEntry` (espejo de `v3DeriveCurrent`) y `roadmapBarrierBlockersFor` (espejo
de `v3BarrierBlockersFor`, incluida su guarda `status === "planned"`). Se reparó **aquí** y no en
el run de la suite, a propósito: son la misma función y el mismo espacio de claves, y separarlas
garantiza que vuelvan a divergir.

**E3, verificado y no deshecho.** La suite sigue asertando contra la CONSOLA vía
`tests/helpers/console-grouping.mjs`, que lee `v3QueueGroupKey` del renderer real dentro de
`node:vm`. Ningún test nuevo asierta contra el espejo como si fuera la autoridad: el espejo se
comprueba **por coincidir con la consola**, que es lo contrario.

**E4, el comentario que lo mantiene sincronizado.** Junto al espejo queda escrito qué lo sostiene
y apunta por nombre a `tests/console-queue-keyspace.test.mjs`. Hay un test que verifica que ese
comentario existe, nombra `v3QueueGroupKey` y nombra el fichero de test — si alguien renombra el
test y no sigue la referencia, se pone rojo.

**Test que lo cubre:** `tests/console-queue-keyspace.test.mjs`.
**Prueba de que fallaba antes:** 5 de sus 6 tests fallan contra `HEAD`.

---

## F2 — el test de las tres declaraciones

`tests/console-queue-keyspace.test.mjs` sostiene sobre UN espacio de claves:

1. `v3QueueGroupKey` — la función que deriva (la autoridad),
2. `ROADMAP_V3_QUEUE_GROUP_LABELS` — la tabla de etiquetas,
3. `roadmapQueueGroup` — el espejo del proyector.

Compara en las dos direcciones (la tabla no puede faltar ninguna clave que la función devuelva, ni
declarar ninguna que no devuelva), y reproduce una tabla de runs por las dos funciones exigiendo
la misma respuesta, incluida la rama de barrier con `model`. Añadir una clave o una rama en un
sitio y no en los otros dos lo pone rojo.

Las dos constantes se leen del renderer real: son `const` de nivel superior y un `const` nunca
aterriza en el objeto global de un contexto `vm`, así que se publican con un epílogo añadido al
MISMO script — mismo ámbito léxico, misma evaluación. Nada se copia al fichero de test: un
renombrado en el renderer aparece aquí como `undefined`, no como un duplicado obsoleto.

---

## F1 — la comprobación rojo-antes / verde-después

Los tres ficheros nuevos se ejecutaron contra los fuentes de `HEAD` (restaurados en memoria desde
el object store de git; los ficheros del árbol se devolvieron a su contenido exacto y se verificó
por `sha256`):

```
NUEVOS TESTS CONTRA LOS FUENTES PRE-REPARACIÓN
  tests 35 · pass 11 · fail 24
```

Reparto de los 24 fallos por defecto: **(A)** 9 · **(B)** 5 · **(C)** 6 · **(D)** 5 (uno de los
de (D) es el test de espacio de claves, que también cubre (A)). Cada uno de los cuatro entra con
tests que fallaban antes. Después de la reparación, los 35 pasan.

Ninguna aserción existente se debilitó, se saltó ni se borró. La única aserción retirada de la
suite es implícita y no existía: nada asertaba sobre estos cuatro comportamientos.

---

## G — congelado de los cinco tests que leían `cantu-studio` vivo

**Hecho.** Los cinco tests de `tests/projector-cantu.test.mjs` que leían el `cantu-studio` real
bajo su `.aiw/` (líneas 232, 256, 276, 333 y 357 antes del cambio) ahora leen un fixture del
layout FUENTE en `tests/fixtures/neighbours/cantu-studio/`, junto al `.project/` que el `#40` ya
había congelado. Se retiraron las cinco guardas `{ skip: !CANTU_PRESENT }`: los tests ya no se
saltan en silencio cuando el vecino no está, corren siempre.

El fixture añade `.aiw/roadmap/roadmap.json` (copia byte a byte del `canonical/roadmap.json`
congelado, `schema_version` `jame.roadmap_v3.v0.2-progress`), `.aiw/guardrails/` y un
`.aiw/docs/docs_index.json` curado.

**El corpus de docs está REDUCIDO, y es una decisión, no un descuido.** La curación real de
`cantu-studio` nombra **149 documentos** y el test exige que cada entrada curada resuelva en
disco; congelarla al pie de la letra significaba importar ~149 ficheros de otro proyecto. El
fixture lleva las **6 primeras entradas de la curación real, verbatim** (incluye `.html` y
`.json`, que es justo lo que el test defiende: la curación selecciona no-Markdown), más **2
ficheros Markdown que la curación no selecciona**, para que «el escaneo encuentra más de lo que la
curación selecciona» siga siendo cierto de este fixture. Todas las aserciones de ese test son
RELACIONES entre la curación y lo transportado, y un corpus reducido las preserva exactas.

**G2.** `.gitignore` recibe una sola negación, `!tests/fixtures/**/.aiw/`. Se niega el
DIRECTORIO: git no desciende a un directorio excluido, así que una negación solo sobre los
ficheros de dentro nunca se aplicaría. Verificado con `git check-ignore -v` (salida vacía, exit
1).

**G3 — NO SE ALCANZA, y es un obstáculo que el ticket no previó.** El encargo afirma que tras
esto ningún test lee dato vivo de un proyecto hermano salvo el smoke test. Con G1 hecho, eso sigue
siendo falso: `tests/roadmap-engine.test.mjs` lee el `../cantu-studio` vivo en tres sitios (líneas
81, 93 y 160). No están entre los cinco que el encargo enumera y no se tocaron. Uno de ellos
resiste el congelado por una razón de fondo, no de esfuerzo:

> `round-trip: the two real canonicals do NOT share a line-ending convention (why detectEol exists)`
> (`tests/roadmap-engine.test.mjs:93`) asierta que los dos canónicos reales difieren en final de
> línea. Medido hoy: el de este repo es **LF**, el del hermano **CRLF**. Este repo tiene
> `core.autocrlf = true` y **no tiene `.gitattributes`**, así que el final de línea de un fichero
> versionado es una propiedad del *checkout*, no del dato. Congelar ese test contra un fixture
> exige declarar `-text` en un `.gitattributes`, y el alcance de este encargo permite tocar
> `.gitignore` **solo** para la negación de G2.

Se para y se reporta, como G4 manda. Decidir si `roadmap-engine` se congela — y si el test de EOL
se conserva, se reescribe o se retira — es del operador.

---

## Qué NO se hizo, y por qué

- **La decisión de producto del defecto (C)** no la tomó este run: se paró y se reportó, y la
  cabina eligió «sin prefill». Queda registrado arriba con su razón.
- **`tests/roadmap-engine.test.mjs` no se congeló** (ver G3). Fuera de los cinco que el encargo
  enumera, y bloqueado por el alcance sobre `.gitattributes`.
- **No se cambió el `status` de ningún run ni se re-emitió `.project/`.** Este encargo DECLARA que
  el `#41` debe quedar en `completed`; lo cierra el operador desde la consola.
- **No se insertó, movió ni renumeró ningún run.**
- **No se corrió git en ninguna forma que escriba.** Los únicos usos de git fueron
  `git status --porcelain`, `git show HEAD:<ruta>` y `git check-ignore`, los tres de solo lectura.
- **No se tocó `docs/project-console/` ni `console/`.**
- **No se rediseñó ninguna superficie.** Cuatro defectos, ni uno más.

## Hallazgos que NO son uno de los cuatro — nombrados, no arreglados

1. **`tests/roadmap-engine.test.mjs` lee el hermano vivo** en las líneas 81, 93 y 160. Detallado
   en G3. Es la razón por la que la promesa de G3 no se puede firmar hoy.
2. **`tests/git-history-default-branch.test.mjs:24` declara `const CANTU = resolve(REPO_ROOT,
   "..", "cantu-studio")` y no lo usa en ninguna parte.** Código muerto. No es una lectura viva
   (`resolve` es aritmética de rutas), así que no afecta a G3, pero apunta a un congelado a medio
   hacer en ese fichero.
3. **`tools/project-console/validate-project-console-state.mjs` falla al ejecutarse**, con ~40
   errores, todos sobre el `.aiw/` legacy de este propio repo (`.aiw/project.json`,
   `.aiw/state/*`, `.aiw/roadmap/objectives.jsonl`, … ausentes). Ninguno menciona el renderer.
   No está enganchado a `npm test` ni a `start-console.*`; es un validador de un layout JAME que
   este repo no tiene. Falla igual antes y después de este run.
4. **`ROADMAP_V3_QUEUE_GROUP_DEFAULT_OPEN`** (`…project-console.js:146`) sigue declarando las
   cuatro claves de display, que es correcto — pero es una tercera tabla indexada por clave de
   grupo, sin nada que la ate a `ROADMAP_V3_QUEUE_GROUPS`. Hoy coinciden. No se tocó.
5. **El harness de tests no modela ancestros**: `StubElement.closest()` devuelve siempre `null`
   (`tests/helpers/console-dom.mjs`). Por eso `v3SetOverviewCurrentWorkVisible` marca `hidden`
   tanto en el contenedor como en la `.overview-card` — la tarjeta es lo que el operador ve
   desaparecer, y el contenedor lleva el mismo estado. La ocultación de la tarjeta en sí queda
   fuera del alcance del harness y pasa a QA visual del operador (entrada 1 de la lista).

---

## La suite

| | Antes del run | Al terminar |
|---|---|---|
| Tests | 281 | **316** |
| Pasan | 281 | **316** |
| Fallan | 0 | **0** |

35 tests nuevos, todos verdes, ninguno saltado.

**El árbol.** Una corrida completa de `npm test` deja `git status --porcelain` **idéntico** antes
y después; se comparó línea a línea y no difiere en nada. Lo garantizó el `#40` y este run no lo
ha roto.
