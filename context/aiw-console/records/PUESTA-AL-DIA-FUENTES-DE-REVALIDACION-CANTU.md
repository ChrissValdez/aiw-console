# Puesta al día de las dos fuentes que lee todo run de revalidación de componente

**Proyecto:** cantu-studio
**Run:** `RUN-CANTU-REVALIDATION-SOURCES-REFRESH-001` — `queue_order` 39
**Fecha:** 2026-08-08
**Tipo:** Reparación de documentación y de proyección de estado. No audita ningún componente, no toca código.
**Estado declarado del run:** `active` — no lo cierra este encargo. La cabina cierra.
**Packet de QA de operador:** ninguno. Nada visible al autor cambió. Se entrega resumen de veredicto.

---

## 1. Guarda de identidad

Derivada del canónico por `queue_order`, no por nombre. El `run_id` no se tecleó: se leyó.

| Comprobación | Valor medido | Fuente |
|---|---|---|
| Canónico | `.aiw/roadmap/roadmap.json` | disco |
| Runs en el canónico | 76, en 7 objetivos / 28 fases | derivado |
| `queue_order` 39 → `run_id` | `RUN-CANTU-REVALIDATION-SOURCES-REFRESH-001` | canónico |
| `title` | `Refresh the revalidation procedure and the component status registry against measured state` | **coincide exacto** con el encargo |
| `status` | `active` | canónico |

**La guarda pasa.** Se sigue.

El aviso de coordenadas del encargo se respetó: todo `#N` se derivó del canónico en el
momento de medir, y ninguna cifra de este record procede de un `#N` citado por otro
documento del repo.

---

## 2. Barrido de `docs/reference/REFERENCE-COMPONENT-REVALIDATION-DEFINITION-OF-DONE.md`

**413 líneas al empezar — verificado.** (461 al terminar; el documento creció por las
correcciones, no se recortó nada.)

Se recorrió cada afirmación que habla del estado del código y se midió contra disco. No se
corrigió nada de memoria.

### 2.1 Afirmaciones medidas y **verdaderas** — no se tocaron

| Afirmación | Medición |
|---|---|
| Diecisiete componentes, veintidós runs: 17 DEVELOPMENT + 5 DOCUMENTATION | 17 runs de componente (`queue_order` 13, 15, 20-24, 31-33, 35, 38, 40-44) + 5 de documentación (`RUN-CANTU-WEB-COLUMNS-DOC-001` q14 + cuatro batches q47-q50). **22.** Canónico |
| Un packet canónico por componente bajo `docs/components/web/` | **17** ficheros `.md`. Disco |
| Las 16 rutas citadas en Secciones 3, 9 y 11 | Las **16** existen. `Test-Path` |
| Cuatro `package.json`; ninguno declara `test`; `compiler-api` no tiene clave `scripts` | Exacto: 4 ficheros, 0 con `scripts.test`, `compiler-api/package.json` sin `scripts` |
| Ocho ficheros bajo `tools/roadmap/tests/` | **8.** Disco |
| `ComponentGuide.jsx` lleva contenido inline de tres componentes | `listGuide`, `headerGuide`, `columnsGuide`. Presentes |
| `checkComponentGuideTextIntegrity.cjs` protege ese texto | Existe |
| `split` no es acción agregable: `disabled: true` con razón declarada | `blockCatalog.js:872-873` |
| El run de `split` se titula «Decide scope and enable the Split component» | Canónico `queue_order` 40, **coincide exacto** |
| `hierarchy` lleva el patrón de regresión matemática: su renderer emite `node.math` sin delimitadores | `renderHierarchy.js:174`, `:197`. **Cierto** |
| `conceptGrid` está en la categoría matemática sin campo `math`: el renderer Core lee `item.math`, ningún esquema del Editor puede producirlo | `renderConceptGrid.js:115-116` lo lee; `ConceptGridItemSchema` (`draftSchema.js:332-344`) no lo tiene |
| `timeline` ofrece el alias `success` que cae al respaldo `ctx` | `detailsVariant: z.enum(['def','ctx','wrn','success'])` (`draftSchema.js:501`); `commons.js:82-86` define los alias; la paleta del Editor no define ninguno |
| Seis kinds llevan campo `math` (`rule`, `table`, `arithmetic`, `split`, `timeline`, `hierarchy`) | Seis y sólo seis en el esquema del Editor: líneas 401, 440, 472, 489, 781/787, 844 |
| Cinco de los seis llegan a salida renderizada; `hierarchy` no | Confirmado por el punto anterior sobre delimitadores |
| `iconList`, `hierarchy`, `visual` llevan hex autorado que nunca se resuelve contra paleta | `compiler.js:324` (`item.color`), `:1059` (`node.color`), `:335` (`background`): los tres pasan tal cual |
| `split` y `timeline` step details emiten sólo id de enum cerrado | Ni `buildSplitOutput` ni `buildTimelineOutput` llaman a un resolvedor de color |
| Contrato de color §10 deja seis decisiones abiertas; contrato de matemáticas §11 deja ocho; catorce en total | 6 y 8. Contadas |
| Todas las referencias cruzadas a secciones (color §3, §4, §7, §9, §10; matemáticas §5, §9, §10, §11) | Las nueve resuelven al encabezado que el DoD nombra |
| `component_status.json` es proyección: `projection_only: true`, `source_of_truth: false`, dieciséis de diecisiete, `columns` sin entrada | Exacto |

