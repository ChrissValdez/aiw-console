# HANDOFF — hilo `aiw-console` (la consola)

> **Efímero y se SOBRESCRIBE.** Es el relevo del hilo: se reescribe al cerrar cada
> sesión y se consume al abrir la siguiente. No es un record, no acumula historia.
> Lleva **solo** lo necesario para arrancar. **APUNTA, no RECUENTA.**
>
> **Este handoff NO lleva doctrina.** La doctrina vive en
> `context/CLASIFICACION-DE-RUNS.md` y en `context/DECISIONES.md`. Si alguna vez se
> copia aquí una regla, deja de ser regla y se vuelve estado que se pudre.
>
> **TODO `#N` Y TODO `phase_id` DE ESTE DOCUMENTO ES UNA COORDENADA FECHADA**
> (2026-07-31). El `queue_order` se renumera cuando se inserta un run: el `#43` de
> ayer no es el `#43` de hoy. **La próxima sesión no debe leer estos números como
> los suyos: los re-mide sobre `roadmap/roadmap.json`.** Los `run_id` sí son
> estables (`D-047`, identidad opaca) — cuando haya duda, manda el `run_id`.

---

## 1. Cómo arrancar — cinco lecturas, en este orden

1. `roadmap/roadmap.json` — el plan y el estado. **El estado real se mide aquí, no
   se recuerda ni se hereda de este archivo.**
2. `context/CLASIFICACION-DE-RUNS.md` — la especificación canónica de clasificación
   de runs, normativa y transversal a los tres proyectos. Su `§7` sigue declarando
   un hueco abierto: las tres reglas mecánicas para runs mixtos (ver §8).
3. `context/DECISIONES.md` — el suelo doctrinal. **`D-059` es la última entrada** y
   es la del cierre del `#43`.
4. `context/aiw-console/CONTRATO.md` — `§7` (rutas: contención documental, no
   enforced), `§11`–`§12` (status de fase y objetivo **derivado al leer**, no
   almacenado).
5. `context/handoffs/aiw.md` y `context/handoffs/cantu-studio.md` — los dos hilos
   paralelos. **Léelos antes de tocar cualquier run que escriba en `cantu-studio`.**

**La fuente principal de ESTE relevo es un record:**
`context/aiw-console/records/AUDITORIA-ROADMAP-AIW-CONSOLE.md`. Es un puntero,
**no un acceso** — leer §2 antes de planificar sobre él.

---

## 2. ⚠ AVISO DE TOPOLOGÍA — leer antes de planificar una sola lectura

**El sync del Project se RECORTÓ. `aiw-console` YA NO se sincroniza completo,
aunque la configuración del Project siga diciendo que sí.**

**NO están en el knowledge, y pedir sync NO los traerá — es topología, no retraso
de indexado:**

- `context/aiw-console/records/` — **todos** los records
- `project-console/` · `docs/project-console/` · `console/`
- `tests/` · `tools/` · `.project/`

**SÍ están:**

- `roadmap/roadmap.json`
- `context/README.md` · `context/DECISIONES.md` · `context/handoffs/`
- `context/aiw-console/CONTRATO.md`
- `context/CLASIFICACION-DE-RUNS.md`
- `context/aiw/` · `context/cantu-studio/`
- el `.project/roadmap.json` de `cantu-studio`

**CONSECUENCIA OPERATIVA: cuando este handoff apunte a un record, la cabina NO
puede leerlo.** Los punteros siguen siendo correctos como dirección, pero no como
acceso. Las dos vías son: **un encargo de taller** (el taller sí lee el disco
entero) **o que el operador lo pegue.** No se planifica sobre el contenido de un
record que nadie ha leído.

**⚠ ESTE AVISO SE REFUERZA, y no es teórico: esta sesión perdió tiempo por
incumplirlo.** La cabina citó un bloque de un record dando por hecho que lo tenía
delante, y no lo tenía. **Un record no se cita: se pide.** Y su corolario está en
§13.4 — mandar al operador a leer un record que la cabina no puede leer es
trasladarle un problema propio.

---

## 3. Estado medido hoy — 2026-07-31

**HEAD: `83a8158`** — el commit del record de auditoría, empujado, con el árbol
limpio. **Salvedad, y es literal: es el último HEAD que esta cabina conoce al
cerrar la sesión, no necesariamente el HEAD del repo cuando se lea.** En
`aiw-console` escriben tres hilos y el HEAD avanza sin que este hilo lo vea —
**ocurrió dos veces en esta sesión**. La próxima sesión mide el HEAD real; no lo
hereda de aquí.

