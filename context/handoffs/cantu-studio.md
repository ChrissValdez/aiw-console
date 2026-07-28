# HANDOFF — hilo `cantu-studio` (el proyecto)

> **Este archivo es EFÍMERO y se SOBRESCRIBE.** Es el relevo del hilo de Cantu: se
> reescribe al cerrar cada sesión y se consume al abrir la siguiente. No es un
> record — no acumula historia, no se versiona por tramo. Lleva **solo** lo que la
> próxima sesión necesita para arrancar sin releerlo todo. Lo que seguirá siendo
> cierto dentro de un mes vive en el roadmap, en `CANTU_STUDIO_CONTEXT.md` o en un
> record — no aquí.

> **Disciplina de este handoff:** no afirma hechos, apunta a dónde están medidos. Si
> da una cifra, la da con su fuente. Aquí las cifras viajan con su cita y nada se
> declara "hecho" sin puntero.

> **Vive en `aiw-console` a propósito.** El hilo trabaja sobre el repo
> `projects/cantu-studio`, pero todo el contexto de gobernanza está centralizado en
> `aiw-console/context/`. Este relevo se escribe y se lee ahí.

> **Idioma.** El taller escribe en español; el **contenido del roadmap de Cantu está
> en inglés** y se cita **verbatim**, sin traducir — la regla de idioma
> (`records/CORRECCIONES-QA-CARRILES-Y-REGLA-DE-IDIOMA.md` Bloque C): el proyecto
> declara, el consumidor obedece.

**Estado del hilo:** el roadmap de Cantu está **migrado a carriles y ya partido en
implementación y documentación**, y la disciplina de proceso ya dice "un run a la
vez POR CARRIL". Los **dos encargos que este handoff da por hechos SE CORRIERON**, y
cada uno dejó su record:

- la partición → `context/aiw-console/records/PARTICION-IMPLEMENTACION-Y-DOCUMENTACION-CANTU.md` (2026-07-27);
- la disciplina → `context/aiw-console/records/DISCIPLINA-UN-RUN-POR-CARRIL.md` (2026-07-27).

**Ningún run está `active`.** Última actualización de este handoff: **2026-07-27**.

## El plan y el estado viven en el roadmap — no aquí

    projects/cantu-studio/.aiw/roadmap/roadmap.json

Ésa es **la fuente del plan y del estado** de Cantu, y es **el único roadmap** del
proyecto. Este handoff apunta ahí y no lo duplica.

Al cierre, **contado sobre ese archivo en disco el 2026-07-27**: **7 objetivos, 28
fases, 71 runs**; `queue_order` **1..71 denso, único y contiguo**; **150 aristas
`depends_on`**, de las que **1 es externa** (ver compuertas); **0 `barrier`**.
Status: **2 `completed`, 69 `planned`**, ninguno `active` ni `blocked`. Carriles:
**`DEVELOPMENT` 48 · `DOCUMENTATION` 23**.

Las mismas cifras, medidas por el validador del propio repo — el comando de lectura
que no escribe:

```bash
node tools/project-console/validate-project-console-state.mjs
```

`EXIT 0` — «7 objectives / 28 phases / **71** runs; queue groups
needs_human_decision=0 now=0 ready_next=9 later=60 history=2», citado en
`records/DISCIPLINA-UN-RUN-POR-CARRIL.md` D.1 y en
`records/PARTICION-IMPLEMENTACION-Y-DOCUMENTACION-CANTU.md` F.6. El único aviso es
el **no bloqueante de siempre**, la arista externa.

Los dos `completed` son `RUN-JAME-SMART-FORMULA-FIELD-RULE-ONLY-BASELINE-001` (q1) y
`RUN-JAME-MATHLIVE-INTEGRATION-READINESS-001` (q48) — `history=2` del validador es
justo eso.

## Los dos carriles, y cuál es el defecto

El vocabulario **lo declara el proyecto**, en `root.lanes` de su propio canónico
(patrón fijado por `D-051` en `context/DECISIONES.md`). Leído de ahí, verbatim:

| `lane_id` | `title` | `default` |
|---|---|---|
| `DEVELOPMENT` | Development — code, structure, tooling | **`true`** |
| `DOCUMENTATION` | Documentation — writing, updating, reorganising docs | — |

- **`DEVELOPMENT` es el defecto, y el defecto se resuelve AL LEER.** Los 48 runs de
  ese carril **no llevan clave `lane`** en el dato: la ausencia resuelve al default
  declarado. Sólo los 23 de `DOCUMENTATION` llevan `lane` escrito (medido en disco:
  48 sin clave, 23 con `lane: "DOCUMENTATION"`).
