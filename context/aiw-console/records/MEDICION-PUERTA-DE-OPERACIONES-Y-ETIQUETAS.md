# Medición: la puerta de operaciones, el artefacto que no carga y `closure_mode` en la lista

Encargo de taller de MEDICIÓN. No construye, no repara, no propone runs y no decide nada.
Cuenta, cita y reporta.

- **Escritura producida:** este único fichero. Ni una línea fuera de él.
- **Consola medida:** `project-console/` (la viva). **Excluidos y declarados:**
  `docs/project-console/` (fork descartado por `D-035`) y `console/` (prototipo retirado).
  Ambos aparecieron en búsquedas y ninguno se cita como evidencia.
- **Fecha de la medición:** 2026-08-03.
- **Cómo se midió:** lectura de código, `git` **solo de lectura** (`log`, `ls-files`,
  `check-ignore`, `status --porcelain`), un servidor de consola propio en el puerto 8899
  (`PC_PORT=8899 node project-console/serve.mjs`) para no tocar el del operador en 8788,
  el navegador contra ese servidor, y `planEdit` ejecutado contra una **copia** del
  canónico en carpeta temporal. **Ningún `apply:true` en ninguna ruta, en ningún momento.**

**Cifras de cabecera (unidad y alcance explícitos):**

| Medida | Valor | Alcance |
|---|---|---|
| Operaciones que el motor conoce | **21 ops** | `KNOWN_OPS`, `tools/roadmap/roadmap-plan.mjs:29` |
| De ellas, agrupables en un `batch` | **11 ops** | `roadmap-plan.mjs:214` |
| De ellas, expuestas hoy por la UI | **16 ops** | `project-console/assets/project-console.js:6479-6617` + `:3982`/`:4014` |
| Sitios de código para la puerta mínima de lote pegado | **8 sitios / 4 ficheros** + 2 ficheros de test | §A.5 |
| Sitios adicionales si el lote debe incluir ops de identidad | **+4 sitios** | §A.5, capa 2 |
| Respaldo automático antes de aplicar un lote | **EXISTE** | `tools/roadmap/roadmap-core.mjs:2091-2094` |
| Guarda de identidad por `queue_order` + título verbatim | **NO EXISTE** | §A.6 |
| Artefactos de `.project/` que la consola carga hoy para `aiw` | **6 de 6** | §B.1 |
| Superficies donde se pinta la etiqueta de `severity` de un run | **5 superficies** | §C.1 |
| Sitios de código para pintar `closure_mode` en las que faltan | **1 sitio** (sirve 2 superficies) | §C.3 |

---
---

# BLOQUE A — La puerta de operaciones

## A.1 Inventario completo de las operaciones del motor

Las 21 operaciones están declaradas en una sola lista, `KNOWN_OPS`
(`tools/roadmap/roadmap-plan.mjs:29`), y se despachan una a una en `dispatch()`
(`roadmap-plan.mjs:46-239`) sobre las primitivas de `tools/roadmap/roadmap-core.mjs`.
La columna «agrupable» es pertenencia al array `batchable` de `roadmap-plan.mjs:214`.

| # | Op | Argumentos que pide (nombres tal cual los relaya el despacho) | Agrupable | Despacho | Primitiva |
|---|---|---|---|---|---|
| 1 | `insert` | `runId`, `title`, `summary`, `fullDescription`, `status` (def. `planned`), `dependsOn`, y **exactamente uno** de `after` / `before` / `endOfPhase` | **No** — identidad | `roadmap-plan.mjs:49` | `roadmap-core.mjs:789` |
| 2 | `move` | `run`, y **exactamente uno** de `after` / `before` / `toOrder`; `toPhase` opcional | Sí | `:60` | `:863` |
| 3 | `remove` | `run`, `reassignDependentsTo` \| `dropDependentEdges` (excluyentes) | **No** — identidad | `:68` | `:922` |
| 4 | `swap` | `run`, `withRun` | **No** — no está en la lista | `:74` | `:997` |
| 5 | `set-text` | `targetType` (`run`/`phase`/`objective`), `targetId`, y al menos uno de `title` / `summary` / `fullDescription` | Sí | `:76` | `:1019` |
| 6 | `set-deps` | `run`, `dependsOn` \| `addDep` \| `removeDep` | Sí | `:84` | `:1065` |
| 7 | `set-human-deps` | `run`, `dependsOnHumanApproved` \| `addDep` \| `removeDep` | Sí | `:92` | `:1132` |
| 8 | `set-status` | `run`, `status`, `closeoutResult` | Sí | `:104` | `:1190` |
| 9 | `set-lane` | `run`, `lane` (`null` limpia) | Sí | `:110` | `:1230` |
| 10 | `set-barrier` | `run`, `barrier` (`lane`\|`global`\|`null`) | Sí | `:114` | `:1303` |
| 11 | `set-classification` | `run`, `correctnessModel`, `workType`, `blastRadius`, `failureSurfaces`, `externalEffects` — **`classified_at` NO es argumento**, lo escribe el motor (`roadmap-plan.mjs:123-124`) | Sí | `:118` | `:1385` |
| 12 | `declare-lanes` | `lanes` (reemplazo entero del vocabulario raíz) | **No** — raíz, no per-run | `:133` | `:1513` |
| 13 | `declare-care-budget` | `careBudget` (reemplazo entero) | **No** — raíz | `:138` | `:1649` |
| 14 | `clear-progress` | `run` (entrada única) | Sí | `:144` | `:1722` |
| 15 | `move-objective` | `objectiveId`, `toIndex` | Sí | `:149` | `:1759` |
| 16 | `set-objective-archived` | `objectiveId`, `archived` | Sí | `:154` | `:1785` |
| 17 | `create-phase` | `objectiveId`, `phaseId`, `title` | **No** — identidad | `:159` | `:1840` |
| 18 | `delete-phase` | `phaseId` **solo** (los ids de fase son únicos globalmente) | **No** — identidad | `:165` | `:1901` |
| 19 | `create-objective` | `objectiveId`, `title` | **No** — identidad | `:169` | `:1959` |
| 20 | `delete-objective` | `objectiveId` **solo**; sin cascada | **No** — identidad | `:174` | `:2016` |
| 21 | `batch` | `ops` (array de `{op, args}`) | **No anidable** | `:179-235` | — |

