# HANDOFF — hilo `aiw-console` (la consola)

> **Este archivo es EFÍMERO y se SOBRESCRIBE.** Es el relevo del hilo de la
> consola: se reescribe al cerrar cada sesión y se consume al abrir la siguiente.
> No es un record — no acumula historia, no se versiona por tramo. Lleva **solo**
> lo que la próxima sesión necesita para arrancar sin releerlo todo. Lo que
> seguirá siendo cierto dentro de un mes vive en el roadmap, el contrato o un
> record — no aquí.

> **Disciplina de este handoff:** no afirma hechos, apunta a dónde están medidos.
> Si da una cifra, la da con su cita. Las cinco afirmaciones falsas que se
> arrastraron en su día venían todas de handoffs, ninguna de un record: por eso
> aquí las cifras viajan con su fuente y nada se declara "hecho" sin puntero.

**Estado del hilo:** O4 — fase 1 ENTREGADA (contrato en tres capas y migraciones,
`D-046`). **Siguiente: EL EMISOR (`O4.P2`).** El orden cambió otra vez, y en sentido
contrario: `D-048` **revierte** el orden de `D-047` (que ponía el prototipo primero)
porque el operador pidió una **MIGRACIÓN IDÉNTICA** de la consola de Cantu antes de
la multiconsola. **El prototipo quedó RETIRADO** — no borrado — y su veredicto se
conserva. Última actualización: 2026-07-24, al cerrar el reorden `D-048`.

## El plan y el estado viven en el roadmap — no aquí

    projects/aiw-console/roadmap/roadmap.json

Ésa es **la fuente del plan y del estado**; este handoff apunta ahí y no lo duplica.
Al cierre: **2 objetivos, 31 runs**, `queue_order` 1..31 denso, único y contiguo. O0
"Project Console" 12 runs (intacto, byte-idéntico tras el reorden); O4 "Consola
global" **12 fases, 19 runs — 9 `completed`, 10 `planned`**. El status de objetivo se
**deriva al leer**, no se almacena (CONTRATO §11.b/§12).

## El orden nuevo de O4 (`D-048`), en una línea cada uno

1. `O4.P0` audit · `O4.P1` contrato y migraciones — **hechos**.
2. **`O4.P2` EMISOR** (q20) — `aiw-console` emite sus fuentes propias. **ES LO QUE
   SIGUE.**
3. **`O4.P11` PORT IDÉNTICO** (q21, fase nueva) — trasplante de la consola de Cantu
   tal cual, un solo proyecto. Depende del emisor.
4. `O4.P3` MULTICONSOLA (q22) — menú lateral y pantalla multiproyecto. **Depende
   ahora del port**, no del prototipo.
5. Aguas abajo: `O4.P4` Cantu emite · `O4.P5` paridad · `O4.P8` UI/UX · `O4.P6` AIW
   tercer proyecto · `O4.P7` corte.
6. `O4.P9` transversal · `O4.P10` **prototipo retirado** (al final: es historia).

`phase_id` es **identidad opaca** (`D-047`): `O4.P11` no significa "posición 11", y
`O4.P2` va tercera. El orden lo cargan la posición en el array y `queue_order`.

## Las compuertas vigentes (son `depends_on` reales en el roadmap)

- **emisor → port:** `RUN-CONSOLE-PORT-IDENTICO-001` depende de
  `RUN-CONSOLE-EMISOR-CARPETA-PROPIA-001`. Sin fuentes propias no hay qué renderizar.
- **port → multiconsola:** `RUN-CONSOLE-SHELL-MULTIPROYECTO-001` depende de
  `RUN-CONSOLE-PORT-IDENTICO-001`. Reapuntada por `D-048`; la compuerta
  prototipo→shell de `D-047` **se disolvió** con el retiro del prototipo.
- **paridad + UI/UX → corte:** `RUN-CONSOLE-CORTE-RETIRO-LOCAL-001` depende de
  `RUN-CONSOLE-PARIDAD-RENDER-CANTU-001` **y** de `RUN-CONSOLE-UI-UX-001`. **Sin
  cambio**: el corte es irreversible y no procede sin la revisión de uso — ésa era la
  corrección central de `D-047` y `D-048` no la tocó.

Las de aprobación de operador siguen anotadas en el `full_description` de sus runs.

## El prototipo está RETIRADO, y su veredicto sigue vivo

`RUN-CONSOLE-PROTOTIPO-CONSOLA-001` quedó `completed` con
`closeout_result: descartado_por_D-048`. **No se borró nada**: `console/` sigue en
disco y `records/VEREDICTO-ROADMAP-TREE-V1.md` está intacto. Lo que dejó, y que
hereda el emisor: `roadmap_tree_v1` **es consumible** y aguantó contra datos reales
sin inventar, pero **el árbol suelto no es auto-descriptivo** — ni el vocabulario de
`status` ni la regla de derivación de objetivo/fase (§12) viajan dentro del archivo.
Por eso el **snapshot debe declarar `taxonomy_model`** (§17). No hay token
`descartado` en el vocabulario cerrado de run (§11.a), así que el retiro vive en
`closeout_result` (string libre, §14) y en la prosa del run.

