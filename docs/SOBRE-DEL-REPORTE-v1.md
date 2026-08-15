# Sobre del reporte de run · v1 — `report.json`, su resumen, y lo que la consola promete pintar

> **BORRADOR, 2026-08-14. NO APROBADO.** Lo emite `RUN-CONSOLE-REPORT-ENVELOPE-CONTRACT-001`
> (`#59`) del hilo `aiw-console`. **Nadie construye contra este documento hasta que el
> operador lo apruebe**, y el §6 —la semántica de la cobertura— **no se congela ni con esa
> aprobación general: es una decisión del operador que este documento trae encuadrada y NO
> toma** (§6).
>
> **Ruta citable:** `projects/aiw-console/docs/SOBRE-DEL-REPORTE-v1.md`
> El fichero se entrega **sin commitear**: git es exclusivo del operador, y «versionado»
> será verdad cuando él lo commitee.
>
> **Por qué vive aquí, medido:** las piezas compartidas entre hilos viven versionadas en el
> `docs/` del hilo dueño con su versión en el nombre — así lo hacen sus dos hermanos,
> `projects/cantu-quizzes-latex/docs/CONTRATO-REPORTE-DE-CAMBIOS-v1.md` y
> `projects/cantu-quizzes-latex/docs/PERFIL-REPORTE-QUIZZES-v1.md`, y así lo dice la
> cabecera de aquel contrato: «una pieza compartida no puede vivir en `_scratch`». La norma
> interna de este repo (`governance/contract.json` → `context/aiw-console/CONTRATO.md`)
> rige la consola; este documento es la pieza que viaja a los emisores, y por eso está en
> `docs/`.
>
> **Estrenado el 2026-08-14 contra UN caso real** —
> `projects/cantu-quizzes-latex/reports/RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001/report.json`
> con su perfil delante— **antes de darse por bueno. El estreno y su veredicto sobre este
> contrato están en el §8.** Toda cifra de este documento viaja con el comando que la
> produce (Anexo A).

---

## 0 · Quién es quién — lo que este documento obliga y lo que no

Hoy no está dicho en ningún sitio cuál contrato es de quién. Queda dicho aquí:

| Pieza | Quién la escribe | Dónde vive |
|---|---|---|
| **El SOBRE** — los campos comunes a todo run de cualquier proyecto, el resumen del emisor, y `verdict.json` | **`aiw-console`** — este documento | `projects/aiw-console/docs/SOBRE-DEL-REPORTE-v1.md` |
| **La PROMESA de pintura** — qué hace la consola con cada campo presente, ausente o vacío | **`aiw-console`** — este documento la declara (§3), separando lo construido de lo prometido; la fuente de lo construido es `project-console/assets/run-report-renderer.js`, `run-report-surface.js` y sus tests | este repo |
| **El CONTRATO de dominio** — qué tiene que ser cierto del contenido revisado, y su rúbrica | **el proyecto que emite** | p. ej. `cantu-quizzes-latex/docs/RUBRICA-DE-NIVELES.md` |
| **El PERFIL** — los ids estables de los criterios del dominio y qué evidencia exige cada uno | **el proyecto que emite** | p. ej. `cantu-quizzes-latex/docs/PERFIL-REPORTE-QUIZZES-v1.md` |

**El principio que reparte, y viene de `CONTRATO.md` de este repo: la norma la escribe quien
lee.** La consola es la lectora del sobre — por eso el sobre es suyo. El contenido lo lee el
operador con la rúbrica del dominio delante — por eso los criterios son del emisor.

**Relevo declarado.** La cabecera del contrato del emisor dice, verbatim: «Este documento
deja de ser su fuente en cuanto ellos emitan la suya» — y su §15 reparte qué se muda: el
sobre genérico (sus §§1, 3, 4, 5, 6, 7), el validador (§10), la interfaz (§9), el índice
derivado y el `POST` del veredicto (§2 y §7), y el enganche con el kernel (§14). **Este
documento es esa emisión.** Las secciones mudadas quedan como evidencia fechada, y **este
documento las incorpora por referencia donde no las redefine** (§2.2): así el detalle del
esquema no se queda sin fuente ni se copia entero. Donde este documento corrija algo de
aquéllas, manda éste. Lo que NO se muda —criterios, rúbrica, perfil— sigue siendo del
emisor y este documento no lo redefine.

**Adopción:** este documento **se envía a los emisores, no se les impone.** Adoptarlo es un
run de cada hilo dueño; el relevo quedó pre-autorizado por el propio contrato del emisor,
así que entre hoy y la adopción no hay dos fuentes en pie de igualdad — hay una fuente
nueva y una evidencia fechada. Un reporte no conforme no rompe la consola: **falla en el
proyecto que lo emitió** — la consola lo pinta igual, por presencia de campos, y la
conformidad la comprueba la suite del repo emisor, no la consola (§2.3).

---

