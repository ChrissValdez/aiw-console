# MEDICIÓN — superficie documental de los componentes Web y forma del packet

Estado: **MEDICIÓN**, fechada **2026-07-31** (fecha leída del sistema). No es contrato
ni decisión. Mide, clasifica, cuesta y **recomienda**; no decide. **No se escribió ni un
byte en `cantu-studio`.** No se ejecutó git en ninguna forma. No se tocó ningún `status`,
no se cerró ningún run, no se re-emitió `.project/`. Nada se reparó: lo encontrado se
nombra.

Este encargo **no tiene run en el roadmap**. Es un encargo de taller.

## Alias usados

| Alias | Ruta |
|---|---|
| **CONTRATO** | `projects/cantu-studio/docs/docs_management/COMPONENT-DOC-SINGLE-SOURCE-CONTRACT.md` |
| **BLUEPRINT** | `projects/cantu-studio/docs/docs_management/DOCUMENTATION-BLUEPRINT.md` |
| **PACKETS** | `projects/cantu-studio/docs/components/web/*.md` (17) |
| **GUÍA** | `projects/cantu-studio/tools/author-lite/editor-ui/src/features/editor/components/preview/ComponentGuide.jsx` |
| **CATÁLOGO** | `projects/cantu-studio/tools/author-lite/editor-ui/src/features/editor/constants/blockCatalog.js` |
| **GUARDIÁN** | `projects/cantu-studio/tools/author-lite/scripts/checkComponentGuideTextIntegrity.cjs` |
| **DOCSVIEW** | `projects/cantu-studio/docs/project-console/assets/project-console.js` |
| **MATRIZ** | `projects/cantu-studio/docs/archive/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` |
| **SCHEMA-API** | `projects/cantu-studio/tools/author-lite/compiler-api/schemas/draftSchema.js` |
| **SCHEMA-UI** | `projects/cantu-studio/tools/author-lite/editor-ui/src/schemas/draftSchema.js` |
| **COLOR** | `projects/cantu-studio/docs/reference/REFERENCE-COLOR-PALETTE-COMPATIBILITY.md` |
| **CANTU-VALID** | `projects/cantu-studio/tools/project-console/validate-project-console-state.mjs` |

---

## 0. Correcciones a las cifras del encargo

El ticket pide explícitamente verificar y no heredar. Cinco de sus afirmaciones cambian
al medirlas:

| Afirmación del ticket | Medido | Veredicto |
|---|---|---|
| «El contrato admite un perfil completo de 13» | BLUEPRINT §5.5 = 13 secciones numeradas, **más** banner y tabla de metadatos de **5 filas** | **Cierto, incompleto** — la 5.ª fila (`Sandbox fixture`) no la lleva ningún packet |
| «La Guía lleva contenido hardcodeado para 3 de 17» | Cierto para el contenido *rich*. Pero los **otros 14 también llevan contenido propio**, en CATÁLOGO: **20 bloques `docs:`, 866 líneas** | **Grave subestimación** — ver §1.5 |
| «un script guardián que protege ese texto» | GUARDIÁN tiene 43 líneas y **6 patrones**: 4 marcadores de mojibake y 2 etiquetas retiradas. **No protege el contenido**, no valida contra los packets, no impide deriva | **Falso como descrito** |
| «La ruta `docs/author-lite/…` vive rota en 18 entradas de `docs_index.json`» | **18 en `notes` + 3 en `last_update_source`. Cero en `path`.** Las 149 entradas resuelven en disco | **Cierto en número, benigno en efecto** — es prosa, no navegación |
| «El contrato de color §3 y §4 quedó desactualizado» | **§3 sí** (tabla, filas 44-45). **§4 no**: su orden de resolución ya contempla hex en los pasos 2 y 3 | **Medio cierto** — ver §4.1 |

Y una cifra que el ticket no da y es la que manda: **el run 74 es el último de los 74**.

---

## 1. Qué hay hoy, medido

### 1.1 El contrato de packet, leído entero

CONTRATO: **123 líneas**, estado `Draft`, `Last verified: 2026-07-28`.

- **Secciones obligatorias: 8**, en orden fijo (`CONTRATO:42-53`): What it is · When to use ·
  Author fields · Layout compatibility · Example · Guardrails · Similar components ·
  Status and evidence.
- **Secciones opcionales: CERO.** El contrato no declara ni una. Esto importa: hoy no
  existe la categoría «opcional», así que **cualquier sección nueva entra como obligatoria
  para los 17** salvo que el contrato se enmiende.
- **Crecer hacia el perfil completo** (`CONTRATO:62-65`), citado: la plantilla de
  BLUEPRINT §5.5 «remains the full profile. Today's eight-section packets are its
  compressed profile; a packet may grow toward the full profile **inside its own doc run**
  without changing identity, location, or discipline.»
  → **El contrato ya autoriza el crecimiento sin enmienda, run por run.** Pero no dice
  cuánto, ni obliga a que los 17 crezcan igual. Es una puerta abierta sin tope.
- **Disciplina de campos** (`CONTRATO:55-60`): *Authored by hand* (narrativa) · *Derived
  from real files* (kind, renderer, campos, defaults, límites) · ***Reference-only*
  (status y certificación, **compatibilidad de color/paleta y math**, evidencia) — «el
  packet lleva el puntero, no la verdad»** · *Forbidden* (claims de status manuales, HTML
  crudo, campos internos del renderer como author-facing).

### 1.2 Los 17 packets, medidos uno a uno

| Packet | Líneas | Bytes | Secciones | Last verified | Punteros rotos |
|---|---:|---:|---:|---|---:|
| ARITHMETIC.md | 72 | 2 901 | 8 | 2026-07-12 | 4 |
| CALLOUT.md | 66 | 2 377 | 8 | 2026-07-12 | 4 |
| CARD.md | 71 | 3 079 | 8 | 2026-07-12 | 4 |
| **COLUMNS.md** | **145** | **9 833** | **10** | **2026-07-30** | **0** |
| CONCEPT-GRID.md | 72 | 2 660 | 8 | 2026-07-12 | 4 |
| DETAILS.md | 67 | 2 460 | 8 | 2026-07-12 | 4 |
| HEADER.md | 69 | 2 857 | 8 | 2026-07-12 | 4 |
| HIERARCHY.md | 68 | 2 623 | 8 | 2026-07-12 | 4 |
| ICON-LIST.md | 68 | 2 652 | 8 | 2026-07-12 | 4 |
| LIST.md | 69 | 2 399 | 8 | 2026-07-12 | 4 |
| NARRATIVE.md | 66 | 2 431 | 8 | 2026-07-12 | 4 |
| RULE.md | 68 | 2 618 | 8 | 2026-07-12 | 4 |
| SPLIT.md | 73 | 3 161 | 8 | 2026-07-12 | 4 |
| TABLE.md | 69 | 2 488 | 8 | 2026-07-12 | 4 |
| TIMELINE.md | 69 | 2 640 | 8 | 2026-07-12 | 4 |
| VIDEO.md | 65 | 2 276 | 8 | 2026-07-12 | 4 |
| VISUAL.md | 67 | 2 532 | 8 | 2026-07-12 | 4 |

