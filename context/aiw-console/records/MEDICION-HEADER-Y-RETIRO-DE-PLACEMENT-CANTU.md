# Medición de Header y plan de retirada de los controles de placement

**Proyecto:** cantu-studio
**Run:** `RUN-JAME-WEB-HEADER-REVALIDATION-001` — `queue_order` 15, carril DEVELOPMENT
**Fecha:** 2026-07-30
**Tipo:** Fase de MEDICIÓN (tiempo 1 de 4). Este encargo audita y mide. No repara, no edita
el packet del componente y no registra en el índice.
**Estado declarado del run:** `active` — no lo cierra este encargo.

---

## 1. Guarda de identidad, antes de nada

Derivada del canónico por `queue_order`, no por nombre.

| Comprobación | Valor medido | Fuente |
|---|---|---|
| Canónico | `.aiw/roadmap/roadmap.json`, `schema_version: jame.roadmap_v3.v0.2-progress` | disco, mtime 2026-07-30 17:59:11 |
| `queue_order` 15 → `run_id` | `RUN-JAME-WEB-HEADER-REVALIDATION-001` | ruta `objectives[2].phases[2].runs[0]` — O1 «Cantu Studio Web Components» / O1.P1C «Web Components - Basics» |
| `title` | «Audit and implement the Header component» | coincide exacto con el encargo |
| Carril | DEVELOPMENT | el run no lleva clave `lane`; DEVELOPMENT es `default: true` en `lanes[]` |
| `status` | `active` | canónico |
| `queue_order` 14 | `RUN-CANTU-WEB-COLUMNS-DOC-001`, DOCUMENTATION, **`active`** — el run paralelo | canónico |
| `queue_order` 16 | `RUN-CANTU-WEB-HEADER-DOC-001`, «Verify the Header component packet», DOCUMENTATION, `planned` | canónico |

**La guarda pasa.** Se sigue.

### Texto verbatim del run 15, leído del canónico

- **title:** `Audit and implement the Header component`
- **summary:** `Audit the Header component against the color system, implement what is missing, and verify by human visual QA.`
- **full_description:** `Audit the Header component against the color and palette compatibility contract, using the current component inventory as the starting point. Where the inventory shows the component carries hardcoded or local colors instead of the shared palette, or lacks a required integration point, implement the missing integration. Repair only what the audit and human visual QA show to be a real defect; do not rewrite accepted behavior. Verify the result by human visual QA rather than an automated test suite, since the repository has no test runner.`
- **depends_on:** `RUN-JAME-WEB-COMPONENT-CONTRACT-STANDARDIZATION-001`, `RUN-JAME-WEB-COMPONENT-BASELINE-RECONCILIATION-001`, `RUN-JAME-COLOR-PALETTE-COMPATIBILITY-CONTRACT-001`

**Dos notas sobre el texto del run, ninguna ejecutada:**

1. La última frase repite el error que el piloto ya nombró: dice que el repositorio no
   tiene test runner. Es falso — 33 archivos de test y 296 casos con `node --test`. No se
   corrige: no es de este encargo.
2. El texto manda «implement the missing integration» y «Repair only what the audit and
   human visual QA show to be a real defect». **Este encargo no implementa ni repara**, por
   decisión del operador que parte el run en cuatro tiempos. No es contradicción con el
   texto: el texto describe el run completo, y este encargo es su primer tiempo.

---

## 2. Cifras medidas en esta sesión, ninguna heredada

| Métrica | Antes | Después |
|---|---|---|
| Objetivos / fases / runs | **7 / 28 / 73** | **7 / 28 / 73** |
| Validador (vía que no escribe) | **EXIT 0** | **EXIT 0** |
| `Docs indexed` | **149** | **149** (sin cambio — no se registró nada) |
| `Docs curated primary-visible` | 60 de 149 | 60 de 149 |
| `Component statuses` | **16** | **16** |
| Suite `compiler-api` | **296/296**, EXIT 0 | **296/296**, EXIT 0 |
| `eslint` (editor-ui) | **EXIT 0** | **EXIT 0** |
| Avisos del validador | 1 no bloqueante, arista externa `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001` | el mismo, sin cambio |
| Colas del validador | `needs_human_decision=0 now=2 ready_next=20 later=37 history=14` | idéntico |

Comando de validación: `node tools/project-console/validate-project-console-state.mjs`.
Comando de suite: `node --test "tools/author-lite/compiler-api/tests/*.test.mjs"`.
Comando de lint: `npm --prefix tools/author-lite/editor-ui run lint`.
**No se corrió ninguna suite de `aiw-console`.**

**Sin cobertura nueva.** Este encargo no repara, luego no añade tests. Los 296 son los
mismos casos, verificados dos veces.

---

## 3. Tabla de evidencia por paso — formato §7 de la DoD

```
Component: header    Run: RUN-JAME-WEB-HEADER-REVALIDATION-001 (queue_order 15)    Date: 2026-07-30
```

| Step | Measured against | Result | Evidence |
|---|---|---|---|
| S1 identity | `.aiw/roadmap/roadmap.json` | **PASS** | `RUN-JAME-WEB-HEADER-REVALIDATION-001` + «Audit and implement the Header component»; §1 |
| S2 state audit | catalog / schemas / compiler / renderer / fixture | **PASS** | §4; todas las celdas citadas, cero UNKNOWN |
| S3 color audit | color contract §9 | **PASS** + `COLOR_PALETTE_VARIANT_OR_TOKEN_ONLY` | bloque de auditoría en §5 |
| S4 math audit | math contract §10 | **PASS** + `MATH_FORMULA_NOT_APPLICABLE` | bloque de auditoría en §6 |
| S5 columns placement | top-level + ambos slots | **PASS** | §7; invariancia de scope medida bajo dos paletas |
| S6 persistence | save/load + import | **PASS** | §8; medición propia + `webLegacyCertifiedColorPaletteReconciliation.test.mjs:212-238` |
| S7 human qa | §6 boundary | **PREPARED** | `docs/_historical_run_record/RUN-JAME-WEB-HEADER-REVALIDATION-001-OPERATOR-QA-PACKET.md` |
| S8 repair gate | reproduced QA defects | **DECLARED — defecto reproducido, no reparado** | §9; `WebBlockEditor.jsx:105-128` |
| S9 packet | single-source contract | **NO EJECUTADO — desviación deliberada** | §11; el packet es del run 16 |
| S10 registry + no-claims | docs_index + conflicts | **NO EJECUTADO — un solo escritor** | §12; el run 14 registra ahora mismo |

