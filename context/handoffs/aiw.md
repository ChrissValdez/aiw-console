# Handoff — hilo `aiw`

> **Reescrito el 2026-08-06 (sesión de Cowork, modo CONECTADO).** Sustituye al del mismo
> día escrito en modo ESPEJO. **La sesión siguiente abre en una LAPTOP NUEVA**, así que
> §1 es una sección de mudanza y es lo primero que hay que leer después de §0.
>
> Toda cifra lleva su hora de medición. Se re-mide en el punto de uso, no al abrir.
> **La sustancia va DENTRO**: `context/aiw-console/records/` no llega al knowledge.

---

## 0. LO PRIMERO — y el handoff anterior se equivocaba aquí

**El comando que el handoff anterior prescribía NO EXISTE.** Medido con git 2.34.1:

```
git status --porcelain --ignore-cr-at-eol
→ error: unknown option `ignore-cr-at-eol'
```

`--ignore-cr-at-eol` es opción de `git diff`, **no de `git status`**. La guarda que el
relevo anterior mandaba escribir habría fallado siempre, y por error de sintaxis, no por
árbol sucio — que es peor, porque parece un fallo real.

**La forma que sí funciona, medida sobre `aiw` el 2026-08-06:**

| lectura | resultado |
|---|---|
| `git status --porcelain` (ingenua, desde Linux) | **119** ficheros — MIENTE |
| **`git -c core.autocrlf=true status --porcelain`** | **0** — limpio, coincide con Windows |
| `git diff --ignore-cr-at-eol --stat` | vacío — correcto |
| `git diff --ignore-cr-at-eol --name-only` | **119 — TAMBIÉN MIENTE** |

**Trampa nueva y no obvia: `--name-only` no respeta los flags de whitespace.** Una guarda
construida sobre él engaña igual que la ingenua.

**Regla: toda lectura de `git status` de `aiw` o `aiw-console` va con
`-c core.autocrlf=true`, y la cabina declara cuál de las dos lecturas está dando.**

### Dos capacidades que la tabla fechada declara MAL

Probadas el 2026-08-06 en Cowork. **Gana la prueba, no la tabla.**

| lo que dice `D-064` | lo que midió la prueba |
|---|---|
| «`.git` no es escribible» | **SÍ es escribible.** `touch aiw/.git/_probe` funcionó; `git commit` solo falló por identidad de autor sin configurar |
| (no lo declara) | **el CLI `claude` está presente** — 2.1.221. El kernel podría invocar executor y reviewer desde la cabina |

**Sigue confirmado que la cabina NO puede BORRAR:** `rm` devuelve *«Operation not
permitted»* dentro y fuera de los repos. Esta sesión dejó tres ficheros por eso; ver §10.

**Consecuencia dura: la cabina NO sondea dentro de un repo.** Esta sesión lo hizo y dejó
`objectives/pending/_probe.md`, que `queue.mjs` habría levantado e intentado ejecutar como
objetivo. Los sondeos van a `_scratch\`.

### ⚠ UN `git status` DE LA CABINA PUEDE DEJAR UN `index.lock` HUÉRFANO

**Medido el 2026-08-06, y costó una tanda entera de commits.** La cabina corrió un bucle de
`git status --porcelain` sobre los cinco repos en una sola llamada; la llamada **se pasó del
límite de tiempo y la mataron a media operación**. `git status` refresca el índice y para eso
toma `.git/index.lock`; al morir el proceso, **los cinco repos quedaron con un `index.lock`
de 0 bytes**, y todo `git add` y `git commit` del operador falló con
*«Another git process seems to be running»*.

**Y la cabina NO PUEDE BORRARLOS.** Los tuvo que quitar el operador.

**Reglas que salen de esto, las tres:**

1. **Un `git status` sobre los cinco repos NO va en una sola llamada.** Se parte, y
   `cantu-quizzes-latex` va solo — son 322 MB y 1 398 ficheros trackeados; es el lento.
2. **Todo `git` de la cabina va con `timeout` explícito por repo**, más corto que el límite
   de la llamada, para que muera limpio en vez de que lo maten.
3. **Antes de entregar cualquier bloque de Git, la cabina comprueba que no hay
   `.git/index.lock` en ningún repo que el bloque toque**, y si lo hay lo lista con ruta
   completa para que el operador lo borre **dentro del mismo bloque, antes del `add`**.

---

## 1. LA MUDANZA — lo que la laptop nueva necesita, medido

**Al 2026-08-06 los cinco repos están empujados: `ahead=0` en todos.** Lo único que no
viaja es lo que esté sucio o sin trackear, más lo que vive fuera de los repos.

### Remotos (todo clonable)

    aiw                    https://github.com/ChrissValdez/aiw.git
    aiw-console            https://github.com/ChrissValdez/aiw-console.git
    cantu-studio           https://github.com/ChrissValdez/cantu-studio.git
    cantu-lessons          https://github.com/ChrissValdez/cantu-lessons.git
    cantu-quizzes-latex    https://github.com/ChrissValdez/cantu-quizzes-latex.git

### ⚠ TRAMPA 1 — `aiw` y `aiw-console` NO tienen `.gitattributes`

Los otros tres sí (`* text=auto`). **Un clon fresco de `aiw` o `aiw-console` en una máquina
con otro `core.autocrlf` produce bytes distintos en el árbol de trabajo.**

**Y está medido que esto ya rompió algo real:** el commit `5ce887a` de `aiw-console`
documenta que un `git checkout` con `core.autocrlf` activo y sin `.gitattributes` reescribió
el canónico a CRLF y puso rojo el pin de fines de línea de `tests/roadmap-engine.test.mjs`,
que exige que los dos canónicos difieran en EOL. **En la laptop nueva esto muerde el primer
día.** Que ambos repos ganen `.gitattributes` es run con dueño en `aiw-console`; se NOMBRA
aquí y no se corrige desde este hilo.

**Corolario permanente: `git checkout` no se usa para deshacer en este workspace.** Respaldo
byte a byte fuera del repo antes de escribir, y restaurar de ahí.

### ⚠ TRAMPA 2 — `aiw/config.json` tiene rutas ABSOLUTAS de Windows

    "sandbox": "C:\\Users\\chris\\Documents\\AIW_Workspace\\aiw\\sandbox"
    "console": "C:\\Users\\chris\\Documents\\AIW_Workspace\\projects\\aiw-console"

**Si en la laptop nueva el usuario o la ruta del workspace cambian, el kernel aborta** en
`kernel.mjs:286` con *«Target repo path does not exist»*. Hay que editarlo a mano allá.

**Y el `path` de `sandbox` YA no existe en disco ni en esta máquina** — abortaría hoy si
alguien lo apuntara.

*(La clave es `path`, no `root`. El kernel la lee como `project.path` en `kernel.mjs:276`.
Un ticket viejo de esta cabina la llamó `root` por copiarla de un audit en vez de medirla.)*

### ⚠ TRAMPA 3 — el toolchain que el kernel necesita

- **`claude` CLI** — el kernel lo invoca para executor y reviewer (`invokeClaude`).
- **LaTeX, si CQL va a ser blanco.** Medido: los documentos de `cantu-quizzes-latex` exigen
  **32 paquetes**, de los cuales **5 no están en una instalación base**: `fontawesome`,
  `montserrat`, `eulervm`, `newpxmath`, `newpxtext`. En la máquina del operador están —
  compila y tiene los PDFs. **En un TeX Live recién instalado, probablemente no.**
  Sin ellos, `D-012` (`kernel.mjs:328`) aborta con *«red baseline: human intervention
  required»* y el contenido estará perfecto. `latexmk` medido en Windows: **4.88**.
- **La dependencia de paquetes NO está declarada en ningún sitio del repo de CQL.** Es
  hallazgo que le corresponde a su hilo; se nombra aquí porque es prerequisito de `aiw`.

### ⚠ TRAMPA 4 — lo que NO viaja por git

**`_scratch\` y `_backups\` están fuera de todos los repos.** Al 2026-08-06:

- `_scratch\` — 12 ficheros, entre ellos `AIW-22-PREFLIGHT.md` (52 KB),
  `AIW-CONST4-HECHOS.md` (88 KB), `AIW-21-CORPUS.md` (los 21 textos verbatim) y los scripts
  de consola de otros hilos (`abrir-47.mjs`, `abrir-48.mjs`, `cerrar-47.mjs`).
- `_backups\` — 8 respaldos de canónico más `_backups\aiw-console\` con 6 más.

**Si valen algo, se copian a mano. Git no los lleva.**

### ⚠ TRAMPA 5 — trabajo SIN COMMITEAR que se perdería

Medido el 2026-08-06 con la lectura `autocrlf`:

| repo | sucio | qué es |
|---|---|---|
| `aiw` | 6 | 5 de `.project/` (re-emisión) + `_probe.md` de esta cabina |
| `aiw-console` | 8 | **motor de LOTES a medio hacer**: `roadmap-core.mjs`, `roadmap-plan.mjs`, `project-console.js`, `projector/project.mjs`, `roadmap-engine.test.mjs`, más un record y `tests/fixtures/batches/` **sin trackear** |
| `cantu-studio` | 0 | limpio |
| `cantu-lessons` | 1 | `drafts/web/test/test/test.web.draft.json` |
| `cantu-quizzes-latex` | 10 | **el piloto de fracciones EN CURSO** (`ARI-FA-Fracciones-01/02/03`) + `.project/` + artefactos de build |

**Dos repos tienen trabajo EN VUELO.** Commitear a ciegas commitea trabajo a medias. La
decisión es de cada hilo, no de éste.

---

## 2. ESTADO DE `aiw` — medido el 2026-08-06

| | |
|---|---|
| HEAD | **`5d2c9ef`** = `origin/main`, `ahead=0` |
| árbol | limpio salvo `.project/` y `_probe.md` (lectura `autocrlf`) |
| runs | **46 — 25 `completed`, 20 `planned`, 1 `active`** |
| `queue_order` | denso, único, `1..46` |
| aristas `depends_on` | 21, **0 colgantes** |
| canónico | `aiw/roadmap/roadmap.json`, **CRLF en disco** |
| md5 canónico | `ce7a9f7b0feed3651ddb0bd18f2680e1` (bytes CRLF) · normalizado a LF: `a57601a710b591dc0484577393163f9b` |
| último commit del canónico | `6383e51` (2026-08-04) |

**Corrección al relevo anterior:** decía «21 `planned`, 0 `active` en el canónico» y se
contradecía con su propia §2. **El 21 es el conteo de VIVOS** (20 `planned` + 1 `active`).
Su md5 estaba vencido.

**El md5 del canónico depende del EOL.** Un md5 pelado no es comparable entre una cabina
Linux y Windows. **Declarar siempre cuál se da.**

---

## 3. `#22` — sigue `active` y sigue sin correr

