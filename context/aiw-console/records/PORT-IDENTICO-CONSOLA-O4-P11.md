# PORT IDÉNTICO — la consola viva de Cantu, trasplantada sobre las fuentes de `aiw-console` (`O4.P11`)

> Entregable de conocimiento del run `RUN-CONSOLE-PORT-IDENTICO-001` (fase `O4.P11`).
> Documenta **qué viajó verbatim y qué se tocó**, **los puntos de identidad horneada y cómo se
> resolvió cada uno**, **la divergencia deliberada de Docs** y **qué queda para el shell (P3)**.
>
> Fecha: 2026-07-24. **No se ejecutó git en ninguna forma.** No se tocó el roadmap canónico,
> `DECISIONES.md`, `CONTRATO.md` ni ningún record existente. **`cantu-studio` no fue modificado**
> (comprobado por md5, Bloque F.3): se leyó, y para el QA visual se sirvió en solo-lectura desde
> un server desechable del scratchpad, fuera de todo repo.
>
> **Archivos escritos por este run, y ninguno más:**
> `project-console/index.html`, `project-console/assets/project-console.css`,
> `project-console/assets/project-console.js`, `project-console/serve.mjs`,
> `project-console/README.md` (la consola trasplantada, ruta nueva) ·
> `tools/projector/project.mjs` (addendum, aditivo) ·
> `tests/projector-roadmap-tree.test.mjs` (dos aserciones actualizadas + un test nuevo) ·
> los cinco archivos emitidos bajo `.project/` · este record.
> **El `.aiw/` de este repo NO fue modificado** (md5 y mtime intactos, F.3).
> **El fork D-035 (`docs/project-console/`) y el prototipo retirado (`console/`) no fueron
> leídos, reutilizados ni tocados** — sus mtimes siguen en 2026-07-09/10 y 2026-07-24 14:xx.

Insumos, usados y no re-medidos: `EMISOR-CARPETA-PROPIA-O4-P2.md` (Bloque F: los cinco pendientes
del port), `AUDIT-CONSOLE-O4-PHASE0.md` (Bloque B contrato de datos, Bloque E identidad con
archivo y línea), `MEDICION-FUENTES-CONSOLA.md` (qué pinta píxeles), `CONTRATO.md`.

---

## BLOQUE A — Es un trasplante, y se puede probar

Los tres archivos se copiaron **byte a byte** desde `cantu-studio/docs/project-console/` y sobre
la copia se operó. No hay una sola línea escrita "inspirada en": lo que no se nombra abajo, es el
archivo original.

| Archivo | Origen | md5 al copiar | Estado final |
|---|---|---|---|
| `index.html` | `CANTU/docs/project-console/index.html` | `c633c744…35093` | **1 línea cambiada** (el `<title>`), +1 comentario |
| `assets/project-console.css` | idem `/assets/` | `a0bf2e15…af165b` | **0 reglas cambiadas** — solo comentarios |
| `assets/project-console.js` | idem `/assets/` | `4000bebd…528860` | 56 hunks; 69 líneas de código añadidas, 219 quitadas |

**La prueba dura del CSS.** Quitados TODOS los comentarios de ambos archivos, el resto es
**idéntico byte a byte**: 101 345 bytes en los dos. No se reescribió una regla, un color, un
espaciado ni un breakpoint. Las 70 líneas que difieren son comentarios de procedencia que
nombraban runs del proyecto origen (Bloque C.7).

**El JS, en proporción.** De 501 líneas que difieren, 213 son comentario o blanco. De las 288 de
código, **219 son BORRADO** (tres tablas horneadas: 69 + 57 + 40 líneas, y el bloque que
sintetizaba una etapa) y **69 son añadido**, casi todo la tabla `PATHS` reescrita sobre una
constante base. El renderer, sus 40 funciones de render, el markdown-lite, los drawers, la cola,
el árbol, los estados vacíos y los textos: intactos.

**Ruta nueva y limpia:** `project-console/` en la raíz del repo. No es `docs/project-console/`
(el fork D-035), no es `console/` (el prototipo retirado por D-048), no es `tools/project-console/`
(el tooling viejo). Nada de eso se leyó ni se sobrescribió.

---

## BLOQUE B — Cirugía 1: la capa de datos apunta a `.project/`

`PATHS` pasó de 15 literales `../../.aiw/**` + 2 endpoints a **una base y sus derivadas**
(CONTRATO §1.a, el pendiente F.2.1 del emisor):