```
Verdict: READY_FOR_OPERATOR_QA (alcance S1-S8; ver la salvedad de §13)
Open decisions touched: none
```

**Ningún paso se omitió en silencio.** Los ocho ejecutados llevan su criterio de salida;
los dos no ejecutados llevan su razón declarada y su dueño nombrado.

---

## 4. S2 — auditoría del estado actual, cinco capas

Criterio de salida de la DoD: «every layer cell cited or declared». **Cero UNKNOWN.**

| Capa | Medición | Cita |
|---|---|---|
| Catálogo | `header`: `label: 'Encabezado'`, `category: 'basics'`, `rail: true`, `order: 20`. **Sin `disabled`** → habilitado | `blockCatalog.js:18-23` |
| Default de fábrica, top-level | `{ kind:'header', level:2, title:'Nueva sección', subtitle:'', variant:'ctx' }` | `blockFactory.js:14-15` |
| Default de fábrica, hijo de slot | `{ kind:'header', level:3, title:'Nuevo encabezado', subtitle:'', variant:'ctx' }` — **nivel 3, no 2** | `blockFactory.js:236-237` |
| Rama del editor, top-level | `HeaderLevelSelect` + `TextInputField` título + `HeaderColorSelect` + `TextInputField` subtítulo | `WebBlockEditor.jsx:3740-3777` |
| Rama del editor, dentro de slot | `ColumnHeaderLevelSelect` + título + `ColumnRegisteredSelectField` color + subtítulo | `WebBlockEditor.jsx:1699-1728` |
| Schema editor-ui | `WebHeaderSchema`: `kind` literal, `level` coerce 1..3 opcional, `variant` enum opcional, `title` requerido no vacío, `subtitle` opcional | `editor-ui/src/schemas/draftSchema.js:543-549` |
| Schema compiler-api | **Idéntico campo por campo**, mismo mensaje de error | `compiler-api/schemas/draftSchema.js:556-562` |
| Case del compiler | Emite `type`, `level` (`|| 2`), `variant` normalizado, **`color` resuelto contra la paleta**, `title` escapado, `subtitle` si existe | `compiler.js:1061-1069` |
| Renderer | `renderHeader(data)`; prefiere `data.color` si es hex válido, si no cae al mapa legacy por `variant` | `renderHeader.js:29`, preferencia en `:49-52` |
| Ruta dentro de columns | `renderColumns.js:69-72` despacha `header` con `level: item.level ?? 3` | `renderColumns.js:69-72` |
| Fixture sandbox | `test_theory.js`, `test_multimedia.js`, `test_tables.js`, `test_hierarchy.js`, `test_arithmetic.js`, `test_math_walkthrough.js`, `test_theory_complex.js` | ver §4.2 |

### 4.1 Los dos schemas son idénticos entre sí

Comparados campo por campo: mismo `kind`, mismo `level: z.coerce.number().min(1).max(3).optional()`,
mismo `variant: VariantEnum.optional()`, mismo `title` con el mismo mensaje, mismo
`subtitle`. **Cero deriva entre editor-ui y compiler-api para `header`.** La DoD no pide
esta comparación — el piloto ya nombró ese hueco en su veredicto §10.1 — y se hizo igual.

### 4.2 Los fixtures sandbox usan una forma que el Editor no puede producir

`test_theory.js:131-172` construye headers con `variant: "secondary"`, `"no-line"`,
`"secondary no-line"` y `colSpan: 3`. Ninguno es alcanzable desde el Editor:
`VariantEnum` no acepta esas tres cadenas y `colSpan` tiene tope 2. **Y además esos
headers viven dentro de un `columnsSlide`, no de un `columns` Web** — son superficie
Slides, fuera del alcance de este run.

Los headers Web de fixture (`test_multimedia.js:46,49,54`, `test_tables.js:151-155`,
`test_hierarchy.js:96-97`, `test_theory.js:219-238`) usan solo `type`, `level`, `title`,
`subtitle`. **Paridad correcta según la definición del repo**: el output compilado es un
subconjunto válido del contrato del renderer. Se declara; no es defecto.

### 4.3 Hallazgo — tres campos que el renderer lee y el pipeline de autor no produce

El inventario §5 lista seis campos así, para `conceptGrid`, `timeline`, `narrative`,
`hierarchy` y `arithmetic`. **No lista ninguno de `header`. Hay tres.**

| Campo que lee el renderer | Cita | Por qué es inalcanzable |
|---|---|---|
| `data.badge` | `renderHeader.js:33,58-63` | Ningún schema lo declara; el import lo elimina en top-level y lo **rechaza** dentro de slot |
| `data.textScale` | `renderHeader.js:36` | Ídem; ni schema ni compiler lo emiten |
| `level === 0` (rama PORTADA) | `renderHeader.js:55-80` | El schema exige `min(1)`; **importar `level: 0` falla** con «Too small: expected number to be >=1» |

Los tres son alcanzables solo por `jame_data` a mano. El `level: 0` **sí lo emite el
motor**, no el autor: `buildSingleWebLesson.js:112-117` llama `renderHeader({level:0, title, subtitle, badge})`
para la portada de la lección. Es decir, **la rama level 0 y el campo `badge` existen para
la portada del motor, no para el autor** — que es exactamente lo que afirma el packet
actual en su línea 55, y se verificó cierto.

**Es medición, no autorización de reparación** (DoD S8). No se tocó código.

---

## 5. `## Color palette compatibility audit` — bloque obligatorio, contrato §9

**Las diez preguntas van una por una, enumeradas** — convención que el criterio 10 fija y
que el piloto dejó abierta. El contrato las da en una sola frase con punto y coma; la
descomposición en diez filas es la que este record fija para los quince componentes que
faltan.

