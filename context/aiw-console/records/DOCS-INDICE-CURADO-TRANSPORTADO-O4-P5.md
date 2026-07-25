# DOCS — el índice curado se TRANSPORTA, el escaneo queda de respaldo (`O4.P5`)

> Entregable de conocimiento del run `RUN-CONSOLE-DOCS-INDICE-CURADO-TRANSPORTADO-001`
> (fase `O4.P5`, ajuste sobre `O4.P4`). Documenta **por qué el escaneo era el
> comportamiento equivocado para un proyecto que ya curó su índice**, **las cuatro
> decisiones de forma resueltas en código**, **los números de antes y después**, **la
> única diferencia que queda entre las dos consolas, nombrada**, y **qué implica esto
> para `O4.P6`, medido**.
>
> Fecha: 2026-07-25. **No se ejecutó git en ninguna forma que escriba.** Git se leyó
> donde el emisor de historia ya lo requiere, más `rev-parse HEAD` /
> `branch --show-current` / `status --porcelain` como constancia de que `cantu-studio` no
> se movió, y `git show HEAD:<archivo>` (lectura pura) para reconstruir el emisor previo y
> los bytes previos de `.project/`. No se tocó el roadmap, `DECISIONES.md`, `CONTRATO.md`,
> ningún record existente, el fork D-035 (`docs/project-console/` de este repo), el
> prototipo retirado (`console/`) ni el tooling viejo (`tools/project-console/`).
>
> **Archivos escritos por este run, y ninguno más:**
> `tools/projector/project.mjs` (aditivo) ·
> `tests/projector-docs-transport.test.mjs` (nuevo, 11 tests) ·
> `tests/projector-cantu.test.mjs` (un test reemplazado por dos, D.3) ·
> **los seis archivos de `cantu-studio/.project/`** — la única escritura fuera de este
> repo · los seis de `.project/` de este repo, re-emitidos · este record.
> **El `.aiw/` de `cantu-studio` NO fue tocado**, y su índice curado tampoco: se LEE
> (Bloque E). El `.aiw/` de este repo **sigue sin existir**.

Insumos, usados y no re-medidos: `EMISOR-CANTU-CARPETA-PROPIA-O4-P4.md` (los
`ROOT_LAYOUTS`, el gate por forma, qué emitió para Cantu), `EMISOR-CARPETA-PROPIA-O4-P2.md`
(C.8: cómo se construyó el `docs_index` de este repo desde cero),
`AUDIT-CONSOLE-O4-PHASE0.md` (Bloque B.6: el mecanismo de Docs y la forma que el renderer
consume), `CONTRATO.md`.

---

## BLOQUE A — El problema medido: una curaduría reemplazada por un volcado

`O4.P4` emitió para Cantu un `docs_index` **escaneando todos los `.md` de su repo**. Era el
único comportamiento que el emisor tenía, y para el proyecto que lo estrenó era el correcto:
este repo **no tenía índice** y el suyo se construyó desde cero, así que derivarlo de la
ubicación era la única opción honesta y además la preferida por §2 (una lista curada a mano
se pudre). Aplicado a un proyecto que **sí** curó su índice, el mismo escaneo hizo otra
cosa: sustituyó una selección deliberada por un barrido.

Los números del choque, medidos hoy:

| | Cuenta |
|---|---:|
| Índice curado de Cantu (`.aiw/docs/docs_index.json`) | **140** |
| Lo que el escaneo emitía en `O4.P4` | 342 |
| Lo que el mismo escaneo emitiría **hoy** (el corpus creció) | **354** |
| Lo que su propia consola renderiza en su vista por defecto | **38** |

La última fila es la que convierte el desajuste en un defecto y no en una preferencia: la
pestaña Docs de Cantu en la consola global mostraba **354 documentos** mientras su consola
local mostraba **38**, leyendo **el mismo repo**. Y la tercera fila dice que el desajuste
crecía solo: el escaneo es una manguera, y su caudal es el tamaño del corpus.

**La regla que faltaba ya existía en esta misma fase, dos veces.** El roadmap y las dos
fuentes de gobernanza siguen el patrón **canónico fuera / derivado dentro**: el proyecto los
declara en su layout y el emisor los **republica** bajo el envelope, sin reescribirlos. El
índice de docs era la única entrada del mínimo que no lo seguía — no por una decisión, sino
porque el primer proyecto no tenía nada que transportar.

---

## BLOQUE B — Qué se construyó: una entrada más en el bundle, y una bifurcación

### B.1 La ruta del índice curado entra al LAYOUT, como el roadmap y la gobernanza

`ROOT_LAYOUTS` gana una cuarta ruta por entrada. Nada más:

| Layout | roadmap | guardrails | no_claims | contract_ref | **docs_index** |
|---|---|---|---|---|---|
| `repo_root` | `roadmap/roadmap.json` | `governance/guardrails.json` | `governance/no_claims.json` | `governance/contract.json` | **`docs/docs_index.json`** |
| `project_local_aiw` | `.aiw/roadmap/roadmap.json` | `.aiw/guardrails/project_guardrails.json` | `.aiw/guardrails/no_claims.json` | `.aiw/guardrails/contract.json` | **`.aiw/docs/docs_index.json`** |

Las tres propiedades que `O4.P4` fijó para el bundle se heredan sin excepción:

- **Es una forma de root, no un proyecto.** Ninguna de las dos rutas nuevas contiene un
  nombre de proyecto ni una ruta absoluta — **probado por test**, que recorre las entradas y
  falla si alguna trae identidad o una ruta absoluta, y que además exige que **toda** entrada
  declare su `docs_index`.
- **Se resuelve como unidad.** El layout que aporta el roadmap aporta también el índice
  curado. Sondear la ruta del índice por separado permitiría leer el plan de un layout y la
  curaduría de otro.
- **Un tercer layout sigue siendo una cuarta línea de esa tabla**, ahora con una columna más.

### B.2 La decisión: TRANSPORTE si hay índice, ESCANEO si no

`buildDocsIndex` es ahora tres líneas y dos funciones:

```js
export function buildDocsIndex(root, opts = {}) {
  const curated = readCuratedDocsIndex(root);
  return curated ? transportDocsIndex(root, curated, opts) : scanDocsIndex(root, opts);
}
```

**La decisión la toma la PRESENCIA de un archivo conforme en la ruta que declara el layout
aplicado.** No hay nombre de proyecto en ninguna parte del camino. Consecuencia deliberada y
probada: **el mismo root cambia de comportamiento si aparece o desaparece el archivo**, sin
tocar una línea de este emisor. Hay test que crea dos roots idénticos en todo salvo ese
archivo y afirma que uno transporta y el otro escanea, y que borrar el archivo del primero lo
devuelve al escaneo en la corrida siguiente.

**Conformidad, con el mismo listón que la gobernanza.** Un archivo presente pero que no
parsea, o que no trae el array `docs`, **no transporta nada**: cae al escaneo. Es la misma
regla que `buildTransportedList` ya aplicaba a `guardrails`/`no_claims`, y da un índice real
de archivos reales en vez de una pestaña vacía. Hay test con tres formas de malformación.

### B.3 La versión del emisor: `aiw-projector@0.6.0`

§6 pide que `generated_from` nombre herramienta **y** versión, y el comportamiento se movió:
un emisor que republica una selección curada no es el que solo sabía escanear. **Consecuencia
anotada, porque toca dos criterios de aceptación:** el criterio pedía re-emisión
"byte-idéntica salvo frescura y `generated_at`", y `generated_from` es una tercera diferencia
esperada. Se resolvió como en `O4.P4`: **midiendo las dos cosas por separado** (Bloque D).

---

## BLOQUE C — Las cuatro decisiones, resueltas en código

### C.1 MAPEO DE FORMA — la entrada viaja VERBATIM; solo se rellena lo que falta

**Qué consume realmente el lector.** Medido sobre el renderer de la consola global
(`project-console/assets/project-console.js`), no supuesto:

| Campo | Para qué lo usa | Respaldo que ya tenía el lector |
|---|---|---|
| `path` | clave de navegación, fetch del cuerpo, campo "Path", y la extensión decide cómo se renderiza | — (obligatorio) |
| `title` | etiqueta en el árbol y H1 del lector | cae a `path` |
| `ia_bucket` | el grupo del árbol (`deriveDocGroup`) | `category` → `related_area` → `source_role` → `uncategorized` |
| `nav_tier` | tier de navegación (`deriveDocNavTier`) | `source_role`/`canonicality`/`ia_bucket`/`archive_status` → `secondary` |
| `default_visible` | modo "Primary KB" | `nav_tier === "primary"` |
| `freshness` | "Status" y "Last update" del lector | `freshness_status` → `status` |
| `operator_review_status` | modo "New era" | ausencia = no está en ese modo |

**La decisión: la entrada se copia ENTERA.** No se proyecta a un subconjunto. Un entry
curado de Cantu trae hasta **22 campos** (`audience`, `canonicality`, `related_objective_id`,
`notes`, `retention_class`, …) contra los **6** que produce el escaneo, y **la tabla de
arriba muestra por qué recortarlos degradaría el render**: la mitad de esos campos son
justamente la cadena de respaldo que el lector consulta cuando el campo principal falta.
Recortar habría sido decidir por el lector con menos información que la que el proyecto ya
había escrito.