- **`queue_order` sigue siendo global, denso y único.** La posición dentro del
  carril **se DERIVA filtrando** y no se almacena en ninguna parte (`D-051` pieza 3).
  Por eso un run tiene dos números: su posición global y su posición en su carril.
- **Qué significan.** `DEVELOPMENT` es código, estructura y tooling; `DOCUMENTATION`
  es escribir, actualizar y reorganizar docs. La partición existe porque el roadmap
  se escribió ANTES de los carriles y empaquetaba «audit, implement **and document**»
  en un solo run, lo que impedía exactamente el paralelismo que motivó los carriles:
  documentar el componente 1 mientras se implementa el 2
  (`records/PARTICION…` encabezado y Bloque D).

## LO SIGUIENTE, EN CADA CARRIL

El primer run desbloqueado de cada carril — **desbloqueado = `planned` con todas sus
`depends_on` en `completed`**, verificado sobre `.aiw/roadmap/roadmap.json` y, para
la arista externa, sobre `aiw-console/roadmap/roadmap.json`:

### Carril `DEVELOPMENT`

    RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001
    q4 global · posición 2 del carril · fase O2.P4 · objetivo O2 · planned
    "Update the operating methodology to roadmap-first ordering"

**Su única dependencia es la externa** —
`RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`— y **está `completed`**: vive en el roadmap de
`aiw-console` (q4, fase `O0.P3`), donde su status se leyó como `completed`. Por eso
está desbloqueado.

**Matiz que hay que llevar puesto:** el validador de Cantu dice `ready_next=9`, no
10, porque **su motor no sabe resolver esa arista externa** (no tiene
`externalRunIds`; es la extensión que vive sólo en aiw-console — `D-051`, «impacto
medido sobre el tooling local», y `records/PARTICION…` F.6). La consola global sí la
resuelve. Si se prefiere el primero cuya cadena es **enteramente local**, es el
siguiente: `RUN-CANTU-NAMING-AUDIT-DISPOSITION-001` (q5, posición 3 del carril,
`depends_on` vacío, «Freeze the naming disposition map and exclusion list»).

### Carril `DOCUMENTATION`

    RUN-JAME-DOCUMENTATION-CANONICAL-MODEL-001
    q2 global · posición 1 del carril · fase O2.P2 · objetivo O2 · planned
    "Define the canonical documentation model, IA, and cadence"

`depends_on` **vacío**. Es la fundación del carril: de él cuelga
`RUN-JAME-COMPONENT-DOC-SINGLE-SOURCE-CONTRACT-001` (q3), que a su vez es
dependencia de **los 17 runs de documentación por componente** — es decir, el carril
de documentación **no puede avanzar más allá de q3 hasta que estos dos cierren**.

Los otros desbloqueados hoy, por si la cabina quiere ordenar distinto (mismo
criterio, misma medición): `DEVELOPMENT` q7, q8, q10, q11, q49, q50 ·
`DOCUMENTATION` q67.

## Las compuertas vigentes (son `depends_on` reales en el roadmap)

- **Los DOS audits de conjunto tras el split — cada carril converge en el suyo, sin
  cruce:**

  | run | `queue_order` | carril | aristas | a qué |
  |---|---|---|---|---|
  | `RUN-JAME-WEB-READINESS-EVIDENCE-001` «Audit the Web components as a whole» | 46 | `DEVELOPMENT` (posición 27) | **17** | los 17 runs de **implementación** |
  | `RUN-CANTU-WEB-DOCUMENTATION-EVIDENCE-001` «Audit the Web component documentation as a whole» | 47 | `DOCUMENTATION` (posición 20) | **17** | los 17 runs de **documentación** |

  **Cero cruces**, verificado arista por arista en disco: los 17 del primero son
  todos `DEVELOPMENT`, los 17 del segundo todos `DOCUMENTATION`. Ése es el punto
  entero de la partición (`records/PARTICION…` E.2).

- **Los 17 nuevos de documentación llevan dos aristas cada uno** — su propio run de
  implementación **y** `RUN-JAME-COMPONENT-DOC-SINGLE-SOURCE-CONTRACT-001`, el que
  define el formato del packet. 2 × 17 = 34 aristas (`records/PARTICION…` E.1).

- **Aguas abajo de los dos audits**, contado en disco:
  - `RUN-JAME-AUTHORING-WORKSPACE-UX-AUDIT-001` (q57) depende de **los dos**, más de
    `RUN-JAME-SLIDE-READINESS-EVIDENCE-001`. La arista a la mitad de documentación se
    añadió en la partición porque su propio texto la nombra.
  - `RUN-JAME-HTML-PAYLOAD-MEASUREMENT-001` (q58), `RUN-JAME-PRODUCTION-LESSON-VALIDATION-001`
    (q63) y `RUN-CANTU-INTERNAL-CODE-RENAME-001` (q68) dependen **sólo** de la mitad
    de implementación (más Slide). Sin cambio, con la razón en `records/PARTICION…` E.3.

