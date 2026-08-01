# CLASIFICACIÓN — EMISOR Y CONSOLA: la derivación, el transporte, la vista, la lista y la escritura

> **Encargo 2 de 3** del run `RUN-CONSOLE-RUN-CLASSIFICATION-FIELDS-001` (`queue_order` 43).
> El encargo 1 (`CLASIFICACION-MOTOR.md`) dejó los seis campos ALMACENADOS entrando al motor y
> dos invariantes rechazando. Éste pone **lo que se lee, lo que viaja, lo que se ve, lo que se
> lista y lo que se escribe**.
>
> **EL RUN NO SE CIERRA.** Queda `active`. Falta el encargo 3.
>
> Cada cifra de este record lleva el comando que la produjo. Lo no medido va marcado
> `[NO VERIFICADO]`.

---

## BLOQUE A — Guardas y rutas

### A.1 — El run, derivado del canónico (no tecleado)

```bash
node -e "const fs=require('fs');const r=JSON.parse(fs.readFileSync('roadmap/roadmap.json','utf8'));const runs=[];(function walk(n,path){if(Array.isArray(n))return n.forEach((v,i)=>walk(v,path+'['+i+']'));if(n&&typeof n==='object'){if(n.run_id)runs.push({path,n});for(const k of Object.keys(n))walk(n[k],path+'.'+k)}})(r,'');const m=runs.filter(x=>x.n.queue_order===43);console.log('runs',runs.length,'| queue_order 43:',m.length);m.forEach(x=>console.log(x.path,'\n',JSON.stringify({run_id:x.n.run_id,title:x.n.title,status:x.n.status},null,2)))"
```

| Comprobación | Esperado por el ticket | En disco | Veredicto |
|---|---|---|---|
| `run_id` | `RUN-CONSOLE-RUN-CLASSIFICATION-FIELDS-001` | idéntico | **COINCIDE** |
| `title` | «The five classification fields enter the roadmap schema, with derivation at read time and a minimal view» | idéntico, carácter a carácter | **COINCIDE** |
| `status` | `active` | **`active`** | **COINCIDE** — sin discrepancia que reportar |
| Ubicación | — | `.objectives[1].phases[14].runs[8]` | — |
| Runs totales en el canónico | — | **52** | — |

**La guarda no disparó. El encargo continuó.** A diferencia del encargo 1, cuya guarda sí paró
por `status: planned`, aquí el disco y el ticket coinciden en los tres campos.

### A.2 — Las rutas se derivaron de los DOS records, no del ticket

El ticket omite las rutas a propósito. Se leyeron de:

- `MEDICION-SUPERFICIES-CLASIFICACION.md` **B.0** (los tres árboles muertos), **B.4** (emisor y
  forma del sobre, `:303-418`) y **B.5** (consola, `:419-465`);
- `CLASIFICACION-MOTOR.md` completo, en particular **B.3** (el invariante que quedó fuera y por
  qué), **B.4** (la derivación no se movió al motor) y **G.2** (qué falta, por archivo).

**Ningún archivo necesario faltaba de esos dos records.** No hubo que parar por A.2, y no se
buscó nada «por parecido».

### A.3 — Los tres árboles muertos: NINGUNO se tocó

```bash
for f in docs/project-console/assets/project-console.js docs/project-console/index.html console/serve.mjs console/web/assets/console.js tools/project-console/validate-project-console-state.mjs tools/project-console/serve-project-console.mjs; do stat -c '%y  %n' "$f"; done
```

| Árbol | Archivo muestreado | mtime al terminar |
|---|---|---|
| `docs/project-console/` (fork `D-035`) | `assets/project-console.js` | **2026-07-10 00:04** |
| `console/` (prototipo `D-048`) | `serve.mjs` | **2026-07-24 14:21** |
| `tools/project-console/` (tooling viejo) | `validate-project-console-state.mjs` | **2026-07-10 00:03** |

Todos anteriores a esta sesión (2026-07-31, tarde). **Ningún cambio cayó en ellos y no hubo que
parar.** Confirmación adicional por huella de árbol: los 265 archivos del repo se compararon
antes/después de la suite y ninguno de esos tres directorios aparece en ningún delta (H.3).

**Archivos tocados en total — diez, y ninguno está en un árbol muerto:**

| Archivo | Líneas al terminar | Qué |
|---|---|---|
| `tools/classification/classification.mjs` | **312** | **NUEVO** — la única implementación |
| `tools/roadmap/roadmap-core.mjs` | 1862 | re-export del vocabulario + `setClassification` |
| `tools/roadmap/roadmap-plan.mjs` | 322 | `set-classification` en `KNOWN_OPS`, despacho y batch |
| `tools/projector/project.mjs` | 1913 | transporte + `validation_summary` + versión 0.11.0 |
| `project-console/assets/project-shell.js` | 539 | importa el módulo y lo entrega al renderer |
| `project-console/assets/project-console.js` | 6779 | vista mínima, chip, bloque de editor, lista |
| `project-console/assets/project-console.css` | 6472 | estilos de los derivados y de la nota |
| `tests/classification-derivation.test.mjs` | **427** | **NUEVO** — 19 tests |
| `tests/classification-transport-and-console.test.mjs` | **615** | **NUEVO** — 26 tests |
| `tests/roadmap-engine.test.mjs` | 283 | **el pin de `KNOWN_OPS`, registrado** (ver H.2) |

`project-console/index.html` **no se tocó**: la lista de pendientes se pinta dentro de
`overview-activity`, que ya existe, y el bloque de clasificación dentro del modal de edición,
que también. Una ranura nueva de marcado habría sido chrome sin necesidad.

---

## BLOQUE B — La especificación, leída VERBATIM

Fuente única: `context/CLASIFICACION-DE-RUNS.md`, §2.1, §2.2 y §3 leídas completas
(`:52-87`). **Nada se reprodujo de memoria ni del ticket.**

### B.1 — LAS DOS TABLAS DE DERIVACIÓN Y LAS TRES COMBINACIONES ILEGALES, VERBATIM

**§2.1 `severity` — tabla `work_type` × `blast_radius`** (`context/CLASIFICACION-DE-RUNS.md:52-67`):

> ### 2.1 `severity` — tabla `work_type` × `blast_radius`
>
> | | `LOCAL` | `ADJACENT` | `SYSTEMIC` | `PROJECT_SHAPE` |
> |---|---|---|---|---|
> | `COSMETIC` | MINOR | MINOR | MODERATE | MODERATE |
> | `FUNCTIONAL` | MODERATE | MODERATE | MAJOR | MAJOR |
> | `FOUNDATIONAL` | MAJOR | MAJOR | CRITICAL | CRITICAL |
>
> Sobre el resultado de esa tabla se aplica **un solo ajuste**, el de
> `failure_surfaces`:
>
> - `LOUD` → **−1**
> - `VISIBLE` → **0**
> - `SILENT` → **+1**
>
> **saturando entre `MINOR` y `CRITICAL`** — el ajuste nunca sale de la escala.

**§2.2 `closure_mode`** (`:69-79`):

> ### 2.2 `closure_mode`
>
> | Entrada | `closure_mode` |
> |---|---|
> | `SPECIFIED` + MINOR / MODERATE | `UNATTENDED` |
> | `SPECIFIED` + MAJOR / CRITICAL | `SEMI_ATTENDED` |
> | `JUDGED_ACCEPTS` | `SEMI_ATTENDED` |
> | `JUDGED_DEFINES` | `ATTENDED` |
>
> **Guarda:** `external_effects` **no vacía → `SEMI_ATTENDED` como mínimo.** La
> guarda sube el modo de cierre; nunca lo baja.

**§3 Las tres combinaciones ILEGALES** (`:81-87`):

> ## 3. Las tres combinaciones ILEGALES
>
> **La consola las RECHAZA:**
>
> - `SPECIFIED` + `FOUNDATIONAL`
> - `FOUNDATIONAL` + `LOUD`
> - `JUDGED_*` + `UNATTENDED`

### B.2 — La derivación implementa EXACTAMENTE lo publicado

**`severity`** — `tools/classification/classification.mjs:81` (`SEVERITY_DERIVATION`, la tabla
como DATO) ejecutada por `:170` (`deriveSeverity`):

1. La celda `work_type` × `blast_radius`, transcrita verbatim en `:85-89`.
2. **UN SOLO ajuste** sobre ese resultado, el de `failure_surfaces` (`LOUD` −1, `VISIBLE` 0,
   `SILENT` +1), como paso con signo a lo largo de `SEVERITIES`.
