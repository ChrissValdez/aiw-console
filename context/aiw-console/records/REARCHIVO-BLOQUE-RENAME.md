# RE-ARCHIVO — El bloque de rename sale de O0 y entra en O2

**Fecha:** 2026-07-23
**Naturaleza:** verificación + edición acotada de `roadmap.json`. Se editó **un solo
archivo**: `projects/cantu-studio/.aiw/roadmap/roadmap.json`, y solo la pertenencia
objetivo/fase de 5 runs. No se editó `CONTRATO.md`, ni `DECISIONES.md`, ni ningún record
existente. No se ejecutó git en ninguna forma. No se tocó nada más bajo `.aiw/`.
**Insumo previo:** `context/aiw-console/records/MEDICION-GRAFO-O0.md` (punto 5.2).

**Archivos tocados:**

| Ruta | Modo |
|---|---|
| `projects/cantu-studio/.aiw/roadmap/roadmap.json` | **escritura** (pertenencia de 5 runs) |
| `tools/project-console/validate-project-console-state.mjs` | lectura |
| `docs/project-console/assets/project-console.js` | lectura |
| `tools/project-console/build-git-history-snapshot.mjs` | lectura |
| este record | creación |

**Método.** Parseo del JSON completo antes y después; comparación run-a-run entre ambos
estados por `run_id`; recorrido exhaustivo `objectives[] → phases[] → runs[]`. Toda cifra
de abajo sale de ese recorrido sobre el **archivo ya editado**. [VERIFICADO EN DISCO]

**Formato de serialización preservado.** Se comprobó en disco que el archivo original es
byte-idéntico a `JSON.stringify(parse(raw), null, 2)` con finales de línea CRLF y salto
final: la reserialización es idempotente, de modo que el único cambio textual es el
movimiento de los 5 runs. [VERIFICADO EN DISCO]

---

## 1. Puerta de paro 1 — verificación previa: **PASA**

Se leyeron `title`, `summary` y `full_description` de los cinco. Criterio: se confirma el
mal archivado si los cinco describen trabajo sobre el repo, el código, los docs o el
runtime de `cantu-studio`, y ninguno describe trabajo de consola.

| `queue_order` | `run_id` | Qué describe realmente | Objeto del trabajo |
|---:|---|---|---|
| 17 | `RUN-CANTU-REPO-RENAME-001` | «Rename the repository folder from its legacy name to the current Cantu Studio name, following the frozen disposition map.» Toca una etiqueta cosmética del árbol de ficheros, una cadena de error del launcher y prosa. | **Repo** de `cantu-studio` |
| 62 | `RUN-CANTU-INTERNAL-CODE-RENAME-001` | «Rename the internal code directories carrying legacy names, primarily `tools/author-lite` and `src/content/author_lite`, and update every inbound path reference.» | **Código** de `cantu-studio` |
| 63 | `RUN-CANTU-DOCS-DIRECTORY-RENAME-001` | «Rename the live documentation directories carrying legacy names, primarily `docs/author-lite` and `docs/jame-core`… sweep renamable prose.» | **Docs** de `cantu-studio` |
| 64 | `RUN-CANTU-RUNTIME-JAME-CLASS-RENAME-001` | «Rename the `jame`-prefixed runtime identifiers that belong to the Editor UI… seven `jame-smart-formula` CSS classes and the `data-jame-active-layout` attribute.» | **Runtime** de `cantu-studio` |
| 65 | `RUN-CANTU-RUNTIME-J-NAMESPACE-RENAME-001` | «Rename the `j`-prefixed render namespace emitted by the Core builders… las 334 clases `j-` y el id `j-infinity-root`.» | **Runtime** (Core) de `cantu-studio` |

**Los cinco caen dentro del criterio. Ninguno describe trabajo de consola. El mal archivado
queda confirmado.** [VERIFICADO EN DISCO]

### 1.1 La única mención de consola, y por qué no rompe el criterio

`RUN-CANTU-REPO-RENAME-001` menciona la consola una vez, y para **excluirla**: dice que el
nombre de rama «is also matched by literal string in two executable console files» y que
por eso el rename de rama y de remoto quedan **fuera** de este run, como operaciones
separadas y coordinadas aparte. Es una frontera declarada, no trabajo de consola dentro del
run. Análogamente, `RUN-CANTU-INTERNAL-CODE-RENAME-001` menciona el launcher: pero lo
menciona como *sitio de referencia entrante* que el rename debe actualizar, no como
producto a construir. **Ninguna de las dos menciones convierte al run en trabajo de
consola.**

### 1.2 Corroboración estructural independiente