## 1 · Dónde viven los ficheros y cómo los descubre la consola

    <repo>/reports/<run_id>/report.json      ← lo emite el ENCARGO. Autoría. Se versiona.
    <repo>/reports/<run_id>/verdict.json     ← lo escribe la consola al lado (§7). Se versiona.
    <repo>/reports/<run_id>/report.html      ← derivado. Va a .gitignore. No se versiona.
    <repo>/.project/reports_index.json       ← índice DERIVADO. Es lo único que la consola lee para descubrir.

Las dos primeras líneas son norma y las dos rutas del piloto existen en disco; el
versionado efectivo es del operador (hoy `verdict.json` del piloto está sin trackear), y la
línea de `.gitignore` es una dependencia declarada del repo emisor — hasta que exista,
`report.html` no se emite dentro del repo, tal como su contrato lo dejó dicho.

- **`run_id` es el nombre de la carpeta**, nunca un campo leído de dentro del fichero
  (`tools/projector/project.mjs:1571`).
- **La consola no recorre carpetas.** Descubre por el índice y compone la URL desde el
  `report_path` del propio índice, nunca desde el `run_id`
  (`project-console/assets/project-console.js:5022-5034`).
- **Cinco estados de descubrimiento, sin fusionar dos:** `index_unavailable` · `ready` ·
  `unreadable` · `filed_empty` · `not_emitted`. Vacío y ausente son dos hechos distintos y
  se pintan distintos.
- **Ningún `.md` dentro de `reports/`** — entraría en `docs_index.json`
  (`project.mjs:1298`, el escáner sólo recoge `.md` y no salta `reports/`).

---

## 2 · La cabecera del sobre

### 2.1 · Los campos

| Campo | Obligación | Qué es |
|---|---|---|
| `schema_version` | obligatorio | entero; esta versión es `1` |
| `kind` | obligatorio | `"content"` \| `"development"` |
| `mode` | obligatorio en `kind: "content"` | `"create"` \| `"audit"` — `create` es `audit` con `before: null` |
| `project`, `run_id`, `run_title`, `queue_order` | obligatorios | identidad; `run_title` verbatim del canónico; los rellena el ENCARGO, que los tiene de su ticket — el kernel no los conoce |
| `execution_path` | obligatorio | `"taller"` \| `"kernel"` |
| `emitted_by`, `emitted_when`, `emitted_at` | obligatorios | quién emitió y cuándo; `emitted_when` sólo tiene un valor definido, `"veredicto"` — otro valor exige enmienda de este contrato |
| `source_commit` | **obligatorio** | sin él el «antes» no es derivable y el reporte no cumple el contrato |
| `source_branch`, `log_dir` | obligatorios en vía kernel; `null` admitido en taller | la evidencia de ejecución que el kernel sí sabe |
| `gate` | **obligatorio** | `"suite"` \| `"human_judgment"` \| `"both"` \| `"mechanical"` — declarado, nunca inferido |
| `verification` | **obligatoria como CLAVE** | su valor puede ser `null` **con `verification_reason`** — nunca ausente. `gate: "human_judgment"` con `verification: null` razonado es CONFORME |
| `counts`, `counts_note` | opcionales | recuentos antes/después por clave; el Δ **lo calcula la vista**, nadie lo escribe |
| `locations` | opcional | `{label, path, lines, note}` |
| `pilot_deviation` | opcional | desviación declarada del propio piloto; presente → se pinta, ausente → ni sección ni enlace |
| `summary` | **obligatorio** | el resumen del emisor — **§4, y es lo nuevo de esta versión** |
| `profile`, `profile_source`, `profile_source_version`, `profile_data` | ver §5 | el mecanismo de criterios — reutilizable y NO obligatorio: `profile: null` **con `profile_reason`** es un hecho declarado, no un hueco |

### 2.2 · Los bloques

`items[]`, `blind_spots[]`, `self_decisions[]`, `alternatives[]` — **los cuatro
obligatorios aunque estén vacíos**: vacío se declara `[]`, nunca ausente. La consola pinta
la diferencia: clave ausente → «sin declarar: nadie miró»; `[]` → «ninguno»
(`run-report-renderer.js:447-453`: "EMPTY IS NOT ABSENT").

**El detalle del esquema de los cuatro bloques queda incorporado por referencia de los
§§4, 5 y 6 del contrato del emisor** — el vocabulario cerrado de `type` (`correction ·
reclassification · creation · declared_gap · decision · check · info`), las cuatro reglas
del ítem (`before`/`after` derivados de `source_commit`; `unchanged` obligatorio cuando
algo no cambió; `authority` con exactamente dos formas; `stop: true` en el ítem cuyo
rechazo detiene todo), los campos del ítem (`item_id`, `subject` con sus `previews`,
`location`, `headline`, `statement`, `options`, `why`, `evidence`, `comparisons`,
`if_rejected`, `section`, `expected`, `options_considered`), la forma de `self_decisions[]`
(`decision_id`, `what`, `why`, `scope_if_accepted`, `scope_if_rejected`, `options`) y la de
`alternatives[]` (con `authored_by` obligatorio y `evidence_regenerable_by`). **Sobre esa
base, este documento fija las correcciones ya medidas:**