**Justificación doctrinal:** es exactamente lo que ya hacen el roadmap (`roadmapTreeBlock`
publica el árbol verbatim) y `buildTransportedList` (republica `source[key]` sin tocarlo).
Estos campos no son derivaciones de este emisor: son **afirmaciones del proyecto sobre sus
propios documentos**, republicadas bajo un envelope que dice de dónde salieron. Emitirlas no
es inventar; recortarlas sería editar.

**Lo único que el emisor AÑADE es lo que falta**, y solo entre los campos que el lector
consume, cada uno con la regla que ya usaba el escaneo:

| Campo ausente | Se rellena con |
|---|---|
| `title` | el primer H1 Markdown del documento, si no su nombre de archivo |
| `nav_tier` | la regla de prefijo de ruta (`nav_tier_model.rules`) |
| `default_visible` | `nav_tier === "primary"` |
| `ia_bucket` | el directorio del documento (`"root"` en la raíz) |
| `freshness` | el `mtime` del archivo en disco |

Hay test que verifica las dos mitades: que **ningún** campo curado se altera (comparación
campo a campo contra el original), y que **solo** los ausentes se derivan. Un `nav_tier` con
un valor que no es un tier no es una curaduría que preservar: se deriva.

**SELECCIÓN y ORDEN son de la curaduría.** El transporte **no filtra y no ordena**. El
escaneo ordena por ruta; el transporte respeta el orden del archivo. Consecuencia medible y
querida: la selección de Cantu incluye **1 `.html`, 7 `.json` y 132 `.md`**, y **5 de esas
entradas viven bajo `.aiw/`**, que el escaneo salta por diseño (`DOCS_SKIP_DIRS`). Viajan
igual: la lista de exclusión del escaneo es una regla **del escaneo**, no un veto sobre lo que
el proyecto eligió. Los cuerpos no-Markdown se renderizan como texto preformateado escapado
(`renderDocBodyContent`), que es lo que el lector ya hacía — **verificado en el navegador**
(Bloque F): las 140 resuelven, incluida la `.html`, que se muestra como texto y nunca como
marcado vivo.

### C.2 AGRUPACIÓN — gana la curaduría; la carpeta es el respaldo

La preferencia declarada por el encargo, aplicada literalmente. Con un matiz que hubo que
resolver: **rellenar `ia_bucket` demasiado pronto habría pisado la curaduría por una vía
lateral.** El lector cae de `ia_bucket` a `category` → `related_area` → `source_role`; si el
emisor escribiera el nombre de la carpeta en cuanto falta `ia_bucket`, **preempta** esa
cadena y entierra una agrupación curada bajo un directorio. Así que la regla es:

> El bucket derivado de la carpeta se escribe **solo cuando la entrada no ofrece ninguna
> señal de agrupación** — ni `ia_bucket`, ni `category`, ni `related_area`, ni `source_role`.

Hay test con las cuatro situaciones. Resultado sobre el dato real: **los 10 grupos de la
pestaña Docs de Cantu son los `ia_bucket` de su curaduría** — `run_evidence` 60,
`docs` 26, `component_docs` 21, `author_lite` 12, `governance` 9, `roadmap` 3, `ops` 3,
`jame_core` 3, `project_console` 2, `prompts` 1 — y **cero** grupos derivados de carpeta.

### C.3 FRESCURA — la de la curaduría, verbatim; el `mtime` no se pierde

El índice curado **sí** trae `freshness` en sus 140 entradas, pero es **otra clase de valor**:
etiquetas como `"view_source_2026-06-27"` o `"active_author_lite_source"`, no un `mtime` ISO.
Sobrescribirlas con el `mtime` del disco tenía un costo concreto y medible, no teórico: el
lector deriva su chip "Status" de ese texto (`docStatusLabel`), y un `mtime` ISO no contiene
ninguno de sus tokens, así que **las 140 entradas habrían pasado a decir "Recorded"**,
perdiendo la distinción Current/Draft/Stale/Proposal que la curaduría sí expresa.

**Decisión:** la `freshness` curada **viaja tal cual**, sea cual sea su forma. Es la misma
doctrina de §10.c aplicada un nivel más abajo — el nombre del modelo del roadmap viaja
verbatim porque el proyecto nombra su propio plan; la frescura viaja verbatim porque el
proyecto declara la vigencia de sus propios documentos. Escribirle un `mtime` encima sería
este emisor diciéndole a Cantu qué tan actuales son sus documentos.

**Y el `mtime` no se pierde:** `sources` del archivo emitido lleva **141 registros** — el
índice curado más uno por documento transportado, cada uno con su `mtime` real de disco. Es
donde §6 lo pide y es lo que hace detectable que un documento cambió después de que se
escribiera la curaduría. Hay test que lo fija.

**Para una entrada sin `freshness`**, el `mtime` la rellena: es una **medición**, no una
invención, y produce una fecha que el lector sabe leer ("Last update") sin afirmar vigencia
("Recorded", el token neutro). Cero entradas de Cantu caen en este caso hoy; la regla existe
porque el encargo pedía resolverlo, no suponerlo.

