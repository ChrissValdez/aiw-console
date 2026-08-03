# Handoff — hilo `aiw`

**Última actualización: 2026-08-02.** Escrito al cerrar la sesión que cerró el `#26` y el
`#27` y reestructuró `O3`. Efímero: se reescribe entero cada cierre.

---

## 1. ⚠ AVISO DE TOPOLOGÍA — LEER ANTES DE PLANIFICAR UNA SOLA LECTURA

**`context/aiw-console/records/` NO SE SINCRONIZA AL PROJECT.** Tampoco
`project-console/`, `docs/project-console/`, `console/`, `tests/`, `tools/` ni `.project/`.
El recorte está declarado en `context/handoffs/aiw-console.md` §2 y verificado por los dos
hilos. **Pedir sync no los trae: es topología, no retraso de indexado.**

**SÍ están en el knowledge:** `roadmap/roadmap.json`, `context/README.md`,
`context/DECISIONES.md`, `context/handoffs/`, `context/aiw-console/CONTRATO.md`,
`context/CLASIFICACION-DE-RUNS.md`, `context/PROCEDIMIENTO-DE-CLASIFICACION.md`,
`context/aiw/`, `context/cantu-studio/`.

> **CONSECUENCIA, Y GOBIERNA CÓMO ESTÁ ESCRITO ESTE DOCUMENTO: un handoff que apunta a un
> record NO RESUELVE para el hilo que lo lee.** Por eso **todo dato que la próxima sesión
> vaya a USAR está DENTRO de este handoff**, con su unidad y su alcance. Los punteros a
> records quedan **solo como procedencia**.
>
> **Un record no se cita: se pide.** Las dos vías son **un encargo de taller** (el taller lee
> el disco entero) **o que el operador lo pegue.**

**Procedencia de todo lo que sigue:**
`context/aiw-console/records/RELEVO-AIW-AL-CIERRE-2026-08-02.md`. **No se puede leer desde
cabina.**

---

## 2. ESTADO MEDIDO — 2026-08-02

| | |
|---|---|
| `aiw` HEAD | **`ae7e7f1`** |
| `aiw` árbol | **LIMPIO** (`git status --porcelain` vacío) |
| `aiw-console` HEAD al medir | `5af9416`, limpio |
| Runs | **46** — **25 `completed`, 21 `planned`**, 0 `active`, 0 `blocked` |
| `queue_order` | **denso `1..46`**, 46 únicos, **0 huecos, 0 duplicados** |
| Aristas `depends_on` | **21**, **0 colgantes** |
| Objetivos | **6** — `O1 O2 O3 O5 O6 O7`. **No hay `O4`** |
| Fases | **33** declaradas · **32 con runs** · **1 VACÍA**: `O6.P1` *Per-project push activation* |
| `lane` | **6** runs, todos `DOCUMENTATION` (3 `completed`, 3 `planned`) |
| `barrier` | **2** runs — `#12` `global`, `#18` `lane`. **Los dos `completed`: campo muerto para la cola viva** |
| `category` | **0** runs. El campo no existe todavía |
| `kernel.mjs` | **478 líneas** contra el `~500` de `CONSTITUCION.md:29` → **22 de holgura** |
| `aiw/package.json` | **NO EXISTE**. 12 archivos `tests/*.test.mjs` |
| `aiw/.project/` | **5 artefactos**, los cinco trackeados |
| `aiw/config.json` | **2 proyectos**: `sandbox` (ruta **inexistente en disco**) y `console` → `projects/aiw-console` |

**Las nueve cifras heredadas se confirmaron TODAS. Ninguna discrepancia.**

**Reparto por objetivo:** `O1` 11/11 cerrado · `O2` 10/10 cerrado · `O3` 4 de 11 ·
`O5` 0 de 5 · `O6` 0 de 3 · `O7` 0 de 6. **Todo lo vivo está en `O3`, `O5`, `O6` y `O7`.**

---

## 3. LOS 21 `planned`, COMPLETOS

> ⚠ **TODO `#N` ES COORDENADA FECHADA.** El `queue_order` se renumeró **15 veces** en esta
> misma sesión (commit `17b6dfa`) y dos runs se invirtieron después (`ae7e7f1`).
> **Se re-mide al abrir. Los `run_id` no se mueven; los números sí.** Las líneas
> `roadmap.json:NNN` son contra `ae7e7f1`.