- **`requires_verdict` se declara por CAMPO y nunca se deriva del `type`.** Sólo
  `requires_verdict === false` exime; el ítem se muestra igual y no cuenta para la firma.
- **`verdict_disposition_options` es el único vocabulario por ítem que la vista lee**, y
  selecciona un subconjunto de las cuatro disposiciones del sobre (§7); un valor fuera de
  ese vocabulario es deriva. `verdict_options` no se lee jamás.
- **`options_considered[]` pinta tarjetas de opción y la elección viaja como
  `chosen_option` en el veredicto — nunca es un cuarto veredicto.** El `options` propio de
  una decisión (vocabulario del emisor) no se pinta.
- **`satisfies[]` por ítem apunta a ids del perfil declarado** (en el piloto, `QZ-C-*`).
  **Un `satisfies` vacío declara su motivo en `satisfies_note`** — la regla de la ausencia
  (§4.3) aplicada al ítem; el piloto la estrenó sin que nadie se la pidiera (ítems `C1`,
  `C2`, `C4`). Esta regla es del ítem: la semántica del silencio de un criterio sigue
  siendo la decisión abierta del §6.

La forma del punto ciego queda fijada en el sobre, porque el §4 la reutiliza:

```json
{ "what": "qué no se hizo", "why_not": "por qué", "who_could": "quién podría", "affects": ["a qué alcanza"] }
```

### 2.3 · Dónde se hace cumplir

**La consola no valida el reporte, a propósito** (`run-report-renderer.js:14-15`), y pinta
lo que llegue: por presencia de campos, sin una sola rama por dominio, y con un solo fallo
posible — el JSON que no parsea, que produce un mensaje honesto y nunca una pantalla en
blanco. **La obligación de este contrato se comprueba en la suite del repo emisor**,
tolerante a la ausencia del fichero y estricta con su forma, exactamente como el §10 del
contrato del emisor lo dejó medido. **La lista de aserciones de esa suite es la tabla del
§2.1 más las reglas del §2.2 y la forma del §4** — el validador ejecutable que el §15 del
emisor mudó a este repo **no está construido**, y queda declarado como pieza futura de este
repo, no como hueco sin dueño.

**La guarda del «ausente» tampoco está construida**: queda asignada al camino de escritura
de `set-status` de la consola —el punto de serialización que sí conoce el `run_id`—, con
opt-in por proyecto. Hoy es asignación de diseño, no código.

---

## 3 · Lo que la consola PROMETE pintar

### 3.1 · Ya construido — código con tests, no intención

1. **Todo pinta por PRESENCIA DE CAMPOS.** Ausente degrada a oculto, placeholder o fallback;
   nunca a error, nunca a pantalla en blanco.
2. **Vacío ≠ ausente, siempre visible.** `[]` es «se enumeró y no había»; clave ausente es
   «nadie miró». Se pintan distintos.
3. **El contenido no se traduce nunca.** El chrome es ES/EN; el reporte es prueba y va
   verbatim.
4. **El vocabulario del veredicto es cerrado y de la consola.** `APPROVED ·
   CHANGES_REQUIRED` en el paso; `BLOCKED` sólo del run; disposición `this_run · new_run ·
   operator_fixed · discard`. Un vocabulario propio del reporte es deriva y se ignora.
5. **Los previews resuelven contra el repo emisor**, en iframe con `sandbox` vacío — nada
   que dependa de scripts se ejecuta; un asset que no llega se declara por su ruta.
6. **La consola nunca compone prosa sobre el reporte.** Ni resumen, ni narrativa, ni
   valoración. Lo derivado se muestra como cifra con su derivación, no como relato.
7. **Lo ya derivado se deriva:** el Δ de `counts`, el recuento de pasos y sus bloqueadores,
   `stopped`, y el resumen de sobrescritura de la D-066. Nadie los escribe.

### 3.2 · Prometido — la pintura del resumen es del run de la interfaz (§9)

El bloque `summary` (§4) **no lo pinta nada todavía**: el renderizador de hoy no conoce esa
clave. Lo que sigue es la promesa contra la que el run de la interfaz construye, con el
mismo principio de presencia de campos:

- El resumen del emisor se pinta verbatim, con sus tres claves y sólo ellas.
- Las cifras derivadas del §4.1 se pintan junto al resumen, calculadas del dato.
- La ausencia justificada (§4.3) se pinta como hecho declarado; la ausencia sin motivo,
  igual que una clave ausente: «sin declarar — nadie miró».

Un emisor que adopte este contrato antes de ese run pierde nada: el dato queda emitido y la
vista lo alcanza retroactivamente — cambiar la vista mejora todo lo ya emitido.

---

## 4 · El RESUMEN del emisor — las tres capas de la D-065

**El origen es una medición del operador**, dentro del piloto real: podía ver en qué puntos
hacía falta una decisión suya y no podía ver qué miró el run, qué revisó, qué decidió ni qué
encontró — y eso le hacía más difícil decidir. Y su condición, con sus palabras: *«puede
estar ausente con motivo pero es obligatorio que explique ese motivo aunque sea brevemente,
para que no simplemente se lo salte, sino que realmente por alguna justificación no lo
hizo.»*

