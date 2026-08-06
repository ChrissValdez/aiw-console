# Revalidación de componente — «Nota desplegable» (`details`) — `cantu-studio`, `queue_order` 32

> Encargo de taller. Ejecuta `docs/reference/REFERENCE-COMPONENT-REVALIDATION-DEFINITION-OF-DONE.md` sobre el
> componente `details`, cuya etiqueta de plataforma es **«Nota desplegable»**.
> **Nada se reparó.** **Nada se cerró.** **Ningún status se cambió.** `.project/` no se re-emitió. Git no se ejecutó.
> Contenido de documentos del repo citado **verbatim en inglés**, sin traducir.
> Primero de tres records del mismo lote: los otros dos son «Factorización» (33) y «Regla matemática» (34).

**Titular, porque cambia cómo se lee todo lo demás:** la fila de este componente en la Definition of Done §5
está **desfasada**. Dice *«no - regression pattern»* para la resolución de paleta; **el disco resuelve la
paleta entera, tokens y hex personalizado, y emite los cuatro roles derivados** (§5). Y de las **cinco
mitades** del defecto que la QA humana registró, **dos reproducen, dos no reproducen y la quinta no es un
defecto sino una decisión abierta** (§9). Además, el taller midió **un defecto que la QA no puede ver**: el
esquema de este componente **no es estricto** y descarta en silencio los campos que no reconoce (§9.4).

---

## 1. Identidad del run, derivada del canónico — NO tecleada

Derivación por `queue_order` 32 sobre `objectives[].phases[].runs[]` de
`projects/cantu-studio/.aiw/roadmap/roadmap.json`. **Una sola coincidencia** en los 73 runs del archivo.

| Campo | Valor derivado |
|---|---|
| `run_id` | **`RUN-JAME-WEB-DETAILS-REPAIR-001`** |
| `title` | `Audit and implement the Details component` |
| `queue_order` | 32 |
| `status` | `active` |
| Ruta en el árbol | `objectives[2].phases[2].runs[8]` |
| Carril | `DEVELOPMENT` (derivado de `lanes[].default: true`; el run **no lleva clave `lane`**) |

**Comprobación de título, verbatim, exigida por el encargo:** el título derivado es exactamente
`Audit and implement the Details component`. **Coincide carácter a carácter. No se para.**

`depends_on`, **cuatro, y las cuatro `completed`**: `RUN-JAME-WEB-COMPONENT-CONTRACT-STANDARDIZATION-001`,
`RUN-JAME-WEB-COMPONENT-BASELINE-RECONCILIATION-001`, `RUN-JAME-COLOR-PALETTE-COMPATIBILITY-CONTRACT-001`,
`RUN-CANTU-AUTHOR-PALETTE-COMPILER-ENGINE-001`.

### 1.1 El `full_description` íntegro, leído antes de empezar

> "Audit the Details component against the color and palette compatibility contract, using the current component inventory as the starting point. Where the inventory shows the component carries hardcoded or local colors instead of the shared palette, or lacks a required integration point, implement the missing integration. Repair only what the audit and human visual QA show to be a real defect; do not rewrite accepted behavior. Verify the result by human visual QA rather than an automated test suite, since the repository has no test runner."

Campos de clasificación: `correctness_model: JUDGED_DEFINES`, `work_type: FUNCTIONAL`,
`blast_radius: ADJACENT`, `failure_surfaces: VISIBLE`.

### 1.2 Dónde el run y el encargo discrepan, y quién gana

Regla aplicada, heredada de los seis runs anteriores: **gana el run, y la discrepancia se declara.**

**(a) El run dice que no hay test runner.** La DoD §12 declara esa cláusula obsoleta en general y §6 fija
que *«automated tests exist and can be run, but this DoD requires no step to run them»*. Los tests de §14
se corren **como medición**. Misma resolución que los seis anteriores. **Ningún texto de run se enmienda.**

**(b) El run ordena implementar integración de color donde falte; el disco dice que ya no falta.** La
condición **no se cumple** —la integración está instalada y verificada en §5—, así que la orden **no se
activa**. Se declara para que no se lea como omisión.

---

## 2. Resoluciones adoptadas de los seis runs anteriores — sin séptima lectura

El encargo ordena adoptarlas y reportar **solo huecos nuevos**. Adoptadas sin cambio:

| Resolución | Origen | Cómo se aplica aquí |
|---|---|---|
| I-1 — el bloque de auditoría S3/S4 vive **en este record** | piloto §11.2 | §5 y §6 |
| I-2 — el packet de S7 va a `docs/_historical_run_record/`, nombre `<RUN_ID>-OPERATOR-QA-PACKET.md` | piloto §11.2 | §12 |
| I-3 — «suite completa» = la del repo; correr archivos sueltos es legítimo | piloto §11.2 | §14 |
| I-4 — responder las diez preguntas de S3 y de S4 marcando VACÍA con su razón | piloto §11.2 | §5 y §6 |
| La partición de las diez preguntas del contrato de color es **la del piloto** | piloto §11.1 | §5 |
| Un defecto que el taller mide y ningún veredicto de QA nombra se trata como **pendiente de veredicto, anotado, no resuelto por criterio propio** | piloto §11.3(a) | §9.4 |
| S2 audita el archivo delegado, exista o no salto de archivo | `iconList` §13.1(a), `card` §15.1(a) | §4 |
| El patrón de respuesta de un S3/S4 vacío demuestra la ausencia en varias capas | `video` §16.1(b) | §6 |
| `NOT_APPLICABLE` de math para un campo de **prosa con botón de fórmula** | `narrative`, estirado y declarado por `callout` §17.2(a) | §6.1 — **se adopta el estiramiento y se declara otra vez** |
| El «delta packet» se deriva por cuenta propia y se declara qué se cubrió | `iconList` §13.1(c) | §12 — **no aplica**: entra con FAIL, se prepara packet **completo** |

