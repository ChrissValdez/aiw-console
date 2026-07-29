# REPARACIÓN DEL PARSEO DE LOS SEIS TICKETS DE AIW

**Fecha:** 2026-07-28 · **Run:** `RUN-AIW-TICKET-PARSE-REPAIR-001`
(`queue_order` 15, O2 «AIW is readable» / O2.P2 «The queue tells the truth») ·
**Naturaleza:** traduce al inglés **las líneas de encabezado** de seis tickets de
`aiw/objectives/`, y nada más. **Ni una línea de cuerpo se toca.** No commitea, no
cambia el status de ningún run, no re-emite `.project/`, no toca `kernel.mjs`,
`queue.mjs`, `config.json`, `templates/`, `logs/`, `processed/` ni `roadmap/`, no
toca el proyector de `aiw-console`, no toca `cantu-studio`. Git solo en lectura. ·
**Máquina:** PC (Windows 10, `C:\Users\chris\Documents\AIW_Workspace\`).

## Para qué existe este record

Seis de los once tickets abiertos de AIW llevaban **18 días muertos** y nada lo
detectó. Declaraban sus encabezados en español; el parser busca las claves en
inglés; abortaban antes de tocar git. Este run los devuelve a la vida traduciendo
seis líneas por archivo.

Lo que se recupera no es cosmético: **dos de los cinco desenlaces del kernel no
tenían ningún fixture ejecutable**, porque sus dos únicos fixtures estaban entre
los seis rotos. Ver §8.

El riesgo entero del run era otro: **un fixture prueba lo que prueba por su
cuerpo, no por su encabezado.** Si el cuerpo cambia, el fixture puede dejar de
producir el desenlace para el que existe y nadie lo notaría hasta que alguien
confiara en él. Por eso §5 es el criterio que no se negocia, y por eso se midió
dos veces —con una comparación byte a byte propia y con `git diff`— antes de
declararlo.

---

## 0. El episodio de la guarda de título

**El encargo llegó con el título mal transcrito y la guarda paró el run antes de
editar un solo byte.** Se registra porque es la prueba medida de que la guarda
sirve, que es la razón por la que la regla existe. No es reproche: es evidencia.

El encargo pedía comprobar que el run de `queue_order` 15 se titulaba
`Repair the six objective tickets that no longer parse`. El canónico dice:

| | valor | longitud |
|---|---|---|
| Encargo (cabina) | `Repair the six objective tickets that no longer parse` | 53 |
| Canónico (disco) | `Repair the six tickets that no longer parse` | 43 |

Primera divergencia en el índice **15**: la cabina había añadido la palabra
`objective`. La cadena del encargo **no aparece en ningún punto** de
`roadmap/roadmap.json` — 0 nodos con ese `title`, y la subcadena no está ni en el
JSON crudo. El run paró y reportó, sin tocar los seis archivos y sin leer siquiera
`kernel.mjs`: la guarda es de apertura y corta antes.

El parecido era altísimo —el `run_id`, el `queue_order`, la fase y el
`full_description` describían este encargo exactamente— y precisamente por eso la
regla prohíbe resolver por parecido. La enmienda del operador levantó la guarda
declarando que **gana el disco**: el título es el del canónico, el canónico no se
corrige, el error estaba en la transcripción a mano desde la pantalla de la
consola.

**Veredicto del criterio 3bis (§1.3): la transcripción es la única causa. No hay
divergencia entre el canónico y la proyección.**

---

## 1. Frontera de entrada

### 1.1 Identidad del run — derivada, no tecleada

Leyendo `aiw/roadmap/roadmap.json` y recorriendo `objectives[].phases[].runs[]`, el
nodo de `queue_order` **15** vive en `objectives[1].phases[1].runs[2]` (O2 / O2.P2):

| campo | valor | ¿coincide con la guarda? |
|---|---|---|
| `title` | `Repair the six tickets that no longer parse` | **sí**, carácter a carácter |
| `run_id` | `RUN-AIW-TICKET-PARSE-REPAIR-001` | **sí**, exacto |
| `status` | `active` | admisible (`planned` habría obligado a parar) |

El canónico contiene **42 runs** en total.

### 1.2 HEAD y suciedad de apertura

**HEAD de `aiw`:** `f7a2aa8ecd7a9938a5d26b754546ddd86ddccf3a` — **invariante
durante todo el trabajo** (no se commiteó; verificado al abrir y al cerrar).

`git status --porcelain` **antes**:

```
 M .project/roadmap.json
 M .project/snapshot.json
 M roadmap/roadmap.json
?? .project/docs_index.json
?? .project/git_history.json
```

Solo `roadmap/roadmap.json` y archivos de `.project/`. **Guarda satisfecha.**

**[INFERENCIA]** la modificación pendiente de `roadmap/roadmap.json` es el propio
flip de este run a `active`: en `HEAD` el run 15 figura como `planned` y en el
working tree como `active`, y el resto del archivo no difiere.

### 1.3 Criterio 3bis — ¿dicen lo mismo el canónico y la proyección?

La cabina recibió el título desde la pantalla de la consola, y **la consola lee la
proyección, no el canónico**. Si la proyección trajera un título distinto, sería
divergencia real entre fuente y derivado —un defecto del emisor, no un dedazo— y
había que descartarlo midiendo.

Buscando el mismo `run_id` en las tres fuentes:

| Fuente | `title` | ¿= canónico? | ¿= por codepoints? |
|---|---|---|---|
| `roadmap/roadmap.json` (canónico) | `Repair the six tickets that no longer parse` | — | — |
| `.project/roadmap.json` (98 940 b) | idem | **true** | **true** |
| `.project/snapshot.json` (103 316 b) | idem | **true** | **true** |

**Coinciden**, y no solo por `===` sino comparando codepoint a codepoint, que
descarta homoglifos y espacios exóticos. `status` y `queue_order` también
coinciden en las tres. **El emisor no tiene deriva aquí. La causa fue la
transcripción humana.** Ni el canónico ni la proyección se tocaron.

---

## 2. Las claves que exige el parser — derivadas del código

No se eligieron: se leyeron de `aiw/kernel.mjs`, función `parseObjective`
(`K:129-149`).

**Cómo captura los encabezados.** `K:131-133` recorre el archivo línea a línea y
aplica `/^#\s+(.+)$/`. Solo captura **H1**: `##` no hace match, porque el segundo
`#` no es `\s`. La clave es lo capturado tras normalizar.

**Cómo normaliza (`K:120`):**

```js
const stripAccents = (s) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().trim();
```

Descompone en NFD, borra las marcas diacríticas, **pasa a minúsculas** y recorta.
Por eso `# Project` → `"project"`, y por eso `# Verificación` → `"verificacion"`,
que **no** es `"verification"`: quitar el acento no traduce.

**Qué claves consulta (`K:138-144`)** — la lista exacta, con el campo que alimenta:

| Línea | Clave buscada | Campo del objeto | Nota |
|---|---|---|---|
| `K:138` | `project` | `project` | toma **solo la primera línea** de la sección |
| `K:139` | `objective` | `objective` | |
| `K:140` | `acceptance criteria` | `criteria` | |
| `K:141` | `scope` | `scope` | |
| `K:142` | `out of scope` | `outOfScope` | |
| `K:143` | `verification` | `verification` | |
| `K:144` | `max rounds` | `maxRounds` | opcional; `K:123` devuelve el default 3 si falta |

**Dónde aborta (`K:146-147`):**

```js
const missing = ['project', 'objective', 'criteria'].filter((k) => !obj[k]);
if (missing.length) throw new Abort(`objective.md invalid: missing required sections: ...`);
```

**Requeridas: `project`, `objective`, `acceptance criteria`.** Las otras cuatro son
opcionales para el parser.

**Contraste con `templates/objective.md`.** El template declara `# Project`,
`# Objective`, `# Acceptance criteria`, `# Scope`, `# Out of scope`,
`# Max rounds`, `# Verification` (`templates/objective.md:4-23`). Tras `K:120`
producen exactamente las siete claves de la tabla. **No hay discrepancia entre el
template y el parser**, así que no hubo que aplicar la regla de desempate.

---

## 3. Estado ANTES, por archivo

`parseObjective` se ejecutó sobre **los archivos reales**, importando la función
del módulo. `K:470` condiciona el arranque a que `kernel.mjs` sea `process.argv[1]`,
así que importarlo desde otro script **no dispara `main()`** — mismo método que el
audit.

| # | Ruta | Bytes | md5 | EOL | BOM | `parseObjective` |
|---|---|---|---|---|---|---|
| 1 | `objectives/qualification/e5-secreto.md` | 540 | `8d815a66696ef300af29611854dd759c` | LF | no | **ABORT** |
| 2 | `objectives/qualification/e6-changes-requerido.md` | 657 | `8623b70eea2d3b069e32e3f500bc20c2` | LF | no | **ABORT** |
| 3 | `objectives/qualification/e8-multiarchivo.md` | 722 | `01e8db680907fb8b61c25539b56787a1` | LF | no | **ABORT** |
| 4 | `objectives/queue-e7/a-resta.md` | 421 | `f7fd01200b207a71e17c96d424481a52` | LF | no | **ABORT** |
| 5 | `objectives/queue-e7/b-multiplica.md` | 437 | `efdfeb2cbbc83308334bb8519e92e420` | LF | no | **ABORT** |
| 6 | `objectives/queue-e7/c-imposible.md` | 542 | `62c571fd9779dddeab398999013059c2` | LF | no | **ABORT** |

Los seis md5 **coinciden exactamente** con los que midió `#14`
(`DISPOSICION-CARPETAS-COLA-AIW.md:70-75`). Medición independiente, mismo
resultado.

**El mensaje de aborto fue idéntico en los seis:**

```
Abort: objective.md invalid: missing required sections: project, objective, criteria.
       See templates/objective.md
origen: at parseObjective (kernel.mjs:147:29)
```

**`K:147`, columna 29** — la línea exacta que el audit predijo.

**Encabezados que llevaban los seis.** Idénticos en los seis archivos, seis por
archivo, cambiando solo el número de línea:

| Encabezado literal | Clave que produce `K:120` | ¿La busca el parser? |
|---|---|---|
| `# Proyecto` | `proyecto` | **no** |
| `# Objetivo` | `objetivo` | **no** |
| `# Criterios de aceptación` | `criterios de aceptacion` | **no** |
| `# Alcance` | `alcance` | **no** |
| `# Fuera de alcance` | `fuera de alcance` | **no** |
| `# Verificación` | `verificacion` | **no** |

Las líneas que ocupan, por archivo: `e5` y `c-imposible` en 1/4/7/10/13/17; `e6`,
`a-resta` y `b-multiplica` en 1/4/7/11/14/18; `e8` en 1/4/7/12/15/19.

Ninguno de los seis declara `# Max rounds`, así que los seis toman el default 3
(`K:20`, `K:123`). **No se les añadió esa sección**: el criterio manda traducir
encabezados existentes, no crear ninguno.

---

## 4. La traducción aplicada

Cada encabezado tenía equivalente **inequívoco** en la lista del §2, así que no
hubo que parar por ninguno:

| De | A | Clave resultante |
|---|---|---|
| `# Proyecto` | `# Project` | `project` |
| `# Objetivo` | `# Objective` | `objective` |
| `# Criterios de aceptación` | `# Acceptance criteria` | `acceptance criteria` |
| `# Alcance` | `# Scope` | `scope` |
| `# Fuera de alcance` | `# Out of scope` | `out of scope` |
| `# Verificación` | `# Verification` | `verification` |

**Cómo se escribió, y por qué así.** Hay precedente medido de mezcla LF/CRLF en
este repo, y una reescritura ingenua normaliza bytes que nadie mandó tocar. El
archivo se partió conservando los separadores de línea como elementos propios
(`split(/(\r\n|\n)/)`), se sustituyó **únicamente el texto de las líneas que el
regex de `K:132` captura**, y se volvió a unir sin recomponer terminadores. Los
seis resultaron ser LF puro y sin BOM, antes y después, con **recuento de
terminadores idéntico** (§5).

La reparación corrió primero **en seco**, con la prueba del cuerpo activa, y solo
se escribió tras verla pasar en los seis.

---

## 5. La prueba del cuerpo — el criterio que no se negocia

Medida por duplicado: comparación byte a byte propia **y** `git diff` real.

### 5.1 Comparación propia

Para cada archivo se comparó línea a línea el antes y el después, se listaron las
líneas que cambiaron, y se comprobó que **el conjunto de líneas cambiadas es
exactamente el conjunto de líneas de encabezado**. Además, se reconstruyó el
cuerpo (todas las líneas que no son encabezado) de ambos lados y se compararon
como buffers.

| Archivo | Líneas cambiadas | Cuáles | Líneas de **cuerpo** tocadas | Cuerpo byte a byte idéntico | EOL preservado |
|---|---|---|---|---|---|
| `e5-secreto.md` | 6 | 1, 4, 7, 10, 13, 17 | **0** | **sí** | LF 18 → 18 |
| `e6-changes-requerido.md` | 6 | 1, 4, 7, 11, 14, 18 | **0** | **sí** | LF 19 → 19 |
| `e8-multiarchivo.md` | 6 | 1, 4, 7, 12, 15, 19 | **0** | **sí** | LF 20 → 20 |
| `a-resta.md` | 6 | 1, 4, 7, 11, 14, 18 | **0** | **sí** | LF 19 → 19 |
| `b-multiplica.md` | 6 | 1, 4, 7, 11, 14, 18 | **0** | **sí** | LF 19 → 19 |
| `c-imposible.md` | 6 | 1, 4, 7, 10, 13, 17 | **0** | **sí** | LF 18 → 18 |

CRLF: 0 antes y 0 después en los seis. Ningún archivo cambió su número de líneas.

### 5.2 `git diff` — la comprobación independiente

```
 objectives/qualification/e5-secreto.md           | 12 ++++++------
 objectives/qualification/e6-changes-requerido.md | 12 ++++++------
 objectives/qualification/e8-multiarchivo.md      | 12 ++++++------
 objectives/queue-e7/a-resta.md                   | 12 ++++++------
 objectives/queue-e7/b-multiplica.md              | 12 ++++++------
 objectives/queue-e7/c-imposible.md               | 12 ++++++------
 6 files changed, 36 insertions(+), 36 deletions(-)
```

**6 inserciones y 6 borrados por archivo, ni una más.** Y el inventario completo de
las 72 líneas del diff, agrupadas:

```
6 -# Proyecto                 6 +# Project
6 -# Objetivo                 6 +# Objective
6 -# Criterios de aceptación  6 +# Acceptance criteria
6 -# Alcance                  6 +# Scope
6 -# Fuera de alcance         6 +# Out of scope
6 -# Verificación             6 +# Verification
```

**Cero líneas de cuerpo en el diff.** Ningún archivo hubo que revertir.

Que git vea solo 6 líneas cambiadas por archivo es además la prueba concluyente de
que **no hubo normalización de EOL**: un cambio de terminadores habría marcado
*todas* las líneas como modificadas.

> **Nota sobre el aviso de git.** `git diff` emite
> `warning: LF will be replaced by CRLF the next time Git touches it` para los
> seis. Es el comportamiento de `core.autocrlf` sobre archivos que ya eran LF, y
> describe lo que git haría en un futuro checkout — **no** algo que este run haya
> escrito. Los archivos siguen siendo LF puro en disco, medido antes y después.

---

## 6. Estado DESPUÉS, por archivo

`parseObjective` ejecutado de nuevo sobre los archivos reales, mismo método.
**Los seis pasan.**

| # | Ruta | Bytes (antes → después) | md5 después | `parseObjective` | `project` | `maxRounds` |
|---|---|---|---|---|---|---|
| 1 | `qualification/e5-secreto.md` | 540 → **528** | `b59c86f0e9fa3de827bff3e28c02f8b5` | **OK** | `sandbox` | 3 |
| 2 | `qualification/e6-changes-requerido.md` | 657 → **645** | `dcde231a28a065f2a979326f093aaf6c` | **OK** | `sandbox` | 3 |
| 3 | `qualification/e8-multiarchivo.md` | 722 → **710** | `e8a4f4669337780fdf88ba679c8ddd4a` | **OK** | `sandbox` | 3 |
| 4 | `queue-e7/a-resta.md` | 421 → **409** | `0dbe188bd4b68f86cdafcbb0d439b2b9` | **OK** | `sandbox` | 3 |
| 5 | `queue-e7/b-multiplica.md` | 437 → **425** | `3b658f20e3c56fda7cccb8e5c9e78e2d` | **OK** | `sandbox` | 3 |
| 6 | `queue-e7/c-imposible.md` | 542 → **530** | `892e5c30f669627c607464c6fcca8911` | **OK** | `sandbox` | 3 |

Los seis pierden exactamente **12 bytes**, que es la diferencia de longitud entre
los seis encabezados españoles y los seis ingleses. Consistente en los seis, como
debe ser: llevaban los mismos encabezados.

**Campos que devuelve el objeto parseado:** `project`, `objective`, `criteria`,
`scope`, `outOfScope`, `verification`, `maxRounds` — los siete de `K:137-144`.

**Los seis declaran `# Project` → `sandbox`.** Ninguno declara `jame_snapshot`, así
que ese hilo no se toca por ningún lado. `scope` = `src/**` y `outOfScope` =
`tests/**`, `package.json` en los seis.

El cuerpo sigue en español, y así se queda: es lo que estos fixtures dicen, y
decirlo distinto sería cambiar lo que prueban.

---

## 7. La divergencia con los gemelos de `processed/`

`#14` midió que los tres de `queue-e7/` eran **byte-idénticos** a sus gemelos
archivados (`DISPOSICION-CARPETAS-COLA-AIW.md:181-183`). **Este run rompe esa
identidad, por decisión, y se declara aquí en vez de evitarse.**

| Fuente (`queue-e7/`) | md5 después | Gemelo (`processed/`) | md5 gemelo | ¿Idénticos ANTES? | ¿Idénticos DESPUÉS? |
|---|---|---|---|---|---|
| `a-resta.md` (409 b) | `0dbe188b…b2b9` | `APPROVED-a-resta.md` (421 b) | `f7fd0120…81a52` | **sí** | **NO** |
| `b-multiplica.md` (425 b) | `3b658f20…8e2d` | `APPROVED-b-multiplica.md` (437 b) | `efdfeb2c…e420` | **sí** | **NO** |
| `c-imposible.md` (530 b) | `892e5c30…8911` | `HUMAN_REVIEW-c-imposible.md` (542 b) | `62c571fd…59c2` | **sí** | **NO** |

La columna «¿Idénticos ANTES?» se midió en este run contra el md5 original de cada
fuente: da `true` en los tres, lo que **corrobora independientemente la medición de
`#14`**.

**Por qué es correcto que diverjan.** `processed/` es **registro histórico
inmutable de lo que corrió**: sus archivos son la foto del ticket tal como el
kernel lo consumió aquel día, y reescribirlos falsificaría el registro. El ticket
de `queue-e7/` es el **artefacto vivo**: existe para volver a correr, y para eso
tiene que parsear. Cuando la fuente evoluciona y el archivo no, la identidad byte a
byte deja de ser sostenible. Se rompe aquí, a la vista.

**Los tres gemelos de `processed/` no se tocaron.**
`git status --porcelain -- objectives/processed/` sale **vacío**.

### Qué sustituye a la identidad byte a byte como vínculo

Dos cosas, ambas medidas:

1. **El nombre.** El gemelo es `<DESENLACE>-<nombre del ticket>.md`, así que
   `a-resta.md` ↔ `APPROVED-a-resta.md` es una correspondencia legible y estable
   que además **carga el desenlace observado**, cosa que el md5 nunca dijo.
   `queue.mjs:3` y `queue.mjs:18` fijan esa convención de archivado.

2. **El cuerpo, que sigue siendo idéntico.** Comparando las líneas no-encabezado de
   cada fuente contra las de su gemelo: **idénticas en los tres**. La divergencia
   está confinada a las seis líneas de encabezado y a nada más — que es exactamente
   lo mismo que prueba §5, visto desde el otro lado.

**[INFERENCIA]** el vínculo por cuerpo se degradará en cuanto un ticket vivo cambie
de contenido de verdad; en ese momento el nombre queda como único vínculo. No es
problema de este run.

---

## 8. Qué desenlaces del kernel vuelven a tener fixture ejecutable

**Precisión sobre «los cinco desenlaces».** La constante `OUTCOMES` (`K:28-33`)
declara **cuatro** claves: `APPROVED`/0, `BLOCKED`/3, `ROUNDS_EXHAUSTED`/2 (estado
`HUMAN_REVIEW`) y `HUMAN_REVIEW`/4. El **quinto** desenlace es `ERROR`/exit 1, que
no pasa por esa tabla: sale por el manejador de `K:473-476`
(`process.exit(isAbort ? e.code : 1)`). Quien los cuenta como cinco es la cola:
`queue.mjs:18` mapea los cinco códigos de salida a etiquetas de archivo —

```js
const STATES = { 0: 'APPROVED', 2: 'HUMAN_REVIEW', 3: 'BLOCKED', 4: 'HUMAN_REVIEW', 1: 'ERROR' };
```

— y `records/QUALIFICATION.md` los enumera igual: «0=APPROVED, 2=CHANGES agotado,
3=BLOCKED, 4=HUMAN_REVIEW/NO_PARSEABLE, 1=error». **Cinco desenlaces, cuatro
entradas en `OUTCOMES`.** La cifra del canónico y del audit es correcta; la
constante sola no la explica.

**Los dos que este run devuelve a la vida** (verificado contra `AUDIT §6.4`, que
los declara como las dos ramas terminales que los fixtures de `processed/` no
ejercen):

| Desenlace | Exit | Único fixture que lo ejerce | Estado antes | Estado ahora |
|---|---|---|---|---|
| **`BLOCKED`** por veredicto o por guard | 3 | `e5-secreto` | abortaba en `K:147` | **parsea** |
| **`ROUNDS_EXHAUSTED`** por `CHANGES_REQUIRED` agotado | 2 | `e6-changes-requerido` | abortaba en `K:147` | **parsea** |

Fuente de la cobertura, verificada en el original y no solo en el audit:
`records/QUALIFICATION.md` documenta que en E5(b) **«BLOCKED_SECRETS disparó»** con
commit de evidencia y push suprimido, ruta verificada de punta a punta; y que E6
agotó las 3 rondas con `CHANGES_REQUIRED` devolviendo **exit 2**, «la primera vez
que se ejerce la rama CHANGES_REQUIRED del supervisor».

**Antes de este run, dos de los cinco desenlaces del kernel no se podían probar con
nada.** Ahora los cinco tienen fixture que al menos parsea.

**Lo que este run NO afirma:** que los seis corran, ni que produzcan el desenlace
para el que existen. **Que parseen es el entregable; que corran, no.** Ninguno de
los seis se ejecutó. **[NO VERIFICADO]** que `e5-secreto` siga disparando
`BLOCKED_SECRETS` y que `e6-changes-requerido` siga agotando rondas con exit 2 bajo
el kernel de hoy: eso solo lo dice una ejecución real, y este run no la hizo. Lo
que sí está probado es que el cuerpo que producía esos desenlaces está intacto
byte a byte (§5).

---

## 9. Frontera de salida

`git status --porcelain` **después**:

```
 M .project/roadmap.json          <- suciedad de apertura
 M .project/snapshot.json         <- suciedad de apertura
 M objectives/qualification/e5-secreto.md
 M objectives/qualification/e6-changes-requerido.md
 M objectives/qualification/e8-multiarchivo.md
 M objectives/queue-e7/a-resta.md
 M objectives/queue-e7/b-multiplica.md
 M objectives/queue-e7/c-imposible.md
 M roadmap/roadmap.json           <- suciedad de apertura
?? .project/docs_index.json       <- suciedad de apertura
?? .project/git_history.json      <- suciedad de apertura
```

**Seis modificados bajo `objectives/`, cero fuera.** Todo lo demás es exactamente
la suciedad que ya estaba al abrir, con el mismo recuento de líneas
(`.project/roadmap.json` 6, `.project/snapshot.json` 10, `roadmap/roadmap.json` 2).

`git diff --stat` completo: **9 archivos, 45 inserciones, 45 borrados** — los 6
tickets aportan 36/36 y los 3 preexistentes 9/9.

**Intactos, probado por ausencia en `git diff --stat`:** `kernel.mjs`, `queue.mjs`,
`config.json`, `templates/`, `objectives/processed/`, `logs/`, `roadmap/` (más allá
de la suciedad de apertura), y todo `objectives/` fuera de los seis
(`pending/`, `parked/`, `prepared/`, `staged/`).

**HEAD invariante:** `f7a2aa8e…ccf3a`, igual al abrir y al cerrar. No se commiteó.
Git se usó **solo en lectura**: `rev-parse`, `status`, `diff`, `diff --stat`,
`diff --numstat`, `show`.

`cantu-studio` no se tocó en ningún byte. No se re-emitió `.project/`. No se
levantó la consola ni el proyector. No se corrió la suite de AIW. No se escribió en
`DECISIONES.md`.

---

## 10. Inferencias y no verificados

- **[INFERENCIA]** la modificación pendiente de `roadmap/roadmap.json` al abrir es
  el flip de este run a `active` (§1.2).
- **[INFERENCIA]** el vínculo por cuerpo entre fuente y gemelo se degradará cuando
  un ticket vivo cambie de contenido de verdad (§7).
- **[NO VERIFICADO]** que los seis **ejecuten** correctamente, y en particular que
  `e5-secreto` produzca `BLOCKED` y `e6-changes-requerido` produzca
  `ROUNDS_EXHAUSTED` bajo el kernel actual. Fuera de alcance por decisión (§8).
- **[NO VERIFICADO]** por qué el commit `7659ff3` dejó atrás estos seis archivos
  al pasar el template a inglés. Este run repara el efecto, no diagnostica la
  causa.

Todo lo demás en este record está medido, con su fuente citada: cifras del canónico
por lectura de `roadmap/roadmap.json`; claves del parser por `kernel.mjs:120`,
`:129-149`; md5 y bytes por ejecución sobre los archivos reales; diff por `git`.

---

## 11. Lo que este run deja pendiente

**El vigilante no existe.** Estos seis llevaban 18 días muertos y **nada lo
detectó** — ni la cola, ni la consola, ni ninguna prueba. Este run repara los datos
y **deliberadamente no añade el test de parseo**: eso es mecanismo bajo `CONST §4`,
tiene su propio incidente y criterio de borrado escritos en `D-055` y `D-056`, y
vive en `RUN-AIW-TICKET-PARSE-REGRESSION-TEST-001` (`queue_order` 25). Reparar los
fixtures sin poner el vigilante devuelve los seis y **deja al séptimo sin nadie que
lo vea caer**.

**Estado del run.** Este run debe quedar en **`completed`**. Este record **no lo
cambia**: el status lo escribe quien corresponda, no el papel.