| # | Pregunta | Respuesta medida |
|---|---|---|
| 1 | ¿Expone campos, variantes, estilos o tokens dependientes de color? | **Sí, uno: `variant`.** Enum de nueve valores, opcional, por defecto `ctx`. `compiler.js:1065-1066` emite `variant` **y** un `color` hex resuelto. Un control discreto, sin mapeo multi-rol |
| 2 | ¿La paleta afecta correctamente al editor? | **No.** `HeaderColorSelect` (`WebBlockEditor.jsx:105-128`) pinta `VARIANT_OPTIONS`, una constante estática de nueve nombres en español (`editorOptions.js:3-13`), y **no recibe `colorPalette`** en ninguna de sus dos ramas (`:3766-3772` y `:1717-1723`). `card` e `iconList` sí lo reciben (`:3860`, `:3866`). Es el defecto registrado; ver §9 |
| 3 | ¿La paleta afecta a Preview Real? | **Sí.** `previewRenderer.js:684-688` llama `compileDraftToJameData` con `webColorPalette`; el server lee la paleta activa por petición (`server.js:832-833`) |
| 4 | ¿La paleta afecta a Generate Web? | **Sí, misma vía, verificado compilando contra dos paletas.** `def` → `#123ABC` con paleta A y `#0A0B0C` con paleta B; `ctx` → `#654321` / `#FFEEDD`; `wrn` → `#AA0011` / `#00FF99`. El HTML difiere: `border-left: N px solid <hex>` cambia en los tres niveles |
| 5 | ¿Save/load preserva la selección? | **Sí, y preserva la referencia, no el color.** Tras roundtrip el bloque conserva `variant` y **no gana clave `color`**. Medición propia §8 + `webLegacyCertifiedColorPaletteReconciliation.test.mjs:212-238` |
| 6 | ¿El import de Draft JSON la preserva? | **Sí, y además limpia.** Importar un nodo ya compilado con `color:'#123ABC'` devuelve `{kind:'header',level:2,variant:'ctx',title:'T'}` — **el hex se elimina**, la referencia sobrevive. Regla del contrato §3 cumplida |
| 7 | ¿Contraste y legibilidad se sostienen? | **No lo decide el taller.** Es juicio visual: va al operador, check 7 del packet de QA |
| 8 | ¿Funciona top-level? | **Sí.** Los tres niveles resuelven la paleta activa; medido en §7 |
| 9 | ¿Funciona dentro de slots de `columns` sin romper legibilidad? | **Sí en resolución; la legibilidad es del operador.** El mismo `variant` da el mismo hex dentro y fuera. Medido en §7 |
| 10 | ¿Qué límites o variantes debe documentar el packet? | Nueve valores de `variant` con `ctx` por defecto; `level` 1..3 y que 0 es del motor; el default de fábrica difiere entre top-level (2) y hijo de slot (3); `title` obligatorio; el desfase del desplegable del editor respecto a la paleta; y que `badge`/`textScale` no son author-facing. **Preparado para el run 16 en §14; este encargo no edita el packet** |

**Clase asignada: `COLOR_PALETTE_VARIANT_OR_TOKEN_ONLY`** — «A single discrete color
control, no multi-role mapping». Justificación: `header` tiene exactamente un control de
color (`variant`), que resuelve a un único rol de la paleta (`accent`) y a un único
elemento visual (la barra izquierda). No es `DIRECT_SUPPORT_REQUIRED` porque no hay mapeo
multi-rol; no es `NOT_APPLICABLE` porque la superficie existe y resuelve.

**Sin divergencia con la matriz §5 de la DoD.** La fila dice «`variant` token / yes». El
disco coincide: el compiler emite `variant` **y** el `color` resuelto, y el renderer lo
prefiere. La excepción §8 de la DoD — «`header` y `list` son los únicos renderers
reconciliados; sus runs verifican que la reconciliación se sostuvo» — **se verificó y se
sostiene** (`renderHeader.js:49-52`).

### 5.1 Criterio 3 del encargo, verificado en disco y no dado por bueno desde el papel

**`header` SÍ resuelve la paleta activa.** Compilado el mismo draft contra dos paletas de
prueba con acentos distintos, tres niveles y cuatro bloques:

| Bloque | Paleta A | Paleta B |
|---|---|---|
| `level 1 / variant def` | `color: #123ABC` | `color: #0A0B0C` |
| `level 2 / variant ctx` | `color: #654321` | `color: #FFEEDD` |
| `level 3 / variant wrn` | `color: #AA0011` | `color: #00FF99` |
| sin `level` ni `variant` | `level: 2, variant: ctx, color: #654321` | `level: 2, variant: ctx, color: #FFEEDD` |

Y el HTML renderizado cambia con ellos: `borders A=["#123ABC","#654321","#AA0011","#654321"]`
frente a `B=["#0A0B0C","#FFEEDD","#00FF99","#FFEEDD"]`. **Es el caso contrario al de
Columns**, cuyo nodo compilado era idéntico bajo las dos paletas.

---

## 6. `## Math and formula compatibility audit` — bloque obligatorio, contrato §10

**`header` no tiene punto de integración math.** Verificado en tres fuentes independientes
antes de responder, como pide el criterio 4:

1. **Inventario §4**: los seis con math son `rule`, `table`, `arithmetic`, `split`,
   `timeline`, `hierarchy`. `header` está nombrado explícitamente entre «the other ten».
2. **Contrato math §5** y **matriz §5 de la DoD**: fila `header` → «none / -».
3. **Medición propia**: el JSON de los cuatro nodos header compilados no contiene la clave
   `math` ni el delimitador `\(` ni `\[`. Claves emitidas, exhaustivas:
   `type`, `level`, `variant`, `color`, `title`, `subtitle`.

| # | Pregunta | Respuesta |
|---|---|---|
| 1 | ¿Expone algún campo math o de fórmula? | **No.** Ninguno, en ninguna de las cinco capas |
| 2 | ¿Qué superficie de entrada usa cada campo? | **Ninguna.** No hay campo, luego ni Superficie A ni B |
| 3 | ¿Ofrece el editor visual de fórmulas o un input de texto? | **Ninguno de los dos.** El campo visual se monta solo para `rule` (`WebBlockEditor.jsx:1815`, `:3893`) |
| 4 | ¿El compiler emite el valor con delimitadores, y quién los posee? | **Vacío.** `header` no emite valor math |
| 5 | ¿Un delimitador escrito por el autor se elimina o se duplica? | **Vacío.** |
| 6 | ¿El HTML renderizado produce salida KaTeX? | **No.** `renderHeader.js` no emite delimitadores en ninguna de sus cuatro ramas |
| 7 | ¿Save/load e import preservan la fórmula? | **Vacío.** |
| 8 | ¿Funciona dentro de slots de `columns`? | **Vacío.** Un header en slot tampoco tiene campo math |
| 9 | ¿Qué límites de longitud y forma debe documentar el packet? | **Ninguno de math.** Los caps por tipo (`compiler.js:37-65`) no incluyen `header` |
| 10 | ¿Qué texto de fallo ve el autor si una fórmula es rechazada? | **Ninguno.** No hay campo que rechazar |

**Clase asignada: `MATH_FORMULA_NOT_APPLICABLE`.**

**No se fabricó ninguna auditoría de math que no aplica.** Las ocho preguntas vacías se
declaran vacías con su razón. Es el segundo componente consecutivo donde ocho de diez
preguntas no producen señal; el hueco que el piloto nombró en su veredicto §10.1 (S4) sigue
abierto y sigue costando lo mismo.

