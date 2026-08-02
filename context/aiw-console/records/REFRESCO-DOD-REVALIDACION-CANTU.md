# Refresco de la Definition of Done de revalidación de componentes

**Proyecto escrito:** `cantu-studio` (un archivo) y `aiw-console` (este record).
**Fecha:** 2026-08-01. **Tipo:** encargo de taller sobre run del canónico.

**Run derivado del canónico, no tecleado de memoria.** Recorriendo
`projects/cantu-studio/.aiw/roadmap/roadmap.json` por `objectives[].phases[].runs[]` y
filtrando por `queue_order` **17**: match único.

| Campo | Valor |
|---|---|
| `run_id` | `RUN-CANTU-REVALIDATION-DOD-REFRESH-001` |
| `title` | `Update the revalidation Definition of Done to match the measured surfaces` |
| Objetivo / Fase | `O5` / `O5.P6` |
| `lane` | `DOCUMENTATION` |
| `status` al abrir | `active` |
| md5 del canónico al abrir y al cerrar | `5aa9de5ddd880e4460213b23b4bf07dc` — **idéntico** |

**La guarda del `# Objective` pasa: el título es verbatim el exigido.** No se corrigió nada
por parecido y se siguió.

**Resultado en una línea:** las tres reparaciones se hicieron; **no se paró y reportó**,
porque la frontera de verificación se pudo corregir **sin imponer obligación nueva** a los
quince y las diecisiete filas de la matriz se dejaron decidir desde disco; de las nueve
cifras del ticket **seis son exactas, una está bien pero mal ubicada, y dos se quedan
cortas** —las filas vencidas de §5 son **siete**, no cinco, y los componentes que emiten
sólo el token id son **siete**, no cinco—; el documento pasó de **364 a 413 líneas** y
**ocho de sus doce secciones quedaron byte-idénticas**.

---

## 1. Criterio 1 — La medición de la matriz, componente a componente, contra disco

Es la fuente de la §5 reescrita. Ninguna fila viene de un record: las diecisiete se
midieron abriendo el editor, **los dos** `draftSchema.js` y `compiler.js`.

**Convención de las columnas.** «Superficie de color en el editor» es un control que el
autor ve. «Schema» da la línea en *editor-ui* / *compiler-api*. «Compilador» dice si emite
un hex resuelto contra la paleta activa, si deja pasar un hex que el autor ya escribió, o
si emite sólo el id del token y deja que el motor lo resuelva contra su mapa fijo.

