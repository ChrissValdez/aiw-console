# HANDOFF — hilo `aiw-console` (la consola)

> **Efímero y se SOBRESCRIBE.** Es el relevo del hilo: se reescribe entero al cerrar
> cada sesión y se consume al abrir la siguiente. No es un record, no acumula
> historia, no se le añaden secciones. Lleva **solo** lo necesario para arrancar.
> **APUNTA, no RECUENTA.**
>
> **Este handoff NO lleva doctrina.** La doctrina vive en
> `context/CLASIFICACION-DE-RUNS.md` y en `context/DECISIONES.md`. Si alguna vez se
> copia aquí una regla, deja de ser regla y se vuelve estado que se pudre.
>
> **TODO `#N` DE ESTE DOCUMENTO ES UNA COORDENADA FECHADA** (2026-08-01, 03:32). El
> `queue_order` se renumera cuando se inserta un run, y **esta sesión insertó tres**:
> el `#45` de ayer es el `#48` de hoy, y el `#52` de ayer es el `#55`. **La próxima
> sesión no lee estos números como los suyos: los re-mide sobre
> `roadmap/roadmap.json`.** Los `run_id` sí son estables (`D-047`, identidad opaca) —
> cuando haya duda, manda el `run_id`. Los `phase_id` también: **no se renumeran**.

---

## 1. Cómo arrancar — cinco lecturas, en este orden

1. `roadmap/roadmap.json` — el plan y el estado. **El estado real se mide aquí, no se
   recuerda ni se hereda de este archivo.**
2. `context/CLASIFICACION-DE-RUNS.md` — la especificación canónica de clasificación de
   runs, normativa y transversal a los tres proyectos. Su **`§7` sigue siendo un hueco
   declarado**: las tres reglas mecánicas para runs mixtos (ver §8.2).
3. `context/DECISIONES.md` — el suelo doctrinal. **`D-059` es la última entrada** y es
   la del cierre del `#43`. Medido hoy: **161 112 bytes, 59 entradas numeradas
   `D-001`..`D-059` sin huecos** (60 encabezados: uno es `D-010-enmienda`, que no
   consume número).
4. `context/aiw-console/CONTRATO.md` — `§7` (rutas: contención documental, no
   enforced), `§11`–`§12` (status de fase y objetivo **derivado al leer**, no
   almacenado), **`§15`** (la forma interna de `progress` NO está congelada — es
   exactamente lo que el `#46` viene a cambiar).
5. `context/handoffs/aiw.md` y `context/handoffs/cantu-studio.md` — los dos hilos
   paralelos. **Léelos antes de tocar cualquier run que escriba en `cantu-studio`.**

**Las fuentes principales de ESTE relevo son dos records:**
`context/aiw-console/records/REESTRUCTURACION-OBJETIVOS-Y-FASES.md` (lo último que
pasó) y `context/aiw-console/records/AUDITORIA-ROADMAP-AIW-CONSOLE.md` (el veredicto
de la auditoría). Son punteros, **no accesos** — leer §2 antes de planificar sobre
ellos.

---

## 2. ⚠ AVISO DE TOPOLOGÍA — leer antes de planificar una sola lectura

**El sync del Project se RECORTÓ. `aiw-console` YA NO se sincroniza completo, aunque
la configuración del Project siga diciendo que sí.**

**NO están en el knowledge, y pedir sync NO los traerá — es topología, no retraso de
indexado:**

- `context/aiw-console/records/` — **todos** los records (medidos hoy: **96 archivos**)
- `project-console/` · `docs/project-console/` · `console/`
- `tests/` · `tools/` · `.project/`

**SÍ están:**

- `roadmap/roadmap.json`
- `context/README.md` · `context/DECISIONES.md` · `context/handoffs/`
- `context/aiw-console/CONTRATO.md`
- `context/CLASIFICACION-DE-RUNS.md`
- `context/aiw/` · `context/cantu-studio/`
- el `.project/roadmap.json` de `cantu-studio`

**CONSECUENCIA OPERATIVA: cuando este handoff apunte a un record, la cabina NO puede
leerlo.** Los punteros siguen siendo correctos como dirección, pero no como acceso.
Las dos vías son: **un encargo de taller** (el taller sí lee el disco entero) **o que
el operador lo pegue.** No se planifica sobre el contenido de un record que nadie ha
leído.