Los seis motivos de «no agrupable» están razonados en el propio código, no inferidos aquí:
identidad en `roadmap-plan.mjs:192` y `:222-224`; raíz en `:203-208`; `swap` simplemente no
figura en `batchable` y cae por `:225-227`.

## A.2 Qué existe y qué no, de la lista del ticket

| Gesto pedido | ¿Existe? | Dónde |
|---|---|---|
| Insertar un run | **Sí** | `insert` — `roadmap-core.mjs:789` |
| Mover un run | **Sí** (dos formas) | `move` — `:863`; `swap` — `:997` |
| **Renumerar** | **Sí, pero NO como operación propia** | No hay op «renumber». La renumeración es un **efecto automático**: `applyOrder()` (`roadmap-core.mjs:310-319`) reasigna `queue_order = índice+1` sobre el orden global completo y reordena los arrays de cada fase, y lo llaman `insert` (`:857`), `move` (`:917`), `remove` (`:992`) y `swap` (`:1014`). El operador nunca renumera: renumera el motor. |
| Borrar un run | **Sí** | `remove` — `:922` |
| Editar texto | **Sí** | `set-text` — `:1019` (los tres niveles: run, fase, objetivo) |
| Añadir o quitar aristas | **Sí**, en **dos listas** | `set-deps` — `:1065` (`depends_on`); `set-human-deps` — `:1132` (`depends_on_human_approved`) |
| Crear o borrar fases | **Sí** | `create-phase` — `:1840`; `delete-phase` — `:1901` (rehúsa fase no vacía) |
| Crear o borrar objetivos | **Sí** | `create-objective` — `:1959`; `delete-objective` — `:2016` (rehúsa objetivo con fases y rehúsa el último) |

**Conteo: 8 de 8 gestos existen en el motor.** El único matiz es que «renumerar» no tiene
op propia porque no la necesita.

**Lo que NO llega hoy a la pantalla:** de las 21 ops, la UI puede emitir **16**. Las cinco
que el endpoint acepta pero ningún control de la consola envía son `declare-lanes`,
`create-phase`, `delete-phase`, `create-objective` y `delete-objective` (verificado por
ausencia en `project-console/assets/project-console.js`; el único acierto de
`declare-lanes` en ese fichero es el comentario de `:3801`). `declare-care-budget` sí se
envía, desde una pantalla propia (`:3982` dry-run, `:4014` apply).

## A.3 El flujo `batch`, tal como está

Vive entero en `roadmap-plan.mjs:179-235`, dentro del mismo `dispatch()` que las demás ops.

- **Aplica sobre el MISMO objeto en memoria**, sub-op por sub-op, en orden de array
  (`:228`, llamada recursiva a `dispatch`).
- **¿Varias operaciones sobre un mismo run?** Sí. Es lo único que la consola hace hoy:
  `v3EditBuildBatch()` (`project-console.js:6340-6367`) recoge los bloques modificados del
  **único** nodo abierto en el modal.
- **¿Sobre runs distintos?** **Sí, el motor lo permite** — cada sub-op lleva su propio
  `args.run`. **Medido**, no inferido: `planEdit` con `batch` de dos `set-text` sobre dos
  runs distintos devolvió `ok=true stage=ok errors=[]` (ejecutado contra una copia en
  carpeta temporal; el fichero original nunca se abrió para escritura). **La UI es la que
  no lo permite**, no el motor.
- **¿Es atómico?** **Sí, por construcción, y en dos sentidos:**
  1. *En el plan*: si una sub-op devuelve errores, `batch` retorna inmediatamente
     (`:230-232`) y `planEdit` sale en la etapa `mutate` (`roadmap-plan.mjs:296-299`)
     **antes** de `serialize()` (`:323`). No hay serialización, luego no hay nada que
     escribir. **Medido:** `batch` con segunda sub-op inválida →
     `ok=false stage=mutate serialized=null`, fichero de disco byte-idéntico después.
  2. *En el disco*: un `batch` que pasa produce **una sola** serialización y **una sola**
     escritura temp+rename (`roadmap-core.mjs:2096-2105`). No hay escritura parcial posible.
- **¿Qué pasa si una falla a mitad?** El objeto en memoria queda mutado por las sub-ops
  anteriores, pero **ese objeto se descarta**: no se serializa y no se escribe. Al operador
  le llega el error prefijado con el índice y el nombre de la sub-op —
  `"batch op 1 (set-status) failed:"` seguido del error crudo del motor (`:231`).
- **Rehúsa, con mensaje propio:** `batch` anidado (`:219-221`), ops de identidad
  (`:222-224`), ops fuera de la lista agrupable (`:225-227`, y el mensaje enumera las 11
  permitidas), `ops` no-array (`:186-188`) y `ops` vacío (`:189-191`). **Los cuatro
  primeros, medidos uno a uno contra la copia.**
- **Orden dentro del lote:** el cliente reordena antes de enviar. `clear-progress` se
  antepone siempre (`project-console.js:6336-6338`, `6362-6365`) porque `set-status` rehúsa
  cerrar un run cuyo `progress` no esté todo `done` — y el orden del DOM los produce al revés.

## A.4 El flujo dry-run → confirm y el compare-and-swap

**El ciclo, en cinco pasos y sus sitios:**

1. **Dry-run.** El cliente hace `POST` con `apply:false` (`project-console.js:6658`). El
   servidor entra por `handleRoadmapEdit` (`serve.mjs:418`), valida que el `op` esté en
   `KNOWN_OPS` (`:473-476`), resuelve el proyecto registrado → layout → canónico
   (`:478-482`, `resolveEditableProject` en `:391-409`) y llama `planEdit`
   (`:489`). **No escribe nada.** Devuelve `remap`, `warnings`, `bytes` y **`baseline`**
   (`:495`).
