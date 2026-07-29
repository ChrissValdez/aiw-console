# HANDOFF — hilo `aiw` (el kernel)

> **Este archivo es EFÍMERO y se SOBRESCRIBE.** Es el relevo del hilo del kernel:
> se reescribe al cerrar cada sesión y se consume al abrir la siguiente. No es un
> record — no acumula historia, no se versiona por tramo. Lleva **solo** lo que la
> próxima sesión necesita para arrancar sin releerlo todo. Lo que seguirá siendo
> cierto dentro de un mes vive en el roadmap, la constitución o un record — no aquí.

> **Disciplina de este handoff: APUNTA, no RECUENTA.** Cada hallazgo va en una o
> dos líneas con el puntero a su record. Un relevo que reproduce sus fuentes deja de
> ser relevo y se vuelve una copia que deriva. Si da una cifra, la da con su cita, y
> lo medido de disco se distingue de lo citado de un record — **un record es una
> medición fechada, no el estado de hoy**.

> **Por qué NACE este archivo.** `context/README.md:51-58` declara cuatro handoffs;
> existían dos. AIW se trabajaba desde el hilo de la consola, prestado. El `#21`
> —cuyo `summary` dice que cierra «la disciplina de tres proyectos que hoy solo
> tiene dos hilos»— es lo que lo convierte en el tercero: **un hilo sin relevo no
> existe**. Éste es su relevo.

**Estado del hilo:** `O2 — AIW is readable` **cerrado con este run**. AIW es hoy un
proyecto renderizable del mismo rango que los otros dos: registrado, reclamado por
un layout, y con sus seis artefactos en disco. Lo siguiente es `O3 — Reliable
autonomous run`, que toca **kernel**, no papeles.
Última actualización: **2026-07-29**.

---

## ⚠ LA FRONTERA — leer antes de escribir un solo byte

**Hay DOS hilos paralelos abiertos además de éste:** `aiw-console` (relevo propio en
`context/handoffs/aiw-console.md`) y `cantu-studio` (`context/handoffs/cantu-studio.md`).
Los tres escriben records en `context/aiw-console/records/`. Rige la disciplina de
carriles (`records/DISCIPLINA-UN-RUN-POR-CARRIL.md`): superficies de escritura disjuntas.

**1. Este hilo escribe en `aiw`. Su contexto vive en `aiw-console` (`D-037`).** Un
cierre de sesión toca DOS repos: `aiw` para código y papeles del kernel,
`aiw-console` para records, handoff y `DECISIONES.md`.

**2. Este hilo NO toca código de consola, shell, proyector ni registro de
proyectos.** Un hallazgo sobre la consola se **NOMBRA** y se pasa a su hilo — sin
ticket y sin recomendación de arreglo. Los tres nombrados hoy están en
`records/AIW-TERCER-PROYECTO.md §6`.

**3. Las diez citas `RM-AIW:` son del hilo de `aiw-console`, no de éste.** Ocho runs
del canónico de `aiw-console` citan el Markdown retirado por línea; son **diez**
citas porque `#36` y `#38` citan dos veces. Ya están localizadas y tabuladas para
ese hilo en `records/RETIRO-MARKDOWN-AIW.md §4.2`. **Medido hoy sobre disco:** 10
tokens `RM-AIW:` en `aiw-console/roadmap/roadmap.json`, y el desfase vigente es
**`RM-AIW:n` → línea `n + 28`** (comprobado: `RM-AIW:114` → línea 142, que es
«SECUENCIA ACORDADA (D-034)»; el archivo tiene 228 líneas). No se reparan aquí.

**4. `aiw/roadmap/roadmap.json` es el canónico y lo edita quien tenga el carril.**
La consola global puede escribirlo desde su ruta `roadmap/edit`, y desde hoy ese
botón está habilitado para AIW (ver «Qué se puede mirar HOY»). Dos encargos sobre el
mismo archivo van EN SERIE.

---

## El plan y el estado viven en el roadmap — no aquí

    aiw/roadmap/roadmap.json

Medido sobre ese archivo hoy: **6 objetivos, 29 fases, 42 runs**; `queue_order`
**1..42 denso, único y contiguo**. **20 `completed`, 1 `active`, 0 `blocked`, 21
`planned`.** El status de objetivo y de fase se **deriva al leer**, no se almacena
(`CONTRATO §11.b`/`§12`).

