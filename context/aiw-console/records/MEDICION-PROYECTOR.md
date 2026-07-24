# MEDICIÓN DEL EMISOR — el proyector de AIW

Estado: MEDICIÓN read-only, fechada 2026-07-23. No es contrato ni decisión.
Cierra las cuatro preguntas de identidad que el contrato dejó abiertas sobre el
emisor, y levanta el inventario de alcance del tramo 2.

**Método.** Lectura directa y completa de los dos archivos citados; ninguno se
modificó. Se leyó además, de apoyo, `tools/project-console/serve-project-console.mjs`,
`projects.config.json`, `../../aiw/queue.mjs` y el contenido en disco de
`.aiw/` y `../../aiw/objectives/`. **No se ejecutó el proyector.** **No se ejecutó
git en ninguna forma.** Todo lo que aquí se afirma tiene cita por archivo y línea;
lo que el código no permite decidir se marca **[NO VERIFICADO]**.

**Alias de cita usados en este record:**

| Alias | Archivo |
|---|---|
| `PROJ` | `projects/aiw-console/tools/projector/project.mjs` (543 líneas) |
| `GITBUILD` | `projects/cantu-studio/tools/project-console/build-git-history-snapshot.mjs` (236 líneas) |
| `GITBUILD-C` | `projects/aiw-console/tools/project-console/build-git-history-snapshot.mjs` (copia en la consola) |
| `SERVE` | `projects/aiw-console/tools/project-console/serve-project-console.mjs` |
| `CONTRATO` | `context/aiw-console/CONTRATO.md` |

---

## 1. `taxonomy_model` — **HORNEADO**

**Respuesta binaria: HORNEADO como constante literal en el código. No se deriva de
los datos leídos.**

El campo se produce en un solo lugar, `PROJ:463-466`, dentro de `buildSnapshot()`:

```js
taxonomy_model: {
  objective_classifications: OBJECTIVE_CLASSIFICATIONS,
  operational_statuses: OPERATIONAL_STATUSES
},
```

Los dos identificadores son constantes de módulo, escritas a mano, sin ninguna
entrada de datos:

- `PROJ:38` — `const OBJECTIVE_CLASSIFICATIONS = ["pending", "parked", "processed"];`
- `PROJ:40` — `const OPERATIONAL_STATUSES = ["active", "blocked", "idle"];`

Ninguna de las dos se reasigna en el archivo, y ninguna función que las lea las
recalcula: `OBJECTIVE_CLASSIFICATIONS` se recorre para leer carpetas
(`PROJ:98`, `PROJ:188`) y se emite tal cual; `OPERATIONAL_STATUSES` **no se usa
en ninguna otra parte del archivo** salvo esa emisión — es un literal que viaja al
JSON y nada más. El valor `operational_status` real del snapshot no sale de ella:
se calcula aparte en `PROJ:423` (`pending.length > 0 ? "active" : "idle"`), y
nótese que ese cálculo **no puede producir nunca `"blocked"`**, uno de los tres
tokens que el vocabulario declara. El vocabulario declarado es más ancho que lo
que el emisor sabe emitir: prueba adicional de que es literal, no derivación.

**Qué resuelve.** `CONTRATO:1117-1120` y `:1134-1137` (§17) marcaron
**[NO VERIFICADO]** la hipótesis de que el bloque estuviera horneado como
constante en el emisor, porque la medición previa no leyó el emisor. **Queda
VERIFICADA: la hipótesis era cierta.** La norma de §17 —«`taxonomy_model` es
función del modelo transportado»— sigue siendo norma y sigue sin cumplirse: el
emisor no la implementa hoy. Adecuarlo es trabajo del tramo 2, exactamente como
§17 anticipó (`CONTRATO:1135-1137`).

Nota de precisión: que hoy esté horneado **no lo hace incorrecto hoy**. El
proyector emite un solo modelo (§2 de este record), así que la constante y la
derivación coinciden en valor. El defecto es latente, no actual: se manifiesta el
día que el mismo emisor transporte un segundo modelo.

---

## 2. `aiw_flat_objectives_v1` — **nombra al CONTENIDO; el modelo es ESPECÍFICO del kernel de AIW**

Dos respuestas binarias, porque la pregunta tiene dos filos:

**(a) ¿Nombra al emisor o al contenido? NOMBRA AL CONTENIDO.**
**(b) ¿El modelo plano es genérico o está atado al kernel de AIW? ESTÁ ATADO.**
Y (b) es lo que hace legítimo a (a): el `aiw_` del identificador no es la firma de
quién lo escribió, es el nombre de la forma que describe.