**`#22` «Run the first real objective against a large repository with a test net»**
(`RUN-AIW-REAL-LOAD-MEASUREMENT-001`, `deps=0`, `correctness_model=SPECIFIED`, **sin `lane`
declarado en el canónico** — el campo no existe en ese run).

**Verificado el 2026-08-06:** `locks/` **no existe** como directorio (el relevo anterior
decía «vacío»), no hay `logs/007*`, y **no hay ninguna rama `aiw/007*`** en `aiw-console`
— solo `main`. **No se lanzó.**

**El operador decidió DEJARLO `active`.** Queda anotado que el canónico afirma que hay un
taller trabajando y no lo hay. `D-064` concede a la cabina `planned → active` y
`active → completed`, **no** el sentido contrario: revertirlo exige palabra del operador.

**El objetivo sigue intacto:** `aiw/objectives/pending/007-console-closure-mode-row-tag.md`,
**7 080 bytes, md5 `fb2aabbe6897c8de4f1a19637ce0ec76`**, trackeado por git.

**El trabajo que ordena SIGUE PENDIENTE — medido, no supuesto.** `v3RunRowTags` vive en
`project-console/assets/project-console.js:3419`; empuja la etiqueta de `severity` en
`:3433`; **no hay ningún `tags.push` de `closure_mode`**. `closure_mode` aparece 8 veces en
el fichero, ninguna dentro de esa función. Coordenadas al 2026-08-06: función `3419`,
llamadas `3449` y `4521`, y el comentario en `3169` que no es llamada.
**La función se ancla por NOMBRE, nunca por línea.**