3. **SATURANDO** entre `MINOR` y `CRITICAL`: `Math.max(0, Math.min(scale.length-1, moved))`
   (`:187`). El ajuste nunca sale de la escala.

**`closure_mode`** — `:107` (`CLOSURE_MODE_DERIVATION`) ejecutada por `:194`:

1. La tabla de §2.2 como `precedence` de cuatro reglas, evaluadas EN ORDEN, primera que aplica
   gana. Las dos filas `SPECIFIED` llevan `severity_in`; las dos `JUDGED_*` no llevan ninguna,
   que es exactamente lo que la tabla publica.
2. **Después**, la guarda de `external_effects`: lista no vacía → `SEMI_ATTENDED` como MÍNIMO,
   implementada como `if (indexOf(token) < indexOf(minimum)) token = minimum` (`:217`).
   **SUBE y nunca baja**, y está declarada como tal en el sobre: `direction: "raise_only"`.

**Tests que lo prueban, con el número de celdas que recorren:**

| Test | Qué recorre | Cifra |
|---|---|---|
| «§2.1: every cell of the work_type × blast_radius table» | las 12 celdas, con `VISIBLE` (ajuste 0) y sin `failure_surfaces` | **12 celdas** |
| «§2.1: the failure_surfaces adjustment moves the result by exactly one step» | 12 celdas × 3 superficies | **36** |
| «§2.1: the adjustment SATURATES…» | los dos extremos + barrido de las 36 contra la escala | 36 |
| «§2.2: the four published rows» | las 4 filas, `JUDGED_*` sobre las 12 celdas | 4 + 24 |
| «§2.2 guard: RAISES to SEMI_ATTENDED as a minimum» | `SPECIFIED`+MINOR con y sin efectos | — |
| «§2.2 guard: it NEVER lowers» | `ATTENDED` con efectos, **y el producto entero comparado con/sin efectos** | **108** |

**El test de que la guarda nunca baja es un barrido, no un caso:** para las 108 combinaciones
compara `deriveClosureMode(run)` con `deriveClosureMode({...run, external_effects:["an effect"]})`
y exige `indexOf(con) >= indexOf(sin)`. **Un `ATTENDED` no se degrada a `SEMI_ATTENDED`.**

### B.3 — `external_effects` ausente y `[]` significan LO MISMO

Implementado en `classification.mjs:155-159` (`readExternalEffects`): la clave ausente devuelve
`[]`. Declarado en el sobre como `guard.absent_input: "empty"`.

Test «B.3: an ABSENT external_effects and an EMPTY external_effects derive identically, across
the whole product»: compara `deriveClassification` de las dos formas sobre **las 108
combinaciones**, `deepEqual` en todas, más el caso que la guarda cambiaría si `[]` contara como
no vacía (`SPECIFIED`+MINOR → `UNATTENDED` en ambas formas).

### B.4 — UN DERIVADO SIN SUS ENTRADAS ESTÁ AUSENTE

**`severity` exige `work_type` y `blast_radius`.** `failure_surfaces` **no es requisito**: es el
ajuste, y ausente simplemente no mueve el resultado (así lo dice B.4 del ticket, que nombra sólo
dos entradas requeridas).

**`closure_mode` exige `correctness_model`** y, **en la rama `SPECIFIED`**, la `severity`. Las
dos ramas `JUDGED_*` no leen severidad y responden sin ella.

**QUÉ DEVUELVE EXACTAMENTE LA IMPLEMENTACIÓN EN EL CASO PARCIAL.** `null`, y sólo `null`.
`deriveClassification(run)` devuelve **siempre** un objeto con las dos claves presentes, cada
una con el token o con `null`. **`null` significa AUSENTE.** No hay default, no hay `""`, no hay
`MINOR`, no se lanza excepción y no se inventa nada:

| Run parcial | `deriveClassification(run)` |
|---|---|
| `{}` | `{ severity: null, closure_mode: null }` |
| `{ work_type: "FUNCTIONAL" }` | `{ severity: null, closure_mode: null }` |
| `{ correctness_model: "SPECIFIED", work_type: "FUNCTIONAL" }` | `{ severity: null, closure_mode: null }` |
| `{ work_type: "FUNCTIONAL", blast_radius: "SYSTEMIC" }` | `{ severity: "MAJOR", closure_mode: null }` |
| `{ correctness_model: "JUDGED_DEFINES" }` | `{ severity: null, closure_mode: "ATTENDED" }` |
| `{ correctness_model: "SPECIFIED", external_effects: ["publishes"] }` | `{ severity: null, closure_mode: null }` — **la guarda sube un modo, y no hay modo que subir** |
| `null` (ni siquiera un run) | `{ severity: null, closure_mode: null }` |

**Decisión adicional, declarada porque el ticket no la enuncia:** un valor **PRESENTE pero FUERA
de vocabulario** también produce AUSENTE. `{work_type:"FUNCIONAL", blast_radius:"LOCAL"}` →
`severity: null`. La razón: la función es TOTAL a propósito (un renderer no puede lanzar sobre un
campo que sólo está mostrando) y **no debe inventar un derivado a partir de una entrada que el
validador rechaza**. Ausente y fuera-de-vocabulario **no se confunden**: `checkInvariants`
(motor) sigue RECHAZANDO el token ilegal y citándolo, así que un valor ilegal no llega a disco
por ninguna ruta de escritura. Test: «B.4: a value OUTSIDE the vocabulary yields no derived
value», que además vuelve a ver al motor rechazar `work_type: "FUNCIONAL"`.

---

## BLOQUE C — UNA sola implementación

### C.1 — Dónde vive, y POR QUÉ ahí

**Módulo nuevo: `tools/classification/classification.mjs` (312 líneas).**

Los dos consumidores son el **emisor** (`tools/projector/project.mjs`, Node) y la **consola**
(`project-console/assets/*`, navegador). Sostener una sola copia exigía un módulo nuevo, porque
ninguna de las casas existentes sirve a los dos:

| Candidato | Por qué NO |
|---|---|
| `tools/roadmap/roadmap-core.mjs` (el motor) | Importa `node:fs`, `node:path`, `node:os` (`:26-28`). **Un navegador no puede cargarlo jamás.** Y además está prohibido por C.2 |
| `tools/projector/project.mjs` (el emisor) | La consola tendría que importar el emisor: cruza la frontera lectura/escritura al revés |
| `project-console/assets/…` (la consola) | El emisor tendría que importar de la carpeta de assets de la consola: la misma inversión, en el otro sentido |

**Lo que hace que el módulo sirva a los dos: NO IMPORTA NADA.** Ni un `node:` builtin, ni DOM, ni
el motor. Es una hoja pura. Y vive bajo la raíz del repo, que `project-console/serve.mjs` ya
sirve entera y cuya tabla MIME ya declara `.mjs` (`serve.mjs:149`) — **el archivo que el emisor
importa de disco es el archivo que el navegador descarga por HTTP, byte a byte.**

| Consumidor | Cómo lo obtiene | `ruta:línea` |
|---|---|---|
| **Emisor** | `import { buildClassificationTaxonomy, unclassifiedLiveRuns }` | `tools/projector/project.mjs:59` |
| **Consola** | `import * as classification` en el shell (módulo ES), entregado al renderer | `project-console/assets/project-shell.js:30` → `:533` |
| **Motor** | **sólo el vocabulario**, importado y re-exportado; **no llama a la derivación** | `roadmap-core.mjs:29` (import) / `:105` (re-export) |

**Por qué la consola lo recibe por INYECCIÓN y no por `import`.** `project-console.js` es un
script CLÁSICO: `index.html:251` lo carga con `defer`, no como módulo, y por tanto **no puede
importar nada**. El shell —que sí es módulo— importa el archivo y se lo pasa por
`setClassificationModel` (`project-console.js:96`), que es exactamente la dirección que el shell
ya conduce con `setActiveProjectBase` y `loadActiveProject`. La suite inyecta **el mismo módulo**
de la misma manera, así que lo que los tests ejercitan es lo que el navegador ejecuta.

**Sin modelo inyectado no hay default.** La vista dice «the derivation table has not been
loaded» y no pinta ningún token; el bloque de editor no se renderiza en absoluto. Una severidad
adivinada sería exactamente la segunda copia que §2 prohíbe. Test:
«F.3: with NO model injected the view says so and still refuses to guess».

**Cuatro tests sostienen la unicidad:**

1. «C.1: there is ONE implementation, and both consumers hold the same module object» —
   `assert.equal(shellClassification.deriveSeverity, classification.deriveSeverity)`: identidad
   de referencia, no igualdad de comportamiento. Y las tablas que el emisor DECLARA son los
   mismos objetos que las funciones EJECUTAN, también por identidad.