- **16 de 17 son uniformes**: 8 secciones exactas, 65-73 líneas, 2 276-3 161 bytes.
- **COLUMNS.md es el único verificado** (`RUN-CANTU-WEB-COLUMNS-DOC-001`, `queue_order`
  14, `completed`). Es **2,1× en líneas y 3,5× en bytes** el promedio de los otros
  dieciséis, y añadió dos secciones fuera del contrato: *Color palette compatibility
  audit* y *Math and formula compatibility audit*.
- **Punteros rotos: 2 destinos distintos, 4 ocurrencias por packet, en 16 packets = 64
  ocurrencias.**
  - `docs/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` → **no existe**. El
    directorio `docs/author-lite/components/` **existe y está vacío**; el archivo vive en
    `docs/archive/author-lite/components/`.
  - `docs/REFERENCE-DRAFT-JSON.md` → **no existe**; el real es
    `docs/reference/REFERENCE-DRAFT-JSON.md`.
  - COLUMNS.md los reparó en su run. Los 16 doc-runs pendientes ya llevan la reparación en
    su `full_description`, citado: «repair the two stale pointers it carries».
- **Los 17 renderers declarados existen en disco. 17 de 17 correctos.** La disciplina
  *derived-from-real-files* se sostiene donde apunta a código; se rompe donde apunta a
  documentos.

**Verificación contra código vivo (muestra de 3, como pide el criterio 2):**

| Afirmación | Fuente | Contra código | Veredicto |
|---|---|---|---|
| Columns acepta Header, List, IconList, Rule, Card, Narrative, Callout, **Table y Split** (9) | `COLUMNS.md:44` | `SCHEMA-API:926-936` y `SCHEMA-UI:898-907`: unión de **9**, idéntica en ambos | **CIERTO** |
| `list` admite hasta 30 ítems, cada uno no vacío | `LIST.md:55` | `SCHEMA-API:33` `MAX_LIST_ITEMS = 30`; `.max(30)` y `z.string().min(1)` | **CIERTO** |
| `list.textSize` por defecto `medium` | `LIST.md:32` | `SCHEMA-API` `TextSizeEnum.optional().default('medium')` | **CIERTO** |
| `header.title` requerido; `level` 1-3 | `HEADER.md:54-55` | `SCHEMA-API:565-570`: `title: z.string().min(1)`, `level: min(1).max(3)` | **CIERTO** |
| `header.variant` / `list.variant` = «a palette role» | `HEADER.md:33`, `LIST.md:31` | Ambos aceptan **token id `.or()` hex `#RRGGBB`** (`SCHEMA-API:568` y `:752`) | **INCOMPLETO** — omite el hex |

**Ningún packet afirma nada falso.** El único defecto de contenido medido es la omisión
del hex en dos packets, que es la misma deriva del contrato de color (§4.1). Un packet que
no dice algo es más barato que uno que miente: **los 17 packets están limpios en ese eje.**

### 1.3 La Guía de componente, medida en su JSX

GUÍA: **2 608 líneas, 103 985 bytes.** Es, sola, **casi el doble en bytes que los 17
packets juntos** (54 947 bytes).

**Qué renderiza y para quién** (`GUÍA:2592`), citado:
`const isRichGuide = view === 'component' && ['columns', 'header', 'list'].includes(item?.action);`

- **3 componentes** con guía rica, desde objetos literales en el propio archivo:
  `listGuide` (`GUÍA:42-167`), `headerGuide` (`:169-289`), `columnsGuide` (`:291-538`).
  Los despachos cortocircuitan en `GUÍA:2497`, `:2520` y `:2543`.
- **Los otros 14** caen en `GenericComponentGuide` (`GUÍA:2329-2407`), que **no lee el
  packet**: lee `item.docs` — un prop que viene del CATÁLOGO (§1.5).

**El toggle Autor / Programador, exactamente** (`ModeSwitch`, `GUÍA:658-700`):
dos botones, `{ id: 'author', label: 'Autor', icon: UserRound }` y
`{ id: 'programmer', label: 'Programador', icon: Code2 }`. `DEFAULT_MODE = 'author'`
(`GUÍA:40`). No es un filtro sobre un cuerpo común: **elige entre dos ramas de datos
disjuntas**, `guide.author` y `guide.programmer`, y entre dos componentes de render
distintos.

| Modo | Secciones renderizadas (rótulo en pantalla) | Origen del texto |
|---|---|---|
| **Autor** (`ListAuthorGuide`, `GUÍA:938-976`) | Cabecera: `title`, `summary`, **`statusLabel`** · «Reglas de Uso»: **«Ideal para»** (`idealUses`) + **«Evítalo si»** (`avoidUses`) · **«Campos de Edición»** (`fields`: label/requirement/type/description) + **«Mejores prácticas»** (`bestPractices`) · «Vista previa» (render en vivo) | Literal en el JSX |
| **Programador** (`ListProgrammerGuide`, `GUÍA:1211-1241`) | Cabecera igual · «Flujo de Compilación» (`CompilationFlow`) + `draftJson` + `compiledSchema` · «Referencia de API» (`apiReference`: prop/type/required/desc) · `limitations` + **`status`** (tabla de 6-7 filas) + `route` | Literal en el JSX |

**El `statusLabel` y la tabla `status` son el hallazgo grave.** Ver §2.2.

### 1.4 La Docs view de la consola

DOCSVIEW: **5 631 líneas, 283 684 bytes.** La función es `renderSelectedDoc`.

Renderiza exactamente tres cosas: el **título** del registro, un `<details>` **Metadata**
colapsado, y el **cuerpo markdown entero** vía `loadDocBody(doc)`.

Los metadatos son **4 campos derivados** (`renderDocMetadataDetails`), y el comentario del
código lo dice: «four legible fields only» — Status (etiqueta humana, no el token crudo),
Category (grupo del Blueprint), Last update (fecha, no un run id), Path. Campos que
**ignora explícitamente**, citado del mismo comentario: «Retention class, Review status,
and Related run are no longer displayed.» De los 17 campos por entrada del registro,
muestra 4.

**Lo decisivo para la decisión de forma: la Docs view no consume ni un solo campo
específico del packet.** No parsea `## Author fields`, no lee la tabla de metadatos, no
sabe que existe un contrato de 8 secciones. Es un lector de markdown genérico: renderiza
un packet de 8 secciones y uno de 13 **exactamente igual**.

> **Crecer el packet le cuesta CERO a la Docs view.** Este consumidor no vota en la
> decisión de forma. El coste real está en otro sitio (§4.2).

### 1.5 Qué otras superficies documentan estos componentes

Se buscó en `docs/reference/`, `docs/archive/`, `CLAUDE.md`, `AGENTS.md` y el código.
**Se encontraron ocho superficies vivas.** El CONTRATO §5 registra dos.