2. El cliente guarda `{op, args, baseline}` en `v3EditPending` (`:6661`) y pinta la
   previsualización con el botón «Confirm and write» (`:6836-6846`).
3. **Confirm.** `POST` con `apply:true` **y la `baseline` del dry-run** (`:6853`).
4. **Compare-and-swap.** El servidor **vuelve a planificar contra el fichero actual**
   (`serve.mjs:517`) y compara la baseline recién calculada con la que mandó el cliente
   (`:528`). Si difieren: **409 `stale_baseline`**, con las dos baselines en la respuesta
   (`:529`), y **nada escrito**.
5. **Escritura.** `applyPlan` (`roadmap-plan.mjs:334-343`) → `applyWrite`
   (`roadmap-core.mjs:2084-2117`): respaldo → temp → `fsync` → `rename` → validador
   inyectado → *rollback* si el validador falla. Después, re-emisión de `.project/`
   (`serve.mjs:559`) y devolución de la **nueva** baseline (`:566`).

**Qué es exactamente la baseline.** Es
`"sha256:" + sha256(bytes utf8 del fichero tal cual se leyó)`
(`roadmap-plan.mjs:33-35`), calculada en `planEdit` inmediatamente después de `loadRaw`
(`:267`). **No es una versión, ni un mtime, ni un hash del árbol**: es el contenido literal.
Un solo byte distinto — un CRLF, una raya — produce otro token. Se obtiene **solo** como
salida del dry-run; el cliente nunca la calcula.

**Qué ocurre si otro proceso escribió en medio.** Tres casos, medidos por lectura de código:

- *Otro proceso escribió entre el dry-run y el confirm*: el re-plan del paso 4 lee el
  fichero nuevo, la baseline no coincide y la respuesta es **409 `stale_baseline`**. El
  cliente pinta «The roadmap changed since this preview» con un botón «Re-read and start
  over» (`project-console.js:6933-6939`, `6968-6974`). Nada se escribe.
- *Dos escrituras del MISMO proceso servidor*: hay un cerrojo de un solo vuelo
  (`serve.mjs:380`, tomado en `:513`, liberado en `:570`); la segunda recibe **409
  `write_in_progress`** (`:509-512`). Los dry-runs nunca lo toman (`:377-379`).
- *Dos servidores distintos sobre el mismo canónico*: **no hay cerrojo entre procesos**, y
  el propio fichero lo dice (`serve.mjs:378-379`). La ventana que queda es el intervalo
  entre el re-plan (`:517`) y el `rename` (`roadmap-core.mjs:2105`) — microsegundos, pero
  no cero. Además, los ficheros temporales y de respaldo del motor llevan `process.pid`
  (`roadmap-core.mjs:2092`, `:2096`), así que dos procesos no se pisan los temporales.

**Autoridad post-escritura.** El validador que se inyecta (`serve.mjs:359-374`) **relee el
fichero recién renombrado**, lo parsea, le pasa `checkInvariants` con las dependencias
externas del registro, y comprueba que conserve la forma objetivos→fases→runs. Si falla,
`applyWrite` restaura el respaldo (`roadmap-core.mjs:2110`) y la respuesta es **409
`validator_rejected`** con la ruta del respaldo (`serve.mjs:545-549`), que el cliente
muestra literal (`project-console.js:6941-6950`).

## A.5 **Qué falta para pegar un lote de operaciones en JSON — con el conteo delante**

> **8 sitios de código en 4 ficheros, más 2 ficheros de test**, para la puerta **mínima**
> (lote restringido a las 11 ops agrupables que el motor ya soporta).
> **+4 sitios**, y un cambio de invariante, si el lote debe además insertar, borrar o crear
> contenedores.

Enumerado por capa, de abajo arriba. Las capas 1, 3, 4 y 7 **no necesitan nada**.

| Capa | Fichero | ¿Falta algo? | Sitios |
|---|---|---|---|
| 1. Motor | `tools/roadmap/roadmap-core.mjs` | **No.** Las 21 primitivas existen y `applyOrder` ya renumera. | 0 |
| 2. Plan / `batch` | `tools/roadmap/roadmap-plan.mjs:179-235` | **No, para las 11 agrupables** — medido: lote de dos runs distintos planifica `ok`. **Sí, para las de identidad** (ver abajo). | 0 ó 4 |
| 3. Transporte HTTP | `project-console/serve.mjs:418-573` | **No.** La ruta ya acepta `{"op":"batch","args":{"ops":[…]}}` con cualquier miembro de `KNOWN_OPS` (`:470-476`). Único límite medido: cuerpo de **1 MB** (`serve.mjs:127`). | 0 |
| 4. Transporte cliente | `project-console.js:6619-6633` (`v3EditPost`) | **No.** Serializa el cuerpo que le den, sin opinión sobre el `op`. | 0 |
| 5. **Constructor del lote** | `project-console.js:6340-6367`, `6479-6617`, `6308-6318` | **SÍ.** Hoy las sub-ops **solo** pueden nacer de bloques del DOM de **un** modal, contra **un** `v3EditModalTarget` (`:5657`). No hay ningún camino que convierta texto en `args.ops`. | **3** |
| 6. **Previsualización** | `project-console.js:6700-6706` y `6647-6666` | **SÍ, y es un defecto real para lotes multi-run:** `v3EditDiffHtml` pasa **el mismo** `beforeNode` a todas las sub-ops (`:6703`). Un lote sobre runs distintos pintaría cada diff contra el run equivocado. | **2** |
| 7. Confirmación | `project-console.js:6849-6866` | **No.** Es agnóstica del `op`: reenvía `{op, args, baseline}`. | 0 |
| 8. **Marcado / UI** | `project-console/index.html:248-257` (el modal) + el manejador delegado `project-console.js:6248-6250` | **SÍ.** No existe ningún `textarea` de pegado en toda la consola: los cuatro `<textarea>` del fichero son campos de `summary` y `full_description` (`:5747`, `:5748`, `:5993`, `:5994`). | **2** |
| 9. Estilo | `project-console/assets/project-console.css` | **SÍ, uno** — un bloque para el panel de pegado. Reutilizable casi entero desde las clases `.v3-edit-*` ya declaradas. | **1** |
| 10. Tests | `tests/console-edit-modal.test.mjs`, `tests/roadmap-engine.test.mjs` | **SÍ.** Hoy hay **47 líneas** que mencionan `batch` repartidas en **7 ficheros** de test, ninguna sobre un lote multi-run ni sobre entrada pegada. | 2 ficheros |