### 2.2 Afirmaciones medidas y **falsas** — corregidas

**F1 — Sección 6, frontera de pruebas automatizadas.** Decía «treinta y seis ficheros
`*.test.mjs` … con 398 declaraciones `test(` de primer nivel», fechado 2026-08-05 como
conteo estático.

Medido 2026-08-08: **38 ficheros**, **437 declaraciones**. Y no por conteo estático sino
**por ejecución**: `node --test "tests/*.test.mjs"` desde
`tools/author-lite/compiler-api/` da **437 pass, 0 fail**. La cifra se corrobora sola en el
canónico: el `closeout_result` de `RUN-JAME-WEB-VISUAL-AUDIT-AND-REPAIR-001` (`queue_order`
38) registra que «la suite pasó de 436 a 437».

Corregido, y añadido el comando que corre toda la superficie de componente de una vez, que
el documento no tenía.

**F2 — Sección 8, fila 328. La que el encargo señaló, y es falsa.** Decía que `header` y
`list` son los **únicos** renderers reconciliados.

Medido: **ocho** renderers Web prefieren el color derivado por el compilador sobre el mapa
fijo de variantes.

| Renderer | Sitio | Patrón |
|---|---|---|
| `renderHeader.js` | `:49` | `normalizeHexColor(data.color)` |
| `renderList.js` | `:94` | `normalizeHexColor(data.color) \|\| palette.color` |
| `renderCard.js` | `:65` | `getHexColor(data.color)`, con respaldo en `:309` |
| `renderCallout.js` | `:38` | `normalizeHexColor(data.color) \|\| paletteConfig.color` |
| `renderRule.js` | `:27` | `normalizeHexColor(data.color) \|\| paletteConfig.color` |
| `renderTable.js` | `:30` | `normalizeHexColor(data.color) \|\| paletteConfig.color` |
| `renderDetails.js` | `:81` | `normalizeHexColor(item.color) \|\| paletteConfig.color` (nivel item) |
| `renderConceptGrid.js` | `:59` | `normalizeHexColor(item.color) \|\| theme.main` (nivel item) |

Corregida la fila, con los ocho sitios citados, y declarado explícitamente que la fila era
cierta cuando se escribió y hoy no lo es.

**F3 — Sección 8, el párrafo de los delimitadores. Se partió en dos, porque una mitad es
cierta y la otra no.**