**⚠ EL AVISO SE REFUERZA, y no es teórico.** La sesión anterior perdió tiempo por
incumplirlo: la cabina citó un bloque de un record dando por hecho que lo tenía
delante, y no lo tenía. **Un record no se cita: se pide.** Su corolario está en §12.4
— mandar al operador a leer un record que la cabina no puede leer es trasladarle un
problema propio.

---

## 3. Estado medido hoy — 2026-08-01, 03:32

**HEAD: `3ab8628`. Salvedad, y es literal: es el último HEAD que esta cabina conoce al
cerrar, no necesariamente el HEAD del repo cuando se lea.** En `aiw-console` escriben
tres hilos y el HEAD avanza sin que este hilo lo vea — **ocurrió varias veces en esta
sesión**. La próxima sesión mide el HEAD real; no lo hereda de aquí.

**Árbol comprobado SIN git** (barrido de artefactos de escritura interrumpida +
ventana de modificaciones recientes): **cero `.tmp`, cero `.orig`, cero `.rej`**; un
solo `.bak` —`projects.config.json.bak`, del **2026-07-11**— que es viejo, no es
trabajo a medias y **no se tocó**. Lo modificado en las últimas seis horas es trabajo
**cerrado**: los records de esta sesión, los de un hilo de `cantu-studio`, el canónico
y la re-emisión de `.project/`. **No se encontró trabajo a medias de otro hilo.**
**Ningún run está `active`.**

### 3.1 El canónico

Medido sobre `roadmap/roadmap.json` (`schema_version: "roadmap_tree_v1"`):

- **55 runs** — **43 `completed`, 12 `planned`, 0 `active`.**
- **2 objetivos, 23 fases.** `O0` «Project Console»: 3 fases, 10 runs, **0 vivos**.
  `O4` «Global Console»: 20 fases, 45 runs, **los 12 vivos**.
- **29 aristas `depends_on`, 0 colgantes.** De las 29, **9 tocan un run vivo** (§6);
  las otras 20 unen runs ya `completed` y no gobiernan nada.
- `queue_order` **1..55, denso, único y contiguo** — 0 duplicados, 0 huecos.
- **36 runs con `closeout_result`.** Los 19 sin él: los 12 `planned` y **7
  `completed`** (§4.3).
- **0 runs con `lane`, 0 con `barrier`.** Un solo carril: la cola es serial y el
  `queue_order` es la historia completa de la ejecución. El vocabulario existe en el
  esquema (`D-051`) y este proyecto no lo usa.
- **`care_budget` de raíz declarado**: `MINOR` Opus/Alto, `MODERATE` Opus/Extra,
  `MAJOR` Opus/Max, `CRITICAL` Fable/Max. Es **consejo, no regla**: no bloquea nada.
- **0 runs clasificados.** Medido campo a campo sobre los 55: `work_kind`,
  `failure_surface`, `reversibility`, `uncertainty`, `external_effects` y
  `classified_at` aparecen **0 veces cada uno**.

**Línea base:** **131 567 bytes**, md5 **`214342647f3b03c62573508c1d431fb4`**, CRLF.

### 3.2 Los derivados — AL DÍA, y esto CORRIGE al record

`.project/` fue **re-emitido después** de que se cerrara
`REESTRUCTURACION-OBJETIVOS-Y-FASES.md`. **Aquel record dice que la proyección quedó
deliberadamente desfasada en 52 runs; el disco dice otra cosa y GANA EL DISCO.**

Comparado **tupla a tupla** (`run_id`, `phase_id`, `status`, `queue_order`, `title`):
**`.project/roadmap.json` trae 55 runs y coincide con el canónico — 0 diferencias.**

`.project/snapshot.json`: `generated_at` **`2026-08-01T09:27:23.120Z`** (UTC),
`generated_from` **`aiw-projector@0.12.0`**. El sobre trae `taxonomy_model` con sus
**seis bloques** —`model`, `vocabularies`, `derivations`, `illegal_combinations`,
`care_budget`, `specified_by`—, y **no trae `unprojected_inputs`**, que es correcto:
la raíz de este repo no tiene carpeta `objectives/`.

**Nada que re-emitir al abrir sesión.**

### 3.3 La suite

**442 tests, 440 pasan, 2 fallan.** `[NO RE-MEDIDO EN ESTE ENCARGO]` — es la cifra que
el encargo de reestructuración midió hoy (`REESTRUCTURACION…§H.1`). Los dos rojos, su
causa común y su falta de dueño están en §11.3.

