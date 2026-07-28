# ENCADENAMIENTO DE LOS CONTRATOS `#7` → `#8` → `#9` — DOS ARISTAS EN CANTU

> Encargo de taller **estrictamente aditivo** sobre `cantu-studio`. **Una sola escritura atómica**
> sobre `.aiw/roadmap/roadmap.json`, y su contenido son **dos aristas `depends_on` nuevas** en
> `RUN-JAME-WEB-COMPONENT-CONTRACT-STANDARDIZATION-001` (`queue_order` 9), hacia el contrato de color
> (`queue_order` 7) y el de math (`queue_order` 8).
>
> **Nada más cambió.** Ni un carácter de texto en ningún run —`#9` incluido—, ningún `status`, ningún
> `queue_order`, ninguna otra arista, ningún otro run. Los **71 runs no tocados son byte-idénticos**, y
> de `#9` cambia **una sola clave**: `depends_on`.
>
> Fecha: 2026-07-28. **Git no se usó en ninguna forma** — ni un comando, ni lectura. No se levantó
> ningún servidor. No se corrió ninguna suite —ni de Cantu ni de `aiw-console`—. **No se re-emitió
> `.project/`.** **No se ejecutó `#7`, `#8` ni `#9`:** este encargo escribe una arista, no un contrato.
>
> **Todas las cifras que el ticket declaró sobrevivieron a la medición.** Ninguna corrección que
> reportar: 151 aristas antes, `ready_next` 11, 7/28/72, `completed` 4, carriles 23/49, 8 no-ASCII,
> `#7` sin dependencias y `#8` dependiendo solo de `#1` — las nueve verificadas en el canónico antes de
> planear nada.

## Archivos escritos por este encargo, y ninguno más

| Repo | Archivo | Qué |
|---|---|---|
| `cantu-studio` | `.aiw/roadmap/roadmap.json` | las dos aristas — **la única escritura en Cantu**, y es una sola |
| `aiw-console` | `context/aiw-console/records/ENCADENAMIENTO-CONTRATOS-7-8-A-9-CANTU.md` | este record |

**Barrido de `mtime`** sobre el árbol entero de `cantu-studio`, **con `node_modules` incluido** y
`.git/` excluido, contra un marcador tomado en disco **inmediatamente antes de la única escritura**
(2026-07-28 15:53:14.820633000 −0600):

```
./.aiw/roadmap/roadmap.json
```

**Exactamente un archivo.** El barrido recorrió **21 322 ficheros**, de los cuales **20 255 viven en
los nueve árboles `node_modules`** del repo (`tools/author-lite/`, `tools/author-lite/editor-ui/`,
`tools/author-lite/compiler-api/` y sus seis anidados): **ninguno posterior al marcador**. No quedó
ningún temporal en `.aiw/roadmap/` —el motor escribe `.roadmap.json.tmp-<pid>` y lo renombra—, y su
respaldo propio vive en `os.tmpdir()`, fuera de los tres repos:
`C:\Users\chris\AppData\Local\Temp\roadmap-backup-55156-roadmap.json`.

**Sobre `.project/`: ver §F.3.** No se re-emitió.

---

## BLOQUE A — LÍNEAS BASE

### A.1 Respaldo antes de tocar nada, fuera del repo

Criterio 6.

| Qué | Valor |
|---|---|
| Ruta | `<scratchpad>/work/backup/roadmap.BEFORE.json` (fuera de los tres repos) |
| Bytes | **96 708** |
| md5 | `8b3f6794afe89680c861333fe5d0775e` |
| `mtime` del canónico al leerlo | 2026-07-28 14:59:44.966 −0600 |

El md5 de apertura coincide **exactamente** con el md5 de cierre del encargo anterior
([`RESTITUCION-ARISTAS-47-Y-AUDITORIA-AL-CIERRE-CANTU.md`](RESTITUCION-ARISTAS-47-Y-AUDITORIA-AL-CIERRE-CANTU.md)
§A.2): **el canónico no se movió entre los dos encargos**, ni el hilo paralelo lo tocó. Se volvió a
comprobar **inmediatamente antes de escribir**: seguía en `8b3f6794…`.

### A.2 Líneas base nuevas