El prerequisito común de los cinco, `RUN-CANTU-NAMING-AUDIT-DISPOSITION-001` (O2), dice
literalmente: «Nothing is renamed by this run; it converts the read-only map into an
approved decision so **the execution runs** have a single authority for what is identity
and what is renamable.» El roadmap ya nombra a los cinco como *the execution runs* de un
contrato que vive en **O2**. Su pertenencia a O0 —«Project Console»— no tiene ningún
apoyo en el texto de los propios runs.

---

## 2. Puerta de paro 2 — barrido de anchors: **PASA**

Búsqueda de los cinco `run_id` en los tres archivos indicados. Read-only.

| Archivo | Líneas | Ocurrencias de los 5 `run_id` |
|---|---:|---:|
| `tools/project-console/validate-project-console-state.mjs` | 2044 | **0** |
| `docs/project-console/assets/project-console.js` | 5631 | **0** |
| `tools/project-console/build-git-history-snapshot.mjs` | 236 | **0** |

**Barrido ampliado por prudencia** (no exigido por el encargo): la misma búsqueda sobre los
árboles completos `tools/` y `docs/` de `cantu-studio` devuelve **0 ocurrencias**. Ningún
anchor de consola nombra a estos runs por id. **Mover el bloque no cambia el comportamiento
de la consola.** [VERIFICADO EN DISCO]

### 2.1 Lectura complementaria del validador (read-only, no se ejecutó)

Se leyó `validate-project-console-state.mjs:955-1058` para no romper una regla por
descuido. Lo que el validador exige del roadmap v3, y su estado tras la edición:

| Regla del validador | Cita | Estado |
|---|---|---|
| `schema_version` exacto `jame.roadmap_v3.v0.2-progress` | `:963` | intacto ✓ |
| Claves de raíz exactamente `schema_version, roadmap_id, title, objectives` | `:955-961` | intacto ✓ |
| `phase_id` único en todo el roadmap | `:993` | 31 fases, 0 duplicados ✓ |
| Claves de fase exactamente `phase_id, title, runs` | `:995-1002` | la fase nueva las lleva y ninguna otra ✓ |
| `run_id` único | `:1005` | 65 runs, 0 duplicados ✓ |
| Dependencia con `queue_order` **estrictamente menor** | `:1045-1046` | 0 violaciones ✓ |
| `queue_order` único y contiguo 1..n | `:1050-1057` | 65 valores, denso 1..65 ✓ |

El validador **no impone** formato de `phase_id`, ni orden del array de fases, ni criterio
de pertenencia de un run a un objetivo. Crear una fase nueva es una operación que el modelo
admite. **No se ejecutó el validador** (fuera de alcance); esto es lectura de su código, no
un resultado de ejecución.

---

## 3. La edición

**Movidos 5 runs de `O0.P3` a una fase nueva `O2.P5`.**

### 3.1 Por qué una fase nueva y no la fase del prerequisito

El encargo manda medir la fase donde vive `RUN-CANTU-NAMING-AUDIT-DISPOSITION-001`. Medido:
vive en **`O2.P4` — «Operating Methodology and Ordering Source»**, junto a
`RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` (`queue_order` 15). [VERIFICADO EN DISCO]

`O2.P4` **no es un destino coherente**, y la razón está escrita en el roadmap, no inferida:

1. **Los dos runs de `O2.P4` son de decisión y metodología, no de ejecución.** El 15
   actualiza `AGENTS.md`, `generate_prompt_context.js` y `NEXT_STEPS` para nombrar el
   roadmap como fuente de ordenamiento. El 16 congela un mapa. El título de la fase
   —«Operating Methodology and Ordering Source»— describe exactamente eso.
2. **El propio run 16 traza la frontera.** «**Nothing is renamed by this run**; it converts
   the read-only map into an approved decision so **the execution runs** have a single
   authority.» El roadmap ya separa *este run* (decisión) de *los runs de ejecución* (los
   cinco). Fusionarlos en una fase borraría una distinción que el dato ya hace.
3. **El precedente interno de O2 es una fase por función, no una fase por dependencia.**
   O2 ya separa auditoría (`P1`), modelo canónico (`P2`), metodología (`P4`) y proyección en
   consola (`P3`). Meter la ejecución del rename en `P4` sería la única fase de O2 que
   mezcla dos funciones.

Por eso: **fase nueva `O2.P5`, título «Naming Rename Execution»**, dentro del mismo objetivo
O2 al que apunta el prerequisito. La arista 16 → {17, 62, 63, 64, 65} pasa a ser
**intra-objetivo** (`O2.P4 → O2.P5`), que es la forma que el roadmap ya usa para
decisión-luego-ejecución.

**`phase_id` elegido:** `O2.P5`. Los ids existentes en O2 son `P1, P2, P3, P4`; `P5` es el
siguiente libre y no colisiona con ningún `phase_id` del roadmap.

