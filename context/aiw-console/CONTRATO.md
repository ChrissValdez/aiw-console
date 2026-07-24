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
| `roadmap_tree` | objeto | forma detallada en capa 2 (§10) |
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
capa 2 (resuelto: §17).

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

Los otros 14 archivos son fail-soft con degradación declarada por panel (capa 3:
§§18-20).

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
`taxonomy_model` no queda opaco y es candidato a la capa 2 (resuelto: §17).

**[NO VERIFICADO]** qué forma espera cada panel consumidor para los dos vacíos: eso
se mide contra el renderer en la capa 3, no aquí. (La capa 3 redactada adjudicó
archivos opcionales, no la forma de estos dos objetos: la medición se hereda al
test-de-consumidor del tramo 3, §20.)

---

# CONTRATO DE LA CARPETA — Capa 2: el roadmap (`roadmap_tree`)

Estado: VIGENTE — tramo 1 de O4, misma pieza que la capa 1. Detalla la forma del
objeto `roadmap_tree` que §3 declara requerido y resuelve el destino de
`taxonomy_model` que §3.b dejó como candidato. Las decisiones de esta capa están
adjudicadas por la cabina; esta redacción las fija con su evidencia. Registradas en
`context/DECISIONES.md` como D-040, junto con la capa 3.

**Enmendada el 2026-07-23 por D-041**, que añade §10.d — las dependencias que
cruzan proyectos — y las decisiones `r`, `s` y `t` de la tabla final. La enmienda
no toca ninguna decisión previa de esta capa: añade.

**Enmendada de nuevo el 2026-07-23 por D-043**, que amplía §10.d con la FORMA y la
ESTABILIDAD de `run_id` (Reglas 1.a y 1.b; decisiones `u` y `v`) y anota el disparo
de la Regla 4. Tampoco toca ninguna decisión previa: añade, y cierra con regla la
tensión que D-041 dejó anotada dentro de la propia §10.d.

## Nota de verificación (capa 2)

Fuentes de evidencia, leídas completas antes de redactar:

- **MEDICION** = `context/aiw-console/records/MEDICION-ROADMAP-V3.md` — medición
  read-only del roadmap v3 de Cantu y de `taxonomy_model` (2026-07-23).
- **AUDIT** = `context/aiw-console/records/AUDIT-CONSOLE-O4-PHASE0.md` — el mapa de
  estado real del toolchain (2026-07-23).

Alias de datos, heredados de la medición: **CANTU-ROADMAP** =
`projects/cantu-studio/.aiw/roadmap/roadmap.json`; **CONSOLE-SNAP** =
`projects/aiw-console/.aiw/views/project_console.snapshot.json`; **AIW-SNAP** =
`aiw/.aiw/project_console.snapshot.json`. **CANTU-PCJS** y **CANTU-VALID** como en
la cabecera de la capa 1.

Cotejado de primera mano el **2026-07-23** con recorrido propio de los tres
archivos de datos: los totales (8·30·65), los conteos de `status`, las claves de la
raíz y de los tres niveles, los conteos de `closeout_result` (9: 8 constantes + 1
prosa; 11 `completed`, 2 de ellos sin closeout) y de `progress` (1/65, 13 entradas,
5 claves), la densidad de `queue_order` (1..65, únicos, sin huecos), la ausencia de
referencias colgantes en `depends_on`, la ausencia de fases y objetivos con 0 runs,
las 0 ocurrencias de `current_stage` y de `categor*`/`batch` como clave, la
identidad de `taxonomy_model` entre ambos snapshots y el `model` de ambos árboles.
**Todo reproduce la medición sin desviación.** Para §10.a, §10.c y el Anexo B se
leyeron además de primera mano las líneas citadas de CANTU-ROADMAP (:2 y :199),
CANTU-PCJS, CANTU-VALID y
`projects/cantu-studio/.aiw/state/project_status.json`.

No se ejecutó git en ninguna forma. No se levantó la consola, el validador ni el
proyector. Lo no comprobable desde disco en esta sesión se marca **[NO VERIFICADO]**.

### Añadido por la enmienda D-041 (2026-07-23)

Fuente nueva: **MEDICION-GRAFO** =
`context/aiw-console/records/MEDICION-GRAFO-O0.md` — medición read-only del grafo
de dependencias alrededor de O0, leída completa antes de redactar §10.d.

Para §10.d se midió además **de primera mano**, con recorrido propio de los
archivos el 2026-07-23:

- **CANTU-ROADMAP** — 65 runs, 65 `run_id` **únicos**, 101 aristas de
  `depends_on`, **0** destinos inexistentes. Frontera de O0: **8** aristas
  cruzadas, las **8** entre objetivos distintos. Frontera del subconjunto de 6:
  **4** aristas, las **4** intra-objetivo, objetivos partidos {O0, O2}.
- `projects/aiw-console/.aiw/views/roadmap.json` — 16 runs, 16 ids únicos.
- `projects/aiw-console/.aiw/roadmap/roadmap.json` — mismo conjunto de 16 (la
  copia de entrega del patrón canónico+copia, AUDIT:821-825).
- **Intersección de `run_id` entre los dos roadmaps: 0.**

Todo reproduce MEDICION-GRAFO sin desviación. No se ejecutó git en ninguna forma.

### Añadido por la enmienda D-043 (2026-07-23)

Fuente nueva: **MEDICION-PROYECTOR** =
`context/aiw-console/records/MEDICION-PROYECTOR.md` — medición read-only del
emisor (el proyector de AIW y el history-builder), leída completa antes de
redactar la ampliación de §10.d. Alias de código heredados de ese record:
**PROJ** = `projects/aiw-console/tools/projector/project.mjs`.

Para §10.d se midió además **de primera mano**, con recorrido propio de los
archivos el 2026-07-23:

- **CANTU-ROADMAP** — **65 de 65** `run_id` casan
  `RUN-<PROYECTO>-<SLUG>-<NNN>`, **0** excepciones; prefijos `JAME` (48) y
  `CANTU` (17); **0** ids con minúsculas; `<NNN>` = `001` en los **65**.
- **O0 tras el re-archivo de D-042** — 12 runs, prefijos `CANTU` (8) y `JAME` (4).
- `projects/aiw-console/.aiw/views/roadmap.json` — 16 ids, **0** casan la forma.
- `aiw/objectives/` — los 16 nombres de archivo `.md` bajo
  `{pending, parked, processed}` coinciden uno a uno con esos 16 ids; los de
  `processed/` llevan prefijo de estado (`APPROVED-`, `ERROR-`, `HUMAN_REVIEW-`).
- Releídas de primera mano las líneas citadas de `aiw/queue.mjs` (`:58`), de
  **PROJ** (`:38`, `:40`, `:188-196`, `:235`, `:247`, `:258-262`, `:269`,
  `:423`, `:463-466`, `:475-483`) y de
  `projects/cantu-studio/tools/project-console/build-git-history-snapshot.mjs`
  (`:26`, `:186`).

Todo reproduce MEDICION-PROYECTOR sin desviación. No se ejecutó git en ninguna
forma. No se ejecutó el proyector. No se modificó código alguno.

---

## 10. Forma de `roadmap_tree`: tres niveles, nada derivado

`roadmap_tree` transporta el roadmap del proyecto dentro del snapshot (§3). Esta
capa fija su **modelo canónico**: un árbol de tres niveles,

    objetivo → fase → run

con las claves del roadmap v3 medido en disco — 8 objetivos, 30 fases, 65 runs
(MEDICION:100-101). La capa especifica el árbol que viaja DENTRO del snapshot; los
archivos de roadmap sueltos que el toolchain emite o lee hoy
(`.aiw/views/roadmap.json` y la copia de entrega `.aiw/roadmap/roadmap.json`,
AUDIT:807-816) son archivos opcionales y se adjudican en la capa 3.

Lo que hay hoy en disco no es esta forma: los dos snapshots del proyector
transportan `aiw_flat_objectives_v1` (`"model"` en CONSOLE-SNAP:10 y AIW-SNAP:10,
vía MEDICION:82-85), el modelo plano que el emisor deriva de las carpetas de
objetivos de AIW (AUDIT:671-675). El v3 vive hoy solo en CANTU-ROADMAP. Proyectar
el v3 al snapshot es trabajo del emisor (tramo 2, mismo patrón que §1.b: aquí se
declara la norma); qué modelo transporta un snapshot dado lo declara el propio
snapshot (§17).

### 10.a Claves por nivel — las medidas, sin excepciones

Raíz del árbol v3, tal como existe en su archivo (MEDICION:227-230):
`schema_version`, `roadmap_id`, `title`, `objectives`.

**Objetivo — 3 claves, 8/8 (MEDICION:234-238):**

| Clave | Tipo |
|---|---|
| `objective_id` | string |
| `title` | string |
| `phases` | array de fases |

**Fase — 3 claves, 30/30 (MEDICION:248-252):**

| Clave | Tipo |
|---|---|
| `phase_id` | string |
| `title` | string |
| `runs` | array de runs |

**Objetivo y fase no llevan `summary` ni `full_description`, y la ausencia es
DELIBERADA: decisión previa que este contrato respeta, no omisión que corregir.**
La reducción a solo-título la ejecutó el propio roadmap y quedó registrada dentro
de él — `RUN-CANTU-ROADMAP-EDITOR-USABILITY-001` consigna: "Objectives and phases
were reduced to a title only; summary and full_description were removed from the
schema, the data and the console, and remain recoverable from Git"
(CANTU-ROADMAP:199, releído de primera mano; confirmado en disco por la medición,
MEDICION:240-244 — 3 y 3 claves, sin excepciones). Quien los "restaure" creyendo
que faltan no estaría llenando un hueco: estaría reabriendo una decisión ya
ejecutada en los tres lugares de los que se removieron — y no rescatando nada,
porque el propio registro deja el texto recuperable de Git.

**Run — 9 claves, y ninguna más (MEDICION:256-266; veredicto de completitud contra
el audit: MEDICION:268-270):**