| Qué | Antes | Después |
|---|---|---|
| Bytes | 96 708 | **96 847** |
| md5 | `8b3f6794afe89680c861333fe5d0775e` | **`2f0e7ffc413d304bd7178d23b2e33c30`** |
| `mtime` | 2026-07-28 14:59:44 | 2026-07-28 15:53 |
| baseline del motor (sha256 de los bytes leídos) | `sha256:583bf4a88b16250ab49e2d15…` | — |
| EOL | CRLF (1 116 pares, puro, 0 LF sueltos) | CRLF (**1 118** pares, puro, 0 LF sueltos) |

**+139 bytes, y la aritmética cuadra sin residuo.** El diff son **dos líneas nuevas y una coma**, y
nada más — primera divergencia en la línea 236, última en la 239:

```
+70   "RUN-JAME-COLOR-PALETTE-COMPATIBILITY-CONTRACT-001",   (68 B + CRLF)
+68   "RUN-JAME-MATH-FORMULA-COMPATIBILITY-CONTRACT-001"     (66 B + CRLF)
 +1   la coma que gana la linea 236, que antes cerraba el array
----
+139  medido
```

Los 2 pares CRLF nuevos (1 116 → 1 118) son esas dos líneas. **El `depends_on` de `#9` ya era un
array multilínea antes de la edición**, así que no hubo cambio de forma: solo dos entradas más.

---

## BLOQUE B — MÉTODO

### B.1 Qué motor, y por qué ese

Criterio 6. **Motor: el de `aiw-console`** — `tools/roadmap/roadmap-plan.mjs` sobre
`tools/roadmap/roadmap-core.mjs` —, el mismo módulo que ejecuta el endpoint de escritura de la consola
global, y el mismo de las cinco veces anteriores. Misma razón ya verificada: el core local de Cantu no
adopta carriles y no resuelve la arista externa, así que su pre-flight rechazaría el archivo antes de
planear nada.

**Ids externos, sin que ninguna identidad de proyecto entre en el motor.** Se replicó
`externalRunIdsFor` (`project-console/serve.mjs:335`) entrada por entrada sobre
`project-console/projects.json`, usando la propia resolución de la consola —`detectRootLayout` y
`flattenRoadmapTree` de `tools/projector/project.mjs`— y saltando la entrada activa:

| Entrada del registro | Raíz resuelta | Ids |
|---|---|---|
| `aiw-console` | `projects/aiw-console` | **45** |
| `cantu-studio` | — | saltada (es la activa) |
| `aiw` | `AIW_Workspace/aiw` | **42** |
| | **unión** | **87** |

**Idéntico al del encargo anterior** (§B.1 de aquel record): 45 + 42 = 87. El motor recibe un `Set`;
es dato, no proyecto. Se abortaba si el conjunto salía vacío, porque entonces la arista externa de
`#4` no resolvería y el pre-flight rechazaría el archivo.

### B.2 UNA sola pasada, un solo plan, una sola escritura

Criterio 6. Las dos aristas caben en **un único `batch`**: `set-deps` está en la lista `batchable` del
motor (`roadmap-plan.mjs:173`) y no es operación de identidad, así que dos `set-deps` seguidos se
aplican contra el **mismo** objeto y se serializan **una** vez.

```
PASS UNICO   batch [ set-deps(#9, add-dep #7), set-deps(#9, add-dep #8) ]  -> serializado
             applyPlan(canonico, serializado)                              -> UNA escritura atomica
```

**`--add-dep`, no `--depends-on`.** Es la diferencia que garantiza el criterio 2 por construcción, no
por inspección: `core.setDeps` con `addDep` **parte del array actual** y solo añade
(`roadmap-core.mjs:872-873`), así que la arista existente hacia
`RUN-JAME-COMPONENT-DOC-SINGLE-SOURCE-CONTRACT-001` no puede perderse. Un `--depends-on` habría
**reemplazado** el array entero y habría puesto esa arista en manos de que yo la re-teclease. No se
usó.

Una sola vista previa, un solo serializado, una sola escritura con respaldo → temp → `fsync` → rename
atómico y rollback. **El canónico nunca vio un estado intermedio.**

| | filas de remap | avisos del motor |
|---|---|---|
| el plan | **0** | **0** |