| Objetivo | Título verbatim | Fases | Runs | Estado medido |
|---|---|---:|---:|---|
| `O1` | House in order | 2 | 11 | 11 `completed` |
| `O2` | AIW is readable | 7 | 10 | 9 `completed` + **1 `active` (el `#21`)** |
| `O3` | Reliable autonomous run | 6 | 6 | 6 `planned` |
| `O4` | — | — | — | **hueco permanente** (`D-046`, `D-054`) |
| `O5` | Run evidence and observability | 4 | 5 | 5 `planned` |
| `O6` | Categories and batches | 4 | 4 | 4 `planned` |
| `O7` | Long unattended execution (batches, lanes and parallelism) | 6 | 6 | 6 `planned` |

**El `#21` debe quedar en `completed`** — el record lo declara y no lo cambia. Con
eso `O2` queda 10/10 y el conteo pasa a **21 `completed`, 0 `active`, 21 `planned`**.

**El siguiente `planned` por `queue_order` — es lo único que el operador ve en
pantalla:**

> **`#22` · `RUN-AIW-SCOPE-PREFLIGHT-GUARD-001` ·
> «Make the scope pre-flight demand a real match»**

**La proyección está al día:** `.project/roadmap.json` y `snapshot.roadmap_tree`
traen los mismos 42 runs con los mismos ids, fases y status — comparación tupla a
tupla, idéntica. **No hay nada que re-emitir al abrir el hilo.**

## `O2` CERRADO — qué dejó, una línea por hito

- **Canónico estrenado.** `aiw/roadmap/roadmap.json`, `roadmap_tree_v1`, layout
  `repo_root`, en inglés. → `records/ESCRITURA-ROADMAP-AIW.md`, `D-052`.
- **`.project/` emitido, hoy con los SEIS artefactos** y medido artefacto por
  artefacto contra el contrato. → `records/EMISION-PROJECT-AIW.md`.
- **`governance/` escrito** — `guardrails.json` (17 guardrails) y `no_claims.json`
  (4 claims), medidos hoy; `contract.json` se MIDIÓ y no se escribió. →
  `records/GOBERNANZA-DECLARADA-AIW.md`.
- **`logs/` versionado** — 58 archivos trackeados hoy, y con ellos los dos
  incidentes que `CONST §4` exige citables. → `records/PORTABILIDAD-EVIDENCIA-AIW.md`.
- **La cola dejó de mentir** — dos tickets muertos archivados, cuatro carpetas
  invisibles adjudicadas, seis tickets reparados de parseo. →
  `records/RECONCILIACION-COLA-AIW.md`, `records/DISPOSICION-CARPETAS-COLA-AIW.md`,
  `records/REPARACION-PARSEO-TICKETS-AIW.md`.
- **Convención de documentación + índice curado transportado** — 13 entradas hoy en
  `docs/docs_index.json` (12 del `#19` + 1 del `#20`). →
  `records/CONVENCION-DOCUMENTACION-AIW.md`, `records/INDICE-DOCS-CURADO-AIW.md`.
- **Markdown supersedido, no borrado**, con tabla de equivalencia publicada. →
  `records/RETIRO-MARKDOWN-AIW.md`.
- **AIW es el tercer proyecto renderizable** — los tres embudos medidos, los tres
  pasan. → `records/AIW-TERCER-PROYECTO.md`.

## LO QUE VIENE — `O3 — Reliable autonomous run`

Títulos verbatim de disco: es lo único que el operador ve en pantalla. Los seis
están `planned`; ninguno es papel salvo donde se dice.

| `#` | Fase | `run_id` | Título |
|---:|---|---|---|
| 22 | `O3.P1 — The known leak` | `RUN-AIW-SCOPE-PREFLIGHT-GUARD-001` | Make the scope pre-flight demand a real match |
| 23 | `O3.P2 — Behaviour under real load` | `RUN-AIW-REAL-LOAD-MEASUREMENT-001` | Run the first real objective against a large repository with a test net |
| 24 | `O3.P3 — Failure cases as an asset` | `RUN-AIW-EVAL-CASE-CONVENTION-001` | Establish the convention for evaluation cases |
| 25 | `O3.P4 — Ticket parse regression test` | `RUN-AIW-TICKET-PARSE-REGRESSION-TEST-001` | Add the regression test that runs the parser against every real ticket |
| 26 | `O3.P5 — Agent instruction convention` | `RUN-AIW-AGENT-INSTRUCTION-CONVENTION-001` | Establish a compact core plus on-demand modules for agent instructions |
| 27 | `O3.P6 — Documenting the cycle` | `RUN-AIW-CYCLE-DOCUMENTATION-001` | Document the run cycle |

