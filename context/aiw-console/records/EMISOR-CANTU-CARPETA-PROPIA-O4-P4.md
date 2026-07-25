# EMISOR — `cantu-studio` emite su carpeta propia (`O4.P4`)

> Entregable de conocimiento del run `RUN-CONSOLE-EMISOR-CANTU-CARPETA-PROPIA-001`
> (fase `O4.P4`, tramo 4). Documenta **qué modo y qué LAYOUT de root aplicó a Cantu y
> por qué**, **el mapeo fuente-de-Cantu → archivo-de-`.project/`**, **si su vocabulario
> difirió y cómo se resolvió**, **qué fuentes suyas quedaron fuera del mínimo**, **la
> consecuencia declarada de la decisión de Docs**, y **qué necesita AIW para entrar**
> (insumo directo de `O4.P6`).
>
> Fecha: 2026-07-25. **No se ejecutó git en ninguna forma que escriba.** Git se leyó solo
> donde el emisor de historia ya lo requiere (`log`, `rev-parse`, `for-each-ref`,
> `branch --show-current`), más `rev-parse HEAD` / `branch --show-current` /
> `status --porcelain` como constancia de que el estado de `cantu-studio` no se movió.
> No se tocó el roadmap, `DECISIONES.md`, `CONTRATO.md`, ningún record existente, el fork
> D-035 (`docs/project-console/` de este repo), el prototipo retirado (`console/`) ni el
> tooling viejo (`tools/project-console/`).
>
> **Archivos escritos por este run, y ninguno más:**
> `tools/projector/project.mjs` (aditivo) ·
> `tests/projector-cantu.test.mjs` y `tests/shell-two-real-projects.test.mjs` (nuevos) ·
> `tests/projector-roadmap-tree.test.mjs` (un test reemplazado, D.4) ·
> **los seis archivos de `cantu-studio/.project/`** — la única escritura fuera de este
> repo, y el propósito de la fase · el `.project/` de este repo, re-emitido · este record.
> **El `.aiw/` de cualquier repo NO fue tocado**: el de `cantu-studio` está intacto
> (md5 agregado idéntico, E.1) y el de este repo **sigue sin existir**.

Insumos, usados y no re-medidos: `EMISOR-CARPETA-PROPIA-O4-P2.md` (el modo `roadmap_tree`,
la decisión del envelope), `SHELL-MULTIPROYECTO-O4-P3.md` (Bloque F, qué necesita un
proyecto para entrar al menú), `MEDICION-FUENTES-CONSOLA.md` (Bloque B: en Cantu las 15
fuentes SÍ existen en disco), `AUDIT-CONSOLE-O4-PHASE0.md`, `CONTRATO.md`.

---

## BLOQUE A — El problema medido: Cantu no encajaba en ninguno de los dos modos

`detectRootMode` tenía dos salidas y Cantu **no era ninguna de las dos**:

| Requisito | `aiw_objectives` (modo 1) | `roadmap_tree` (modo 2) | Qué tiene Cantu |
|---|---|---|---|
| Plan | `objectives/{pending,parked,processed}/*.md` | `roadmap/roadmap.json` | `.aiw/roadmap/roadmap.json` |
| Evidencia | `logs/<id>/summary.md` | — | — |
| Identidad | `config.json` | `package.json` | ninguno de los dos |
| Modelo declarado | — | `schema_version: "roadmap_tree_v1"` | `"jame.roadmap_v3.v0.2-progress"` |

Cantu caía en el modo 1 por descarte, donde no tiene ni una sola de sus tres entradas: el
resultado habría sido un snapshot vacío. **Dos puertas cerradas, no una**, y cada una por
una razón distinta:

1. **La RUTA del plan era un literal.** El emisor buscaba `roadmap/roadmap.json` y nada más.
2. **El MODELO era un gate por cadena.** `readRoadmapTree` exigía
   `schema_version === "roadmap_tree_v1"`. El árbol de Cantu tiene **los mismos tres
   niveles con las mismas claves** (`objective_id`/`phase_id`/`run_id`, `status`,
   `depends_on`, `queue_order`, `title`, `summary`, `full_description`) y se rechazaba
   **solo por cómo se llama**.