El identificador se produce en `PROJ:450`, como literal en línea:

```js
roadmap_tree: {
  model: "aiw_flat_objectives_v1",
```

No hay constante, ni parámetro, ni lectura de `config.json` detrás. Es literal
horneado — pero la pregunta relevante no es si es literal, sino **a qué se
refiere.**

**La evidencia de que el modelo es específico del kernel, no genérico:**

1. Las tres clasificaciones son literales del código, no descubrimiento de
   carpetas: `PROJ:38`. El proyector **no lista** qué subcarpetas existen bajo
   `objectives/`; itera exactamente esas tres (`PROJ:98-99`, `PROJ:188-189`). Un
   repo con carpetas de objetivos llamadas `todo/`/`doing/`/`done/` produciría un
   árbol **vacío**, no un árbol equivalente.
2. Medido en disco: el kernel de AIW tiene **siete** subcarpetas bajo
   `objectives/` (`parked`, `pending`, `prepared`, `processed`, `qualification`,
   `queue-e7`, `staged`). El proyector lee tres e **ignora cuatro** en silencio.
   El modelo no describe «las carpetas de objetivos de un repo»: describe el
   trío del ciclo de vida del kernel de AIW.
3. La semántica de estado también está horneada al kernel: el mapa
   `PROCESSED_STATUS_BY_PREFIX` (`PROJ:58-65`) traduce prefijos de nombre de
   archivo —`REJECTED`, `BLOCKED`, `FAILED`, `CANCELLED`, `ERROR`,
   `HUMAN_REVIEW`— que son **los estados terminales del kernel de AIW**
   (`aiw/kernel.mjs:29` y siguientes), no un vocabulario genérico. Y el prefijo se
   extrae con una regex sobre el nombre de archivo (`PROJ:196`), que es la
   convención de archivado del kernel (`aiw/queue.mjs:58`).
4. La ruta raíz es fija: `join(root, "objectives")` (`PROJ:96`, `PROJ:186`). No es
   configurable.

**Qué resuelve.** `DECISIONES.md` D-040 dejó anotada, sin resolver, la asimetría:
si `aiw_flat_objectives_v1` incurría o no en el mismo defecto que
`jame.roadmap_v3.v0.2-progress` —un identificador que nombra a quien lo emitió en
vez de a lo que transporta— dependía «de si el modelo plano es genérico o
específico del kernel de AIW», y «se resuelve leyendo el emisor, en el tramo 2».
**Resuelto: NO incurre en el mismo defecto.** `jame.` nombra a una organización
emisora; `aiw_flat_objectives` nombra una forma de datos —objetivos planos con el
ciclo de vida de AIW— que solo existe donde ese ciclo de vida existe. Un consumidor
que lea `aiw_flat_objectives_v1` sabe qué campos esperar; uno que lea `jame.` solo
sabe quién lo escribió. La asimetría era aparente, no real.

**Contorno honesto.** Esto dice que el identificador está bien formado bajo el
criterio de §1 del contrato. **No** dice que el modelo sea bueno, ni que deba
sobrevivir: sigue siendo un árbol plano de un nivel (`PROJ:276-288`: un objetivo,
una fase, todos los runs dentro), y su relación con `roadmap_tree_v1` (§10.c) es
asunto del contrato, no de este record.

---

## 3. `jame.git_history_snapshot.v1` — **LITERAL HORNEADO**

**Respuesta binaria: literal horneado. Ni derivado ni configurable.**

`GITBUILD:26`:

```js
const SCHEMA = "jame.git_history_snapshot.v1";
```

Constante de módulo, sin reasignación. Se consume una sola vez, en la construcción
del objeto snapshot: `GITBUILD:186` (`schema: SCHEMA,`). No hay variable de
entorno, ni argumento de CLI, ni lectura de config que lo pueda sustituir: el
único punto de entrada del archivo es
`buildGitHistorySnapshot(opts)` (`GITBUILD:137`) y su único `opts` reconocido es
`opts.now` (`GITBUILD:184`).

Verificado también en la copia que vive en la consola: `GITBUILD-C:26`, idéntico
literal, misma constante. Y la ruta de salida está igual de horneada:
`GITBUILD:24` / `GITBUILD-C:24`, `join(REPO_ROOT, ".aiw", "views",
"git_history.snapshot.json")`, con `REPO_ROOT` derivado de la ubicación del propio
archivo (`GITBUILD:22-23`), no de un argumento.

