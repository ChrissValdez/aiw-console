# Sobre del reporte de run · v1 — `report.json`, su resumen, y lo que la consola promete pintar

> **BORRADOR, 2026-08-14 · enmendado el 2026-08-15. NO APROBADO.** Lo emite
> `RUN-CONSOLE-REPORT-ENVELOPE-CONTRACT-001` (`#59`) del hilo `aiw-console`. **Nadie
> construye contra este documento hasta que el operador lo apruebe.**
>
> **La enmienda del 2026-08-15 — el §6 dejó de ser una sección abierta.** La semántica de la
> cobertura la fija la **D-067**: *el silencio significa «no revisado»*. Formulación de la
> cabina, **aprobada por el operador** tras leer las tres opciones que este documento dejó
> encuadradas — no se le atribuyen palabras que no dijo. La decisión entra en el §6 completo
> y toca además el §2.1, el §2.2, el §2.3, el §3.2, el §4.1 y el §5.4. **El estreno se
> volvió a medir bajo la regla nueva: §8.4.** Sigue siendo la **v1**: este documento se está
> terminando, no sustituyendo.
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
> con su perfil delante— **antes de darse por bueno**, y **re-medido el 2026-08-15 sobre ese
> mismo reporte bajo la regla de la D-067. El estreno, su veredicto sobre este contrato y la
> re-medición están en el §8.** Toda cifra de este documento viaja con el comando que la
> produce (Anexo A).

---

## 0 · Quién es quién — lo que este documento obliga y lo que no

Hoy no está dicho en ningún sitio cuál contrato es de quién. Queda dicho aquí:

| Pieza | Quién la escribe | Dónde vive |
|---|---|---|
| **El SOBRE** — los campos comunes a todo run de cualquier proyecto, el resumen del emisor, y `verdict.json` | **`aiw-console`** — este documento | `projects/aiw-console/docs/SOBRE-DEL-REPORTE-v1.md` |
| **La PROMESA de pintura** — qué hace la consola con cada campo presente, ausente o vacío | **`aiw-console`** — este documento la declara (§3), separando lo construido de lo prometido; la fuente de lo construido es `project-console/assets/run-report-renderer.js`, `run-report-surface.js` y sus tests | este repo |
| **El CONTRATO de dominio** — qué tiene que ser cierto del contenido revisado, y su rúbrica | **la CABINA del proyecto que emite** (D-069) | p. ej. `cantu-quizzes-latex/docs/RUBRICA-DE-NIVELES.md` |
| **El PERFIL** — los ids estables de los criterios del dominio y qué evidencia exige cada uno | **la CABINA del proyecto que emite** (D-069) | p. ej. `cantu-quizzes-latex/docs/PERFIL-REPORTE-QUIZZES-v1.md` |

**El principio que reparte, y viene de `CONTRATO.md` de este repo: la norma la escribe quien
lee.** La consola es la lectora del sobre — por eso el sobre es suyo. El contenido lo lee el
operador con la rúbrica del dominio delante — por eso los criterios son del emisor.

**ENMIENDA D-069, 2026-08-15 — segundo eje del reparto, y no lo tenía.** Las dos filas de
arriba decían «el proyecto que emite» y eso dejaba sin decidir **quién dentro de ese
proyecto**. Queda decidido: **el catálogo de criterios lo escribe y lo revisa la CABINA del
proyecto dueño, en fase de diseño del run, y el EJECUTOR sólo lo toma.** Es la separación
adversaria aplicada al criterio mismo: *quien mide para juzgar no puede ser quien escribió
la expectativa*, y hasta hoy el perfil lo mantenía quien ejecuta. El eje del reparto ya no
es sólo **qué proyecto**, sino **qué proyecto Y en qué fase**.

**Excepción de PILOTO, acotada y con caducidad declarada.** El catálogo del piloto de
quizzes se redacta **en `aiw-console`**, porque el ida y vuelta entre hilos añade fricción
que un piloto no debe pagar. **Nace con destino declarado**: se muda al repo del emisor en
su run de adopción. **Es la única excepción y no se extiende**: el siguiente catálogo —de
`cantu-quizzes-latex` o de cualquier otro proyecto— se escribe en la cabina de su dueño.

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
| `counts`, `counts_note` | opcionales | recuentos antes/después por clave; el Δ **lo calcula la vista**, nadie lo escribe. Es una de las cabeceras **donde vive evidencia**, y por eso un `header_satisfies` puede apuntarla (§6.3) |
| `locations` | opcional | `{label, path, lines, note}` |
| `pilot_deviation` | opcional | desviación declarada del propio piloto; presente → se pinta, ausente → ni sección ni enlace |
| `summary` | **obligatorio** | el resumen del emisor — **§4, y es lo nuevo de esta versión** |
| `profile`, `profile_source`, `profile_source_version`, `profile_data` | ver §5 | el mecanismo de criterios — reutilizable y NO obligatorio: `profile: null` **con `profile_reason`** es un hecho declarado, no un hueco. `profile_data` es la otra cabecera donde vive evidencia (§6.3) |
| `header_satisfies` | opcional | las citas de criterio que cuelgan de la **cabecera** y no de un ítem — forma, guardas y derivación en el **§6.3**. Ausente es lo normal: sólo lo escribe quien tiene evidencia en cabecera que ningún ítem cita |

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
  `C2`, `C4`). **`satisfies: []` dice que ESE ÍTEM no cita ningún criterio; no dice de
  ningún criterio que esté sin cubrir** — la distinción sostiene el §6.3.