| # | Superficie | Tamaño | Cubre | ¿La registra el contrato? |
|---|---|---:|---|---|
| 1 | PACKETS | 54 947 B / 17 archivos | 17 | Sí — es el canónico |
| 2 | DOCSVIEW | (genérico) | 149 docs | Sí — consumidor 2 |
| 3 | GUÍA, contenido inline | ~500 líneas dentro de 103 985 B | 3 | Sí — consumidor 1, «inline hardcoded for three» |
| 4 | **CATÁLOGO, bloques `docs:`** | **866 líneas dentro de 60 244 B, 20 bloques** | **17 web + 3 slide** | **NO** |
| 5 | `docs/archive/author-lite/components/AUTHOR_COMPONENT_GUIDE.md` | 45 248 B / 1 183 líneas | 17 | No (BLUEPRINT §5.5 lo nombra como *anchor* H.1-H.13) |
| 6 | `docs/archive/author-lite/components/WEB_AUTHOR_FACING_CONTRACTS.md` | 32 685 B | 17 | No (BLUEPRINT §5.5 lo nombra como esqueleto de 14 partes) |
| 7 | MATRIZ | 50 998 B | 17 | Sí — como fuente única de *status* |
| 8 | **`CLAUDE.md` + `AGENTS.md`** | 4 ocurrencias cada uno del puntero roto; tabla de estado **duplicada dos veces por archivo** | **8 de 17** | **NO** |

**El hallazgo #4 es el que más cambia la decisión.** El CATÁLOGO no es un registro de
bloques con una descripción: son **866 líneas de documentación por componente**, con ramas
`user` y `developer` que espejan exactamente el toggle Autor/Programador:

| `action` | líneas `docs:` | ¿se renderiza? |
|---|---:|---|
| **list** | **305** | **NO — cortocircuitado en `GUÍA:2497`** |
| **columns** | **82** | **NO — cortocircuitado en `GUÍA:2543`** |
| **header** | **16** | **NO — cortocircuitado en `GUÍA:2520`** |
| timeline | 50 | Sí |
| hierarchy | 47 | Sí |
| table | 47 | Sí |
| arithmetic | 46 | Sí |
| conceptGrid | 45 | Sí |
| rule / details | 42 c/u | Sí |
| card | 16 | Sí |
| callout / narrative / iconList / visual / video | 15 c/u | Sí |
| split | 14 | Sí |
| titleSlide / columnsSlide / visualBlock | 13 / 15 / 11 | Sí (Slides) |

Verificación de que nadie más lo lee: un barrido de `.docs` sobre todo `editor-ui/src`
devuelve **cinco referencias, las cinco dentro de `GenericComponentGuide`**
(`GUÍA:2331-2344`). No hay otro consumidor.

> **403 líneas de documentación en el CATÁLOGO (list 305 + columns 82 + header 16) son
> demostrablemente inalcanzables**: son justo los tres componentes que el despacho desvía
> a la guía rica antes de llegar a `GenericComponentGuide`. Están escritas, están
> versionadas, el GUARDIÁN las vigila contra mojibake — y **no las ve nadie.**

### 1.6 El guardián, medido

GUARDIÁN: **43 líneas**. Cubre **2 archivos** (GUÍA y CATÁLOGO) con **6 patrones
prohibidos**: `U+00C3`, `U+00C2`, `U+00E2`, `U+FFFD`, más las cadenas
`'Lista con etiquetas Block'` y `'Lista destacada'`. Sale `1` si encuentra alguno.

Lo que **no** hace: no compara con los packets, no valida el `statusLabel`, no detecta
deriva de contenido, no cubre los dos schemas — que es justo donde el mojibake sigue vivo
(§4.3). **Es un test de codificación, no un guardián de fuente única.** El run 74 lo llama
«a text-integrity script that guards that inline text as if it were the source»; la
segunda mitad de esa frase describe su efecto político, no su código.

---

## 2. El mapa de solape

### 2.1 Tabla contenido por contenido

Leyenda: **V** = es la verdad (código o fuente única) · **D** = documento · **∅** = no está.

| # | Pieza de información | PACKET | GUÍA (3) | CATÁLOGO (14) | Referencia / Matriz | CLAUDE+AGENTS | ¿Coinciden? |
|---|---|---|---|---|---|---|---|
| 1 | Draft kind | D | ∅ | `action` **V** | REFERENCE-DRAFT-JSON | ∅ | Sí |
| 2 | Ruta del renderer | D | `route` D | ∅ | ∅ | ∅ | **Sí** — 17/17 correctas |
| 3 | Clasificación top-level/child | D | `limitations` D | ∅ | Schema **V** | ∅ | Sí |
| 4 | **Estado de certificación** | puntero (**roto**) | **`statusLabel` + tabla `status`** | ∅ | **MATRIZ V** | tabla propia | **NO — 4 versiones** |
| 5 | Qué es (prosa) | D | `summary` | `docs.user.description` | AUTHOR_COMPONENT_GUIDE | ∅ | Sí en fondo |
| 6 | Cuándo usarlo | D | `idealUses` | `docs.user.useCases` | AUTHOR_COMPONENT_GUIDE | ∅ | Sí en fondo |
| 7 | Cuándo NO usarlo | D (plegado) | `avoidUses` | ∅ | ∅ | ∅ | Sí en fondo |
| 8 | Campos de autor: **nombres** | claves Draft (`items`) | **rótulos UI** («Puntos de la lista») | rótulos UI | Schema **V** | ∅ | **Divergen en vocabulario** |
| 9 | Campos de autor: **tipo/requerido/default** | prosa, parcial | `apiReference` tabla | `docs.developer` | Schema **V** | ∅ | Sí donde se solapan |
| 10 | **Mejores prácticas** | **∅** | `bestPractices` | ∅ | ∅ | ∅ | **Solo la Guía** |
| 11 | **Hijos aceptados por columns** | **9 (cierto)** | **7 + candidatos (falso)** | ∅ | Schema **V = 9** | ∅ | **NO — ver §2.3** |
| 12 | Ejemplo Draft JSON | D | `draftJson` | `docs.developer.jsonSchema` | ∅ | ∅ | Sí |
| 13 | **Schema compilado** | **∅** | `compiledSchema` | ∅ | ∅ | ∅ | **Solo la Guía** |
| 14 | **Flujo de compilación** | **∅** | `CompilationFlow` | ∅ | ∅ | ∅ | **Solo la Guía** |
| 15 | Límites y guardrails | D | `limitations` | `docs.developer.validation` | Schema **V** | ∅ | Sí |
| 16 | Mensajes de validación | ∅ | ∅ | ∅ | Schemas **V** (con mojibake) | ∅ | — |
| 17 | Componentes similares | **D — solo aquí** | ∅ | ∅ | ∅ | ∅ | Único |
| 18 | Compatibilidad color/math | puntero; **COLUMNS embebe 63 líneas** | ∅ | ∅ | 3 REFERENCE **V** | ∅ | **Duplicado en COLUMNS** |
| 19 | **Fixture de sandbox** | **∅** | ∅ | ∅ | ∅ | **solo aquí** | **Falta donde toca** |
| 20 | Vista previa en vivo | ∅ | `preview` (runtime) | ∅ | ∅ | ∅ | No es documentación |