`git status --porcelain` **vacío al abrir este encargo**. **Ningún run está
`active`.**

Medido sobre `roadmap/roadmap.json`:

- **52 runs** — **43 `completed`, 9 `planned`, 0 `active`.**
- **2 objetivos, 19 fases.** `O0` «Project Console»: 3 fases, 12 runs. `O4` «Global
  Console»: 16 fases, 40 runs.
- **26 aristas `depends_on`, 0 colgantes.**
- `queue_order` **1..52, denso, único y contiguo**.
- **36 runs con `closeout_result`.** Los 16 sin él: los 9 `planned` y **7
  `completed`** (ver §4.2).
- **0 runs con `lane`, 0 con `barrier`.** Un solo carril: la cola es serial y el
  `queue_order` es la historia completa de la ejecución. El vocabulario existe en el
  esquema (`D-051`) y este proyecto no lo usa.
- **`care_budget` de raíz declarado** (nuevo en el `#43`): `MINOR` Opus/Alto,
  `MODERATE` Opus/Extra, `MAJOR` Opus/Max, `CRITICAL` Fable/Max. Es **consejo, no
  regla**: no bloquea nada.
- **0 runs clasificados.** Ninguno de los 52 lleva un solo campo de clasificación
  escrito.

**Línea base del canónico:** **120 180 bytes**, md5
**`74958089e601bb7c9e571de485388e8b`**.

`context/DECISIONES.md`: **161 112 bytes; 59 entradas numeradas, `D-001`..`D-059`
sin huecos; la última es `D-059`.** (60 encabezados: uno es `D-010-enmienda`, que no
consume número.)

**Suite: 442 tests, 441 pasan, 1 falla** — `tests/roadmap-engine.test.mjs:92`, el de
fines de línea. **`[NO RE-MEDIDO HOY]`**: es la cifra que el tercer encargo del `#43`
dejó al cerrar; este encargo no corrió la suite. El fallo tiene causa y dueño
declarados en §13.2.

---

## 4. Qué pasó en esta sesión — el `#43` cerró

### 4.1 El `#43` está CERRADO

`RUN-CONSOLE-RUN-CLASSIFICATION-FIELDS-001` — «The five classification fields enter
the roadmap schema, with derivation at read time and a minimal view» — **pasó a
`completed`**. Se ejecutó en **tres encargos de taller**:

| encargo | qué dejó | record |
|---|---|---|
| **1 — motor** | los cinco campos en el esquema del run, la derivación al leer, los invariantes | `records/CLASIFICACION-MOTOR.md` |
| **2 — emisor, consola y `set-classification`** | el transporte en el sobre, la vista mínima y la operación de escritura | `records/CLASIFICACION-EMISOR-Y-CONSOLA.md` |
| **3 — `care_budget`** | el presupuesto de cuidado de raíz, indexado por severidad, como **consejo** | `records/CLASIFICACION-CARE-BUDGET.md` |

**El proyector queda en `0.12.0`.** `.project/` ya está re-emitido a esa versión
(§9).

**Las seis adjudicaciones que la especificación no fijaba están registradas en
`D-059`, con su cita medida en disco cada una. NO se resumen aquí: se leen allí.**
Esa entrada es transversal — lo implementado viaja a los tres proyectos dentro de
`taxonomy_model`.

### 4.2 El `closeout_result` del `#43` quedó VACÍO

El `status` entró; el campo **no**. En el `#43` el campo está **ausente**, no vacío.

**No es un caso aislado: 7 de los 43 terminales están igual** — `#4`, `#9`, `#39`,
`#40`, `#41`, `#42` y `#43`. Los otros 36 sí lo llevan (33 `completed_successfully`,
más `delivered_by_aiw_roadmap_O2`, `superseded_by_D-037_D-038` y
`discarded_by_D-048`).

**No rompe nada:** el contrato acopla `closeout_result ⇒ completed`, no la
recíproca. El `#43` está `completed` y por eso el `#44` es elegible.

**Pendiente menor, sin dueño:** mirar si la consola deja rellenar
`closeout_result` en un run ya cerrado. Si no deja, son 7 huecos que sólo se
cierran por otra vía.

---

## 5. Lo que queda vivo — los nueve `planned`

Títulos **verbatim de disco, en inglés**: es lo que el operador ve en pantalla.
Orden = `queue_order`.

