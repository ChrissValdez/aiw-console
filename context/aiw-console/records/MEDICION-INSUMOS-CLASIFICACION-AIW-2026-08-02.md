# MEDICIÓN DE INSUMOS PARA CLASIFICACIÓN — `aiw`

- **Fecha de medición:** 2026-08-02
- **Canónico medido:** `aiw/roadmap/roadmap.json` (118962 bytes UTF-8)
- **Emisión medida:** `aiw/.project/roadmap.json` (119211 bytes UTF-8)
- **Naturaleza:** encargo de MEDICIÓN. No clasifica, no propone valores, no escribe en `aiw`.
- **Método de lectura:** Node 24 (`fs.readFileSync(..., "utf8")` + `JSON.parse`). Ninguna lectura por PowerShell.
- **Población:** DERIVADA, no tecleada — los runs con `status == "planned"` en el canónico.

---

## 0. Declaración de discrepancia (primera línea)

**SIN DISCREPANCIA.** Toda cifra afirmada por el ticket se verificó contra el canónico y coincide con el valor real:
población `planned` = **21**; total de runs = **46**; **25** completed / **21** planned; `queue_order` denso, único y contiguo **1..46**; **21** aristas `depends_on`; **0** colgantes; **6** objetivos; **33** fases con **1** vacía; **0** runs con campos de clasificación escritos.

Las cifras del ticket se trataron como valores a verificar, no como hechos. Se verificaron una por una y ninguna se dio por buena de antemano.

## 0-bis. Condiciones de ALTO

El encargo define cinco condiciones de parada. Estado de cada una:

| # | Condición de ALTO | Verificación | Resultado |
|---|---|---|---|
| 1 | `aiw/.project/roadmap.json` no existe | archivo presente, 119211 bytes | **NO se dispara** |
| 2 | el canónico no parsea | `JSON.parse` correcto, 46 runs | **NO se dispara** |
| 3 | la cuenta de `planned` es cero | `planned` = 21 | **NO se dispara** |
| 4 | algún run `planned` diverge en alguno de los 5 campos | 21 runs × 5 campos comparados | **NO se dispara** |
| 5 | algún run `planned` falta en la emisión | 0 ausentes | **NO se dispara** |

**Ninguna condición de ALTO se dispara.** La medición se entrega completa.

---

## 1–2. Población y re-medición de estado del canónico

| Métrica | Valor del ticket | **Valor real medido** | ¿Coincide? |
|---|---|---|---|
| Total de runs | 46 | **46** | sí |
| `status: completed` | 25 | **25** | sí |
| `status: planned` (= la población) | 21 | **21** | sí |
| Aristas `depends_on` | 21 | **21** | sí |
| Aristas colgantes (destino inexistente) | 0 | **0** | sí |
| Objetivos | 6 | **6** | sí |
| Fases | 33 | **33** | sí |
| Fases sin runs | 1 | **1** | sí |
| Runs con campos de clasificación | 0 | **0** | sí |

**Cuenta por status (exhaustiva, no solo los dos esperados):**

| status | runs |
|---|---|
| `completed` | 25 |
| `planned` | 21 |
| **total** | **46** |

**`queue_order` — denso, único y contiguo desde 1:**

| Propiedad | Resultado |
|---|---|
| Mínimo | 1 |
| Máximo | 46 |
| Todos enteros | sí |
| Único (sin duplicados) | sí |
| Duplicados | ninguno |
| Huecos en 1..46 | ninguno |
| Máximo == total de runs (denso) | sí |
| **Veredicto** | **DENSO, ÚNICO Y CONTIGUO 1..46** |

**`run_id` duplicados:** ninguno — los 46 `run_id` son distintos.

**Aristas colgantes:** ninguna. Los 21 destinos `depends_on` resuelven a un `run_id` existente.

**Fases sin runs (nombradas):**

| phase_id | Título de la fase (verbatim) | Objetivo |
|---|---|---|
| `O6.P1` | Per-project push activation | Categories and batches (`O6`) |

---

## 3. Equivalencia canónico ↔ emisión — criterio central

Comparación de los **21** runs `planned` entre `aiw/roadmap/roadmap.json` y `aiw/.project/roadmap.json`.
El `full_description` se comparó **byte a byte** (`Buffer.equals` sobre la codificación UTF-8), no por igualdad laxa de cadenas.

| Campo comparado | Runs que coinciden | De un total de | Divergentes |
|---|---|---|---|
| `full_description` | **21** | 21 | 0 |
| `title` | **21** | 21 | 0 |
| `queue_order` | **21** | 21 | 0 |
| `status` | **21** | 21 | 0 |
| `depends_on` | **21** | 21 | 0 |

- Runs `planned` ausentes de la emisión: **0**
- Runs totales en la emisión: **46** (canónico: 46)

**RESULTADO: EQUIVALENCIA COMPLETA.** Los 21 runs `planned` coinciden en los cinco campos (`full_description` byte a byte, `title`, `queue_order`, `status`, `depends_on`). **No hay divergencia. No se dispara el ALTO. No se reparó ni se re-emitió nada.**

Nota de hecho, sin interpretar: los dos archivos difieren en tamaño total (118962 vs 119211 bytes, Δ 249). Esa diferencia queda **fuera** de los cinco campos comparados sobre los runs `planned`, que son idénticos. No se investigó su origen — ver §10.

---

## 4. Anclas de verificación

Una fila por run `planned`, ordenada por `queue_order` ascendente. `md5` es del `full_description` en bytes UTF-8.
**Es una sola tabla lógica, partida en dos por legibilidad:** 4-A lleva las métricas, 4-B lleva los extremos verbatim. Se unen por `queue_order`.

**PROHIBICIÓN RESPETADA:** en ningún punto de este record se reproduce un `full_description` completo. Solo los 100 primeros y los 100 últimos caracteres de cada uno.

### 4-A. Métricas y huella

