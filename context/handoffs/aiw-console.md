# HANDOFF — hilo `aiw-console` (la consola)

> **Este archivo es EFÍMERO y se SOBRESCRIBE.** Es el relevo del hilo de la
> consola: se reescribe al cerrar cada sesión y se consume al abrir la siguiente.
> No es un record — no acumula historia, no se versiona por tramo. Lleva **solo**
> lo que la próxima sesión necesita para arrancar sin releerlo todo. Lo que
> seguirá siendo cierto dentro de un mes vive en el roadmap, el contrato o un
> record — no aquí.

> **Disciplina de este handoff: APUNTA, no RECUENTA.** Cada hallazgo va en una o
> dos líneas con el puntero a su record. Un relevo que reproduce sus fuentes deja
> de ser relevo y se vuelve una copia que deriva. Si da una cifra, la da con su
> cita, y lo medido de disco se distingue de lo citado de un record — **un record
> es una medición fechada, no el estado de hoy**.

> **Por qué esta reescritura, y es una CORRECCIÓN.** La versión anterior declaraba
> tres cosas que hoy son falsas, y las declaraba en LA FRONTERA, que es lo primero
> que se lee: (1) que a `aiw` le quedaban **cuatro runs** para cerrar su `O2` —
> medido hoy, `O2` está **10/10 `completed`** y ningún run de `aiw` está `active`;
> (2) que `roadmap/roadmap.json` de este repo era **ARCHIVO DISPUTADO** con el hilo
> de AIW — ya no lo es, aquel hilo terminó su tramo y no vuelve a este archivo;
> (3) que las diez citas `RM-AIW:` eran materia de otro hilo — **ahora son trabajo
> de éste**, y su desfase ya no es el `+8` que aquel texto medía sino **`+28`**,
> porque el `#20` de AIW antepuso una cabecera de retiro de 20 líneas al Markdown.
> Un hilo que arrancara con aquel texto esperaría a un hilo que ya cerró.

**Estado del hilo:** O4 — la consola global existe, enciende, renderiza tres
proyectos registrados y escribe. **Este hilo NO ejecutó ningún run en esta
sesión**: fue un encargo de taller sin run, y su único byte escrito es este
archivo. **Ningún run está `active` en ninguno de los dos objetivos.** Medido hoy
sobre `roadmap/roadmap.json`: **36 `completed`, 9 `planned`, 0 `active`**.
Última actualización: **2026-07-29**.

---

## ⚠ LA FRONTERA — leer antes de escribir un solo byte

**1. `aiw` tiene hilo propio y su `O2` CERRÓ.** Medido hoy en READ-ONLY sobre
`aiw/roadmap/roadmap.json`: **6 objetivos, 29 fases, 42 runs — 21 `completed`, 21
`planned`, 0 `active`**; **`O2` está 10/10 `completed`**, incluidos el `#20`
(`RUN-AIW-MARKDOWN-RETIREMENT-001`) y el `#21` (`RUN-AIW-THIRD-PROJECT-001`), que
en el relevo anterior figuraban pendientes. Lo `planned` que le queda es `O3`,
`O5`, `O6` y `O7` — nada de eso toca este repo. Su relevo vive en
`context/handoffs/aiw.md`.

**2. `aiw-console/roadmap/roadmap.json` YA NO es ARCHIVO DISPUTADO.** Cambio
explícito respecto del relevo anterior, que lo declaraba disputado mientras
durase el `O2` de AIW. Ese `O2` cerró; el `#21` que aterrizaba aquí está
`completed`. **Este hilo es hoy el único escritor del canónico de este repo.** La
regla de serie —dos encargos sobre el mismo archivo van en serie— sigue vigente
como regla; simplemente ya no hay segundo encargo.

