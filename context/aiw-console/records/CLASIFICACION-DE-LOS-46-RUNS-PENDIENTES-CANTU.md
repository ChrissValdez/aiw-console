# Clasificación de los 46 runs pendientes — `cantu-studio`

**Encargo de taller.** Transcribir al canónico de `cantu-studio` la clasificación que el
operador decidió por grupos, **en una sola operación atómica**.

> **Este encargo NO decidió nada.** Los dieciocho juicios son del operador y llegaron en el
> ticket. El taller derivó, verificó, escribió una vez y midió. **No se cambió, ni se
> propuso cambiar, ningún valor de clasificación.**
>
> **Ningún `run_id` se tecleó.** Los 46 se derivaron por `queue_order` con una guarda de
> título que aborta. Ninguna guarda saltó.
>
> **Una sola escritura**, vía `batch` con las 46 sub-ops. **Un solo archivo tocado en
> `cantu-studio`**: el canónico.
>
> **Todas las cifras son una MEDICIÓN FECHADA DEL 2026-08-01**, no un estado permanente.
> Las del ticket —46, 63, 17, y cada cifra de `external_effects`— se trataron como valores
> **a verificar, no a creer**.
>
> **No se ejecutó Git en ninguna forma.** No se levantó ningún servidor. **No se corrió
> ninguna suite**, ni de `cantu-studio` ni de `aiw-console` (§10.3).

Este record es el número **93** en `context/aiw-console/records/`: había **92** antes de
escribirlo, y `CLASIFICACION-DE-LOS-46-RUNS-PENDIENTES-CANTU.md` no colisiona con ninguno
—los vecinos temáticos son `CLASIFICACION-MOTOR.md`, `CLASIFICACION-EMISOR-Y-CONSOLA.md`,
`CLASIFICACION-CARE-BUDGET.md` y los dos que este encargo leyó enteros,
`FAMILIAS-DE-RUNS-PENDIENTES-CANTU.md` y `TOLERANCIA-DE-CLASIFICACION-EN-CANTU.md`—.

Ruta base de los caminos relativos: `projects/cantu-studio`, salvo donde se indique
`projects/aiw-console`.

---

## 1. La lista de campos, derivada del motor · y las tres veces que el motor mandó

Derivada de `aiw-console/tools/classification/classification.mjs:55-62`
(`CLASSIFICATION_STORED_FIELDS`) y `aiw-console/tools/roadmap/roadmap-core.mjs:90-101`
(`RUN_OPTIONAL_FIELDS`). **Ejecutada, no leída:** los arrays se imprimieron desde el módulo
importado.

```
STORED FIELDS per the engine: correctness_model, work_type, blast_radius,
                              failure_surfaces, external_effects, classified_at
severity/closure_mode en esa lista: false
```

**Los seis del ticket son los seis del motor.** Esta vez coinciden, a diferencia de lo que
midió `TOLERANCIA-DE-CLASIFICACION-EN-CANTU.md` §1 sobre su propio ticket. `severity` y
`closure_mode` **no se escribieron**, y se verificó que no aparecen en el canónico después
(§7.4).

**Pero el motor sí mandó en tres puntos, y los tres se declaran:**

### 1.1 — Una lista `external_effects` vacía se almacena como AUSENCIA, no como `[]`

`setClassification` (`roadmap-core.mjs:1256-1272`), verbatim: *«An empty array and an absent
key mean the same thing to the derivation, so an empty list is stored as ABSENCE rather than
as `[]`: one shape on disk for one meaning»*.

El ticket dice «el resto va **array vacío**». **Se pasó el array vacío explícito en las 38
sub-ops** —la intención viaja en la petición— y **el motor lo normalizó a ausencia de la
clave**. Consecuencia medida en disco: **38 runs llevan cinco campos y 8 llevan seis**, no
46 × 6. La derivación no distingue los dos casos (`CLOSURE_MODE_DERIVATION.guard.absent_input:
"empty"`), así que ningún valor derivado cambia por esto.

| Campo | Runs que lo llevan en disco |
|---|---|
| `correctness_model`, `work_type`, `blast_radius`, `failure_surfaces`, `classified_at` | **46** cada uno |
| `external_effects` | **8** |

Total de claves añadidas: **238**.

### 1.2 — `classified_at` no es argumento: lo escribe el motor, y el plan no lo relaya

`roadmap-plan.mjs:106-120`, verbatim: *«`classified_at` is deliberately NOT relayed: the core
writes the mark itself, so the console cannot type an instant and no request body can carry
one»*. El núcleo acepta un `opts.now` (`roadmap-core.mjs:1301`), **pero la capa de plan no lo
pasa**, que es justamente su decisión de diseño.

El operador pide **un mismo instante para los 46**. Las dos exigencias se cruzan: cada sub-op
llama a `new Date().toISOString()` por su cuenta, y un `batch` de 46 puede cruzar la frontera
del milisegundo. **Medido sobre copia, 12 planes: 7 salieron con un instante único y 5 se
partieron en dos.**

**Cómo se resolvió, y es lo que hay que saber para releer este record:** `planEdit` **no
escribe nada** —lo dice su contrato y lo confirma el barrido de mtime—, así que se planificó
repetidamente contra el canónico y **se descartaron los planes cuyos 46 marcadores no
coincidían**, hasta uno que estampó un solo instante. **Se aceptó en el intento 6; se
descartaron 5, ninguno escrito.** El instante escrito es el instante real de ejecución de ese
plan, no un valor tecleado: **`2026-08-01T05:45:24.479Z`**, idéntico en los 46.

