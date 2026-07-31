# MEDICIÓN DE SUPERFICIES — los cinco campos de clasificación (`#43`)

Medición **READ-ONLY** del terreno del run `RUN-CONSOLE-RUN-CLASSIFICATION-FIELDS-001`
(`queue_order` 43), para que la cabina escriba su ticket de construcción sin inventar rutas
ni cifras.

> **Todas las cifras de este record son una MEDICIÓN FECHADA DEL 2026-07-31**, no un estado
> permanente. Cada una viaja con el comando que la produjo.
>
> **Este encargo NO implementó nada del run.** No se tocó el esquema, el motor, el
> validador, el emisor ni la consola. No se tocó `roadmap/roadmap.json`. No se re-emitió
> `.project/`. **No se ejecutó Git en ninguna forma.** **No se escribió un solo byte en `aiw`
> ni en `cantu-studio`** (se leyeron: el emisor de este repo los lee).
>
> **Único archivo escrito por este encargo:** este record.
>
> Los valores que el ticket traía heredados de un handoff del 2026-07-31 se trataron como
> **VALORES A VERIFICAR**. Se verificaron contra disco y se reportan abajo con su
> coincidencia o su discrepancia. **Donde discrepan, gana el disco.**

Ruta base de todos los caminos relativos: `projects/aiw-console`.
Todos los comandos se corrieron desde ahí salvo donde se indica otra raíz.

---

## BLOQUE A — Guarda de identidad, y la cola re-medida

### A.1 — GUARDA QUE ABORTA: **PASA**. El encargo continúa.

`roadmap/roadmap.json` **no tiene un array `runs` de primer nivel**: los runs viven anidados
`objectives → phases → runs`. Hubo que aplanar para derivar el `queue_order` 43 (ver G.4.1).

```bash
node -e "const r=JSON.parse(require('fs').readFileSync('roadmap/roadmap.json','utf8'));const runs=[];for(const o of r.objectives)for(const p of o.phases||[])for(const x of p.runs||[])runs.push(x);const x=runs.find(z=>z.queue_order===43);const T='The five classification fields enter the roadmap schema, with derivation at read time and a minimal view';console.log('title===',x.title===T,'| run_id===',x.run_id==='RUN-CONSOLE-RUN-CLASSIFICATION-FIELDS-001');console.log(JSON.stringify({run_id:x.run_id,title:x.title,status:x.status,depends_on:x.depends_on},null,1))"
```

| Comprobación | Resultado |
|---|---|
| runs con `queue_order === 43` | **exactamente 1** |
| `title` idéntico al esperado (igualdad estricta, 104 caracteres en ambos) | **`true`** |
| `run_id` idéntico a `RUN-CONSOLE-RUN-CLASSIFICATION-FIELDS-001` | **`true`** |

Datos del run medidos de paso: `status` = `planned`; vive en objetivo `O4`, fase `O4.P9`;
claves presentes = `run_id, queue_order, title, summary, full_description, status, depends_on`
(**ninguna clave opcional**: ni `lane`, ni `barrier`, ni `closeout_result`, ni `progress`).

### A.2 — La cola, re-medida

```bash
node -e "const fs=require('fs'),c=require('crypto');const buf=fs.readFileSync('roadmap/roadmap.json');const r=JSON.parse(buf.toString('utf8'));const runs=[];for(const o of r.objectives)for(const p of o.phases||[])for(const x of p.runs||[])runs.push(x);const st={};runs.forEach(x=>st[x.status]=(st[x.status]||0)+1);const q=runs.map(x=>x.queue_order),u=new Set(q);const miss=[];for(let i=1;i<=Math.max(...q);i++)if(!u.has(i))miss.push(i);const ids=new Set(runs.map(x=>x.run_id));let e=0,d=[];runs.forEach(x=>(x.depends_on||[]).forEach(y=>{e++;if(!ids.has(y))d.push(x.run_id+'->'+y)}));console.log({total:runs.length,byStatus:st,min:Math.min(...q),max:Math.max(...q),unique:u.size,gaps:miss,objectives:r.objectives.length,phases:r.objectives.reduce((a,o)=>a+(o.phases||[]).length,0),edges:e,dangling:d.length,bytes:buf.length,md5:c.createHash('md5').update(buf).digest('hex')})"
```

| Medida | Valor a verificar (ticket) | **Medido en disco** | ¿Coincide? |
|---|---|---|---|
| Total de runs | 52 | **52** | ✔ |
| `status: completed` | 42 | **42** | ✔ |
| `status: planned` | 10 | **10** | ✔ |
| `status: active` | 0 | **0** (el token no aparece) | ✔ |
| `status: blocked` | 0 | **0** (el token no aparece) | ✔ |
| `queue_order` mínimo / máximo | 1 / 52 | **1 / 52** | ✔ |
| `queue_order` presente en | — | **52 de 52 runs** | — |
| `queue_order` únicos | único | **52 distintos, 0 duplicados** | ✔ |
| `queue_order` huecos en el rango | denso | **`[]` — ninguno** | ✔ |
| `queue_order` contiguo `1..N` | sí | **`true`** | ✔ |
| Objetivos | 2 | **2** (`O0`, `O4`) | ✔ |
| Fases | 19 | **19** (3 en `O0`, 16 en `O4`) | ✔ |
| Aristas `depends_on` | 26 | **26** | ✔ |
| Aristas colgantes | 0 | **0** | ✔ |
| Bytes | 119 081 | **119081** | ✔ |
| md5 | `fd04c09fddd615180e6b11d499cb3ab7` | **`fd04c09fddd615180e6b11d499cb3ab7`** | ✔ |

**Los dieciséis valores heredados coinciden con el disco. Cero discrepancias en A.2.**

Reparto de fases medido (mismo comando, desglose): `O0` → `O0.P1`(1 run), `O0.P2`(2),
`O0.P3`(9). `O4` → `O4.P0`(1), `O4.P1`(6), `O4.P2`(1), `O4.P11`(2), `O4.P3`(1), `O4.P4`(2),
`O4.P12`(1), `O4.P13`(3), `O4.P14`(4), `O4.P15`(1), `O4.P5`(1), `O4.P8`(1), `O4.P6`(1),
`O4.P7`(1), `O4.P9`(13), `O4.P10`(1).

Claves del root, verbatim: `schema_version`, `roadmap_id`, `title`, `objectives`.
**`lanes` está AUSENTE en este canónico** (ver C.2).

### A.3 — Los dos `depends_on` del `#43`

```bash
node -e "const r=JSON.parse(require('fs').readFileSync('roadmap/roadmap.json','utf8'));const runs=[];for(const o of r.objectives)for(const p of o.phases||[])for(const x of p.runs||[])runs.push(x);for(const id of ['RUN-CONSOLE-RUN-CLASSIFICATION-SPEC-001','RUN-CONSOLE-SUITE-FIXTURES-001']){const x=runs.find(z=>z.run_id===id);console.log(id,'=> status='+x.status,'queue_order='+x.queue_order)}"
```

| `run_id` | `status` real | `queue_order` |
|---|---|---|
| `RUN-CONSOLE-RUN-CLASSIFICATION-SPEC-001` | **`completed`** | 39 |
| `RUN-CONSOLE-SUITE-FIXTURES-001` | **`completed`** | 40 |

**Ambos `completed`.** Coincide con el ticket. El `#43` no tiene dependencias abiertas.

### A.4 — `context/DECISIONES.md`

```bash
node -e "const t=require('fs').readFileSync('context/DECISIONES.md','utf8');const m=[...t.matchAll(/^#+\s*(D-(\d+))\b/gm)];const n=[...new Set(m.map(x=>parseInt(x[2],10)))].sort((a,b)=>a-b);const g=[];for(let i=n[0];i<=n[n.length-1];i++)if(!n.includes(i))g.push(i);console.log({headings:m.length,distinctNumbers:n.length,min:n[0],max:n[n.length-1],gaps:g})"
```

| Medida | Valor a verificar | **Medido** | ¿Coincide? |
|---|---|---|---|
| Entradas numeradas | `D-001`..`D-058` | **`D-001`..`D-058`** | ✔ |
| Huecos | sin huecos | **`[]`** | ✔ |
| Última entrada | `D-058` | **`D-058`** | ✔ |

**Matiz medido, no discrepancia:** los encabezados `D-*` son **59**, no 58. El extra es
`context/DECISIONES.md:60` — `## D-010-enmienda — 2026-07-10 — Clon aceptado en
aiw2\jame_snapshot sin remote`. Es una **enmienda a `D-010`**, no una entrada numerada nueva
(ver G.4.2).

Última entrada, verbatim (`context/DECISIONES.md`, último encabezado):

> `## D-058 — 2026-07-30 — Primera aplicación de CONST §4 en el roadmap de AIW: la compuerta detiene un run sin incidente, y tres afirmaciones de D-055 se corrigen hacia adelante`

---

## BLOQUE B — Mapa de las cinco superficies

### B.0 — Primero: qué código NO es superficie de este run

`aiw-console` no contiene **un** fork descartado: contiene **tres** árboles de consola que no
son la consola viva (ver G.4.7). Quedan fuera del run, y la prueba de que ninguno es la
consola viva es que **ninguno tiene una sola aparición de `lane` ni de `barrier`** — todos
son anteriores a `D-051`:

```bash
for f in docs/project-console/assets/project-console.js tools/project-console/validate-project-console-state.mjs console/web/assets/console.js; do printf "%5s  %s\n" "$(grep -icE 'lane|barrier' $f)" "$f"; done
```

| Árbol | Qué es | Autoridad | Aparición de `lane`/`barrier` |
|---|---|---|---|
| `docs/project-console/` (`index.html` 155 líneas · `assets/project-console.js` 3894 · `assets/project-console.css` 4690) | **EL FORK DESCARTADO por `D-035`** | `context/DECISIONES.md:392`; `records/PORT-IDENTICO-CONSOLA-O4-P11.md:50-52` lo nombra explícitamente | **0** |
| `console/` (`serve.mjs` 106 · `web/index.html` 76 · `web/assets/console.js` 496 · `web/assets/console.css` 814) | **Prototipo RETIRADO por `D-048`** | `context/DECISIONES.md:1188`; `console/serve.mjs:1` se autodescribe «Consola global — prototipo» | **0** |
| `tools/project-console/` (`validate-project-console-state.mjs` 3087 · `serve-project-console.mjs` 401 · `run-state-normalization.mjs` 593 · `build-git-history-snapshot.mjs` 236) | **Tooling viejo del fork.** Las 3087 líneas son exactamente «el validador divergente de 3087 líneas del fork» que `D-035` declara residuo | `context/DECISIONES.md:414-416` | **0** |

**La consola VIVA es `project-console/`** (raíz del repo). Fuente de autoridad:
`records/PORT-IDENTICO-CONSOLA-O4-P11.md:50-52` — «Ruta nueva y limpia: `project-console/` en
la raíz del repo. No es `docs/project-console/` (el fork D-035), no es `console/` (el
prototipo retirado por D-048), no es `tools/project-console/` (el tooling viejo)».
Confirmación independiente: es el único árbol de consola que la suite importa
(`../project-console/serve.mjs` en 5 test files, `../project-console/assets/project-shell.js`
en 3) y el único que el lanzador arranca (`start-console.ps1:33` → `project-console\serve.mjs`).

```bash
grep -rhoE "\.\./(project-console|tools)/[a-zA-Z0-9_./-]+\.(mjs|js)" tests/*.mjs | sort | uniq -c | sort -rn
```

