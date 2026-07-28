# DECISIÓN — LAS CUATRO FRONTERAS DEL ROADMAP DE AIW

**Fecha:** 2026-07-28 · **Naturaleza:** documento de decisión de CABINA. No
escribe nada fuera de este archivo: no toca `aiw` en ningún byte, no escribe
ningún roadmap ni `.project/`, no edita `DECISIONES.md`, `CONTRATO.md`, ningún
handoff ni ningún record existente. **Las cuatro decisiones son del operador.**
Aquí la cabina las prepara — qué está en juego, opciones reales, costo medido de
cada una — y recomienda con razón explícita. Lo aprobado aterriza después en
`context/DECISIONES.md` (entradas esbozadas aquí, escritas en otro acto) y en el
roadmap de AIW cuando se escriba.

## Fuentes y régimen de cita

| Abreviatura | Archivo |
|---|---|
| `MEDICION` | `context/aiw-console/records/MEDICION-ESTADO-DE-AIW.md` (2026-07-28) |
| `AUDIT` | `context/aiw-console/records/AUDIT-CONTENIDO-AIW.md` (2026-07-28) |
| `CONST` | `aiw/CONSTITUCION.md` |
| `CONTRATO` | `context/aiw-console/CONTRATO.md` |
| `DEC` | `context/DECISIONES.md` |
| `HANDOFF` | `context/handoffs/aiw-console.md` (reescrito 2026-07-28) |
| `ENCARGO` | el campo del encargo de esta sesión de cabina |

Las dos mediciones del 2026-07-28 son el insumo y **no se re-midió nada de lo que
contienen**. Las citas de código (`PROJ:`, `Q:`, `K:`, `SERVE-LEGACY:`,
`SERVE-SHELL:`, `CFG:`) son de segunda mano a través de esos dos records, y así
deben leerse. `CONST`, `CONTRATO`, `DEC` y `HANDOFF` se leyeron de primera mano
hoy. Lo que es inferencia va marcado **[INFERENCIA]**; lo no comprobado,
**[NO VERIFICADO]**. Ningún hecho de disco se afirma de memoria: los tres hechos
que faltan se piden al operador como comandos (sección final).

**La estructura acordada en la sesión previa** — 7 objetivos vivos, hueco
permanente en `O4`, 2 carriles (`DEVELOPMENT` / `DOCUMENTATION`), 3 barriers —
entra como **insumo a examinar, no como algo dado** (ENCARGO). No hay record en
disco que la fije: este documento la cita como ENCARGO, a esa granularidad.
Donde una decisión la contradice, gana la decisión y se dice con su nombre:
**pasa una vez, en D4** (el gate de evals sale de la estructura).

## Resumen para el operador

| Decisión | Recomendación de la cabina | Nº que reservaría |
|---|---|---|
| **D1** — volteo de modo | Voltear: canónico autorado en `aiw/roadmap/roadmap.json` (layout `repo_root`). La vista mode-1 deja de ser canónica y se acepta: su valor hoy está medido ≈ 0. La cola del kernel sigue operando idéntica — el kernel no lee roadmaps. | **D-052** |
| **D2** — portabilidad de la evidencia | `logs/` se versiona; `.aiw/` sigue de máquina; los dos audit reports mudan a `context/aiw/`; `git_history.json` pasa a de-máquina en todo emisor; el resto de `.project/` de AIW se versiona. | **D-053** |
| **D3** — identidad y orden | Colisión léxica de `objective_id` aceptada, hueco `O4` permanente; `roadmap_id` = `"roadmap"`; tercer espacio 1..N conforme; runs nuevos `RUN-AIW-*`. Prioridad: lo vivo de O4 por delante de la cola de O0, resuelta como acto de edición propio antes de paridad. | **D-054** |
| **D4** — `CONST §4` en el roadmap | Sí: criterio de aceptación fijo para todo run que añada mecanismo (incidente citado + criterio de borrado + presupuesto de líneas). Manifest por run: ENTRA (incidente `000-sandbox`). Lanzador: ENTRA (incidente 2026-07-11, con derogación escrita). Gate de evals: **NO entra** — sin incidente y clase «detector»; se escribe su condición de disparo. | **D-055** |

Los números asumen que `D-051` es la última entrada (verificado en `DEC` y en
HANDOFF:317) y que las cuatro se aprueban en este orden; si el operador rechaza o
reordena, corren.

---

# D1 — El volteo de modo

## Qué está en juego

Escribir un `roadmap_tree_v1` conforme en una ruta de layout dentro de `aiw` hace
que `detectRootMode(aiw)` deje de devolver `aiw_objectives` y devuelva
`roadmap_tree` (PROJ:792-793 vía MEDICION R2). Los dos modos son **excluyentes
por root**, y AIW es el único proyecto cuyas carpetas planas SON su cola
operativa viva: los 16 objetivos en `pending/parked/processed` son estado del
kernel, no un plan (MEDICION R2). El modo 2 lee un árbol y **no sabe nada de
`objectives/`** (MEDICION R2). La decisión: qué pasa con esa cola — si su vista
se pierde, se conserva por otra vía, o deja de importar.

