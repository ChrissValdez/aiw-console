# MEDICIÓN PREVIA A LA CLASIFICACIÓN — los 21 `planned` de `aiw`

**Fecha de la medición:** 2026-08-01 · **Sujeto:** `aiw/roadmap/roadmap.json`, los 21 runs
con `status: "planned"` · **Naturaleza:** encargo de taller, **LECTURA ÚNICAMENTE** sobre
`aiw` y sobre `aiw-console`. No se escribió un byte en `aiw`. No se ejecutó git en ninguna
forma que escriba. No se tocó el roadmap, ni `.project/`, ni el status de ningún run, ni el
orden de la cola. No se corrió la suite de ningún proyecto. · **Máquina:** PC (Windows 10,
`C:\Users\chris\Documents\AIW_Workspace\`).

> **Este encargo NO CLASIFICA.** No asigna ningún valor de vocabulario de clasificación, no
> deriva nada, y no propone ninguna regla para runs mixtos. Prepara lo objetivo para que el
> operador clasifique con datos delante.
>
> **Ninguna cifra heredada del ticket se dio por buena.** Todas se midieron en disco y se
> reportan con su comando. Donde discrepan, gana el disco.
>
> **Único archivo escrito por este encargo:** este record.

Ruta base de los caminos relativos: la raíz del workspace, `AIW_Workspace/`.

---

## BLOQUE 0 — Guardas de IDENTIDAD, y la población re-medida

### 0.a — GUARDA QUE ABORTA: **PASA**. El encargo continúa.

Los cinco `run_id` existen en `aiw/roadmap/roadmap.json`, **cada uno exactamente una vez
como declaración** (`"run_id": …` dentro de `objectives → phases → runs`), sin duplicados.

```bash
node -e "const r=JSON.parse(require('fs').readFileSync('roadmap/roadmap.json','utf8'));const R=[];for(const o of r.objectives)for(const p of o.phases||[])for(const x of p.runs||[])R.push(x);for(const t of ['RUN-AIW-SHARED-WORKING-BRANCH-001','RUN-AIW-PER-PROJECT-PUSH-001','RUN-AIW-PUSH-IS-PART-OF-CLOSURE-001','RUN-AIW-INTAKE-001','RUN-AIW-PROVIDER-PER-ROLE-001'])console.log(t,R.filter(x=>x.run_id===t).length)"
```

| `run_id` | declaraciones | `queue_order` | objetivo · fase | línea |
|---|---|---|---|---|
| `RUN-AIW-SHARED-WORKING-BRANCH-001` | **1** | 28 | O3 · O3.P7 | `aiw/roadmap/roadmap.json:383` |
| `RUN-AIW-PER-PROJECT-PUSH-001` | **1** | 29 | O3 · O3.P8 | `aiw/roadmap/roadmap.json:398` |
| `RUN-AIW-PUSH-IS-PART-OF-CLOSURE-001` | **1** | 30 | O3 · O3.P8 | `aiw/roadmap/roadmap.json:407` |
| `RUN-AIW-INTAKE-001` | **1** | 31 | O3 · O3.P9 | `aiw/roadmap/roadmap.json:424` |
| `RUN-AIW-PROVIDER-PER-ROLE-001` | **1** | 32 | O3 · O3.P10 | `aiw/roadmap/roadmap.json:439` |

Los cinco están `planned`. Duplicados de `run_id` en todo el archivo: **0**.

`RUN-AIW-PER-PROJECT-PUSH-001` aparece en **3 líneas** del archivo: 1 declaración
(`:398`) y 2 aristas `depends_on` que lo apuntan (`:414`, `:556`). Esa multiplicidad es de
aristas, no de identidad.

### 0.b — MEDICIÓN sin condición de parada

```bash
node -e "const fs=require('fs'),c=require('crypto');const b=fs.readFileSync('roadmap/roadmap.json');const r=JSON.parse(b.toString('utf8'));const R=[];for(const o of r.objectives)for(const p of o.phases||[])for(const x of p.runs||[])R.push(x);const st={};R.forEach(x=>st[x.status]=(st[x.status]||0)+1);const q=R.map(x=>x.queue_order),u=new Set(q),m=[];for(let i=1;i<=Math.max(...q);i++)if(!u.has(i))m.push(i);const ids=new Set(R.map(x=>x.run_id));let e=0,d=[];R.forEach(x=>(x.depends_on||[]).forEach(y=>{e++;if(!ids.has(y))d.push(y)}));console.log({total:R.length,st,min:Math.min(...q),max:Math.max(...q),unique:u.size,gaps:m,objectives:r.objectives.length,phases:r.objectives.reduce((a,o)=>a+o.phases.length,0),edges:e,dangling:d.length,bytes:b.length,md5:c.createHash('md5').update(b).digest('hex')})"
```

| Medida | Cifra heredada del ticket | **Medido en disco** | ¿Coincide? |
|---|---|---|---|
| Runs totales | 46 | **46 runs** | ✔ |
| `status: "completed"` | 25 | **25 runs** | ✔ |
| `status: "planned"` | 21 | **21 runs** | ✔ |
| `status: "active"` | — | **0 runs** (el token no aparece) | — |
| `status: "blocked"` | — | **0 runs** (el token no aparece) | — |
| `queue_order` mín / máx | `1..46` | **1 / 46** | ✔ |
| `queue_order` únicos | — | **46 distintos, 0 duplicados** | — |
| `queue_order` huecos | denso | **`[]` — ninguno; contiguo `1..46`** | ✔ |
| `git log -1 --oneline` de `aiw` | `17b6dfa` | **`17b6dfa`** | ✔ |
| `git status --porcelain` de `aiw` | — | **vacío: 0 entradas** | — |

Medidas de paso, no pedidas por el ticket: **6 objetivos** (`O1`, `O2`, `O3`, `O5`, `O6`,
`O7` — **no hay `O4`** en este roadmap), **33 fases**, **21 aristas `depends_on`**, **0
colgantes**, 117 362 bytes, 707 líneas, EOL **CRLF**, md5
`fb2a7f5dde66254d7147201dba36b81a`.

**Las cinco cifras heredadas del ticket coinciden con el disco.** Se reportan medidas, no
heredadas.

---

## BLOQUE 1 — La grafía EXACTA de los seis campos, contra CÓDIGO

### 1.1 — El código se localizó. Dos direcciones, y declaran lo mismo

El motor/validador y la tabla de vocabularios viven en dos archivos distintos de
`aiw-console`, y el primero **re-exporta** del segundo:

- **Motor y validador:** `projects/aiw-console/tools/roadmap/roadmap-core.mjs`
  — declara la allowlist de claves de run y es quien **rechaza** una clave no permitida.
- **Tabla de campos y vocabularios:** `projects/aiw-console/tools/classification/classification.mjs`
  — un módulo hoja que no importa nada, para que lo carguen los dos runtimes.

La allowlist que un run debe pasar es `RUN_ALLOWED_FIELDS`, y su enforcement es una sola
línea:

```js
// projects/aiw-console/tools/roadmap/roadmap-core.mjs:447-451
for (const key of Object.keys(run)) {
  if (!RUN_ALLOWED_FIELDS.includes(key)) {
    errors.push(`${runLabel} carries unexpected field ${key}`);
  }
}
```

`RUN_ALLOWED_FIELDS` se compone en `roadmap-core.mjs:125-126`:

```js
export const CANONICAL_RUN_KEY_ORDER = [...RUN_REQUIRED_FIELDS, ...RUN_OPTIONAL_FIELDS];
export const RUN_ALLOWED_FIELDS = CANONICAL_RUN_KEY_ORDER;
```

### 1.2 — Los seis campos de clasificación, VERBATIM, con `ruta:línea` de código

Cada campo se declara en **dos** sitios de código que coinciden carácter a carácter:

| # | Grafía exacta | `roadmap-core.mjs` (allowlist) | `classification.mjs` (tabla) |
|---|---|---|---|
| 1 | `correctness_model` | `tools/roadmap/roadmap-core.mjs:93` | `tools/classification/classification.mjs:56` |
| 2 | `work_type` | `tools/roadmap/roadmap-core.mjs:94` | `tools/classification/classification.mjs:57` |
| 3 | `blast_radius` | `tools/roadmap/roadmap-core.mjs:95` | `tools/classification/classification.mjs:58` |
| 4 | `failure_surfaces` | `tools/roadmap/roadmap-core.mjs:96` | `tools/classification/classification.mjs:59` |
| 5 | `external_effects` | `tools/roadmap/roadmap-core.mjs:97` | `tools/classification/classification.mjs:60` |
| 6 | `classified_at` | `tools/roadmap/roadmap-core.mjs:98` | `tools/classification/classification.mjs:61` |

Los dos bloques, transcritos:

```js
// projects/aiw-console/tools/roadmap/roadmap-core.mjs:90-101
export const RUN_OPTIONAL_FIELDS = [
  "lane",
  "barrier",
  "correctness_model",
  "work_type",
  "blast_radius",
  "failure_surfaces",
  "external_effects",
  "classified_at",
  "closeout_result",
  "progress",
];
```

```js
// projects/aiw-console/tools/classification/classification.mjs:55-62
export const CLASSIFICATION_STORED_FIELDS = [
  "correctness_model",
  "work_type",
  "blast_radius",
  "failure_surfaces",
  "external_effects",
  "classified_at",
];
```

**Cuatro observaciones que el código declara y que conviene no perder:**

1. **Los seis son OPCIONALES.** Están en `RUN_OPTIONAL_FIELDS`, no en `RUN_REQUIRED_FIELDS`
   (`roadmap-core.mjs:71`). El comentario que los precede lo dice sin ambigüedad:
   *«ABSENCE IS THE DEFAULT»* (`roadmap-core.mjs:81`).
2. **Ausente siempre es legal; presente-con-valor-fuera-de-vocabulario no lo es.** Toda
   comprobación está condicionada a `in run` (`roadmap-core.mjs:466-491`).
3. **`severity` y `closure_mode` NO están en la allowlist**, y el código dice que su
   ausencia es *«by construction, not by omission»* (`roadmap-core.mjs:85-86`); en
   `classification.mjs:53-54`, *«they are never stored»*. Un run que los llevara sería
   rechazado por `roadmap-core.mjs:449`.
4. **El motor valida lo almacenado; no deriva.** *«The engine validates what is STORED; it
   does not derive»* (`roadmap-core.mjs:115`).

### 1.3 — Las otras claves que la allowlist admite y que este roadmap NO usa

`RUN_ALLOWED_FIELDS` tiene **17 claves**: 7 obligatorias (`roadmap-core.mjs:71`) + 10
opcionales (`roadmap-core.mjs:90-101`). El roadmap de `aiw` usa **9**.

Claves de run **admitidas y no usadas por `aiw/roadmap/roadmap.json`** — **8**:

| Clave | Declarada en | Nota del código |
|---|---|---|
| `correctness_model` | `roadmap-core.mjs:93` | campo de clasificación |
| `work_type` | `roadmap-core.mjs:94` | campo de clasificación |
| `blast_radius` | `roadmap-core.mjs:95` | campo de clasificación |
| `failure_surfaces` | `roadmap-core.mjs:96` | campo de clasificación |
| `external_effects` | `roadmap-core.mjs:97` | campo de clasificación; lista, forma validada, contenidos no (`roadmap-core.mjs:476-485`) |
| `classified_at` | `roadmap-core.mjs:98` | campo de clasificación; string no vacío, sin formato impuesto (`roadmap-core.mjs:486-491`) |
| `closeout_result` | `roadmap-core.mjs:99` | solo válido en runs terminales (`roadmap-core.mjs:710`) |
| `progress` | `roadmap-core.mjs:100` | campo de avance |

Claves de run **admitidas y sí usadas**: las 7 obligatorias (`run_id`, `queue_order`,
`title`, `summary`, `full_description`, `status`, `depends_on`) en los 46 runs, más `lane`
en **6 runs** (los 3 `completed` `#18`, `#19`, `#27` y los 3 `planned` `#37`, `#40`, `#46`;
todos con valor `DOCUMENTATION`) y `barrier` en **2 runs** (`#12`, `barrier: "global"`;
`#18`, `barrier: "lane"` — ambos `completed`).