**Consecuencia para el contrato.** `CONTRATO:1306-1312` anotó que este
identificador «carga `jame.`, igual que lo cargaba el del roadmap antes de §10.c»
y que «renombrarlo es trabajo del emisor (tramo 2)». La medición confirma el
coste: **una línea** (`GITBUILD:26`), **en dos copias** (`GITBUILD:26` y
`GITBUILD-C:26`), más cualquier consumidor que compare el string. A diferencia de
§2 de este record, aquí el prefijo **sí** nombra al emisor: `jame.` es una
organización, no una forma de datos. El defecto que §2 descartó para
`aiw_flat_objectives_v1` es real para este.

---

## 4. Los `run_id` del proyector — **DERIVADOS** (de nombres de ARCHIVO, no de carpeta)

**Respuesta binaria: DERIVADOS. No se leen de ningún archivo donde estén
escritos; se calculan en cada proyección a partir del nombre del archivo `.md` del
objetivo.**

La cadena completa, citada:

1. `PROJ:190` — se listan los archivos de `objectives/<clasificación>/`
   (`safeReadDirNames(dir)`, que devuelve **archivos**, no directorios:
   `PROJ:80`, rama `entry.isFile()`).
2. `PROJ:192` — `const id = name.replace(/\.md$/i, "");` — el id **es** el nombre
   del archivo sin extensión. No se lee frontmatter, ni un campo `run_id`, ni un
   índice: el archivo `.md` no se parsea para obtener identidad, solo para título
   y resumen (`PROJ:199-201`).
3. `PROJ:235`, `PROJ:247`, `PROJ:262` — `run_id: objective.id` en las tres ramas
   (pending, parked, processed). Sin transformación adicional.

**Corrección a D-041.** D-041 escribió que la familia de ids del proyector «se
deriva de nombres de carpeta». Se deriva de nombres de **archivo**
(`objectives/pending/005-roadmap-contract-fix.md` → `005-roadmap-contract-fix`).
La sustancia de la observación de D-041 —ids cortos y numerados, la clase más fácil
de colisionar— queda intacta; la ruta de derivación era imprecisa. Nombres de
carpeta sí se usan, pero en otra cosa: `readRunHistory` (`PROJ:337`,
`{ dirsOnly: true }`) deriva de `logs/<id>/` los ids de
`latest_history_items` — otro campo, otro espacio de nombres.

Verificado contra disco: los 16 `run_id` de `.aiw/views/roadmap.json` son
exactamente los 16 nombres de archivo bajo `../../aiw/objectives/{pending,parked,
processed}/`, en ese orden y sin excepción.

### 4.a Consecuencia evaluada — y un hallazgo que la pregunta no anticipaba

Lo que la pregunta pedía evaluar: **si son derivados, cambiar su forma cuesta
cambiar una función.** Confirmado, y es barato: `PROJ:192` es el único punto donde
se fabrica el id. Un normalizador ahí cambia la forma de los 16 ids de golpe, sin
tocar un solo archivo de datos, sin migración y sin ventana de inconsistencia. No
hay identidad autorada que migrar porque no hay identidad autorada.

**Pero el mismo hecho tiene un segundo filo, y es más serio.** Si el id es el
nombre del archivo, entonces **el id cambia cuando el archivo se renombra** — y el
kernel renombra los archivos de objetivo como parte de su operación normal:

`aiw/queue.mjs:58` archiva a `processed/` con el estado como prefijo:

```js
path.join(PROCESSED, `${state}-${f}`)
```

Medido en disco: los objetivos procesados se llaman
`APPROVED-001-console-projector.md`, `ERROR-000-sandbox.md`,
`HUMAN_REVIEW-999-sandbox-imposible.md`. El mismo objetivo que estando pendiente
proyectaría `run_id: "001-console-projector"` proyecta, una vez archivado,
`run_id: "APPROVED-001-console-projector"`.

**Es decir: bajo el emisor actual, `run_id` NO es inmutable.** Muta exactamente en
la transición que más importa —cuando el run termina— y muta de forma legible en
el propio id (el estado terminal viaja dentro de la identidad). Esto contradice
frontalmente la identidad inmutable que D-034 fijó (`DECISIONES.md:372`) y que
D-041 extendió a unicidad global (`CONTRATO:676`, regla `r`).