```js
const REPO_BASE   = "../";                      // el repo, desde project-console/index.html
const PROJECT_BASE = `${REPO_BASE}.project/`;   // la carpeta del contrato
```

Las otras dos rutas relativas horneadas del renderer —`repoHref` y el fetch del cuerpo de doc,
ambas `../../${path}` (AUDIT E.3)— pasan por `REPO_BASE`. Hoy no queda **ningún** literal de ruta
de datos repetido en el archivo.

| Clave | Antes | Ahora | Estado |
|---|---|---|---|
| `snapshot` | `.aiw/views/project_console.snapshot.json` | `.project/snapshot.json` | emitido (requerido) |
| `roadmapV3` | `.aiw/roadmap/roadmap.json` | `.project/roadmap.json` | **emitido por el addendum** |
| `docsIndex` | `.aiw/docs/docs_index.json` | `.project/docs_index.json` | emitido |
| `guardrails` · `noClaims` | `.aiw/guardrails/*` | `.project/guardrails.json` · `no_claims.json` | emitidos |
| `gitHistory` | `.aiw/views/git_history.snapshot.json` | `.project/git_history.json` (§19) | **no emitido** → History en vacío |
| los 9 diferidos | `.aiw/**` | `.project/**`, con los nombres que el emisor ya les declaró (EMISOR E) | **no emitidos**, no stubbeados |
| `historySync` · `roadmapEdit` | dos endpoints POST | **`null`** | no hay ruta de escritura (Bloque E) |

Ninguna vista lee de `.aiw/`. Comprobado en pantalla: **Status → Console Diagnostics** lista
5 `Loaded` (las cinco de `.project/`) y 10 `Failed`, cada una **nombrada por archivo**, todas bajo
`.project/`.

---

## BLOQUE C — Cirugía 2: los puntos de identidad, uno por uno

Los ocho del Bloque E del audit, más dos que aparecieron al portar. Criterio único: **la identidad
sale del dato, no del código.**

**C.1 `PROJECT_CONSOLE_PARENT_RUN_ID` + `PROJECT_CONSOLE_STAGE_IDS`** (AUDIT E.2, `CANTU-PCJS:33-39`).
Un run padre y cuatro ids de etapa del proyecto origen. **Eliminados**, junto con el bloque que
sintetizaba una etapa "Implementation" para ese run concreto (`:473-475`). `runKind` sigue
resolviendo por `run.run_kind` / `queueItem.display_kind`; las etapas de un run salen ahora solo de
`run.stage_checklist` y del modelo de cola. Ningún run recibe una etapa que su dato no traiga.

**C.2 `RUN_OPERATOR_OVERRIDES`, 12 claves** (AUDIT E.2, `:248-311`). Tabla de copy de display por
run id, que **pisaba lo que decía el roadmap** para esos 12 runs. **Viaja vacía** (`{}`). Los nueve
lugares que la consultan conservan su forma y caen, como ya caían, a los campos `operator_*` del
propio run y luego a su `title`/`summary`. Copy fuera del dato es una segunda fuente de verdad, y
solo puede ser cierta para un proyecto.

**C.3 El regex de enmascarado `RUN-JAME-`** (AUDIT E.1, `:715`). `cleanOperatorTitle` ocultaba ids
de run dentro de títulos humanos, pero solo los de un prefijo. **Se volvió estructural**:
`/\bRUN-[A-Z0-9]+(?:-[A-Z0-9]+)+\b/g`. Enmascara cualquier id con forma de run, se llame como se
llame — un prefijo *es* identidad. Nota medida: el roadmap real de este proyecto **contiene** ids
`RUN-JAME-…` y `RUN-CANTU-…` heredados; eso es **dato histórico**, no código, y no se tocó.

**C.4 El mapa doc→categoría de la "nueva era"** (AUDIT E.5/B.6, `:2273-2298`). ~40 rutas exactas
del corpus del proyecto origen (`docs/START-HERE.md`, `docs/components/web/*.md`). Es el caso más
claro de identidad horneada del renderer. **Viaja vacío.** Los documentos sin categoría ya tenían
destino definido (`UNCATEGORIZED (new)`), así que no se pierde ni se inventa nada.