**⚠ AVISO: `project-console.js` está SUCIO ahora mismo** por el motor de lotes de otro hilo.
Cuando se relance el `007`, **estas coordenadas hay que volver a derivarlas**, y el último
commit que tocó el fichero ya no será `6ee3277`.

**Las cuatro condiciones para relanzar, y ninguna se cree, se miden:** `aiw` limpio,
`aiw-console` limpio, sin rama `aiw/007*`, y ventana concedida. **Al 2026-08-06 fallan dos:**
`aiw-console` está sucio y no hay ventana. Por `D-063(a)` la ventana se verifica por el
**último commit que tocó los ficheros del alcance**, no por el HEAD.

**Verificación del objetivo, tras dos enmiendas:** «`npm test` no gana ningún fallo nuevo
respecto a la línea base», nunca «suite verde». La línea base son **dos** fallos
preexistentes: `tests/roadmap-engine.test.mjs:93` y
`tests/classification-care-budget.test.mjs:153`. Ambos ficheros, más `.gitattributes`,
**PROHIBIDOS al ejecutor** — `roadmap-engine.test.mjs` mide normalización de EOL, así que
dejarlo abierto permitiría fabricar un verde cambiando la normalización en vez del test.
**El primero no es deuda: es un pin de registro deliberado** (`D-063(c)`).

