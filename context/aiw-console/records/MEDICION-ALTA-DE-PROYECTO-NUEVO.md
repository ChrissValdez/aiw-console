# MEDICIÓN — Alta de un proyecto NUEVO (`cantu-quizzes-latex`)

**Fecha:** 2026-08-04. **Tipo:** medición read-only fechada (D-042: no se reescribe).

**Qué mide:** qué hace falta para incorporar un proyecto que entra SIN roadmap y que
nunca ha existido, y qué hace falta para abrirle hilo propio en la cabina. Los tres
proyectos registrados hoy llegaron con su roadmap ya escrito; nadie ha hecho lo otro.
Esta medición existe por eso.

**Qué NO hace:** no crea repo ni carpeta ni fichero fuera de este record; no registra
nada (`project-console/projects.json` no se tocó); no escribe roadmap, handoff ni
entrada de decisiones; no cambia el status de ningún run; no diseña el comando de
verificación; no corre la suite; no ejecutó git en ninguna forma.

**Alcance de lectura:** `projects/aiw-console` (excluidos `.git` y `node_modules`) más
`aiw/config.json`, éste **solo** para el criterio D.2.

**Consola viva.** Todo lo que sigue se mide contra `project-console/`.
`docs/project-console/` es el fork descartado por D-035 y `console/` un prototipo
retirado: **ambos existen en el árbol y quedan EXCLUIDOS**, y se dice dónde su
existencia induce a error (B.2, nota sobre `projects.config.json`).

**Método.** Toda cifra lleva `archivo:línea` o el comando que la produjo. Lo ejecutado
fue: `find`/`grep`/`wc` de solo lectura, y cuatro evaluaciones en proceso con
`node --input-type=module -e '…'` que **importan** los módulos del repo y les pasan
objetos en memoria o rutas de fixture ya existentes. **Ninguna escribió un byte.** Se
citan como «medición en proceso» con su entrada.

**Aviso de escala.** Las cifras de este record son de dos clases y no se mezclan:
cifras del CÓDIGO (sitios, líneas, artefactos) y cifras de CONTENIDO de los proyectos
de hoy (runs, docs), que caducan al día siguiente.

---

# BLOQUE A — Qué exige el contrato de un proyecto registrado

## A.1 El conjunto exigido, enumerado

### A.1.1 Artefactos de `.project/`

**Requerido: UNO.** `CONTRATO.md:373-388` (§8, «Hoy: **un** archivo requerido») y
`CONTRATO.md:1946-1950` (§19, «El conjunto requerido sigue siendo uno (§8): el
snapshot»).

| Ruta | Estatus | Cita del contrato | Constante en el emisor |
|---|---|---|---|
| `.project/snapshot.json` | **REQUERIDO** | §1 (`CONTRATO.md:95-97`), §8 (`:373-388`) | `project.mjs:750` |
| `.project/roadmap.json` | opcional | §19 (`CONTRATO.md:1924`) | `project.mjs:751` |
| `.project/git_history.json` | opcional | §19 (`CONTRATO.md:1925`) | `project.mjs:752` |
| `.project/docs_index.json` | opcional | §19 (`CONTRATO.md:1926`) | `project.mjs:753` |
| `.project/guardrails.json` | opcional | §19 (`CONTRATO.md:1927`) | `project.mjs:754` |
| `.project/no_claims.json` | opcional | §19 (`CONTRATO.md:1928`) | `project.mjs:755` |

Unidad: **6 rutas de artefacto**, de las cuales **1 requerida** y **5 opcionales**.
Ninguna se escribe a mano: §2 (`CONTRATO.md:155-158`) y §18 (`:1850-1864`) — «un
archivo sin emisor NO entra en `.project/`».

### A.1.2 Campos obligatorios del snapshot (capa 1)

`CONTRATO.md:206-222` (§3) enumera **14 claves requeridas**: `schema_version`,
`project_id`, `operational_status`, `project_summary`, `current_status_summary`,
`roadmap_tree`, `blockers`, `followups`, `no_claims_summary`, `validation_summary`,
`taxonomy_model`, `generated_at`, `generated_from`, `sources`.

Medido en el snapshot real de este proyecto (medición en proceso sobre
`.project/snapshot.json`): **15 claves de primer nivel** — las 14 más
`emitted_artifacts`, que el emisor añade cuando la emisión es de carpeta completa y
**omite** si el snapshot se construye suelto (`project.mjs:1199-1202`).

`no_claims_summary` y `validation_summary` estaban declarados OPACOS en §3.b
(`CONTRATO.md:233-248`); el emisor de hoy los llena (`project.mjs:1223-1226` y
`:1242-1254`), con lo que la razón de la opacidad —«no hay schema aquí hasta que haya
emisor y ejemplo»— ya no aplica a estos dos. Se anota como hecho, no como enmienda.

### A.1.3 Campos por nivel del `roadmap_tree` (capa 2)

`CONTRATO.md:660-713` (§10.a): raíz `schema_version`/`roadmap_id`/`title`/`objectives`
(+`lanes` OPCIONAL, §10.e); objetivo **3 claves** (`objective_id`, `title`, `phases`);
fase **3 claves** (`phase_id`, `title`, `runs`); run **9 claves** medidas + 2
opcionales de D-051 (`lane`, `barrier`) = **11 admitidas** (`CONTRATO.md:1216-1218`).

Lo que el MOTOR exige de verdad, que es más corto:

- `roadmap-core.mjs:69` — `ROOT_ALLOWED_FIELDS` = 6: `schema_version`, `roadmap_id`,
  `title`, `objectives`, `lanes`, `care_budget`. **Ninguna es requerida salvo
  `objectives`**, que debe ser array (`roadmap-core.mjs:377-380`).
- `roadmap-core.mjs:81` — `OBJECTIVE_REQUIRED_FIELDS` = 3.
- `roadmap-core.mjs:85` — `RUN_REQUIRED_FIELDS` = **7**: `run_id`, `queue_order`,
  `title`, `summary`, `full_description`, `status`, `depends_on`.
- `roadmap-core.mjs:179` — `RUN_ID_PATTERN` = `/^RUN-[A-Z0-9-]+-\d{3}$/`, la forma de
  §10.d Regla 1.a (`CONTRATO.md:866-902`).

### A.1.4 Qué documentos del repo se dan por supuestos

Los da por supuestos el LAYOUT, no el contrato. `project.mjs:776-793` define **dos**
layouts, cada uno un bundle de **5 rutas** resuelto como unidad:

| Clave del bundle | `repo_root` | `project_local_aiw` |
|---|---|---|
| `roadmap` | `roadmap/roadmap.json` | `.aiw/roadmap/roadmap.json` |
| `guardrails` | `governance/guardrails.json` | `.aiw/guardrails/project_guardrails.json` |
| `no_claims` | `governance/no_claims.json` | `.aiw/guardrails/no_claims.json` |
| `contract_ref` | `governance/contract.json` | `.aiw/guardrails/contract.json` |
| `docs_index` | `docs/docs_index.json` | `.aiw/docs/docs_index.json` |

**Solo `roadmap` es determinante**: `detectRootLayout` (`project.mjs:933-939`) prueba
únicamente esa ruta y devuelve el primer layout cuyo archivo parsea y conforma. Las
otras cuatro son opcionales y degradan a `null` (`project.mjs:1497-1505`,
`:1319-1326`, `:1010-1014`).

Fuera del bundle, el emisor toca dos cosas más del repo, ambas opcionales:

- `package.json` (`project.mjs:799`) — solo para el `project_id`
  (`project.mjs:1088-1093`) y como entrada de `sources` (`:1186`). Ver D.3.
- El corpus Markdown del repo, para el índice de docs escaneado (`project.mjs:1285`).

## A.2 Obligatorio contra herencia — la pregunta central

Lo que los tres tienen y **NO** es exigido por nada. Medido sobre este repo:

| Lo que hay en `aiw-console` | ¿Exigido? | Prueba |
|---|---|---|
| `governance/guardrails.json` | **NO** | `buildGuardrails` → `null` si falta y el artefacto no se emite (`project.mjs:1509-1511`, `:1811`). Medido: `buildGuardrails('tests/fixtures/multi/vacio')` = `null`, sin excepción |
| `governance/no_claims.json` | **NO** | ídem, `project.mjs:1513-1515`. El snapshot emite `no_claims_summary: {}` (`project.mjs:1223-1226`) |
| `governance/contract.json` | **NO** | `project.mjs:1010-1014`: «a project that declares nothing simply gets no pointer», y §7 omite una ruta que no resuelve |
| `docs/docs_index.json` | **NO** | Este repo **no lo tiene** (medido: `ls docs/` devuelve `project-console` y `snapshot-schema-v1.md`), así que su índice es ESCANEADO (`project.mjs:1310-1313`) |
| `package.json` | **NO** | Si falta, `project_id` cae a `basename(root)` (`project.mjs:1090`). Medido: `buildDocsIndex('tests/fixtures/multi/vacio')` → `project_id = "vacio"`, y ese root no tiene `package.json` |
| Un repositorio git propio | **NO** | `buildGitHistory` → `null` y `write` salta el artefacto (`project.mjs:1843-1848`). Emite 5 en vez de 6 |
| `.aiw/` | **NO** para un layout `repo_root` | Es la otra rama de `ROOT_LAYOUTS` (`project.mjs:786-792`), no un requisito |
| `context/<proyecto>/` | **NO** | Ver C.3 |
| `records/` | **NO** | Ver C.3 |
| Un handoff | **NO** | Ver C.3 |
| `lanes` / `barrier` | **NO** | §10.e, «Todo es OPCIONAL y ADITIVO» (`CONTRATO.md:1172-1176`); este repo no declara carriles |
| `care_budget` | **NO** | `roadmap-core.mjs:425-427`: «ABSENT IS THE NORMAL CASE… all three canonicals are in that state today» |
| `progress` en los runs | **NO** | §15 (`CONTRATO.md:1604-1605`): opcional, ausente por defecto. Medido en §15.a: **1 de 56** runs del canónico de este repo |
| Clasificación de runs | **NO** | §1 de la especificación, citada en `project.mjs:1245-1252`: «it is LISTED, never refused» |

**Lo verdaderamente exigido para que un root sea un proyecto de este contrato es UNA
cosa: un archivo en `roadmap/roadmap.json` (o `.aiw/roadmap/roadmap.json`) que pase
`hasRoadmapTreeShape`** (`project.mjs:902-918`). Todo lo demás de la lista es
herencia: los tres actuales lo tienen porque venían de otro sitio, no porque algo lo
pida.

La puerta de admisión está escrita para que sea así: `project.mjs:885-891` — «A tree
claims this mode by CONFORMING to capa 2, not by declaring a string this emitter
recognises».

## A.3 ¿Puede un proyecto conforme tener roadmap VACÍO o INEXISTENTE?

Contestado contra las tres superficies, no contra el contrato solo.

### A.3.1 Roadmap INEXISTENTE — **NO**. Medido.

Medición en proceso sobre `tests/fixtures/multi/vacio` (un root real sin roadmap):

```
detectRootLayout        = null
detectRootMode          = "aiw_objectives"
buildRoadmapTreeSnapshot LANZA: No roadmap_tree_v1-shaped roadmap under …\vacio
                                (layouts tried: roadmap\roadmap.json, .aiw\roadmap\roadmap.json)
buildProjectRoadmap     = null
buildGuardrails         = null   buildNoClaims = null
buildDocsIndex          = objeto, docs = 0, project_id = "vacio"
```

Consecuencias, con su cita:

- **Emisor:** `buildRoadmapTreeSnapshot` lanza (`project.mjs:1146-1153`). Como
  `writeProjectFolder` lo llama al final (`project.mjs:1860`) después de haber escrito
  `docs_index` y `git_history`, una invocación directa dejaría `.project/` a medias.
- **Servidor:** no llega a eso. `resolveEditableProject` devuelve 404
  `project_not_editable_no_layout` (`serve.mjs:401`) y las tres rutas de escritura
  refusan **sin abrir un archivo**. La de emisión además explica por candidato
  (`diagnoseCanonicalCandidates`, `serve.mjs:639-660`).
- **Consola:** el proyecto aparece en el menú marcado `no snapshot` — ver B.4.

### A.3.2 Roadmap VACÍO — **SÍ pasa el código**. Medido.

Medición en proceso, `hasRoadmapTreeShape` + `checkInvariants` sobre cinco árboles en
memoria:

| Árbol | `hasRoadmapTreeShape` | `checkInvariants` (errores) |
|---|---|---|
| `{objectives: []}` | **true** | **0** |
| `{}` | false | 1 — `root.objectives must be an array` |
| 1 objetivo con 0 fases | **true** | **0** |
| 1 objetivo, 1 fase, 0 runs | **true** | **0** |
| 1 objetivo, 1 fase, 1 run | true | 0 |

