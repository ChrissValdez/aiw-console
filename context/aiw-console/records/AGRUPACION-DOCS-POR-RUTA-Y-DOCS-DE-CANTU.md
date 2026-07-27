# AGRUPACIÓN DE DOCS POR RUTA — y la reorganización de `docs/` en `cantu-studio`

> Encargo de taller (campo del kernel, sin `max_rounds`). Dos trabajos que cierran juntos porque
> uno verifica al otro: **(A)** la consola global agrupa Docs por la **jerarquía de carpetas** del
> propio repo y no renderiza nada bajo un segmento `archive/`; **(B)** los documentos de
> `cantu-studio` se reorganizan bajo `docs/` para que esa regla produzca exactamente las categorías
> que su consola local muestra hoy; **(C)** el padding lateral sube de 20px a un punto intermedio.
>
> Fecha: 2026-07-27. **Ningún comando de git que escriba** — ni `init`, ni `add`, ni `commit`, ni
> `mv`, ni `rm`, ni `checkout`, en ningún repo. Los movimientos de archivo se hicieron con
> `rename` del sistema de archivos; git se ejecutó en SOLO LECTURA (`status`, `log`). **No se
> arrancó el servidor propio de `cantu-studio`** (escribe al arrancar): la verificación en
> navegador se hizo con el servidor de esta consola, que no escribe al arrancar.
>
> **Archivos escritos por este trabajo, y ninguno más:**
> `project-console/assets/project-console.js` · `project-console/assets/project-console.css` ·
> `tests/docs-path-grouping.test.mjs` (nuevo) · `tests/fixtures/rutas/**` (nuevo) · los **seis**
> archivos bajo `.project/` de este repo · en `cantu-studio`: **112 movimientos** dentro de
> `docs/`, el campo `path` de 99 entradas de `.aiw/docs/docs_index.json`, y sus **seis** archivos
> bajo `.project/` · este record.
> **No se tocó** el roadmap ni los canónicos de ninguno de los dos repos, `DECISIONES.md`,
> `CONTRATO.md`, ningún record existente, el fork D-035 (`docs/project-console/`), el prototipo
> retirado (`console/`), el tooling viejo (`tools/project-console/`), ni
> `tools/projector/project.mjs` — **el emisor no fue modificado en absoluto**.

---

## 0 — La medición, hecha ANTES de mover

Los cuatro números que el encargo pide, tomados del índice curado de Cantu
(`.aiw/docs/docs_index.json`) y del disco, antes de tocar un solo archivo:

| Medición | Valor |
| --- | --- |
| Entradas del índice curado | **140** |
| …que viven bajo `docs/` | **131** |
| …que viven FUERA de `docs/` | **9** |
| Documentos con `operator_review_status` (los 38) | **38** |
| …de los 38, bajo `docs/` | **38** |
| …de los 38, FUERA de `docs/` | **0** |

**Ningún documento de los 38 vive fuera de `docs/`.** La lista que el encargo pedía "si los hay"
está vacía. Las 9 entradas que sí viven fuera son: `AGENTS.md`, `CLAUDE.md`, `README.md`,
`prompts/_CONTEXT_GUIDE.md` y cinco JSON bajo `.aiw/docs/`. Ninguna se tocó, ninguna se movió, y
bajo la regla nueva caen en los grupos `Root`, `Prompts` y `.AIW / Docs` por su propia ruta.

Archivos bajo `docs/` antes: **345**. Archivos bajo `docs/` después: **345**.

### El mapa de clasificación, verificado contra los 38

La clasificación NO se inventó ni se rehizo por criterio propio: sale de
`DOCS_NEW_ERA_CATEGORY_BY_PATH`, en el JavaScript de la consola local de Cantu
(`docs/project-console/assets/project-console.js`), que sigue en su repo y no fue modificado.
Ese mapa tiene **38 entradas** y la correspondencia con los 38 documentos revisados es **exacta y
biyectiva**, medida:

- documentos de los 38 que NO aparecen en el mapa: **0**
- rutas del mapa que NO están entre los 38: **0**
- rutas del mapa que no resuelven en disco: **0**

Por eso no hubo ningún documento "no clasificable", y no hizo falta inventar ninguna categoría.

---

## (A) — La regla: la ruta manda, siempre

### Qué había

Dos mecanismos de agrupación en paralelo, dentro del mismo renderer:

1. `deriveDocGroup` — el grupo salía de los campos de la entrada
   (`ia_bucket` → `category` → `related_area` → `source_role` → `uncategorized`), con dos tablas
   de orden y etiquetas que el port ya había vaciado.
2. `buildDocsNewEraTree` — para el modo `newera`, un **mapa ruta → categoría** escrito como
   cuarenta y pico rutas exactas del proyecto de origen, más un subgrupo `Web`/`Slides` escrito a
   mano para una carpeta concreta.

El mapa no podía viajar: con las rutas de cualquier otro repo, toda entrada cae por el `||` final.
Viajó vacío, y con él vacío los **38 documentos de Cantu caían en un solo cajón
`UNCATEGORIZED (new)`** — que es exactamente el defecto que este encargo cierra.

### Qué hay ahora

Una sola regla, para todos los proyectos y los tres modos de visibilidad: **el grupo de un
documento es su carpeta**, con subgrupos hasta la profundidad que el repo tenga.

```
docDirSegments(doc)        los segmentos de directorio de su `path` (un archivo en la raíz → [])
commonDirPrefixLength()    los segmentos iniciales que TODOS los documentos renderizados comparten
buildDocsNavTree(entries)  el árbol: cadena de carpetas menos ese prefijo compartido
```

**El prefijo compartido no es un grupo.** Los segmentos que todos comparten no distinguen a nadie
de nadie: son iguales para todos, así que no pueden separar un grupo de otro. La agrupación
empieza en el primer segmento donde las rutas de verdad **difieren**. Eso es lo que hace que la
misma regla, sin una sola carpeta escrita en el código, funcione para los dos repos:

- Cantu, con todo bajo `docs/` → `docs` es compartido → los grupos son `architecture`,
  `decisions`, `components/web`, …
- esta consola, con documentos en `context/`, `docs/`, `console/`, `project-console/` y la raíz →
  no hay nada compartido → esas carpetas de primer nivel **son** los grupos.

Siempre queda al menos un segmento por el que agrupar, así que un corpus de un solo documento
nombra su carpeta en vez de colapsar al cajón sin carpeta.

**La ruta gana sobre los campos del índice.** Un índice curado puede seguir trayendo `ia_bucket`,
`category`, `related_area` o `source_role`: la navegación los ignora. Una regla para todos los
proyectos y los dos modos, de modo que el árbol es predecible mirando el repo. **El costo, real y
aceptado**: Cantu pierde sus nombres de grupo curados en modo `all` y ve nombres de carpeta. **No
se escribió nada en ningún índice** — esos campos siguen en el dato, simplemente no son de donde
sale la navegación.

Los documentos que quedan directamente en el nivel donde empieza la agrupación no tienen carpeta
por la que agruparse: van juntos, al final, bajo **`Root`** — el análogo de la vieja cola
`Uncategorized`, pero alcanzado por un hecho de la ruta y no por metadatos ausentes.

### La regla `archive/`, y dónde se decidió

Un documento que vive bajo una carpeta llamada `archive` **no se renderiza en Docs**: en ninguna
vista, en ningún modo. Genérica y por ruta — no nombra ningún proyecto ni ninguna otra carpeta.

Se prueban **solo los segmentos de DIRECTORIO**, nunca el nombre del archivo: un documento llamado
`DOCS_RETENTION_ARCHIVE_POLICY.md` es un documento *sobre* archivar, no un documento archivado.
Hay un fixture sintético con ese caso exacto (`notas/ARCHIVE-POLITICA.md`) que se renderiza.

