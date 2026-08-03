# Revalidación de componente — «Lista con etiquetas» (`iconList`) — `cantu-studio`, `queue_order` 21

Segunda aplicación de la Definition of Done de revalidación tras su refresco, y **primera que
no es el piloto**. El piloto de `list` (`queue_order` 20) corrió solo para producir un
veredicto sobre el procedimiento; este run consume ese veredicto, adopta sus resoluciones y
reporta **solo los huecos que el piloto no vio**.

---

## 1. Identidad del run, derivada del canónico — NO tecleada

Derivada de `projects/cantu-studio/.aiw/roadmap/roadmap.json` recorriendo
`objectives[].phases[].runs[]` y filtrando por `queue_order === 21`. Una sola coincidencia.

| Campo | Valor |
|---|---|
| `queue_order` | 21 |
| `run_id` | `RUN-JAME-WEB-ICONLIST-REVALIDATION-001` |
| `title` | `Audit and implement the IconList component` |
| Comprobación verbatim del título | **`true`** — igualdad estricta contra `Audit and implement the IconList component` |
| Ruta en el canónico | `objectives[2].phases[2].runs[3]` |
| `status` | `active` (no se toca) |
| `lane` | **ausente en el run**; se deriva `DEVELOPMENT` de `lanes[].default: true`, igual que el piloto |
| `depends_on` | `RUN-JAME-WEB-COMPONENT-CONTRACT-STANDARDIZATION-001`, `RUN-JAME-WEB-COMPONENT-BASELINE-RECONCILIATION-001`, `RUN-JAME-COLOR-PALETTE-COMPATIBILITY-CONTRACT-001` — los tres `completed` |
| Clasificación | `JUDGED_DEFINES` / `FUNCTIONAL` / `ADJACENT` / `VISIBLE` |

Totales verificados en disco: **66 runs**, `queue_order` 1..66.

### 1.1 El `full_description` íntegro, leído antes de empezar

Se cita verbatim porque es la especificación que este ticket ejecuta sin ampliar:

> Audit the IconList component against the color and palette compatibility contract, using the
> current component inventory as the starting point. Where the inventory shows the component
> carries hardcoded or local colors instead of the shared palette, or lacks a required
> integration point, implement the missing integration. Repair only what the audit and human
> visual QA show to be a real defect; do not rewrite accepted behavior. Verify the result by
> human visual QA rather than an automated test suite, since the repository has no test runner.

**Dónde este run y el texto del ticket de cabina discrepan, y quién gana.** El
`full_description` autoriza *«implement the missing integration»* cuando el inventario muestre
colores hardcodeados. **El inventario sí los muestra** (D1, §8.2). Pero la misma frase acota:
*«Repair only what the audit and human visual QA show to be a real defect»*, y la Definition of
Done S8 convierte esa acotación en compuerta dura: sin veredicto de QA humana no hay
autorización. **No hay conflicto real entre el run y el ticket**: los dos ordenan declarar y no
reparar. Se declara y no se repara.

### 1.2 Discrepancia entre el texto del run y el disco — declarada, no reparada

La cláusula final, *«since the repository has no test runner»*, es **falsa en disco**: hay
**32** archivos `*.test.mjs` bajo `tools/author-lite/compiler-api/tests/` que corren con
`node --test`. La Definition of Done §12 ya resuelve este choque de forma general y a su favor:

> **The component run texts are stale on the test-runner clause, and the procedure governs.**
> […] Where a run text and this document disagree on that point, **this procedure is what the
> run executes**.

La primera mitad de la cláusula —QA humana del operador como compuerta de cierre— **sigue
vigente y se obedece**. Idéntico al piloto; no es hallazgo nuevo.

---

## 2. Verificación del resumen del piloto que traía este ticket

El ticket resumía tres huecos del piloto y ordenaba verificarlos contra el record. Hecho. El
record del piloto **existe** y su veredicto **no contradice** el resumen de forma que cambie
cómo se ejecuta. Una corrección de precisión:

| Hueco según el ticket | Lo que dice el record del piloto | Veredicto |
|---|---|---|
| «La compuerta de reparación no cubre un defecto que el taller mide y que ningún veredicto de QA nombra» | §11.3(a), literal. Sus cuatro salidas presuponen un veredicto de QA | **Exacto.** Adoptado |
| «Declarar una divergencia no tiene veredicto propio» | §11.3(b) dice algo más estrecho: **`S8 = DECLARED` no tiene veredicto**. No es «declarar una divergencia» en general; es el resultado DECLARED del paso S8 el que no encaja en ninguno de los cinco veredictos | **Corregido aquí.** El efecto práctico es el mismo y la resolución se adopta igual |
| «La partición de las preguntas de auditoría produjo dos numeraciones distintas; adopta la del piloto» | §11.1, tercer bullet: `columns` contó «editor, Preview Real y Generate Web» como **tres** preguntas; el piloto como **una con tres respuestas** | **Exacto.** Adoptada la del piloto, y **encaja**: §4 de este record numera diez con esa misma partición |

**Resoluciones del piloto adoptadas sin cambio**, para que los veredictos sean comparables:
I-1 (el bloque de auditoría vive en el record), I-2 (`docs/_historical_run_record/`,
`<RUN_ID>-OPERATOR-QA-PACKET.md`), I-3 («suite completa» = la del repo), I-4 (responder las
diez de S4 marcando VACÍA con su razón).

---

## 3. La tabla de evidencia de la Definition of Done §7 — estructura verbatim

```
Component: iconList    Run: RUN-JAME-WEB-ICONLIST-REVALIDATION-001 (queue_order 21)    Date: 2026-08-03

| Step | Measured against | Result | Evidence |
|---|---|---|---|
| S1 identity | .aiw/roadmap/roadmap.json | PASS | RUN-JAME-WEB-ICONLIST-REVALIDATION-001 + "Audit and implement the IconList component" |
| S2 state audit | catalog / schemas / compiler / renderer / fixture | PASS | §5, nueve capas citadas, cero UNKNOWN |
| S3 color audit | color contract Section 9 | PASS + COLOR_PALETTE_DIRECT_SUPPORT_REQUIRED | bloque en §6 de este record |
| S4 math audit | math contract Section 10 | PASS + MATH_FORMULA_NOT_APPLICABLE | bloque en §7 de este record |
| S5 columns placement | top-level + both slots | PASS | §9; blockCatalog.js:36-41, WebBlockEditor.jsx:1864-1870 y :4013-4015 |
| S6 persistence | save/load + import | PASS | §10; ida y vuelta idempotente en los tres casos de color |
| S7 human qa | Section 6 boundary | PREPARED (delta) | docs/_historical_run_record/RUN-JAME-WEB-ICONLIST-REVALIDATION-001-OPERATOR-QA-PACKET.md |
| S8 repair gate | reproduced QA defects | NA (ningun veredicto de QA nombra un defecto abierto) | §8; el unico repair_status registrado reproduce como YA REPARADO |
| S9 packet | single-source contract | PASS | ningun packet ni Guide escrito; tres discrepancias enrutadas en §11 |
| S10 registry + no-claims | docs_index + conflicts | PASS | §11; docs_index.json sin escribir; conflicto `list` intacto |

Verdict: READY_FOR_OPERATOR_QA  (con la reserva de §13.2: S8=NA convive con seis defectos medidos y declarados)
Open decisions touched: none
```