`0` filas de remap **dicho por el motor**, no por inspección posterior: `set-deps` no mueve nada de
sitio. `0` avisos: las dos dependencias resuelven **dentro** del propio roadmap, así que ninguna
disparó el aviso de dependencia externa.

### B.3 Ningún `run_id` se tecleó de memoria

Criterio 1, que es el criterio central de este encargo. **Los tres ids se derivaron del canónico por
`queue_order`**, y cada uno pasó una guarda de título que **aborta antes de planear** si no casa
carácter a carácter con el título que el ticket cita.

| Qué | Cómo se derivó | Guarda de título (del ticket) | Resultado |
|---|---|---|---|
| `#7` | por `queue_order 7` | `Define the color and palette compatibility contract` | `RUN-JAME-COLOR-PALETTE-COMPATIBILITY-CONTRACT-001` |
| `#8` | por `queue_order 8` | `Define the math, formula, and Formula Inserter compatibility contract` | `RUN-JAME-MATH-FORMULA-COMPATIBILITY-CONTRACT-001` |
| `#9` | por `queue_order 9` | `Define shared component contracts and the revalidation checklist` | `RUN-JAME-WEB-COMPONENT-CONTRACT-STANDARDIZATION-001` |

**Los tres títulos casaron exactamente.** No hubo discrepancia que reportar y no hizo falta parar.

**El id de `#8` no aparece en el ticket, y ese es el punto.** El ticket lo describe solo por
`queue_order` y por título. Se derivó, y solo entonces se supo que es
`RUN-JAME-MATH-FORMULA-COMPATIBILITY-CONTRACT-001` — un nombre que **no** contiene «FORMULA-INSERTER»
pese a que su título sí lo menciona, que es exactamente el tipo de id que teclear de memoria habría
fallado.

Para `#7` y `#9`, cuyos ids **sí** cita el ticket, la comprobación se hizo **en ese sentido**: el id
derivado del canónico se contrastó contra el que el ticket cita, y una diferencia habría abortado. El
ticket nunca fue la fuente; fue el control.

### B.4 Guardas del estado de partida, todas antes de planear

Cada una aborta. Ninguna saltó:

| Guarda | Esperado por el ticket | Medido |
|---|---|---|
| `#9.depends_on` es exactamente `[RUN-JAME-COMPONENT-DOC-SINGLE-SOURCE-CONTRACT-001]` | 1 arista, esa | **cuadró** |
| `#7` no tiene dependencias | 0 | **0** |
| `#8` depende solo de `#1` | 1 | **1**, `RUN-JAME-SMART-FORMULA-FIELD-RULE-ONLY-BASELINE-001`, `completed` |
| aristas totales | 151 | **151** |
| `ready_next` | 11 | **11** |

### B.5 Roundtrip byte-exacto, comprobado antes de tocar

Criterio 6. Antes de planear, `serialize(parseRoadmap(raw), detectEol(raw)) === raw` sobre el archivo
objetivo. **Byte-exacto**, EOL **CRLF**, 96 708 bytes. Comprobado **dos veces**: en el ensayo y otra
vez contra el canónico en la pasada real.

### B.6 Ensayo completo sobre copia, y `cmp` contra ella

Criterio 6. La secuencia entera —los ids externos, el roundtrip, la derivación con sus guardas de
título, las guardas de partida, el plan, los invariantes **y la escritura**— se corrió primero contra
una copia (`<scratchpad>/work/out/rehearsal.json`). Solo con todo en verde sobre la copia se corrió
contra el canónico.

```
cmp <canónico> <copia ensayada>   ->  SIN DIFERENCIAS
```

md5 de los dos, y del serializado que el motor produjo en la pasada real:
`2f0e7ffc413d304bd7178d23b2e33c30`, **los tres**. **Lo que se ensayó es exactamente lo que quedó
escrito.** Durante el ensayo el canónico conservó su md5 de apertura, comprobado.

*(Única diferencia declarada entre ensayo y pasada real: la autoridad inyectada. Sobre la copia corrió
la mitad que sí aplica —re-lectura, invariantes, forma de árbol—; el validador del propio proyecto
solo tiene sentido contra el canónico, y allí sí corrió. Ver §B.7.)*

### B.7 Autoridad de escritura inyectada

