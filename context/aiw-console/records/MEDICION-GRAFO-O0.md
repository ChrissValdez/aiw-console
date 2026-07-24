# MEDICIÓN — Grafo de dependencias alrededor de O0 (alcance de la migración de D-034)

**Fecha:** 2026-07-23
**Naturaleza:** medición read-only. No se editó `CONTRATO.md`, ni `DECISIONES.md`, ni
ningún record existente. No se ejecutó git en ninguna forma. No se escribió en `.aiw/`.
**Insumo para:** ratificar el alcance de la migración de O0 (D-034, pendiente).
**Decide el operador.** Esta medición no decide; entrega los dos números.

**Archivo medido:**

| Alias | Ruta en disco | Líneas |
|---|---|---:|
| `CANTU-ROADMAP` | `projects/cantu-studio/.aiw/roadmap/roadmap.json` | 1071 |

**Lecturas auxiliares** (solo para contrastar supuestos, no como fuente de hechos nuevos):
`context/DECISIONES.md` (D-034, `:357-390`), `context/handoffs/aiw-console.md`
(`:116-130`), `context/aiw-console/records/MEDICION-ROADMAP-V3.md`.

**Método.** Parseo del JSON completo + índice línea↔`run_id` construido por barrido de
las 1071 líneas. Recorrido exhaustivo `objectives[] → phases[] → runs[]`: 8 objetivos,
30 fases, **65 runs**. Toda cifra de abajo sale de ese recorrido. [VERIFICADO EN DISCO]

---

## Resumen ejecutivo — los dos números del punto 5

| Escenario | Runs que migran | **Aristas que cruzan la frontera** |
|---|---:|---:|
| **Migrar O0 completo** | 17 | **8** |
| **Migrar solo el subconjunto por patrón** | 6 | **4** |

Y un tercero que la medición encontró y que nadie había contado: si el patrón de D-034 se
lee **literalmente** (`RUN-CANTU-PROJECT-CONSOLE-*`), el subconjunto no es de 6 sino de
**4 runs**, y deja **2** aristas rotas. Ver punto 4.1.

**Tres hallazgos que contradicen lo que el handoff o D-034 dan por supuesto** — detalle en
los puntos 1.2, 4.1 y 5.2:

1. El subconjunto "6 runs" **no** se obtiene con el patrón que D-034 escribe. Requiere
   leerlo como `RUN-*-PROJECT-CONSOLE-*` (cualquier prefijo). El patrón literal da 4.
2. El subconjunto de 6 **no está contenido en O0**: uno de los seis
   (`RUN-JAME-PROJECT-CONSOLE-DOCS-V3-001`) vive en **O2**, no en O0. Migrar "los 6"
   no es "migrar un trozo de O0": es partir **dos** objetivos.
3. Menos aristas rotas **no** significa migración más limpia. Las 4 aristas del
   escenario-6 parten O0 **por dentro** (3 de las 4 son O0→O0). Las 8 del escenario-O0
   son todas entre objetivos distintos y **7 de las 8 salen del mismo bloque de 5 runs de
   rename**, que probablemente no debería migrar. Ver punto 5.3.

---

## 1. Los 17 runs de O0

`objective_id: "O0"`, título `"Project Console"` — `CANTU-ROADMAP:7-8`.
Tres fases: `O0.P1` (`:11`), `O0.P2` (`:27`), `O0.P3` (`:148`).

| # | `queue_order` | `run_id` | `status` | Fase | Prefijo | Línea |
|---:|---:|---|---|---|---|---:|
| 1 | 1 | `RUN-JAME-PROJECT-CONSOLE-FOUNDATION-001` | completed | O0.P1 | **JAME** | `:15` |
| 2 | 2 | `RUN-JAME-ROADMAP-V3-DESIGN-001` | completed | O0.P2 | **JAME** | `:31` |
| 3 | 4 | `RUN-JAME-PROJECT-CONSOLE-ROADMAP-V3-PROTOTYPE-001` | completed | O0.P2 | **JAME** | `:41` |
| 4 | 5 | `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001` | completed | O0.P3 | CANTU | `:152` |
| 5 | 6 | `RUN-JAME-ROADMAP-MAINTENANCE-HELPER-001` | completed | O0.P3 | **JAME** | `:161` |
| 6 | 7 | `RUN-CANTU-PROJECT-CONSOLE-ROADMAP-EDITING-001` | completed | O0.P3 | CANTU | `:173` |
| 7 | 8 | `RUN-CANTU-DEV-LAUNCHERS-001` | completed | O0.P3 | CANTU | `:185` |
| 8 | 9 | `RUN-CANTU-ROADMAP-EDITOR-USABILITY-001` | completed | O0.P3 | CANTU | `:195` |
| 9 | 10 | `RUN-CANTU-ROADMAP-CLOSE-ACTIVE-RUN-001` | completed | O0.P3 | CANTU | `:205` |
| 10 | 11 | `RUN-CANTU-PROJECT-CONSOLE-LATENT-DEFECTS-001` | **active** | O0.P3 | CANTU | `:214` |
| 11 | 12 | `RUN-CANTU-ROADMAP-PHASE-OBJECTIVE-OPS-001` | planned | O0.P3 | CANTU | `:223` |
| 12 | 17 | `RUN-CANTU-REPO-RENAME-001` | planned | O0.P3 | CANTU | `:232` |
| 13 | 61 | `RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001` | planned | O0.P3 | CANTU | `:243` |
| 14 | 62 | `RUN-CANTU-INTERNAL-CODE-RENAME-001` | planned | O0.P3 | CANTU | `:252` |
| 15 | 63 | `RUN-CANTU-DOCS-DIRECTORY-RENAME-001` | planned | O0.P3 | CANTU | `:265` |
| 16 | 64 | `RUN-CANTU-RUNTIME-JAME-CLASS-RENAME-001` | planned | O0.P3 | CANTU | `:277` |
| 17 | 65 | `RUN-CANTU-RUNTIME-J-NAMESPACE-RENAME-001` | planned | O0.P3 | CANTU | `:289` |

