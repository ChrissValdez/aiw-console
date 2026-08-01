# Tolerancia de los campos de clasificación de runs en `cantu-studio`

**Encargo de taller.** Hacer que `cantu-studio` admita y preserve los campos de
clasificación de runs sin adoptarlos. **No se clasificó ningún run. El canónico no se tocó.**

Este record es el número **91** en `context/aiw-console/records/`: había **90** antes de
escribirlo, y `TOLERANCIA-DE-CLASIFICACION-EN-CANTU.md` no colisiona con ninguno (los tres
vecinos temáticos son `CLASIFICACION-MOTOR.md`, `CLASIFICACION-EMISOR-Y-CONSOLA.md` y
`CLASIFICACION-CARE-BUDGET.md`, todos del lado de `aiw-console`).

---

## 1. La lista real de campos, derivada del motor — y la corrección al ticket

Derivada leyendo `aiw-console` en su HEAD commiteado. **El HEAD real es `83a8158`, no
`8f60657`**: ese último es el commit que cierra el run 43 y hoy queda cuatro commits atrás.
El motor sigue en `5ce887a`, como decía el ticket, y es el último commit que toca
`tools/roadmap/roadmap-core.mjs`.

Fuente: `aiw-console/tools/classification/classification.mjs:55-62`
(`CLASSIFICATION_STORED_FIELDS`) y `aiw-console/tools/roadmap/roadmap-core.mjs:90-101`
(`RUN_OPTIONAL_FIELDS`), `:55` (`ROOT_ALLOWED_FIELDS`).

| Campo | Dónde | Almacenado | Nota |
|---|---|---|---|
| `correctness_model` | run | sí, opcional | vocabulario cerrado (3 tokens) |
| `work_type` | run | sí, opcional | vocabulario cerrado (3 tokens) |
| `blast_radius` | run | sí, opcional | vocabulario cerrado (4 tokens) |
| `failure_surfaces` | run | sí, opcional | vocabulario cerrado (3 tokens) |
| `external_effects` | run | sí, opcional | array de strings no vacíos |
| `classified_at` | run | sí, opcional | instante ISO-8601 UTC |
| `severity` | run | **NO — derivado al leer** | de `work_type` × `blast_radius` |
| `closure_mode` | run | **NO — derivado al leer** | de `correctness_model` × `severity` |
| `care_budget` | **raíz** | sí, opcional | configuración por proyecto |

**El ticket se equivoca en dos puntos, y por eso mandaba derivar la lista del motor:**

1. **Nombra `severity` y `closure_mode` como campos a tolerar.** No lo son. Se derivan al
   leer y **nunca se almacenan**, así que no pueden aparecer en el canónico. El propio motor
   lo dice: *"`severity` and `closure_mode` are DERIVED and NEVER stored (§2), so they are
   absent from this array by construction, not by omission"* (`roadmap-core.mjs:85-86`).
   Tolerarlos habría sido tolerar una clave que es un defecto dondequiera que aparezca.
2. **Omite `external_effects`, que sí se almacena.** Es el sexto campo real.

Son seis campos de run, sí, pero **no los seis que el ticket enumera**. La lista se confirmó
por segunda vía: el `taxonomy_model` del sobre marca `stored: true, optional: true` para los
seis y `stored: false, derived_by: …` para `severity` y `closure_mode`.

---

## 2. El validador de Cantu SÍ tiene allowlist de campos de run

Sí la tiene, y por eso había algo que reparar. Dos sitios, uno cada uno, sin duplicados:

- **Runs** — declaración en `validate-project-console-state.mjs:824` (antes de la
  reparación), aplicación en `:1027-1031`, que emite `carries forbidden field ${key}`.
- **Raíz** — declaración en `:810` y `:819`, aplicación en `:975-976`, que emite
  `carries forbidden root field ${key}`.

Medición del ticket confirmada: **cero apariciones** de cualquiera de los nueve nombres en las
**2 064 líneas** del archivo. Ambas cifras exactas.

Que la allowlist existe no es teoría: con el validador **previo a la reparación** corriendo
sobre un canónico clasificado, **EXIT 1 y 63 errores `forbidden field`**. La prueba está en la
sección 7.