- «`table` es el único kind cuyos delimitadores vienen del compilador» — **CIERTO.**
  `buildTableMathContent` (`compiler.js:569-577`) es el único sitio que emite `\( ... \)`;
  el math de todos los demás pasa sólo por `escapeHtml`.
- «`arithmetic` … conserva delimitadores autorados que el renderer vuelve a envolver» —
  **CIERTO.** `renderArithmetic.js:248`, `:271-272`, `:368-369`. Además no despoja antes,
  así que un delimitador autorado se envuelve dos veces. Medido y añadido.
- «`timeline` …» — **CIERTO.** `renderTimeline.js:255`, mismo doble envoltorio.
- «`hierarchy` …» — **FALSO.** `renderHierarchy.js:174` y `:197` emiten `node.math` crudo,
  **sin delimitador alguno**. Y la falsedad era interna: el propio documento, tres viñetas
  más arriba, lo dice bien («su renderer emite `node.math` sin delimitadores; las fórmulas
  se ven como texto plano»). El documento se contradecía consigo mismo.

Corregido: `hierarchy` sale de esa lista y la contradicción interna queda nombrada.

**Sobre la advertencia del encargo:** de los tres nombrados, `hierarchy` y `timeline` son
runs aún no ejecutados (`queue_order` 43 y 44, ambos `planned`). La afirmación falsa
describía justamente a uno de ellos. Es la corrección de mayor alcance de este barrido.

**F4 — Sección 5, columna «Palette-resolves», y el párrafo de hechos fijos que se deriva de
ella.** Decía que cinco kinds (`callout`, `details`, `conceptGrid`, `table`, `rule`)
«aceptan un token de paleta abierto y **emiten sólo ese id de token**», el patrón de
regresión de paleta.

Medido: los cinco **sí resuelven contra la paleta Web activa** y emiten
`color: colorToken.accent` más los roles derivados, vía
`resolvePaletteColorTokenIfDefined` (`compiler.js:218-228`), en los sitios `:436` (rule),
`:474` (details items), `:489` (conceptGrid items), `:622` (table), `:1246` (callout).

El matiz que importa, y que se escribió en el documento en vez de aplanarlo: esa resolución
es **condicional**. `resolvePaletteColorTokenIfDefined` devuelve `undefined` salvo que el id
de variante sea hex o nombre un token de la paleta activa. Cuando no lo es —un id heredado,
o un alias como `success` que la paleta del Editor no define— no se emite color y el motor
resuelve el `variant` desnudo contra su mapa fijo. Esa rama residual es lo que queda del
patrón de regresión para estos cinco: **hoy es la excepción de la fila, no la regla.**

Corregidas las cinco celdas de la tabla y reescrito el párrafo de hechos fijos. La
aritmética del párrafo (3+3+5+2+`columns` = 14) se conservó porque sigue cuadrando; lo que
cambió es qué significa el grupo de cinco.

**F5 — Sección 6, tabla de estado previo.** Sus filas nombraban componentes por un estado de
`component_status.json` que este mismo run corrigió (ver §3). Quedó desincronizada por
construcción y se actualizó con el registro: dos filas nuevas
(`OPERATOR_WRITTEN_QA_VERDICT_RECORDED_IN_CANONICAL_CLOSEOUT` y
`HUMAN_QA_OUTCOME_INDETERMINATE_...`), la fila de fallo vacía y la de diferidos reducida a
cuatro. Suman dieciséis, como antes.

Se añadió además, escrita en el DoD y no sólo aquí, **la regla de indeterminación**: un run
`completed` no es prueba de PASS; donde el canónico no dice cómo cerró, la fila se corrige a
lo que el canónico sí sostiene y el resultado de QA se declara indeterminado.

### 2.3 Afirmaciones **declaradas, no corregidas**