### 1.1 Confirmaciones

- **Reparto 13/4: CONFIRMADO.** 13 `RUN-CANTU-*` + 4 `RUN-JAME-*` = 17. Los cuatro JAME
  son los de las líneas `:15`, `:31`, `:41`, `:161`. [VERIFICADO EN DISCO]
- **`queue_order` 1, 2, 4–12, 17, 61–65: CONFIRMADO** literalmente. La secuencia medida es
  `1,2,4,5,6,7,8,9,10,11,12,17,61,62,63,64,65` — 17 valores, idéntica a la del handoff
  (`handoffs/aiw-console.md:127`). [VERIFICADO EN DISCO]
- **Status de O0:** 9 `completed`, 1 `active`, 7 `planned`. Coincide con
  `MEDICION-ROADMAP-V3.md:160`. El único run `active` de todo el roadmap está en O0
  (`:214`, `queue_order` 11).
- **Distribución por fase:** O0.P1 = 1 run, O0.P2 = 2 runs, O0.P3 = **14 runs**. Las "3
  fases" del handoff son correctas, pero O0 está de hecho concentrado en una sola.

### 1.2 Hallazgo — el corolario de identidad del handoff está mal atribuido

El handoff dice (`:129-130`) que «el roadmap de la consola nacería heredando ids
`RUN-JAME`». Es cierto, pero la razón es más fuerte de lo registrado: los **cuatro** runs
`RUN-JAME` de O0 son precisamente los cimientos —foundation, diseño v3, prototipo v3 y
helper de mantenimiento (`:15,:31,:41,:161`)— y **los cuatro están `completed`**. No es un
residuo de nomenclatura repartido al azar: es que **toda la historia ya cerrada de O0 lleva
prefijo JAME** y todo lo pendiente lleva CANTU. Los 7 `planned` son 7/7 `RUN-CANTU`.

---

## 2. Aristas que SALEN de O0

Runs de O0 cuyo `depends_on` apunta a un run de otro objetivo. **Total: 7.**

| # | Origen (run de O0) | Línea | `depends_on` → destino | Línea de la cita | Objetivo del destino |
|---:|---|---:|---|---:|---|
| 1 | `RUN-CANTU-REPO-RENAME-001` | `:232` | `RUN-CANTU-NAMING-AUDIT-DISPOSITION-001` | `:239` | **O2** — Knowledge Base and Documentation SoT |
| 2 | `RUN-CANTU-INTERNAL-CODE-RENAME-001` | `:252` | `RUN-CANTU-NAMING-AUDIT-DISPOSITION-001` | `:259` | **O2** |
| 3 | `RUN-CANTU-INTERNAL-CODE-RENAME-001` | `:252` | `RUN-JAME-WEB-READINESS-EVIDENCE-001` | `:260` | **O1** — Cantu Studio Web Components |
| 4 | `RUN-CANTU-INTERNAL-CODE-RENAME-001` | `:252` | `RUN-JAME-SLIDE-READINESS-EVIDENCE-001` | `:261` | **O3** — Cantu Studio Slide Components |
| 5 | `RUN-CANTU-DOCS-DIRECTORY-RENAME-001` | `:265` | `RUN-CANTU-NAMING-AUDIT-DISPOSITION-001` | `:272` | **O2** |
| 6 | `RUN-CANTU-RUNTIME-JAME-CLASS-RENAME-001` | `:277` | `RUN-CANTU-NAMING-AUDIT-DISPOSITION-001` | `:284` | **O2** |
| 7 | `RUN-CANTU-RUNTIME-J-NAMESPACE-RENAME-001` | `:289` | `RUN-CANTU-NAMING-AUDIT-DISPOSITION-001` | `:296` | **O2** |

**Concentración total.** Las 7 aristas salen de solo **5 runs distintos**, y esos 5 son
exactamente el bloque de rename (`queue_order` 17, 62, 63, 64, 65). Ninguno de los otros
12 runs de O0 depende de nada fuera de O0.

**Un solo destino domina:** `RUN-CANTU-NAMING-AUDIT-DISPOSITION-001` (O2, `queue_order`
16, `:365`) recibe **5 de las 7**. Es el cuello de botella del rename entero.

---

## 3. Aristas que ENTRAN a O0

Runs de otros objetivos cuyo `depends_on` apunta a un run de O0. **Total: 1.**