| Clave | Presencia | Tipo | Nota |
|---|---:|---|---|
| `run_id` | 65/65 | string | |
| `queue_order` | 65/65 | entero | secuencia GLOBAL 1..65, única y densa en el ejemplar medido (MEDICION:321-322); propiedad medida, no se congela como norma |
| `title` | 65/65 | string | |
| `summary` | 65/65 | string | |
| `full_description` | 65/65 | string | |
| `status` | 65/65 | string | uno de los cuatro tokens de §11.a |
| `depends_on` | 65/65 | array de `run_id` | 48 con dependencias, 17 vacíos, cero referencias colgantes en disco (MEDICION:323-325). Una entrada puede apuntar a un run de OTRO proyecto — §10.d |
| `closeout_result` | 9/65 | string | OPCIONAL — §14 |
| `progress` | 1/65 | array de objetos | OPCIONAL — §15 |

Más las dos claves RESERVADAS de §16 (`category`, `batch`), que hoy no existen en
ningún run y nacen ausentes.

### 10.b Objetivos y fases NO llevan `status` ni contadores

**Ningún campo derivable se almacena. En ningún nivel.** Ni `status` de objetivo,
ni `status` de fase, ni contadores (completados, bloqueados, ratios).

Es la regla de la capa 1 (§2) aplicada un nivel arriba. §2 dice: todo archivo
requerido tiene emisor; ninguno se escribe a mano. El equivalente a nivel de campo:
todo valor derivable tiene función (§12) que se aplica AL LEER; ningún derivado se
persiste. Un derivado almacenado es la versión a nivel de campo del archivo escrito
a mano — una copia de la verdad que alguien tendría que regenerar en cada escritura
y que nadie regenera. Las tres semanas de podredumbre de §2 son ese mecanismo
operando a nivel de archivo; un `status` de objetivo almacenado sería el mismo
mecanismo esperando dentro del árbol.

Los contadores, además, ya viven donde deben: la consola los deriva en render
(`v3ObjectiveStats`, `v3PhaseRatio` — AUDIT:464-468; el stat "Blocked" — AUDIT:334)
sin persistir ninguno. Almacenarlos duplicaría lo que el consumidor ya calcula.

### 10.c `schema_version` del roadmap: identificador propio; el de `.aiw` no se toca

El v3 vivo se identifica hoy como `"jame.roadmap_v3.v0.2-progress"`
(CANTU-ROADMAP:2, vía MEDICION:227; releído de primera mano). Esa cadena es uno de
los tres ROMPE que midió el audit: el validador de Cantu exige el match EXACTO y
se pone rojo si no lo hay (`CANTU-VALID:963-964`, releído de primera mano;
AUDIT:762-764).

**Bajo `.project/`, el roadmap lleva identificador propio: `roadmap_tree_v1`.**
Sin `jame`, sin `cantu`, sin `aiw`, sin nombre de consola. Es el criterio de §1
aplicado al identificador: nombra el CONTENIDO — el árbol que este contrato ya
llama `roadmap_tree` (§3) — y no al emisor ni al consumidor. Que el nombre del
modelo coincida con el de la clave que lo transporta es deliberado: un solo
sustantivo para una sola cosa. La versión arranca en 1 y cuenta el linaje de ESTE
contrato (criterio de §4): `v3` y `v0.2-progress` numeran la historia interna de
JAME, y heredarlos importaría al nombre nuevo la historia del nombre que se
abandona.

Dónde viaja: en la raíz del árbol, el identificador es la clave `schema_version`
(§10.a). No colisiona con §4: el `schema_version` ENTERO es el del envelope del
snapshot y versiona el contrato del archivo; éste es string y nombra el modelo del
árbol transportado — dos niveles, dos preguntas, y nadie los "unifica". La clave
portadora del identificador cuando el árbol viaja dentro de `roadmap_tree` la fija
el emisor del tramo 2 con su ejemplo — hoy el modelo plano usa `model`
(CONSOLE-SNAP:10) — misma disciplina que §17. El identificador del modelo plano
(`aiw_flat_objectives_v1`) es del emisor y anterior a este contrato; si le cabe
este mismo criterio es asunto del tramo 2, no de esta capa.

**El roadmap de `.aiw/` conserva su `schema_version` INTACTO hasta el corte del
tramo 7.** Cambiarlo pondría rojo al validador vivo (el match exacto de
`CANTU-VALID:963-964`), en contra de D-036, cuya premisa entera es que la carpeta
nueva se crea ADITIVA y deja intacto todo lo que está en `.aiw` (§0, §9;
`context/DECISIONES.md:427-451`).

**Durante los tramos 4–7 conviven dos roadmaps con dos identificadores
distintos** — `jame.roadmap_v3.v0.2-progress` en `.aiw/`, `roadmap_tree_v1` bajo
`.project/`. Es la consecuencia esperada de la convivencia aditiva (D-036), no una
anomalía, y queda escrito para que nadie lo "reconcilie": reconciliar sería o
tocar el de `.aiw` (rojo del validador, contra D-036) o devolver `jame` a
`.project/` (contra §1). La doble identidad es el mecanismo que mantiene verde lo
viejo mientras existe lo nuevo — la lógica de §4: la ruta desambigua, y aquí
además el identificador.

### 10.d Dependencias que cruzan proyectos — `run_id` es globalmente único

**Añadido por la enmienda D-041 (2026-07-23).** §10.a define `depends_on` como
array de `run_id`, y en un roadmap suelto eso solo puede leerse como "del mismo
roadmap". Esta subsección adjudica qué pasa cuando una entrada apunta a un run que
vive en OTRO proyecto: el caso que la migración de O0 crea y que el contrato, tal
como estaba, declaraba malformado.

#### El hueco, medido

El grafo de hoy está íntegro: **0** referencias colgantes, **0** auto-referencias,
**0** duplicados, **0** `depends_on` ausentes o no-array (MEDICION-GRAFO:263-274;
recorrido propio 2026-07-23 — 65 runs, 65 `run_id` únicos, 101 aristas, 0 destinos
inexistentes). Está íntegro **porque todo vive en un solo roadmap**: hoy no existe
una sola arista entre proyectos que pudiera estar mal.

Migrar O0 crea **8** aristas que apuntan fuera del roadmap local
(MEDICION-GRAFO:131; recuento propio: 8). Sin esta subsección el contrato las
declararía a las ocho malformadas, porque "array de `run_id`" del mismo árbol no
admite otra lectura. **La migración habría empezado produciendo datos que el propio
contrato rechaza** — y el rechazo habría sido del contrato, no de los datos.

#### Regla 1 — `run_id` es globalmente único

**Un `run_id` identifica un run en TODOS los proyectos que exponen `.project/`, no
solo dentro de su roadmap.** Es requisito sobre quien ACUÑA ids, no sobre quien los
lee.

No se inventa nada: es la extensión natural de D-034, que ya fijó el `run_id` como
**identidad inmutable** (`context/DECISIONES.md:372`). Un id inmutable que se
reusara en otro proyecto dejaría de identificar — inmutabilidad sin unicidad no
sirve para nada.

**Declararlo hoy cuesta cero, y eso está medido, no supuesto.** En disco hay hoy
DOS roadmaps vigentes que llevan runs, no uno:

| Archivo | Runs | `run_id` únicos | Familia de id |
|---|---:|---:|---|
| `projects/cantu-studio/.aiw/roadmap/roadmap.json` (CANTU-ROADMAP) | 65 | 65 | `RUN-<PREFIJO>-<TEMA>-NNN` |
| `projects/aiw-console/.aiw/views/roadmap.json` (`:4`, `:13`) | 16 | 16 | `NNN-tema`, `APPROVED-*`, `ERROR-*`, `HUMAN_REVIEW-*` |

**81 ids, 81 distintos, intersección CERO** (medición propia 2026-07-23). El
segundo vive en el repo de la consola pero **describe a AIW**: su único objetivo se
titula `aiw` y se resume "16 AIW objectives (pending, parked, processed)"
(`projects/aiw-console/.aiw/views/roadmap.json:6-7`). Su copia de entrega
(`projects/aiw-console/.aiw/roadmap/roadmap.json`) lleva el mismo conjunto de 16 —
patrón canónico+copia (AUDIT:821-825), no un tercer espacio de ids. No se midieron
los archivos legacy del mismo directorio de Cantu (`roadmap_v2.json`,
`roadmap_v2_normalized_proposal.json`, `legacy_run_disposition_map_v2.json`):
quedaron fuera del alcance de la medición (MEDICION-GRAFO:491-494), son modelo
retirado y `.project/` no los expone.

La unicidad global ya es cierta **de hecho**. La regla no cambia un byte en ningún
repo: escribe lo que la medición encuentra, para que el día que alguien acuñe un id
no sea libre de romperla.

**Tensión anotada, porque la medición la deja a la vista.** Los dos espacios de id
son disjuntos por **convención**, no por regla: este contrato no fija en ninguna
parte la FORMA de un `run_id`, y las dos familias medidas no se coordinaron entre
sí. La familia que el proyector emite para AIW se deriva de nombres de carpeta de
objetivo (`005-roadmap-contract-fix`, `APPROVED-001-console-projector`) — ids
cortos y genéricos, que son justamente los que colisionarían con un tercer proyecto
que también numere sus carpetas. Que esa colisión llegue a ocurrir es
**[NO VERIFICADO]**: es inferencia sobre la forma de los ids medidos, no un hecho
en disco. Se registra porque es el escenario concreto que dispara la salida de la
Regla 4.

> **Estado de esta tensión: CERRADA por la Regla 1.a** (enmienda D-043). La frase
> «este contrato no fija en ninguna parte la FORMA de un `run_id`» describía el
> contrato **antes** de esa regla y se conserva como registro del razonamiento que
> la produjo, no como afirmación vigente. Lo que sigue vigente de este párrafo es
> el hecho medido: las dos familias de id en disco no se coordinaron entre sí, y la
> que el proyector emite es la fácil de colisionar. La Regla 1.a fija la forma
> hacia adelante y **no** regulariza esos 16 ids; qué pasa con ellos lo resuelve la
> Regla 1.b, como trabajo del tramo 2.
>
> **Precisión de ruta, también medida:** este párrafo dice que la familia del
> proyector «se deriva de nombres de **carpeta**». Se deriva de nombres de
> **archivo** — `objectives/pending/005-roadmap-contract-fix.md` →
> `005-roadmap-contract-fix` (`PROJ:190-192`; MEDICION-PROYECTOR §4, «Corrección a
> D-041»). La sustancia —ids cortos y numerados, la clase más fácil de colisionar—
> queda intacta; y la ruta real es la que hace posible la mutación de la Regla 1.b,
> porque los archivos se renombran y las carpetas no.

