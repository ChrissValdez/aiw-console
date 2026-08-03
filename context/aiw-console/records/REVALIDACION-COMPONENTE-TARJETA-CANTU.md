# Revalidación de componente — «Tarjeta» (`card`) — `cantu-studio`, `queue_order` 22

Tercera aplicación de la Definition of Done de revalidación tras su refresco, y **segunda que
no es el piloto**. Consume el veredicto del piloto de `list` (`queue_order` 20) y el de
«Lista con etiquetas» (`iconList`, 21), **adopta sus resoluciones sin cambiarlas**, y reporta
solo los huecos que ninguno de los dos declaró.

---

## 1. Identidad del run, derivada del canónico — NO tecleada

Derivada de `projects/cantu-studio/.aiw/roadmap/roadmap.json` recorriendo
`objectives[].phases[].runs[]` y filtrando por `queue_order === 22`. **Una sola coincidencia.**

| Campo | Valor |
|---|---|
| `queue_order` | 22 |
| `run_id` | `RUN-JAME-WEB-CARD-REVALIDATION-001` |
| `title` | `Audit and implement the Card component` |
| **Comprobación verbatim del título** | **`true`** — igualdad estricta contra `Audit and implement the Card component` |
| Objetivo / fase | `O1` / `O1.P1C` |
| `status` | `active` (no se toca) |
| `lane` | **ausente en el run**; se deriva `DEVELOPMENT` de `lanes[].default: true`, igual que los dos anteriores |
| `depends_on` | `RUN-JAME-WEB-COMPONENT-CONTRACT-STANDARDIZATION-001`, `RUN-JAME-WEB-COMPONENT-BASELINE-RECONCILIATION-001`, `RUN-JAME-COLOR-PALETTE-COMPATIBILITY-CONTRACT-001` |
| Clasificación | `JUDGED_DEFINES` / `FUNCTIONAL` / `ADJACENT` / `VISIBLE`, `classified_at` `2026-08-01T05:45:24.479Z` |

Totales verificados en disco: **66 runs**, `queue_order` 1..66, **23 `completed` / 1 `active`
(este) / 42 `planned`**. El validador reconoce el run activo como
`RUN-JAME-WEB-CARD-REVALIDATION-001` (§14).

### 1.1 El `full_description` íntegro, leído antes de empezar

Se cita verbatim porque es la especificación que este ticket ejecuta sin ampliar:

> Audit the Card component against the color and palette compatibility contract, using the
> current component inventory as the starting point. Where the inventory shows the component
> carries hardcoded or local colors instead of the shared palette, or lacks a required
> integration point, implement the missing integration. Repair only what the audit and human
> visual QA show to be a real defect; do not rewrite accepted behavior. Verify the result by
> human visual QA rather than an automated test suite, since the repository has no test runner.

`summary`: *«Audit the Card component against the color system, implement what is missing, and
verify by human visual QA.»*

### 1.2 Dónde el run y el ticket de cabina discrepan, y quién gana

El encargo fija: *«Si este ticket y el run discrepan, gana el run.»* Dos puntos, los dos
declarados:

**(a) El `full_description` autoriza *«implement the missing integration»* cuando el inventario
muestre colores hardcodeados.** Medido: **`card` no los tiene** (§8.1, punto 3 del objetivo).
La condición que dispararía esa autorización no se cumple, así que la cláusula no abre nada. Y
la misma frase acota — *«Repair only what the audit and human visual QA show to be a real
defect»* — que la Definition of Done S8 convierte en compuerta dura. **No hay conflicto real:
el run y el ticket ordenan lo mismo, declarar y no reparar.**

**(b) La cláusula final, *«since the repository has no test runner»*, es falsa en disco:** hay
**32** archivos `*.test.mjs` bajo `tools/author-lite/compiler-api/tests/` que corren con
`node --test`. La Definition of Done §12 ya resuelve este choque de forma general y a su favor:

> **The component run texts are stale on the test-runner clause, and the procedure governs.**
> […] Where a run text and this document disagree on that point, **this procedure is what the
> run executes**.

La primera mitad —QA humana del operador como compuerta de cierre— **sigue vigente y se
obedece**. Idéntico a los dos runs anteriores; **no es hallazgo nuevo**.

---

## 2. Resoluciones adoptadas de los dos runs anteriores — sin tercera lectura

El encargo ordena adoptar sus resoluciones de los huecos y no inventar una tercera. Adoptadas
sin cambio, para que los veredictos sean comparables:

| Resolución | Origen | Cómo se aplica aquí |
|---|---|---|
| I-1 — el bloque de auditoría S3/S4 vive **en este record** | piloto §11.2 | §6 y §7 |
| I-2 — el packet de S7 va a `docs/_historical_run_record/`, nombre `<RUN_ID>-OPERATOR-QA-PACKET.md` | piloto §11.2 | §13 |
| I-3 — «suite completa» = la del **repo**; los 32 archivos del compilador sí se corren para verificar el 350 | piloto §11.2 | §12 |
| I-4 — responder las diez preguntas de S4 marcando VACÍA con su razón, sin omitir | piloto §11.2 | §7 |
| La partición de las diez preguntas del contrato de color es **la del piloto** (*«editor, Preview Real y Generate Web»* = **una** pregunta con tres respuestas) | piloto §11.1, confirmada por `iconList` §4 | §6 |
| Un defecto que el taller mide y ningún veredicto de QA nombra se trata como **pendiente de veredicto, anotado, no resuelto por criterio propio** | piloto §11.3(a), aplicada por `iconList` §8.2 | §8 |
| `S8 = NA` / `DECLARED` no encaja en ninguno de los cinco veredictos; se declara `READY_FOR_OPERATOR_QA` **con reserva explícita** | piloto §11.3(b), `iconList` §13.1(b) | §3 y §11 |

**No se propone enmendar la Definition of Done.** §11 mide y reporta; enmendarla es del operador
y su ejecución es otro run.

---

## 3. La tabla de evidencia de la Definition of Done §7 — estructura verbatim

```
Component: card    Run: RUN-JAME-WEB-CARD-REVALIDATION-001 (queue_order 22)    Date: 2026-08-03

| Step | Measured against | Result | Evidence |
|---|---|---|---|
| S1 identity | .aiw/roadmap/roadmap.json | PASS | RUN-JAME-WEB-CARD-REVALIDATION-001 + "Audit and implement the Card component" |
| S2 state audit | catalog / schemas / compiler / renderer / fixture | PASS | §5, once capas citadas, cero UNKNOWN |
| S3 color audit | color contract Section 9 | PASS + COLOR_PALETTE_VARIANT_OR_TOKEN_ONLY | bloque en §6 de este record |
| S4 math audit | math contract Section 10 | PASS + MATH_FORMULA_NOT_APPLICABLE | bloque en §7 de este record |
| S5 columns placement | top-level + both slots | PASS | §9; blockCatalog.js:48-52, WebBlockEditor.jsx:1903-1905 y :3929-3930, renderColumns.js:61 |
| S6 persistence | save/load + import | PASS | §10; ida y vuelta idempotente en los seis casos |
| S7 human qa | Section 6 boundary | PREPARED (delta) | docs/_historical_run_record/RUN-JAME-WEB-CARD-REVALIDATION-001-OPERATOR-QA-PACKET.md |
| S8 repair gate | reproduced QA defects | NA (ningun veredicto de QA nombra un defecto abierto) | §8; repair_status = NO_CURRENT_RUNTIME_REPAIR_IN_THIS_ROUND |
| S9 packet | single-source contract | PASS | ningun packet ni Guide escrito; cuatro discrepancias enrutadas en §11 |
| S10 registry + no-claims | docs_index + conflicts | PASS | §11; docs_index.json sin escribir; conflicto `list` intacto |

Verdict: READY_FOR_OPERATOR_QA  (con la reserva de §2: S8=NA convive con siete defectos medidos y declarados)
Open decisions touched: none
```

---

## 4. Ejecución paso a paso de la Definition of Done — nada omitido en silencio

Los diez pasos, en su orden y con sus nombres. **Ninguno resultó BLOCKED.** Ninguno se omitió.

| Paso | Nombre en la DoD | Resultado | Dónde |
|---|---|---|---|
| S1 | Identity gate | PASS | §1 |
| S2 | Current-state audit | PASS | §5 |
| S3 | Color palette compatibility audit | PASS + `COLOR_PALETTE_VARIANT_OR_TOKEN_ONLY` | §6 |
| S4 | Math and formula compatibility audit | PASS + `MATH_FORMULA_NOT_APPLICABLE` | §7 — **no se declara NOT_APPLICABLE el paso**: el bloque se ejecuta entero, ocho de diez vacías con su razón |
| S5 | Columns placement check | PASS | §9 — **no aplica la excepción auto-referencial**, que es solo para `columns` |
| S6 | Persistence roundtrip | PASS | §10 |
| S7 | Human QA | PREPARED (delta) | §13 — el taller **nunca** ejecuta QA humana |
| S8 | Repair gate | NA | §8 |
| S9 | Packet and Guide, both out of scope | PASS | §11 |
| S10 | No-claims | PASS | §11 |

**Dos pasos con matiz, dicho y no callado.** S5 no es NOT_APPLICABLE aquí porque `card` sí es
hijo válido de columnas; la excepción auto-referencial de la DoD es exclusiva de `columns`.
S4 sale `MATH_FORMULA_NOT_APPLICABLE` como **clase**, no como resultado del paso: el paso es
PASS porque el bloque de diez preguntas se ejecutó completo, que es lo que la DoD exige
*«for every component regardless»*.

---

## 5. S2 — Auditoría de estado, con archivo y línea

Once capas. **Ninguna quedó en UNKNOWN.**

