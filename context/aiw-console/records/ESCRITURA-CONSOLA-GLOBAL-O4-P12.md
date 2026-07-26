# ESCRITURA — la consola global gana su ruta de escritura (`O4.P12`)

> Entregable de conocimiento de la fase `O4.P12` (registrada por D-050, que revierte —solo— el
> diferimiento de edición de D-034). Documenta **los cinco problemas del encargo, resueltos y
> justificados**, **qué se trasplantó verbatim y qué se tocó**, **la matriz read-only
> resultante**, **la verificación sin daño con md5**, **la concurrencia nombrada** y **qué queda
> abierto**.
>
> Fecha: 2026-07-26. **No se ejecutó git en ninguna forma que escriba** (git se leyó solo por el
> emisor de historia: `for-each-ref`, `rev-parse`, `branch --show-current`, `log`). No se tocó el
> roadmap de fases, `DECISIONES.md`, `CONTRATO.md` ni ningún record existente. El fork D-035
> (`docs/project-console/`), el prototipo retirado (`console/`) y el tooling viejo
> (`tools/project-console/`) no fueron leídos como fuente ni tocados.
>
> **Archivos escritos por esta fase, y ninguno más:**
> `tools/roadmap/roadmap-core.mjs` · `tools/roadmap/roadmap-plan.mjs` (el motor trasplantado) ·
> `project-console/serve.mjs` (las dos rutas y sus guardas) ·
> `project-console/assets/project-console.js` (PATHS + 4 textos de honestidad + 1 fix de reset) ·
> `project-console/index.html` (el atributo `hidden` fuera) ·
> `project-console/README.md` (3 afirmaciones read-only que quedaron falsas) ·
> `tools/projector/project.mjs` (aditivo: `writeGitHistoryFile`, versión 0.6.0→0.7.0) ·
> `tests/roadmap-engine.test.mjs` · `tests/serve-write-routes.test.mjs` (nuevos) ·
> `tests/shell-model.test.mjs` · `tests/shell-switch.test.mjs` ·
> `tests/shell-two-real-projects.test.mjs` (pins de conteo 2/15/31 → 2/16/35, ver F.3) ·
> los `.project/` de este repo y de `cantu-studio` (re-emitidos, coherentes) · este record.
> **Los dos roadmaps canónicos reales se tocaron SOLO como sujetos de prueba y quedaron
> byte-idénticos** (md5 en Bloque D). `cantu-studio` fuera de `.project/`: intacto (Bloque D.3).
> El kernel `aiw`: intacto.

Insumos usados y no re-medidos: `AUDIT-CONSOLE-O4-PHASE0.md` (F.3), `PORT-IDENTICO-CONSOLA-O4-P11.md`
(Bloque E), `SHELL-MULTIPROYECTO-O4-P3.md`, `EMISOR-CANTU-CARPETA-PROPIA-O4-P4.md` (B.1, B.2),
`CONTRATO.md` (§1.a, §10, §10.d, §19, §20).

---

## BLOQUE A — El trasplante: qué viajó verbatim, qué se tocó, y por qué cada toque

Patrón de O4.P11, repetido: **copiar los archivos reales y operar sobre la copia.** Los dos
archivos del motor se copiaron byte a byte desde `cantu-studio/tools/roadmap/` (md5 verificados
al copiar) y sobre la copia se hicieron toques quirúrgicos, cada uno marcado `[O4.P12]` en el
código:

| Archivo | md5 del origen al copiar | Líneas | Diff vs origen | De ellas, CÓDIGO |
|---|---|---:|---:|---:|
| `roadmap-core.mjs` | `05553b183774051545fd649b5d23c45b` | 1167 → 1206 | 91 | **23** |
| `roadmap-plan.mjs` | `8ec46545900a7c8c7e978fe103532600` | 271 → 282 | 41 | **17** |