| Afirmación | Por qué se declara |
|---|---|
| Secciones 4 (S5, S6) citan «contrato de matemáticas Sección 10» para comportamiento en slots y supervivencia verbatim de la fórmula. La §10 de ese contrato es «Classification and the mandatory audit block» | Es una referencia cruzada, no una afirmación sobre el estado del código, y no se puede decidir sin saber qué sección se quiso citar. Corregirla a ojo sería inventar la intención. **Se declara; el operador decide** |
| Secciones 3 y 9 nombran `docs/archive/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` como fuente única de estado | **La matriz está fuera de alcance.** El barrido tropezó con ella, como el encargo previó, y **no se tocó**. Se hace constar además que su cabecera en disco **no lleva banner de congelada**: se describe como «Documento operativo. Fuente de verdad del estado de certificación». Que esté congelada y con contradicciones conocidas es afirmación del encargo, no medición de este taller |
| La entrada de este documento en `.aiw/docs/docs_index.json` sigue diciendo `freshness: produced_2026-07-28` y `freshness_status: DRAFT_PENDING_OPERATOR_CONTENT_QA_2026_07_28` | Quedó vencida por las correcciones de arriba. **`docs_index.json` no está en el alcance de este encargo** y no se editó. Es exactamente la disciplina que el propio DoD fija en S9/S10: se registra la discrepancia y se enruta, no se escribe. **Va al operador** |

---

## 3. Barrido de `.aiw/state/component_status.json`

Dieciséis filas, una por componente; `columns` ausente, como el DoD dice. Cada fila se
midió contra el canónico.

### 3.1 Recuento: **seis** filas contradicen al canónico, no cinco

El encargo trae cinco, medidas por el taller anterior. **Recontadas: seis.** La explicación
es limpia y no acusa a nadie: el taller anterior es
`RUN-JAME-WEB-VISUAL-AUDIT-AND-REPAIR-001` (`queue_order` 38), y su propio `closeout_result`
dice «el registro de estado tiene cinco filas vencidas y no tres». Cuando midió, su propio
run aún no había cerrado, así que **su propia fila no estaba entre las cinco**. Al cerrarlo
la cabina, `visual` pasó a ser la sexta. Las cinco de entonces siguen siendo cinco; hoy son
seis.

### 3.2 Grupo A — runs cerrados con veredicto escrito del operador: **cuatro**, no tres

El encargo dice tres. Medidas **cuatro** filas cuyo `closeout_result` contiene literalmente
«closed on the written human QA verdict of the operator».

| Componente | `run_id` | `status` | `closeout_result` (fragmento citado) | Estado registrado antes |
|---|---|---|---|---|
| `details` | `RUN-JAME-WEB-DETAILS-REPAIR-001` (q32) | `completed` | «done as specified plus two operator-authorized amendments under D-061, **closed on the written human QA verdict of the operator**» | `HUMAN_QA_FAILED_REPAIR_REQUIRED_WITH_OLDER_NOT_STARTED_CONTEXT` |
| `arithmetic` | `RUN-JAME-WEB-ARITHMETIC-AUDIT-AND-REPAIR-001` (q33) | `completed` | «done as specified, **closed on the written human QA verdict of the operator**» | `HUMAN_QA_DEFERRED_OWN_TICKET_REQUIRED` |
| `rule` | `RUN-JAME-RULE-COMPONENT-REPAIR-AND-ACTIVATION-001` (q35) | `completed` | «done, three repairs rather than the audit the text described, **closed on the written human QA verdict of the operator**» | `HUMAN_QA_FAILED_REPAIR_REQUIRED_FOR_RULE_COMPONENT_...` |
| `visual` | `RUN-JAME-WEB-VISUAL-AUDIT-AND-REPAIR-001` (q38) | `completed` | «done, with the shipped work coming from operator verdicts rather than from the audit, **closed on the written human QA verdict of the operator**» | `HUMAN_QA_DEFERRED_OWN_TICKET_REQUIRED` |