| Capa | Ruta y línea | Medición |
|---|---|---|
| Catálogo (metadatos) | `tools/author-lite/editor-ui/src/features/editor/constants/blockCatalog.js:48-52` | `label: 'Tarjeta'`, `category: 'basics'`, **`rail: true`**, `order: 70`. **Sin `disabled`** — es agregable |
| Catálogo (entrada de docs) | `.../blockCatalog.js:164-187` | `id: 'web-card'`, `action: 'card'`, `label: 'Tarjeta'`, `icon: 'Box'`. Su `jsonSchema` de ejemplo (`:181`) documenta `variant`, **no** `colorToken` — ver D3 |
| Editor, top-level | `.../components/web/WebBlockEditor.jsx:3929-3930` | Dos líneas que delegan en `<CardFields …>` |
| Editor, hijo de columnas | `.../WebBlockEditor.jsx:1903-1905` | Tres líneas que delegan en **el mismo** `<CardFields … isColumn>` |
| Editor, superficie de campos | `.../WebBlockEditor.jsx:1080-1240` (`CardFields`), control de color en `:903-990` (`CardColorField`), estilo de badge en `:992-1023` (`CardBadgeStyleField`), modos en `:299-302` | **Todo el control de color vive aquí, no en las ramas.** Ver §15.1(a) |
| Schema editor-ui | `tools/author-lite/editor-ui/src/schemas/draftSchema.js:608-646` (`WebCardShape`), `:648-690` (`refineWebCard`), `:692-695` (`WebCardSchema`, `.strict()`), `:697-700` (`WebColumnCardChildSchema`), uniones `:964` y `:903` | `colorToken` token id **o** `color` `#RRGGBB`, mutuamente excluyentes; `cardType` ∈ `normal/metric/code/persona`; topes 120/32/80/120/24/80/100 |
| Schema compiler-api | `.../compiler-api/schemas/draftSchema.js:621-659` (`WebCardShape`), `:661-703` (`refineWebCard`), `:705-708` y `:710-713`, uniones `:992` y `:931` | **Idéntico byte a byte** al de editor-ui en toda la región de `card` (comparación de rango ejecutada: `true`) |
| Compilador | `.../compiler-api/services/compiler.js:342-410` (`buildCardOutput`), `case 'card'` en `:1136-1140`, ruta Slide en `:1249-1251`; resolución en `:172-197` (`resolveCardColorToken`), roles en `:162-170` (`buildColorRolesOutput`) | Emite `type, variant, mode, title, content, color, surface, border, textColor` + badge/icono + placement. **Los cuatro `cardType` toman rutas distintas** |
| Renderer | `src/builders/web/partials/renderCard.js:59-62` (desestructura y `directColor`), `:293-306` (resolución), `:323-341` (salida estándar), especiales en `:216-288` | **Prefiere `data.color` si es `#RRGGBB` válido**; si no, cae al mapa fijo de `commons.js`. Cuatro modos implementados |
| Defaults | `.../utils/blockFactory.js:16-25` (top-level), `:258-267` (hijo de columnas), `:339-341` (ítem Slide) | Las dos factorías Web son **idénticas** y siembran **`colorToken: 'ctx'`**, un token id. Ver §8.1 |
| Fixture sandbox | `src/content/sandbox/test_theory.js:66-68`, `:132-231` | `metric` con `color: '#434C5E'`, `code`, `persona` con `fullWidth`, y decenas de `card` dentro de `columns` |

**Nota sobre `blockDefaults.js`:** el archivo existe y está **vacío, 0 líneas**, igual que
midieron los dos runs anteriores. Los defaults viven en `blockFactory.js`.

### 5.1 Los dos schemas comparados entre sí — lo que S2 no pide

Los dos runs anteriores hicieron esta comparación aunque la Definition of Done no la ordena. Se
repite por comparabilidad. **Dos vías, y las dos limpias.**

**Vía 1 — comparación de rango, byte a byte.** La región de `card` de los dos archivos
(`editor-ui:608-715` contra `compiler-api:621-728`): **idéntica, `true`.**

**Vía 2 — 29 casos ejecutados contra `DraftSchema` de los dos lados**, top-level y dentro de un
slot. Resultado: **cero divergencias en las 58 comparaciones.** Lo que sí quedó medido:

| Caso | editor-ui | compiler-api | |
|---|---|---|---|
| `colorToken: 'ctx'` | ACEPTA | ACEPTA | |
| `color: '#FF007F'` | ACEPTA | ACEPTA | |
| `color` **y** `colorToken` juntos | RECHAZA | RECHAZA | el `refine` lo prohíbe |
| sin ninguno de los dos | ACEPTA | ACEPTA | |
| hex de 3 dígitos, nombre CSS, token inválido | RECHAZA | RECHAZA | |
| `mode` `surface` / `clean` | **ACEPTA** | **ACEPTA** | ver D2 |
| `badgeStyle` fuera del enum | RECHAZA | RECHAZA | lo para el **schema**, no la compuerta del compilador — ver §8.2 |
| `title`/`content` con `<script>` o `javascript:` | **RECHAZA** | **RECHAZA** | ver la nota de abajo |
| `title` de 121 caracteres | RECHAZA | RECHAZA | tope 120 |
| `metric` sin `value`; `code` sin `content`; `persona` sin `author` | RECHAZA | RECHAZA | |
| `metric` con `mode`; `normal` con `value` | RECHAZA | RECHAZA | campos por `cardType` |
| `code` **con** `badge` | ACEPTA | ACEPTA | ver D4 |
| icono desconocido | RECHAZA | RECHAZA | |
| campo extra en el bloque | **RECHAZA** | **RECHAZA** | ver la nota de abajo |
| `colSpan: 3` | RECHAZA top-level / **ACEPTA en slot** | ídem | ver §15.2 |

**Dos diferencias medidas contra `list` e `iconList`, y conviene fijarlas porque cambian cómo se
leen los defectos de aquellos records:**

1. **`card` sí rechaza el campo extra top-level.** `WebCardSchema` es `.strict()` en las **dos**
   colocaciones (`editor-ui:694`, `:699`), mientras que las uniones top-level de `list` e
   `iconList` no lo son. **La asimetría `.strict()` que los dos runs anteriores declararon no
   existe en `card`**, y por la razón contraria: aquí es estricto en los dos lados.
2. **`card` sí pasa sus textos por guardias de texto seguro.** `safeOptionalLimitedPlainText`
   (usado en `:614-643`) y `requireSafeCardText` (`:588-598`) **rechazan** `<script>`, `on*=`,
   `javascript:` y `data:text/html`. **El defecto D1 del piloto y el D5 de `iconList` —campos
   sin guardia, escapados en vez de rechazados— NO se reproduce en `card`.** Y la consecuencia
   documental es la inversa: la línea del packet canónico que en `LIST.md` e `ICON-LIST.md` era
   falsa, en `CARD.md:58` es **verdadera**.

---

## 6. S3 — Color palette compatibility audit

Bloque obligatorio de diez preguntas del contrato de color §9, **con la partición del piloto**.
Todas las respuestas son medición viva: compilación real contra dos paletas cuyos accents
difieren, y render real del motor.

**1. ¿Expone campos, variantes, estilos o tokens dependientes del color?** Sí, **dos campos
mutuamente excluyentes**: `colorToken` (token id de la paleta activa) y `color` (`#RRGGBB`).
`compiler-api/schemas/draftSchema.js:644-645`; la exclusión mutua en `refineWebCard`
(`:668-671`) y otra vez en el compilador (`compiler.js:173-175`). Además `variant`, que es un
**enum cerrado** de doce valores (`:24`) y actúa como id de respaldo cuando no hay `colorToken`
ni `color`, y `badgeStyle`, que es color-adyacente.

**2. ¿Qué emite el compilador?** Con paleta A (`ctx = #123ABC`) y paleta B (`ctx = #ABC123`),
los cuatro `cardType`:

```
[normal]  A -> {"type":"card","variant":"ctx","mode":"side","title":"Normal","content":"Cuerpo de la tarjeta.","color":"#123ABC","surface":"#ECEFFA","border":"#ACBAE8","textColor":"#1E293B","badgeStyle":"outline"}
[normal]  B -> {"type":"card","variant":"ctx","mode":"side","title":"Normal","content":"Cuerpo de la tarjeta.","color":"#ABC123","surface":"#F8FAED","border":"#E2E9B2","textColor":"#1E293B","badgeStyle":"outline"}
[metric]  A -> {…,"color":"#123ABC","surface":"#ECEFFA","border":"#ACBAE8","textColor":"#1E293B"}
[metric]  B -> {…,"color":"#ABC123","surface":"#F8FAED","border":"#E2E9B2","textColor":"#1E293B"}
[code]    A -> {"type":"card","variant":"code","title":"Codigo","content":"const a = 1;","lang":"JS"}
[code]    B -> idéntica                             <- cambia con la paleta: FALSE
[persona] A -> {…,"color":"#654321","surface":"#F3F0ED","border":"#C9BDB1","textColor":"#1E293B"}
[persona] B -> {…,"color":"#321654","surface":"#EFECF1","border":"#B7ADC3","textColor":"#1E293B"}
```

**Tres de los cuatro `cardType` resuelven contra la paleta; `code` no emite color en absoluto**
(`compiler.js:362-374`), y es correcto: la tarjeta de código es oscura por contrato y su
renderer fija sus propios colores (`renderCard.js:176-192`). Su `assertLegacyCardColorFields`
(`:248-254`) valida el color del autor y **lo descarta**.

**3. ¿La paleta afecta correctamente al editor, a Preview Real y a Generate Web?** **Sí a los
tres.**