| queue_order | run_id | Título (verbatim) | chars `full_description` | bytes UTF-8 | md5 del `full_description` |
|---|---|---|---|---|---|
| 22 | `RUN-AIW-REAL-LOAD-MEASUREMENT-001` | Run the first real objective against a large repository with a test net | 1167 | 1176 | `d9f63ec339545738522834dcefd21fb7` |
| 23 | `RUN-AIW-SCOPE-PREFLIGHT-GUARD-001` | Make the scope pre-flight demand a real match | 2252 | 2265 | `7cb85854d725fded0a2907fdcc95eba3` |
| 28 | `RUN-AIW-SHARED-WORKING-BRANCH-001` | Let consecutive runs share one working branch so their work chains | 2524 | 2528 | `1b09837920efce05419c291aa650f48f` |
| 29 | `RUN-AIW-PUSH-IS-PART-OF-CLOSURE-001` | A failed push escalates to human review instead of closing the run silently | 2755 | 2765 | `f2d8081aede1cdf8bf36cc679830372e` |
| 30 | `RUN-AIW-PER-PROJECT-PUSH-001` | Turn on push per project | 2665 | 2676 | `0e40c5c72d23b07fd078c5c30b219a22` |
| 31 | `RUN-AIW-INTAKE-001` | The intake: turn a roadmap run into an executable contract | 2560 | 2572 | `3f2f646450589d124b5d3409c11e89a2` |
| 32 | `RUN-AIW-PROVIDER-PER-ROLE-001` | Declare providers in config and choose one per role in the ticket | 1992 | 2002 | `804173db508fb2412cbdeaec785c6b28` |
| 33 | `RUN-AIW-RUN-IDENTITY-001` | Give every run an identity its log folder cannot silently overwrite | 3209 | 3224 | `173e58c35699bf4408e272c77f9f6a06` |
| 34 | `RUN-AIW-RUN-MANIFEST-001` | Write one manifest of identity and outcome per run | 2581 | 2596 | `73c7c31bf02e47f14a81a23abbd00b93` |
| 35 | `RUN-AIW-RUN-COST-ACCOUNTING-001` | Record tokens and cost per run, if the provider exposes them | 1928 | 1939 | `8bf00d5f5583a3535ff1aeb6bfff40e9` |
| 36 | `RUN-AIW-MID-RUN-SIGNALS-001` | Expose signals the reviewer can query instead of trusting self-reports | 2049 | 2063 | `f1ab92e97d8c9f16b00a370aa0963b5e` |
| 37 | `RUN-AIW-EVIDENCE-SCHEMA-DOCUMENTATION-001` | Document what a run writes and where | 1915 | 1920 | `387c9b5b3eaaf84151ad8aa6911cef5e` |
| 38 | `RUN-AIW-RUN-CATEGORY-FIELD-001` | Add the category field and settle its vocabulary | 4511 | 4535 | `608f1635aca5d95c37a4428051a22c50` |
| 39 | `RUN-AIW-BATCH-TO-BRANCH-001` | Let the operator group runs into batches, and let the batch decide the branch | 2278 | 2285 | `c704a92a519993d5c27ad9868340c33a` |
| 40 | `RUN-AIW-CATEGORIES-BATCHES-DOCUMENTATION-001` | Document categories and batches | 1467 | 1472 | `d618fc9b9e821fd559208915c131162b` |
| 41 | `RUN-AIW-DECOUPLED-QUEUE-LAUNCHER-001` | Make the queue survive the terminal that launched it | 2929 | 2954 | `bd37fb43c8040346b0d7a81cedb16e3e` |
| 42 | `RUN-AIW-ORPHAN-LOCK-RECOVERY-001` | Recover from a lock whose owner is gone | 2155 | 2160 | `183b14627fb3db8d3a0481be6e88e6b7` |
| 43 | `RUN-AIW-WORKTREES-PER-RUN-001` | Give each run its own worktree so runs can overlap inside one repository | 1911 | 1914 | `a3265c721a167c26d51609c8eec6ebf4` |
| 44 | `RUN-AIW-KERNEL-READS-LANES-001` | Teach the kernel to read lanes and barriers | 2305 | 2318 | `d8a0f7a824f58f8959f1be702bd3ccc5` |
| 45 | `RUN-AIW-LONG-UNATTENDED-SESSIONS-001` | Run real long unattended sessions and count them honestly | 1951 | 1959 | `e31664560d9ef41e5e93653b6b3bd336` |
| 46 | `RUN-AIW-UNATTENDED-OPERATION-DOCUMENTATION-001` | Document how to run and audit an unattended window | 1684 | 1687 | `c9f4e5fc2947ec49dd01b1da4ef4c1c0` |

### 4-B. Extremos verbatim — primeros 100 y últimos 100 caracteres

Ambos extremos, no solo el principio: un ancla en la primera mitad no detectaría un truncamiento en la segunda.
Van en bloque de código para preservar los saltos de línea tal cual. Delimitadores `«` … `»` — no forman parte del texto.