### B.1 — ESQUEMA: dónde está declarado el conjunto de claves admitidas de un run

**Hay allowlist explícita, y es un array exportado.** Un solo archivo:
`tools/roadmap/roadmap-core.mjs`.

| Qué | `ruta:línea` |
|---|---|
| Claves **requeridas** de un run | [`tools/roadmap/roadmap-core.mjs:49`](tools/roadmap/roadmap-core.mjs:49) |
| Claves **opcionales** de un run — **AQUÍ ENTRAN LOS CINCO CAMPOS + `classified_at`** | [`tools/roadmap/roadmap-core.mjs:55`](tools/roadmap/roadmap-core.mjs:55) |
| Comentario que declara la semántica de las opcionales (el sitio del comentario del precedente) | [`tools/roadmap/roadmap-core.mjs:50-54`](tools/roadmap/roadmap-core.mjs:50) |
| Orden canónico de serialización de un run | [`tools/roadmap/roadmap-core.mjs:58`](tools/roadmap/roadmap-core.mjs:58) |
| La allowlist propiamente (alias del orden canónico) | [`tools/roadmap/roadmap-core.mjs:59`](tools/roadmap/roadmap-core.mjs:59) |
| Allowlist del **root** (si `care_budget` se guardara en el root, entra aquí) | [`tools/roadmap/roadmap-core.mjs:35`](tools/roadmap/roadmap-core.mjs:35) |
| Orden canónico del root | [`tools/roadmap/roadmap-core.mjs:41`](tools/roadmap/roadmap-core.mjs:41) |
| Reordenamiento en sitio tras añadir una opcional | [`tools/roadmap/roadmap-core.mjs:189`](tools/roadmap/roadmap-core.mjs:189) (`normalizeRunKeyOrder`) |

**Las claves que HOY se admiten en un run, transcritas verbatim del disco:**

```js
// tools/roadmap/roadmap-core.mjs:49
export const RUN_REQUIRED_FIELDS = ["run_id", "queue_order", "title", "summary", "full_description", "status", "depends_on"];
// tools/roadmap/roadmap-core.mjs:55
export const RUN_OPTIONAL_FIELDS = ["lane", "barrier", "closeout_result", "progress"];
// tools/roadmap/roadmap-core.mjs:58-59
export const CANONICAL_RUN_KEY_ORDER = [...RUN_REQUIRED_FIELDS, ...RUN_OPTIONAL_FIELDS];
export const RUN_ALLOWED_FIELDS = CANONICAL_RUN_KEY_ORDER;
```

Es decir, **once claves admitidas hoy**: `run_id`, `queue_order`, `title`, `summary`,
`full_description`, `status`, `depends_on`, `lane`, `barrier`, `closeout_result`, `progress`.
Y del root, **cinco**: `schema_version`, `roadmap_id`, `title`, `objectives`, `lanes`.

Vocabularios cerrados vecinos, que el run copiará en forma:
`BARRIER_SCOPES` [`:56`](tools/roadmap/roadmap-core.mjs:56), `STATUSES` [`:60`](tools/roadmap/roadmap-core.mjs:60),
`TERMINAL_STATUSES` [`:61`](tools/roadmap/roadmap-core.mjs:61), `LANE_ALLOWED_FIELDS` [`:44`](tools/roadmap/roadmap-core.mjs:44).

**Los cinco campos no existen hoy en ningún archivo de código.** Verificado:

```bash
grep -rcE "care_budget|correctness_model|work_type|blast_radius|failure_surfaces|external_effects|classified_at|closure_mode" --include='*.mjs' --include='*.js' --include='*.html' tools project-console tests console docs | grep -v ':0$'
```

→ **salida vacía**. También `\bseverity\b` da cero en `tools/`, `project-console/` y `console/`.
Terreno virgen: las únicas apariciones de los tokens en el repo están en prosa
(`context/CLASIFICACION-DE-RUNS.md`) y en `full_description` dentro de los `.json` de roadmap
y de las fixtures.

### B.2 — MOTOR: qué archivos son el motor en ESTE repo

```bash
for f in tools/roadmap/roadmap-core.mjs tools/roadmap/roadmap-plan.mjs; do printf "%6d  %s\n" "$(wc -l < $f)" "$f"; done
```

| Archivo | Líneas | Papel |
|---|---|---|
[`tools/roadmap/roadmap-core.mjs`](tools/roadmap/roadmap-core.mjs) | **1637** | Carga, serializador byte-exacto, modelo de `queue_order`, **todas** las mutaciones, el pre-chequeo de invariantes, la guarda de identidad y la escritura atómica |
[`tools/roadmap/roadmap-plan.mjs`](tools/roadmap/roadmap-plan.mjs) | **302** | Orquestación: `plan` → `apply`. **No añade ninguna regla** (declarado en [`:11-14`](tools/roadmap/roadmap-plan.mjs:11)) |

**Por dónde pasa la LECTURA de un run:**

| Paso | `ruta:línea` |
|---|---|
| Leer el archivo crudo (preserva EOL) | [`roadmap-core.mjs:70`](tools/roadmap/roadmap-core.mjs:70) `loadRaw` |
| Parsear | [`roadmap-core.mjs:74`](tools/roadmap/roadmap-core.mjs:74) `parseRoadmap` |
| Aplanar `objectives→phases→runs` | [`roadmap-core.mjs:101`](tools/roadmap/roadmap-core.mjs:101) `flattenRuns` |
| Orden global de cola | [`roadmap-core.mjs:113`](tools/roadmap/roadmap-core.mjs:113) `globalOrdered` |
| Localizar **un** run con su contenedor | [`roadmap-core.mjs:119`](tools/roadmap/roadmap-core.mjs:119) `findRunEntry` |
| Mapa `run_id → queue_order` | [`roadmap-core.mjs:152`](tools/roadmap/roadmap-core.mjs:152) `queueOrderMap` |
| **Resolución de un campo opcional al leer** (el precedente exacto) | [`roadmap-core.mjs:182`](tools/roadmap/roadmap-core.mjs:182) `resolveRunLane` |
| Leer sin planear ni mutar (baseline) | [`roadmap-plan.mjs:38`](tools/roadmap/roadmap-plan.mjs:38) `loadCurrent` |

**Por dónde pasa la ESCRITURA de un run** — la secuencia está declarada en
[`roadmap-plan.mjs:7-9`](tools/roadmap/roadmap-plan.mjs:7):

| Paso | `ruta:línea` |
|---|---|
| Vocabulario de operaciones admitidas (**aquí entra `set-classification`**) | [`roadmap-plan.mjs:29`](tools/roadmap/roadmap-plan.mjs:29) `KNOWN_OPS` |
| Despacho op → mutación del core (**aquí entra su `case`**) | [`roadmap-plan.mjs:46`](tools/roadmap/roadmap-plan.mjs:46) `dispatch` |
| Set de ops **batcheables** (**aquí entra, si lo es**) | [`roadmap-plan.mjs:173`](tools/roadmap/roadmap-plan.mjs:173) |
| Plan completo (pre-flight → mutar → post-check → serializar) | [`roadmap-plan.mjs:204`](tools/roadmap/roadmap-plan.mjs:204) `planEdit` |
| Aplicar con compare-and-swap | [`roadmap-plan.mjs:293`](tools/roadmap/roadmap-plan.mjs:293) `applyPlan` |
| Escritura atómica + rollback | [`roadmap-core.mjs:1604`](tools/roadmap/roadmap-core.mjs:1604) `applyWrite` |
| Mutación modelo a copiar (misma forma que `set-classification`) | [`roadmap-core.mjs:946`](tools/roadmap/roadmap-core.mjs:946) `setLane` · [`:1019`](tools/roadmap/roadmap-core.mjs:1019) `setBarrier` |

Y del lado del servidor (el único camino por el que la consola escribe):

| Paso | `ruta:línea` |
|---|---|
| Import del motor por el servidor | [`project-console/serve.mjs:92`](project-console/serve.mjs:92) |
| Sufijo de la ruta de edición | [`project-console/serve.mjs:124`](project-console/serve.mjs:124) |
| Handler de edición de roadmap | [`project-console/serve.mjs:418`](project-console/serve.mjs:418) `handleRoadmapEdit` |
| `planEdit` en dry-run | [`project-console/serve.mjs:489`](project-console/serve.mjs:489) |
| `planEdit` + `applyPlan` en apply | [`project-console/serve.mjs:517`](project-console/serve.mjs:517), [`:536`](project-console/serve.mjs:536) |
| Autoridad post-escritura inyectada (rollback) | [`project-console/serve.mjs:354`](project-console/serve.mjs:354) |

**Nota de encuadre:** el servidor **no enumera campos de run**. Valida la op contra
`KNOWN_OPS` importado ([`serve.mjs:474`](project-console/serve.mjs:474)) y relaya `args`. Una
op nueva en el motor **no requiere tocar `serve.mjs`**.

### B.3 — VALIDADOR: qué comprueba, y qué RECHAZA frente a qué solo LISTA

**No hay archivo de validador separado.** El validador es una función del motor:
[`tools/roadmap/roadmap-core.mjs:249-506`](tools/roadmap/roadmap-core.mjs:249)
`checkInvariants`. Se corre **dos veces** por escritura (pre-flight y post-mutación,
`roadmap-plan.mjs:7-9`) y como autoridad post-escritura re-leyendo el archivo escrito
(`serve.mjs:354`).

Invariantes que comprueba hoy **sobre un run**:

| Invariante | `ruta:línea` |
|---|---|
| el run es un objeto | [`:354`](tools/roadmap/roadmap-core.mjs:354) |
| `run_id` string no vacío | [`:358`](tools/roadmap/roadmap-core.mjs:358) |
| **todas las requeridas presentes** | [`:361-363`](tools/roadmap/roadmap-core.mjs:361) |
| **ninguna clave fuera de la allowlist** | [`:364-368`](tools/roadmap/roadmap-core.mjs:364) |
| `lane` presente ⇒ string no vacío **y declarado en `root.lanes`** | [`:372-378`](tools/roadmap/roadmap-core.mjs:372) |
| `barrier` presente ⇒ token del vocabulario cerrado | [`:380-382`](tools/roadmap/roadmap-core.mjs:380) |
| `run_id` no duplicado | [`:389-393`](tools/roadmap/roadmap-core.mjs:389) |
| `queue_order` entero ≥1, único, contiguo `1..N` | [`:395-408`](tools/roadmap/roadmap-core.mjs:395) |
| `depends_on` array, sin auto-dependencia, sin duplicados, no colgante (§10.d admite externas), **precedencia estricta** | [`:410-433`](tools/roadmap/roadmap-core.mjs:410) |
| sin ciclos (DFS) | [`:435-461`](tools/roadmap/roadmap-core.mjs:435) |
| satisfacibilidad de barrier | [`:463-503`](tools/roadmap/roadmap-core.mjs:463) |
| acoplamiento `status` ↔ `progress` / `closeout_result` (fuera de `checkInvariants`) | [`:566`](tools/roadmap/roadmap-core.mjs:566) `statusProgressErrors` |
| guarda de identidad (`*_id` no cambian sin sanción) | [`:527`](tools/roadmap/roadmap-core.mjs:527) `checkIdentityPreserved` |

**LA FORMA EN QUE REPORTA — y esto es el hallazgo del bloque:**