**La predicción de `callout` §17.1 se confirma.** Aquel record escribió que *«`details` (`queue_order` 32),
`rule` (34) y `conceptGrid` (38) llevan cada uno al menos uno de los cinco campos de prosa con insertor»*.
**Se confirma para este componente**: `details.items[].content` es **el primero** de los cinco
(`tests/webInlineFormulaProseBehaviourLock.test.mjs:62-71`).

**No se propone enmendar la Definition of Done.** §17 mide y reporta.

---

## 3. La tabla de evidencia de la Definition of Done §7 — estructura verbatim

```
Component: details    Run: RUN-JAME-WEB-DETAILS-REPAIR-001 (queue_order 32)    Date: 2026-08-06

| Step | Measured against | Result | Evidence |
|---|---|---|---|
| S1 identity | .aiw/roadmap/roadmap.json | PASS | RUN-JAME-WEB-DETAILS-REPAIR-001 + "Audit and implement the Details component"; objectives[2].phases[2].runs[8] |
| S2 state audit | catalog / schemas / compiler / renderer / fixture | PASS | §4, catorce capas citadas, cero UNKNOWN; fixture Web PRESENTE (test_theory.js:238) |
| S3 color audit | color contract Section 9 | PASS + COLOR_PALETTE_VARIANT_OR_TOKEN_ONLY | bloque en §5; DIVERGENCIA declarada contra DoD §5 |
| S4 math audit | math contract Section 10 | PASS + MATH_FORMULA_NOT_APPLICABLE | bloque en §6; clase heredada, estiramiento declarado en §6.1 |
| S5 columns placement | top-level + both slots | PASS | §10; RECHAZADO en slots por los dos esquemas; discrepancia de catálogo enrutada |
| S6 persistence | save/load + import | PASS | §11; ida y vuelta byte a byte idéntica por parseAndValidateBlocks |
| S7 human qa | Section 6 boundary | PREPARED (completo, no delta) | docs/_historical_run_record/RUN-JAME-WEB-DETAILS-REPAIR-001-OPERATOR-QA-PACKET.md |
| S8 repair gate | reproduced QA defects | DECLARED (dos mitades reproducen; fuera de alcance; nada tocado) | §9 |
| S9 packet | single-source contract | PASS | ningún packet ni Guide escrito; cuatro discrepancias enrutadas en §13 |
| S10 registry + no-claims | docs_index + conflicts | PASS | §13; docs_index.json sin escribir; conflicto `list` intacto |

Verdict: REPAIR_REQUIRED_OWN_SCOPE
Open decisions touched: none of the fourteen the two compatibility contracts declare
```

**El veredicto, justificado.** La DoD §4 define `REPAIR_REQUIRED_OWN_SCOPE` como *«A reproduced defect
exceeds the run's scope; declared, nothing touched»*. Es exactamente el caso: la mitad *icon selector*
**reproduce** (§9.2) y repararla exige tocar `commons.js`, que es **JAME Core**. No se adopta la reserva del
piloto §11.3(b) —`READY_FOR_OPERATOR_QA` con reserva— porque **aquí sí reproduce un defecto**, y la DoD
tiene salida literal para eso. Es la misma lectura que hizo `narrative`.

**Ejecución paso a paso, en el orden y con los nombres de la DoD. Ninguno omitido, ninguno BLOCKED.**

| Paso | Nombre en la DoD | Resultado | Dónde |
|---|---|---|---|
| S1 | Identity gate | PASS | §1 |
| S2 | Current-state audit | PASS | §4 |
| S3 | Color palette compatibility audit | PASS + `COLOR_PALETTE_VARIANT_OR_TOKEN_ONLY` | §5 |
| S4 | Math and formula compatibility audit | PASS + `MATH_FORMULA_NOT_APPLICABLE` | §6 |
| S5 | Columns placement check | PASS | §10 |
| S6 | Persistence roundtrip | PASS | §11 |
| S7 | Human QA | PREPARED | §12 |
| S8 | Repair gate | **DECLARED** | §9 |
| S9 | Packet and Guide, both out of scope | PASS | §13 |
| S10 | No-claims | PASS | §13 |

---

## 4. S2 — Auditoría de estado, con archivo y línea

**Catorce capas. Cero UNKNOWN.** Ninguna cita es de memoria.

| Capa | Archivo y línea | Qué hay |
|---|---|---|
| Etiqueta de plataforma | `blockCatalog.js:55` | `label: 'Nota desplegable'` en `WEB_COMPONENT_UI` |
| Etiqueta en el catálogo de bloques | `blockCatalog.js:598` | `label: 'Nota desplegable'` en `BLOCK_CATALOG`, id `web-details` |
| Categoría y riel | `blockCatalog.js:56-58` | `category: 'basics'`, **`rail: false`**, `order: 80` |
| Riel izquierdo | `blockCatalog.js:125` | **NO aparece** en `WEB_RAIL_GROUPS.basics.actions` |
| Vía de inserción | `palette/ComponentPicker.jsx:150`, `palette/ComponentPalette.jsx:47-48` | «Agregar componente» → «Biblioteca Web» → categoría «Básicos» |
| Rama del editor (top-level) | `web/WebBlockEditor.jsx:4089-4091` | delega en `DetailsFields` |
| Archivo delegado | `web/WebBlockEditor.jsx:2415-2494` | «Titulo del grupo», y por ítem «Título», «Color», «Contenido» y «+ Agregar detalle» |
| Rama del editor (dentro de columna) | — | **NO EXISTE.** No hay caso `details` en el editor de hijos de columna |
| Esquema del editor | `editor-ui/src/schemas/draftSchema.js:761-765` + `:317-321` | `WebDetailsSchema` y `DetailsItemSchema` |
| Esquema del compilador | `compiler-api/schemas/draftSchema.js:789-793` + `:320-324` | idénticos a los del editor |
| Unión de bloques Web | `editor-ui/src/schemas/draftSchema.js:973` | `WebDetailsSchema` en `WebBlockSchema` |
| Unión de hijos de columna | `editor-ui/src/schemas/draftSchema.js:898-908` | **`details` NO está** |
| Caso del compilador | `compiler-api/services/compiler.js:424-437` (`buildDetailsOutput`), despacho en `:1214` | emite `type: 'details'`, resuelve paleta por ítem |
| Renderer | `src/builders/web/partials/renderDetails.js:23-129` | acordeón HTML nativo; usa el acento en filete e icono |
| Fixture sandbox | `src/content/sandbox/test_theory.js:238` | `{ type: 'details', items: atomsDetails }` — **sin `title`** |
| Fábrica de bloques | `editor-ui/.../utils/blockFactory.js:74-85` | un ítem, `variant: 'ctx'`, título del grupo **`'Detalles'`** |

