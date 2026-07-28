# PARTICIÓN DE LOS RUNS QUE EMPAQUETABAN IMPLEMENTACIÓN Y DOCUMENTACIÓN

> Encargo de taller. **La segunda mitad de la migración a carriles.** La primera (record
> `MIGRACION-CANTU-A-CARRILES.md`) repartió los 53 runs existentes entre `DEVELOPMENT` y
> `DOCUMENTATION` y descubrió el problema que este encargo arregla: el carril de documentación
> se quedó con **5 runs de 53**, no porque Cantu documente poco, sino porque el roadmap se
> escribió ANTES de que existieran los carriles y, para no inflar el número de runs, empaquetó
> «audit, implement AND document» en uno solo. Con carriles eso impide exactamente el
> paralelismo que los motivó: documentar el componente 1 mientras se implementa el 2.
>
> Fecha: 2026-07-27. **Ningún comando de git que escriba.** Git se usó SOLO EN LECTURA:
> `status --porcelain` (frontera, antes y después, en los tres repos) y `diff --numstat`
> (aritmética independiente de qué cambió). No se tocó `CONTRATO.md`, ni `DECISIONES.md`, ni
> ningún record existente, ni el roadmap de aiw-console, ni el tooling, ni los docs, ni el
> código de cantu-studio, ni `.project/` de ningún proyecto, ni el status de ningún run.
>
> **NO SE RESERVA NÚMERO DE DECISIÓN.** Nada aquí cambia el contrato: se aplican D-047
> (identidad inmutable), D-051 (carriles y numeración local por carril) y la regla propia de
> Cantu sobre nacimiento de ids, a datos de un proyecto.
>
> **Archivos escritos, y ninguno más:**
>
> | Repo | Archivo | Qué |
> |---|---|---|
> | `cantu-studio` | `.aiw/roadmap/roadmap.json` | el canónico partido (por el motor, 22 operaciones) |
> | `aiw-console` | este record | |
>
> El canónico de `aiw-console` **no se tocó**: md5 `58a726908ece58b59922ee0232b1eb15` al empezar
> y al terminar. El repo `aiw` quedó limpio, `git status --porcelain` vacío antes y después.
> **`.project/` de cantu-studio intacto**: los seis artefactos siguen con fecha 17:43, anterior
> a esta sesión, y `git status --porcelain .project/` está vacío. Ver el Bloque G sobre una
> **sesión paralela** que escribió otros archivos de estos repos mientras esta corría.

---

## BLOQUE A — EL RESPALDO, ANTES DE TOCAR NADA

Copia fuera del repo, en el scratchpad de la sesión, verificada por md5 **contra el canónico**:

| | md5 | bytes |
|---|---|---|
| `.aiw/roadmap/roadmap.json` (canónico, antes) | `a1aeb75769dd11e6ae700b9cc89a07c2` | 69 278 |
| `backup/roadmap.canonical.BEFORE.json` | `a1aeb75769dd11e6ae700b9cc89a07c2` | 69 278 |
| `.aiw/roadmap/roadmap.json` (canónico, después) | `5e92eba3d64241305f12d78b8f4ffb32` | 81 146 |

Los dos repos estaban **limpios** al empezar (`git status --porcelain` vacío en `cantu-studio`,
en `aiw-console` y en `aiw`). El motor, además, hace su propio respaldo fuera del repo en cada
`applyWrite`; el de arriba es el respaldo del encargo, independiente de él.

---

## BLOQUE B — QUÉ SE PARTIÓ, VERIFICADO EN DISCO ANTES DE OPERAR

### B.1 Los diecisiete no se dieron por buenos: se midieron

El encargo nombraba 17 runs. En vez de teclearlos, se buscaron **por su texto**: los runs cuyo
`full_description` termina con la frase de documentación. Salieron **17**, y el conjunto coincide
**exactamente** con el `depends_on` que el propio `RUN-JAME-WEB-READINESS-EVIDENCE-001` declara
(17 aristas). El script aborta si esas dos listas no coinciden; no abortó.

