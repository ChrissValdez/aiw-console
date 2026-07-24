# EMISOR — `aiw-console` emite su propia carpeta (`O4.P2`)

> Entregable de conocimiento del run `RUN-CONSOLE-EMISOR-CARPETA-PROPIA-001`
> (fase `O4.P2`). Documenta **el diseño del emisor**, **la decisión del envelope**
> —qué viaja dentro del snapshot y qué se queda en el contrato— y **qué le falta al
> port (`O4.P11`) para pintar sus vistas**.
>
> Fecha: 2026-07-24. **No se ejecutó git en ninguna forma.** No se levantó la consola,
> el server ni el validador. No se tocó el roadmap, `DECISIONES.md`, `CONTRATO.md`,
> ningún record existente, ni el prototipo `console/`.
>
> **Archivos escritos por este run**, y ninguno más:
> `tools/projector/project.mjs` (modo de root nuevo, aditivo) ·
> `tests/projector-roadmap-tree.test.mjs` (nuevo) ·
> `governance/guardrails.json`, `governance/no_claims.json` y `governance/contract.json`
> (fuentes declaradas, nuevas) ·
> los cuatro archivos emitidos bajo `.project/` · este record.
> **El `.aiw/` de este repo NO fue modificado** (comprobado, Bloque D.3).

Insumos, usados y no re-medidos: `MEDICION-FUENTES-CONSOLA.md` (qué existe y qué
pinta píxeles), `VEREDICTO-ROADMAP-TREE-V1.md` (el árbol suelto no es
autodescriptivo), `AUDIT-CONSOLE-O4-PHASE0.md`, `CONTRATO.md` (capas 1–3).

---

## BLOQUE A — Qué se construyó: un modo de root nuevo, no un emisor paralelo

El proyector tenía **una** entrada posible: un root en formato AIW
(`objectives/{pending,parked,processed}/*.md` + `logs/<id>/summary.md` +
`config.json`). `aiw-console` **no tiene ninguna de las tres** (MEDICION-FUENTES,
Bloque E), así que no podía proyectarse a sí mismo. Se le enseñó un segundo modo en
vez de escribir un emisor aparte: dos emisores para el mismo contrato son dos formas
de divergir, que es el modo de fallo que el contrato entero existe para matar (§12.c
aplicado al código).

**El modo lo decide la FORMA del root, nunca su nombre.**
`detectRootMode(root)` devuelve `roadmap_tree` si y solo si
`<root>/roadmap/roadmap.json` existe, parsea, declara `schema_version:
"roadmap_tree_v1"` y trae `objectives[]`. Cualquier otra cosa —incluido un roadmap
de otro modelo— cae en `aiw_objectives`, el modo original. No hay lista de proyectos,
ni nombre horneado, ni bandera por proyecto.

| | Modo 1 `aiw_objectives` (existía) | Modo 2 `roadmap_tree` (nuevo) |
|---|---|---|
| Entrada | `objectives/`, `logs/`, `config.json` | `roadmap/roadmap.json`, `package.json`, `governance/*.json`, corpus `.md` |
| Salida | `.aiw/views/project_console.snapshot.json` + `.aiw/views/roadmap.json` | `.project/snapshot.json` + 3 opcionales |
| Guarda de ruta | `resolveInsideAiw` (intacta) | `resolveInsideProject` (nueva, su espejo) |
| Identidad | `config.json` → nombre de carpeta | `package.json` `name` → nombre de carpeta |

**La aditividad está probada, no afirmada:**

1. **La proyección de AIW por el layout viejo sale byte-idéntica.** Se reconstruyó
   `buildSnapshot('../../aiw')` en memoria con el `generated_at` del archivo en disco
   y se comparó serializado completo contra
   `.aiw/views/project_console.snapshot.json`: **idéntico**, con la única diferencia
   de `generated_from` (versión del emisor, §C.6). `project_id: "aiw"`, 16 objetivos,
   `aiw_flat_objectives_v1`, 16 runs en la vista de roadmap — como antes. La
   comparación se hizo **por API pura de lectura**: no se escribió en `aiw/` ni en
   ningún otro repo.
2. **La suite pasa entera: 41/41** (31 previas + 10 nuevas). Las 31 previas no se
   tocaron.
