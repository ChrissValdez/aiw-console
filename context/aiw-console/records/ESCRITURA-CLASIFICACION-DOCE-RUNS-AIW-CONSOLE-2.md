# Escritura de la clasificación de los doce runs vivos — aiw-console (2.º intento, EJECUTADO)

**Proyecto:** aiw-console
**Fecha:** 2026-08-02 (hora local `-0600`; los instantes que estampó el motor son UTC y se
citan literales)
**Naturaleza:** encargo de escritura sobre el canónico. **Se ejecutó completo.**
**Archivos escritos en el repo:** `roadmap/roadmap.json` y este record. Ningún otro.
**Bytes escritos en `roadmap/roadmap.json`: 134 975** (entró con 131 566).

Este record **no corrige** a [`ESCRITURA-CLASIFICACION-DOCE-RUNS-AIW-CONSOLE.md`](ESCRITURA-CLASIFICACION-DOCE-RUNS-AIW-CONSOLE.md),
que no se tocó: aquella es una medición fechada del 2026-08-01 y su parada fue correcta.
Este es el encargo siguiente, con la adjudicación de la cabina ya resuelta.

---

## Resultado en una línea

**12 de 12 runs vivos clasificados. 0 rechazos del motor. 64 diferencias contra el
respaldo, las 64 de campos de clasificación. 0 diferencias en los diez campos intocables.
`severity` derivada: 6 CRITICAL · 3 MAJOR · 3 MODERATE · 0 MINOR — coincide con el
criterio 15.**

---

## La corrección que motiva el encargo, y qué cambió respecto al intento anterior

La cabina adjudicó la **Opción 1** del informe anterior: los cinco valores del `#53` no
cambian y la línea «1 MINOR (`#53`)» del criterio 15 era la equivocada. Este encargo
**verificó esa aritmética de nuevo sobre el canónico ya escrito**, no la dio por buena
desde el ticket: `COSMETIC` × `LOCAL` = MINOR, `SILENT` = +1 paso, **MINOR + 1 = MODERATE**
(§C.15). El reparto esperado de este ticket —**6 CRITICAL · 3 MAJOR · 3 MODERATE ·
0 MINOR**— es el que el motor deriva, así que **la parada del criterio 15 no se disparó**.

**Ningún valor del criterio 8 se cambió respecto al ticket anterior.** Los cinco del `#53`
se escribieron tal cual: `SPECIFIED` · `COSMETIC` · `LOCAL` · `SILENT` · sin
`external_effects`. Medido en disco:
[`roadmap/roadmap.json:855-859`](projects/aiw-console/roadmap/roadmap.json:855).

---

## Bloque A — Antes de escribir

### A.1 — Respaldo del canónico, fuera del repo, **nuevo**

**Ruta del respaldo:**

```
C:\Users\chris\AppData\Local\Temp\claude\C--Users-chris-Documents-AIW-Workspace\366c6bb3-53e1-44a9-a540-aaff255abcc4\scratchpad\roadmap.json.PRE-CLASIFICACION-2.bak
```

Está **fuera del repositorio** `projects/aiw-console` y fuera del workspace: cuelga del
directorio temporal de **esta** sesión, no de la anterior. El respaldo del encargo previo
**no se reutilizó**.

| Magnitud del original `roadmap/roadmap.json`, antes de escribir | Cifra medida |
|---|---|
| Tamaño | **131 566 bytes** |
| `md5` | **`e0456386136161c22090923b4b24d92c`** |
| Líneas | **849 líneas** |

Comando que produjo respaldo y cifras, desde `projects/aiw-console/`:

```bash
cp roadmap/roadmap.json "$BK" && md5sum roadmap/roadmap.json "$BK" && stat -c '%s' roadmap/roadmap.json "$BK" && cmp roadmap/roadmap.json "$BK"
```

El respaldo verificó **`md5` idéntico**, **131 566 bytes** y `cmp` **sin diferencias**.

**El árbol no se movió desde el encargo anterior.** El `md5`
`e0456386136161c22090923b4b24d92c` y los 131 566 bytes son **los mismos** que aquel
declaró, así que el commit ajeno que se observó entonces (`57e372b`, un record) sigue sin
tocar el canónico. Verificado también ahora con `git log -3` de solo lectura: la punta es
`57e372b (2026-08-01 21:24:09 -0600)`, la misma; **no hubo commits nuevos** durante este
encargo.

