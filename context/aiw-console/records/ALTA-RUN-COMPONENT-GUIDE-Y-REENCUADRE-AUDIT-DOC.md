# ALTA DEL RUN DEL COMPONENT GUIDE Y RE-ENCUADRE DEL AUDIT DE DOCUMENTACIÓN

> Encargo de taller de **edición de roadmap** sobre `cantu-studio`. Dos ediciones, **una sola
> escritura atómica** sobre `.aiw/roadmap/roadmap.json`:
>
> **(A)** Re-encuadre de `RUN-CANTU-WEB-DOCUMENTATION-EVIDENCE-001` (`queue_order` 47): sus tres
> campos de texto reescritos, y sus **17 aristas `depends_on` retiradas**.
> **(B)** Alta de `RUN-CANTU-COMPONENT-GUIDE-PACKET-WIRING-001` en `queue_order` **72**, carril
> `DEVELOPMENT` por omisión de la clave, dependiente del contrato de fuente única.
>
> Fecha: 2026-07-28. **Git no se usó en ninguna forma.** No se levantó ningún servidor. No se
> corrió ninguna suite —ni de Cantu ni de `aiw-console`—. No se re-emitió `.project/`. **No se
> tocó ningún `status`.** No se renumeró ningún `queue_order` de los 71 existentes. No se tocó el
> Component Guide, su script guardián, ni ningún packet.
>
> **Dos cifras del ticket no sobrevivieron a la medición y se reportan corregidas:** las aristas
> (Bloque C.1) y el encuadre de la certificación en la gobernanza de Cantu (Bloque E.3).

## Archivos escritos por este encargo, y ninguno más

| Repo | Archivo | Qué |
|---|---|---|
| `cantu-studio` | `.aiw/roadmap/roadmap.json` | los tres campos de texto y el `depends_on` de `#47`, más el run nuevo `#72` — **la única escritura en Cantu** |
| `aiw-console` | `context/aiw-console/records/ALTA-RUN-COMPONENT-GUIDE-Y-REENCUADRE-AUDIT-DOC.md` | este record |

**Barrido de `mtime`** sobre el árbol de `cantu-studio` posterior al inicio del encargo
(2026-07-28 13:45:00), excluidos `.git/` y `node_modules/`:

```
./.aiw/roadmap/roadmap.json
```

**Exactamente un archivo.** Ningún temporal quedó en `.aiw/roadmap/` — el motor escribe
`.roadmap.json.tmp-<pid>` y lo renombra atómicamente. Los respaldos que el motor toma por su
cuenta viven en `os.tmpdir()`, fuera de los tres repos:
`C:\Users\chris\AppData\Local\Temp\roadmap-backup-10656-roadmap.json`.

`.project/` conserva `mtime` **2026-07-28 13:22**, anterior al encargo: **no se re-emitió**, y
sigue reflejando los 71 runs con el texto viejo hasta que el operador lo re-emita desde la consola.

---

## BLOQUE A — LÍNEAS BASE

### A.1 Respaldo antes de tocar nada, fuera del repo

| Qué | Valor |
|---|---|
| Ruta | `<scratchpad>/work/backup/roadmap.BEFORE.json` (fuera de los tres repos) |
| Bytes | **88 952** |
| md5 | `5e4fd54244c619908abef27e8007a37d` |
| `mtime` del canónico al leerlo | 2026-07-28 13:11:42 |

El md5 de apertura coincide con el md5 de cierre del encargo anterior
([`REENCUADRE-DOC-RUNS-COMPONENTES-WEB-CANTU.md`](REENCUADRE-DOC-RUNS-COMPONENTES-WEB-CANTU.md)
§A.2): **el canónico no se movió entre los dos encargos.**

### A.2 Líneas base nuevas

| Qué | Antes | Después |
|---|---|---|
| Bytes | 88 952 | **90 334** |
| md5 | `5e4fd54244c619908abef27e8007a37d` | **`b2822dab06fadabb3a8d4eb59dcad0ab`** |
| `mtime` | 2026-07-28 13:11:42 | 2026-07-28 13:52:11 |
| baseline del motor (sha256 de los bytes leídos) | `sha256:3232049d176ef5d5d…` | — |
| EOL | CRLF | CRLF |

**+1 382 bytes.** El run nuevo aporta ~1 779 y el re-encuadre de `#47` **devuelve** ~397, porque
retirar 17 ids de `depends_on` libera más bytes de los que suma su texto nuevo.

