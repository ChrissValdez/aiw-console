# AIW COMO TERCER PROYECTO RENDERIZABLE — MEDICIÓN DE LOS TRES EMBUDOS Y ALTA DEL HANDOFF

Record de `RUN-AIW-THIRD-PROJECT-001` (`queue_order` 21 del canónico de `aiw`, fase
`O2.P7`). Fecha de ejecución: **2026-07-29**. Cierra `O2 — AIW is readable`.

Toda cifra de este record se midió del disco en esta sesión. **Ninguna se heredó de
un `full_description` ni de un record anterior sin re-medirla**, y donde la medición
discrepa de la fuente heredada, **gana el disco** y se declara (§7, §8).

**Nada se levantó.** No se arrancó consola, proyector, validador ni servidor; no se
corrió ninguna suite. Las funciones del proyector y del shell que este record evalúa
se **transcribieron verbatim** desde su fuente, con la cita por línea, y se aplicaron
sobre lecturas de disco. Se dice en cada punto donde ocurre.

**Convenciones de cita de este record:**

| Token | Archivo |
|---|---|
| `SRV:n` | `aiw-console/project-console/serve.mjs`, línea `n` |
| `SHELL:n` | `aiw-console/project-console/assets/project-shell.js`, línea `n` |
| `PCJS:n` | `aiw-console/project-console/assets/project-console.js`, línea `n` |
| `PROJ:n` | `aiw-console/tools/projector/project.mjs`, línea `n` |
| `PS1:n` | `aiw-console/start-console.ps1`, línea `n` |
| `RM` | `aiw/roadmap/roadmap.json` (el canónico de AIW) |

---

# 1. Guardas de apertura — las dos pasaron

## 1.a Guarda de título e id (criterio 1)

Leído de `RM`, run de `queue_order` **21**, en `objectives[1].phases[6].runs[0]`
(`O2` → `O2.P7`):

| Campo | Exigido | Encontrado | ¿Coincide? |
|---|---|---|---|
| `queue_order` | 21 | `21` | ✔ |
| `title` | `Bring AIW into the console as the third rendered project` | idéntico, carácter a carácter | ✔ |
| `run_id` | `RUN-AIW-THIRD-PROJECT-001` | idéntico | ✔ |

## 1.b Guarda de apertura (criterio 2)

`status` del run 21 = **`active`**. No es `planned`. **No se para.**

**Estado de los TRES repos al abrir**, reportado entero porque hay dos hilos
paralelos escribiendo y la frontera de salida se mide contra esta lista, no contra un
árbol limpio:

| Repo | HEAD al abrir |
|---|---|
| `aiw` | `a3f2b700fe51281518bd440a37ec338eb3e28368` |
| `projects/aiw-console` | `72bac18a145046f6f954d54065c4dcae31a40a32` |
| `projects/cantu-studio` | `2cda348c835ef82b7a5492645a12d63b128765d4` |

`git status --porcelain` de **`aiw`** al abrir:

```
 M .project/docs_index.json
 M .project/guardrails.json
 M .project/no_claims.json
 M .project/roadmap.json
 M .project/snapshot.json
 M roadmap/roadmap.json
?? .project/git_history.json
```

`git status --porcelain` de **`projects/aiw-console`** al abrir: **vacío** (árbol
limpio).

`git status --porcelain` de **`projects/cantu-studio`** al abrir: **vacío** (árbol
limpio).

## 1.c El estado se movió a mitad del encargo — medido, no supuesto

Re-verificado antes de escribir nada (§8.4 lo cierra):

- **`aiw` commiteó.** HEAD pasó a `c92d10f106c6725b1edee6a788fbc5e0794153af`, un solo
  commit: *«markdown: roadmap_AIW_temp.md superseded y tabla de equivalencia
  publicada; diez citas RM-AIW nombradas para el hilo de la consola (O2.P6)»*. Es el
  operador commiteando el trabajo del `#20`, más el flip del `#21`. `git diff --stat
  a3f2b70..HEAD` = 6 archivos, 12 inserciones, 12 borrados; el único cambio en el
  canónico es **una línea**: `"status": "planned"` → `"status": "active"`, que es la
  apertura de este propio run. **Todas las mediciones se repitieron después del
  commit y salieron idénticas.**
- **`cantu-studio` pasó de limpio a 7 archivos modificados** (`.aiw/roadmap/roadmap.json`
  y los seis de `.project/`). Es el hilo paralelo de Cantu. **Este encargo no tocó
  `cantu-studio` en ningún byte.**
- **`aiw-console` NO movió su HEAD** durante el encargo — sigue en `72bac18a`. La
  re-verificación que el criterio 9 exige para ese caso no fue necesaria, y se hizo
  igualmente por el movimiento de `aiw`.

