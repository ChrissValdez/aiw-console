# Revalidación de componente — «Nota destacada» (`callout`) — `cantu-studio`, `queue_order` 31

> Encargo de taller. Ejecuta `docs/reference/REFERENCE-COMPONENT-REVALIDATION-DEFINITION-OF-DONE.md` sobre el
> componente `callout`, cuya etiqueta de plataforma es **«Nota destacada»**.
> **Nada se reparó.** **Nada se cerró.** **Ningún status se cambió.** `.project/` no se re-emitió.
> Contenido de documentos del repo citado **verbatim en inglés**, sin traducir.

**Titular de la sesión, porque cambia cómo se lee todo lo demás:** los **tres puntos del objetivo** se
midieron contra código vivo. **Dos se confirman y uno se desmiente.** El fondo suave **sí** sigue al color
del autor (§7.1); el insertor de fórmulas y sus trece tests **siguen vivos** (§7.2); y la afirmación de que
la etiqueta del componente es **blanco fijo sobre el color del autor** es **falsa en las tres superficies
Web medidas** (§7.3). Además, **las cuatro mitades del defecto que la QA humana registró para este
componente NO reproducen** contra código vivo (§9).

---

## 1. Identidad del run, derivada del canónico — NO tecleada

Derivación por `queue_order` 31 sobre `objectives[].phases[].runs[]` de
`projects/cantu-studio/.aiw/roadmap/roadmap.json`. **Una sola coincidencia** en los 73 runs del archivo.

| Campo | Valor derivado |
|---|---|
| `run_id` | **`RUN-JAME-WEB-CALLOUT-REPAIR-001`** |
| `title` | `Audit and implement the Callout component` |
| `queue_order` | 31 |
| `status` | `active` |
| Ruta en el árbol | `objectives[2].phases[2].runs[7]` |
| Objetivo / fase | `O1` *Cantu Studio Web Components* / `O1.P1C` *Web Components - Basics* |
| Carril | `DEVELOPMENT` (derivado de `lanes[].default: true`; el run **no lleva clave `lane`**) |

**Comprobación de título, verbatim, exigida por el objetivo:** el título derivado es exactamente
`Audit and implement the Callout component`. **Coincide carácter a carácter. No se para.**

Corroboración independiente: el validador (§16) informa
`Roadmap v3 active run derived stages: RUN-JAME-WEB-CALLOUT-REPAIR-001=none`. El run derivado por
`queue_order` es el mismo que la consola tiene por activo.

### 1.1 El `full_description` íntegro, leído antes de empezar

> "Audit the Callout component against the color and palette compatibility contract, using the current component inventory as the starting point. Where the inventory shows the component carries hardcoded or local colors instead of the shared palette, or lacks a required integration point, implement the missing integration. Repair only what the audit and human visual QA show to be a real defect; do not rewrite accepted behavior. Verify the result by human visual QA rather than an automated test suite, since the repository has no test runner."

Campos de clasificación: `correctness_model: JUDGED_DEFINES`, `work_type: FUNCTIONAL`,
`blast_radius: ADJACENT`, `failure_surfaces: VISIBLE`, `classified_at: 2026-08-01T05:45:24.479Z`.

`depends_on`, **cuatro, y las cuatro satisfechas**:

| Dependencia | `queue_order` | Status |
|---|---|---|
| `RUN-JAME-WEB-COMPONENT-CONTRACT-STANDARDIZATION-001` | 9 | `completed` |
| `RUN-JAME-WEB-COMPONENT-BASELINE-RECONCILIATION-001` | 12 | `completed` |
| `RUN-JAME-COLOR-PALETTE-COMPATIBILITY-CONTRACT-001` | 7 | `completed` |
| `RUN-CANTU-AUTHOR-PALETTE-COMPILER-ENGINE-001` | 19 | `completed` |

**Este componente es el único de la serie con cuatro dependencias**, y las dos últimas son precisamente
las del trabajo de paleta que el objetivo manda verificar. La estructura del run ya anticipaba que aquí
había trabajo ajeno que comprobar.

### 1.2 Dónde el run y el ticket de cabina discrepan, y quién gana

Regla aplicada: **gana el run, y la discrepancia se declara.**

**(a) El run dice que no hay test runner; el ticket exige correr tests.** El `full_description` cierra con
*«since the repository has no test runner»*. La DoD §12 declara esa cláusula obsoleta **en general, para
los diecisiete runs**:

> "The component run texts are stale on the test-runner clause, and the procedure governs. […] The second half is false as written and is corrected in Section 6 under the automated-test boundary […] Where a run text and this document disagree on that point, **this procedure is what the run executes**."

Y §6 fija el estatuto de lo que se corra:

> "**automated tests exist and can be run, but this DoD requires no step to run them.** […] A workshop that chooses to run a relevant test file records the result as a measurement in its evidence table, like any other measurement; it is never a substitute for the S7 packet and never a repair authorization."

De modo que **no hay conflicto real**: el run manda sobre el ticket, y el procedimiento que el run ejecuta
ya dice qué hacer. Los tests de §14 se corren **como medición**. Es la misma resolución de los cinco runs
anteriores. **Ningún texto de run se enmienda aquí.**

**(b) El run ordena implementar integración de color donde falte; el disco dice que ya no falta.** El
`full_description` dice *«Where the inventory shows the component carries hardcoded or local colors
instead of the shared palette […] implement the missing integration»*. El inventario que el run nombra
como punto de partida clasifica `callout` como `VARIANT_ONLY_HARDCODED`
(`REFERENCE-WEB-COMPONENT-COLOR-AND-MATH-INVENTORY.md:79`) — **pero eso ya no es cierto en disco**: la
integración la instaló `RUN-CANTU-AUTHOR-PALETTE-COMPILER-ENGINE-001`, y este run la **verifica** (§7.1).
La condición del run **ya no se cumple**, así que la orden **no se activa**. Se declara para que no se lea
como omisión. **Es exactamente el encuadre del ticket: verificar lo que otro run hizo, no rehacerlo.**

**(c) El ticket da cifras y avisa de que pueden estar mal.** Verificadas una a una en §15. **De seis
cifras, cuatro son exactas y dos están desfasadas**, y una de las dos desfasadas está **en la propia
Definition of Done**.

---

## 2. Resoluciones adoptadas de los cinco runs anteriores — sin sexta lectura

El encargo ordena adoptarlas y **no inventar una sexta**. Adoptadas sin cambio:

| Resolución | Origen | Cómo se aplica aquí |
|---|---|---|
| I-1 — el bloque de auditoría S3/S4 vive **en este record** | piloto §11.2 | §5 y §6 |
| I-2 — el packet de S7 va a `docs/_historical_run_record/`, nombre `<RUN_ID>-OPERATOR-QA-PACKET.md` | piloto §11.2 | §12 |
| I-3 — «suite completa» = la del **repo**; correr archivos sueltos para verificar cifras es legítimo | piloto §11.2 | §14 |
| I-4 — responder las diez preguntas de S3 y de S4 marcando VACÍA con su razón, sin omitir | piloto §11.2 | §5 y §6 |
| La partición de las diez preguntas del contrato de color es **la del piloto** (*«editor, Preview Real y Generate Web»* = **una** pregunta con tres respuestas) | piloto §11.1, confirmada por `iconList`, `card`, `video` y `narrative` | §5 |
| Un defecto que el taller mide y ningún veredicto de QA nombra se trata como **pendiente de veredicto, anotado, no resuelto por criterio propio** | piloto §11.3(a), aplicada por los cuatro siguientes | §9.3 |
| S2 nombra «la rama del editor» y hay que auditar el archivo delegado, exista o no salto de archivo | `iconList` §13.1(a), precisado por `card` §15.1(a) | §4 |
| El patrón de respuesta de un S3/S4 vacío es el de I-4, demostrando la ausencia en varias capas | `video` §16.1(b) | §6 |
| El «delta packet» de S7 se deriva por cuenta propia y se declara qué se cubrió | `iconList` §13.1(c) | §12 — **no aplica**: este componente no entra con PASS, entra con FAIL. Se prepara packet **completo** |
| **`READY_FOR_OPERATOR_QA` con reserva explícita** para el caso «componente que entra con QA fallida cuya causa ya fue reparada por una pieza compartida» | **piloto §11.3(b)**, que nombró a `callout` entre los cinco que vendrían | **§18 — se adopta.** Ver abajo |

**La resolución del piloto que aquí SÍ toca aplicar, y por qué.** El piloto §11.3(b) escribió:

> «Declaré `READY_FOR_OPERATOR_QA` con reserva explícita […] Ocurre siempre que un componente entre con QA fallida cuya causa ya fue reparada por una pieza compartida: **son cinco más** (`narrative`, `callout`, `details`, `rule`, y `header` por su desync).»

`narrative` (§2 de su record) **no** la adoptó, y con razón: su defecto **sí** reproducía, y la DoD tiene
salida literal para eso (`REPAIR_REQUIRED_OWN_SCOPE`). **Aquí el supuesto del piloto se cumple entero**:
las cuatro mitades del defecto registrado **no reproducen** (§9.2), y la causa fue reparada por dos piezas
compartidas —el trabajo de paleta y el de unificación del selector—. **Se adopta la reserva del piloto,
literalmente y sin ampliarla.** No es criterio propio: es la resolución que el piloto dejó escrita para
este caso y nombrando a este componente.

**No se propone enmendar la Definition of Done.** §17 mide y reporta.

---

## 3. La tabla de evidencia de la Definition of Done §7 — estructura verbatim

