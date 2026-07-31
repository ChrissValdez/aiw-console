# INSERCIÓN DEL RUN DEL PROYECTOR Y LOS BANCOS DE CASOS

> Encargo de taller de **inserción de roadmap** sobre `aiw-console`. **Una sola escritura
> atómica** sobre `roadmap/roadmap.json`: alta de
> `RUN-CONSOLE-PROJECTOR-CASE-BANKS-001` en `queue_order` **42**, desplazando +1 los diez
> `planned` que ocupaban 42..51.
>
> Fecha: 2026-07-31. **La inserción pasó por la herramienta de roadmap del repo, no por
> edición manual del JSON** (§B). **No se tocó ningún `status`.** No se añadió ni quitó
> ninguna arista `depends_on`. No se ejecutó el run insertado. No se tocó
> `tools/projector/project.mjs`, ni la consola, ni los tests, ni ningún código. **Git no se
> usó en ninguna forma que escriba.**
>
> Una decisión de forma se tomó y se declara: el `summary` entró **en una sola línea** (§C.3).

## Archivos escritos por este encargo, y ninguno más

| Archivo | Qué |
|---|---|
| `roadmap/roadmap.json` | el run nuevo y la renumeración +1 de los diez `planned` — **la única escritura sobre el canónico** |
| `.project/` (6 artefactos) | re-emitidos por el propio emisor del repo, automáticamente tras la escritura |
| `context/aiw-console/records/INSERCION-RUN-PROYECTOR-CASE-BANKS.md` | este record |

Ni un byte fuera de este repositorio. `aiw` y `cantu-studio` se **leyeron** (el endpoint compone
los ids externos del §10.d recorriendo los otros proyectos registrados); no se les escribió.
El respaldo que el motor toma por su cuenta vive en `os.tmpdir()`, fuera del repo:
`C:\Users\chris\AppData\Local\Temp\roadmap-backup-13188-roadmap.json`.

---

## BLOQUE A — ESTADO DE PARTIDA, MEDIDO ANTES DE ESCRIBIR

### A.1 Conteo y reparto sobre `roadmap/roadmap.json`

| Qué | Medido | Esperado por el ticket | ¿Cuadra? |
|---|---|---|---|
| Total de runs | **51** | 51 | sí |
| `completed` | **41** | 41 | sí |
| `planned` | **10** | 10 | sí |
| `active` | **0** | 0 | sí |
| Aristas `depends_on` | **26** | 26 | sí |
| Objetivos / fases | 2 / 19 | — | — |
| EOL del archivo | **LF** | — | — |

### A.2 La guarda que aborta: ningún run en `active`

Barrido completo del árbol: **cero** runs con `status: "active"`. La lista de ids en `active`
salió vacía. **No hay trabajo en vuelo**, así que la renumeración no desplaza números bajo los
pies de nadie. El encargo continúa.

### A.3 `git status --porcelain` al empezar

```
```

**Vacío**, sin una sola línea. El árbol estaba limpio.

### A.4 La invocación de la operación de inserción

Ver §B. Comando y cuerpo exactos en §B.2.

---

## BLOQUE B — EL MÉTODO: LA HERRAMIENTA, NO EL EDITOR

### B.1 Qué expone la herramienta, leído de su propio código

`tools/roadmap/` son **dos módulos y ningún ejecutable**:

| Archivo | Qué es |
|---|---|
| `tools/roadmap/roadmap-core.mjs` | el motor: `insertRun`, `applyOrder`, `checkInvariants`, `checkIdentityPreserved`, el serializador byte-exacto y la escritura atómica |
| `tools/roadmap/roadmap-plan.mjs` | la orquestación: `planEdit` (leer → parsear → pre-flight → mutar → post-check → remap → serializar) y `applyPlan` |