## ⛔ `CONST §4` ES COMPUERTA OPERATIVA — lo más importante antes de emitir nada

`O3` es el primer objetivo que **añade mecanismo al kernel**. Bajo `D-055`, todo run
que añada mecanismo lleva **tres criterios de aceptación fijos**, y sin ellos **no
puede ejecutarse**:

1. **la cita de la entrada de `DECISIONES.md` que documenta su incidente**, con los
   cuatro campos de `CONST:30-32` — fecha, qué se rompió, qué costó, por qué el diff
   matinal no lo cazó. «Una idea no es un incidente. Un miedo no es un incidente»;
2. **su criterio de borrado escrito** en esa misma entrada — «se elimina si X»
   (`CONST:33`);
3. **su presupuesto de líneas contra el techo** — el kernel está en **478 de ~500**,
   o sea **22 de holgura**; si no cabe, nombra qué borra (`CONST:28-29`).

**«Mecanismo» = código o paso nuevo en `aiw`** (kernel, cola, lanzadores, guards).
**No lo son** papeles, `.gitignore`, archivados ni trabajo del lado consola — eso lo
gobierna el CONTRATO. El enforcement es **humano y documental**: no hay test, hook ni
check que lo compruebe, y automatizarlo sería un «detector» de la clase prohibida por
`CONST:34-35`. `D-056` corrigió hacia adelante el criterio de borrado del caso 4.

**Cuáles de los seis runs de `O3` ya tienen incidente — medido del canónico hoy, no
recordado:**

| `#` | ¿Añade mecanismo? | Incidente | Puede ejecutarse |
|---:|---|---|---|
| 22 | **Sí** — paso nuevo en el kernel | **PENDIENTE.** Su `full_description` lo dice él mismo: `D-028` documenta el DEFECTO, no un incidente — le falta el cuarto campo y ningún run lo ha sufrido | **NO**, hasta que se escriba la entrada |
| 23 | No — «this run measures» | n/a | Sí |
| 24 | No — convención + fixtures en la suite | n/a | Sí |
| 25 | **Sí** — pero vive en la suite, **0 líneas** contra el techo | **COMPLETO** — `D-055` caso 4, corregido por `D-056`; los cuatro campos verificados | **Sí** |
| 26 | No — instrucciones son papel. **Costura declarada**: si la implementación añade un paso de carga al kernel, ESO sí es mecanismo | n/a | Sí |
| 27 | No — documentación es papel | n/a | Sí |

**Uno de los seis está bloqueado por falta de incidente, y es precisamente el
siguiente de la cola.** El `#25` afirma ser «one of only three runs in this roadmap
that can execute on the strength of an incident that is already documented»; los
otros dos son el `#29` (`RUN-AIW-RUN-MANIFEST-001`, caso 1 de `D-055`) y el `#37`
(`RUN-AIW-DECOUPLED-QUEUE-LAUNCHER-001`, caso 2). **`[NO VERIFICADO]`** que sean
exactamente tres y no más: no se auditaron los 21 `planned` uno a uno contra la
definición de mecanismo.

**Y el caso 2 deroga una regla vigente al entrar:** el día que el `#37` se ejecute,
queda derogada por escrito «el terminal del queue se queda abierto e intocado
durante toda la ventana» (`D-055`, caso 2).

## `D-057` PENDIENTE — tres cabos que no se pierden

Se corrigen **hacia adelante, nunca reescribiendo** (precedente `D-045`). `D-056` es
la última entrada escrita; **`D-057` no existe**. Los tres cabos están detallados en
`context/handoffs/aiw-console.md`, sección `D-057 PENDIENTE`:

1. **La fecha de `7659ff3` está medida: `2026-07-10`.** Sitúa la rotura de parseo
   **18 días** antes de constatarla, no los **17** que citan `D-055` y `D-056`. →
   `records/ESCRITURA-ROADMAP-AIW.md §6`.
