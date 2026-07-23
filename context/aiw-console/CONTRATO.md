# CONTRATO DE LA CARPETA — Capa 1: el archivo requerido

Estado: VIGENTE — tramo 1 de O4. Familia de schema ratificada (v1 del proyector).

**Dónde vive y por qué.** El contrato lo cumplen todos los proyectos, pero lo
define y lo consume la consola. Por eso vive en `context/aiw-console/` y no en
`context/aiw/` ni en la raíz: el emisor puede ser genérico, la norma no lo es —
la escribe quien lee.

**SUPERSEDE a `docs/snapshot-schema-v1.md` como norma.** Ese documento queda como
**evidencia** de lo que el proyector emite hoy, y se sigue citando en ese papel a
lo largo de este contrato. Donde ambos digan cosas distintas, manda éste.

## Nota de verificación

Cotejado de primera mano el **2026-07-23** contra `docs/snapshot-schema-v1.md` y
contra los tres snapshots en disco:

- `projects/aiw-console/.aiw/views/project_console.snapshot.json`
- `aiw/.aiw/project_console.snapshot.json`
- `projects/cantu-studio/.aiw/views/project_console.snapshot.json`

Toda afirmación de tipo, clave o ruta lleva cita `archivo:línea` o medición en
disco. Lo no comprobable desde disco en esta sesión se marca **[NO VERIFICADO]**.
No se ejecutó git en ninguna forma. No se levantó la consola, el validador ni el
proyector.

Rutas relativas a la raíz de trabajo `C:\Users\chris\Documents\AIW_Workspace`.
Abreviaturas heredadas del audit: **CANTU-PCJS** =
`projects/cantu-studio/docs/project-console/assets/project-console.js`;
**CON-PCJS** = `projects/aiw-console/docs/project-console/assets/project-console.js`;
**CANTU-VALID** = `projects/cantu-studio/tools/project-console/validate-project-console-state.mjs`;
**CON-PROJ** = `projects/aiw-console/tools/projector/project.mjs`.

---

## 0. Qué es esto

La carpeta que un proyecto expone para ser renderizado por la consola global.

Se crea ADITIVA (D-036): convive con `.aiw` hasta el corte del tramo 7.

## 1. Ubicación y nombre — RATIFICADO

    <repo>/.project/snapshot.json

**Por qué no `.aiw/`, y por qué tampoco un nombre tomado de la consola.** `.aiw`
nombra al **emisor**. Un nombre tomado de la consola nombraría al **consumidor**.
Ninguno de los dos nombra el **contenido**, que es lo único que no cambia. La
carpeta es la descripción que un proyecto publica de sí mismo; que hoy la lea una
consola es circunstancial, y si mañana la lee otra cosa —un índice de portafolio,
un CI, otro proyecto— un nombre tomado del consumidor mentiría exactamente igual
que `.aiw` miente hoy.

**La vaguedad de `.project/` no es defecto: es el requisito.** Es genérica porque
debe servir a cualquier proyecto y a cualquier consumidor. Esa
identidad-neutralidad es lo que persigue el tramo entero, y es la propiedad que el
audit midió como la única virtud del proyector frente a todo el resto del
toolchain (`CON-PROJ` no hornea `JAME`, ni `Cantu`, ni ids de run o rama).

`snapshot.json` en lugar de `project_console.snapshot.json`: dentro de `.project/`
el prefijo es redundante, y `project_console` volvería a meter al consumidor en el
nombre por la puerta de atrás. El emisor se toca en el tramo 2 de todos modos, así
que renombrar hoy es gratis y mañana no.

