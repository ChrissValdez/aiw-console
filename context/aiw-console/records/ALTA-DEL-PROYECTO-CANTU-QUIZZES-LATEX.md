# ALTA DEL PROYECTO — `cantu-quizzes-latex`

**Fecha:** 2026-08-05 (las escrituras cayeron entre las 23:57 del 2026-08-04 y las
00:0x del 2026-08-05, hora local; se citan los `mtime` medidos).
**Encargo:** dar de alta un proyecto que entra SIN roadmap, crear su canónico con
**3 objetivos** y **10 fases** y **CERO runs**, y registrarlo en la consola.
**Decisión que lo habilita:** `D-062` (`context/DECISIONES.md:2479-2509`) — «un
contenedor sin runs es VÁLIDO y NO DERIVA NADA». Este canónico la estrena: es el
primer roadmap del taller que nace entero sin un solo run.

**Ficheros escritos — TRES, y ninguno más:**

| # | Ruta | Antes | Después | Vía |
|---|---|---|---|---|
| 1 | `projects/cantu-quizzes-latex/roadmap/roadmap.json` | no existía | 1 686 bytes | 1 escritura a mano (la cáscara, 26 bytes) + **13 operaciones del motor** |
| 2 | `projects/aiw-console/project-console/projects.json` | 252 bytes | 328 bytes | 1 inserción de línea (el motor no tiene op de registro) |
| 3 | `projects/aiw-console/context/aiw-console/records/ALTA-DEL-PROYECTO-CANTU-QUIZZES-LATEX.md` | no existía | este record | — |

**Respaldo (fuera de ambos repos):**
`_backups/aiw-console/projects.json.2026-08-04.pre-alta-cantu-quizzes-latex.bak`
— **252 bytes**, `md5 982f58168dcfa125c56791309f7134cc`,
`sha256 3803947b0331ff54914f3e1085348c0aaa6b4fb7ec6146277a4cc2391aebd3bd`.
`AIW_Workspace/` no es repositorio de git, de modo que `_backups/` queda fuera de
`aiw-console` y de `cantu-quizzes-latex` a la vez.

**Ficheros NO tocados:** ningún otro fichero de `cantu-quizzes-latex` (ni
`.gitattributes`, ni `PAA/`, ni un solo `.tex`); `roadmap/roadmap.json` de
`aiw-console`; `.project/` de nadie; `project-console/assets/project-console.js`;
código, tests y fixtures; `aiw`, `cantu-studio`, `cantu-lessons`. **No se compiló
nada. No se ejecutó git en ninguna forma que escriba** — sólo `git status --porcelain`
y `git log --oneline`, ambos de lectura.

---

## 1. Las tres paradas previas, verificadas antes de escribir un byte

| # | Condición de parada del encargo | Medido | Veredicto |
|---|---|---|---|
| A.1 | `projects/cantu-quizzes-latex` no existe | existe: `ls -la` sobre `AIW_Workspace/projects/` lo lista | **no procede parar** |
| A.1 | árbol de git sucio | `git status --porcelain=v1` en ese repo → **0 líneas**; `git rev-parse --show-toplevel` confirma que es su propio toplevel | **limpio** |
| A.1 | ya tiene `roadmap/` | `find … -maxdepth 3 -name "roadmap*" -not -path "*/.git/*"` → **0 resultados** | **no existía** |
| A.2 | ya está registrado | `project-console/projects.json` traía **3 entradas** (`aiw-console`, `cantu-studio`, `aiw`); `cantu-quizzes-latex` no aparecía | **no registrado** |

Estado del repo destino en el momento del alta: **2 commits** (`git log --oneline`:
`54ca715 create repo with PAA content`, `d47b3e8 Initial commit`), **1 fichero** en
raíz (`.gitattributes`, 66 bytes) y **1 directorio** (`PAA/`, con `Banco de
Preguntas`, `Examen Diagnostico`, `Examen Simulador`).

---

## 2. La forma mínima, DERIVADA DEL CÓDIGO

No se copió del encargo. Se leyeron las dos puertas y después se ejecutó una
derivación en proceso que las importa y les pasa objetos en memoria
(`node scratchpad/derive-min-shell.mjs`, **ninguna escritura**).

### 2.1 Las dos puertas, con su cita