**Lo que NO se hizo:** llamar a `core.setClassification` con `now` por debajo de la capa de
plan. Habría dado el instante único de una sentada, pero saltándose el `batch` que el
criterio 2 exige y una decisión deliberada del motor. Se prefirió el camino del motor.

### 1.3 — El instante es UTC y de esta escritura

`2026-08-01T05:45:24.479Z`, ISO-8601 UTC, el que el motor estampó en el plan aceptado.

---

## 2. Los 46, verificados antes de tocar nada

### 2.1 — El universo

```bash
node -e "const r=require('./.aiw/roadmap/roadmap.json'); ..."
```

| Medida | Ticket (a verificar) | **Medido en disco** | ¿Coincide? |
|---|---|---|---|
| Objetivos | — | **7** | — |
| Fases | — | **28** | — |
| Runs | 63 | **63** | ✔ |
| `completed` | 17 | **17** | ✔ |
| `planned` | 46 | **46** | ✔ |
| `active` / `blocked` | — | **0 / 0** | — |
| `queue_order` | denso | **1…63, único y contiguo** | ✔ |
| Runs con cualquiera de los seis campos | 0 | **0** | ✔ |

**Las tres cifras del ticket se sostienen**, y coinciden con lo que midió el record de
familias.

### 2.2 — La tabla de dieciocho grupos cubre los 46 exactamente

Comprobado por conjuntos, no a ojo: la unión de los `queue_order` de los dieciocho grupos
frente al conjunto de los no-`completed`.

| Comprobación | Resultado |
|---|---|
| `queue_order` repetido en la tabla | **0** |
| Pendiente ausente de la tabla | **0** |
| `queue_order` de la tabla que no está pendiente | **0** |
| Suma de las filas | 15+4+1+1+3+2+3+2+1+4+1+1+1+1+2+2+1+1 = **46** ✔ |

El 40 —`RUN-JAME-MATHLIVE-INTEGRATION-READINESS-001`, `completed`— es el hueco de la banda
17–63, y la tabla no lo nombra. Correcto.

### 2.3 — Derivación por `queue_order` con guarda de título

**Ningún `run_id` se tecleó en ningún punto del encargo.** Cada sub-op recibió el `run_id`
que salió de buscar su `queue_order` en el árbol. Antes de emitir la sub-op, cuatro guardas
que **abortan**, nunca corrigen por parecido:

1. el `queue_order` existe y es único;
2. el título **encaja con la descripción del grupo**, por expresión regular escrita desde esa
   descripción (p. ej. G2 → `/^Verify the .+ component packets$/`, G10 → `/^(Rename|Sweep) /`);
3. el `status` es `planned`;
4. el run **no lleva ya** ninguno de los seis campos.

**Ninguna guarda saltó.** Las 46 derivaciones pasaron las cuatro.

---

## 3. Legalidad, comprobada sobre la tabla ANTES de entregarla al motor

Las combinaciones se leyeron del motor (`buildClassificationTaxonomy().illegal_combinations`),
no del ticket:

| Combinación | Quién la aplica | ¿Alguno de los 18 grupos la cruza? |
|---|---|---|
| `SPECIFIED` + `FOUNDATIONAL` | `stored_field_invariant` | **No** |
| `FOUNDATIONAL` + `LOUD` | `stored_field_invariant` | **No** |
| `JUDGED_*` + `closure_mode: UNATTENDED` | `derivation_property` | **No** (ejecutada la derivación, grupo a grupo) |
| Token fuera de vocabulario cerrado | motor | **No**, los 72 tokens de la tabla están dentro |

Los cuatro grupos `FOUNDATIONAL` —G3, G6, G9, G13— son los cuatro `JUDGED_DEFINES` y los
cuatro `VISIBLE`. El único `LOUD` —G12— es `FUNCTIONAL`. **El motor no rechazó nada**: el
plan salió `stage=ok` a la primera y sin avisos.

---

## 4. LA TABLA DE DERIVACIÓN — lo que el operador verifica contra la suya

**Sección propia, porque es el criterio 6.** `severity` y `closure_mode` **no están en
disco**: se derivan al leer. Los valores de abajo se produjeron ejecutando
`deriveSeverity()` y `deriveClosureMode()` del motor sobre los valores escritos, no
transcribiendo una tabla.

### 4.1 — Por grupo

`sev` = `work_type` × `blast_radius`, ajustado por `failure_surfaces` (`LOUD` −1, `VISIBLE` 0,
`SILENT` +1, saturando). `closure` = precedencia por `correctness_model` (+ `severity` en la
rama `SPECIFIED`), y después la guarda de `external_effects`, que **sólo sube**.