**3. Sigue habiendo un hilo paralelo de `cantu-studio`** (relevo propio en
`context/handoffs/cantu-studio.md`) que escribe records en
`context/aiw-console/records/` pero **NO** el roadmap de este repo. Rige la
disciplina de carriles (`records/DISCIPLINA-UN-RUN-POR-CARRIL.md`): superficies de
escritura disjuntas.

**4. Este hilo NO escribe en `aiw` ni en `cantu-studio`.** Un hallazgo sobre
cualquiera de los dos se **NOMBRA** y se pasa a su hilo — sin ticket y sin
recomendación de arreglo.

---

## El plan y el estado viven en el roadmap — no aquí

    projects/aiw-console/roadmap/roadmap.json

Medido sobre ese archivo hoy: **2 objetivos, 19 fases, 45 runs**; `queue_order`
**1..45 denso, único y contiguo**; **19 aristas `depends_on`, 0 colgantes**;
**36 `completed`, 9 `planned`, 0 `active`**. El status de objetivo y de fase se
**deriva al leer**, no se almacena (`CONTRATO §11`/`§12`).

- **O0 «Project Console»** — 3 fases, **12 runs**: 9 `completed`, **3 `planned`**
  (`#10`, `#11`, `#12`).
- **O4 «Global Console»** — 16 fases, **33 runs**: 27 `completed`, **6 `planned`**
  (`#35`, `#36`, `#37`, `#38`, `#41`, `#42`).

Línea base viva, medida hoy sobre el archivo entero: **94 296 B**, md5
`f299d968fdf781bf31863d696bd9610e` — **idéntica a la del relevo anterior**: el
canónico no se ha movido desde entonces.

**Los derivados están al día y NO hay nada que re-emitir al abrir sesión.**
Comparados tupla a tupla (`run_id`, `phase_id`, `status`, `queue_order`) contra el
canónico, **`.project/roadmap.json` y `snapshot.roadmap_tree` son idénticos en los
45 runs, sin faltantes ni sobrantes**. `generated_at` de ambos:
**`2026-07-28T09:33:31.914Z`**.

## LO QUE QUEDA VIVO — los nueve `planned`

Títulos verbatim de disco: es lo único que el operador ve en pantalla.

| `#` | Fase | `run_id` | Título |
|---:|---|---|---|
| 10 | `O0.P3` | `RUN-CANTU-PROJECT-CONSOLE-LATENT-DEFECTS-001` | Fix three latent console defects found during editor QA |
| 11 | `O0.P3` | `RUN-CANTU-ROADMAP-PHASE-OBJECTIVE-OPS-001` | Add phase and objective create and delete operations |
| 12 | `O0.P3` | `RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001` | Deep Project Console audit |
| 35 | `O4.P5` | `RUN-CONSOLE-PARIDAD-RENDER-CANTU-001` | Global console renders Cantu (parity, operator QA) |
| 36 | `O4.P8` | `RUN-CONSOLE-UI-UX-001` | UI/UX of the global console |
| 37 | `O4.P6` | `RUN-CONSOLE-AIW-TERCER-PROYECTO-001` | AIW as a third project (roadmap Markdown → JSON v3) |
| 38 | `O4.P7` | `RUN-CONSOLE-CORTE-RETIRO-LOCAL-001` | Cutover: retirement of Cantu's local console and deletion of .aiw |
| 41 | `O4.P9` | `RUN-CONSOLE-CONTEXT-PACK-001` | Context pack of the console |
| 42 | `O4.P9` | `RUN-CONSOLE-DIGEST-CABINA-001` | Digest for the cockpit |

Los nueve títulos se leyeron verbatim del disco; ninguno quedó ilegible.

**El siguiente `planned` por `queue_order` es el `#10`** — pero `D-054` cerró el
triage en sentido contrario (ver «Qué NO está resuelto»).

## QUÉ CAMBIÓ DESDE EL RELEVO ANTERIOR — medido, no recontado

- **El `O2` de AIW cerró entero.** Los cuatro runs que aquel texto listaba como
  pendientes (`#18`..`#21`) están hoy `completed`. → punto 1 de LA FRONTERA.
