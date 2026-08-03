# Retiro del run de las compuertas de variante del compilador

**Proyecto:** cantu-studio
**Run retirado:** `RUN-CANTU-COMPILER-VARIANT-GATES-001` — `queue_order` **29**, fase `O5.P5`, objetivo `O5`
**Destinos del reparto:** `queue_order` **30**, **31** y **34**
**Fecha:** 2026-08-02
**Tipo:** Encargo de taller. **Retiro y reparto de alcance en el canónico. NO ejecuta ninguno de los cuatro runs.**
**Instrumento de escritura:** el motor de `projects/aiw-console/tools/roadmap/` (`planEdit` / `applyPlan`), en un solo `batch`.

**Resultado en una línea:** el `#29` cerró como `completed` con
`closeout_result: "discarded_by_RETIRO-RUN-COMPUERTAS-VARIANTE-CANTU"` **sin cambiar de sitio**;
su alcance viajó a los tres runs de componente que poseen cada compuerta; **exactamente seis
campos cambiaron** en todo el archivo, ninguno fuera de la lista permitida; **66 runs**,
`queue_order` **1..66** intacto, **cero runs desplazados**; validador **EXIT 0** con
`history` 20 → **21** y `ready_next` 20 → **19**.

---

## 1. Guarda de identidad — DERIVADA por `queue_order`, no tecleada

Criterio 1. Ningún `run_id` se tecleó en este encargo: los cuatro se derivaron recorriendo
`objectives → phases → runs` y buscando por `queue_order`. La guarda compara el `title` **carácter
por carácter** contra el esperado y aborta el proceso (`process.exit(2)`) antes de planear nada si
alguno no coincide. **Los cuatro coinciden.**

| `qo` | `run_id` **derivado** | `title` leído del canónico | Guarda |
|---:|---|---|:---:|
| 29 | `RUN-CANTU-COMPILER-VARIANT-GATES-001` | `Align the compiler variant gates with the author palette` | **OK** |
| 30 | `RUN-JAME-WEB-SPLIT-SCOPE-AND-REPAIR-001` | `Decide scope and enable the Split component` | **OK** |
| 31 | `RUN-JAME-WEB-TABLE-AUDIT-AND-REPAIR-001` | `Audit and implement the Table component` | **OK** |
| 34 | `RUN-JAME-WEB-TIMELINE-AUDIT-AND-REPAIR-001` | `Audit and implement the Timeline component` | **OK** |

Ubicación de cada uno, medida: el `#29` vive en `O5` / `O5.P5`; el 30 y el 31 en `O1` / `O1.P1C`;
el 34 en `O1` / `O1.P2`. Ninguna de esas cuatro ubicaciones cambió.

---

## 2. Quién depende del `#29` — NADIE

Criterio 2, medido **antes** de retirarlo. Se recorrieron las `depends_on` de los **66** runs, y
también sus `depends_on_human_approved` aunque el ticket solo pedía la primera lista:

```
=== quien nombra a RUN-CANTU-COMPILER-VARIANT-GATES-001 ===
TOTAL HITS: 0
```

**Cero runs lo nombran, por cualquiera de las dos listas.** Retirarlo no deja ninguna arista
apuntando a un run retirado, así que no había decisión que devolver al operador y el encargo
siguió.

Sus **propias** aristas salientes se conservan intactas y no se tocaron —el ticket no las
menciona y `depends_on` está fuera de lo editable—:
`["RUN-CANTU-AUTHOR-PALETTE-COMPILER-ENGINE-001", "RUN-JAME-COLOR-PALETTE-COMPATIBILITY-CONTRACT-001"]`.

---

## 3. Las tres compuertas, medidas en disco

Criterio 3. Todo lo de esta sección se midió leyendo y **ejecutando** el código, no copiando de
este ticket ni de ningún record. Las cifras de tests se obtuvieron con cobertura de líneas real
(`node --experimental-test-coverage --test tests/*.test.mjs`) sobre la **suite completa**, que
corrió **350 tests, 350 pass, 0 fail**.

