# MIGRACIÓN DE CANTU-STUDIO A CARRILES

> Encargo de taller. **La primera aplicación real de D-051.** Hasta hoy los carriles vivían
> solo en un fixture; Cantu es el caso que motivó la funcionalidad — desarrollar un componente
> y documentar el anterior no compiten, y el roadmap los escribía como si dependieran.
>
> Fecha: 2026-07-27. **Ningún comando de git que escriba.** Git se usó SOLO EN LECTURA:
> `status --porcelain` (frontera, antes y después, en los dos repos), `diff`/`numstat` (probar
> intacto el emisor, el server y el markup), `show HEAD:` (reconstruir el renderer y el emisor
> anteriores para los A/B en memoria). No se tocó `CONTRATO.md`, ni `DECISIONES.md`, ni ningún
> record existente, ni el roadmap de aiw-console, ni el fork D-035, ni el prototipo retirado,
> ni el tooling viejo (`tools/project-console/`).
>
> **NO SE RESERVA NÚMERO DE DECISIÓN.** Nada aquí cambia el contrato: se APLICA D-051 a un
> proyecto real, se añaden las dos operaciones de motor que D-051 dejó sin escribir, y se
> tolera el vocabulario nuevo en el tooling de Cantu. Las marcas en el código dicen `[D-051]`
> y `[lanes: TOLERATE, NOT ADOPT]`.
>
> **Archivos escritos, y ninguno más:**
>
> | Repo | Archivo | Qué |
> |---|---|---|
> | `cantu-studio` | `.aiw/roadmap/roadmap.json` | el canónico migrado (por el motor) |
> | `cantu-studio` | `tools/roadmap/roadmap-core.mjs` | lista blanca: tolerancia |
> | `cantu-studio` | `tools/project-console/validate-project-console-state.mjs` | lista blanca: tolerancia |
> | `cantu-studio` | `.project/*.json` | re-emitido (6 archivos) |
> | `aiw-console` | `tools/roadmap/roadmap-core.mjs` | `setBarrier`, `declareLanes`, `normalizeRootKeyOrder` |
> | `aiw-console` | `tools/roadmap/roadmap-plan.mjs` | las dos ops en `KNOWN_OPS` y el dispatch |
> | `aiw-console` | `project-console/assets/project-console.js` | el bloque Barrier del modal |
> | `aiw-console` | `project-console/assets/project-console.css` | el panel del gate global |
> | `aiw-console` | `tests/roadmap-barrier-control.test.mjs` | **NUEVO**, 31 tests |
> | `aiw-console` | `tests/roadmap-engine.test.mjs`, `roadmap-lanes.test.mjs`, `roadmap-lane-numbering.test.mjs` | pins re-registrados |
> | `aiw-console` | este record |
>
> Además `.project/git_history.json` de `aiw-console`, reescrito por el test de sync de la
> suite (derivado, emisor propio — la misma nota de O4.P12 F.2, de D-051 G y del record de QA).
> **El canónico de `aiw-console` NO se tocó**: md5 `0a4c2d919279e1272c8f5400b78bbc2b`, igual
> que lo dejó la fase anterior, y `git diff --numstat` vacío.

---

## BLOQUE A — Tolerancia en el tooling local de Cantu

### A.1 Lo que se cambió, y lo que deliberadamente no

Dos listas blancas, en dos archivos, para que **acepten** los campos nuevos:

| Archivo | Antes | Ahora |
|---|---|---|
| `tools/roadmap/roadmap-core.mjs` | `ROOT_ALLOWED_FIELDS = [schema_version, roadmap_id, title, objectives]` | `+ lanes` |
| `tools/roadmap/roadmap-core.mjs` | `RUN_OPTIONAL_FIELDS = [closeout_result, progress]` | `[lane, barrier, closeout_result, progress]` |
| `validate-project-console-state.mjs` | `ROADMAP_V3_ROOT_FIELDS` servía de requeridos **y** de lista blanca | requeridos igual + `ROADMAP_V3_ROOT_OPTIONAL_FIELDS = [lanes]`, nueva |
| `validate-project-console-state.mjs` | `ROADMAP_V3_RUN_OPTIONAL_FIELDS = [closeout_result, progress]` | `[lane, barrier, closeout_result, progress]` |

**TOLERAR, NO ADOPTAR.** No se añadió una línea de lógica: el motor de Cantu no resuelve
carril, no deriva defecto, no lee un barrier, y no tiene operación que escriba ninguno de los
tres. El validador no comprueba que un `lane` esté declarado, no cuenta carriles y no dice una
palabra sobre ellos en su salida. Los tres campos se comportan exactamente como cualquier campo
que ese tooling no interpreta: **se preservan verbatim** a través de load → mutate → serialize.

Dos decisiones de detalle que sí importan:

1. **La raíz necesitaba un array nuevo.** En el validador, `ROADMAP_V3_ROOT_FIELDS` se recorre
   dos veces: una para exigir presencia, otra como lista blanca. Meter `lanes` ahí lo habría
   hecho **obligatorio** — y habría puesto en rojo a cualquier proyecto sin carriles, empezando
   por el propio Cantu antes de migrar. De ahí `ROADMAP_V3_ROOT_OPTIONAL_FIELDS`.
2. **El ORDEN dentro de `RUN_OPTIONAL_FIELDS` no es cosmético.** Ese array alimenta
   `CANONICAL_RUN_KEY_ORDER`, que `normalizeRunKeyOrder` usa para reordenar las claves de un run
   al editarlo. Si Cantu pusiera `lane`/`barrier` al final y aiw-console los pone antes de
   `closeout_result`, una edición hecha desde Cantu reescribiría el orden de claves de un run
   que escribió la otra herramienta. Se usó el MISMO orden, y así la exactitud de bytes es
   compartida, no por-herramienta.

### A.2 La medición: la tolerancia era necesaria, y es suficiente

Matriz 2×2 — el motor de Cantu antes y después del cambio, contra el roadmap antes y después
de migrar (`checkInvariants` en memoria, sin arrancar nada):

| | roadmap ANTES | roadmap DESPUÉS |
|---|---|---|
| **motor ANTES** | 1 error (preexistente) · 0 de campo inesperado | **7 errores · 6 DE CAMPO INESPERADO** |
| **motor DESPUÉS** | 1 error (preexistente) · 0 de campo inesperado | 1 error (preexistente) · **0 de campo inesperado** |