| Grupo | `queue_order` | correctness | work_type | blast_radius | surfaces | n | **`severity`** | **`closure_mode`** |
|---|---|---|---|---|---|---|---|---|
| **G1** | 18–32 | JUDGED_DEFINES | FUNCTIONAL | ADJACENT | VISIBLE | 15 | **MODERATE** | **ATTENDED** |
| **G2** | 35–38 | SPECIFIED | FUNCTIONAL | ADJACENT | SILENT | 4 | **MAJOR** | **SEMI_ATTENDED** |
| **G3** | 33 | JUDGED_DEFINES | FOUNDATIONAL | SYSTEMIC | VISIBLE | 1 | **CRITICAL** | **ATTENDED** |
| **G4** | 34 | SPECIFIED | FUNCTIONAL | SYSTEMIC | VISIBLE | 1 | **MAJOR** | **SEMI_ATTENDED** |
| **G5** | 39, 41, 48 | JUDGED_ACCEPTS | FUNCTIONAL | SYSTEMIC | SILENT | 3 | **CRITICAL** | **SEMI_ATTENDED** |
| **G6** | 51, 52 | JUDGED_DEFINES | FOUNDATIONAL | SYSTEMIC | VISIBLE | 2 | **CRITICAL** | **ATTENDED** |
| **G7** | 50, 53, 54 | SPECIFIED | FUNCTIONAL | ADJACENT | VISIBLE | 3 | **MODERATE** | **UNATTENDED** |
| **G8** | 55, 56 | SPECIFIED | FUNCTIONAL | SYSTEMIC | VISIBLE | 2 | **MAJOR** | **SEMI_ATTENDED** |
| **G9** | 57 | JUDGED_DEFINES | FOUNDATIONAL | PROJECT_SHAPE | VISIBLE | 1 | **CRITICAL** | **ATTENDED** |
| **G10** | 60–63 | SPECIFIED | FUNCTIONAL | SYSTEMIC | SILENT | 4 | **CRITICAL** | **SEMI_ATTENDED** |
| **G11** | 17 | JUDGED_ACCEPTS | FUNCTIONAL | SYSTEMIC | SILENT | 1 | **CRITICAL** | **SEMI_ATTENDED** |
| **G12** | 59 | SPECIFIED | FUNCTIONAL | SYSTEMIC | LOUD | 1 | **MODERATE** | **SEMI_ATTENDED** ← subido |
| **G13** | 42 | JUDGED_DEFINES | FOUNDATIONAL | SYSTEMIC | VISIBLE | 1 | **CRITICAL** | **ATTENDED** |
| **G14** | 44 | SPECIFIED | FUNCTIONAL | SYSTEMIC | VISIBLE | 1 | **MAJOR** | **SEMI_ATTENDED** |
| **G15** | 43, 45 | SPECIFIED | FUNCTIONAL | ADJACENT | VISIBLE | 2 | **MODERATE** | **UNATTENDED** |
| **G16** | 46, 47 | JUDGED_DEFINES | FUNCTIONAL | PROJECT_SHAPE | SILENT | 2 | **CRITICAL** | **ATTENDED** |
| **G17** | 49 | JUDGED_DEFINES | FUNCTIONAL | SYSTEMIC | VISIBLE | 1 | **MAJOR** | **ATTENDED** |
| **G18** | 58 | SPECIFIED | FUNCTIONAL | ADJACENT | VISIBLE | 1 | **MODERATE** | **UNATTENDED** |

### 4.2 — Por run, los 46