```text
[qo 22] RUN-AIW-REAL-LOAD-MEASUREMENT-001  (1167 chars · md5 d9f63ec33954…)
  HEAD-100 «Everything approved so far was against small repositories and closed in round one. Every single run »
  TAIL-100 «rement.

No mechanism under CONST §4: this run measures, it does not add code or a new step (D-055).»

[qo 23] RUN-AIW-SCOPE-PREFLIGHT-GUARD-001  (2252 chars · md5 7cb85854d725…)
  HEAD-100 «The leak is verified on disk: an objective's # Scope is validated ONLY for being non-empty. A scope »
  TAIL-100 «ame what it deletes: to add, something is removed (CONST:28-29). It is born planned for this reason.»

[qo 28] RUN-AIW-SHARED-WORKING-BRANCH-001  (2524 chars · md5 1b09837920ef…)
  HEAD-100 «MEASURED, NOT ASSUMED: consecutive runs do not chain. kernel.mjs:312 and :318 check out the base bra»
  TAIL-100 «lanned for this reason. NOTE THAT THE FIRST REAL CHAINED QUEUE WILL PRODUCE THIS INCIDENT BY ITSELF.»

[qo 29] RUN-AIW-PUSH-IS-PART-OF-CLOSURE-001  (2755 chars · md5 f2d8081aede1…)
  HEAD-100 «MEASURED: kernel.mjs:432 reports a failed push and continues. A run can therefore close APPROVED wit»
  TAIL-100 «on for whoever executes this run, not a precondition of it. VERIFY THE LINE REFERENCES AGAINST DISK.»

[qo 30] RUN-AIW-PER-PROJECT-PUSH-001  (2665 chars · md5 0e40c5c72d23…)
  HEAD-100 «THIS RUN GOES FIRST IN ITS OBJECTIVE, AND THE REASON IS WRITTEN DOWN RATHER THAN ASSUMED. D-029 defi»
  TAIL-100 «ther than from safety, and it was wrong. VERIFY THE LINE REFERENCE AGAINST DISK before acting on it.»

[qo 31] RUN-AIW-INTAKE-001  (2560 chars · md5 3f2f64645058…)
  HEAD-100 «THE MEASURED GAP, AND IT IS THE LARGEST ONE IN THIS ROADMAP: kernel.mjs DOES NOT READ roadmap.json. »
  TAIL-100 «it is not resolved by whoever happens to pick this run up. Until it is settled, this run is planned.»

[qo 32] RUN-AIW-PROVIDER-PER-ROLE-001  (1992 chars · md5 804173db508f…)
  HEAD-100 «MEASURED: the kernel is already role-first in prompts and permissions — invokeClaude(role, ...) at k»
  TAIL-100 «ts declared line budget against the ceiling — VERIFY THE REAL FIGURES. Born planned for this reason.»

[qo 33] RUN-AIW-RUN-IDENTITY-001  (3209 chars · md5 173e58c35699…)
  HEAD-100 «logDir is fixed once, from the objective's name alone (K:283): no timestamp, no counter, and no chec»
  TAIL-100 «ssumes run evidence is unreachable from a clone must be re-measured against disk before it executes.»

[qo 34] RUN-AIW-RUN-MANIFEST-001  (2581 chars · md5 73c7c31bf02e…)
  HEAD-100 «CONST §4 (D-055, case 1) — MECHANISM WITH ITS THREE FIXED CRITERIA COMPLETE. One of only three runs »
  TAIL-100 «ssumes run evidence is unreachable from a clone must be re-measured against disk before it executes.»

[qo 35] RUN-AIW-RUN-COST-ACCOUNTING-001  (1928 chars · md5 8bf00d5f5583…)
  HEAD-100 «CONDITIONAL RUN, AND IT IS ALLOWED TO DIE. Its precondition is that the provider expose token counts»
  TAIL-100 «his reason, and it carries a second reason to stay planned: its precondition may never be satisfied.»

[qo 36] RUN-AIW-MID-RUN-SIGNALS-001  (2049 chars · md5 f1ab92e97d8c…)
  HEAD-100 «Today the reviewer is handed a diff and the executor's own narrative, and it is read-only with a res»
  TAIL-100 «es this from the evaluation gate, which D-055 refused for having none. Born planned for this reason.»

[qo 37] RUN-AIW-EVIDENCE-SCHEMA-DOCUMENTATION-001  (1915 chars · md5 387c9b5b3eaa…)
  HEAD-100 «A forensic reconstruction of a dead run is only possible because the WRITE ORDER is knowable, and to»
  TAIL-100 «Held by the documentation lane barrier. No mechanism under CONST §4: documentation is paper (D-055).»

[qo 38] RUN-AIW-RUN-CATEGORY-FIELD-001  (4511 chars · md5 608f1635aca5…)
  HEAD-100 «The objective declares its category and THE KERNEL ACTS DIFFERENTLY AT CLOSEOUT: stopping at a safep»
  TAIL-100 «is run RE-COUNTS on disk, states which folders it counted, and trusts neither number from this text.»

[qo 39] RUN-AIW-BATCH-TO-BRANCH-001  (2278 chars · md5 c704a92a5199…)
  HEAD-100 «Each run belongs to a BATCH that the human defines when enqueuing, and the batch determines the bran»
  TAIL-100 «8 of about 500, 22 lines of slack; enforcement human and documentary). Born planned for this reason.»

[qo 40] RUN-AIW-CATEGORIES-BATCHES-DOCUMENTATION-001  (1467 chars · md5 d618fc9b9e82…)
  HEAD-100 «What this document has to carry. The three categories and the fact that the axis is WHAT HAPPENS AT »
  TAIL-100 «Held by the documentation lane barrier. No mechanism under CONST §4: documentation is paper (D-055).»

[qo 41] RUN-AIW-DECOUPLED-QUEUE-LAUNCHER-001  (2929 chars · md5 bd37fb43c804…)
  HEAD-100 «Today the queue dies with its terminal — or worse, it half-dies, leaving the executor alive and ungo»
  TAIL-100 «achable from any clone rather than from one machine. Nothing else in this run's declaration changes.»

[qo 42] RUN-AIW-ORPHAN-LOCK-RECOVERY-001  (2155 chars · md5 183b14627fb3…)
  HEAD-100 «The lock is one run per repository, and it is released in the closing finally. When the hosting proc»
  TAIL-100 «ut 500) or name what it deletes; enforcement is human and documentary. Born planned for this reason.»

[qo 43] RUN-AIW-WORKTREES-PER-RUN-001  (1911 chars · md5 a3265c721a16…)
  HEAD-100 «The security topology today is one run per repository at a time, enforced by a lockfile, and multi-p»
  TAIL-100 «8 of about 500, 22 lines of slack; enforcement human and documentary). Born planned for this reason.»

[qo 44] RUN-AIW-KERNEL-READS-LANES-001  (2305 chars · md5 d8a0f7a824f5…)
  HEAD-100 «CLOSES THE CIRCLE OF D-051, and the shape of the gap is the argument for this run. Lanes and barrier»
  TAIL-100 «8 of about 500, 22 lines of slack; enforcement human and documentary). Born planned for this reason.»

[qo 45] RUN-AIW-LONG-UNATTENDED-SESSIONS-001  (1951 chars · md5 e31664560d9e…)
  HEAD-100 «THE MILESTONE OF THIS OBJECTIVE, AND THE COUNTER IS HONESTLY AT ZERO. This is measured by running th»
  TAIL-100 «ONST §4: this run EXERCISES the mechanisms and measures the result; it adds none of its own (D-055).»

[qo 46] RUN-AIW-UNATTENDED-OPERATION-DOCUMENTATION-001  (1684 chars · md5 c9f4e5fc2947…)
  HEAD-100 «The document that makes the capability operable by someone who did not build it.

What it must carry»
  TAIL-100 «Held by the documentation lane barrier. No mechanism under CONST §4: documentation is paper (D-055).»

```

---

## 5. Grafo, por run

Para cada `planned`: quién lo declara (in-degree) y a quién declara (out-degree), nombrados por `run_id` **y** título, con el status de cada extremo.

| queue_order | run_id | Título | in° | out° |
|---|---|---|---|---|
| 22 | `RUN-AIW-REAL-LOAD-MEASUREMENT-001` | Run the first real objective against a large repository with a test net | 1 | 0 |
| 23 | `RUN-AIW-SCOPE-PREFLIGHT-GUARD-001` | Make the scope pre-flight demand a real match | 0 | 1 |
| 28 | `RUN-AIW-SHARED-WORKING-BRANCH-001` | Let consecutive runs share one working branch so their work chains | 0 | 0 |
| 29 | `RUN-AIW-PUSH-IS-PART-OF-CLOSURE-001` | A failed push escalates to human review instead of closing the run silently | 1 | 0 |
| 30 | `RUN-AIW-PER-PROJECT-PUSH-001` | Turn on push per project | 1 | 1 |
| 31 | `RUN-AIW-INTAKE-001` | The intake: turn a roadmap run into an executable contract | 0 | 0 |
| 32 | `RUN-AIW-PROVIDER-PER-ROLE-001` | Declare providers in config and choose one per role in the ticket | 0 | 0 |
| 33 | `RUN-AIW-RUN-IDENTITY-001` | Give every run an identity its log folder cannot silently overwrite | 2 | 0 |
| 34 | `RUN-AIW-RUN-MANIFEST-001` | Write one manifest of identity and outcome per run | 2 | 2 |
| 35 | `RUN-AIW-RUN-COST-ACCOUNTING-001` | Record tokens and cost per run, if the provider exposes them | 0 | 1 |
| 36 | `RUN-AIW-MID-RUN-SIGNALS-001` | Expose signals the reviewer can query instead of trusting self-reports | 1 | 0 |
| 37 | `RUN-AIW-EVIDENCE-SCHEMA-DOCUMENTATION-001` | Document what a run writes and where | 0 | 2 |
| 38 | `RUN-AIW-RUN-CATEGORY-FIELD-001` | Add the category field and settle its vocabulary | 2 | 1 |
| 39 | `RUN-AIW-BATCH-TO-BRANCH-001` | Let the operator group runs into batches, and let the batch decide the branch | 2 | 1 |
| 40 | `RUN-AIW-CATEGORIES-BATCHES-DOCUMENTATION-001` | Document categories and batches | 0 | 2 |
| 41 | `RUN-AIW-DECOUPLED-QUEUE-LAUNCHER-001` | Make the queue survive the terminal that launched it | 2 | 0 |
| 42 | `RUN-AIW-ORPHAN-LOCK-RECOVERY-001` | Recover from a lock whose owner is gone | 1 | 0 |
| 43 | `RUN-AIW-WORKTREES-PER-RUN-001` | Give each run its own worktree so runs can overlap inside one repository | 1 | 0 |
| 44 | `RUN-AIW-KERNEL-READS-LANES-001` | Teach the kernel to read lanes and barriers | 1 | 0 |
| 45 | `RUN-AIW-LONG-UNATTENDED-SESSIONS-001` | Run real long unattended sessions and count them honestly | 0 | 6 |
| 46 | `RUN-AIW-UNATTENDED-OPERATION-DOCUMENTATION-001` | Document how to run and audit an unattended window | 0 | 1 |