| # | Kind | Color en el editor (archivo:línea) | Color en el schema (editor / compiler-api) | Compilador | Math y clase |
|---:|---|---|---|---|---|
| 1 | `header` | `WebBlockEditor.jsx:3911-3924` `HeaderColorSelect`; en columna `:1772-1788` | `variant` token id **o** hex — `:555` / `:568` | **resuelve hex** `compiler.js:1066` | ninguna |
| 2 | `list` | `:3970-3972` `VariantSelect allowCustom`; en columna `:1807-1816` | `variant` token id **o** hex — `:727` / `:752` | **resuelve hex** `:1108` | ninguna |
| 3 | `columns` | ninguna propia; pasa la paleta a los hijos `:4009` | ninguna | propaga contexto `:1121-1125` | ninguna propia |
| 4 | `iconList` | `IconListFields.jsx:26-93` `IconListColorField`, usado `:150-151` | `items[].color` hex — `:293` / `:296` | hex de paso `:277` | ninguna |
| 5 | `card` | `:1178-1184`, `:1200-1206`, `:1227-1233` `CardColorField` | `color` hex `:631`/`:644` + `colorToken` `:632`/`:645` | **resuelve hex** `:356` (y `:305`, `:333`) | ninguna |
| 6 | `video` | **ninguna** (`VideoFields.jsx`, sin color) | ninguna | — | ninguna |
| 7 | `narrative` | **ninguna** (`:3954-3963`: modo, título, texto) | ninguna | — | ninguna |
| 8 | `callout` | `:3946` `VariantSelect`; en columna `:1841-1849` | `variant` token id abierto — `:704` / `:717` | **sólo token id** `:1080` | ninguna |
| 9 | `details` | `:2435` `VariantSelect`, **por ítem** | `items[].variant` token id abierto — `:320` / `:323` | **sólo token id** `:381` | ninguna |
| 10 | `split` | `:1683-1689` select de enum cerrado (sólo hijo de `columns`) | `variant` enum `['ctx','focus','wrn']` — `:840` / `:868` | **sólo token id** `:651` | `steps[].math` `:815`/`:843`, `gridSteps[].math`, `result` `:867`/`:895` — **Superficie B, texto opaco** |
| 11 | `table` | `:3070` bloque + `:2995-3006` badge por fila; en columna `:1966-1974` | `variant` token id abierto `:781`/`:809`; `rows[].value.badge.variant` enum cerrado `:393`/`:396` | **sólo token id** `:520`; badge `:506` | `rows[].value.math.expression` `:372`/`:375` y `.result` `:379`/`:382` — **Superficie B** |
| 12 | `conceptGrid` | `:2581` `VariantSelect`, **por ítem** | `items[].variant` token id abierto — `:330` / `:333` | **sólo token id** `:390` | **sin campo `math`**; `items[].terms` sí existe y el renderer lo envuelve como math |
| 13 | `arithmetic` | **ninguna** (`:3295-3331`, sin `colorPalette`) | ninguna | — | `counts[].math` `:423`/`:426`, `result` `:936`/`:964` — **Superficie B** |
| 14 | `hierarchy` | `:3395-3457` `HierarchyNodeColorField`, usado `:3534` y `:3603` | `nodes[].color` hex — `:449` / `:452` | hex de paso `:899` | `nodes[].math` `:450`/`:453` — **Superficie B** |
| 15 | `timeline` | `:3796-3807` select `detailsVariant`, enum cerrado | `detailsVariant` enum `['def','ctx','wrn','success']` — `:479` / `:482` | **sólo token id** `:1038` | `steps[].math` `:467`/`:470` — **Superficie B** |
| 16 | `visual` | `VisualFields.jsx:32-36` `<input type="color">` sobre `background` | `background` hex — `:301` / `:304` | hex de paso `:287` | ninguna |
| 17 | `rule` | `:4032` `VariantSelect`; en columna `:1877-1885` | `variant` token id abierto — `:750` / `:778` | **sólo token id** `:367` | `math` `:752`/`:780` — **Superficie A, allowlist LaTeX cerrada** (`safeRuleMathValue` → `validateRuleMathValue`) |

Rutas: editor `tools/author-lite/editor-ui/src/features/editor/components/web/WebBlockEditor.jsx`
y `.../components/common/`; schemas `tools/author-lite/editor-ui/src/schemas/draftSchema.js`
y `tools/author-lite/compiler-api/schemas/draftSchema.js`; compilador
`tools/author-lite/compiler-api/services/compiler.js`.

### 1.1 Los dos schemas divergen a propósito, pero **no en color ni en math**

Se diferenciaron entero, no por muestreo. `diff` completo: **117 líneas, 10 bloques**. Los
bloques son rutas de import, un comentario de `parseVideoUrl`, la extracción de
`LessonSchema`, los schemas de pipeline (`DraftSaveSchema`, `WebDraftSchema`,
`SlidesDraftSchema`) y **una sola divergencia de campo: `list.items`**, que en
*compiler-api* lleva un `preprocess` que parte un string por líneas para drafts legacy —
documentado como intencional en el propio archivo.

**Barrido del diff por `color|variant|math|background`: cero coincidencias fuera de una
ruta de import.** Es decir: **las diecisiete filas de la columna «schema» valen igual en
los dos**. Se dice explícitamente porque el criterio pedía los dos y podrían haber
discrepado; medido, no discrepan en esta superficie.

### 1.2 Dónde se rinde el math (renderers de `src/builders/web/`)

| Kind | Quién pone los delimitadores | Rinde |
|---|---|---|
| `rule` | `renderRule.js:89` `\[ … \]` | sí |
| `table` | **el compilador**, `compiler.js:466-476` `\( … \)`; `renderTable.js:227` emite crudo | sí |
| `arithmetic` | `renderArithmetic.js:225`, `:250-251`, `:316-317` `\( … \)` | sí |
| `split` | `renderSplitCard.js:91`, `:105`, `:130`, `:145` `\[ … \]` | sí |
| `timeline` | `renderTimeline.js:255` y `:265` `\[ … \]` | sí |
| `hierarchy` | **nadie** — `renderHierarchy.js:174` y `:197` emiten `node.math` crudo | **no** |
| `conceptGrid` | `renderConceptGrid.js:90-91` envuelve `terms` en `\( … \)`; `:104` lee un `item.math` que ningún schema del editor produce | `terms` sí; `math` inalcanzable |

