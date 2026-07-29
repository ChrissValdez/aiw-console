# Congelado del mapa de nombres y barrido de la ruta legacy (cantu-studio)

Dos runs ejecutados **en serie**, carril `DEVELOPMENT`, proyecto `cantu-studio`.
Derivados del canónico `.aiw/roadmap/roadmap.json` por `queue_order`, no por nombre.

| queue_order | run_id | Objetivo / Fase | Carril |
|---|---|---|---|
| 5 | `RUN-CANTU-NAMING-AUDIT-DISPOSITION-001` | O2 / O2.P4 | DEVELOPMENT (por ausencia de `lane`) |
| 6 | `RUN-CANTU-REPO-RENAME-001` | O2 / O2.P5 | DEVELOPMENT (por ausencia de `lane`) |

**Sobre el carril.** Ninguno de los dos runs declara la clave `lane`. El carril
`DEVELOPMENT` es el que lleva `"default": true` en `.aiw/roadmap/roadmap.json`, y
`generate_prompt_context.js:605-606` lo resuelve por ausencia. El validador **no** resuelve
carril por defecto: lo declara explícitamente en sus líneas 811-818 («does not resolve a
default lane»). Es decir, el carril de estos dos runs es DEVELOPMENT por defecto del
generador, no por declaración del run.

`#6` declara `depends_on: ["RUN-CANTU-NAMING-AUDIT-DISPOSITION-001"]`. Se respetó: `#5` se
terminó por completo (artefacto escrito, índice registrado, validador verde) antes de tocar
nada de `#6`. No hubo solapamiento.

---

## Lectura verbatim del canónico

### `#5` — `RUN-CANTU-NAMING-AUDIT-DISPOSITION-001`

**title:**
> Freeze the naming disposition map and exclusion list

**summary:**
> Re-measure the archived disposition map against the tree as it stands today, then freeze it and its exclusion list as the contract every later rename run follows.

**full_description:**
> Freeze the naming disposition map as the contract every later rename run follows, and freeze the exclusion list it defines: run and pass identifiers, the git branch name, the JAME_Lessons external repository reference, the jame-author-lite localStorage keys and the jame-default palette ids that persist user data, the second checkout under .claude/worktrees, the generated dist output, and the archived and historical documentation. The map is not where this run placed it and is not yet fit to freeze as it stands. It does not exist at docs/ops/NAMING_DISPOSITION_MAP.md; docs/ops/ holds zero entries. It exists at docs/archive/ops/NAMING_DISPOSITION_MAP.md, 36877 bytes, and its own header declares Status ANALYSIS ONLY, names its scanned repo root as the legacy JAME_System_Dual folder under JAME_Parallel_Workspace, names its branch as jame-parallel-audit-001, and counts 1,008 files in the tree it scanned. That folder has since been renamed to cantu-studio, and the branch recorded in .aiw/views/git_history.snapshot.json is main. So the work is to re-measure the map against the tree as it stands today, record what the re-measurement changes, and only then freeze the result. Nothing is renamed by this run; it converts a read-only analysis into an approved decision so the execution runs have a single authority for what is identity and what is renamable.

`status: "active"` · `depends_on: []`

### `#6` — `RUN-CANTU-REPO-RENAME-001`

**title:**
> Verify the repository rename and sweep its last legacy path reference

**summary:**
> The folder rename and both cosmetic references already landed; verify them against the tree and sweep the one legacy repository path still left in live prose.

**full_description:**
> The rename this run was written to perform has already happened, so what remains is verification and one line of prose. The repository folder is already named cantu-studio. The cosmetic file-tree label already emits cantu-studio/ from generate_prompt_context.js at lines 500 and 507. The launcher error string is already current: tools/dev/start-editor.ps1 line 29 reads that cantu-lessons is expected as a sibling of cantu-studio. One inbound reference is still stale, and it sits in a registered live document: docs/operations/OPERATIONS-STATE.md line 31 still names the primary repo as the legacy JAME_System_Dual folder under JAME_Parallel_Workspace. Verify the three landed changes against the tree, sweep that one line, and record the result. The repository resolves its root dynamically rather than through the folder name, so no path-resolution site needs editing. Keep the Git remote rename and the branch name as separate, explicitly coordinated operations, since the branch name is also matched by literal string in two executable console files. This Run verifies and sweeps cosmetic and prose references only; it renames nothing.