---

## 4. Nota de método: la partición de las diez preguntas, adoptada del piloto

El contrato de color §9 enuncia las diez preguntas como **una sola frase con punto y coma**,
que literalmente contiene **siete** cláusulas. El piloto llegó a diez añadiendo tres preguntas
implícitas (qué emite el compilador; qué pasa con un token que la paleta no define; qué pasa
sin paleta y con draft legacy) y contando *«editor, Preview Real y Generate Web»* como **una**
pregunta con tres respuestas. **Esa es la numeración de §6.** No se inventa una tercera.

---

## 5. S2 — Auditoría de estado, con archivo y línea

Nueve capas. Ninguna quedó en UNKNOWN.

| Capa | Ruta y línea | Medición |
|---|---|---|
| Catálogo (metadatos) | `tools/author-lite/editor-ui/src/features/editor/constants/blockCatalog.js:36-41` | `label: 'Lista con etiquetas'`, `category: 'basics'`, **`rail: false`**, `order: 50`. **Sin `disabled`** — es agregable |
| Catálogo (entrada de docs) | `.../blockCatalog.js:1036-1057` | `id: 'web-iconlist'`, `action: 'iconList'`, `label: 'Lista con etiquetas'`, `icon: 'ListTree'` |
| Editor, top-level | `.../components/web/WebBlockEditor.jsx:4013-4015` | Delega entero en `<IconListFields … palette={colorPalette} />` |
| Editor, hijo de columnas | `.../WebBlockEditor.jsx:1864-1870` | `ColumnTextInputField` para el título + el **mismo** `IconListFields` con `showTitle={false}` |
| Editor, superficie de campos | `.../components/common/IconListFields.jsx:27-179` | Control de color propio (`IconListColorField`, `:27-87`), compartido entre Web y Slide |
| Schema editor-ui | `tools/author-lite/editor-ui/src/schemas/draftSchema.js:732-736`; ítem en `:291-298`; unión top-level `:969`; unión hijo de columnas `:901` (`.strict()`) | `badge`/`title`/`text` requeridos, `color` opcional `#RRGGBB`, `items` mín. 1, **sin máximo** |
| Schema compiler-api | `tools/author-lite/compiler-api/schemas/draftSchema.js:760-764`; ítem `:294-298`; uniones `:997` y `:929` (`.strict()`) | **Idéntico**, byte a byte, al de editor-ui — y el propio código lo afirma en `:745-746` |
| Compilador | `tools/author-lite/compiler-api/services/compiler.js:315-324` (`buildIconListOutput`), case en `:1202-1203`, y el mismo builder para Slide en `:1257-1258` | Escapa `title`, `badge`, `text`; **pasa `color` sin tocar**; **no llama a `resolveVariantColorToken` ni a `buildColorRolesOutput`** |
| Renderer | `src/builders/web/partials/renderIconList.js:12-173`; `safeColor` en `:23-26` | Acepta `#RRGGBB`; cualquier otra cosa cae a `#5E81AC`. Ancho de badge compartido, derivado del badge más largo (`:32-43`) |
| Defaults | `.../utils/blockFactory.js:42-49` (top-level), `:242-249` (hijo de columnas), `:308-315` (Slide) | **Tres literales hardcodeados y no coincidentes entre sí** — ver D1 |
| Fixture sandbox | `src/content/sandbox/test_multimedia.js:34-39` (`DATA_PEMDAS`) y `:51` | Cuatro ítems con `color` hex literal; **sin `level`** |
| Colocación en columnas (motor) | `src/builders/web/renderColumns.js:76` | Ruta propia para `iconList`; sin fallback JSON |

**Nota sobre `blockDefaults.js`:** el archivo existe y está **vacío, 0 líneas**, igual que
midió el piloto. Los defaults viven en `blockFactory.js`.

### 5.1 Los dos schemas comparados entre sí — lo que S2 no pide

El piloto hizo esta comparación aunque la Definition of Done no la ordena, y encontró algo.
Se repite por comparabilidad. Catorce casos, ejecutados contra `DraftSchema` de los dos lados:

| Caso | editor-ui | compiler-api | |
|---|---|---|---|
| hex de paleta `#123ABC` | ACEPTA | ACEPTA | |
| hex personalizado `#FF007F` | ACEPTA | ACEPTA | |
| ítem sin `color` | ACEPTA | ACEPTA | |
| bloque sin `title` | ACEPTA | ACEPTA | |
| `items: []` | RECHAZA | RECHAZA | |
| hex de 3 dígitos `#F0A` | RECHAZA | RECHAZA | |
| color con nombre CSS (`red`) | RECHAZA | RECHAZA | |
| `badge` vacío | RECHAZA | RECHAZA | |
| `badge` con `<script>` | **ACEPTA** | **ACEPTA** | ver D5 |
| `title` de ítem con `<script>` | **ACEPTA** | **ACEPTA** | ver D5 |
| 200 ítems | ACEPTA | ACEPTA | sin tope, documentado |
| `badge` de 500 caracteres | ACEPTA | ACEPTA | sin tope de longitud |
| campo extra en el ítem (`level`) | ACEPTA | ACEPTA | ver D6 |
| campo extra en el bloque (`nope`) | ACEPTA | ACEPTA | |

**Cero divergencias entre los dos schemas.** Confirma el comentario de
`compiler-api/schemas/draftSchema.js:745-746`, que afirma que los schemas de
`iconList`/`visual`/`video` son idénticos byte a byte entre los dos lados. Es la diferencia
con `list`, cuyo `items` diverge a propósito por compatibilidad legacy.

**Segunda medición, la del piloto reproducida:** el campo extra del bloque se acepta top-level
y **se rechaza dentro de un slot** (`Unrecognized key(s) in object: 'nope'`), porque la unión
de hijos usa `.strict()` y la top-level no. **Idéntico a `list`**: la asimetría es de las
uniones, no del componente. El compilador construye su salida campo a campo, así que el extra
nunca llega al motor por ninguna vía. Se declara, no se repara.

---

## 6. S3 — Color palette compatibility audit

Bloque obligatorio de diez preguntas del contrato de color §9, con la partición del piloto.
Todas las respuestas son medición viva: compilación real contra dos paletas cuyos accents
difieren, y render real.

**1. ¿Expone campos, variantes, estilos o tokens dependientes del color?** Sí, exactamente
uno, y **por ítem**: `items[].color`, opcional, regex `#RRGGBB` estricto.
`compiler-api/schemas/draftSchema.js:296`. **No existe un color de bloque**; el color es una
propiedad de cada entrada.