### 1.3 El mapa fijo del motor

`src/builders/web/partials/commons.js`: `PALETTE` (`:50-68`) **10 claves**; `VARIANTS`
(`:71-90`) **13 claves** — `def, ctx, ex, meta, focus, str, res, success, wrn, warning,
err, error, code`. Los únicos renderers que prefieren `data.color` sobre el mapa son
`renderHeader.js:49` y `renderList.js:94`.

---

## 2. Criterio 3 — El recuento, sobre el canónico de hoy

Contado recorriendo el canónico, no tomado del ticket. `lanes[]` declara `DEVELOPMENT`
con `default: true`, así que un run sin clave `lane` es DEVELOPMENT.

- **Total del canónico: 66 runs.** Por carril: **54 DEVELOPMENT**, **12 DOCUMENTATION**.
- **Runs de componente (DEVELOPMENT): 17** — uno por componente, ninguno de más.
  `queue_order` 13 (`columns`, `completed`), 15 (`header`, `completed`) y los quince
  `planned` en 20-28 y 30-35.
- **Runs de packet (DOCUMENTATION): 5** — `queue_order` 14
  (`RUN-CANTU-WEB-COLUMNS-DOC-001`, por componente) más los cuatro lotes 38, 39, 40 y 41,
  que cubren cuatro componentes cada uno: 16 + `columns` = 17.

**17 + 5 = 22.** No 34. El emparejamiento «un run DOCUMENTATION por componente» ya no
existe: el rediseño del carril lo sustituyó por lotes.

**Discrepancia de ubicación que hay que declarar.** El ticket y
`MEDICION-PIEZAS-COMPARTIDAS-COMPONENTES-CANTU.md` sitúan la frase «thirty-four runs in
total» **en §2**. En disco **no está en §2**: está en el **preámbulo**, entre el banner y
`## 1. Contract scope`. `## 2. The component set and the batch model` no contiene ningún
recuento de runs y por eso **quedó byte-idéntica**. Se corrigió la frase donde está.

---

## 3. Criterio 4 — La frontera de verificación, medida

**Lo que existe.** **30 archivos `*.test.mjs`** en `tools/author-lite/compiler-api/tests/`
con **323 declaraciones `test(` de primer nivel**. Importan `node:test` y
`node:assert/strict` (30 de 30 importan `node:test`) y se corren de uno en uno con
`node --test <ruta>`, que es exactamente como los citan los records archivados —por
ejemplo `MATHLIVE_PRODUCTION_DEPENDENCY_GATE.md:191-193`. Fuera de la superficie de
componentes hay **8 archivos más** en `tools/roadmap/tests/` con **166 declaraciones**.
Repo entero: **38 archivos, 489 declaraciones**.

**Lo que no existe.** Ningún script `test`. Los cuatro `package.json` del repo
—`tools/author-lite/package.json`, `tools/author-lite/compiler-api/package.json`,
`tools/author-lite/editor-ui/package.json`,
`tools/prototypes/author-lite-workbench-v1/package.json`— no lo declaran; el de
`compiler-api` **no declara clave `scripts` en absoluto**. No hay un comando único que
corra la suite, ni compuerta de CI que la corra.

**No se corrió la suite.** El conteo es estático, por lectura y `grep`, como manda el
`# Out of scope`.

**Por qué la cláusula de los quince es falsa como está escrita:** dice «since the
repository has no test runner». El runner existe —es `node --test`, del propio Node—; lo
que falta es el script. La cláusula convierte una ausencia de conveniencia en una ausencia
de capacidad, y es esa lectura la que autoriza cerrar sólo con QA visual.

---

## 4. Criterio 10 — Por qué NO se paró y reportó

Se comprobaron los cuatro supuestos, uno a uno:

1. **¿Corregir la frontera impone obligación nueva a los quince?** **No, y se escribió
   para que no la imponga.** La §6 nueva dice qué existe, qué no, y a continuación fija
   explícitamente que **ningún paso S1-S10 toma un resultado de suite como entrada ni como
   evidencia, y ningún veredicto de §4 depende de uno**; que la QA humana del operador
   sigue siendo la compuerta de cierre; y que si un taller corre un archivo de test, el
   resultado entra como una medición más en su tabla de evidencia, nunca como sustituto
   del packet S7 ni como autorización de reparación. El párrafo de cierre lo dice sin
   ambigüedad: *«This clause corrects a premise; it adds no duty»*, y nombra la pregunta
   que sí sería obligación nueva —exigir correr la suite antes de pedir QA— como
   **política de cierre del operador, no decidida aquí**. Las obligaciones de §4 quedan
   idénticas: §4 es **byte-idéntica**. Por tanto el supuesto no se dispara. **El informe de
   coste de esa decisión se entrega igual, en §7, sin decidirla.**
2. **¿Alguna fila no se deja decidir desde disco?** No. Las diecisiete se decidieron con
   archivo y línea en las tres capas. La única que exigió criterio —`visual.background`,
   un hex de fondo que no es token de paleta— se decidió con **el estándar que la propia
   §5 ya usaba**: la tabla ya listaba como superficie de color el hex crudo de `iconList`
   y el enum cerrado de `timeline`. Bajo ese estándar `visual` es superficie de color. Se
   declara aquí que esa fila la decide el estándar del documento, no el disco a solas.
3. **¿Hizo falta tocar otro documento, un schema, el compilador, un renderer o el texto de
   un run?** No. Se escribió **un solo archivo** en `cantu-studio`.
4. **¿El canónico no casa con el `# Objective`?** Casa: título verbatim.

---

## 5. Criterio 6 — Qué cambió del documento y qué no

**Antes:** 364 líneas, md5 `77a83454a6e1f8a3387a6463efb85f25`.
**Después:** 413 líneas, md5 `e8249cf3a8de939ca513536487bd97ec`.

Cotejo por secciones contra la copia previa:

| Sección | Líneas | Estado |
|---|---:|---|
| Preámbulo (título, banner, apertura) | 15 → 18 | **CAMBIADA** — reparación B |
| `## 1. Contract scope` | 16 → 16 | **BYTE-IDÉNTICA** |
| `## 2. The component set and the batch model` | 20 → 20 | **BYTE-IDÉNTICA** |
| `## 3. Author-facing contract expectations` | 35 → 35 | **BYTE-IDÉNTICA** |
| `## 4. The revalidation procedure` | 84 → 84 | **BYTE-IDÉNTICA** |
| `## 5. Applicability: color and math per component` | 38 → 50 | **CAMBIADA** — reparación A |
| `## 6. The Human QA boundary` | 33 → 57 | **CAMBIADA** — reparación C |
| `## 7. The per-component evidence table` | 25 → 25 | **BYTE-IDÉNTICA** |
| `## 8. Component-specific exceptions` | 32 → 32 | **BYTE-IDÉNTICA** |
| `## 9. Relation to existing artifacts` | 20 → 20 | **BYTE-IDÉNTICA** |
| `## 10. Open decisions honored` | 10 → 10 | **BYTE-IDÉNTICA** |
| `## 11. Source files` | 17 → 17 | **BYTE-IDÉNTICA** |
| `## 12. No-claims` | 20 → 30 | **CAMBIADA** — reparación C |

**Ocho de doce secciones byte-idénticas.** Dentro del preámbulo, el banner de la línea 3 y
el párrafo «Naming:» son **byte-idénticos**; sólo cambió el párrafo del recuento.

### 5.1 Reparación A — §5, fila a fila

**Diez filas tocadas, siete intactas.** Intactas: `columns`, `iconList`, `card`, `video`,
`narrative`, `callout`, `arithmetic` — se midieron y estaban bien.

**Siete filas decían «none» en color y sí tienen superficie:**

| Fila | Decía | Mide |
|---|---|---|
| `details` | `none` | `items[].variant`, token abierto |
| `split` | `none` | `variant`, enum cerrado de tres |
| `table` | `none` | `variant` abierto + `badge.variant` cerrado |
| `conceptGrid` | `none` | `items[].variant`, token abierto |
| `hierarchy` | `none` | `nodes[].color`, hex |
| `visual` | `none` | `background`, hex |
| `rule` | `none` | `variant`, token abierto |

**Dos filas se quedaban cortas:** `header` y `list` decían «`variant` token»; el campo
acepta token id **o** `#RRGGBB` (el «Personalizado» del picker) en los dos schemas.