**LA CABEZA DE LA COLA VIVA ES EL `#44` —
`RUN-CONSOLE-CLASSIFICATION-PILOT-001`, «Classify aiw-console's live runs as the
pilot, and rule on the procedure itself».**

| `#` | Fase | `run_id` | Título | ¿elegible por aristas? |
|---:|---|---|---|---|
| 44 | `O4.P9` | `RUN-CONSOLE-CLASSIFICATION-PILOT-001` | Classify aiw-console's live runs as the pilot, and rule on the procedure itself | **SÍ** — su única arista → `#43`, `completed` |
| 45 | `O4.P9` | `RUN-CONSOLE-DIGEST-CABINA-001` | Digest for the cockpit | **SÍ** — sin aristas |
| 46 | `O4.P5` | `RUN-CONSOLE-PARIDAD-RENDER-CANTU-001` | Global console renders Cantu (parity, operator QA) | **SÍ** — su única arista → `#41`, `completed` |
| 47 | `O4.P8` | `RUN-CONSOLE-UI-UX-001` | UI/UX of the global console | **NO** — 1 arista insatisfecha: `#46` |
| 48 | `O4.P9` | `RUN-CONSOLE-CANTU-CANONICAL-OUT-OF-AIW-001` | Move cantu-studio's canonical roadmap out of .aiw before the cutover can delete it | **SÍ** — sin aristas |
| 49 | `O4.P7` | `RUN-CONSOLE-CORTE-RETIRO-LOCAL-001` | Cutover: retirement of Cantu's local console and deletion of .aiw | **NO** — 3 aristas insatisfechas: `#46`, `#47`, `#48` |
| 50 | `O4.P9` | `RUN-CONSOLE-STALE-TEXTS-REPAIR-001` | Repair the five texts that describe this repo falsely | **SÍ** — sin aristas |
| 51 | `O0.P3` | `RUN-CANTU-ROADMAP-PHASE-OBJECTIVE-OPS-001` | Add phase and objective create and delete operations | **SÍ** — sin aristas |
| 52 | `O0.P3` | `RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001` | Deep Project Console audit | **SÍ** — sin aristas |

**7 de 9 son elegibles por aristas. 2 no lo son.**

Que `O0.P3` lleve 51 y 52, y que `O4.P5`/`O4.P7`/`O4.P8` caigan en 46/49/47 mientras
`O4.P9` ocupa números bajos y altos a la vez, **es correcto**: el orden lo da el
`queue_order`, siempre y solo; el `phase_id` es identidad opaca (`D-047`) y no
implica posición.

**Dos de los nueve escriben en `cantu-studio`** — el `#48` y el `#49`. La ventana se
coordina con aquel hilo y no corren con un taller vivo allí.

---

## 6. Aristas vivas, y los bloqueos que NINGUNA arista expresa

De las **26** aristas del archivo, **seis** tocan un run `planned`. Las 20 restantes
unen runs ya `completed`: no gobiernan nada de lo que queda y **no se transcriben.**

| Origen | → | Destino |
|---|---|---|
| The five classification fields enter the roadmap schema… *(`#43`, `completed`)* | → | Classify aiw-console's live runs as the pilot… *(`#44`)* |
| Fix four defects in the global console renderer… *(`#41`, `completed`)* | → | Global console renders Cantu (parity, operator QA) *(`#46`)* |
| Global console renders Cantu (parity, operator QA) *(`#46`)* | → | UI/UX of the global console *(`#47`)* |
| Global console renders Cantu (parity, operator QA) *(`#46`)* | → | Cutover: retirement of Cantu's local console… *(`#49`)* |
| UI/UX of the global console *(`#47`)* | → | Cutover: retirement of Cantu's local console… *(`#49`)* |
| Move cantu-studio's canonical roadmap out of .aiw… *(`#48`)* | → | Cutover: retirement of Cantu's local console… *(`#49`)* |

Las tres aristas que entran al corte son **aprobación explícita del operador**, no
comprobación automática. El corte es irreversible y no procede sin las tres.

### ⚠ ELEGIBLE NO ES ARRANCABLE

**De los 7 elegibles por aristas, 5 arrastran un bloqueo declarado EN PROSA que
ninguna arista expresa** — y no puede expresarla, porque lo que los bloquea no es un
run de este roadmap. **Son invisibles a cualquier motor que lea sólo `depends_on`.**