### 5-B. Detalle de aristas

**`RUN-AIW-REAL-LOAD-MEASUREMENT-001`** (qo 22 · `planned`) — Run the first real objective against a large repository with a test net

- declara en su `depends_on`: _nada_
- **lo declaran** ← `RUN-AIW-SCOPE-PREFLIGHT-GUARD-001` (qo 23 · status `planned`) — Make the scope pre-flight demand a real match

**`RUN-AIW-SCOPE-PREFLIGHT-GUARD-001`** (qo 23 · `planned`) — Make the scope pre-flight demand a real match

- **declara en su `depends_on`** → `RUN-AIW-REAL-LOAD-MEASUREMENT-001` (qo 22 · status `planned`) — Run the first real objective against a large repository with a test net
- lo declaran: _nadie_

**`RUN-AIW-PUSH-IS-PART-OF-CLOSURE-001`** (qo 29 · `planned`) — A failed push escalates to human review instead of closing the run silently

- declara en su `depends_on`: _nada_
- **lo declaran** ← `RUN-AIW-PER-PROJECT-PUSH-001` (qo 30 · status `planned`) — Turn on push per project

**`RUN-AIW-PER-PROJECT-PUSH-001`** (qo 30 · `planned`) — Turn on push per project

- **declara en su `depends_on`** → `RUN-AIW-PUSH-IS-PART-OF-CLOSURE-001` (qo 29 · status `planned`) — A failed push escalates to human review instead of closing the run silently
- **lo declaran** ← `RUN-AIW-RUN-CATEGORY-FIELD-001` (qo 38 · status `planned`) — Add the category field and settle its vocabulary

**`RUN-AIW-RUN-IDENTITY-001`** (qo 33 · `planned`) — Give every run an identity its log folder cannot silently overwrite

- declara en su `depends_on`: _nada_
- **lo declaran** ← `RUN-AIW-RUN-MANIFEST-001` (qo 34 · status `planned`) — Write one manifest of identity and outcome per run
- **lo declaran** ← `RUN-AIW-EVIDENCE-SCHEMA-DOCUMENTATION-001` (qo 37 · status `planned`) — Document what a run writes and where

**`RUN-AIW-RUN-MANIFEST-001`** (qo 34 · `planned`) — Write one manifest of identity and outcome per run

- **declara en su `depends_on`** → `RUN-AIW-EVIDENCE-PORTABILITY-001` (qo 12 · status `completed`) — Make AIW's execution evidence travel in git
- **declara en su `depends_on`** → `RUN-AIW-RUN-IDENTITY-001` (qo 33 · status `planned`) — Give every run an identity its log folder cannot silently overwrite
- **lo declaran** ← `RUN-AIW-RUN-COST-ACCOUNTING-001` (qo 35 · status `planned`) — Record tokens and cost per run, if the provider exposes them
- **lo declaran** ← `RUN-AIW-EVIDENCE-SCHEMA-DOCUMENTATION-001` (qo 37 · status `planned`) — Document what a run writes and where

**`RUN-AIW-RUN-COST-ACCOUNTING-001`** (qo 35 · `planned`) — Record tokens and cost per run, if the provider exposes them

- **declara en su `depends_on`** → `RUN-AIW-RUN-MANIFEST-001` (qo 34 · status `planned`) — Write one manifest of identity and outcome per run
- lo declaran: _nadie_

**`RUN-AIW-MID-RUN-SIGNALS-001`** (qo 36 · `planned`) — Expose signals the reviewer can query instead of trusting self-reports

- declara en su `depends_on`: _nada_
- **lo declaran** ← `RUN-AIW-LONG-UNATTENDED-SESSIONS-001` (qo 45 · status `planned`) — Run real long unattended sessions and count them honestly

**`RUN-AIW-EVIDENCE-SCHEMA-DOCUMENTATION-001`** (qo 37 · `planned`) — Document what a run writes and where

- **declara en su `depends_on`** → `RUN-AIW-RUN-IDENTITY-001` (qo 33 · status `planned`) — Give every run an identity its log folder cannot silently overwrite
- **declara en su `depends_on`** → `RUN-AIW-RUN-MANIFEST-001` (qo 34 · status `planned`) — Write one manifest of identity and outcome per run
- lo declaran: _nadie_

**`RUN-AIW-RUN-CATEGORY-FIELD-001`** (qo 38 · `planned`) — Add the category field and settle its vocabulary

- **declara en su `depends_on`** → `RUN-AIW-PER-PROJECT-PUSH-001` (qo 30 · status `planned`) — Turn on push per project
- **lo declaran** ← `RUN-AIW-BATCH-TO-BRANCH-001` (qo 39 · status `planned`) — Let the operator group runs into batches, and let the batch decide the branch
- **lo declaran** ← `RUN-AIW-CATEGORIES-BATCHES-DOCUMENTATION-001` (qo 40 · status `planned`) — Document categories and batches

**`RUN-AIW-BATCH-TO-BRANCH-001`** (qo 39 · `planned`) — Let the operator group runs into batches, and let the batch decide the branch

- **declara en su `depends_on`** → `RUN-AIW-RUN-CATEGORY-FIELD-001` (qo 38 · status `planned`) — Add the category field and settle its vocabulary
- **lo declaran** ← `RUN-AIW-CATEGORIES-BATCHES-DOCUMENTATION-001` (qo 40 · status `planned`) — Document categories and batches
- **lo declaran** ← `RUN-AIW-LONG-UNATTENDED-SESSIONS-001` (qo 45 · status `planned`) — Run real long unattended sessions and count them honestly

**`RUN-AIW-CATEGORIES-BATCHES-DOCUMENTATION-001`** (qo 40 · `planned`) — Document categories and batches

- **declara en su `depends_on`** → `RUN-AIW-RUN-CATEGORY-FIELD-001` (qo 38 · status `planned`) — Add the category field and settle its vocabulary
- **declara en su `depends_on`** → `RUN-AIW-BATCH-TO-BRANCH-001` (qo 39 · status `planned`) — Let the operator group runs into batches, and let the batch decide the branch
- lo declaran: _nadie_

**`RUN-AIW-DECOUPLED-QUEUE-LAUNCHER-001`** (qo 41 · `planned`) — Make the queue survive the terminal that launched it

- declara en su `depends_on`: _nada_
- **lo declaran** ← `RUN-AIW-LONG-UNATTENDED-SESSIONS-001` (qo 45 · status `planned`) — Run real long unattended sessions and count them honestly
- **lo declaran** ← `RUN-AIW-UNATTENDED-OPERATION-DOCUMENTATION-001` (qo 46 · status `planned`) — Document how to run and audit an unattended window

