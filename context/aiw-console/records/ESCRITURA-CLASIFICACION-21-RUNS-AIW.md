# Escritura de la clasificación aprobada en los 21 runs `planned` de `aiw`

Encargo de taller. Escribe los cuatro campos de clasificación ya aprobados —más la marca
`classified_at`— en los 21 runs `planned` del canónico de `aiw`, y verifica campo a campo
contra un respaldo que nada más cambió.

Este encargo **no clasificó**: los valores venían decididos en el ticket. No se re-juzgó
ninguno, no se propuso ninguno, y no se derivó `severity` ni `closure_mode` a mano.

- **Fichero escrito:** `aiw/roadmap/roadmap.json` (el único que este encargo podía modificar).
- **Marca de clasificación:** `2026-08-03T06:57:46.901Z`.
- **Resultado:** 21 runs cambiados, 5 claves añadidas en cada uno, 0 anomalías.

---

## 1. Respaldo, antes de abrir nada para escritura

Copiado con Node (`fs.copyFileSync`) a carpeta temporal fuera de ambos repositorios, y
releído para comparar md5 antes de tocar una sola clave.

| | |
|---|---|
| Origen | `aiw/roadmap/roadmap.json` |
| Respaldo | `C:\Users\chris\AppData\Local\Temp\claude\C--Users-chris-Documents-AIW-Workspace\2b24f1e3-87b5-4609-96a8-5983d9028897\scratchpad\backup\roadmap.json.bak` |
| md5 del original | `4d90554577be9efd6188a02ae6a5c9ca` |
| md5 del respaldo | `4d90554577be9efd6188a02ae6a5c9ca` |
| bytes | 118 962 (idénticos) |

El respaldo se conserva. Es el que sostiene la verificación de la sección 5.

---

## 2. Estado previo medido

El ticket esperaba 46 / 25 `completed` / 21 `planned` / cero clasificados. Lo medido
coincide en los cuatro números:

| Medida | Esperado por el ticket | Medido |
|---|---|---|
| Total de runs | 46 | **46** |
| `completed` | 25 | **25** |
| `planned` | 21 | **21** |
| Runs con alguno de los seis campos de clasificación | 0 | **0** |
| Objetivos | — | 6 |
| Fases | — | 33 |
| `queue_order` único | — | sí |
| `queue_order` denso y contiguo desde 1 | — | sí (1..46) |
| Fin de línea detectado | — | CRLF |
| `checkInvariants` de partida | — | 0 errores |

Cero runs clasificados: nadie había escrito antes, así que no hubo nada que sobrescribir
y no hizo falta averiguar de quién era una escritura previa.

---

## 3. Guarda de identidad — 21/21, ninguna discrepancia

Cada fila se localizó por `queue_order` y se comprobaron las tres cosas: que el run existe,
que su `title` es **byte a byte** el de la columna GUARDA del ticket (comparación literal
`===`, sin normalizar ni recortar), y que su `status` es `planned`.

Ningún `run_id` viajaba en el ticket: los de abajo están **derivados del canónico**, no
tecleados.

| qo | run_id | título verbatim | status |
|---|---|---|---|
| 22 | `RUN-AIW-REAL-LOAD-MEASUREMENT-001` | OK | `planned` |
| 23 | `RUN-AIW-SCOPE-PREFLIGHT-GUARD-001` | OK | `planned` |
| 28 | `RUN-AIW-SHARED-WORKING-BRANCH-001` | OK | `planned` |
| 29 | `RUN-AIW-PUSH-IS-PART-OF-CLOSURE-001` | OK | `planned` |
| 30 | `RUN-AIW-PER-PROJECT-PUSH-001` | OK | `planned` |
| 31 | `RUN-AIW-INTAKE-001` | OK | `planned` |
| 32 | `RUN-AIW-PROVIDER-PER-ROLE-001` | OK | `planned` |
| 33 | `RUN-AIW-RUN-IDENTITY-001` | OK | `planned` |
| 34 | `RUN-AIW-RUN-MANIFEST-001` | OK | `planned` |
| 35 | `RUN-AIW-RUN-COST-ACCOUNTING-001` | OK | `planned` |
| 36 | `RUN-AIW-MID-RUN-SIGNALS-001` | OK | `planned` |
| 37 | `RUN-AIW-EVIDENCE-SCHEMA-DOCUMENTATION-001` | OK | `planned` |
| 38 | `RUN-AIW-RUN-CATEGORY-FIELD-001` | OK | `planned` |
| 39 | `RUN-AIW-BATCH-TO-BRANCH-001` | OK | `planned` |
| 40 | `RUN-AIW-CATEGORIES-BATCHES-DOCUMENTATION-001` | OK | `planned` |
| 41 | `RUN-AIW-DECOUPLED-QUEUE-LAUNCHER-001` | OK | `planned` |
| 42 | `RUN-AIW-ORPHAN-LOCK-RECOVERY-001` | OK | `planned` |
| 43 | `RUN-AIW-WORKTREES-PER-RUN-001` | OK | `planned` |
| 44 | `RUN-AIW-KERNEL-READS-LANES-001` | OK | `planned` |
| 45 | `RUN-AIW-LONG-UNATTENDED-SESSIONS-001` | OK | `planned` |
| 46 | `RUN-AIW-UNATTENDED-OPERATION-DOCUMENTATION-001` | OK | `planned` |