### 4.1 Los dos schemas comparados entre sí — lo que S2 no pide

**Idénticos para este componente.** El `diff` completo de los dos archivos devuelve, en bloques de
componente, **una sola divergencia**, y es de `list` (`items` aceptado también como string), declarada
intencional en el propio archivo (`compiler-api/schemas/draftSchema.js:736-747`). Ni `details`, ni sus
ítems, ni ninguna de sus reglas difieren. Verificado además ejecutando cinco casos por los dos esquemas:
**mismo veredicto en los cinco**.

### 4.2 El fixture SÍ ejercita el renderer Web, y le falta un campo

`test_theory.js:238` pasa `items` pero **no `title`**. El renderer trata el título como opcional
(`renderDetails.js:125`), así que el fixture ejercita la rama sin título y **no** la rama con título. Se
declara; no es defecto.

### 4.3 Capacidades del renderer inalcanzables desde el editor

`renderDetails.js:25` lee `data.textScale`, que **ningún esquema produce**. Es la misma forma que la DoD §8
registra como excepción para `conceptGrid`. **Aquí NO es hueco**: el catálogo declara la frontera
—*«No se habilitan iconos, math display, compact mode, textScale ni children»* está escrito para
`conceptGrid` (`blockCatalog.js:845`), y para `details` el catálogo declara *«No se habilita HTML
arbitrario»* (`blockCatalog.js:624`)—. **Lo resolví leyendo el catálogo, y lo digo porque es elección mía**,
igual que hizo `callout` §17.3.

---

## 5. S3 — Color palette compatibility audit

Las diez preguntas del contrato de color §9, enteras, con la partición del piloto.

| # | Pregunta | Respuesta medida |
|---|---|---|
| 1 | ¿Qué superficie de color expone al autor? | `items[].variant`, **uno por detalle**, no uno por bloque. `web/WebBlockEditor.jsx:2460-2466` |
| 2 | ¿Qué control ofrece el editor? | `VariantSelect` con `allowCustom`, paleta activa entera más «Personalizado». `:2464` |
| 3 | ¿Qué acepta el esquema? | Token id (`COLOR_TOKEN_ID`) **o** `#RRGGBB`, opcional. `draftSchema.js:320` |
| 4 | ¿Editor, Preview Real y Generate Web coinciden? | **Sí, por construcción.** `previewRenderer.js:4` importa el mismo `compileDraftToJameData` |
| 5 | ¿El compilador resuelve contra la paleta activa? | **SÍ.** `compiler.js:428` llama `resolvePaletteColorTokenIfDefined` por ítem |
| 6 | ¿Qué emite? | `color` (acento) **más los tres roles derivados**: `surface`, `border`, `textColor`. `compiler.js:434` |
| 7 | ¿Qué consume el renderer? | **Solo el acento.** `renderDetails.js:66`. Los otros tres roles viajan y nadie los lee |
| 8 | ¿Un hex personalizado llega entero? | **SÍ.** Medido: `#FF007F` → `color: "#FF007F"` |
| 9 | ¿Qué pasa con un token que la paleta no define? | Cae al respaldo `ctx` del motor (`#5E81AC`). Medido |
| 10 | ¿Cambia algo la colocación en columnas? | **No aplica**: no es hijo de columna válido. Ver §10 |

**Clase asignada: `COLOR_PALETTE_VARIANT_OR_TOKEN_ONLY`** — *«A single discrete color control, no
multi-role mapping»*. Un control discreto por ítem; el renderer pinta un solo rol.

### 5.1 DIVERGENCIA declarada contra la Definition of Done §5

La fila `details` de la DoD §5 dice: `Palette-resolves | no - regression pattern`, y §5 clasifica a
`details` entre *«Five accept an open palette token and emit only that token id»*.

**Eso ya no es cierto en disco.** El compilador **sí** resuelve y **sí** emite `color` más tres roles
derivados (`compiler.js:428-434`). La DoD misma manda: *«a divergence between this table and the live code
is decided by the code, declared in the evidence»*. **Manda el código. La divergencia queda declarada aquí
y no se enmienda la DoD**, que es del operador.

**Alcance real de la divergencia:** afecta al menos a `details` y a `rule` (§5 del record de «Regla
matemática»), los dos del mismo lote. El taller **no** midió las otras tres filas del patrón
(`conceptGrid`, `table`, y el ya medido `callout`), así que **no afirma nada sobre ellas**.

---

## 6. S4 — Math and formula compatibility audit

