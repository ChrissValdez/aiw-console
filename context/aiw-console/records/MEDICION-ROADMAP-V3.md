# MEDICIÓN — Roadmap v3 de Cantu y `taxonomy_model`

**Fecha:** 2026-07-23
**Naturaleza:** medición read-only. No se editó el contrato, ni `DECISIONES.md`, ni
ningún record existente. No se ejecutó git en ninguna forma. No se escribió en `.aiw/`.
**Insumo para:** capa 2 del contrato de la carpeta (D-039 fijó la capa 1).

**Archivos leídos (los tres nombrados en el encargo):**

| Alias usado abajo | Ruta en disco |
|---|---|
| `CONSOLE-SNAP` | `aiw-console/.aiw/views/project_console.snapshot.json` (215 líneas) |
| `AIW-SNAP` | `aiw/.aiw/project_console.snapshot.json` (97 líneas) |
| `CANTU-ROADMAP` | `cantu-studio/.aiw/roadmap/roadmap.json` (1072 líneas) |

Lecturas auxiliares (solo para contrastar contra lo ya documentado, no como fuente de
hechos nuevos): `context/aiw-console/records/AUDIT-CONSOLE-O4-PHASE0.md`,
`context/DECISIONES.md` (D-029, D-030, D-039).

---

## 1. Volcado de `taxonomy_model` y comparación

### 1.1 Volcado literal — `CONSOLE-SNAP:120-131`

```json
"taxonomy_model": {
  "objective_classifications": [
    "pending",
    "parked",
    "processed"
  ],
  "operational_statuses": [
    "active",
    "blocked",
    "idle"
  ]
}
```

### 1.2 Volcado literal — `AIW-SNAP:84-95`

```json
"taxonomy_model": {
  "objective_classifications": [
    "pending",
    "parked",
    "processed"
  ],
  "operational_statuses": [
    "active",
    "blocked",
    "idle"
  ]
}
```

### 1.3 Veredicto: **IDÉNTICOS** — comparación de contenido, no de claves

**CONFIRMADO.** La comparación no se hizo sobre las claves de primer nivel sino sobre el
objeto completo serializado: se parsearon ambos archivos y se comparó
`JSON.stringify(a) === JSON.stringify(b)` sobre el subárbol `taxonomy_model` entero.
Resultado: `true`. Coinciden en:

- el conjunto de claves de segundo nivel (`objective_classifications`, `operational_statuses`);
- el **tipo** de cada valor (array de strings en ambas);
- la **cardinalidad** de cada array (3 y 3);
- los **valores** de cada elemento;
- el **orden** de los elementos dentro de cada array.

No hay diferencia que mostrar. [VERIFICADO EN DISCO]

### 1.4 Observaciones de contorno (no pedidas, pero relevantes para la capa 2)

- Ambos snapshots declaran `"project_id": "aiw"` (`CONSOLE-SNAP:3`, `AIW-SNAP:3`) y
  `"schema_version": 1`. Son dos emisiones del **mismo proyecto** en momentos distintos
  (`generated_at` 2026-07-22T21:38 vs 2026-07-11T05:41, `CONSOLE-SNAP:4`, `AIW-SNAP:4`),
  por el mismo emisor (`aiw-projector@0.1.0`, `:5` en ambos). Que `taxonomy_model` sea
  idéntico entre dos emisiones separadas por 11 días es consistente con la hipótesis de
  que el bloque es **constante horneada en el emisor**, no derivada de los datos — pero
  esta medición no leyó el emisor, así que la hipótesis queda **[NO VERIFICADO]**.
- `taxonomy_model` describe el vocabulario del modelo **`aiw_flat_objectives_v1`**
  (`CONSOLE-SNAP:10`, `AIW-SNAP:10`): clasificaciones de objetivo por carpeta
  (`pending`/`parked`/`processed`) y estados operativos de proyecto
  (`active`/`blocked`/`idle`). **No** describe el vocabulario del roadmap v3 de Cantu:
  ninguno de los seis valores enumerados en `taxonomy_model` coincide con los valores de
  `status` de run medidos en el punto 2, salvo la colisión léxica de `active` y `blocked`,
  que en `taxonomy_model` califican al **proyecto** y en el roadmap v3 califican a un
  **run**. Son ejes distintos con palabras iguales.
