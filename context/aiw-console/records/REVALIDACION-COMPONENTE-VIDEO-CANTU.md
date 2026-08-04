# Revalidación de componente — «Video» (`video`) — `cantu-studio`, `queue_order` 23

Cuarta aplicación de la Definition of Done de revalidación tras su refresco, y **tercera que no
es el piloto**. Consume los veredictos del piloto de `list` (`queue_order` 20), de «Lista con
etiquetas» (`iconList`, 21) y de «Tarjeta» (`card`, 22); **adopta sus resoluciones sin
cambiarlas** y reporta solo los huecos que ninguno de los tres declaró.

Es también el **primer componente de la serie que incrusta contenido de terceros**, y el primero
sin ninguna superficie de color de autor. Las dos cosas cambian dónde está el trabajo.

---

## 1. Identidad del run, derivada del canónico — NO tecleada

Derivada de `projects/cantu-studio/.aiw/roadmap/roadmap.json` recorriendo
`objectives[].phases[].runs[]` y filtrando por `queue_order === 23`. **Una sola coincidencia.**

| Campo | Valor |
|---|---|
| `queue_order` | 23 |
| `run_id` | `RUN-JAME-WEB-VIDEO-REVALIDATION-001` |
| `title` | `Audit and implement the Video component` |
| **Comprobación verbatim del título** | **`true`** — igualdad estricta contra `Audit and implement the Video component` |
| Objetivo / fase | `O1` / `O1.P1C` |
| `status` | `active` (no se toca) |
| `lane` | **ausente en el run**; se deriva `DEVELOPMENT` de `lanes[].default: true`, igual que los tres anteriores |
| `depends_on` | `RUN-JAME-WEB-COMPONENT-CONTRACT-STANDARDIZATION-001`, `RUN-JAME-WEB-COMPONENT-BASELINE-RECONCILIATION-001` |
| Clasificación | `JUDGED_DEFINES` / `FUNCTIONAL` / `ADJACENT` / `VISIBLE`, `classified_at` `2026-08-01T05:45:24.479Z` |

Totales verificados en disco: **66 runs**, `queue_order` 1..66 sin huecos ni repetidos,
**24 `completed` / 1 `active` (este) / 41 `planned`**. El validador reconoce el run activo como
`RUN-JAME-WEB-VIDEO-REVALIDATION-001` (§15).

**Una diferencia con los tres anteriores, medida:** su `depends_on` tiene **dos** entradas, no
tres. Los runs 20, 21 y 22 dependían además de `RUN-JAME-COLOR-PALETTE-COMPATIBILITY-CONTRACT-001`;
este no. Es coherente con lo que mide §6: este componente no tiene superficie de color.

### 1.1 El `full_description` íntegro, leído antes de empezar

Se cita verbatim porque es la especificación que este ticket ejecuta sin ampliar:

> Audit the Video component against the color and palette compatibility contract, using the
> current component inventory as the starting point. Where the inventory shows the component
> carries hardcoded or local colors instead of the shared palette, or lacks a required
> integration point, implement the missing integration. Repair only what the audit and human
> visual QA show to be a real defect; do not rewrite accepted behavior. Verify the result by
> human visual QA rather than an automated test suite, since the repository has no test runner.

`summary`: *«Audit the Video component against the color system, implement what is missing, and
verify by human visual QA.»*

### 1.2 Dónde el run y el ticket de cabina discrepan, y quién gana

El encargo fija: *«Si este ticket y el run discrepan, gana el run.»* Tres puntos, los tres
declarados:

**(a) El `full_description` autoriza *«implement the missing integration»* cuando **el
inventario** muestre colores hardcodeados o falta de un punto de integración.** El inventario es
el documento que la propia frase nombra como punto de partida,
`docs/reference/REFERENCE-WEB-COMPONENT-COLOR-AND-MATH-INVENTORY.md`, y su fila dice:

> `| video | NO_COLOR_SURFACE | compiler.js:292-297 emits title, url, caption only |`

**La condición que dispararía la autorización no se cumple**: no hay colores hardcodeados en
lugar de la paleta compartida, porque **no hay ninguna superficie de color de autor** (§6). La
cláusula no abre nada. Y la misma frase acota — *«Repair only what the audit and human visual QA
show to be a real defect»* —, que la Definition of Done S8 convierte en compuerta dura. **No hay
conflicto real: el run y el ticket ordenan lo mismo, declarar y no reparar.**

**(b) La cláusula final, *«since the repository has no test runner»*, es falsa en disco:** hay
**32** archivos `*.test.mjs` bajo `tools/author-lite/compiler-api/tests/` que corren con
`node --test`. La Definition of Done §12 ya resuelve este choque de forma general y a su favor:

> **The component run texts are stale on the test-runner clause, and the procedure governs.**
> […] Where a run text and this document disagree on that point, **this procedure is what the
> run executes**.

La primera mitad —QA humana del operador como compuerta de cierre— **sigue vigente y se
obedece**. Idéntico a los tres runs anteriores; **no es hallazgo nuevo**.

**(c) El ticket de cabina afirma que «tres superficies no tienen entrada en el catálogo».**
Medido: **los diecisiete** componentes Web tienen etiqueta en `WEB_COMPONENT_UI`
(`blockCatalog.js:11-113`) **y** entrada de docs; **ninguno falta**. Lo que hay son **tres
entradas de docs de Slide** —`slide-title`, `slide-columns`, `slide-visual`— que no son
componentes Web. Es la misma medición que hizo «Tarjeta». **Gana el disco**; la cifra del ticket
no reproduce como está escrita.

---

## 2. Resoluciones adoptadas de los tres runs anteriores — sin cuarta lectura

El encargo ordena adoptar sus resoluciones de los huecos y no inventar una cuarta. Adoptadas sin
cambio, para que los veredictos sean comparables:

| Resolución | Origen | Cómo se aplica aquí |
|---|---|---|
| I-1 — el bloque de auditoría S3/S4 vive **en este record** | piloto §11.2 | §6 y §7 |
| I-2 — el packet de S7 va a `docs/_historical_run_record/`, nombre `<RUN_ID>-OPERATOR-QA-PACKET.md` | piloto §11.2 | §13 |
| I-3 — «suite completa» = la del **repo**; los 32 archivos del compilador sí se corren para verificar el 350 | piloto §11.2 | §14 |
| I-4 — responder las diez preguntas de S3 y de S4 marcando VACÍA con su razón, sin omitir | piloto §11.2 | §6 y §7 |
| La partición de las diez preguntas del contrato de color es **la del piloto** (*«editor, Preview Real y Generate Web»* = **una** pregunta con tres respuestas) | piloto §11.1, confirmada por `iconList` §4 y `card` §6 | §6 |
| Un defecto que el taller mide y ningún veredicto de QA nombra se trata como **pendiente de veredicto, anotado, no resuelto por criterio propio** | piloto §11.3(a), aplicada por `iconList` §8.2 y `card` §11.2 | §8 |
| `S8 = NA` / `DECLARED` no encaja en ninguno de los cinco veredictos; se declara `READY_FOR_OPERATOR_QA` **con reserva explícita** | piloto §11.3(b), `iconList` §13.1(b), `card` §11.1 | §3 y §11 |
| El «delta packet» de S7 no tiene criterio para saber qué antecede a un PASS; se deriva y **se declara que es derivación** | `iconList` §13.1(c) | §13 |
| S2 nombra «la rama del editor» y el control real puede vivir en otro sitio; hay que auditar el archivo delegado | `iconList` §13.1(a), precisado por `card` §15.1(a) | §5, capa «Editor, superficie de campos» |

**No se propone enmendar la Definition of Done.** §16 mide y reporta; enmendarla es del operador
y su ejecución es otro run.

---

## 3. La tabla de evidencia de la Definition of Done §7 — estructura verbatim

```
Component: video    Run: RUN-JAME-WEB-VIDEO-REVALIDATION-001 (queue_order 23)    Date: 2026-08-04

| Step | Measured against | Result | Evidence |
|---|---|---|---|
| S1 identity | .aiw/roadmap/roadmap.json | PASS | RUN-JAME-WEB-VIDEO-REVALIDATION-001 + "Audit and implement the Video component" |
| S2 state audit | catalog / schemas / compiler / renderer / fixture | PASS | §5, catorce capas citadas, cero UNKNOWN |
| S3 color audit | color contract Section 9 | PASS + COLOR_PALETTE_NOT_APPLICABLE | bloque en §6 de este record |
| S4 math audit | math contract Section 10 | PASS + MATH_FORMULA_NOT_APPLICABLE | bloque en §7 de este record |
| S5 columns placement | top-level + both slots | PASS | §9; top-level si, ambos slots RECHAZAN por contrato; blockCatalog.js:989, draftSchema.js:926-936 |
| S6 persistence | save/load + import | PASS | §10; ida y vuelta idempotente en los seis casos |
| S7 human qa | Section 6 boundary | PREPARED (delta) | docs/_historical_run_record/RUN-JAME-WEB-VIDEO-REVALIDATION-001-OPERATOR-QA-PACKET.md |
| S8 repair gate | reproduced QA defects | NA (ningun veredicto de QA nombra un defecto abierto) | §8; repair_status = BOUNDED_BEHAVIOR_ONLY_NO_NEW_WORK_THIS_ROUND |
| S9 packet | single-source contract | PASS | ningun packet ni Guide escrito; cinco discrepancias enrutadas en §11 |
| S10 registry + no-claims | docs_index + conflicts | PASS | §11; docs_index.json sin escribir; conflicto `list` intacto |

Verdict: READY_FOR_OPERATOR_QA  (con la reserva de §2: S8=NA convive con ocho defectos medidos y declarados)
Open decisions touched: none
```

---

## 4. Ejecución paso a paso de la Definition of Done — nada omitido en silencio

Los diez pasos, en su orden y con sus nombres. **Ninguno resultó BLOCKED.** Ninguno se omitió.

| Paso | Nombre en la DoD | Resultado | Dónde |
|---|---|---|---|
| S1 | Identity gate | PASS | §1 |
| S2 | Current-state audit | PASS | §5 |
| S3 | Color palette compatibility audit | PASS + `COLOR_PALETTE_NOT_APPLICABLE` | §6 — **no se declara NOT_APPLICABLE el paso**: el bloque de diez preguntas se ejecuta entero y la clase es la que sale |
| S4 | Math and formula compatibility audit | PASS + `MATH_FORMULA_NOT_APPLICABLE` | §7 — ídem, ocho de diez vacías con su razón |
| S5 | Columns placement check | PASS | §9 — **no aplica la excepción auto-referencial**, que es solo para `columns`. Aquí las dos colocaciones se registran y una de ellas es «rechazado por contrato» |
| S6 | Persistence roundtrip | PASS | §10 |
| S7 | Human QA | PREPARED (delta) | §13 — el taller **nunca** ejecuta QA humana |
| S8 | Repair gate | NA | §8 |
| S9 | Packet and Guide, both out of scope | PASS | §11 |
| S10 | No-claims | PASS | §11 |