2. «C.2 / C.1: the classification module imports NOTHING» — cero `import`, cero `require`, cero
   `node:`, cero DOM, verificado sobre el texto del archivo.
3. «C.1: the BROWSER can fetch the one module, over the same server, at the specifier the shell
   imports» — arranca el `serve.mjs` real en puerto efímero, pide
   `/tools/classification/classification.mjs`, y comprueba **200**, `content-type` JavaScript, y
   que los bytes servidos son idénticos a los del archivo que el emisor importa.
4. El re-export del motor se comprueba por identidad de array (`core.WORK_TYPES === WORK_TYPES`).

### C.2 — La derivación NO vive en el motor, y no hizo falta parar

**NO se concluyó que la derivación deba vivir dentro del motor.** La guarda C.2 no llegó a
disparar, y la razón es la que el encargo 1 ya había dejado preparada: el tercer invariante se
implementa como **test de propiedad** sobre la función (bloque D), no como comprobación de
campos, así que **el motor no necesita la derivación para nada**.

Lo que el motor SÍ ganó es una mutación de escritura (`setClassification`, `roadmap-core.mjs:1195`)
y un **re-export** del vocabulario. Prueba negativa:

```bash
grep -n "deriveSeverity\|deriveClosureMode\|deriveClassification" tools/roadmap/roadmap-core.mjs tools/roadmap/roadmap-plan.mjs
```

→ **salida vacía.** El motor no importa ni llama a ninguna de las tres funciones.

**Sobre mover el vocabulario fuera del motor.** Los cuatro arrays (`CORRECTNESS_MODELS`,
`WORK_TYPES`, `BLAST_RADII`, `FAILURE_SURFACES`) y `CLASSIFICATION_VOCABULARIES` los declaraba
`roadmap-core.mjs`. Se movieron al módulo nuevo y el motor los **re-exporta** (`:105`). Es lo
contrario de meter derivación en el motor: **quita** una duplicación que habría aparecido en
cuanto el navegador necesitara los mismos tokens. El código de los invariantes del encargo 1 no
se tocó —sigue haciendo `for (const [field, vocabulary] of Object.entries(CLASSIFICATION_VOCABULARIES))`
sobre el mismo objeto— y todos sus tests siguen importando desde `roadmap-core.mjs` sin cambios.

### C.3 — EL RESULTADO NO SE ALMACENA NUNCA

Tres comprobaciones, todas de bytes o de claves, no de intención:

1. **Derivar sobre un roadmap entero no añade una clave.** Test «C.3: deriving over a whole
   roadmap adds no key to any run»: recorre el canónico congelado, llama a las cuatro funciones
   sobre cada run, y comprueba run a run que no aparecen `severity` ni `closure_mode`, más
   `JSON.stringify(roadmap) === before` sobre el árbol completo.
2. **Una escritura REAL por el camino del motor no las produce.** Test «C.3: a REAL write through
   the engine adds no severity and no closure_mode to any run»: `planEdit` + `applyPlan` de un
   `set-classification` sobre una copia temporal de la fixture; al releer, **0 de 12 runs** tienen
   ninguna de las dos claves, y exactamente **1** ganó campos de clasificación.
3. **El canónico VIVO de este repo**, medido directamente:

```bash
node -e "const raw=require('fs').readFileSync('roadmap/roadmap.json','utf8');console.log('clave severity en el archivo:',/\"severity\"\s*:/.test(raw));console.log('clave closure_mode en el archivo:',/\"closure_mode\"\s*:/.test(raw))"
```

→ **`false` / `false`**. Y el test «C.3: the LIVE canonical of this repo carries no severity and
no closure_mode, before or after deriving» lo repite tras derivar sobre los 52 runs, y comprueba
además el **roundtrip byte-idéntico** por el serializador del motor.

**Tras ejercitar la vista y el emisor, el canónico no ganó ninguna clave.** Comprobado también
por huella de árbol: correr la suite entera —que ejercita renderer, emisor y motor— deja los 265
archivos del repo con la misma SHA-1 (H.3).

**Y `.project/` tampoco tiene resultado almacenado** (E.2).

---

## BLOQUE D — El tercer invariante, como test de la TABLA

### D.1 — Implementado como PROPIEDAD, no como invariante de campos

`JUDGED_*` + `UNATTENDED` **no es tecleable**: `UNATTENDED` es un valor de `closure_mode`, que es
derivado y que nadie escribe. Así que no se implementó ninguna comprobación de campos
almacenados. Se implementó como **test de propiedad sobre la función de derivación**, recorriendo
el producto COMPLETO de los cuatro campos de vocabulario cerrado, por **ambas formas** de
`external_effects` (vacía y no vacía):

Test «D.1: no entry in the COMPLETE product with a JUDGED_* correctness model ever derives
UNATTENDED». Para cada entrada construye el run con los cuatro campos y la lista, deriva, y
exige `closureMode !== "UNATTENDED"` siempre que `correctness_model` sea `JUDGED_ACCEPTS` o
`JUDGED_DEFINES`.

**Además, el test se protege de ser vacuo:** cuenta las entradas que SÍ derivan `UNATTENDED` y
exige que sean más de cero. Si la tabla dejara de producir `UNATTENDED` en absoluto, la propiedad
pasaría sin significar nada, y el test fallaría en su lugar.

Segundo test, «D.1: the same property holds when the guard list is ABSENT rather than empty»,
recorre las 72 entradas `JUDGED_*` **sin la clave** `external_effects` en absoluto, más las
clasificaciones parciales sobre rama `JUDGED_*`.

### D.2 — EL TAMAÑO REAL DEL PRODUCTO RECORRIDO

**Verificado, no dado por bueno.** El test lo afirma dos veces, una por cálculo y otra por
conteo del bucle:

| Magnitud | Cálculo | **Valor real medido** |
|---|---|---|
| `correctness_model` | — | **3** |
| `work_type` | — | **3** |
| `blast_radius` | — | **4** |
| `failure_surfaces` | — | **3** |
| Producto de los cuatro | 3 × 3 × 4 × 3 | **108** |
| × 2 formas de `external_effects` | 108 × 2 | **216** — entradas realmente recorridas |
| De ellas, con `correctness_model` en `JUDGED_*` | 2/3 de 216 | **144** |
| Entradas que derivan `UNATTENDED` (todas `SPECIFIED`) | — | **> 0**, aseverado |
| Producto adicional del segundo test (guarda AUSENTE, sólo `JUDGED_*`) | 2 × 3 × 4 × 3 | **72** |

**La cifra del ticket queda CONFIRMADA exacta: 108, y 216 con las dos formas.**

**Hallazgo del encargo 1, confirmado y no actuado.** Bajo la tabla vigente la combinación
`JUDGED_*` + `UNATTENDED` es **inalcanzable por construcción**: ninguna fila que empiece por
`JUDGED_*` produce `UNATTENDED`, y la guarda sólo sube. El test lo demuestra sobre el producto
entero en vez de razonarlo. Si es guarda deliberada contra un cambio futuro de la tabla,
redundancia, o errata, **sigue siendo lectura de doctrina y sigue correspondiendo a la cabina** —
este record tampoco lo resuelve. Lo que sí hace es dejar el test que **fallaría** el día que
alguien editara la tabla de forma que la combinación pasara a ser alcanzable.

### D.3 — Los DOS invariantes del encargo 1 siguen rechazando

**No se reescribieron.** Sólo se les añadió regresión, en tres tests:

| Test | Ve RECHAZAR | Ve pasar al vecino legal |
|---|---|---|
| «D.3 regression: SPECIFIED + FOUNDATIONAL is still REJECTED» | la combinación, con el mensaje citándola | `SPECIFIED`+`FUNCTIONAL`; `JUDGED_DEFINES`+`FOUNDATIONAL` |
| «D.3 regression: FOUNDATIONAL + LOUD is still REJECTED» | la combinación | `FOUNDATIONAL`+`VISIBLE`; `FUNCTIONAL`+`LOUD` |
| «D.3 regression: the DERIVED tokens are still refused as stored run keys» | `severity` y `closure_mode` como claves de run | — |

Y el encargo 1 conserva sus 48 tests intactos en `tests/roadmap-classification.test.mjs`, que
sigue pasando entero.

---

## BLOQUE E — Transporte en el sobre

### E.1 — Sigue el precedente de `status`, que el record de medición documenta en B.4

El molde es `COLLECTION_STATUS_RULES`: **la tabla se escribe una sola vez**, una función la
EJECUTA y `buildTaxonomyModel` la DECLARA en el sobre — «Declaration and behaviour cannot drift
apart, because they are the same array» (`project.mjs:786-789`).