Razón mecánica: `hasRoadmapTreeShape` valida con `Array.prototype.every`
(`project.mjs:905-916`), que es verdadero por vacuidad; y `checkInvariants` no tiene
ningún chequeo de colección vacía (recorrido completo de `roadmap-core.mjs:364-731`).

Y la consola lo renderiza. Medición en proceso, pasando a `snapshotSummary` el
snapshot que el emisor produciría para `{objectives:[]}`:

```
snapshotSummary     => OBJETO (no null)
  counts            = {"objectives":0,"phases":0,"runs":0}
  runStatusCounts   = []
  operationalStatus = "idle"
portfolioBoardHtml  = 1561 bytes; tarjeta degradada = false
  pinta "0 objectives · 0 phases · 0 runs"  = true
  pinta "none" en la lista de objetivos     = true
sidebarProjectsHtml = 303 bytes
```

Es una tarjeta **normal**, no degradada (`project-shell.js:330` elige
`portfolioOkCard` porque `status === "ok"` y hay `summary`). Sin excepción y sin
banner de ausencia.

### A.3.3 El mínimo que pasa

- **Mínimo que pasa el CÓDIGO:** un archivo en `roadmap/roadmap.json` con
  `{"objectives": []}`. **0 objetivos, 0 fases, 0 runs.** Emite, valida y renderiza.
- **Mínimo que satisface el CONTRATO por su propia letra:** **1 objetivo, 1 fase, 1
  run**, porque §12.b (`CONTRATO.md:1378-1381`) declara MALFORMADO un objetivo con 0
  runs y §13 (`:1483-1490`) extiende la regla a las fases. Un run exige sus 7 campos
  requeridos (`roadmap-core.mjs:85`), `queue_order = 1` (contigüidad 1..N,
  `roadmap-core.mjs:583-586`), `status` del vocabulario cerrado (`project.mjs:808`) y
  `run_id` con la forma `RUN-<PROYECTO>-<SLUG>-<NNN>` (`roadmap-core.mjs:179`).

Los dos mínimos no coinciden. Eso es A.4.

## A.4 ⛔ PARADA Y REPORTE — el contrato y el código discrepan

**La discrepancia, con las dos citas enfrentadas:**

- **El contrato dice que se rechaza.** §12.b, `CONTRATO.md:1380-1381`: «La derivación
  queda INDEFINIDA. No recibe token — ninguno. **El validador de la capa 3 lo rechaza
  como dato malformado.**» §13, `CONTRATO.md:1488`: «una fase con 0 runs es MALFORMADA
  exactamente como un objetivo con 0 runs (§12.b)». Registrado como decisión `h` de la
  tabla de capa 2 (`CONTRATO.md:2099`).
- **El código no lo rechaza.** `checkInvariants` devuelve **0 errores** para un
  objetivo con 0 fases y para una fase con 0 runs (medición de A.3.2). En
  `roadmap-core.mjs:364-731` no existe tal chequeo.

**Lo que sí está implementado, y es otra cosa:** `deriveCollectionStatus` devuelve
`null` para una colección vacía (`project.mjs:983-986`), y hay test que lo fija
(`tests/projector-roadmap-tree.test.mjs:206` — `assert.equal(deriveCollectionStatus([]), null); // §12.b — MALFORMED, never completed`).
Es decir: se implementó **«no inventar token»** y no se implementó **«rechazar»**. Son
las dos mitades de §12.b y solo viajó una.

**No es hipotético. Está vivo en el canónico de este mismo proyecto.** Medición en
proceso sobre `roadmap/roadmap.json` y `.project/roadmap.json`:

```
roadmap/roadmap.json:   2 objetivos / 23 fases / 56 runs
                        fases con 0 runs: O4.P5, O4.P7, O4.P8   (3 de 23)
.project/roadmap.json:  idéntico (3 de 23)
```

`aiw-console` es un proyecto registrado, emitido y renderizado, y **3 de sus 23 fases
(13 %) son lo que §13 declara malformado.** El motor las acepta; la emisión las
transporta; la consola las pinta.

**Qué decide esto y por qué no lo decide un taller.** Un proyecto nuevo va a heredar
una de las dos lecturas y no puede heredar las dos:

| Salida | Qué implica | Coste medido |
|---|---|---|
| **Manda el contrato** | Añadir el chequeo a `checkInvariants` | ~10 líneas en **1 archivo** (`tools/roadmap/roadmap-core.mjs`) + su test. **Efecto inmediato: pone ROJO el canónico de `aiw-console`** (3 fases), y con él la ruta de emisión (`serve.mjs:714-716`, `canonical_invariants_failed`) y la de edición (`serve.mjs:359-374`). Antes de tocar el chequeo habría que vaciar esas 3 fases o llenarlas: **3 fases en 1 canónico** |
| **Manda el código** | Enmendar §12.b y §13 a «sin token, no rechazado» | 2 secciones de `CONTRATO.md` + 1 fila de la tabla de decisiones (`:2099`). 0 líneas de código. Legaliza lo que ya ocurre |
| **Ninguna, se pospone** | El proyecto nuevo nace con la ambigüedad dentro | 0 hoy. El coste es que la primera fase vacía que alguien escriba en `cantu-quizzes-latex` tendrá dos veredictos |

**No se decide aquí.** Es adjudicación de cabina: cambia la norma o cambia el motor, y
en un caso mueve datos de un proyecto vivo.

---

# BLOQUE B — Qué cuesta registrarlo

## B.1 El registro y el resolutor de layout

**El registro.** `project-console/projects.json` — **9 líneas, 3 entradas** (`:5-7`):

```json
{ "registry_model": "project_registry_v1",
  "title": "AIW Console",
  "projects": [ { "key": "aiw-console",  "root": ".." },
                { "key": "cantu-studio", "root": "../../cantu-studio" },
                { "key": "aiw",          "root": "../../../aiw" } ] }
```

**Campos que pide una entrada: DOS**, y ninguno más se lee. `project-shell.js:66-82`
lee `key` y `root` y descarta cualquier entrada sin uno de los dos; `serve.mjs:200-204`
hace lo mismo del lado servidor. Reglas medidas:

- `key` debe casar `/^[A-Za-z0-9][A-Za-z0-9._-]*$/` — declarado **dos veces**, en
  `project-shell.js:49` y en `serve.mjs:175`. `cantu-quizzes-latex` casa.