### C.4 PATHS QUE NO RESUELVEN — se OMITEN del índice y se DECLARAN en el archivo

Las dos salidas que planteaba el encargo tiran en direcciones opuestas, y las dos tienen
respaldo normativo: §7 dice que una ruta que no resuelve **se omite, nunca se emite como
puntero roto**; §20 prefiere **una ausencia anunciada** a un silencio. La resolución cumple
las dos, porque no son incompatibles:

> La entrada **se omite de `docs[]`** — no se publica un puntero que no resuelve — **y se
> declara en `docs_source.unresolved`**, con su ruta y su motivo, junto a los conteos
> `curated_entries` y `transported`. **El archivo no se inventa jamás.**

Emitir la entrada y dejar que la superficie anunciara el fallo se consideró y se descartó: el
lector ya pinta "The document body could not be loaded from …", pero eso convierte una
**curaduría desactualizada** (un hecho sobre la fuente) en un **puntero roto publicado** (un
defecto del derivado), y el archivo derivado es justamente donde §7 no lo quiere. Omitir sin
declarar se descartó por lo contrario: la cuenta emitida dejaría de coincidir con la curada
**en silencio**, que es la discrepancia muda que este encargo existe para eliminar.

Se cubren tres formas de no-resolver, y las tres se cuentan: `no such file`, `outside the
project root` (una ruta que se escapa del root) y `no path` (entrada sin ruta usable). Hay
test con las tres, que además **verifica que el archivo faltante no fue creado**.

**Sobre el dato real el caso está vacío**, como el encargo anticipaba: `unresolved: []`, 140
curadas → 140 transportadas. Es la restricción que el validador de Cantu ya impone
(`doc.path` debe resolver) — pero ahora está **decidida y probada**, no supuesta, y el emisor
la sostiene por su cuenta aunque la fuente deje de sostenerla.

### C.5 Lo que el archivo emitido declara de sí mismo

El transporte añade un bloque `docs_source` — modo, ruta del índice curado, los dos conteos,
la regla de cada campo rellenable, la política de no-resolución y la lista `unresolved`. Misma
doctrina que `taxonomy_model` y `nav_tier_model`: **el archivo declara cómo se construyó**, y
un lector nunca tiene que conocer de antemano las convenciones de este emisor.

**Asimetría deliberada:** el bloque se emite **solo** en el camino de transporte. El archivo
escaneado ya declara su construcción (`nav_tier_model.derived_by: "repo_path_prefix"`), y
añadirle una clave habría reescrito un archivo que no cambió — rompiendo el criterio de
byte-identidad por una anotación. **El `nav_tier_model` de la curaduría viaja con ella** si lo
trae (el de Cantu lo trae, con su forma propia): publicar las reglas de prefijo de ESTE
emisor sobre una selección que no hizo sería una afirmación falsa sobre el origen del archivo.

---

## BLOQUE D — Los números, y la aditividad PROBADA

### D.1 Los tres números que pedía el criterio

| Medición | Cuenta | Cómo se verificó |
|---|---:|---|
| Entradas del **índice curado** de Cantu | **140** | el archivo, y **su propio validador**: `Docs indexed: 140` |
| Entradas que **emitió el emisor** | **140** | `.project/docs_index.json`, `docs_source.transported` |
| Documentos que **renderiza su consola propia** | **38** | DOM real de su consola, servida read-only |

Y las dos cuentas intermedias, porque explican la tercera (F.1): su consola muestra **38** en
su modo por defecto, **53** en "Primary KB" y **140** en "All registered". El validador de
Cantu confirma las dos primeras desde su propio lado: `Docs curated primary-visible: 53 of
140 registered`.

**Comparación entrada por entrada, contra el dato real, hecha en el navegador**: el
`docs[]` emitido y el `docs[]` curado son **idénticos en las 140 posiciones**, con **0**
diferencias de ruta o título y **0** campos curados alterados. El transporte no pierde nada.

### D.2 Aditividad: A/B entre los dos emisores

Como en `O4.P4`, la prueba fuerte no es contra un golden (que envejece con sus insumos) sino
**A/B**: el emisor previo se leyó de `git show HEAD:tools/projector/project.mjs` (lectura
pura) y **ambos corrieron contra los mismos roots en el mismo instante**. Ninguno escribe: se
comparan objetos construidos en memoria, con `generated_from` normalizado porque §6 **exige**
que se mueva.