**El coste extra de las ops de identidad (capa 2), medido.** No es quitar dos nombres de dos
arrays. `checkIdentityPreserved` (`roadmap-core.mjs:714-742`) sanciona **como máximo un id
añadido y uno borrado por tipo** (`:727-737`), y `planEdit` le pasa valores sueltos tomados
del resultado de la mutación (`roadmap-plan.mjs:308-315`). Un lote con dos `insert`
dispararía «unexpected id appeared» en el segundo. Los cuatro sitios son:
`roadmap-plan.mjs:192` (lista de identidad), `:214` (lista agrupable),
`roadmap-core.mjs:714-742` (la sanción, que pasaría de escalar a conjunto) y
`roadmap-plan.mjs:308-315` (el sitio que la alimenta).

**Un límite adicional, medido y no bloqueante:** la puerta está detrás del modo edición,
que exige que el endpoint responda a la sonda `GET` (`project-console.js:5477`,
`5516-5523`). Un proyecto que ningún layout reclama no enciende el modo edición. Los tres
proyectos registrados hoy sí lo hacen (medido: `detectRootLayout` devuelve `repo_root` para
`aiw` y `aiw-console`, y `project_local_aiw` para `cantu-studio`) — **el comentario de
`serve.mjs:762`, que dice que `aiw` es hoy la raíz sin layout, está obsoleto.**

## A.6 Respaldo automático y guarda de identidad

### Respaldo antes de aplicar un lote: **EXISTE**

`applyWrite` (`roadmap-core.mjs:2084-2117`) copia el canónico **antes** de abrir nada para
escribir:

```
roadmap-core.mjs:2091-2094
  if (fs.existsSync(abs)) {
    backupPath = path.join(backupDir, `roadmap-backup-${process.pid}-${base}`);
    fs.copyFileSync(abs, backupPath);
  }
```

- **Dónde:** `os.tmpdir()` (`:2088`), deliberadamente **fuera** del repositorio.
- **Cuándo:** en cada `apply`. Un `batch` de N sub-ops es **un** apply, luego **un**
  respaldo del estado previo a todo el lote. Es exactamente lo que el ticket pide.
- **Para qué sirve:** si el validador post-escritura rehúsa, se restaura (`:2110`) y la
  respuesta es 409 con la ruta (`serve.mjs:547`), que la consola muestra literal
  (`project-console.js:6946`).
- **Limitación medida, y es la única:** el nombre **no lleva marca de tiempo**. Dos applies
  del mismo proceso servidor escriben el mismo fichero de respaldo, así que solo sobrevive
  el estado inmediatamente anterior al último apply. Coste de hacerlo único por apply:
  **1 sitio** (`roadmap-core.mjs:2092`).

### Guarda de identidad por `queue_order` + título verbatim: **NO EXISTE**

Verificado por búsqueda en las tres capas (`roadmap-core.mjs`, `roadmap-plan.mjs`,
`serve.mjs`): **cero** ocurrencias de una expectativa declarada por el llamante. Los únicos
aciertos de «expected» son mensajes de error del allowlist de campos y el bucle interno de
`checkIdentityPreserved`.

Lo que **sí** existe, y no es lo mismo:

| Mecanismo | Qué compara | Por qué no cubre lo pedido |
|---|---|---|
| `checkIdentityPreserved` (`roadmap-core.mjs:714-742`) | Conjunto de ids **antes vs. después** de la mutación, en memoria | Compara el fichero consigo mismo. No sabe qué esperaba el operador. |
| Baseline compare-and-swap (`serve.mjs:528`) | sha256 del **fichero entero** | Es todo-o-nada: detecta que algo cambió, no **qué**. Y solo cubre la ventana dry-run→confirm: un lote redactado leyendo el fichero de hace una hora pasa si nadie lo tocó desde el dry-run inmediatamente anterior. |
| Pre-vuelo `checkInvariants` (`roadmap-plan.mjs:283-287`) | Que el fichero no esté ya roto | No mira las expectativas del lote. |

**Coste medido de añadirla: 3 sitios de código + 1 fichero de test.**
La comprobación cabe entera dentro del despachador de `batch`
(`roadmap-plan.mjs:179-235`, ~15 líneas): antes de llamar a `dispatch(subOp, …)`, si
`sub.expect` trae `{queueOrder, title}`, resolver el run y comparar contra disco; a la
primera discrepancia, `return { errors: [...] }` — que es **exactamente** la vía por la que
el lote entero aborta sin serializar, ya medida en §A.3. Sitios:
1. `roadmap-plan.mjs:179-235` — la comprobación.
2. `project-console.js` (constructor del lote) — emitir las expectativas.
3. `tests/roadmap-engine.test.mjs` — el caso.
En `serve.mjs` **cero sitios**: los `args` viajan opacos (`serve.mjs:471`).

## A.7 ¿Uno o dos runs? — recomendación con coste medido

**Este encargo no decide si deben existir.** Recomendación, con la medición delante:

> **DOS runs.** Y el corte no es de tamaño, es de invariante.