---

## 4. Qué pasó en esta sesión

### 4.1 LA ESTRUCTURA CAMBIÓ — cuatro fases nuevas por naturaleza del trabajo

Es lo más importante que la próxima sesión no puede saber leyendo cifras. **El
roadmap ya no se organiza por etapas de un plan de migración, sino por naturaleza del
trabajo.**

**`O0` «Project Console» queda como HISTORIA.** Conserva sus **10 runs, los 10
`completed`, y no aloja ni un run vivo.** No se borró, no se archivó, no se renombró.
Sus tres fases (`O0.P1`, `O0.P2`, `O0.P3`) están intactas.

**Todo lo vivo cuelga de `O4` «Global Console», en cuatro fases nuevas.** Títulos
verbatim y su reparto medido hoy:

| `phase_id` | título verbatim | qué aloja |
|---|---|---|
| `O4.P16` | **The cutover to a single console** | `#49` paridad · `#50` UI/UX (la compuerta) · `#51` sacar el canónico de Cantu · `#52` el corte |
| `O4.P17` | **The console as a product** | `#54` las cuatro operaciones de contenedor en el frontend · `#55` auditoría visual |
| `O4.P18` | **Cockpit: classification, digest, and the truth of the texts** | `#44` el piloto · `#48` el dígest · `#53` los textos falsos |
| `O4.P19` | **Roadmap schema for the kernel** | `#45` · `#46` · `#47` — los tres runs nuevos (§4.2) |

**Las fases viejas de etapa quedaron VACÍAS y son legales:** `O4.P5` «Stage 5 —
Global console renders Cantu», `O4.P7` «Stage 7 — Cutover…» y `O4.P8` «Stage 8 —
UI/UX» tienen **0 runs** cada una. El modelo v3 no impone mínimo de runs por fase, ni
`checkInvariants` ni el validador del server lo exigen. **Borrarlas no se hizo y no
está decidido.**

Todo el acto pasó por el motor (`planEdit` → `applyPlan`), 18 escrituras, las 18 con
cero errores y cero warnings, ningún rollback. **Nada se hand-editeó.**

### 4.2 ENTRARON TRES RUNS, pedidos por el hilo `aiw`

Tras su propia auditoría humana. Van **encadenados detrás del piloto**, en
`O4.P19`:

| `#N` | `run_id` | título verbatim |
|---:|---|---|
| **45** | `RUN-CONSOLE-DEPENDS-ON-HUMAN-APPROVED-001` | «A second dependency list for edges that wait on a person» |
| **46** | `RUN-CONSOLE-PROGRESS-NORMATIVE-001` | «Freeze the shape of progress so human approval becomes machine-readable» |
| **47** | `RUN-CONSOLE-BATCHES-001` | «Batches in the roadmap schema, with the branch they determine» |

**La razón, medida en `aiw` y no supuesta:** su kernel trata **sus veinte aristas como
iguales** y no puede distinguir una que espera a una persona de una que no. Medido hoy
sobre `aiw/roadmap/roadmap.json`: **42 runs, 20 aristas `depends_on`.**

**⚠ LOS TRES DECLARAN POR ESCRITO LA MITAD QUE NO CONSTRUYEN**, y esto es lo que hay
que heredar sin diluir. Aquí se construyen el campo, sus invariantes, su transporte y
su render. **Hacer que el kernel OBEDEZCA es trabajo de `aiw` y solo de `aiw`.** El
aviso no es hipotético: va contra el **precedente medido de los carriles** —diseñados
aquí, entrados en el esquema, validados por el motor, pintados por la consola, seis
runs de `aiw` los declaran con dos barreras— **y obedecidos por ningún ejecutor**. La
aceptación de cada uno de los tres debe declarar por escrito qué mitad es del kernel,
para no entregar un segundo campo que nadie obedece.

El `#47` es **el más caro de los tres y el único que no es puramente aditivo**.

### 4.3 El `#43` cerró, y su `closeout_result` quedó VACÍO

`RUN-CONSOLE-RUN-CLASSIFICATION-FIELDS-001` —«The five classification fields enter the
roadmap schema, with derivation at read time and a minimal view»— pasó a `completed`.
Se ejecutó en **tres encargos de taller**: motor (`records/CLASIFICACION-MOTOR.md`),
emisor-consola-`set-classification`
(`records/CLASIFICACION-EMISOR-Y-CONSOLA.md`) y `care_budget`
(`records/CLASIFICACION-CARE-BUDGET.md`).