La segunda es la que importa doctrinalmente: **un gate por nombre de modelo solo puede
admitir árboles bautizados por quien eligió el nombre.** Es la identidad horneada de §10.c
un nivel más arriba — no en el dato, en el criterio de admisión. Si el contrato solo
funciona para el proyecto que lo escribió, no es contrato: exactamente lo que esta fase
tenía que probar o desmentir.

---

## BLOQUE B — Qué se construyó: dos generalizaciones, ninguna con nombre de proyecto

### B.1 La ruta → un LAYOUT de root (`ROOT_LAYOUTS`)

Un layout es un **bundle completo y autoconsistente de rutas relativas**. Un root se
compara contra la lista **en orden** y gana el primero cuyo roadmap parsea y conforma:

| Layout | roadmap | guardrails | no_claims | contract_ref |
|---|---|---|---|---|
| `repo_root` | `roadmap/roadmap.json` | `governance/guardrails.json` | `governance/no_claims.json` | `governance/contract.json` |
| `project_local_aiw` | `.aiw/roadmap/roadmap.json` | `.aiw/guardrails/project_guardrails.json` | `.aiw/guardrails/no_claims.json` | `.aiw/guardrails/contract.json` |

Tres propiedades, cada una deliberada:

- **Es una FORMA DE ROOT, no un proyecto.** `repo_root` dice "el plan está arriba del
  repo"; `project_local_aiw` dice "el plan está en el área AIW local del proyecto".
  Ninguna entrada contiene un nombre de proyecto ni una ruta absoluta — **probado por
  test**, que recorre las entradas y falla si alguna trae identidad o una ruta absoluta.
- **Se resuelve COMO UNIDAD.** El layout que aporta el roadmap aporta también la
  gobernanza. Sondear cada entrada por separado permitiría leer un root mitad en un layout
  y mitad en otro: el emisor estaría reportando un proyecto que no existe. Hay test.
- **Un tercer layout es una cuarta línea de esa tabla**, no una rama en ninguna parte.

`repo_root` va primero, así que este repo se resuelve por donde siempre y su salida no se
mueve (Bloque D).

### B.2 El modelo → un gate por FORMA (`hasRoadmapTreeShape`)

Se comprueba **lo que el emisor realmente consume**: tres niveles, cada uno identificado
(`objective_id` / `phase_id` / `run_id`) y cada run con `status`. Son exactamente los
campos que leen `flattenRoadmapTree`, las derivaciones y `currentStatusSummary`, así que un
árbol que pasa **se puede emitir entero** y uno que falla **solo se habría podido emitir
con agujeros**. El nombre del modelo ya no decide nada.

**Los campos de identificación no son documentación: son la barrera de una regresión real.**
La proyección de arranque del modo 1 escribe su propia vista de roadmap en
`.aiw/roadmap/roadmap.json` — **la ruta exacta que sondea el segundo layout** — y esa vista
también es objetivos→fases→runs. Un gate que solo contara niveles habría volteado **todo
root AIW ya proyectado** al modo 2 en su siguiente corrida. La vista del modo 1 lleva
`title` y **no** lleva ids, así que exigirlos la excluye por construcción. **Hay test
dedicado**: proyecta un root AIW, escribe su vista donde el layout la sondearía, y afirma
que sigue siendo `aiw_objectives`.

### B.3 El nombre del modelo VIAJA, verbatim (`declaredRoadmapModel`)

§10.c — el árbol identifica su propio modelo. El emisor **republica, no reetiqueta**:

- Este repo declara `roadmap_tree_v1` → emite `roadmap_tree_v1` (sin cambio, byte a byte).
- Cantu declara `jame.roadmap_v3.v0.2-progress` → **emite eso**, en
  `roadmap_tree.model` y en `taxonomy_model.model`.
- Un árbol conforme que no declara modelo recibe el identificador de este contrato: la
  forma fue verificada, así que nombrarla es una medición, no una invención.

Se consideró y se descartó normalizar a `roadmap_tree_v1`: sería decirle a Cantu cómo se
llama su propio plan, que es la misma clase de acto que el gate por nombre, con el signo
cambiado. **El shell lo pinta sin un solo cambio de código** — es la prueba de que la
decisión del envelope de O4.P2 sirve para N proyectos, y de que ningún gate del shell
compara cadenas de modelo (lo que O4.P3 ya había medido con un fixture, y ahora está
medido con un emisor real).