En la raíz, la allowlist es `ROOT_ALLOWED_FIELDS` (`roadmap-core.mjs:55`) con 6 claves; el
roadmap de `aiw` usa 5 y **no usa `care_budget`**.

---

## BLOQUE 2 — Censo de mixtos, contra la población de HOY

**Cobertura: los 21 `planned`, incluidos los cuatro nuevos (`#28`, `#30`, `#31`, `#32`) y
el `#29` movido desde O6. Ninguno sin fila.**

### 2.1 — Los tipos, en las palabras de los propios runs

Los tipos no se inventaron: son las frases que los runs usan de sí mismos, detectadas por
marcador literal.

| Tipo | Marcador literal en el `full_description` |
|---|---|
| **medición / re-verificación** | `THE DELIVERABLE IS A MEASUREMENT` · `VERIFY THE REAL FIGURES` · `VERIFY THOSE COUNTS` · `re-measured against disk` · `RE-COUNTS on disk` |
| **mecanismo (código o paso nuevo en `aiw`)** | `MECHANISM` · `which is code in aiw` — y su negación explícita, `No mechanism under CONST §4` |
| **configuración** | `changes configuration` · `config.json DECLARES` · `enabled per project` |
| **documento** | `documentation is paper (D-055)` |
| **acto sobre documento normativo** | `an entry in DECISIONES.md records` · `MUST BE SETTLED IN DECISIONES.md` · `amended in both packs` · `IS DEROGATED` / `retired BY NAME` |
| **decisión de diseño abierta dentro del run** | `is this run's central decision` · `has to resolve rather than inherit` · `MUST DECIDE RATHER THAN ASSUME` |