| `q` | Grupo | `run_id` | `severity` | `closure_mode` | `ee` |
|---|---|---|---|---|---|
| 17 | G11 | `RUN-CANTU-DOCUMENTATION-DEEP-AUDIT-001` | CRITICAL | SEMI_ATTENDED | — |
| 18 | G1 | `RUN-JAME-WEB-LIST-REVALIDATION-001` | MODERATE | ATTENDED | — |
| 19 | G1 | `RUN-JAME-WEB-ICONLIST-REVALIDATION-001` | MODERATE | ATTENDED | — |
| 20 | G1 | `RUN-JAME-WEB-CARD-REVALIDATION-001` | MODERATE | ATTENDED | — |
| 21 | G1 | `RUN-JAME-WEB-VIDEO-REVALIDATION-001` | MODERATE | ATTENDED | — |
| 22 | G1 | `RUN-JAME-WEB-NARRATIVE-REPAIR-001` | MODERATE | ATTENDED | — |
| 23 | G1 | `RUN-JAME-WEB-CALLOUT-REPAIR-001` | MODERATE | ATTENDED | — |
| 24 | G1 | `RUN-JAME-WEB-DETAILS-REPAIR-001` | MODERATE | ATTENDED | — |
| 25 | G1 | `RUN-JAME-WEB-ARITHMETIC-AUDIT-AND-REPAIR-001` | MODERATE | ATTENDED | — |
| 26 | G1 | `RUN-JAME-RULE-COMPONENT-REPAIR-AND-ACTIVATION-001` | MODERATE | ATTENDED | — |
| 27 | G1 | `RUN-JAME-WEB-SPLIT-SCOPE-AND-REPAIR-001` | MODERATE | ATTENDED | — |
| 28 | G1 | `RUN-JAME-WEB-TABLE-AUDIT-AND-REPAIR-001` | MODERATE | ATTENDED | — |
| 29 | G1 | `RUN-JAME-WEB-CONCEPTGRID-AUDIT-AND-REPAIR-001` | MODERATE | ATTENDED | — |
| 30 | G1 | `RUN-JAME-WEB-HIERARCHY-AUDIT-AND-REPAIR-001` | MODERATE | ATTENDED | — |
| 31 | G1 | `RUN-JAME-WEB-TIMELINE-AUDIT-AND-REPAIR-001` | MODERATE | ATTENDED | — |
| 32 | G1 | `RUN-JAME-WEB-VISUAL-AUDIT-AND-REPAIR-001` | MODERATE | ATTENDED | — |
| 33 | G3 | `RUN-CANTU-COMPONENT-GUIDE-PACKET-WIRING-001` | CRITICAL | ATTENDED | **3** |
| 34 | G4 | `RUN-CANTU-COMPONENT-GUIDE-CONTENT-001` | MAJOR | SEMI_ATTENDED | — |
| 35 | G2 | `RUN-CANTU-WEB-PACKET-VERIFICATION-BATCH-001` | MAJOR | SEMI_ATTENDED | — |
| 36 | G2 | `RUN-CANTU-WEB-PACKET-VERIFICATION-BATCH-002` | MAJOR | SEMI_ATTENDED | — |
| 37 | G2 | `RUN-CANTU-WEB-PACKET-VERIFICATION-BATCH-003` | MAJOR | SEMI_ATTENDED | — |
| 38 | G2 | `RUN-CANTU-WEB-PACKET-VERIFICATION-BATCH-004` | MAJOR | SEMI_ATTENDED | — |
| 39 | G5 | `RUN-JAME-WEB-READINESS-EVIDENCE-001` | CRITICAL | SEMI_ATTENDED | — |
| 41 | G5 | `RUN-JAME-FORMULA-INSERTER-INTEGRATION-001` | CRITICAL | SEMI_ATTENDED | — |
| 42 | G13 | `RUN-CANTU-SLIDE-GRID-SYSTEM-001` | CRITICAL | ATTENDED | — |
| 43 | G15 | `RUN-JAME-SLIDE-ARCHITECTURE-BASELINE-001` | MODERATE | UNATTENDED | — |
| 44 | G14 | `RUN-JAME-SLIDE-SANDBOX-PARITY-001` | MAJOR | SEMI_ATTENDED | — |
| 45 | G15 | `RUN-CANTU-SLIDE-COMPONENT-GUIDE-001` | MODERATE | UNATTENDED | — |
| 46 | G16 | `RUN-JAME-SLIDE-BOUNDED-RUN-PLAN-001` | CRITICAL | ATTENDED | **1** |
| 47 | G16 | `RUN-JAME-SLIDE-FIRST-BOUNDED-COMPONENT-BATCH-001` | CRITICAL | ATTENDED | — |
| 48 | G5 | `RUN-JAME-SLIDE-READINESS-EVIDENCE-001` | CRITICAL | SEMI_ATTENDED | — |
| 49 | G17 | `RUN-JAME-AUTHORING-WORKSPACE-UX-AUDIT-001` | MAJOR | ATTENDED | — |
| 50 | G7 | `RUN-JAME-HTML-PAYLOAD-MEASUREMENT-001` | MODERATE | UNATTENDED | — |
| 51 | G6 | `RUN-JAME-ASSET-REGISTRY-DESIGN-001` | CRITICAL | ATTENDED | — |
| 52 | G6 | `RUN-JAME-CTX-ASSETS-CONTRACT-001` | CRITICAL | ATTENDED | — |
| 53 | G7 | `RUN-JAME-RENDERER-ASSET-INTEGRATION-001` | MODERATE | UNATTENDED | — |
| 54 | G7 | `RUN-JAME-ASSET-DEDUP-EQUIVALENCE-VALIDATION-001` | MODERATE | UNATTENDED | — |
| 55 | G8 | `RUN-JAME-PRODUCTION-LESSON-VALIDATION-001` | MAJOR | SEMI_ATTENDED | — |
| 56 | G8 | `RUN-JAME-PRODUCTION-EXPORT-FLOW-001` | MAJOR | SEMI_ATTENDED | **2** |
| 57 | G9 | `RUN-JAME-HOSTING-DEPLOYMENT-PLAN-001` | CRITICAL | ATTENDED | — |
| 58 | G18 | `RUN-JAME-PROJECT-CONSOLE-DOCS-V3-001` | MODERATE | UNATTENDED | — |
| 59 | G12 | `RUN-CANTU-DOCUMENTATION-CORPUS-CLEANUP-001` | MODERATE | **SEMI_ATTENDED** ← subido de UNATTENDED | **2** |
| 60 | G10 | `RUN-CANTU-INTERNAL-CODE-RENAME-001` | CRITICAL | SEMI_ATTENDED | **2** |
| 61 | G10 | `RUN-CANTU-DOCS-DIRECTORY-RENAME-001` | CRITICAL | SEMI_ATTENDED | **2** |
| 62 | G10 | `RUN-CANTU-RUNTIME-JAME-CLASS-RENAME-001` | CRITICAL | SEMI_ATTENDED | **2** |
| 63 | G10 | `RUN-CANTU-RUNTIME-J-NAMESPACE-RENAME-001` | CRITICAL | SEMI_ATTENDED | **1** |

### 4.3 — Totales

| `severity` | Runs | | `closure_mode` | Runs |
|---|---|---|---|---|
| CRITICAL | **15** | | ATTENDED | **23** |
| MAJOR | **9** | | SEMI_ATTENDED | **17** |
| MODERATE | **22** | | UNATTENDED | **6** |
| MINOR | 0 | | | |
| **Total** | **46** | | **Total** | **46** |

