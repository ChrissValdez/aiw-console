# RE-EMISIÓN — el botón que pone `.project/` al día con su canónico (`O4.P14`)

> Entregable de conocimiento de la fase `O4.P14`. Documenta **por qué un botón y no un
> auto-refresh**, **la tercera ruta de escritura y sus guardas**, **la matriz read-only nueva
> (medida, no recordada)**, **la verificación sin daño con md5**, **una medición de fila que
> cambió el diseño del acuse**, **cinco pins que llegaron rojos y por qué se movieron** y **qué
> queda abierto**.
>
> Fecha: 2026-07-28. **No se ejecutó git en ninguna forma que escriba**: ni `add`, ni `commit`,
> ni `push`, ni `checkout`, ni `stash`. Git se leyó solo donde el emisor de historia ya lo leía
> (`for-each-ref`, `rev-parse`, `branch --show-current`, `log`), porque `git_history.json` es uno
> de los seis artefactos que esta ruta re-emite. No se tocó el roadmap de fases, `DECISIONES.md`,
> `CONTRATO.md` ni ningún record existente. El fork D-035 (`docs/project-console/`), el prototipo
> retirado (`console/`) y el tooling viejo (`tools/project-console/`) no fueron leídos como
> fuente ni tocados. `cantu-studio` fuera de su `.project/`: intacto. El kernel `aiw`: intacto.
>
> **Archivos escritos por esta fase, y ninguno más:**
> `project-console/serve.mjs` (la ruta, la guarda espejo, el pre-check) ·
> `project-console/index.html` (el botón y su acuse, dentro de la fila que ya existía) ·
> `project-console/assets/project-console.js` (la ruta en `PATHS`, la sección de re-emisión, el
> reset) · `project-console/assets/project-console.css` (el acuse) ·
> `project-console/README.md` (tres afirmaciones que esta fase dejaba falsas) ·
> `tests/serve-project-emit.test.mjs` (nuevo) · `tests/serve-write-routes.test.mjs` (la matriz) ·
> `tests/roadmap-lanes.test.mjs` · `tests/roadmap-lane-numbering.test.mjs` ·
> `tests/shell-two-real-projects.test.mjs` (pins 53→71, ver Bloque F) · este record.
> **Los dos canónicos reales quedaron byte-idénticos** (md5 en Bloque D). Los `.project/` de este
> repo y de `cantu-studio` se re-emitieron — es la función de la ruta y lo que se estaba probando.

---

## BLOQUE A — El problema: una proyección que no tiene cómo alcanzar a su canónico

`.project/` es una PROYECCIÓN. El canónico vive en otra parte (`roadmap/roadmap.json` o
`.aiw/roadmap/roadmap.json`, según el layout que reclame el root) y la consola no lo posee: solo
lo lee. Hasta esta fase existían exactamente dos formas de que la proyección se re-emitiera:

1. **Automática, después de un confirm de edición** — `handleRoadmapEdit` re-emite al terminar,
   para que lo que la consola lea a continuación coincida con lo que acaba de escribir.
2. **Manual, para UN artefacto** — `POST …/history/sync`, el botón *Sync History*.

Ninguna de las dos cubre el caso normal bajo la metodología nueva: **el canónico lo edita otro**.
Bajo carriles paralelos los encargos NO re-emiten por diseño —dos talleres escribiendo el mismo
`.project/` se pisarían—, así que el canónico avanza y la proyección se queda quieta. No es una
excepción: es la conducta esperada de cada encargo paralelo.

**El caso real que lo motivó.** La partición implementación/documentación llevó el roadmap de
`cantu-studio` de **53 a 71 runs**. La consola siguió mostrando 53, con los números de run
corridos, y no había forma de pedirle que se pusiera al día. El operador tuvo que **INVENTAR una
edición** —poner un espacio en un título y quitarlo— para provocar la re-emisión que sigue a un
confirm. Ese rodeo es lo que esta fase borra.

## BLOQUE B — Botón, NO auto-refresh: la decisión y su razón

La cabina decidió botón. La razón no es de gusto sino de propiedad de archivos:

- **Un auto-refresh haría que `.project/` cambiara bajo los pies del operador.** Un watcher sobre
  el canónico, o un polling, reescribiría seis archivos versionados sin que él actuara. Su árbol
  de trabajo de Git aparecería sucio por una decisión que no tomó, y tendría que averiguar quién
  lo ensució. Ya ocurre en pequeño con el auto-sync de historia al abrir; multiplicarlo por seis
  archivos y por cada cambio del canónico es exactamente la conducta que no se quiere.
- **Escribir es un acto, y los actos se piden.** La consola escribe `.project/` cuando el
  operador hace clic y en ningún otro momento. No hay temporizador, ni watcher, ni polling, ni
  tarea programada en ninguna parte de esta fase.
- **Explícito y visible.** El botón dice qué va a hacer antes (`Re-emit .project/`) y qué hizo
  después, con números. Un refresco silencioso no puede hacer ni lo uno ni lo otro.
- **Y no commitea.** La re-emisión deja el diff listo; commitearlo es del operador. El acuse lo
  dice (`Not committed: review and commit yourself.`) y la respuesta del server lo declara como
  dato (`committed: false`), para que nadie tenga que deducirlo.

## BLOQUE C — La tercera ruta, sus guardas y su orden de compuertas

`POST /projects/<key>/__project-console/project/emit`

Reutiliza la forma de `history/sync`, que es el precedente que el encargo señaló: misma
composición de URL desde `REPO_BASE` en el cliente (§1.a — ninguna ruta fuera de la base), mismo
embudo de resolución (`resolveEditableProject`: registrado → layout → canónico guardado), mismas
guardas de localidad (peer loopback + Origin localhost), mismo estilo de respuesta JSON con
`reason` nombrado, mismo estilo de acuse en pantalla. La diferencia es el alcance: donde `sync`
re-emite un artefacto derivado, `emit` re-emite los seis, por el emisor propio del proyector
(`writeProjectFolder`) — mismo constructor, misma guarda, mismas escrituras atómicas que la fase
de emisión usa desde siempre.

**El orden de las compuertas es el contrato.** Cada una rechaza sin abrir un archivo:

| # | Compuerta | Rechazo |
|---|---|---|
| 1 | método | `405 method_not_allowed` (solo POST) |
| 2 | localidad | `403 forbidden_nonlocal` / `403 forbidden_origin` |
| 3 | proyecto | `404 unknown_project` · `404 project_not_editable_no_layout` (+ `candidates`) |
| 4 | frontera | `403 write_destination_out_of_bounds` (+ `detail`), sobre los SEIS destinos |
| 5 | canónico | `409 canonical_missing` / `canonical_unparsable` / `canonical_not_a_roadmap_tree` · `422 canonical_invariants_failed` — todos con `file` |
| 6 | cerrojo | `409 emit_in_progress` |
| 7 | escritura | `200` con números, o `500 emit_failed` |

**La guarda de frontera es un ESPEJO, y eso es lo nuevo.** Ya existía
`resolveCanonicalWritePath`: dentro del root registrado, nunca `.git`, y **nunca dentro** de
`.project/` (territorio del emisor). Esta fase añade `resolveEmissionWritePath`: dentro del root
registrado, nunca `.git`, y **solo dentro** de `.project/`. Las dos particionan el root entre
ellas: lo que una acepta, la otra rechaza. Es la propiedad que impide que una edición de roadmap
aterrice donde la próxima emisión la borraría, y que una emisión aterrice sobre un canónico que
luego leería como su propia fuente. Está probada como propiedad, no como par de casos
(`the two guards are MIRROR IMAGES…`), y se aplica a los seis destinos ANTES de abrir nada.

**El pre-check del canónico es lo que impide una emisión a medias.** Antes de que el emisor abra
un solo archivo, el canónico se lee, se parsea, se pasa por la compuerta de forma
(`hasRoadmapTreeShape`) y por las invariantes del motor (`checkInvariants`, con las dependencias
externas resueltas contra el registro, igual que la ruta de edición). Si falla cualquiera de las
cuatro, **no se emite nada** y el motivo viaja con el ARCHIVO nombrado. La proyección conserva el
estado coherente que ya tenía en vez de quedar mezclada.