#### Regla 1.a — la FORMA de un `run_id`

**Añadido por la enmienda D-043 (2026-07-23).** La Regla 1 declara la unicidad
pero no dice bajo qué construcción se sostiene. Esto lo dice.

**Forma normativa, para todo `run_id` acuñado desde ahora:**

    RUN-<PROYECTO>-<SLUG>-<NNN>

| Parte | Qué es |
|---|---|
| `RUN-` | literal fijo |
| `<PROYECTO>` | nombre corto, en mayúsculas, del proyecto que **creó** el run |
| `<SLUG>` | tema del run, en mayúsculas, palabras separadas por `-` |
| `<NNN>` | tres dígitos, secuencia dentro del par (proyecto, tema) |

**No se inventa: se adopta la que ya existe con 65 ejemplares.** Medido de primera
mano el 2026-07-23 sobre CANTU-ROADMAP: **65 de 65** `run_id` casan la forma, sin
una sola excepción; los prefijos son `JAME` (48) y `CANTU` (17); **0** ids llevan
minúsculas.

**Por qué ésta y no una mejor.** Una convención con 65 ejemplares en disco **tiene
emisor y tiene evidencia** — es exactamente lo contrario del patrón que §3.b
prohíbe. Diseñar aquí una forma distinta —más corta, con namespace, con el
proyecto fuera del id— sería schema nuevo sin emisor y sin un solo ejemplar que lo
necesite; y sería peor que el caso de §3.b, porque allá no había ejemplares que
contradecir y aquí hay 65 que quedarían declarados ilegales de un plumazo. La
única razón para preferir una forma inventada sería estética, y este contrato ya
adjudicó dos veces (§14, §16) que la estética no gana contra datos en disco.

**Límite medido, escrito para que nadie se apoye en `<NNN>`.** Los 65 ids llevan
`001`: la secuencia **nunca se ha ejercido más allá del primero** (medición propia
2026-07-23). Hoy quien identifica, identifica por `<SLUG>`. `<NNN>` se conserva
porque es parte de la forma que los 65 ejemplares tienen —quitarlo sería inventar
igual que añadir—, pero **no es donde vive la unicidad**, y un emisor que crea
distinguir dos runs incrementándolo se estaría apoyando en un mecanismo que ningún
dato en disco ejercita.

##### El prefijo es PROCEDENCIA, no propiedad

`<PROYECTO>` identifica al proyecto que **CREÓ** el run. **No** al que lo aloja
hoy. La consecuencia se escribe entera porque es contraintuitiva y alguien la va a
querer "arreglar":

- **Los 12 runs de O0 que migran conservan su prefijo.** Medido tras el re-archivo
  de D-042: O0 tiene hoy 12 runs, 8 con prefijo `CANTU` y 4 con `JAME` (recuento
  propio 2026-07-23). Los 12 llegan al roadmap de `aiw-console` como
  `RUN-CANTU-*` y `RUN-JAME-*`, y así se quedan.
- **El roadmap de la consola nace, por tanto, con prefijos mixtos.** Eso es
  **correcto, no deuda**. Cambiarlos al migrar rompería la inmutabilidad de la
  Regla 1.b — y la rompería en el momento exacto en que la identidad más se
  necesita, porque migrar es cuando el id es lo único que sobrevive al cambio de
  archivo, de repo y de vecinos.
- **Corolario: `RUN-JAME-` sobrevive aunque JAME sea un nombre muerto.** El
  contrato entero está construido para sacar `jame` de los identificadores nuevos
  (§10.c, §19), y aquí lo conserva a propósito: son cosas distintas.
  `jame.roadmap_v3.v0.2-progress` nombra al emisor de un **modelo** que se sigue
  emitiendo, así que el nombre miente cada vez que se usa; `RUN-JAME-…-001` nombra
  a quien creó un **evento** que ya ocurrió, y ese hecho no caduca cuando el
  proyecto se renombra. **La inmutabilidad gana sobre la limpieza de nombres**: un
  id es un dedo que señala, no una etiqueta que describe.

##### `<PROYECTO>` NO es `project_id`, y nadie ramifica sobre él

Los dos prefijos medidos no son el `project_id` de nadie: el proyecto de los 48
`RUN-JAME-*` se identifica `jame_system_dual` (`CANTU-VALID:609`) y vive hoy en una
carpeta llamada `cantu-studio`. `<PROYECTO>` es un nombre corto de época, no una
clave.

De ahí la prohibición, que es §5 aplicada a este campo: **ningún consumidor
compara el prefijo contra un literal ni ramifica comportamiento sobre él.** Un
`run_id` se compara entero o no se compara. Parsear el prefijo para rutear
reintroduciría el ROMPE que §5 midió, con el agravante de que aquí el valor es
histórico por diseño: rutear por `RUN-JAME-` sería mandar trabajo de hoy a un
proyecto que ya no existe.

##### Alcance: sólo hacia adelante

**La forma aplica a los `run_id` creados desde ahora.** Los existentes **no se
regularizan** — ni los 65 de Cantu (que ya la cumplen) ni los 16 que el proyector
emite para AIW (que no la cumplen: **0 de 16**, medición propia). Qué pasa con esos
16 lo resuelve la Regla 1.b, y no por vía estética.

#### Regla 1.b — la ESTABILIDAD: un `run_id` no cambia NUNCA

**Norma:** el `run_id` se asigna **al crear el run** y no cambia nunca. Ni al
cambiar de `status`. Ni al archivarse. Ni al migrar de proyecto. Ni al renombrarse
el proyecto que lo acuñó.

Es lo que D-034 ya fijó como identidad inmutable (`context/DECISIONES.md:372`) y
que la Regla 1 extendió a unicidad global. Aquí se escribe la consecuencia que
ninguna de las dos escribió: **de qué NO puede derivarse un `run_id`.**

##### Un emisor con derivación mutable VIOLA el contrato

**Regla:** un emisor que derive `run_id` de una fuente que cambia durante la vida
del run **viola este contrato**. No es preferencia de diseño: sin esto, "inmutable"
es una promesa que el contrato hace y que ningún emisor está obligado a cumplir.

**No es hipótesis. Hay un emisor medido que la viola hoy** (MEDICION-PROYECTOR §4,
§4.a). La cadena, citada:

1. El proyector fabrica el id a partir del **nombre del archivo** del objetivo:
   `PROJ:192` — `const id = name.replace(/\.md$/i, "");`. No lee frontmatter, ni un
   campo `run_id`, ni un índice.
2. Ese id viaja tal cual a las tres ramas del roadmap emitido: `PROJ:235`,
   `PROJ:247`, `PROJ:262` — `run_id: objective.id`, sin transformación.
3. El kernel **renombra el archivo** al archivarlo, anteponiéndole el estado
   terminal (`aiw/queue.mjs:58`):

```js
path.join(PROCESSED, `${state}-${f}`)
```

Resultado medido en disco: `aiw/objectives/processed/` contiene
`APPROVED-001-console-projector.md`, `ERROR-000-sandbox.md`,
`HUMAN_REVIEW-999-sandbox-imposible.md`. El objetivo que estando pendiente
proyectaba `run_id: "001-console-projector"` proyecta, una vez completado,
`run_id: "APPROVED-001-console-projector"`.

**Muta exactamente en la transición que más importa** —cuando el run termina— y
muta de forma silenciosa: nadie edita nada, el id simplemente es otro en la
proyección siguiente.

##### La razón de fondo: es status codificado DENTRO de la identidad

El prefijo no es un adorno del nombre: es el **estado del run metido dentro de su
id**. Y eso es el defecto que §12.c prohíbe un nivel más arriba —guardar lo que se
deriva— en **su forma más dañina**, porque corrompe la única cosa que este contrato
declara inmutable.

La comparación, con las tres capas medidas del mismo dato:

- **La clasificación ya viene de la carpeta.** El proyector recorre
  `objectives/{pending, parked, processed}` (`PROJ:38` → `PROJ:188-190`) y de ahí
  sale la `classification` (`PROJ:202`) que `taxonomy_model` declara como
  vocabulario (`PROJ:463-466`).
- **El desenlace ya viene del prefijo, extraído aparte.** El proyector lo saca con
  su propia regex (`PROJ:196`) y lo emite **dos veces** como campo derivado: en
  `status` (`PROJ:258-260`, vía `PROCESSED_STATUS_BY_PREFIX`, `PROJ:58-65`) y en
  `closeout_result` (`PROJ:269`).
- **Y además se queda dentro del `run_id`.** Ésa es la tercera copia — y la única
  que no es un derivado más, sino la identidad misma.

Que el mismo dato viaje en `status` y en `closeout_result` es §12.c operando
normalmente: derivados que el emisor calcula al emitir. Que viaje **también** en el
id no añade información a nadie y le quita al sistema lo único que la Regla 1
prometía. Un derivado de más se recalcula; una identidad rota no se repara: todo lo
que apuntaba al id viejo ya apuntaba a nada.

##### Trabajo del TRAMO 2, y no rompe ninguna promesa

Anotado como alcance del tramo 2, con dos exigencias:

1. **Derivar el `run_id` de una fuente estable**, no del nombre de archivo. El
   punto de cambio es único y está medido: `PROJ:192` es el **único** lugar donde
   se fabrica el id (MEDICION-PROYECTOR §4.a). El prefijo de estado ya se extrae
   por separado en `PROJ:196` y ya viaja en dos campos propios, así que despojarlo
   del id no pierde un solo dato.
2. **Aplicar la forma de la Regla 1.a** a lo que ese punto emita.