**C.5 El vocabulario de grupos de Docs** (`DOCS_GROUP_ORDER` / `_LABELS` / `_ALIASES`, con
`jame_core: "JAME Core"` entre las etiquetas, AUDIT E.5). Catorce buckets de IA del proyecto
origen con sus rótulos a mano. **Viajan vacíos.** La regla de orden ya decía que "los grupos no
listados renderizan alfabéticamente antes de Uncategorized": con la lista vacía, **todos** toman
ese camino y el árbol se construye enteramente del `ia_bucket` que cada entrada trae. En pantalla:
`Console · Context · Context/AIW · Context/AIW-Console · Context/AIW-Console/Records ·
Context/Cantu-Studio · Context/Handoffs · Docs · Root`, derivados del corpus real.

**C.6 La rama horneada `jame-parallel-audit-001`** (AUDIT E.4, `:3714-3715`). Segunda preferencia
de qué pestaña de rama abre seleccionada. **Eliminada.** Queda: `current_branch` del snapshot →
`main` (convención genérica) → la primera rama visible.

**C.7 El gate de schema `jame.git_history_snapshot.v1`** (`:3723`; el emisor lo dejó anotado en su
Bloque E como trabajo de esta fase). Un nombre de proyecto dentro de un identificador de formato, y
lo único que hacía que History **rechazara** la historia de otro proyecto. **El gate pasa a ser por
FORMA**: lista de ramas + lista de commits, que es exactamente lo que el renderer lee. Un archivo
que las trae, renderiza; uno que no, cae al mismo estado vacío que la ausencia. El día que exista
emisor de `.project/git_history.json`, declarará su modelo y el gate podrá volver a comprobarlo —
contra un identificador que no lleve el nombre de nadie.

**C.8 Rutas de tooling y de arranque en texto visible** (AUDIT E.3). Cuatro cadenas que nombraban
`tools/project-console/serve-project-console.mjs`, `tools/dev/start-project-console.cmd` y
`http://127.0.0.1:8787/docs/project-console/index.html`, más los diez literales `.aiw/**` del panel
Repo Structure y los tres `docs/project-console/*` del panel Console Source Files. **El comando y la
URL viven ahora en una constante cada uno** (`CONSOLE_SERVE_COMMAND`, `CONSOLE_ENTRY_URL`,
`CONSOLE_FILES`) y **el panel Repo Structure se lee de `PATHS`**, no de literales re-tecleados: el
panel ya no puede divergir de lo que la consola de verdad busca.

**C.9 El `<title>` del HTML.** Decía `Cantu Studio Project Console`: el único punto donde el propio
`index.html` era por-proyecto. Ahora dice `Project Console` (neutro, válido antes de cargar) y el
renderer lo completa **desde el dato** —`roadmap.title`, si no `snapshot.project_id`— en
`applyProjectIdentity`. En pantalla: `AIW Console Roadmap — Project Console`.

**C.10 Comentarios de procedencia con ids de runs ajenos** — 22 en el JS, 27 en el CSS. No pintan
un píxel, pero son cadenas de identidad dentro del código portado. **Se reescribieron conservando
la explicación y quitando el id.** La procedencia real del código no se pierde: está aquí, en el
Bloque A, con md5.

**Verificación:** `grep -ci "jame\|cantu"` sobre los tres archivos portados = **0, 0 y 0**.
No queda `project_id` fijo en ninguna parte: la única aparición de la clave es la lectura
`data.snapshot.project_id` de C.9.

### Lo que NO se quitó, y por qué se dice

- **`operatorType`** (`:457`) conserva un vocabulario de dominios y una heurística por palabras
  (`"console"`, `"math"`, `"web"`…) afinada al proyecto origen. **No nombra a nadie** y es lógica de
  display VIVA: tocarla cambiaría lo que se ve, que es justo lo que esta fase no debe hacer. Con
  los ids de este proyecto casi todo cae en "Project Console", que resulta correcto. Queda anotado
  como residuo: el shell debería tomarlo de `run.domain` / `run.operator_type_label`.
- **`renderOverview` y `renderHistory`, dormidas** (sin llamador, ya medido en MEDICION A.3),
  contienen copy del proyecto origen ("Author Lite remains paused…", "Smart Formula RULE_ONLY").
  **Nunca renderizan.** Viajan como viajan en Cantu; el pulido no es de esta fase.

---

## BLOQUE D — El addendum del emisor: `.project/roadmap.json`