- **Editor:** `CardColorField` (`WebBlockEditor.jsx:903-990`) construye sus opciones con
  `getAuthorColorOptions(palette)` (`:919`) y su valor de respaldo con
  `resolveAuthorColorToken(safeDefaultTokenId, { palette })` (`:923`) — la paleta Web activa,
  que es la que resolverá el valor al compilar. **Incluida la semilla**: ver §8.1.
- **Preview Real y Generate Web:** comparten `compileDraftToJameData`, así que coinciden por
  construcción. Render medido con el motor real:

  ```
  hex en HTML A : #FFFFFF #E2E8F0 #F1F5F9 #475569 #F8FAFC #1E293B #334155 #2E3440 #ECEFF4 #E5E9F0 #4C566A #123ABC
  hex en HTML B : #FFFFFF #E2E8F0 #F1F5F9 #475569 #F8FAFC #1E293B #334155 #2E3440 #ECEFF4 #E5E9F0 #4C566A #ABC123
  HTML distinto entre paletas : true
  ```

**4. ¿Save/load e importación de Draft JSON preservan la selección?** Sí, los seis casos. Ver
§10. Un `colorToken` se guarda como token id y **nunca** se escribe de vuelta como hex; un
`color` personalizado se guarda como el hex que el autor eligió. Coincide con el contrato de
color §3, fila `card`.

**5. ¿Se sostienen contraste y legibilidad?** **Dos superficies distintas, y se separan.**

- **El cuerpo de la tarjeta está a salvo.** El texto del cuerpo es `#475569` fijo
  (`renderCard.js:133`), el título de modo `clean` es `#1E293B` fijo (`:160`) y el cuerpo de
  `clean` es `#334155` fijo (`:166`). El accent del autor pinta el **filete lateral o superior**
  y el **color del título del encabezado** (`:306` y `:323`). Medido con `#FFFF00`: el cuerpo sigue
  en `#475569` en los cuatro modos.
- **El badge sólido y el avatar de persona NO están a salvo.** `renderCardBadge` en estilo
  `solid` emite `background-color: <color del autor>; color: #FFFFFF` (`renderCard.js:39`), y
  el avatar de `persona` es `background: <color del autor>` sobre `color: white` (`:209`,
  `:277`). Medido: `#FFFF00` se acepta y se pinta, con texto blanco encima. **Sin guarda en
  schema, compilador ni renderer.** Es medición, no juicio de diseño: se enruta al operador
  como checks 9 y 10 del packet. Ver D5.

**6. ¿Funciona top-level?** Sí, medido arriba.

**7. ¿Funciona dentro de los slots de columnas sin romper legibilidad?** Sí; ver §9. Las claves
emitidas en un slot son **idénticas** a las de top-level salvo la metadata de colocación, que se
retira a propósito.

**8. ¿Qué pasa con un token que la paleta activa no define?** **No cae a `ctx`: cae al token por
defecto del mismo id.** Con paleta `[ctx, def, ex]` y `colorToken: 'meta'` la salida es
`color: "#4C566A"`, el `meta` por defecto. La causa está medida por el piloto:
`colorSystem.js:452-490`, `normalizeAuthorColorPalette` unifica la paleta del autor sobre los
nueve tokens por defecto antes de resolver. **Es la DIV-4 del piloto, reproducida idéntica en un
tercer componente**; se reconfirma, no se amplía.

**9. ¿Qué pasa sin paleta activa, y con un draft legacy?**

```
sin paleta activa            -> color=#5E81AC        (el ctx por defecto)
legacy sin clave color       -> hex render: … #5E81AC
legacy con color invalido    -> hex render: … #5E81AC   ('rebeccapurple' rechazado por getHexColor)
```

Nada se rompe. Coincide con el contrato §5.

**10. ¿Qué límites y variantes debe documentar el packet del componente?** Los nueve tokens por
nombre visible, la opción **Personalizado**, y **que un hex personalizado queda congelado y no
sigue a la paleta** — medido: compilado contra dos paletas distintas, la salida es byte a byte
idéntica (`#FF007F` → `#FF007F` en A y en B). Además: los cuatro `cardType` y qué campo aplica a
cada uno, los topes de longitud (título 120, badge 32, valor 80, etiqueta 120, lenguaje 24,
autor 80, rol 100), los **cuatro** modos que el schema acepta contra los **dos** que el editor
ofrece (D2), y que `code` ignora el color.

**Clase asignada: `COLOR_PALETTE_VARIANT_OR_TOKEN_ONLY`.**

Justificación, y **por qué no es la de `iconList`**. El contrato define
`VARIANT_OR_TOKEN_ONLY` como *«A single discrete color control, no multi-role mapping»*. Aquí el
control **es uno solo**: un desplegable por tarjeta (`CardColorField`), que escribe en
`colorToken` **o** en `color`, nunca en los dos. No es `DIRECT_SUPPORT_REQUIRED` porque el color
**no porta el contrato visible del bloque**: una tarjeta se lee igual en cualquier color, su
contrato visible lo porta el `cardType` y el `mode`, y el catálogo la describe por su estructura
—*«jerarquía clara (Título, Ícono, Cuerpo)»*, `blockCatalog.js:172`— no por su color; es la
diferencia exacta con «Lista con etiquetas», cuyo catálogo dice *«código de color»*. Descartada
`CONDITIONAL_OR_BOUNDED`: aunque `code` ignora el color, eso no es un modo en que el color
«deje de aplicar» de forma que el autor deba razonar sobre condiciones — el editor **no ofrece
control de color** para `code` (`WebBlockEditor.jsx:1211-1215`), así que no hay caso acotado que
documentar, hay un campo que no existe. Descartada `NOT_APPLICABLE` porque hay superficie.
Descartada `REQUIRES_FOLLOWUP` porque la superficie está formalizada en el contrato §3 y §4.

---

## 7. S4 — Math and formula compatibility audit

El bloque de diez preguntas del contrato de math §10 se ejecuta **para todo componente**. Para
`card` la fila §5 de la Definition of Done dice `none` en math, y ocho de las diez resultan
vacías. Se responden igual y se declara cuáles son vacías y por qué — resolución I-4.

**1. ¿Expone algún campo de math o fórmula?** **No.** Las claves del bloque son `kind`,
`cardType`, `variant`, `mode`, `icon`, `badge`, `badgeStyle`, `title`, `content`, `value`,
`label`, `lang`, `author`, `role`, `color`, `colorToken`, `fullWidth`, `colSpan`. Ninguna acepta
math. `compiler-api/schemas/draftSchema.js:621-659`. Confirmado por el contrato de math §5, que
lista `card` explícitamente entre los nueve sin campo de math.

**2. ¿Qué superficie de entrada usa cada campo?** VACÍA — no hay campo de math.

**3. ¿Ofrece el editor visual de fórmulas o una entrada de texto plano?** **Ninguno de los dos.**
El campo visual se monta solo para `kind === 'rule'` (contrato de math §8). Medido en
`CardFields` (`WebBlockEditor.jsx:1145-1238`): título, contenido/código, modo, color, etiqueta,
estilo de etiqueta, icono, valor, descripción, lenguaje, autor, rol. **Ninguno de fórmula.**

**4. ¿El compilador emite delimitadores, y de quién son?** VACÍA — nada que delimitar.

**5. ¿Un delimitador autorado se elimina o se duplica?** VACÍA.

**6. ¿El HTML renderizado produce salida KaTeX?** **No, y es correcto.** Si un autor escribe
`\(x^2\)` en el contenido, el compilador lo escapa (`escapeHtmlWithLineBreaks`,
`compiler.js:400`) y el motor no lo envuelve; aparece como texto literal. **No es el patrón de
regresión de math** del contrato §9, porque ese patrón exige un campo `math` que el schema
acepte; aquí no lo hay.

**7. ¿Save/load e importación preservan la fórmula?** VACÍA.

**8. ¿Funciona dentro de los slots de columnas?** VACÍA en cuanto a math; la colocación está
medida en §9 por otra vía.

**9. ¿Qué límites de longitud y forma debe documentar el packet?** VACÍA para math. Los límites
que sí existen son del bloque y se documentan en §5 y en el packet.

**10. ¿Qué texto de fallo ve el autor cuando se rechaza una fórmula?** VACÍA — no hay fórmula.

**Clase asignada: `MATH_FORMULA_NOT_APPLICABLE`.** Cero superficies de math en schema, editor,
compilador y renderer, coincidiendo con la fila §5 de la Definition of Done y con el contrato de
math §5.

---

## 8. LOS TRES PUNTOS DEL OBJETIVO, MEDIDOS

### 8.1 Punto 3 — El síntoma del ítem semilla: **`card` NO lo tiene**

El síntoma medido en «Lista con etiquetas» (su D1): el primer ítem de un bloque nace con un
color escrito a mano en la fábrica de bloques, mientras los que el autor añade siguen la paleta
activa. **Medido en `card`, con archivo y línea:**

| Qué | Ruta y línea | Medición |
|---|---|---|
| Fábrica top-level | `tools/author-lite/editor-ui/src/features/editor/utils/blockFactory.js:16-25` | `colorToken: 'ctx'` — **un token id, no un hex** |
| Fábrica hijo de columnas | `.../blockFactory.js:258-267` | **Idéntica**, byte a byte, a la anterior |
| Fábrica de ítem Slide | `.../blockFactory.js:339-341` | `variant: 'ctx'` — token id; **tampoco** un hex |
| Semilla compilada, paleta A | medición viva | `color=#123ABC` |
| Semilla compilada, paleta B | medición viva | `color=#ABC123` |

