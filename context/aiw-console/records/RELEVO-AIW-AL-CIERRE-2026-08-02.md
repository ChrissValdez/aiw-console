# RELEVO DE `aiw` AL CIERRE DEL 2026-08-02

**Fecha de la medición:** 2026-08-02 · **Sujeto:** `aiw/roadmap/roadmap.json`,
`aiw/kernel.mjs`, `aiw/queue.mjs`, `aiw/prompts/`, `aiw/docs/kernel/` y el estado git de
los dos repos · **Naturaleza:** encargo de taller de CIERRE DE SESIÓN, **sin run**.
**LECTURA ÚNICAMENTE sobre `aiw`**: no se escribió un byte en ese repo, no se ejecutó git
en ninguna forma que escriba, no se tocó el roadmap ni `.project/` ni el status de ningún
run ni el orden de la cola, y no se corrió ninguna suite. · **Máquina:** PC,
`C:\Users\chris\Documents\AIW_Workspace\`.

> **Ninguna cifra del ticket se dio por buena.** Todas se re-midieron en disco y se
> reportan con su comando o su `ruta:línea`. Donde el papel y el disco difieran, gana el
> disco.
>
> **Lo CITADO va marcado como tal.** Este record contiene material que la cabina dictó
> desde una sesión de conversación y que **no existe en disco en ninguna parte**. Ese
> material lleva la marca **CITADO** y no se presenta como medición.
>
> **Archivos escritos por este encargo: DOS.** Este record y
> `context/handoffs/aiw.md`. Ninguno más, en ninguno de los dos repos.

Ruta base de los caminos relativos: la raíz del workspace, `AIW_Workspace/`.

---

## BLOQUE 0 — El estado medido, no heredado

### 0.1 Git, los dos repos

| | |
|---|---|
| `aiw` HEAD | **`ae7e7f1`** — *«roadmap: se invierten el 29 y el 30…»* |
| `aiw` `git status --porcelain` | **VACÍO**. Árbol limpio |
| `aiw-console` HEAD en apertura | `5af9416` |
| `aiw-console` `git status --porcelain` en apertura | **VACÍO**. Árbol limpio |

```bash
cd aiw && git log -1 --oneline && git status --porcelain
```

### 0.2 El canónico de `aiw`

Medido con Node sobre `aiw/roadmap/roadmap.json` (`schema_version: "roadmap_tree_v1"`),
recorriendo `objectives → phases → runs`:

| Magnitud | Valor | Unidad | Alcance |
|---|---:|---|---|
| Runs | **46** | runs | todo el árbol |
| — `completed` | **25** | runs | ídem |
| — `planned` | **21** | runs | ídem |
| — `active` / `blocked` | **0** / **0** | runs | ídem |
| Objetivos | **6** | objetivos | `O1, O2, O3, O5, O6, O7` — **no hay `O4`** |
| Fases declaradas | **33** | fases | suma de `phases[]` de los 6 objetivos |
| — fases CON runs | **32** | fases | ídem |
| — fases VACÍAS | **1** | fase | `O6.P1` *Per-project push activation* |
| `queue_order` | **denso `1..46`** | — | 46 valores, 46 únicos, **0 huecos, 0 duplicados** |
| Aristas `depends_on` | **21** | aristas | suma sobre los 46 runs |
| — colgantes | **0** | aristas | todo destino resuelve a un `run_id` declarado |
| Runs con campo `lane` | **6** | runs | todos `DOCUMENTATION`; 3 `completed`, 3 `planned` |
| Runs con campo `barrier` | **2** | runs | `#12` `global`, `#18` `lane` — **ambos `completed`** |
| Runs con campo `category` | **0** | runs | el campo no existe todavía en este roadmap |

**Las nueve cifras heredadas del ticket se confirman TODAS**: HEAD `ae7e7f1`, 46 runs,
25 `completed`, 21 `planned`, denso `1..46`, 21 aristas, 6 objetivos, 33 fases,
`kernel.mjs` en 478 líneas. **Ninguna discrepancia.**

**Dos precisiones que la cifra heredada no traía y que se declaran:**

1. **Las 33 fases NO son 33 fases con trabajo.** Una está vacía —`O6.P1`
   *Per-project push activation*— y lo está **por causa de esta misma sesión**: es la
   fase de la que salió el run de push al moverse a `O3.P8` (§I).
2. **`barrier` es hoy un campo muerto para la cola viva.** Los dos únicos runs que lo
   llevan están `completed`. Ninguno de los 21 `planned` declara `barrier`.

### 0.3 Reparto por objetivo

| Objetivo | Título | Fases | Runs | `completed` | `planned` |
|---|---|---:|---:|---:|---:|
| `O1` | House in order | 2 | 11 | 11 | 0 |
| `O2` | AIW is readable | 7 | 10 | 10 | 0 |
| `O3` | Reliable autonomous run | 10 | 11 | 4 | 7 |
| `O5` | Run evidence and observability | 4 | 5 | 0 | 5 |
| `O6` | Categories and batches | 4 | 3 | 0 | 3 |
| `O7` | Long unattended execution (batches, lanes and parallelism) | 6 | 6 | 0 | 6 |

**`O1` y `O2` están cerrados al 100 %. Todo lo vivo está en `O3`, `O5`, `O6` y `O7`.**

### 0.4 El kernel

| | |
|---|---|
| `aiw/kernel.mjs` | **478 líneas** (`wc -l`), contra el `~500` de `CONSTITUCION.md:29` |
| Holgura declarada | **22 líneas** |
| `aiw/queue.mjs` | tests: 12 archivos `tests/*.test.mjs` |
| `aiw/package.json` | **NO EXISTE** |

---

## A — LO QUE LA SESIÓN CERRÓ

### A.1 Dos runs a `completed`

| `#N` | `run_id` | Título verbatim | Fase |
|---:|---|---|---|
| **26** | `RUN-AIW-AGENT-INSTRUCTION-CONVENTION-001` | *Establish a compact core plus on-demand modules for agent instructions* | `O3.P5` Agent instruction convention |
| **27** | `RUN-AIW-CYCLE-DOCUMENTATION-001` | *Document the run cycle* | `O3.P6` Documenting the cycle |

Verificado: el paso `planned → completed` de los dos entra en disco en el mismo commit,
`1582645` (medido comparando `a4c86c8:roadmap/roadmap.json` con
`1582645:roadmap/roadmap.json`).

### A.2 Ocho commits en `aiw`, en orden