Detalle medido: la dependencia externa importa de verdad. El canónico de `cantu-studio` tiene un
`depends_on` que resuelve en el árbol de ESTE repo; con `externalRunIds` vacío el pre-check lo
declara colgante y **rechazaría la re-emisión del proyecto que motivó la fase**. Compuesto desde
el registro (`externalRunIdsFor`, 42 ids), pasa limpio. La ruta de edición ya lo hacía; esta lo
hereda por la misma razón (§10.d).

**Un rechazo nombra el archivo incluso cuando el server no tiene uno.** `detectRootLayout`
responde un único `null`: prueba el roadmap de cada layout conocido y devuelve el primero que
parsea y conforma. Un rechazo que solo dijera "sin layout" deja al operador adivinando qué
archivo se buscó. `diagnoseCanonicalCandidates` recorre la misma lista y devuelve un veredicto
por candidato, así que `aiw` —el caso que el operador se encuentra hoy— responde en pantalla:

> Refused — no canonical roadmap claims this project: `roadmap/roadmap.json` (missing),
> `.aiw/roadmap/roadmap.json` (missing). Nothing was written.

## BLOQUE C.2 — La matriz read-only, MEDIDA

Exactamente **TRES** rutas aceptan POST; **CERO** aceptan PUT/PATCH/DELETE. La tabla siguiente es
la transcripción del diagnóstico que imprime el test `MATRIX: exactly THREE routes accept POST…`
corriendo contra el server real (no una lista mantenida a mano, que es como se desincroniza):

| Ruta / camino | GET | POST | PUT · PATCH · DELETE |
|---|---|---|---|
| `…/__project-console/roadmap/edit` | 405 `method_not_allowed` (probe) | **ruteado — escritura 1** | 405 `method_not_allowed` |
| `…/__project-console/history/sync` | 405 `method_not_allowed` | **ruteado — escritura 2** | 405 `method_not_allowed` |
| `…/__project-console/project/emit` | 405 `method_not_allowed` | **ruteado — escritura 3** | 405 `method_not_allowed` |
| `/project-console/index.html` | 200 | 405 `read_only_console` | 405 `read_only_console` |
| `/project-console/projects.json` (registro) | 200 | 405 `read_only_console` | 405 `read_only_console` |
| `/projects/<k>/.project/snapshot.json` | 200 | 405 `read_only_console` | 405 `read_only_console` |
| `/projects/<k>/roadmap/roadmap.json` (canónico) | 200 | 405 `read_only_console` | 405 `read_only_console` |
| `…/__project-console/roadmap` (prefijo de ruta) | 404 | 405 `read_only_console` | 405 `read_only_console` |
| `…/__project-console/project` (prefijo de ruta) | 404 | 405 `read_only_console` | 405 `read_only_console` |
| `…/__project-console/project/emit/x` (ruta + segmento) | 404 | 405 `read_only_console` | 405 `read_only_console` |
| `/no/existe` | 404 | 405 `read_only_console` | 405 `read_only_console` |
| `.git` (ambos namespaces) | **403** | **403** | **403** |
| Traversal crudo, ambos namespaces | **403** | 405 (rechazado como método, nunca resuelto como archivo) | 405 |

Los tres near-miss de la tabla son deliberados: un prefijo de ruta y una ruta con un segmento de
más NO son rutas de escritura (`matchWriteRoute` compara el sufijo completo), así que caen en la
compuerta read-only general. Las rutas se interceptan ANTES de la resolución estática, de modo
que un archivo real llamado `__project-console/…` dentro de un proyecto queda sombreado.

## BLOQUE D — Verificación sin daño: los números

### D.1 Los canónicos reales, no tocados

La ruta re-emite artefactos DERIVADOS: eso es su función y es lo que se probó contra los dos
proyectos reales, por HTTP y desde el navegador. Los CANÓNICOS no se abren para escribir en
ningún camino de esta fase:

| Canónico | md5 ANTES | md5 DESPUÉS |
|---|---|---|
| `aiw-console/roadmap/roadmap.json` (repo_root, LF) | `58a726908ece58b59922ee0232b1eb15` | **idéntico** |
| `cantu-studio/.aiw/roadmap/roadmap.json` (project_local_aiw, CRLF) | `6d6951370dc581cc5a21cf7cd3ce287f` | **idéntico** |

