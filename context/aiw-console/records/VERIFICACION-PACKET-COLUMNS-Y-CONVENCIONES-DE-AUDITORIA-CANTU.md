# Verificación del packet de Columns y fijado de las convenciones de auditoría

**Proyecto:** cantu-studio
**Run:** `RUN-CANTU-WEB-COLUMNS-DOC-001` — `queue_order` 14, carril DOCUMENTATION
**Fecha:** 2026-07-30
**Tipo:** Verificación de documentación contra contrato. No audita el componente.
**Estado declarado del run:** `active` — no lo cierra este encargo.
**Run en paralelo:** `queue_order` 15, `RUN-JAME-WEB-HEADER-REVALIDATION-001`, carril DEVELOPMENT.

---

## 1. Guarda de identidad, antes de nada

Derivada del canónico por `queue_order`, no por nombre.

| Comprobación | Valor medido | Fuente |
|---|---|---|
| Canónico | `.aiw/roadmap/roadmap.json`, mtime 2026-07-30 17:59 | disco |
| `queue_order` 14 → `run_id` | `RUN-CANTU-WEB-COLUMNS-DOC-001` | O1 / O1.P1B |
| `title` | «Verify the Columns component packet» | coincide exacto con el encargo |
| Carril | `DOCUMENTATION`, clave `lane` explícita | canónico |
| `status` | `active` | canónico |
| `depends_on` | `RUN-JAME-WEB-COLUMNS-REVALIDATION-001`, `RUN-JAME-COMPONENT-DOC-SINGLE-SOURCE-CONTRACT-001` | canónico |
| `queue_order` 15 | `RUN-JAME-WEB-HEADER-REVALIDATION-001`, DEVELOPMENT, `active` | canónico |
| `queue_order` 13 | `RUN-JAME-WEB-COLUMNS-REVALIDATION-001`, `completed` | canónico |

**La guarda pasa.** Se sigue.

### 1.1 Texto verbatim del run, leído del canónico

- **title:** `Verify the Columns component packet`
- **summary:** `Verify the Columns component packet against the component-doc single-source contract, repair its two stale pointers, and refresh its status banner and registry entry together.`
- **full_description:** `The Columns packet already exists at docs/components/web/COLUMNS.md and is registered, so what remains is not writing it. Verify the packet against the component-doc single-source contract at docs/docs_management/COMPONENT-DOC-SINGLE-SOURCE-CONTRACT.md, whose Section 6 fixes this duty; repair the two stale pointers it carries, to the certification matrix and to REFERENCE-DRAFT-JSON; and refresh its status banner and its registry entry together. This Run still depends on its implementation run, which remains pending, and it keeps status reference-only.`

### 1.2 Dos frases del run que ya no describen el disco

Se declaran; **no se corrige el canónico**, no es de este encargo.

| Frase del run | Estado medido |
|---|---|
| «This Run still depends on its implementation run, **which remains pending**» | El run 13 está `completed` en el canónico. La dependencia sigue siendo válida; lo que caducó es «pending». |
| «repair the two stale pointers **it carries**» | Correcto y vigente: los dos seguían rotos al empezar esta sesión. Reparados aquí. |

**Nada de lo que el run pide queda fuera de este ticket.** Sus cuatro deberes —verificar
contra el contrato, reparar los dos punteros, refrescar banner y registro juntos, y mantener
el status reference-only— están los cuatro nombrados por el encargo y los cuatro ejecutados.

---

## 2. Cifras medidas en esta sesión, ninguna heredada

| Métrica | Antes | Después |
|---|---|---|
| Validador (vía que no escribe) | **EXIT 0** | **EXIT 0** |
| Objetivos / fases / runs | **7 / 28 / 73** | **7 / 28 / 73** |
| `Docs indexed` | **149** | **149** |
| Entradas reales de `docs.[]` | **149** (contadas, no leídas del validador) | **149** |
| `Docs curated primary-visible` | 60 de 149 | 60 de 149 |
| `Component statuses` | **16** | **16** |
| Avisos del validador | 1 no bloqueante, arista externa `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001` | el mismo, sin cambio |
| Grupos de cola | `needs_human_decision=0 now=2 ready_next=20 later=37 history=14` | idéntico |
| Records existentes en `aiw-console` | **66** | **68** — este y uno del run 15, ver §10 |

Comando de validación: `node tools/project-console/validate-project-console-state.mjs`.

**Las 149 entradas del criterio 6: verificadas.** El encargo decía 149 y el disco dice 149,
contadas sobre el array `docs` del JSON, no tomadas de la línea del validador.