Las cuatro corregidas a
`OPERATOR_WRITTEN_QA_VERDICT_RECORDED_IN_CANONICAL_CLOSEOUT` (con sufijos por fila donde el
closeout matiza la cobertura), citando `run_id`, `status` y `closeout_result` en
`source_refs`. **Ninguna pasó a certificada.** Las cuatro siguen `NOT_CERTIFIED`,
`generator_safe: false`, `web_global_certified: false`.

Se arrastró además a `follow_up_required` lo que cada closeout declara **enrutado y no
reparado** —cuatro items en `details`, uno en `arithmetic`, tres en `rule`, el desbordamiento
de alcance declarado en `visual`—, y en `details` la cobertura parcial de packet que su
propio closeout confiesa (checks 22, 27 y 30 de la ronda 2 no reportados ejecutados).

### 3.3 Grupo B — el matiz que hay que respetar: **dos filas indeterminadas**

`narrative` («Texto») y `callout` («Nota destacada»). El encargo pide no marcarlas aprobadas
por deducción. **Verificado directamente, y el encargo tiene razón:**

| Componente | `run_id` | `status` | `closeout_result` | Veredicto en el packet |
|---|---|---|---|---|
| `narrative` | `RUN-JAME-WEB-NARRATIVE-REPAIR-001` (q24) | `completed` | «done as specified» — **no menciona veredicto de QA** | Columna `Veredicto` **vacía a propósito** |
| `callout` | `RUN-JAME-WEB-CALLOUT-REPAIR-001` (q31) | `completed` | «done as specified» — **no menciona veredicto de QA** | Columna `Veredicto` **vacía a propósito** |

Ambos packets lo dicen con todas las letras en su línea 12: «La columna `Veredicto` está
vacía a propósito». **No hay PASS independiente que citar.**

Corregidas a `HUMAN_QA_OUTCOME_INDETERMINATE_REPAIR_RUN_COMPLETED_NO_RECORDED_VERDICT`: se
corrigió lo que el canónico **sí** sostiene —que el run de reparación está `completed`, lo
que retira la afirmación vencida de fallo— y **el resto se declaró indeterminado**. No se
dedujo aprobación en ninguna de las dos.

Un detalle que merece quedar escrito, porque es justo el agujero: el packet de `callout`
registra que **el taller midió** que las cuatro mitades del defecto ya no reproducen contra
código vivo. Eso es una medición de taller, **no un veredicto de operador**, y así quedó
anotado en `follow_up_required` de esa fila. Es exactamente el paso que, dado por bueno,
habría convertido una medición en una aprobación.

### 3.4 Las diez filas restantes — medidas y sin contradicción

`header` (q15 `completed`, sin `closeout_result` en el canónico: el canónico no dice cómo
cerró, y la fila no afirma lo contrario; su observación de desync y sus conflictos quedan
verbatim), `list` (q20, fila ya reconciliada y citando el canónico; el conflicto
AGENTS-vs-matriz **se preserva intacto**, como S10 exige), `iconList` (q21), `card` (q22),
`video` (q23) — las cuatro ya citaban su run. `table`, `conceptGrid`, `hierarchy`,
`timeline` siguen `HUMAN_QA_DEFERRED_OWN_TICKET_REQUIRED` y sus runs están `planned`
(q41-q44): sin contradicción. `split` sigue sin resultado explícito, con su run `planned`
(q40).

Se actualizó `last_reconciled_by_run` a este run, porque dejarlo apuntando al anterior sería
una afirmación falsa sobre quién reconcilió estas filas.

---

## 4. Cifras de la cabina que resultaron falsas

El encargo pide mandar las propias si no cuadran. Cuadran tres de cinco.