Cero `.tmp` residuales en cualquiera de los dos repos al terminar (buscado en todo el árbol,
excluyendo `.git/` y `node_modules/`). La emisión es temp+rename por artefacto, bajo cerrojo:
dos emisiones concurrentes del MISMO proyecto correrían sobre los mismos seis nombres temporales,
así que se serializan (`emit_in_progress`).

### D.2 QA en navegador (DOM real, 1280×720; el panel no compositaba captura — la misma
limitación que documentaron ACABADO F, O4.P3 y O4.P12)

- **`cantu-studio`** → Roadmap → **Re-emit `.project/`** → acuse `6 artifacts · 71 runs`
  (`is-ok`), título completo `Re-emitted 6 artifacts from .aiw/roadmap/roadmap.json — 71 runs,
  7 objectives. Not committed: review and commit yourself.` Cola: 71 runs. Sin recargar, sin
  reiniciar el server.
- **`aiw-console`** → ídem → `6 artifacts · 42 runs`; cola 42.
- **`aiw` (kernel, sin layout)** → rechazo nombrado en pantalla con LOS DOS archivos candidatos y
  su veredicto (`missing`), como ya hacen edición y sync.
- **El desfase, provocado a propósito** (fixture bajo `PC_REGISTRY`, ningún canónico real
  tocado): canónico a 4 runs → emitir → cola 4. Canónico crece a **9 runs sin re-emitir** (lo que
  hace un encargo paralelo) → recargar → **la cola sigue mostrando 4**. Un clic → acuse
  `3 artifacts · 9 runs` → **cola 9 y árbol 9**. El rodeo de la edición inventada ya no hace falta.
- **Canónico roto a propósito** (run 1 depende de run 9): rechazo `Refused — the canonical
  roadmap/roadmap.json fails the roadmap invariants (2 errors). Nothing was written.`, con los
  dos errores del motor verbatim en el título. **Los tres artefactos de la proyección quedaron
  byte-idénticos** (md5 antes/después) y cero `.tmp`: no quedó medio emitido.
- **El acuse no sobrevive un cambio de proyecto**: tras cambiar, `is-idle`, texto vacío, título
  quitado, botón habilitado. Un "6 artifacts · 71 runs" heredado afirmaría una re-emisión que en
  el proyecto siguiente nunca ocurrió.

### D.2.b Lo que la QA encontró: un canónico malformado tumbaba el server

Escribiendo el reporte de QA en PowerShell, `ConvertTo-Json` produjo un canónico con
`"depends_on": {}` (así serializa `@()` esa versión). El árbol PASA la compuerta de forma
—tres niveles, ids, `status`— porque esa compuerta comprueba lo que el emisor consume, no el
tipo de cada campo que el motor recorre después. `checkInvariants` intentó iterar un objeto,
**lanzó**, y como la excepción salía de un handler `async` **se llevó el proceso del server por
delante**. Un canónico malformado es exactamente el caso para el que existe la compuerta 5: tenía
que responder un rechazo nombrado, no morirse.

Corregido: el pre-check envuelve la llamada al motor y devuelve
`409 canonical_not_a_roadmap_tree` con el archivo, más el mensaje del motor como `detail`:

> `{"ok":false,"reason":"canonical_not_a_roadmap_tree","file":"roadmap/roadmap.json",`
> `"errors":["the file has the objectives->phases->runs shape but the roadmap engine could not`
> `read it"],"detail":"object is not iterable …"}`

Dos tests nuevos lo fijan: uno unitario sobre el pre-check y uno por HTTP que además comprueba
que **el server sigue respondiendo** después. La ruta de edición ya estaba a salvo (envuelve
`planEdit` en `try/catch`); solo el código nuevo estaba expuesto.

### D.3 Sin regresión, medido en DOM

Con `cantu-studio` cargado, se capturó el `innerHTML` de las 14 superficies que el renderer pinta,
se pulsó el botón, y se comparó. **Cambiaron exactamente dos**: `history-list` y `state-sources`
—las dos que muestran el `generated_at` y los mtimes que la emisión acaba de renovar—. Las otras
doce, byte-idénticas: la re-emisión es idempotente sobre los datos.

