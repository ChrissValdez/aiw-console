# Escritura de la clasificación de los doce runs vivos — aiw-console

**Proyecto:** aiw-console
**Fecha:** 2026-08-01 (hora local; los instantes UTC que produjo el motor en el pre-vuelo
se citan literales más abajo)
**Naturaleza:** encargo de escritura sobre el canónico. **Se detuvo antes de escribir.**
**Archivos escritos en el repo:** este record, y ninguno más.
**Bytes escritos en `roadmap/roadmap.json`: 0.**

---

## ⛔ PARADA — criterio 15, y se disparó ANTES de tocar el disco

El criterio 15 ordena parar si la `severity` que el motor DERIVA para alguno de los doce
difiere de la tabla del ticket. **Difiere en uno: el `#53`.**

| | Ticket declara (criterio 15) | Motor deriva |
|---|---|---|
| `#53` — `Repair the five texts that describe this repo falsely` | **MINOR** | **MODERATE** |

Los otros once coinciden exactamente. La parada se detectó en **pre-vuelo**, con
`planEdit` —que no escribe— y **no en verificación posterior**, así que el canónico
**nunca se modificó** y no hubo nada que restaurar desde el respaldo.

**Por qué esto es una decisión que este encargo no puede tomar.** El criterio 8 da cinco
valores para el `#53` (`SPECIFIED` · `COSMETIC` · `LOCAL` · `SILENT`) y el criterio 15 da
una `severity` esperada (`MINOR`) que **no se sigue de esos cinco valores** bajo la
derivación publicada. Las dos mitades del ticket se contradicen entre sí, y resolverlas
exige elegir cuál de las dos es la adjudicación real de la cabina:

- si los cinco valores son los adjudicados, la línea `1 MINOR (#53)` del criterio 15 está
  mal y la `severity` real es MODERATE;
- si `MINOR` es lo adjudicado, entonces **uno de los cinco valores del `#53` no es el que
  la cabina quiso** y escribirlo pondría un dato equivocado en disco.

No elijo. El bloque «Informe de opciones» de abajo mide el coste de cada salida y da una
recomendación explícita.

### La aritmética, con sus tres fuentes independientes

`COSMETIC` × `LOCAL` = **MINOR** en la tabla base; `SILENT` = **+1** paso sobre la escala
`MINOR → MODERATE → MAJOR → CRITICAL`; **MINOR + 1 = MODERATE**. La saturación no
interviene: solo actúa en los extremos, y MINOR+1 no sale de la escala.

| Fuente | `archivo:línea` | Qué dice |
|---|---|---|
| Especificación publicada | [`context/CLASIFICACION-DE-RUNS.md:56`](projects/aiw-console/context/CLASIFICACION-DE-RUNS.md:56) | fila `COSMETIC`: `LOCAL` → `MINOR` |
| Especificación publicada | [`context/CLASIFICACION-DE-RUNS.md:63-67`](projects/aiw-console/context/CLASIFICACION-DE-RUNS.md:63) | `LOUD −1` · `VISIBLE 0` · `SILENT +1`, saturando entre `MINOR` y `CRITICAL` |
| Código (la única implementación) | [`tools/classification/classification.mjs:86`](projects/aiw-console/tools/classification/classification.mjs:86) | misma fila `COSMETIC`, transcrita verbatim |
| Código | [`tools/classification/classification.mjs:92`](projects/aiw-console/tools/classification/classification.mjs:92) | `steps: { LOUD: -1, VISIBLE: 0, SILENT: 1 }` |
| Código | [`tools/classification/classification.mjs:182-188`](projects/aiw-console/tools/classification/classification.mjs:182) | `deriveSeverity` aplica el paso y satura |
| Tests | [`tests/classification-derivation.test.mjs:39-45`](projects/aiw-console/tests/classification-derivation.test.mjs:39) | la tabla y el ajuste, transcritos otra vez como lado-especificación del test |
| Tests | [`tests/classification-derivation.test.mjs:86-103`](projects/aiw-console/tests/classification-derivation.test.mjs:86) | barrido exhaustivo de las **36 combinaciones** (12 celdas × 3 superficies); `COSMETIC × LOCAL × SILENT` es una de ellas y el test exige `MODERATE` |