2. **El aplazamiento del `docs_index` es SECUENCIA, no divergencia de `D-053`.**
   Reencuadrar, no enmendar. → `records/EMISION-PROJECT-AIW.md §9.3`.
3. **`D-053` cita `aiw/.gitignore:4` para `logs/`;** retirada esa línea, el `:4`
   apunta hoy a `jame_snapshot/`. **Re-verificado en este encargo:** el archivo tiene
   cinco entradas —`sandbox/`, `locks/`, `node_modules/`, `jame_snapshot/`, `.aiw/`—
   y `logs/` no está en ninguna. La cita quedó apuntando a otra cosa.

## LA LECCIÓN OPERATIVA DE `O2`, en una línea

**Ninguna cifra de un record o de un `full_description` se escribe sin re-medirla.**
Van **cuatro** cifras heredadas caídas en este objetivo, cada una con su record:

| Cifra heredada | Portador | Medida | Record |
|---|---|---|---|
| «34 de las 70 entradas gitignoreadas» | `full_description` `#19` | **1 de 71** | `INDICE-DOCS-CURADO-AIW §6.b(1)` |
| «roughly three to ten entries» | `full_description` `#19` | **12** | `INDICE-DOCS-CURADO-AIW §6.a` |
| «11 hoy / 15 al final» | record del `#18` **y** `CONVENCION §4.3` | **12 / 16** | `INDICE §6.a`, `RETIRO §7` |
| «eight citations … all eight are broken» | `full_description` `#20` | **8 runs, 10 citas** | `RETIRO-MARKDOWN-AIW §4.1` |

Dos cifras más de `#19` se movieron pero se adjudicaron **crecimiento del corpus, no
error** (`CONVENCION §2.d`), y una tercera fue desliz de clasificación en la prosa de
un record (`§2.e`). **Ninguna se editó en el canónico**: se nombran, y corregir el
texto es acto del operador.

**Y una quinta premisa vencida cayó en este run:** el `full_description` del `#21`
dice que AIW «pasa solo el primero de los tres embudos». Medido hoy contra el código:
**pasan los tres**. Se escribió antes de que el canónico, `governance/` y `.project/`
existieran. No se repite en ningún artefacto.

## Qué NO está resuelto, y el hilo nuevo debe saberlo

1. **`git_history.json` sigue sin trackear en `aiw`.** Medido hoy: `.project/` tiene
   **5 archivos trackeados** y `git_history.json` **no está trackeado ni
   gitignoreado** — aparece como `??` en cada `status`. Es la adjudicación 4 de
   `D-053`, declarada **transversal** (alcanza también a `aiw-console` y
   `cantu-studio`), y **su parte transversal no se ha ejecutado en ningún repo**.
2. **`operator_review_status` no está gobernado por la convención.** La consola abre
   Docs en `all` y no en `newera` precisamente porque ese campo no se emite; ninguna
   convención de AIW dice cuándo un run lo escribe. → `project-console/README.md`,
   «Three deliberate differences», punto 1.
3. **El render de AIW está sin confirmar visualmente.** Los tres embudos pasan
   medidos contra el código, pero **la consola no se levantó** en este encargo. La
   lista de comprobación para el operador —qué proyecto, qué conteos, qué secciones—
   está en `records/AIW-TERCER-PROYECTO.md §5`. Hasta que se recorra, el render es
   **`[NO VERIFICADO]`**.
4. **`governance/` de `aiw` lo autoró el taller, no el operador.** Los 17 guardrails
   y los 4 claims que hoy pinta Governance State son declaraciones de gobernanza del
   proyecto que nadie con autoridad aprobó. Misma deuda que ya arrastra `aiw-console`.
5. **`contract.json` no existe** en `aiw/governance/`. El layout `repo_root` lo
   resuelve y el emisor lo omite (§7: una ruta que no resuelve se OMITE). Se midió y
   se decidió no escribirlo; la decisión es de la cabina. →
   `records/GOBERNANZA-DECLARADA-AIW.md`.

## Qué se puede mirar HOY

**La consola global**, desde la raíz de `projects/aiw-console`:

```bash
node project-console/serve.mjs
```

o el lanzador `start-console.cmd` / `start-console.ps1` (puerto **8788**, `PC_PORT`
lo sustituye). Abre `http://127.0.0.1:8788/project-console/index.html`. El registro
declara **tres** proyectos y AIW es el tercero.