- `key` duplicada se descarta (`project-shell.js:72-75`, `serve.mjs:202`).
- `root` se resuelve **relativo a la carpeta del registro** (`serve.mjs:203` —
  `resolve(registryDir, root)`), es decir a `project-console/`. Por eso `aiw-console`
  es `..` y no `.`.
- `registry_model` y `title` **no se validan**: `title` se usa como rótulo
  (`project-shell.js:60`) y `registry_model` no lo lee nadie (0 ocurrencias fuera del
  propio archivo y de los fixtures).

**Los layouts que existen: DOS** (`project.mjs:776-793`), ya tabulados en A.1.4.

**Cuál correspondería a un repo nuevo con su canónico en `roadmap/roadmap.json`:**
**`repo_root`** — es el primero de la lista y su clave `roadmap` es exactamente
`join("roadmap","roadmap.json")` (`project.mjs:779`). Al resolverse, el bundle entero
queda fijado: `governance/guardrails.json`, `governance/no_claims.json`,
`governance/contract.json`, `docs/docs_index.json` (`project.mjs:780-783`). Es el mismo
layout de `aiw-console` (medido: este repo tiene `roadmap/roadmap.json` y `governance/`).

## B.2 Todos los sitios que hay que tocar

**CONFIGURACIÓN — 1 sitio, obligatorio:**

| # | Sitio | Unidad |
|---|---|---|
| 1 | `project-console/projects.json:4-8` (array `projects`) | **+1 entrada JSON de 2 claves** (`key`, `root`); en la práctica **+1 línea** |

**CÓDIGO — 0 sitios.** Verificado por barrido, no por confianza:

- El shell parsea el registro genéricamente (`project-shell.js:53-84`) y compone la
  base por clave (`:88-90`). No hay lista de proyectos en él.
- El servidor resuelve claves contra el registro leído **en cada petición**
  (`serve.mjs:165-206`, comentario `:166` — «so an operator can edit the registry
  without restarting the server»).
- El resolutor de layout es data-driven (`project.mjs:776-793`, comentario `:766-767`
  — «a third shape is a fourth line here, not a branch anywhere»).
- `project-console/index.html` nombra **0 proyectos** (medido: `grep -c` = 0 sobre 265
  líneas).
- Existe un test que prohíbe que el renderer nombre proyectos
  (`tests/docs-path-grouping.test.mjs:305-312`: la lista de literales prohibidos
  incluye `context/aiw-console`, `cantu`, `jame`, `aiw_console`, `cantu_studio`).

**TESTS — 0 sitios.** Ningún test lee el registro real:

- `tests/real-projects-smoke.test.mjs:28` hardcodea `[["aiw-console", REPO_ROOT],
  ["cantu-studio", CANTU]]` y filtra por `existsSync` del snapshot (`:29`). Un cuarto
  proyecto no entra ahí y **no pone roja la suite**.
- `tests/helpers/neighbours.mjs:37-40` congela **2** roots como fixtures, por diseño
  (`:9-13` — «a neighbour's run count is not an invariant of this console's code»).
- Los suites de consola usan `PC_REGISTRY` y el registro de fixtures
  (`tests/fixtures/multi/projects.json`, 4 entradas), nunca el real (`serve.mjs:67-69`).

**DOCUMENTACIÓN — 1 sitio, opcional y ya desfasado:**

| # | Sitio | Unidad | Nota |
|---|---|---|---|
| 2 | `project-console/README.md:57-66` (bloque de ejemplo del registro; las entradas, en `:62-63`) | +1 línea del ejemplo | **Ya está desfasado hoy**: muestra 2 entradas (`aiw-console`, `cantu-studio`) cuando el registro real tiene 3. Sin efecto funcional |

**Lo que NO hay que tocar, y por qué se dice:**

- **`projects.config.json`** (raíz, 5 líneas, 1 entrada). Es del **servidor viejo**
  `tools/project-console/serve-project-console.mjs:46`, que sirve
  `/docs/project-console/index.html` (`:74`) — el fork descartado por D-035. La consola
  viva no lo lee. Existe además `projects.config.json.bak`. **Trampa de nombre: es el
  fichero que más se parece a un registro y es el equivocado.**
- **`tools/project-console/validate-project-console-state.mjs`** (3087 líneas). Barrido
  completo: **0 referencias** desde `package.json`, desde los tests o desde los
  lanzadores; las únicas menciones fuera de prosa están dentro de datos de fixture de
  `cantu-studio`. Es herencia del fork y **no participa en el alta de nada**.
- `start-console.cmd` / `start-console.ps1`: solo comprueban que existan
  `project-console\serve.mjs` y `project-console\projects.json`
  (`start-console.ps1:34-35`). No enumeran proyectos.

**Total: 1 sitio obligatorio (configuración), 0 de código, 0 de test, 1 opcional de
documentación.**

## B.3 ¿El modo edición se enciende solo con el registro? — NO

Exige **tres condiciones a la vez**. Medidas en la cadena completa:

1. **Que la consola la sirva el servidor local.** El cliente sondea con un GET al
   endpoint de escritura y **solo acepta un 405 con `reason: "method_not_allowed"`**
   (`project-console.js:5518-5533`). Un host estático da 404 y `file://` lanza: en
   ambos casos el modo edición queda apagado, honestamente.
2. **Que el proyecto esté REGISTRADO.** `resolveEditableProject` → 404
   `unknown_project` si la clave no resuelve (`serve.mjs:393-394`).
3. **Que un LAYOUT reclame su root.** `detectRootLayout(root)`; si devuelve `null`,
   404 `project_not_editable_no_layout` (`serve.mjs:396-401`). Más el guardián de
   frontera `resolveCanonicalWritePath`, que puede refusar con 403
   `write_destination_out_of_bounds` (`serve.mjs:402-407`).

El mensaje que el operador ve cuando falla es explícito
(`project-console.js:5561`): «Edit mode is unavailable: the local console server is not
reachable, or the active project has no editable roadmap (no root layout claims one).»

**Conclusión medida: registrar es NECESARIO y NO SUFICIENTE.** Sin canónico conforme en
una de las dos rutas de layout, el proyecto se registra, aparece en el menú y **no se
puede editar ni emitir**. El propio código lo da por caso real y no por hipótesis:
`serve.mjs:761-762` — «A root no layout claims is the case an operator actually meets
(today: the `aiw` kernel)», y `project-console/README.md:115` repite lo mismo («refuses
honestly where no layout claims a roadmap (today: `aiw`, until O4.P6)»).