| `#N` | `run_id` | Título verbatim | Objetivo · Fase (por título) | Aristas `depends_on` |
|---:|---|---|---|---|
| 22 | `RUN-AIW-REAL-LOAD-MEASUREMENT-001` | *Run the first real objective against a large repository with a test net* | O3 Reliable autonomous run · O3.P2 Behaviour under real load | — |
| 23 | `RUN-AIW-SCOPE-PREFLIGHT-GUARD-001` | *Make the scope pre-flight demand a real match* | O3 · O3.P1 The known leak | → `REAL-LOAD-MEASUREMENT` |
| 28 | `RUN-AIW-SHARED-WORKING-BRANCH-001` | *Let consecutive runs share one working branch so their work chains* | O3 · O3.P7 Chained runs | — |
| 29 | `RUN-AIW-PUSH-IS-PART-OF-CLOSURE-001` | *A failed push escalates to human review instead of closing the run silently* | O3 · O3.P8 Closure that publishes | — |
| 30 | `RUN-AIW-PER-PROJECT-PUSH-001` | *Turn on push per project* | O3 · O3.P8 Closure that publishes | → `PUSH-IS-PART-OF-CLOSURE` |
| 31 | `RUN-AIW-INTAKE-001` | *The intake: turn a roadmap run into an executable contract* | O3 · O3.P9 The intake | — |
| 32 | `RUN-AIW-PROVIDER-PER-ROLE-001` | *Declare providers in config and choose one per role in the ticket* | O3 · O3.P10 Providers per role | — |
| 33 | `RUN-AIW-RUN-IDENTITY-001` | *Give every run an identity its log folder cannot silently overwrite* | O5 Run evidence and observability · O5.P1 Run identity | — |
| 34 | `RUN-AIW-RUN-MANIFEST-001` | *Write one manifest of identity and outcome per run* | O5 · O5.P2 The run manifest | → `EVIDENCE-PORTABILITY`, `RUN-IDENTITY` |
| 35 | `RUN-AIW-RUN-COST-ACCOUNTING-001` | *Record tokens and cost per run, if the provider exposes them* | O5 · O5.P2 The run manifest | → `RUN-MANIFEST` |
| 36 | `RUN-AIW-MID-RUN-SIGNALS-001` | *Expose signals the reviewer can query instead of trusting self-reports* | O5 · O5.P3 Signals the agent can query mid-run | — |
| 37 | `RUN-AIW-EVIDENCE-SCHEMA-DOCUMENTATION-001` | *Document what a run writes and where* | O5 · O5.P4 Documenting the evidence schema | → `RUN-IDENTITY`, `RUN-MANIFEST` · `lane: DOCUMENTATION` |
| 38 | `RUN-AIW-RUN-CATEGORY-FIELD-001` | *Add the category field and settle its vocabulary* | O6 Categories and batches · O6.P2 The category field and its vocabulary | → `PER-PROJECT-PUSH` |
| 39 | `RUN-AIW-BATCH-TO-BRANCH-001` | *Let the operator group runs into batches, and let the batch decide the branch* | O6 · O6.P3 Batch to branch | → `RUN-CATEGORY-FIELD` |
| 40 | `RUN-AIW-CATEGORIES-BATCHES-DOCUMENTATION-001` | *Document categories and batches* | O6 · O6.P4 Documenting categories and batches | → `RUN-CATEGORY-FIELD`, `BATCH-TO-BRANCH` · `lane: DOCUMENTATION` |
| 41 | `RUN-AIW-DECOUPLED-QUEUE-LAUNCHER-001` | *Make the queue survive the terminal that launched it* | O7 Long unattended execution (batches, lanes and parallelism) · O7.P1 Decoupled queue launcher | — |
| 42 | `RUN-AIW-ORPHAN-LOCK-RECOVERY-001` | *Recover from a lock whose owner is gone* | O7 · O7.P2 Orphan lock recovery | — |
| 43 | `RUN-AIW-WORKTREES-PER-RUN-001` | *Give each run its own worktree so runs can overlap inside one repository* | O7 · O7.P3 Worktrees per run | — |
| 44 | `RUN-AIW-KERNEL-READS-LANES-001` | *Teach the kernel to read lanes and barriers* | O7 · O7.P4 The kernel reads lanes | — |
| 45 | `RUN-AIW-LONG-UNATTENDED-SESSIONS-001` | *Run real long unattended sessions and count them honestly* | O7 · O7.P5 Real long unattended sessions | → `DECOUPLED-QUEUE-LAUNCHER`, `ORPHAN-LOCK-RECOVERY`, `WORKTREES-PER-RUN`, `KERNEL-READS-LANES`, `MID-RUN-SIGNALS`, `BATCH-TO-BRANCH` (**seis**) |
| 46 | `RUN-AIW-UNATTENDED-OPERATION-DOCUMENTATION-001` | *Document how to run and audit an unattended window* | O7 · O7.P6 Documenting unattended operation | → `DECOUPLED-QUEUE-LAUNCHER` · `lane: DOCUMENTATION` |