> **Relación con D-036.** Esta ratificación **no enmienda** D-036: cierra un
> pendiente que D-036 dejó abierto a propósito
> (`context/DECISIONES.md:445-450`, "Nombre de la carpeta: PENDIENTE,
> deliberadamente"). D-036 ya había señalado que un nombre tomado del consumidor
> sería "igual de equivocado por simetría" (`context/DECISIONES.md:447`) — y tenía
> razón.

### 1.a Ruta base como constante — disciplina permanente

Heredada de D-036 (`context/DECISIONES.md:448-450`): **la ruta base vive como UNA
constante en UN archivo**, no dispersa como literal.

D-036 la justificaba por provisionalidad — el nombre estaba sin decidir y el
rename tenía que costar una línea. Esa justificación ya caducó: el nombre está
decidido. **La regla se conserva por una razón distinta y permanente:** un literal
de ruta repetido es acoplamiento, decidido o no. El audit lo midió como patología
concreta, no como hipótesis: la tabla `PATHS` del renderer hornea 15 literales
`../../.aiw/…` (`CANTU-PCJS:1-27`), y el prefijo `.aiw/` está además repetido en el
server, en el builder y en el validador. Ese es exactamente el estado que hace que
mover una carpeta sea cirugía en vez de una línea.

La regla no protege contra la indecisión. Protege contra la próxima decisión.

### 1.b `.project/` reemplaza a `views/` — RATIFICADO

Hoy el proyector escribe bajo `.aiw/views/`
(`SNAPSHOT_RELATIVE_PATH = join(".aiw", "views", "project_console.snapshot.json")`,
`CON-PROJ:32`), donde `views/` significa "derivado, regenerable, no fuente".

**`.project/` es enteramente derivada, así que `views/` desaparece.** El
significado que `views/` aportaba lo aporta ahora la carpeta entera: todo lo que
está bajo `.project/` tiene emisor y se regenera (§2). Un solo destino; no se
hereda el layout viejo.

La implementación en el emisor es trabajo del **tramo 2**. Aquí solo se declara la
norma.

## 2. La regla que da origen a este contrato

**Todo archivo requerido tiene emisor. Ningún archivo requerido se escribe a
mano.**

No es doctrina abstracta. El snapshot de Cantu lleva
`generated_from_run: "RUN-JAME-ROADMAP-STANDARDIZATION-AIW-COMPATIBLE-AUDIT-001"`
—medido en disco— y su `run_queue_ref` apunta a `.aiw/roadmap/queue.json`, que
**no existe en disco** (medido: `fs.existsSync` = false; los otros siete `*_ref`
del mismo archivo sí existen).

### La cifra, con su procedencia y su debilidad

Lleva **unas tres semanas** podrido. Medición read-only de `mtime`, 2026-07-23:

| Archivo | `mtime` |
|---|---|
| `cantu-studio/.aiw/views/project_console.snapshot.json` | `2026-07-01T11:14:02.627Z` |
| `cantu-studio/.aiw/roadmap/roadmap.json` | `2026-07-23T01:01:55.456Z` |

Brecha: **21.57 días**. El roadmap se tocó hoy; el snapshot que dice describirlo,
hace tres semanas.

**Procedencia y debilidad, en el mismo lugar donde va la cifra** — porque esta
distinción *es* el contrato explicándose a sí mismo:

- La cifra sale de **`mtime` en disco**, NO de `generated_at`. No podría salir de
  `generated_at`: ese archivo **no lo tiene** (§6). Ésa es precisamente la falla
  que este contrato cierra.
- Por venir de `mtime`, es **vulnerable a un checkout de git**, que reescribe
  mtimes hacia adelante. Un clone reciente del repo borraría la evidencia sin que
  el archivo dejara de estar podrido. Es decir: la mejor medición disponible hoy
  es también frágil, y lo es por la ausencia de la clave que §6 vuelve requerida.

Que haga falta `stat` para averiguar la edad de un artefacto que debería
declararla es el argumento entero de §6, medido.

**[NO VERIFICADO]** que la consola muestre dos verdades a la vez en pantalla: no
se levantó la consola en ninguna sesión. Era inferencia presentada como
observación, y se retira como tal. Lo medido es lo de arriba: un puntero roto y una
brecha de mtime.

Corolario: el emisor es `tools/projector/project.mjs`, y pasa a emitir también el
snapshot de Cantu. La podredumbre se arregla como efecto lateral.

Corolario 2 (D-026, test-de-consumidor): ver §9, que acota cuándo aplica.

## 3. Claves requeridas

Heredadas de v1, sin cambios de forma:

| Clave | Tipo | Nota |
|---|---|---|
| `schema_version` | entero | ver §4 |
| `project_id` | string | ver §5 |
| `operational_status` | string | string, NO objeto anidado (v0.3 lo anidaba) |
| `project_summary` | string | ídem |
| `current_status_summary` | string | ídem |
| `roadmap_tree` | objeto | forma detallada en capa 2 |
| `blockers` | array | |
| `followups` | array | |
| `no_claims_summary` | **objeto** | `snapshot-schema-v1.md:43` |
| `validation_summary` | **objeto** | `snapshot-schema-v1.md:44` |
| `taxonomy_model` | **objeto** | `snapshot-schema-v1.md:45` |
| `generated_at` | ISO 8601 UTC | ver §6 |
| `generated_from` | string | ver §6 |
| `sources` | array de objetos | ver §6 |

La nota "string, NO objeto anidado" aplica **solo** a `operational_status`,
`project_summary` y `current_status_summary`. Esos tres son objeto en la v0.3 de
Cantu y string en v1 (medido en disco en los tres snapshots). Los tres de abajo
—`no_claims_summary`, `validation_summary`, `taxonomy_model`— son **objeto en
ambas familias**: la v0.3 no los aplana y la v1 tampoco.

**La forma interna de esos tres objetos queda SIN ESPECIFICAR en la capa 1.** Lo
que hay hoy en disco está medido en el **Anexo A**, que es evidencia y no norma.
Ver §3.b, que adjudica qué pasa con cada uno.

### 3.b `no_claims_summary` y `validation_summary` quedan OPACOS

Tipo **objeto**. Contenido **SIN ESPECIFICAR**. **Pass-through**: el emisor los
transporta y ningún consumidor de la capa 1 mira dentro. Su forma se decide en el
tramo donde algo real las llene, no antes.

**Razón, que es el núcleo de este contrato:** especificar un schema sin emisor y
sin un solo ejemplo **es exactamente cómo nació la v0.3** — un documento
plausible, escrito a mano, que nadie mantuvo y que se pudrió tres semanas (§2). La
única evidencia disponible para estos dos es `{}` en los dos snapshots que el
proyector emite (Anexo A.1, A.2). Fijar su forma a partir de eso no sería diseño:
sería inventar, con la misma mecánica y el mismo destino que el error que este
tramo existe para corregir.

Opaco no es "sin decidir". Es una decisión: **no hay schema aquí hasta que haya
emisor y ejemplo.**

`taxonomy_model` **NO queda opaco.** Tiene contenido real, es idéntico en ambos
archivos y su forma es estable (Anexo A.3). Es candidato a especificarse en la
capa 2.

## 4. `schema_version` es entero — confirmación, no decisión

Este contrato **no decide** el tipo: lo confirma. v1 ya lo fija como entero
(`snapshot-schema-v1.md:18`, "integer; AIW contract. (JAME used the string
"0.3".)"), y los dos snapshots que emite el proyector dicen `1` en disco (medido:
`schema_version` = `1`, tipo `number`, en `aiw-console/.aiw/views/…` y en
`aiw/.aiw/…`).