## B.4 ¿Qué pasa hoy si un proyecto registrado no ha emitido nada? — Medido

**No rompe. Lo pinta, marcado.** Hay fixture dedicado y hay test que lo fija.

El fixture: `tests/fixtures/multi/vacio/` — un root registrado
(`tests/fixtures/multi/projects.json:8`) con **1 archivo** (`LEEME.txt`) y **sin
`.project/`**. Su propio texto declara el caso: «Prueba la degradacion del shell ante un
proyecto que aun no emite (el caso real de cantu-studio y aiw hoy): debe aparecer en el
menu marcado con su estado, sin romper nada.»

Lo que hace el shell, con cita:

| Situación | `status` | Línea del menú | Anuncio |
|---|---|---|---|
| No hay `.project/snapshot.json` | `missing` | `"no snapshot"` (`project-shell.js:218`) | `projects/<key>/.project/snapshot.json could not be loaded` (`:229`) |
| Hay pero no parsea o no tiene `project_id` | `invalid` | `"snapshot unreadable"` (`:219`) | `… is not a readable snapshot` (`:230`) |

Fijado por test: `tests/shell-model.test.mjs:171-176` (las cuatro cadenas exactas) y
`tests/shell-switch.test.mjs:124-130` — «a project with no .project/ at all reports
missing (the real case of cantu-studio and aiw today)», que además comprueba que el
aviso nombra el archivo.

Y no contagia: la tarjeta del portafolio es la degradada
(`project-shell.js:306-326`), cuyo texto dice literalmente «The other projects are
unaffected.» (`:316`). El test de arranque confirma que un proyecto roto no impide
abrir otro sano (`tests/shell-switch.test.mjs:120-122`).

Además, el arranque solo pide **1 artefacto por proyecto** — el snapshot
(`project-shell.js:515-518`), así que un root registrado sin emitir cuesta un 404 y
nada más.

**Veredicto: lo pinta vacío y marcado. Ni lo rechaza ni rompe.**

---

# BLOQUE C — Qué hace falta para habilitar un HILO nuevo

## C.1 Estructura completa de `context/`, tal como está

Medido con `find ./context -type f`: **136 archivos** (`120` records + `16` fuera de
records) en **6 directorios**.

```
context/
  README.md                          índice de la carpeta (90 líneas)
  DECISIONES.md                      log del SISTEMA, transversal, append-only
  CLASIFICACION-DE-RUNS.md           especificación transversal (176 líneas)
  PROCEDIMIENTO-DE-CLASIFICACION.md  procedimiento transversal (236 líneas)
  MIGRATION-REPORT.md                transversal
  handoffs/                          3 archivos
    aiw-console.md   (257 líneas)
    aiw.md           (249 líneas)
    cantu-studio.md  (300 líneas)
  aiw/                               6 archivos, SIN records/
    AIW_CONTEXT.md (279) · ESTADO.md (70) · DELEGACION.md (46)
    roadmap_AIW_temp.md (228) · Audit_Report_AIW_Kernel_v1.md (171)
    Audit_Report_Contexto_Metodologia_v1.md (308)
  aiw-console/                       1 archivo + records/
    CONTRATO.md (2155 líneas)
    records/  ← 120 archivos .md
  cantu-studio/                      1 archivo, SIN records/
    CANTU_STUDIO_CONTEXT.md (537 líneas)
```

**Transversal (5 archivos):** los cinco `.md` de la raíz de `context/`.
**Por proyecto (3 carpetas):** `aiw/`, `aiw-console/`, `cantu-studio/`.
**Relevo (1 carpeta, 3 archivos):** `handoffs/`.

**Dos desviaciones del índice contra el disco, medidas:**

- `context/README.md:54` declara `handoffs/orquestacion.md` («hilo meta»). **No existe
  en disco.** Los handoffs son 3, no 4.
- `context/README.md:78-79` dice que `aiw/` contiene `records/`. **No existe.**
  `context/aiw-console/records/` es el **único** directorio de records del árbol.

Se anotan porque el índice es lo primero que leería quien dé de alta un proyecto nuevo,
y describe dos cosas que no están.

## C.2 Los tres handoffs comparados — la forma REAL

**Secciones en común: CERO.** Extraídos todos los encabezados `#`/`##`/`###`:

| | `aiw-console.md` | `aiw.md` | `cantu-studio.md` |
|---|---|---|---|
| Secciones `##` | 8, numeradas 1-8 | 9, numeradas 1-9 | 8, **sin numerar** |
| H1 | `# Relevo — hilo \`aiw-console\`` | `# Handoff — hilo \`aiw\`` | `# HANDOFF — hilo \`cantu-studio\` (el proyecto)` |
| Estilo de título | Mayúsculas | Minúsculas | MAYÚSCULAS mezcladas |

**Ni un solo título de sección coincide entre los tres.** Ni siquiera la palabra del
H1: uno dice «Relevo», dos dicen «Handoff».

**Lo que SÍ comparten los tres — 4 rasgos, y son la forma real que hereda el handoff
inaugural:**

1. **Un H1 que nombra el hilo**, con el nombre del proyecto entre backticks
   (`aiw-console.md:1`, `aiw.md:1`, `cantu-studio.md:1`).
2. **Fecha de la sesión, en el preámbulo, antes de cualquier sección.**
   `aiw-console.md:3` («**Fecha:** 2026-08-02 · **Sustituye** al relevo del
   2026-08-01»); `aiw.md:3` («Última sesión: 2026-08-03. Escrito al cierre.»);
   `cantu-studio.md:23` («**Última actualización de este handoff: 2026-08-01.**»).
3. **Una declaración de que la sustancia va DENTRO, no en punteros** — la misma
   doctrina, escrita tres veces con tres razones: `aiw-console.md:5-6` («los records no
   se leen desde cabina»); `aiw.md:5-8` («`context/aiw-console/records/` NO se sincroniza
   al Project»); `cantu-studio.md:10-12` («no afirma hechos, apunta a dónde están
   medidos… las cifras viajan con su cita»).
4. **Un primer bloque de estado con cifras medidas**, sea cual sea su título:
   «DÓNDE ESTAMOS» (`aiw-console.md:10`), «Estado al cierre — verificado, no recordado»
   (`aiw.md:12`), «QUÉ SIGUE — lo primero» (`cantu-studio.md:31`).

Solo uno de los tres (`cantu-studio.md:3-8`) lleva el bloque que declara que el archivo
es EFÍMERO y se sobrescribe — la regla que `context/README.md:60-62` fija para los tres.