| Comparación | Resultado |
|---|---|
| `aiw` (kernel) `buildSnapshot()` / `buildRoadmap()` — camino viejo | **IDÉNTICO** |
| `aiw` (kernel) destino de escritura y modo detectado | **IDÉNTICO** |
| `aiw-console` — los **seis** archivos, modo y layout | **IDÉNTICOS** |
| `cantu-studio` — `snapshot`, `roadmap`, `guardrails`, `no_claims`, `git_history` | **IDÉNTICOS** |
| `cantu-studio` — modo y layout detectados | **IDÉNTICOS** |
| **`cantu-studio` — `docs_index`** | **DIFIERE** ← el trabajo de la fase |

Es decir: **el emisor nuevo produce exactamente los mismos bytes que el viejo para todo lo que
el viejo hacía bien**, y la única fila que se mueve es la que esta fase existe para mover.

### D.3 La comparación contra el disco, campo por campo

Los bytes previos de `.project/` de este repo se leyeron de `git show HEAD:<archivo>` y se
compararon hoja por hoja contra los emitidos:

| Archivo de `aiw-console/.project/` | Hojas que cambiaron |
|---|---|
| `docs_index.json` | **30 × `docs[].freshness`, 30 × `sources[].mtime`, `generated_at`, `generated_from`. Nada más.** |
| `snapshot.json` | 2 × `sources[].mtime`, `generated_at`, `generated_from` |
| `roadmap.json` | 1 × `sources[].mtime`, `generated_at`, `generated_from` |
| `guardrails.json` | 1 × `sources[].mtime`, `generated_at`, `generated_from` |
| `no_claims.json` | 1 × `sources[].mtime`, `generated_at`, `generated_from` |
| `git_history.json` | los anteriores **más contenido real**: `commit_total` 38 → 68, `branches` 1 → 6, `head` |

**La primera fila es la prueba que pedía el criterio**: este repo **sigue escaneando**, sus
**30** documentos son los mismos 30, en el mismo orden, con los mismos campos, y lo único que
se movió es la frescura (más `generated_at` y el `generated_from` que §6 obliga a mover).
Cero documentos añadidos, quitados o reordenados. La última fila es **deriva de insumo, no de
emisor** — el repo ganó commits y ramas desde la última emisión — y el A/B de D.2 lo prueba:
los dos emisores producen el mismo `git_history` hoy.

**Una precisión sobre esa comparación, para que el número final no confunda:** se midió con
el corpus **tal como estaba al empezar el run**, que es la única forma de aislar el
comportamiento del emisor del contenido del repo. La emisión final de este run corre
**después** de escribir este record, así que el archivo en disco lista **31** documentos: los
mismos 30 más este. Ese documento 31 es **deriva de insumo** —un `.md` nuevo en el repo— y
que aparezca solo es exactamente lo que el escaneo existe para hacer (§2).

**Los otros cinco de Cantu, por tamaño**, contra lo que `O4.P4` registró: `snapshot.json`
**72 692** (idéntico), `roadmap.json` **68 218** (idéntico), `guardrails.json` **1 625**
(idéntico), `no_claims.json` **696** (idéntico). `git_history.json` 210 173 → 429 329 (458 →
**913** commits, 1 → 2 ramas): deriva de insumo, confirmada por el propio validador de Cantu,
que reporta `913 commits / 2 branches`. Y `docs_index.json` 169 708 → **313 548**: **menos**
documentos (140 en vez de 342) y **más** bytes, porque cada entrada transportada lleva los
hasta **22** campos de la curaduría en vez de los **6** que derivaba el escaneo.

### D.4 Un test previo fue reemplazado, y se dice cuál

`projector-cantu.test.mjs` tenía el test *"the docs index lists ONLY Markdown of its own repo,
and every path resolves"*. Afirmaba el ESCANEO: solo `.md`, ordenado por ruta,
`nav_tier_model.rules` no vacío, y **ningún campo que el emisor no pueda derivar**
(`operator_review_status`, `canonicality`). Todo eso era correcto mientras el escaneo era el
único comportamiento, y **esta fase lo invierte a propósito** para un proyecto con índice
curado: su selección incluye no-Markdown, conserva su propio orden y trae precisamente esos
campos. Dejarlo habría sido dejar echada la llave de la puerta que esta fase abre.

Se reemplazó por **dos**, y **nada de lo que defendía se perdió**:

1. `cantu-studio: the docs index TRANSPORTS its curated index — same selection, same order`
   — afirma el transporte contra el archivo curado real, y **conserva** los invariantes que
   siguen siendo ciertos: toda ruta resuelve, ninguna se escapa del repo, ninguna empieza por
   `context/` (el contexto de gobernanza centralizado del otro repo sigue sin duplicarse).
2. `aiw-console: with no curated index to transport, the docs index is still SCANNED` —
   **hereda las afirmaciones sobre el escaneo**, incluida la doctrina de §20 (los campos que
   el emisor no puede derivar honestamente siguen omitidos, nunca inventados), aplicadas al
   root que efectivamente escanea. Incluye una **guarda explícita**: si este repo llegara a
   tener un índice curado, el test falla diciendo que sus afirmaciones ya no lo describen.