**Grado de verificación.** Que el kernel renombra al archivar: **VERIFICADO**
(`aiw/queue.mjs:58`, más los prefijos presentes en disco). Que el id proyectado
cambia como consecuencia: **VERIFICADO** por lectura del código
(`PROJ:192` → `PROJ:235`/`PROJ:262`); no se ejecutó el proyector para observarlo,
pero no hay rama que lo evite. Lo que queda **[NO VERIFICADO]** es si algún
consumidor guarda `run_id` entre proyecciones y por tanto sufriría la mutación:
eso exige leer los consumidores, que no son objeto de este encargo.

**Consecuencia de alcance:** el tramo 2 no solo puede cambiar la forma del id
barato — **tiene una razón para hacerlo**. Un id estable exige desacoplarlo del
nombre de archivo (por ejemplo, despojando el prefijo de estado, que ya se extrae
por separado en `PROJ:196` y viaja en `closeout_result`, `PROJ:269`). Eso es
diseño, y va en encargo aparte; aquí solo se mide.

---

## 5. Inventario de lo que el proyector emite hoy — y la brecha contra el contrato

**Esta sección separa estrictamente lo MEDIDO de lo PROPUESTO. Nada se
construyó.**

### 5.a MEDIDO — lo que hoy se escribe, y quién lo escribe

| # | Ruta escrita | Emisor | Cita |
|---|---|---|---|
| 1 | `<project-root>/.aiw/views/project_console.snapshot.json` | el proyector | `PROJ:32` (constante), `PROJ:516` (escritura) |
| 2 | `<project-root>/.aiw/views/roadmap.json` | el proyector | `PROJ:35` (constante), `PROJ:506` (escritura) |
| 3 | `<repo>/.aiw/views/git_history.snapshot.json` | el history-builder | `GITBUILD:24`, `GITBUILD:198-201` |
| 4 | `<repo>/.aiw/roadmap/roadmap.json` | el server (copia de entrega) | `SERVE:71` (`deliverTo`), `SERVE:13`, `:21-22` |

Son **tres emisores, cuatro rutas**. Las cuatro existen en disco en
`aiw-console/.aiw/` hoy, y coinciden con las cuatro que la nota de verificación de
la capa 3 contó (`CONTRATO:1216-1219`).

Precisiones medidas que importan para el tramo 2:

- **El proyector escribe en el root del PROYECTO proyectado; el server las
  aterriza en el root de la CONSOLA.** El proyector resuelve sus salidas contra
  el `root` que recibe (`PROJ:475-483`), y el server corre el proyector una vez
  por proyecto de `projects.config.json` (hoy: uno, `{root: "../../aiw", id:
  "aiw"}`) y transfiere cada vista al `.aiw/views/` de la consola
  (`SERVE:9-13`, `:194-196`). Por eso `aiw-console/.aiw/views/roadmap.json`
  declara `project_id: "aiw"` aunque `aiw-console` no tiene `objectives/`.
- **`writeSnapshot` emite ambas vistas siempre**: escribe el snapshot y llama a
  `writeRoadmap` a continuación (`PROJ:513-525`). No hay modo de emitir una sola.
- **El history-builder no es parte del proyector** y su root es su propia
  ubicación en disco (`GITBUILD:22-23`), no un argumento. Un segundo proyecto no
  obtiene historia por configuración.
- **Guardia estructural:** `resolveInsideAiw` (`PROJ:475-483`) **lanza** si la
  ruta de salida no cae dentro de `<root>/.aiw/`. Está declarada como frontera
  del proyector en su cabecera (`PROJ:12-13`). El emisor, tal como está, **no
  puede escribir bajo `.project/` en absoluto** — no es cuestión de cambiar una
  constante de ruta.

### 5.b MEDIDO — qué dice el contrato sobre cada una

| Ruta de hoy | Destino que el contrato declara | Estatus | Cita |
|---|---|---|---|
| `views/project_console.snapshot.json` | `.project/snapshot.json` | **REQUERIDO** (el único) | `CONTRATO:45`, `:61`, §8 |
| `views/roadmap.json` | `.project/roadmap.json` | OPCIONAL | `CONTRATO:1293` (§19) |
| `views/git_history.snapshot.json` | `.project/git_history.json` | OPCIONAL | `CONTRATO:1294` (§19) |
| `roadmap/roadmap.json` (copia de entrega) | **ninguno** — el contrato la excluye explícitamente | fuera | `CONTRATO:1307-1310` |

Y los **12 archivos sin emisor** de `CONTRATO:1240-1256` (§18.a) quedan **fuera de
`.project/`** por la regla de admisión: `project.json`, `state/*` (3),
`ledgers/*` (4), `docs/docs_index.json`, `guardrails/*` (3). **No entran en este
inventario de alcance**: construirles emisor no es tramo 2 salvo decisión aparte,
y cada uno entra por la puerta de `CONTRATO:1276-1286` (§18.b) el día que lo
tenga.