La v0.3 de Cantu usa string con namespace —medido:
`"aiw.project_console_snapshot.v0.3"`— para distinguir familias al leer. Ese
problema desaparece con un solo contrato canónico, y durante los tramos 4–7
—cuando Cantu tenga las dos carpetas a la vez— **la ruta ya desambigua**: `.aiw/`
es lo viejo, `.project/` es esto.

Entero, empezando en `1`. Sin namespace.

## 5. `project_id` es opaco

**Ningún consumidor compara `project_id` contra un literal.**

Es uno de los tres ROMPE del sistema. La comparación real está en el **validador**
de Cantu, y **no es contra el snapshot**: es contra `.aiw/project.json`.
Verificado de primera mano:

- `CANTU-VALID:153` — `const project = readJson(".aiw/project.json");`
- `CANTU-VALID:609` — `if (project.project_id !== "jame_system_dual") {`
- `CANTU-VALID:610` — `fail(".aiw/project.json project_id must be jame_system_dual");`

La regla queda intacta: la corrección es de atribución, no de fondo. El patrón que
se prohíbe —ramificar comportamiento sobre el valor literal de un `project_id`—
es el mismo, y la consola global no debe reproducirlo en ningún archivo, incluido
el snapshot.

`project_id` sirve para agrupar y rutear. Nunca para ramificar comportamiento.