| Hash | Fecha | Qué hizo |
|---|---|---|
| `6225979` | 2026-07-31 17:05 | El run `CATEGORIES-BATCHES-DOCUMENTATION` recibe sus **dos aristas**; `claude.md` recibe el puntero a `CLASIFICACION-DE-RUNS.md` (`D-057`). Aristas: 15 → **17** |
| `ad803b6` | 2026-07-31 17:22 | Notas fechadas de re-encuadre en el `#26` (frontera papel/mecanismo) y en el run del manifiesto (los dos ejes de `D-057`); `.project/` re-emitido |
| `d260c39` | 2026-07-31 18:01 | `docs/kernel/CONVENCION-DE-INSTRUCCIONES-DE-AGENTE.md`, **221 líneas nuevas**. Los prompts quedan intactos. Cierra el `#26` |
| `6b61e10` | 2026-07-31 21:03 | `docs/kernel/CICLO-DE-RUN.md`, **384 líneas nuevas**. Tres imprecisiones corregidas hacia adelante. Cierra el `#27` |
| `a4c86c8` | 2026-07-31 22:35 | Re-emisión de `.project/` con `aiw-projector 0.12.0`; `taxonomy_model` trae vocabulario, derivaciones, combinaciones ilegales y `care_budget` |
| `1582645` | 2026-07-31 23:16 | Tres afirmaciones falsas corregidas por nota fechada; **tres aristas** que la prosa declaraba entran al grafo. Aristas: 17 → **20**. Y el `#26`/`#27` pasan a `completed` |
| `17b6dfa` | 2026-08-01 20:48 | `O3` pasa a ser el ciclo completo: **cuatro runs nuevos + uno movido**, cuatro fases nuevas, **15 runs renumerados**. 42 → **46** runs, 20 → **21** aristas |
| `ae7e7f1` | 2026-08-02 13:38 | Se **invierten** el `#29` y el `#30`, con la arista invertida y nota fechada en ambos. 46 runs, 21 aristas |

**Trayectoria de las cifras a lo largo de la sesión, medida commit a commit:**
runs `42 → 42 → 42 → 42 → 42 → 42 → 42 → 46 → 46`;
aristas `15 → 17 → 17 → 17 → 17 → 17 → 20 → 21 → 21`.

### A.3 Dos records en `aiw-console`

| Commit | Fecha | Archivo |
|---|---|---|
| `53dd268` | 2026-07-31 22:00 | `context/aiw-console/records/AUDITORIA-ROADMAP-AIW.md` (**829 líneas**) |
| `57e372b` | 2026-08-01 21:24 | `context/aiw-console/records/MEDICION-PREVIA-A-LA-CLASIFICACION-DE-LOS-21-PLANNED-DE-AIW.md` (**597 líneas**) |

Ambos verificados con `git show --stat`. Los dos están **fuera del sync del Project**
(§L).

---

## B — EL RUN QUE `D-057` NO IDENTIFICABA

`D-057` (2026-07-30) avisó de que **cuatro vocabularios competían** por el eje de
delegabilidad y de que **un run `planned` de este roadmap estaba a punto de acuñar un
quinto**, sin decir cuál. El handoff anterior lo puso como primer punto de la sesión y
nombró como candidatos por materia al `#26` y al `#27`.

**No era ninguno de los dos. Es el `#38` `RUN-AIW-RUN-CATEGORY-FIELD-001`,
*Add the category field and settle its vocabulary*** (`aiw/roadmap/roadmap.json:549`,
`O6` · `O6.P2` *The category field and its vocabulary*).

Su propio texto se proponía adjudicar entre dos esquemas de nombres — es decir, acuñar el
quinto. Recibió **nota `REFRAMED 2026-07-31`**, verificada verbatim en el canónico:

> *«CLOSURE is DERIVED from the run; DELEGABILITY is DECLARED at PROJECT level. What this
> run calls a run's category is delegability, and AIW already declares its side in
> writing at roadmap level… CONSEQUENCE, and it is why this note exists: four
> vocabularies already compete for this axis in the workspace, and settling a name here
> as originally written would coin a fifth. THIS RUN DOES NOT COIN ONE.»*

**Consecuencia operativa:** antes de ejecutarse, el `#38` tiene que decidir primero,
contra `D-057`, **si un campo `category` almacenado está justificado en absoluto** — dado
que `closure_mode` se DERIVA y NUNCA se almacena. Su compuerta `CONST §4` sigue en pie sin
cambios: mecanismo, incidente pendiente.

---

## C — EL VEREDICTO DE `CONST §4` SOBRE EL `#26`: PAPEL, CON FALLA

**El cargador de prompts del kernel es PLANO.** Medido de primera mano:

| Hecho | Cita |
|---|---|
| El cargador lee **exactamente dos** archivos de prompt | `aiw/kernel.mjs:340-341` |
| Los lee **enteros** (`readFileSync` completo, sin recorte) | `aiw/kernel.mjs:36` |
| Los lee **incondicionalmente** — camino recto del run, sin `if` que los cubra | `aiw/kernel.mjs:340-341` |
| Lo único que hace con el texto es **sustituir cinco marcadores** | `aiw/kernel.mjs:349-351` (executor), `:396-399` (reviewer) |
| El texto llega al agente por **stdin** | `aiw/kernel.mjs:236` |
| `prompts/` contiene **2 archivos**, `executor.md` (82 líneas) y `reviewer.md` (80) | `ls`, `wc -l` |

**EL VEREDICTO: el núcleo compacto es PAPEL y es ejecutable hoy; LOS MÓDULOS BAJO DEMANDA
NO TIENEN RUNTIME QUE LOS HONRE.** Honrarlos exige un paso de ensamblado en `kernel.mjs`,
que es mecanismo nuevo bajo `CONSTITUCION.md §4` (`CONSTITUCION.md:30-32`) y **no hay
incidente documentado**.

**Se ejecutó SOLO LA MITAD EJECUTABLE, y el documento lo dice con todas las letras:** la
convención publicada declara que **tiene UNA CUBETA, NO DOS**
(`aiw/docs/kernel/CONVENCION-DE-INSTRUCCIONES-DE-AGENTE.md`, §2), que un bloque solo tiene
dos destinos —está en el prompt del rol o no está en ningún prompt— y que **nada se aparca
en un módulo que ningún cargador puede traer** (§4). Su §6 fija la condición concreta de
sustitución: el día que se construya carga bajo demanda, ese trabajo es **un run propio,
nace `planned`**, y enmienda el documento en el mismo acto.