**Consecuencia para el handoff inaugural:** no hay plantilla que copiar. Lo que se
hereda son esos 4 rasgos; la numeración, los títulos y el orden son de cada hilo. Y hay
un problema propio del caso inaugural que ninguno de los tres tuvo: los cuatro rasgos
presuponen una sesión anterior que cerró. Un hilo que nace no tiene «estado al cierre»
ni cifras que reportar (ver C.4).

## C.3 Qué documentos tienen los tres, y cuáles son exigidos

**Documentos que tienen los tres, por nombre: NINGUNO.** Medido en C.1: los tres nombres
de archivo son `AIW_CONTEXT.md`, `CONTRATO.md` y `CANTU_STUDIO_CONTEXT.md` — tres
convenciones distintas. Ninguno se repite.

**Lo único común a los tres: una carpeta `context/<proyecto>/` con al menos un `.md`.**
Y un handoff en `context/handoffs/<proyecto>.md`. Nada más.

**Cuáles son exigidos por algún validador o índice — barrido completo:**

| Mecanismo | ¿Exige un doc de `context/`? | Prueba |
|---|---|---|
| `checkInvariants` (motor) | **NO** | Recorrido de `roadmap-core.mjs:364-731`: 0 lecturas de disco |
| `hasRoadmapTreeShape` (emisor) | **NO** | `project.mjs:902-918`: solo el árbol |
| `inspectCanonicalForEmission` (servidor) | **NO** | `serve.mjs:670-723`: solo el canónico |
| `writeProjectFolder` (emisor) | **NO** | `project.mjs:1805-1877`: el bundle del layout + el corpus |
| `parseRegistry` / `snapshotSummary` (shell) | **NO** | `project-shell.js:53-84`, `:146-194` |
| `validate-project-console-state.mjs` | **N/A** | No lo invoca nada en este repo (B.2) |
| `DOCS_NAV_TIER_RULES` (emisor) | **NO — clasifica, no exige** | `project.mjs:846-854` |
| `governance/contract.json` | **NO** | `project.mjs:1010-1014`: si no resuelve, se omite el puntero (§7) |

El único mecanismo que **nombra** rutas de `context/` es la tabla de tiers de navegación
(`project.mjs:846-854`):

```js
{ match: "^context/[^/]+/records/", tier: "evidence"  },
{ match: "^context/handoffs/",      tier: "secondary" },
{ match: "^context/",               tier: "primary"   },
```

Es una regla de **visibilidad en la pestaña Docs**, aplicada a lo que exista. El propio
emisor lo declara: «Navigation visibility only: it classifies nothing about a document's
authority or freshness» (`project.mjs:842`). Y está probada con un nombre de carpeta
inventado, no con un proyecto real:
`tests/projector-roadmap-tree.test.mjs:214` espera `["README.md",
"context/area/records/MEASURE.md"]` — «area», no «aiw-console».

**Todo lo de `context/<proyecto>/` es COSTUMBRE.** Lo pide `context/README.md:73-82`
(«Cada una contiene lo permanente de ese proyecto»), que es doctrina de la cabina, no un
validador.

**Cifra de contexto, no de requisito:** el índice de docs de `aiw-console` tiene **140
documentos**, de los cuales **135 (96 %) están bajo `context/`** (medición en proceso
sobre `.project/docs_index.json`). Todos entraron por escaneo, ninguno por exigencia.

## C.4 ⛔ Segunda parada — resultado: NO hay tal exigencia, pero hay un hueco

**El criterio pedía parar si algún mecanismo exige que un proyecto de `context/` tenga
documentos que un proyecto recién nacido no puede tener. Medido: NO existe tal
mecanismo** (tabla de C.3). Ningún validador, ningún índice y ningún emisor pide un
record, un handoff previo ni una carpeta de contexto. Un proyecto sin nada de eso emite
y se renderiza igual.

**Lo que sí queda, y es de otra clase — no bloquea, y por eso no se para:** el hueco no
está en el código sino en la FORMA. Los cuatro rasgos comunes de C.2 —fecha de sesión
anterior, «estado al cierre», cifras medidas, punteros a records— presuponen trabajo ya
ocurrido. El handoff inaugural de `cantu-quizzes-latex` no tiene ninguno de los cuatro
insumos. Puede escribirse igual (nada lo valida), pero no puede parecerse a los tres
existentes, y quien lo escriba tendrá que elegir qué pone donde los otros ponen cifras.

Se reporta como hallazgo, no como parada: no obliga a decidir nada para poder seguir.

---

# BLOQUE D — Lo específico de este proyecto

## D.1 `cantu-quizzes-latex` no existe. Verificado.

```
find . -name "*quizzes*"    →  0 resultados en todo el workspace
ls projects/                →  aiw-console  cantu-lessons  cantu-studio
```

**No existe el directorio y no existe el repositorio.** Las únicas apariciones del
nombre en disco son **3, todas prosa dentro de `aiw-console`**:

- `context/aiw-console/records/RELEVO-AIW-AL-CIERRE-2026-08-02.md:570` — «**CITADO. Sin
  rastro en disco**: 0 apariciones en los dos roadmaps, y el directorio no existe bajo
  `projects/`»
- `context/aiw-console/records/RELEVO-AIW-AL-CIERRE-2026-08-02.md:671`
- `context/handoffs/aiw-console.md:166` — «**`cantu-quizzes-latex`**, proyecto nuevo,
  **lo incorpora este hilo**»

**Esta medición confirma el hallazgo del 2026-08-02 sin desviación:** sigue sin rastro
en disco a 2026-08-04.

**Dato de contorno:** `projects/cantu-lessons` **sí existe en disco y NO está
registrado** en `project-console/projects.json`. Es decir, «directorio bajo `projects/`»
y «proyecto registrado» ya son hoy dos conjuntos distintos (3 y 3, con intersección 2).

## D.2 La forma del comando de verificación — LECTURA SOLAMENTE

Leído `aiw/config.json` una vez, íntegro. **Contiene DOS proyectos, no tres:**

| Clave | `path` | `base_branch` | `verification` | `push` |
|---|---|---|---|---|
| `sandbox` | `…\aiw\sandbox` | `main` | `"npm test"` | `false` |
| `console` | `…\projects\aiw-console` | `main` | `"npm test"` | `false` |