Corrección de método, declarada: el marcador `MECHANISM` también aparece dentro de la frase
`No mechanism under CONST §4`. Los runs que llevan esa negación **no** se contaron como
mecanismo. Son 6: `#22`, `#29`, `#37`, `#40`, `#45`, `#46`. Los otros 15 sí.

### 2.2 — El conteo

| | runs | cuáles |
|---|---|---|
| **De UN SOLO tipo** | **4** | `#22`, `#37`, `#40`, `#45` |
| **MIXTOS** | **17** | los 17 restantes; `#46` con duda declarada (§2.4) |
| **Total** | **21** | ✔ cobertura completa |

### 2.3 — Los 17 mixtos: qué mezclan, en sus propias palabras

| `#N` · título verbatim | tipos que mezcla | proporción aparente |
|---|---|---|
| **#23** · *Make the scope pre-flight demand a real match* | mecanismo (*«THIS RUN ADDS MECHANISM»*) + acto normativo como **compuerta** (*«CANNOT EXECUTE until an entry in DECISIONES.md records its incident»*) | el entregable es 1 guard *«Small, and with a test»*; la compuerta ocupa 1 de los 2 párrafos del texto |
| **#28** · *Let consecutive runs share one working branch so their work chains* | mecanismo + decisión abierta (*«WHAT THIS RUN MUST DECIDE RATHER THAN ASSUME»*) + medición (*«VERIFY THE REAL FIGURES AGAINST DISK»*) + compuerta normativa | 5 párrafos: 2 de mecanismo medido, 1 entero a la decisión abierta, 1 a la relación con lotes, 1 a la compuerta |
| **#29** · *Turn on push per project* | configuración + decisión operativa (*«This run changes configuration and the operating decision behind it»*), con rama condicional a mecanismo (*«If activation turns out to require new code rather than a flag, that code IS mechanism»*) | 3 de 4 párrafos son la justificación operativa; el cambio es 2 banderas booleanas |
| **#30** · *A failed push escalates to human review instead of closing the run silently* | mecanismo + decisión abierta (*«WHICH outcome … is this run's decision»*) + medición (*«VERIFY THOSE COUNTS AGAINST kernel.mjs»*) + compuerta normativa | 5 párrafos: 3 de mecanismo y frontera, 1 de decisión abierta, 1 de compuerta |
| **#31** · *The intake: turn a roadmap run into an executable contract* | mecanismo + medición (*«VERIFY THAT LIST AGAINST kernel.mjs»*) + acto normativo como **adjudicación previa** (*«IS AN OPEN QUESTION THAT MUST BE SETTLED IN DECISIONES.md BEFORE THIS RUN EXECUTES»*) | 4 párrafos de qué lee y qué emite; 1 párrafo entero, el último, es la adjudicación |
| **#32** · *Declare providers in config and choose one per role in the ticket* | mecanismo + configuración (*«config.json DECLARES the available providers»*) + medición + compuerta normativa | 1 párrafo medido, 1 de forma (config+ticket), 1 de guarda de seguridad, 1 de compuerta |
| **#33** · *Give every run an identity its log folder cannot silently overwrite* | mecanismo + medición (*«must be re-measured against disk before it executes»*) + compuerta normativa **parcial** (*«ITS INCIDENT IS DOCUMENTED; ITS DELETION CRITERION IS NOT»*) | 3 párrafos de incidente forense y orden; 1 de compuerta; 1 de corrección a re-medir |
| **#34** · *Write one manifest of identity and outcome per run* | mecanismo + medición (misma nota de re-medición) — compuerta **cumplida** (*«THREE FIXED CRITERIA COMPLETE»*) | el texto es mayormente la declaración de los tres criterios ya completos |
| **#35** · *Record tokens and cost per run, if the provider exposes them* | mecanismo + medición como **precondición** (*«whether usage figures are available … is not established anywhere in this system»*) + compuerta normativa | 1 párrafo de la precondición y su derecho a morir, 1 de dónde van los números, 1 de por qué, 1 de compuerta |
| **#36** · *Expose signals the reviewer can query instead of trusting self-reports* | mecanismo + compuerta normativa | 3 párrafos de mecanismo y frontera anti-detector, 1 de compuerta |
| **#38** · *Add the category field and settle its vocabulary* | mecanismo + acto normativo como **ENTREGABLE** (*«one name must win, amended in both packs»*) + compuerta normativa + medición (*«RE-COUNTS on disk»*) + decisión abierta (*«a measured tension that this run has to resolve rather than inherit»*) | **el más mezclado: 5 tipos en 7 párrafos**; 1 párrafo entero al vocabulario, 1 a la tensión, 1 a la compuerta, 1 a la corrección numérica |
| **#39** · *Let the operator group runs into batches, and let the batch decide the branch* | mecanismo + compuerta normativa | 4 párrafos de modelo y reglas firmes, 1 de compuerta |
| **#41** · *Make the queue survive the terminal that launched it* | mecanismo + acto normativo como **ENTREGABLE** (*«IS DEROGATED BY THIS LAUNCHER ON THE DAY IT SHIPS … the old rule is retired BY NAME»*) — compuerta **cumplida** | 1 párrafo de qué rompe, 3 de los criterios completos, 1 entero de la derogación |
| **#42** · *Recover from a lock whose owner is gone* | mecanismo + compuerta normativa **parcial** (mismo texto que `#33`: incidente sí, criterio de borrado no) | 3 párrafos de mecanismo y regla de fallar cerrado, 1 de compuerta |
| **#43** · *Give each run its own worktree so runs can overlap inside one repository* | mecanismo + compuerta normativa | 3 párrafos de mecanismo y asserts, 1 de compuerta |
| **#44** · *Teach the kernel to read lanes and barriers* | mecanismo + compuerta normativa | 3 párrafos de qué leería, 1 de compuerta |
| **#46** · *Document how to run and audit an unattended window* | documento + acto normativo como entregable (*«A correction this document must carry explicitly … IS DEROGATED»*) — **con duda, ver §2.4** | 2 párrafos de contenido, 1 entero a la corrección/derogación, 1 de cuándo escribirlo |