| # | Pregunta | Respuesta medida |
|---|---|---|
| 1 | ¿Tiene campo de math? | **NO.** Ningún campo `math` en `WebDetailsSchema` ni en `DetailsItemSchema` |
| 2 | ¿Qué superficie de entrada? | **VACÍA** — no hay campo de math que clasificar en Superficie A ni B |
| 3 | ¿Hay insertor de fórmula? | **SÍ, en `items[].content`.** `web/WebBlockEditor.jsx:2468-2477` envuelve el campo en `InlineFormulaField` |
| 4 | ¿Valida LaTeX? | **VACÍA** — sin campo de math no hay validación de LaTeX. El contenido valida como texto plano seguro |
| 5 | ¿Quién pone los delimitadores? | **El autor**, dentro de la prosa, con el insertor. El renderer no envuelve nada |
| 6 | ¿Produce KaTeX? | **SÍ, por la vía de la prosa.** `previewRenderer.js:14` corre `renderMathInElement(document.body)`, que alcanza el contenido del acordeón |
| 7 | ¿Sobrevive el roundtrip? | **SÍ, byte a byte.** Fijado por trece pruebas verdes (§14.1) |
| 8 | ¿Comportamiento en columnas? | **VACÍA** — no es hijo de columna |
| 9 | ¿Renderiza el math que emite? | **VACÍA** — no emite campo de math |
| 10 | ¿Decisiones abiertas tocadas? | Ninguna de las ocho del contrato de math |

**Clase asignada: `MATH_FORMULA_NOT_APPLICABLE`.**

### 6.1 La clase, y por qué NO la decide este run

`NOT_APPLICABLE` significa literalmente *«No math or formula surface at all»*, y este componente tiene **un
botón de la interfaz cuyo único propósito es escribir fórmulas en un campo suyo**. `TEXT_SURFACE_ONLY`
tampoco vale: exige *«a math field»*, y no lo hay. **Es exactamente el hueco que `callout` §17.2(a) declaró
NUEVO**, y su resolución fue adoptar `NOT_APPLICABLE` por precedente de `narrative` y anotar el
estiramiento. **Se adopta esa resolución sin ampliarla, y se vuelve a anotar el estiramiento.** No se
decide aquí: `callout` ya dijo que el precedente lo fijó un componente sin botón.

---

## 7. Lo que otros runs dejaron aquí — verificado, no rehecho

La DoD no tiene paso para esto (hueco declarado por `callout` §17.1, confirmado aquí). Se mide igual.

| Capacidad instalada por otro run | Estado medido | Dónde |
|---|---|---|
| Resolución de paleta por ítem, tokens y hex | **VIVA** | §5, preguntas 5-8 |
| Los tres roles derivados en la salida | **VIVOS pero no consumidos** por este renderer | §5, preguntas 6-7 |
| Selector de color unificado con «Personalizado» | **VIVO** | §5, pregunta 2; ocho pruebas verdes (§14.3) |
| Insertor de fórmula en `items[].content` | **VIVO** | §6, pregunta 3; trece pruebas verdes (§14.1) |
| Reglas de selección del insertor | **VIVAS** | §14.2 — **solo como test corrido, fuera de todo paso** |
| Deshacer nativo del insertor | **VIVO** | §14.2 — **solo como test corrido** |

**Tres de las seis no caben en ningún paso S1–S10.** Es la asimetría que `callout` §17.1 midió y que este
componente confirma sin ampliar.

---

## 8. S5 — Colocación en columnas

**`details` NO es hijo de columna válido.** Medido en tres capas:

- `editor-ui/src/schemas/draftSchema.js:898-908` — `WebColumnsChildSchema` no lo incluye.
- `compiler-api/schemas/draftSchema.js:930` en adelante — igual.
- Verificado ejecutando: un `columns` con un `details` dentro devuelve `webBlocks.0: Invalid input` en los
  dos esquemas.

El editor tampoco ofrece una rama para él dentro de un slot. **Las tres capas coinciden y la matriz también:**
*«schema/import/tests reject details as columns child; NOT Column-compatible global»*
(`COMPONENT_CERTIFICATION_MATRIX.md:100`).

**Discrepancia enrutada, no reparada.** La ficha de catálogo de «Dos columnas» lista, en su documentación
de autor, *«Bounded/conditional: details, table, conceptGrid, split, visual»* (`blockCatalog.js:988`).
**Contradice al código.** La propia ficha se contradice a sí misma doce líneas más abajo, donde su nota de
desarrollador dice *«El menu interno permite agregar header, list, iconList, rule, card, callout, narrative
y table»* (`:1017`) —que **sí** coincide con el esquema—. **Manda el código.** Reparar el texto del catálogo
no es de este run: es superficie del catálogo, no del componente.

**S5 = PASS**: las dos colocaciones están registradas —arriba válida, en slot rechazada— que es lo que el
paso pide.

---

## 9. S8 — La compuerta de reparación, y los defectos medidos ANTES de tocar nada

### 9.1 El estado de QA registrado

`.aiw/state/component_status.json`, entrada `details`:
`human_qa_status: HUMAN_QA_FAILED_REPAIR_REQUIRED_WITH_OLDER_NOT_STARTED_CONTEXT`,
`repair_status: REPAIR_REQUIRED_OWN_SCOPE`.

**El defecto no está nombrado en esa entrada.** Es el hueco que `callout` §17.2(b) declaró NUEVO —S8 dirige
a una fuente que no nombra el defecto— y **aquí se repite exactamente igual**. Hubo que seguir las
`source_refs` de la propia entrada: de las tres, **una no existe en el disco** (`docs/author-lite/NEXT_STEPS.md`),
otra es `AGENTS.md`, y la tercera es la matriz, donde sí está el desglose (`:313`, también `:193`), y en
inglés en `docs/archive/author-lite/sandbox/PASS-FUTURE-WEB-HUMAN-QA-BATCH-RESULT-RECONCILIATION-001.md:90`:

> "Naming, icon selector, color sync/custom picker, "Resumen" -> "Titulo", and group-vs-single model decision required."

### 9.2 Reproducción contra código vivo — mitad por mitad

