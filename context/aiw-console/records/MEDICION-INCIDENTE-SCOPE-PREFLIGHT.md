# MEDICIÓN DEL INCIDENTE DEL PRE-FLIGHT DE ALCANCE

**Fecha:** 2026-07-29 · **Sujeto:** run de `queue_order` 22,
`RUN-AIW-SCOPE-PREFLIGHT-GUARD-001` · **Naturaleza:** encargo de taller, LECTURA
ÚNICAMENTE sobre `aiw`. No se escribió un byte en ese repo. No se ejecutó git en
ninguna forma. No se tocó la consola, ni el status de ningún run, ni el orden de
la cola. · **Máquina:** PC (Windows 10, `C:\Users\chris\Documents\AIW_Workspace\`).

Este record MIDE. No propone reparación, no redacta la entrada de `DECISIONES.md`,
no diseña el guard.

---

# VEREDICTO: **NO EXISTE**

**No hay un solo run en disco que haya muerto por un `# Scope` que no apuntara a
ningún archivo real del repo objetivo.** La ausencia está MEDIDA sobre las cuatro
superficies, archivo a archivo y comando a comando (§5). El evento que
`CONSTITUCION §4` exige —un incidente, no una idea ni un miedo (`CONST:32`)— no ha
ocurrido.

Y un hecho SEPARADO, que no debe leerse como el mismo: el cuarto campo de
`CONST:30-32` («por qué el diff matinal no lo cazó») **tampoco tiene respuesta en
disco** — pero eso es consecuencia de que no hay incidente que diagnosticar, no una
laguna documental sobre un incidente ocurrido. Son dos hechos distintos y se
declaran por separado (§5.6).

La compuerta de `CONST §4` para el run 22 **sigue cerrada**, y la medición confirma
—no refuta— lo que su propio `full_description` ya afirmaba.

---

## 1. Guarda de identidad — PASA

Derivado del canónico `aiw/roadmap/roadmap.json` por `queue_order` 22
(`roadmap/roadmap.json:286-296`):

| campo | valor medido |
|---|---|
| `title` | `Make the scope pre-flight demand a real match` |
| esperado por el encargo | `Make the scope pre-flight demand a real match` |
| comparación | **EXACTA** (byte a byte, longitud 45) |
| `run_id` | `RUN-AIW-SCOPE-PREFLIGHT-GUARD-001` (`:287`) |
| `phase_id` | `O3.P1` — «The known leak» (`:283-284`) |
| `objective_id` | `O3` — «Reliable autonomous run» (`:279-280`) |
| `lane` | **EL CAMPO NO EXISTE EN ESE RUN** |

Sobre `lane`: medido, no supuesto. El campo `lane` aparece en exactamente **6** de
los 42 runs — `queue_order` 18, 19, 27, 32, 36 y 42, todos con valor
`DOCUMENTATION` (`roadmap/roadmap.json:229, 240, 371, 452, 523, 627`). El run 22 no
está entre ellos: `('lane' in run)` devuelve `false`. Por `roadmap.json:6-13` el
carril `DEVELOPMENT` es el `default: true`, así que el run 22 resuelve a
`DEVELOPMENT` en lectura — pero **resuelto no es declarado**, y el encargo pedía el
campo verbatim. No lo hay.

El run no se buscó por `run_id` ni por slug: se derivó por posición y se verificó
el título, en ese orden.

---

## 2. Estado del canónico — cifras verificadas

Medido con `node -e` sobre `aiw/roadmap/roadmap.json` (parseo del JSON y recorrido
`objectives → phases → runs`).

### 2.1 Status de 21 y 22

| `queue_order` | `run_id` | `status` |
|---|---|---|
| 21 | `RUN-AIW-THIRD-PROJECT-001` | `completed` (`:270`) |
| 22 | `RUN-AIW-SCOPE-PREFLIGHT-GUARD-001` | `planned` (`:293`) |

### 2.2 Totales

| magnitud | medido | cifra del ticket | veredicto |
|---|---|---|---|
| objetivos | **6** | — | — |
| fases | **29** | — | — |
| runs | **42** | 42 | **COINCIDE** |
| `queue_order` denso, único, contiguo `1..N` | **sí, 1..42** | — | — |

`queue_order`: mínimo 1, máximo 42, 42 valores distintos sobre 42 runs, y
`q[i] === i+1` para todo i. Denso, único y contiguo.

**Hallazgo colateral no pedido pero medido:** los `objective_id` son
`O1, O2, O3, O5, O6, O7`. **No existe `O4` en el canónico de `aiw`.** No se
investiga aquí — se nombra y se pasa. (`DECISIONES.md` habla de un O4 en
[[D-046]], [[D-047]], [[D-048]], pero ése es el roadmap de `aiw-console`, otro
canónico. La colisión de espacios de nombres está adjudicada en [[D-054]].)

### 2.3 Distribución de status

| status | runs |
|---|---|
| `completed` | **21** |
| `planned` | **21** |
| `active` | **0** |
| `blocked` | **0** |

Ningún run activo y ningún run bloqueado por status. El bloqueo del 22 es
**documental** (`CONST §4` vía [[D-055]]), no un `status: "blocked"`.

### 2.4 O2 y O1 por separado

| objetivo | fases | runs | cifra del ticket | veredicto |
|---|---|---|---|---|
| `O2` | **7** | **10** | 7 fases, 10 runs | **COINCIDE** |
| `O1` | **2** | **11** | — | — |

Resto, para contexto: `O3` 6 fases / 6 runs · `O5` 4 / 5 · `O6` 4 / 4 · `O7` 6 / 6.

### 2.5 Las otras dos cifras fechadas del ticket

| cifra citada | medido hoy | comando | veredicto |
|---|---|---|---|
| 58 archivos en `logs/` | **58** | `find logs -type f \| wc -l` | **COINCIDE** |
| `kernel.mjs` en 478 líneas | **478** | `wc -l kernel.mjs` | **COINCIDE** |

Las cuatro cifras que el ticket traía fechadas de mediciones anteriores siguen
siendo ciertas hoy. Ninguna discrepancia contra el disco.

---

## 3. Aristas hacia el `#22` — medición

Recorridos **los 42 runs** del canónico, leyendo el `depends_on` de cada uno.

**Runs cuyo `depends_on` contiene `RUN-AIW-SCOPE-PREFLIGHT-GUARD-001`:
NINGUNO. La lista está VACÍA, y eso es un resultado medido, no una suposición.**
El recorrido cubrió los 42 nodos; el filtro devolvió `count: 0`.

**`depends_on` propio del `#22`: `[]`** — array vacío, verbatim
(`roadmap/roadmap.json:294`).

Es decir: el run 22 **no bloquea a nadie y nadie lo bloquea a él por dependencia**.
Su única atadura es la documental de `CONST §4`.

Para que la ausencia quede acotada, éstos son los 7 runs que sí declaran
dependencias (los únicos del canónico):

| `queue_order` | `run_id` | `depends_on` |
|---|---|---|
| 20 | `RUN-AIW-MARKDOWN-RETIREMENT-001` | `["RUN-AIW-CANONICAL-ROADMAP-001"]` |
| 24 | `RUN-AIW-EVAL-CASE-CONVENTION-001` | `["RUN-AIW-TICKET-PARSE-REPAIR-001"]` |
| 29 | `RUN-AIW-RUN-MANIFEST-001` | `["RUN-AIW-EVIDENCE-PORTABILITY-001","RUN-AIW-RUN-IDENTITY-001"]` |
| 30 | `RUN-AIW-RUN-COST-ACCOUNTING-001` | `["RUN-AIW-RUN-MANIFEST-001"]` |
| 34 | `RUN-AIW-RUN-CATEGORY-FIELD-001` | `["RUN-AIW-PER-PROJECT-PUSH-001"]` |
| 35 | `RUN-AIW-BATCH-TO-BRANCH-001` | `["RUN-AIW-RUN-CATEGORY-FIELD-001"]` |
| 41 | `RUN-AIW-LONG-UNATTENDED-SESSIONS-001` | 6 ids, ninguno el 22 |

Nótese el 24: depende del run de reparación de parseo, **no** del 22. La
distinción parseo/scope está también en las aristas del roadmap.

---

## 4. Las tres patas del bloqueo

Reglas leídas de primera mano del archivo, **no citadas de ningún record**:
`aiw/CONSTITUCION.md:28-35` y `projects/aiw-console/context/DECISIONES.md:230-244`.

### 4.0 El texto de la regla, verbatim

```
28: ## 4. Presupuesto de complejidad
29: - Techo duro del kernel: ~500 líneas. Para añadir, se borra.
30: - Ningún mecanismo nuevo sin incidente documentado en ../projects/aiw-console/context/DECISIONES.md:
31:   fecha, qué se rompió, qué costó, por qué el diff matinal no lo cazó.
32:   Una idea no es un incidente. Un miedo no es un incidente.
33: - Todo mecanismo nace con criterio de borrado escrito: "se elimina si X".
34: - Prohibido reintroducir sin incidente: familias, detectores, contract-quality,
35:   waivers, carpetas de lifecycle, resolvers, coordinators.
```

### 4.a Pata 1 — Los cuatro campos de `CONST:30-32` en `D-028`

`D-028` ocupa `DECISIONES.md:230-244`. Campo por campo:

| campo exigido | ¿presente? | fragmento que lo cubre |
|---|---|---|
| **fecha** | **SÍ** | `:230` — «`## D-028 — 2026-07-20 — Pre-flight de scope debe exigir match real (fuga a cerrar)`» |
| **qué se rompió** | **SÍ** | `:231-235` — «Fuga verificada en disco: el `# Scope` de un objetivo solo se valida por NO-VACÍO (`kernel.mjs:152`). Un scope en prosa o con un typo pasa el pre-flight, quema una corrida completa del executor, y vuelve como `BLOCKED_SCOPE` con `break rounds` inmediato (sin rondas de corrección) — un dedazo disfrazado de blocked grave» |
| **qué costó** | **PARCIAL** | `:233` — «quema una corrida completa del executor». Es el coste **hipotético por ocurrencia**, en condicional y sin sujeto: ningún run, ninguna fecha, ninguna cifra. Y la propia entrada se desmiente a continuación en `:235-237`: «Los dos únicos blocks observados en la calificación (E4, E5b) fueron por causas menores, no graves» |
| **por qué el diff matinal no lo cazó** | **NO** | **AUSENTE.** Cero menciones en `:230-244`. Las palabras «diff» y «matinal» no aparecen en la entrada |

**Tres de cuatro, y el tercero degradado.** El campo *qué costó* describe lo que
costaría, no lo que costó; el cuarto no existe. `CONST:32` es explícito sobre qué
clase de objeto es eso: *«Una idea no es un incidente.»*

### 4.b Pata 2 — El criterio de borrado de `D-028`

Verbatim, `DECISIONES.md:243-244`:

> Criterio de borrado: N/A
> (endurece un invariante; se mantiene).

**NO está en la forma «se elimina si X» que `CONST:33` exige.** `N/A` no es una
condición: es la declaración de que no habrá condición. `CONST:33` pide un
mecanismo que nazca con la condición de su propia muerte escrita; `D-028` declara
lo contrario — que se mantiene indefinidamente.

### 4.c Pata 3 — Si algún run ha sufrido la fuga

**No.** Es el cuerpo del encargo y ocupa §5 entero.

---

## 5. LA CAZA DEL INCIDENTE

Se buscó evidencia de un run real muerto por un `# Scope` que no apuntara a ningún
archivo real del repo objetivo (prosa, typo, o glob que no matchea). Las cuatro
superficies, declaradas barridas una a una.

### 5.1 Superficie 1 — `aiw/logs/` · BARRIDA

**Inventario:** `find logs -type f | wc -l` → **58 archivos**, en 10 carpetas de run
más 2 `.md` sueltos. (Cifra del ticket confirmada, §2.5.)

**Trackeo por git: NO MEDIDO.** El encargo prohíbe git en cualquier forma, así que
el conteo de archivos trackeados no se ejecutó. `[NO VERIFICADO]`. Lo que sí se
midió, leyendo el archivo como texto: `aiw/.gitignore` tiene **5 entradas** —
`sandbox/`, `locks/`, `node_modules/`, `jame_snapshot/`, `.aiw/` — y **`logs/` NO
está entre ellas**.

> **Discrepancia registrada.** `DECISIONES.md:1851` (dentro de `D-055`, caso 1)
> afirma «`logs/` está gitignoreado y la evidencia no participa de ningún diff», y
> `:1870` repite el argumento citando «`aiw/.gitignore:4`». **El `.gitignore` de
> hoy no contiene `logs/`.** Gana el disco. La explicación más probable es que
> [[D-053]] («`logs/` se versiona, `.aiw/` no») cambió el régimen y `D-055` razonó
> sobre el estado anterior — pero eso es `[NO VERIFICADO]`: comprobarlo exigiría
> git. Se nombra la discrepancia; no se corrige nada.

**Búsqueda de `BLOCKED_SCOPE`:** `grep -rn "BLOCKED_SCOPE"` sobre todo el repo
(excluyendo `.git`) devuelve **19 líneas, y CERO de ellas están en `logs/`**. Su
reparto completo:

| dónde | qué es |
|---|---|
| `kernel.mjs:185`, `:426` | el código del guard y un comentario |
| `tests/guards.test.mjs` (4 hits), `tests/scope.test.mjs` (4 hits) | tests unitarios |
| `roadmap/roadmap.json:291`, `.project/roadmap.json:301`, `.project/snapshot.json:331` | el propio `full_description` del run 22, proyectado |
| `records/AUDITORIA_ESTADO.md:98`, `records/QUALIFICATION.md:19, :49, :53` | prosa de records |

`grep -rniE "blocked_scope\|scope.*(violat\|out of scope\|fuera de alcance)\|SCOPE_VIOLATION"` sobre
`logs/` y `objectives/` devuelve **cero líneas**.

**Los `# Scope` de los 9 runs con log**, leídos uno a uno. Todos apuntan a rutas
reales, ninguno es prosa:

| carpeta de log | `# Scope` |
|---|---|
| `000-sandbox` | `src/**, tests/**` |
| `001-console-projector` | `tools/projector/**, tests/**, docs/snapshot-schema-v1.md` |
| `002-canonical-path-and-autoproject` | `tools/projector/**, tools/project-console/serve-project-console.mjs, tests/**, docs/snapshot-schema-v1.md, projects.config.json` |
| `002-…-orphan-20260711` | idéntico al anterior |
| `003-roadmap-emitter` | `tools/projector/**, tests/**, docs/snapshot-schema-v1.md` |
| `003b-startup-projection-all-views` | `tools/project-console/serve-project-console.mjs, tests/**` |
| `004-snapshot-enrichment` | `tools/projector/**, tests/**, docs/snapshot-schema-v1.md` |
| `005-roadmap-contract-fix` | `tools/projector/**, tests/**, docs/snapshot-schema-v1.md` |
| `006-roadmap-delivery-path` | `tools/project-console/serve-project-console.mjs, tests/**, docs/snapshot-schema-v1.md` |

**Los desenlaces**, leídos de los 8 `summary.md` existentes:

**8 de 8 → `Final state: APPROVED`, «approved by reviewer in round 1», rondas
1/3.** Ni un solo `BLOCKED`, ni un `HUMAN_REVIEW`, ni un `ROUNDS_EXHAUSTED` en toda
la carpeta `logs/`.

**El único run sin `summary.md`** es
`logs/002-canonical-path-and-autoproject-orphan-20260711/`, que conserva solo
`objective.md` y `preflight.txt`. **Murió, pero no por scope.** Su post-mortem es
`logs/INCIDENT-2026-07-11.md`, leído íntegro: el `preflight.txt` marca
`2026-07-11T06:04:31.562Z` con `npm test exit=0` y 7 tests verdes; el kernel llegó
hasta `await invokeClaude('executor', …)` y el padre murió ahí. La causa
adjudicada por el propio post-mortem (§3, familia P1) es **la muerte externa del
terminal que alojaba `queue.mjs`**, con el lock huérfano y el proceso `claude`
desprendido por `shell:true` + `windowsHide:true`. El `# Scope` de ese run apunta a
cinco rutas reales de `aiw-console`. **Scope: irrelevante para su muerte.**

**Superficie 1: cero hallazgos.**

### 5.2 Superficie 2 — `aiw/objectives/` · BARRIDA

**Inventario:** 22 tickets `.md` en 4 carpetas — `parked/` (3), `processed/` (13),
`qualification/` (3), `queue-e7/` (3). Incluye archivados (`processed/`) y fallidos
(`ERROR-`, `HUMAN_REVIEW-`).

En lugar de inspeccionar a ojo, se **ejecutó el parser real del kernel** contra los
22. `kernel.mjs:227` exporta `parseObjective` y `parseGlobs`, y `kernel.mjs:470`
guarda la entrada CLI, así que importarlo no ejecuta `main()`. Script en el
scratchpad; **nada se escribió en `aiw`**.

**Resultado del parseo:**

```
TOTAL=22   PARSE-ABORT=5   SCOPE-ABORT(vacío)=0   OK=17
```

**Cero tickets con `# Scope` vacío.** La única validación que hoy existe
(`kernel.mjs:152`) no rechaza a ninguno.

**Y la prueba central: el guard que el run 22 construiría, simulado hoy.** Para
cada ticket que parsea, se resolvió su proyecto contra `aiw/config.json`, se
listaron los archivos reales del repo objetivo, y se comprobó si cada glob del
`# Scope` matchea al menos uno — usando las **mismas regex** que `parseGlobs`
genera (`kernel.mjs:153-157`):

| resultado | tickets |
|---|---|
| **`MATCH-REAL` — todos sus globs matchean archivo real** | **14 / 14** de los que tienen proyecto registrado |
| `SCOPE-MUERTO` — algún glob sin archivo real | **0** |
| `SIN-REPO` — proyecto no registrado en `config.json` | 3 (`parked/*`, proyecto `jame_snapshot`) |
| `SKIP` — no parsea | 5 |

**Cero scopes muertos.** Los 14 con repo registrado matchean el **100 %** de sus
globs: `processed/APPROVED-002…` 5/5, `APPROVED-001/003/004/005/006` 3/3 o 2/2,
`ERROR-000-sandbox` 2/2, y los 6 de `qualification/` y `queue-e7/` 1/1.

Los 3 de `parked/` declaran `# Project jame_snapshot`, que **no está registrado en
`config.json`** (solo lo están `sandbox` y `console`). Abortarían en
`kernel.mjs:275` por proyecto desconocido — **un fallo de registro, no de alcance**,
y además nunca llegaron a correr.

#### 5.2.b Fallo de PARSEO ≠ fallo de SCOPE, y una discrepancia con el ticket

Los 5 `PARSE-ABORT` fallan todos con el mismo mensaje, de `kernel.mjs:147`:

```
objective.md invalid: missing required sections: project, objective, criteria
```

La causa está medida: sus encabezados están en **español** (`# Proyecto`,
`# Objetivo`, `# Criterios de aceptación`, `# Alcance`), y `parseObjective`
(`kernel.mjs:137-144`) busca las claves en inglés. **Abortan en `kernel.mjs:147`,
que es ANTES de `parseGlobs` en `kernel.mjs:272`** — nunca alcanzan la validación de
alcance. **No prueban nada sobre el pre-flight de scope.** Son el sujeto del run 25,
no de éste.

> **Discrepancia con el ticket, registrada.** El encargo dice «los seis tickets que
> no parsean». **Hoy son CINCO, y son OTROS archivos.** Los seis que `D-055`
> (`DECISIONES.md:1911-1919`) nombra —`e5-secreto`, `e6-changes-requerido`,
> `e8-multiarchivo`, `a-resta`, `b-multiplica`, `c-imposible`, en `qualification/`
> y `queue-e7/`— **hoy parsean correctamente**: sus encabezados están en inglés
> (verificado archivo a archivo). Los reparó
> `RUN-AIW-TICKET-PARSE-REPAIR-001` el 2026-07-28, según
> `records/REPARACION-PARSEO-TICKETS-AIW.md:1-12`, que declara explícitamente que
> **no tocó `processed/`**. Los 5 que fallan hoy están todos en `processed/`:
> `APPROVED-000-sandbox-suma`, `APPROVED-a-resta`, `APPROVED-b-multiplica`,
> `HUMAN_REVIEW-999-sandbox-imposible`, `HUMAN_REVIEW-c-imposible` — las copias
> archivadas de los mismos fixtures, que quedaron atrás. Gana el disco. No se
> corrige nada; se nombra.

**Superficie 2: cero hallazgos.**

### 5.3 Superficie 3 — `DECISIONES.md` · BARRIDA

`projects/aiw-console/context/DECISIONES.md`, 2054 líneas, **57 entradas**
(`D-001`…`D-056` más `D-010-enmienda`). `D-028` está en `:230`; la última entrada
es `D-056` en `:1964`.

Se filtraron **todas** las líneas posteriores a `:245` que mencionan
`scope|pre-?flight|alcance|BLOCKED_SCOPE`. Ninguna registra un evento de esta clase.
Los hits son de otra naturaleza: «alcance» en su acepción de *scope de un encargo*
(`:306`, `:694`, `:932`, `:1035`, `:1190`, `:1829`, `:2025`…) y dos menciones de
`preflight` que son el pre-flight de **baseline verde** de [[D-012]], no el de
alcance (`:1849`, `:1926`).

**Y la entrada que decide el caso lo confirma en positivo.** `D-055`
(`DECISIONES.md:1806-1962`) adjudicó **cuatro** candidatos a mecanismo bajo
`CONST §4`:

| caso | veredicto | ¿tiene incidente con los cuatro campos? |
|---|---|---|
| 1 — manifest por run | ENTRA (`:1839`) | sí, fechado 2026-07-11 |
| 2 — lanzador desacoplado | ENTRA (`:1860`) | sí, `logs/INCIDENT-2026-07-11.md` |
| 3 — gate de evals | **NO ENTRA** (`:1888`) | no |
| 4 — test de parseo de tickets | ENTRA (`:1900`) | sí |

**El pre-flight de alcance no está entre los cuatro.** `D-055:1947-1948` cierra:
«El barrido run por run se cierra al escribir el roadmap, aplicando esta norma a
cada run nuevo» — que es exactamente cómo el run 22 nació `planned`.

**Superficie 3: cero hallazgos.**

### 5.4 Superficie 4 — Los tres records · BARRIDA

`AUDIT-CONTENIDO-AIW.md`, `RECONCILIACION-COLA-AIW.md`,
`REPARACION-PARSEO-TICKETS-AIW.md`, en
`projects/aiw-console/context/aiw-console/records/`.

`grep -niE "BLOCKED_SCOPE|pre-?flight de (alcance|scope)|scope.*(prosa|typo|dedazo)|D-028"`
sobre los tres → **cero líneas**.

**`AUDIT §6` es el forense de los runs muertos, y son tres, ninguno por scope.** La
tabla de `AUDIT-CONTENIDO-AIW.md:735-746`, leída de primera mano:

| run muerto | causa medida | ¿scope? |
|---|---|---|
| `ERROR-000-sandbox` (run 2) | abort antes de empezar, exit 1. Causa más probable: **colisión de rama** en `K:331` — el run 1 ya había creado `aiw/000-sandbox` (`AUDIT §6.1`, punto 3, marcado `[NO VERIFICADO]` allí) | **no** |
| `HUMAN_REVIEW-999-sandbox-imposible` | **tests rojos agotando rondas**; la verificación es `process.exit(1)` por diseño; el reviewer nunca se invoca (`AUDIT §6.2`) | **no** |
| `HUMAN_REVIEW-c-imposible` | idéntico, dentro de la cola (`AUDIT §6.3`) | **no** |

Los tres tienen `# Scope` bien formado (`ERROR-000-sandbox` → `src/**, tests/**`,
2/2 globs matchean; los otros dos no parsean por idioma, §5.2.b).
`RECONCILIACION-COLA-AIW.md` documenta un movimiento de dos ficheros entre
carpetas: no toca esta cuestión.

**Superficie 4: cero hallazgos.**

### 5.5 La evidencia POSITIVA de la ausencia

Lo anterior demuestra que no hay rastro. Esto demuestra algo más fuerte: que el
guard determinista **nunca se ha disparado, ni siquiera cuando se le puso una
violación de alcance delante a propósito.**

`aiw/records/QUALIFICATION.md:19` registra el escenario E4 —«Violación de
alcance»— con resultado **PASS c/ matiz**. El matiz, verbatim de `:44-55`:

> **E4 — violación de alcance (matiz de método).** Objetivo con criterio que
> exige crear en `src/` pero Alcance `docs/**`. Resultado end-to-end: el executor
> **se autolimitó** (leyó su Alcance, no escribió fuera de él, lo declaró en la
> sección 6 de su reporte), tests triviales verdes, y el **reviewer** bloqueó por
> criterio incumplido → BLOCKED, exit 3, estacionado limpio. La guardia
> determinista `BLOCKED_SCOPE` del kernel **no llegó a dispararse porque la
> primera capa (executor cooperativo) absorbe el conflicto antes**.

Tres cosas se siguen de ahí, y las tres cuentan contra la existencia del incidente:

1. **El único ensayo de violación de alcance jamás ejercido usó un scope REAL**
   (`docs/**`, ruta que existe) con un criterio contradictorio. **No fue prosa ni
   typo** — no es el caso que `D-028` describe.
2. **`BLOCKED_SCOPE` no se disparó.** El escenario que `D-028` teme —«quema una
   corrida completa del executor y vuelve como `BLOCKED_SCOPE`»— no ocurrió ni
   siquiera bajo prueba dirigida.
3. **La cobertura del guard es sintética.** `QUALIFICATION.md:51-54` lo dice: para
   validar el cinturón determinista «sin depender de la conducta del LLM» se añadió
   `tests/guards.test.mjs`. Los 8 hits de `BLOCKED_SCOPE` en `tests/` son la única
   vez que ese código se ejecuta.

Y `D-028` se contradice a sí misma sobre este punto, en `:235-237`: «Los dos
únicos blocks observados en la calificación (E4, E5b) fueron por causas menores, no
graves.»

### 5.6 El cuarto campo — declarado por separado

El encargo pide separar dos hechos, y aquí van separados:

- **Hecho A:** el incidente **no existe** (§5.1-§5.5).
- **Hecho B:** el cuarto campo de `CONST:30-32` —«por qué el diff matinal no lo
  cazó»— **no tiene respuesta en disco** (§4.a).

**B no es una laguna documental sobre un incidente ocurrido: es la consecuencia de
A.** No hay diff matinal que examinar porque no hubo run que muriera. Si el
incidente existiera y el cuarto campo faltara, la lectura sería otra —y ésa es la
razón por la que el encargo pedía distinguirlos. Aquí no aplica esa lectura.

---

## 6. El techo y el sitio de la fuga

### 6.1 El techo

| | valor |
|---|---|
| `wc -l aiw/kernel.mjs` **hoy** | **478** |
| techo declarado, `CONSTITUCION.md:28-29` verbatim | `## 4. Presupuesto de complejidad` / `- Techo duro del kernel: ~500 líneas. Para añadir, se borra.` |

Holgura nominal contra los ~500: 22 líneas. `D-055:1826-1827` deja constancia de
que el enforcement es «**humano y documental** — no hay test, ni hook, ni check en
la suite que lo compruebe». No se estima aquí el coste del guard, ni se propone su
diseño: eso es del ticket del run 22.

### 6.2 El sitio de la fuga

Los records lo sitúan en `kernel.mjs:152`. **Verificado: la línea real es exacta.**
La función es `parseGlobs`, `kernel.mjs:150-158`, transcrita verbatim:

```js
150: function parseGlobs(scope) {
151:   const items = scope.split(/[\n,]/).map((s) => s.replace(/^-\s*/, '').trim()).filter(Boolean);
152:   if (!items.length) throw new Abort('objective.md invalid: the Scope section declares no glob');
153:   return items.map((g) => {
154:     const esc = normPath(g).replace(/[.+^${}()|[\]\\]/g, '\\$&')
155:       .replace(/\*\*|\*|\?/g, (m) => (m === '**' ? '.*' : m === '*' ? '[^/]*' : '[^/]'));
156:     return { glob: g, re: new RegExp('^' + esc + '$', 'i') };
157:   });
158: }
```

**La validación vigente, íntegra, es la línea 152: `if (!items.length)`.** El scope
se trocea por comas y saltos de línea, se limpian viñetas y espacios, se descartan
los vacíos — y lo único que se exige es que **quede al menos un elemento**. Cada
elemento se compila a una regex (`:154-156`) que **nunca se contrasta contra el
disco**: se usa después, en `evaluateGuards` (`kernel.mjs:183-189`), y solo contra
los archivos que el executor ya modificó.

Punto de llamada: `kernel.mjs:272` — `const globs = parseGlobs(obj.scope || '');`,
dentro de `main()`, **después** de `parseObjective` (`:270`) y **antes** de resolver
el proyecto en `config.json` (`:274-275`). Ahí es donde el ticket del run 22
insertaría su comprobación; este record se detiene en localizarla.

---

## 7. Qué mide este record y qué no

**Medido de disco** (con `ruta:línea` o comando en cada cifra): todo §1, §2, §3,
§4 (las reglas leídas de `CONSTITUCION.md` y `DECISIONES.md`, no de records), §5.1,
§5.2, §5.3, §6.

**Citado de un record** (y señalado como tal donde aparece): `AUDIT §6.1-§6.4`
para el forense de los tres runs muertos, `QUALIFICATION.md:19, :44-55` para E4,
`REPARACION-PARSEO-TICKETS-AIW.md:1-12` para el alcance de la reparación de parseo.

**Marcado `[NO VERIFICADO]`:**
- El **trackeo por git de los 58 archivos de `logs/`** — el encargo prohíbe git en
  cualquier forma. Solo se midió que `aiw/.gitignore` no contiene `logs/`.
- **Que [[D-053]] sea la causa** de que `D-055:1851` afirme algo que el `.gitignore`
  de hoy contradice. Es la explicación más plausible; comprobarla exigiría git.

**Fuera de alcance, respetado:** no se escribió nada en `aiw`; no se redactó
`D-057` ni ninguna entrada de `DECISIONES.md`; no se propuso ni diseñó el guard; no
se estimó su coste en líneas; no se movió, insertó ni renumeró ningún run; no se
cambió ningún status; no se ejecutó git; no se corrió la suite de tests.

**Hallazgo de consola, nombrado y pasado a su hilo sin ticket ni recomendación:**
`aiw/logs/DIAG-roadmap-invalid.md` es un diagnóstico read-only de la consola
(ruta de entrega de `roadmap.json`, contrato de `v3Model`). Es histórico —su
causa raíz M1 la cerró el run `006-roadmap-delivery-path`, APPROVED el
2026-07-19— y no toca esta cuestión. Se nombra porque vive en la superficie
barrida.

---

## 8. Resumen ejecutable

| pregunta del encargo | respuesta medida |
|---|---|
| ¿El título del `#22` coincide? | **Sí, exacto.** No se abortó |
| ¿Campo `lane` en el `#22`? | **No existe** |
| ¿Cifras del ticket (42 runs, O2 7/10, 58 logs, kernel 478)? | **Las cuatro coinciden** |
| ¿Quién depende del `#22`? | **Nadie.** Lista vacía, medida sobre los 42 |
| ¿`depends_on` del `#22`? | `[]` |
| ¿Los cuatro campos en `D-028`? | **3 de 4, y el tercero degradado.** Falta «por qué el diff matinal no lo cazó» |
| ¿Criterio de borrado en forma `CONST:33`? | **No.** Dice `N/A` |
| ¿Existe el incidente? | **NO.** Cuatro superficies barridas, cero hallazgos |
| ¿Hay respuesta al cuarto campo en disco? | **No** — y es consecuencia de lo anterior, no un hecho independiente |
| ¿Dónde se valida hoy el `# Scope`? | `kernel.mjs:152`, `if (!items.length)`. Solo no-vacío |

La compuerta de `CONSTITUCION §4` para `RUN-AIW-SCOPE-PREFLIGHT-GUARD-001` **no se
abre con lo que hay en disco hoy.**