**No se corrió ninguna suite.** `CLAUDE.md` prohíbe correr la suite completa con dos talleres
simultáneos, y el run 15 está en vuelo. Este encargo no tocó código, schema, compiler,
renderer ni tests, así que la suite no aporta señal aquí. Se declara la omisión, no se
simula su resultado.

---

## 3. Verificación del packet contra el contrato, sección por sección

Autoridad de forma: `docs/docs_management/COMPONENT-DOC-SINGLE-SOURCE-CONTRACT.md`.
**Se verifica, no se reescribe.**

| Cláusula del contrato | Veredicto al llegar | Acción |
|---|---|---|
| §2 — un packet canónico por componente en `docs/components/web/<NAME>.md` | **CUMPLE**. Existe, único | Ninguna |
| §2 — «diecisiete packets» | **CUMPLE**. Contados en disco: 17 archivos | Ninguna |
| §2 — el status nunca es verdad del packet; puntero a la matriz | **INCUMPLE**: el puntero existía pero apuntaba a una ruta inexistente | **Reparado** |
| §2 — la evidencia se cita por nombre de archivo exacto, sin claim de aprobación | **CUMPLE**. El runbook de QA se cita con la frase «not a result» | Ninguna |
| §3 — identidad: nombre en UPPERCASE-KEBAB | **CUMPLE**. `COLUMNS.md` | Ninguna |
| §3 — banner de status del Blueprint 4a | **CUMPLE**. `Status` / `Last verified` / `Scope`, pipe-separado, ASCII | Refrescado, ver §6 |
| §3 — tabla de metadatos: draft kind, renderer con ruta completa, clasificación, puntero de certificación | **CUMPLE la forma**, incumple el puntero | **Puntero reparado** |
| §3 — las ocho secciones requeridas, en orden | **CUMPLE**. Las ocho, en el orden exacto de la tabla del contrato | Conservadas, ver §5.1 |
| §3 — «authored by hand»: secciones narrativas, nunca un status | **CUMPLE**. Ninguna sección afirma un status de componente | Ninguna |
| §3 — «derived from real files»: kind, renderer, campos, defaults y límites medidos contra schema/compiler/renderer/fixture | **INCUMPLE en un anclaje**: «each holding one or more child blocks» es falso; el slot admite cero | **Corregido a «zero or more»** |
| §3 — «reference-only»: status, color/math, evidencia | **CUMPLE**. Los tres punteros de referencia estaban presentes | Ninguna |
| §3 — prohibido: claims manuales de status | **CUMPLE**. Cero | Ninguna |
| §3 — prohibido: campos de autor en HTML crudo | **CUMPLE**. Cero | Ninguna |
| §3 — prohibido: campos internos del renderer presentados como de autor | **CUMPLE al llegar**; el run 13 ya había corregido el caso `fullWidth`/`colSpan` | Precisado con medición propia |
| §3 — el packet puede crecer hacia el perfil completo del Blueprint 5.5 dentro de su propio doc run | **Habilitante**. Es la cláusula bajo la que entran los dos bloques de auditoría | Usada, ver §5.1 |
| §4 — encoding: packet Markdown en `docs/components/web/` | **CUMPLE**. Nada migra aquí | Ninguna |
| §5 — los dos consumidores son read-only y no crean status | **CUMPLE**. Este run no tocó ni el Component Guide ni la vista Docs | Ninguna |
| §6 — verificar cada anclaje derivado contra schema, compiler, renderer y fixture | Ejecutado, ver §4 | — |
| §6 — mantener el contrato de secciones | **CUMPLE**. Las ocho intactas y en orden | — |
| §6 — refrescar banner y frescura del registro **juntos** | Ejecutado, ver §6 | — |
| §6 — status reference-only | **CUMPLE**. Sigue siéndolo | — |
| §6 — registro: un solo escritor a la vez | Ejecutado y verificado, ver §7 | — |
| Blueprint 4b — tope duro de 250 líneas | **CUMPLE**. 91 → **145** líneas | Guarda de aborto en la escritura |
| Blueprint — inglés ASCII puro | **CUMPLE**. Barrido de bytes: **0** caracteres fuera de rango, antes y después | Guarda de aborto en la escritura |

**Resultado:** el packet cumplía la forma del contrato salvo en **tres puntos**: el puntero de
certificación roto, el puntero de schema roto y un anclaje derivado falso («one or more»).
Los tres corregidos. No se reescribió ninguna sección que cumpliera.

---

## 4. Los tres hallazgos del run 13, verificados uno a uno contra código vivo

