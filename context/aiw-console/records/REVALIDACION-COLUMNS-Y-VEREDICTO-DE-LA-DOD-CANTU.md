# Revalidación de Columns y veredicto sobre la DoD

**Proyecto:** cantu-studio
**Run:** `RUN-JAME-WEB-COLUMNS-REVALIDATION-001` — `queue_order` 13, carril DEVELOPMENT
**Fecha:** 2026-07-29
**Tipo:** Piloto de la Definition of Done de revalidación de componentes. Dos entregables: la revalidación de `columns` y un veredicto crítico sobre el procedimiento.
**Estado declarado del run:** `active` — no lo cierra este encargo.

---

## 1. Guarda de identidad, antes de nada

El roadmap se renumeró hoy 2026-07-29 a las 14:11. La guarda se corrió derivando el run
del canónico por `queue_order`, no por nombre.

| Comprobación | Valor medido | Fuente |
|---|---|---|
| Canónico | `.aiw/roadmap/roadmap.json`, `schema_version: jame.roadmap_v3.v0.2-progress` | disco, mtime 2026-07-29 14:11 |
| `queue_order` 13 → `run_id` | `RUN-JAME-WEB-COLUMNS-REVALIDATION-001` | O1 / O1.P1B |
| `title` | «Audit and implement the Columns component» | coincide exacto con el encargo |
| Carril | DEVELOPMENT | el run no lleva clave `lane`; DEVELOPMENT es `default: true` en `lanes[]` |
| `status` | `active` | canónico |
| `queue_order` 14 | `RUN-CANTU-WEB-COLUMNS-DOC-001`, «Verify the Columns component packet», DOCUMENTATION, `planned`, `depends_on` incluye a este run | canónico |

**La guarda pasa.** Se sigue.

### Texto verbatim del run 13, leído del canónico

- **title:** `Audit and implement the Columns component`
- **summary:** `Audit the Columns component against the color system, implement what is missing, and verify by human visual QA.`
- **full_description:** `Audit the Columns component against the color and palette compatibility contract, using the current component inventory as the starting point. Where the inventory shows the component carries hardcoded or local colors instead of the shared palette, or lacks a required integration point, implement the missing integration. Repair only what the audit and human visual QA show to be a real defect; do not rewrite accepted behavior. Verify the result by human visual QA rather than an automated test suite, since the repository has no test runner.`
- **depends_on:** `RUN-JAME-WEB-COMPONENT-CONTRACT-STANDARDIZATION-001`, `RUN-JAME-WEB-COMPONENT-BASELINE-RECONCILIATION-001`, `RUN-JAME-COLOR-PALETTE-COMPATIBILITY-CONTRACT-001`

**Nota sobre el texto del run:** la última frase dice que el repositorio no tiene test
runner. Es falso a día de hoy: hay 33 archivos de test y una suite de 296 casos que corre
con `node --test`. No se corrige el texto del run — no es de este encargo — pero se
declara, porque un run que ejecute esa frase literalmente descartaría evidencia que sí
existe. Esto es dato para la cabina, no una acción.

---

## 2. Cifras medidas en esta sesión, ninguna heredada

| Métrica | Antes | Después |
|---|---|---|
| Objetivos / fases / runs | 7 / 28 / 73 | 7 / 28 / 73 |
| Validador (vía que no escribe) | **EXIT 0** | **EXIT 0** |
| `Docs indexed` | 148 | **149** (+1, declarado en §7) |
| `Docs curated primary-visible` | 60 de 148 | 60 de 149 |
| `Component statuses` | **16** | **16** |
| Suite `compiler-api` | **296/296**, EXIT 0 | **296/296**, EXIT 0 |
| `eslint` | **EXIT 0** | **EXIT 0** |
| Avisos del validador | 1 no bloqueante, arista externa `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001` | el mismo, sin cambio |

Comando de validación: `node tools/project-console/validate-project-console-state.mjs`.
Comando de suite: `node --test "tools/author-lite/compiler-api/tests/*.test.mjs"`.
No se corrió ninguna suite de `aiw-console`.

---

## 3. Tabla de evidencia por paso — formato §7 de la DoD, verbatim

```
Component: columns    Run: RUN-JAME-WEB-COLUMNS-REVALIDATION-001 (queue_order 13)    Date: 2026-07-29
```

| Step | Measured against | Result | Evidence |
|---|---|---|---|
| S1 identity | `.aiw/roadmap/roadmap.json` | **PASS** | `RUN-JAME-WEB-COLUMNS-REVALIDATION-001` + «Audit and implement the Columns component» |
| S2 state audit | catalog / schemas / compiler / renderer / fixture | **PASS** | ver §4; todas las celdas citadas, cero UNKNOWN |
| S3 color audit | color contract §9 | **PASS** + `COLOR_PALETTE_NOT_APPLICABLE` | bloque de auditoría en §5 de este record |
| S4 math audit | math contract §10 | **PASS** + `MATH_FORMULA_NOT_APPLICABLE` | bloque de auditoría en §6 de este record |
| S5 columns placement | top-level + ambos slots | **NOT_APPLICABLE** | autorreferencial; justificado en §4.6 |
| S6 persistence | save/load + import | **PASS** | medición propia §4.7 + `webColumnsChildExpansionSafety.test.mjs:570-595` |
| S7 human qa | §6 boundary | **PREPARED** | `docs/_historical_run_record/RUN-JAME-WEB-COLUMNS-REVALIDATION-001-OPERATOR-QA-PACKET.md` |
| S8 repair gate | reproduced QA defects | **NOT_APPLICABLE** | ningún veredicto de QA nombra un defecto; ver §8 |
| S9 packet | single-source contract | **PASS** | `docs/components/web/COLUMNS.md` |
| S10 registry + no-claims | docs_index + conflicts | **PASS** | diff de entradas en §7; conflicto `list` intacto |