`checkInvariants` **solo tiene un canal, y ese canal RECHAZA.** Declara `const errors = []`
en [`:250`](tools/roadmap/roadmap-core.mjs:250), acumula, y devuelve `errors` en
[`:505`](tools/roadmap/roadmap-core.mjs:505). **No existe un array `warnings` en
`checkInvariants`.** Todo lo que encuentra es error, y un error aborta la escritura.

El único canal advisory del motor es **`warnings` por MUTACIÓN**, no por archivo: cada
mutación declara su propio `const warnings = []` y lo devuelve junto a `errors`
(p. ej. [`:604`](tools/roadmap/roadmap-core.mjs:604), [`:650`](tools/roadmap/roadmap-core.mjs:650),
[`:875`](tools/roadmap/roadmap-core.mjs:875), [`:973`](tools/roadmap/roadmap-core.mjs:973),
[`:1047`](tools/roadmap/roadmap-core.mjs:1047), [`:1264`](tools/roadmap/roadmap-core.mjs:1264)).
Ese canal viaja: `roadmap-plan.mjs:254` → `serve.mjs:495/568` → pintado en
[`project-console/assets/project-console.js:6196`](project-console/assets/project-console.js:6196)
y [`:6268`](project-console/assets/project-console.js:6268).

**Consecuencia para el `#43`, medida:** el run necesita **las dos conductas** —rechazar las
tres combinaciones ilegales y **listar** los runs vivos sin clasificar—. El validador **ya
sabe rechazar** (es lo único que sabe). **NO sabe listar a nivel de archivo**: el canal
`warnings` está atado a «acabo de hacer esta mutación», no a «recorrí el árbol y esto es lo
que falta». La conducta «REPORTA, no rechaza» es **superficie nueva**, no una opción de una
existente.

**El hueco donde encaja ese reporte ya existe y está declarado vacío**, con la razón escrita:
`validation_summary: {}` en [`tools/projector/project.mjs:1160`](tools/projector/project.mjs:1160),
comentado en [`:1158-1159`](tools/projector/project.mjs:1158) — «Still opaque, and honestly
so: the capa-3 validator does not exist, so nothing real fills this». Es una ranura vacante
del sobre, no una que haya que inventar.

### B.4 — EMISOR: dónde se construye el sobre, y qué tablas versionadas transporta HOY

Un solo archivo: [`tools/projector/project.mjs`](tools/projector/project.mjs), **1843 líneas**.

| Qué | `ruta:línea` |
|---|---|
| Versión del emisor (`§6`: se mueve con cada cambio de conducta) | [`:97`](tools/projector/project.mjs:97) `PROJECTOR_VERSION = "0.10.0"` |
| Cadena `generated_from` | [`:98`](tools/projector/project.mjs:98) `aiw-projector@0.10.0` |
| **El sobre común a todo archivo emitido** | [`:1031-1039`](tools/projector/project.mjs:1031) `projectFileEnvelope` |
| **Construcción de `taxonomy_model`** — la tabla versionada | [`:964-1016`](tools/projector/project.mjs:964) `buildTaxonomyModel` |
| **Punto de enganche de `taxonomy_model` en el snapshot** | [`:1161`](tools/projector/project.mjs:1161) |
| Vocabulario de `status` de run (STORED, 4 tokens) | [`:778`](tools/projector/project.mjs:778) `RUN_STATUSES` |
| Vocabulario derivado de objetivo/fase (5 tokens) | [`:780`](tools/projector/project.mjs:780) `DERIVED_COLLECTION_STATUSES` |
| Vocabulario del eje proyecto (3 tokens) | [`:784`](tools/projector/project.mjs:784) `PROJECT_OPERATIONAL_STATUSES` |
| **La tabla de derivación COMO DATO** (el precedente exacto que el `#43` copia) | [`:790-796`](tools/projector/project.mjs:790) `COLLECTION_STATUS_RULES` |
| Segunda tabla de derivación, misma forma | [`:801-805`](tools/projector/project.mjs:801) `PROJECT_STATUS_RULES` |
| El motor que **ejecuta** esas tablas | [`:949`](tools/projector/project.mjs:949) `deriveCollectionStatus` · [`:955`](tools/projector/project.mjs:955) `deriveProjectOperationalStatus` |
| Transporte del árbol verbatim (y de `root.lanes` con él) | [`:1050-1063`](tools/projector/project.mjs:1050) `roadmapTreeBlock` |
| Ranura vacante para el reporte del validador | [`:1160`](tools/projector/project.mjs:1160) `validation_summary: {}` |

**La disciplina, escrita en el propio archivo** ([`:786-789`](tools/projector/project.mjs:786)):
la tabla se escribe **una sola vez**; `deriveCollectionStatus` **la ejecuta** y
`buildTaxonomyModel` **la declara** en el sobre. «Declaration and behaviour cannot drift
apart, because they are the same array.» **Ésa es la forma que el `#43` tiene que copiar para
la tabla de derivación de `severity` y `closure_mode`.**

**Claves del snapshot emitido, medidas en disco:**

```bash
node -e "console.log(Object.keys(JSON.parse(require('fs').readFileSync('.project/snapshot.json','utf8'))).join(', '))"
```

→ `schema_version, project_id, generated_at, generated_from, sources, emitted_artifacts,
operational_status, project_summary, current_status_summary, roadmap_tree, blockers,
followups, no_claims_summary, validation_summary, taxonomy_model`

**LA TABLA QUE TRANSPORTA HOY, TRANSCRITA VERBATIM** de
`.project/snapshot.json` (`node -e "console.log(JSON.stringify(JSON.parse(require('fs').readFileSync('.project/snapshot.json','utf8')).taxonomy_model,null,2))"`):

```json
{
  "model": "roadmap_tree_v1",
  "vocabularies": {
    "project.operational_status": { "axis": "project", "stored": true,
      "tokens": ["active", "blocked", "idle"] },
    "run.status":                 { "axis": "run", "stored": true,
      "tokens": ["planned", "active", "blocked", "completed"] },
    "objective.status":           { "axis": "objective", "stored": false,
      "derived_by": "collection_status_from_runs",
      "tokens": ["planned", "in_progress", "active", "blocked", "completed"] },
    "phase.status":               { "axis": "phase", "stored": false,
      "derived_by": "collection_status_from_runs",
      "tokens": ["planned", "in_progress", "active", "blocked", "completed"] }
  },
  "derivations": {
    "collection_status_from_runs": {
      "applies_to": ["objective", "phase"],
      "input": "run.status",
      "precedence": [
        { "token": "active",      "quantifier": "any",       "run_status": "active" },
        { "token": "blocked",     "quantifier": "any",       "run_status": "blocked" },
        { "token": "completed",   "quantifier": "all",       "run_status": "completed" },
        { "token": "in_progress", "quantifier": "any",       "run_status": "completed" },
        { "token": "planned",     "quantifier": "otherwise" }
      ],
      "empty_input": "malformed"
    },
    "project_operational_status_from_runs": {
      "applies_to": ["project"],
      "input": "run.status",
      "precedence": [
        { "token": "active",  "quantifier": "any",       "run_status": "active" },
        { "token": "blocked", "quantifier": "any",       "run_status": "blocked" },
        { "token": "idle",    "quantifier": "otherwise" }
      ],
      "empty_input": "idle"
    }
  },
  "specified_by": "context/aiw-console/CONTRATO.md"
}
```

**Ésa es exactamente la forma que el `#43` debe rellenar** con
`run.correctness_model`, `run.work_type`, `run.blast_radius`, `run.failure_surfaces`,
`run.external_effects` (`stored: true`) más `run.severity` y `run.closure_mode`
(`stored: false`, `derived_by: …`), y una entrada nueva en `derivations` por cada tabla de
`context/CLASIFICACION-DE-RUNS.md` §2.1 y §2.2.

**Sobre «versionada»:** `taxonomy_model` **no lleva un campo de versión propio**. Se versiona
por dos vías (ver G.4.4): (a) `generated_from` = `aiw-projector@0.10.0`, que `§6` obliga a
mover en cuanto la conducta cambia; (b) `model`, que es el **identificador que el árbol se da
a sí mismo**, no uno horneado aquí.

**El consumidor de la tabla ya existe, y es la prueba de que el mecanismo funciona:**
[`project-console/assets/project-shell.js:78-99`](project-console/assets/project-shell.js:78)
**ejecuta `taxonomy_model.derivations`** —«first rule whose quantifier matches wins»— y
[`:102-110`](project-console/assets/project-shell.js:102) resuelve el eje por
`vocabularies["<axis>.status"].derived_by`. Se autodescribe en [`:20`](project-console/assets/project-shell.js:20)
como «this shell is its first real consumer». **Un `derived_by` nuevo lo lee sin cambios** si
respeta la forma `{token, quantifier, …}`; **una tabla 2-D como la de `severity`
(`work_type` × `blast_radius`) NO cabe en ese ejecutor** — el bucle de [`:92-96`](project-console/assets/project-shell.js:92)
solo entiende `any` / `all` / `otherwise` sobre un input. Es trabajo del `#43` y hay que
saberlo antes de escribir el ticket.

**Comprobación de que el sobre ya sirve dos modelos distintos** (relevante para D.1):

```bash
cd /c/Users/chris/Documents/AIW_Workspace && for p in projects/aiw-console aiw projects/cantu-studio; do printf "%-24s " "$p"; node -e "const s=JSON.parse(require('fs').readFileSync(process.argv[1]+'/.project/snapshot.json','utf8'));console.log('taxonomy_model.model='+JSON.stringify(s.taxonomy_model.model),' roadmap_tree.model='+JSON.stringify(s.roadmap_tree.model),' lanes='+(s.roadmap_tree.lanes?s.roadmap_tree.lanes.length:'absent'),' '+s.generated_from)" "$p"; done
```

| Proyecto | `taxonomy_model.model` | `roadmap_tree.model` | `lanes` en el sobre | `generated_from` |
|---|---|---|---|---|
| `projects/aiw-console` | `roadmap_tree_v1` | `roadmap_tree_v1` | ausente | `aiw-projector@0.10.0` |
| `aiw` | `roadmap_tree_v1` | `roadmap_tree_v1` | **2** | `aiw-projector@0.10.0` |
| `projects/cantu-studio` | **`jame.roadmap_v3.v0.2-progress`** | **`jame.roadmap_v3.v0.2-progress`** | **2** | `aiw-projector@0.10.0` |

### B.5 — CONSOLA: dónde se renderiza un run, y dónde entra la vista mínima

Dos archivos, con papeles declarados en
[`project-console/assets/project-shell.js:8-14`](project-console/assets/project-shell.js:8):

| Archivo | Líneas | Papel |
|---|---|---|
[`project-console/serve.mjs`](project-console/serve.mjs) | **981** | **SIRVE la vista**: estáticos, namespace virtual `/projects/<key>/.project/**`, registro, y las tres rutas de escritura |
[`project-console/assets/project-console.js`](project-console/assets/project-console.js) | **6471** | **PINTA** un proyecto: todas las vistas per-project, el drawer de run y el editor |
[`project-console/assets/project-shell.js`](project-console/assets/project-shell.js) | **511** | Shell multi-proyecto: registro, sidebar, portfolio; **ejecuta `taxonomy_model`** |
[`project-console/index.html`](project-console/index.html) | **256** | Marcado del shell |
[`project-console/assets/project-console.css`](project-console/assets/project-console.css) | **6321** | Estilos |