### B.4 La versión del emisor: `aiw-projector@0.5.0`

§6 pide que `generated_from` nombre herramienta **y** versión, y el comportamiento se movió
(un emisor que puede leer el layout de un segundo proyecto no es el que solo podía leer
uno). **Consecuencia anotada, porque toca un criterio de aceptación:** el criterio pedía
que el `.project/` de este repo se re-emitiera idéntico "salvo `generated_at` y
`freshness`", y `generated_from` es una tercera diferencia esperada. Se resolvió **probando
las dos cosas por separado** (Bloque D): con la versión normalizada, todo es byte-idéntico;
sin normalizar, la única diferencia extra es la cadena de versión.

---

## BLOQUE C — El mapeo: fuente de Cantu → archivo de `.project/`

Layout aplicado: **`project_local_aiw`**, decidido por la forma del root.
`project_id: "cantu_studio"`. Reloj real; los tamaños son los del disco.

| Artefacto emitido | Bytes | Fuente REAL de Cantu | Contenido, contado |
|---|---:|---|---|
| `snapshot.json` (**requerido**, capa 1) | 72 692 | `.aiw/roadmap/roadmap.json` | 7 objetivos · 28 fases · **53 runs** · `operational_status: "idle"` |
| `roadmap.json` (§19) | 68 218 | la misma, mismo bloque | el árbol, verbatim |
| `docs_index.json` (§18.b) | 169 708 | corpus `.md` del propio repo | **342** documentos |
| `guardrails.json` (§18.b) | 1 625 | `.aiw/guardrails/project_guardrails.json` | **5** reglas |
| `no_claims.json` (§18.b) | 696 | `.aiw/guardrails/no_claims.json` | **1** claim |
| `git_history.json` (§19) | 210 173 | su propio repositorio Git | **458** commits · 1 rama (`main`) · 3 commits nombran un run del roadmap |

**Derivaciones verificadas contra el dato real.** `operational_status: "idle"` —el árbol de
Cantu no tiene ningún run `active` ni `blocked` (51 `planned`, 2 `completed`)— y es el
primer proyecto que ejercita ese token, que en el modo 1 era **inalcanzable** (§17). Los 7
objetivos derivan: seis `planned` y uno `in_progress` (O5, el único con runs `completed`).
Las 28 fases derivan sin excepción. `current_status_summary`: "No active run; 2 of 53 runs
completed."

**Identidad, sin nada horneado.** `cantu_studio` sale del nombre de la carpeta normalizado
(no hay `package.json` en su raíz). **Decisión anotada:** su `.aiw/project.json` declara
`project_id: "jame_system_dual"` y `display_name: "JAME System Dual Parallel"`. **No se
usó**, y no se añadió como fuente de identidad: es el nombre previo al rename, y adoptarlo
habría emitido una identidad obsoleta y desalineada de la key del registro. Se prefiere la
regla genérica que ya existía y que da la respuesta actual y correcta. Queda dicho aquí
para que sea una decisión visible y no un olvido.

**`sources` y §7.** El snapshot declara una sola fuente, `.aiw/roadmap/roadmap.json` con su
`mtime`: `package.json` no existe en Cantu, así que **se omite** en vez de emitirse como
puntero roto. `taxonomy_model.specified_by` tampoco se emite: Cantu no declara dónde vive
su contrato normativo, y no se le presta la ruta de otro proyecto.
`no_claims_summary: {total: 1, source: ".project/no_claims.json"}` resuelve porque los dos
archivos de gobernanza se escriben **antes** que el snapshot, que es el único punto donde
el orden de emisión importa.

---

## BLOQUE D — Aditividad PROBADA, no afirmada

La prueba fuerte no es contra un archivo golden (que envejece con sus insumos), sino
**A/B entre los dos emisores**: se reconstruyó el emisor pre-O4.P4 revirtiendo las 20
ediciones de este run, y se corrieron **ambos contra los mismos roots en el mismo
instante**. Ninguno escribe: se comparan objetos construidos en memoria.