**El hecho que separa las aguas:** la ejecución de la cola no depende del modo.
El kernel parsea el ticket que se le da y `queue.mjs` recorre
`objectives/pending/*.md` (Q:49 vía AUDIT §2; K:281-283 vía AUDIT §3.d). Ninguno
de los dos lee ningún roadmap. **El volteo cambia lo que la consola MUESTRA de
AIW, no lo que el kernel HACE.** Lo único en juego es la vista.

Y el valor de esa vista está medido:

- Los 11 tickets abiertos son **cero ejecutables hoy**: 6 no parsean bajo el
  kernel actual (AUDIT §1.2.a), 3 nombran un proyecto no registrado en la config
  (AUDIT §1.2.b) y 2 tienen su run APPROVED cerrado desde el 2026-07-19 (AUDIT
  §2). Y no son el backlog de AIW: son cola del kernel contra otros proyectos —
  las dos poblaciones son disjuntas (AUDIT §1.3).
- Lo que la consola tiene disponible de AIW es del 2026-07-22, de un emisor 8
  versiones menores anterior (MEDICION §5.4); muestra como `active`/«Now» un run
  muerto hace 9 días (MEDICION §5.2.a); sus 16 títulos de snapshot dicen
  «Project» (MEDICION R11); sus `depends_on` son artificio de presentación
  (MEDICION §3.3.i); 4 de sus «runs terminados» no tienen ningún log detrás
  (MEDICION §5.2.b) y dos archivos reclaman el id `000` (MEDICION §5.2.c).
- Otras dos carpetas de la cola ya son invisibles a esa vista de todos modos
  (`qualification/`, `queue-e7/` — MEDICION R14).

## Las opciones reales

**(a) Voltear: canónico en `aiw/roadmap/roadmap.json`, layout `repo_root`.**
Es el candidato de la medición, con dos razones medidas: un canónico bajo
`project_local_aiw` caería en `.aiw/`, que está **gitignoreado**
(`aiw/.gitignore:7` vía MEDICION §3.1) — no llegaría ni al remoto, ni a la
laptop, ni al knowledge, que es exactamente el problema que este proyecto viene
resolviendo —, y `.aiw/roadmap/roadmap.json` es además la ruta donde el servidor
legacy deposita la copia de entrega de la vista mode-1 (SERVE-LEGACY:71 vía
MEDICION §4.2, y la tensión R3). `repo_root` es carpeta nueva, trackeable, sin
colisión con nada existente en `aiw`, y la misma que ya usa `aiw-console`
(MEDICION §4.2). El archivo sería **fuente autorada, no derivada** — el
precedente exacto es el roadmap propio de `aiw-console`: «Escribir a mano en
`roadmap/` no viola §18; hacerlo en `.project/` sí lo violaría» (D-044,
DEC:972-975). Costo: el volteo, con todo lo que sigue abajo.

**(b) No escribir canónico dentro de `aiw`** (dejarlo fuera, como hoy vive
`roadmap_AIW_temp.md` en `aiw-console`). No hay volteo y la vista mode-1 sigue
siendo lo que hay. Costo: AIW sigue sin estado duradero en su propio repo; la
divergencia Markdown↔realidad ya medida sigue creciendo (10 bullets → 33 runs
solo en O4, MEDICION §2.2); `O4.P6` no puede cerrar; el shell nuevo sigue sin
poder renderizar AIW (falla el embudo de layout, MEDICION §4.1); y D2 y D3
pierden objeto en parte. Es pagar la conservación de una vista cuyo valor medido
es el de arriba.

**(c) Canónico dentro de `aiw` pero bajo `project_local_aiw`**
(`aiw/.aiw/roadmap/roadmap.json`). Descartada por la medición: canónico
gitignoreado (o tocar el `.gitignore` del kernel, que es decisión aparte) más
colisión de ruta con el emisor legacy (MEDICION §4.2, R3).

No apareció una tercera vía real: conservar la vista de cola «por otra vía»
dentro del modo 2 exigiría un artefacto nuevo con emisor (CONTRATO §18.b), y ese
mecanismo hoy no tiene incidente que lo justifique — sería inventar una vista
para conservar datos cuyo valor la medición acaba de tasar.

## Recomendación de la cabina

**Voltear — opción (a).** Canónico autorado en `aiw/roadmap/roadmap.json`,
layout `repo_root`. La razón, en una línea: **el volteo no toca la cola, solo su
vista, y esa vista hoy miente más de lo que informa** (stale, dos muertos como
«Now»/«Next», títulos «Project», dependencias sintéticas — todo citado arriba).
La cola **deja de importar como vista canónica**; la MATERIA no se pierde: las
carpetas de `objectives/` siguen trackeadas en git (24 entradas, AUDIT §1) y la
puerta de §18.b queda abierta para una vista de cola con emisor el día que un
incidente la justifique (coherente con D4).