De dónde salen los datos que se pintan:
[`project-console/assets/project-console.js:13-17`](project-console/assets/project-console.js:13) —
`PATHS.snapshot` = `<base>.project/snapshot.json`, `PATHS.roadmapV3` = `<base>.project/roadmap.json`.

**Dónde se renderiza un run hoy, y dónde entraría la vista mínima de clasificación:**

| Superficie | `ruta:línea` | Qué es / dónde entra |
|---|---|---|
| **Modelo de la vista Roadmap** (deriva todo al leer) | [`project-console.js:3028-3073`](project-console/assets/project-console.js:3028) | Construye `lanes`, `defaultLane`, `laneOf`, `laneInfoByRunId`, `barrierBlockersByRunId`. **`severity`/`closure_mode` derivados se calculan AQUÍ** |
| Resolución de un opcional al leer (patrón a copiar) | [`project-console.js:3037`](project-console/assets/project-console.js:3037) `laneOf` |
| **Chips en la fila de un run** | [`project-console.js:3350-3360`](project-console/assets/project-console.js:3350) `v3RunRowTags` | **Aquí entra un chip de `severity`** |
| Fila de run de la vista Roadmap | [`project-console.js:3362-3379`](project-console/assets/project-console.js:3362) `v3RoadmapRunRow` | Consume `v3RunRowTags` |
| Celdas de la fila en Run Queue | [`project-console.js:3384-3426`](project-console/assets/project-console.js:3384) `v3QueueRowCells` | Aquí se nombran barriers y deps |
| Fila de Run Queue (plantilla) | [`project-console.js:3428`](project-console/assets/project-console.js:3428) `v3QueueRowHtml` |
| Selector/filtro en la barra de subvistas (patrón `lane`) | [`project-console.js:3514-3527`](project-console/assets/project-console.js:3514) · slot en [`index.html:101`](project-console/index.html:101) | **Aquí entraría un filtro «sin clasificar»** |
| **Detalle de un run (drawer)** | [`project-console.js:4193`](project-console/assets/project-console.js:4193) `v3OpenRunDetail` | La vista de un run |
| **Celdas de metadatos del drawer** | [`project-console.js:4262-4296`](project-console/assets/project-console.js:4262) | **AQUÍ ENTRA LA VISTA MÍNIMA**: es donde `Lane` [`:4276-4279`](project-console/assets/project-console.js:4276), `Barrier` [`:4280-4287`](project-console/assets/project-console.js:4280) y `Held by barrier` [`:4288-4296`](project-console/assets/project-console.js:4288) ya se pintan como celdas condicionales |
| Constructor de una celda de detalle | [`project-console.js:4189`](project-console/assets/project-console.js:4189) `v3DetailCell` |
| Cuerpo del drawer (secciones) | [`project-console.js:4317-4347`](project-console/assets/project-console.js:4317) | Si la vista mínima fuera **sección** y no celdas, entra aquí |
| **Editor de run (modal)** | [`project-console.js:5233`](project-console/assets/project-console.js:5233) `v3RenderRunEditor` |
| **Punto de inserción de bloques del editor** | [`project-console.js:5278`](project-console/assets/project-console.js:5278) | Línea literal: `${v3RenderLaneBlock(run, model)}${v3RenderBarrierBlock(run, model)}` — **aquí se concatena un `v3RenderClassificationBlock`** |
| Bloque de editor modelo (opt-in por declaración) | [`project-console.js:5313-5329`](project-console/assets/project-console.js:5313) `v3RenderLaneBlock` |
| Bloque de editor modelo (siempre presente, con fricción) | [`project-console.js:5352-5378`](project-console/assets/project-console.js:5352) `v3RenderBarrierBlock` |
| Set de ops batcheables **del cliente** | [`project-console.js:5773`](project-console/assets/project-console.js:5773) `V3_BATCHABLE_OPS` |
| Recolección de payload por op | [`project-console.js:5841`](project-console/assets/project-console.js:5841), [`:5979`](project-console/assets/project-console.js:5979) |
| Resumen de preview por op | [`project-console.js:6124-6140`](project-console/assets/project-console.js:6124) |
| Pintado de `warnings` de una escritura | [`project-console.js:6196`](project-console/assets/project-console.js:6196), [`:6268`](project-console/assets/project-console.js:6268) |

**Servidor: qué NO hay que tocar.** Las rutas son tres y están cerradas
([`serve.mjs:124-126`](project-console/serve.mjs:124)): `roadmap/edit`, `history/sync`,
`project/emit`. El handler no enumera campos de run. **Una op nueva del motor viaja por
`serve.mjs` sin modificarlo.** La lectura de `.project/**` es genérica por el namespace
virtual. `serve.mjs` **no es superficie de escritura de este run** — salvo que `care_budget`
necesite una cuarta ruta (ver G.1).

---

## BLOQUE C — El precedente que el run copia

Localizado **por búsqueda de texto, no por git**:

```bash
for f in tools/roadmap/roadmap-core.mjs tools/roadmap/roadmap-plan.mjs tools/projector/project.mjs project-console/serve.mjs project-console/assets/project-console.js project-console/assets/project-shell.js project-console/index.html; do printf "%5s  %s\n" "$(grep -icE 'lane|barrier' $f)" "$f"; done
```

| Archivo | Apariciones de `lane`/`barrier` |
|---|---|
| `tools/roadmap/roadmap-core.mjs` | **191** |
| `tools/roadmap/roadmap-plan.mjs` | **20** |
| `tools/projector/project.mjs` | **18** |
| `project-console/serve.mjs` | **5** (las 5 son prosa sobre carriles de trabajo, no el campo — [`:33-35`](project-console/serve.mjs:33)) |
| `project-console/assets/project-console.js` | **263** |
| `project-console/assets/project-shell.js` | **0** |
| `project-console/index.html` | **7** |

El precedente es `D-051` (`context/DECISIONES.md`), con record propio
`records/CARRILES-Y-BARRIERS-ROADMAP.md` (27 931 bytes, 2026-07-27) y correcciones de QA en
`records/CORRECCIONES-QA-CARRILES-Y-REGLA-DE-IDIOMA.md`.

### C.1 — La forma del precedente, en cinco respuestas

**(1) Qué se añadió al esquema, y cómo se declaró la opcionalidad.**

- Clave de run: [`tools/roadmap/roadmap-core.mjs:55`](tools/roadmap/roadmap-core.mjs:55) —
  `lane` y `barrier` entran en **`RUN_OPTIONAL_FIELDS`**, delante de las de cierre.
  La opcionalidad **es la pertenencia a ese array y no a `RUN_REQUIRED_FIELDS`
  ([`:49`](tools/roadmap/roadmap-core.mjs:49))**: no hay flag `optional`, no hay `nullable`,
  no hay default escrito. **La ausencia de la clave ES el default.**
- El comentario que lo declara, y que el `#43` copiará en forma:
  [`:50-54`](tools/roadmap/roadmap-core.mjs:50) — «absent -> the project's default lane,
  resolved at READ time, never written back».
- Vocabulario cerrado del token: [`:56`](tools/roadmap/roadmap-core.mjs:56) `BARRIER_SCOPES`.
- Root: `lanes` entró en [`:35`](tools/roadmap/roadmap-core.mjs:35) `ROOT_ALLOWED_FIELDS` con
  su comentario `[D-051]` en [`:31-34`](tools/roadmap/roadmap-core.mjs:31), su forma de
  entrada en [`:44`](tools/roadmap/roadmap-core.mjs:44) `LANE_ALLOWED_FIELDS`, y su lugar en
  el orden de serialización en [`:41`](tools/roadmap/roadmap-core.mjs:41) —
  **deliberadamente distinto** del orden de la allowlist, razonado en
  [`:36-40`](tools/roadmap/roadmap-core.mjs:36).
- El reordenamiento que hace que una opcional nueva caiga en su sitio:
  [`:189`](tools/roadmap/roadmap-core.mjs:189) `normalizeRunKeyOrder`,
  [`:207`](tools/roadmap/roadmap-core.mjs:207) `normalizeRootKeyOrder`.

**(2) Qué allowlist se tocó en el motor.**

Cuatro arrays, todos en `roadmap-core.mjs`: [`:35`](tools/roadmap/roadmap-core.mjs:35)
(root), [`:41`](tools/roadmap/roadmap-core.mjs:41) (orden root),
[`:44`](tools/roadmap/roadmap-core.mjs:44) (entrada de lane),
[`:55`](tools/roadmap/roadmap-core.mjs:55) (opcionales de run) — y por herencia
[`:58-59`](tools/roadmap/roadmap-core.mjs:58).
Más el vocabulario de **operaciones** en
[`tools/roadmap/roadmap-plan.mjs:29`](tools/roadmap/roadmap-plan.mjs:29) `KNOWN_OPS`, que ganó
`set-lane`, `set-barrier` y `declare-lanes`; su despacho en
[`:98-110`](tools/roadmap/roadmap-plan.mjs:98); y el set batcheable en
[`:173`](tools/roadmap/roadmap-plan.mjs:173) (razonado en [`:166-172`](tools/roadmap/roadmap-plan.mjs:166)).
Mutaciones nuevas: [`roadmap-core.mjs:946`](tools/roadmap/roadmap-core.mjs:946) `setLane`,
[`:1019`](tools/roadmap/roadmap-core.mjs:1019) `setBarrier`,
[`:1098`](tools/roadmap/roadmap-core.mjs:1098) `declareLanes`.

**(3) Qué invariante se añadió al validador, y si rechaza o solo reporta.**

**Los cuatro RECHAZAN. Ninguno reporta.** Todos empujan a `errors`, y un error aborta.

| Invariante | `ruta:línea` | Conducta |
|---|---|---|
| forma del vocabulario `root.lanes` (array no vacío, allowlist, `lane_id` único, `title` no vacío, `default` solo como `true`, **exactamente uno** default) | [`roadmap-core.mjs:267-308`](tools/roadmap/roadmap-core.mjs:267) | **RECHAZA** |
| `lane` de un run **declarada** en `root.lanes` | [`roadmap-core.mjs:372-378`](tools/roadmap/roadmap-core.mjs:372) | **RECHAZA** |
| `barrier` ∈ vocabulario cerrado | [`roadmap-core.mjs:380-382`](tools/roadmap/roadmap-core.mjs:380) | **RECHAZA** |
| satisfacibilidad de barrier (no barrar lo que se necesita) | [`roadmap-core.mjs:463-503`](tools/roadmap/roadmap-core.mjs:463) | **RECHAZA** |

El precedente **solo produjo `warnings` de cortesía por mutación** —«nada que limpiar»:
[`:973`](tools/roadmap/roadmap-core.mjs:973), [`:1047`](tools/roadmap/roadmap-core.mjs:1047),
[`:1128`](tools/roadmap/roadmap-core.mjs:1128). **El precedente NO trae la conducta «lista
los vivos sin clasificar».** Ver B.3: para eso no hay precedente en este repo.

**(4) Cómo viaja el vocabulario en el sobre del emisor.**

- **Como DATO del proyecto, dentro del árbol, verbatim**:
  [`tools/projector/project.mjs:1060`](tools/projector/project.mjs:1060) —
  `...(Array.isArray(tree.lanes) && tree.lanes.length ? { lanes: tree.lanes } : {})`,
  razonado en [`:1055-1059`](tools/projector/project.mjs:1055): **una sola copia**, y ausencia
  ⇒ **no se emite la clave** (`§7`).