`status: "active"` · `depends_on: ["RUN-CANTU-NAMING-AUDIT-DISPOSITION-001"]`

### Dónde el ticket contradice al run, y gana el run

El ticket presenta el texto de `#5` como si nombrara ingenuamente
`docs/ops/NAMING_DISPOSITION_MAP.md`. **No lo hace.** El propio `full_description` ya corrige
esa ruta, ya cita los 36 877 bytes, ya declara `Status ANALYSIS ONLY`, ya nombra la raíz y la
rama escaneadas, y ya ordena re-medir antes de congelar. `#5` está tan reencuadrado como `#6`.
Se ejecutó contra el texto del run, no contra la versión del ticket.

---

## Sección `#5` — Congelado del mapa de nombres

### Lo medido, antes de escribir nada

**Método.** Recorrido completo de la raíz del repo excluyendo solo `.git/` y `node_modules/`
(`.claude/worktrees/` ya no existe). 20 archivos binarios omitidos. Unión de tokens: `JAME`,
`Author Lite`, `author-lite`, `author_lite`, `jame-`, `jame.`. Ocurrencias crudas: un token
anidado en un identificador más largo cuenta en ambos. **Ninguna cifra se heredó del ticket.**

**Condiciones de escaneo, mapa archivado contra árbol de hoy:**

| Parámetro | Mapa archivado | Medido 2026-07-28 |
|---|---|---|
| Raíz escaneada | `...\JAME_Parallel_Workspace\JAME_System_Dual` | `...\AIW_Workspace\projects\cantu-studio` |
| Rama | `jame-parallel-audit-001` | `main` |
| Archivos en el árbol | 1 008 | **1 070** |
| Archivos con token legacy | 698 | **735** |
| Coincidencias totales | 15 452 | **20 817** |
| Segundo checkout en `.claude/worktrees/` | 892 archivos | **ausente** |

Confirmado en disco lo que el run afirma: `docs/ops/` tiene **0 entradas**;
`docs/archive/ops/NAMING_DISPOSITION_MAP.md` pesa **36 877 bytes**; su cabecera se autodeclara
`Status: ANALYSIS ONLY` bajo `NOT_PHYSICAL_MIGRATION_AUTHORIZED`.

### La divergencia, en números

De las **29 entradas** de disposición del mapa archivado:

| Resultado | Entradas | Cuáles |
|---|---|---|
| **Siguen válidas** | **20** (69%) | 1, 2, 3, 5, 8, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 26, 27, 29 |
| **Caducaron** | **9** (31%) | 4, 6, 7, 9, 10, 13, 23, 25, 28 |
| **Faltan** (presentes hoy, ausentes del mapa) | **5** | N1-N5, añadidas en el artefacto |

Criterio: una entrada **caduca** cuando su objetivo desapareció o quedó vacío, o cuando la
premisa en que descansaba su disposición dejó de ser cierta. Una cifra que se movió **no**
caduca una entrada.

**Las cuatro caducidades que cambian el trabajo de un run de ejecución:**

- **Entrada 6, `JAME_Lessons`**: era identidad porque el launcher la resolvía. Hoy
  `tools/dev/start-editor.ps1:22` resuelve `cantu-lessons`. Las 738 ocurrencias restantes en
  219 archivos son prosa muerta, ninguna ejecutable. Deja de ser identidad.
- **Entradas 9 y 10, `docs/author-lite/` y `docs/jame-core/`**: existen y contienen **cero
  archivos**. El corpus de 198 archivos se movió a `docs/archive/author-lite/`. Renombrar la
  cáscara vacía no mueve nada.
- **Entrada 28, `.claude/worktrees/`**: 892 archivos pasaron a 0. La premisa PREMISE-1 del mapa
  está muerta. Residuo: `.gitignore` sigue sin entrada `.claude`, así que el peligro vuelve si
  reaparece un worktree.