3. El server (`serve-project-console.mjs`) llama `buildSnapshot`/`buildRoadmap` por
   nombre; ninguna de las dos cambió de firma ni de comportamiento.

---

## BLOQUE B — LA DECISIÓN: el vocabulario y la regla de derivación VIAJAN en el envelope

Es la decisión que este encargo tenía que resolver y dejar por escrito.

### B.1 Qué se midió, y por qué había que decidir

El VEREDICTO midió que `roadmap_tree_v1` **no es autodescriptivo**: el archivo trae
`status: "active" | "completed" | "planned"` pero **no trae en ninguna parte la lista
de tokens válidos** (`taxonomy_model in file: false`), y **la función que deriva el
estado de un objetivo o de una fase no viaja tampoco** — el consumidor la tuvo que
traer del CONTRATO §12. Su conclusión, desde el lado del lector: para un prototipo de
un proyecto es tolerable; **para el shell (P3), que leerá árboles de N emisores, no**.

### B.2 La decisión, en tres partes

**1. El VOCABULARIO viaja. Completo, y por EJE.**
`taxonomy_model` del snapshot declara los cuatro vocabularios que el árbol pone en
juego, cada uno con el eje que califica y si está almacenado o derivado:

| Clave | Eje | ¿Almacenado? | Tokens |
|---|---|---|---|
| `project.operational_status` | proyecto | sí | `active` · `blocked` · `idle` |
| `run.status` | run | sí | `planned` · `active` · `blocked` · `completed` |
| `objective.status` | objetivo | **no** (derivado) | `planned` · `in_progress` · `active` · `blocked` · `completed` |
| `phase.status` | fase | **no** (derivado) | los mismos cinco |

El campo `axis` no es adorno: es lo que desarma la trampa que §11.c midió — `active` y
`blocked` existen en dos ejes distintos con significados distintos. Declarados por
eje, un lector genérico ya no puede confundirlos, y **no necesita saber de antemano
de qué proyecto viene el archivo**.

**2. La REGLA DE DERIVACIÓN viaja — como tabla ejecutable, no como resultado.**
`taxonomy_model.derivations` transporta la precedencia de §12.a en forma de datos:

```json
"collection_status_from_runs": {
  "applies_to": ["objective", "phase"],
  "input": "run.status",
  "precedence": [
    { "token": "active",      "quantifier": "any", "run_status": "active" },
    { "token": "blocked",     "quantifier": "any", "run_status": "blocked" },
    { "token": "completed",   "quantifier": "all", "run_status": "completed" },
    { "token": "in_progress", "quantifier": "any", "run_status": "completed" },
    { "token": "planned",     "quantifier": "otherwise" }
  ],
  "empty_input": "malformed"
}
```

Un lector que evalúe esa tabla en orden obtiene el mismo token que el emisor. La
prueba está en la suite: el test ejecuta la tabla **leída del archivo emitido** y
compara contra `deriveCollectionStatus`, la función del emisor, en los cinco casos.

**3. Lo que NO viaja: el RESULTADO.** Ningún objetivo y ninguna fase del árbol
emitido lleva `status` ni contadores. Está verificado por test sobre cada nivel.

### B.3 Por qué esto no contradice §12.c

§12.c prohíbe **almacenar el resultado** de la derivación, por dos razones nombradas:
la copia que se pudre y los dos consumidores que derivan a su gusto. La decisión de
arriba **ataca las dos y no crea la primera**: no se persiste ningún token derivado
(no hay copia que pudrir), y se publica la regla para que dos consumidores no puedan
divergir. Declarar la FUNCIÓN es lo contrario de almacenar su SALIDA.

La objeción legítima —"la regla ya vive en el CONTRATO; el envelope la duplica"— se
resuelve por dónde vive la copia:

- **La regla existe UNA vez en el código**: el array `COLLECTION_STATUS_RULES`.
  `deriveCollectionStatus` lo **ejecuta**; `buildTaxonomyModel` lo **declara**. Son el
  mismo array. Declaración y comportamiento **no pueden divergir dentro del emisor**,
  ni con un error de tipeo.