| Cifra de la cabina | Medición del taller | Veredicto |
|---|---|---|
| Nueve renderers Web leen el color derivado del autor | **Ocho** | **Falsa por uno.** Ocho sitios citados en §2.2 F2. Diez renderers leen *algún* color autorado, pero dos de ellos (`renderIconList.js:124`, `renderHierarchy.js:23`) leen hex autorado que el compilador nunca deriva; incluirlos daría diez, no nueve. No hay lectura razonable que dé nueve |
| Seis renderers leen el rol de tinta derivada | **Seis** | **Correcta.** `renderArithmetic.js:92`, `renderBadge.js:46`, `renderCard.js:36`, `renderConceptGrid.js:62`, `renderIconList.js:125`, `renderRule.js:39`. Corroborada sola: el comentario de `compiler.js:164` dice «Los seis renderers que hoy fuerzan blanco encima del acento» |
| Cinco filas del registro contradicen al canónico | **Seis** | **Falsa por una**, y la causa está identificada en §3.1: era exacta cuando el taller anterior la midió; `visual` se sumó al cerrar ese mismo run |
| Tres componentes con veredicto escrito del operador | **Cuatro** | **Falsa por uno.** `details`, `arithmetic`, `rule` y `visual`. La cuarta es `visual`, por la misma razón |
| La suite parte de 437 | **437** | **Correcta**, y verificada por ejecución, no por conteo: 437 pass / 0 fail |

Que la fila 328 estuviera medida y falsa: **confirmado**, y era falsa por más margen del que
el encargo suponía (ocho en vez de dos, no nueve en vez de dos).

---

## 5. Verificación

| Comprobación | Resultado |
|---|---|
| Suite antes de tocar nada | **437 pass, 0 fail** |
| Suite después de las ediciones | **437 pass, 0 fail**, exit 0 |
| `validate-project-console-state.mjs` antes | passed, exit 0 |
| `validate-project-console-state.mjs` después | **passed, exit 0**; 16 component statuses; misma advertencia no bloqueante previa sobre `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`, que ya existía y no es de este encargo |
| `component_status.json` parsea | Sí; 16 componentes; `projection_only: true`, `source_of_truth: false` intactos |
| Invariantes del validador | `generator_safe: false` en las 16; los 16 ids requeridos presentes; todas las claves obligatorias por componente presentes |

Ninguna prueba se puso roja, así que no hubo que parar por el criterio 9. Ninguna prueba se
tocó.

---

## 6. Alcance ejecutado y no ejecutado

**Tocado:** `docs/reference/REFERENCE-COMPONENT-REVALIDATION-DEFINITION-OF-DONE.md` y
`.aiw/state/component_status.json`. Nada más.

**Cero cambios de código.** Ni componentes, ni esquemas, ni compilador, ni renderers, ni
pruebas. En ningún momento una corrección de documentación exigió tocar código, así que no
hubo que parar por el criterio 8: los documentos estaban vencidos, el código no.

**No tocado y declarado:** la matriz de certificación (fuera de alcance; el barrido tropezó
con ella y se declaró, §2.3); `.aiw/docs/docs_index.json` (fuera de alcance; su entrada para
este documento quedó vencida y va al operador, §2.3); los cinco componentes pendientes; el
`status` del run, `.project/`, git y el orden de la cola.

---

## 7. No-claims

- **No certifica nada.** Ninguna fila pasó a certificada; las dieciséis siguen
  `web_global_certified: false` y `generator_safe: false`.
- **No convierte un run `completed` en un PASS.** Dos filas quedan explícitamente
  indeterminadas por eso mismo.
- **No cambia el `status` de ningún run**, ni el de este. La cabina cierra.
- **No repara componentes.** Cada defecto nombrado arriba es una medición o una cita del
  canónico, nunca una autorización de reparación.
- **El estado de componentes conserva su fuente única**, la matriz nombrada en la Sección 9
  del DoD, que este encargo no tocó.
- **No decide ninguna de las catorce decisiones abiertas** de los dos contratos de
  compatibilidad.