**Por qué regularizar esos 16 ids no rompe nada, y por qué eso es un argumento
incómodo pero válido:** los 16 `run_id` de AIW **no son identidad hoy** — mutan
(cadena de arriba). Un id que cambia solo no puede haber sido prometido a nadie
como estable, así que cambiarle la forma no incumple ninguna promesa que el sistema
haya hecho. Es decir: la misma medición que prueba el defecto es la que abarata su
arreglo. Ésta es la **única** ventana en la que regularizarlos es gratis; el día que
el emisor los haga estables, dejarán de serlo y la Regla 1.b los protegerá como
protege a los 65 de Cantu.

**[NO VERIFICADO]** si algún consumidor guarda `run_id` de AIW entre proyecciones
—y por tanto ya sufre la mutación de hoy, o sufriría la regularización de mañana—:
no se midieron los consumidores (MEDICION-PROYECTOR §4.a, grado de verificación).
Es la única incógnita del arreglo, y se resuelve midiendo, no deliberando.

#### Regla 2 — externo es LEGAL; colgante sigue siendo malformado

Los dos casos que antes se confundían en uno, separados:

| Caso | Qué es | Veredicto |
|---|---|---|
| **Externo** | el `run_id` existe, en otro proyecto | **LEGAL.** Es una dependencia entre proyectos. |
| **Colgante** | el `run_id` no existe en NINGUNA parte | **MALFORMADO.** Sin cambio respecto de lo que ya era. |

**Una entrada de `depends_on` que no resuelve dentro del roadmap local NO es un
colgante.** Es la forma que tiene este contrato de escribir una dependencia entre
proyectos, y es la única que hay: la Regla 1 la hace suficiente.

La forma del campo **no cambia**: sigue siendo array de `run_id` desnudos (§10.a).
Un consumidor que no sepa nada de esto lee el array igual que antes. Lo que cambia
es qué debe hacer cuando una entrada no resuelve — Regla 3.

#### Regla 3 — el consumidor resuelve globalmente, y declara lo que no resuelve

**Obligación del consumidor, en dos pasos:**

1. **Resolver globalmente**, contra el conjunto de proyectos que tiene cargados —
   no solo contra el roadmap en el que aparece la entrada.
2. **Si no resuelve: declararlo SIN RESOLVER en la superficie afectada**, nombrando
   el `run_id`. Nunca ocultarlo, nunca omitirlo de la lista de dependencias, nunca
   renderizar el run como si esa dependencia no existiera.

Es §20 aplicado a un campo en vez de a un archivo, y por la misma razón: renderizar
sin anunciar la ausencia **afirma que el dato no existe, y eso es mentira** (§20).
Allá el consumidor declara el archivo que le falta; aquí, la dependencia que no
pudo resolver. Fallar ruidoso, nunca silencioso — también dentro de un campo.

**Precisión que hace la regla implementable: "sin resolver" y "colgante" no son la
misma afirmación, y casi ningún consumidor puede distinguirlas.** Quien carga UN
proyecto no tiene cómo saber si el id que no resuelve vive en otro proyecto o no
existe en el mundo. Por eso el deber es **declarar**, no **clasificar**: "sin
resolver" es lo que el consumidor sabe; "colgante" es un veredicto que solo puede
emitir quien tiene cargados todos los proyectos.

**Consecuencia para el validador (capa 3):** con un roadmap suelto, una entrada que
no resuelve es **advertencia**, nunca rojo — el criterio de §21: no se endurece a
rojo lo que el dato disponible no permite afirmar. El rojo por colgante exige el
conjunto completo de proyectos cargados; solo ahí "no existe en ninguna parte" es
comprobable.

#### Regla 4 — la forma calificada NO se adopta hoy

La alternativa evaluada: que una entrada de `depends_on` pudiera ser
`{project, run_id}` en vez de un `run_id` desnudo, nombrando explícitamente al
proyecto dueño del prerequisito.

**No se adopta. Queda anotada como salida disponible, con su condición de disparo
escrita.**

Por qué no hoy, con la mecánica de §16: **un campo nuevo cuesta migración en tres
repos** — el v3 o su semilla viven en cantu-studio, en aiw-console y en aiw
(§16; AUDIT:137-145, :671-675, :646-650) — **y hoy no compra nada.** No compra
desambiguación: la Regla 1 la da, y la medición dice que ya es cierta (81 ids, 0
colisiones). No compra capacidad de resolución: un consumidor que carga los
proyectos resuelve por id sin ayuda. Compraría solo resolver *sin buscar* — una
optimización de lectura, pagada con una migración en tres repos y con un campo de
dos tipos posibles que todo consumidor tendría que aceptar. Adoptarla hoy sería el
patrón de §3.b: schema nuevo sin emisor y sin un solo ejemplar que lo necesite.

**Condición de disparo, escrita para no re-deliberarla:** la primera colisión real
de `run_id` entre dos proyectos que expongan `.project/`. Ese día la Regla 1 deja
de ser cierta de hecho y el id desnudo deja de identificar.

**Adoptarla entonces es ADITIVO, y por eso esperar es barato:** una entrada pasa a
poder ser string U objeto, y las entradas existentes siguen válidas sin tocarse. Es
el mismo mecanismo que §6 dejó preparado para el hash en `sources`: la forma se
elige de modo que el cambio futuro sume en vez de romper.

**Anotación de la enmienda D-043: la regla 4 SIGUE VIGENTE; su disparo se vuelve
más improbable.** Con la forma de la Regla 1.a, la condición escrita arriba —«la
primera colisión real de `run_id` entre dos proyectos»— pasa a requerir que **dos
proyectos compartan el prefijo `<PROYECTO>`**, y además el mismo `<SLUG>` y el mismo
`<NNN>`. Como el prefijo nombra al proyecto que acuña (Regla 1.a), eso solo puede
ocurrir de dos maneras: dos proyectos que se llamen igual, o uno acuñando ids con el
prefijo de otro —que es acuñar en nombre ajeno, no colisionar por accidente—.

La regla **no se retira, y la distinción importa**: la forma hace la colisión más
difícil, no imposible, y una forma no es un mecanismo de asignación. Nada en este
contrato reserva prefijos ni impide que dos proyectos elijan el mismo; la Regla 1.a
describe cómo se construye un id, no quién tiene derecho a un prefijo. Retirar la
salida porque su disparo es improbable dejaría al sistema sin respuesta escrita
justo para el caso que ya no se estaría vigilando. La salida sigue siendo aditiva
(párrafo anterior), así que mantenerla anotada cuesta exactamente lo mismo que
antes: cero.

#### Qué queda de las 8 aristas

Bajo estas cuatro reglas, las 8 aristas que la migración de O0 crea
(MEDICION-GRAFO:131) **no son un daño que reparar antes de migrar**: son 8
dependencias externas legales, cada una declarable. Siete salen del bloque de
rename hacia O1/O2/O3; la octava entra desde O2 contra un run ya `completed` —
arista histórica, no bloqueo vivo (MEDICION-GRAFO:133-136; recuento propio: 8
aristas, las 8 entre objetivos distintos, destino de la entrante `completed`).

Y lo que la medición dejó explícitamente sin poder decidir — "8 vs 4 son conteos
comparables entre sí, pero no traducibles a coste hasta que el contrato defina la
arista cruzada" (MEDICION-GRAFO:247-255) — queda decidido aquí: **el coste de una
arista cruzada es CERO en forma de dato** (no cambia el schema, no cambia el
emisor) **y un requisito de declaración sobre el consumidor** (Regla 3).

## 11. Dos vocabularios de `status`, uno por nivel

Son dos vocabularios DISTINTOS, y la diferencia es deliberada. Uno se almacena; el
otro solo existe al derivar.

### 11.a Run — almacenado, cuatro tokens

    planned · active · blocked · completed

Medido: 65/65 runs tienen `status`; el conjunto observado es exactamente
`{planned: 53, completed: 11, active: 1}` — subconjunto propio del vocabulario, sin
valores inesperados, sin null, sin variantes de capitalización (MEDICION:104-115).
Hay exactamente un run `active` en todo el roadmap (CANTU-ROADMAP:219 vía
MEDICION:137), coherente con la convención de un solo run en curso que el audit
describe (AUDIT:332) — convención observada, no norma de esta capa.

**`blocked` se declara aunque la medición no lo instancie (0/65,
MEDICION:117-121).** Un estado declarado y vacío es honesto: el vocabulario
describe lo que un run PUEDE decir, no lo que los 65 de hoy dicen. Quitarlo por no
instanciado obligaría a re-agregarlo el día que un run se bloquee — y ese día el
token hará falta con urgencia, no con calma. El token tampoco es invención de esta
capa: la semilla de roadmap de AIW declara los mismos cuatro
(`aiw/roadmap_AIW_temp.md:13` vía AUDIT:646-650), y la consola ya cuenta `blocked`
en un stat propio (AUDIT:334; Anexo B.2).

### 11.b Objetivo — derivado, cinco tokens

    planned · in_progress · active · blocked · completed

Estos cinco tokens **no aparecen en el archivo**: nombran el resultado de la
función de §12 y solo existen al aplicarla. Dónde sí se escriben: en la pantalla
del consumidor que derive, y en la declaración de vocabulario del snapshot que
transporte v3 (§17).

### 11.c Por qué los vocabularios difieren

Porque miden cosas distintas. Un run `active` **se ejecuta AHORA**: es el token del
único run en curso del roadmap entero (MEDICION:137). Un objetivo puede llevar
meses empezado sin que nada corra: O5 tiene 2 de 7 runs `completed` y cero
corriendo (MEDICION:162, :174-179). Si el vocabulario de objetivo reusara `active`
para decir "empezado", la misma palabra significaría "ejecutándose en este momento"
en un nivel y "alguna vez avanzó" en el otro — dos significados bajo una palabra.

Esa trampa ya existe en el sistema y está medida: `active` y `blocked` figuran hoy
en `taxonomy_model` calificando al PROYECTO (`operational_statuses` del modelo
plano) y en el roadmap v3 calificando a un RUN — "ejes distintos con palabras
iguales" (MEDICION:85-89). El vocabulario de objetivo no suma un tercer eje a esa
colisión: donde el significado es nuevo ("empezado pero nada corre ahora"), el
token es nuevo — `in_progress`.

## 12. La función de derivación — NORMATIVA, NO ALMACENADA