## 6. Frescura — lo que mata la podredumbre

| Clave | Tipo | Estado en v1 | Para qué |
|---|---|---|---|
| `generated_at` | ISO 8601 UTC | **ya existe**, `snapshot-schema-v1.md:20` | cuándo lo emitió la herramienta |
| `generated_from` | string | **ya existe**, `snapshot-schema-v1.md:21` | QUÉ herramienta, con versión |
| `sources` | array de objetos | **NUEVA** | `{path, mtime}` de cada archivo leído al emitir |

### `generated_at` — se promueve a REQUERIDA, no se inventa

No es clave nueva. Está en el envelope de v1 (`snapshot-schema-v1.md:20`) y el
proyector la emite (`CON-PROJ:274`, `CON-PROJ:444` —
`generated_at: opts.now || new Date().toISOString()`). Medida en disco:
`2026-07-22T21:38:08.898Z` en el snapshot de aiw-console,
`2026-07-11T05:41:17.843Z` en el de AIW.

Lo que este contrato añade es que pasa de **presente de hecho** a **REQUERIDA de
derecho**: un snapshot sin `generated_at` no cumple.

### `generated_from` NO se renombra

v1 ya satisface el requisito de nombrar la herramienta con su versión. Verificado:
`CON-PROJ:30-31` define
`PROJECTOR_VERSION = "0.1.0"` y ``GENERATED_FROM = `aiw-projector@${PROJECTOR_VERSION}` ``,
y ambos snapshots del proyector dicen `generated_from: "aiw-projector@0.1.0"` en
disco. Renombrarla a `generated_by` sería churn sin ganancia: rompería el emisor y
el schema-doc para expresar lo que la clave ya expresa.

### El enemigo, con los hechos reales de Cantu

El snapshot de Cantu falla en las tres a la vez. Medido en disco sobre
`projects/cantu-studio/.aiw/views/project_console.snapshot.json`:

```
generated_from_run = "RUN-JAME-ROADMAP-STANDARDIZATION-AIW-COMPATIBLE-AUDIT-001"
generated_from     = "PROJECT_CONSOLE_AIW_COMPATIBLE_CANONICAL_RUN_MODEL_NOT_CERTIFIED"
generated_at       = ausente (la clave no existe en el objeto)
```

1. **`generated_from_run` lleva un run_id.** Que un run figure como autor es la
   firma de un archivo escrito a mano: un run es un evento, no una herramienta, y
   no se lo puede volver a correr para regenerar el artefacto.
2. **`generated_from` no nombra ninguna herramienta.** Su valor es una cadena de
   modelo de run, sin herramienta y sin versión. La clave correcta existe y está
   ocupada por algo que no es su contenido.
3. **`generated_at` está ausente por completo.** Éste es el hecho portante: sin
   fecha de emisión, la staleness de ese archivo **no es detectable ni en
   principio**. No hay contra qué comparar el `mtime` de nada. No es que la consola
   no lo diga — es que el dato para decirlo no existe.

Por eso `generated_at` se promueve a requerida y por eso `sources` es nueva.

### `sources` — la clave nueva. Lleva `mtime` — RATIFICADO

`sources` es lo que hace la podredumbre **detectable**: si el `mtime` de una fuente
es posterior al `generated_at`, el snapshot está stale y la consola debe decirlo
en pantalla.

**`mtime`, no hash de contenido. Se elige por modo-de-fallo, no por simplicidad.**