---

# 2. La premisa vencida del canónico, y no se repite

El `full_description` del `#21` afirma:

> «the shell has three funnels and **AIW passes only the first** […] `aiw/.project/`
> DOES NOT EXIST, so every artefact request for the key `aiw` answers 404 today and
> the console announces the absence.»

**Medido hoy contra el código y el disco: pasan los TRES.** El texto se escribió
antes de que el canónico (`#16`), `governance/` (`#17`) y el `.project/` de AIW
existieran; su propio párrafo siguiente lo anticipa («What this run needs from the
rest of this objective»). **La afirmación vencida no se repite en ningún artefacto de
este encargo**, y **el `full_description` no se edita** (fuera de alcance).

---

# 3. CUÁL ES LA CONSOLA VIVA — se midió, no se supuso (criterio 3)

`aiw-console` contiene **TRES** árboles de consola, no dos. Confundirlos invalidaría
todo lo demás, así que la pregunta se resolvió por la **evidencia del punto de
entrada del operador**, no por prosa.

## 3.a La respuesta: `projects/aiw-console/project-console/`

**La evidencia que decide** es el lanzador que el operador ejecuta,
`start-console.ps1`, que vive en la raíz del repo:

| Cita | Contenido |
|---|---|
| `PS1:6` | `#     node project-console/serve.mjs` |
| `PS1:8` | `# Serves: http://127.0.0.1:8788/project-console/index.html   (PC_PORT overrides the port)` |
| `PS1:30` | `$ENTRY_PATH = "/project-console/index.html"` |
| `PS1:32-34` | `# The two files that prove a directory is this repo's root, both required by the console.` → `$SERVER_RELATIVE = "project-console\serve.mjs"` · `$REGISTRY_RELATIVE = "project-console\projects.json"` |
| `PS1:219-221` | `$serveScript = Join-Path $repoRoot $SERVER_RELATIVE` … `& node $serveScript` |

El lanzador **no puede arrancar** si esos dos archivos no existen: `PS1:51-60` aborta
nombrándolos. La consola viva es, literalmente, la que esos dos archivos definen.

**Dónde está su registro de proyectos:** `project-console/projects.json`, y es el
único registro real del workspace. `SRV:117` lo fija como
`REGISTRY_DEFAULT_PATH = join(HERE, "projects.json")` con `HERE = dirname(serve.mjs)`
(`SRV:110`); `SHELL:29` lo pide desde el cliente como `./projects.json` relativo al
documento. Los otros dos `projects.json` del repo están bajo `tests/fixtures/` y solo
se alcanzan vía `PC_REGISTRY` (`SRV:66-69`, `SRV:167-171`).

## 3.b Cómo se distingue del fork descartado por `D-035`

**El fork NO es `aiw-console/console/`.** Esa confusión es fácil y este encargo la
tuvo que deshacer. Los tres árboles, medidos:

| Ruta | Qué es | Prueba medida |
|---|---|---|
| `docs/project-console/` | **EL FORK descartado por `D-035`** | Su tabla de rutas lista los archivos del roadmap legacy que Cantu ya había borrado: `objectives.jsonl`, `phases.jsonl`, `runs.jsonl`, `queue.json`, `roadmap_v2.json` en las líneas **6-10** de su `assets/project-console.js` — exactamente los `CON-PCJS:6-10` que cita `D-035`. **3 894 líneas.** No conoce ningún registro de proyectos. |
| `console/` | **El prototipo de `O4.P10`**, no un fork | Su propio README lo dice y se leyó entero: es «Primer consumidor real de `roadmap_tree_v1`», un solo proyecto, puerto **8790**, lee `roadmap/roadmap.json` crudo, sin proyector y sin `.project/`. Y nombra al fork por su ruta: «nunca la del fork descartado por `D-035` (`docs/project-console/`)». **106 + 496 líneas.** |
| `project-console/` | **LA CONSOLA VIVA** | Es la que `start-console.ps1` arranca. **981 + 6 373 + 511 líneas.** Trae el shell multiproyecto, el registro, el namespace virtual `/projects/<key>/**` y las tres rutas de escritura. |

**Los tres discriminantes, en una línea cada uno:** el fork tiene el modelo legacy en
su tabla de rutas y **no tiene registro**; el prototipo tiene puerto propio (8790),
un solo proyecto y **no toca `.project/`**; la viva es la única que el lanzador
nombra y la única con `projects.json`.