```
Verdict: READY_FOR_OPERATOR_QA
Open decisions touched: none
```

**Ningún paso se omitió.** Los dos NOT_APPLICABLE están declarados con su razón; ninguno
se saltó en silencio.

---

## 4. S2 — auditoría del estado actual, cinco capas

| Capa | Medición | Cita |
|---|---|---|
| Catálogo | `columns`: `label: 'Dos columnas'`, `category: 'structure'`, `rail: true`, `order: 10`. **Sin `disabled`** → habilitado. | `tools/author-lite/editor-ui/src/features/editor/constants/blockCatalog.js:12-17` |
| Default de fábrica | `{ kind:'columns', title:'', columns:[{blocks:[]},{blocks:[]}] }` | `tools/author-lite/editor-ui/src/features/editor/utils/blockFactory.js:33-41` |
| Rama del editor | `{field.kind === 'columns' && <WebColumnsEditor .../>}`; el editor recibe y reenvía `colorPalette` | `WebBlockEditor.jsx:3853-3863`, reenvío en `:2207` |
| Schema editor-ui | `WebColumnsSchema`: `title` opcional, `columns` con `.length(2)` | `tools/author-lite/editor-ui/src/schemas/draftSchema.js:904-909` |
| Schema compiler-api | Idéntico, mismo `.length(2)`, mismo mensaje | `tools/author-lite/compiler-api/schemas/draftSchema.js:932-937` |
| Case del compiler | Emite `type:'columns'`, `title` escapado si existe, y dos `{type:'column', slot:'left'\|'right', blocks}` | `tools/author-lite/compiler-api/services/compiler.js:1114-1128` |
| Renderer | `renderColumns(data)`; despacha cada hijo por `item.type` | `src/builders/web/renderColumns.js:86` (dispatcher de hijos en `:25-84`) |
| Fixture sandbox | `test_theory.js:231,234,235`, `test_theory_complex.js`, `test_tables.js` | ver §4.2 |

### 4.1 Los dos schemas son idénticos entre sí

Comparados campo por campo: mismo `WebColumnsChildSchema` (unión de 9 hijos), mismo
`WebColumnSlotSchema`, mismo `.length(2)` con el mismo mensaje. No hay deriva entre
editor-ui y compiler-api para `columns`. **La DoD no pide esta comparación** — dice
«both schemas» pero nunca «compare them»; se hizo igual, y va al veredicto.

### 4.2 El fixture sandbox usa una forma distinta a la del pipeline del Editor

`test_theory.js:231` construye `{ type:'columns', columns: atomsNarrative.map(a => ({...a, type:'card'})) }`
— es decir, `columns` como array **plano de hijos**, sin envoltorio `column` y sin `slot`,
y con N hijos, no dos.

El pipeline del Editor emite siempre la otra forma: dos envoltorios
`{type:'column', slot}` con `blocks[]` (`compiler.js:1118-1126`), y el schema exige
exactamente 2 (`.length(2)`).

El renderer acepta ambas: `renderColumnItem` conmuta sobre `item.type`, y `'column'`
recursa en `blocks` mientras un `'card'` va directo a `renderCard`
(`renderColumns.js:35-83`). **Paridad correcta según la definición del repo**: el output
compilado es un subconjunto válido del contrato del renderer, no un output idéntico. Se
declara, no es defecto.

### 4.3 Los 9 hijos que el schema acepta están todos cubiertos por el renderer

Schema: `header`, `list`, `iconList`, `rule`, `card`, `narrative`, `callout`, `table`,
`split`. Los nueve tienen `case` en `renderColumnItem`. Sin hueco.

### 4.4 Hallazgo — el menú ofrece 8 de los 9 hijos aceptados

`COLUMN_CHILD_OPTIONS` (`WebBlockEditor.jsx:244-253`) ofrece 8: `header`, `list`,
`iconList`, `rule`, `card`, `callout`, `narrative`, `table`. **`split` no se ofrece**,
aunque el schema y el import lo aceptan. Es intencional y ya está documentado en
`blockCatalog.js:1017` y en la DoD §8. Se añadió al packet como frase de una línea.

### 4.5 Hallazgo — `columns.title` existe en todas las capas menos en la de edición

| Capa | ¿Soporta `title`? | Cita |
|---|---|---|
| Schema (ambos) | Sí, `z.string().optional()` | `draftSchema.js:934` / `:906` |
| Fábrica | Sí, siembra `title: ''` | `blockFactory.js:36` |
| Compiler | Sí, lo emite escapado si es truthy | `compiler.js:1117` |
| Renderer | Sí, `<h3 class="j-component-title">` | `renderColumns.js:118-124` |
| **Editor** | **No. Cero llamadas a `register(` en todo `WebColumnsEditor` (líneas 1918-2310)** | `WebBlockEditor.jsx` |

La cabecera del bloque en el Editor muestra un título **derivado** del primer hijo de cada
slot (`getColumnsDerivedTitle`, `draftHelpers.js:42-55`), no un campo editable. El autor
no puede escribir `columns.title` desde la UI; solo llega por import de Draft JSON.

Es el espejo del patrón de regresión math que describe la DoD (allí falta la última capa,
aquí falta la de edición). **Es medición del taller, no autorización de reparación**
(DoD S8). No se tocó código. Sí se documentó en el packet.

### 4.6 S5 — placement, NOT_APPLICABLE autorreferencial

La DoD S5 dice literalmente: «For `columns` itself this step is NOT_APPLICABLE
self-referentially and says so.» Verificado en disco además del texto:

- `WebColumnsChildSchema` **no incluye** `columns` en su unión → un `columns` dentro de un
  slot es rechazado por schema e import.
- `blockCatalog.js:981`: «columns no se audita como child de si mismo y no permite
  columnas anidadas.»
- Test vivo: `webColumnsChildExpansionSafety.test.mjs:610` («columns reject unsupported
  child kinds»).