Consecuencias que se aceptan y se declaran:

1. **Las vistas mode-1 que hoy sirve `serve-project-console.mjs` quedan como
   incógnita, y se respeta como tal.** El servidor legacy llama
   `buildSnapshot`/`buildRoadmap` incondicionalmente, sin consultar el modo
   (SERVE-LEGACY:56-72 vía MEDICION R2), así que **[NO VERIFICADO]** si esas dos
   vistas seguirían emitiéndose tras el volteo o desaparecerían. Lo verificado es
   que el shell nuevo y las tres rutas de escritura sí exigen layout (MEDICION
   R2). **La recomendación no depende de despejar la incógnita**: la vista se da
   por retirada como canónica en cualquiera de los dos desenlaces. Si el operador
   quiere certeza antes de decidir, el comando 3 (sección final) la despeja sobre
   fixture, nunca sobre `aiw`.
2. Tras el volteo, la regularización de los 16 `run_id` mutantes del proyector
   (CONTRATO §10.d Regla 1.b, tramo 2) se convierte en retiro en vez de arreglo:
   la vista que los emitía deja de ser canónica. **[INFERENCIA]** sobre el
   alcance del tramo 2; el contrato no se enmienda por esto.
3. La tensión R3 (la vista proyectada de AIW en `aiw-console/.aiw/roadmap/` y la
   defensa de la shape gate, PROJ:741-744 vía MEDICION R3) queda como está: ese
   residuo está ignorado y sin trackear (HANDOFF:294-298) y no participa de esta
   decisión.
4. Para que la consola renderice AIW tras el volteo hará falta emitir su
   `.project/` (el registro ya apunta bien, MEDICION §4.1; el mínimo por
   artefacto está en MEDICION §4.4 — `guardrails`/`no_claims` no tienen fuente y
   su ausencia degrada anunciándose, CONTRATO §19-§20). Emisión y sus detalles
   son del encargo posterior.
5. **Los 5 tickets visibles de la cola**: los 2 muertos (`005`, `006`) esperan
   archivado — acto de higiene kernel-side de un encargo posterior, aquí no se
   toca ni un byte de `aiw`. **Los 3 `parked/` declaran `# Project` →
   `jame_snapshot`**, no registrado en la config (AUDIT §1.2.b): ese caso roza
   `cantu-studio`, **se NOMBRA y pasa a su hilo** — ni ticket ni recomendación
   aquí (ENCARGO, out of scope). Los 6 de `qualification/`/`queue-e7/` ya eran
   invisibles (MEDICION R14) y quedan igual.

## Si el operador elige distinto

Con (b), queda abierto: dónde vive entonces el estado duradero de AIW (el
Markdown ya se declaró histórico y desactualizado por construcción en su parte
más viva, MEDICION §2.1), cómo cierra `O4.P6`, y todo D2 sobre `.project/` de
AIW pierde objeto. Con (c), queda abierta la edición del `.gitignore` del kernel
y la convivencia con la ruta de entrega legacy (R3). En ambos casos D3 y D4
siguen valiendo para el día que el canónico exista.

**Reserva: D-052** — volteo, layout y destino de la vista de cola son una
decisión no reversible barata y ajena al contrato (ninguna regla del CONTRATO se
toca): entrada propia.

---

# D2 — Portabilidad de la evidencia

## Qué está en juego

Tres superficies fuera de git, medidas: `aiw/logs/` y `aiw/.aiw/`
(gitignoreados, `aiw/.gitignore` líneas 4 y 7 vía MEDICION §3.1) y `_reference/`
(`AIW_Workspace/` no es repo; los dos audit reports no están en ninguno, AUDIT
§5). Consecuencia viva: **toda la evidencia de ejecución de AIW existe solo en
esta máquina** (MEDICION R10) — la laptop clonó de GitHub y ve cero runs
(MEDICION §5.2.e), y el knowledge de la cabina tampoco los ve. De esta decisión
cuelgan el manifest por run (D4), la vista de run de la consola, y que AIW
muestre algo desde la laptop o desde el knowledge.

Agravante de gobernanza que la medición dejó a la vista: `CONST:30` exige el
incidente documentado en `DECISIONES.md`, y **los dos incidentes reales que hoy
existen viven en archivos gitignoreados** (`logs/INCIDENT-2026-07-11.md` y el
forense del `000-sandbox` — AUDIT §6.5, §6.1). La cadena probatoria de la
constitución depende hoy de una máquina.

## Superficie por superficie

### `aiw/logs/` — VERSIONAR (retirar la línea 4 del `.gitignore` en el encargo posterior)