**No se creyó al record.** Cada celda de abajo se midió en esta sesión, ejecutando el schema,
el compiler y el renderer reales, y leyendo el editor. El record del run 13 se leyó entero
antes de tocar nada, y se usó para saber **qué buscar**, no como evidencia.

### 4.1 `columns.title` existe en todas las capas menos en la de edición — **CONFIRMADO**

| Capa | Medición propia | Cita |
|---|---|---|
| Schema compiler-api | `title: z.string().optional()` | `tools/author-lite/compiler-api/schemas/draftSchema.js:932-937` |
| Schema editor-ui | Idéntico, mismo `.length(2)` y mismo mensaje | `tools/author-lite/editor-ui/src/schemas/draftSchema.js:904-909` |
| Fábrica | Siembra `title: ''` | `tools/author-lite/editor-ui/src/features/editor/utils/blockFactory.js:33-41` |
| Compiler | Emite `title` escapado **solo si es truthy**: con título las claves son `type,title,columns`; sin él, `type,columns` | `tools/author-lite/compiler-api/services/compiler.js:1114-1128` |
| Renderer | `<h3 class="j-component-title">` | `src/builders/web/renderColumns.js:118-124` |
| **Editor** | **Cero llamadas a `register(`** en todo el cuerpo de `WebColumnsEditor`, líneas **1918-2311**. Su único `Controller` ata `${baseName}.columns`, nunca `${baseName}.title` | `.../components/web/WebBlockEditor.jsx:1918`, `:1985` |

**Dos precisiones que el record no traía y que sí son medibles:**

- `WebColumnsEditor` **recibe** el prop `register` en su firma (`:1918`) y **nunca lo invoca**.
  No es que falte el cableado: está tendido y sin usar.
- El título derivado que muestra la cabecera del bloque (`getColumnsDerivedTitle`) devuelve
  lo mismo **tenga o no tenga** el bloque un `title` real. Medido: con `title` puesto y sin
  él, devuelve `"Antes / Despues"`. El autor no ve nunca su propio título en el Editor.

Y una tercera, que va al packet como guardrail: el default de fábrica es `title: ''`, que el
compiler trata como ausente. **Un bloque nuevo nunca emite `<h3>`.**

### 4.2 El `<h3>` sale a `#1E293B` fijo y ninguna paleta lo alcanza — **CONFIRMADO**

`renderColumns.js:118-124` emite el estilo inline con `color: #1E293B;` **literal**: no es un
token, no es `var(...)`. Medido compilando el mismo draft contra dos paletas distintas, en su
forma real (array de tokens `{id, accent}`, no el objeto plano):

| Medición | Resultado |
|---|---|
| Acentos de los hijos bajo paleta A | `#123ABC` / `#654321` |
| Acentos de los hijos bajo paleta B | `#0A0B0C` / `#FFEEDD` |
| HTML completo, A vs B | **Difiere** |
| El `<h3>`, A vs B | **Byte-idéntico** |
| `#1E293B` presente en ambos | Sí |
| El `<h3>` referencia alguna CSS var de color | **No** |
| El nodo `columns` lleva `color` / `variant` / `colorToken` | **No, ninguna de las tres** |

**La paleta llega a los hijos y no llega al encabezado.** Es medición, no defecto reparable
por este carril: no hay control de autor detrás del literal. Va al packet como guardrail.

### 4.3 La afirmación falsa sobre `fullWidth` / `colSpan` — **YA NO ESTABA**

El encargo dice que si la afirmación falsa sigue en el packet es lo primero a corregir.
**Medido: ya no estaba.** El run 13 la corrigió en su paso S9 y el texto que encontré decía
lo contrario de lo falso. Se re-midió igualmente contra código vivo, porque el criterio 3
manda verificar contra código y no contra el record:

| Vía | Medición propia |
|---|---|
| Hijo `callout` con `fullWidth` | **Rechazado** por schema. Error exacto: `Unrecognized key(s) in object: 'fullWidth'`. `WebColumnsCalloutSchema` es `.strict()` y no incluye `PlacementMetadataSchema` |
| Hijo `callout` con `colSpan` | **Rechazado**, misma vía |
| Hijo `card` con `fullWidth` + `colSpan` | **Aceptado y despojado**. `WebColumnCardChildSchema` es `z.preprocess(stripPlacementMetadata, ...)`. Claves tras el parse: `kind,variant,title,content` |
| Compiler, hijo `card` de columna | **Despojado otra vez**: `includePlacement: context.isColumnsChild !== true` (`compiler.js:1073`). Claves emitidas: `type,variant,mode,title,content,color` |
| **`card` en top level** con `fullWidth` | **Lo conserva.** La restricción es de la columna, no del hijo |
| Import de bloques con `callout`+`fullWidth` | **Rechazado**: `Bloque 1 (columns): Invalid input` |
| Import de bloques con `card`+placement | Aceptado, **despojado**: `kind,variant,title,content` |
| Renderer | **Sí lee** `fullWidth`/`colSpan` — pero en el **envoltorio de slot** (`renderColumns.js:98`), que el compiler nunca emite. Verificado: inyectando `fullWidth` a mano en el envoltorio, el HTML gana `flex: 1 1 100%`; sin él, no |