**Corroboración medida hoy, aparte del documento:** el nombre `roadmap` no aparece en
`kernel.mjs`, y tampoco existe directiva de include ni resolución de módulos en la ruta que
arma los prompts. Un tercer archivo en `prompts/` sería inalcanzable por construcción, y
**ningún test de la suite recorre `prompts/`**.

---

## D — LA TABLA DE DISPOSICIÓN DE LOS 39 BLOQUES

> **ESTA TABLA EXISTE SOLO AQUÍ. NO HAY RUN PARA APLICARLA.**
>
> Verificado en disco: la convención publicada declara en su §7 que *«aplicar esta
> convención a los dos prompts vigentes es un acto SEPARADO, y el run que escribió este
> documento NO lo ejecuta»*, y que la lista bloque a bloque *«es producto del reporte de
> este run»* — es decir, **no se publicó en `docs/`**. Búsqueda sobre todo el workspace:
> **0 apariciones** de la tabla, de la cadena «39 bloques» y de la etiqueta `REHOME`.
> `prompts/executor.md` y `prompts/reviewer.md` quedan **byte a byte como estaban**.
>
> Y **ningún run del roadmap la aplica**: de los 21 `planned`, los únicos cuyo texto
> nombra los prompts son el `#32` (proveedores — toca la invocación, no el contenido) y el
> `#37` (esquema de evidencia). Ninguno de los dos aplica la disposición.

### D.1 Los totales — **CITADO**

**36 KEEP · 2 DELETE · 1 REHOME**, sobre 39 bloques. **El reviewer entero es KEEP.**
Estos tres números y la afirmación sobre el reviewer vienen del encargo de cierre, no de
disco.

### D.2 La segmentación, medida hoy — y **cuadra exactamente en 39**

Segmenté los dos prompts por unidad de instrucción: cada párrafo de sección como un
bloque, cada viñeta como un bloque, cada ítem numerado como un bloque, y cada plantilla de
reporte como un bloque único. **El resultado son 17 + 22 = 39**, que coincide con el total
citado. Se declara como corroboración fuerte, no como prueba de que las fronteras sean las
mismas.

**`prompts/executor.md` — 17 bloques**

| # | Rango | Contenido | Veredicto |
|---:|---|---|---|
| E1 | `prompts/executor.md:5-8` | Identity — rol, headless, sin humano, el kernel commitea | KEEP |
| E2 | `:12-21` | **Authorization** — ticket ya aprobado, no pedir confirmación, y qué NO hace el agente | **NO-KEEP** (§D.3) |
| E3 | `:23-25` | Run objective + `{{OBJECTIVE}}` | KEEP |
| E4 | `:27-29` | Previous rounds history + `{{LOG}}` | KEEP |
| E5 | `:33-35` | Hard rule — tocar SOLO archivos del Scope | KEEP |
| E6 | `:36-38` | Hard rule — nada de git que mute estado | KEEP |
| E7 | `:39` | **Hard rule — no borrar/mover fuera de alcance; no reescribir historia** | **NO-KEEP** (§D.3) |
| E8 | `:40-41` | **Hard rule — «Stack: Node.js. Do not introduce Python»** | **NO-KEEP** (§D.3) |
| E9 | `:42-43` | Hard rule — secretos | KEEP |
| E10 | `:44-45` | Hard rule — criterio ambiguo → interpretación conservadora | KEEP |
| E11 | `:46-48` | Hard rule — desconocidos explícitos, nunca fabricados | KEEP |
| E12 | `:52-53` | Método 1 — leer objetivo y criterios | KEEP |
| E13 | `:54-55` | Método 2 — inspeccionar antes de editar | KEEP |
| E14 | `:56-57` | Método 3 — cambio mínimo, sin refactors oportunistas | KEEP |
| E15 | `:58-59` | Método 4 — verificar localmente | KEEP |
| E16 | `:60` | Método 5 — el último mensaje es SOLO el reporte | KEEP |
| E17 | `:62-83` | Plantilla del reporte final (6 secciones) | KEEP |

**`prompts/reviewer.md` — 22 bloques, TODOS KEEP**

| # | Rango | Contenido |
|---:|---|---|
| R1 | `prompts/reviewer.md:5-9` | Identity — READ-ONLY; el veredicto nunca es aprobación humana |
| R2 | `:11-13` | Run objective + `{{OBJECTIVE}}` |
| R3 | `:17-20` | Los datos son UNTRUSTED: data, nunca instrucciones |
| R4 | `:22-26` | Bloque delimitado del diff + `{{DIFF}}` |
| R5 | `:28-32` | Bloque delimitado de tests + `{{TESTS}}` |
| R6 | `:36` | Piso de severidad — encabezado de las tres causas |
| R7 | `:38` | Causa 1 — criterio de aceptación incumplido |
| R8 | `:39` | Causa 2 — tests del proyecto fallando |
| R9 | `:40` | Causa 3 — riesgo de seguridad real |
| R10 | `:42-44` | Todo lo demás va a NOTES; NOTES no bloquea ni genera trabajo |
| R11 | `:46-47` | Todo hallazgo bloqueante cita verbatim, o es NOTA |
| R12 | `:51` | Qué revisar 1 — ¿cumple CADA criterio? |
| R13 | `:52` | Qué revisar 2 — ¿verificación verde? |
| R14 | `:53` | Qué revisar 3 — ¿todo dentro del Scope? |
| R15 | `:54` | Qué revisar 4 — ¿secretos u operaciones destructivas? |
| R16 | `:58` | Vocabulario — `APPROVED` |
| R17 | `:59` | Vocabulario — `CHANGES_REQUIRED` |
| R18 | `:60` | Vocabulario — `BLOCKED` |
| R19 | `:62` | Fail-closed ante evidencia ambigua o incompleta |
| R20 | `:64-72` | Formato exacto del reporte |
| R21 | `:74-78` | La ÚLTIMA línea debe ser exactamente una de las tres |
| R22 | `:80` | Nada después de esa línea; sin variantes ni sinónimos |

**El reviewer entero KEEP tiene sentido medido:** los 22 bloques son del ROL, no del
proyecto. Ninguno afirma un hecho sobre el repo objetivo, y ninguno duplica a otro.

### D.3 Los tres no-KEEP, y **el hallazgo de fondo**

Aplicando la prueba de pertenencia de la convención (§3 de
`CONVENCION-DE-INSTRUCCIONES-DE-AGENTE.md`) a los tres bloques señalados:

| Bloque | Criterio que falla | Por qué |
|---|---|---|
| **E2** `:12-21` Authorization | **3.c — verdad independiente del destino** | Afirma hechos del pipeline de UN proyecto: *«you do not certify components, you do not close phases or gates, you do not update status matrices»*, y cita entre comillas una regla de proyecto (*«only approved tickets are executed»*). Se entrega idéntico contra cualquier repo registrado |
| **E8** `:40-41` Stack | **3.c — verdad independiente del destino** | *«Stack: Node.js. Do not introduce Python»* es un hecho **del repo objetivo**, no del rol. Se vuelve falso el día que se registre un destino distinto, **sin que nadie edite el prompt y sin que nada se ponga rojo** |
| **E7** `:39` | **3.b — dueño único** | *«Do not delete or move files out of scope»* ya lo afirma **E5** (`:33-35`); *«Do not rewrite history»* ya lo afirman **E6** (`:36-38`) y `CONSTITUCION.md:40` (*«Jamás rewrite»*). Es copia, y la copia es el defecto |

**EL HALLAZGO DE FONDO — y es el que importa más que los tres veredictos:**

> **DOS DE LOS TRES NO-KEEP SON HECHOS *POR PROYECTO* ALOJADOS EN ARCHIVOS *POR ROL*,
> PORQUE EL CARGADOR NO TIENE TERCER EJE.**

El kernel tiene un eje de rol (`executor` / `reviewer`, `kernel.mjs:232`) y resuelve el
proyecto en tiempo de ejecución desde `config.json` (`kernel.mjs:274-278`), pero **no hay
ningún archivo de instrucciones por proyecto**. Lo que es cierto de un destino y falso de
otro no tiene dónde vivir, así que acaba en el archivo del rol. **No es descuido de
redacción: es la forma del cargador.** Y por eso la aplicación de esta tabla no es
mecánica.

### D.4 Veredicto de la aplicación: **EXIGE JUICIO**

No es un borrado de tres bloques. Cada uno abre una pregunta que un tercero no puede
resolver por regla:

- **E8** deja un hueco real si se borra: el ticket tendría que declarar el stack, o
  aceptarse que el executor no lo sabe.
- **E2** contiene doctrina útil —el régimen de aprobación y la frontera de lo que el
  agente NO hace— cuyo lector natural es una persona, no el agente en mitad de un run. Su
  destino es documentación de clase A bajo `docs/`, **y el área que le corresponde puede
  no existir todavía**; la convención prohíbe inventar la ruta.
- **E7** es el único puramente mecánico.

### D.5 `[NO VERIFICADO]` — la única celda que este record no puede certificar

**Cuál de los dos bloques POR PROYECTO (E2, E8) es `DELETE` y cuál es `REHOME`.** El total
citado es 2 DELETE + 1 REHOME; **E7** es `DELETE` sin ambigüedad (falla 3.b, y la
convención manda borrar lo que ya tiene dueño). Queda un `DELETE` y un `REHOME` para
repartir entre E2 y E8, y **el reparto no se deriva de disco**: depende del juicio de §D.4
sobre si lo que el bloque afirma le sirve a un lector humano. **Se declara sin redondear
en vez de elegir uno.**

**Cómo se trae lo que falta:** con **un encargo de taller** que abra el reporte del run
`#26` (el taller lee el disco entero; la cabina no puede leer este record — §L). No se
pide sync.

---

## E — LAS TRES IMPRECISIONES DEL `#27`, CORREGIDAS HACIA ADELANTE

Las tres son diferencias entre el texto del propio run (`aiw/roadmap/roadmap.json:366-375`,
verbatim del canónico) y lo que `docs/kernel/CICLO-DE-RUN.md` midió contra código. **El
documento corrige hacia adelante: el texto del run no se reescribió.**

| # | Lo que el `#27` decía | Lo medido | Unidad y alcance |
|---:|---|---|---|
| **1** | *«its five outcomes»* (en el `summary`) | **CUATRO** desenlaces | **4 claves** de la tabla `OUTCOMES` (`kernel.mjs:28-33`). Las **5** son **valores de retorno** de `superviseVerdict` (`kernel.mjs:218-225`), y una de ellas —`CONTINUE`— **se consume dentro del bucle** (`kernel.mjs:411`) y no llega jamás a ser estado. Son dos magnitudes distintas con dos unidades distintas |
| **2** | *«FOUR exit codes»* | Cierto **de `OUTCOMES`**, falso **del proceso** | **4 exit codes** en la tabla; el **PROCESO emite 5**: los cuatro más el **`1`** del catch de la CLI (`kernel.mjs:476`), que además es el destino de todo `Abort` (`kernel.mjs:45`) y que la cola archiva como `ERROR` (`queue.mjs:18`). Alcance: tabla ≠ proceso |
| **3** | *«must match APPROVED, CHANGES_REQUIRED or BLOCKED exactly»* | Falta el prefijo | El patrón está **anclado en los dos extremos** y exige `VERDICT: ` seguido de exactamente uno de los tres tokens (`kernel.mjs:213`). **El prefijo es parte de la exigencia, no adorno: el token suelto NO parsea.** Unidad: **3 tokens** aceptados, pero la línea comparada es la línea entera |

Las dos primeras están declaradas en el propio documento como *«dos lecturas que la tabla
deja explícitas y que conviene no arrastrar mal»* (`CICLO-DE-RUN.md` §5). La tercera está
en §3.c, en negrita.

**Coste medido de la tercera:** ninguna. Pero su consecuencia sí está medida y es la razón
de ser del documento — **el reviewer no se invoca con tests en rojo** (`CICLO-DE-RUN.md`
§8.3): con verificación roja el kernel acumula la evidencia (`kernel.mjs:387`) y pasa de
ronda **sin que el reviewer vea nada**; si la ronda roja es la última, cierra
`HUMAN_REVIEW`/exit 4 **sin veredicto de nadie** (`kernel.mjs:388`). **Un `HUMAN_REVIEW`
sin juicio es indistinguible de un rechazo en cualquier vista que solo lea el estado.**

---

## F — LA AUDITORÍA DEL ROADMAP Y LA ESTABILIZACIÓN

### F.1 Tres afirmaciones FALSAS, corregidas por nota fechada en cuatro runs

Todas verificadas verbatim en el canónico, todas con la marca `CORRECTED 2026-07-31 —
measured, not assumed`:

| Afirmación falsa | Dónde estaba | Corrección medida |
|---|---|---|
| *«`logs/` is gitignored»*, en presente | **`#33`** `RUN-AIW-RUN-IDENTITY-001` y **`#34`** `RUN-AIW-RUN-MANIFEST-001` | `logs/` **está versionado hoy**, trackeado en git, y `.gitignore` no lleva línea para él, desde el run que hizo viajar la evidencia. **Léase como histórico, no como estado actual** |
| *«the post-mortem lives in a gitignored file»* | **`#41`** `RUN-AIW-DECOUPLED-QUEUE-LAUNCHER-001` | `logs/INCIDENT-2026-07-11.md` está **TRACKEADO**. Esto **REFUERZA** su posición `CONST §4`: el incidente en que se apoya es documentado **y portable** |
| *«the eleven open tickets»* | **`#38`** `RUN-AIW-RUN-CATEGORY-FIELD-001` | Disco dice **NUEVE** — y el criterio importa tanto como el número: **no hay flag `open`**; lo que hace abierto a un ticket es la carpeta donde está. Nueve `.md` bajo `objectives/parked/`, `objectives/qualification/` y `objectives/queue-e7/`, con `objectives/pending/` vacía y trece más en `processed/` |

**Tres afirmaciones distintas, cuatro runs tocados** (la primera se repetía en dos). En los
tres casos **el ARGUMENTO que la cifra sostenía sigue en pie**: lo que se corrigió es la
cifra y su alcance, no la conclusión.

### F.2 Tres aristas que la prosa declaraba y el grafo no

Commit `1582645`, medido comparando el canónico antes y después:

| Run (numeración de hoy) | Arista que entró |
|---|---|
| **`#37`** `RUN-AIW-EVIDENCE-SCHEMA-DOCUMENTATION-001` | → `RUN-AIW-RUN-IDENTITY-001` |
| **`#37`** ídem | → `RUN-AIW-RUN-MANIFEST-001` |
| **`#46`** `RUN-AIW-UNATTENDED-OPERATION-DOCUMENTATION-001` | → `RUN-AIW-DECOUPLED-QUEUE-LAUNCHER-001` |

Aristas: **17 → 20**. Y antes, en `6225979`, habían entrado **dos más** en el `#40`
`RUN-AIW-CATEGORIES-BATCHES-DOCUMENTATION-001` → `RUN-AIW-RUN-CATEGORY-FIELD-001` y
`RUN-AIW-BATCH-TO-BRANCH-001` (**15 → 17**). **Total de aristas añadidas en la sesión:
seis** — cinco por prosa-sin-grafo, y una que nació con el run nuevo del push.

**El patrón, y es lo que hace que esto valga como hallazgo:** las cinco aristas
prosa-sin-grafo son **todas de runs de documentación hacia lo que documentan**. La
dependencia estaba escrita, y quien leyera solo `depends_on` la habría visto arrancable.

### F.3 `aiw` declarado ESTABLE al hilo vecino

Al cierre: HEAD `ae7e7f1`, `git status --porcelain` **vacío**, `.project/` re-emitido en el
mismo commit que el último cambio de canónico. **Verificado hoy, en apertura y en cierre de
este encargo.**

---

## G — LA AUDITORÍA HUMANA DE `O7` Y `O3`

> **Procedencia declarada.** La auditoría la hizo el operador en cabina. Este bloque
> escribe **lo que es verificable en disco de lo que allí se decidió**, y marca lo que no
> lo es. Ver §«LO QUE NO PUDE VERIFICAR», punto 3.

### G.1 `O7` — el bloqueo circular, MEDIDO

`O7` *Long unattended execution (batches, lanes and parallelism)*: 6 fases, 6 runs,
**los seis `planned`**.

**El hito del objetivo es el `#45` `RUN-AIW-LONG-UNATTENDED-SESSIONS-001`,
*Run real long unattended sessions and count them honestly*** — y su propio texto declara
que **no es solo un hito: es la medición que licencia todo lo construido antes de él.**

**La circularidad, verificada pieza a pieza:**

1. `CONSTITUCION.md:44-47` fija la métrica mensual en **dos números**: *«¿Cuántas noches
   corrió desatendido?»* y *«¿Cuántos diffs se aceptaron (merge) sin reescribirlos?»*, con
   la regla adjunta: **«Si esos dos números no suben, ningún mecanismo nuevo está
   justificado.»**
2. El contador **está honestamente en cero** — el propio `#45` lo dice: *«This is measured
   by running the sessions, never by declaring them.»*
3. El `#45` tiene **SEIS aristas, y todas son portantes** (medido: `depends_on` con 6
   entradas, `roadmap.json:668`):

| Antecedente | Objetivo | Por qué es portante (texto del `#45`) | Estado `CONST §4` |
|---|---|---|---|
| `#41` `RUN-AIW-DECOUPLED-QUEUE-LAUNCHER-001` | `O7` | *«una ventana que muere con su terminal no es desatendida»* | **Tres criterios COMPLETOS** (`D-055` caso 2) |
| `#42` `RUN-AIW-ORPHAN-LOCK-RECOVERY-001` | `O7` | una muerte abrupta convierte la cola en una que se niega a arrancar | Incidente SÍ, **criterio de borrado NO** |
| `#43` `RUN-AIW-WORKTREES-PER-RUN-001` | `O7` | sin ellos la ventana es una lista secuencial | **Incidente PENDIENTE** |
| `#44` `RUN-AIW-KERNEL-READS-LANES-001` | `O7` | si no, el paralelismo está planificado y no ejecutado | **Incidente PENDIENTE** |
| `#36` `RUN-AIW-MID-RUN-SIGNALS-001` | `O5` | una ventana larga sin hechos consultables no se puede auditar después | **Incidente PENDIENTE** |
| `#39` `RUN-AIW-BATCH-TO-BRANCH-001` | `O6` | sin lotes, la ventana produce trabajo sin unidad revisable | **Incidente PENDIENTE** |

**EL LAZO, dicho en una línea:** *la métrica que autoriza a construir solo sube corriendo
una noche, y la noche exige seis mecanismos que la compuerta detiene.* **Cinco de los seis
están detenidos hoy; solo el `#41` puede ejecutar.**

**Y no se rompe declarando la noche.** Lo que el lazo tiene de real es que `CONST §6` mide
noches CORRIDAS, no noches planificadas, y `CONST §4` no admite «lo necesito para medir»
como incidente: *«Una idea no es un incidente. Un miedo no es un incidente»*
(`CONSTITUCION.md:32`).