**Opciones:** versionar, o aceptar como de máquina.

**Costo de versionar, declarado:** los 8 `summary.md` citan rutas del workspace
demolido (MEDICION §5.2.d) — se versionan tal cual, son registro histórico
inmutable; la carpeta `000-sandbox` versiona una contradicción viva (dos runs en
una carpeta, AUDIT §6.1.4) — no es motivo para ocultarla: es exactamente el
incidente que D4 documenta; y la evidencia llega al remoto al ritmo del cierre de
sesión (el ritual de commit existente), no en vivo — aceptado y declarado. El
repo es pequeño (52 archivos trackeados hoy, MEDICION §3.1); 9 carpetas de run en
17 días de vida no son un problema de volumen.

**Costo de no versionar, medido:** es el statu quo — R10 entero. El manifest por
run nacería no-portable; cualquier vista de run sería de una sola máquina;
laptop y knowledge, ciegos; y los incidentes que `CONST §4` exige citables
seguirían fuera de todo diff — que es literalmente «por qué el diff matinal no lo
cazó» (CONST:31) convertido en política permanente.

**Recomendación: versionar.** La evidencia de ejecución es el registro que la
constitución y la métrica de éxito (`CONST:44-47`) necesitan legible; dejarla de
máquina contradice el propósito declarado del volteo de D1 (que AIW tenga estado
fuera de esta máquina).

### `aiw/.aiw/` — SIGUE DE MÁQUINA (no se toca el ignore)

Su único contenido es un snapshot stale en la ruta pre-002, mtime 2026-07-10
(MEDICION §3.1); el handoff ya lo lista como residuo (HANDOFF:339). Bajo D1
(`repo_root`) **nada canónico aterriza ahí jamás**: el canónico va a `roadmap/`
y lo emitido a `.project/`. No hay nada que versionar; borrar el residuo es acto
de higiene del encargo posterior. Alternativa (versionarlo) no compra nada: solo
haría viajar un artefacto derivado y viejo.

### `_reference/` — los dos audit reports MUDAN a `context/aiw/`; el resto no se afirma

Los dos reports existen solo en esta máquina porque `_reference/` no está dentro
de ningún repo (AUDIT §5). Son insumos citados por línea en los records de este
hilo (AUD-K/AUD-C en AUDIT); dejarlos de máquina deja citas que solo esta máquina
puede abrir — la misma clase de podredumbre de referencia que R1, pero sin
remedio posible desde otro sitio. La casa natural es
`projects/aiw-console/context/aiw/` — donde ya vive el contexto de gobernanza de
AIW mudado por D-037 (`aiw/CLAUDE.md`, sección «Dónde vive cada cosa»). Mudanza:
encargo posterior. **Sobre el resto de `_reference/` no se decide nada**: la
medición solo abrió `audits/` (AUDIT §5) y este documento no afirma qué más hay.
Alternativas: hacer de `_reference/` un repo (más pesado, nadie lo pide hoy) o
aceptarlo de máquina (deja el problema exactamente donde está).

### `.project/git_history.json` — DE MÁQUINA, en todo emisor

El caso que el encargo pide incluir: hoy está **versionado** en `aiw-console`
(ENCARGO; consistente con que la re-emisión «deja el diff para que lo revise el
operador», HANDOFF:228-229 — **[INFERENCIA]** por la existencia del diff) y es
estructuralmente imposible tenerlo commiteado y al día a la vez: **el commit que
lo actualiza lo desactualiza** — el artefacto describe N commits y su commit es
el N+1. Es el único artefacto cuya fuente (`.git`) **ya viaja con todo clon**:
regenerarlo localmente es siempre posible y siempre más fresco que cualquier
copia commiteada. Su degradación ya está declarada («historia no disponible»,
CONTRATO §19) y su regeneración tiene botón y ruta (`history/sync`,
HANDOFF:209-213).

**Recomendación: gitignorearlo donde se emita — en `aiw-console` hoy y en `aiw`
cuando emita.** Para AIW el costo de cualquiera de las dos opciones es el menor
de los tres proyectos (1 rama, 33 commits, default declarado por el remoto —
MEDICION §4.4), pero la regla se recomienda uniforme: una excepción por proyecto
sería una regla más que recordar. **El resto de `.project/` de AIW SÍ se
versiona**: deriva de fuentes versionadas, es reproducible y comparable (§6 del
CONTRATO), y es lo que hace que AIW muestre algo desde fuera de esta máquina.
Nota: `.project/` es derivada y regenerable — versionarla no la vuelve fuente;
la fuente sigue siendo `roadmap/` y las carpetas (CONTRATO §2, §18; D-044).

## Consecuencia declarada, consumidor por consumidor

