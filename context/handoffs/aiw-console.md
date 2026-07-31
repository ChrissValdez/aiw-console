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

> **Por qué esta reescritura: una AUDITORÍA HUMANA DE CABINA movió el canónico.**
> El relevo anterior describía una cola de **45 runs** que ya no existe. La
> auditoría del 2026-07-29/30 la dejó en **51**: seis runs nuevos, cuatro textos
> reencuadrados, dos cierres y nueve aristas. Con la cola cambió la cabeza: donde
> aquel texto decía que lo siguiente era el `#10` de `O0` con el triage cerrado en
> sentido contrario, hoy el reorden **está ejecutado** y la cabeza de la cola viva
> es el **`#39`**. Y una sección entera de aquel relevo —las diez citas `RM-AIW:`
> como trabajo futuro de este hilo— **se retira**: quedan cinco y la reparación se
> disolvió con las reescrituras. Un hilo que arrancara con aquel texto planificaría
> sobre una cola que no está en disco. **Excepción declarada a «APUNTA, no
> RECUENTA»: la sección del sistema de clasificación**, porque todavía no existe
> como documento al que apuntar — publicarlo es el `#39`.

**Estado del hilo:** O4 — la consola global existe, enciende, renderiza tres
proyectos registrados y escribe. **Este hilo NO ejecutó ningún run en esta
sesión**: fue un encargo de taller sin run, y su único byte escrito es este
archivo. **Ningún run está `active` en ninguno de los dos objetivos.** Medido hoy
sobre `roadmap/roadmap.json`: **38 `completed`, 13 `planned`, 0 `active`**.
**La cabeza de la cola viva es el `#39`**, `RUN-CONSOLE-RUN-CLASSIFICATION-SPEC-001`.
Última actualización: **2026-07-30**.

---

## ⚠ LA FRONTERA — leer antes de escribir un solo byte

**1. `aiw` tiene hilo propio, y este roadmap ya NO es archivo disputado por él.**
Su relevo vive en `context/handoffs/aiw.md`. **Este hilo es hoy el único escritor
del canónico de este repo.** La regla de serie —dos encargos sobre el mismo
archivo van en serie— sigue vigente como regla; simplemente ya no hay segundo
encargo. `aiw` **no se leyó en esta sesión**: fuera de alcance.

**2. `cantu-studio` tiene hilo propio** (relevo en
`context/handoffs/cantu-studio.md`) y escribe records en
`context/aiw-console/records/`, **no este roadmap**. Rige la disciplina de
carriles (`records/DISCIPLINA-UN-RUN-POR-CARRIL.md`): superficies de escritura
disjuntas.

**3. Este hilo NO escribe en `aiw` ni en `cantu-studio`.** Un hallazgo sobre
cualquiera de los dos se **NOMBRA** y se pasa a su hilo — sin ticket y sin
recomendación de arreglo.

**4. Excepción medida, y hay que decirla: dos runs vivos de ESTE roadmap escriben
en `cantu-studio`** — el `#47` (`RUN-CONSOLE-CANTU-CANONICAL-OUT-OF-AIW-001`) y el
`#48` (`RUN-CONSOLE-CORTE-RETIRO-LOCAL-001`). **Hay precedente**: este roadmap ya
condujo escritura sobre aquel repo. **La ventana se coordina con ese hilo y no
corren con un taller vivo allí.**

**5. Este roadmap NO declara `lanes`.** Medido hoy: **0 runs con `lane`, 0 con
`barrier`**. Un solo carril: **la cola es serial y el `queue_order` es la historia
completa de la ejecución.** El vocabulario de carriles existe en el esquema
(`D-051`) y este proyecto no lo usa.

---

## El plan y el estado viven en el roadmap — no aquí

    projects/aiw-console/roadmap/roadmap.json

