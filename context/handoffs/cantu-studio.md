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

**Última actualización de este handoff: 2026-08-01.** Reescrito entero: las cifras del
relevo anterior eran del 2026-07-27 y ninguna sigue en pie. Todas las de abajo se
midieron en disco el 2026-08-01 contra
`projects/cantu-studio/.aiw/roadmap/roadmap.json` (md5 `6d13a7c617801b4b197b6075f418cbac`)
y contra el validador por la vía que no escribe.

---

## QUÉ SIGUE — lo primero

El ciclo de componentes se paró a propósito para arreglar el mapa. **El mapa ya está
arreglado**: el carril `DOCUMENTATION` está rediseñado
(`records/REDISENO-CARRIL-DOCUMENTATION-CANTU.md`) y los 46 pendientes están
clasificados (`records/CLASIFICACION-DE-LOS-46-RUNS-PENDIENTES-CANTU.md`). **El ciclo
se reanuda.**

**Hay 20 runs elegibles hoy** — `planned` con **todas** sus `depends_on` en `completed`,
contado sobre el canónico. El validador da `ready_next=20`, que coincide. Títulos
**verbatim del canónico, en inglés**:

| `#N` | carril | `run_id` | título (verbatim) | fase | `closure_mode` |
|---|---|---|---|---|---|
| #17 | `DOCUMENTATION` | `RUN-CANTU-DOCUMENTATION-DEEP-AUDIT-001` | "Audit the documentation corpus and produce the disposition list" | O2.P1 | SEMI_ATTENDED |
| #18 | `DEVELOPMENT` | `RUN-JAME-WEB-LIST-REVALIDATION-001` | "Audit and implement the List component" | O1.P1C | ATTENDED |
| #19 | `DEVELOPMENT` | `RUN-JAME-WEB-ICONLIST-REVALIDATION-001` | "Audit and implement the IconList component" | O1.P1C | ATTENDED |
| #20 | `DEVELOPMENT` | `RUN-JAME-WEB-CARD-REVALIDATION-001` | "Audit and implement the Card component" | O1.P1C | ATTENDED |
| #21 | `DEVELOPMENT` | `RUN-JAME-WEB-VIDEO-REVALIDATION-001` | "Audit and implement the Video component" | O1.P1C | ATTENDED |
| #22 | `DEVELOPMENT` | `RUN-JAME-WEB-NARRATIVE-REPAIR-001` | "Audit and implement the Narrative component" | O1.P1C | ATTENDED |
| #23 | `DEVELOPMENT` | `RUN-JAME-WEB-CALLOUT-REPAIR-001` | "Audit and implement the Callout component" | O1.P1C | ATTENDED |
| #24 | `DEVELOPMENT` | `RUN-JAME-WEB-DETAILS-REPAIR-001` | "Audit and implement the Details component" | O1.P1C | ATTENDED |
| #25 | `DEVELOPMENT` | `RUN-JAME-WEB-ARITHMETIC-AUDIT-AND-REPAIR-001` | "Audit and implement the Arithmetic component" | O1.P2 | ATTENDED |
| #26 | `DEVELOPMENT` | `RUN-JAME-RULE-COMPONENT-REPAIR-AND-ACTIVATION-001` | "Audit and implement the Rule component" | O1.P2 | ATTENDED |
| #27 | `DEVELOPMENT` | `RUN-JAME-WEB-SPLIT-SCOPE-AND-REPAIR-001` | "Decide scope and enable the Split component" | O1.P1C | ATTENDED |
| #28 | `DEVELOPMENT` | `RUN-JAME-WEB-TABLE-AUDIT-AND-REPAIR-001` | "Audit and implement the Table component" | O1.P1C | ATTENDED |
| #29 | `DEVELOPMENT` | `RUN-JAME-WEB-CONCEPTGRID-AUDIT-AND-REPAIR-001` | "Audit and implement the ConceptGrid component" | O1.P2 | ATTENDED |
| #30 | `DEVELOPMENT` | `RUN-JAME-WEB-HIERARCHY-AUDIT-AND-REPAIR-001` | "Audit and implement the Hierarchy component" | O1.P2 | ATTENDED |
| #31 | `DEVELOPMENT` | `RUN-JAME-WEB-TIMELINE-AUDIT-AND-REPAIR-001` | "Audit and implement the Timeline component" | O1.P2 | ATTENDED |
| #32 | `DEVELOPMENT` | `RUN-JAME-WEB-VISUAL-AUDIT-AND-REPAIR-001` | "Audit and implement the Visual component" | O1.P1C | ATTENDED |
| #33 | `DEVELOPMENT` | `RUN-CANTU-COMPONENT-GUIDE-PACKET-WIRING-001` | "Unify the Component Guide mechanism and fix its template" | O2.P3 | ATTENDED |
| #41 | `DEVELOPMENT` | `RUN-JAME-FORMULA-INSERTER-INTEGRATION-001` | "Verify global Formula Inserter integration after component revalidation" | O5.P3 | SEMI_ATTENDED |
| #42 | `DEVELOPMENT` | `RUN-CANTU-SLIDE-GRID-SYSTEM-001` | "Audit and define the Slide grid system" | O3.P1 | ATTENDED |
| #58 | `DEVELOPMENT` | `RUN-JAME-PROJECT-CONSOLE-DOCS-V3-001` | "Update the canonical Docs view to render authority and consume packets by contract" | O2.P3 | UNATTENDED |