---

## BLOQUE B — MÉTODO

### B.1 Qué motor, y por qué ese

Criterio 3. **Motor: el de `aiw-console`** — `tools/roadmap/roadmap-plan.mjs` sobre
`tools/roadmap/roadmap-core.mjs`—, el mismo módulo que ejecuta el endpoint de escritura de la
consola global. Mismas dos razones que la vez anterior, verificadas entonces: el core local de
Cantu no adopta carriles y no resuelve la arista externa, así que su pre-flight rechazaría el
archivo antes de planear nada.

**Ids externos, sin que ninguna identidad de proyecto entre en el motor.** El conjunto se compuso
como lo compone la consola (`project-console/serve.mjs:335`, `externalRunIdsFor`): recorriendo el
árbol de los **otros** proyectos registrados en `project-console/projects.json` y quedándose con
sus `run_id`. La entrada `aiw` (raíz del workspace) **no porta ningún `roadmap.json`** y por tanto
no aporta ids. De `aiw-console` se leyeron sus dos árboles: **45 ids** de `roadmap/roadmap.json` y
**16** de `.aiw/roadmap/roadmap.json`, unión de **61**. Lectura pura, **sin escritura** (md5 y
`mtime` idénticos antes y después, Bloque F).

**Aristas del canónico que apuntan fuera: 1**, y resuelve —
`RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` → `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`.
El motor recibe un `Set`; es dato, no proyecto.

### B.2 Por qué DOS pasadas de plan y UNA sola escritura

Criterio 3 pide las dos ediciones en una sola pasada. **El motor no permite meterlas en un solo
`planEdit`, y la regla es suya, no una elección de este encargo:** `roadmap-plan.mjs:159-182`
declara `insert` operación de identidad y **la excluye explícitamente de `batch`**, porque un
`batch` descarta sus sub-resultados y `checkIdentityPreserved` sanciona a lo sumo un id añadido por
tipo. Se respetó tal cual:

```
PASS A  insert  (sola, por regla del motor)      -> serializado A, NO escrito en el canónico
        [serializado A -> archivo de etapa en el scratchpad]
PASS B  batch [ move, set-text(#47), set-deps(#47) ]  -> serializado B
        applyPlan(canónico, serializado B)       -> UNA escritura atómica
```

`move`, `set-text` y `set-deps` **sí** son batcheables (`roadmap-plan.mjs:173`), así que el
re-encuadre completo de `#47` y la colocación de `#72` son **un solo plan y una sola vista previa**.
El canónico **nunca vio un estado intermedio**: la única escritura sobre él es la del serializado
final, con respaldo → temp → `fsync` → rename atómico y rollback.

**Por qué hace falta el `move`.** `insertRun` (`roadmap-core.mjs:602-674`) ancla la fase al punto de
inserción: `--end-of-phase X` mete el run en X, y `--after R` lo mete en la fase de R. Para que el
run nazca en `queue_order` **72 sin remapear a nadie**, tiene que insertarse al final global — y el
final global pertenece a la fase que hoy posee `q71`, que es `O2.P5 "Naming Rename Execution"`,
semánticamente ajena. Así que se inserta ahí (0 renumerados) y el `move` lo reubica en su fase
**conservando `toOrder: 72`**. Ninguna de las dos pasadas renumeró nada:

| | filas de remap | contenido |
|---|---|---|
| PASS A | 1 | solo el run añadido: `before=null → after=72` |
| PASS B | **0** | ninguna |

### B.3 Ningún id se tecleó de memoria

Criterio 2. Los tres ids que el ticket nombra se **buscaron en disco antes de usarse**, y una
ausencia habría abortado:

| Id del ticket | En disco | Cómo se comprobó |
|---|---|---|
| `RUN-CANTU-WEB-DOCUMENTATION-EVIDENCE-001` | **sí**, `q47` | se localizó el run por `queue_order 47` y se exigió que su `run_id` fuera ese |
| `RUN-JAME-COMPONENT-DOC-SINGLE-SOURCE-CONTRACT-001` | **sí**, `q3` | búsqueda por id exacto; además `queue_order 3 < 72` |
| `RUN-CANTU-COMPONENT-GUIDE-PACKET-WIRING-001` (nuevo) | **libre** | se exigió que no existiera, y que casara `RUN-[A-Z0-9-]+-\d{3}` |