**Corrección al encargo, medida:** el ticket habla de «los tres proyectos registrados en
`aiw/config.json`». Son **dos** entradas, y **`cantu-studio` no figura**. Los tres
registrados están en `project-console/projects.json` (B.1), que es otro archivo con otro
propósito. Los dos registros no coinciden ni en número ni en miembros.

**La forma, tal como está escrita:**

- `verification` es **una clave de tipo string** dentro de `projects.<clave>`, junto a
  otras tres (`path`, `base_branch`, `push`). Unidad: **1 cadena por proyecto**.
- Su valor es **una línea de comando de shell**, no un array ni un objeto. Los dos
  valores existentes son idénticos: `"npm test"`.
- No hay campo de cwd: la única ruta declarada es `path`, y `verification` no la
  menciona.
- No hay campo de timeout por proyecto; los timeouts son globales
  (`aiw/config.json`, `timeouts_ms.verification` = **600000 ms** = 10 minutos).

**Qué tendría que cumplir el de un repo de LaTeX para encajar en ESA forma** —
enumerado como requisitos de forma, sin diseñar el comando:

1. Ser **una sola cadena** ejecutable como línea de comando.
2. Ser invocable **sin argumentos añadidos por el kernel** (nada en el archivo compone
   nada alrededor del valor).
3. Ser **ejecutable desde `path`** sin cambiar de directorio, porque no hay dónde
   declarar otro cwd.
4. Señalar éxito y fracaso por **código de salida** — es lo único que una cadena de shell
   puede devolver, y no hay otro campo donde declarar un criterio.
5. Terminar dentro de los **600000 ms** globales.

**[NO MEDIDO]** cómo consume el kernel ese campo: si lo pasa por shell o por `spawn`, si
fija el cwd a `path`, y qué hace con el código de salida. Está en `aiw/kernel.mjs` o
`aiw/queue.mjs`, **fuera del alcance de lectura de este encargo** (solo se autorizó
`aiw/config.json`). Los cinco requisitos de arriba se derivan de la FORMA del archivo,
no del comportamiento del ejecutor.

**NO se diseña el comando.** Lo que un repo LaTeX pondría ahí es trabajo de otro run.

## D.3 ¿Asume el contrato o el emisor que hay JavaScript o tests de Node?

**Respuesta medida: NO. El encaje no se cae.** Es la pregunta que podía tumbarlo todo y
la contesta un barrido, no una opinión.

### D.3.1 El contrato: cero

`grep -n "package\.json\|npm\|node_modules\|JavaScript" context/aiw-console/CONTRATO.md`
→ **0 coincidencias** en 2155 líneas. Las coincidencias de `test` son todas
«test-de-consumidor» (D-026) y «probado por test», que hablan de la suite **de la
consola**, no del proyecto proyectado.

### D.3.2 El emisor: dos toques a `package.json`, ambos fail-soft

| Uso | Línea | Qué pasa si no hay `package.json` |
|---|---|---|
| Derivar `project_id` | `project.mjs:1088-1093` | `safeReadJson` → `null` → cae a `basename(resolve(root))`, se normaliza a slug. **Medido:** `buildDocsIndex('tests/fixtures/multi/vacio')` → `project_id = "vacio"`, y ese root no tiene `package.json` |
| Entrada de `sources` del snapshot | `project.mjs:1186` | `sourceRecord` → `null` (`:875-883`) → `.filter(Boolean)` lo descarta (`:1104`). §7 cumplido: no se emite puntero roto |

Es la única aparición de `package.json` en el emisor (`project.mjs:799`, medido por
grep). **Ninguna suite, ningún `npm`, ningún `node_modules` como requisito.**
`node_modules` aparece una sola vez, en `DOCS_SKIP_DIRS` (`project.mjs:857`), que es una
lista de directorios que **NO se escanean** — lo contrario de un requisito.

### D.3.3 El punto real de fricción: el corpus es `.md`, no `.tex`

Lo que sí es específico de un formato:

- `project.mjs:1285` — el escáner recoge **solo** archivos cuyo nombre termine en
  `.md`: `entry.name.toLowerCase().endsWith(".md")`.
- `project.mjs:1463` — el título sale del **primer H1 Markdown** del documento
  (`titleFromMarkdown`, definida en `:186`).
- Los cuerpos de documento los renderiza el lector Markdown de la consola
  (`project-console/README.md:118-119`).

**Consecuencia medida para un repo de documentos LaTeX:** si no tiene `.md`, el escaneo
devuelve **0 documentos**, y `scanDocsIndex` **igualmente devuelve un objeto**
(`project.mjs:1475-1491`), así que `.project/docs_index.json` **se emite con
`docs: []`**. Medido: `buildDocsIndex('tests/fixtures/multi/vacio')` → objeto,
`docs = 0`. La pestaña Docs sale **VACÍA, no ausente** — que es la distinción que §19
exige mantener (`CONTRATO.md:1926`: «distingue índice AUSENTE de índice VACÍO»).

Y hay salida declarada sin tocar código: si el repo cura su propio
`docs/docs_index.json`, el emisor lo **transporta** en vez de escanear
(`project.mjs:1310-1313`), preservando selección y orden. La decisión se toma por
**presencia del archivo**, nunca por nombre de proyecto (`project.mjs:1307-1309`). Un
índice curado puede listar `.tex`: el emisor no filtra por extensión al transportar.

**[NO MEDIDO]** si el visor de documentos de la consola renderiza un `.tex` de forma
legible: exigiría abrir la consola contra un repo con `.tex`, y ese repo no existe
(D.1). Lo medido es que el **índice** admite cualquier ruta transportada.

### D.3.4 El otro punto: `git_history` exige repositorio propio

`buildGitHistory` devuelve `null` si el root no es su propio repositorio git, y
`writeProjectFolder` salta el artefacto nulo (`project.mjs:1843-1848`, comentario
explícito: «a Git-less root emits the same five files it always did»).

**Cuenta medida: un repo LaTeX con git emite 6 artefactos; sin git, 5.** Los dos casos
son conformes: el requerido sigue siendo 1.

### D.3.5 Veredicto

**Nada del contrato ni del emisor obliga a que un proyecto contenga JavaScript ni una
suite de Node.** Un repo de documentos LaTeX encaja. Lo que hereda de la orientación
Markdown es una pestaña Docs vacía por defecto, con una salida declarada (índice curado)
que no cuesta una línea de código.

---

# BLOQUE E — Recomendación de runs, con coste medido

