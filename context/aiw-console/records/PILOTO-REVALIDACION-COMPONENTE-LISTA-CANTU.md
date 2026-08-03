# Piloto de revalidación de componente — «Lista» — `cantu-studio`, `queue_order` 20

Primera aplicación de la Definition of Done de revalidación **después** de su refresco. Dos
entregables: la revalidación de `list` y un veredicto sobre el procedimiento mismo. Catorce
runs de componente lo ejecutarán después; lo que aquí no sea ejecutable, allí se multiplica.

---

## 1. Identidad del run, derivada del canónico — NO tecleada

Derivada de `projects/cantu-studio/.aiw/roadmap/roadmap.json` recorriendo
`objectives[].phases[].runs[]` y filtrando por `queue_order === 20`. Una sola coincidencia.

| Campo | Valor |
|---|---|
| `queue_order` | 20 |
| `run_id` | `RUN-JAME-WEB-LIST-REVALIDATION-001` |
| `title` | `Audit and implement the List component` |
| Comprobación verbatim del título | **`true`** — comparación de igualdad estricta, no aproximada |
| Objetivo / fase | `O1` / `O1.P1C` |
| `status` | `active` (no se toca) |
| `lane` | **ausente en el run**; se deriva `DEVELOPMENT` de `lanes[].default: true` |
| `depends_on` | `RUN-JAME-WEB-COMPONENT-CONTRACT-STANDARDIZATION-001`, `RUN-JAME-WEB-COMPONENT-BASELINE-RECONCILIATION-001`, `RUN-JAME-COLOR-PALETTE-COMPATIBILITY-CONTRACT-001` — los tres `completed` |
| Clasificación | `JUDGED_DEFINES` / `FUNCTIONAL` / `ADJACENT` / `VISIBLE` |

Totales verificados en disco, no heredados: **66 runs**, `queue_order` 1..66, 21 `completed`,
1 `active` (este), 44 `planned`.

### 1.1 El `full_description` íntegro, leído antes de empezar

Se cita verbatim porque es la especificación que este ticket ejecuta sin ampliar:

> Audit the List component against the color and palette compatibility contract, using the
> current component inventory as the starting point. Where the inventory shows the component
> carries hardcoded or local colors instead of the shared palette, or lacks a required
> integration point, implement the missing integration. Repair only what the audit and human
> visual QA show to be a real defect; do not rewrite accepted behavior. Verify the result by
> human visual QA rather than an automated test suite, since the repository has no test runner.

### 1.2 Discrepancia entre el texto del run y el disco — declarada, no reparada

La cláusula final del `full_description`, *«since the repository has no test runner»*, es
**falsa en disco**: existen 32 archivos `*.test.mjs` bajo
`tools/author-lite/compiler-api/tests/` que corren con `node --test`. La Definition of Done
ya resuelve este choque de forma general y a su favor, en §12:

> **The component run texts are stale on the test-runner clause, and the procedure governs.**
> […] Where a run text and this document disagree on that point, **this procedure is what the
> run executes**.

De modo que la primera mitad de la cláusula —QA humana del operador como compuerta de
cierre— **sigue vigente y se obedece**; la segunda se declara vencida y no se enmienda: el
texto del run es del carril del operador sobre el canónico, no del taller.

---

## 2. La tabla de evidencia de la Definition of Done §7 — estructura verbatim

```
Component: list    Run: RUN-JAME-WEB-LIST-REVALIDATION-001 (queue_order 20)    Date: 2026-08-02

| Step | Measured against | Result | Evidence |
|---|---|---|---|
| S1 identity | .aiw/roadmap/roadmap.json | PASS | RUN-JAME-WEB-LIST-REVALIDATION-001 + "Audit and implement the List component" |
| S2 state audit | catalog / schemas / compiler / renderer / fixture | PASS | §3, siete capas citadas, cero UNKNOWN |
| S3 color audit | color contract Section 9 | PASS + COLOR_PALETTE_VARIANT_OR_TOKEN_ONLY | bloque en §4 de este record |
| S4 math audit | math contract Section 10 | PASS + MATH_FORMULA_NOT_APPLICABLE | bloque en §5 de este record |
| S5 columns placement | top-level + both slots | PASS | §6; blockCatalog.js:30-35, WebBlockEditor.jsx:1793-1834 y :3965-3999 |
| S6 persistence | save/load + import | PASS | §7; cuatro drafts en disco + ida y vuelta idempotente |
| S7 human qa | Section 6 boundary | PREPARED | docs/_historical_run_record/RUN-JAME-WEB-LIST-REVALIDATION-001-OPERATOR-QA-PACKET.md |
| S8 repair gate | reproduced QA defects | DECLARED (no reproducible) | §8; defecto registrado "missing current palette sync/custom picker" no reproduce |
| S9 packet | single-source contract | PASS | ningún packet ni Guide escrito; tres discrepancias enrutadas en §9 |
| S10 registry + no-claims | docs_index + conflicts | PASS | §10; docs_index.json sin escribir; conflicto `list` intacto |

Verdict: READY_FOR_OPERATOR_QA  (con la reserva de §11.2: S8=DECLARED no encaja en ningún veredicto)
Open decisions touched: none
```

---

## 3. S2 — Auditoría de estado, con archivo y línea

Siete capas. Ninguna quedó en UNKNOWN.