### 2.2 La divergencia #4, citada de los dos lados

**MATRIZ (fuente única, `MATRIZ:95`), para Lista Web:**
`COMPONENT_CERTIFIED / DOCS_APPROVED / POST_CERT_COLOR_UI_REGRESSION_REPAIR_REQUIRED / NOT_WEB_CERTIFIED`

**GUÍA (`GUÍA:45`):** `statusLabel: 'Certificado'`
**GUÍA (`GUÍA:164`):** `{ label: 'Estado formal', status: 'CERTIFICADO', tone: 'success' }`
— y las **7 filas** de la tabla en verde, incluida `MOODLE Output: APROBADO`.

**CLAUDE.md:448 / AGENTS.md:448:** `` `list` | `MANUAL_QA_APPROVED` | No certificado. ``

**Cuál es cierta contra el sistema:** la MATRIZ, porque el CONTRATO §2 la designa fuente
única y el CONTRATO §5 prohíbe a un consumidor crear status. La GUÍA **suprime dos
calificadores de la matriz** — `POST_CERT_COLOR_UI_REGRESSION_REPAIR_REQUIRED` y
`NOT_WEB_CERTIFIED` — y los reemplaza por una palabra verde. `CLAUDE.md` y `AGENTS.md`
usan un token, `MANUAL_QA_APPROVED`, que la matriz sí define (`MATRIZ:50`) pero que ya no
es el estado de `list`; y usan `IMPLEMENTED_PRE_CERTIFICATION` (×4 componentes), que **no
figura en el vocabulario de la matriz** (`MATRIZ:38`, donde el token análogo es
`IMPLEMENTED_UNCERTIFIED`).

El propio run 74 lo dice, citado: «no author-facing component is certified today».

`headerGuide` (`GUÍA:172`) declara `COMPONENT_CERTIFIED / DOCS_APPROVED / NOT_WEB_CERTIFIED`
y también omite `POST_CERT_COLOR_UI_REGRESSION_REPAIR_REQUIRED`, que la matriz sí le da
(`MATRIZ:96`). El defecto es el mismo; la magnitud, menor.

### 2.3 La divergencia #11, citada de los dos lados

**PACKET (`COLUMNS.md:44`):** «Its slots accept these child blocks: Header, List, IconList,
Rule, Card, Narrative, Callout, **Table, and Split**.» → **9**

**GUÍA (`GUÍA:328` y `:497`):** `header | list | iconList | card | narrative | rule | callout`
→ **7**, con `table` y `split` degradados a
`COLUMNS_BOUNDED_OR_CONDITIONAL_CANDIDATE` (`GUÍA:502-505`) junto a `details`,
`conceptGrid` y `visual`, y la nota «table layout QA sigue pendiente; split UI sigue
pendiente».

**Cuál es cierta contra el código:** **el PACKET.** `SCHEMA-API:926-936` y
`SCHEMA-UI:898-907` declaran una unión de **9**, idéntica en ambos schemas, con
`WebTableSchema` y `WebSplitColumnsChildSchema` como miembros de pleno derecho. Y
`details`, `conceptGrid` y `visual` **no están en la unión**: la Guía los presenta como
candidatos de un componente que el schema rechaza.

> Esto invierte el supuesto del encargo. La superficie que se creía rica y cuidada —la
> Guía— es la que ha derivado; el packet de 69 líneas es el que dice la verdad. **La Guía
> se quedó congelada en el estado de «Phase 2»; el schema avanzó y nadie volvió.** Es
> exactamente el fallo que produce la documentación sin dueño.

### 2.4 Los tres cubos

#### FALTA — el sistema lo necesita registrado y no está en ninguna superficie

| Pieza | Dónde debería vivir | Quién la consume |
|---|---|---|
| **Mapa rótulo-UI ↔ clave Draft** (el autor ve «Puntos de la lista», el packet dice `items`) | PACKET, columna nueva en *Author fields* (BLUEPRINT §5.4 la pide: «field \| **UI label** \| type \| default \| allowed values») | **El autor**, y todo doc-run que compare Guía con packet. Hoy nadie puede cruzarlos sin leer el JSX |
| **Puntero al fixture de sandbox** | PACKET, 5.ª fila de metadatos (BLUEPRINT §5.5 la especifica) | Un run de componente futuro; hoy solo está en `CLAUDE.md`/`AGENTS.md`, que no son canónicos |
| **Campos ocultos** (§5 del perfil completo) | PACKET | Solo COLUMNS.md lo trata (`fullWidth`/`colSpan`). Los otros 16, nada |
| **Seguridad y sanitización** (§9) | PACKET | LIST.md tiene 1 viñeta; ningún packet tiene sección. Es el eje donde una omisión sí hace daño |
| **Comportamiento responsive/preview** (§8) | PACKET | El autor |
| **Que `header` y `list` aceptan hex además de token** | HEADER.md, LIST.md y COLOR §3 | Todo run de componente que lea COLOR como autoridad |
| **Mejores prácticas** para los 14 sin guía rica | PACKET o superficie de autor | El autor. Existe para 3 de 17 |

#### DUPLICADA — vive en dos o más sitios

| Pieza | Superficies | **Cuál debería ser el único** |
|---|---|---|
| Estado de certificación | 6: MATRIZ, GUÍA ×2 (label + tabla), CLAUDE.md, AGENTS.md, `component_status.json`, y el puntero roto de los packets | **MATRIZ.** Ya está decidido por CONTRATO §2; lo que falta es retirar las otras cinco |
| Cuándo usarlo / evitarlo | 4: PACKET, GUÍA, CATÁLOGO, AUTHOR_COMPONENT_GUIDE | **PACKET** |
| Campos de autor | 4: PACKET, GUÍA, CATÁLOGO, REFERENCE-DRAFT-JSON | **Schema** es la verdad; **PACKET** es el documento; REFERENCE-DRAFT-JSON el contrato de tipos |
| Ejemplo Draft JSON | 3: PACKET, GUÍA, CATÁLOGO | **PACKET** |
| Hijos aceptados de columns | 3: PACKET (9), GUÍA (7), Schema (9) | **Schema** verdad, **PACKET** documento |
| Compatibilidad color/math | 2 para Columns: los 3 REFERENCE **y** las 63 líneas embebidas en COLUMNS.md | **REFERENCE.** El CONTRATO §3 ya lo clasifica *reference-only* |
| Ruta del renderer | 2: PACKET, GUÍA `route` | **PACKET** |

#### SOBRA — está documentado y no le sirve a nadie

Este cubo no sale vacío. En orden de gravedad:

1. **Las 403 líneas inalcanzables del CATÁLOGO** (`list` 305, `columns` 82, `header` 16).
   Demostrablemente muertas: el despacho las evita. Se mantienen, se versionan, el
   GUARDIÁN las vigila. **Consumidor: nadie.** No es «documentación de más» por criterio
   estético — es código muerto con forma de documentación.