- **La arista externa, legal y única:**
  `RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` →
  `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`, que vive en el roadmap de `aiw-console`. Es
  el aviso no bloqueante del validador y **es la de siempre**, no una nueva.

- **Ningún `barrier` aplicado.** Medido: **0 ocurrencias** en el canónico. Los
  candidatos están medidos y siguen **abiertos** en
  `records/MIGRACION-CANTU-A-CARRILES.md` Bloque E — con sus efectos contados, uno
  por uno. Es decisión del operador, no del taller.

## La disciplina de ejecución paralela (ya actualizada, es la vigente)

Escrita en `CANTU_STUDIO_CONTEXT.md` («Process discipline», en inglés) y en
`cantu-studio/AGENTS.md` y `cantu-studio/CLAUDE.md` (regla 7 del pipeline más la
subsección «Disciplina de ejecución paralela», en español). Los tres sitios los
escribió `records/DISCIPLINA-UN-RUN-POR-CARRIL.md`, Bloques B y C.

1. **Un run a la vez POR CARRIL.** Los carriles corren en paralelo; un mismo carril
   nunca corre dos. Sustituye a la regla pre-carril «ONE run at a time. Commit +
   confirm a clean git log BEFORE issuing the next ticket.»
2. **Nunca dos runs simultáneos tocando el MISMO archivo.** Esa mitad **no se borró**:
   dos carriles son paralelos **sólo si sus superficies de escritura son disjuntas**.
   Si dos runs tocarían el mismo archivo van **en serie, aunque estén en carriles
   distintos**. El carril no autoriza la colisión.
3. **El encargo no cierra su propio run.** No cambia status y **no re-emite
   `.project/`**: **declara** el status en el que su run debe quedar. **Lo cierra el
   operador desde la consola global**, cuyo endpoint de escritura escribe el canónico
   y re-emite `.project/` de forma atómica. **La consola es el punto de
   serialización** — el único escritor, aunque haya N talleres.
4. **El operador es el único que ejecuta git**, así que los commits ya están
   serializados ahí: **un ticket no espera un git log limpio** antes de que se emita
   el siguiente.
5. **La suite completa no se corre en dos talleres a la vez** — uno escribe mientras
   el otro lee, y eso produce fallos fantasma.

Que esto funciona ya está medido, y por accidente: las dos sesiones del 2026-07-27
corrieron a la vez con superficies disjuntas y no se pisaron
(`records/DISCIPLINA…` E.1 y `records/PARTICION…` Bloque H, que se citan la una a la
otra).

## Pendientes que son del OPERADOR, no del taller

1. **`.project/` de Cantu está DESFASADO, a propósito.** Los seis artefactos
   conservan `mtime` de las **17:43** del 2026-07-27, y su `.project/roadmap.json`
   trae **53 runs** donde el canónico ya trae **71** (contado en los dos archivos).
   **La consola mostrará 53 hasta que el operador haga su próxima escritura desde
   ella**, que re-emite sola. No hay nada que arreglar; hay que saberlo antes de
   mirar la consola y creer que la partición no ocurrió
   (`records/PARTICION…` F.5 e I.1).
2. **Trabajo sin commitear en los dos repos.** `cantu-studio`: `.aiw/roadmap/roadmap.json`,
   `AGENTS.md` y `CLAUDE.md` modificados sobre HEAD `b4e8ed0f`. `aiw-console`:
   `context/cantu-studio/CANTU_STUDIO_CONTEXT.md` modificado y los dos records nuevos
   sin trackear, sobre HEAD `897c710`. Leído con `git status --porcelain`, **sólo
   lectura**. Git es del operador.
3. **La arista del #q63 sin decidir.** `RUN-JAME-PRODUCTION-LESSON-VALIDATION-001`
   nombra «Web, documentation, and Slide readiness evidence» y su arista de
   documentación apunta al **modelo canónico**, no a la evidencia de documentación de
   los componentes Web, que hasta la partición no existía como run. Se dejó como
   estaba porque su texto no la nombra. Si el operador la quiere, es **una** operación
   `set-deps --add-dep` (`records/PARTICION…` E.3).
4. **El `full_description` de los 17 runs de documentación es UNA sola frase.** Es
   fiel al encargo —un reparto no inventa contenido—, pero cuando
   `RUN-JAME-COMPONENT-DOC-SINGLE-SOURCE-CONTRACT-001` defina el contrato de packet,
   esos 17 querrán texto propio: qué secciones, qué evidencia, qué QA
   (`records/PARTICION…` I.4).