Medido sobre ese archivo hoy: **2 objetivos, 19 fases, 51 runs**; `queue_order`
**1..51 denso, único y contiguo**; **26 aristas `depends_on`, 0 colgantes**;
**38 `completed`, 13 `planned`, 0 `active`**; **36 runs con `closeout_result`**
(los 15 sin él son los 13 `planned` más el `#4` y el `#9`, ambos `completed`). El
status de objetivo y de fase se **deriva al leer**, no se almacena
(`CONTRATO §11`/`§12`).

- **`O0` «Project Console»** — **3 fases, 12 runs**: 9 `completed`, **3 `planned`**
  (`#41`, `#50`, `#51`).
- **`O4` «Global Console»** — **16 fases, 39 runs**: 29 `completed`, **10
  `planned`**.

Línea base viva, medida hoy sobre el archivo entero: **116 437 B**, md5
**`b0080299491eac173eeca4aa0f14ef40`**.

## LO QUE QUEDA VIVO — los trece `planned`

Títulos verbatim de disco: es lo único que el operador ve en pantalla. **Los trece
se leyeron verbatim; ninguno quedó ilegible.** El orden es el de `queue_order`.

| `#` | Fase | `run_id` | Título |
|---:|---|---|---|
| 39 | `O4.P9` | `RUN-CONSOLE-RUN-CLASSIFICATION-SPEC-001` | Publish the run classification specification and register it as a transversal decision |
| 40 | `O4.P9` | `RUN-CONSOLE-SUITE-FIXTURES-001` | Make the test suite stable under change — assert against fixtures, not live sibling data |
| 41 | `O0.P3` | `RUN-CANTU-PROJECT-CONSOLE-LATENT-DEFECTS-001` | Fix four defects in the global console renderer, and the projector mirror the tests assert against |
| 42 | `O4.P9` | `RUN-CONSOLE-RUN-CLASSIFICATION-FIELDS-001` | The five classification fields enter the roadmap schema, with derivation at read time and a minimal view |
| 43 | `O4.P9` | `RUN-CONSOLE-CLASSIFICATION-PILOT-001` | Classify aiw-console's live runs as the pilot, and rule on the procedure itself |
| 44 | `O4.P9` | `RUN-CONSOLE-DIGEST-CABINA-001` | Digest for the cockpit |
| 45 | `O4.P5` | `RUN-CONSOLE-PARIDAD-RENDER-CANTU-001` | Global console renders Cantu (parity, operator QA) |
| 46 | `O4.P8` | `RUN-CONSOLE-UI-UX-001` | UI/UX of the global console |
| 47 | `O4.P9` | `RUN-CONSOLE-CANTU-CANONICAL-OUT-OF-AIW-001` | Move cantu-studio's canonical roadmap out of .aiw before the cutover can delete it |
| 48 | `O4.P7` | `RUN-CONSOLE-CORTE-RETIRO-LOCAL-001` | Cutover: retirement of Cantu's local console and deletion of .aiw |
| 49 | `O4.P9` | `RUN-CONSOLE-STALE-TEXTS-REPAIR-001` | Repair the five texts that describe this repo falsely |
| 50 | `O0.P3` | `RUN-CANTU-ROADMAP-PHASE-OBJECTIVE-OPS-001` | Add phase and objective create and delete operations |
| 51 | `O0.P3` | `RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001` | Deep Project Console audit |

**La anomalía de fase se lee raro y es CORRECTA.** Tres runs de `O0.P3` llevan
`queue_order` **41, 50 y 51**, muy por encima de los de `O4`, y `O4.P5`/`O4.P7`/
`O4.P8` caen en 45/48/46 mientras `O4.P9` ocupa 33..49. **El orden lo da el
`queue_order`, siempre y solo; el `phase_id` es identidad opaca** (`D-047`) y no
implica posición. Es el resultado del reorden `O0`↔`O4` que el relevo anterior
daba como pendiente: **está ejecutado.**

## Las aristas vivas — nueve, y todas salen de un run vivo