### 4.7 S6 — persistencia, medición propia

Script de medición ejecutado contra el compiler y el schema reales (solo lectura):

- El `variant` del hijo **sobrevive como referencia**: tras save→reload,
  `header.variant="ctx"`, `list.variant="def"`, y **ninguno gana clave `color`**. La regla
  del contrato de color §3 se cumple dentro de `columns`.
- `columns.title` sobrevive el roundtrip verbatim.
- Un `columns` sin `title` no emite la clave y no produce `<h3>` — sin elemento vacío.
- Import: cubierto por `webColumnsChildExpansionSafety.test.mjs:570-595`
  (`parseAndValidateBlocks`), que asserta orden y forma de los hijos y el contenido de un
  hijo `table`.

---

## 5. `## Color palette compatibility audit` — bloque obligatorio, contrato §9

Diez preguntas del contrato de color §9, respondidas. La descomposición en diez es mía;
el contrato las da en una sola frase con punto y coma (ver veredicto §10).

| # | Pregunta | Respuesta medida |
|---|---|---|
| 1 | ¿Expone campos, variantes, estilos o tokens dependientes de color? | **No.** El nodo compilado tiene exactamente `type`, `title`, `columns`. Sin `color`, sin `variant`, sin `colorToken`. Medido: `compiler.js:1114-1128` y ejecución propia. |
| 2 | ¿La paleta afecta correctamente al editor? | **Sí, por propagación.** `WebBlockEditor.jsx:3860` pasa `colorPalette` a `WebColumnsEditor`, que lo reenvía al editor de hijos en `:2207`. `columns` no muestra control de color propio. |
| 3 | ¿La paleta afecta a Preview Real? | **Sí, por propagación.** Preview Real, Compile Web y Generate Web comparten `compileDraftToJameData`, que normaliza la paleta una vez (`compiler.js:1242`) y la pasa por `context`. |
| 4 | ¿La paleta afecta a Generate Web? | **Sí, misma vía.** Verificado compilando el mismo draft contra dos paletas: hijos `#123ABC`/`#654321` → `#0A0B0C`/`#FFEEDD`, y el HTML renderizado difiere. |
| 5 | ¿Save/load preserva la selección? | **Sí.** El `variant` del hijo vuelve intacto y no se escribe `color` de vuelta (§4.7). |
| 6 | ¿El import de Draft JSON la preserva? | **Sí.** `webColumnsChildExpansionSafety.test.mjs:570-595`. |
| 7 | ¿Contraste y legibilidad se sostienen? | **No lo decide el taller.** Es juicio visual: va al operador, checks 3, 4 y 8 del packet de QA. |
| 8 | ¿Funciona top-level? | **Sí.** `columns` es exclusivamente top-level; es su única colocación válida. |
| 9 | ¿Funciona dentro de slots de `columns` sin romper legibilidad? | **NOT_APPLICABLE, autorreferencial** (§4.6). |
| 10 | ¿Qué límites o variantes debe documentar el packet? | Exactamente 2 slots; los 9 hijos aceptados y que `split` no se ofrece en el menú; both-empty renderiza como nada; `title` sin control en el Editor; el `<h3>` a color fijo; y que el color de un hijo se resuelve igual dentro que fuera. **Todo eso quedó en el packet.** |

**Clase asignada: `COLOR_PALETTE_NOT_APPLICABLE`** — «No color, variant, or token surface
at all». Justificación: el nodo compilado no lleva ninguna de las tres, y bajo dos paletas
distintas es idéntico salvo por sus hijos.

**Sin divergencia con la matriz §5 de la DoD.** La fila dice «none of its own /
propagates context». El disco coincide exactamente. Nada que declarar por la regla de
divergencia.

### 5.1 Un color medido que ninguna paleta alcanza

`renderColumns.js:118-124` emite el `<h3>` del título con `color: #1E293B` literal.
Verificado: aparece en el HTML bajo las dos paletas de prueba, sin cambiar.

**No es el patrón de regresión de paleta** — ese patrón requiere un `variant` que se
resuelva contra un mapa hardcodeado, y aquí no hay `variant` en absoluto: es un literal en
el renderer sin ninguna superficie de autor detrás. Tampoco contradice la clase
`PROPAGATES_ONLY` del inventario, que habla del pipeline de autor. Se declara como
medición y se documentó en Guardrails del packet. **No se reparó**: ningún veredicto de QA
lo nombra, y el propio literal no tiene control de autor que arreglar.

---

## 6. `## Math and formula compatibility audit` — bloque obligatorio, contrato §10

**`columns` no tiene punto de integración math.** Verificado en tres fuentes
independientes antes de responder:

1. Inventario §4: los seis con math son `rule`, `table`, `arithmetic`, `split`,
   `timeline`, `hierarchy`. `columns`: «none / children keep theirs».
2. Contrato math §5: fila `columns` → «none / propagates children».
3. **Medición propia**: el nodo compilado no contiene ninguna clave `math` ni ningún
   delimitador `\(` o `\[` en todo su JSON.

| # | Pregunta | Respuesta |
|---|---|---|
| 1 | ¿Expone algún campo math o de fórmula? | **No.** Ninguno, en ninguna capa. |
| 2 | ¿Qué superficie de entrada usa cada campo? | **Ninguna.** No hay campo, luego ni Superficie A ni B. |
| 3 | ¿Ofrece el editor visual de fórmulas o un input de texto? | **Ninguno de los dos** sobre `columns`. Un hijo `rule` dentro de un slot sí monta el campo visual (`WebBlockEditor.jsx:1815`, `RuleMathField ... isColumn`) — pero eso es de `rule`, no de `columns`. |
| 4 | ¿El compiler emite el valor con delimitadores, y quién los posee? | **Vacío.** `columns` no emite valor math. |
| 5 | ¿Un delimitador escrito por el autor se elimina o se duplica? | **Vacío.** |
| 6 | ¿El HTML renderizado produce salida KaTeX? | **No por `columns`.** Si un hijo `rule` la produce, es del hijo. |
| 7 | ¿Save/load e import preservan la fórmula? | **Vacío para `columns`.** Para el hijo `rule`, cubierto por su propio run. |
| 8 | ¿Funciona dentro de slots de `columns`? | **NOT_APPLICABLE, autorreferencial.** |
| 9 | ¿Qué límites de longitud y forma debe documentar el packet? | **Ninguno de math.** Los caps por tipo (`compiler.js:37-65`) no incluyen `columns`. |
| 10 | ¿Qué texto de fallo ve el autor si una fórmula es rechazada? | **Ninguno.** No hay campo que rechazar. |