**`RUN-AIW-ORPHAN-LOCK-RECOVERY-001`** (qo 42 · `planned`) — Recover from a lock whose owner is gone

- declara en su `depends_on`: _nada_
- **lo declaran** ← `RUN-AIW-LONG-UNATTENDED-SESSIONS-001` (qo 45 · status `planned`) — Run real long unattended sessions and count them honestly

**`RUN-AIW-WORKTREES-PER-RUN-001`** (qo 43 · `planned`) — Give each run its own worktree so runs can overlap inside one repository

- declara en su `depends_on`: _nada_
- **lo declaran** ← `RUN-AIW-LONG-UNATTENDED-SESSIONS-001` (qo 45 · status `planned`) — Run real long unattended sessions and count them honestly

**`RUN-AIW-KERNEL-READS-LANES-001`** (qo 44 · `planned`) — Teach the kernel to read lanes and barriers

- declara en su `depends_on`: _nada_
- **lo declaran** ← `RUN-AIW-LONG-UNATTENDED-SESSIONS-001` (qo 45 · status `planned`) — Run real long unattended sessions and count them honestly

**`RUN-AIW-LONG-UNATTENDED-SESSIONS-001`** (qo 45 · `planned`) — Run real long unattended sessions and count them honestly

- **declara en su `depends_on`** → `RUN-AIW-DECOUPLED-QUEUE-LAUNCHER-001` (qo 41 · status `planned`) — Make the queue survive the terminal that launched it
- **declara en su `depends_on`** → `RUN-AIW-ORPHAN-LOCK-RECOVERY-001` (qo 42 · status `planned`) — Recover from a lock whose owner is gone
- **declara en su `depends_on`** → `RUN-AIW-WORKTREES-PER-RUN-001` (qo 43 · status `planned`) — Give each run its own worktree so runs can overlap inside one repository
- **declara en su `depends_on`** → `RUN-AIW-KERNEL-READS-LANES-001` (qo 44 · status `planned`) — Teach the kernel to read lanes and barriers
- **declara en su `depends_on`** → `RUN-AIW-MID-RUN-SIGNALS-001` (qo 36 · status `planned`) — Expose signals the reviewer can query instead of trusting self-reports
- **declara en su `depends_on`** → `RUN-AIW-BATCH-TO-BRANCH-001` (qo 39 · status `planned`) — Let the operator group runs into batches, and let the batch decide the branch
- lo declaran: _nadie_

**`RUN-AIW-UNATTENDED-OPERATION-DOCUMENTATION-001`** (qo 46 · `planned`) — Document how to run and audit an unattended window

- **declara en su `depends_on`** → `RUN-AIW-DECOUPLED-QUEUE-LAUNCHER-001` (qo 41 · status `planned`) — Make the queue survive the terminal that launched it
- lo declaran: _nadie_

**Runs `planned` con in-degree 0 y out-degree 0 (3):**

| queue_order | run_id | Título |
|---|---|---|
| 28 | `RUN-AIW-SHARED-WORKING-BRANCH-001` | Let consecutive runs share one working branch so their work chains |
| 31 | `RUN-AIW-INTAKE-001` | The intake: turn a roadmap run into an executable contract |
| 32 | `RUN-AIW-PROVIDER-PER-ROLE-001` | Declare providers in config and choose one per role in the ticket |

---

## 6. Censo de superficies nombradas

Extracción textual, **sin interpretar**. Patrón: todo token que termine en `.mjs`, `.json` o `.md`, con o sin sufijo `:NNN` de línea, 
sobre el texto concatenado de `full_description` + `summary`. Coincidencia insensible a mayúsculas en la extensión.

**Esto es materia prima para contar consumidores. No se interpreta aquí: un token que casa el patrón se cuenta, exista el archivo o no, sea ruta real o mención en prosa.**

- Rutas distintas nombradas por los 46 runs del roadmap: **54**
- Rutas distintas nombradas por los 21 runs `planned`: **20**

### 6-A. Run `planned` → rutas distintas que nombra

| queue_order | run_id | nº rutas distintas | menciones totales | Rutas |
|---|---|---|---|---|
| 22 | `RUN-AIW-REAL-LOAD-MEASUREMENT-001` | 0 | 0 | _ninguna_ |
| 23 | `RUN-AIW-SCOPE-PREFLIGHT-GUARD-001` | 2 | 2 | `DECISIONES.md`, `kernel.mjs` |
| 28 | `RUN-AIW-SHARED-WORKING-BRANCH-001` | 3 | 3 | `DECISIONES.md`, `kernel.mjs:312`, `kernel.mjs:324` |
| 29 | `RUN-AIW-PUSH-IS-PART-OF-CLOSURE-001` | 6 | 6 | `DECISIONES.md`, `kernel.mjs`, `kernel.mjs:181`, `kernel.mjs:194`, `kernel.mjs:432`, `summary.md` |
| 30 | `RUN-AIW-PER-PROJECT-PUSH-001` | 3 | 3 | `config.json`, `kernel.mjs:432`, `summary.md` |
| 31 | `RUN-AIW-INTAKE-001` | 4 | 5 | `CONSTITUCION.md:30`, `DECISIONES.md`, `kernel.mjs`, `roadmap.json` |
| 32 | `RUN-AIW-PROVIDER-PER-ROLE-001` | 4 | 5 | `DECISIONES.md`, `config.json`, `kernel.mjs:123`, `kernel.mjs:232` |
| 33 | `RUN-AIW-RUN-IDENTITY-001` | 1 | 1 | `objective.md` |
| 34 | `RUN-AIW-RUN-MANIFEST-001` | 1 | 1 | `objective.md` |
| 35 | `RUN-AIW-RUN-COST-ACCOUNTING-001` | 1 | 1 | `DECISIONES.md` |
| 36 | `RUN-AIW-MID-RUN-SIGNALS-001` | 1 | 1 | `DECISIONES.md` |
| 37 | `RUN-AIW-EVIDENCE-SCHEMA-DOCUMENTATION-001` | 6 | 8 | `_executor.md`, `_reviewer.md`, `kernel.mjs`, `objective.md`, `proposed_followup.md`, `summary.md` |
| 38 | `RUN-AIW-RUN-CATEGORY-FIELD-001` | 0 | 0 | _ninguna_ |
| 39 | `RUN-AIW-BATCH-TO-BRANCH-001` | 0 | 0 | _ninguna_ |
| 40 | `RUN-AIW-CATEGORIES-BATCHES-DOCUMENTATION-001` | 0 | 0 | _ninguna_ |
| 41 | `RUN-AIW-DECOUPLED-QUEUE-LAUNCHER-001` | 4 | 5 | `INCIDENT-2026-07-11.md`, `logs/INCIDENT-2026-07-11.md`, `objective.md`, `queue.mjs` |
| 42 | `RUN-AIW-ORPHAN-LOCK-RECOVERY-001` | 0 | 0 | _ninguna_ |
| 43 | `RUN-AIW-WORKTREES-PER-RUN-001` | 1 | 1 | `DECISIONES.md` |
| 44 | `RUN-AIW-KERNEL-READS-LANES-001` | 1 | 1 | `DECISIONES.md` |
| 45 | `RUN-AIW-LONG-UNATTENDED-SESSIONS-001` | 0 | 0 | _ninguna_ |
| 46 | `RUN-AIW-UNATTENDED-OPERATION-DOCUMENTATION-001` | 0 | 0 | _ninguna_ |