---

## 3. La copia del motor existe, y el daño era peor que perder campos

`cantu-studio/tools/roadmap/roadmap-core.mjs`, 1 177 líneas antes de tocarla. Medido
**empíricamente** sobre copia fuera del repo, no leyendo:

| Prueba | Antes | Después |
|---|---|---|
| `checkInvariants` sobre canónico clasificado | **7 errores** (1 raíz + 6 run) | 0 |
| `loadRaw → parse → serialize` (sin mutar) | byte-idéntico | byte-idéntico |
| `normalizeRunKeyOrder` sobre run **sin** `closeout_result` | byte-idéntico | byte-idéntico |
| `normalizeRunKeyOrder` sobre run **con** `closeout_result` | **byte-idéntico: false** | byte-idéntico |

**Los campos no se perdían: se reordenaban.** `normalizeRunKeyOrder` reconstruye las claves en
`CANONICAL_RUN_KEY_ORDER` y **añade al final lo que no conoce** (`roadmap-core.mjs:140-142`).
Con los seis campos desconocidos, un run que ya llevaba `closeout_result` volvía con la
clasificación **detrás** de él:

```
entrada:  … depends_on, correctness_model, …, classified_at, closeout_result
salida:   … depends_on, closeout_result, correctness_model, …, classified_at
```

md5 `0720301a…` → `23a6727 7…`. Los valores sobrevivían íntegros; **la byte-exactitud no**. Y
la byte-exactitud es compartida entre los dos motores, no propiedad de cada uno.

El primer intento de prueba dio falso verde porque el run elegido era `planned` y no llevaba
`closeout_result`: sin una clave posterior con la que competir, "añadir al final" coincidía
con el orden correcto. El defecto sólo aparece con un run terminal — y este repo tiene 17.

---

## 4. Cómo se ESCRIBEN los campos hoy · **la vía más barata para 46 runs**

*Sección propia, porque es lo que decide cómo clasifica el operador.*

**Sí existe vía de escritura, y no está en este repo.** La escribe el motor global.

**El verbo:** `set-classification`, en `aiw-console/tools/roadmap/roadmap-core.mjs:1222`
(`setClassification`), registrado en `KNOWN_OPS` en `roadmap-plan.mjs:29`. Escribe los seis
campos almacenados de **un** run y nada más. `classified_at` **no es argumento**: la operación
lo escribe sola, en ISO-8601 UTC. Un token o `""`/`null` borra la clave entera. Rechaza
tokens fuera de vocabulario por nombre; las combinaciones ilegales las atrapa
`checkInvariants` una etapa después, sin escribir.

**Sí admite lote.** `set-classification` está en el conjunto batcheable
(`roadmap-plan.mjs:202`), y cada sub-op lleva sus propios `args` — incluido su propio `run`
(`roadmap-plan.mjs:216`). **Un `batch` puede abarcar runs distintos.** No hay tope de tamaño:
el motor sólo rechaza el array vacío (`:177`). `declare-care-budget` es la excepción
declarada: **no** es batcheable, va sola.

**El canal:** endpoint local del console global,
`POST /<key>/__project-console/roadmap/edit` (`aiw-console/project-console/serve.mjs:124`,
`:247`). Cuerpo `{op, args, apply}`. `apply:false` = dry-run que no escribe y devuelve el
`baseline`; `apply:true` exige ese baseline (compare-and-swap), re-planea, escribe atómico y
re-emite `.project/`. **`cantu-studio` está registrado** (`project-console/projects.json`,
clave `cantu-studio` → `../../cantu-studio`), así que el endpoint resuelve su canónico. La
ruta nunca se acepta del cliente.

**Las dos vías, con su coste real para 46 runs:**

| Vía | Ciclos dry-run + apply | Nota |
|---|---|---|
| **UI del console** | **46** | La UI tiene bloque `set-classification` (`assets/project-console.js:5859`), pero `v3EditBuildBatch` recoge los sub-ops **de un solo modal**, y el modal es de **un run**. Su lote es *varias ops sobre el mismo run*, no varios runs. |
| **POST directo con un `batch`** | **1** | Un `batch` con 46 sub-ops `set-classification`, cada una con su `run`. Una previsualización, una escritura, un `.project/` re-emitido. |