**Clase asignada: `MATH_FORMULA_NOT_APPLICABLE`.**

**No se fabricó ninguna auditoría de math que no aplica.** Las ocho preguntas vacías se
declaran vacías con su razón, que es lo que la DoD pide al correr el bloque «for every
component regardless». El coste de esa regla va al veredicto.

---

## 7. S10 — registro, con la ceremonia completa

**Escritor único en esta ventana.** El hilo paralelo trabaja sobre `aiw-console`; nadie
más tocó `.aiw/docs/docs_index.json` durante la edición.

| Control | Resultado |
|---|---|
| Entradas antes | **148** — verificado, no heredado |
| Respaldo md5 **fuera del repo** | `…/scratchpad/docs_index.BACKUP.json`, md5 `2100f1bfa1ecbbbc0a8bd423b5019f9f`, idéntico al original |
| Roundtrip byte-exacto **antes** de tocar | **Sí.** `JSON.stringify(obj,null,2)` + LF→CRLF + CRLF final reproduce el archivo byte a byte. Guarda de aborto si fallaba. |
| Entradas después | **149** |
| Diff a nivel de entradas | **+1 añadida, 0 eliminadas, 1 modificada** |
| Añadida | `docs/_historical_run_record/RUN-JAME-WEB-COLUMNS-REVALIDATION-001-OPERATOR-QA-PACKET.md` |
| Modificada | `docs/components/web/COLUMNS.md` — campos `last_reconciled_by_run`, `freshness`, `freshness_status`, `notes`. Cero campos eliminados. |
| No-ASCII antes / después | **1 / 1** — sin cambio; el carácter preexistente no se tocó ni se añadió ninguno |
| md5 antes → después | `2100f1bf…` → `b69f83cf…` |
| Roundtrip byte-exacto del archivo escrito | **Sí**, releído y re-verificado |
| Claves de primer nivel | Idénticas antes y después |

**Mitad de no-claims de S10.** Verificado intacto: `source_conflicts` sigue con **1**
entrada, la del conflicto preservado `component-list-status-agents-vs-matrix-phase2`;
`global_no_claims` sin cambio; `.aiw/state/component_status.json` **byte-idéntico**
(md5 `f591165b…` antes y después). `columns` no tiene conflicto preservado propio que
verificar.

---

## 8. S8 — la puerta de reparación: no se reparó nada, y es un resultado válido

**No hay veredicto de QA que nombre un defecto**, luego la puerta cierra en
`NOT_APPLICABLE` por la propia regla de la DoD. **No se tocó una sola línea de código.**

Lo que sí existe, y se cita como evidencia histórica:

| Item | Valor |
|---|---|
| Veredicto humano registrado | `QA_APPROVED_HUMAN_FOR_COLUMNS_PARENT_LAYOUT` |
| Archivo | `docs/archive/author-lite/sandbox/PASS-4D-PHASE2-WEB_COMPONENT_COLUMNS_PARENT_LAYOUT_QA_RECONCILIATION.md` |
| Estado de salida | `COLUMNS_PARENT_LAYOUT_QA_RECONCILED / COMPONENT_QA_APPROVED / DOCS_PENDING / NOT CERTIFIED` |
| Findings pendientes | **P0: ninguno. P1: ninguno.** P2/P3 fuera de `columns` parent/layout |
| Evidencia textual humana | «correjido, ya lo revise, se ve bien y jala bien», «baseline clean» |
| Ocho escenarios cubiertos | slots vacíos; left/right con hijos; borrar último child; guardar/generar sin loading pegado; menú sin corte; both-empty sin espacio; summary con duplicados; `callout` child sin escaparse |

**Esto es evidencia histórica, no un resultado vigente.** Predata la reconciliación de
paleta configurable, fechada 2026-07-22 en
`PASS-4D-PHASE2-WEB-COLOR-PALETTE-RECONCILIATION-LEGACY-CERTIFIED-COMPONENTS-001.md`, así
que ningún escenario de propagación de paleta estuvo en su alcance. **No se dio por
pasada, no se simuló, no se infirió su resultado.**

### 8.1 La matriz sí tiene fila de `columns`, y dice lo mismo que el inventario

`docs/archive/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md:189` registra:
`COMPONENT_CERTIFIED / DOCS_APPROVED / COLOR_PALETTE_NOT_APPLICABLE / NOT_WEB_CERTIFIED / NOT Generator-safe`.

Y `:128` dice, con sus palabras: «`columns` | `COLOR_PALETTE_NOT_APPLICABLE`; no tiene
superficie visual propia de color, pero propaga la paleta a hijos `header`/`list` durante
compile.»

Es decir: **la fuente de estado corrobora de forma independiente el criterio 4 de este
encargo.** Y expone un hueco de la DoD que se detalla en el veredicto (§10, S7-b).
**No se certificó nada y no se tocó la matriz.**

---

## 9. Criterio 3 — `columns` no existe en la proyección. Verificado, no inventado.