**Comprobación al cierre:** el respaldo conserva su `md5`
`e0456386136161c22090923b4b24d92c`. **No se usó**: no hubo escritura que revertir.

### A.2 — `run_id` derivado del canónico por `queue_order`, ninguno tecleado

Ningún `run_id` se tecleó desde el ticket ni desde el record anterior. El script de guarda
(`guard.mjs`, en el scratchpad, fuera del repo) carga el canónico con el propio motor
(`core.loadRaw` + `core.parseRoadmap`), aplana con `core.globalOrdered` y construye el mapa
`queue_order → run`. Lo único tecleado desde el ticket son los **títulos** —que son la
guarda— y los **valores**, que son el encargo (`valores.mjs`, también fuera del repo, y
**sin un solo `run_id` dentro**).

La derivación se repitió **en cada una de las doce vueltas de escritura**, releyendo el
canónico en su estado del momento, no una sola vez al principio.

### A.3 — Guarda de título: **12 de 12 EXACTOS, 0 desajustes**

Comparación por igualdad estricta de cadena (`===`) contra el `title` del canónico.

| `#` | `run_id` derivado del canónico | `status` | Título |
|---:|---|---|---|
| 44 | `RUN-CONSOLE-CLASSIFICATION-PILOT-001` | `active` | ✅ exacto |
| 45 | `RUN-CONSOLE-DEPENDS-ON-HUMAN-APPROVED-001` | `planned` | ✅ exacto |
| 46 | `RUN-CONSOLE-PROGRESS-NORMATIVE-001` | `planned` | ✅ exacto |
| 47 | `RUN-CONSOLE-BATCHES-001` | `planned` | ✅ exacto |
| 48 | `RUN-CONSOLE-DIGEST-CABINA-001` | `planned` | ✅ exacto |
| 49 | `RUN-CONSOLE-PARIDAD-RENDER-CANTU-001` | `planned` | ✅ exacto |
| 50 | `RUN-CONSOLE-UI-UX-001` | `planned` | ✅ exacto |
| 51 | `RUN-CONSOLE-CANTU-CANONICAL-OUT-OF-AIW-001` | `planned` | ✅ exacto |
| 52 | `RUN-CONSOLE-CORTE-RETIRO-LOCAL-001` | `planned` | ✅ exacto |
| 53 | `RUN-CONSOLE-STALE-TEXTS-REPAIR-001` | `planned` | ✅ exacto |
| 54 | `RUN-CANTU-ROADMAP-PHASE-OBJECTIVE-OPS-001` | `planned` | ✅ exacto |
| 55 | `RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001` | `planned` | ✅ exacto |

**Desajustes: 0 de 12. La guarda que aborta no se disparó.** Los doce `run_id` derivados
son **12 distintos**. Coinciden con los que derivó el encargo anterior, que es una
consecuencia medida de que el canónico no se movió, no una copia.

Cobertura, medida en la misma pasada: **runs vivos del canónico que el ticket no cubre: 0.
Filas del ticket que no son un run vivo: 0.** El lote es exactamente el conjunto vivo.

### A.4 — Ningún run traía clasificación escrita: **0 de 55**

Medido recorriendo los 55 runs y comprobando `in` para cada uno de los seis campos de
`CLASSIFICATION_STORED_FIELDS`
([`tools/classification/classification.mjs:55`](projects/aiw-console/tools/classification/classification.mjs:55)),
no por `grep`.

**Runs con algún campo de clasificación presente antes de escribir: 0 de 55.** Ni los 12
vivos ni ninguno de los 43 `completed`. **La parada del criterio 4 no se disparó.**

Unión de claves de los 12 vivos antes de escribir: **7 claves** — `run_id`, `queue_order`,
`title`, `summary`, `full_description`, `status`, `depends_on`.

### A.5 — Forma del canónico, verificada, **no dada por buena**