| Superficie → | manifest por run | vista de run de la consola | laptop | knowledge de la cabina |
|---|---|---|---|---|
| `logs/` versionado | nace portable: aterriza en `logs/<id>/` y viaja | posible mañana: un emisor (§18.b) tendría fuente versionada que leer | ve la evidencia con `pull` | **depende de R8 — comando 1** |
| `.aiw/` de máquina | no aplica: nada canónico vive ahí bajo D1 | no aplica | nada que ver ahí | nada |
| audits → `context/aiw/` | — | — | los ve vía `aiw-console` | los ve si `aiw-console` sincroniza (lo que `aiw/CONTEXTO.md` afirma) |
| `git_history.json` de máquina | — | — | «historia no disponible» hasta regenerar en local — siempre posible, `.git` viaja | ídem; el knowledge no pierde nada que hoy tenga al día |
| resto de `.project/` (aiw) versionado | — | la vista de proyecto entera existe fuera de esta máquina | renderiza AIW | **depende de R8 — comando 1** |

**La columna del knowledge está condicionada por R8**, la contradicción medida
entre `RM-AIW:5-8` («el repo `aiw` se sincroniza como knowledge», D-034) y
`aiw/CONTEXTO.md` («`aiw-console` es el único repo sincronizable como
knowledge») — MEDICION §1.1, R8. Cuál de las dos es verdad no es un hecho de
disco: es configuración de la cabina, y **se pide al operador (comando 1)**. La
recomendación condicional: que `aiw` sincronice también (si no lo hace ya) — con
`logs/` versionado, es lo que hace la evidencia legible desde la cabina —, y que
el documento que quede falso de los dos se corrija en el encargo posterior;
cuál de los dos miente lo decide la respuesta.

## Si el operador elige distinto

Si `logs/` queda de máquina: el manifest de D4 pierde la mitad de su sentido
(existiría, pero solo aquí), la vista de run queda estructuralmente imposible
fuera de esta máquina, y los incidentes de `CONST §4` siguen citándose contra
archivos que ningún otro sitio puede abrir — conviene entonces, como mínimo,
mudar los dos `.md` sueltos de `logs/` (el incidente y el diagnóstico, AUDIT
§6.5) a una ruta trackeada, porque son gobernanza, no evidencia de run. Si
`git_history.json` sigue versionado: se acepta staleness estructural permanente
con diffs de ruido en cada re-emisión — y se declara, para que nadie la lea como
podredumbre accidental.

**Reserva: D-053** — una entrada con las cuatro adjudicaciones (logs, `.aiw`,
`_reference`, `git_history`); la ejecución (dos `.gitignore`, una mudanza) es del
encargo posterior.

---

# D3 — Identidad y orden

## Qué está en juego

Cuatro piezas que el roadmap de AIW estrena o pisa: `objective_id` que colisiona
léxicamente entre los tres proyectos (MEDICION R5), `roadmap_id` que vale
`"roadmap"` en los dos roadmaps existentes (MEDICION R6), `queue_order` que
abriría un tercer espacio 1..N (MEDICION R7), y la prioridad O0↔O4 abierta desde
D-046 con plazo «antes del tramo 5» (DEC:1113-1117). Nota medida que gobierna
todo el bloque: `CONTRATO §10.d` Regla 1 exige unicidad global del **`run_id`**
y **no dice nada del `objective_id`** (MEDICION R5) — la colisión es legal hoy.

## Pieza por pieza

### `objective_id` — aceptar la colisión léxica; hueco permanente en `O4`

AIW traería `O1..O3, O5, O6` (más los nuevos de la estructura acordada), que
colisionan léxicamente con los de Cantu; su `O4` — el caso engañoso, mismo tema
que el `O4` de la consola (MEDICION R5) — **no existe**: la estructura acordada
deja hueco permanente en `O4` (ENCARGO), y eso disuelve la peor colisión por
construcción. El precedente es exacto: «`objective_id` conserva el hueco (`O0`,
`O4`) — es identidad, no se renumeró; el hueco dice la verdad» (D-046,
DEC:1087-1090). Un namespace (`AIW-O1`) sería inventar una forma sin ejemplar
contra dos roadmaps que ya usan `O<n>` desnudo — el patrón que `CONTRATO §3.b`
prohíbe.

**¿Gobierna el contrato?** No: no fija forma ni unicidad de `objective_id` (ni
siquiera dentro del archivo — no está escrito). **¿Enmienda?** No se recomienda.
Se deja la condición de disparo escrita, al estilo de la Regla 4 de §10.d: el día
que un consumidor necesite dirigirse a un objetivo A TRAVÉS de proyectos (hoy
ninguno lo hace: `depends_on` es de run a run, CONTRATO §10.a), se delibera con
ese consumidor enfrente.

### `roadmap_id` — adoptar `"roadmap"`, sabiendo lo que es

