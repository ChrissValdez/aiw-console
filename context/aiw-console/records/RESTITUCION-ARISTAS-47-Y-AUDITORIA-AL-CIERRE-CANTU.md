# RESTITUCIÓN DE LAS 17 ARISTAS DE `#47` Y RE-ENCUADRE A AUDITORÍA AL CIERRE — CANTU

> Encargo de taller de **corrección de un error de la cabina** sobre `cantu-studio`. Tres ediciones
> en **una sola escritura atómica** sobre `.aiw/roadmap/roadmap.json`:
>
> **(A)** Restitución de las **17 aristas `depends_on`** de `RUN-CANTU-WEB-DOCUMENTATION-EVIDENCE-001`
> (`queue_order` 47), retiradas por el encargo anterior bajo una premisa falsa.
> **(B)** Re-escritura de los tres campos de texto de `#47` al encuadre de **auditoría al cierre**.
> **(C)** Corrección del título de `RUN-JAME-WEB-READINESS-EVIDENCE-001` (`queue_order` 46).
>
> Fecha: 2026-07-28. **Git no se usó en ninguna forma** — ni un comando, ni lectura. No se levantó
> ningún servidor. No se corrió ninguna suite —ni de Cantu ni de `aiw-console`—. **No se re-emitió
> `.project/`.** No se tocó ningún `status`, ningún `queue_order`, ningún `barrier`, ninguna fase.
> No se ejecutó `#46` ni `#47`: este encargo corrige su texto y su grafo, **no audita nada**.
>
> **Dos cifras del ticket no sobrevivieron a la medición y se reportan corregidas**, ninguna con
> consecuencia sobre la edición: el conteo de records (§F.4) y la ubicación de dos de los ocho
> caracteres no-ASCII (§C.3).

## Archivos escritos por este encargo, y ninguno más

| Repo | Archivo | Qué |
|---|---|---|
| `cantu-studio` | `.aiw/roadmap/roadmap.json` | las tres ediciones — **la única escritura en Cantu**, y es una sola |
| `aiw-console` | `context/aiw-console/records/RESTITUCION-ARISTAS-47-Y-AUDITORIA-AL-CIERRE-CANTU.md` | este record |

**Barrido de `mtime`** sobre el árbol de `cantu-studio`, **con `node_modules` incluido** y `.git/`
excluido, contra un marcador tomado en disco **inmediatamente antes de la única escritura**
(2026-07-28 14:59:44.899):

```
./.aiw/roadmap/roadmap.json
```

**Exactamente un archivo.** El barrido cubrió de verdad los tres árboles de `node_modules`
—`tools/author-lite/node_modules` (9 596 ficheros), `tools/author-lite/editor-ui/node_modules`
(9 417) y `tools/author-lite/compiler-api/node_modules` (1 242), **20 255 en total**—: todos
anteriores al marcador. Ningún temporal quedó en `.aiw/roadmap/`; el motor escribe
`.roadmap.json.tmp-<pid>` y lo renombra. Su respaldo propio vive en `os.tmpdir()`, fuera de los
tres repos: `C:\Users\chris\AppData\Local\Temp\roadmap-backup-31940-roadmap.json`.

**Sobre `.project/`: ver §F.5.** Sus seis artefactos llevan `mtime` **14:37**, entre el arranque de
esta sesión y su escritura de las 14:59:44. **No los escribió este encargo** —el barrido contra el
marcador lo prueba—, y su contenido lo confirma: siguen mostrando `#47` con 0 aristas y `#46` con el
título con espacio final, es decir el estado **anterior** a esta edición.

---

## BLOQUE A — LÍNEAS BASE

### A.1 Respaldo antes de tocar nada, fuera del repo

| Qué | Valor |
|---|---|
| Ruta | `<scratchpad>/work/backup/roadmap.BEFORE.json` (fuera de los tres repos) |
| Bytes | **95 890** |
| md5 | `9805cf3fbee5ce4d4e09d615de2dd1cf` |
| `mtime` del canónico al leerlo | 2026-07-28 14:26:31 |

El md5 de apertura coincide **exactamente** con el md5 de cierre del encargo anterior
([`REENCUADRE-OCHO-RUNS-CON-TEXTO-VENCIDO-CANTU.md`](REENCUADRE-OCHO-RUNS-CON-TEXTO-VENCIDO-CANTU.md)
§A.2, línea 75): **el canónico no se movió entre los dos encargos.** Se volvió a comprobar
inmediatamente antes de escribir: seguía en `9805cf3f…`.

### A.2 Líneas base nuevas

| Qué | Antes | Después |
|---|---|---|
| Bytes | 95 890 | **96 708** |
| md5 | `9805cf3fbee5ce4d4e09d615de2dd1cf` | **`8b3f6794afe89680c861333fe5d0775e`** |
| `mtime` | 2026-07-28 14:26:31 | 2026-07-28 14:59:44 |
| baseline del motor (sha256 de los bytes leídos) | `sha256:ca4b7619a50525fbe163af1e…` | `sha256:583bf4a88b16250ab49e2d15…` |
| EOL | CRLF (1 098 pares, puro) | CRLF (1 116 pares, puro) |

**+818 bytes, y la aritmética cuadra sin residuo:**

```
-43   texto  (q47 title -14, q47 summary +21, q47 full_description -25, q46 title -25)
+861  las 17 lineas de id nuevas en depends_on de q47  (50,6 B/linea con sangria y CRLF)
----
+818  medido
```