**Corolario, y es una costura del hilo de la consola:** `context/README.md:16-23`
dice que el fork «también» está en `aiw-console» y que «la consola viva está en
`projects/cantu-studio`». Eso era cierto al escribirse (`D-035`, 2026-07-23, antes
del port de `O4.P11`); **hoy es ambiguo en dos sentidos**: no dice cuál de los tres
árboles es el fork, y la consola que puede renderizar AIW ya no es la de Cantu sino
`aiw-console/project-console/`. La de Cantu sigue levantable para Cantu; no es la
multiproyecto. **Se nombra en §6; no se toca.**

**Veredicto de la guarda del criterio 3: la evidencia bastó. No se para.** Todo lo que
sigue se midió contra `project-console/` y `tools/projector/project.mjs`.

---

# 4. LOS TRES EMBUDOS — identificados en el código y medidos uno a uno (criterio 4)

## 4.a Cuáles son los tres, leídos del código

El propio servidor los enuncia, y es la única enumeración de «los tres» que existe en
el código. `SRV:45-48`, verbatim:

> «All three routes go through the same funnel: the project must be **REGISTERED**
> (the key resolves in the registry), its root must be **claimed by a known layout**
> (`detectRootLayout` — admission by tree SHAPE, never by a schema-name string), and
> every write destination is verified **INSIDE that registered root** after full path
> resolution.»

**Y aquí hay un matiz que el `full_description` no distingue, y que se declara porque
cambia qué prueba qué.** Esa frase describe el embudo de las **tres rutas de
escritura**. El camino de **lectura** —el que renderiza— no es idéntico: su tercer
gate no es la contención de escritura sino **el artefacto requerido**. Medido en el
código, los tres del render son:

| # | Embudo del render | Dónde está en el código |
|---:|---|---|
| **1** | **El registro mapea la clave y la raíz resuelve** | `SHELL:36-67` (`parseRegistry`: patrón de clave, raíz no vacía, sin duplicados) · `SRV:181-206` (`readRegistry`: `entries.set(key, resolve(registryDir, root))`) · `SRV:221-234` (`resolveVirtualPath` + `isInsideRoot`) |
| **2** | **La raíz la reclama un layout conocido** | `PROJ:776-782` (`detectRootLayout`) sobre `PROJ:623-640` (`ROOT_LAYOUTS`) y `PROJ:745-761` (`hasRoadmapTreeShape`) |
| **3** | **Los artefactos que el shell exige existen y parsean** | `SHELL:205-207`, `SHELL:348-375` (`fetchSnapshotRecord`) · `SHELL:129-133` (`snapshotSummary` admite o rechaza) |

**Por qué el embudo 2 es real aunque no esté en la ruta de `fetch`.** El shell lee
archivos estáticos y nunca llama a `detectRootLayout`. Pero el layout es (a) lo único
que decide que la raíz sea emisible —`writeProjectFolder` deriva de él, `PROJ:947`,
`PROJ:957`—, o sea que sin layout **no hay `.project/` que leer**; y (b) el gate de
las tres rutas de escritura, `SRV:391-409`. **Es el embudo del medio en el sentido
causal, no en el de la pila de `fetch`.** Se dice así y no se acepta la enumeración
del `full_description` sin este matiz.

## 4.b Embudo 1 — el registro mapea `aiw` y la ruta resuelve: **PASA**

`project-console/projects.json`, leído entero:

```json
{
  "registry_model": "project_registry_v1",
  "title": "AIW Console",
  "projects": [
    { "key": "aiw-console", "root": ".." },
    { "key": "cantu-studio", "root": "../../cantu-studio" },
    { "key": "aiw",          "root": "../../../aiw" }
  ]
}
```

Medición, aplicando el patrón de clave de `SHELL:32` / `SRV:175`
(`/^[A-Za-z0-9][A-Za-z0-9._-]*$/`) y la resolución de `SRV:203`
(`resolve(registryDir, root)` con `registryDir = project-console/`):

| `key` | patrón | `root` declarada | Resuelve a | ¿Existe? |
|---|---|---|---|---|
| `aiw-console` | ✔ | `..` | `…\projects\aiw-console` | ✔ dir |
| `cantu-studio` | ✔ | `../../cantu-studio` | `…\projects\cantu-studio` | ✔ dir |
| **`aiw`** | **✔** | **`../../../aiw`** | **`C:\Users\chris\Documents\AIW_Workspace\aiw`** | **✔ dir** |

La base virtual que el shell compone es `/projects/aiw/` (`SHELL:71-73`), y
`resolveVirtualPath` (`SRV:221-234`) une esa raíz con la ruta relativa y comprueba
`isInsideRoot`; `.project/snapshot.json` cae dentro. `pathNamesGitDir` (`SRV:216-218`)
no se dispara: ningún segmento se llama `.git`.

> **PASA.** Esta es la única de las tres que el `full_description` ya daba por buena,
> y sigue siéndolo.

## 4.c Embudo 2 — el root lo reclama un layout conocido: **PASA**

`detectRootLayout` (`PROJ:776-782`) prueba los layouts **en orden** y devuelve el
primero cuyo roadmap **parsea y conforma**. La función y la lista se transcribieron
verbatim y se aplicaron sobre la raíz de `aiw` (no se importó el módulo, no se
ejecutó el emisor):

| Layout probado | Archivo | Veredicto |
|---|---|---|
| `repo_root` | `roadmap/roadmap.json` | **`ok`** |
| `project_local_aiw` | `.aiw/roadmap/roadmap.json` | `missing` |

**`detectRootLayout(aiw) = "repo_root"`.** Es el mismo diagnóstico por candidato que
el servidor imprimiría en una negativa (`SRV:639-660`, `diagnoseCanonicalCandidates`);
se reprodujo aquí porque una negativa habría tenido que nombrar archivo por archivo.

El bundle que ese layout resuelve **como unidad** (`PROJ:616-618`: «resuelto AS A
UNIT»), comprobado en disco:

| Campo del bundle | Ruta | ¿Existe? |
|---|---|---|
| `roadmap` | `roadmap/roadmap.json` | ✔ |
| `guardrails` | `governance/guardrails.json` | ✔ |
| `no_claims` | `governance/no_claims.json` | ✔ |
| `docs_index` | `docs/docs_index.json` | ✔ |
| `contract_ref` | `governance/contract.json` | **✘ ausente** |

**La ausencia de `contract_ref` NO rompe el embudo**, y la prueba es que el gate es
solo el roadmap: `detectRootLayout` únicamente lee `paths.roadmap` (`PROJ:778`). El
emisor omite la fuente que no resuelve por `CONTRATO §7` (`PROJ:716-726`,
`sourceRecord` devuelve `null`). Se declara porque es la única casilla vacía del
bundle.

**El gate de forma, aplicado al canónico real.** `hasRoadmapTreeShape`
(`PROJ:745-761`) exige tres niveles, cada uno identificado (`objective_id` /
`phase_id` / `run_id`) y **cada run con `status` no vacío**. Medido sobre los 42 runs
del canónico: **los 42 traen `run_id` y `status` no vacíos**; los 6 objetivos traen
`objective_id`; las 29 fases traen `phase_id`. **Conforma.**

> **PASA.** Este es el embudo que el `#16` abrió al escribir el canónico y voltear el
> modo de la raíz (`D-052`). El `full_description` del `#21` lo daba por pendiente.