2. **Las dos secciones de auditoría embebidas en COLUMNS.md: 63 de sus 145 líneas, el
   43 % del packet.** Y dicen, en veinte filas de tabla, que **Columns no tiene ni color
   ni math**: `COLOR_PALETTE_NOT_APPLICABLE` y `MATH_FORMULA_NOT_APPLICABLE`. Ocho de las
   diez filas de math se declaran «Empty» una por una. El CONTRATO §3 clasifica
   color/math como *reference-only* —«el packet lleva el puntero, no la verdad»— y
   COLUMNS.md **lleva las dos cosas**: las 63 líneas de auditoría *y*, en *Status and
   evidence*, el puntero a los tres REFERENCE que ya lo poseen.
   El propio packet se defiende de la objeción (`COLUMNS.md:89`): «This block and the math
   block below are sections of this packet, not separate files.» Nombra la tensión; no la
   resuelve.
   **Lo grave no es COLUMNS.md: es que es el único run ejecutado, y por tanto la
   plantilla.** Si los 16 restantes copian el patrón, el corpus gana del orden de **1 000
   líneas de tablas cuyo contenido mayoritario es «no aplica»**, en la sección que el
   contrato declaró que no debía llevar contenido. **Consumidor: nadie** — un run futuro
   que necesite la clasificación de color leerá el REFERENCE, que es su dueño.

3. **Las tablas `status` de la GUÍA** (7 filas en `list`, 7 en `header`, 6 en `columns`).
   Prohibidas por CONTRATO §5, falsas contra la MATRIZ (§2.2), y duplicando una fuente
   única. **Consumidor: el autor — mal informado.** Peor que nadie.

4. **Las tablas de estado de componentes de `CLAUDE.md` y `AGENTS.md`**, duplicadas *dos
   veces dentro de cada archivo* (bloque de código ~línea 280 y tabla markdown ~línea 444),
   cubriendo **8 de 17** componentes, con vocabulario que la matriz no reconoce, y
   apuntando ambas al puntero roto. **Consumidor: los ejecutores IA** — que las leen como
   gobernanza y las creen. Es la duplicación más cara del repo por unidad de línea.

5. **`AUTHOR_COMPONENT_GUIDE.md` (1 183 líneas) y `WEB_AUTHOR_FACING_CONTRACTS.md`
   (32 685 B)**, en `docs/archive/`. Superadas de hecho por los packets, pero **BLUEPRINT
   §5.5 las sigue nombrando como el *anchor* H.1-H.13 y el esqueleto de 14 partes** del
   perfil completo. **Consumidor: un doc-run futuro, como cantera.** Nada más, y solo
   mientras el Blueprint las cite.

6. **Los dos patrones de cadena del GUARDIÁN** (`'Lista destacada'`,
   `'Lista con etiquetas Block'`): un test de regresión de dos incidentes puntuales,
   congelado en un linter permanente. **Consumidor: nadie**, salvo que alguien reintroduzca
   exactamente esas dos cadenas.

7. **La coletilla «Illustrative only; the authoritative schema is …»**, repetida en los 17
   packets inmediatamente después de una línea que ya dice lo mismo en *Author fields*.
   34 líneas de repetición. Menor, pero es exactamente el tipo de texto que nadie lee.

#### Quién consume cada pieza — la respuesta corta

| Consumidor | Qué lee de verdad hoy |
|---|---|
| **El autor de lecciones** | La GUÍA, en el Editor. **No lee los packets** — están en inglés, en la consola, y él trabaja en español dentro del Editor |
| **La Docs view / el operador** | El cuerpo markdown de los packets, genérico |
| **Un doc-run de componente** | El CONTRATO, el packet, los schemas, los REFERENCE |
| **Los ejecutores IA** | `CLAUDE.md` y `AGENTS.md` — **las dos superficies con el estado más desactualizado** |
| **Nadie** | Las 403 líneas del CATÁLOGO · las 63 líneas de auditoría de COLUMNS.md · los dos patrones de cadena del GUARDIÁN |

---

## 3. El hueco entre el packet y la Guía, cuantificado

**Perfil completo (BLUEPRINT §5.5) = 13 secciones + banner + tabla de 5 filas.**
Mapeo contra las 8 de hoy:

| BLUEPRINT §5.5 | Hoy en el packet |
|---|---|
| 1 Purpose | ✅ *What it is* |
| 2 When to use | ✅ *When to use* |
| 3 When NOT to use | ◐ plegado en la última viñeta de *When to use* |
| 4 Author-visible fields (tabla field \| **UI label** \| type \| default \| allowed) | ◐ prosa, **sin rótulo UI, sin tipo, sin default tabulado** |
| 5 Hidden fields | ❌ solo COLUMNS |
| 6 Validation rules | ◐ plegado en *Guardrails* |
| 7 Layout compatibility | ✅ |
| 8 Responsive and preview behavior | ❌ |
| 9 Security and sanitization | ❌ (1 viñeta en LIST.md) |
| 10 Worked example (Draft JSON **+ salida compilada**) | ◐ solo Draft JSON |
| 11 Limits and guardrails | ✅ *Guardrails* |
| 12 Similar components | ✅ |
| 13 Evidence | ✅ *Status and evidence* |
| metadatos: **Sandbox fixture** | ❌ |

**Secciones que la Guía renderiza y el packet no tiene: 5.**

| Sección de la Guía | ¿Cabría en un packet mantenible? |
|---|---|
| **«Mejores prácticas»** (`bestPractices`, 4-7 viñetas con tono) | **Sí.** Es narrativa de autor, escrita a mano, estable. Coste bajo, valor alto |
| **`compiledSchema`** | **Sí, con reserva.** BLUEPRINT §10 ya lo pide. Pero es **derivado del compilador**: se pudre solo en cuanto el compilador cambie, salvo que un run lo regenere. Es el candidato más caro de mantener |
| **`CompilationFlow`** (Draft → compilado → HTML) | **No por componente.** Es idéntico para los 17. Va en un documento de arquitectura, una vez |
| **`statusLabel` + tabla `status`** | **No. Prohibido** por CONTRATO §3 (*Forbidden: manual status claims*) y §5 |
| **`preview` en vivo** | **No.** Es runtime, no documento. Es lo único que la Guía puede dar y un `.md` no |

**Respuesta al criterio 9:** de las cinco, **dos caben y deberían** (mejores prácticas, y
la salida compilada dentro del ejemplo), **una va a otro documento** (flujo de
compilación), y **dos no deben entrar nunca** (status y preview en vivo). El hueco real es
**mucho menor de lo que sugiere la diferencia de tamaño** entre 104 KB y 2,6 KB.

Ese diferencial de tamaño **no es documentación**: es JSX de presentación —paneles,
`className` de Tailwind, breakpoints, iconos, `CodeBlock` con botón de copiar. El contenido
de autor real de los tres componentes cabe en unas 500 líneas de literales.

---

## 4. Deriva conocida — verificada hoy

### 4.1 El contrato de color, §3 y §4

**§3 — CONFIRMADO STALE.** `COLOR:44-45`:

| `header` | `variant` | token id |
| `list` | `variant` | token id |