- **Entrada 23, claves de localStorage**: el mapa contaba 19 claves. Hoy el prefijo
  `jame-author-lite-` captura **37 tokens distintos de tres clases**: 22 claves reales, 14 ids
  de sesión de smoke tests congelados en evidencia QA, y 1 nombre de paquete npm
  (`jame-author-lite-root`). Una regla escrita contra la lista de 19 reescribiría evidencia
  congelada en silencio.

**Lo que no cambió** (re-verificado, no heredado): `grep` de `jame-[a-z0-9-]+` en `src/` da 0 y
en `dist/` da 0, así que PREMISE-3 se sostiene; el validador sigue fijando el literal
`RUN-JAME-` en su lista de anclas, ahora en la **línea 1685** (el mapa decía 1665); el orden
`jame-` antes de `j-` sigue siendo obligatorio porque `j-` es prefijo de `jame-`.

### La lista de exclusión, congelada

Diez cláusulas, cada una re-medida. La cláusula `JAME_Lessons` **se retira** con la evidencia
de la entrada 6. Las cláusulas de paths se reescribieron contra las rutas reales: la del mapa
nombra `docs/_historical_run_record/`, que hoy empareja **cero archivos**; el contenido está en
`docs/archive/_historical_run_record/` (67 archivos), cubierto por la cláusula `docs/archive/`.

### Cómo se escriben las entradas del ledger de decisiones

`.aiw/ledgers/human_decisions.jsonl` — JSONL, **3 entradas**, ninguna sobre naming.

**Forma.** Un objeto JSON por línea. Campos observados en las tres: `decision_id`
(`HD-JAME-...-001`), `date`, `decided_by`, `decision` (verbo en UPPER_SNAKE),
`decision_source_run_id`, y según el caso `authorizes_run_id`, `grants`, `not_granted`,
`conditions`, `no_claims`, `does_not_overwrite`, `roadmap_v2_status_unchanged`, `source_refs`.

**Quién la escribe.** La escribe un run, y el run no es el que decide. Las tres entradas llevan
`decided_by: "Christopher Valdez Cant (operator)"` y un `decision_source_run_id` que apunta al
run escriba. La primera entrada lo dice en sus propias condiciones: *«The preview run must
create an additive human-decision record documenting this approval»* — el run documenta una
aprobación que ya ocurrió.

**Quién la lee: nadie, mecánicamente.**

- **El validador no la lee.** Lee `.aiw/ledgers/change_ledger.jsonl` y
  `.aiw/ledgers/git_provenance.jsonl` (líneas 163-164) y ninguna otra. El `human_decision` que
  sí valida es un **campo del estado normalizado de un run**, otra cosa distinta.
- **La consola no la lee.** `docs/project-console/assets/project-console.js:1715-1716` lee
  `roadmap.open_human_decisions` y `roadmap.resolved_human_decisions`, campos del roadmap —
  y ambos son `undefined` en el roadmap v3 vigente.

El archivo no tiene ningún consumidor mecánico hoy.

### Por qué NO escribí la entrada del ledger

Porque escribirla **sería** el acto de aprobar, y la aprobación es del operador.

La política lo dice sin margen. `docs/project-console/JAME_HUMAN_GATE_POLICY_LITE.md`:

- §2: *«Human approval is an explicit decision, not a derived label.»*
- §15: *«Human approval is explicit and cannot be inferred.»*
- §8: *«Codex may provide review evidence. Claude or another executor may provide
  implementation evidence. Git may provide provenance. None of these is Christopher's
  decision.»*

Que el ledger no tenga lector mecánico **no** lo convierte en registro descriptivo. Es lo
contrario: su único lector es humano, y su único contenido es lo que el operador decidió. Una
entrada con `decided_by: "Christopher Valdez Cant (operator)"` escrita por mí afirmaría un
hecho falso sobre una persona. El texto de `#5` dice que convierte *«a read-only analysis into
an approved decision»*; yo preparé la conversión, no la ejecuté.

**Entrada preparada, lista para que el operador la adopte.** Se deja aquí, sin escribir:

```json
{"decision_id":"HD-CANTU-NAMING-DISPOSITION-AND-EXCLUSION-FREEZE-001","date":"<fecha en que el operador decide>","decided_by":"Christopher Valdez Cant (operator)","decision":"APPROVE_NAMING_DISPOSITION_AND_EXCLUSION_FREEZE","decision_source_run_id":"RUN-CANTU-NAMING-AUDIT-DISPOSITION-001","grants":["Adoption of docs/reference/REFERENCE-NAMING-DISPOSITION-AND-EXCLUSION.md as the frozen naming disposition contract every later rename run follows","Adoption of its ten-clause exclusion list as measured against the tree of 2026-07-28","Retirement of the JAME_Lessons exclusion clause, on the measured evidence that tools/dev/start-editor.ps1 resolves cantu-lessons and no executable site reads the legacy name"],"not_granted":["Any rename, move, split, archive or deletion of any file","Physical migration: NOT_PHYSICAL_MIGRATION_AUTHORIZED remains in force","Git remote rename or branch rename","Certification of any kind","Closure or status change of RUN-CANTU-NAMING-AUDIT-DISPOSITION-001 or any other run"],"conditions":["The archived analysis at docs/archive/ops/NAMING_DISPOSITION_MAP.md is neither moved nor edited and remains readable in place at 36877 bytes.","Entries 9, 10 and 28 are void as rename targets: their directories are empty or absent.","Entry 23 must be split by kind before any run acts on the jame-author-lite- prefix; 14 of its 37 prefix matches are frozen QA evidence and 1 is an npm package name.","The general legacy-path sweep of the 132 files carrying JAME_System_Dual or JAME_Parallel_Workspace is not authorized here and belongs to its own run."],"no_claims":["Registration in docs_index.json is not certification","Writing or approving documentation is never certification","No run is closed or advanced by this decision"],"source_refs":["docs/reference/REFERENCE-NAMING-DISPOSITION-AND-EXCLUSION.md","docs/archive/ops/NAMING_DISPOSITION_MAP.md",".aiw/docs/docs_index.json"]}
```

### Ruta y formato del artefacto, y por qué

`docs/reference/REFERENCE-NAMING-DISPOSITION-AND-EXCLUSION.md`.

- **Categoría REFERENCE**: el Blueprint §3 la define como la que responde *«what is the exact
  contract?»* y exige que sus afirmaciones sean verificables contra el código. Es la única
  categoría con el cap extendido de 800 líneas, que un documento de 29 entradas necesita para
  ser consumible sin abrir el archivo histórico.
- **Precedente de esta sesión**: `REFERENCE-COLOR-PALETTE-COMPATIBILITY.md`,
  `REFERENCE-MATH-FORMULA-COMPATIBILITY.md` y
  `REFERENCE-COMPONENT-REVALIDATION-DEFINITION-OF-DONE.md` ya son contratos transversales
  consumidos por runs posteriores, no APIs de motor. Sus notas en `docs_index.json` declaran
  explícitamente ese estiramiento de categoría. El artefacto sigue el mismo patrón y hereda la
  misma marca.
- **Nombre**: UPPERCASE-KEBAB por OQ-A del Blueprint §9. Sin colisión con los 6 REFERENCE
  existentes.
- **Cumplimiento**: 149 líneas (cap REFERENCE 800, cap general 250), **0 bytes no-ASCII**,
  banner de status en la línea 3, sin versión manual, sin emoji, rutas repo-relativas
  completas.

**El mapa archivado no se movió ni se editó.** md5 `afde520ecf056d10b8567671dd21525f`,
36 877 bytes, mtime `2026-07-22 19:01:55`, idéntico antes y después.

### Registro en `.aiw/docs/docs_index.json`

Edición quirúrgica. Respaldo md5 fuera del repo en el scratchpad de sesión. Roundtrip
byte-exacto verificado **antes** de tocar: el archivo usa `indent=2` con finales de línea CRLF
y CRLF final; `JSON.stringify(obj, null, 2)` + LF→CRLF + CRLF final reproduce el original byte
a byte. Inserción en el índice 101, justo tras la última entrada `docs/reference/`, para que el
diff quede local.