| Capa | Ruta y línea | Medición |
|---|---|---|
| Catálogo (metadatos) | `tools/author-lite/editor-ui/src/features/editor/constants/blockCatalog.js:30-35` | `label: 'Lista'`, `category: 'basics'`, `rail: true`, `order: 40`. **Sin `disabled`** — el bloque es agregable |
| Catálogo (entrada) | `.../blockCatalog.js:233-239` | `id: 'web-list'`, `action: 'list'`, `label: 'Lista'`, `icon: 'List'` |
| Editor, top-level | `.../components/web/WebBlockEditor.jsx:3965-3999` | Título, `VariantSelect … allowCustom` (`:3970`), `TextSizeSelect`, `ListItemsTextarea` |
| Editor, hijo de columnas | `.../WebBlockEditor.jsx:1793-1834` | Los mismos cuatro campos con `ColumnColorSelectField … allowCustom` (`:1805-1814`) |
| Schema editor-ui | `tools/author-lite/editor-ui/src/schemas/draftSchema.js:724-730`; unión top-level `:967`; unión hijo de columnas `:900` (`.strict()`) | `variant` = token id **o** `#RRGGBB`; `textSize` con default `medium`; `items` array, máx. 30 |
| Schema compiler-api | `tools/author-lite/compiler-api/schemas/draftSchema.js:749-758`; uniones `:995` y `:928` | Idéntico salvo el `preprocess` de `items`, divergencia **documentada e intencional** en el comentario `:736-747` |
| Compilador | `tools/author-lite/compiler-api/services/compiler.js:1163-1184` | `resolveVariantColorToken` (`:199`) + `buildColorRolesOutput` (`:162`); emite `type, title, variant, color, surface, border, textColor, textSize, items` |
| Renderer | `src/builders/web/partials/renderList.js:84-161`, preferencia en `:94` | Prefiere `data.color` si es `#RRGGBB` válido; si no, cae al mapa fijo de `commons.js` |
| Defaults | `tools/author-lite/editor-ui/src/features/editor/utils/blockFactory.js:31-32` y `:238-239` | `{ kind:'list', title:'', variant:'ctx', textSize:'medium', items: [] }`, idéntico top-level y en slot |
| Fixture sandbox | `src/content/sandbox/test_multimedia.js:50` | `{ type:'list', title:"Características", items:[…] }` — sin `variant`, ejercita el respaldo legacy |

**Nota sobre `blockDefaults.js`:** el archivo existe y está **vacío, 0 líneas**. Los defaults
viven en `blockFactory.js`. Se declara porque `CLAUDE.md` lo lista entre las referencias de la
auditoría 8.6.1 y un lector podría buscarlos ahí.

### 3.1 Los dos schemas comparados entre sí — lo que S2 no pide

La Definition of Done nombra *«both schemas»* pero **nunca ordena compararlos**. Se hizo igual,
porque una deriva entre ellos pasaría S2 en silencio. Diez casos, ejecutados contra los dos:

| Caso | editor-ui | compiler-api | |
|---|---|---|---|
| token id `ctx` | ACEPTA | ACEPTA | |
| hex personalizado `#FF007F` | ACEPTA | ACEPTA | |
| sin `variant` | ACEPTA | ACEPTA | |
| sin `textSize` | ACEPTA (default `medium`) | ACEPTA (default `medium`) | |
| `items: []` | ACEPTA | ACEPTA | |
| `items` string legacy `"a\nb"` | RECHAZA | ACEPTA → `["a","b"]` | **DIVERGEN — intencional y documentada** |
| 31 ítems | RECHAZA | RECHAZA | |
| ítem vacío | RECHAZA | RECHAZA | |
| `variant` inválido | RECHAZA | RECHAZA | |
| campo extra | ACEPTA | ACEPTA | |

La única divergencia es la que el propio código declara como deliberada. **Segunda medición:**
un campo extra se acepta top-level y **se rechaza dentro de un slot** (`Unrecognized key(s) in
object: 'nope'`), porque la unión de hijos usa `.strict()` y la top-level no. El compilador
construye su salida campo a campo, así que el extra nunca llega al motor por ninguna vía.
Asimetría medida, sin efecto en la salida; se declara, no se repara.

---

## 4. S3 — Color palette compatibility audit

Bloque obligatorio de diez preguntas del contrato de color §9. Todas las respuestas son
medición viva: compilación real contra dos paletas cuyos accents difieren, y render real.

**1. ¿Expone campos, variantes, estilos o tokens dependientes del color?** Sí, exactamente
uno: `variant`, que admite token id de la paleta activa o `#RRGGBB`.
`compiler-api/schemas/draftSchema.js:752`.

**2. ¿Qué emite el compilador?** Con paleta A (`ctx = #123ABC`) y paleta B (`ctx = #ABC123`):

```
paleta A -> {"type":"list","title":"Caracteristicas","variant":"ctx","color":"#123ABC","surface":"#ECEFFA","border":"#ACBAE8","textColor":"#1E293B","textSize":"medium","items":["Punto uno","Punto dos"]}
paleta B -> {"type":"list","title":"Caracteristicas","variant":"ctx","color":"#ABC123","surface":"#F8FAED","border":"#E2E9B2","textColor":"#1E293B","textSize":"medium","items":["Punto uno","Punto dos"]}
```

**3. ¿La paleta afecta correctamente al editor, a Preview Real y a Generate Web?** Sí a los
tres. El editor: el control consume `palette`, que
`hooks/useAuthorColorPalette.js:33` define como `normalizeAuthorColorPalette(activeWebPalette?.tokens || …)`
— la paleta **Web** activa, que es la que resolverá el valor al compilar. Preview Real y
Generate Web comparten `compileDraftToJameData`, así que coinciden por construcción. Render
medido:

```
hex en HTML A : #E2E8F0 #1E293B #123ABC #475569
hex en HTML B : #E2E8F0 #1E293B #ABC123 #475569
HTML distinto entre paletas : true
```

**4. ¿Save/load e importación de Draft JSON preservan la selección?** Sí. Ver §7.

**5. ¿Se sostienen contraste y legibilidad?** El accent pinta viñetas y la línea bajo el
título. El **texto del ítem es `#475569` fijo** y el título `#1E293B` fijo
(`renderList.js:104` y `:124`), no derivados del accent: ningún accent, por claro que sea,
puede volver ilegible el cuerpo del texto. El riesgo de contraste queda acotado a la viñeta y
al filete, elementos decorativos. **No es una garantía de diseño**; es la medición de dónde
puede y dónde no puede fallar.

**6. ¿Funciona top-level?** Sí, medido arriba.

**7. ¿Funciona dentro de los slots de columnas sin romper legibilidad?** Sí; ver §6. Las
claves emitidas en un slot son **idénticas** a las de top-level.

**8. ¿Qué pasa con un token que la paleta activa no define?** No cae a `ctx`: cae al **token
por defecto del mismo id**. Con paleta `[ctx, def]` y `variant: 'meta'` la salida es
`color: "#4C566A"`, el `meta` por defecto. La causa está medida:
`colorSystem.js:452-490`, `normalizeAuthorColorPalette` **unifica la paleta del autor sobre
los nueve tokens por defecto** antes de resolver, así que el paso 1 del orden de resolución
casi siempre acierta. **Divergencia contra el contrato de color §4**, declarada en §11.1.

**9. ¿Qué pasa sin paleta activa, y con un draft legacy?** Sin paleta: `color: "#5E81AC"`, el
`ctx` por defecto. Con data legacy sin clave `color`, el renderer cae a su mapa fijo y pinta
`#5E81AC`. Nada se rompe. Coincide con el contrato §5.