| | Run 1 — la puerta | Run 2 — el lote de identidad |
|---|---|---|
| Alcance | Pegar un lote JSON con las **11 ops agrupables** + guarda de identidad + respaldo con nombre único | Extender `batch` a `insert` / `remove` / `create-phase` / `delete-phase` / `create-objective` / `delete-objective` |
| Sitios | **8** (puerta) **+3** (guarda) **+1** (respaldo) = **12 sitios**, en 4 ficheros de código y 2 de test | **4 sitios** |
| Naturaleza | **Todo aditivo.** Ni una regla existente cambia de significado. La capa 2 y la capa 3 se quedan quietas. | **Cambia una guarda viva:** `checkIdentityPreserved` pasa de sancionar «como mucho uno por tipo» a un conjunto |
| Riesgo si falla | Una superficie nueva no funciona; lo viejo sigue igual | Una guarda que hoy protege la identidad de los runs se afloja |

**Por qué separados, medido y no opinado:** las dos listas que hoy rehúsan las ops de
identidad dentro de un lote (`roadmap-plan.mjs:192` y `:214`) no son una restricción
arbitraria — son el reflejo exacto de que `checkIdentityPreserved` sanciona un id por tipo
(`roadmap-core.mjs:727-737`). Aflojar eso **en el mismo run** que estrena la entrada por
pegado hace que un rechazo no se pueda atribuir: ¿lo rehusó el lote mal escrito, o la
sanción recién ampliada? La guarda de identidad del §A.6 va en el Run 1 precisamente porque
es lo que hace segura la entrada por texto.

---
---

# BLOQUE B — El artefacto que no carga

## B.1 Reproducción: **el fallo no se reproduce hoy**

Con el estado de disco de 2026-08-03, `aiw/.project/git_history.json` **carga, y la pestaña
History lo pinta.** Medido de tres formas independientes:

1. **HTTP.** Servidor propio en 8899 y el del operador en 8788, los 18 artefactos
   (3 proyectos × 6):

   ```bash
   curl -s -o /dev/null -w "%{http_code} %{size_download}" http://127.0.0.1:8899/projects/aiw/.project/git_history.json
   ```
   → `200 23931`. **18 de 18 en `200`**, en ambos servidores.

2. **Navegador.** Con `aiw` como proyecto activo, `loadedSources` contiene
   `/projects/aiw/.project/git_history.json`, y `failedSources` tiene **9 entradas, todas
   `404`, y ninguna es de los seis artefactos**: son las rutas opcionales que este emisor no
   escribe (`project.json`, `state/*`, `ledgers/*`, `guardrails/project_memory.jsonl`) y que
   `isDeclaredSource` (`project-console.js:982-986`) clasifica como «no declaradas» —
   ausencias por diseño, no fallos.

3. **Render.** Pestaña History de `aiw`: rama `main`, **62 commits** pintados.

**Punto exacto donde la carga fallaría, para cuando falle** (esto sí se localiza leyendo el
código, y se verificó forzando el estado en el navegador sin tocar disco):

- **Fetch:** `fetchText`, `project-console.js:995` (`if (!response.ok) throw`) →
  `recordSourceFailure`, `:1000` → `:988`. Alimenta el panel de Diagnostics.
- **Render:** `renderCommitHistory`, la puerta de forma en `project-console.js:4251`, y el
  banner en **`:4252-4257`**, cuyo texto se compone con `displaySourcePath(PATHS.gitHistory)`
  en **`:4255`**.

Texto exacto del banner, obtenido llamando `renderCommitHistory({gitHistory:null})` en el
navegador y restaurando el DOM acto seguido:

> **Commit history unavailable.** `projects/<key>/.project/git_history.json` could not be
> loaded. The rest of the Project Console is unaffected.

## B.2 Verificación de lo que el hilo `aiw` ya había descartado

Verificado, no creído:

| Hipótesis descartada | Medición |
|---|---|
| El fichero no existe | **Existe.** 23 920 bytes en disco (`aiw/.project/git_history.json`, mtime 2026-08-03 02:38). |
| No parsea como JSON | **Parsea.** `JSON.parse` limpio. |
| No tiene las mismas doce claves | **Las mismas doce, y en el mismo orden**: `schema_version`, `project_id`, `generated_at`, `generated_from`, `sources`, `model`, `head`, `default_branch`, `branch_scope`, `branches`, `commit_total`, `commits`. Idénticas a las de `aiw-console` (70 065 bytes) y `cantu-studio` (231 458 bytes). |
| El contenido no satisface la puerta del render | **La satisface.** `branches = ["main"]` (no vacío) y `commits` es array de 62. La puerta de `:4251` pide exactamente eso. |
| El prefijo `projects/aiw/…` es la causa | **No lo es**, y el ticket ya lo razonaba. Confirmado: el prefijo lo pone `displaySourcePath` (`project-console.js:2968-2975`), que es **presentación pura** — quita `./`, `../` y la barra inicial de la URL virtual y no toca la ruta real de fetch. Los cinco artefactos que **sí** cargan llevan el mismo prefijo. |

Además: la raíz de `aiw` **sí** es reclamada por un layout (`repo_root`, canónico
`roadmap/roadmap.json`), y `buildGitHistory('../../aiw')` — lectura pura, ejecutada sin
escribir — devuelve `branches=["main"], commits=62`. Ni el layout ni el emisor están rotos.

## B.3 **Por qué ese y no los otros cinco** — con evidencia

La causa está localizada, es estructural, y **es una decisión de gobernanza ejecutada, no
un defecto de código.**

**El hecho medido.** De los seis artefactos de `aiw/.project/`, **cinco están versionados y
uno no**:

```bash
cd aiw && git ls-files .project
```
→ `docs_index.json`, `guardrails.json`, `no_claims.json`, `roadmap.json`, `snapshot.json`.
**`git_history.json` no aparece.**

```bash
cd aiw && git check-ignore -v .project/git_history.json
```
→ `.gitignore:7:.project/git_history.json`

