# CLASIFICACIÓN — MOTOR: los seis campos almacenados y los invariantes que rechazan

**Run:** `RUN-CONSOLE-RUN-CLASSIFICATION-FIELDS-001` (`queue_order` 43), encargo **1 de 3**.
**Fecha:** 2026-07-31. **Repo:** `projects/aiw-console`.
**Estado del run al terminar este encargo:** `active`. **No se cerró y no se tocó su status.**

Toda cifra de este record viaja con el comando que la produjo. Lo no medido va
`[NO VERIFICADO]`. Los tokens del vocabulario van en inglés y verbatim: son datos que un
esquema y un validador leen tal cual.

---

## BLOQUE A — Guardas

### A.1 — El run derivado del canónico (no tecleado)

Derivado de `roadmap/roadmap.json` por `queue_order`, recorriendo el árbol completo:

```bash
node -e "const r=JSON.parse(require('fs').readFileSync('roadmap/roadmap.json','utf8'));const f=[];(function w(n){if(Array.isArray(n))return n.forEach(w);if(n&&typeof n=='object'){if('queue_order' in n)f.push(n);Object.values(n).forEach(w)}})(r);const x=f.filter(v=>v.queue_order===43);console.log(x.length,JSON.stringify(x[0].run_id),JSON.stringify(x[0].status))"
```

| Comprobación | Valor en disco | Veredicto |
|---|---|---|
| Nodos con `queue_order === 43` | **1**, en `$.objectives[1].phases[14].runs[8]` | único |
| `run_id` | `RUN-CONSOLE-RUN-CLASSIFICATION-FIELDS-001` | **exacto** |
| `title` | 104 caracteres, idéntico carácter a carácter al del ticket | **exacto** |
| `status` | **`active`** | **exacto** |

**Histograma de status del canónico:** `{completed: 42, active: 1, planned: 9}` sobre **52
runs**. El `#43` es **el único run `active`** del roadmap.

> **Incidencia registrada.** En la primera pasada de este encargo el `status` en disco era
> **`planned`**, no `active`, y **ningún** run del roadmap estaba `active`. La guarda A.1
> disparó, el encargo paró sin escribir nada, y la cabina activó el run por enmienda antes
> de la segunda pasada. La comprobación de arriba es la de la **segunda** pasada. Se deja
> constancia porque la guarda funcionó exactamente como estaba diseñada.

### A.2 — Las rutas se derivaron del record de medición, no del ticket

Leídas de `context/aiw-console/records/MEDICION-SUPERFICIES-CLASIFICACION.md`, bloques
**B.1** (esquema / allowlist) y **B.2** (motor). Ambos bloques nombran **un solo archivo de
esquema y dos de motor**, y ninguno faltaba:

| Superficie | Archivo | Fuente |
|---|---|---|
| Esquema / allowlist de claves de run | `tools/roadmap/roadmap-core.mjs` | record §B.1 |
| Motor (carga, mutaciones, invariantes, escritura) | `tools/roadmap/roadmap-core.mjs` (1637 líneas antes de este encargo) | record §B.2 |
| Motor (orquestación `plan` → `apply`, sin reglas propias) | `tools/roadmap/roadmap-plan.mjs` (302 líneas) | record §B.2 |

### A.3 — Los tres árboles muertos: no se tocó ninguno

El ticket citaba el bloque **B.5**; la cabina corrigió por enmienda a **B.0** («qué código NO
es superficie de este run»), que es donde el record los identifica. Los tres:

- `docs/project-console/` — el fork descartado por `D-035`
- `console/` — el prototipo retirado por `D-048`
- `tools/project-console/` — el tooling viejo del fork

**Comprobado por medición, no por intención.** Se tomó una huella SHA-1 + tamaño + mtime de
los 259 archivos del árbol antes de empezar y se recomparó al final:

```bash
node scratchpad/snap.mjs "$PWD" tree-before.json     # antes de tocar nada
node scratchpad/snap.mjs "$PWD" tree-after-final.json # al terminar
```

**Diferencia total del encargo: 2 archivos.**

| Archivo | Cambio |
|---|---|
| `tools/roadmap/roadmap-core.mjs` | contenido modificado |
| `tests/roadmap-classification.test.mjs` | **añadido** |

Ninguno de los dos cae bajo `docs/project-console/`, `console/` ni `tools/project-console/`.
**0 archivos añadidos, eliminados o modificados en los tres árboles muertos.**

---

## BLOQUE B — La especificación, leída verbatim