**Puerta de forma** — `hasRoadmapTreeShape`, `tools/projector/project.mjs:902-918`.
Es la única función que decide que una raíz es una raíz `roadmap_tree`
(`project.mjs:930-939`, `detectRootLayout`). Exige, literalmente:

- la raíz es un objeto no nulo y `objectives` es un array (`:903`);
- y **todo** objetivo/fase/run que haya está identificado y, el run, con `status`
  (`:905-917`).

Con `objectives: []` el `every()` es **verdadero por vacuidad** y la puerta se pasa
sin más campos de raíz.

**`checkInvariants`** — `tools/roadmap/roadmap-core.mjs:364-731`. Sobre la raíz sólo
hace dos cosas:

- **lista blanca de claves** (`:372-376`) contra `ROOT_ALLOWED_FIELDS`
  (`roadmap-core.mjs:69`) = **6 claves admitidas**: `schema_version`, `roadmap_id`,
  `title`, `objectives`, `lanes`, `care_budget`;
- **`objectives` debe ser un array** (`:377-380`), y ése es el **único** campo de raíz
  cuya ausencia o mal tipo produce error. `lanes` y `care_budget` están explícitamente
  puertas adentro de un `in` (`:388`, `:437`): ausentes es el caso normal.

**Ninguno de los otros cinco campos de raíz es requerido por ninguna de las dos
puertas.** `schema_version` ausente no es un hueco: `declaredRoadmapModel`
(`project.mjs:924-928`) acredita al árbol conforme que no se nombra con el
identificador del propio contrato, `roadmap_tree_v1` — «the shape was verified, so
naming it is a measurement, not an invention».

### 2.2 La tabla que lo derivó

Salida literal de `node derive-min-shell.mjs`:

```
candidate                        | shapeGate | checkInvariants
---------------------------------|-----------|----------------
{}                               | false     | 1 err: root.objectives must be an array
{"objectives":[]}                | true      | 0 errors
{"objectives":{}}                | false     | 1 err: root.objectives must be an array
[]                               | false     | 1 err: roadmap root is not an object
{sv, objectives}                 | true      | 0 errors
{sv, roadmap_id, title, objs}    | true      | 0 errors
{"objectives":[], "extra":1}     | true      | 1 err: root carries unexpected field extra; …
```

**Forma mínima derivada: `{"objectives": []}` — 1 clave de raíz, 0 objetivos, 0 fases,
0 runs.** Es el mínimo por construcción: quitarle la única clave la tumba (fila 1) y
cambiarle el tipo también (fila 3); añadir cualquier clave fuera de la lista blanca la
tumba (fila 7).

**Corroboración independiente, no fuente:** la medición previa
`MEDICION-ALTA-DE-PROYECTO-NUEVO.md:214-215` llegó al mismo mínimo el 2026-08-04
(«un archivo en `roadmap/roadmap.json` con `{"objectives": []}`»). La discrepancia que
aquel record levantó en su A.4 —el contrato declaraba MALFORMADO lo que el código
acepta— es exactamente la que `D-062` adjudicó a favor del código.

### 2.3 Lo que el mínimo NO pasa, declarado

`tools/project-console/validate-project-console-state.mjs:1594-1611`
(`assertRoadmapV3Source`) sí exige 4 campos de raíz, `schema_version ===
"jame.roadmap_v3.v0.2-progress"` y `objectives` no vacío. **No es puerta de este
canónico ni de ninguno de los de este taller**: el canónico de `aiw-console` declara
`roadmap_tree_v1` (medido) y por tanto tampoco pasaría ese chequeo. Ese validador es
el transplantado del proyecto de origen; la autoridad de escritura del motor es otra
—§4.2— y es la que se usó.

---

## 3. La cáscara — la ÚNICA escritura a mano del canónico, declarada

`projects/cantu-quizzes-latex/roadmap/roadmap.json` se creó con la forma de §2.2 y
**cero objetivos**. Está autorizada por el encargo y sólo por una razón: **el motor no
tiene camino hasta un proyecto que todavía no existe** — `planEdit` empieza por
`core.loadRaw(filePath)` (`tools/roadmap/roadmap-plan.mjs:260-266`) y sin fichero
devuelve `stage: "read"`, y el registro sólo admite raíces que un layout ya reclame
(`project-console/serve.mjs:395-401`), cosa que exige el fichero. Es un problema de
arranque, no una excepción de estilo.

