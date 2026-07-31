# CONVENCIÓN DE CASOS DE EVALUACIÓN DE AIW — la adjudicación, la convención y la declaración

**Fecha:** 2026-07-30 · **Run:** `RUN-AIW-EVAL-CASE-CONVENTION-001`
(`queue_order` **25**, O3 «Reliable autonomous run» / O3.P3 «Failure cases as an
asset», `roadmap/roadmap.json:315-316`) · **Naturaleza:** adjudica qué es un caso
de evaluación, clasifica los 22 candidatos de disco uno a uno, escribe la
convención y la declaración de casos en `aiw/docs/kernel/`, y las indexa. **No
mueve, no renombra ni borra ningún archivo; no repara ningún ticket; no toca
`processed/` ni un byte; no toca `kernel.mjs`, `queue.mjs` ni ningún test; no
edita `roadmap/roadmap.json`; no autora ningún fixture; no cierra su propio
run.** · **Máquina:** PC (Windows 10,
`C:\Users\chris\Documents\AIW_Workspace\`). · **Node:** v24.12.0
(`node --version`).

**Escritura total de este run — cuatro archivos, tres en `aiw` y uno aquí:**
`aiw/docs/kernel/CONVENCION-DE-CASOS-DE-EVALUACION.md` (nuevo),
`aiw/docs/kernel/CASOS-DE-EVALUACION.md` (nuevo), `aiw/docs/docs_index.json`
(dos entradas añadidas), y este record. Nada más.

**Git:** el encargo dice «No ejecutes git» y su criterio 8 exige a la vez que
«`git status` no debe mostrar nada bajo `objectives/processed/`». La tensión se
resolvió leyendo la prohibición como veda de todo git **que actúe** (mv, add,
commit, checkout…) y el criterio como el mandato específico que es: git se usó
**exactamente dos veces, solo `status --porcelain`, solo lectura** (§8). Si la
cabina lee la veda como absoluta, el criterio 8 queda `[NO VERIFICADO]` en su
mitad de git y el resto del record no cambia.

---

## 1. Guarda de identidad y de premisa (criterio 1) — **PASA, las cuatro**

Derivada del canónico `aiw/roadmap/roadmap.json` recorriendo
`objectives[].phases[].runs[]` y filtrando por `queue_order === 25` (script en el
scratchpad de la sesión, fuera de `aiw/`). **Un solo nodo coincide**, en
`objectives[2].phases[2].runs[0]`:

| Campo | Valor en disco | Cita |
|---|---|---|
| `run_id` | `RUN-AIW-EVAL-CASE-CONVENTION-001` | `roadmap/roadmap.json:319` |
| `queue_order` | `25` | `roadmap/roadmap.json:320` |
| `title` | `Establish the convention for evaluation cases` | `roadmap/roadmap.json:321` |
| `phase_id` | `O3.P3` («Failure cases as an asset»), heredado del nodo padre | `roadmap/roadmap.json:315-316` |
| `status` | `active` | `roadmap/roadmap.json:324` |
| `depends_on` | `["RUN-AIW-TICKET-PARSE-REPAIR-001", "RUN-AIW-TICKET-PARSE-REGRESSION-TEST-001"]` | `roadmap/roadmap.json:325-328` |
| `full_description` | **3008 caracteres** — la cifra esperada («debe rondar 3008») exacta | `roadmap/roadmap.json:323` |

Las cuatro comprobaciones de la guarda, ejecutadas sobre ese nodo:

| # | Comprobación | Resultado |
|---|---|---|
| a | `title` EXACTAMENTE `Establish the convention for evaluation cases` | **PASA** — igualdad estricta |
| b | `full_description` contiene `RUN-AIW-TICKET-PARSE-REGRESSION-TEST-001` | **PASA** |
| c | `full_description` NO contiene `THREE EXIST TODAY` | **PASA** — no aparece |
| d | `full_description` contiene `THE ADJUDICATION THIS RUN OWES` | **PASA** |

La corrección de premisa entró completa: el texto vigente hereda como hecho la
frontera del `#24`, registra que los seis reparados parsean, que solo
`ERROR-000-sandbox` parsea de los tres que este run nombraba al nacer, que
`999-sandbox-imposible` no tiene encarnación viva, y deja la adjudicación
abierta a este run (`roadmap/roadmap.json:323`). El mundo del que deliberó el
intento abortado del 2026-07-29 (`MEDICION-GUARDA-PARSEO-CASOS-EVALUACION.md`,
entonces `queue_order` 24, premisa «THREE EXIST TODAY») ya no es el del canónico.

---

## 2. El terreno, medido de primera mano (criterio 2)

Método: `parseObjective` y `OUTCOMES` **importados del módulo real**
(`import { parseObjective, OUTCOMES } from '.../aiw/kernel.mjs'`; el guard de
entry-point de `kernel.mjs:470` hace el import inocuo). Script en el scratchpad,
fuera de `aiw/`. La columna «asertado por el test» está **derivada leyendo
`tests/ticket-parse.test.mjs`**: recorre `objectives/**` y excluye por nombre
únicamente `processed/` (`HISTORICAL`, `ticket-parse.test.mjs:17`, `:29-33`);
todo lo demás se aserta (`:40-48`), y un segundo test impide el verde silencioso
de un recorrido roto (`:35-38`).

### 2.a Inventario de candidatos — los 22, uno a uno

| # | Ruta (`objectives/…`) | Carpeta | ¿Parsea? | ¿Asertado? | `project` |
|---|---|---|---|---|---|
| 1 | `parked/001-arithmetic-columns-guard.md` | parked | **sí** | **SÍ** | `jame_snapshot` |
| 2 | `parked/002-hierarchy-docs-drift.md` | parked | **sí** | **SÍ** | `jame_snapshot` |
| 3 | `parked/003-video-provider-docs-drift.md` | parked | **sí** | **SÍ** | `jame_snapshot` |
| 4 | `processed/APPROVED-000-sandbox-suma.md` | processed | **NO** — abort `kernel.mjs:147:29` | NO | — |
| 5 | `processed/APPROVED-001-console-projector.md` | processed | sí | NO | `console` |
| 6 | `processed/APPROVED-002-canonical-path-and-autoproject.md` | processed | sí | NO | `console` |
| 7 | `processed/APPROVED-003-roadmap-emitter.md` | processed | sí | NO | `console` |
| 8 | `processed/APPROVED-003b-startup-projection-all-views.md` | processed | sí | NO | `console` |
| 9 | `processed/APPROVED-004-snapshot-enrichment.md` | processed | sí | NO | `console` |
| 10 | `processed/APPROVED-005-roadmap-contract-fix.md` | processed | sí | NO | `console` |
| 11 | `processed/APPROVED-006-roadmap-delivery-path.md` | processed | sí | NO | `console` |
| 12 | `processed/APPROVED-a-resta.md` | processed | **NO** — abort `:147:29` | NO | — |
| 13 | `processed/APPROVED-b-multiplica.md` | processed | **NO** — abort `:147:29` | NO | — |
| 14 | `processed/ERROR-000-sandbox.md` | processed | sí | NO | `sandbox` |
| 15 | `processed/HUMAN_REVIEW-999-sandbox-imposible.md` | processed | **NO** — abort `:147:29` | NO | — |
| 16 | `processed/HUMAN_REVIEW-c-imposible.md` | processed | **NO** — abort `:147:29` | NO | — |
| 17 | `qualification/e5-secreto.md` | qualification | **sí** | **SÍ** | `sandbox` |
| 18 | `qualification/e6-changes-requerido.md` | qualification | **sí** | **SÍ** | `sandbox` |
| 19 | `qualification/e8-multiarchivo.md` | qualification | **sí** | **SÍ** | `sandbox` |
| 20 | `queue-e7/a-resta.md` | queue-e7 | **sí** | **SÍ** | `sandbox` |
| 21 | `queue-e7/b-multiplica.md` | queue-e7 | **sí** | **SÍ** | `sandbox` |
| 22 | `queue-e7/c-imposible.md` | queue-e7 | **sí** | **SÍ** | `sandbox` |

Los cinco abortos son idénticos: `objective.md invalid: missing required
sections: project, objective, criteria. See templates/objective.md`, los cinco
en `kernel.mjs:147:29`. Reparto por carpeta: parked 3, processed 13,
qualification 3, queue-e7 3, pending 0 (solo su `.gitkeep`; el otro `.gitkeep`
vive en `processed/`). Los 17 que parsean toman `maxRounds` 3 (default,
`kernel.mjs:123`).

**Cifras del encargo, verificadas contra disco: las cuatro coinciden.**
22 `.md` ✔ · 17 parsean / 5 no ✔ · los cinco en `processed/` ✔ · suite en
51/51 ✔ (§8).

### 2.b Los cinco desenlaces — leídos de `OUTCOMES`, y la precisión que el disco impone

`OUTCOMES` verbatim del módulo real (`kernel.mjs:28-33`), medido hoy:

```json
{"APPROVED":{"state":"APPROVED","exit":0},
 "BLOCKED":{"state":"BLOCKED","exit":3},
 "ROUNDS_EXHAUSTED":{"state":"HUMAN_REVIEW","exit":2},
 "HUMAN_REVIEW":{"state":"HUMAN_REVIEW","exit":4}}
```

**Gana el disco y se declara: `OUTCOMES` tiene CUATRO claves, no cinco.** El
quinto desenlace es `ERROR`/exit 1, que no pasa por esa tabla: sale por el catch
del CLI (`kernel.mjs:27`, comentario «Internal error/abort is 1, handled in the
CLI catch»; `kernel.mjs:470-477`, `process.exit(isAbort ? e.code : 1)` en
`:476`), y quien lo cuenta como quinto es la cola: `queue.mjs:18` mapea los
cinco exit codes a etiquetas de archivo (`0 APPROVED, 2 HUMAN_REVIEW, 3 BLOCKED,
4 HUMAN_REVIEW, 1 ERROR`). Es la misma precisión que ya dejó medida
`REPARACION-PARSEO-TICKETS-AIW.md:388-402`; hoy se re-midió y sigue exacta.

Ejemplar ejecutable hoy, desenlace por desenlace (ejecutable = artefacto vivo
que parsea, verificado en 2.a; **que produzca el desenlace bajo el kernel de hoy
es `[NO VERIFICADO]` en los cinco** — nadie los ejecutó en este run):

| Desenlace | Exit | ¿Ejemplar vivo hoy? | Ruta |
|---|---|---|---|
| `APPROVED` | 0 | **SÍ** — cuatro | `objectives/qualification/e8-multiarchivo.md`, `objectives/queue-e7/a-resta.md`, `objectives/queue-e7/b-multiplica.md`, `sandbox/000-sandbox.md` (generado) |
| `BLOCKED` | 3 | **SÍ** — uno | `objectives/qualification/e5-secreto.md` (variante `BLOCKED_SECRETS`; `BLOCKED_SCOPE` solo tiene unit test `tests/guards.test.mjs`, y `BLOCKED` por veredicto no tiene ninguno) |
| `ROUNDS_EXHAUSTED` | 2 | **SÍ** — uno | `objectives/qualification/e6-changes-requerido.md` |
| `HUMAN_REVIEW` | 4 | **SÍ en variante cola; NO en run suelto** | vivo: `objectives/queue-e7/c-imposible.md`; run suelto (la rama de `999`): **ninguno** |
| `ERROR` | 1 | **NO** | solo historia: `objectives/processed/ERROR-000-sandbox.md` + `logs/INCIDENT-2026-07-11.md` |

### 2.c `QUALIFICATION.md` — qué declara cada uno de los seis, y qué desenlace ejercita

Precisión de ruta, ganada por el disco: el archivo vive en
**`aiw/records/QUALIFICATION.md`** (el alcance del encargo decía
`aiw/QUALIFICATION.md`; esa ruta no existe). Leído completo hoy. Su H1 se llama
«CALIFICACION.md — Calificación nocturna del kernel v2 en sandbox», sesión
2026-07-10, resultado global 8/8 PASS (`QUALIFICATION.md:1-3`, `:25`).

| Caso vivo | Escenario declarado (fila de la tabla resumen + ficha) | Desenlace que ejercita |
|---|---|---|
| `e5-secreto` | **E5 — guardia de secretos** (`QUALIFICATION.md:20`, ficha `:57-68`). El cuerpo vivo es la variante **E5(b)**: `src/credentialFormatter.mjs`, nombre que dispara el regex sin que el executor lo perciba — «BLOCKED_SECRETS disparó», push suprimido, ruta verificada de punta a punta (`:63-68`) | `BLOCKED`/3 |
| `e6-changes-requerido` | **E6 — camino triste `CHANGES_REQUIRED`** (`:21`, ficha `:70-78`): criterio incumplible con verificación siempre verde; 3×CHANGES_REQUIRED → HUMAN_REVIEW, **exit 2, no 4** (nota H3, `:117-119`) | `ROUNDS_EXHAUSTED`/2 |
| `e8-multiarchivo` | **E8 — feliz multi-archivo** (`:23`, ficha `:89-92`): extraer `suma` a `src/operaciones.mjs` y reexportar; APPROVED r1 tocando exactamente 2 archivos | `APPROVED`/0 |
| `a-resta` | **E7(a) — la cola end-to-end** (`:22`, ficha `:80-87`): primer resoluble, orden alfabético | `APPROVED`/0 |
| `b-multiplica` | **E7(b)** — segundo resoluble | `APPROVED`/0 |
| `c-imposible` | **E7(c)** — el imposible dentro de la cola, «HUMAN_REVIEW **sin detener la cola**», los tres archivados a `processed/<state>-<name>` (`:83-87`) | `HUMAN_REVIEW`/4 |

### 2.d Ausencia de `logs/` para los cuatro — verificada en disco

`logs/` contiene 11 entradas (9 carpetas de run + `DIAG-roadmap-invalid.md` +
`INCIDENT-2026-07-11.md`), listadas hoy. Comprobación por nombre, hoy:

| Carpeta | ¿Existe? |
|---|---|
| `logs/999-sandbox-imposible/` | **NO** |
| `logs/c-imposible/` | **NO** |
| `logs/a-resta/` | **NO** |
| `logs/b-multiplica/` | **NO** |

Los cuatro corrieron (E7 y el episodio de `999` constan con resultado observado)
y no dejaron carpeta superviviente. Es el hecho que sostiene la restricción dura
del criterio 4: una convención colgada de `logs/` habría nacido muerta.

### 2.e `999-sandbox-imposible` — barrido del árbol entero: **CONFIRMADO, sin encarnación viva**

Barrido propio de **todo** `aiw/` (128 archivos, excluido solo `.git/`),
ejecutado hoy, por nombre y por contenido:

- **Por nombre** (`999` en el nombre de archivo): **una sola aparición** —
  `objectives/processed/HUMAN_REVIEW-999-sandbox-imposible.md`, que **no parsea**
  (fila 15 de 2.a).
- **Por contenido** (`999-sandbox-imposible` como cadena): cinco archivos —
  `roadmap/roadmap.json`, `.project/roadmap.json`, `.project/snapshot.json`,
  `.aiw/project_console.snapshot.json`, `records/AUDITORIA_CONTEXTO.md`. **Las
  cinco son menciones** (el canónico, sus proyecciones y un record histórico que
  lo citan por nombre), **no encarnaciones**: ninguna es un ticket.

El canónico queda confirmado, no creído: la rama que `999` probó — «Validar el
camino triste del kernel: NO hagas ningún cambio en el código», verificación
siempre exit 1, run suelto (contenido del propio archivo; y
`AUDIT-CONTENIDO-AIW.md:733-740`, fila «Tests rojos agotando rondas, run
suelto») — **no tiene hoy ningún artefacto vivo que la ejercite**. Su gemelo de
cola (`c-imposible`) vive; la variante suelta, no. Matiz heredado que se
conserva: el exit exacto de aquel episodio es `[NO VERIFICADO]` — el prefijo
`HUMAN_REVIEW-` no distingue 2 de 4 (`AUDIT-CONTENIDO-AIW.md:693-695`); la
mecánica del kernel vigente da 4 (verificación roja, reviewer jamás invocado,
`kernel.mjs:386-389`).

### 2.f Hallazgo adicional medido — el caso generado y su triple byte-idéntico

`sandbox/000-sandbox.md` **parsea** (`project` `sandbox`) y es **byte-idéntico**
(460 bytes, comparación binaria hoy) a `objectives/processed/ERROR-000-sandbox.md`
**y** a `logs/000-sandbox/objective.md`. Es un caso vivo más, fuera de
`objectives/`: lo regenera `create-sandbox.mjs` (su fuente canónica es el
template literal de `create-sandbox.mjs:57-79`; flujo E1 en `:6`), está
gitignoreado (`aiw/.gitignore:1`), y lo aserta la suite —existencia, no-fuga a
`objectives/pending/` y parseo con el `parseObjective` real—
en `tests/sandbox-objective.test.mjs:15-28`. Sus dos episodios: run 1 APPROVED
(2026-07-10, `logs/000-sandbox/summary.md`) y run 2 ERROR (2026-07-11, el
incidente M1 en que la cola lo corrió como producción; `D-055` caso 1,
`DECISIONES.md:1839-1858`).

---

## 3. LA ADJUDICACIÓN (criterio 3)

### 3.1 Qué es un caso de evaluación — decidido

**Un caso de evaluación de AIW es el fixture vivo: un ticket `.md` que el parser
vigente parsea y que existe para producir, al ejecutarse, un desenlace declarado
del kernel o de la cola.** El registro histórico es su **procedencia**; el
autorado-desde-la-historia es su **regla de nacimiento** cuando el único
ejemplar de un escenario quedó archivado. Texto completo y vinculante:
`aiw/docs/kernel/CONVENCION-DE-CASOS-DE-EVALUACION.md` §1.

**Por qué NO el ticket histórico (lectura 2).** Tres hechos medidos, cada uno
suficiente: (1) cinco de `processed/` no parsean (2.a) y la doctrina veda
repararlos para siempre (`REPARACION-PARSEO-TICKETS-AIW.md:356-364`) — un caso
que no puede mantenerse deja sin respuesta la pregunta de vigencia que este run
existe para contestar; (2) `processed/` es destino de escritura que nada lee de
vuelta (`queue.mjs:15`, `:58`) y el test lo excluye por nombre
(`ticket-parse.test.mjs:17`) — un caso ahí es invisible a toda vigilancia, que
es la definición exacta del incidente `D-055` caso 4; (3) tres de los seis
escenarios calificados (E5, E6, E8) **no tienen ticket histórico** — corrieron
por vía directa y el kernel no archiva (cero referencias a `processed` en
`kernel.mjs`, ya medido por el `#24`: `FRONTERA-Y-TEST-DE-PARSEO-TICKETS-AIW.md
§3.1`) — así que la lectura 2 dejaría a la mitad del banco sin caso por
definición. Es además la lectura cuya contradicción de premisa abortó el intento
del 2026-07-29 (`MEDICION-GUARDA-PARSEO-CASOS-EVALUACION.md §7`, salida A).

**Por qué NO el artefacto autorado como definición general (lectura 3).** Los
tres de `qualification/` no tienen historia archivada de la que derivar — son
los originales vivos —, y los tres de `queue-e7/` ya son el artefacto vivo, con
la divergencia frente a su gemelo confinada a los seis encabezados que el `#15`
tradujo (`REPARACION-PARSEO-TICKETS-AIW.md §5, §7`). Adoptar la 3 como
definición obligaría a autorar duplicados de artefactos que ya viven, para
cumplir una forma. Confunde el acto de nacer con el ser del caso. **Pero es la
única vía legal de nacimiento desde `processed/`** — autorar desde la historia,
sin tocarla, no idéntico — y así queda adoptada (convención §1.c), con `999`
como su primer destinatario declarado.

**¿Cuarta lectura?** Se consideró presentar la síntesis como cuarta vía. No lo
es: es la lectura 1 completada — la 3 como regla de nacimiento y la 2 como
régimen de procedencia, cada una en su sitio y ninguna compitiendo. Se declara
para no esquivar la pregunta del encargo.

**El vínculo caso↔procedencia es el nombre**, no el byte:
`<DESENLACE>-<nombre>.md` (`queue.mjs:18`, `:58`;
`REPARACION-PARSEO-TICKETS-AIW.md:368-378`).

### 3.2 Cada candidato, adjudicado — ninguno queda sin decir

Los 22 del inventario, más el caso generado que el barrido obligó a nombrar:

| Candidato | Adjudicación | Razón |
|---|---|---|
| `qualification/e5-secreto.md` | **CASO** | vivo, parsea, asertado; E5(b) → `BLOCKED`/3 (2.c) |
| `qualification/e6-changes-requerido.md` | **CASO** | vivo; E6 → `ROUNDS_EXHAUSTED`/2 |
| `qualification/e8-multiarchivo.md` | **CASO** | vivo; E8 → `APPROVED`/0 |
| `queue-e7/a-resta.md` | **CASO** | vivo; E7(a) → `APPROVED`/0; almacén fuente de cola (`DISPOSICION-CARPETAS-COLA-AIW.md §2.c`) |
| `queue-e7/b-multiplica.md` | **CASO** | vivo; E7(b) → `APPROVED`/0 |
| `queue-e7/c-imposible.md` | **CASO** | vivo; E7(c) → `HUMAN_REVIEW`/4 en cola |
| `sandbox/000-sandbox.md` (fuera del inventario de `objectives/**`; nombrado por 2.f) | **CASO (generado)** | fuente de verdad en `create-sandbox.mjs:57-79`; asertado por `sandbox-objective.test.mjs`; E1 verde→verde → `APPROVED`/0 |
| `processed/APPROVED-a-resta.md` | **PROCEDENCIA** | episodio E7(a) del caso `a-resta`; cuerpo idéntico al vivo, encabezados divergen por el `#15` |
| `processed/APPROVED-b-multiplica.md` | **PROCEDENCIA** | episodio E7(b) |
| `processed/HUMAN_REVIEW-c-imposible.md` | **PROCEDENCIA** | episodio E7(c) |
| `processed/HUMAN_REVIEW-999-sandbox-imposible.md` | **PROCEDENCIA** | único resto de la rama «run suelto»; procedencia del caso **pendiente de autorar** (§4.f) |
| `processed/ERROR-000-sandbox.md` | **PROCEDENCIA** | episodio ERROR (run 2, incidente M1) del caso generado — byte-idéntico a él (2.f) |
| `processed/APPROVED-000-sandbox-suma.md` | **PROCEDENCIA (de escenario obsoleto)** | episodio E1 original «suma rota» (`QUALIFICATION.md:30-33`); ese diseño es imposible bajo el preflight de línea base verde D-012 (`kernel.mjs:321-328` aborta con base roja) — no se re-autora; su sucesor es el caso generado verde→verde |
| `processed/APPROVED-001-console-projector.md` | **NINGUNO** | archivo histórico de un run de producción sobre `console`; no es episodio de evaluación |
| `processed/APPROVED-002-canonical-path-and-autoproject.md` | **NINGUNO** | ídem |
| `processed/APPROVED-003-roadmap-emitter.md` | **NINGUNO** | ídem |
| `processed/APPROVED-003b-startup-projection-all-views.md` | **NINGUNO** | ídem |
| `processed/APPROVED-004-snapshot-enrichment.md` | **NINGUNO** | ídem |
| `processed/APPROVED-005-roadmap-contract-fix.md` | **NINGUNO** | ídem |
| `processed/APPROVED-006-roadmap-delivery-path.md` | **NINGUNO** | ídem |
| `parked/001-arithmetic-columns-guard.md` | **NINGUNO** | ticket de trabajo vivo aparcado (`jame_snapshot`); entrada latente de la cola, no caso — no declara escenario de desenlace |
| `parked/002-hierarchy-docs-drift.md` | **NINGUNO** | ídem |
| `parked/003-video-provider-docs-drift.md` | **NINGUNO** | ídem |

**Siete casos vivos, seis procedencias, diez ningunos.** Nota sobre los tres de
`parked/`: hoy declaran `# Project` `jame_snapshot`, no registrado en
`config.json` (leído hoy: `sandbox` y `console`, `config.json:4-17`); si alguien
los ejecutara, abortarían en `kernel.mjs:274-275` con exit 1 — serían `ERROR`
por accidente, no por diseño. No los convierte en casos: un caso declara su
desenlace, no tropieza con él.

---

## 4. La convención (criterio 4) — lo decidido, con su dónde

Texto vinculante: **`aiw/docs/kernel/CONVENCION-DE-CASOS-DE-EVALUACION.md`**.
Respuestas, en resumen fiel:

- **(a) Dónde vive un caso:** en un banco bajo `objectives/` —
  `qualification/` (invocación directa del kernel) y `queue-e7/` (cola, almacén
  fuente desde el que se siembra `pending/`) — más el caso generado del sandbox,
  cuya fuente de verdad es `create-sandbox.mjs:57-79`. Nunca en `processed/`
  (frontera del `#24`); no reside en `pending/`. Un banco nuevo queda asertado
  por defecto, sin tocar ningún test (diseño de exclusión,
  `ticket-parse.test.mjs:17`).
- **(b) Qué declara que prueba, y forma:** el cuerpo del ticket porta lo que el
  caso prueba; la declaración legible vive en un solo sitio,
  `aiw/docs/kernel/CASOS-DE-EVALUACION.md`, con siete campos por entrada (ruta,
  escenario, arnés, desenlace+exit+variante, procedencia, guardián en la suite,
  última ejecución probada). `QUALIFICATION.md` queda como procedencia de los
  escenarios: clase H, citada, jamás editada.
- **(c) Cómo llega la suite:** por los dos mecanismos existentes —
  `ticket-parse.test.mjs` (todo banco, por exclusión de `processed/`) y
  `sandbox-objective.test.mjs` (el generado). La suite garantiza **parseo**; la
  ejecución es acto de calificación del operador. Ningún mecanismo nuevo; el
  gate de evals sigue NO-entrado (`D-055` caso 3, `DECISIONES.md:1888-1898`).
- **(d) Vigencia y muerte:** vivo-que-parsea lo garantiza la suite verde
  (el rojo nombra ruta y mensaje); vivo-que-produce-su-desenlace solo lo prueba
  una ejecución real y entre calificaciones queda `[NO VERIFICADO]` por
  declaración estándar (precedente `REPARACION-PARSEO-TICKETS-AIW.md:422-428`).
  Muerte de parseo → se repara el artefacto vivo con el método del `#15`, jamás
  la procedencia. Muerte de escenario → re-autorado o retiro **por decisión**,
  nunca por omisión; si el kernel volvió imposible el escenario a propósito, se
  declara obsoleto (ejemplar: el E1 «suma rota» bajo D-012). **La vigencia jamás
  se lee de `logs/`.**
- **(e) Cobertura de los cinco desenlaces:** la tabla de 2.b, incorporada a la
  declaración. `APPROVED` cuatro ejemplares; `BLOCKED` uno (variante secretos);
  `ROUNDS_EXHAUSTED` uno; `HUMAN_REVIEW` uno en cola y **cero en run suelto**;
  `ERROR` **cero**, solo historia.
- **(f) El desenlace que `999` probaba:** se declara **qué habría que autorar y
  no se autora** — `objectives/qualification/999-sandbox-imposible.md`,
  encabezados ingleses del template vigente (`templates/objective.md:4-23`),
  `# Project` `sandbox`, cuerpo semánticamente el del episodio (no-op +
  verificación siempre exit 1), autorado **desde**
  `processed/HUMAN_REVIEW-999-sandbox-imposible.md` sin tocarlo; mismo nombre
  base porque el nombre es el vínculo; ejercitaría `HUMAN_REVIEW`/4 en run
  suelto; no pasa por la cola, así que no genera destino de archivado. Al nacer
  queda asertado por defecto y entra a la declaración. Para `ERROR`/1 **no se
  adjudica deuda**: es el kernel negándose a correr, no un veredicto
  (`DECISIONES.md:1853-1854`); un caso diseñado es posible (ticket que parsea y
  aborta determinista, p. ej. proyecto no registrado) y queda a decisión del
  operador.

**Restricción dura, cumplida:** la convención no depende de `logs/` en ninguna
forma — ni existencia, ni frescura, ni resultado; el hecho que lo obliga está
medido en 2.d. No hubo conflicto que reportar: nada de lo escrito toca `logs/`.

**Guarda de coherencia, cumplida:** la convención no implica reparar, reescribir
ni mover nada bajo `processed/` — lo declara procedencia intocable en cada acto
de su tabla de régimen (§9 del documento). No hubo colisión con la doctrina de
inmutabilidad ni con la frontera del test.

**Disciplina de re-ejecución y el peligro que la justifica (convención §8):**
un caso de cola se ejecuta sembrando en `pending/` una **copia de trabajo con
nombre fechado**; el canónico queda en su banco. Razón medida: la cola archiva a
`processed/<STATE>-<nombre>` (`queue.mjs:58`) y `archiveMove` usa `git mv -f` o
`renameSync` (`queue.mjs:26-31`) — si el destino existe, **lo sobrescribe**.
Re-ejecutar `a-resta` con su nombre canónico y desenlace `APPROVED` reemplazaría
`processed/APPROVED-a-resta.md`, el episodio de 2026-07-10: falsificación del
registro histórico por mecánica. El hallazgo de fondo — **el archivado de la
cola no es idempotente frente a nombres repetidos** — es del hilo de `aiw`
(kernel/cola) y se deja NOMBRADO en §9; corregir `queue.mjs` sería mecanismo con
su propio régimen y no es de este run.

---

## 5. La declaración de los casos vigentes (criterio 5)

Entregada en la forma que la convención define:
**`aiw/docs/kernel/CASOS-DE-EVALUACION.md`**, declarada el 2026-07-30, con las
siete entradas completas (campos de 4.b) y la tabla de cobertura. Resumen:

| # | Caso (ruta real, verificada) | Arnés | Desenlace | Procedencia |
|---|---|---|---|---|
| 1 | `objectives/qualification/e5-secreto.md` | kernel directo | `BLOCKED`/3 (`BLOCKED_SECRETS`) | — (E5b, `QUALIFICATION.md:57-68`) |
| 2 | `objectives/qualification/e6-changes-requerido.md` | kernel directo | `ROUNDS_EXHAUSTED`/2 | — (E6, `:70-78`) |
| 3 | `objectives/qualification/e8-multiarchivo.md` | kernel directo | `APPROVED`/0 | — (E8, `:89-92`) |
| 4 | `objectives/queue-e7/a-resta.md` | cola | `APPROVED`/0 | `processed/APPROVED-a-resta.md` |
| 5 | `objectives/queue-e7/b-multiplica.md` | cola | `APPROVED`/0 | `processed/APPROVED-b-multiplica.md` |
| 6 | `objectives/queue-e7/c-imposible.md` | cola | `HUMAN_REVIEW`/4 | `processed/HUMAN_REVIEW-c-imposible.md` |
| 7 | `sandbox/000-sandbox.md` (generado: `create-sandbox.mjs:57-79`) | kernel directo | `APPROVED`/0 | `logs/000-sandbox/` (APPROVED) y `processed/ERROR-000-sandbox.md` (ERROR), byte-idénticos al vivo |

Los siete parsean (medido hoy, 2.a y 2.f); su producción del desenlace bajo el
kernel de hoy es `[NO VERIFICADO]` en los siete, y así lo declara cada entrada.

---

## 6. Lo que este run NO hizo (criterio 6)

- **No movió, renombró ni borró ningún archivo.** La convención concluye que
  nada debe moverse: los bancos se quedan (la deuda de nombre de `queue-e7/` se
  registra en §9 como pendiente nombrado, sin movimiento).
- **No autoró ningún fixture.** El caso de `999` queda declarado (4.f) y sin
  escribir; el de `ERROR`, como decisión del operador.
- **No reparó ningún ticket, en ninguna carpeta.** Los cinco de `processed/`
  siguen sin parsear — que es exactamente su estado correcto bajo la frontera.
- **No tocó `processed/` ni un byte** — probado en §8:
  `git status --porcelain -- objectives/processed/` sale **vacío**.
- **No tocó `kernel.mjs`, `queue.mjs`, `create-sandbox.mjs` ni ningún test.**
  Cero mecanismo: la compuerta de `CONST §4` ni se abrió ni hizo falta — no
  apareció la tentación de añadir un paso al kernel que el encargo mandaba
  reportar.
- **No editó `roadmap/roadmap.json`** (la modificación que muestra git es la
  suciedad de apertura, presente desde antes de este run e idéntica al cierre).
- **No cerró su propio run ni re-emitió `.project/`.** No corrió la suite de
  `aiw-console`. No tocó código de consola.

---

## 7. Dónde se colocó el entregable, y la regla que lo decide (criterio 7)

Leídos, como manda el criterio:
`context/aiw-console/records/CONVENCION-DOCUMENTACION-AIW.md` y
`aiw/docs/docs_index.json` (más el texto vinculante
`aiw/docs/docs_management/CONVENCION-DE-DOCUMENTACION.md`, que el record
declara como entregable).

**Derivación, regla a regla — no hubo choque entre convenciones:**

1. Los dos documentos pasan las tres pruebas de
   `CONVENCION-DE-DOCUMENTACION.md §1` (sujeto AIW, destinatario humano,
   **quedan falsos cuando AIW cambia y alguien debe corregirlos**) → **clase A**
   → viven bajo `aiw/docs/` en un área por audiencia (§3.1).
2. **Área `kernel/`** — su audiencia es quien extiende el kernel: los casos
   existen para probar los desenlaces del kernel, y quien toca `kernel.mjs`
   necesita saber qué cobertura debe seguir viva. Es la audiencia declarada del
   área (`§3.1: «kernel/ — quien extiende el kernel»`) y el área ya estaba
   asignada a esta clase de documento por la tabla del índice
   (`docs_index.json:13`, regla `^docs/kernel/[^/]+\.md$` → `primary`/`kernel`).
   El área nace hoy con dos documentos — cumple la regla de creación («más de un
   documento», §3.1).
3. **Forma:** `MAYUSCULA-KEBAB.md`, H1 descriptivo, cuerpo en español con
   tokens verbatim, y **ningún documento legisla**: ambos describen lo que este
   run adjudicó y citan run, records y decisiones (§5 reglas 1-4).
4. **Indexado:** clase A se indexa (`docs_index.json:6`, regla de selección;
   tabla §4.2). Se añadieron **dos entradas** a `aiw/docs/docs_index.json`
   (`nav_tier` `primary`, `ia_bucket` `kernel`, `default_visible` `true`),
   coherentes con el `nav_tier_model` ya presente. Los archivos de caso, en
   cambio, son clase E/I — insumo/fixture — y **no se indexan**: no hubo que
   tocar nada por ellos.

**Rutas resultantes:**
`aiw/docs/kernel/CONVENCION-DE-CASOS-DE-EVALUACION.md` y
`aiw/docs/kernel/CASOS-DE-EVALUACION.md`, ambas indexadas.

---

## 8. Verificación final (criterio 8)

**La suite — dos corridas, antes y después de escribir los entregables,
idénticas.** `aiw` no tiene `package.json` (verificado en el listado del repo);
invocación desde `aiw/` con los doce archivos expandidos explícitamente:

```
node --test tests/archive-move.test.mjs tests/checkpoint.test.mjs
  tests/guards.test.mjs tests/objective.test.mjs tests/observability.test.mjs
  tests/preflight.test.mjs tests/sandbox-objective.test.mjs tests/scope.test.mjs
  tests/secrets.test.mjs tests/supervisor.test.mjs tests/ticket-parse.test.mjs
  tests/verdict.test.mjs
```

| Corrida | tests | pass | fail |
|---|---|---|---|
| Antes de escribir (línea base del terreno) | 51 | **51** | 0 |
| Después de escribir los tres archivos de `aiw` | 51 | **51** | 0 |

**51/51, el umbral exigido.** (Nota operativa: `sandbox-objective.test.mjs`
regenera `aiw/sandbox/` ejecutando el generador real, que hace `git init` y un
commit **dentro de `sandbox/`** — mecánica propia y sancionada de la suite, no
un acto de git de este run.)

**Git — dos lecturas de `status --porcelain`, la superficie exacta declarada:**

| Momento | Salida |
|---|---|
| Antes de escribir | 6 líneas: ` M .project/docs_index.json`, ` M .project/guardrails.json`, ` M .project/no_claims.json`, ` M .project/roadmap.json`, ` M .project/snapshot.json`, ` M roadmap/roadmap.json` — la suciedad de apertura del ciclo vigente, ya caracterizada por records previos |
| Después de escribir | las mismas 6 **más exactamente dos**: ` M docs/docs_index.json` y `?? docs/kernel/` — las dos superficies de escritura autorizadas de este run |

**`git status --porcelain -- objectives/processed/`: vacío.** Nada bajo
`objectives/processed/`, que es lo que el criterio exige. Ningún cambio bajo
`objectives/` en absoluto.

---

## 9. QUÉ QUEDA PENDIENTE

**Movimientos no ejecutados: ninguno pendiente.** La convención concluye que
nada debe moverse; no hay lista de movimientos por consumar.

**Fixtures por autorar:**

1. **`objectives/qualification/999-sandbox-imposible.md`** — el caso de la rama
   «camino triste en run suelto», con la forma completa declarada en la
   convención §7 y en 4.f de este record. Acto propio posterior; hasta entonces
   la rama queda **SIN EJEMPLAR VIVO** y así consta en la declaración.
2. **Caso diseñado para `ERROR`/1** — posible, no adjudicado como deuda;
   decisión del operador (convención §7, último párrafo).
3. **Recalificación de los siete casos vivos** — su producción del desenlace
   bajo el kernel de hoy es `[NO VERIFICADO]` (última probada: 2026-07-10);
   la convención §5.b prescribe recalificar tras cambios de parser, guardias o
   supervisor. Acto del operador, presupuestado.

**Citas que habría que actualizar** — solo si un acto futuro decidiera
consolidar o renombrar los bancos (esta convención NO lo propone; se listan las
superficies vivas que citan las rutas de banco, porque los records congelados no
se actualizan):

- `aiw/docs/kernel/CASOS-DE-EVALUACION.md` — las siete entradas (documento vivo
  de este run; se corrige con el movimiento).
- `aiw/docs/kernel/CONVENCION-DE-CASOS-DE-EVALUACION.md` §2 — la tabla de
  bancos (ídem).
- `aiw/roadmap/roadmap.json:323` — el `full_description` del `#25` nombra
  `qualification/` y `queue-e7/`; corregir el canónico es acto de la cabina.
- `aiw-console/tools/projector/project.mjs:97` — `OBJECTIVE_CLASSIFICATIONS`
  recorre `pending/parked/processed`: hilo de la consola (abajo).

**Hallazgos nombrados y pasados a su hilo:**

4. **Hilo `aiw` (kernel/cola):** el archivado de la cola **no es idempotente
   frente a nombres repetidos** — `queue.mjs:58` compone
   `processed/<STATE>-<nombre>` y `archiveMove` (`queue.mjs:26-31`) sobrescribe
   destino existente con `git mv -f` o `renameSync`. Re-ejecutar un caso de cola
   con su nombre canónico reemplazaría el episodio archivado de 2026-07-10. La
   convención lo mitiga con papel (copia de trabajo fechada, §8); si algún día
   se quiere blindar en código, es mecanismo y necesita su propio régimen
   (`CONST §4`). Se nombra; no se recomienda diseño aquí.
5. **Hilo `aiw-console`:** los dos bancos de casos siguen invisibles al
   proyector (recorre exactamente `pending/parked/processed`,
   `project.mjs:97`). `DISPOSICION-CARPETAS-COLA-AIW.md §9` dejó ese candidato
   condicionado a que la convención existiera; **desde hoy existe**
   (`aiw/docs/kernel/CONVENCION-DE-CASOS-DE-EVALUACION.md`). Se NOMBRA para su
   hilo, sin ticket y sin recomendación de arreglo, como manda este encargo.
6. **Deuda de nombre de `queue-e7/`** — la carpeta nombra un experimento (E7),
   no la clase «casos de cola» que hoy aloja. Se registra; renombrar es un
   movimiento con costo de citas (lista de arriba) y no se propone.
7. **Ruta de `QUALIFICATION.md` en encargos futuros** — el alcance de este
   encargo la daba como `aiw/QUALIFICATION.md`; en disco vive en
   `aiw/records/QUALIFICATION.md`. Ganó el disco; que la cabina transcriba la
   ruta real en encargos venideros.

---

## 10. Inferencias y no verificados

- **[NO VERIFICADO]** que ninguno de los siete casos vivos **produzca hoy** el
  desenlace que declara: este run midió parseo y disco, no ejecución — ningún
  ticket se ejecutó, igual que declararon el `#15`
  (`REPARACION-PARSEO-TICKETS-AIW.md:422-428`) y el `#24`
  (`FRONTERA-Y-TEST-DE-PARSEO-TICKETS-AIW.md §10`).
- **[NO VERIFICADO]** el exit exacto del episodio histórico de `999` (2 vs 4):
  el prefijo de archivo no lo distingue (`AUDIT-CONTENIDO-AIW.md:693-695`). La
  mecánica del kernel vigente da 4; así se declara, como mecánica y no como
  medición del episodio.
- **[NO VERIFICADO]** los estados de git más allá de las dos lecturas de
  `status --porcelain` del §8 (HEAD, diffs, historial): git quedó vedado para
  todo lo demás, incluida la fecha real de la suciedad de apertura.
- **[INFERENCIA]** que la suciedad de apertura (6 líneas de `.project/` y
  `roadmap/`) proviene del ciclo vigente consola-abre-run: coincide línea a
  línea con el patrón caracterizado por `DISPOSICION-CARPETAS-COLA-AIW.md` y
  `CONVENCION-DOCUMENTACION-AIW.md §1.b`, pero su causa no se re-midió aquí.
- **[INFERENCIA]** que `logs/000-sandbox/` documenta el run 1 (APPROVED) del
  cuerpo hoy vigente del caso generado: se apoya en la identidad byte a byte de
  su `objective.md` con el vivo (medida hoy) y en la forense del audit
  (`D-055` caso 1, `DECISIONES.md:1839-1858`), no en una lectura propia de
  aquel run.

Todo lo demás está medido de disco en esta sesión, con su comando o su
`ruta:línea`: el inventario y los parseos por ejecución del `parseObjective`
real; `OUTCOMES` por import del módulo real; el barrido de `999` sobre los 128
archivos del árbol; las identidades byte a byte por comparación binaria; la
suite por `node --test` con los doce archivos; git por `status --porcelain` dos
veces. Lo citado de records o de `DECISIONES.md` va siempre como cita con su
`ruta:línea`.

---

## 11. Status y cierre

**El `#25` debe quedar en `completed`.** Sus nueve criterios están cumplidos: la
guarda de identidad y de premisa pasó entera (§1); el terreno está medido de
primera mano con las cuatro cifras confirmadas y dos hallazgos extra (§2); la
adjudicación está decidida con las tres vías argumentadas y los 22 candidatos
clasificados sin omisión (§3); la convención responde dónde/qué/cómo/vigencia/
cobertura/hueco-de-999, sin depender de `logs/` y sin rozar `processed/` (§4);
la declaración de los siete casos vigentes existe en la forma que la convención
define (§5); nada de lo vedado se hizo (§6); el entregable está colocado e
indexado donde la convención de documentación manda, sin choque (§7); la suite
quedó en 51/51 y `objectives/processed/` intacto ante git (§8); y este record
es el del criterio 9, con su sección de pendientes (§9).

**Este record no cambia ningún status.** El operador cierra el `#25` desde la
consola.
