# ACABADO VISUAL de Docs y EMISOR de `git_history` — cierre del port de la consola

> Continuación de `O4.P11` (`RUN-CONSOLE-PORT-IDENTICO-001`), sobre el QA visual del operador.
> Documenta **qué se retiró de Docs y por qué**, **el identificador nuevo de `git_history` con su
> razón**, **cómo quedó el botón *Edit roadmap*** y **qué sigue abierto**.
>
> Fecha: 2026-07-24. **No se ejecutó ningún comando de git que escriba** — ni `init`, ni `commit`,
> ni `branch`, ni `checkout`, en este repo ni en ninguno temporal. Sí se ejecutó git en SOLO
> LECTURA (`for-each-ref`, `rev-parse`, `branch --show-current`, `log`), que es de dónde sale el
> dato que la pestaña History pinta: no hay forma de emitir la historia del repo sin leerla.
> No se tocó el roadmap canónico, `DECISIONES.md`, `CONTRATO.md` ni ningún record existente.
> **`cantu-studio` no fue modificado** (md5 y mtime intactos, Bloque E.4): se leyó como referencia.
> **El `.aiw/` de este repo sigue NO EXISTIENDO** — el port nunca lo creó y este trabajo tampoco
> (Bloque E.3); no hay md5 que comparar porque no hay archivo.
>
> **Archivos escritos por este trabajo, y ninguno más:**
> `project-console/assets/project-console.js` · `project-console/assets/project-console.css` ·
> `project-console/index.html` · `project-console/README.md` ·
> `tools/projector/project.mjs` (aditivo: el emisor de `git_history`) ·
> `tests/git-history-emitted.test.mjs` (nuevo) · los **seis** archivos emitidos bajo `.project/` ·
> este record.
> **No se tocó** el fork D-035 (`docs/project-console/`), el prototipo retirado (`console/`) ni el
> tooling viejo (`tools/project-console/`) — incluido su `build-git-history-snapshot.mjs`, que
> sigue escribiendo lo que escribía, en donde lo escribía.

---

## BLOQUE A — Docs: qué se retiró, y por qué NO es revertir el Bloque G

Cuatro elementos, todos del renderer trasplantado, todos **invisibles en Cantu** y destapados aquí:

| Retirado | Dónde vivía | Por qué |
|---|---|---|
| Toggle *By category* / *By retention class* | `renderDocsNav`, bloque `docs-mode-toggle` | Control **muerto**: agrupa por `retention_class`, campo que el `docs_index` de este proyecto no lleva. Los 27 documentos indexados al medir caían en un único grupo `unclassified`. |
| La nota explicativa del toggle | `groupNote` | Explicaba una agrupación que no puede ocurrir. |
| Etiqueta `retention_class` por documento (`UNCLASSIFIED`) | `docRetentionTag` en `renderNavItem` | 27 de 27 filas decían lo mismo: que este proyecto no tiene esa política. |
| Etiqueta de *tier* por documento | `docs-tier-tag` en `renderNavItem` | Es una pista de **visibilidad de navegación**, y sólo se pintaba en el modo en que este port abre; decoraba toda fila no-primaria (18 de 28 medidas) con una palabra que el encabezado de grupo ya dice. |

**Por qué existían y no se veían.** Las cuatro se pintan sólo cuando el modo de Docs **no** es
`newera`, y `newera` es el modo de apertura de Cantu (`docsVisibilityMode = "newera"`,
`CANTU-PCJS:2031`; el `renderNavItem` de allá retorna en su rama `isNewEra` **antes** de las dos
etiquetas, `CANTU-PCJS:2470-2475`, y el bloque del toggle es `isNewEra ? "" : …`,
`CANTU-PCJS:2519`). El Bloque G del port abrió en `"all"`, y eso las destapó.

**Esto NO revierte el Bloque G.** El modo sigue siendo `"all"`, por la razón que el port ya midió y
que no cambió: `newera` filtra por `operator_review_status`, ningún run lo registró en este
proyecto, y **escribirlo está prohibido** — significaría afirmar una revisión de operador que no
ocurrió. Lo que se movió no es el modo: son los controles que el modo dejó a la vista.

