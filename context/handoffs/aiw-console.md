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
> como «lo siguiente» el *análisis de AIW*, y decía expresamente que **no** era
> `O4.P6` ejecutada. Eso ya ocurrió y desbordó su propio marco: salieron dos
> mediciones, un documento de decisión, **cinco entradas de canónico
> (`D-052`..`D-056`)** y **seis runs ejecutados — del roadmap de AIW, no de éste**.
> Un hilo que arrancara con aquel texto propondría trabajo hecho. Además su
> instrucción de apertura («pulsar *Re-emit `.project/`*, la consola pinta 42»)
> está **cumplida**: medido hoy, `.project/roadmap.json` de este repo trae **45
> runs** (`generated_at` `2026-07-28T09:33:31.914Z`), y el canónico también.

**Estado del hilo:** O4 — la consola global existe, enciende, renderiza dos
proyectos reales y escribe. **Este hilo NO ejecutó ningún run de su propio
roadmap en esta sesión**: el trabajo entregado fue todo del roadmap de AIW.
**Ningún run está `active` en ninguno de los dos objetivos.**
Última actualización: **2026-07-28**.

---

## ⚠ LA FRONTERA — leer antes de escribir un solo byte

**Hay DOS hilos paralelos abiertos además de éste:** `aiw` (en este mismo Project,
cerrando su `O2`) y `cantu-studio` (relevo propio en
`context/handoffs/cantu-studio.md`). Los tres escriben records en
`context/aiw-console/records/`. Rige la disciplina de carriles
(`records/DISCIPLINA-UN-RUN-POR-CARRIL.md`): superficies de escritura disjuntas.

**1. AIW se sigue trabajando en el OTRO hilo hasta que cierre su `O2`.** Le quedan
cuatro runs, medidos hoy en `aiw/roadmap/roadmap.json`, títulos verbatim:

| `#` | `run_id` | Título |
|---:|---|---|
| 18 | `RUN-AIW-DOCS-CONVENTION-001` | Decide what counts as AIW documentation, where it lives and how it is classified |
| 19 | `RUN-AIW-CURATED-DOCS-INDEX-001` | Curate AIW's docs index by hand |
| 20 | `RUN-AIW-MARKDOWN-RETIREMENT-001` | Retire roadmap_AIW_temp.md and publish the numbering equivalence table |
| 21 | `RUN-AIW-THIRD-PROJECT-001` | Bring AIW into the console as the third rendered project |

**2. `aiw-console/roadmap/roadmap.json` es ARCHIVO DISPUTADO mientras eso dure.**
El `#21` de AIW es trabajo de consola y aterriza aquí. **Dos encargos que toquen el
mismo archivo van EN SERIE aunque sean de carriles distintos.** Antes de escribir
el canónico, comprobar que el hilo de AIW no lo tiene.

**3. Las OCHO citas rotas — este hilo NO las repara todavía.** Ocho runs de **este**
canónico citan el Markdown de AIW con el token `RM-AIW:<línea>`; el `#20` de AIW lo
declara en su `full_description` («eight runs in aiw-console's canonical cite this
Markdown BY LINE NUMBER, and all eight are already broken by the same eight-line
offset»). **Verificado hoy leyendo los 45 runs del canónico y el Markdown**: son
ocho runs, **diez citas**, y el desfase es **exactamente +8 líneas en las diez**
(p. ej. `RM-AIW:114-120` → el texto «SECUENCIA ACORDADA (D-034)» está en la 122).