**El resumen es del EMISOR y la consola sólo lo pinta.** Sólo quien ejecutó sabe en qué se
fijó; un resumen compuesto por la consola sería prosa generada sobre datos, que es
exactamente lo que el operador no quiere (D-065, decisión 1).

### 4.1 · Capa DERIVADA — se calcula del propio reporte y nadie la escribe

El sobre **no define ninguna clave** para estas cifras: no existen como campo escribible.
La consola las deriva del dato — exista o no el resumen — y las pinta junto a él (§3.2):

| Cifra | De dónde sale |
|---|---|
| Cobertura de criterios | `items[].satisfies` × ids del perfil — **su semántica es la decisión abierta del §6** |
| Ítems por tipo | recuento de `items[].type` |
| Pasos que piden veredicto | `items[] + self_decisions[]` con `requires_verdict !== false`, más el paso del run |
| Compuerta y su verificación | `gate` + `verification` / `verification_reason` |
| Recuentos y su Δ | `counts` — el Δ es `after − before`, calculado |
| Bloques declarados / vacíos / ausentes | presencia de clave, `hasOwnProperty` |

**Si un reporte escribe una de estas cifras en su resumen, la consola no la lee.** Las
cifras pintadas salen del dato, nunca de la prosa. Es la guarda mecánica de la capa: una
cifra derivada no puede mentir sobre el trabajo porque sale del trabajo.

### 4.2 · Capa ESCRITA — acotada por forma a tres preguntas fijas

```json
"summary": {
  "exercised": "Qué superficie se ejerció DE VERDAD — no la que se pretendía.",
  "criteria":  "Con qué criterios se miró — incluidos los que el ejecutor adoptó y el perfil no tenía.",
  "outcome":   "Qué salió."
}
```

- **`exercised`** — qué se leyó, compiló, midió o recorrió **de verdad**. Lo pretendido y
  no ejercido no va aquí: va a `blind_spots[]`, y aquí se cita.
- **`criteria`** — con qué se miró: los grupos de ids del perfil ejercidos, y **los
  criterios que el ejecutor adoptó sin que el perfil los tuviera**, citados por su
  `decision_id` en `self_decisions[]`. Si un criterio se declaró irreproducible (§5.3), se
  dice aquí.
- **`outcome`** — qué salió, en una o dos frases, citando `item_id`s.

**La presencia del bloque y de sus tres claves es obligatoria. El contenido de cada una es
opcional — y LA AUSENCIA DECLARA SU MOTIVO** (§4.3). Cada clave admite exactamente dos
formas: su prosa, o el objeto de ausencia del §4.3. **Una cadena vacía no es ninguna de las
dos** — es la ausencia sin motivo que la D-065 prohíbe, y se pinta como tal. Un reporte sin
el bloque `summary` (todo lo emitido antes de este contrato) se pinta con la regla general:
«sin declarar — nadie miró», sin retocar el reporte hacia atrás.

### 4.3 · La ausencia justificada — se reutiliza la forma del punto ciego, no se inventa otra

**Medido antes de inventar forma:** el contrato ya tenía vocabulario para «no se hizo y por
qué» — el punto ciego (`what · why_not · who_could · affects`, §2.2), que el piloto usó
cuatro veces; y el propio reporte inventó espontáneamente la misma figura a nivel de ítem
(`satisfies: []` + `satisfies_note`, tres veces). **La forma sirve y se reutiliza.** Una
pregunta del resumen que no se contesta lleva, en vez de su prosa:

```json
"exercised": { "absent": { "why_not": "por qué no se contesta, aunque sea brevemente",
                           "who_could": "quién podría contestarla — opcional" } }
```

`what` sobra —lo nombra la propia clave— y `affects` es opcional. **`why_not` no es
opcional:** su ausencia hace el reporte no conforme, y la promesa del §3.2 es pintar la
clave sin `why_not` igual que una clave ausente: «sin declarar — nadie miró».

### 4.4 · Capa PROHIBIDA — lo que el resumen no puede hacer

1. **No puede afirmar nada que los ítems no sostengan.** Toda afirmación cita ids; una
   afirmación sin ítem que la sostenga es materia del veredicto del operador —sus campos
   `note` (§7) y la QA del run—, y se trata como defecto del reporte.
2. **No puede repetir lo que ya dice otro bloque.** Se cita (`item_id`, `decision_id`, id
   de criterio), no se reproduce. El coste de la duplicación ya está medido y declarado
   como asunto «del emisor y del sobre» en la QA de la superficie (el ítem del fixture de
   lección cuya prosa repite el rótulo que la vista pone); este párrafo es el sobre
   recogiéndolo.
3. **No puede traer cifras derivables** — §4.1: la consola no las leería, y un emisor que
   las escribe está pidiendo que su prosa contradiga al dato en pantalla.