```
Component: callout    Run: RUN-JAME-WEB-CALLOUT-REPAIR-001 (queue_order 31)    Date: 2026-08-05

| Step | Measured against | Result | Evidence |
|---|---|---|---|
| S1 identity | .aiw/roadmap/roadmap.json | PASS | RUN-JAME-WEB-CALLOUT-REPAIR-001 + "Audit and implement the Callout component"; objectives[2].phases[2].runs[7] |
| S2 state audit | catalog / schemas / compiler / renderer / fixture | PASS | §4, dieciséis capas citadas, cero UNKNOWN; fixture Web PRESENTE (test_theory.js:223-226) |
| S3 color audit | color contract Section 9 | PASS + COLOR_PALETTE_VARIANT_OR_TOKEN_ONLY | bloque en §5 de este record |
| S4 math audit | math contract Section 10 | PASS + MATH_FORMULA_NOT_APPLICABLE | bloque en §6 de este record |
| S5 columns placement | top-level + both slots | PASS | §10; ambas colocaciones válidas y compiladas; blockCatalog.js:1017, WebBlockEditor.jsx:1860-1888 |
| S6 persistence | save/load + import | PASS | §11; siete casos, ida y vuelta idempotente en los tres esquemas |
| S7 human qa | Section 6 boundary | PREPARED (completo, no delta) | docs/_historical_run_record/RUN-JAME-WEB-CALLOUT-REPAIR-001-OPERATOR-QA-PACKET.md |
| S8 repair gate | reproduced QA defects | DECLARED (no reproducible; nada tocado; enrutado al operador) | §9; las cuatro mitades del defecto registrado fallan en reproducir |
| S9 packet | single-source contract | PASS | ningún packet ni Guide escrito; seis discrepancias enrutadas en §13 |
| S10 registry + no-claims | docs_index + conflicts | PASS | §13; docs_index.json sin escribir; conflicto `list` intacto |

Verdict: READY_FOR_OPERATOR_QA (con la reserva del piloto §11.3(b), adoptada — ver §18)
Open decisions touched: none
```

**Ejecución paso a paso, en el orden y con los nombres de la DoD. Ninguno omitido, ninguno BLOCKED.**

| Paso | Nombre en la DoD | Resultado | Dónde | Nota |
|---|---|---|---|---|
| S1 | Identity gate | PASS | §1 | El «identity triple» son dos campos y una inferencia: el run no lleva `lane`. Hueco ya declarado por el piloto |
| S2 | Current-state audit | PASS | §4 | Dieciséis capas, cero UNKNOWN |
| S3 | Color palette compatibility audit | PASS + `COLOR_PALETTE_VARIANT_OR_TOKEN_ONLY` | §5 | El paso es PASS; la clase es la que sale. Las diez preguntas se ejecutan enteras |
| S4 | Math and formula compatibility audit | PASS + `MATH_FORMULA_NOT_APPLICABLE` | §6 | Ocho de diez vacías con su razón. **La clase se hereda de la resolución de `narrative`, no se decide aquí** (§6.1) |
| S5 | Columns placement check | PASS | §10 | No aplica la excepción auto-referencial (es solo de `columns`) ni el caso de `video` (rechazo por contrato): las dos colocaciones son válidas |
| S6 | Persistence roundtrip | PASS | §11 | |
| S7 | Human QA | PREPARED | §12 | El taller **nunca** ejecuta QA humana |
| S8 | Repair gate | **DECLARED** | §9 | No reproducible → *«declare the discrepancy, touch nothing, route to the operator»* |
| S9 | Packet and Guide, both out of scope | PASS | §13 | |
| S10 | No-claims | PASS | §13 | |

---

## 4. S2 — Auditoría de estado, con archivo y línea

Dieciséis capas. **Cero UNKNOWN.** Ninguna cita es de memoria.

| # | Capa | Evidencia | Qué dice |
|---|---|---|---|
| 1 | Catálogo, entrada de interfaz | `blockCatalog.js:42-47` | `label: 'Nota destacada'`, `category: 'basics'`, `rail: true`, `order: 60` |
| 2 | Catálogo, grupo del riel | `blockCatalog.js:125` | Está en `'basics'` → **«Básicos frecuentes»** (`:124`) |
| 3 | Catálogo, documentación de autor | `blockCatalog.js:187-209` | `id: 'web-callout'`, `action: 'callout'`, tres casos de uso por variante |
| 4 | Catálogo, contrato de desarrollador | `blockCatalog.js:204-206` | `jsonSchema` de cuatro claves; **«No habilita iconos, colores tecnicos ni HTML arbitrario»** |
| 5 | Editor, rama de nivel superior | `WebBlockEditor.jsx:3973-3985` | `Color` (`VariantSelect … allowCustom`), `Título`, `Contenido` envuelto en `InlineFormulaField` |
| 6 | Editor, rama dentro de columnas | `WebBlockEditor.jsx:1860-1888` | `ColumnColorSelectField label="Color" … allowCustom defaultValue="wrn"`, `Titulo`, `Contenido` envuelto en `InlineFormulaField` |
| 7 | Editor, etiqueta del selector de bloque | `WebBlockEditor.jsx:264` | `{ kind: 'callout', label: 'Nota destacada' }` |
| 8 | Editor, rótulo de bloque sin título | `WebBlockEditor.jsx:403` y `draftHelpers.js:34` | `'Nota destacada sin título'` / `'Nota destacada sin titulo'` — **dos cadenas, una con tilde y otra sin** |
| 9 | Esquema editor-ui, nivel superior | `editor-ui/src/schemas/draftSchema.js:702-707` | `variant` (token id **o** `#RRGGBB`), `title` opcional, `content` obligatorio. **Sin `.strict()`** |
| 10 | Esquema editor-ui, hijo de columnas | `editor-ui/src/schemas/draftSchema.js:709-714` | Misma forma, **con `.strict()`** |
| 11 | Esquema compiler-api, nivel superior | `compiler-api/schemas/draftSchema.js:715-721` | **Idéntico al de editor-ui**, símbolo a símbolo |
| 12 | Esquema compiler-api, hijo de columnas | `compiler-api/schemas/draftSchema.js:722-728` | **Idéntico al de editor-ui** |
| 13 | Uniones | editor-ui `:905` (hijo) y `:965` (top); compiler-api `:933` y `:993` | `WebColumnsCalloutSchema` en la unión de hijos, `WebCalloutSchema` en la de nivel superior |
| 14 | Compilador | `compiler.js:1142-1153` | `resolvePaletteColorTokenIfDefined` → `color` + `buildColorRolesOutput`; `escapeHtmlWithLineBreaks(content)` |
| 15 | Renderer Web | `src/builders/web/partials/renderCallout.js:24-132` | Acento en `:38`, **fondo suave en `:43`**, título en `:46-52`, cuerpo en `:128` |
| 16 | Defaults | `blockFactory.js:27-28` (top) y `:240-241` (slot) | `variant: 'wrn'`, `title: 'Nota importante'`, `content` distinto en cada uno |
| 17 | Fixture sandbox | `src/content/sandbox/test_theory.js` | **`webFlow`: `:223-226`** (cuatro expresiones que producen nueve callouts Web). También `slideFlow` `:108-122` |
| 18 | Biblioteca de iconos | `iconLibraryData.js:75-79` | `callout` existe con `allowedIconIds: 'future'` → **declarado como futuro, no habilitado** |
| 19 | Iconos del selector de bloques | `ComponentPicker.jsx:35`, `PaletteItem.jsx:37` | `Info` |
| 20 | Component Guide | `ComponentGuide.jsx:342` y `:350` | **`callout` NO tiene guía propia**; aparece **dentro** de la guía de `columns`, que es superficie protegida por guardia |

### 4.1 Los dos schemas comparados entre sí — lo que S2 no pide

S2 nombra *«both schemas»* y **no ordena compararlos** (hueco del piloto, confirmado). Comparados aquí:
**los cuatro símbolos de `callout` son idénticos en los dos archivos**, campo a campo, mensaje de error a
mensaje de error. **No hay deriva entre esquemas para este componente.** Es el primero de la serie del que
puede decirse eso sin matices.

### 4.2 El fixture SÍ ejercita el renderer Web — al contrario que en «Texto»

`narrative` §6.1 midió que el fixture que la matriz le asigna **no** ejercitaba su renderer Web, y declaró
el hueco de que S2 no ordena comprobar que el fixture sea el que dice ser. **Aquí se comprobó igual, y el
resultado es el contrario:** de las catorce menciones de `callout` en `test_theory.js`, **diez viven en
`slideFlow` (`:108-122`) y cuatro en `webFlow` (`:223-226`)**. Las cuatro de `webFlow` son expresiones de
propagación que generan nueve callouts distintos contra el renderer Web. **El fixture es el correcto.**
Se dice porque el hueco solo se cierra midiendo, no heredando.

### 4.3 Capacidades del renderer inalcanzables desde el editor — y por qué NO son defecto

`renderCallout.js` lee dos campos que **ningún esquema puede producir**: `data.icon` (`:64-84`) y
`data.titleColor` (`:48-52`). El fixture los usa (`test_theory.js:116`, `icon: 'bulb'`). Podría leerse como
el patrón de `conceptGrid` —campo del renderer inalcanzable desde el editor—, **y no lo es**: el catálogo
lo declara explícitamente como frontera querida (`blockCatalog.js:206`, *«No habilita iconos, colores
tecnicos ni HTML arbitrario»*) y la biblioteca de iconos marca `callout` como `'future'`
(`iconLibraryData.js:77`). **Frontera declarada, no hueco.** Se mide y se cierra aquí para que un run
posterior no lo abra como defecto.

---

## 5. S3 — Color palette compatibility audit

Bloque obligatorio de diez preguntas del contrato de color §9, con la partición del piloto. Se ejecuta
entero, como la DoD exige *«for every component regardless»*.