Los bytes no se teclearon: se produjeron con el serializador del propio motor,
`core.serialize(obj, "\r\n")` (`roadmap-core.mjs:202-204`), para que el fichero naciera
byte-idéntico a lo que el motor habría escrito.

- **26 bytes**, `md5 9963b81590a41590126788abcfb1e7a0`.
- Contenido exacto: `"{\r\n  \"objectives\": []\r\n}\r\n"`.
- **EOL: CRLF**, decidido por analogía medida, no por gusto: los dos canónicos vivos
  son CRLF (`aiw-console/roadmap/roadmap.json` y
  `cantu-studio/.aiw/roadmap/roadmap.json`, medidos), y CRLF es además el valor por
  defecto de `serialize` (`roadmap-core.mjs:202`). `detectEol`
  (`roadmap-core.mjs:208-210`) lo redetecta en cada operación posterior.
- Verificado en el acto sobre el fichero ya en disco: `hasRoadmapTreeShape` →
  **`true`**; `checkInvariants` → **0 errores**.

**A partir de aquí no se hand-editeó nada del canónico, con ningún pretexto.**

---

## 4. El registro — +1 entrada, ninguna existente tocada

### 4.1 La analogía, verificada leyendo el fichero y el resolutor

La `root` se resuelve **relativa a la carpeta del registro**, es decir a
`project-console/`: `serve.mjs:197` (`const registryDir = dirname(path)`) y
`serve.mjs:203` (`entries.set(key, resolve(registryDir, root))`). La entrada de
`cantu-studio` era `"root": "../../cantu-studio"` y `cantu-studio` vive en
`AIW_Workspace/projects/cantu-studio`; desde
`projects/aiw-console/project-console/` esa cadena resuelve exactamente ahí.
**La analogía encaja**, así que la entrada nueva es `"../../cantu-quizzes-latex"`.

Comprobado por ejecución, no por aritmética mental
(`node check-layout-and-registry.mjs`, que aplica la regla de `serve.mjs:203`):

| key | `root` en el fichero | resuelve a | existe |
|---|---|---|---|
| `aiw-console` | `..` | `…\projects\aiw-console` | sí |
| `cantu-studio` | `../../cantu-studio` | `…\projects\cantu-studio` | sí |
| **`cantu-quizzes-latex`** | **`../../cantu-quizzes-latex`** | **`…\projects\cantu-quizzes-latex`** | **sí** |
| `aiw` | `../../../aiw` | `…\AIW_Workspace\aiw` | sí |

La `key` casa el patrón exigido `/^[A-Za-z0-9][A-Za-z0-9._-]*$/` (`serve.mjs:175`).

### 4.2 La inserción

La entrada nueva se insertó **antes** de la línea de `aiw` (queda `projects.json:7`),
no al final del array. La razón es medible: al final habría habido que añadir una coma
a la línea de `aiw`, y eso es **tocar una entrada existente**. Insertando antes,
**ninguna de las tres líneas preexistentes cambia un solo byte**, y de paso el kernel
`aiw` sigue cerrando la lista tras los repos de `projects/`.

```json
{ "registry_model": "project_registry_v1",
  "title": "AIW Console",
  "projects": [ { "key": "aiw-console",         "root": ".." },
                { "key": "cantu-studio",        "root": "../../cantu-studio" },
                { "key": "cantu-quizzes-latex", "root": "../../cantu-quizzes-latex" },
                { "key": "aiw",                 "root": "../../../aiw" } ] }
```

Esta escritura no pasa por el motor porque **el motor no tiene operación de registro**:
`KNOWN_OPS` (`roadmap-plan.mjs:29`) enumera **21 operaciones**, todas sobre el árbol de
un roadmap, y ninguna toca `projects.json`. El encargo la autoriza explícitamente.

---

## 5. Las operaciones del motor — 13, todas con dry-run

**Nada de esto se escribió a mano.** Se ejecutó `node engine-ops.mjs`, que reproduce
la secuencia de `project-console/serve.mjs handleRoadmapEdit` (`:418-573`) **sin HTTP y
sin la reemisión de `.project/`** (fuera de alcance por encargo):

1. `planEdit` en seco (`roadmap-plan.mjs:245-328`) → si refutara, parada;
2. `planEdit` otra vez y **compare-and-swap** del `baseline` contra el del dry-run
   (`serve.mjs:527-531`);
