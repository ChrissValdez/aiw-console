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

> **Por qué esta reescritura.** La versión anterior decía "Siguiente: EL EMISOR
> (`O4.P2`)" y llevaba **seis piezas** siendo falsa. El cierre de registro del
> 2026-07-25 puso el papel al día antes de reordenar nada: reordenar sobre un
> roadmap desfasado es como se cometieron los errores de `D-047`.

**Estado del hilo:** O4 — **la consola global existe, enciende y renderiza dos
proyectos reales**. Entregados y cerrados: emisor (`O4.P2`), port idéntico
(`O4.P11`) con su acabado, shell multiproyecto (`O4.P3`) y Cantu emitiendo su
propia carpeta (`O4.P4`) con el ajuste del índice curado.
**Siguiente: LA FASE DE ESCRITURA (`O4.P12`)**, abierta por `D-050`.
Última actualización: 2026-07-25, al cerrar el registro (`D-049` y `D-050`).

## El plan y el estado viven en el roadmap — no aquí

    projects/aiw-console/roadmap/roadmap.json

Ésa es **la fuente del plan y del estado**; este handoff apunta ahí y no lo
duplica. Al cierre: **2 objetivos, 35 runs**, `queue_order` 1..35 denso, único y
contiguo; **10 aristas `depends_on`**, 0 colgantes. O0 "Project Console" 12 runs
(**intacto, byte-idéntico** tras el cierre: 19 844 bytes de un lado y del otro,
`queue_order` 1..12 sin tocar). O4 "Consola global" **13 fases, 23 runs — 16
`completed`, 7 `planned`**. El status de objetivo y de fase se **deriva al leer**,
no se almacena (CONTRATO §11.b/§12).

## El orden vigente de O4, posición por posición

1. `O4.P0` audit · `O4.P1` contrato y migraciones — **hechos**.
2. `O4.P2` **EMISOR** (q20) — **HECHO**. `records/EMISOR-CARPETA-PROPIA-O4-P2.md`.
3. `O4.P11` **PORT IDÉNTICO** (q21) — **HECHO**, más su **ACABADO** (q22, Docs y el
   emisor de `git_history`). `records/PORT-IDENTICO-CONSOLA-O4-P11.md` y
   `records/ACABADO-DOCS-Y-EMISOR-GIT-HISTORY.md`.
4. `O4.P3` **SHELL MULTIPROYECTO** (q23) — **HECHO**.
   `records/SHELL-MULTIPROYECTO-O4-P3.md`.
5. `O4.P4` **CANTU EMITE** (q24) — **HECHO**, más el **ajuste del índice curado**
   (q25). `records/EMISOR-CANTU-CARPETA-PROPIA-O4-P4.md` y
   `records/DOCS-INDICE-CURADO-TRANSPORTADO.md`.
6. **`O4.P12` ESCRITURA (q26, fase nueva) — ES LO QUE SIGUE.**
7. Aguas abajo: `O4.P5` paridad (q27) · `O4.P8` UI/UX (q28) · `O4.P6` AIW tercer
   proyecto (q29) · `O4.P7` corte (q30).
8. `O4.P9` transversal (q31-34, incluye el lanzador) · `O4.P10` **prototipo
   retirado** (q35: es historia).

`phase_id` es **identidad opaca** (`D-047`): `O4.P12` no significa "posición 12" —
va séptima. El orden lo cargan la posición en el array y `queue_order`.

## LO SIGUIENTE: la fase de ESCRITURA (`O4.P12`), y qué NO es

`D-050` **revierte el diferimiento de la edición** que `D-034` había fijado
("consola estable" = READ-ONLY, edición y UX después). Razón registrada: **la
consola global no puede reemplazar a la de Cantu si no puede hacer lo que la de
Cantu hace**, y el corte (`O4.P7`) es irreversible. El operador lo pidió tras el QA
visual; el **AUDIT Bloque F.3** ya había previsto exactamente esta pérdida.

**Alcance fijado: las DOS rutas de escritura ausentes, y ninguna más.**

1. **Edición del roadmap** desde la UI con flujo **dry-run (`apply:false`) →
   confirm (`apply:true`)** — el flujo que la consola de Cantu ya tiene medido.
2. **History sync** — el endpoint que regenera la historia git.

Hoy no existe ninguna de las dos, **por construcción**:
`project-console/serve.mjs` lo declara en su encabezado — "no roadmap edit
endpoint, no history sync endpoint, no snapshot rebuild, no Git command, no
watcher".

**`D-050` la registró y la ubicó; NO la diseñó.** Diseñarla es el primer trabajo de
la fase. Los **dos hechos medidos** que tendrá que resolver, ya anotados en el run
y en la decisión para que nadie los re-descubra:

- **(a) El motor de edición no está en este repo.** `roadmap-core.mjs`,
  `roadmap-plan.mjs` y `roadmap-edit.mjs` existen **SÓLO** en
  `cantu-studio/tools/roadmap/`; **`aiw-console/tools/roadmap/` NO EXISTE**. En
  Cantu, endpoint y CLI comparten la misma orquestación, así que **falta el motor
  entero**, no un endpoint encima de un motor presente.