**Motor, especificación y tests concuerdan entre sí.** La cifra que queda sola es la línea
`1 MINOR (#53)` del criterio 15.

**[INFERENCIA, no medición]** El patrón de la tabla del ticket sugiere que la línea del
criterio 15 se calculó leyendo la celda base sin aplicar el `+1` de `SILENT`: los otros
once sí llevan el ajuste aplicado, y `SILENT` está adjudicado en 10 de los 12 runs. Es una
lectura, no un hecho, y **no la tomo como decisión**.

---

## Bloque A — Antes de escribir. Los cinco criterios, todos ejecutados

### A.1 — Respaldo del canónico, fuera del repo

**Ruta del respaldo:**

```
C:\Users\chris\AppData\Local\Temp\claude\C--Users-chris-Documents-AIW-Workspace\213e8466-a393-4bf1-824b-9f245e3e7c5c\scratchpad\roadmap.json.PRE-CLASIFICACION.bak
```

Está **fuera del repositorio** `projects/aiw-console` y fuera del workspace: cuelga del
directorio de trabajo temporal de la sesión.

| Magnitud del original `roadmap/roadmap.json` | Cifra medida |
|---|---|
| Tamaño | **131 566 bytes** |
| `md5` | **`e0456386136161c22090923b4b24d92c`** |
| Líneas | **849 líneas** |

Comandos que produjeron las cifras y el respaldo, desde `projects/aiw-console/`:

```bash
md5sum roadmap/roadmap.json && stat -c '%s' roadmap/roadmap.json && wc -l < roadmap/roadmap.json
```

```bash
cp roadmap/roadmap.json "$BK" && md5sum "$BK" && stat -c '%s' "$BK" && cmp roadmap/roadmap.json "$BK"
```

El respaldo verificó **`md5` idéntico**, **131 566 bytes** y `cmp` sin diferencias.

**El respaldo no se usó**, porque no hubo escritura que revertir. Sigue en su ruta.

**Comprobación final, tras cerrar el encargo:** el canónico conserva `md5`
`e0456386136161c22090923b4b24d92c` y **131 566 bytes**, idénticos a los del respaldo.

**Escritura ajena observada durante el encargo, y por qué no afecta.** Entre la primera y
la última lectura de `git status` apareció el commit `57e372b` (`2026-08-01 21:24:09
-0600`), de otro hilo. Toca **1 archivo y 597 líneas insertadas**, y es un record
(`MEDICION-PREVIA-A-LA-CLASIFICACION-DE-LOS-21-PLANNED-DE-AIW.md`): **no toca
`roadmap/roadmap.json`**, cuyo `md5` no cambió y que sigue apareciendo como modificado
respecto a `HEAD` por la misma línea de siempre (el `status` del `#44`). Medido con:

```bash
git show --stat --format='%h %s' 57e372b
```

### A.2 — `run_id` derivado del canónico por `queue_order`

Ningún `run_id` se tecleó desde el ticket ni desde memoria. El script de guarda
(`guard.mjs`, en el scratchpad, fuera del repo) carga el canónico con el propio motor
(`core.loadRaw` + `core.parseRoadmap`), recorre `objectives → phases → runs` y construye
el mapa `queue_order → run`. Lo único tecleado desde el ticket son los **títulos**, que son
la guarda, y los **valores**, que son el encargo.

### A.3 — Guarda de título: **12 de 12 EXACTOS, 0 desajustes**