**Copiado exacto.** `buildClassificationTaxonomy()` (`classification.mjs:283`) devuelve
`SEVERITY_DERIVATION` y `CLOSURE_MODE_DERIVATION` — **los mismos objetos** que `deriveSeverity` y
`deriveClosureMode` ejecutan — y `buildTaxonomyModel` los mezcla en el sobre
(`project.mjs:1030` para `vocabularies`, `:1050` para `derivations`, `:1056` para
`illegal_combinations`). El test lo comprueba **por identidad de referencia**, no por igualdad de
contenido.

**NO se siguió el molde de `lane`** (que viaja como dato dentro del árbol, `project.mjs:1103`) ni
el de `barrier` (que no declara su vocabulario en absoluto). Ésa es exactamente la brecha que el
record de medición marcó como «la que el `#43` no debe repetir».

### E.2 — EL RESULTADO NO VIAJA

Test «E.2: THE RESULT DOES NOT TRAVEL». **No es vacuo**: primero clasifica un run
(`SPECIFIED`/`FUNCTIONAL`/`SYSTEMIC`/`VISIBLE`, que deriva **MAJOR / SEMI_ATTENDED**), lo escribe
por el motor, y luego emite. Después comprueba:

1. **Ningún run** del `roadmap_tree` transportado lleva clave `severity` ni `closure_mode`.
2. **Ningún token derivado viaja como valor fuera de `taxonomy_model`**: se serializa el snapshot
   con `taxonomy_model` anulado y se exige que no contenga `"MINOR"`, `"MODERATE"`, `"MAJOR"`,
   `"CRITICAL"`, `"UNATTENDED"`, `"SEMI_ATTENDED"` ni `"ATTENDED"`.
3. Dentro de `taxonomy_model` los tokens **sí** aparecen — como declaración de la tabla, que es
   justamente el punto: viaja la tabla, el consumidor deriva.

**El `.project/snapshot.json` de ESTE repo, medido en disco:**

```bash
node -e "const s=require('fs').readFileSync('.project/snapshot.json','utf8');const j=JSON.parse(s);console.log('generated_from:',j.generated_from);console.log('generated_at:',j.generated_at);console.log('validation_summary:',JSON.stringify(j.validation_summary));console.log('clave severity:',/\"severity\"\s*:/.test(s),'| clave closure_mode:',/\"closure_mode\"\s*:/.test(s))"
```

→
```
generated_from: aiw-projector@0.10.0
generated_at: 2026-07-31T23:56:03.051Z
validation_summary: {}
clave severity: false | clave closure_mode: false
```

**No contiene ningún `severity` ni `closure_mode` calculado. Confirmado.**

**AVISO OPERATIVO, y es importante:** ese archivo en disco **lo emitió la versión 0.10.0** y por
tanto **todavía no lleva el bloque de clasificación ni la lista de pendientes**. **No se re-emitió
`.project/` en este encargo**, deliberadamente: re-emitir escribe seis artefactos y no está en el
alcance; la consola ya tiene el botón **«Re-emit .project/»** para eso, y es un acto del operador.
**Es el paso 1 de la QA humana (F.6).** Todas las cifras de transporte de este bloque se midieron
sobre snapshots construidos en memoria y sobre copias temporales, sin escribir en el repo.

### E.3 — Bajo qué clave viaja, con qué forma, y con qué marca de versión

**CLAVE:** `taxonomy_model`, la misma que ya transportaba el vocabulario de `status`. No se creó
ninguna clave nueva de primer nivel en el sobre.

**FORMA** — la misma que las cuatro entradas que ya había:

```json
"vocabularies": {
  "run.correctness_model": { "axis": "run", "stored": true,  "optional": true, "tokens": ["SPECIFIED","JUDGED_ACCEPTS","JUDGED_DEFINES"] },
  "run.work_type":         { "axis": "run", "stored": true,  "optional": true, "tokens": ["COSMETIC","FUNCTIONAL","FOUNDATIONAL"] },
  "run.blast_radius":      { "axis": "run", "stored": true,  "optional": true, "tokens": ["LOCAL","ADJACENT","SYSTEMIC","PROJECT_SHAPE"] },
  "run.failure_surfaces":  { "axis": "run", "stored": true,  "optional": true, "tokens": ["LOUD","VISIBLE","SILENT"] },
  "run.external_effects":  { "axis": "run", "stored": true,  "optional": true, "form": "array_of_non_empty_strings", "empty_by_default": true },
  "run.classified_at":     { "axis": "run", "stored": true,  "optional": true, "form": "iso_8601_utc_instant" },
  "run.severity":          { "axis": "run", "stored": false, "derived_by": "severity_from_work_type_and_blast_radius",             "tokens": ["MINOR","MODERATE","MAJOR","CRITICAL"] },
  "run.closure_mode":      { "axis": "run", "stored": false, "derived_by": "closure_mode_from_correctness_model_and_severity",     "tokens": ["UNATTENDED","SEMI_ATTENDED","ATTENDED"] }
},
"derivations": {
  "severity_from_work_type_and_blast_radius": {
    "applies_to": ["run"], "input": ["run.work_type","run.blast_radius"],
    "scale": ["MINOR","MODERATE","MAJOR","CRITICAL"],
    "table": { "COSMETIC": {...}, "FUNCTIONAL": {...}, "FOUNDATIONAL": {...} },
    "adjustment": { "input": "run.failure_surfaces", "steps": {"LOUD":-1,"VISIBLE":0,"SILENT":1}, "saturating": true, "absent_input": "no_adjustment" },
    "missing_input": "absent"
  },
  "closure_mode_from_correctness_model_and_severity": {
    "applies_to": ["run"], "input": ["run.correctness_model","run.severity"],
    "scale": ["UNATTENDED","SEMI_ATTENDED","ATTENDED"],
    "precedence": [ 4 reglas, primera que aplica gana ],
    "guard": { "input": "run.external_effects", "when": "non_empty", "minimum": "SEMI_ATTENDED", "direction": "raise_only", "absent_input": "empty" },
    "missing_input": "absent"
  }
},
"illegal_combinations": [ 3 entradas, cada una con `enforced_by` ]
```

**Dos añadidos sobre el precedente, ambos exigidos por el contenido y no por gusto:**
`external_effects` y `classified_at` **no tienen vocabulario cerrado que declarar** (§1 no lo
enuncia), así que declaran su **FORMA** en vez de una lista de tokens inventada. Y
`illegal_combinations` viaja como dato con `enforced_by` por entrada, distinguiendo las dos que
el motor rechaza (`stored_field_invariant`) de la tercera, que es propiedad de la tabla
(`derivation_property`).

**MARCA DE VERSIÓN — dos, y son las del precedente, medidas y no inventadas:**

| Marca | Valor | Qué la mueve |
|---|---|---|
| `generated_from` | **`aiw-projector@0.11.0`** (era `0.10.0`) | §6: se mueve con cada cambio de conducta. **Se movió en este encargo**, con su párrafo de motivo en `project.mjs:104-117` |
| `taxonomy_model.model` | el identificador que **el árbol se da a sí mismo** (`roadmap_tree_v1` aquí; `fixture.lanes.v1` en la fixture) | El proyecto, nunca el emisor |

**`taxonomy_model` NO lleva campo de versión propio, y no se le añadió uno**: el precedente que
E.1 declara molde no lo tiene, y añadirlo habría sido desviarse del molde en el mismo párrafo que
ordena copiarlo. Si la cabina quiere una versión por tabla, es una decisión de contrato, no de
este encargo. `[NO VERIFICADO]`: no se midió qué haría un consumidor antiguo con una tabla
versionada por tabla, porque no existe tal consumidor.

**Advertencia medida, heredada del record de medición B.4 y todavía vigente:** el ejecutor de
tablas del shell (`project-shell.js:85-99`) sólo entiende `any` / `all` / `otherwise` sobre un
input, y **una tabla 2-D como la de `severity` no cabe en él**. Por eso la consola **no** ejecuta
la tabla transportada: llama a la misma función que el emisor, que es lo que C.1 exige. El
ejecutor del shell queda intacto y sigue sirviendo a `objective.status` / `phase.status`.

---

## BLOQUE F — La consola: ver, listar y ESCRIBIR

### F.1 — `set-classification`