- **`satisfies` no es exclusivo del ítem: puede colgar también de la cabecera donde vive la
  evidencia** (D-067), con su forma y sus guardas en el **§6.3**. La semántica del silencio
  de un criterio está fijada y es el **§6**.

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
§2.1, las reglas del §2.2, la forma del §4 y las tres guardas del §6.3** — el validador
ejecutable que el §15 del emisor mudó a este repo **no está construido**, y queda declarado
como pieza futura de este repo, no como hueco sin dueño.

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

### 3.2 · Prometido — el resumen y LA COBERTURA son del run de la interfaz (§9)

**Medido, no supuesto:** el renderizador de hoy **no lee `satisfies` ni `profile_data` — ni
una vez** (comando en Anexo A). De ahí se siguen dos hechos que este documento no puede
dejar implícitos: el bloque `summary` (§4) **no lo pinta nada todavía**, y **la cobertura
del §6 tampoco se pinta hoy en absoluto** — ni los criterios tocados, ni los declarados en
puntos ciegos. Lo que sigue es la promesa contra la que el run de la interfaz construye, con
el mismo principio de presencia de campos:

- El resumen del emisor se pinta verbatim, con sus tres claves y sólo ellas.
- Las cifras derivadas del §4.1 se pintan junto al resumen, calculadas del dato.
- La ausencia justificada (§4.3) se pinta como hecho declarado; la ausencia sin motivo,
  igual que una clave ausente: «sin declarar — nadie miró».
- **La cobertura se pinta con los tres cubos del §6.4 y con esos rótulos** — cumplido y
  declarado · declarado sin cumplir · **silencio, que se pinta «no revisado»**. El silencio
  no se pinta neutro: pintarlo «sin declarar» sería seguir sin decidir después de decidido.
- **`profile_data` y `header_satisfies` se pintan**, porque son la evidencia que una cita de
  cabecera invoca: una cita cuyo `where` el operador no puede ver en pantalla es una cita
  que no puede comprobar.
- **La consola no clasifica el porqué de un criterio declarado.** Pinta el `why_not`
  verbatim (§6.4): distinguir «no aplica» de «no pude» es leer prosa, y componer prosa sobre
  el reporte le está prohibido (§3.1.6).

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

El sobre **no define ninguna clave** para estas cifras: no existen como campo escribible. Se
derivan del dato — exista o no el resumen — y se pintan junto a él. **Cuáles están
construidas y cuáles prometidas lo reparte el §3**: el Δ de `counts` y la presencia de los
bloques ya están en código; **la cobertura de criterios no se pinta todavía de ninguna
forma** (§3.2, medido).

| Cifra | De dónde sale |
|---|---|
| Cobertura de criterios | **la unión de TODOS los `satisfies` del reporte** —los de `items[]` y los de `header_satisfies[]`— **menos** los ids declarados en `blind_spots[].affects`, contra los ids del perfil. Su semántica la fija el **§6**; la derivación exacta, el **§6.4** |
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
lectura estricta y 5 en amplia**, porque la §6.4 **de la rúbrica** nunca define qué cuenta
como explicar una distractora. **Un criterio sin chequeo sale verde y no significa nada.**

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

### 5.4 · Un criterio irreproducible NO cuenta como cumplido — y por eso hay que poder derivarlo

**Lo añade la D-067 (regla 5), y cierra un hueco que el §5.3 dejaba abierto:** declarar un
criterio irreproducible y **seguir contándolo como cubierto** es la cobertura falsa del §5.2
por otra puerta. Un criterio declarado irreproducible sale de los cumplidos y pasa a los
declarados (§6.4).

**Y para que salga, la declaración tiene que ser legible por la derivación, no sólo por el
lector.** No se inventa forma: **la irreproducibilidad se declara con la forma del punto
ciego, con el id del criterio en `affects`** — la misma vía por la que se declaran «no
aplica» y «no disparado» (§6.1, regla 4). El motivo y la cifra nula siguen donde el §5.3 los
puso; lo que `affects` añade es el enganche que la cobertura puede leer.

**Medido en el estreno, y es exactamente el hueco:** el piloto declara la irreproducibilidad
de la **§6.4 de la rúbrica** dos veces —en `profile_data.distractor_explained.criterio_usado` y en un punto
ciego— **y ninguna de las dos nombra `QZ-C-DISTR`**: el punto ciego apunta al ítem `I1`. El
ítem `I1` sí cita `QZ-C-DISTR` en su `satisfies`. Resultado: **la derivación lo cuenta como
cumplido, y no lo está.** El arreglo es un id dentro de un `affects` que ya existe (§8.4).

---

## 6 · La cobertura — DECIDIDA: el silencio significa «no revisado» (D-067, 2026-08-15)

**El encuadre, medido en el reporte del estreno, y se conserva porque es lo que hace la
decisión inteligible dentro de seis meses.** La cobertura se deriva de `satisfies` contra
los ids del perfil. En el piloto: **29 ids, 10 tocados, 19 sin tocar; de esos 19, 5
declarados como punto ciego** (`blind_spots[].affects`) **y 14 en silencio** (comandos en
Anexo A). El perfil propone leer el silencio así: «hueco visible. El run no comprobó algo
que la rúbrica exige» (PERFIL §2.2).