- **El Markdown de AIW fue RETIRADO superseiendo, no borrando.**
  `context/aiw/roadmap_AIW_temp.md` existe, tiene **228 líneas** (antes 208) y
  abre con una cabecera de 20 líneas que declara «RETIRADO — este documento ya no
  es autoridad». Sigue en disco a propósito: su borrado espera a que se reparen
  las diez citas. → `records/RETIRO-MARKDOWN-AIW.md §5`.
- **El solapamiento de `O4.P6` se movió.** Las dos piezas que el relevo anterior
  daba por NO HECHAS —el retiro de `O4` del Markdown y la entrada de AIW en la
  consola— son hoy el `#20` y el `#21` de AIW, ambos `completed`; el canónico de
  AIW no lleva `O4` (sus objetivos son `O1`, `O2`, `O3`, `O5`, `O6`, `O7`). **Lo
  que el `#37` de este roadmap conserva de trabajo propio se decide en cabina**:
  no se editó nada. **[NO VERIFICADO]** que la consola pinte AIW en pantalla — no
  se levantó. `aiw/.project/` **no se re-midió**: fuera del alcance de lectura de
  este encargo.

## LAS DIEZ CITAS `RM-AIW:` — ahora son trabajo de ESTE hilo

Re-medido hoy: **10 ocurrencias del token `RM-AIW:` en el canónico de este repo,
repartidas en 8 runs** (`#36` y `#38` citan dos veces cada uno). El desfase vigente
es **`RM-AIW:n` → línea `n + 28`** del Markdown de 228 líneas; se resolvió contra
el archivo y coincide en las diez — `RM-AIW:114` cae en la línea 142, que dice
«SECUENCIA ACORDADA (D-034) — la consola es lo SIGUIENTE y va primero.», y
`RM-AIW:152` cae en la 180, que es el bullet «Pantalla multi-proyecto». La propia
cabecera del Markdown lo declara: **+20 de la cabecera sobre el +8 que ya
arrastraba**. → tabla de los 8 runs y las 10 citas con título verbatim y línea
real en `records/RETIRO-MARKDOWN-AIW.md §4.2` — **no se reproduce aquí**.

El token aparece además **fuera** del canónico, contado por archivo en esta sesión
y **sin clasificar ni reparar**: `context/DECISIONES.md` **1**;
`context/handoffs/` **16** (`aiw-console.md` 12 —medido sobre la versión que este
archivo sustituye—, `aiw.md` 4, `cantu-studio.md` 0);
`context/aiw-console/records/` **127 en 9 archivos** (`MEDICION-ESTADO-DE-AIW` 39,
`MEDICION-O4` 32, `REDACCION-O4` 20, `RETIRO-MARKDOWN-AIW` 20,
`TRADUCCION-ROADMAP-A-INGLES` 7, `ESCRITURA-ROADMAP-AIW` 3, y 2 en cada uno de
`AIW-TERCER-PROYECTO`, `AUDIT-CONTENIDO-AIW` y `DECISION-ROADMAP-AIW`);
`.project/roadmap.json` **10**; `.project/snapshot.json` **10**. Es **cuenta de
alcance, no veredicto**: cuántas están rotas sigue **[NO VERIFICADO]** →
`records/RETIRO-MARKDOWN-AIW.md §4.3` (que nombraba siete records; hoy son nueve).

**La reparación nace como run propio de este roadmap y ESE RUN TODAVÍA NO EXISTE.**
No se creó en esta sesión. Nace sin arista externa: el `#20` de AIW del que iba a
depender ya está `completed`.

## LOS TRES ÁRBOLES DE CONSOLA — no confundirlos

Verificado en disco hoy. → `records/AIW-TERCER-PROYECTO.md §3`.