## 4.d Embudo 3 — los artefactos que el shell exige existen y parsean: **PASA**

**Qué exige el shell, medido en el código.** En el arranque, `shellBoot`
(`SHELL:480-506`) carga el registro y **un `snapshot.json` por proyecto y nada más**
—`SHELL:498-500` lo declara como decisión: «boot loads ONLY each project's
`snapshot.json` — the one required artifact»—. `fetchSnapshotRecord`
(`SHELL:348-375`) marca el registro `missing` si el `fetch` falla, `invalid` si no
parsea **o si `snapshotSummary` devuelve `null`**, y `ok` en otro caso. La admisión de
`snapshotSummary` es `SHELL:131-133`: **exige `project_id` string no vacío.**

Medido sobre `aiw/.project/`:

| Artefacto | Existe | Parsea | Bytes | Estatus según el contrato |
|---|:---:|:---:|---:|---|
| `snapshot.json` | ✔ | ✔ | 103 549 | **REQUERIDO** — gate de toda la consola |
| `roadmap.json` | ✔ | ✔ | 98 950 | opcional, emitido |
| `docs_index.json` | ✔ | ✔ | 8 115 | opcional, emitido |
| `guardrails.json` | ✔ | ✔ | 7 968 | opcional, emitido |
| `no_claims.json` | ✔ | ✔ | 4 921 | opcional, emitido |
| `git_history.json` | ✔ | ✔ | 17 363 | opcional, emitido |

**Los seis existen y los seis parsean.** `snapshotSummary` admite: `project_id =
"aiw"` → el registro del shell queda **`ok`**, no `missing` ni `invalid`.

**Y la coherencia con el canónico se comprobó, no se supuso.** Comparadas tupla a
tupla (`objective_id/phase_id/run_id/status/queue_order`) las tres representaciones:

```
canonical roadmap/roadmap.json  ===  .project/roadmap.json      →  true
canonical roadmap/roadmap.json  ===  snapshot.roadmap_tree      →  true
```

**42 runs en las tres.** La proyección **no está atrasada**; no hay nada que
re-emitir. (`generated_at` del snapshot: `2026-07-29T06:11:52.891Z`;
`generated_from`: `aiw-projector@0.9.0`.)