- El único snapshot de Cantu (`cantu-studio/.aiw/views/project_console.snapshot.json`)
  **no** se leyó en esta medición: está fuera del scope de los tres archivos nombrados.
  El audit lo documenta como schema v0.3, familia distinta (`AUDIT:315-321`), y D-039 lo
  descartó como norma. Si tiene o no `taxonomy_model`, y con qué contenido, queda
  **[NO VERIFICADO]** aquí.

---

## 2. Valores de `status` observados en los 65 runs de Cantu

Recorrido exhaustivo de `CANTU-ROADMAP` → `objectives[] → phases[] → runs[]`.
Totales estructurales: **8 objetivos, 30 fases, 65 runs**. [VERIFICADO EN DISCO]

| Valor de `status` | Conteo | % |
|---|---:|---:|
| `planned` | 53 | 81,5 % |
| `completed` | 11 | 16,9 % |
| `active` | 1 | 1,5 % |
| `blocked` | **0** | 0 % |
| **Total** | **65** | 100 % |

**¿Hay algún valor fuera de {planned, active, completed, blocked}?
NO.** El conjunto de valores distintos observados es exactamente
`{planned, completed, active}` — un subconjunto propio del vocabulario esperado.
No aparece ningún valor inesperado, ni vacío, ni `null`, ni variante de capitalización.
Todo run tiene la clave `status` presente (65/65). [VERIFICADO EN DISCO]

**Hallazgo:** `blocked` está **declarado en el vocabulario pero no instanciado en los
datos**. El audit documenta que la consola calcula un stat "Blocked" contando runs con
`status:"blocked"` (`AUDIT:334`, `CANTU-PCJS:3175-3185,795`); en disco ese contador vale
**cero** y siempre ha valido cero para este roadmap. Consecuencia directa para el punto 3:
la rama `blocked` de la regla de derivación es **código muerto contra los datos actuales**.

**Localización de los 12 runs no-`planned`** (línea del campo `status`):

| Run | `status` | Línea |
|---|---|---:|
| `RUN-JAME-PROJECT-CONSOLE-FOUNDATION-001` | completed | `CANTU-ROADMAP:20` |
| `RUN-JAME-ROADMAP-V3-DESIGN-001` | completed | `:36` |
| `RUN-JAME-PROJECT-CONSOLE-ROADMAP-V3-PROTOTYPE-001` | completed | `:46` |
| `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001` | completed | `:157` |
| `RUN-JAME-ROADMAP-MAINTENANCE-HELPER-001` | completed | `:166` |
| `RUN-CANTU-PROJECT-CONSOLE-ROADMAP-EDITING-001` | completed | `:178` |
| `RUN-CANTU-DEV-LAUNCHERS-001` | completed | `:190` |
| `RUN-CANTU-ROADMAP-EDITOR-USABILITY-001` | completed | `:200` |
| `RUN-CANTU-ROADMAP-CLOSE-ACTIVE-RUN-001` | completed | `:210` |
| **`RUN-CANTU-PROJECT-CONSOLE-LATENT-DEFECTS-001`** | **active** | **`:219`** |
| `RUN-JAME-SMART-FORMULA-FIELD-RULE-ONLY-BASELINE-001` | completed | `:457` |
| `RUN-JAME-MATHLIVE-INTEGRATION-READINESS-001` | completed | `:484` |

Los 10 primeros pertenecen a O0; los 2 últimos a O5. **Hay exactamente un run `active` en
todo el roadmap**, lo que es coherente con la convención de un solo run en curso que el
audit describe como "Active Run" derivado en render (`AUDIT:332`).

---

## 3. Prueba de la regla de derivación propuesta

**Regla evaluada (precedencia declarada en el encargo):**

1. `active` si **algún** run del objetivo está `active`;
2. si no, `completed` si **TODOS** lo están;
3. si no, `blocked` si **alguno** lo está;
4. si no, `planned`.

Aplicada a los 65 runs agrupados por objetivo. Los 8 objetivos están presentes; ninguno
omitido. Suma de la columna *n*: 17+6+7+19+1+7+5+3 = **65** ✓.