**Una corrección al encargo, menor y sin consecuencia:** el encargo los sitúa en «fase O1.P3 y
aledañas». **`O1.P3` no existe.** Los diecisiete viven en tres fases — `O1.P1B` (1), `O1.P1C`
(11) y `O1.P2` (5) — y el #29 en `O1.P4`. Como cada run de documentación se ancla en su run de
implementación, cada uno aterrizó en la fase que le tocaba sin necesidad de decidir nada.

### B.2 El contrato de packet: se verificó cuál es

El encargo daba un candidato (`RUN-JAME-WEB-COMPONENT-CONTRACT-STANDARDIZATION-001`) y pedía
verificar. **No es ese.** La frase migrada dice «Once the **component-doc single-source
contract** is defined, document the X component in its **canonical packet**», y el run que define
ese packet es el **#3, `RUN-JAME-COMPONENT-DOC-SINGLE-SOURCE-CONTRACT-001`**, cuyo propio texto
dice: «each component's documentation lives in one canonical structured packet». El candidato del
encargo, el #9, es el contrato de *revalidación* — el de implementación — y él mismo declara que
*consume* al #3. Los 17 runs de documentación dependen del **#3**.

Que el #3 ya viviera en el carril `DOCUMENTATION` (lo puso la migración anterior) es la
confirmación cruzada: el formato del packet es trabajo de documentación, y el carril nuevo
depende de él sin cruzar a `DEVELOPMENT`.

---

## BLOQUE C — LA TABLA IMPL → DOC, LOS 18 PARES

Identidad (D-047 + regla de Cantu): **el run existente conserva su `run_id`** y se queda con la
implementación; **el nuevo nace `RUN-CANTU-`**. Ningún id se renombró — verificado contando: los
53 ids de antes están los 53 después, y los 18 añadidos empiezan todos por `RUN-CANTU-`.

| # antes | run de IMPLEMENTACIÓN (id conservado) | # ahora | # doc | run de DOCUMENTACIÓN (id nuevo) | fase |
|---|---|---|---|---|---|
| 12 | `RUN-JAME-WEB-COLUMNS-REVALIDATION-001` | 12 | 13 | `RUN-CANTU-WEB-COLUMNS-DOC-001` | O1.P1B |
| 13 | `RUN-JAME-WEB-HEADER-REVALIDATION-001` | 14 | 15 | `RUN-CANTU-WEB-HEADER-DOC-001` | O1.P1C |
| 14 | `RUN-JAME-WEB-LIST-REVALIDATION-001` | 16 | 17 | `RUN-CANTU-WEB-LIST-DOC-001` | O1.P1C |
| 15 | `RUN-JAME-WEB-ICONLIST-REVALIDATION-001` | 18 | 19 | `RUN-CANTU-WEB-ICONLIST-DOC-001` | O1.P1C |
| 16 | `RUN-JAME-WEB-CARD-REVALIDATION-001` | 20 | 21 | `RUN-CANTU-WEB-CARD-DOC-001` | O1.P1C |
| 17 | `RUN-JAME-WEB-VIDEO-REVALIDATION-001` | 22 | 23 | `RUN-CANTU-WEB-VIDEO-DOC-001` | O1.P1C |
| 18 | `RUN-JAME-WEB-NARRATIVE-REPAIR-001` | 24 | 25 | `RUN-CANTU-WEB-NARRATIVE-DOC-001` | O1.P1C |
| 19 | `RUN-JAME-WEB-CALLOUT-REPAIR-001` | 26 | 27 | `RUN-CANTU-WEB-CALLOUT-DOC-001` | O1.P1C |
| 20 | `RUN-JAME-WEB-DETAILS-REPAIR-001` | 28 | 29 | `RUN-CANTU-WEB-DETAILS-DOC-001` | O1.P1C |
| 21 | `RUN-JAME-WEB-ARITHMETIC-AUDIT-AND-REPAIR-001` | 30 | 31 | `RUN-CANTU-WEB-ARITHMETIC-DOC-001` | O1.P2 |
| 22 | `RUN-JAME-RULE-COMPONENT-REPAIR-AND-ACTIVATION-001` | 32 | 33 | `RUN-CANTU-WEB-RULE-DOC-001` | O1.P2 |
| 23 | `RUN-JAME-WEB-SPLIT-SCOPE-AND-REPAIR-001` | 34 | 35 | `RUN-CANTU-WEB-SPLIT-DOC-001` | O1.P1C |
| 24 | `RUN-JAME-WEB-TABLE-AUDIT-AND-REPAIR-001` | 36 | 37 | `RUN-CANTU-WEB-TABLE-DOC-001` | O1.P1C |
| 25 | `RUN-JAME-WEB-CONCEPTGRID-AUDIT-AND-REPAIR-001` | 38 | 39 | `RUN-CANTU-WEB-CONCEPTGRID-DOC-001` | O1.P2 |
| 26 | `RUN-JAME-WEB-HIERARCHY-AUDIT-AND-REPAIR-001` | 40 | 41 | `RUN-CANTU-WEB-HIERARCHY-DOC-001` | O1.P2 |
| 27 | `RUN-JAME-WEB-TIMELINE-AUDIT-AND-REPAIR-001` | 42 | 43 | `RUN-CANTU-WEB-TIMELINE-DOC-001` | O1.P2 |
| 28 | `RUN-JAME-WEB-VISUAL-AUDIT-AND-REPAIR-001` | 44 | 45 | `RUN-CANTU-WEB-VISUAL-DOC-001` | O1.P1C |
| **29** | **`RUN-JAME-WEB-READINESS-EVIDENCE-001`** | **46** | **47** | **`RUN-CANTU-WEB-DOCUMENTATION-EVIDENCE-001`** | **O1.P4** |