---

## 4. EL HALLAZGO GRANDE DE ESTA SESIÓN: el kernel no conoce ningún roadmap

**Medido:** `grep` de `roadmap`, `run_id`, `queue_order`, `depends_on`, `closure_mode` y
`correctness_model` sobre `kernel.mjs` **y** `queue.mjs` → **cero apariciones**. Lo único que
el kernel lee de configuración es `config.json`, por la clave que el objetivo declara en
`# Project` (`kernel.mjs:274`).

**Lo que el kernel come es un `.md` escrito a mano.** `parseObjective` entiende siete
secciones y ninguna es `run_id`: `# Project`, `# Objective`, `# Acceptance criteria`,
`# Scope`, `# Out of scope`, `# Max rounds`, `# Verification`. Plantilla en
`aiw/templates/objective.md`.

**`queue.mjs` son 69 líneas.** `readdirSync(pending).filter(.md).sort()` — **ordena NOMBRES
DE FICHERO**, secuencialmente. Un fallo NO detiene la cola. Archiva a
`processed/<ESTADO>-<nombre>.md`, con `git mv` si el objetivo está trackeado (`D-024`).
Historia real: 13 objetivos procesados, 10 `APPROVED`, 2 `HUMAN_REVIEW`, 1 `ERROR`.

**Consecuencia operativa: el orden de ejecución lo fija el NOMBRE que la cabina elige.**
Con relleno de tres dígitos (`cql-003-…`, `cql-042-…`) el orden alfabético **es** el
`queue_order`. **Sin relleno se rompe: `cql-10` va antes que `cql-9`.**

### El kernel NUNCA cierra nada — todo es ya semi-atendido

- **No mergea.** Deja el trabajo en la rama `aiw/<id>` y devuelve el árbol a la base
  (`:450-458`), y solo si está limpio.
- Emite `APPROVED`(0), `BLOCKED`(3), `HUMAN_REVIEW`(2 y 4). Nada más.
- En `BLOCKED`/`HUMAN_REVIEW` escribe `proposed_followup.md`, cuya última línea es literal:
  *«(Draft generated by the kernel; the human decides.)»*
- Y no toca ningún roadmap, porque no sabe que existen.