Los 18 pares CRLF nuevos (1 098 → 1 116) son las 17 líneas de id más el cambio de `"depends_on": []`
en una línea a array multilínea. Son estructura del JSON, no texto.

---

## BLOQUE B — MÉTODO

### B.1 Qué motor, y por qué ese

Criterio 5. **Motor: el de `aiw-console`** — `tools/roadmap/roadmap-plan.mjs` sobre
`tools/roadmap/roadmap-core.mjs`—, el mismo módulo que ejecuta el endpoint de escritura de la
consola global. Mismas razones que las cuatro veces anteriores, ya verificadas: el core local de
Cantu no adopta carriles y no resuelve la arista externa, así que su pre-flight rechazaría el
archivo antes de planear nada.

**Ids externos, sin que ninguna identidad de proyecto entre en el motor.** Aquí este encargo cambió
el método respecto del anterior, y a mejor: en vez de recorrer árboles a mano, se **importó y usó la
propia resolución de la consola** — `detectRootLayout` y `flattenRoadmapTree` de
`tools/projector/project.mjs` —, replicando `externalRunIdsFor` (`project-console/serve.mjs:335`)
entrada por entrada sobre `project-console/projects.json`, saltando la entrada activa:

| Entrada del registro | Raíz resuelta | Ids |
|---|---|---|
| `aiw-console` | `projects/aiw-console` | **45** |
| `aiw` | `AIW_Workspace/aiw` | **42** |
| `cantu-studio` | — | saltada (es la activa) |
| | **unión** | **87** |

**Esto no coincide con los 61 que declaró el record de la alta**
([`ALTA-RUN-COMPONENT-GUIDE-Y-REENCUADRE-AUDIT-DOC.md`](ALTA-RUN-COMPONENT-GUIDE-Y-REENCUADRE-AUDIT-DOC.md)
§B.1), y las dos diferencias tienen causa distinta:

- **`aiw` aportó 42 ids, no 0.** Aquel record midió que «la entrada `aiw` no porta ningún
  `roadmap.json`». Hoy **sí lo porta**: `AIW_Workspace/aiw/roadmap/roadmap.json`, 98 697 B,
  `mtime` **2026-07-28 14:31**. Es del **hilo paralelo**, escrito durante la ventana de esta sesión.
  **Este encargo solo lo leyó**; no es suyo y no lo tocó.
- **`aiw-console` aportó 45, no 45+16.** `detectRootLayout` reclama **un** árbol por raíz y eligió
  `roadmap/roadmap.json` (45). Aquel encargo compuso a mano los **dos** árboles de `aiw-console`
  (45 + 16 = 61). El método de este encargo es el de la consola; el del anterior era más amplio.

**Ninguna de las dos diferencias afecta al resultado**, y se comprobó: la única arista del canónico
que apunta fuera —`RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` →
`RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`— resuelve contra `aiw-console/roadmap/roadmap.json`, que está
en los 45 de ambos métodos y cuyo `mtime` (03:33:31) no se movió. El motor recibe un `Set`; es dato,
no proyecto.

### B.2 UNA sola pasada, un solo plan, una sola escritura

Criterio 5 pide una sola escritura. Aquí las tres ediciones **caben en un único `batch`**, y no hizo
falta partir en dos pasadas como en la alta: `set-text` y `set-deps` están los dos en la lista
`batchable` del motor (`roadmap-plan.mjs:173`), y ninguna de las tres es operación de identidad.

```
PASS UNICO   batch [ set-text(#47), set-deps(#47), set-text(#46) ]  -> serializado
             applyPlan(canonico, serializado)                       -> UNA escritura atomica
```

Una sola vista previa, un solo serializado, una sola escritura con respaldo → temp → `fsync` →
rename atómico y rollback. **El canónico nunca vio un estado intermedio.**

| | filas de remap | avisos del motor |
|---|---|---|
| el plan | **0** | **0** |

`0` filas de remap dicho por el motor, no por inspección posterior: ninguna de las tres operaciones
mueve nada de sitio.

### B.3 Ningún id se tecleó de memoria

Criterio 1. **Los 19 ids que este encargo usa se derivaron del canónico**, y cualquier discrepancia
aborta antes de planear.

| Qué | Cómo se derivó | Guarda |
|---|---|---|
| `#47` | por `queue_order 47` | se exigió `run_id === RUN-CANTU-WEB-DOCUMENTATION-EVIDENCE-001` |
| `#46` | por `queue_order 46` | se exigió `run_id === RUN-JAME-WEB-READINESS-EVIDENCE-001` |
| los **17 doc-runs** | por `queue_order` 13,15,…,45 | cada uno: `lane === "DOCUMENTATION"`, título casando `/^Verify the .+ component packet$/`, y **depende de su run de implementación en `q-1`**, en **la misma fase** |
| los **17 de implementación** | por `queue_order` 12,14,…,44 | usados solo para el cruce |

### B.4 El cruce que el encargo exigía, y que **cuadró**

Criterio (A) manda cruzar los 17 derivados contra el `depends_on` de `#46`, y **parar si no cuadra**.
No hubo que parar:

```
#46.depends_on            : 17 ids
17 partners de impl (q-1) : 17 ids
solo en #46.depends_on    : []
solo en los derivados     : []
IDENTICOS
```

Y el emparejamiento uno a uno, comprobado sobre el archivo ya escrito — **los dos conjuntos son
gemelos exactos**:

| impl `q` | arista de `#46` | doc `q` | arista de `#47` | fase |
|---|---|---|---|---|
| 12 | `RUN-JAME-WEB-COLUMNS-REVALIDATION-001` | 13 | `RUN-CANTU-WEB-COLUMNS-DOC-001` | O1.P1B |
| 14 | `RUN-JAME-WEB-HEADER-REVALIDATION-001` | 15 | `RUN-CANTU-WEB-HEADER-DOC-001` | O1.P1C |
| 16 | `RUN-JAME-WEB-LIST-REVALIDATION-001` | 17 | `RUN-CANTU-WEB-LIST-DOC-001` | O1.P1C |
| 18 | `RUN-JAME-WEB-ICONLIST-REVALIDATION-001` | 19 | `RUN-CANTU-WEB-ICONLIST-DOC-001` | O1.P1C |
| 20 | `RUN-JAME-WEB-CARD-REVALIDATION-001` | 21 | `RUN-CANTU-WEB-CARD-DOC-001` | O1.P1C |
| 22 | `RUN-JAME-WEB-VIDEO-REVALIDATION-001` | 23 | `RUN-CANTU-WEB-VIDEO-DOC-001` | O1.P1C |
| 24 | `RUN-JAME-WEB-NARRATIVE-REPAIR-001` | 25 | `RUN-CANTU-WEB-NARRATIVE-DOC-001` | O1.P1C |
| 26 | `RUN-JAME-WEB-CALLOUT-REPAIR-001` | 27 | `RUN-CANTU-WEB-CALLOUT-DOC-001` | O1.P1C |
| 28 | `RUN-JAME-WEB-DETAILS-REPAIR-001` | 29 | `RUN-CANTU-WEB-DETAILS-DOC-001` | O1.P1C |
| 30 | `RUN-JAME-WEB-ARITHMETIC-AUDIT-AND-REPAIR-001` | 31 | `RUN-CANTU-WEB-ARITHMETIC-DOC-001` | O1.P2 |
| 32 | `RUN-JAME-RULE-COMPONENT-REPAIR-AND-ACTIVATION-001` | 33 | `RUN-CANTU-WEB-RULE-DOC-001` | O1.P2 |
| 34 | `RUN-JAME-WEB-SPLIT-SCOPE-AND-REPAIR-001` | 35 | `RUN-CANTU-WEB-SPLIT-DOC-001` | O1.P1C |
| 36 | `RUN-JAME-WEB-TABLE-AUDIT-AND-REPAIR-001` | 37 | `RUN-CANTU-WEB-TABLE-DOC-001` | O1.P1C |
| 38 | `RUN-JAME-WEB-CONCEPTGRID-AUDIT-AND-REPAIR-001` | 39 | `RUN-CANTU-WEB-CONCEPTGRID-DOC-001` | O1.P2 |
| 40 | `RUN-JAME-WEB-HIERARCHY-AUDIT-AND-REPAIR-001` | 41 | `RUN-CANTU-WEB-HIERARCHY-DOC-001` | O1.P2 |
| 42 | `RUN-JAME-WEB-TIMELINE-AUDIT-AND-REPAIR-001` | 43 | `RUN-CANTU-WEB-TIMELINE-DOC-001` | O1.P2 |
| 44 | `RUN-JAME-WEB-VISUAL-AUDIT-AND-REPAIR-001` | 45 | `RUN-CANTU-WEB-VISUAL-DOC-001` | O1.P1C |

**Solapamiento entre los dos conjuntos: 0.** Cada carril converge en su propio audit, que es lo que
la partición estableció y lo que esta restitución devuelve.

**Una diferencia real, y es cosmética:** el `depends_on` de `#46` está en su **orden histórico**
(`q` 14,16,12,18,20,…) y el de `#47` queda en **orden de cola** (13,15,17,…). Los conjuntos son
gemelos; el orden del array no lo es. No se reordenó `#46`: tocarlo está fuera de alcance.

### B.5 Roundtrip byte-exacto, comprobado antes de tocar

Criterio 5. Antes de planear, `serialize(parseRoadmap(raw), detectEol(raw)) === raw` sobre el archivo
objetivo. **Byte-exacto**, EOL **CRLF**, 95 890 bytes. Comprobado **dos veces**: en el ensayo y otra
vez contra el canónico en la pasada real.

### B.6 Ensayo completo sobre copia, y `cmp` contra ella

Criterio 5. La secuencia entera —los ids externos, el roundtrip, la derivación, el cruce, las guardas
de texto, el plan, los invariantes **y la escritura**— se corrió primero contra una copia
(`<scratchpad>/work/out/rehearsal.json`). Solo con todo en verde sobre la copia se corrió contra el
canónico.

```
cmp <canónico> <copia ensayada>   ->  SIN DIFERENCIAS
```

md5 de los dos, y del serializado que el motor produjo en la pasada real:
`8b3f6794afe89680c861333fe5d0775e`, los tres. **Lo que se ensayó es exactamente lo que quedó
escrito.** Durante el ensayo el canónico conservó su md5 de apertura, comprobado.

### B.7 Autoridad de escritura inyectada

A `applyPlan` se le pasó un validador que, sobre el archivo ya renombrado, (a) lo re-lee y re-verifica
los invariantes del motor con la arista externa resuelta, (b) comprueba que conserva la forma
`objectives -> phases -> runs`, y (c) lanza el validador del propio proyecto exigiendo `EXIT 0`.
Cualquiera de los tres en rojo restaura el respaldo. Salida registrada:
`re-read OK + project validator EXIT 0`. `rolledBack: false`.

---