**Posición en el array:** al final del array de fases de O2. El array de O2 **no estaba
ordenado por id** antes de la edición (orden en disco: `P1, P2, P4, P3`), así que no existe
un orden que preservar; añadir al final es la única colocación que **no reordena ninguna
fase existente**. Orden final: `P1, P2, P4, P3, P5`.

**Orden de los 5 dentro de `O2.P5`:** por `queue_order` ascendente — 17, 62, 63, 64, 65 —
que es exactamente el orden relativo que ya tenían dentro de `O0.P3`. No se reordena nada.

### 3.2 Diff conceptual

```
O0 "Project Console"                        17 runs  →  12 runs
  O0.P1 Project Console Foundation            1  →   1
  O0.P2 Roadmap v3 Prototype                  2  →   2
  O0.P3 Roadmap Maintenance, Console…        14  →   9   (−5)

O2 "…Knowledge Base and Documentation SoT"    6 runs  →  11 runs
  O2.P1 Deep Documentation Audit              1  →   1
  O2.P2 Canonical Documentation Model…        2  →   2
  O2.P4 Operating Methodology and Ordering…   2  →   2   (el prerequisito, intacto)
  O2.P3 Docs Console Projection               1  →   1
  O2.P5 Naming Rename Execution           (nueva)  →   5   (+5)
```

Los 5 que se mueven, con su identidad completa intacta:

| `queue_order` | `run_id` | Antes | Después | `status` | `depends_on` |
|---:|---|---|---|---|---|
| 17 | `RUN-CANTU-REPO-RENAME-001` | O0.P3 | **O2.P5** | planned | 1 dep, sin cambios |
| 62 | `RUN-CANTU-INTERNAL-CODE-RENAME-001` | O0.P3 | **O2.P5** | planned | 3 deps, sin cambios |
| 63 | `RUN-CANTU-DOCS-DIRECTORY-RENAME-001` | O0.P3 | **O2.P5** | planned | 2 deps, sin cambios |
| 64 | `RUN-CANTU-RUNTIME-JAME-CLASS-RENAME-001` | O0.P3 | **O2.P5** | planned | 2 deps, sin cambios |
| 65 | `RUN-CANTU-RUNTIME-J-NAMESPACE-RENAME-001` | O0.P3 | **O2.P5** | planned | 2 deps, sin cambios |

### 3.3 Los cinco invariantes, uno por uno

Verificados por comparación run-a-run entre el estado previo y el editado, indexando por
`run_id` sobre los 65 runs de cada lado. [VERIFICADO EN DISCO]

| # | Invariante | Medición | Resultado |
|---:|---|---|---|
| 1 | **`run_id` de nadie** (identidad inmutable, D-034) | `run_id` ausentes respecto al estado previo: **0**. `run_id` nuevos: **0**. Conjunto idéntico de 65 ids. | ✓ intacto |
| 2 | **`queue_order` de nadie** | Runs cuyo `queue_order` difiere del previo: **0 / 65**. | ✓ intacto |
| 3 | **`depends_on` de nadie** | Runs cuyo array `depends_on` difiere del previo (comparación exacta, orden incluido): **0 / 65**. | ✓ intacto |
| 4 | **`schema_version` de la raíz** | Valor tras la edición: `"jame.roadmap_v3.v0.2-progress"`, idéntico al previo. Exigido exacto por `CANTU-VALID:963`. | ✓ intacto |
| 5 | **`status` de nadie** | Runs cuyo `status` difiere del previo: **0 / 65**. | ✓ intacto |

**Control adicional, más fuerte que los cinco por separado:** comparando cada run completo
—todos sus campos— entre el estado previo y el editado, los runs con **cualquier** campo
distinto son **0 / 65**. Los objetos de run son byte-idénticos; lo único que cambió es de
qué array `runs[]` cuelgan. [VERIFICADO EN DISCO]

---

## 4. Verificación posterior — recuento sobre el archivo editado

Todas las cifras son **medidas**, no esperadas. [VERIFICADO EN DISCO]

| Comprobación | Esperado por el encargo | **Medido** | |
|---|---|---|---|
| Objetivos | 8 | **8** | ✓ |
| Runs totales | 65 | **65** | ✓ |
| Fases totales | — | **31** (30 + la nueva) | — |
| Runs en O0 | 17 → 12 | **12** | ✓ |
| Runs en O2 | 6 → 11 | **11** | ✓ |
| `depends_on` colgantes | 0 | **0** | ✓ |
| `depends_on` ausentes (clave que falta) | 0 | **0** | ✓ |
| `depends_on` que no es array | 0 | **0** | ✓ |
| Auto-referencias | 0 | **0** | ✓ |
| Dependencias duplicadas dentro de un array | 0 | **0** | ✓ |
| `run_id` duplicados | 0 | **0** | ✓ |
| `queue_order`: n / min / max / únicos | 65 / 1 / 65 / 65 | **65 / 1 / 65 / 65** | ✓ |
| `queue_order` denso y contiguo 1..65 | sí | **sí** | ✓ |
| `phase_id` duplicados | 0 | **0** | ✓ |
| El JSON parsea | sí | **sí** | ✓ |