**El proyector queda en `0.12.0`.** **Las seis adjudicaciones que la especificación no
fijaba están en `D-059`, con su cita medida en disco cada una. NO se resumen aquí: se
leen allí.** Esa entrada es transversal — lo implementado viaja a los tres proyectos
dentro de `taxonomy_model`.

**Su `closeout_result` quedó VACÍO.** El `status` entró; el campo **está ausente**. Y
**no es un caso aislado: 7 de los 43 terminales están igual** — `#4`, `#9`, `#39`,
`#40`, `#41`, `#42` y `#43`. Los otros 36 sí lo llevan (33 `completed_successfully`,
más `delivered_by_aiw_roadmap_O2`, `superseded_by_D-037_D-038` y
`discarded_by_D-048`).

**No rompe elegibilidad:** el contrato acopla `closeout_result ⇒ completed`, no la
recíproca. El `#43` está `completed` y por eso el `#44` es elegible. **Pero sí rompe
la pantalla** — ver §11.4, hallazgo 7. El `#46` lo recoge como su segundo defecto.

### 4.4 El `#55` se REENCUADRÓ, y no se confunde con el `#50`

`RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001` pasó de «Deep Project Console audit» a
**«Deep visual audit of the console, led by the operator»**. Ya no espera a que Cantu
madure: el operador declara que el momento llegó.

**Queda EL ÚLTIMO A PROPÓSITO, y la razón se hereda literal: abre trabajo en vez de
cerrarlo.** Cada hallazgo se convierte en su propio run. Es una decisión de
calendario, no un juicio sobre su valor.

> **⚠ NO CONFUNDIRLO CON EL `#50`, y confundirlos es caro.** El `#50`
> `RUN-CONSOLE-UI-UX-001` es **la COMPUERTA del corte**: pregunta **solo si algo es
> PEOR que la consola local de hoy** — un alcance estrecho **a propósito**, porque
> guarda un acto irreversible. **Las mejoras deseables NO se vierten ahí.** El `#55`
> pregunta lo contrario: qué podría ser MEJOR.

---

## 5. La cola viva completa — los doce `planned`

Títulos **verbatim de disco, en inglés**: es lo que el operador ve en pantalla. Orden =
`queue_order`. Objetivo y fase **por su título**.

> **LA CABEZA DE LA COLA ES EL `#44` — `RUN-CONSOLE-CLASSIFICATION-PILOT-001`,
> «Classify aiw-console's live runs as the pilot, and rule on the procedure itself».
> Su única arista apunta al `#43`, `completed`: SUS DEPENDENCIAS ESTÁN SATISFECHAS.**

| `#` | título verbatim | objetivo · fase | ¿elegible por aristas? |
|---:|---|---|---|
| **44** | Classify aiw-console's live runs as the pilot, and rule on the procedure itself | Global Console · *Cockpit: classification, digest, and the truth of the texts* | **SÍ** — su única arista → `#43`, `completed` |
| 45 | A second dependency list for edges that wait on a person | Global Console · *Roadmap schema for the kernel* | **SÍ** — sin aristas |
| 46 | Freeze the shape of progress so human approval becomes machine-readable | Global Console · *Roadmap schema for the kernel* | **NO** — 1 insatisfecha: `#45` |
| 47 | Batches in the roadmap schema, with the branch they determine | Global Console · *Roadmap schema for the kernel* | **NO** — 2 insatisfechas: `#45`, `#46` |
| 48 | Digest for the cockpit | Global Console · *Cockpit: classification, digest, and the truth of the texts* | **SÍ** — sin aristas |
| 49 | Global console renders Cantu (parity, operator QA) | Global Console · *The cutover to a single console* | **SÍ** — su única arista → `#41`, `completed` |
| 50 | UI/UX of the global console | Global Console · *The cutover to a single console* | **NO** — 1 insatisfecha: `#49` |
| 51 | Move cantu-studio's canonical roadmap out of .aiw before the cutover can delete it | Global Console · *The cutover to a single console* | **SÍ** — sin aristas |
| 52 | Cutover: retirement of Cantu's local console and deletion of .aiw | Global Console · *The cutover to a single console* | **NO** — 3 insatisfechas: `#49`, `#50`, `#51` |
| 53 | Repair the five texts that describe this repo falsely | Global Console · *Cockpit: classification, digest, and the truth of the texts* | **SÍ** — sin aristas |
| 54 | Expose the four container operations in the console frontend | Global Console · *The console as a product* | **SÍ** — sin aristas |
| 55 | Deep visual audit of the console, led by the operator | Global Console · *The console as a product* | **SÍ** — sin aristas |