| | **Split variant** | **Timeline details variant** | **Table row badge variant** |
|---|---|---|---|
| Declaración | `compiler.js:66` — `SPLIT_VARIANT_VALUES` | `compiler.js:55` — `TIMELINE_DETAILS_VARIANT_VALUES` | `compiler.js:21` — `VARIANT_VALUES` **y** `compiler.js:24-34` — `TABLE_BADGE_VARIANT_MAP` |
| Uso | `compiler.js:640` (en `assertBoundedSplitShape`) | `compiler.js:1046` (en `assertBoundedTimelineShape`) | `compiler.js:538-543` (`normalizeTableBadgeVariant`), llamada desde `compiler.js:565` |
| Línea del error | `compiler.js:641` | `compiler.js:1047` | `compiler.js:542` |
| Valores que admite | **3** — `ctx`, `focus`, `wrn` | **4** — `def`, `ctx`, `wrn`, `success` | **18** — los 9 ids de paleta más 9 alias/hex heredados (`green`, `red`, `blue`, `yellow`, `orange`, `#4C566A`, `#88C0D0`, `#BF616A`, `#FF007F`) |
| Mensaje que emite | `[Compiler] Split Web tiene variant no permitido: <valor>.` | `[Compiler] Timeline Web paso N tiene variante de detalle no permitida.` | `[Compiler] Variante de badge de tabla no permitida: <valor>.` |
| **Tests que la ejercitan desde el compilador** | **CERO** | **CERO** | **UNO** |
| Gemelo en el esquema | `compiler-api/schemas/draftSchema.js:868` y `editor-ui/src/schemas/draftSchema.js:840` | `compiler-api/…:482` y `editor-ui/…:479` | `TableBadgeVariantEnum`, líneas **28-32** de **ambas** copias |

### 3.1 Las cifras de tests, con la prueba dura

Lo que hace inequívoco el «cero» no es la lectura sino la cobertura: sobre la suite entera, las
líneas de rechazo **`641-642`** (split) y **`1047-1048`** (timeline) figuran entre las **no
cubiertas** de `services/compiler.js`; la línea **`542`** (table) **no** figura, es decir, está
cubierta.

- **Split — 0.** Ningún test alcanza la línea 641. Los tests de split
  (`webTheoryComplexSplitSchemaCompiler.test.mjs`) solo compilan los tres valores admitidos
  (`ctx`, `focus`, `wrn`): atraviesan la compuerta, no la ejercitan.
- **Timeline — 0.** Ningún test alcanza la línea 1047. Dos tests de
  `webTimelineNormalStepsSafety.test.mjs` compilan valores admitidos —`timeline detail cards are
  preserved as escaped plain-text Core details` con `wrn`, y `timeline detail cards survive JSON
  import, save-load roundtrip and Web JS generation` con `success`—, y el rechazo se afirma
  **solo contra el esquema Zod** en `timeline details reject unsafe payloads and unsupported
  variants` (`WebDraftSchema.safeParse` con `detailsVariant: 'warning'`), nunca contra el
  compilador.
- **Table — 1.** `webTablesParitySchemaCompiler.test.mjs` →
  `compiler fails closed for unknown rich table badge variants when called directly`, que pasa
  `badge.variant = '#123456'` al compilador y espera `/Variante de badge de tabla no permitida/`.
  Otros **tres** la atraviesan con valores admitidos:
  `rich table rows validate, roundtrip through import, and compile to Core object cells`
  (`webTablesParitySchemaCompiler.test.mjs`),
  `columns with rich table child compile to structured Core table without fallback content`
  (`webColumnsChildExpansionSafety.test.mjs`) y
  `table resolves its variant against the active Web palette while the row badge stays
  engine-resolved` (`webAuthorPaletteCompilerEngineReconciliation.test.mjs`).