| `#` | `run_id` | Título verbatim | Citas |
|---:|---|---|---|
| 13 | `RUN-CONSOLE-AUDIT-PHASE0-001` | Audit / Phase 0 of the migration to the global console | `RM-AIW:114-120` |
| 23 | `RUN-CONSOLE-SHELL-MULTIPROYECTO-001` | Multi-project shell reading aiw-console only | `RM-AIW:152` |
| 24 | `RUN-CONSOLE-CANTU-EMITE-CARPETA-001` | Cantu emits the new .project/ folder alongside .aiw | `RM-AIW:133` |
| 35 | `RUN-CONSOLE-PARIDAD-RENDER-CANTU-001` | Global console renders Cantu (parity, operator QA) | `RM-AIW:149-151` |
| 36 | `RUN-CONSOLE-UI-UX-001` | UI/UX of the global console | `RM-AIW:119-120`, `RM-AIW:157` |
| 37 | `RUN-CONSOLE-AIW-TERCER-PROYECTO-001` | AIW as a third project (roadmap Markdown → JSON v3) | `RM-AIW:134` |
| 38 | `RUN-CONSOLE-CORTE-RETIRO-LOCAL-001` | Cutover: retirement of Cantu's local console and deletion of .aiw | `RM-AIW:155-157`, `RM-AIW:151` |
| 42 | `RUN-CONSOLE-DIGEST-CABINA-001` | Digest for the cockpit | `RM-AIW:148` |

Su reparación **nace como run propio de este roadmap, dependiendo del `#20` de
AIW**: arista externa entre proyectos, **legal por `CONTRATO §10.d` Regla 2**
(«externo es LEGAL; colgante sigue siendo malformado»). Retirar el Markdown antes
convierte un número de línea equivocado en un archivo ausente.

**4. Este hilo NO escribe en `aiw`.** Un hallazgo sobre AIW se **NOMBRA** y se pasa
a su hilo — sin ticket y sin recomendación de arreglo.

---

## El plan y el estado viven en el roadmap — no aquí

    projects/aiw-console/roadmap/roadmap.json

Medido sobre ese archivo hoy: **2 objetivos, 19 fases, 45 runs**; `queue_order`
**1..45 denso, único y contiguo**; **19 aristas `depends_on`, 0 colgantes**.
**36 `completed`, 9 `planned`, 0 `active`.** El status de objetivo y de fase se
**deriva al leer**, no se almacena (`CONTRATO §11.b`/`§12`).

- **O0 «Project Console»** — 3 fases, **12 runs**: 9 `completed`, **3 `planned`**
  (`#10`, `#11`, `#12`). Ya no tiene ningún `active`.
- **O4 «Global Console»** — 16 fases, **33 runs**: 27 `completed`, **6 `planned`**.

Línea base viva, medida hoy sobre el archivo entero (md5 del archivo, no de
subárboles): **94 296 B**, md5 `f299d968fdf781bf31863d696bd9610e`.

**La proyección ya está al día:** `.project/roadmap.json` trae los mismos 45 runs.
No hay nada que re-emitir al abrir el hilo.

## LO QUE QUEDA VIVO — los tres de O0 y los cuatro de O4

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

Los otros dos `planned` son transversales de `O4.P9`: `#41`
`RUN-CONSOLE-CONTEXT-PACK-001` («Context pack of the console») y `#42`
`RUN-CONSOLE-DIGEST-CABINA-001` («Digest for the cockpit»).

**El siguiente `planned` por `queue_order` es el `#10`** — pero `D-054` cerró el
triage en sentido contrario (ver «Qué NO está resuelto»).

## QUÉ PASÓ EN ESTA SESIÓN — punteros, no recuento

Todo el trabajo entregado fue **del roadmap de AIW**, ejecutado desde este hilo.
Nueve commits en `aiw`, del `77b7ad5` al `a63a82b`.

- **AIW estrena canónico.** `aiw/roadmap/roadmap.json`, `roadmap_tree_v1`, layout
  `repo_root`, en inglés: **6 objetivos, 29 fases, 42 runs** (17 `completed`, 25
  `planned`), medido hoy. Es el primer byte escrito nunca en `aiw` por esta línea
  de trabajo. → `records/ESCRITURA-ROADMAP-AIW.md`, `D-052`.
- **`.project/` de AIW emitido por primera vez**, y medido artefacto por artefacto
  contra el contrato. → `records/EMISION-PROJECT-AIW.md`.