**8 de 12 son elegibles por aristas. 4 no lo son.**

Que `O4.P17` aloje los dos últimos y `O4.P19` ocupe 45-47 mientras `O4.P18` ocupa 44,
48 y 53 **es correcto**: el orden lo da el `queue_order`, siempre y solo; el `phase_id`
es identidad opaca (`D-047`) y no implica posición.

**Dos de los doce escriben en `cantu-studio`** — el `#51` y el `#52`. La ventana se
coordina con aquel hilo y no corren con un taller vivo allí.

---

## 6. Las nueve aristas vivas

De las **29** del archivo, **nueve** tocan un run `planned`. Las 20 restantes unen runs
ya `completed` y **no se transcriben.**

| Origen | → | Destino |
|---|---|---|
| The five classification fields enter the roadmap schema… *(`#43`, `completed`)* | → | Classify aiw-console's live runs as the pilot… *(`#44`)* |
| **A second dependency list for edges that wait on a person** *(`#45`)* | → | **Freeze the shape of progress…** *(`#46`)* |
| **A second dependency list for edges that wait on a person** *(`#45`)* | → | **Batches in the roadmap schema…** *(`#47`)* |
| **Freeze the shape of progress…** *(`#46`)* | → | **Batches in the roadmap schema…** *(`#47`)* |
| Fix four defects in the global console renderer… *(`#41`, `completed`)* | → | Global console renders Cantu (parity, operator QA) *(`#49`)* |
| Global console renders Cantu (parity, operator QA) *(`#49`)* | → | UI/UX of the global console *(`#50`)* |
| Global console renders Cantu (parity, operator QA) *(`#49`)* | → | Cutover: retirement of Cantu's local console… *(`#52`)* |
| UI/UX of the global console *(`#50`)* | → | Cutover: retirement of Cantu's local console… *(`#52`)* |
| Move cantu-studio's canonical roadmap out of .aiw… *(`#51`)* | → | Cutover: retirement of Cantu's local console… *(`#52`)* |

**Las tres en negrita son NUEVAS**, y son las de los runs de esquema. Respetan la
precedencia estricta que el motor exige (`45 < 46 < 47`).

Las tres que entran al corte son **aprobación explícita del operador**, no comprobación
automática. El corte es irreversible y no procede sin las tres.

### ⚠ ELEGIBLE NO ES ARRANCABLE

**La auditoría midió 5 runs con un bloqueo declarado EN PROSA que ninguna arista
expresa** — y no puede expresarla, porque lo que los bloquea no es un run de este
roadmap. **Son invisibles a cualquier motor que lea sólo `depends_on`.** Censo del
2026-07-31 re-anclado a los `#N` de hoy; **los tres runs nuevos no entraron en él y
nadie los ha revisado con este criterio.**

| `#N` | qué lo bloquea de verdad |
|---:|---|
| **44** | presencia del operador en la cabina: la corrección es juicio suyo aportado como ENTRADA, no aceptado al final |
| **49** | la paridad la **DECLARA** el operador; no se deriva de ningún test |
| **51** | ventana coordinada con el hilo de `cantu-studio`; no corre con un taller vivo allí |
| **55** | no es de grafo y su texto lo dice: «what decides when it runs is the operator, not an edge» |
| ~~**54**~~ | **CADUCÓ hoy.** Su bloqueo era «una decisión de diseño que el operador no ha tomado: al borrar un contenedor con hijos, ¿rechazar o cascada?». El texto reescrito mide que **ya está decidida en código: RECHAZA** (§7) |

**Quedan 4 de pie.** Y sigue valiendo el enunciado: **elegible no es arrancable**, y un
motor que lea sólo `depends_on` lo dirá mal.

---

## 7. ⚠ EL VEREDICTO DE LA AUDITORÍA — SATISFECHO, medido hoy