**Los otros dos proyectos registrados versionan los seis** (`git ls-files .project` devuelve
6 entradas en `aiw-console` y en `cantu-studio`, y `git check-ignore` no acierta en ninguno).
**`aiw` es el único de los tres donde esto ya se ejecutó.**

**Cuándo y por qué.** Commit `2db376b` (2026-07-29):

> `gitignore: git_history.json vuelve a ser de maquina (D-053 adjudicacion 4); entro por error en c8c40ba`
> `.gitignore | 1 +` · `.project/git_history.json | 506 ------`

Y `D-053`, adjudicación 4 (`context/DECISIONES.md:1691-1704`), lo dice con todas las letras:

> **`.project/git_history.json` — DE MÁQUINA, EN TODO EMISOR**, y **el resto de `.project/`
> de AIW SÍ se versiona.** […] es estructuralmente imposible tenerlo commiteado y al día a
> la vez —**el commit que lo actualiza lo desactualiza**— […] su regeneración además tiene
> botón y ruta (`history/sync`).

Y también dice por qué **solo `aiw`** está así hoy:

> **Su ejecución se parte por hilo:** lo de `aiw` y lo de `aiw-console` son de sus encargos
> posteriores; **lo de `cantu-studio` pasa a su hilo**.

**La cadena causal completa, leída del código:**

1. El emisor construye `emitted_artifacts` **a partir de lo que la emisión acaba de
   escribir** (`tools/projector/project.mjs:1855-1858`), y lo mete dentro de
   `snapshot.json` (`:1860`, `:1202`).
2. `snapshot.json` **está versionado**; `git_history.json` **no**.
3. En cualquier checkout, clon o `git clean -fdx` donde no haya corrido una emisión local, el
   `snapshot.json` versionado **sigue declarando** `.project/git_history.json` — medido:
   los tres snapshots declaran los seis artefactos, incluido `git_history` —, pero el
   fichero declarado no viaja.
4. La consola lee esa declaración (`readDeclaredArtifactPaths`, `project-console.js:970-976`),
   el fetch da 404, `isDeclaredSource` (`:982-986`) lo clasifica como **declarado y fallido**
   —la ausencia ruidosa del §20— y `renderCommitHistory` pinta el banner de `:4252-4257`.

**Por eso falla exactamente uno de seis, y exactamente en `aiw`:** es el único artefacto de
los seis que no viaja con el repositorio, y `aiw` es el único de los tres proyectos donde
esa regla ya se aplicó. Los otros cinco son ficheros trackeados: están siempre.

**Por qué hoy carga:** porque el 2026-08-03 a las 02:38 corrió una emisión local sobre `aiw`
(mtime idéntico en los seis artefactos), que lo regeneró. Es literalmente el remedio que
`D-053` previó — el botón `history/sync` / la re-emisión de `.project/`.

**No se pudo fechar cuándo estuvo ausente.** El disco no guarda historia de un fichero
ignorado. Lo datable son los dos extremos: la retirada del repo el 2026-07-29 (`2db376b`) y
la regeneración local el 2026-08-03 02:38 (mtime).

## B.4 No se reparó. Coste de la reparación y recomendación

**No se tocó nada** en `aiw`, ni en el emisor, ni en la consola.

**Aquí hay una decisión que este ticket no autoriza, así que se para y se reporta.** El
fichero es de-máquina **por decisión vigente** (`D-053` adj. 4). «Reparar» no puede
significar volver a versionarlo: eso sería revertir `D-053`. Lo que hay es una **tensión
medida** entre dos piezas que hoy no se hablan:

> Un fichero **versionado** (`snapshot.json`) declara emitir un artefacto **ignorado**
> (`git_history.json`). La declaración sobrevive al artefacto, y la consola lee esa
> supervivencia como promesa incumplida.

**Tres opciones, con coste medido. No se elige ninguna.**

| Opción | Qué hace | Coste medido |
|---|---|---|
| **1. No hacer nada** | El operador pulsa «Sync History» y se acabó. La consola ya ofrece el botón (`project-console.js:4299`) y la ruta existe (`serve.mjs:580-623`). | **0 sitios.** Precio: el banner sigue leyéndose como avería, y `aiw-console` y `cantu-studio` heredarán el mismo síntoma cuando sus hilos ejecuten `D-053`. |
| **2. Que el emisor no declare un artefacto de-máquina** | Excluir `git_history` de `emitted_artifacts` cuando la regla lo hace de-máquina, para que su ausencia sea «no declarada» (§18) y no «declarada y fallida» (§20). | **1 sitio** (`tools/projector/project.mjs:1855-1858`) + 1 fichero de test. **Efecto colateral a decidir:** deja de anunciarse también cuando falte de verdad. |
| **3. Que la consola nombre la razón** | Un mensaje propio para este artefacto: «de-máquina por `D-053`; pulsa Sync History», en vez de «could not be loaded». | **2 sitios** (`project-console.js:4252-4257` y la fila de Diagnostics) + 1 CSS opcional + 1 test. No toca el emisor ni ningún `.gitignore`. |

**Recomendación explícita, sin decidir:** la **opción 3**, y sola. Es la única que no cambia
la semántica de `emitted_artifacts` (que hoy es honesta: dice lo que la emisión escribió), no
toca ningún `.gitignore`, y convierte un síntoma que se lee como avería en una instrucción.
La opción 2 toca la pieza que `CONTRATO §18/§20` usa para distinguir ausencia-por-diseño de
ausencia-real, y esa distinción es exactamente lo que aquí está en juego: merece su propio
acto. **Y hay algo que decidir antes que cualquiera de las tres:** `D-053` declara la regla
**transversal a los tres proyectos**, y hoy solo `aiw` la cumple. Mientras `aiw-console` y
`cantu-studio` sigan versionando el suyo, cualquier arreglo se estará aplicando a un régimen
que va a cambiar. Eso no lo decide esta medición.

---
---

# BLOQUE C — `closure_mode` junto a `severity`