| Fuente | Medición |
|---|---|
| `.aiw/state/component_status.json` | **16** entradas: `header, list, iconList, card, video, narrative, callout, details, rule, table, conceptGrid, split, arithmetic, hierarchy, timeline, visual`. **`columns` no está.** |
| Naturaleza del archivo | `projection_only: true`, `source_of_truth: false` |
| Validador | `validate-project-console-state.mjs:709-726` hardcodea la **misma** lista de 16 y también omite `columns` |
| Snapshot | reporta `components_tracked: 16` de forma independiente |
| Salida del validador | `Component statuses: 16`, antes y después |

**El hueco es consistente en las tres partes**, no es deriva. **No se creó la entrada, no
se supuso un status, no se editó la proyección, no se retiró el archivo.**

La DoD sí contempla este caso: §6, fila «Absent from the projection | `columns` | Declare
the absence in the record; do not invent a state; do not edit the projection.» **Se
cumplió al pie de la letra.** Lo que la DoD **no** dice para este caso está en el veredicto
§10, S7-b.

---

## 10. VEREDICTO SOBRE LA DoD

Este es el segundo entregable del encargo. De él cuelgan dieciséis componentes.

**Resumen en una línea: la DoD es ejecutable y su arquitectura es correcta, pero tiene
cuatro huecos que obligan a decidir por ella, y esos cuatro son exactamente lo que impide
un lote de tres sin perder comparabilidad.**

### 10.1 Paso por paso

| Paso | ¿Ejecutable tal cual? | ¿Hubo que interpretar? | Hueco concreto |
|---|---|---|---|
| **S1** | Sí | Mínimo | Dice «confirm the lane», pero un run DEVELOPMENT **no lleva clave `lane`** en el canónico: se deriva de `lanes[].default: true`. Literalmente no hay campo que confirmar. Debería decir «lane, explícito o por defecto». |
| **S2** | Sí | No | Nombra «both schemas» pero **nunca pide compararlos entre sí**. Una deriva editor-ui vs compiler-api pasaría S2 en silencio, que es justo la clase de defecto para la que S2 existe. Aquí son idénticos; no siempre lo serán. |
| **S3** | Sí, con dos fricciones | **Sí, dos veces** | **(a) No dice dónde vive el bloque de auditoría.** El contrato dice «every run includes a block»; ¿incluido en qué artefacto? La celda de evidencia pide «audit block location», luego debe ser citable, pero nada nombra record, packet o QA packet. Elegí el record. **(b) Las diez preguntas son una sola frase con punto y coma**, no una lista numerada. Partirla en diez ya es interpretación: «whether the palette correctly affects the editor, Preview Real, and Generate Web» ¿son una pregunta o tres? Yo las conté como tres. Otro lector cuenta distinto y la tabla deja de ser comparable. |
| **S4** | Sí, con las mismas dos | **Sí** | Mismos (a) y (b). Y uno propio: **para los once componentes sin math, ocho de las diez preguntas son vacías.** «¿Quién posee los delimitadores?» sobre un componente sin delimitadores no produce señal, produce ruido. La DoD ordena correr el bloque «for every component regardless»; hace falta una cláusula «si la fila §5 dice none, responde Q1 y Q2 y declara el resto vacío». |
| **S5** | **Sí, sin fricción** | No | El único paso con exención explícita para `columns`, y se agradece. Detalle cosmético: el criterio de salida es «both placements recorded», que no aplica al caso NOT_APPLICABLE que el propio paso nombra. |
| **S6** | Sí | Un poco | Criterio de salida **más débil del conjunto**: «roundtrip evidence recorded». No dice si vale citar un test existente o hace falta medición viva. Hice las dos. En un lote, unos citarán tests y otros medirán: no comparable. |
| **S7** | Sí en la frontera, no en la logística | **Sí, tres veces** | Ver 10.2. Es el paso con más huecos y a la vez el que mejor resuelve lo importante. |
| **S8** | **Sí, sin fricción. El mejor paso del documento.** | No | Cuatro salidas, cada una con su acción, y la cláusula «an observation made by the workshop itself is a measurement to declare, never a repair authorization» es exactamente la barandilla que este tipo de run necesita — la apliqué tres veces (§4.5, §5.1, §4.4). Residuo: gobierna reparación **de código**; no dice si un defecto **de documentación** hallado por el taller es reparable bajo S9 sin veredicto de QA. Leí que sí. La lectura contraria es igual de disponible y produce otro run. |
| **S9** | **No del todo** | **Sí, y es estructural** | Ver 10.3. Es el problema serio y no es de redacción. |
| **S10** | Sí | Poco | Dice refrescar «the component packet's entry», en singular: **no contempla que el run registre además un artefacto nuevo**. Pero si S7 debe producir un archivo con nombre, S10 tiene que contemplar registrarlo. Segundo: «verify every preserved conflict… is intact» usa el conflicto de `list` como ejemplo; para `columns` no hay ninguno, y la mitad de no-claims no tiene vía NOT_APPLICABLE aunque los pasos enteros sí la tengan. |

### 10.2 S7 en detalle — la frontera está bien, la logística no

**Lo que está bien, y es lo más importante del documento:** la frontera taller/operador
está trazada sin ambigüedad («The workshop never executes Human QA»), con reparto
explícito de quién hace qué. La ejecuté sin dudar una sola vez. Eso hay que conservarlo
literal.

**Hueco (a) — no nombra ubicación ni convención de nombre para el packet.** La celda de
evidencia es «packet filename», luego un archivo debe existir; pero nada dice dónde.
Descarté `docs/components/web/` porque el contrato single-source fija «seventeen packets»
ahí y un decimoctavo archivo rompería esa medición; descarté el archivo porque está
congelado por política D2. Elegí `docs/_historical_run_record/`, el gemelo vivo del
directorio de run records archivados, que estaba **vacío**. Es defendible y lo declaro,
pero es una decisión que tomé yo. **Tres runs en una sesión tomarán tres decisiones
distintas.** Es el hueco más concreto y más fácil de cerrar de todo el documento.