Hay además un test que afirma que **split y table row badge** siguen cerrados —`the closed
variant sets stay closed: a hex is still rejected there`, en
`webAuthorPaletteDerivedRolesAndCustomHex.test.mjs`—, pero lo hace **contra el esquema**, no
contra el compilador, y **no incluye timeline**. Por eso no cuenta en la columna de arriba.

### 3.2 Las dos capas, verificadas punta a punta ejecutando

No es una inferencia de lectura: se ejecutó el compilador real contra bloques en memoria, con y
sin pasar por el esquema. Resultado medido:

```
split variant='res'            | esquema: RECHAZA | compilador: RECHAZA: [Compiler] Split Web tiene variant no permitido: res.
timeline detailsVariant='res'  | esquema: RECHAZA | compilador: RECHAZA: [Compiler] Timeline Web paso 1 tiene variante de detalle no permitida.
table badge variant='purple'   | esquema: RECHAZA | compilador: RECHAZA: [Compiler] Variante de badge de tabla no permitida: purple.

=== el compilador rechaza POR SU CUENTA, sin pasar por el esquema ===
split variant='res'            | compilador directo: RECHAZA -> [Compiler] Split Web tiene variant no permitido: res.
timeline detailsVariant='res'  | compilador directo: RECHAZA -> [Compiler] Timeline Web paso 1 tiene variante de detalle no permitida.
table badge variant='purple'   | compilador directo: RECHAZA -> [Compiler] Variante de badge de tabla no permitida: purple.
```

Las dos capas cierran con **listas literales duplicadas e independientes** —tres copias en juego:
el compilador y los **dos** `draftSchema.js`—, y el compilador rechaza sin el esquema. **Abrir
solo el esquema produce un editor que ofrece valores que el compilador rechaza.** Esa frase entra
en los tres textos.

### 3.3 Las dos piezas que acompañan a la compuerta de split

Medidas también, porque el ticket las adjudica al `qo` 30 por ser la misma decisión de alcance:

- **Split solo como hijo directo de Columns:** `compiler.js:1225`,
  `[Compiler] Split Web solo se permite como child directo de Columns.` **Sí tiene test**: la
  línea 1225 está cubierta, por `compiler rejects top-level split and unsafe direct split
  payloads even without schema parse` (`webTheoryComplexSplitSchemaCompiler.test.mjs`).
- **Marca de deshabilitado del catálogo:** `blockCatalog.js:872-873` — `disabled: true` con
  `disabledReason: 'Pendiente de habilitación como componente. No disponible para agregar en este
  preflight.'`, sobre el item `id: 'web-split'`, etiqueta **`Comparación guiada`**.

---

## 4. Compuertas cerradas SIN DUEÑO — no se adjudican a nadie

Criterio 6. Al medir aparecieron compuertas cerradas del compilador que **no** pertenecen a esos
tres componentes. **No se adjudican, no se nombran en ningún texto de run, y se dejan aquí como
medición.** Adjudicar por afinidad temática es exactamente lo que este encargo evita.

| Compuerta | Declaración | Usos | Dueño medido | Tests |
|---|---|---|---|---|
| **`TABLE_BADGE_STYLE_VALUES`** — `outline`, `solid` | `compiler.js:23` | `compiler.js:227` → error `:228` `[Compiler] Estilo de badge de card no permitido: <v>.` **(Card)**, y `compiler.js:504` → error `:505` `…badge.style no permitido.` **(Table)** | **NINGUNO EN EXCLUSIVA.** Pese al nombre, gobierna el badge de **Card** *y* el de **Table** | **0** — las líneas `228` y `505-506` están sin cubrir |
| **`CARD_ICON_VALUES`** | `compiler.js:19` (desde `CARD_ICON_SCHEMA_VALUES`) | `compiler.js:133` → error `:134` `[Compiler] Icono de card no permitido: <v>.` | **Card**, que no es ninguno de los tres | **0** — línea `134-135` sin cubrir |