- **`project-console/` — LA CONSOLA VIVA.** Es la única que nombra el lanzador:
  `start-console.ps1:33` fija `$SERVER_RELATIVE = "project-console\serve.mjs"` y
  `:34` fija `$REGISTRY_RELATIVE = "project-console\projects.json"`. Puerto
  **8788** (`project-console/serve.mjs:143`; `PC_PORT` lo sustituye). Es la única
  con registro de proyectos.
- **`docs/project-console/` — EL FORK descartado por `D-035`.** Solo `index.html`
  y `assets/`: **no tiene `serve.mjs`, no tiene `projects.json`, y no declara
  puerto alguno** (no hay servidor que lo declare). No conoce ningún registro de
  proyectos.
- **`console/` — el prototipo de `O4.P10`.** Puerto **propio y distinto: 8790**
  (`console/serve.mjs:33`; `CONSOLE_PORT` lo sustituye), entrada `/web/index.html`.
  Lee `roadmap/roadmap.json` crudo y **no toca `.project/`** — lo declara él mismo
  en `console/README.md:30` y `console/web/assets/console.js:7`, y no hay una sola
  referencia a `.project/` en su código.

## LOS TEXTOS VENCIDOS DE ESTE REPO — medidos HOY, ninguno editado

Re-leídos en esta sesión, con la línea real medida aquí (no citada del record).
Su reparación **se decide en cabina**. → `records/AIW-TERCER-PROYECTO.md §6`.

| Archivo y línea | Qué dice HOY | Qué habría que cambiar |
|---|---|---|
| `project-console/README.md:115` («Three deliberate differences», punto 2) | «Edit mode still probes the endpoint per project and refuses honestly where no layout claims a roadmap (**today: `aiw`, until O4.P6**)» | **Vencido**: `aiw` ya tiene canónico propio (`aiw/roadmap/roadmap.json`, medido hoy) y está registrado. El paréntesis no describe ningún proyecto |
| `project-console/README.md:57-66` (bloque JSON de «The project registry») | El ejemplo lista **dos** proyectos: `aiw-console` y `cantu-studio` | `project-console/projects.json` declara **tres** (medido hoy): falta la entrada de `aiw` con root `../../../aiw`. El ejemplo se lee como si fuera el archivo |
| `context/README.md:16-23` | «`aiw-console` **también** contiene un fork de la consola de Cantu […] la consola viva está en `projects/cantu-studio`» | **Ambiguo en dos sentidos**: no dice cuál de los **tres** árboles es el fork —es `docs/project-console/`, no `console/`—, y la consola multiproyecto es `aiw-console/project-console/` |
| `package.json:6` | `"description": "AIW project console — verbatim fork of the JAME project console (zero dependencies)."` | «verbatim fork» es falso respecto de los bytes, y `D-035` ya lo declaró |

**Hallazgo adicional del mismo barrido, no listado en el record:**
`context/README.md:80-81` dice que `aiw-console/` está «todavía sin roadmap propio:
O4 vive hoy en el roadmap de AIW y migra aquí en el tramo 1». **También vencido**:
este repo tiene canónico propio con `O0` y `O4`, y el canónico de AIW ya no lleva
`O4`. No se editó.

## Las compuertas vigentes (son `depends_on` reales en el roadmap)

- **paridad + UI/UX → corte:** `RUN-CONSOLE-CORTE-RETIRO-LOCAL-001` (`#38`) depende
  de `RUN-CONSOLE-PARIDAD-RENDER-CANTU-001` (`#35`) **y** de
  `RUN-CONSOLE-UI-UX-001` (`#36`). Sin cambio desde `D-047`: el corte es
  irreversible y no procede sin la revisión de uso.
- **Es la ÚNICA compuerta viva.** Las otras 17 aristas unen runs ya `completed`.
  Las 19 resuelven dentro del archivo; **la ubicación de las fases nuevas es
  ORDEN, no compuerta** — este proyecto declara `depends_on` solo donde hay
  compuerta real (`D-046`). La arista externa que se preveía hacia el `#20` de AIW
  **ya no hace falta**: ese run está `completed`.