---

## 5 · Los criterios: el perfil y `satisfies`

**Nada de este apartado se inventa aquí: el mecanismo está construido, se estrenó, y
produjo su primera cifra.** Este documento le dice al contrato lo que ya es verdad.

### 5.1 · La declaración

```json
"profile": "cantu-quizzes-latex/PERFIL-REPORTE-QUIZZES-v1",
"profile_source": "docs/RUBRICA-DE-NIVELES.md",
"profile_source_version": "v2",
"profile_data": { "…": "las cifras que el perfil exige" }
```

- **El perfil es reutilizable y NO obligatorio.** Un run sin perfil declara
  `profile: null` con `profile_reason`, y eso **es un hecho declarado, no un hueco** — la
  consola ya lo pinta así (`run-report-renderer.js:1289-1291`).
- **`profile_source_version` es obligatorio cuando hay perfil**: los ids se derivan de una
  versión concreta de la fuente, y declarar una versión que no existía **al emitir** es
  decir algo falso del propio criterio. Cuando la fuente cambie de versión, el perfil se
  re-deriva antes del run siguiente; **los reportes ya emitidos conservan la versión con la
  que se midieron** — son mediciones fechadas y no se falsifican hacia atrás.
- **Los ids son estables y no se reutilizan jamás.** Un id que desaparece en la re-derivación
  no cambia de dueño — misma política que los códigos de pregunta, por la misma razón.
- **El inventario de ids viaja con el comando que lo cuenta.** El perfil del piloto lo hace
  —29 ids `QZ-C-*`, con su `grep` publicado en el propio documento— después de que dos
  hilos publicaran cifras distintas el mismo día (30 y 32; consta en el inventario del
  propio perfil, §0).

### 5.2 · La regla que impide la cobertura falsa

**Un criterio reutilizable no es un enunciado con un id: es un id más un chequeo tan
concreto que dos ejecutores distintos saquen el mismo número.** Está medido en el reporte
del estreno: la rúbrica afirma «88 de 90 distractoras explicadas»; el ejecutor obtuvo **1 en
lectura estricta y 5 en amplia**, porque la §6.4 nunca define qué cuenta como explicar una
distractora. **Un criterio sin chequeo sale verde y no significa nada.**

### 5.3 · Declarar un criterio irreproducible, en vez de fingir que se cumplió

**El principio es del sobre; la ubicación de las cifras es del perfil.** Un run que no
puede reproducir la cifra de un criterio **lo declara en vez de publicar el número**: la
cifra va nula, el motivo va escrito, y un punto ciego nombra con `who_could` a quien puede
definir el chequeo. La forma ya existe — el piloto la estrenó dentro de su `profile_data`
(campo `distractor_explained`: `count: null`, `total: 90`, y el motivo en `criterio_usado`,
terminando «La cifra «88 de 90» de la rubrica NO es reproducible», con su punto ciego
apuntando a «La rúbrica v3, al definir el criterio»). Un reporte que declara un criterio
irreproducible está cumpliendo el contrato; uno que publica una cifra sin el chequeo que la
reproduce, no.

---

## 6 · La cobertura — DECISIÓN ABIERTA DEL OPERADOR · esta sección NO se congela

**El encuadre, medido en el reporte del estreno.** La cobertura se deriva de
`items[].satisfies` contra los ids del perfil. En el piloto: **29 ids, 10 tocados, 19 sin
tocar; de esos 19, 5 declarados como punto ciego** (`blind_spots[].affects`) **y 14 en
silencio** (comandos en Anexo A). El perfil propone leer el silencio así: «hueco visible.
El run no comprobó algo que la rúbrica exige» (PERFIL §2.2).

**Pero los 14 silenciosos no son una sola cosa. Son al menos cuatro, y las cuatro están en
el mismo reporte:**

| Situación | Evidencia en el piloto |
|---|---|
| **(a) Cumplido por la cabecera, sin ítem que lo cite** | `QZ-C-COUNT-DECLARE` exige el recuento antes/después por nivel — y `counts{}` lo trae. Pintarlo «no comprobado» sería falso |
| **(b) Revisado y limpio, declarado sólo en prosa** | `QZ-C-HARD-MULTI`: `counts_note` dice «Verificado en texto crudo: `\begin{multi}` = `\end{multi}`…». `QZ-C-POS`: `profile_data.position_refs_fixed: 1`, corregida en `cae3050` — y a la vez cuenta entre los «11 requisitos sin un solo check» |
| **(c) No disparado / no aplicable esta vez** | `QZ-C-COUNT-REPLACE` con cero bajas; las dimensiones `QZ-C-DIM-FORMULA/DISTANCE/ARITH`, que se citan sólo cuando mueven un veredicto |
| **(d) Silencio de verdad — nadie puede saberlo** | `QZ-C-HARD-NOCALC`, `KEYTRUE`, `VALIDOPT`, `EXACT`: el reporte no permite distinguir «revisado y limpio» de «nunca mirado» |