**Prefijo omitido en la columna de aristas por espacio: todos son `RUN-AIW-…-001`.**
Ningún `planned` declara `barrier`. **Ninguna arista cuelga.**

---

## 4. LO PRIMERO DE LA PRÓXIMA SESIÓN: **CLASIFICAR LOS 21 VIVOS**

**El procedimiento YA EXISTE y SÍ se sincroniza: `context/PROCEDIMIENTO-DE-CLASIFICACION.md`.
Se lee del knowledge; no hace falta encargo para traerlo.** Lo instituye `D-060`
(2026-08-02); el normativo es `context/CLASIFICACION-DE-RUNS.md` y **gana si discrepan**.

**Es trabajo del OPERADOR con la consola.** El taller mide lo objetivo; no clasifica.

**El orden del procedimiento, resumido para que no haga falta abrirlo para arrancar:**

- **Paso 0 — leer cada `full_description` VERBATIM DEL CANÓNICO.** No un record, no un
  resumen, no el título. **Un record es una medición fechada, no el estado de hoy.** En la
  sesión que produjo el procedimiento hubo tres correcciones por citar records como si
  fueran disco.
- **Paso 1 — `failure_surfaces` primero**, porque es el que más se equivoca por defecto.
  `SILENT` **no es el valor prudente: es un valor con carga probatoria.**
- **Paso 2 — `blast_radius` CONTANDO**, no razonando. **Fijar el criterio ANTES de ver el
  número**, y registrar la RAZÓN junto al valor.
- **Paso 3 — `work_type` y `correctness_model` JUNTOS.** No son independientes: la
  especificación prohíbe `SPECIFIED`+`FOUNDATIONAL` y `FOUNDATIONAL`+`LOUD`.
- **Paso 4 — `external_effects` es CENSO, no juicio.** Formas en uso: `writes_repo:<proyecto>`
  y `obliges_project:<proyecto>`. Vacío se deja **ausente**, no lista vacía.
- **Paso 5 — mezcla.** Regla provisional: si un run sostiene varias superficies de fallo,
  **gana la peor**; si eso sube injustamente al run entero, **la señal es partirlo**.
- **Paso 6 — NO derivar a mano.** `severity` y `closure_mode` los calcula el motor y
  **nunca se almacenan**. Si se quiere confirmar una predicción de derivación, **se deja
  fuera del ticket**.

**Calibración del piloto, para tener contra qué comparar** (los 12 vivos de `aiw-console`):
**6 CRITICAL · 3 MAJOR · 3 MODERATE · 0 MINOR** y **4 `ATTENDED` · 6 `SEMI_ATTENDED` ·
2 `UNATTENDED`**. **Esa cola no produjo ningún MINOR**, y se declaró sin maquillar.

**El error de lectura que hay que conocer antes de empezar:** `closure_mode` **NO es una
escala de riesgo. Mide PRESENCIA** —cuánta persona hace falta DENTRO del run para que
cierre—; `severity` mide **DAÑO**. Van en ejes distintos y se cruzan.

---

## 5. LO QUE LA CLASIFICACIÓN **NO** CUBRE

1. **Los 25 `completed` de este roadmap se quedan SIN CLASIFICAR.** Cómo se DECLARA la
   calibración de un `completed` sigue **sin resolver, sin un solo caso**, en ninguna parte
   (`D-060`, hueco abierto; `PROCEDIMIENTO §6.2`).
2. **Las tres reglas mecánicas de runs MIXTOS siguen abiertas** — hueco de
   `CLASIFICACION-DE-RUNS.md §7`. **No se reconstruyen por coherencia: se cierran con los
   casos de `aiw` DELANTE**, y su censo actualizado. Al escribirse `D-060` la población real
   bajo la definición vigente era **tres casos**.

---

## 6. LA COMPUERTA `CONST §4` — LO QUE DE VERDAD FRENA ESTE ROADMAP