| `#` | `run_id` derivado del canónico | `status` | `phase_id` | Título |
|---:|---|---|---|---|
| 44 | `RUN-CONSOLE-CLASSIFICATION-PILOT-001` | `active` | `O4.P18` | ✅ exacto |
| 45 | `RUN-CONSOLE-DEPENDS-ON-HUMAN-APPROVED-001` | `planned` | `O4.P19` | ✅ exacto |
| 46 | `RUN-CONSOLE-PROGRESS-NORMATIVE-001` | `planned` | `O4.P19` | ✅ exacto |
| 47 | `RUN-CONSOLE-BATCHES-001` | `planned` | `O4.P19` | ✅ exacto |
| 48 | `RUN-CONSOLE-DIGEST-CABINA-001` | `planned` | `O4.P18` | ✅ exacto |
| 49 | `RUN-CONSOLE-PARIDAD-RENDER-CANTU-001` | `planned` | `O4.P16` | ✅ exacto |
| 50 | `RUN-CONSOLE-UI-UX-001` | `planned` | `O4.P16` | ✅ exacto |
| 51 | `RUN-CONSOLE-CANTU-CANONICAL-OUT-OF-AIW-001` | `planned` | `O4.P16` | ✅ exacto |
| 52 | `RUN-CONSOLE-CORTE-RETIRO-LOCAL-001` | `planned` | `O4.P16` | ✅ exacto |
| 53 | `RUN-CONSOLE-STALE-TEXTS-REPAIR-001` | `planned` | `O4.P18` | ✅ exacto |
| 54 | `RUN-CANTU-ROADMAP-PHASE-OBJECTIVE-OPS-001` | `planned` | `O4.P17` | ✅ exacto |
| 55 | `RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001` | `planned` | `O4.P17` | ✅ exacto |

Comparación por igualdad estricta de cadena (`===`) contra el `title` del canónico.
**Desajustes: 0 de 12.** La guarda que aborta **no se dispara**: las coordenadas del ticket
**no** están caducadas.

Forma del conjunto medida en la misma pasada, con su unidad:

| Magnitud | Cifra medida |
|---|---|
| Runs en el canónico | **55 runs** |
| `completed` | **43 runs** |
| `planned` | **11 runs** |
| `active` | **1 run** |
| Runs vivos (no `completed` / `blocked`) | **12 runs** |
| `queue_order` de los vivos | **44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55** |
| `queue_order` denso y único | **sí**: 55 valores, 55 distintos, mín. 1, máx. 55 |
| `checkInvariants` sobre el canónico intacto | **0 errores** |
| Unión de claves de los 12 vivos | **7 claves**: `run_id`, `queue_order`, `title`, `summary`, `full_description`, `status`, `depends_on` |

### A.4 — Los seis nombres de campo y todos los tokens: **0 divergencias**

Contrastado contra el código, no contra el documento.

| Nombre del ticket | En `CLASSIFICATION_STORED_FIELDS` | En `RUN_OPTIONAL_FIELDS` del motor |
|---|---|---|
| `correctness_model` | ✅ [`tools/classification/classification.mjs:56`](projects/aiw-console/tools/classification/classification.mjs:56) | ✅ [`tools/roadmap/roadmap-core.mjs:93`](projects/aiw-console/tools/roadmap/roadmap-core.mjs:93) |
| `work_type` | ✅ `classification.mjs:57` | ✅ `roadmap-core.mjs:94` |
| `blast_radius` | ✅ `classification.mjs:58` | ✅ `roadmap-core.mjs:95` |
| `failure_surfaces` | ✅ `classification.mjs:59` | ✅ `roadmap-core.mjs:96` |
| `external_effects` | ✅ `classification.mjs:60` | ✅ `roadmap-core.mjs:97` |
| `classified_at` | ✅ `classification.mjs:61` | ✅ `roadmap-core.mjs:98` |

Tokens que el ticket usa, contra el vocabulario que el código acepta
([`tools/classification/classification.mjs:39-42`](projects/aiw-console/tools/classification/classification.mjs:39)):