**Precisión que corrige al record del run 13:** el record dice que el compiler «los vuelve a
eliminar para todo hijo de columna». Medido: la guarda `isColumnsChild` está **solo en el caso
`card`**; el caso `callout` (`compiler.js:1083`) esparce `buildPlacementOutput(block)` sin
guarda. El efecto neto es el mismo —nada llega, porque el schema ya rechazó el `callout`—
pero la frase precisa es «el compiler lo vuelve a eliminar para un `card` compilado como hijo
de columna». **El packet ahora lo dice así.**

Es el caso exacto de «campo interno del renderer presentado como de autor» que el contrato §3
prohíbe: el campo **existe** en el renderer, y **no** existe para el autor dentro de una
columna. El packet lo separa ahora en dos párrafos.

### 4.4 Anclajes verificados de paso, y una divergencia nueva

| Afirmación del packet | Medición | Veredicto |
|---|---|---|
| «exactly two column slots» | 1 slot y 3 slots rechazados, mensaje `Columnas Web v1 requiere exactamente 2 columnas` | **CUMPLE** |
| «each holding **one or more** child blocks» | El slot es `z.array(...)` sin `.min(1)`; la fábrica siembra `{blocks: []}`; el caso ambos-vacíos es aceptado y está en Guardrails | **DIVERGENCIA. Gana el código: corregido a «zero or more»** |
| Nueve hijos aceptados: Header, List, IconList, Rule, Card, Narrative, Callout, Table, Split | La unión del schema tiene exactamente esos nueve | **CUMPLE** |
| «Split renders only here, never at top level» | `split` como hijo de columna: aceptado. `split` en top level: rechazado, por schema y por import | **CUMPLE** |
| «the one accepted child the add-block menu does not offer» | `COLUMN_CHILD_OPTIONS` (`WebBlockEditor.jsx:244-253`) tiene **8** entradas; falta `split` y solo `split` | **CUMPLE** |
| «Columns cannot be nested inside a column» | `columns` dentro de un slot: rechazado por schema | **CUMPLE** |
| «both slots empty renders as nothing at all» | El renderer devuelve la cadena vacía `""` | **CUMPLE** |
| «the same palette options appear in both slots» | `WebBlockEditor.jsx:3853-3863` pasa `colorPalette` a `WebColumnsEditor`, que lo reenvía al editor de hijos en `:2207` | **CUMPLE** |
| «a child that resolves against the active Web palette keeps resolving against it inside a column» | Save/load: el `variant` del hijo vuelve intacto y **no gana clave `color`**. Import: idem | **CUMPLE** |
| Renderer declarado: `src/builders/web/renderColumns.js` | Existe | **CUMPLE** |
| Fixtures sandbox | `test_theory.js:231,234,235`, `test_theory_complex.js:119-123`, `test_tables.js:152-155` | **Existen** |
| Las 7 rutas repo-relativas citadas por el packet | **7 de 7 resuelven** tras la reparación; 0 rotas | **CUMPLE** |

**Una divergencia nueva encontrada y corregida** («one or more» → «zero or more»), aplicando
el criterio 9: gana el código, se corrige el packet y no el componente.

---

## 5. Las tres convenciones fijadas

### 5.1 El bloque de auditoría vive DENTRO del packet — criterio 4

El contrato de color §9 y el de math §10 exigen cada uno un bloque obligatorio, y ninguno de
los dos dice **dónde vive**. El run 13 lo puso en su record y declaró el hueco. **Aquí queda
fijado: es una sección del packet del componente.**

- **Habilitación formal:** contrato §3, «a packet may grow toward the full profile inside its
  own doc run without changing identity, location, or discipline». Es exactamente este caso.
- **Colocación:** entre `## Similar components` y `## Status and evidence`.
- **Por qué ahí y no al final:** las ocho secciones requeridas conservan su orden relativo en
  ambas lecturas, pero tanto el contrato (que cierra con «Status and evidence») como el
  perfil completo del Blueprint 5.5 (que cierra con «13. Evidence») ponen la evidencia al
  final. Insertar antes conserva las dos. **Es una decisión, y se declara como tal.**
