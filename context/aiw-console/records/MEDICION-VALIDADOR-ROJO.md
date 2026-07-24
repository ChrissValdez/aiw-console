# MEDICIÓN — validador de Cantu en rojo tras la extracción de O0

Estado: MEDICIÓN, fechada **2026-07-24** (fecha leída del sistema). No es contrato
ni decisión. Solo mide y propone; **no arregla nada**. No se ejecutó el validador,
ni el builder, ni el proyector; no se ejecutó git en ninguna forma; no se modificó
ningún archivo de `cantu-studio`.

Alias: **CANTU-VALID** =
`projects/cantu-studio/tools/project-console/validate-project-console-state.mjs`;
**CANTU-BUILD** =
`projects/cantu-studio/tools/project-console/build-git-history-snapshot.mjs`;
**CANTU-ROADMAP** = `projects/cantu-studio/.aiw/roadmap/roadmap.json`;
**SNAPSHOT** = `projects/cantu-studio/.aiw/views/git_history.snapshot.json`.

Contexto: la extracción de O0 ([[MIGRACION-O0]]) movió 12 runs de CANTU al roadmap
propio de aiw-console. CANTU pasó de 8 objetivos / 65 runs a 7 / 53. Antes de la
extracción el validador pasaba; después arroja **dos** errores:

```
CANTU-ROADMAP run RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001
  depends on unknown run RUN-CANTU-ROADMAP-CONTENT-AUDIT-001
git_history.snapshot.json commit[442] run_id must be null or an explicit
  canonical Roadmap v3 run id
```

## Números clave (medidos, no estimados)

- **Commits del snapshot afectados: 1** (uno solo). El validador reporta uno y hay
  exactamente uno. Ver §2.
- **Otros sitios que comparten el supuesto "todo run_id vive en el roadmap local",
  además de las dos reglas rojas: 3** — 2 en el validador (degradan en silencio) y
  1 en el builder (degrada limpio a `null`). Ver §3.

---

## 1. Error 1 — la arista externa

### 1.1 La regla, citada por línea

`CANTU-VALID:1039-1048`. El conjunto de runs conocidos se construye SOLO con los
runs del roadmap local:

```
1039  const runsById = new Map(allRuns.map((run) => [run.run_id, run]));
1040  for (const run of allRuns) {
1041    for (const dependencyId of run.depends_on || []) {
1042      const dependency = runsById.get(dependencyId);
1043      if (!dependency) {
1044        fail(`${label} run ${run.run_id} depends on unknown run ${dependencyId}`);
1045      } else if (!(dependency.queue_order < run.queue_order)) {
1046        fail(`${label} run ${run.run_id} (queue_order ...) must not depend on ...`);
1047      }
1048    }
```

`allRuns` se llena recorriendo `roadmap.objectives[].phases[].runs[]`
(`CANTU-VALID:1003-1007`). No hay otra fuente. La entrada que dispara el fallo:
`RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` (CANTU, O2.P4,
`queue_order` 4) `depends_on` → `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`, que tras la
migración vive en CONSOLE (O0.P3) y ya no está en CANTU. Medida independiente:
es la **única** referencia no-resuelta de todo CANTU ([[MIGRACION-O0]] §4).

### 1.2 ¿Distingue "colgante" de "externo conocido"? ¿Puede?

**No distingue, y con lo que tiene no puede.** `runsById` solo contiene runs del
roadmap local (`:1039`); el validador no carga ningún otro proyecto. Para él las dos
situaciones son idénticas: `runsById.get(id)` devuelve `undefined`. No tiene forma
de saber si `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001` (a) no existe en ninguna parte
—colgante, malformado— o (b) existe en otro proyecto —dependencia externa legal—.