- **(b) La ruta del roadmap canónico difiere por proyecto:** aiw-console
  `roadmap/roadmap.json`, cantu-studio `.aiw/roadmap/roadmap.json`. No se puede
  hornear una ruta; se resuelve por proyecto. **Y `.project/` es DERIVADA: NO es
  destino de escritura** — se escribe el canónico y se re-emite.

**Puerta ya preparada:** el botón *Edit roadmap* quedó **`hidden`, no borrado**,
con el elemento, el call site, el sondeo del endpoint y el modal enteros —
restaurarlo **es borrar un atributo** (`ACABADO…` Bloque C).

## Las compuertas vigentes (son `depends_on` reales en el roadmap)

- **paridad + UI/UX → corte:** `RUN-CONSOLE-CORTE-RETIRO-LOCAL-001` depende de
  `RUN-CONSOLE-PARIDAD-RENDER-CANTU-001` **y** de `RUN-CONSOLE-UI-UX-001`. **Sin
  cambio desde `D-047`**: el corte es irreversible y no procede sin la revisión de
  uso. `D-050` **no la tocó**.
- Las cadenas ya consumidas (emisor → port → shell; port → acabado; Cantu emite →
  ajuste del índice; shell → lanzador) siguen declaradas, todas del lado
  `completed`.
- **La ubicación de `O4.P12` es ORDEN, no compuerta:** no se añadió ninguna arista
  hacia paridad, AIW ni corte. Este proyecto declara `depends_on` sólo donde hay
  compuerta real (`D-046`).

Las de aprobación de operador siguen anotadas en el `full_description` de sus runs.

## Qué se puede mirar HOY

**La consola global**, desde la raíz de `projects/aiw-console`:

```bash
node project-console/serve.mjs
```

o el lanzador de doble clic `start-console.cmd` / `start-console.ps1`, que además
verifica el checkout y libera el puerto (documentado en `start-console.README.md`;
puerto 8788 por defecto, `PC_PORT` lo sustituye). Levanta con **dos proyectos
reales en el menú** —`aiw-console` y `cantu-studio`— leyendo el `.project/` de cada
uno. El server es **de solo lectura**: GET y HEAD, 405 a todo lo demás, ninguna
ruta de código que abra un archivo para escribir.

La **consola de Cantu** (el original del port) sigue levantable en
`projects/cantu-studio` con `node tools/project-console/serve-project-console.mjs`,
puerto 8787 — **y es la única de las dos que hoy puede editar**. El prototipo
`console/` sigue en disco y sigue siendo historia, no camino.

## Pendientes que son del OPERADOR, no del taller

1. **`governance/` SIN REVISIÓN.** Los **7 guardrails** y los **5 claims** de
   `governance/guardrails.json` y `governance/no_claims.json` los **autoró el
   taller** en `O4.P2` para que Governance State tuviera datos. Son **declaraciones
   de gobernanza del proyecto**, y el taller no tiene autoridad para decidir qué
   promete un proyecto: **el contenido está pendiente de revisión del operador**, y
   hasta que la tenga se está mostrando en pantalla texto que nadie con autoridad
   aprobó. El taller no los revisó en este cierre — es revisión suya, no del taller.
2. **Emisión pendiente de `.project/`.** El renombrado del record dejó **2
   referencias obsoletas** en el `.project/docs_index.json` emitido (una en
   `sources[]`, otra en `docs[]`). El índice de este repo se **escanea**, así que se
   corrigen solas en la próxima emisión; **no se re-emitió por esto** (fuera de
   alcance del cierre). Nada más quedó desalineado.
3. **Decisión abierta y nombrada: la dependencia de máquina de `git_history`.**
   `.project/git_history.json` es el **único** artefacto emitido cuyo contenido
   depende de la MÁQUINA que lo emite: las ramas locales difieren entre checkouts —
   medido, **35 commits en un clon fresco vs 42** en la máquina con ramas de
   trabajo. Registrado como hecho en CONTRATO §19; **acotarlo a `main` o aceptar la
   dependencia queda ABIERTO** y es decisión de cabina, no del taller.
4. **Prioridad O0 vs O4 en la cola** (viene de `D-046`): O0 conserva 1 `active` y 2
   `planned` de `queue_order` bajo (q10..q12) que preceden a todo O4. No urge
   mientras la cabina ordene el trabajo; **resolver antes de la paridad**
   (`O4.P5`), cuando la consola pase a ser la fuente del orden.
5. **¿El validador viaja a la consola global?** Recomendación de la cabina: **que
   NO viaje.** Los tres ROMPE viven en él y desaparecen con la consola de Cantu en
   el corte. (Bifurcación F.1 del audit, `D-035`.)
6. **La fase de paridad cosmética** (las 9 fuentes diferidas): existe como decisión,
   **no como fase abierta**. Se abre **solo si el operador la pide**.