**Por qué esto es una decisión del operador y no de este run:** lo que se decida es lo que
la cobertura PROMETE en todas las revisiones de quiz que siguen. Leer el silencio como «no
revisado» pinta huecos falsos en (a) y (b); leerlo como algo más blando convierte (d) en
cobertura falsa — el verde que no significa nada del §5.2. **«No revisado» y «no aplica» no
son la misma afirmación, y hoy el dato no puede transportar la diferencia.**

**Las opciones, como encuadre y no como decisión** — las dos últimas componen:

1. **Silencio = «no revisado», lectura dura** (el PERFIL §2.2 tal cual). Quien revisó y
   encontró limpio lo declara con un ítem `check` con su `satisfies` (el tipo ya existe en
   el vocabulario); «no aplica» se declara. Coste: los reportes honestos parecen peores
   hasta que declaran. Ganancia: el silencio nunca se confunde con cobertura.
2. **Declaración explícita por criterio** — extender «la ausencia declara su motivo» hasta
   el criterio: una forma para «revisado y limpio» y otra para «no aplica, y por qué»
   (la figura de `satisfies_note` apunta en esa dirección y ya se usa).
3. **Silencio = «sin declarar», estado propio** — pintado como tal, sin afirmar ni
   revisión ni inaplicabilidad, igual que la consola distingue hoy vacío de ausente. No
   afirma nada falso, pero por sí solo no obliga a nadie a declarar.

**Interinidad, dicha con todas las letras para que el operador la vea:** hasta que él
decida, la consola pinta lo que sí tiene dueño —criterios tocados y criterios declarados en
puntos ciegos— y **el resto lo pinta «sin declarar», sin afirmar su significado.** Ese
comportamiento coincide en superficie con la opción 3, y **no es la decisión**: es la
no-promesa — lo único que se puede pintar sin decidir por el operador. La decisión sigue
abierta y sigue siendo suya.

---

## 7 · `verdict.json` — lo que escribe el humano, como ya se escribe

La forma es la que la consola escribe hoy — medida del fichero real del piloto, no de un
diseño:

```json
{ "schema_version": 1, "run_id": "…", "project": "…", "source_commit": "…", "gate": "…",
  "verdict_by": "…", "decided_at": "…", "stopped": false,
  "run":   { "verdict": "APPROVED", "disposition": null, "chosen_option": null, "note": null },
  "items": [ { "item_id": "…", "verdict": "…", "disposition": "…", "chosen_option": null, "note": null } ],
  "self_decisions": [ { "decision_id": "…", "index": 0, "verdict": "…", "…": "…" } ] }
```

- **Vocabulario cerrado del sobre:** paso `APPROVED · CHANGES_REQUIRED`; run además
  `BLOCKED`. `stopped` **se deriva** (un ítem `stop` rechazado) y nunca se elige.
  `chosen_option` transporta la elección entre `options_considered` y nunca es un cuarto
  veredicto. `note` es el canal del operador por paso y para el run.
- **Un paso con `verdict: null` no se lee jamás como aprobado.** Es el marcador de «sin
  revisar» dentro de un fichero firmado.
- **El fichero sólo existe firmado.** Los borradores viven en la vista y no tocan disco;
  por eso «hay `verdict.json`» y «hay veredicto» son la misma afirmación — sobre la firma,
  no sobre el juicio: un fichero firmado para probar la herramienta lo dice su registro,
  no el fichero.
- **La guarda de la contradicción:** el run no puede firmarse `APPROVED` mientras un paso
  en `CHANGES_REQUIRED` no lleve disposición o la lleve `this_run`. No es agregación — el
  veredicto del run nunca se calcula desde los pasos; es impedir que el operador firme una
  contradicción.
- **Firmar sobre un veredicto existente NUNCA es escritura directa** (D-066, construida y
  probada en el `#58`): aviso con resumen derivado de comparar los dos ficheros, y
  confirmación explícita — también cuando no cambia nada, y diciéndolo.
- **`decided_at` lo sella quien escribe, no la vista.** `report_sha256` como atadura a la
  versión juzgada queda declarado como destino; el fichero real de hoy no lo lleva aún.

---

## 8 · El estreno — este contrato aplicado al reporte real, 2026-08-14

Aplicado a
`projects/cantu-quizzes-latex/reports/RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001/report.json`
(perfil `PERFIL-REPORTE-QUIZZES-v1`, rúbrica v2). Sin escribir nada en aquel repo.

### 8.1 · Lo que el sobre habría encontrado conforme

Cabecera completa (identidad, `execution_path`, emisión, `source_commit: "5fb98c4"`);
`gate: "human_judgment"` con `verification: null` **y su razón** — conforme; `counts` con
nota; 4 `locations`; `pilot_deviation` declarada; los cuatro bloques presentes —
`blind_spots` con 4 entradas, `self_decisions` con 2, `alternatives: []` declarado vacío;
perfil declarado con fuente y versión; `satisfies` en 15 de 18 ítems y **los 3 vacíos con
su `satisfies_note`**; un criterio declarado irreproducible con la forma del §5.3.
(Comandos de todas estas cifras: Anexo A.)