**21 coincidencias, 0 fallos.** La guarda se corrió otra vez, contra el fichero recién
leído, dentro del propio script de escritura, justo antes de componer las operaciones.

---

## 4. La vía del motor

La escritura no se hizo a mano. Existe una vía del motor que escribe clasificación en el
canónico **sin pasar por la interfaz de la consola**: `tools/roadmap/roadmap-plan.mjs` es
un módulo puro —sin HTTP, sin `argv`, sin `process.exit`— y `project-console/serve.mjs` es
sólo uno de sus llamadores. Se importó en solo lectura y se le pidió:

```
planEdit({ filePath, op: "batch", args: { ops: [21 × set-classification] }, externalRunIds })
  -> loadRaw -> parseRoadmap -> checkInvariants (pre) -> 21 × core.setClassification
  -> checkInvariants (post) + checkIdentityPreserved -> buildRemap -> serialize
applyPlan / core.applyWrite  -> respaldo -> fichero temporal -> fsync -> rename atómico
  -> validador de post-escritura -> rollback si refutara
```

Un solo `batch`, un solo plan, una sola escritura. Detalles que importan:

- **`external_effects` no se pasó nunca.** `set-classification` sólo asigna la clave si el
  llamador la menciona; al omitirla, la clave no se toca y queda **ausente**, que es el
  valor aprobado. El motor **no** la materializó como `[]` — se comprobó y se reporta abajo.
- **`classified_at` no se tecleó.** `roadmap-plan.mjs` se niega a relayarlo a propósito y
  `core.setClassification` escribe la marca él mismo con `Date#toISOString`.
- **`externalRunIds`** se compuso como la consola lo haría: `aiw` es el único proyecto
  registrado en `projects.config.json`, así que el conjunto §10.d es vacío.
- **Compare-and-swap**: se comprobó que el `baseline` del fichero no se hubiera movido
  entre el plan y la escritura.
- **Validador de post-escritura**: réplica de `writtenFileValidator` de `serve.mjs` —
  releer el fichero renombrado, `checkInvariants` y `hasRoadmapTreeShape`, con rollback
  desde respaldo si fallara. Devolvió `code=0`.
- El respaldo propio del motor y su fichero temporal se dirigieron a la carpeta temporal,
  fuera de ambos repositorios.

### Una marca sola, sin teclearla

`setClassification` llama a `new Date().toISOString()` una vez por run. El primer plan
**cruzó una frontera de milisegundo** y produjo dos marcas distintas
(`…46.895Z` y `…46.897Z`). Como `planEdit` no escribe nada, se rechazó ese plan y se
replanificó: el segundo salió con las 21 marcas idénticas y ése fue el que se aplicó.

Así la marca sigue siendo del motor —nunca un argumento, nunca tecleada— y aun así es
**una sola** para el acto de clasificación. Un plan descartado no cuesta nada; una marca
tecleada sí.

---

## 5. Verificación campo a campo contra el respaldo

Comparación del fichero resultante contra el respaldo, con Node, en UTF-8.