| Magnitud | Cifra medida (antes de escribir) | ¿Coincide con el criterio 5? |
|---|---|---|
| Runs en el canónico | **55 runs** | ✅ |
| `completed` | **43 runs** | — |
| `planned` | **11 runs** | ✅ |
| `active` | **1 run** | ✅ |
| Runs vivos (no `completed` / `blocked`) | **12 runs** = 11 `planned` + 1 `active` | ✅ |
| `queue_order` de los vivos | **44 … 55**, contiguos | — |
| `queue_order` denso y único | **sí**: 55 valores, 55 distintos, mín. 1, máx. 55 | ✅ |
| `checkInvariants` sobre el canónico intacto | **0 errores** | — |

**No difieren. La parada del criterio 5 no se disparó.**

---

## Bloque B — La escritura

### B.6 — Todo por `set-classification`. Ni un byte a mano

Cada uno de los doce pasó por
`planEdit({ op: "set-classification" })` + `applyPlan`, de
[`tools/roadmap/roadmap-plan.mjs:233`](projects/aiw-console/tools/roadmap/roadmap-plan.mjs:233)
y [`:322`](projects/aiw-console/tools/roadmap/roadmap-plan.mjs:322), que despachan a
[`core.setClassification`](projects/aiw-console/tools/roadmap/roadmap-core.mjs:1222),
serializan con `core.serialize` y escriben con
[`core.applyWrite`](projects/aiw-console/tools/roadmap/roadmap-core.mjs:1921).
`set-classification` está en `KNOWN_OPS`
([`roadmap-plan.mjs:29`](projects/aiw-console/tools/roadmap/roadmap-plan.mjs:29)).

**Ningún byte del canónico se produjo fuera del motor:** ni búsqueda-y-reemplazo, ni
edición del JSON, ni serializador propio, ni `batch`. Los cuatro archivos propios
(`valores.mjs`, `guard.mjs`, `preflight.mjs`, `escribir.mjs`, `verificar.mjs` — cinco) son
de *conducción*, viven en el scratchpad **fuera del repo** y ninguno emite JSON.

**La ruta HTTP de la consola se descartó por el propio ticket**, igual que en el intento
anterior: su endpoint de escritura re-emite `.project/` tras aplicar, y «Re-emitir
`.project/`» está fuera de alcance. Ir por el motor directamente escribe el canónico y
nada más — comprobado en §D.

**El validador inyectado en `applyPlan`.** `applyWrite` acepta un `validate` opcional y hace
rollback desde su propio respaldo en `os.tmpdir()` si devuelve código distinto de 0. Se le
inyectó una **re-lectura del archivo ya escrito** con `core.loadRaw` + `core.parseRoadmap` +
`core.checkInvariants` — es decir, **las invariantes del propio motor sobre el disco real**.
No es el validador de la consola
(`tools/project-console/validate-project-console-state.mjs`, que lee el fork D-035): ese
está fuera de alcance y **no se abrió**. Las doce escrituras pasaron el validador:
**0 rollbacks**.

### B.7 — `classified_at` lo estampó el motor

No se tecleó y no se pasó como argumento. El relevo se niega explícitamente a transportarlo
([`roadmap-plan.mjs:111-112`](projects/aiw-console/tools/roadmap/roadmap-plan.mjs:111)) y el
motor lo estampa por su cuenta
([`roadmap-core.mjs:1301`](projects/aiw-console/tools/roadmap/roadmap-core.mjs:1301)).

**Verificado EN DISCO** (lo que el encargo anterior no pudo): los doce vivos traen
`classified_at`, **12 de 12 con forma ISO-8601 UTC** `YYYY-MM-DDTHH:MM:SS.mmmZ`, en el
rango **`2026-08-02T07:27:15.828Z` → `2026-08-02T07:27:15.908Z`** (80 ms para las doce).

### B.8 / B.9 — Pre-vuelo: **12 `ok`, 0 rechazos**, medido de nuevo

Doce `planEdit` independientes contra el canónico **intacto**, antes de escribir nada.
`planEdit` corre `checkInvariants` **antes** y **después** de la mutación en memoria, más
`checkIdentityPreserved`, y serializa sin escribir. **Esta cifra se volvió a medir; no se
tomó del ticket ni del record anterior.**