**Los dos pasos de color y math salen NOT_APPLICABLE como CLASE, no como resultado del paso.**
Es la lectura que fijó «Tarjeta» en su §4 para S4 y aquí se aplica también a S3, que es la
novedad: **es el primer componente de la serie cuyo paso de color se resuelve no aplicable.** El
paso es PASS porque el bloque de diez preguntas se ejecutó completo, que es lo que la DoD exige
*«for every component regardless»*, y porque la clase se asignó y se justificó. **No se omitió
ningún paso de color: se ejecutaron y su respuesta fue "no hay superficie", con la medición que
lo sostiene.**

---

## 5. S2 — Auditoría de estado, con archivo y línea

Catorce capas. **Ninguna quedó en UNKNOWN.**

| Capa | Ruta y línea | Medición |
|---|---|---|
| Catálogo (metadatos) | `tools/author-lite/editor-ui/src/features/editor/constants/blockCatalog.js:72-77` | `label: 'Video'`, `category: 'basics'`, **`rail: true`**, `order: 110`. **Sin `disabled`** — es agregable |
| Catálogo (riel) | `.../blockCatalog.js:122-126` | Está en el grupo **«Básicos frecuentes»**, entre `visual` y el final de la lista |
| Catálogo (entrada de docs) | `.../blockCatalog.js:1081-1103` | `id: 'web-video'`, `action: 'video'`, `label: 'Video'`, `icon: 'Video'`. Su `jsonSchema` de ejemplo (`:1098`) documenta `kind/title/url/caption` — **coincide con el schema real** |
| Editor, top-level | `.../components/web/WebBlockEditor.jsx:4021-4022` | **Dos líneas** que delegan entero en `<VideoFields …>`; import en `:16` |
| Editor, hijo de columnas | — | **No existe rama de slot.** El bloque no es hijo válido de columnas; ver §9 |
| Editor, superficie de campos | `.../components/common/VideoFields.jsx:8-34` | **Todo el editor del bloque vive aquí**, 36 líneas, compartido con la superficie Slide. Tres `TextInputField`: **Título (opcional)**, **URL**, **Descripción (opcional)**. **Cero controles de color** |
| Editor, etiqueta de respaldo | `.../WebBlockEditor.jsx:404` | `if (block?.kind === 'video') return 'Video sin título';` |
| Schema editor-ui | `tools/author-lite/editor-ui/src/schemas/draftSchema.js:311-315` (`videoShape`), `:743-746` (`WebVideoSchema`), unión top-level `:971`, ítem Slide `:1009-1012` | `title` y `caption` `z.string().optional()` **a secas**; `url` obligatoria con `refine(parseVideoUrl)`. **El schema NO es `.strict()`** |
| Schema compiler-api | `.../compiler-api/schemas/draftSchema.js:314-318`, `:771-774`, unión `:999`, ítem Slide `:1037-1040` | **Idéntico.** Comparación ejecutada: `videoShape` y `WebVideoSchema` byte a byte iguales; `parseVideoUrl` idéntico salvo la palabra `export` |
| Validador de URL (schema) | `compiler-api/schemas/draftSchema.js:275-292` = `editor-ui/.../draftSchema.js:272-289` | Cinco expresiones regulares ancladas con `^…$`, id de YouTube de 11 caracteres `[A-Za-z0-9_-]`, id de Vimeo `(\d+)` **sin tope**, query que excluye `\s " ' < >` |
| Compilador | `.../compiler-api/services/compiler.js:335-340` (`buildVideoOutput`), normalización en `:291-300` (`normalizeVideoUrl`), `case 'video'` Web en `:1208-1209`, ruta Slide en `:1271-1272` | Escapa `title` y `caption`; **normaliza la URL a forma canónica** y lanza si no parsea. **No llama a `resolveVariantColorToken` ni a `buildColorRolesOutput`** |
| Renderer | `src/builders/web/partials/renderVideo.js:91-160`; su **propio** parser en `:23-68`; entrada alternativa en `:70-83`; `VIMEO_ID_RE` en `:4`; id aleatorio en `:100` | **Segunda implementación independiente** del validador de URL, con `new URL()` en vez de regex. Colores del bloque **fijos y no author-facing**: `#2E3440` (título), `#64748B` (pie), `#000` (fondo del marco) |
| Preview Real | `.../compiler-api/services/previewRenderer.js:155-180` | Carga **todos** los partials por nombre de archivo; `renderVideo.js` entra por alias `video`. **Preview Real y Generate Web usan el mismo renderer del motor** |
| Defaults | `.../utils/blockFactory.js:59-65` (Web top-level), `:332-338` (ítem Slide) | `title: 'Video'`, `url` sembrada con el video real del sandbox, `caption: ''`. **Ningún color, ninguna variante.** Las dos factorías difieren solo en `kind`/`type` y en el `title` (`'Video'` vs `''`) |
| Fixture sandbox | `src/content/sandbox/test_multimedia.js:27-32` (`DATA_VIDEO`), `:56` (Web), `:114` (Slide) | `title`, `url` de YouTube, `caption`. **Es el fixture compartido; ver §12** |
| Colocación en columnas (motor) | `src/builders/web/renderColumns.js` | **Sin ruta para `video`.** No hay `case 'video'` |

**Nota sobre `blockDefaults.js`:** el archivo existe y está **vacío, 0 líneas**, igual que
midieron los tres runs anteriores. Los defaults viven en `blockFactory.js`.

**Superficie Slide, medida y declarada, fuera del alcance de este run:** existe schema
(`SlideVideoItemSchema`), factoría (`blockFactory.js:332-338`), editor
(`SlideItemEditor.jsx:13`, `:59-61`, el **mismo** `VideoFields`) y ruta de compilador
(`compiler.js:1271-1272`), pero el desplegable de tipos de ítem lo ofrece **deshabilitado**:
`editorOptions.js:41`, `{ value: 'video', label: 'Video', disabled: true, disabledReason: CONTAINED_COMPONENT_REASON }`.
Se registra por completitud de S2 y **no se toca**: este run es Web.

### 5.1 Los dos schemas comparados entre sí — lo que S2 no pide

Los tres runs anteriores hicieron esta comparación aunque la Definition of Done no la ordena. Se
repite por comparabilidad. **Dos vías, y las dos limpias.**

**Vía 1 — comparación de texto.** `videoShape` y `WebVideoSchema` son **idénticos byte a byte**
entre los dos archivos, y `parseVideoUrl` lo es salvo la palabra `export`. Confirma el comentario
de `compiler-api/schemas/draftSchema.js:745-746`, que afirma que los schemas de
`iconList`/`visual`/`video` son idénticos entre los dos lados, y el de
`editor-ui/.../draftSchema.js:268`, que se declara *«Espejo exacto de parseVideoUrl en
compiler-api/schemas/draftSchema.js»*.

**Vía 2 — 46 casos ejecutados contra el schema de los dos lados** (38 formas de URL en §8.2 más
8 de texto). **Cero divergencias en las 92 comparaciones.**

**Una diferencia medida contra los tres componentes anteriores, y conviene fijarla:** aquí la
asimetría `.strict()` que declararon `list` e `iconList` **no se puede medir**, porque `video`
**no es hijo de columnas**: no existe la unión estricta contra la que compararlo. Un campo extra
se acepta top-level (`WebVideoSchema` no es `.strict()`) y no hay una segunda colocación donde
se rechace. El compilador construye su salida campo a campo, así que el extra nunca llega al
motor. Se declara, no se repara.

---

## 6. S3 — Color palette compatibility audit

Bloque obligatorio de diez preguntas del contrato de color §9, **con la partición del piloto**.
Se ejecuta entero, como la DoD exige *«for every component regardless»*. Las respuestas son
medición viva: compilación real contra dos paletas cuyos accents difieren, y render real.

**1. ¿Expone campos, variantes, estilos o tokens dependientes del color?** **No. Ninguno.** Las
claves del bloque son exactamente `kind`, `title`, `url`, `caption`
(`compiler-api/schemas/draftSchema.js:314-318`). No hay `variant`, ni `color`, ni `colorToken`,
ni `background`, ni `detailsVariant`. El editor no monta ningún control de color
(`VideoFields.jsx:8-34`, tres campos de texto). **Medición adicional**: los cuatro nombres de
campo de color que otros componentes usan se aceptan como **campo extra ignorado** —el schema no
es `.strict()`— y el compilador no los lee, así que nunca llegan al motor:

```
{"color":"#FF007F"}      -> ACEPTA (campo extra, no leido)
{"colorToken":"ctx"}     -> ACEPTA (campo extra, no leido)
{"variant":"ctx"}        -> ACEPTA (campo extra, no leido)
{"background":"#FF007F"} -> ACEPTA (campo extra, no leido)
```

**2. ¿Qué emite el compilador?** Con paleta A (`ctx = #123ABC`) y paleta B (`ctx = #ABC123`):

```
paleta A -> {"type":"video","title":"Math Antics: Orden de Operaciones","url":"https://www.youtube.com/watch?v=dAgfnK528RA","caption":"Introduccion visual a la jerarquia de operaciones."}
paleta B -> {"type":"video","title":"Math Antics: Orden de Operaciones","url":"https://www.youtube.com/watch?v=dAgfnK528RA","caption":"Introduccion visual a la jerarquia de operaciones."}
salida identica entre paletas : true
claves emitidas    : type, title, url, caption
emite clave color  : false | variant : false | surface/border/textColor : false
sin paleta activa  : identica a la de paleta A : true
```

**Identidad byte a byte, y cuatro claves.** `buildVideoOutput` (`compiler.js:335-340`) no recibe
ni consulta el contexto de paleta: el `case 'video'` (`:1208-1209`) llama al builder **sin pasar
`context`**, a diferencia de `card` (`:1136-1140`) o `list`. Es la fila del inventario,
`NO_COLOR_SURFACE`, verificada con compilación viva.

**3. ¿La paleta afecta correctamente al editor, a Preview Real y a Generate Web?** **A ninguno de
los tres, y es correcto.**

- **Editor: no**, porque no hay control de color que pudiera consumirla. `VideoFields` no recibe
  `palette` ni la pide (`WebBlockEditor.jsx:4021-4022` no le pasa `colorPalette`, a diferencia
  de `IconListFields` o `CardFields`). Corroboración estática: la lista
  `SHARED_SELECTOR_COMPONENTS` del test del selector unificado
  (`webSharedColorSelectorUnification.test.mjs:61`) enumera los componentes que comparten el
  control de color y **`video` no está entre ellos**.