Lo no listado abajo es el archivo original: las mutaciones (las 14 operaciones), el modelo de
`queue_order`, `checkIdentityPreserved`, el serializador, `applyWrite` (temp+rename con backup en
tmpdir y rollback), `computeBaseline` (CAS por sha256), el batch y sus reglas — **intactos**.

**Los toques, uno a uno:**

- **T1 — EOL medido, no horneado** (`serialize(obj, eol)` + `detectEol(raw)`; `planEdit` los
  enhebra). El serializador del origen hornea CRLF, y los dos canónicos reales difieren:
  `roadmap/roadmap.json` de este repo es **LF** (565 LF, 0 CRLF) y el de Cantu es **CRLF**
  (839 CRLF, 0 LF). Byte-exactitud es relativa al archivo que se edita: con el EOL detectado,
  parse+serialize reproduce **ambos archivos byte-idénticos** (test), y con el horneado, la
  primera edición del LF habría reescrito las 565 líneas. El default queda CRLF (la conducta
  congelada del origen).
- **T2 — dependencias externas (§10.d)** (`checkInvariants(obj, {externalRunIds})`, `setDeps`
  ídem, enhebrado por `planEdit`). El dato real lo exige: el canónico de Cantu declara UNA arista
  cuyo destino no vive en su archivo (`RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 →
  RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`), y ese run **sí** está declarado por el árbol de este
  repo — es exactamente la arista cruzada LEGAL de CONTRATO §10.d ("eran 8, hoy es 1"). Sin el
  toque, el pre-flight del motor rechaza el archivo entero — **medido: el motor de Cantu, hoy,
  se niega a editar su propio canónico** ("orphaned dependency", stage `preflight`). El conjunto
  de ids externos entra como DATO (un `Set` que el server compone del registro); una dep que no
  resuelve en NINGÚN proyecto registrado sigue siendo colgante y sigue siendo error. Las aristas
  externas no participan de la precedencia por `queue_order` (dos archivos no comparten cola) ni
  del walk de ciclos (solo aristas del archivo).
- **T3 — comentarios de procedencia** (cabeceras y dos comentarios que nombraban
  `.aiw/roadmap/roadmap.json`, el schema `jame.*`, el CLI y el validador de Cantu). Reescritos
  conservando la explicación, sin identidad — la disciplina C.10 de O4.P11. La procedencia real
  está aquí, con md5.

**Lo que NO se trasplantó, dicho como tal:** `roadmap-edit.mjs` (el CLI). Sus rutas por defecto y
su validador son fijos de Cantu, y las dos capacidades que D-050 devuelve son el endpoint con
dry-run→confirm desde el navegador y el history sync — el CLI no es ninguna de las dos. Editar
por línea de comandos contra cualquier canónico sigue posible vía `planEdit`/`applyPlan` (API),
pero no se embarcó una segunda superficie de edición: paridad, no expansión.

---

## BLOQUE B — Los cinco problemas del encargo

### B.1 El motor — trasplantado (Bloque A)

### B.2 El gate de schema — MEDIDO: el motor no gatea por nombre; no se cambió nada de eso

La premisa del encargo ("el motor presumiblemente valida el identificador") se midió y **resultó
falsa, en el buen sentido**: `parseRoadmap` es `JSON.parse`, y `checkInvariants` valida por
FORMA — allowlist de campos por nivel (`ROOT_ALLOWED_FIELDS` admite `schema_version` como campo,
**nunca compara su valor**), campos requeridos del run, `queue_order` denso/único/contiguo,
deps, ciclos. Un árbol con la forma correcta pasa se llame como se llame. Conforme al encargo
("si el motor resulta no estar gateado por nombre, decirlo y no cambiar nada"): **se dice, y no
se cambió nada de admisión**. Los toques T1/T2 son de EOL y de §10.d, no de admisión.