**Hueco (b) — el más serio de S7, y solo se ve con `columns`.** La tabla §6 indexa el
manejo de S7 **por la proyección y nada más**. Para `columns`, la única fila «Absent from
the projection», la instrucción es «declare la ausencia» y ahí termina. Pero **sí existe
un PASS de QA humana registrado para `columns`**, en la matriz (`:189`) y en la cadena de
PASS archivados (§8). La propia DoD dice en §3 expectativa 6 y en §9 que la matriz es la
fuente única de estado — y sin embargo §6 nunca manda mirar ahí. **Una ejecución literal
de S7 habría declarado «no hay veredicto previo» y preparado un packet completo mientras
un PASS estaba en la fuente de estado.** Lo encontré porque el encargo me mandó medir
`docs/archive/author-lite/`, no porque la DoD lo pidiera. Corrección: la tabla §6 debe
mandar consultar la fila de la matriz y la cadena de PASS archivados, no solo la
proyección.

**Hueco (c) — la buena idea que `columns` no puede usar.** La fila
`EXPLICIT_HUMAN_PASS_PRESERVED` trae un concepto excelente: «prepare a delta packet
covering only surfaces the PASS predates». Es exactamente lo que `columns` necesitaba,
porque su PASS predata la paleta configurable. Pero `columns` está en otra fila y la
cláusula no le alcanza. **La apliqué por analogía** — checks 3, 4 y 7 del packet cubren
justo la superficie que el PASS previo no vio. Eso es interpretación que la DoD pedía no
tener que hacer.

### 10.3 S9 en detalle — el par DEVELOPMENT/DOCUMENTATION colisiona sobre el mismo archivo

Este no es un problema de redacción; es de diseño, y se repite diecisiete veces.

- **S9** encarga al run DEVELOPMENT actualizar `docs/components/web/<NAME>.md` según el
  contrato single-source.
- **El run emparejado** — para `columns`, `RUN-CANTU-WEB-COLUMNS-DOC-001`, `queue_order`
  14 — está encargado de «verify the packet against the component-doc single-source
  contract» y «repair its two stale pointers». **Mismo archivo, deber sustancialmente
  igual.**
- Y la **§2 de la propia DoD** fija como regla vinculante: «Disjoint write surfaces per
  component… **Two runs never touch one file.**»

La regla está escrita pensando en componentes hermanos; el par la incumple en silencio.

**Cómo lo resolví, y por qué es mi decisión y no la de la DoD:** toqué solo lo que las
mediciones de **este** run exigen y que el encargo de #14 **no nombra**, y dejé intacto lo
suyo. Concretamente:

- **Corregido** (error de anclaje derivado, prohibido por el contrato §3 «renderer-internal
  fields presented as author-facing»): el packet afirmaba «Child blocks accept placement
  metadata (`fullWidth`, `colSpan`) to span the full width». **Es falso para el pipeline de
  autor.** El schema **rechaza** `fullWidth`/`colSpan` en un hijo `callout`
  (`webColumnsChildExpansionSafety.test.mjs:150-168`), los **elimina** en un hijo `card`
  (`:169-192`), y el compiler los vuelve a eliminar para todo hijo de columna
  (`compiler.js:1073`, test `:193`). Solo son alcanzables por `jame_data` a mano.
- **Añadido**: el hueco de `title` sin control de edición; que `split` no se ofrece en el
  menú; que both-empty renderiza como nada; el `<h3>` a color fijo; los punteros
  reference-only de color y math (que el contrato §3 exige como contenido reference-only y
  el packet no tenía); y la invariancia de scope del color dentro de slots.
- **Banner** `Last verified` movido 2026-07-12 → 2026-07-29, junto con la entrada del
  registro, como exige el contrato §6 («refresh… together»).
- **NO tocado, y es de #14**: los dos punteros rotos. Ambos verificados rotos en disco:
  `docs/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` **no existe** (el real es
  `docs/archive/author-lite/components/…`) y `docs/REFERENCE-DRAFT-JSON.md` **no existe**
  (el real es `docs/reference/REFERENCE-DRAFT-JSON.md`). Cuatro ocurrencias en total,
  byte-idénticas tras mi edición. **Son suyos; los dejo.**

**Corrección necesaria:** la DoD debe repartir el deber del packet entre el par de forma
explícita, o los diecisiete pares volverán a litigarlo uno por uno.

### 10.4 Lo que la DoD hace bien y no debe tocarse

- **La frontera de Human QA** (§6): sin ambigüedad, reparto explícito. Lo mejor del documento.
- **La puerta S8**: cuatro salidas cerradas y la cláusula observación≠autorización.
- **La tabla de evidencia** (§7): estructura verbatim y celdas de ruta exacta. Funciona; la llené sin fricción.
- **El vocabulario de cinco veredictos**: asigné uno sin dudar.
- **La matriz de aplicabilidad** (§5) con su regla de divergencia «gana el disco»: para `columns` coincidió exactamente con lo medido. Cero divergencias que declarar.
- **Las excepciones por componente** (§8): la de `columns` («layout-only and absent from the status projection») describe con precisión lo que encontré.

### 10.5 ¿Se puede aplicar esta DoD a tres o cuatro componentes en una sola sesión?

**Tal como está escrita, no. Y el obstáculo no es el tamaño de los pasos: es que cuatro
de los diez exigen una decisión que la DoD no toma.**

Las cuatro decisiones son: (1) dónde viven los bloques de auditoría S3/S4; (2) cómo se
parten en diez las diez preguntas en prosa; (3) dónde va el archivo del packet de S7; y
(4) quién posee el packet entre el run DEVELOPMENT y el DOCUMENTATION del par. Las cuatro
las resolví yo, una vez.

En un lote de tres pasa una de dos cosas, y ninguna sirve:

- **Un solo actor toma las cuatro decisiones tres veces** — entonces son convenciones de
  facto y su sitio es la DoD, no la cabeza del ejecutor.