Resolución 1 de la cabina, aplicada. El renderer vivo pinta Overview, Roadmap y Cola desde
`v3Model`, que exige `objectives[]` en la raíz del archivo de roadmap; **no** lee
`snapshot.roadmap_tree`. Se emitió el archivo en vez de reapuntar el renderer, porque cambiar qué
estructura parsea el renderer es cirugía profunda y arriesga justo la identidad visual que esta
fase existe para conservar.

**Qué cambió en `tools/projector/project.mjs`** (aditivo, mismo patrón):

- `PROJECT_ROADMAP_RELATIVE_PATH`, derivada de `PROJECT_DIR` como las otras cuatro (§1.a).
- `roadmapTreeBlock(tree)` — **el bloque del árbol se construye UNA vez**. Lo usan el snapshot
  (`roadmap_tree`) y el archivo nuevo. Es la misma disciplina que `COLLECTION_STATUS_RULES`:
  dos transportes del mismo árbol que **no pueden divergir** porque son la misma función.
- `buildProjectRoadmap(root, opts)` — envelope estándar (§4/§5/§6) + el bloque. Devuelve `null` si
  el root no es `roadmap_tree`, y entonces el archivo simplemente no se emite (§18/§20).
- Escritura atómica (temp + rename) por el helper de siempre, con la guarda `resolveInsideProject`.
- `PROJECTOR_VERSION` 0.2.0 → **0.3.0**: §6 pide que `generated_from` nombre herramienta y versión,
  y un emisor que escribe cinco archivos no es el que escribía cuatro.

**Números medidos:**

| Comprobación | Resultado |
|---|---|
| Suite del proyector | **42/42 verde** (41 previas + 1 nueva; 2 aserciones de "exactamente cuatro archivos" actualizadas a cinco) |
| Proyección de AIW por el camino viejo | **byte-idéntica salvo 1 línea** — `generated_from` (`0.1.0` en disco vs el actual), exactamente la única diferencia que O4.P2 ya había medido. Verificado por API pura de lectura, sin escribir en `aiw/` |
| `.project/roadmap.json` | 50 240 bytes · 2 objetivos · 15 fases · 31 runs |
| Árbol en los dos archivos | **idéntico** (comparación serializada) |
| Nada derivado almacenado | **0** niveles de objetivo o fase con `status` o `counts` |
| Emitir dos veces con el mismo reloj | byte-idéntico (test) |
| `.aiw/` de este repo | **4 archivos, md5 y mtime intactos** (`2026-07-22 15:38`) |
| Temporales | ningún `.tmp` en disco |

**La derivación, ejecutada con la tabla que el propio archivo declara** (no con una copia local):
**O0 → `active`** (12 runs: 9 completed, 1 active, 2 planned) y **O4 → `in_progress`** (19 runs:
9 completed, 10 planned). Coincide con lo que el emisor midió y con lo que el VEREDICTO §3 vio en
pantalla. `operational_status` del proyecto: `active`.

---

## BLOQUE E — Read-only, por construcción

`project-console/serve.mjs`, 122 líneas, patrón del serve de Cantu **menos todo lo que escribe**:
sin endpoint de edición, sin endpoint de sync, sin builder, sin comando git, sin watcher.

| Prueba | Resultado |
|---|---|
| `GET` de las 5 fuentes emitidas | 200 |
| `GET` de `.project/git_history.json` | 404 (no emitido; History degrada) |
| `POST` · `PUT` · `PATCH` · `DELETE` (cualquier ruta) | **405** `{"ok":false,"reason":"read_only_console"}` |
| `GET /.git/config` | 403 |
| Escape del root (`--path-as-is`, y codificado) | 403 / 404 |

Del lado del cliente las dos rutas de escritura se declaran ausentes (`historySync: null`,
`roadmapEdit: null`) en vez de borrarse: los dos call sites conservan su forma y **responden la
verdad**. El botón *Edit roadmap* sigue en la barra —es parte del layout— y al pulsarlo dice
"This console is read-only: it ships no roadmap write path…", en vez de culpar a un servidor
inalcanzable. `v3ProbeEndpoint` devuelve `false` sin hacer petición, así que el modo edición no
puede encenderse y todo el editor queda inalcanzable.

---

## BLOQUE F — QA visual: qué se comprobó, y contra qué

### F.1 Comparación real contra la consola viva de Cantu