| Control | Antes | Después |
|---|---|---|
| Entradas | **145** (verificado, como exigía el encargo) | **146** |
| md5 | `873235e7db7af907998760142adefee8` | `1bcc50fe9a5a983519a4827e6215b5c6` |
| Bytes | 311 552 | 313 802 |
| Caracteres no-ASCII | 1 (un guion largo preexistente en las notas de otra entrada) | **1, sin cambio** |
| Entradas preexistentes modificadas | — | **0**, comparadas una a una |

### Archivos escritos por `#5`

| Archivo | Acción | Antes | Después |
|---|---|---|---|
| `docs/reference/REFERENCE-NAMING-DISPOSITION-AND-EXCLUSION.md` | creado | no existía | 15 394 B, 149 líneas |
| `.aiw/docs/docs_index.json` | 1 entrada añadida | md5 `873235e7...`, 145 entradas | md5 `1bcc50fe...`, 146 entradas |

### Status declarado para `#5`

**No se tocó `status`, `progress` ni `closeout_result`.** El run sigue en `active` en el
canónico, con md5 y mtime intactos.

**Debe quedar en:** `active`, **esperando decisión del operador**. No en un estado de cierre.
El run pide congelar el mapa «convirtiendo un análisis read-only en una decisión aprobada»; la
medición está hecha y el artefacto entregado, pero la aprobación es del operador y la entrada
del ledger sigue sin escribir. El run se cierra cuando el operador adopte la lista de exclusión
y su entrada quede en `.aiw/ledgers/human_decisions.jsonl`.

---

## Sección `#6` — Barrido de la última referencia legacy

### Lo medido, antes de escribir nada

**Las tres afirmaciones de «ya aterrizado» del run, verificadas:**

| Afirmación del run | Medido | Veredicto |
|---|---|---|
| La carpeta ya se llama `cantu-studio` | `realpath` da `...\AIW_Workspace\projects\cantu-studio` | **cierto** |
| `generate_prompt_context.js` emite `cantu-studio/` en las **líneas 500 y 507** | El literal está, pero en las **líneas 513 y 520** | **cierto en sustancia, 13 líneas desfasado** |
| `tools/dev/start-editor.ps1:29` dice que `cantu-lessons` se espera como hermano de `cantu-studio` | Línea 29, literal exacto | **cierto, exacto** |

El desfase de las líneas 500/507 es deriva del texto del run, no un defecto del repo:
`generate_prompt_context.js` tiene mtime de hoy. El run no pide reparar nada ahí y no se tocó.

**La línea que `#6` alcanza: exactamente una.** No hay más.

Medición del alcance, que es lo que decide el asunto. El run dice que la referencia obsoleta
*«sits in a registered live document»*. Se comprobó contra `.aiw/docs/docs_index.json`:

| Población | Archivos |
|---|---|
| Archivos que llevan `JAME_System_Dual` o `JAME_Parallel_Workspace` | **132** |
| De ellos, registrados en `docs_index.json` | 15 |
| De ellos, **registrados + `canonical_active` + `active_not_archived`** | **1** |

Ese 1 es `docs/operations/OPERATIONS-STATE.md`, y dentro de él la única coincidencia está en la
**línea 31**. El `grep` sobre todo `docs/operations/` devolvía esa línea y nada más. La frase
del run es literalmente exacta.

Los otros 131 archivos: 66 en `docs/archive/`, 35 en `QA/temp/`, 6 en `prompts/generated/`
(gitignored), 3 en `tools/author-lite/`, 4 en estado derivado (`.aiw/`, `.project/`), 2 prompts
manuales, y 14 registrados pero **no** vigentes (archivo, política, notas de run).

### El barrido

Una línea. Se cambió el valor de la fila `Primary repo` de la tabla Baseline:

- **Antes**: `` `C:\Users\Chris\Documents\JAME_Parallel_Workspace\JAME_System_Dual` ``
- **Después**: `` `C:\Users\chris\Documents\AIW_Workspace\projects\cantu-studio` ``

La ruta nueva es la real medida con `realpath`, incluida su capitalización (`chris` en
minúscula; el original escribía `Chris`). El resto de la línea, la tabla, el banner de status y
el conteo de líneas del documento quedan intactos.