**Y los 14 silenciosos no son una sola cosa. Son cuatro, y las cuatro están en el mismo
reporte:**

| Situación | Evidencia en el piloto |
|---|---|
| **(a) Cumplido por la cabecera, sin ítem que lo cite** | `QZ-C-COUNT-DECLARE` exige el recuento antes/después por nivel — y `counts{}` lo trae. Pintarlo «no comprobado» sería falso |
| **(b) Revisado y limpio, declarado sólo en prosa** | `QZ-C-HARD-MULTI`: `counts_note` dice «Verificado en texto crudo: `\begin{multi}` = `\end{multi}`…». `QZ-C-POS`: `profile_data.position_refs_fixed: 1`, corregida en `cae3050` — y a la vez cuenta entre los «11 requisitos sin un solo check» |
| **(c) No disparado / no aplicable esta vez** | `QZ-C-COUNT-REPLACE` con cero bajas; las dimensiones `QZ-C-DIM-FORMULA/DISTANCE/ARITH`, que se citan sólo cuando mueven un veredicto |
| **(d) Silencio de verdad — nadie puede saberlo** | `QZ-C-HARD-NOCALC`, `KEYTRUE`, `VALIDOPT`, `EXACT`: el reporte no permite distinguir «revisado y limpio» de «nunca mirado» |

**Por qué la decisión era del operador y no de este run:** lo que se decidiera es lo que la
cobertura PROMETE en todas las revisiones de quiz que siguen. Leer el silencio como «no
revisado» pinta huecos falsos en (a) y (b) mientras nadie los declare; leerlo como algo más
blando convierte (d) en cobertura falsa — el verde que no significa nada del §5.2. **«No
revisado» y «no aplica» no son la misma afirmación, y el dato de aquel día no podía
transportar la diferencia.** La D-067 la hace transportable: (a) y (b) dejan de ser huecos
porque se citan desde donde vive su evidencia, y (c) deja de ser silencio porque se declara.

**Una quinta situación apareció al re-medir, DESPUÉS de la decisión, y es del operador:**
está en el **§8.4**, con su medición y su parada declarada. No se mete en esta tabla, que es
el encuadre sobre el que él decidió.

### 6.1 · Lo que queda fijado

1. **El silencio significa «NO REVISADO».** Lectura dura, la del perfil §2.2 tal cual.
2. **Quien revisó y encontró limpio lo DECLARA.** No hay cobertura por sobreentendido.
3. **`satisfies` puede colgar también de la cabecera donde vive la evidencia** —`counts`,
   `profile_data`— y no sólo de un ítem. Es la extensión que hace barata la lectura dura:
   resuelve sin ceremonia (a) y (b). Forma y guardas, **§6.3**.
4. **«No aplica» y «no disparado» se declaran con la forma del punto ciego** —`what`,
   `why_not`, `who_could`, `affects` (§2.2)—, que ya está medida y ya se usa. **No se
   inventa forma nueva.** Con el id del criterio en `affects`, que es lo que la cobertura
   lee (§6.4).
5. **Un criterio no reproducible se declara como tal y no cuenta como cumplido** — §5.4.

### 6.2 · Por qué se descartaron las otras dos — por su consecuencia, no por gusto

- **«Silencio = sin declarar», estado propio:** no afirma nada falso, pero
  **institucionaliza la ausencia sin motivo**, que es exactamente lo que la D-065 prohíbe.
  Nadie queda obligado a declarar nada, y un estado que no obliga a nadie no cierra (d):
  el reporte sigue sin permitir distinguir «revisado y limpio» de «nunca mirado».
- **Declaración explícita por criterio, en su propia estructura:** crea **un segundo sitio
  donde se puede afirmar cobertura**, y dos fuentes para el mismo número es literalmente
  cómo nació el «88 de 90 distractoras explicadas» que al medirse resultó ser **1 en lectura
  estricta y 5 en amplia** (§5.2). Lo que esa opción quería —resolver (a) y (b) sin
  ceremonia— lo da la regla 3 sin la estructura paralela, y el §6.3 demuestra por qué.

### 6.3 · La extensión de `satisfies` a la cabecera — NORMA, no nota

**Dónde puede colgar, y por qué no cuelga dentro de los bloques que nombra la decisión.** La
D-067 dice «de la cabecera donde vive la evidencia —`counts`, `profile_data`—». **Anidar la
clave dentro de esos dos bloques está medido y no se puede:**

- **`counts` se recorre por clave.** La vista hace `Object.entries(R.counts)` y pinta **cada
  clave** como un nivel con `before`, `after` y Δ (`run-report-renderer.js:1299`). Un
  `satisfies` ahí dentro se pintaría como un nivel fantasma. La tabla del §2.1 dice
  «recuentos antes/después **por clave**»: el bloque no tiene palabras reservadas y no puede
  tenerlas.
- **`profile_data` es el espacio de nombres del EMISOR.** Sus claves las decide el perfil
  (§5.1). Que el sobre reserve una palabra ahí es el sobre metiéndose en lo que el §0
  reparte al emisor.

**Por eso la cita vive en un bloque propio de la cabecera y APUNTA a dónde está la
evidencia**, que es lo que la decisión pide:

```json
"header_satisfies": [
  { "where": "counts",                            "satisfies": ["QZ-C-COUNT-DECLARE"] },
  { "where": "counts_note",                       "satisfies": ["QZ-C-HARD-MULTI"] },
  { "where": "profile_data.position_refs_fixed",  "satisfies": ["QZ-C-POS"], "note": "opcional" }
]
```