`TABLE_BADGE_STYLE_VALUES` es el caso que el criterio describe literalmente: **no se deja
adjudicar a un solo componente**. Meterla en el `qo` 31 por llevar `TABLE_` en el nombre habría
sido adjudicar por afinidad y habría dejado a Card con una compuerta ajena decidida por otro run.

Se deja constancia además de una compuerta que **sí** tiene dueño único y **tampoco** se repartió,
porque el ticket enumeró exactamente qué viaja al `qo` 30 y ésta no estaba: `SPLIT_MODE_VALUES`
(`compiler.js:67`, uso `:636`, error `:637`). Pertenece a Split; no se adjudicó ni se nombró.

---

## 5. El precedente de retiro, LEÍDO del log

Criterio 4. `context/DECISIONES.md` → **`D-048`**, §«Cambio 1 — el prototipo se RETIRA como
entregable de fase, y no se borra». Su nota de vocabulario dice, palabra por palabra, lo que este
encargo necesitaba:

> **no existe token `descartado`** en el vocabulario cerrado de run (§11.a:
> `planned·active·blocked·completed`) y esta decisión **no lo inventa** —acuñar un quinto token es
> enmienda de contrato, no efecto lateral de un reorden—. Por eso el retiro viaja en
> `closeout_result`, que §14 mantiene string libre sin enum, y en la prosa del run.

**La forma del valor se derivó del DATO en disco, no de la prosa del log.** El log narra el valor
como `descartado_por_D-048`; lo que `aiw-console/roadmap/roadmap.json` **realmente** almacena en
`RUN-CONSOLE-PROTOTIPO-CONSOLA-001` es:

```
RUN-CONSOLE-PROTOTIPO-CONSOLA-001 | status completed | closeout_result = "discarded_by_D-048"
```

La familia completa en ese archivo confirma la forma `<participio>_by_<referencia>`:
`discarded_by_D-048`, `superseded_by_D-037_D-038`, `delivered_by_aiw_roadmap_O2`, frente a los 33
`completed_successfully`.

**Valor escrito, y por qué esa referencia:** `discarded_by_RETIRO-RUN-COMPUERTAS-VARIANTE-CANTU`.
El participio es el del precedente literal de retiro; la referencia es **este record**, porque
escribir una entrada nueva en `DECISIONES.md` está fuera del alcance de este encargo y el record
es el registro que sí existe y que este valor puede señalar. Es una elección de **referencia**,
derivada; la **forma** no se inventó.

---

## 6. El texto exacto escrito en cada uno de los cuatro runs

Criterio 10. Se cita **verbatim**, en inglés. En los cuatro casos el texto previo se **conserva
entero** y el nuevo se añade detrás, separado por una línea en blanco.

### 6.1 `qo` 29 — `RUN-CANTU-COMPILER-VARIANT-GATES-001` — nota de retiro añadida

```
WITHDRAWN 2026-08-02 by the operator, and withdrawn is not deleted: this run keeps its run_id, its title and its queue_order, nothing moves behind it, and it closes as completed with a closeout_result that says how it closed. The run status vocabulary is closed and carries no discard token; none is invented here, following the precedent already on record for the withdrawal of a prototype run. WHY IT WAS WITHDRAWN: the operator measured in QA that each of the three gates is tied to a design decision of its own component -- the scope of Comparacion guiada, the field organisation of Table, the step structure of Timeline -- so settling them ahead of those audits would decide in advance what those audits exist to decide. The one argument that held this run together, that all three gates live in the same compiler file, buys nothing: the component runs already run in series over that same collision. WHERE THE SCOPE WENT, one gate each, and each destination now carries its own measured file, lines, admitted values, error message and test count: the split variant gate went to "Decide scope and enable the Split component", together with the gate restricting split to a direct child of Columns and the disabled flag in the editor block catalogue, because all three are the same scope decision; the table row badge variant gate went to "Audit and implement the Table component", and only that one, because the table's main colour selector was already settled by the completed palette work; the timeline details variant gate, with its open feedback-alias question, went to "Audit and implement the Timeline component". NOTHING ELSE MOVED: no run_id, title, queue_order, objective or phase changed here, no run was inserted, removed or renumbered, and no other run's status changed.
```