| # | Pregunta del contrato | Respuesta medida |
|---|---|---|
| 1 | ¿Expone campos dependientes de color? | **Sí, uno: `variant`.** Acepta **token id de la paleta** o **`#RRGGBB`** (`draftSchema.js:704`, los dos archivos). Un solo control en las dos colocaciones |
| 2 | ¿Expone variantes? | **Sí, las de la paleta Web activa**, abiertas: no hay enum cerrado. El desplegable las lista todas más **«Personalizado»** (`VariantSelect.jsx:116`) |
| 3 | ¿Expone estilos? | **No.** No hay campo de estilo, borde, sombra ni tamaño. El único eje visual del autor es el color |
| 4 | ¿Expone tokens? | **Sí.** El valor guardado **es** el id del token, no el hex; el hex solo aparece si el autor elige «Personalizado» |
| 5 | ¿La paleta afecta correctamente a **editor, Preview Real y Generate Web**? | **Sí, a los tres, y medido en los tres.** Editor: `VariantSelect`/`ColumnColorSelectField` consumen `colorPalette`. Preview Real: `server.js:832-833` lee la paleta activa por petición y la pasa a `renderWebDraftPreviewHtml`; medido `background-color=#F8F1EB`, `border-left=#AA5500` con paleta de autor, y `#FCF7F5`/`#D08770` sin ella. Generate Web: `server.js:811-812`; medido idéntico. **Los tres coinciden por construcción y por medición** |
| 6 | ¿Save/load y la importación de Draft JSON preservan la selección? | **Sí.** Siete casos en §11: el `variant` vuelve **como referencia**, nunca como hex resuelto. El hex personalizado vuelve como hex |
| 7 | ¿Aguantan contraste y legibilidad? | **Sí, y aquí está el desmentido del punto 3 del objetivo.** El título se pinta con `Commons.PALETTE.gray.color` = **`#4C566A`** (`renderCallout.js:46`) sobre el fondo suave; el cuerpo con **`#475569`** (`:88`) sobre el mismo fondo. **El color del autor NUNCA es fondo de texto**: solo pinta el filete izquierdo de 4 px (`:94`) y el icono (`:77`). **No hay blanco en ninguna parte del renderer** (§7.3) |
| 8 | ¿Funciona en el nivel superior? | **Sí.** `WebBlockEditor.jsx:3973-3985`, `blockCatalog.js:125` (está en el riel) |
| 9 | ¿Funciona dentro de los slots de `columns` sin romper legibilidad? | **Sí, en los dos slots.** `WebBlockEditor.jsx:1860-1888`; medido: el hijo compilado lleva `color`, `surface`, `border` y `textColor`, y el HTML de columnas contiene los dos hexes derivados de la paleta del autor |
| 10 | ¿Qué límites o variantes debe documentar el packet? | **Cuatro, y el packet canónico no documenta ninguno:** (a) que el desplegable ofrece **«Personalizado»**; (b) que **un hex personalizado queda congelado** frente a cambios de paleta —el contrato §7 lo exige de *«any component that documents a custom picker»*—; (c) que un token que la paleta activa no define **no emite color** y cae al respaldo azul del motor; (d) que **el fondo suave también sigue al color del autor**, cosa que ningún otro componente Web hace. **Enrutado en §13, no escrito** |

**Clase asignada: `COLOR_PALETTE_VARIANT_OR_TOKEN_ONLY`** — *«A single discrete color control, no
multi-role mapping»*. Justificación: desde el autor hay **un solo control discreto**. Que la salida lleve
cuatro roles no lo convierte en mapeo multi-rol autorado: los tres roles derivados los **calcula** el
compilador a partir del acento, sin que el autor los toque. **Es la misma clase que el piloto asignó a
`list` y `card` a `card`, con la misma forma de campo.** Se adopta el precedente; no se estrena lectura.

---

## 6. S4 — Math and formula compatibility audit

Bloque obligatorio de diez preguntas del contrato de math §10, con el patrón de I-4: **las diez se
responden; las vacías dicen por qué**.

| # | Pregunta del contrato | Respuesta medida |
|---|---|---|
| 1 | ¿Expone algún campo de math o fórmula? | **No hay campo `math`.** Demostrado en cinco capas: no está en `blockCatalog.js:204`, ni en los dos esquemas (`:702-714` y `:715-728`), ni en el caso del compilador (`compiler.js:1142-1153`), ni lo lee el renderer (`renderCallout.js`), ni lo crea la fábrica (`blockFactory.js:27-28`). **Pero `content` acepta fórmula delimitada y lleva el botón de insertarla** (§7.2). Ver §6.1 |
| 2 | ¿Qué superficie de entrada usa cada campo? | **VACÍA por ausencia de campo de math.** Si se pregunta por `content`: no valida LaTeX en absoluto, es prosa opaca — la forma de la Superficie B, sin ser un campo de math |
| 3 | ¿Ofrece el editor visual de fórmulas o una entrada de texto plana? | **Las dos cosas, y es lo excepcional de este componente.** `content` es un `textarea` plano **envuelto en `InlineFormulaField`**, que añade el botón **«Insertar fórmula»** (`InlineFormulaField.jsx:117`) en las **dos** ramas (`WebBlockEditor.jsx:3981` y `:1874`) |
| 4 | ¿El compilador emite el valor con delimitadores, y de quién son? | **VACÍA por ausencia de campo de math.** Para `content`: los delimitadores son **del autor**, el compilador no pone ni quita ninguno |
| 5 | ¿Un delimitador autorado se elimina o se duplica? | **Ninguna de las dos.** Medido: `\( a^2 + b^2 = c^2 \)` entra y sale idéntico del compilador y llega idéntico al HTML |
| 6 | ¿El HTML renderizado produce realmente salida KaTeX? | **Llega intacto al HTML y hay UN barrido global** `renderMathInElement(document.body)` (medido: 1 ocurrencia en Preview Real). **Lo que KaTeX haga después no se afirma aquí**: se carga por CDN y no está en ningún `node_modules` del repo. **Es la dirección inversa que `video` §16.1(c) declaró y `narrative` §13 confirmó**; aquí se confirma por tercera vez y **no se amplía** |
| 7 | ¿Save/load y la importación preservan la fórmula? | **Sí.** §11, caso «formula en linea»: idempotente y idéntico a la entrada en los tres esquemas |
| 8 | ¿Funciona dentro de los slots de `columns`? | **Sí**, con el botón incluido (`WebBlockEditor.jsx:1874`) |
| 9 | ¿Qué límites de longitud y forma debe documentar el packet? | **`content` no tiene tope de longitud**: solo obligatoriedad. **Un `&` no sobrevive**: `escapeHtmlWithLineBreaks` lo convierte en entidad, así que `\begin{matrix} a & b \end{matrix}` no compone. **Límite medido y ya fijado por test**, no defecto de este componente |
| 10 | ¿Qué texto de fallo ve el autor cuando una fórmula se rechaza? | **VACÍA: no hay rechazo de fórmulas.** No hay allowlist que aplicar. La única guardia que puede rechazar `content` es la de texto seguro, y su mensaje es *«El contenido no puede incluir HTML, scripts, eventos o URLs peligrosas»* |

### 6.1 La clase de math, y por qué NO la decide este run

**`MATH_FORMULA_NOT_APPLICABLE` = *«No math or formula surface at all»*.** Leída al pie de la letra,
`callout` **no** encaja: tiene superficie de fórmula —prosa que las acepta, trece tests que lo fijan y un
botón dedicado—, aunque no tenga **campo de math**. `MATH_FORMULA_TEXT_SURFACE_ONLY` dice *«A math field
exists but validates only as opaque text»*, y **campo de math no hay**. **Las dos clases fallan por
mitades opuestas.**

**No lo decido por criterio propio.** El encargo ordena aplicar la resolución de los runs anteriores.
`narrative` tuvo el mismo dilema —prosa que compone fórmulas, sin campo de math— y asignó
**`MATH_FORMULA_NOT_APPLICABLE`**, declarando la capacidad como observación. **Se adopta esa resolución y
se anota.** Lo que este componente **añade** al dilema —el botón, que `narrative` no tiene— se declara como
hueco nuevo en §17.1, no como cambio de clase.

**Clase asignada: `MATH_FORMULA_NOT_APPLICABLE`**, por precedente adoptado, con la reserva anotada.

---

## 7. LOS TRES PUNTOS DEL OBJETIVO, MEDIDOS

### 7.1 Punto 1 — El fondo suave sigue al color del autor: **CONFIRMADO**

El renderer, verbatim (`renderCallout.js:37-43`):

```js
// El accent compilado (paleta activa del autor) manda; sin él, el mapa fijo.
const accentColor = normalizeHexColor(data.color) || paletteConfig.color;
// Y el fondo suave igual: ahora la paleta emite tambien surface, asi que el mapa fijo pasa
// a ser respaldo. El callout es el UNICO renderer Web que toma del mapa un rol atado a la
// variante ademas del acento; los demas pintan solo el acento y no cambian. Si surface no
// viene en la salida, aqui se cae exactamente al comportamiento de antes.
const surfaceColor = normalizeHexColor(data.surface) || paletteConfig.bg;
```

**No me quedé con el comentario.** Medición viva, compilando y renderizando de verdad:

| Caso | Salida compilada | HTML renderizado |
|---|---|---|
| Paleta A (`wrn` = `#AA5500`) | `color=#AA5500 surface=#F8F1EB border=#E1C4A6 textColor=#1E293B` | `background-color=#F8F1EB`, `border-left=#AA5500` |
| Paleta B (`wrn` = `#0055AA`) | `color=#0055AA surface=#EBF1F8 border=#A6C4E1 textColor=#1E293B` | `background-color=#EBF1F8`, `border-left=#0055AA` |
| Sin paleta | `color=#D08770 surface=#FCF7F5` | `background-color=#FCF7F5`, `border-left=#D08770` |
| Hex personalizado `#FF007F` | `color=#FF007F surface=#FFEBF5` | `background-color=#FFEBF5`, `border-left=#FF007F` |
| Salida antigua, **sin** `surface` | — | `background-color=#FCF7F5` — **el respaldo del mapa fijo sigue vivo** |
| Token que la paleta no define | `type,variant,title,content` — **sin color** | `background-color=#F2F6FA`, `border-left=#5E81AC` — respaldo `ctx` declarado |

**Y en Preview Real, que es la superficie que el defecto registrado nombraba** («Palette Preview Callout
Drift»): con paleta de autor, `background-color=#F8F1EB` y `border-left=#AA5500`; sin paleta, `#FCF7F5` y
`#D08770`. **Preview Real y Generate Web coinciden.**