- Eso es exactamente el defecto que §17 midió en el modo 1 y que aquí **no se
  reproduce**: allá `OBJECTIVE_CLASSIFICATIONS`/`OPERATIONAL_STATUSES` son literales
  que el emisor declara pero no usa —tan desacoplados que `OPERATIONAL_STATUSES`
  declara un `blocked` que el cálculo real **no puede producir nunca**—. En el modo 2
  el vocabulario de proyecto sale de `PROJECT_STATUS_RULES`, la misma tabla que
  calcula `operational_status`, y por eso sus tres tokens son **todos alcanzables**.
- Queda una junta que el emisor no puede cerrar solo: entre el **texto** del CONTRATO
  y la **tabla** del código. Es una junta humana (enmendar §12 obliga a tocar la
  tabla) y se anota como tal en el Bloque G. El emisor la hace visible en vez de
  taparla: `taxonomy_model.specified_by` apunta al documento normativo. **Esa ruta no
  está horneada en el emisor**: la declara el proyecto en `governance/contract.json`, y
  el puntero se emite **solo si el archivo existe** (§7). Un proyecto que no declare
  nada no recibe puntero — no recibe una ruta ajena.

### B.4 Qué compra esto en P3, que era el punto

Sin esto, el shell multiproyecto tendría que hornear, por proyecto, qué significan
sus tokens y cómo derivar el estado de un objetivo — la definición de lo que el tramo
entero intenta eliminar. Con esto, el shell **lee el vocabulario y la regla del propio
archivo** y no conoce a ningún emisor por su nombre. La recomendación 2 del VEREDICTO
—"la derivación debe ser código compartido, una sola implementación"— sigue viva y
sigue siendo trabajo de P3: el envelope garantiza que todos deriven **lo mismo**;
compartir la implementación es lo que evita escribirla N veces.

---

## BLOQUE C — Las decisiones menores del emisor, cada una con su razón

**C.1 El identificador del modelo viaja dentro de `roadmap_tree` como `model`.**
§10.c dejó explícitamente esta clave "al emisor del tramo 2 con su ejemplo". Se elige
`model` —el precedente que el modo 1 ya estableció (`aiw_flat_objectives_v1`)— y **no
se re-emite el `schema_version` del árbol dentro del snapshot**: dos claves
`schema_version` a dos profundidades del mismo archivo son exactamente la confusión
que §10.c advierte. El archivo suelto `roadmap/roadmap.json` conserva el suyo intacto.

**C.2 Sin `counts`.** El modo 1 almacena `roadmap_tree.counts`; el modo 2 no. §10.b
prohíbe persistir lo derivable, y un contador de raíz es la misma copia de la verdad
que un `status` de objetivo. Los conteos se derivan al leer, como la consola ya hace
(`v3ObjectiveStats`, `v3PhaseRatio`).

**C.3 `no_claims_summary` se abre; `validation_summary` sigue opaco.** §3.b los dejó
opacos "hasta que haya emisor y ejemplo". Esta fase **le da las dos cosas al primero**
—hay emisor y hay archivo real— así que pasa a llevar `{total, source}` apuntando al
archivo que tiene las claims. El segundo **no**: el validador de la capa 3 no existe,
así que nada real lo llena y se emite `{}`. La asimetría es la regla de §3.b
funcionando, no un descuido.

**C.4 `sources` en TODOS los archivos, no solo en el requerido.** §6 lo exige del
snapshot; se aplica a los cuatro, y significa lo mismo en todos: `{path, mtime}` de
cada archivo leído al emitir — 2 en el snapshot, 1 en cada archivo de gobernanza, y
los **25** documentos en el índice de docs. Un opcional podrido es igual de mudo que
un requerido podrido, y el costo es un `stat` por fuente. `mtime`, no hash, por §6
(fallar ruidoso).

**C.5 Los nombres bajo `.project/`.** Misma tijera de §19: sin nivel `views/`, sin
prefijo de consumidor, sin sufijo `.snapshot`. `project_guardrails.json` pierde el
`project_` (redundante dentro de la carpeta del proyecto) y `guardrails/` desaparece
como nivel: `guardrails.json`, `no_claims.json`, `docs_index.json`.

**C.6 El emisor pasa a `aiw-projector@0.2.0`.** §6 pide que `generated_from` nombre
herramienta **y versión**; el emisor cambió de comportamiento (un modo de root nuevo),
así que la versión cambia. Consecuencia anotada: `docs/snapshot-schema-v1.md:21,158`
muestra `0.1.0` en sus ejemplos. Ese documento es **evidencia, no norma** (CONTRATO,
cabecera), está fuera del alcance de este run y **no se tocó**; queda como pendiente
menor de redacción.