| Campo | Tokens usados por el ticket | Vocabulario del código | Aceptados |
|---|---|---|---|
| `correctness_model` | `JUDGED_DEFINES`, `SPECIFIED`, `JUDGED_ACCEPTS` | `SPECIFIED`, `JUDGED_ACCEPTS`, `JUDGED_DEFINES` | **3 de 3** |
| `work_type` | `FOUNDATIONAL`, `FUNCTIONAL`, `COSMETIC` | `COSMETIC`, `FUNCTIONAL`, `FOUNDATIONAL` | **3 de 3** |
| `blast_radius` | `PROJECT_SHAPE`, `SYSTEMIC`, `ADJACENT`, `LOCAL` | `LOCAL`, `ADJACENT`, `SYSTEMIC`, `PROJECT_SHAPE` | **4 de 4** |
| `failure_surfaces` | `SILENT`, `VISIBLE` | `LOUD`, `VISIBLE`, `SILENT` | **2 de 2** |
| `external_effects` | `obliges_project:aiw`, `obliges_project:cantu-studio`, `writes_repo:cantu-studio` | **sin vocabulario cerrado**: array de cadenas no vacías ([`roadmap-core.mjs:479-485`](projects/aiw-console/tools/roadmap/roadmap-core.mjs:479)) | **3 de 3**, las tres son cadenas no vacías |

`set-classification` está registrada en `KNOWN_OPS`
([`tools/roadmap/roadmap-plan.mjs:29`](projects/aiw-console/tools/roadmap/roadmap-plan.mjs:29)).
**No se disparó ninguna parada del criterio 4.**

### A.5 — Ningún run vivo trae clasificación escrita: **0 de 55**

Medido recorriendo los 55 runs y comprobando `in` para los seis campos, no por `grep`:

**Runs con algún campo de clasificación presente: 0 de 55 runs.** No solo los vivos —
tampoco ninguno de los 43 `completed`. **No se disparó la parada del criterio 5.**

---

## Bloque B — La escritura. Pre-vuelo completo, escritura NO ejecutada

### B.6 — La ruta elegida, y por qué no es la consola

Todo iba a pasar por el motor: `planEdit({ op: "set-classification" })` +
`applyPlan`, de [`tools/roadmap/roadmap-plan.mjs`](projects/aiw-console/tools/roadmap/roadmap-plan.mjs),
que despacha a `core.setClassification`
([`tools/roadmap/roadmap-core.mjs:1222`](projects/aiw-console/tools/roadmap/roadmap-core.mjs:1222))
y serializa con `core.serialize`. **Ningún byte del canónico se habría producido fuera del
motor**: ni búsqueda-y-reemplazo, ni edición del JSON, ni serializador propio. Lo único
propio son tres archivos de *conducción* en el scratchpad —fuera del repo— que no tocan el
JSON: `guard.mjs`, `valores.mjs` y `preflight.mjs`.

**La ruta HTTP de la consola se descartó por el propio ticket**, no por comodidad: el
endpoint de escritura **re-emite `.project/` tras aplicar**
([`project-console/serve.mjs:539`, `:568`](projects/aiw-console/project-console/serve.mjs:539),
documentado en [`MEDICION-PILOTO-CLASIFICACION-AIW-CONSOLE.md` C.10](projects/aiw-console/context/aiw-console/records/MEDICION-PILOTO-CLASIFICACION-AIW-CONSOLE.md)),
y «Re-emitir `.project/`» está **fuera de alcance**. Ir por la consola habría violado el
*out of scope*; ir por el motor directamente escribe el canónico y nada más.

### B.7 — `classified_at`: lo escribe el motor, y se comprobó que lo escribe

No se tecleó y no se pasó como argumento. El relevo se niega explícitamente a
transportarlo ([`tools/roadmap/roadmap-plan.mjs:111-112`](projects/aiw-console/tools/roadmap/roadmap-plan.mjs:111))
y el motor lo estampa por su cuenta con `new Date().toISOString()`
([`tools/roadmap/roadmap-core.mjs:1301`](projects/aiw-console/tools/roadmap/roadmap-core.mjs:1301)).

**Comprobado en el pre-vuelo: las 12 previas traen `classified_at` en su `after`**, con
forma ISO-8601 UTC. Instantes observados: de `2026-08-02T03:22:35.477Z` (`#44`) a
`2026-08-02T03:22:35.500Z` (`#55`). Son los de la previa; **no llegaron a disco**.