Ninguno de los dos parsea `argv`: `roadmap-plan.mjs:12-15` lo declara explícitamente —
«no console output, no process.exit, no argv parsing, no Git». **No hay CLI.** La operación
`insert` figura en `KNOWN_OPS` (`roadmap-plan.mjs:29`) y se despacha a `core.insertRun`
(`roadmap-plan.mjs:48-59`).

**La superficie invocable de esa herramienta es el endpoint de escritura de la consola global**,
`project-console/serve.mjs`, que importa exactamente esos dos módulos
(`project-console/serve.mjs:92-93`) y corre la secuencia canónica: `planEdit` en seco →
compare-and-swap contra el `baseline` → `applyPlan` con validador post-escritura y rollback →
re-emisión de `.project/`. La ruta está documentada en la cabecera del propio archivo
(`serve.mjs:17-22`) y se compone en `serve.mjs:124`:

```
POST /projects/<key>/__project-console/roadmap/edit
```

**Esa es la vía usada.** No se escribió ningún driver propio contra el core, no se abrió el JSON
en ningún editor, y no se tocó el archivo con ninguna otra herramienta.

### B.2 La invocación exacta

Arranque de la consola (el servidor no emite nada al arrancar; `writeProjectFolder` solo se
invoca desde las rutas de escritura):

```
PC_PORT=8799 node project-console/serve.mjs
```

Cuerpo del POST, idéntico en la pasada en seco (`apply: false`) y en la definitiva
(`apply: true` más el `baseline` devuelto por la primera):

```json
{
  "op": "insert",
  "args": {
    "runId": "RUN-CONSOLE-PROJECTOR-CASE-BANKS-001",
    "title": "Make the projector see AIW's evaluation case banks",
    "summary": "…",
    "fullDescription": "…",
    "status": "planned",
    "dependsOn": [],
    "before": "RUN-CONSOLE-RUN-CLASSIFICATION-FIELDS-001"
  },
  "apply": false
}
```

**Por qué `before` y no `--to-order 42`.** `insertRun` (`roadmap-core.mjs:602-674`) no acepta un
`queue_order` de destino: pide **exactamente un ancla** entre `after`, `before` y `endOfPhase`, y
de ese ancla deriva **las dos cosas a la vez** — la posición global y la fase. Con
`before: RUN-CONSOLE-RUN-CLASSIFICATION-FIELDS-001`, el `targetIndex` es el índice de ese run
(`roadmap-core.mjs:632`) → `queue_order` **42**, y el `targetPhase` es **su fase**
(`roadmap-core.mjs:631`). Es decir: **la fase se deriva de disco, no se teclea** — el requisito
B2 del encargo lo satisface el propio motor, no una elección de este encargo.

El texto largo **no se pasó por línea de comandos**: viaja en el cuerpo JSON del POST, sin
acortar ni reformatear (§C.4).

### B.3 Las guardas del motor que corrieron, y todas en verde

| Etapa | Qué comprueba | Resultado |
|---|---|---|
| pre-flight | el archivo ya cumple los invariantes antes de tocarlo | pasó (si no, `planEdit` se detiene en `stage: preflight`) |
| mutación | `insertRun`: id libre, patrón `RUN-…-NNN`, status válido, acoplamiento status/progress | 0 errores, **0 avisos** |
| post-check | `checkInvariants` + `checkIdentityPreserved` sobre el objeto mutado | pasó |
| compare-and-swap | el archivo debe ser byte-idéntico al que planeó la pasada en seco | `sha256:cc56458c5552154cd63a9fc94342b81ea91cebc4115da6e01cfc4ff2aab4535a` — coincidió |
| escritura | respaldo en tmpdir → temp → `fsync` → rename atómico | 119 079 bytes |
| validador post-escritura | re-lee el archivo ya renombrado, re-verifica invariantes con ids externos, y comprueba la forma `objectives → phases → runs` | `validatorRan: true`, **sin rollback** |

