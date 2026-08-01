# CLASIFICACIÓN — `care_budget`: configuración POR PROYECTO, editable desde la consola

> **Encargo 3 de 3, el último**, del run `RUN-CONSOLE-RUN-CLASSIFICATION-FIELDS-001`
> (`queue_order` 43). El encargo 1 (`CLASIFICACION-MOTOR.md`) metió los seis campos ALMACENADOS
> en el motor; el encargo 2 (`CLASIFICACION-EMISOR-Y-CONSOLA.md`) puso la derivación, el
> transporte, la vista, la lista y la escritura por run. Éste pone **la configuración del
> PROYECTO**: la clave de raíz, su operación de escritura, su transporte y **la primera
> superficie de consola que edita algo que no es un run**.
>
> **EL RUN NO SE CIERRA AQUÍ.** Queda `active`. Lo cierra el operador desde la consola.
>
> Cada cifra de este record lleva el comando que la produjo. Lo no medido va marcado
> `[NO VERIFICADO]`.

---

## BLOQUE A — Guardas

### A.1 — El árbol al empezar, por huella de contenido y SIN git

Herramienta: un script de huella (SHA-1 + tamaño + mtime por archivo, excluyendo `.git/` y
`node_modules/`) ejecutado en el directorio temporal de la sesión, **nunca dentro del repo**.

```bash
node <scratchpad>/fingerprint.mjs . base-inicio.json
```

→ **267 archivos.** Los siete más recientes, todos posteriores al cierre del encargo 2
(`CLASIFICACION-EMISOR-Y-CONSOLA.md`, mtime `2026-08-01T00:45:13Z`):

| mtime (UTC) | Archivo |
|---|---|
| `2026-08-01T02:50:01.142Z` | `roadmap/roadmap.json` |
| `2026-08-01T02:49:51.572Z` | `.project/snapshot.json` |
| `2026-08-01T02:49:51.568Z` | `.project/git_history.json` |
| `2026-08-01T02:49:51.450Z` | `.project/roadmap.json` |
| `2026-08-01T02:49:51.448Z` | `.project/docs_index.json` |
| `2026-08-01T02:49:51.420Z` | `.project/no_claims.json` |
| `2026-08-01T02:49:51.418Z` | `.project/guardrails.json` |

**Qué son: el paso 1 de la QA humana del encargo 2, ejecutado por el operador.** Los seis
artefactos de `.project/` fueron re-emitidos y el acuse quedó en el propio archivo:

```bash
node -e "const j=require('fs').readFileSync('.project/snapshot.json','utf8');const s=JSON.parse(j);console.log(s.generated_from, s.generated_at, s.validation_summary.reports[0].total)"
```

→ `aiw-projector@0.11.0 2026-08-01T02:49:51.415Z 10` — exactamente lo que la QA del encargo 2
pedía ver. **No es un cambio a medio hacer y no es mío.**

**La comprobación de coherencia, que es la que importa y no usa git.** Se reconstruyeron los
cinco artefactos derivables **en memoria** y se compararon con los de disco:

| Artefacto | ¿Coincide con el canónico? |
|---|---|
| `.project/snapshot.json` | **SÍ** (única diferencia: `sources[0].mtime`, ver abajo) |
| `.project/roadmap.json` | **SÍ** (misma única diferencia) |
| `.project/docs_index.json` | **SÍ**, idéntico |
| `.project/guardrails.json` | **SÍ**, idéntico |
| `.project/no_claims.json` | **SÍ**, idéntico |

La única discrepancia es que el snapshot registró `sources[0].mtime` = `02:49:51.412Z` y el
canónico lleva hoy `02:50:01.142Z`: **el canónico fue reescrito 10 segundos DESPUÉS de la
emisión, con un contenido que produce artefactos idénticos.** Es decir: los bytes se movieron,
el contenido no. **Qué se movió está medido en G.2 y es un cambio de fin de línea LF → CRLF.**

**VEREDICTO A.1: el árbol estaba coherente y no había trabajo de nadie a medias. Se continuó.**
`[NO VERIFICADO]` — «sin commitear» no es comprobable sin git, que este encargo tiene prohibido
en cualquier forma. Lo que se afirma es lo medido: nada estaba a medio escribir, todo lo
derivado correspondía a su fuente, y el único movimiento posterior al encargo 2 es la acción de
QA que ese encargo dejó pedida.

### A.2 — El run 43, derivado del canónico (no tecleado)

```bash
node -e "import('./tools/roadmap/roadmap-core.mjs').then(c=>{const raw=c.loadRaw('roadmap/roadmap.json');const o=c.parseRoadmap(raw);const r=c.globalOrdered(o);const m=r.filter(x=>x.queue_order===43);console.log('runs',r.length);m.forEach(x=>console.log(JSON.stringify({run_id:x.run_id,title:x.title,status:x.status},null,1)))})"
```

| Comprobación | Esperado por el ticket | En disco | Veredicto |
|---|---|---|---|
| `run_id` | `RUN-CONSOLE-RUN-CLASSIFICATION-FIELDS-001` | idéntico | **COINCIDE** |
| `title` | «The five classification fields enter the roadmap schema, with derivation at read time and a minimal view» | idéntico, carácter a carácter | **COINCIDE** |
| `status` | `active` | **`active`** | **COINCIDE** — no `completed`, no `blocked`, no `planned` |
| Runs totales | — | **52** | — |

**La guarda no disparó.**

### A.3 — Las rutas salieron de los tres records, no del ticket

- `MEDICION-SUPERFICIES-CLASIFICACION.md` — **B.0**, los tres árboles muertos.
- `CLASIFICACION-MOTOR.md` — el motor y los invariantes del encargo 1.
- `CLASIFICACION-EMISOR-Y-CONSOLA.md` — **bloque G leído primero**, como ordena el ticket, y
  además A, B, E, F y H.

**El bloque G del tercer record encuadra este encargo entero y se cumplió al pie:** escenario A
(`care_budget` en la raíz, camino de `declare-lanes`, NO cuarta ruta), cinco archivos de
producción más tests, `serve.mjs` a cero. **Ningún archivo necesario faltaba de esos records.**
No hubo que parar por A.3.

### A.4 — Los tres árboles muertos: NINGUNO se tocó

Demostrado por huella, no por intención. El delta del árbol entre el inicio de la sesión y el
final (G.3) lista **exactamente 8 archivos**, y ninguno está en `docs/project-console/`, en
`console/` ni en `tools/project-console/`.

---