**Recomendación: el POST directo.** Es 46 veces menos escrituras y, sobre todo, **una sola
transacción**: el batch aborta en el primer sub-op que falle y no escribe nada, mientras que
46 applies dejan el canónico a medio clasificar si el número 30 se cae. Coste: componer un
JSON de 46 entradas y dos llamadas HTTP.

**Lo que este encargo NO da:** `cantu-studio` sigue **sin** poder escribir estos campos. Su
CLI (`tools/roadmap/roadmap-edit.mjs`) opera sobre su propio motor, y tolerar no es adoptar:
no hay `setClassification` aquí y no debe haberlo. La escritura es del console global, y eso
es deliberado.

**Y hasta este encargo esa vía estaba rota de punta a punta.** El endpoint habría escrito
—su autoridad post-escritura es el `checkInvariants` del motor **global**, que sí conoce los
campos (`serve.mjs:359-374`)— pero el validador de Cantu habría quedado **en rojo** acto
seguido, y el operador commitea con un bloque que aborta con el validador en rojo. Esa es
exactamente la puerta que esta reparación abre.

---

## 5. El `.project/` de este repo: el sobre ya trae el vocabulario nuevo

Medido, y con un matiz que el ticket no anticipaba:

- **`.project/snapshot.json` SÍ trae `taxonomy_model`**, completo: `model`, `vocabularies`,
  `derivations`, `illegal_combinations`, `care_budget`. Los 12 vocabularios incluyen los seis
  campos almacenados con `stored: true, optional: true` y `severity` / `closure_mode` con
  `stored: false` y su `derived_by`.
- **`.project/roadmap.json` NO lo trae.** Ese sobre lleva `schema_version, project_id,
  generated_at, generated_from, sources, model, roadmap_id, title, lanes, objectives` y nada
  más. El `taxonomy_model` viaja en el snapshot, no en el árbol.
- Ambos declaran `generated_from: aiw-projector@0.12.0`, `generated_at:
  2026-08-01T04:20:48.590Z`. **La re-emisión tras la subida del proyector sí llegó a este
  repo.**

**Y el validador sigue verde con el sobre cargado.** Confirmado el acotamiento que el ticket
sospechaba: **el validador lee el canónico, no el sobre.** Su única lectura del roadmap es
`readJson(".aiw/roadmap/roadmap.json")` en `validate-project-console-state.mjs:161`; **no lee
`.project/` en ningún punto**. Por eso el vocabulario nuevo ya estaba en el disco de este repo
sin poner nada en rojo, y por eso todo el trabajo cayó del lado del canónico.

---

## 6. La reparación: TOLERAR, NO ADOPTAR

El precedente seguido es `[lanes: TOLERATE, NOT ADOPT]` en
`cantu-studio/tools/roadmap/roadmap-core.mjs:27-35` — **citado literalmente aquí como manda el
encargo**. Ese bloque listó `lanes` / `lane` / `barrier` y nada más: *"Nothing else changed:
this module derives no lane, resolves no default, enforces no barrier and offers no operation
that writes any of the three. It reads them the way it reads any field it does not interpret
-- preserved verbatim through load -> mutate -> serialize."* Y fijó que el **orden** de `lane`
y `barrier` es deliberado, *"so byte-exactness is shared, not per-tool"*.

Cuatro cambios, los cuatro aditivos, ninguno toca lógica existente:

| # | Archivo | Línea | Cambio |
|---|---|---|---|
| 1 | `tools/roadmap/roadmap-core.mjs` | 47 | `care_budget` → `ROOT_ALLOWED_FIELDS` |
| 2 | `tools/roadmap/roadmap-core.mjs` | 68 | los 6 campos → `RUN_OPTIONAL_FIELDS`, **entre `barrier` y `closeout_result`** |
| 3 | `validate-project-console-state.mjs` | 828 | `care_budget` → `ROADMAP_V3_ROOT_OPTIONAL_FIELDS` |
| 4 | `validate-project-console-state.mjs` | 857 | los 6 campos → `ROADMAP_V3_RUN_OPTIONAL_FIELDS`, mismo orden |