| `#N` | qué lo bloquea de verdad |
|---:|---|
| **44** | presencia del operador en la cabina: la corrección es juicio suyo aportado como ENTRADA, no aceptado al final |
| **46** | la paridad la **DECLARA** el operador; no se deriva de ningún test |
| **48** | ventana coordinada con el hilo de `cantu-studio`; no corre con un taller vivo allí |
| **51** | una decisión de diseño que el operador **no ha tomado**: al borrar una fase u objetivo con hijos, ¿rechazar o cascada? |
| **52** | madurez de `cantu-studio` y uso operativo acumulado de la consola |

**Sólo `#45` y `#50` están libres de aristas y de prosa a la vez.**
(Los dos no elegibles, `#47` y `#49`, llevan además su propia aprobación explícita.)

---

## 7. ⚠ EL VEREDICTO DE LA AUDITORÍA — la cola NO está lista para el piloto

**Auditoría cerrada hoy sobre los 52 runs:
`records/AUDITORIA-ROADMAP-AIW-CONSOLE.md`.** Nada se reparó en ella; sólo midió.

> **La cola NO está lista tal cual. Debe entrar UNA reparación antes del piloto: el
> texto del `#51`.**

**Por qué esa y no otra.** El `full_description` del `#51` declara pendientes cuatro
operaciones —`createPhase`, `deletePhase`, `createObjective`, `deleteObjective`— que
**el motor ya exporta desde el commit `2e02a8b`**, entregado por el `#23`, **28
posiciones antes**. También declara pendiente un cambio de la guarda de identidad que
ya está hecho. **Lo único que falta de verdad es su capa de consola** (0 ocurrencias
de las cuatro operaciones en `project-console/assets/project-console.js`).

**Clasificar el `#51` con ese texto es clasificar un run que no existe.** Y como el
entregable del piloto es **un procedimiento que viaja a los otros dos hilos**, ese
error no se queda en el `#51`: contamina el veredicto sobre si el procedimiento
funciona.

Las demás inexactitudes medidas **no bloquean**: no cambian qué trabajo describe
ningún run.

### 7.1 Las tres reparaciones SIN DUEÑO

**El `#50` es el run que repara textos falsos — y se excluye a sí mismo de tocar
`full_description` de runs.** Con lo cual estas tres no las repara nadie en la cola:

1. **El texto del `#51`** — la que bloquea el piloto.
2. **El `full_description` del `#48`** — dice «73 runs» del canónico de `cantu-studio`.
3. **El `full_description` del `#49`** — la misma cifra, «73 runs».

**⚠ AVISO SOBRE (2) y (3), y cambia cómo se reparan.** Esa cifra **la invalidó el
otro hilo hoy**: el canónico de `cantu-studio` pasó de **74 a 63 runs** en el commit
`f428485` **de aquel repo**. Y **seguirá moviéndose** mientras aquel hilo trabaje su
cola. **Reparar contra un número concreto es reparar algo que caduca solo.** La
alternativa —dejar de fijar un conteo ajeno— es decisión del operador.

O se amplía el alcance del `#50`, o se abre dueño. Este relevo no lo decide.

---

## 8. La coordinación de los tres hilos

**La regla vigente, verbatim:**

```text
Cada hilo audita y estabiliza su roadmap.
Nadie clasifica hasta que el piloto de aiw-console entregue el procedimiento.
El piloto corre cuando los tres roadmaps estén estables.
```

**Estado de cada uno al cerrar:**

| hilo | estado |
|---|---|
| `aiw` | **auditoría hecha**, estabilizando su cola |
| `cantu-studio` | **reestructurando su carril de documentación** (el que movió 74 → 63 runs hoy) |
| `aiw-console` | **auditado** — este relevo |

**Ninguno de los tres ha escrito un solo campo de clasificación.** En este repo,
medido: **0 de 52 runs clasificados.**

### 8.1 El censo de mixtos, y su consecuencia para el piloto

| cola | mixtos | total vivos |
|---|---:|---:|
| `aiw-console` | **7** | 9 |
| `aiw` | **7** | 17 |

**Aquí, tres mezclas se repiten** (verificar+reparar; hacer+juzgar por escrito;
código+decisión pendiente). **Y la mezcla que importa NO aparece: «código + acto
sobre un documento normativo».** Medido: **0 de los 9 vivos** nombra un documento
normativo como destino de escritura.

**En `aiw` esa mezcla SÍ es una de las repetidas**, en sus runs `#34` y `#37`.