## BLOQUE B — La tabla, leída VERBATIM

### B.1 — `context/CLASIFICACION-DE-RUNS.md` §5, TRANSCRITA VERBATIM (`:113-124`)

> ## 5. `care_budget` — CONFIGURACIÓN POR PROYECTO, no regla dura
>
> **`care_budget` es configuración POR PROYECTO, editable desde la consola.** Se
> declara aquí explícitamente: **es CONSEJO, no regla dura.** No bloquea nada, no
> condiciona el cierre y un proyecto puede fijar la suya distinta.
>
> | `severity` | `care_budget` |
> |---|---|
> | MINOR | Opus · Alto |
> | MODERATE | Opus · Extra |
> | MAJOR | Opus · Max |
> | CRITICAL | Fable · Max |

### B.2 — ¿Hay tabla concreta? **SÍ. LA GUARDA DE B.2 NO DISPARA.**

§5 **contiene una tabla concreta de valores**: cuatro filas, una por nivel de `severity`, cada
una con **modelo** y **esfuerzo**. No hubo que parar, no se inventó ni un valor, no se dedujo
nada de la configuración de cabina y no se copió nada de ningún ticket.

**Y la transcripción no se pide por fe: se comprueba por test.** El test
`tests/classification-care-budget.test.mjs:66` («B.1/B.2: the published defaults are §5's
table, parsed off the specification…») **abre `context/CLASIFICACION-DE-RUNS.md`, localiza §5,
parsea su tabla markdown celda a celda y la compara con lo que el módulo publica.** Si la cabina
edita §5, lo que se entera es el test, no un lector.

**Una observación de idioma, señalada y NO resuelta.** Las celdas de §5 (`Opus`, `Alto`,
`Extra`, `Max`, `Fable`) **no son tokens del vocabulario cerrado** en el sentido del preámbulo
del documento (§Idioma: los tokens van en inglés y verbatim — `SPECIFIED`, `COSMETIC`, `MINOR`…).
`Alto` es castellano. **Se transcriben tal como están publicadas**, porque §5 no declara ninguna
lista cerrada para modelo ni para esfuerzo y traducir una celda publicada habría sido inventar un
valor que la cabina no publicó. La razón está escrita en el código
(`tools/classification/classification.mjs:335-347`). **Si la cabina quiere tokens en inglés, es
una edición de §5, no de este encargo.**

### B.3 — Los cuatro niveles, contra lo que produce la derivación del encargo 2

**La tabla cubre: `MINOR`, `MODERATE`, `MAJOR`, `CRITICAL`.**

No se afirma por lectura: se barre la derivación entera y se compara
(`tests/classification-care-budget.test.mjs:99`, «B.3: the table's four levels are EXACTLY the
levels the derivation of the second commission produces»). El barrido recorre las **3
`work_type` × 4 `blast_radius` × 4 `failure_surfaces` (incluida la ausencia) = 48 entradas** y
recoge el conjunto de severidades producidas.

| | Valor |
|---|---|
| Niveles que la derivación PRODUCE | `MINOR`, `MODERATE`, `MAJOR`, `CRITICAL` |
| Niveles que la tabla de §5 CUBRE | `MINOR`, `MODERATE`, `MAJOR`, `CRITICAL` |
| Niveles cubiertos sin producir | **0** |
| Niveles producidos sin cubrir | **0** |

**COINCIDEN EXACTAMENTE. NO HAY DISCREPANCIA QUE REPORTAR.**

---

## BLOQUE C — Dónde vive el dato

### C.1 — En la RAÍZ del canónico, por el camino de `declare-lanes`

| Pieza | `ruta:línea` |
|---|---|
| Allowlist de raíz | `tools/roadmap/roadmap-core.mjs:55` `ROOT_ALLOWED_FIELDS` |
| Orden canónico de claves de raíz | `roadmap-core.mjs:63` `CANONICAL_ROOT_KEY_ORDER` |
| Invariante de forma | `roadmap-core.mjs:389` (dentro de `checkInvariants`) |
| La mutación | `roadmap-core.mjs:1486` `setCareBudget`, justo detrás de `declareLanes` |
| `KNOWN_OPS` | `tools/roadmap/roadmap-plan.mjs:29` |
| El `case` del despacho | `roadmap-plan.mjs:126` |
| **`serve.mjs`** | **CERO cambios** — ver F.4 |

La clave se serializa entre `lanes` y `objectives`, así que `objectives` —que es casi todo el
archivo— sigue siendo la última clave y la configuración queda visible arriba:

```bash
node -e "import('./tools/roadmap/roadmap-core.mjs').then(c=>{const o=c.parseRoadmap(c.loadRaw('roadmap/roadmap.json'));c.setCareBudget(o,{careBudget:{CRITICAL:{effort:'Max',model:'Fable'},MINOR:{model:'Opus',effort:'Alto'},MODERATE:{model:'Opus',effort:'Extra'},MAJOR:{model:'Opus',effort:'Max'}}});console.log('raiz:',Object.keys(o).join(','));console.log('niveles:',Object.keys(o.care_budget).join(','))})"
```

→ `raiz: schema_version,roadmap_id,title,care_budget,objectives`
→ `niveles: MINOR,MODERATE,MAJOR,CRITICAL`

**El orden es normalizado, no el del llamante:** se entregó `CRITICAL` primero y se almacenó en
orden de escala, con `model` antes que `effort`. (Este comando **no escribe**: muta un objeto en
memoria.)

**La operación se llama `declare-care-budget`, no `set-care-budget`, y es deliberado:** en este
motor `set-*` es siempre **por run** (`set-lane`, `set-barrier`, `set-status`,
`set-classification`) y `declare-*` es **de raíz** (`declare-lanes`). El nombre hace visible en
el propio verbo que esto NO es un campo de run.

### C.2 — NO ES UN CAMPO DE RUN, comprobado en los cuatro sitios donde tendría que estar

Test `tests/classification-care-budget.test.mjs:131`:

| Sitio | Resultado |
|---|---|
| `RUN_OPTIONAL_FIELDS` / `RUN_REQUIRED_FIELDS` | **no aparece** |
| `CLASSIFICATION_STORED_FIELDS` | **no aparece** |
| `set-classification` con `careBudget` y `care_budget` en los `args` | **no los relaya**: el run queda sin la clave |
| `checkInvariants` con un `care_budget` escrito a mano EN UN RUN | **SIGUE RECHAZÁNDOLO**, por nombre |