**Las tres guardas — normativas, no de estilo:**

1. **`where` es obligatorio y tiene que resolver a una clave que EXISTA en este mismo
   reporte** (notación de punto para bajar dentro de un bloque). Una cita cuyo `where` no
   existe es una afirmación sin evidencia, y no la salva ninguna prosa: el reporte no es
   conforme. Esto es lo que ata la cita a «donde vive la evidencia» y le impide flotar.
2. **`satisfies` es obligatorio y NO puede ir vacío.** En un ítem, `satisfies: []` con su
   `satisfies_note` significa algo —ese ítem no cita criterios—; en la cabecera no
   significaría nada, porque la entrada sólo existe para citar.
3. **Ningún vocabulario de estado dentro.** Ni «limpio», ni «revisado», ni «no aplica». Una
   entrada sólo puede hacer una cosa: **citar**. Lo que no es cita se declara con la forma
   del punto ciego (regla 4).

**Qué significa.** Exactamente lo mismo que en un ítem: *este reporte afirma que el criterio
quedó cubierto, y aquí está su evidencia.* Cambia dónde vive la evidencia; no cambia qué se
afirma.

**Por qué NO crea un segundo sitio donde afirmar cobertura** — el tercer paso es el que
aguanta:

1. **`satisfies` sólo sabe afirmar.** En todo el sobre no hay forma de escribir «este
   criterio NO está cubierto» con `satisfies`. Un `satisfies: []` habla del ítem, nunca del
   criterio (§2.2).
2. **La cobertura se deriva de UNA unión.** Un id citado dos veces —en un ítem y en la
   cabecera— es **un** criterio cubierto, no dos: la unión es idempotente, no tiene orden y
   no tiene ganador. No hay precedencia que fijar porque no hay conflicto que resolver.
3. **Dos sitios que sólo pueden afirmar lo mismo no pueden contradecirse.** El fallo que la
   D-067 quiere evitar aparece cuando **dos sitios pueden dar respuestas distintas a la
   misma pregunta**. Aquí la pregunta es «¿está citado?» y la unión sólo tiene una respuesta.
4. **La opción descartada sí lo creaba, y la diferencia es exacta:** una estructura por
   criterio con estados propios puede **afirmar lo que ningún ítem sostiene y negar lo que
   sí**. Ahí sí hay dos respuestas. Por eso la guarda 3 es normativa: **quitarla convierte
   esta extensión en la opción que se descartó.**

Y la parte negativa también tiene **un solo sitio**: `blind_spots[].affects`. Las reglas 4 y
5 van ahí y no inventan forma.

### 6.4 · La derivación — tres cubos, y ninguno se escribe

    ids        = inventario de ids del PERFIL declarado
    citados    = ⋃ items[].satisfies  ∪  ⋃ header_satisfies[].satisfies
    declarados = ( ⋃ blind_spots[].affects ) ∩ ids

    CUMPLIDOS Y DECLARADOS  = citados − declarados
    DECLARADOS SIN CUMPLIR  = declarados
    SILENCIO = NO REVISADO  = ids − citados − declarados

- **La resta no es un gusto: la impone la regla 5** (§5.4). Un criterio citado y a la vez
  declarado irreproducible o con hueco **no cuenta como cumplido**; los dos hechos se pintan,
  y el que resta es el declarado.
- **`affects` mezcla espacios de nombres a propósito** —ids de ítem, códigos de pregunta,
  ids de criterio— y se resuelve **contra el inventario del perfil, no por prefijo**: lo que
  no resuelve a un id del perfil es alcance en prosa y no toca la cobertura.
- **El porqué de un declarado NO se deriva: se lee.** «No aplica», «no disparado»,
  «irreproducible» y «no pude revisarlo» comparten forma a propósito (regla 4) y se
  distinguen por su `why_not`. **Ninguna cifra derivada puede decir cuántos criterios «no
  aplican»**, y decir que puede sería fabricar una precisión que el dato no tiene. La consola
  pinta el `why_not` verbatim y no lo clasifica (§3.2).
- Los tres cubos son **exhaustivos y disjuntos**: suman el inventario del perfil, siempre.

### 6.5 · El coste, declarado y no escondido

**Al principio los reportes honestos parecerán peores.** El piloto tiene que declarar
diecinueve criterios, y cada revisión que siga pagará algo parecido (§8.4 lo mide exacto).
**A cambio la cobertura pasa a significar algo**, y el silencio deja de poder disfrazarse de
verde. El coste baja solo: lo declarado se reutiliza entre revisiones del mismo perfil.

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

## 8 · El estreno — este contrato aplicado al reporte real, 2026-08-14 · y su re-medición bajo la D-067, 2026-08-15

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
   decidió: el §6 salió del estreno abierto y encuadrado para el operador.**
   **Cerrado el 2026-08-15 por la D-067**, dentro de este mismo run: el encuadre se convirtió
   en decisión, el §6 la lleva fundida y el estreno se volvió a medir (§8.4). **La parada
   hizo lo que tenía que hacer** — paró, encuadró, y la decisión llegó con su consecuencia
   delante.