> **CONSECUENCIA: el piloto no puede probar esa regla en esta cola, y debe
> DECLARARLO POR ESCRITO en su veredicto** — no descubrirlo el segundo hilo. **Las
> tres reglas de runs mixtos se cierran con los casos de `aiw` delante, no antes.**

### 8.2 Tres huecos que `D-059` dejó declarados y que el piloto hereda

1. **No existe procedimiento escrito de clasificación** más allá del vocabulario.
2. **Las tres reglas mecánicas para runs mixtos no existen** — siguen siendo el hueco
   de `CLASIFICACION-DE-RUNS.md §7`. Ningún encargo del `#43` las tocó. **No se
   reconstruyen por coherencia.**
3. **Cómo se DECLARA la calibración de un `completed` no está resuelto** en ninguna
   parte.

---

## 9. Los derivados — AL DÍA, nada que re-emitir al abrir sesión

Comparado **tupla a tupla** (`run_id`, `phase_id`, `status`, `queue_order`) contra el
canónico: **`.project/roadmap.json` coincide en los 52 runs — 0 diferencias.**

`.project/snapshot.json`: `generated_at` **`2026-08-01T03:54:01.232Z`** (UTC),
`generated_from` **`aiw-projector@0.12.0`**.

**El sobre ya trae `taxonomy_model` con sus seis bloques**: `model`, `vocabularies`,
`derivations`, `illegal_combinations`, `care_budget`, `specified_by`. El
`care_budget` viaja **dentro** de `taxonomy_model` (razón en `D-059`, adjudicación 6)
y declara `binding: "advice"`.

Este snapshot **no trae `unprojected_inputs` ni `unprojected_inputs_reason`** —
correcto: la raíz de este repo no tiene carpeta `objectives/`.

---

## 10. En cola y SIN run — dos cosas que nadie está haciendo

### 10.1 El estándar de documentación

Decidido en el hilo de `cantu-studio` y **aprobado por el operador**. Pendiente de
aterrizar **en ESTE repo** como `context/ESTANDAR-DE-DOCUMENTACION.md` —junto a
`DECISIONES.md`, por el precedente de `CLASIFICACION-DE-RUNS.md`— **más su entrada de
decisión**. Hoy ese archivo **no existe**.

Entra **con cuatro correcciones que el operador aceptó**, y la que importa es esta:

> Su **§5** nombra `tools/project-console/validate-project-console-state.mjs` como
> sede de las aserciones. **En ESTE repo esa ruta está en un árbol muerto.**
> **Sustitución acordada: «el validador que cada proyecto declare»**, por el patrón
> de `D-049`.

Su medición está commiteada en
`records/CIERRE-HUECOS-ESTANDAR-DOC-IDIOMA-Y-ASERCIONES-CANTU.md`.

**No bloquea a nadie. El piloto sí bloquea.** Ese es el orden.

### 10.2 `specified_by` ausente en el `taxonomy_model` de `aiw`

Lo detectó aquel hilo; **el emisor es de este repo y la medición es nuestra**.

**HIPÓTESIS `[NO MEDIDA]`:** el puntero exige una ruta **interna al proyecto**, y el
documento normativo vive en `aiw-console`. Si es así, **dos de los tres proyectos no
podrán emitirlo nunca**.

**Si se confirma, es estructural y la decisión es transversal** — no un arreglo de
`aiw`.

---

## 11. Seis hallazgos para la sesión de UI/UX — el `#47`

Medidos hoy operando la consola. **Van los seis juntos porque el `#47` es su dueño
único.**

| # | hallazgo |
|---:|---|
| 1 | El **contador de clasificación muestra `0` sin unidad**. Debería decir `0 de 6`. |
| 2 | Un run `active` muestra **«Current stage: Not started»**. Es correcto, pero **se lee como contradicción**. |
| 3 | La **lista de runs vivos sin clasificar viaja en `validation_summary`** y **no se encontró en pantalla**. |
| 4 | **El confirm del modal se dispara al cancelar.** (Viene del relevo anterior; sigue vivo.) |
| 5 | **Un run que deriva `CRITICAL` no muestra el consejo de `care_budget` en su detalle**, aunque el dato viaja en el mismo sobre. **El más valioso de los seis.** |
| 6 | **Las fases de un objetivo se leen desordenadas respecto al `queue_order`** (lo señaló el hilo `aiw` sobre su `O3`). El `phase_id` es **identidad opaca y NO se renumera** (`D-047`) — pero la consola **podría hacer evidente el orden real**. |

---

## 12. Cabos con dueño