---

## 7. S5 — colocación: top-level y ambos slots

Criterio de salida: «both placements recorded». **Los dos registrados, y con dos paletas.**

| Medición | Top-level | Slot izquierdo | Slot derecho |
|---|---|---|---|
| `variant def`, paleta A | `#123ABC` | `#123ABC` | — |
| `variant wrn`, paleta A | `#AA0011` | — | `#AA0011` |
| `variant def`, paleta B | `#0A0B0C` | `#0A0B0C` | — |
| `variant wrn`, paleta B | `#00FF99` | — | `#00FF99` |

**Invariancia de scope confirmada** (contrato de color §7): el mismo `variant` produce el
mismo hex dentro y fuera de un slot. `columns` propaga el contexto de compilación sin
alterarlo (`compiler.js:1114-1128`), y el HTML de `renderColumns` cambia entre paletas.

**Diferencias reales entre las dos colocaciones, todas de forma y ninguna de color:**

| Aspecto | Top-level | Dentro de slot |
|---|---|---|
| Schema | `WebHeaderSchema` sin `.strict()` → claves desconocidas se **eliminan** en silencio | `WebHeaderSchema.strict()` (`draftSchema.js:889`) → claves desconocidas se **rechazan** |
| Nivel por defecto de fábrica | 2 (`blockFactory.js:15`) | 3 (`blockFactory.js:237`) |
| Nivel si el JSON no trae `level` | 2 (`compiler.js:1064`) | 2 — **el mismo**; el `?? 3` de `renderColumns.js:71` es inalcanzable porque el compiler siempre emite `level` |
| Editor | `HeaderLevelSelect` / `HeaderColorSelect` | `ColumnHeaderLevelSelect` / `ColumnRegisteredSelectField` |

La asimetría strict/no-strict es del schema de `columns`, no de `header`, y ya está
documentada. Se declara porque cambia qué ve el autor al importar.

---

## 8. S6 — persistencia, medición propia

Criterio de salida: «roundtrip evidence recorded». Se hicieron las dos cosas que el piloto
señaló que la DoD no distingue — citar test existente **y** medir en vivo.

**Medición propia (solo lectura, contra schema y compiler reales):**

| Caso | Resultado |
|---|---|
| Import forma Editor `{kind:'header',level:2,variant:'ctx',title,subtitle}` | **OK**, verbatim |
| Import forma sandbox `{type:'header',level:1,...}` | **OK**, `type` normalizado a `kind` |
| Import de nodo ya compilado con `color:'#123ABC'` | **OK**, y **el hex se elimina**: vuelve `{kind,level,variant,title}` |
| `level: 0` | **RECHAZADO** — «Too small: expected number to be >=1» |
| `level: 4` | **RECHAZADO** — «Too big: expected number to be <=3» |
| `title: ''` | **RECHAZADO** — mensaje en §9.2 |
| `variant: 'zzz'` | **RECHAZADO** — «Invalid input» |
| `level: '3'` (string) | **OK**, coercionado a número 3 |
| `badge`, `fullWidth`, `colSpan` en top-level | **OK**, los tres **eliminados** en silencio |
| Los mismos tres dentro de un slot | **RECHAZADOS** — «Bloque 1 (columns): Invalid input» |
| `header` anidado dentro de `header` | **RECHAZADO** |

**Evidencia de test existente:** `webLegacyCertifiedColorPaletteReconciliation.test.mjs:212-238`
(«Draft JSON save/load shape keeps header and list variant while Generate Web emits
compiled color») asserta que tras `WebDraftSchema.parse` el bloque conserva `variant:'ctx'`
y que `Object.hasOwn(bloque,'color') === false`, mientras la salida generada sí lleva
`"color": "#123ABC"`. **La regla del contrato de color §3 se cumple: la referencia sigue
siendo referencia.**

---

## 9. S8 — la puerta de reparación: defecto reproducido, y NO reparado

**Hay veredicto de QA que nombra un defecto**, a diferencia del piloto. La DoD manda
reproducirlo contra código vivo antes de nada. Se reprodujo. **No se reparó**, por el
criterio 8 del encargo.

### 9.1 El defecto registrado, y su reproducción

| Fuente | Lo que registra |
|---|---|
| `.aiw/state/component_status.json`, `header` | `human_qa_status: DROPDOWN_BEHAVIOR_PASSED_FROM_OPERATOR_REPORT_COLOR_DESYNC_OBSERVED` |
| Ídem | `repair_status: HEADER_HIERARCHY_DROPDOWN_REPAIR_COMMITTED_A6B0213F_COLOR_PALETTE_SYNC_OPEN` |
| Matriz `:126` | `POST_CERT_COLOR_UI_REGRESSION_REPAIR_REQUIRED` «after Human QA found hierarchy UI fragility and missing current palette sync/custom picker» |
| Matriz `:184`, `:306`, `:325` | mismas dos mitades, reconciliadas en tres sitios |

Son **dos** items distintos, y su estado vivo difiere:

**(a) Jerarquía como desplegable simple — REPARADO, verificado vivo.**
`HeaderLevelSelect` (`WebBlockEditor.jsx:79-103`) es un `<select>` con `aria-label` y
normalización de valor; su gemelo de columna es `ColumnHeaderLevelSelect`. El commit
`a6b0213f` que la proyección cita está aplicado. **Nada que reproducir.**

**(b) Sincronía de color y selector custom — SIGUE ABIERTO, reproducido.**
`HeaderColorSelect` (`WebBlockEditor.jsx:105-128`) pinta `VARIANT_OPTIONS`, una **constante
estática** de nueve pares valor/etiqueta con nombres en español fijos —
«Morado», «Azul», «Cian», «Dorado», «Champagne», «Verde», «Naranja», «Rojo», «Gris»
(`editorOptions.js:3-13`). **No recibe la prop `colorPalette` en ninguna de sus dos ramas**
(`:3766-3772` top-level, `:1717-1723` dentro de slot), mientras `card` e `iconList` sí la
reciben (`:3860`, `:3866`, `:1799`).

**Consecuencia medida:** si el operador cambia el acento de un token en el editor de
paletas, el compiler emite el color nuevo (§5.1) pero el desplegable del Header sigue
diciendo «Morado» sin muestra de color y sin opción custom. **Editor y salida se desincronizan.**
Es exactamente lo que la proyección llama `COLOR_DESYNC_OBSERVED`.