**Verificado, no rehecho. No se tocó una línea.** La cadena que lo sostiene:
`compiler.js:162-170` (`buildColorRolesOutput`, que emite `surface`, `border` y `textColor`) →
`compiler.js:1148` (el caso `callout` la invoca) → `renderCallout.js:43`.

### 7.2 Punto 2 — El campo de prosa, los trece tests y el insertor: **CONFIRMADO, LAS DOS PIEZAS**

**Los cinco campos de prosa** están enumerados en el propio archivo de bloqueo
(`webInlineFormulaProseBehaviourLock.test.mjs:33-39`), verbatim:

> "LOS CINCO CAMPOS, con el simbolo de esquema del que salen (identico en los dos `draftSchema.js`): `details.items[].content` -> DetailsItemSchema.content; **`callout.content` -> WebCalloutSchema.content**; `card(normal).content` -> WebCardShape.content + refineWebCard('normal'); `conceptGrid.items[].content` -> ConceptGridItemSchema.content; `rule.description` -> WebRuleSchema.description"

**`callout.content` es el segundo de los cinco.** El array `PROSE_FIELDS` (`:61-77`) lo confirma en código.

- **Los trece tests: `webInlineFormulaProseBehaviourLock.test.mjs` declara exactamente 13 `test(` de nivel superior, y los trece pasan** (§14). Cifra exacta.
- **El control de insertar fórmula está montado en las dos ramas de `callout`**: nivel superior
  `WebBlockEditor.jsx:3981-3983`, dentro de columnas `:1874-1885`. Su etiqueta visible es
  **«Insertar fórmula»** (`InlineFormulaField.jsx:117`).
- Medición viva propia: `\( a^2 + b^2 = c^2 \)` sobrevive verbatim al compilador, llega verbatim al HTML,
  y las guardias de los **dos** esquemas lo aceptan.
- Los otros tres archivos del insertor —montaje, reglas de selección y deshacer nativo— suman **35 tests,
  los 35 verdes** (§14).

**Verificado, no tocado.**

### 7.3 Punto 3 — «La etiqueta es blanco fijo sobre el color del autor»: **DESMENTIDO**

El objetivo lo daba por medido y pedía confirmarlo o desmentirlo. **Se desmiente, con medición.**

| Qué se afirmaba | Qué mide el disco |
|---|---|
| El texto de la etiqueta es **blanco fijo** | Es **`#4C566A`**, gris azulado de `Commons.PALETTE.gray.color` (`renderCallout.js:46`). Medido en el HTML: `<strong … color: #4C566A`. **Idéntico con las dos paletas, sin paleta y con hex personalizado** |
| …**sobre el color del autor** | El color del autor **no es fondo de nada**. Pinta el `border-left` de 4 px (`:94`) y el icono (`:77`). El fondo del título es el **fondo suave** (`#F8F1EB` con paleta A) |
| Mismo defecto de contraste que «Lista con etiquetas» | **No es el mismo defecto.** El de `iconList` es real y está en `renderIconList.js:118` (`color: #FFF;` en la etiqueta sólida). En `renderCallout.js` **no aparece `#FFF`, `#FFFFFF` ni `white` ni una vez** |

**Búsqueda exhaustiva del blanco, por si estuviera en otra capa:** el compilador **no emite `titleColor`**
(el único campo que movería el color del título); emite `textColor: #1E293B`, que **el renderer no lee**. El
renderer de Slides (`slides/components/renderCallout.js`) tampoco pinta blanco sobre el acento: su cabecera
usa `finalHeaderColor = accentColor` (`:95`) y su cuerpo `#475569` (`:49`); el `#FFFFFF` de `:33` y `:75` es
**fondo**, no texto, y Slides está fuera del alcance de este run.

**Conclusión: no hay defecto de contraste de etiqueta en `callout`.** Único punto donde el color del autor
toca legibilidad: un filete de 4 px y un icono, ambos sobre fondo claro. **Se desmiente y no se repara nada,
porque no hay nada que reparar.**

---

## 8. Lo que otros runs dejaron aquí — verificado, no rehecho

Resumen de la compuerta que el encargo puso: **verificar sin tocar.**

| Pieza | Dueño | Estado verificado | Qué se tocó |
|---|---|---|---|
| Fondo suave siguiendo al color del autor | `RUN-CANTU-AUTHOR-PALETTE-COMPILER-ENGINE-001` (`queue_order` 19, `completed`) | **Se comporta como su record afirma** (§7.1) | **Nada** |
| Roles derivados de un hex personalizado | mismo run | **Se comporta como afirma** (`#FF007F` → `surface #FFEBF5`) | **Nada** |
| Selector de color unificado y opción «Personalizado» | `RUN-CANTU-COLOR-SELECTOR-UNIFICATION-001` (`completed`) | **Se comporta como afirma**; mismas opciones arriba y en slot | **Nada** |
| Insertor de fórmulas montado en `callout.content` | `RUN-CANTU-INLINE-FORMULA-INSERTER-MOUNT-001` (`queue_order` 27, `completed`) | **Montado en las dos ramas** | **Nada** |
| Reglas de selección del insertor | **el mismo run 27**, en su segunda fase (así lo declara `webInlineFormulaSelectionRules.test.mjs:23`) | **12 tests verdes** | **Nada** |
| Escritura por la vía nativa (deshacer del navegador) | `RUN-CANTU-INSERTER-NATIVE-UNDO-001` (`queue_order` 30, `completed`) | **11 tests verdes** | **Nada** |
| Bloqueo de conducta de fórmula en línea | `RUN-CANTU-INLINE-FORMULA-BEHAVIOUR-LOCK-001` (`queue_order` 25, `completed`) | **13 tests verdes** | **Nada** |

**Ninguna de las siete se comporta distinto de lo que su record afirma.** No se dispara PARA Y REPORTA por
este eje. Son **cinco runs ajenos** —7, 16, 19, 25/27 y 30—, todos `completed`.

---

## 9. S8 — La compuerta de reparación, y LOS DEFECTOS MEDIDOS **ANTES** DE TOCAR NADA

### 9.1 El estado de QA registrado

`.aiw/state/component_status.json`, entrada `callout`:

```
"human_qa_status": "HUMAN_QA_FAILED_REPAIR_REQUIRED",
"repair_status": "REPAIR_REQUIRED",
"status_summary": "Callout failed Phase 2 Human QA and requires repair; not certified.",
"notes": "No repair was done in Round 002."
```

**La proyección no nombra el defecto.** Es peor que el caso de `narrative`, cuyo registro al menos decía
«limpieza de modo/naming». Aquí hay que ir a las fuentes que la propia entrada cita — **y de las dos que
cita, una no existe**: `docs/author-lite/NEXT_STEPS.md` **no está en el disco** (D10). La otra sí. **La
matriz sí lo nombra**, y con cuatro mitades (`COMPONENT_CERTIFICATION_MATRIX.md:312`, verbatim):

> `Human QA batch registro HUMAN_QA_FAILED_REPAIR_REQUIRED; requiere Color label, color sync/custom picker, derivados y Palette Preview Callout Drift.`

Y `:186`, verbatim:

> `Re-audit tecnico previo aprobado; Human QA batch posterior falla por color controls, label Variante -> Color, derivados custom y Palette Preview Callout Drift.`

### 9.2 Reproducción contra código vivo — **LAS CUATRO MITADES FALLAN EN REPRODUCIR**

| Mitad | Qué exigía | Medición viva | ¿Reproduce? |
|---|---|---|---|
| **Color label** (`Variante` → `Color`) | Que la etiqueta del control diga «Color» | `WebBlockEditor.jsx:3976` dice `Color`; `:1864` dice `label="Color"`. **La cadena `Variante` no aparece ni una vez en `WebBlockEditor.jsx`** | **NO** |
| **color sync / custom picker** | Selector unificado con opción de color libre, mismas opciones en las dos colocaciones | `VariantSelect … allowCustom` (`:3977`) y `ColumnColorSelectField … allowCustom` (`:1863-1872`); «Personalizado» en `VariantSelect.jsx:116`; `webColorSelectorCustomPicker.test.mjs` y `webSharedColorSelectorUnification.test.mjs` verdes | **NO** |
| **derivados custom** | Que un hex elegido a mano produzca sus roles derivados | Medido: `#FF007F` → `surface #FFEBF5`, `border`, `textColor`. `webAuthorPaletteDerivedRolesAndCustomHex.test.mjs` verde, incluido *«the derived roles reach the rendered HTML for callout, the component that uses them»* | **NO** |
| **Palette Preview Callout Drift** | Que la vista previa no se desincronice de la paleta | Medido en Preview Real **y** en Generate Web, con dos paletas y sin paleta: **coinciden siempre** (§7.1). El servidor lee la paleta activa por petición en los dos caminos (`server.js:832-833` y `:811-812`) | **NO** |

**Salida que la Definition of Done ordena**, verbatim: *«Not reproducible: declare the discrepancy, touch
nothing, route to the operator.»* **S8 = DECLARED. No se tocó nada. Se enruta al operador vía el packet de
§12, cuyos checks 4 a 7 son exactamente estas cuatro mitades.**

**La causa de que no reproduzcan está identificada y es la que el piloto anticipó:** dos piezas compartidas
—el trabajo de paleta y el de unificación del selector— repararon el defecto sin que el run de este
componente llegara a abrirse.

### 9.3 LOS DEFECTOS MEDIDOS POR EL TALLER — **diez, ninguno reparado**

Ningún veredicto de QA nombra ninguno de estos. **Resolución del piloto §11.3(a), adoptada: pendientes de
veredicto, anotados, no resueltos por criterio propio.**