- El packet lleva una frase que lo dice en voz alta, para que los dieciséis packets que
  vienen no vuelvan a decidirlo: «This block and the math block below are sections of this
  packet, not separate files.»

Secciones del packet: **8 → 10**. Las ocho requeridas, intactas y en orden.

### 5.2 Las diez preguntas, una por una — criterio 5

Ambos contratos enuncian sus diez preguntas en **una sola frase con punto y coma**. En el
packet van como **diez entradas separadas y numeradas**, cada una con su respuesta medida.
La partición se declara dentro del propio packet, para que sea auditable:

| Contrato | Cláusulas en la frase | Cómo se llega a diez |
|---|---|---|
| Color §9 | **7** | «the editor, Preview Real, and Generate Web» cuenta como **3**; «save/load and Draft JSON import» cuenta como **2**. 7 − 2 + 3 + 2 = **10**. Es la única partición que da los diez que la sección nombra |
| Math §10 | **10** | Una cláusula por pregunta. No hace falta partir nada |

Clases asignadas, con su justificación medida en el propio packet:

- **`COLOR_PALETTE_NOT_APPLICABLE`** — el nodo compilado no lleva `color`, ni `variant`, ni
  `colorToken`, y bajo dos paletas distintas es idéntico salvo por sus hijos.
- **`MATH_FORMULA_NOT_APPLICABLE`** — el nodo compilado no contiene ninguna clave math ni
  ningún delimitador TeX en todo su JSON.

**Las ocho preguntas vacías de math se declaran vacías con su razón**, no se dejan en blanco
y no se fabrica auditoría que no aplica.

### 5.3 Este run REGISTRA; el run 15 difiere — criterio 6

**Verificado, no supuesto.** El registro admite un escritor a la vez (contrato §6) y había
dos runs en vuelo:

- El run 15 creó su archivo `docs/_historical_run_record/RUN-JAME-WEB-HEADER-REVALIDATION-001-OPERATOR-QA-PACKET.md`
  a las 18:11 y **no lo registró**: `docs_index.json` tiene **0** entradas para esa ruta.
  Difirió el registro, como manda el reparto.
- El respaldo que tomé al empezar era **byte-idéntico** al archivo en el momento de escribir,
  y el conjunto y el orden de rutas no cambió. **Nadie más escribió en la ventana.**

---

## 6. Banner y registro, refrescados juntos

El contrato §6 exige refrescarlos **juntos**, y el criterio 8 exige que `Last verified` solo
se mueva si de verdad se re-verificó.

| | Antes | Después |
|---|---|---|
| Banner `Last verified` | `2026-07-29` | **`2026-07-30`** |
| `freshness` de la entrada | `produced_2026-07-12_reverified_2026-07-29` | **`produced_2026-07-12_reverified_2026-07-30`** |
| `freshness_status` | `DRAFT_PENDING_OPERATOR_CONTENT_QA_2026_07_29` | **`..._2026_07_30`** |
| `last_reconciled_by_run` | `RUN-JAME-WEB-COLUMNS-REVALIDATION-001` | **`RUN-CANTU-WEB-COLUMNS-DOC-001`** |

**La fecha se movió porque se re-verificó de verdad**, no por tocar el archivo: cada anclaje
derivado del packet se midió contra schema, compiler, renderer, editor y fixtures en esta
sesión (§4), y las 7 rutas citadas se comprobaron en disco una por una.

`Status` sigue en `Draft` y `operator_review_status` sigue en `pending`. **Ningún status de
componente cambió.**

---

## 7. Registro — la ceremonia completa

| Control | Resultado |
|---|---|
| Escritor único en la ventana | **Verificado**, §5.3 |
| Entradas antes | **149** — contadas sobre `docs.[]`, no heredadas |
| Respaldo md5 **fuera del repo** | `…/scratchpad/docs_index.BACKUP.json`, md5 `b69f83cffefb0a4448b6be77bdb38f2a`, idéntico al original. Guarda de aborto si no coincidía |
| Roundtrip byte-exacto **antes** de tocar | **Sí.** `JSON.stringify(obj,null,2)` + LF→CRLF + CRLF final reproduce los 323 423 bytes exactos. Guarda de aborto si fallaba |
| Entradas después | **149** |
| Diff a nivel de entradas | **0 añadidas, 0 eliminadas, 1 modificada** |
| Modificada | `docs/components/web/COLUMNS.md` |
| Campos tocados | exactamente **4**: `last_reconciled_by_run`, `freshness`, `freshness_status`, `notes`. Cero añadidos, cero eliminados |
| Claves de la entrada | **Idénticas** antes y después |
| Claves de primer nivel | **Idénticas** antes y después |
| Conjunto y orden de rutas | **Idénticos** antes y después |
| No-ASCII antes / después | **1 / 1** — el guion largo preexistente en el índice 61 684; no se tocó ni se añadió ninguno |
| LF suelto en la salida | **Ninguno**. Termina en CRLF, como el original |
| md5 antes → después | `b69f83cf…` → `bc708a58…` |
| Roundtrip byte-exacto del archivo escrito | **Sí**, releído y re-verificado |