**El test del encargo 1 que comprobaba que `care_budget` es rechazado como clave de run sigue
verde**, y este encargo añadió su propia regresión del mismo hecho. Añadir la clave de RAÍZ no
abrió la de run ni un milímetro.

**Y la operación no toca un solo run** (`tests/classification-care-budget.test.mjs:290`): se
serializa `obj.objectives` antes y después de declarar el presupuesto y se exige igualdad
literal.

### C.3 — OPCIONAL Y AUSENTE POR DEFECTO, y hoy los tres canónicos están así

```bash
node -e "import('./tools/roadmap/roadmap-core.mjs').then(c=>{const raw=c.loadRaw('roadmap/roadmap.json');const o=c.parseRoadmap(raw);console.log('care_budget presente:', 'care_budget' in o);console.log('invariantes:', c.checkInvariants(o,{externalRunIds:null}).length, 'errores');console.log('roundtrip byte-identico:', c.serialize(o,c.detectEol(raw))===raw)})"
```

→
```
care_budget presente: false
invariantes: 0 errores
roundtrip byte-identico: true
```

| Comprobación | Resultado |
|---|---|
| `aiw-console` declara `care_budget` | **NO** — y es válido |
| Invariantes sobre el canónico sin la clave | **0 errores** |
| Leer + escribir deja el archivo byte-idéntico | **SÍ** |
| Declarar la clave y volver a limpiarla deja el archivo byte-idéntico | **SÍ** (`tests/…:172`) |

**La clave se borra ENTERA al limpiar, no se vacía.** Un `care_budget: {}` sería un tercer
estado que el modelo de archivo no tiene, exactamente por la razón por la que `progress` se
borra en vez de quedarse en `[]`.

`[NO VERIFICADO]` — de los «tres canónicos» sólo se midió el de este repo. `cantu-studio` y
`aiw` están fuera del alcance (prohibido leer o escribir en ellos), y el `schema_version`
distinto de `cantu-studio` sigue siendo el obstáculo que el `full_description` del `#43`
registra sin resolver.

### C.4 — Invariante de FORMA, no de contenido

**Lo que el invariante exige** (`tools/classification/classification.mjs:377`
`careBudgetErrors`, la ÚNICA implementación, llamada por el motor **y** por la operación):

- un objeto (no array, no `null`);
- **los cuatro niveles presentes**, y ninguna clave fuera de `SEVERITIES`;
- cada entrada un objeto con **exactamente** `model` y `effort`, ambos cadenas no vacías.

**Lo que NO mira, y no debe mirar: QUÉ modelo y QUÉ esfuerzo.** Test
`tests/classification-care-budget.test.mjs:194`: un presupuesto que difiere de los defaults
publicados **en los cuatro niveles** pasa los invariantes con 0 errores. **Eso es la razón de
ser de la configuración por proyecto, no un defecto.**

Refusiones medidas (`tests/…:207`), cada una con su mensaje y con la garantía de que el objeto
queda intacto:

| Entrada | Mensaje |
|---|---|
| `[]` / `"Opus"` | `must be an object keyed by severity (MINOR, MODERATE, MAJOR, CRITICAL)` |
| sólo `MINOR` | `is missing severity MODERATE; …a budget silent on one gives advice with a hole in it` |
| `HUGE` de más | `carries unknown severity HUGE; only MINOR, MODERATE, MAJOR, CRITICAL are severity levels` |
| `MAJOR` sin `effort`, o con `"  "` | `MAJOR.effort must be a non-empty string` |
| `MAJOR` con `cost: 3` | `carries unexpected field cost` |
| `MAJOR: ["Opus","Max"]` | `must be an object { model, effort }` |

**El motor y la operación dan la MISMA respuesta porque llaman a la MISMA función**, así que un
archivo editado a mano y una escritura desde la consola se rechazan por lo mismo y con las
mismas palabras.

---

## BLOQUE D — CONSEJO, no regla

### D.1 — No entra en ningún canal que rechace nada que no sea su propia forma

| Qué NO hace | Cómo se comprobó |
|---|---|
| No condiciona el cierre de ningún run | ningún camino de `checkInvariants` ni de ninguna operación compara un run con el presupuesto — no existe tal comparación en el código |
| No bloquea ninguna operación | `blockers` sigue `[]` con un presupuesto declarado y un run que se desvía |
| No abre canal de errores en la emisión | `assert.equal("errors" in snapshot.validation_summary, false)` |
| No cambia ningún código de salida | no participa en `validation_summary`, ni en `blockers`, ni en `followups` |
| No se le aplica ningún default | un proyecto sin la clave **no** recibe los publicados: `declared` viaja `null` |

### D.2 — EL TEST EXPLÍCITO DE LA DESVIACIÓN: se guarda sin problema

`tests/classification-care-budget.test.mjs:381` — «D.2: a run whose classification DEVIATES from
the project's care budget saves without a complaint». **No es vacuo:**

1. El proyecto fija un `care_budget` que **no coincide con los defaults publicados en ningún
   nivel** (`CRITICAL` → `Opus · Extra`, donde §5 publica `Fable · Max`).
2. Se clasifica un run como `JUDGED_DEFINES` / `FOUNDATIONAL` / `SYSTEMIC` / `SILENT`, que
   **deriva `CRITICAL`** — el nivel donde el presupuesto del proyecto y el publicado más se
   separan.
3. Se comprueba: `planEdit` → `ok: true`; `checkInvariants` → **0 errores**;
   `buildRoadmapTreeSnapshot` → `blockers: []` y sin canal `errors`; el presupuesto sin tocar;
   el run **sin ninguna traza** del presupuesto.
4. Y **un `set-status` posterior sobre ese mismo run sigue siendo `ok: true`**: el presupuesto no
   puede convertirse en compuerta por haber llegado antes.

Y el orden inverso también (`tests/…:419`): clasificar primero y declarar el presupuesto después
tampoco refuta nada — los runs ya clasificados se quedan **exactamente como estaban**.

### D.3 — ¿Aparece `care_budget` en el canal de errores? **SÍ, y sólo por su propia forma.**

**Aparece en dos sitios, los dos declarados:**

1. `checkInvariants` (`roadmap-core.mjs:389`) — un `root.care_budget` **malformado** produce
   errores, todos con el prefijo `root.care_budget`. Es su forma, y es el único motivo.
2. `declare-care-budget` (`roadmap-core.mjs:1486`) — refuta la misma forma, una etapa antes, con
   el prefijo `declare-care-budget: care_budget`.