- La versión del emisor se movió a `0.9.0` por ello:
  [`:84-88`](tools/projector/project.mjs:84).
- **`barrier` no aparece en `taxonomy_model`.** Viaja dentro de cada run porque el árbol viaja
  verbatim ([`:1061`](tools/projector/project.mjs:1061)), pero su vocabulario **no se declara
  en el sobre**. El único vocabulario declarado sigue siendo el de `status`
  ([`:981-996`](tools/projector/project.mjs:981)). **Es la brecha exacta que el `#43` no debe
  repetir**: su `full_description` exige que el vocabulario y la tabla viajen como tabla
  versionada, y para eso el precedente aplicable es `taxonomy_model` (B.4), **no** el de
  `lanes`.
- El emisor sí ganó **conciencia de barrier** en un modelo interno **no emitido**:
  [`:428-479`](tools/projector/project.mjs:428) — `roadmapBarrierBlockersFor`, espejo del de
  la consola, declarado «Not part of the emitted view».

**(5) Qué se pintó en la consola.**

| Superficie | `ruta:línea` |
|---|---|
| Slot del selector de lane en el marcado (sin fila nueva) | [`project-console/index.html:97-101`](project-console/index.html:97) |
| Modelo derivado al leer (lanes, default, posiciones, barred set) | [`project-console.js:3028-3073`](project-console/assets/project-console.js:3028) |
| Etiqueta de lane (`<lane_id>-03`) | [`project-console.js:3087`](project-console/assets/project-console.js:3087) |
| Barriers que bloquean un run | [`project-console.js:3080`](project-console/assets/project-console.js:3080) |
| Posición mostrada (global vs. en-lane) | [`project-console.js:3105`](project-console/assets/project-console.js:3105) |
| **Chips en la fila** | [`project-console.js:3350-3360`](project-console/assets/project-console.js:3350) |
| «Waiting on» nombrando el barrier | [`project-console.js:3410-3421`](project-console/assets/project-console.js:3410) |
| Selector de lane | [`project-console.js:3514-3527`](project-console/assets/project-console.js:3514) |
| **Celdas del drawer**: `Lane`, `Barrier`, `Held by barrier` | [`project-console.js:4271-4296`](project-console/assets/project-console.js:4271) |
| Deps agrupadas por lane | [`project-console.js:4240-4256`](project-console/assets/project-console.js:4240) |
| **Bloques del editor** | [`project-console.js:5313`](project-console/assets/project-console.js:5313) (Lane) · [`:5352`](project-console/assets/project-console.js:5352) (Barrier) |
| Estado UI del filtro | [`project-console.js:159-163`](project-console/assets/project-console.js:159) |

**Dos rasgos del precedente que el `#43` debería copiar deliberadamente**, ambos escritos en
el propio código:
1. **Opt-in sin coste para quien no participa.** [`project-console.js:3030`](project-console/assets/project-console.js:3030):
   «A tree that declares none has `lanes: null` and every lane surface below stays exactly as
   it was.» Y [`:5314`](project-console/assets/project-console.js:5314): `if (!model || !model.lanes) return "";`
2. **Fricción proporcional al daño.** [`:5341-5351`](project-console/assets/project-console.js:5341):
   el barrier global exige panel de peligro + checkbox de reconocimiento, y sin él
   **la op no se recoge en el batch**. Limpiar no tiene fricción. Es el patrón para las tres
   combinaciones ilegales.

### C.2 — El default al leer

**Qué devuelve el sistema hoy para un run SIN clave `lane`:** el `lane_id` de la lane marcada
`default: true` en `root.lanes`; y **`null` si el proyecto no declara `lanes`**.

**Dónde está escrito ese default** — en **tres** implementaciones, ninguna de ellas en disco
como valor:

| Implementación | `ruta:línea` | Devuelve |
|---|---|---|
| Motor | [`roadmap-core.mjs:182-185`](tools/roadmap/roadmap-core.mjs:182) `resolveRunLane` | `run.lane` si string no vacío, **si no** `defaultLaneId(obj)` |
| Motor (el default) | [`roadmap-core.mjs:173-178`](tools/roadmap/roadmap-core.mjs:173) `defaultLaneId` | `null` si no hay `lanes`; si no, la marcada `default:true`, con **fallback a la primera** para archivos anteriores a la garantía ([`:170-172`](tools/roadmap/roadmap-core.mjs:170)) |
| Motor (¿hay vocabulario?) | [`roadmap-core.mjs:166-168`](tools/roadmap/roadmap-core.mjs:166) `declaredLanes` | el array, o `null` |
| Consola | [`project-console.js:3037`](project-console/assets/project-console.js:3037) `laneOf` | idéntico, sobre `defaultLane` de [`:3032`](project-console/assets/project-console.js:3032) |
| Emisor | — | **NO resuelve lane.** Transporta el vocabulario y el árbol; el consumidor deriva |

El invariante «exactamente una lane default» ([`:304-306`](tools/roadmap/roadmap-core.mjs:304))
es lo que hace que el default sea **estable y no posicional** — razonado en
[`:269-271`](tools/roadmap/roadmap-core.mjs:269): hacerlo posicional «silently re-home every
lane-less run whenever the declaration is reordered».

**El precedente medido en los tres canónicos:**

```bash
node -e "const fs=require('fs');const B='C:/Users/chris/Documents/AIW_Workspace/';for(const [n,p] of [['aiw-console',B+'projects/aiw-console/roadmap/roadmap.json'],['aiw',B+'aiw/roadmap/roadmap.json'],['cantu-studio',B+'projects/cantu-studio/.aiw/roadmap/roadmap.json']]){const o=JSON.parse(fs.readFileSync(p,'utf8'));const r=[];for(const ob of o.objectives||[])for(const ph of ob.phases||[])for(const x of ph.runs||[])r.push(x);console.log(n.padEnd(14),'runs='+r.length,'root.lanes='+(o.lanes?JSON.stringify(o.lanes.map(l=>l.lane_id+(l.default?'*':''))):'ABSENT'),'conLane='+r.filter(x=>'lane' in x).length,'conBarrier='+r.filter(x=>'barrier' in x).length,'vivos='+r.filter(x=>x.status!=='completed'&&x.status!=='blocked').length)}"
```

| Canónico | runs | `root.lanes` | runs con clave `lane` | **sin clave `lane`** | con `barrier` | vivos (no terminales) |
|---|---|---|---|---|---|---|
| `projects/aiw-console` | 52 | **AUSENTE** | 0 | **52** | 0 | 10 |
| `aiw` | 42 | `DEVELOPMENT*`, `DOCUMENTATION` | 6 | **36** | 2 | 19 |
| `projects/cantu-studio` | 74 | `DEVELOPMENT*`, `DOCUMENTATION` | 23 | **51** | 0 | 57 |

(`*` = la marcada `default: true`.)

**Discrepancia con el `full_description` del `#43`.** Dice «fifty runs of cantu-studio carry
no lane key at all». **El disco dice 51** (74 − 23). Y dice «roughly 89 live runs across three
projects with no classification»: **el disco dice 86 vivos** (10 + 19 + 57) sobre **168 runs
totales**. Gana el disco. La conclusión que esas cifras sostienen —que un campo requerido
pondría los tres roadmaps en rojo a la vez— **no cambia**.

Claves observadas sobre runs, por canónico (mismo comando, variante `Object.keys`):
`aiw-console` → `…, closeout_result, progress`; `aiw` → `…, barrier, lane`;
`cantu-studio` → `…, lane, closeout_result`.

---

## BLOQUE D — Los dos obstáculos, con números y sin arreglarlos

> **`aiw` y `cantu-studio` se leyeron y NADA se escribió en ellos.** Lo que haya que cambiar
> dentro es trabajo de sus hilos y aquí solo se **nombra**. Sin recomendación de arreglo.

### D.1 — `schema_version`: los tres valores, y dónde se comparan

```bash
cd /c/Users/chris/Documents/AIW_Workspace && for f in projects/aiw-console/roadmap/roadmap.json aiw/roadmap/roadmap.json projects/cantu-studio/.aiw/roadmap/roadmap.json; do printf "%-52s " "$f"; node -e "const o=JSON.parse(require('fs').readFileSync(process.argv[1],'utf8'));console.log(JSON.stringify(o.schema_version))" "$f"; done
```

| Archivo (desde `AIW_Workspace/`) | `schema_version` **VERBATIM** |
|---|---|
| `projects/aiw-console/roadmap/roadmap.json` | **`"roadmap_tree_v1"`** |
| `aiw/roadmap/roadmap.json` | **`"roadmap_tree_v1"`** |
| `projects/cantu-studio/.aiw/roadmap/roadmap.json` | **`"jame.roadmap_v3.v0.2-progress"`** |

Los tres declaran `roadmap_id: "roadmap"`. Tamaños: 119 081 / 100 949 / 101 151 bytes.
El canónico de `cantu-studio` es `.aiw/roadmap/roadmap.json` (no `.project/roadmap.json`, que
es la proyección emitida).

**Dónde se compara o se asume ese valor en ESTE repo:**

```bash
grep -nE "schema_version|ROADMAP_TREE_MODEL|roadmap_tree_v1|jame\.roadmap" tools/roadmap/*.mjs tools/projector/project.mjs project-console/serve.mjs project-console/assets/project-console.js project-console/assets/project-shell.js
```

| Superficie | `ruta:línea` | Qué hace **exactamente** |
|---|---|---|
| **MOTOR** | [`roadmap-core.mjs:35`](tools/roadmap/roadmap-core.mjs:35), [`:41`](tools/roadmap/roadmap-core.mjs:41) | Solo **nombra la clave** en dos arrays de allowlist/orden. **No lee ni compara el valor.** |
| **MOTOR** (declaración) | [`roadmap-core.mjs:19-21`](tools/roadmap/roadmap-core.mjs:19) | «The tree is admitted by its FORM (these field checks), **never by the string its schema_version declares**: the two real roadmaps this console edits declare different model identifiers over the same structure, and both are served.» |
| **VALIDADOR** (`checkInvariants`, 249-506) | — | **Ninguna aparición.** Cero comparaciones. |
| **EMISOR** — la compuerta real | [`project.mjs:868-884`](tools/projector/project.mjs:868) `hasRoadmapTreeShape` | Compuerta **por forma**: tres niveles, cada uno identificado, cada run con `status`. **No mira `schema_version`.** Razonado en [`:851-867`](tools/projector/project.mjs:851): la compuerta antigua sí comparaba y era «exactly the baked identity §10.c warns about». |
| **EMISOR** | [`project.mjs:890-894`](tools/projector/project.mjs:890) `declaredRoadmapModel` | **Lee el valor y lo devuelve verbatim.** Solo si falta o no es string usa el fallback `ROADMAP_TREE_MODEL`. **No compara.** «What is never done is RELABELLING a tree that named itself» ([`:886-889`](tools/projector/project.mjs:886)). |
| **EMISOR** | [`project.mjs:775`](tools/projector/project.mjs:775) `ROADMAP_TREE_MODEL = "roadmap_tree_v1"` | Solo fallback de [`:890`](tools/projector/project.mjs:890) y **texto de un mensaje de error** en [`:1083`](tools/projector/project.mjs:1083). |
| **EMISOR** (consumo del valor) | [`project.mjs:978`](tools/projector/project.mjs:978), [`:1052`](tools/projector/project.mjs:1052) | Lo transporta a `taxonomy_model.model` y a `roadmap_tree.model`. |
| **EMISOR** | [`project.mjs:1033`](tools/projector/project.mjs:1033) | `schema_version: SCHEMA_VERSION` = **`1`** ([`:56`](tools/projector/project.mjs:56)) — es el del **artefacto**, no el del árbol. Deliberadamente no se re-emite el del árbol ([`:1043-1045`](tools/projector/project.mjs:1043)). |
| **SERVIDOR** | — | **Ninguna aparición.** |
| **CONSOLA** | [`project-console.js:1771`](project-console/assets/project-console.js:1771) | Lo **muestra** en una fila «Schema». No compara. |