**Matiz de Git que conviene no confundir:** `git_history.json` **está en disco y la
consola lo servirá**, porque el servidor lee el sistema de archivos, no el índice de
Git. Que esté **sin trackear** (§9.1) no afecta a este embudo en esta máquina; sí
afecta a un clon fresco.

> **PASA.**

## 4.e Veredicto: **PASAN LOS TRES DE TRES**

| Embudo | Veredicto | La medición que lo prueba |
|---|:---:|---|
| 1 · registro y resolución de ruta | **PASA** | `aiw` → `…\AIW_Workspace\aiw`, directorio existente |
| 2 · layout reclama el root | **PASA** | `detectRootLayout(aiw) = "repo_root"`; los 42 runs conforman la forma |
| 3 · artefactos existen y parsean | **PASA** | los 6 de `.project/` existen y parsean; `project_id = "aiw"` admite |

**Consecuencia medible añadida — la edición se habilita.** `v3ProbeEndpoint`
(`PCJS:4954-4970`) enciende el modo edición cuando un `GET` a la ruta de edición
devuelve `405 {reason:"method_not_allowed"}`, y el servidor responde eso **exactamente
cuando el proyecto está registrado y un layout reclama su roadmap** (`SRV:418-430`
sobre `resolveEditableProject`, `SRV:391-409`). Como los embudos 1 y 2 pasan, **el
botón *Edit roadmap* queda habilitado para AIW por primera vez**. Es un tercer testigo
independiente de que el embudo 2 pasa de verdad.

---

# 5. LO QUE NO SE PUEDE MEDIR SIN LEVANTAR LA CONSOLA — lista para el operador (criterio 5)

**Lo que queda declarado como no medido.** Los tres embudos se midieron contra el
código y el disco; **lo que no se puede probar sin pintar** es que el render
efectivamente ocurra: que el `fetch` resuelva sobre el namespace virtual, que el shell
componga la tarjeta, que la tabla de derivación se ejecute sobre los tokens de AIW y
que el renderer transplantado acepte la base del proyecto. Nada de eso se levantó.
**Hasta que esta lista se recorra, el render de AIW es `[NO VERIFICADO]`.**

**Cómo abrirlo:** desde la raíz de `projects/aiw-console`, `start-console.cmd` (o
`node project-console/serve.mjs`), y abrir
`http://127.0.0.1:8788/project-console/index.html`.

Cada línea de abajo es **una cifra o una cadena exacta**, derivada de un archivo real,
para que la confirmación del operador sea una **medición** y no una impresión. Si algo
no coincide, el número de la derecha es el que hay que reportar.

### 5.1 En el menú lateral (Portfolio abierto)

| # | Qué mirar | Valor exacto esperado | De dónde sale |
|---:|---|---|---|
| 1 | Hay **tres** entradas de proyecto | `AIW Console` como título de marca, y tres filas | `projects.json`; `SHELL:400-401` |
| 2 | La tercera fila dice | **`AIW`** (en mayúsculas) | `friendlyLabel("aiw")`, `PCJS:188-199` |
| 3 | Su subtítulo dice | **`active`** | `snapshot.operational_status`; `SHELL:200` |
| 4 | **NO** aparece atenuada ni con «no snapshot» / «snapshot unreadable» | sin la clase degradada | `SHELL:199-203`, `SHELL:227` |

### 5.2 En la tarjeta de AIW del tablero Portfolio

| # | Qué mirar | Valor exacto esperado | De dónde sale |
|---:|---|---|---|
| 5 | El id bajo el título | **`aiw`** | `snapshot.project_id`; `SHELL:259` |
| 6 | La línea **Roadmap** | **`6 objectives · 29 phases · 42 runs`** | `SHELL:269` |
| 7 | Las celdas **Runs by status**, en este orden | **`planned 21` · `active 1` · `blocked 0` · `completed 20`** | orden del vocabulario del snapshot; `SHELL:143-155` |
| 8 | El chip de estado | **`active`** | `SHELL:240-242` |
| 9 | **Current status** | **`Active run: RUN-AIW-THIRD-PROJECT-001 (O2/O2.P7, queue 21).`** | `snapshot.current_status_summary` |
| 10 | Las filas de **Objectives** y su estado derivado | `House in order` → **`completed`** · `AIW is readable` → **`active`** · `Reliable autonomous run` → **`planned`** · `Run evidence and observability` → **`planned`** · `Categories and batches` → **`planned`** · `Long unattended execution…` → **`planned`** | tabla `collection_status_from_runs` ejecutada por `SHELL:85-111` |

> **Si el `#21` ya se cerró a `completed` antes de mirar**, las líneas 7, 9 y 10
> cambian y eso es correcto: `completed 21` / `active 0`, `Current status` sin run
> activo, y `AIW is readable` → **`completed`**. Es la única variación legítima.