El **título verbatim** de `#47` se comprobó carácter a carácter contra el que el ticket cita:
`"Audit the Web component documentation as a whole"` — **idéntico**.

Los **17** cuyas aristas se retiran no se tecleron: se derivaron por su texto migrado, con una
expresión anclada,

```
/^The (.+) packet already exists at docs\/components\/web\/(.+\.md) and is registered, so what remains is not writing it\./
```

**17 aciertos**, todos con `lane: "DOCUMENTATION"`, y el conjunto derivado se cruzó contra el
`depends_on` de `#47` leído del archivo: **idénticos** — `onlyDerived=[]`, `onlyDeps=[]`. Si no
hubieran coincidido, el driver aborta antes de planear.

La fase ancla tampoco se tecleó: se calculó como la fase del run con el `queue_order` máximo
(`71`) → `O2.P5`.

### B.4 Roundtrip byte-exacto, comprobado antes de tocar

Criterio 3. Antes de planear, `serialize(parseRoadmap(raw), detectEol(raw)) === raw` sobre el
archivo objetivo. **Byte-exacto**, EOL **CRLF**, 88 952 bytes. Comprobado **dos veces**: en el
ensayo y otra vez contra el canónico en la pasada real.

### B.5 Ensayo completo sobre copia, y `cmp` contra ella

Criterio 3. La secuencia entera —guardas, derivación, cruce, los dos planes, los invariantes **y la
escritura**— se corrió primero contra una copia (`<scratchpad>/work/out/rehearsal.json`). Solo con
todo en verde sobre la copia se corrió contra el canónico.

```
cmp <canónico> <copia ensayada>   ->  SIN DIFERENCIAS
```

md5 de los dos: `b2822dab06fadabb3a8d4eb59dcad0ab`. **Lo que el operador vio ensayado es
exactamente lo que quedó escrito.**

### B.6 Autoridad de escritura inyectada

A `applyPlan` se le pasó un validador que, sobre el archivo ya renombrado, (a) lo re-lee y
re-verifica los invariantes con la arista externa resuelta, (b) comprueba que conserva la forma
`objectives -> phases -> runs`, y (c) lanza el validador del propio proyecto exigiendo `EXIT 0`.
Cualquiera de los tres en rojo restaura el respaldo. Salida registrada:
`re-read OK + project validator EXIT 0`.

---

## BLOQUE C — INVARIANTES, CON SUS NÚMEROS

Criterio 4. Medidos contra el **respaldo previo**, campo a campo, antes de escribir.

| Invariante | Antes | Después | ¿Esperado? |
|---|---|---|---|
| Objetivos | **7** | **7** | sí |
| Fases | **28** | **28** | sí |
| Runs | **71** | **72** | sí |
| `queue_order` denso, único, contiguo | 1..71 | **1..72** | sí |
| Los 71 existentes, ¿renumerados? | — | **ninguno** (comparados uno a uno) | sí |
| Filas de remap del plan | — | **0** en PASS B; 1 en PASS A, y es el run nuevo | sí |
| Aristas `depends_on` | **150** | **134** | **no — ver C.1** |
| `status` | `completed 4 · planned 67` | `completed 4 · planned 68` | sí |
| Los 4 `completed`, por id | q1, q2, q3, q48 | los mismos 4 | sí |
| Carril `DOCUMENTATION` | **23** | **23** | sí |
| Carril `DEVELOPMENT` (clave ausente) | **48** | **49** | sí |
| Runs no tocados byte-idénticos | — | **70 de 70** | sí |
| Aristas colgantes en todo el grafo | 0 | **0** | sí |
| Dependencias que no preceden a su dependiente | 0 | **0** | sí |
| Caracteres no-ASCII en todo el archivo | **10** | **10** | sí |

### C.1 Las aristas son **134**, no 151

El ticket pedía verificar el número real y no darlo por bueno. **No sale 151.** La aritmética
correcta es la que el propio ticket enuncia:

```
150  (antes)
-17  (las 17 de #47, retiradas)
 +1  (la de #72 -> el contrato)
----
134  (medido en el archivo escrito)
```

**Medido: 134.** El 151 del ticket suma el `+1` sin restar el `−17`; es un error de aritmética del
encargo, no del archivo. Los 17 ids retirados, tal como estaban en disco, son
`RUN-CANTU-WEB-<X>-DOC-001` para `COLUMNS · HEADER · LIST · ICONLIST · CARD · VIDEO · NARRATIVE ·
CALLOUT · DETAILS · ARITHMETIC · RULE · SPLIT · TABLE · CONCEPTGRID · HIERARCHY · TIMELINE ·
VISUAL`.