| `#` | `stage` | `ok` | errores | avisos | bytes de la previa | `external_effects` en el `after` |
|---:|---|---|---:|---:|---:|---|
| 44 | `ok` | ✅ | 0 | 0 | 131 960 | `["obliges_project:aiw","obliges_project:cantu-studio"]` |
| 45 | `ok` | ✅ | 0 | 0 | 131 805 | **AUSENTE** |
| 46 | `ok` | ✅ | 0 | 0 | 131 960 | `["obliges_project:aiw","obliges_project:cantu-studio"]` |
| 47 | `ok` | ✅ | 0 | 0 | 131 805 | **AUSENTE** |
| 48 | `ok` | ✅ | 0 | 0 | 131 805 | **AUSENTE** |
| 49 | `ok` | ✅ | 0 | 0 | 131 810 | **AUSENTE** |
| 50 | `ok` | ✅ | 0 | 0 | 131 810 | **AUSENTE** |
| 51 | `ok` | ✅ | 0 | 0 | 131 916 | `["writes_repo:cantu-studio"]` |
| 52 | `ok` | ✅ | 0 | 0 | 131 916 | `["writes_repo:cantu-studio"]` |
| 53 | `ok` | ✅ | 0 | 0 | 131 800 | **AUSENTE** |
| 54 | `ok` | ✅ | 0 | 0 | 131 803 | **AUSENTE** |
| 55 | `ok` | ✅ | 0 | 0 | 131 811 | **AUSENTE** |

(Cada cifra de bytes es la del canónico **con esa sola clasificación aplicada** sobre el
original de 131 566, no la del acumulado.)

**Criterio 9 — el motor no rechazó ninguna combinación por ilegal: 0 de 12.** El canónico
salió del pre-vuelo con su `md5` intacto (`e0456386136161c22090923b4b24d92c`), verificado
antes de la primera escritura.

**`external_effects` vacío queda ausente, y se pidió explícitamente.** En las nueve filas
sin efectos externos se pasó `externalEffects: null`, que el motor traduce a **borrado de la
clave**, no a `[]`
([`roadmap-core.mjs:1256-1270`](projects/aiw-console/tools/roadmap/roadmap-core.mjs:1256)).
El `after` de las nueve previas **no trae la clave**, y el disco tampoco (§C.14).

### B.9-bis — Las doce escrituras, ejecutadas

Cada vuelta releyó el canónico, volvió a derivar el `run_id` por `queue_order`, volvió a
comprobar el título, planificó y aplicó. **Un `applyPlan` por run: 12 escrituras atómicas**
(temporal + `fsync` + `rename`), cada una con respaldo del motor en `os.tmpdir()` y el
validador de re-lectura como autoridad.

| `#` | `run_id` | bytes del canónico tras esa escritura | `classified_at` estampado |
|---:|---|---:|---|
| 44 | `RUN-CONSOLE-CLASSIFICATION-PILOT-001` | 131 960 | `2026-08-02T07:27:15.828Z` |
| 45 | `RUN-CONSOLE-DEPENDS-ON-HUMAN-APPROVED-001` | 132 199 | `…15.838Z` |
| 46 | `RUN-CONSOLE-PROGRESS-NORMATIVE-001` | 132 593 | `…15.845Z` |
| 47 | `RUN-CONSOLE-BATCHES-001` | 132 832 | `…15.853Z` |
| 48 | `RUN-CONSOLE-DIGEST-CABINA-001` | 133 071 | `…15.861Z` |
| 49 | `RUN-CONSOLE-PARIDAD-RENDER-CANTU-001` | 133 315 | `…15.868Z` |
| 50 | `RUN-CONSOLE-UI-UX-001` | 133 559 | `…15.875Z` |
| 51 | `RUN-CONSOLE-CANTU-CANONICAL-OUT-OF-AIW-001` | 133 909 | `…15.882Z` |
| 52 | `RUN-CONSOLE-CORTE-RETIRO-LOCAL-001` | 134 259 | `…15.890Z` |
| 53 | `RUN-CONSOLE-STALE-TEXTS-REPAIR-001` | 134 493 | `…15.896Z` |
| 54 | `RUN-CANTU-ROADMAP-PHASE-OBJECTIVE-OPS-001` | 134 730 | `…15.902Z` |
| 55 | `RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001` | 134 975 | `2026-08-02T07:27:15.908Z` |

**12 escritos, 0 fallos, 0 rollbacks.**

Estado final del canónico:

| Magnitud | Antes | Después | Delta |
|---|---:|---:|---:|
| Bytes | 131 566 | **134 975** | **+3 409 bytes** |
| Líneas | 849 | **923** | **+74 líneas** |
| `md5` | `e0456386136161c22090923b4b24d92c` | **`cb1b9ab154e12871459c7bf912e4ec9a`** | — |

(La inferencia de «~133 800 bytes» del record anterior quedó **corta en ~1 175 bytes**. La
cifra real, medida, es 134 975. Aquella estaba rotulada como inferencia y lo era.)

---

## Bloque C — Verificación posterior

Todas las cifras de este bloque salen de `verificar.mjs`, que carga el canónico escrito y
el respaldo con el propio motor, los indexa por `run_id` y compara **clave a clave** con
`JSON.stringify`, tratando `undefined` y `null` como iguales.

### C.10 — Diferencias contra el respaldo: **64, todas de clasificación**

| Magnitud | Cifra medida |
|---|---:|
| `run_id` en el respaldo | **55** |
| `run_id` en el canónico escrito | **55** |
| `run_id` solo en uno de los dos | **0** |
| **Diferencias totales** (pares campo × run) | **64** |
| — de campos de clasificación o `classified_at` | **64** |
| — **de cualquier otro campo** | **0** |

Reparto de las 64 por campo:

| Campo | Diferencias |
|---|---:|
| `correctness_model` | 12 |
| `work_type` | 12 |
| `blast_radius` | 12 |
| `failure_surfaces` | 12 |
| `classified_at` | 12 |
| `external_effects` | **4** |
| **Total** | **64** |

**Las 64 son campos de clasificación o `classified_at`. Ninguna es otra cosa.** Las 64 = 12
runs × 5 campos siempre escritos, + 4 runs con `external_effects`.

### C.11 — Runs tocados: **12, y ningún otro**

| Magnitud | Cifra medida |
|---|---:|
| Runs con **alguna** diferencia | **12** |
| Runs con **ninguna** diferencia | **43** |
| Total | **55** |

`queue_order` de los 12 tocados: **44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55** — los
doce vivos, exactamente. **Los 43 `completed` no se tocaron.**

### C.12 — Los diez campos intocables: **0 diferencias en cada uno**

| Campo | Diferencias |
|---|---:|
| `run_id` | **0** |
| `title` | **0** |
| `summary` | **0** |
| `full_description` | **0** |
| `status` | **0** |
| `queue_order` | **0** |
| `depends_on` | **0** |
| `objective_id` | **0** |
| `phase_id` | **0** |
| `closeout_result` | **0** |

Medidos sobre los 55 runs, no solo sobre los doce. `objective_id` y `phase_id` se comparan
por la **posición del run en el árbol**, no por una clave del run: ningún run cambió de fase
ni de objetivo.

Además, la estructura del documento fuera de los runs (raíz, objetivos, fases, y el orden de
los `run_id` dentro de cada fase) es **idéntica** byte a byte tras serializar ambas con los
runs reducidos a su `run_id`. **El `#44` sigue `active`**, que era el punto explícito del
*out of scope*.

### C.13 — Totales del criterio 5, re-verificados sobre el canónico **escrito**

| Magnitud | Cifra medida | ¿Igual que antes de escribir? |
|---|---|---|
| Runs | **55** | ✅ |
| `completed` / `active` / `planned` | **43 / 1 / 11** | ✅ |
| Vivos | **12** = 11 `planned` + 1 `active` | ✅ |
| `queue_order` denso y único 1..55 | **sí** (55 valores, 55 distintos, mín. 1, máx. 55) | ✅ |
| `checkInvariants` sobre el escrito | **0 errores** | ✅ |

### C.14 — Runs con cada campo escrito, con su unidad

| Campo | Runs con el campo (de 55) | De ellos, vivos (de 12) |
|---|---:|---:|
| `correctness_model` | **12 runs** | 12 |
| `work_type` | **12 runs** | 12 |
| `blast_radius` | **12 runs** | 12 |
| `failure_surfaces` | **12 runs** | 12 |
| `external_effects` | **4 runs** | 4 |
| `classified_at` | **12 runs** | 12 |

- Runs `completed` con algún campo de clasificación: **0 de 43**.
- `isClassified()` verdadero en: **12 runs de 55**
  ([`classification.mjs:230`](projects/aiw-console/tools/classification/classification.mjs:230)).