`baseline` tras la escritura:
`sha256:7de8d73e0f7853d71871442e0cdeb33aa021277e8e2b243dc0310946f49140d7`.

---

## BLOQUE C — EL RUN INSERTADO

### C.1 La guarda de B1, comprobada antes de derivar nada

| Qué | En disco | ¿Coincide con el ticket? |
|---|---|---|
| `run_id` ancla | `RUN-CONSOLE-RUN-CLASSIFICATION-FIELDS-001` | sí |
| su `queue_order` | **42** | sí |
| su `title` | `The five classification fields enter the roadmap schema, with derivation at read time and a minimal view` | **idéntico carácter a carácter** |

Ninguna de las dos comprobaciones falló, así que el encargo continuó.

### C.2 La fase, derivada del ancla

| Qué | Valor tal como consta en disco |
|---|---|
| `phase_id` | **`O4.P9`** |
| título de la fase | `Prior and cross-cutting work (outside the stage sequence)` |
| objetivo | `O4` — `Global Console` |

El run nuevo quedó dentro de `O4.P9`, verificado leyendo el archivo escrito.

### C.3 Campos del run, tal como quedaron

| Campo | Valor |
|---|---|
| `run_id` | `RUN-CONSOLE-PROJECTOR-CASE-BANKS-001` |
| `queue_order` | **42** |
| `title` | `Make the projector see AIW's evaluation case banks` (50 car.) |
| `status` | `planned` |
| `depends_on` | `[]` — **vacío**, ninguna arista añadida |
| fase | `O4.P9` (derivada, §C.2) |
| claves emitidas, en orden | `run_id, queue_order, title, summary, full_description, status, depends_on` |

**Decisión de forma que se declara: el `summary` entró en una sola línea.** El bloque del ticket
viene envuelto a cuatro líneas, como está envuelto todo el ticket a ~76 columnas. Se midió el
archivo antes de decidir: de los 51 runs preexistentes, **51 tienen el `summary` en una sola
línea y 0 llevan salto**, y lo mismo con `full_description` — 51 sin salto. El propio ticket
entrega el `full_description` (§C3) **sin envolver**, en una línea larga, lo que confirma que el
envuelto del `summary` es presentación del ticket y no contenido. Se insertó, por tanto:

```
The projector does not read objectives/qualification/ or objectives/queue-e7/, so AIW's evaluation case banks are invisible to every console. The convention that defines them is now published, which was the condition this repair was waiting on.
```

244 caracteres, ASCII puro. Si la cabina quiere los saltos literales, es un `set-text` de una
sola operación.

### C.4 La comprobación del `full_description`, carácter a carácter

El texto se reintrodujo **desde el ticket por segunda vez, de forma independiente**, y se comparó
contra lo que hay en disco:

| Qué | Canónico | `.project/roadmap.json` |
|---|---|---|
| `full_description === esperado` | **true** | **true** |
| Longitud | **2 046** = 2 046 | 2 046 = 2 046 |
| sha256 del campo | `88cdbf3dde0d07b12ff06ffa3a9e647f447bc681b7287a2985547782e6c0594e` | **idéntico** |
| Caracteres no-ASCII | **solo `—` (U+2014)** | igual |
| Mojibake (`â`) | **no** | no |

Los marcadores `<<<INICIO` / `FIN …>>>` **no** entraron. **El texto no se acortó ni se
reformateó.** El `title` (50 car.) y el `summary` (244 car.) se comprobaron igual: idénticos.

---

## BLOQUE D — EL DESPLAZAMIENTO, VERIFICADO RUN POR RUN

### D.1 La tabla real, medida por `run_id` sobre el archivo escrito

La tabla del ticket procede de una medición del 2026-07-30. **Se verificó antes de continuar y
coincide exactamente, run por run.** El `remap` que devolvió la pasada en seco y la medición
posterior sobre disco dan lo mismo:

| `run_id` | Antes | Después | ¿Esperado? |
|---|---|---|---|
| `RUN-CONSOLE-PROJECTOR-CASE-BANKS-001` | — (nuevo) | **42** | sí |
| `RUN-CONSOLE-RUN-CLASSIFICATION-FIELDS-001` | 42 | **43** | sí |
| `RUN-CONSOLE-CLASSIFICATION-PILOT-001` | 43 | **44** | sí |
| `RUN-CONSOLE-DIGEST-CABINA-001` | 44 | **45** | sí |
| `RUN-CONSOLE-PARIDAD-RENDER-CANTU-001` | 45 | **46** | sí |
| `RUN-CONSOLE-UI-UX-001` | 46 | **47** | sí |
| `RUN-CONSOLE-CANTU-CANONICAL-OUT-OF-AIW-001` | 47 | **48** | sí |
| `RUN-CONSOLE-CORTE-RETIRO-LOCAL-001` | 48 | **49** | sí |
| `RUN-CONSOLE-STALE-TEXTS-REPAIR-001` | 49 | **50** | sí |
| `RUN-CANTU-ROADMAP-PHASE-OBJECTIVE-OPS-001` | 50 | **51** | sí |
| `RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001` | 51 | **52** | sí |

**11 filas de remap, ni una más.** Los diez desplazados conservan su fase: `O4.P9` (6),
`O4.P5`, `O4.P8`, `O4.P7`, `O0.P3` (2) — ninguno cambió de fase ni de objetivo.

### D.2 Los 41 `completed`, intactos

Comparación campo a campo de los 51 runs preexistentes contra el archivo anterior
(`git show HEAD:roadmap/roadmap.json`, lectura pura):

| Grupo | Cuántos | Qué cambió |
|---|---|---|
| Runs **byte-idénticos**, incluida su fase | **41** | nada, ni el `queue_order` |
| Runs en que **solo** cambia `queue_order` | **10** | los diez `planned` de D.1 |
| Runs con cualquier otro cambio | **0** | — |

Los 41 byte-idénticos son exactamente los 41 `completed`. Ocupan 41 `queue_order` distintos,
**todos ≤ 41**, es decir el bloque 1..41 completo, igual que antes.

### D.3 La cola queda densa

| Qué | Valor |
|---|---|
| Total de runs | **52** |
| `queue_order` mínimo / máximo | **1 / 52** |
| Duplicados | **0** |
| Huecos | **0** — la serie es exactamente `1..52` |

El motor lo garantiza por construcción (`applyOrder` reasigna `index + 1` sobre el orden global)
y `checkInvariants` lo exige; se verificó igualmente sobre el archivo escrito.

---

## BLOQUE E — LAS ARISTAS NO SE MOVIERON

### E.1 y E.2 Conjunto de aristas, antes y después

Se construyó el conjunto de pares `dependiente <- dependencia` sobre el archivo anterior y sobre
el escrito, y se comparó:

| Qué | Valor |
|---|---|
| Aristas **antes** | **26** |
| Aristas **después** | **26** |
| Pares solo en «antes» | **0** |
| Pares solo en «después» | **0** |
| Conjuntos idénticos | **sí** |
| Runs cuyo `depends_on` cambió (comparado como JSON, por `run_id`) | **0 de 51** |

El total esperado por el ticket —26— **se verificó y cuadra**. Las aristas se declaran por
`run_id`, así que una renumeración no puede tocarlas; se comprobó en vez de suponerlo.

### E.3 El run nuevo entra sin aristas

`depends_on: []`. **No se le añadió ninguna.** El motor tampoco pudo inventarla: `insertRun`
copia el array que recibe y no deriva dependencias.

---

## BLOQUE F — EL DERIVADO

### F.1 Cómo se re-emitió

**No hizo falta un segundo comando: el propio endpoint de escritura re-emite `.project/` antes de
contestar** (`project-console/serve.mjs:550-564`), a través de `writeProjectFolder`, el emisor del
repo. La respuesta lo reporta:

```
reemit: {"ok": true, "files": 6, "layout": "repo_root"}
```

**Seis artefactos**, la emisión completa. El emisor es invocable fuera de la consola web —el
servidor se arranca con un comando y la ruta se llama con un POST—, así que el caso F3 (dejar el
derivado como está) **no aplicó**.

**Una segunda re-emisión, ya escrito este record**, para que el índice de documentación lo
incluya. Misma consola, la ruta de emisión explícita:

```
POST /projects/aiw-console/__project-console/project/emit
```

```json
{ "ok": true, "layout": "repo_root", "roadmap_model": "roadmap_tree_v1",
  "project_id": "aiw_console", "canonical": "roadmap/roadmap.json",
  "artifacts": 6, "skipped": [], "objectives": 2, "runs": 52, "committed": false }
```

Los seis artefactos, con sus bytes: `guardrails.json` 3 055 · `no_claims.json` 2 832 ·
`docs_index.json` 46 104 · `roadmap.json` 119 325 · `git_history.json` 44 299 ·
`snapshot.json` 124 338. **Ninguno saltado.** `committed: false` — el emisor no toca git.

### F.2 Canónico y derivado coinciden

| Qué | `roadmap/roadmap.json` | `.project/roadmap.json` | Esperado |
|---|---|---|---|
| Total de runs | **52** | **52** | 52 |
| `completed` | **41** | **41** | 41 |
| `planned` | **11** | **11** | 11 |
| `active` | **0** | **0** | 0 |

El run nuevo aparece en el derivado con `queue_order` 42, fase `O4.P9`, `status: planned`,
`depends_on: []` y el `full_description` con el mismo sha256 que el canónico (§C.4).

### F.3 El derivado venía staleado, y la re-emisión lo puso al día

Se declara porque cambia más archivos de los que esta inserción explica. `.project/` reflejaba un
estado anterior a varios encargos previos: la re-emisión incorporó **cinco records** que el índice
de documentación no tenía (`ALTA-RUN-UNIFICACION-SELECTOR-COLOR-CANTU`,
`DEFECTOS-CONSOLA-Y-ESPEJO`, `PICKER-PERSONALIZADO-Y-MEDICION-DE-HEX-EN-EL-COMPILADOR-CANTU`,
`REPARACION-ENUM-HEADER-Y-MEDICION-DE-CLASES-CANTU`,
`UNIFICACION-SELECTOR-COLOR-WEB-Y-COMPUERTA-DEL-COMPILADOR-CANTU`) y commits nuevos en
`git_history.json`. **Ese desfase es anterior a este encargo; la re-emisión lo cierra, no lo
causa.**

---

## BLOQUE G — LA SUITE

### G.1 `npm test`

| Qué | Valor |
|---|---|
| Total | **316** |
| Pasan | **316** |
| Fallan | **0** |
| Saltados / cancelados / todo | 0 / 0 / 0 |
| Duración | ~1,8 s |

**Verde.**

### G.2 Ningún test se puso rojo con 52

Como preveía el ticket, **no ocurrió**. Los tests que citan un total lo hacen contra el fixture
congelado del `#40` —«the frozen aiw_console folder through the shell hooks (2 objectives, 19
phases, 51 runs)»— que sigue diciendo 51 y sigue verde. **No quedó ninguna lectura viva que el
`#40` no congelara**: no hay hallazgo que reportar por esta vía.

### G.3 Una corrida completa no mueve `git status`

Corrida de cierre, con el record ya en disco:

```
--- ANTES DE npm test ---
 M .project/docs_index.json
 M .project/git_history.json
 M .project/guardrails.json
 M .project/no_claims.json
 M .project/roadmap.json
 M .project/snapshot.json
 M roadmap/roadmap.json
?? context/aiw-console/records/INSERCION-RUN-PROYECTOR-CASE-BANKS.md
--- DESPUES DE npm test ---
 M .project/docs_index.json
 M .project/git_history.json
 M .project/guardrails.json
 M .project/no_claims.json
 M .project/roadmap.json
 M .project/snapshot.json
 M roadmap/roadmap.json
?? context/aiw-console/records/INSERCION-RUN-PROYECTOR-CASE-BANKS.md
```

**Idénticas.** La suite no escribe en el árbol. (Una corrida anterior, antes de existir este
record, dio el mismo par sin la línea `??`.)

Los ocho archivos son exactamente los del cuadro de cabecera: el canónico, los seis derivados y
este record. **Nada más se movió.** El operador es el único que commitea.

---

## BLOQUE H — CIFRAS DEL ARCHIVO

| Qué | Antes | Después |
|---|---|---|
| Bytes | 116 443 | **119 079** (+2 636) |
| md5 | `41839f226c0b9c82e763f9ad37ecb44f` | **`ee10e3b2b276154b780800f6e88ac273`** |
| Objetivos / fases / runs | 2 / 19 / 51 | 2 / 19 / **52** |
| EOL | LF | **LF** (el serializador escribe con el EOL del propio archivo) |
| Caracteres no-ASCII en todo el archivo | 224 | **229** (+5: las cinco rayas `—` del texto nuevo) |

---

## BLOQUE I — NO-CLAIMS DE ESTE ENCARGO

- **La inserción pasó por la herramienta de roadmap del repo** —`tools/roadmap/roadmap-plan.mjs`
  sobre `tools/roadmap/roadmap-core.mjs`, a través del endpoint de escritura de
  `project-console/serve.mjs`—, **y NO por edición manual del JSON**. No se abrió el archivo en
  ningún editor, no se escribió ningún script propio que lo modificara, y no se tocó «solo un
  campo» por fuera. La renumeración la hizo `applyOrder` del core, no una mano.
- **No se ejecutó el run insertado.** Este encargo lo **crea**. No se midió qué rutas bajo
  `aiw/objectives/` lee el proyector hoy, no se contaron los casos de los dos bancos, y no se
  decidió entre los dos desenlaces que el propio texto del run plantea. Todo eso es el trabajo del
  run, y sigue pendiente. Las cifras que el `full_description` menciona —seis casos más un
  séptimo bajo `sandbox/`— entraron **como texto del ticket**, y el propio texto ordena
  verificarlas contra disco cuando el run se ejecute: **este encargo no las verificó**.
- **No se tocó `tools/projector/project.mjs`**, ni la consola, ni los tests, ni ningún otro
  código. El servidor se **arrancó** para usar su ruta de escritura y se detuvo; no se modificó.
- **No se cambió ningún `status`.** Los 41 `completed` de antes son los 41 de después; el run
  nuevo nace `planned`; no hay ni hubo ningún `active`.
- **No se añadió ni se quitó ninguna arista.** 26 antes, 26 después, mismos pares.
- **No se movió, borró ni renumeró ningún run** más allá del +1 que produce esta inserción: 41
  runs byte-idénticos, 10 con solo el `queue_order` cambiado, 0 con cualquier otro cambio.
- **No se escribió un byte fuera de este repositorio.** `aiw` y `cantu-studio` se leyeron para
  componer los ids externos del §10.d; no se les escribió. El respaldo del motor vive en
  `os.tmpdir()`.
- **No se usó git en ninguna forma que escriba.** Solo `git status --porcelain` y
  `git show HEAD:roadmap/roadmap.json`, ambos de lectura. **El operador es el único que commitea.**
- **No se afirma que el `summary` de una sola línea sea la única lectura posible del ticket.** Es
  la que casa con los 51 runs del archivo y con el formato del `full_description` del propio
  ticket, y se declara en §C.3 para que la cabina la revierta con un `set-text` si prefiere otra.
- **No se declara production readiness** de nada.