- **Preview Real y Generate Web: no, y coinciden por construcción**, porque comparten
  `compileDraftToJameData`. Render medido con el motor real:

  ```
  hex en HTML A : #2E3440 #64748B
  hex en HTML B : #2E3440 #64748B
  HTML distinto entre paletas : false
  ```

  Los dos únicos hex del bloque son el del título y el del pie, **fijos en el renderer**
  (`renderVideo.js:120`, `:135`), más el `#000` del marco (`:130`). Ninguno es author-facing y
  ninguno depende de la paleta.

  **Aviso de medición, para que nadie lo lea mal:** el HTML **completo** de Preview Real sí
  cambia entre paletas, porque la hoja de estilos global de la página lleva los tokens
  (`previewRenderer.js`, `getBundledWebCss`). **La sección del bloque de video no.** Se mide el
  bloque, no la página.

**4. ¿Save/load e importación de Draft JSON preservan la selección?** **VACÍA — no hay selección
de color que preservar.** Lo que sí se preserva —la URL, el título y el pie— está medido en §10.

**5. ¿Se sostienen contraste y legibilidad?** **Sí, y por construcción no puede fallar por color
de autor.** Los tres colores del bloque son fijos: título `#2E3440` sobre el fondo de la página,
pie `#64748B`, y el marco del video `#000` detrás de un iframe opaco. **El autor no puede
elegir ninguno**, así que no existe la clase de defecto que «Lista con etiquetas» (blanco fijo
sobre fondo de autor) y «Tarjeta» (badge sólido y avatar) declararon. Es la respuesta más
sencilla de las cuatro dadas hasta ahora, y lo es por ausencia de superficie, no por diseño
defensivo.

**6. ¿Funciona top-level?** **Sí**, y es su única colocación. Medido arriba y en §9.

**7. ¿Funciona dentro de los slots de columnas sin romper legibilidad?** **NO APLICA, y la razón
es contractual, no de color.** `video` no es hijo válido de «Dos columnas» en ninguna de las dos
uniones de schema. Medición completa en §9. La invariancia de alcance de las opciones de color
del contrato §7 **no se puede violar aquí porque no hay opciones de color en ninguna
colocación**.

**8. ¿Qué pasa con un token que la paleta activa no define?** **La pregunta no aplica por
construcción, y esa es la respuesta.** Este bloque no almacena ids de token ni hex. No hay
resolución de token en tiempo de compilación, así que **ni el orden de resolución del contrato
§4 ni la divergencia DIV-4 del piloto** —el id fuera de paleta que cae al token por defecto del
mismo id, reproducida por `iconList` y por `card`— **tocan a este componente**. No hay caída a
`ctx` en ninguna parte del camino.

**9. ¿Qué pasa sin paleta activa, y con un draft legacy?** Sin paleta activa la salida compilada
es **idéntica** (medido arriba). Un draft legacy sin ninguna clave de color es exactamente un
draft normal, porque el bloque nunca tuvo claves de color: no hay respaldo que ejercitar. Nada
se rompe.

**10. ¿Qué límites y variantes debe documentar el packet del componente?** **Ninguno de color.**
Lo que sí debe documentar, y hoy no documenta ningún texto author-facing, es la superficie de la
URL: qué formas se aceptan, cuáles se rechazan y **qué se descarta en silencio al normalizar**
(§8.2). Es el contenido de los checks 6 a 12 del packet de §13.

**Clase asignada: `COLOR_PALETTE_NOT_APPLICABLE`.**

Justificación. El contrato la define como *«No color, variant, or token surface at all»* y las
tres partes se cumplen literalmente: cero campos de color, cero variantes, cero tokens, en
catálogo, editor, los dos schemas, compilador y motor. Descartada
`COLOR_PALETTE_VARIANT_OR_TOKEN_ONLY` —la clase de `list` y `card`— porque exige *«a single
discrete color control»* y aquí no hay ninguno. Descartada `DIRECT_SUPPORT_REQUIRED` —la de
`iconList`— porque el color no porta contrato visible: no hay color que porte nada. Descartada
`CONDITIONAL_OR_BOUNDED` porque no hay caso acotado en que el color aplique. Descartada
`REQUIRES_FOLLOWUP` porque la ausencia **sí está formalizada**: el inventario la registra como
`NO_COLOR_SURFACE` y la DoD §5 la fija en su fila.

**Los pasos de color se resuelven no aplicables, y esta sección es la justificación de por qué.
No se omitió ninguno.**

---

## 7. S4 — Math and formula compatibility audit

El bloque de diez preguntas del contrato de math §10 se ejecuta **para todo componente**. Para
`video` la fila §5 de la DoD dice `none` en math, y ocho de las diez resultan vacías. Se
responden igual y se declara cuáles son vacías y por qué — resolución I-4.

**1. ¿Expone algún campo de math o fórmula?** **No.** Las cuatro claves del bloque son `kind`,
`title`, `url`, `caption` (`compiler-api/schemas/draftSchema.js:314-318`). Confirmado por el
contrato de math §5, que lista `video` explícitamente entre los nueve sin campo de math, y por
el inventario §4, que lo pone entre «the other ten».

**2. ¿Qué superficie de entrada usa cada campo?** VACÍA — no hay campo de math.

**3. ¿Ofrece el editor visual de fórmulas o una entrada de texto plano?** **Ninguno de los dos.**
El campo visual se monta solo para `kind === 'rule'` (contrato de math §8). Medido en
`VideoFields.jsx:8-34`: tres campos de texto, ninguno de fórmula.

**4. ¿El compilador emite delimitadores, y de quién son?** VACÍA — nada que delimitar.

**5. ¿Un delimitador autorado se elimina o se duplica?** **Ni una cosa ni la otra: sobrevive
intacto.** No es una respuesta vacía y por eso se separa de las demás. Medido: un `\(x^2\)`
escrito en el **título** se escapa como HTML —lo que no toca la barra invertida— y llega al DOM
tal cual. Ver la pregunta 6.

**6. ¿El HTML renderizado produce salida KaTeX?** **Medido, y la respuesta no es un simple "no".**

```
titulo autorado    : \(x^2\)
compilado          : "\\(x^2\\)"
div del titulo     : "\\(x^2\\)"
Preview Real llama renderMathInElement(document.body) : true
el par \( \) sobrevive dentro del div del titulo en Preview Real : true
```

El par de delimitadores **llega al DOM**, y Preview Real y Generate Web ejecutan
`renderMathInElement(document.body)` sobre **toda** la página
(`previewRenderer.js:14`; contrato de math §6, *«Auto-render, not per-node rendering»*). Un
componente sin ningún campo de math puede por tanto mostrar una fórmula tipografiada si el autor
escribe delimitadores en el título o en el pie. **Este run no ejecuta JavaScript**, así que
mide lo que puede medir: el par llega al DOM y el auto-render corre sobre el body. El check 15
del packet le pide al operador que reporte qué ve.

**Acotación deliberada:** el mecanismo es global, no de este componente, así que **es probable
que no sea específico de `video`** — pero este run mide `video` y **no afirma nada sobre los
demás componentes**, que están fuera de alcance. Se declara como hueco de procedimiento en
§16.1(c).

**7. ¿Save/load e importación preservan la fórmula?** VACÍA — no hay fórmula. La preservación de
los campos de texto está en §10.

**8. ¿Funciona dentro de los slots de columnas?** VACÍA en cuanto a math; y además el bloque no
es hijo de columnas (§9).

**9. ¿Qué límites de longitud y forma debe documentar el packet?** VACÍA para math. Medición
colateral que sí importa: **`title` y `caption` no tienen tope de longitud**. Un título de 5 000
caracteres se acepta y se compila entero. Los seis componentes con math sí tienen topes (160 a
1 024 según el contrato §4); este no tiene ninguno porque no tiene math **ni** guardias de texto.

**10. ¿Qué texto de fallo ve el autor cuando se rechaza una fórmula?** VACÍA — no hay fórmula que
rechazar. El único mensaje de rechazo del componente es el de la URL, medido en §8.2.

**Clase asignada: `MATH_FORMULA_NOT_APPLICABLE`.** Cero superficies de math en schema, editor,
compilador y renderer, coincidiendo con la fila §5 de la DoD, con el contrato de math §5 y con
el inventario §4.

---

## 8. S8 — LA COMPUERTA DE REPARACIÓN, Y LA LISTA DE DEFECTOS MEDIDOS **ANTES** DE TOCAR NADA

### 8.1 El estado de QA registrado, y su reproducción

La Definition of Done §6 coloca `video` en la fila **`EXPLICIT_HUMAN_PASS_PRESERVED`**, junto con
`iconList` y `card`. Es un **PASS**. La proyección (`.aiw/state/component_status.json`, entrada
`video`) registra:

```
human_qa_status : "EXPLICIT_HUMAN_PASS_PRESERVED"
repair_status   : "BOUNDED_BEHAVIOR_ONLY_NO_NEW_WORK_THIS_ROUND"
docs_status     : "HUMAN_QA_PACKET_READY_COMPONENT_QA_APPROVED_FROM_HUMAN_QA"
blocked_by      : ["not_authorized_as_next_component", "no_web_global_certification_gate", "no_generator_safe_global_claim"]
```

**Ningún veredicto de QA humana nombra un defecto abierto para este componente.** El
`repair_status` dice literalmente que no hay reparación pendiente en esta ronda. La reparación
histórica que sí existió —la de seguridad del iframe,
`PASS-FUTURE-WEB-COMPONENT-VIDEO-IFRAME-SECURITY-REPAIR-001`— se reprodujo igualmente, porque S8
exige reproducir antes de cualquier otra cosa:

| Ítem del historial | Reproducción | Evidencia |
|---|---|---|
| Fail-closed ante URL/plataforma/id inválidos | **REPARADO, sigue reparado** | `renderVideo.js:94-96` devuelve `''`; medido para las 17 formas hostiles de §8.2 |
| Sin `embed/undefined` | **REPARADO, sigue reparado** | `buildEmbedSrc` (`:85-89`) solo se llama con un id ya validado |
| Escapado de `title`/`caption` en el motor | **REPARADO, sigue reparado** | `renderVideo.js:9-14`, `:102-108`; medido sin doble escapado |
| `sandbox`, `referrerpolicy`, `allow` mínimo | **REPARADO, sigue reparado** | `renderVideo.js:5-7`, `:151-153`; sin `accelerometer`, `gyroscope`, `clipboard-write`, `autoplay`, `picture-in-picture` |
| `video` fuera de `columns` | **SIGUE FUERA** | §9 |