| Pieza | `ruta:línea` |
|---|---|
| La mutación | `tools/roadmap/roadmap-core.mjs:1195` `setClassification` |
| `KNOWN_OPS` | `tools/roadmap/roadmap-plan.mjs:29` |
| El `case` del despacho | `roadmap-plan.mjs:106` |
| El set batcheable | `roadmap-plan.mjs:193` |
| **`serve.mjs`** | **NO SE TOCÓ** — el servidor valida contra `KNOWN_OPS` importado (`:473`) y relaya `args`; no enumera campos de run |
| Cliente: op batcheable | `project-console.js:6013` `V3_BATCHABLE_OPS` |
| Cliente: recolección del payload | `project-console.js:6221` |
| Cliente: detección de cambio | `project-console.js:6300` |
| Cliente: resumen del preview | `project-console.js:6370` |

**Forma, copiada de `set-lane`/`set-barrier`:** un token → se guarda; `null`/`""` → se borra la
clave ENTERA. Un run sin clasificación no guarda nada, así que «nunca clasificado» y «limpiado»
se leen igual. **Un campo que el llamante no menciona se deja EXACTAMENTE como estaba** — la
operación nunca limpia por omisión.

**Qué refuta y qué deja a otro:**

- **Refuta**, por nombre, un token fuera del vocabulario cerrado, y una `external_effects`
  malformada: los mismos valores que `checkInvariants` rechazaría una etapa después. Test: cinco
  tokens ilegales (`FUNCIONAL`, `functional`, `specified`, `GLOBAL`, `QUIET`), cada uno citado en
  el mensaje, y **el objeto queda byte a byte como estaba**.
- **NO refuta** las combinaciones ilegales de §3: `checkInvariants` es su dueño y corre una etapa
  después. Test end-to-end: `planEdit` con `SPECIFIED`+`FOUNDATIONAL` devuelve `ok:false`
  nombrando la combinación, `serialized` es `null` y **la fixture queda byte-idéntica**.
- **NO deriva nada.** La escritura no puede producir `severity` ni `closure_mode` y no lo intenta.

**Una lista `external_effects` vacía se guarda como AUSENCIA**, no como `[]`: una forma en disco
para un significado, la misma razón por la que un run en el carril por defecto no guarda `lane`.

**Es batcheable** junto a `set-lane`/`set-barrier`/`set-text`/`set-status`. Test: un `batch` de
`set-lane` + `set-classification` en un preview y una escritura.

### F.2 — `classified_at` lo escribe la OPERACIÓN

`roadmap-core.mjs:1268-1277`: si tras la mutación queda algún campo medido almacenado, la
operación escribe `entry.run.classified_at = new Date().toISOString()`. Si se limpió el último,
**borra también la marca** — un `classified_at` sobre un run sin clasificación sería exactamente
esa clase de mentira.

**Forma: idéntica a la que este repo ya emite en `generated_at`** (`project.mjs:1083`,
`opts.now || new Date().toISOString()`), es decir `2026-07-31T10:45:14.552Z`. Test: regex
`/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/` **más** `new Date(mark).toISOString() === mark`.

**NO LO TECLEA EL OPERADOR, y no es una convención sino una imposibilidad de ruta:** el despacho
de `roadmap-plan.mjs:106-119` **no relaya ningún argumento de fecha**. Test dedicado: un
`planEdit` cuyos `args` llevan `classifiedAt`, `classified_at` **y** `now` apuntando a 1999
escribe igualmente el instante del reloj del motor, y se comprueba que lo escrito no empieza por
`1999`. El bloque de editor de la consola tampoco pinta ningún control para él
(`/data-v3edit-classifiedat/` → no aparece).

### F.3 — VISTA MÍNIMA

| Superficie | `ruta:línea` | Qué muestra |
|---|---|---|
| **Sección de clasificación del drawer** | `project-console.js:4294` `v3ClassificationSection`, montada en `:4530` | los **seis** almacenados y los **dos** derivados |
| **Chip de severidad en la fila** | `project-console.js:3409`, dentro de `v3RunRowTags` | la severidad derivada, sólo si existe |
| **Bloque de editor** | `project-console.js:5583` `v3RenderClassificationBlock`, concatenado en `:5462` | los cuatro selects + la lista de guarda |
| Estilos | `project-console.css:6324-6472` | el bloque derivado va cercado y punteado |

**Los derivados están marcados VISIBLEMENTE como derivados y no editables**, por tres vías a la
vez:

1. Viven en su propio bloque, bajo el encabezado literal **«Derived — computed at read time,
   never stored, not editable»**.
2. Cada fila derivada lleva su propia marca `derived` (`.v3-derived-mark`), con `title` que nombra
   la tabla de la que sale el valor.
3. **La sección no pinta ni un `<input>`, ni un `<select>`, ni un `<textarea>`** — aseverado por
   test: `assert.equal(/<input|<select|<textarea/.test(html), false)`.

**Un run SIN CLASIFICAR se ve como sin clasificar.** Lee «**Not classified yet** — this run
carries none of the six stored classification fields, so it has no severity and no closure mode.
Open the editor to classify it.» **No se ve como vacío** (la sección existe y nombra el estado) y
**no se ve como `MINOR`**: el test recorre los siete tokens derivados y exige que **ninguno**
aparezca en el HTML de un run sin clasificar.

**Un run PARCIALMENTE clasificado** muestra lo que tiene y nombra **qué entrada le falta** a cada
derivado ausente: «absent — needs blast radius», «absent — needs correctness model». La ausencia
queda accionable en vez de misteriosa.

### F.4 — LISTAR SIN RECHAZAR

**La ranura era `validation_summary: {}`.** El record la sitúa en `project.mjs:1160`;
**verificado: era exactamente `:1160`** antes de este encargo. Hoy, tras los añadidos de este
encargo por encima de ella, la ranura ocupa `project.mjs:1218-1234`. (La otra aparición,
`:662`, es el modo 1 `aiw_objectives` y **no se tocó**: la clasificación es del árbol de roadmap.)

**Regla de «sin clasificar»:** `classified_at` ausente. No es invención — es lo que el propio
`full_description` del `#43` declara: «An absent `classified_at` is exactly the console's to-do
list». Implementada en `classification.mjs:230` (`isClassified`) y `:251` (`unclassifiedLiveRuns`).

**Los `completed` NO entran** (§6: un run cerrado no se vuelve a ejecutar y clasificarlo es
arqueología). Los status terminales se le pasan DESDE FUERA (`project.mjs:803`
`TERMINAL_RUN_STATUSES`), de modo que el módulo de clasificación no conoce ningún token de status
por su nombre.

**CUÁNTOS VIVOS SIN CLASIFICAR LISTA HOY EN ESTE REPO:**

```bash
node -e "import('./tools/projector/project.mjs').then(p=>{const s=p.buildRoadmapTreeSnapshot('.',{now:'2026-07-31T00:00:00.000Z'});const r=s.validation_summary.reports[0];console.log('total live unclassified:',r.total);console.log(r.runs.map(x=>'  #'+x.queue_order+' '+x.status.padEnd(8)+' '+x.run_id).join('\n'))})"
```

→ **10**, y son estos:

| # | status | `run_id` |
|---|---|---|
| 43 | **active** | `RUN-CONSOLE-RUN-CLASSIFICATION-FIELDS-001` |
| 44 | planned | `RUN-CONSOLE-CLASSIFICATION-PILOT-001` |
| 45 | planned | `RUN-CONSOLE-DIGEST-CABINA-001` |
| 46 | planned | `RUN-CONSOLE-PARIDAD-RENDER-CANTU-001` |
| 47 | planned | `RUN-CONSOLE-UI-UX-001` |
| 48 | planned | `RUN-CONSOLE-CANTU-CANONICAL-OUT-OF-AIW-001` |
| 49 | planned | `RUN-CONSOLE-CORTE-RETIRO-LOCAL-001` |
| 50 | planned | `RUN-CONSOLE-STALE-TEXTS-REPAIR-001` |
| 51 | planned | `RUN-CANTU-ROADMAP-PHASE-OBJECTIVE-OPS-001` |
| 52 | planned | `RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001` |

**La cifra del ticket queda CONFIRMADA exacta: 10 de 10 vivos, el 100 %.** De los 52 runs, los 42
terminales quedan fuera. **Nada se escribió** para medir esto: el snapshot se construyó en memoria.

**Dónde lo ve el operador:** `project-console.js:3777` `v3UnclassifiedNoteHtml`, pintado dentro
de `overview-activity` bajo la rejilla «Queue snapshot» de la pestaña **Overview**. La lista **no
se deriva en el renderer**: se LEE de `validation_summary.reports`, que el emisor rellena desde el
canónico. Una sola definición de «quién está sin clasificar», en la herramienta que posee el
roadmap.