De las **26** aristas del archivo, **nueve** tocan un run `planned`. **Las
diecisiete restantes unen runs ya `completed`** y no gobiernan nada de lo que
queda; no se transcriben. Este proyecto declara `depends_on` solo donde hay
compuerta real (`D-046`).

| Origen (`#`) | → | Destino (`#`) |
|---|---|---|
| `#40` Make the test suite stable under change — assert against fixtures, not live sibling data | → | `#41` Fix four defects in the global console renderer, and the projector mirror the tests assert against |
| `#39` Publish the run classification specification and register it as a transversal decision | → | `#42` The five classification fields enter the roadmap schema, with derivation at read time and a minimal view |
| `#40` Make the test suite stable under change — assert against fixtures, not live sibling data | → | `#42` The five classification fields enter the roadmap schema, with derivation at read time and a minimal view |
| `#42` The five classification fields enter the roadmap schema, with derivation at read time and a minimal view | → | `#43` Classify aiw-console's live runs as the pilot, and rule on the procedure itself |
| `#41` Fix four defects in the global console renderer, and the projector mirror the tests assert against | → | `#45` Global console renders Cantu (parity, operator QA) |
| `#45` Global console renders Cantu (parity, operator QA) | → | `#46` UI/UX of the global console |
| `#45` Global console renders Cantu (parity, operator QA) | → | `#48` Cutover: retirement of Cantu's local console and deletion of .aiw |
| `#46` UI/UX of the global console | → | `#48` Cutover: retirement of Cantu's local console and deletion of .aiw |
| `#47` Move cantu-studio's canonical roadmap out of .aiw before the cutover can delete it | → | `#48` Cutover: retirement of Cantu's local console and deletion of .aiw |

**Las tres compuertas del corte son APROBACIÓN EXPLÍCITA DEL OPERADOR**, no
comprobación automática: la **paridad** (`#45`), la **revisión de uso** (`#46`) y
**la salida del canónico de Cantu de `.aiw`** (`#47`). El corte es irreversible y
no procede sin las tres.

## Los derivados — al día, NADA que re-emitir al abrir sesión

Comparado tupla a tupla (`run_id`, `phase_id`, `status`, `queue_order`) contra el
canónico: **`.project/roadmap.json` es idéntico en los 51 runs, sin faltantes,
sin sobrantes y sin una sola diferencia**; también coinciden los 2 objetivos, las
19 fases y el reparto 38/13. `generated_at`: **`2026-07-30T22:46:56.173Z`**,
`generated_from` **`aiw-projector@0.9.0`**. **No se re-emitió nada en esta sesión.**

## EL SISTEMA DE CLASIFICACIÓN — YA ES DOCUMENTO; aquí solo el puntero

**Publicado como `context/CLASIFICACION-DE-RUNS.md`** (normativo y transversal a
los tres proyectos), y registrado como decisión en `context/DECISIONES.md`
(`D-057`, los dos ejes). **La copia provisional que vivía en esta sección queda
retirada**: la excepción a «APUNTA, no RECUENTA» ya no existe porque ya hay a qué
apuntar.

## QUÉ PRODUJO LA AUDITORÍA — un hito por línea

- **Dos cierres.** «AIW as a third project» (`#32`) cerró con
  `closeout_result: delivered_by_aiw_roadmap_O2`; «Context pack of the console»
  (`#35`) con `superseded_by_D-037_D-038`. Ambos medidos hoy.
- **Seis runs nuevos, los seis en `O4.P9`**: `#39`, `#40`, `#42`, `#43`, `#47`, `#49`.
- **Cuatro textos reencuadrados** (los cuatro llevan la marca `REFRAMED 2026-07-30`
  en su `full_description`): los defectos de consola pasan a la global **y suman un
  cuarto** (`#41`); **paridad pasa de construcción a VERIFICACIÓN sobre tres
  proyectos** (`#45`); UI/UX **recibe alcance escrito** —era una compuerta de
  alcance indefinido bloqueando un acto irreversible— (`#46`); el corte **recibe su
  precondición medida** (`#48`).