**MEDICIÓN QUE CONTRADICE LA PREMISA DEL TICKET.** El `full_description` del `#43` dice: «so
engine, validator and emitter must either accept both or that project migrates first». Medido
en disco: **el motor, el validador y el emisor de este repo YA aceptan ambos, y no porque
enumeren dos strings, sino porque NINGUNO compara el string.** No hay una sola comparación de
`schema_version` en las tres superficies. La compuerta es de forma
([`project.mjs:868`](tools/projector/project.mjs:868)) y la doctrina está escrita en dos sitios
([`roadmap-core.mjs:19-21`](tools/roadmap/roadmap-core.mjs:19),
[`project.mjs:851-867`](tools/projector/project.mjs:851)).

**Prueba de extremo a extremo, no solo lectura de código:** el sobre emitido de
`cantu-studio` lleva `taxonomy_model.model = "jame.roadmap_v3.v0.2-progress"` y el de
`aiw-console` `"roadmap_tree_v1"`, ambos por `aiw-projector@0.10.0` (tabla en B.4). **El mismo
emisor sirve los dos modelos hoy.**

**Lo que queda del obstáculo, y es real pero más pequeño:** el `#43` debe **no
re-introducir** una compuerta por string al añadir los cinco campos. Es una restricción de
construcción, no una migración.

### D.2 — Las dos copias del motor, y la CLI que vive solo en `cantu-studio`

```bash
cd /c/Users/chris/Documents/AIW_Workspace && find . -path '*/tools/roadmap/*' -name '*.mjs' -not -path '*/tests/*' -not -path '*/.git/*' | while read f; do printf "%6d  %s\n" "$(wc -l < "$f")" "$f"; done
find . -name 'roadmap-edit.mjs' -not -path '*/.git/*'
```

| Archivo | Líneas | Dónde vive |
|---|---|---|
| `projects/aiw-console/tools/roadmap/roadmap-core.mjs` | **1637** | este repo |
| `projects/aiw-console/tools/roadmap/roadmap-plan.mjs` | **302** | este repo |
| `projects/cantu-studio/tools/roadmap/roadmap-core.mjs` | **1177** | `cantu-studio` |
| `projects/cantu-studio/tools/roadmap/roadmap-plan.mjs` | **271** | `cantu-studio` |
| **`projects/cantu-studio/tools/roadmap/roadmap-edit.mjs`** | **468** | **`cantu-studio`, y en ningún otro sitio** |

**Precisión sobre la premisa.** El `full_description` dice «the roadmap engine EXISTS IN TWO
COPIES: this repo holds roadmap-core.mjs and roadmap-plan.mjs, while the CLI roadmap-edit.mjs
still lives only in cantu-studio». El disco dice algo un poco distinto y peor: **hay dos
copias COMPLETAS del motor** (core + plan en cada repo, no un motor aquí y una CLI allá), **y
además** la CLI solo aquí. `roadmap-edit.mjs` es un envoltorio: importa `planEdit`/`applyPlan`
de **su propio** `roadmap-plan.mjs` ([`roadmap-edit.mjs:51`](../../cantu-studio/tools/roadmap/roadmap-edit.mjs:51),
[`:367`](../../cantu-studio/tools/roadmap/roadmap-edit.mjs:367)), no de este repo.

**Operaciones de escritura de run: CLI de `cantu-studio` frente a este repo.**

```bash
grep -nE "^const COMMANDS" projects/cantu-studio/tools/roadmap/roadmap-edit.mjs
grep -nE "^export const KNOWN_OPS" projects/aiw-console/tools/roadmap/roadmap-plan.mjs
```

CLI (`roadmap-edit.mjs:91`, 14 comandos) vs. este repo (`roadmap-plan.mjs:29`, 18 ops):

| Operación de la CLI | ¿Equivalente en este repo? |
|---|---|
| `insert` · `move` · `remove` · `swap` | **Sí**, mismos nombres |
| `set-text` · `set-deps` · `set-status` | **Sí** |
| `clear-progress` | **Sí** |
| `move-objective` · `set-objective-archived` | **Sí** |
| `create-phase` · `delete-phase` | **Sí** |
| `create-objective` · `delete-objective` | **Sí** |

**Las 14 operaciones de la CLI tienen equivalente aquí. La recíproca es falsa:** este repo
ofrece **cuatro** que la CLI no tiene — **`set-lane`, `set-barrier`, `declare-lanes`,
`batch`**.

**El precedente de cómo la segunda copia absorbió los campos del `#43`-anterior está en
disco, y tiene nombre.** `projects/cantu-studio/tools/roadmap/roadmap-core.mjs:27-35`,
verbatim:

> `// [lanes: TOLERATE, NOT ADOPT] lanes (root) and lane / barrier (run) are the`
> `// optional lane vocabulary the global console's roadmap engine writes. They are listed`
> `// […] "root carries unexpected field lanes". Nothing else changed: this module derives no`
> `// lane, resolves no default, enforces no barrier and offers no operation that writes`
> `// […] preserved verbatim through load -> mutate -> serialize.`

Y en efecto: `ROOT_ALLOWED_FIELDS` ([`:37`](../../cantu-studio/tools/roadmap/roadmap-core.mjs:37))
y `RUN_OPTIONAL_FIELDS` ([`:43`](../../cantu-studio/tools/roadmap/roadmap-core.mjs:43)) de esa
copia son **idénticos** a los de aquí, y las únicas otras apariciones de `lane`/`barrier` en
sus tres archivos son ese comentario y dos ajenas (`planEdit`, un comentario de batch).

**QUÉ PARTE DE LA CLASIFICACIÓN QUEDARÍA CIEGA si los campos entran solo aquí** — medido
sobre el precedente, no supuesto:

| Capacidad | Estado si solo entra aquí | Evidencia |
|---|---|---|
| **Preservar** los cinco campos al mutar un run desde `cantu-studio` | **CIEGA hasta que su allowlist los liste.** Sin eso, `checkInvariants` de esa copia falla con «run carries unexpected field correctness_model» en el **pre-flight**, y el archivo entero queda ineditable por esa CLI | `cantu-core:236-242` es el mismo bucle de allowlist que aquí |
| **Escribir** clasificación desde `cantu-studio` | **CIEGA.** Su CLI no tendría `set-classification`, igual que hoy no tiene `set-lane` | `roadmap-edit.mjs:91` |
| **Derivar** `severity` / `closure_mode` en `cantu-studio` | **CIEGA.** Esa copia «derives no lane, resolves no default» | `cantu-core:30-32` |
| **Rechazar** las tres combinaciones ilegales desde esa CLI | **CIEGA.** «enforces no barrier» es el precedente literal | `cantu-core:31` |
| **Escribir** clasificación en el canónico de `cantu-studio` **por la consola** | **NO ciega.** `cantu-studio` está registrado (`project-console/projects.json`, clave `cantu-studio`, root `../../cantu-studio`) y la ruta de edición de este repo escribe su canónico con el motor de aquí. **Así llegaron sus 23 claves `lane` y sus 2 lanes declaradas** | `projects.json`; tabla de C.2 |
| **Ver** la clasificación de `cantu-studio` en la consola | **NO ciega.** El emisor de aquí emite su `.project/` y el sobre lleva su propio modelo | tabla de B.4 |
| **Volumen en juego** | `cantu-studio` tiene **74 runs, 57 vivos** — el mayor conjunto por clasificar de los tres | tabla de C.2 |

### D.3 — Constancia de no escritura

No se escribió, creó, movió ni borró nada en
`C:\Users\chris\Documents\AIW_Workspace\aiw` ni en
`C:\Users\chris\Documents\AIW_Workspace\projects\cantu-studio`. Todos los accesos fueron
`readFileSync`, `wc -l`, `grep` y `find`. **No se ejecutó ninguna herramienta de escritura
contra esas raíces, y no se ejecutó Git.**
**`[NO VERIFICADO]` por md5**: no se tomó una huella antes/después de esos dos árboles, así
que la ausencia de escritura se sostiene en el inventario de comandos de esta sesión, no en
una comparación de hashes.

---

## BLOQUE E — Un cabo de registro

Archivo: `context/aiw-console/records/SUITE-CONTRA-FIXTURES.md` (13 822 bytes, 2026-07-30).

```bash
grep -nE "corrida previa" context/aiw-console/records/SUITE-CONTRA-FIXTURES.md
grep -rn "corrida previa" context/
```

**La línea que hoy está en el archivo, VERBATIM** (`SUITE-CONTRA-FIXTURES.md:46-49`, la
oración de la atribución empieza en `:46` y su cierre en `:47`):

> `Es trabajo del operador (la auditoría de cabina que movió la cola de 45 a 51 runs y cerró el`
> `` `#39`) más el residuo de una corrida previa de la suite. No se commiteó ni se revirtió nada ``
> `` (`H4`). En consecuencia `E1` se verifica en su forma comprobable: **la suite no cambia el árbol** ``
> `— porcelain idéntico antes y después, y los seis artefactos byte a byte idénticos.`

**Veredicto: SIGUE MAL, y no lleva corrección hacia adelante dentro del record.**

- El texto **conserva íntegra** la atribución falsa: «**más el residuo de una corrida previa
  de la suite**».
- **No hay corrección dentro del archivo.** `grep -nE "corrección hacia adelante|CORRECCIÓN|atribu"`
  sobre `SUITE-CONTRA-FIXTURES.md` → **cero coincidencias**. Ningún addendum, ninguna nota,
  ninguna sección posterior lo toca.
- **No hay corrección en ningún otro record.** `grep -rln "SUITE-CONTRA-FIXTURES" context/`
  devuelve **solo dos archivos, y ninguno es un record**: `context/handoffs/aiw-console.md` y
  `context/handoffs/aiw.md`.
- **Lo único que existe es el apunte en el handoff**, `context/handoffs/aiw-console.md:246-250`,
  que dice verbatim: «`records/SUITE-CONTRA-FIXTURES.md` atribuye la línea base sucia del
  `#40` a una corrida previa de la suite. **Es falsa**: eran los 7 archivos de la escritura de
  apertura del run. **Se ignora si la corrección llegó a aplicarse.**» **Se puede cerrar esa
  duda: no llegó a aplicarse.** Y un handoff es efímero y se sobrescribe (`D-038`), así que
  hoy la corrección **no tiene casa estable**.

**El record no se reescribió.** Es una medición fechada del 2026-07-30 y corregirla hacia
atrás es el vicio contrario. Aquí solo se reporta.

---

## BLOQUE F — Línea base de la suite

```bash
npm test
```
(= `node --test`, `package.json:8`. Corrido desde `projects/aiw-console`.)

| Medida | Valor a verificar | **Medido** | ¿Coincide? |
|---|---|---|---|
| `tests` | 325 | **325** | ✔ |
| `pass` | 325 | **325** | ✔ |
| `fail` | 0 | **0** | ✔ |
| `cancelled` / `skipped` / `todo` | — | **0 / 0 / 0** | — |
| `suites` | — | **0** | — |
| `duration_ms` | — | **1630.9753** | — |
| exit code | — | **0** | — |