| Comparación | Resultado |
|---|---|
| `aiw` (kernel) `buildSnapshot()` — camino viejo | **IDÉNTICO** |
| `aiw` (kernel) `buildRoadmap()` — camino viejo | **IDÉNTICO** |
| `aiw` destino de escritura (`resolveSnapshotPath`) | **el mismo** |
| `aiw` modo detectado | `aiw_objectives` antes y después |
| `.project/snapshot.json` de este repo | **IDÉNTICO** |
| `.project/roadmap.json` | **IDÉNTICO** |
| `.project/docs_index.json` | **IDÉNTICO** |
| `.project/guardrails.json` | **IDÉNTICO** |
| `.project/no_claims.json` | **IDÉNTICO** |
| `.project/git_history.json` | **IDÉNTICO** |
| `cantu-studio` modo detectado | `aiw_objectives` → **`roadmap_tree`** |

Única normalización aplicada: `generated_from`, que §6 **exige** que cambie cuando cambia
el comportamiento. Es decir: **el emisor nuevo produce exactamente los mismos bytes que el
viejo para todo lo que el viejo podía emitir**, y la última fila es el trabajo de la fase.

**La comparación contra el disco, por separado.** Reconstruir los seis archivos con el
`generated_at` que cada uno trae y compararlos contra los bytes en disco da **idénticos en
cuatro**. Los otros dos difieren, y difieren **por deriva de los INSUMOS, no del emisor**:
`docs_index.json` porque el record de O4.P3 entró al repo después de la última emisión (lo
dejó dicho su propia cabecera), y `git_history.json` por 3 commits nuevos. Ambos son
exactamente lo que §6 existe para hacer visible.

**D.4 Un test previo fue reemplazado, y se dice cuál.** `projector-roadmap-tree.test.mjs`
tenía un test que afirmaba que un roadmap declarando `jame.roadmap_v3.v0.2-progress` **no**
reclamaba el modo 2. Ese test **codificaba el gate por cadena**, que es justo lo que esta
fase invierte a propósito; dejarlo habría sido dejar la puerta que cierra el contrato a un
proyecto. Se reemplazó por dos: uno que afirma que un roadmap de otra **FORMA** sigue sin
reclamar el modo, y otro que afirma que un árbol conforme con nombre propio **sí** entra y
**su nombre viaja**. Borrarlo en silencio habría sido lo indebido; reemplazarlo declarando
qué se invirtió es lo que corresponde.

---

## BLOQUE E — `cantu-studio` no fue modificado fuera de `.project/`

**E.1 Medición, antes y después.** Árbol de hashes de **1 012 archivos / 23 777 682 bytes**
(todo el repo excepto `.git/`, `.project/` y `node_modules/`), con md5, mtime y tamaño por
archivo. **Agregado antes = agregado después = `a60eb953657d1ec49c2df95060159b0c`**, con
`diff` vacío archivo por archivo. La medición se repitió **al final**, después de emitir,
de correr su validador y de renderizar las dos consolas: **sigue idéntica**.

Los nombrados explícitamente por el encargo, con md5 y mtime:

| Archivo | md5 | mtime |
|---|---|---|
| `.aiw/roadmap/roadmap.json` (roadmap canónico) | `58803b0a…9959ea` | `2026-07-24 20:11:55` |
| `.aiw/docs/docs_index.json` (su índice) | `7f383666…3f0a549` | `2026-07-22 19:25:08` |
| `.aiw/project.json` | `522539fb…00542b` | `2026-07-22 19:25:08` |
| `tools/project-console/validate-project-console-state.mjs` | `7322c8c6…a3b323d` | `2026-07-24 20:11:55` |
| `docs/project-console/assets/project-console.js` | `4000bebd…528860` | `2026-07-22 19:25:10` |

El último coincide con el md5 que O4.P3 ya había registrado — la cadena de custodia entre
fases cierra. Git: `HEAD` en `8e9991e3…` y rama `main`, iguales antes y después;
`status --porcelain` reporta **solo** `?? .project/`.

**E.2 Por construcción, no solo por medición.** La guarda `resolveInsideProject` resuelve
contra el root de destino y lanza si la ruta sale de su `.project/`. Hay test que lo prueba
sobre un root del layout nuevo, intentando escapar hacia `..` y hacia `.aiw/`.