```
blockFactory.createDefaultWebBlock('card')  -> {"kind":"card","cardType":"normal","variant":"ctx","mode":"side","title":"Nueva tarjeta","content":"Contenido de la tarjeta.","colorToken":"ctx","badgeStyle":"outline"}
blockFactory (hijo de columnas)             -> idéntico
el semilla lleva un HEX escrito a mano      : false
el semilla lleva un TOKEN ID                : true (colorToken="ctx")
EL SEMILLA SIGUE LA PALETA ACTIVA           : true
las dos factorias de card son identicas     : true
```

**Conclusión medida: `card` no reproduce el síntoma, en ninguna de sus tres factorías.** La
tarjeta recién creada y cualquier tarjeta posterior muestran la misma etiqueta en el desplegable
y siguen la misma paleta. **No hay nada que reparar aquí, ni siquiera pendiente de veredicto.**

Esta medición es insumo de la decisión sobre la pieza compartida: hasta ahora el síntoma está
**confirmado en un componente de diecisiete (`iconList`) y descartado en otro (`card`)**. Quien
tome esa decisión tiene un caso menos que reparar y una razón medida de por qué: el síntoma no
es del archivo `blockFactory.js` en general, es de las entradas que siembran **hex** en vez de
**token id**. **No se repara nada aquí:** esa reparación vive en una pieza compartida por los
diecisiete y tendrá su propio encargo.

### 8.2 Punto 1 — La compuerta de badge compartida con «Tabla», SIN DUEÑO

**Confirmada, con archivo y línea, y NO reparada.**

| Qué | Ruta y línea |
|---|---|
| El conjunto cerrado | `tools/author-lite/compiler-api/services/compiler.js:23` — `const TABLE_BADGE_STYLE_VALUES = new Set(['outline', 'solid']);` |
| Su uso en **«Tarjeta»** | `compiler.js:225-229` (`normalizeBadgeStyle`), llamado desde `buildCardIconBadgeOutput` (`:233`); error en `:228`: `[Compiler] Estilo de badge de card no permitido: <v>.` |
| Su uso en **«Tabla»** | `compiler.js:504-506`; error: `[Compiler] Tabla Web fila N tiene badge.style no permitido.` |

**Pese a llamarse `TABLE_`, gobierna el badge de los dos componentes.** Sus únicas tres
referencias en todo el repo son las tres líneas de arriba.

**Conteo de tests, verificado y no dado por bueno.** El encargo lo resume como «cero tests»;
la medición previa (`RETIRO-RUN-COMPUERTAS-VARIANTE-CANTU.md:151`) es más precisa y es la que se
reconfirma: **cero cobertura de la rama de rechazo**.

```
grep "Estilo de badge|badge.style no permitido|Icono de card no permitido" en tests/  -> 0 coincidencias
grep "TABLE_BADGE_STYLE_VALUES" en todo el repo                                       -> 3, todas en compiler.js
```

La **rama feliz sí está cubierta** (`webTheoryCardsRuleBoxesParitySafety.test.mjs:209` asegura
que `badgeStyle: 'solid'` sobrevive al compilador, y `:250-264` que el **schema** rechaza
`'surface'`). Lo que nadie ejercita es el `throw` de `:228` ni el de `:505`. Y la razón está
medida: el enum del schema (`BadgeStyleEnum`) impide que un valor fuera del conjunto llegue al
compilador por la vía normal, así que la compuerta solo dispara ante una llamada directa al
compilador. **Es una compuerta de defensa en profundidad sin test.**

**NO se reparó**, y no por falta de autorización sino porque **repararla tocaría «Tabla»**, que
es el `queue_order` 31, `planned`. Está declarada como sin dueño y se enruta. La misma nota vale
para `CARD_ICON_VALUES` (`compiler.js:19`, `:132-136`), cuyo error `:134` tampoco tiene test.

### 8.3 Punto 2 — La colisión de nombres en el renderer: **la reparación SIGUE EN PIE**

**El cuerpo de las tarjetas se renderiza correctamente. No hay regresión. No se dispara PARA Y
REPORTA.**

**La superficie de colisión sigue existiendo, y es correcto que exista:**
`renderCard.js:59` desestructura `text` de su data y `:61` hace
`const finalContent = text || content || ''`. Si el compilador emitiera un rol llamado `text`,
ese hex reemplazaría el cuerpo de **toda** tarjeta.

**La reparación vive en el compilador y está documentada en el propio código**
(`compiler.js:157-162`, comentario verbatim):

> El rol `text` se emite como `textColor`, y no como `text`, por una colision MEDIDA: renderCard
> desestructura `text` de su data y lo usa como cuerpo de la tarjeta (`renderCard.js:59-61`,
> `const finalContent = text || content`), asi que emitir `text` reemplazaba el contenido de
> toda card por el hex del rol.

**Verificación viva, no lectura de comentario:**

```
claves emitidas (normal): type, variant, mode, title, content, color, surface, border, textColor, badgeStyle
emite clave 'text'      : false      <- correcto
emite clave 'textColor' : true  valor=#1E293B
el cuerpo aparece en el HTML                     : true
el HTML contiene el hex del rol como cuerpo      : false
persona: cuerpo en HTML : true | metric: valor en HTML : true | code: codigo en HTML : true
cuerpo izq. en HTML de columnas : true | cuerpo der. : true
[simulacion] inyectando 'text' a mano, el cuerpo real desaparece : true
```

La última línea es la prueba de que la medición mide algo: **inyectando `text` a mano en la
salida compilada, el cuerpo desaparece**. Con la salida real del compilador, no desaparece.

**La reparación está además protegida por un test dedicado**, que corre en verde:
`webAuthorPaletteDerivedRolesAndCustomHex.test.mjs:127-145`,
*«the compiled output never carries a bare `text` key: it would overwrite every card body»* —
cubre `card`, `callout`, `header` y `list`, y renderiza la tarjeta para comprobar el cuerpo.

**El check 1 del packet de QA es explícitamente este**, por si la regresión volviera por una vía
que el test no cubre.

---

## 9. S5 — Colocación en columnas

`card` es hijo válido de **«Dos columnas»** en las dos uniones de schema
(`editor-ui:903`, `compiler-api:931`, ambas dentro de una unión `.strict()`), está ofrecido en
el menú de hijos (`WebBlockEditor.jsx:258`, `{ kind: 'card', label: 'Tarjeta' }`), tiene su rama
de editor en slot (`:1903-1905`) y **ruta propia en el motor** (`renderColumns.js:61-62`), sin
respaldo JSON.

**Invariancia de alcance de las opciones de color (contrato §7):** las dos colocaciones montan
**el mismo componente**, `CardFields` → `CardColorField`, con la misma `palette`
(`WebBlockEditor.jsx:1904` y `:3930` pasan `colorPalette={colorPalette}`). No hay dos
implementaciones que puedan divergir. **Las mismas opciones en las dos colocaciones, por
construcción.**

Medición viva, ambos slots, dos paletas:

```
slot left  -> {"type":"card","variant":"ctx","mode":"side","title":"Izquierda","content":"Cuerpo izq.","color":"#123ABC","surface":"#ECEFFA","border":"#ACBAE8","textColor":"#1E293B"}
slot right -> {"type":"card","variant":"ctx","mode":"side","title":"Derecha","content":"Cuerpo der.","color":"#654321","surface":"#F3F0ED","border":"#C9BDB1","textColor":"#1E293B"}
hex columns A : … #123ABC #654321
hex columns B : … #ABC123 #321654
columns HTML sigue la paleta : true
cuerpo izq. en HTML de columnas : true | cuerpo der. : true
hex personalizado en slot -> color:"#FF007F"   (igual que top-level)
```

**Comparación de claves, con los mismos campos en las dos colocaciones:**

```
top-level -> …,"badge":"B","badgeStyle":"outline","fullWidth":true
en slot   -> …,"badge":"B","badgeStyle":"outline"
claves solo en top-level : fullWidth
claves solo en slot      : (ninguna)
placement se retira en slot : true
```

La única diferencia es la metadata de colocación, **retirada a propósito** por
`z.preprocess(stripPlacementMetadata, …)` (`compiler-api:710-713`) y por
`includePlacement: context.isColumnsChild !== true` (`compiler.js:1138`). Coincide con el
contrato de la matriz de certificación (`:189`): *«`fullWidth`/`colSpan` no escapa slots»*.

**Comportamiento de math en slots (contrato de math §10):** NOT_APPLICABLE, sin campo de math.

**Resultado S5: PASS.** Ambas colocaciones registradas.

---

## 10. S6 — Ida y vuelta de persistencia

Parseando dos veces por el schema del compilador, los seis casos que el componente admite:

```
token              | 1a: {"kind":"card","cardType":"normal","variant":"ctx","mode":"side","title":"T","content":"C","colorToken":"ctx","badgeStyle":"outline"}
                   | idempotente: true | clave color: false | clave colorToken: true
hex personalizado  | 1a: {"kind":"card","cardType":"normal","variant":"ctx","mode":"side","title":"T","content":"C","color":"#FF007F"}
                   | idempotente: true | clave color: true  | clave colorToken: false
sin color          | 1a: {"kind":"card","cardType":"normal","variant":"ctx","mode":"side","title":"T","content":"C"}
                   | idempotente: true | clave color: false | clave colorToken: false
metric             | 1a: {"kind":"card","cardType":"metric","variant":"metric","title":"T","value":"1","label":"L","colorToken":"def"}
                   | idempotente: true | clave color: false | clave colorToken: true
code               | 1a: {"kind":"card","cardType":"code","variant":"code","title":"T","content":"x","lang":"JS"}
                   | idempotente: true | clave color: false | clave colorToken: false
persona            | 1a: {"kind":"card","cardType":"persona","variant":"persona","title":"T","content":"C","colorToken":"def","author":"A","role":"R"}
                   | idempotente: true | clave color: false | clave colorToken: true
```