Y los otros dos campos del retiro:

```
status           : planned -> completed
closeout_result  : (ausente) -> "discarded_by_RETIRO-RUN-COMPUERTAS-VARIANTE-CANTU"
```

### 6.2 `qo` 30 — `RUN-JAME-WEB-SPLIT-SCOPE-AND-REPAIR-001` — párrafo añadido

```
SCOPE INHERITED FROM THE WITHDRAWN COMPILER VARIANT GATES RUN, 2026-08-02. This run now owns the split variant gate, and with it the two decisions that are the same decision. THE GATE: tools/author-lite/compiler-api/services/compiler.js declares SPLIT_VARIANT_VALUES at line 66 with three admitted values -- ctx, focus, wrn -- reads it at line 640 and throws at line 641 with "[Compiler] Split Web tiene variant no permitido: <value>."; the author palette defines nine token ids, so six of them are refused here. WITH IT, AND FOR THE SAME REASON: the gate at compiler.js line 1225 that admits split only as a direct child of Columns ("[Compiler] Split Web solo se permite como child directo de Columns."), and the disabled flag with its disabledReason at tools/author-lite/editor-ui/src/features/editor/constants/blockCatalog.js lines 872-873, which keeps "Comparacion guiada" visible in the catalogue for traceability without making it addable. All three are the scope of this component, and deciding that scope is this run's whole purpose. TESTS, measured on disk: the variant gate has ZERO tests exercising it from the compiler -- across the full 350-test suite line 641 is never reached, and the split tests only compile the three admitted values -- so THIS RUN WRITES THAT NET BEFORE IT TOUCHES THE GATE: repairing an unexercised gate is a blind repair. The Columns-child gate at line 1225 is already covered and needs no new net. BOTH LAYERS OR NEITHER: the same closed set is duplicated literally in the two schemas, compiler-api/schemas/draftSchema.js line 868 and editor-ui/src/schemas/draftSchema.js line 840, each its own z.enum(['ctx','focus','wrn']), and the compiler refuses on its own without the schema -- verified end to end. Opening only the schema produces an editor that offers values the compiler rejects, so whoever touches one of these gates touches both layers. THE DECISION ON THIS GATE IS PART OF THIS AUDIT, NOT A PREREQUISITE OF IT: no other run has to settle it first.
```

### 6.3 `qo` 31 — `RUN-JAME-WEB-TABLE-AUDIT-AND-REPAIR-001` — párrafo añadido