1. **Defecto del modo 1 del proyector.** `taxonomy_model` declara un vocabulario
   cerrado de tres clasificaciones y `counts.total` da **16 contra 22 archivos en
   disco**. **MEDIDO en el `#42`: ningún consumidor vivo alcanza el modo 1** — su
   único llamador fuera de tests es el servidor del fork descartado. **Candidato a
   run, sin insertar.** Su sitio natural es el run que retire el fork, **que hoy NO
   existe en la cola.**
2. **Tres lecturas vivas de `cantu-studio` en `tests/roadmap-engine.test.mjs`**,
   incluido el test de fines de línea que hoy está **rojo** (§13.2).
   **⚠ EL DUEÑO NO RESUELVE.** El relevo se recibió con «dueño: el run de
   `.gitattributes`», y **ese run no existe en esta cola**: medido sobre los 52,
   **0 runs** mencionan `.gitattributes`, `autocrlf` o fines de línea en `title`,
   `summary` o `full_description`. **Gana el disco: el cabo está SIN DUEÑO.** El
   candidato natural sigue siendo el `#48`, que es quien toca el canónico de Cantu
   —pero su texto no lo dice, y adjudicárselo sería inventarlo. Riesgo declarado:
   estas lecturas pueden ponerse más rojas si Cantu se mueve.
3. **Un sexto texto falso que el `#50` NO cubre.** `project-console/serve.mjs:760`
   lleva el mismo paréntesis caducado que el README («today: the `aiw` kernel»), y
   `aiw` sí tiene layout. **Reparar los cinco del `#50` dejaría este vivo. Sin
   dueño.**
4. **El fixture de docs del layout fuente de Cantu está reducido**: ningún test
   ejercita ya ese layout a escala real. **Residual declarado, sin dueño.**
5. **La coordenada `RM-AIW:148` del `#45` está rota**, y lo declara el propio archivo
   destino: su cabecera antepone 20 líneas, sobre un desfase previo de +8. No cambia
   qué hace el `#45`. **No bloquea.**

---

## 13. Lecciones de operación — heredarlas, no re-aprenderlas

### 13.1 Reiniciar el PROCESO de la consola, no recargar el navegador

**Tras un encargo que toque el emisor o las operaciones, hay que REINICIAR el proceso
de la consola antes de la QA.** Node cachea los módulos al arrancar: recargar el
navegador no vuelve a leer el disco. **Costó una vuelta entera de QA.**

### 13.2 `git checkout` NO es la forma de deshacer una prueba

**`git checkout` para revertir el canónico lo reescribe a CRLF**, con `core.autocrlf`
activo y sin `.gitattributes`. Eso puso rojo `tests/roadmap-engine.test.mjs:92` —el
test que exige que los dos canónicos reales **no** compartan convención de fin de
línea—, **y sigue rojo**. **Su dueño está sin resolver: ver §12.2.**

**Para deshacer una prueba, usar la consola, no `git checkout`.**

### 13.3 En este repo escriben TRES hilos

**El `git add` va con los nombres escritos UNO A UNO.** Pasar la lista entera del
`git status` a `git add` es **`-A` disfrazado**: cumple la letra de la regla y no su
propósito. El árbol puede traer, y trajo, trabajo ajeno a mitad de sesión.

### 13.4 La lista de QA se escribe EN LA RESPUESTA

**Toda petición de QA lleva la lista de qué revisar escrita en la respuesta de
cabina.** Mandar al operador a leer un record que la cabina no puede leer (§2) es
trasladarle un problema propio.

---

## 14. Qué se puede mirar HOY

La consola global, desde la raíz de `projects/aiw-console`:

```bash
node project-console/serve.mjs
```

o el lanzador `start-console.cmd` / `start-console.ps1` (ver
`start-console.README.md`).

**Recordatorio de §13.1: si el encargo anterior tocó el emisor o las operaciones,
matar el proceso y volver a levantarlo. Recargar no basta.**

Lo que hay nuevo que mirar: el panel de `care_budget` en la pestaña **Roadmap**, y la
vista mínima de clasificación. Los seis hallazgos de §11 salieron de ahí.

---

## 15. Este encargo no cambió nada observable

Fue un encargo de taller **sin run**. **Su único byte escrito es este archivo.** Ni
el roadmap, ni `.project/`, ni el código, ni un record, ni `DECISIONES.md`, ni
`CLASIFICACION-DE-RUNS.md`, ni un solo byte de `aiw` o de `cantu-studio`.