**C.7 `guardrails` y `no_claims` se TRANSPORTAN; no se inventan en el emisor.** Su
fuente declarada vive fuera de la carpeta derivada, en `governance/guardrails.json` y
`governance/no_claims.json` (más `governance/contract.json`, la ruta del contrato
normativo del propio proyecto, B.3) — el mismo patrón que el roadmap (canónico
editable fuera, derivado dentro). El emisor los republica bajo el envelope. Si la fuente falta o está
malformada, **el archivo no se emite** y `no_claims_summary` vuelve a `{}`: §20 —
mejor una ausencia anunciada que una tabla inventada. Contenido: reglas y no-claims
que ya estaban decididas, cada entrada con `source_refs` al documento que la decidió;
ninguna es nueva doctrina.

**C.8 `docs_index` se deriva de la UBICACIÓN, no de una curaduría a mano.**
`nav_tier` sale de una tabla de prefijos de ruta (`context/**/records/` → `evidence`;
`context/**` y raíz → `primary`; `docs/`, `console/`, `handoffs/` → `secondary`), y
`default_visible = (nav_tier === "primary")`. Un `.md` nuevo se clasifica solo: una
lista curada a mano se pudriría igual que el snapshot de §2. El archivo **declara la
regla con la que se construyó** (`nav_tier_model`), por la misma doctrina del Bloque
B: nada que el lector deba saber de antemano. Los campos que el emisor no puede
derivar honestamente (`audience`, `canonicality`, `operator_review_status`, …) **se
omiten**, no se rellenan.

**C.9 Ninguna identidad horneada.** `project_id` sale de `package.json:name`
normalizado, con el nombre de la carpeta como respaldo; los resúmenes salen del título
y de los conteos del propio roadmap; el modo sale de la forma del root. No hay
`JAME`, ni `CANTU`, ni `aiw`, ni ruta de proyecto en el código nuevo. `package.json`
`description` **no se usa**: sigue diciendo "verbatim fork", que el audit midió falso
(A.4) — usarlo sería emitir una afirmación conocida como falsa. Queda registrado como
no-claim (`no_claims.json`), no arreglado (fuera de alcance).

---

## BLOQUE D — Lo emitido, medido

### D.1 Los cuatro archivos

| Artefacto | Ruta | Bytes | Contenido, contado |
|---|---|---:|---|
| Snapshot (**requerido**, capa 1) | `.project/snapshot.json` | 54 223 | 2 objetivos · 15 fases · **31 runs** · `project_id: "aiw_console"` · `operational_status: "active"` |
| Índice de docs (opcional) | `.project/docs_index.json` | 11 075 | **25** documentos `.md` reales del repo (24 al empezar el run + este record) |
| Guardrails (opcional) | `.project/guardrails.json` | 3 055 | 7 reglas |
| No-claims (opcional) | `.project/no_claims.json` | 2 832 | 5 claims |

Derivaciones verificadas contra los datos reales, y **coinciden con lo que el
VEREDICTO §3 midió en pantalla** con el prototipo: **O0 → `active`** (12 runs: 9
`completed`, 1 `active`, 2 `planned`) y **O4 → `in_progress`** (19 runs: 9
`completed`, 10 `planned`). Las 15 fases derivan sin excepción (ninguna con 0 runs).
`operational_status` del proyecto: `active` (hay un run `active` en el árbol:
`RUN-CANTU-PROJECT-CONSOLE-LATENT-DEFECTS-001`, `queue_order` 10).

`sources` del snapshot: `roadmap/roadmap.json` y `package.json`, ambos con `mtime`,
ambos existentes al emitir (§7). Los 25 `doc.path` del índice existen en disco —
comprobado uno a uno, que es la restricción heredada del validador de Cantu.

### D.2 Atomicidad y repetibilidad

- Escritura **temp + rename**, con el mismo helper `writeJsonAtomic` del proyector
  actual. No queda ningún `.tmp` (verificado en disco y por test).