### F.5 — La lista es INFORMACIÓN, NO ERROR

Verificado por cinco aserciones, no por intención:

| Qué NO hace | Cómo se comprobó |
|---|---|
| No abre canal de errores | `assert.equal("errors" in snapshot.validation_summary, false)` |
| No es un blocker | `assert.deepEqual(snapshot.blockers, [])` con 10 sin clasificar |
| No degrada el status del proyecto | `operational_status` sigue `active` |
| No impide guardar | `planEdit` de un `set-text` sobre un roadmap 100 % sin clasificar → `ok: true`; y `checkInvariants` de ese roadmap → **0 errores** |
| No incrementa el contador de fallos de carga de la consola | test «F.5: rendering the list touches no failure counter»: `failedSources.length` idéntico antes y después de `renderOverviewV3` |

Y la propia superficie lo dice en palabras: «This is information, not an error: nothing is blocked
and nothing is refused.» Con la lista vacía, o con un snapshot antiguo sin el informe, **no se
pinta nada**: «0 runs sin clasificar» no es noticia.

### F.6 — QA HUMANA: qué debe mirar el operador

1. **Refrescar la proyección primero.** Arrancar la consola (`start-console.cmd`), abrir
   `aiw-console`, pestaña **Roadmap**, y pulsar **«Re-emit .project/»**. Sin esto el
   `.project/snapshot.json` de disco sigue siendo el de la versión 0.10.0 y los pasos 2 y 5 no
   mostrarán nada nuevo. El acuse debe decir `aiw-projector@0.11.0`.
2. **Overview → bajo la rejilla «Queue snapshot»**: debe aparecer la nota **«Unclassified live
   runs 10»** con diez botones, `#43` … `#52`, en orden de cola. Comprobar que **no es roja**, que
   no hay icono de alarma, y que nada más de la pantalla cambió.
3. **Un run SIN CLASIFICAR — abrir `#45` (`RUN-CONSOLE-DIGEST-CABINA-001`)** desde esa misma
   nota. En el drawer, sección **Classification**: debe leerse **«Not classified yet»** y el
   contador de la sección debe ser **0**. **No debe aparecer `MINOR` ni ningún otro token en
   ninguna parte del drawer.** En la fila del run (Run Queue o Roadmap) **no debe haber chip de
   severidad**.
4. **Clasificar un run — en ese mismo `#45`, botón de edición → bloque «Classification»**: cuatro
   desplegables, los cuatro abiertos en «(not classified)». Elegir `SPECIFIED` / `FUNCTIONAL` /
   `SYSTEMIC` / `VISIBLE`. La nota al pie del bloque debe actualizarse al reabrir el modal y decir
   `severity MAJOR · closure mode SEMI_ATTENDED`. **No debe existir ningún control para severity,
   para closure mode ni para `classified_at`.** Pulsar **«Preview all changes»**: el preview debe
   listar los campos cambiados **y** dos filas `severity (derived)` y `closure_mode (derived)`, y
   una fila `classified_at` que diga «written by the engine». Confirmar.
5. **Un run CLASIFICADO — reabrir `#45`.** La sección Classification debe mostrar los cinco
   valores almacenados más `classified_at` con forma `2026-…T…Z`, y debajo el bloque cercado
   **«Derived — computed at read time, never stored, not editable»** con `MAJOR` y
   `SEMI_ATTENDED`, cada uno con su marca `derived`. La fila del run debe llevar ahora el **chip
   `MAJOR`** en ámbar. **Volver a Overview: la nota debe decir 9, no 10.**
6. **La prueba de que nada se almacenó** — con la consola abierta, en una terminal:
   `node -e "const s=require('fs').readFileSync('roadmap/roadmap.json','utf8');console.log(/\"severity\"/.test(s),/\"closure_mode\"/.test(s))"` → debe imprimir **`false false`**.

---

## BLOQUE G — La medición que decide el encargo 3

**`care_budget` NO SE IMPLEMENTÓ EN NINGUNA FORMA.** Sólo se midió. No hay una sola línea sobre
él en ningún archivo tocado, y el test del encargo 1 que comprueba que **sigue siendo rechazado
como clave de run** sigue pasando.

### G.1 — Cuántas rutas de escritura tiene HOY la consola: **TRES**, y siguen cerradas

```bash
grep -n "ROADMAP_EDIT_SUFFIX\|HISTORY_SYNC_SUFFIX\|PROJECT_EMIT_SUFFIX" project-console/serve.mjs
```

| # | Ruta | Constante | Despacho | Handler | Qué escribe |
|---|---|---|---|---|---|
| 1 | `__project-console/roadmap/edit` | `serve.mjs:124` | `:247` | `:418` `handleRoadmapEdit` | **el canónico del roadmap**, vía `planEdit`/`applyPlan` |
| 2 | `__project-console/history/sync` | `:125` | `:248` | `:580` `handleHistorySync` | `.project/git_history.json` |
| 3 | `__project-console/project/emit` | `:126` | `:249` | `:742` `handleProjectEmit` | los seis artefactos de `.project/` |

**El record de medición cuenta tres y las declara cerradas: VERIFICADO, y siguen siendo tres.**
Este encargo **no añadió ninguna**: `set-classification` viaja por la ruta 1 sin tocar
`serve.mjs`, exactamente como el record predijo («una op nueva del motor viaja por `serve.mjs`
sin modificarlo»). `serve.mjs` sigue con sus 981 líneas originales.

### G.2 — ¿Una configuración de PROYECTO es una CUARTA ruta?

**NO, siempre que `care_budget` viva en la RAÍZ del canónico del roadmap. Y no es
`set-classification` quien lo sostiene: es `declare-lanes`.**

El razonamiento, con archivos y líneas:

- La ruta 1 **no enumera nada**. Valida la op contra `KNOWN_OPS` importado (`serve.mjs:473-474`)
  y relaya `args` a `planEdit`. **Cualquier op nueva viaja por ella con cero cambios en
  `serve.mjs`** — de run o de raíz, da igual.
- **`set-classification` NO generaliza**, y hay que decirlo: es por RUN. Toma `--run` y llama a
  `findRunEntry` (`roadmap-core.mjs:1201`). Una configuración de proyecto no tiene run al que
  apuntar.
- **El precedente correcto ya existe y es de RAÍZ: `declare-lanes`.** Escribe `root.lanes` —una
  **vocabulario POR PROYECTO**, no por run— por la misma ruta 1:
  `roadmap-plan.mjs:29` (`KNOWN_OPS`) → `:121` (`case`) → `roadmap-core.mjs:1323` (`declareLanes`).
  El campo vive en `ROOT_ALLOWED_FIELDS` (`roadmap-core.mjs:46`) y en `CANONICAL_ROOT_KEY_ORDER`
  (`:52`). **Eso es exactamente la forma que `care_budget` necesita.**
- **`declare-lanes` es deliberadamente NO batcheable** (`roadmap-plan.mjs:193`, y el comentario de
  `:170-172` explica por qué: un cambio de vocabulario de raíz no es una edición por run).
  `care_budget` heredaría esa misma decisión.

**Hallazgo que la cabina necesita saber antes de escribir el ticket del encargo 3:**

```bash
grep -rn "declare-lanes" project-console/
```

→ **salida vacía.** **`declare-lanes` NO tiene ninguna superficie de consola.** Existe sólo en el
motor; un carril se declara hoy por CLI o por script, nunca desde la consola. Es decir: el
precedente de raíz cubre el **motor, el transporte y la ruta HTTP**, pero **NO cubre la mitad de
la consola**, y la especificación §5 dice explícitamente «editable desde la consola». **Ése es el
trabajo realmente nuevo del encargo 3**, y no es la ruta de escritura.

### G.3 — Tamaño estimado, en archivos tocados

**Escenario A — `care_budget` en la raíz del canónico (recomendado, el camino de `declare-lanes`): NO es cuarta ruta. 5 archivos.**

| Archivo | Qué | Tamaño |
|---|---|---|
| `tools/roadmap/roadmap-core.mjs` | `ROOT_ALLOWED_FIELDS` (`:46`), `CANONICAL_ROOT_KEY_ORDER` (`:52`), un invariante de forma en `checkInvariants`, y la mutación `setCareBudget` junto a `declareLanes` (`:1323`) | ~80 líneas |
| `tools/roadmap/roadmap-plan.mjs` | `KNOWN_OPS` (`:29`) + un `case` (junto a `:121`); **no** batcheable | ~15 líneas |
| `tools/projector/project.mjs` | **transporte, y sí hace falta** (ver abajo): `roadmapTreeBlock` (`:1103`, donde ya viaja `tree.lanes`) o una entrada de `taxonomy_model`; + subir la versión (`:118`) | ~15 líneas |
| `project-console/assets/project-console.js` | **el grueso**: una superficie de edición de configuración de PROYECTO, que hoy no existe para ningún campo de raíz | ~150-250 líneas |
| `project-console/index.html` | una ranura de marcado, tipo la del selector de carril (`:101`) | ~5 líneas |
| `project-console/serve.mjs` | **CERO** | — |
| Tests | un archivo nuevo | ~200 líneas |