Esto coincide exactamente con la precisión de [[CONTRATO]] §10.d Regla 3
(CONTRATO.md:1043-1054): *"sin resolver" y "colgante" no son la misma afirmación, y
casi ningún consumidor puede distinguirlas. Quien carga UN proyecto no tiene cómo
saber si el id que no resuelve vive en otro proyecto o no existe en el mundo.* El
veredicto "colgante" solo lo puede emitir quien tiene cargados todos los proyectos.
El validador, cargando un solo roadmap, no está en esa posición — y aun así emite
rojo. El contrato lo llama por su nombre: *con un roadmap suelto, una entrada que no
resuelve es advertencia, nunca rojo* (CONTRATO.md:1050-1052).

### 1.3 ¿Error duro o hay mecanismo de warning? ¿Se usa?

Es **error duro**: `fail()` empuja a `errors` y el proceso sale con código 1
(`CANTU-VALID:16-18, 2010-2016`).

Existe un mecanismo de warning **pero está inerte**:

- `warn(message)` definido en `CANTU-VALID:20-22`, empuja a `warnings` (`:14`).
- `warnings` se imprime al final como "Roadmap rebase warnings (non-blocking)"
  (`:2039-2043`), sin afectar el exit code.
- **`warn()` no se invoca en ninguna línea del archivo** (verificado: la única
  aparición de `warn(` es su definición). El array `warnings` está siempre vacío.

Conclusión: **no hay ninguna regla vigente que use el camino de warning.** El
andamiaje existe (diseñado, según el nombre, para "roadmap rebase") pero nunca se
conectó. La opción (a) de abajo sería el **primer** uso real de `warn()`.

### 1.4 Opciones de arreglo (con costo, sin elegir)

**(a) Relajar la regla a warning cuando la referencia tiene forma de `run_id` válido
pero no resuelve localmente.**
- Qué toca: `CANTU-VALID:1043-1044` — cambiar `fail(...)` por `warn(...)` en la rama
  `if (!dependency)`. La rama `else if` de orden (`:1045-1046`) queda intacta porque
  solo corre cuando el run SÍ resuelve. Estrena el mecanismo de §1.3.
- ¿Es uno de los tres ROMPE del audit? **No.** Los tres ROMPE son `project_id !==
  "jame_system_dual"` (`CANTU-VALID:609`), `schema_version !==
  "jame.roadmap_v3.v0.2-progress"` (`CANTU-VALID:963-964`) y el anchor `"RUN-JAME-"`
  del builder (`CANTU-VALID:1665`) — [[CONTRATO]] §10.c (CONTRATO.md:703-709),
  [[AUDIT-CONSOLE-O4-PHASE0]] E.1/E.5. Esta regla de `depends_on` no es ninguno de
  los tres.
- Es lo que **manda el contrato**: [[CONTRATO]] §10.d Regla 3 exige justo esto —
  advertencia, nunca rojo, con un roadmap suelto (CONTRATO.md:1050-1052). Hoy el
  validador **viola** esa regla. Costo conceptual: bajo; es alinear con el contrato,
  no inventar política. Costo de implementación: una línea. Riesgo: pierde el rojo
  para el colgante genuino con un solo proyecto cargado — pero el contrato dice que
  ese rojo requiere el conjunto completo de proyectos, que el validador no tiene.
- Consumidores de la misma regla (misma línea): solo el validador. Ver §3 para los
  otros sitios que comparten el **supuesto** (no la línea).

**(b) Quitar la entrada `depends_on` del roadmap de Cantu.**
- Qué toca: **CANTU-ROADMAP** (dato), quitando `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`
  del `depends_on` de `RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001`.
- ¿Es uno de los tres ROMPE? No (toca dato, no una de las tres reglas de identidad).
- Costo: **destruye información verdadera.** La dependencia es real y se conservó a
  propósito en la migración como *el primer ejemplar real de la Regla 2*
  ([[MIGRACION-O0]] §5). [[CONTRATO]] §10.d Regla 3 paso 2 lo prohíbe explícitamente:
  *nunca ocultarlo, nunca omitirlo de la lista de dependencias, nunca renderizar el
  run como si esa dependencia no existiera* (CONTRATO.md:1034-1036). Además **toca
  `cantu-studio`, fuera del alcance de escritura** de este encargo.