**2. ¿Qué emite el compilador?** Con paleta A (`ctx = #123ABC`) y paleta B (`ctx = #ABC123`):

```
paleta A -> {"type":"iconList","title":"Jerarquia PEMDAS","items":[{"badge":"P","color":"#B48EAD","title":"Parentesis","text":"…"},{"badge":"E","color":"#5E81AC","title":"Exponentes","text":"…"}]}
paleta B -> {"type":"iconList","title":"Jerarquia PEMDAS","items":[{"badge":"P","color":"#B48EAD","title":"Parentesis","text":"…"},{"badge":"E","color":"#5E81AC","title":"Exponentes","text":"…"}]}
salida identica entre paletas : true
```

**Identidad byte a byte.** El compilador copia el hex del autor y no consulta la paleta. Es
exactamente lo que el contrato de color §4 fija para esta fila —*«preserves the authored
`items[].color` unchanged»*— y lo que la fila §5 de la Definition of Done dice
(*«no - preserved unchanged»*). **Cero divergencia.**

**3. ¿La paleta afecta correctamente al editor, a Preview Real y a Generate Web?**
Los tres, por separado, y **la respuesta no es la misma para los tres**:

- **Preview Real y Generate Web: NO, y es correcto.** Comparten `compileDraftToJameData`, así
  que coinciden por construcción, y ninguno de los dos ve la paleta para este bloque. Render
  medido:

  ```
  hex en HTML A : #1E293B #FFFFFF #E2E8F0 #B48EAD #475569 #5E81AC
  hex en HTML B : #1E293B #FFFFFF #E2E8F0 #B48EAD #475569 #5E81AC
  HTML distinto entre paletas : false
  ```

- **Editor: SÍ, pero solo a medias.** El desplegable y el picker consumen `getAuthorColorOptions(palette)`
  con la paleta Web activa (`IconListFields.jsx:32-33`), y el botón **+ Agregar ítem** siembra
  `resolveAuthorColorToken('ctx', { palette }).accent` (`:99`, `:170`), que **sí** sigue la
  paleta activa. Pero el **ítem semilla** de un bloque recién creado lleva un hex literal
  escrito en el código. Medido con paleta A activa:

  ```
  bloque top-level  color #B48EAD -> el desplegable muestra "Personalizado"
  hijo de columnas  color #5E81AC -> el desplegable muestra "Personalizado"
  item anadido con "+ Agregar item" -> #123ABC -> muestra token ctx (Azul)
  ```

  **Dos ítems creados con segundos de diferencia muestran etiquetas distintas.** Es D1.

**4. ¿Save/load e importación de Draft JSON preservan la selección?** Sí. Ver §10. A
diferencia de `list`, aquí el draft **sí conserva la clave `color`**, porque el hex es el valor
autorado, no un derivado del compilado. Coincide con el contrato de color §3, fila `iconList`.

**5. ¿Se sostienen contraste y legibilidad?** **Aquí está la diferencia estructural con `list`,
y es la que decide la clase.** En `list` el accent pinta viñetas y un filete decorativo, y el
texto es de color fijo: ningún accent puede volverlo ilegible. En «Lista con etiquetas» el
color del autor es el **fondo de un badge cuyo texto es blanco fijo**
(`renderIconList.js:117-118`: `background-color: ${safeColor(item.color)}` sobre
`color: #FFF`). Medido:

```
color claro #FFFF00 aceptado por el renderer : true
texto del badge sigue siendo #FFF : true
titulo item fijo #1E293B : true | texto item fijo #475569 : true
```

Un hex claro elegido en **Personalizado** produce blanco sobre casi blanco, **sin ninguna
guarda en schema, compilador ni renderer**. El título y el texto del ítem sí son de color fijo
y quedan a salvo. Es medición, no juicio de diseño: se enruta al operador como check 7 del
packet. Ver D2.

**6. ¿Funciona top-level?** Sí, medido arriba.

**7. ¿Funciona dentro de los slots de columnas sin romper legibilidad?** Sí; ver §9. Las claves
emitidas en un slot son **idénticas** a las de top-level, y también las de cada ítem.

**8. ¿Qué pasa con un token que la paleta activa no define?** **La pregunta no aplica por
construcción, y esa es la respuesta.** Este bloque **no almacena ids de token**: almacena hex.
No hay resolución de token en tiempo de compilación, así que el orden de resolución del
contrato §4 —y la divergencia DIV-4 que el piloto declaró contra su paso 4— **no tocan a este
componente**. Lo único que existe es el mapeo inverso en el editor
(`IconListFields.jsx:16-25`): un hex que no casa con ningún accent de la paleta se muestra como
**Personalizado**. No hay caída a `ctx` en ninguna parte del camino de compilación.

**9. ¿Qué pasa sin paleta activa, y con un draft legacy?**

```
sin paleta activa -> ["#B48EAD","#5E81AC"]     (idéntico: el hex no depende de la paleta)
item sin color, compilado : {"type":"iconList","title":"T","items":[{"badge":"P","title":"A","text":"B"}]}
lleva clave color : false
render sin color, hex : #1E293B #FFFFFF #E2E8F0 #5E81AC #475569
legacy con color invalido ('rebeccapurple') -> el renderer pinta #5E81AC
```

Un ítem sin `color` **no emite la clave** y el renderer cae a `#5E81AC`, el `ctx` por defecto.
Un color inválido que llegase por fuera del schema cae al mismo sitio. Nada se rompe. Coincide
con el contrato §5.

**10. ¿Qué límites y variantes debe documentar el packet del componente?** Los nueve tokens por
nombre visible (Azul, Morado, Cian, Dorado, Champagne, Verde, Naranja, Rojo, Gris), la opción
**Personalizado**, y —lo más importante y lo que hoy no dice ningún documento author-facing—
que **aquí queda congelado el color venga de donde venga**, no solo el personalizado: elegir
**Morado** copia el morado de hoy, no se suscribe a él. Además: sin tope de ítems, sin tope de
longitud de badge, y el ancho del badge es compartido y lo fija el badge más largo.

**Clase asignada: `COLOR_PALETTE_DIRECT_SUPPORT_REQUIRED`.**

Justificación, y **por qué no es la clase que el piloto asignó a `list`**. El contrato define
`DIRECT_SUPPORT_REQUIRED` como *«Color carries the visible contract; semantic variants, tokens,
and contrast must all be reviewed»*. Las tres partes se cumplen aquí y ninguna se cumplía en
`list`:

- **El color porta el contrato visible.** El propio catálogo describe el bloque como *«Lista con
  etiquetas de color por item»* y su caso de uso como *«Enumerar categorias o fases con codigo
  de color»* (`blockCatalog.js:1041`, `:1047`). El color **es** el código; el piloto justificó
  `VARIANT_OR_TOKEN_ONLY` para `list` precisamente con lo contrario, que *«la lista se lee igual
  en cualquier color»*.