Los 4 de un solo tipo, con la frase que los cierra:

- **#22** *Run the first real objective against a large repository with a test net* — medición.
  *«No mechanism under CONST §4: this run measures, it does not add code or a new step»*.
- **#37** *Document what a run writes and where* — documento. *«documentation is paper (D-055)»*.
- **#40** *Document categories and batches* — documento. Misma frase.
- **#45** *Run real long unattended sessions and count them honestly* — medición.
  *«this run EXERCISES the mechanisms and measures the result; it adds none of its own»*.

### 2.4 — Las dudas, declaradas y no redondeadas

- **`#46` está en el límite y se reporta CON la duda.** Lleva la marca de documento
  (*«documentation is paper»*) y a la vez obliga a que el documento **cargue** una
  derogación. Pero la derogación la **efectúa** `#41` (*«BY THIS LAUNCHER ON THE DAY IT
  SHIPS»*); `#46` solo la **registra**. Contado como mixto por precaución; leerlo como de un
  solo tipo también es defendible. **La decisión no es de este encargo.**
- **`#22` menciona mecanismos ajenos** (*«the manifest, mid-run signals, worktrees, long
  unattended sessions»*) pero como destinatarios de su medición, no como trabajo propio; su
  frase de cierre lo excluye explícitamente. Contado como de un solo tipo.
- **La compuerta normativa no es lo mismo que el entregable normativo**, y este record no
  las colapsa. Ver §2.5.

### 2.5 — QUÉ MEZCLAS SE REPITEN

Ordenadas por frecuencia. Es lo que el hilo vecino pidió.

| Mezcla | runs | cuáles |
|---|---|---|
| **mecanismo + acto sobre `DECISIONES.md` como COMPUERTA PREVIA** | **13** | `#23`, `#28`, `#30`, `#31`, `#32`, `#33`, `#35`, `#36`, `#38`, `#39`, `#42`, `#43`, `#44` |
| **mecanismo + obligación de re-medición declarada** | **8** | `#28`, `#30`, `#31`, `#32`, `#33`, `#34`, `#35`, `#38` |
| **mecanismo + decisión de diseño abierta dentro del run** | **4** | `#28`, `#30`, `#31`, `#38` |
| **mecanismo + acto normativo como ENTREGABLE** | **2** | `#38`, `#41` |
| **mecanismo + configuración** | **1** | `#32` |
| **documento + acto normativo como entregable** | **1** | `#46` (con duda) |
| **configuración + decisión operativa** | **1** | `#29` |

Sub-reparto de la mezcla dominante, porque las 13 no son homogéneas y colapsarlas perdería
la distinción:

- **compuerta COMPLETA pendiente** (faltan los tres criterios): 10 — `#23`, `#28`, `#30`,
  `#32`, `#35`, `#36`, `#38`, `#39`, `#43`, `#44`.
- **compuerta PARCIAL** (incidente documentado, criterio de borrado no): 2 — `#33`, `#42`,
  ambos con la frase idéntica *«ITS INCIDENT IS DOCUMENTED; ITS DELETION CRITERION IS NOT»*.
- **adjudicación previa de otra naturaleza** (no falta el incidente: falta decidir si la
  regla aplica): 1 — `#31`.
- **compuerta ya CUMPLIDA**, fuera de las 13: 2 — `#34`, `#41`, ambos con
  *«THREE FIXED CRITERIA COMPLETE»*.
- **sin compuerta**: 6 — `#22`, `#29`, `#37`, `#40`, `#45`, `#46`.

10 + 2 + 1 + 2 + 6 = **21** ✔

### 2.6 — «¿Algún run mezcla código con acto sobre un documento normativo?»

**Sí, y en DOS formas que no deben colapsarse.** Es la respuesta directa a la pregunta con
la que se van a escribir las reglas.

**Forma (i) — el acto normativo es PRECONDICIÓN, no entregable. 13 runs.**
El run dice literalmente que **no puede ejecutarse** hasta que alguien escriba una entrada
en `DECISIONES.md`. El trabajo del run sigue siendo solo código. Fórmula recurrente,
verbatim de `#28:439` y repetida casi palabra por palabra en `#30`, `#32`, `#35`, `#43`,
`#44`:

> *«It CANNOT EXECUTE until an entry in DECISIONES.md records an incident with the four
> fields of CONST:30-32, its deletion criterion in the form it is removed if X (CONST:33),
> and its declared line budget against the ceiling»*

**Forma (ii) — el acto normativo es ENTREGABLE del propio run. 2 runs, y solo 2.**

- **`#38`** — *«THIS RUN ABSORBS THE VOCABULARY ITEM … one name must win, amended in both
  packs»*. Enmendar dos paquetes de vocabulario es trabajo del run, no compuerta.
  La nota *REFRAMED 2026-07-31* añade una segunda obligación normativa:
  *«Before it executes it must first decide, against D-057, whether a stored category field
  is warranted at all»*.
- **`#41`** — *«DEROGATION, WRITTEN RATHER THAN LEFT TO COLLIDE … the old rule is retired
  BY NAME, not left coexisting with its contradiction»*. La derogación ocurre *«ON THE DAY
  IT SHIPS»*: es efecto del run.

`#31` es un tercer caso y **no es ninguna de las dos**: lo que falta no es un incidente sino
una adjudicación sobre si `CONST §4` alcanza a un componente nuevo —
*«AN INTAKE IS NONE OF THOSE FOUR»* — y el texto añade que
*«it is not resolved by whoever happens to pick this run up»*. Se reporta aparte.