**Lo nuevo de este run:** AIW aparece en el menú lateral como **«AIW»** con subtítulo
**`active`**, y su tarjeta de Portfolio trae **6 objectives · 29 phases · 42 runs**.
**El botón *Edit roadmap* está habilitado para AIW por primera vez**: la sonda de
edición devuelve `405 method_not_allowed` exactamente cuando el proyecto está
registrado **y** un layout reclama su roadmap, y desde `O2.P3` ambas cosas se
cumplen. La nota de `project-console/README.md` que dice que la edición se niega
«today: `aiw`, until `O4.P6`» **está vencida** — es del hilo de la consola.

**La consola viva es `aiw-console/project-console/`**, y eso se midió, no se supuso:
el repo contiene **tres** árboles de consola y solo uno es el que el operador
arranca. La evidencia está en `records/AIW-TERCER-PROYECTO.md §3`.

## Pendientes que son del OPERADOR, no del taller

1. **Cerrar el `#21`** — cambiar su `status` a `completed` en
   `aiw/roadmap/roadmap.json`. El record lo declara y no lo hace.
2. **Escribir el incidente del `#22`** si se quiere que `O3` arranque por su cabeza
   de cola: sin la entrada de `DECISIONES.md` con los cuatro campos, el run está
   bloqueado por `CONST §4`. La alternativa es empezar `O3` por el `#25`, que sí
   tiene incidente completo.
3. **`D-057`**, con los tres cabos de arriba.
4. **Revisar `governance/` de `aiw`** — 17 guardrails y 4 claims sin aprobar.
5. **Recorrer la lista de comprobación visual** (`AIW-TERCER-PROYECTO.md §5`) para
   convertir el render de `[NO VERIFICADO]` en medido.

## Regla de cierre de la cabina

Cada cierre termina con **el mapa** y con **qué se puede mirar**; si un encargo no
cambia nada observable, se dice. **Este encargo no cambió nada observable en `aiw`**:
no escribió un byte ahí. Lo observable que reporta —AIW en el menú, su tarjeta, su
botón de edición— **ya estaba en disco** antes de empezar; lo que faltaba era
medirlo y decirlo.

## Lecturas de arranque (en orden de utilidad)

1. `aiw/roadmap/roadmap.json` — el plan y el estado. **El estado real se mide aquí,
   no se recuerda.** Empezar por el `full_description` del `#22`: dice él mismo por
   qué no puede ejecutarse todavía.
2. `aiw/CONSTITUCION.md` §4 y §6 — la compuerta y la métrica. Se leen de primera
   mano, no citadas.
3. `context/DECISIONES.md` — **`D-056` es la última.** `D-052`..`D-056` son las cinco
   de AIW; `D-053` (portabilidad de evidencia) y `D-055`/`D-056` (`CONST §4`) son el
   suelo de este hilo.
4. `context/aiw-console/records/` — los once de `O2`, de `MEDICION-ESTADO-DE-AIW` a
   `AIW-TERCER-PROYECTO`. Los dos de arranque son `MEDICION-ESTADO-DE-AIW.md` y
   `AUDIT-CONTENIDO-AIW.md`; `DECISION-ROADMAP-AIW.md` razona las cinco decisiones.
5. `context/handoffs/aiw-console.md` y `context/handoffs/cantu-studio.md` — los otros
   dos hilos. El primero trae la tabla de las diez citas y los cabos de `D-057`.
6. `aiw/claude.md` y `aiw/CONTEXTO.md` — dónde vive cada cosa tras `D-037`.

## Pendientes menores (siguen vivos)

- `aiw/.aiw/project_console.snapshot.json` — copia stale del **2026-07-10**; residuo
  de la proyección vieja. Borrarlo es higiene y **es de este hilo**.
- `aiw/governance/contract.json` ausente: el emisor lo omite en silencio porque §7
  manda omitir la ruta que no resuelve. No es un fallo; es una decisión sin tomar.
- El `#37` del canónico de `aiw-console`
  (`RUN-CONSOLE-AIW-TERCER-PROYECTO-001`, «AIW as a third project») describe trabajo
  que este objetivo ya hizo. **Su reconciliación es del otro hilo**; ya está
  planteada con datos en `context/handoffs/aiw-console.md`.