Contra código: `SCHEMA-API:568` (header) y `:752` (list) — ambos
`z.string().regex(COLOR_TOKEN_ID).or(z.string().regex(HEX_COLOR))`. La fila de `card`
(`COLOR:46`) **ya usa la forma correcta**: «token id, or `#RRGGBB`». Las de header y list
no.

Dos agravantes medidos:

- **El propio §3 se contradice.** Su frase de apertura (`COLOR:40`) dice «Draft JSON stores
  a reference **or an author-chosen hex**». La tabla dos líneas después lo niega para
  header y list.
- **`COLOR:56`** limita el hex «for card-family fields» — un alcance que el código ya
  desbordó.

Y el comentario del propio schema (`SCHEMA-API:560-564`) lo dice sin ambigüedad, citado:
«Solo lo llevan **header y list**, los dos cuyo compilador resuelve el hex.» Son
exactamente **2** los bloques con `.or(HEX_COLOR)`, y son esos dos.

**§4 — NO ESTÁ DESACTUALIZADO.** Su orden de resolución (`COLOR:79-85`) **ya contempla el
hex** en los pasos 2 y 3: «A token whose `accent` equals the value, **when the value is a
valid hex**» y «A synthesized custom token with roles derived from that hex». La tabla
`COLOR:68-69` («`variant` plus resolved `color`») sigue siendo cierta con hex. Lo único
criticable es el rótulo del bloque, «Resolution order **for a token id**», que enmarca de
más lo que el cuerpo ya resuelve bien.

> Corrección al ticket: la deriva está **concentrada en §3**, no repartida entre §3 y §4.
> Importa porque los runs de componente leen COLOR como autoridad: enmendar §4 sin
> necesidad sería trabajo perdido.

### 4.2 La ruta `docs/author-lite/…`

- En `docs_index.json` (149 entradas): **0 en `path`** — la navegación resuelve entera.
  Las ocurrencias viven en **18 strings de `notes`** y **3 de `last_update_source`**;
  22 ocurrencias crudas, de las cuales **17 son el mismo destino**, la matriz.
- **En todo el repo, el puntero roto a la matriz aparece 462 veces, en más de 100
  archivos.** El grueso es histórico o derivado (`legacy_run_disposition_map_v2.json` 72,
  `docs_corpus_curation_audit.json` 37, contextos `ctx_*.md` regenerables 19+19+19+15+15+15).
  **Las ocurrencias en superficie viva son las que importan:** 32 en los 16 packets,
  4 en `CLAUDE.md`, 4 en `AGENTS.md`, 3 en BLUEPRINT, 1 en
  `docs/governance/GOVERNANCE-AUTHORITY-AND-NO-CLAIMS.md`, 1 en
  `docs/how-to/HOW-TO-AUTHOR-A-LESSON.md`, 1 en `README.md`.
- El directorio `docs/author-lite/components/` **existe y está vacío**. Un enlace roto que
  apunta a un directorio real es más difícil de detectar que uno que apunta a la nada.

**No se reparó nada.** Los 16 doc-runs ya llevan la reparación de los packets en su
alcance; las otras superficies vivas (`CLAUDE.md`, `AGENTS.md`, BLUEPRINT, governance,
how-to, README) **no están cubiertas por ningún run localizado en esta medición**.

### 4.3 El mojibake de los dos schemas

**Sigue vivo, y está en mensajes que ve el autor.**

| Archivo | Líneas con marcador |
|---|---:|
| SCHEMA-API | **32** |
| SCHEMA-UI | **23** |

Muestras (`SCHEMA-API`): `"MÃ¡ximo ${MAX_LIST_ITEMS} puntos por lista"`, `"Color invÃ¡lido
(usa formato #RRGGBB)"`, `"El tÃ­tulo del Ã­tem es obligatorio"`, `"Agrega al menos un
Ã­tem"`, y el literal `"âš ï¸ LÃ­mite de TV excedido (40 palabras max)."`.

**La ironía medida:** el GUARDIÁN vigila exactamente estos cuatro marcadores — pero solo
en GUÍA y CATÁLOGO. **Los dos schemas, donde el mojibake sí está, no están en su lista de
archivos** (`GUARDIÁN:6-9`). El guardián protege las dos superficies limpias e ignora las
dos sucias.

Se observa además, sin repararlo, que la MATRIZ tiene **acentos perdidos, no mojibake**
(`MATRIZ:14`: «Registra qu componentes han pasado el pipeline completo de certificacin»).
Es una corrupción distinta y anterior; se nombra y no se toca.

---

## 5. La decisión de forma, costeada

### 5.0 La restricción que ninguna opción puede ignorar

Antes de las tres opciones, un hecho medido que las ordena a todas:

**BLUEPRINT §2, citado:** «Internal artifacts (docs, run notes, machine state, identifiers
in new files) are **ALL-ENGLISH with no accented characters**, in filenames or content.»

Los packets lo cumplen, y de forma deliberada: `COLUMNS.md:60` escribe `"Despues"` sin
tilde; `HEADER.md:46` escribe `"Por que dos fracciones distintas valen lo mismo"`. Incluso
los ejemplos en español van sin acentos.

**La GUÍA es español acentuado de principio a fin**, porque su lector es un autor de
lecciones hispanohablante: «Características», «Máximo 30 puntos», «Jerarquía»,
«Evítalo si», «Mejores prácticas».

> **El packet y la Guía no están escritos en el mismo idioma, y la diferencia está
> impuesta por un estándar de gobernanza, no por costumbre.**
>
> Cualquier opción que haga del packet la fuente del texto de autor de la Guía obliga a
> una de tres cosas: **enmendar BLUEPRINT §2** (un estándar rector, con radio de impacto
> sobre toda la documentación nueva), **meter una capa de traducción** entre packet y
> Guía, o **degradar la Guía al inglés** y con ello al autor.
>
> Esto no es un detalle de estilo. **Es el coste dominante de la opción A**, y no aparece
> en ninguna de las superficies que el encargo enumera.

### 5.1 Opción A — el packet crece y alimenta a los dos consumidores

El toggle Autor/Programador pasa a ser dos proyecciones de una fuente.

| Eje | Coste medido |
|---|---|
| **Qué gana el packet** | *Mejores prácticas*; columna de rótulo UI en *Author fields*; tabla tipada (type/required/default); salida compilada en *Example*. Y una partición explícita autor/programador que hoy no existe en el markdown |
| **Reescritura de los 17** | **17 de 17.** Los 16 en 8 secciones y también COLUMNS, que además tendría que decidir qué hace con sus 63 líneas de auditoría |
| **¿Enmienda del CONTRATO §3?** | **Sí, y en dos puntos.** La lista de secciones obligatorias (8 → 11 o 12) y la disciplina de campos, que necesitaría una clase nueva para el rótulo UI —hoy no es *derived from real files* ni *authored by hand*: es derivado del **JSX del Editor** |
| **¿Enmienda del BLUEPRINT?** | **Sí — §2, la regla de idioma.** Es el coste real (§5.0) |
| **Doc-runs que cambian de alcance** | **16 de 16.** Todos verificarían contra una forma nueva |
| **Efecto sobre la cola** | **Obliga a mover el run 74 por encima del 17** |
| **Riesgo propio** | El `compiledSchema` por componente es derivado del compilador: **17 nuevas superficies que se pudren solas.** Es documentación de más por construcción |