---

## BLOQUE 3 — Consumidores por run: NÚMEROS, con unidad y alcance

**PROHIBIDO EN ESTE BLOQUE, y se cumple:** ningún conteo de aquí se traduce a etiqueta
alguna. Se entregan números. La traducción no es de este encargo.

### 3.1 — Las cuatro unidades, y cómo se midieron

| Unidad | Definición operativa | Comando |
|---|---|---|
| **A · aristas entrantes** | runs de este roadmap con el `run_id` en su `depends_on` | recorrido del JSON |
| **B · menciones en prosa sin arista** | otros runs cuyo `title`+`summary`+`full_description` casan con un término declarado, **descontados los que ya tienen arista** | regex por run, término declarado en la tabla |
| **C · sitios de código** | líneas de `aiw/*.mjs` que llaman o leen la pieza, con `ruta:línea` | `grep -n` |
| **D · archivos que referencian el documento** | archivos del árbol de `aiw` que nombran el documento | `grep -rl` |

Ningún `run_id` literal aparece en la prosa de otro run: **0 coincidencias en los 46**. Por
eso la unidad B se midió por **término descriptivo declarado**, no por identificador. El
término va en la tabla para que el conteo sea reproducible y discutible.

### 3.2 — La tabla, los 21 `planned`

| `#N` | A · aristas | B · prosa sin arista (término) | C / D · consumidores de la pieza | unidad usada |
|---|---|---|---|---|
| **#22** | **1** (`#23`) | **0** (`real load\|large repositor`) | no aplica: no toca pieza | A |
| **#23** | **0** | **0** (`scope pre-?flight`) | **C = 4 sitios**: `parseGlobs` def `aiw/kernel.mjs:150`, llamada `:272`; `evaluateGuards` def `:183`, llamada `:363`. Más **2 archivos de test**: `aiw/tests/scope.test.mjs`, `aiw/tests/guards.test.mjs` | A + C |
| **#28** | **0** | **0** (`shared branch\|reusable branch`) | **C = 7 líneas** de preparación de rama en `aiw/kernel.mjs`: `:312`, `:314`, `:318`, `:330`, `:331`, `:333`, `:334`; más el pre-flight D-012 en `:321-328`. **1 archivo de test**: `aiw/tests/preflight.test.mjs` (2 tests) | A + C |
| **#29** | **2** (`#30`, `#38`) | **0** (`push activation\|until push is on`) | **C = 2 lecturas** de la bandera: `aiw/kernel.mjs:430`, `:433`. **2 entradas** en `aiw/config.json`, ambas `"push": false` | A + C |
| **#30** | **0** | **0** (`failed push\|push fail`) | **C = 1 sitio**: `aiw/kernel.mjs:432`. Su salida (`pushNote`) tiene **1 consumidor**: `aiw/kernel.mjs:447` (`summary.md`); **0 lectores de código** de `summary.md` | A + C |
| **#31** | **0** | **0** (`\bintake\b`) | **C = 0**: `kernel.mjs`, `queue.mjs`, `create-sandbox.mjs` y `config.json` **no contienen la cadena `roadmap`** (0 coincidencias). Del otro lado, **7 secciones de ticket** que el kernel sí parsea: `aiw/kernel.mjs:138-144` | C |
| **#32** | **0** | **2** (`\bprovider\b`) → `#13`(`completed`), `#35`(`planned`) | **C = 3 sitios** de `invokeClaude`: def `aiw/kernel.mjs:232`, llamadas `:353` y `:401`. **1 sitio** del binario hardcodeado: `aiw/kernel.mjs:236`. **0** claves de modelo/agente en `aiw/config.json` | A + B + C |
| **#33** | **2** (`#34`, `#37`) | **0** (`run identity\|logDir`) | **C = 25 líneas** de `aiw/kernel.mjs` que mencionan `logDir`; el origen es **1**: `aiw/kernel.mjs:283`. Escrituras dentro de esa carpeta: **11 artefactos distintos** | A + C |
| **#34** | **2** (`#35`, `#37`) | **2** (`\bmanifest\b`) → `#22`, `#33` | pieza **inexistente hoy**: **C = 0** ocurrencias de `manifest` en `aiw/kernel.mjs` / `queue.mjs` | A + B |
| **#35** | **0** | **0** (`token counts?\|cost accounting`) | **NO MEDIBLE DESDE DISCO.** Su precondición —que el proveedor exponga cifras de uso— no es un hecho del árbol: el kernel invoca por subproceso y guarda stdout (`aiw/kernel.mjs:236`). El propio run lo dice: *«is not established anywhere in this system»* | A |
| **#36** | **1** (`#45`) | **1** (`mid-run signals\|queryable`) → `#22` | **C = 5 señales ya escritas y su origen**: `STAGE.txt` `aiw/kernel.mjs:91`; `preflight.txt` `:326`; `round<N>_tests.txt` `:384`; lista de archivos tocados `:435`; guardas `:363`. Lectores de código de `STAGE.txt` hoy: **1**, `aiw/tests/observability.test.mjs` | A + B + C |
| **#37** | **0** | **1** (`evidence schema`) → `#18`(`completed`) | **D**: el documento **no existe** (`aiw/docs/` tiene **7 archivos**, ninguno es este). El más cercano, `docs/kernel/CICLO-DE-RUN.md`, es referenciado por **2 archivos**: `aiw/docs/docs_index.json`, `aiw/.project/docs_index.json` | A + B + D |
| **#38** | **2** (`#39`, `#40`) | **1** (`category field`) → `#29` | pieza **inexistente**: **C = 0**. Población que su corrección manda re-contar: **9 tickets** en 3 carpetas — `objectives/parked/` 3, `objectives/qualification/` 3, `objectives/queue-e7/` 3; `objectives/pending/` **0**, `objectives/processed/` **13** | A + B + C |
| **#39** | **2** (`#40`, `#45`) | **4** (`\bbatch(es)?\b`) → `#18`, `#20` (`completed`), `#28`, `#31` (`planned`) | pieza **inexistente**: **C = 0** ocurrencias de `batch` en `aiw/kernel.mjs` / `queue.mjs` | A + B |
| **#40** | **0** | **2** (`categories and batches`) → `#18`, `#20` (`completed`) | **D = 0**: el documento no existe | A + B + D |
| **#41** | **2** (`#45`, `#46`) | **1** (`decoupled launcher\|survive the terminal`) → `#42` | **C**: `aiw/queue.mjs` son **69 líneas**; el `finally` que se salta está en `aiw/kernel.mjs:463-466`; los handlers de señal M3 en `:77`, `:80`. **D = 1**: `aiw/logs/INCIDENT-2026-07-11.md`, indexado en `aiw/docs/docs_index.json` | A + B + C + D |
| **#42** | **1** (`#45`) | **1** (`orphan lock\|lock recovery`) → `#41` | **C = 12 líneas** de `aiw/kernel.mjs` sobre el lock: `:69`, `:77`, `:254`, `:258`, `:291`, `:292`, `:293`, `:295`, `:298`, `:299`, `:300`, `:464`. **1 archivo de test** toca `ownedLock`: `aiw/tests/observability.test.mjs` | A + B + C |
| **#43** | **1** (`#45`) | **3** (`worktree`) → `#4`, `#10` (`completed`), `#22` | **C = 3 asserts** que el run declara intocables: `aiw/kernel.mjs:333` (rama), `:335` (cwd), más la clave del lock en `:254-258` | A + B + C |
| **#44** | **1** (`#45`) | **8** (`\blane\|barrier`) → `#12`, `#18`, `#19`, `#27` (`completed`), `#31`, `#37`, `#40`, `#46` (`planned`) | **C = 0**: ni `lane` ni `barrier` aparecen en `aiw/kernel.mjs`, `queue.mjs`, `create-sandbox.mjs` ni `config.json`. Del lado del dato: **2 carriles** declarados, **6 runs** con `lane`, **2 runs** con `barrier` | A + B + C |
| **#45** | **0** | **7** (`unattended night\|window\|session`) → `#22`, `#28`, `#35`, `#41`, `#42`, `#43`, `#46` — **todos `planned`** | no toca pieza: ejerce. **Aristas salientes: 6**, el máximo del roadmap | A + B |
| **#46** | **0** | **1** (`unattended operation`) → `#18`(`completed`) | **D = 0**: el documento no existe. `aiw/docs/` tiene **7 archivos** en 2 carpetas | A + B + D |