Borrarlo en silencio habría sido lo indebido; reemplazarlo declarando qué se invirtió es lo
que corresponde — el mismo criterio de `O4.P4` D.4.

---

## BLOQUE E — `cantu-studio` no fue modificado fuera de `.project/`

**E.1 Medición, antes y después.** Árbol de hashes de **1 059 archivos / 32 275 820 bytes**
(todo el repo excepto `.git/`, `.project/` y `node_modules/`), con md5, mtime y tamaño por
archivo. **Agregado antes = agregado después = `d65ab9ac44268b3989a20bf9659d76aa`**, con
`diff` vacío archivo por archivo, repetido **después** de emitir, de correr su validador y de
renderizar las dos consolas.

**Su índice curado NO se edita — se lee.** `.aiw/docs/docs_index.json` aparece en el árbol de
hashes con el mismo md5 antes y después; es la entrada de la que este run depende y la que
más importaba dejar intacta. Hay además un test que, sobre un root sintético, emite dos veces
y afirma que el archivo del índice curado queda byte a byte como estaba.

Git: `HEAD` en `8e9991e3…` y rama `main`, iguales antes y después; `status --porcelain`
reporta **solo** `?? .project/`. El kernel `aiw` está intacto (115 archivos, agregado
`a4b96dc2…` antes y después). `cantu-lessons` no se tocó.

**E.2 Por construcción, no solo por medición.** La guarda `resolveInsideProject` resuelve
contra el root de destino y lanza si la ruta sale de su `.project/`; sigue siendo el único
camino de escritura, y los tests que la ejercitan siguen verdes.

**E.3 Su consola local sigue funcionando — verificado SIN escribir**, por las dos vías que no
escriben, como en `O4.P4` (arrancar su servidor habría escrito
`.aiw/views/git_history.snapshot.json`, prohibido por el encargo):

1. **Su validador, ejecutado**: `Project Console state validation passed.` — 7 objetivos / 28
   fases / 53 runs, **140 docs indexados**, **53 de 140 curated primary-visible**, 16
   component statuses, 9 episodios de provenance. Cero escrituras.
2. **Su consola, renderizada** read-only por el namespace `/projects/cantu-studio/**`: pinta
   lo de siempre, **38 documentos** en su navegación por defecto (Bloque F).

**Nota de estado, medida y dicha:** su validador ahora reporta el git history snapshot como
**presente** (`913 commits / 2 branches; source=local_git_autosync`), donde en `O4.P4`
reportaba `not present`. **No lo creó este run** — está en el árbol de hashes de antes con el
mismo md5 que en el de después. Alguien arrancó su servidor entre las dos fases; es la misma
causa del crecimiento del repo (1 012 → 1 059 archivos) y de sus commits (458 → 913).

---

## BLOQUE F — La pestaña Docs de los dos proyectos, en DOM real

### F.1 Cantu en la consola global vs. su consola local: la ÚNICA diferencia, nombrada

**La selección es la misma, y está medida en las dos direcciones.** Las dos consolas
renderizan **exactamente los mismos 140 títulos** — barrido del DOM real: 0 títulos
renderizados que no estén en el índice, 0 del índice sin renderizar, en **ambas**.

**Lo que difiere es el MODO DE APERTURA, no la selección:**

| | Consola global (Cantu) | Consola local de Cantu |
|---|---|---|
| Registro cargado | 140 | 140 |
| **Modo al abrir** | **`all`** → **140** | **`newera`** → **38** |
| El mismo modo en la otra | `all` = **140** | `all` = **140** |

**Por qué difiere, con su causa exacta.** El modo `newera` filtra por
`operator_review_status` — las **38** entradas que una corrida de Cantu marcó con revisión de
operador — y **agrupa por un mapa ruta→categoría horneado en el JS de la consola de Cantu**
(`DOCS_NEW_ERA_CATEGORY_BY_PATH`, con rutas suyas y su Documentation Blueprint). Ese mapa
**no vive en el índice**: vive en su consola. La consola global lo vació al portarla
(`O4.P11`), por el mismo criterio con el que vació `DOCS_GROUP_ORDER` — **una identidad que
solo puede ser cierta para un proyecto no viaja** — y abre en `all` por la decisión ya
registrada en su código: el control de modos fue retirado de esa UI aguas arriba, así que el
modo que se envía es el único alcanzable, y `all` alcanza el registro entero.

**Cambiar eso está fuera de alcance por encargo**, y además sería un error: `newera` en la
consola global mostraría 38 documentos de Cantu y **0** de este repo (su emisor no emite
`operator_review_status`, porque ninguna corrida registró una revisión). La diferencia queda
**dicha aquí y no muda**: mismo registro, mismo orden dentro de cada grupo, distinto modo de
apertura, por una razón que pertenece a la consola de origen.