Vale `"roadmap"` en los dos roadmaps existentes: es el nombre del archivo, no del
proyecto (MEDICION R6). Con AIW serían tres iguales. **[NO VERIFICADO]** que
algún consumidor lo lea — la identidad de proyecto viaja por el registro y por
`project_id`, no por esta clave. Darle a AIW un valor distinto (`"aiw"`) no
compraría desambiguación para nadie medido y rompería la convención con 2
ejemplares; arreglar los tres es tocar Cantu (fuera de alcance — se nombra y
pasa a su hilo si algún día se hace) y la consola, para un campo sin lector.

**¿Gobierna el contrato?** Lista la clave sin asignarle semántica (§10.a).
**¿Enmienda?** No. Condición de disparo: el primer consumidor que lea
`roadmap_id`; ese día se decide si identifica proyecto o archivo, con el lector
enfrente.

### `queue_order` — tercer espacio 1..N, conforme

El contrato ya lo gobierna: la secuencia es global **por archivo**, densa y
única (§10.a; los invariantes del motor la verifican, §10.e), y ningún barrier
cruza archivos (§10.e). Dos precedentes en disco arrancan en 1 (MEDICION R7). Un
orden inter-proyecto almacenado no existe en el modelo y sería un derivado
persistido — la enfermedad de §12.c. **¿Enmienda?** No: AIW nace conforme.
La dimensión inter-proyecto que R7 señala no es del dato: es la pieza siguiente.

### Prioridad O0↔O4 — lo vivo de O4 por delante; resolverla como acto propio, antes de paridad

Lo abierto desde D-046: O0 conserva 1 run `active` y 2 `planned` con
`queue_order` bajo (q10..q12) que preceden a todo O4 en la cola de la consola;
debe resolverse antes de que la consola sea la fuente del orden — el handoff lo
fecha «antes de la paridad (`O4.P5`)» (DEC:1113-1117; HANDOFF:104-105, 255-258).

**Recomendación:** resolverla **ya y como acto de edición propio** en la consola
(dry-run → confirm, la ruta de `O4.P12`), separado de la escritura del roadmap de
AIW — que no depende de ella: el espacio 1..N de AIW es independiente y ningún
consumidor medido deriva un «siguiente» inter-proyecto (**[INFERENCIA]**: el
shell presenta los proyectos por menú, HANDOFF:202-203). En el fondo, la cabina
recomienda **lo vivo de O4 (q35-q38: paridad → UI/UX → AIW → corte) por delante
de la cola de O0**: el operador ya declaró el rumbo (el análisis de AIW como
siguiente, HANDOFF:27-28) y la única compuerta real declarada apunta al corte
(paridad + UI/UX → corte, HANDOFF:178-181), mientras que del contenido real de
los tres runs vivos de O0 este documento no sabe nada — las lecturas no lo traen,
y **se pide al operador (comando 2)** antes de ejecutar el reorden. Si ese triage
revela que el `active` de O0 es trabajo vivo y urgente, gana O0 y esta
recomendación cede: está condicionada a ese hecho, y se dice.

### Los `run_id` nuevos de AIW (nota de forma, ya gobernada)

No es pieza abierta, se deja constancia: los runs del roadmap de AIW acuñan
`RUN-AIW-<SLUG>-<NNN>` (§10.d Regla 1.a), prefijo que D-046 ya reservó — «ése es
del kernel» (DEC:1088-1090). Los 16 ids mutantes del proyector no se regularizan
aquí (Regla 1.b, tramo 2; y ver D1, consecuencia 2).

## Si el operador elige distinto

Namespacear `objective_id` o renumerar el hueco: rompe el precedente de D-046 y
obliga a decidir qué pasa con los `O<n>` de los otros dos roadmaps (tocar Cantu
= su hilo). `roadmap_id` distinto por proyecto: se dice aquí que nace
inconsistente con los otros dos hasta que alguien los toque. Prioridad sin
resolver: la consola llega a paridad con un «Now» (q10) que nadie ha ratificado —
exactamente lo que D-046 quiso evitar fechándola.

**Reserva: D-054** — las cuatro adjudicaciones en una entrada (también las «no
se cambia nada»: el contrato registra sus no-adopciones, precedente Regla 4 /
decisión `t`). El reorden de la cola, si se ejecuta, queda registrado dentro.

---

# D4 — Cómo se cumple `CONSTITUCION §4` en el roadmap de AIW

## Qué está en juego

`CONST:30-33`: ningún mecanismo nuevo sin incidente documentado en
`DECISIONES.md` — fecha, qué se rompió, qué costó, por qué el diff matinal no lo
cazó — y todo mecanismo nace con criterio de borrado escrito. «Una idea no es un
incidente. Un miedo no es un incidente» (CONST:32). `CONST:34-35` prohíbe además
reintroducir sin incidente una lista nominal que incluye **detectores**. El
enforcement de todo esto es hoy humano y documental — no hay test ni hook (AUDIT
§4) — y el techo del kernel tiene 22 líneas de holgura (478/500, AUDIT §4).