Los cinco están además asegurados por `webVideoIframeSecurity.test.mjs`, en verde (§14).

**Resultado S8: NA.** Y esa etiqueta **describe mal el estado real**, porque el taller sí midió
ocho defectos. Es el hueco (b) que `iconList` declaró en su §13.1 y `card` reconfirmó; se adopta
su lectura y no se inventa una cuarta.

### 8.2 LA MEDICIÓN DE LA URL — qué acepta, qué rechaza, qué sanea y qué deja pasar

**Es la pregunta de seguridad de este componente y ninguno de los tres anteriores la planteaba.**
38 formas de URL, ejecutadas contra los dos schemas, el importador de Draft JSON, el compilador y
el motor. **Se mide y se reporta; no se endurece nada.**

**Hay tres validadores de URL, no uno**, y es el hecho estructural del componente:

| Validador | Dónde | Forma |
|---|---|---|
| 1. El de los schemas | `draftSchema.js:275-292`, idéntico en los dos lados | Cinco regex ancladas `^…$` |
| 2. El del compilador | `compiler.js:291-300` | **Reutiliza el 1**, y además **reescribe** la URL a forma canónica |
| 3. El del motor | `renderVideo.js:23-68` | **Implementación distinta**: `new URL()`, comprobación de host y de segmentos de path |

**(a) Lo que ACEPTA por la ruta de Author Lite** — 16 de 38, todas normalizadas:

| Forma que escribe el autor | URL compilada | `src` del iframe |
|---|---|---|
| `https://www.youtube.com/watch?v=<id>` | `https://www.youtube.com/watch?v=<id>` | `https://www.youtube.com/embed/<id>` |
| `https://youtube.com/watch?v=<id>` (sin `www`) | ídem canónica | ídem |
| `https://m.youtube.com/watch?v=<id>` | ídem canónica | ídem |
| **`http://`** (sin TLS) | **reescrita a `https://`** | ídem |
| `https://www.youtube.com/embed/<id>` | reescrita a la forma `watch` | ídem |
| `https://youtu.be/<id>` | reescrita a la forma `watch` | ídem |
| `…watch?v=<id>&t=42` | **`…watch?v=<id>`** — la marca de tiempo desaparece | sin `t` |
| `…watch?v=<id>&list=PL…&index=2` | **`…watch?v=<id>`** — la lista desaparece | sin lista |
| `…watch?v=<id>#t=1m` | **`…watch?v=<id>`** — el fragmento desaparece | sin fragmento |
| `https://vimeo.com/<dígitos>` | ídem canónica | `https://player.vimeo.com/video/<dígitos>` |
| `https://www.vimeo.com/<dígitos>` | reescrita sin `www` | ídem |
| `https://player.vimeo.com/video/<dígitos>` | reescrita a `https://vimeo.com/<dígitos>` | ídem |
| **`https://vimeo.com/<dígitos>?h=abcdef1234`** | **`https://vimeo.com/<dígitos>`** — el hash desaparece | **sin `h`** |
| `   …espacios alrededor…   ` | recortada | ídem |

**(b) Lo que RECHAZA** — 21 de 38. Rechazan **los dos schemas, el importador de Draft JSON, el
compilador, Preview Real y Generate Web**, con el mismo mensaje
*«Solo se permiten URLs de YouTube o Vimeo en formato estándar»* en el schema y
*«[Compiler] URL de video no permitida…»* en el compilador:

- **Hostiles (11):** `javascript:alert(1)`; `data:text/html,<script>…`; `srcdoc=<script>…`;
  `<iframe src=…>` crudo; `<embed src=…>` crudo; `<script>…` crudo;
  `https://vimeo.com/123456789" onload="alert(1)`; proveedor externo `https://example.test/…`;
  **typosquat `https://youtube.com.evil.test/watch?v=<id>`**; **subdominio falso
  `https://evil.youtube.com/…`**; **userinfo `https://www.youtube.com@evil.test/…`**;
  `file:///etc/passwd`.
- **Malformadas (4):** id de YouTube de menos de 11 caracteres; segmento extra tras el id
  (`/embed/<id>/extra`); id de Vimeo no numérico; URL vacía.
- **Legítimas pero fuera del conjunto acotado (6):** `youtube.com/shorts/<id>`;
  `youtube.com/live/<id>`; `youtube-nocookie.com/embed/<id>`;
  `vimeo.com/channels/<canal>/<id>`; URL sin protocolo (`www.youtube.com/watch?v=<id>`);
  **`…watch?list=PL1&v=<id>`, con `v=` no primero en la query**.

**(c) Lo que SANEA.** Todo lo aceptado se **reescribe**, no se pasa: el compilador reconstruye la
URL desde `platform` e `id`, así que **nada de lo que el autor escribió después del id
sobrevive**. El motor la reescribe otra vez a la dirección de embed. La superficie de inyección
por la URL queda reducida a un id de 11 caracteres `[A-Za-z0-9_-]` o a dígitos. `title` y
`caption` se escapan **dos veces**, en el compilador y en el motor, sin doble escapado visible
(medido y asegurado por test).

**(d) Lo que DEJA PASAR — y aquí están los dos hallazgos:**

1. **Un id de Vimeo de más de 32 dígitos.** El schema lo acepta (`(\d+)` sin tope) y el
   compilador lo emite; el motor lo rechaza (`VIMEO_ID_RE = /^\d{1,32}$/`, `renderVideo.js:4`) y
   **devuelve cadena vacía**. Medido:

   ```
   https://vimeo.com/9999999999999999999999999999999999999999
     schema/compilador = ACEPTA -> emite https://vimeo.com/9999…
     motor             = VACÍO — descarta lo que el compilador emitió
   ```

   **El autor obtiene un hueco en blanco sin ningún error en ninguna capa.** Es D1.

2. **El motor es más permisivo que el schema en dos formas**, solo alcanzables llamándolo desde
   fuera de Author Lite: host en mayúsculas (`https://WWW.YOUTUBE.COM/watch?v=<id>`, el motor
   normaliza el host a minúsculas y el schema no) y `v=` no primero en la query (el motor usa
   `searchParams.get('v')` y el schema exige `watch?v=` inmediato). Las dos **rinden** por la vía
   directa del motor y **se rechazan** por la vía de Author Lite. Es parte de D3.

**Ninguna de estas mediciones se ha convertido en un cambio.** El criterio 5 del encargo lo
prohíbe explícitamente —*«medir sí, cambiar no»*— y S8 no da autorización.

**Juicio explícito, porque el encargo lo pide:** ninguno de los dos hallazgos es una brecha de
seguridad. El perímetro hostil aguanta las once formas probadas por **cinco** capas
independientes, y las dos permisividades del motor **no son alcanzables desde el editor**. D1 es
una pérdida silenciosa, no una ejecución de código. **Por eso no se dispara PARA Y REPORTA por
la medición de la URL**: no hay nada que a mi juicio no deba esperar a un veredicto.

### 8.3 LOS DEFECTOS MEDIDOS — ocho, ninguno reparado

Por la cláusula *«An observation made by the workshop itself is a measurement to declare, never a
repair authorization»*, y aplicando la resolución del piloto —**pendiente de veredicto, anotado,
no resuelto por criterio propio**—, **los ocho van al operador y ninguno se tocó**:

| # | Defecto medido | Dónde | Por qué NO se reparó |
|---|---|---|---|
| **D1** | **Un id de Vimeo de más de 32 dígitos pasa los dos schemas y el compilador, y el motor lo descarta: salida en blanco, sin error en ninguna capa.** Los topes de los dos validadores no coinciden | `compiler-api/schemas/draftSchema.js:283` y su espejo `editor-ui:281`, contra `renderVideo.js:4` | Sin veredicto de QA. Y tocar el schema **cambiaría el contrato de un componente con PASS humano preservado**. Es el check 12 del packet |
| **D2** | **`title` y `caption` no pasan por guardias de texto seguro**, a diferencia de `narrative` o `card`, que **rechazan**. Medido: `<script>` se acepta en el schema y se escapa dos veces | `draftSchema.js:315`, `:317` | Sin veredicto de QA. La salida es segura por escapado. **Es el mismo D1 del piloto y el D5 de «Lista con etiquetas» en un tercer componente**; medido además que `visual` comparte la forma. Check 14 |
| **D3** | **El packet canónico atribuye el rechazo al motor, y hay dos validadores distintos con perímetros distintos.** `VIDEO.md:16` dice *«The engine parses the URL and accepts only standard forms; anything else is refused»*. Medido: quien rechaza en la ruta de Author Lite es el **schema**; el motor tiene su propia implementación, más permisiva en dos casos y más estricta en uno | `docs/components/web/VIDEO.md:16` contra `draftSchema.js:275-292` y `renderVideo.js:23-68` | **S9 prohíbe a un run de componente escribir el packet** |
| **D4** | **El compilador descarta la query en silencio**: marca de tiempo `&t=`, lista `&list=`, y el **hash `?h=` de un Vimeo no listado**, que es lo que permite reproducirlo. El draft conserva lo que el autor escribió; el iframe no lo lleva | `compiler.js:291-300` | Sin veredicto de QA, y **decidir si la marca de tiempo debe conservarse es una decisión de producto del operador**, no una reparación. Checks 6, 7 y 8 |
| **D5** | **Ningún texto author-facing dice qué formas de URL se rechazan.** Medido rechazadas y perfectamente legítimas: `shorts`, `live`, `youtube-nocookie`, canal de Vimeo, y URL sin protocolo. El mensaje dice *«formato estándar»* sin decir cuál es | `VIDEO.md`, `blockCatalog.js:1099` | Ídem D3: es texto author-facing, S9 y el carril `DOCUMENTATION`. Check 10 |
| **D6** | **El motor lee tres campos que ningún schema puede producir**: `data.platform` y `data.id` (`renderVideo.js:70-83`), que son **una vía de entrada alternativa completa** que se salta la URL, y `data.textScale` (`:99`). El contrato archivado los documenta (`WEB_AUTHOR_FACING_CONTRACTS.md:285`); el packet canónico no | `renderVideo.js:70-83`, `:99` | Sin veredicto de QA, y **exponerlos sería ampliar el componente**, que el criterio 5 prohíbe. **`textScale` es el cuarto componente seguido con el mismo campo huérfano** (`list`, `iconList`, `card`, `video`) |
| **D7** | **El motor produce un HTML distinto en cada llamada con el mismo dato.** `const componentId = \`j-video-${Math.random()…}\``. Medido: dos renders del mismo bloque compilado dan `j-video-jx2wapym3` y `j-video-40eckeq35`. **Tres de los veintidós partials** lo hacen (`renderVideo`, `renderNarrative`, `renderVisual`). Usa además `String.prototype.substr`, deprecado | `renderVideo.js:100` | Sin veredicto de QA, y toca **JAME Core**, que `CLAUDE.md` regla 7 protege sin instrucción explícita. No es fallo funcional; impide cualquier aserción byte a byte |
| **D8** | **Dos punteros muertos en el packet canónico** — ver §11.2 | `docs/components/web/VIDEO.md` | S9 |