Fuente única: `context/CLASIFICACION-DE-RUNS.md`, §1 y §2 leídas completas.

### B.1 — Los vocabularios, transcritos VERBATIM y en inglés

Los **cuatro campos de valor cerrado** (`CLASIFICACION-DE-RUNS.md:33-37`):

| Campo | Vocabulario verbatim | `ruta:línea` |
|---|---|---|
| `correctness_model` | `SPECIFIED` · `JUDGED_ACCEPTS` · `JUDGED_DEFINES` | `context/CLASIFICACION-DE-RUNS.md:33` |
| `work_type` | `COSMETIC` · `FUNCTIONAL` · `FOUNDATIONAL` | `:34` |
| `blast_radius` | `LOCAL` · `ADJACENT` · `SYSTEMIC` · `PROJECT_SHAPE` | `:35-36` |
| `failure_surfaces` | `LOUD` · `VISIBLE` · `SILENT` | `:37` |

`blast_radius` se declara medido **«contando consumidores presentes y planificados»**
(`:35-36`). Es una instrucción al operador que clasifica, no una regla comprobable por el
motor: **no se implementó nada sobre ella.**

**La forma declarada de los dos campos restantes:**

| Campo | Forma declarada, verbatim | `ruta:línea` |
|---|---|---|
| `external_effects` | **«lista de guarda, vacía por defecto»** | `:38` |
| `classified_at` | **«la marca de cuándo se clasificó»** | `:40` |

**Ninguna de las dos declara más.** `external_effects` **no declara vocabulario para sus
entradas**; `classified_at` **no declara formato** (ni ISO-8601 ni ningún otro). Lo que se
implementó sobre esa base está en G.1 como interpretación explícita.

Y la declaración transversal que sostiene todo el bloque C, `:30-31`:

> «Cuatro campos de clasificación medida, más una lista de guarda. **Todos son OPCIONALES en
> el esquema**, sin excepción.»

### B.2 — Las TRES COMBINACIONES ILEGALES, verbatim, y a qué campo pertenece cada token

Enunciado verbatim de la especificación (`CLASIFICACION-DE-RUNS.md:81-87`):

> ## 3. Las tres combinaciones ILEGALES
>
> **La consola las RECHAZA:**
>
> - `SPECIFIED` + `FOUNDATIONAL`
> - `FOUNDATIONAL` + `LOUD`
> - `JUDGED_*` + `UNATTENDED`

**Adjudicación de CADA token a su campo, con cita:**

| Token | Campo al que pertenece | `ruta:línea` | ¿Almacenado? |
|---|---|---|---|
| `SPECIFIED` | `correctness_model` | `context/CLASIFICACION-DE-RUNS.md:33` | **SÍ** (§1) |
| `FOUNDATIONAL` | `work_type` | `:34` | **SÍ** (§1) |
| `LOUD` | `failure_surfaces` | `:37` | **SÍ** (§1) |
| `JUDGED_*` | `correctness_model` — glob sobre `JUDGED_ACCEPTS` y `JUDGED_DEFINES` | `:33` | **SÍ** (§1) |
| **`UNATTENDED`** | **`closure_mode`** | **`:73`** (celda de la tabla §2.2) | **NO — DERIVADO** (`:47`) |

Esto no era ceremonia. **`UNATTENDED` no figura entre los valores de ninguno de los cinco
campos almacenados de §1.** Aparece por primera y única vez como *salida* de la tabla de
`closure_mode` en `:73`, y §2 abre declarando (`:47-48`):

> «**`severity` y `closure_mode` son DERIVADOS y NUNCA se almacenan.** Se calculan al leer, a
> partir de los campos de §1.»

### B.3 — El invariante que quedó SIN IMPLEMENTAR, y por qué

**`JUDGED_*` + `UNATTENDED` NO se implementó.**

Es la aplicación literal de la regla B.3 del ticket: uno de sus dos tokens, `UNATTENDED`,
pertenece a `closure_mode`, que es **derivado y nunca almacenado**. El invariante **no es
decidible con campos almacenados**: exige ejecutar la tabla de derivación de §2.2, y la
derivación está adjudicada al **encargo 2**. No se movió nada de eso.

Los otros dos invariantes **sí** son decidibles con campos almacenados solamente
(`correctness_model`, `work_type`, `failure_surfaces` son los tres de §1), y están
implementados y probados — bloque D.