**La posición del cambio 2 es la reparación, no un detalle de formato.** Reproduce
exactamente el `RUN_OPTIONAL_FIELDS` del motor global, que es lo que hace que
`normalizeRunKeyOrder` deje de reordenar y el roundtrip vuelva a ser byte-idéntico.

**Qué NO se hizo, deliberadamente:** ningún token se comprueba contra su vocabulario, ninguna
combinación ilegal se aplica, `external_effects` no se comprueba que sea array,
`classified_at` no se lee como fecha, `care_budget` no se valida de forma, nada se deriva,
nada se muestra, nada se exige, y **no se añadió ninguna operación de escritura**. Los tests
E1–E4 fijan esa no-adopción por medición: un `correctness_model: "NOT_A_REAL_TOKEN"` y un
`work_type: 42` **pasan**, porque el motor que los escribe es el dueño de su vocabulario.

`severity` y `closure_mode` **siguen rechazados**, y eso es intencional (test B2).

**Sobre el criterio 11 — nada se salió de alcance.** Los cuatro cambios son entradas nuevas en
cuatro arrays. Ningún bucle, ninguna condición y ningún mensaje de error se reescribió. Un
matiz que sí conviene declarar: unirse a `ROADMAP_V3_RUN_OPTIONAL_FIELDS` hace que los seis
campos hereden la regla *"omitir en vez de guardar `null`"* que ese array ya aplicaba
(`:1078-1082`). No es adopción ni cambio de lógica —el bucle está intacto y trata a todos los
opcionales igual, como ya hacía con `lane` y `barrier`—, y es inerte en la práctica porque
`set-classification` borra la clave en vez de escribir `null`. Se documentó en el propio
comentario en vez de inventar un segundo array que habría divergido del precedente.

---

## 7. Verificación

**Validador, repo real, antes y después — idénticos byte a byte:**

```
EXIT 0
Roadmap v3 prototype: 7 objectives / 28 phases / 63 runs;
  queue groups needs_human_decision=0 now=0 ready_next=20 later=26 history=17
Component statuses: 16
Roadmap rebase warnings (non-blocking):  ← el único, la arista externa
```

`diff` de la salida previa contra la posterior: **sin diferencias**. **Ningún aviso nuevo.**

**Cifras del ticket, todas verificadas:** 2 064 líneas del validador ✓ · 63 runs ✓ ·
**17 `completed`** ✓ (más 46 `planned`, que son justo los 46 a clasificar) · seis nombres ✗
(ver sección 1).

**Validador con campos presentes** — sobre un espejo completo del estado del proyecto en
scratchpad, nunca sobre el repo. El espejo reproduce la salida del repo real exactamente.
Clasificado: 10 runs completos (4 de ellos `completed`, con `closeout_result`), 1 parcial (dos
campos de seis), **52 runs sin ningún campo**, más `care_budget` en la raíz.

| Validador | Canónico limpio | Canónico clasificado |
|---|---|---|
| pre-reparación | EXIT 0 | **EXIT 1 · 63 errores `forbidden field`** |
| reparado | EXIT 0 | **EXIT 0, salida idéntica al control** |

Criterio 7 cubierto por partida doble: los 52 runs sin campos no se marcan en el espejo, y los
tests C1–C4 lo fijan campo por campo, incluido el run parcialmente clasificado.

**Roundtrip (criterio 8):** md5 antes y después de pasar por el motor, sobre copia fuera del
repo, con un run terminal que ya lleva `closeout_result`: **idénticos**. Antes de la
reparación diferían.

**Suite (criterio 12):** el repo **sí** tiene suite para estas piezas
(`tools/roadmap/tests/`, 7 archivos). Cobertura aditiva: un archivo nuevo, 18 tests, ninguno
tocando los existentes.

| | tests | pass | fail |
|---|---|---|---|
| antes | 155 | 151 | **4** |
| después | 173 | 169 | **4** |