- **Nueve aristas, dos de ellas repuestas.** Las diecisiete de runs `completed` no
  se tocaron.
- **La auditoría NO deja record, y es DELIBERADO.** Su producto es el roadmap
  mismo, que es autoevidente y está en Git. **Las decisiones de fondo van a
  `DECISIONES.md` por el `#39`**, no por un record de la auditoría.
- **Dos deudas viejas CERRADAS sin tocar nada.** (a) Las **siete premisas fechadas**
  viven en cinco runs `completed` y **no se editan**: se corrigen **añadiendo nota
  fechada**, la forma que tres runs cerrados ya usan
  (`CIERRE-ROADMAP-AL-DIA-FASES-P13-P14.md` B.3). (b) La reparación de las citas
  `RM-AIW:` **no nace como run**: se disolvió con las reescrituras.

## LAS CITAS `RM-AIW:` — MEDIDAS HOY, y la sección anterior queda RETIRADA

Contadas hoy sobre `roadmap/roadmap.json`: **5 ocurrencias del token `RM-AIW:`**,
una por run, en cinco runs:

| `#` | Status | Run |
|---:|---|---|
| 10 | `completed` | Audit / Phase 0 of the migration to the global console |
| 20 | `completed` | Multi-project shell reading aiw-console only |
| 21 | `completed` | Cantu emits the new .project/ folder alongside .aiw |
| 32 | `completed` | AIW as a third project (roadmap Markdown → JSON v3) |
| **44** | **`planned`** | **Digest for the cockpit** |

**Cuatro en runs `completed`, una en un run vivo — el digest.**

Contexto: **eran diez**; cinco murieron al reescribirse paridad, UI/UX y el corte.
**La cabina afirmó primero que habían muerto siete y lo corrigió al recontar** — se
registra aquí porque es exactamente la disciplina de no afirmar cifras sin
medirlas.

**Consecuencia:** la condición de borrado del Markdown de AIW —«espera a que se
reparen las diez citas», `records/RETIRO-MARKDOWN-AIW.md §5`— **ya no describe la
realidad**. **Reformularla es del hilo de `aiw`, que la escribió** (ver reporte 2).
La tabla de `§4.2` de aquel record describe un estado de diez citas que ya no
existe: **es medición fechada, no estado de hoy.**

## HALLAZGOS VIVOS Y DEUDAS

### El validador viejo está EN ROJO y no valida esto

`tools/project-console/validate-project-console-state.mjs` — **corrido hoy: 44
líneas de error** (45 líneas de salida contando la cabecera «Project Console state
validation failed:»), exit **1**. **Está en rojo desde antes de la auditoría.**
Lee **54 ocurrencias de rutas bajo `.aiw/**`** (19 archivos distintos) y **no
menciona `roadmap/roadmap.json` ni una sola vez**. Es **el validador de JAME
trasplantado**: exige `.aiw/project.json project_id === "jame_system_dual"`
(`:823`) y `schema_version === "jame.roadmap_v3.v0.2-progress"` (`:1606`).

**Consecuencia operativa, en claro: un bloque de Git que use ese validador como
guarda NO PUEDE PASAR NUNCA en este repo.** La guarda buena compara el conteo de
runs del canónico contra el de `.project/`. → `records/MEDICION-VALIDADOR-ROJO.md`;
**candidato a caer en el `#40`**.

### Los cinco textos vencidos — son el `#49`, ninguno editado

Re-leídos en esta sesión con **archivo y línea medidos hoy**; los cinco siguen
diciendo lo que decían. → `records/AIW-TERCER-PROYECTO.md §6` (cubre cuatro de los
cinco: no lista el de `context/README.md:80-81`).