## BLOQUE C — INVARIANTES, CON SUS NÚMEROS

Criterios 4, 6 y 8. Medidos contra el **respaldo previo**, campo a campo, **antes de escribir** (como
guarda del plan) y otra vez **sobre el archivo escrito**.

| Invariante | Antes | Después | ¿Esperado? |
|---|---|---|---|
| Objetivos | **7** | **7** | sí |
| Fases | **28** | **28** | sí |
| Runs | **72** | **72** | sí |
| `queue_order` denso, único, contiguo | 1..72 | **1..72** | sí |
| Runs renumerados | — | **0** (comparados uno a uno por `run_id`) | sí |
| Filas de remap del plan | — | **0** | sí |
| Aristas `depends_on` | **134** | **151** | sí — **+17 exactas** |
| Aristas colgantes (externa resuelta) | **0** | **0** | sí |
| Aristas externas legales | 1 | **1**, la misma | sí |
| Dependencias que no preceden a su dependiente | **0** | **0** | sí |
| `status` | `completed 4 · planned 68` | **igual** | sí |
| Los 4 `completed`, por id | q1, q2, q3, q48 | **los mismos 4** | sí |
| Carril `DOCUMENTATION` | **23** | **23** | sí |
| Carril `DEVELOPMENT` (clave ausente) | **49** | **49** | sí |
| Runs no tocados byte-idénticos | — | **70 de 70** | sí |
| Caracteres no-ASCII en todo el archivo | **8** | **8** | sí |
| `Component Guide` en los 3 campos de `#47` | 0 | **0** | sí |
| Orden de claves de los runs editados | — | **preservado** en los dos | sí |

### C.1 Las aristas: **134 → 151**, y son +17 y ninguna otra

El ticket pedía exactamente esto, y **sale exacto**:

```
134  (antes, medido)
+17  (las 17 de #47, restituidas)
----
151  (medido en el archivo escrito)
```

Ninguna otra arista se movió: el `depends_on` de los 70 runs no tocados es byte-idéntico (§C.2), y el
de `#46` se comprobó **campo a campo sin cambio** (sigue con sus 17). Las +17 son todas de `#47`, que
pasa de `0` a `17`.

**Las dos comprobaciones de sanidad del grafo, que el criterio 4 pide por separado:**

- **0 aristas colgantes.** El barrido plano del archivo encuentra **1** id que no resuelve dentro del
  propio roadmap: `RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` →
  `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`. **No es colgante: es externa y legal** (CONTRATO §10.d Regla
  2), resuelve en los 87 ids del registro y es la de siempre. Descontada ella, **colgantes = 0**,
  antes y después. `core.checkInvariants` con `externalRunIds` da limpio.
- **0 dependencias que no preceden a su dependiente.** Comprobado sobre el grafo entero, no solo
  sobre `#47`: **0** antes y **0** después. Para las 17 nuevas en particular, están en `queue_order`
  13..45 y `#47` en 47, así que **las 17 preceden**, verificado también como guarda previa.

### C.2 Los 70 no tocados

Comparados **campo a campo** (`JSON.stringify` del run completo, más su objetivo y su fase) contra el
respaldo previo: **70/70 byte-idénticos**, ninguna diferencia. Los dos únicos runs que cambian son
`#46` y `#47`:

- De **`#47`** cambian exactamente cuatro claves: `title`, `summary`, `full_description` y
  `depends_on`. Su `run_id`, su `queue_order` (47), su `status` (`planned`), su `lane`
  (`DOCUMENTATION`), su fase (`O1` / `O1.P4`) y **el orden de sus claves** quedan intactos,
  comprobados uno a uno.
- De **`#46`** cambia exactamente **una** clave: `title`. Su `summary`, su `full_description`, sus
  **17 `depends_on`**, su `run_id`, su `queue_order` (46), su `status` (`planned`), su `lane` (clave
  ausente) y el orden de sus claves quedan intactos, comprobados uno a uno.

### C.3 Bytes no-ASCII: **8 → 8**, y dos de ellos no están donde el ticket dice

Criterio 8. Barrido del archivo entero, antes y después: **8 → 8, sin cambio.** Todos son la raya
`—` (U+2014). El texto nuevo de `#47` y el título nuevo de `#46` son **ASCII puro**: 0 caracteres
no-ASCII en los cuatro campos, comprobado como **guarda antes de entregar nada al motor** y
verificado otra vez sobre el resultado.

**Corrección a la cifra del ticket.** El criterio 8 dice que las 8 son «todas `U+2014` en runs no
tocados». Son todas `U+2014`, sí, pero **solo 6 están en runs**; las otras **2 están en el bloque
`lanes` de la raíz**, que no es un run:

| Dónde | Línea | Cuántas |
|---|---|---|
| `lanes[0].title` — `Development — code, structure, tooling` | 8 | **1** |
| `lanes[1].title` — `Documentation — writing, updating, reorganising docs` | 13 | **1** |
| `#7.full_description` | 201 | 2 |
| `#8.full_description` | 216 | 2 |
| `#57.full_description` | 833 → 851 | 2 |
| | **total** | **8** |

Ninguna de las cinco ubicaciones se tocó. (El desplazamiento 833 → 851 de la línea de `#57` son las
18 líneas nuevas del `depends_on` de `#47`, que está antes en el archivo; el run es byte-idéntico.)

---

## BLOQUE D — EL VALIDADOR, ANTES Y DESPUÉS

Criterio 7. `node tools/project-console/validate-project-console-state.mjs` desde la raíz de
`cantu-studio`, por la vía que no escribe.