| # | Defecto medido | Evidencia | Estado |
|---|---|---|---|
| **D1** | `compiler.js:1151` invoca `...buildPlacementOutput(block)` en el caso `callout`, **y es rama inalcanzable**: ni `WebCalloutSchema` ni `WebColumnsCalloutSchema` llevan `PlacementMetadataSchema` (solo `card` `:707` y `rule` `:782`), así que `fullWidth`/`colSpan` **nunca sobreviven al parseo**. Medido: la salida compilada nunca los lleva | `compiler.js:1151` contra `draftSchema.js:702-728` | **Sin veredicto.** Efecto visible: ninguno. Es una promesa falsa en el código |
| **D2** | El esquema de nivel superior **descarta en silencio** cualquier clave extra (`fullWidth`, `colSpan`, `zzz`) por no ser `.strict()`; el de slot **rechaza en voz alta**. El autor no recibe error arriba y sí abajo | Medido: `top-level=ACEPTA/DESCARTA`, `en slot=RECHAZA` | **Sin veredicto.** **Confirma el hueco del piloto en un sexto componente; no es hallazgo nuevo.** `header`, `narrative`, `list`, `iconList` y `details` comparten la forma |
| **D3** | El compilador emite `textColor` (`#1E293B`) para `callout` y **ningún renderer lo lee**: `renderCallout.js` consulta `data.titleColor`, que el compilador nunca emite. Un rol de cuatro viaja y muere | `compiler.js:168` contra `renderCallout.js:48-52` | **Sin veredicto.** El comentario de `compiler.js:155-156` lo declara intencionado |
| **D4** | El packet canónico tiene **dos punteros muertos**: `docs/REFERENCE-DRAFT-JSON.md` (`CALLOUT.md:26`, `:48`) — la ruta real es `docs/reference/…` — y `docs/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` (`:12`, `:66`) — la real es `docs/archive/author-lite/…` | Comprobado fichero a fichero | **Enrutado.** S9 prohíbe escribir el packet. **Son los mismos dos punteros muertos que `iconList`, `card` y `video` declararon** |
| **D5** | La entrada del registro para `CALLOUT.md` repite el **mismo** puntero muerto de la matriz en su campo `notes` | `.aiw/docs/docs_index.json`, entrada `docs/components/web/CALLOUT.md` | **Enrutado.** S10 prohíbe escribirlo |
| **D6** | El packet canónico **no documenta** la opción «Personalizado», ni que un hex personalizado **queda congelado** frente a la paleta. El contrato de color §7 lo exige de *«any component that documents a custom picker»*. Tampoco menciona la fórmula en línea ni el botón | `CALLOUT.md:24-31`, `:50-53` | **Enrutado** al lote DOCUMENTATION |
| **D7** | **La matriz se contradice a sí misma sobre `callout`**, y es la fuente única de estado: `:99` y `:312` dicen `HUMAN_QA_FAILED_REPAIR_REQUIRED`; `:386` y `:329` dicen `HUMAN_QA_PENDING_OR_DEFERRED` | `COMPONENT_CERTIFICATION_MATRIX.md` | **Sin veredicto. Es el hallazgo de más alcance de este eje** (§13) |
| **D8** | El catálogo declara el estado del bloque como `QA_PENDING` (`blockCatalog.js:205`), que **no es** lo que dice la matriz en `:99`/`:312` | `blockCatalog.js:205` | **Sin veredicto.** Deriva de D7 |
| **D9** | Dos cadenas para el mismo rótulo de bloque sin título, una con tilde y otra sin: `'Nota destacada sin título'` (`WebBlockEditor.jsx:403`) y `'Nota destacada sin titulo'` (`draftHelpers.js:34`) | Las dos rutas | **Sin veredicto.** Cosmético; se declara por completitud |
| **D10** | El archivo de estado cita como fuente del defecto un fichero **que no existe**: `source_refs: ["docs/author-lite/NEXT_STEPS.md", …]`. **Es un tercer puntero muerto**, y está en la cadena por la que S8 tiene que averiguar qué reproducir | `.aiw/state/component_status.json`, entrada `callout` | **Sin veredicto.** No se edita: el archivo de estado está fuera de alcance |

**Ninguno se reparó. Ninguno autoriza reparación.** La cláusula de la DoD que lo fija, verbatim: *«An
observation made by the workshop itself is a measurement to declare, never a repair authorization.»*

---

## 10. S5 — Colocación en columnas

`callout` es hijo válido de `columns`, declarado y medido.

| Colocación | Evidencia | Resultado |
|---|---|---|
| Nivel superior | `blockCatalog.js:125` (riel), `WebBlockEditor.jsx:3973-3985`, unión `draftSchema.js:965`/`:993` | **Válida** |
| Dentro de slot (los dos) | `blockCatalog.js:1017`, `WebBlockEditor.jsx:1860-1888`, unión `:905`/`:933` | **Válida** |

- **Invariancia de opciones de color** (contrato §7): el desplegable ofrece **los mismos tokens más
  «Personalizado»** en las dos colocaciones. Arriba por `VariantSelect`, abajo por `ColumnColorSelectField`,
  que **envuelve al mismo `VariantSelect`** (`WebBlockEditor.jsx:737`). **Un solo control, no dos copias.**
- **Comportamiento de campo de math en slots** (contrato §10): no hay campo de math; **el botón «Insertar
  fórmula» sí está en el slot** (`:1874`), igual que arriba.
- **Medición viva**: el hijo compilado lleva `color=#AA5500 surface=#F8F1EB border=#E1C4A6
  textColor=#1E293B`, y el HTML de `renderColumns` contiene **los dos** hexes derivados de la paleta del
  autor. La propagación del contexto de compilación funciona.
- **Metadatos de colocación**: rechazados en slot por `.strict()`, tal como el catálogo declara
  (`blockCatalog.js:1017`, *«callout child acepta variant/title/content y rechaza placement metadata como
  fullWidth/colSpan»*). **Declarado y cumplido.**

**S5 = PASS**, con las dos colocaciones registradas.

---

## 11. S6 — Ida y vuelta de persistencia

Siete casos, contra los **tres** esquemas (`WebDraftSchema` de compiler-api, `DraftSchema` de editor-ui,
`DraftSaveSchema`):

| Caso | Idempotente | Idéntico a la entrada | editor-ui | Save |
|---|---|---|---|---|
| Token de paleta (`variant: 'wrn'`) | sí | sí | acepta | acepta |
| Hex personalizado (`variant: '#FF007F'`) | sí | sí | acepta | acepta |
| Sin `variant` | sí | sí | acepta | acepta |
| Sin `title` | sí | sí | acepta | acepta |
| **Fórmula en línea en `content`** | sí | sí | acepta | acepta |
| Saltos de línea (`L1\nL2\n\nL4`) | sí | sí | acepta | acepta |
| `&`, `<`, `>` y comillas en `title` y `content` | sí | sí | acepta | acepta |

**La referencia se queda como referencia** (contrato de color §3): un draft recargado lleva `variant` y
**no** lleva clave `color`; el hex resuelto se produce al compilar y nunca se escribe de vuelta.
**La fórmula sobrevive verbatim** (contrato de math §10).

**S6 = PASS.**

---

## 12. S7 — El packet de QA para el operador

**Preparado. El taller no ejecuta QA humana.**

**Ruta:** `docs/_historical_run_record/RUN-JAME-WEB-CALLOUT-REPAIR-001-OPERATOR-QA-PACKET.md`
Colocado junto a los catorce packets de operador que ya viven ahí (resolución I-2 del piloto).

**Packet completo, no delta.** La fila de la DoD §6 que aplica a este componente es
`HUMAN_QA_FAILED_REPAIR_REQUIRED` → *«The recorded defect enters S8: reproduce, then repair in scope or
declare»*, no la fila del PASS preservado. **Por eso no hay criterio de «delta» que derivar aquí**, y el
hueco que `iconList` §13.1(c) declaró no muerde.

**22 checks. Los tres de parada van primero**, como el encargo exige:

| Bloque | Checks | Qué cubre |
|---|---|---|
| **Parada** | 1, 2, 3 | **El fondo suave siguiendo al color del autor** en las dos salidas, y **la presencia del botón «Insertar fórmula»** en las dos colocaciones. Son las dos piezas que otros runs dejaron aquí |
| Defecto registrado | 4-8 | Las cuatro mitades, una por check, más el congelado del hex personalizado |
| Insertor y contenido | 9-14 | Escritura en el cursor, precarga sin delimitadores, selección mixta, deshacer nativo, y el límite medido del `&` |
| Comportamiento base | 15-22 | Controles, obligatoriedad, texto seguro, columnas, persistencia, saltos de línea y los dos respaldos |

**Todas las etiquetas de plataforma del packet están derivadas del código, ninguna inventada**, y el packet
lleva su propia tabla de procedencia. **Una la busqué y no existe:** el packet anterior de «Texto» nombra un
control llamado **«Importar bloques»**, y esa cadena **no está en el código de la interfaz**; el botón real
se llama **«Insertar JSON»** (`workspace/CenterWorkspace.jsx:78`). Se dice en el packet para que el operador
no lo busque por el nombre viejo. **Corregir aquel packet no es de este run.**

---

## 13. S9, S10 y las divergencias declaradas — gana el disco, no se edita nada

**S9 = PASS.** No se escribió `docs/components/web/CALLOUT.md` ni ninguna fuente del Component Guide. El
Guide **no tiene contenido en línea propio de `callout`**: sus dos menciones (`ComponentGuide.jsx:342`,
`:350`) viven **dentro** de la guía de `columns`, que es una de las tres superficies protegidas por
`checkComponentGuideTextIntegrity.cjs`. **Superficie congelada para este run, y no tocada.**

**S10 = PASS.** `.aiw/docs/docs_index.json` **no se escribió**. El conflicto preservado de `list`
(`component-list-status-agents-vs-matrix-phase2`, resolución `PRESERVE_AS_DOCUMENTATION_CONFLICT_NOT_CERTIFICATION`)
está **intacto**. Los siete `global_no_claims` siguen en `false`.

**Divergencias medidas. En todas gana el disco y ninguna se edita.**