**E.3 Su consola local sigue funcionando — verificado SIN escribir.** Aquí hay una tensión
real entre dos criterios de aceptación, y se resolvió a favor del más fuerte, diciéndolo:
**arrancar su servidor habría escrito**. `tools/project-console/serve-project-console.mjs`
llama `runBuild("startup")`, que genera `.aiw/views/git_history.snapshot.json` — una
escritura fuera de `.project/`, prohibida por el encargo como frontera dura. Así que **no
se arrancó**, y se verificó por los dos caminos que no escriben:

1. **Su validador, ejecutado**: `Project Console state validation passed.` — 7 objetivos /
   28 fases / 53 runs, 140 docs indexados, 16 component statuses, 9 episodios de
   provenance. Cero escrituras (grep: 0 llamadas de escritura en el validador). Reporta
   `Git history snapshot: not present (generated locally by serve-project-console.mjs)`,
   que **confirma** que ese archivo lo escribe su server y que hoy no está.
2. **Su consola, renderizada**: servida read-only a través del namespace
   `/projects/cantu-studio/**` del shell y abierta en el navegador. Pinta lo de siempre:
   título "Cantu Studio Project Console", 7 objetivos, 51 runs en la cola, 38 documentos en
   su navegación (su modo curado propio), sus 5 guardrails, 14 fuentes cargadas / 1 fallida
   (justamente la que su server generaría).

**Convivencia aditiva (D-036) demostrada:** dos consolas leyendo el mismo repo, cada una su
carpeta, ninguna estorbando a la otra.

**E.4 Los demás repos.** El `.aiw/` de este repo **sigue sin existir** (estado que ACABADO
E.3 y O4.P3 ya registraron; este run tampoco lo creó). El kernel `aiw` está intacto
(agregado `deee7f11…87d403`, 52 archivos, antes y después). `cantu-lessons` no se tocó.

---

## BLOQUE F — El vocabulario de Cantu: qué difirió y cómo se resolvió

**Difirió el IDENTIFICADOR DEL MODELO; no difirieron los TOKENS.** Medido, no supuesto:

| | este repo | `cantu-studio` |
|---|---|---|
| Identificador del modelo | `roadmap_tree_v1` | **`jame.roadmap_v3.v0.2-progress`** |
| Tokens de `run.status` declarados por el proyecto | `planned`·`active`·`blocked`·`completed` | **los mismos cuatro**, en otro orden |
| Dónde los declara el proyecto | el contrato | `tools/roadmap/roadmap-core.mjs:37` (`STATUSES`) — **código, no dato** |
| Tokens realmente usados en su árbol | los cuatro | **dos**: `planned` (51), `completed` (2) |
| `operational_status` derivado | `active` | **`idle`** |

**Resolución, en tres partes:**

1. **El identificador viaja tal cual** (B.3). El snapshot de Cantu declara
   `taxonomy_model.model: "jame.roadmap_v3.v0.2-progress"`, distinto del de este repo, y
   **el shell lo renderiza sin un cambio de código**. Probado en la suite y en el navegador.
2. **El vocabulario emitido es el del CONTRATO**, y es correcto porque **coincide**: se
   comprobó contra la constante `STATUSES` del propio Cantu. La coincidencia es del orden,
   no del conjunto, y el orden solo afecta el orden de las celdas de conteo del Portfolio.
3. **La suposición se convirtió en invariante comprobada.** Hay test que afirma, **para los
   dos proyectos reales**, que todo token de `run.status` presente en el árbol está
   declarado en el vocabulario emitido. Si algún día deja de ser cierto, la suite lo dice.

**Límite abierto, dicho como tal (G.1):** un proyecto que declare sus tokens **en un
archivo** no tiene hoy manera de que el emisor los lea — el vocabulario emitido es el del
contrato, y para un proyecto con tokens genuinamente ajenos sería una declaración
incorrecta. No se construyó el gancho porque ningún proyecto real lo necesita todavía y
habría sido maquinaria sin usuario; queda registrado como pendiente, con su mitigación del
lado del lector (el shell reporta verbatim un token presente y no declarado, O4.P3 B.3).

---

## BLOQUE G — Lo que NO se emitió, y por qué