## C.1 Todas las superficies donde hoy se pinta la etiqueta de `severity`

`severity` y `closure_mode` son **derivados y nunca almacenados**
(`tools/roadmap/roadmap-core.mjs:85-86`). Hay **una sola** implementación de la derivación,
en `tools/classification/classification.mjs:223` (`deriveClassification`), que la consola
**invoca por inyección** — no lleva copia (`project-console.js:77-116`).

**Cinco superficies pintan la etiqueta de un run.** Dos pintan solo `severity`; tres ya
pintan las dos.

| # | Superficie | Sitio que la pinta | `severity` | `closure_mode` |
|---|---|---|---|---|
| S1 | **Fila del árbol de Roadmap** | chip en `project-console.js:3409-3412`, insertado en la fila por `:3427` (`v3RoadmapRunRow`) | **Sí** | **No** |
| S2 | **Fila de la Run Queue** | el **mismo** chip de `:3409-3412`, insertado por `:4491` (`renderRunQueueV3`) | **Sí** | **No** |
| S3 | Cajón de detalle del run, sección Classification | `derivedRow` en `:4627-4634`; severidad en `:4645` | Sí | **Ya** (`:4646`) |
| S4 | Modal de edición, nota del bloque Classification | `:5922` | Sí | **Ya** |
| S5 | Previsualización dry-run de `set-classification` | `:6745` | Sí | **Ya** (`:6746`) |

S1 y S2 comparten **una sola función**: `v3RunRowTags` (`project-console.js:3397-3414`).
Ese es el hallazgo que decide el coste.

**Apariciones de la palabra «severity» que NO son la etiqueta de un run, listadas y
excluidas con su motivo:**

| Sitio | Qué es | Por qué se excluye |
|---|---|---|
| `project-console.js:3883` | `<th scope="col">severity</th>` de la tabla de care budget | Ahí `severity` es el **eje** de una configuración de proyecto (§5), no la etiqueta de un run. `closure_mode` no indexa nada ahí. |
| `project-console.js:3973` | Mensaje de rechazo del care budget | Prosa. |
| `project-console/index.html:132` | Comentario sobre el sobre del care budget | Prosa. |
| `.project/snapshot.json` → `taxonomy_model` | Vocabularios y tablas de derivación | **Dato, no pintura** — y ya viaja **simétrico**: `run.severity` y `run.closure_mode` están ambos, con `stored:false` y sus tokens. Cero cambios. |

## C.2 Qué datos recibe la vista de lista de runs

Medido en el navegador con `aiw-console` activo, sobre el modelo real
(`v3Model(appData).allRuns`):

| Pregunta del ticket | Respuesta medida |
|---|---|
| ¿Le llegan los cinco campos de clasificación? | **Sí, verbatim.** Las filas son los objetos crudos de `.project/roadmap.json`. Claves de un run clasificado: `run_id`, `queue_order`, `title`, `summary`, `full_description`, `status`, `depends_on`, **`correctness_model`, `work_type`, `blast_radius`, `failure_surfaces`**, `classified_at` — y `external_effects` cuando existe (aparece en la unión de claves de los 56 runs). |
| ¿Le llega `severity` ya derivada? | **No, y no debe.** No viaja en ningún artefacto: se deriva **en el navegador, en tiempo de render**, llamando `v3DerivedClassification(run)` (`project-console.js:110-116`) → `classificationModel.deriveClassification` (`tools/classification/classification.mjs:223`). |
| ¿`closure_mode` viaja, o habría que hacerlo llegar? | **No hay nada que hacer llegar.** La **misma llamada** que ya se hace en `:3409` devuelve **las dos**: `{ severity, closure_mode, available }` (`:115`). El valor ya está en la mano, en la línea exacta donde se construye el chip de severidad — simplemente se descarta. |

**Datos de la medición** (proyecto `aiw-console`, 2026-08-03):
56 runs en la lista, **13 clasificados** (23,2 %).
Severidades derivadas: `CRITICAL` 6, `MAJOR` 4, `MODERATE` 3, `MINOR` 0.
Closure modes derivados: `SEMI_ATTENDED` 7, `ATTENDED` 4, `UNATTENDED` 2.
Chips de severidad realmente en el DOM en ese instante: **26 en filas** (13 runs × 2
superficies) **+ 1 en el cajón abierto**; y **1 chip de `closure_mode`**, el del cajón.

## C.3 **Cuántos sitios costaría** — con la unidad explícita

> **1 sitio de código**, que sirve **las 2 superficies** que hoy no lo pintan.
> **+1 sitio de test.** **+1 sitio de CSS, opcional.**

Lista de rutas, exhaustiva:

| # | Ruta y línea | Qué hay que hacer | ¿Obligatorio? |
|---|---|---|---|
| 1 | `project-console/assets/project-console.js:3409-3412` (`v3RunRowTags`) | La llamada ya devuelve `closure_mode`; añadir un segundo `tags.push(...)` con la misma guarda de ausencia que ya tiene severidad. **Sirve S1 y S2 a la vez** — ninguna de las dos llamadas (`:3427`, `:4491`) se toca. | **Sí** |
| 2 | `tests/classification-transport-and-console.test.mjs:422-427` | Las dos aserciones vivas sobre el chip (una con clasificación, otra sin) — extender a la segunda etiqueta. | **Sí** |
| 3 | `project-console/assets/project-console.css:6340-6371` | Modificadores propios para los tres tokens de closure (`.is-unattended`, `.is-semi_attended`, `.is-attended`) **si** se quiere distinguirlos visualmente de severidad. | **No** — ver §C.4 |

**Sitios que NO hay que tocar, y por qué** (medido, no supuesto):

- `:3427` y `:4491` — solo insertan la cadena que devuelve `v3RunRowTags`.
- `:4645`, `:4646`, `:5922`, `:6745`, `:6746` — **ya pintan las dos**.
- El emisor (`tools/projector/project.mjs`) y los seis artefactos — `closure_mode` ya viaja
  en `taxonomy_model` y los cinco campos de entrada ya viajan en `roadmap.json`.