### G.2 `O3` — los tres huecos, MEDIDOS HOY

`O3` *Reliable autonomous run*: 10 fases, 11 runs, 4 `completed` y 7 `planned`. Los tres
huecos son cosas que `O3` necesita y **para las que no existe run en ninguno de los 46**.
Cada uno verificado por búsqueda sobre los 46 `full_description`:

| # | El hueco | Verificación |
|---:|---|---|
| **1** | **La aplicación de la tabla de disposición de los 39 bloques no tiene run.** El `#26` cerró entregando la especificación y declarando que aplicarla es un acto separado | De los 21 `planned`, ninguno la aplica. La tabla existe solo en este record (§D) |
| **2** | **`aiw` no tiene forma declarada de correr su propia suite.** Doce archivos `tests/*.test.mjs` y ninguna puerta con nombre | `aiw/package.json` **NO EXISTE**. Ningún run de los 46 lo cubre. El `#27` era el candidato natural y **no lo tomó**: `CICLO-DE-RUN.md` §12 declara *«No afirma que la suite esté verde. Ni la corre»* |
| **3** | **El `git mv -f` que sobrescribe al archivar.** `queue.mjs:27` archiva un ticket trackeado con `git mv -f`; la `-f` **sobrescribe el destino sin avisar** | Verificado en `aiw/queue.mjs:25-32`. Ningún run de los 46 lo toca — el único que nombra `queue.mjs` es el `#41`, que es el lanzador. **Es defecto real del kernel y necesita run propio con su `CONST §4`** |

Los huecos 2 y 3 venían **heredados** del handoff anterior como pendientes que no bloquean.
**Siguen sin dueño después de esta sesión, y se revalidan en disco hoy.**

### G.3 La compuerta `CONST §4` sobre los 21 vivos — el reparto medido

Leído run por run del canónico:

| Disposición | nº | Runs |
|---|---:|---|
| **PAPEL** — no añade mecanismo | **6** | `#22`, `#30`, `#37`, `#40`, `#45`, `#46` |
| **MECANISMO — tres criterios COMPLETOS**, puede ejecutar | **2** | `#34` (`D-055` caso 1), `#41` (`D-055` caso 2) |
| **MECANISMO — incidente SÍ, criterio de borrado NO** | **2** | `#33`, `#42` |
| **MECANISMO — incidente PENDIENTE** | **10** | `#23`, `#28`, `#29`, `#32`, `#35`, `#36`, `#38`, `#39`, `#43`, `#44` |
| **MECANISMO — adjudicación ABIERTA** (si §4 le alcanza) | **1** | `#31` |

**ELEGIBLES HOY: 8 de 21** (6 papel + 2 completos). **DETENIDOS POR LA COMPUERTA: 13 de
21.** Unidad: runs `planned`. Alcance: los 21 vivos del canónico a `ae7e7f1`.

**Precisión:** dos de los runs del roadmap dicen ser *«one of only three runs in this
roadmap that can execute on an already-documented incident»*. **El tercero es el `#24`, ya
`completed`.** Entre los VIVOS son **dos**, no tres.

---

## H — EL HALLAZGO MAYOR

> ## `kernel.mjs` NO CONTIENE LA CADENA `roadmap`. **CERO APARICIONES.**

```bash
cd aiw && grep -c -i "roadmap" kernel.mjs
# 0
```

**La consola escribe el roadmap. El kernel lee tickets `.md` de una carpeta y se lanza por
CLI. SON DOS SISTEMAS QUE NO SE TOCAN.**

**La consecuencia, y es la más grande de este roadmap:** toda capacidad que el operador
quiere —lanzar un run o un lote desde la consola, ver el progreso ahí, cerrar un run desde
su resultado— tiene que cruzar **un puente que no existe**.

**De ahí nació el run del intake**, el `#31` `RUN-AIW-INTAKE-001`,
*The intake: turn a roadmap run into an executable contract*, que lleva el hallazgo escrito
en su propio texto (`roadmap.json:424`, verbatim): *«MEASURED GAP, AND IT IS THE LARGEST
ONE IN THIS ROADMAP: kernel.mjs DOES NOT READ roadmap.json. Zero references, verified
2026-07-31.»*

**Dos consecuencias del intake que conviene no perder:**

- **Lo que el intake lee** incluye tres campos que este roadmap **pidió al hilo
  `aiw-console` y que pueden no existir todavía**: `constraints`, `acceptance_criteria` y
  `references`. Si faltan cuando el run ejecute, **lo dice y para** en vez de inventarlos.
- **La restricción portante:** el reviewer solo puede bloquear por criterio declarado,
  tests rojos o riesgo real de seguridad — **todo lo demás va a NOTES y no bloquea nada**
  (`CONSTITUCION.md:15-22`). Por tanto **la calidad de todo run autónomo está acotada por
  la calidad de los criterios de aceptación que el intake produzca.** Esa es la razón
  entera de que se pida el campo `acceptance_criteria` en vez de derivarlo de la prosa.

---

## I — LOS CUATRO RUNS NUEVOS Y EL MOVIDO

Commit `17b6dfa`. `O3` pasa a ser el ciclo completo: **42 → 46 runs**, **cuatro fases
nuevas** (`O3.P7`, `O3.P8`, `O3.P9`, `O3.P10`) y **15 runs renumerados**.

### I.1 Los cuatro nuevos

| `#N` de hoy | `run_id` | Título verbatim | Fase | Razón |
|---:|---|---|---|---|
| **28** | `RUN-AIW-SHARED-WORKING-BRANCH-001` | *Let consecutive runs share one working branch so their work chains* | `O3.P7` Chained runs | Sin encadenar, cada run empieza de cero |
| **29** | `RUN-AIW-PUSH-IS-PART-OF-CLOSURE-001` | *A failed push escalates to human review instead of closing the run silently* | `O3.P8` Closure that publishes | El push fallido hoy no se entera nadie |
| **31** | `RUN-AIW-INTAKE-001` | *The intake: turn a roadmap run into an executable contract* | `O3.P9` The intake | El puente que §H demuestra que no existe |
| **32** | `RUN-AIW-PROVIDER-PER-ROLE-001` | *Declare providers in config and choose one per role in the ticket* | `O3.P10` Providers per role | El proveedor está cableado en `kernel.mjs:236` |

### I.2 El movido