| Comprobación | Esperado | Medido |
|---|---|---|
| Runs cambiados | 21 (las filas de la tabla) | **21** |
| Claves añadidas por run | 5 | **5**, y **una sola firma distinta** en los 21 |
| Cuáles | los 4 campos + `classified_at` | `correctness_model`, `work_type`, `blast_radius`, `failure_surfaces`, `classified_at` |
| Claves añadidas de más | 0 | **0** |
| Claves eliminadas | 0 | **0** |
| Claves existentes modificadas | 0 | **0** |
| Runs `completed` cambiados | 0 | **0** — los 25 idénticos byte a byte, orden de claves incluido |
| Campos congelados intactos en los 21 | 21/21 | **21/21** (`run_id`, `title`, `queue_order`, `status`, `depends_on`, `summary`, `full_description`, `lane`, `barrier`) |
| Total de runs | igual | 46 = 46 |
| Objetivos | igual | 6 = 6 |
| Fases | igual | 33 = 33 |
| Claves de raíz | iguales | `schema_version`, `roadmap_id`, `title`, `lanes`, `objectives` |
| Envolturas de objetivo y fase | iguales | sin cambios |
| `queue_order` | denso, único, contiguo desde 1 | **sí** (1..46) |
| Valores escritos vs tabla aprobada | 84 coincidencias | **84/84**, 0 discrepancias |
| `external_effects` presente | en 0 de 46 | **0 de 46** — ausente en todas, no materializado como `[]` |
| `classified_at` fuera de los 21 | 0 | **0** |

**Anomalías: 0.** No hizo falta restaurar. md5 resultante: `5c7cf8bd9dc10f0f2657b693f9bf143b`
(118 962 → 124 022 bytes).

La comparación de los runs `completed` se hizo sobre `JSON.stringify` del objeto entero, que
conserva el orden de inserción de claves: detecta tanto un cambio de valor como una
reordenación. Ninguno de los 25 se movió.

---

## 6. Invariantes — las tres combinaciones ilegales

Verificadas sobre lo escrito, run por run, las tres del modelo:

| Combinación ilegal | Runs que la disparan |
|---|---|
| `SPECIFIED` + `FOUNDATIONAL` | **0** |
| `FOUNDATIONAL` + `LOUD` | **0** |
| `JUDGED_*` + `UNATTENDED` (sobre el `closure_mode` derivado) | **0** |

21 runs × 3 combinaciones = **63 comprobaciones, 0 violaciones**.

`core.checkInvariants` sobre el fichero escrito: **0 errores**. La tercera no es un campo
almacenado —nadie puede teclear un `closure_mode`— así que se comprobó como propiedad de la
derivación, evaluando `deriveClosureMode` sobre cada uno de los 21.

---

## 7. `classified_at`

| | |
|---|---|
| Valor | `2026-08-03T06:57:46.901Z` |
| Valores distintos en los 21 | **1** |
| Forma | ISO-8601 UTC, `Date#toISOString` (`YYYY-MM-DDTHH:MM:SS.mmmZ`) |
| Round-trip por `Date` | idéntico |
| Quién lo produjo | el motor, dentro de `core.setClassification` |
| Presente en algún run fuera de los 21 | **0** |

Un acto de clasificación, una marca.

---

## 8. Derivados, calculados por el motor

Calculados con `deriveSeverity` y `deriveClosureMode` de
`tools/classification/classification.mjs` sobre lo escrito. Ni se almacenan ni se ajustaron.
El ticket no trae cifra esperada para ellos, así que van tal cual salen.

**`severity`** — CRITICAL 12 · MAJOR 8 · MINOR 1 · MODERATE 0

**`closure_mode`** — SEMI_ATTENDED 17 · ATTENDED 3 · UNATTENDED 1

Por run:

| qo | run_id | severity | closure_mode |
|---|---|---|---|
| 22 | `RUN-AIW-REAL-LOAD-MEASUREMENT-001` | CRITICAL | SEMI_ATTENDED |
| 23 | `RUN-AIW-SCOPE-PREFLIGHT-GUARD-001` | MINOR | UNATTENDED |
| 28 | `RUN-AIW-SHARED-WORKING-BRANCH-001` | CRITICAL | ATTENDED |
| 29 | `RUN-AIW-PUSH-IS-PART-OF-CLOSURE-001` | CRITICAL | ATTENDED |
| 30 | `RUN-AIW-PER-PROJECT-PUSH-001` | MAJOR | SEMI_ATTENDED |
| 31 | `RUN-AIW-INTAKE-001` | CRITICAL | SEMI_ATTENDED |
| 32 | `RUN-AIW-PROVIDER-PER-ROLE-001` | CRITICAL | SEMI_ATTENDED |
| 33 | `RUN-AIW-RUN-IDENTITY-001` | CRITICAL | SEMI_ATTENDED |
| 34 | `RUN-AIW-RUN-MANIFEST-001` | CRITICAL | SEMI_ATTENDED |
| 35 | `RUN-AIW-RUN-COST-ACCOUNTING-001` | MAJOR | SEMI_ATTENDED |
| 36 | `RUN-AIW-MID-RUN-SIGNALS-001` | MAJOR | SEMI_ATTENDED |
| 37 | `RUN-AIW-EVIDENCE-SCHEMA-DOCUMENTATION-001` | MAJOR | SEMI_ATTENDED |
| 38 | `RUN-AIW-RUN-CATEGORY-FIELD-001` | CRITICAL | ATTENDED |
| 39 | `RUN-AIW-BATCH-TO-BRANCH-001` | MAJOR | SEMI_ATTENDED |
| 40 | `RUN-AIW-CATEGORIES-BATCHES-DOCUMENTATION-001` | MAJOR | SEMI_ATTENDED |
| 41 | `RUN-AIW-DECOUPLED-QUEUE-LAUNCHER-001` | CRITICAL | SEMI_ATTENDED |
| 42 | `RUN-AIW-ORPHAN-LOCK-RECOVERY-001` | MAJOR | SEMI_ATTENDED |
| 43 | `RUN-AIW-WORKTREES-PER-RUN-001` | CRITICAL | SEMI_ATTENDED |
| 44 | `RUN-AIW-KERNEL-READS-LANES-001` | CRITICAL | SEMI_ATTENDED |
| 45 | `RUN-AIW-LONG-UNATTENDED-SESSIONS-001` | CRITICAL | SEMI_ATTENDED |
| 46 | `RUN-AIW-UNATTENDED-OPERATION-DOCUMENTATION-001` | MAJOR | SEMI_ATTENDED |

---

## 9. Trabajo ajeno encontrado, y no tocado

`aiw` tenía ya, **antes** de este encargo, cinco ficheros modificados sin commitear en
`.project/` (`docs_index.json`, `guardrails.json`, `no_claims.json`, `roadmap.json`,
`snapshot.json`), todos con marca de tiempo `2026-08-03 00:37:41` — veinte minutos antes de
esta escritura, que es de las `00:57`. No son de este encargo. Se reportan y se dejan
exactamente como estaban.

`aiw/.project/` queda **desfasado a propósito**: la re-emisión la hace el operador desde la
consola, que escribe y re-emite de forma atómica.

`projects/aiw-console` tenía el árbol limpio al empezar y al terminar; su única novedad es
este record.

---

## 10. Qué NO se hizo

- **No se clasificó nada.** Los valores venían aprobados en el ticket; no se re-juzgó
  ninguno, no se propuso ninguno y no se derivó `severity` ni `closure_mode` a mano.
- **No se escribió `external_effects`.** El valor aprobado era ausente. Quedó ausente en las
  46, y se comprobó que el motor no lo materializó como `[]`.
- **No se escribió `category`, `batch` ni ningún campo fuera de los cinco.**
- **No se tecleó `classified_at`.** Lo produjo el motor.
- **No se re-emitió `aiw/.project/`.** Es del operador, desde la consola.
- **No se ejecutó git en ninguna forma que escriba.** Sólo `git status` de lectura en ambos
  repositorios. Nada commiteado, nada revertido, nada del árbol de `aiw-console` tocado.
- **No se cambió el status de ningún run.** Los 21 siguen `planned`.
- **No se insertó, movió ni renumeró ningún run.** El `remap` del motor salió vacío.
- **No se clasificaron los 25 `completed`,** ni se propusieron valores para ellos.
- **No se editaron títulos, `summary`, `full_description`, `depends_on`, `lane` ni
  `barrier`.**
- **No se corrió la suite.** Fuera de alcance. El motor sí corrió sus propios guardas:
  `checkInvariants` antes y después, `checkIdentityPreserved`, y el validador de
  post-escritura sobre el fichero ya renombrado.
- **No se reprodujo ningún `full_description`** en este record.
- **No se modificó ningún fichero de `projects/aiw-console`** salvo la creación de este
  record. Sus módulos se importaron en solo lectura.