Geometría: ancho de contenido 1024, padding 28px, `body.scrollWidth == clientWidth == 1280` (cero
scroll horizontal) antes y después. Pestaña activa, subvista y carril seleccionado intactos tras
la re-emisión: es un refresco, no un cambio de proyecto.

## BLOQUE E — Una medición cambió el diseño del acuse

El botón vive en `.roadmap-edit-controls`, la fila de controles que ya existía en el toolbar de
Roadmap (la misma que lleva el slot de carriles de D-051 y el toggle de edición). **Ninguna fila
nueva de chrome.** Pero la primera versión del acuse —una frase completa— hizo algo visible:

> Fila medida a 1280 con un proyecto de dos carriles: 293 px (sub-tabs) + 352 px (selector de
> carril) + 318 px (controles de edición) = **963 de 962 px disponibles**. La fila está LLENA.

El `<span>` del acuse, siendo flexible, se aplastó a **59 px de ancho y 115 px de alto**: seis
líneas apiladas que empujaron el roadmap 68 px hacia abajo, de forma permanente tras cada clic.
Un acuse que deforma la superficie que acaba de refrescar es un mal acuse.

La forma final sale de esa medición:

- Estado de trabajo **corto y `nowrap`** (`6 artifacts · 71 runs`, ~102 px): los dos números que
  el operador vino a buscar, en una línea, `flex: 0 0 auto` para que la fila no lo aplaste. La
  frase entera —canónico de origen, artefactos omitidos, "nada fue commiteado"— viaja en el
  `title`, así que nada medido se pierde. Altura de la fila: **48 px antes y 48 px después**.
- Un **rechazo** recupera el `flex` y envuelve, exactamente como ya hace el hint de edición
  cuando el modo edición se explica. El motivo y el ARCHIVO van en pantalla; solo el DETALLE
  (el texto verbatim del motor) va al `title`. Es raro y vale las dos líneas: nombrar el archivo
  y luego truncarlo con puntos suspensivos habría anulado el propósito de nombrarlo.
- Estado por peso y copia, no por color: la sección de CSS de edición ya lo pedía y se respetó
  (`--text-tertiary` / `--text-secondary`, ningún token nuevo, ningún valor de color nuevo).

## BLOQUE F — Cinco pins que llegaron rojos, y por qué se movieron

Al arrancar la fase la suite ya tenía **5 tests en rojo**, ninguno tocando código de esta fase.
Los cinco eran el mismo pin: `53` runs de `cantu-studio` contra un canónico que dice `71`. Es
**el mismo desfase que motivó el botón**, llegado a la suite en vez de a la consola — la partición
implementación/documentación movió el dato y los pins se quedaron atrás.

Se movieron al dato, que es lo que un pin sobre datos reales debe seguir. **Solo los conteos**:

| Archivo | Pin | Antes | Ahora |
|---|---|---:|---:|
| `tests/roadmap-lanes.test.mjs` | runs totales | 53 | **71** |
| `tests/roadmap-lanes.test.mjs` | runs con `lane` explícito | 5 | **23** |
| `tests/roadmap-lane-numbering.test.mjs` | etiquetas de carril en la cola | 53 | **71** |
| `tests/roadmap-lane-numbering.test.mjs` | runs del canónico (×2) | 53 | **71** |
| `tests/shell-two-real-projects.test.mjs` | línea de diagnóstico | 53 runs | **71 runs** |

Lo que NO se movió, y por eso el cambio es solo de dato: el carril por defecto sigue llevando
**48** runs (la partición solo hizo crecer el de documentación, 5 → 23); siguen siendo 7
objetivos y 28 fases; sigue habiendo exactamente un carril por defecto, cada run sigue
resolviendo a un carril declarado, y sigue sin haber ningún `barrier`. Ninguna propiedad, regla
de agrupación, numeración local ni semántica de carril se tocó. Cada pin movido lleva su
comentario en el sitio.

**Suite: 277 tests, 277 verdes.** De ellos, 16 nuevos para esta ruta y su guarda, más la matriz
medida.

## BLOQUE G — Lo que esta fase NO hizo

- **No hay auto-refresh, polling, watcher ni tarea programada.** Ni una línea.
- **No se ejecutó git que escriba.** Ni `commit`, ni `add`, ni `push`. El único git que corre es
  el que el emisor de historia ya corría, en lectura, porque `git_history.json` es uno de los seis.