- **Tres actores las toman por separado** — y el lote produce tres veredictos no
  comparables, que es exactamente lo que la §2 dice que un lote no debe hacer («a batch
  produces N independent, **comparable** verdicts without interpretation»).

**Medición de coste, para calibrar:** este run consumió una sesión completa sobre el
componente **más simple del conjunto**: sin superficie de color, sin superficie de math,
S5 autoexento, sin reparación, y con un PASS previo ya registrado. No hay componente más
barato entre los diecisiete.

**Recomendación concreta, en este orden:**

1. **Cerrar los cuatro huecos primero.** Es una pasada de corrección de la DoD, de cabina,
   y es barata comparada con repetirlos dieciséis veces. Añadir además: numerar las diez
   preguntas de cada contrato como lista, la cláusula de preguntas vacías para los sin-math,
   la comparación entre los dos schemas en S2, y el registro del artefacto de S7 en S10.
2. **Después, lotes de tres solo para los de superficie nula**: `video`, `narrative`,
   `details`, `visual` — `NO_COLOR_SURFACE` y sin math. Ahí S3 y S4 son NOT_APPLICABLE
   justificados y el trabajo real es S2, S6 y S7.
3. **Nunca en lote los cuatro que entran con QA humana fallida** (`narrative`, `callout`,
   `details`, `rule`): S8 exige **reproducir contra código vivo** un defecto registrado
   antes de tocar nada, y eso es investigación por componente sin trabajo compartido.
   Nótese que `narrative` y `details` aparecen en las dos listas: mandan sobre ellos su
   QA fallida, no su superficie nula.
4. **Los seis con math** (`rule`, `table`, `arithmetic`, `split`, `timeline`, `hierarchy`)
   y los dos con superficie de color viva (`callout`, `timeline`): de a uno o de a dos.
   `split` además arranca en la puerta de catálogo, no en S2.

---

## 11. Defectos ya nombrados que aparecieron en el camino y se dejaron intactos

Ninguno es de este run. Se nombran y se dejan, como manda el criterio 10.

| Defecto | Dónde apareció | Acción |
|---|---|---|
| `hierarchy` emite `nodes[].math` sin delimitadores | Inventario §9; contrato math §9 | Nombrado, intacto. Es de `RUN-JAME-WEB-HIERARCHY-AUDIT-AND-REPAIR-001` |
| `conceptGrid` en categoría math sin campo math | Inventario §9; `blockCatalog.js:96-98` | Nombrado, intacto |
| Alias `success` de `detailsVariant` resuelve al color `ctx` | Contrato de color, decisión abierta 4 | Nombrado, intacto. **Decisión abierta: no se decide** |
| Siete componentes con el patrón de regresión de paleta | Inventario §3 y §9 | Nombrados, intactos. `columns` **no** es uno de ellos |

---

## 12. Superficies disjuntas — criterio 20

**No se tocó nada de `aiw-console` salvo escribir este record.** Prueba por mtime: todas
las superficies protegidas tienen fecha de modificación **anterior** al inicio de esta
sesión (14:22–14:24 del 2026-07-29).

| Ruta (`projects/aiw-console/`) | mtime | md5 |
|---|---|---|
| `roadmap/roadmap.json` | 2026-07-28 03:33:31 | `f299d968fdf781bf31863d696bd9610e` |
| `context/aiw-console/CONTRATO.md` | 2026-07-27 15:48:27 | `f77ccec64d99f2048d4bde41638cb228` |
| `context/DECISIONES.md` | 2026-07-28 14:10:46 | `3f6bdf8816a0b43818519eb3582f6511` |
| `.project/` (6 archivos) | 2026-07-29 03:51 | re-emitido por el hilo paralelo, no por mí |
| `context/aiw/` | contenido de 2026-07-23/24 | sin tocar |

**Salvedad honesta:** para estas rutas tomé md5 **al final**, no al principio. La prueba
de no-modificación es el mtime anterior a la sesión, no un par antes/después. Tests,
handoffs y records existentes: sin tocar.

### `.project/` de cantu-studio — criterio 18

**No lo re-emití.** Se movió sin ser yo: los seis archivos tienen mtime **2026-07-29
14:11**, el mismo minuto que `.aiw/roadmap/roadmap.json` — es la escritura atómica de la
consola que acompañó a la renumeración, anterior a esta sesión. md5 al final de sesión,
sin cambio respecto al inicio:

| Archivo | md5 |
|---|---|
| `.project/docs_index.json` | `aa0aea3f8561389f8181d23ec7f52a18` |
| `.project/git_history.json` | `390fd69318df15461dd8c3ee903b1a44` |
| `.project/guardrails.json` | `cf7379494defd81662448d5b917ca3a8` |
| `.project/no_claims.json` | `57569380573de9f366ed1af5650e77a0` |
| `.project/roadmap.json` | `c8f24f7a710a7b86a684ea4ca86dde4a` |
| `.project/snapshot.json` | `19b81686db48d1b4b9fadcbb0ff939f5` |

**Consecuencia declarada:** `.project/docs_index.json` quedó desfasado respecto a
`.aiw/docs/docs_index.json` en la entrada nueva y la refrescada. Es normal — solo la
consola re-emite `.project/` — y se resuelve cuando la cabina cierre el run.

---

## 13. Superficies protegidas — md5 antes y después