| Archivo y línea | Qué dice HOY |
|---|---|
| `project-console/README.md:114-115` | «Edit mode still probes the endpoint per project and refuses honestly where no layout claims a roadmap (**today: `aiw`, until O4.P6**)» — el paréntesis no describe ningún proyecto |
| `project-console/README.md:57-66` (bloque JSON) | El ejemplo lista **dos** proyectos (`:62-63`); `project-console/projects.json` declara **tres** (medido hoy) |
| `context/README.md:16-23` | «`aiw-console` **también** contiene un fork […] la consola viva está en `projects/cantu-studio`» — no dice cuál de los tres árboles es el fork, y la consola multiproyecto es `aiw-console/project-console/` |
| `context/README.md:80-81` | «Todavía sin roadmap propio: O4 vive hoy en el roadmap de AIW y migra aquí en el tramo 1» — este repo tiene canónico propio con `O0` y `O4` |
| `package.json:6` | `"AIW project console — verbatim fork of the JAME project console (zero dependencies)."` — falso respecto de los bytes, y `D-035` ya lo declaró |

### Los tres árboles de consola — no confundirlos

Verificado en disco hoy. → `records/AIW-TERCER-PROYECTO.md §3`.

- **`project-console/` — LA VIVA.** Es la única que nombra el lanzador:
  `start-console.ps1:33` fija `$SERVER_RELATIVE = "project-console\serve.mjs"` y
  `:34` fija `$REGISTRY_RELATIVE = "project-console\projects.json"`. Puerto **8788**
  (`project-console/serve.mjs:143`; `PC_PORT` lo sustituye).
- **`docs/project-console/` — EL FORK descartado por `D-035`.** Solo `index.html` y
  `assets/`: **sin `serve.mjs`, sin `projects.json`, sin puerto** (re-verificado hoy).
- **`console/` — el prototipo de `O4.P10`.** Puerto **propio y distinto: 8790**
  (`console/serve.mjs:33`; `CONSOLE_PORT` lo sustituye). Lee `roadmap/roadmap.json`
  crudo y **no toca `.project/`**. Es historia.

### La suite — `[NO VERIFICADO]` aquí, y NO la corras

**Medido por el hilo de `aiw` el 2026-07-29 y reportado, NO verificado en esta
sesión: 278 tests, 268 pasan, 10 fallan**, y los diez asertan contra datos vivos y
mutables. **Correrla deja el árbol sucio: re-emite `.project/` de verdad.** Es el
`#40`. Este encargo no la corrió.

### Deudas anteriores que siguen vivas — punteros revalidados hoy, todos resuelven

- **El motor no crea ni borra fase u objetivo.** Es el **`#50`**, vivo y `planned`;
  **tres cierres consecutivos lo han rodeado con escritura a mano**
  (`CIERRE-ROADMAP-AL-DIA-FASES-P13-P14.md:485`,
  `CIERRE-REGISTRO-Y-RELEVO-TERCERO.md:631`, `ESCRITURA-ROADMAP-AIW.md:311` — los
  tres resuelven).
- **`CONTRATO §7` NO está enforced en código.** Un `contract_ref` que escapa del
  root resuelve y se emite; la contención es documental. →
  `GOBERNANZA-DECLARADA-AIW.md §6.3` (resuelve).
- **El escaneo del `docs_index` no consulta `.gitignore`**, así que produce
  resultados distintos en cada máquina. → `EMISION-PROJECT-AIW.md §6` (resuelve; su
  `§6.3` lista las 36 rutas que no viajarían).
- **`git_history.json` a de-máquina en TODO emisor** — `D-053` adjudicación 4,
  declarada transversal. **Sigue sin ejecutar en este repo.**
- **La ausencia de un artefacto tiene DOS canales y solo uno la cubre**: el banner
  por sección la anuncia, pero el artefacto ausente no entra en
  `emitted_artifacts`. → `EMISION-PROJECT-AIW.md §5.3` (resuelve).