Suma de rutas distintas por run (con repetición entre runs): **38**. Menciones totales: **43**.
Runs `planned` que no nombran ninguna ruta: **7**.

### 6-B. Ruta → cuántos runs la nombran

Sobre los **46** runs del roadmap, de cualquier status. La última columna lista sólo los `planned`.

| Ruta | Runs que la nombran (cualquier status) | De ellos, `planned` | `run_id` de los `planned` |
|---|---|---|---|
| `DECISIONES.md` | 11 | 9 | `RUN-AIW-SCOPE-PREFLIGHT-GUARD-001`, `RUN-AIW-SHARED-WORKING-BRANCH-001`, `RUN-AIW-PUSH-IS-PART-OF-CLOSURE-001`, `RUN-AIW-INTAKE-001`, `RUN-AIW-PROVIDER-PER-ROLE-001`, `RUN-AIW-RUN-COST-ACCOUNTING-001`, `RUN-AIW-MID-RUN-SIGNALS-001`, `RUN-AIW-WORKTREES-PER-RUN-001`, `RUN-AIW-KERNEL-READS-LANES-001` |
| `kernel.mjs` | 8 | 4 | `RUN-AIW-SCOPE-PREFLIGHT-GUARD-001`, `RUN-AIW-PUSH-IS-PART-OF-CLOSURE-001`, `RUN-AIW-INTAKE-001`, `RUN-AIW-EVIDENCE-SCHEMA-DOCUMENTATION-001` |
| `objective.md` | 5 | 4 | `RUN-AIW-RUN-IDENTITY-001`, `RUN-AIW-RUN-MANIFEST-001`, `RUN-AIW-EVIDENCE-SCHEMA-DOCUMENTATION-001`, `RUN-AIW-DECOUPLED-QUEUE-LAUNCHER-001` |
| `summary.md` | 5 | 3 | `RUN-AIW-PUSH-IS-PART-OF-CLOSURE-001`, `RUN-AIW-PER-PROJECT-PUSH-001`, `RUN-AIW-EVIDENCE-SCHEMA-DOCUMENTATION-001` |
| `claude.md` | 3 | 0 | — |
| `config.json` | 3 | 2 | `RUN-AIW-PER-PROJECT-PUSH-001`, `RUN-AIW-PROVIDER-PER-ROLE-001` |
| `queue.mjs` | 3 | 1 | `RUN-AIW-DECOUPLED-QUEUE-LAUNCHER-001` |
| `AGENTS.md` | 2 | 0 | — |
| `CONSTITUCION.md` | 2 | 0 | — |
| `kernel.mjs:432` | 2 | 2 | `RUN-AIW-PUSH-IS-PART-OF-CLOSURE-001`, `RUN-AIW-PER-PROJECT-PUSH-001` |
| `logs/INCIDENT-2026-07-11.md` | 2 | 1 | `RUN-AIW-DECOUPLED-QUEUE-LAUNCHER-001` |
| `_executor.md` | 1 | 1 | `RUN-AIW-EVIDENCE-SCHEMA-DOCUMENTATION-001` |
| `_reference/DIAGNOSTICO-LEGACY-V1-IDENTIDAD-Y-RETIRO.md` | 1 | 0 | — |
| `_reviewer.md` | 1 | 1 | `RUN-AIW-EVIDENCE-SCHEMA-DOCUMENTATION-001` |
| `aiw/CONTEXTO.md` | 1 | 0 | — |
| `aiw/roadmap/roadmap.json` | 1 | 0 | — |
| `CONSTITUCION.md:30` | 1 | 1 | `RUN-AIW-INTAKE-001` |
| `context/aiw-console/records/ESCRITURA-ROADMAP-AIW.md` | 1 | 0 | — |
| `CONTEXTO.md` | 1 | 0 | — |
| `contract.json` | 1 | 0 | — |
| `CONTRATO.md` | 1 | 0 | — |
| `DISPOSICION-CARPETAS-COLA-AIW.md` | 1 | 0 | — |
| `FRONTERA-Y-TEST-DE-PARSEO-TICKETS-AIW.md` | 1 | 0 | — |
| `git_history.json` | 1 | 0 | — |
| `governance/guardrails.json` | 1 | 0 | — |
| `INCIDENT-2026-07-11.md` | 1 | 1 | `RUN-AIW-DECOUPLED-QUEUE-LAUNCHER-001` |
| `kernel.mjs:123` | 1 | 1 | `RUN-AIW-PROVIDER-PER-ROLE-001` |
| `kernel.mjs:181` | 1 | 1 | `RUN-AIW-PUSH-IS-PART-OF-CLOSURE-001` |
| `kernel.mjs:194` | 1 | 1 | `RUN-AIW-PUSH-IS-PART-OF-CLOSURE-001` |
| `kernel.mjs:232` | 1 | 1 | `RUN-AIW-PROVIDER-PER-ROLE-001` |
| `kernel.mjs:263` | 1 | 0 | — |
| `kernel.mjs:312` | 1 | 1 | `RUN-AIW-SHARED-WORKING-BRANCH-001` |
| `kernel.mjs:324` | 1 | 1 | `RUN-AIW-SHARED-WORKING-BRANCH-001` |
| `kernel.mjs:340` | 1 | 0 | — |
| `kernel.mjs:349` | 1 | 0 | — |
| `no_claims.json` | 1 | 0 | — |
| `processed/ERROR-000-sandbox.md` | 1 | 0 | — |
| `processed/HUMAN_REVIEW-999-sandbox-imposible.md` | 1 | 0 | — |
| `processed/HUMAN_REVIEW-c-imposible.md` | 1 | 0 | — |
| `projects.json` | 1 | 0 | — |
| `projects/aiw-console/context/aiw/roadmap_AIW_temp.md` | 1 | 0 | — |
| `prompts/executor.md` | 1 | 0 | — |
| `prompts/reviewer.md` | 1 | 0 | — |
| `proposed_followup.md` | 1 | 1 | `RUN-AIW-EVIDENCE-SCHEMA-DOCUMENTATION-001` |
| `QUALIFICATION.md` | 1 | 0 | — |
| `queue-e7/c-imposible.md` | 1 | 0 | — |
| `queue.mjs:14` | 1 | 0 | — |
| `queue.mjs:15` | 1 | 0 | — |
| `records/QUALIFICATION.md:16` | 1 | 0 | — |
| `roadmap_AIW_temp.md` | 1 | 0 | — |
| `roadmap_AIW_temp.md:5` | 1 | 0 | — |
| `roadmap.json` | 1 | 1 | `RUN-AIW-INTAKE-001` |
| `round1_executor.md` | 1 | 0 | — |
| `round1_reviewer.md` | 1 | 0 | — |