- **Correr dos veces con el mismo reloj produce archivos byte-idénticos** — probado
  por test sobre los cuatro archivos. En corridas reales lo único que cambia es
  `generated_at`, que §6 **exige** que cambie: un snapshot que no reporta cuándo se
  emitió es precisamente la podredumbre que el contrato mata.
- El orden de emisión importa una vez: los dos de gobernanza se escriben **antes** que
  el snapshot, porque `no_claims_summary` cita uno por ruta y §7 prohíbe emitir un
  puntero que no resuelve.

### D.3 El `.aiw/` de aiw-console NO fue modificado

Medido después de todas las corridas del emisor: los **4** archivos siguen con
`mtime` `2026-07-22 15:38` y con sus md5 intactos —
`.aiw/roadmap/roadmap.json` y `.aiw/views/roadmap.json` = `08b9d813…94b61` (la copia
byte-idéntica que MEDICION-FUENTES B.1 ya había medido),
`.aiw/views/project_console.snapshot.json` = `cc6afb78…4dd0b`,
`.aiw/views/git_history.snapshot.json` = `fddd4ceb…83d3`. La guarda de ruta lo hace
imposible por construcción: el modo 2 solo puede escribir dentro de `.project/`, y hay
test que lo prueba intentando escapar hacia `.aiw/`.

---

## BLOQUE E — Lo que NO se emitió, y por qué

- **Las 9 fuentes diferidas** (`project.json`, `state/project_status.json`,
  `state/component_status.json`, `state/events.jsonl`, `ledgers/change_ledger.jsonl`,
  `ledgers/git_provenance.jsonl`, `ledgers/human_qa.jsonl`, `ledgers/ai_reviews.jsonl`,
  `guardrails/project_memory.jsonl`): **no se emiten ni se stubbean**. Ninguna compra
  un píxel vivo (MEDICION-FUENTES F.2) y un archivo vacío en una carpeta declarada
  derivada afirma que el dato no existe — la mentira que §20 prohíbe. Su fase es
  opcional y no está abierta.
- **`.project/roadmap.json`** (opcional ya declarado en §19): **no se emitió**, porque
  el encargo fijó el mínimo en snapshot + 3 fuentes y no lo incluía. **Es la decisión
  que P11 encontrará primero** — ver F.2: el renderer de Cantu lee el roadmap de una
  ruta propia, no del `roadmap_tree` del snapshot. El árbol ya viaja completo dentro
  del snapshot, así que emitirlo aparte es una escritura más, no una derivación nueva.
- **`git_history`**: ya tiene emisor propio (el history-builder) y sigue escribiendo
  donde escribía. Moverlo a `.project/git_history.json` y renombrar su identificador
  `jame.git_history_snapshot.v1` **arrastra el gate de render** (`CANTU-PCJS:3723`),
  así que emisor y consola tienen que moverse juntos: es trabajo de P11, no de aquí.

---

## BLOQUE F — Qué le falta al port (`O4.P11`) para pintar sus vistas

### F.1 Lo que ya tiene resuelto

Snapshot propio con el roadmap real dentro, vocabulario y derivación declarados, índice
de docs sobre el corpus real, y las dos tablas de Governance con datos. Overview,
Roadmap, Cola, Docs y Governance tienen origen de datos hoy.

### F.2 Los cinco pendientes, en orden de lo que cuesta

1. **Reapuntar `PATHS`.** Las 15 rutas `../../.aiw/**` del renderer pasan a
   `.project/**`. El contrato pide que la base viva como **una** constante (§1.a); hoy
   son 15 literales (`CANTU-PCJS:1-27`).
2. **El roadmap: decidir de dónde lo lee.** El renderer vivo pinta Overview, Roadmap y
   Cola desde `roadmap/roadmap.json` (`v3Model`), **no** desde `snapshot.roadmap_tree`.
   Dos salidas, y hay que elegir una: (a) emitir `.project/roadmap.json` —opcional ya
   declarado en §19, una escritura más en este mismo emisor—, o (b) reapuntar `v3Model`
   al árbol que el snapshot ya trae. (b) es más fiel al contrato (una sola fuente); (a)
   es más fiel al "port idéntico". **Sin una de las dos, esas tres vistas nacen vacías
   aunque el snapshot esté perfecto.**