| Archivo | md5 antes | md5 después | ¿Cambió? |
|---|---|---|---|
| `.aiw/state/component_status.json` | `f591165bbf19862b04433129d9edf2cb` | `f591165bbf19862b04433129d9edf2cb` | **No** |
| `.aiw/roadmap/roadmap.json` | `e8e2ac53da5af16b75ddb8eff5aa4264` | `e8e2ac53da5af16b75ddb8eff5aa4264` | **No** |
| `…/preview/ComponentGuide.jsx` | `85a80dc96f5f37944dbf12eb4a550dc1` | `85a80dc96f5f37944dbf12eb4a550dc1` | **No** |
| `…/scripts/checkComponentGuideTextIntegrity.cjs` | `0b6c7cbf10fc87b4a25a5ff342583e82` | `0b6c7cbf10fc87b4a25a5ff342583e82` | **No** |
| `.aiw/docs/docs_index.json` | `2100f1bfa1ecbbbc0a8bd423b5019f9f` | `b69f83cffefb0a4448b6be77bdb38f2a` | Sí, §7 |
| `docs/components/web/COLUMNS.md` | `853bd17e37fb31c0628d5ffae0bc655b` | `d4bea38371d6ad7e798fd604b40b421a` | Sí, S9 |

**El Component Guide, su script guardián y el `statusLabel` inline: intactos, byte a
byte.** Es otro run (`RUN-CANTU-COMPONENT-GUIDE-PACKET-WIRING-001`).

---

## 14. Archivos escritos por este encargo, y ninguno más

Verificado con un barrido de todo el repo por mtime, no solo de los directorios esperados.

| # | Archivo | Acción | md5 final |
|---|---|---|---|
| 1 | `docs/_historical_run_record/RUN-JAME-WEB-COLUMNS-REVALIDATION-001-OPERATOR-QA-PACKET.md` | **Creado** (S7) | `d65dc897d46f346197c65c5e91b59187` |
| 2 | `docs/components/web/COLUMNS.md` | **Editado** (S9) | `d4bea38371d6ad7e798fd604b40b421a` |
| 3 | `.aiw/docs/docs_index.json` | **Editado** (S10) | `b69f83cffefb0a4448b6be77bdb38f2a` |
| 4 | `../aiw-console/context/aiw-console/records/REVALIDACION-COLUMNS-Y-VEREDICTO-DE-LA-DOD-CANTU.md` | **Creado** | este record |

**Ningún archivo de código, schema, renderer o test fue modificado.** Tres archivos
tocados en `cantu-studio`, más este record fuera del repo. Los archivos temporales de
medición viven en el scratchpad de sesión, fuera del repo.

**Records existentes:** había **64** antes de este. Este es el **65**. Sin colisión de
nombre: no existía ningún record con `COLUMNS`, y los que llevan `DOD` o `VEREDICTO` en el
nombre son otros dos distintos.

**Cumplimiento del Blueprint** en los dos artefactos creados/editados: inglés ASCII puro
verificado con barrido de bytes (cero caracteres fuera de rango en ambos), banner de
status presente en los dos, rutas repo-relativas completas. Este record va en español,
como corresponde.

---

## 15. Lo que este run dejó hecho que podría tocarle a `queue_order` 14

Se declara para que la cabina decida; **no se ejecutó nada suyo.**

| Cosa | Estado |
|---|---|
| Los **dos punteros rotos** que #14 nombra explícitamente | **Intactos, sin tocar.** Verificados rotos en disco (§10.3). Siguen siendo suyos |
| Verificación del packet contra el contrato single-source | **Hecha parcialmente.** Confirmé las ocho secciones requeridas, en orden, más banner y tabla de metadatos. #14 puede reusarlo o rehacerlo |
| Banner `Last verified` refrescado a 2026-07-29 | **Hecho por este run**, junto con la entrada del registro, como exige el contrato §6. #14 lo volverá a mover cuando repare los punteros |
| Entrada del registro para `COLUMNS.md` | **Refrescada por este run** (§7) |
| Anclajes derivados del packet corregidos | **Uno corregido** (placement metadata) y **cinco hechos añadidos** (§10.3). Todos fuera del encargo nombrado de #14 |

`RUN-CANTU-WEB-COLUMNS-DOC-001` **no se tocó**: sigue `planned`, con su `depends_on`
intacto.

---

## 16. Estado en que debe quedar el run — declaración, no ejecución

**`RUN-JAME-WEB-COLUMNS-REVALIDATION-001` debe quedar en `active`.**

Vocabulario del contrato, exclusivamente: `planned`, `active`, `blocked`, `completed`.

Razón: el trabajo del taller está completo — los diez pasos ejecutados, veredicto
`READY_FOR_OPERATOR_QA` — pero el run depende de una QA humana que solo el operador puede
ejecutar. No es `blocked`: nada impide avanzar, la vía normal es que el operador corra el
packet. No es `completed`: eso lo decide la cabina tras la QA.

**No se tocó `status`, ni `progress`, ni `closeout_result` de ningún run.** El canónico
está byte-idéntico (§13).

---

## 17. No-claims de este record

- **No se certifica nada.** La certificación no es concepto retirado
  (`GOVERNANCE-AUTHORITY-AND-NO-CLAIMS.md` §2 y §3); lo deprecado es `certified` como
  etiqueta primaria de status de un run. Este run no certifica y no otorga ninguna puerta.
- **El status de componente conserva su fuente única**, la matriz. Ningún veredicto de la
  DoD cambia un status, y este no cambió ninguno.
- **La QA humana no se ejecutó, no se simuló y no se dio por pasada.** El packet de S7
  tiene todas sus celdas de veredicto vacías por diseño.
- **El PASS previo de `columns` se cita como evidencia histórica**, no se consume como
  resultado vigente. Citarlo no es un claim de aprobación.
- **No se decide ninguna decisión abierta**: seis del contrato de color, ocho del de math.
  Ninguna tocada.
- **No se creó la entrada de `columns` en la proyección** ni se supuso un status para él.
- **No se reparó código.** Cero archivos de código, schema, renderer o test modificados.
- **No se corrigió la DoD.** Se critica en §10; corregirla es de cabina.
- **No se ejecutó git en ninguna forma**, no se levantaron servidores, no se corrieron
  suites de `aiw-console`.
- **El run sigue abierto** hasta que el operador lo cierre desde la consola.