- **El contraste debe revisarse**, y no como formalidad: pregunta 5, blanco fijo sobre fondo de
  autor sin guarda.
- Descartada `COLOR_PALETTE_VARIANT_OR_TOKEN_ONLY` —*«a single discrete color control»*— porque
  el control no es uno: es **uno por ítem**, sin tope de ítems, y cada uno pinta una superficie
  distinta. Descartada `CONDITIONAL_OR_BOUNDED` porque no hay modo en que el color deje de
  aplicar. Descartada `NOT_APPLICABLE` porque hay superficie de color. Descartada
  `REQUIRES_FOLLOWUP` porque la superficie sí está formalizada, en el contrato §3 y §4.

---

## 7. S4 — Math and formula compatibility audit

El bloque de diez preguntas del contrato de math §10 se ejecuta **para todo componente**. Para
`iconList` la fila §5 de la Definition of Done dice `none` en math, y ocho de las diez resultan
vacías. Se responden igual y se declara cuáles son vacías y por qué —resolución I-4 del piloto.

**1. ¿Expone algún campo de math o fórmula?** **No.** Las claves del bloque son `kind`, `title`,
`items[]`, y las del ítem `badge`, `color`, `title`, `text`. Ninguna acepta math.
`compiler-api/schemas/draftSchema.js:294-298` y `:760-764`. Confirmado además por el contrato de
math §5, que lista `iconList` explícitamente entre los nueve sin campo de math.

**2. ¿Qué superficie de entrada usa cada campo?** VACÍA — no hay campo de math.

**3. ¿Ofrece el editor visual de fórmulas o una entrada de texto plano?** **Ninguno de los dos.**
El campo visual se monta solo para `kind === 'rule'` (contrato de math §8) y este bloque no tiene
ningún campo de math que pudiera ser de texto. Medido en `IconListFields.jsx:94-179`: cuatro
controles por ítem —etiqueta, título, color, texto—, ninguno de fórmula.

**4. ¿El compilador emite delimitadores, y de quién son?** VACÍA — nada que delimitar.

**5. ¿Un delimitador autorado se elimina o se duplica?** VACÍA.

**6. ¿El HTML renderizado produce salida KaTeX?** **No, y es correcto.** Medido sobre HTML real:
si un autor escribe `\(x^2\)` en el texto de un ítem, el compilador lo escapa y el motor no lo
envuelve; aparece como texto literal. **No es el patrón de regresión de math** del contrato §9,
porque ese patrón exige un campo `math` que el schema acepte; aquí no lo hay.

**7. ¿Save/load e importación preservan la fórmula?** VACÍA.

**8. ¿Funciona dentro de los slots de columnas?** VACÍA en cuanto a math; la colocación está
medida en §9 por otra vía.

**9. ¿Qué límites de longitud y forma debe documentar el packet?** VACÍA para math. Los límites
que sí existen —mín. 1 ítem, sin máximo, badge no vacío— son del bloque y se documentan en §5 y
en el packet.

**10. ¿Qué texto de fallo ve el autor cuando se rechaza una fórmula?** VACÍA — no hay fórmula.

**Clase asignada: `MATH_FORMULA_NOT_APPLICABLE`.** Cero superficies de math en schema, editor,
compilador y renderer, coincidiendo con la fila §5 de la Definition of Done y con el contrato de
math §5.

---

## 8. S8 — La compuerta de reparación, y la LISTA DE DEFECTOS MEDIDOS ANTES DE TOCAR NADA

### 8.1 El estado de QA registrado, y su reproducción

La Definition of Done §6 coloca `iconList` en la fila **`EXPLICIT_HUMAN_PASS_PRESERVED`**, junto
con `card` y `video`. Es un **PASS**, no un fallo. La proyección
(`.aiw/state/component_status.json`, entrada `iconList`) registra además:

> `repair_status: "LABEL_ICONLIST_BADGE_WIDTH_REPAIR_VISIBLE_IN_COMMIT_HISTORY"`

Eso **no es un defecto abierto**: nombra una reparación ya hecha y visible en el historial de
commits (`b064b8f4 fix(author-lite): repair web labels and icon list badge width`). Se reprodujo
igualmente, porque S8 exige reproducir antes de cualquier otra cosa:

| Ítem | Reproducción | Evidencia |
|---|---|---|
| Ancho de badge | **REPARADO, sigue reparado** | `renderIconList.js:32-43` deriva un ancho compartido del badge más largo y lo expone como `--iconlist-badge-width`; los dos badges lo consumen (`:121-122`). El test `webIconListBadgeWidth.test.mjs` lo asegura en verde |

**Ningún veredicto de QA humana nombra un defecto abierto para este componente.** Salida de S8
según el texto de la Definition of Done: *«No QA verdict names a defect: NOT_APPLICABLE»*.

**Resultado S8: NA.** Y esa etiqueta **describe mal el estado real**, porque el taller sí midió
defectos. Ver §13.1(b): es el hueco (a) del piloto visto desde la otra cara.

### 8.2 Defectos medidos por el taller — LOS SEIS, ninguno reparado

Por la cláusula *«An observation made by the workshop itself is a measurement to declare, never
a repair authorization»*, y aplicando la **resolución del piloto** para el hueco que esa
cláusula deja abierto —**pendiente de QA, anotado, no resuelto por criterio propio**—, **los
seis van al operador y ninguno se tocó**:

| # | Defecto medido | Dónde | Por qué NO se reparó |
|---|---|---|---|
| **D1** | **El color del ítem semilla está hardcodeado y no sigue la paleta activa**, mientras que todo ítem añadido después sí la sigue. Y **las tres factorías siembran colores distintos entre sí**: `#B48EAD` (Morado) top-level y en Slide, `#5E81AC` (Azul) como hijo de columnas. Con una paleta de autor activa, el desplegable del ítem semilla muestra **«Personalizado»** y el del siguiente muestra **«Azul»** | `blockFactory.js:47`, `:247`, `:313`, contra `IconListFields.jsx:99` y `:170` | **Sin veredicto de QA.** Es el defecto que el `full_description` describe (*«hardcoded or local colors instead of the shared palette»*), pero S8 solo autoriza con veredicto humano. Es el check 2 del packet |
| **D2** | **El texto del badge es blanco fijo sobre un fondo que elige el autor**, sin guarda de contraste en ninguna capa. Medido: `#FFFF00` se acepta y se pinta, con texto `#FFF` encima | `renderIconList.js:117-118` | Sin veredicto de QA, y **repararlo sería una decisión de diseño del operador** (¿derivar el color del texto? ¿restringir la gama?). Es el check 7 del packet |
| **D3** | El packet canónico afirma *«HTML, scripts, events, and dangerous URLs are refused»* — medido: se **aceptan** en el schema y se **escapan** en el compilador | `docs/components/web/ICON-LIST.md:55` | **S9 prohíbe a un run de componente escribir el packet** |
| **D4** | El packet canónico describe `color` como *«an optional color»* y nunca dice que sea un hex congelado que no sigue la paleta — el hecho author-facing más importante del componente | `docs/components/web/ICON-LIST.md:30` | Ídem D3 |
| **D5** | `badge`, `title` y `text` **no** pasan por `safeRequiredPlainText`, a diferencia de `narrative`, `callout` o del propio `badge` de `conceptGrid` (`:339`). Un `<script>` se **acepta** en el schema y se **escapa** en el compilador | `draftSchema.js:295`, `:297-298` contra `:339` | Sin veredicto de QA. La salida es segura por escapado. **Es el mismo D1 del piloto en otro componente**: se confirma que no es específico de `list` |
| **D6** | **El renderer lee dos campos que ningún schema puede producir**: `item.level`, que dibuja el árbol de rieles anidados, y `data.textScale`. Medido: el renderer reacciona a los dos. La cabecera del propio archivo documenta los rieles como característica principal del componente | `renderIconList.js:14`, `:47`, `:55`; cabecera `:6-9` | Sin veredicto de QA, y **exponerlos sería ampliar el componente**, que el criterio 5 prohíbe. Se nombra y no se hace |