3. **Hallazgo para el emisor — 9 ausencias sin motivo. Re-verificado contra disco el
   2026-08-15:** los 9 ítems `P90-*` declaran `feedback_chars` **de 1 172 a 1 512** con
   `subject.feedback: ""`. **La cifra afirma un contenido que el campo no trae** —
   `QZ-R-07` exige «la retroalimentación **completa**», y un vacío sin motivo es exactamente
   lo que la D-065 prohíbe. **Afinado por la regla nueva, y va a peor:** esos 9 ítems son los
   únicos que citan `QZ-C-FB-P90`, así que la derivación del §6.4 lo cuenta **cumplido y
   declarado** mientras la evidencia que lo sostiene está vacía. **Cobertura verde sobre un
   campo en blanco es precisamente el §5.2**, y la lectura dura no lo detecta: sólo detecta
   el silencio, no la cita sin sustancia. **Dos arreglos, y el emisor elige:** traer el texto
   —lo que `QZ-R-07` pide—, o declarar la ausencia con su `why_not` (§4.3). **Lo que no es
   opción es dejar la cifra afirmando lo que el campo no trae.** Comando en Anexo A.
4. **Hallazgo para el emisor — `QZ-R-06` a medias:** `profile_data.position_refs_fixed: 1`
   sin el ítem por referencia corregida que el propio perfil exige — y por eso `QZ-C-POS`
   figura a la vez como «corregido» en `profile_data` y entre los 11 requisitos sin check.
   Es la evidencia (b) del §6. **Afinado por la regla nueva:** colgar `QZ-C-POS` de
   `profile_data.position_refs_fixed` con un `header_satisfies` (§6.3) **lo saca del silencio
   y no cierra `QZ-R-06`** — la extensión cubre **criterios de contenido**, no **requisitos
   del informe**, y son ejes distintos (PERFIL §1 vs §2). El ítem sigue faltando. Es de ellos
   arreglarlo, y se lo enviamos así, con la distinción hecha.
5. **«Lo derivable se deriva» queda probado con la cifra que ya se publicó mal dos veces:**
   los pasos que piden veredicto son **11** — 8 ítems más 2 decisiones más el paso del run;
   la cabina publicó 8 y el emisor 10. La cifra derivada con su comando (Anexo A) cierra la
   discusión; escrita a mano, ya falló dos veces de dos.
6. **La presencia obligatoria del resumen es lo que hace visible su falta.** El reporte del
   piloto es conforme con su contrato de origen y aun así el operador no podía ver qué se
   miró — lo detectó él, no una suite. Con `summary` obligatorio y la ausencia justificada,
   esa invisibilidad deja de ser silenciosa.

**Veredicto del estreno, 2026-08-14: el contrato se estrenó y SIRVE** — con una sección
abierta (§6) que era del operador y dos hallazgos (§8.3.3, §8.3.4) que se envían al emisor,
no se le imponen. **Veredicto al 2026-08-15: la sección abierta está cerrada (D-067) y
re-medida (§8.4); los dos hallazgos siguen en pie y afinados.** Un contrato que no se
estrena no se congela; éste queda estrenado, enmendado y re-medido.

**CONGELADO el 2026-08-15.** El operador aprobó el reparto del §0 —la única parte del
documento que no se deducía de una decisión que él ya hubiera tomado— tras leerlo con su
tabla delante. Las demás partes normativas son suyas por origen: la D-065 (el resumen del
emisor y la ausencia que declara su motivo), la D-066 (sobrescribir avisa y resume), la
D-067 (la cobertura se lee dura) y la D-068 (el perfil se declara antes de ejecutar, la
versión se fija al abrir, y lo irreproducible por construcción lo declara el perfil).

**Qué significa congelado, y qué no.** El sobre y la promesa de pintura de este documento
dejan de moverse salvo por decisión numerada; **v1 es la versión con la que los emisores lo
adoptan**. Lo que NO congela: el §3 distingue lo construido de lo prometido, y lo prometido
sigue siendo trabajo por hacer — congelar la promesa es lo que permite construirla sin
perseguir un blanco móvil.

### 8.4 · La RE-MEDICIÓN bajo la regla nueva — el mismo reporte, 2026-08-15

Mismo fichero, mismo perfil, sin escribir nada en aquel repo. **La cobertura del piloto no
cambia de número: cambia de significado.** Todos los comandos, en **Anexo A.2**.

#### 8.4.1 · Los tres cubos del §6.4, tal como están hoy en disco

| Cubo | Hoy | Cuáles |
|---|---:|---|
| **Cumplidos y declarados** | **10** | `ANCHOR` · `DIM-STEPS` · `DIM-CONCEPTS` · `LEVEL-INFLATED` · `LEVEL-DEFLATED` · `HARD-ONEKEY` · `HARD-DEFENSIBLE` · `WORD` · `FB-P90` · `DISTR` |
| **Declarados sin cumplir** | **5** | los cinco `QZ-C-FB-*` |
| **Silencio = NO REVISADO** | **14** | `DIM-FORMULA` · `DIM-DISTANCE` · `DIM-ARITH` · `HARD-NOCALC` · `HARD-KEYTRUE` · `HARD-VALIDOPT` · `HARD-EXACT` · `HARD-MULTI` · `POS` · `COUNT-REPLACE` · `COUNT-MOVE` · `COUNT-QUALITY` · `COUNT-DECLARE` · `COUNT-PROVISIONAL` |

**Dos correcciones que la cifra sola esconde, y las dos importan:**