**No se refrescó el `Last verified: 2026-07-12` del banner.** El Blueprint §4a dice que
refrescarlo *«requires actually re-verifying, not just touching the file»*, y yo verifiqué un
hecho de ese documento, no el documento entero. El run pide barrer una línea.

### Deriva nombrada y NO tocada — es `#69`

`#6` no repara nada que su texto no nombre. Lo siguiente se midió, se nombra, y se dejó
exactamente como estaba:

| Superficie | Medido | Por qué no se tocó |
|---|---|---|
| `JAME_System_Dual` en el resto del árbol | 350 ocurrencias / 102 archivos | Barrido general de rutas legacy: `#69` |
| `JAME_Parallel_Workspace` en el resto del árbol | 448 ocurrencias / 110 archivos | Barrido general de rutas legacy: `#69` |
| `CLAUDE.md` | Declara `Fase 8.6` y estados de componentes que no reconcilié | Fuera del texto de `#6`; `#69` |
| `generate_prompt_context.js` | El label ya es correcto; solo el número de línea del run está desfasado | El run no pide repararlo |
| Los 17 packets de componentes | No inspeccionados ni tocados | Fuera de alcance por el encargo |
| `docs/governance/GOVERNANCE-AUTHORITY-AND-NO-CLAIMS.md` §2 | Apunta el estado de certificación a `docs/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md`, y `docs/author-lite/` tiene **0 archivos** | Deriva real, ajena a `#6` y a `#5`. Se nombra, no se toca |
| 8 directorios cáscara vacíos bajo `docs/` | `author-lite`, `generated`, `human`, `jame-core`, `ops`, `shared`, `_historical_run_record`, `_legacy` | Nombrados en el artefacto de `#5` como N5; ningún run los cubre |

### Archivos escritos por `#6`

| Archivo | Acción | md5 antes | md5 después |
|---|---|---|---|
| `docs/operations/OPERATIONS-STATE.md` | 1 línea de prosa | `7207d26695e05db9f11a6564a6845d1a` | `0f2828a21909fa76f9db2b6d34af1f8c` |

92 líneas antes y después. 0 bytes no-ASCII antes y después. `grep` de la raíz legacy sobre
`docs/operations/` devuelve **cero** coincidencias.

### Status declarado para `#6`

**No se tocó `status`, `progress` ni `closeout_result`.**

**Debe quedar en:** listo para cierre por el operador — verificación completada y barrido
aplicado, sin decisión humana pendiente. `#6` no pide aprobación de nadie: pide verificar tres
cambios y barrer una línea, y las cuatro cosas están hechas y medidas. Su única dependencia,
`#5`, está satisfecha en el sentido en que `#6` la necesitaba: el contrato de exclusión existe
y declara que `JAME_Lessons` dejó de ser identidad.

A diferencia de `#5`, aquí no queda ningún acto reservado al operador salvo el cierre mismo y
el commit. El operador lo cierra desde la consola global; este record no lo hace.

---

## Validador

Vía que no escribe: `node tools/project-console/validate-project-console-state.mjs` sin
argumentos. Se confirmó que **es** la vía que no escribe: el archivo, de 2 064 líneas, no
contiene ni una llamada a `writeFile`, `appendFile`, `mkdir`, `unlink` ni `rmSync`, ni lee
`process.argv`. Es un validador de solo lectura.

```bash
node tools/project-console/validate-project-console-state.mjs
```

| Invariante | Antes | Después | |
|---|---|---|---|
| Exit code | **0** | **0** | ok |
| Objectives / phases / runs | 7 / 28 / 72 | **7 / 28 / 72** | sin moverse |
| Component statuses | 16 | **16** | sin moverse |
| Queue groups | `needs_human_decision=0 now=2 ready_next=7 later=55 history=8` | idéntico | sin moverse |
| Git history snapshot | 918 commits / 2 ramas / `current=main` | idéntico | sin moverse |
| Docs indexed | 145 | **146** | +1, el registro de `#5` |
| Docs curated primary-visible | 57 de 145 | 58 de 146 | +1, consecuencia del anterior |
| Avisos | 1 no bloqueante: arista externa `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001` | **el mismo, único** | sin avisos nuevos |