| Mitad | Reproduce | Evidencia |
|---|---|---|
| **`Resumen` → `Titulo`** | **NO** | La etiqueta del campo es `label="Título"` (`web/WebBlockEditor.jsx:2453`). La cadena «Resumen» no aparece en ninguna superficie de `details`; las tres ocurrencias que quedan en el editor son de `list` |
| **color sync / custom picker** | **NO** | Selector unificado con paleta activa entera y «Personalizado» (`:2464`); ocho pruebas verdes que cubren `details` por nombre (§14.3) |
| **icon selector** | **SÍ** | `renderDetails.js:67-68` toma el icono de `Commons.VARIANTS[variantKey].icon` y lo pinta en la barra. **El autor elige un color y con él elige un icono, sin saberlo y sin poder cambiarlo.** Con «Personalizado» el icono cae forzosamente a `compass` (`:62`) |
| **naming** | **SÍ, parcial** | La fábrica prerrellena el título del grupo con **`'Detalles'`** (`blockFactory.js:77`), que es el nombre viejo; la plataforma llama al bloque **«Nota desplegable»** (`blockCatalog.js:55`) |
| **group-vs-single** | **NO ES DEFECTO** | Es una **decisión de modelo** que la QA pidió tomar. Hoy el bloque es un grupo (`items` array con mínimo 1, `draftSchema.js:764`). **Ningún documento del repo la toma.** Tomarla es del operador |

### 9.3 La salida que la Definition of Done ordena

Dos mitades reproducen. La DoD S8 dice: *«Reproduced and in scope: repair […] Reproduced and out of scope:
declare REPAIR_REQUIRED_OWN_SCOPE, touch nothing»*.

- **icon selector** — reparar exige dar al autor control del icono. El acoplamiento vive en
  `src/builders/web/partials/commons.js`, que es **JAME Core**, y añadir el control exige campo nuevo en los
  dos `draftSchema.js`, en el editor, en el compilador y en el renderer. **Fuera de alcance.** Y además es
  **capacidad nueva**, no reparación: hoy no existe en ninguna capa.
- **naming** — cambiar `blockFactory.js:77` es una línea, pero `blockFactory.js` es **la fábrica de bloques**,
  que el encargo nombra explícitamente como pieza compartida. **Fuera de alcance.**

**Nada se tocó. Las dos quedan enrutadas al operador con coste medido en §19.**

### 9.4 EL DEFECTO QUE LA QA NO PUEDE VER — medido, no reparado

**`WebDetailsSchema` y `DetailsItemSchema` no llevan `.strict()`.**

- `editor-ui/src/schemas/draftSchema.js:761-765` y `:317-321`
- `compiler-api/schemas/draftSchema.js:789-793` y `:320-324`

**Medido ejecutando:** un bloque `details` con `textScale: 2.5`, `fullWidth: true` y un campo inventado, más
un campo inventado dentro del ítem, **se acepta** y sale del esquema con esos cinco campos **descartados en
silencio**. El mismo JSON con `kind: "arithmetic"` devuelve
`Unrecognized key(s) in object: 'fullWidth'`.

**Comparación medida dentro del propio archivo:** `WebRuleSchema`, `WebArithmeticSchema`,
`WebConceptGridSchema`, `WebTableSchema`, `WebHierarchySchema` y `WebTimelineSchema` **sí** llevan
`.strict()`; `ConceptGridItemSchema` también. **`details` es la excepción.**

**Por qué la QA humana no lo ve:** el operador que teclea los nombres bien nunca lo encuentra; el que se
equivoca ve un bloque que se guarda «sin errores» y luego le falta el dato. En pantalla las dos cosas son
idénticas. **Está nombrado en el packet** (sección «Defecto medido por el taller que esta QA no puede ver»)
para que un PASS no lo deje sin dueño.

**Ningún veredicto de QA lo nombra**, así que —resolución del piloto §11.3(a)— queda **pendiente de
veredicto, anotado, no resuelto por criterio propio**. Repararlo toca los dos `draftSchema.js`.

---

## 10. S6 — Ida y vuelta de persistencia

Medido ejecutando `parseAndValidateBlocks` sobre un fixture con los tres casos que importan —token, hex
personalizado y saltos de línea— y comparando con la entrada:

**`JSON.stringify(salida) === JSON.stringify(entrada)` → verdadero. Ida y vuelta byte a byte idéntica.**

Cubre: `title` del grupo, `items[].summary`, `items[].content` con `\n` interiores, `items[].variant` como
token y como `#RRGGBB`. La referencia de color **sigue siendo referencia** (el token no se convierte en hex
al guardar), que es lo que el contrato de color §3 exige.

**S6 = PASS.**

---

## 11. S7 — El packet de QA para el operador

Escrito en `docs/_historical_run_record/RUN-JAME-WEB-DETAILS-REPAIR-001-OPERATOR-QA-PACKET.md`, con la
forma del packet más reciente (`RUN-JAME-WEB-CALLOUT-REPAIR-001-OPERATOR-QA-PACKET.md`).

**Packet COMPLETO, no delta**: este componente entra con `HUMAN_QA_FAILED_REPAIR_REQUIRED`, no con PASS
preservado, así que la regla de delta de `iconList` §13.1(c) no aplica.

**22 checks.** Los tres de consecuencia de parada van primeros y marcados ⛔. Cinco checks (4-8) cubren las
cinco mitades del defecto registrado, una por una. El packet incluye además **una sección propia sobre cómo
insertar el bloque**, porque `rail: false` lo deja fuera del riel izquierdo y sin ella el operador lo busca
donde no está.

**Corrección de deriva declarada en el packet:** el packet de «Nota destacada» cita el botón del insertor en
`InlineFormulaField.jsx:117`; hoy está en `:115`.

---