| # | Origen (run de otro objetivo) | Objetivo del origen | Línea | `depends_on` → destino en O0 | Línea de la cita |
|---:|---|---|---:|---|---:|
| 1 | `RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` | **O2** (`queue_order` 15) | `:354` | `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001` (`queue_order` 5) | `:361` |

**Total de aristas que cruzan la frontera de O0: 7 + 1 = 8.** [VERIFICADO EN DISCO]

**Observación:** el grafo alrededor de O0 es **fuertemente asimétrico**. O0 tira de fuera
7 veces; el resto del roadmap tira de O0 **una sola vez**, y contra un run ya `completed`
(`RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`, status en `:157`). Una dependencia contra un run
ya cerrado es una arista **histórica**, no un bloqueo vivo: no impide programar nada.

---

## 4. El subconjunto que D-034 nombra por patrón

### 4.1 Hallazgo previo — el patrón no da 6

D-034 (`DECISIONES.md:370-371`) escribe: «migrar los runs `RUN-CANTU-PROJECT-CONSOLE-*`».
Medido en disco, ese patrón literal encuentra **3 runs**. Sumando el que el encargo nombra
aparte (`RUN-JAME-PROJECT-CONSOLE-DOCS-V3-001`) da **4**, no 6.

El handoff (`:120`) dice «**6 runs** (5 en O0 + `RUN-JAME-PROJECT-CONSOLE-DOCS-V3-001`)».
Esa cifra solo se obtiene ensanchando el patrón a `RUN-*-PROJECT-CONSOLE-*`, es decir,
ignorando el prefijo. Enumeración exhaustiva de los `run_id` que contienen el substring
`-PROJECT-CONSOLE-`:

| # | `queue_order` | `run_id` | `status` | Objetivo | Fase | ¿Casa con el patrón literal de D-034? | Línea |
|---:|---:|---|---|---|---|---|---:|
| 1 | 1 | `RUN-JAME-PROJECT-CONSOLE-FOUNDATION-001` | completed | O0 | O0.P1 | **NO** (prefijo JAME) | `:15` |
| 2 | 4 | `RUN-JAME-PROJECT-CONSOLE-ROADMAP-V3-PROTOTYPE-001` | completed | O0 | O0.P2 | **NO** (prefijo JAME) | `:41` |
| 3 | 7 | `RUN-CANTU-PROJECT-CONSOLE-ROADMAP-EDITING-001` | completed | O0 | O0.P3 | sí | `:173` |
| 4 | 11 | `RUN-CANTU-PROJECT-CONSOLE-LATENT-DEFECTS-001` | **active** | O0 | O0.P3 | sí | `:214` |
| 5 | 59 | `RUN-JAME-PROJECT-CONSOLE-DOCS-V3-001` | planned | **O2** | **O2.P3** (`:376`) | no, pero el encargo lo nombra aparte | `:380` |
| 6 | 61 | `RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001` | planned | O0 | O0.P3 | sí | `:243` |

El «5 en O0» del handoff es **correcto** bajo la lectura ensanchada (filas 1,2,3,4,6). La
medición confirma la cifra y señala que **la cifra no se deduce del texto de D-034**: la
enmienda tendrá que decir cuál de las dos lecturas vale. [VERIFICADO EN DISCO]

**Y un hecho estructural que ninguna de las dos fuentes registra:** la fila 5 vive en
**O2**, no en O0 (`objective_id: "O2"` en `:305`, fase `O2.P3` en `:376`). Migrar "los 6"
**parte dos objetivos**, no uno.

### 4.2 El mismo grafo, medido solo para ese subconjunto

Frontera evaluada: {los 6} vs {los otros 59}. Arista cruzada = todo `depends_on` en el que
un lado está en el subconjunto y el otro no. **Total: 4.**

| # | Dependiente | Lado | `depends_on` → prerequisito | Lado | Objetivos | Línea |
|---:|---|---|---|---|---|---:|
| 1 | `RUN-JAME-PROJECT-CONSOLE-ROADMAP-V3-PROTOTYPE-001` | **migra** | `RUN-JAME-ROADMAP-V3-DESIGN-001` | queda | O0 → O0 | `:48` |
| 2 | `RUN-JAME-ROADMAP-MAINTENANCE-HELPER-001` | queda | `RUN-JAME-PROJECT-CONSOLE-ROADMAP-V3-PROTOTYPE-001` | **migra** | O0 → O0 | `:168` |
| 3 | `RUN-CANTU-PROJECT-CONSOLE-ROADMAP-EDITING-001` | **migra** | `RUN-JAME-ROADMAP-MAINTENANCE-HELPER-001` | queda | O0 → O0 | `:180` |
| 4 | `RUN-JAME-PROJECT-CONSOLE-DOCS-V3-001` | **migra** | `RUN-JAME-DOCUMENTATION-CANONICAL-MODEL-001` | queda | O2 → O2 | `:387` |

**Si se migran solo los 6 y los otros 11 de O0 se quedan: 4 aristas cruzan la frontera.**

**Naturaleza de las 4, que es lo que importa:** 3 de las 4 son **O0→O0** y las tres forman
una **cadena alternante partida en tres**:

```
RUN-JAME-ROADMAP-V3-DESIGN-001 (queda)
   → RUN-JAME-PROJECT-CONSOLE-ROADMAP-V3-PROTOTYPE-001 (migra)
       → RUN-JAME-ROADMAP-MAINTENANCE-HELPER-001 (queda)
           → RUN-CANTU-PROJECT-CONSOLE-ROADMAP-EDITING-001 (migra)
```

La cadena de fundación de la consola cruzaría la frontera de repo **tres veces**. La
cuarta arista es O2→O2 y parte O2 por dentro.

### 4.3 La variante literal (4 runs), por completitud

Frontera {4 runs literales} vs {61}: **2 aristas**.

| # | Dependiente | Lado | → prerequisito | Lado | Línea |
|---:|---|---|---|---|---:|
| 1 | `RUN-CANTU-PROJECT-CONSOLE-ROADMAP-EDITING-001` | migra | `RUN-JAME-ROADMAP-MAINTENANCE-HELPER-001` | queda | `:180` |
| 2 | `RUN-JAME-PROJECT-CONSOLE-DOCS-V3-001` | migra | `RUN-JAME-DOCUMENTATION-CANONICAL-MODEL-001` | queda | `:387` |

---

## 5. Comparativa directa — el dato que decide

```
Migrar O0 completo (17 runs) ..........  8 aristas rotas
Migrar solo los 6 por patrón ..........  4 aristas rotas
  (variante literal de D-034, 4 runs) .  2 aristas rotas
```

### 5.1 Desglose

| | O0 completo (17) | Subconjunto (6) |
|---|---:|---:|
| Aristas totales cruzando la frontera | **8** | **4** |
| …de las cuales parten un objetivo por dentro | 0 | **4** (3 en O0, 1 en O2) |
| …de las cuales van entre objetivos distintos | 8 | 0 |
| Objetivos que quedan partidos entre dos repos | **0** | **2** (O0 y O2) |
| Runs concentrando las aristas de salida | 5 (bloque rename) | — |

### 5.2 Lectura — el número solo no decide

El escenario-6 gana en conteo bruto (4 < 8) y **pierde en toda otra dimensión medida**:

- **O0 completo deja 0 objetivos partidos.** El escenario-6 deja **2**. Es exactamente la
  incoherencia que el handoff anticipó (`:123-125`) —y la medición confirma que es peor de
  lo previsto, porque el objetivo partido no es uno sino dos.
- **Las 8 aristas del escenario-O0 no son homogéneas.** 7 de las 8 nacen del bloque de
  rename (`queue_order` 17, 62–65) y 5 de esas 7 apuntan al mismo run
  (`RUN-CANTU-NAMING-AUDIT-DISPOSITION-001`, O2, `:365`). La octava es la arista entrante,
  y apunta a un run **ya `completed`**, o sea histórica.
- **Consecuencia aritmética directa, no una propuesta:** si los 5 runs de rename se
  excluyeran de la migración, el escenario "O0 menos rename" (12 runs) dejaría **1** sola
  arista cruzada —la entrante e histórica del punto 3— frente a las 4 del escenario-6. La
  medición lo reporta como hecho aritmético derivado de los datos; **si conviene o no
  excluirlos es decisión del operador, no de esta medición.** Nótese que esos 5 runs son
  renames del repo `cantu-studio` (`REPO-RENAME`, `INTERNAL-CODE-RENAME`,
  `DOCS-DIRECTORY-RENAME`, `RUNTIME-JAME-CLASS-RENAME`, `RUNTIME-J-NAMESPACE-RENAME`), no
  trabajo de la consola; su pertenencia a O0 es en sí un dato a revisar. Que "deberían" o
  no estar en O0 es **[NO VERIFICADO]** — el roadmap no declara criterio de pertenencia.

### 5.3 Lo que la medición NO puede decidir

El coste de una arista rota depende de qué mecanismo se elija para representar
dependencias entre repos en el contrato de la carpeta —campo `depends_on` con id
cualificado, campo nuevo, o simplemente romperla y documentarla. Ese mecanismo **no existe
todavía en disco**: `depends_on` es hoy un array de `run_id` desnudos del mismo roadmap
(`MEDICION-ROADMAP-V3.md:264,325`). Por tanto **8 vs 4 son conteos comparables entre sí,
pero no traducibles a coste** hasta que el contrato defina la arista cruzada.
**[NO VERIFICADO]** cualquier afirmación sobre ese coste.

---

## 6. `depends_on` colgantes o vacíos

Barrido de los 65 runs. [VERIFICADO EN DISCO]

| Condición | Conteo |
|---|---:|
| Runs con clave `depends_on` **ausente** | **0** / 65 |
| Runs con `depends_on` que **no es array** | **0** / 65 |
| Referencias **colgantes** (`run_id` citado que no existe) | **0** |
| Auto-referencias (`run_id` que se cita a sí mismo) | **0** |
| Dependencias duplicadas dentro de un mismo array | **0** |
| Runs con `depends_on` **vacío** (`[]`) | **17** / 65 |
| Runs con al menos una dependencia | 48 / 65 |

Coincide con lo ya medido en `MEDICION-ROADMAP-V3.md:323-325`. **El grafo está íntegro:
no hay nada colgante que reparar antes de migrar.**

### 6.1 Los 17 con `depends_on: []`