Un checkout de git resetea mtimes **hacia adelante**. El error que eso produce es
"stale cuando en realidad está fresco": un falso positivo. La consola avisa de más,
alguien mira, no había nada. **Falla ruidoso, nunca silencioso** — y ése es el
único criterio que importa aquí, porque el fallo que este contrato existe para
impedir es el silencioso: un artefacto podrido que se renderiza como verdad
durante tres semanas sin que nada lo señale (§2).

El hash de contenido evita ese falso positivo, pero obliga a leer cada fuente
entera en cada emisión. Se paga en todas las emisiones para evitar un fallo que
avisa de más.

**Revisión a hash: procede si aparece un falso positivo real en operación** — no
antes, y no por hipótesis. La clave se define como array de objetos precisamente
para que añadir un campo de hash sea aditivo el día que haga falta.

## 7. Rutas

Toda ruta del snapshot es **relativa a la raíz del repo** y **debe existir al
momento de emitir**. Si no existe, se omite la clave — nunca se emite un puntero
roto.

Es la lección directa de `run_queue_ref` (§2): un puntero roto entre ocho, medido
en disco.

## 8. El conjunto requerido no crece sin decisión

Hoy: **un** archivo requerido. Verificado de primera mano en el lector vivo:

- `CANTU-PCJS:1-27` — la tabla `PATHS` lista **15 rutas de archivo** bajo
  `../../.aiw/**` más 2 endpoints internos (`historySync`, `roadmapEdit`).
- `CANTU-PCJS:5559` — `const snapshot = await fetchJson(PATHS.snapshot, true);`
  es la **única** llamada con `required = true`.
- `CANTU-PCJS:5575-5589` — las otras 14 van dentro de un `Promise.all` sin flag,
  es decir fail-soft.

Los otros 14 archivos son fail-soft con degradación declarada por panel (capa 3).

Cada archivo que se promueve a requerido es una forma nueva de ponerse rojo. La
promoción es una decisión registrada, no un descuido de implementación.

## 9. D-026 y el lector

**D-026 no aplica al tramo 1, por su propio texto.**

D-026 exige el test-de-consumidor a "todo objetivo que EMITA un artefacto para un
consumidor **EXISTENTE**" (`context/DECISIONES.md:198`). En el tramo 1 ese
consumidor no existe: ningún lector en disco lee `.project/snapshot.json`.

Verificado de primera mano — los dos lectores que hay fetchan el literal
`../../.aiw/views/project_console.snapshot.json`:

- `CANTU-PCJS:2` (ruta), required en `CANTU-PCJS:5559`
- `CON-PCJS:2` (ruta), required en `CON-PCJS:3806`

**No se emite copia de entrega en la ruta vieja**, aunque el patrón exista en el
repo (`snapshot-schema-v1.md:202-216`, canónico + copia byte-idéntica para el
roadmap). Dos razones, cada una suficiente:

1. **Del lado de `aiw-console`**, el único lector disponible es `CON-PCJS`, que
   pertenece al fork **descartado como base de UI** por D-035
   (`context/DECISIONES.md:392-425`). Satisfacer a un lector descartado es
   construir contra un consumidor que ya se decidió no tener.
2. **Del lado de Cantu**, la copia caería en
   `.aiw/views/project_console.snapshot.json`, que es **el único archivo requerido
   de la consola viva** (§8). Pisarlo contradice D-036
   (`context/DECISIONES.md:427-451`), cuya premisa entera es que la carpeta nueva
   se crea ADITIVA y **deja intacto todo lo que está en `.aiw`** — y cuya seguridad
   medida depende exactamente de que la carpeta nueva sea invisible para el
   validador.

**D-026 se activa en el TRAMO 3**, contra el shell multi-proyecto. Ahí el
consumidor existirá, y el test deberá citar su archivo+línea de lectura, sus
campos y sus enums, cargando el artefacto como lo carga él.