Cada run de documentación está **inmediatamente después** de su implementación (verificado:
`queue_order(doc) == queue_order(impl) + 1` en los 18 pares) y **en la misma fase** (verificado
en los 18). Ningún `phase_id` cambió; ningún run preexistente cambió de fase.

---

## BLOQUE D — EL REPARTO DEL TEXTO. **REPARTO, NO REDACCIÓN.**

### D.1 Los diecisiete: la frase migró verbatim, y nada más se escribió

La regla se aplicó **derivando el texto del archivo en disco**, nunca tecleándolo. La frase que
migra se extrae con la propia expresión que la encontró, y el `full_description` de
implementación es literalmente el prefijo que queda al quitarla:

```
impl.full_description = original.slice(0, hasta la frase)      // el resto, intacto
doc.full_description  = la frase, byte por byte
impl.title            = title.replace(", implement and document ", " and implement ")
                             .replace(", enable and document ",   " and enable ")
impl.summary          = summary.replace(", document it in its canonical packet", "")
```

El script **aborta** si alguna de las tres transformaciones no dispara, o si la frase sobrevive
en el lado de implementación. No abortó en ninguno de los 17.

| `run_id` | título antes | título ahora |
|---|---|---|
| `…WEB-COLUMNS-REVALIDATION-001` | Audit, implement and document the Columns component | Audit and implement the Columns component |
| `…WEB-HEADER-REVALIDATION-001` | Audit, implement and document the Header component | Audit and implement the Header component |
| `…WEB-LIST-REVALIDATION-001` | Audit, implement and document the List component | Audit and implement the List component |
| `…WEB-ICONLIST-REVALIDATION-001` | Audit, implement and document the IconList component | Audit and implement the IconList component |
| `…WEB-CARD-REVALIDATION-001` | Audit, implement and document the Card component | Audit and implement the Card component |
| `…WEB-VIDEO-REVALIDATION-001` | Audit, implement and document the Video component | Audit and implement the Video component |
| `…WEB-NARRATIVE-REPAIR-001` | Audit, implement and document the Narrative component | Audit and implement the Narrative component |
| `…WEB-CALLOUT-REPAIR-001` | Audit, implement and document the Callout component | Audit and implement the Callout component |
| `…WEB-DETAILS-REPAIR-001` | Audit, implement and document the Details component | Audit and implement the Details component |
| `…WEB-ARITHMETIC-AUDIT-AND-REPAIR-001` | Audit, implement and document the Arithmetic component | Audit and implement the Arithmetic component |
| `…RULE-COMPONENT-REPAIR-AND-ACTIVATION-001` | Audit, implement and document the Rule component | Audit and implement the Rule component |
| `…WEB-SPLIT-SCOPE-AND-REPAIR-001` | **Decide scope**, enable and document the Split component | **Decide scope** and enable the Split component |
| `…WEB-TABLE-AUDIT-AND-REPAIR-001` | Audit, implement and document the Table component | Audit and implement the Table component |
| `…WEB-CONCEPTGRID-AUDIT-AND-REPAIR-001` | Audit, implement and document the ConceptGrid component | Audit and implement the ConceptGrid component |
| `…WEB-HIERARCHY-AUDIT-AND-REPAIR-001` | Audit, implement and document the Hierarchy component | Audit and implement the Hierarchy component |
| `…WEB-TIMELINE-AUDIT-AND-REPAIR-001` | Audit, implement and document the Timeline component | Audit and implement the Timeline component |
| `…WEB-VISUAL-AUDIT-AND-REPAIR-001` | Audit, implement and document the Visual component | Audit and implement the Visual component |
| `…WEB-READINESS-EVIDENCE-001` | Audit the Web components **and their documentation** as a whole | Audit the Web components as a whole |