- `tools/classification/classification.mjs` — la derivación ya devuelve el par.
- `tools/project-console/validate-project-console-state.mjs` — **cero** anclas sobre
  `severity` o `v3RunRowTags` (verificado por búsqueda); no hay ancla que actualizar.

## C.4 Restricciones de espacio y de estilo

**¿Hay restricción que lo impida? No.** Ninguna de las dos, medidas en el CSS vivo:

- **Espacio.** `.v3-run-title` (`project-console.css:3204-3209`) y
  `.v3-queue-row .v3-run-title` (`:3465-3468`) **no truncan**: no hay `white-space: nowrap`
  ni `text-overflow`. Lo que sí trunca es el **resumen** de la fila de queue
  (`.v3-queue-row .v3-run-summary`, `:3474-3478`) — otra línea. Una etiqueta de más envuelve;
  no recorta ni desborda. `.v3-severity-tag` ya declara `white-space: nowrap` y
  `display: inline-block` (`:6340-6354`), que es justo lo que hace falta para que una etiqueta
  adicional caiga entera a la línea siguiente en vez de partirse.
- **Convivencia.** Una fila puede llevar hoy hasta **3** etiquetas: orden global **o** carril
  (excluyentes, `project-console.js:3400-3402`), barrera (`:3403-3405`) y severidad
  (`:3409-3412`). Sería la **cuarta**, y solo en los runs clasificados — 13 de 56 (23,2 %)
  en el proyecto medido.

**¿El CSS existente sirve? Sí, y está probado en vivo.** El cajón de detalle **ya** emite
`class="v3-severity-tag is-attended"` para un `closure_mode` (`project-console.js:4631`
compone la clase con `String(value).toLowerCase()`), y se comprobó en el DOM del navegador:
la etiqueta se pinta con la regla base de `:6340-6354` — sin ningún modificador `.is-*`
que la reclame, porque los cuatro que existen (`:6355-6371`) son los de severidad. Es decir:
**cero sitios de estilo obligatorios**; la etiqueta sale neutra y legible.

**El único juicio de diseño, y no se toma aquí:** con la regla base, severidad y closure
mode se pintan **con el mismo aspecto** salvo cuando la severidad es `MAJOR` o `CRITICAL`
(que sí tienen color). Si se quiere que se distingan siempre, es **1 sitio** de CSS
(`project-console.css`, junto a `:6355-6371`). Si se acepta que se distingan por el texto —
`CRITICAL` frente a `ATTENDED`, vocabularios disjuntos, imposible de confundir — son **cero**.
La medición se detiene aquí: **elegir entre las dos es una decisión de diseño que este
ticket no autoriza.**

---
---

# Lo que NO se pudo medir, y por qué

1. **De qué superficie salió el mensaje que el operador vio** (el banner de History o la
   fila de Diagnostics). Las dos componen el prefijo con la misma función
   (`displaySourcePath`, `project-console.js:2968-2975`) y producen el mismo
   `projects/aiw/…`. No es distinguible a posteriori.
2. **Cuándo estuvo ausente `aiw/.project/git_history.json`, y durante cuánto.** Un fichero
   ignorado no deja historia en el repositorio ni el disco guarda mtimes anteriores. Solo
   son datables los extremos: 2026-07-29 (`2db376b`) y 2026-08-03 02:38 (mtime de la
   regeneración).
3. **El comportamiento real de un `apply:true` con lote multi-run.** Fuera de alcance:
   habría escrito en `roadmap.json`. Todo lo del §A.3 se midió con `planEdit` contra una
   **copia** en carpeta temporal, verificando después que la copia seguía byte-idéntica.
4. **Las rutas de escritura `history/sync` y `project/emit` sobre `aiw`.** No se ejercitaron:
   escriben en `aiw`, que está fuera de alcance. Lo que sí se midió, sin escribir, es el
   constructor puro `buildGitHistory` y el resolutor `detectRootLayout`.
5. **La suite completa.** Fuera de alcance por el otro encargo en vuelo. De los tests solo se
   contó y se citó: 47 líneas que mencionan `batch` en 7 ficheros; 4 líneas que asertan el
   chip de severidad en `tests/classification-transport-and-console.test.mjs:422-427`.
6. **Si el fork `docs/project-console/` o el prototipo `console/` tienen otro
   comportamiento.** Excluidos por el ticket; aparecieron en las búsquedas y **no se leyeron
   ni se citan**.

# Paradas — decisiones que este encargo no toma

Tres, todas con informe de opciones y recomendación explícita arriba, ninguna decidida:

1. **§A.7** — si la puerta de operaciones es uno o dos runs. Recomendado: dos (12 sitios / 4
   sitios), porque el corte cae sobre `checkIdentityPreserved`, no sobre el tamaño.
2. **§B.4** — qué hacer con el artefacto de-máquina. Recomendado: la opción 3 (2 sitios), y
   **antes**, resolver que `D-053` adj. 4 está ejecutada en 1 de 3 proyectos.
3. **§C.4** — si `closure_mode` debe distinguirse visualmente de `severity`. 1 sitio de CSS
   si sí, 0 si no.

# Higiene de la medición

- Servidor de medición levantado en `PC_PORT=8899` y **detenido al terminar**. El del
  operador (puerto 8788, PID 3128) no se tocó ni se reinició.
- Copia temporal del canónico usada para `planEdit`, en el scratchpad de sesión, **fuera de
  ambos repositorios**, y verificada byte-idéntica después de las cinco pruebas.
- `git` se usó **solo** en modo lectura: `log`, `show --stat`, `ls-files`, `check-ignore -v`,
  `status --porcelain`. Ni un `add`, ni un `commit`, ni un `checkout`.
- Ningún `.gitignore`, ningún `roadmap.json`, ningún `.project/`, ningún test y ninguna
  línea de la consola fue modificada.