### C.2 Los 70 no tocados

Comparados **campo a campo** (`JSON.stringify` del run completo) contra el respaldo previo:
**70/70 byte-idénticos**, ninguna diferencia. El único run preexistente que cambia es `#47`, y de
él cambian exactamente cuatro claves: `title`, `summary`, `full_description` y `depends_on`. Su
`run_id`, su `queue_order` (47), su `status` (`planned`), su `lane` (`DOCUMENTATION`) y su fase
(`O1.P4`) quedan intactos, comprobados uno a uno.

### C.3 Bytes no-ASCII

Criterio 7. Barrido del archivo entero, antes y después: **10 → 10**, todos la raya `—` (U+2014),
preexistentes en el `full_description` de `#7`, `#8`, `#57` y `#66`. **Este encargo no añadió ni
quitó ninguno y no tocó esos cuatro runs.** El texto nuevo de `#47` y `#72` es **ASCII puro**: 0
caracteres no-ASCII en los seis campos, comprobado como guarda **antes** de entregar nada al motor.

---

## BLOQUE D — EL VALIDADOR, ANTES Y DESPUÉS

Criterio 6. `node tools/project-console/validate-project-console-state.mjs` desde la raíz de
`cantu-studio`.

| | Antes | Después |
|---|---|---|
| Veredicto | `Project Console state validation passed.` | **igual** |
| Salida | `7 objectives / 28 phases / **71** runs` | `7 objectives / 28 phases / **72** runs` |
| Grupos de cola | `needs_human_decision=0 now=0 ready_next=10 later=57 history=4` | `… ready_next=**12** later=**56** history=4` |
| Docs indexados | 142 | 142 |
| Docs curados primary-visible | 54 de 142 | 54 de 142 |
| Component statuses | 16 | 16 |
| Episodios de procedencia Git | 9 | 9 |
| Snapshot de historia Git | 918 commits / 2 ramas | igual |
| **EXIT** | **0** | **0** |

**Avisos no bloqueantes: uno, el de siempre**, palabra por palabra igual antes y después — la
arista externa a `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`. **Ningún aviso nuevo.**

El movimiento `ready_next 10 → 12` **no es un aviso**: es la cola recalculada, y cuadra. `#47`
pasa de `later` a `ready_next` porque perdió sus 17 dependencias, y `#72` nace `ready_next` porque
su única dependencia (`q3`) está `completed`. `later` baja de 57 a 56 por la salida de `#47`.
`history=4` sin cambio: **no se cerró nada**.

---

## BLOQUE E — EL TEXTO, ANTES Y DESPUÉS

### E.1 `#47` — `RUN-CANTU-WEB-DOCUMENTATION-EVIDENCE-001` (`queue_order` 47)

Criterio 1. Los tres campos, verbatim.

**`title`**
- **ANTES:** `Audit the Web component documentation as a whole`
- **DESPUÉS:** `Audit the seventeen Web component packets against the contract`

**`summary`**
- **ANTES:** `General audit that the canonical documentation of the seventeen Web components is consistent, complete, and ready, after all component documentation runs close.`
- **DESPUÉS:** `Audit the seventeen existing Web component packets against the component-doc single-source contract and against the doc runs that own them, recording one conformance verdict per component.`

**`full_description`**
- **ANTES:** `After the seventeen Web component documentation runs close, audit the Web component documentation as a whole rather than any single component. Verify that each component's canonical packet feeding the Component Guide exists and follows the component-doc single-source contract. This Run verifies and documents the whole; it does not re-document individual components, and it makes no production-readiness claim.`
- **DESPUÉS:** `The seventeen Web component packets already exist under docs/components/web/ and are registered, so this Run no longer waits on the doc runs that own them. Audit the set as a whole rather than any single component: check each packet against the component-doc single-source contract at docs/docs_management/COMPONENT-DOC-SINGLE-SOURCE-CONTRACT.md, whose Section 3 fixes the required sections and the field discipline, and against the current text of its own doc run. Record one verdict per component: conforming, or exactly what it still lacks. That verdict set is what the operator uses to decide which doc runs close without further work and which keep a task. This Run audits and records; it does not re-document individual components, does not repair any packet, does not close any run, and it makes no production-readiness claim.`