### 8.2 · Qué campos habrían quedado vacíos, y qué motivo habrían tenido que declarar

**El bloque `summary` entero — las tres preguntas.** El motivo que habría tenido que
declarar es el mismo que el reporte ya declara en `pilot_deviation`: **el contrato no
existía cuando el run entregó.** Con la forma del §4.3:

```json
"summary": {
  "exercised": { "absent": { "why_not": "El run entregó y commiteó antes de que este contrato existiera; su registro (context/cantu-quizzes-latex/records/PILOTO-FRACCIONES-Y-QA-PENDIENTE.md) contiene el material, sin transcribir.", "who_could": "El emisor, transcribiendo de su record — la misma vía que pilot_deviation; o su siguiente run." } },
  "criteria":  { "absent": { "why_not": "Mismo motivo. Parte es reconstruible del dato (satisfies, D1), pero la respuesta escrita es del emisor y nadie la escribió.", "who_could": "El emisor." } },
  "outcome":   { "absent": { "why_not": "Mismo motivo. Los ítems lo sostienen; nadie lo escribió.", "who_could": "El emisor." } }
}
```

Ninguna otra clave del sobre habría quedado ausente sin motivo declarable.

### 8.3 · El veredicto sobre el contrato mismo

1. **La forma del punto ciego SIRVE para la ausencia justificada — se reutiliza y no se
   inventó nada.** Medido: 4 usos en `blind_spots`, 3 en `satisfies_note`, y la ausencia
   del resumen (§8.2) se declara con ella sin forzarla. La cuestión que la D-065 dejó
   nombrada queda resuelta con reutilización.
2. **La semántica de la cobertura dispara la parada prevista.** Cómo se declara el silencio
   cambia lo que el sistema promete (§6, cuatro situaciones medidas). **Este run no lo
   decide: el §6 queda abierto y encuadrado para el operador.**
3. **Hallazgo para el emisor — 9 ausencias sin motivo, medidas:** los 9 ítems `P90-*`
   declaran `feedback_chars` de 1172 a 1512 con `subject.feedback: ""` — la cifra afirma un
   contenido que el campo no trae, `QZ-R-07` exige «la retroalimentación completa», y un
   vacío sin motivo es exactamente lo que la D-065 prohíbe. Comando en Anexo A.
4. **Hallazgo para el emisor — `QZ-R-06` a medias:** `profile_data.position_refs_fixed: 1`
   sin el ítem por referencia corregida que el propio perfil exige — y por eso `QZ-C-POS`
   figura a la vez como «corregido» en `profile_data` y entre los 11 requisitos sin check.
   Es la evidencia (b) del §6, y es de ellos arreglarla.
5. **«Lo derivable se deriva» queda probado con la cifra que ya se publicó mal dos veces:**
   los pasos que piden veredicto son **11** — 8 ítems más 2 decisiones más el paso del run;
   la cabina publicó 8 y el emisor 10. La cifra derivada con su comando (Anexo A) cierra la
   discusión; escrita a mano, ya falló dos veces de dos.
6. **La presencia obligatoria del resumen es lo que hace visible su falta.** El reporte del
   piloto es conforme con su contrato de origen y aun así el operador no podía ver qué se
   miró — lo detectó él, no una suite. Con `summary` obligatorio y la ausencia justificada,
   esa invisibilidad deja de ser silenciosa.

**Veredicto: el contrato se estrenó y SIRVE — con una sección abierta (§6) que es del
operador, y dos hallazgos (§8.3.3, §8.3.4) que se envían al emisor, no se le imponen.**
Un contrato que no se estrena no se congela; éste queda estrenado y **no se congela hasta
la decisión del §6 y la aprobación del operador.**

---

## 9 · Lo que este documento NO hace

- **No toca el renderizador ni ningún asset de la consola.** La interfaz es el run
  siguiente: pinta por presencia de campo, ciega al dominio, barata de iterar con el
  operador mirando. Este documento es la parte cara y difícil de deshacer, y por eso fue
  primero. Todo lo marcado PROMETIDO (§3.2) es de ese run.
- **No modifica el contrato ni el repo del emisor.** Los hallazgos del §8.3 se les envían;
  adoptarlo es suyo.
- **No decide el §6.** Esa decisión es del operador, y el documento la trae encuadrada —
  incluida su interinidad, nombrada para que no pase por decisión.
- **No commitea.** Git es del operador; este fichero se entrega sin trackear.
- **No arregla los textos rancios de la consola** (el rótulo que promete escribir y
  descarga, el arranque que se dice de sólo lectura). Eso es el `#64`.

---

## Anexo A · Mediciones — toda cifra con su comando

Ejecutar desde `projects/cantu-quizzes-latex/`. `R` = `reports/RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001/report.json`.

**29 ids `QZ-C-*` en el perfil** (el comando es el del propio perfil):