**Hallazgo adicional, ofrecido a la cabina y no actuado.** Aplicando la tabla §2.2 tal como
está publicada, `UNATTENDED` **solo puede producirse desde `SPECIFIED`**:

| Entrada (`:73-76`) | `closure_mode` |
|---|---|
| `SPECIFIED` + MINOR / MODERATE | **`UNATTENDED`** |
| `SPECIFIED` + MAJOR / CRITICAL | `SEMI_ATTENDED` |
| `JUDGED_ACCEPTS` | `SEMI_ATTENDED` |
| `JUDGED_DEFINES` | `ATTENDED` |

Ninguna fila que empiece por `JUDGED_*` produce `UNATTENDED`. La combinación ilegal
`JUDGED_*` + `UNATTENDED` es, bajo la tabla vigente, **inalcanzable**: la derivación ya la
hace imposible por construcción. Puede ser (a) una guarda deliberada contra un cambio futuro
de la tabla, (b) redundante, o (c) señal de que la tabla o la combinación tienen una errata.
**Este record no lo resuelve** — es lectura de doctrina y corresponde a la cabina.

### B.4 — La derivación NO se movió al motor, y no hizo falta parar

**No se concluyó que la función de derivación tenga que vivir en el motor.** No se escribió
ni una línea de derivación, ni de `severity` ni de `closure_mode`, ni en el motor ni en
ninguna otra parte. La guarda B.4 **no llegó a disparar**: al dejar el tercer invariante sin
implementar por la regla B.3, el encargo no necesita la derivación en absoluto.

Prueba negativa, sobre el árbol al terminar:

```bash
grep -rn "severity\|closure_mode\|UNATTENDED\|SEMI_ATTENDED\|ATTENDED" tools/ project-console/
```

→ las **únicas** apariciones son el comentario del motor que explica **por qué** el tercer
invariante NO está (`tools/roadmap/roadmap-core.mjs:446-451`), el test que documenta lo mismo
(`tests/roadmap-classification.test.mjs`, bloque final), y el test que comprueba que
`severity` **sigue siendo rechazado como clave de run**. Ninguna tabla, ninguna función.

---

## BLOQUE C — Los seis campos almacenados

### C.1 — Añadidos al esquema y al allowlist

Un solo archivo: `tools/roadmap/roadmap-core.mjs`.

| Qué | `ruta:línea` |
|---|---|
| Los seis, dentro de `RUN_OPTIONAL_FIELDS` | [`tools/roadmap/roadmap-core.mjs:68-79`](../../../tools/roadmap/roadmap-core.mjs) |
| Comentario que declara la semántica (copia la forma del precedente `lane`) | `:59-67` |
| `CORRECTNESS_MODELS` | `:83` |
| `WORK_TYPES` | `:84` |
| `BLAST_RADII` | `:85` |
| `FAILURE_SURFACES` | `:86` |
| `CLASSIFICATION_VOCABULARIES` (las cuatro en tabla, para que el validador itere) | `:88-93` |

`CANONICAL_RUN_KEY_ORDER` y `RUN_ALLOWED_FIELDS` **no se tocaron**: derivan de
`RUN_OPTIONAL_FIELDS` por spread, y heredaron los seis solos. El allowlist de claves de run
pasa de **once** a **diecisiete**.

**Lugar en el orden canónico de serialización:** después de `lane`/`barrier` (planificación) y
antes de `closeout_result`/`progress` (cierre). Clasificar un run es una afirmación sobre el
*trabajo*, no sobre su *resultado*. Probado por test (`normalizeRunKeyOrder` sobre un run con
las diecisiete claves desordenadas).

**El root NO se tocó.** `ROOT_ALLOWED_FIELDS` sigue con sus cinco claves: ninguno de los seis
campos es de proyecto. `care_budget` —que sí lo sería— es el **encargo 3** y no se tocó en
ninguna forma; hay un test que comprueba que `care_budget` **sigue siendo rechazado** como
clave de run.

### C.2 — Los seis son OPCIONALES y AUSENTES POR DEFECTO

La opcionalidad **es la pertenencia a `RUN_OPTIONAL_FIELDS` y no a `RUN_REQUIRED_FIELDS`**.
No hay flag `optional`, no hay `nullable`, no hay default escrito. Es exactamente la forma del
precedente `lane` medida en el record de superficies (§C.1): **la ausencia de la clave ES el
default.**

**Un run sin ninguno de los seis es VÁLIDO**, y hay test dedicado. También lo es un roadmap
entero de runs sin clasificar, y lo es un run con **un solo** campo puesto (la clasificación
no es todo-o-nada).