La auditoría del 2026-07-31 (`records/AUDITORIA-ROADMAP-AIW-CONSOLE.md`) cerró con un
veredicto: **«La cola NO está lista tal cual. Debe entrar UNA reparación antes del
piloto: el texto del `#51`»** (el que hoy es el **`#54`**).

**ESA REPARACIÓN ESTÁ HECHA.** Medido en disco hoy, y **ni la auditoría ni el record de
reestructuración documentan esa escritura** —la auditoría declara que no reparó nada, y
la reestructuración solo declara `set-text` sobre el `#55`—: **gana el disco y se
declara.**

- El `#54` se llama hoy **«Expose the four container operations in the console
  frontend»**, y su `full_description` abre con «REWRITTEN ON 2026-07-31 BY THE ROADMAP
  AUDIT, WHICH MEASURED THAT THIS RUN'S ORIGINAL TEXT DESCRIBED WORK ALREADY DONE».
  Declara el alcance real: **falta solo la capa de consola**, y deja escritas las tres
  restricciones que la superficie debe respetar.
- **La `R2` también está hecha**: el `#51` y el `#52` ya **no fijan «73 runs»** del
  canónico de `cantu-studio`. Los dos dicen ahora que el conteo «is measured when this
  run executes». Es exactamente la alternativa que la auditoría proponía: **dejar de
  fijar un conteo ajeno, que caduca solo.**
- La `R5` quedó **sin objeto**: el `#55` se reescribió entero.

**Lo que NO se reparó, y sigue sin dueño:**

| | qué dice | qué mide el disco |
|---|---|---|
| **`R3`** | el `#53` afirma «This roadmap has **51 runs**» | **55 runs.** Desviaba 1 cuando se midió; hoy desvía **4** |
| **`R4`** | el `#48` cita `RM-AIW:148` | el archivo destino declara una cabecera que antepone 20 líneas, sobre un desfase previo de +8: la coordenada está rota y el propio destino lo dice |

**Ninguna de las dos bloquea el piloto** — no cambian qué trabajo describe ningún run.
Y **el `#53` se excluye a sí mismo de repararlas**: su texto declara «it does not touch
any run's `full_description`». O se amplía su alcance, o se abre dueño. **Este relevo
no lo decide.**

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
| `aiw` | **DECLARADO ESTABLE**, en su commit **`1582645`**, **con cero campos de clasificación escritos**, esperando el veredicto del piloto. Medido hoy sobre su canónico: **42 runs (25 `completed`, 17 `planned`), 20 aristas, 6 runs con `lane`, 0 campos de clasificación.** |
| `cantu-studio` | **cerró sesión** tras reestructurar su carril de documentación. Su canónico pasó de **74 a 63 runs** — medido hoy en `.aiw/roadmap/roadmap.json`: **63 runs (17 `completed`, 46 `planned`)**. **NO HA DECLARADO ESTABLE.** |
| `aiw-console` | **auditado, reparado y reestructurado** — este relevo. |

**La compuerta que falta es `cantu-studio`.** Los otros dos están donde la regla los
quiere.

### 8.1 El censo de mixtos, y su consecuencia — el piloto DEBE recogerla

| cola | mixtos | vivos | alcance de la medición |
|---|---:|---:|---|
| `aiw-console` | **7** | **9** | los 9 vivos del **2026-07-31**. **Los tres runs nuevos NO están en el censo** y nadie los ha clasificado como mixtos o no |
| `aiw` | **7** | **17** | medición de aquel hilo, citada sin recalcular |

**Aquí, tres mezclas se repiten** (verificar+reparar; hacer+juzgar por escrito;
código+decisión pendiente). **Y la mezcla que importa NO aparece: «código + acto sobre
un documento normativo».** Medido: **0 de los 9 vivos** nombraba un documento normativo
como destino de escritura.

**En `aiw` esa mezcla SÍ es una de las repetidas.**

> **CONSECUENCIA: el piloto NO PUEDE probar esa regla en esta cola, y debe DECLARARLO
> POR ESCRITO en su veredicto** — no descubrirlo el segundo hilo. **Las tres reglas de
> runs mixtos se cierran con los casos de `aiw` delante, no antes.**

### 8.2 Tres huecos que `D-059` declara y que el piloto hereda

1. **No existe procedimiento escrito de clasificación** más allá del vocabulario.
2. **Las tres reglas mecánicas para runs mixtos no existen** — siguen siendo el hueco
   de `CLASIFICACION-DE-RUNS.md §7`. Ningún encargo del `#43` las tocó. **No se
   reconstruyen por coherencia.**