Todas las guardas eran de **aborto**: cualquiera que fallara detenía la escritura sin tocar
el archivo.

### 7.1 Un puntero staleado que también vivía en el registro

La entrada de `COLUMNS.md` llevaba en su `notes` la misma ruta rota de la matriz. **Reparada,
1 ocurrencia.** Es un puntero vivo del registro, no una afirmación histórica.

**Defecto de corpus nombrado y dejado intacto:** la misma ruta rota aparece en **18** entradas
—los diecisiete packets más la entrada de la propia matriz—. Solo se tocó la de `COLUMNS`.
Las otras diecisiete son de sus propios doc runs; tocarlas sería escribir sobre superficies
ajenas con un run 15 en vuelo.

Lo que el run 13 declaró en esas `notes` sobre los dos punteros («LEFT UNTOUCHED… they are the
named scope of `RUN-CANTU-WEB-COLUMNS-DOC-001`») **se dejó verbatim**: era cierto cuando lo
escribió. La resolución se añadió detrás, no encima.

---

## 8. Los dos punteros staleados: medidos y reparados

Verificados rotos en disco antes de tocar nada, y verificados presentes sus destinos.

| Puntero | Ruta que llevaba | ¿Existe? | Ruta real | ¿Existe? | Ocurrencias |
|---|---|---|---|---|---|
| Matriz de certificación | `docs/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` | **No** | `docs/archive/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` | **Sí** | 2 en el packet (líneas 12 y 80) + 1 en el registro |
| Schema de Draft JSON | `docs/REFERENCE-DRAFT-JSON.md` | **No** | `docs/reference/REFERENCE-DRAFT-JSON.md` | **Sí** | 2 en el packet (líneas 26 y 60) |

**Cuatro ocurrencias en el packet, las cuatro reparadas. Una más en el registro, reparada.**

Los dos destinos son además los correctos por contenido, no solo por existencia:

- La matriz se declara «Fuente de verdad del estado de certificación de componentes Web
  Author Lite», y es la ruta exacta que el contrato §2 nombra como fuente única de status.
- `REFERENCE-DRAFT-JSON.md` es el «Draft JSON Reference», con fila propia de `columns`
  (`:54`, `:94`) y con la regla de que `split` no es top-level (`:44`) — justo aquello para
  lo que el packet lo cita.

**Ninguno de los dos lo había reparado el run 13.** Su record lo declara explícitamente en su
§10.3 y §15, y se comprobó en disco: al empezar esta sesión seguían rotos los cuatro.

---

## 9. Qué dejó hecho el run 13 y qué se midió en vez de rehacer

| Cosa | Estado al llegar | Acción de este run |
|---|---|---|
| Los dos punteros rotos | **Intactos**, como el run 13 declaró | **Reparados**, §8 |
| Afirmación falsa sobre `fullWidth`/`colSpan` | **Ya corregida** por su S9 | **Re-medida contra código vivo** y precisada: la segunda poda del compiler es solo del caso `card` |
| `title` sin control de edición | Documentado | **Re-medido** y ampliado: `register` recibido y no invocado; el título derivado se muestra tenga o no `title` |
| `<h3>` a color fijo | En Guardrails | **Re-medido** bajo dos paletas y precisado: es un literal sin control de autor detrás |
| `split` no ofrecido en el menú | Documentado | **Re-medido**: 8 de 9 |
| Ambos-vacíos renderiza nada | Documentado | **Re-medido**: cadena vacía |
| Punteros reference-only de color y math | Añadidos por él | Verificados: los 3 destinos existen |
| Banner `Last verified` 2026-07-29 | Movido por él | **Movido a 2026-07-30**, con re-verificación real |
| Entrada del registro | Refrescada por él | **Refrescada de nuevo**, junto con el banner |
| Verificación contra el contrato | «Hecha parcialmente», por su propia declaración | **Rehecha entera**, cláusula por cláusula, §3 |

**No se rehizo nada que estuviera bien.** Se midió, se declaró qué cumplía y se tocó solo lo
que no cumplía.