**El criterio es el del propio port.** `O4.P11` vació tres tablas horneadas
(`DOCS_NEW_ERA_CATEGORY_BY_PATH`, `DOCS_GROUP_ORDER`, `DOCS_GROUP_ALIASES`) porque eran identidad
del proyecto origen: sólo podían ser ciertas para un proyecto. `retention_class` es lo mismo un
nivel más allá — es metadato de la **política de retención del proyecto origen** (sus clases D2/D3),
sin fuente de datos aquí. Retirar un control sin dato detrás no amputa una función: no hay función
que amputar. Nada se escribió en `docs_index`, y ningún campo se inventó para llenar el hueco.

**Lo que Docs muestra ahora:** títulos limpios, agrupados por el `ia_bucket` del propio dato — los
diez grupos `Console · Context · Context/AIW · Context/AIW-Console · Context/AIW-Console/Records ·
Context/Cantu-Studio · Context/Handoffs · Docs · Project-Console · Root`. Verificado en el DOM
(Bloque F).

---

## BLOQUE B — Código muerto: qué se borró, y qué se dejó porque sigue referenciado

**Borrado, con cero referencias comprobadas ANTES de borrar** (grep sobre `.js`, `.css`, `.html`):

- JS: `docsGroupMode`, `DOCS_RETENTION_UNCLASSIFIED`, `DOCS_RETENTION_ORDER`, `docRetentionClass`,
  `docRetentionTone` (ya estaba muerto antes de este trabajo), `docRetentionTag`,
  `buildDocsRetentionTree`, `setDocsGroupMode`, `docNavTierMeta`, `DOCS_NAV_TIER_META`, los locales
  `classifiedCount` / `retentionSummary` / `groupNote`, y el listener `[data-docs-group-mode]`.
- CSS: `.docs-ret-tag`, `.docs-ret-canonical`, `.docs-ret-reference`, `.docs-ret-evidence`,
  `.docs-ret-historical_run_record`, `.docs-ret-proposal`, `.docs-ret-superseded`,
  `.docs-ret-duplicate_candidate`, `.docs-ret-orphaned_candidate`, `.docs-ret-unclassified`,
  `.docs-tier-tag`, `.docs-tier-secondary`, `.docs-tier-advanced`, `.docs-tier-proposal`,
  `.docs-tier-evidence`, `.docs-tier-history`.

**Dejado, y por qué** — la regla fue: si algo sigue referenciado, se queda y se dice.

| Se queda | Sigue referenciado por |
|---|---|
| `deriveDocNavTier`, `DOCS_NAV_TIERS` | `isDefaultVisibleDoc`, que decide el modo *Primary KB*. El tier **se sigue derivando**; sólo dejó de pintarse. |
| `.docs-mode-toggle`, `.docs-mode-btn`, `.docs-mode-btn:hover`, `.docs-mode-btn.active` | El listener `[data-docs-mode]` del control de visibilidad retirado aguas arriba, que el port conservó a propósito. Sus estilos no quedan huérfanos. |
| `.docs-nav-group-count` | El árbol `newera` y los subgrupos Web/Slides de COMPONENTS. |
| `.docs-nav-summary`, `.docs-nav-summary strong`, `.docs-nav-mode-note-active` | Ya estaban inertes **antes** de este trabajo (no los dejó muertos este cambio) y no son de retention. Se anotan aquí como pendiente conocido, no se tocan: limpiarlos es otro permiso. |

**Consecuencia sobre una prueba del port.** `O4.P11` pudo afirmar que el CSS era **byte-idéntico a
Cantu quitando comentarios** (101 345 bytes). **Eso ya no es cierto y no se va a volver a afirmar:**
este trabajo borró 16 reglas reales. La afirmación correcta hoy es la de arriba — 16 reglas menos,
cada una nombrada, cada una sin referencia.

---

## BLOQUE C — El botón *Edit roadmap*: oculto, no borrado

`index.html:57` lleva ahora el atributo `hidden`. Un botón cuya única función posible es explicar
por qué no funciona estorba en una barra de herramientas: esta consola no trae ruta de escritura
(`PATHS.roadmapEdit === null`), así que `v3ToggleEditMode()` sólo puede imprimir su negativa honesta.