> **Caducidad explícita.** Este apartado vale **solo mientras no exista un lector
> de `.project/snapshot.json`**. En el momento en que el shell del tramo 3 lea esa
> ruta, D-026 aplica sin excepción y este apartado se retira del contrato. No es
> una dispensa: es la constatación de que la condición de disparo de D-026 aún no
> se cumple.

---

## Anexo A — EVIDENCIA NO NORMATIVA

**Este anexo describe lo que hay, no fija lo que debe haber.** Es medición
read-only del estado en disco al 2026-07-23, e insumo para la capa 2. Nada aquí
constituye requisito. Un emisor que produzca otra forma interna para estos tres
objetos **no viola este contrato**, porque la capa 1 no especifica su forma (§3).

Alcance: claves de primer nivel de `no_claims_summary`, `validation_summary` y
`taxonomy_model` en los dos snapshots que emite el proyector.

Archivos medidos:

- **A** = `projects/aiw-console/.aiw/views/project_console.snapshot.json`
  (`generated_at` = `2026-07-22T21:38:08.898Z`)
- **B** = `aiw/.aiw/project_console.snapshot.json`
  (`generated_at` = `2026-07-11T05:41:17.843Z`)

### A.1 `no_claims_summary`

| Archivo | Claves de primer nivel |
|---|---|
| A | `{}` — objeto vacío, cero claves |
| B | `{}` — objeto vacío, cero claves |

Sin diferencia entre archivos. Consistente con `snapshot-schema-v1.md:43`
("may be empty").

### A.2 `validation_summary`

| Archivo | Claves de primer nivel |
|---|---|
| A | `{}` — objeto vacío, cero claves |
| B | `{}` — objeto vacío, cero claves |

Sin diferencia entre archivos. Consistente con `snapshot-schema-v1.md:44`
("may be empty").

### A.3 `taxonomy_model`

| Archivo | Claves de primer nivel | Tipo de cada una |
|---|---|---|
| A | `objective_classifications`, `operational_statuses` | array[3], array[3] |
| B | `objective_classifications`, `operational_statuses` | array[3], array[3] |

Sin diferencia entre archivos — mismas claves, mismos tipos y mismos valores:

```json
{
  "objective_classifications": ["pending", "parked", "processed"],
  "operational_statuses": ["active", "blocked", "idle"]
}
```

### A.4 Lectura del anexo

Los tres objetos son objeto en ambos archivos, sin divergencia entre ellos. Dos de
los tres están **vacíos en disco**: `no_claims_summary` y `validation_summary` son
`{}` en A y en B. Es decir, su tipo (objeto) está establecido pero su contenido
nunca se ha ejercido — el proyector reserva el hueco y no lo llena.

Fijar la forma interna de esos dos no tiene hoy ni un solo ejemplo real contra el
cual cotejarse; la de `taxonomy_model` sí.

**Consecuencia adjudicada en §3.b:** los dos vacíos quedan **OPACOS** (tipo objeto,
contenido sin especificar, pass-through) hasta que exista emisor y ejemplo;
`taxonomy_model` no queda opaco y es candidato a la capa 2.

**[NO VERIFICADO]** qué forma espera cada panel consumidor para los dos vacíos: eso
se mide contra el renderer en la capa 3, no aquí.

---

## Decisiones de este contrato — RATIFICADAS 2026-07-23

Las tres quedan cerradas. Registradas en `context/DECISIONES.md` como D-039.

| # | Decisión | Dónde | Razón en una línea |
|---|---|---|---|
| a | La carpeta se llama `.project/` | §1 | `.aiw` nombra al emisor y un nombre de consola nombraría al consumidor; ninguno nombra el contenido. |
| b | `sources` lleva `mtime`, no hash | §6 | Su falso positivo (checkout de git) falla **ruidoso**; el fallo que hay que impedir es el silencioso. |
| c | `.project/` reemplaza al nivel `views/` | §1.b | La carpeta entera es derivada, así que `views/` ya no distingue nada. Implementación: tramo 2. |

Ninguna decisión de la capa 1 queda abierta.