El status de un objetivo se DERIVA de los `status` de sus runs — la unión de los
runs de todas sus fases, en un solo paso. La función toma runs, no derivados
intermedios: los cinco tokens de §11.b no son entrada válida, así que "derivar
fase→objetivo en cadena" ni siquiera tipa.

### 12.a Precedencia estricta

Se evalúa en este orden; gana la primera regla que aplique:

1. **`active`** — algún run `active`.
2. **`blocked`** — ningún run `active` y algún run `blocked`.
3. **`completed`** — todos los runs `completed`, y hay al menos uno.
4. **`in_progress`** — algún run `completed`, pero no todos.
5. **`planned`** — ningún run ha salido de `planned`.

La función se define sobre el vocabulario cerrado de §11.a: un run con un token
fuera de él es entrada malformada (la rechaza el validador de la capa 3), no un
caso adicional de esta tabla.

Dos notas sobre el orden y las cláusulas:

- Las ramas 2 y 3 no pueden aplicar a la vez (un run `blocked` impide que "todos"
  estén `completed`), así que su orden relativo no decide nada. La precedencia
  portante es **`blocked` por encima de `in_progress`**: un objetivo con avance Y
  un run bloqueado dice `blocked` — atención requerida — antes que `in_progress`.
- La cláusula "y hay al menos uno" de la rama 3 es redundante con el dominio
  (§12.b) y se escribe adrede: es la guarda que neutraliza la vacuidad si alguien
  implementa la regla sin leer §12.b.

### 12.b Objetivo con 0 runs: MALFORMADO

**La derivación queda INDEFINIDA. No recibe token — ninguno.** El validador de la
capa 3 lo rechaza como dato malformado.

Por qué no se inventa un token para el caso: un objetivo sin runs no es un estado
del trabajo, es un error de datos, e inventarle un token lo haría viajar,
renderizarse y agregarse como si fuera trabajo. Inventar un token para un estado
inválido es peor que declararlo inválido. Y por qué no se deja a la semántica
ingenua: la rama 3 evaluada sobre lista vacía es verdadera por vacuidad —
`[].every() === true` en JS — de modo que un objetivo recién creado y vacío
derivaría `completed`: **declararía terminado lo que nunca existió**. La medición
detectó exactamente este agujero, lo neutralizó con una guarda de longitud y lo
reportó como decisión pendiente, no como medición (MEDICION:197-204). Ésta es la
decisión: inválido, no derivable. Tampoco `planned`: `planned` afirma "hay plan y
nadie lo ha empezado"; un objetivo vacío no afirma nada todavía.

Los 8 objetivos de hoy tienen ≥1 run (MEDICION:197-198), así que el caso no existe
en disco: la regla protege el futuro, no corrige el presente.

### 12.c Especificada aquí, escrita en ninguna parte

**La función es normativa — este contrato la fija — y su resultado NO se escribe en
el snapshot.** Ninguna clave del árbol lo transporta (§10.b). El porqué queda
escrito con todas sus letras, porque las dos alternativas son los dos modos de
fallo que este contrato existe para matar:

- **Almacenarlo** crea la segunda copia de la verdad. Un `status` de objetivo
  persistido hay que regenerarlo en cada escritura del roadmap; el día que no se
  regenere, el árbol dirá una cosa y el campo otra — la podredumbre de §2 (21.57
  días medidos), reproducida dentro del propio archivo que este contrato creó para
  matarla.
- **No especificarla** deja la derivación al gusto de cada consumidor, y entonces
  **dos consolas muestran dos verdades sobre el mismo archivo** — el fallo exacto
  que este contrato existe para matar, en su versión de lectura. No es hipótesis:
  la regla anterior de la cabina y la de esta capa difieren exactamente en O5
  (`planned` contra `in_progress`, §12.d). Dos consumidores razonables, dos reglas
  razonables, dos pantallas distintas — hoy, con los datos de hoy.

Especificada y no almacenada: **una sola fuente (los `status` de run del árbol),
una sola lectura (esta función).**

### 12.d Prueba contra los datos reales

Conteos por objetivo: los de la medición (MEDICION:158-167), reproducidos de
primera mano el 2026-07-23. La columna "deriva" aplica la regla de ESTA capa — la
medición probó la regla anterior; abajo, por qué se descartó.

| # | `objective_id` | n runs | planned | active | completed | blocked | Deriva (§12.a) | Rama |
|---|---|---:|---:|---:|---:|---:|---|---:|
| 1 | `O0` | 17 | 7 | 1 | 9 | 0 | **`active`** | 1 |
| 2 | `O2` | 6 | 6 | 0 | 0 | 0 | `planned` | 5 |
| 3 | `O5` | 7 | 5 | 0 | 2 | 0 | **`in_progress`** | 4 |
| 4 | `O1` | 19 | 19 | 0 | 0 | 0 | `planned` | 5 |
| 5 | `O4` | 1 | 1 | 0 | 0 | 0 | `planned` | 5 |
| 6 | `O3` | 7 | 7 | 0 | 0 | 0 | `planned` | 5 |
| 7 | `O6` | 5 | 5 | 0 | 0 | 0 | `planned` | 5 |
| 8 | `O7` | 3 | 3 | 0 | 0 | 0 | `planned` | 5 |

Distribución derivada: **1 `active`, 1 `in_progress`, 6 `planned`, 0 `completed`,
0 `blocked`.** Suma: 17+6+7+19+1+7+5+3 = 65 ✓ (MEDICION:155-156).

- **O0 prueba la precedencia con datos.** Tiene a la vez 1 run `active` y 9
  `completed` (MEDICION:160): la rama 1 gana sobre la 4 — `active`, no
  `in_progress`. Contra la regla anterior la medición reportó que la precedencia no
  se dejaba discriminar con estos datos (MEDICION:205-207); con `in_progress` en el
  vocabulario, O0 sí la discrimina.
- **O5 es la razón de ser de `in_progress`.** La regla anterior de la cabina —
  `active`, luego `completed`-todos, luego `blocked`, luego `planned`; la que la
  medición evaluó (MEDICION:147-153) — derivaba `planned` para O5 (MEDICION:162,
  marca ⚠️ A): el mismo token que O1, O2, O3, O6 y O7, donde no se ha completado
  nada. Colapsaba "29 % hecho" y "0 % hecho" al mismo símbolo — **no distinguía
  "empezado" de "no empezado"** (MEDICION:174-180) — y por eso se descartó. La
  señal de avance que la consola ya calcula en render (`v3PhaseRatio`,
  `v3ObjectiveStats`; MEDICION:180-183, AUDIT:464-468) deja de perderse a nivel de
  token.
- **O4 no valida nada.** Con n=1 la regla es la identidad, sin agregación real
  (MEDICION:184-188). Se anota para que nadie lo cuente como confirmación.

### 12.e Ramas sin instancia en los datos de hoy

- **Rama 3 (`completed`):** ningún objetivo tiene todos sus runs `completed`; el
  más cercano, O0, está a 8 de distancia (MEDICION:192-194).
- **Rama 2 (`blocked`):** con 0 runs `blocked` en disco, hoy es inalcanzable por
  cualquier camino (MEDICION:195-196).

Ambas se especifican **por completitud, no por evidencia**, y así quedan marcadas:
SIN INSTANCIA EN LOS DATOS DE HOY. La marca deliberadamente NO es
**[NO VERIFICADO]**: esa marca es para afirmaciones sobre el mundo que no se
pudieron comprobar, y una rama de una definición no afirma nada sobre el disco —
define qué token corresponde si el caso aparece.

## 13. Fases: mismo criterio, misma función

Una fase no almacena `status` ni contadores (§10.b). Si un consumidor necesita el
status de una fase, aplica **la misma función de §12** sobre los runs de esa fase:
mismo vocabulario de salida (§11.b), misma precedencia, mismo dominio — una fase
con 0 runs es MALFORMADA exactamente como un objetivo con 0 runs (§12.b). Las 30
fases de hoy tienen ≥1 run (recorrido propio 2026-07-23; mínimo observado: 1 run
por fase).

No hay una segunda función. La medición señaló que la regla original saltaba el
nivel intermedio — tres niveles en los datos, dos en la regla (MEDICION:209-214).
La respuesta de esta capa no es una regla por nivel sino UNA función aplicable a
cualquier colección de runs: la de un objetivo (la unión sobre sus fases) o la de
una fase. Dos funciones habrían sido dos maneras de divergir (§12.c).

Las 3 claves de fase medidas quedan documentadas en §10.a: `phase_id`, `title`,
`runs` — 30/30, sin excepciones (MEDICION:248-252).

## 14. `closeout_result` NO se convierte en enum

Tipo: **string**. Sin enum. **Opcional** — también para runs `completed`.

Lo medido (MEDICION:294-299): 9 de 65 runs lo tienen; 8 son la constante
`"completed_successfully"` (CANTU-ROADMAP:22, 38, 50, 170, 182, 192, 202, 459) y 1
es prosa libre de párrafo completo (`RUN-JAME-MATHLIVE-INTEGRATION-READINESS-001`,
CANTU-ROADMAP:486). La clave mezcla un código de resultado y una justificación
narrativa en el mismo campo.

**Por qué no se enumera — la razón de §3.b:** enumerar a partir de 8 valores
observados (en rigor: UNA constante repetida ocho veces, más un párrafo) sería
inventar un schema con evidencia parcial — la mecánica exacta con la que nació la
v0.3. Y el enum nacería rompiendo datos reales: declararía ilegal la prosa que YA
está en disco.

**Por qué es opcional incluso en `completed`:** la medición encontró 11 runs
`completed` y solo 9 con `closeout_result`; dos `completed` no lo tienen
(`RUN-CANTU-ROADMAP-CONTENT-AUDIT-001` y `RUN-CANTU-ROADMAP-CLOSE-ACTIVE-RUN-001`,
MEDICION:310-313). Declararlo requerido pondría rojos dos runs que ya existen.

Hecho medido, no norma de esta capa: la implicación inversa sí se sostiene en
disco — ningún run no-`completed` tiene `closeout_result` (MEDICION:314-315). Se
registra como candidata a chequeo del validador (capa 3), no como requisito de
forma (resuelto: §21 — advertencia, nunca requisito duro).