**No se reparó.** El criterio 8 lo prohíbe y la propia DoD lo respalda: la reparación se
acota a lo que el operador dictamine en su QA. El check 2 del packet pone justo esa
comparación delante de él, dentro de una sola sesión y sin pedirle recordar ningún «antes».

### 9.2 Un segundo defecto, medido por el taller y no registrado por nadie

Al medir el rechazo de `title` vacío (§8) apareció el texto que ve el autor. Los bytes del
archivo son `303 203 302 255` — doble codificación UTF-8 de una `í`. **El mensaje se
muestra con mojibake**: donde debe decir «título» dice «tÃ­tulo».

| Medición | Valor |
|---|---|
| Ubicación | `editor-ui/src/schemas/draftSchema.js:547` y `compiler-api/schemas/draftSchema.js:560`, mismo texto |
| Alcance | **No es de `header`.** 23 ocurrencias de mojibake en el schema de editor-ui y 32 en el de compiler-api |
| Guardián existente | `checkComponentGuideTextIntegrity.cjs` prohíbe exactamente estos marcadores (`U+00C3`, `U+00C2`, `U+00E2`, `U+FFFD`)… pero **solo vigila `ComponentGuide.jsx` y `blockCatalog.js`**. Los dos schemas no están en su lista |

**Observación del taller ≠ autorización de reparación** (DoD S8). Se nombra, se deja
intacta, y se pone delante del operador como check 5 del packet. **Repararla tocaría los
diecisiete componentes y los dos schemas: no es de este run.**

---

## 10. Criterio 5 — dónde viven «Full width» y «Col span», y qué pasa si se retiran

El encargo pide medir, no ejecutar. Se midió, y **la medición contradice la premisa del
propio criterio en dos puntos**. Ambos cambian el plan.

### 10.1 Dónde viven, con ruta y línea

| Pieza | Ruta y línea | Naturaleza |
|---|---|---|
| El componente de UI | `WebBlockEditor.jsx:974-1026` — `PlacementFields`, grupo «Placement avanzado» con el checkbox «Full width» (`:999`) y el selector «Col span» (`:1008`) | **Compartido por forma, no por uso** |
| Su único envoltorio | `WebBlockEditor.jsx:1191-1193` — `RulePlacementFields`, que solo reenvía props | Local a `rule` |
| Sitio de montaje 1 | `WebBlockEditor.jsx:1826`, dentro de `if (block.kind === 'rule')` | `rule` dentro de slot |
| Sitio de montaje 2 | `WebBlockEditor.jsx:3901`, dentro de `{field.kind === 'rule' && ...}` | `rule` top-level |
| Campos de schema | `PlacementMetadataSchema` (`draftSchema.js:551-554`), consumido en **exactamente dos** sitios: `WebCardSchema:685` y `WebRuleSchema:744` | `card` y `rule` |
| Emisión del compiler | `buildPlacementOutput` (`compiler.js:112-127`), llamado desde `buildCardOutput:301` (con guarda `includePlacement`) y `buildRuleOutput:371` (**sin guarda**) | `card` y `rule` |
| Consumidor en el motor | `renderColumns.js:98` — único sitio en todo `src/builders/web/` que los lee | ver §10.3 |

**Primera corrección a la premisa: esos controles NO están en el editor de Header.** En
ninguna de sus dos colocaciones. El editor de Header ofrece cuatro controles y ninguno más:
Jerarquía, Título, Color, Subtítulo. `header` tampoco los tiene en schema, ni el compiler
los emite para él, ni `renderHeader.js` los menciona. **`header` es ajeno a este asunto.**
El único componente que los expone al autor es `rule`. `card` los tiene en schema **sin
control en el editor** — campo huérfano, el espejo del hueco de `columns.title` que el
piloto midió.

### 10.2 Segunda corrección: dentro de slots sí operan, para `rule`

El encargo afirma que «dentro de slots no operan — el schema los rechaza, el compilador los
elimina». **Es cierto para `card` y `callout`; es falso para `rule`**, que es justo el único
que los expone.

| Hijo dentro de slot | Schema | Compiler | Cita |
|---|---|---|---|
| `card` | `WebColumnCardChildSchema` los **elimina** por `stripPlacementMetadata` (`draftSchema.js:687-690`) | no los emite (`includePlacement:false`, `compiler.js:1073`) | test `:244-246` |
| `callout` | los **rechaza** | — | test `webColumnsChildExpansionSafety.test.mjs:150-168` |
| `header` | los **rechaza** (`.strict()`) | no aplica | medición propia §8 |
| **`rule`** | **los acepta** — `WebColumnRuleChildSchema` extiende `WebRuleSchema`, que incluye `PlacementMetadataSchema` | **los emite** — `buildRuleOutput` llama `buildPlacementOutput` sin guarda | test vivo `webTheoryCardsRuleBoxesParitySafety.test.mjs:472`: `assert.equal(ruleChildren[1].colSpan, 2)` |

Verificado además con medición propia: un `rule` con `fullWidth:true, colSpan:2` dentro de
un slot sobrevive el schema **y** sale en el nodo compilado con las dos claves.

### 10.3 Tercera medición, la que decide: en el pipeline del Editor son inertes

`renderColumns.js:98` lee `fullWidth`/`colSpan` **sobre el miembro directo de `data.columns`**.
En el pipeline del Editor ese miembro es siempre el envoltorio `{type:'column', slot, blocks}`
que construye el compiler (`compiler.js:1118-1126`), y ese envoltorio nunca lleva placement.
Los campos del hijo viven un nivel más abajo, en `blocks[]`, donde el renderer no mira.

Medición directa:

| Forma | ¿Aplica `flex: 1 1 100%`? |
|---|---|
| Pipeline del Editor, hijo `rule` con `fullWidth:true, colSpan:2` | **No** |
| Forma sandbox, hijo plano con `colSpan: 2` | **Sí** |
| Forma sandbox, mismo hijo sin `colSpan` | No |

Y el HTML de `renderColumns` sobre el nodo del Editor es **byte-idéntico** con y sin esas
claves. A nivel superior no hay consumidor: ni `buildSingleWebLesson.js` ni ningún partial
de `src/builders/web/partials/` menciona `fullWidth` o `colSpan`.

**Conclusión medida: en el pipeline del Editor, los dos controles no producen ningún efecto
visual, en ninguna colocación.** El consumidor existe y funciona, pero solo para la forma
sandbox de `jame_data` escrita a mano. Esto **refuerza** la decisión del operador con una
razón que su enunciado no contemplaba: no es solo que sean redundantes — es que ya no hacen
nada.