**19 son `DEVELOPMENT`, 1 es `DOCUMENTATION`.** El carril `DOCUMENTATION` tiene
**exactamente un** elegible, el **#17**; sus otros 7 pendientes esperan a runs de
implementación (los cuatro lotes #35–#38 esperan sus componentes; #45 espera Slide
sandbox parity; #59 espera al propio #17; #61 espera a #60). Medido arista por arista.

`DEVELOPMENT` es el carril **por defecto** y **se resuelve al leer**: los runs de ese
carril **no llevan clave `lane`**. Sólo `DOCUMENTATION` va escrito (`D-051` en
`context/DECISIONES.md`).

---

## El estado del roadmap, medido de primera mano

    projects/cantu-studio/.aiw/roadmap/roadmap.json

**La fuente del plan y del estado**, y **el único roadmap** del proyecto. Contado sobre
ese archivo el **2026-08-01**:

| | |
|---|---|
| objetivos / fases / runs | **7 / 28 / 63** |
| status | **17 `completed`, 46 `planned`** · ninguno `active` ni `blocked` |
| aristas `depends_on` | **126**, de las que **1 es externa** |
| `queue_order` | **1..63 denso, único y contiguo** |
| carriles | `DEVELOPMENT` **52** (por ausencia de clave) · `DOCUMENTATION` **11** |
| `barrier` | **0 ocurrencias** |

Las mismas cifras por el validador del propio repo — el comando de lectura que no
escribe, corrido desde `projects/cantu-studio`:

```bash
node tools/project-console/validate-project-console-state.mjs
```

`EXIT 0` — «7 objectives / 28 phases / **63** runs; queue groups
needs_human_decision=0 now=0 **ready_next=20** later=26 **history=17**». Único aviso, el
**no bloqueante de siempre**: la arista externa
`RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` →
`RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`, que vive en el roadmap de `aiw-console`.
**Ese run ya está `completed` en Cantu**, así que la arista ya no gobierna nada del
orden — pero **el aviso sigue**, y sigue costando (ver deriva).

Los **17 `completed`** son `#1`–`#16` más `#40`
(`RUN-JAME-MATHLIVE-INTEGRATION-READINESS-001`). Son los diecisiete runs que cerró la
sesión del 2026-07-31/08-01.

---

## La clasificación — qué puede delegarse y qué es cabina

**`closure_mode` NO está en disco: se deriva al leer**, de `correctness_model` +
`severity`, y después la guarda de `external_effects`, que sólo sube
(`records/CLASIFICACION-EMISOR-Y-CONSOLA.md` §2.2). Los 46 pendientes llevan los seis
campos almacenados, todos con `classified_at: 2026-08-01T05:45:24.479Z`.

Cifras producidas **ejecutando** `deriveSeverity()`/`deriveClosureMode()` de
`tools/classification/classification.mjs` sobre el canónico, no copiando tabla:

| `closure_mode` | runs pendientes | `DEVELOPMENT` | `DOCUMENTATION` |
|---|---:|---:|---:|
| **ATTENDED** | **23** | 23 | 0 |
| **SEMI_ATTENDED** | **17** | 10 | 7 |
| **UNATTENDED** | **6** | 5 | 1 |
| **Total** | **46** | 38 | 8 |

Severidad derivada, mismo universo: CRITICAL **15** · MAJOR **9** · MODERATE **22** ·
MINOR **0**. Coincide run a run con
`records/CLASIFICACION-DE-LOS-46-RUNS-PENDIENTES-CANTU.md` §4.3.

**Los 23 `ATTENDED` son cabina.** Las familias que agrupan estos 46 están en
`records/FAMILIAS-DE-RUNS-PENDIENTES-CANTU.md` (trece familias; dos concentran 19 runs),
y la tolerancia del criterio está en `records/TOLERANCIA-DE-CLASIFICACION-EN-CANTU.md`.

---

## LAS DECISIONES DEL OPERADOR QUE SIGUEN ABIERTAS

Se listan, no se resuelven. **Sin recomendación del taller: son suyas.**

1. **El contrato de fuente única contradice la decisión del operador.**
   `docs/docs_management/COMPONENT-DOC-SINGLE-SOURCE-CONTRACT.md` §5 dice, verbatim:
   «Both consumers render the same packet», y fija como *target* de la Guía «Renders the
   canonical packet; keeps no inline per-component content and no own status». Se decidió
   que son **dos fuentes con audiencias distintas**, y el rediseño hace lo contrario a
   propósito. Enmendar el contrato quedó fuera de alcance.
   → `records/REDISENO-CARRIL-DOCUMENTATION-CANTU.md` §17.1 · §5 verificada en disco.

2. **No existe contrato de contenido de autor para la Guía, ni run que lo cree.** La
   medición lo recomendaba como run de `DOCUMENTATION` temprano; el encargo no lo pidió.
   El run que escribe la Guía (`#34`, "Write the Component Guide content") se apoya en la
   plantilla que fija `#33`, que es **runtime, no norma documental**.
   → `records/REDISENO-CARRIL-DOCUMENTATION-CANTU.md` §17.2 y §6.2.

3. **El `success` de `timeline.detailsVariant` no es token de paleta y resuelve al
   fallback en silencio.** La recomendación medida es **o** promover los alias
   (`success`/`warning`/`error`/`info`) a tokens reales **o** sacar `success` del enum,
   «porque la mezcla actual manda un valor seleccionable al fallback». Medido: el
   compilador **nunca llama al resolvedor de paleta** para `detailsVariant`; `success`,
   `def` y `ctx` caen todos en el mismo `#5E81AC` hardcodeado.
   → `records/CONTRATO-COLOR-Y-PALETA-CANTU.md` decisión abierta 4, §D.2 y Bloque H.3 ·
   `records/INVENTARIO-COLOR-Y-MATH-DE-COMPONENTES-WEB-CANTU.md` hallazgo 3.

4. **La compuerta del compilador.** Segunda compuerta cerrada **dentro del compilador**,
   además de la del schema, sobre `split`, `timeline` y el badge de `table`. Verificada en
   disco en `tools/author-lite/compiler-api/services/compiler.js`: `:66` +`:579`
   (`SPLIT_VARIANT_VALUES = new Set(['ctx','focus','wrn'])` — **`split` está en el techo
   con tres valores**), `:985` (timeline) y `:481-483` (badge de table, que lanza). Y
   deja a **cinco componentes** —`callout`, `rule`, `table`, `details`, `conceptGrid`—
   emitiendo **sólo el token id**, que el motor Web mapea contra un mapa fijo de doce
   claves no derivado de la paleta del autor: **descartan el hex en silencio**.
   **Aunque el operador elija hoy, la decisión no basta: falta la compuerta.**
   → `records/UNIFICACION-SELECTOR-COLOR-WEB-Y-COMPUERTA-DEL-COMPILADOR-CANTU.md`
   §1 hallazgo 1, §6.1 y la tabla de §229-231.

5. **Los seis huecos abiertos del rediseño**, en `records/REDISENO-CARRIL-DOCUMENTATION-CANTU.md`
   §17 — los dos primeros son los puntos 1 y 2 de arriba; los otros cuatro:
   - **La frontera de idioma no está declarada en ninguna parte.** Los packets son inglés
     sin acentos por BLUEPRINT §2; la Guía es español acentuado. Los textos lo dicen en
     prosa, **ninguna norma lo fija**.
   - **Cinco lugares de la Definition of Done quedan desfasados** y sin tocar (§4.3).
   - **El `run_id` del run reencuadrado de la Guía sigue diciendo `PACKET-WIRING`** (§6.4)
     — identidad inmutable por `D-047`, así que es decisión, no bug.
   - **`#61` "Sweep the legacy documentation paths" y los cuatro lotes comparten
     superficie**: los diecisiete packets. Van en serie por `queue_order`, así que la
     regla 7 se cumple, pero **el solape de alcance sigue existiendo**.

---

## LA DERIVA CONOCIDA Y SIN DUEÑO

Se nombra; **no se toca**. Cada una con su fuente.

1. **La suite de `cantu-studio` NO está verde: 4 fallos previos.** Declarados en
   `records/TOLERANCIA-DE-CLASIFICACION-EN-CANTU.md` §7 — 173 tests, 169 pass, **4 fail**
   (`clearProgress` 1, `createPhase` 2, `deletePhase` 1). Misma causa en los cuatro: esos
   tests copian el canónico real y `checkInvariants` marca la dependencia huérfana
   `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001` — **la misma arista del aviso no bloqueante**.
   *[NO VERIFICADO en esta sesión: correr suites está fuera de alcance de este encargo;
   la cifra es la de aquel record, no una medición de hoy.]*

2. **Mojibake en los mensajes de error de los dos schemas.** Medido hoy en disco,
   contando líneas con marcador (`Ã`, `Â`, `â`, `�`):
   `tools/author-lite/compiler-api/schemas/draftSchema.js` → **32 líneas**;
   `tools/author-lite/editor-ui/src/schemas/draftSchema.js` → **23 líneas**. Son mensajes
   que **ve el autor**. La ironía medida: el script guardián vigila exactamente esos
   cuatro marcadores, pero **sólo sobre `ComponentGuide.jsx` y `blockCatalog.js`** — las
   dos superficies limpias — y no sobre los dos schemas.
   → `records/MEDICION-SUPERFICIE-DOC-COMPONENTES-WEB-Y-FORMA-DEL-PACKET-CANTU.md` §4.3.

3. **Un puntero de ruta muerto, con su unidad.** `docs/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md`
   **no existe** (la ruta real es `docs/archive/author-lite/components/…`). Medido hoy
   sobre todo `cantu-studio`, excluidos `.git` y `node_modules`: **462 apariciones en 112
   archivos — de UN SOLO puntero**. La unidad es *apariciones*, no *rutas distintas*: las
   rutas distintas muertas son **496** en el corpus documental entero y **83** en el vivo.
   → `records/CIERRE-HUECOS-ESTANDAR-DOC-IDIOMA-Y-ASERCIONES-CANTU.md` §6.1.

4. **403 líneas de documentación inalcanzables en el catálogo de bloques.** En
   `tools/author-lite/editor-ui/src/features/editor/constants/blockCatalog.js` (1 176
   líneas), tres campos `docs:`: `list` `:240-544` = 305 · `columns` `:952-1033` = 82 ·
   `header` `:146-161` = 16 → **403**. Rangos verificados hoy. Son inalcanzables porque la
   Guía no lee un solo packet: **0 referencias a `docs/components/` en todo
   `editor-ui/src`**, medido hoy.
   → mismo record, §6.2.

5. **`AGENTS.md` está en español siendo artefacto interno, y declara un número de runs
   caducado.** Verificado hoy: 671 líneas, íntegramente en español; su línea 70 dice «Hoy
   contiene 7 objectives, 28 phases y **72 runs**» y su línea 73 «hoy **49 de 72** runs no
   declaran `lane` y **23** declaran `DOCUMENTATION`». El canónico trae **63 runs**, **52
   sin clave** y **11 `DOCUMENTATION`**. **Las tres cifras están caducadas.**
   → `records/CIERRE-HUECOS-ESTANDAR-DOC-IDIOMA-Y-ASERCIONES-CANTU.md` §7 hallazgo 4.

6. **`component_status.json` tiene 16 componentes frente a 17 packets.** Verificado hoy:
   `docs/components/web/` trae **17** `.md`; `.aiw/state/component_status.json` trae
   **16 ids** y **falta `columns`**, mientras `COLUMNS.md` existe. El validador lo reporta
   como «Component statuses: 16». Los universos «proyección de status» y «packets» **no
   coinciden**.
   → `records/CONTRATO-FUENTE-UNICA-DOC-COMPONENTES-CANTU.md` Bloque I.6.

---

## LA DISCIPLINA QUE HAY QUE CONOCER

1. **El hilo paralelo de `aiw-console` escribe en el mismo repo.** El `git add` va con
   los nombres **uno a uno**, **nunca `-A`**. Pasar la lista entera de `git status` a
   `git add` es «`-A` disfrazado»: el árbol puede traer, y trajo, trabajo ajeno a mitad de
   sesión. → `context/handoffs/aiw-console.md` §13.3.
2. **Tras actualizar el emisor, reiniciar el PROCESO de la consola**, no sólo el
   navegador: **Node cachea los módulos al arrancar** y recargar el navegador no vuelve a
   leer el disco. Costó una vuelta entera de QA. → ídem §13.1.
3. **Nadie clasifica más hasta que el piloto de `aiw-console` entregue su procedimiento.**
   Regla vigente, verbatim: «Cada hilo audita y estabiliza su roadmap. Nadie clasifica
   hasta que el piloto de aiw-console entregue el procedimiento. El piloto corre cuando
   los tres roadmaps estén estables.» → ídem §8. **La clasificación de Cantu ya está
   hecha y es PREVIA a esa regla**: no la viola y no se re-hace.
4. **Un run a la vez POR CARRIL**, y **nunca dos runs simultáneos tocando el MISMO
   archivo** — el carril no autoriza la colisión. **El encargo no cierra su propio run ni
   re-emite `.project/`**: declara el status y lo cierra el operador desde la consola
   global, que es el punto de serialización. → `records/DISCIPLINA-UN-RUN-POR-CARRIL.md`
   Bloques B y C; escrito en `CANTU_STUDIO_CONTEXT.md`, `AGENTS.md` y `CLAUDE.md`.

---

## Punteros

- **Contexto de gobernanza:** `context/cantu-studio/CANTU_STUDIO_CONTEXT.md` — en inglés,
  gobernanza y peligros, **no lleva estado**. Lectura de arranque del hilo.
- **Reglas dentro del repo:** `cantu-studio/AGENTS.md` (autoridad del repositorio) y
  `cantu-studio/CLAUDE.md` — ver deriva 5 antes de creerle una cifra.
- **Roadmap canónico:** `projects/cantu-studio/.aiw/roadmap/roadmap.json`. **El único.**
  `.project/` es **derivada: NO es destino de escritura** — se escribe el canónico y se
  re-emite con el botón *Re-emit `.project/`* de la consola global
  (`records/REEMISION-MANUAL-PROJECT-O4-P14.md`).
- **Decisiones que gobiernan:** `context/DECISIONES.md` — **`D-051`** (carriles, barrier,
  posición derivada) y **`D-047`** (identidad inmutable: `run_id`, `phase_id`,
  `objective_id` no se renombran nunca).
- **Los records de esta sesión**, en `context/aiw-console/records/`: el estándar de
  documentación → `CIERRE-HUECOS-ESTANDAR-DOC-IDIOMA-Y-ASERCIONES-CANTU.md` y
  `MEDICION-SUPERFICIE-DOC-COMPONENTES-WEB-Y-FORMA-DEL-PACKET-CANTU.md` · el rediseño del
  carril → `REDISENO-CARRIL-DOCUMENTATION-CANTU.md` · la tolerancia y la clasificación →
  `TOLERANCIA-DE-CLASIFICACION-EN-CANTU.md`, `FAMILIAS-DE-RUNS-PENDIENTES-CANTU.md` y
  `CLASIFICACION-DE-LOS-46-RUNS-PENDIENTES-CANTU.md`.
- **Este relevo** lo escribió `records/RELEVO-CANTU-AL-CIERRE-2026-08-01.md`, que declara
  qué se dejó fuera y por qué.

### Cómo levantar la consola global

Desde la raíz de `projects/aiw-console`:

```bash
node project-console/serve.mjs
```

Puerto **8788** por defecto, `PC_PORT` lo sustituye. Cantu está registrado con la clave
`cantu-studio` en `project-console/projects.json`. **Es la única que puede editar el
canónico de Cantu**, con flujo dry-run (`apply:false`) → confirm (`apply:true`).