**Línea base VERDE. Ningún test falla, así que no hay nombres que transcribir. No se arregló
nada.**

Dos observaciones del run, para que no se lean como fallos:
- La salida contiene una línea de stderr sin `✔`: `fatal: not a git repository (or any of the
  parent directories): .git`. **No es un test que falle** —el reparto es 325/325/0 y el exit
  code es 0—: es un test que ejerce la degradación fail-soft de la lectura de Git en una raíz
  temporal.
- Un nombre de test declara la cola congelada de una fixture con cifras propias: «the
  renderer paints the frozen aiw_console folder through the shell hooks (2 objectives, 19
  phases, **51 runs**)». Es una **fixture congelada**, no el canónico: el canónico mide 52
  (A.2). No hay contradicción, pero conviene saberlo antes de tocar conteos.

---

## BLOQUE G — Veredicto de encuadre, para la cabina

### G.1 — ¿Cabe el `#43` en una sesión? **No. Hay que partirlo, y la línea de corte no es una sino dos.**

**Por qué no cabe.** El run declara **cinco superficies + una tabla de configuración por
proyecto**. Medido: eso son al menos **siete archivos de escritura** (`roadmap-core.mjs`,
`roadmap-plan.mjs`, `project.mjs`, `project-console.js`, `project-console.css`, tests de
motor, tests de consola/emisor), sobre una línea base de 325 tests que hay que dejar verde, y
con dos entregables que el precedente hizo en runs distintos (`D-051` hizo esquema+motor+
validador+emisor+vista; **no** hizo una configuración por proyecto editable, que no tiene
precedente ninguno).

**Corte propuesto — dos encargos, y un tercero desgajado:**

**Encargo 1 — LO QUE SE ALMACENA Y LO QUE SE RECHAZA (motor).**
Superficie de escritura: `tools/roadmap/roadmap-core.mjs`, `tools/roadmap/roadmap-plan.mjs`,
tests de motor.
- los cinco campos + `classified_at` entran en `RUN_OPTIONAL_FIELDS`
  ([`roadmap-core.mjs:55`](tools/roadmap/roadmap-core.mjs:55)), con sus vocabularios cerrados
  al lado de `BARRIER_SCOPES` ([`:56`](tools/roadmap/roadmap-core.mjs:56));
- los invariantes que **RECHAZAN**: token fuera de vocabulario, y las tres combinaciones
  ilegales, en el bloque por-run de `checkInvariants`
  ([`:352-383`](tools/roadmap/roadmap-core.mjs:352));
- una mutación `setClassification` con la forma de `setLane`/`setBarrier`
  ([`:946`](tools/roadmap/roadmap-core.mjs:946), [`:1019`](tools/roadmap/roadmap-core.mjs:1019)),
  su entrada en `KNOWN_OPS` ([`roadmap-plan.mjs:29`](tools/roadmap/roadmap-plan.mjs:29)), su
  `case` en `dispatch` ([`:46`](tools/roadmap/roadmap-plan.mjs:46)) y su decisión de
  batcheabilidad ([`:173`](tools/roadmap/roadmap-plan.mjs:173)).

**Encargo 2 — LO QUE SE DERIVA, LO QUE VIAJA Y LO QUE SE VE.**
Superficie de escritura: `tools/projector/project.mjs`,
`project-console/assets/project-console.js`, `project-console/assets/project-console.css`,
tests de emisor y de consola.
- las dos tablas de derivación como **datos**, con la disciplina de
  [`project.mjs:786-789`](tools/projector/project.mjs:786) (escritas una vez, ejecutadas y
  declaradas desde el mismo array), junto a `COLLECTION_STATUS_RULES`
  ([`:790`](tools/projector/project.mjs:790));
- su declaración en `taxonomy_model` ([`:964-1016`](tools/projector/project.mjs:964)), y el
  `PROJECTOR_VERSION` que se mueve ([`:97`](tools/projector/project.mjs:97));
- el **reporte que no rechaza** de runs vivos sin clasificar, en la ranura vacante
  `validation_summary: {}` ([`:1160`](tools/projector/project.mjs:1160));
- la vista mínima en las celdas del drawer
  ([`project-console.js:4262-4296`](project-console/assets/project-console.js:4262)), el chip
  de fila ([`:3350`](project-console/assets/project-console.js:3350)) y el bloque de editor
  concatenado en [`:5278`](project-console/assets/project-console.js:5278).

**Por qué el corte está AHÍ, y no en otro sitio.** Es el único punto donde las superficies de
escritura salen **disjuntas archivo por archivo**: el encargo 1 no abre `project.mjs` ni
`project-console.js`; el encargo 2 no abre `roadmap-core.mjs` ni `roadmap-plan.mjs`. Y no es
un corte arbitrario, sino el que el propio repo ya trazó: **la tabla de derivación de `status`
NO vive en el motor, vive en el emisor** ([`project.mjs:790`](tools/projector/project.mjs:790))
y el cliente la ejecuta desde el sobre
([`project-shell.js:78-99`](project-console/assets/project-shell.js:78)). Poner el `REJECT` en
el motor y el `DERIVE` + el `REPORT` en el emisor sigue la línea que ya existe en vez de
cruzarla. Dependencia: el 2 depende del 1 (necesita las claves admitidas); el 1 es entregable
y verde por sí solo.

**Desgajar `care_budget` a un tercer encargo.** Medido: la tabla se pide como «configuración
POR PROYECTO, **editable desde la consola**» (`CLASIFICACION-DE-RUNS.md:113-117`) y el
`full_description` lo pone «ALSO IN SCOPE». En disco **no hay dónde ponerla**:
- el root del roadmap admite **cinco** claves ([`roadmap-core.mjs:35`](tools/roadmap/roadmap-core.mjs:35));
  meterla ahí la convierte en sexta clave del canónico de los tres proyectos;
- las rutas de escritura de la consola son **tres y están cerradas**
  ([`serve.mjs:124-126`](project-console/serve.mjs:124)), ninguna apunta a un archivo de
  configuración, y `resolveCanonicalWritePath` ([`serve.mjs:258`](project-console/serve.mjs:258))
  refuerza que solo se escribe el canónico registrado, nunca `.project/`.
  Una configuración editable exige **una cuarta ruta de escritura**, que es la frontera más
  guardada de este repo.
Es un encargo propio, y su superficie de escritura (`serve.mjs` + el nuevo archivo de
configuración) es **disjunta de los dos anteriores**.

**Un hueco que la cabina debe resolver ANTES de escribir el ticket, no durante.**
`context/CLASIFICACION-DE-RUNS.md:134-144` declara **PENDIENTE**: «Las tres reglas mecánicas
para runs mixtos […] **NO SE LOCALIZARON EN DISCO**». El `full_description` del `#39` sí
afirma publicarlas. Si el ticket del `#43` las cita, **cita un hueco declarado**. No se
reconstruyen aquí.

**Segunda contradicción a resolver en la cabina, no en el taller.**
`CLASIFICACION-DE-RUNS.md:83` dice «**La consola** las RECHAZA» (las tres combinaciones
ilegales). El `full_description` del `#43` dice «WHAT **THE VALIDATOR** DOES REJECT are the
three illegal combinations». No es lo mismo: rechazar en la consola es una guarda de UI que se
esquiva editando el archivo a mano; rechazar en el validador es un invariante que hace el
archivo inválido. **La medición no elige.** (Recomendación técnica, para lo que valga: el
motor ya es el único punto por el que pasa toda escritura —`serve.mjs:92`, `:418`— así que
poner ahí el rechazo cubre también a la consola, y no al revés.)

### G.2 — QA visual del operador

> **`[NO VERIFICADO]`: la consola no se levantó en este encargo.** El scope era lectura +
> `npm test` + un archivo. Lo que sigue es una **prescripción para el run que construya**, no
> una medición. Los minutos son una **estimación**, no un cronometraje.

**Es exigible, y por dos razones medidas.** (a) El precedente `D-051` dejó un record propio de
correcciones de QA visual (`records/CORRECCIONES-QA-CARRILES-Y-REGLA-DE-IDIOMA.md`, 28 503
bytes), y sus hallazgos están cosidos en el código como `[D-051 QA-A]`
([`project-console.js:3345-3349`](project-console/assets/project-console.js:3345),
[`:3365-3367`](project-console/assets/project-console.js:3365)): **la vista se rompió en QA, no
en tests.** (b) La suite **no** abre un navegador: sus tests de consola corren el DOM por
helpers (`tests/helpers/console-dom.mjs`), así que layout, contraste y desbordes **no están
cubiertos**.

Arranque:

```bash
node project-console/serve.mjs
```

→ `http://127.0.0.1:8788/project-console/index.html` (`start-console.ps1:8`, `:30`).
Los tres proyectos del registro tienen `.project/` emitido y completo (seis archivos cada
uno), así que hay datos que pintar sin re-emitir.

**Qué mirar exactamente, y con qué proyecto — porque los tres dan casos distintos** (cifras de
C.2):

| # | Qué | Dónde | Con qué proyecto | Min. |
|---|---|---|---|---|
| 1 | **El caso «no clasificado» no ensucia nada.** Un run sin ningún campo: ni celda vacía en el drawer, ni chip fantasma en la fila. Es el `if (!laneLabel) return ""` del precedente ([`:5314`](project-console/assets/project-console.js:5314)) | fila + drawer | **`aiw-console`** — sus 52 runs no tendrán clasificación | 3 |
| 2 | **La celda de clasificación en el drawer**, junto a `Run order` / `Current stage` / `Lane` / `Barrier`: que no descoloque la rejilla de celdas ni desborde con el texto más largo (`JUDGED_ACCEPTS`, `PROJECT_SHAPE`, `SEMI_ATTENDED`) | [`:4262-4296`](project-console/assets/project-console.js:4262) | **`aiw`** — ya tiene `Lane` y `Barrier` pintados, es el caso denso | 4 |
| 3 | **El chip de `severity` en la fila** con los chips que ya compiten por esa línea: `#N`, `v3-global-order-tag`, `v3-lane-tag`, `v3-barrier-tag`. **Con el filtro de lane puesto y quitado** — es exactamente donde el precedente falló (`QA-A`: la etiqueta se repetía) | [`:3350-3360`](project-console/assets/project-console.js:3350) | **`aiw`** | 4 |
| 4 | **El derivado y el almacenado no se confunden.** `severity`/`closure_mode` tienen que leerse como calculados, no como campos. Que no haya control de edición para ellos en ningún sitio | drawer + editor | cualquiera | 3 |
| 5 | **Las tres combinaciones ilegales, en el editor.** Elegir cada una y ver el rechazo: que **nombre la combinación** y no diga «blocked» a secas, y que llegue a la fase de preview (donde ya se pintan `warnings`, [`:6196`](project-console/assets/project-console.js:6196)) | [`:5278`](project-console/assets/project-console.js:5278) → [`:6124`](project-console/assets/project-console.js:6124) | **`aiw-console`** (editar el propio repo) | 5 |
| 6 | **La lista que no rechaza.** Los runs vivos sin clasificar aparecen como lista, no como error. Con **57 runs vivos** en `cantu-studio` hay que ver si la superficie aguanta ese volumen o necesita conteo + colapso | vista de cola / overview | **`cantu-studio`** | 4 |
| 7 | **Cambiar de proyecto no deja residuo.** `aiw-console` → `cantu-studio` → `aiw` → `aiw-console`: cero chips de clasificación del anterior. Es el invariante que la suite ya cuida en 8 tests de `shell-*` y que el ojo debe confirmar en la superficie nueva | shell | los tres | 4 |
| 8 | **Un ciclo de escritura real, de punta a punta.** Clasificar un run: preview → apply → la vista se repinta desde el disco re-leído ([`:6350`](project-console/assets/project-console.js:6350)) → `git status` lo muestra como el único cambio | consola completa | **`aiw-console`** | 5 |