| # | `objective_id` | Título | Línea | n runs | planned | active | completed | blocked | **Status derivado** | Marca |
|---|---|---|---:|---:|---:|---:|---:|---:|---|---|
| 1 | `O0` | Project Console | `CANTU-ROADMAP:7` | 17 | 7 | 1 | 9 | 0 | **active** | — |
| 2 | `O2` | Cantu Studio Knowledge Base and Documentation Source of Truth | `:305` | 6 | 6 | 0 | 0 | 0 | **planned** | — |
| 3 | `O5` | Editor and Engine Shared Features | `:395` | 7 | 5 | 0 | 2 | 0 | **planned** | ⚠️ **A** |
| 4 | `O1` | Cantu Studio Web Components | `:510` | 19 | 19 | 0 | 0 | 0 | **planned** | — |
| 5 | `O4` | Cantu Studio UX | `:796` | 1 | 1 | 0 | 0 | 0 | **planned** | ⚠️ **B** |
| 6 | `O3` | Cantu Studio Slide Components | `:820` | 7 | 7 | 0 | 0 | 0 | **planned** | — |
| 7 | `O6` | Asset Deduplication Layer | `:926` | 5 | 5 | 0 | 0 | 0 | **planned** | — |
| 8 | `O7` | Lessons, Production, and Deployment | `:1012` | 3 | 3 | 0 | 0 | 0 | **planned** | — |

Distribución de status derivado: **1 `active`, 7 `planned`, 0 `completed`, 0 `blocked`.**
[VERIFICADO EN DISCO]

### 3.1 Casos marcados

**⚠️ A — `O5` es contraintuitivo (pérdida de señal de avance).**
`O5` tiene 2 de 7 runs `completed` (`RUN-JAME-SMART-FORMULA-FIELD-RULE-ONLY-BASELINE-001`
en `:457` y `RUN-JAME-MATHLIVE-INTEGRATION-READINESS-001` en `:484`) y aun así deriva
`planned` — el mismo valor que `O1`, `O2`, `O3`, `O6` y `O7`, donde **no se ha completado
nada**. La regla, tal como está enunciada, **no tiene un valor para "empezado pero ni
activo ni terminado"**: colapsa "29 % hecho" y "0 % hecho" al mismo símbolo. Este es el
hallazgo más importante del punto 3. Nótese además que el audit documenta que la consola
ya calcula ratios por fase (`v3PhaseRatio`, `v3ObjectiveStats`, `AUDIT:467`), es decir,
la señal de avance existe en render pero la regla propuesta la descarta.

**⚠️ B — `O4` es degenerado, no ambiguo.**
`O4` tiene un único run (`RUN-JAME-AUTHORING-WORKSPACE-UX-AUDIT-001`, `queue_order` 50).
Con n=1 la regla es la identidad: el status del objetivo **es** el status de su único run,
sin agregación real. No es un error, pero conviene saber que ese objetivo no ejercita la
regla y por tanto no la valida.

### 3.2 Ramas de la regla que esta prueba NO ejercitó

- **Rama 2 (`completed` si todos lo están): nunca se dispara.** Ningún objetivo tiene
  todos sus runs `completed`. La regla **no quedó probada** en su rama de cierre con estos
  datos. `O0` es el candidato más cercano y le faltan 8 runs.
- **Rama 3 (`blocked`): inalcanzable.** Con 0 runs `blocked` en disco (punto 2), esta rama
  no puede activarse hoy por ningún camino. Queda sin prueba empírica.
- **Objetivo con 0 runs: agujero de especificación.** Los 8 objetivos tienen ≥1 run, así
  que el caso no aparece en disco. Pero la regla tal como está redactada es peligrosa ahí:
  "`completed` si TODOS lo están" evaluado sobre una lista vacía es **verdadero por
  vacuidad** en la semántica habitual (`Array.every` de JS devuelve `true` sobre `[]`), de
  modo que **un objetivo recién creado y vacío derivaría `completed`**. En esta medición se
  neutralizó el caso con una guarda explícita de longitud > 0. Si la regla pasa al
  contrato, debe decir qué hace con el objetivo vacío. Es una decisión, no una medición:
  se reporta, no se resuelve.
- **Precedencia `active` > `completed`: no se pudo discriminar.** Solo un objetivo tiene
  un run `active` y ese objetivo también tiene `planned`, así que el orden entre las ramas
  1 y 2 no se puso a prueba con datos reales.