A `applyPlan` se le pasó un validador que, sobre el archivo ya renombrado, (a) lo re-lee y re-verifica
los invariantes del motor con la arista externa resuelta, (b) comprueba que conserva la forma
`objectives -> phases -> runs` que sirve el emisor, y (c) lanza el validador del propio proyecto
exigiendo `EXIT 0`. Cualquiera de los tres en rojo restaura el respaldo. Salida registrada:

```
re-read OK + project validator EXIT 0
rolledBack: false     written: true     bytes: 96847
```

---

## BLOQUE C — INVARIANTES, CON SUS NÚMEROS

Criterio 7. Medidos contra el **respaldo previo**, campo a campo, **antes de escribir** (como guarda
del plan) y otra vez **sobre el archivo escrito**.

| Invariante | Antes | Después | ¿Esperado? |
|---|---|---|---|
| Objetivos | **7** | **7** | sí |
| Fases | **28** | **28** | sí |
| Runs | **72** | **72** | sí |
| `queue_order` denso, único, contiguo | 1..72 | **1..72** | sí |
| Runs renumerados | — | **0** (comparados uno a uno por `run_id`) | sí |
| Filas de remap del plan | — | **0** | sí |
| Aristas `depends_on` | **151** | **153** | sí — **+2 exactas** |
| Aristas colgantes (externa resuelta) | **0** | **0** | sí |
| Aristas externas legales | 1 | **1**, la misma | sí |
| Dependencias que no preceden a su dependiente | **0** | **0** | sí |
| Ciclos | **0** | **0** | sí |
| `status` | `completed 4 · planned 68` | **igual** | sí |
| Los 4 `completed`, por id | q1, q2, q3, q48 | **los mismos 4** | sí |
| Runs con `status` cambiado | — | **0** | sí |
| Carril `DOCUMENTATION` | **23** | **23** | sí |
| Carril `DEVELOPMENT` (clave ausente) | **49** | **49** | sí |
| Runs no tocados byte-idénticos | — | **71 de 71** | sí |
| Caracteres no-ASCII en todo el archivo | **8** | **8** | sí |
| Orden de claves de `#9` | — | **preservado** | sí |

### C.1 Las aristas: **151 → 153**, y son +2 y ninguna otra

Criterio 3. El ticket pedía exactamente esto, y **sale exacto**:

```
151  (antes, medido)
 +2  (las dos de #9: hacia #7 y hacia #8)
----
153  (medido en el archivo escrito)
```

Ninguna otra arista se movió: el `depends_on` de los 71 runs no tocados es **byte-idéntico** (§C.2), y
las **+2** son ambas de `#9`, que pasa de **1** a **3**.

**Las tres comprobaciones de sanidad del grafo, cada una sobre el grafo ENTERO, no solo sobre `#9`:**

- **0 aristas colgantes.** El barrido plano encuentra **1** id que no resuelve dentro del propio
  roadmap: `RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` →
  `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`. **No es colgante: es externa y legal** (CONTRATO §10.d Regla
  2), resuelve en los 87 ids del registro y es la de siempre. Descontada ella, **colgantes = 0**,
  antes y después. `core.checkInvariants` con `externalRunIds` da limpio en los dos lados.
- **0 dependencias que no preceden.** Comprobado sobre las 151 y luego sobre las 153: **0** y **0**.
  Para las dos nuevas en particular (criterio 4), `#7` y `#8` están en `queue_order` 7 y 8 y `#9` en 9,
  así que **las dos preceden**; verificado también como guarda previa.
- **0 ciclos.** DFS con marcado tricolor sobre el grafo interno completo, antes y después: **0** y
  **0**. Era esperable —`#7` no tiene dependencias y `#8` solo depende de `#1`, que es `completed`—
  pero se comprobó sobre el grafo entero, no razonando sobre esos dos runs.

### C.2 Los 71 no tocados, y la única clave que cambia

Criterio 7. Comparados **campo a campo** (`JSON.stringify` del run completo, más su objetivo y su
fase) contra el respaldo previo: **71/71 byte-idénticos**, ninguna diferencia, ninguno cambió que no
debiera.

De **`#9`** cambia **exactamente una clave**: `depends_on`. Comprobado clave por clave:

| Clave de `#9` | Estado |
|---|---|
| `run_id` | **sin cambio** |
| `queue_order` (9) | **sin cambio** |
| `title` | **sin cambio** |
| `summary` | **sin cambio** |
| `full_description` | **sin cambio** |
| `status` (`planned`) | **sin cambio** |
| `depends_on` | **1 → 3** ← lo único |
| objetivo / fase (`O5` / `O5.P6`) | **sin cambio** |
| orden de las claves | **preservado**, idéntico |

**Ningún campo de texto cambia en ningún run, `#9` incluido.** Los 216 campos de texto (72 runs ×
`title`, `summary`, `full_description`) son byte-idénticos antes y después.

### C.3 El `depends_on` de `#9`, antes y después

**ANTES — 1:**

```
RUN-JAME-COMPONENT-DOC-SINGLE-SOURCE-CONTRACT-001
```

**DESPUÉS — 3:**

| # | id | `queue_order` | `status` | Origen |
|---|---|---|---|---|
| 1 | `RUN-JAME-COMPONENT-DOC-SINGLE-SOURCE-CONTRACT-001` | 3 | `completed` | **la que ya estaba** — conservada |
| 2 | `RUN-JAME-COLOR-PALETTE-COMPATIBILITY-CONTRACT-001` | 7 | `planned` | **nueva** |
| 3 | `RUN-JAME-MATH-FORMULA-COMPATIBILITY-CONTRACT-001` | 8 | `planned` | **nueva** |

Criterio 2 cumplido: **tres, no dos.** Las nuevas van al final porque `--add-dep` **anexa**; el orden
del array es cosmético y no se reordenó.

### C.4 Bytes no-ASCII: **8 → 8**

Criterio 7. Barrido del archivo entero, antes y después: **8 → 8, sin cambio.** Era garantía
estructural, no aspiracional: **este encargo no escribió ni un carácter de texto**, solo dos ids, y
los ids del canónico son ASCII puro por construcción. Las 8 rayas `—` (U+2014) siguen donde estaban —
2 en el bloque `lanes` de la raíz, 2 en `#7`, 2 en `#8` y 2 en `#57` —, ya inventariadas por el record
anterior (§C.3). **Ninguna se tocó**; las de `#7` y `#8` viven en su `full_description`, que este
encargo solo leyó.

---

## BLOQUE D — EL VALIDADOR, ANTES Y DESPUÉS

Criterio 8. `node tools/project-console/validate-project-console-state.mjs` desde la raíz de
`cantu-studio`, por la vía que no escribe.

| | Antes | Después |
|---|---|---|
| Veredicto | `Project Console state validation passed.` | **igual** |
| Salida | `7 objectives / 28 phases / 72 runs` | **igual** |
| Grupos de cola | `needs_human_decision=0 now=0 ready_next=`**`11`**` later=`**`57`**` history=4` | `… ready_next=`**`10`**` later=`**`58`**` history=4` |
| Docs indexados | 142 | 142 |
| Docs curados primary-visible | 54 de 142 | 54 de 142 |
| Component statuses | 16 | 16 |
| Episodios de procedencia Git | 9 | 9 |
| Snapshot de historia Git | 918 commits / 2 ramas | igual |
| **EXIT** | **0** | **0** |

**Avisos no bloqueantes: uno, el de siempre**, palabra por palabra igual antes y después — la arista
externa a `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`. **Ningún aviso nuevo.** Es el único aviso admisible
que el criterio 8 contempla.

El validador corrió **tres veces**: antes por su vía propia, como autoridad inyectada dentro de la
escritura, y después por su vía propia otra vez. `EXIT 0` las tres.

### D.1 El movimiento de elegibilidad **es la prueba de que la arista surtió efecto**

Criterio 9, y es el resultado central del encargo.

```
ready_next  11 -> 10     later  57 -> 58     history  4 -> 4
```

**No se dedujo del agregado.** Se calculó la elegibilidad **run a run** sobre el respaldo previo y
sobre el archivo escrito, con la **regla exacta del validador**
(`validate-project-console-state.mjs:862-865`: un `planned` es `ready_next` si **toda** dependencia
resuelve dentro del roadmap y está `completed`), y se diferenciaron los dos conjuntos:

```
salieron del conjunto elegible : ["q9 RUN-JAME-WEB-COMPONENT-CONTRACT-STANDARDIZATION-001"]
entraron  al conjunto elegible : []
```