| `queue_order` | `run_id` | Objetivo | Línea |
|---:|---|---|---:|
| 1 | `RUN-JAME-PROJECT-CONSOLE-FOUNDATION-001` | **O0** | `:15` |
| 2 | `RUN-JAME-ROADMAP-V3-DESIGN-001` | **O0** | `:31` |
| 3 | `RUN-JAME-SMART-FORMULA-FIELD-RULE-ONLY-BASELINE-001` | O5 | `:452` |
| 5 | `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001` | **O0** | `:152` |
| 8 | `RUN-CANTU-DEV-LAUNCHERS-001` | **O0** | `:185` |
| 9 | `RUN-CANTU-ROADMAP-EDITOR-USABILITY-001` | **O0** | `:195` |
| 10 | `RUN-CANTU-ROADMAP-CLOSE-ACTIVE-RUN-001` | **O0** | `:205` |
| 11 | `RUN-CANTU-PROJECT-CONSOLE-LATENT-DEFECTS-001` | **O0** | `:214` |
| 12 | `RUN-CANTU-ROADMAP-PHASE-OBJECTIVE-OPS-001` | **O0** | `:223` |
| 13 | `RUN-JAME-DOCUMENTATION-CANONICAL-MODEL-001` | O2 | `:328` |
| 16 | `RUN-CANTU-NAMING-AUDIT-DISPOSITION-001` | O2 | `:365` |
| 18 | `RUN-JAME-COLOR-PALETTE-COMPATIBILITY-CONTRACT-001` | O5 | `:403` |
| 22 | `RUN-JAME-WEB-COMPONENT-BASELINE-RECONCILIATION-001` | O1 | `:518` |
| 41 | `RUN-JAME-MATHLIVE-INTEGRATION-READINESS-001` | O5 | `:479` |
| 43 | `RUN-CANTU-SLIDE-GRID-SYSTEM-001` | O3 | `:828` |
| 60 | `RUN-CANTU-DOCUMENTATION-DEEP-AUDIT-001` | O2 | `:313` |
| 61 | `RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001` | **O0** | `:243` |

**8 de los 17 raíces del grafo están en O0** (casi la mitad, contra 17/65 = 26 % de los
runs). O0 es donde el roadmap arranca; consistente con que sea el objetivo fundacional.

---

## 7. Tabla de remap de `queue_order`

### 7.0 Criterio propuesto

**Denso desde 1, preservando el orden relativo del `queue_order` global actual.** Es decir:
se ordenan los runs de cada lado por su `queue_order` de origen ascendente y se les asigna
1..n sin huecos. Justificación en disco: el `queue_order` actual es una secuencia global
**densa 1..65, única y contigua** (`MEDICION-ROADMAP-V3.md:321-322`; reverificado aquí:
min 1, max 65, 65 valores únicos, contigua ✓). Cualquier otro criterio o rompe la densidad
—que es la única propiedad que el dato exhibe hoy— o reordena trabajo ya secuenciado.
**El criterio es una propuesta; ratificarlo es del operador.**

`run_id` no se toca: es identidad inmutable (D-034, `DECISIONES.md:372`).

---

### 7.A ESCENARIO O0 COMPLETO — 17 migran, 48 se quedan (17 + 48 = **65** ✓)

#### 7.A.1 Migran a `aiw-console` — numeración nueva 1..17

| Nuevo `queue_order` | Antiguo | `run_id` | Objetivo origen |
|---:|---:|---|---|
| 1 | 1 | `RUN-JAME-PROJECT-CONSOLE-FOUNDATION-001` | O0 |
| 2 | 2 | `RUN-JAME-ROADMAP-V3-DESIGN-001` | O0 |
| 3 | 4 | `RUN-JAME-PROJECT-CONSOLE-ROADMAP-V3-PROTOTYPE-001` | O0 |
| 4 | 5 | `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001` | O0 |
| 5 | 6 | `RUN-JAME-ROADMAP-MAINTENANCE-HELPER-001` | O0 |
| 6 | 7 | `RUN-CANTU-PROJECT-CONSOLE-ROADMAP-EDITING-001` | O0 |
| 7 | 8 | `RUN-CANTU-DEV-LAUNCHERS-001` | O0 |
| 8 | 9 | `RUN-CANTU-ROADMAP-EDITOR-USABILITY-001` | O0 |
| 9 | 10 | `RUN-CANTU-ROADMAP-CLOSE-ACTIVE-RUN-001` | O0 |
| 10 | 11 | `RUN-CANTU-PROJECT-CONSOLE-LATENT-DEFECTS-001` | O0 |
| 11 | 12 | `RUN-CANTU-ROADMAP-PHASE-OBJECTIVE-OPS-001` | O0 |
| 12 | 17 | `RUN-CANTU-REPO-RENAME-001` | O0 |
| 13 | 61 | `RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001` | O0 |
| 14 | 62 | `RUN-CANTU-INTERNAL-CODE-RENAME-001` | O0 |
| 15 | 63 | `RUN-CANTU-DOCS-DIRECTORY-RENAME-001` | O0 |
| 16 | 64 | `RUN-CANTU-RUNTIME-JAME-CLASS-RENAME-001` | O0 |
| 17 | 65 | `RUN-CANTU-RUNTIME-J-NAMESPACE-RENAME-001` | O0 |

#### 7.A.2 Se quedan en Cantu — renumerados 1..48