`CONSTITUCION.md:30-32`: ningún mecanismo nuevo sin **incidente documentado** en
`DECISIONES.md` con cuatro campos —fecha, qué se rompió, qué costó, por qué el diff matinal
no lo cazó—; más **criterio de borrado** en la forma «se elimina si X» (`:33`) y
**presupuesto de líneas** contra el techo (`:28-29`). *«Una idea no es un incidente. Un
miedo no es un incidente.»*

**Reparto MEDIDO sobre los 21 vivos, leído run por run del canónico:**

| Disposición | nº | Runs |
|---|---:|---|
| **PAPEL** — no añade mecanismo | **6** | `#22`, `#30`, `#37`, `#40`, `#45`, `#46` |
| **MECANISMO — tres criterios COMPLETOS**, puede ejecutar | **2** | `#34` (`D-055` caso 1), `#41` (`D-055` caso 2) |
| **MECANISMO — incidente SÍ, criterio de borrado NO** | **2** | `#33`, `#42` |
| **MECANISMO — incidente PENDIENTE** | **10** | `#23`, `#28`, `#29`, `#32`, `#35`, `#36`, `#38`, `#39`, `#43`, `#44` |
| **MECANISMO — adjudicación ABIERTA** (si §4 le alcanza) | **1** | `#31` |

> **ELEGIBLES HOY: 8 de 21.** **DETENIDOS POR LA COMPUERTA: 13 de 21.**
> Unidad: runs `planned`. Alcance: los 21 vivos a `ae7e7f1`.

**Dos precisiones que ahorran una relectura:**

- Dos runs dicen ser *«one of only three runs in this roadmap that can execute on an
  already-documented incident»*. **El tercero es el `#24`, ya `completed`.** Entre los
  VIVOS son **dos**.
- **El `#31` (intake) tiene una adjudicación abierta que NO es suya de tomar**: `D-055`
  define mecanismo como código o paso nuevo en `aiw` —kernel, cola, lanzadores, guards— **y
  un intake no es ninguno de los cuatro.** Si §4 alcanza a un componente nuevo que traduce
  roadmap a contrato **debe resolverse en `DECISIONES.md` ANTES de que el run ejecute**, y
  no lo resuelve quien lo tome.

---

## 7. LOS TRES HUECOS DE `O3` Y EL BLOQUEO CIRCULAR DE `O7`

**Huecos de `O3` — medidos hoy; ninguno tiene run entre los 46:**

1. **La aplicación de la tabla de disposición de los 39 bloques no tiene run.** El `#26`
   entregó la especificación y declaró que aplicarla es un acto separado; nadie lo ha
   encargado.
2. **`aiw` no tiene forma declarada de correr su propia suite.** No hay `package.json`; hay
   12 `tests/*.test.mjs` y ninguna puerta con nombre. El `#27` era el candidato natural y
   **no lo tomó**.
3. **El `git mv -f` de `queue.mjs:27` sobrescribe el destino al archivar.** Defecto real del
   kernel. **Necesita run propio con su `CONST §4`.**

**Bloqueo circular de `O7` — medido:**

1. `CONSTITUCION.md:44-47` hace que **ningún mecanismo nuevo esté justificado si no suben
   dos números**, el primero de ellos «cuántas noches corrió desatendido» — y **el contador
   está en cero**, porque se mide corriendo, nunca declarando.
2. La noche es el `#45`, y **depende de SEIS mecanismos, todos portantes** (`#41`, `#42`,
   `#43`, `#44`, `#36`, `#39`). **Cinco de los seis están detenidos por `CONST §4`; solo el
   `#41` puede ejecutar.** La métrica que autoriza a construir solo sube corriendo la noche
   que esos seis habilitan.

---

## 8. LA TABLA DE LOS 39 BLOQUES VIVE **SOLO** EN EL RECORD

El `#26` cerró entregando **una especificación de disposición bloque a bloque** de
`prompts/executor.md` (17 bloques) y `prompts/reviewer.md` (22): **36 KEEP · 2 DELETE ·
1 REHOME**, con **el reviewer entero KEEP**. **Los prompts quedaron byte a byte como
estaban.**

**No está publicada en `docs/`** — la convención dice explícitamente que la lista *«es
producto del reporte de este run»* — y **no está sincronizada**: vive en
`RELEVO-AIW-AL-CIERRE-2026-08-02.md` §D, con los 39 rangos `ruta:línea`.