**Verificado que no aparece en ningún otro canal** (`tests/…:441`): con un presupuesto bien
formado, **ningún** error de `checkInvariants` lo nombra; con uno malformado, **todos** los que
lo nombran empiezan por `root.care_budget`; y serializando el snapshot con `taxonomy_model`
anulado, **la cadena `care_budget` no aparece en ninguna parte** — ni en `blockers`, ni en
`followups`, ni en `validation_summary`.

**Por qué aparece:** porque un archivo puede editarse a mano y una tabla malformada en disco es
una tabla que la consola no puede pintar. Rechazar la forma es lo que hace que la ausencia sea
un estado y no un accidente. **Rechazar el contenido sería convertir el consejo en regla, y no
se hace en ninguna parte.**

---

## BLOQUE E — Transporte

### E.1 — VIAJA DENTRO DE `taxonomy_model`. La razón, en una línea

> **`care_budget` está indexado por `severity`, un token DERIVADO que no existe en ninguna otra
> parte del sobre; llevarlo fuera de `taxonomy_model` habría hecho que las claves de su propia
> tabla fueran los primeros tokens de severidad en viajar fuera de esa clave, y la disciplina
> del encargo 2 —«el resultado derivado nunca viaja»— habría tenido que leerse con una
> excepción.**

Sitio: `tools/projector/project.mjs:1080` (`care_budget: classification.care_budget`), construido
en `tools/classification/classification.mjs:431` (`buildCareBudgetDeclaration`).

**La alternativa que se descartó, y por qué.** El precedente literal de una clave de raíz que
viaja es `root.lanes` dentro de `roadmapTreeBlock` (`project.mjs:1103`), y el propio bloque G del
encargo 2 lo señalaba. **Se midió y se rechazó:** el test E.2 del encargo 2 exige que ningún
token de `MINOR`/`MODERATE`/`MAJOR`/`CRITICAL` viaje como valor fuera de `taxonomy_model`, y una
tabla indexada por severidad al lado de `lanes` habría metido las cuatro como CLAVES. Ese test
sigue verde hoy **y este encargo lo re-mide con el bloque nuevo puesto**
(`tests/classification-care-budget.test.mjs:305`).

**Lo que viaja, y el reparto es la mitad del argumento:**

| Mitad | Contenido | De quién es |
|---|---|---|
| **MODELO** | `applies_to`, `keyed_by`, `levels`, `entry_form`, `binding`, `binding_note`, `published_defaults` | de la ESPECIFICACIÓN — idéntico para todo proyecto |
| **VALOR** | `declared`, `declared_reason` | del PROYECTO — dos proyectos legítimamente distintos |

**Y por eso NO es una entrada de `vocabularies`:** un vocabulario es el mismo para todos; esto no.
Es la única entrada de `taxonomy_model` cuyo CONTENIDO es del proyecto y no de la especificación,
y está dicho así en el código (`classification.mjs:284-286`).

### E.2 — La versión del proyector: **0.11.0 → 0.12.0**

```bash
node -e "import('./tools/projector/project.mjs').then(p=>{const s=p.buildRoadmapTreeSnapshot('.',{now:'1970-01-01T00:00:00.000Z'});console.log(p.PROJECTOR_VERSION, s.generated_from, Object.keys(s.taxonomy_model).join(','))})"
```

→ `0.12.0 aiw-projector@0.12.0 model,vocabularies,derivations,illegal_combinations,care_budget,specified_by`

El motivo va escrito junto a la constante (`project.mjs:118-127`): **un emisor que transporta una
configuración por proyecto que antes no transportaba no es el emisor de 0.11.0.** Es la misma
regla de §6 que movió 0.10.0 → 0.11.0 en el encargo 2.

`taxonomy_model` **sigue sin versión propia por tabla**, por la razón que el encargo 2 dejó
escrita: el precedente que E.1 manda copiar no la tiene.

### E.3 — Un proyecto SIN `care_budget` emite un sobre válido, y lleva `declared: null` CON su razón

Medido sobre `tests/fixtures/lanes/project`, que no declara ninguno:

```json
"care_budget": {
  "applies_to": ["project"],
  "keyed_by": "run.severity",
  "levels": ["MINOR", "MODERATE", "MAJOR", "CRITICAL"],
  "entry_form": { "model": "non_empty_string", "effort": "non_empty_string" },
  "binding": "advice",
  "binding_note": "Advice, not a hard rule: it blocks nothing, it gates no run's closure, and a project may fix its own. A run may deviate in either direction, and the deviation travels in the run's ticket, never in a field.",
  "published_defaults": { "MINOR": {...}, "MODERATE": {...}, "MAJOR": {...}, "CRITICAL": {...} },
  "declared": null,
  "declared_reason": "this project declares no root.care_budget; the key is optional and absent by default, and nothing is blocked, refused or defaulted by its absence"
}
```

**QUÉ LLEVA EN SU LUGAR: `declared: null` acompañado SIEMPRE de `declared_reason`.**

**El precedente que se siguió es el de los pares que viajan juntos:**
`unprojected_inputs` / `unprojected_inputs_reason` (`project.mjs:300-342`), cuyo comentario dice
que **«el par viaja JUNTO por construcción — una función devuelve las dos claves o ninguna —
porque una lista sin su razón es el mismo silencio que esto existe para reparar, un nivel más
abajo»**. Aquí, exactamente igual: una sola función (`buildCareBudgetDeclaration`) produce las
dos, y el test lo comprueba para `undefined`, `null` y un valor
(`tests/classification-care-budget.test.mjs:330`).

**Lo que NO se hizo, y las dos razones:**

- **No viaja `{}`** — leería como «un presupuesto que no dice nada», que es distinto de «no hay
  presupuesto».
- **No viajan los defaults en el hueco de `declared`** — leería como un presupuesto que el
  proyecto nunca fijó. Los defaults viajan, sí, pero **bajo su propio nombre**
  (`published_defaults`), porque la consola tiene que poder OFRECERLOS sin inventarlos en
  pantalla (F.3).

---

## BLOQUE F — La consola: la primera superficie de edición POR PROYECTO

**Confirmado en disco antes de empezar, tal como lo midió el encargo 2:**

```bash
grep -rn "declare-lanes" project-console/
```

→ **salida vacía.** El precedente de escritura en raíz **no tenía ninguna superficie de consola**.
**Ésta es la primera.**

### F.1 — La superficie mínima