### 10.4 Qué se rompería al retirarlos

Dos alcances distintos, con coste muy distinto.

**Alcance A — retirar solo los controles de UI** (borrar `PlacementFields` y
`RulePlacementFields`, y sus dos sitios de montaje):

| Superficie | Impacto |
|---|---|
| Schema | **Ninguno.** No se toca |
| Drafts guardados | **Ninguno.** Un draft con `rule.fullWidth` sigue validando y compilando igual; el autor deja de verlo |
| Tests | **Ninguno.** Las 45 referencias a `fullWidth`/`colSpan` viven en dos archivos de `compiler-api/tests/`, que prueban schema y compiler. **No hay ningún test de editor-ui** en el repo |
| `eslint` | Hay que borrar también los imports que queden sin uso, o falla |
| Efecto visual | **Ninguno**, por §10.3 |
| Residuo | `rule` y `card` quedan los dos con campos de schema sin control — el patrón de campo huérfano, ahora en dos componentes |

**Alcance B — retirarlos también de schema y compiler:**

| Superficie | Impacto |
|---|---|
| Schema | `WebRuleSchema` es `.strict()`: un draft guardado con `rule.fullWidth` **dejaría de cargar**. Ruptura real de compatibilidad de `Draft JSON v0.2` |
| Drafts guardados | Requiere migración o tolerancia explícita |
| Tests | **Rompe.** 45 referencias en `webColumnsChildExpansionSafety.test.mjs` (18) y `webTheoryCardsRuleBoxesParitySafety.test.mjs` (27), con asserts positivos en `:130-135`, `:404`, `:423-426`, `:472` |
| Sandbox / paridad | `renderColumns.js:98` debe seguir leyéndolos para la forma sandbox; el motor no se toca |

### 10.5 Plan de retirada — REPORTADO, NO EJECUTADO

**No se ejecutó nada de esto.** Es el plan que el encargo pide reportar.

1. **Corregir primero el enunciado de la decisión.** Se tomó sobre la premisa de que los
   controles están en el bloque Header. No lo están. La decisión sigue siendo defendible
   —§10.3 la refuerza— pero su alcance real es `rule`, no `header`.
2. **Ejecutar el Alcance A**, no el B. Coste cero en tests, cero en drafts, cero visual.
3. **No toca a los diecisiete.** El encargo previó que, si fueran compartidos, retirarlos
   sería decisión de alcance ajena. **No lo es**: dos sitios de montaje, un solo `kind`.
   La pieza es reutilizable por forma, pero hoy tiene un único cliente.
4. **Decidir aparte el campo huérfano de `card`**, que ya existe hoy sin control y que el
   Alcance A no crea ni resuelve.
5. **Dueño del ticket:** `rule` tiene su propio run, `RUN-JAME-RULE-COMPONENT-REPAIR-AND-ACTIVATION-001`,
   `queue_order` 33. Es el sitio natural, o un ticket propio si la cabina lo quiere antes.

---

## 11. Criterio 6 — S9 no ejecutado: desviación declarada, con su razón

**`docs/components/web/HEADER.md` no se tocó.** md5 idéntico antes y después
(`90bb753cf028618ebf381cd9383f929b`).

**Es una desviación deliberada de la S9 tal como está escrita.** S9 encarga al run
DEVELOPMENT actualizar el packet del componente. La convención fijada hoy se lo pasa al run
DOCUMENTATION emparejado — para `header`, `RUN-CANTU-WEB-HEADER-DOC-001`, `queue_order` 16.

**Razón:** resuelve la contradicción que el piloto midió en su veredicto §10.3. La §2 de la
propia DoD fija como regla vinculante «Disjoint write surfaces per component… **Two runs
never touch one file**», y S9 hace que el par DEVELOPMENT/DOCUMENTATION escriba el mismo
archivo. Diecisiete veces. La convención elige la §2 sobre la S9, y deja el packet a un
único dueño.

**Consecuencia:** el packet de Header conserva su banner `Last verified: 2026-07-12` y su
entrada de registro sin refrescar. Lo refrescará el run 16, junto con el resto de su
trabajo.

---

## 12. Criterio 7 — S10 no ejecutado: un solo escritor

**Este encargo no escribió en `.aiw/docs/docs_index.json`.** El archivo **sí cambió**
durante la sesión, y lo cambió el run 14. La prueba es de contenido, no de confianza:

| Control | Medición |
|---|---|
| md5 al empezar | `b69f83cffefb0a4448b6be77bdb38f2a` — el valor con que lo dejó el piloto |
| md5 al cerrar | `bc708a5847f66291ea1cd719eb6a0ecb` |
| mtime del cambio | 2026-07-30 18:13:52, minuto y medio después de que el run 14 tocara `COLUMNS.md` |
| Entradas antes / después | **149 / 149** — ninguna añadida ni eliminada |
| Qué entrada cambió | `docs/components/web/COLUMNS.md`: `last_reconciled_by_run` ahora dice **`RUN-CANTU-WEB-COLUMNS-DOC-001`** y su `freshness` pasó a `produced_2026-07-12_reverified_2026-07-30` |
| Entrada de `HEADER.md` | **Intacta**: sigue `produced_2026-07-12`, `DRAFT_PENDING_OPERATOR_CONTENT_QA_2026_07_12`, `last_reconciled_by_run: RUN-CANTU-DOCS-PARALLEL-WAVE-INDEXING-001` |
| Entrada del packet de QA de este encargo | **No existe.** Sin registrar |

La firma del cambio es el propio `run_id` del run 14 escrito dentro de la entrada de
Columns. **Un solo escritor a la vez, §2 de la DoD: el turno era suyo y lo usó.**

**Corrección honesta:** la primera redacción de este record afirmaba que el md5 no había
cambiado. Era cierto en el momento de tomarlo y dejó de serlo antes de cerrar. Vale la
medición de arriba.

**Registro pendiente, declarado:** el packet de QA de §S7 —
`docs/_historical_run_record/RUN-JAME-WEB-HEADER-REVALIDATION-001-OPERATOR-QA-PACKET.md` —
**necesita entrada en el índice y no la tiene**. Queda pendiente para quien tenga el turno de
escritor. Precedente: el piloto sí registró el suyo, y `Docs indexed` pasó de 148 a 149; hoy
sigue en 149 porque este encargo no añadió ninguna.

**Mitad de no-claims de S10, verificada sin escribir:** `.aiw/state/component_status.json`
byte-idéntico (md5 `f591165bbf19862b04433129d9edf2cb`); el conflicto preservado
`component-list-status-agents-vs-matrix-phase2` sigue en `source_conflicts` con una entrada;
`Component statuses: 16` antes y después. **`header` sí tiene entrada** en la proyección —
no es el caso de `columns`.