**Esto es una recomendación. NO decide que estos runs deban existir.** La adjudicación
es de cabina; aquí van el número, el contenido y el coste medido de cada uno.

**Recomendación: 4 runs — 2 inevitables, 1 condicionado a una adjudicación previa, 1 en
otro hilo.**

### Run 1 — Adjudicar la discrepancia §12.b/§13 contra `checkInvariants`

**Va PRIMERO, y es el único con esa restricción.** Razón medida: el proyecto nuevo va a
heredar una de las dos lecturas al escribir su primer roadmap (A.4), y si la adjudicación
llega después, se re-escribe un canónico recién hecho.

- **Coste si manda el contrato:** ~10 líneas en **1 archivo**
  (`tools/roadmap/roadmap-core.mjs`) + 1 test. **Más una migración obligada:** pone rojo
  el canónico de este repo, **3 fases de 23** (`O4.P5`, `O4.P7`, `O4.P8`), y con él la
  ruta de emisión y la de edición.
- **Coste si manda el código:** **0 líneas de código**; 2 secciones de `CONTRATO.md`
  (§12.b `:1378-1396`, §13 `:1483-1499`) + la fila `h` de la tabla (`:2099`).
- **Coste de no hacerlo:** 0 hoy; la ambigüedad viaja dentro del proyecto nuevo.

### Run 2 — Crear el repo con su canónico y registrarlo

- **Coste de código: 0 sitios.** **Coste de configuración: 1 sitio, 1 entrada de 2
  claves** (`project-console/projects.json:4-8`).
- **Coste de repo:** 1 archivo `roadmap/roadmap.json`. Mínimo que pasa el código:
  `{"objectives":[]}`. Mínimo que satisface el contrato por su letra: 1 objetivo + 1
  fase + 1 run de 7 campos (A.3.3) — **cuál de los dos, lo fija el Run 1**.
- **Layout que le corresponde: `repo_root`** (`project.mjs:778-784`), que arrastra 4
  rutas opcionales más; ninguna obligatoria (A.2).
- **Resultado esperado de la primera emisión: 6 artefactos si el repo tiene git, 5 si
  no** (D.3.4). El modo edición se enciende en cuanto el canónico conforme exista y el
  servidor esté levantado (B.3).
- **Coste opcional:** +1 línea en `project-console/README.md:59-64`, que además arrastra
  arreglar el desfase ya existente de ese ejemplo (B.2).
- **Riesgo medido: ninguno sobre la suite.** Ningún test lee el registro real (B.2).

### Run 3 — Abrir el hilo: `context/cantu-quizzes-latex/` y su handoff inaugural

- **Coste: 2 archivos nuevos**, 0 mecanismos tocados. Ningún validador los exige (C.3),
  así que este run es enteramente convención.
- **Lo que hereda:** los 4 rasgos comunes de C.2, no una plantilla — no existe.
- **Lo que este run tiene que resolver y los otros tres nunca tuvieron:** qué escribe un
  handoff inaugural donde los tres existentes escriben cifras de una sesión anterior
  (C.4).
- **Coste añadido si se quiere el índice al día:** `context/README.md` declara hoy 2
  cosas que no existen (`handoffs/orquestacion.md` y `aiw/records/`, C.1). Añadir una
  cuarta carpeta a un índice ya desfasado son **3 correcciones, no 1**.

### Run 4 — El comando de verificación en `aiw/config.json` — **OTRO HILO**

- **Coste: 1 entrada de 4 campos** (`path`, `base_branch`, `verification`, `push`) en
  `aiw/config.json`, misma forma que las dos existentes (D.2).
- **Va en el hilo `aiw`**, no aquí: escribir en `aiw` está fuera del alcance de este
  encargo, y el consumidor del campo vive en el kernel.
- **Prerequisito no medido:** cómo el kernel ejecuta esa cadena (D.2, `[NO MEDIDO]`).
  Ese run debería medirlo antes de escribir, o heredará los cinco supuestos de forma que
  este record deriva del archivo sin poder confirmarlos contra el ejecutor.

### Orden y dependencias

```
Run 1 (adjudicación)  →  Run 2 (repo + registro)  →  Run 3 (hilo)
                                                 →  Run 4 (verificación, hilo aiw)
```

Run 1 antes que Run 2 por lo dicho arriba. Runs 3 y 4 son independientes entre sí y
ambos posteriores a Run 2 (uno necesita el proyecto para tener de qué hablar; el otro,
para tener qué verificar).

---

# BLOQUE F — Lo que NO se pudo medir, y por qué

1. **El renderer completo contra un proyecto de 0 runs.** Se midió la capa del shell
   (`snapshotSummary`, `portfolioBoardHtml`, `sidebarProjectsHtml`, A.3.2). El renderer
   (`project-console/assets/project-console.js`, 7210 líneas) exige un root en disco con
   `.project/`, y **crear cualquier fichero fuera de este record está fuera de alcance**.
   No hay fixture de 0 runs: el más pequeño es `tests/fixtures/multi/hilo-verde` con **6
   runs**.
2. **El comportamiento del kernel de AIW ante `verification`.** Solo se autorizó leer
   `aiw/config.json` (D.2).
3. **Si `writeProjectFolder` deja `.project/` a medias con un root sin roadmap.** Se leyó
   la cadena de llamadas (`project.mjs:1833-1860`: `docs_index` y `git_history` se
   escriben antes de que `buildRoadmapTreeSnapshot` lance) y se **midió que lanza**, pero
   no se ejecutó la escritura: comprobarlo exigiría dejar que escribiera. **Por la ruta
   del servidor la cuestión no se plantea**: refusa antes de abrir nada (`serve.mjs:401`).
4. **Si la consola renderiza legiblemente un cuerpo `.tex`.** Exigiría un repo con `.tex`
   y ese repo no existe (D.1, D.3.3).
5. **El estado de `.project/` de `cantu-studio` y de `aiw`.** Fuera del alcance de lectura.
   Lo que se dice de ellos en B.3 y B.4 se cita del código y de los tests de este repo
   (`serve.mjs:761`, `tests/shell-switch.test.mjs:124`), no de sus discos.
6. **La suite no se corrió** (fuera de alcance). Los tests se citan por su código fuente,
   no por su resultado de ejecución.

---

## Nota de método

No se ejecutó git en ninguna forma. No se levantó la consola. No se corrió el emisor
contra ningún root real por la vía que escribe. No se tocó `project-console/projects.json`
ni ningún roadmap, `.project/`, código o test. El único archivo escrito por esta medición
es este record.