**Diferencias de presentación, también nombradas.** Mismos 10 grupos y **el mismo primer
documento en cada uno**; difieren (a) el **orden de los grupos** — local: el orden horneado
de sus buckets; global: alfabético, porque `DOCS_GROUP_ORDER` está vacío a propósito — y (b)
**la etiqueta de 3 de los 10**: `docs`→"Docs Management", `ops`→"Operations",
`author_lite`→"Editor" en la local, contra "Docs", "Ops", "Author Lite" en la global. Son las
etiquetas escritas a mano de su consola, retiradas al portar por la misma doctrina. Ningún
documento cambia de grupo.

### F.2 Verificaciones en el navegador

- **Cantu, pestaña Docs:** **140** documentos, **10 grupos**, todos con el `ia_bucket` de la
  curaduría (`Run Evidence` 60, `Docs` 26, `Component Docs` 21, `Author Lite` 12,
  `Governance` 9, `Roadmap` 3, `Ops` 3, `Jame Core` 3, `Project Console` 2, `Prompts` 1).
- **Los 140 cuerpos cargan**: barrido `HEAD` sobre las 140 rutas por el namespace read-only —
  **0 fallos**, incluidas las 7 `.json` y la `.html`. La `.html` se renderiza como **texto
  preformateado escapado** (`<pre class="docs-body-pre">`, 8 063 caracteres visibles), nunca
  como marcado vivo.
- **`aiw-console`, pestaña Docs:** **30** documentos y sus grupos derivados de carpeta
  (`Context/AIW-Console/Records` 16, `Context/AIW` 4, `Context` 3, y siete más de 1). El
  respaldo intacto.
- **El cambio entre proyectos:** ensuciado a propósito (documento nº 71 de Cantu abierto,
  "JAME Slides API Reference") y cambiado a `aiw-console`: vuelve a **30** documentos con su
  propio lector, y el documento de Cantu **no sobrevive**. Los 19 aciertos de "JAME" y el 1 de
  "cantu_studio" que quedan en el DOM se inspeccionaron uno a uno: **todos son contenido
  propio de este repo** — su tarjeta de portfolio del otro proyecto, sus propios resúmenes de
  run, sus propios subjects de commit y el texto de su README. **Cero residuo de estado.**

---

## BLOQUE G — Qué implica esto para `O4.P6` (AIW), medido

Medido en `aiw/` hoy, contra la ruta que declararía cada layout:

| | Estado |
|---|---|
| `docs/docs_index.json` (lo que pediría `repo_root`) | **NO EXISTE** |
| `.aiw/docs/docs_index.json` (lo que pediría `project_local_aiw`) | **NO EXISTE** — no hay `.aiw/docs/` |
| Corpus `.md` | **34** archivos |
| Layout que reclama el root | **ninguno** — sigue siendo `aiw_objectives` |

**Conclusión para P6: AIW NO tiene índice curado, así que su `docs_index` saldrá del
ESCANEO**, exactamente como este repo. No hay decisión de Docs pendiente para esa fase: el
respaldo la cubre, y sus 34 `.md` son alcanzables hoy mismo.

**Y hay una consecuencia de esta fase que P6 debe tener presente:** como el `docs_index`
entró al **bundle del layout**, un root que **no** resuelve ningún layout tampoco tiene ruta
declarada de índice curado — y por tanto **siempre** escanea. Es coherente con la regla de
`O4.P4` (el bundle se resuelve como unidad) y es la respuesta correcta hoy para AIW. Si P6
elige la salida **(b)** del Bloque I de `O4.P4` — que AIW publique un roadmap con la forma del
contrato — AIW pasaría a resolver un layout y **ganaría la ruta donde podría curar un índice
más adelante**, sin ningún cambio en este emisor. Si elige la **(a)**, un tercer modo de root,
habrá que decidir si ese modo declara o no su propia ruta de índice curado: **hoy no la
necesita**, y §20 prefiere no construir el gancho hasta que exista el usuario.

Lo que **no** hay que hacer en ningún caso: crearle a AIW un índice curado vacío para que
"tenga uno". Un índice vacío en la ruta del layout **transportaría cero documentos** y
apagaría su pestaña Docs, que es precisamente el silencio que §20 prohíbe.

---

## BLOQUE H — Verificaciones

- **Suite: 119/119 verde**, 0 fallos, **0 skips** (`npm test`). Antes de este run: 107 tests,
  98 pass, **1 fallo** y **8 skips** — todos por la misma causa, que `cantu-studio/.project/`
  no estaba en disco; emitirla los resuelve. Los 12 nuevos: **11** de
  `projector-docs-transport.test.mjs` (transporte con índice curado, escaneo sin él, el mismo
  root cambiando de comportamiento al aparecer/desaparecer el archivo, transporte desde
  **los dos** layouts, índice malformado → escaneo, selección y orden preservados, campos
  curados verbatim, relleno solo de los ausentes, agrupación curada vs. carpeta, frescura
  curada + `mtime` en `sources`, **path que no resuelve** en sus tres formas, y emisión
  atómica/repetible) más **1** neto del reemplazo declarado en D.4.