**`depends_on`**
- **ANTES:** 17 ids (los 17 doc-runs)
- **DESPUÉS:** `[]` — clave presente, array vacío, que es como el canónico expresa «sin
  dependencias» en los otros 8 runs que no tienen ninguna (`q1, q2, q5, q7, q11, q48, q50, q67`).
  Verificado en disco antes de elegir la forma.

**Los tres cambios que pedía el encargo, y dónde quedan:**

1. **La cláusula falsa sale.** `feeding the Component Guide` desaparece; comprobado como guarda
   antes de entregar el texto al motor y verificado sobre el resultado. De hecho **`Component
   Guide` ya no aparece en ninguno de los tres campos de `#47`**: 0 ocurrencias.
2. **Las 17 aristas salen.** Con ellas se va el defecto que el ticket señala: el run ya no exige
   que se cierren 17 runs para poder ejecutarse.
3. **El texto describe lo que queda.** Y el texto **explica su propia arista retirada** —
   «already exist … so this Run no longer waits on the doc runs that own them»—, de modo que
   quien lea el run entienda por qué no depende de ellos. El veredicto es **por componente**
   («Record one verdict per component: conforming, or exactly what it still lacks»), y el texto
   nombra para qué sirve: decidir cuáles de los 17 cierran sin trabajo y cuáles conservan tarea.
   Esa decisión se declara **del operador**, y el run declara que no cierra nada.

**Sobre la Sección citada.** Los 17 doc-runs citan la **Sección 6** del contrato (el deber de
actualización, que es lo que ellos deben). `#47` cita la **Sección 3**, que es donde el contrato
fija «Required sections, in order» y la «Field discipline» — lo que se audita cuando se juzga la
conformidad de un packet. Verificado leyendo el contrato; no se citó de memoria.

**El verbo se conserva.** `Audit` sigue siendo el verbo de los dos runs *de conjunto* (`#46` y
`#47`), tal como lo dejó el encargo anterior al reservarlo. 21 títulos del canónico empiezan por
`Audit`; no se inventó verbo nuevo.

### E.2 `#72` — `RUN-CANTU-COMPONENT-GUIDE-PACKET-WIRING-001` (`queue_order` 72)

| Campo | Valor |
|---|---|
| `run_id` | `RUN-CANTU-COMPONENT-GUIDE-PACKET-WIRING-001` |
| `queue_order` | **72** |
| `status` | `planned` |
| `lane` | **clave ausente** — el carril `DEVELOPMENT` se resuelve al leer |
| `depends_on` | `["RUN-JAME-COMPONENT-DOC-SINGLE-SOURCE-CONTRACT-001"]` |
| Objetivo / fase | `O2` / `O2.P3` — ver E.4 |
| Claves emitidas | `run_id, queue_order, title, summary, full_description, status, depends_on` |

El prefijo `RUN-CANTU-` es el de los runs nuevos (27 de los 71 lo llevan; los 44 restantes son
`RUN-JAME-`, anteriores al rename).

**`title`**
`Implement the Component Guide as a canonical packet consumer`

**`summary`**
`Retire the Component Guide's inline per-component content, its inline status labels, and the script that guards them, and render the canonical packets read-only instead.`

**`full_description`**
`The Editor Component Guide at tools/author-lite/editor-ui/src/features/editor/components/preview/ComponentGuide.jsx consumes no packet today: it carries inline hardcoded guide content for three of the seventeen Web components, asserts inline status labels of its own, and is held in place by a text-integrity script at tools/author-lite/scripts/checkComponentGuideTextIntegrity.cjs that guards that inline text as if it were the source. Make the Guide render the canonical packets under docs/components/web/ read-only, which is what the component-doc single-source contract asks of both of its consumers in Section 5; retire the inline per-component content, which that Section names as drift for a bounded run to remove; and dismantle the guard script, deciding in the same run what remains of its separate check over blockCatalog.js. Remove the inline certification label with it: no author-facing component is certified today, and component status has one source that every other surface points at and never restates. This Run changes the Guide runtime only; it authors and edits no packet, changes no component status, and makes no production-readiness claim.`

**Los tres elementos que el encargo exige nombrar, y su evidencia en disco** (verificada por
lectura, sin tocar nada):

