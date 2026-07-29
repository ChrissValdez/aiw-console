# DISPOSICIÓN DE LAS CUATRO CARPETAS DE COLA DE AIW

**Fecha:** 2026-07-28 · **Run:** `RUN-AIW-QUEUE-FOLDER-DISPOSITION-001`
(`queue_order` 14, O2/O2.P2) · **Naturaleza:** suprime dos directorios vacíos y sin
trackear dentro de `aiw/objectives/`. **No mueve ningún fichero. No borra ningún
fichero con contenido.** No commitea, no cambia el status de ningún run, no
re-emite `.project/`, no toca `kernel.mjs`, `queue.mjs`, `config.json`, `logs/` ni
`roadmap/`, no toca el proyector de `aiw-console`, no toca `cantu-studio`. ·
**Máquina:** PC (Windows 10, `C:\Users\chris\Documents\AIW_Workspace\`).

## Para qué existe este record

`objectives/` tiene siete carpetas y el proyector recorre tres. Este run decide
**qué pasa con las cuatro que ningún consumidor lee**: `qualification/`,
`queue-e7/`, `prepared/` y `staged/`.

La respuesta corta, y es deliberada: **de los seis tickets, ninguno se movió.** Los
dos directorios vacíos se suprimieron. El encargo pedía ejecutar solo lo
inequívoco y declarar el resto, y al medirlo resultó que **lo inequívoco eran las
dos carpetas vacías y nada más**. La razón de cada quieto está escrita abajo, con
el run que lo resolverá.

El `run_id` no se tecleó de memoria: se derivó leyendo `aiw/roadmap/roadmap.json`,
recorriendo `objectives[].phases[].runs[]`, tomando el nodo de `queue_order` **14**
y comprobando que su `title` es exactamente `Resolve what happens to the four queue
folders the console cannot see`. La comprobación dio **`true`**. El canónico
contiene **42 runs** en total.

---

## Frontera de entrada

**HEAD de `aiw`:** `d312c8375c4d6d12538fdc6034cfbde9ed84e634` — invariante durante
todo el trabajo (no se commiteó).

**Estado del run 14 en el canónico al abrir:** `"active"`. Guarda satisfecha (el
criterio admitía `active` o `completed`; `planned` habría obligado a parar).

`git status --porcelain` **antes**:

```
 M .project/roadmap.json
 M .project/snapshot.json
 M roadmap/roadmap.json
?? .project/docs_index.json
?? .project/git_history.json
```

Cinco líneas, todas bajo `roadmap/` o `.project/`. **Ninguna otra cosa.** Es la
*suciedad de apertura* que `RECONCILIACION-COLA-AIW.md` ya caracterizó: no es
anomalía del árbol, es el estado normal bajo el ciclo vigente, porque el operador
abre el run en la consola antes de lanzar el taller y la consola escribe el
canónico y re-emite sin commitear. La guarda pasó sin necesidad de enmienda.

---

## 1. La tabla — una fila por ticket, medida columna a columna

Seis tickets en las dos carpetas con contenido. `prepared/` y `staged/` no aportan
filas porque están vacías (§4).

Método de cada columna: **bytes y md5** de `fs.readFileSync` sobre el archivo real;
**trackeado** con `git ls-files --error-unmatch`; **parsea** ejecutando el
`parseObjective` real importado de `aiw/kernel.mjs` (import puro del módulo — el
guard de entry-point de `kernel.mjs:470` impide que el import corra `main()`);
**gemelo** y **log** resueltos **por nombre**, nunca por número.

| # | Ruta | Bytes | md5 | ¿Trackeado? | ¿Parsea hoy? | ¿Gemelo en `processed/`? | ¿Carpeta en `logs/`? | `# Project` | ¿En `config.json`? |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `objectives/qualification/e5-secreto.md` | 540 | `8d815a66…59c` | **sí** | **NO** — abort | **NINGUNO** | **NINGUNA** | `sandbox` | **sí** |
| 2 | `objectives/qualification/e6-changes-requerido.md` | 657 | `8623b70e…20c` | **sí** | **NO** — abort | **NINGUNO** | **NINGUNA** | `sandbox` | **sí** |
| 3 | `objectives/qualification/e8-multiarchivo.md` | 722 | `01e8db68…7a1` | **sí** | **NO** — abort | **NINGUNO** | **NINGUNA** | `sandbox` | **sí** |
| 4 | `objectives/queue-e7/a-resta.md` | 421 | `f7fd0120…52a` | **sí** | **NO** — abort | **`APPROVED-a-resta.md`** | **NINGUNA** | `sandbox` | **sí** |
| 5 | `objectives/queue-e7/b-multiplica.md` | 437 | `efdfeb2c…420` | **sí** | **NO** — abort | **`APPROVED-b-multiplica.md`** | **NINGUNA** | `sandbox` | **sí** |
| 6 | `objectives/queue-e7/c-imposible.md` | 542 | `62c571fd…59c` | **sí** | **NO** — abort | **`HUMAN_REVIEW-c-imposible.md`** | **NINGUNA** | `sandbox` | **sí** |

md5 completos, medidos antes y después del trabajo (§7):

```
8d815a66696ef300af29611854dd759c  qualification/e5-secreto.md
8623b70eea2d3b069e32e3f500bc20c2  qualification/e6-changes-requerido.md
01e8db680907fb8b61c25539b56787a1  qualification/e8-multiarchivo.md
f7fd01200b207a71e17c96d424481a52  queue-e7/a-resta.md
efdfeb2cbbc83308334bb8519e92e420  queue-e7/b-multiplica.md
62c571fd9779dddeab398999013059c2  queue-e7/c-imposible.md
```

### 1.a Dónde y por qué aborta el parser — los seis, idénticamente

Los seis abortan en **`kernel.mjs:147`**, columna 29. Traza real capturada del
`e.stack` de cada ejecución: `kernel.mjs:147:29`, las seis veces. Mensaje, también
las seis veces literal:

> `objective.md invalid: missing required sections: project, objective, criteria. See templates/objective.md`

La cadena causal, citada del código:

```js
// kernel.mjs:119
const stripAccents = (s) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().trim();

// kernel.mjs:133 — indexa cada H1 por su heading normalizado
if (m) { key = stripAccents(m[1]); sec[key] = []; continue; }

// kernel.mjs:138-140 — pero busca las claves en INGLÉS
project:   text('project').split(/\r?\n/)[0].trim(),
objective: text('objective'),
criteria:  text('acceptance criteria'),

// kernel.mjs:146-147 — y aborta si falta cualquiera de las tres
const missing = ['project', 'objective', 'criteria'].filter((k) => !obj[k]);
if (missing.length) throw new Abort(`objective.md invalid: missing required sections: ...`);
```

Los seis llevan sus encabezados **en español**. Medido leyendo los archivos, los
seis con exactamente el mismo juego:

```
["Proyecto", "Objetivo", "Criterios de aceptación", "Alcance", "Fuera de alcance", "Verificación"]
```

`stripAccents('Proyecto')` = `"proyecto"`, que no es `"project"`. Las tres secciones
requeridas salen vacías y el abort se dispara **antes de tocar git, antes del
lockfile y antes del preflight**. Reproduce exactamente el hallazgo `AUDIT §1.2.a`,
medido de nuevo aquí sobre los archivos de hoy.

**No se reparó ninguno.** Traducir esos encabezados es el run **`#15`
`RUN-AIW-TICKET-PARSE-REPAIR-001`** (`planned`), *«Repair the six tickets that no
longer parse»*. Aquí solo se mide cuáles fallan y dónde.

### 1.b La columna `# Project` — y una precisión sobre `jame_snapshot`

**Los seis declaran `sandbox`, y `sandbox` sí está registrado** en `config.json`,
que lista exactamente dos proyectos: `sandbox` y `console`. Ninguno de los seis
tiene el problema de proyecto no registrado.

Precisión, porque el encargo lo dejaba abierto: el proyecto inexistente
`jame_snapshot` es de **los tres tickets de `parked/`** (`AUDIT §1.2.b`), que este
run no toca y que están fuera de estas cuatro carpetas. **No hay ni un ticket de
`qualification/` ni de `queue-e7/` que declare `jame_snapshot`.** Se nombra y no se
corrige, como pedía el encargo.

### 1.c Ninguno de los seis tiene carpeta de log

Comprobado por nombre contra las once entradas de `aiw/logs/` (`000-sandbox`,
`001-console-projector`, `002-canonical-path-and-autoproject`,
`002-canonical-path-and-autoproject-orphan-20260711`, `003-roadmap-emitter`,
`003b-startup-projection-all-views`, `004-snapshot-enrichment`,
`005-roadmap-contract-fix`, `006-roadmap-delivery-path`, más los dos `.md` sueltos
`DIAG-roadmap-invalid.md` e `INCIDENT-2026-07-11.md`). **Cero coincidencias para los
seis.** Consistente con `MEDICION §5.2(b)` y con la corrección a cinco que hizo
`RECONCILIACION`. Su causa no se resuelve aquí.

---

## 2. Las dos poblaciones, con nombres

La `[INFERENCIA]` que traía el encargo **se verificó y sale confirmada en su mitad
medible, y matizada en su etiqueta**.

### 2.a Confirmado: quién tiene gemelo y quién no

| Población | Tickets | Gemelo archivado en `processed/` |
|---|---|---|
| **`queue-e7/`** | `a-resta`, `b-multiplica`, `c-imposible` | **Los tres lo tienen** — `APPROVED-a-resta.md`, `APPROVED-b-multiplica.md`, `HUMAN_REVIEW-c-imposible.md` |
| **`qualification/`** | `e5-secreto`, `e6-changes-requerido`, `e8-multiarchivo` | **Ninguno lo tiene** |

El corte cae exactamente donde el encargo lo situaba, y los tres nombres de gemelo
que anticipaba son los tres correctos. Resuelto **por nombre**: se le quitó a cada
fichero de `processed/` su prefijo de estado (`APPROVED-`, `HUMAN_REVIEW-`,
`BLOCKED-`, `ERROR-`) y se comparó el resto contra el nombre base del ticket. La
trampa de los prefijos numéricos que en el run 13 declaró muertos a tres tickets
vivos **no se pudo repetir aquí**: ninguno de los seis lleva prefijo numérico.

### 2.b Medido de más: los gemelos son byte-idénticos

No solo existen — **coinciden byte a byte**:

| Ticket en `queue-e7/` | md5 | Gemelo en `processed/` | md5 | |
|---|---|---|---|---|
| `a-resta.md` | `f7fd01200b207a71e17c96d424481a52` | `APPROVED-a-resta.md` | `f7fd01200b207a71e17c96d424481a52` | **idénticos** |
| `b-multiplica.md` | `efdfeb2cbbc83308334bb8519e92e420` | `APPROVED-b-multiplica.md` | `efdfeb2cbbc83308334bb8519e92e420` | **idénticos** |
| `c-imposible.md` | `62c571fd9779dddeab398999013059c2` | `HUMAN_REVIEW-c-imposible.md` | `62c571fd9779dddeab398999013059c2` | **idénticos** |

Confirmado además con `diff -q`: sin diferencias en los tres pares.

### 2.c Matiz a la etiqueta «residuo» — y es un resultado, no una objeción

El encargo proponía leer los tres de `queue-e7/` como **«residuo de trabajo ya
procesado»**. La mitad medible es cierta y queda arriba. La etiqueta, sin embargo,
choca con lo que declara el propio registro de la cualificación.

`aiw/records/QUALIFICATION.md`, escenario **E7** («la cola end-to-end»), dice
literalmente que los tres objetivos estaban en **`pendientes/`** —el nombre español
que entonces tenía `pending/`— y que tras correr `node queue.mjs` **«los tres
[fueron] movidos a `objectives/processed/<state>-<name>`»**. La cola **mueve**, no
copia: `queue.mjs:58` compone el destino y `archiveMove` hace `git mv` o
`fs.renameSync`, ambos renames.

De ahí se sigue que **`queue-e7/` nunca fue el directorio de trabajo de la cola**:
si lo hubiera sido, la cola lo habría dejado vacío. Los tres siguen ahí *y* sus
gemelos están en `processed/`.

`[INFERENCIA]` — la lectura que queda en pie: **`queue-e7/` es el almacén fuente
del fixture del escenario E7**, desde el que se sembró `pendientes/` para correr la
prueba; lo que la cola consumió y archivó fue la copia de trabajo. Bajo esa
lectura los tres de `queue-e7/` no son sobras de un run, son **el fixture
preservado a propósito**, y su gemelo en `processed/` es la evidencia de que el
fixture se ejecutó. El nombre de la carpeta apunta al mismo sitio: `queue-e7`
nombra **el experimento E7**, no un estado de cola.

Esto no invalida el corte de 2.a —que es medición— sino la conclusión de
disposición que se colgaría de la palabra «residuo». Un residuo se retira; un
fixture fuente se guarda. Y de ahí sale directamente §3.

`[INFERENCIA]` sobre `qualification/`: E5, E6 y E8 corrieron por **vía directa del
kernel**, no por la cola, y `kernel.mjs` no archiva nada —no hay una sola
referencia a `processed` en sus 478 líneas, causa ya medida en `MEDICION §5.2(a)`—.
Eso explica sin residuo que no tengan gemelo: nunca hubo quien los moviera.

---

## 3. La hipótesis de fixtures, puesta a prueba

**Veredicto: la medición la CONFIRMA, y la refuerza más allá de lo que el encargo
pedía.**

**(i) El valor de `AUDIT §6.4` es real.** Verificado abriendo la sección. Su tabla
cruza los cinco desenlaces del kernel contra el fixture que ejerce cada uno, y
cierra: *«los cinco desenlaces del kernel tienen fixture, pero dos de esos fixtures
son de los seis que hoy no parsean»*. Los dos son:

| Desenlace del kernel | Único fixture que lo ejerce | Dónde vive hoy |
|---|---|---|
| **`BLOCKED`** por veredicto o por guard | `e5-secreto` (`QUALIFICATION.md:57-68`) | `objectives/qualification/` |
| **`ROUNDS_EXHAUSTED`** por `CHANGES_REQUIRED` agotado, exit 2 | `e6-changes-requerido` (`QUALIFICATION.md:70-78`) | `objectives/qualification/` |

Las otras tres ramas las cubren `ERROR-000-sandbox` (dos de ellas) y
`HUMAN_REVIEW-999-sandbox-imposible` / `HUMAN_REVIEW-c-imposible`, todos ya en
`processed/`. Así que **dos de los seis invisibles son los únicos ejemplares
ejecutables de dos de los cinco desenlaces**. No son sobras: son cobertura.

**(ii) `QUALIFICATION.md` documenta los seis como escenarios de evaluación.** Su
tabla resumen los nombra E5, E6, E7 (a/b/c) y E8, los ocho escenarios con
resultado observado y **8/8 PASS**. Los seis tienen ficha propia con expectativa,
observación y veredicto. Eso es un banco de casos, no una cola de trabajo.

**(iii) Ninguno de los seis es cola pendiente bajo ninguna lectura.** Los tres de
`queue-e7/` ya corrieron y están archivados; los tres de `qualification/` ya
corrieron (E5, E6 y E8 constan como PASS) y ninguno abortaría hoy más allá de
`kernel.mjs:147`. **Cero de los seis representan trabajo por hacer sobre un
proyecto.**

**Consecuencia, y es la que manda sobre §5:** si los seis son fixtures de
evaluación, **su casa la define el run `#24` `RUN-AIW-EVAL-CASE-CONVENTION-001`**
(`planned`), cuyo título es exactamente *«Establish the convention for evaluation
cases»* —verificado en el canónico—. Este run **no puede inventar esa convención
por adelantado**, y por tanto no puede fabricarles un destino. Se quedan donde
están.

---

## 4. Las dos carpetas vacías — lo único que sí se ejecutó

**Comprobado antes de tocar nada**, con `ls -A` (incluye ocultos):

| Carpeta | Entradas, incluidas ocultas | `git ls-files` | ¿`.gitkeep`? |
|---|---|---|---|
| `objectives/prepared/` | **0** | **sin salida** — no trackeada | **no** |
| `objectives/staged/` | **0** | **sin salida** — no trackeada | **no** |

Confirmada también la afirmación del encargo sobre dónde viven los `.gitkeep`: los
únicos dos del repositorio están en `objectives/pending/.gitkeep` y
`objectives/processed/.gitkeep`, ambos en `git ls-files`.

Como git no trackea directorios vacíos y ninguna de las dos lleva `.gitkeep`,
**ninguna de las dos existe en un clon fresco ni en la laptop**. Suprimirlas del
disco local no quita nada del remoto: **alinea esta máquina con él**.

**Ejecutado:**

```
rmdir objectives/prepared objectives/staged
```

Se usó `rmdir` y **no** `rm -rf` deliberadamente: `rmdir` falla si el directorio no
está vacío, de modo que la propia herramienta es la última guarda contra borrar
algo con contenido. Salió limpio.

**Después:** `objectives/` contiene exactamente `parked`, `pending`, `processed`,
`qualification`, `queue-e7`. Las dos supresiones **no aparecen en `git status` ni
en `git diff --stat`** — que es justamente la prueba de que no existían para git.

---

## 5. Qué se movió y qué se quedó

### 5.a Movimientos: **ninguno**

**No se movió ni un fichero.** No hay tabla de md5 antes/después de movimiento
porque no hubo movimiento; la tabla de integridad de §7 prueba que los seis
quedaron intactos.

El encargo autorizaba mover **solo** lo que tuviera destino derivable de una regla
ya existente: la de `queue.mjs:58` para archivar, o el gemelo ya presente en
`processed/`. Se aplicaron las dos y **ninguna produce un destino ejecutable**:

**Los tres de `queue-e7/` — la regla apunta a un sitio ya ocupado.** La regla es:

```js
// queue.mjs:15
const PROCESSED = path.join(AIW, 'objectives', 'processed');
// queue.mjs:18
const STATES = { 0: 'APPROVED', 2: 'HUMAN_REVIEW', 3: 'BLOCKED', 4: 'HUMAN_REVIEW', 1: 'ERROR' };
// queue.mjs:58
… archiveMove(AIW, path.join(PENDING, f), path.join(PROCESSED, `${state}-${f}`)) …
```

Aplicada a `a-resta.md` con su estado observado `APPROVED` produce
`processed/APPROVED-a-resta.md`. **Ese fichero ya existe y es byte-idéntico** (§2.b).
Lo mismo para los otros dos. Es decir: el destino que la regla deriva **está
ocupado por el propio contenido del ticket**. Consumar el movimiento exigiría
sobrescribir o borrar un fichero con contenido, y **la regla dura de este encargo
lo prohíbe sin excepción**. Y bajo la lectura de §2.c —fixture fuente, no
residuo— archivarlos sería además incorrecto de fondo: destruiría el único
ejemplar del fixture E7 para no ganar nada, porque su copia ya está archivada.

**Los tres de `qualification/` — no hay regla que les asigne destino.** Nunca
pasaron por la cola, así que `queue.mjs:58` no les aplica; no tienen gemelo que
indique dónde van; y la casa que sí les correspondería —el almacén de casos de
evaluación— **no existe todavía** y la define `#24`.

Así que la disposición correcta de los seis, hoy, es **quedarse quietos**. El
encargo lo dice mejor de lo que lo diría este record: *un fichero sin destino claro
que se mueve «por ordenar» es peor que uno quieto*.

### 5.b Lo que se queda, con su razón y su run

| Qué | Dónde sigue | Por qué se queda | Quién lo resuelve |
|---|---|---|---|
| `e5-secreto.md` | `objectives/qualification/` | Fixture **único** de `BLOCKED` (`AUDIT §6.4`). Sin destino derivable; la convención de casos de evaluación no existe aún | **`#24`** `RUN-AIW-EVAL-CASE-CONVENTION-001` |
| `e6-changes-requerido.md` | `objectives/qualification/` | Fixture **único** de `ROUNDS_EXHAUSTED` (`AUDIT §6.4`). Ídem | **`#24`** |
| `e8-multiarchivo.md` | `objectives/qualification/` | Fixture de E8 (feliz multi-archivo), sin gemelo ni log. Ídem | **`#24`** |
| `a-resta.md` | `objectives/queue-e7/` | Destino de `queue.mjs:58` ya ocupado por su gemelo byte-idéntico; moverlo exigiría borrar contenido | **`#24`** |
| `b-multiplica.md` | `objectives/queue-e7/` | Ídem | **`#24`** |
| `c-imposible.md` | `objectives/queue-e7/` | Ídem | **`#24`** |
| **Los seis encabezados en español** | En sus ficheros | Reparar el parseo es otro acto, explícitamente fuera de alcance aquí | **`#15`** `RUN-AIW-TICKET-PARSE-REPAIR-001` |
| Los tres `parked/` | `objectives/parked/` | Fuera de alcance. Están vivos (`RECONCILIACION`) | — |
| Todo `processed/` | Intacto | Fuera de alcance | — |

---

## 6. Conteos, leyendo las carpetas

Contado listando los directorios, **sin ejecutar el proyector** y sin re-emitir
`.project/`. Se cuentan ficheros `.md`; los dos `.gitkeep` no son tickets.

| | `pending/` | `parked/` | `processed/` | **Visibles** | `qualification/` | `queue-e7/` | `prepared/` | `staged/` | **Invisibles** | **Total** |
|---|---|---|---|---|---|---|---|---|---|---|
| **Antes** | 0 | 3 | 13 | **16** | 3 | 3 | 0 (vacía) | 0 (vacía) | **6** | **22** |
| **Después** | 0 | 3 | 13 | **16** | 3 | 3 | *suprimida* | *suprimida* | **6** | **22** |
| **Delta** | 0 | 0 | 0 | **0** | 0 | 0 | −1 dir | −1 dir | **0** | **0** |

**Todas las cifras que el encargo daba «a verificar» quedan confirmadas:**

- el proyector recorre exactamente tres carpetas — `OBJECTIVE_CLASSIFICATIONS = ["pending", "parked", "processed"]`, en `aiw-console/tools/projector/project.mjs:97`, usada en `:157`, `:247` y `:523`;
- su conteo es **16 y no 22** ✔;
- `qualification/` tiene **3** y `queue-e7/` otros **3** ✔;
- `prepared/` y `staged/` estaban **vacías y sin trackear** ✔;
- los `.gitkeep` viven en `pending/` y `processed/` ✔;
- **0 + 3 + 13 = 16** ✔.

**Delta de tickets: cero.** Este run no cambió lo que la consola verá. Cambió el
disco local en dos directorios que la consola nunca vio y que el remoto tampoco
tiene.

---

## 7. Integridad — los seis, intactos

md5 medidos al abrir y al cerrar, **sin una sola diferencia**:

| Fichero | md5 antes | md5 después | |
|---|---|---|---|
| `qualification/e5-secreto.md` | `8d815a66696ef300af29611854dd759c` | `8d815a66696ef300af29611854dd759c` | idéntico |
| `qualification/e6-changes-requerido.md` | `8623b70eea2d3b069e32e3f500bc20c2` | `8623b70eea2d3b069e32e3f500bc20c2` | idéntico |
| `qualification/e8-multiarchivo.md` | `01e8db680907fb8b61c25539b56787a1` | `01e8db680907fb8b61c25539b56787a1` | idéntico |
| `queue-e7/a-resta.md` | `f7fd01200b207a71e17c96d424481a52` | `f7fd01200b207a71e17c96d424481a52` | idéntico |
| `queue-e7/b-multiplica.md` | `efdfeb2cbbc83308334bb8519e92e420` | `efdfeb2cbbc83308334bb8519e92e420` | idéntico |
| `queue-e7/c-imposible.md` | `62c571fd9779dddeab398999013059c2` | `62c571fd9779dddeab398999013059c2` | idéntico |

**Ningún fichero con contenido fue borrado, movido, renombrado ni modificado.** Las
únicas supresiones fueron los dos directorios vacíos y sin trackear de §4.

---

## 8. Frontera de salida

`git status --porcelain` **después**:

```
 M .project/roadmap.json          ← suciedad de apertura
 M .project/snapshot.json         ← suciedad de apertura
 M roadmap/roadmap.json           ← suciedad de apertura
?? .project/docs_index.json       ← suciedad de apertura
?? .project/git_history.json      ← suciedad de apertura
```

**Idéntico, línea por línea, al de la apertura.** Las cinco líneas son las mismas
cinco de antes.

`git diff --stat`:

```
 .project/roadmap.json  |  6 +++---
 .project/snapshot.json | 10 +++++-----
 roadmap/roadmap.json   |  2 +-
 3 files changed, 9 insertions(+), 9 deletions(-)
```

**Aporte de este run al árbol de git: cero líneas.** No aparece ni un cambio bajo
`objectives/`, porque lo único que se ejecutó fue suprimir dos directorios que git
no trackeaba. Es el resultado esperado y es su propia prueba.

**`logs/`, `kernel.mjs`, `queue.mjs`, `roadmap/` y `config.json` intactos:** ninguno
aparece en `diff --stat` ni en `porcelain` como cambio de este run. `roadmap/
roadmap.json` figura como suciedad de apertura, escrito por la consola al abrir el
run 14, no por el taller.

**HEAD invariante:** `d312c8375c4d6d12538fdc6034cfbde9ed84e634` al abrir y al
cerrar. No se commiteó.

**Git se usó solo en lectura:** `rev-parse`, `status --porcelain`, `diff --stat`,
`ls-files`. Ningún `git mv`, `add`, `rm` ni `commit`.

---

## 9. El proyector queda fuera, y por qué

Existe una vía que haría visibles los seis tickets **sin mover un solo fichero**:
añadir `"qualification"` y `"queue-e7"` a `OBJECTIVE_CLASSIFICATIONS`
(`aiw-console/tools/projector/project.mjs:97`). El conteo pasaría de 16 a 22 y los
seis aparecerían en las vistas.

**No se tocó, y la razón no es de gusto sino de superficie:** ese código vive en
**`aiw-console`**, no en `aiw`. La superficie de escritura de este encargo son
`aiw/objectives/` y este record. Modificar el proyector sería escribir fuera de
ella.

Además, la medición sugiere que **no sería la vía correcta de todos modos**: si los
seis son fixtures de evaluación (§3), hacerlos visibles como ítems de cola le
enseñaría a la consola seis trabajos pendientes que nadie va a ejecutar, y que
además abortarían en `kernel.mjs:147` si alguien lo intentara. Eso es cambiar una
invisibilidad por una mentira.

**Se NOMBRA como candidato a run del roadmap de `aiw-console`** —no del de `aiw`—
y se deja: *«decidir si el proyector debe exponer las carpetas de casos de
evaluación, y bajo qué clasificación, una vez que `#24` establezca la
convención»*. Depende de `#24`; antes de él no tiene criterio.

---

## 10. Lo que queda pendiente, nombrado y no tocado

1. **La casa de los seis la define `#24`** (`RUN-AIW-EVAL-CASE-CONVENTION-001`,
   `planned`). Este run entrega la medición que ese run necesitaba: cuáles son,
   dónde están, cuáles tienen gemelo, cuál es el valor irremplazable de `e5-secreto`
   y `e6-changes-requerido`, y por qué ninguno tiene destino derivable hoy.
2. **La reparación del parseo es `#15`** (`RUN-AIW-TICKET-PARSE-REPAIR-001`,
   `planned`). Aquí solo se midió el fallo y su línea exacta.
3. **`jame_snapshot` no se registró en `config.json`.** No afecta a ninguno de los
   seis (§1.b); es de los tres `parked/`. Roza el hilo de `cantu-studio` y se
   nombra, no se corrige.
4. **La colisión del id `000` en `processed/` no se resolvió.**
   `APPROVED-000-sandbox-suma.md` y `ERROR-000-sandbox.md` reclaman el mismo id
   contra una sola carpeta `logs/000-sandbox`, cuyo `summary.md` declara `APPROVED`.
   Se nombra y se deja.
5. **Los cinco archivados sin log detrás no se resolvieron** —cifra de
   `RECONCILIACION`, no las cuatro de `MEDICION §5.2(b)`—:
   `APPROVED-000-sandbox-suma`, `APPROVED-a-resta`, `APPROVED-b-multiplica`,
   `HUMAN_REVIEW-999-sandbox-imposible`, `HUMAN_REVIEW-c-imposible`. Se nombran.
6. **La causa de que los seis no tengan log propio** queda `[NO VERIFICADO]`.
   `logs/` está gitignoreado (`MEDICION §5.2(e)`) y la cualificación es del
   2026-07-10; distinguir «nunca se escribió» de «se escribió y se perdió» exigiría
   evidencia que este run no tiene.
7. **`[NO VERIFICADO]`: para qué existían `prepared/` y `staged/`.** Ningún camino
   de código las lee. Comprobado con `grep` sobre `queue.mjs`, `kernel.mjs` y
   `project.mjs`: las tres únicas coincidencias son la palabra inglesa *staged* en
   comentarios de prosa —`queue.mjs:22` y `:28` («staged rename»),
   `kernel.mjs:192` («staged changes»)— y **ninguna es una referencia a la
   carpeta**; `prepared` no aparece en ninguno de los tres. Su historia tampoco
   está escrita en ningún record leído. Se suprimieron por lo que eran
   (directorios vacíos y locales), no por lo que pretendían ser.
8. **No se re-emitió `.project/`.** No se levantó la consola ni el proyector. No se
   corrió la suite. No se escribió en `DECISIONES.md`. `cantu-studio` no se tocó en
   ningún byte.

---

## Cierre

El trabajo del run está hecho y medido. La disposición de las cuatro carpetas
queda así: **`prepared/` y `staged/` suprimidas** del disco local, por vacías, sin
trackear e inexistentes en cualquier clon; **`qualification/` y `queue-e7/` se
quedan íntegras**, con sus seis tickets intactos, porque son casos de evaluación y
no cola, y porque su casa definitiva la establece un run que todavía no ha corrido.

**Este run debe quedar en `completed`.** El record no lo cambia: el status lo
cierra el operador desde la consola, y el commit es del ritual humano.