**Runs vivos sin clasificar en ESTE repo — cifra real medida:**

```bash
node -e "const o=JSON.parse(require('fs').readFileSync('roadmap/roadmap.json','utf8'));const C=['correctness_model','work_type','blast_radius','failure_surfaces','external_effects','classified_at'];const r=[];for(const ob of o.objectives||[])for(const ph of ob.phases||[])for(const x of ph.runs||[])r.push(x);const T=['completed','blocked'];const live=r.filter(x=>!T.includes(x.status));console.log('total',r.length,'vivos',live.length,'vivos sin clasificar',live.filter(x=>!C.some(k=>k in x)).length,'con algun campo',r.filter(x=>C.some(k=>k in x)).length)"
```

| Cifra | Valor |
|---|---|
| Runs totales | **52** |
| **Runs vivos (no terminales)** | **10** — 9 `planned` + 1 `active` |
| **Runs vivos SIN clasificar** | **10** (el 100 %) |
| Runs con alguno de los seis campos | **0** |

**Es la cifra que sostiene el run entero:** si cualquiera de los seis hubiera entrado como
requerido, los 10 runs vivos de este repo quedarían inválidos de golpe y el roadmap no
cargaría.

**Sobre la cifra de 89 del ticket.** El ticket dice «del orden de 89 runs vivos sin clasificar
en tres proyectos». **No se re-midió**: la medición fechada está en
`MEDICION-SUPERFICIES-CLASIFICACION.md` §C.2, que registra **86 vivos** (10 + 19 + 57) sobre
**168 runs totales** en los tres canónicos, y ya declara ella misma la discrepancia con el
`full_description` del `#43`. **Gana el disco: 86, no 89.** La conclusión que la cifra
sostiene no cambia. Nada se leyó ni se escribió en `aiw` ni en `cantu-studio` durante este
encargo.

### C.3 — NO se escriben valores por defecto en disco

Ninguna escritura del motor rellena un campo de clasificación que el operador no puso. La
comprobación es de bytes, no de intención, y son tres tests:

1. **Round-trip del canónico congelado** — `serialize(parse(raw)) === raw`, byte-idéntico.
2. **`normalizeRunKeyOrder` sobre un run sin clasificar** — las seis claves siguen ausentes;
   las claves resultantes son exactamente `RUN_REQUIRED_FIELDS`.
3. **Una escritura REAL por el camino del motor** — `planEdit` + `applyPlan` de un
   `set-text` sobre una copia del canónico congelado: al releer el archivo escrito,
   **ningún** run de los 52 ha ganado ninguna de las seis claves, y el único cambio es el
   título pedido.

Y sobre el canónico vivo de este repo, medido directamente:

```bash
node -e "import('./tools/roadmap/roadmap-core.mjs').then(c=>{const raw=c.loadRaw('roadmap/roadmap.json');const o=c.parseRoadmap(raw);console.log('invariantes',c.checkInvariants(o,{externalRunIds:null}).length===0?'PASS':'FAIL','| roundtrip byte-identico',c.serialize(o,c.detectEol(raw))===raw)})"
```

→ **`invariantes PASS | roundtrip byte-identico true`**.

### C.4 — Se siguió la forma del precedente

El precedente medido (record §C.2, el default de `lane`) es: **el campo opcional se resuelve
al LEER, nunca se escribe de vuelta**. Los seis campos de clasificación siguen esa forma en su
mitad aplicable —ausencia legal, nada escrito de vuelta— y **no** necesitan la otra mitad: a
diferencia de `lane`, que resuelve a un default de proyecto, **la clasificación ausente no
resuelve a nada**. No hay `resolveRunClassification` y no debe haberlo: un run sin clasificar
está sin clasificar, y esa es precisamente la información que el encargo 2 tiene que listar.

---

## BLOQUE D — Los invariantes que rechazan

### D.1 — Implementados en el canal que YA rechaza

Todos en `checkInvariants`, el canal `errors` que el record describe en su §B.3 —el único
canal de esa función, y aborta la escritura. **No se creó ningún canal nuevo.**