**Entonces hoy no existe la distinción unattended / semi-attended en el kernel: TODO es
semi-attended.** Lo que falta no es cómo frenar los semi-atendidos antes de cerrar — eso ya
pasa siempre. Lo que falta es cómo **cerrar** los desatendidos.

### Lo que falta tiene nombre y es `#31`

**`#31` «The intake: turn a roadmap run into an executable contract»** es exactamente «que
el kernel ejecute los runs de un roadmap ajeno». Está detenido por `CONST §4` con
adjudicación **abierta desde el 2026-07-28**, verbatim:

> *«Whether section 4 reaches a new component that translates roadmap into contract […] IS
> AN OPEN QUESTION THAT MUST BE SETTLED IN DECISIONES.md BEFORE THIS RUN EXECUTES.»*

Y su propio texto trae el argumento a favor: *«D-055 defines mechanism as code or a new step
in aiw — kernel, queue, launchers, guards — AND AN INTAKE IS NONE OF THOSE FOUR.»*

**Solo el operador puede cerrarla.** Es la razón de fondo de que `aiw` parezca parado.

---

## 5. CQL COMO BLANCO — el plan acordado con el operador el 2026-08-06

### Su roadmap, medido a las 13:24 CST

**42 runs, los 42 clasificados completos.** Corriendo su módulo de derivación
(`aiw-console/tools/classification/classification.mjs`) sobre los 42:
**41 `SEMI_ATTENDED` · 1 `ATTENDED`** (el `#2`, piloto de fracciones, `JUDGED_DEFINES` +
`CRITICAL`). Los 40 de revisión son `JUDGED_ACCEPTS` + `FUNCTIONAL` + `LOCAL` + `SILENT`.

**Solo dos aristas:** `#7` y `#37`, ambas de `#1` («Repair the two misspelled code
families»). Todos los demás `deps=0` — lote limpio.

`SEMI_ATTENDED` **NO se puede declarar: es derivado y nunca se almacena**
(`project-console.js:79`; el test `classification-transport-and-console.test.mjs:182` aborta
si un run lo transporta). Sale de `correctness_model` + `severity`.

### El reparto que el operador aprobó

| paso | quién |
|---|---|
| Registrar CQL en `aiw/config.json` | **este hilo** — una línea, sin mecanismo, sin `CONST §4` |
| Escribir un `.md` de objetivo por run, derivado del canónico de CQL | **este hilo** |
| Correr `node queue.mjs` | **el operador**, en su máquina |
| Leer logs, ramas y diffs; medir y reportar | **este hilo**, desde disco |
| QA y cerrar los runs en la consola de CQL | el operador + **el hilo de CQL** |

**Por qué `queue.mjs` corre en la máquina del operador y no en la cabina: es una medición,
no una regla.** El TeX Live de la cabina está incompleto (le faltan los 5 paquetes de §1),
así que `D-012` abortaría con baseline roja siempre. En la del operador, verde.

**`verification` NO está limitado a `npm test`.** El relevo anterior lo afirmaba y era
demasiado fuerte. Medido: `execProc` hace `spawn(..., { shell: true })` (`kernel.mjs:100`),
así que es **una cadena de shell cualquiera**; y `kernel.mjs:278` lee
`obj.verification || project.verification`, o sea **un objetivo puede traer la suya**. Que
`aiw` acepte una compilación de LaTeX **no es mecanismo y no cuesta una línea de kernel.**

### Lo que dispara el trabajo de este hilo

**Una sola cosa: `O2` de CQL cerrado, con el comando de verificación VERDE en la máquina del
operador.** Sin eso no se registra CQL: registrarlo sin verificación solo cambia un error
por otro. Y hacen falta dos datos de su hilo:

1. **el comando exacto**, tal cual se teclea — va literal en el `# Verification`;
2. **qué queda en el `.gitignore`** — de ahí salen los globs del `# Scope`.