3. **Cómo se DECLARA la calibración de un `completed` no está resuelto** en ninguna
   parte.

### 8.3 Lo que `aiw` midió y puede ser transversal

De sus **17 vivos, 9 no pueden ejecutar** porque su constitución les exige un incidente
documentado que no existe.

**Aquí el mecanismo no es el mismo, pero rima: 5 de los elegibles arrastran bloqueos
declarados solo en PROSA** (§6).

> **En los dos casos, lo que frena no está en el grafo.** Es el dato que el piloto
> debería mirar antes de dar por bueno cualquier procedimiento que se apoye en
> `depends_on`.

---

## 9. En cola y SIN run — dos cosas que nadie está haciendo

### 9.1 El estándar de documentación

Decidido en el hilo de `cantu-studio` y **aprobado por el operador**. Sigue **sin
aterrizar**: iría a `context/ESTANDAR-DE-DOCUMENTACION.md`, **junto a `DECISIONES.md`**,
por el precedente de `CLASIFICACION-DE-RUNS.md`, **más su entrada de decisión**.
**Medido hoy: ese archivo NO existe** — `context/` en su raíz solo trae
`CLASIFICACION-DE-RUNS.md`, `DECISIONES.md`, `MIGRATION-REPORT.md` y `README.md`.

Entra **con cuatro correcciones que el operador aceptó**, y la que importa es esta:

> Su **§5** nombra `tools/project-console/validate-project-console-state.mjs` como sede
> de las aserciones. **En ESTE repo esa ruta está en un árbol muerto.**
> **Sustitución acordada: «el validador que cada proyecto declare»**, por el patrón de
> `D-049`.

Su medición está commiteada en
`records/CIERRE-HUECOS-ESTANDAR-DOC-IDIOMA-Y-ASERCIONES-CANTU.md`.

**No bloquea a nadie. El piloto sí bloquea.** Ese es el orden.

### 9.2 `specified_by` ausente en el `taxonomy_model` de `aiw`

Lo detectó aquel hilo; **el emisor es de este repo, la medición es NUESTRA y sigue sin
hacerse.**

**Lo único medido hoy, y es un dato de contraste, no la medición:** en el sobre de
**este** proyecto `specified_by` **sí viaja** — los seis bloques de `taxonomy_model`
están en `.project/snapshot.json`.

**HIPÓTESIS `[NO MEDIDA]`:** el puntero exige una ruta **interna al proyecto**, y el
documento normativo vive en `aiw-console`. Si es así, **dos de los tres proyectos no
podrán emitirlo nunca.**

**Si se confirma, es estructural y la decisión es transversal** — no un arreglo de
`aiw`.

---

## 10. Dos tests rojos, sin dueño, con causa común

**Línea base real de la suite: 442 tests, 440 pasan, 2 fallan.** Los dos son
preexistentes y **ninguno se reparó**.

| test | qué afirma | por qué está rojo |
|---|---|---|
| `tests/classification-care-budget.test.mjs:153` | que el canónico de **este** repo **no declara** `care_budget` | **lo declara**, desde la QA del `#43`. `true !== false` |
| `tests/roadmap-engine.test.mjs:93` | que los dos canónicos reales **no** comparten convención de fin de línea | hoy comparten una. `1 !== 2` |

> **La causa es COMÚN y es la que importa: los dos afirman contra el estado vivo del
> disco en vez de contra fixtures.** Cualquier movimiento del canónico —propio o
> ajeno— los mueve. **El operador no ha decidido si abrirles run.**

---

## 11. Siete hallazgos de UI/UX ya medidos — para el `#55`

**Están MEDIDOS, no verificados en esta sesión. El `#55` debe VERIFICARLOS en vez de
darlos por buenos.** Los seis primeros están además escritos dentro del propio
`full_description` del `#55`; el séptimo, dentro del del `#46`.