Los seis, textuales, en la celda que no existe ya:

```
root carries unexpected field lanes; only schema_version, roadmap_id, title, objectives are allowed
run RUN-CANTU-DOCUMENTATION-DEEP-AUDIT-001 carries unexpected field lane
run RUN-JAME-DOCUMENTATION-CANONICAL-MODEL-001 carries unexpected field lane
run RUN-JAME-COMPONENT-DOC-SINGLE-SOURCE-CONTRACT-001 carries unexpected field lane
run RUN-CANTU-DOCS-DIRECTORY-RENAME-001 carries unexpected field lane
run RUN-CANTU-SLIDE-COMPONENT-GUIDE-001 carries unexpected field lane
```

El **error preexistente** que aparece en las cuatro celdas es la dependencia externa legal de
Cantu (`RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` → `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`,
que vive en el roadmap de aiw-console). El motor de Cantu no conoce `externalRunIds` — eso es
una extensión de O4.P12 que vive solo en aiw-console — así que la reporta. **No la introduce
esta fase y no cambia con ella.** El motor de aiw-console, que sí compone el conjunto de
proyectos, da `checkInvariants = []` antes y después. Y el **roundtrip byte-idéntico** del motor
de Cantu se mantiene en las cuatro celdas.

Y lo mismo con el VALIDADOR, que es el que ha sido evidencia en todas las fases de O4:

| | Resultado |
|---|---|
| Validador **original** × roadmap **migrado** | **EXIT 1 — ROJO**, con los mismos 6 errores (`carries forbidden root field lanes`, …) |
| Validador **actual** × roadmap **migrado** | **EXIT 0 — VERDE** |
| Validador **actual** × roadmap **sin migrar** | **EXIT 0 — VERDE** (la tolerancia no cambia nada en un archivo sin carriles) |

*(El original se corrió EN SU SITIO, temporalmente, porque importa un módulo hermano; se
restauró en el mismo comando y el md5 posterior coincide. No quedó ningún archivo nuevo en
`cantu-studio`.)*

### A.3 La salida verde, entera, con el roadmap ya migrado

```
Project Console state validation passed.
Roadmap v3 prototype: 7 objectives / 28 phases / 53 runs; queue groups needs_human_decision=0 now=0 ready_next=9 later=42 history=2
Docs indexed: 140
Docs curated primary-visible: 53 of 140 registered
Component statuses: 16
Git provenance episodes: 9
Git history snapshot: 918 commits / 2 branches (2 visible, 0 backup hidden); current=main; run-associated=6; source=local_git_autosync
Roadmap rebase warnings (non-blocking):
- .aiw/roadmap/roadmap.json run RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 depends on
  RUN-CANTU-ROADMAP-CONTENT-AUDIT-001, which does not resolve in this roadmap. […]
```

`EXIT=0`. **Ni una línea menciona carriles**, que es exactamente lo que "tolerar, no adoptar"
significa. El aviso no-bloqueante es el de siempre, palabra por palabra.

### A.4 La suite propia de Cantu: neutra

`tools/roadmap/tests/` (7 archivos), corrida entera con el motor original en su sitio y luego
con el modificado:

| | checkIdentity | clearProgress | createObjective | createPhase | deleteObjective | deletePhase | statusTransitions | **TOTAL** |
|---|---|---|---|---|---|---|---|---|
| **antes** | 40/0 | 23/1 | 16/0 | 23/2 | 19/0 | 20/1 | 10/0 | **151 pass / 4 fail** |
| **después** | 40/0 | 23/1 | 16/0 | 23/2 | 19/0 | 20/1 | 10/0 | **151 pass / 4 fail** |

**Idéntico.** Los 4 fallos son PREEXISTENTES y ajenos a los carriles (p. ej. `clearProgress B7`
aserta "the canonical roadmap should carry at least one terminal run with a progress record",
que es una afirmación sobre los DATOS del canónico). Se nombran aquí sin tocarlos: arreglarlos
no es este encargo.

---

## BLOQUE B — El control de BARRIER

D-051 definió el barrier, lo validó y lo pintó, pero lo dejó **escribible solo a mano**: no
había forma de marcarlo desde la consola. Esto lo cierra, en tres capas.

### B.1 La operación de motor: `set-barrier`

Misma forma que `set-lane`, a propósito, porque es el mismo tipo de acto — una clave opcional
en un run, guardada solo cuando dice algo: `"lane"` / `"global"` la guardan, `null`/`""` la
**borran entera**. Un run sin barrier no almacena nada, así que "no es barrier" y "se limpió"
se leen igual (la disciplina de `archived` / `closeout_result` / `lane`).

**Dos rechazos, los dos leídos del modelo, no inventados:**

- **G1 — alcance desconocido.** `set-barrier: --barrier must be one of lane, global (or empty to
  clear); got "phase"`. `checkInvariants` rechaza el mismo valor una etapa después; la mutación
  rechaza lo que el guardián rechazaría, nombrando el vocabulario.
- **G2 — barrier de CARRIL en un roadmap sin carriles.** No porque sea inseguro —
  `resolveRunLane` da `null` para todos, así que degeneraría en global y el archivo seguiría
  válido— sino porque sería **una mentira almacenada**: una clave que dice `"lane"` en un
  proyecto que no tiene carriles, comportándose como `"global"`. Quien quiera ese
  comportamiento tiene una forma honesta de pedirlo, y se escribe `global`.

Lo que **NO** hace: no re-comprueba satisfacibilidad. Esa regla (y su teorema) son de
`checkInvariants`, que corre sobre el objeto mutado una etapa después. Probado: un barrier
construido para barrar su propia dependencia pasa la mutación **sin una palabra** y lo caza el
post-check con `unsatisfiable block`. Duplicar la regla aquí sería la deuda de drift contra la
que avisan los comentarios del core.

Es **batchable** junto a `set-lane` / `set-text` / `set-status`: marcar el carril de un run y su
barrier en la misma vista previa es una edición de un run, no dos escrituras.

### B.2 La operación de motor: `declare-lanes`