| Invariante | `ruta:línea` | Conducta |
|---|---|---|
| Los cuatro vocabularios cerrados (bucle sobre `CLASSIFICATION_VOCABULARIES`) | `tools/roadmap/roadmap-core.mjs:426-430` | **RECHAZA** |
| `external_effects` presente ⇒ array de strings no vacíos | `:433-440` | **RECHAZA** |
| `classified_at` presente ⇒ string no vacío | `:443-445` | **RECHAZA** |
| **ILEGAL:** `SPECIFIED` + `FOUNDATIONAL` | `:452-454` | **RECHAZA** |
| **ILEGAL:** `FOUNDATIONAL` + `LOUD` | `:455-457` | **RECHAZA** |
| `JUDGED_*` + `UNATTENDED` | — | **NO IMPLEMENTADO** (ver B.3) |

Las dos combinaciones disparan **solo cuando ambos campos están presentes**: un run a medio
clasificar está incompleto, no es ilegal.

La conexión con la escritura no es teórica y está probada: un roadmap sembrado a mano con
`SPECIFIED` + `FOUNDATIONAL` hace que `planEdit` devuelva `ok: false` nombrando la
combinación, y **el archivo queda byte a byte como estaba**.

### D.2 — Fuera de vocabulario ≠ ausente

Distinguidos por construcción: **toda** comprobación está gateada con `in`, así que un campo
ausente no levanta nada, mientras que un campo **presente** con valor fuera de vocabulario
levanta error y **el mensaje cita el valor ofensor**. Casos con test propio:

- `work_type: "FUNCIONAL"` → **RECHAZADO** (el caso literal del ticket)
- `work_type` ausente → **0 errores**
- `work_type: "functional"` (minúsculas del token legal) → **RECHAZADO** — los tokens son
  datos, no prosa
- `work_type: null` → **RECHAZADO** como fuera de vocabulario, no colado como «vacío»

### D.3 — El canal que solo reporta NO se abrió

No se añadió ningún array `warnings` a `checkInvariants`, ninguna conducta «lista los runs
vivos sin clasificar», y **no se tocó `tools/projector/project.mjs`** — la ranura
`validation_summary: {}` de `:1160` sigue declarada vacía, exactamente como estaba. Es del
encargo 2.

### D.4 — Tests: cada invariante ve rechazar y ve pasar al vecino legal

Archivo nuevo: `tests/roadmap-classification.test.mjs` (397 líneas, **48 tests**).

| Invariante | Test que lo ve RECHAZAR | Test que ve pasar el vecino LEGAL |
|---|---|---|
| `correctness_model` | `"ESPECIFICADO"` y `"specified"` | `"SPECIFIED"`, y ausente |
| `work_type` | `"FUNCIONAL"`, `"functional"`, `null` | `"FUNCTIONAL"`, y ausente |
| `blast_radius` | `"GLOBAL"`, `"project_shape"` | `"PROJECT_SHAPE"`, y ausente |
| `failure_surfaces` | `"QUIET"`, `"silent"` | `"SILENT"`, y ausente |
| `external_effects` | no-array; `[42]`; `[""]` | `[]` y `["publishes to npm"]` |
| `classified_at` | `""`; `20260731` | `"2026-07-31"` y `"2026-07-31T12:00:00Z"` |
| **`SPECIFIED` + `FOUNDATIONAL`** | la combinación | `SPECIFIED` + `FUNCTIONAL`; `JUDGED_DEFINES` + `FOUNDATIONAL`; cada token **solo** |
| **`FOUNDATIONAL` + `LOUD`** | la combinación | `FOUNDATIONAL` + `VISIBLE`; `FUNCTIONAL` + `LOUD`; `LOUD` **solo** |

Más: los seis son claves permitidas y ninguno es requerido; `severity` y `closure_mode`
**siguen rechazados** como claves de run; `care_budget` **sigue rechazado**; el orden de
serialización; los tres tests de C.3; y el test de que la escritura se aborta de verdad.

---

## BLOQUE E — La suite

### E.1 — Línea base y total nuevo

```bash
npm test
```

| Momento | Tests | Pasan | Fallan |
|---|---|---|---|
| **Línea base** (antes de tocar nada) | **325** | **325** | **0** |
| **Al terminar** | **373** | **373** | **0** |

**La línea base del ticket queda CONFIRMADA exacta: 325 / 325 / 0.**
Delta: **+48**, que son exactamente los 48 del archivo nuevo. **0 fallos, y ningún test
preexistente cambió de resultado** — no hubo que parar por rojo ajeno.

### E.2 — ¿Correr la suite deja el árbol modificado?

**NO. Medido, no inferido, y sin usar git en ninguna forma.** Huella SHA-1 + tamaño + mtime de
cada archivo del árbol (excluyendo `.git/`), antes y después de `npm test`:

| Medición | Archivos | Añadidos | Eliminados | Contenido cambiado | Solo mtime |
|---|---|---|---|---|---|
| Suite base (325) | 259 | 0 | 0 | **0** | **0** |
| Suite final (373) | 260 | 0 | 0 | **0** | **0** |

La suite **no toca ni una marca de tiempo**: escribe en `tmpdir()` y lee las fixtures
congeladas. Los 48 tests nuevos mantienen esa disciplina.

---

## BLOQUE F — El dato para la guarda de cierre

### F.1 — El comando que valida el estado de este repo

**No existe en este repo un script de validación vivo.** El único archivo cuyo nombre contiene
`valid` es `tools/project-console/validate-project-console-state.mjs`, y está **dentro del
tercer árbol muerto** (record §B.0: el validador divergente de 3087 líneas que `D-035` declara
residuo).

```bash
find . -name "*valid*" -not -path "./.git/*"
```
→ una sola línea, la del árbol muerto.

**El validador vivo es una FUNCIÓN, no un ejecutable:** `checkInvariants`
(`tools/roadmap/roadmap-core.mjs`), que el motor corre dos veces por escritura y que
`project-console/serve.mjs:354` inyecta como autoridad post-escritura con rollback. No tiene
envoltorio CLI.

**Lo que la cabina debe poner en su bloque de Git son DOS comandos**, porque validan cosas
distintas:

**(1) El código** — ruta del script: `package.json` → `"test": "node --test"`.

```bash
npm test
```

Imprime la lista de tests y cierra con `ℹ tests N / pass N / fail N`. **Hoy: 373 / 373 / 0.**

**(2) El canónico del roadmap** — no hay script; ésta es la invocación completa:

```bash
node -e "import('./tools/roadmap/roadmap-core.mjs').then(c=>{const raw=c.loadRaw('roadmap/roadmap.json');const o=c.parseRoadmap(raw);const e=c.checkInvariants(o,{externalRunIds:null});const r=c.globalOrdered(o);const by=r.reduce((a,x)=>(a[x.status]=(a[x.status]||0)+1,a),{});console.log('invariantes:',e.length?'FAIL\n'+e.join('\n'):'PASS (0 errores)');console.log('runs:',r.length,JSON.stringify(by));console.log('terminales:',r.filter(x=>c.TERMINAL_STATUSES.includes(x.status)).length);console.log('roundtrip byte-identico:',c.serialize(o,c.detectEol(raw))===raw)})"
```

Imprime cuatro líneas. **Ahora mismo:**

```
invariantes: PASS (0 errores)
runs: 52 {"completed":42,"active":1,"planned":9}
terminales: 42
roundtrip byte-identico: true
```

Es puramente de lectura: no escribe, no re-emite `.project/` y no toca git.

> **Advertencia para el bloque de Git de la cabina.** `node tools/projector/project.mjs`
> **NO** es un validador: **escribe** `.project/`. Re-emitir `.project/` estaba fuera del
> alcance de este encargo y **no se hizo**.

### F.2 — El contador `history`: existe, pero NO sirve como prueba de cierre

**Qué cuenta.** El único sitio del repo que imprime un contador llamado `history` es
`tools/project-console/validate-project-console-state.mjs:3049`, que imprime los grupos de
cola del prototipo *roadmap v3*:
`queue groups needs_human_decision=… now=… ready_next=… later=… history=…`.
En ese esquema, `history` es el **cajón de caída** del clasificador de `:1493`: un run que no
es `active` y no es `planned` cae en `history`. Es decir, **`history` = número de runs
TERMINALES** (`completed` + `blocked`). No cuenta cierres, ni entradas, ni eventos: es una
foto del total acumulado de runs terminales.

**Cuál es su valor AHORA MISMO: NINGUNO. No se imprime.**

```bash
node tools/project-console/validate-project-console-state.mjs
```

→ el script **falla mucho antes** de llegar a la línea 3049. Exige el esquema
`jame.roadmap_v3.v0.2-progress`, más `.aiw/roadmap/queue.json`, `.aiw/state/events.jsonl`,
`.aiw/ledgers/change_ledger.jsonl` y `.aiw/guardrails/no_claims.json` — **ninguno de los
cuales existe en este repo**, cuyo canónico declara `roadmap_tree_v1`. Emite ~20 líneas de
fallo y nunca imprime `Project Console state validation passed.` ni ningún contador.