| | Antes | Después |
|---|---|---|
| Veredicto | `Project Console state validation passed.` | **igual** |
| Salida | `7 objectives / 28 phases / 72 runs` | **igual** |
| Grupos de cola | `needs_human_decision=0 now=0 ready_next=**12** later=**56** history=4` | `… ready_next=**11** later=**57** history=4` |
| Docs indexados | 142 | 142 |
| Docs curados primary-visible | 54 de 142 | 54 de 142 |
| Component statuses | 16 | 16 |
| Episodios de procedencia Git | 9 | 9 |
| Snapshot de historia Git | 918 commits / 2 ramas | igual |
| **EXIT** | **0** | **0** |

**Avisos no bloqueantes: uno, el de siempre**, palabra por palabra igual antes y después — la arista
externa a `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`. **Ningún aviso nuevo.**

### D.1 El movimiento de la cola **es la prueba de que la corrección surtió efecto**

Criterio 7 pide reportarlo, y es el resultado central del encargo:

```
ready_next  12 -> 11     later  56 -> 57     history  4 -> 4
```

**Un solo run se movió, y es `#47`.** No se dedujo del agregado: se calculó la elegibilidad run a run
sobre el respaldo previo y sobre el archivo escrito, y se diferenciaron los dos conjuntos.

```
salieron del conjunto elegible : ["q47 RUN-CANTU-WEB-DOCUMENTATION-EVIDENCE-001"]
entraron al conjunto elegible  : []
```

`#47` **pasa de elegible a bloqueado** porque recupera 17 dependencias y las 17 están `planned`. Eso
es exactamente lo que el encargo quería restituir: **el conjunto se audita cuando las partes están
hechas.** `later` sube de 56 a 57 por su entrada. `history=4` sin cambio: **no se cerró nada**.

*(La elegibilidad calculada aquí da 13 → 12, un run más que el `ready_next` del validador en los dos
lados. La diferencia es constante y de agrupación —el validador clasifica aparte el run de la arista
externa sin resolver—, así que **el delta y el run que se mueve son los mismos**, que es lo que el
criterio pide.)*

---

## BLOQUE E — EL TEXTO, ANTES Y DESPUÉS

Criterio 2. Los campos, verbatim, leídos del canónico antes y después.

### E.1 `#47` — `RUN-CANTU-WEB-DOCUMENTATION-EVIDENCE-001` (`queue_order` 47)

**`title`**
- **ANTES:** `Audit the seventeen Web component packets against the contract`
- **DESPUÉS:** `Audit the Web component documentation as a whole`

**`summary`**
- **ANTES:** `Audit the seventeen existing Web component packets against the component-doc single-source contract and against the doc runs that own them, recording one conformance verdict per component.`
- **DESPUÉS:** `General audit that the canonical documentation of the seventeen Web components is consistent, complete, and ready, after all component documentation runs close, recording one conformance verdict per component.`

**`full_description`**
- **ANTES:** `The seventeen Web component packets already exist under docs/components/web/ and are registered, so this Run no longer waits on the doc runs that own them. Audit the set as a whole rather than any single component: check each packet against the component-doc single-source contract at docs/docs_management/COMPONENT-DOC-SINGLE-SOURCE-CONTRACT.md, whose Section 3 fixes the required sections and the field discipline, and against the current text of its own doc run. Record one verdict per component: conforming, or exactly what it still lacks. That verdict set is what the operator uses to decide which doc runs close without further work and which keep a task. This Run audits and records; it does not re-document individual components, does not repair any packet, does not close any run, and it makes no production-readiness claim.`
- **DESPUÉS:** `After the seventeen Web component documentation runs close, audit the Web component documentation as a whole rather than any single component. Verify that each component's canonical packet under docs/components/web/ follows the component-doc single-source contract at docs/docs_management/COMPONENT-DOC-SINGLE-SOURCE-CONTRACT.md, whose Section 3 fixes the required sections and the field discipline; and that the repairs those seventeen runs owe have landed in every packet, with no stale pointer left behind and each status banner and registry entry refreshed together. Record one verdict per component: conforming, or exactly what it still lacks. This Run verifies and records the whole; it does not re-document individual components, does not repair any packet, and it makes no production-readiness claim.`

**`depends_on`**
- **ANTES:** `[]` — array vacío
- **DESPUÉS:** **17 ids**, los 17 doc-runs derivados, en orden de cola (tabla §B.4)

### E.2 Por qué este texto **no es un revert**, campo por campo

El encargo lo pide explícito: vuelve el encuadre temporal, **no** la cláusula falsa. Este es el
desglose de qué viene de dónde.

| Pieza | Origen | Comentario |
|---|---|---|
| `title` `Audit the Web component documentation as a whole` | **el texto anterior a la alta, verbatim** | Es el título de conjunto, y restituye la **simetría gemela** con `#46`, que en este mismo encargo queda en `Audit the Web components as a whole`. El verbo `Audit` se conserva, como en los dos runs de conjunto desde el encargo que lo reservó. |
| `summary`, primera parte | **el texto anterior a la alta, verbatim** | `General audit that the canonical documentation of the seventeen Web components is consistent, complete, and ready, after all component documentation runs close`. Nunca portó la cláusula falsa. Es el encuadre temporal, que es lo que vuelve. |
| `summary`, cláusula final | **del texto de la alta** | `recording one conformance verdict per component`. Dice **qué produce** el run. No depende de la premisa falsa, así que sobrevive al re-encuadre. |
| `full_description`, oración 1 | **el texto anterior a la alta, verbatim** | `After the seventeen Web component documentation runs close, audit the Web component documentation as a whole rather than any single component.` **Este es el encuadre que se restituye.** |
| `full_description`, oración 2 | **nueva** | Sustituye a la oración que portaba la cláusula falsa. Ver abajo. |
| `full_description`, oración 3 | **del texto de la alta** | `Record one verdict per component: conforming, or exactly what it still lacks.` |
| `full_description`, cierre | **el texto anterior a la alta, con un no-claim más** | `This Run verifies and records the whole; it does not re-document individual components, ... and it makes no production-readiness claim.` — se conserva la forma; `documents` pasa a `records` porque el run no redacta documentación, y se añade `does not repair any packet`, que viene de la alta. |