```
SCOPE INHERITED FROM THE WITHDRAWN COMPILER VARIANT GATES RUN, 2026-08-02. This run owns the table row badge variant gate, AND ONLY THAT ONE. THE GATE: tools/author-lite/compiler-api/services/compiler.js resolves it in normalizeTableBadgeVariant at lines 538-543, called from line 565, over two declarations -- TABLE_BADGE_VARIANT_MAP at lines 24-34, nine legacy colour names and hexes mapped onto palette tokens, and VARIANT_VALUES at line 21, the nine palette token ids -- and throws at line 542 with "[Compiler] Variante de badge de tabla no permitida: <value>."; eighteen values pass and everything else is refused, including the engine's feedback aliases and any free hex. WHAT IS ALREADY CLOSED AND MUST NOT BE REDONE: the table's MAIN colour selector. Its variant accepts any active-palette token id and a #RRGGBB, and the compiler resolves it against the active palette -- settled by "Unify the color selector across every Web component" and "Carry the author palette through the compiler and the Web engine", both completed. Only the row badge stayed shut. TESTS, measured on disk: ONE test exercises this gate from the compiler -- "compiler fails closed for unknown rich table badge variants when called directly", in compiler-api/tests/webTablesParitySchemaCompiler.test.mjs -- and three further tests cross it with admitted values. The net exists, so this run extends it instead of writing it from nothing. BOTH LAYERS OR NEITHER: the same closed set is duplicated literally in the two schemas as TableBadgeVariantEnum at lines 28-32 of compiler-api/schemas/draftSchema.js and of editor-ui/src/schemas/draftSchema.js, and the compiler refuses on its own without the schema -- verified end to end. Opening only the schema produces an editor that offers values the compiler rejects, so whoever touches this gate touches both layers. THE DECISION ON THIS GATE IS PART OF THIS AUDIT, NOT A PREREQUISITE OF IT: how the row badge is organised is a field decision of this component, and no other run has to settle it first.
```

### 6.4 `qo` 34 — `RUN-JAME-WEB-TIMELINE-AUDIT-AND-REPAIR-001` — párrafo añadido

```
SCOPE INHERITED FROM THE WITHDRAWN COMPILER VARIANT GATES RUN, 2026-08-02. This run owns the timeline details variant gate. THE GATE: tools/author-lite/compiler-api/services/compiler.js declares TIMELINE_DETAILS_VARIANT_VALUES at line 55 with four admitted values -- def, ctx, wrn, success -- reads it at line 1046 and throws at line 1047 with "[Compiler] Timeline Web paso N tiene variante de detalle no permitida.". Three of the four are palette token ids; success is not one: the active palette defines nine token ids and success is not among them, it is a feedback alias the engine keeps its own fallback for. Whether the feedback aliases become real palette tokens is an open operator decision. If it is not on record when this run executes, the run stops and reports options with measured cost instead of choosing one. TESTS, measured on disk: ZERO tests exercise this gate from the compiler -- across the full 350-test suite line 1047 is never reached; two timeline tests compile admitted values, wrn and success, and the rejection is only ever asserted against the Zod schema, never against the compiler -- so THIS RUN WRITES THAT NET BEFORE IT TOUCHES THE GATE: repairing an unexercised gate is a blind repair. BOTH LAYERS OR NEITHER: the same closed set is duplicated literally in the two schemas, compiler-api/schemas/draftSchema.js line 482 and editor-ui/src/schemas/draftSchema.js line 479, each its own z.enum(['def','ctx','wrn','success']), and the compiler refuses on its own without the schema -- verified end to end. Opening only the schema produces an editor that offers values the compiler rejects, so whoever touches this gate touches both layers. THE DECISION ON THIS GATE IS PART OF THIS AUDIT, NOT A PREREQUISITE OF IT: the step structure of Timeline is this run's own decision, and no other run has to settle it first.
```

**La condición de parada de timeline viajó con su compuerta.** El texto original del `#29` la
llevaba y el `qo` 34 la hereda: si el operador no tiene decidido el destino de los alias de
feedback cuando ese run se ejecute, el run **para y reporta opciones con coste medido**.
Verificado en disco que `success` no es un token de la paleta: la paleta activa declara nueve ids
(`def`, `ctx`, `ex`, `focus`, `str`, `res`, `wrn`, `err`, `meta`) y `success` no está entre ellos.

---

## 7. Cómo se editó, y el respaldo

Criterio 7. El CLI local de `cantu-studio` no se usó. Se condujo el motor de
`projects/aiw-console/tools/roadmap/` con `planEdit` → `applyPlan`, una sola operación `batch`
con cinco sub-ops en orden: `set-text` del 29, `set-status` del 29, y `set-text` del 30, 31 y 34.