**Se decidió en el CONSUMIDOR** (`project-console/assets/project-console.js`), no en el emisor.
Dos razones:

1. El emisor **transporta** el índice curado verbatim (canónico afuera, derivado adentro). Sacar
   entradas de `docs[]` haría que el archivo emitido contradiga la curación que dice republicar, y
   `unresolved` — la única razón declarada por la que una entrada puede omitirse — significa "el
   archivo no está en disco", que es otra afirmación, y verdadera. Un archivo archivado resuelve
   perfectamente.
2. Un `.project/` emitido **antes** de que esta regla existiera esconde igual su archive bajo esta
   consola, sin re-emisión. La regla alcanza a todo proyecto que la consola renderice, no solo a
   los que se vuelvan a emitir.

Consecuencia directa y buscada: `tools/projector/project.mjs` **no fue tocado**, y la proyección
de AIW por el camino viejo salió **byte a byte idéntica** (ver §Aditividad).

### La raíz de Docs NO se restringió a `docs/`

Esta consola tiene su documentación en `context/`, `docs/`, `console/`, `project-console/` y la
raíz. Sigue renderizando **todos** sus documentos, agrupados por carpeta, sin perder ninguno — los
**34** que tenía al empezar, **35** contando este mismo record. La única exclusión nueva es
`archive/`.

### Lo que se borró del renderer

Eliminados, no vaciados (una tabla vacía sigue siendo un sitio donde volver a escribir un nombre):
`DOCS_NEW_ERA_CATEGORY_BY_PATH`, `DOCS_NEW_ERA_BLUEPRINT_ORDER`, `DOCS_NEW_ERA_UNCATEGORIZED`,
`DOCS_NEW_ERA_COMPONENT_SUBGROUP_ORDER`, `docNewEraCategory`, `docComponentSubgroup`,
`buildComponentSubgroups`, `buildDocsNewEraTree`, `DOCS_GROUP_ORDER`, `DOCS_GROUP_LABELS`,
`DOCS_GROUP_ALIASES`, `deriveDocGroup`. Un test lo comprueba por nombre, uno a uno.

**Grep de identidad horneada** sobre las 5 020 líneas ejecutables del renderer y las 5 990 del CSS
(comentarios excluidos), buscando `cantu`, `jame`, `aiw_console`, `cantu_studio`, `aiw-console`,
`START-HERE`, `docs/components`, `docs/decisions`, `components/web`, `CATEGORY_BY_PATH`,
`BLUEPRINT`: **cero coincidencias**. La única aparición de `ia_bucket` que queda está en
`deriveDocNavTier` (clasificación de *tier* de navegación, no de grupo), preexistente y fuera del
alcance de este encargo. El único nombre de carpeta que la regla necesita es `archive`, y es
genérico.

---

## (B) — La reorganización de `docs/` en `cantu-studio`

### La frontera, y con qué condiciones se cruzó

Este es el **primer encargo que escribe en `cantu-studio` fuera de `.project/`**. Ese límite se
sostuvo durante todo O4. Se cruza porque el operador lo decide, y con estas condiciones,
verificadas todas:

| Condición | Cómo se verificó | Resultado |
| --- | --- | --- |
| Respaldo previo verificable | Copia completa de `docs/` + el índice curado al scratchpad, con md5 agregado comparado contra el vivo | `docs` md5 `1f7b4067e71d3a521c1ed1d8033dec8e`, índice md5 `8d4db9e3eda657f267eb8aa184f785bc` — **idénticos** |
| Ningún archivo borrado | Conteo de archivos bajo `docs/` antes/después, y md5 agregado del **multiconjunto de contenidos** (ignora rutas) | 345 → **345**; multiconjunto `d52de1314fd22162996b57fde01f009a` **idéntico** |
| Ningún archivo fuera de `docs/` tocado | md5 agregado del resto del repo (20 968 archivos) antes/después | `19d94b319cb19d1245c42f150dabdfb9` **idéntico** |
| Validador de Cantu en verde | Ejecutado por la vía que no escribe, como en O4.P4 | `Project Console state validation passed.` |