- **No se emite para `aiw`**: ningún layout reclama un canónico ahí, y el botón lo dice nombrando
  los dos archivos que buscó.
- **No se emiten las 9 fuentes diferidas**: los seis artefactos son los que el emisor escribe hoy,
  leídos de sus propias constantes de ruta (`PROJECT_*_RELATIVE_PATH`), no una lista aparte.
- **No se tocó** la agrupación de Docs, la regla `archive/`, el ancho, el padding, los carriles,
  la numeración local, ni se añadieron controles de barrier, dependencias u otras superficies de
  edición.
- **No se tocó `cantu-studio`** fuera de su `.project/`, que es justamente lo que la ruta re-emite.

## BLOQUE H — Qué queda abierto

1. **Seis no siempre son seis, y está bien.** Un root sin ficheros de gobernanza, sin corpus de
   docs o que no es su propio repositorio emite menos: el emisor omite el artefacto nulo. El
   acuse lo declara (`skipped`) en vez de contar seis siempre. Lo abierto es de nomenclatura: el
   botón dice "los seis" y el acuse dice "3 artifacts" en esos roots. Se prefirió la honestidad
   del número al redondeo del rótulo.
2. **Concurrencia entre PROCESOS.** El cerrojo (`projectEmitting`) es de este proceso, igual que
   el de las aplicaciones de roadmap. Dos servers sobre el mismo proyecto podrían solaparse; el
   temp+rename por artefacto acota el daño a "el último gana", nunca a un archivo partido, pero
   no hay exclusión cruzada. Mismo estado que dejó O4.P12 y por la misma razón.
3. **El botón no sabe si hay desfase antes de pulsarlo.** Podría comparar el `runs` del canónico
   con el de la proyección y avisar. Deliberadamente no lo hace: leer el canónico en cada render
   para adornar un botón es trabajo por cada pintado, y el acuse ya responde la pregunta después.
   Si se quisiera, el sitio es la respuesta de un GET a la misma ruta — hoy 405 y nada más.
4. **El acuse vive en una fila que está llena.** Bloque E la midió a 963/962 px. Un tercer control
   en esa fila, o un proyecto con más carriles, obligará a repensarla — probablemente moviendo el
   selector de carril, no el acuse.
5. **La emisión no dice QUÉ cambió, solo cuánto.** "71 runs" contra una proyección que tenía 53 es
   informativo porque el operador conoce el número viejo. Un diff por artefacto (bytes antes/
   después, artefactos realmente modificados) sería mejor y no está hecho.
6. **Los pins del Bloque F volverán a envejecer.** Son pins sobre un canónico vivo de otro
   proyecto. Mientras `cantu-studio` avance, cada partición futura los pondrá en rojo. La
   alternativa —derivar el número del archivo en vez de fijarlo— quitaría al test su capacidad de
   detectar un cambio no querido, así que se dejaron fijos a propósito.
7. **`readRegistry` es fail-soft con un BOM, pero mudo.** Un `projects.json` escrito con BOM
   (lo que produce `Out-File -Encoding utf8` en Windows PowerShell 5.1) no parsea, el registro
   queda vacío, y toda ruta virtual responde `404 unknown_project` sin decir por qué. Encontrado
   escribiendo el reporte de QA. Es conducta preexistente, compartida por las tres rutas, y
   quedó fuera de alcance; el reporte del Bloque I escribe sin BOM a propósito.

---

## BLOQUE I — REPORTE PARA QA (PowerShell)

Todo lo de abajo está ejecutado y verificado tal cual. Ningún paso toca un canónico real.

### I.1 Arrancar

```powershell
Set-Location C:\Users\chris\Documents\AIW_Workspace\projects\aiw-console
node project-console/serve.mjs
```

Abrir <http://127.0.0.1:8788/project-console/index.html>. Si el puerto está ocupado:
`$env:PC_PORT = "8799"` antes de arrancar. El server se deja en su propia ventana.

### I.2 El botón, en la consola

Elegir un proyecto en la barra lateral → pestaña **Roadmap**. En la fila de controles que ya
existía (la del selector de carril y **Edit roadmap**) está **`Re-emit .project/`**. Un clic:

| Proyecto | Acuse esperado | Detalle (hover sobre el acuse) |
|---|---|---|
| `aiw-console` | `6 artifacts · 42 runs` | `Re-emitted 6 artifacts from roadmap/roadmap.json — 42 runs, 2 objectives. Not committed: review and commit yourself.` |
| `cantu-studio` | `6 artifacts · 71 runs` | ídem con `.aiw/roadmap/roadmap.json` y `71 runs, 7 objectives` |
| `aiw` (kernel) | `Refused — no canonical roadmap claims this project: roadmap/roadmap.json (missing), .aiw/roadmap/roadmap.json (missing). Nothing was written.` | — |

La fila NO debe crecer en los dos primeros casos (48 px antes y después); en el rechazo sí
envuelve, a propósito. En ningún caso debe aparecer scroll horizontal.

### I.3 Los canónicos no se tocan

Antes y después de pulsar el botón en los dos proyectos reales:

```powershell
Set-Location C:\Users\chris\Documents\AIW_Workspace\projects\aiw-console
(Get-FileHash roadmap\roadmap.json -Algorithm MD5).Hash
(Get-FileHash ..\cantu-studio\.aiw\roadmap\roadmap.json -Algorithm MD5).Hash
```

Deben salir `58A726908ECE58B59922EE0232B1EB15` y `6D6951370DC581CC5A21CF7CD3CE287F`, iguales
antes y después. Lo que SÍ cambia es `.project/` de cada proyecto: eso es la función del botón.

### I.4 Provocar el desfase a propósito (sin tocar nada real)

Se monta un proyecto de juguete y se sirve con `PC_REGISTRY`, que es para lo que existe. **Se
escribe sin BOM a propósito**: `Out-File -Encoding utf8` en PowerShell 5.1 mete BOM y el registro
no parsearía (el server respondería `unknown_project` sin explicar por qué). Y el canónico se
escribe como texto, no con `ConvertTo-Json`, porque esa versión convierte `@()` en `{}` y un
array de un elemento en un escalar — con lo que el canónico saldría malformado.

```powershell
$QA = Join-Path $env:TEMP "pc-qa-desfase"
Remove-Item -Recurse -Force $QA -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force (Join-Path $QA "demo\roadmap") | Out-Null

function Write-Utf8NoBom([string]$Path,[string]$Text){
  [System.IO.File]::WriteAllText($Path,$Text,(New-Object System.Text.UTF8Encoding $false)) }

function Set-QaCanonical([int]$Runs) {
  $rows = 1..$Runs | ForEach-Object {
    $id   = "RUN-QA-{0:d3}" -f $_
    $deps = if ($_ -eq 1) { "[]" } else { '["RUN-QA-{0:d3}"]' -f ($_ - 1) }
    '      {"run_id":"'+$id+'","queue_order":'+$_+',"title":"Run '+$_+'","summary":"s","full_description":"f","status":"planned","depends_on":'+$deps+'}' }
  Write-Utf8NoBom (Join-Path $QA "demo\roadmap\roadmap.json") (@"
{ "schema_version":"roadmap_tree_v1", "roadmap_id":"roadmap", "title":"QA Desfase",
  "objectives":[ { "objective_id":"QA-O1","title":"Objective","phases":[ { "phase_id":"QA-O1.P1","title":"Phase","runs":[
$($rows -join ",`n")
  ] } ] } ] }
"@) }