**Se conservan en código, intactos:** el propio elemento con su `id` y su `data-`, el `<span
id="roadmap-edit-hint">` donde se imprime la negativa, el call site (`setupRoadmapEditMode`), el
sondeo del endpoint (`v3ProbeEndpoint`), el texto de la negativa, y todo el modal de edición.
**Restaurarlo el día que exista ruta de escritura es borrar un atributo.** El ocultamiento lo
aplica la regla `[hidden] { display: none !important }` que el CSS de Cantu ya traía
(`project-console.css:97`), que gana a `.btn { display: inline-flex }`; no se añadió CSS.

Verificado en el DOM: el botón existe, `hidden === true`, `getComputedStyle().display === "none"`.

---

## BLOQUE D — EMISOR de `.project/git_history.json`

### D.1 Dónde vive, y por qué ahí

En **`tools/projector/project.mjs`**, dentro del modo de root 2, no en el history-builder viejo.
Razón: el builder de `tools/project-console/` está **fuera de alcance** de este trabajo y escribe en
el área de entrega antigua; el proyector es donde ya viven la constante de ruta base (`PROJECT_DIR`,
§1.a), la guarda de destino (`resolveInsideProject`) y el escritor atómico. Un emisor, una carpeta,
una guarda. El builder viejo **no fue modificado**.

`PROJECTOR_VERSION` sube `0.3.0 → 0.4.0` (§6: la versión se mueve cuando se mueve el comportamiento;
un emisor que escribe seis archivos no es el que escribía cinco).

### D.2 El identificador nuevo, y su razón

**`git_history_v1`**, transportado en la clave `model`.

El artefacto del builder viejo se identificaba con un prefijo de proveedor que nombraba al proyecto
que lo emitió primero, más un nivel `snapshot`. §19 marcó las dos cosas explícitamente y dejó el
rename al emisor. Tres cortes, cada uno ya adjudicado en otra parte del contrato:

1. **El prefijo de proveedor se va** — §1 / §10.c: un identificador nombra su **contenido**, no a
   quien lo emitió primero. Es el mismo corte que §10.c ya hizo sobre el identificador del roadmap.
2. **El nivel `snapshot` se va** — §19 y §1.b: bajo `.project/` **todo** es derivado y regenerable,
   así que decir "snapshot" es tan redundante como era decir `views/`.
3. **La versión reinicia en `v1`** — §4 / §10.c: cuenta el linaje de ESTE contrato, no la historia
   interna del nombre que se abandona.

Resultado: el nombre es **el nombre del propio artefacto más la versión del contrato, y nada más**.
El test lo afirma como derivación, no como literal (`GIT_HISTORY_MODEL === basename(ruta) + "_v1"`),
de modo que cualquier prefijo futuro rompe la igualdad sin que el test tenga que nombrar proyectos.

La clave portadora es `model`, la misma que usa `.project/roadmap.json` para la misma pregunta
("¿qué modelo transporta este archivo?"), así el `schema_version` **entero** del envelope sigue
significando sólo lo que §4 dice.

**No hubo que tocar al lector:** su gate es por FORMA (lista de ramas + lista de commits), no por
la cadena del schema — eso lo resolvió el port en su Bloque C.7. Por eso el rename fue barato.

### D.3 La forma emitida

Envelope estándar de la carpeta (§4, §5, §6) + `model` + `head` + `current_branch` + `branches` +
`commit_total` + `commits[]`. Cada commit: `branch`, `sha`, `full_sha`, `date`, `parents`,
`subject`, `body`, `is_merge`, y `run_id` **sólo cuando hay asociación verificada**.

- **`sources`** declara los dos insumos que son archivos en disco: `.git` (el repositorio cuya
  historia es) y `roadmap/roadmap.json` (leído sólo para verificar asociaciones). La frescura real
  del repositorio la lleva `head`: un sha cambia exactamente cuando cambia la historia, un `mtime`
  no.
- **El nombre del autor NO se emite.** El builder viejo pedía `%an`; ninguna superficie del
  consumidor lo muestra, y un artefacto derivado y republicado no debería cargar el nombre de una
  persona que no usa. `parents` sí se emite aunque el consumidor tampoco lo lea: es el insumo del
  que se deriva `is_merge`, y este emisor declara el insumo de cada derivación que hace.