- Consumidores afectados si se borra: todos los que leen `depends_on` (§3) verían el
  grafo mutilado; el run quedaría "sin prerequisito" cuando sí lo tiene.

**(c) Otra que el código sugiere — resolución global + declaración (Regla 3
completa).**
- El código ya tiene el molde: `runsById.get(id)?.status` con encadenamiento
  opcional aparece en `roadmapV3QueueGroupKey` (`CANTU-VALID:847`) y en el DFS de
  ciclos (`:1063`), que **no rompen** con ids externos. Una variante de (a) que
  además cargara el/los otros roadmaps podría clasificar externo vs colgante
  (Regla 2) en vez de solo declarar. Costo: alto — el validador hoy carga un solo
  proyecto; darle el conjunto completo es un cambio de arquitectura, no un parche.
  [[CONTRATO]] §10.d Regla 4 (CONTRATO.md:1056-1073) evaluó la forma calificada
  `{project, run_id}` y la **difirió** ("no compra nada hoy; cuesta migración en
  tres repos"). Por eso la salida barata y contractual es (a); (c) queda anotada.

---

## 2. Error 2 — `git_history.snapshot.json`

### 2.1 La regla, citada por línea

`CANTU-VALID:1617-1640`. Primero arma el conjunto de run_ids del roadmap local
(`:1617-1620`); luego valida cada commit y falla si su `run_id` no está en ese
conjunto:

```
1617  const roadmapV3HistoryRunIds = new Set();
1618  if (roadmapV3 && Array.isArray(roadmapV3.objectives)) {
1619    roadmapV3.objectives.forEach((objective) => (objective.phases || [])...run_id ...);
1620  }
...
1633  if (commit.run_id !== null && commit.run_id !== undefined) {
1634    if (typeof commit.run_id !== "string" || !roadmapV3HistoryRunIds.has(commit.run_id)) {
1635      fail(`${commitLabel} run_id must be null or an explicit canonical Roadmap v3 run id`);
1636    } else {
1637      historyAssociated += 1;
1638    }
1639  }
```

Es `forEach` (`:1622`), no un bucle que corta: **reporta todos los commits que
fallen**, no solo el primero. Que se reporte uno solo significa que **solo hay uno**.

### 2.2 ¿Qué es `commit[442]`? ¿Qué run_id lleva?

`commit[442]` (índice 0-based; el commit 443.º del array) es:

```
sha        0809ec40  (full_sha 0809ec401214a3e4c17a9e8c121eb6276a1cb4a4)
branch     jame-parallel-audit-001
date       2026-07-09T17:37:30-06:00
subject    docs(inventory): add documentation inventory baseline
run_id     RUN-JAME-PROJECT-CONSOLE-ROADMAP-V3-PROTOTYPE-001
```

Índice verificado contando `full_sha` en el snapshot: hasta esa línea inclusive hay
443 commits → índice 0-based **442**. ✓

El `run_id` es `RUN-JAME-PROJECT-CONSOLE-ROADMAP-V3-PROTOTYPE-001`, que es uno de
los **12 runs migrados** (CONSOLE, O0.P2, nuevo `queue_order` 3 — [[MIGRACION-O0]]
§3.a). Ya no está en CANTU, así que `roadmapV3HistoryRunIds.has(...)` da falso.

Detalle revelador: el `subject`/`body` de ese commit habla de
`RUN-JAME-DOCUMENTATION-INVENTORY-001` y solo menciona
`RUN-JAME-PROJECT-CONSOLE-ROADMAP-V3-PROTOTYPE-001` de pasada ("deja el run activo …
untouched"). El builder lo asoció a PROTOTYPE-001 porque, cuando se generó el
snapshot, ese era el único de los dos mencionados que existía en el roadmap. Ver §2.4.

### 2.3 ¿Cuántos commits afectados? — **1**

El snapshot tiene **771 commits**; solo **4** llevan `run_id` no-nulo. Medido cruzando
cada uno contra el roadmap CANTU de hoy:

| commit line | run_id | ¿en CANTU hoy? | veredicto |
|---|---|---|---|
| 5292 | RUN-JAME-PROJECT-CONSOLE-DOCS-V3-001 | sí (q48) | OK |
| 5304 | RUN-JAME-COMPONENT-DOC-SINGLE-SOURCE-CONTRACT-001 | sí (q3) | OK |
| 5316 | RUN-JAME-DOCUMENTATION-CANONICAL-MODEL-001 | sí (q2) | OK |
| 5328 (commit[442]) | RUN-JAME-PROJECT-CONSOLE-ROADMAP-V3-PROTOTYPE-001 | **no (migrado)** | **FALLA** |

Los otros 3 run_ids asociados NO son parte de los 12 migrados (siguen en CANTU), así
que siguen resolviendo. **Solo 1 de los 771 commits referencia un run migrado.** El
arreglo es **puntual, no sistémico** — para este snapshot.

### 2.4 Qué produciría el builder HOY (leído, no ejecutado)

`CANTU-BUILD` asigna `run_id` así:

- `loadRoadmapRunIds()` (`:83-99`) lee el roadmap local read-only y arma el `Set` de
  run_ids **vigentes**.
- `deriveRunId(subject, body, runIds)` (`:103-108`):
  ```
  105  const mentions = ...text.match(/RUN-JAME-[A-Z0-9-]+[A-Z0-9]/g)...
  106  const verified = mentions.filter((id) => runIds.has(id));
  107  return verified.length === 1 ? verified[0] : null;
  ```
  Extrae menciones `RUN-JAME-…`, las filtra contra el roadmap vigente, y asocia
  **solo si queda exactamente una verificada**; si no, `null`.

Para `commit[442]` hoy, las menciones son `RUN-JAME-DOCUMENTATION-INVENTORY-001` y
`RUN-JAME-PROJECT-CONSOLE-ROADMAP-V3-PROTOTYPE-001`. Contra el CANTU de hoy:
INVENTORY-001 nunca estuvo en el v3; PROTOTYPE-001 se migró a CONSOLE. **Ninguna de
las dos verifica → `verified = [] → null`.** El builder emitiría `null`, no el id que
hoy falla. Los otros 3 commits siguen verificando (sus ids siguen en CANTU) → se
conservan asociados.

### 2.5 ¿Regenerar bastaría? — **Sí**

Regenerar el snapshot lo arregla: `deriveRunId` re-verifica contra el roadmap
vigente, y como PROTOTYPE-001 ya no está en CANTU, `commit[442].run_id` cae a `null`
(un valor que la regla `:1633-1635` acepta), mientras los otros 3 quedan intactos.
El snapshot es, por diseño, una **vista generada read-only** cuya ausencia se permite
y que se regenera sola en el próximo arranque de `serve-project-console.mjs`
(`CANTU-VALID:1556-1566`). El error existe solo porque el snapshot en disco es
**anterior** a la migración.

Salvedad de alcance: regenerar exige correr el builder / el server, y el builder
corre git (`CANTU-BUILD:61-66, 176-178`). Por eso **este encargo no regenera**
(prohibido ejecutar builder y git). La medición es: regenerar es suficiente y
auto-sana; no hace falta tocar la regla del validador para Error 2.

---

## 3. Pregunta transversal — otras reglas con el mismo supuesto

Supuesto: *todo `run_id` mencionado en cualquier parte vive en el roadmap local.*
Enumerado sobre validador + builder (no "no parece" — sitios citados):

**Reglas DURAS que ya producen rojo (las dos de este record):**

1. `CANTU-VALID:1042-1044` — existencia de `depends_on` contra `runsById` (local).
   Error 1. Falla duro ante referencia externa.
2. `CANTU-VALID:1633-1635` — `commit.run_id` contra `roadmapV3HistoryRunIds`
   (local). Error 2. Falla duro ante run migrado.

**Sitios que comparten el supuesto pero HOY degradan en silencio (no rojo) — 3:**

3. `CANTU-VALID:847` — `roadmapV3QueueGroupKey`:
   `(run.depends_on || []).every((id) => runsById.get(id)?.status === "completed")`.
   Un `depends_on` externo/no-resuelto da `undefined?.status` → no es `"completed"` →
   el run se agrupa en `"later"` en vez de `"ready_next"`, **para siempre**, aunque su
   prerequisito real (en otro proyecto) esté completado. No falla; **coloca mal**.
   Es justo el `RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` de Error 1: aun
   relajando la regla dura (opción a), este seguiría mal-agrupado. Viola §20/Regla 3
   (renderiza sin declarar el "sin resolver").
4. `CANTU-VALID:1059-1069` — DFS de detección de ciclos:
   `runsById.get(dependencyId)?.depends_on || []`. El encadenamiento opcional salta
   los ids externos, así que **no detecta ciclos que crucen la frontera** entre
   proyectos. Hoy benigno; degrada en silencio.
5. `CANTU-BUILD:103-108` — `deriveRunId`. Comparte el supuesto (filtra menciones
   contra el roadmap local) pero lo maneja **limpio**: devuelve `null` para lo no
   local, sin error. Es el mismo supuesto sin la fragilidad. **Nota adicional**: el
   regex `:105` solo matchea `RUN-JAME-…`, nunca `RUN-CANTU-…`, así que los 8 ids
   `RUN-CANTU-` migrados (y cualquier `RUN-CANTU-` en general) **jamás** se asocian —
   punto ciego preexistente, independiente de la migración
   ([[AUDIT-CONSOLE-O4-PHASE0]] E.1).

**Espejos fuera de alcance (renderer, no validador/builder), anotados no medidos a
fondo:** `docs/project-console/assets/project-console.js` repite el patrón en
`:3137` y `:3545` (readiness), `:3341` (lista de "blocking" — **filtra** con
`(dep) => dep && ...`, así que una dependencia externa **desaparece** de la lista, un
§20/Regla-3 en el consumidor visible), `:3670-3672` (botón "run #N" en History) y
`:3991/:4063` (sección Dependencies del Run Detail). Comparten el supuesto; su
degradación es de render, no del exit code del validador.

**Lectura para la coexistencia (tramos 4–7):** cuando CANTU tenga a la vez su
roadmap y una segunda carpeta, las aristas entre proyectos se multiplican. Las dos
reglas duras (1, 2) volverán a ponerse rojas; los tres sitios blandos (3, 4, 5)
seguirán colocando mal o callando. Parchear solo la regla 1 dejaría vivos 3, 4 y el
espejo `:3341`. El supuesto es uno; los sitios son cinco (+ espejos). El contrato ya
escribió la salida entera en §10.d Reglas 2-3: resolver global, declarar lo no
resuelto, y con un roadmap suelto **advertir, nunca enrojecer**.

---

## 4. Alcance tocado y no tocado

- **Escrito:** solo este record.
- **Leído read-only:** CANTU-VALID, CANTU-BUILD, CANTU-ROADMAP, SNAPSHOT,
  [[CONTRATO]], [[MIGRACION-O0]], [[AUDIT-CONSOLE-O4-PHASE0]].
- **No tocado:** ningún archivo de `cantu-studio`; validador, builder, snapshot,
  roadmap; `CONTRATO.md`, `DECISIONES.md`, ningún record existente. **No se ejecutó
  el validador, ni el builder, ni el proyector. No se ejecutó git en ninguna forma.**
- **No se eligió** ninguna opción de arreglo. Este record mide y propone.

Criterio de borrado: N/A — registro de una medición ejecutada.