- **De los 10 «cumplidos», uno no lo está: `QZ-C-DISTR`.** El reporte declara su
  irreproducibilidad **dos veces** —en `profile_data.distractor_explained.criterio_usado` y
  en un punto ciego— y **ninguna de las dos lo nombra**: el punto ciego apunta al ítem `I1`.
  La regla 5 dice que no cuenta como cumplido; la derivación no puede saberlo porque el id no
  está en ningún `affects`. **La cifra honesta de hoy es 9, y la distancia entre 9 y 10 es un
  identificador** (§5.4).
- **Los 5 «declarados» no son «no aplica».** Su `why_not` dice: «El run no reportó haberlos
  comprobado y el reporte no traía las retroalimentaciones». Son **huecos declarados**, con
  motivo y con dueño — legítimos y visibles bajo la D-067. Pero entonces **la casilla «no
  aplicable / no disparado» tiene CERO ocupantes en este reporte**: los seis criterios que de
  verdad no se dispararon siguen todos en silencio, y el silencio ahora dice de ellos algo
  que no es cierto.

#### 8.4.2 · Cuáles salen del silencio si `satisfies` cuelga de la cabecera — nombrados

**Tres, y ni uno más. La evidencia ya está escrita; lo único que falta es la cita:**

| Criterio | `where` | Situación | Lo que la cabecera ya dice |
|---|---|---|---|
| `QZ-C-COUNT-DECLARE` | `counts` | **(a)** | `Facil 25→25 · Medio 45→45 · Dificil 20→20` — el recuento antes/después **por nivel**, que es exactamente lo que el criterio exige |
| `QZ-C-HARD-MULTI` | `counts_note` | **(b)** | «Verificado en texto crudo: `\begin{multi}` = `\end{multi}` = `\item*` = códigos, en los tres ficheros» |
| `QZ-C-POS` | `profile_data.position_refs_fixed` | **(b)** | `1`, con su nota: «la única referencia por letra del subtema, corregida en el commit `cae3050`» |

**Los otros 11 la extensión no los alcanza, y saber por qué es la mitad del valor de haber
medido:** **seis** son (c) —no disparados— y se declaran con la forma del punto ciego, no
con una cita; **cuatro** son (d) —silencio de verdad— y no hay en todo el reporte evidencia
que citar; y **uno** no es ninguna de las cuatro situaciones.

#### 8.4.3 · La QUINTA situación — `QZ-C-COUNT-MOVE`. **PARADA DECLARADA**

**Medido:** `R1` mueve `03_Dificil.tex → 02_Medio.tex`; `R2` mueve `02_Medio.tex →
03_Dificil.tex`; los dos traen `before`/`after` completos, **nada se borró**, y `counts`
enseña los dos niveles reequilibrados. Eso es literalmente el criterio: «un problema mal
clasificado **se MUEVE**, no se borra; mover altera dos niveles y los dos se reequilibran».
**Lo citan cero ítems.**

**No es ninguna de las cuatro:**

- **No es (a)** — la cabecera sola no lo sostiene: `counts` no puede enseñar que hubo un
  movimiento, sólo que los totales cuadran.
- **No es (b)** — no está «sólo en prosa»: está en dato estructurado, en dos ítems.
- **No es (c)** — se disparó, y dos veces.
- **No es (d)** — no hay nada oculto: cualquiera lo ve leyendo `R1` y `R2`.

**Su nombre: cumplido por ítems que existen y no lo citan — omisión de `satisfies`, no falta
de evidencia.**

**Por qué se declara como parada y no se cuela en la tabla del §6:** la tabla de las cuatro
es lo que el operador leyó antes de decidir, y ampliarla por nuestra cuenta sería cambiarle
el encuadre después de la firma. **La D-067 no queda contradicha** —su regla 2 ya lo
resuelve: quien lo hizo, lo declara, y aquí lo hizo un ítem que no lo dijo—, así que **no
hace falta reabrir la decisión**. Lo que sí hace falta es que él sepa que el encuadre tenía
cinco filas y no cuatro.

**Y hay una consecuencia que conviene que vea:** de las cinco, **ésta es la más cara bajo la
lectura dura.** Es la única donde el trabajo se hizo, la evidencia es estructurada y
completa, y aun así la cobertura pinta «no revisado» — **y la extensión a la cabecera no
puede rescatarla**: colgarla de `counts` sería citar evidencia donde no vive, que es
exactamente lo que la guarda 1 del §6.3 prohíbe. El arreglo es de ítem y cuesta una línea.
**Una omisión de una línea que cuesta un criterio entero.**

**Nota de método, para que no parezca hallazgo de última hora:** la tabla del §6 nombraba
**11 de los 14** silenciosos. Al clasificar los 14 completos aparecieron los tres que nadie
había colocado — `COUNT-QUALITY` y `COUNT-PROVISIONAL` caen limpiamente en (c), y
`COUNT-MOVE` no cae en ninguna.

#### 8.4.4 · Qué tendría que añadir el emisor, exactamente

**Cinco cosas. Las cuatro primeras no exigen re-revisar nada; la quinta sí, y por eso va
aparte.**

**1 · El bloque de citas de cabecera** (§6.3) — saca tres criterios del silencio:

```json
"header_satisfies": [
  { "where": "counts",                           "satisfies": ["QZ-C-COUNT-DECLARE"] },
  { "where": "counts_note",                      "satisfies": ["QZ-C-HARD-MULTI"] },
  { "where": "profile_data.position_refs_fixed", "satisfies": ["QZ-C-POS"] }
]
```