### 5.2 Opción B — el packet se queda técnico; el contenido de autor vive aparte

| Eje | Coste medido |
|---|---|
| **Qué se crea** | Un contrato de contenido de autor y su almacén. **Ya existe de hecho**: son las ~500 líneas de literales de la GUÍA más las 866 del CATÁLOGO. B no inventa una superficie; **le pone contrato y dueño a la que ya corre** |
| **Reescritura de los 17** | **0.** Solo las dos reparaciones de puntero ya presupuestadas en los 16 doc-runs |
| **¿Enmienda del CONTRATO §3?** | **No.** Las 8 secciones siguen |
| **¿Enmienda del CONTRATO §5?** | **Sí, acotada.** «No parallel store» debe legalizar un almacén de autor con dueño, o el modelo canónico debe admitir una segunda clase documental |
| **¿Enmienda del BLUEPRINT §2?** | **No.** Cada superficie se queda en su idioma: packet técnico en inglés, contenido de autor en español. **La frontera de idioma deja de ser un problema y pasa a ser el criterio de partición** |
| **Doc-runs que cambian de alcance** | **0 de 16** |
| **Efecto sobre la cola** | **Ninguno obligatorio.** El run 74 puede quedarse en 74 |
| **Riesgo propio** | Dos superficies siguen existiendo: **la duplicación no desaparece, se gobierna.** Exige que el contrato nuevo diga qué NO puede repetir el almacén de autor —empezando por el status |

### 5.3 Opción C — se retira una de las dos superficies

Dos lecturas, y solo una es viable:

- **C1 — retirar los packets.** Contradice el CONTRATO entero, la cadena de modelo
  (BLUEPRINT → MODELO CANÓNICO → CONTRATO), y **cancela 16 runs en cola**. La Docs view
  perdería 17 documentos. **No viable**; se enumera para descartarla con razón.
- **C2 — retirar el contenido inline de la Guía** y dejarla renderizando packets.
  **Esto no es una opción nueva: es literalmente el run 74**, cuyo `summary` dice «Retire
  the Component Guide's inline per-component content, its inline status labels, and the
  script that guards them, and render the canonical packets read-only instead.»

| Eje | Coste medido (C2) |
|---|---|
| **Reescritura de los 17** | **0** en principio — pero el autor pierde *Mejores prácticas*, el flujo de compilación y el schema compilado, **y pasa a leer documentación en inglés dentro de un Editor en español** |
| **¿Enmienda de contratos?** | **Ninguna.** Es el contrato aplicándose |
| **Doc-runs que cambian de alcance** | **0 de 16** |
| **Efecto sobre la cola** | Ninguno |
| **Riesgo propio** | **Regresión para el autor**, y es la razón por la que el run 74 lleva 74 posiciones sin ejecutarse. C2 sin decidir antes dónde vive el contenido de autor **degrada el Editor** |

### 5.4 Recomendación — **B**. No es una decisión; es una recomendación costeada

Se recomienda **B**, con el run 74 reencuadrado como «cablear la Guía a dos fuentes con
contrato» en lugar de «a una».

Las razones, en orden de peso, todas medidas en este encargo:

1. **La frontera de idioma es estructural, no estilística** (§5.0). B es la única opción
   que la respeta sin enmendar un estándar rector. A la convierte en su coste dominante;
   C2 la resuelve degradando al autor.
2. **La Docs view no vota** (§1.4): es agnóstica a la forma, así que el argumento «crecer
   el packet mejora la consola» **no existe**. Medido, no supuesto.
3. **B es la única opción con coste cero sobre los 16 doc-runs y sobre la cola.** A los
   toca todos y obliga a reordenar; C2 los deja intactos pero deja al autor peor.
4. **El hueco real es de dos secciones, no de un mundo** (§3). No justifica reescribir 17
   packets ni enmendar dos contratos.
5. **B ataca el cubo SOBRA, que es donde está el daño de verdad.** Las 403 líneas muertas
   del CATÁLOGO y las 63 de auditoría de COLUMNS.md no se arreglan creciendo el packet:
   se arreglan **dándole dueño a cada pieza**, que es justo lo que B hace.

**Una advertencia que vale para cualquiera de las tres.** La pregunta «¿el packet crece de
8 a 13 secciones?» **es independiente** de la pregunta «¿quién alimenta a la Guía?».
*Hidden fields*, *Security and sanitization* y *Responsive behavior* faltan hoy y seguirán
faltando bajo A, B o C. Confundir ambas decisiones es el modo más probable de que este
encargo produzca la documentación de más que el operador quiere evitar.

**Y un aviso sobre el precedente.** COLUMNS.md es el único doc-run ejecutado y por tanto la
plantilla de los 16 siguientes. Si se ejecutan copiando su patrón de auditoría embebida,
el corpus gana ~1 000 líneas de tablas «no aplica» **antes** de que ninguna de estas tres
opciones se decida. **Ese reloj corre ahora y es independiente de la decisión de forma.**

---

## 6. El efecto sobre el orden de la cola

Medido sobre `.aiw/roadmap/roadmap.json`:

| Run | `queue_order` | `status` |
|---|---:|---|
| `RUN-CANTU-WEB-COLUMNS-DOC-001` | 14 | **completed** |
| Los 16 doc-runs restantes | **17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47** | planned |
| **`RUN-CANTU-COMPONENT-GUIDE-PACKET-WIRING-001`** | **74** | **planned** |

**El run 74 es el último de los 74 del roadmap.** Está **27 posiciones por debajo del
último doc-run** y **57 por debajo del primero**. Su única dependencia declarada es
`RUN-JAME-COMPONENT-DOC-SINGLE-SOURCE-CONTRACT-001`, que ya produjo el CONTRATO: **nada
técnico lo retiene en 74.**

**Respuesta directa al criterio 11:**

| Opción | ¿Obliga a mover el 74 arriba? | Por qué |
|---|---|---|
| **A** | **SÍ — imprescindible, por encima del 17** | Bajo A la forma del packet cambia. Los 16 doc-runs verificarían contra las 8 secciones y refrescarían su banner `Last verified`, y el run 74 los invalidaría a los dieciséis acto seguido. **Se pagaría dos veces el mismo trabajo, y en medio el corpus quedaría certificado como fresco contra una forma ya muerta** |
| **B** | **No** | La forma del packet no cambia. Los 16 verifican contra un contrato estable. El 74 puede correr después sin invalidar nada — solo necesita que el contrato de contenido de autor exista antes que él |
| **C2** | **No** | Tampoco cambia la forma. Pero conviene subirlo **por razón de producto, no de cola**: mientras siga en 74, el `statusLabel: 'Certificado'` falso sigue en pantalla |

**Y una consecuencia que no depende de la opción elegida.** El `statusLabel: 'Certificado'`
de `list` contradice a la MATRIZ hoy, y su retirada está atada al run 74, el último de la
cola. **Es la única deriva medida en este encargo que muestra al autor una afirmación
falsa en la interfaz.** Que su reparación esté programada la última no se sigue de ninguna
dependencia técnica: se sigue de dónde cayó el run.