Medido contra los dos reales: ambos roots tienen exactamente los 4 campos raíz permitidos, runs
9-de-9 en claves, `queue_order` denso (1..35 y 1..53). El test fija ambos sentidos: la misma
estructura bajo `roadmap_tree_v1` y bajo `jame.roadmap_v3.v0.2-progress` (y bajo
`otro.proyecto.plan.v9` a nivel HTTP) edita idéntico; un árbol de OTRA forma (campo raíz
inventado, run sin `status`) se rechaza en pre-flight. La admisión del ENDPOINT es
`detectRootLayout` — el gate por forma que O4.P4 ya construyó — y el nombre del modelo viaja
verbatim al re-emitir (`taxonomy_model.model: "otro.proyecto.plan.v9"` en el test).

### B.3 La ruta canónica por proyecto — ES la entrada `roadmap` que el bundle YA tiene

El destino de escritura es `detectRootLayout(root).paths.roadmap`: **la misma entrada del bundle
`ROOT_LAYOUTS` que el emisor lee**. No se añadió una entrada paralela "de escritura" porque el
archivo que el emisor LEE como fuente y el que el editor ESCRIBE deben ser el mismo por
construcción — dos entradas podrían divergir, que es la enfermedad exacta que el bundle existe
para impedir (O4.P4 B.1: el bundle se resuelve como unidad). Probado en los dos layouts reales:
`repo_root` → `roadmap/roadmap.json` (este repo) y `project_local_aiw` →
`.aiw/roadmap/roadmap.json` (Cantu). **`.project/` no es destino jamás**: además de que ningún
layout apunta ahí, la guarda B.5 lo rechaza explícitamente como territorio del emisor.

### B.4 La coherencia tras escribir — re-emisión AUTOMÁTICA, dentro del confirm

Tras un apply exitoso, el server re-emite `writeProjectFolder(root)` (los 6 artefactos) **antes
de responder**. Automático y no explícito, por el flujo real del cliente: `v3EditConfirm` →
"Applied" → `v3EditReloadRoadmap()` re-lee `.project/roadmap.json` **inmediatamente**. Un paso
manual garantizaría una ventana en la que la consola pinta el árbol viejo y el operador lee su
edición como perdida — el fallo que el encargo nombra. El emisor es idempotente y barato
(~0.5–2 s con el corpus de Cantu). Si la re-emisión fallara, **la escritura canónica queda en
pie** (pasó su re-check; revertirla perdería la edición del operador para proteger una carpeta
derivable) y el fallo viaja nombrado en la respuesta (`reemit:{ok:false,reason}`) y al log.
HISTORY SYNC usa la pieza fina: `writeGitHistoryFile(root)` (proyector 0.7.0, aditivo) re-emite
SOLO `git_history.json` — re-emitir seis archivos para refrescar commits sería costo sin compra.

### B.5 La frontera entre repos — guarda explícita, verificada tras resolver

`resolveCanonicalWritePath(root, relative)` corre sobre TODO destino de escritura del endpoint,
después de resolver la ruta completa: (1) dentro del root REGISTRADO (`projects.json` es la
única puerta; una key no registrada es 404 `unknown_project`), (2) **nunca** dentro de
`.project/` (derivado: el proyector lo pisa en la siguiente emisión — escribir ahí perdería la
edición en silencio), (3) **nunca** un segmento `.git`. Cualquier violación rechaza y reporta,
no ejecuta. Además, paridad con el server de origen: peer loopback + Origin localhost + cuerpo
≤1MB. La re-emisión conserva su propia guarda simétrica (`resolveInsideProject`): ninguna de las
dos rutas puede escribir donde escribe la otra.

**Probado con registro apuntando fuera (fixture):** una entrada cuyo root existe pero no es
proyecto (ningún layout lo reclama) — edit y sync responden 404
`project_not_editable_no_layout` y el directorio queda **byte-vacío** (test). La guarda unitaria
rechaza `../fuera`, rutas absolutas ajenas, `.git/config` y `.project/roadmap.json`, y acepta el
canónico del layout.

---

## BLOQUE C — Las dos rutas, su contrato y la matriz read-only