| Elemento | Cómo lo nombra `#72` | Evidencia |
|---|---|---|
| Retiro del contenido hardcodeado | «retire the inline per-component content» | `ComponentGuide.jsx` (103 985 B) declara `listGuide:42`, `headerGuide:169`, `columnsGuide:291`, y `:2592` restringe la guía rica a `['columns','header','list']` — **3 de 17**. `fetch(` e imports de `docs/`: **0 ocurrencias**, así que «consumes no packet today» es literal. |
| Desmontaje del script guardián | «dismantle the guard script, deciding in the same run what remains of its separate check over blockCatalog.js» | `checkComponentGuideTextIntegrity.cjs` (1 360 B) vigila **dos** archivos: `ComponentGuide.jsx` y `constants/blockCatalog.js`, contra marcadores mojibake y etiquetas author-facing retiradas. |
| El claim de certificación inline | «Remove the inline certification label with it» | `ComponentGuide.jsx:45` — `statusLabel: 'Certificado'`. Hay dos `statusLabel` más (`:172`, `:294`) con `COMPONENT_CERTIFIED / DOCS_APPROVED / NOT_WEB_CERTIFIED`; por eso el `summary` habla de «inline status labels», en plural. |

**Por qué el literal `'Certificado'` no entra en el texto del run:** es castellano, y el criterio 7
exige inglés ASCII puro en los campos de texto. Se nombra el concepto («the inline certification
label»); el literal queda registrado aquí, que es donde puede ir en castellano.

**La forma del `full_description`** sigue la de `q66`, el otro run de consumidor: nombra el archivo
real, dice qué hace hoy, dice qué debe hacer, y cierra con no-claims explícitos.

### E.3 El encuadre de la certificación: el ticket dice «concepto retirado»; la gobernanza de Cantu **no** dice eso

El encargo pedía que el texto nombrara el claim de certificación inline «que es concepto retirado
por la gobernanza de Cantu». **Se comprobó en disco antes de escribirlo, y no se sostiene.**
`docs/governance/GOVERNANCE-AUTHORITY-AND-NO-CLAIMS.md` §2 «The no-claims posture» dice lo
contrario de «retirado»:

> «Cantu Studio treats certification as a claim that must be earned, never inferred.»

y §3 se titula «Certification gates» y fija las puertas que un componente debe pasar para llegar a
`CERTIFIED`. La certificación **no está retirada: está condicionada**. Escribir «retired concept»
en el canónico habría metido una cláusula falsa nueva — exactamente el defecto que la parte (A) de
este encargo existe para quitar.

Lo que sí está verificado, y es **más fuerte** para justificar el retiro del label, son dos hechos
de la misma §2, que son los que el texto de `#72` usa:

- «No global certification exists today: … **no author-facing component is certified**; each
  certifies only through its own gate.» → el label inline afirma algo que **ningún componente ha
  ganado**.
- «**Status has one source.** Component certification and QA status live only in
  [la matriz]; every other doc points at it and restates nothing.» → el Guide **no es** esa fuente,
  y restatearla es justo lo que la gobernanza prohíbe.

Queda como decisión de cabina si la gobernanza debe además retirar el concepto; **este encargo no
lo decide y no lo escribió.**

> Nota de precisión: la gobernanza apunta la matriz a `docs/author-lite/components/…` y el contrato
> de fuente única la apunta a `docs/archive/author-lite/components/…`. Es el puntero staleado que
> los 17 doc-runs ya tienen encargado reparar. Por eso `#72` **no nombra ninguna ruta de la
> matriz**: habría tenido que elegir entre dos, y esa elección no es suya.

### E.4 Dónde se colocó `#72`, y por qué — la ubicación **era ambigua** y se dice

El encargo pidió derivar objetivo y fase del canónico, decir si la ubicación era ambigua y elegir
la menos violenta. **Lo era.** Estos fueron los candidatos, todos leídos del archivo:

| Candidato | A favor | En contra |
|---|---|---|
| **`O2` / `O2.P3` «Docs Console Projection»** — **elegido** | Aloja `q66 RUN-JAME-PROJECT-CONSOLE-DOCS-V3-001`, que es **el otro consumidor**: mismo tipo de trabajo (hacer que una superficie renderice el packet canónico en solo lectura, sin estado propio), mismo carril `DEVELOPMENT`, misma cadena. El contrato §5 nombra **exactamente dos** consumidores y cierra diciendo que «The Component Guide runtime change and the Docs view formalization are **future runs**»: `q66` es uno de los dos, y `#72` es el otro. Además `O2` es el objetivo que **posee** el modelo documental y el contrato (`q2`, `q3`), y `#72` depende de `q3`, así que dependiente y dependencia quedan en el mismo objetivo — igual que `q66`, que depende de `q2`. | El título de la fase dice «Docs **Console** Projection», y el Component Guide vive en el Editor, no en la consola. **Ese es el costo, y es real.** |
| `O1` / `O1.P4` «Web Component Documentation and Readiness Evidence» | Aloja `q46` y `q47`, y `#72` consume los mismos 17 packets que `#47` audita. El record anterior ya apuntó que había argumento para agruparlos. | Es una fase de **auditoría y evidencia** de conjunto; `#72` no es auditoría ni evidencia, es un cambio de runtime. Y `O1` es el objetivo **por componente**; el Guide es una superficie única, no un componente. |
| `O2` / `O2.P2` «Canonical Documentation Model and Cadence» | Es donde vive el contrato (`q3`). | Sus dos runs son de **definición** y están `completed`; `q3` dice literalmente que «it does not implement … the Component Guide runtime». Meter una implementación ahí contradice el texto de la propia fase. |
| `O3` / `O3.P2` «Sandbox Reproduction and Component Guide» | El nombre dice «Component Guide». | Es el Guide **de Slide** (`q53`), objetivo equivocado. |
| `O5` «Editor and Engine Shared Features» | El Guide es superficie del Editor. | Ninguna de sus 6 fases trata de documentación ni del Guide; son áreas de feature (color, math, MathLive, Formula Inserter, contratos compartidos). |

**Por qué `O2.P3` es la menos violenta:** entre estirar **una palabra** del título de una fase
(«Console» → las superficies de proyección en general) y meter **un cambio de código** en una fase
cuyo propósito entero es auditar y reunir evidencia, lo primero deforma menos. El tipo de trabajo
encaja exacto; lo único que se queda corto es el nombre.

**No se creó fase nueva**, por las dos razones: una existente sirve, y el invariante fija las fases
en **28**. Tampoco se renombró `O2.P3` — renombrar fases no está en el alcance. Queda anotado en el
Bloque G como decisión de cabina.

---

## BLOQUE F — SUPERFICIES DISJUNTAS DEL HILO PARALELO

Criterio 12. Medidas antes de empezar y otra vez al terminar.

| Superficie | md5 antes | md5 después | `mtime` | ¿Igual? |
|---|---|---|---|---|
| `aiw-console/roadmap/roadmap.json` | `f299d968fdf781bf31863d696bd9610e` | **igual** | 2026-07-28 03:33:31, sin cambio | **Sí** |
| `context/DECISIONES.md` | `a36e622c73ea6c7c614c6b020b4f317c` | **igual** | 2026-07-28 13:12:24, sin cambio | **Sí** |
| `context/aiw-console/CONTRATO.md` | `f77ccec64d99f2048d4bde41638cb228` | **igual** | 2026-07-27 15:48:27, sin cambio | **Sí** |

**Huella conjunta de `tests/` + `context/aiw-console/handoffs/` + `context/aiw-console/records/`**
(md5 de la lista ordenada de md5 por archivo, medida antes de escribir este record):
`8fe43cc0ed6a7d4ff13fa716361c629a` antes y `8fe43cc0ed6a7d4ff13fa716361c629a` después —
**idéntica**. Ni un test, ni un handoff, ni un record existente cambió.

Los dos árboles de roadmap de `aiw-console` **se leyeron** para componer los ids externos (B.1); su
md5 idéntico prueba que la lectura no dejó rastro.

`DECISIONES.md` quedó exactamente donde lo dejó el hilo paralelo en la sesión anterior
(`a36e622c…`, 13:12:24, el estado que el record previo registró en su §F.1). **Este encargo no lo
escribió y no observó escritura ajena durante la ventana.**

**Conteo de records:** 37 al abrir, **38** al cerrar — el que entra es este. Estrena nombre: no hay
ningún `ALTA-*` previo, ni ningún record con `GUIDE`, `CABLEADO`, `CONSUMIDOR` o `WIRING` en el
nombre.

---

## BLOQUE G — HALLAZGOS NOMBRADOS, NINGUNO TOCADO

### 1. `q46` porta la misma cláusula falsa que se acaba de quitar de `q47`