| # | hallazgo |
|---:|---|
| 1 | El **contador de clasificación muestra `0` sin unidad**. Debería leerse «0 de N». |
| 2 | Un run `active` muestra **«Current stage: Not started»**. Correcto, pero **se lee como contradicción**. |
| 3 | La **lista de vivos sin clasificar viaja en `validation_summary`** y **no se encontró en pantalla**. |
| 4 | **El confirm del modal se dispara al cancelar.** |
| 5 | **Un run que deriva `CRITICAL` no muestra el consejo de `care_budget` en su detalle**, aunque la tabla viaja en el mismo sobre. **El más valioso de los seis.** |
| 6 | **Las fases se leen desordenadas contra el `queue_order`.** El `phase_id` es identidad opaca y **NO se renumera** (`D-047`) — pero la consola **podría hacer evidente el orden real**. |
| **7** | **MEDIDO HOY: un run cerrado a mano con `closeout_result` vacío se pinta como `blocked` en el historial.** **Vacío no es bloqueado, y un run bien cerrado que aparece como problema CORROMPE LA MEMORIA DEL SISTEMA.** Afecta a los 7 terminales de §4.3. Decisión ya tomada por el operador y recogida en el `#46`: `closeout_result` pasa a **obligatorio al cerrar**, la consola lo pide, y el historial deja de pintar ausencia como bloqueo. |

---

## 12. Lecciones de operación — heredarlas, no re-aprenderlas

### 12.1 Reiniciar el PROCESO de la consola, no recargar el navegador

**Tras un encargo que toque el emisor o las operaciones, hay que REINICIAR el proceso
de la consola antes de la QA.** Node cachea los módulos al arrancar: recargar el
navegador no vuelve a leer el disco. **Costó una vuelta entera de QA.**

### 12.2 `git checkout` NO es la forma de deshacer una prueba

**`git checkout` para revertir el canónico lo reescribe a CRLF**, con `core.autocrlf`
activo y sin `.gitattributes`. **Para deshacer una prueba, usar la consola.**

### 12.3 En este repo escriben TRES hilos

**El `git add` va con los nombres escritos UNO A UNO.** Pasar la lista entera del
`git status` a `git add` es **`-A` disfrazado**: cumple la letra de la regla y no su
propósito. El árbol puede traer, y trajo, trabajo ajeno a mitad de sesión.

### 12.4 La lista de QA se escribe EN LA RESPUESTA

**Toda petición de QA lleva la lista de qué revisar escrita en la respuesta de
cabina**, nunca un puntero a un record que la cabina no puede leer (§2).

### 12.5 ⚠ MEDIDO HOY Y CARO SI SE OLVIDA — las tres del motor

1. **`create-phase` e `insert` son ops de IDENTIDAD, y el motor las RECHAZA dentro de
   un `batch`.** Van **de una en una**.
2. **`insert --after` HEREDA LA FASE DEL ANCLA.** No acepta fase de destino
   (`targetPhase = entry.phase`), **y lo hace SIN ERROR NI WARNING**: el dry-run sale
   limpio. **Un dry-run limpio no garantiza la fase de destino de un `insert`.**
   Insertar en una fase distinta a la del ancla **exige un `move` correctivo después**.
   *(La alternativa `--end-of-phase` sobre una fase vacía manda el run al final global,
   y eso sí avisa.)*
3. **`move` SÍ acepta `toPhase`**, y combinado con `toOrder` **mueve de fase sin
   alterar la posición: la tabla de remap sale vacía. Medido nueve veces.** Es la
   herramienta correcta para reestructurar sin renumerar.

---

## 13. Qué se puede mirar HOY

La consola global, desde la raíz de `projects/aiw-console`:

```bash
node project-console/serve.mjs
```

o el lanzador `start-console.cmd` / `start-console.ps1` (ver
`start-console.README.md`).

**Recordatorio de §12.1: si el encargo anterior tocó el emisor o las operaciones, matar
el proceso y volver a levantarlo. Recargar no basta.**

**Lo nuevo que mirar es la estructura**: las cuatro fases nuevas de `O4`, las tres
viejas que quedaron vacías, y cómo la consola las ordena — que es el hallazgo 6 de §11.
`.project/` está al día (§3.2), así que lo que se ve es el canónico de 55 runs.

---

## 14. Este encargo no cambió nada observable

Fue un encargo de taller **sin run**. **Su único byte escrito es este archivo.** Ni el
roadmap, ni `.project/`, ni el código, ni los tests, ni un record, ni
`DECISIONES.md`, ni `CLASIFICACION-DE-RUNS.md`, ni un solo byte de `aiw` o de
`cantu-studio`. **No se ejecutó git en ninguna forma**, ni de lectura ni de escritura.
</content>