### 5.3 Abriendo AIW (botón **Open Project**)

| # | Qué mirar | Valor exacto esperado | De dónde sale |
|---:|---|---|---|
| 11 | **No aparece ningún banner** de artefacto ausente en Overview, Roadmap, Run Queue, Docs ni Governance | ninguno | `CONTRATO §20`; los seis artefactos existen |
| 12 | **Roadmap** — el árbol trae | **6 objetivos**, **29 fases**, **42 runs** | `.project/roadmap.json` |
| 13 | **Run Queue** — orden global | **1..42**, denso y sin huecos; el **21** es el run de este record | `queue_order` medido: 42 valores únicos, min 1, max 42 |
| 14 | **Docs** — número de documentos | **13** | `.project/docs_index.json` |
| 15 | **Governance State** — dos tablas | **17 guardrails** y **4 claims** | `.project/guardrails.json`, `.project/no_claims.json` |
| 16 | **History** — rama y commits | rama por defecto **`main`**, **1 rama**, **46 commits** | `.project/git_history.json` |
| 17 | **Status → Console Diagnostics → State Sources** — las seis fuentes emitidas cargan; las **9 diferidas** siguen listadas como no emitidas | 6 ok / 9 «not emitted» | `emitted_artifacts` del snapshot (los seis) |
| 18 | El botón **Edit roadmap** **está visible y se puede activar** para AIW | activable | §4.e; `PCJS:4954-4970` |

### 5.4 La comprobación que cierra el criterio 3 en pantalla

| # | Qué mirar | Valor exacto esperado |
|---:|---|---|
| 19 | La URL de la barra de direcciones | **`http://127.0.0.1:8788/project-console/index.html`** — si dice `8790` o `/web/index.html`, se está mirando el **prototipo**, no la consola viva |

**Qué hacer si algo falla.** Un fallo en 1-4 es del embudo 1 o 3 (registro o
snapshot). Un fallo en 18 es del embudo 2. Un fallo en 6, 7, 12 o 13 con los demás
verdes significa que la proyección se desincronizó del canónico después de este
record: el remedio es el botón **Re-emit `.project/`**, y hoy no hace falta (§4.d).

---

# 6. LO NOMBRADO PARA OTROS HILOS — no se toca, no se propone ticket (criterio 6)

**Ningún embudo falla**, así que no hay arreglo que nombrar por esa vía. Lo que sí
salió al medir son **textos vencidos y una ambigüedad**, todos en archivos de
`aiw-console` que este encargo no puede tocar. Van al **hilo de `aiw-console`**, con
archivo, línea y qué habría que cambiar. **Ninguno se tocó.**

| # | Archivo y línea | Qué dice hoy | Qué habría que cambiar |
|---:|---|---|---|
| 1 | `project-console/README.md`, sección «Three deliberate differences», punto 2 | «Edit mode still probes the endpoint per project and refuses honestly where no layout claims a roadmap (**today: `aiw`, until O4.P6**)» | **Vencido y medido:** `detectRootLayout(aiw) = "repo_root"` y la edición queda habilitada (§4.c, §4.e). El paréntesis ya no describe ningún proyecto |
| 2 | `project-console/README.md`, bloque JSON de «The project registry» | El ejemplo lista **dos** proyectos: `aiw-console` y `cantu-studio` | El registro real lista **tres**; falta `{ "key": "aiw", "root": "../../../aiw" }`. El ejemplo se lee como si fuera el archivo |
| 3 | `context/README.md:16-23` | «`aiw-console` **también** contiene un fork de la consola de Cantu […] la consola viva está en `projects/cantu-studio`» | **Ambiguo hoy en dos sentidos** (§3.b): no dice cuál de los **tres** árboles de consola es el fork —es `docs/project-console/`, no `console/`—, y la consola que renderiza los tres proyectos es `aiw-console/project-console/`, no la de Cantu |

Y sigue vivo, ya conocido por ese hilo y re-verificado hoy: `aiw-console/package.json:6`
se autodescribe como *«verbatim fork of the JAME project console»*, que `D-035` ya
declaró falso respecto de los bytes.

**No se propone cómo repararlos, no se abre ticket, y no se editó ninguno.**

---

# 7. LA FORMA DEL HANDOFF, DERIVADA DE `aiw-console.md` (criterio 7)

`context/handoffs/aiw-console.md` se leyó **entero** (350 líneas). Su forma se
transcribe aquí y es la que `aiw.md` reproduce.

## 7.a Las secciones del ejemplar, en su orden