| # | Documento | Lo que dice | Lo que mide el disco |
|---|---|---|---|
| 1 | **DoD §5, fila `callout`** | `` `variant` `` / **`no - regression pattern`** | **Resuelve contra la paleta activa** y emite `variant` + `color` + `surface` + `border` + `textColor` |
| 2 | **DoD §8, excepción** | *«`callout` and `timeline` step details carry the palette-regression pattern»* | **Falso para `callout` hoy.** Lo reparó `queue_order` 19 |
| 3 | **DoD §5, texto** | *«Five accept an open palette token and emit only that token id […] (`callout`, `details`, `conceptGrid`, `table`, `rule`)»* | **Son cuatro, no cinco:** `callout` ya no está |
| 4 | **DoD §6** | *«thirty `*.test.mjs` files […] holding 323 top-level `test(` declarations»* | **36 archivos y 398 declaraciones.** Los otros datos de esa sección —8 archivos en `tools/roadmap/tests/`, ningún `test` script en los `package.json`— **siguen exactos** |
| 5 | **Contrato de color §4**, tabla | `callout` \| `no` \| *«`variant` only»* | Emite cinco claves de color |
| 6 | **Contrato de color §4**, texto | *«Only the `accent` role of the resolved token is emitted.»* | **Se emiten cuatro roles** (`buildColorRolesOutput`, `compiler.js:162-170`) |
| 7 | **Contrato de color §5** | *«Every other Web renderer resolves `variant` against the hardcoded maps […] and never sees the active palette.»* | **`renderCallout.js` sí la ve**: prefiere `data.color` y `data.surface` |
| 8 | **Contrato de color §8** | *«Components carrying the pattern today: `callout`, `timeline` step details…»* | **`callout` ya no lo lleva** |
| 9 | **Contrato de color §3**, tabla | `callout` \| `variant` \| *«token id»* | También acepta **`#RRGGBB`** (`draftSchema.js:704`) |
| 10 | **Inventario §2** | `renderCallout.js:16` / `compiler.js:1077` | Las líneas reales son `renderCallout.js:24` y `compiler.js:1142`. **Toda la columna está desfasada** |
| 11 | **Inventario §5 y §7** | `VARIANT_ONLY_HARDCODED`; *«`compiler.js:1080` emits `variant` only»* | **Falso hoy** |
| 12 | **La matriz consigo misma** | `:99` y `:312` dicen `HUMAN_QA_FAILED_REPAIR_REQUIRED`; `:386` y `:329` dicen `HUMAN_QA_PENDING_OR_DEFERRED` | **La fuente única de estado tiene dos lecturas para este componente.** Es D7 |

**Lo que el encargo avisaba, verificado:** el archivo de estado afirma sobre **otro** componente un defecto
ya cerrado. Es la entrada `list`: `repair_status: POST_CERT_COLOR_UI_REGRESSION_REPAIR_REQUIRED` y
`blocked_by: color_palette_sync_custom_picker_issue`. **El piloto midió (§8.2) que ese defecto no reproduce
contra código vivo**, y hoy `webColorSelectorCustomPicker.test.mjs` lo asegura en verde. **Se declara. NO se
toma como precedente:** las cuatro mitades del defecto de `callout` se reprodujeron una a una por su cuenta
(§9.2), sin heredar de `list` ni la conclusión ni el método.

**Ninguno de estos doce documentos se editó.**

---

## 14. Tests — qué corrí, con su salida

**Estatuto:** medición, según DoD §6. **No son sustituto del packet de S7 ni autorización de reparación.**
Se corrió **lo tocado y lo directamente relacionado**, nunca la suite completa.

**Nada se tocó, así que lo corrido es «lo directamente relacionado»: los ONCE archivos de
`compiler-api/tests/` que mencionan `callout`, los once, más TRES que no lo mencionan pero son de las
piezas que el objetivo manda verificar** —reglas de selección del insertor, deshacer nativo y
reconciliación legacy de paleta—. **Catorce archivos en total.**

### 14.1 El bloqueo de fórmula en línea — **los trece, verdes**

```
$ node --test tools/author-lite/compiler-api/tests/webInlineFormulaProseBehaviourLock.test.mjs
✔ the five prose fields store a delimited inline formula unchanged in every compiler-api gate (6.6871ms)
✔ the five prose fields store a delimited inline formula unchanged in the editor-ui schema (9.1176ms)
✔ the compiler emits the delimited inline formula unchanged for the five prose fields (3.4485ms)
✔ the formula already published in details.items[].content compiles unchanged (0.5736ms)
✔ the delimited formula reaches the generated web HTML where the global math pass can see it (19.1735ms)
✔ the preview path carries the delimited formula with the same single global math pass (19.8735ms)
✔ prose with no delimited formula is left untouched in the five fields (4.8821ms)
✔ the untouched claim is bounded: four of the five fields turn a newline into <br /> (1.4748ms)
✔ no guard of the five fields rejects any character a formula needs, in either schema (7.3846ms)
✔ backslash, dollar, braces, parentheses and underscore reach the HTML untouched (33.472ms)
✔ ampersand, angle brackets and apostrophe are HTML-escaped, and that is the only change (2.5434ms)
✔ the Moodle output carries the formula literally and carries no math engine of its own (6.4251ms)
✔ the five prose fields never travel the Slides delimiter set (0.454ms)
ℹ tests 13
ℹ pass 13
ℹ fail 0
```

**13/13. La cifra del encargo es exacta.**

### 14.2 El insertor — montaje, reglas de selección y deshacer nativo

```
$ node --test tools/author-lite/compiler-api/tests/webInlineFormulaInserterMount.test.mjs \
              tools/author-lite/compiler-api/tests/webInlineFormulaSelectionRules.test.mjs \
              tools/author-lite/compiler-api/tests/webInlineFormulaInserterNativeUndo.test.mjs
ℹ tests 35
ℹ pass 35
ℹ fail 0
```

Últimas líneas verdes, entre ellas: *«no other programmatic writer was reached: the insert-text path exists
in exactly one file»*, *«a selection that is exactly one formula loads without its delimiters and replaces
that formula»*, *«a mixed selection replaces nothing, preloads nothing and tells the author why»*.

### 14.3 El trabajo de paleta

```
$ node --test tools/author-lite/compiler-api/tests/webAuthorPaletteCompilerEngineReconciliation.test.mjs \
              tools/author-lite/compiler-api/tests/webAuthorPaletteDerivedRolesAndCustomHex.test.mjs
ℹ tests 26
ℹ pass 26
ℹ fail 0
```

Incluye, verbatim, las tres aserciones que sostienen el punto 1 del objetivo:
*«callout surface travels with the palette: the compiled surface replaces the engine map background»*,
*«callout falls back to the engine map when the compiled output carries no surface»*,
*«the derived roles reach the rendered HTML for callout, the component that uses them»*.

### 14.4 Columnas y bloques de texto de teoría

```
$ node --test tools/author-lite/compiler-api/tests/webColumnsChildExpansionSafety.test.mjs \
              tools/author-lite/compiler-api/tests/webTheoryTextBlocksSafety.test.mjs
ℹ tests 33
ℹ pass 33
ℹ fail 0
```

### 14.5 Selector de color unificado y reconciliación legacy

```
$ node --test tools/author-lite/compiler-api/tests/webLegacyCertifiedColorPaletteReconciliation.test.mjs \
              tools/author-lite/compiler-api/tests/webColorSelectorCustomPicker.test.mjs \
              tools/author-lite/compiler-api/tests/webSharedColorSelectorUnification.test.mjs
ℹ tests 22
ℹ pass 22
ℹ fail 0
```

### 14.6 Teoría, tarjetas y cajas de regla, y las dos superficies de `rule` que citan `callout`

```
$ node --test tools/author-lite/compiler-api/tests/webTheoryCardsRuleBoxesParitySafety.test.mjs \
              tools/author-lite/compiler-api/tests/webRuleMathAuthoringIntegration.test.mjs \
              tools/author-lite/compiler-api/tests/webRuleSmartFormulaFieldRulePilot.test.mjs
✔ JSON import accepts safe special cards and bounded callout while rejecting unsupported columns children (11.5031ms)
ℹ tests 41
ℹ pass 41
ℹ fail 0
```

Los tres pertenecen a otros componentes y citan `callout` en aserciones compartidas. **Se corren porque son
«lo directamente relacionado», no porque sean de este run.**

### 14.7 Total corrido, y lo que NO se afirma

**170 tests corridos en catorce archivos. 170 verdes, 0 rojos. Nada verde se puso rojo.**

**La suite completa NO se corrió** (el encargo lo prohíbe y la DoD §2 lo desaconseja con dos talleres). La
cifra **398** de §15 es **recuento estático** —`grep -c "^test("` sobre los 36 archivos— **y no se llama
verde**: no se ejecutó.

### 14.8 Aserciones ajenas en los archivos corridos

De los catorce archivos, **ninguno es exclusivo de `callout`**. `webColumnsChildExpansionSafety.test.mjs`
mezcla aserciones de `callout`, `narrative`, `rule`, `card` y `table`;
`webAuthorPaletteCompilerEngineReconciliation.test.mjs` cubre las cinco del patrón de paleta. **Un run
posterior que edite cualquiera de estos archivos puede desproteger `callout` sin darse cuenta.** Se declara,
como hicieron `card` §14.3 y `video` §14.3.

---

## 15. Las cifras del encargo, verificadas una a una

**Ninguna se dio por buena.**

| Cifra del ticket | Medida | Veredicto |
|---|---|---|
| **16 componentes en el archivo de estado** | **16** en `.aiw/state/component_status.json` | **EXACTA** |
| **17 en el catálogo** | **17** claves en `WEB_COMPONENT_UI` (`blockCatalog.js:11-113`) | **EXACTA** |
| **«no son la misma lista»** | **CONFIRMADO.** La diferencia es **exactamente una**: `columns` está en el catálogo y **no** en el archivo de estado. Las otras dieciséis coinciden id a id. La DoD §6 ya lo declara (*«`columns` has no entry»*) | **CONFIRMADA** |
| **17 packets** | **17** archivos `.md` en `docs/components/web/` | **EXACTA** |
| **13 tests del bloqueo** | **13** `test(` de nivel superior en `webInlineFormulaProseBehaviourLock.test.mjs`, **los 13 corridos y verdes** | **EXACTA** |
| **5 campos de prosa** | **5**, enumerados en el propio archivo de bloqueo (`:33-39`) y en `PROSE_FIELDS` (`:61-77`). `callout.content` es el segundo | **EXACTA** |