**10. ¿Qué límites y variantes debe documentar el packet del componente?** Los nueve tokens
por nombre visible (Azul, Morado, Cian, Dorado, Champagne, Verde, Naranja, Rojo, Gris), la
opción **Personalizado**, y **que un hex personalizado queda congelado y no sigue a la
paleta** — medido: compilado contra dos paletas distintas, la salida es byte a byte idéntica.

**Clase asignada: `COLOR_PALETTE_VARIANT_OR_TOKEN_ONLY`.** Justificación: un único control de
color discreto, sin mapeo multi-rol author-facing. No es `DIRECT_SUPPORT_REQUIRED` porque el
color no porta el contrato visible del bloque —la lista se lee igual en cualquier color— ni
`CONDITIONAL_OR_BOUNDED` porque no hay modo en que el color deje de aplicar.

---

## 5. S4 — Math and formula compatibility audit

El bloque de diez preguntas del contrato de math §10 se ejecuta **para todo componente,
independientemente de su fila**. Para `list` la fila §5 dice `none` en math, y ocho de las
diez preguntas resultan vacías. Se responden igual, y se declara cuáles son vacías y por qué
—que es lo que la Definition of Done pide y lo que §11.4 critica.

**1. ¿Expone algún campo de math o fórmula?** **No.** Las claves del bloque son `kind`,
`title`, `variant`, `textSize`, `items`; ninguna acepta math.
`compiler-api/schemas/draftSchema.js:749-758`. Confirmado además por el contrato de math §5,
que lista `list` entre los nueve sin campo de math.

**2. ¿Qué superficie de entrada usa cada campo?** VACÍA — no hay campo.

**3. ¿Ofrece el editor visual de fórmulas o una entrada de texto plano?** **Ninguno de los
dos.** El campo visual se monta solo para `kind === 'rule'` (contrato de math §8) y `list` no
tiene ningún campo de math que pudiera ser de texto. Medido en
`WebBlockEditor.jsx:3965-3999`: cuatro controles, ninguno de fórmula.

**4. ¿El compilador emite delimitadores, y de quién son?** VACÍA — nada que delimitar.

**5. ¿Un delimitador autorado se elimina o se duplica?** VACÍA.

**6. ¿El HTML renderizado produce salida KaTeX?** **No, y es correcto.** Medido sobre el HTML
real: `/\\\(|\\\[/` no casa en ninguna parte. Si un autor escribe `\(x\)` dentro de un ítem,
el compilador lo escapa como texto y el motor no lo envuelve — se verá como texto literal.
Esto **no es el patrón de regresión de math** del contrato §9, porque ese patrón exige que
exista un campo `math` que el schema acepte; aquí no hay campo.

**7. ¿Save/load e importación preservan la fórmula?** VACÍA.

**8. ¿Funciona dentro de los slots de columnas?** VACÍA en cuanto a math; la colocación en
slots está medida en §6 por otra vía.

**9. ¿Qué límites de longitud y forma debe documentar el packet?** VACÍA para math. Los
límites que sí existen —30 ítems, ítem no vacío— son del bloque, no de una superficie de
math, y se documentan en §3 y en el packet.

**10. ¿Qué texto de fallo ve el autor cuando se rechaza una fórmula?** VACÍA — no hay fórmula
que rechazar.

**Clase asignada: `MATH_FORMULA_NOT_APPLICABLE`.** Justificación: cero superficies de math en
schema, editor, compilador y renderer, coincidiendo con la fila §5 de la Definition of Done y
con el contrato de math §5.

---

## 6. S5 — Colocación en columnas

`list` es hijo válido de **«Dos columnas»** en las dos uniones de schema
(`editor-ui:900`, `compiler-api:928`), está ofrecido en el menú de hijos
(`WebBlockEditor.jsx:255`, `{ kind: 'list', label: 'Lista' }`) y tiene su propia rama de
editor en slot (`:1793-1834`).

**Invariancia de alcance de las opciones de color (contrato §7):** el control en slot es
`ColumnColorSelectField … allowCustom` (`:1805-1814`) y el top-level es
`VariantSelect … allowCustom` (`:3970`). Ambos terminan en el mismo
`ColorTokenOrCustomField` de `common/VariantSelect.jsx:77-121`, que construye sus opciones
con `getAuthorColorOptions(palette)` y añade una única opción `Personalizado` (`:116`). **Las
mismas opciones en las tres colocaciones.**

Medición viva, ambos slots, dos paletas:

```
slot left  -> {"type":"list","title":"Izquierda","variant":"ctx","color":"#123ABC",…}
slot right -> {"type":"list","title":"Derecha","variant":"def","color":"#654321",…}
mismas claves que top-level : true
columns HTML sigue la paleta : true
hex columns A : #E2E8F0 #1E293B #123ABC #475569 #654321
hex columns B : #E2E8F0 #1E293B #ABC123 #475569 #321654
```

Hex personalizado dentro de un slot: `variant: "#FF007F"` → `color: "#FF007F"`, igual que
top-level. **Comportamiento de math en slots (contrato de math §10):** NOT_APPLICABLE, sin
campo de math.

**Resultado S5: PASS.** Ambas colocaciones registradas.

---

## 7. S6 — Ida y vuelta de persistencia

**En disco, sin tocar nada.** Cuatro bloques `list` en los drafts guardados:

| Draft | Colocación | Bloque |
|---|---|---|
| `qa_list_certification.json` | top-level | `{"kind":"list","title":"Características","variant":"ctx","items":[…]}` |
| `caracteristicas_internal_qa.json` | top-level | `{"kind":"list",…,"variant":"ctx","textSize":"medium",…}` |
| `test_web.web.draft.json` | top-level | `{"kind":"list","title":"","variant":"ctx","textSize":"medium","items":[]}` |
| `test_web.web.draft.json` | slot derecho | `{"kind":"list","title":"Puntos clave","variant":"ctx",…}` |

**Ninguno lleva clave `color`.** La referencia se guardó como referencia; el hex se produce al
compilar y nunca se escribe de vuelta — que es la regla del contrato de color §3.

**Ida y vuelta medida**, parseando dos veces por el schema del compilador:

```
token | 1a pasada: {"kind":"list","title":"T","variant":"ctx","textSize":"medium","items":["a","b"]}
token | 2a pasada: idéntica  | idempotente: true | lleva clave color: false
hex   | 1a pasada: {"kind":"list","title":"T","variant":"#FF007F","textSize":"medium","items":["a","b"]}
hex   | 2a pasada: idéntica  | idempotente: true | lleva clave color: false
```

El default de `textSize` lo aplican **los dos** schemas por igual. **Resultado S6: PASS.**

---

## 8. S8 — La compuerta de reparación, y por qué NO se reparó nada

### 8.1 El defecto que la QA humana sí registró

La Definition of Done §6 coloca `list` en la fila *«Mixed, with preserved conflicts»*, cuya
instrucción es consumir la observación registrada como candidata de S8 y preservar el
conflicto verbatim. La observación, verbatim de la matriz:

> `list` | `POST_CERT_COLOR_UI_REGRESSION_REPAIR_REQUIRED` after Human QA found missing
> current palette sync/custom picker.
> — `docs/archive/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md:127`

Y en la proyección: `repair_status: "POST_CERT_COLOR_UI_REGRESSION_REPAIR_REQUIRED"`,
`blocked_by: ["color_palette_sync_custom_picker_issue", …]`.

### 8.2 Reproducción contra código vivo — las dos mitades fallan en reproducir

S8 exige reproducir **antes** de cualquier otra cosa.

| Mitad del defecto | Reproducción | Evidencia |
|---|---|---|
| «missing current palette sync» | **NO REPRODUCE** | Compilar el mismo draft contra dos paletas da `color` distinto y HTML distinto (§4 Q3). El control del editor está atado a la paleta Web activa (`useAuthorColorPalette.js:33`) |
| «missing custom picker» | **NO REPRODUCE** | `allowCustom` encendido en las dos colocaciones (`:3970`, `:1805-1814`); la opción `Personalizado` y el `ColorTokenPicker` real existen en `VariantSelect.jsx:116` y `:118`; el compilador acepta y congela el hex (§4 Q10) |

Esto es coherente con el estado de la pieza compartida que el encargo describe: `list` fue de
los reconciliados antes, y los runs `RUN-CANTU-COLOR-SELECTOR-UNIFICATION-001` (`queue_order`
16) y `RUN-CANTU-AUTHOR-PALETTE-COMPILER-ENGINE-001` (19, `completed`) cerraron el resto.
**Este run no rehízo nada de ese trabajo; lo verificó.** Y cuadra.

### 8.3 La salida que la Definition of Done ordena

> Not reproducible: declare the discrepancy, touch nothing, route to the operator.

**Resultado S8: DECLARED.** Se declara la discrepancia entre el estado registrado y el código
vivo, no se tocó nada, y la decisión de retirar
`POST_CERT_COLOR_UI_REGRESSION_REPAIR_REQUIRED` se enruta al operador: el taller no cambia
estado y una medición propia **nunca** es autorización de reparación.

### 8.4 Defectos medidos por el taller — ninguno reparado, todos pendientes de veredicto

Ningún veredicto de QA humana nombra estos. Por la cláusula *«An observation made by the
workshop itself is a measurement to declare, never a repair authorization»*, **los cinco van
al operador y ninguno se tocó**:

| # | Defecto medido | Dónde | Por qué NO se reparó |
|---|---|---|---|
| D1 | `items` y `title` de `list` **no** pasan por `safeOptionalPlainText`/`safeRequiredPlainText`, a diferencia de `narrative` o `callout`. Un `<script>` se **acepta** en el schema y se **escapa** en el compilador (`&lt;script&gt;…`) | `compiler-api/schemas/draftSchema.js:751,756` vs `:732-733` | Sin veredicto de QA. La salida es segura por escapado; el packet canónico dice que se *rechazan*, lo cual es la discrepancia D3. Cambiar el schema **cambiaría el contrato de un componente aprobado** |
| D2 | La resolución de un id fuera de la paleta cae al **token por defecto del mismo id**, no a `ctx` como describe el contrato §4 | `colorSystem.js:452-490` | Es comportamiento de una **pieza compartida** por todos los componentes con color. Tocarlo dispara PARA Y REPORTA |
| D3 | El packet canónico afirma *«HTML, scripts, events, and dangerous URLs are refused»* — medido: se **escapan**, no se rechazan | `docs/components/web/LIST.md:56` | S9 prohíbe a un run de componente escribir el packet |
| D4 | Dos punteros muertos en el packet canónico: `docs/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` (líneas 12 y 69) y `docs/REFERENCE-DRAFT-JSON.md` (líneas 26 y 51). Ninguna de las dos rutas existe | `docs/components/web/LIST.md` | Deriva conocida, fuera de alcance por el encargo y por S9 |
| D5 | El packet describe `variant` como *«the palette role for the accent»*, sin mencionar el `#RRGGBB` personalizado que el campo acepta | `docs/components/web/LIST.md:31` | Ídem D3 |

**Ninguno de los cinco es reparable en esta pasada.** Cuatro por regla explícita de la
Definition of Done o del encargo; **D1 no, y eso es un hueco del procedimiento** — ver §11.3.

---

## 9. S9 y S10 — Lo que este run deliberadamente NO escribió

**S9 — PASS.** No se escribió `docs/components/web/LIST.md` ni ninguna fuente del Component
Guide. El contenido inline `listGuide` (`ComponentGuide.jsx:42`, consumido en `:2501` y
`:2511`) está protegido por `tools/author-lite/scripts/checkComponentGuideTextIntegrity.cjs`
y es superficie congelada para runs de componente hasta
`RUN-CANTU-COMPONENT-GUIDE-PACKET-WIRING-001`. Las tres discrepancias del packet (D3, D4, D5)
quedan **registradas y enrutadas**, no reparadas.

**S10 — PASS.** `.aiw/docs/docs_index.json` **no se editó**: la Definition of Done se lo
llevó con S9 al carril DOCUMENTATION. Conflictos y no-claims verificados intactos:

- `component_status.json` → `source_conflicts[0].conflict_id = "component-list-status-agents-vs-matrix-phase2"`, con
  `resolution: "PRESERVE_AS_DOCUMENTATION_CONFLICT_NOT_CERTIFICATION"`. **Sin tocar.**
- La entrada `list` de la proyección, con sus cinco campos de estado, sus tres `blocked_by` y
  sus dos `follow_up_required`. **Sin tocar.**