## 12. S9, S10 y las divergencias declaradas — gana el disco, no se edita nada

**S9 = PASS.** No se escribió `docs/components/web/details.md` ni ninguna fuente del Component Guide. La DoD
§4 S9 lo saca del alcance del run de componente y lo pasa a los runs de lote de la DOCUMENTATION lane.

**S10 = PASS.** `.aiw/docs/docs_index.json` **no se escribió**. El conflicto preservado de `list`
(`component-list-status-agents-vs-matrix-phase2`) sigue intacto en `.aiw/state/component_status.json`.

**Cuatro discrepancias enrutadas, ninguna reparada:**

1. **DoD §5, fila `details`, `Palette-resolves: no`** — falso en disco (§5.1).
2. **DoD §8, *«`header` and `list` are the only reconciled renderers»*** — falso en disco: `renderDetails.js:66`
   prefiere `data.color`, igual que `renderHeader.js` y `renderList.js`. Y con él, otros cuatro
   (`renderCallout.js:38`, `renderConceptGrid.js:59`, `renderRule.js:28`, `renderTable.js:30`). **Siete
   renderers, no dos.**
3. **`blockCatalog.js:988` lista `details` entre los hijos de columna** — el código la rechaza (§8).
4. **`source_refs` de la entrada `details` apunta a un archivo que no existe** —
   `docs/author-lite/NEXT_STEPS.md`—. Es el mismo puntero roto que `callout` §17.2(b) declaró; **se confirma
   y se fecha, no se repara**: editar la proyección no es de este run.

**Contradicción interna de la fuente única, declarada:** la matriz dice
`HUMAN_QA_FAILED_REPAIR_REQUIRED` en `:193` y `:313`, y `HUMAN_QA_PENDING_OR_DEFERRED` en `:387`. **Es la
misma contradicción que `callout` §17.2(c) midió para sí mismo**, ahora en un segundo componente. **No está
registrada como conflicto en ninguna parte**, y ningún paso de la DoD pregunta si la fuente única es
consistente consigo misma. **Se declara y no se resuelve: elegir cuál manda es del operador.**

---

## 13. Tests — qué corrí, con su salida

Corridos **como medición**, según DoD §6. **Ninguno es autorización de reparación.**

| Archivo | pass | fail | Qué fija de este componente |
|---|---|---|---|
| `webInlineFormulaProseBehaviourLock.test.mjs` | 13 | 0 | `details.items[].content` es el primero de los cinco campos de prosa; la fórmula entra y sale byte a byte |
| `webSharedColorSelectorUnification.test.mjs` | 8 | 0 | `details` entre los seis del selector unificado; sin enum cerrado en ninguno de los dos esquemas |
| `webColorSelectorCustomPicker.test.mjs` | 8 | 0 | «Personalizado» y su muestra |
| `webAuthorPaletteDerivedRolesAndCustomHex.test.mjs` | 12 | 0 | roles derivados y hex personalizado extremo a extremo |
| `webAuthorPaletteCompilerEngineReconciliation.test.mjs` | 14 | 0 | el acento compilado manda sobre el mapa fijo |
| `webInlineFormulaInserterMount.test.mjs` | 16 | 0 | montaje del insertor |
| `webColumnsChildExpansionSafety.test.mjs` | 27 | 0 | qué se admite como hijo de columna |
| `webTheoryTextBlocksSafety.test.mjs` | — | — | **no corrido**: no cubre `details` |

**Total corrido para este componente: 98 aserciones de nivel superior, 0 fallos.** No se corrió la suite
entera del repo, por la regla de no correr la suite completa en dos talleres simultáneos.

**Lo que NO se afirma:** que los tests aprueben nada. La DoD §6 lo dice verbatim: *«it is never a substitute
for the S7 packet and never a repair authorization»*.

---

## 14. Las cifras del encargo, verificadas una a una

El encargo avisa de que sus cifras están **sin verificar a propósito**. Verificadas:

| Cifra | Fuente | Verificado | Resultado |
|---|---|---|---|
| `queue_order` 32 → `RUN-JAME-WEB-DETAILS-REPAIR-001` | encargo | roadmap canónico | **EXACTA**, coincidencia única |
| Título verbatim | encargo | roadmap canónico | **EXACTA**, carácter a carácter |
| «Los tres runs están abiertos (`active`)» | encargo | roadmap canónico | **EXACTA**: exactamente 3 `active` en 73 runs, y son 32, 33 y 34 |
| «Seis records ya cerrados» | encargo | directorio de records de la consola | **EXACTA**: los seis existen y se leyeron |
| «Los dos `draftSchema.js`» | encargo | disco | **EXACTA**: `editor-ui/src/schemas/` y `compiler-api/schemas/` |
| 73 runs | derivado | roadmap canónico | **EXACTA** |
| 17 componentes | DoD §2 | `WEB_COMPONENT_UI` | **EXACTA**: 17 entradas |
| 36 archivos `*.test.mjs` en `compiler-api/tests/` | DoD §6 | disco | **EXACTA** |
| 398 declaraciones `test(` de nivel superior | DoD §6 | disco | **EXACTA** |
| 8 archivos bajo `tools/roadmap/tests/` | DoD §6 | disco | **EXACTA** |
| «ninguno de sus cuatro `package.json` declara script `test`» | DoD §6 | disco | **EXACTA**: 4 archivos, ninguno con `test`; `compiler-api` sin clave `scripts` |
| 16 componentes en la proyección | DoD §6 | `.aiw/state/component_status.json` | **EXACTA**; `columns` ausente, como dice la DoD |
| Fila `details` de DoD §5: `Palette-resolves: no` | DoD §5 | compilador vivo | **DESFASADA** — ver §5.1 |
| DoD §8: «`header` y `list` son los únicos renderers reconciliados» | DoD §8 | renderers vivos | **DESFASADA** — son siete |