### 3.3 Observación adicional sobre el nivel intermedio

La regla propuesta va de **run → objetivo** saltándose la **fase**, que sí existe en los
datos como nivel estructural (30 fases, `phase_id` en `CANTU-ROADMAP:11,27,148,…`). El
roadmap tiene tres niveles y la regla solo define dos. Se reporta como hecho estructural;
la decisión de si la fase deriva status también queda fuera de esta medición.

---

## 4. Búsqueda de campos no documentados

Enumeración **exhaustiva** de claves, obtenida recorriendo cada nodo del JSON entero (no
por muestreo). Se incluye la frecuencia sobre el universo de cada nivel.

### 4.1 Raíz del documento (4 claves)

| Clave | Valor observado | Línea |
|---|---|---:|
| `schema_version` | `"jame.roadmap_v3.v0.2-progress"` | `CANTU-ROADMAP:2` |
| `roadmap_id` | `"roadmap"` | `:3` |
| `title` | `"Cantu Studio Roadmap"` | `:4` |
| `objectives` | array de 8 | `:5` |

### 4.2 Nivel objetivo — 3 claves, sin excepciones (8/8 cada una)

| Clave | Presencia | Nota |
|---|---:|---|
| `objective_id` | 8/8 | `O0`,`O1`,`O2`,`O3`,`O4`,`O5`,`O6`,`O7` |
| `title` | 8/8 | string |
| `phases` | 8/8 | array |

**No existe** `summary` ni `full_description` a nivel objetivo. Esto es coherente con lo
que el propio roadmap registra en `RUN-CANTU-ROADMAP-EDITOR-USABILITY-001`
(`CANTU-ROADMAP:199`): *"Objectives and phases were reduced to a title only; summary and
full_description were removed from the schema, the data and the console"*. La medición
confirma en disco que esa reducción se aplicó.

### 4.3 Nivel fase — 3 claves, sin excepciones (30/30 cada una)

| Clave | Presencia |
|---|---:|
| `phase_id` | 30/30 |
| `title` | 30/30 |
| `runs` | 30/30 |

### 4.4 Nivel run — 9 claves. **Confirmación del audit: no hay ninguna más.**

| Clave | Presencia | Coincide con lo que documentó el audit |
|---|---:|---|
| `run_id` | 65/65 | ✓ |
| `queue_order` | 65/65 | ✓ |
| `title` | 65/65 | ✓ |
| `summary` | 65/65 | ✓ |
| `full_description` | 65/65 | ✓ |
| `status` | 65/65 | ✓ |
| `depends_on` | 65/65 | ✓ |
| `closeout_result` | **9/65** | ✓ (el audit dijo 9/65) |
| `progress` | **1/65** | ✓ (el audit dijo 1/65) |

**VEREDICTO: el audit estaba completo a nivel de run. No falta ninguna clave.** Las nueve
claves listadas por el audit son exactamente las nueve que aparecen en disco, con las
mismas frecuencias. No se encontró ningún campo undocumented en runs. [VERIFICADO EN DISCO]

### 4.5 Sub-estructura de `progress` (5 claves anidadas, no listadas por el audit)

El audit contó `progress` como un campo (1/65) pero no abrió su forma. El único run que lo
tiene es `RUN-JAME-PROJECT-CONSOLE-ROADMAP-V3-PROTOTYPE-001` (`CANTU-ROADMAP:51`), con un
array de **13 entradas**, cada una con exactamente estas claves:

| Clave interna | Valores observados en las 13 entradas |
|---|---|
| `cycle` | `1,2,3,4` |
| `stage` | `execution`, `ai_review`, `human_qa`, `correction`, `closeout` |
| `attempt` | `1,2,3,4` |
| `state` | `done` (13/13) |
| `result` | `implemented`, `approved`, `changes_requested`, `passed`, `completed` |

La traza registra 4 ciclos: tres rondas `ai_review→approved` seguidas de
`human_qa→changes_requested`, y un cuarto ciclo con `human_qa→passed` y
`closeout→completed`. **Este es el único vocabulario de estado por etapa que existe en el
roadmap, y vive en 1 de 65 runs.** Cualquier contrato que lo asuma general estaría
asumiendo un caso único.