El par de Columns, entero, como ejemplo de los diecisiete:

```
#12  RUN-JAME-WEB-COLUMNS-REVALIDATION-001            lane DEVELOPMENT (por defecto)
     Audit and implement the Columns component
     …Verify the result by human visual QA rather than an automated test suite, since the
     repository has no test runner.                              <- la frase ya no está

#13  RUN-CANTU-WEB-COLUMNS-DOC-001                    lane DOCUMENTATION
     Document the Columns component
     Once the component-doc single-source contract is defined, document the Columns component
     in its canonical packet that feeds the Component Guide.      <- la frase, verbatim
     depends_on: RUN-JAME-WEB-COLUMNS-REVALIDATION-001 · RUN-JAME-COMPONENT-DOC-SINGLE-SOURCE-CONTRACT-001
```

El `full_description` del run de documentación es **exactamente la frase migrada, sola**. Es lo
que el encargo pide («esa frase, y solo esa, MIGRA»); es corto a propósito, porque un reparto no
inventa contenido. El `title` y el `summary` sí se escribieron, porque el encargo pide que cada
mitad diga lo que hace, y usan **el vocabulario de la propia frase**.

### D.2 El #29: dónde estaba la costura

El #29 no terminaba en una frase separable: su parte de documentación era la **cláusula central**
de su segunda oración. Se cortó por ahí, verbatim:

```
…passed human visual QA; that each component's canonical packet feeding the Component Guide
exists and follows the component-doc single-source contract; and that no component was left…
                        ^-------------- esta cláusula migró ---------------^
```

| | mitad de IMPLEMENTACIÓN (`RUN-JAME-WEB-READINESS-EVIDENCE-001`) | mitad de DOCUMENTACIÓN (`RUN-CANTU-WEB-DOCUMENTATION-EVIDENCE-001`) |
|---|---|---|
| título | Audit the Web components as a whole | Audit the Web component documentation as a whole |
| carril | `DEVELOPMENT` (por defecto, sin clave) | `DOCUMENTATION` |
| `queue_order` | 46 | 47 |
| depende de | los **17 de implementación** | los **17 de documentación** |
| oración 1 | «After the seventeen Web component **implementation** runs close…» | «After the seventeen Web component **documentation** runs close…» |
| la cláusula | retirada | presente, verbatim |
| oración final | «This Run **verifies** the whole…» | «This Run verifies and documents the whole; it does not **re-document** individual components…» |
| evidencia | conserva «Consolidate the remaining blockers… readiness evidence package» | — |

**Aquí, y solo aquí, hubo tres palabras de redacción**: las oraciones de marco de la mitad de
documentación («After the seventeen … runs close, audit … as a whole rather than any single
component», «This Run … it does not re-document individual components, and it makes no
production-readiness claim») son las del original con el sustantivo cambiado, porque una mitad
tiene que leerse como un run entero. La cláusula que es el contenido migrado va **sin tocar**. Se
declara explícitamente por si el operador lo quiere de otra manera; es el único punto del encargo
donde el reparto no fue mecánico.

---

## BLOQUE E — LAS DEPENDENCIAS