Se sirvió `cantu-studio` en **solo lectura** desde un server desechable del scratchpad (GET/HEAD,
sin git, fuera de todo repo) y se comparó lado a lado, **con los dos viewports igualados a
1280×800**, la resolución computada de 43 selectores de chrome compartido —
`.project-header`, `.tabs`, `.tab`, `.content`, `.overview-*`, `.segmented-control`, `.segment`,
`.roadmap-toolbar`, `.docs-layout`, `.docs-nav`, `.docs-reader`, `.status-*`, `.gov-section*`,
`.panel*`, `.drawer*`, `.edit-modal`, `.readonly-banner`, `.btn*`, `.history-list`, `.sources-grid`,
`h2` — sobre 25 propiedades cada uno (display, position, padding, margin, border, radius, colores,
tipografía, gap, flex, sombra, transform de texto, tracking, interlineado, ancho máximo).

**Resultado: 35 de 43 firmas idénticas a la primera pasada**, con viewports distintos. Igualados
los viewports, las 8 restantes se resolvieron una por una y **ninguna es de estilo**: son de
ESTADO — la sección de Status activa era otra en cada pestaña, y el banner de fuentes opcionales
está visible en el port (10 opcionales faltan) y oculto en Cantu (no le falta ninguna). El caso
`margin: 0 auto` vs `8px` es la misma regla resuelta distinto por el navegador según el elemento
esté renderizado u oculto. Con el CSS ya probado idéntico fuera de comentarios (Bloque A), no
podía ser de otro modo.

### F.2 Las cinco pestañas, con datos reales

| Pestaña | Qué pinta | Verificado |
|---|---|---|
| **Overview** | Current work `#10` "Fix three latent console defects…" (Active/Now) · Next up `#11` · Next action `#12`, `#20`, `#21`, `#22` · Queue snapshot 0 / 1 / 9 / 3 / 18, 13 pendientes | 1+9+3+18 = **31 runs** |
| **Roadmap → Run Queue** (subview por defecto) | Grupos Needs Human Decision (0) · Now (1) · Upcoming (12) · History | 13 en la cabecera |
| **Roadmap → Roadmap** | O0 "Project Console" 12 runs / 9 completed / 1 active / 0 blocked / 75% · O4 "Consola global" 19 runs / 9 completed / 47% · fases con su ratio ("6 of 9 done · 1 active") | **2 objetivos, 15 fases, 31 runs** |
| **History** | "Commit history unavailable. `.project/git_history.json` could not be loaded. The rest of the Project Console is unaffected." | estado vacío de Cantu, fail-soft |
| **Docs** | 27 documentos reales del repo (los 25 del corpus previo + el README del port + este record), agrupados por bucket, con tag de tier; el lector renderiza el `.md` local del repo con el markdown-lite escape-first | cuerpo de `README.md` renderizado, metadata Status/Category/Last update/Path |
| **Status → Governance State** | Review & Approval Policy (HTML estático) · Project Guardrails (7 reglas, con `source_refs`) · Claims Not Allowed Yet (5 claims) | de `.project/guardrails.json` y `no_claims.json` |
| **Status → Console Diagnostics** | 5 Loaded / 10 Failed nombradas · Repo Structure con las rutas `.project/` · 27 docs indexados · 2 objetivos / 15 fases / 31 runs | |

### F.3 Fronteras

`cantu-studio` **sin modificar**: los md5 de sus tres archivos de consola y de sus tres artefactos
`.aiw/` son los mismos antes y después. `aiw-console/.aiw/` **sin modificar** (md5 + mtime).
`docs/project-console/` (fork D-035) y `console/` (prototipo retirado) **sin tocar**: mtimes
anteriores a este run.

---

## BLOQUE G — La divergencia deliberada de Docs, escrita como tal

Resolución 2 de la cabina, aplicada — **y con un ajuste medido que hay que registrar.**

El modo por defecto del renderer es `"newera"`, que filtra por `operator_review_status`. El emisor
**no emite ese campo**: significa "un run registró una revisión de operador", y ningún run la
registró. Rellenarlo metería una afirmación falsa en el dato. **El campo sigue ausente y lo que se
movió es el modo de apertura.** El modo `"newera"` sigue vivo y seleccionable en el código, y
muestra correctamente "No documents match this view." hasta que un run registre una revisión de
verdad.