### 4.6 `closeout_result` no es un enum

De los 9 valores presentes, **8 son la constante `"completed_successfully"`**
(líneas `:22, :38, :50, :170, :182, :192, :202, :459`) y **1 es prosa libre de párrafo
completo**: `RUN-JAME-MATHLIVE-INTEGRATION-READINESS-001` (`:486`), que empieza
*"MathLive is an installed dependency, imported and DOM-mounted…"* y explica un cierre en
sitio. El campo mezcla, en la misma clave, un **código de resultado** y una **justificación
narrativa**. Se reporta como hecho; no se propone forma.

### 4.7 Discrepancias contra lo que el audit documentó

Tres, todas menores y ninguna contradice al audit:

1. **`current_stage` no existe en los datos.** El audit lo lista entre los campos que la
   consola lee en `v3QueueRowHtml` (`AUDIT:472-473`, `CANTU-VALID:1387`, marcado **P** =
   presunto). Medición: **0 ocurrencias** de `current_stage` en `CANTU-ROADMAP`. El audit
   no afirmó que existiera en disco — lo listó como referencia del código — pero conviene
   dejar asentado que **el código lee un campo que el dato nunca provee**.
2. **`completed` (11) ≠ `closeout_result` (9).** Dos runs están `completed` **sin**
   `closeout_result`: `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001` (`:152-157`) y
   `RUN-CANTU-ROADMAP-CLOSE-ACTIVE-RUN-001` (`:205-210`). Los dos conteos del audit (11
   completados implícitos, 9 con closeout) son ambos correctos; su diferencia no estaba
   señalada. **Ningún run no-`completed` tiene `closeout_result`** — la implicación
   `closeout_result ⇒ completed` sí se sostiene; la recíproca no.
3. **El audit no enumeró las claves de objetivo ni de fase.** Quedan enumeradas en 4.2 y
   4.3. No hay sorpresas: 3 y 3, sin excepciones.

### 4.8 Integridad de `queue_order` y `depends_on` (verificación de contorno)

- `queue_order`: 65 valores, mínimo 1, máximo 65, **todos únicos, sin huecos**. Es una
  secuencia global densa 1..65, no un orden por objetivo ni por fase. [VERIFICADO EN DISCO]
- `depends_on`: 48 de 65 runs tienen dependencias declaradas; 17 tienen array vacío.
  **Cero referencias colgantes**: todo `run_id` citado en algún `depends_on` existe como
  run del mismo roadmap. [VERIFICADO EN DISCO]

---

## 5. Rastro de categoría (D-029) y de batch (D-030)

**Lo buscado.** D-029 (`DECISIONES.md:246-267`) define tres categorías de run por lo que
pasa en el cierre — **manual / semi-autónomo / autónomo** — asignadas *por el humano al
crear el run*. D-030 (`DECISIONES.md:269-282`) define que cada run pertenece a un **batch**
que el humano fija al encolar, y que el batch **determina la rama** del repo del proyecto.

**Método.** (a) barrido de todas las claves del JSON contra el léxico
`categor|batch|lote|tanda|mode|kind|type|tier|autonom|manual|semi|owner|assignee|agent|label|tag`;
(b) barrido de la prosa (`title`, `summary`, `full_description` de los 65 runs, más títulos
de fase y objetivo) contra `batch|categor*|manual*|autonom*|semi*|lote|tanda|unattended|desatendid*`;
(c) inspección de las convenciones de nomenclatura de `run_id` y de la estructura de
agrupación.

### 5.1 Veredicto: **AUSENCIA EXPLÍCITA**

**No existe ningún campo que cumpla la función de categoría de D-029.**
**No existe ningún campo que cumpla la función de batch de D-030.**
**No existe ningún campo de rama.**

El barrido (a) sobre el léxico completo devolvió **una sola coincidencia de clave**:
`"stage"`, y solo dentro del array `progress` de un único run. Ninguna de las 9 claves de
run, ni las 3 de fase, ni las 3 de objetivo, ni las 4 de raíz codifica categoría, batch,
rama, ejecutor o modo de supervisión. [VERIFICADO EN DISCO]

### 5.2 Lo que sí se encontró, y por qué NO sirve