`lanes` es campo de RAÍZ y el motor no tenía cómo escribirlo — es decir, un proyecto solo podía
adquirir carriles editando el JSON a mano, que es justo lo que la regla "todo pasa por el motor"
prohíbe. `declare-lanes` reemplaza el vocabulario **ENTERO** (o lo limpia con `null` / `[]`).

Reemplazar entero y no "añadir un carril" es deliberado: la declaración tiene un invariante de
**un solo defecto** que cruza sus entradas, así que un `add-lane` incremental tendría que
inventar qué pasa con el defecto cuando llega el primer carril y qué pasa cuando se va el
último. Declarar el conjunto de una vez hace esos estados intermedios **irrepresentables** en
vez de meramente improbables — y es como lo piensa el operador: un proyecto tiene UN vocabulario.

**Cuatro rechazos:**

- **G1 — la forma**, entrada por entrada y con índice: `lane[0] missing string lane_id`,
  `lane[0] missing string title`, `lane[0] carries unexpected field colour`,
  `lane[0] must omit default unless true`, `lane[0] is not an object`, y
  `exactly one lane must be marked default (found 2)`.
- **G2 — limpiar** con runs que todavía llevan carril: refuse, **nombrando los runs**.
- **G3 — redeclarar** dejando fuera un carril que runs usan: refuse, nombrando carril y runs.
- **G4 — `lane_id` duplicado**: `lane[1] duplicate lane_id FORGE`.

Lo que **NO** hace: nunca toca un run. Re-alojar runs es trabajo de `set-lane`, un acto
explícito por run, así que una edición de vocabulario no puede mover trabajo entre carriles en
silencio. Cambiar **cuál** carril es el defecto, en cambio, re-aloja de golpe a todos los runs
sin carril — es la mecánica documentada de un defecto almacenado, y es la razón de que el
defecto sea una entrada marcada y no un accidente posicional. Probado.

**NO es batchable**, a diferencia de `set-barrier`: es un cambio de vocabulario de raíz, no una
edición por run, y emparejarlo con los `set-lane` que dependen de él escondería de qué mitad
del par vino un rechazo.

Añadido también `normalizeRootKeyOrder` + `CANONICAL_ROOT_KEY_ORDER`: un `lanes` recién
declarado se añadiría **después de `objectives`** — JSON válido, pero empujaría la única clave
enorme del archivo al medio y dejaría la declaración enterrada bajo miles de líneas. Ahora el
vocabulario cae con los campos pequeños de la raíz y `objectives` sigue siendo la última clave.
Es un array **distinto** de `ROOT_ALLOWED_FIELDS`: pertenencia y disposición son preguntas
distintas, y el mensaje de error de la lista blanca siempre ha impreso su propio orden.

### B.3 El control en el modal

Bloque `Barrier`, justo después del bloque `Lane`, siguiendo su patrón exacto (un `<select>`,
`data-v3edit-op`, recogido por el batch, dry-run → confirm).

**Se pinta en TODOS los roadmaps**, a diferencia del bloque Lane. Un proyecto sin carriles
también puede querer un punto de sincronización, y eso es precisamente un barrier global. Lo
que el caso sin carriles no puede tener es un barrier **de carril**: la opción sale
`disabled` y dice por qué —

```html
<option value="lane" disabled>Lane barrier — unavailable: this roadmap declares no lanes</option>
```

— espejando el rechazo del motor en vez de esconder una regla que el operador solo conocería
como error.

**GLOBAL ES DELIBERADAMENTE INCÓMODO** (D-051: visible, no cómodo). Tres fricciones, y ninguna
en las otras dos opciones:

1. **Es el ÚLTIMO de la lista, nunca preseleccionado, y va en MAYÚSCULAS** contra un `lane` en
   minúsculas. El preseleccionado es siempre `(no barrier)`.
2. **Elegirlo abre un panel de consecuencia** que dice, en runs de ESTE roadmap, qué barra:
   *"A global barrier is a project-wide synchronisation point: it holds N later run(s) across
   all M lanes until this run completes. That is the opposite of what lanes are for — every lane
   stops, not just this one."*
3. **Hay que marcar una casilla de reconocimiento** — *"I mean this as a project-wide
   synchronisation point"* — y **hasta que se marca, la op no se recoge en el batch en absoluto**:
   `v3EditBuildPayload` devuelve `null`. No es un aviso: es la condición de existencia de la
   operación (el precedente de `clear-progress`). El operador **no puede ni previsualizarla** por
   accidente, menos aún escribirla.

Y como el silencio se leería como un botón roto, un global sin reconocer se **REPORTA** al
previsualizar: *"A GLOBAL barrier is selected but not acknowledged, so it is not part of this
preview. Tick the acknowledgement in the Barrier block to include it — or pick a lane barrier
instead."*

Cambiar de global a otra opción **desmarca** el reconocimiento: armar es por-selección y nunca
se hereda de una elección que el operador ya abandonó.

El barrier de carril no tiene nada de esa fricción — barra un carril, que es planificación
ordinaria. **Limpiar** tampoco: deshacer un bloqueo nunca es la dirección peligrosa.

Los números del panel salen del modelo, derivados igual que el conjunto barrado, así que la
vista previa y el roadmap pintado no pueden discrepar. Medido, sobre el run #51 de Cantu:

```
(no barrier)                                                    <- seleccionado
Lane barrier — bars the 0 later run(s) on DOCUMENTATION
GLOBAL barrier — bars ALL 2 later run(s), in every lane
```

*(Un "bars the 0 later run(s)" es honesto y útil: dice que ahí un barrier de carril sería
inerte.)*

### B.4 Probado contra el FIXTURE, por HTTP, con revert byte-exacto

`tests/roadmap-barrier-control.test.mjs`, **31 tests**, cuatro capas. La capa de cable corre el
`serve.mjs` real en un puerto efímero contra una **COPIA temporal** del fixture de carriles —
**ningún proyecto real se escribe**, porque aplicar un barrier a un roadmap real es una decisión
del operador y un test no la puede tomar.