**De catorce cifras comprobables, doce son exactas y dos están desfasadas, y las dos desfasadas están en la
propia Definition of Done.**

**Lo que el encargo NO da a propósito, medido en el momento de usarlo:** el conjunto elegible —runs
`planned` con todas sus dependencias `completed`— es de **11 runs**, y `ready_next` es
**`queue_order` 36, `RUN-JAME-WEB-SPLIT-SCOPE-AND-REPAIR-001`**. Medido hoy; cambia con cada apertura y cierre.

---

## 15. HUECOS NUEVOS DEL PROCEDIMIENTO — solo los que los seis runs anteriores no declararon

**Ya declarado y confirmado sin repetir:** S1 sin campo `lane`; S2 nombra los dos schemas y no ordena
compararlos; la partición de las diez preguntas; I-1 a I-4; los huecos del piloto; los de `iconList`,
`card`, `video`, `narrative`; y de `callout`: la ausencia de paso para verificar capacidades instaladas por
otros runs (§17.1), las cinco clases de S4 sin sitio para «prosa con fórmula y con botón» (§17.2a), S8 con el
veredicto ausente de la fuente que nombra (§17.2b), la fuente única contradiciéndose (§17.2c), y S2 sin celda
para «capacidad del renderer que el editor no alcanza a propósito» (§17.3). **Los cinco de `callout` se
confirman aquí, en un segundo componente**, y por eso no se vuelven a explicar.

Lo que este componente añade:

### 15.1 NUEVO — ningún paso comprueba que un componente tenga la misma guardia de campos que sus pares

S2 manda medir *«catalog / schemas / compiler / renderer, plus its sandbox fixture»* y declarar cada capa.
**Lo cumplí y aun así estuve a punto de no ver el defecto de §9.4**, porque la celda de S2 se rellena
mirando *qué hay*, no *qué falta que sus pares sí tienen*. `WebDetailsSchema` existe, está citado, valida y
compila: la celda sale PASS sin ninguna tensión. Que **sea el único de los diecisiete sin `.strict()`** solo
aparece si uno compara el componente con los otros dieciséis, y **ningún paso lo pide**.

Es distinto del hueco de `card` §15.1(a) —allí faltaba criterio para sub-tipos *dentro* de un componente—:
aquí falta la comparación *entre* componentes. **Lo encontré leyendo el archivo entero por otro motivo, y lo
digo porque fue suerte, no procedimiento.**

### 15.2 NUEVO — S8 no tiene salida para una mitad que es «decidir», no «reparar»

Las cinco salidas de S8 son: reparar, `REPAIR_REQUIRED_OWN_SCOPE`, declarar irreproducible,
`NOT_APPLICABLE`, y la observación propia. **La mitad *group-vs-single* no encaja en ninguna.** No es un
defecto reproducible ni irreproducible: es una **decisión de modelo** que la QA humana pidió tomar y que
nadie ha tomado. No es tampoco decisión abierta de los contratos de color o math, así que
`BLOCKED_ON_OPEN_DECISION` —que la DoD §4 ata a *«the decision is named by number (Section 10)»*— tampoco
sirve: no tiene número.

**Lo traté como declaración y lo puse en el packet como check 8, explícitamente marcado como decisión del
operador. Lo digo porque es elección mía, no lectura del procedimiento.** **Al menos un componente más entra
por aquí**: la QA registró decisiones de modelo parecidas para otros.

### 15.3 NUEVO — ningún paso mira la vía de inserción del bloque

Los diez pasos miden qué hace el componente **una vez existe**. **Ninguno pregunta cómo lo crea el autor.**
Este componente lleva `rail: false` y **no está en el riel izquierdo**: se inserta por «Agregar componente» →
«Biblioteca Web» → categoría «Básicos». Si el packet no lo dijera, el operador lo buscaría en el riel, no lo
encontraría, y el fallo se leería como *«el bloque no existe»*.

No es cosmético: **los tres componentes de este lote llevan `rail: false`**, y son ocho de diecisiete en
total (`iconList`, `details`, `hierarchy`, `rule`, `arithmetic`, `conceptGrid`, `timeline`, `split`). **Lo
resolví escribiendo una sección propia en el packet, y lo digo porque el procedimiento no la pide.**

### 15.4 ¿Qué sobra? — confirmación, sin hallazgo nuevo

Las preguntas vacías de S4 volvieron a ocupar espacio real, en el **octavo** componente seguido sin campo de
math —aunque aquí **dos** de las diez sí produjeron señal, por el botón—. Ya declarado por el piloto,
`iconList`, `card`, `video`, `narrative` y `callout`; **se confirma y no se amplía.**

---

## 16. En qué status debe quedar el run, y qué falta para llegar ahí

**Este record NO cambia ningún status. Lo cierra el operador desde la consola. `.project/` no se re-emitió.**

**Status declarado: el run debe seguir `active`.**

Falta, y no es del taller:

1. Que el operador ejecute los 22 checks del packet y emita veredicto.
2. Que decida las dos mitades que reproducen (§19 da coste y recomendación, sin decidir).
3. Que decida *group-vs-single*.
4. Que decida si repara el defecto de §9.4, que la QA no puede ver.
5. Que decida si enmienda las dos filas desfasadas de la Definition of Done.

---

## 17. Lo que este encargo NO hizo — y por qué

- **No reparó nada.** Dos mitades reproducen y las dos caen fuera de alcance por pieza compartida.
- **No cambió ningún status ni re-emitió `.project/`.**
- **No ejecutó git en ninguna forma.** Ni lectura ni escritura.
- **No insertó, movió ni renumeró runs.**
- **No escribió `docs/components/web/details.md`** ni ninguna fuente del Component Guide (DoD §4 S9).
- **No escribió `.aiw/docs/docs_index.json`** (DoD §4 S10).
- **No editó `.aiw/state/component_status.json`**, ni siquiera para arreglar el puntero roto.
- **No enmendó la Definition of Done**, pese a medir dos filas suyas desfasadas.
- **No amplió alcance.** La ampliación solo procede por veredicto escrito de QA humana del operador.