**G.1 Las 9 fuentes diferidas: NO se emiten, aunque Cantu SÍ las tiene.**
Es la asimetría que esta fase tenía que sostener y la sostiene. `MEDICION-FUENTES` Bloque B
ya había medido que en Cantu las 15 fuentes existen en disco, a diferencia de este repo. Y
existen: `.aiw/project.json`, `.aiw/state/{project_status,component_status}.json`,
`.aiw/state/events.jsonl`, `.aiw/ledgers/{change_ledger,git_provenance,human_qa,ai_reviews}.jsonl`,
`.aiw/guardrails/project_memory.jsonl` — con datos reales.

**No se emitieron, y la razón no es que falten sino que emitirlas rompería la simetría.**
El mínimo funcional es el mismo para todos: agrandar el contrato por el proyecto que más
archivos tiene es cómo un contrato se vuelve el inventario de su miembro más rico. Su fase
sigue sin abrir, para todos. **Probado por test**: `.project/` de Cantu no contiene
`project.json`, ni `state/`, ni `ledgers/`, ni `guardrails/` — ni stubbeados ni vacíos, que
es lo que §20 prohíbe (un archivo vacío en una carpeta declarada derivada afirma que el
dato no existe).

**G.2 Fuentes de Cantu sin equivalente en el mínimo — se anotan, no se emiten.**
`.aiw/docs/` es su corpus de metadatos de documentación (6 archivos:
`canonical_documentation_model.json`, `docs_corpus_curation_audit.json`,
`documentation_inventory.json`, `docs_retention_archive_policy.json`,
`component_doc_single_source_contract.json`, y su `docs_index.json` curado).
`.aiw/roadmap/` tiene además `roadmap_v2.json`, `roadmap_v2_normalized_proposal.json` y
`legacy_run_disposition_map_v2.json`. `.aiw/ledgers/human_decisions.jsonl` no tiene
equivalente en las nueve. **Ninguna entra**: el mínimo son seis archivos y estas no son
ninguno de los seis. Anotadas aquí, como pide el encargo.

**G.3 `validation_summary` sigue opaco** (`{}`), por §3.b: el validador de la capa 3 no
existe. Cantu tiene un validador propio, pero valida **su** estado en `.aiw/`, no la
carpeta del contrato; usar su salida sería afirmar que `.project/` fue validado, y no lo
fue.

---

## BLOQUE H — La decisión de Docs, y su consecuencia declarada

**Decisión aplicada:** el `docs_index` de Cantu indexa **solo los `.md` que viven en
`cantu-studio`**. **342 documentos**, todos verificados existentes en disco uno a uno —
que es la restricción heredada de su propio validador (`doc.path` debe resolver). Se
clasifican por la misma regla de ubicación que ya existía (`nav_tier_model` viaja en el
archivo): **4 `primary`** (los `.md` de su raíz: `AGENTS.md`, `CLAUDE.md`, `README.md`,
`README_PHASE1.md`) y **338 `secondary`**. `.aiw/`, `.git/`, `node_modules/`, `tests/` y
la propia `.project/` no se escanean.

**El contexto de gobernanza centralizado NO se duplicó.** `context/aiw/`,
`context/cantu-studio/` y `context/handoffs/` viven en el repo `aiw-console` y **se siguen
viendo desde su consola**. Hay test que lo fija: ninguna entrada del índice de Cantu puede
empezar por `context/`.

**LA CONSECUENCIA, declarada:** el **contexto de cabina de Cantu vive en OTRO repo, y por
diseño NO aparece en su pestaña Docs.** Un operador que abra `cantu-studio` en el shell y
busque ahí los records de gobernanza de Cantu **no los va a encontrar**, y eso es correcto,
no una ausencia que reparar: un proyecto, sus documentos. Están a un clic, en la pestaña
Docs de `AIW Console`. Esto **no** se anuncia hoy en la superficie de Docs de Cantu —
§20 pide anunciar la ausencia de una FUENTE, y aquí no falta ninguna fuente: el índice
cargó y lista 342 documentos reales. Si alguna vez se decide que el operador debe verlo
señalado en pantalla, es pulido (`O4.P8`), y queda anotado como tal.

**Nota de contraste, medida:** el índice curado de Cantu registra **140** documentos y su
consola local muestra **38** en su modo por defecto; el emitido lista **342**. No es una
discrepancia: son dos cosas distintas —una curaduría a mano y un barrido del corpus real—
y la del contrato es deliberadamente la segunda (§2: una lista curada a mano se pudre).