- **`aiw/logs/` versionado** — 58 archivos trackeados hoy; con ellos los dos
  incidentes que `CONST §4` exige citables. Tres de las cuatro adjudicaciones de
  `D-053`. → `records/PORTABILIDAD-EVIDENCIA-AIW.md`.
- **`aiw/governance/` escrito** — `guardrails.json` y `no_claims.json`;
  `contract.json` se MIDIÓ y no se escribió, y la medición decide la cabina. →
  `records/GOBERNANZA-DECLARADA-AIW.md`.
- **La cola de AIW deja de mentir**: dos tickets muertos archivados, cuatro
  carpetas invisibles adjudicadas, seis tickets reparados de parseo. →
  `records/RECONCILIACION-COLA-AIW.md`, `records/DISPOSICION-CARPETAS-COLA-AIW.md`,
  `records/REPARACION-PARSEO-TICKETS-AIW.md`.
- **`D-052`..`D-056` escritas**, sobre las dos mediciones de arranque. →
  `records/MEDICION-ESTADO-DE-AIW.md`, `records/AUDIT-CONTENIDO-AIW.md`,
  `records/DECISION-ROADMAP-AIW.md`.

Los seis runs cerrados son los `#12`..`#17` de `aiw` (`O2.P1`..`O2.P4`).

## EL SOLAPAMIENTO DE `O4.P6` — planteado, con datos, sin editar nada

La fase **`O4.P6` «Stage 6 — AIW as a third project (roadmap Markdown → v3)»**
describe trabajo que **ya se hizo, pero desde el roadmap de AIW**. Su único run
(`#37`) declara en su `full_description` tres piezas; contrastadas hoy:

| Pieza declarada por `#37` | Estado medido |
|---|---|
| «conversion of the COMPLETE roadmap of AIW (O1, O2, O3, O5, O6) to its own v3» | **HECHO** por el `#16` de AIW — con una diferencia: el canónico trae **O1, O2, O3, O5, O6 y O7**, y su O2 no significa lo mismo que el O2 del Markdown (`ESCRITURA-ROADMAP-AIW`) |
| «its `.project/` folder is emitted» | **HECHO** — `aiw/.project/` existe con los seis artefactos declarados en `emitted_artifacts` (`EMISION-PROJECT-AIW`; re-emitido tras `governance/`) |
| «the removal of O4 from RM-AIW» | **NO HECHO** — es el `#20` de AIW, `planned`. El Markdown sigue en disco (208 líneas) |
| «AIW enters the console with its real roadmap» / «appears as a rendered project» | **NO HECHO** — es el `#21` de AIW, `planned` |

**No se editó nada.** La reconciliación —qué se retira de `O4.P6`, qué se
reformula como la parte de consola del `#21`, y si `O4.P6` sobrevive— es un acto
de edición propio, y compite por el archivo disputado.

## LAS DEUDAS DE `aiw-console` QUE ESTA SESIÓN DESTAPÓ Y NO TOCÓ

- **El motor no puede crear ni borrar fase u objetivo.** Es el `#11` de O0, vivo y
  `planned`; **tres cierres consecutivos lo han rodeado con escritura a mano**
  (`CIERRE-ROADMAP-AL-DIA-FASES-P13-P14.md:485`,
  `CIERRE-REGISTRO-Y-RELEVO-TERCERO.md:631`, `ESCRITURA-ROADMAP-AIW.md:311`).
- **`CONTRATO §7` NO está enforced en código.** Medido ejecutando la función real
  del emisor sobre un banco de pruebas: un `contract_ref` que escapa del root
  **resuelve y se emite**, con su `../` delante; `sourceRecord` (`PROJ:720`) solo
  pregunta si el archivo existe, nunca si está dentro del repo. **La garantía de
  contención es documental, no de código.** → `GOBERNANZA-DECLARADA-AIW.md §6.3`.