## LAS DEUDAS DESTAPADAS Y NO TOCADAS

- **El motor no puede crear ni borrar fase u objetivo.** Es el `#11` de O0, vivo y
  `planned`; **tres cierres consecutivos lo han rodeado con escritura a mano**
  (`CIERRE-ROADMAP-AL-DIA-FASES-P13-P14.md:485`,
  `CIERRE-REGISTRO-Y-RELEVO-TERCERO.md:631`, `ESCRITURA-ROADMAP-AIW.md:311` — los
  tres re-verificados hoy).
- **`CONTRATO §7` NO está enforced en código.** Un `contract_ref` que escapa del
  root resuelve y se emite; la garantía de contención es documental, no de código.
  → `GOBERNANZA-DECLARADA-AIW.md §6.3`.
- **La ausencia de un artefacto tiene DOS canales y solo uno la cubre.** El banner
  por sección la anuncia nombrando el archivo, pero el artefacto ausente no entra
  en `emitted_artifacts`. → `EMISION-PROJECT-AIW.md §5.3`.
- **El escaneo del `docs_index` no consulta `.gitignore`**, así que produce
  resultados distintos en cada máquina. → `EMISION-PROJECT-AIW.md §6` (su §6.3
  lista las 36 rutas que no viajarían).
- **`git_history.json` a de-máquina en TODO emisor** — `D-053` adjudicación 4,
  declarada **transversal**. **Sigue sin ejecutar en este repo.**

## `D-057` PENDIENTE — tres cabos que no se pierden

Las tres **se corrigen hacia adelante, nunca reescribiendo** (precedente `D-045`).
Verificado hoy: **`D-056` es la última entrada de `context/DECISIONES.md` y
`D-057` no existe**; no hay entradas posteriores.

1. **La fecha de `7659ff3` sitúa la rotura 18 días antes de constatarla, no los 17
   que citan `D-055` y `D-056`.** → `ESCRITURA-ROADMAP-AIW.md §6`.
2. **El aplazamiento del `docs_index` es SECUENCIA, no divergencia de `D-053`** —
   reencuadrar, no enmendar. → `EMISION-PROJECT-AIW.md §9.3`.
3. **`D-053` cita `aiw/.gitignore:4` para `logs/`; retirada esa línea, el `:4`
   apunta hoy a otra cosa.** → cabo de aquel cierre; **no se re-midió aquí**,
   `aiw` está fuera del alcance de lectura de este encargo salvo su `roadmap.json`.

## Qué NO está resuelto, y el hilo nuevo debe saberlo

1. **La prioridad `O0`↔`O4`, con triage CERRADO y reorden PENDIENTE.** `D-054` leyó
   el contenido de los tres runs vivos de O0 y **no halló trabajo vivo y urgente**:
   lo vivo de O4 (`#35`→`#38`) va por delante de la cola de O0. **El reorden no se
   ejecutó**: queda como **acto de edición propio** en la consola (dry-run →
   confirm, la ruta de `O4.P12`), **antes de la paridad** (`O4.P5`).
2. **El `#10` de O0 sigue `planned`**, como quedó tras el cierre anterior. Medido
   hoy: ni O0 ni O4 tienen ningún run `active`.
3. **La consola no se ha levantado desde que AIW entró al registro.** Los tres
   embudos del shell pasan en disco (`AIW-TERCER-PROYECTO.md §4`), pero **[NO
   VERIFICADO]** que renderice AIW en pantalla. La lista de comprobación en
   pantalla, para el operador, está en `AIW-TERCER-PROYECTO.md §5`.

## La auditoría de contenido del roadmap — DIFERIDA, pero ya sin bloqueo