---

## 10. Archivos escritos por este encargo, y ninguno más

Verificado con un barrido por mtime de **todo el repo**, no solo de los directorios esperados.

| # | Archivo | Acción | md5 final |
|---|---|---|---|
| 1 | `docs/components/web/COLUMNS.md` | **Editado** | `1aa25047cd98a74df3975bf7c0e54a56` |
| 2 | `.aiw/docs/docs_index.json` | **Editado** | `bc708a5847f66291ea1cd719eb6a0ecb` |
| 3 | `../aiw-console/context/aiw-console/records/VERIFICACION-PACKET-COLUMNS-Y-CONVENCIONES-DE-AUDITORIA-CANTU.md` | **Creado** | este record |

**Ningún archivo de código, schema, compiler, renderer, test o fixture fue modificado.** Dos
archivos tocados en `cantu-studio`, más este record fuera del repo. Los archivos de medición
viven en el scratchpad de sesión, fuera del repo.

**Dos archivos creados durante la ventana no son míos, y son los dos del run 15:**

- `docs/_historical_run_record/RUN-JAME-WEB-HEADER-REVALIDATION-001-OPERATOR-QA-PACKET.md`,
  mtime 18:11, en `cantu-studio`.
- `context/aiw-console/records/MEDICION-HEADER-Y-RETIRO-DE-PLACEMENT-CANTU.md`, mtime 18:18,
  en `aiw-console`.

Ninguno se tocó, ninguno se registró y de ninguno se leyó el contenido.

**Records existentes:** había **66** al contarlos, antes de escribir. Este es el **67** de esa
cuenta. El directorio cierra en **68** porque el record del run 15 aterrizó en el mismo minuto
que el mío; el orden dentro de ese minuto no es distinguible y no se afirma. Sin colisión de
nombre: ningún record empieza por `VERIFICACION-PACKET`, y el único que lleva `COLUMNS` es el
del run 13.

**Cumplimiento del Blueprint** en el packet: inglés ASCII puro verificado con barrido de bytes
(**0** caracteres fuera de rango), banner de status presente, 7 de 7 rutas repo-relativas
completas y resolubles, **145** líneas contra un tope de 250. Este record va en español.

---

## 11. Superficies protegidas — md5

### 11.1 `cantu-studio`

| Archivo | md5 antes | md5 después | ¿Cambió? |
|---|---|---|---|
| `.aiw/roadmap/roadmap.json` | `ce17883fcf0132acc8f35e1ce2b68dbd` | `ce17883fcf0132acc8f35e1ce2b68dbd` | **No** |
| `.aiw/state/component_status.json` | `f591165bbf19862b04433129d9edf2cb` | `f591165bbf19862b04433129d9edf2cb` | **No** |
| `.project/docs_index.json` | `2963fa22050aec383a724e337e0a656d` | idem | **No** |
| `.project/roadmap.json` | `e01696a8ffd3bf4ed44aa324a3b8b86b` | idem | **No** |
| `.project/snapshot.json` | `9021fb14615a547c985f50b3170dde2f` | idem | **No** |
| `.project/git_history.json` | `d5f9c4d8aeaab3be6a41eeea7a1c825b` | idem | **No** |
| `.project/guardrails.json` | `ef29fe203fcefb139d0145e0ba7c68b6` | idem | **No** |
| `.project/no_claims.json` | `a4415678a12a28fd8085bc47c414d712` | idem | **No** |
| `docs/docs_management/COMPONENT-DOC-SINGLE-SOURCE-CONTRACT.md` | `0e44a1dcaef5c453ec9679f456742503` | idem | **No** |
| `docs/components/web/HEADER.md` | — | `90bb753cf028618ebf381cd9383f929b` | **No tocado** |
| `docs/archive/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` | — | `98ff0db52cbc80ffdf74278a5f9da39b` | **No tocado** |
| `docs/reference/REFERENCE-DRAFT-JSON.md` | — | `6c77c64376b558eb75ffdc8e440c7574` | **No tocado** |
| `docs/_historical_run_record/RUN-JAME-WEB-COLUMNS-REVALIDATION-001-OPERATOR-QA-PACKET.md` | — | `d65dc897d46f346197c65c5e91b59187` | **No tocado**, coincide con el md5 que declaró el run 13 |
| `.aiw/docs/docs_index.json` | `b69f83cffefb0a4448b6be77bdb38f2a` | `bc708a5847f66291ea1cd719eb6a0ecb` | Sí, §7 |
| `docs/components/web/COLUMNS.md` | `d4bea38371d6ad7e798fd604b40b421a` | `1aa25047cd98a74df3975bf7c0e54a56` | Sí, §3-§8 |