---

## 7. Transversales — verificación

### 7.1 Cero escrituras en `cantu-studio`

Huella: `path|bytes|mtime` de **todos** los archivos, `node_modules` incluido, ordenada y
resumida con md5. El scratchpad vive fuera de los repos, en
`AppData/Local/Temp/claude/…/scratchpad`.

| Momento | Archivos | md5 de la huella |
|---|---:|---|
| Antes | **21 513** | `a44c25c8b8deaa24e9f0e75f0d0486c9` |
| Después | **21 513** | `a44c25c8b8deaa24e9f0e75f0d0486c9` |

**Coinciden. Diferencias: 0.** `node_modules` cubierto: **20 255** de los 21 513 archivos
contados están bajo `tools/author-lite/node_modules`.

Observación sobre el aislamiento, que el ticket no anticipa: **el hilo paralelo no escribe
solo en `aiw-console`; también escribe en `cantu-studio`** — `.aiw/roadmap/roadmap.json` y
los seis `.project/*.json` llevan marca de tiempo de esta misma ventana. Quedaron fijados
**antes** de la huella base de este encargo, por eso el diff sale limpio. Se registra
porque afecta a quien mida después: **una medición de `cantu-studio` no está sola aunque
el ticket la declare de solo lectura.** Las cifras de §7.3 se reconfirmaron tras esa
actividad y no se movieron.

### 7.2 Superficies disjuntas — `aiw-console`

El hilo paralelo estuvo activo sobre este repo durante todo el encargo, así que la huella
bruta **no coincide y no debe coincidir**. Se declaran las dos y se atribuye cada
diferencia.

| Huella | Momento | Archivos | md5 |
|---|---|---:|---|
| **Bruta** (con `.git`) | Antes | 838 | `151d030b407dffefa43327c83857186b` |
| **Bruta** (con `.git`) | Después | **310** | `9d51134a867421e54ad61a59e9adb832` |
| **De contenido** (sin `.git`) | Antes | 254 | `e572009f2d4b432c61d94495298fd69b` |
| **De contenido** (sin `.git`) | Después | **256** | `596ab45e4877df1ddb70627297192d71` |

La caída de 838 a 310 es **empaquetado de objetos git del hilo paralelo** (`.git/objects/*`
sueltos → packfile). No es borrado de contenido y no es de este encargo.

**Atribución de las diferencias de contenido, una por una:**

| Archivo | ¿De quién? |
|---|---|
| `context/aiw-console/records/MEDICION-SUPERFICIE-DOC-COMPONENTES-WEB-Y-FORMA-DEL-PACKET-CANTU.md` | **DE ESTE ENCARGO** — alta, y la única |
| `context/aiw-console/records/INSERCION-RUN-PROYECTOR-CASE-BANKS.md` | Hilo paralelo — alta |
| `.project/{docs_index,git_history,guardrails,no_claims,roadmap,snapshot}.json` | Hilo paralelo — re-emisión de `.project/` |
| `roadmap/roadmap.json` | Hilo paralelo |
| `context/handoffs/aiw.md` | Hilo paralelo |

**Archivos preexistentes que desaparecieron: 0.** Archivos nuevos: 2, de los cuales **uno
es este record y el otro no es mío**. Este encargo **no re-emitió `.project/`** — esas seis
reescrituras llevan marca de tiempo del hilo paralelo y son ajenas.

### 7.3 Validador — antes y después, por la vía que no escribe

CANTU-VALID no contiene ni una escritura en sus 3 087 líneas (`writeFile`/`writeFileSync`:
0 ocurrencias). Se ejecuta con `cwd` = `cantu-studio`, que es como resuelve su raíz
(`const root = process.cwd()`).

```
EXIT 0 — Project Console state validation passed.
```

**Idéntico antes y después.** Medición reportada por el validador:

| Métrica | Valor |
|---|---|
| **Objetivos / Fases / Runs** | **7 / 28 / 74** |
| Grupos de cola | `needs_human_decision=0` · `now=0` · `ready_next=21` · `later=36` · `history=17` |
| Docs indexados | 149 |
| Docs curados visibles | 60 de 149 |
| Estados de componente | 16 |
| Episodios de proveniencia git | 9 |
| Snapshot git | 918 commits / 2 ramas / `current=main` / asociados a run: 6 |
| Avisos no bloqueantes | **1** — la arista externa conocida, `RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` → `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`, fuera de alcance por ticket |

Nota metodológica: el validador de `aiw-console`, ejecutado por error sobre `cantu-studio`,
devuelve `EXIT 1` con ~150 errores. **No es un hallazgo**: son dos validadores de esquemas
de roadmap distintos. El de Cantu es el suyo propio. Se registra para que nadie repita el
tropiezo.

### 7.4 Nada tocado

- Ningún `status` modificado. Ningún run cerrado, insertado, movido ni renumerado.
- `.project/` no re-emitido. Ningún `barrier` aplicado.
- Ningún contrato de referencia, DoD, Blueprint ni modelo canónico editado.
- **Git no se ejecutó en ninguna forma.** Ningún servidor levantado. Ninguna suite corrida.
- **Nada reparado**: los 64 punteros rotos, el `statusLabel` falso, los 7 hijos de la Guía,
  el mojibake de los dos schemas, la tabla §3 del contrato de color y las 403 líneas
  muertas del CATÁLOGO **siguen exactamente como estaban**.

### 7.5 Archivos escritos por este encargo, y ninguno más

| # | Ruta | Acción |
|---|---|---|
| 1 | `projects/aiw-console/context/aiw-console/records/MEDICION-SUPERFICIE-DOC-COMPONENTES-WEB-Y-FORMA-DEL-PACKET-CANTU.md` | Alta (este record) |

**Una sola fila. Ningún otro archivo, en ningún repo, fue creado, modificado ni borrado.**

Records en `context/aiw-console/records/`: **79** antes de escribir este, **80** después.
Nombre verificado sin colisión: una sola coincidencia, la propia.

Matiz de conteo, por honestidad: al arrancar el encargo eran **78**. El hilo paralelo dio
de alta `INSERCION-RUN-PROYECTOR-CASE-BANKS.md` mientras esta medición corría, dejándolos
en 79 antes de que este record se escribiera. **Este encargo aporta exactamente uno**, y el
total final es 80.

---

## 8. No-claims

- Esto es una **medición**. No certifica, no aprueba y no cierra nada.
- **No decide la forma del packet.** El criterio 10 recomienda **B**; la decisión es del
  operador.
- Ningún componente, motor ni superficie de consola cambia de estado por este documento.
- Ningún packet fue escrito, editado ni migrado. Los 17 siguen intactos.
- Las cifras heredadas del ticket fueron verificadas; las cinco que no resistieron están
  corregidas en §0 con su medición.
- La arista externa del roadmap queda **fuera de alcance**, sin resolver, tal como entró.
- El run que produzca cualquier decisión sobre esta medición **queda abierto hasta que el
  operador lo cierre desde la consola**.