**Un solo run se movió, y es exactamente `#9`. Ninguno más salió y ninguno entró**, que es lo que el
criterio 9 exige literalmente.

**Por qué se mueve, y por qué esto era el objetivo.** Antes, la única dependencia de `#9` era `#3`, que
está `completed` — así que `#9` figuraba **elegible ya**, ejecutable hoy. Al recibir dos dependencias
`planned`, pasa a `later`. Es decir: **la cola dejó de ofrecer `#9` como arrancable, que es justo lo
que su propio texto vuelve imposible.** `later` sube de 57 a 58 por su entrada. `history=4` sin
cambio: **no se cerró nada.**

*(A diferencia del encargo anterior, aquí el cálculo run a run y el `ready_next` del validador dan la
**misma** cifra en los dos lados —11 y 10—, porque se replicó la regla del validador en vez de tratar
la arista externa como resuelta. El run de la arista externa, `#4`, cae en `later` por los dos
métodos.)*

### D.2 La secuencia que el ticket quería, ahora en el dato

```
ANTES:  #7 ──?          #9 ── #3
        #8 ──?

AHORA:  #7 ─────┐
        #8 ─────┼──▶ #9
        #3 ─────┘
```

El `full_description` de `#9` encadena **tres** piezas, verbatim del canónico:

> «…verify compatibility with the **Color / Palette compatibility contract** and the **Math / Formula /
> Formula Inserter compatibility contract** where applicable…»

> «…and it **consumes the component-doc single-source contract** so the documentation Definition of
> Done references one canonical packet model.»

El grafo declaraba solo la tercera. Ahora declara las tres. **El texto no se tocó** — se leyó como
justificación, y sigue byte-idéntico.

---

## BLOQUE E — SUPERFICIES DISJUNTAS Y FRONTERAS

### E.1 El hilo paralelo, no tocado

Criterio 12. md5 tomados al abrir y al cerrar.

| Superficie | md5 antes | md5 después | ¿Igual? |
|---|---|---|---|
| `aiw-console/roadmap/roadmap.json` | `f299d968fdf781bf31863d696bd9610e` | `f299d968fdf781bf31863d696bd9610e` | **Sí** |
| `context/DECISIONES.md` | `3f6bdf8816a0b43818519eb3582f6511` | `3f6bdf8816a0b43818519eb3582f6511` | **Sí** |
| `context/aiw-console/CONTRATO.md` | `f77ccec64d99f2048d4bde41638cb228` | `f77ccec64d99f2048d4bde41638cb228` | **Sí** |

**Huella conjunta de `tests/` + `context/aiw-console/handoffs/` + `context/aiw-console/records/`**
(md5 de la lista ordenada de md5 por archivo, **124 archivos**, medida antes de escribir este record):
`40c0a0d2fe09d9a87ee20da804fd94ce` antes y `40c0a0d2fe09d9a87ee20da804fd94ce` después —
**idéntica**. Ni un test, ni un handoff, ni un record existente cambió.

`aiw-console/roadmap/roadmap.json` y `aiw/roadmap/roadmap.json` **se leyeron** para componer los ids
externos (§B.1); sus md5 idénticos prueban que la lectura no dejó rastro.

Los tres md5 de esta tabla son **los mismos con que cerró el encargo anterior** (§F.2 de aquel
record): el hilo paralelo **no escribió en ninguna de las tres superficies** entre los dos encargos.

### E.2 Sí escribió en `records/`, y por eso la huella conjunta difiere de la del encargo anterior

La huella conjunta de aquel record era `c6d971807def6523812d66e47d9882bc`; la de este es
`40c0a0d2fe09d9a87ee20da804fd94ce`. **La diferencia no es de este encargo**: entre los dos entró un
record nuevo del hilo paralelo, `EMISION-PROJECT-AIW.md` (`mtime` 2026-07-28 15:09:18), que es
posterior al cierre del encargo anterior (15:05) y anterior a la apertura de este. **Lo que importa es
que la huella no se movió dentro de la ventana de este encargo**, y no se movió.

### E.3 Conteo de records: **42 al abrir, 43 al cerrar**