---

## 18. Informe de opciones de coste medido — para el operador, SIN DECIDIR

Dos mitades reproducen y un defecto nuevo está medido. Ninguno es del taller decidir.

| Trabajo | Qué toca | Coste medido | Riesgo |
|---|---|---|---|
| **A. `naming`: la fábrica prerrellena «Detalles»** | Una línea: `blockFactory.js:77` | **Mínimo.** Un literal | **Bajo pero no nulo**: `blockFactory.js` es la fábrica compartida por los diecisiete. Ningún test fija ese literal (verificado) |
| **B. `icon selector`: dar al autor control del icono** | Campo nuevo en los dos `draftSchema.js`, control en `WebBlockEditor.jsx`, emisión en `compiler.js`, consumo en `renderDetails.js` (**JAME Core**), y decidir el catálogo de iconos permitido | **Alto.** Cinco archivos, uno de ellos Core. Es **capacidad nueva**, no reparación | **Alto.** Toca Core y abre superficie de autor nueva |
| **C. `.strict()` en los dos esquemas de `details`** | Dos líneas, una por archivo | **Mínimo en código, no en consecuencias** | **Medio.** Un borrador ya guardado en disco con un campo extra **dejaría de cargar**. Nadie ha inventariado esos borradores |
| **D. `group-vs-single`** | Depende de la decisión; si pasa a single, cambia el esquema, el editor y los borradores existentes | **No estimable sin la decisión** | **Alto si cambia**: rompe el corpus ya publicado |

**Recomendación explícita del taller, que NO es decisión:**

- **A** cabe en un run pequeño junto con otras correcciones de literales de la fábrica. **No** merece run propio.
- **C** merece run propio, **precedido de un inventario de borradores en disco**, porque el riesgo no está
  en el cambio sino en lo ya guardado.
- **B** y **D** **no son reparación**: son alcance nuevo y decisión de modelo. Recomiendo que **no** entren
  en un run de revalidación de componente y que el operador los abra como runs propios si los quiere.
- Si hay que elegir uno solo: **C**, porque es el único de los cuatro que la QA humana **no puede detectar
  nunca**, y por tanto el único que un ciclo de QA sano no encontrará por sí mismo.

---

## 19. Archivos escritos — dos, y ninguno más

1. `projects/cantu-studio/docs/_historical_run_record/RUN-JAME-WEB-DETAILS-REPAIR-001-OPERATOR-QA-PACKET.md`
2. `projects/aiw-console/context/aiw-console/records/REVALIDACION-COMPONENTE-NOTA-DESPLEGABLE-CANTU.md` (este)

**Ningún archivo de `cantu-studio` fue modificado.** Ni código, ni esquema, ni compilador, ni renderer, ni
catálogo, ni estado, ni roadmap.

---

## 20. Procedencia

**Qué se midió, contra qué archivo, y con qué método.**

- **Identidad**: `projects/cantu-studio/.aiw/roadmap/roadmap.json`, recorrido completo del árbol
  `objectives[].phases[].runs[]`, comparación de título con `JSON.stringify` para descartar diferencias
  invisibles de espaciado.
- **Etiqueta de plataforma**: `tools/author-lite/editor-ui/src/features/editor/constants/blockCatalog.js`,
  leído entero. `WEB_COMPONENT_UI.details.label` (`:55`) y la entrada `web-details` de `BLOCK_CATALOG` (`:598`).
  **No tomada del encargo ni de ningún record.**
- **Capas S2**: las catorce citas de §4, cada una abierta en el archivo real.
- **Comparación de los dos esquemas**: `diff` de los dos `draftSchema.js` completos, más ejecución de cinco
  casos por ambos.
- **Color y math**: ejecución de un banco de medición propio que valida por `WebDraftSchema`, compila por
  `compileDraftToJameData` y renderiza por `renderDetails.js`, sobre trece variantes y dos hex.
- **Persistencia**: ejecución de `parseAndValidateBlocks` con comparación `JSON.stringify` de entrada y salida.
- **Defecto de §9.4**: ejecución de `WebDraftSchema.safeParse` con campos extra, comparada contra el mismo
  caso en `arithmetic`.
- **Tests**: `node --test <ruta>`, un archivo por invocación, salidas de §13.
- **Estado de QA**: `.aiw/state/component_status.json` (entrada `details`),
  `docs/archive/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` (`:100`, `:193`, `:313`, `:387`),
  `docs/archive/author-lite/sandbox/PASS-FUTURE-WEB-HUMAN-QA-BATCH-RESULT-RECONCILIATION-001.md` (`:90`).

**Qué quedó sin reparar, y por qué.**

| Sin reparar | Por qué |
|---|---|
| `icon selector` (reproduce) | Toca `commons.js`, que es **JAME Core**, y es capacidad nueva, no reparación |
| `naming` en la fábrica (reproduce) | `blockFactory.js` es **pieza compartida** por los diecisiete componentes |
| Esquema no estricto (defecto nuevo) | Toca **los dos `draftSchema.js`**, pieza compartida, y arriesga borradores ya guardados |
| `group-vs-single` | **Decisión de modelo**, no defecto. Del operador |
| Dos filas desfasadas de la DoD | Enmendar la DoD es **del operador**; su ejecución es otro run |
| `blockCatalog.js:988` contradiciendo al código | Superficie del catálogo, no del componente. Enrutada |
| `source_refs` con puntero a archivo inexistente | Editar la proyección **no es de este run** |
| Contradicción interna de la matriz | Elegir cuál lectura manda es **del operador** |