Cuatro convenciones existentes que podrían confundirse con lo buscado. Ninguna lo es:

| Convención observada | Qué agrupa realmente | Por qué no es categoría ni batch |
|---|---|---|
| **Prefijo de `run_id`: `RUN-JAME-*` (48) vs `RUN-CANTU-*` (17)** | Dos familias de nomenclatura | El propio roadmap contiene runs dedicados a renombrar `JAME`→Cantu (`:277 RUN-CANTU-RUNTIME-JAME-CLASS-RENAME-001`, `:289 RUN-CANTU-RUNTIME-J-NAMESPACE-RENAME-001`, `:252`, `:265`). El prefijo marca **época de nombrado**, no eje de cierre ni destino de rama. Que sea época y no categoría es **inferencia** a partir de esos runs de rename, no un campo que lo declare — **[NO VERIFICADO]** como afirmación fuerte. |
| **`phases` (30 fases)** | Agrupación **temática** de runs dentro de un objetivo (p. ej. "Web Components - Math", `:692`) | Es un eje de contenido. Nada indica que una fase se apruebe o rechace junta, que es el criterio de agrupación de D-030. |
| **`depends_on` (48 runs)** | Orden de precedencia entre runs | Es un grafo de dependencias, no una partición. Un batch es una etiqueta de pertenencia; `depends_on` no particiona nada. |
| **`progress[].stage`** con `human_qa`, `ai_review`, `closeout` | La traza *a posteriori* de un run | Es lo **más cercano** al eje de D-029 (registra que hubo `human_qa` y con qué resultado), pero (i) describe lo que **pasó**, no lo que el humano **asignó al crear el run**, y (ii) existe en **1 de 65 runs**. No puede cumplir la función de categoría. |

### 5.3 Menciones de "batch" y "manual" en prosa (ninguna es funcional)

Cuatro apariciones en todo el archivo, todas dentro de texto descriptivo:

- `:198` — `"…batched edits…"`, en el `summary` de `RUN-CANTU-ROADMAP-EDITOR-USABILITY-001`:
  se refiere a **agrupar ediciones de UI en un solo dry-run**, no a batches de runs.
- `:199` — `"…a manual archive flag…"` y `"…batches every changed field into a single
  dry-run…"`, mismo run: una **casilla de archivado** en el editor y de nuevo el batching de
  ediciones de UI.
- `:269` — `"…the manually maintained prompts directory…"`, en
  `RUN-CANTU-DOCS-DIRECTORY-RENAME-001`: describe un directorio, no un run.
- `:886` — `"…rather than a single broad batch…"`, en `RUN-JAME-SLIDE-BOUNDED-RUN-PLAN-001`:
  usa "batch" **en contraste**, para decir que se prefiere un run por componente.
- `:894` — `RUN-JAME-SLIDE-FIRST-BOUNDED-COMPONENT-BATCH-001`: la palabra está en un
  `run_id`, como nombre propio de un run. No es un campo ni una etiqueta de agrupación.

Ninguna de las cinco cumple función de categoría ni de batch. [VERIFICADO EN DISCO]

### 5.4 Consecuencia para la capa 2

Si D-029 y D-030 han de reflejarse en el roadmap v3, la capa 2 del contrato tendría que
**introducir campos nuevos**, no adoptar ni renombrar convenciones existentes: no hay nada
que reciclar. Se reporta el hecho; la decisión de qué campos y con qué forma queda fuera de
esta medición.

---

## Nota de alcance

- `no_claims_summary` y `validation_summary` aparecen en ambos snapshots como objetos
  vacíos (`CONSOLE-SNAP:118-119`, `AIW-SNAP:82-83`). Se deja constancia de su presencia y
  de que están vacíos, y **nada más**: su forma quedó opaca por D-039 y proponerla está
  explícitamente fuera de scope.
- No se leyó ni se midió el emisor (`tools/projector/project.mjs`), ni el snapshot v0.3 de
  Cantu, ni `roadmap_v2.json` / `roadmap_v2_normalized_proposal.json` (presentes en el
  mismo directorio que `CANTU-ROADMAP` pero fuera de los tres archivos nombrados).
  Cualquier afirmación sobre ellos sería **[NO VERIFICADO]** y por eso no se hace.