- **La ausencia de un artefacto tiene DOS canales y solo uno la cubre.** El banner
  por sección la anuncia nombrando el archivo (`PCJS:2834-2848`), pero el artefacto
  ausente **no entra en `emitted_artifacts`** —que se construye de lo que la
  emisión escribió (`PROJ:1634-1637`)— e `isDeclaredSource` lo filtra del agregado.
  → `EMISION-PROJECT-AIW.md §5.3`. (El caso concreto de AIW ya no se da: hoy
  declara los seis.)
- **El escaneo del `docs_index` no consulta `.gitignore`**, así que produce
  resultados distintos en cada máquina: 36 de las 70 entradas de AIW —el 51,4 %—
  no existen fuera de esta máquina. → `EMISION-PROJECT-AIW.md §6`.
- **`git_history.json` a de-máquina en TODO emisor** — `D-053` adjudicación 4,
  declarada **transversal**: alcanza a `aiw-console` (donde hoy está versionado) y
  a `cantu-studio`. **Sigue sin ejecutar en este repo.**

## `D-057` PENDIENTE — tres cabos que no se pierden

Las tres **se corrigen hacia adelante, nunca reescribiendo** (precedente `D-045`).
`D-056` es la última entrada escrita; `D-057` no existe.

1. **La fecha de `7659ff3` está medida: `2026-07-10`** (`git log`, verificado hoy
   en `aiw`). Sitúa la rotura **18 días** antes de constatarla, no los **17** que
   citan `D-055` y `D-056` — que contaban con la fecha aún sin verificar. →
   `ESCRITURA-ROADMAP-AIW.md §6`.
2. **El aplazamiento del `docs_index` es SECUENCIA, no divergencia de `D-053`.**
   `EMISION-PROJECT-AIW §9.3` se declaró a sí mismo divergente de la adjudicación 4;
   la salida limpia ya está en el árbol y es el `#19` de AIW (índice curado →
   transportado → trackeado → commiteable). Reencuadrar, no enmendar.
3. **`D-053` cita `aiw/.gitignore:4` para `logs/`.** Retirada esa línea —que es lo
   que la propia adjudicación 1 mandaba—, **el `:4` apunta hoy a `jame_snapshot/`**
   (verificado leyendo el archivo; `.aiw/` bajó de la 7 a la 6). La cita quedó
   apuntando a otra cosa.

## Qué NO está resuelto, y el hilo nuevo debe saberlo

1. **La prioridad `O0`↔`O4`, con triage CERRADO y reorden PENDIENTE.** `D-054` leyó
   el contenido de los tres runs vivos de O0 y **no halló trabajo vivo y urgente**:
   lo vivo de O4 (`#35`→`#38`) va por delante de la cola de O0. **El reorden no se
   ejecutó**: queda como **acto de edición propio** en la consola (dry-run →
   confirm, la ruta de `O4.P12`), **antes de la paridad** (`O4.P5`).
2. **El `#10` de O0 pasó de `active` a `planned`** en esta sesión, editado desde la
   consola y commiteado como `b09dc4a`. Razón: no estaba en curso, y O4 no tenía
   ningún `active`. Hecho medido, no intención (`D-054`).
3. **Los tres embudos del shell.** El `#21` de AIW declara en su `full_description`
   que «the shell has three funnels and AIW passes only the first»: el registro ya
   apunta bien, faltaban el layout y los artefactos. **Leído hoy, y su premisa está
   vencida**: `project-console/projects.json` mapea `aiw` → `../../../aiw`, el
   canónico existe en `roadmap/` y `aiw/.project/` existe con seis artefactos. **Lo
   que sigue sin verificar es lo que importa: la consola no se levantó**, así que
   **[NO VERIFICADO]** que renderice AIW. Ése es el trabajo del `#21`.

## Las compuertas vigentes (son `depends_on` reales en el roadmap)