**Una fila se reclasificó:** `timeline` decía «no - regression pattern»; medido, su
`detailsVariant` es un **enum cerrado** al que ningún token de paleta puede llegar, luego
comparte la emisión de sólo-id pero no la superficie abierta que hace del patrón un
defecto. Como §8 sí lo nombra junto a `callout` bajo el patrón y §8 está fuera de las tres
reparaciones, **no se editó §8**: se añadió en §5 una frase que reconcilia las dos y
declara cuál es la medición fina. Se registra aquí como tensión declarada, no resuelta.

**Una columna de math corregida:** `conceptGrid` decía «none in the Editor / no». Es cierto
para el campo `math` —el renderer lee `item.math` y ningún schema del editor lo produce—
pero **no** para `items[].terms`, que el editor sí produce y el renderer envuelve como math
en línea. La fila ahora dice las dos cosas.

El párrafo «Fixed facts» se reescribió para casar con la tabla: catorce de diecisiete
llevan superficie de color, repartidas en cuatro clases (tres resuelven hex, tres dejan
pasar hex de autor, cinco emiten sólo token id desde token abierto —el patrón de
regresión—, dos desde enum cerrado), y `columns` propaga.

**Se conservó la forma de la sección:** mismas cinco columnas, mismas diecisiete filas, en
el mismo orden, con el mismo párrafo de cierre detrás. No se rediseñó.

### 5.2 Reparación B — el recuento

Sustituida la frase «seventeen run pairs … thirty-four runs in total» por el recuento
medido: 17 runs DEVELOPMENT de componente + 5 DOCUMENTATION de packet = 22, con la nota de
que el emparejamiento uno-a-uno ya no existe.

### 5.3 Reparación C — frontera y declaración de desfase

- **§6, párrafo nuevo «The automated-test boundary»**, entre las dos viñetas del reparto
  taller/operador y «The QA packet». Dice qué existe (30 archivos, 323 declaraciones,
  `node --test <ruta>`, más los 8 de `tools/roadmap/tests/`), qué no (ningún script `test`
  en los cuatro `package.json`; `compiler-api` sin clave `scripts`), **que este DoD no
  exige correr nada**, y que la pregunta de política es del operador.
- **§12, viñeta nueva** después de la del Component Guide, que es donde el documento ya
  declara de forma general una divergencia con el texto de un run. Dice que **los textos de
  los runs de componente llevan la cláusula vieja**, que la primera mitad —QA humana como
  compuerta— es correcta y sigue, que la segunda es falsa y se corrige en §6, y que **donde
  el texto del run y este documento discrepen, manda el procedimiento**. No nombra los
  quince uno a uno.

### 5.4 Lo que se decidió NO tocar, y por qué

- **El banner de la línea 3 sigue diciendo `Last verified: 2026-07-28`.** No es §5, ni el
  recuento, ni la frontera, y el criterio 6 manda que lo demás quede byte-idéntico. Además
  la entrada del índice lleva `freshness: produced_2026-07-28` y el criterio 7 prohíbe
  tocarla: cambiar uno sin el otro los desincroniza. **Se deja y se declara.** Es decisión
  del operador si banner y entrada se refrescan juntos en un run que sí pueda escribir el
  índice.
- **§8** — nombra `timeline` bajo el patrón de regresión; ver §5.1.
- **El `notes` de la entrada del índice** dice «the seventeen Web component run pairs»,
  el mismo desfase que se corrigió en el documento. **No se tocó** (criterio 7). Declarado.
- **Los punteros muertos de los packets** (apuntan a `docs/author-lite/components/…`, que
  no existe) — fuera de alcance, ya declarados sin dueño.

---

## 6. Criterio 8 — El validador, por la vía que no escribe

Desde `projects/cantu-studio`:
`node tools/project-console/validate-project-console-state.mjs`

Salida completa **después** de escribir:

```
Project Console state validation passed.
Roadmap v3 prototype: 7 objectives / 28 phases / 66 runs; queue groups needs_human_decision=0 now=1 ready_next=15 later=33 history=17
Roadmap v3 active run derived stages: RUN-CANTU-REVALIDATION-DOD-REFRESH-001=none
Docs indexed: 149
Docs curated primary-visible: 60 of 149 registered
Component statuses: 16
Git provenance episodes: 9
Git history snapshot: 918 commits / 2 branches (2 visible, 0 backup hidden); current=main; run-associated=6; source=local_git_autosync
Roadmap rebase warnings (non-blocking):
- .aiw/roadmap/roadmap.json run RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 depends on RUN-CANTU-ROADMAP-CONTENT-AUDIT-001, which does not resolve in this roadmap. With a single roadmap loaded this cannot be decided: it may be a legal external dependency — a run that lives in another project (CONTRATO §10.d Regla 2) — or a typo in the run id. Both are possible and one loaded roadmap cannot tell them apart; resolve it against the full set of projects to distinguish external from write error.
```