El movimiento 145 → 146 es el efecto declarado del registro, no una deriva. Ningún otro
contador se movió y no apareció ningún aviso nuevo.

---

## Superficies disjuntas y `.project/`

**`.project/` NO se re-emitió, y nadie más lo movió durante esta ventana.** Los seis archivos
quedan byte-idénticos a la línea base tomada al abrir, con el mismo mtime `2026-07-28
20:53:40`, anterior a mis escrituras (21:02 y 21:03):

| Archivo | md5, idéntico antes y después |
|---|---|
| `.project/docs_index.json` | `708ebd13790e4aa3921299579b01a16b` |
| `.project/git_history.json` | `808357131d48005ffc6be6867d1b34ce` |
| `.project/guardrails.json` | `83544904cf101ed31c6a8589c212e140` |
| `.project/no_claims.json` | `e79bf8d699ea40e32f2da8e53ab037cc` |
| `.project/roadmap.json` | `8822603d9dabd73d02dc6ef87ac13e27` |
| `.project/snapshot.json` | `22e20548f4a611bae1e7b2dd56f49071` |

**Intocado, con md5 declarado:**

| Superficie | md5 | Estado |
|---|---|---|
| `.aiw/roadmap/roadmap.json` (canónico) | `b8db266f5e679392882080772ea9be6a` | intacto, mtime 20:53:40 previo a la sesión |
| `.aiw/ledgers/human_decisions.jsonl` | `326caa1fdb92d509d8c5ff5c57d7fd28` | intacto, mtime del 22 de julio |
| `.aiw/state/component_status.json` | `f591165bbf19862b04433129d9edf2cb` | intacto |
| `docs/archive/ops/NAMING_DISPOSITION_MAP.md` | `afde520ecf056d10b8567671dd21525f` | intacto, ni movido ni editado |
| `projects/aiw-console/context/aiw-console/CONTRATO.md` | `f77ccec64d99f2048d4bde41638cb228` | intacto |
| `projects/aiw-console/.aiw/roadmap/roadmap.json` | `08b9d813d6e3ee31aee464eb02294b61` | intacto |

El hilo paralelo sobre `aiw-console` no se cruzó. No se tocaron handoffs, tests ni records
existentes. `DECISIONES.md` no existe en
`projects/aiw-console/context/aiw-console/`; el directorio solo contiene `CONTRATO.md` y
`records/`. Git: no se ejecutó en ninguna forma. No se levantaron servidores ni se corrieron
suites.

**Records:** había **52** antes de este; este es el **53**. Sin colisión de nombre.

---

## Sobre la certificación

No afirmo que la certificación sea un concepto retirado, porque es falso.
`docs/governance/GOVERNANCE-AUTHORITY-AND-NO-CLAIMS.md` §2 la define como *«a claim that must
be earned, never inferred»*, y su §3 se titula «Certification gates». Lo que sí está
deprecado, y es otra cosa, es `certified` como **etiqueta primaria de estado de un run**:
`JAME_HUMAN_GATE_POLICY_LITE.md` §9 y §15. Ninguno de los dos artefactos escritos aquí certifica
nada, y ambos lo declaran.

---

## No hecho, y por qué

- **Ningún renombre.** El texto de `#5` dice *«Nothing is renamed by this run»* y el de `#6`
  dice *«it renames nothing»*. Los renombres son `#68`, `#70` y `#71`.
- **La entrada del ledger de decisión**, por la razón desarrollada arriba: escribirla sería
  aprobar en nombre del operador.
- **El barrido general de rutas legacy** de 132 archivos: es `#69`.
- **Ningún cambio de `status`, `progress`, `closeout_result`, `barrier` ni `queue_order`** en
  ningún run. Ningún run se cierra aquí.
- **La arista externa** del aviso no bloqueante: sigue sin resolver, como corresponde.
- **La DoD de revalidación**, auditoría de componentes, Blueprint, modelo canónico y contratos
  de `#3`, `#7`, `#8`, `#9`: sin tocar.