**La cláusula falsa NO vuelve, y se comprobó tres veces.** El texto anterior a la alta decía
`each component's canonical packet **feeding the Component Guide** exists and follows the
component-doc single-source contract`. La medición retiró «feeding the Component Guide» de los 17 y
de `#47` por falsa. **La oración 2 nueva se escribió sin ella:**

> `Verify that each component's canonical packet under docs/components/web/ follows the component-doc
> single-source contract at ...; and that the repairs those seventeen runs owe have landed in every
> packet, with no stale pointer left behind and each status banner and registry entry refreshed
> together.`

Donde el viejo decía «feeding the Component Guide», el nuevo dice **`under docs/components/web/`**,
que es la ruta real y verificada. Y donde el viejo se quedaba en «exists and follows the contract»,
el nuevo audita **lo que los 17 realmente deben hoy** — porque los 17 ya no dicen «document» sino
«Verify»: verificar contra el contrato, reparar dos punteros staleados, refrescar banner y registro.
Ese es el trabajo cuyo cierre esta auditoría comprueba.

**Verificación de la cláusula, criterio 3:** `Component Guide` aparece **0 veces** en los tres campos
de `#47` — `title=0`, `summary=0`, `full_description=0`. Comprobado (a) como **guarda que aborta**
antes de entregar el texto al motor, (b) sobre el resultado del plan antes de escribir, y (c) sobre
el archivo escrito. La expresión sigue viva en `#3`, `#9`, `#53`, `#54` y `#72`, que son runs cuyo
objeto **sí** es el Component Guide y que este encargo no toca.

**También sale el encuadre de la premisa falsa.** Se comprobó como guarda que el texto nuevo no
contiene `already exist` ni `no longer waits`: las dos frases con que la cabina explicaba en el
canónico su propia arista retirada. Un run no debe explicar una arista que ahora tiene.

### E.3 Sobre la Sección citada, verificada en disco

`#47` cita la **Sección 3** del contrato. Se leyó el archivo antes de escribirlo, no se citó de
memoria: `docs/docs_management/COMPONENT-DOC-SINGLE-SOURCE-CONTRACT.md` (8 548 B) tiene
`## 3. The canonical packet`, que es donde se fijan las secciones obligatorias y la disciplina de
campos — lo que se audita al juzgar la conformidad de un packet. Los 17 doc-runs citan la
**Sección 6** (`## 6. The update duty`), que es el deber que ellos cumplen. Las dos citas son
correctas y distintas a propósito. También se verificó que `docs/components/web/` contiene
**17 packets `.md`**, uno por componente.

### E.4 `#46` — `RUN-JAME-WEB-READINESS-EVIDENCE-001` (`queue_order` 46)

**`title`**
- **ANTES:** `Audit the Web components and their documentation as a whole ` ← con `and their documentation` **y con espacio final**
- **DESPUÉS:** `Audit the Web components as a whole`

**`summary`** — **sin cambio**, verbatim antes y después:
`General audit that the seventeen Web components and their canonical documentation are consistent, complete, and ready, after all component runs close.`

**`full_description`** — **sin cambio**, verbatim antes y después:
`After the seventeen Web component runs close, audit the Web component set as a whole rather than any single component. Verify that each component was audited against the color and math contracts, implemented where the inventory showed a gap, and passed human visual QA; that each component's canonical packet exists and follows the component-doc single-source contract; and that no component was left with inherited status labels, unresolved documented conflicts, or a missing integration point. Consolidate the remaining blockers and the Generator-safe and column-compatibility boundaries into one readiness evidence package. This Run verifies and documents the whole; it does not re-audit or re-implement individual components, and it makes no production-readiness claim.`

**`depends_on`** — **sin cambio**: los **17** runs de implementación, mismos ids y mismo orden.

**El título se verificó contra el record de la partición ANTES de escribirlo**, como manda el
criterio (C), buscando **dos filas verbatim** en
[`PARTICION-IMPLEMENTACION-Y-DOCUMENTACION-CANTU.md`](PARTICION-IMPLEMENTACION-Y-DOCUMENTACION-CANTU.md);
la ausencia de cualquiera de las dos aborta:

| Fila | Qué dice |
|---|---|
| §D.1, línea 153 | `…WEB-READINESS-EVIDENCE-001` \| `Audit the Web components **and their documentation** as a whole` → **`Audit the Web components as a whole`** |
| §D.2, línea 188 | mitad de IMPLEMENTACIÓN: **`Audit the Web components as a whole`** \| mitad de DOCUMENTACIÓN: `Audit the Web component documentation as a whole` |