**Los seis idempotentes.** La referencia se guarda como referencia: un `colorToken` nunca se
reescribe como hex, y el hex resuelto se produce al compilar y no vuelve al draft. Un `color`
personalizado sí se conserva, porque ahí el hex **es** el valor autorado. **Es el caso mixto de
los tres componentes medidos hasta ahora**: `list` nunca guarda `color`, `iconList` siempre lo
guarda, `card` guarda uno u otro según lo que el autor eligió. Coincide con el contrato de color
§3, fila `card`. **Resultado S6: PASS.**

---

## 11. S8, S9 y S10 — La compuerta de reparación y lo que este run NO escribió

### 11.1 S8 — El estado de QA registrado, y su reproducción

La Definition of Done §6 coloca `card` en la fila **`EXPLICIT_HUMAN_PASS_PRESERVED`**, junto con
`iconList` y `video`. Es un **PASS**. La proyección (`.aiw/state/component_status.json`, entrada
`card`) registra:

```
human_qa_status : "EXPLICIT_HUMAN_PASS_PRESERVED"
repair_status   : "NO_CURRENT_RUNTIME_REPAIR_IN_THIS_ROUND"
docs_status     : "DOCS_BATCH_PENDING"
blocked_by      : ["docs_batch_pending", "no_web_global_certification_gate"]
```

**Ningún veredicto de QA humana nombra un defecto abierto para este componente.** El
`repair_status` dice literalmente que no hay reparación pendiente. Salida de S8 según el texto:
*«No QA verdict names a defect: NOT_APPLICABLE»*.

**Resultado S8: NA.** Y esa etiqueta **describe mal el estado real**, porque el taller sí midió
siete defectos. Es exactamente el hueco (b) que `iconList` declaró en su §13.1; se adopta su
lectura y no se inventa una tercera.

### 11.2 LOS DEFECTOS MEDIDOS **ANTES** DE TOCAR NADA — siete, ninguno reparado

Por la cláusula *«An observation made by the workshop itself is a measurement to declare, never
a repair authorization»*, y aplicando la resolución del piloto para el hueco que esa cláusula
deja abierto —**pendiente de QA, anotado, no resuelto por criterio propio**—, **los siete van al
operador y ninguno se tocó**:

| # | Defecto medido | Dónde | Por qué NO se reparó |
|---|---|---|---|
| **D1** | **La compuerta de badge sin dueño**: un conjunto cerrado llamado `TABLE_BADGE_STYLE_VALUES` gobierna el `badgeStyle` de «Tarjeta» **y** el `badge.style` de «Tabla», con **cero cobertura de sus dos ramas de rechazo** | `compiler.js:23`, `:227-228` (Tarjeta), `:504-506` (Tabla) | **Repararla tocaría «Tabla»**, `queue_order` 31, `planned`. El encargo lo pone fuera de alcance y la disciplina de un run por carril lo prohíbe. **Declarado y enrutado** |
| **D2** | **El editor ofrece dos modos de cuatro.** `COLUMN_WEB_MODE_OPTIONS` da solo `side` y `top`; el schema, el compilador y el renderer soportan los cuatro (`side`, `top`, `surface`, `clean`), y el **catálogo anuncia «Mode Surface» y «Mode Clean» como casos de uso author-facing**. Además `normalizeCardMode` (`:420`) colapsa a `side` cualquier valor que no sea `top`, así que un draft importado con `mode: "surface"` **se muestra como «Lateral»** y **se reescribe a `side`** si el autor cambia el tipo de tarjeta y vuelve | `WebBlockEditor.jsx:299-302`, `:420`, `:498`, `:1107`; contra `blockCatalog.js:176-177` y `renderCard.js:137-166` | Sin veredicto de QA. Y **ampliar el desplegable a cuatro modos sería ampliar el componente**, que el criterio 5 prohíbe; la alternativa —recortar el catálogo— es escribir documentación de otro carril. **Es el check 11 del packet** |
| **D3** | **La entrada de docs del catálogo describe un campo que el compilador no lee para el color.** Su `jsonSchema` de ejemplo es `{ "kind": "card", "variant": "ctx", … }` y su `validation` enumera las variantes como si `variant` fuera el control de color; el control real es `colorToken`/`color`, y `variant` solo actúa de id de respaldo | `blockCatalog.js:181-182` | Sin veredicto de QA. Es texto author-facing dentro de código; tocarlo es superficie del carril `DOCUMENTATION` y de los runs de la Guía (36 y 37) |
| **D4** | **Una tarjeta de código acepta `badge` y `badgeStyle` en el schema y el compilador los descarta en silencio.** Medido: `{cardType:'code', badge:'B', badgeStyle:'solid'}` compila a `{"type":"card","variant":"code","title":"T","content":"x","lang":"JS"}` — el badge del autor desaparece sin error. `refineWebCard` rechaza `value`/`label`/`author`/`role` para `code` pero **no** `badge`/`icon` | `draftSchema.js:673-691` contra `compiler.js:362-374` | Sin veredicto de QA. Hoy es inalcanzable desde el editor (`CardFields` no ofrece badge para `code`, `:1211-1215`), así que solo muerde por importación de Draft JSON. **La salida es segura**; el defecto es la pérdida silenciosa |
| **D5** | **Texto blanco fijo sobre un color que elige el autor**, sin guarda de contraste en ninguna capa: el badge en estilo `solid` y el avatar de `persona`. Medido: `#FFFF00` se acepta y se pinta con `#FFFFFF` encima | `renderCard.js:39` y `:209`, `:277` | Sin veredicto de QA, y **repararlo sería una decisión de diseño del operador** (¿derivar el color del texto? ¿acotar la gama?). **Es el mismo D2 de «Lista con etiquetas» en otro componente**: se confirma que no es específico de aquel. Son los checks 9 y 10 del packet |
| **D6** | **El renderer lee un campo que ningún schema puede producir**: `data.textScale` (`renderCard.js:65`), que multiplica toda la geometría elástica del bloque | `renderCard.js:65`, consumido en `:213`, `:254`, `:273` y `:325` | Sin veredicto de QA, y **exponerlo sería ampliar el componente**, que el criterio 5 prohíbe. **Es el mismo D6 de «Lista con etiquetas»**, y el piloto ya lo nombró para `list` (`renderList.js:88`). **Tercer componente con el mismo campo huérfano** |
| **D7** | **Dos punteros muertos en el packet canónico** — ver §11.3 | `docs/components/web/CARD.md` | S9 prohíbe a un run de componente escribir el packet |

**Ninguno de los siete es reparable en esta pasada.** D1 por tocar otro componente; D2 y D6 por
ampliar; D3 y D7 por S9; D4 y D5 por falta de autorización de QA, y D5 además por ser decisión
de diseño.

**Y una cosa que NO es defecto, medida y declarada para que no se busque:** el packet canónico
afirma en `CARD.md:58` que *«HTML, scripts, events, and dangerous URLs are refused»*. **Para
`card` eso es verdad** (§5.1). Es la línea que en `LIST.md:56` y `ICON-LIST.md:55` los dos runs
anteriores declararon falsa. **No se hereda su defecto.**

### 11.3 Los dos punteros muertos del packet canónico

Verificados en disco, dentro de `docs/components/web/CARD.md`:

| Puntero | Líneas | Estado | Ruta real |
|---|---|---|---|
| `docs/REFERENCE-DRAFT-JSON.md` | 27, 52 | **NO EXISTE** | `docs/reference/REFERENCE-DRAFT-JSON.md` |
| `docs/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` | 12, 71 | **NO EXISTE** | `docs/archive/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` |

**Son los mismos dos punteros muertos que el piloto declaró en `LIST.md` y `iconList` en
`ICON-LIST.md`. Tercer packet con la misma pareja.** Deriva conocida, fuera de alcance por el
encargo y por S9. Se registran y se enrutan.

### 11.4 S9 y S10

**S9 — PASS.** No se escribió `docs/components/web/CARD.md` ni ninguna fuente del Component
Guide. Las discrepancias del packet (D3, D7 y la ausencia de `badgeStyle` en su lista de campos
de `:34`) quedan **registradas y enrutadas**, no reparadas. Nota: el contenido inline del
Component Guide protegido por `checkComponentGuideTextIntegrity.cjs` cubre `listGuide`,
`headerGuide` y `columnsGuide`; **`card` no tiene contenido inline propio**, así que la
superficie congelada de la DoD §8 no le aplica — y aun así no se escribió nada, porque S9 lo
prohíbe en general.

**S10 — PASS.** `.aiw/docs/docs_index.json` **no se editó**: la Definition of Done se lo llevó
con S9 al carril `DOCUMENTATION`. Conflictos y no-claims verificados intactos:

- `component_status.json` → `source_conflicts[0].conflict_id = "component-list-status-agents-vs-matrix-phase2"`,
  con `resolution: "PRESERVE_AS_DOCUMENTATION_CONFLICT_NOT_CERTIFICATION"`. **Sin tocar.**
- La entrada `card` de la proyección, con sus siete campos de estado, sus dos `blocked_by` y su
  `follow_up_required`. **Sin tocar.**
- `global_no_claims` completo (`web_global_certified`, `slide_global_certified`,
  `generator_safe_global`, `ready_for_human_certification`, `rule_certified`,
  `project_console_certified`, `aiw_managed`). **Sin tocar.**
- El puntero de estado del packet canónico, con sus punteros muertos declarados en §11.3. Sin
  tocar.

---

## 12. Divergencias declaradas — gana el disco, no se edita nada