**Verde. `66 runs` y `history=17`: medidos, coinciden con lo esperado.** El aviso de
`depends_on` es preexistente, no bloqueante y ajeno a este encargo: se corrió el validador
**antes** de escribir y la salida fue idéntica salvo nada. El documento **sigue en su ruta**
`docs/reference/REFERENCE-COMPONENT-REVALIDATION-DEFINITION-OF-DONE.md`, con su entrada del
índice intacta; `docs_index.json` no se abrió para escritura y `Docs indexed: 149` no se
movió.

---

## 7. Criterio 9 — Las cifras del ticket, con su valor real

| # | Cifra del ticket | Medido hoy | Veredicto |
|---:|---|---|---|
| 1 | 364 líneas del documento | 364 antes, **413 después** | **exacta** |
| 2 | «treinta y cuatro runs» **en §2** frente a 22 reales | la frase existe y **22 es exacto** (17+5), pero está **en el preámbulo, no en §2** | **cifra exacta, ubicación incorrecta** |
| 3 | cinco filas vencidas en §5 | **siete** decían `none` y tienen color (`details`, `split`, `table`, `conceptGrid`, `rule`, **`hierarchy`**, **`visual`**); más 2 cortas y 1 reclasificada = **10 filas tocadas** | **se queda corta** |
| 4 | 17 componentes | 17 en la unión del schema, 17 en §2, 17 packets | **exacta** |
| 5 | 17 packets | 17 `.md` en `docs/components/web/` | **exacta** |
| 6 | 30 archivos de test y 323 declaraciones | 30 y 323 en `compiler-api/tests/`; repo entero **38 y 489** | **exacta** para la superficie de componentes |
| 7 | 5 componentes que emiten sólo token id | **siete** emiten sólo token id; **cinco** desde token de paleta **abierto** (`callout`, `details`, `conceptGrid`, `table`, `rule`) y dos desde enum cerrado (`split`, `timeline`) | **exacta bajo la lectura estricta; se queda corta en total** |
| 8 | 13 claves del mapa fijo del motor | `VARIANTS`, `commons.js:71-90`: **13**. `PALETTE`, `:50-68`: 10 | **exacta** |
| 9 | validador: `66 runs`, `history=17` | 66 y 17 | **exacta** |

---

## 8. Criterio 11 — Discrepancias declaradas contra los records previos

**No se reescribe hacia atrás ningún record.** Se declaran:

1. **Contra `MEDICION-PIEZAS-COMPARTIDAS-COMPONENTES-CANTU.md` §8.2, punto 1** — decía
   «§5 … vencida en **al menos** cinco filas», nombrando `details`, `split`, `table`,
   `conceptGrid` y `rule`. Medido hoy son **siete**: faltaban **`hierarchy`**
   (`nodes[].color`, hex, `HierarchyNodeSchema:449`/`:452`, control en
   `WebBlockEditor.jsx:3534` y `:3603`) y **`visual`** (`background`, hex,
   `visualShape:301`/`:304`, control en `VisualFields.jsx:32-36`). El «al menos» del record
   previo era correcto; el número no era el total.
2. **Contra el mismo record, §8.2 punto 2 y el ticket** — la frase del recuento está en el
   **preámbulo**, no en §2. §2 no lleva recuento de runs.
3. **Contra el mismo record, §1** — sus quince runs se derivaron en `queue_order` **18..32**
   con md5 del canónico `6d13a7c617801b4b197b6075f418cbac`. Hoy los mismos quince están en
   **20..28 y 30..35** y el md5 es `5aa9de5ddd880e4460213b23b4bf07dc`. **El canónico se
   movió entre aquel encargo y este**; los `run_id` son los mismos. Se declara para que
   nadie derive por `queue_order` desde aquel record.