## EL EMISOR (`O4.P2`) — qué es el mínimo y cuáles son los DOS trabajos nuevos

Todo esto sale de `records/MEDICION-FUENTES-CONSOLA.md`, leído renderer en mano.

**El mínimo funcional = 3 fuentes que ya tienen origen + 3 que hay que crear:**

- Ya emitibles: **snapshot** (`views/project_console.snapshot.json`, la **única ruta
  `required` de las 15** — sin ella la consola entera cae a fallback), **roadmap
  propio** (alimenta Overview + Roadmap + Cola) e **historia git** (History; ya se
  emite sola, 42 commits).
- A crear, y son las únicas de las doce sin emisor que **pintan píxeles vivos**:
  `docs/docs_index.json` (la pestaña Docs entera), `guardrails/project_guardrails.json`
  y `guardrails/no_claims.json` (las dos tablas de datos de Governance).

**Las otras NUEVE están DIFERIDAS** (`project.json`, `state/project_status.json`,
`state/component_status.json`, `state/events.jsonl`, `ledgers/change_ledger.jsonl`,
`ledgers/git_provenance.jsonl`, `ledgers/human_qa.jsonl`, `ledgers/ai_reviews.jsonl`,
`guardrails/project_memory.jsonl`): **ninguna compra un píxel vivo** — alimentan
código dormido, silencian el banner de fuentes opcionales, y dos llenan conteos de
Diagnostics. Van a una fase de **paridad cosmética posterior y OPCIONAL** que
`D-048` **NO abrió**: se abre solo si el operador la pide.

**Los DOS trabajos NUEVOS que la medición destapó** (no estaban en el alcance que
`D-046` escribió al emisor):

1. **El proyector NO puede proyectar `aiw-console` hoy.** Lee
   `objectives/{pending,parked,processed}/*.md` + `logs/<id>/summary.md` +
   `config.json` de un project root, y **aiw-console no tiene ninguno de los tres**.
   Hay que enseñarle a proyectar este proyecto tomando **`roadmap/roadmap.json`
   (`roadmap_tree_v1`) como raíz del árbol** y `package.json` como identidad mínima.
2. **`docs_index.json` hay que CREARLO desde cero.** No existe en ninguna ruta del
   repo (glob = 0 hits), pero el corpus sí: **23 `.md` reales**. Único caso "cuerpos
   sin índice": crear el índice **es** crear la fuente, con curaduría de
   `nav_tier`/`default_visible` y paths que existan en disco.

**Y el bloqueo de ruta, ya conocido y con línea:** `resolveInsideAiw`
(`tools/projector/project.mjs:475-483`) **LANZA** si el destino sale de `.aiw/`; el
emisor no puede escribir bajo `.project/` en absoluto. Ahí también se decide si,
durante la convivencia aditiva (`D-036`), escribe en ambos destinos o solo en el
nuevo.

### Los cuatro arreglos de identidad del emisor (detalle en `MEDICION-PROYECTOR.md`)

1. **`taxonomy_model` horneado** (`project.mjs:463`) — constante, no derivada.
2. **`run_id` derivado del nombre de archivo** — muta al archivarse; la identidad no
   puede depender de la ruta (`D-043`).
3. **`jame.git_history_snapshot.v1` literal** — y **cuidado**: el render **hace gate
   de ese string**, así que emisor y consola nueva se mueven juntos en el rename.
4. **La ruta de emisión** — hoy `.aiw/`, atada por `resolveInsideAiw`.

## EL PORT IDÉNTICO (`O4.P11`) — qué es exactamente

Trasplante, no rediseño. Las tres piezas reales de
`projects/cantu-studio/docs/project-console/`: `index.html` con sus **cinco pestañas**
(Overview; Roadmap con dos subviews, Run Queue y Roadmap; History; Docs; Status con
Governance State y Console Diagnostics — **no** hay pestañas "Cola" ni "Governance"
separadas), `assets/project-console.css` y `assets/project-console.js`, **el renderer
real**. La capa de datos se reapunta de `../../.aiw/**` a las fuentes propias. La
identidad JAME se quita en los puntos del **Bloque E del audit** (regex `RUN-JAME-`,
constantes de run y `RUN_OPERATOR_OVERRIDES`, rutas `.aiw/`, fallback de rama
`jame-parallel-audit-001`). **Un solo proyecto a propósito.**

Qué pestañas nacen vacías está **medido de antemano**
(`MEDICION-FUENTES-CONSOLA.md §F.3`) y no cuenta como defecto del port: solo el
snapshot es `required`; las otras 14 rutas van fail-soft.