No se tocó su consola local, su tooling, su validador, su `.aiw/` restante ni su roadmap canónico.

### Estructura destino

Las nueve categorías del mapa se convirtieron en carpetas bajo `docs/`. La conversión
categoría → carpeta es mecánica (minúsculas, espacios a `_`) y da la vuelta completa: la etiqueta
que la consola pinta desde el nombre de carpeta es la categoría de nuevo.

| Categoría (mapa de Cantu) | Carpeta destino | Docs | Etiqueta pintada |
| --- | --- | ---: | --- |
| START HERE | `docs/start_here/` | 1 | Start Here |
| ARCHITECTURE | `docs/architecture/` | 5 | Architecture |
| DECISIONS | `docs/decisions/` *(ya estaba)* | 6 | Decisions |
| REFERENCE | `docs/reference/` | 3 | Reference |
| COMPONENTS | `docs/components/web/` *(ya estaba)* | 17 | Components → Web |
| HOW-TO | `docs/how-to/` | 2 | How-To |
| OPERATIONS | `docs/operations/` | 2 | Operations |
| GOVERNANCE | `docs/governance/` | 1 | Governance |
| DOCS MANAGEMENT | `docs/docs_management/` | 1 | Docs Management |

**23 de los 38 no se movieron**: `docs/decisions/` y `docs/components/web/` ya eran exactamente
la estructura destino. Solo se movieron los **15** que estaban sueltos en la raíz de `docs/`.

#### Mapa documento → destino, completo (los 15 que se movieron)

| Origen | Destino |
| --- | --- |
| `docs/START-HERE.md` | `docs/start_here/START-HERE.md` |
| `docs/ARCHITECTURE-PROJECT-CONSOLE.md` | `docs/architecture/ARCHITECTURE-PROJECT-CONSOLE.md` |
| `docs/ARCHITECTURE-SLIDES-ENGINE.md` | `docs/architecture/ARCHITECTURE-SLIDES-ENGINE.md` |
| `docs/ARCHITECTURE-SYSTEM-OVERVIEW.md` | `docs/architecture/ARCHITECTURE-SYSTEM-OVERVIEW.md` |
| `docs/ARCHITECTURE-WEB-ENGINE.md` | `docs/architecture/ARCHITECTURE-WEB-ENGINE.md` |
| `docs/EDITOR-ARCHITECTURE.md` | `docs/architecture/EDITOR-ARCHITECTURE.md` |
| `docs/REFERENCE-DRAFT-JSON.md` | `docs/reference/REFERENCE-DRAFT-JSON.md` |
| `docs/REFERENCE-SLIDES-ENGINE-API.md` | `docs/reference/REFERENCE-SLIDES-ENGINE-API.md` |
| `docs/REFERENCE-WEB-ENGINE-API.md` | `docs/reference/REFERENCE-WEB-ENGINE-API.md` |
| `docs/HOW-TO-AUTHOR-A-LESSON.md` | `docs/how-to/HOW-TO-AUTHOR-A-LESSON.md` |
| `docs/HOW-TO-RUN-AND-BUILD.md` | `docs/how-to/HOW-TO-RUN-AND-BUILD.md` |
| `docs/OPERATIONS-RUN-PROTOCOL.md` | `docs/operations/OPERATIONS-RUN-PROTOCOL.md` |
| `docs/OPERATIONS-STATE.md` | `docs/operations/OPERATIONS-STATE.md` |
| `docs/GOVERNANCE-AUTHORITY-AND-NO-CLAIMS.md` | `docs/governance/GOVERNANCE-AUTHORITY-AND-NO-CLAIMS.md` |
| `docs/DOCUMENTATION-BLUEPRINT.md` | `docs/docs_management/DOCUMENTATION-BLUEPRINT.md` |