| Pieza | `ruta:línea` |
|---|---|
| La ranura de marcado | `project-console/index.html:134` `#roadmap-care-budget` |
| Lectura del sobre | `project-console/assets/project-console.js:3831` `careBudgetBlock` |
| El panel | `project-console.js:3889` `renderCareBudget` |
| Ofrecer los defaults publicados | `project-console.js:3955` `careBudgetFillDefaults` |
| Previa (dry run) | `project-console.js:3966` `careBudgetPreview` |
| Confirmar y escribir | `project-console.js:4010` `careBudgetConfirm` |
| Estilos | `project-console.css:6473-6676` |

**Mínima de verdad: exactamente ocho controles de valor**, cuatro niveles × { modelo, esfuerzo },
aseverado por conteo (`tests/…:466`: `assert.equal((editable.match(/<input/g)||[]).length, 8)`).
Ni un control más: no hay campo para severidad, ni para ninguna otra cosa.

**Dónde vive: la pestaña Roadmap, encima de las dos subvistas y fuera de las dos.** No dentro del
editor de runs, y es deliberado: lo que edita es del PROYECTO, y meterlo en el editor de un run
diría en la pantalla lo contrario de lo que dice §5.

**Escritura: la MISMA ruta acotada que todo lo demás** — previa (dry run) → confirmar → aplicar
contra `PATHS.roadmapEdit`, con el `baseline` que devolvió la previa. Verificado que el payload
que arma el panel **lo acepta el motor sin tocarlo** y que **no lleva `run`**
(`tests/…:502`): `assert.equal("run" in posted[0].args, false)`.

**Sólo editable con «Edit roadmap» encendido** (`tests/…:462`): con el modo apagado el panel no
pinta ni un `<input>` ni un solo botón de escritura, y lo dice en palabras. Al apagar el modo se
vuelve a pintar, así que los controles desaparecen en el acto
(`project-console.js:5424`).

### F.2 — Declara en pantalla que es CONSEJO, y lo hace ANTES de enseñar un valor

La línea se pinta **encima de la tabla**, con el token `advice` como marca y **la frase del
sobre, no del renderer**:

> `ADVICE` · Advice, not a hard rule: it blocks nothing, it gates no run's closure, and a project
> may fix its own. A run may deviate in either direction, and the deviation travels in the run's
> ticket, never in a field.

**El orden está aseverado, no confiado** (`tests/…:442`):
`assert.ok(html.indexOf("Advice, not a hard rule") < html.indexOf("care-budget-table"))`. Un
operador que lea la tabla antes que la advertencia ya la ha leído como regla.

**Y la frase no la escribe la consola.** Viene de `binding_note` del sobre, que sale del módulo
que posee §5. La pantalla no puede decir algo que el modelo no diga.

### F.3 — Sin configurar se ve SIN CONFIGURAR, y los defaults se OFRECEN sin aplicarse

Con `declared: null` la pantalla muestra:

- el estado **«Not configured»**, en color terciario — **no en rojo, no en ámbar**: un proyecto
  sin presupuesto es correcto, no va tarde;
- la `declared_reason` del sobre, en palabras;
- los cuatro niveles con la celda vacía (`—`), **nunca un valor**;
- un bloque plegable **«Published defaults — *not in effect* for this project»**, con la nota
  «This project has not adopted them, and nothing applies them on its behalf»;
- y, en modo edición, el botón **«Fill with published defaults»**, que **rellena el formulario y
  dice en palabras que todavía no se ha escrito nada** (`tests/…:481`: el panel de previa lee
  «nothing is written yet»).

**Aseverado que no se inventa nada** (`tests/…:427`): en la tabla propia de un proyecto sin
configurar **no aparece ningún modelo**; los valores publicados sólo existen dentro del bloque
etiquetado como no vigente. Y un proyecto YA configurado **no ve los defaults en absoluto**: son
una oferta para quien no tiene ninguno, no una comparación permanente contra una tabla de la que
tiene derecho a diferir.

**Un sobre sin el bloque no pinta nada** (`tests/…:539`), igual que la lista de sin clasificar
del encargo 2: se parte de un panel que SÍ pinta y se comprueba que cada forma degradada del
snapshot lo deja vacío, para que un vacío no pueda ser un falso positivo.

### F.4 — ¿Obliga a tocar `serve.mjs`? **NO. La medición del encargo 2 se confirma: CERO cambios.**

```bash
grep -c "" project-console/serve.mjs
```

→ **981 líneas, las mismas que tenía.** Y no está en el delta del árbol (G.3).

El motivo es estructural y ya estaba medido: la ruta 1 **no enumera nada** — valida la op contra
`KNOWN_OPS` importado (`serve.mjs:473`) y relaya `args`. Una op nueva viaja por ella sin tocar el
servidor, sea de run o de raíz. **Aseverado por test** (`tests/…:265`):

```js
assert.equal(/care_budget|careBudget|declare-care-budget/.test(serve), false)
```

`serve.mjs` **no aprende el nombre de esta operación**, y ése es exactamente el punto.

### F.5 — QA HUMANA: qué debe mirar el operador

1. **Refrescar la proyección primero.** Arrancar la consola (`start-console.cmd`), abrir
   `aiw-console`, pestaña **Roadmap**, pulsar **«Re-emit .project/»**. El acuse debe decir
   **`aiw-projector@0.12.0`**. Sin esto el snapshot de disco sigue en `0.11.0`, **no lleva el
   bloque `care_budget`, y el panel de los pasos 2-5 NO APARECERÁ EN ABSOLUTO** (eso es lo
   correcto: un sobre sin el bloque no pinta nada).
2. **CON `care_budget` AUSENTE — pestaña Roadmap, encima de las subvistas.** Debe aparecer el
   panel **«Care budget · project configuration»** con el estado **«Not configured»**.
   Comprobar: **no es rojo ni ámbar**, las cuatro filas (`MINOR`, `MODERATE`, `MAJOR`,
   `CRITICAL`) muestran `—` y **ningún nombre de modelo**, y la línea `ADVICE` está **por encima**
   de la tabla. Desplegar «Published defaults — not in effect»: debe leerse `Opus · Alto`,
   `Opus · Extra`, `Opus · Max`, `Fable · Max`, con la nota de que este proyecto no los ha
   adoptado.
3. **Que sin modo edición no se puede escribir.** Con «Edit roadmap» **apagado**, el panel no
   debe tener ni una caja de texto ni un botón, y debe decir «Turn on **Edit roadmap** to change
   this». Encenderlo: aparecen **ocho** cajas y los botones.