---

## 7. Censo de repos y proyectos ajenos

Términos buscados: `aiw-console`, `cantu-studio`, `cantu-lessons`, `projects/`, `console`. Búsqueda insensible a mayúsculas 
sobre `full_description` + `summary` de los 21 runs `planned`.

**Convención declarada:** los términos se solapan por diseño — `aiw-console` contiene `console`, así que un mismo pasaje puede contar en ambas filas. 
Se reporta **una fila por par (run, término)** con el número de ocurrencias y **una** línea de contexto de hasta 200 caracteres tomada de la **primera** ocurrencia. 
No se reproduce una línea por cada ocurrencia: eso sería un volcado.

**Total de runs `planned` afectados: 7** de 21.

| Término | Runs `planned` que lo mencionan | Ocurrencias totales |
|---|---|---|
| `aiw-console` | 3 | 7 |
| `cantu-studio` | 0 | 0 |
| `cantu-lessons` | 0 | 0 |
| `projects/` | 1 | 2 |
| `console` | 7 | 17 |

### 7-B. Coincidencias con contexto

| queue_order | run_id | Término | Ocurrencias | Texto casado | Contexto (≤200 chars, primera ocurrencia) |
|---|---|---|---|---|---|
| 30 | `RUN-AIW-PER-PROJECT-PUSH-001` | `console` | 1 | console | …e two registered projects are not equivalent — sandbox is a fixture surface and console is a real repository — and the security topology is unchanged by this run. The constitution's rules stand exactl… |
| 31 | `RUN-AIW-INTAKE-001` | `aiw-console` | 2 | aiw-console | …ich exist today; the five stored classification fields and classified_at, which aiw-console landed in the schema on 2026-07-31 under D-059; the derived closure_mode, WHICH IS NEVER STORED and is compu… |
| 31 | `RUN-AIW-INTAKE-001` | `console` | 4 | console | …ernel.mjs DOES NOT READ roadmap.json. Zero references, verified 2026-07-31. The console writes the roadmap; the kernel parses .md tickets from a folder and is launched from a CLI. THEY ARE TWO SYSTEMS… |
| 34 | `RUN-AIW-RUN-MANIFEST-001` | `console` | 1 | console | … truths about the same id, both correct about different runs. WHAT IT COST: the console shows a completed and a blocked for the same number, and the forensic reconstruction required archaeology over m… |
| 38 | `RUN-AIW-RUN-CATEGORY-FIELD-001` | `aiw-console` | 3 | aiw-console | …vel: every run of this roadmap is manual under the anti-self-hosting rule, with aiw-console as the explicit exception, and that declaration is not re-decided run by run. The per-run axis that does exi… |
| 38 | `RUN-AIW-RUN-CATEGORY-FIELD-001` | `projects/` | 2 | projects/ | …is that does exist is closure_mode, and it is DERIVED and NEVER STORED — see ../projects/aiw-console/context/CLASIFICACION-DE-RUNS.md, the normative document, and D-057 in ../projects/aiw-console/cont… |
| 38 | `RUN-AIW-RUN-CATEGORY-FIELD-001` | `console` | 3 | console | … every run of this roadmap is manual under the anti-self-hosting rule, with aiw-console as the explicit exception, and that declaration is not re-decided run by run. The per-run axis that does exist i… |
| 41 | `RUN-AIW-DECOUPLED-QUEUE-LAUNCHER-001` | `aiw-console` | 2 | aiw-console | … — detached from the console by shell:true plus windowsHide:true — KEPT EDITING aiw-console for about fifteen minutes until a human killed it. WHAT IT COST: a process editing without governance, an or… |
| 41 | `RUN-AIW-DECOUPLED-QUEUE-LAUNCHER-001` | `console` | 4 | console | …he lock survived orphaned, and the executor's agent process — detached from the console by shell:true plus windowsHide:true — KEPT EDITING aiw-console for about fifteen minutes until a human killed it… |
| 44 | `RUN-AIW-KERNEL-READS-LANES-001` | `console` | 3 | console | …f the gap is the argument for this run. Lanes and barriers were designed in the console as ROADMAP DATA: the project declares its lane vocabulary, every run resolves to a lane, and a barrier is a sing… |
| 46 | `RUN-AIW-UNATTENDED-OPERATION-DOCUMENTATION-001` | `console` | 1 | console | … the decoupled launcher. It was the correct rule for a queue that died with its console, and it is exactly wrong for one that does not. A document describing unattended operation while an operator sti… |

**Runs `planned` afectados, distintos (7):** `RUN-AIW-PER-PROJECT-PUSH-001`, `RUN-AIW-INTAKE-001`, `RUN-AIW-RUN-MANIFEST-001`, `RUN-AIW-RUN-CATEGORY-FIELD-001`, `RUN-AIW-DECOUPLED-QUEUE-LAUNCHER-001`, `RUN-AIW-KERNEL-READS-LANES-001`, `RUN-AIW-UNATTENDED-OPERATION-DOCUMENTATION-001`

---

## 8. Reparto de la población `planned`

### 8-A. Por objetivo

| Objetivo (título verbatim, id entre paréntesis) | `planned` | Runs totales | Fases |
|---|---|---|---|
| House in order (`O1`) | **0** | 11 | 2 |
| AIW is readable (`O2`) | **0** | 10 | 7 |
| Reliable autonomous run (`O3`) | **7** | 11 | 10 |
| Run evidence and observability (`O5`) | **5** | 5 | 4 |
| Categories and batches (`O6`) | **3** | 3 | 4 |
| Long unattended execution (batches, lanes and parallelism) (`O7`) | **6** | 6 | 6 |
| **TOTAL** | **21** | **46** | **33** |

Hecho reportado sin interpretar: los `objective_id` presentes son `O1`, `O2`, `O3`, `O5`, `O6`, `O7` — son **6**, pero **no son contiguos**: no existe `O4`. El criterio 2 pide la cuenta de objetivos, y la cuenta es 6. La ausencia de `O4` se declara como hecho; no se investigó y no se interpreta.

### 8-B. Por fase

Las 33 fases, incluida la vacía. Objetivo y fase nombrados por su título verbatim, con el id entre paréntesis.