**Bloqueo medido que su hilo debe cerrar antes:** CQL **no tiene `.gitignore`** y tiene
**24 artefactos de build trackeados** (4 cada uno de `.aux`, `.log`, `.out`, `.synctex.gz`,
`.pdf`, `.auxlock`). El acto de verificar reescribe ficheros versionados, el guard de
alcance los ve fuera de scope y mata el run con `BLOCKED_SCOPE` **en la ronda 1, siempre**.

### Y el piloto no se salta

**`#3` va SOLO.** Es el primer objetivo que traduce un run de otro repo a un contrato del
kernel, y lo que se le pide no es la revisión de Operaciones Aritméticas sino **un veredicto
sobre la plantilla**: qué campo no se supo derivar, qué alcance quedó ambiguo, qué le faltó.
Después, lotes, heredando sus resoluciones y reportando solo huecos NUEVOS.

**Y el trabajo manual de escribir esos 40 ficheros es el incidente con sus cuatro campos que
desbloquea `#31`.** No hay que inventarlo: sale de correr el camino manual una vez.

---

## 6. LA COMPUERTA `CONST §4` — re-confirmada contra disco el 2026-08-06

`CONST §4` (`aiw/CONSTITUCION.md:29-33`) exige, para todo run que añada mecanismo: incidente
con cuatro campos, criterio de borrado en forma «se elimina si X», y presupuesto de líneas.
**Techo verbatim: *«Techo duro del kernel: ~500 líneas. Para añadir, se borra.»*
`kernel.mjs` = 478 líneas → 22 de holgura.** El enforcement es humano y documental: ningún
test lo verifica.

**El reparto 8 no detenidos / 13 detenidos SE CONFIRMA.**

⚠ **Cuidado al re-medirlo con `grep`: casi lo reporto mal.** Un patrón sobre
«MECHANISM, INCIDENT PENDING» da **9/12**, porque **`#23` redacta su declaración distinto**
—*«THIS RUN ADDS MECHANISM AND ITS INCIDENT IS PENDING»*—. Leído verbatim, `#23` **sí** está
detenido. **La compuerta se lee verbatim, no por patrón.**

**Los 8 libres:** `#22`, `#30`, `#34`, `#37`, `#40`, `#41`, `#45`, `#46`.
**Los 13 detenidos:** `#23`, `#28`, `#29`, `#31`, `#32`, `#33`, `#35`, `#36`, `#38`, `#39`,
`#42`, `#43`, `#44`.

**Cruzando con `depends_on`: solo DOS ejecutables, `#22` y `#41`,** los dos con `deps=0`.
Once son elegibles por aristas y nueve de ellos los detiene la compuerta.

**El desbloqueo más barato del roadmap sigue en pie:** `#34` tiene sus tres criterios
completos y está detrás de `#33`, al que la compuerta detiene **solo por el criterio de
borrado que falta**; su incidente ya está documentado. **Una entrada de papel abre dos runs.**

**La regla de `human_qa` NO entró en `DECISIONES.md`** — la última entrada es `D-064`. Y es
discutible por una razón más fuerte: **el canónico de `aiw` tiene CERO
`depends_on_human_approved`**. Aunque entre, la elegibilidad de los 21 no se mueve.

---

## 7. HALLAZGOS SUELTOS DE `aiw` — nombrados, sin ticket

1. **`config.json` usa la clave `path`, no `root`** (`kernel.mjs:276`).
2. **El proyecto `sandbox` tiene un `path` que no existe en disco.** Abortaría hoy.
3. **`base_branch` no tiene ninguna validación** y se usa a ciegas en seis sitios
   (`kernel.mjs:312, 318, 333, 393, 435, 457`).
4. **`verification` acepta cualquier cadena de shell** — corrige el §8.4 del relevo anterior,
   que decía lo contrario. **No hace falta trabajo de `aiw` para que CQL sea blanco.**
5. **`aiw` no tiene `.gitattributes`** — ver §0 y §1.
6. **`git_history.json` está ignorado en `aiw`** — `D-053` adjudicación 4 ya ejecutada aquí.
   Si la consola pinta banner de artefacto no cargado, es pulsar Sync History, no avería.