**`#30` `RUN-AIW-PER-PROJECT-PUSH-001`, *Turn on push per project*** salió de `O6` y entró
en `O3.P8`. **Ese movimiento es la causa medida de la única fase vacía del roadmap:**
`O6.P1` *Per-project push activation* se quedó sin runs (§0.2).

### I.3 La inversión posterior del `#29` y el `#30` — commit `ae7e7f1`

`17b6dfa` los dejó en el orden **push-on (29) → escalada (30)**, con la arista
escalada → push-on. `ae7e7f1` **los invirtió**: **escalada (29) → push-on (30)**, y la
arista se invirtió con ellos (medido: `PER-PROJECT-PUSH` pasa de `depends_on: []` a
`[PUSH-IS-PART-OF-CLOSURE]`, y `PUSH-IS-PART-OF-CLOSURE` de `[PER-PROJECT-PUSH]` a `[]`).

**La razón, verbatim de la nota `REORDERED 2026-07-31` del `#30`:**

> *«THE REASON IS THE SHARED-PIECE RULE, NOT CLASSIFICATION: turning publication on before
> a failed push can be seen is exactly the pattern that rule exists to prevent… kernel.mjs:432
> continues after a failed push, the notice travels only to summary.md which no code reads,
> and neither the exit code nor the notification carries it… The position that shipped
> hours earlier was written from conceptual dependency rather than from safety, and it was
> wrong.»*

**Y la circularidad aparente quedó resuelta por escrito en el `#29`**: verificar la
escalada **no exige un push real**, porque el kernel ya separa decisión de efecto
(`kernel.mjs:181`, `checkpointDecision` en `:194`). **La selección de desenlace ante push
fallido se construye como función pura y se prueba como tal.**

---

## J — LAS DECISIONES DEL OPERADOR

Una línea cada una, con su rastro en disco cuando lo tiene:

| # | Decisión | Rastro |
|---:|---|---|
| 1 | **El intake nace como run**, no como nota ni como parte de otro | `#31` existe en el canónico, `planned`, `O3.P9` — **verificado** |
| 2 | **Los proveedores se DECLARAN en `config.json` y se ELIGEN en el ticket**, siguiendo el precedente de `# Max rounds` | `#32`, texto verbatim — **verificado** |
| 3 | **El push fallido ESCALA A HUMANO y NO aborta** | `#29`, título y texto — **verificado** |
| 4 | **`CONST §4` ALCANZA al run de proveedores** | `#32` verbatim: *«MECHANISM, INCIDENT PENDING, AND THE OPERATOR HAS ALREADY ADJUDICATED THAT IT APPLIES»* — **verificado** |
| 5 | **`cantu-quizzes-latex` es el primer objetivo real de AIW, y va DESPUÉS del corte** | **CITADO. Sin rastro en disco**: 0 apariciones en los dos roadmaps, y el directorio no existe bajo `projects/` |
| 6 | **Fuente única de `acceptance_criteria`**: para un run que ejecuta AIW el campo del roadmap es la FUENTE y el intake genera el ticket; para un encargo de cabina el ticket sigue autorado y el campo queda vacío | `D-060`, adjudicación 6, *«Aprobada por el operador a petición del hilo `aiw`»* — **verificado** |

---

## K — LOS DOS APLAZAMIENTOS RAZONADOS

### K.1 Fusionar `aiw` y `aiw-console` — **APLAZADO**

**Razón medida: AIW perdería su único objetivo válido.** `CONSTITUCION.md:24-26` §3
Anti-auto-hosting: *«v2 nunca se ejecuta sobre su propio repo.»* Y medido en
`aiw/config.json`, **los proyectos registrados son exactamente dos**: `sandbox`, cuya ruta
`aiw/sandbox` **no existe en disco**, y `console` → `projects/aiw-console`. **`aiw-console`
es hoy el único destino real que el kernel tiene.** Fusionarlos convertiría ese destino en
el propio repo de AIW, que la constitución prohíbe. El coste no es de conveniencia: es de
doctrina.

### K.2 Hosting 24/7 — **APLAZADO**

**Razón medida: necesita primero el lanzador desacoplado.** Es el `#41`
`RUN-AIW-DECOUPLED-QUEUE-LAUNCHER-001`, *Make the queue survive the terminal that launched
it*, y su incidente ya está documentado con los cuatro campos (`D-055` caso 2, incidente
del **2026-07-11**: el terminal murió, node saltó el `finally`, el lock sobrevivió huérfano
y el executor desprendido siguió editando `aiw-console` unos quince minutos hasta que un
humano lo mató). **Hasta que ese run entre, la regla operativa vigente sigue siendo que el
terminal de la cola se queda abierto e intocado durante toda la ventana** — regla que el
propio `#41` **deroga por escrito, nombrándola**, el día que entre.

---

## L — LA TOPOLOGÍA DEL SYNC, Y SU CONSECUENCIA OPERATIVA

**`context/aiw-console/records/` NO SE SINCRONIZA AL PROJECT.** El recorte está declarado
en `context/handoffs/aiw-console.md` §2 y verificado por los dos hilos. Tampoco se
sincronizan `project-console/`, `docs/project-console/`, `console/`, `tests/`, `tools/` ni
`.project/`.

**SÍ se sincronizan:** `roadmap/roadmap.json`, `context/README.md`,
`context/DECISIONES.md`, `context/handoffs/`, `context/aiw-console/CONTRATO.md`,
`context/CLASIFICACION-DE-RUNS.md`, `context/aiw/`, `context/cantu-studio/`.
`context/PROCEDIMIENTO-DE-CLASIFICACION.md` está en `context/` y **se lee del knowledge**.

**LA CONSECUENCIA, Y GOBIERNA CÓMO SE ESCRIBIÓ EL HANDOFF DE HOY:**

> **Un handoff que apunta a un record NO RESUELVE para el hilo que lo lee.** El puntero
> sigue siendo correcto como dirección y es inútil como acceso. Por eso **toda cifra o
> hallazgo que la próxima sesión vaya a USAR viaja DENTRO del handoff**, con su unidad y su
> alcance, y el puntero a este record queda **solo como procedencia**.

**Las dos vías para traer lo que solo existe aquí:** un **encargo de taller** (el taller lee
el disco entero) **o que el operador lo pegue**. **Nunca pidiendo sync**: es topología, no
retraso de indexado.

**Este record es, él mismo, un caso de eso.** Todo lo que la próxima sesión necesita de él
—el estado medido, la tabla de los 21 vivos, el reparto de `CONST §4`, los huecos, el
bloqueo circular— **está duplicado dentro del handoff a propósito.** Lo único que se quedó
solo aquí es **la tabla de los 39 bloques** (§D), porque no cabe y porque nadie va a
aplicarla desde cabina.