**Los cinco `run_id`, ocurrencias exactas:**

| `run_id` | Ocurrencias | Ubicación | `queue_order` | `status` |
|---|---:|---|---:|---|
| `RUN-CANTU-REPO-RENAME-001` | **1** | O2 / O2.P5 | 17 | planned |
| `RUN-CANTU-INTERNAL-CODE-RENAME-001` | **1** | O2 / O2.P5 | 62 | planned |
| `RUN-CANTU-DOCS-DIRECTORY-RENAME-001` | **1** | O2 / O2.P5 | 63 | planned |
| `RUN-CANTU-RUNTIME-JAME-CLASS-RENAME-001` | **1** | O2 / O2.P5 | 64 | planned |
| `RUN-CANTU-RUNTIME-J-NAMESPACE-RENAME-001` | **1** | O2 / O2.P5 | 65 | planned |

Cada uno existe **exactamente una vez**. ✓

### 4.1 Aristas que cruzan la frontera de O0, recontadas

Frontera evaluada con la **nueva** composición: {los 12 runs de O0} vs {los otros 53}.

**Número real medido: 1.**

| # | Sentido | Arista | Naturaleza |
|---:|---|---|---|
| 1 | **entrante** | `RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` (O2) → `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001` (O0) | histórica: el destino está `completed` |

- Aristas **salientes** de O0: **0** (antes 7).
- Aristas **entrantes** a O0: **1** (sin cambio).
- **Total: 1.** Coincide con el número esperado, y coincide con la consecuencia aritmética
  que `MEDICION-GRAFO-O0.md:237-240` ya había derivado para el escenario «O0 menos rename».

Las 7 aristas salientes desaparecieron porque nacían íntegramente del bloque movido: 5
apuntaban a `RUN-CANTU-NAMING-AUDIT-DISPOSITION-001` (O2), y ahora son **intra-O2**; las 2
restantes (`→ RUN-JAME-WEB-READINESS-EVIDENCE-001` en O1 y
`→ RUN-JAME-SLIDE-READINESS-EVIDENCE-001` en O3, ambas desde
`RUN-CANTU-INTERNAL-CODE-RENAME-001`) siguen existiendo como aristas O2→O1 y O2→O3, pero
**ya no cruzan la frontera de O0**. Ninguna dependencia se rompió ni se creó: el grafo es
idéntico; lo que cambió es dónde cae la frontera.

**Nota de alcance sobre esta cifra.** El «1» es una propiedad de la nueva composición de O0,
no una ratificación del alcance de la migración de D-034. Que convenga o no migrar O0 sigue
siendo decisión del operador; este record no la toma.

---

## 5. Nota de alcance

- **No se ejecutó la migración a `aiw-console`** ni se escribió su `roadmap.json`.
- **No se renumeró `queue_order`.** La secuencia sigue siendo densa 1..65 con los mismos
  valores de siempre; los huecos que la renumeración cerraría siguen siendo trabajo de la
  migración.
- **No se tocó el emisor, la consola, el validador ni ningún código.** Los tres archivos de
  §2 se abrieron en modo lectura y no se modificaron.
- **No se levantó la consola ni se corrió el validador.** La tabla de §2.1 es lectura del
  código del validador, no un resultado de ejecución. **[NO VERIFICADO]** cualquier
  afirmación sobre lo que el validador diría al ejecutarse.
- **No se ejecutó git en ninguna forma.** El commit lo hace el operador.
- No se modificó `CONTRATO.md`, `DECISIONES.md` ni ningún record existente. Este record es
  nuevo.
- El título de la fase nueva («Naming Rename Execution») y su `phase_id` (`O2.P5`) son
  elecciones de este re-archivo, justificadas en §3.1. Si el operador prefiere otro rótulo,
  cambiarlo es una edición de un solo campo que no toca ningún invariante.
- **Lo que este record no decide:** si O2 —«Knowledge Base and Documentation Source of
  Truth»— es el objetivo definitivamente correcto para runs de rename de código y runtime.
  El encargo fijó O2 como destino y la medición lo sostiene (el contrato que gobierna los
  cinco vive allí), pero el roadmap **no declara criterio de pertenencia** de un run a un
  objetivo, así que la pregunta de fondo queda **[NO VERIFICADO]** y abierta para el
  operador.