**Ninguno de los ocho es reparable en esta pasada.** D3, D5 y D8 por regla explícita de S9; D4 por
ser decisión de producto del operador; D6 por ampliar; D7 por tocar el motor Core; D1 y D2 por
falta de autorización de QA — y **D1 es el más consecuente**, porque produce una pérdida
silenciosa que ningún test cubre hoy.

**Y una cosa que NO es defecto, medida y declarada para que no se busque:** el packet canónico
afirma en `VIDEO.md:52-53` que solo se aceptan URLs estándar de YouTube y Vimeo y que el embed
corre en un iframe con sandbox. **Las dos son verdad** (§8.2). No se hereda ningún defecto de los
records anteriores en ese punto.

---

## 9. S5 — Colocación en columnas

**`video` NO es hijo válido de «Dos columnas», y esa es su medición completa.** Las dos
colocaciones quedan registradas, que es el criterio de salida del paso:

| Colocación | Resultado | Evidencia |
|---|---|---|
| Top-level | **Funciona** | Unión `WebBlockSchema`: `compiler-api:999`, `editor-ui:971`. Compilación y render medidos en §6 |
| Slot izquierdo de columnas | **RECHAZA** | `WebColumnsChildSchema` (`compiler-api:926-936`, `editor-ui:898-908`) no incluye `WebVideoSchema` |
| Slot derecho de columnas | **RECHAZA** | Ídem, es la misma unión para los dos slots |

Medición viva, las dos vías:

```
compiler-api acepta video como hijo de columnas : false
editor-ui   acepta video como hijo de columnas : false
mensaje compiler-api : webBlocks.0: Invalid input
motor renderColumns produce <iframe> para un video : false
motor renderColumns cae a volcado JSON            : true
```

**Es coherente en las cinco superficies:** el catálogo lo declara —*«Top-level-only en Phase 2:
video, arithmetic, hierarchy, timeline»*, `blockCatalog.js:989`—, el menú de hijos no lo ofrece
(`WebBlockEditor.jsx:253-262`, `COLUMN_CHILD_OPTIONS`, no lo lista), no hay rama de editor en slot, las dos uniones lo
rechazan, y `renderColumns.js` no tiene ruta para él. La matriz de certificación lo confirma en
su fila de `columns` (`:189`) y el packet canónico también (`VIDEO.md:11`, `:35`).

**El motor, si se le fuerza un hijo `video`, cae a un volcado JSON** —`"type":"video"` visible en
el HTML, sin iframe—. Es comportamiento preexistente del motor para cualquier hijo no soportado
y el test lo asegura como intencionado (`webVideoIframeSecurity.test.mjs:239-240`). Se registra;
no es de este componente y no se toca.

**Comportamiento de math en slots (contrato de math §10):** NOT_APPLICABLE por partida doble, sin
campo de math y sin colocación en slot.

**Resultado S5: PASS.** Ambas colocaciones registradas. **No es NOT_APPLICABLE**: la excepción
auto-referencial de la DoD es exclusiva de `columns`, y aquí hay dos colocaciones que medir, una
de las cuales es «rechazado por contrato», que es un resultado, no una ausencia de resultado.

---

## 10. S6 — Ida y vuelta de persistencia

Parseando dos veces por el schema del compilador, los seis casos que el componente admite:

```
completo               | 1a: {"kind":"video","title":"Math Antics: Orden de Operaciones","url":"https://www.youtube.com/watch?v=dAgfnK528RA","caption":"Introduccion visual a la jerarquia de operaciones."}
                       | idempotente: true | url del draft = url compilada: true
sin title              | 1a: {"kind":"video","url":"https://youtu.be/dAgfnK528RA","caption":"c"}
                       | idempotente: true | url del draft = url compilada: false
sin caption            | 1a: {"kind":"video","title":"t","url":"https://vimeo.com/123456789"}
                       | idempotente: true | url del draft = url compilada: true
solo url               | 1a: {"kind":"video","url":"https://player.vimeo.com/video/123456789"}
                       | idempotente: true | url del draft = url compilada: false
url con query          | 1a: {"kind":"video","url":"https://www.youtube.com/watch?v=dAgfnK528RA&t=42"}
                       | idempotente: true | url del draft = url compilada: false
title/caption vacios   | 1a: {"kind":"video","title":"","url":"https://youtu.be/dAgfnK528RA","caption":""}
                       | idempotente: true | url del draft = url compilada: false
```

**Los seis idempotentes.** Dos lecturas que conviene separar:

- **El draft conserva la URL exactamente como el autor la escribió.** No se normaliza al guardar;
  la normalización ocurre solo al compilar. Es la misma regla que el contrato de color §3 fija
  para las referencias de color —guardar lo autorado, resolver al compilar— aplicada a otra
  clase de valor. **Es correcto y es lo que el check 9 del packet confirma.**
- **Una cadena vacía en `title` o `caption` se conserva en el draft y no emite clave al
  compilar** (`buildVideoOutput` usa `...(src.title ? … : {})`). No produce elemento vacío en el
  render. Check 4 del packet.

La importación de Draft JSON está medida en §8.2: acepta y rechaza exactamente igual que el
schema, en las 38 formas.

**Resultado S6: PASS.**

---

## 11. S9 y S10 — Lo que este run deliberadamente NO escribió

### 11.1 S9 — PASS

No se escribió `docs/components/web/VIDEO.md` ni ninguna fuente del Component Guide. Las
discrepancias del packet (D3, D5, D8) quedan **registradas y enrutadas**, no reparadas.

**Una nota que los tres runs anteriores no podían dar.** `iconList` y `card` declararon que «no
tienen contenido inline propio» en el Component Guide. **`video` tampoco lo tiene —el Guide lleva
inline solo `listGuide`, `headerGuide` y `columnsGuide`— pero sí está NOMBRADO dentro de uno
protegido**: `columnsGuide` cita `video` dos veces, en
`ComponentGuide.jsx:310` (*«Quieres insertar componentes top-level-only como video, arithmetic,
hierarchy o timeline»*) y en `:509`. Ese archivo está bajo
`tools/author-lite/scripts/checkComponentGuideTextIntegrity.cjs`, cuya lista de archivos
protegidos (`:6-9`) incluye `ComponentGuide.jsx` **y** `blockCatalog.js`. **Es superficie
congelada y no se tocó**, ni siquiera para corregir la ausencia de tilde. Se declara porque un
run posterior que quisiera documentar la restricción top-level buscaría ahí.

### 11.2 Los dos punteros muertos del packet canónico

Verificados en disco, dentro de `docs/components/web/VIDEO.md`:

| Puntero | Líneas | Estado | Ruta real |
|---|---|---|---|
| `docs/REFERENCE-DRAFT-JSON.md` | 26, 48 | **NO EXISTE** | `docs/reference/REFERENCE-DRAFT-JSON.md` |
| `docs/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` | 12, 64-65 | **NO EXISTE** | `docs/archive/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` |

**Son los mismos dos punteros que el piloto declaró en `LIST.md`, `iconList` en `ICON-LIST.md` y
«Tarjeta» en `CARD.md`. Cuarto packet con la misma pareja.** Deriva conocida, fuera de alcance por
el encargo y por S9. Se registran y se enrutan.

### 11.3 S10 — PASS

`.aiw/docs/docs_index.json` **no se editó**: la DoD se lo llevó con S9 al carril `DOCUMENTATION`.
Su entrada de `docs/components/web/VIDEO.md`, con `freshness: "produced_2026-07-12"` y
`operator_review_status: "pending"`, **queda intacta**. Conflictos y no-claims verificados:

- `component_status.json` → `source_conflicts[0].conflict_id = "component-list-status-agents-vs-matrix-phase2"`,
  con `resolution: "PRESERVE_AS_DOCUMENTATION_CONFLICT_NOT_CERTIFICATION"`. **Sin tocar.**
- La entrada `video` de la proyección, con sus siete campos de estado, sus tres `blocked_by` y su
  `follow_up_required`. **Sin tocar**, incluida la afirmación vencida de DIV-6.
- `global_no_claims` completo. **Sin tocar.**
- El puntero de estado del packet canónico, con sus punteros muertos declarados en §11.2. Sin
  tocar.
- La nota de no-claims de la matriz para `video` (`:192`, `:321`), que dice explícitamente que el
  PASS humano **no certifica** Web global, docs, Slide, Generator-safe ni Column-compatible.
  **Preservada verbatim.**

---

## 12. EL FIXTURE COMPARTIDO CON «LISTA CON ETIQUETAS» — identificado, nombrado, intacto

**Identificado: `src/content/sandbox/test_multimedia.js`.** Es un **fixture de sandbox**, no un
archivo `*.test.mjs`, y esa precisión importa: **ningún archivo de test comparte `video` con
`iconList`**. Medición ejecutada sobre los 32 archivos de `tools/author-lite/compiler-api/tests/`:

```
webColorSelectorCustomPicker.test.mjs                    iconList=10  video=0
webColumnsChildExpansionSafety.test.mjs                  iconList=0   video=1
webIconListBadgeWidth.test.mjs                           iconList=3   video=0
webLegacyCertifiedColorPaletteReconciliation.test.mjs    iconList=2   video=0
webVideoIframeSecurity.test.mjs                          iconList=0   video=27
```

**Cero archivos de test con los dos.** El único artefacto compartido es el fixture de sandbox, y
es exactamente el que el record de «Lista con etiquetas» anticipó en su §13.3, fila 1, avisando
de que el run de «Video» —`queue_order` 23— lo citaría y podría editarlo. La matriz de
certificación lo registra igual (`:145`): `test_multimedia.js` → `list`, `iconList`, `visual`,
`video`.

**Lo que ese fixture afirma de «Lista con etiquetas»**, y que este run **no ha tocado**:

| Línea | Contenido | De quién es |
|---|---|---|
| `:34-39` | `DATA_PEMDAS`, cuatro ítems con `badge`, `color` hex literal, `title`, `text` | **`iconList`** — es la evidencia de S2 de su record |
| `:50` | `{ type: 'list', title: "Características", items: [...] }` | `list` |
| `:51` | `{ type: 'iconList', title: "Jerarquía PEMDAS", items: DATA_PEMDAS }` | **`iconList`** |
| `:55` | `{ type: 'visual', ...DATA_SVG }` | `visual` (`queue_order` 35, `planned`) |
| `:27-32`, `:56`, `:114` | `DATA_VIDEO` y sus dos usos, Web y Slide | **`video`** — este run |