(Se ejecutó **en solo-lectura** para medirlo: el archivo tiene **0** llamadas a
`writeFileSync`/`mkdirSync`/`rmSync`/`appendFileSync`, y la huella del árbol antes y después
de correrlo da **0 archivos cambiados**. El árbol muerto no se tocó.)

**Veredicto: el contador `history` NO sirve como prueba de que un cierre entró**, por tres
razones independientes, cualquiera de ellas suficiente:

1. **No se imprime.** El script que lo produce no completa en este repo.
2. **Vive en un árbol muerto.** `D-035` lo declara residuo y A.3 prohíbe tocarlo. Una guarda
   de cierre no puede depender de código que el propio proyecto declara retirado.
3. **Aunque se imprimiera, mide lo que no es.** Cuenta runs terminales acumulados. Un run que
   pasa a `blocked` lo incrementa igual que uno que se cierra a `completed`, y no distingue un
   cierre nuevo de los 42 viejos.

**La comprobación correcta en este repo — propuesta.** El estado ES el canónico, así que la
prueba de que un cierre entró se toma de él, con el comando (2) de F.1:

| Señal | Antes de cerrar un run | Después de cerrar uno |
|---|---|---|
| `invariantes` | `PASS (0 errores)` | `PASS (0 errores)` — si no, el cierre es inválido |
| `runs` por status | `{"completed":42,"active":1,"planned":9}` | `completed` **43**, `active` **0** |
| `terminales` | **42** | **43** |

Y la señal **específica de cierre**, que ningún contador agregado da: el motor acopla status y
resultado en `statusProgressErrors` (`tools/roadmap/roadmap-core.mjs`), de modo que
`closeout_result` **solo es válido en runs `completed`/`blocked`**. Hoy, de los 42 terminales,
**36 llevan `closeout_result`** — así que la prueba fiable de que **este** cierre entró es
nominal, no agregada:

```bash
node -e "import('./tools/roadmap/roadmap-core.mjs').then(c=>{const o=c.parseRoadmap(c.loadRaw('roadmap/roadmap.json'));const r=c.globalOrdered(o).find(x=>x.run_id==='RUN-CONSOLE-RUN-CLASSIFICATION-FIELDS-001');console.log(r.run_id,r.status,JSON.stringify(r.closeout_result||null))})"
```

→ ahora mismo: `RUN-CONSOLE-RUN-CLASSIFICATION-FIELDS-001 active null`.
Tras el cierre debe decir `completed` con un `closeout_result` no nulo. **Eso** es la prueba.

---

## BLOQUE G — Veredicto

### G.1 — Qué no fue ejecutable como estaba escrito, y qué hubo que interpretar

**No ejecutable (paró el encargo):**

1. **A.1, `status`.** El ticket declaraba el run `active`; el disco decía `planned`, y
   **ningún** run del roadmap estaba `active`. La guarda disparó y el encargo paró sin
   escribir un byte. Resuelto por enmienda de la cabina, no por el ejecutor. (`active` sí era
   token legal de `STATUSES`, así que no era una errata de vocabulario: el run simplemente no
   estaba activado.)

**No ejecutable (corregido sin parar):**

2. **A.3, puntero de bloque.** El ticket enviaba a **B.5** del record por los tres árboles
   muertos; están en **B.0**. B.5 es la superficie de CONSOLA. La cabina lo corrigió por
   enmienda; la guarda se aplicó íntegra igualmente.

**Interpretado, y declarado aquí porque la especificación no lo dice:**

3. **La forma de `classified_at`.** §1 declara «la marca de cuándo se clasificó» y **no
   declara formato**. Se implementó **string no vacío** y **no** se impuso ISO-8601:
   inventarlo habría metido una regla que la especificación no enuncia. Si la cabina quiere
   formato, es una línea y un test.
4. **Las entradas de `external_effects`.** §1 declara «lista de guarda, vacía por defecto» y
   **no declara vocabulario para sus entradas**. Se comprobó **la forma** (array de strings no
   vacíos) y **no el contenido**. La alternativa —no comprobar nada— dejaba pasar `[42]` y
   `[""]`; la otra —cerrar un vocabulario— habría sido inventarlo.
5. **«Los SEIS campos ALMACENADOS» frente a «los cinco» de §1 y del título del run.** Se leyó
   como **cinco de §1 + `classified_at`**, que es como el propio §1 los enumera (`:30-40`) y
   como el record de medición los cuenta en su §B.1. Sin conflicto real.