- Vivos con los cuatro campos de vocabulario cerrado completos: **12 de 12**.
- Los **8 runs sin `external_effects`** no traen la clave (`AUSENTE`), no traen `[]`.
  Comprobado con `in` sobre el objeto, no por `grep`. Son los `#45`, `#47`, `#48`, `#49`,
  `#50`, `#53`, `#54`, `#55`.

### C.15 — `severity` derivada de los doce: **6 CRITICAL · 3 MAJOR · 3 MODERATE · 0 MINOR**

Calculada con `deriveClassification`
([`classification.mjs:223`](projects/aiw-console/tools/classification/classification.mjs:223))
**leyendo el run del canónico ya escrito**, no un objeto de prueba. **No se almacena y no se
escribió** (§C.16-bis).

| `#` | `work_type` × `blast_radius` (base) | `failure_surfaces` | **`severity` derivada** | **`closure_mode` derivado** |
|---:|---|---|---|---|
| 44 | `FOUNDATIONAL`×`PROJECT_SHAPE` = CRITICAL | `SILENT` +1 (satura) | **CRITICAL** | **ATTENDED** |
| 45 | `FUNCTIONAL`×`SYSTEMIC` = MAJOR | `SILENT` +1 | **CRITICAL** | **SEMI_ATTENDED** |
| 46 | `FOUNDATIONAL`×`PROJECT_SHAPE` = CRITICAL | `SILENT` +1 (satura) | **CRITICAL** | **ATTENDED** |
| 47 | `FUNCTIONAL`×`SYSTEMIC` = MAJOR | `SILENT` +1 | **CRITICAL** | **SEMI_ATTENDED** |
| 48 | `FUNCTIONAL`×`ADJACENT` = MODERATE | `SILENT` +1 | **MAJOR** | **SEMI_ATTENDED** |
| 49 | `FUNCTIONAL`×`ADJACENT` = MODERATE | `SILENT` +1 | **MAJOR** | **SEMI_ATTENDED** |
| 50 | `FUNCTIONAL`×`ADJACENT` = MODERATE | `SILENT` +1 | **MAJOR** | **SEMI_ATTENDED** |
| 51 | `FOUNDATIONAL`×`PROJECT_SHAPE` = CRITICAL | `SILENT` +1 (satura) | **CRITICAL** | **ATTENDED** |
| 52 | `FOUNDATIONAL`×`PROJECT_SHAPE` = CRITICAL | `SILENT` +1 (satura) | **CRITICAL** | **SEMI_ATTENDED** |
| **53** | `COSMETIC`×`LOCAL` = **MINOR** | `SILENT` **+1** | **MODERATE** | **UNATTENDED** |
| 54 | `FUNCTIONAL`×`LOCAL` = MODERATE | `VISIBLE` 0 | **MODERATE** | **UNATTENDED** |
| 55 | `FUNCTIONAL`×`ADJACENT` = MODERATE | `VISIBLE` 0 | **MODERATE** | **ATTENDED** |

**Reparto real medido, reportado primero y en todos los casos:**

> **6 CRITICAL · 3 MAJOR · 3 MODERATE · 0 MINOR** (12 runs)

**Reparto que este ticket declara:** 6 CRITICAL · 3 MAJOR · 3 MODERATE · 0 MINOR.
**Coinciden en 12 de 12. La parada del criterio 15 NO se dispara.**

El `#53` deriva **MODERATE**, que es lo que la cabina adjudicó. La aritmética, verificada de
nuevo en esta pasada y no heredada:
[`classification.mjs:92`](projects/aiw-console/tools/classification/classification.mjs:92)
(`steps: { LOUD: -1, VISIBLE: 0, SILENT: 1 }`) y
[`:170`](projects/aiw-console/tools/classification/classification.mjs:170)
(`deriveSeverity`, que aplica el paso y satura entre MINOR y CRITICAL).

**Ningún run del piloto deriva MINOR.** El sistema de clasificación estrena con la escala
ocupada en sus tres tramos altos y el tramo bajo vacío. Es una consecuencia medida del
reparto, no un juicio.

### C.16 — `closure_mode` derivado de los doce, sin cifra esperada