**Las dos coinciden con el título que este encargo escribió**, carácter a carácter, y ninguna lleva
espacio final. La partición registró ese título previsto y **nunca lo escribió en el canónico**: el
canónico conservó el título entero de antes de partir, con la mitad que migró a `#47` y con el
espacio de cierre. Ese es el error que (C) corrige.

La discrepancia **ya estaba nombrada**: el encargo anterior paró en su Bloque 0 al encontrarla, la
reportó y el operador confirmó la identidad de `q46`. Este encargo la **arregla**.

**Nota de simetría, ahora completa:** con las dos ediciones, los dos runs de conjunto quedan gemelos
también en el título — `#46` `Audit the Web components as a whole` (carril `DEVELOPMENT`, 17 aristas
a implementación) y `#47` `Audit the Web component documentation as a whole` (carril `DOCUMENTATION`,
17 aristas a documentación) —, que es exactamente el par que la partición diseñó en su §D.2.

---

## BLOQUE F — BARRIDOS, FRONTERAS Y SUPERFICIES

### F.1 Barrido de whitespace: **read-only, solo reportado**

Criterio 9. Se recorrieron los **216 campos** de texto (72 runs × `title`, `summary`,
`full_description`) buscando espacio inicial o final.

**ANTES — 1 campo de 216:**

| Run | Campo | Qué |
|---|---|---|
| `#46` `RUN-JAME-WEB-READINESS-EVIDENCE-001` | `title` | espacio **final**: `"Audit the Web components and their documentation as a whole "` |

**DESPUÉS — 0 campos de 216.**

**El único caso del canónico era `#46`**, y se corrigió porque su título se estaba editando de todos
modos por el criterio (C). **No hubo ningún otro que dejar de tocar:** el barrido no encontró
ninguno más, ni inicial ni final, en ninguno de los 72 runs. El material que este barrido aporta para
decidir si merece encargo propio es, por tanto, **negativo y cerrado**: no lo merece, porque el
problema era de un solo campo y ya no existe.

### F.2 Superficies disjuntas del hilo paralelo

Criterio 12. md5 tomados al abrir y al cerrar.

| Superficie | md5 antes | md5 después | `mtime` | ¿Igual? |
|---|---|---|---|---|
| `aiw-console/roadmap/roadmap.json` | `f299d968fdf781bf31863d696bd9610e` | **igual** | 2026-07-28 03:33:31, sin cambio | **Sí** |
| `context/DECISIONES.md` | `3f6bdf8816a0b43818519eb3582f6511` | **igual** | 2026-07-28 14:10:46, sin cambio | **Sí** |
| `context/aiw-console/CONTRATO.md` | `f77ccec64d99f2048d4bde41638cb228` | **igual** | 2026-07-27 15:48:27, sin cambio | **Sí** |

**Huella conjunta de `tests/` + `context/aiw-console/handoffs/` + `context/aiw-console/records/`**
(md5 de la lista ordenada de md5 por archivo, medida antes de escribir este record):
`c6d971807def6523812d66e47d9882bc` antes y `c6d971807def6523812d66e47d9882bc` después —
**idéntica**. Ni un test, ni un handoff, ni un record existente cambió.

`aiw-console/roadmap/roadmap.json` **se leyó** para componer los ids externos (§B.1); su md5 idéntico
prueba que la lectura no dejó rastro. Lo mismo con el roadmap nuevo de `aiw`, que solo se leyó.

`DECISIONES.md` llegó a esta sesión en `3f6bdf88…` —distinto del `a36e622c…` que registró el record
de la alta, porque el hilo paralelo escribió en él entre medias— y **cierra en el mismo `3f6bdf88…`**:
este encargo **no lo escribió** y no observó escritura ajena durante su ventana.

### F.3 El hilo paralelo escribió en `aiw` durante la ventana

`AIW_Workspace/aiw/roadmap/roadmap.json` (98 697 B, 42 runs) lleva `mtime` **2026-07-28 14:31**,
dentro de la ventana de esta sesión y **antes** de su escritura. No existía cuando el record de la
alta midió los ids externos. **Este encargo solo lo leyó**, como dato para el `Set` de ids externos.
No es suyo, no lo tocó, y no cambia el resultado (§B.1). Se deja constancia.

### F.4 Conteo de records: el ticket dice 39; son **40**

Criterio 11 habla de «los 39 existentes». Al abrir había **40** archivos en
`context/aiw-console/records/`; al cerrar, **41** — el que entra es este. **Sin colisión:** no hay
ningún record previo que empiece por `RESTITUCION-`, ni ninguno con `ARISTAS`, `CIERRE-` (el más
próximo es `CIERRE-REGISTRO-Y-RELEVO-TERCERO.md`, distinto) o `AUDITORIA` en el nombre. Se reporta la
cifra como corrección al ticket; no tiene consecuencia sobre nada.

### F.5 `.project/` no se re-emitió — y quién lo re-emitió

Criterio 10. **Este encargo no re-emitió `.project/`**, y hay dos pruebas independientes:

1. **El barrido contra el marcador** tomado inmediatamente antes de la única escritura devuelve
   **un solo archivo**, `./.aiw/roadmap/roadmap.json`. Los seis artefactos de `.project/` son
   anteriores al marcador.
2. **Su contenido es el de antes de esta edición.** `.project/roadmap.json` (14:37) muestra
   `#46` con el título `"Audit the Web components and their documentation as a whole "` —con espacio
   final— y `#47` con `deps=0` y el título de la alta. Es decir: **el estado previo**, no el escrito.