### B.8 / B.9 — Las doce previas: **12 de 12 planificadas OK, 0 rechazos**

Cada una es un `planEdit` independiente contra el canónico **intacto**, con el `run_id`
derivado del canónico por `queue_order`. `planEdit` corre `checkInvariants` **antes**
(pre-vuelo) y **después** de la mutación en memoria, más `checkIdentityPreserved`, y
serializa sin escribir.

| `#` | `stage` | `ok` | errores | avisos | bytes que habría tenido el canónico |
|---:|---|---|---:|---:|---:|
| 44 | `ok` | ✅ | 0 | 0 | 131 960 |
| 45 | `ok` | ✅ | 0 | 0 | 131 805 |
| 46 | `ok` | ✅ | 0 | 0 | 131 960 |
| 47 | `ok` | ✅ | 0 | 0 | 131 805 |
| 48 | `ok` | ✅ | 0 | 0 | 131 805 |
| 49 | `ok` | ✅ | 0 | 0 | 131 810 |
| 50 | `ok` | ✅ | 0 | 0 | 131 810 |
| 51 | `ok` | ✅ | 0 | 0 | 131 916 |
| 52 | `ok` | ✅ | 0 | 0 | 131 916 |
| 53 | `ok` | ✅ | 0 | 0 | 131 800 |
| 54 | `ok` | ✅ | 0 | 0 | 131 803 |
| 55 | `ok` | ✅ | 0 | 0 | 131 811 |

(Cada cifra de bytes es la del canónico **con esa sola clasificación aplicada** sobre el
original de 131 566 bytes, no la del acumulado de las doce.)

**Criterio 9 — el motor no rechaza ninguna combinación por ilegal: 0 de 12.** Ninguna de
las doce cae en `SPECIFIED`+`FOUNDATIONAL`, `FOUNDATIONAL`+`LOUD` ni `JUDGED_*`+`UNATTENDED`.
Merece nota que el `#52` es `JUDGED_ACCEPTS` + `FOUNDATIONAL`, que **es legal**: la
combinación prohibida es `SPECIFIED` + `FOUNDATIONAL`
([`tools/roadmap/roadmap-core.mjs:498`](projects/aiw-console/tools/roadmap/roadmap-core.mjs:498)).

### El `external_effects` vacío queda ausente, y se comprobó

En las nueve previas sin efectos externos el `after` **no trae la clave** `external_effects`.
El motor almacena la lista vacía como **ausencia**
([`tools/roadmap/roadmap-core.mjs:1256-1270`](projects/aiw-console/tools/roadmap/roadmap-core.mjs:1256)),
que es exactamente lo que el criterio 8 pide.

### ⛔ La escritura NO se ejecutó

Detectada la divergencia del `#53`, **no se llamó a `applyPlan` ni una vez**. El canónico
conserva su `md5` `e0456386136161c22090923b4b24d92c` y sus 131 566 bytes, verificados
después del pre-vuelo con el mismo comando de A.1.

---

## Bloque C — Verificación posterior: **NO PROCEDE, y por qué**

Los criterios 10 a 14 verifican el resultado de una escritura. **No hubo escritura**, así
que no hay resultado que verificar y **ninguna de sus cifras se puede declarar**. Lo que sí
se puede declarar es lo contrario, medido:

| Criterio | Qué pedía | Estado |
|---|---|---|
| 10 | comparar canónico contra respaldo campo a campo | **0 diferencias** — el canónico es byte a byte el respaldo (`md5` idéntico) |
| 11 | 12 runs tocados, ningún otro | **0 runs tocados** |
| 12 | 0 diferencias en `run_id`, `title`, `summary`, `full_description`, `status`, `queue_order`, `depends_on`, `objective_id`, `phase_id`, `closeout_result` | **0 diferencias en los diez**, por identidad de bytes |
| 13 | 55 runs, `queue_order` denso 1..N, 12 vivos = 11 `planned` + 1 `active` | **verificado y verdadero**: 55 runs, denso y único 1..55, 12 vivos = 11 `planned` + 1 `active` |
| 14 | conteo de runs con cada uno de los seis campos escritos | **0 runs de 55 en cada uno de los seis campos** |