Regla aplicada, verbatim de la Definition of Done §5: *«a divergence between this table and the
live code is decided by the code, declared in the evidence»*. **Nada se editó**: la matriz de
aplicabilidad, el contrato de color, el packet canónico y el archivo de estado son todos carril
`DOCUMENTATION` o están fuera de alcance por el encargo.

| # | Documento y fila | Lo que dice | Lo que mide el disco |
|---|---|---|---|
| DIV-1 | **DoD §5, fila `card`** | «`colorToken` or `color`» / «Palette-resolves: **yes**» / math «none» | **COINCIDE en las cuatro columnas.** Cero divergencia. Verificado con compilación viva contra dos paletas |
| DIV-2 | **Contrato de color §3, fila `card`** | «token id, or `#RRGGBB`» y «Card fields are mutually exclusive» | **COINCIDE.** La exclusión está en el `refine` y otra vez en el compilador |
| DIV-3 | **Contrato de color §4, fila `card`** | Emite «resolved `color` from `colorToken`, or the authored `color`» | **SE QUEDA CORTA.** Emite además `surface`, `border` y `textColor` (`compiler.js:403`, vía `buildColorRolesOutput:162-170`). Medido: `surface:"#ECEFFA"`, `border:"#ACBAE8"`, `textColor:"#1E293B"`. Es la DIV-3 del piloto reproducida en su propia fila |
| DIV-4 | **Contrato de color §2** | «`surface`, `border`, and `text` are authored… but **no compiler path emits them**» | **FALSA**, y para `card` de forma directa. Ya declarada por el run 19 y por el piloto (su DIV-2); **se reconfirma en un tercer componente** |
| DIV-5 | **Contrato de color §4, orden de resolución, paso 4** | «The fallback token id, `ctx`» | Un id fuera de la paleta del autor resuelve contra el **token por defecto de ese mismo id** (`colorToken:'meta'` → `#4C566A`), no contra `ctx`. DIV-4 del piloto, reproducida idéntica |
| DIV-6 | **DoD §8**, viñeta de renderers reconciliados | «**`header` and `list` are the only reconciled renderers**… every other renderer resolves variants against the hardcoded maps» | **FALSA para `card`.** `renderCard.js:62` toma `directColor = getHexColor(data.color)` y `:306` hace `colorHex = directColor || theme.color`: **prefiere el compilado**. El piloto declaró la misma frase contra el **contrato de color §5**; aquí se declara contra la **viñeta de la DoD**, que es otro documento y sigue sin corregir |
| DIV-7 | **`.aiw/state/component_status.json`, entrada `list`** | `repair_status: POST_CERT_COLOR_UI_REGRESSION_REPAIR_REQUIRED`, `blocked_by: ["color_palette_sync_custom_picker_issue", …]`, `follow_up_required: "Repair/reconcile list color palette sync…"` | **VENCIDO.** El run 20 cerró con QA del operador sobre ese mismo defecto y el archivo sigue afirmándolo. **Se declara; NO se repara** —fuera de alcance— y **NO se toma como precedente**: el estado de `card` se midió de cero. Es la DIV-3 de `iconList`, **reconfirmada un día después sin cambio** |
| DIV-8 | **DoD §6, límite automatizado** | «thirty `*.test.mjs` files… holding 323 top-level `test(` declarations» | Hoy hay **32 archivos** y la suite corre **350 tests**. Declarada por el piloto (DIV-7) y por `iconList` (DIV-6); **se reconfirma sin cambio** |
| DIV-9 | **Matriz de certificación `:130`** | `card` «conserva contrato bounded `colorToken + color`» | **COINCIDE.** Y su etiqueta de plataforma, «Card Web / Tarjeta» (`:98`), coincide con el catálogo |

**DIV-7 es la que el encargo anticipaba, y aparece exactamente como la describía.** Se deja
intacta.

---

## 13. S7 — El packet de QA para el operador

**Ruta:**
`projects/cantu-studio/docs/_historical_run_record/RUN-JAME-WEB-CARD-REVALIDATION-001-OPERATOR-QA-PACKET.md`

Colocado junto a los diez packets de operador ya existentes en ese directorio, siguiendo la
resolución I-2 del piloto. **`.aiw/docs/docs_index.json` no se tocó.**

Es un **packet DELTA**, porque la DoD §6 lo ordena para la fila `EXPLICIT_HUMAN_PASS_PRESERVED`:
cubre solo lo que el PASS antecede —la paleta configurable (`queue_order` 19) y el selector
unificado (16)— más la superficie que la reparación compartida tocó (la colisión del cuerpo).
Trece checks, cada uno con **qué abrir, qué introducir, qué generar, qué se espera ver y qué
significaría que fallara**, y una columna de veredicto vacía.

**El check 1 es el paso explícito sobre el cuerpo de la tarjeta**, por la regresión del punto 2
del objetivo, y su columna «qué significaría que fallara» dice literalmente *«STOP»*.

**Etiquetas de plataforma usadas en el packet, todas derivadas del catálogo, ninguna inventada:**

| Superficie mencionada | Etiqueta | Origen |
|---|---|---|
| `card` | **«Tarjeta»** | `blockCatalog.js:49` y `:165` |
| `columns` | **«Dos columnas»** | `blockCatalog.js:13` y su entrada de docs |
| `table` | **«Tabla»** | `blockCatalog.js:61` y su entrada de docs |
| `iconList` | **«Lista con etiquetas»** | `blockCatalog.js:37` |

**Medición del catálogo, porque el encargo advierte de superficies sin entrada:** los
**diecisiete** componentes tienen etiqueta en `WEB_COMPONENT_UI` (`blockCatalog.js:11-113`) **y**
entrada de docs; ninguno falta. Las entradas de docs son **veinte**: las diecisiete Web más tres
de Slide (`slide-title`/`titleSlide`, `slide-columns`/`columnsSlide`,
`slide-visual`/`visualBlock`), que no son componentes Web. **Lo que sí carece de etiqueta de
plataforma son las piezas compartidas que este record nombra** —`blockFactory.js`,
`colorSystem.js`, `VariantSelect.jsx`, `TABLE_BADGE_STYLE_VALUES`—: son código, no componentes
author-facing, **no tienen etiqueta y no se les inventa ninguna**.

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
ℹ duration_ms 1512.0278
```

**350 de 350. Exacta.** Nada verde se puso rojo.

### 14.2 Los archivos directamente relacionados con `card`

Ocho archivos, corridos aparte como entregable del criterio 6. Criterio de selección, el mismo
que usaron los dos runs anteriores: los que construyen un bloque `kind: 'card'`, más el control
compartido, la colocación en slots y la resolución de tokens.

```
node --test
  webTheoryCardsRuleBoxesParitySafety.test.mjs
  webAuthorPaletteDerivedRolesAndCustomHex.test.mjs
  webLegacyCertifiedColorPaletteReconciliation.test.mjs
  webAuthorPaletteCompilerEngineReconciliation.test.mjs
  webColumnsChildExpansionSafety.test.mjs
  webSharedColorSelectorUnification.test.mjs
  webColorSelectorCustomPicker.test.mjs
  authorLiteColorSystem.test.mjs

✔ WebDraftSchema accepts metric, code and persona cards with safe theory fields
✔ WebDraftSchema accepts Core-style special card variants for fixture parity
✔ top-level card preserves placement metadata through schema and compiler
✔ schema rejects invalid icon, color and placement metadata
✔ supported shared icon catalog ids validate while metric/code ignore legacy icon output
✔ card colorToken resolves against the active Web palette while custom hex remains fixed
✔ columns child card preserves token/custom colors and strips placement metadata
✔ schema rejects invalid colorToken, color/colorToken ambiguity and badgeStyle values
✔ Core renderCard honors selected icon, no-icon and badge style for compiled cards
✔ Core renderCard keeps code dark and persona avatar fixed despite legacy color/icon
✔ legacy card modes remain readable while new defaults avoid invalid preview state
✔ schema rejects event handlers, javascript and data:text/html in card/rule fields
✔ save/load JSON roundtrip preserves new theory card fields
✔ compiler emits structured Core card/rule data without prose fallback
✔ code card content is escaped as text and not emitted as executable raw HTML
✔ Core renderColumns routes special cards and rules without JSON fallback output
✔ the compiled output never carries a bare `text` key: it would overwrite every card body
✔ iconList and card retain their existing bounded color behavior during reconciliation