Pero `.project/` **sí se movió durante la ventana de esta sesión**: sus seis artefactos llevan
`mtime` **14:37**, posterior al arranque (14:26) y anterior a la escritura (14:59:44). **No fue este
encargo.** Es una re-emisión de otro actor —el operador desde la consola global, o el hilo paralelo—,
y queda como hecho registrado, no como hallazgo que este encargo deba arreglar.

**Consecuencia práctica, que conviene saber antes de mirar la consola:** `.project/` refleja ahora un
estado **desfasado por una edición**. La consola seguirá mostrando `#47` elegible y sin dependencias,
y `#46` con su título viejo, hasta que el operador re-emita desde la consola en su próxima escritura.
**Es lo esperado, no un fallo.**

---

## BLOQUE G — HALLAZGOS NOMBRADOS, NINGUNO TOCADO

### 1. `#46` conserva el `depends_on` en orden histórico

Sus 17 ids van en `queue_order` 14,16,12,18,20,… — con `COLUMNS` (`q12`) en tercera posición. El de
`#47` queda en orden de cola limpio. Los conjuntos son gemelos exactos (§B.4); solo el orden del
array difiere. **No se reordenó**: es cosmético y reordenar `#46` está fuera de alcance.

### 2. `#46` sigue diciendo «verifies and documents the whole»

Su `full_description` cierra con `This Run verifies and documents the whole`, y su mitad de
documentación migró entera a `#47` en la partición. Es el mismo tipo de residuo que el título tenía.
**No se tocó**: el criterio (C) autoriza solo el título. Candidato natural para un encargo de
re-encuadre de `#46`, junto con su `summary`, que aún dice «the seventeen Web components **and their
canonical documentation**».

### 3. Dos rayas `—` viven en el bloque `lanes`, no en un run

§C.3. Las etiquetas de los dos carriles llevan `U+2014`. No son texto de run y ningún encargo las ha
nombrado hasta ahora. Sin cambio, fuera de alcance.

### 4. Seis rayas `—` preexistentes en tres runs ajenos

`#7`, `#8` y `#57` siguen con sus 6 U+2014. Sin cambio, fuera de alcance, ya nombradas por records
anteriores.

### 5. El roadmap nuevo de `aiw` cambia el conjunto de ids externos

§F.3. La entrada `aiw` del registro pasó de aportar 0 ids a aportar 42. No afecta a la única arista
externa de Cantu, pero sí cambia el conjunto que cualquier edición futura compondrá. Queda anotado
para que el próximo encargo no lo lea como deriva.

### 6. El ticket declaró 39 records; son 40

§F.4. Se reporta como corrección de la cifra del encargo, no como hallazgo del archivo.

---

## BLOQUE H — NO-CLAIMS DE ESTE ENCARGO

- **No ejecutó `#46` ni `#47`.** No se auditó un solo packet, ni un solo componente, ni se emitió un
  solo veredicto de conformidad. Este encargo corrige **el texto y el grafo** de esos dos runs; el
  trabajo que describen sigue íntegramente pendiente.
- **No afirma que los 17 packets sean correctos.** Que existan y estén registrados viene de una
  medición previa; **existencia no es conformidad**, ni QA, ni aceptación. Decirlo componente a
  componente es exactamente el trabajo que `#47` ahora vuelve a describir — y que ahora vuelve a
  esperar a que los 17 cierren.
- **No tocó ninguno de los 17 doc-runs**, ni sus 17 runs de implementación, ni `#72`, ni los ocho
  recién re-encuadrados, ni `#48`. Verificado por comparación campo a campo: **70/70 idénticos**.
- **No cambió ningún `status`.** Los 4 `completed` de antes son los 4 de después, por id.
  `history=4` sin moverse. **No cerró ningún run** — cerrarlos es del operador desde la consola
  global, único punto de serialización.
- **No renumeró nada.** Los 72 `queue_order` son los mismos, comparados uno a uno contra el respaldo.
  **0 filas de remap** en el plan que escribió.
- **No movió runs entre fases, no creó ni borró runs, fases u objetivos.** No aplicó `barrier`. No
  declaró carriles.
- **No resolvió la arista externa** a `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`: se le dio al motor como
  dato para poder editar, y sigue saliendo como el mismo aviso no bloqueante de siempre, palabra por
  palabra.
- **No re-emitió `.project/`** (§F.5). Que se moviera a las 14:37 es de otro actor; queda desfasado
  por una edición hasta que el operador re-emita.
- **No corrigió whitespace fuera del título de `#46`.** El barrido (§F.1) fue read-only y, de hecho,
  no encontró ningún otro caso que dejar de tocar.
- **No escribió en `DECISIONES.md`**, ni en `CONTRATO.md`, ni en el roadmap de `aiw-console`, ni en
  ningún test, handoff o record existente. md5 idénticos, declarados en §F.2.
- **No usó git en ninguna forma** — ni un comando, ni lectura. No levantó servidores. No corrió
  ninguna suite. El único ejecutable que corrió es el validador de estado de Cantu, de solo lectura,
  dos veces por su vía propia y una tercera como autoridad inyectada en la escritura.
- **No declara production readiness** ni certifica ningún componente.

**Límite declarado del re-encuadre.** El texto nuevo de `#47` afirma que la auditoría corre «after
the seventeen Web component documentation runs close» y que verificará «that the repairs those
seventeen runs owe have landed». Eso es una **descripción del trabajo futuro**, no una medición: este
encargo no comprobó que ninguna reparación haya ocurrido, y de hecho los 17 están `planned` — que es
justo por lo que las 17 aristas vuelven.