**No se tocó el archivo.** Ni una línea, ni las de `video`. **No se rompió ninguna aserción
ajena**, porque no se escribió en él. La condición de PARA Y REPORTA asociada —*«si tocarlo
obligara a cambiar lo que ese fixture afirma de Lista con etiquetas»*— **no se disparó**, y no
por suerte: **ningún defecto se reparó**, así que ninguna reparación necesitaba tocarlo.

**Aviso medido para quien venga después**: si el operador autoriza reparar D1, la reparación vive
en los dos `draftSchema.js`, no en este fixture. Pero el run de **«Recurso visual»** (`visual`,
`queue_order` 35, `planned`) sí cita este mismo archivo como su evidencia de S2, y comparte con
`video` algo más: el mismo comentario de schema (`compiler-api:745-746`) los agrupa con
`iconList` como los tres «componentes nuevos» de schemas idénticos, y **`visual` tiene la misma
ausencia de guardias de texto en `title`/`caption`** (medido: acepta `<script>` igual que
`video`). Se declara para que ese run no lo lea como hallazgo propio.

---

## 13. S7 — El packet de QA para el operador

**Ruta:**
`projects/cantu-studio/docs/_historical_run_record/RUN-JAME-WEB-VIDEO-REVALIDATION-001-OPERATOR-QA-PACKET.md`

Colocado junto a los packets de operador ya existentes en ese directorio —había **ocho**;
con este, **nueve**—, siguiendo la resolución I-2 del piloto. **`.aiw/docs/docs_index.json` no se
tocó.**

Es un **packet DELTA**, porque la DoD §6 lo ordena para la fila `EXPLICIT_HUMAN_PASS_PRESERVED`.
**Y su delta es distinto al de los tres anteriores**, por lo que mide §6:

- Los dos runs que movieron superficies compartidas bajo todos los componentes —el selector
  unificado (16) y la paleta del autor en compilador y motor (19)— **no alcanzan a este bloque**.
  Así que la mitad de color del delta **no es una lista de cosas que recomprobar: son dos checks
  que confirman que el bloque está fuera del sistema de color** (checks 2 y 3), y el check 2
  lleva escrito **«STOP AND REPORT»** en su columna de fallo, porque un fallo ahí contradiría la
  medición central de este run.
- La otra mitad del delta **es la URL**: la superficie que este componente tiene y los tres
  anteriores no, que ningún veredicto de QA nombra con este detalle, y donde está todo lo que se
  midió.

**Dieciséis checks**, cada uno con **qué abrir, qué introducir, qué generar, qué se espera ver y
qué significaría que fallara**, más una columna de veredicto vacía. **Siete de los dieciséis son
pasos con URLs de distinta forma** (checks 6 a 12), como el criterio 7 del encargo exige: formas
aceptadas y normalizadas, formas aceptadas con pérdida silenciosa, formas legítimas rechazadas,
formas hostiles, y la que produce salida en blanco.

**La derivación del delta se declara como derivación**, no como lectura del documento, por el
hueco (c) que «Lista con etiquetas» dejó abierto: nada registra qué superficies antecede un PASS
dado.

**Etiquetas de plataforma usadas en el packet, todas derivadas del catálogo, ninguna inventada:**

| Superficie mencionada | Etiqueta | Origen |
|---|---|---|
| `video` | **«Video»** | `blockCatalog.js:73` y `:1083` |
| `columns` | **«Dos columnas»** | `blockCatalog.js:13` |
| `visual` | **«Recurso visual»** | `blockCatalog.js:67` |
| `list` | **«Lista»** | `blockCatalog.js:31` |
| `iconList` | **«Lista con etiquetas»** | `blockCatalog.js:37` |
| `card` | **«Tarjeta»** | `blockCatalog.js:49` |
| Grupo del riel | **«Básicos frecuentes»** | `blockCatalog.js:124` |

**Medición del catálogo, porque el encargo advierte de superficies sin entrada:** los
**diecisiete** componentes Web tienen etiqueta en `WEB_COMPONENT_UI` (`blockCatalog.js:11-113`) y
entrada de docs; **ninguno falta**, y las entradas de docs son **veinte**, las diecisiete Web más
tres de Slide. **Lo que sí carece de etiqueta de plataforma son las piezas de código que este
record nombra** —`blockFactory.js`, `VideoFields.jsx`, `parseVideoUrl`, `renderVideo.js`—: son
código, no componentes author-facing, **no tienen etiqueta y no se les inventa ninguna.** Es la
misma medición que hizo «Tarjeta» y contradice la cifra del ticket (§1.2(c)).

---

## 14. Tests

**No se tocó ningún archivo de código, schema, renderer ni test.** Los tests se corrieron como
medición, que es el estatus que la DoD §6 les da: *«A workshop that chooses to run a relevant test
file records the result as a measurement in its evidence table […] it is never a substitute for
the S7 packet and never a repair authorization.»*

### 14.1 Verificación de la cifra de la suite del compilador

La cifra del encargo era 350. **Verificada, no dada por buena** — los 32 archivos de
`tools/author-lite/compiler-api/tests/`:

```
node --test tools/author-lite/compiler-api/tests/*.test.mjs

ℹ tests 350
ℹ suites 0
ℹ pass 350
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 1751.9247
```

**350 de 350. Exacta.** Nada verde se puso rojo.

### 14.2 Los archivos directamente relacionados con `video`

**Dos**, corridos aparte como entregable del criterio 6. Criterio de selección, el mismo que
usaron los tres runs anteriores —los que construyen un bloque `kind: 'video'`, más la colocación
en slots—, aplicado con su resultado real: solo dos archivos de los 32 mencionan `video`, y no
hay más.

```
node --test
  tools/author-lite/compiler-api/tests/webVideoIframeSecurity.test.mjs
  tools/author-lite/compiler-api/tests/webColumnsChildExpansionSafety.test.mjs

✔ WebDraftSchema, import, compiler, Preview Real and Generate Web preserve bounded YouTube video path
✔ bounded Vimeo video path remains supported and normalizes to player embed in Core
✔ video rejects unsafe URL and embed payloads in schema, JSON import, compiler, Preview Real and Generate Web
✔ Core renderVideo fails closed for unsafe direct input outside Author Lite
✔ Core renderVideo escapes title and caption as defense-in-depth
✔ Core renderVideo keeps compiler-escaped title and caption visible without double escaping
✔ Core renderVideo iframe uses bounded attributes and avoids broad permissions
✔ video remains rejected inside columns contract and Core columns keeps no explicit video route
✔ columns reject unsupported child kinds including top-level-only-by-design components

ℹ tests 35
ℹ suites 0
ℹ pass 35
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 398.1006
```

**35 de 35.** Nada verde se puso rojo.

**Deliberadamente NO se corrieron aparte** `authorLiteColorSystem`, `webSharedColorSelectorUnification`,
`webColorSelectorCustomPicker` ni `webLegacyCertifiedColorPaletteReconciliation`, que los tres
runs anteriores sí incluyeron: **`video` no aparece en ninguno**, y su ausencia de
`SHARED_SELECTOR_COMPONENTS` (`webSharedColorSelectorUnification.test.mjs:61`) es precisamente
una de las corroboraciones de §6. Correrlos como «relacionados» habría sido relleno; todos
corrieron igual dentro de los 350.

### 14.3 Aserciones ajenas en los archivos corridos

| Archivo | Con quién convive `video` | Estado de ese componente |
|---|---|---|
| `webVideoIframeSecurity.test.mjs` | **Con nadie.** Los 8 tests son de `video` | — |
| `webColumnsChildExpansionSafety.test.mjs` | `details`, `visual`, `conceptGrid`, `timeline`, `hierarchy`, `arithmetic`, `columns` en **la misma aserción** (`:614-623`), más `rule`, `card`, `narrative`, `callout`, `table` en el resto del archivo | Todos `planned` salvo `card` (22, `completed`) y `columns` (13, `completed`) |

**`webVideoIframeSecurity.test.mjs` es el único archivo de test de la serie que pertenece a un
solo componente.** Es una diferencia con `card`, cuyos tests conviven con `rule` e `iconList`.
**Ninguna aserción ajena se tocó, porque no se tocó ningún test.**

**No se corrió la suite completa del repo** (`tools/roadmap/tests/` quedó fuera). La lectura de
«suite completa» que se usó es la del piloto, I-3.

---

## 15. Validador

Por la vía que no escribe, desde `projects/cantu-studio`:

```
node tools/project-console/validate-project-console-state.mjs
```

```
Project Console state validation passed.
Roadmap v3 prototype: 7 objectives / 28 phases / 66 runs; queue groups needs_human_decision=0 now=1 ready_next=16 later=25 history=24
Roadmap v3 active run derived stages: RUN-JAME-WEB-VIDEO-REVALIDATION-001=none
Docs indexed: 149
Docs curated primary-visible: 60 of 149 registered
Component statuses: 16
Git provenance episodes: 9
Git history snapshot: 508 commits / 1 branches (1 visible, 0 backup hidden); current=main; run-associated=3; source=local_git_autosync
Roadmap rebase warnings (non-blocking):
- .aiw/roadmap/roadmap.json run RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 depends on RUN-CANTU-ROADMAP-CONTENT-AUDIT-001, which does not resolve in this roadmap. With a single roadmap loaded this cannot be decided: it may be a legal external dependency — a run that lives in another project (CONTRATO §10.d Regla 2) — or a typo in the run id. Both are possible and one loaded roadmap cannot tell them apart; resolve it against the full set of projects to distinguish external from write error.
```

**Total de runs: 66. `history=24`. `ready_next=16`.** El validador reconoce el run activo como
`RUN-JAME-WEB-VIDEO-REVALIDATION-001`. El aviso no bloqueante de la dependencia externa es el
conocido y legal; **no es hallazgo**.

**`ready_next` medida, no heredada, como el encargo pedía: 16.** Y la serie del desvío se rompe:
el piloto midió 18 contra un encargo que decía 19; `iconList` midió 17 contra 18; `card` midió 16
contra 17. **Este encargo no dio la cifra, y la medida es 16 — la misma que midió `card`, no 15.**
La causa está en las otras dos columnas: al cerrarse el `queue_order` 22, `history` subió de 23 a
24 y **`later` bajó de 26 a 25**, no `ready_next`. La regla «baja de uno en uno cada vez que un
run se cierra» que el record de «Tarjeta» infirió **no se sostiene con un cuarto punto**: lo que
baja es `later` cuando el run que se cierra libera una dependencia que estaba más atrás. Se
declara para que el quinto run no vuelva a heredar la cifra ni la inferencia.

---