4. **Fijarlo.** Pulsar **«Fill with published defaults»** → las ocho cajas se rellenan y el panel
   de previa debe decir que **todavía no se ha escrito nada**. Cambiar un valor a mano (p. ej.
   `CRITICAL` → modelo `Fable`, esfuerzo `Max` → cambiar el esfuerzo a `Extra`) y pulsar
   **«Preview care budget»**: la previa debe listar las cuatro filas `(not configured) -> …` y
   la nota de que esto escribe `root.care_budget`, **no clasifica nada y no bloquea nada**.
   **Confirmar.**
5. **Tras fijarlo.** Volver a pulsar **«Re-emit .project/»** y recargar: el estado debe pasar a
   **«Configured»**, las cuatro filas deben mostrar los valores tecleados, y **el bloque de
   defaults publicados debe DESAPARECER**. En una terminal, la prueba de dónde quedó:
   `node -e "const o=JSON.parse(require('fs').readFileSync('roadmap/roadmap.json','utf8'));console.log(Object.keys(o).join(','));console.log(JSON.stringify(o.care_budget))"`
   → la raíz debe listar `care_budget` **entre `title` y `objectives`**.
6. **QUE NO BLOQUEA NADA — la comprobación que importa.** Con el presupuesto puesto, clasificar
   un run cualquiera desde el editor con `JUDGED_DEFINES` / `FOUNDATIONAL` / `SYSTEMIC` /
   `SILENT` (deriva **`CRITICAL`**) y **confirmar**: debe guardarse sin ninguna queja, sin
   ningún aviso sobre el presupuesto y sin ningún cambio en el panel. Después, un `set-status`
   sobre ese mismo run debe seguir funcionando. **Si algo se refiere al presupuesto en cualquiera
   de esos dos pasos, la implementación está mal.**
7. **Limpiarlo.** Botón **«Clear (back to not configured)»** → previa → confirmar. Tras re-emitir,
   el panel debe volver a **«Not configured»** y el canónico debe quedar **sin la clave**, no con
   una vacía.

---

## BLOQUE G — Suite y árbol

### G.1 — El total

```bash
npm test
```

| Momento | Tests | Pasan | Fallan |
|---|---|---|---|
| **Línea base del ticket** | 418 | **418** | **0** |
| **Línea base MEDIDA (ver G.2)** | **418** | **417** | **1** |
| **Al terminar** | **442** | **441** | **1** |

**Delta: +24**, todos de `tests/classification-care-budget.test.mjs`. **442 − 24 = 418**, que
confirma exacto el recuento de la línea base del ticket.

**NO SE CONFIRMA «0 fallan», y no se disimula: la suite termina con 1 fallo, el mismo con el que
empezó, y no es de este encargo.** Está desmenuzado en G.2.

Cobertura de los 24 tests nuevos:

| Capa | Tests |
|---|---|
| La especificación (§5 parseada del disco y comparada celda a celda; los cuatro niveles contra la derivación) | 2 |
| El esquema (raíz, no-run en cuatro sitios, ausencia válida ×2, forma vs contenido ×2) | 6 |
| El motor (ruta existente + no batcheable + `serve.mjs` intacto, escritura extremo a extremo, no toca runs) | 3 |
| El sobre (dentro de `taxonomy_model`, el par `declared`/`declared_reason`, la versión) | 3 |
| **CONSEJO, no regla** (la desviación se guarda ×2, el canal de errores) | **3** |
| La consola (sin configurar, la declaración de consejo, configurado, sólo lectura, la oferta, el payload, el sobre sin bloque) | 7 |

### G.2 — Tests preexistentes que cambiaron de resultado: **TRES. Dos inevitables, uno que no es mío.**

**(1) `tests/roadmap-engine.test.mjs:263` — el pin `deepEqual` de `KNOWN_OPS`. INEVITABLE.**
C.1 exige la ruta de escritura de raíz y F.1 exige que sea editable desde la consola: sin op no
hay ninguna de las dos. El propio comentario del test manda qué hacer —«any further drift from
this list is a decision to register, not an accident to absorb»— y esto es **una decisión
registrada por el ticket**. Se añadió `declare-care-budget` al literal, en su sitio (detrás de
`declare-lanes`, que es lo que es), con el párrafo que dice **por qué** entra. **El pin sigue
siendo un `deepEqual` estricto sobre la lista completa** y sigue capaz de atrapar la siguiente
deriva. Es el mismo camino que tomó el encargo 2 con `set-classification`.

**(2) `tests/classification-transport-and-console.test.mjs:145` — el pin de `PROJECTOR_VERSION`.
INEVITABLE.** E.2 ordena subir la versión; el test la fija en `"0.11.0"`. Se movió a `"0.12.0"`
con el motivo escrito al lado. **La aserción no se debilitó**: sigue siendo una igualdad exacta
sobre la constante y sobre `generated_from`, y fallará igual en la próxima deriva no declarada.

**(3) `tests/roadmap-engine.test.mjs:92` — «the two real canonicals do NOT share a line-ending
convention». NO ES DE ESTE ENCARGO Y NO SE TOCÓ.**

El test exige que los dos canónicos reales tengan convenciones de fin de línea distintas
(`new Set(eols).size === 2`). Hoy **los dos son CRLF**:

```bash
node -e "const fs=require('fs');const path=require('path');import('./tools/projector/project.mjs').then(p=>{for(const root of ['.','../cantu-studio']){const l=p.detectRootLayout(path.resolve(root));const raw=fs.readFileSync(path.resolve(root,l.paths.roadmap),'utf8');console.log(root,'CRLF:',/\r\n/.test(raw),'mtime:',fs.statSync(path.resolve(root,l.paths.roadmap)).mtime.toISOString())}})"
```

→
```
.               CRLF: true  mtime: 2026-08-01T02:50:01.142Z
../cantu-studio CRLF: true  mtime: 2026-07-31T09:30:32.372Z
```

**La prueba de que no es mío, en tres piezas:**

1. **Los dos archivos de entrada están byte a byte como al empezar la sesión.** El delta del
   árbol contra la huella de inicio (G.3) lista 8 archivos y `roadmap/roadmap.json` **no está
   entre ellos**. `cantu-studio` está fuera del repo, fuera del alcance, y su mtime es de
   **17 horas antes** de esta sesión.
2. **`detectEol` no se tocó** (`roadmap-core.mjs:160-162`, dos líneas, intactas).
3. **Corroboración independiente de que este canónico ERA LF:** la copia congelada del propio
   canónico que vive en la suite, `tests/fixtures/neighbours/aiw-console/canonical/roadmap.json`,
   **es LF**. El vivo es CRLF. La conversión ocurrió en la reescritura de `02:50:01.142Z` —
   **10 segundos después de la re-emisión del operador y horas antes de esta sesión**.