**Cifras que el ticket no daba a propósito y el criterio 9 mandaba medir** (§16): total de runs **73**,
`history=32`, `ready_next=14`, y además `later=26`, `now=1`, `needs_human_decision=0`.

**Cifras heredadas de records anteriores que ya NO valen, y hay que fecharlo:**

| Cifra | Quién la midió | Hoy |
|---|---|---|
| 68 runs en el canónico | «Texto», 2026-08-04 | **73** |
| `history=25`, `ready_next=17` | «Texto», 2026-08-04 | **`history=32`, `ready_next=14`** |
| `queue_order` de `callout` = 27 | «Texto» §1.3, prediciendo | **31** |
| 32 archivos de test / 350 tests | «Texto» §12 | **36 archivos / 398 declaraciones** (recuento estático) |
| 30 archivos / 323 tests | **la propia Definition of Done §6** | **36 / 398** |

**Ninguna es error de quien midió: son mediciones fechadas de un repositorio que se mueve.** Se re-fechan
aquí y no se corrige ningún documento.

---

## 16. Validador

Corrido desde `projects/cantu-studio`, por la vía que **no escribe**. Salida completa:

```
$ node tools/project-console/validate-project-console-state.mjs
Project Console state validation passed.
Roadmap v3 prototype: 7 objectives / 28 phases / 73 runs; queue groups needs_human_decision=0 now=1 ready_next=14 later=26 history=32
Roadmap v3 active run derived stages: RUN-JAME-WEB-CALLOUT-REPAIR-001=none
Docs indexed: 149
Docs curated primary-visible: 60 of 149 registered
Component statuses: 16
Git provenance episodes: 9
Git history snapshot: 508 commits / 1 branches (1 visible, 0 backup hidden); current=main; run-associated=3; source=local_git_autosync
Roadmap rebase warnings (non-blocking):
- .aiw/roadmap/roadmap.json run RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 depends on RUN-CANTU-ROADMAP-CONTENT-AUDIT-001, which does not resolve in this roadmap. With a single roadmap loaded this cannot be decided: it may be a legal external dependency — a run that lives in another project (CONTRATO §10.d Regla 2) — or a typo in the run id. Both are possible and one loaded roadmap cannot tell them apart; resolve it against the full set of projects to distinguish external from write error.
```

**Pasa.** Cifras reales: **73 runs**, **`history=32`**, **`ready_next=14`**, `later=26`, `now=1`,
`needs_human_decision=0`.

**El aviso de la dependencia externa es el conocido y no bloqueante. Es legal; NO es hallazgo de este run.**

**Integridad del canónico, verificada aparte:** `queue_order` **1..73 sin huecos y sin duplicados**;
**32 `completed`, 1 `active`, 40 `planned`**. El único `active` es este run.

---

## 17. HUECOS NUEVOS DEL PROCEDIMIENTO — solo los que los cinco runs anteriores no declararon

**Ya declarado y confirmado sin repetir:** S1 sin campo `lane`; S2 nombra los dos schemas y no ordena
compararlos; la partición de las diez preguntas; I-1 a I-6 del piloto; sus huecos (a) compuerta sin salida
para medición propia, (b) `DECLARED`/`NA` sin veredicto, (c) S6 sin decir si vale citar un test, (d) S9 PASS
que no distingue «el packet está bien» de «no lo escribí y anoté que está mal»; de `iconList`: S2 nombra
cinco capas y hay más, el `NOT_APPLICABLE` de S8 engaña, el «delta packet» sin criterio, y las superficies
disjuntas que enumeran documentos y no código; de `card`: S2 sin criterio para sub-tipos, S3 preguntando por
«el contraste» como si hubiera uno, y S6 y las asimetrías entre colocaciones; de `video`: S5 sin salida para
un excluido de columnas, S3 sin patrón para un «no hay superficie», la pregunta 6 de S4 presuponiendo que
solo los campos de math producen KaTeX, y el hueco de contenido de terceros; de `narrative`: **ningún paso
para un componente cuyo campo principal es prosa larga**, S8 sin criterio de suficiencia para reproducir un
defecto enunciado en categoría, S8 obligando a elegir entre «reproducido» y «reparable», y S2 sin decir cómo
comprobar que el fixture es el correcto.

**Tres confirmaciones que conviene fechar, porque runs anteriores las anticiparon por nombre:**

- `narrative` §13.1 predijo que **«Nota destacada»/`callout`** entraría por el hueco de la prosa larga.
  **Se confirma**, y con un agravante que aquel no tenía: aquí la prosa **lleva un botón**. Ver §17.1.
- `narrative` §13.3 declaró que S2 no ordena comprobar que el fixture asignado sea el correcto. **Se
  comprobó igual, y aquí el fixture SÍ es el correcto** (§4.2). **El hueco sigue siendo hueco**: que la
  respuesta salga bien no lo cierra.
- `card` §15.1(b) predijo que **`narrative` (cuatro modos)** y **`table`** entrarían por el hueco de los
  sub-tipos. `callout` **no** tiene sub-tipos: una sola forma, tres campos. **Se dice para que la
  predicción no se herede donde no aplica.**

Lo que sigue es lo que este componente añade.

### 17.1 ¿Tiene la Definition of Done algún paso para verificar capacidades que otro run dejó instaladas en este componente?

**NO. Ninguno. Es hueco, y se declara.** Es la pregunta que el encargo ponía primero, y la respuesta está
medida.

Los diez pasos S1–S10 miden: identidad, estado interno, color, math, colocación, persistencia, QA humana,
reparación, packet y no-claims. **Todos miran el componente como si su superficie la hubiera puesto su
propio run.** Ninguno pregunta: *¿qué le instaló aquí un run ajeno, y sigue funcionando?*

Concretamente, este componente lleva **siete capacidades instaladas por cinco runs ajenos** (§8), y
**ninguna tiene paso**:

| Capacidad instalada por otro run | Dónde acabó medida en este record | Paso al que pertenecería |
|---|---|---|
| El fondo suave siguiendo al color del autor | §7.1 — dentro de **S3**, porque el color es lo más cercano | Ninguno propio |
| Los roles derivados de un hex personalizado | §7.1 — dentro de **S3** | Ninguno propio |
| El botón «Insertar fórmula» montado en `content` | §6, pregunta 3 — dentro de **S4**, en un componente cuya clase de math es `NOT_APPLICABLE` | Ninguno propio |
| Las reglas de selección del insertor | §14.2 — **solo como test corrido**, fuera de todo paso | Ninguno |
| La escritura por la vía nativa (deshacer del navegador) | §14.2 — **solo como test corrido** | Ninguno |
| El bloqueo de conducta de fórmula en línea | §14.1 — **solo como test corrido** | Ninguno |
| El selector de color unificado con «Personalizado» | §5, preguntas 2 y 4 — dentro de **S3** | Ninguno propio |

**Tres de las siete no caben en ningún paso y solo existen en este record porque corrí sus tests.** Y la DoD
§6 dice, verbatim, que *«this DoD requires no step to run them»*. **Un run que se ciña a los diez pasos y no
corra un solo test cerraría los diez con la misma tabla de evidencia que ésta y no habría mirado tres de las
siete capacidades ni una vez.**

La asimetría es visible en el propio documento: **S8 tiene una compuerta entera para reparar lo que otro
midió mal, y no hay compuerta ninguna para verificar lo que otro construyó bien.** La DoD supone que el
único trabajo ajeno relevante es un **veredicto de QA**; aquí el trabajo ajeno relevante es **código
instalado**, y el procedimiento no lo ve.

**Este componente es el caso extremo, y por eso lo plantea primero: cinco runs ajenos, siete capacidades.**
Pero no es el único que viene. **`details` (`queue_order` 32), `rule` (34) y `conceptGrid` (38) llevan cada
uno al menos uno de los cinco campos de prosa con insertor**, y `rule` lleva además el campo del piloto de
la fórmula inteligente.

**Se mide y se reporta. NO se propone reescribir la Definition of Done:** enmendarla es del operador y su
ejecución es otro run.

### 17.2 ¿Qué paso no fue ejecutable tal como está escrito?

**(a) NUEVO — las cinco clases de S4 no cubren «prosa con fórmula y con botón».** `narrative` chocó con la
mitad de esto —prosa que compone fórmulas sin campo de math— y lo resolvió como `NOT_APPLICABLE`. **Aquí la
otra mitad hace el encaje peor**: `NOT_APPLICABLE` significa literalmente *«No math or formula surface at
all»*, y este componente tiene **un botón de la interfaz cuyo único propósito es escribir fórmulas en ese
campo**, más trece tests que fijan su conducta. Decir «no hay superficie de fórmula» de un campo con botón
de fórmula es falso al pie de la letra. `TEXT_SURFACE_ONLY` tampoco vale: exige *«a math field»*, y no lo
hay. **Adopté `NOT_APPLICABLE` por precedente de `narrative` y lo anoté** (§6.1), pero **el precedente lo
fijó un componente sin botón**, así que lo estoy estirando. **Lo digo porque es estiramiento, no lectura.**
**Tres componentes más entran por aquí** con la misma forma.

**(b) NUEVO — S8 no dice qué hacer cuando el veredicto de QA no está en la fuente que S8 nombra.** S8 exige
reproducir *«whose defect»*. La DoD §6 dirige el paso a `.aiw/state/component_status.json`, y **ahí el
defecto de este componente no está nombrado**: la entrada dice solo *«Callout failed Phase 2 Human QA and
requires repair»*. Tuve que ir a las `source_refs` de la propia entrada, encontrar que **una de las dos
no existe en el disco** (`docs/author-lite/NEXT_STEPS.md`, D10) y sacar las cuatro mitades de la
matriz (`:186` y `:312`), que S8 **no nombra**. **El paso funciona por una cadena de punteros que el
procedimiento no describe.** Es distinto del hueco de `narrative` §13.2(a) —allí el defecto estaba nombrado,
pero en categoría; aquí **no está nombrado en absoluto en la fuente que el paso usa**. **Tres componentes
más entran con QA fallida** y sus entradas están escritas con la misma parquedad.