Candidato a estructurarse — separar `code` + `notes` — **el día que algo lo emita
con esa forma**, no antes. Hoy ningún emisor lo escribe; estructurarlo sin emisor y
sin ejemplo es §3.b.

## 15. `progress`: opcional, documentado, NO congelado

Opcional. Existe en **1 de 65 runs**
(`RUN-JAME-PROJECT-CONSOLE-ROADMAP-V3-PROTOTYPE-001`, CANTU-ROADMAP:51 vía
MEDICION:274-277): un array de 13 entradas, cada una con exactamente estas cinco
claves (MEDICION:278-284):

| Clave | Valores observados en las 13 entradas |
|---|---|
| `cycle` | `1, 2, 3, 4` |
| `stage` | `execution`, `ai_review`, `human_qa`, `correction`, `closeout` |
| `attempt` | `1, 2, 3, 4` |
| `state` | `done` (13/13) |
| `result` | `implemented`, `approved`, `changes_requested`, `passed`, `completed` |

Esta tabla es **evidencia, no norma**. Un solo ejemplar es evidencia débil, y la
propia medición lo dice: "cualquier contrato que lo asuma general estaría asumiendo
un caso único" (MEDICION:288-290). **La forma interna de `progress` NO se congela
en esta capa.** Lo único normativo aquí: la clave es opcional, ausente por defecto,
y su ausencia no invalida el run (64/65 no la tienen).

El único vocabulario de estado-por-etapa de todo el roadmap vive aquí, en un run.
El detalle de run de la consola deriva su "Current stage" de este array (Anexo
B.1) — para los otros 64 runs no hay de dónde derivar.

## 16. `category` (D-029) y `batch` (D-030) — reservados, nacen vacíos

Se reservan dos claves **OPCIONALES a nivel de run**: `category` y `batch`.
Ausentes por defecto — reservarlas no escribe un byte en ningún repo. **NUNCA
requeridas.** Un consumidor de este contrato que no las entienda las ignora; su
ausencia no degrada nada y su presencia no obliga a nada.

Qué función esperan: D-029 clasifica cada run por lo que pasa en su cierre —
manual / semi-autónomo / autónomo — asignado por el humano al crear el run
(`context/DECISIONES.md:246-267`); D-030 asigna cada run a un batch que el humano
fija al encolar y que determina la rama del repo del proyecto
(`context/DECISIONES.md:269-282`).

**La medición devolvió AUSENCIA EXPLÍCITA (MEDICION:343-352):** el barrido léxico
completo — claves y prosa del archivo entero — encontró UNA coincidencia (`stage`,
dentro del `progress` de un único run), y las cuatro convenciones que podrían
confundirse con lo buscado quedaron descartadas una por una (MEDICION:354-363):

- el prefijo `RUN-JAME-*`/`RUN-CANTU-*` marca época de nombrado, no eje de cierre —
  inferencia de la medición a partir de los runs de rename, **[NO VERIFICADO]**
  como afirmación fuerte (la marca es suya y se conserva);
- las fases agrupan por tema, no por destino de aprobación;
- `depends_on` es un grafo de precedencia, no una partición;
- `progress[].stage` registra lo que PASÓ, no lo que el humano ASIGNÓ al crear el
  run, y vive en 1 de 65 runs.

**No hay nada que reciclar y nada con qué chocar. Por eso nombrar hoy es gratis, y
agregar después cuesta migración en tres repos:** el v3 o su semilla viven hoy en
cantu-studio (el canónico más el tooling de edición, AUDIT:137-145), en aiw-console
(el proyector emite un roadmap v3-compatible y la copia de entrega, AUDIT:671-675,
AUDIT:617) y en aiw (la semilla Markdown se declara "futuro
`.aiw/roadmap/roadmap.json` (v3)", AUDIT:646-650). Una clave introducida más tarde
atraviesa los tres; una clave reservada hoy no toca ninguno.

Sin enum y **sin forma fijada — ni siquiera el tipo**. Es el criterio de §14
llevado a su caso límite: `closeout_result` fija "string" porque hay 9 ejemplares
en disco que lo son; de `category` y `batch` hay CERO ejemplares, así que fijar hoy
hasta el tipo sería inventar. Se reserva el nombre y la posición (clave opcional de
run); tipo y forma los trae el primer emisor con su ejemplo. D-029 nombra tres
categorías, pero congelarlas aquí como enum sería §3.b: schema sin emisor.

## 17. `taxonomy_model` es función del modelo transportado

**RESUELTO** (era el candidato que §3.b dejó a esta capa): `taxonomy_model`
**declara el vocabulario del árbol que viene en `roadmap_tree` del mismo
snapshot**. No es una constante del contrato: cambia si cambia el modelo
transportado.

La evidencia, y por qué lo que hay hoy en disco no aplica al v3:

- Lo que hay hoy — idéntico en ambos snapshots, comparado como contenido
  serializado completo, no solo por claves (MEDICION:58-71; volcados :24-56; Anexo
  A.3 de la capa 1):

      objective_classifications: [pending, parked, processed]
      operational_statuses:      [active, blocked, idle]

- Eso describe **`aiw_flat_objectives_v1`** — el modelo que ambos árboles
  transportan (CONSOLE-SNAP:10, AIW-SNAP:10) — y NO el v3: ninguno de los seis
  valores coincide con los `status` de run medidos, salvo la colisión léxica de
  `active` y `blocked`, que ahí califican al proyecto y en v3 a un run
  (MEDICION:82-89).
- **Que sea idéntico en ambos snapshots no prueba estabilidad del campo.** Los dos
  archivos son el mismo proyecto (`project_id: "aiw"` en ambos), emitidos por el
  mismo emisor (`aiw-projector@0.1.0`) contra el mismo modelo, con 11 días de
  diferencia (MEDICION:75-81). Dos emisiones así no pueden divergir en esto, se
  midan cuando se midan: la identidad prueba "mismo proyector, mismo modelo", no
  "constante del contrato". Ninguno de los dos es Cantu; qué declara el snapshot
  v0.3 de Cantu queda **[NO VERIFICADO]** (MEDICION:90-94). La hipótesis de que el
  bloque está horneado como constante en el emisor también quedó
  **[NO VERIFICADO]** — la medición no leyó el emisor (MEDICION:78-81) — y no hace
  falta resolverla para esta decisión.

**Norma:** un snapshot que transporte el v3 (`roadmap_tree_v1`, §10.c) declara el
vocabulario del v3 — los cuatro tokens de run y los cinco derivados de objetivo
(§11), completos. Así el consumidor sabe qué vocabulario leyó sin adivinarlo del
contenido, y la colisión léxica entre modelos (`active`/`blocked` con ejes
distintos) deja de ser trampa: el vocabulario viaja declarado junto al árbol que
califica.

**Norma, no descripción.** "Función del modelo transportado" prescribe lo que el
campo DEBE hacer bajo este contrato; no afirma que el emisor ya lo haga. La
hipótesis contraria — el bloque horneado como constante en el proyector — quedó
**[NO VERIFICADO]** arriba y es compatible con todo lo medido. Si resulta cierta,
adecuar el emisor para que derive `taxonomy_model` del modelo que emite es
**trabajo del tramo 2**, y queda anotado como tal. Mismo patrón que §1.b y §10:
aquí se declara la norma; la implementación tiene su tramo.

Lo que esta capa NO fija: las claves internas bajo las que un snapshot v3 declara
esos dos vocabularios. Hoy ningún emisor pone el v3 dentro de `roadmap_tree` (el
proyector emite el árbol plano en el snapshot y un roadmap v3-compatible como
archivo aparte, AUDIT:671-675), así que fijar esos nombres sería schema sin emisor
y sin ejemplo — §3.b. Se fija la FUNCIÓN del campo y el CONTENIDO exigible; la
forma la trae el emisor del tramo 2.

---

## Anexo B — dos lecturas muertas, registradas — NO NORMATIVO

**Este anexo registra; no corrige.** Nada aquí es requisito, y arreglar cualquiera
de las dos cosas está explícitamente fuera del alcance de esta capa. Material del
tramo 3, cuando D-026 exija el test-de-consumidor contra el lector real (§9).

### B.1 `current_stage`: el lector espera un campo que el v3 nunca tuvo

- **En los datos:** 0 ocurrencias de `current_stage` en CANTU-ROADMAP; las 9 claves
  de run de §10.a son todas las que existen (MEDICION:305-309, :268-270;
  reproducido de primera mano 2026-07-23).
- **En el código, el nombre sigue vivo.** El validador exige la celda
  `"Current stage"` en el detalle de run v3 y en el drawer (CANTU-VALID:1421,
  :1166) — y a la vez PROHÍBE leer `run.current_stage` en la fila de queue, en la
  fila de roadmap y en el propio detalle (CANTU-VALID:1387, :1408, :1426). La celda
  se llena derivando de `progress` (`v3DeriveCurrent`, `v3ProgressTimeline`, anclas
  requeridas en CANTU-VALID:1421) — y `progress` existe en 1 de 65 runs (§15): para
  los otros 64, la celda deriva de nada. Además, renderer y validador leen
  `current_stage` como campo de OTRAS fuentes — `current_focus` de
  `project_status.json` (CANTU-PCJS:1101, :1586; CANTU-VALID:1928), que en Cantu sí
  lo provee hoy (`projects/cantu-studio/.aiw/state/project_status.json:212`), y
  `snapshot.current_status_summary.current_stage` (CANTU-VALID:1931), lectura que
  contra la familia v1, donde `current_status_summary` es string (§3), no puede
  devolver nada nunca.
- **Precisión sobre la fuente:** la medición glosó la cita del audit como "(marcado
  **P** = presunto)" (MEDICION:306-307); en la leyenda del audit **P** es **prohibido**
  — falla si aparece (AUDIT:417-418). Es decir, CANTU-VALID:1387 no documenta una
  lectura: documenta la prohibición de una. La sustancia del hallazgo queda en pie
  con las citas directas de arriba.
- **Por qué se registra:** es el espejo de la podredumbre que este contrato
  persigue. En §2 un archivo afirmaba de más; aquí un lector espera de más. Es la
  misma enfermedad — una punta del sistema hablando de datos que la otra punta no
  sostiene — y se resuelve donde D-026 aplica (tramo 3), no aquí.

