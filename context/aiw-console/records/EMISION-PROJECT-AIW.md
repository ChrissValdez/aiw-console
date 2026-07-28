# PRIMERA EMISIÓN DEL `.project/` DE AIW — Y SU MEDICIÓN

**Fecha:** 2026-07-28 · **Naturaleza:** EMISIÓN + MEDICIÓN, acotada a
`aiw/.project/` (4 archivos nuevos) más este record. **No commitea, no decide qué
se commitea, no ejecuta ningún run del roadmap, no toca el proyector.** ·
**Máquina:** PC (Windows 10, `C:\Users\chris\Documents\AIW_Workspace\`) ·
**`aiw` HEAD `77b7ad5` · `aiw-console` HEAD `122bd9f`.**

## Qué hizo este encargo

Corrió el proyector vigente sobre el root de `aiw` por primera vez, con el
canónico `aiw/roadmap/roadmap.json` ya escrito y commiteado, y midió **qué salió**:
artefacto por artefacto, campo por campo, contra lo que `CONTRATO` exige.

Es la consecuencia **(c)** de [[D-052]]: sin `.project/`, la consola no puede
renderizar AIW aunque el canónico exista y el modo ya haya volteado.

**El resultado central, en una línea: salieron CUATRO artefactos, no seis.**
`guardrails` y `no_claims` **no se emitieron** —no tienen fuente— y el proyector
**no fabricó nada**. Ese era el desenlace esperado y medirlo era el entregable.

## Abreviaturas de cita

| Abreviatura | Archivo |
|---|---|
| `CONTRATO` | `context/aiw-console/CONTRATO.md` |
| `MEDICION` | `context/aiw-console/records/MEDICION-ESTADO-DE-AIW.md` |
| `ESCRITURA` | `context/aiw-console/records/ESCRITURA-ROADMAP-AIW.md` |
| `PROJ` | `projects/aiw-console/tools/projector/project.mjs` |
| `PCJS` | `projects/aiw-console/project-console/assets/project-console.js` |

Todo lo de los bloques 1–8 está **medido de primera mano en este encargo** salvo
donde se cite `MEDICION`/`ESCRITURA`, que son de segunda mano. Lo inferido va
**[INFERENCIA]**; lo no comprobado, **[NO VERIFICADO]**.

---

# 1. El proyector: localizado y con versión verificada

| | |
|---|---|
| Ruta | `projects/aiw-console/tools/projector/project.mjs` |
| Tamaño | 84.515 bytes |
| `PROJECTOR_VERSION` | **`0.9.0`** — leído en `PROJ:89`, no dado por bueno |
| `GENERATED_FROM` | `` `aiw-projector@${PROJECTOR_VERSION}` `` (`PROJ:90`) → `aiw-projector@0.9.0` |
| Invocación | `node tools/projector/project.mjs <root>` (`PROJ:1687-1689`) |

`MEDICION` declaraba `0.9.0` y **coincide**. Se verificó abriendo el archivo.

**El emisor no se modificó en ningún byte.** Comprobado a la salida:
`git diff --stat -- tools/` en `aiw-console` sale **vacío**.

Salida literal de la corrida:

```
[projector] mode=roadmap_tree layout=repo_root model=roadmap_tree_v1 project=aiw
[projector] wrote .project/docs_index.json — entries=70; 27399 bytes
[projector] wrote .project/roadmap.json — entries=6; 98935 bytes
[projector] wrote .project/git_history.json — entries=34; 12971 bytes
[projector] wrote .project/snapshot.json — objectives=6; runs=42; 103283 bytes
EXIT=0
```

**El volteo de modo funcionó.** `mode=roadmap_tree`, `layout=repo_root`,
`project=aiw` — que es exactamente lo que [[D-052]] autorizó y `MEDICION §4.2`
predijo. `detectRootMode(aiw)` ya no devuelve `aiw_objectives`.

---

# 2. Los artefactos, con sus números

**Cuatro emitidos, dos no emitidos.** El CLI solo imprime lo que escribió; las dos
ausencias se midieron aparte (bloque 5).

| # | Artefacto | Bytes | `entries` (lo que declara el emisor) | Estatus §19 |
|---|---|---:|---|---|
| 1 | `.project/snapshot.json` | **103.283** | `objectives=6; runs=42` | **REQUERIDO** (§8) |
| 2 | `.project/roadmap.json` | **98.935** | `entries=6` | opcional |
| 3 | `.project/docs_index.json` | **27.399** | `entries=70` | opcional |
| 4 | `.project/git_history.json` | **12.971** | `entries=34` | opcional |
| — | `.project/guardrails.json` | — | **NO EMITIDO** | opcional |
| — | `.project/no_claims.json` | — | **NO EMITIDO** | opcional |
| | **Total escrito** | **242.588** | | |

**Aviso sobre `entries`: no significa lo mismo en cada fila.** Es el conteo que el
propio emisor declara (`PROJ:1602-1627`), y su unidad cambia por artefacto:
`roadmap` cuenta **objetivos** (`roadmap.objectives.length`), `docs_index` cuenta
**documentos**, `git_history` cuenta **commits** (`commit_total`). Solo el snapshot
imprime dos cifras. Se transcribe tal cual el emisor lo dice; no se homogeneizó.

## 2.a El envelope, idéntico en los cuatro

`generated_at` es **el mismo instante en los cuatro archivos** —
`writeProjectFolder` calcula `now` una vez y lo pasa a todos (`PROJ:1585`):

| Clave | Valor (los 4 artefactos) |
|---|---|
| `schema_version` | `1` (tipo `number`, entero — `CONTRATO §4`) |
| `project_id` | `"aiw"` |
| `generated_at` | **`2026-07-28T21:00:31.715Z`** |
| `generated_from` | **`aiw-projector@0.9.0`** |

`project_id` sale del **nombre de la carpeta**, no de un `package.json`:
`aiw/package.json` **no existe** (medido), así que `readRoadmapTreeProjectId`
(`PROJ:898-903`) cae al `basename` del root. Nada horneado.

## 2.b `sources` (§6) por artefacto

| Artefacto | `sources` | Contenido |
|---|---:|---|
| `snapshot.json` | **1** | `roadmap/roadmap.json` (mtime `2026-07-28T20:31:09.779Z`) |
| `roadmap.json` | **1** | ídem |
| `git_history.json` | **2** | `.git` (mtime `…T20:58:27.105Z`) + `roadmap/roadmap.json` |
| `docs_index.json` | **70** | los 70 `.md` escaneados, cada uno con su `mtime` |

**Por qué el snapshot lleva 1 y no 2.** El emisor le pasa dos rutas —el roadmap y
`package.json` (`PROJ:994`)—, pero `sourceRecord` devuelve `null` para un archivo
que no existe y el `.filter(Boolean)` la descarta (`PROJ:718-726`, `:914`). Es
`CONTRATO §7` operando: **puntero que no resuelve se omite, nunca se emite roto.**
No es una carencia; es la regla haciendo su trabajo.

---

# 3. `snapshot.json` — verificado campo a campo contra §3

**Las 14 claves requeridas están las 14, con el tipo que §3 exige.** Medido con
`hasOwnProperty` y comprobación de tipo, no de vista:

| Clave | Tipo exigido §3 | Presente | Tipo real |
|---|---|---|---|
| `schema_version` | entero | sí | entero (`1`) |
| `project_id` | string | sí | string |
| `operational_status` | string | sí | string |
| `project_summary` | string | sí | string |
| `current_status_summary` | string | sí | string |
| `roadmap_tree` | objeto | sí | objeto |
| `blockers` | array | sí | array |
| `followups` | array | sí | array |
| `no_claims_summary` | objeto | sí | objeto |
| `validation_summary` | objeto | sí | objeto |
| `taxonomy_model` | objeto | sí | objeto |
| `generated_at` | ISO 8601 UTC | sí | string ISO |
| `generated_from` | string | sí | string |
| `sources` | array de objetos | sí | array de objetos |

Claves del archivo, en orden de emisión (15 — las 14 requeridas más una):

```
schema_version, project_id, generated_at, generated_from, sources,
emitted_artifacts, operational_status, project_summary, current_status_summary,
roadmap_tree, blockers, followups, no_claims_summary, validation_summary,
taxonomy_model
```

## 3.1 ¿Lleva `sources`? — **SÍ.** El defecto R12 está cerrado

`MEDICION` R12 midió que el snapshot mode-1 **no la llevaba**, y `§3`/`§6` la
promovió a requerida. **Con el emisor 0.9.0 y modo 2, está presente** — array de
objetos `{path, mtime}`, una entrada:

```json
[ { "path": "roadmap/roadmap.json", "mtime": "2026-07-28T20:31:09.779Z" } ]
```

**Y no solo el snapshot: los cuatro artefactos la llevan** (`projectFileEnvelope`,
`PROJ:908-916`), que es más de lo que §6 exige.

## 3.2 ¿Lleva `taxonomy_model`? — **SÍ, y declara el vocabulario del v3**

`§17` lo exige porque el árbol suelto no es auto-descriptivo. Emitido:

- `model: "roadmap_tree_v1"` — tomado del árbol (`declaredRoadmapModel`), no
  constante.
- **Cuatro vocabularios**, cada uno con su `axis`, que es lo que impide leer
  `active`-de-run y `active`-de-proyecto como un solo vocabulario:

| Clave | `axis` | `stored` | Tokens |
|---|---|---|---|
| `project.operational_status` | `project` | `true` | `active, blocked, idle` |
| `run.status` | `run` | `true` | `planned, active, blocked, completed` (los 4 de §11.a) |
| `objective.status` | `objective` | `false` | `planned, in_progress, active, blocked, completed` (los 5 derivados de §11) |
| `phase.status` | `phase` | `false` | ídem |

- **Dos derivaciones ejecutables**, con `precedence` ordenada y `empty_input`
  declarado: `collection_status_from_runs` (§12.a) y
  `project_operational_status_from_runs`.

**§17 exigía «los cuatro tokens de run y los cinco derivados de objetivo,
completos». Están los cuatro y los cinco.** El defecto latente que `§17` nombraba
—bloque horneado como constante— **ya no aplica al `model`**, que se deriva del
árbol; los tokens sí siguen siendo constantes de módulo, que es lo que §17 anotó
como trabajo del tramo 2 y **no es objeto de este encargo**.

Sin clave `specified_by`: `aiw/governance/contract.json` **no existe** (medido), y
§7 manda omitir el puntero antes que emitirlo roto.

## 3.3 Los títulos — **el defecto R11 no reapareció**

`MEDICION` R11 midió que los 16 títulos del snapshot mode-1 decían literalmente
«Project»/«Proyecto». Medido ahora sobre los 42 runs del snapshot mode-2:

| Medida | Resultado |
|---|---|
| Runs con título literal «Project»/«Proyecto» | **0 de 42** |
| Títulos vacíos o ausentes | **0** |
| Títulos únicos | **42 de 42** |
| ¿Los 42 títulos son los del canónico, en el mismo orden? | **sí** (comparación de arrays serializados) |
| Fases con título literal | **0 de 29** |
| Objetivos con título literal | **0 de 6** |

Los 6 títulos de objetivo, tal como salen:

```
O1 — House in order                                          (2 fases)
O2 — AIW is readable                                         (7 fases)
O3 — Reliable autonomous run                                 (6 fases)
O5 — Run evidence and observability                          (4 fases)
O6 — Categories and batches                                  (4 fases)
O7 — Long unattended execution (batches, lanes and parallelism) (6 fases)
```

El hueco permanente de `O4` viaja tal cual, sin renumerar (`ESCRITURA §7.1`).

Muestra de runs (primeros 2 y últimos 2 por `queue_order`):

```
q 1  O1/O1.P1  RUN-AIW-V2-REMOTE-BACKUP-001    — Back up AIW v2 to a private remote
q 2  O1/O1.P1  RUN-AIW-CONSOLE-REMOTE-BACKUP-001 — Back up aiw-console to a private remote
q41  O7/O7.P5  RUN-AIW-LONG-UNATTENDED-SESSIONS-001 — Run real long unattended sessions and count them honestly
q42  O7/O7.P6  RUN-AIW-UNATTENDED-OPERATION-DOCUMENTATION-001 — Document how to run and audit an unattended window
```

**Confirmado: en modo 2 los títulos salen del canónico y el literal desapareció.**
La causa es estructural, no un parche: R11 era defecto del lector de `objectives/`
(mode 1), y mode 2 no lo usa.

## 3.4 Los escalares derivados

| Clave | Valor emitido | De dónde sale |
|---|---|---|
| `operational_status` | `"idle"` | `deriveProjectOperationalStatus`: 0 `active`, 0 `blocked` → `idle` |
| `project_summary` | `"AIW Roadmap: 6 objectives, 29 phases, 42 runs."` | conteos del árbol |
| `current_status_summary` | `"No active run; 12 of 42 runs completed."` | conteos del árbol |
| `blockers` | `[]` | derivado: cero runs `blocked` |
| `followups` | `[]` | constante del emisor (`PROJ:1028`) |
| `no_claims_summary` | `{}` | **sin fuente** — ver bloque 5 |
| `validation_summary` | `{}` | opaco por §3.b: el validador de capa 3 no existe |

**`no_claims_summary` vale `{}` y eso es correcto, no un defecto.** `PROJ:1031-1034`
solo lo llena si `no_claims.json` parsea Y su ruta resuelve; con la fuente ausente
emite el objeto vacío que §3 exige por tipo, sin inventar total ni puntero.

---

# 4. `roadmap.json` contra el canónico — los cinco números coinciden

`aiw/roadmap/roadmap.json` se leyó **como fuente**, sin tocarlo. Conteos medidos
de primera mano sobre los tres árboles:

| Medida | Esperado (encargo) | Canónico | `.project/roadmap.json` | `snapshot.roadmap_tree` | ¿Coincide? |
|---|---:|---:|---:|---:|---|
| Objetivos | 6 | **6** | **6** | **6** | **sí** |
| Fases | 29 | **29** | **29** | **29** | **sí** |
| Runs | 42 | **42** | **42** | **42** | **sí** |
| `queue_order` mín..máx | 1..42 | **1..42** | **1..42** | **1..42** | **sí** |
| `status` = `completed` | 12 | **12** | **12** | **12** | **sí** |
| `status` = `planned` | 30 | **30** | **30** | **30** | **sí** |
| `status` = `active` / `blocked` | 0 / 0 | **0 / 0** | **0 / 0** | **0 / 0** | **sí** |

**Ninguna diferencia que reportar.** Los tres árboles dan idénticos los seis
conteos. Comprobado además, sin que se pidiera: los 42 `queue_order` son
**contiguos 1..42, sin huecos ni repetidos** (los 42 runs llevan la clave).

Identidad byte-lógica, medida por serialización JSON:

| Comprobación | Resultado |
|---|---|
| `.project/roadmap.json`.`objectives` === canónico.`objectives` | **idénticos** |
| `snapshot.roadmap_tree.objectives` === canónico.`objectives` | **idénticos** |
| bloque `roadmap_tree` del snapshot === bloque de `roadmap.json` | **idénticos** |

Es lo que `PROJ:927-940` promete: **un solo `roadmapTreeBlock`, así que las dos
copias del árbol no pueden derivar.** Verificado, no supuesto.

Claves de raíz del canónico transportadas: `roadmap_id` (`"roadmap"`), `title`
(`"AIW Roadmap"`), `lanes` (los 2 carriles con `DEVELOPMENT` como `default`),
`objectives`. **Ninguna clave del canónico se perdió** salvo su `schema_version`
interno, que `PROJ:920-922` omite a propósito: dos `schema_version` a dos
profundidades en un archivo es la confusión que §10.c advierte, y `model` ya lo
carga.

`.project/roadmap.json` pesa **98.935 b** contra **98.697 b** del canónico
(`ESCRITURA §1.2`): **+238 bytes**, que es el envelope. El árbol es el mismo.

---

# 5. La degradación de `guardrails` y `no_claims` — medida y transcrita

## 5.1 Qué emitió el proyector: **nada. Los dos archivos no existen.**

```
NO EMITIDO   .project/guardrails.json
NO EMITIDO   .project/no_claims.json
```

**Transcripción del contenido literal de ambos: no hay contenido que transcribir —
ninguno de los dos archivos fue creado.** El encargo anticipaba que serían cortos;
el hecho medido es que son **inexistentes**, no cortos.

## 5.2 Por qué, con el mecanismo exacto

Las fuentes que el layout `repo_root` declara **no existen** (medido, una a una):

```
NO existe  aiw/governance/                        (la carpeta entera)
NO existe  aiw/governance/guardrails.json
NO existe  aiw/governance/no_claims.json
NO existe  aiw/governance/contract.json
```

Crear `governance/` es **`O2.P4`, un run `planned`**, y este encargo no lo ejecuta.

La cadena en el emisor, leída:

1. `buildGuardrails` / `buildNoClaims` (`PROJ:1288-1294`) delegan en
   `buildTransportedList`.
2. `buildTransportedList` (`PROJ:1276-1284`): si la fuente no existe o no parsea o
   no trae el array esperado, **devuelve `null`**.
3. `write` en `writeProjectFolder` (`PROJ:1589-1590`): **`if (!data) return;`** — un
   artefacto `null` no se escribe.

El comentario del propio emisor, transcrito de `PROJ:1272-1275`:

> Guardrails and no-claims are TRANSPORTED, not authored here: the project declares
> them in `governance/*.json` and this emitter republishes them under the contract
> envelope. An absent or malformed source yields null and the file is simply not
> emitted — §18/§20: better an announced absence than an invented table.

**VEREDICTO SOBRE FABRICACIÓN: el emisor NO fabricó nada.** No inventó tablas, no
emitió arrays vacíos, no dejó punteros rotos, y `no_claims_summary` del snapshot
salió `{}` en vez de un total falso. **No hay hallazgo grave que reportar en este
eje.**

## 5.3 Cómo se anuncia — hay DOS canales, y solo uno cubre a AIW

Éste es el hallazgo del bloque, y merece precisión porque §19-§20 exigen que la
ausencia **se declare**.

**Canal 1 — `emitted_artifacts` en el snapshot (la declaración de `O4.P13`).**
Se construye desde lo que la emisión **realmente escribió** (`PROJ:1634-1637`).
Emitido para AIW, literal y completo:

```json
[
  { "artifact": "docs_index",  "path": ".project/docs_index.json" },
  { "artifact": "roadmap",     "path": ".project/roadmap.json" },
  { "artifact": "git_history", "path": ".project/git_history.json" },
  { "artifact": "snapshot",    "path": ".project/snapshot.json" }
]
```

**Cuatro entradas. `guardrails` y `no_claims` NO figuran.** Contraste medido
leyendo (no re-emitiendo) `aiw-console/.project/snapshot.json`, emitido por el
mismo `aiw-projector@0.9.0` el 2026-07-28T09:33:31.914Z: **declara las seis**,
`guardrails` y `no_claims` incluidas.

Que no figuren es **deliberado y está razonado en el emisor**. `PROJ:999-1004`:

> A consumer that fetches a route and gets a 404 cannot tell, from the 404 alone,
> whether a promised file went missing (a real absence, which §20 requires it to
> announce, naming the file) or whether the project simply never emitted that file
> (a designed non-existence, which §18 says is not an absence at all and must not
> be announced).

Consecuencia para AIW, leída en el consumidor: `isDeclaredSource` (`PCJS:916-920`)
filtra el registro de fallos agregado, así que los dos 404 de AIW **no entrarán en
`failedSources`** ni en el panel de diagnósticos.

**Canal 2 — el banner por sección de Governance.** `PCJS:2834-2848` renderiza,
**sin consultar `emitted_artifacts`**:

```js
byId("project-guardrails").innerHTML = data.guardrails == null
  ? sourceAbsenceBanner(PATHS.guardrails, "Project guardrails unavailable.")
  : tableFromRows(…);

byId("no-claims").innerHTML = data.noClaims == null
  ? sourceAbsenceBanner(PATHS.noClaims, "Claims table unavailable.")
  : tableFromRows(…);
```

Y `sourceAbsenceBanner` (`PCJS:2853-2860`) nombra el archivo:
`"<ruta> could not be loaded. The rest of the Project Console is unaffected."`

`fetchJson` devuelve `null` ante un 404 (`PCJS:940-942` vía `fetchText`), así que
**`data.guardrails` y `data.noClaims` serán `null` para AIW y los dos banners se
renderizarán, cada uno en su propia sección, nombrando su archivo** — que es
exactamente lo que §19 («banner en su propia sección, nombrando el archivo») y §20
(«se anuncia donde duele, nombrando lo que falta») exigen.

**[INFERENCIA], y se marca como tal:** lo anterior es **lectura de código**, no
observación. **La consola no se levantó en este encargo** (fuera de alcance), así
que **[NO VERIFICADO]** que los dos banners aparezcan en pantalla.

**VEREDICTO DE §19-§20: la ausencia SÍ se declara, en la superficie afectada y
nombrando el archivo — pero por el consumidor, no por el emisor, y no aparece en
el agregado.** Eso es consistente con §20, que dice con todas sus letras que «este
requisito recae sobre el shell del tramo 3, no sobre el emisor».

## 5.4 Un caso que el contrato no separa, y conviene nombrar

El contrato distingue dos situaciones:

- **§18** — *no hay emisor*: el archivo no entra a `.project/`; su inexistencia es
  de diseño y **no debe anunciarse**.
- **§19** — *hay emisor y el opcional falta*: **se anuncia**, nombrando el archivo.

**AIW hoy es un tercer caso: emisor SÍ, fuente NO.** El proyector lo colapsa contra
el caso §18 (no escribe, no declara). El resultado no es incorrecto —el banner por
sección igual sale, porque no está condicionado— pero sí conviene registrarlo: en
`emitted_artifacts`, AIW queda indistinguible de un proyecto que **no tiene
concepto de governance**, cuando la verdad es que **debería tener guardrails y
`O2.P4` los escribirá**.

No se propone enmienda ni arreglo: **no es trabajo de este encargo**, el emisor no
se toca y `CONTRATO` no se enmienda aquí. Se nombra para que no parezca descuido.
La ambigüedad se disuelve sola el día que `O2.P4` corra.

---

# 6. `docs_index.json` — el criterio de reproducibilidad

## 6.1 Qué emitió

| Medida | Valor |
|---|---:|
| Entradas (`docs.length`) | **70** |
| `sources.length` | **70** (cada documento es fuente de su propio índice) |
| `nav_tier: primary` | **3** |
| `nav_tier: secondary` | **67** |
| `default_visible: true` | **3** |

Las 3 `primary` —las únicas visibles por defecto— son las de la raíz:

```
CONSTITUCION.md  — «CONSTITUCION.md — AIW v2»
CONTEXTO.md      — «CONTEXTO — mudado a aiw-console»
claude.md        — «CLAUDE.md — AIW v2»
```

**Es índice ESCANEADO, no transportado.** `aiw/docs/docs_index.json` no existe
(medido), así que `buildDocsIndex` (`PROJ:1089-1091`) cae al escaneo. Curar el
índice es **`O2.P5(b)`, un run `planned`**, y este encargo no lo ejecuta.

## 6.2 El cruce contra git — lectura pura

Cruzadas las 70 rutas, una a una, contra `git check-ignore` y `git ls-files`:

| Categoría | Entradas | % |
|---|---:|---:|
| **Trackeadas** (sobreviven a un clon fresco) | **34** | 48,6 % |
| **Gitignoreadas** (no viajan) | **36** | 51,4 % |
| No trackeadas y no ignoradas | **0** | 0 % |
| **Total** | **70** | 100 % |

La partición es limpia: **34 + 36 = 70, sin residuo.**

## 6.3 Las 36 que NO viajarían, con su ruta y la regla que las ignora

**35 bajo `logs/` (`aiw/.gitignore:4`):**

```
logs/DIAG-roadmap-invalid.md
logs/INCIDENT-2026-07-11.md
logs/000-sandbox/{objective,round1_executor,round1_reviewer,summary}.md
logs/001-console-projector/{objective,round1_executor,round1_reviewer,summary}.md
logs/002-canonical-path-and-autoproject/{objective,round1_executor,round1_reviewer,summary}.md
logs/002-canonical-path-and-autoproject-orphan-20260711/objective.md
logs/003-roadmap-emitter/{objective,round1_executor,round1_reviewer,summary}.md
logs/003b-startup-projection-all-views/{objective,round1_executor,round1_reviewer,summary}.md
logs/004-snapshot-enrichment/{objective,round1_executor,round1_reviewer,summary}.md
logs/005-roadmap-contract-fix/{objective,round1_executor,round1_reviewer,summary}.md
logs/006-roadmap-delivery-path/{objective,round1_executor,round1_reviewer,summary}.md
```

**1 bajo `sandbox/` (`aiw/.gitignore:1`):**

```
sandbox/000-sandbox.md
```

Las 36 rutas se verificaron **individualmente** con `git check-ignore -v`, que
devuelve la línea del `.gitignore` que las captura. No se agrupó por prefijo.

Entre ellas van **los dos incidentes cuya cadena probatoria [[D-053]] rescata**:
`logs/INCIDENT-2026-07-11.md` y el forense del `000-sandbox`.

## 6.4 Las 34 que sí viajarían

3 de raíz (`CONSTITUCION.md`, `CONTEXTO.md`, `claude.md`) · 22 de `objectives/`
(11 `processed`, 3 `parked`, 3 `qualification`, 3 `queue-e7`, 2 `pending`) ·
6 de `records/` · 2 de `prompts/` · 1 de `templates/`.

## 6.5 Diferencia con `MEDICION §4.3`, y su causa

| Medida | `MEDICION §4.3` | Medido aquí | Δ |
|---|---:|---:|---:|
| Entradas escaneadas | 70 | **70** | 0 |
| Gitignoreadas | 34 | **36** | **+2** |
| «~96 % ruido» (67 de 70 no son documentos) | 67 | **67** | 0 |

**El total coincide exacto; el reparto difiere en 2.** `MEDICION` repartió las 70
como 3 + 33 + 22 + 1 + 11; medido por directorio ahora: 3 raíz + **35** `logs/` +
22 `objectives/` + 1 `sandbox/` + **9** (`records` 6 + `prompts` 2 + `templates` 1).
Ambos suman 70.

**El corpus no cambió.** Ningún `.md` de `aiw` tiene `mtime` posterior a
**2026-07-23T20:07:42Z** (medido sobre los 70), y `MEDICION` se tomó el
2026-07-28 hacia las 01:00. **[INFERENCIA]:** la diferencia es un desliz de
clasificación en la prosa de `MEDICION` —dos archivos contados en el cajón de
«prompts, records y template» estando bajo `logs/`—, no deriva del disco. Lo
**medido** es que el corpus es el mismo y que los dos repartos discrepan en 2
sumando ambos 70. **La cifra que cuenta para la reproducibilidad es la de
`git check-ignore`: 36.**

## 6.6 **VEREDICTO: NO. Este archivo NO sale igual en otra máquina.**

Un clon fresco de `aiw` emitiría un `docs_index.json` de **34 entradas**, no de 70:
**36 de las 70 —el 51,4 %— desaparecerían**, porque su fuente está gitignoreada y
existe solo en esta máquina.

Tres precisiones que sostienen el veredicto:

1. **La SELECCIÓN es lo no reproducible, y es lo grave.** El escaneo
   (`listMarkdownFiles`, `PROJ:1050-1069`) salta solo `.git`, `.aiw`, `.project`,
   `node_modules` y `tests` (`PROJ:700`) y **no consulta `.gitignore`**. Lo que
   entra al índice depende de qué archivos hay en el disco, no de qué archivos
   tiene el repo.
2. **Ningún artefacto sale byte-idéntico entre máquinas**, éste incluido, porque
   `sources[].mtime` y el `freshness` por entrada son `mtime` y un checkout los
   reescribe. Eso es **por diseño** (§6 lo elige explícitamente: falla ruidoso,
   nunca silencioso) y **no es un defecto**. La diferencia entre este archivo y los
   otros tres no es el `mtime`: es que en los otros tres la **selección** sale del
   canónico trackeado y es idéntica en cualquier máquina.
3. **La ordenación no aporta deriva.** El emisor ordena por unidades de código y
   documenta por qué (`PROJ:1057-1059`): una colación dependiente de locale haría
   que el orden emitido dependiera de la máquina. Ese eje está cerrado.

`MEDICION §4.3` había predicho exactamente esto —«sería además distinto en cada
máquina»— y **la predicción se confirma, con la cifra corregida de 36**. AIW sigue
siendo el único de los tres proyectos donde el escaneo produce un resultado no
reproducible.

---

# 7. `git_history.json` — medido, NO resuelto

## 7.1 Lo medido

| Clave | Valor emitido | Contraste con git (lectura) | ¿Coincide? |
|---|---|---|---|
| `commit_total` | **34** | `git rev-list --count main` = **34** | **sí** |
| `commits.length` | **34** | — | consistente con `commit_total` |
| `head` | `77b7ad5365b7b0…` | `git rev-parse main` = `77b7ad5365b7b0…` | **sí** |
| `default_branch` | `"main"` | `refs/remotes/origin/HEAD` → `refs/remotes/origin/main` | **sí** |
| `branch_scope` | `"default_branch"` | la regla de §19, declarada en el artefacto | — |
| `branches` | `["main"]` | 1 rama local: `main` | **sí** |
| `current_branch` | **ausente** | §19 lo eliminó en `O4.P13` | correcto |
| `model` | `"git_history_v1"` | — | — |
| commits con `run_id` derivado | **0** | ningún subject cita un `run_id` del árbol | — |

**La detección de rama por defecto funcionó limpia**, tal como `MEDICION §4.4`
anticipó («mejor caso de los tres»): `aiw` tiene un remoto
(`github.com/ChrissValdez/aiw.git`), su `refs/remotes/origin/HEAD` declara `main`,
y hay **una sola rama local**. Sin ambigüedad y sin caída a heurística.

Diferencia con `MEDICION §4.4`, que midió **33 commits**: hoy son **34**, y la
causa es exacta y benigna — el commit `77b7ad5` («roadmap: primer canonico de AIW
— 6 objetivos, 29 fases, 42 runs, layout repo_root (D-052)», 2026-07-28 14:47:59
-0600) es **posterior a aquella medición**. 33 + 1 = 34. **Es la señal que §19
prometía que sería**: una diferencia de conteo ya es una diferencia real de
commits, no una propiedad de la máquina.

## 7.2 Lo que NO se hizo, y por qué

**[[D-053]], adjudicación 4, mandó `.project/git_history.json` a DE-MÁQUINA en
TODO emisor**, con la razón estructural de que el commit que lo actualiza lo
desactualiza. **Esa ejecución para `aiw` es un run `planned` (`O2.P1`).**

**Por tanto, hoy el emisor lo sigue emitiendo igual que para los otros dos
proyectos, y este encargo no lo cambia.** No se tocó el emisor, no se tocó ningún
`.gitignore`, no se mudó ni borró nada. **Medido y no resuelto**, que es lo que el
encargo pidió.

---

# 8. La frontera de `aiw`, con números

## 8.1 A la entrada — coincidió, por eso el encargo siguió

| Medida | Declarado por el encargo | Medido a la entrada | ¿Coincide? |
|---|---|---|---|
| `git rev-parse --short HEAD` | `77b7ad5` | `77b7ad5` (`77b7ad5365b7b0ced984b04caee1c04bc9d2dbc8`) | **sí** |
| `git status --porcelain` | 0 líneas | **0 líneas** | **sí** |

Contexto adicional, medido a la entrada y continuo con `ESCRITURA §1.2`: **147**
archivos (excl. `.git`), md5 del manifiesto `c05c72fbd88cb7c78e5e63e11b88d53b` —
**el mismo valor que `ESCRITURA` dejó a su salida**—, **53** archivos trackeados,
y `aiw/.project/` **inexistente**: ésta es la **primera** emisión.

## 8.2 A la salida

| Medida | Antes | Después | Lectura |
|---|---|---|---|
| `git rev-parse --short HEAD` | `77b7ad5` | `77b7ad5` | **sin cambio** — no se commiteó |
| `git status --porcelain -uall` | 0 líneas | **4 líneas, las 4 `??`** | 4 archivos nuevos |
| líneas que **no** son `??` | 0 | **0** | **cero modificados, cero staged, cero borrados** |
| `git diff HEAD --stat` | vacío | **vacío** | ni un byte trackeado cambió |
| `git diff HEAD --stat -- roadmap/roadmap.json` | vacío | **vacío** | **el canónico no se tocó** |
| `git ls-files` | 53 | **53** | nada entró al índice |
| archivos (excl. `.git`) | 147 | **151** | +4 |
| md5 del manifiesto | `c05c72fbd88cb7c78e5e63e11b88d53b` | `9cea13aceffca0ba6db460da89af9d74` | cambia, y debe: el manifiesto es de contenido y hay 4 archivos más |

Las 4 líneas de porcelain, literales:

```
?? .project/docs_index.json
?? .project/git_history.json
?? .project/roadmap.json
?? .project/snapshot.json
```

**Los archivos nuevos son EXACTAMENTE los de `.project/`.** Cero fuera de esa
carpeta. **El canónico `roadmap/roadmap.json` no cambió, probado con
`git diff --stat` vacío, no de vista.**

Comprobado además: **`.project/` NO está gitignoreado** en `aiw` (los 4 archivos
dan `NO ignorado` en `git check-ignore`), así que son **trackeables** y la decisión
de commitear es real, no está bloqueada por el `.gitignore`.

## 8.3 Frontera de `aiw-console`

HEAD `122bd9f`, sin cambio. `git diff --stat` sobre todo el repo sale **vacío**:
**cero archivos trackeados modificados** — el proyector no se tocó y el roadmap de
la consola tampoco. El único archivo escrito fuera de `aiw` es **este record**. No
se tocó `CONTRATO.md`, ni `DECISIONES.md`, ni ningún otro record, ni el registro de
proyectos.

**Escritura concurrente de otro carril, detectada y NO tocada.** Al cerrar,
`aiw-console` tiene **dos** archivos sin trackear: este record (mtime `15:08:50`) y
`records/RESTITUCION-ARISTAS-47-Y-AUDITORIA-AL-CIERRE-CANTU.md` (mtime `15:05:27`),
que **no es de este encargo** — es del hilo paralelo de `cantu-studio`, que el
encargo declaró abierto y fuera de alcance. Este encargo hizo exactamente cinco
escrituras: los **cuatro** archivos de `aiw/.project/` y **este record**. Se
registra por el mismo motivo por el que lo hizo `ESCRITURA §1.2` con el caso
equivalente: es el escenario de carriles paralelos operando de verdad, y callarlo
dejaría un archivo nuevo sin dueño en el reporte de frontera.

**git se usó solo en lectura**: `rev-parse`, `status`, `diff --stat`,
`check-ignore`, `ls-files`, `rev-list --count`, `log -1`, `branch`,
`symbolic-ref`, `remote get-url`. **No se commiteó nada.**

Tampoco se levantó la consola, el server legacy ni el validador, y no se corrió
ninguna suite. No se creó `governance/`, no se curó el `docs_index`, no se ejecutó
[[D-053]] y no se escribió ninguna entrada de `DECISIONES.md`.

---

# 9. Recomendación de qué commitear — la cabina decide

El taller vio los números; van con su razón, artefacto por artefacto. **Esto es
recomendación, no acto:** este encargo no commitea.

## 9.1 COMMITEAR — los dos del árbol

| Artefacto | Bytes | Razón |
|---|---:|---|
| `.project/snapshot.json` | 103.283 | Es **el único requerido** (§8) y **es lo que hace que AIW se renderice fuera de esta máquina**, que es el propósito declarado en [[D-053]] adjudicación 4. Deriva de un archivo **trackeado** (`roadmap/roadmap.json`): su selección y sus 42 títulos salen idénticos en cualquier clon. |
| `.project/roadmap.json` | 98.935 | Misma fuente trackeada, mismo bloque de árbol byte a byte (verificado, bloque 4). Sin él se pierden las vistas de detalle del roadmap (§19). |

Ambos alineados con [[D-053]] adjudicación 4: «el resto de `.project/` de AIW SÍ se
versiona… es reproducible y comparable».

## 9.2 NO COMMITEAR — `git_history.json`

`.project/git_history.json` (12.971 b). **Razón: ya está adjudicado.** [[D-053]]
adjudicación 4 lo mandó a **de-máquina en todo emisor**, y el argumento es
estructural: *el commit que lo actualiza lo desactualiza* —describe N commits y su
commit es el N+1— y es el único artefacto cuya fuente (`.git`) **ya viaja con todo
clon**, así que regenerarlo en local es siempre posible y siempre más fresco.

Este encargo lo confirma con su propio número: el artefacto declara `head`
`77b7ad5` y `commit_total` 34; **commitearlo lo dejaría declarando 34 en el
instante en que el repo pasa a tener 35.**

Hacer permanente esa exclusión (una línea de `.gitignore`) **es `O2.P1`, un run
`planned`** — no se toca hoy. **Mientras tanto, hay que dejarlo fuera del `git add`
a mano**, y conviene que la cabina lo sepa: hoy nada lo impide automáticamente.

## 9.3 NO COMMITEAR HOY — `docs_index.json`, y aquí está el juicio

`.project/docs_index.json` (27.399 b). **Esta recomendación diverge de la letra de
[[D-053]] adjudicación 4** («el resto de `.project/` de AIW SÍ se versiona»), y se
declara como divergencia. La razón es un número que [[D-053]] no tenía delante,
porque se midió hoy:

**36 de sus 70 entradas —el 51,4 %— apuntan a archivos que no existen fuera de
esta máquina.** Commitearlo publica un artefacto donde **más de la mitad de las
rutas serían punteros muertos en cualquier clon**.

Tres razones, en orden de peso:

1. **Contradice el modo de fallo que el contrato eligió.** §7 prohíbe emitir un
   puntero roto y el emisor lo cumple **en el instante de emitir en esta máquina**.
   Commiteado, ese mismo archivo llega a otra máquina con 36 punteros rotos, y la
   pestaña Docs los **lista como si existieran**: fallo **silencioso** hasta que
   alguien hace clic. §20 es explícito en la dirección contraria: «fallar ruidoso,
   nunca silencioso — también al leer».
2. **La ausencia degrada MEJOR que la presencia falsa.** Sin el archivo, §19 manda
   anunciar «Docs index unavailable» nombrándolo, y §19 exige además **distinguir
   índice AUSENTE de índice VACÍO**. Con el archivo, no hay nada que anunciar y el
   consumidor afirma 70 documentos de los que 36 no están. Entre una pestaña que
   dice honestamente que le falta su fuente y una que miente en la mitad de sus
   filas, el contrato ya eligió.
3. **`.project/` es derivada y regenerable (§2, §18).** En otra máquina el emisor
   produce el índice correcto de 34 entradas por sí solo. Commitear éste **congela
   una respuesta específica de esta máquina y le gana la mano a la respuesta buena**
   que la otra máquina habría obtenido regenerando.

**La salida limpia ya está en el árbol y es un run `planned`: `O2.P5(b)`, el índice
curado.** Un índice curado es transportado, no escaneado (`PROJ:1089-1091`), sale
de un archivo trackeado y entonces **sí** es reproducible y **sí** debería
commitearse. Hasta ese día, el hueco anunciado cuesta menos que las 36 filas
muertas.

**La alternativa, dicha con su costo, porque la decisión es de la cabina:**
commitearlo igual, sujeto a [[D-053]], aceptando que la pestaña Docs de AIW muestre
36 entradas inabribles en toda máquina que no sea ésta hasta que `O2.P5(b)` corra.
Es defendible —AIW muestra *algo* antes—; simplemente no es lo que el taller
recomienda con el 51,4 % delante.

## 9.4 Resumen

| Artefacto | Recomendación | Fundamento |
|---|---|---|
| `.project/snapshot.json` | **COMMITEAR** | requerido §8; fuente trackeada; reproducible |
| `.project/roadmap.json` | **COMMITEAR** | fuente trackeada; reproducible |
| `.project/git_history.json` | **NO** | [[D-053]] adj. 4 — de-máquina, ya adjudicado |
| `.project/docs_index.json` | **NO hoy** | 36/70 punteros muertos fuera de esta máquina; esperar a `O2.P5(b)` |
| `.project/guardrails.json` | — | no existe; `O2.P4` |
| `.project/no_claims.json` | — | no existe; `O2.P4` |

Si se sigue la recomendación, el commit lleva **2 archivos y 202.218 bytes**, y
`.project/docs_index.json` + `.project/git_history.json` quedan sin trackear en el
árbol de trabajo. **Ninguno de los dos estorba a la consola en local**, que lee del
disco.

---

# 10. Lo que este encargo NO estableció

- **[NO VERIFICADO]** que los dos banners de Governance («Project guardrails
  unavailable.», «Claims table unavailable.») aparezcan en pantalla: la consola no
  se levantó. Lo del bloque 5.3 es **lectura de código**.
- **[NO VERIFICADO]** que la consola renderice AIW de punta a punta con este
  `.project/`. Se midió que los artefactos existen y conforman; **no** que el shell
  los sirva. El tercer embudo de `SERVE-SHELL` (`MEDICION §4.1`) ya no debería
  fallar, porque `detectRootLayout(aiw)` ahora reclama el root — **[INFERENCIA]**
  desde `layout=repo_root` en la salida del emisor, no observación del shell.
- **[NO VERIFICADO]** qué pasó con las dos vistas mode-1 que
  `serve-project-console.mjs` emitía incondicionalmente ([[D-052]], la incógnita
  declarada). Sigue sin despejarse y sigue sin condicionar nada.
- **[INFERENCIA]** la causa de la diferencia 34→36 gitignoreadas contra
  `MEDICION §4.3` (bloque 6.5). Lo medido es que el corpus no cambió y que los dos
  repartos discrepan en 2 sumando ambos 70.
- No se midió el `.project/` de `cantu-studio`. `aiw-console` se **leyó** solo para
  el contraste de `emitted_artifacts` (bloque 5.3); **no se re-emitió ninguno de
  los dos**.

---

# 11. Cierre

**Los seis criterios de forma se cumplieron:** el proyector se localizó y su
versión se verificó en el archivo (`0.9.0`, `PROJ:89`); se emitió y se listaron los
artefactos con sus números; el snapshot pasa las 14 claves de §3 y trae `sources` y
`taxonomy_model`; los cinco números del roadmap coinciden exactos con el canónico
(**6 / 29 / 42 / 1..42 / 12 `completed` + 30 `planned`**); la degradación se midió y
se transcribió; y `docs_index` tiene veredicto.

**Los tres hechos que la cabina necesita:**

1. **AIW ya tiene `.project/`, y el volteo de modo funcionó** —
   `mode=roadmap_tree layout=repo_root project=aiw`. La consecuencia (c) de
   [[D-052]] está ejecutada.
2. **El emisor no fabricó nada sin fuente.** `guardrails` y `no_claims` no
   existen, y el banner por sección del consumidor los anuncia por su nombre. **No
   hay hallazgo grave.**
3. **`docs_index.json` no es reproducible: 36 de 70 entradas no viajan.** Es el
   único de los cuatro artefactos con ese defecto, la causa está en el árbol como
   run `planned` (`O2.P5(b)`), y es lo que sostiene la única recomendación de este
   record que diverge de una decisión escrita.

**La frontera se respetó:** 4 archivos nuevos, todos bajo `.project/`, cero
modificados, `git diff HEAD --stat` vacío, `roadmap/roadmap.json` intacto, el
proyector sin tocar y sin un solo commit.