### `D-057` PENDIENTE — tres cabos que no se pierden

Verificado hoy: **`D-056` es la última entrada de `context/DECISIONES.md`** (57
entradas, `D-056` en `:1964`) y **`D-057` no existe**. Las tres **se corrigen hacia
adelante, nunca reescribiendo** (precedente `D-045`).

1. **La fecha de `7659ff3` sitúa la rotura 18 días antes de constatarla, no los 17
   que citan `D-055` y `D-056`.** → `ESCRITURA-ROADMAP-AIW.md §6` (resuelve).
2. **El aplazamiento del `docs_index` es SECUENCIA, no divergencia de `D-053`** —
   reencuadrar, no enmendar. → `EMISION-PROJECT-AIW.md §9.3` (resuelve).
3. **`D-053` cita `aiw/.gitignore:4` para `logs/`; retirada esa línea, el `:4`
   apunta hoy a otra cosa.** **No re-medido aquí**: `aiw` está fuera del alcance de
   lectura de este encargo.

## LOS CUATRO REPORTES PENDIENTES — del OPERADOR, no del taller

Sección propia **porque si se pierden, dos proyectos planifican sobre información
falsa**. Ninguno es ticket, ninguno lleva recomendación de arreglo: se nombran y se
pasan.

**A `aiw`:**

1. **La decisión de dos ejes** —el cierre se deriva, la delegabilidad se declara a
   nivel de proyecto— **antes de que se escriba su `#34`**, que sigue bloqueado por
   incidente pendiente.
2. **La condición de borrado del Markdown la escribió él, y hay que reformularla**:
   decía «espera a que se reparen las diez citas» y hoy quedan cinco.

**A `cantu-studio`:**

3. **Su canónico vive DENTRO de la carpeta que el corte borra** — ya tiene run
   propio aquí, el **`#47`** —, y **su `schema_version` difiere de los otros dos**.
4. **17 de sus runs afirman no tener corredor de tests habiendo 33 archivos de test
   en disco.**

Los cuatro proceden de la deliberación de cabina. **Los datos de `cantu-studio` de
los puntos 3 y 4 NO se re-midieron aquí**: ese repo está fuera de alcance de
lectura.

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

**[NO VERIFICADO]** que la consola pinte los tres proyectos en pantalla: **no se
levantó en esta sesión**. La lista de comprobación en pantalla, para el operador,
está en `AIW-TERCER-PROYECTO.md §5`.

La consola local de Cantu sigue levantable pero **ya no es la herramienta** para su
canónico; su puerto **no se re-midió aquí**. El prototipo `console/` es historia.

## Pendientes que son del OPERADOR, no del taller

1. **`governance/` de este repo SIN REVISIÓN — lo más viejo de la lista.** Los **7
   guardrails** y los **5 claims** (contados hoy en `governance/guardrails.json` y
   `governance/no_claims.json`) los **autoró el taller** en `O4.P2`: hay texto en
   pantalla que nadie con autoridad aprobó.
2. **Los `run_id` con raíz española.** Decisión de **identidad, no de traducción**:
   `D-047` la declara opaca y renombrar rompe `depends_on`, records y
   `DECISIONES.md`. Los runs nuevos nacen en inglés.
3. **Las 9 fuentes diferidas.** Sin emitir; el panel «Not emitted by this project»
   sigue diciendo la verdad (`project-console/assets/project-console.js:2940`,
   re-verificado hoy). Es decisión, no fase abierta.
4. **¿El validador viejo viaja a la consola global?** Recomendación de cabina: **que
   NO**; los tres ROMPE viven en él y desaparecen con el corte. Ver el hallazgo de
   arriba: hoy no puede pasar en este repo.
5. **Las dos deudas del cierre anterior**: los censos fijados a mano en la suite
   (hoy materia del `#40`) y los records que se auto-asignan fase en su nombre
   (`CIERRE-REGISTRO-Y-RELEVO-TERCERO.md` Bloque H, resuelve).