### Criterio 15 — los DOS derivados de los doce, reportados y no escritos

Calculados con `deriveClassification` de
[`tools/classification/classification.mjs:223`](projects/aiw-console/tools/classification/classification.mjs:223)
sobre el run con los valores del ticket aplicados. **No se almacenan y no se escribieron.**

| `#` | `work_type` × `blast_radius` (base) | `failure_surfaces` | **`severity` derivada** | Ticket | **`closure_mode` derivado** |
|---:|---|---|---|---|---|
| 44 | `FOUNDATIONAL`×`PROJECT_SHAPE` = CRITICAL | `SILENT` +1 (satura) | **CRITICAL** | CRITICAL ✅ | **ATTENDED** |
| 45 | `FUNCTIONAL`×`SYSTEMIC` = MAJOR | `SILENT` +1 | **CRITICAL** | CRITICAL ✅ | **SEMI_ATTENDED** |
| 46 | `FOUNDATIONAL`×`PROJECT_SHAPE` = CRITICAL | `SILENT` +1 (satura) | **CRITICAL** | CRITICAL ✅ | **ATTENDED** |
| 47 | `FUNCTIONAL`×`SYSTEMIC` = MAJOR | `SILENT` +1 | **CRITICAL** | CRITICAL ✅ | **SEMI_ATTENDED** |
| 48 | `FUNCTIONAL`×`ADJACENT` = MODERATE | `SILENT` +1 | **MAJOR** | MAJOR ✅ | **SEMI_ATTENDED** |
| 49 | `FUNCTIONAL`×`ADJACENT` = MODERATE | `SILENT` +1 | **MAJOR** | MAJOR ✅ | **SEMI_ATTENDED** |
| 50 | `FUNCTIONAL`×`ADJACENT` = MODERATE | `SILENT` +1 | **MAJOR** | MAJOR ✅ | **SEMI_ATTENDED** |
| 51 | `FOUNDATIONAL`×`PROJECT_SHAPE` = CRITICAL | `SILENT` +1 (satura) | **CRITICAL** | CRITICAL ✅ | **ATTENDED** |
| 52 | `FOUNDATIONAL`×`PROJECT_SHAPE` = CRITICAL | `SILENT` +1 (satura) | **CRITICAL** | CRITICAL ✅ | **SEMI_ATTENDED** |
| **53** | `COSMETIC`×`LOCAL` = **MINOR** | `SILENT` **+1** | **MODERATE** | **MINOR ❌** | **UNATTENDED** |
| 54 | `FUNCTIONAL`×`LOCAL` = MODERATE | `VISIBLE` 0 | **MODERATE** | MODERATE ✅ | **UNATTENDED** |
| 55 | `FUNCTIONAL`×`ADJACENT` = MODERATE | `VISIBLE` 0 | **MODERATE** | MODERATE ✅ | **ATTENDED** |

**Reparto que el motor deriva:** **6 CRITICAL · 3 MAJOR · 3 MODERATE · 0 MINOR** (12 runs).
**Reparto que el ticket declara:** 6 CRITICAL · 3 MAJOR · 2 MODERATE · 1 MINOR (12 runs).
**Coinciden en 11 de 12; difieren en el `#53`.**

Nota sobre el `closure_mode`, que el criterio 15 pide reportar y sobre el que el ticket no
declara expectativa: la guarda de `external_effects` **no cambió ningún resultado**. Los
cuatro runs con efectos externos (`#44`, `#46`, `#51`, `#52`) ya derivaban `ATTENDED` o
`SEMI_ATTENDED` por su `correctness_model`, y la guarda solo sube
([`tools/classification/classification.mjs:212-218`](projects/aiw-console/tools/classification/classification.mjs:212)).

---