**`.project/` de cantu-studio: no se re-emitió** (criterio 15). Sus seis archivos tienen mtime
**2026-07-30 17:59**, el mismo minuto que `.aiw/roadmap/roadmap.json` — es la escritura
atómica de la consola, **anterior** al inicio de esta sesión, y sus md5 no se movieron.

**Consecuencia declarada:** `.project/docs_index.json` queda desfasado respecto a
`.aiw/docs/docs_index.json` en la entrada refrescada. Es lo normal —solo la consola re-emite
`.project/`— y se resuelve cuando la cabina cierre el run.

**Superficies de Header: intactas.** `HEADER.md` no se tocó, su entrada del registro no se
tocó, y la ruta rota que también lleva se dejó como está: es del `queue_order` 16.

### 11.2 `aiw-console` — hilo paralelo

| Ruta (`projects/aiw-console/`) | mtime | md5 |
|---|---|---|
| `roadmap/roadmap.json` | 2026-07-30 16:19 | `b0080299491eac173eeca4aa0f14ef40` |
| `context/aiw-console/CONTRATO.md` | 2026-07-27 15:48 | `f77ccec64d99f2048d4bde41638cb228` |
| `context/DECISIONES.md` | 2026-07-28 14:10 | `3f6bdf8816a0b43818519eb3582f6511` |
| `.project/` (6 archivos) | 2026-07-30 16:46 | re-emitidos por el hilo paralelo, no por mí |
| `context/aiw/` | contenido de 2026-07-10 a 07-28 | sin tocar |

**Salvedad honesta:** para estas rutas el md5 se tomó a mitad de sesión, no al principio. La
prueba de no-modificación es el **mtime anterior al inicio de esta sesión** (lo más reciente
es 16:46; mi primera escritura fue a las 18:12), no un par antes/después estricto.

Tests, handoffs y records existentes de `aiw-console`: **sin tocar**. No se corrió ninguna
suite de `aiw-console`.

---

## 12. Estado en que debe quedar el run — declaración, no ejecución

**`RUN-CANTU-WEB-COLUMNS-DOC-001` debe quedar en `active`.**

Vocabulario del contrato, exclusivamente: `planned`, `active`, `blocked`, `completed`.

Razón: el trabajo del taller está completo —packet verificado cláusula por cláusula, los dos
punteros reparados, los dos bloques de auditoría dentro del packet, banner y registro
refrescados juntos, validador en EXIT 0—. **No es `blocked`:** nada lo impide, no queda
dependencia sin resolver. **No es `completed`:** eso lo decide la cabina desde la consola,
y el `operator_review_status` de la entrada sigue en `pending`.

**No se tocó `status`, ni `progress`, ni `closeout_result` de ningún run.** El canónico está
byte-idéntico (§11.1).

---

## 13. No-claims de este record

- **No se auditó el componente Columns.** Eso fue del run 13 y su QA la aprobó el operador.
  Este run verificó **la documentación**. Cero archivos de código, schema, compiler, renderer,
  test o fixture modificados.
- **No se certifica nada.** El status de componente conserva su fuente única, la matriz.
  Ningún status cambió y ninguna puerta se otorgó.
- **La QA humana no se ejecutó, no se simuló y no se dio por pasada.** El runbook del run 13
  se cita como runbook, no como resultado.
- **No se tocó Header ni ningún otro componente ni su packet.** El run 15 está en vuelo sobre
  Header; sus superficies quedaron intactas y verificadas por md5.
- **No se retiró «Full width» ni «Col span» de ningún editor.** Eso es del carril DEVELOPMENT.
- **No se editaron** los contratos de referencia, la Definition of Done, el Blueprint ni el
  modelo canónico.
- **No se editó el canónico**, no se cambió ningún status, no se insertaron, movieron ni
  renumeraron runs, no se aplicó `barrier` y no se resolvió la arista externa.
- **No se re-emitió `.project/`** de ningún proyecto.
- **No se ejecutó git en ninguna forma**, no se levantaron servidores, no se corrió ninguna
  suite.
- **Las diecisiete entradas restantes con la ruta rota de la matriz se nombran y se dejan
  intactas**: son de sus propios doc runs.
- **La partición en diez de las preguntas del contrato de color es una decisión declarada**,
  no una lectura literal del contrato: la sección las da en prosa.
- **La colocación de los bloques de auditoría dentro del packet es una decisión declarada**,
  habilitada por el contrato §3 pero no ordenada por él.
- **El run sigue abierto** hasta que el operador lo cierre desde la consola.