Criterio 11, que el ticket marca como cifra que el encargo anterior falló. Contados en disco, no de
memoria: `ls -1 *.md | wc -l` sobre `context/aiw-console/records/` da **42** al abrir; con este
record, **43**.

*(Trazabilidad de la cifra: el ticket anterior declaró 39 y había 40; aquel record cerró con 41; el
hilo paralelo añadió `EMISION-PROJECT-AIW.md` → 42; este añade el suyo → 43.)*

**Sin colisión de nombre.** No hay ningún record previo que empiece por `ENCADENAMIENTO-`, ni ninguno
que contenga `ENCADEN` en el nombre. Los dos más próximos por palabra suelta son
`CONTRATO-FUENTE-UNICA-DOC-COMPONENTES-CANTU.md` y
`RESTITUCION-ARISTAS-47-Y-AUDITORIA-AL-CIERRE-CANTU.md`, y ninguno de los dos colisiona.

---

## BLOQUE F — `.project/`, Y QUIÉN LO MOVIÓ

### F.1 Este encargo no lo re-emitió

Criterio 10. **Dos pruebas independientes:**

1. **El barrido contra el marcador** tomado inmediatamente antes de la única escritura devuelve **un
   solo archivo**, `./.aiw/roadmap/roadmap.json`. Los seis artefactos de `.project/` son anteriores al
   marcador y **conservan su `mtime` al cierre**, comprobado archivo por archivo.
2. **Su contenido es el de antes de esta edición.** `.project/roadmap.json` muestra `#9` con
   **`depends_on` de 1 elemento**, el estado **previo**. Si este encargo lo hubiera re-emitido,
   mostraría 3.

### F.2 Pero `.project/` sí se movió durante la ventana de la sesión, y no fue este encargo

Sus seis artefactos llevan `mtime` **2026-07-28 15:20:14**, posterior al cierre del encargo anterior
(15:05) y **anterior** a la escritura de este (15:53:14). Es una re-emisión de **otro actor** —el
operador desde la consola global, o el hilo paralelo, que a las 15:09 escribía su record de emisión—.
Queda como hecho registrado, **no como hallazgo que este encargo deba arreglar**.

**Consecuencia práctica, que conviene saber antes de mirar la consola:** `.project/` refleja ahora un
estado **desfasado por una edición**. La consola seguirá mostrando `#9` **elegible y con una sola
dependencia** hasta que el operador re-emita. **Es lo esperado, no un fallo.**

---

## BLOQUE G — HALLAZGOS NOMBRADOS, NINGUNO TOCADO

El alcance pide nombrar toda dependencia implícita que se detecte, **y no escribirla**. Ninguno de los
cinco se tocó.

### 1. Diez runs nombran el contrato de color sin declarar arista directa — y ahora lo alcanzan por `#9`

Barrido de texto sobre los 72 runs: **18** nombran el contrato de color; **10 de ellos no tenían
arista directa** a `#7`. Los diez son `q22`, `q24`, `q30`, `q32`, `q34`, `q36`, `q38`, `q40`, `q42`,
`q44` — todos runs de componente. **Los diez dependen de `#9`**, así que **con la arista escrita hoy
alcanzan `#7` por transitividad**. No se les añadió arista directa: sería redundante y está fuera de
alcance. Se nombran porque, si alguien mide «aristas directas al contrato de color», la cifra seguirá
diciendo 7 y no 17.

### 2. La misma asimetría, más marcada, con el contrato de math

Solo **2** runs tenían arista directa a `#8` (`q30` Arithmetic y `q32` Rule) — los dos que su propio
texto nombra como aplicación. Con la arista de hoy, los **17** runs que dependen de `#9` alcanzan
`#8`: **15 lo ganan solo por transitividad**. Es coherente con el «where applicable» del texto de
`#9`, y es precisamente lo que el encadenamiento pretendía. Sin cambio.

### 3. Las aristas directas a `#7` y `#8` quedan transitivamente redundantes

De los 17 runs que dependen de `#9`, **7 ya tenían arista directa a `#7`** y **2 a `#8`**. Esas nueve
aristas son ahora **implicadas** por el camino `run → #9 → #7/#8`. **No se retiró ninguna**: retirar
aristas no está en el alcance, la redundancia es inocua para el orden, y una arista directa documenta
una relación que el texto del run nombra explícitamente. Se anota por si un encargo futuro decide
normalizar.