| Nuevo | Antiguo | `run_id` | Obj. |
|---:|---:|---|---|
| 1 | 3 | `RUN-JAME-SMART-FORMULA-FIELD-RULE-ONLY-BASELINE-001` | O5 |
| 2 | 13 | `RUN-JAME-DOCUMENTATION-CANONICAL-MODEL-001` | O2 |
| 3 | 14 | `RUN-JAME-COMPONENT-DOC-SINGLE-SOURCE-CONTRACT-001` | O2 |
| 4 | 15 | `RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` | O2 |
| 5 | 16 | `RUN-CANTU-NAMING-AUDIT-DISPOSITION-001` | O2 |
| 6 | 18 | `RUN-JAME-COLOR-PALETTE-COMPATIBILITY-CONTRACT-001` | O5 |
| 7 | 19 | `RUN-JAME-MATH-FORMULA-COMPATIBILITY-CONTRACT-001` | O5 |
| 8 | 20 | `RUN-JAME-WEB-COMPONENT-CONTRACT-STANDARDIZATION-001` | O5 |
| 9 | 21 | `RUN-JAME-VIRTUAL-KEYBOARD-KATEX-COMPATIBILITY-001` | O5 |
| 10 | 22 | `RUN-JAME-WEB-COMPONENT-BASELINE-RECONCILIATION-001` | O1 |
| 11 | 23 | `RUN-JAME-WEB-COLUMNS-REVALIDATION-001` | O1 |
| 12 | 24 | `RUN-JAME-WEB-HEADER-REVALIDATION-001` | O1 |
| 13 | 25 | `RUN-JAME-WEB-LIST-REVALIDATION-001` | O1 |
| 14 | 26 | `RUN-JAME-WEB-ICONLIST-REVALIDATION-001` | O1 |
| 15 | 27 | `RUN-JAME-WEB-CARD-REVALIDATION-001` | O1 |
| 16 | 28 | `RUN-JAME-WEB-VIDEO-REVALIDATION-001` | O1 |
| 17 | 29 | `RUN-JAME-WEB-NARRATIVE-REPAIR-001` | O1 |
| 18 | 30 | `RUN-JAME-WEB-CALLOUT-REPAIR-001` | O1 |
| 19 | 31 | `RUN-JAME-WEB-DETAILS-REPAIR-001` | O1 |
| 20 | 32 | `RUN-JAME-WEB-ARITHMETIC-AUDIT-AND-REPAIR-001` | O1 |
| 21 | 33 | `RUN-JAME-RULE-COMPONENT-REPAIR-AND-ACTIVATION-001` | O1 |
| 22 | 34 | `RUN-JAME-WEB-SPLIT-SCOPE-AND-REPAIR-001` | O1 |
| 23 | 35 | `RUN-JAME-WEB-TABLE-AUDIT-AND-REPAIR-001` | O1 |
| 24 | 36 | `RUN-JAME-WEB-CONCEPTGRID-AUDIT-AND-REPAIR-001` | O1 |
| 25 | 37 | `RUN-JAME-WEB-HIERARCHY-AUDIT-AND-REPAIR-001` | O1 |
| 26 | 38 | `RUN-JAME-WEB-TIMELINE-AUDIT-AND-REPAIR-001` | O1 |
| 27 | 39 | `RUN-JAME-WEB-VISUAL-AUDIT-AND-REPAIR-001` | O1 |
| 28 | 40 | `RUN-JAME-WEB-READINESS-EVIDENCE-001` | O1 |
| 29 | 41 | `RUN-JAME-MATHLIVE-INTEGRATION-READINESS-001` | O5 |
| 30 | 42 | `RUN-JAME-FORMULA-INSERTER-INTEGRATION-001` | O5 |
| 31 | 43 | `RUN-CANTU-SLIDE-GRID-SYSTEM-001` | O3 |
| 32 | 44 | `RUN-JAME-SLIDE-ARCHITECTURE-BASELINE-001` | O3 |
| 33 | 45 | `RUN-JAME-SLIDE-SANDBOX-PARITY-001` | O3 |
| 34 | 46 | `RUN-CANTU-SLIDE-COMPONENT-GUIDE-001` | O3 |
| 35 | 47 | `RUN-JAME-SLIDE-BOUNDED-RUN-PLAN-001` | O3 |
| 36 | 48 | `RUN-JAME-SLIDE-FIRST-BOUNDED-COMPONENT-BATCH-001` | O3 |
| 37 | 49 | `RUN-JAME-SLIDE-READINESS-EVIDENCE-001` | O3 |
| 38 | 50 | `RUN-JAME-AUTHORING-WORKSPACE-UX-AUDIT-001` | O4 |
| 39 | 51 | `RUN-JAME-HTML-PAYLOAD-MEASUREMENT-001` | O6 |
| 40 | 52 | `RUN-JAME-ASSET-REGISTRY-DESIGN-001` | O6 |
| 41 | 53 | `RUN-JAME-CTX-ASSETS-CONTRACT-001` | O6 |
| 42 | 54 | `RUN-JAME-RENDERER-ASSET-INTEGRATION-001` | O6 |
| 43 | 55 | `RUN-JAME-ASSET-DEDUP-EQUIVALENCE-VALIDATION-001` | O6 |
| 44 | 56 | `RUN-JAME-PRODUCTION-LESSON-VALIDATION-001` | O7 |
| 45 | 57 | `RUN-JAME-PRODUCTION-EXPORT-FLOW-001` | O7 |
| 46 | 58 | `RUN-JAME-HOSTING-DEPLOYMENT-PLAN-001` | O7 |
| 47 | 59 | `RUN-JAME-PROJECT-CONSOLE-DOCS-V3-001` | O2 |
| 48 | 60 | `RUN-CANTU-DOCUMENTATION-DEEP-AUDIT-001` | O2 |