4. **Contra el mismo record, §1 (encabezado)** — habla de «los quince runs de componente».
   Medido: **diecisiete** runs llevan la cláusula del test runner; quince están `planned` y
   **dos ya están `completed`** (`columns` en `qo` 13, `header` en `qo` 15). «Los quince»
   es correcto como *los que quedan por ejecutar*, no como *los que llevan la cláusula*.
   La viñeta nueva de §12 habla de «every component revalidation run» por eso.
5. **Contra el mismo record, §7.1(a)** — su lista de cinco es exacta bajo su propio
   criterio (token de paleta abierto), y ya declaraba a `split` como sexto aparte. A esa
   lista hay que sumarle **`timeline`**, que también emite sólo el id (`compiler.js:1038`)
   desde un enum cerrado. Total que emite sólo token id: **siete**.
6. **Contra los lotes de packet** — aquel record los situaba en `qo` **35..38**; hoy están
   en **38..41**. Misma causa que el punto 3.

---

## 9. Criterio 10 — Informe de opciones que se devuelve **sin decidir**

La frontera se corrigió sin obligación nueva, así que esto no bloquea nada; se entrega
para que el operador pueda decidir la política de cierre con coste medido.

**Pregunta: ¿debe un run de componente correr la suite antes de pedir QA humana?**

| Opción | Qué implica | Coste medido |
|---|---|---|
| **A. Nada (lo escrito hoy)** | §6 fija los hechos; ningún paso exige suite. Los quince cierran como cierran hoy. | **Cero.** Ya está en disco. |
| **B. Script de npm, sin obligación** | Añadir `"test": "node --test tools/author-lite/compiler-api/tests/"` a un `package.json`. Hace la suite corrible de un comando; no obliga a nadie. | Un `package.json` tocado. **Fuera del alcance de este encargo** (`# Out of scope` prohíbe tocar código). Necesita run propio, carril DEVELOPMENT. |
| **C. Obligación en el DoD** | Un paso nuevo, o una condición en S7, que exija correr los archivos relevantes antes de preparar el packet. | Reescribe §4 —hoy byte-idéntica— y cambia el contrato de los diecisiete. Además choca con la regla «no correr la suite completa en dos talleres simultáneos» de §2, que quedaría en obligación de serializar los lotes. |
| **D. Enmendar los quince textos** | Quitar la cláusula falsa del `full_description` de los diecisiete runs. | **Prohibido a un taller** por el `# Out of scope` y por la disciplina de carriles: escribe el canónico, y eso es la consola global. Es del operador. |

**Recomendación explícita, sin decidir:** **B, y no C.** El defecto medido es la ausencia
de un script, no la ausencia de una obligación; B lo repara donde está, cuesta una línea y
no cambia el contrato de ningún run. C paga con la reescritura de §4 y con una obligación
de serialización que hoy no existe. D es del operador y puede esperar: mientras la viñeta
de §12 esté en pie, el desfase está declarado y el procedimiento manda, que era justo lo
que este encargo tenía que garantizar.

---

## 10. Criterio 12 — Status en el que debe quedar el run

**`RUN-CANTU-REVALIDATION-DOD-REFRESH-001` debe quedar `completed`.**

Las tres reparaciones están hechas y verificadas contra disco, el validador está verde con
`66 runs` y `history=17`, el documento sigue en su ruta y su entrada del índice está
intacta, y ocho de sus doce secciones quedaron byte-idénticas. No queda trabajo abierto
dentro del alcance: lo que se devuelve sin decidir (§9) es política de cierre, que por
definición no es de este run.

**No se cambió el status.** Lo cierra el operador desde la consola global, que es el punto
de serialización. Este record no toca el canónico ni `.project/`.

---

## 11. Alcance realmente tocado

**Escritura, dos archivos y sólo dos:**

1. `projects/cantu-studio/docs/reference/REFERENCE-COMPONENT-REVALIDATION-DEFINITION-OF-DONE.md`
2. `projects/aiw-console/context/aiw-console/records/REFRESCO-DOD-REVALIDACION-CANTU.md` (este)

**No se tocó:** el canónico (md5 idéntico al abrir y al cerrar), `.project/`,
`docs_index.json`, ningún schema, el compilador, ningún renderer, el editor, ningún test,
ningún packet, el `title`/`summary`/`full_description` de ningún run, el `status` de ningún
run. **No se corrió la suite. No se ejecutó git. No se levantó ningún servidor.**