## Qué se puede mirar HOY

La **consola de Cantu** (la avanzada, base del port) levanta con:

```bash
node tools/project-console/serve-project-console.mjs
```

en el puerto 8787, dentro de `projects/cantu-studio`. Tras la migración de O0 su
roadmap muestra **7 objetivos** (`records/MIGRACION-O0.md`, `D-044`). La dependencia
externa que quedó cruzando repos aparece como **advertencia**, no rojo (`D-045`).

La consola de AIW también enciende (mismo server, `project=aiw`), según
`RUN-CONSOLE-MERGE-005-001` (`completed`). El prototipo `console/` sigue levantable y
es read-only estricto, pero **ya no es camino**: es historia.

## Regla de cierre de la cabina

Cada cierre de fase termina con **el mapa** —dónde estamos, qué falta para ver la
consola, qué se habilita después— y con **qué se puede mirar**. Si un encargo no
cambia nada observable, se dice explícitamente.

## Lecturas de arranque (en orden de utilidad)

1. `projects/aiw-console/roadmap/roadmap.json` — el plan y el estado de O4/O0.
2. `context/aiw-console/records/MEDICION-FUENTES-CONSOLA.md` — **el insumo directo
   del emisor**: fuente por fuente, qué hay y qué falta.
3. `context/aiw-console/CONTRATO.md` — el contrato de la carpeta, en tres capas.
4. `context/DECISIONES.md` — de **D-039 en adelante**. **`D-048` es la última**:
   migración idéntica antes que multiconsola, prototipo retirado, emisor redefinido.
   `D-047` es el orden que `D-048` revierte (pero sus compuertas siguen vivas).
5. Records por tema, en `context/aiw-console/records/`:
   - `AUDIT-CONSOLE-O4-PHASE0.md` — acoplamientos; **Bloque E es el mapa del port**.
   - `VEREDICTO-ROADMAP-TREE-V1.md` — qué dejó el prototipo retirado.
   - `MEDICION-PROYECTOR.md` — el emisor por dentro.
   - `MIGRACION-O0.md` — la migración de O0 y el hallazgo del `.aiw/`.
   - `MEDICION-VALIDADOR-ROJO.md` — la deuda del validador (multiconsola, `O4.P3`).

## El `.aiw/` de `aiw-console` NO es estado propio

Es el área de entrega de la **proyección de AIW**: el proyector vive en este repo, lee
`../../aiw/objectives/` y escribe ahí. **La simetría con Cantu no existe** — allá
`.aiw/` sí es del proyecto. Es un supuesto tácito que **ya hizo fallar un encargo**.
Evidencia: `D-044`, `MEDICION-PROYECTOR.md §5.a`, y `MEDICION-FUENTES-CONSOLA.md`
Bloque D, que lo re-midió y lo confirmó con una sola excepción:
`views/git_history.snapshot.json` **sí** es de aiw-console (del repo, no del plan).

## Deuda medida para la multiconsola (`O4.P3`) — NO arreglada

Tres sitios del **validador de Cantu** asumen que todo `run_id` vive en el roadmap
local; con O0 fuera, eso es falso. Medidos, **no tocados** —la consola de Cantu muere
en el corte y el sitio correcto es el shell que carga todos los proyectos—:

- `CANTU-VALID:847` — `roadmapV3QueueGroupKey` mal-agrupa el run externo en `later`.
- `CANTU-VALID:1059-1069` — el DFS de ciclos salta ids externos con `?.`.
- `build-git-history-snapshot.mjs:103-108` — `deriveRunId` degrada limpio a `null`.

El rojo agudo ya se cerró (`D-045`, validador de Cantu VERDE).

## Decisiones abiertas

- **¿El validador viaja a la consola global?** Recomendación de la cabina: **que NO
  viaje.** Los tres ROMPE viven en él y desaparecen con la consola de Cantu en el
  corte; lo que protege son anchors de *esa* consola. (Bifurcación F.1 del audit,
  `D-035`.)
- **Prioridad O0 vs O4 en la cola** (de `D-046`): O0 conserva 1 `active` y 2
  `planned` de `queue_order` bajo (q10..q12) que preceden a todo O4. No urge mientras
  la cabina ordene el trabajo; **resolver antes de la paridad** (`O4.P5`), cuando la
  consola pase a ser la fuente del orden.
- **La fase de paridad cosmética** (las 9 fuentes diferidas): existe como decisión,
  **no como fase abierta**. Se abre solo si el operador la pide.

## Pendientes menores (siguen vivos)

- `aiw-console/package.json:6` se autodescribe como "verbatim fork" — falso.
- `aiw-console/projects.config.json.bak` sin trackear: borrar o commitear.
- `aiw/.aiw/project_console.snapshot.json` — copia stale (jul 2026); residuo.