`POST /projects/<key>/__project-console/roadmap/edit` — el contrato exacto del server de origen:
dry-run (`apply:false`) → `{ok, remap, warnings, bytes, baseline}` sin escribir; confirm
(`apply:true` + `baseline`) → CAS contra los bytes actuales (409 `stale_baseline` si el archivo
se movió), escritura atómica (temp+rename, backup en tmpdir), **re-check del archivo escrito**
como autoridad (re-lee, parse, invariantes con externas, forma del árbol; fallo → rollback del
backup → 409 `validator_rejected` con la salida verbatim), re-emisión, y
`{ok, applied:true, baseline nuevo, reemit}`. El GET a la ruta es el PROBE del cliente: 405
`method_not_allowed` exactamente cuando el proyecto es editable; 404 nombrado cuando no — así
`v3ProbeEndpoint` (intocado) enciende el modo edición solo donde puede escribir.

`POST /projects/<key>/__project-console/history/sync` — re-emite `git_history.json` del proyecto
activo; responde los campos del origen (`head`, `current_branch`, `branches`, `commit_total`…);
503 `git_history_unavailable` si git no puede leer; 404 si el proyecto no es del emisor.

**La matriz medida** (server real, registro real):

| Ruta | GET | POST | PUT/PATCH/DELETE |
|---|---|---|---|
| Archivo real / virtual / registro / inexistente | 200 · 200 · 200 · 404 | **405 read_only_console** | **405 read_only_console** |
| EDIT de proyecto editable (aiw-console, cantu-studio) | 405 method_not_allowed (probe) | **la única escritura** | 405 method_not_allowed |
| EDIT de `aiw` (sin layout) / no registrado | 404 nombrado | rechazado nombrado | 404 nombrado |
| SYNC de proyecto editable | 405 method_not_allowed | **la otra escritura** | 405 method_not_allowed |
| SYNC de `aiw` (sin layout) | 405 | 404 nombrado | 405 |
| `.git` (ambos namespaces) | **403** | **403** | **403** |

Traversal crudo y codificado: 403/404, probado en suite; POST con traversal se rechaza como
método (405), nunca se resuelve como archivo. Exactamente **dos** rutas aceptan POST; cero
aceptan PUT/PATCH/DELETE. La URL de las rutas se compone en el cliente desde `REPO_BASE`
(§1.a: ninguna ruta fuera de la base), y las rutas se interceptan ANTES de la resolución
estática — un archivo real llamado `__project-console/…` dentro de un proyecto queda sombreado,
igual que en el server de origen con `/__project-console/*`.

---

## BLOQUE D — Verificación sin daño: los números

### D.1 Los dos canónicos reales, editados y revertidos, byte-idénticos

Ciclo completo **por HTTP** (dry-run → confirm → verificar → dry-run → confirm inverso) y ciclo
completo **desde el navegador** (modal → Preview all changes → Confirm and write → "Applied" →
revertir por la misma UI), en LOS DOS proyectos:

| Canónico | md5 ANTES | tras confirm | md5 DESPUÉS (ambos ciclos) |
|---|---|---|---|
| `aiw-console/roadmap/roadmap.json` (repo_root, LF) | `0a4c2d919279e1272c8f5400b78bbc2b` | PROBE presente en canónico Y en `.project/roadmap.json` Y en `snapshot.json` | **`0a4c2d91…` — BYTE-IDÉNTICO** |
| `cantu-studio/.aiw/roadmap/roadmap.json` (project_local_aiw, CRLF) | `58803b0afcae10142d5fe788ae9959ea` | ídem (reemit 6 archivos, layout correcto) | **`58803b0a…` — BYTE-IDÉNTICO** |

El md5 de Cantu es el mismo que O4.P4 E.1 registró: la cadena de custodia entre fases cierra.
Cero residuos "[P12-PROBE]"/"[P12-QA]" en ningún derivado al terminar. Cero `.tmp` ni backups
dentro de los repos (los backups viven en `os.tmpdir()`, fuera, por diseño Q6).