**Total estimado: ~30–35 minutos** para el operador, con la consola abierta y los tres
proyectos registrados. Si el `#43` se parte según G.1, **el QA visual cae íntegro en el
encargo 2** (los puntos 1–4, 6, 7) y en el 1 solo el punto 5, en su mitad de motor —el rechazo
se puede ejercer por la ruta HTTP sin pantalla—.

### G.3 — De los dos obstáculos, cuál se resuelve aquí y cuál cruza proyectos

**Obstáculo 1 (`schema_version`) — SE RESUELVE ÍNTEGRAMENTE DENTRO DE ESTE REPO. De hecho ya
está resuelto.** Diagnóstico: la premisa «engine, validator and emitter must either accept
both or that project migrates first» **no se sostiene contra el disco**. No hay una sola
comparación del string en el motor, el validador ni el emisor de este repo (tabla de D.1); la
compuerta es de forma ([`project.mjs:868`](tools/projector/project.mjs:868)); la doctrina está
escrita en dos sitios; y el sobre emitido de `cantu-studio` ya sale con
`jame.roadmap_v3.v0.2-progress` por el mismo `aiw-projector@0.10.0`. **No hay decisión que
cruce proyectos aquí, y no hay migración que esperar.** Lo único que queda es una restricción
de construcción **local a este repo**: al añadir los cinco campos, no introducir una compuerta
por string. Eso se verifica con un test de este repo y con nada más.

**Obstáculo 2 (las dos copias del motor) — OBLIGA A UNA DECISIÓN QUE CRUZA PROYECTOS.**
Diagnóstico: la parte que se puede resolver aquí es la que **no** depende de la otra copia —
esquema, invariantes, derivación, sobre, vista, y la escritura del canónico de `cantu-studio`
**por la consola**, que ya funciona y es cómo llegaron sus 23 claves `lane`—. Lo que **no**
se puede resolver aquí, ni de un lado ni del otro, es que la copia de `cantu-studio` admita
las claves nuevas: mientras su `RUN_ALLOWED_FIELDS`
([`cantu-core:43`](../../cantu-studio/tools/roadmap/roadmap-core.mjs:43)) no las liste, **su
pre-flight rechaza el archivo entero** en cuanto un run lleve `correctness_model`, y su CLI
deja de poder editar su propio roadmap. **Eso es un cambio dentro de `cantu-studio`, es
trabajo de su hilo, y aquí solo se nombra.**

Lo que la medición **sí** aporta a esa decisión, sin tomarla: **el precedente exacto ya
ocurrió y tiene nombre en disco** — `[lanes: TOLERATE, NOT ADOPT]`,
[`cantu-core:27-35`](../../cantu-studio/tools/roadmap/roadmap-core.mjs:27). La copia de
`cantu-studio` absorbió `lanes`/`lane`/`barrier` **listándolos y nada más**: no deriva, no
resuelve default, no impone invariante, no ofrece op de escritura. Existe por tanto una forma
ya probada de que la segunda copia no se ponga roja sin adoptar el modelo. **Cuál se aplique
al `#43` no es decisión de este encargo.**

**Cuantificación de lo que está en juego, para que la decisión se tome con cifras:**
`cantu-studio` tiene **74 runs, 57 vivos** — el mayor conjunto por clasificar de los tres
(`aiw-console` 52/10, `aiw` 42/19).

### G.4 — Qué de este ticket no fue ejecutable como estaba escrito

1. **A.1 — «deriva del canónico el run cuyo `queue_order` sea 43».** `roadmap/roadmap.json`
   **no tiene un array `runs`**: los runs viven anidados `objectives → phases → runs`, y
   `queue_order` es un espacio **global** que atraviesa los tres niveles. Interpretado:
   aplanar el árbol y buscar en el resultado. Se documenta porque el aplanado es la forma
   canónica de leer este archivo ([`roadmap-core.mjs:101`](tools/roadmap/roadmap-core.mjs:101))
   y cualquier cifra de A.2 depende de haberlo hecho igual.
2. **A.4 — «`D-001`..`D-058` sin huecos».** Los encabezados `D-*` son **59**, no 58.
   Interpretado «entradas numeradas» como **números `D-NNN` distintos**, no como encabezados:
   el extra es `D-010-enmienda` (`DECISIONES.md:60`), una enmienda a `D-010`. Con esa lectura
   el valor heredado es exacto. Se reportan ambas cifras para que no vuelva a parecer un hueco.
3. **B.3 — «en qué forma reporta —lo que RECHAZA frente a lo que solo LISTA—».** La pregunta
   presupone que el validador tiene los dos canales. **No los tiene:** `checkInvariants` solo
   devuelve `errors` ([`:250`](tools/roadmap/roadmap-core.mjs:250), [`:505`](tools/roadmap/roadmap-core.mjs:505)).
   Interpretado como: reportar la **ausencia** del canal de listado, localizar el único canal
   advisory que existe (`warnings` por mutación) y nombrar la ranura vacante donde el reporte
   encajaría (`validation_summary: {}`). La respuesta a «si el validador ya sabe distinguirlas»
   es **no**, y eso cambia el tamaño del run.
4. **B.4 — «qué tablas VERSIONADAS transporta».** `taxonomy_model` **no lleva campo de versión
   propio**. Interpretado «versionada» por sus dos ejes reales: `generated_from`
   (`aiw-projector@0.10.0`, que `§6` obliga a mover) y `model` (el identificador que el árbol
   se da a sí mismo). Se transcribe la tabla completa para que el ticket no tenga que
   adivinar la forma.
5. **B.4/C.1 — «el vocabulario de `status`» como precedente único.** Medido: hay **dos**
   mecanismos de transporte distintos y el ticket los trata como uno. `lanes` viaja **como
   dato del proyecto dentro del árbol** ([`project.mjs:1060`](tools/projector/project.mjs:1060));
   `status` viaja **como vocabulario + tabla ejecutable en `taxonomy_model`**
   ([`:964-1016`](tools/projector/project.mjs:964)). **`barrier` no viaja de ninguna de las
   dos formas: su vocabulario no se declara en el sobre.** El `#43` pide la segunda forma, así
   que el precedente aplicable es el de `status`, no el de `lanes` — y hay que decirlo porque
   el `full_description` remite al run de `lane`/`barrier` como modelo de todo.
6. **D.1 — «en qué puntos se compara o se asume ese valor».** La respuesta honesta es un
   **negativo**: en ninguno. Interpretado como enumerar los puntos donde el valor se **nombra**
   (dos allowlists), se **lee y se transporta sin comparar** (`declaredRoadmapModel`), se usa
   como **fallback** o como **texto de error**, y donde está la compuerta **real** (de forma).
   Un negativo no verificado se lee igual que uno no medido, así que se dan las líneas.
7. **AVISO del bloque B — «`aiw-console` contiene UN fork descartado».** Contiene **tres**
   árboles de consola que no son la consola viva, no uno: el fork `D-035`
   (`docs/project-console/`), el prototipo retirado `D-048` (`console/`) y el tooling viejo
   (`tools/project-console/`) — y las 3087 líneas que `D-035` llama residuo están en el
   **tercero**, no en el primero. Interpretado: declarar los tres, dar la fuente de autoridad
   de cada uno (`records/PORT-IDENTICO-CONSOLA-O4-P11.md:50-52`) y probar la exclusión con una
   medición independiente del texto de los records — **cero apariciones de `lane`/`barrier` en
   los tres**, cuando la consola viva tiene 263 y 7.
8. **D.2 — «el motor existe en dos copias: este repo tiene core+plan, la CLI vive solo en
   `cantu-studio`».** El disco dice que hay **dos copias completas del motor** (core+plan en
   cada repo) **más** la CLI solo allá, y que esa CLI importa el motor **de su propio repo**
   ([`roadmap-edit.mjs:51`](../../cantu-studio/tools/roadmap/roadmap-edit.mjs:51)). Interpretado
   como medir las cinco piezas y su conteo de líneas por separado, porque «una copia del motor
   y una CLI» y «dos motores y una CLI» no tienen el mismo remedio.
9. **Cifras del `full_description` que el ticket no manda verificar pero que se cruzaron al
   medir C.2 y se reportan por si el ticket las hereda:** «fifty runs of cantu-studio carry no
   lane key» → el disco dice **51**; «roughly 89 live runs across three projects» → el disco
   dice **86** (10 + 19 + 57), sobre **168** runs totales. Ninguna de las dos altera la
   conclusión que sostienen.
10. **Bloque G — naturaleza de las respuestas.** G.1, G.2 y G.3 piden **juicio de encuadre**,
    no medición. Se responden apoyando cada afirmación en una cifra o una `ruta:línea` de los
    bloques anteriores, y **los minutos de G.2 son una estimación declarada**, no un
    cronometraje: la consola no se levantó en este encargo.

---

## Qué NO se midió, y por qué

- **`[NO VERIFICADO]` que la consola pinte algo en pantalla.** No se levantó
  `project-console/serve.mjs` en este encargo: el scope era lectura, `npm test` y un archivo.
  Todo lo del bloque B.5 y C.1(5) es **lectura de código**, no observación de píxeles. La
  misma advertencia consta en `context/handoffs/aiw-console.md:265-266`.
- **`[NO VERIFICADO]` el estado de Git.** El ticket lo pone fuera de alcance en cualquier
  forma —«ni lectura de historia»— y lo aporta el operador. No se corrió `git status`, así que
  este encargo **no puede afirmar** que su única modificación en el árbol sea este archivo;
  solo que no invocó ninguna herramienta de escritura sobre otra ruta.
- **`[NO VERIFICADO]` por md5 la no escritura en `aiw` y `cantu-studio`.** No se tomó huella
  antes/después de esos dos árboles (ver D.3).
- **`[NO VERIFICADO]` el contenido del record del precedente.**
  `records/CARRILES-Y-BARRIERS-ROADMAP.md` (27 931 bytes) se **nombra** como el record de
  `D-051`, pero el bloque C se resolvió **por búsqueda de texto en el código**, como el ticket
  exige. No se leyó ese record de punta a punta y ninguna cifra de aquí sale de él.
- **`[NO VERIFICADO]` las tres reglas mecánicas de runs mixtos.** No están en disco:
  `context/CLASIFICACION-DE-RUNS.md:134-144` declara el hueco. **No se reconstruyeron.**
- **`[NO VERIFICADO]` el `validation_summary` real de otro proyecto.** Se leyó que es `{}` por
  código ([`project.mjs:1160`](tools/projector/project.mjs:1160)); no se comprobó archivo por
  archivo en los tres `.project/`.
- **`[NO VERIFICADO]` el interior de `cantu-studio/tools/project-console/`** y del resto de su
  toolchain: se leyeron **solo** sus tres archivos de `tools/roadmap/` y su canónico, que es a
  lo que el bloque D da alcance.