Cruce completo: MODERATE/ATTENDED 15 · CRITICAL/SEMI_ATTENDED 8 · MAJOR/SEMI_ATTENDED 8 ·
CRITICAL/ATTENDED 7 · MODERATE/UNATTENDED 6 · MAJOR/ATTENDED 1 · MODERATE/SEMI_ATTENDED 1.

### 4.4 — La guarda de `external_effects` subió el modo en UNO de los ocho, no en los ocho

**El ticket esperaba que subiera en los ocho. La medición dice uno.** Y el motivo no es un
defecto: la guarda es `direction: "raise_only"` con `minimum: SEMI_ATTENDED`
(`classification.mjs:117-125`), así que **sólo mueve a un run que estuviera por debajo del
mínimo**, y `UNATTENDED` es el único token por debajo.

| Run | `closure` sin `ee` | `closure` con `ee` | ¿Subió? |
|---|---|---|---|
| **59** | UNATTENDED | **SEMI_ATTENDED** | **SÍ** |
| 33 | ATTENDED | ATTENDED | no — ya por encima del mínimo |
| 46 | ATTENDED | ATTENDED | no — ya por encima |
| 56 | SEMI_ATTENDED | SEMI_ATTENDED | no — ya en el mínimo |
| 60, 61, 62, 63 | SEMI_ATTENDED | SEMI_ATTENDED | no — ya en el mínimo |

Dicho de otro modo: siete de los ocho ya estaban atendidos por su propio juicio, y la guarda
no tenía nada que subir. **El único run al que `external_effects` le cambió el modo es el 59,
el que borra y mueve documentos** — que es exactamente el caso para el que la guarda existe.

---

## 5. `external_effects`: los ocho, con la cifra medida

En inglés ASCII, que es el idioma del canónico. **Cada cifra se re-midió en disco**; donde el
record de familias y el disco discrepan, **gana el disco** y la discrepancia se declara en §8.
Ninguna entrada lleva un adjetivo en lugar de una medida.

| `q` | Entradas escritas |
|---|---|
| **33** | `Deletes tools/author-lite/scripts/checkComponentGuideTextIntegrity.cjs (1360 bytes)` · `Retires the Programmer mode from tools/author-lite/editor-ui/src/features/editor/components/preview/ComponentGuide.jsx (29 lines carry the token)` · `Removes the inline certification labels from the same Component Guide surface` |
| **46** | `Creates new runs in .aiw/roadmap/roadmap.json, the roadmap canonical (63 runs today)` |
| **56** | `Writes packaged production output for the lesson corpus: 2 lessons under src/content/lecciones/ and 8 under src/content/staging/` · `Creates the packaged output location, which does not exist in the repository today` |
| **59** | `Deletes and moves documents under docs/ (343 markdown files, 288 of them under docs/archive/)` · `Reconciles .aiw/docs/docs_index.json (149 registered entries)` |
| **60** | `Renames tools/author-lite (237 files reference the path) and src/content/author_lite (32 files reference the path), with every inbound reference` · `Rewrites the launcher root assertion at tools/dev/start-editor.ps1:48 in the same atomic edit` |
| **61** | `Sweeps legacy documentation path references in AGENTS.md (18 occurrences), CLAUDE.md (30 occurrences), generate_prompt_context.js (8 occurrences) and 16 of the 17 packets under docs/components/web/` · `Disposes of the empty directory shells docs/author-lite/ and docs/jame-core/ (0 files, 6 subdirectories)` |
| **62** | `Renames the seven jame-smart-formula CSS classes and the data-jame-active-layout attribute (13 files carry it) across the editor UI and tools/author-lite/editor-ui/src/index.css` · `Updates the three test files under tools/author-lite/compiler-api/tests/ that assert them` |
| **63** | `Renames the j- prefix render namespace emitted by the Core builders: 334 distinct j- tokens under src/builders and the j-infinity-root id, across builders and the stylesheets that match them` |

**Los otros 38 runs no llevan la clave** (§1.1). **Ninguna entrada contiene un carácter
no-ASCII**: medido, 0 de 15.

---

## 6. La escritura: una sola, vía `batch`

**El motor admite un batch de 46.** `set-classification` está en el conjunto batcheable
(`roadmap-plan.mjs:202`), cada sub-op lleva su propio `run` (`:216`), y **no hay tope de
tamaño**: el único rechazo por tamaño es el array vacío (`:177`). No hubo que partir nada.

**La vía, sin levantar servidor.** El endpoint `POST /<key>/__project-console/roadmap/edit`
está fuera de alcance por dos razones: levantaría un servidor, y **re-emite `.project/`**, que
el criterio 11 prohíbe. Se ejecutó la misma secuencia que ese endpoint corre, importando el
motor de `aiw-console` en un proceso Node:

```
loadRaw -> parseRoadmap -> checkInvariants (pre-flight)
  -> queueOrderMap + collectIds -> dispatch(batch, 46 sub-ops)
  -> checkInvariants (post) + checkIdentityPreserved -> buildRemap -> serialize
  -> applyWrite (temp + fsync + rename atómico, backup en os.tmpdir)
```

con la **misma autoridad post-escritura** que el endpoint inyecta (`serve.mjs:359-374`):
re-leer el archivo escrito, `checkInvariants` y forma de árbol, con rollback si falla.