`RUN-JAME-WEB-READINESS-EVIDENCE-001` (`q46`), el gemelo de implementación de `#47`, sigue diciendo
en su `full_description`:

> «that each component's canonical packet **feeding the Component Guide** exists and follows the
> component-doc single-source contract»

Es literalmente la cláusula que se retiró de los 17 y ahora de `#47`. **No se tocó**: reescribir
otros runs está fuera de alcance. `q46` conserva además sus **17 aristas** a los runs de
implementación —que, a diferencia de los packets, **no** están hechos—, así que ahí la dependencia
**no** es fósil y no procede quitarla. Queda como el siguiente candidato natural de re-encuadre.

### 2. `q46` lleva un espacio final en el título

`"Audit the Web components and their documentation as a whole "` — con espacio de cierre. Es el
único título del canónico así. Cosmético, no estorba a nadie, y fuera de alcance aquí.

### 3. El título de `O2.P3` se queda corto para lo que ahora aloja

Con `#72` dentro, la fase «Docs Console Projection» contiene los **dos** runs de consumidor, y uno
es del Editor. Un título como «Canonical Doc Consumers» describiría mejor sus dos runs. **No se
renombró**: renombrar fases no está en el alcance y es decisión de cabina.

### 4. Diez rayas `—` preexistentes en cuatro runs ajenos

`#7`, `#8`, `#57` y `#66` siguen con sus 10 U+2014. Sin cambio, fuera de alcance, ya nombradas por
el record anterior.

### 5. El ticket declaró 151 aristas; son 134

Ver C.1. Se reporta como corrección de la cifra del encargo, no como hallazgo del archivo.

---

## BLOQUE H — NO-CLAIMS DE ESTE ENCARGO

- **No ejecuta la auditoría que `#47` describe.** No se miró si un solo packet cumple el contrato.
  Eso es el trabajo del run, y sigue pendiente. Que los 17 packets existan viene de la medición
  previa y del cruce de ids, **no** es conformidad, ni QA, ni aceptación.
- **No tocó el Component Guide, ni su script guardián, ni el `'Certificado'` inline.** `#72` los
  **nombra**; no los arregla. Los tres siguen exactamente como estaban — el barrido de `mtime` lo
  prueba: un solo archivo escrito en todo Cantu.
- **No cambió ningún `status`.** Los 4 `completed` de antes son los 4 de después; `#72` nace
  `planned`; `history=4` sin moverse. **No cerró ningún run** — cerrarlos es del operador desde la
  consola global, único punto de serialización.
- **No renumeró nada.** Los 71 `queue_order` existentes son los mismos, comparados uno a uno contra
  el respaldo. Ninguna fila de remap en la pasada que escribió.
- **No movió runs entre fases** salvo el que creó, y solo dentro de la misma operación que lo
  colocó. No aplicó `barrier`. No declaró carriles.
- **No reescribió ningún otro run**: ni los 17 ya re-encuadrados, ni `q46`, ni el Bloque E de la
  medición (`#4`, `#5`, `#6`, `#11`, `#51`, `#66`, `#69`), ni `#48`. Verificado por comparación
  campo a campo: **70/70 idénticos**.
- **No resolvió la arista externa** a `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`: se le dio al motor como
  dato para poder editar, y sigue saliendo como el mismo aviso no bloqueante de siempre.
- **No re-emitió `.project/`.** Sigue reflejando 71 runs y el texto anterior hasta que el operador
  lo re-emita.
- **No usó git en ninguna forma.** No levantó servidores. No corrió ninguna suite. El único
  ejecutable que corrió es el validador de estado de Cantu, de solo lectura.
- **No afirma que la ubicación de `#72` sea la única correcta.** Es la menos violenta entre cinco
  candidatos leídos del archivo, con su costo declarado en E.4. Moverla es una edición de una sola
  operación si la cabina prefiere otra.
- **No decidió nada sobre la gobernanza de la certificación** (E.3). Reportó que la premisa del
  ticket no cuadra con el disco y escribió el texto con los hechos verificados.
- **No declara production readiness** ni certifica ningún componente.

**Límite declarado del re-encuadre:** el texto nuevo de `#47` afirma que los packets «already exist
under docs/components/web/ and are registered». Eso está verificado por la medición previa
(existencia, tamaño, ocho secciones, registro). Lo que el texto **no** afirma, y este encargo
tampoco, es que sean correctos: decirlo, componente a componente, es exactamente el trabajo que el
run ahora describe.