Dos preguntas: si «incidente + criterio de borrado» se vuelve **criterio de
aceptación fijo** de todo run que añada mecanismo, y qué pasa con los tres casos
concretos que el audit dejó nombrados.

## La regla general — SÍ, criterio de aceptación fijo

**Recomendación:** todo run del roadmap de AIW que añada mecanismo lleva, como
criterios de aceptación fijos: **(1)** la cita de la entrada de `DECISIONES.md`
que documenta su incidente con los cuatro campos de `CONST:30-32`; **(2)** el
criterio de borrado escrito en esa misma entrada (la convención ya existe: las
entradas cierran con «Criterio de borrado:», visible en D-044..D-046); **(3)** el
presupuesto declarado: cuántas líneas añade al kernel y, si excede el techo, qué
se borra — «Para añadir, se borra» (CONST:28-29).

**Alcance de «mecanismo»:** código o paso nuevo en `aiw` — kernel, cola,
lanzadores, guards. No lo son: papeles (roadmap, records, decisiones), ediciones
de `.gitignore`, archivado de tickets, ni el trabajo del lado consola — ese lo
gobierna el CONTRATO, no la constitución.

**Y una prohibición que la regla se aplica a sí misma:** no se recomienda
automatizar este criterio (un check de techo o de incidente en la suite). Un
chequeo automático es un **detector** — la clase nominalmente prohibida
(CONST:34-35) — y nacería sin incidente. El criterio es documental, como el
enforcement que ya existe (AUDIT §4).

## La tabla, run por run, sobre la estructura acordada

La estructura acordada entra a la granularidad que consta (ENCARGO); los runs
que añaden mecanismo son los tres nombrados. El barrido completo run por run se
cierra al escribir el roadmap, aplicando la regla general a cada run nuevo.

| Run (estructura acordada) | ¿Añade mecanismo? | Incidente | Dónde está documentado HOY | Criterio de borrado propuesto |
|---|---|---|---|---|
| **Manifest por run** | Sí — el kernel escribiría un artefacto de identidad/desenlace por run | **Existe: la carpeta de log reutilizada.** Fecha: 2026-07-11. Qué se rompió: el run 2 del id `000-sandbox` reutilizó la carpeta del run 1 (`logDir` deriva solo del nombre, K:283 vía AUDIT §3.d y §6.1.4) y murió antes de escribir `objective.md`; la carpeta quedó afirmando APPROVED mientras el archivo archivado afirma ERROR — dos verdades sobre el mismo id (AUDIT §6.1; MEDICION §5.2.c). Qué costó: la consola muestra un `completed` y un `blocked` para el mismo número; el forense exigió arqueología de mtimes 17 días después (AUDIT §6.1). Por qué el diff matinal no lo cazó: `logs/` está gitignoreado — la evidencia no participa de ningún diff (MEDICION §3.1; cruza con D2) — y el desenlace fue exit 1 de `Abort`, sin diff de código que revisar (AUDIT §6.1.1) | AUDIT §6.1 + MEDICION §5.2.c + `logs/INCIDENT-2026-07-11.md:90-92` (gitignoreado). **FALTA en `DECISIONES.md`** — se documenta con los cuatro campos dentro de D-055 | «Se elimina si la evidencia por run gana identidad única por otra vía (p. ej. `logDir` irrepetible) **y** una revisión mensual (`CONST:44-47`) pasa sin que ningún forense o revisión matinal lo consulte.» Presupuesto: debe caber en la holgura de 22 líneas o nombrar qué borra (AUDIT §4) |
| **Gate de evals** | Sí — un paso nuevo en el round loop; la costura existe y está medida (`K:391`, AUDIT §3.a) | **NO existe.** «Sin incidente hoy» (ENCARGO). Y es la clase «detector» de la lista prohibida (CONST:34-35): doblemente cerrado | n/a | n/a — **no entra al roadmap** (ver abajo) |
| **Lanzador desacoplado** | Sí — mecanismo del lado de la cola | **Existe: la ventana semi-muerta.** Fecha: 2026-07-11. Qué se rompió: el terminal que alojaba `queue.mjs` murió, node saltó el `finally`, el lock quedó huérfano y el executor desprendido siguió editando `aiw-console` ~15 minutos hasta kill manual (AUDIT §6.5). Qué costó: proceso editando sin gobierno, lock huérfano, la carpeta `002-…-orphan-20260711` (AUDIT §6.5; MEDICION §5.1), y cuatro reparaciones M1-M4. El campo «por qué el diff matinal no lo cazó» se redacta del propio `INCIDENT-2026-07-11.md` en el acto de escritura — este documento no lo releyó; su resumen citable es AUDIT §6.5 | `logs/INCIDENT-2026-07-11.md` (gitignoreado) + AUDIT §6.5. **FALTA en `DECISIONES.md`** — se documenta dentro de D-055 | «Se elimina si la métrica 1 de `CONST:44-47` (noches corridas desatendido) no sube en la primera revisión mensual tras su estreno.» Y su run **DEROGA explícitamente**, por escrito, la regla operativa del incidente — «el terminal del queue se queda abierto e intocado durante toda la ventana» (AUDIT §6.5) — al estilo de la caducidad explícita de CONTRATO §9: la regla vieja se retira nombrándola, no se deja conviviendo con su contradicción |
| **Resto de la estructura** (escritura del roadmap, carriles/barriers como dato, papeles, archivados, `.gitignore`, emisión `.project/`) | No — dato y papel, o trabajo del lado consola | No aplica §4 | — | Los carriles y barriers son claves del árbol ya gobernadas por CONTRATO §10.e (D-051); para un canónico autorado, escribir barriers a mano es la vía normal hoy (DEC:1516-1517) |