5. **Las oraciones de marco de la mitad de documentación del audit de conjunto** son
   lo único **redactado** y no sólo repartido en toda la partición; se declara por si
   el operador lo quiere de otra manera (`records/PARTICION…` D.2).
6. **Los barriers**, con sus efectos ya contados (`records/MIGRACION-CANTU-A-CARRILES.md`
   E.1/E.2). El de más alcance sería el de `RUN-CANTU-NAMING-AUDIT-DISPOSITION-001`:
   barraría **41 runs** que hoy no lo alcanzan por dependencia — «nada avanza hasta
   que se apruebe el mapa de nombres». Es calendario, no contrato.
7. **Slide sigue sin paridad, y es correcto.** Sus runs por componente aún no
   existen: son un placeholder hasta que la reproducción del sandbox produzca el
   inventario real. La paridad de Slide sale sola cuando se creen, aplicando la misma
   forma que la partición Web (`records/PARTICION…` I.5).
8. **La regla 8 de `AGENTS.md`/`CLAUDE.md`** («No se implementan componentes en
   paralelo») quedó **intacta por decisión de la cabina**, tratada como alcance de
   componentes y no como scheduling. Si algún día se lee como scheduling, contradirá
   los carriles igual que lo hacía la 7 (`records/DISCIPLINA…` E.2).
9. **Editar el canónico de Cantu es de la consola global, no del tooling local.** El
   motor de Cantu **tolera** `lanes`/`lane`/`barrier` pero **no los adopta** (no
   resuelve carril, no deriva defecto, no lee barrier, no tiene operación que los
   escriba — `records/MIGRACION-CANTU-A-CARRILES.md` A.1), y además no sabe resolver
   la arista externa. La decisión de actualizar ese tooling o aceptar el arreglo hasta
   el corte está **abierta** desde `D-051`.

## Punteros

- **Su contexto de gobernanza:**
  `projects/aiw-console/context/cantu-studio/CANTU_STUDIO_CONTEXT.md` — en inglés,
  lleva gobernanza y peligros, **no lleva estado**. Es la lectura de arranque del
  hilo. *Aviso medido:* su tabla de «dónde viven los hechos» cita `SESSION_START.md`
  y `docs/ops/JAME_OPS_STATE.md`, y **ninguno de los dos existe hoy** en el repo
  (buscados por ruta y por barrido del workspace). No es urgente; es un puntero que
  falla si se sigue.
- **Reglas dentro del repo:** `cantu-studio/AGENTS.md` (autoridad del repositorio) y
  `cantu-studio/CLAUDE.md`, los dos en español, los dos con la regla 7 ya actualizada.
- **Su roadmap canónico:** `projects/cantu-studio/.aiw/roadmap/roadmap.json`. **El
  único.** `.project/` es **derivada: NO es destino de escritura** — se escribe el
  canónico y se re-emite.
- **Las decisiones que gobiernan los carriles:** `context/DECISIONES.md`, **`D-051`**
  (carriles, barrier, posición derivada) y `D-047` (identidad inmutable: `run_id`,
  `phase_id`, `objective_id` no se renombran nunca; los runs nuevos nacen
  `RUN-CANTU-`, los viejos conservan `RUN-JAME-`).
- **Los records de este tramo**, en `context/aiw-console/records/`:
  `MIGRACION-CANTU-A-CARRILES.md` (el reparto de los 53 en dos carriles, y los
  candidatos a barrier medidos) · `PARTICION-IMPLEMENTACION-Y-DOCUMENTACION-CANTU.md`
  (los 18 pares, las 22 operaciones, los invariantes) ·
  `DISCIPLINA-UN-RUN-POR-CARRIL.md` (la regla nueva y dónde se escribió).

### Cómo levantar la consola global para verlo

Desde la raíz de `projects/aiw-console`:

```bash
node project-console/serve.mjs
```

o el lanzador de doble clic `start-console.cmd` / `start-console.ps1`
(`start-console.README.md`). Puerto **8788** por defecto, `PC_PORT` lo sustituye.
Cantu está registrado con la clave **`cantu-studio`** en
`project-console/projects.json`, apuntando a `../../cantu-studio`; la consola lee su
**`.project/`**, no su canónico — de ahí el pendiente 1.

Esa consola es **la única que puede editar el canónico de Cantu** y **el punto de
serialización** de la disciplina: su endpoint de escritura es
`POST /projects/<key>/__project-console/roadmap/edit`, con flujo **dry-run
(`apply:false`) → confirm (`apply:true`)**, y re-emite `.project/` a continuación
(declarado en el encabezado de `project-console/serve.mjs`).

La **consola local de Cantu** sigue levantable en `projects/cantu-studio` con
`node tools/project-console/serve-project-console.mjs`, puerto 8787 — pero para el
canónico ya no es la herramienta: ver el pendiente 9.