Los otros 23 se quedaron donde estaban: `docs/decisions/` (6, incluido su `README.md`) y
`docs/components/web/` (17: ARITHMETIC, CALLOUT, CARD, COLUMNS, CONCEPT-GRID, DETAILS, HEADER,
HIERARCHY, ICON-LIST, LIST, NARRATIVE, RULE, SPLIT, TABLE, TIMELINE, VIDEO, VISUAL).

### Archive

**97 archivos** bajo `docs/` que no están entre los 38 se movieron a `docs/archive/`, preservando
su ruta relativa dentro de archive: `docs/ops/JAME_OPS_STATE.md` →
`docs/archive/ops/JAME_OPS_STATE.md`, y así con `_historical_run_record/` (67), `author-lite/` (9),
`human/` (6), `jame-core/` (4), `shared/` (3), `ops/` (2), `generated/` (1), `_legacy/` (1) y
cuatro sueltos de la raíz de `docs/` (`CANONICAL_SOURCES.md`, `DOCS_CORPUS_CURATION_PLAN.md`,
`DOCS_MISSING_BACKLOG.md`, `DOCS_RETENTION_ARCHIVE_POLICY.md`).

Otros **202 archivos** ya vivían bajo `docs/archive/` y se quedaron donde estaban. **Nada se
borró.** Las carpetas que quedaron vacías tras el movimiento (`ops/`, `human/`, `shared/`,
`jame-core/`, `generated/`, `_legacy/`, `_historical_run_record/`, `author-lite/`) **se dejaron en
su sitio**: el encargo dice que nada se borra, y un directorio vacío es invisible para git y para
la consola.

### La excepción, y por qué

`docs/project-console/` (**8 archivos**) **NO se movió a archive**, y esto es una desviación
declarada de la letra de (B).3.

`docs/project-console/` no es documentación: es la **consola local de Cantu** — código de
aplicación (`index.html`, `assets/project-console.js`, `assets/project-console.css`) más sus
propios datos. Su validador la lee por ruta exacta, en tres líneas:

```
tools/project-console/validate-project-console-state.mjs:167  readText("docs/project-console/assets/project-console.js")
tools/project-console/validate-project-console-state.mjs:168  readText("docs/project-console/assets/project-console.css")
tools/project-console/validate-project-console-state.mjs:1321 readText("docs/project-console/index.html")
```