### 4. Las fases de `O5` no están en orden numérico de `phase_id`

`#7` vive en `O5.P5`, `#8` en `O5.P7` y `#9` en `O5.P6`, y el array de fases de `O5` va **P5, P7, P6,
P1, P2, P3**. La precedencia correcta la da el `queue_order` (7 < 8 < 9), que es lo que el motor y el
validador usan, y por eso **no hay violación**. Pero leer la secuencia del `phase_id` daría
`P5 → P6 → P7`, que **invierte `#8` y `#9`**. Sin cambio, fuera de alcance; se nombra porque es una
trampa de lectura justo en los tres runs de este encargo.

### 5. `#8` explica su propia arista en el texto; `#9` ahora también podría

El `full_description` de `#8` dice «This foundation **builds on** the accepted Smart Formula Field
RULE_ONLY baseline», y esa arista existe (`#1`). El de `#9` nombra los tres contratos que consume,
pero con verbos de contenido («verify compatibility with…», «consumes…»), no de orden. **No se tocó
ningún texto** — el criterio lo prohíbe, y de hecho el texto ya bastaba para justificar la arista, que
es lo que este encargo usó.

---

## BLOQUE H — NO-CLAIMS DE ESTE ENCARGO

- **No ejecutó `#7`, `#8` ni `#9`.** No se escribió ni una línea de contrato de color, de math ni de
  contratos compartidos de componente. Este encargo toca **el grafo**; el trabajo que los tres runs
  describen sigue **íntegramente pendiente**, y los tres siguen `planned`.
- **No cambió texto de ningún run, `#9` incluido.** Los 216 campos de texto son byte-idénticos. De
  `#9` cambia una sola clave, `depends_on`.
- **No cambió ningún `status`.** Los 4 `completed` de antes son los 4 de después, por id. `history=4`
  sin moverse. **No cerró ningún run** — cerrarlos es del operador desde la consola global, único
  punto de serialización.
- **No renumeró nada.** Los 72 `queue_order` son los mismos, comparados uno a uno contra el respaldo.
  **0 filas de remap** en el plan que escribió.
- **No añadió ninguna otra arista, ni retiró ninguna.** Exactamente +2, las dos de `#9`. Las cinco
  dependencias implícitas del Bloque G quedan **nombradas y no escritas**.
- **No movió runs entre fases, no creó ni borró runs, fases u objetivos.** No aplicó `barrier`. No
  declaró carriles. **No decidió la arista externa de `#4`**: se le dio al motor como dato para poder
  editar, y sigue saliendo como el mismo aviso no bloqueante de siempre, palabra por palabra.
- **No re-emitió `.project/`** (§F.1). Que se moviera a las 15:20 es de otro actor; queda desfasado
  por una edición hasta que el operador re-emita.
- **No escribió en `DECISIONES.md`**, ni en `CONTRATO.md`, ni en el roadmap de `aiw-console`, ni en el
  de `aiw`, ni en ningún test, handoff o record existente. md5 idénticos, declarados en §E.1.
- **No usó git en ninguna forma** — ni un comando, ni lectura. No levantó servidores. No corrió
  ninguna suite. El único ejecutable que corrió es el validador de estado de Cantu, de solo lectura,
  tres veces.
- **No declara production readiness** ni certifica ningún componente ni ningún contrato.

## Lo que este record NO hace

- **No afirma que la secuencia `#7` → `#8` → `#9` sea la única correcta.** Afirma que es la que el
  texto de `#9` describe y que ahora está en el dato. Que `#7` y `#8` deban además ordenarse entre sí
  —hoy son independientes: `#7` no depende de `#8` ni al revés— es una pregunta que este encargo
  **no** contestó y **no** tocó.
- **No mide el contenido de los tres contratos.** No existen todavía: los tres runs están `planned`.
  Este record mide el grafo, no el trabajo.
- **No propone retirar las nueve aristas directas que quedaron redundantes** (§G.3). Las nombra.
- **No re-mide nada de los records anteriores.** Las cifras de apertura que coinciden con el cierre del
  encargo anterior se citan con su fuente y se re-comprobaron en disco; no se recalculó nada más de
  aquel encargo.