Siete premisas fechadas reportadas y **sin tocar**
(`records/CIERRE-ROADMAP-AL-DIA-FASES-P13-P14.md` Bloque B.3, re-verificado hoy:
son siete filas). **La razón de orden que las difería YA NO SE SOSTIENE**: se
diferían porque «O4 vive en dos sitios mientras el Markdown no se retire», y el
Markdown está retirado y el canónico de AIW no lleva `O4`. El duplicado quedó
medido ítem por ítem en `MEDICION-ESTADO-DE-AIW.md §2` — no hay que re-medirlo.
**Abrirla o no es decisión de cabina**; aquí solo se declara que el bloqueo cayó.

## Qué se puede mirar HOY

**La consola global**, desde la raíz de `projects/aiw-console`:

```bash
node project-console/serve.mjs
```

o el lanzador `start-console.cmd` / `start-console.ps1` (puerto **8788**, `PC_PORT`
lo sustituye; ver `start-console.README.md`). El registro
`project-console/projects.json` declara **tres** proyectos, medidos hoy:
`aiw-console` (`..`), `cantu-studio` (`../../cantu-studio`) y `aiw`
(`../../../aiw`).

El server expone **exactamente tres rutas de escritura** —`roadmap/edit`,
`history/sync`, `project/emit`—; la matriz está **medida por un test que la
imprime**, no mantenida a mano (`records/REEMISION-MANUAL-PROJECT-O4-P14.md`
Bloque C.2). Todo lo demás responde `405 read_only_console`; `.git` responde `403`.

La consola local de Cantu sigue levantable pero **ya no es la herramienta** para su
canónico; su puerto **no se re-midió aquí** (`cantu-studio` está fuera de alcance).
El prototipo `console/` sigue siendo historia.

## Pendientes que son del OPERADOR, no del taller

1. **`governance/` de este repo SIN REVISIÓN — lo más viejo de la lista.** Los **7
   guardrails** y los **5 claims** (contados hoy en `governance/guardrails.json` y
   `governance/no_claims.json`) los **autoró el taller** en `O4.P2`: hay texto en
   pantalla que nadie con autoridad aprobó.
2. **Las 7 premisas fechadas del roadmap** — ya sin la razón de orden que las
   difería (ver arriba).
3. **Los `run_id` con raíz española.** Decisión de **identidad, no de traducción**:
   `D-047` la declara opaca y renombrar rompe `depends_on`, records y
   `DECISIONES.md`. Los runs nuevos nacen en inglés.
4. **Las 9 fuentes diferidas.** Sin emitir; el panel «Not emitted by this project»
   sigue diciendo la verdad (`project-console/assets/project-console.js:2940`,
   re-verificado hoy). Es decisión, no fase abierta; materia de `O4.P5` si se pide.
5. **¿El validador viaja a la consola global?** Recomendación de cabina: **que NO**;
   los tres ROMPE viven en él y desaparecen con el corte.
6. **Las dos deudas del cierre anterior**: los censos fijados a mano en la suite y
   los records que se auto-asignan fase en su nombre
   (`records/CIERRE-REGISTRO-Y-RELEVO-TERCERO.md` Bloque H, re-verificado hoy).

## Deuda medida para la multiconsola — NO arreglada

Tres sitios del **validador de Cantu** asumen que todo `run_id` vive en el roadmap
local; con O0 fuera, eso es falso. Quedaron medidos y **no tocados** en su momento
(`CANTU-VALID:847`, `CANTU-VALID:1059-1069`,
`build-git-history-snapshot.mjs:103-108`); **esas tres líneas NO se re-verificaron
en esta sesión** — viven en `cantu-studio`, que está fuera de alcance. El rojo
agudo se cerró en `D-045`. El motor de Cantu **tolera pero no adopta** carriles,
barriers y aristas externas — por eso su canónico se edita desde la consola global
(`records/MIGRACION-CANTU-A-CARRILES.md` A.1, re-verificado hoy).

## El `.aiw/` de `aiw-console` NO es estado propio