**¿Tendría que transportarlo el emisor? SÍ, y no es opcional.** La consola **nunca lee el
canónico**: lee `.project/` (`project-console.js:13-17`, `PATHS.snapshot` y `PATHS.roadmapV3`).
Un `care_budget` que no viaje es un `care_budget` que la consola no puede mostrar. El precedente
es literal: `root.lanes` viaja en `roadmapTreeBlock` (`project.mjs:1103`) y el renderer lo lee de
ahí (`project-console.js:3078`, `Array.isArray(roadmap.lanes)`).

**Escenario B — `care_budget` en cualquier otro sitio** (`projects.config.json`, `.aiw/`, un
archivo propio): **SÍ es una cuarta ruta**, porque las tres existentes escriben el canónico,
`git_history.json` y `.project/`, y ninguna escribe otra cosa. Costaría además: una constante en
`serve.mjs:124-126`, un despacho en `:247-249`, un handler nuevo (~150 líneas, del tamaño de
`handleHistorySync`), una entrada en la matriz de sólo-lectura que la suite verifica, y la guarda
de frontera. **~7 archivos y una superficie de seguridad nueva que auditar.**

**Recomendación medida, no impresión:** escenario A. `care_budget` es del proyecto igual que
`lanes` es del proyecto, el canónico ya aloja un campo de raíz por proyecto, y el ahorro no es
sólo de líneas sino de **una superficie de escritura HTTP que no habría que auditar**.

`[NO VERIFICADO]` — no se midió qué haría `cantu-studio` con un `care_budget` de raíz: leer o
escribir en ese repo está fuera del alcance de este encargo, y su `schema_version` distinto sigue
siendo el obstáculo que el `full_description` del `#43` registra sin resolver.

---

## BLOQUE H — Suite y árbol

### H.1 — Línea base y total nuevo

```bash
npm test
```

| Momento | Tests | Pasan | Fallan |
|---|---|---|---|
| **Línea base** (antes de tocar nada) | **373** | **373** | **0** |
| **Al terminar** | **418** | **418** | **0** |

**La línea base del ticket queda CONFIRMADA exacta: 373 / 373 / 0.** Delta: **+45**, que son los
**19** de `tests/classification-derivation.test.mjs` y los **26** de
`tests/classification-transport-and-console.test.mjs`. **0 fallos.**

Cobertura de los tests nuevos, contra lo que H.1 pide:

| Pedido | Test |
|---|---|
| La tabla de severidad completa | «every cell…» (12 celdas) + «the adjustment moves…» (36) |
| **Incluida la saturación** | «the adjustment SATURATES…», los dos extremos y las 36 contra la escala |
| La guarda de `external_effects` **en las dos direcciones** | «RAISES to SEMI_ATTENDED as a minimum» y «it NEVER lowers» (barrido de 108) |
| La derivación ausente de B.4 | tres tests, incluido «THE PARTIAL CASE, exactly as the implementation returns it» |
| El transporte | «the envelope carries the vocabulary and BOTH derivation tables», «the version marks», «THE RESULT DOES NOT TRAVEL» |
| La operación de escritura | seis tests, del vocabulario refutado al `classified_at` automático |
| La lista | cuatro tests, emisor y consola, incluida la no-contabilización de errores |
| (Añadido) La unicidad de la implementación | tres tests, incluido el fetch real por HTTP |

### H.2 — UN test PREEXISTENTE cambió de resultado. **Lo reporto aquí.**

**`tests/roadmap-engine.test.mjs:263`** — «the op vocabulary is the transplanted one plus the
three lane ops (D-051)». Es un **pin `deepEqual` sobre `KNOWN_OPS`**, y falló en cuanto
`set-classification` entró en la lista, que es lo que **F.1 ordena explícitamente**.

**No lo arreglé por parecido, y no lo debilité.** Lo que hice fue lo que **el propio comentario
del test manda hacer**, verbatim de `:270-271`:

> «The pin stays a pin: any further drift from this list is a decision to register, not an
> accident to absorb.»

Ésta es una **decisión registrada**, no un accidente: la cabina la ordena en F.1 del ticket. Así
que registré `set-classification` en el literal del pin, en su sitio (junto a `set-lane` y
`set-barrier`, que es donde pertenece por naturaleza), y añadí al comentario el párrafo que dice
**por qué** entra —la misma razón por la que entró `set-barrier`: la clave validaba pero sólo
podía rellenarse editando el JSON a mano—. **El pin sigue siendo un `deepEqual` estricto sobre la
lista completa**, y sigue siendo capaz de atrapar la siguiente deriva.

**Es el único test preexistente que cambió de resultado.** Los otros 372 pasaron sin tocarlos, y
los 48 del encargo 1 siguen intactos y verdes.

**Si la cabina considera que esto debía haber parado el encargo, lo señalo explícitamente:** F.1
y H.2 se contradicen en este punto concreto, porque F.1 exige el cambio que necesariamente rompe
ese pin. Parar habría dejado F.1 inejecutable y el run 44 sin construir. La decisión tomada es
reversible en un `git checkout` de un archivo.

### H.3 — ¿Correr la suite deja el árbol modificado? **NO.**

**Medido, no inferido, y sin usar git en ninguna forma.** Huella SHA-1 + tamaño + mtime de cada
archivo del árbol (excluyendo `.git/` y `node_modules/`), antes y después de `npm test`:

| Medición | Archivos | Añadidos | Eliminados | Contenido cambiado | Solo mtime |
|---|---|---|---|---|---|
| Suite final (418) | **265** | **0** | **0** | **0** | **0** |

La suite **no toca ni una marca de tiempo**: escribe en `tmpdir()` y lee fixtures congeladas. Los
45 tests nuevos mantienen esa disciplina — los que escriben lo hacen sobre copias con
`mkdtempSync`+`cpSync` y las borran en `finally`; el que arranca el servidor real lo hace en
puerto efímero y lo cierra. Comprobado además que la fixture `tests/fixtures/lanes` conserva su
SHA-1 (`4c468c03afc3b881de915ec3f62873f0a0459331`) tras la suite entera.

---

## BLOQUE I — Lo que la cabina necesita para la guarda de cierre

### I.1 — El one-liner READ-ONLY, verbatim, listo para PowerShell

Es el que el encargo 1 propuso como sustituto del contador `history` muerto (que no se imprime,
vive en un árbol muerto, y mediría lo que no es). **Verificado ejecutándolo en PowerShell**, no
sólo en bash:

```bash
node -e "import('./tools/roadmap/roadmap-core.mjs').then(c=>{const raw=c.loadRaw('roadmap/roadmap.json');const o=c.parseRoadmap(raw);const e=c.checkInvariants(o,{externalRunIds:null});const r=c.globalOrdered(o);const by=r.reduce((a,x)=>(a[x.status]=(a[x.status]||0)+1,a),{});console.log('invariantes:',e.length?'FAIL\n'+e.join('\n'):'PASS (0 errores)');console.log('runs:',r.length,JSON.stringify(by));console.log('terminales:',r.filter(x=>c.TERMINAL_STATUSES.includes(x.status)).length);console.log('roundtrip byte-identico:',c.serialize(o,c.detectEol(raw))===raw)})"
```

**Se pega tal cual en PowerShell** desde la raíz de `aiw-console`: todas las comillas internas son
simples, no hay `$` ni backtick, así que PowerShell no interpreta nada. **QUÉ IMPRIME HOY,
2026-07-31, con el encargo 2 terminado:**

```
invariantes: PASS (0 errores)
runs: 52 {"completed":42,"active":1,"planned":9}
terminales: 42
roundtrip byte-identico: true
```

**Es puramente de lectura:** no escribe, no re-emite `.project/`, no toca git. (Recordatorio del
encargo 1, todavía vigente: `node tools/projector/project.mjs` **NO** es un validador — **escribe**
`.project/`.)

**El segundo comando de la guarda de cierre, el específico del `#43`** — el agregado no distingue
un cierre nuevo de los 42 viejos, así que la prueba de que **este** cierre entró es nominal:

```bash
node -e "import('./tools/roadmap/roadmap-core.mjs').then(c=>{const o=c.parseRoadmap(c.loadRaw('roadmap/roadmap.json'));const r=c.globalOrdered(o).find(x=>x.run_id==='RUN-CONSOLE-RUN-CLASSIFICATION-FIELDS-001');console.log(r.run_id,r.status,JSON.stringify(r.closeout_result||null))})"
```

→ ahora mismo: **`RUN-CONSOLE-RUN-CLASSIFICATION-FIELDS-001 active null`**.
Tras el cierre debe decir `completed` con un `closeout_result` no nulo. Y el primer comando debe
pasar de `{"completed":42,"active":1,"planned":9}` / `terminales: 42` a `completed` **43** /
`active` **0** / `terminales` **43**.

**Tercer comando, nuevo de este encargo, para la guarda de cierre del encargo 3** — cuántos runs
vivos siguen sin clasificar, en una línea y sin escribir nada:

```bash
node -e "import('./tools/projector/project.mjs').then(p=>{const r=p.buildRoadmapTreeSnapshot('.',{now:'1970-01-01T00:00:00.000Z'}).validation_summary.reports[0];console.log('vivos sin clasificar:',r.total,'de',r.runs.length+' listados');console.log(r.runs.map(x=>'#'+x.queue_order+' '+x.run_id).join('\n'))})"
```

→ hoy: **`vivos sin clasificar: 10 de 10 listados`**. Ésa es la cifra que el run 44 —el piloto—
tiene que mover a **0**. Es de lectura: construye el snapshot en memoria y **no escribe
`.project/`**.

---

## BLOQUE J — Veredicto

### J.1 — Qué no fue ejecutable como estaba escrito, y qué hubo que interpretar

**Contradicción entre dos cláusulas del propio ticket (resuelta, y señalada):**

1. **F.1 contra H.2.** F.1 ordena meter `set-classification` en `KNOWN_OPS`; H.2 ordena PARAR si
   un test preexistente cambia de resultado. El pin de `KNOWN_OPS` cambia de resultado **por
   construcción** al obedecer F.1. Se resolvió por la regla que **el propio test enuncia** («a
   decision to register, not an accident to absorb») y se reporta entero en H.2. Parar habría
   dejado F.1 inejecutable y el run 44 sin construir.

**Impreciso en el ticket (corregido sin parar):**

2. **F.4, el número de línea.** El ticket dice `project.mjs:1160` «según el record — verifica la
   línea». **Verificado: era exacto** antes de tocar nada. Tras este encargo la ranura vive en
   `:1218-1234`, porque los añadidos de transporte quedaron por encima. El puntero del ticket era
   correcto; queda actualizado aquí.

**Interpretado, y declarado aquí porque ni el ticket ni la especificación lo dicen:**

3. **Qué hace la derivación con un valor PRESENTE pero fuera de vocabulario.** El ticket sólo
   legisla el caso AUSENTE (B.4). Se implementó **también AUSENTE** (`null`), con la razón escrita
   en el código y en B.4 de este record: la función es total a propósito, y no debe inventar un
   derivado desde una entrada que el validador rechaza. La alternativa —derivar igual— habría
   pintado una severidad calculada desde un archivo inválido.
4. **`failure_surfaces` ausente no impide la severidad.** B.4 del ticket nombra sólo `work_type` y
   `blast_radius` como entradas requeridas de `severity`, y §2.1 llama a `failure_surfaces`
   «ajuste», no entrada. Se implementó: ausente → sin ajuste, la celda base se mantiene.
5. **La regla de «sin clasificar» para la lista.** El ticket no la define. Se tomó
   **`classified_at` ausente**, que es lo que el `full_description` del propio `#43` declara. Hoy
   coincide exactamente con «ninguno de los seis campos presente» (10 = 10), pero **no son la
   misma regla** para un run a medio clasificar, y el informe distingue los dos casos publicando
   `stored_fields` por entrada.
6. **Dónde ve el operador la lista.** F.4 fija el CANAL (`validation_summary`) pero no la
   pantalla. Se eligió Overview, bajo la rejilla «Queue snapshot», por ser el sitio donde la
   consola ya resume el estado y donde una nota no compite con ninguna acción.
7. **`.project/` NO se re-emitió.** El ticket no lo pide y re-emitir escribe seis artefactos. La
   consecuencia operativa está declarada en E.2 y es el paso 1 de la QA (F.6): el snapshot de
   disco sigue siendo de la versión 0.10.0 hasta que el operador pulse «Re-emit .project/».
8. **`taxonomy_model` sigue sin campo de versión propio.** E.1 manda copiar el precedente de
   `status`, y ese precedente no lo tiene; añadirlo habría sido desviarse del molde en el mismo
   párrafo que ordena copiarlo. Las dos marcas reales están medidas en E.3.
9. **El vocabulario se movió del motor al módulo nuevo** (con re-export). No es «reescribir los
   invariantes del encargo 1» —su código no se tocó y sus 48 tests siguen verdes— pero **sí es
   tocar un archivo del encargo 1**, y se declara aquí por si la cabina lo lee de otro modo.

### J.2 — Qué queda para el encargo 3, nombrado por archivo

| Archivo | Qué falta |
|---|---|
| `tools/roadmap/roadmap-core.mjs` | `care_budget` en `ROOT_ALLOWED_FIELDS` (`:46`) y `CANONICAL_ROOT_KEY_ORDER` (`:52`), un invariante de forma, y la mutación junto a `declareLanes` (`:1323`). **Escenario A de G.3.** |
| `tools/roadmap/roadmap-plan.mjs` | la op en `KNOWN_OPS` (`:29`) y su `case` (junto a `:121`). **NO batcheable**, por la misma razón que `declare-lanes` no lo es (`:170-172`) |
| `tools/projector/project.mjs` | transportarlo — sin transporte la consola no puede mostrarlo (`roadmapTreeBlock:1103` es el precedente literal) — y subir la versión (`:118`) |
| `project-console/assets/project-console.js` | **el grueso del encargo 3**: una superficie de edición de configuración de PROYECTO. **Hoy NO EXISTE NINGUNA**: `declare-lanes` nunca la tuvo (`grep -rn "declare-lanes" project-console/` → vacío), y §5 exige «editable desde la consola» |
| `project-console/index.html` | la ranura de marcado, tipo la del selector de carril (`:101`) |
| `context/CLASIFICACION-DE-RUNS.md` | **No es código, pero sigue bloqueando:** §7 declara pendientes las **tres reglas mecánicas para runs mixtos**, no localizadas en disco. **Siguen sin estar** — este encargo tampoco las tocó |
| — | **La duda de doctrina de D.2**, heredada del encargo 1 y ahora demostrada sobre el producto entero: `JUDGED_*` + `UNATTENDED` es inalcanzable bajo la tabla vigente. Guarda deliberada, redundancia o errata: **es de la cabina** |

**Y fuera de los tres encargos:** el run **44** (`RUN-CONSOLE-CLASSIFICATION-PILOT-001`) es el que
clasifica los diez runs vivos. **Con este encargo ya es ejecutable**: la operación de escritura
existe, la consola la ofrece, y la lista dice cuáles faltan.

---

## Lo que este record NO hace

- **No cierra el run.** El `#43` queda `active`. No se cambió el status de ningún run, ni se
  insertó, movió o renumeró nada.
- **No clasifica ningún run.** Este encargo construye la maquinaria; el 44 la usa. El canónico
  sigue con **0** runs clasificados.
- **No almacena `severity` ni `closure_mode` en ningún sitio** — ni en el canónico, ni en
  `.project/`, ni en caché en disco. Demostrado en C.3 y E.2.
- **No implementa `care_budget` en ninguna forma.** Sólo lo mide (bloque G).
- **No reescribe los invariantes del encargo 1.** Sólo les añade regresión (D.3).
- **No mueve la derivación al motor** (C.2), y el motor no llama a ninguna de sus tres funciones.
- **No re-emite `.project/`** y no ejecuta el proyector como escritura.
- **No usa git en ninguna forma**: ni commit, ni push, ni lectura de historia. Las comprobaciones
  de árbol de A.3 y H.3 se hicieron por huella SHA-1 + tamaño + mtime.
- **No escribe un byte en `aiw` ni en `cantu-studio`**, ni los lee.
- **No toca los tres árboles de consola muertos**, y lo demuestra por medición (A.3).
- **No reescribe ningún record existente**, incluidos `MEDICION-SUPERFICIES-CLASIFICACION.md` y
  `CLASIFICACION-MOTOR.md`: los cita.