**2 · `"QZ-C-COUNT-MOVE"` en el `satisfies` de `R1` y de `R2`** — un id, dos ítems, y la
quinta situación deja de existir en este reporte.

**3 · `"QZ-C-DISTR"` en el `affects` del punto ciego que YA declara la irreproducibilidad** —
el que hoy dice `"affects": ["I1"]`. Un id, y el falso cumplido pasa a declarado (§5.4).

**4 · Dos puntos ciegos que cubren los seis (c)** — `COUNT-REPLACE`, `COUNT-QUALITY`,
`COUNT-PROVISIONAL`, `DIM-FORMULA`, `DIM-DISTANCE`, `DIM-ARITH`. Se agrupan porque comparten
motivo, y `affects` admite varios ids. El motivo ya está medido en el propio reporte; sólo
hay que escribirlo:

```json
{ "what": "Los tres criterios de conservación que no se dispararon",
  "why_not": "Cero bajas y cero huecos (counts_note): no hubo reemplazo que juzgar (COUNT-QUALITY) ni baja sin reemplazo (COUNT-REPLACE), y el criterio de nivel SÍ resultó aplicable —se reclasificaron R1 y R2—, así que la cláusula provisional (COUNT-PROVISIONAL) nunca entró.",
  "who_could": "Un run del subtema donde alguna sí se dispare",
  "affects": ["QZ-C-COUNT-REPLACE", "QZ-C-COUNT-QUALITY", "QZ-C-COUNT-PROVISIONAL"] }
```

```json
{ "what": "Las dimensiones 3, 4 y 5 del juicio de nivel",
  "why_not": "La rúbrica exige citar la dimensión que MUEVE un veredicto; las dos reclasificaciones se movieron por pasos y conceptos (DIM-STEPS, DIM-CONCEPTS). Estas tres no movieron ninguno y por eso no se citan.",
  "who_could": "Una revisión donde una de las tres decida una reclasificación",
  "affects": ["QZ-C-DIM-FORMULA", "QZ-C-DIM-DISTANCE", "QZ-C-DIM-ARITH"] }
```

**5 · Los cuatro duros — `HARD-NOCALC`, `HARD-KEYTRUE`, `HARD-VALIDOPT`, `HARD-EXACT`.**
Aquí no hay atajo: **o se revisan de verdad y se citan, o se declaran hueco con su
`who_could`.** No hay tercera vía, y ésa es exactamente la decisión que la lectura dura
obliga a tomar en voz alta en vez de dejarla en silencio.

**Lo que sale de todo esto, medido:**

| | hoy | tras 1–4 (sin revisar nada nuevo) | tras 1–5 con los cuatro duros revisados |
|---|---:|---:|---:|
| Cumplidos y declarados | 10 *(9 honestos)* | **13** | **17** |
| Declarados sin cumplir | 5 | **16** | **12** |
| **Silencio = no revisado** | **14** | **0** | **0** |

**La cobertura honesta del piloto no es «10 de 29». Es «13 cumplidos, 16 declarados, 0 en
silencio»** — y llegar ahí **no cambia una sola línea de contenido revisado**: cambia que el
reporte deja de callar. El coste completo de las cuatro primeras es **un bloque nuevo, un id
en dos ítems, un id en un `affects` y dos puntos ciegos.**

---

## 9 · Lo que este documento NO hace

- **No toca el renderizador ni ningún asset de la consola.** La interfaz es el run
  siguiente: pinta por presencia de campo, ciega al dominio, barata de iterar con el
  operador mirando. Este documento es la parte cara y difícil de deshacer, y por eso fue
  primero. Todo lo marcado PROMETIDO (§3.2) es de ese run.
- **No modifica el contrato ni el repo del emisor.** Los hallazgos del §8.3 se les envían;
  adoptarlo es suyo.
- **No decide el §6 — lo funde.** La decisión es del operador y está en la **D-067**; este
  documento la incorpora con su encuadre y su consecuencia, y **vuelve a medir el estreno
  bajo ella** (§8.4). Lo que aquí se escribe es la norma que se deduce de la decisión, no la
  decisión.
- **No amplía el encuadre por su cuenta.** La quinta situación medida el 2026-08-15 se
  declara aparte, en el §8.4.3, y **no se mete en la tabla de las cuatro**: esa tabla es lo
  que el operador leyó antes de decidir.
- **No renumera el documento.** Sigue siendo la **v1**: se termina, no se sustituye.
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

---

## Anexo A.2 · Las cifras de la RE-MEDICIÓN del §8.4 — 2026-08-15

Mismas rutas y mismo punto de partida que el Anexo A, salvo los dos últimos, que se ejecutan
desde `projects/aiw-console/`.

**Los tres cubos del §6.4 — 10 cumplidos · 5 declarados · 14 en silencio.** Lee
`header_satisfies` si existe, así que **el mismo comando sirve antes y después de que el
emisor adopte la extensión**:

```bash
node -e "const fs=require('fs');const p=fs.readFileSync('docs/PERFIL-REPORTE-QUIZZES-v1.md','utf8');const ids=[...new Set([...p.matchAll(/^\| \`(QZ-C-[A-Z0-9-]+)\`/gm)].map(m=>m[1]))];const r=JSON.parse(fs.readFileSync('reports/RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001/report.json','utf8'));const cit=new Set([...r.items.flatMap(i=>i.satisfies||[]),...(r.header_satisfies||[]).flatMap(h=>h.satisfies||[])]);const dec=new Set(r.blind_spots.flatMap(b=>b.affects||[]).filter(a=>ids.includes(a)));const cum=ids.filter(x=>cit.has(x)&&!dec.has(x));const decl=ids.filter(x=>dec.has(x));const sil=ids.filter(x=>!cit.has(x)&&!dec.has(x));console.log('ids',ids.length,'| cumplidos y declarados',cum.length,'| declarados sin cumplir',decl.length,'| SILENCIO = no revisado',sil.length);console.log('cumplidos:',cum.join(' '));console.log('declarados:',decl.join(' '));console.log('silencio:',sil.join(' '))"
```

**`QZ-C-DISTR` cuenta como cumplido y no lo está** — citado por `I1`, cifra nula, motivo
escrito, y **su id en ningún `affects`** (§5.4, §8.4.1):

```bash
node -e "const r=require('./reports/RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001/report.json');console.log('citan QZ-C-DISTR:',r.items.filter(i=>(i.satisfies||[]).includes('QZ-C-DISTR')).map(i=>i.item_id).join(' '));const d=r.profile_data.distractor_explained;console.log('count:',d.count,'| total:',d.total);console.log('criterio_usado:',d.criterio_usado);console.log('en blind_spots[].affects:',r.blind_spots.some(b=>(b.affects||[]).includes('QZ-C-DISTR')))"
```

**Los 5 declarados son HUECOS, no «no aplica»** — su `why_not` lo dice (§8.4.1):

```bash
node -e "const r=require('./reports/RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001/report.json');r.blind_spots.filter(b=>(b.affects||[]).some(a=>a.startsWith('QZ-C-'))).forEach(b=>console.log((b.affects||[]).filter(a=>a.startsWith('QZ-C-')).join(' ')+'\n  why_not: '+b.why_not))"
```

**La evidencia de cabecera que YA existe para los tres del §8.4.2:**

```bash
node -e "const r=require('./reports/RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001/report.json');console.log('counts ->',JSON.stringify(r.counts));console.log('counts_note ->',r.counts_note);console.log('profile_data.position_refs_fixed ->',r.profile_data.position_refs_fixed,'|',r.profile_data.position_refs_fixed_note)"
```

**La quinta situación — `QZ-C-COUNT-MOVE` cumplido por `R1` y `R2`, citado por cero ítems**
(§8.4.3):

```bash
node -e "const r=require('./reports/RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001/report.json');r.items.filter(i=>i.type==='reclassification').forEach(i=>console.log(i.item_id+': '+i.before.file+' -> '+i.after.file+' ['+(i.satisfies||[]).join(',')+']'));console.log('counts:',JSON.stringify(r.counts));console.log('QZ-C-COUNT-MOVE citado por',r.items.filter(i=>(i.satisfies||[]).includes('QZ-C-COUNT-MOVE')).length,'items')"
```

**La proyección del §8.4.4 — 13/16/0 sin revisar nada nuevo, 17/12/0 con los cuatro duros
revisados.** Las adiciones van declaradas arriba del comando, para que se vea qué se
supone y qué se mide:

```bash
node -e "const fs=require('fs');const p=fs.readFileSync('docs/PERFIL-REPORTE-QUIZZES-v1.md','utf8');const ids=[...new Set([...p.matchAll(/^\| \`(QZ-C-[A-Z0-9-]+)\`/gm)].map(m=>m[1]))];const r=JSON.parse(fs.readFileSync('reports/RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001/report.json','utf8'));const HDR=['QZ-C-COUNT-DECLARE','QZ-C-HARD-MULTI','QZ-C-POS'],ITEM=['QZ-C-COUNT-MOVE'],GAP=['QZ-C-DISTR','QZ-C-COUNT-REPLACE','QZ-C-COUNT-QUALITY','QZ-C-COUNT-PROVISIONAL','QZ-C-DIM-FORMULA','QZ-C-DIM-DISTANCE','QZ-C-DIM-ARITH'],H4=['QZ-C-HARD-NOCALC','QZ-C-HARD-KEYTRUE','QZ-C-HARD-VALIDOPT','QZ-C-HARD-EXACT'];const b=(xc,xg)=>{const cit=new Set([...r.items.flatMap(i=>i.satisfies||[]),...xc]);const dec=new Set([...r.blind_spots.flatMap(x=>x.affects||[]).filter(a=>ids.includes(a)),...xg]);return[ids.filter(x=>cit.has(x)&&!dec.has(x)).length,ids.filter(x=>dec.has(x)).length,ids.filter(x=>!cit.has(x)&&!dec.has(x)).length]};console.log('tras 1-4:',b([...HDR,...ITEM],[...GAP,...H4]).join(' / '));console.log('tras 1-5:',b([...HDR,...ITEM,...H4],GAP).join(' / '))"
```

**La consola no lee `satisfies` ni `profile_data` — cero apariciones** (§3.2). Desde
`projects/aiw-console/`:

```bash
grep -n "satisfies\|profile_data" project-console/assets/run-report-renderer.js | wc -l
```

**`counts` se recorre por clave, y por eso `satisfies` no puede anidarse ahí** (§6.3). Desde
`projects/aiw-console/`:

```bash
grep -n "Object.entries(R.counts" project-console/assets/run-report-renderer.js
```