- `global_no_claims` completo (`web_global_certified: false`, etc.). **Sin tocar.**
- El puntero de estado del packet canónico (a la matriz). Sin tocar, y con su puntero muerto
  declarado en D4.

---

## 10. Divergencias declaradas contra la Definition of Done y el contrato de color

Regla aplicada, verbatim de la Definition of Done §5: *«a divergence between this table and
the live code is decided by the code, declared in the evidence»*. **Gana el disco. Nada se
editó**: ambos documentos son carril `DOCUMENTATION` y este run es `DEVELOPMENT`.

| # | Documento y fila | Lo que dice | Lo que mide el disco |
|---|---|---|---|
| DIV-1 | DoD §5, fila `list` | «`variant` token or hex» / «Palette-resolves: yes» | **Coincide.** Cero divergencia en esta fila |
| DIV-2 | Contrato de color **§2** | «Only `accent` reaches the Web Engine. `surface`, `border`, and `text` are authored, validated, and persisted, but **no compiler path emits them**» | **FALSO hoy.** El compilador emite `surface`, `border` y `textColor` para `list` (`compiler.js:1180`, vía `buildColorRolesOutput:162`). Medido: `surface:"#ECEFFA"`, `border:"#ACBAE8"`, `textColor:"#1E293B"` |
| DIV-3 | Contrato de color **§4**, fila `list` | Emite «`variant` plus resolved `color`» | Emite además los tres roles de DIV-2. La fila se quedó corta |
| DIV-4 | Contrato de color **§4**, orden de resolución | Paso 4: «The fallback token id, `ctx`» | Un id fuera de la paleta del autor resuelve contra el **token por defecto de ese mismo id**, no contra `ctx`, porque `normalizeAuthorColorPalette` unifica sobre los nueve por defecto antes de resolver. `ctx` solo actúa para ids que no son ninguno de los nueve |
| DIV-5 | Contrato de color **§5** | Los renderers reconciliados son `renderHeader.js` y `renderList.js` | Sigue siendo cierto **para `list`**, y ya era corta antes de este run: `renderCard`, `renderCallout`, `renderRule`, `renderDetails`, `renderConceptGrid` y `renderTable` también prefieren el compilado. Ya declarada por el run 19; se reconfirma |
| DIV-6 | Contrato de color **§8** | «Components carrying the pattern today: `callout`, `timeline` step details…» | El patrón está cerrado para `callout`; `list` nunca lo llevó tras su reconciliación. Ya declarada por el run 19 |
| DIV-7 | DoD **§6**, límite automatizado | «thirty `*.test.mjs` files… holding 323 top-level `test(` declarations» | Hoy hay **32 archivos** y la suite corre **350 tests**. La cifra de la DoD es de 2026-08-01 y quedó corta |

**DIV-2 es la que importa para los catorce runs que siguen**, porque no es una fila de tabla:
es una frase absoluta del contrato de color («no compiler path emits them») que hoy es falsa
para **diez** puntos de emisión, no solo para `list`. Un run posterior que la lea como
premisa medirá mal.

---

## 11. VEREDICTO SOBRE EL PROCEDIMIENTO

Este es el segundo entregable, y la razón de que el piloto vaya solo. **Se mide y se reporta;
no se propone la reescritura de la Definition of Done: enmendarla es decisión del operador y
su ejecución es otro run.**

**Contexto que hay que fijar primero, porque cambia cómo se lee todo lo demás.** El refresco
del `queue_order` 17 tocó cuatro secciones de doce —preámbulo, §5, §6 y §12— y dejó **§4, el
procedimiento S1–S10, byte-idéntica**. El run de `columns` (`queue_order` 13) ya había
emitido un veredicto contra la versión previa y había nombrado cuatro huecos, pidiendo
cerrarlos «primero». **Ninguno de los cuatro se cerró**, porque el refresco no era para eso.
De modo que este piloto encuentra los cuatro **vivos**, y su aportación real es: cuáles
siguen doliendo, cuáles resultaron inocuos con un componente distinto, y cuáles son nuevos.

### 11.1 ¿Qué paso no fue ejecutable tal como está escrito?

**Ninguno quedó bloqueado.** Los diez se ejecutaron y produjeron resultado. Pero tres exigen
una lectura que el texto no da:

- **S1 — «confirm the lane».** El run **no lleva clave `lane`** en el canónico; se deriva de
  `lanes[].default: true`. Literalmente no hay campo que confirmar. *Ya reportado por el run
  de `columns`; sigue igual.* Coste aquí: bajo, pero el «identity triple» del criterio de
  salida son en realidad dos campos y una inferencia.
- **S2 — «both schemas».** Nombra los dos y **no pide compararlos**. Un componente cuyos dos
  schemas hubieran derivado pasaría S2 citando ambos por separado. *Ya reportado por
  `columns`; aquí sí mordió*: la comparación es la que hizo visible la asimetría `.strict()`
  de §3.1, que citando cada schema por su lado no aparece.
- **S3/S4 — «the mandatory ten-question audit block».** Las diez preguntas de cada contrato
  son **una sola frase con punto y coma**, no una lista numerada. Partirla en diez ya es
  interpretación. *Ya reportado por `columns`.* **Y aquí produjo una partición distinta**: la
  cláusula «whether the palette correctly affects the editor, Preview Real, and Generate Web»
  la contó `columns` como tres preguntas y este run como una con tres respuestas. **Dos
  ejecuciones del piloto, dos numeraciones. La tabla de evidencia deja de ser comparable
  entre componentes por construcción, no por descuido.**

### 11.2 ¿Qué tuve que interpretar? Cada lectura elegida, y la descartada