### 5.c PROPUESTO — lo que faltaría para que el emisor cumpla el contrato

**Lista de alcance, no plan. No se evaluó dificultad, orden ni riesgo. Ninguna de
estas líneas es una decisión tomada.**

Derivado de comparar 5.a con 5.b:

1. **Levantar la guardia de destino.** `resolveInsideAiw` (`PROJ:475-483`) impide
   por diseño escribir fuera de `.aiw/`. Emitir a `.project/` exige una guardia
   equivalente para el destino nuevo — y decidir si durante la convivencia
   aditiva (D-036) el emisor escribe en **ambos** destinos o solo en el nuevo.
   **Es el bloqueo estructural del tramo 2**; lo demás son constantes.
2. **Rutas y nombres nuevos**: `SNAPSHOT_RELATIVE_PATH` (`PROJ:32`) y
   `ROADMAP_RELATIVE_PATH` (`PROJ:35`) — desaparece el nivel `views/`, desaparece
   el prefijo `project_console.` y el sufijo `.snapshot` (`CONTRATO:1297-1302`).
3. **Un tercer archivo a emitir bajo `.project/`**: `git_history.json`, hoy fuera
   del proyector y con root propio (`GITBUILD:22-24`). O el proyector lo asume, o
   el history-builder gana un destino `.project/`. **No medido cuál**.
4. **Identificador del roadmap**: `roadmap_tree_v1` bajo `.project/`
   (`CONTRATO:617`, §10.c). El roadmap que hoy emite el proyector no lleva ningún
   campo de identidad de modelo (`PROJ:273-288`: solo `generated_at`,
   `generated_from`, `objectives`) — no es un renombre, es un campo que no existe.
5. **`taxonomy_model` derivado del modelo transportado** (§17,
   `CONTRATO:1126-1137`), en lugar de las constantes de `PROJ:38,40`. Ver §1.
6. **Renombrar `jame.git_history_snapshot.v1`** (`GITBUILD:26` y `GITBUILD-C:26`),
   anotado como trabajo del emisor en `CONTRATO:1306-1312`. Ver §3.
7. **Decidir la suerte de la copia de entrega** `roadmap/roadmap.json`
   (`SERVE:71`): el contrato no la admite bajo `.project/`
   (`CONTRATO:1307-1310`), pero el lector congelado la lee. Sobrevive en `.aiw`
   mientras dure la convivencia; qué la retira, y cuándo, **no está medido aquí**.
8. **La duplicación del history-builder** (`GITBUILD` y `GITBUILD-C`, mismo
   contenido en dos repos) hace que cada cambio de §3 y §5.c.3 sea doble. Se
   registra como hecho medido; qué hacer con ella **no se propone**.

Fuera de esta lista por construcción: los 12 sin emisor (§5.b), el diseño de
`run_id` estable (§4.a), y cualquier cambio en el consumidor — §20 del contrato
pone la degradación sobre el lector, no sobre el emisor.

---

## Resumen de las cuatro respuestas

| # | Pregunta | Respuesta | Cita decisiva |
|---|---|---|---|
| 1 | `taxonomy_model` | **HORNEADO** — constante literal | `PROJ:38,40` → `PROJ:463-466` |
| 2 | `aiw_flat_objectives_v1` | **nombra al CONTENIDO**; modelo **ESPECÍFICO** del kernel | `PROJ:450`; especificidad en `PROJ:38,58-65,96,196` |
| 3 | `jame.git_history_snapshot.v1` | **LITERAL HORNEADO** — ni derivado ni configurable | `GITBUILD:26` → `GITBUILD:186` |
| 4 | `run_id` del proyector | **DERIVADOS** de nombres de **archivo** | `PROJ:192` → `PROJ:235,247,262` |

Hallazgo no pedido, con consecuencia sobre reglas ya escritas: **`run_id` muta
cuando el kernel archiva el objetivo con prefijo de estado** (`aiw/queue.mjs:58`),
lo que hace que la identidad inmutable de D-034 y la unicidad global de D-041
(regla `r`) no se cumplan bajo el emisor actual. Ver §4.a.

**No se editó `CONTRATO.md` ni ningún record existente. No se modificó
`tools/projector/project.mjs` ni ningún código. No se ejecutó el proyector. No se
ejecutó git en ninguna forma.**