**Suma: 17 + 48 = 65 ✓.** Ningún run omitido; ningún run en las dos tablas.

**Efecto colateral medible:** con O0 fuera, Cantu pierde su `queue_order` 1 y 2 y arranca
en lo que hoy es el 3. Los cuatro huecos que el handoff anticipa (`:127-128`) —tras 2,
tras 12, en 17, y de 61 a 65— se cierran solos con la renumeración densa. También: el
único run `active` del roadmap (`queue_order` 11) **se va con O0**, dejando a Cantu sin
ningún run `active`. [VERIFICADO EN DISCO]

---

### 7.B ESCENARIO SUBCONJUNTO DE 6 — 6 migran, 59 se quedan (6 + 59 = **65** ✓)

#### 7.B.1 Migran — numeración nueva 1..6

| Nuevo | Antiguo | `run_id` | Obj. origen |
|---:|---:|---|---|
| 1 | 1 | `RUN-JAME-PROJECT-CONSOLE-FOUNDATION-001` | O0 |
| 2 | 4 | `RUN-JAME-PROJECT-CONSOLE-ROADMAP-V3-PROTOTYPE-001` | O0 |
| 3 | 7 | `RUN-CANTU-PROJECT-CONSOLE-ROADMAP-EDITING-001` | O0 |
| 4 | 11 | `RUN-CANTU-PROJECT-CONSOLE-LATENT-DEFECTS-001` | O0 |
| 5 | 59 | `RUN-JAME-PROJECT-CONSOLE-DOCS-V3-001` | **O2** |
| 6 | 61 | `RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001` | O0 |

#### 7.B.2 Se quedan — renumerados 1..59