## 16. HUECOS NUEVOS DEL PROCEDIMIENTO — solo los que los tres runs anteriores no declararon

Ya declarado y **confirmado sin repetir**: S1 sin campo `lane`; S2 nombra los dos schemas y no
ordena compararlos; la partición de las diez preguntas; I-1 a I-6 del piloto; sus huecos (a)
compuerta sin salida para medición propia, (b) `DECLARED`/`NA` sin veredicto, (c) S6 sin decir si
vale citar un test, (d) S9 PASS que no distingue «el packet está bien» de «no lo escribí y anoté
que está mal»; las ocho preguntas vacías de S4 —**quinto componente seguido sin math**—; de
`iconList`: (a) S2 nombra cinco capas y hay más —**aquí mordió otra vez: el editor entero vive en
`VideoFields.jsx` y la rama son dos líneas**—, (b) el `NOT_APPLICABLE` de S8 engaña, (c) el
«delta packet» sin criterio, y §13.2 sobre superficies disjuntas; y de `card`: (b) S2 sin criterio
para sub-tipos, (c) S3 preguntando por «el contraste» como si hubiera uno, y §15.2 sobre S6 y las
asimetrías entre colocaciones.

Lo que sigue es lo que este componente añade.

### 16.1 ¿Qué paso no fue ejecutable tal como está escrito?

**(a) NUEVO — S5 no tiene salida para un componente que no puede estar en columnas.** Su criterio
es *«PASS: both placements recorded»*, y su única excepción es la auto-referencial de `columns`.
**`video` es el primero de la serie que es un bloque normal y está excluido de los slots por
contrato**, junto con `arithmetic`, `hierarchy`, `timeline`, `details`, `conceptGrid` y `visual`
—**siete de los diecisiete**—. ¿Registrar «rechazado por las dos uniones» cuenta como «both
placements recorded», o es un `NOT_APPLICABLE` que el texto no ofrece? Lo resolví como PASS con
las dos colocaciones registradas y una de ellas negativa, y **lo digo porque es elección mía**: el
documento no lo dice. `columns` reportó en su día que el criterio de S5 no encaja en el caso
NOT_APPLICABLE; **este es el otro caso, y es distinto**: allí no había segunda colocación que
medir, aquí sí la hay y su resultado es un rechazo. **Seis runs más pasarán por aquí.**

**(b) NUEVO — S3 no dice qué hacer cuando la respuesta a las diez preguntas es «no hay
superficie».** El bloque de diez se ejecuta *«for every component regardless»*, y para color eso
nunca se había probado: `list`, `iconList` y `card` tienen superficie de color. **Aquí seis de las
diez preguntas resultan vacías o vacuas** (4, 7, 8, 9 y la mitad de 3 y 10). El contrato de math
sí anticipó esto y por eso `MATH_FORMULA_NOT_APPLICABLE` existe con un patrón de respuesta que el
piloto fijó (I-4); **para color el patrón no estaba probado**, y la simetría no es automática:
S4 vacío se resuelve con «no hay campo», mientras que S3 vacío obliga a demostrar **una ausencia**
—que ningún campo, ninguna variante y ningún token existen en cinco capas— que es más trabajo que
responder que sí. Reusé la forma de I-4 y lo declaro. **Dos componentes más entran por aquí**:
«Texto»/`narrative` (24) y «Factorización»/`arithmetic` (27), los otros dos que la DoD §5 marca
sin color.

**(c) NUEVO — la pregunta 6 de S4 presupone que solo los campos de math pueden producir salida
KaTeX.** Pregunta *«whether the rendered HTML actually produces KaTeX output»* dentro de un bloque
que solo se activa por campos de math. Medido aquí: el renderizado de fórmulas es **global**
—`renderMathInElement(document.body)`, contrato de math §6— así que **cualquier campo de texto de
cualquier componente puede producir salida KaTeX** si el autor escribe delimitadores, tenga o no
campo de math. Para `video` está medido que el par `\( \)` llega intacto al DOM (§7, pregunta 6).
El procedimiento no tiene ningún paso que pregunte esto para un componente sin math, y el
contrato de math §9 define el patrón de regresión solo en la dirección contraria —campo de math
que **no** se renderiza—. **La dirección inversa no está cubierta por ningún paso.** Se mide y se
reporta; **no se afirma nada sobre los otros dieciséis componentes**, que están fuera de alcance.

### 16.2 ¿Qué criterio de salida faltó?

**NUEVO — ningún paso pregunta qué hace el componente con contenido de terceros, y `visual`
tendrá el mismo problema.**

Es el hueco que el encargo anticipaba y **se confirma medido**. Los diez pasos S1–S10 miden:
identidad, estado interno, color, math, colocación, persistencia, QA humana, reparación, packet y
no-claims. **Ninguno pregunta por una superficie que trae contenido desde fuera del repositorio.**
Concretamente, no hay paso que exija medir:

| Lo que este componente tiene y ningún paso pide | Dónde acabó medido en este record |
|---|---|
| Qué formas de dirección externa se aceptan y cuáles no | §8.2(a) y (b) — dentro de S8, porque no había dónde más |
| Qué se reescribe o se descarta al normalizar | §8.2(c) |
| Si hay más de un validador, y si coinciden | §8.2(d) y D3 |
| Con qué permisos se incrusta el contenido ajeno (`sandbox`, `referrerpolicy`, `allow`) | §8.1 — como «reproducción de una reparación histórica», que no es lo que es |
| Qué pasa si el proveedor externo no responde, o el recurso se retiró | **NO MEDIDO.** Ni un paso lo pide ni este run lo mide: exigiría red, y el contrato archivado ya lo declara no controlable (`WEB_AUTHOR_FACING_CONTRACTS.md:305`, `:310`) |

Los cuatro primeros acabaron colgando de S8 y de S2 porque no hay un paso al que pertenezcan.
**Eso los hace fáciles de omitir**: un run que rellene la tabla de evidencia al pie de la letra
puede cerrar los diez pasos sin haber mirado la URL ni una vez, y su tabla se verá idéntica a
esta. La celda de S2 admite «catalog / schemas / compiler / renderer / fixture» y la de S8
«REPAIRED/DECLARED/NA»; ninguna tiene sitio para «medí el perímetro de una superficie externa».

**`visual` (`queue_order` 35, `planned`) tiene exactamente el mismo problema con otra forma**: no
incrusta por URL, sino que acepta **SVG en línea** con un normalizador propio (`isSafeSvg`,
`normalizeSafeSvg`), que es la misma clase de pregunta —contenido que el autor trae de fuera y
que el sistema debe acotar— y tampoco tiene paso. Es medición, no predicción: el schema de
`visual` está tres líneas por encima del de `video` en los dos archivos y su guardia ya existe.

**Se mide y se reporta. NO se propone reescribir la Definition of Done:** enmendarla es del
operador y su ejecución es otro run.

### 16.3 ¿Qué sobra? — confirmación, sin hallazgo nuevo

Las ocho preguntas vacías de S4 volvieron a ocupar espacio real, en el **quinto** componente sin
math seguido. Ya declarado por el piloto, `iconList` y `card`; se confirma y no se amplía. **Y
ahora se suman seis preguntas vacías o vacuas de S3** (§16.1(b)): el mismo coste, en el paso que
hasta ahora siempre había aportado.

---

## 17. Divergencias declaradas — gana el disco, no se edita nada

Regla aplicada, verbatim de la Definition of Done §5: *«a divergence between this table and the
live code is decided by the code, declared in the evidence»*. **Nada se editó**: la matriz de
aplicabilidad, el contrato de color, el inventario, el packet canónico y el archivo de estado son
todos carril `DOCUMENTATION` o están fuera de alcance por el encargo.

| # | Documento y fila | Lo que dice | Lo que mide el disco |
|---|---|---|---|
| DIV-1 | **DoD §5, fila `video`** | «Color surface today: none» / «Palette-resolves: -» / «Math surface today: none» / «Math renders: -» | **COINCIDE en las cuatro columnas.** Cero divergencia. Verificado con compilación viva contra dos paletas y render real |
| DIV-2 | **DoD §5, texto** | «only `video`, `narrative` and `arithmetic` carry none [color surface]» | **COINCIDE para `video`.** Los otros dos están fuera de alcance y no se midieron |
| DIV-3 | **Contrato de color §3 y §4** | `video` **no aparece** en ninguna de las dos tablas | **NO es divergencia, es ausencia correcta**, y el inventario ya la declaró: *«`details`, `rule`, `table`, `split`, `conceptGrid`, `narrative`, `arithmetic`, `hierarchy`, `visual`, and `video` are absent from both»* (`REFERENCE-WEB-COMPONENT-COLOR-AND-MATH-INVENTORY.md:164-166`). Se registra para que nadie lo lea como omisión |
| DIV-4 | **Inventario, fila `video`, citas de línea** | `renderVideo.js:91` / `compiler.js:292-297` / `compiler.js:1136` | **LA CLASE ES CORRECTA, LAS LÍNEAS SE MOVIERON.** `renderVideo.js:91` sigue siendo `module.exports = function renderVideo` ✔. Pero `compiler.js:292-297` apunta hoy a `normalizeVideoUrl`, no al emisor, que está en `:335-340`; y `compiler.js:1136` apunta hoy a `case 'card'`, no a `case 'video'`, que está en `:1208-1209`. **NUEVA** |
| DIV-5 | **Contrato de math §5, fila de los diez sin math** | Lista `video` entre los que no tienen campo de math | **COINCIDE.** Y el inventario §4 lo repite |
| DIV-6 | **`.aiw/state/component_status.json`, entrada `video`** | `blocked_by: ["not_authorized_as_next_component", …]` y `follow_up_required: "Keep video out of next implementation scope unless explicitly approved."` | **VENCIDO.** El operador **sí** autorizó este componente: su run está `active` en el canónico con `queue_order` 23, que es la autorización explícita que esa misma frase pide. El archivo sigue afirmando lo contrario. **Se declara; NO se repara** —fuera de alcance— y **NO se toma como precedente**. **NUEVA, y es la del propio componente** |
| DIV-7 | **`.aiw/state/component_status.json`, entrada `list`** | `repair_status: POST_CERT_COLOR_UI_REGRESSION_REPAIR_REQUIRED`, `blocked_by: ["color_palette_sync_custom_picker_issue", …]`, `follow_up_required: "Repair/reconcile list color palette sync…"` | **VENCIDO.** El run 20 cerró con QA del operador en PASS sobre ese mismo defecto y el archivo sigue afirmándolo. Es la que el encargo anticipaba. **Se declara; NO se repara; NO se toma como precedente**: el estado de `video` se midió de cero. Es la DIV-3 de `iconList` y la DIV-7 de `card`, **reconfirmada por tercera vez sin cambio** |
| DIV-8 | **DoD §6, límite automatizado** | «thirty `*.test.mjs` files… holding 323 top-level `test(` declarations» | Hoy hay **32 archivos** y la suite corre **350 tests**. Declarada por los tres runs anteriores; **se reconfirma sin cambio** |
| DIV-9 | **Packet canónico `VIDEO.md:16`** | «The engine parses the URL and accepts only standard forms; anything else is refused» | **A MEDIAS y atribuido al actor equivocado.** Ver D3: quien rechaza en la ruta de Author Lite es el schema; el motor tiene otro parser, más permisivo en dos casos y más estricto en uno |
| DIV-10 | **Contrato de color §2** | «no compiler path emits them [`surface`, `border`, `text`]» | Falsa en general —declarada por el run 19, el piloto y `card`—, pero **vacuamente cierta para `video`**, que no emite ningún rol. Se reconfirma sin ampliar, igual que hizo `iconList` |
| DIV-11 | **Catálogo `blockCatalog.js:987-989` y matriz `:189`** | «Top-level-only en Phase 2: video, arithmetic, hierarchy, timeline» y «Bounded/conditional: details, table, conceptGrid, split, visual» | **La fila de `video` COINCIDE** con las dos uniones de schema. La segunda frase **no**: `details`, `conceptGrid` y `visual` están **rechazados**, no «bounded/conditional» (`webColumnsChildExpansionSafety.test.mjs:614-623` lo asegura). **Es divergencia sobre otros componentes; se declara y NO se actúa**, están fuera de alcance |
| DIV-12 | **El ticket de cabina** | «tres superficies no tienen entrada en el catálogo» | **NO REPRODUCE.** Los diecisiete tienen etiqueta y entrada; lo que hay son tres entradas de docs **de Slide**. Ver §1.2(c) |