- **paridad + UI/UX → corte:** `RUN-CONSOLE-CORTE-RETIRO-LOCAL-001` depende de
  `RUN-CONSOLE-PARIDAD-RENDER-CANTU-001` **y** de `RUN-CONSOLE-UI-UX-001`. Sin
  cambio desde `D-047`: el corte es irreversible y no procede sin la revisión de
  uso.
- Las 19 aristas resuelven todas dentro del archivo; **la ubicación de las fases
  nuevas es ORDEN, no compuerta** — este proyecto declara `depends_on` solo donde
  hay compuerta real (`D-046`). La primera arista externa prevista es la de las
  ocho citas hacia el `#20` de AIW.

## La auditoría de contenido del roadmap sigue DIFERIDA — a propósito

Siete premisas fechadas reportadas y **sin tocar**
(`records/CIERRE-ROADMAP-AL-DIA-FASES-P13-P14.md` Bloque B.3). La razón de orden
**sigue en pie**: O4 vive en dos sitios mientras el Markdown no se retire, y
retirarlo es el `#20` de AIW, `planned`. Auditar antes obligaría a auditar otra vez
después. El duplicado ya está medido ítem por ítem en `MEDICION-ESTADO-DE-AIW.md`
sección 2 — no hay que re-medirlo.

## Qué se puede mirar HOY

**La consola global**, desde la raíz de `projects/aiw-console`:

```bash
node project-console/serve.mjs
```

o el lanzador `start-console.cmd` / `start-console.ps1` (puerto **8788**, `PC_PORT`
lo sustituye; ver `start-console.README.md`). El registro declara **tres**
proyectos: `aiw-console`, `cantu-studio` y `aiw`.

El server expone **exactamente tres rutas de escritura** —`roadmap/edit`,
`history/sync`, `project/emit`—; la matriz está **medida por un test que la
imprime**, no mantenida a mano (`records/REEMISION-MANUAL-PROJECT-O4-P14.md`
Bloque C.2). Todo lo demás responde `405 read_only_console`; `.git` responde `403`.

La consola de Cantu sigue levantable (puerto 8787) pero **ya no es la herramienta**
para su canónico; el prototipo `console/` sigue siendo historia.

## Pendientes que son del OPERADOR, no del taller

1. **`governance/` de este repo SIN REVISIÓN — lo más viejo de la lista.** Los **7
   guardrails** y los **5 claims** (contados hoy en los dos archivos) los **autoró
   el taller** en `O4.P2` para que Governance State tuviera datos. Son
   declaraciones de gobernanza del proyecto y el taller no tiene autoridad para
   decidir qué promete un proyecto: hay texto en pantalla que nadie con autoridad
   aprobó.
2. **Las 7 premisas fechadas del roadmap.** Van después del retiro del Markdown.
3. **Los `run_id` con raíz española.** Decisión de **identidad, no de traducción**:
   `D-047` la declara opaca y renombrar rompe `depends_on`, records y
   `DECISIONES.md`. Los runs nuevos nacen en inglés.
4. **Las 9 fuentes diferidas.** Sin emitir; el panel «Not emitted by this project»
   sigue diciendo la verdad (`project-console/assets/project-console.js:2940`,
   verificado). Es decisión, no fase abierta; materia de `O4.P5` si se pide.
5. **¿El validador viaja a la consola global?** Recomendación de cabina: **que NO**;
   los tres ROMPE viven en él y desaparecen con el corte.
6. **Las dos deudas del cierre anterior**: los censos fijados a mano en la suite y
   los records que se auto-asignan fase en su nombre
   (`records/CIERRE-REGISTRO-Y-RELEVO-TERCERO.md` Bloque H).

## Deuda medida para la multiconsola — NO arreglada

Tres sitios del **validador de Cantu** asumen que todo `run_id` vive en el roadmap
local; con O0 fuera, eso es falso. Medidos, **no tocados**: `CANTU-VALID:847`
(agrupa el run externo en `later`), `CANTU-VALID:1059-1069` (el DFS de ciclos salta
ids externos), `build-git-history-snapshot.mjs:103-108` (`deriveRunId` degrada a
`null`). El rojo agudo se cerró en `D-045`. El motor de Cantu **tolera pero no
adopta** carriles, barriers y aristas externas — por eso su canónico se edita desde
la consola global (`records/MIGRACION-CANTU-A-CARRILES.md` A.1).