3. **Docs: el modo por defecto del renderer filtra por un campo que no se emite.**
   Medido en el renderer: `docsVisibilityMode` arranca en `"newera"`
   (`CANTU-PCJS:2031`) y ese modo muestra **solo** los docs que llevan
   `operator_review_status` (`:2216`). El emisor **no** emite ese campo — significa "un
   run registró una revisión de operador", y ningún run la registró; rellenarlo sería
   inventar gobernanza. Consecuencia exacta al portar tal cual: el **lector** abre con
   el primer documento (hay fallback a `docs[0]`) pero la **navegación** queda vacía
   con "No documents match this view.". Salidas: arrancar el port en modo `"primary"`
   o `"all"` (una línea, y ambos modos siguen vivos en el código), o que el campo lo
   escriba un run el día que de verdad revise. **La segunda no debe simularse.**
4. **La categorización "new era" está horneada por ruta de Cantu**
   (`DOCS_NEW_ERA_CATEGORY_BY_PATH`): con rutas de aiw-console todo cae en
   `UNCATEGORIZED (new)`. Es identidad horneada del renderer — material del Bloque E
   del audit, se quita en el port.
5. **La degradación por archivo (§20)** es requisito **sobre el consumidor**: al faltar
   9 fuentes, el port debe anunciar cada ausencia en la superficie afectada, no solo
   levantar el banner agregado. Y al leer `.project/snapshot.json` **se activa D-026**
   (§9): el port es el primer consumidor real y debe ejercitar el artefacto como lo
   carga él.

### F.3 Lo que le queda a la cabina, no al código

Las tres rutas nuevas (`docs_index.json`, `guardrails.json`, `no_claims.json`) entraron
por la puerta normal de §18.b —ruta nueva bajo `.project/`, nombrada por contenido,
opcional por defecto, con su degradación declarada— pero **su degradación está
declarada aquí, en este record, no en la capa 3 del CONTRATO**, porque tocar el
contrato está fuera del alcance de este run. Formalizarlas en §19 (y registrar la
decisión del envelope del Bloque B) es acto de cabina. Degradación propuesta, para
que se copie tal cual:

| Ruta | Si falta |
|---|---|
| `.project/docs_index.json` | Se pierde la pestaña Docs entera (los cuerpos `.md` siguen en el repo, pero no hay índice que los liste). Se anuncia "índice de documentos no disponible", nombrando el archivo. |
| `.project/guardrails.json` | Se pierde la tabla Project Guardrails de Governance. El resto de Status sigue. Se anuncia por archivo. |
| `.project/no_claims.json` | Se pierde la tabla Claims Not Allowed Yet, y `no_claims_summary` del snapshot vuelve a `{}`. Se anuncia por archivo. |

---

## BLOQUE G — Lo que queda abierto, dicho como tal

- **La junta texto↔tabla.** La regla de §12 vive en dos sitios: la prosa del CONTRATO y
  `COLLECTION_STATUS_RULES`. Enmendar §12 obliga a tocar la tabla. No hay hoy manera de
  cerrarlo sin volver el contrato máquina-legible, que sería una decisión mucho mayor
  que este tramo. Se registra como junta conocida, no como deuda escondida (B.3).
- **`validation_summary` sigue opaco** y lo seguirá hasta que exista el validador de la
  capa 3 (§3.b). Ese validador tampoco existe para `.project/`: está registrado como
  no-claim, no como algo que este run haya cubierto.
- **`docs/snapshot-schema-v1.md` menciona `aiw-projector@0.1.0`** en dos ejemplos
  (C.6). Documento de evidencia, fuera de alcance, no tocado.
- **`package.json` sigue describiendo el repo como "verbatim fork"**, falso desde el
  audit. No se tocó (fuera de alcance); queda como no-claim emitido.
- **Los 9 diferidos** no tienen fase abierta y este run no la abre.

## Estado de completitud

- Bloque A (modo de root nuevo, aditividad probada) — COMPLETO.
- Bloque B (decisión del envelope: vocabulario y derivación) — COMPLETO y APLICADO.
- Bloque C (decisiones menores con su razón) — COMPLETO.
- Bloque D (lo emitido, con números; `.aiw/` intacto) — COMPLETO.
- Bloque E (lo no emitido y por qué) — COMPLETO.
- Bloque F (pendientes del port) — COMPLETO.

Ningún bloque quedó "NO ALCANZADO".