**Los 4 fallos son previos y ajenos a este encargo**, idénticos archivo por archivo antes y
después (`clearProgress` 1, `createPhase` 2, `deletePhase` 1). Todos tienen la misma causa:
esos tests copian el canónico real y `checkInvariants` marca la dependencia huérfana
`RUN-CANTU-ROADMAP-CONTENT-AUDIT-001` — la misma arista externa del aviso no bloqueante. El
archivo nuevo es autocontenido (fixtures en memoria) justamente para no heredar esa condición.

**`eslint`: no aplica.** No hay configuración que cubra `tools/roadmap/` ni
`tools/project-console/`; las dos que existen (`tools/author-lite/editor-ui`,
`tools/prototypes/author-lite-workbench-v1`) cubren sólo sus propios paquetes. No se inventó
ninguna.

**No se corrió ninguna suite de `aiw-console`.**

---

## 8. Archivos escritos por este encargo, y ninguno más

| Archivo | Qué |
|---|---|
| `cantu-studio/tools/project-console/validate-project-console-state.mjs` | 2 entradas de allowlist + comentarios · 2 064 → 2 108 líneas |
| `cantu-studio/tools/roadmap/roadmap-core.mjs` | 2 entradas de allowlist + comentarios · 1 177 → 1 213 líneas |
| `cantu-studio/tools/roadmap/tests/classificationTolerance.test.mjs` | **nuevo** · 18 tests, 312 líneas |
| `aiw-console/context/aiw-console/records/TOLERANCIA-DE-CLASIFICACION-EN-CANTU.md` | este record |

**Ningún otro archivo fue escrito, en ningún repo.**

## 9. md5 declarados

**El canónico, antes y después — no se tocó:**

```
f171abc13962f4d94d5179ff1da0f202   cantu-studio/.aiw/roadmap/roadmap.json   (antes)
f171abc13962f4d94d5179ff1da0f202   cantu-studio/.aiw/roadmap/roadmap.json   (después)
```

**`.project/` de Cantu — no re-emitido, los seis archivos intactos:**

```
175c0efdfca41872adcb065b2c9ee198  docs_index.json     8b5d1786a651c09cf2167e3aaa8342f4  git_history.json
da552b3b6cd4d2e0251a0a172636d309  guardrails.json     b216f555ee31777d59f1b44003cfb9f9  no_claims.json
b631bc52177505ec09c2b55147ecde36  roadmap.json        39015a3aa266032052f7d3ad759b689d  snapshot.json
```

**`aiw-console` — sólo lectura, salvo este record:**

```
f01ad678b980eb01d588b695c06a928d  tools/roadmap/roadmap-core.mjs
00b4990f5c8971e4bfb89719ba5e2a3c  tools/classification/classification.mjs
3d81e4d2dba58bb1378dd4ef555ddd88  tools/roadmap/roadmap-plan.mjs
```

Sus mtimes siguen en `Jul 31 21:07` / `21:08`, sin cambio entre la primera medición y la
última. Su motor y su validador no se tocaron.

**Archivos escritos en Cantu (valor final, sin baseline porque el baseline es el diff):**

```
ceabc5633174fe25c60dc0d4cf545c40  tools/project-console/validate-project-console-state.mjs
8e603f1f3309b055b0e7fe60c285f7eb  tools/roadmap/roadmap-core.mjs
d209a6b1a3c71b6dc6a517c0cc15eaad  tools/roadmap/tests/classificationTolerance.test.mjs
```

## 10. Lo que este encargo no hizo

No se clasificó ningún run · no se tocó el canónico · no se re-emitió `.project/` · no se
cambió ningún status · no se insertó, movió ni renumeró ningún run · no se adoptaron los
campos · no se tocó el motor ni el validador de `aiw-console` · no se ejecutó git en ninguna
forma · no se levantó ningún servidor · no se corrió ninguna suite de `aiw-console`.

**Superficies disjuntas:** el otro encargo en paralelo es read-only sobre el canónico y no
toca `tools/`. Este no tocó el canónico y sólo escribió en `tools/` de Cantu. Sin
intersección.

**Queda abierto y declarado:** clasificar los 46 runs `planned` es del operador, y la sección
4 dice con qué y a qué coste. Los 17 `completed` se quedan sin clasificar y siguen válidos.