---

## BLOQUE I — Qué necesita AIW para entrar (insumo directo de `O4.P6`)

Medido en `aiw/` hoy:

| | Estado |
|---|---|
| `objectives/` | **sí** — `pending` 2, `parked` 3, `processed` 11, más `qualification` 3 y `queue-e7` 3 (dos carpetas que el modo 1 **no** lee) |
| `logs/` | **ABSENTE** — el modo 1 emite `latest_history_items` solo si existe; hoy no hay ninguno |
| `config.json` | sí, pero **sin `project_id`** → el id caería al nombre de carpeta, `aiw` |
| `roadmap/` o `.aiw/roadmap/` | **ninguno** — ningún layout lo reclama; es `aiw_objectives`, verificado |
| `governance/` o `.aiw/guardrails/` | **ninguno** — sin fuentes que transportar |
| `package.json` | ausente |
| Repositorio propio | **sí** (`git rev-parse --show-toplevel` = su propia raíz) → `git_history.json` es alcanzable |
| Corpus `.md` | **34** archivos → `docs_index.json` es alcanzable hoy mismo |
| Línea en el registro | **ya la tiene** (`{"key":"aiw","root":"../../../aiw"}`); hoy se ve "no snapshot", su estado verdadero |

**La decisión que P6 encontrará primero, planteada con sus dos salidas.** AIW **no tiene
árbol objetivo→fase→run**: tiene objetivos planos en carpetas. Ninguna de las dos
generalizaciones de esta fase lo alcanza — no es un problema de ruta ni de nombre de
modelo, es que **el dato tiene otra forma**. Las salidas son:

- **(a) Un tercer modo de root que emita `.project/` desde el layout AIW**, derivando el
  árbol de las carpetas como ya hace `buildRoadmap` (objetivo único → fase única → un run
  por objetivo). Barato y sin tocar a AIW, pero emite un árbol de un nivel real y dos
  inventados, y habría que decidir si eso es transporte honesto o una forma impuesta.
- **(b) Que AIW publique un roadmap con la forma del contrato.** El emisor ya lo serviría
  **sin un cambio**: cualquiera de los dos layouts, cualquier nombre de modelo. Es más
  fiel al contrato y traslada el trabajo a AIW, que es quien sabe cuál es su plan.

Lo que ya está resuelto para AIW pase lo que pase: su `project_id`, su `git_history.json`,
su `docs_index.json` y su línea del registro. Lo que **no** hay que hacer en ningún caso:
inventarle `guardrails.json`/`no_claims.json` — no tiene fuentes, y §20 prefiere la
ausencia anunciada, que el shell ya pinta por archivo.

---

## BLOQUE J — Verificaciones

- **Suite: 107/107 verde** (`node --test`): 85 previas + 14 (`projector-cantu`) + 8
  (`shell-two-real-projects`), más los 2 que reemplazan al retirado en D.4. Las nuevas
  cubren: el gate por forma en sus dos sentidos, que un root AIW **ya proyectado** no
  voltea de modo, que ninguna entrada de layout trae identidad ni ruta absoluta, que el
  primer layout que casa gana **como bundle**, la emisión de Cantu (identidad, modelo,
  fuentes que resuelven, nada derivado almacenado, docs solo de su repo, diferidas sin
  stubbear, atomicidad y repetibilidad, guarda de ruta), y el render de **dos proyectos
  reales con modelos distintos** con cero estado cruzado **en ambas direcciones**.
- **Emisión atómica y repetible**: temp + rename; dos corridas con reloj fijo dan los seis
  archivos byte-idénticos (md5 reportados por el test); cero `.tmp` en disco.
- **Cero identidad horneada en el proyector**, grep reportado (case-insensitive):
  `jame` **0** · `cantu` **0** · `studio` **0** · `aiw_console` **0** · `hilo` **0** ·
  `lessons` **0** · rutas absolutas de proyecto **0**. Los 2 hits de `aiw-console` son
  referencias en comentarios a la ruta del CONTRATO, no identidad en el comportamiento.
  (Las 2 rutas `C:\Program Files\...\git.exe` son el fallback de descubrimiento del binario
  de Git, preexistente de 0.4.0 y sin relación con ningún proyecto.)