### D.2 QA en navegador (DOM real; el panel no compositaba captura, la misma limitación que
documentaron ACABADO F y O4.P3)

- Botón **Edit roadmap visible** (`hidden:false`, `display:flex`).
- Toggle → probe → **"Editing on"**, 18 affordances de edición en el árbol de este repo, 7 en el
  de Cantu.
- Modal de objetivo: diff Before/After pintado, **Confirm and write** → **"Applied. The roadmap
  was written and re-read from disk; the validator passed."** — y el árbol re-pintado ya con el
  título nuevo, leído del `.project/` re-emitido (la coherencia, vista en vivo).
- History → **Sync** → **"Refreshed"** (`is-synced`), commits re-pintados. El mensaje "Sync
  unavailable — this console is read-only…" ya no existe en el código.
- `aiw` → toggle → rechazo honesto en pantalla ("no editable roadmap (no root layout claims
  one)") con el toggle limpio. De paso se encontró y corrigió un defecto alcanzable solo desde
  esta fase: el reset por cambio de proyecto reseteaba el FLAG de edición pero no el VISUAL del
  toggle (antes de P12 el modo nunca podía encenderse, así que el estado era inalcanzable).
  Verificado en DOM: Cantu con edición ON → cambiar a `aiw` → toggle "Edit roadmap"/false.

### D.3 Fronteras

Árbol completo de `cantu-studio` (21 314 archivos, excluidos `.git/`, `.project/`,
`node_modules/` de primer nivel), md5 agregado ANTES = DESPUÉS =
`26eff2ac6aa724f4f1e4d4cf1dab05c3` — **ni un byte fuera de `.project/` y del canónico
revertido**. Su tooling, su consola local y su `.aiw/` restante: intactos por ese agregado. Su
server local NO se arrancó (escribe al arrancar — la vía de O4.P4 E.3). Kernel `aiw`: agregado
`b59f7a94e8b8d89ca111f236c5eaaa54` antes = después; **no se emitió para aiw** (sus rutas de
escritura responden 404: es O4.P6).

### D.4 Aditividad del proyector, probada A/B

Reconstruido el proyector pre-P12 y comparados EN MEMORIA (nada escrito), con `generated_from`
normalizado: `buildSnapshot` y `buildRoadmap` sobre `aiw` (el camino viejo) **IDÉNTICOS**;
`detectRootMode(aiw)` = `aiw_objectives` antes y después; los cinco builders de modo 2 sobre los
dos roots reales **IDÉNTICOS**. La única diferencia del emisor es la versión
(`aiw-projector@0.7.0`), que §6 exige mover: un emisor invocable por-artefacto no es el que solo
emitía la carpeta. La adición (`writeGitHistoryFile`) es un export nuevo que ningún camino viejo
llama.

---

## BLOQUE E — Concurrencia, nombrada

**El server propio de Cantu también escribe su canónico — ¿qué pasa si corren a la vez?**