### B.2 El contador `blocked` de la consola: siempre en cero, y no se "arregla"

La consola calcula un stat "Blocked" contando runs con `status: "blocked"`
(CANTU-PCJS:3175-3185 y :795, vía AUDIT:334). En disco ese conteo es 0/65 y siempre
ha valido cero para este roadmap (MEDICION:117-121).

**No es bug.** Es el vocabulario de §11.a declarado y sin uso — exactamente el
estado declarado-y-vacío que §11.a defiende como honesto. Se deja registrado para
que nadie lo "arregle" borrándolo: ni el contador de la consola ni el token del
vocabulario. El día que exista un run `blocked`, ese contador es la primera
superficie donde se verá.

---

# CONTRATO DE LA CARPETA — Capa 3: los archivos opcionales y su degradación

Estado: VIGENTE — tramo 1 de O4, tercera y última capa del contrato inicial.
Adjudica qué archivos acompañan al snapshot dentro de `.project/`, bajo qué regla
de admisión, y qué le debe el consumidor a cada ausencia. Registrada en
`context/DECISIONES.md` como D-040, junto con la capa 2.

## Nota de verificación (capa 3)

Fuentes: el propio contrato (capas 1 y 2), el Bloque B del audit — en especial la
tabla de degradación B.3 (AUDIT:268-303) — y MEDICION; alias como en las capas
anteriores. Releído de primera mano el 2026-07-23: el banner agregado y su texto
(`CANTU-PCJS:4320-4325`, invocado en `:5622`), la condicionalidad de
`git_history.snapshot.json` en el validador (`CANTU-VALID:1565-1566`) y el
contenido real de `aiw-console/.aiw/`: 4 archivos en disco, que son las 3 rutas
del contrato que el audit contó (AUDIT:629-633) más `views/roadmap.json`, la
canónica del patrón canónico+copia (AUDIT:821-825). No se ejecutó git en ninguna
forma. Lo no comprobable se marca **[NO VERIFICADO]**.

---

## 18. La regla de admisión: sin emisor no se entra

`.project/` es enteramente derivada: todo lo que vive ahí tiene emisor y se
regenera (§1.b, §2). Esta capa adjudica la consecuencia:

**Un archivo sin emisor NO entra en `.project/`.** No se migra en el tramo 4. Se
queda en `.aiw` hasta que alguien le construya emisor, y ese día entra por la
puerta normal (§18.b).

La razón, redactada: admitir archivos mantenidos a mano en una carpeta declarada
derivada reintroduce exactamente la clase de artefacto que se pudrió tres semanas
(§2) — solo que ahora con la bendición del contrato. La regla de §2 no es
preferencia estética: es la única defensa que este contrato tiene contra su
propio destino, y una carpeta "derivada salvo excepciones" es una carpeta que ya
no puede prometer nada.

### 18.a Los 12 sin emisor, enumerados

El audit midió que **12 de los 15 archivos del contrato implícito de Cantu no los
escribe ningún tool de la consola**: "son fuentes que el frontend lee pero que se
mantienen por fuera (no hay emisor entre los tools auditados)" (AUDIT:817-819;
las 15 rutas, tabla PATHS, AUDIT:218-236). Quedan FUERA de `.project/`:

| # | Ruta en `.aiw` (Cantu) | Consumidor hoy (AUDIT B.3, :285-297) |
|---|---|---|
| 1 | `project.json` | manifiesto/encabezado |
| 2 | `state/project_status.json` | "Next up" (`next_recommended_run_id`) |
| 3 | `state/component_status.json` | panel de componentes |
| 4 | `state/events.jsonl` | feeds de actividad |
| 5 | `ledgers/change_ledger.jsonl` | feeds de actividad |
| 6 | `ledgers/git_provenance.jsonl` | feeds de actividad |
| 7 | `ledgers/human_qa.jsonl` | feeds de actividad |
| 8 | `ledgers/ai_reviews.jsonl` | feeds de actividad |
| 9 | `docs/docs_index.json` | Docs tab |
| 10 | `guardrails/project_guardrails.json` | Governance tab |
| 11 | `guardrails/no_claims.json` | Governance tab |
| 12 | `guardrails/project_memory.jsonl` | Governance tab |

Los 3 CON emisor, que por eso sí pueden entrar (AUDIT:808-816; son exactamente
las 3 rutas del contrato presentes en `aiw-console/.aiw/`, AUDIT:629-633,
recontado hoy):

| Archivo (hoy, en `.aiw`) | Emisor medido |
|---|---|
| `views/project_console.snapshot.json` | el proyector (`CON-PROJ:12,32`) — es el REQUERIDO de la capa 1 |
| `views/roadmap.json` (+ copia de entrega `roadmap/roadmap.json`) | el proyector; la copia, el server (AUDIT:808-813, :821-825) |
| `views/git_history.snapshot.json` | el history-builder, regenerado por el server (`CANTU-BUILD:24`; AUDIT:813-814) |

Nota sobre `project.json`: el schema-doc anota un mapeo `config.json →
project.json` (AUDIT:675), pero en disco nadie lo emite — D.1 lo marca ✗ en
aiw-console y en AIW (AUDIT:614) y el proyector solo escribe bajo `views/`
(AUDIT:637-641). Cuenta como sin emisor hasta que ese mapeo exista de verdad.

### 18.b La puerta normal

Cuando un archivo gane emisor, entra así, y solo así:

1. **Ruta nueva bajo `.project/`**, nombrada por contenido (§1) y sin heredar el
   layout de `.aiw` (§1.b: sin `views/`, sin prefijos de consumidor).
2. **Opcional por defecto.** Promoverlo a requerido es una decisión registrada
   (§8): cada requerido nuevo es una forma nueva de ponerse rojo.
3. **Degradación declarada en esta capa al entrar:** qué pierde el consumidor si
   falta, qué sigue funcionando, y qué se anuncia (§20).

Los 12 de §18.a no están "pendientes de ruta": están fuera. Cada uno entra por
esta puerta el día que tenga emisor, uno a uno.

## 19. Los opcionales de hoy: dos archivos

Con la regla de §18, la capa 3 declara hoy exactamente DOS archivos opcionales —
los dos con emisor que no son el snapshot requerido de la capa 1:

| Ruta en `.project/` | Estatus | Contenido | Degradación declarada si falta |
|---|---|---|---|
| `.project/roadmap.json` | OPCIONAL | el árbol del roadmap, identificado `roadmap_tree_v1` (§10, §10.c) | Se pierden las vistas de detalle del roadmap (cola de runs, árbol por objetivo). Lo que el snapshot transporta en `roadmap_tree` sigue renderizándose. Se anuncia "roadmap no disponible", nombrando el archivo. (Degradación equivalente medida: AUDIT:292-293.) |
| `.project/git_history.json` | OPCIONAL | la historia de commits y ramas que hoy emite el history-builder | Se pierde la historia (commits y asociación run↔commit). El resto del consumidor no se entera. Se anuncia "historia no disponible", nombrando el archivo. (Medido: AUDIT:297; el validador ya lo trata como condicional, `CANTU-VALID:1565-1566`.) |

Los nombres, `roadmap.json` y `git_history.json`, nombran contenido (§1). El
nivel `views/` y el sufijo `.snapshot` desaparecen porque en `.project/` TODO es
derivado y regenerable: decir "snapshot" ahí es tan redundante como §1.b midió
que era `views/` — la misma tijera que recortó `project_console.` del snapshot.

**El conjunto requerido sigue siendo uno (§8): el snapshot.** Ninguno de estos
dos lo acompaña en ese estatus; esta capa no promueve nada.

Dos notas de contorno:

- `.project/roadmap.json` es DERIVADO, como todo en la carpeta. El canónico
  editable del roadmap vive donde el proyecto lo tenga — en Cantu,
  `.aiw/roadmap/roadmap.json` con su tooling de edición, hasta el corte del
  tramo 7 (la misma convivencia aditiva de §10.c). No se emite copia de entrega
  bajo `.project/`: ese patrón existe "only to satisfy the [frozen] reader"
  (schema-doc vía AUDIT:821-825) y ningún lector congelado lee esta carpeta (§9).
- El identificador interno del git-history (`jame.git_history_snapshot.v1`,
  `CANTU-BUILD:26` vía AUDIT:762-763) carga `jame.`, igual que lo cargaba el del
  roadmap antes de §10.c. Renombrarlo es trabajo del emisor (tramo 2); se anota
  aquí para que la asimetría no parezca descuido — mismo tratamiento que
  `aiw_flat_objectives_v1` en §10.c.

## 20. La degradación es requisito SOBRE EL CONSUMIDOR

El punto central de esta capa, con todas sus letras:

**La ausencia de cualquier archivo no-requerido NUNCA puede romper al
consumidor.** Ni excepción, ni pantalla en blanco, ni tratamiento de requerido de
facto. Cada opcional degrada de la forma declarada en §19 — y el consumidor **lo
dice en pantalla, por archivo ausente, en la superficie afectada**. Renderizar
una lista vacía sin anunciar la ausencia no es degradar: es afirmar que el dato
no existe, y eso es mentira. El consumidor no finge que el dato no existía.

El contraste está medido. La consola de Cantu, ante CUALQUIER fallo fail-soft,
levanta UN banner agregado — "Rendered from the primary snapshot. Some optional
local state files could not be loaded. Open the Console Diagnostics panel in the
Status tab for details." (`CANTU-PCJS:4320-4325`, releído hoy; AUDIT:280-284) —
que no dice QUÉ falta; el detalle vive escondido en otro panel, y la superficie
afectada muestra su estado vacío como si nada (tabla B.3, AUDIT:285-297).
**Adjudicado: eso no basta. La degradación se anuncia por archivo ausente, no en
agregado.** El banner agregado puede existir como resumen, pero no sustituye el
anuncio individual: se anuncia donde duele, nombrando lo que falta.

Es la simetría de lectura de §6: allá el contrato obliga al artefacto a declarar
su frescura para que el fallo sea ruidoso; aquí obliga al consumidor a declarar
sus ausencias por la misma razón. Fallar ruidoso, nunca silencioso — también al
leer.