---

## 13. Salvedad sobre el veredicto

La DoD dice «After S10, the component receives exactly one verdict». **S9 y S10 no se
ejecutaron**, por decisión del operador, luego estrictamente no hay veredicto que emitir
todavía.

Se declara `READY_FOR_OPERATOR_QA` **acotado a S1-S8**: el trabajo de medición está
completo, el packet está en manos del operador, y nada bloquea. No es
`REPAIR_REQUIRED_OWN_SCOPE`: el defecto de §9.1(b) **está dentro** del alcance del propio run
—su `full_description` manda implementar la integración que falte— solo que diferido al
tercer tiempo. No es `BLOCKED_ON_OPEN_DECISION` ni `BLOCKED_ON_MISSING_INPUT`.

**Hueco nuevo de la DoD, que se nombra y no se corrige:** el vocabulario de cinco veredictos
no contempla un run partido en varios encargos. Ninguno de los cinco dice «medición
completa, reparación diferida por decisión del operador». Los cuatro huecos que el piloto
nombró siguen abiertos; este es el quinto.

---

## 14. Preparado para el run 16, no escrito por este encargo

El criterio 10 fija que el bloque de auditoría de color y math va **dentro del packet del
componente**. Este encargo no edita el packet. Lo que sigue es el material listo para que
`RUN-CANTU-WEB-HEADER-DOC-001` lo inserte, en inglés ASCII como exige el Blueprint.

**Bloques de auditoría a insertar** (contenido en §5 y §6 de este record):
`## Color palette compatibility audit` con las diez preguntas **numeradas una por una** y
la clase `COLOR_PALETTE_VARIANT_OR_TOKEN_ONLY`; `## Math and formula compatibility audit`
con sus diez y `MATH_FORMULA_NOT_APPLICABLE`.

**Correcciones de contenido que la medición encontró en el packet actual:**

| Línea | Texto actual | Medición |
|---|---|---|
| `:37` | «As a Columns child with no `level`, it renders at level 3 (component heading).» | **Ambiguo, se cumple por dos vías y falla por una tercera.** Cierto si el bloque se crea desde el menú de hijos (`blockFactory.js:237` siembra 3) y cierto para `jame_data` a mano (`renderColumns.js:71`, `?? 3`). **Falso al importar Draft JSON sin `level`**: el compiler emite 2 (`compiler.js:1064`) y el `?? 3` nunca se alcanza |
| `:12`, `:69` | puntero a `docs/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` | **Roto.** La ruta real es `docs/archive/author-lite/components/…`. Mismo defecto que tenía Columns |
| `:27`, `:50` | puntero a `docs/REFERENCE-DRAFT-JSON.md` | **Roto.** La ruta real es `docs/reference/REFERENCE-DRAFT-JSON.md` |
| `:55` | «level 0 is reserved for the engine-emitted lesson cover» | **Verificado cierto.** `buildSingleWebLesson.js:112-117` |

**Hechos que el packet no tiene y la medición produjo:** el default de fábrica difiere entre
top-level (2) y hijo de slot (3); el desfase del desplegable de color respecto a la paleta
activa; los tres campos engine-only (`badge`, `textScale`, rama `level 0`); que dentro de un
slot el schema es `.strict()` y rechaza claves extra que a nivel superior elimina en
silencio; y los punteros reference-only a los dos contratos de compatibilidad, que el
contrato single-source §3 exige.

**La misma entrada de registro de `HEADER.md` arrastra el puntero roto a la matriz** en su
campo `notes`. También es del run 16.

---

## 15. Defectos ya nombrados que aparecieron en el camino y se dejaron intactos

Ninguno es de este encargo. Se nombran y se dejan.

| Defecto | Dónde apareció | Acción |
|---|---|---|
| Desfase del desplegable de color de Header vs. paleta activa | §9.1(b); proyección y matriz lo registran | **Reproducido, nombrado, intacto.** Va a la QA del operador y al tercer tiempo del run |
| Mojibake en los mensajes de error de los dos schemas | §9.2, medición propia | Nombrado, intacto. Alcance de los diecisiete |
| El guardián de integridad de texto no cubre los schemas | §9.2, `checkComponentGuideTextIntegrity.cjs:6-9` | Nombrado, intacto |
| `card` tiene placement en schema sin control en el editor | §10.1 | Nombrado, intacto |
| `rule` conserva placement dentro de slots, contra la regla general | §10.2 | Nombrado, intacto. Es de `queue_order` 33 |
| Punteros rotos del packet y de su entrada de registro | §14 | Nombrados, intactos. Son del run 16 |
| Texto del run 15 dice que no hay test runner | §1 | Nombrado, intacto. Es de cabina |

---

## 16. Superficies protegidas — md5 antes y después

| Archivo | md5 antes | md5 después | ¿Cambió? |
|---|---|---|---|
| `.aiw/roadmap/roadmap.json` | `ce17883fcf0132acc8f35e1ce2b68dbd` | `ce17883fcf0132acc8f35e1ce2b68dbd` | **No** |
| `.aiw/state/component_status.json` | `f591165bbf19862b04433129d9edf2cb` | `f591165bbf19862b04433129d9edf2cb` | **No** |
| `.aiw/docs/docs_index.json` | `b69f83cffefb0a4448b6be77bdb38f2a` | `bc708a5847f66291ea1cd719eb6a0ecb` | **Sí — escrito por el run 14, no por mí. Ver §12** |
| `docs/components/web/HEADER.md` | `90bb753cf028618ebf381cd9383f929b` | `90bb753cf028618ebf381cd9383f929b` | **No** |
| `docs/components/web/COLUMNS.md` | `d4bea38371d6ad7e798fd604b40b421a` | `d4bea38371d6ad7e798fd604b40b421a` | **No** (ver nota) |
| `…/preview/ComponentGuide.jsx` | `85a80dc96f5f37944dbf12eb4a550dc1` | `85a80dc96f5f37944dbf12eb4a550dc1` | **No** |
| `…/scripts/checkComponentGuideTextIntegrity.cjs` | `0b6c7cbf10fc87b4a25a5ff342583e82` | `0b6c7cbf10fc87b4a25a5ff342583e82` | **No** |