- **Emisión atómica y repetible**: temp + rename; dos corridas con reloj fijo dan los archivos
  byte-idénticos; cero `.tmp` en disco; guarda de ruta ejercitada en los tests de siempre.
- **Cero identidad horneada en el proyector**, grep case-insensitive sobre
  `tools/projector/project.mjs`: `jame` **0** · `cantu` **0** · `studio` **0** ·
  `aiw_console` **0** · `hilo` **0** · `lessons` **0** · rutas absolutas de proyecto **0**.
  Los 2 aciertos de `aiw-console` son referencias en comentarios a la ruta del CONTRATO, no
  identidad en el comportamiento; las 2 rutas `C:\Program Files\…\git.exe` son el fallback de
  descubrimiento del binario de Git, preexistente de 0.4.0.
- **Las 9 fuentes diferidas siguen sin emitirse y sin stubbearse**, para Cantu tampoco: el
  test que lo fija sigue verde.

---

## BLOQUE I — REPORTE para QA del operador

**Arranque:**

```bash
node project-console/serve.mjs
```

desde `projects/aiw-console/`. Sirve el workspace **read-only** (GET/HEAD; cualquier escritura
responde 405) en **http://127.0.0.1:8788/project-console/index.html**. `PC_PORT` cambia el
puerto. Abre en el **Project Portfolio**.

**Qué mirar en la pestaña Docs de cada proyecto:**

1. **`Cantu Studio` → Docs: 140 documentos, no 354.** Es la comprobación central. En el árbol
   de la izquierda hay **10 grupos con los nombres de SU curaduría** (Run Evidence 60, Docs
   26, Component Docs 21, Author Lite 12, Governance 9, Roadmap 3, Ops 3, Jame Core 3,
   Project Console 2, Prompts 1) — no rutas de carpeta. Abre `Project Console Local View`
   (grupo Project Console): es un `.html`, y debe verse como **texto**, no como una página
   renderizada. Abre cualquier documento de `Run Evidence`: su panel **Metadata** muestra el
   Status y el Last update que salen de la frescura **curada**, no de un `mtime`.
2. **`AIW Console` → Docs: 31 documentos** (30 + este record), agrupados por carpeta
   (`Context/AIW-Console/Records` es el grupo grande). Este proyecto **no tiene índice
   curado**, así que sigue escaneando: es la prueba de que el respaldo no se rompió.
3. **La diferencia esperada con la consola local de Cantu, para que no sorprenda.** Su consola
   propia abre mostrando **38** documentos; la global muestra **140**. **No es una selección
   distinta**: es el modo de apertura. Su consola abre en su modo "New era" (los 38 que llevan
   `operator_review_status`); en su propio modo "All registered" muestra **los mismos 140**.
   Se puede comprobar sin escribir nada, abriendo su consola read-only en
   http://127.0.0.1:8788/projects/cantu-studio/docs/project-console/index.html y ejecutando
   `setDocsVisibilityMode("all")` en la consola del navegador.
4. **No arranques `tools/project-console/serve-project-console.mjs` de Cantu** si quieres
   mantener su repo intacto: su arranque escribe `.aiw/views/git_history.snapshot.json`.
   Retirar esa consola es el corte, `O4.P7`.

**Re-emitir** (cuando cambie el roadmap, la curaduría o el corpus de cualquiera de los dos):

```bash
node tools/projector/project.mjs ../cantu-studio
```

```bash
node tools/projector/project.mjs .
```

La primera línea de salida dice el layout y el modelo con que se leyó el root; la línea de
`docs_index` dice cuántas entradas se emitieron.

---

## Estado de completitud

- Bloque A (el problema medido, con los cuatro números) — COMPLETO.
- Bloque B (la ruta en el bundle + la bifurcación por presencia) — COMPLETO y APLICADO.
- Bloque C (las **cuatro** decisiones, resueltas en código y justificadas) — COMPLETO.
- Bloque D (números, A/B, comparación campo por campo, test reemplazado declarado) — COMPLETO.
- Bloque E (`cantu-studio` intacto; su índice curado leído, no editado) — COMPLETO.
- Bloque F (las dos pestañas en DOM real; la única diferencia, nombrada) — COMPLETO.
- Bloque G (qué implica para `O4.P6`, medido) — COMPLETO.
- Bloques H e I (verificaciones y QA) — COMPLETOS.

Ningún bloque quedó "NO ALCANZADO".