**Por tanto la línea base real era 418 tests / 417 pasan / 1 falla**, y la cifra «418/418/0» del
ticket describe el estado del encargo 2 al terminar, no el estado en que este encargo encontró el
repo. **NO SE ARREGLÓ, y es deliberado:** el mensaje del propio test dice qué hacer —«both real
roadmaps now share one EOL; the parameter is no longer load-bearing (**update the record, keep
the test**)»—, tocarlo estaría fuera del alcance de este ticket, y **es una medición del mundo,
no un defecto del código**. **Es de la cabina decidir si `detectEol` sigue siendo load-bearing o
si la conversión LF → CRLF del canónico fue intencionada.**

**Reconocido sin adorno:** no se corrió `npm test` ANTES de tocar nada, así que la línea base de
417/1 está **derivada** (442 − 24 = 418; de los 3 fallos, 2 tienen causa medida en mis ediciones
y el tercero depende sólo de archivos que no toqué) y **no medida directamente**. Es la única
cifra de este record que no sale de un comando ejecutado en el momento que describe.

### G.3 — ¿Correr la suite deja el árbol modificado? **NO.**

Huella SHA-1 + tamaño + mtime de cada archivo (excluyendo `.git/` y `node_modules/`), antes y
después de `npm test`:

| Medición | Archivos | Añadidos | Eliminados | Contenido cambiado | Solo mtime |
|---|---|---|---|---|---|
| Suite final (442) | **268** | **0** | **0** | **0** | **0** |

**La suite no toca ni una marca de tiempo.** Los 24 tests nuevos mantienen la disciplina del
encargo 2: los que escriben lo hacen sobre copias con `mkdtempSync` + `cpSync` y las borran en
`finally`; los que miden el canónico de este repo **sólo leen**.

### G.4 — `.project/` NO se re-emitió

**No se escribió un solo byte en `.project/`.** Todas las cifras de transporte de este record se
midieron con `buildRoadmapTreeSnapshot` **en memoria** o sobre copias temporales. La consecuencia
operativa es el paso 1 de la QA (F.5): el snapshot de disco sigue siendo el de `0.11.0` **y por
tanto el panel de `care_budget` no aparecerá hasta que el operador pulse «Re-emit .project/»**.
Eso lo pulsa el operador, no yo.

### Archivos tocados — ocho, y ninguno en un árbol muerto

| Archivo | Líneas al terminar | Qué |
|---|---|---|
| `tools/classification/classification.mjs` | **446** (era 312) | §5: defaults publicados, el checker de forma, el bloque del sobre |
| `tools/roadmap/roadmap-core.mjs` | **1954** | allowlist, orden de claves, invariante de forma, `setCareBudget` |
| `tools/roadmap/roadmap-plan.mjs` | **331** | `declare-care-budget` en `KNOWN_OPS` y su `case`; NO batcheable |
| `tools/projector/project.mjs` | **1937** | transporte en `taxonomy_model` + versión `0.12.0` |
| `project-console/index.html` | **265** | la ranura de marcado |
| `project-console/assets/project-console.js` | **7029** | el panel, la oferta de defaults, previa y confirmación |
| `project-console/assets/project-console.css` | **6676** | estilos del panel |
| `tests/classification-care-budget.test.mjs` | **555** | **NUEVO** — 24 tests |
| *(más los dos pines de G.2)* | | `tests/roadmap-engine.test.mjs`, `tests/classification-transport-and-console.test.mjs` |
| **`project-console/serve.mjs`** | **981** | **CERO** |

---

## BLOQUE H — Material para el registro de decisiones

Reunido y citado; **`context/DECISIONES.md` no se tocó**. Está en el mensaje de entrega con las
mismas citas.

---

## BLOQUE I — La guarda de cierre del run 43

### I.1 — El comando READ-ONLY, verbatim y listo para PowerShell

**Verificado ejecutándolo en PowerShell**, no sólo en bash. Todas las comillas internas son
simples, no hay `$` ni backtick: se pega tal cual desde la raíz de `aiw-console`.

```bash
node -e "import('./tools/roadmap/roadmap-core.mjs').then(c=>{const raw=c.loadRaw('roadmap/roadmap.json');const o=c.parseRoadmap(raw);const e=c.checkInvariants(o,{externalRunIds:null});const r=c.globalOrdered(o);const by=r.reduce((a,x)=>(a[x.status]=(a[x.status]||0)+1,a),{});const t=r.find(x=>x.run_id==='RUN-CONSOLE-RUN-CLASSIFICATION-FIELDS-001');console.log('run 43:',t.run_id,t.status,JSON.stringify(t.closeout_result||null));console.log('invariantes:',e.length?'FAIL':'PASS (0 errores)');console.log('runs:',r.length,JSON.stringify(by));console.log('terminales:',r.filter(x=>c.TERMINAL_STATUSES.includes(x.status)).length)})"
```

**QUÉ IMPRIME HOY, 2026-07-31, con los tres encargos terminados y el run todavía abierto:**

```
run 43: RUN-CONSOLE-RUN-CLASSIFICATION-FIELDS-001 active null
invariantes: PASS (0 errores)
runs: 52 {"completed":42,"active":1,"planned":9}
terminales: 42
```

**QUÉ DEBE IMPRIMIR TRAS EL CIERRE:**

```
run 43: RUN-CONSOLE-RUN-CLASSIFICATION-FIELDS-001 completed <un closeout_result NO nulo>
invariantes: PASS (0 errores)
runs: 52 {"completed":43,"planned":9}
terminales: 43
```

Es decir: `status` **`completed`**, `closeout_result` **no nulo**, `completed` **43**, `active`
**0** (la clave desaparece del histograma), `terminales` **43**. El total de runs **no cambia**:
cerrar no inserta ni mueve nada.

**Es puramente de lectura:** no escribe, no re-emite `.project/`, no toca git.

---

## BLOQUE J — Veredicto

### J.1 — Qué no fue ejecutable como estaba escrito, y qué se interpretó

**Contradicción del propio ticket (resuelta y señalada):**