**DIV-7 es la que el encargo anticipaba, y aparece exactamente como la describía.** Se deja
intacta. **DIV-6 es su gemela sobre este mismo componente y es nueva.**

---

## 18. En qué status debe quedar el run, y qué falta para llegar ahí

**El run debe quedar `active`**, y este encargo **no lo cambia**. No se re-emitió `.project/`.

El taller terminó su mitad: S1–S6 completos, S7 preparado como delta, S8 medido, S9 y S10
verificados. Falta, en este orden:

1. **La QA humana del operador** con el packet de §13, en particular:
   - **el check 2**, que confirma que el bloque está fuera del sistema de color y cuya columna de
     fallo dice **«STOP AND REPORT»**: un fallo ahí contradiría la medición central de este run,
     la fila de la matriz de aplicabilidad y el inventario, y no debe tratarse como un defecto
     pequeño;
   - **el check 12**, que es D1 —el id de Vimeo largo que produce salida en blanco— y el único
     defecto medido que un veredicto podría autorizar a reparar dentro de este componente;
   - **los checks 6, 7 y 8**, que son una **decisión de producto** sobre qué se descarta al
     normalizar la URL, no un reporte de bug — y el 8, el hash de Vimeo, es el que tiene
     consecuencia funcional real;
   - **el check 11**, cuyo fallo sería una brecha de seguridad y no una incidencia de usabilidad.
2. **Si vuelve PASS**: el cierre, y la decisión —del operador— sobre qué hacer con los ocho
   defectos declarados en §8.3 y las doce divergencias de §17. El taller no toca ninguno.
3. **Si vuelve FAIL** nombrando un defecto: ese defecto entra por S8 **con autorización**, se
   reproduce, y se repara si está en alcance. **Aviso medido, para que la autorización no se dé a
   ciegas:**
   - **D1 es el único reparable dentro de este componente** sin salirse: vive en los dos
     `draftSchema.js`, en la línea del patrón de Vimeo. Pero **son archivos compartidos por los
     diecisiete**, así que aun autorizado cae bajo la condición de PARA Y REPORTA del encargo.
   - **D4 exige una decisión de producto del operador**, no una reparación.
   - **D6 y una parte de D2 ampliarían el componente**, que el criterio 5 prohíbe.
   - **D7 toca JAME Core**, que `CLAUDE.md` regla 7 protege sin instrucción explícita.
   - **D3, D5 y D8 son del carril `DOCUMENTATION`** y S9 los saca de aquí.

**Lo cierra el operador desde la consola global, que es el punto de serialización.**

---

## 19. Archivos escritos — dos, y ninguno más

1. `projects/cantu-studio/docs/_historical_run_record/RUN-JAME-WEB-VIDEO-REVALIDATION-001-OPERATOR-QA-PACKET.md` (nuevo)
2. `projects/aiw-console/context/aiw-console/records/REVALIDACION-COMPONENTE-VIDEO-CANTU.md` (este record)

---

## 20. Lo que este encargo NO hizo

- **No reparó ningún defecto.** Ocho medidos (D1–D8), ocho pendientes de veredicto o de encargo
  propio. La compuerta S8 no dio autorización para ninguno.
- **No endureció nada de la URL.** Midió 38 formas en cinco capas, encontró dos huecos de
  perímetro y **no tocó ni una línea** de los tres validadores. El criterio 5 lo prohíbe sin
  veredicto y S8 no lo da.
- **No tocó el fixture compartido** `src/content/sandbox/test_multimedia.js`, ni sus líneas de
  `video`. **Ninguna aserción ajena de «Lista con etiquetas» se movió.**
- **No editó la Definition of Done, el contrato de color, el contrato de math, el inventario de
  componentes, la matriz de aplicabilidad, `docs_index.json`, `component_status.json`, la matriz
  de certificación, `docs/components/web/VIDEO.md` ni ninguna fuente del Component Guide**, pese a
  las doce divergencias de §17 y a los dos punteros muertos de §11.2. **Tampoco corrigió la
  mención de `video` dentro de `columnsGuide`**, que es superficie congelada.
- **No reparó DIV-7**, el estado vencido de `list`, **ni lo tomó como precedente**: el estado de
  `video` se midió de cero. **Ni reparó DIV-6**, el estado vencido del propio `video`.
- **No tocó el canónico**: ni `status`, ni `title`, ni `full_description`, ni `depends_on` de
  ningún run. No insertó, movió ni renumeró. No re-emitió `.project/`. No clasificó ningún run.
- **No amplió el componente.** Mejoras que **se nombran y no se hacen**: acotar el id de Vimeo en
  el schema al mismo tope que el motor, o al revés (D1); pasar `title`/`caption` por las guardias
  de texto seguro y ponerles tope de longitud (D2); conservar la marca de tiempo, la lista o el
  hash de Vimeo al normalizar (D4); aceptar `shorts`, `live`, `youtube-nocookie` o URLs sin
  protocolo (D5); exponer `textScale`, `platform` o `id` al autor (D6); hacer determinista el id
  del `<section>` (D7); poner un test a la rama en la que el motor descarta lo que el compilador
  emitió. **Ninguna está en el `full_description` ni en la Definition of Done.**
- **No rehízo el trabajo de paleta ya cerrado** (`queue_order` 16 y 19). Verificó que **no alcanza
  a este componente**, que es el resultado esperado por su fila del inventario. **Cuadra.**
- **No tocó la fábrica de bloques**, ni la compuerta de badge compartida por «Tarjeta» y «Tabla»,
  ni ninguna pieza compartida.
- **No tocó la superficie Slide** del componente, que existe entera y está deshabilitada en el
  desplegable de tipos de ítem. La midió y la declaró en §5.
- **No corrió la suite completa del repo** (`tools/roadmap/tests/` quedó fuera), no levantó la
  consola ni ningún servidor, no ejecutó git en ninguna forma.
- **No reparó derivas cruzadas conocidas**: el mojibake de los mensajes de error de los dos
  schemas —visible en el propio mensaje de este componente,
  `"Solo se permiten URLs de YouTube o Vimeo en formato estÃ¡ndar"`,
  `compiler-api/schemas/draftSchema.js:316` y su espejo `editor-ui:313`—, los punteros muertos de
  packets, el CLI local de roadmap, ni los defectos sin dueño de los componentes ya revalidados.
- **No propuso la reescritura de la Definition of Done.** §16 mide y reporta, incluido el hueco de
  contenido de terceros que el encargo anticipaba; enmendarla es del operador y su ejecución es
  otro run.
- **Ninguna condición de PARA Y REPORTA se disparó.** El canónico casa con el objetivo y el título
  verificó verbatim; **el fixture compartido no se tocó, así que nada obligó a cambiar lo que
  afirma de «Lista con etiquetas»**; **ningún defecto se reparó**, así que ninguno exigió tocar una
  pieza compartida ni la fábrica de bloques —aunque §18.3 avisa de que D1 lo exigiría si el
  operador lo autoriza—; **la medición de la URL no reveló nada que a mi juicio no deba esperar a
  un veredicto** (§8.2, juicio explícito); y el trabajo no creció más allá de revalidar este
  componente.

---

## 21. Procedencia

- Canónico: `projects/cantu-studio/.aiw/roadmap/roadmap.json`, 66 runs, leído y **no escrito**.
- Procedimiento: `docs/reference/REFERENCE-COMPONENT-REVALIDATION-DEFINITION-OF-DONE.md`, leída
  entera antes de medir nada.
- Contratos consumidos: `REFERENCE-COLOR-PALETTE-COMPATIBILITY.md` §9 (y §2–§8 para las
  divergencias), `REFERENCE-MATH-FORMULA-COMPATIBILITY.md` §10, §5 y §6.
- Inventario, que el `full_description` nombra como punto de partida:
  `docs/reference/REFERENCE-WEB-COMPONENT-COLOR-AND-MATH-INVENTORY.md:46`, `:89`, `:164-166`.
- Estado previo de QA: `.aiw/state/component_status.json`, entrada `video`;
  `docs/archive/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` `:108`, `:145`, `:176`,
  `:189`, `:192`, `:321`, `:325`, `:339`, y §8 Gates 3-4 para sembrar el packet.
- Contrato author-facing archivado que cubre este componente:
  `docs/archive/author-lite/components/WEB_AUTHOR_FACING_CONTRACTS.md` §7 (`:211-320`), `:285`.
- Records anteriores, leídos enteros y **obligatorios**, no contexto opcional:
  `PILOTO-REVALIDACION-COMPONENTE-LISTA-CANTU.md`,
  `REVALIDACION-COMPONENTE-LISTA-CON-ETIQUETAS-CANTU.md`,
  `REVALIDACION-COMPONENTE-TARJETA-CANTU.md`.
- Packet de QA producido:
  `projects/cantu-studio/docs/_historical_run_record/RUN-JAME-WEB-VIDEO-REVALIDATION-001-OPERATOR-QA-PACKET.md`.