| # | Sección de `aiw-console.md` | ¿En `aiw.md`? |
|---:|---|---|
| 1 | H1 `# HANDOFF — hilo <nombre> (<descriptor>)` | ✔ `# HANDOFF — hilo aiw (el kernel)` |
| 2 | Cita 1 — **efímero y se sobrescribe**; no es un record | ✔ transcrita |
| 3 | Cita 2 — **disciplina: APUNTA, no RECUENTA** | ✔ transcrita |
| 4 | Cita 3 — **por qué esta reescritura** (es una corrección) | ✔ adaptada: **por qué NACE este archivo** |
| 5 | **Estado del hilo** + «Última actualización» | ✔ |
| 6 | `---` + `## ⚠ LA FRONTERA — leer antes de escribir un solo byte`, en puntos numerados | ✔ 4 puntos |
| 7 | `## El plan y el estado viven en el roadmap — no aquí` — ruta + conteos medidos | ✔ |
| 8 | `## LO QUE QUEDA VIVO` — tabla con **títulos verbatim** | ✔ como `## LO QUE VIENE — O3` |
| 9 | `## QUÉ PASÓ EN ESTA SESIÓN — punteros, no recuento` | ✔ como `## O2 CERRADO — qué dejó, una línea por hito` |
| 10 | Secciones temáticas de deuda destapada | ✔ compuerta `CONST §4`, lección de las cifras |
| 11 | `## D-057 PENDIENTE — tres cabos que no se pierden` | ✔ apuntando al ejemplar, sin recontar |
| 12 | `## Qué NO está resuelto, y el hilo nuevo debe saberlo` | ✔ 5 puntos |
| 13 | `## Qué se puede mirar HOY` — con bloque `bash` | ✔ |
| 14 | `## Pendientes que son del OPERADOR, no del taller` | ✔ 5 puntos |
| 15 | `## Regla de cierre de la cabina` | ✔ |
| 16 | `## Lecturas de arranque (en orden de utilidad)` | ✔ 6 entradas |
| 17 | `## Pendientes menores (siguen vivos)` | ✔ |

**Dos secciones del ejemplar no se transcriben, y se dice por qué:** «Las compuertas
vigentes (son `depends_on` reales en el roadmap)» —el canónico de AIW declara
`depends_on: []` en el `#21` y las compuertas de `O3` son de otra naturaleza (la
compuerta de AIW es `CONST §4`, que tiene sección propia)— y «Deuda medida para la
multiconsola» / «El `.aiw/` de `aiw-console` NO es estado propio», que son materia de
la consola y no del kernel.

## 7.b La disciplina que gobierna el contenido

**APUNTA, no RECUENTA.** Cada hallazgo va en una o dos líneas con el puntero a su
record. En concreto: las diez citas `RM-AIW:` van en **tres líneas** con el puntero a
`RETIRO-MARKDOWN-AIW.md §4.2` y **no se reproduce la tabla**; los tres cabos de
`D-057` van en una línea cada uno apuntando a `aiw-console.md`; los once records de
`O2` van a una línea por hito. **Español**, como el ejemplar.

---

# 8. FRONTERAS DE SALIDA DE LOS TRES REPOS (criterio 9)

## 8.a `aiw` — cero cambios aportados por este encargo

`git status --porcelain` al cerrar:

```
?? .project/git_history.json
```

**Comparado contra la lista del criterio 2** (§1.b), la única diferencia es que las
seis entradas ` M` desaparecieron — **porque el operador las commiteó en `c92d10f`**
(§1.c), no porque este encargo tocara nada. `?? .project/git_history.json` estaba en
la lista de apertura y sigue igual. **Este encargo no escribió un byte en `aiw`**: ni
canónico, ni `.project/`, ni `docs/`, ni `governance/`, ni nada.

## 8.b `aiw-console` — exactamente dos archivos

`git status --porcelain` al cerrar:

```
?? context/aiw-console/records/AIW-TERCER-PROYECTO.md     <-- este run
?? context/handoffs/aiw.md                                <-- este run
```

**Exactamente dos archivos, los dos nombrados en el encargo**, y los dos NUEVOS.

`git diff --stat` (cambios sobre archivos trackeados): **sin salida**. Es la prueba
directa de que **`roadmap/roadmap.json`, `.project/`, `DECISIONES.md`, `CONTRATO.md`,
`handoffs/aiw-console.md` y los 57 records existentes están intactos** — ninguno
aparece, ni una coma. (57 trackeados, medido con `git ls-files`; 58 en disco contando
éste, que es nuevo.)

## 8.c `cantu-studio` — no se tocó

`git status --porcelain` al cerrar muestra 7 archivos modificados
(`.aiw/roadmap/roadmap.json` y los seis de `.project/`), **frente a un árbol limpio al
abrir**. HEAD no se movió (`2cda348c` al abrir y al cerrar).

