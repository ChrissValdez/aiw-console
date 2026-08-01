# AUDITORÍA DEL ROADMAP DE AIW

**Fecha:** 2026-07-31 · **Sujeto:** `aiw/roadmap/roadmap.json` entero — 42 runs, 6
objetivos, 29 fases · **Naturaleza:** encargo de taller, LECTURA ÚNICAMENTE sobre
`aiw`. No se escribió un byte en ese repo. Los `git log` y `git status` fueron de
lectura. No se tocó la consola, ni el status de ningún run, ni el orden de la cola,
ni una arista. · **Máquina:** PC (Windows 10, `C:\Users\chris\Documents\AIW_Workspace\`).

Este record MIDE. No repara ningún hallazgo, no clasifica ningún run, no propone
regla alguna para runs mixtos y no mueve nada. Los hallazgos van a §8 como lista de
reparaciones propuestas, **ninguna aplicada**.

**Todas las cifras son una medición fechada del 2026-07-31**, con su unidad y su
alcance. Lo medido se distingue de lo citado: lo citado va entre comillas angulares
con su `ruta:línea`.

---

# VEREDICTO EN UNA PÁGINA

**Las cinco cifras heredadas del encargo son las cinco correctas.** 42 runs, 6
objetivos, 29 fases, 25 `completed`, 17 `planned`, `queue_order` denso `1..42`, y
`kernel.mjs` en 478 líneas contra un techo de `~500`. Se midieron todas; ninguna
falló. La sexta cifra heredada —la del propio ticket, «la cola se reordenó dos veces
el 2026-07-30»— **es la única que no resiste**: git fecha las dos reordenaciones el
**2026-07-29** (§7.4).

**De los 17 runs vivos, 5 son elegibles hoy** y 12 no. De los 12, **9 están
detenidos por su propia compuerta `CONST §4`** y no por una arista.

**Los 11 runs de mecanismo citan la misma cifra de holgura heredada —«22 lines of
slack (478 of about 500)»— y ninguno de los 11 declara cuántas líneas añadiría.** La
pregunta «¿alcanza el presupuesto?» **no se puede contestar con lo que hay en disco**,
y este record no la estima (§4).

**Cero citas `ruta:línea` rotas** en los 17 textos vivos: las 5 distintas resuelven, y
las 9 rutas sin línea existen. Lo que sí caducó son **afirmaciones en presente sobre
un mundo que ya cambió**: `logs/` ya no está en `.gitignore`, y tres runs siguen
diciendo que sí (§7.2).

**Cero coordenadas fechadas.** Ningún run `planned` cita un `#N`, un `objective_id`,
un `phase_id` ni un `run_id` de otro run. Las dos reordenaciones no pudieron romper
nada porque no había nada que romper (§7.3).

---

## 0. Guardas y base

### 0.1 Estado de git — lectura

| medición | valor |
|---|---|
| `git -C aiw log -1 --oneline` | `6b61e10 docs: ciclo de run documentado contra codigo, con la escalera de veredicto, OUTCOMES y las ramas que no llegan al reviewer; tres imprecisiones del run corregidas hacia adelante; cierra el 27` |
| `git -C aiw status --porcelain` | **vacío — 0 entradas** |

El árbol de `aiw` está limpio antes y después de esta auditoría. La condición de
aceptación se cumple sin salvedad.

### 0.2 El canónico, medido

Derivado de `roadmap/roadmap.json` (641 líneas, `schema_version:
"roadmap_tree_v1"`), recorriendo `objectives[] → phases[] → runs[]`.

| cifra de partida (heredada) | medición real | veredicto |
|---|---|---|
| 42 runs | **42 runs** | **coincide** |
| 6 objetivos | **6 objetivos** — `O1, O2, O3, O5, O6, O7` | **coincide** |
| 29 fases | **29 fases** — O1:2, O2:7, O3:6, O5:4, O6:4, O7:6 | **coincide** |
| 25 `completed` | **25 runs `completed`** | **coincide** |
| 17 `planned` (aritmética de cabina) | **17 runs `planned`**, contados campo a campo, no restados | **coincide, y ahora medido** |
| `queue_order` denso `1..42` | **denso y único**: 42 valores, 42 distintos, mín 1, máx 42, **0 huecos**, **0 duplicados** | **coincide** |

Unidades y alcance: «runs» = objetos del array `runs` en todo el árbol; «fases» =
objetos del array `phases`; el reparto de status es sobre los 42, no sobre una
muestra.

**Carriles y barriers declarados:** 2 carriles (`DEVELOPMENT`, marcado `default`, y
`DOCUMENTATION`); **6 runs** llevan campo `lane`, los seis a `DOCUMENTATION` (`#18,
#19, #27, #32, #36, #42`); **2 runs** llevan campo `barrier` — `#12` con `global` y
`#18` con `lane`. Ningún otro run declara ninguno de los dos campos.

---

## 1. El mapa — qué persigue cada objetivo y dónde va

Cada línea de propósito está **derivada de los textos de los runs del propio
objetivo**, con la frase que la sostiene. Los títulos son verbatim de disco.

### O1 — «House in order»
`queue_order` **1–11** · 2 fases · **11 `completed` / 0 `planned`**

Fases: `O1.P1` «The migration, executed» (#1–#10) · `O1.P2` «Cabin methodology
established» (#11).

Persigue **dejar el disco en un solo sitio y sin dobles**: respaldo remoto antes de
mover nada, un único `AIW_Workspace`, retiro del v1 y de los checkouts viejos, y la
cabina como sitio de la estrategia. Lo dice `#1`: «nothing moves or is deleted
without a verified remote backup behind it», y lo cierra `#11`: «the repository is
the workshop... the Claude project is the CABIN».

### O2 — «AIW is readable»
`queue_order` **12–21** · 7 fases · **10 `completed` / 0 `planned`**

Fases: `O2.P1` «Evidence portability» · `O2.P2` «The queue tells the truth» ·
`O2.P3` «The canonical roadmap» · `O2.P4` «Declared governance» · `O2.P5` «Docs
convention and curated index» · `O2.P6` «Markdown retirement» · `O2.P7` «AIW as the
third project».

Persigue que **el estado de AIW sea legible fuera de esta máquina**. Lo enuncia el
barrier global `#12`: «ALL of AIW's execution evidence exists only on one machine:
the laptop cloned from GitHub and sees zero runs, and the cabin's knowledge does not
see them either».

### O3 — «Reliable autonomous run»
`queue_order` **22–27** · 6 fases · **4 `completed` / 2 `planned` (`#22`, `#23`)**

Fases: `O3.P1` «The known leak» (#23) · `O3.P2` «Behaviour under real load» (#22) ·
`O3.P3` «Failure cases as an asset» (#25) · `O3.P4` «Ticket parse regression test»
(#24) · `O3.P5` «Agent instruction convention» (#26) · `O3.P6` «Documenting the
cycle» (#27).

Persigue **estirar el loop más allá de lo pequeño y cerrar lo que se rompa al
estirarlo**. Lo dice `#22`: «That is not evidence that the loop is reliable — it is
evidence that the loop has never been stretched».

### O5 — «Run evidence and observability»
`queue_order` **28–32** · 4 fases · **0 `completed` / 5 `planned`**

Fases: `O5.P1` «Run identity» · `O5.P2` «The run manifest» (#29, #30) · `O5.P3`
«Signals the agent can query mid-run» · `O5.P4` «Documenting the evidence schema».

Persigue que **cada run deje evidencia con identidad propia y hechos consultables
mientras vive**. Lo abre `#28`: «TWO RUNS OF THE SAME ID THEREFORE OVERWRITE EACH
OTHER SILENTLY», y lo completa `#31`: «Everything it knows about what actually
happened during the run, it knows because the executor said so».

### O6 — «Categories and batches»
`queue_order` **33–36** · 4 fases · **0 `completed` / 4 `planned`**

Fases: `O6.P1` «Per-project push activation» · `O6.P2` «The category field and its
vocabulary» · `O6.P3` «Batch to branch» · `O6.P4` «Documenting categories and
batches».

Persigue que **el operador pueda declarar cómo cierra un run y agrupar runs en lotes
con rama propia**. Lo funda `#33`: «SO TODAY NO RUN OF AIW CAN LITERALLY SATISFY TWO
OF THE THREE CATEGORIES».

### O7 — «Long unattended execution (batches, lanes and parallelism)»
`queue_order` **37–42** · 6 fases · **0 `completed` / 6 `planned`**

Fases: `O7.P1` «Decoupled queue launcher» · `O7.P2` «Orphan lock recovery» ·
`O7.P3` «Worktrees per run» · `O7.P4` «The kernel reads lanes» · `O7.P5` «Real long
unattended sessions» · `O7.P6` «Documenting unattended operation».

Persigue que **una ventana larga sobreviva a su terminal, se recupere sola, corra en
paralelo dentro de un repo y se cuente honestamente**. Lo cierra `#41`: «THE
MILESTONE OF THIS OBJECTIVE, AND THE COUNTER IS HONESTLY AT ZERO».

### 1.1 Huecos en la numeración — medición

**Ningún objetivo tiene hueco en su `queue_order`.** Los seis ocupan bloques
contiguos: 1–11, 12–21, 22–27, 28–32, 33–36, 37–42. Medido run a run: cero huecos
internos, cero solapes entre objetivos.

**El hueco está en la numeración de OBJETIVOS: `O4` no existe.** El array salta de
`O3` a `O5`. **El roadmap sí dice algo, y lo dice mucho**, en la `ROADMAP-LEVEL NOTE`
del `full_description` de `#16` (`RUN-AIW-CANONICAL-ROADMAP-001`):

> «O4 DOES NOT EXIST, AND THE GAP IS PERMANENT. The objectives array jumps from O3 to
> O5, and the number is NEVER reused. O4 was Global Console; its canonical now lives
> in aiw-console's own roadmap... AIW's O4 would have collided with it lexically AND
> on subject... Leaving the number empty dissolves that collision by construction.
> This is legal: CONTRATO §10.d Rule 1 requires global uniqueness of the RUN_ID and
> says nothing about objective_id... an objective_id keeps its gap because it is
> identity, not a sequence — the gap tells the truth (D-046, D-054).»

**Un hueco de otra clase, que el roadmap NO comenta:** en `O3`, y solo en `O3`, el
orden de las fases contradice el `queue_order` — `O3.P1` aloja el `#23` y `O3.P2` el
`#22`; `O3.P3` aloja el `#25` y `O3.P4` el `#24`. Los otros cinco objetivos coinciden.
Medición y causa en §7.4 y §8.

*Este paso es descriptivo. No propone reordenar nada.*

---

## 2. Los vivos, uno por uno

Los 17 runs `planned`, en orden de `queue_order`. Títulos verbatim de disco;
objetivos y fases por su título.

| `#N` | `run_id` | título verbatim | objetivo | fase | `lane` | `barrier` | `depends_on` |
|---|---|---|---|---|---|---|---|
| 22 | `RUN-AIW-REAL-LOAD-MEASUREMENT-001` | Run the first real objective against a large repository with a test net | Reliable autonomous run | Behaviour under real load | — | — | `[]` |
| 23 | `RUN-AIW-SCOPE-PREFLIGHT-GUARD-001` | Make the scope pre-flight demand a real match | Reliable autonomous run | The known leak | — | — | `#22` |
| 28 | `RUN-AIW-RUN-IDENTITY-001` | Give every run an identity its log folder cannot silently overwrite | Run evidence and observability | Run identity | — | — | `[]` |
| 29 | `RUN-AIW-RUN-MANIFEST-001` | Write one manifest of identity and outcome per run | Run evidence and observability | The run manifest | — | — | `#12`, `#28` |
| 30 | `RUN-AIW-RUN-COST-ACCOUNTING-001` | Record tokens and cost per run, if the provider exposes them | Run evidence and observability | The run manifest | — | — | `#29` |
| 31 | `RUN-AIW-MID-RUN-SIGNALS-001` | Expose signals the reviewer can query instead of trusting self-reports | Run evidence and observability | Signals the agent can query mid-run | — | — | `[]` |
| 32 | `RUN-AIW-EVIDENCE-SCHEMA-DOCUMENTATION-001` | Document what a run writes and where | Run evidence and observability | Documenting the evidence schema | `DOCUMENTATION` | — | `[]` |
| 33 | `RUN-AIW-PER-PROJECT-PUSH-001` | Turn on push per project | Categories and batches | Per-project push activation | — | — | `[]` |
| 34 | `RUN-AIW-RUN-CATEGORY-FIELD-001` | Add the category field and settle its vocabulary | Categories and batches | The category field and its vocabulary | — | — | `#33` |
| 35 | `RUN-AIW-BATCH-TO-BRANCH-001` | Let the operator group runs into batches, and let the batch decide the branch | Categories and batches | Batch to branch | — | — | `#34` |
| 36 | `RUN-AIW-CATEGORIES-BATCHES-DOCUMENTATION-001` | Document categories and batches | Categories and batches | Documenting categories and batches | `DOCUMENTATION` | — | `#34`, `#35` |
| 37 | `RUN-AIW-DECOUPLED-QUEUE-LAUNCHER-001` | Make the queue survive the terminal that launched it | Long unattended execution (batches, lanes and parallelism) | Decoupled queue launcher | — | — | `[]` |
| 38 | `RUN-AIW-ORPHAN-LOCK-RECOVERY-001` | Recover from a lock whose owner is gone | Long unattended execution (batches, lanes and parallelism) | Orphan lock recovery | — | — | `[]` |
| 39 | `RUN-AIW-WORKTREES-PER-RUN-001` | Give each run its own worktree so runs can overlap inside one repository | Long unattended execution (batches, lanes and parallelism) | Worktrees per run | — | — | `[]` |
| 40 | `RUN-AIW-KERNEL-READS-LANES-001` | Teach the kernel to read lanes and barriers | Long unattended execution (batches, lanes and parallelism) | The kernel reads lanes | — | — | `[]` |
| 41 | `RUN-AIW-LONG-UNATTENDED-SESSIONS-001` | Run real long unattended sessions and count them honestly | Long unattended execution (batches, lanes and parallelism) | Real long unattended sessions | — | — | `#37`, `#38`, `#39`, `#40`, `#31`, `#35` |
| 42 | `RUN-AIW-UNATTENDED-OPERATION-DOCUMENTATION-001` | Document how to run and audit an unattended window | Long unattended execution (batches, lanes and parallelism) | Documenting unattended operation | `DOCUMENTATION` | — | `[]` |

**17 filas. Cobertura: 17 de 17.** Ningún `planned` queda fuera.

Los seis títulos de objetivo y los diecisiete de fase se leyeron verbatim del
canónico; ninguno quedó ilegible.

### 2.a La compuerta `CONST §4`, run por run

Clasificación por la **frase literal del propio run**, no por inferencia.

| `#N` | categoría | frase del run que lo dice |
|---|---|---|
| 22 | **PAPEL** | «No mechanism under CONST §4: this run measures, it does not add code or a new step (D-055).» |
| 23 | **MECANISMO — INCIDENTE PENDIENTE** | «CONST §4 (D-055) — THIS RUN ADDS MECHANISM AND ITS INCIDENT IS PENDING.» · «this run therefore CANNOT EXECUTE until an entry in DECISIONES.md records its incident with the four fields» |
| 28 | **MECANISMO — NO PUEDE EJECUTAR, por criterio de borrado** | «CONST §4 (D-055) — MECHANISM. ITS INCIDENT IS DOCUMENTED; ITS DELETION CRITERION IS NOT.» · «CANNOT EXECUTE until an entry records its deletion criterion in the form it is removed if X (CONST:33)» |
| 29 | **MECANISMO CON INCIDENTE COMPLETO** | «CONST §4 (D-055, case 1) — MECHANISM WITH ITS THREE FIXED CRITERIA COMPLETE.» |
| 30 | **MECANISMO — INCIDENTE PENDIENTE** | «CONST §4 (D-055) — MECHANISM, INCIDENT PENDING.» |
| 31 | **MECANISMO — INCIDENTE PENDIENTE** | «CONST §4 (D-055) — MECHANISM, INCIDENT PENDING.» |
| 32 | **PAPEL** | «No mechanism under CONST §4: documentation is paper (D-055).» |
| 33 | **PAPEL** | «No mechanism under CONST §4: the push path already exists in the kernel and reports itself as not configured... it does not add code or a new step (D-055).» |
| 34 | **MECANISMO — INCIDENTE PENDIENTE** | «CONST §4 (D-055) — MECHANISM, INCIDENT PENDING.» · «The CONST §4 gate on this run is unchanged and still stands: mechanism, incident pending.» |
| 35 | **MECANISMO — INCIDENTE PENDIENTE** | «CONST §4 (D-055) — MECHANISM, INCIDENT PENDING.» |
| 36 | **PAPEL** | «No mechanism under CONST §4: documentation is paper (D-055).» |
| 37 | **MECANISMO CON INCIDENTE COMPLETO** | «CONST §4 (D-055, case 2) — MECHANISM WITH ITS THREE FIXED CRITERIA COMPLETE.» |
| 38 | **MECANISMO — NO PUEDE EJECUTAR, por criterio de borrado** | «CONST §4 (D-055) — MECHANISM. ITS INCIDENT IS DOCUMENTED; ITS DELETION CRITERION IS NOT.» |
| 39 | **MECANISMO — INCIDENTE PENDIENTE** | «CONST §4 (D-055) — MECHANISM, INCIDENT PENDING.» |
| 40 | **MECANISMO — INCIDENTE PENDIENTE** | «CONST §4 (D-055) — MECHANISM, INCIDENT PENDING.» |
| 41 | **PAPEL** | «No mechanism under CONST §4: this run EXERCISES the mechanisms and measures the result; it adds none of its own (D-055).» |
| 42 | **PAPEL** | «No mechanism under CONST §4: documentation is paper (D-055).» |

**Reparto:** PAPEL **6** · MECANISMO CON INCIDENTE COMPLETO **2** · MECANISMO QUE NO
PUEDE EJECUTAR **9** · **SIN DECLARAR 0**. Suma 17.

**Una precisión que no se adivina.** El encargo ofrecía tres categorías, y la tercera
era «declara que no puede ejecutar hasta que se registre un incidente». **Siete** de
los nueve encajan literalmente. Los **otros dos —`#28` y `#38`— declaran lo
contrario sobre el incidente**: que ya está documentado, y que lo que falta es el
criterio de borrado. Se reportan como lo que dicen, en su propia subcategoría, sin
forzarlos a la tercera y sin inventar una cuarta que el encargo no pidió. Ambos
comparten el mismo diagnóstico literal: el criterio escrito en `D-055` es el de OTRO
mecanismo —el del manifiesto en el caso de `#28`, el del lanzador en el de `#38`— y
por eso «cannot also serve as this run's own».

**Cero runs SIN DECLARAR.** Los 17 mencionan `CONST §4` o su ausencia explícitamente,
y los 17 citan `D-055`.

**Dos matices condicionales, declarados por los propios runs y no resueltos aquí:**
`#33` dice «If activation turns out to require new code rather than a flag, that code
IS mechanism and falls under D-055 with the full three criteria»; y `#26` —ya
`completed`— dejó escrito el mismo tipo de frontera. Son compuertas que pueden
cambiar de lado al ejecutarse; hoy están declaradas como PAPEL.

### 2.b Elegibilidad HOY

Criterio aplicado: **elegible = todas sus aristas apuntan a runs `completed`, y su
propia compuerta no lo detiene.**

**ELEGIBLES: 5 de 17** — `#22`, `#32`, `#33`, `#37`, `#42`.

| `#N` | por qué es elegible |
|---|---|
| 22 | `depends_on` vacío · compuerta PAPEL |
| 32 | `depends_on` vacío · compuerta PAPEL · su lane barrier (`#18`) está `completed` |
| 33 | `depends_on` vacío · compuerta PAPEL |
| 37 | `depends_on` vacío · compuerta **MECANISMO CON INCIDENTE COMPLETO** — es el único mecanismo elegible hoy |
| 42 | `depends_on` vacío · compuerta PAPEL · su lane barrier (`#18`) está `completed` |

**NO ELEGIBLES: 12 de 17**, con lo que exactamente los detiene:

| `#N` | qué lo detiene — exacto |
|---|---|
| 23 | **Dos cosas**: arista a `#22`, que está `planned`; **y** su compuerta, que declara que no puede ejecutar sin incidente registrado. Reparar solo una no lo libera |
| 28 | **Solo la compuerta.** `depends_on` vacío; falta su criterio de borrado en forma `CONST:33` |
| 29 | **Solo una arista**: `#28`, `planned`. Su otra arista (`#12`) está `completed` y su compuerta está completa. Es el mecanismo que está a un solo run de ser elegible |
| 30 | **Tres cosas**: arista a `#29` (`planned`); compuerta sin incidente; y su precondición externa —que el proveedor exponga los números— que el run declara no establecida |
| 31 | **Solo la compuerta.** `depends_on` vacío; sin incidente registrado |
| 34 | Arista a `#33` (`planned`) **y** compuerta sin incidente |
| 35 | Arista a `#34` (`planned`) **y** compuerta sin incidente |
| 36 | **Solo aristas**: `#34` y `#35`, ambas `planned`. Compuerta PAPEL |
| 38 | **Solo la compuerta.** `depends_on` vacío; falta su criterio de borrado |
| 39 | **Solo la compuerta.** `depends_on` vacío; sin incidente registrado |
| 40 | **Solo la compuerta.** `depends_on` vacío; sin incidente registrado |
| 41 | **Solo aristas, y son seis**, las seis `planned`: `#37`, `#38`, `#39`, `#40`, `#31`, `#35`. Compuerta PAPEL. Es el run más bloqueado del roadmap |

**Lectura de la forma del bloqueo, medida:** de los 12 no elegibles, **6 lo están
únicamente por su compuerta** (`#28`, `#31`, `#38`, `#39`, `#40`, y también `#23` en
parte), **3 únicamente por aristas** (`#29`, `#36`, `#41`), y **3 por ambas cosas**
(`#23`, `#34`, `#35`) —`#30` por tres. **El cuello de botella dominante no es el
grafo: son las entradas de `DECISIONES.md` que no existen.**

Los dos barriers del roadmap **no detienen a nadie hoy**: `#12` (`global`) y `#18`
(`lane`) están ambos `completed`. Medido, no supuesto. Nota adyacente y no
contradictoria: `#40` declara que hoy nada ejecuta carriles ni barriers —«AND NOTHING
EXECUTES IT»—, de modo que el barrier tampoco detendría aunque estuviera vivo.

### 2.c Bloqueos que no son aristas

Declarados en prosa, invisibles a cualquier motor porque no están en `depends_on`.

| `#N` | de qué depende, fuera del grafo | cita |
|---|---|---|
| 23, 28, 30, 31, 34, 35, 38, 39, 40 | **Una entrada nueva en `DECISIONES.md`**, que vive en OTRO repo (`aiw-console`) y es un acto de cabina, no de taller. **Nueve runs**, y es el bloqueo externo más repetido del roadmap | `#31`: «It CANNOT EXECUTE until an entry in DECISIONES.md records its incident with the four fields of CONST:30-32» |
| 22 | **Un repositorio grande y ajeno con suite real** que no se nombra en ninguna parte | «Measure how the kernel behaves against a real, large surface with a real test net» |
| 30 | **Que el proveedor exponga tokens y coste** en una forma capturable. El run se declara mortal por ello | «Its precondition is that the provider expose token counts and cost for an invocation in a form the kernel can capture... IF THEY ARE NOT EXPOSED, THIS RUN IS RETIRED RATHER THAN WORKED AROUND» |
| 34 | **Una decisión previa contra `D-057`**, tomada en documento normativo de otro repo, sobre si el campo procede siquiera | «Before it executes it must first decide, against D-057, whether a stored category field is warranted at all» |
| 33 | **Una decisión operativa del operador**, no solo un flag | «This run changes configuration and the operating decision behind it» |
| 37 | **El texto definitivo de `logs/INCIDENT-2026-07-11.md`**, que el propio run marca como no abierto por la decisión que lo cita | «[INFERENCIA] on that fourth field: its definitive wording comes from INCIDENT-2026-07-11.md itself, which D-055 did not open» |
| 41 | **El criterio de `D-018`**: tres noches reales y dos diffs mergeados sin reescribir. No es una arista y no es código | «The criterion is D-018's... at least three unattended nights against a REAL repository, and at least two diffs merged without rewriting» |

---

## 3. El presupuesto de líneas, sumado

### 3.1 El techo y la línea, con `ruta:línea`

| medición | valor | fuente |
|---|---|---|
| líneas reales de `kernel.mjs` | **478 líneas** (conteo de saltos de línea; el archivo termina en salto, así que son 478 líneas de contenido). 439 no vacías. 26 954 bytes | `aiw/kernel.mjs` |
| techo citado en la constitución | **«~500 líneas»** — con tilde de aproximación | `CONSTITUCION.md:29` — «- Techo duro del kernel: ~500 líneas. Para añadir, se borra.» |
| techo citado en el propio kernel | **«500 lines»** — sin tilde | `kernel.mjs:4` — «// Hard ceiling: 500 lines (CONSTITUCION §4).» |
| holgura resultante | **22 líneas**, si se toma 500 exacto | derivada: 500 − 478 |

**Las dos citas del techo no dicen lo mismo.** `CONSTITUCION.md:29` escribe `~500`;
`kernel.mjs:4` escribe `500`. La cifra de holgura que once runs repiten se calcula
contra la versión SIN tilde. La diferencia es pequeña y es real: **«22 líneas de
holgura» es una resta exacta sobre un techo declarado aproximado.**

Las otras dos líneas que la compuerta usa, verbatim:
- `CONSTITUCION.md:30-32` — «- Ningún mecanismo nuevo sin incidente documentado en
  ../projects/aiw-console/context/DECISIONES.md: / fecha, qué se rompió, qué costó,
  por qué el diff matinal no lo cazó. / Una idea no es un incidente. Un miedo no es
  un incidente.»
- `CONSTITUCION.md:33` — «- Todo mecanismo nace con criterio de borrado escrito: "se
  elimina si X".»

### 3.2 Cuántos runs declaran mecanismo, y qué cifra cita cada uno

**11 de los 17 `planned` declaran añadir mecanismo**: `#23, #28, #29, #30, #31, #34,
#35, #37, #38, #39, #40`. Los otros 6 se declaran papel.

**Los 11 citan una cifra de holgura, y los 11 citan LA MISMA.** Medido cadena por
cadena sobre los `full_description`:

| cadena | runs que la contienen | n |
|---|---|---|
| «478 of about 500» | `#23, #28, #29, #30, #31, #34, #35, #37, #38, #39, #40` | **11 de 11** |
| «22 lines of slack» | `#23, #28, #29, #30, #31, #34, #35, #37, #38, #39, #40` | **11 de 11** |
| «human and documentary» (la enforcement) | `#23, #28, #29, #30, #31, #34, #35, #37, #38, #39, #40` | **11 de 11** |

Es el bloque de texto más repetido del roadmap y **hoy sigue siendo cierto**: el
kernel mide 478 líneas exactas. La cifra heredada no ha caducado; lo que hay que
decir es que **se heredó once veces sin volver a medirse**, y que su vigencia hoy es
coincidencia afortunada, no verificación.

### 3.3 La pregunta concreta: ¿alcanza el presupuesto?

**No se puede contestar con lo que hay en disco, y este record no lo estima.**

Medición que lo sostiene: se buscó en los 17 `full_description` toda ocurrencia del
patrón «N líneas». **Aparece en 11 runs y en los 11 el número es el mismo: 22, y es
la holgura del techo, no el coste del run.** Ningún run `planned` declara cuántas
líneas añadiría.

**Cero de once runs de mecanismo declaran su propio coste en líneas.**

Lo único que el roadmap declara sobre coste propio está en un run **`completed`**,
`#24` (`RUN-AIW-TICKET-PARSE-REGRESSION-TEST-001`): «LINE BUDGET: ZERO against the
ceiling. The test lives IN THE SUITE, not in kernel.mjs, and consumes none of the 22
lines of slack». Es consistente con la medición: `#24` ya cerró y `kernel.mjs` sigue
en 478.

Lo que sí puede afirmarse sin estimar nada: **nueve de los once mecanismos declaran
tocar `kernel.mjs` o `queue.mjs`**, y los once repiten la misma instrucción
condicional —«or name what it deletes (CONST:28-29)»—, que ninguno instancia. Y una
segunda cosa, que los once dicen igual y que es una medición sobre el repo: **no
existe test, hook ni check que verifique el techo**; la enforcement es «human and
documentary». Se comprobó: la palabra del techo aparece en `kernel.mjs:4` como
comentario, y en ningún test.

---

## 4. Verdad de los textos — qué ya no es cierto

Solo sobre los 17 `planned`.

### 4.a Citas `ruta:línea` — resuelven todas

**5 formas distintas de cita con línea** en los textos vivos. Todas resuelven:

| cita | aparece en | archivo | ¿existe? | contenido de la línea (comprobación trivial) |
|---|---|---|---|---|
| `K:283` | `#28`, `#29` | `aiw/kernel.mjs` | **sí** | `kernel.mjs:283` = `const logDir = path.join(AIW, 'logs', id);` — **es exactamente lo que los dos runs afirman que es** |
| `CONST:30-32` | `#23, #29, #30, #31, #34, #37, #39, #40` | `aiw/CONSTITUCION.md` | **sí** | los cuatro campos del incidente. Coincide |
| `CONST:33` | `#23, #28, #30, #31, #34, #35, #38, #39, #40` | `aiw/CONSTITUCION.md` | **sí** | el criterio de borrado «se elimina si X». Coincide |
| `CONST:32` | `#23, #30, #39` | `aiw/CONSTITUCION.md` | **sí** | «Una idea no es un incidente. Un miedo no es un incidente.» Coincide |
| `CONST:28-29` | `#23, #28, #29, #37` | `aiw/CONSTITUCION.md` | **sí** | `:28` es el encabezado «## 4. Presupuesto de complejidad» y `:29` el techo con «Para añadir, se borra». El rango cubre la frase citada |

**Rutas sin línea** citadas en textos vivos — las **9 distintas existen**:
`kernel.mjs`, `queue.mjs`, `config.json`, `DECISIONES.md`,
`../projects/aiw-console/context/CLASIFICACION-DE-RUNS.md`, `logs/000-sandbox/`,
`logs/INCIDENT-2026-07-11.md`,
`logs/002-canonical-path-and-autoproject-orphan-20260711/`, y los nombres de artefacto
que `#32` enumera (`STAGE.txt`, `preflight.txt`, `objective.md`, `network_note.txt`,
`round<N>_executor.md`, `round<N>_tests.txt`, `round<N>_reviewer.md`,
`proposed_followup.md`, `summary.md`, `parking_note.txt`), verificados uno a uno como
destinos de escritura reales en `kernel.mjs:91, 326, 337, 338, 354, 384, 402, 437,
445, 454`.

**Citas que no resuelven: 0.** Es el resultado más limpio de esta auditoría.

### 4.b Afirmaciones fechadas o contables

#### CIERTAS (14)

| # | afirmación | medición |
|---|---|---|
| 1 | `#22`: «Every single run in logs/ reached its verdict in round 1 of 3, and none consumed a second round» | **CIERTA, y con margen.** 8 carpetas de run con `summary.md`; las 8 registran `- Rounds: 1/3` y las 8 `Final state: **APPROVED**`. Cero artefactos `round2_*` o `round3_*` en todo `logs/` |
| 2 | `#33`: «config.json declares push false for BOTH registered projects» | **CIERTA.** `config.json` declara exactamente 2 proyectos, `sandbox` y `console`, ambos con `"push": false` |
| 3 | `#33`: «all eight completed runs record push: not configured for this project» | **CIERTA.** 8 `summary.md`, los 8 con la línea literal `- push: not configured for this project` |
| 4 | `#37`: «the stranded folder logs/002-canonical-path-and-autoproject-orphan-20260711/ which retains only objective.md and preflight.txt» | **CIERTA.** La carpeta contiene exactamente esos 2 archivos y ninguno más |
| 5 | `#28`: la tabla de mtimes de `logs/000-sandbox/` | **CIERTA y exacta.** `objective.md` 19:56:07, `round1_executor.md` 19:56:36, `round1_tests.txt` 19:56:36, `round1_reviewer.md` 19:56:52, `summary.md` 19:56:53 — todo 2026-07-10; y `preflight.txt` solo, **2026-07-11 00:00:33**. Cuatro horas después, como dice |
| 6 | `#40`: «this very roadmap uses it — two lanes, one global barrier and one lane barrier» | **CIERTA.** 2 carriles declarados; 2 campos `barrier` en 42 runs: `#12` = `global`, `#18` = `lane`. Uno de cada, exacto |
| 7 | `#28`, `#29`: «logDir ... from the objective's name alone (K:283): no timestamp, no counter, no check that the folder already exists» | **CIERTA.** `kernel.mjs:281` deriva `id` del basename; `:283` compone `logDir` solo con él; no hay `existsSync` sobre `logDir` en ninguna parte |
| 8 | `#29`, `#37`: «One of only three runs in this roadmap that can execute on an already-documented incident» | **CIERTA.** Barrido sobre los 42: exactamente **3** llevan «MECHANISM WITH ITS THREE FIXED CRITERIA COMPLETE» — `#24` (`completed`), `#29` y `#37` |
| 9 | `#23`: «an objective's # Scope is validated ONLY for being non-empty» | **CIERTA.** `kernel.mjs:150-152`, `parseGlobs`: `:152` lanza `if (!items.length)`. Ninguna comprobación contra el sistema de archivos |
| 10 | `#38`, `#39`: «the lock ... keyed by the repository's REAL path rather than by its config key» | **CIERTA.** `kernel.mjs:252-258`, `lockPathFor`, con el comentario F1 explícito en `:252-253` |
| 11 | `#38`: «the only recovery today is a human noticing and deleting it» | **CIERTA.** `kernel.mjs:290` — «no auto-cleanup (incident -> human)»; `:295` — «remove the lock by hand» |
| 12 | `#37`: «detached from the console by shell:true plus windowsHide:true» | **CIERTA.** `kernel.mjs:100`: `spawn([cmd, ...args].join(' '), { cwd, shell: true, windowsHide: true })` |
| 13 | `#41`: «It depends on the four mechanisms of this objective and on two from elsewhere» | **CIERTA.** 6 aristas: `#37, #38, #39, #40` son de O7; `#31` es de O5 y `#35` de O6. Cuatro y dos |
| 14 | `#37`: que existe la regla operativa que deroga | **CIERTA.** `kernel.mjs:66-67` — «operational rule: the queue / terminal stays open and untouched for the whole window» |

#### IMPRECISAS (3)

| # | afirmación | medición |
|---|---|---|
| 15 | `#37`: «four repairs M1 through M4, still visible today as the M1-M4 comments that head the kernel» | **IMPRECISA por dos vías.** (a) **No existe ninguna etiqueta `M1` ni `M2`** en `kernel.mjs`: cero ocurrencias. Solo hay `M3` (`kernel.mjs:62, 84, 300`) y `M4` (`:96, 229`). (b) **No encabezan el kernel**: la cabecera (`kernel.mjs:1-10`) lleva notas de `D-012`, `D-022 F1/F2/F3` y `D-019`; el primer comentario `M` está en `:62`. Las cuatro reparaciones pueden existir; las etiquetas `M1` y `M2` no |
| 16 | `#32`: «preflight.txt is always written and is the FIRST thing written» | **IMPRECISA en la primera mitad, cierta en la segunda.** `kernel.mjs:324` llama `stage(logDir, 'preflight: started')`, que **escribe `STAGE.txt` (`:91`) antes** que `write(...preflight.txt)` en `:326`. Lo que sí es exacto es que `preflight.txt` precede a la creación de la rama: `git checkout -b` está en `:332` |
| 17 | `#31`: enumera cinco señales que «already exist... simply not reachable» | **IMPRECISA: cuatro de cinco.** En disco: heartbeat `STAGE.txt` (`kernel.mjs:91`) **sí**; salida de tests por ronda con su exit code, `round<N>_tests.txt` (`:384`) **sí**; baseline del preflight (`:326`) **sí**; lista de archivos tocados **sí, pero solo al cierre**, dentro de `summary.md` (`:449`) — es decir, después de que el reviewer ya juzgó. **«whether a guard fired» no se escribe a ningún artefacto**: se computa en `kernel.mjs:363` y muere en memoria. La tesis del run se refuerza; su enumeración no es exacta |

#### FALSAS (3)

| # | afirmación | medición |
|---|---|---|
| 18 | `#34`: «the eleven open tickets are kernel objectives» | **FALSA hoy: son 9.** Medido en `objectives/`: 22 archivos `.md` en total, 13 en `processed/`, y abiertos **9** — `parked/` 3, `qualification/` 3, `queue-e7/` 3, y **`pending/` vacío**. Once era cierto antes de que `#13` archivara 005 y 006 desde `pending/` (commit `d312c83`, 2026-07-28). El texto de `#34` conserva el conteo anterior a un run que ya cerró |
| 19 | `#28` y `#29`: «logs/ is gitignored and takes part in no diff» | **FALSA sobre el disco de hoy.** `.gitignore` tiene 7 líneas y **ninguna es `logs/`** (la línea 4 es hoy `jame_snapshot/`); `git ls-files logs/` devuelve **58 archivos rastreados**. Fue `#12` quien retiró esa línea. La frase **sigue siendo cierta como relato del 2026-07-11**, que es lo que describe — pero está escrita en presente, dentro de dos runs que aún no ejecutan |
| 20 | `#37`: «the entire post-mortem lives in a gitignored file» | **FALSA sobre el disco de hoy.** `logs/INCIDENT-2026-07-11.md` **está rastreado** por git. Mismo caso que la anterior: verdad histórica en tiempo presente |

#### CARAS DE VERIFICAR — SE LISTAN SIN VERIFICAR (10)

No se verificaron. Se enumeran para que el conteo sea honesto:

1. `#29`: «the console shows a completed and a blocked for the same number» — exige levantar la consola.
2. `#41`: «THE COUNTER IS HONESTLY AT ZERO» (noches desatendidas) — no hay contador en disco; exige antes definir qué cuenta como noche.
3. `#37`, `#38`: la cronología del incidente del 2026-07-11 («died between 06:04:32Z and about 06:20Z», «about fifteen minutes») — exige cotejar el post-mortem contra evidencia de proceso que ya no existe.
4. `#22`: «Everything approved so far was against small repositories» — «small» no está definido y los repos objetivo se movieron de sitio.
5. `#30`: «whether usage figures are available on that path at all is not established anywhere in this system» — verificar una ausencia en todo el workspace más la documentación del proveedor.
6. `#28`: «the write order brackets the second run's death to a four-line window with four possible exits» — es una reconstrucción forense, no una comprobación barata.
7. `#34`: «four vocabularies already compete for this axis in the workspace» — exige un barrido de los tres repos.
8. `#40`: «The console renders it, the engine validates it» — exige ejecutar consola y motor.
9. `#23`, `#34`, `#35`: las afirmaciones sobre el contenido de `D-028`, `D-029` y `D-030` en `DECISIONES.md` — exigen leer y adjudicar el log de decisiones entero.
10. `#31`: «CONSTITUCION §4 nominally forbids reintroducing detectors without an incident» aplicado a si esta lectura cruza o no la línea del detector — es un juicio, no una medición.

**Afirmaciones que quedaron sin verificar: 10.**

### 4.c Coordenadas fechadas

**Resultado: cero.**

Se barrieron `title`, `summary` y `full_description` de los 17 `planned` buscando
`#N`, `objective_id` (`O1`–`O9`), `phase_id` (`On.Pn`) y `run_id` de otro run.

| patrón buscado | ocurrencias en los 17 textos vivos |
|---|---|
| `#N` (referencia a otro run por número) | **0** |
| `objective_id` de otro run (`O1`…`O9`) | **0** |
| `phase_id` de otro run (`On.Pn`) | **0** |
| `run_id` de otro run | **0** |

**Los runs vivos se refieren unos a otros SOLO por nombre descriptivo** — «evidence
portability», «run identity», «the manifest», «the category field», «push
activation», «the decoupled launcher», «the milestone». Una referencia por nombre
sobrevive a una reordenación; una por número no.

**Consecuencia medida:** las dos reordenaciones **no pudieron romper ninguna
coordenada en los textos vivos, porque no hay ninguna que romper.** Este es el
hallazgo negativo más valioso del paso 4, y conviene decir por qué: no es que el
riesgo no existiera, es que la redacción de estos runs lo evitó por construcción.

Fuera del alcance de este paso, y se nombra sin medirlo: el run `#20` —`completed`—
sí publica una tabla de equivalencia con `objective_id` de otro roadmap, y `#16`
—`completed`— sí cita `O3`, `O4` y `O5` en su nota de nivel roadmap. No se auditaron:
el encargo restringe el paso 4 a los `planned`.

---

## 5. Honestidad de las posiciones

Solo sobre los `planned`. **Es lista, no acto: no se propone ningún movimiento ni se
añade ninguna arista.**

### 5.a Aristas que faltan

Pares donde un run declara EN PROSA una dependencia del mismo roadmap que no lleva en
`depends_on`.

| par | dirección | cita, y `depends_on` real |
|---|---|---|
| `#32` → `#29` y `#32` → `#28` | `#32` depende de ellos | «This document must be written against whatever the manifest and run-identity work leave behind, not against today's shape — which is why it sits at the end of this objective rather than the start.» · `depends_on` de `#32` = **`[]`** |
| `#42` → `#41` | `#42` depende de él | «It should be written after the milestone, against measured behaviour.» · `depends_on` de `#42` = **`[]`** |
| `#42` → `#37` | `#42` depende de él | «How a window is LAUNCHED, under the decoupled launcher rather than the old terminal-bound procedure» · y «THE OLD OPERATING RULE ... IS DEROGATED by the decoupled launcher» · `depends_on` de `#42` = **`[]`** |
| `#22` ← `#29`, `#31`, `#39`, `#41` | **dirección inversa**: `#22` declara que los otros dependen de él | «the mechanisms in the objectives that follow — the manifest, mid-run signals, worktrees, long unattended sessions — are all sized for load nobody has measured. Building them against an unmeasured baseline is how the estimate becomes the requirement.» · ninguno de los cuatro lleva arista a `#22` |
| `#38` ↔ `#37` | **el texto no lo resuelve** | Dice «it is not separable from the launcher», y en el mismo párrafo argumenta lo contrario: «A decoupled launcher... reduces how often this happens; it does not make an abrupt death impossible». Se reporta el par con las dos citas, sin decidir cuál gana |

**5 pares. Ninguna arista se añade aquí.**

### 5.b Posiciones que podrían mentir

Con la cautela pedida: la posición correcta puede ser la que el plan contradice.

**El único caso medido, y es de fases, no de runs:** en `O3` —y solo en `O3`— el
orden de las fases contradice el `queue_order` de sus runs.

| objetivo | secuencia de fases vs `queue_order` |
|---|---|
| O1 | `P1[1..10] P2[11]` — coincide |
| O2 | `P1[12] P2[13,14,15] P3[16] P4[17] P5[18,19] P6[20] P7[21]` — coincide |
| **O3** | **`P1[23] P2[22] P3[25] P4[24] P5[26] P6[27]` — NO coincide, en dos pares** |
| O5 | `P1[28] P2[29,30] P3[31] P4[32]` — coincide |
| O6 | `P1[33] P2[34] P3[35] P4[36]` — coincide |
| O7 | `P1[37] P2[38] P3[39] P4[40] P5[41] P6[42]` — coincide |

Causa medida en git (§7.4): los runs se reordenaron dos veces y **las fases no se
renumeraron**. `#22` y `#23` son los `planned` afectados; `#24` y `#25` ya cerraron.
**No se propone movimiento.** Se hace notar que el propio roadmap ya declaró, para
`objective_id`, la doctrina que resolvería esto sin mover nada: «an objective_id keeps
its gap because it is identity, not a sequence».

Los demás casos revisados **no mienten**:

- `#22` declara ser precondición de cuatro mecanismos posteriores y **está delante de
  los cuatro** (22 < 29, 31, 39, 41). Posición honesta; lo que falta son las aristas
  (§5.a).
- `#28` dice «THIS RUN PRECEDES THE MANIFEST» y está en 28 contra el 29, **con la
  arista puesta**. Honesta.
- `#33` dice «THIS RUN GOES FIRST IN ITS OBJECTIVE» y es el menor `queue_order` de O6.
  Honesta.
- `#23` depende de `#22` y va detrás (23 > 22). La arista y la cola concuerdan; lo que
  disiente es solo la etiqueta de fase.

### 5.c Piezas compartidas — medido, no razonado

Conteo sobre los 17 textos vivos.

| pieza | runs `planned` que la comparten | n |
|---|---|---|
| **`D-055`** (la adjudicación que define qué es mecanismo) | los 17 | **17** |
| **El bloque de presupuesto heredado** — «478 of about 500» + «22 lines of slack» + «human and documentary», los tres juntos | `#23, #28, #29, #30, #31, #34, #35, #37, #38, #39, #40` | **11** |
| `CONST:33` (criterio de borrado) | `#23, #28, #30, #31, #34, #35, #38, #39, #40` | **9** |
| **Una entrada nueva en `DECISIONES.md`** como condición de arranque | `#23, #28, #30, #31, #34, #35, #38, #39, #40` | **9** |
| `CONST:30-32` (los cuatro campos) | `#23, #29, #30, #31, #34, #37, #39, #40` | **8** |
| el ejecutor | `#22, #23, #31, #32, #34, #37, #38, #40` | **8** |
| el reviewer | `#22, #28, #31, #32, #34, #36` | **6** |
| **el lockfile** | `#32, #37, #38, #39, #41` | **5** |
| **el manifiesto de run** | `#22, #28, #29, #30, #32` | **5** |
| el cierre (`closeout`) | `#32, #33, #34, #35, #36` | **5** |
| carriles y barriers | `#32, #36, #40, #41, #42` | **5** |
| `CONST:28-29` (el techo) | `#23, #28, #29, #37` | **4** |
| `logs/` como carpeta | `#22, #28, #29, #37` | **4** |
| `kernel.mjs` nombrado literalmente o citado como `K:<línea>` | `#23, #32` + `#28, #29` | **4** |
| `logDir` | `#28, #29` | **2** |
| `queue.mjs` nombrado literalmente | `#37` | **1** |
| `config.json` | `#33` | **1** |

**Las dos piezas más compartidas no son código: son una decisión (`D-055`, 17 runs) y
una cifra heredada (el bloque de presupuesto, 11 runs).** Y **9 runs esperan una
entrada en un archivo que vive en otro repositorio**. La pieza de código más
compartida es el lockfile, con 5.

---

## 6. Censo de runs mixtos — pedido por el hilo `aiw-console`

**Las tres reglas mecánicas para runs mixtos NO EXISTEN.** Está declarado así en
`context/CLASIFICACION-DE-RUNS.md §7`, que se leyó **solo para conocer la frontera**:
«Las tres reglas mecánicas para runs mixtos fueron acordadas en la auditoría de cabina
del 2026-07-29/30, NO SE LOCALIZARON EN DISCO... Este documento no las reconstruye».

**Este paso tampoco.** No las inventa, no las deduce, no las aproxima. Solo cuenta y
caracteriza, en las palabras de cada run.

**Este censo no clasifica ningún run.** No se asigna ni se insinúa ningún valor de
`correctness_model`, `work_type`, `blast_radius`, `failure_surfaces` ni
`external_effects`; no se deriva `severity` ni `closure_mode`; y no se propone ninguna
regla. Las palabras que siguen son las de los runs.

### 6.1 El conteo

**De un solo tipo: 10 · Mixtos: 7 · Total: 17.**

### 6.2 Los de un solo tipo (10)

| `#N` | el tipo, en sus palabras |
|---|---|
| 28 | «It changes how the kernel computes logDir, which is code in aiw.» |
| 29 | «Have the kernel write a per-run manifest recording that run's identity and outcome» |
| 31 | «It adds a new capability to the run loop, which is code in aiw.» |
| 32 | «Document what a run writes and where» |
| 35 | «It adds a batch parameter to the queue and changes which branch a run targets, which is code in aiw.» |
| 36 | «Document categories and batches» |
| 38 | «It adds recovery logic to the kernel or the queue, which is code in aiw.» |
| 39 | «It changes how the kernel prepares its working tree and how the lock is scoped, which is code in aiw.» |
| 40 | «making the KERNEL read and obey them is code and a new step in aiw» |
| 42 | «Document how to run and audit an unattended window» |

### 6.3 Los mixtos (7), con qué mezclan y en qué proporción aparente

La proporción es **aparente y se mide por cuánto texto del `full_description` dedica
el run a cada parte**. No es un peso de esfuerzo.

**`#22`** — mezcla **ejecutar un run real** y **medir lo que hizo**.
«Run the first real objective against a large repository with a test net» ·
«THE DELIVERABLE IS A MEASUREMENT. Not a report on how it went, not a document
proposing improvements».
*Proporción:* la medición domina — la mayor parte del texto enumera qué debe capturar
(«how many rounds it consumed, where the executor's time went, whether the timeouts
are sized correctly, whether the diff cap truncated anything the reviewer needed»). La
ejecución es el vehículo, y el run excluye explícitamente un tercer tipo: el documento.

**`#23`** — mezcla **un cambio en el kernel** y **un test**.
«The fix, per D-028: require that the scope point at at least one file or glob matching
a REAL file in the target repository» · «Small, and with a test.»
*Proporción:* el cambio domina con mucho; el test cabe en tres palabras al final de un
párrafo.

**`#30`** — mezcla **averiguar si el proveedor expone los números** y **añadir el
código que los escriba**.
«whether usage figures are available on that path at all is not established anywhere in
this system, and this run does not assume they are» · «Add token and cost accounting to
the run manifest».
*Proporción:* aproximadamente mitad y mitad, y el run declara que la primera puede
matar a la segunda: «IF THEY ARE NOT EXPOSED, THIS RUN IS RETIRED RATHER THAN WORKED
AROUND».

**`#33`** — mezcla **cambiar configuración** y **la decisión operativa detrás**, en sus
propias palabras y en la misma frase.
«This run changes configuration and the operating decision behind it; it does not add
code or a new step».
*Proporción:* pareja. Y declara un tercer tipo **condicional**: «If activation turns out
to require new code rather than a flag, that code IS mechanism».

**`#34`** — **el más mixto del roadmap: tres tipos.**
(a) código — «It adds a parsed field and a branch in the kernel's closeout, which is code
and a new step in aiw»;
(b) zanjar un vocabulario y enmendar documentos — «THIS RUN ABSORBS THE VOCABULARY ITEM
THAT WAS LOOSE UNDER METHODOLOGY IN THE OLD BACKLOG... one name must win, amended in
both packs»;
(c) una decisión previa — «Before it executes it must first decide, against D-057,
whether a stored category field is warranted at all».
*Proporción:* la nota de re-encuadre del 2026-07-31 ocupa cerca de un tercio del
`full_description` y es **enteramente** (c); el resto se reparte entre (a) y (b).

**`#37`** — mezcla **código del lanzador** y **derogar por escrito una regla operativa
vigente**.
«Decouple the queue from its hosting terminal» · «DEROGATION, WRITTEN RATHER THAN LEFT
TO COLLIDE... the old rule is retired BY NAME, not left coexisting with its
contradiction».
*Proporción:* el código domina; la derogación es el bloque de cierre, cerca de un sexto
del texto. La regla que deroga se midió y existe en `kernel.mjs:66-67`.

**`#41`** — mezcla **ejecutar las sesiones** y **medirlas y contarlas**.
«run genuinely unattended windows against real repositories and measure them against the
D-018 criterion, rather than declaring them» · «This is measured by running the sessions,
never by declaring them».
*Proporción:* pareja y deliberadamente inseparable — el run insiste en que una no vale
sin la otra.

### 6.4 Mezclas que se repiten — es lo que más importa

**Se repiten dos, cada una en 2 runs:**

| mezcla | runs | por qué son la misma |
|---|---|---|
| **ejecutar + medir** | **`#22`, `#41`** | Los dos ejecutan trabajo real contra repositorios reales y los dos declaran que **el entregable es la medición, no lo ejecutado**. `#22`: «THE DELIVERABLE IS A MEASUREMENT». `#41`: «This is measured by running the sessions, never by declaring them». Es la mezcla que más importa: son los dos únicos runs vivos cuyo producto es un número, y son también los dos que licencian el resto — `#22` dimensiona los mecanismos que vienen detrás, `#41` es la métrica de `CONSTITUCION §6` de la que depende que se justifique cualquier mecanismo nuevo |
| **código + un acto sobre un documento normativo** | **`#34`, `#37`** | `#37` deroga por nombre una regla operativa vigente el día que su código embarca; `#34` zanja un vocabulario y lo enmienda «in both packs» el día que su campo existe. En los dos, el acto documental **no es documentación del código: es una condición para que el código no produzca doble verdad** |

**No se repiten:** código + test (solo `#23`), configuración + decisión operativa (solo
`#33`), y averiguación + código condicional (solo `#30`).

Hay una tercera familia que **no se declara como mezcla repetida porque las tres formas
difieren**, y se nombra solo para que el dato esté: `#30`, `#33` y `#34` llevan cada uno
una decisión previa capaz de anular o redefinir su propio trabajo. En `#30` es una
precondición externa que puede retirar el run; en `#33` es la decisión operativa del
operador; en `#34` es decidir contra `D-057` si el campo procede siquiera. Se reporta
como observación de conteo, no como patrón.

---

## 7. Mediciones de apoyo

### 7.1 Cobertura, confirmada por conteo

| condición | conteo |
|---|---|
| `planned` con fila en §2 | **17 de 17** |
| `planned` con categoría `CONST §4` | **17 de 17** — 0 sin declarar |
| `planned` con veredicto de elegibilidad | **17 de 17** — 5 elegibles, 12 no |
| `planned` con fila en el censo del §6 | **17 de 17** — 10 de un tipo, 7 mixtos |

### 7.2 El estado real de `.gitignore`, contra tres textos vivos

`aiw/.gitignore`, 7 líneas, verbatim: `sandbox/` · `locks/` · `node_modules/` ·
`jame_snapshot/` · *(vacía)* · `.aiw/` · `.project/git_history.json`.

**No hay línea `logs/`.** Rastreados: `logs/` 58 archivos, `.aiw/` 0 archivos,
`.project/` 5 archivos. `logs/INCIDENT-2026-07-11.md` está rastreado.

### 7.3 Los ocho runs cerrados en disco

8 carpetas con `summary.md`, las 8 `APPROVED`, las 8 `Rounds: 1/3`, las 8 con `push:
not configured for this project`. Más una novena carpeta, la huérfana del incidente,
sin `summary.md`.

### 7.4 Las dos reordenaciones — fecha medida en git

| commit | fecha (autor) | qué movió |
|---|---|---|
| `c8c40ba` | **2026-07-29 03:35:19 -0600** | `queue_order` 22 ↔ 23, y añade el `depends_on` de `#23` hacia `#22` |
| `5fea6cd` | **2026-07-29 04:30:01 -0600** | `queue_order` 24 ↔ 25 |

**El encargo las fecha el 2026-07-30; git las fecha el 2026-07-29.** El único commit de
`roadmap/roadmap.json` con fecha 2026-07-30 es `66255a5`, y **no movió nada**: cambia un
`"status": "planned"` por `"completed"` (cierra el `#25`).

En ninguno de los dos commits de reordenación se tocaron los `phase_id` — de ahí el
desajuste de `O3` medido en §5.b.

---

## 8. Reparaciones propuestas — **NINGUNA APLICADA**

Lista, no acto. Cada una con el run afectado, qué dice, qué mide el disco y el coste en
una línea.

| # | run | qué dice | qué mide el disco | coste de arreglarlo |
|---|---|---|---|---|
| R1 | `#34` | «the eleven open tickets» | **9** tickets abiertos; `pending/` vacío desde `d312c83` | una cifra en un `full_description` |
| R2 | `#28`, `#29` | «logs/ is gitignored», en presente | `logs/` versionado, 58 archivos rastreados, sin línea en `.gitignore` | una cláusula temporal en cada uno; dos ediciones |
| R3 | `#37` | «the entire post-mortem lives in a gitignored file» | `logs/INCIDENT-2026-07-11.md` rastreado | una cláusula |
| R4 | `#37` | «the M1-M4 comments that head the kernel» | cero etiquetas `M1`/`M2`; `M3`/`M4` en `kernel.mjs:62,84,96,229,300`, no en la cabecera | una frase, o nombrar las cuatro reparaciones por lo que son |
| R5 | `#32` | «preflight.txt ... is the FIRST thing written» | `kernel.mjs:324` escribe `STAGE.txt` antes que `:326` | media frase |
| R6 | `#31` | cinco señales que «already exist» | cuatro existen; «whether a guard fired» (`kernel.mjs:363`) no se escribe a ningún artefacto | una frase, o incorporarlo al alcance del run |
| R7 | `#32` | depende en prosa del manifiesto y de run-identity | `depends_on` = `[]` | dos aristas — **no se añaden aquí** |
| R8 | `#42` | depende en prosa del hito y del lanzador | `depends_on` = `[]` | dos aristas — **no se añaden aquí** |
| R9 | `#29`, `#31`, `#39`, `#41` | `#22` declara que están dimensionados contra carga no medida | ninguno lleva arista a `#22` | cuatro aristas, o una frase en `#22` que declare que no lo son — **no se añaden aquí** |
| R10 | `O3` | fases `P1..P6` como secuencia | `P1[23] P2[22]`, `P3[25] P4[24]` | renumerar dos pares de fases, **o** declarar que el `phase_id` es identidad y no secuencia, como el roadmap ya declaró para `objective_id` — **no se hace aquí** |
| R11 | el ticket de este encargo | «la cola se reordenó dos veces el 2026-07-30» | `c8c40ba` y `5fea6cd`, ambos **2026-07-29** | una fecha |
| R12 | los 11 runs de mecanismo | «22 lines of slack (478 of about 500)» repetido idéntico | cierto hoy (478 medidas), pero heredado once veces sin re-medir, y calculado contra `500` cuando `CONSTITUCION.md:29` dice `~500` | una decisión: o la cifra se centraliza en un sitio, o cada run declara que la re-mide al arrancar — **no se decide aquí** |

---

## 9. Qué mide este record y qué no

**Mide:** los totales del canónico y la densidad de su cola; el propósito, las fases y
el rango de cada objetivo; los 17 runs vivos con su compuerta, su elegibilidad y sus
bloqueos de prosa; las líneas reales del kernel y el techo real con `ruta:línea`; la
resolución de todas las citas de los textos vivos; veinte afirmaciones contables; las
coordenadas fechadas; las aristas ausentes, el desajuste de fases de `O3` y las piezas
compartidas; y el censo de un solo tipo contra mixto.

**No mide, y es deliberado:** no clasifica ningún run ni asigna valor alguno del
vocabulario de clasificación; no propone la regla de runs mixtos; no repara ningún
hallazgo; no añade, mueve, renumera ni borra nada; no cambia el status de ningún run;
no ejecuta la suite ni la consola; y no redacta ninguna entrada de `DECISIONES.md`.

**Estado de git al cerrar.** `aiw`: `git status --porcelain` **vacío**, igual que al
abrir — cero escrituras.

`aiw-console`: `git status --porcelain` muestra **exactamente una entrada**, y es este
record — `?? context/aiw-console/records/AUDITORIA-ROADMAP-AIW.md`.

Se declara un movimiento observado durante la auditoría, para que la medición sea
reproducible. Al abrir, `aiw-console` tenía **siete archivos ya modificados** sin
relación con este encargo (`.project/` × 6 y `roadmap/roadmap.json`) — el mismo cuadro
que `SUITE-CONTRA-FIXTURES.md §A4` registró el 2026-07-30. Al cerrar ya no aparecen:
**otro hilo los committeó mientras esta auditoría medía**, en `8f60657` («run 43
CERRADO...», 2026-07-31 21:44:52 -0600). Este encargo **no committeó nada, no revirtió
nada y no tocó ninguno de esos siete archivos**; solo hace constar que el estado de
partida que observó ya no es el que un lector encontrará.

---

## 10. Resumen ejecutable

| pregunta del encargo | respuesta medida |
|---|---|
| ¿42 runs, 6 objetivos, 29 fases? | **Sí, las tres.** |
| ¿25 `completed` / 17 `planned`? | **Sí**, y el 17 ahora está contado, no restado |
| ¿`queue_order` denso `1..42` y único? | **Sí.** 0 huecos, 0 duplicados |
| ¿`kernel.mjs` en 478 contra ~500? | **Sí.** 478 líneas; techo `~500` en `CONSTITUCION.md:29`, `500` en `kernel.mjs:4` |
| ¿`git status` de `aiw`? | **Vacío**, antes y después |
| ¿Algún objetivo con hueco en su `queue_order`? | **Ninguno.** El hueco es `O4`, y es de `objective_id`; el roadmap lo declara permanente en `#16` |
| ¿Cuántos `planned` son elegibles hoy? | **5 de 17**: `#22, #32, #33, #37, #42` |
| ¿Qué detiene a la mayoría? | **Su propia compuerta, no el grafo.** 9 de 17 esperan una entrada en `DECISIONES.md` |
| ¿Reparto de `CONST §4`? | PAPEL **6** · INCIDENTE COMPLETO **2** · NO PUEDE EJECUTAR **9** · **SIN DECLARAR 0** |
| ¿Cuántos `planned` declaran mecanismo? | **11**, y **los 11** citan la misma holgura heredada |
| ¿Alcanza el presupuesto de líneas? | **No se puede contestar.** **0 de 11** declaran cuántas líneas añadirían. No se estima |
| ¿Citas `ruta:línea` rotas? | **0.** Las 5 formas resuelven; las 9 rutas existen |
| ¿Afirmaciones falsas en textos vivos? | **3** — el conteo de once tickets, y `logs/` declarado gitignored en dos sitios (más el post-mortem en un tercero) |
| ¿Imprecisas? | **3** — `M1-M4`, «FIRST thing written», y cuatro de cinco señales |
| ¿Coordenadas fechadas rotas? | **0**, porque **hay 0 coordenadas**: los runs vivos se citan solo por nombre |
| ¿Aristas que faltan? | **5 pares**, ninguno añadido |
| ¿Posiciones que mienten? | **Una, y es de fases**: `O3` tiene `P1[23] P2[22]` y `P3[25] P4[24]` |
| ¿Runs mixtos? | **7 de 17.** De un solo tipo: 10 |
| ¿Alguna mezcla se repite? | **Dos.** **ejecutar + medir** (`#22`, `#41`) y **código + acto sobre documento normativo** (`#34`, `#37`) |
| ¿Se clasificó algún run? | **No.** Ni un valor, ni una regla |
| ¿Reparaciones aplicadas? | **Ninguna.** 12 propuestas en §8 |

**El roadmap de AIW no está bloqueado por su grafo. Está bloqueado por una constitución
que exige incidentes que nadie ha escrito todavía, y esa es una condición que ninguna
reordenación de la cola puede mejorar.**