### E.1 Los 17 nuevos: dos aristas cada uno, cero colgantes

Cada run de documentación depende de **su propio run de implementación** y del **#3, el contrato
de packet**. Nada más: 2 aristas × 17 = 34 aristas nuevas, todas verificadas presentes y en ese
orden. No se puede escribir el packet antes de que exista su formato, y no se puede documentar un
componente antes de haberlo tocado.

### E.2 El #29 partido: cada carril converge en su propio audit

Contando aristas sobre el archivo escrito:

| | aristas | a qué |
|---|---|---|
| `RUN-JAME-WEB-READINESS-EVIDENCE-001` | **17** | los 17 runs de IMPLEMENTACIÓN |
| `RUN-CANTU-WEB-DOCUMENTATION-EVIDENCE-001` | **17** | los 17 runs de DOCUMENTACIÓN |

Y **cero cruces**: se verificó explícitamente que la mitad de implementación no depende de ningún
run de documentación, y que la de documentación no depende de ningún run de implementación. Ese
es todo el punto — cada carril converge en su propio audit de conjunto, sin bloqueo cruzado.

### E.3 Aguas abajo: cuatro runs dependían del #29, uno cambió

| # | run | su propio texto | veredicto |
|---|---|---|---|
| 39→57 | `RUN-JAME-AUTHORING-WORKSPACE-UX-AUDIT-001` | «It depends on the assembled Web component **documentation and readiness evidence**» | **arista añadida** a la mitad de documentación. Ahora depende de las DOS. |
| 40→58 | `RUN-JAME-HTML-PAYLOAD-MEASUREMENT-001` | mide CSS/JS duplicado en la salida generada; no nombra documentación | **sin cambio.** Espera al código estabilizado, no a los packets. |
| 45→63 | `RUN-JAME-PRODUCTION-LESSON-VALIDATION-001` | «after Web, **documentation**, and Slide readiness evidence» | **sin cambio** — ver abajo. |
| 50→68 | `RUN-CANTU-INTERNAL-CODE-RENAME-001` | «executes after the Web and Slide component work has stabilized, **to avoid renaming directories while other runs still edit them**»; «This run renames internal code directories **only**» | **sin cambio.** Lo que le estorba es que se editen directorios de código; los packets no son eso, y el rename de docs es su hermano `RUN-CANTU-DOCS-DIRECTORY-RENAME-001`. |

**El #45 es la única decisión discutible y queda abierta al operador.** Su summary enumera tres
cosas y tiene tres aristas: Web → `…WEB-READINESS-EVIDENCE-001`, documentación →
`…DOCUMENTATION-CANONICAL-MODEL-001`, Slide → `…SLIDE-READINESS-EVIDENCE-001`. Es decir: su
«documentación» ya tiene su propia arista, y apunta al modelo canónico, no a la evidencia de
documentación de los componentes Web, que hasta hoy no existía como run. Se dejó como estaba
porque su texto no la nombra. Si el operador la quiere, es **una** operación `set-deps --add-dep`.

---

## BLOQUE F — CÓMO SE ESCRIBIÓ: EL MOTOR, 22 OPERACIONES, Y UN ENSAYO ANTES

### F.1 El ensayo sobre copia

La secuencia es **con estado**: la operación 18 depende de runs que crean las 1–17, así que un
dry-run suelto de la 18 contra el archivo intacto **ni siquiera se puede planificar** — el motor
la rechazaría por dependencia desconocida, y con razón. El dry-run por operación no es aquí la
vista previa; **la vista previa es el ensayo entero sobre una copia**.

Se corrieron las 22 operaciones completas contra una copia en el scratchpad, se verificó el
resultado con los 40+ chequeos del Bloque F.3, y **sólo entonces** se corrió la misma secuencia
contra el canónico. El canónico resultante es **byte a byte idéntico** a la copia ensayada
(`cmp` sin diferencias). El ensayo no fue una promesa: fue el archivo.

### F.2 Las 22 operaciones

Ninguna edición fue por escritura directa del JSON. El único escritor fue `core.applyWrite`,
alcanzado por `applyPlan` — la misma secuencia que corre la ruta de escritura de la consola
global, **menos la re-emisión de `.project/`**, que este encargo pone fuera de alcance:

```
planEdit (dry run) → planEdit + compare-and-swap sobre el baseline → applyPlan(writtenFileValidator)
```

| # | operación | ancla / alcance | remap | avisos | bytes |
|---|---|---|---|---|---|
| 1–17 | `insert` × 17 runs de documentación | `--after` su run de implementación | 42→26 | 0 | 69 278 → 82 016 |
| 18 | `insert RUN-CANTU-WEB-DOCUMENTATION-EVIDENCE-001` | `--after RUN-JAME-WEB-READINESS-EVIDENCE-001` | 25 | 0 | 83 795 |
| 19 | `batch` de 18 × `set-lane DOCUMENTATION` | los 18 nuevos | 0 | 0 | 84 515 |
| 20 | `batch` de 17 × `set-text` | las 17 mitades de implementación | 0 | 0 | 81 255 |
| 21 | `set-text RUN-JAME-WEB-READINESS-EVIDENCE-001` | la mitad de implementación del #29 | 0 | 0 | 81 085 |
| 22 | `set-deps --add-dep` | `RUN-JAME-AUTHORING-WORKSPACE-UX-AUDIT-001` | 0 | 0 | 81 146 |

**22 planificadas, 22 aplicadas, 0 fallos, 0 rollbacks, 0 avisos.** Las 18 primeras sí producen
remap (una inserción cascadea todo lo que va detrás, que es el comportamiento correcto); las
cuatro últimas dan `remap = 0`, dicho por el motor, no por una inspección posterior.

Tres detalles de mecánica que el encargo advertía y que aquí se respetaron:
- **Un solo ancla por `insert`**, y el ancla decide fase Y `queue_order`. Anclar en el propio run
  de implementación resuelve las dos cosas a la vez: no hizo falta ni un `move`.
- **`--to-phase` no se pasó a ningún `insert`** — pertenece a `move`. No hubo ningún error que
  pareciera «insert roto».
- **El dry-run es el defecto.** El script exige `--apply`; sin él no escribe. Y el estado se
  verificó EN DISCO después, nunca se dio por aterrizado.

`externalRunIds` se compuso como lo compone `serve.mjs` (`externalRunIdsFor`): 42 ids de los
otros dos proyectos registrados. El validador de post-escritura reinyectado es el mismo
`writtenFileValidator` — releer el archivo renombrado y verificar invariantes y forma de árbol.

### F.3 Los invariantes, y los números antes/después

| | antes | después |
|---|---|---|
| runs | 53 | **71** (53 + 18 — confirmado, es lo que el encargo esperaba) |
| objetivos / fases | 7 / 28 | **7 / 28** (ninguna creada, ninguna borrada) |
| `queue_order` | 1..53 denso, único | **1..71 denso, único, contiguo** |
| dependencias colgantes | 0 | **0** (la única arista externa, `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`, sigue siendo legal y es la misma de siempre) |
| dependencia que no precede a su dependiente | 0 | **0** |
| self-dependencies / ciclos | 0 | **0** |
| identidades renumeradas | — | **0**; los 53 ids siguen, los 18 nuevos son todos `RUN-CANTU-` |
| `lane` no declarado | 0 | **0** |
| `barrier` | ninguno | **ninguno** (no se aplicó ninguno, está fuera de alcance) |
| campo fuera de la lista blanca | 0 | **0** |
| **carriles** | **DEVELOPMENT 48 · DOCUMENTATION 5** | **DEVELOPMENT 48 · DOCUMENTATION 23** |
| bytes | 69 278 | 81 146 |
| bytes no-ASCII | 30 | **30 — sin cambio** |

El **detector de codificación** dice lo que tiene que decir: 30 bytes no-ASCII antes y 30 después.
Ninguna de las ediciones de texto tocó un em-dash, así que el delta esperado era **cero**, y es
cero. (Los 855 → 1105 pares CRLF son las líneas nuevas del JSON, no texto.)

`DEVELOPMENT` sigue en 48 porque **ningún run existente cambió de carril**: los 18 nuevos son
todos de documentación. 5 → 23 es 5 + 18.