## El `.aiw/` de `aiw-console` NO es estado propio

Es el área de entrega de la **proyección de AIW**: el proyector vive en este repo,
lee `../../aiw/objectives/` y escribe ahí. **La simetría con Cantu no existe** —
allá `.aiw/` sí es del proyecto. Supuesto tácito que ya hizo fallar un encargo
(`D-044`, `MEDICION-PROYECTOR.md §5.a`, `MEDICION-FUENTES-CONSOLA.md` Bloque D).
Verificado hoy: existe con `roadmap/` y `views/`, `mtime` **2026-07-22 15:38**,
ignorado por Git y sin trackear — residuo. Lo vivo está en `.project/`.

## Regla de cierre de la cabina

Cada cierre termina con **el mapa** y con **qué se puede mirar**; si un encargo no
cambia nada observable, se dice. **Este encargo no cambió nada observable**:
reescribió este archivo y nada más. Ni el roadmap, ni `.project/`, ni el código.

## Lecturas de arranque (en orden de utilidad)

1. `projects/aiw-console/roadmap/roadmap.json` — el plan y el estado. **El estado
   real se mide aquí, no se recuerda.**
2. `aiw/roadmap/roadmap.json` — **solo lectura**: los cuatro runs que le quedan al
   otro hilo, y el `full_description` del `#20` (las ocho citas) y del `#21` (los
   tres embudos).
3. `context/handoffs/cantu-studio.md` — el otro hilo paralelo.
4. `context/DECISIONES.md` — **`D-056` es la última.** `D-052`..`D-056` son de esta
   sesión y todas son sobre AIW; `D-051` (carriles y barriers), `D-048` (orden de
   O4) y `D-046` (hueco de capa 2, prefijos, prioridad `O0`↔`O4`) siguen siendo el
   suelo de este proyecto.
5. `context/aiw-console/CONTRATO.md` — el contrato de la carpeta. `§7` (contención,
   no enforced), `§10.d` Reglas 1-3 (aristas externas), `§19-§20` (degradación).
6. `context/aiw-console/records/` — los diez de esta sesión están listados arriba
   con lo que cada uno cubre. Por tema, los de antes:
   `REEMISION-MANUAL-PROJECT-O4-P14.md` (las tres rutas de escritura),
   `DISCIPLINA-UN-RUN-POR-CARRIL.md` (**la disciplina que gobierna los tres hilos
   abiertos**), `CARRILES-Y-BARRIERS-ROADMAP.md`, `MEDICION-VALIDADOR-ROJO.md`,
   `AUDIT-CONSOLE-O4-PHASE0.md` Bloque F.3 (qué se pierde en el corte).

## Pendientes menores (siguen vivos)

- `aiw-console/package.json:6` se autodescribe como "verbatim fork" — falso
  (verificado hoy).
- `aiw/.aiw/project_console.snapshot.json` — copia stale del **2026-07-10**;
  residuo. Borrarlo es higiene, y **es del hilo de AIW**, no de éste.
- **Un record cita un `run_id` que no existe**:
  `records/EMISOR-CANTU-CARPETA-PROPIA-O4-P4.md` se encabeza citando
  `RUN-CONSOLE-EMISOR-CANTU-CARPETA-PROPIA-001`; el run real de `O4.P4` es
  `RUN-CONSOLE-CANTU-EMITE-CARPETA-001` (`#24`). Los `run_id` no se renombran
  (`D-047`).
- `records/DOCS-INDICE-CURADO-TRANSPORTADO.md` sigue diciendo `O4.P5` en su propio
  H1 (verificado), aunque el nombre del archivo ya no reclama esa fase.