**Nota honesta sobre `COLUMNS.md`:** su **mtime sí se movió** durante esta sesión
(2026-07-30 18:12:14, segundos antes del cierre) mientras su contenido quedó byte-idéntico.
**No fui yo** — nunca lo abrí para escribir; solo tomé su md5. Es el run 14 trabajando en
paralelo sobre su propia superficie. Se declara porque es prueba directa de que los dos
talleres están en vuelo y de que sus superficies son disjuntas.

### `.project/` de cantu-studio — criterio 15

**No se re-emitió.** Los seis archivos tienen mtime 2026-07-30 17:59:11, el mismo minuto que
`.aiw/roadmap/roadmap.json` — escritura atómica de la consola, **anterior a esta sesión**.
md5 sin cambio entre el principio y el final:

| Archivo | md5 |
|---|---|
| `.project/docs_index.json` | `2963fa22050aec383a724e337e0a656d` |
| `.project/git_history.json` | `d5f9c4d8aeaab3be6a41eeea7a1c825b` |
| `.project/guardrails.json` | `ef29fe203fcefb139d0145e0ba7c68b6` |
| `.project/no_claims.json` | `a4415678a12a28fd8085bc47c414d712` |
| `.project/roadmap.json` | `e01696a8ffd3bf4ed44aa324a3b8b86b` |
| `.project/snapshot.json` | `9021fb14615a547c985f50b3170dde2f` |

### Superficies de `aiw-console` — criterio 17

**No se tocó nada salvo escribir este record.** md5 al principio y al final, iguales:

| Ruta (`projects/aiw-console/`) | md5 antes | md5 después |
|---|---|---|
| `.aiw/roadmap/roadmap.json` | `08b9d813d6e3ee31aee464eb02294b61` | `08b9d813d6e3ee31aee464eb02294b61` |
| `context/aiw-console/CONTRATO.md` | `f77ccec64d99f2048d4bde41638cb228` | `f77ccec64d99f2048d4bde41638cb228` |
| `context/DECISIONES.md` | `3f6bdf8816a0b43818519eb3582f6511` | `3f6bdf8816a0b43818519eb3582f6511` |

`context/aiw/`, `.project/` de aiw-console, handoffs, tests y records existentes: sin tocar.
**Columns, su packet y `docs_index.json`: sin tocar.**

---

## 17. Archivos escritos por este encargo, y ninguno más

Verificado con un barrido de todo el repo por mtime, no solo de los directorios esperados.
El barrido de cierre devolvió diez rutas. Siete son de la consola (17:59:11, anterior a la
sesión: `.aiw/roadmap/roadmap.json` y los seis de `.project/`). Dos son del run 14
(`docs/components/web/COLUMNS.md` a las 18:12:14, byte-idéntica, y
`.aiw/docs/docs_index.json` a las 18:13:52, con la entrada de Columns refrescada bajo su
propio `run_id`). **Solo una es mía.**

| # | Archivo | Acción | md5 final |
|---|---|---|---|
| 1 | `docs/_historical_run_record/RUN-JAME-WEB-HEADER-REVALIDATION-001-OPERATOR-QA-PACKET.md` | **Creado** (S7) | `1adf2a37eae904326ec2bcb15cf5eabd` |
| 2 | `../aiw-console/context/aiw-console/records/MEDICION-HEADER-Y-RETIRO-DE-PLACEMENT-CANTU.md` | **Creado** | este record |

**Dos filas, como pedía el criterio 16.** Ningún archivo de código, schema, renderer, test,
packet de componente ni índice fue modificado. Los archivos temporales de medición viven en
el scratchpad de sesión, fuera del repo.

**Records existentes:** había **66** antes de este. Este es el **67**. Sin colisión de
nombre: no existe ningún otro record con `HEADER` ni con `PLACEMENT` en el nombre.

**Cumplimiento del Blueprint** en el packet de QA: inglés ASCII puro verificado con barrido
de bytes (**cero** bytes fuera de rango), banner de status presente, rutas repo-relativas
completas. Este record va en español, como corresponde.

---

## 18. Estado en que debe quedar el run — declaración, no ejecución

**`RUN-JAME-WEB-HEADER-REVALIDATION-001` debe quedar en `active`.**

Vocabulario del contrato, exclusivamente: `planned`, `active`, `blocked`, `completed`.

Razón: es el primero de cuatro tiempos. La medición está completa y el packet entregado,
pero quedan la QA del operador, la reparación acotada y la re-QA. No es `blocked`: nada
impide avanzar, la vía normal es que el operador corra el packet. No es `completed`: eso lo
decide la cabina tras la re-QA.

**No se tocó `status`, ni `progress`, ni `closeout_result` de ningún run.** El canónico está
byte-idéntico (§16). El run 16 sigue `planned` con su `depends_on` intacto.

---

## 19. No-claims de este record

- **No se reparó nada.** Cero archivos de código, schema, renderer o test modificados, aun
  habiendo reproducido un defecto registrado (§9.1) y medido dos más (§9.2, §10.1). La
  cláusula «observación ≠ autorización» de la DoD se aplicó cuatro veces.
- **No se editó el packet del componente.** `HEADER.md` byte-idéntico; es del run 16.
- **Este encargo no escribió en `.aiw/docs/docs_index.json`.** El archivo cambió durante la
  sesión por mano del run 14, con su propio `run_id` en la entrada modificada; el registro
  del packet de QA de Header queda pendiente y declarado (§12).
- **No se retiraron «Full width» ni «Col span».** Se midieron y se planeó su retirada;
  ejecutarla es posterior y de otro run (§10.5).
- **No se certifica nada.** El status de componente conserva su fuente única, la matriz.
  Ningún veredicto de la DoD cambia un status, y este no cambió ninguno.
- **La QA humana no se ejecutó, no se simuló y no se dio por pasada.** Las diez celdas de
  veredicto del packet están vacías por diseño.
- **El estado previo de `header` se cita como evidencia histórica**, no se consume como
  resultado vigente. Citarlo no es un claim de aprobación.
- **No se decide ninguna decisión abierta**: seis del contrato de color, ocho del de math.
  Ninguna tocada.
- **No se corrigió la Definition of Done.** Se le nombra un quinto hueco en §13; corregirla
  es de cabina.
- **No se tocó Columns, su packet ni el índice.** Tampoco `roadmap/roadmap.json` de
  aiw-console, `CONTRATO.md`, `DECISIONES.md`, `context/aiw/`, `.project/`, handoffs, tests
  ni records existentes.
- **No se ejecutó git en ninguna forma**, no se levantaron servidores, no se corrieron
  suites de `aiw-console`, y `.project/` no se re-emitió.
- **El run sigue abierto** hasta que el operador lo cierre desde la consola.