- **QA en navegador**, contra el DOM real: Bloque K.

---

## BLOQUE K — REPORTE para QA del operador

**Arranque:** `node project-console/serve.mjs` →
**http://127.0.0.1:8788/project-console/index.html** (`PC_PORT` cambia el puerto).
Abre en el **Project Portfolio**.

**Qué mirar al cambiar entre los DOS proyectos reales:**

1. **El menú lateral ya no miente sobre Cantu.** `AIW Console / active` y
   **`Cantu Studio / idle`** — sin el chip ámbar de degradado, que era su estado hasta esta
   fase. `aiw` sigue en `no snapshot`: es su estado verdadero hasta `O4.P6`.
2. **Las dos tarjetas del Portfolio, lado a lado.** AIW Console: `2 objectives · 15 phases ·
   31 runs`, `planned 12 · active 1 · blocked 0 · completed 18`, objetivos
   `Project Console [active]` y `Consola global [in_progress]`. Cantu Studio:
   `7 objectives · 28 phases · 53 runs`, `planned 51 · active 0 · blocked 0 · completed 2`,
   sus siete objetivos con `[planned]` y un `[in_progress]`. **Los dos tokens derivados
   salen de ejecutar la tabla que cada snapshot trae**, y los modelos de esos dos snapshots
   son distintos.
3. **Abrir `Cantu Studio`** → las cinco pestañas con dato real suyo: Overview con su
   "Current work item", Roadmap con sus 7 objetivos y la Run Queue con 51 runs, **Docs con
   342 documentos**, History con sus commits reales (`main`), y Status → Governance con sus
   **5 guardrails** y su **1 claim**. El banner de opcionales sigue ahí: dice la verdad de
   las 9 fuentes diferidas.
4. **El cambio, en las dos direcciones.** Ensuciar Cantu (pestaña Docs, subview Roadmap, un
   documento cualquiera del medio de la lista, scroll abajo) y pasar a `AIW Console`: vuelve
   a **Overview / Run Queue / Governance / scroll 0**, con **30** documentos (28 + el record
   de O4.P3 + este) y su lector en el suyo. El camino inverso igual: vuelve a Cantu con
   **342** documentos y `AGENTS.md`.
   Verificado en DOM real, con barrido de marcadores del otro proyecto en 15 superficies:
   **0 residuos en ambos sentidos**.
5. **La consola local de Cantu sigue viva**, y se puede comprobar sin escribir nada:
   http://127.0.0.1:8788/projects/cantu-studio/docs/project-console/index.html — pinta lo
   de siempre (7 objetivos, 51 runs, 38 docs en su navegación, 14 fuentes cargadas / 1
   fallida). **No arranques `tools/project-console/serve-project-console.mjs` si quieres
   mantener el repo intacto**: su arranque escribe `.aiw/views/git_history.snapshot.json`
   (E.3). Retirarla es el corte, `O4.P7`.

**Re-emitir** (cuando cambie el roadmap o el corpus de cualquiera de los dos):
`node tools/projector/project.mjs ../cantu-studio` y `node tools/projector/project.mjs .`
La primera línea de salida dice el layout y el modelo con que se leyó el root.

---

## Estado de completitud

- Bloque A (por qué Cantu no encajaba, medido) — COMPLETO.
- Bloque B (layout + gate por forma + modelo que viaja) — COMPLETO y APLICADO.
- Bloque C (mapeo fuente → archivo, con números) — COMPLETO.
- Bloque D (aditividad probada A/B, y el test reemplazado declarado) — COMPLETO.
- Bloque E (cantu-studio intacto; consola local verificada sin escribir) — COMPLETO, con la
  tensión de E.3 resuelta y dicha.
- Bloque F (vocabulario: qué difirió y cómo se resolvió) — COMPLETO, con su límite abierto.
- Bloque G (lo no emitido y por qué) — COMPLETO.
- Bloque H (Docs y su consecuencia declarada) — COMPLETO.
- Bloque I (qué necesita AIW, insumo de O4.P6) — COMPLETO.
- Bloques J y K (verificaciones y QA) — COMPLETOS.

Ningún bloque quedó "NO ALCANZADO".