1. **Hoy, medido:** el endpoint de Cantu no puede aplicar NINGUNA edición — su motor (sin T2)
   rechaza su propio archivo en pre-flight por la arista externa de §10.d ("depends on unknown
   run RUN-CANTU-ROADMAP-CONTENT-AUDIT-001"). El único escritor vivo del canónico de Cantu desde
   UI es esta consola. Su server sí escribe **otro** archivo al arrancar
   (`.aiw/views/git_history.snapshot.json`), que no colisiona con ninguno de nuestros destinos.
2. **Dentro de este server:** los applies se serializan (lock en proceso, 409
   `write_in_progress`) y el CAS por baseline garantiza que un confirm jamás pisa un archivo que
   cambió desde su dry-run — quien llegue tarde recibe 409 `stale_baseline` y re-lee.
3. **Entre procesos (este server + el de Cantu arreglado, o un editor manual):** **no hay lock
   de archivo cruzado, y se declara.** El CAS reduce la ventana al intervalo re-plan→rename de
   un confirm (milisegundos); dos renames simultáneos en esa ventana = last-writer-wins, con el
   backup del perdedor en tmpdir. Aceptable hoy porque la consola es una herramienta local de UN
   operador, el escenario exige dos servers editando el mismo archivo en la misma ventana, y el
   corte (O4.P7) retira al otro escritor. Si la convivencia se alargara, el siguiente paso
   honesto sería un lockfile junto al canónico.

---

## BLOQUE F — Suite y tests

**151/151 verde** (`node --test`): 119 previas + 32 nuevas.

- **F.1 `roadmap-engine.test.mjs` (13):** roundtrip byte-idéntico contra LOS DOS canónicos
  reales (solo lectura); los dos EOL reales son distintos (el test que hace load-bearing a
  `detectEol`); forma-no-nombre en ambos sentidos; §10.d en tres sentidos (sin set → colgante;
  con set → legal; con set pero id de nadie → error) y contra los dos reales cruzados;
  inversión de dependencia rechazada en dry-run con archivo intacto; densidad tras
  insert+remove; guardia de identidad ante un `run_id` renombrado; EOL preservado por edición;
  rollback restaura bytes exactos y no deja `.tmp`; apply verde deja los bytes nuevos y el
  baseline nuevo; el vocabulario de ops del trasplante, fijado.
- **F.2 `serve-write-routes.test.mjs` (19):** probe por proyecto; dry-run que no escribe (bytes
  y mtime); confirm sin baseline → 400; baseline viejo → 409 sin escribir; happy path con LF
  preservado y `.project/` coherente; el proyecto de schema ajeno editado con CRLF preservado y
  su nombre de modelo viajando al snapshot; invariantes sobre HTTP (422, archivo intacto);
  **la guarda de frontera con el registro apuntando fuera** (nada creado, razón nombrada) y sus
  unitarios; ids externos compuestos del registro; sync 404/503/200 (el 200 contra el repo real
  — reescribe SOLO `.project/git_history.json` de este repo, derivado con emisor propio; está
  dicho en la cabecera del test); GET del sync 405; matriz read-only completa (4 métodos × 5
  rutas no-ruta); `.git` y traversal; match exacto de rutas.
- **F.3 Tres pins actualizados, y por qué es lo honesto:** `shell-model`, `shell-switch` y
  `shell-two-real-projects` fijaban "2 objectives / 15 phases / 31 runs" — los conteos del
  `.project/` EMITIDO en su momento. El canónico real ya iba por 2/16/35 (el operador siguió
  editando) y el derivado estaba **desactualizado**; la primera re-emisión post-confirm lo puso
  coherente y los pins viejos quedaron falsos. Se actualizaron a 2/16/35 (mismo gesto que P11
  con "exactamente cuatro archivos"). Nota: esos tests seguirán necesitando el pin al día cuando
  el roadmap crezca — son "exactly as measured" por diseño de su fase.

**Greps de identidad, reportados:** `jame|cantu` (ci) = **0** en los seis archivos
tocados/creados de motor, server, cliente e index. Cadenas de schema comparadas como gate fuera
de comentarios en motor y server = **0** (la única aparición de `roadmap_tree_v1` en el proyector
es `ROADMAP_TREE_MODEL`, el identificador que este contrato acredita a un árbol que no declara
ninguno — P4 B.3, un default, no un gate). Rutas absolutas en motor y server = **0**.

---

## BLOQUE G — Qué queda abierto, dicho como tal

1. **No hay lock de archivo entre procesos** (Bloque E.3): aceptado hoy, con su porqué y su
   siguiente paso nombrado.
2. **El CLI no viajó** (Bloque A): editar por terminal contra N proyectos sería una superficie
   nueva; si alguna vez se quiere, `planEdit`/`applyPlan` ya son la API.
3. **`aiw` no es editable** hasta que exista su roadmap con forma del contrato (O4.P6); sus
   rutas de escritura responden 404 nombrado y la UI lo dice en pantalla.
4. **El re-check post-escritura no es el validador de Cantu** — es parse + invariantes (+ forma
   del árbol) sobre el archivo escrito. El validador de Cantu valida SU `.aiw/` completo y está
   horneado a su identidad (AUDIT C.3/E.5); usarlo aquí afirmaría validaciones que no ocurren.
   Si la capa 3 del CONTRATO gana validador propio, se inyecta en el mismo callback.
5. **Los pins "exactly as measured"** de F.3 se re-desactualizarán con el crecimiento del
   roadmap; siguen siendo pins a mano por decisión de su fase, no de esta.
6. **El motor de Cantu sigue sin poder editar su propio archivo** (T2 es nuestro, no suyo).
   Es SU tooling y tocarla está fuera de alcance; el corte (O4.P7) lo vuelve irrelevante.
7. Las 9 fuentes diferidas, el banner de opcionales y el pulido de vistas: sin cambio, como
   manda el encargo (O4.P8).

---

## REPORTE para QA del operador

**Arranque.** Si quedó un server viejo corriendo en 8788 (uno pre-P12 responde `404 not found`
al probe de abajo), deténlo primero — el binario viejo no tiene rutas de escritura.

```bash
node project-console/serve.mjs
```

Abre <http://127.0.0.1:8788/project-console/index.html> (o `PC_PORT=…`). Probe rápido de que el
server es el nuevo: `curl -i http://127.0.0.1:8788/projects/aiw-console/__project-console/roadmap/edit`
debe responder **405 `method_not_allowed`** (no 404).

**Modo edición.**
1. Abre `AIW Console` en el menú → pestaña **Roadmap** → botón **Edit roadmap** (ya visible, a la
   derecha de los subtabs) → clic: pasa a **"Editing on"** y aparecen botones Edit/Add run en el
   árbol y en el drawer de cada run.
2. **Edición de prueba sugerida (reversible):** subview Roadmap → Edit en el objetivo `O0` →
   cambia el Title (p.ej. añade ` [QA]`) → **Preview all changes** → revisa el diff Before/After
   → **Confirm and write** → "Applied…". El árbol se re-pinta ya con el cambio.
3. **Verifica el canónico:** `roadmap/roadmap.json` (raíz del repo) contiene el título nuevo — y
   `.project/roadmap.json` y `.project/snapshot.json` también (coherencia automática). Repite la
   edición quitando el ` [QA]` para dejarlo como estaba.
4. Lo mismo en `Cantu Studio`: su canónico es `cantu-studio/.aiw/roadmap/roadmap.json` (otra
   ruta, mismo flujo). En `aiw`, el toggle se niega y dice por qué.
5. **History sync:** pestaña History → **Sync** → "Refreshed", y los commits nuevos aparecen sin
   reiniciar el server (el mensaje "read-only" de antes ya no existe).

**Protecciones que puedes provocar a propósito:** edita el archivo canónico a mano entre un
Preview y su Confirm → la consola responde "The roadmap changed since this preview" y no escribe
(re-lee y vuelve a empezar). Una edición que rompa invariantes (p.ej. mover un run antes de su
dependencia) se rechaza en el Preview con el error del motor, enriquecido.

---

## Estado de completitud

- Bloque A (trasplante con md5, toques enumerados y justificados) — COMPLETO.
- Bloque B (los cinco problemas: motor · gate medido no-por-nombre · ruta canónica = entrada del
  bundle · coherencia automática justificada · guarda de frontera probada) — COMPLETO.
- Bloque C (contrato de las dos rutas + matriz medida) — COMPLETO.
- Bloque D (md5 antes/después en ambos canónicos, QA de navegador, fronteras, aditividad A/B) —
  COMPLETO.
- Bloque E (concurrencia nombrada, con su medición) — COMPLETO.
- Bloque F (151/151; tests nuevos por criterio; pins actualizados con causa; greps) — COMPLETO.
- Bloque G (lo abierto) — COMPLETO.

Ningún bloque quedó "NO ALCANZADO".