| Gesto (dry-run → confirm) | Resultado |
|---|---|
| dry-run de un barrier | **no escribe nada**: bytes y `mtime` idénticos |
| marcar barrier de **carril** → desmarcar | archivo **byte-exacto** al inicial |
| marcar barrier **global** → desmarcar | archivo **byte-exacto** al inicial |
| desmarcar el barrier global **propio del fixture** → volver a marcarlo | archivo **byte-exacto** al inicial |
| alcance inválido (`"phase"`) | **422 `refused`**, con las palabras del motor, sin escribir |
| confirm con baseline rancio | **409 `stale_baseline`**, sin escribir |
| `declare-lanes` que huerfanaría CHRONICLE | **422**, nombrando los 4 runs, sin escribir |
| `declare-lanes` +4º carril → volver a 3 | archivo **byte-exacto** al inicial |

---

## BLOQUE C — El vocabulario de Cantu

```json
"lanes": [
  { "lane_id": "DEVELOPMENT",   "title": "Development — code, structure, tooling",            "default": true },
  { "lane_id": "DOCUMENTATION", "title": "Documentation — writing, updating, reorganising docs" }
]
```

Claves y nombres **en inglés**, por la regla de idioma de la fase anterior: la UI y los
identificadores del producto van en inglés. Los títulos, resúmenes y descripciones de los 53
runs de Cantu **no se tradujeron ni se tocaron** — son contenido del proyecto.

### El DEFECTO es `DEVELOPMENT`, y por qué

Dos razones, y la primera es la que pide el encargo:

1. **Minimiza las claves explícitas.** 48 runs de 53 son de desarrollo. Con `DEVELOPMENT` de
   defecto el archivo almacena **5** claves `lane`; con `DOCUMENTATION` almacenaría **48**. Un
   proyecto guarda la excepción, no la regla.
2. **Un run nuevo cae del lado seguro.** Cantu es un repo de producto: el trabajo por defecto es
   desarrollo. Un run de documentación que se olvide de marcar queda en desarrollo — hace cola
   con lo demás, que es sólo una molestia. Al revés, un run de desarrollo caído en documentación
   afirmaría que hay trabajo de docs que nadie escribió.

---

## BLOQUE D — El reparto de los 53 runs

**Regla del operador:** un run va a documentación si su **ENTREGABLE** es documentación
—escribir, actualizar o reorganizar docs—. Todo lo demás, a desarrollo.

### D.1 El reparto

| | Runs | Clave `lane` almacenada |
|---|---|---|
| **DEVELOPMENT** (defecto) | **48** | ninguna — resuelven al defecto al LEER |
| **DOCUMENTATION** | **5** | 5 explícitas |
| **TOTAL** | **53** | **5 explícitas / 48 por defecto** |

Los cinco de documentación, con la razón:

| # | Run | Por qué su entregable es documentación |
|---|---|---|
| 2 | `RUN-JAME-DOCUMENTATION-CANONICAL-MODEL-001` | "Define which document classes own … Establish freshness rules, … and the Docs / Governance / Sources **information architecture**". Reorganiza la documentación; "implements no … user interface". |
| 3 | `RUN-JAME-COMPONENT-DOC-SINGLE-SOURCE-CONTRACT-001` | "so each component's **documentation lives in one canonical structured packet**"; "defines the contract and its consumers only". Es reorganización del corpus documental. |
| 35 | `RUN-CANTU-SLIDE-COMPONENT-GUIDE-001` | "Establish the Slide Component Guide as the **single-source documentation format**"; "establishes the guide format only; it does not document individual components". |
| 49 | `RUN-CANTU-DOCUMENTATION-DEEP-AUDIT-001` | "A thorough **audit and classification of every documentation source**". |
| 51 | `RUN-CANTU-DOCS-DIRECTORY-RENAME-001` | "**Rename the live documentation directories** … and sweep renamable prose"; "does not touch code directories or runtime identifiers". Es literalmente "reorganizar documentación". |

### D.2 La frontera que se usó, dicha en voz alta

La regla decide sola en 48 casos. Donde hubo que trazar línea, se trazó así, y se declara para
que el operador la pueda mover:

- **Los 17 runs de componente (#12–#28)** se titulan "Audit, implement **and document** the X
  component". Van a **DESARROLLO**: su entregable es el componente; documentarlo es un paso del
  Definition of Done, no el entregable. Es exactamente el caso que motivó los carriles
  ("desarrollar un componente y documentar el anterior no compiten"). *Queda dicho que llevan un
  paso de documentación dentro, por si el operador los quiere partir algún día.*
- **Los contratos técnicos** (#7 color/paleta, #8 math/fórmula, #9 contratos de componente, #30
  MathLive, #41 Asset Registry, #42 `ctx.assets`, #47 hosting) van a **DESARROLLO**: su entregable
  es un contrato de ingeniería que después implementa código — "estructura", no corpus documental.
- **#48 `RUN-JAME-PROJECT-CONSOLE-DOCS-V3-001`** ("Implement the canonical Docs view") va a
  **DESARROLLO** aunque trate de docs: el entregable es **una vista**, o sea código. Construir un
  visor de documentación no es escribir documentación.
- **#11** ("produce one current inventory … **it audits, repairs, and documents nothing**") va a
  **DESARROLLO** por su propia frase: es medición de código.

### D.3 AMBIGUOS — 5 de 53, reportados, dejados en el carril por defecto

**No se clasificaron por criterio propio.** Los cinco quedan en `DEVELOPMENT` (el defecto) y
llevan **cero** clave almacenada, así que moverlos es un `set-lane` por run desde el modal.

| # | Título | La duda |
|---|---|---|
| **1** | Establish the Smart Formula Field RULE_ONLY baseline | El entregable es "**Record** the accepted … behavior … **as the stable baseline**". No nombra ningún documento y no cambia código: puede ser un escrito de documentación o la aceptación de un estado. |
| **4** | Update the operating methodology to roadmap-first ordering | Entregable **mixto**: actualiza `AGENTS.md` y `NEXT_STEPS` (documentación) **y** `generate_prompt_context.js` (una herramienta). Dos tercios docs, un tercio código. |
| **5** | Freeze the naming disposition map and exclusion list | El artefacto (`docs/ops/NAMING_DISPOSITION_MAP.md`) ya existe; el entregable es **aprobarlo y congelarlo**. "Nothing is renamed by this run; it converts the read-only map into an approved decision". ¿Actualizar un documento, o una decisión de gobierno al servicio de renombres futuros? |
| **29** | Audit the Web components and their documentation as a whole | Entregable: "one **readiness evidence package**". Un paquete de evidencia se lee como documento, pero el acto es auditar salida de desarrollo. |
| **38** | Assemble the Slide whole-set audit and readiness evidence | Idéntica forma que #29. |

**Los cinco comparten la MISMA duda**, y merece la pena decirlo así: son runs cuyo entregable es
**un escrito sobre ingeniería** (línea base, evidencia, decisión congelada). La regla del
operador separa por entregable, y ahí el entregable es a la vez un documento y un producto de
trabajo de desarrollo. **Es una sola decisión de frontera, no cinco**: si la cabina dice
"evidencia y decisiones congeladas son documentación", los cinco se mueven juntos; si dice "son
producto de trabajo del desarrollo", los cinco se quedan donde están y no hay nada que hacer.

**Son pocos: 5 de 53 (9,4 %).** La regla decidió sola en **48 de 53 (90,6 %)**. La regla basta.

### D.4 Todo pasó por el motor: 6 operaciones

Ninguna edición fue por escritura directa del JSON. El único escritor fue `core.applyWrite`,
alcanzado por `applyPlan` — la misma secuencia que corre la ruta de escritura de la consola:

```
planEdit (dry run) → planEdit + compare-and-swap sobre el baseline → applyPlan(validador inyectado)
```

| # | Operación | dry-run | apply | `remap` | avisos | bytes |
|---|---|---|---|---|---|---|
| 1 | `declare-lanes DEVELOPMENT+DOCUMENTATION` | ok | escrito | **0** | 0 | 68 805 → 69 078 |
| 2 | `set-lane RUN-JAME-DOCUMENTATION-CANONICAL-MODEL-001` | ok | escrito | **0** | 0 | 69 118 |
| 3 | `set-lane RUN-JAME-COMPONENT-DOC-SINGLE-SOURCE-CONTRACT-001` | ok | escrito | **0** | 0 | 69 158 |
| 4 | `set-lane RUN-CANTU-SLIDE-COMPONENT-GUIDE-001` | ok | escrito | **0** | 0 | 69 198 |
| 5 | `set-lane RUN-CANTU-DOCUMENTATION-DEEP-AUDIT-001` | ok | escrito | **0** | 0 | 69 238 |
| 6 | `set-lane RUN-CANTU-DOCS-DIRECTORY-RENAME-001` | ok | escrito | **0** | 0 | 69 278 |

**6 planificadas, 6 aplicadas, 0 fallos, 0 rollbacks.** `remap = 0` en las seis: **ningún run
cambió de `queue_order`**, dicho por el motor mismo y no por una inspección posterior.

`externalRunIds` se compuso como lo compone `serve.mjs` (`externalRunIdsFor`): los 35 run ids
del otro proyecto registrado con layout. El validador de post-escritura reinyectado es el mismo
`writtenFileValidator`: releer el archivo renombrado y verificar invariantes.

---

## BLOQUE E — CANDIDATOS A BARRIER. **NINGUNO APLICADO.**

Recorridos los 53 runs buscando las formulaciones que el encargo nombra. Para cada candidato se
mide, además de la cita, **cuánto añadiría de verdad**: cuántos runs barraría que no lo alcancen
ya por `depends_on`. Un barrier que sólo repite una dependencia existente es ruido.

**Verificado: el roadmap migrado no contiene ningún `barrier`.** Medido sobre el archivo (0
ocurrencias) y clavado por test (`for (const run of runs) assert.equal("barrier" in run, false)`).

### E.1 Los candidatos, por fuerza de la evidencia

| # | Run | Cita del propio texto | Alcance propuesto | Barraría de NUEVO |
|---|---|---|---|---|
| **32** | Audit and define the Slide grid system | "the editor uses to place content on a slide, **before any sandbox reproduction or component work**" | ver E.2 — **el vocabulario no lo expresa** | carril: 1 · global: 2 |
| **5** | Freeze the naming disposition map | "as the **frozen contract every later rename run follows**", "**freeze** the exclusion list", "the execution runs have **a single authority**" | **carril** (DEVELOPMENT) | carril: **41** · global: 43 |
| **9** | Define shared component contracts | "used by **every subsequent** Web component revalidation Run", "a **cross-cutting foundation** consumed by components" | **carril** (DEVELOPMENT) | carril: **11** · global: 13 |
| **11** | Inventory the Web components | "**This inventory replaces** the older status-group classification … so the per-component audit runs work from what the code shows today" (línea base) | **carril** (DEVELOPMENT) | carril: **9** · global: 11 |
| **29** | Audit the Web components as a whole | "**After the seventeen Web component runs close**", "Consolidate … into one readiness evidence package" | **carril** (DEVELOPMENT) | carril: **9** · global: 11 |
| **38** | Slide whole-set audit and readiness evidence | "**After the per-component Slide runs close** … audit the Slide component set as a whole" | **carril** (DEVELOPMENT) | carril: **1** · global: 2 |
| **33** | Establish the Slide architecture baseline | "Produce a source-backed **baseline before selecting implementation work**" | **carril** (DEVELOPMENT) | (contenido en #32) |
| **2** | Canonical documentation model | fundación del corpus; #3, #45 y #48 lo consumen | **carril** (DOCUMENTATION) | carril: **2** · global: 17 |

### E.2 Tres hallazgos que importan más que la lista

**(1) #32 es el candidato más claro por texto y el que el vocabulario NO puede expresar.**
"Before any sandbox reproduction or component work" quiere barrar *todo el trabajo posterior de
Slide*. Pero un barrier de carril sobre `DEVELOPMENT` barraría también Asset Dedup, los
renombres y el flujo de producción — que no tienen nada que ver con Slide; y global barraría
además documentación. **El alcance que ese run quiere no existe en un vocabulario de dos
carriles.** Es un argumento medido a favor de un tercer carril (Slide) si el operador lo quiere,
o de dejarlo en `depends_on`, que ya lo cubre: 19 runs lo alcanzan transitivamente y un barrier
de carril sólo añadiría **1**.

**(2) #5 es el que más añadiría — 41 runs — y por eso es el que más hay que pensar.** Los cinco
runs de renombre ya declaran `depends_on: RUN-CANTU-NAMING-AUDIT-DISPOSITION-001`, así que para
ellos el barrier es **redundante**. Lo que añadiría es barrar los **otros 41**, que es un efecto
mucho mayor que "congelar el mapa antes de renombrar": es *"nada avanza hasta que se apruebe el
mapa de nombres"*. Es una decisión de calendario, no de contrato, y por eso queda para el
operador.

**(3) Dos casos donde un barrier NO añade nada, y conviene decirlo:**
- **#50 (`INTERNAL-CODE-RENAME`)**, pese a la cita fuerte "**to avoid renaming directories while
  other runs still edit them**": sólo quedan 3 runs después y los 3 ya dependen de él.
  **Carril: 0 · global: 0.** Un barrier ahí sería pura decoración.
- **#1 (`SMART-FORMULA-FIELD-RULE-ONLY-BASELINE`)** dice "**as the stable baseline**" y
  "**Preserve the boundary**" — lenguaje de barrier puro — pero está **`completed`**, y el
  modelo sólo barra mientras el barrier no está completado. Sería **inerte desde el minuto
  cero**. Se reporta por el texto, no por el efecto.

**Y una observación de forma sobre #2 y #3**, los dos de documentación: sus dependientes son
casi todos de OTRO carril (31 y 32 respectivamente, cruzados). Un barrier de carril sobre ellos
añadiría 2; sólo un global alcanzaría a los demás. Es el patrón que hay que vigilar: **una
fundación cuyo público está en otro carril no se expresa con un barrier de carril**, y la
alternativa —global— re-serializa el proyecto entero. Ahí `depends_on` sigue siendo la
herramienta correcta, y de hecho ya está puesta.

---

## BLOQUE F — Verificación sin daño

### F.1 Invariantes: antes y después

| Invariante | ANTES | DESPUÉS |
|---|---|---|
| `queue_order` global | 1..53, **denso**, **único**, 53 valores | 1..53, **denso**, **único**, 53 valores |
| `depends_on` colgantes (resueltos contra el conjunto de proyectos) | **0** | **0** |
| dependencia externa legal (§10.d) | 1 (`→ RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`) | 1, **la misma** |
| ids de run (md5 del conjunto ordenado) | `cbb80acc4aad32bb39d90025b2e64836` | `cbb80acc4aad32bb39d90025b2e64836` |
| objetivos / fases / runs | 7 / 28 / 53 | 7 / 28 / 53 |
| `checkInvariants` (motor de aiw-console, con `externalRunIds`) | `[]` | `[]` |
| carriles declarados | ninguno | `DEVELOPMENT*`, `DOCUMENTATION` |
| todo `lane` usado está declarado | vacuo | **sí** — los 53 resuelven a un carril declarado |
| `barrier` en el archivo | **0** | **0** |
| md5 del canónico | `58803b0afcae10142d5fe788ae9959ea` | `a1aeb75769dd11e6ae700b9cc89a07c2` |

**Ningún id renumerado**: el md5 del conjunto de run ids es el mismo, y `remap = 0` en las seis
operaciones.

### F.2 Contenido intacto: diff por tipo de cambio

| Tipo de cambio | Cuántos | Qué |
|---|---|---|
| clave de RAÍZ añadida | **1** | `lanes` |
| clave de raíz eliminada / con valor cambiado | **0** / **0** | — |
| clave de RUN añadida | **5** | `lane: "DOCUMENTATION"` en 5 runs |
| clave de run eliminada | **0** | — |
| **valor de run cambiado** | **0** | — |
| runs añadidos / eliminados | **0** / **0** | — |
| runs movidos de objetivo o fase | **0** | — |
| estructura objetivo→fase→runs | **idéntica** | mismos ids, mismos recuentos, mismo orden |
| títulos de objetivo y de fase | **idénticos** | |

Campo por campo, sobre los 53 runs:

| Campo | Resultado |
|---|---|
| `title` · `summary` · `full_description` | **53 idénticos / 0 cambiados** (cada uno) |
| `status` · `depends_on` · `queue_order` · `run_id` | **53 idénticos / 0 cambiados** (cada uno) |
| `closeout_result` · `progress` | **53 idénticos / 0 cambiados** (cada uno) |

Y el diff de texto crudo: **37 líneas, 21 añadidas y 5 "eliminadas"** — las 5 son sólo la línea
anterior reescrita para añadirle la coma de JSON. **Estrictamente aditivo.**

### F.3 Respaldo y frontera

| Verificación | Resultado |
|---|---|
| Respaldo previo del canónico de Cantu | `roadmap.json.BEFORE`, md5 `58803b0afcae10142d5fe788ae9959ea`, 68 805 bytes — **el mismo md5 que registró el record anterior** |
| Respaldo previo de los dos archivos de tooling | `cantu-roadmap-core.mjs.BEFORE` `05553b18…`, `cantu-validate.mjs.BEFORE` `7322c8c6…` |
| Respaldo previo de `.project/` de Cantu | los 6 JSON, con md5 |
| `cantu-studio` — archivos modificados | **9**: el canónico, los 6 de `.project/`, y los 2 de las listas blancas |
| `cantu-studio` — algo fuera de esos tres alcances | **NINGUNO** (barrido con `git status --porcelain` filtrado) |
| Nada borrado | 0 archivos eliminados en los dos repos |
| `aiw-console/roadmap/roadmap.json` | md5 `0a4c2d919279e1272c8f5400b78bbc2b`, `git diff --numstat` **vacío** |
| Emisor (`tools/projector/`), server (`serve.mjs`), markup (`index.html`) | `git diff --stat` **vacío**: sin tocar |

### F.4 `.project/` de Cantu: el delta, por artefacto

| Artefacto | Líneas cambiadas | No-cabecera |
|---|---|---|
| `guardrails.json` · `no_claims.json` · `docs_index.json` | 4 cada uno | **0** — sólo `generated_at` / `mtime` |
| `roadmap.json` | 32 | **26** — el bloque `lanes` (11) + 5 `"lane"` + 5 comas + cabecera |
| `snapshot.json` | 32 | **26** — lo mismo |
| `git_history.json` | 22 | 14 — **1 commit nuevo del operador** (`docs: reorganizacion por categoria y archive`), 462 → 463 |

El delta de `git_history.json` **no lo produce esta fase**: es un commit que el operador hizo en
`cantu-studio` después de la última emisión, y la re-emisión lo recoge. Se nombra para que no se
lea como daño.

`lanes` viaja verbatim al emitido (`aiw-projector@0.9.0`, **sin cambios**), y los 5 runs llevan
su clave. Es el transporte que D-051 ya había construido: no hizo falta tocar el emisor.

### F.5 Sin regresión: el A/B contra el renderer anterior

Método D.4 de O4.P12: renderer **anterior** reconstruido con `git show HEAD:` y corrido en el
mismo harness de DOM contra el vigente, sobre los dos proyectos reales.

| Comparación | Resultado |
|---|---|
| `aiw-console` — 21 superficies pintadas | **IDÉNTICAS, byte a byte** |
| `cantu-studio` — 21 superficies pintadas | **IDÉNTICAS, byte a byte** |

Es el resultado correcto y dice algo preciso: **el cambio de renderer vive entero dentro del
modal de edición**, que sólo se pinta cuando el operador lo abre. Ninguna superficie de lectura
se movió, en ninguno de los dos proyectos.

### F.6 En DOM, los tres proyectos

| Medición | `aiw-console` | `cantu-studio` | `Fixture Lanes` |
|---|---|---|---|
| selector de carril | **0 hijos** | **1** | 1 |
| opciones del selector | — | `All lanes (53)` · `DEVELOPMENT — … (default) (48)` · `DOCUMENTATION — … (5)` | 4 |
| filas de cola / filas del árbol | 35 / 35 | **53 / 53** | 12 / 12 |
| etiquetas de carril (sin filtro) | **0** | **53** | 12 |
| chips `#N global` (sin filtro) | **0** | **0** | 0 |
| marcas de barrier | **0** | **0** | 2 |

Con filtro, Cantu:

| Filtro | Filas | Posiciones | Chips `#N global` | Etiquetas de carril |
|---|---|---|---|---|
| `DEVELOPMENT` | **48** | **1…48**, contiguas | los 48 `queue_order` reales (1, 4, 5, …, 50, 52, 53) | **0** |
| `DOCUMENTATION` | **5** | **1, 2, 3, 4, 5** | **2, 3, 35, 49, 51** ← los cinco runs de docs | **0** |

La numeración local de la corrección QA-A funciona sobre datos reales: la cola de documentación
de Cantu, que globalmente se lee **salteada** (2, 3, 35, 49, 51), se lee **1 2 3 4 5** al
filtrar, con el orden global a la derecha. Y `aiw-console`, sin carriles, **no cambió un byte**.

### F.7 Aditividad

`git diff --numstat -- tools/projector/project.mjs` está **vacío**: el emisor no se tocó. La
proyección se midió igualmente, no se dio por supuesta — el root de AIW (modo 1,
`aiw_objectives`) emitido **dos veces sobre dos copias temporales**, una con el emisor de HEAD y
otra con el de trabajo:

| Artefacto | Líneas distintas | De las cuales `generated_from` |
|---|---|---|
| `project_console.snapshot.json` | **0** | 0 |
| `roadmap.json` (vista) | **0** | 0 |

**Byte-idéntica, incluso en `generated_from`** — más fuerte de lo que pedía el criterio, porque
el emisor no cambió en absoluto. (El repo de AIW no se escribió: las dos emisiones fueron sobre
copias en el scratchpad.)

### F.8 Suite

**259/259 verde** (`npm test`), desde 224:

| | Tests |
|---|---|
| antes | 224 |
| `tests/roadmap-barrier-control.test.mjs` (NUEVO) | **+31** |
| pins re-registrados (ver abajo) | +4 |
| **total** | **259 / 259** |

**Tres pins previos se re-registraron, y ninguno se borró:**

1. **`KNOWN_OPS`** decía "la lista trasplantada más `set-lane`", con la nota "any further drift
   from this list is a decision to register". Se registra: ahora son **tres** ops de D-051 —
   `set-lane`, `set-barrier` y `declare-lanes` — y el comentario dice por qué las dos nuevas
   existen (sin ellas, marcar un barrier o declarar un vocabulario obligaba a editar el JSON a
   mano, que es justo lo que la regla del motor prohíbe).
2. **"ninguno de los dos canónicos reales declara carriles"** se **partió en tres**, no se
   ablandó: la mitad compartida (invariantes read-only + roundtrip byte-idéntico) sigue
   afirmándose sobre los dos; `aiw-console` conserva el pin de "sin carriles" **literal**; y
   Cantu recibe uno **positivo** — dos carriles, exactamente un defecto, los 53 runs resuelven a
   un carril declarado, 5 explícitas + 48 por defecto, **y ni un `barrier`**. Ese último es un
   pin duro: un barrier que aparezca ahí significa que alguien aplicó uno sin decisión.
3. **"los dos proyectos reales, sin selector ni etiquetas" (en DOM)** se partió igual: el pin de
   no-regresión queda **con cada aserción intacta** sobre `aiw-console`, y Cantu gana dos tests
   nuevos que miden su selector, sus etiquetas, su numeración local por carril y sus conteos —
   todos leídos del canónico, sin hornear una sola clave de carril.

---

## BLOQUE G — Qué queda abierto

1. **Los 5 AMBIGUOS (D.3)** esperan al operador. Es **una** decisión de frontera, no cinco: si
   "evidencia, línea base y decisión congelada" son documentación, se mueven los cinco; si son
   producto de trabajo del desarrollo, no hay nada que hacer. Están en el defecto y sin clave
   almacenada, así que moverlos es un `set-lane` por run desde el modal.
2. **Los CANDIDATOS A BARRIER (E)** esperan al operador, que ahora los puede marcar él mismo
   desde el control de (B), en cualquier proyecto. **Ninguno aplicado.**
3. **Un tercer carril para Slide**, si el operador lo quiere: #32 pide un alcance que un
   vocabulario de dos carriles no puede expresar (E.2.1). `declare-lanes` ya lo permite sin
   tocar un run.
4. **Los 17 runs de componente llevan un paso de documentación dentro** (D.2). Van a desarrollo
   por la regla del entregable. Si algún día se quieren partir, aquí queda dicho.
5. **La suite propia de Cantu tiene 4 fallos preexistentes** (A.4), nombrados y no tocados.
6. **BATCH sigue fuera** por mandato. `set-barrier` ya es batchable en el motor y en el modal;
   `declare-lanes` deliberadamente no.
7. **Re-emisión de `.project/` de aiw-console**: el desfase de `0.8.0 → 0.9.0` que los dos
   records anteriores midieron **sigue ahí**; esta fase no añade un byte (no toca el emisor ni
   el canónico propio) y tampoco lo resuelve. Es la cuarta vez que se nombra.
8. **`DECISIONES.md` no se tocó** (fuera de alcance). Si la cabina quiere numerar la aplicación
   de D-051 a un proyecto real, es una entrada de una línea que apunta a este record.

---

## REPORTE para QA del operador — PowerShell

Cantu es ahora el **primer proyecto real con carriles**, así que esto se mira en el registro de
siempre, sin fixture:

```powershell
node project-console/serve.mjs
```

Abre <http://127.0.0.1:8788/project-console/index.html> (8788 es el puerto por defecto; el
server imprime el suyo al arrancar).
Para el fixture de carriles, que sigue siendo donde se prueban los barriers:

```powershell
$env:PC_REGISTRY = 'tests/fixtures/lanes/qa-projects.json'
$env:PC_PORT = '8799'
node project-console/serve.mjs
```

Y para volver al registro real:

```powershell
Remove-Item Env:PC_REGISTRY, Env:PC_PORT
```

**Qué mirar, en orden:**

1. **Sin regresión, primero.** Abre **AIW Console** → Roadmap. **Nada nuevo**: ni selector de
   carril, ni etiquetas, ni chips. Sigue con 35 filas y su árbol de 2 objetivos / 16 fases.

2. **Cantu con carriles.** Abre **Cantu Studio** → Roadmap → Run Queue. Ahora hay un selector
   `LANE` con tres entradas:
   - `All lanes (53)`
   - `DEVELOPMENT — Development — code, structure, tooling (default) (48)`
   - `DOCUMENTATION — Documentation — writing, updating, reorganising docs (5)`

   Con **All lanes** las 53 filas llevan su etiqueta `DEVELOPMENT-01`, `DOCUMENTATION-01`, …

3. **La numeración local, sobre datos reales.** Elige **`DOCUMENTATION`**. Quedan **5 filas**
   numeradas **1 2 3 4 5**, cada una con su chip a la derecha: **`#2 global`**, `#3 global`,
   `#35 global`, `#49 global`, `#51 global`. Globalmente esa cola se lee salteada (2, 3, 35, 49,
   51); por carril se lee seguida. Elige **`DEVELOPMENT`**: 48 filas, **1…48** contiguas.
   Vuelve a **All lanes**: todo regresa al orden global.

4. **Los cinco de documentación, por nombre.** Con `DOCUMENTATION` puesto deben ser exactamente:
   *Define the canonical documentation model, IA, and cadence* · *Define the component-doc
   single-source contract* · *Establish the Slide Component Guide from the Web template* · *Deep
   documentation audit* · *Rename documentation directories and sweep prose*. **Si alguno te
   sobra o te falta, es la decisión de D.3 y es tuya** — se mueve con el bloque "Lane" del modal.

5. **El control de BARRIER (lo nuevo).** Botón **"Edit roadmap"** → abre cualquier run → baja al
   bloque **"Barrier"**, justo debajo de "Lane". Verás tres opciones y **`(no barrier)`
   preseleccionada**:
   - `Lane barrier — bars the N later run(s) on DEVELOPMENT`
   - `GLOBAL barrier — bars ALL M later run(s), in every lane` ← **en mayúsculas, y el último**

   Elige **GLOBAL**: se abre un panel de aviso con la cuenta real de runs que pararía, y una
   casilla *"I mean this as a project-wide synchronisation point"*. **Sin marcarla, "Preview all
   changes" te dirá que el barrier global no entra en la vista previa.** Márcala y aparece en el
   preview. Cambia a otra opción y vuelve a global: la casilla se ha **desmarcado sola**.

   En **AIW Console** (sin carriles) el mismo bloque muestra `Lane barrier — unavailable: this
   roadmap declares no lanes`, deshabilitado, y global disponible.

6. **Si quieres escribir un barrier de verdad, hazlo en el fixture.** Arranca con
   `PC_REGISTRY` como arriba, abre **Fixture Lanes** → "Edit roadmap" → un run → Barrier →
   `Lane barrier` → "Preview all changes" → confirma. Verás la marca `Barrier · lane` en la fila
   y los runs que retiene diciendo "Held by barrier". Para deshacerlo: mismo bloque,
   `(no barrier)`, preview, confirmar. **El archivo vuelve byte a byte** — está probado, pero
   compruébalo si quieres.

7. **Ningún barrier en Cantu.** A propósito: los candidatos están en el Bloque E de este record
   con su evidencia y su alcance propuesto, y la decisión es tuya. Un barrier mal puesto
   re-serializa el proyecto entero, que es lo contrario de lo que esta migración buscaba.

8. **El validador de Cantu, si lo quieres ver tú:**

```powershell
node tools/project-console/validate-project-console-state.mjs
```

   (desde `projects/cantu-studio`). Debe decir `Project Console state validation passed.` y
   `7 objectives / 28 phases / 53 runs`. **No menciona carriles**: los tolera, no los usa.

---

## Estado de completitud

- Bloque A (tolerancia en las dos listas blancas; matriz 2×2 del motor; validador original en
  rojo vs actual en verde; suite propia de Cantu neutra) — COMPLETO.
- Bloque B (`set-barrier` y `declare-lanes` con sus rechazos; el bloque del modal; el gate global
  con sus tres fricciones; 31 tests, dry-run→confirm por HTTP contra el fixture con revert
  byte-exacto) — COMPLETO.
- Bloque C (vocabulario declarado por el motor, en inglés, con el defecto justificado) — COMPLETO.
- Bloque D (48/5, 5 explícitas; la frontera declarada; 5 ambiguos reportados y dejados en el
  defecto; 6 operaciones por el motor, 0 por edición directa) — COMPLETO.
- Bloque E (candidatos con cita, alcance propuesto y cuánto añadirían de verdad; **ninguno
  aplicado**, verificado y clavado por test) — COMPLETO.
- Bloque F (invariantes antes/después, diff por tipo, respaldo, frontera, `.project/`, A/B del
  renderer, DOM, aditividad, suite) — COMPLETO.
- Bloque G (lo abierto) — COMPLETO.
- Reporte de QA en PowerShell — COMPLETO.