### F.4 Contenido intacto del resto

De los 53 runs de antes, **19 se tocaron** y **34 no**:

| tipo de cambio | runs | qué cambió |
|---|---|---|
| reparto del texto | 17 | `title`, `summary`, `full_description` |
| reparto del texto (#29) | 1 | `title`, `summary`, `full_description` |
| arista nueva | 1 (`…AUTHORING-WORKSPACE-UX-AUDIT-001`) | `depends_on` |
| **nada** | **34** | — |

Los 34 se compararon **campo a campo** contra el respaldo — `run_id`, `title`, `summary`,
`full_description`, `status`, `lane`, `depends_on`, `closeout_result`, `progress`, el **orden de
las claves**, y su fase y objetivo — y son **idénticos**. Lo único que se movió en ellos es
`queue_order`, que es la cascada y no es contenido.

*(El encargo hablaba de «35 runs no tocados». La aritmética real: 53 − 17 − 1 = 35 runs que
conservan su texto entero, de los cuales **34 son idénticos en todo** y **1** — el `UX-AUDIT` —
cambia sólo su `depends_on`, que es precisamente lo que el encargo mandaba cambiar.)*

### F.5 Nadie cambió de status, y `.project/` no se re-emitió

- **Ningún run preexistente cambió de status** (comparados los 53, uno a uno).
- **Los 18 nuevos nacen `planned`**, sin `progress` y sin `closeout_result`. Es el status en que
  quedan; los cierra el operador desde la consola, que re-emite sola.
- **`.project/` de cantu-studio no se tocó**: los seis artefactos conservan su fecha de las 17:43,
  anterior a esta sesión. La consola del operador, por eso, seguirá mostrando el árbol de 53 runs
  hasta que ella misma re-emita en su próxima escritura. **Es lo esperado, no un fallo.**

### F.6 El validador de cantu-studio, VERDE

Corrido por la vía que no escribe (`node tools/project-console/validate-project-console-state.mjs`),
antes y después:

| | resultado |
|---|---|
| antes | `EXIT 0` — «7 objectives / 28 phases / **53** runs» |
| después | `EXIT 0` — «7 objectives / 28 phases / **71** runs; queue groups needs_human_decision=0 now=0 ready_next=9 later=60 history=2» |

El aviso no-bloqueante es el de siempre, palabra por palabra: la dependencia externa a
`RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`, que vive en el roadmap de aiw-console.

El **motor propio de Cantu** (`tools/roadmap/roadmap-core.mjs`, en memoria, sin escribir) da lo
mismo antes y después: **1 error preexistente** — esa misma arista externa, que su motor no sabe
resolver porque `externalRunIds` es una extensión que vive sólo en aiw-console — **0 errores de
campo inesperado**, y **roundtrip byte-idéntico** en los dos archivos. La partición no le
introduce nada.

---

## BLOQUE G — LA CONSOLA GLOBAL, EN DOM. **SIN RE-EMITIR NADA.**

Aquí hubo una tensión real entre dos criterios del encargo: la consola lee `.project/roadmap.json`
(la proyección emitida), no el canónico — y re-emitir está prohibido. Verificar el DOM sobre la
consola del operador habría exigido exactamente lo que el encargo veta.

Se resolvió **sin escribir un byte en cantu-studio**: se copió el canónico ya partido a una raíz
de proyecto de usar y tirar **dentro del scratchpad**, se emitió su `.project/` **ahí**, y se
levantó un **segundo servidor** (`PC_PORT=8799`, `PC_REGISTRY` apuntando a un registro del
scratchpad) que sirve esa raíz. Mismo código de consola, mismos datos que el canónico, cero
escrituras en el repo. La consola del operador en 8788 no se tocó.

El selector de carril, leído del DOM:

```
All lanes (71)
DEVELOPMENT — Development — code, structure, tooling (default) (48)
DOCUMENTATION — Documentation — writing, updating, reorganising docs (23)
```

Y el carril `DOCUMENTATION` filtrado, **numerado 1..23 localmente**, con su posición global al
lado (que es el comportamiento D-051 QA-A: con filtro de carril puesto, la etiqueta de carril deja
paso a la posición global, porque el número primario de la fila ya es la posición en el carril):

| en carril | run | global |
|---|---|---|
| 1 | Define the canonical documentation model, IA, and cadence | #2 |
| 2 | Define the component-doc single-source contract | #3 |
| **3–19** | **Document the Columns / Header / List / IconList / Card / Video / Narrative / Callout / Details / Arithmetic / Rule / Split / Table / ConceptGrid / Hierarchy / Timeline / Visual component** | #13 … #45 |
| **20** | **Audit the Web component documentation as a whole** | #47 |
| 21 | Establish the Slide Component Guide from the Web template | #53 |
| 22 | Deep documentation audit | #67 |
| 23 | Rename documentation directories and sweep prose | #69 |

**1..23 contiguo, verificado en el DOM.** Los 18 nuevos son las posiciones 3–20. En el carril
`DEVELOPMENT`, la otra mitad del #29 — «Audit the Web components as a whole», global #46 — se lee
en la posición 27 de su propio carril. Cada uno converge en el suyo.

---

## BLOQUE H — UNA SESIÓN PARALELA ESCRIBIÓ AL MISMO TIEMPO. NO ES ESTA.

A mitad de esta sesión, `git status` empezó a mostrar archivos que **esta sesión no escribió**:

| repo | archivo | hora | de quién |
|---|---|---|---|
| `cantu-studio` | `AGENTS.md`, `CLAUDE.md` | 22:36 | **otra sesión** |
| `aiw-console` | `context/cantu-studio/CANTU_STUDIO_CONTEXT.md` | 22:36 | **otra sesión** |
| `aiw-console` | `context/aiw-console/records/DISCIPLINA-UN-RUN-POR-CARRIL.md` (nuevo) | 22:38 | **otra sesión** |

Es el encargo hermano «un run a la vez POR CARRIL», que reescribe la regla 7 del pipeline de
Cantu. Se deja constancia y **no se tocó nada de eso**: revertirlo habría destruido trabajo ajeno.

La frontera de ESTA sesión, comprobable:

- El único archivo que esta sesión escribió en cualquier repo es
  `cantu-studio/.aiw/roadmap/roadmap.json`. Todo lo demás que produjo vive en el scratchpad.
- El canónico de `aiw-console` sigue en `58a726908ece58b59922ee0232b1eb15`, idéntico al arranque.
- `.project/` de cantu-studio sigue con fecha 17:43 y `git status --porcelain .project/` vacío.
- El repo `aiw` está limpio.
- El canónico de cantu conserva el md5 que esta sesión le dejó (`5e92eba3…`): nadie lo pisó
  después.

Y, de paso, la disciplina que la otra sesión estaba escribiendo se cumplió sin coordinación: las
dos sesiones tocaron **superficies de escritura disjuntas**.

---

## BLOQUE I — QUÉ QUEDA ABIERTO

1. **`.project/` de cantu-studio está desfasado a propósito.** La consola mostrará 53 runs hasta
   que el operador haga su próxima escritura desde ella, que re-emite sola. No hay nada que
   arreglar; hay que saberlo antes de mirar la consola y creer que la partición no ocurrió.
2. **El #45 (`RUN-JAME-PRODUCTION-LESSON-VALIDATION-001`) está sin decidir** — Bloque E.3. Una
   sola operación si el operador quiere la arista.
3. **Las oraciones de marco de la mitad de documentación del #29** son lo único redactado y no
   sólo repartido (Bloque D.2).
4. **El `full_description` de los 17 runs de documentación es una sola frase.** Es fiel al
   encargo. Cuando el #3 defina el contrato de packet, esos 17 querrán texto propio: qué secciones
   lleva el packet, qué evidencia, qué QA. Eso es trabajo del contrato, no de este reparto.
5. **Slide sigue sin paridad, y es correcto.** Sus runs por componente aún no existen: son un
   placeholder hasta que la reproducción del sandbox produzca el inventario real. La paridad de
   Slide sale sola cuando se creen, aplicando esta misma forma.
6. **Ningún barrier aplicado.** Los candidatos que el record anterior midió siguen igual de
   abiertos, y siguen fuera de alcance.