3. `applyPlan` (`roadmap-plan.mjs:334-343` → `core.applyWrite`,
   `roadmap-core.mjs:2137-2170`: respaldo en `os.tmpdir()`, fichero temporal, `fsync`,
   `rename` atómico, y **rollback** si el validador refuta), con **el mismo validador
   post-escritura que inyecta la consola** (`serve.mjs:359-374`: relectura + parseo +
   `checkInvariants` + `hasRoadmapTreeShape`).

`externalRunIds` se compuso como lo compone la consola (`serve.mjs:335-352`): **172
run ids** aportados por los otros tres proyectos registrados. Con 0 runs y 0 aristas en
este canónico no cambia ningún veredicto; se pasó igual para no ejecutar una variante
del motor distinta de la real.

### 5.1 Las 13 operaciones, en orden, con sus bytes

| # | op | id | título transcrito | dry-run | bytes tras aplicar |
|---|---|---|---|---|---|
| 01 | `create-objective` | `O1` | The repository stands on its own | ok | 145 |
| 02 | `create-phase` | `O1.P1` | Tree hygiene: what is source and what is product | ok | 301 |
| 03 | `create-phase` | `O1.P2` | Document how this compiles | ok | 428 |
| 04 | `create-phase` | `O1.P3` | One copy of the shared pieces | ok | 558 |
| 05 | `create-objective` | `O2` | A green or a red exists | ok | 665 |
| 06 | `create-phase` | `O2.P1` | Settle what "it compiles" means | ok | 806 |
| 07 | `create-phase` | `O2.P2` | A reproducible toolchain | ok | 931 |
| 08 | `create-phase` | `O2.P3` | The verification command | ok | 1 056 |
| 09 | `create-phase` | `O2.P4` | The Moodle XML branch | ok | 1 178 |
| 10 | `create-objective` | `O3` | The content is legible from outside | ok | 1 297 |
| 11 | `create-phase` | `O3.P1` | The document index | ok | 1 423 |
| 12 | `create-phase` | `O3.P2` | Reconcile product and source | ok | 1 552 |
| 13 | `create-phase` | `O3.P3` | An inventory of the question bank | ok | 1 686 |

**Unidad: 13 operaciones** = 3 `create-objective` + 10 `create-phase`. **13 dry-runs
y 13 aplicaciones**, cada una con su `remap` de **0 filas** (ninguna operación toca
`queue_order`, por construcción: `roadmap-core.mjs:1874-1879` y `:1986-1989`) y
**0 warnings**. Las 13 relecturas devolvieron el mismo veredicto del validador: *«re-read
OK: invariants and tree shape verified on the written file»*.

### 5.2 ⛔ El chequeo que `D-062` declara inexistente: NO EXISTE

El encargo mandaba parar si el motor refutaba una fase sin runs o un objetivo sin runs
—sería la señal de que la adjudicación se hizo sobre una premisa falsa—. **No refutó
ninguna de las 13 veces.** Ni en el `mutate`, ni en el `postcheck`, ni en la relectura
post-escritura. La premisa de `D-062` se sostiene, y ahora con un canónico entero
detrás y no sólo con una lectura de código:

- `createObjective` (`roadmap-core.mjs:2012-2036`) escribe `phases: []` y no siembra
  nada; su comentario `:1991-1995` lo declara: «An empty objective is legal in the v3
  model».
- `createPhase` (`roadmap-core.mjs:1893-1922`) escribe `runs: []` y no siembra nada;
  `:1881-1885`: «An empty phase is legal in the v3 model … Nothing is auto-seeded
  here».
- `checkInvariants` devolvió **0 errores** sobre un árbol de **3 objetivos, 10 fases y
  0 runs** (§6.1).

---

## 6. Verificación

### 6.1 El canónico nuevo

Medido con `node verify.mjs` sobre el fichero en disco:

| Magnitud | Valor | Unidad |
|---|---|---|
| bytes | 1 686 (`md5 a9602463959d0821719f7c523f6011ec`) | bytes |
| EOL | CRLF | — |
| claves de raíz | `["objectives"]` | 1 clave |
| modelo acreditado | `roadmap_tree_v1` (`declaredRoadmapModel`, no declarado en el fichero) | — |
| objetivos | **3** — ids únicos: sí | objetivos |
| fases | **10** — ids únicos: sí | fases |
| runs | **0** | runs |
| `queue_order` | denso 1..0 (vacío) | — |
| runs clasificados | **0** (`isClassified`, `classification.mjs:230-232`) | runs |
| `hasRoadmapTreeShape` | **true** | — |
| `checkInvariants` | **0 errores** | errores |

Reparto de fases por objetivo: `O1` **3**, `O2` **4**, `O3` **3** = **10 fases**. Cada
objetivo lleva exactamente las 3 claves de `OBJECTIVE_REQUIRED_FIELDS`
(`roadmap-core.mjs:81`) y cada fase las 3 de `PHASE_ALLOWED_FIELDS` (`:84`); ninguna
lleva `archived` (`createObjective` no la escribe, `:2002-2006`).

Los 13 títulos se releyeron del disco y se compararon con el encargo: **13 de 13
verbatim**, incluidas las comillas internas de `O2.P1` (`Settle what "it compiles"
means`, almacenado como `"Settle what \"it compiles\" means"`).

### 6.2 El layout lo reclama — y cuál

`detectRootLayout` (`project.mjs:933-939`) sobre la raíz resuelta devuelve **`repo_root`**,
no `null`. Es el primero de los **2 layouts** declarados (`project.mjs:776-793`) y su
clave `roadmap` es `join("roadmap","roadmap.json")` (`:779`), justo donde está el
canónico. Derivados que se fijan con él: `detectRootMode` → **`roadmap_tree`**;
`hasRoadmapTreeShape(layout.tree)` → **true**. El resto del bundle
(`governance/guardrails.json`, `governance/no_claims.json`, `governance/contract.json`,
`docs/docs_index.json`) **no existe** en este repo y degrada a `null` sin romper nada:
sólo la clave `roadmap` es determinante (`project.mjs:934-936`).

### 6.3 `projects.json` contra el respaldo

| Magnitud | Respaldo | Actual |
|---|---|---|
| bytes | 252 | 328 (**+76 bytes**) |
| `md5` | `982f58168dcfa125c56791309f7134cc` | `afe51bc70dab23aa1111aa9f9cd2fec9` |
| entradas | 3 | **4** |
| líneas de contenido | 9 | 10 (**+1 línea**) |

- **Entradas añadidas: 1** — `{"key":"cantu-quizzes-latex","root":"../../cantu-quizzes-latex"}`.
- **Entradas eliminadas: 0.** Las tres preexistentes sobreviven idénticas como valores
  JSON.
- **Líneas del respaldo que ya no aparecen verbatim y en orden: 0.** Es la prueba
  fuerte de «ninguna existente se toca»: no cambió un byte de ninguna de las tres, ni
  siquiera una coma.
- `registry_model` y `title` de la raíz: idénticos.

### 6.4 El canónico de `aiw-console` NO cambió

| Magnitud | Exigido por el encargo | Medido |
|---|---|---|
| runs | 56 | **56** |
| `queue_order` | denso 1..56 | **denso 1..56, sin duplicados** |
| runs clasificados | 13 | **13** |
| `checkInvariants` | sin errores | **0 errores** |

Además, medido: **2 objetivos, 23 fases**, 138 343 bytes,
`md5 f3dcd18a33c95a2cef7fe22233407dc4`, ids únicos en los tres niveles.
`mtime` del fichero: **2026-08-04 15:47:16.234421200 -0600**, anterior a esta sesión
(la primera escritura de este encargo es de las 23:57 del 2026-08-04). Y
`git status --porcelain=v1` en `aiw-console` devuelve **una sola línea**:
`M project-console/projects.json`. En `cantu-quizzes-latex` devuelve **una sola
línea**: `?? roadmap/`.

### 6.5 La suite

`npm test` (= `node --test`) en `projects/aiw-console`:

```
ℹ tests 497   ℹ pass 495   ℹ fail 2   ℹ skipped 0   ℹ duration_ms 4185.6881
```

**Unidad: 497 tests.** Los **2** fallos son **exactamente los dos pines de registro
preexistentes** que el encargo nombra, y **no apareció un tercero**:

1. `tests/classification-care-budget.test.mjs:153` — *«C.3: absent is VALID and is
   today's state»*. Lee **sólo** `aiw-console/roadmap/roadmap.json` (`:156`) y afirma
   `"care_budget" in obj === false` (`:158`). Ese canónico **sí** declara hoy un
   `care_budget` (medido: claves de raíz `["schema_version","roadmap_id","title",
   "care_budget","objectives"]`), escrito el 2026-08-03 (el respaldo
   `_backups/aiw-console/roadmap.json.2026-08-03.pre-clasificacion-qo47.bak` lo fecha).
   **No lee nada que este encargo haya escrito.**
2. `tests/roadmap-engine.test.mjs:93` — *«the two real canonicals do NOT share a
   line-ending convention»*. Recorre `REAL_ROOTS`, que son **dos constantes**:
   `REPO_ROOT` y `SIBLING_ROOT = resolve(REPO_ROOT, "..", "cantu-studio")`
   (`:28`, `:81`). Espera **2** convenciones de EOL distintas y encuentra **1**: ambos
   son CRLF (medido). **`cantu-quizzes-latex` no entra en esa lista** —no se lee del
   registro, está cableada—, así que el alta no puede haber causado ni agravado este
   fallo; y aunque entrara, el canónico nuevo también es CRLF.

Los dos son **pines deliberados**: fallan cuando el mundo se aparta de lo que el record
correspondiente dejó fijado, y su mensaje lo dice con todas las letras («update the
record, keep the test»). **No hay un tercero que registrar.**

Prueba lateral de que la entrada nueva es sana: `tests/shell-model.test.mjs:39-46` lee
**el registro real enviado** (`:40`) y exige 0 errores de parseo y que el orden de las
claves se preserve. **Pasa** con las 4 entradas.

---

## 7. Lo que NO se pudo verificar, y por qué

- **La consola renderizando la tarjeta del proyecto nuevo.** No se levantó el servidor:
  arrancarlo habría disparado la proyección de arranque y con ella la emisión de
  `.project/`, que este encargo pone fuera de alcance («emitir `.project/` de nadie»).
  Lo que sí se verificó es todo aquello de lo que la tarjeta depende: registro
  parseable (§6.5, `shell-model`), `root` resuelta a una carpeta que existe (§4.1),
  layout que la reclama (§6.2) y árbol que pasa la puerta de forma (§6.1).
- **El comportamiento con `.project/` emitido.** No existe: el repo no tiene `.project/`
  y no se creó. Hasta que el operador emita desde la consola, la tarjeta se compondrá
  de lo derivable del canónico.
- **Que los dos pines fallaran ya antes de este encargo, por ejecución.** Comprobarlo
  habría exigido revertir el estado —git que escribe, fuera de alcance—. En su lugar se
  demostró por lectura que **ninguno de los dos lee un fichero que este encargo haya
  tocado** (§6.5): ambos leen canónicos cuyo `mtime` es anterior a la sesión y cuyas
  rutas están cableadas en el test.
- **Los `.tex` y el contenido de `PAA/`.** No se abrieron. Compilar estaba fuera de
  alcance y el inventario del banco es, precisamente, la fase `O3.P3` que este canónico
  acaba de abrir.

**Anotado por honestidad, no es de este encargo:** `cantu-studio` tiene **7 ficheros
modificados y 1 sin seguimiento** sin confirmar, entre ellos su propio
`.aiw/roadmap/roadmap.json` (`mtime` 2026-08-04 23:46:55). Es trabajo vivo de otra
línea, anterior e independiente; este encargo **sólo lo leyó** (para componer los 172
`externalRunIds` y para medir su EOL) y no le escribió un byte.

---

## 8. Estado al cierre

`cantu-quizzes-latex` es el **cuarto proyecto registrado**. Tiene canónico propio con
**3 objetivos, 10 fases y 0 runs**, verde en `checkInvariants`, reclamado por el layout
`repo_root`. No tiene handoff, ni `DECISIONES.md`, ni `CONTRATO.md`, ni `.project/`:
los tres primeros van en el encargo siguiente y el cuarto lo emite el operador desde la
consola.

Lo que queda escrito y no se puede deshacer solo: si alguien borra las 10 fases y los 3
objetivos, el canónico vuelve a `{"objectives": []}` y **sigue siendo válido** —esa es
la letra de `D-062` y este fichero es su primera aplicación de campo.