Write-Utf8NoBom (Join-Path $QA "registry.json") '{"registry_model":"project_registry_v1","title":"QA","projects":[{"key":"demo","root":"./demo"}]}'
Set-QaCanonical 4
```

En OTRA ventana, el server sobre ese registro:

```powershell
Set-Location C:\Users\chris\Documents\AIW_Workspace\projects\aiw-console
$env:PC_REGISTRY = Join-Path $env:TEMP "pc-qa-desfase\registry.json"
$env:PC_PORT = "8802"
node project-console/serve.mjs
```

Abrir <http://127.0.0.1:8802/project-console/index.html> → proyecto **demo** → **Roadmap**.
La consola dirá que no puede renderizarlo (aún no hay `.project/`). **Clic en `Re-emit
.project/`** → acuse `3 artifacts · 4 runs` y la cola con 4 runs.
*(Tres y no seis es correcto: este root de juguete no tiene ficheros de gobernanza ni es su
propio repositorio, así que `guardrails`, `no_claims` y `git_history` no tienen de qué derivarse.
El detalle del acuse los nombra como omitidos.)*

Ahora **el desfase**, que es lo que hace un encargo en carril paralelo — el canónico crece y
nadie re-emite:

```powershell
Set-QaCanonical 9
```

Recargar la página: **la cola sigue mostrando 4 runs**. Ese es el bug que el operador tuvo que
sortear inventando una edición. **Un clic en `Re-emit .project/`** → acuse `3 artifacts · 9 runs`
y la cola y el árbol pasan a 9. Sin reiniciar el server y sin recargar a mano.

### I.5 El fallo nombrado, y que no queda medio emitido

```powershell
$QA   = Join-Path $env:TEMP "pc-qa-desfase"
$proj = Join-Path $QA "demo\.project"
$before = Get-ChildItem $proj | Sort-Object Name | ForEach-Object { $_.Name + ":" + (Get-FileHash $_.FullName -Algorithm MD5).Hash }

# romper el canónico: el run 1 pasa a depender del run 9 (posterior)
$p   = Join-Path $QA "demo\roadmap\roadmap.json"
$txt = (Get-Content $p -Raw).Replace('"status":"planned","depends_on":[]','"status":"planned","depends_on":["RUN-QA-009"]')
[System.IO.File]::WriteAllText($p, $txt, (New-Object System.Text.UTF8Encoding $false))
```

Clic en el botón. En pantalla:

> `Refused — the canonical roadmap/roadmap.json fails the roadmap invariants (2 errors). Nothing was written.`

y, al pasar el ratón por encima, los dos errores del motor verbatim. Comprobar que **no se
escribió nada**:

```powershell
$after = Get-ChildItem $proj | Sort-Object Name | ForEach-Object { $_.Name + ":" + (Get-FileHash $_.FullName -Algorithm MD5).Hash }
if (Compare-Object $before $after) { "CAMBIÓ ALGO — mal" } else { "byte-idéntico — bien" }
$t = Get-ChildItem -Recurse -Filter *.tmp $proj -ErrorAction SilentlyContinue
if ($t) { "stray .tmp: " + ($t.FullName -join ", ") } else { "stray .tmp: none" }
```

### I.6 La matriz read-only, comprobable a mano

```powershell
$base = "http://127.0.0.1:8788/projects/aiw-console"
foreach ($m in "PUT","PATCH","DELETE") {
  foreach ($r in "__project-console/roadmap/edit","__project-console/history/sync","__project-console/project/emit") {
    try { Invoke-RestMethod -Method $m -Uri "$base/$r" -ErrorAction Stop | Out-Null }
    catch { "$m /$r -> " + $_.ErrorDetails.Message } } }
```

Los nueve deben responder `405 method_not_allowed`. Cualquier otro camino, con cualquier método
que no sea GET/HEAD, responde `405 read_only_console`; `.git` responde `403` en los dos
namespaces. La matriz completa está en el Bloque C.2 y la mide el test
`MATRIX: exactly THREE routes accept POST…` (`node --test tests/serve-write-routes.test.mjs`,
imprime la tabla que midió).

### I.7 La suite

```powershell
Set-Location C:\Users\chris\Documents\AIW_Workspace\projects\aiw-console
npm test
```

**278 tests, 278 verdes.** Nota: la suite re-emite el `.project/` de ESTE repo (dos tests lo
usan como proyecto real, uno de ellos desde O4.P12), así que después de correrla el árbol de
trabajo queda con esos derivados tocados. Es esperado y son archivos derivados.

### I.8 Limpiar

```powershell
Remove-Item -Recurse -Force (Join-Path $env:TEMP "pc-qa-desfase")
Remove-Item Env:\PC_REGISTRY, Env:\PC_PORT -ErrorAction SilentlyContinue
```

Y cerrar las ventanas de los servers. **Nada de esto commitea**: tras re-emitir, el diff de
`.project/` queda para que lo revises y lo commitees tú.