| # | Punto | Lectura elegida | Alternativa descartada, y por qué |
|---|---|---|---|
| I-1 | **Dónde vive el bloque de auditoría S3/S4.** La celda de evidencia pide «audit block location»; nada dice dónde | En este record, §4 y §5 | En el packet canónico — descartada porque S9 prohíbe escribirlo; en el packet de QA — descartada porque ese packet es para ejecutar, no para razonar |
| I-2 | **Dónde va el archivo del packet de S7.** La celda pide «packet filename»; nada dice el directorio ni la convención | `docs/_historical_run_record/`, nombre `<RUN_ID>-OPERATOR-QA-PACKET.md`, siguiendo a `columns` y `header` | `docs/components/web/` — descartada: el contrato single-source fija diecisiete packets ahí y un decimoctavo rompe esa medición |
| I-3 | **Qué es «la suite completa».** El encargo prohíbe correrla y a la vez ordena verificar «350 en la suite del compilador» | «Completa» = la del **repo**, que es como la nombra el propio *Out of scope*. Así que corrí los 32 archivos de `compiler-api/tests/` para verificar el 350, y aparte el subconjunto de `list` como entregable | Leer «completa» = la del compilador — descartada porque entonces el criterio 10 sería inejecutable: pediría verificar una cifra prohibiendo la única medición que la produce |
| I-4 | **Las ocho preguntas vacías de S4.** La DoD ordena correr el bloque «for every component regardless» | Responder las diez, marcando VACÍA con su razón | Omitir las ocho — descartada: el encargo prohíbe omitir en silencio. *Ya reportado por `columns`* |
| I-5 | **Si D1 (los campos sin guardia de texto seguro) es reparable** | Tratarlo como **pendiente de veredicto**, no reparado | Repararlo — descartada por §11.3, que es donde está el hueco de verdad |
| I-6 | **Qué significa PASS en S9 cuando el packet está mal.** El criterio de salida es «no packet was written, and every discrepancy found is recorded» | PASS, porque las dos condiciones se cumplen aunque el packet contenga tres errores | FAIL por packet defectuoso — descartada: el criterio mide la conducta del run, no la salud del packet. Pero **un PASS que convive con tres defectos conocidos se lee como "el packet está bien"**, y no lo está |

### 11.3 ¿Qué criterio de salida faltó? Dónde no supe si un paso estaba terminado

**Éste es el hallazgo principal del piloto, y es exactamente el que el criterio 4 del encargo
anticipaba.**

**(a) La compuerta de reparación no dice qué hacer con un defecto que el taller mide y ningún
veredicto de QA nombra.** S8 enumera cuatro salidas y las cuatro presuponen que existe un
veredicto de QA: reproducido y en alcance, reproducido y fuera de alcance, no reproducible,
y «no QA verdict names a defect: NOT_APPLICABLE». **D1 no encaja en ninguna.** No es
NOT_APPLICABLE, porque sí hay veredicto de QA para `list` y sí nombra un defecto —solo que
otro—. No es «no reproducible», porque D1 reproduce perfectamente; lo que no existe es la
*autorización*. La cláusula *«an observation made by the workshop itself is a measurement to
declare, never a repair authorization»* dice qué **no** puede hacerse, y en ningún sitio dice
dónde va lo declarado ni quién lo recoge. **Lo traté como pendiente de QA y lo anoté aquí,
que es lo que el encargo ordena hacer con un hueco.** Un run con criterio distinto lo habría
reparado citando la misma frase por su otra cara. Con cinco componentes de math por delante,
donde las mediciones propias serán más y más finas, esto se multiplica.

**(b) S8 = DECLARED no tiene veredicto.** Los cinco veredictos de §4 no cubren este resultado.
`READY_FOR_OPERATOR_QA` exige *«All steps PASS or justified NOT_APPLICABLE»*, y DECLARED no es
ninguno de los dos. `REPAIR_REQUIRED_OWN_SCOPE` exige un defecto **reproducido**, y el nuestro
no reprodujo. **Declaré `READY_FOR_OPERATOR_QA` con reserva explícita**, porque es el único
que describe el estado real —taller terminado, packet en manos del operador—, pero es una
elección mía, no una lectura del documento. Ocurre siempre que un componente entre con QA
fallida cuya causa ya fue reparada por una pieza compartida: **son cinco más** (`narrative`,
`callout`, `details`, `rule`, y `header` por su desync).

**(c) S6 sigue sin decir si vale citar un test o hace falta medición viva.** *Ya reportado por
`columns`.* Hice las dos. En lote, unos citarán y otros medirán.

**(d) S9 = PASS no distingue «el packet está bien» de «no lo escribí y anoté que está mal».**
Ver I-6. El criterio de salida mide una sola de las dos cosas que la celda parece afirmar.

### 11.4 ¿Qué sobra?

- **Las ocho preguntas vacías de S4 para `list`.** Preguntar de quién son los delimitadores en
  un componente sin delimitadores no produce señal. Ocupó espacio real en §5 de este record.
  *Ya reportado por `columns`; se confirma con un segundo componente sin math.* **Van once
  componentes sin superficie de math**: son once repeticiones de ocho preguntas vacías.
- **El criterio de salida de S5, «both placements recorded», en el caso NOT_APPLICABLE.**
  Aquí no aplicó —`list` sí tiene ambas colocaciones— pero el defecto que `columns` reportó
  sigue en el texto sin tocar.
- **Nada más.** El resto del procedimiento aportó. En particular, **S2 y S8 se ganaron su
  sitio en este componente**: S2 encontró la asimetría `.strict()` y el `blockDefaults.js`
  vacío, y S8 impidió que el taller «arreglara» D1 por su cuenta, que era la tentación obvia.

### 11.5 ¿Qué cambiaría para un componente con superficie de math? — LO QUE EL PILOTO NO PUEDE PROBAR

**Declarado, no descubierto por el segundo.** `list` no tiene math; cinco de los catorce
siguientes sí (`rule`, `table`, `arithmetic`, `timeline`, `hierarchy`), más `conceptGrid`, que
está en la categoría **«Matemáticas»** del editor y cuyo campo `math` es inalcanzable desde
él. Este piloto **no ha ejercitado nada de lo siguiente**, y por tanto no puede afirmar que
sea ejecutable:

1. **S4 pasa de ocho preguntas vacías a diez llenas.** Su coste real aquí fue ~5 % del
   esfuerzo. En un componente de math será comparable al de S3. Cualquier estimación de
   duración basada en este piloto **está mal para esos seis**.
2. **La partición de las diez preguntas de math (I-3 de `columns`, §11.1 aquí) no se ha
   probado en tensión.** Con respuestas vacías, una partición mala no se nota. Con diez
   respuestas sustantivas, dos runs partiendo distinto producen tablas incomparables **con
   contenido**, que es peor que incomparables y vacías.
3. **S4 exige medir el HTML renderizado**, no la salida compilada: el patrón de regresión de
   math del contrato §9 (`hierarchy`) es invisible en el compilado y solo aparece en el DOM.
   Este piloto midió HTML solo para color. **La técnica de medición de S4 no está probada.**