Es el área de entrega de la **proyección de AIW**: el proyector vive en este repo,
lee `../../aiw/objectives/` y escribe ahí. **La simetría con Cantu no existe** —
allá `.aiw/` sí es del proyecto. Supuesto tácito que ya hizo fallar un encargo
(`D-044`, `MEDICION-PROYECTOR.md §5.a`, `MEDICION-FUENTES-CONSOLA.md` Bloque D —
los tres re-verificados hoy). Verificado hoy: existe con `roadmap/` y `views/`,
`mtime` **2026-07-22 15:38** — residuo. Lo vivo está en `.project/`.

## Regla de cierre de la cabina

Cada cierre termina con **el mapa** y con **qué se puede mirar**; si un encargo no
cambia nada observable, se dice. **Este encargo no cambió nada observable**:
reescribió este archivo y nada más. Ni el roadmap, ni `.project/`, ni el código,
ni un record, ni `DECISIONES.md`.

## Lecturas de arranque (en orden de utilidad)

1. `projects/aiw-console/roadmap/roadmap.json` — el plan y el estado. **El estado
   real se mide aquí, no se recuerda.**
2. `records/RETIRO-MARKDOWN-AIW.md` **§4.2 y §4.3** — las diez citas `RM-AIW:` con
   su línea real, y las ocurrencias fuera del canónico. Es el insumo del run que
   hay que crear.
3. `records/AIW-TERCER-PROYECTO.md` **§3** (los tres árboles de consola), **§5**
   (qué mirar en pantalla) y **§6** (los textos vencidos).
4. `aiw/roadmap/roadmap.json` — **solo lectura**, y solo para confirmar que `O2`
   cerró. Ese hilo ya no vuelve a este repo.
5. `context/handoffs/cantu-studio.md` — el otro hilo paralelo.
6. `context/DECISIONES.md` — **`D-056` es la última.** `D-051` (carriles y
   barriers), `D-048` (orden de O4), `D-047` (identidad opaca), `D-046` (hueco de
   capa 2, prioridad `O0`↔`O4`) y `D-035` (el fork descartado) siguen siendo el
   suelo de este proyecto.
7. `context/aiw-console/CONTRATO.md` — el contrato de la carpeta. `§7` (Rutas —
   contención, no enforced), `§10.d` Reglas 1-3 (aristas externas), `§11`-`§12`
   (status derivado), `§19`-`§20` (degradación).
8. `context/aiw-console/records/` — por tema:
   `REEMISION-MANUAL-PROJECT-O4-P14.md` (las tres rutas de escritura),
   `DISCIPLINA-UN-RUN-POR-CARRIL.md` (**la disciplina que gobierna los hilos
   abiertos**), `CARRILES-Y-BARRIERS-ROADMAP.md`, `MEDICION-VALIDADOR-ROJO.md`,
   `AUDIT-CONSOLE-O4-PHASE0.md` Bloque F.3 (qué se pierde en el corte).

## Pendientes menores (siguen vivos)

- `package.json:6` se autodescribe como «verbatim fork» — falso (re-verificado hoy;
  ver la tabla de textos vencidos).
- **Un record cita un `run_id` que no existe**:
  `records/EMISOR-CANTU-CARPETA-PROPIA-O4-P4.md` se encabeza citando
  `RUN-CONSOLE-EMISOR-CANTU-CARPETA-PROPIA-001`; el run real de `O4.P4` es
  `RUN-CONSOLE-CANTU-EMITE-CARPETA-001` (`#24`). Re-verificado hoy. Los `run_id` no
  se renombran (`D-047`).
- `records/DOCS-INDICE-CURADO-TRANSPORTADO.md` sigue diciendo `O4.P5` en su propio
  H1 (re-verificado hoy), aunque el nombre del archivo ya no reclama esa fase.
- `aiw/.aiw/project_console.snapshot.json` — copia stale reportada por el cierre
  anterior; **no re-verificada aquí** (`aiw` fuera de alcance de lectura). Es del
  hilo de AIW, no de éste.