Moverla rompe el validador y contradice el fuera-de-alcance explícito del propio encargo ("no se
toca su consola local"). Las dos condiciones que el encargo pone como criterio de aceptación —
**validador en verde** y **no tocar la consola local** — mandan sobre la generalidad de la regla de
archive, así que la carpeta se quedó donde está y la excepción se reporta en vez de esconderse.

Consecuencia visible, y honesta: **6 entradas curadas** apuntan dentro de `docs/project-console/`
(`index.html`, `changelog.md`, `JAME_HUMAN_GATE_POLICY_LITE.md`, `JAME_RUN_PROTOCOL_LITE.md` y dos
JSON de propuesta de roadmap). Ninguna está entre los 38, así que **no aparecen en la vista
`newera`** que es la que Cantu abre; sí aparecen bajo `all`, como grupo `Docs / Project-Console`.

**Efecto colateral medido y NO reparado** (es trabajo del roadmap de Cantu, no de este encargo):
`generate_prompt_context.js` lee por ruta fija varios archivos que ahora están bajo
`docs/archive/` — `docs/shared/DOCUMENT_CLASSES.md`, `docs/shared/AI_CONTEXT_POLICY.md`,
`docs/shared/VERSIONING.md`, `docs/shared/DOCS_TEMPLATES.md`, `docs/jame-core/DOCS_CORE.md`,
`docs/jame-core/_SYSTEM_SPECS.md` y varios de `docs/author-lite/components/`. Ese script **ya
estaba parcialmente desactualizado** antes de este trabajo (también nombra `docs/README.md`,
`docs/DOCUMENTATION_MAP.md` y `docs/DOCUMENT_STATUS.md`, que llevan tiempo bajo
`_historical_run_record/`). No se modificó: es su tooling y está fuera de alcance.

### El índice curado

El movimiento invalida los `path` del índice curado, cuyo validador **exige** que cada path
resuelva. Se actualizaron **99** rutas (los 15 movidos a categoría + 84 movidos a archive).

La edición es **textual**, línea a línea sobre `"path": "…"`, no una re-serialización del JSON:
así la indentación, el orden de claves y los finales de línea CRLF quedan intactos y el diff solo
puede contener cadenas de ruta. Comprobado sobre el diff real:

```
líneas cambiadas:      100 (-) / 100 (+)   → 99 rutas + la cabecera del propio diff
líneas cambiadas que NO son "path":  0
entradas antes / después:           140 / 140
entradas con algún otro campo distinto:  0
entradas cuyo path no resuelve en disco: 0
```

---

## (C) — El padding

`--pc-content-pad`, una sola variable, **20px → 28px**. El acabado anterior lo había bajado de
32/48px a 20px junto con el retiro del tope de ancho, y a 20px el contenido corre hasta el borde
del panel. 28px es el punto intermedio: devuelve un canalón legible y conserva la mayor parte del
ancho que la bajada buscaba recuperar. Un solo valor en todos los viewports, así que nada puede
desalinearse.

El diff de CSS son **dos bloques, ambos de espaciado**: esta variable, y la sangría de la
navegación de Docs, que pasó de dos reglas enumeradas (nivel 1 y nivel 2) a una calculada desde
`--docs-nav-depth`, porque el árbol de carpetas ya no tiene profundidad fija. El paso es el que ya
existía: cabecera a `20px + 14px × nivel`, sus ítems 14px más adentro — lo que reproduce
exactamente los 20 → 34px de cabeceras y 34 → 48px de ítems de antes en los dos primeros niveles.
Ni un color, ni una tipografía, ni un componente.

Medido en el DOM real (navegador, servidor de esta consola):

| Viewport | Columna | Padding | Útil | Hijo más ancho | Scroll horizontal |
| --- | ---: | ---: | ---: | ---: | --- |
| 1280 | 1024px | 28px | 968px | 968px (Overview) | **no** |
| 1920 | 1664px | 28px | 1608px | 1608px (Overview) | **no** |

A/B en vivo de los tres valores a 1280: útil 984px (20px) / **968px (28px)** / 960px (32px), sin
desbordamiento horizontal en ninguno. La sangría medida en el DOM: cabeceras 20 / 34 / 48px y sus
ítems 34 / 48 / 62px en los niveles 0, 1 y 2.

---

## Verificación

### Cantu: los 38, entrada por entrada

Comparación automática entre el grupo que **pinta** la consola global (leído del DOM que produce,
no del modelo) y la categoría que el mapa de Cantu asigna a ese mismo documento:

```
documentos comparados:          38
en un grupo distinto:            0
en "uncategorized":              0
pintados en total en el árbol:  38
subgrupos de Components:        Components / Web
```

El árbol pintado, con sus conteos: **Architecture (5) · Components (17) → Web (17) · Decisions (6)
· Docs Management (1) · Governance (1) · How-To (2) · Operations (2) · Reference (3) · Start Here
(1)**. Los mismos nueve grupos y los mismos conteos que su consola local.

**Lo único que no se reproduce: el subgrupo `Slides (0)`.** En la consola de Cantu es una lista
escrita a mano (`["Web", "Slides"]`) que se pinta vacía a la espera de que existan paquetes de
slides. Bajo una regla derivada de la ruta, un subgrupo sin ningún documento **no tiene ruta de la
que derivarse**: renderizarlo exigiría volver a hornear el vocabulario de subgrupos, que es
exactamente lo que este encargo quita. Se reporta y no se inventa. Los 38 documentos están todos,
en su categoría.

### Esta consola: sin regresión

Verificado en el DOM del navegador, con este record ya emitido (35 documentos; eran 34 al
empezar):
`Console (1) · Context (30) → AIW (4), AIW-Console (21) → Records (20), Cantu-Studio (1),
Handoffs (1) · Docs (1) · Project-Console (1) · Root (2)`. Cero en "uncategorized". La asignación
documento → carpeta es idéntica a la de antes; lo que cambia es que ahora **anida** en vez de
listar rutas planas como etiquetas ("Context/AIW-Console/Records" era un grupo; ahora son tres
niveles). Un test re-deriva el grupo esperado de cada entrada desde su propia ruta y lo compara
contra el árbol pintado, documento por documento.

### La regla `archive/`

- Fixture sintético (`tests/fixtures/rutas/mixto`): 8 entradas, 2 bajo `archive/`, **6
  renderizadas**; ningún grupo `Archive` se pinta; `notas/ARCHIVE-POLITICA.md` **sí** se renderiza
  (solo cuentan segmentos de directorio); comprobado en los **tres** modos de visibilidad.
- Cantu, modo `all`: 140 entradas registradas, **87 bajo un segmento `archive`**, **53
  renderizadas**. Cero menciones de "archive" en el HTML de la navegación.
- El índice emitido **sigue trayendo** las 140 entradas: la regla esconde de la vista, no edita el
  dato de nadie.

### Aditividad

Proyección de AIW por el camino viejo (`runStartupProjection` sobre `../../aiw`, reloj fijo, en un
repo desechable de tmp que no escribe en ninguno de los dos repos reales), antes y después:

```
antes:  0cca573c31585f3a651f050e40401b80
después: 0cca573c31585f3a651f050e40401b80
diff: (vacío)
```

**Byte a byte idéntica, incluido `generated_from`** — no "salvo `generated_from`". El emisor no se
tocó, así que no había por dónde diferir.

Canónicos de roadmap intactos en ambos repos: en `cantu-studio` está dentro del md5 agregado del
resto del repo, que no cambió; en este repo, el diff por archivo lista exactamente ocho archivos
modificados (los seis de `.project/`, el JS y el CSS de la consola) y dos añadidos (el test nuevo y
sus fixtures) — `roadmap/roadmap.json`, `governance/**` y `context/**` no aparecen.

### Suite

**192 tests, 192 en verde** (178 antes + 14 nuevos). El archivo nuevo es
`tests/docs-path-grouping.test.mjs`, con los tres comportamientos que el encargo pide probados
primero sobre fixture sintético — jerarquía con subniveles, exclusión de `archive/`, y la ruta
ganando sobre `ia_bucket`/`category`/`related_area`/`source_role` — y después sobre los dos
proyectos reales, más un test que comprueba por nombre que ninguna de las doce tablas y funciones
horneadas sobrevive en el renderer.

### Validador de Cantu

Ejecutado por la vía que no escribe (`node tools/project-console/validate-project-console-state.mjs`,
cero llamadas de escritura), **después** de mover y de reescribir el índice:

```
Project Console state validation passed.
Roadmap v3 prototype: 7 objectives / 28 phases / 53 runs; queue groups needs_human_decision=0 now=0 ready_next=9 later=42 history=2
Docs indexed: 140
Docs curated primary-visible: 53 of 140 registered
Component statuses: 16
Git provenance episodes: 9
Git history snapshot: 917 commits / 2 branches (2 visible, 0 backup hidden); current=main; run-associated=6; source=local_git_autosync
```

Idéntico al de antes del trabajo, con el mismo aviso no bloqueante de rebase del roadmap, que ya
estaba y no tiene relación con esto.