**Atribuido al hilo paralelo de `cantu-studio`**, no a este encargo. La forma del
cambio lo respalda: `git diff --stat` da **7 archivos, 238 inserciones, 201
borrados**, y el reparto es exactamente el de **una edición del canónico de Cantu más
su re-emisión** —`.aiw/roadmap/roadmap.json` `133 ++--`, `.project/roadmap.json`
`137 ++--`, `.project/snapshot.json` `143 ++--`, y cambios de una línea
(`generated_at`) en `docs_index`, `guardrails` y `no_claims`—. Este encargo no abrió
ese repo para escribir, y las únicas lecturas que hizo ahí fueron `git status` /
`rev-parse` y el listado de `tools/` para descartarlo como consola viva (§3.b).

La atribución es **por exclusión y por la forma del diff, no por un commit que la
pruebe** — el trabajo sigue sin commitear. **`[NO VERIFICADO]`** que sea obra del hilo
de Cantu y no de otra cosa.

## 8.d El movimiento de HEAD y la re-verificación

`aiw-console` **no movió HEAD** (`72bac18a` al abrir y al cerrar), así que la
condición del criterio 9 no se disparó. **`aiw` sí movió** (§1.c), y como todas las
mediciones de los embudos leen archivos de `aiw`, **se repitieron enteras después del
commit**: los tres embudos, el bundle del layout, los seis artefactos, la coherencia
canónico↔proyección y los conteos del roadmap salieron **idénticos**. El commit no
cambió el contenido que se midió: ese contenido ya estaba en el árbol de trabajo
cuando se leyó.

## 8.e Lo que este run NO hizo

No commiteó. No cambió el `status` de ningún run. No re-emitió `.project/`. **No
levantó consola, proyector, validador ni servidor.** No corrió ninguna suite. No
escribió en `DECISIONES.md` ni redactó `D-057`. No tocó `handoffs/aiw-console.md`, ni
`handoffs/cantu-studio.md`, ni ningún record existente, ni ningún `full_description`,
ni ningún código de consola, shell, proyector o registro de proyectos. No reparó las
diez citas `RM-AIW:`. Git se usó **solo en lectura**: `status`, `rev-parse`,
`diff --stat`, `log`, `ls-files`, `check-ignore`.

---

# 9. LO QUE QUEDA ABIERTO

1. **`git_history.json` sigue sin trackear en `aiw`.** Medido: `.project/` tiene **5
   archivos trackeados** (`docs_index`, `guardrails`, `no_claims`, `roadmap`,
   `snapshot`) y `git_history.json` **no está trackeado ni gitignoreado** —
   `git check-ignore` no lo reclama—, así que sale `??` en cada `status`. Es la
   adjudicación 4 de `D-053`, declarada **transversal**, y **su parte transversal no
   se ha ejecutado en ningún repo**.
2. **`operator_review_status` no está gobernado por la convención.** La consola abre
   Docs en `all` y no en `newera` porque ese campo no se emite —ningún run registró
   una revisión de operador— y **ninguna convención de AIW dice cuándo un run lo
   escribe**. → `project-console/README.md`, «Three deliberate differences», punto 1.
3. **La confirmación visual del render** (§5): 19 comprobaciones que solo el operador
   puede hacer. Hasta entonces, `[NO VERIFICADO]`.
4. **El incidente del `#22`**, que es la cabeza de la cola de `O3` y **no puede
   ejecutarse** sin él bajo `CONST §4` / `D-055`. Lo dice su propio
   `full_description`. Es acto de la cabina, no del taller.
5. **`D-057`**, con sus tres cabos, sigue sin escribirse.

---

# 10. Estado del run

**`RUN-AIW-THIRD-PROJECT-001` debe quedar en `completed`.** Las dos cosas que el run
tenía que hacer están hechas: **A**, la medición de si AIW ya es un proyecto
renderizable, embudo por embudo contra el código real — **pasan los tres de tres**
(§4.e), con la premisa vencida del canónico declarada y no repetida (§2); y **B**,
`context/handoffs/aiw.md` escrito, con la forma derivada del ejemplar (§7). Con eso
`O2 — AIW is readable` queda cerrado: 10 de 10 runs.

**Este record no cambia el estado.** El cambio de `active` a `completed` en
`aiw/roadmap/roadmap.json` es acto del operador, fuera del alcance de este run.

**La disciplina de tres proyectos ya no tiene dos hilos:** `handoffs/` declara cuatro
en `context/README.md:51-58`, existían dos, y hoy son tres —`aiw`, `aiw-console`,
`cantu-studio`—. El cuarto, `orquestacion.md`, sigue sin nacer y **no** estaba en el
alcance de este run.