- **Todas las ramas locales se emiten.** Esconder una rama es política de visualización y es del
  lector, que ya filtra las suyas (`historyVisibleBranches`). Un emisor que descarta dato miente.
  Orden: `main` primero (el lector la tiñe como tronco), luego orden de unidades de código — no
  `localeCompare`, para que el orden emitido no dependa de la máquina.
- **`current_branch` se OMITE** con HEAD desprendido, en vez de emitirse vacío: el lector elige
  entonces su propio default en vez de recibir un nombre de rama que no es la actual.

### D.4 La asociación run↔commit: explícita, verificada, o ausente

`deriveCommitRunId` busca en el mensaje **cada `run_id` que declara el roadmap del propio proyecto**
y emite asociación sólo si el mensaje nombra **exactamente uno** distinto. Nunca se infiere de
orden, rutas tocadas, fechas ni redacción; nunca se emite un run que el roadmap no declare; y
cuando no hay nada que afirmar, **la clave se OMITE** (no `null`).

**Ningún prefijo de run_id está horneado.** El vocabulario sale del dato (`roadmap/roadmap.json`),
no del código — importante porque los `run_id` de este proyecto sí llevan prefijos de
**procedencia** (§10.d: el prefijo nombra al proyecto que CREÓ el run, no al que lo aloja), y una
regex con esos prefijos dentro sería exactamente la identidad horneada que el port quitó.

**Medido en este repo: 0 de 35 commits nombran algún `run_id` del roadmap.** Las asociaciones están
vacías, y honestamente: la columna de enlace a run queda en blanco, que es el estado vacío que el
prototipo ya definía. No se rellenó ninguna.

### D.5 Fail-soft, guarda, atomicidad

- **Fail-soft (§18/§20).** `buildGitHistory` devuelve `null` — y el archivo simplemente no se
  escribe — si: no hay binario de git; el root **no es la raíz de su propio work tree**; el repo no
  tiene ramas locales; o cualquier lectura falla. Un root sin repositorio emite los mismos cinco
  archivos de antes. Nada parcial, nada inventado.
- **Por qué la raíz propia y no cualquier repo padre.** Publicar los commits de un monorepo padre
  bajo el `.project/` de este proyecto atribuiría a este proyecto el trabajo de otro. §20 prefiere
  una ausencia anunciada a una afirmación de más.
- **Guarda de ruta:** la de siempre, `resolveInsideProject`. Test: la ruta resuelve dentro de
  `.project/`, y `..` o `.aiw/…` lanzan.
- **Atomicidad y repetibilidad:** el mismo `writeJsonAtomic` (temp + rename) que los otros cinco.
  Con el mismo reloj inyectado, dos emisiones dan bytes idénticos (verificado). No queda ningún
  `.tmp`.

---

## BLOQUE E — Verificaciones

### E.1 Suite del proyector: VERDE

`node --test` → **49 tests, 49 pass, 0 fail, 0 skipped** (eran 42 antes; +7 nuevos en
`tests/git-history-emitted.test.mjs`). Los nuevos cubren: el identificador como derivación; la
regla de asociación caso por caso (mención única verificada, dos runs distintos → nada, run
desconocido → nada, coincidencia parcial → nada, puntuación de frase alrededor de una mención real
→ sí); el fail-soft de un root sin repositorio propio; la guarda de ruta; el envelope §4/§5/§6/§7; y
—contra el repositorio real, en solo lectura— que el artefacto es exactamente lo que
`renderCommitHistory` lee y que toda asociación emitida resuelve en el roadmap.

Un test encontró un defecto real mientras se escribía: la primera versión de la derivación
tokenizaba con un carácter de clase que incluía el punto, así que un `run_id` **al final de una
frase** no se reconocía. Se reescribió a búsqueda por límite de token.

### E.2 La proyección de AIW por el camino viejo: byte-idéntica salvo `generated_from`

Comparados los dos artefactos del modo 1 (`.aiw/views/project_console.snapshot.json` y
`.aiw/views/roadmap.json`) emitidos por el proyector **anterior** y por el **actual**, sobre copias
aisladas del root de AIW, con el mismo reloj inyectado:

```
snapshot: 4037 bytes → 4037 bytes; 1 línea distinta: generated_from 0.3.0 → 0.4.0
roadmap: 28844 bytes → 28844 bytes; 1 línea distinta: generated_from 0.3.0 → 0.4.0
```

Nada más difiere, en ninguno de los dos archivos.

### E.3 El `.aiw/` de `aiw-console`

**No existe, ni antes ni después.** El port nunca lo creó y este trabajo tampoco: el modo 2 escribe
sólo bajo `.project/`, tras su guarda. No hay md5 ni mtime que comparar porque no hay archivo; lo
verificable —y verificado— es que sigue ausente.

### E.4 `cantu-studio`: no modificado

md5 y mtime idénticos antes y después. Se leyó como referencia:
`docs/project-console/assets/project-console.css` → `a0bf2e15…af165b`,
`docs/project-console/assets/project-console.js` → `4000bebd…528860`, ambos con mtime
`2026-07-22 19:25:10`.

### E.5 Cero identidad del proyecto origen en lo tocado

`grep -i "jame\|cantu"` sobre cada archivo escrito:

| Archivo | Hits |
|---|---|
| `project-console/assets/project-console.js` | 0 |
| `project-console/assets/project-console.css` | 0 |
| `project-console/index.html` | 0 |
| `tools/projector/project.mjs` | 0 |
| `tests/git-history-emitted.test.mjs` | 0 |
| `.project/git_history.json` | **4**, y son el dato |

Los 4 son **mensajes de commit reales de este repositorio** (`"docs: D-045 el validador de Cantu…"`,
`"chore(context): adoptar CANTU_STUDIO_CONTEXT.md huerfano…"`, `"aiw-console: verbatim fork of JAME
project console…"`, y un cuerpo). Editarlos sería falsificar la historia que el archivo transporta.
La razón del rename del identificador se escribió **aquí** y no en el código precisamente para no
tener que teclear el nombre viejo dentro del emisor.

`project-console/README.md` sí nombra `cantu-studio`: en líneas **preexistentes** que documentan la
procedencia del port, que es su función. Este trabajo cambió en ese archivo sólo la fila de
`git_history` (pasó de "not emitted yet" a "emitted") y la sección de divergencias deliberadas, que
pasó de dos a tres.

### E.6 Console Diagnostics: 10 → 9 fallos

Leído del DOM en la consola servida:

- **LOADED (6, era 5):** `.project/snapshot.json`, `roadmap.json`, `docs_index.json`,
  `guardrails.json`, `no_claims.json`, **`git_history.json`**.
- **FAILED (9, eran 10):** las nueve fuentes diferidas — `project.json`, `state/project_status.json`,
  `state/component_status.json`, `state/events.jsonl`, `ledgers/change_ledger.jsonl`,
  `ledgers/git_provenance.jsonl`, `ledgers/human_qa.jsonl`, `ledgers/ai_reviews.jsonl`,
  `guardrails/project_memory.jsonl`. Ninguna se emitió ni se stubbeó.

**El banner agregado sigue apareciendo, y así debe ser.** Es el fail-soft correcto de Cantu ante
fuentes ausentes, y §20 EXIGE anunciar la ausencia. Se encogerá cuando las fuentes tengan emisor;
este trabajo le quitó una.

---

## BLOQUE F — QA visual

**Arranque:** `node project-console/serve.mjs`, **puerto 8788** (`PC_PORT` lo cambia).
URL: `http://127.0.0.1:8788/project-console/index.html`.

No se pudo capturar imagen: el panel del navegador de esta sesión no estaba compositando cuadros y
las capturas expiraron. La verificación se hizo **contra el DOM renderizado**, que para lo que aquí
se afirma es evidencia más fuerte que un píxel — dice cuántos nodos de cada clase existen, no cómo
se ven.

**Docs, medido en el DOM:** `0` nodos `.docs-ret-tag`, `0` nodos `.docs-tier-tag`, `0` nodos
`[data-docs-group-mode]`, `0` nodos `.docs-mode-toggle`, `0` notas de modo. Los diez grupos por
`ia_bucket`, con los 28 documentos del índice (27 al medir Docs la primera vez; este record es el
28.º). Una fila, entera:

```html
<button class="docs-nav-item " type="button" data-doc-index="1">
  <span class="docs-nav-item-label">Prototipo de la consola global</span>
</button>
```

**La comparación contra Cantu.** En su modo de apertura (`newera`), el `renderNavItem` de Cantu
retorna exactamente esa misma cadena (`CANTU-PCJS:2475`) y su bloque de toggle se evalúa a `""`
(`CANTU-PCJS:2519`). El contenedor de controles —`docs-nav-controls` > `docs-nav-head` con el título
"Documentation" y *Collapse all*— es el mismo. Es decir: **el markup de fila y el de controles son
ahora los mismos que produce Cantu**.

**Las dos diferencias que quedan en Docs, y ninguna es un control huérfano:**

1. **El vocabulario de grupos.** Cantu agrupa por categorías Blueprint (mayúsculas, con subgrupos
   Web/Slides en COMPONENTS) porque está en `newera`; aquí los grupos salen del `ia_bucket` del dato.
   Es la consecuencia directa del Bloque G y de que las tablas horneadas viajaran vacías. No se
   toca.
2. **El contador `(n)` por grupo.** Cantu lo pinta (su condición es `isNewEra`); aquí no aparece en
   modo `"all"`. **Es un AÑADIDO, no un residuo**, así que no entra en un encargo cuyo mandato es
   retirar lo que no tiene dato detrás. Queda anotado para `O4.P8`.

**History pinta.** 35 commits reales, en `Today` (9) / `Yesterday` (13) / `Earlier` (13), una
píldora de rama (`main`), 4 puntos de merge, sin banner de "Commit history unavailable", 0 enlaces
a run (correcto: 0 commits nombran un run).

**Sobre el "~42 medidos" del encargo: hoy son 35.** Medido de primera mano con
`git log main --pretty=oneline | wc -l` → `35`, y `git rev-list --count --all` → `35`; hay **una
sola** rama local (`main`), así que no hay commits duplicados por rama que puedan sumar más. No se
ajustó nada para llegar a 42: el archivo dice `commit_total: 35` porque el repo tiene 35. De dónde
salía el 42 no se pudo reconstruir y no se especula.

---

## BLOQUE G — Qué sigue abierto

1. **Las nueve fuentes diferidas.** Sin emisor, y por eso en rojo en Console Diagnostics y por eso
   el banner agregado sigue en pantalla. Cada una entra por la puerta de §18 el día que tenga
   emisor. No se stubbean.
2. **El anuncio por archivo ausente (§20) no está.** Hoy hay banner agregado + detalle en
   Diagnostics, que es lo que Cantu hace y lo que §20 declara insuficiente: la degradación se
   anuncia **en la superficie afectada, nombrando el archivo**. §20 pone ese requisito sobre el
   **shell del tramo 3** (`O4.P3`), no sobre el emisor ni sobre este port.
3. **`operator_review_status` y el modo `newera`.** Siguen vacíos y siguen prohibidos de rellenar.
   Si algún día un run registra revisiones de operador, el modo de apertura de Docs vuelve a ser
   una decisión con dato detrás.
4. **El contador `(n)` por grupo en Docs** (Bloque F, diferencia 2) — pulido, `O4.P8`.
5. **Reglas CSS inertes preexistentes** `.docs-nav-summary`, `.docs-nav-summary strong`,
   `.docs-nav-mode-note-active` (Bloque B). No las dejó muertas este cambio; limpiarlas es otro
   permiso.
6. **El history-builder viejo** (`tools/project-console/build-git-history-snapshot.mjs`) sigue en
   pie, escribiendo en `.aiw/views/` con su identificador con prefijo. Conviven dos emisores de
   historia con dos identificadores, igual que conviven dos roadmaps (§10.c): es la convivencia
   aditiva de D-036, y se resuelve en el corte del tramo 7 (`O4.P7`), no antes.
7. **La asociación run↔commit no tiene un solo ejemplar.** El mecanismo existe y está probado, pero
   0 de 35 commits nombran un `run_id`. La primera vez que un mensaje de commit nombre uno, el
   enlace a run aparecerá sin tocar código — y esa será la primera prueba con dato real.