4. **Superficie A contra superficie B.** `rule` valida contra un allowlist cerrado de 230
   comandos y 12 entornos; los otros cinco no validan LaTeX en absoluto. S4 pide «which input
   surface each field uses» como **una** pregunta, pero `rule` necesitará ejercitar el
   allowlist, el blocklist de 27 y las reglas estructurales. **S4 no dice cuánto de eso
   basta.** No hay criterio de salida y no puedo inventarlo desde un componente sin math.
5. **La propiedad de los delimitadores es inconsistente por componente** —`table` los recibe
   del compilador, `arithmetic`/`timeline`/`hierarchy` conservan los del autor y el renderer
   los envuelve otra vez, `rule` prohíbe al autor ponerlos—. Son **tres contratos distintos
   bajo una sola pregunta de S4**. Un run que responda «el renderer» sin decir cuál de los
   tres casos aplica habrá respondido y no habrá medido.
6. **El packet de QA de un componente de math necesita fixtures que este piloto no ha
   diseñado**: fórmulas válidas, inválidas, con delimitador autorado, y el caso de CDN de
   KaTeX bloqueada (contrato §6: sin fallback local, se ve LaTeX crudo). **Nada de eso está
   probado en un packet real.**
7. **`hierarchy` entra con un defecto de math ya conocido y NO reparado** (emite math sin
   delimitadores). Cuando su run llegue a S8, tendrá el mismo problema que D1 aquí, pero al
   revés: un defecto **documentado en un contrato** en vez de medido por el taller. **La
   Definition of Done tampoco cubre ese caso**, y este piloto no puede resolverlo porque no
   lo tiene delante.

### 11.6 ¿Cuánto costó? Reparto aproximado por bloque de pasos

Sobre el esfuerzo total de la sesión, medido en llamadas de herramienta y lectura:

| Bloque | Peso aprox. | Nota |
|---|---|---|
| Lectura previa obligatoria (DoD entera + los dos contratos + el `full_description`) | **20 %** | No es opcional y no baja con la práctica: son ~940 líneas de contrato antes de medir nada |
| Reconstrucción del estado de la pieza compartida (records de los `queue_order` 13, 17, 19) | **15 %** | **Coste de arranque del piloto.** Los catorce siguientes no lo pagan: ya está aquí |
| S1 + S2 (identidad y siete capas, con la comparación de schemas que la DoD no pide) | **20 %** | El grueso de las citas `path:line` |
| S3 color (bloque de diez + medición viva contra dos paletas) | **15 %** | El paso más caro por sí solo |
| S4 math | **5 %** | Ocho de diez vacías. **En un componente de math esto sube a ~15 %** |
| S5 + S6 (columnas y persistencia) | **8 %** | Barato: reusa el arnés de medición de S3 |
| S7 packet de operador | **10 %** | Diez checks derivados de las Gates 3-4 y de las respuestas de S3 |
| S8 + S9 + S10 (reproducción, discrepancias, no-claims) | **7 %** | La reproducción es rápida cuando falla limpio |
| Tests y validador | **5 %** | Dominado por la verificación del 350 |
| Este veredicto (§11) | **15 %** del total, aparte | **Es el segundo entregable, no un extra.** Los runs siguientes no lo pagan |

Lectura operativa: un run de componente **sin** superficie de math, con el estado compartido
ya reconstruido y sin el veredicto de procedimiento, cuesta aproximadamente **la mitad** que
esta sesión. Uno **con** math costará más que esta sesión completa, por §11.5.

---

## 12. Tests

**No se tocó ningún archivo de código, schema, renderer ni test.** Los tests se corrieron como
medición, que es exactamente el estatus que la Definition of Done §6 les da: *«A workshop that
chooses to run a relevant test file records the result as a measurement in its evidence table
[…] it is never a substitute for the S7 packet and never a repair authorization.»*

### 12.1 Verificación de la cifra de la suite del compilador

La cifra del encargo era 350. **Verificada, no dada por buena** — los 32 archivos de
`tools/author-lite/compiler-api/tests/`:

```
ℹ tests 350
ℹ suites 0
ℹ pass 350
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 1551.1697
```

**350 de 350. Exacta.** Nada verde se puso rojo. (Nota de forma: `node --test <directorio>`
falla con `MODULE_NOT_FOUND` en este repo; hay que pasar los archivos. Es como lo citan los
records archivados.)

### 12.2 Los archivos directamente relacionados con `list`

Siete archivos, corridos aparte como entregable del criterio 6:

```
node --test
  webLegacyCertifiedColorPaletteReconciliation.test.mjs
  webAuthorPaletteDerivedRolesAndCustomHex.test.mjs
  webAuthorPaletteCompilerEngineReconciliation.test.mjs
  webColorSelectorCustomPicker.test.mjs
  webSharedColorSelectorUnification.test.mjs
  webColumnsChildExpansionSafety.test.mjs
  authorLiteColorSystem.test.mjs

✔ list resolves its variant against the active Web palette and Core renderer honors compiled color
✔ legacy header and list drafts keep safe default palette fallbacks
✔ columns has no own palette surface but propagates palette context to header and list children
✔ Draft JSON save/load shape keeps header and list variant while Generate Web emits compiled color
✔ the shared color control derives the active palette, with no filter and no fixed list
✔ every component that shares the control is wired to the palette in both placements
✔ an unknown token still falls back to ctx along the whole chain, for all six

ℹ tests 85
ℹ pass 85
ℹ fail 0
ℹ duration_ms 421.3008
```

**85 de 85.** El criterio de selección fue: los que construyen un bloque `kind: 'list'`
(`grep -c "kind: 'list'"`), más `webColumnsChildExpansionSafety` por la colocación en slots y
`authorLiteColorSystem` por la resolución de tokens.

**No se corrió la suite completa del repo** (`tools/roadmap/tests/` quedó fuera). La lectura
de «suite completa» que se usó está declarada en I-3.

---

## 13. Validador

Por la vía que no escribe, desde `projects/cantu-studio`:

```
node tools/project-console/validate-project-console-state.mjs
```

```
Project Console state validation passed.
Roadmap v3 prototype: 7 objectives / 28 phases / 66 runs; queue groups needs_human_decision=0 now=1 ready_next=18 later=26 history=21
Roadmap v3 active run derived stages: RUN-JAME-WEB-LIST-REVALIDATION-001=none
Docs indexed: 149
Docs curated primary-visible: 60 of 149 registered
Component statuses: 16
Git provenance episodes: 9
Git history snapshot: 508 commits / 1 branches (1 visible, 0 backup hidden); current=main; run-associated=3; source=local_git_autosync
Roadmap rebase warnings (non-blocking):
- .aiw/roadmap/roadmap.json run RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 depends on RUN-CANTU-ROADMAP-CONTENT-AUDIT-001, which does not resolve in this roadmap. With a single roadmap loaded this cannot be decided: it may be a legal external dependency — a run that lives in another project (CONTRATO §10.d Regla 2) — or a typo in the run id. Both are possible and one loaded roadmap cannot tell them apart; resolve it against the full set of projects to distinguish external from write error.
```