6. **`blast_radius` «contando consumidores presentes y planificados».** Instrucción al
   operador humano, no regla comprobable. No se implementó nada sobre ella.
7. **F.2 presuponía un contador `history` en una salida de validación viva.** No existe tal
   salida viva en este repo. Se midió, se documentó qué es y por qué no sirve, y se propuso la
   comprobación correcta.
8. **La cifra de 89 runs vivos** del ticket no se re-midió (medición fechada en el record de
   superficies: **86**). Sí se midió la de **este** repo, que es lo que C.2 pedía: **10**.

### G.2 — Qué queda pendiente para el encargo 2, nombrado por archivo

| Archivo | Qué falta |
|---|---|
| `tools/roadmap/roadmap-core.mjs` | Las **funciones de derivación** de `severity` (tabla §2.1 + ajuste de `failure_surfaces` saturando entre MINOR y CRITICAL) y `closure_mode` (tabla §2.2 + guarda de `external_effects`) — **si y solo si** la cabina decide que viven en el motor: la guarda B.4 dejó esa decisión sin tomar. Y, con ellas, **el tercer invariante `JUDGED_*` + `UNATTENDED`** (ver B.3, incluida la duda sobre si es alcanzable). |
| `tools/roadmap/roadmap-plan.mjs` | **La operación de escritura no existe.** `KNOWN_OPS` (`:29`), su `case` en el despacho (`:46`) y el set batcheable (`:173`) **no** ganaron `set-classification`: este encargo era esquema + invariantes, y ninguna de sus cláusulas la pedía. **Consecuencia operativa hoy: los seis campos VALIDAN pero la consola no puede ESCRIBIRLOS** — solo entran editando el JSON a mano. Es la primera pieza que el encargo 2 necesita. |
| `tools/projector/project.mjs` | El vocabulario y la tabla de derivación deben viajar como **tabla versionada** en `taxonomy_model` (`:981-996`), no sueltos dentro del árbol — el record §C.1(4) lo marca como «la brecha exacta que el `#43` no debe repetir», con el precedente de `lanes` como contraejemplo. Implica subir la versión del emisor (`:84-88`). Y la ranura `validation_summary: {}` (`:1160`) es donde entra «lista los runs vivos sin clasificar». |
| `project-console/assets/project-console.js` | La vista mínima: chips de fila, celdas del drawer, bloques del editor y estado del filtro, siguiendo el mapa de superficies del record §C.1(5) y sus dos rasgos —opt-in sin coste para quien no participa, y fricción proporcional al daño—. |
| `project-console/index.html` | La ranura de marcado para los controles de clasificación, como la de `lane` en `:97-101`. |
| `context/CLASIFICACION-DE-RUNS.md` | **No es código, pero bloquea:** §7 declara pendientes las **tres reglas mecánicas para runs mixtos**, no localizadas en disco. Siguen sin estar. |

**Y fuera de los dos encargos:** `care_budget` (§5) es el **encargo 3**, no adjudicado. No se
tocó en ninguna forma; hay test que comprueba que hoy se rechaza como clave de run.

---

## Lo que este record NO hace

- **No cierra el run.** El `#43` queda `active`. No se cambió el status de ningún run, ni el
  suyo ni el de ningún otro, ni se insertó, movió o renumeró nada.
- **No deriva, no transporta, no pinta y no lista.** Ni `severity`, ni `closure_mode`, ni
  sobre del emisor, ni vista de consola, ni el canal que reporta sin rechazar. Encargo 2.
- **No toca `care_budget`.** Encargo 3, sin adjudicar.
- **No implementa el tercer invariante** `JUDGED_*` + `UNATTENDED`, y dice por qué (B.3).
- **No mueve la derivación al motor** ni decide dónde debe vivir (B.4).
- **No re-emite `.project/`** y no ejecuta el proyector.
- **No usa git en ninguna forma**: ni commit, ni push, ni merge, ni lectura de historia. Las
  comprobaciones de árbol limpio de E.2 y A.3 se hicieron por huella SHA-1 + mtime.
- **No escribe un byte en `aiw` ni en `cantu-studio`**, ni los lee: la cifra de tres proyectos
  se cita del record de medición, que ya la tenía fechada.
- **No toca los tres árboles de consola muertos**, y lo demuestra por medición (A.3).
- **No reescribe ningún record existente**, incluido `MEDICION-SUPERFICIES-CLASIFICACION.md`.
- **No re-mide lo ya medido y fechado** en el record de superficies: lo cita.