**Respaldo byte a byte, fuera de los dos repos, antes de escribir.** Se copió el canónico al
scratchpad de sesión y se comprobó con `cmp` que era **idéntico** al archivo en disco antes de
tocar nada (114 442 bytes). `git checkout` no se usó en ninguna forma.

**Dry-run antes de aplicar**, y salió limpio:

```
stage : ok
ok    : true
errors: (ninguno)
warns : (ninguno)
bytes : 122223 (antes: 114442)
eol   : "\r\n"
remap : (sin reordenamientos)
```

El `remap` vacío es la prueba de que **nadie se desplazó**: el motor no reasignó un solo
`queue_order`. La escritura se aplicó por la vía atómica del motor:
`{"written": true, "rolledBack": false, "bytes": 122223}`. Las terminaciones de línea CRLF del
archivo se preservan: el serializador escribe con las del propio archivo.

---

## 8. Verificación posterior, campo a campo contra el respaldo

Criterio 8. Comparación del archivo final contra el respaldo pre-escritura, campo por campo, run
por run:

```
total de runs      : 66   (respaldo: 66)   OK 66
queue_order 1..66 denso, único, contiguo : OK
run_id únicos      : OK (66)
runs desplazados   : OK 0
depends_on colgantes: 1 (OK: exactamente uno, el externo legal preexistente)
    RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 -> RUN-CANTU-ROADMAP-CONTENT-AUDIT-001
fases              : 28, con 0 runs: 0 OK
runs active        : 0 OK
status             : {"completed":21,"planned":45}
```

La única arista colgante es la **externa legal preexistente**: `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`
resuelve en `projects/aiw-console/roadmap/roadmap.json`, es decir, la declara otro proyecto
registrado (CONTRATO §10.d). No se tocó.

**Los únicos campos que cambiaron en todo el archivo — seis, y ninguno fuera de la lista:**

| `qo` | `run_id` | Campo | Antes | Ahora |
|---:|---|---|---|---|
| 29 | `RUN-CANTU-COMPILER-VARIANT-GATES-001` | `status` | `planned` | `completed` |
| 29 | `RUN-CANTU-COMPILER-VARIANT-GATES-001` | `closeout_result` | *(ausente)* | `discarded_by_RETIRO-RUN-COMPUERTAS-VARIANTE-CANTU` |
| 29 | `RUN-CANTU-COMPILER-VARIANT-GATES-001` | `full_description` | 1 277 chars | 3 073 chars |
| 30 | `RUN-JAME-WEB-SPLIT-SCOPE-AND-REPAIR-001` | `full_description` | 497 chars | 2 504 chars |
| 31 | `RUN-JAME-WEB-TABLE-AUDIT-AND-REPAIR-001` | `full_description` | 543 chars | 2 583 chars |
| 34 | `RUN-JAME-WEB-TIMELINE-AUDIT-AND-REPAIR-001` | `full_description` | 603 chars | 2 452 chars |

```
TOTAL de campos cambiados: 6
cambios FUERA de la lista permitida: 0 OK
árbol objetivos/fases idéntico: OK
claves raíz: antes [schema_version,roadmap_id,title,lanes,objectives] ahora [idem] OK
lanes idénticas: OK
```

Ningún `run_id`, `title`, `queue_order`, `objective`, `phase`, `summary` ni `depends_on` cambió en
ningún run. Ningún `status` cambió salvo el del `qo` 29. El árbol de objetivos y fases, sus
títulos y sus conteos, y las `lanes` de raíz, quedan idénticos.

---

## 9. Validador — la vía que no escribe

Criterio 9. `node tools/project-console/validate-project-console-state.mjs`, ejecutado desde
`projects/cantu-studio`. Salida completa **después** de la escritura:

```
Project Console state validation passed.
Roadmap v3 prototype: 7 objectives / 28 phases / 66 runs; queue groups needs_human_decision=0 now=0 ready_next=19 later=26 history=21
Docs indexed: 149
Docs curated primary-visible: 60 of 149 registered
Component statuses: 16
Git provenance episodes: 9
Git history snapshot: 508 commits / 1 branches (1 visible, 0 backup hidden); current=main; run-associated=3; source=local_git_autosync
Roadmap rebase warnings (non-blocking):
- .aiw/roadmap/roadmap.json run RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 depends on RUN-CANTU-ROADMAP-CONTENT-AUDIT-001, which does not resolve in this roadmap. With a single roadmap loaded this cannot be decided: it may be a legal external dependency — a run that lives in another project (CONTRATO §10.d Regla 2) — or a typo in the run id. Both are possible and one loaded roadmap cannot tell them apart; resolve it against the full set of projects to distinguish external from write error.
```

`EXIT=0`.

**Los dos movimientos que el ticket manda confirmar con el dato, confirmados**, porque el
validador se corrió también **antes** de escribir:

| | Antes | Después | |
|---|---:|---:|---|
| **Total de runs** | 66 | **66** | sin cambio |
| **`history`** | 20 | **21** | **sube en uno** — el `#29` entró en historia |
| **`ready_next`** | 20 | **19** | **baja en uno** — el `#29` salió del conjunto elegible |
| `later` | 26 | 26 | sin cambio |
| `now` / `needs_human_decision` | 0 / 0 | 0 / 0 | sin cambio |
| Objetivos / fases | 7 / 28 | 7 / 28 | sin cambio |

El único aviso no bloqueante es el **mismo** que ya salía antes de escribir, palabra por palabra:
la arista externa legal. No apareció ninguno nuevo.

---

## 10. Qué NO se hizo

- **No se borró ningún run.** El `#29` sigue en el archivo, en su sitio, con su identidad entera.
- **No se insertó, movió ni renumeró nada.** `remap` vacío y cero runs desplazados.
- **No se tocó código:** ni el compilador, ni los esquemas, ni el editor, ni los renderers, ni los
  tests. La suite se **ejecutó** para medir cobertura y quedó en 350/350; ningún archivo del repo
  cambió por ello.
- **No se cambió el `status` de ningún run** que no sea el `qo` 29.
- **No se re-emitió `.project/`.** No se ejecutó git en ninguna forma. No se levantó ningún
  servidor.
- **No se clasificó ningún run.** Los seis campos de clasificación de 30, 31 y 34 quedan como
  estaban; el `#29` sigue sin ninguno.
- **No se editó `DECISIONES.md`** ni ningún record existente: el precedente `D-048` se **leyó**.
  Este encargo no abre una entrada nueva en el log —está fuera de su alcance—; si el operador
  quiere que el retiro tenga número de decisión, ése es un encargo aparte, y el
  `closeout_result` escrito señala a este record.
- **No se adjudicó ninguna compuerta sin dueño.** `TABLE_BADGE_STYLE_VALUES` y `CARD_ICON_VALUES`
  quedan nombradas aquí y en ningún texto de run. `SPLIT_MODE_VALUES` tampoco se repartió.
- **No se repararon derivas conocidas que se cruzaron:** el mojibake de comentarios en los dos
  `draftSchema.js` (`DICCIONARIOS (Tokens SemÃ¡nticos)`), el aviso del validador sobre la arista
  externa, ni el pre-flight del CLI local de roadmap de `cantu-studio`.

---

**Insumos leídos y no editados:** `tools/author-lite/compiler-api/services/compiler.js`, los dos
`draftSchema.js`, `tools/author-lite/editor-ui/src/features/editor/constants/blockCatalog.js`,
`tools/author-lite/editor-ui/src/features/editor/constants/colorSystem.js`,
`tools/author-lite/compiler-api/tests/`, `context/DECISIONES.md` (D-048),
`projects/aiw-console/roadmap/roadmap.json` (la forma real del `closeout_result` precedente y el
conjunto de ids externos) y el validador.

Criterio de borrado: N/A.