El ticket no declara expectativa y este record no inventa una. **Reparto real medido:**

| `closure_mode` derivado | Runs |
|---|---:|
| `ATTENDED` | **4 runs** (`#44`, `#46`, `#51`, `#55`) |
| `SEMI_ATTENDED` | **6 runs** (`#45`, `#47`, `#48`, `#49`, `#50`, `#52`) |
| `UNATTENDED` | **2 runs** (`#53`, `#54`) |
| **Total** | **12 runs** |

Calculado con `deriveClosureMode`
([`classification.mjs:194`](projects/aiw-console/tools/classification/classification.mjs:194)).
Nota medida, no interpretativa: la guarda de `external_effects` **no cambió ningún
resultado**. Los cuatro runs con efectos externos (`#44`, `#46`, `#51`, `#52`) ya derivaban
`ATTENDED` o `SEMI_ATTENDED` por su `correctness_model`, y la guarda solo sube.

### C.16-bis — `severity` y `closure_mode` NO están en disco

**Runs del canónico que almacenan una clave `severity` o `closure_mode`: 0 de 55.** Se
reportan; son derivados y el motor no los escribe.

---

## Bloque D — Alcance: qué se tocó y qué no

`git status --porcelain` sobre el repo, al cierre (solo lectura):

```
 M .project/docs_index.json
 M .project/git_history.json
 M .project/guardrails.json
 M .project/no_claims.json
 M .project/roadmap.json
 M .project/snapshot.json
 M roadmap/roadmap.json
?? context/aiw-console/records/ESCRITURA-CLASIFICACION-DOCE-RUNS-AIW-CONSOLE.md
?? context/aiw-console/records/MEDICION-PILOTO-CLASIFICACION-AIW-CONSOLE.md
```

**Los seis `.project/*.json` NO los tocó este encargo, y hay prueba de disco.** Sus `mtime`
son del **2026-08-01 10:19:05–06 `-0600`**, unas **15 horas antes** de la escritura
(`2026-08-02 01:27:15 -0600`, que es el `mtime` del canónico). Su marca ` M` es suciedad
preexistente del árbol, de una re-emisión anterior del operador. Medido con:

```bash
stat -c '%y  %n' .project/*.json roadmap/roadmap.json
```

**`.project/` no se re-emitió** — fuera de alcance por ticket. Sigue desfasado, y ahora
además con un desfase mayor: el canónico lleva doce clasificaciones que `.project/` no
refleja. **Lo re-emite el operador desde la consola.**

Otras comprobaciones de alcance:

- **Sin ficheros temporales huérfanos.** `roadmap/` contiene solo `roadmap.json`; no quedó
  ningún `.roadmap.json.tmp-<pid>` en el árbol.
- **Ningún comando de git que escriba.** En este encargo se ejecutaron `git status
  --porcelain` y `git log -3`, los dos de lectura. **No hay commit.** El canónico escrito
  está en el árbol de trabajo, sin versionar.
- **`aiw` y `cantu-studio` no se leyeron ni se escribieron.** Los `external_effects` que los
  nombran (`obliges_project:aiw`, `obliges_project:cantu-studio`,
  `writes_repo:cantu-studio`) se trataron como **cadenas opacas**, que es todo lo que el
  motor exige de ellas
  ([`roadmap-core.mjs:479-485`](projects/aiw-console/tools/roadmap/roadmap-core.mjs:479)).
- **El fork descartado (D-035) no se abrió.**
- **El record anterior no se tocó.**

Diff contra `HEAD` del canónico, para referencia del operador:

```bash
git diff --stat roadmap/roadmap.json
```

> `1 file changed, 87 insertions(+), 13 deletions(-)`

Esa cifra es **contra `HEAD`**, no contra el respaldo: el canónico ya venía modificado
respecto a `HEAD` antes de este encargo (por el `status` del `#44`). La comparación
autoritativa de este encargo es la de §C.10, **contra el respaldo**, campo a campo.

---

## Qué NO se pudo verificar, y por qué (criterio 19)

1. **La suite de tests no se corrió.** Fuera de alcance. Los dos rojos preexistentes no se
   tocaron ni se comprobaron. Este record **no cita ninguna línea de test** como evidencia:
   toda su evidencia de derivación viene de ejecutar `deriveClassification` sobre el
   canónico real.