**Ninguno de los seis es reparable en esta pasada.** D3 y D4 por regla explícita de S9; D2 por
ser decisión del operador; D1, D5 y D6 por falta de autorización de QA — y **D1 es exactamente
el hueco (a) del piloto**, con la agravante de que aquí el `full_description` del run parece
autorizarlo y la Definition of Done lo bloquea.

### 8.3 Dos punteros muertos del packet canónico

Verificados en disco, dentro de `docs/components/web/ICON-LIST.md`:

| Puntero | Líneas | Estado | Ruta real |
|---|---|---|---|
| `docs/REFERENCE-DRAFT-JSON.md` | 26, 50 | **NO EXISTE** | `docs/reference/REFERENCE-DRAFT-JSON.md` |
| `docs/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` | 12, 68 | **NO EXISTE** | `docs/archive/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` |

**Son los mismos dos punteros muertos que el piloto declaró en `LIST.md`** (su D4). Deriva
conocida, fuera de alcance por el encargo y por S9. Se registran y se enrutan.

---

## 9. S5 — Colocación en columnas

`iconList` es hijo válido de **«Dos columnas»** en las dos uniones de schema
(`editor-ui:901`, `compiler-api:929`, ambas con `.strict()`), está ofrecido en el menú de hijos
(`WebBlockEditor.jsx:256`, `{ kind: 'iconList', label: 'Lista con etiquetas' }`) y tiene su
propia rama de editor en slot (`:1864-1870`).

**Invariancia de alcance de las opciones de color (contrato §7):** las dos colocaciones montan
**el mismo componente**, `IconListFields`, con la misma `palette`. No hay dos implementaciones
que puedan divergir: `WebBlockEditor.jsx:4014` y `:1868` pasan `palette={colorPalette}` al mismo
archivo. **Las mismas opciones en las dos colocaciones, por construcción.**

Medición viva, ambos slots, dos paletas:

```
slot left  -> {"type":"iconList","title":"Izquierda","items":[{"badge":"L","color":"#B48EAD","title":"Izq","text":"x"}]}
slot right -> {"type":"iconList","title":"Derecha","items":[{"badge":"R","color":"#654321","title":"Der","text":"y"}]}
mismas claves que top-level : true
mismas claves de item que top-level : true
hex columns A : #1E293B #FFFFFF #E2E8F0 #B48EAD #475569 #654321
hex columns B : #1E293B #FFFFFF #E2E8F0 #B48EAD #475569 #654321
columns HTML sigue la paleta : false
```

`columns HTML sigue la paleta : false` **es el resultado correcto aquí**, no un fallo: el bloque
no resuelve tokens en ninguna colocación. Es la lectura opuesta a la del piloto para `list`, y
por eso se explicita.

**Comportamiento de math en slots (contrato de math §10):** NOT_APPLICABLE, sin campo de math.

**Resultado S5: PASS.** Ambas colocaciones registradas.

---

## 10. S6 — Ida y vuelta de persistencia

Parseando dos veces por el schema del compilador, en los tres casos de color que el componente
admite:

```
hex de paleta      | 1a: {"kind":"iconList","title":"T","items":[{"badge":"P","color":"#123ABC","title":"A","text":"B"}]}
                   | idempotente: true | conserva clave color: true
hex personalizado  | 1a: {"kind":"iconList","title":"T","items":[{"badge":"P","color":"#FF007F","title":"A","text":"B"}]}
                   | idempotente: true | conserva clave color: true
sin color          | 1a: {"kind":"iconList","title":"T","items":[{"badge":"P","title":"A","text":"B"}]}
                   | idempotente: true | conserva clave color: false
```

**Los tres idempotentes.** El draft **conserva** la clave `color` cuando existe —lo contrario que
`list`, donde el hex nace al compilar y nunca se escribe de vuelta— porque aquí el hex **es** el
valor autorado. Coincide con el contrato de color §3, fila `iconList`. Un ítem sin color no
inventa la clave. **Resultado S6: PASS.**

---

## 11. S9 y S10 — Lo que este run deliberadamente NO escribió

**S9 — PASS.** No se escribió `docs/components/web/ICON-LIST.md` ni ninguna fuente del Component
Guide. Las cuatro discrepancias del packet (D3, D4 y los dos punteros muertos de §8.3) quedan
**registradas y enrutadas**, no reparadas. Nota: el contenido inline del Component Guide protegido
por `checkComponentGuideTextIntegrity.cjs` cubre `listGuide`, `headerGuide` y `columnsGuide`;
**`iconList` no tiene contenido inline propio**, así que la superficie congelada de la Definition
of Done §8 no le aplica —y aun así no se escribió nada, porque S9 lo prohíbe en general.

**S10 — PASS.** `.aiw/docs/docs_index.json` **no se editó**. Conflictos y no-claims verificados
intactos:

- `component_status.json` → `source_conflicts[0].conflict_id = "component-list-status-agents-vs-matrix-phase2"`,
  con `resolution: "PRESERVE_AS_DOCUMENTATION_CONFLICT_NOT_CERTIFICATION"`. **Sin tocar.**
- La entrada `iconList` de la proyección, con sus siete campos de estado, sus dos `blocked_by`
  (`docs_pending`, `no_web_global_certification_gate`) y su `follow_up_required`. **Sin tocar.**
- `global_no_claims` completo. **Sin tocar.**
- El puntero de estado del packet canónico, con sus punteros muertos declarados en §8.3. Sin tocar.

---

## 12. Divergencias declaradas — gana el disco, no se edita nada

Regla aplicada, verbatim de la Definition of Done §5: *«a divergence between this table and the
live code is decided by the code, declared in the evidence»*. **Nada se editó**: todos esos
documentos son carril `DOCUMENTATION` o están fuera de alcance por el encargo.