## El `.aiw/` de `aiw-console` NO es estado propio

Es el área de entrega de la **proyección de AIW**: el proyector vive en este repo,
lee `../../aiw/objectives/` y escribe ahí. **La simetría con Cantu no existe** —
allá `.aiw/` sí es del proyecto, y por eso el `#47` existe. Supuesto tácito que ya
hizo fallar un encargo (`D-044`, `MEDICION-PROYECTOR.md §5.a`,
`MEDICION-FUENTES-CONSOLA.md` Bloque D). Lo vivo de este repo está en `.project/`.

## Regla de cierre de la cabina

Cada cierre termina con **el mapa** y con **qué se puede mirar**; si un encargo no
cambia nada observable, se dice. **Este encargo no cambió nada observable**:
reescribió este archivo y nada más. Ni el roadmap, ni `.project/`, ni el código, ni
un record, ni `DECISIONES.md`, ni un solo byte de `aiw` o `cantu-studio`.

## Lecturas de arranque (en orden de utilidad)

1. `projects/aiw-console/roadmap/roadmap.json` — el plan y el estado. **El estado
   real se mide aquí, no se recuerda.**
2. **La sección «EL SISTEMA DE CLASIFICACIÓN» de este archivo** — hasta que el `#39`
   la publique, es la única copia; el `#39`, el `#42` y el `#43` dependen de ella.
3. `records/AIW-TERCER-PROYECTO.md` **§3** (los tres árboles de consola), **§5** (qué
   mirar en pantalla) y **§6** (cuatro de los cinco textos vencidos).
4. `context/DECISIONES.md` — **`D-056` es la última.** `D-051` (carriles y barriers,
   que este proyecto no usa), `D-048` (orden de O4), `D-047` (identidad opaca),
   `D-046` (aristas solo donde hay compuerta real) y `D-035` (el fork descartado)
   siguen siendo el suelo de este proyecto.
5. `context/handoffs/cantu-studio.md` y `context/handoffs/aiw.md` — los dos hilos
   paralelos. **Léelos antes de tocar el `#47` o el `#48`.**
6. `context/aiw-console/CONTRATO.md` — `§7` (Rutas — contención, no enforced),
   `§10.d` Reglas 1-3 (aristas externas), `§11`-`§12` (status derivado), `§19`-`§20`
   (degradación).
7. `context/aiw-console/records/` — por tema:
   `REEMISION-MANUAL-PROJECT-O4-P14.md` (las tres rutas de escritura),
   `DISCIPLINA-UN-RUN-POR-CARRIL.md` (**la disciplina que gobierna los hilos
   abiertos**), `MEDICION-VALIDADOR-ROJO.md`, `AUDIT-CONSOLE-O4-PHASE0.md` Bloque
   F.3 (qué se pierde en el corte).

## Pendientes menores (siguen vivos)

- **Un record cita un `run_id` que no existe**:
  `records/EMISOR-CANTU-CARPETA-PROPIA-O4-P4.md` se encabeza citando
  `RUN-CONSOLE-EMISOR-CANTU-CARPETA-PROPIA-001`; el run real es
  `RUN-CONSOLE-CANTU-EMITE-CARPETA-001` (`#21` hoy). Los `run_id` no se renombran
  (`D-047`).
- `records/DOCS-INDICE-CURADO-TRANSPORTADO.md` sigue diciendo `O4.P5` en su propio
  H1, aunque el nombre del archivo ya no reclama esa fase.
- Tres sitios del **validador de Cantu** asumen que todo `run_id` vive en el roadmap
  local; con `O0` fuera, eso es falso (`CANTU-VALID:847`, `CANTU-VALID:1059-1069`,
  `build-git-history-snapshot.mjs:103-108`). **No re-verificados aquí** —
  `cantu-studio` está fuera de alcance. El rojo agudo se cerró en `D-045`.