2. **El validador de la consola** (`tools/project-console/validate-project-console-state.mjs`,
   que lee el fork D-035) **no se abrió, no se corrió y no se reparó** — fuera de alcance.
   La autoridad de la escritura fue `checkInvariants` del motor, inyectada como `validate`
   en `applyPlan` (§B.6). **Qué diría ese validador sobre el canónico escrito: no medido.**
3. **La consola en vivo no se abrió.** Cómo renderiza los doce runs clasificados —badges de
   `severity`, lista `unclassified_live_runs` ahora vacía— **no se comprobó**. Es
   observación de interfaz y este encargo no la hizo.
4. **El `care_budget` del proyecto** (§5 de la especificación) **no se leyó ni se declaró**.
   Si el canónico no lo declara, qué hace la consola con doce runs CRITICAL/MAJOR frente a un
   presupuesto ausente **no está medido aquí**.
5. **La correspondencia entre los valores adjudicados y los runs que describen.** Este
   encargo **no juzgó ninguna adjudicación**: transcribió los doce del criterio 8. Que
   `JUDGED_DEFINES` sea el modelo correcto para el `#44` es una decisión de la cabina, no
   una medición de este record.
6. **Estabilidad frente a escrituras concurrentes.** Se comprobó que no hubo commits nuevos
   durante el encargo y que el `md5` de partida era el esperado, pero **no hubo bloqueo**: si
   otro hilo hubiera escrito el canónico entre dos de las doce vueltas, la relectura por
   vuelta lo habría visto pero no lo habría impedido. No ocurrió.
7. **`.project/` desfasado.** Cuánto difiere ahora `.project/roadmap.json` del canónico
   **no se midió**: re-emitir está fuera de alcance y compararlos habría sido leer un
   artefacto que este encargo no gobierna.

---

## Lo que este record NO hace

- **No decide ningún valor.** Los doce vienen del criterio 8 y se transcribieron; los cinco
  del `#53` se escribieron sin cambiar ninguno.
- **No corrige el record anterior.** Aquel es una medición fechada del 2026-08-01 con una
  parada correcta, y se corrige hacia adelante: esto es lo que pasó después.
- **No escribe `severity` ni `closure_mode`.** Se reportan; son derivados, y **0 de 55 runs
  los almacenan**.
- **No escribe `classified_at`.** Lo estampó el motor; el relevo se niega a transportarlo.
- **No cambia el `status` de ningún run.** El `#44` sigue `active`, con 0 diferencias en
  `status` sobre los 55.
- **No inserta, mueve ni renumera runs**, y no edita `title`, `summary`,
  `full_description`, `depends_on`, `objective_id`, `phase_id` ni `closeout_result`:
  **0 diferencias en cada uno de los diez**.
- **No clasifica ningún run `completed`.** 0 de los 43.
- **No re-emite `.project/`**, no repara el validador de la consola, no corre los tests y no
  toca los dos rojos.
- **No ejecuta ningún comando de git que escriba.** No hay commit: la escritura está en el
  árbol de trabajo y el commit es del operador.
- **No lee ni escribe en `aiw` ni en `cantu-studio`.**

---

## Cumplimiento del alcance

- **Escrito en el repo:** `roadmap/roadmap.json` (**+3 409 bytes**, de 131 566 a 134 975) y
  este record. **Nada más.**
- **Escrito fuera del repo:** el respaldo declarado en §A.1 y cinco archivos de conducción
  en el scratchpad de la sesión (`valores.mjs`, `guard.mjs`, `preflight.mjs`,
  `escribir.mjs`, `verificar.mjs`), ninguno de los cuales emite JSON del canónico. También
  los respaldos que el propio motor deja en `os.tmpdir()` en cada `applyWrite`.
- **No escrito:** `.project/`, código, tests, validador, `DECISIONES.md`, el record
  anterior, y cualquier archivo de `aiw` o `cantu-studio`.

**Criterio de borrado:** este record se borra cuando la clasificación de estos doce runs
deje de ser la vigente en el canónico —porque un encargo posterior la reemplace, o porque
los doce se cierren— dejando en su lugar el record de esa medición. No se borra por
antigüedad: mientras los doce lleven estos `classified_at`, este es el documento que dice de
dónde salieron.