1. **C.1/F.1 contra G.2, otra vez.** C.1 ordena la ruta de escritura de raíz y F.1 la superficie
   de consola; el pin de `KNOWN_OPS` cambia de resultado **por construcción** al obedecerlas.
   G.2 ordena parar si un test preexistente cambia de resultado. Se resolvió por la regla que
   **el propio test enuncia** («a decision to register, not an accident to absorb»), igual que
   el encargo 2, y está entero en G.2. Lo mismo, exactamente, con el pin de versión y E.2.

**Cifra del ticket que NO se confirmó:**

2. **La línea base de G.1 no era 418/418/0: era 418/417/1.** El fallo preexistente
   (`tests/roadmap-engine.test.mjs:92`, los fines de línea de los dos canónicos reales) **no lo
   causó este encargo** y está probado en G.2 con tres mediciones. **No se arregló** y no se paró
   por él: parar por un fallo que ya estaba y que el propio test declara como «actualiza el
   record, conserva el test» habría dejado el encargo entero sin hacer por una causa ajena. **Se
   reporta y se deja a la cabina.**

**Interpretado, y declarado aquí porque ni el ticket ni §5 lo dicen:**

3. **La forma exige LOS CUATRO NIVELES.** §5 publica cuatro filas; el invariante refuta un
   presupuesto que cubra tres. **Es forma, no contenido** (qué modelo y qué esfuerzo sigue sin
   mirarse), pero §5 no dice explícitamente que los cuatro sean obligatorios y podría leerse de
   otro modo. Razón escrita en el código y en el mensaje de error: **un presupuesto callado sobre
   una severidad es consejo con un agujero.**
4. **`{}` limpia, no es un presupuesto vacío.** `null` y `{}` hacen lo mismo: borrar la clave
   entera. Un `care_budget: {}` sería un tercer estado que el modelo de archivo no tiene.
5. **Las celdas de §5 se transcriben en el idioma en que están publicadas**, `Alto` incluido, y
   **no se traducen a un token inglés**. §5 no declara vocabulario cerrado para modelo ni para
   esfuerzo; traducir habría sido inventar. Señalado en B.2 como asunto de la cabina.
6. **El nombre de la operación es `declare-care-budget`.** El ticket no lo fija. `declare-*` es
   el verbo de raíz de este motor y `set-*` el de run; el nombre hace visible que esto no es un
   campo de run, que es lo que C.2 insiste en que no sea.
7. **E.1: dentro de `taxonomy_model`, no al lado.** La razón está en E.1 en una línea y la
   alternativa descartada también. Es la decisión de este encargo que la cabina tiene que
   registrar.
8. **La consola lee el bloque del snapshot, no del árbol.** `taxonomy_model` sólo viaja en
   `.project/snapshot.json` (no en `.project/roadmap.json`), así que el panel lee `data.snapshot`
   — el mismo camino que la lista de sin clasificar del encargo 2, no uno nuevo.
9. **Dónde vive el panel.** F.1 pide la superficie pero no la pantalla. Se eligió la pestaña
   **Roadmap**, encima de las subvistas y fuera de las dos, por ser donde ya viven los controles
   de proyecto (el selector de carril, «Re-emit .project/», «Edit roadmap») y porque meterlo en
   el editor de un run habría dicho lo contrario de lo que dice §5.
10. **El presupuesto sólo se edita con «Edit roadmap» encendido.** El ticket no lo pide. Es una
    escritura del roadmap y viaja por su ruta, así que se sujeta a su misma compuerta.

### J.2 — Qué queda abierto del run 43

| Qué | Estado |
|---|---|
| **El run 43 sigue `active`** | **Lo cierra el operador.** Este encargo no cambió el status de nada. |
| **La QA humana de F.5** | **Sin ejecutar.** Empieza por re-emitir `.project/`; sin eso el panel no aparece. |
| **`.project/` en disco sigue en `0.11.0`** | El operador lo mueve a `0.12.0` con «Re-emit .project/». |
| **El fallo preexistente de fines de línea** | **De la cabina** (G.2): decidir si `detectEol` sigue siendo load-bearing o si la conversión del canónico a CRLF fue intencionada. |
| **§7 de la especificación: las tres reglas mecánicas para runs mixtos** | **Siguen sin estar.** Ningún encargo de los tres las tocó. |
| **La duda de doctrina heredada del encargo 1** | `JUDGED_*` + `UNATTENDED` es inalcanzable bajo la tabla vigente: guarda deliberada, redundancia o errata. **Sigue siendo de la cabina.** |
| **El run 44 (`RUN-CONSOLE-CLASSIFICATION-PILOT-001`)** | Ejecutable. Sigue habiendo **10 runs vivos sin clasificar**; este encargo no clasificó ninguno. |
| **`cantu-studio` con un `care_budget` de raíz** | `[NO VERIFICADO]` — leer o escribir en ese repo está fuera del alcance; su `schema_version` distinto sigue sin resolver. |

---

## Lo que este record NO hace

- **No cierra el run.** El `#43` queda `active`. No se cambió el status de nada, ni se insertó,
  movió o renumeró ningún run.
- **No añade `care_budget` a ningún run**, ni al esquema de run, ni al allowlist de run, ni a
  `set-classification`. Demostrado en C.2, en los cuatro sitios donde tendría que aparecer.
- **No convierte el consejo en regla.** Nada compara un run con el presupuesto, en ningún
  archivo. Demostrado en D.2 con la desviación explícita, en los dos órdenes.
- **No inventa ningún default.** Los cuatro pares salen de §5 y el test los reparsea del disco.
- **No aplica los defaults a nadie.** Un proyecto sin la clave emite `declared: null`, no la
  tabla publicada.
- **No re-emite `.project/`** y no ejecuta el proyector como escritura.
- **No cambia la derivación, los invariantes ni la vista del encargo 2**, salvo los dos pines que
  G.2 declara y explica.
- **No clasifica ningún run.** El canónico sigue con **0** runs clasificados.
- **No toca `serve.mjs`** — 981 líneas, las mismas, y aseverado por test.
- **No usa git en ninguna forma**: ni commit, ni push, ni lectura de historia. Las comprobaciones
  de árbol de A.1, A.4 y G.3 se hicieron por huella SHA-1 + tamaño + mtime.
- **No escribe en `context/DECISIONES.md`.** El bloque H sólo reúne y cita.
- **No escribe un byte en `aiw` ni en `cantu-studio`.** De `cantu-studio` sólo se leyó el fin de
  línea de su canónico, y sólo porque un test preexistente lo lee.
- **No toca los tres árboles de consola muertos**, y lo demuestra por medición (A.4, G.3).
- **No reescribe ningún record existente**: los cita.