---

## M — LO QUE ESTE RECORD NO AFIRMA

- **No afirma que la suite de `aiw` esté verde.** No se corrió ninguna suite. No hay
  `package.json` en `aiw`, así que ni siquiera hay puerta con nombre para correrla (§G.2).
- **No clasifica ningún run.** No asigna ningún valor del vocabulario de clasificación, no
  deriva `severity` ni `closure_mode`, y no propone ninguna regla para runs mixtos.
- **No certifica que la tabla de §D reproduzca las fronteras exactas del reporte del
  `#26`.** La segmentación cuadra en 39, que es corroboración fuerte, no prueba.
- **No adjudica el reparto `DELETE`/`REHOME` entre E2 y E8** (§D.5). Se declara sin
  redondear.
- **No afirma que los tres huecos de §G.2 sean, palabra por palabra, los tres que la
  auditoría humana nombró.** Son los tres que se verifican en disco hoy como necesarios
  para `O3` y sin run que los cubra.
- **No cierra ningún run**, no cambia ningún `status`, no edita ningún roadmap y no
  re-emite `.project/` de nada.
- **No resuelve ninguna decisión abierta.** Las nombra con su puntero; son del operador.
- **No repara ninguna deriva.** La nombra; no la toca.
- **No ejecutó git en ninguna forma que escriba**, en ninguno de los dos repos.
- **No actualiza `context/aiw/ESTADO.md`**, que está fuera del alcance de este encargo y
  cuya última actualización sigue siendo **2026-07-22** — desfasada en once días respecto de
  lo medido aquí. **Se nombra, no se toca.**

---

## LO QUE NO PUDE VERIFICAR

1. **La tabla de disposición de los 39 bloques, en su forma original.** No existe en disco:
   `0` apariciones en todo el workspace de la cadena «39 bloques», de la etiqueta `REHOME`
   y de la tabla misma. Los totales **36 KEEP / 2 DELETE / 1 REHOME** y «el reviewer entero
   KEEP» son **CITADOS** del encargo de cierre. Lo que sí medí: la segmentación (17 + 22 =
   39), los rangos `ruta:línea` y qué criterio de §3 falla cada uno de los tres no-KEEP.
   **Sin verificar: el reparto `DELETE`/`REHOME` entre E2 y E8** (§D.5).
2. **Que las tres imprecisiones de §E sean exactamente las tres que el `#27` reportó.**
   Las tres que escribo son diferencias reales y verificables entre el texto del run y lo
   medido en `CICLO-DE-RUN.md`; dos de ellas el propio documento las declara explícitas. La
   correspondencia uno a uno con el reporte del run **no es verificable desde disco**.
3. **Los tres huecos de `O3` (§G.2) como enunciado de la auditoría humana.** La auditoría
   ocurrió en cabina y no dejó artefacto. Los tres que reporto están **medidos hoy** —
   `package.json` ausente, `git mv -f` en `queue.mjs:27`, tabla sin run— y cada uno
   verificado como no cubierto por ninguno de los 46 runs.
4. **`cantu-quizzes-latex`.** Cero rastro en disco: no aparece en el roadmap de `aiw`, ni
   en el de `aiw-console`, ni como directorio bajo `projects/` (donde hay tres:
   `aiw-console`, `cantu-lessons`, `cantu-studio`). Es decisión de cabina, **CITADA**.
5. **Que poner un run en `active` desde la consola deje modificados el canónico y los cinco
   artefactos de `.project/`.** Verifiqué que `aiw/.project/` contiene **exactamente cinco**
   archivos y que **los cinco están trackeados** (`docs_index.json`, `guardrails.json`,
   `no_claims.json`, `roadmap.json`, `snapshot.json`). **No ejecuté la consola** ni puse
   ningún run en `active`, así que el comportamiento en sí queda sin verificar.
6. **El techo de `kernel.mjs`.** Medido: **478 líneas** contra el `~500` de
   `CONSTITUCION.md:29`. **No verificado** que exista test, hook o check que lo haga
   cumplir — los propios runs repiten que *«enforcement is human and documentary»*, y este
   encargo no corrió ninguna suite.
7. **El `#22`** `RUN-AIW-REAL-LOAD-MEASUREMENT-001` **necesita la suite de `aiw-console`
   verde**, y el handoff anterior la dejaba en 10 fallos de 278 con un despinneo en curso
   por el hilo vecino. **No medí el estado de esa suite en esta sesión.**
8. **Números de línea del canónico.** Los `roadmap.json:NNN` que cito se midieron contra
   HEAD `ae7e7f1`. Cualquier escritura posterior los mueve. **Los `run_id` no se mueven; los
   números sí.**
9. **`aiw-console` SE MOVIÓ bajo los pies de este record, y el riesgo se materializó.** En
   este repo escriben tres hilos. El HEAD de `aiw` sí quedó fijado —`ae7e7f1`, árbol limpio,
   en apertura y en cierre—. El de `aiw-console` estaba en `5af9416` **y limpio** al abrir;
   al cerrar, el HEAD sigue en `5af9416` pero el árbol muestra **una tercera entrada que no
   es de este encargo**: `M context/handoffs/aiw-console.md` (**200 inserciones, 506
   supresiones** — el hilo vecino reescribiendo su propio relevo). **NO SE REVIRTIÓ, no se
   tocó y no se leyó su contenido nuevo más allá de caracterizarlo.** Lo que este encargo
   escribió está en §«Archivos escritos» y son dos archivos, ninguno de ellos ése.

---

## ARCHIVOS ESCRITOS POR ESTE ENCARGO

| Ruta | Qué es |
|---|---|
| `context/aiw-console/records/RELEVO-AIW-AL-CIERRE-2026-08-02.md` | Este record (**nuevo**) |
| `context/handoffs/aiw.md` | El handoff del hilo `aiw` (**sobrescrito entero**) |

**Dos filas. No hay una tercera.** Los scripts de medición se escribieron en el scratchpad
de sesión, **fuera de los dos repos**. **En `aiw` no se escribió un byte.**

Records en `context/aiw-console/records/` antes: **106**. Después: **107**.
Colisión de nombre: **ninguna** — los únicos que contienen «RELEVO» son
`CIERRE-REGISTRO-Y-RELEVO-TERCERO.md` y `RELEVO-CANTU-AL-CIERRE-2026-08-01.md`.