```bash
grep -oP '^\| `\KQZ-C-[A-Z0-9-]+' docs/PERFIL-REPORTE-QUIZZES-v1.md | sort -u | wc -l
```

**10 criterios tocados · 19 sin tocar · 5 declarados en puntos ciegos · 14 en silencio:**

```bash
node -e "const fs=require('fs');const p=fs.readFileSync('docs/PERFIL-REPORTE-QUIZZES-v1.md','utf8');const ids=[...new Set([...p.matchAll(/^\| \`(QZ-C-[A-Z0-9-]+)\`/gm)].map(m=>m[1]))];const r=JSON.parse(fs.readFileSync('reports/RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001/report.json','utf8'));const t=new Set(r.items.flatMap(i=>i.satisfies||[]));const un=ids.filter(x=>!t.has(x));const bl=new Set(r.blind_spots.flatMap(b=>(b.affects||[]).filter(a=>a.startsWith('QZ-C-'))));const sil=un.filter(x=>!bl.has(x));console.log('tocados',t.size,'| sin tocar',un.length,'| en blind_spots',[...bl].length,'| silencio',sil.length);console.log('silencio:',sil.join(' '))"
```

**11 requisitos sin un solo check** (los marcados «requisito» más las 7 restricciones
duras, menos los tocados — coincide con la publicación del emisor: los cinco `QZ-C-FB-*`,
cinco `QZ-C-HARD-*` y `QZ-C-POS`):

```bash
node -e "const fs=require('fs');const p=fs.readFileSync('docs/PERFIL-REPORTE-QUIZZES-v1.md','utf8');const req=[...p.matchAll(/^\| \`(QZ-C-[A-Z0-9-]+)\`[^\n]*requisito/gm)].map(m=>m[1]);const hard=[...new Set([...p.matchAll(/^\| \`(QZ-C-HARD-[A-Z0-9-]+)\`/gm)].map(m=>m[1]))];const all=[...new Set([...req,...hard])];const r=JSON.parse(fs.readFileSync('reports/RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001/report.json','utf8'));const t=new Set(r.items.flatMap(i=>i.satisfies||[]));const u=all.filter(x=>!t.has(x)).sort();console.log(u.length,'->',u.join(' '))"
```

**11 pasos que piden veredicto — 8 ítems + 2 decisiones + 1 (el run):**

```bash
node -e "const r=require('./reports/RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001/report.json');const it=r.items.filter(x=>x.requires_verdict!==false).length;const sd=r.self_decisions.filter(x=>x.requires_verdict!==false).length;console.log(it,'items +',sd,'decisiones + 1 run =',it+sd+1)"
```

**Composición del reporte** — 18 ítems (`info` 10 · `correction` 5 · `reclassification` 2 ·
`declared_gap` 1), 4 puntos ciegos, 2 decisiones propias, `alternatives` vacío declarado,
4 `locations`:

```bash
node -e "const r=require('./reports/RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001/report.json');const by={};r.items.forEach(i=>by[i.type]=(by[i.type]||0)+1);console.log(r.items.length,JSON.stringify(by),'| blind_spots',r.blind_spots.length,'| self_decisions',r.self_decisions.length,'| alternatives',r.alternatives.length,'| locations',r.locations.length)"
```

**`satisfies` en 15 de 18 ítems, y los 3 vacíos con su `satisfies_note`:**

```bash
node -e "const r=require('./reports/RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001/report.json');const w=r.items.filter(i=>Array.isArray(i.satisfies)&&i.satisfies.length>0);const e=r.items.filter(i=>Array.isArray(i.satisfies)&&i.satisfies.length===0);console.log(w.length+' de '+r.items.length+' con satisfies |',e.length,'vacios:',e.map(i=>i.item_id+(i.satisfies_note?' (con nota)':' (SIN nota)')).join(', '))"
```

**Ninguna clave de resumen en el reporte del piloto** (la medición de la D-065):

```bash
node -e "const r=require('./reports/RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001/report.json');console.log(Object.keys(r).join(', '))"
```

**Las 9 ausencias sin motivo del §8.3.3, con su rango 1172–1512:**

```bash
node -e "const r=require('./reports/RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001/report.json');const c=r.items.filter(i=>i.subject&&i.subject.feedback===''&&i.subject.feedback_chars>0);const n=c.map(i=>i.subject.feedback_chars);console.log(c.length,'->',c.map(i=>i.item_id).join(' '),'| rango',Math.min(...n),'-',Math.max(...n))"
```

**El veredicto en disco** (run `APPROVED` · pasos 7 `APPROVED`, 1 `CHANGES_REQUIRED`, 10
`null` · `D1`/`D2` `APPROVED` — y consta en el registro del `#58` que el operador declaró
este `APPROVED` no real, firmado para probar la herramienta):

```bash
node -e "const v=require('./reports/RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001/verdict.json');const c={};v.items.forEach(i=>{const k=i.verdict===null?'null':i.verdict;c[k]=(c[k]||0)+1});console.log('run',v.run.verdict,JSON.stringify(c),v.self_decisions.map(d=>d.decision_id+':'+d.verdict).join(' '))"
```