## Dos cosas que el cierre encontró y dejó dichas, no arregladas

- **Un record cita un `run_id` que no existe.**
  `records/EMISOR-CANTU-CARPETA-PROPIA-O4-P4.md` se encabeza citando
  `RUN-CONSOLE-EMISOR-CANTU-CARPETA-PROPIA-001`; el run real de `O4.P4` es
  `RUN-CONSOLE-CANTU-EMITE-CARPETA-001`. Los `run_id` son identidad opaca (`D-047`)
  y **no se renombran para hacerle sitio a una cita**; el contenido de los records
  no se edita. Queda anotado en el `full_description` del run real.
- **El record renombrado sigue diciendo `O4.P5` en su propio H1.** El archivo pasó
  de `DOCS-INDICE-CURADO-TRANSPORTADO-O4-P5.md` a
  `DOCS-INDICE-CURADO-TRANSPORTADO.md` —el nombre ya no reclama una fase ajena—,
  pero su título interior sigue diciendo "(`O4.P5`)" porque **editar el contenido de
  un record estaba fuera de alcance**. Consecuencia visible: el título indexado en
  Docs seguirá mostrando ese `(O4.P5)` aun después de re-emitir, porque se deriva
  del H1. Arreglarlo es una decisión de cabina sobre si un record se corrige.

## Regla de cierre de la cabina

Cada cierre de fase termina con **el mapa** —dónde estamos, qué falta para ver la
consola, qué se habilita después— y con **qué se puede mirar**. Si un encargo no
cambia nada observable, se dice explícitamente. **Este cierre no cambió nada
observable**: movió papel (roadmap, decisiones, contrato, handoff y el nombre de un
record). La consola de antes y la de después del cierre son la misma.

## Lecturas de arranque (en orden de utilidad)

1. `projects/aiw-console/roadmap/roadmap.json` — el plan y el estado de O4/O0. El
   `full_description` de `RUN-CONSOLE-ESCRITURA-ROADMAP-HISTORY-001` trae el
   alcance de lo que sigue.
2. `context/DECISIONES.md` — **`D-050` es la última**: la edición deja de estar
   diferida y entra como fase nueva. `D-049` registra la decisión del envelope
   (tomada en `O4.P2`, escrita seis piezas después). `D-048` es el orden de O4 sobre
   el que ambas insertan.
3. `context/aiw-console/CONTRATO.md` — el contrato de la carpeta, tres capas. **§19
   cambió**: cinco opcionales, no dos.
4. `context/aiw-console/records/AUDIT-CONSOLE-O4-PHASE0.md` — **Bloque F.3 es el
   insumo directo de la fase de escritura**: qué se pierde en el corte y qué cubre
   el CLI.
5. Records por tema, en `context/aiw-console/records/`:
   - `SHELL-MULTIPROYECTO-O4-P3.md` — la consola multiproyecto por dentro; **D.1 es
     la tabla de anuncios de §20 por superficie**.
   - `EMISOR-CARPETA-PROPIA-O4-P2.md` — el emisor y **Bloque B, la decisión del
     envelope** que `D-049` registra.
   - `EMISOR-CANTU-CARPETA-PROPIA-O4-P4.md` y
     `DOCS-INDICE-CURADO-TRANSPORTADO.md` — cómo entra un segundo proyecto.
   - `MEDICION-VALIDADOR-ROJO.md` — la deuda del validador.

## El `.aiw/` de `aiw-console` NO es estado propio

Es el área de entrega de la **proyección de AIW**: el proyector vive en este repo,
lee `../../aiw/objectives/` y escribe ahí. **La simetría con Cantu no existe** —
allá `.aiw/` sí es del proyecto. Es un supuesto tácito que **ya hizo fallar un
encargo**. Evidencia: `D-044`, `MEDICION-PROYECTOR.md §5.a`, y
`MEDICION-FUENTES-CONSOLA.md` Bloque D. **Nota de estado:** el `.aiw/` de este repo
**hoy no existe** — así lo dejaron registrado `ACABADO…` E.3 y el record del shell;
las fuentes vivas de este proyecto están en `.project/`.

## Deuda medida para la multiconsola — NO arreglada

Tres sitios del **validador de Cantu** asumen que todo `run_id` vive en el roadmap
local; con O0 fuera, eso es falso. Medidos, **no tocados**:

- `CANTU-VALID:847` — `roadmapV3QueueGroupKey` mal-agrupa el run externo en `later`.
- `CANTU-VALID:1059-1069` — el DFS de ciclos salta ids externos con `?.`.
- `build-git-history-snapshot.mjs:103-108` — `deriveRunId` degrada limpio a `null`.

El rojo agudo ya se cerró (`D-045`, validador de Cantu VERDE).

## Pendientes menores (siguen vivos)

- `aiw-console/package.json:6` se autodescribe como "verbatim fork" — falso.
- `aiw-console/projects.config.json.bak` sin trackear: borrar o commitear.
- `aiw/.aiw/project_console.snapshot.json` — copia stale (jul 2026); residuo.