**Este requisito recae sobre el shell del tramo 3, no sobre el emisor.** El
emisor cumple con emitir (§2) y con no dejar punteros rotos (§7); qué se muestra
cuando algo falta es obligación del que muestra. Cuando el shell exista, D-026 se
activa (§9) y su test-de-consumidor debe ejercitar esta degradación archivo por
archivo, no solo el camino feliz.

**Puntero — la misma obligación, a nivel de campo (§10.d).** La enmienda D-041
extendió esta doctrina a una entrada de `depends_on` que el consumidor no logre
resolver: se declara **sin resolver** en la superficie afectada, nombrando el
`run_id`, por la razón de este apartado — renderizar sin anunciar afirma que el
dato no existe. La regla vive en la capa 2 (§10.d, Regla 3); aquí solo el puntero.

## 21. `closeout_result ⇒ completed`: advertencia, nunca requisito

§14 dejó la implicación como candidata a chequeo del validador. Se adjudica:
**entra como ADVERTENCIA del validador, nunca como requisito duro.**

Lo medido (MEDICION:310-315): la implicación `closeout_result ⇒ completed` se
sostiene en disco — 0 runs no-`completed` la llevan — pero 2 runs `completed` no
tienen `closeout_result`, y §14 ya adjudicó que esos dos son legítimos.

- **Advertencia:** un run no-`completed` que aparezca con `closeout_result` rompe
  la regularidad medida y merece que el validador lo señale — en amarillo, nunca
  en rojo.
- **Nunca requisito duro, en ninguna de las dos direcciones.** La implicación
  medida es una regularidad observada sobre 9 ejemplares, no un invariante de
  diseño: endurecerla sería elevar patrón observado a ley — la mecánica de §3.b.
  Y la dirección recíproca (`completed` exige `closeout_result`) ya está
  descartada por §14: declararla obligatoria pondría rojos dos runs que ya
  existen. Ese par de campos ya demostró, con datos, que hoy no tolera reglas
  duras.

---

## Decisiones de este contrato

### Capa 1 — RATIFICADAS 2026-07-23

Las tres quedan cerradas. Registradas en `context/DECISIONES.md` como D-039.

| # | Decisión | Dónde | Razón en una línea |
|---|---|---|---|
| a | La carpeta se llama `.project/` | §1 | `.aiw` nombra al emisor y un nombre de consola nombraría al consumidor; ninguno nombra el contenido. |
| b | `sources` lleva `mtime`, no hash | §6 | Su falso positivo (checkout de git) falla **ruidoso**; el fallo que hay que impedir es el silencioso. |
| c | `.project/` reemplaza al nivel `views/` | §1.b | La carpeta entera es derivada, así que `views/` ya no distingue nada. Implementación: tramo 2. |

Ninguna decisión de la capa 1 queda abierta.

### Capa 2 — ADJUDICADAS 2026-07-23 — registradas como D-040

Adjudicadas por la cabina y redactadas en esta capa. Registradas en
`context/DECISIONES.md` como **D-040**, junto con las de la capa 3.

| # | Decisión | Dónde | Razón en una línea |
|---|---|---|---|
| d | `roadmap_tree` canónico: árbol de tres niveles con las claves del v3 medido; ningún nivel almacena campos derivables | §10 | Un derivado almacenado es la versión a nivel de campo del archivo escrito a mano (§2). |
| e | Vocabulario de run: `planned`·`active`·`blocked`·`completed`; `blocked` se queda pese a 0/65 | §11.a | Declarado y vacío es honesto; quitarlo obligaría a re-agregarlo. |
| f | Vocabulario de objetivo: cinco tokens, con `in_progress` y sin reusar `active` | §11.b–c | Un run `active` corre AHORA; un objetivo empezado puede llevar meses sin que nada corra. |
| g | La derivación es normativa, con precedencia fija, y su resultado nunca se almacena | §12 | Una sola fuente, una sola lectura: ni copia que se pudra ni consumidores derivando a su gusto. |
| h | Objetivo o fase con 0 runs: MALFORMADO, sin token | §12.b, §13 | `[].every() === true` declararía terminado lo que nunca existió. |
| i | `closeout_result`: string opcional, sin enum, incluso en runs `completed` | §14 | Enumerar 8 valores observados sería inventar schema (§3.b); requerirlo pondría rojos 2 runs existentes. |
| j | `progress`: opcional; su forma interna se documenta y NO se congela | §15 | 1 de 65 es evidencia débil: sería norma desde un caso único. |
| k | `category` y `batch` quedan reservados: opcionales, ausentes por defecto, nunca requeridos | §16 | Ausencia explícita medida: nada que reciclar ni con qué chocar; nombrar hoy es gratis, migrar después son tres repos. |
| l | `taxonomy_model` declara el vocabulario del árbol transportado; no es constante del contrato | §17 | Lo de hoy describe `aiw_flat_objectives_v1`, no v3; idéntico entre snapshots solo prueba mismo proyector y mismo modelo. |
| m | El roadmap bajo `.project/` se identifica `roadmap_tree_v1`; el `schema_version` del roadmap de `.aiw` queda INTACTO hasta el corte del tramo 7 | §10.c | El identificador nombra el contenido, no a JAME ni al emisor (§1); tocar el de `.aiw` pone rojo al validador (CANTU-VALID:963-964), contra D-036. |
| r | `run_id` es GLOBALMENTE ÚNICO en todos los proyectos que exponen `.project/` | §10.d | Extiende la identidad inmutable de D-034 (`DECISIONES.md:372`); medido: 81 ids en los dos roadmaps con runs, intersección 0 — declararlo no cambia un byte. |
| s | Una entrada de `depends_on` que no resuelve localmente es EXTERNA y LEGAL; colgante (no existe en ninguna parte) sigue MALFORMADO; el consumidor resuelve global y DECLARA sin resolver lo que no pueda | §10.d | Sin esto, las 8 aristas que crea migrar O0 nacerían malformadas; declarar sin resolver es §20 aplicado a un campo. |
| t | La forma calificada `{project, run_id}` NO se adopta; queda como salida con condición de disparo escrita | §10.d | Un campo nuevo cuesta migración en tres repos (§16) y hoy no compra nada; adoptarla después es aditivo (mismo patrón que §6 dejó para el hash). |
| u | La FORMA de un `run_id` es `RUN-<PROYECTO>-<SLUG>-<NNN>`, sólo para ids acuñados desde ahora; `<PROYECTO>` es PROCEDENCIA (quién lo creó), no propiedad ni `project_id`, y nadie ramifica sobre él | §10.d, Regla 1.a | Se adopta la convención con 65 ejemplares en disco en vez de inventar una: tiene emisor y evidencia — lo contrario del patrón de §3.b. Los runs migrados conservan su prefijo; el roadmap de la consola nace mixto, y eso es correcto. |
| v | Un `run_id` NO cambia nunca (ni por `status`, ni al archivarse, ni al migrar); un emisor que lo derive de fuente mutable VIOLA el contrato | §10.d, Regla 1.b | Medido: el proyector lo deriva del nombre de archivo (`PROJ:192` → `:235,247,262`) y el kernel renombra al archivar (`aiw/queue.mjs:58`), así que muta al completarse. Es status codificado dentro de la identidad: §12.c en su forma más dañina. Tramo 2. |

Las tres —`r`, `s`, `t`— son la enmienda **D-041** del 2026-07-23; `u` y `v` son la
enmienda **D-043** del mismo día. Continúan la serie después de la `q` de la capa 3,
en vez de insertarse tras la `m`, para no renumerar decisiones ya registradas: la
tabla se lee por letra, no por orden de aparición.

Ninguna decisión de la capa 2 queda abierta. Lo que la capa deja sin fijar —
forma interna de `progress` (§15), estructura futura de `closeout_result` (§14),
tipo y forma de `category`/`batch` (§16), claves de la declaración v3 en
`taxonomy_model` (§17), clave portadora del identificador del modelo dentro de
`roadmap_tree` en el snapshot (§10.c), forma calificada de una entrada de
`depends_on` (§10.d) — no está pendiente de deliberación: está deliberadamente
diferido a emisor y ejemplo, con la regla de §3.b. Opaco no es "sin decidir". El
último, además, no espera emisor sino un hecho: su condición de disparo es una
colisión de `run_id` que hoy no existe (§10.d, Regla 4) — y tras la enmienda D-043
esa colisión exige además que dos proyectos compartan prefijo, así que el disparo
es más improbable sin dejar de estar armado.

La enmienda D-043 tampoco deja nada abierto a deliberación. Lo que queda pendiente
de ella es de otra clase: **medición** —si algún consumidor guarda `run_id` de AIW
entre proyecciones, hoy **[NO VERIFICADO]**— y **ejecución** —adecuar el emisor,
que es tramo 2 (§10.d, Regla 1.b), como ya lo eran §1.b, §10 y §17—.

### Capa 3 — ADJUDICADAS 2026-07-23 — registradas como D-040

| # | Decisión | Dónde | Razón en una línea |
|---|---|---|---|
| n | Un archivo sin emisor NO entra en `.project/`; se queda en `.aiw` hasta tener emisor (hoy: 12 de 15) | §18 | Archivos a mano en una carpeta declarada derivada reintroducen la clase de artefacto que se pudrió (§2), con bendición del contrato. |
| o | Capa 3 hoy: `.project/roadmap.json` y `.project/git_history.json`, ambos OPCIONALES; el requerido sigue siendo uno | §19 | Solo 3 de 15 tienen emisor; promover a requerido exige decisión registrada (§8). |
| p | La ausencia de un no-requerido nunca rompe; la degradación se anuncia POR ARCHIVO, en la superficie afectada | §20 | El banner agregado medido no dice qué falta (CANTU-PCJS:4320-4325); fallar ruidoso también al leer (§6). |
| q | `closeout_result ⇒ completed` entra como advertencia del validador, nunca requisito duro | §21 | Regularidad de 9 ejemplares, no invariante; endurecer este par de campos ya probó poner rojos runs existentes (§14). |

Ninguna decisión de la capa 3 queda abierta. Los 12 sin emisor no esperan ruta:
están fuera hasta que la puerta normal (§18.b) los reciba, con emisor, uno a uno.