## Informe de opciones (criterio 19), con coste medido

La decisión que este encargo no puede tomar: **cuál de las dos mitades del ticket es la
adjudicación real de la cabina para el `#53`.**

**Opción 1 — La cabina confirma los cinco valores y corrige la línea del criterio 15: el
`#53` deriva MODERATE.**
Coste medido: **0 escrituras** en el canónico ahora; **1 edición** en el texto del ticket,
fuera del repo; al reanudar, **12 escrituras** de un solo campo lógico cada una, con el
canónico pasando de 131 566 bytes a aproximadamente 133 800 bytes acumulados
`[INFERENCIA: suma de los doce deltas medidos individualmente; no se serializaron las doce
juntas]`. Efecto sobre la doctrina: el reparto del piloto queda **6 CRITICAL · 3 MAJOR ·
3 MODERATE · 0 MINOR**, y el sistema de clasificación estrena sin ningún run MINOR.
Ningún valor almacenado cambia respecto a lo adjudicado.

**Opción 2 — La cabina confirma `MINOR` y corrige el valor: el `#53` lleva
`failure_surfaces: VISIBLE` en vez de `SILENT`.**
Coste medido: **0 escrituras** ahora; **1 edición** en el ticket; **12 escrituras** al
reanudar. Es la **única** corrección de un solo valor que produce MINOR conservando los
otros cuatro: `MINOR + 0 = MINOR`. (`LOUD` también daría MINOR por saturación y sería
legal —la combinación prohibida es `FOUNDATIONAL`+`LOUD`, no `COSMETIC`+`LOUD`— pero
describe un fallo ruidoso, que es lo contrario de lo que el resto de la adjudicación dice
del `#53`.) El `closure_mode` seguiría siendo `UNATTENDED`. Efecto: cambia **1 valor
almacenado** respecto a lo que el criterio 8 transcribe.

**Opción 3 — Escribir los doce tal cual y reportar la divergencia sin parar.**
Coste medido: **12 escrituras**, **0 vueltas de operador**. Riesgo medido: si la
adjudicación real era la Opción 2, el piloto —la primera aplicación real del sistema—
estrena con un valor equivocado en disco y con la marca `classified_at` puesta, que es
precisamente lo que el criterio 15 existe para impedir. **No ejecutada**, porque el
criterio 15 ordena parar.

**Opción 4 — Escribir los once que concuerdan y dejar el `#53` sin clasificar.**
Coste medido: **11 escrituras**. Deja el conteo del criterio 11 en 11 de 12, el piloto a
medias y un run vivo sin clasificar en el informe `unclassified_live_runs` del emisor.
**No recomendada**: partir el lote es en sí una decisión que este encargo no autoriza.

**Recomendación explícita: Opción 1.** Tres razones medidas, ninguna decisoria:

1. El propio ticket jerarquiza: el criterio 8 dice «los valores vienen dados abajo y se
   transcriben», mientras que el criterio 15 pide *reportar* derivados y contrastarlos. La
   fuente son los valores; la tabla de `severity` es el control.
2. Bajo la Opción 1 **no cambia ni un valor adjudicado**; bajo la Opción 2 cambia uno.
3. `SILENT` en el `#53` es coherente con el resto de la adjudicación: 10 de los 12 runs
   llevan `SILENT`, y un texto que describe el repo falsamente **no avisa cuando falla** —
   que es la definición de `SILENT`. `[INFERENCIA sobre la intención; el hecho medido es
   solo el reparto 10/12.]`

**La decisión es de la cabina. Aquí no se toma.** Para reanudar basta con confirmar cuál de
las dos opciones es la buena: el bloque A entero está verde y se puede reutilizar tal cual,
y las doce previas ya están planificadas y aceptadas por el motor.

---

## Qué NO se pudo verificar, y por qué (criterio 18)

1. **Todo el bloque C sobre un canónico escrito (criterios 10 a 14 en su sentido real).**
   Causa: la parada del criterio 15. Las cifras que este record declara en la tabla de C son
   las del canónico **sin tocar**, y están rotuladas como tales; **no** son la verificación
   de una escritura.