| # | Documento y fila | Lo que dice | Lo que mide el disco |
|---|---|---|---|
| DIV-1 | DoD §5, fila `iconList` | «`items[].color` hex» / «no - preserved unchanged» / math «none» | **COINCIDE en las cuatro columnas.** Cero divergencia. Verificado con compilación viva contra dos paletas |
| DIV-2 | Contrato de color §3 y §4, filas `iconList` | Guarda `#RRGGBB`; no resuelve; preserva el color autorado | **COINCIDEN las dos.** Cero divergencia |
| DIV-3 | **`.aiw/state/component_status.json`, entrada `list`** | `repair_status: POST_CERT_COLOR_UI_REGRESSION_REPAIR_REQUIRED`, `blocked_by: ["color_palette_sync_custom_picker_issue", …]`, y `follow_up_required: "Repair/reconcile list color palette sync…"` | **VENCIDO.** El run de `queue_order` 20 cerró con QA del operador en PASS sobre ese mismo defecto. El archivo sigue afirmándolo. **Se declara; NO se repara** —está fuera de alcance— y **NO se toma como precedente**: el estado de `iconList` se midió de cero |
| DIV-4 | **Matriz de certificación, `:129` y `:190`** | `iconList` conserva *«`items[].color` hex author-facing desde la Web palette activa + Personalizado»* | **A MEDIAS.** Cierto para todo ítem añadido con **+ Agregar ítem**; **falso para el ítem semilla** de un bloque nuevo, que lleva hex hardcodeado (D1). La matriz es la fuente única de estado y está fuera de alcance |
| DIV-5 | Contrato de color §2 | «no compiler path emits them [`surface`, `border`, `text`]» | Falsa en general —ya declarada por el piloto (su DIV-2) y por el run 19—, pero **vacuamente cierta para `iconList`**, que no emite ningún rol. Se reconfirma sin ampliar |
| DIV-6 | DoD §6, límite automatizado | «thirty `*.test.mjs` files… holding 323 top-level `test(` declarations» | Hoy hay **32 archivos** y la suite corre **350 tests**. Ya declarada por el piloto (su DIV-7); **se reconfirma un día después, sin cambio** |

**DIV-3 es la que el encargo anticipaba, y aparece exactamente como lo describía.** Se deja
intacta.

---

## 13. HUECOS NUEVOS DEL PROCEDIMIENTO — solo los que el piloto no declaró

El piloto ya declaró: S1 sin campo `lane`; S2 nombra los dos schemas y no ordena compararlos;
la partición de las diez preguntas; I-1 a I-6; los huecos (a) compuerta sin salida para
medición propia, (b) `DECLARED` sin veredicto, (c) S6 sin decir si vale citar un test, (d) S9
PASS que no distingue «el packet está bien» de «no lo escribí y anoté que está mal»; y §11.4
sobre las ocho preguntas vacías de S4. **Todo eso se confirma y no se repite.** Lo que sigue es
lo que este componente añade.

### 13.1 ¿Qué paso no fue ejecutable tal como está escrito?

**(a) NUEVO — S2 nombra cinco capas y este componente tiene seis.** S2 enumera *«catalog entry,
editor branch, both schemas, compiler case, renderer, plus its sandbox fixture»*. La superficie
de edición de este bloque **no es una rama de `WebBlockEditor.jsx`**: las dos ramas
(`:1864-1870` y `:4013-4015`) son tres líneas que delegan en un componente aparte,
`common/IconListFields.jsx`, de 179 líneas, que es donde vive **todo** el control de color y que
además se comparte con la superficie Slide. Un run que rellene la celda «editor branch» al pie
de la letra citaría las tres líneas y **no habría auditado el control**. Aquí costó poco
detectarlo; en un componente cuyo defecto estuviera en el archivo delegado, S2 pasaría en
silencio. **`card` y `hierarchy` tienen la misma forma** y sus runs son los `queue_order` 22 y
posteriores.

**(b) NUEVO — el `NOT_APPLICABLE` de S8 describe mal a un componente que entra con PASS.** El
hueco (a) del piloto visto desde el otro lado. El piloto tenía un veredicto de QA que nombraba
un defecto y obtuvo `DECLARED`. Este componente entra con un **PASS explícito**, ningún
veredicto nombra defecto abierto, y la salida literal de S8 es `NOT_APPLICABLE` — que en la
tabla de evidencia **se lee como «no había nada que reparar»**, conviviendo con seis defectos
medidos y declarados en §8.2. La celda de evidencia de S8 admite `REPAIRED/DECLARED/NA` y
ninguna de las tres dice «NA por el eje de QA, y seis medidos por el eje del taller». **Tres
componentes entran por esta misma fila** (`iconList`, `card`, `video`): los tres producirán la
misma lectura engañosa.

**(c) NUEVO — el «delta packet» de S7 no tiene criterio para saber qué antecede al PASS.** La
Definition of Done §6 ordena, para la fila `EXPLICIT_HUMAN_PASS_PRESERVED`, *«prepare a delta
packet covering only surfaces the PASS predates (both regression patterns predate it) or the run
changed»*. **Nada registra qué superficies antecede un PASS dado.** Tuve que derivarlo de los
records de los `queue_order` 16 y 19 y de un comentario dentro de un archivo de test
(`webColorSelectorCustomPicker.test.mjs:14-28`), que es donde está escrito que este componente
fue la referencia de interfaz de la unificación del selector. El paréntesis *«both regression
patterns predate it»* da la respuesta para los dos patrones nombrados y para nada más. **Sin
criterio de salida, «delta» es lo que cada run decida.** `card` y `video` lo derivarán por su
cuenta, y pueden derivarlo distinto.

### 13.2 ¿Qué criterio de salida faltó?

**NUEVO — la regla de superficies disjuntas de la Definition of Done §2 no cubre el código.**
Es el hueco de más alcance que encontré, y el piloto no podía verlo porque no reparó nada.

§2 fija, como norma vinculante del modelo de lotes: *«**Disjoint write surfaces per component.**
A component's run writes its own packet, its own registry entry refresh, and its own record. Two
runs never touch one file.»* Las tres superficies que enumera son **documentales**. Pero un run
de componente que **repare** escribe en código, y ahí las superficies **no son disjuntas en
absoluto**: los diecisiete componentes viven en los mismos ocho archivos.

Medido para este componente:

| Archivo compartido | Qué comparte | Quién más lo tocaría |
|---|---|---|
| `utils/blockFactory.js` | Los defaults de **los diecisiete** kinds, en tres factorías | **La reparación de D1 vive aquí.** También la de `card` (`queue_order` 22) y la de `video` (23) |
| `components/web/WebBlockEditor.jsx` | Rama top-level y rama de slot de todos | Todos los runs de componente |
| `editor-ui/src/schemas/draftSchema.js` y `compiler-api/schemas/draftSchema.js` | Un `WebXxxSchema` por kind y las dos uniones | Todos |
| `compiler-api/services/compiler.js` | Un `case` por kind | Todos |
| `constants/blockCatalog.js` | Metadatos y docs de los diecisiete | Todos |
| `common/VariantSelect.jsx` | `ColorTokenPicker`, que este bloque consume (`IconListFields.jsx:5`) y `WebBlockEditor.jsx` también (`:8`, `:974`, `:3443`) | Cualquier run que toque un control de color |
| `constants/colorSystem.js` | `getAuthorColorOptions`, `resolveAuthorColorToken`, `normalizeHexColor` — siete consumidores | **Ningún run de componente es su dueño** |

Y la Definition of Done manda ejecutar *«in batches of three or four components per session»*.
**Un lote de cuatro que repare toca cuatro veces los mismos ocho archivos.** La regla que debería
impedirlo enumera las superficies equivocadas. No propongo la enmienda: la mido y la reporto.

### 13.3 La pregunta que el piloto no pudo responder: ¿comparte este componente con `list` alguna superficie que un run posterior fuera a rehacer?

**Sí, cinco, y dos de ellas las tocará un run que hoy sigue `planned`.** Medido:

| # | Superficie compartida con `list` | ¿La rehace un run posterior? |
|---|---|---|
| 1 | `src/content/sandbox/test_multimedia.js` — **el mismo fixture** contiene `list` (`:50`), `iconList` (`:51`), `visual` (`:55`) y `video` (`:56`) | **Sí.** El run de **«Video»** es `queue_order` 23, `planned`, y `visual` tiene el suyo. Los dos citarán y podrían editar el archivo que este run cita como evidencia de S2 |
| 2 | `webLegacyCertifiedColorPaletteReconciliation.test.mjs` — un solo archivo con aserciones de `header`, `list`, `columns`, **`iconList` y `card`** en el mismo test (*«iconList and card retain their existing bounded color behavior during reconciliation»*) | **Sí.** El run de **«Tarjeta»** es `queue_order` 22, `planned`, y toca las aserciones de `iconList` si toca las suyas |
| 3 | `common/VariantSelect.jsx` → `ColorTokenPicker` | Dueño declarado: `RUN-CANTU-COLOR-SELECTOR-UNIFICATION-001`, `completed`. Cualquier run de componente que repare su picker vuelve aquí |
| 4 | `constants/colorSystem.js` | **Sin dueño entre los runs de componente.** Es la pieza que el piloto ya señaló en su D2 |
| 5 | `blockFactory.js`, `WebBlockEditor.jsx`, los dos schemas, `compiler.js`, `blockCatalog.js` | **Todos** los runs de componente restantes |

**Lo que NO comparte, y conviene fijarlo:** el control de color **no** es el mismo. `list` usa
`ColorTokenOrCustomField` de `VariantSelect.jsx`; este bloque tiene su propio desplegable en
`IconListFields.jsx:27-87` y comparte solo el recuadro `ColorTokenPicker`. Esto **no es un
defecto**: el run 16 lo decidió a propósito y su test lo asegura —*«iconList uses the SHARED
picker instead of its own input, so there is one control and not two copies of it»*
(`webColorSelectorCustomPicker.test.mjs:135-143`)—, porque los seis componentes del control
unificado guardan **token id** y este guarda **hex**. Se mide y se declara para que un run
posterior no lo lea como duplicación pendiente de unificar.

### 13.4 ¿Qué sobra? — confirmación, sin hallazgo nuevo

Las ocho preguntas vacías de S4 volvieron a ocupar espacio real, en el **tercer** componente sin
math seguido. El piloto ya lo declaró; se confirma y no se amplía.

---

## 14. Tests

**No se tocó ningún archivo de código, schema, renderer ni test.** Los tests se corrieron como
medición, que es el estatus que la Definition of Done §6 les da: *«A workshop that chooses to run
a relevant test file records the result as a measurement in its evidence table […] it is never a
substitute for the S7 packet and never a repair authorization.»*

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
ℹ duration_ms 1404.2821
```

**350 de 350. Exacta.** Nada verde se puso rojo.

### 14.2 Los archivos directamente relacionados con `iconList`

Seis archivos, corridos aparte como entregable del criterio 6. Criterio de selección, el mismo
que usó el piloto: los que construyen un bloque `kind: 'iconList'`
(`webColorSelectorCustomPicker`, `webLegacyCertifiedColorPaletteReconciliation`), más el
renderer (`webIconListBadgeWidth`), la colocación en slots (`webColumnsChildExpansionSafety`),
la resolución de tokens (`authorLiteColorSystem`) y el control compartido que este bloque
consume (`webSharedColorSelectorUnification`).

```
node --test
  webIconListBadgeWidth.test.mjs
  webColorSelectorCustomPicker.test.mjs
  webLegacyCertifiedColorPaletteReconciliation.test.mjs
  webSharedColorSelectorUnification.test.mjs
  webColumnsChildExpansionSafety.test.mjs
  authorLiteColorSystem.test.mjs

✔ iconList badges share a block width large enough for PEMDAS
✔ iconList renderer escapes text and rejects unsafe inline colors locally
✔ iconList renderer does not double-escape compiler-escaped text
✔ the box beside the field is a real picker, and it is the one iconList uses
✔ a custom colour is stored as a hex and reads back as Personalizado, not as a token
✔ a token keeps following the palette and a custom hex stays frozen, end to end
✔ iconList and card retain their existing bounded color behavior during reconciliation
✔ every author-facing palette selector opts in, at every placement
✔ an unknown token id still falls back to ctx, in the three layers

ℹ tests 62
ℹ suites 0
ℹ pass 62
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 400.7254
```

**62 de 62.** Nada verde se puso rojo.

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
Roadmap v3 prototype: 7 objectives / 28 phases / 66 runs; queue groups needs_human_decision=0 now=1 ready_next=17 later=26 history=22
Roadmap v3 active run derived stages: RUN-JAME-WEB-ICONLIST-REVALIDATION-001=none
Docs indexed: 149
Docs curated primary-visible: 60 of 149 registered
Component statuses: 16
Git provenance episodes: 9
Git history snapshot: 508 commits / 1 branches (1 visible, 0 backup hidden); current=main; run-associated=3; source=local_git_autosync
Roadmap rebase warnings (non-blocking):
- .aiw/roadmap/roadmap.json run RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 depends on RUN-CANTU-ROADMAP-CONTENT-AUDIT-001, which does not resolve in this roadmap. With a single roadmap loaded this cannot be decided: it may be a legal external dependency — a run that lives in another project (CONTRATO §10.d Regla 2) — or a typo in the run id. Both are possible and one loaded roadmap cannot tell them apart; resolve it against the full set of projects to distinguish external from write error.
```

**Total de runs: 66. `history=22`. `ready_next=17`.** El validador reconoce el run activo como
`RUN-JAME-WEB-ICONLIST-REVALIDATION-001`. El aviso no bloqueante de la dependencia externa es el
conocido y legal; **no es hallazgo**.