**Lo que hace falta saber sin abrirla, y que basta para decidir:**

- **Veredicto de la aplicación: EXIGE JUICIO.** No es un borrado de tres bloques.
- **EL HALLAZGO DE FONDO: dos de los tres no-KEEP son hechos POR PROYECTO alojados en
  archivos POR ROL, porque el cargador no tiene tercer eje.** El kernel tiene eje de rol
  (`kernel.mjs:232`) y resuelve proyecto en runtime (`:274-278`), pero **no hay archivo de
  instrucciones por proyecto**. Lo que es cierto de un destino y falso de otro no tiene
  dónde vivir.
- **Un cabo declarado sin redondear:** cuál de los dos bloques por-proyecto es `DELETE` y
  cuál `REHOME` **no se deriva de disco**.

**Cómo se trae:** **encargo de taller**. No sync.

---

## 9. LO QUE SE DEBE AL HILO `aiw-console`

**Dos avisos. Los dos son deuda de este hilo con el vecino.**

1. **EL HASH `ae7e7f1` — la reordenación YA ESTÁ EN DISCO.**
   `PROCEDIMIENTO-DE-CLASIFICACION.md §5` y `D-060` declaran el hueco de **irreversibilidad
   sin testigo**, con esta razón textual: *«el candidato nombrado por el hilo `aiw` existe
   solo bajo una reordenación que aún no está en disco, y por eso no cuenta como testigo»*.
   **Esa reordenación aterrizó el 2026-08-02 en `ae7e7f1`.** El candidato es el **`#30`
   `RUN-AIW-PER-PROJECT-PUSH-001`, *Turn on push per project***, hoy en `O3.P8` y
   dependiendo del `#29`. **Les toca a ellos juzgar si ahora sí es el testigo de
   irreversibilidad.** Este hilo avisa; no adjudica.
2. **EL CENSO DE MIXTOS ACTUALIZADO: 2 de 21.** Bajo la definición de `D-060` —un run es
   mixto cuando **su propia superficie de ESCRITURA** abarca dos naturalezas distintas; **la
   frontera es dónde el run escribe, no de qué depende ni de qué habla**— el censo de `aiw`
   **pasa de 17 de 21 a 2 de 21**, y los 13 que salen son runs que **esperan una entrada del
   log de decisiones**, lo cual es precondición fuera del grafo y **no es mezcla**. El
   handoff de `aiw-console` §8.1 todavía cita «7 mixtos de 17» para `aiw`: **es la cifra
   vieja**.

---

## 10. NOTA DE ARRANQUE — poner un run en `active`

**Poner un run en `active` desde la consola deja modificados el canónico Y LOS CINCO
ARTEFACTOS de `aiw/.project/`** (`docs_index.json`, `guardrails.json`, `no_claims.json`,
`roadmap.json`, `snapshot.json` — verificado hoy: son exactamente cinco y los cinco están
trackeados). **Dos talleres lo reportaron como incógnita**, así que se escribe aquí para que
no vuelva a sorprender: **no es deriva, es la re-emisión de la derivada.**

**Regla asociada, y es cara si se olvida: «árbol limpio» NO prueba coherencia.** Un
`.project/` desfasado y commiteado sale igual de limpio que uno correcto. Después de
cualquier escritura al canónico **que no pase por la consola**, re-emitir y **VERIFICAR**:
comparar total de runs, cuenta de `completed` y el largo de un `full_description` conocido
entre `roadmap/roadmap.json`, `.project/roadmap.json` y `.project/snapshot.json`.

---

## 11. PENDIENTES QUE NO BLOQUEAN — revalidados hoy

**Se retiraron los resueltos.** Lo que queda, por antigüedad:

- **`governance/` de `aiw` sin ratificar** — 17 guardrails y 4 claims escritos en `O2` y
  nunca aprobados por el operador. **El pendiente más viejo.**
- **La lista de comprobación visual del render** — diez minutos con la consola abierta;
  convierte un `[NO VERIFICADO]` en medido.
- **El fixture de `999-sandbox-imposible`** — declarado, no autorado. Esa rama no tiene
  ejemplar vivo.
- **La recalificación de los siete casos de evaluación** — su última ejecución consta
  `[NO VERIFICADO]` desde 2026-07-10.
- **`context/aiw/ESTADO.md` está desfasado**: su última actualización es **2026-07-22** y
  describe la fase «consola maestra». **Nadie lo actualizó en esta sesión.**