**(c) NUEVO — la fuente única de estado se contradice y ningún paso lo detecta.** S10 manda verificar que
los conflictos preservados sigan intactos, y **`callout` no tiene conflicto preservado**: tiene una
**contradicción no declarada** dentro de un solo documento —la matriz dice `HUMAN_QA_FAILED_REPAIR_REQUIRED`
en `:99` y `:312`, y `HUMAN_QA_PENDING_OR_DEFERRED` en `:329` y `:386`— (D7). El `list` AGENTS-versus-matrix
sí está registrado como conflicto y S10 lo nombra; **éste no está registrado en ninguna parte y ningún paso
pregunta si la fuente única es consistente consigo misma.** La proyección eligió una de las dos lecturas sin
dejar rastro de que había dos. **Lo declaro y no lo resuelvo: elegir cuál manda es del operador.**

### 17.3 ¿Qué criterio de salida faltó?

**NUEVO — S2 no tiene celda para «capacidad del renderer que el editor no puede alcanzar, y está bien así».**
`renderCallout.js` lee `data.icon` y `data.titleColor`, que ningún esquema produce. Esa es, literalmente, la
forma del hueco que la DoD §8 registra como **excepción** para `conceptGrid` (*«The Core renderer reads
`item.math`; no Editor schema can produce it»*). **Aquí la misma forma NO es hueco**, porque el catálogo la
declara como frontera querida (§4.3). **Pero el procedimiento no ofrece ninguna manera de distinguir las dos
cosas**: la celda de S2 admite «catalog / schemas / compiler / renderer / fixture» y no tiene sitio para
«medí un campo que el renderer lee, el editor no produce, y el catálogo declara excluido a propósito».
**Un run que rellene S2 al pie de la letra citaría el renderer y no vería ninguno de los dos casos**, y otro
que sí los viera no tendría cómo decir cuál es cuál. **Lo resolví leyendo el catálogo, y lo digo porque es
elección mía.**

### 17.4 ¿Qué sobra? — confirmación, sin hallazgo nuevo

Las ocho preguntas vacías de S4 volvieron a ocupar espacio real, en el **séptimo** componente seguido sin
campo de math —aunque aquí **dos** de las ocho sí produjeron señal, por el botón—. Ya declarado por el
piloto, `iconList`, `card`, `video` y `narrative`; **se confirma y no se amplía.**

---

## 18. En qué status debe quedar el run, y qué falta para llegar ahí

**Este record NO cambia ningún status. Lo cierra el operador desde la consola. `.project/` no se re-emitió.**

**Status declarado: el run debe seguir `active`.**

**Veredicto de la DoD: `READY_FOR_OPERATOR_QA`, con la reserva explícita del piloto §11.3(b), adoptada.**

La reserva, dicha entera para que no se herede sin su motivo: los cinco veredictos de la DoD §4 **no cubren
el resultado `DECLARED` de S8**. `READY_FOR_OPERATOR_QA` exige *«All steps PASS or justified
NOT_APPLICABLE»*, y `DECLARED` no es ninguno de los dos; `REPAIR_REQUIRED_OWN_SCOPE` exige un defecto
**reproducido**, y aquí **ninguna de las cuatro mitades reproduce**. **`READY_FOR_OPERATOR_QA` es el único
que describe el estado real** —taller terminado, packet en manos del operador, nada roto— y es la
resolución que el piloto dejó escrita **nombrando a este componente**. Se adopta tal cual; **no se amplía ni
se reinterpreta.**

**Qué falta para que el operador pueda cerrarlo:**

1. **Ejecutar el packet de §12.** Los checks **1, 2 y 3** son de parada y verifican trabajo ajeno; los
   **4 a 7** son las cuatro mitades del defecto registrado. **Si alguna reprodujera para el operador, su
   resultado manda sobre la medición del taller** y el run pasaría a la casilla de reparación.
2. **Decidir sobre los diez defectos medidos de §9.3**, ninguno de los cuales tiene veredicto. Los
   **D4, D5, D6 y D10** son documentales —tres punteros muertos entre ellos— y pertenecen al lote
   DOCUMENTATION o al dueño del archivo de estado. **D1, D2, D3 y D9** son de código y ninguno tiene dueño
   declarado. **D7 y D8 son de la fuente de estado.**
3. **Resolver D7**, que es el que bloquea de verdad: mientras la matriz diga dos cosas distintas sobre
   `callout`, cualquier cambio de status parte de una premisa ambigua.
4. **Nada más.** No hay decisión abierta de los contratos tocada por este run.

**Ninguna de las cuatro es del taller.**

---

## 19. Lo que este encargo NO hizo — y por qué

**Reparaciones: cero.** La compuerta S8 autoriza reparar solo con veredicto de QA cuyo defecto el taller
**reproduzca**, y las cuatro mitades **no reproducen**.

| Lo que no se hizo | Por qué |
|---|---|
| Reparar D1 (rama muerta del compilador), D2, D3 o D9 | Ningún veredicto de QA los nombra. Medición, no autorización |
| Reparar los dos punteros muertos del packet | S9: *«A component run edits no packet»* |
| Refrescar `.aiw/docs/docs_index.json` | S10: *«is not edited by a component run»* |
| Corregir la contradicción de la matriz (D7) | Es la fuente única de estado. Cambiarla es del operador |
| Corregir la fila de `callout` en la DoD §5, o en el contrato de color, o en el inventario | **Divergencias declaradas, no reparadas.** Gana el disco; los documentos no se editan |
| Tocar el trabajo de paleta, el insertor, sus reglas de selección o su escritura nativa | Cerrados con QA del operador. **Este run los verifica y no los toca** |
| Tocar la fábrica de bloques, los dos esquemas o cualquier pieza compartida | Fuera de alcance por el ticket, y sin autorización de S8 |
| Escribir el Component Guide | Superficie protegida por guardia; `callout` solo aparece dentro de la guía de `columns`. Tiene dos runs propios en el carril DOCUMENTATION |
| Corregir el packet de «Texto» por su control inexistente «Importar bloques» | No es de este run. Se declara en §12 |
| Añadir el selector de iconos que el renderer soportaría | **No expandir.** El catálogo lo declara no habilitado. **Se nombra y no se hace** |
| Añadir tope de longitud a `content` | **No expandir.** No está en el `full_description` ni en la DoD. **Se nombra y no se hace** |
| Exponer `fullWidth`/`colSpan` en `callout` para que D1 dejara de ser rama muerta | **No expandir.** El Guide declara que no se exponen a propósito. **Se nombra y no se hace** |
| Cambiar la clase de math a algo que describa mejor «prosa con botón» | **No decidir por criterio propio.** Se adopta el precedente de `narrative` y se anota el estiramiento (§17.2(a)) |
| Correr la suite completa | Prohibido por el ticket y desaconsejado por la DoD §2 |
| Cambiar ningún status, cerrar el run, o re-emitir `.project/` | Es del operador desde la consola |
| Insertar, mover o renumerar runs; git; servidores | Fuera de alcance |

**No se disparó PARA Y REPORTA.** Las seis condiciones del criterio 13 se comprobaron una a una: el canónico
casa (§1); **no hizo falta reparar nada**, así que ninguna pieza compartida, ningún esquema, ninguna fábrica
de bloques y ningún insertor se acercaron a ser tocados; **ninguna decisión de diseño del operador bloqueó
un paso** —los diez cerraron—; **el trabajo de paleta y el del insertor se comportan exactamente como sus
records afirman** (§8); y el trabajo **no creció** más allá de revalidar este componente.

---

## 20. Archivos escritos — dos, y ninguno más

| Archivo | Qué es |
|---|---|
| `projects/cantu-studio/docs/_historical_run_record/RUN-JAME-WEB-CALLOUT-REPAIR-001-OPERATOR-QA-PACKET.md` | El packet de S7, junto a los catorce que ya viven ahí |
| `projects/aiw-console/context/aiw-console/records/REVALIDACION-COMPONENTE-NOTA-DESTACADA-CANTU.md` | Este record |

**Ningún otro archivo del repositorio se creó, se modificó ni se borró.** Los **tres** ficheros temporales
de medición se escribieron bajo `tools/author-lite/compiler-api/tests/` con prefijo `_tmp_`, se ejecutaron y
**se eliminaron en la misma orden**; el directorio vuelve a tener sus **36** archivos `*.test.mjs` y no
queda ningún `_tmp_` en el repositorio. El validador, corrido después de escribir, **sigue pasando con las
mismas cifras** que en §16.

---

## 21. Procedencia

- Run derivado de `projects/cantu-studio/.aiw/roadmap/roadmap.json` por `queue_order` 31, ruta
  `objectives[2].phases[2].runs[7]`. Título verificado verbatim.
- Procedimiento: `docs/reference/REFERENCE-COMPONENT-REVALIDATION-DEFINITION-OF-DONE.md`, leída entera antes
  de medir.
- Contratos consumidos: `REFERENCE-COLOR-PALETTE-COMPATIBILITY.md` §9 (S3),
  `REFERENCE-MATH-FORMULA-COMPATIBILITY.md` §10 (S4).
- Resoluciones adoptadas de: `PILOTO-REVALIDACION-COMPONENTE-LISTA-CANTU.md`,
  `REVALIDACION-COMPONENTE-LISTA-CON-ETIQUETAS-CANTU.md`, `REVALIDACION-COMPONENTE-TARJETA-CANTU.md`,
  `REVALIDACION-COMPONENTE-VIDEO-CANTU.md`, `REVALIDACION-COMPONENTE-TEXTO-CANTU.md`.
- Mediciones vivas ejecutadas con `node` contra los esquemas, el compilador, `previewRenderer.js` y los
  renderers reales del motor. Tests con `node --test`, **catorce archivos, 170 casos, 170 verdes**.
- Validador: `node tools/project-console/validate-project-console-state.mjs`, salida completa en §16.
- Fecha de la sesión: **2026-08-05**. Toda cifra de este record está fechada ese día.