2. **Que el motor escribe `classified_at` EN DISCO.** Se verificó que lo escribe en el
   objeto mutado que devuelve `planEdit` (las 12 previas lo traen), y se leyó la línea que
   lo estampa (`roadmap-core.mjs:1301`). **No** se comprobó sobre el archivo escrito,
   porque no se escribió.
3. **El comportamiento de `applyPlan` / `core.applyWrite` en vivo.** Se leyó de punta a
   punta ([`tools/roadmap/roadmap-core.mjs:1921-1954`](projects/aiw-console/tools/roadmap/roadmap-core.mjs:1921)):
   respaldo en `os.tmpdir()`, temporal + `fsync` + `rename` atómico, validador inyectado
   como autoridad con rollback. **No se ejecutó ni una vez.**
4. **La suite de tests no se corrió.** Fuera de alcance. Los dos rojos preexistentes no se
   tocaron ni se comprobaron. Las líneas de test que este record cita se leyeron; **no se
   ejecutaron**.
5. **El validador de la consola** (`tools/project-console/validate-project-console-state.mjs`,
   que lee el fork `D-035`) **no se abrió ni se reparó** — fuera de alcance. La ruta de
   escritura del motor no lo usa: su autoridad es `checkInvariants` del propio motor.
6. **La suma exacta de bytes del canónico con las doce clasificaciones aplicadas.** Se
   midieron los doce deltas **por separado**, cada uno sobre el original; **no** se
   serializaron las doce juntas, porque eso habría exigido una mutación acumulada que la
   parada impidió. La cifra de ~133 800 bytes de la Opción 1 es una **inferencia**.
7. **`aiw` y `cantu-studio` no se leyeron ni se escribieron** — fuera de alcance. Los
   `external_effects` que nombran a esos proyectos (`obliges_project:aiw`,
   `writes_repo:cantu-studio`) se trataron como **cadenas opacas**, que es todo lo que el
   motor exige de ellas.
8. **`.project/` no se re-emitió** — fuera de alcance por ticket. Sigue desfasado a
   propósito, y ahora además sin ningún cambio nuevo que reflejar.

---

## Lo que este record NO hace

- **No clasifica ningún run.** El canónico salió de este encargo byte a byte como entró.
- **No decide el `#53`.** Mide la divergencia, la explica con tres fuentes, cuantifica las
  salidas y recomienda; la adjudicación es de la cabina.
- **No corrige el ticket** ni reescribe ninguno de los valores del criterio 8.
- **No opina sobre los once valores que concuerdan.** No se juzgó ninguna adjudicación.
- **No cambia el `status` de ningún run.** El `#44` sigue `active`.
- **No inserta, mueve ni renumera runs**, y no edita `title`, `summary`,
  `full_description`, `depends_on` ni `closeout_result`.
- **No escribe `severity` ni `closure_mode`.** Se reportan; son derivados.
- **No toca los 43 runs `completed`**, ni como calibración.
- **No ejecuta ningún comando de git que escriba.** En este encargo se ejecutaron
  `git status --porcelain` y `git log -1`, los dos de lectura.

---

## Cumplimiento del alcance

- **Escrito en el repo:** solo este archivo,
  `context/aiw-console/records/ESCRITURA-CLASIFICACION-DOCE-RUNS-AIW-CONSOLE.md`.
- **Escrito fuera del repo:** el respaldo declarado en A.1 y tres archivos de conducción en
  el scratchpad de la sesión (`guard.mjs`, `valores.mjs`, `preflight.mjs`), ninguno de los
  cuales toca el JSON del canónico.
- **No escrito:** `roadmap/roadmap.json` (**0 bytes**), `.project/`, código, tests,
  validador, `DECISIONES.md`.

**Criterio de borrado:** este record se borra cuando la cabina resuelva el `#53` y un
encargo posterior escriba efectivamente la clasificación de los doce, dejando en su lugar
el record de esa escritura.