7. **Del `#22`, cuatro de cinco mediciones salen; la quinta no se puede medir.** El marcador
   de truncamiento de diff (`kernel.mjs:394`) entra solo en el prompt del reviewer, y el
   prompt no se escribe nunca a disco (`:402-403` guarda solo la respuesta). **`#22` entrega
   cuatro y declara la quinta como hueco medido. No se añade código para cerrarla** — sería
   mecanismo, y el propio `#22` declara «No mechanism under CONST §4». **El hueco tiene
   destino:** si una ventana real muestra al reviewer bloqueando por diff truncado, eso es el
   incidente con sus cuatro campos.

---

## 8. LOS OTROS HILOS — al 2026-08-06

- **`aiw-console`** en `b2a5079`, **sucio con el motor de LOTES a medio hacer** más
  `tests/fixtures/batches/` sin trackear. Su run que toca `project-console.js` sigue en
  vuelo. En este repo escriben **CUATRO** hilos: **el `git add` va SIEMPRE dirigido a
  ficheros por su nombre, nunca `-A`.**
- **`cantu-studio`** en `0ff12d5`, **limpio**.
- **`cantu-quizzes-latex`** en `23fa94d`, sucio con el **piloto de fracciones en curso**.
- **`cantu-lessons`** en `27f8cdc`, un fichero sucio.

**Decisiones que obligan a este hilo:** `D-062` (contenedor sin runs es válido), `D-063`
(cuarto hilo + los tres acuerdos: ventana por último commit del alcance, criterio «no gana
fallos nuevos», un pin de registro no es deuda) y **`D-064`** (la cabina opera la consola por
defecto; `planned → active` y `active → completed` sin preguntar; estructura con ritual de
cinco puntos; Git nunca).

**Acuerdo pendiente de registrar en `DECISIONES.md`:** el reparto de §5 —quién escribe el
canónico de CQL y quién el de `aiw`—. No se escribió porque `DECISIONES.md` tenía trabajo de
otro hilo sin commitear. **Se registra en cuanto el árbol lo permita.**

---

## 9. LO QUE HACE LA SESIÓN NUEVA, EN ORDEN

1. **Arranque:** declarar hilo, derivar la ruta de montaje —**cambia entre sesiones y con la
   máquina; no se hereda de nada**—, probar capacidad y leer este handoff desde disco
   contrastando cifras contra el canónico. **Gana el disco.**
2. **Recorrer la §1 entera antes de tocar nada.** Es una máquina nueva: las rutas de
   `config.json`, el `.gitattributes` que falta y los paquetes de TeX son fallos de arranque,
   no de trabajo.
3. **Re-medir el árbol de los cinco repos con `-c core.autocrlf=true`** y declarar la lectura.
4. **Comprobar si `O2` de CQL está cerrado y verde.** Si lo está: registrar CQL en
   `config.json`, dar el parte, y emitir el objetivo de `#3` **solo**, como piloto.
5. **Si `O2` no está listo**, el otro ejecutable de `aiw` es **`#41` «Make the queue survive
   the terminal that launched it»** — `deps=0`, tres criterios de `§4` completos, sin blanco
   externo. **`#22` no se mueve de su posición:** su sitio delante del manifest, las señales
   de media ejecución, los worktrees y las noches desatendidas es correcto.
6. **Adjudicación de `#31` pendiente del operador.** Es el run que más devuelve.

---

## 10. RASTRO DE LA SESIÓN — la cabina no puede borrar

**Dentro de repos (error de esta cabina; sondeó donde no debía):**

    AIW_Workspace\aiw\objectives\pending\_probe.md      ← BORRAR ANTES DE CORRER queue.mjs
    AIW_Workspace\aiw\.git\_probe

**Fuera de repos:**

    AIW_Workspace\_scratch\_cowork_probe_aiw.txt

**El primero urge:** termina en `.md` y está en `objectives/pending/`, así que `queue.mjs`
lo levantaría e intentaría ejecutarlo como objetivo.

Esta sesión **no escribió ningún canónico y no tocó la consola.**