**El `externalRunIds` se compuso como lo compone el endpoint** (`serve.mjs:335-352`): leyendo
`project-console/projects.json` y recogiendo los `run_id` de los **otros** proyectos
registrados. Resultado: **94 ids** de `aiw-console` (52) y `aiw` (42). **Sin ese conjunto el
pre-flight rechaza el archivo entero**, porque `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001` —la
arista externa del aviso no bloqueante— no resuelve dentro de Cantu:

```
checkInvariants(externalRunIds = registro) : 0 errores
checkInvariants(externalRunIds = null)     : 1 error, la arista externa
```

**Es la misma arista que produce los 4 fallos de suite previos y ajenos** que declara
`TOLERANCIA-DE-CLASIFICACION-EN-CANTU.md` §7. **Ni se tocó ni se reparó.**

| Dato de la escritura | Valor |
|---|---|
| Operación | **una**, `batch` con **46** sub-ops `set-classification` |
| `stage` del plan | `ok` |
| Avisos del plan | **0** |
| `baseline` (compare-and-swap) | `sha256:2c2461e816b465ad169f9f38575f36ce24c437346ba2182878db344b081b94c0` |
| Filas de remap | **0** |
| Autoridad post-escritura | `re-read OK: invariants and tree shape verified on the written file` |
| `rolledBack` | **false** |
| Backup | `%TEMP%\roadmap-backup-2532-roadmap.json` — **fuera del repo** |
| Bytes | 91 813 → **105 490** (+13 677) |

---

## 7. Verificación

### 7.1 — Roundtrip byte-exacto, ANTES de tocar el canónico (criterio 7)

**Comprobado, no asumido.** La reparación de ayer se sostiene:

| Prueba sobre el canónico real | md5 | ¿Byte-idéntico? |
|---|---|---|
| Disco | `f171abc13962f4d94d5179ff1da0f202` | — |
| `loadRaw → parseRoadmap → serialize` | `f171abc13962f4d94d5179ff1da0f202` | **sí** |
| …más `normalizeRunKeyOrder` sobre **los 63 runs** (2 llevan `closeout_result`) | `f171abc13962f4d94d5179ff1da0f202` | **sí** |

Y **la posición sigue donde la dejó la reparación**, verificada ejecutando el módulo de
`cantu-studio`, no leyéndolo:

```
RUN_OPTIONAL_FIELDS = lane, barrier, correctness_model, work_type, blast_radius,
                      failure_surfaces, external_effects, classified_at,
                      closeout_result, progress
```

**Los seis, entre `barrier` y `closeout_result`**, idénticos al array del motor global.

### 7.2 — Ensayo completo sobre copia fuera del repo (criterio 8)

Copia en scratchpad, md5 verificado igual al original. Sobre ella: el mismo `batch`, el mismo
`planEdit`, el mismo `applyPlan`. El **resultado esperado se construyó por separado** —campo a
campo, recorriendo `CANONICAL_RUN_KEY_ORDER`, sin llamar a `setClassification`— y se comparó
byte a byte.

| Comparación | Resultado |
|---|---|
| plan del motor vs esperado construido a mano | **md5 idéntico** (`18c5745a17abf901225787bd92902f93`, 105 490 B) |
| archivo escrito en la copia vs esperado | **idéntico** |
| invariantes sobre la copia escrita | **0 errores** |

El mismo `cmp` se repitió contra el canónico real después de la escritura: **idéntico**.

### 7.3 — Invariantes, antes y después, campo a campo (criterio 9)

| Invariante | Antes | Después | Veredicto |
|---|---|---|---|
| Objetivos | 7 | **7** | sin cambio |
| Fases | 28 | **28** | sin cambio |
| Runs | 63 | **63** | sin cambio |
| Histograma de `status` | `planned 46 / completed 17` | **igual** | **ningún `status` tocado** |
| `queue_order` denso, único, contiguo 1…63 | sí | **sí** | sin cambio |
| **Filas de remap** | — | **0** | ✔ |
| Conjunto de `run_id` | 63 | **los mismos 63** | sin cambio |
| Aristas `depends_on` | **126** | **126**, las mismas | **el grafo no se tocó** |
| Vocabulario `lanes` | 2 carriles | **idéntico** | sin cambio |
| Runs con `lane` / con `barrier` | 11 / 0 | **11 / 0** | sin cambio |
| Claves de raíz | 5 | **las mismas 5** | sin `care_budget` |
| **No-ASCII** | **8** | **8** | **sin cambio** |
| `checkInvariants` | 0 errores | **0 errores** | ✔ |

**Los 8 codepoints no-ASCII son los mismos de siempre**: las rayas `—` de los dos títulos de
carril. **Este encargo no añadió ni quitó ninguno**, porque las 15 entradas de
`external_effects` son ASCII puro.

**Los 17 `completed`, byte a byte:** 17 antes, 17 después, los mismos ids
(`queue_order` 1–16 y 40), **17 de 17 byte-idénticos**, y **ninguno lleva ninguno de los seis
campos**.

**Los 63 runs, byte-idénticos salvo los campos añadidos:** **63 de 63**. Ninguna clave nueva
fuera de los seis. Ningún texto, `status`, `queue_order`, `lane`, `barrier` ni `depends_on`
movido.