ℹ tests 103
ℹ suites 0
ℹ pass 103
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 459.5576
```

**103 de 103.** Nada verde se puso rojo.

### 14.3 El aviso del criterio 6, verificado: aserciones ajenas en el mismo archivo

**Confirmado, y son dos archivos, no uno.** Se nombran para que quien repare tenga cuidado:

| Archivo | Con quién convive `card` | Estado de ese componente |
|---|---|---|
| `webTheoryCardsRuleBoxesParitySafety.test.mjs` | **`rule`** (y `callout`, `columns`) en el mismo archivo; varios tests aseguran «card/rule» en una sola aserción (`:369`, `:429`) | «Regla matemática» es `queue_order` **28, `planned`** |
| `webLegacyCertifiedColorPaletteReconciliation.test.mjs:171-209` | **`iconList` en el mismo test**: *«iconList and card retain their existing bounded color behavior during reconciliation»* | «Lista con etiquetas» es `queue_order` 21, **`completed`** |

Además `webAuthorPaletteDerivedRolesAndCustomHex` y
`webAuthorPaletteCompilerEngineReconciliation` mezclan hasta ocho kinds cada uno.
**Ninguna aserción ajena se tocó, porque no se tocó ningún test.**

**No se corrió la suite completa del repo** (`tools/roadmap/tests/` quedó fuera). La lectura de
«suite completa» que se usó es la del piloto, I-3.

---

## 15. HUECOS NUEVOS DEL PROCEDIMIENTO — solo los que los dos runs anteriores no declararon

Ya declarado y **confirmado sin repetir**: S1 sin campo `lane`; S2 nombra los dos schemas y no
ordena compararlos; la partición de las diez preguntas; I-1 a I-6 del piloto; sus huecos (a)
compuerta sin salida para medición propia, (b) `DECLARED`/`NA` sin veredicto, (c) S6 sin decir si
vale citar un test, (d) S9 PASS que no distingue «el packet está bien» de «no lo escribí y anoté
que está mal»; las ocho preguntas vacías de S4 —**cuarto componente seguido sin math**—; y de
`iconList`: (a) S2 nombra cinco capas y hay más, (b) el `NOT_APPLICABLE` de S8 engaña,
(c) el «delta packet» sin criterio, y §13.2 sobre las superficies disjuntas.

Lo que sigue es lo que este componente añade.

### 15.1 ¿Qué paso no fue ejecutable tal como está escrito?

**(a) PRECISIÓN sobre un hueco ya declarado, no hueco nuevo.** `iconList` predijo que
*«`card` y `hierarchy` tienen la misma forma»* — la rama del editor delega en un archivo aparte.
**Medido: para `card` es falso en la topología y verdadero en el efecto.** `CardFields` no vive
en un archivo aparte: vive en el **mismo** `WebBlockEditor.jsx`, líneas 1080-1240, con
`CardColorField` en `:903-990`. Un run que rellene la celda «editor branch» al pie de la letra
citaría **cinco líneas** (`:1903-1905` y `:3929-3930`) y **no habría auditado el control**,
exactamente el mismo fallo que `iconList` describió, pero sin que el salto de archivo lo delate.
**Es la variante más peligrosa**, porque quien busque «un archivo aparte» aquí no lo encuentra y
puede concluir que no hay delegación. Se corrige la predicción y se deja la advertencia para
`hierarchy` (`queue_order` 33).

**(b) NUEVO — S2 no dice qué hacer cuando un `kind` tiene varios sub-tipos con superficies
distintas.** S2 enumera capas —catálogo, rama de editor, los dos schemas, caso del compilador,
renderer, fixture— **una vez por componente**. `card` tiene **cuatro `cardType`** (`normal`,
`metric`, `code`, `persona`) que **no comparten superficie**: cuatro ramas de editor distintas,
cuatro rutas de compilador distintas (`compiler.js:346`, `:362`, `:376`, `:393`), cuatro salidas
de renderer distintas, y campos obligatorios distintos. **`code` ni siquiera tiene superficie de
color.** Rellenar S2 «una vez» produce una celda por capa que es verdadera para una de las
cuatro formas y falsa para las otras. Yo medí las cuatro y lo dije, pero **el texto no lo pide y
un run apurado citaría solo `normal`** — que es además la única forma que la fábrica de bloques
crea. El mismo problema espera en **`table`** (modos `legacy`/`rich`) y en **`narrative`**
(cuatro modos), `queue_order` 31 y 24.

**(c) NUEVO — S3 pregunta por «el contraste» como si el componente tuviera uno.** La pregunta 5
del bloque de color es una sola. En `card` hay **dos regímenes opuestos en el mismo bloque**: el
cuerpo y el título son de color fijo y ningún accent puede volverlos ilegibles, y el badge sólido
y el avatar son blanco fijo sobre un color que el autor elige sin guarda. Una sola respuesta
obliga a elegir cuál contar, y las dos respuestas son ciertas. El piloto respondió «a salvo»
para `list`, `iconList` respondió «en riesgo». **Un run que herede cualquiera de las dos
plantillas responderá mal aquí.** Lo resolví partiendo la respuesta en dos y diciéndolo; es
interpretación mía, no lectura del documento.

### 15.2 ¿Qué criterio de salida faltó?

**NUEVO — S6 no dice si una diferencia de validación entre colocaciones es un fallo de
persistencia.** Medido: `colSpan: 3` **se rechaza top-level y se acepta dentro de un slot**,
porque el hijo de columnas pasa por `z.preprocess(stripPlacementMetadata, …)`, que **borra el
campo antes de validarlo**. El valor inválido no llega al motor —se pierde en el preprocesado—
así que la salida es correcta, pero **el mismo draft es válido o inválido según dónde esté el
bloque, y el autor no recibe error en un caso y sí en el otro.**

Es la **imagen espejo** de la asimetría que declararon los dos runs anteriores: allí un campo
extra se aceptaba top-level y se rechazaba en slot por `.strict()`; aquí un valor inválido se
rechaza top-level y se acepta en slot por `preprocess`. **Las dos asimetrías tienen causas
distintas y direcciones opuestas**, y el criterio de salida de S6 —*«roundtrip evidence
recorded»*— no dice si esto es evidencia de un roundtrip sano o de uno roto. Lo registré como
medición y no como fallo, que es la lectura conservadora, pero es elección mía.

### 15.3 ¿Qué superficies comparte `card` con componentes aún no revalidados, y cuáles las tocará un run posterior?

Medido. **Quedan doce componentes sin revalidar**: «Video» (23), «Texto»/`narrative` (24),
«Nota destacada»/`callout` (25), «Nota desplegable»/`details` (26), «Factorización»/`arithmetic`
(27), «Regla matemática»/`rule` (28), «Comparación guiada»/`split` (30), «Tabla» (31),
«Comparador de conceptos»/`conceptGrid` (32), «Diagrama jerárquico»/`hierarchy` (33),
«Secuencia de pasos»/`timeline` (34) y «Recurso visual»/`visual` (35). Todos `planned`.

| # | Superficie compartida | Con quién, entre los NO revalidados | ¿La tocará un run posterior? |
|---|---|---|---|
| 1 | **`TABLE_BADGE_STYLE_VALUES`** (`compiler.js:23`) | **«Tabla»** (31) | **Sí, y sin dueño.** Ningún run la nombra. El de «Tabla» la tocará si repara su badge, y ese cambio afectará a «Tarjeta» sin que el run de «Tarjeta» exista ya. **Es D1** |
| 2 | **`webTheoryCardsRuleBoxesParitySafety.test.mjs`** | **«Regla matemática»** (28) | **Sí.** 18 tests, varios con aserciones «card/rule» combinadas (`:369`, `:429`). El run 28 tocará las aserciones de `card` si toca las suyas |
| 3 | **`webColumnsChildExpansionSafety.test.mjs`** | `callout` (25), `narrative` (24), `rule` (28), **«Tabla»** (31) | **Sí**, cuatro runs distintos |
| 4 | **`webAuthorPaletteDerivedRolesAndCustomHex.test.mjs`** y **`…CompilerEngineReconciliation.test.mjs`** | `callout` (25), `details` (26), `rule` (28), `split` (30), `table` (31), `conceptGrid` (32) | **Sí**, seis runs. Son los archivos que aseguran la reparación de la colisión del cuerpo (§8.3): **quien los edite puede desproteger `card` sin darse cuenta** |
| 5 | **`src/content/sandbox/test_theory.js`** | `callout` (25), `narrative` (24), `rule` (28), `details` (26) | **Sí**, cuatro runs. Es el fixture que este run cita como evidencia de S2 |
| 6 | **`src/builders/web/partials/renderBadge.js`** | **«Tabla»** (31) y **«Comparación guiada»**/`split` (30) | **Sí.** `renderCard.js:32` cae a él cuando no hay color; `renderTable.js:224` y `renderSplitCard.js:41` lo usan siempre |
| 7 | **`iconLibraryData.js` → `CARD_ICON_SCHEMA_VALUES`** | Ninguno de los doce lo consume hoy; lo consumen los dos schemas, `compiler.js:14` y `server.js:44` | **No por un run de componente.** Su compuerta `CARD_ICON_VALUES` (`compiler.js:19`, `:132-136`) está **sin dueño y sin test de rechazo**, igual que D1 |
| 8 | **`common/VariantSelect.jsx` → `ColorTokenPicker`** | Todos los que tengan control de color | Dueño declarado: `RUN-CANTU-COLOR-SELECTOR-UNIFICATION-001`, `completed` |
| 9 | **`constants/colorSystem.js`** | Todos | **Sin dueño entre los runs de componente.** Es la pieza que el piloto señaló en su D2 |
| 10 | **`blockFactory.js`, `WebBlockEditor.jsx`, los dos `draftSchema.js`, `compiler.js`, `blockCatalog.js`** | **Los doce** | **Sí, todos.** Es la §13.2 de `iconList`: la regla de superficies disjuntas de la DoD §2 enumera superficies documentales y estos archivos son código |

**Lo que NO comparte, y conviene fijarlo:** el control de color de `card` (`CardColorField`,
`WebBlockEditor.jsx:903-990`) **no es el de `list` ni el de `iconList`**. Escribe en **dos campos
mutuamente excluyentes** —`colorToken` **o** `color`—, mientras que `list` y `header` guardan las
dos formas en **un solo campo** (`variant`) y `iconList` guarda siempre hex. El comentario del
schema lo dice verbatim (`editor-ui/src/schemas/draftSchema.js:547-549`):
*«Son las dos formas que card guarda en colorToken y color, aqui en un solo campo porque es el
unico que el compilador lee»*. **No es duplicación pendiente de unificar**, es un contrato
distinto; se declara para que un run posterior no lo lea como deuda.

---

## 16. Validador

Por la vía que no escribe, desde `projects/cantu-studio`:

```
node tools/project-console/validate-project-console-state.mjs
```

```
Project Console state validation passed.
Roadmap v3 prototype: 7 objectives / 28 phases / 66 runs; queue groups needs_human_decision=0 now=1 ready_next=16 later=26 history=23
Roadmap v3 active run derived stages: RUN-JAME-WEB-CARD-REVALIDATION-001=none
Docs indexed: 149
Docs curated primary-visible: 60 of 149 registered
Component statuses: 16
Git provenance episodes: 9
Git history snapshot: 508 commits / 1 branches (1 visible, 0 backup hidden); current=main; run-associated=3; source=local_git_autosync
Roadmap rebase warnings (non-blocking):
- .aiw/roadmap/roadmap.json run RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 depends on RUN-CANTU-ROADMAP-CONTENT-AUDIT-001, which does not resolve in this roadmap. With a single roadmap loaded this cannot be decided: it may be a legal external dependency — a run that lives in another project (CONTRATO §10.d Regla 2) — or a typo in the run id. Both are possible and one loaded roadmap cannot tell them apart; resolve it against the full set of projects to distinguish external from write error.
```

**Total de runs: 66. `history=23`. `ready_next=16`.** El validador reconoce el run activo como
`RUN-JAME-WEB-CARD-REVALIDATION-001`. El aviso no bloqueante de la dependencia externa es el
conocido y legal; **no es hallazgo**.

---

## 17. Las cifras del encargo, verificadas una a una

| Cifra del encargo | Real | |
|---|---|---|
| 66 runs | **66** | exacta |
| `history=23` | **23** | exacta — 23 `completed` contados en el canónico, y el validador coincide |
| `ready_next=17` | **16** | **INEXACTA** — el validador reporta 16 |
| 350 tests en la suite del compilador | **350 de 350** | exacta, y verde |
| 17 componentes | **17** | exacta — `WEB_COMPONENT_UI` (`blockCatalog.js:11-113`) tiene 17 entradas, y la DoD §2 lista los mismos 17 |
| 17 packets | **17** | exacta — 17 archivos en `docs/components/web/` |
| 16 ids en el archivo de estado | **16** | exacta — y el validador lo confirma con `Component statuses: 16`. Falta `columns`, como la DoD §6 declara |

**Seis de siete exactas.** `ready_next` es la única que no cuadra, y su desvío es **sistemático y
predecible**: baja de uno en uno cada vez que un run se cierra. El piloto midió 18 contra un
encargo que decía 19; `iconList` midió 17 contra uno que decía 18; este mide **16** contra uno
que dice 17. **Tercera vez seguida con el mismo desvío de exactamente uno**, y la causa es que la
cifra se copia del encargo anterior sin volver a medir.

---

## 18. En qué status debe quedar el run, y qué falta para llegar ahí

**El run debe quedar `active`**, y este encargo **no lo cambia**. No se re-emitió `.project/`.

El taller terminó su mitad: S1–S6 completos, S7 preparado como delta, S8 medido, S9 y S10
verificados. Falta, en este orden:

1. **La QA humana del operador** con el packet de §13, en particular:
   - **el check 1**, que es la comprobación explícita del cuerpo de la tarjeta y la única con
     una salida de *«STOP»*;
   - **el check 11**, que confirma D2 —dos modos de cuatro en el editor contra cuatro en el
     catálogo— y decide si es defecto o comportamiento aceptado;
   - **los checks 9 y 10**, que son una **decisión de diseño** sobre el contraste del badge
     sólido y del avatar, no un reporte de bug.
2. **Si vuelve PASS**: el cierre, y la decisión —del operador— sobre qué hacer con los siete
   defectos declarados en §11.2 y las nueve divergencias de §12. El taller no toca ninguno.
3. **Si vuelve FAIL** nombrando un defecto: ese defecto entra por S8 **con autorización**, se
   reproduce, y se repara si está en alcance. **Aviso medido, para que la autorización no se dé a
   ciegas:**
   - **D1 no es reparable dentro de este run** ni con autorización: la compuerta de badge toca
     **«Tabla»**, `queue_order` 31.
   - **D5 exige una decisión de diseño del operador**, no una reparación.
   - **D2 y D6 ampliarían el componente**, que el criterio 5 prohíbe.
   Los tres casos caen bajo la condición de PARA Y REPORTA del encargo y deben entrar por su
   propia decisión de alcance, **no por el run que los descubrió**.

**Lo cierra el operador desde la consola global, que es el punto de serialización.**

---

## 19. Archivos escritos — dos, y ninguno más

1. `projects/cantu-studio/docs/_historical_run_record/RUN-JAME-WEB-CARD-REVALIDATION-001-OPERATOR-QA-PACKET.md` (nuevo)
2. `projects/aiw-console/context/aiw-console/records/REVALIDACION-COMPONENTE-TARJETA-CANTU.md` (este record)

---

## 20. Lo que este encargo NO hizo

- **No reparó ningún defecto.** Siete medidos (D1–D7), siete pendientes de veredicto o de
  encargo propio. La compuerta S8 no dio autorización para ninguno.
- **No reparó la compuerta de badge compartida con «Tabla»** ni la de iconos de `card`. Las midió,
  verificó su conteo de cobertura y las declaró sin dueño.
- **No reparó ni tocó la fábrica de bloques.** Midió el síntoma del ítem semilla y lo reportó
  **negativo** para `card`, con archivo y línea, como insumo de la decisión sobre esa pieza.
- **No rehízo el trabajo de paleta ya cerrado** (`queue_order` 16 y 19). Lo verificó como parte
  de S3 y de §8.3: la paleta del autor llega al render, el hex personalizado está normalizado y
  congelado, y la reparación de la colisión del cuerpo sigue en pie y con test. **Cuadra.**
- **No editó la Definition of Done, el contrato de color, el contrato de math, la matriz de
  aplicabilidad, `docs_index.json`, `component_status.json`, la matriz de certificación,
  `docs/components/web/CARD.md` ni ninguna fuente del Component Guide**, pese a las nueve
  divergencias de §12 y a los dos punteros muertos de §11.3.
- **No reparó DIV-7**, el estado vencido de `list` en `component_status.json`, **ni lo tomó como
  precedente**: el estado de `card` se midió de cero.
- **No tocó el canónico**: ni `status`, ni `title`, ni `full_description`, ni `depends_on` de
  ningún run. No insertó, movió ni renumeró. No re-emitió `.project/`. No clasificó ningún run.
- **No amplió el componente.** Mejoras que **se nombran y no se hacen**: ofrecer los modos
  `surface` y `clean` en el desplegable del editor (D2); exponer `textScale` al autor, que el
  renderer ya lee (D6); rechazar `badge`/`icon` en una tarjeta de código en vez de descartarlos
  en silencio (D4); derivar el color del texto del badge sólido y del avatar, o acotar la gama,
  para cerrar D5; poner un test a las dos ramas de rechazo de la compuerta de badge (D1).
  **Ninguna está en el `full_description` ni en la Definition of Done.**
- **No tocó los conjuntos cerrados de variante del compilador** ni el motor Slide, aunque
  `buildCardOutput` tiene ruta Slide (`compiler.js:1249-1251`) y la fábrica siembra un ítem
  `card` de diapositiva (`blockFactory.js:339-341`, `:351`).
- **No corrió la suite completa del repo** (`tools/roadmap/tests/` quedó fuera), no levantó la
  consola ni ningún servidor, no ejecutó git en ninguna forma.
- **No reparó derivas cruzadas conocidas**: el mojibake de los mensajes de error de los dos
  schemas (visible en `El tÃ­tulo del Ã­tem es obligatorio`, `editor-ui/src/schemas/draftSchema.js:294`, y
  `El SVG no puede estar vacÃ­o`, `:304`), los punteros muertos de packets, el CLI local de roadmap, ni los defectos sin dueño
  de los componentes ya revalidados.
- **No propuso la reescritura de la Definition of Done.** §15 mide y reporta; enmendarla es del
  operador y su ejecución es otro run.
- **Ninguna condición de PARA Y REPORTA se disparó.** El canónico casa con el objetivo y el
  título verificó verbatim; **la colisión del cuerpo de la tarjeta NO ha vuelto** (§8.3); las
  divergencias se dejaron resolver declarándolas; **ningún defecto se reparó**, así que ninguno
  exigió tocar una pieza compartida, la compuerta del badge, la fábrica de bloques ni una
  decisión de diseño del operador —aunque §18.3 avisa de que D1, D2, D5 y D6 lo exigirían si el
  operador los autoriza—; y el trabajo no creció más allá de revalidar este componente.

---

## 21. Procedencia

- Canónico: `projects/cantu-studio/.aiw/roadmap/roadmap.json`, 66 runs, leído y **no escrito**.
- Procedimiento: `docs/reference/REFERENCE-COMPONENT-REVALIDATION-DEFINITION-OF-DONE.md`, leída
  entera antes de medir nada.
- Contratos consumidos: `REFERENCE-COLOR-PALETTE-COMPATIBILITY.md` §9,
  `REFERENCE-MATH-FORMULA-COMPATIBILITY.md` §10 y §5.
- Estado previo de QA: `.aiw/state/component_status.json`,
  `docs/archive/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` `:98`, `:130`, `:185`,
  `:309`, `:325`, `:329`.
- Records anteriores, leídos enteros y **obligatorios**, no contexto opcional:
  `PILOTO-REVALIDACION-COMPONENTE-LISTA-CANTU.md`,
  `REVALIDACION-COMPONENTE-LISTA-CON-ETIQUETAS-CANTU.md`.
- Medición previa consultada para la compuerta de badge:
  `RETIRO-RUN-COMPUERTAS-VARIANTE-CANTU.md:151`, `MEDICION-PIEZAS-COMPARTIDAS-COMPONENTES-CANTU.md:426`.
- Packet de QA producido:
  `projects/cantu-studio/docs/_historical_run_record/RUN-JAME-WEB-CARD-REVALIDATION-001-OPERATOR-QA-PACKET.md`.