## El gate de evals — la resolución, con su porqué

**No entra al roadmap de AIW v1.** Con `CONST §4` delante no hay caso: sin
incidente («una idea no es un incidente»), de la clase nominalmente prohibida, y
sin poder citar la métrica de §6 a su favor. **Esto contradice la estructura
acordada, y se dice: gana la decisión** (ENCARGO, Scope). En su lugar se escribe
**la condición de disparo**, el patrón que el contrato ya usa dos veces
(§10.d Regla 4; §6, revisión a hash): *el gate de evals se delibera el día que
exista un incidente con los cuatro campos de `CONST:30-32` — un veredicto
aprobado cuyo daño un eval habría cazado y el diff matinal no cazó — y ese día
entra por D4 como cualquier mecanismo.* Si el operador lo quiere pese a todo, la
vía honesta no es el roadmap: es enmendar la constitución, que exige decisión
humana explícita en `DECISIONES.md` (CONST:5) — y la cabina recomienda no
hacerlo.

## Si el operador elige distinto

Si §4 no se vuelve criterio fijo: cada run mecánico re-delibera su propia
disciplina, y el enforcement — que ya es solo humano y documental (AUDIT §4) —
pierde su único anclaje reproducible. Si el gate de evals entra igual: que entre
por la puerta constitucional (CONST:5), nunca como un run más — lo contrario
deja el precedente de que la lista de CONST:34-35 se vence por roadmap. Si el
lanzador entra sin derogación escrita: quedan dos reglas operativas
contradictorias en pie, la clase de doble verdad que este sistema lleva tres
semanas matando (CONTRATO §2, §12.c).

**Reserva: D-055** — la norma (criterio fijo) más los dos incidentes
documentados con sus cuatro campos y sus criterios de borrado, y la condición de
disparo del gate de evals. Si el operador prefiere una entrada por incidente,
serían D-055 (norma) + D-056/D-057, y los números de este documento corren.

---

# Los tres comandos que se piden al operador

Hechos que ninguna de las dos mediciones trae y que este documento no recuerda
ni verifica por su cuenta:

1. **R8 — knowledge de la cabina.** ¿Qué repos están hoy sincronizados como
   knowledge del proyecto Claude: `aiw`, `aiw-console`, ambos? De la respuesta
   cuelga la columna «knowledge» de D2 y cuál de los dos documentos
   contradictorios (`RM-AIW:5-8` vs `aiw/CONTEXTO.md`, MEDICION §1.1/R8) se
   corrige en el encargo posterior.
2. **Los 3 runs vivos de O0.** Título y estado real del `active` (q10) y los dos
   `planned` (q11-q12) — abrir la consola con `aiw-console` seleccionado,
   objetivo O0, o pegar las tres entradas del canónico. Cierra la prioridad de
   D3 con contenido; la recomendación estructural ya está dada y condicionada a
   este triage.
3. **(Opcional, taller)** Despejar el **[NO VERIFICADO]** de D1: si
   `serve-project-console.mjs` seguiría emitiendo las vistas mode-1 con un root
   en modo 2 — medición sobre fixture, nunca sobre `aiw`. La recomendación de D1
   no depende de esto; se ofrece solo si el operador quiere certeza antes de
   decidir.

# Lo que este documento NO hace

No escribe `aiw/roadmap/roadmap.json` ni ningún roadmap ni `.project/`. No toca
`aiw` en ningún byte, incluido su `.gitignore` — lo que D2 decide se ejecuta en
un encargo posterior. No edita `DECISIONES.md` (las entradas D-052..D-055 quedan
esbozadas, escribirlas es otro acto), ni `CONTRATO.md`, ni ningún handoff ni
record. No re-mide nada de las dos mediciones. No corre la suite, ni la consola,
ni el proyector, ni el validador; no ejecuta git. No detalla el contenido de los
runs: decide fronteras y formatos. Y `cantu-studio` queda donde estaba: el caso
`jame_snapshot` se NOMBRA (D1, consecuencia 5) y pasa a su hilo, sin ticket y
sin recomendación de arreglo.