| Nuevo | Antiguo | `run_id` | Obj. |
|---:|---:|---|---|
| 1 | 2 | `RUN-JAME-ROADMAP-V3-DESIGN-001` | **O0** |
| 2 | 3 | `RUN-JAME-SMART-FORMULA-FIELD-RULE-ONLY-BASELINE-001` | O5 |
| 3 | 5 | `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001` | **O0** |
| 4 | 6 | `RUN-JAME-ROADMAP-MAINTENANCE-HELPER-001` | **O0** |
| 5 | 8 | `RUN-CANTU-DEV-LAUNCHERS-001` | **O0** |
| 6 | 9 | `RUN-CANTU-ROADMAP-EDITOR-USABILITY-001` | **O0** |
| 7 | 10 | `RUN-CANTU-ROADMAP-CLOSE-ACTIVE-RUN-001` | **O0** |
| 8 | 12 | `RUN-CANTU-ROADMAP-PHASE-OBJECTIVE-OPS-001` | **O0** |
| 9 | 13 | `RUN-JAME-DOCUMENTATION-CANONICAL-MODEL-001` | O2 |
| 10 | 14 | `RUN-JAME-COMPONENT-DOC-SINGLE-SOURCE-CONTRACT-001` | O2 |
| 11 | 15 | `RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` | O2 |
| 12 | 16 | `RUN-CANTU-NAMING-AUDIT-DISPOSITION-001` | O2 |
| 13 | 17 | `RUN-CANTU-REPO-RENAME-001` | **O0** |
| 14 | 18 | `RUN-JAME-COLOR-PALETTE-COMPATIBILITY-CONTRACT-001` | O5 |
| 15 | 19 | `RUN-JAME-MATH-FORMULA-COMPATIBILITY-CONTRACT-001` | O5 |
| 16 | 20 | `RUN-JAME-WEB-COMPONENT-CONTRACT-STANDARDIZATION-001` | O5 |
| 17 | 21 | `RUN-JAME-VIRTUAL-KEYBOARD-KATEX-COMPATIBILITY-001` | O5 |
| 18 | 22 | `RUN-JAME-WEB-COMPONENT-BASELINE-RECONCILIATION-001` | O1 |
| 19 | 23 | `RUN-JAME-WEB-COLUMNS-REVALIDATION-001` | O1 |
| 20 | 24 | `RUN-JAME-WEB-HEADER-REVALIDATION-001` | O1 |
| 21 | 25 | `RUN-JAME-WEB-LIST-REVALIDATION-001` | O1 |
| 22 | 26 | `RUN-JAME-WEB-ICONLIST-REVALIDATION-001` | O1 |
| 23 | 27 | `RUN-JAME-WEB-CARD-REVALIDATION-001` | O1 |
| 24 | 28 | `RUN-JAME-WEB-VIDEO-REVALIDATION-001` | O1 |
| 25 | 29 | `RUN-JAME-WEB-NARRATIVE-REPAIR-001` | O1 |
| 26 | 30 | `RUN-JAME-WEB-CALLOUT-REPAIR-001` | O1 |
| 27 | 31 | `RUN-JAME-WEB-DETAILS-REPAIR-001` | O1 |
| 28 | 32 | `RUN-JAME-WEB-ARITHMETIC-AUDIT-AND-REPAIR-001` | O1 |
| 29 | 33 | `RUN-JAME-RULE-COMPONENT-REPAIR-AND-ACTIVATION-001` | O1 |
| 30 | 34 | `RUN-JAME-WEB-SPLIT-SCOPE-AND-REPAIR-001` | O1 |
| 31 | 35 | `RUN-JAME-WEB-TABLE-AUDIT-AND-REPAIR-001` | O1 |
| 32 | 36 | `RUN-JAME-WEB-CONCEPTGRID-AUDIT-AND-REPAIR-001` | O1 |
| 33 | 37 | `RUN-JAME-WEB-HIERARCHY-AUDIT-AND-REPAIR-001` | O1 |
| 34 | 38 | `RUN-JAME-WEB-TIMELINE-AUDIT-AND-REPAIR-001` | O1 |
| 35 | 39 | `RUN-JAME-WEB-VISUAL-AUDIT-AND-REPAIR-001` | O1 |
| 36 | 40 | `RUN-JAME-WEB-READINESS-EVIDENCE-001` | O1 |
| 37 | 41 | `RUN-JAME-MATHLIVE-INTEGRATION-READINESS-001` | O5 |
| 38 | 42 | `RUN-JAME-FORMULA-INSERTER-INTEGRATION-001` | O5 |
| 39 | 43 | `RUN-CANTU-SLIDE-GRID-SYSTEM-001` | O3 |
| 40 | 44 | `RUN-JAME-SLIDE-ARCHITECTURE-BASELINE-001` | O3 |
| 41 | 45 | `RUN-JAME-SLIDE-SANDBOX-PARITY-001` | O3 |
| 42 | 46 | `RUN-CANTU-SLIDE-COMPONENT-GUIDE-001` | O3 |
| 43 | 47 | `RUN-JAME-SLIDE-BOUNDED-RUN-PLAN-001` | O3 |
| 44 | 48 | `RUN-JAME-SLIDE-FIRST-BOUNDED-COMPONENT-BATCH-001` | O3 |
| 45 | 49 | `RUN-JAME-SLIDE-READINESS-EVIDENCE-001` | O3 |
| 46 | 50 | `RUN-JAME-AUTHORING-WORKSPACE-UX-AUDIT-001` | O4 |
| 47 | 51 | `RUN-JAME-HTML-PAYLOAD-MEASUREMENT-001` | O6 |
| 48 | 52 | `RUN-JAME-ASSET-REGISTRY-DESIGN-001` | O6 |
| 49 | 53 | `RUN-JAME-CTX-ASSETS-CONTRACT-001` | O6 |
| 50 | 54 | `RUN-JAME-RENDERER-ASSET-INTEGRATION-001` | O6 |
| 51 | 55 | `RUN-JAME-ASSET-DEDUP-EQUIVALENCE-VALIDATION-001` | O6 |
| 52 | 56 | `RUN-JAME-PRODUCTION-LESSON-VALIDATION-001` | O7 |
| 53 | 57 | `RUN-JAME-PRODUCTION-EXPORT-FLOW-001` | O7 |
| 54 | 58 | `RUN-JAME-HOSTING-DEPLOYMENT-PLAN-001` | O7 |
| 55 | 60 | `RUN-CANTU-DOCUMENTATION-DEEP-AUDIT-001` | O2 |
| 56 | 62 | `RUN-CANTU-INTERNAL-CODE-RENAME-001` | **O0** |
| 57 | 63 | `RUN-CANTU-DOCS-DIRECTORY-RENAME-001` | **O0** |
| 58 | 64 | `RUN-CANTU-RUNTIME-JAME-CLASS-RENAME-001` | **O0** |
| 59 | 65 | `RUN-CANTU-RUNTIME-J-NAMESPACE-RENAME-001` | **O0** |

**Suma: 6 + 59 = 65 ✓.** Las 11 filas marcadas **O0** en 7.B.2 son el objetivo partido:
O0 seguiría existiendo en Cantu con 11 runs y también en `aiw-console` con 5, más el
sexto que sale de O2.

---

## Nota de alcance

- No se leyó ni midió el emisor, ni los snapshots, ni `roadmap_v2.json` /
  `roadmap_v2_normalized_proposal.json` / `legacy_run_disposition_map_v2.json` (presentes
  en el mismo directorio, fuera del encargo). Cualquier afirmación sobre ellos sería
  **[NO VERIFICADO]** y por eso no se hace.
- No se propone alcance ni se ejecuta migración: **el punto 5 entrega 8 vs 4 y el operador
  decide.** Las observaciones de 5.2 son consecuencias aritméticas de los datos medidos,
  no recomendaciones.
- El coste real de una arista rota queda **[NO VERIFICADO]**: depende del mecanismo de
  dependencia entre repos, que el contrato aún no define (ver 5.3).
- La cifra "6 runs" del handoff se confirma como *cardinalidad*, pero su derivación desde
  el texto de D-034 **no se sostiene** (punto 4.1). Es un hecho medido, no una opinión.