- **El `#22` sigue bloqueado por fuera.** Necesita un repo grande con red de tests verde; el
  blanco es `aiw-console` (excepción escrita en el canónico de AIW). Su suite estaba en 10
  fallos de 278 y el hilo vecino la estaba despinneando hacia fixtures. **Preguntar a ese
  hilo si aterrizó antes de replantearlo**, y coordinar la ventana: correr su suite ensucia
  su árbol.

**RETIRADOS por resueltos en esta sesión:**

- ~~Identificar el run que `D-057` señala~~ → **es el `#38`** `RUN-AIW-RUN-CATEGORY-FIELD-001`,
  *Add the category field and settle its vocabulary*. Recibió nota `REFRAMED 2026-07-31` y
  **no acuña el quinto vocabulario**.
- ~~Analizar `CONST §4` para el `#26`~~ → **hecho: PAPEL, con falla.** El cargador es PLANO
  (`kernel.mjs:340-341`, dos archivos enteros, siempre). **El núcleo compacto es papel; los
  módulos bajo demanda NO tienen runtime que los honre.** Se ejecutó solo la mitad
  ejecutable, y el hueco quedó declarado por escrito en
  `aiw/docs/kernel/CONVENCION-DE-INSTRUCCIONES-DE-AGENTE.md` §2.
- ~~Los punteros de `D-057` en las reglas que el agente lee del repo~~ → **hecho** en
  `6225979` (`claude.md`).
- ~~El `git mv -f` como «pendiente»~~ → **promovido a hueco de `O3`** (§7.3). Sigue sin run.
- ~~«`aiw` no tiene forma de correr su suite» como «candidato natural del `#27`»~~ →
  **el `#27` no lo tomó**; promovido a hueco de `O3` (§7.2).

**PASADO A OTROS HILOS — no volver a levantarlo aquí:** los bancos de casos invisibles al
proyector (`objectives/qualification/`, `objectives/queue-e7/`). Aceptado por el hilo de
`aiw-console`: es hueco de su proyector y tendrá run propio en su roadmap.

---

## 12. LECTURAS DE ARRANQUE, EN ESTE ORDEN

1. **`context/DECISIONES.md`, `D-060`** — el procedimiento de clasificación, la definición
   de mixto, el criterio de irreversibilidad y los tres huecos abiertos con su condición de
   cierre.
2. **`context/PROCEDIMIENTO-DE-CLASIFICACION.md`** — el CÓMO. Sincronizado, se lee del
   knowledge.
3. **`context/CLASIFICACION-DE-RUNS.md`** — el normativo. **Gana si discrepa del
   procedimiento.**
4. **`context/DECISIONES.md`, `D-058` y `D-057`** — la primera aplicación de `CONST §4` en
   este roadmap, y los dos ejes que no se colapsan.
5. **`aiw/roadmap/roadmap.json`** — los `full_description` **verbatim**, que es el paso 0 de
   la clasificación. **Por Node, nunca por PowerShell.**
6. **`aiw/docs/kernel/CICLO-DE-RUN.md`** y **`CONVENCION-DE-INSTRUCCIONES-DE-AGENTE.md`** —
   lo que la sesión publicó.

**Nada que re-emitir al abrir el hilo.** `aiw` quedó ESTABLE: `ae7e7f1`, árbol limpio,
`.project/` re-emitido en el mismo commit que el último cambio de canónico.

---

## CÓMO SE TRABAJA AQUÍ — lecciones que no se re-aprenden

- **PowerShell no es el instrumento para leer estos archivos.** Rompe UTF-8 (`§`, rayas
  largas), no expande globs, y convierte cadenas multilínea en arrays —lo que ya produjo un
  ALTO falso. **Toda lectura del canónico o de `DECISIONES.md` va por Node.**
- **La suite de `aiw` se invoca expandiendo el glob a mano**: sin `package.json`, es
  `node --test` sobre los **12** `tests/*.test.mjs` enumerados. **Verificar que son doce**;
  si no, el glob falló y la suite no corrió de verdad.
- **En este repo escriben TRES hilos.** Un `git status` con entradas ajenas **se reporta,
  no se revierte**.
- **Una guarda solo comprueba donde tiene ancla.** Anclar en la primera mitad de un texto
  largo no detecta un truncamiento en la segunda.
- **La consola SÍ edita `full_description`** — el fallo era del preview del dry-run y está
  reparado. **El script de Node sobre el canónico ya no hace falta.**