**El modo elegido es `"all"`, no `"primary"`, y la razón se midió en pantalla:** el control de
visibilidad (New era / Primary KB / All registered) **fue retirado de esta UI aguas arriba** — está
en el código (`setDocsVisibilityMode`), pero ya no se pinta. El modo que se embarque es por tanto
el **único** al que el operador puede llegar. Con `"primary"` quedaban visibles 10 de 27 documentos
y **los 12 records de `context/aiw-console/records/` eran inalcanzables**, bajo una nota que invita
a "switch to All registered" — un control que no existe. `"all"` alcanza el registro completo y
sigue mostrando el tag de tier de cada entrada, así que la curaduría se ve en vez de convertirse en
un muro.

**Esto es una divergencia deliberada respecto del default de Cantu, no un descuido.** Queda
escrita aquí para que ninguna fase futura la lea como tal. Se deshace sola el día que un run
registre revisiones de operador de verdad: entonces `"newera"` tendrá contenido y podrá volver a
ser el default, si la cabina lo decide.

---

## BLOQUE H — Qué queda abierto, dicho como tal

- **Las 9 fuentes diferidas** siguen sin emisor y sin fase abierta. Degradan fail-soft: su panel
  queda vacío y su ausencia se nombra en Console Diagnostics. **No se stubbearon ni se simularon.**
- **`.project/git_history.json` no tiene emisor.** El history-builder sigue escribiendo en el
  `.aiw/` de este repo, que es área de entrega de AIW. History muestra su estado vacío. Mover el
  emisor —y decidir qué identificador declara, ya sin `jame.`— es trabajo aparte; el gate del
  renderer ya no lo bloquea (C.7).
- **§20 se cumple a medias, como en Cantu.** La ausencia de cada archivo se nombra **una por una**
  en Console Diagnostics, pero la superficie afectada (History, y los paneles de las 9 diferidas)
  muestra su estado vacío bajo el banner **agregado**. El contrato §20 exige el anuncio por archivo
  **en la superficie afectada** y adjudica explícitamente que el banner agregado no basta — pero
  también dice que ese requisito **recae sobre el shell del tramo 3**, no sobre esta fase, cuyo
  encargo pedía degradar "como en Cantu". Queda como pendiente nombrado de P3, no como deuda
  escondida.
- **Residuos de proyecto-origen que no son identidad por nombre:** la heurística de `operatorType`
  y el copy dentro de las dos funciones dormidas (Bloque C, última sección).
- **La consola renderiza UN proyecto.** No hay menú lateral, ni pantalla multiproyecto, ni lectura
  de N carpetas `.project/`. Es el shell (`O4.P3`).
- **`docs/snapshot-schema-v1.md` sigue mostrando `aiw-projector@0.1.0`** en dos ejemplos, y ahora
  la distancia es mayor (0.3.0). Documento de evidencia, fuera de alcance, no tocado.
- **`package.json` sigue describiendo el repo como "verbatim fork"**, falso desde el audit y ya
  registrado como no-claim. No se tocó.

### Para el shell (`O4.P3`), en concreto

1. **La base de rutas ya es una constante** (`PROJECT_BASE`): apuntar a la carpeta de OTRO proyecto
   es cambiar una línea, no una cirugía. Ese era el punto de §1.a.
2. **El vocabulario y la regla de derivación viajan en el envelope** (decisión del emisor, O4.P2):
   el shell puede leer N árboles sin conocer a ningún emisor por su nombre. La recomendación 2 del
   VEREDICTO —una sola implementación compartida de la derivación— sigue viva y sigue siendo suya.
3. **Los grupos de Docs ahora salen del dato** (C.5): un segundo proyecto con otros buckets
   renderiza sin tocar el código.
4. **Queda por hacer el anuncio de ausencia por superficie** (§20) y decidir si el shell impone su
   propio orden de grupos de Docs o lo pide en el índice de cada proyecto.

---

## Estado de completitud

- Bloque A (trasplante probado: CSS idéntico fuera de comentarios) — COMPLETO.
- Bloque B (capa de datos a `.project/`, base como constante) — COMPLETO.
- Bloque C (10 puntos de identidad, cada uno con su resolución; grep = 0) — COMPLETO.
- Bloque D (addendum emitido, 42/42, `.aiw/` intacto, números) — COMPLETO.
- Bloque E (read-only probado por método) — COMPLETO.
- Bloque F (QA visual contra la consola viva, con los dos viewports igualados) — COMPLETO.
- Bloque G (divergencia deliberada de Docs, con el ajuste medido) — COMPLETO.
- Bloque H (lo abierto) — COMPLETO.

Ningún bloque quedó "NO ALCANZADO".