**Total de runs: 66. `history=21`. `ready_next=18`.** El aviso no bloqueante de la dependencia
externa es el conocido y legal; **no es hallazgo**.

---

## 14. Las cifras del encargo, verificadas una a una

| Cifra del encargo | Real | |
|---|---|---|
| 66 runs | **66** | exacta |
| `history=21` | **21** | exacta |
| `ready_next=19` | **18** | **INEXACTA** — el validador reporta 18 |
| 350 tests en la suite del compilador | **350 de 350** | exacta, y verde |
| 17 componentes | **17** | exacta — `blockCatalog.js:11-113` tiene 17 entradas, y la DoD §2 lista los mismos 17 |
| 17 packets | **17** | exacta — 17 archivos en `docs/components/web/` |

Cinco de seis exactas. `ready_next` es la que no cuadra; el encargo ya advertía que vienen de
mediciones fechadas y pueden estar mal.

---

## 15. En qué status debe quedar el run, y qué falta para llegar ahí

**El run debe quedar `active`**, y este encargo **no lo cambia**. No se re-emitió `.project/`.

El taller terminó su mitad: S1–S6 completos, S7 preparado, S8 medido, S9 y S10 verificados.
Falta, en este orden:

1. **La QA humana del operador** con el packet de §16.1, en particular sus checks 4 y 5, que
   son los que deciden si el estado registrado
   `POST_CERT_COLOR_UI_REGRESSION_REPAIR_REQUIRED` sigue describiendo el código.
2. **Si vuelve PASS**: el cierre, y la decisión —del operador— de retirar o conservar ese
   estado en la matriz. El taller no lo toca.
3. **Si vuelve FAIL** nombrando un defecto: ese defecto entra por S8 con autorización, se
   reproduce, y se repara si está en alcance.

**Lo cierra el operador desde la consola global, que es el punto de serialización.**

---

## 16. Archivos escritos — dos, y ninguno más

1. `projects/cantu-studio/docs/_historical_run_record/RUN-JAME-WEB-LIST-REVALIDATION-001-OPERATOR-QA-PACKET.md` (nuevo)
2. `projects/aiw-console/context/aiw-console/records/PILOTO-REVALIDACION-COMPONENTE-LISTA-CANTU.md` (este record)

---

## 17. Lo que este encargo NO hizo

- **No reparó ningún defecto.** Cinco medidos (D1–D5), cinco pendientes de veredicto. La
  compuerta S8 no dio autorización para ninguno.
- **No editó la Definition of Done ni el contrato de color**, pese a las siete divergencias de
  §10. Son carril `DOCUMENTATION`; este run es `DEVELOPMENT`.
- **No editó** `.aiw/docs/docs_index.json`, `component_status.json`, la matriz de
  certificación, `docs/components/web/LIST.md` ni ninguna fuente del Component Guide.
- **No tocó el canónico**: ni `status`, ni `title`, ni `full_description`, ni `depends_on` de
  ningún run. No insertó, movió ni renumeró. No re-emitió `.project/`.
- **No amplió el componente.** Mejoras que se nombran y **no se hacen**: pasar `items`/`title`
  por las guardias de texto seguro (D1); ofrecer `textScale` al autor, que el renderer lee
  (`renderList.js:88`) y ningún schema produce; permitir ítems anidados; exponer los roles
  `surface`/`border`/`textColor` que el compilador ya emite y el renderer ignora. **Ninguna
  está en el `full_description` ni en la Definition of Done.**
- **No rehízo el trabajo de la paleta del `queue_order` 19.** Lo verificó como parte de S3 y
  cuadra.
- **No tocó los conjuntos cerrados de variante del compilador** (dueño: `queue_order` 29) ni
  el motor Slide.
- **No corrió la suite completa del repo**, no levantó la consola ni ningún servidor, no
  ejecutó git en ninguna forma, no clasificó ningún run.
- **No reparó derivas cruzadas**: el mojibake de los mensajes de error de los schemas
  (visible en `Máximo 30 puntos por lista` → `MÃ¡ximo…`), los punteros muertos de packets, el
  CLI local de roadmap, la compuerta de badge sin dueño de Tarjeta y Tabla.
- **No propuso la reescritura de la Definition of Done.** §11 mide y reporta; enmendarla es
  del operador y su ejecución es otro run.
- **Ninguna condición de PARA Y REPORTA se disparó.** El canónico casa con el objetivo; las
  divergencias se dejaron resolver declarándolas; ningún defecto reparable exigía tocar una
  pieza compartida, los conjuntos cerrados, ni una decisión de diseño del operador; el trabajo
  no creció más allá de revalidar este componente.

---

## 18. Procedencia

- Canónico: `projects/cantu-studio/.aiw/roadmap/roadmap.json`, 66 runs, leído y **no escrito**.
- Procedimiento: `docs/reference/REFERENCE-COMPONENT-REVALIDATION-DEFINITION-OF-DONE.md`.
- Contratos consumidos: `REFERENCE-COLOR-PALETTE-COMPATIBILITY.md` §9,
  `REFERENCE-MATH-FORMULA-COMPATIBILITY.md` §10.
- Estado previo de QA: `.aiw/state/component_status.json`,
  `docs/archive/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` §8 Gates 3-4.
- Records previos del hilo, leídos para no re-medir la pieza compartida:
  `REVALIDACION-COLUMNS-Y-VEREDICTO-DE-LA-DOD-CANTU.md` (el piloto pre-refresco),
  `REFRESCO-DOD-REVALIDACION-CANTU.md`, `PALETA-DE-AUTOR-COMPILADOR-Y-MOTOR-CANTU.md`,
  `CUATRO-ROLES-AL-RENDER-Y-SELECTOR-PERSONALIZADO-CANTU.md`.
- Packet de QA producido:
  `projects/cantu-studio/docs/_historical_run_record/RUN-JAME-WEB-LIST-REVALIDATION-001-OPERATOR-QA-PACKET.md`.