| Fase (título verbatim, id entre paréntesis) | Objetivo (título verbatim, id entre paréntesis) | `planned` | Runs totales |
|---|---|---|---|
| The migration, executed (`O1.P1`) | House in order (`O1`) | 0 | 10 |
| Cabin methodology established (`O1.P2`) | House in order (`O1`) | 0 | 1 |
| Evidence portability (`O2.P1`) | AIW is readable (`O2`) | 0 | 1 |
| The queue tells the truth (`O2.P2`) | AIW is readable (`O2`) | 0 | 3 |
| The canonical roadmap (`O2.P3`) | AIW is readable (`O2`) | 0 | 1 |
| Declared governance (`O2.P4`) | AIW is readable (`O2`) | 0 | 1 |
| Docs convention and curated index (`O2.P5`) | AIW is readable (`O2`) | 0 | 2 |
| Markdown retirement (`O2.P6`) | AIW is readable (`O2`) | 0 | 1 |
| AIW as the third project (`O2.P7`) | AIW is readable (`O2`) | 0 | 1 |
| The known leak (`O3.P1`) | Reliable autonomous run (`O3`) | **1** | 1 |
| Behaviour under real load (`O3.P2`) | Reliable autonomous run (`O3`) | **1** | 1 |
| Failure cases as an asset (`O3.P3`) | Reliable autonomous run (`O3`) | 0 | 1 |
| Ticket parse regression test (`O3.P4`) | Reliable autonomous run (`O3`) | 0 | 1 |
| Agent instruction convention (`O3.P5`) | Reliable autonomous run (`O3`) | 0 | 1 |
| Documenting the cycle (`O3.P6`) | Reliable autonomous run (`O3`) | 0 | 1 |
| Chained runs (`O3.P7`) | Reliable autonomous run (`O3`) | **1** | 1 |
| Closure that publishes (`O3.P8`) | Reliable autonomous run (`O3`) | **2** | 2 |
| The intake (`O3.P9`) | Reliable autonomous run (`O3`) | **1** | 1 |
| Providers per role (`O3.P10`) | Reliable autonomous run (`O3`) | **1** | 1 |
| Run identity (`O5.P1`) | Run evidence and observability (`O5`) | **1** | 1 |
| The run manifest (`O5.P2`) | Run evidence and observability (`O5`) | **2** | 2 |
| Signals the agent can query mid-run (`O5.P3`) | Run evidence and observability (`O5`) | **1** | 1 |
| Documenting the evidence schema (`O5.P4`) | Run evidence and observability (`O5`) | **1** | 1 |
| Per-project push activation (`O6.P1`) | Categories and batches (`O6`) | 0 | 0 |
| The category field and its vocabulary (`O6.P2`) | Categories and batches (`O6`) | **1** | 1 |
| Batch to branch (`O6.P3`) | Categories and batches (`O6`) | **1** | 1 |
| Documenting categories and batches (`O6.P4`) | Categories and batches (`O6`) | **1** | 1 |
| Decoupled queue launcher (`O7.P1`) | Long unattended execution (batches, lanes and parallelism) (`O7`) | **1** | 1 |
| Orphan lock recovery (`O7.P2`) | Long unattended execution (batches, lanes and parallelism) (`O7`) | **1** | 1 |
| Worktrees per run (`O7.P3`) | Long unattended execution (batches, lanes and parallelism) (`O7`) | **1** | 1 |
| The kernel reads lanes (`O7.P4`) | Long unattended execution (batches, lanes and parallelism) (`O7`) | **1** | 1 |
| Real long unattended sessions (`O7.P5`) | Long unattended execution (batches, lanes and parallelism) (`O7`) | **1** | 1 |
| Documenting unattended operation (`O7.P6`) | Long unattended execution (batches, lanes and parallelism) (`O7`) | **1** | 1 |
| **TOTAL** | | **21** | **46** |

Fases con al menos un `planned`: **19** de 33. Fases sin ningún `planned`: **14**.

---

## 9. Campos de clasificación ya escritos en el canónico

| Campo | Runs del canónico que lo llevan | `run_id` |
|---|---|---|
| `correctness_model` | **0** | — |
| `work_type` | **0** | — |
| `blast_radius` | **0** | — |
| `failure_surfaces` | **0** | — |
| `external_effects` | **0** | — |
| `classified_at` | **0** | — |

**Runs con al menos uno de los seis campos: 0** de 46. El ticket esperaba CERO y el valor real es CERO. Nada que nombrar y nada que tocar.

**Claves realmente presentes en los objetos run del canónico** (unión sobre los 46 runs), como evidencia de que ninguno de los seis existe todavía:

`run_id`, `queue_order`, `title`, `summary`, `full_description`, `status`, `depends_on`, `barrier`, `lane`

---

## 10. Qué NO se midió, y por qué

1. **No se clasificó nada.** No se propone ni un solo valor de `correctness_model`, `work_type`, `blast_radius`, `failure_surfaces` ni `external_effects`. El encargo mide; clasificar es otro acto, de la cabina y el operador, contra `context/PROCEDIMIENTO-DE-CLASIFICACION.md`.
2. **No se derivó `severity` ni `closure_mode`,** ni a mano ni por ningún otro medio. Son derivados del motor y no se almacenan; calcularlos aquí crearía una segunda fuente.
3. **No se reprodujo ningún `full_description` completo,** en ninguna de las dos salidas. Solo anclas de 100 + 100 caracteres y md5. Una copia completa en un record sería una segunda sede del canónico que deriva contra él.
4. **No se explicó la diferencia de 249 bytes entre canónico y emisión.** Se reporta como hecho. Los cinco campos exigidos sobre los 21 runs `planned` son idénticos; explicar el resto del archivo excede lo pedido y habría requerido comparar campos fuera de alcance.
5. **No se comparó la emisión para los runs `completed`.** El criterio 3 acota la comparación a los `planned`.
6. **No se verificó que las rutas del §6 existan en disco.** El censo es textual por diseño: es materia prima para contar consumidores, no un chequeo de integridad del árbol de archivos. Un token que casa el patrón se cuenta aunque sea prosa y no ruta.
7. **No se distinguió mención en prosa de dependencia real** en §6 ni en §7. Interpretar es del operador.
8. **No se leyó `context/PROCEDIMIENTO-DE-CLASIFICACION.md`** para derivar nada de él: este encargo produce insumos, no aplica el procedimiento.
9. **No se ejecutó la suite de tests, ni git en forma alguna que escriba, ni ninguna escritura sobre `aiw` o `cantu-studio`.** La única escritura de todo el encargo es este archivo.
10. **No se midió el orden topológico ni se buscaron ciclos** en el grafo `depends_on`. El criterio 5 pide in-degree y out-degree nombrados; el análisis del grafo completo no se pidió.
11. **No se investigó la ausencia de `O4`** en la numeración de objetivos. Se reporta como hecho en §8-A. Explicarla exigiría historia del roadmap, que está fuera de alcance.
12. **No se detectó ni normalizó variación de mayúsculas ni de separador** (`/` vs `\`) en las rutas del §6: dos escrituras distintas de la misma ruta cuentan como dos rutas. Normalizar sería interpretar.

### Convenciones de escape en las tablas

En las celdas de tabla, `|` aparece como `\|` y los saltos de línea como `\n` de dos caracteres, para no romper el markdown. 
Los extremos verbatim del §4-B van en bloque de código **sin escape alguno**: ahí el texto es literal, con sus saltos de línea reales. 
Las cifras (`chars`, `bytes`, `md5`, índices) se calcularon **siempre sobre el texto original sin escapar**.

---

## Procedencia

- Lecturas: `aiw/roadmap/roadmap.json` y `aiw/.project/roadmap.json`, ambas por Node, en UTF-8, sin PowerShell.
- Escrituras en `aiw`: **ninguna**. Ni un byte.
- Único archivo escrito por este encargo: este record.
- Scripts auxiliares: `measure.mjs` y `render.mjs`, en carpeta temporal fuera de ambos repos, borrados al terminar.
- `md5` calculado con `crypto.createHash("md5")` sobre `Buffer.from(full_description, "utf8")`.