**Posición de los campos: 46 de 46** llevan los suyos después de `barrier` y antes de
`closeout_result`, en el orden del motor.

### 7.4 — `severity` y `closure_mode` NO se escribieron (criterio 4)

Buscados como clave JSON en los 105 490 bytes del canónico: **cero apariciones**. El motor no
los escribió solo. **No hay defecto que reportar por esta vía.**

### 7.5 — Validador en verde, antes y después (criterio 10)

Por la vía que no escribe, `node tools/project-console/validate-project-console-state.mjs`:

```
EXIT 0   (antes)          EXIT 0   (después)
```

**`diff` de las dos capturas: sin diferencias. Idénticas carácter a carácter.**

```
Project Console state validation passed.
Roadmap v3 prototype: 7 objectives / 28 phases / 63 runs;
  queue groups needs_human_decision=0 now=0 ready_next=20 later=26 history=17
Docs indexed: 149 · Docs curated primary-visible: 60 of 149
Component statuses: 16
Git provenance episodes: 9 · Git history snapshot: 918 commits / 2 branches
Roadmap rebase warnings (non-blocking):  ← el único, la arista externa
```

**`Component statuses: 16`, sin moverse.** **Ningún aviso nuevo**: el único es el no
bloqueante de la arista externa, palabra por palabra el mismo. Los grupos de cola tampoco se
movieron —`ready_next=20 later=26 history=17`—, que era de esperar: el validador de Cantu
**tolera la clasificación y no afirma nada sobre ella** (`[classification: TOLERATE, NOT
ADOPT]`).

### 7.6 — Un solo archivo tocado, y `.project/` sin re-emitir (criterio 11)

Barrido de mtime del árbol entero, `node_modules` cubierto por el filtro:

```bash
find . -type f -not -path "./.git/*" -not -path "*/node_modules/*" -printf "%p|%s|%T@\n" | sort
```

| Momento | Archivos | md5 de la huella |
|---|---|---|
| Antes | **1 090** | `22f237a54256fdf00d237a25cec3bed2` |
| Después | **1 090** | `52074817ab4aea2de8a6b2f29f162d89` |

**El diff tiene exactamente una línea**, y es el canónico:

```diff
< ./.aiw/roadmap/roadmap.json|91813|1785556974.37
> ./.aiw/roadmap/roadmap.json|105490|1785563124.48
```

**Las otras 1 089 entradas son idénticas byte a byte y marca de tiempo a marca de tiempo.**
La huella de partida coincide con la que declaró `FAMILIAS-DE-RUNS-PENDIENTES-CANTU.md` §H.1
como su estado final: **nada se movió en Cantu entre aquel encargo y éste**.

**`.project/` no se re-emitió.** Los seis archivos, con el md5 que declaró el record de
tolerancia:

```
175c0efdfca41872adcb065b2c9ee198  docs_index.json     8b5d1786a651c09cf2167e3aaa8342f4  git_history.json
da552b3b6cd4d2e0251a0a172636d309  guardrails.json     b216f555ee31777d59f1b44003cfb9f9  no_claims.json
b631bc52177505ec09c2b55147ecde36  roadmap.json        39015a3aa266032052f7d3ad759b689d  snapshot.json
```

**Nota sobre el archivo temporal:** `applyWrite` escribe `.roadmap.json.tmp-<pid>` en el
directorio del canónico y lo renombra atómicamente; el backup va a `os.tmpdir()`, fuera del
repo. El temporal **no sobrevive a la operación**, y el barrido posterior lo confirma: 1 090
archivos, ni uno más.

### 7.7 — Superficies disjuntas (criterio 14)

**No se tocó nada de `aiw-console` salvo este record.** Huella del árbol de `aiw-console`,
mismo método:

| Momento | Archivos | md5 de la huella |
|---|---|---|
| Antes de la escritura | **275** | `efb2dd30dc0c3ae0482a5680852256af` |
| Después de la escritura | **275** | `efb2dd30dc0c3ae0482a5680852256af` |
| Tras escribir este record | **276** | — |

**Las dos primeras son idénticas: `diff` sin diferencias.** El hilo paralelo no escribió
durante la ventana de este encargo, y este encargo no escribió en `aiw-console` hasta este
record. El `diff` de la tercera contra la segunda tiene **exactamente una línea, y es este
archivo**:

```diff
> ./context/aiw-console/records/CLASIFICACION-DE-LOS-46-RUNS-PENDIENTES-CANTU.md|…
``` El motor y la
clasificación se **importaron**, nunca se modificaron:

```
f01ad678b980eb01d588b695c06a928d  tools/roadmap/roadmap-core.mjs
00b4990f5c8971e4bfb89719ba5e2a3c  tools/classification/classification.mjs
3d81e4d2dba58bb1378dd4ef555ddd88  tools/roadmap/roadmap-plan.mjs
```

Los tres coinciden con los md5 que declaró `TOLERANCIA-DE-CLASIFICACION-EN-CANTU.md` §9.

---

## 8. Discrepancias medidas. Se nombran; no se tocan

Cifras del record de familias que el disco no confirma tal cual. **Repararlas está fuera de
alcance y no se hizo.** En los tres primeros casos la cifra reconcilia en cuanto se fija la
unidad; en los tres últimos, no.