---

## 16. Las cifras del encargo, verificadas una a una

| Cifra del encargo | Real | |
|---|---|---|
| 66 runs | **66** | exacta |
| `history=22` | **22** | exacta — el piloto midió 21; subió al cerrar el `queue_order` 20 |
| `ready_next=18` | **17** | **INEXACTA** — el validador reporta 17. El piloto ya midió 18 contra un encargo que decía 19; sigue bajando run a run |
| 350 tests en la suite del compilador | **350 de 350** | exacta, y verde |
| 17 componentes | **17** | exacta — `WEB_COMPONENT_UI` en `blockCatalog.js:11-113` tiene 17 entradas, y la DoD §2 lista los mismos 17 |
| 17 packets | **17** | exacta — 17 archivos en `docs/components/web/` |
| 16 ids en el archivo de estado | **16** | exacta — y el validador lo confirma con `Component statuses: 16`. Falta `columns`, como la DoD §6 declara |

Seis de siete exactas. `ready_next` es la que no cuadra, y su desvío es sistemático: es una
cifra que baja cada vez que un run se cierra.

---

## 17. En qué status debe quedar el run, y qué falta para llegar ahí

**El run debe quedar `active`**, y este encargo **no lo cambia**. No se re-emitió `.project/`.

El taller terminó su mitad: S1–S6 completos, S7 preparado como delta, S8 medido, S9 y S10
verificados. Falta, en este orden:

1. **La QA humana del operador** con el packet de §18, en particular **el check 2**, que es el
   que decide si D1 —el color semilla hardcodeado— es un defecto o el comportamiento aceptado, y
   **el check 7**, que es una decisión de diseño sobre el contraste del badge y no un reporte de
   bug.
2. **Si vuelve PASS**: el cierre, y la decisión —del operador— sobre qué hacer con los seis
   defectos declarados en §8.2 y las divergencias de §12. El taller no toca ninguno.
3. **Si vuelve FAIL** nombrando un defecto: ese defecto entra por S8 **con autorización**, se
   reproduce, y se repara si está en alcance. Aviso medido: **la reparación de D1 vive en
   `blockFactory.js`, que es pieza compartida por los diecisiete componentes** (§13.2). Si el
   operador la autoriza, esa reparación cae bajo la condición de PARA Y REPORTA del encargo y
   debe entrar por su propia decisión de alcance, no por el run que la descubrió.

**Lo cierra el operador desde la consola global, que es el punto de serialización.**

---

## 18. Archivos escritos — dos, y ninguno más

1. `projects/cantu-studio/docs/_historical_run_record/RUN-JAME-WEB-ICONLIST-REVALIDATION-001-OPERATOR-QA-PACKET.md` (nuevo)
2. `projects/aiw-console/context/aiw-console/records/REVALIDACION-COMPONENTE-LISTA-CON-ETIQUETAS-CANTU.md` (este record)

---

## 19. Lo que este encargo NO hizo

- **No reparó ningún defecto.** Seis medidos (D1–D6), seis pendientes de veredicto. La compuerta
  S8 no dio autorización para ninguno.
- **No editó la Definition of Done, el contrato de color, el contrato de math,
  `docs_index.json`, `component_status.json`, la matriz de certificación,
  `docs/components/web/ICON-LIST.md` ni ninguna fuente del Component Guide**, pese a las seis
  divergencias de §12 y a los dos punteros muertos de §8.3.
- **No reparó DIV-3**, el estado vencido de `list` en `component_status.json`, ni lo tomó como
  precedente para `iconList`.
- **No tocó el canónico**: ni `status`, ni `title`, ni `full_description`, ni `depends_on` de
  ningún run. No insertó, movió ni renumeró. No re-emitió `.project/`. No clasificó ningún run.
- **No amplió el componente.** Mejoras que **se nombran y no se hacen**: exponer `items[].level`
  al autor para habilitar los rieles anidados que el renderer ya dibuja; exponer `textScale`;
  pasar `badge`/`title`/`text` por las guardias de texto seguro (D5); derivar el color del texto
  del badge del fondo elegido, o acotar la gama, para cerrar D2; poner un tope de ítems.
  **Ninguna está en el `full_description` ni en la Definition of Done.**
- **No rehízo el trabajo de paleta del `queue_order` 19** ni el de `list` del 20. Verificó el
  primero como parte de S3: para este componente su efecto es **nulo por contrato**, y cuadra.
- **No tocó los conjuntos cerrados de variante del compilador** ni el motor Slide, aunque
  `buildIconListOutput` sirve a los dos motores.
- **No corrió la suite completa del repo**, no levantó la consola ni ningún servidor, no ejecutó
  git en ninguna forma.
- **No reparó derivas cruzadas**: el mojibake de los mensajes de error de los schemas (visible en
  `Agrega al menos un ítem` → `Agrega al menos un Ã­tem`), los punteros muertos de packets, el
  CLI local de roadmap, la compuerta de badge sin dueño de Tarjeta y Tabla, ni los defectos de
  `list` que quedaron sin dueño al cerrar su run.
- **No propuso la reescritura de la Definition of Done.** §13 mide y reporta; enmendarla es del
  operador y su ejecución es otro run.
- **Ninguna condición de PARA Y REPORTA se disparó.** El canónico casa con el objetivo y el
  título verificó verbatim; las divergencias se dejaron resolver declarándolas; **ningún defecto
  se reparó**, así que ninguno exigió tocar una pieza compartida, los conjuntos cerrados ni una
  decisión de diseño del operador —aunque §17.3 avisa de que D1 y D2 lo exigirían si el operador
  los autoriza—; el record del piloto existe y su veredicto no contradice el resumen del encargo;
  y el trabajo no creció más allá de revalidar este componente.

---

## 20. Procedencia

- Canónico: `projects/cantu-studio/.aiw/roadmap/roadmap.json`, 66 runs, leído y **no escrito**.
- Procedimiento: `docs/reference/REFERENCE-COMPONENT-REVALIDATION-DEFINITION-OF-DONE.md`, leída
  entera antes de medir.
- Contratos consumidos: `REFERENCE-COLOR-PALETTE-COMPATIBILITY.md` §9,
  `REFERENCE-MATH-FORMULA-COMPATIBILITY.md` §10.
- Estado previo de QA: `.aiw/state/component_status.json`,
  `docs/archive/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` §8 Gates 3-4, `:129`,
  `:190`, `:308`, `:325`.
- Record del piloto, leído entero y **obligatorio**, no contexto opcional:
  `projects/aiw-console/context/aiw-console/records/PILOTO-REVALIDACION-COMPONENTE-LISTA-CANTU.md`.
- Packet de QA producido:
  `projects/cantu-studio/docs/_historical_run_record/RUN-JAME-WEB-ICONLIST-REVALIDATION-001-OPERATOR-QA-PACKET.md`.