### 3.3 — Lo que este bloque NO pudo medir de forma objetiva, y se dice

- **`#35`** — **no medible desde disco**. Su consumo depende de una capacidad del proveedor
  que no está registrada en ningún archivo del árbol. Una estimación sería inventarla.
- **Unidad B en general** — depende del término elegido. Cada término va declarado en la
  tabla; con otro término, el número cambia. **Es un conteo reproducible, no un absoluto.**
  El caso extremo es `#39`: el término `\bbatch(es)?\b` es genérico y sus 4 menciones sin
  arista incluyen usos que podrían no ser referencias al run.
- **Unidad C para piezas inexistentes** (`#34`, `#38`, `#39`) — el 0 es real y significa
  «no hay nada en disco que la consuma todavía», no «nadie la necesitará».
- **Unidad D** — mide referencias **dentro de `aiw`**. Referencias desde `aiw-console` o
  desde otros repos no se contaron.

---

## BLOQUE 4 — El testigo: pequeño, local, de fallo RUIDOSO e IRREVERSIBLE

**Cobertura: los 21 `planned` recorridos. Cada propiedad por separado, con su evidencia.**

### 4.1 — La propiedad que casi todos comparten, y por eso descarta a casi todos

**El efecto de un run del kernel se deshace tirando la rama.** Es doctrina escrita y está
medida en dos sitios:

- `aiw/CONSTITUCION.md:8` — *«La evidencia del reviewer nunca es aprobación humana. Por eso
  v2 nunca hace merge.»*; `:13` — *«El humano es autoridad final del merge.»*
- `#39`, verbatim: *«a bad run is discarded by dropping its branch, with no surgery on
  main»*.

Consecuencia medida: **de los 21 `planned`, 20 tienen efecto reversible** por esa vía —
código en rama, documentos en git, configuración en un archivo versionado. **Uno no.**

### 4.2 — Los candidatos, propiedad por propiedad

Solo se listan los que superan al menos dos propiedades. El resto del recorrido está en
§4.4, para que ninguno quede sin fila.

#### Candidato 1 — **`#29 RUN-AIW-PER-PROJECT-PUSH-001`** (el que propone la cabina)

| propiedad | veredicto medido | evidencia |
|---|---|---|
| **tamaño** | **pequeño** | *«it does not add code or a new step (D-055)»*. El cambio son **2 banderas booleanas** en `aiw/config.json` (`"push": false` en `sandbox` y en `console`). La ruta de push ya existe: **1 sitio**, `aiw/kernel.mjs:431` |
| **alcance** | **local en la lectura, externo en el efecto** | la bandera se lee en **2 líneas** (`aiw/kernel.mjs:430`, `:433`) y en ningún otro archivo. Pero el efecto sale de la máquina: es el **único** `planned` cuyo efecto cruza a un remoto |
| **¿el efecto se deshace?** | **NO, por las rutas que este sistema tiene** | `aiw/CONSTITUCION.md:40`: *«Push permitido solo de la rama de trabajo. Jamás --force. Jamás rewrite.»* — y el kernel lo repite en el sitio: `aiw/kernel.mjs:431`, comentario `// NEVER --force (CONSTITUCION §5)`. **DUDA DECLARADA:** borrar una rama remota no es `--force` ni `rewrite`, así que la doctrina no lo prohíbe por texto; pero **el kernel no tiene esa ruta** — `grep` de `--delete`, `push -d`, `:refs/` en `kernel.mjs` y `queue.mjs` da **0 coincidencias**, y ningún run la propone. Irreversible **por construcción del sistema**, no probadamente irreversible en git |
| **¿el fallo se ve al ocurrir?** | **DEPENDE DE QUÉ FALLO, y la tensión es real** | ver abajo |

**La contradicción interna que la cabina pide verificar: EXISTE, ESTÁ MEDIDA, Y NO SE
RESUELVE AQUÍ.** Se resuelve sola en cuanto se separan dos fallos que el ticket trata como
uno:

- **Fallo (a): el push falla.** **No se ve.** `aiw/kernel.mjs:432` produce
  `push FAILED (continuing)` y el run **continúa**. Ese texto viaja a **un solo destino**,
  `summary.md` (`aiw/kernel.mjs:447`), y `summary.md` **no lo lee ningún código**: `grep -rn
  summary.md --include=*.mjs` sobre `aiw` devuelve **1 sola línea, la que lo escribe**. La
  notificación `ntfy` **no lo lleva**: su cuerpo es
  `project=… rounds=…\n${reason}` (`aiw/kernel.mjs:442`). Y el código de salida **no cambia**:
  se toma de `OUTCOMES[outcome].exit` (`aiw/kernel.mjs:462`), fijado por el veredicto, no por
  el push. Un run puede cerrar con **exit 0** llevando dentro un push fallido.
  **Esto es exactamente lo que `#30` existe para cambiar**, y su propio texto lo dice:
  *«the failure is silent, which is the failure class this system is organised against»*.
- **Fallo (b): el push tiene éxito sobre algo que no debía publicarse.** **Sí se ve** — la
  rama queda en el remoto, visible a cualquiera — **y no se deshace** por las rutas de §4.2.
  Hay **una** guarda parcial ya en disco, y solo para un caso: `aiw/kernel.mjs:428-429`
  suprime el push si apareció un secreto.

**Por tanto: `#29` es pequeño y de efecto irreversible en ambos fallos, pero su fallo es
ruidoso en (b) y no en (a).** El testigo que el hilo vecino busca está en (b), no en (a).
**No se resuelve cuál de los dos es «el fallo del run»: se reporta.**

#### Candidato 2 — **`#23 RUN-AIW-SCOPE-PREFLIGHT-GUARD-001`**

| propiedad | veredicto medido | evidencia |
|---|---|---|
| **tamaño** | **pequeño** | *«Small, and with a test»*. Presupuesto declarado: 22 líneas de holgura sobre `kernel.mjs`, **medido hoy en 478 líneas** contra el techo de ~500 (`aiw/CONSTITUCION.md:29`) |
| **alcance** | **local** | **4 sitios** de código (`aiw/kernel.mjs:150`, `:272`, `:183`, `:363`) y **2 archivos de test** |
| **¿el fallo se ve al ocurrir?** | **SÍ** | el fallo es un rechazo en la entrada: *«reject the ticket BEFORE the executor is invoked — aborting as an ENTRY REJECTION»*. Nada corre; se ve inmediatamente |
| **¿el efecto se deshace?** | **SÍ** | un rechazo no destruye nada. **Descarta a este candidato para el testigo buscado** |

#### Candidato 3 — **`#33 RUN-AIW-RUN-IDENTITY-001`**

| propiedad | veredicto medido | evidencia |
|---|---|---|
| **tamaño** | **pequeño** | el origen del defecto es **1 línea**: `aiw/kernel.mjs:283` |
| **alcance** | **local en el origen, amplio en la consecuencia** | **25 líneas** de `kernel.mjs` mencionan `logDir`; **11 artefactos** se escriben dentro |
| **¿el efecto se deshace?** | **NO** | evidencia sobrescrita en sitio. El propio run: *«TWO RUNS OF THE SAME ID THEREFORE OVERWRITE EACH OTHER SILENTLY»* |
| **¿el fallo se ve al ocurrir?** | **NO — y por eso no es el testigo** | tardó 17 días y arqueología de `mtimes` en verse. `#34` lo fecha: run 1 el 2026-07-10 entre 19:56:07 y 19:56:53, `preflight.txt` del run 2 el 2026-07-11 00:00:33 |

**`#33` es el espejo de `#29`:** irreversible igual, pero fallo **no** visible al ocurrir.
Sirve como contraste, no como testigo.

#### Candidato 4 — **`#42 RUN-AIW-ORPHAN-LOCK-RECOVERY-001`**, con dudas en dos propiedades

| propiedad | veredicto medido | evidencia |
|---|---|---|
| **tamaño** | **pequeño, DUDOSO** | *«adds recovery logic to the kernel or the queue»* — **el propio run no fija cuál de los dos**. Superficie del lock hoy: **12 líneas** de `aiw/kernel.mjs` |
| **alcance** | **local** | las 12 líneas citadas, más `aiw/tests/observability.test.mjs` |
| **¿el fallo se ve al ocurrir?** | **DUDOSO, y el run lo declara en las dos direcciones** | fallar en la dirección conservadora se ve (la cola no arranca: *«converts one dead run into a queue that refuses to start at all»*); fallar en la optimista produce *«two runs against one repository»*, cuya visibilidad **no está medida en ningún sitio del árbol**. El run manda fallar cerrado |
| **¿el efecto se deshace?** | **probablemente sí** | dos runs sobre un repo dejan trabajo en ramas, y §4.1 aplica. **No verificado directamente**: no hay incidente en disco de dos runs simultáneos |

**Se reporta CON las dos dudas, no se descarta ni se redondea.**

### 4.3 — Respuesta directa: ¿existe el testigo que buscan?

**No hay ningún `planned` en el que las cuatro propiedades sean nítidas a la vez.** Lo
medido:

- **pequeño + local + efecto irreversible:** `#29` y `#33`. Son **2**.
- de esos dos, **fallo visible al ocurrir**: `#29` **solo en su fallo (b)**; `#33`, **no**.
- **`#29` es el más cercano, y su cercanía depende de cuál de sus dos fallos se tome como
  «el fallo del run».** Esa elección no la hace este encargo.

Dato que puede pesar en la decisión: **`#29` es el único de los 21 cuyo efecto sale de la
máquina.** Todos los demás escriben en el árbol, en git o en `logs/`.

### 4.4 — El recorrido completo, para que ninguno quede sin fila

Los 17 restantes, con la propiedad que los saca del perfil buscado:

| `#N` | por qué no es el testigo |
|---|---|
| **#22** | efecto reversible: produce una medición, no un cambio |
| **#28** | efecto reversible (rama); tamaño **no pequeño** por declaración propia: *«it is why this is not a two-line change»* |
| **#30** | efecto reversible; su objeto **es** hacer ruidoso un fallo hoy silencioso |
| **#31** | efecto reversible; *«THE MEASURED GAP, AND IT IS THE LARGEST ONE IN THIS ROADMAP»* — no es pequeño |
| **#32** | efecto reversible (config + código en rama). Su fallo sí es grave y declarado —*«produces a reviewer that edits»*— pero se deshace |
| **#34** | efecto reversible; escribe un artefacto nuevo |
| **#35** | **no medible**: su precondición no está establecida en disco (§3.3) |
| **#36** | efecto reversible; el propio run se declara *«a READ path for facts that already exist, not a DETECTOR»* |
| **#37** | documento: reversible en git |
| **#38** | efecto reversible; mezcla 5 tipos: no es pequeño |
| **#39** | efecto reversible; el modelo entero de ramas existe para que lo sea |
| **#40** | documento: reversible |
| **#41** | efecto reversible en código. **Salvedad declarada:** su derogación de una regla operativa *«ON THE DAY IT SHIPS»* sí es un efecto que no se deshace solo — pero es normativo, no de disco |
| **#43** | efecto reversible; su fallo declarado *«reintroduces the collision the current keying was written to fix»*, que es la misma clase que `#42` |
| **#44** | efecto reversible; hoy **0 sitios de código** que ejecuten carriles |
| **#45** | ejerce y mide; **pero si `#29` ya está activo cuando corre, publica** — su efecto hereda la irreversibilidad de `#29`. No es pequeño: 6 aristas entrantes de dependencia |
| **#46** | documento: reversible |

**21 runs cubiertos: 4 en §4.2 + 17 en §4.4.** ✔

---

## BLOQUE 5 — Estado de los repos al cierre

```bash
git -C aiw status --porcelain          # (sin salida)
git -C aiw log -1 --oneline            # 17b6dfa
```

**`aiw`: `git status --porcelain` vacío. Ninguna modificación. Ni un byte escrito.**

`aiw-console` se midió **dos veces**, y **cambió entre las dos**. Se reportan las dos, sin
revertir nada: este repo lo escriben tres hilos, y la diferencia es la prueba en vivo.

**Antes de escribir este record — 9 entradas, todas ajenas:**

```
 M .project/docs_index.json          M .project/no_claims.json
 M .project/git_history.json         M .project/roadmap.json
 M .project/guardrails.json          M roadmap/roadmap.json
?? context/aiw-console/records/AUDITORIA-CORPUS-DOCUMENTAL-Y-LISTA-DE-DISPOSICION-CANTU.md
?? context/aiw-console/records/MEDICION-PILOTO-CLASIFICACION-AIW-CONSOLE.md
?? context/aiw-console/records/PALETA-DE-AUTOR-COMPILADOR-Y-MOTOR-CANTU.md
```

**Al cierre — 9 entradas, de las cuales 1 es de este encargo:**

```
 M .project/docs_index.json          M .project/roadmap.json
 M .project/git_history.json         M .project/snapshot.json
 M .project/guardrails.json          M roadmap/roadmap.json
 M .project/no_claims.json
?? context/aiw-console/records/MEDICION-PILOTO-CLASIFICACION-AIW-CONSOLE.md
?? context/aiw-console/records/MEDICION-PREVIA-A-LA-CLASIFICACION-DE-LOS-21-PLANNED-DE-AIW.md
```

**Los tres cambios entre ambas mediciones NO son de este encargo:** aparece
` M .project/snapshot.json`, y desaparecen los dos `??` de
`AUDITORIA-CORPUS-DOCUMENTAL-Y-LISTA-DE-DISPOSICION-CANTU.md` y
`PALETA-DE-AUTOR-COMPILADOR-Y-MOTOR-CANTU.md` — otro hilo los commiteó mientras este
encargo medía. **No se revirtió ni se tocó ninguna de esas entradas.**

**La única entrada añadida por este encargo es este archivo**, y aparece en la medición de
cierre.

---

## LO QUE NO PUDE VERIFICAR

1. **Si el push de una rama es irreversible en git, o solo por las rutas de este sistema.**
   Medido: la doctrina prohíbe `--force` y `rewrite` (`aiw/CONSTITUCION.md:40`), y el kernel
   no tiene ninguna ruta de borrado remoto (0 coincidencias). **No medido:** si el operador
   consideraría legítimo un `git push --delete` manual, que no cae bajo ninguna de las dos
   prohibiciones escritas. La irreversibilidad de `#29` se reporta **acotada a este
   sistema**, no como propiedad de git.
2. **Cuál de los dos fallos de `#29` es «el fallo del run».** Ambos están medidos; elegir
   entre ellos es clasificar, y este encargo no clasifica.
3. **La visibilidad real de dos runs simultáneos sobre un repositorio** (`#42`, `#43`). No
   hay incidente en disco: la propiedad se infiere del diseño del lock, no se observa.
4. **La precondición de `#35`.** No está registrada en ningún archivo del árbol. Reportada
   como no medible, no estimada.
5. **La unidad B (menciones en prosa) es sensible al término.** Ningún `run_id` literal
   aparece en la prosa ajena — **0 en los 46** —, así que todo conteo de B depende del
   término declarado. Con otros términos, otros números. El caso más frágil es `#39`.
6. **Referencias a documentos desde fuera de `aiw`.** La unidad D solo contó dentro del
   árbol de `aiw`.
7. **El techo de `kernel.mjs`.** Medido: **478 líneas** hoy, contra el `~500` de
   `aiw/CONSTITUCION.md:29`. **No verificado:** que exista algún test, hook o check que lo
   haga cumplir — los propios runs dicen repetidamente que *«enforcement is human and
   documentary»*, y este encargo no corrió la suite de ningún proyecto para comprobarlo.
8. **Un record previo de este repo, `MEDICION-INCIDENTE-SCOPE-PREFLIGHT.md`, sitúa a
   `RUN-AIW-SCOPE-PREFLIGHT-GUARD-001` en `queue_order` 22.** Hoy está en **23**
   (`aiw/roadmap/roadmap.json:287`). Es la renumeración del commit `17b6dfa`, no una
   discrepancia de medición — pero **no verifiqué** si otros records arrastran números
   viejos.
9. **`aiw-console` se movió bajo los pies de esta medición.** Entre la medición de apertura
   y la de cierre, otro hilo commiteó dos records y modificó `.project/snapshot.json`
   (§Bloque 5). Las grafías del Bloque 1 se leyeron **antes** de ese commit, así que **se
   re-verificaron después**, contra el nuevo HEAD `1959e9c`:
   `roadmap-core.mjs:93-98` y `classification.mjs:56-61` **siguen idénticas**, campo a campo.
   Lo que **no** verifiqué es si ese commit movió otras líneas de esos dos archivos: los
   números del Bloque 1 se comprobaron uno a uno, el resto del archivo no.
   El HEAD de `aiw` sí quedó fijado: `17b6dfa`, árbol limpio, en apertura y en cierre.