| # | Dato | Record de familias | **Disco** | Resolución |
|---|---|---|---|---|
| **D.1** | `programmer` en `ComponentGuide.jsx` | 29 «menciones» | **29 líneas**; **32 apariciones** (26 minúsculas + 6 capitalizadas) | Reconcilia como **líneas**. Escrito: `29 lines carry the token` |
| **D.2** | referencias legacy en `CLAUDE.md` | 29 | **29 líneas**; **30 apariciones** (24 `docs/author-lite` + 6 `docs/jame-core`) | Reconcilia como **líneas**. Escrito: **30 occurrences**, que es lo que la entrada dice medir |
| **D.3** | `data-jame-active-layout` | 13 «apariciones» | **13 archivos**; **38 apariciones** | Reconcilia como **archivos**. Escrito: `13 files carry it` |
| **D.4** | `src/content/author_lite` | **88** archivos lo referencian | **32** contienen la ruta; **92** contienen el token suelto `author_lite` | **Ninguna medida da 88.** Gana el disco: escrito **32**, que es la ruta que el run renombra |
| **D.5** | tokens `j-*` | **335** en `src/` | **334** distintos en `src/builders`; **337** en `src/` | **334 coincide con el texto del propio run** («the 334 j-prefix classes»). Escrito: 334 bajo `src/builders` |
| **D.6** | `j-infinity-root` | **8** apariciones | **4** en `src/`, 114 en el repo | El texto del run habla de «the eight dynamically constructed j- ids», que **es otra cosa**. No se escribió cifra para el id |

Cifras que **sí** verifican exactas, para constancia: 63 / 17 / 46 runs · 1 360 B del script ·
343 md bajo `docs/` · 288 bajo `docs/archive/` · 149 registrados · 2 lecciones + 8 en staging ·
237 archivos referencian `tools/author-lite` · `tools/dev/start-editor.ps1:48` · 18
apariciones en `AGENTS.md` · 8 en `generate_prompt_context.js` · 16 de 17 packets · 7 clases
`jame-smart-formula-*` · 3 archivos de test · `docs/author-lite/` y `docs/jame-core/` con **0
archivos** y 6 subdirectorios.

---

## 9. Archivos escritos por este encargo, y ninguno más

| # | Archivo | Qué |
|---|---|---|
| 1 | `cantu-studio/.aiw/roadmap/roadmap.json` | **el canónico** · 46 runs clasificados · 91 813 → 105 490 B |
| 2 | `aiw-console/context/aiw-console/records/CLASIFICACION-DE-LOS-46-RUNS-PENDIENTES-CANTU.md` | este record |

**Dos filas.** En `cantu-studio`, **un solo archivo**, verificado por barrido de mtime con
`node_modules` cubierto (§7.6). En `aiw-console`, **sólo este record** (§7.7). Fuera de los
dos repos, sólo el scratchpad de sesión, que no es de nadie.

**md5 declarados:**

```
f171abc13962f4d94d5179ff1da0f202   .aiw/roadmap/roadmap.json   (antes)
6d13a7c617801b4b197b6075f418cbac   .aiw/roadmap/roadmap.json   (después)
```

---

## 10. Lo que este encargo no hizo

### 10.1 — No decidió

No se cambió ni se propuso cambiar **ningún** valor de clasificación. Los dieciocho juicios
llegaron del operador y se transcribieron tal cual. Donde el ticket y el motor discrepaban
—§1.1, §1.2— **ganó el motor y se declaró**; donde el ticket y el disco discrepaban —§8—
**ganó el disco y se declaró**. En ninguno de los dos casos se tocó un juicio.

### 10.2 — No clasificó los 17 `completed`

Siguen sin ninguno de los seis campos, byte-idénticos, y siguen válidos: los seis son
opcionales y ausentes por defecto.

### 10.3 — No corrió ninguna suite, y por qué

`TOLERANCIA-DE-CLASIFICACION-EN-CANTU.md` §7 declara **4 fallos previos y ajenos** en
`tools/roadmap/tests/` (`clearProgress` 1, `createPhase` 2, `deletePhase` 1), todos por la
misma arista huérfana `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`. **No se repararon.** Tampoco se
ejecutó la suite: correrla habría podido dejar archivos en el árbol y **habría puesto en duda
la garantía de «un solo archivo tocado»** del criterio 11, que es la más fuerte de este
encargo. Los 4 fallos se declaran como los declaró aquel record, sin re-medirlos, y **la
causa que los produce sigue viva y sin tocar**: es la misma arista del aviso no bloqueante que
el validador imprime antes y después.

### 10.4 — El resto

No se re-emitió `.project/` · no se aplicó ningún `barrier` · no se resolvió la arista externa
· no se cambió ningún `status`, texto, orden, fase ni objetivo · no se insertó, movió ni
renumeró ningún run · no se tocó el grafo · no se reparó ninguna discrepancia del record de
familias · no se escribió `severity` ni `closure_mode` · no se ejecutó Git en ninguna forma ·
no se levantó ningún servidor · no se tocó el motor ni el validador de ningún repo.

**Queda abierto y declarado:** los 46 pendientes están clasificados y los 17 cerrados no. La
consola ya no tiene lista de pendientes de clasificación en este proyecto —
`unclassifiedLiveRuns()` devuelve **0** —, y `isClassified()` cuenta **46**.
