# MEDICIÓN DEL ESTADO REAL DE AIW

**Fecha:** 2026-07-28 · **Naturaleza:** READ-ONLY. No convierte, no emite, no
escribe nada fuera de este archivo. · **Máquina:** PC (Windows 10, ruta
`C:\Users\chris\Documents\AIW_Workspace\`).

## Para qué existe este record

Es el **insumo de un análisis que la cabina hará con el operador**, no un plan y
no una decisión. El roadmap de `aiw-console` declara `O4.P6` («Stage 6 — AIW as a
third project (roadmap Markdown → v3)») como la conversión mecánica del roadmap de
AIW a `roadmap_tree_v1` más la emisión de su `.project/`. El operador **no quiere
esa conversión mecánica**: quiere revisar el estado del proyecto, evaluar
propuestas de mejora que traerá él, decidir qué entra y en qué orden, y ESCRIBIR
el roadmap sobre esa decisión.

Esta medición es lo que hace posible esa conversación. Sin ella el análisis se
haría de memoria — el modo de fallo característico de este proyecto.

**El operador NO va a pegar este reporte en la cabina.** Este archivo se commitea
y se sincroniza, y el hilo nuevo lo lee de aquí. Por eso está escrito para ser
autosuficiente: quien lo lea sin más contexto debe poder conducir el análisis.

## Cómo leer las fuentes

Todas las rutas son relativas a `C:\Users\chris\Documents\AIW_Workspace\` salvo
que se diga otra cosa. Abreviaturas usadas en las citas:

| Abreviatura | Archivo |
|---|---|
| `RM-AIW` | `projects/aiw-console/context/aiw/roadmap_AIW_temp.md` |
| `RM-CONSOLE` | `projects/aiw-console/roadmap/roadmap.json` |
| `RM-CANTU` | `projects/cantu-studio/.aiw/roadmap/roadmap.json` |
| `PROJ` | `projects/aiw-console/tools/projector/project.mjs` |
| `CONTRATO` | `projects/aiw-console/context/aiw-console/CONTRATO.md` |
| `SERVE-LEGACY` | `projects/aiw-console/tools/project-console/serve-project-console.mjs` |
| `SERVE-SHELL` | `projects/aiw-console/project-console/serve.mjs` |

Lo medido de primera mano hoy va sin marca. Lo que es inferencia o no se pudo
verificar va marcado **[NO VERIFICADO]**.

## Verificación de no-escritura

`aiw` no se modificó en ningún byte. Medido antes y después de toda la sesión:

| Medida | Antes | Después |
|---|---|---|
| md5 del manifiesto (`find` excl. `.git` → `md5sum` de todos los archivos → `md5sum`) | `b59bf289515c212ae4ddfee9049a5aa6` | `b59bf289515c212ae4ddfee9049a5aa6` |
| archivos (excl. `.git`) | 146 | 146 |
| `git status --porcelain` | 0 líneas | 0 líneas |
| `git rev-parse HEAD` | `ca3087d8c2686c8250f512838b36ce6cd590800a` | idem |

`cantu-studio` no se modificó: `git status --porcelain` = 0 líneas,
HEAD `73945e567b863e5cf5d299356b87b08ce0a4c7da`.

En `aiw-console` el único archivo nuevo es este record. No se tocó ningún roadmap,
ni `CONTRATO.md`, ni `DECISIONES.md`, ni handoffs, ni records existentes. No se
emitió ni re-emitió ningún `.project/`. **git se usó solo en lectura**
(`status`, `rev-parse`, `ls-files`, `log`, `branch`, `remote`, `check-ignore`,
`symbolic-ref`, `rev-list --count`).

**Escritura concurrente de OTRO carril, detectada y absorbida.** A mitad de esta
medición, a las `00:53:48`, otro taller —la comisión de cierre del roadmap—
escribió `roadmap/roadmap.json` (y 4 archivos de test entre `00:54` y `00:56`).
No fue esta medición: el único `Write` de esta sesión es este archivo, a las
`00:58:24`. Las cifras del bloque 2 se **re-midieron después** de esa escritura y
son las de `md5 e620f0702ed7d0130048bc7c65a914ae`. Las cifras previas eran 42 runs
totales y O4 con 15 fases / 30 runs; los tres runs añadidos fueron
`RUN-CONSOLE-CANTU-IMPL-DOC-SPLIT-001` (q33), `RUN-CONSOLE-PROJECT-REEMIT-ROUTE-001`
(q34, en la fase nueva `O4.P15`) y `RUN-CONSOLE-LANE-EXECUTION-DISCIPLINE-001`
(q44), con renumeración de `queue_order` aguas abajo. Se registra porque es
exactamente el escenario de carriles paralelos que R2 y el propio
`RUN-CONSOLE-PROJECT-REEMIT-ROUTE-001` describen, y porque **toda cifra sobre
`RM-CONSOLE` en este record es «al 2026-07-28 00:58», no una constante**.

Nota de método: las funciones del proyector que se ejecutaron
(`detectRootLayout`, `detectRootMode`, `hasRoadmapTreeShape`) son puras y solo
leen. Se importaron como módulo, lo que **no** dispara el bloque CLI de `PROJ`
(`PROJ:1687` compara `process.argv[1]` con la URL del módulo). No se corrió
ningún emisor, ni la consola, ni la suite de tests de `aiw`.

---

# 1. El roadmap actual de AIW

## 1.1 Dónde vive de verdad

`projects/aiw-console/context/aiw/roadmap_AIW_temp.md` — **208 líneas, 12.981
bytes**, mtime `2026-07-24 05:16`.

**No vive en el repo `aiw`.** Su propio encabezado dice lo contrario:

> «Vive en el repo `aiw\` y se convierte a JSON cuando exista el tooling de la
> consola global» (`RM-AIW:3-4`).

Eso es **stale**. Medido: no existe ningún archivo de roadmap en `aiw` (búsqueda
de `*roadmap*` sobre todo el árbol, incluidos untracked: solo aparecen
`logs/DIAG-roadmap-invalid.md` y tres tickets de objetivo). El archivo salió de
`aiw` en el commit `48c427b` («chore(context): mudar contexto de gobernanza a
aiw-console; puntero en CONTEXTO.md»), y `aiw/CONTEXTO.md` lo documenta con tabla
de mudanza explícita: «Se mudó a `projects/aiw-console/context/aiw/` … Los
documentos allí son los **canónicos**: no hay copia viva aquí.»

Hay además una **contradicción directa** entre los dos documentos sobre qué repo
se sincroniza como knowledge:

- `RM-AIW:5-8`: «Desde 2026-07-22 el repo `aiw` se sincroniza como knowledge del
  proyecto Claude (D-034)».
- `aiw/CONTEXTO.md`: «`aiw-console` es el **único repo sincronizable como
  knowledge** de la cabina».

Ninguno de los dos se corrigió al mudar. Se reporta, no se resuelve.

## 1.2 Los objetivos que existen de verdad

**Existen SEIS: O1, O2, O3, O4, O5, O6.** El encargo esperaba O1, O2, O3, O5, O6;
O4 también está presente en el Markdown (ver bloque 2). No existe O0 en AIW — `O0`
es del roadmap de `aiw-console`.

Inventario completo, contado bullet por bullet sobre el archivo:

| Objetivo | Línea | Título | Bullets | `completed` | `planned` |
|---|---:|---|---:|---:|---:|
| O1 | 20 | Casa en orden (migración al workspace único, D-031) — **COMPLETADO** | 10 | 10 | 0 |
| O2 | 78 | Run autónomo confiable (kernel) | 2 | 0 | 2 |
| O3 | 87 | Categorías y batches (D-029/D-030 → código) | 3 | 0 | 3 |
| O4 | 98 | Consola global (migrará a su propio roadmap cuando nazca) | 10 | 1 | 9 |
| O5 | 167 | Metodología | 4 | 1 | 3 |
| O6 | 191 | Modo nocturno (horizonte; gated por O2 y O3) | 3 | 0 | 3 |
| **Total** | | | **32** | **12** | **20** |

Detalle por bullet, con línea y estado declarado:

**O1 — Casa en orden (10/10 `completed`).** Respaldo remoto del v2 (L29);
Respaldo remoto de aiw-console (L31); Esqueleto + mudanza de aiw y aiw-console
(L33); Retiro del Legacy (L36); Mudanza + rename de Cantu Studio y Lessons (L49);
Consolidación de `main` en Cantu Studio (L57); Retiro del checkout monitoreado
viejo (L61); Limpieza y demolición de cascarones (L65); Actualizar GitHub Desktop
(L72); Replicar estructura en la laptop (L73).

**O2 — Run autónomo confiable (0/2).** D-028: check de pre-flight de scope
(L80, `planned`); Estrés en repo grande (L83, `planned`).

**O3 — Categorías y batches (0/3).** Campo de categoría + closeout diferenciado
(L89); Activación de push por proyecto (L92); Batch→rama en la cola (L95). Los
tres `planned`.

**O4 — Consola global (1/10).** Ver bloque 2 para el detalle y la comparación.

**O5 — Metodología (1/4).** Conversión del proyecto Claude (L169, `completed`);
Metodología de 3 proyectos en paralelo (L175, `planned`, «gated por la consola»);
Normalización de vocabulario de categorías (L184, `planned`); Roadmaps → JSON v3
(L187, `planned`).

**O6 — Modo nocturno (0/3).** Lanzador de cola desacoplado (L193); Recuperación
de lock huérfano (L196); Noches desatendidas reales, criterio D-018 (L197). Los
tres `planned`. El objetivo se declara «horizonte; gated por O2 y O3» (L191).

Cierra el archivo una **nota de frontera** (L202-208) sobre los tres pasos
lado-Cantu de O1: se ejecutan bajo gobierno de Cantu aunque esta migración los
ordene.

## 1.3 Qué estructura declara

**No declara fases. No declara runs. No declara ids.** La estructura real es de
DOS niveles:

```
## O<n> — <título>            (encabezado H2, con estado en prosa a veces)
- **<título del ítem>** — `<status>`
  <prosa libre, 1..14 líneas, con citas y evidencia>
```

Ausente por completo, medido campo a campo contra `roadmap_tree_v1`:

- ningún `objective_id`, `phase_id` ni `run_id`;
- ningún `queue_order` — el orden es la posición en el archivo;
- ningún `depends_on` — las dependencias se dicen en prosa
  («gated por la consola» L175, «gated por O2 y O3» L191, «No se construye hasta
  que el run autónomo sea confiable (O2)» L195);
- ningún `closeout_result`, `progress`, `lane`, `barrier`, `category`, `batch`;
- ningún nivel intermedio entre objetivo e ítem.

**Vocabulario declarado vs vocabulario usado.** `RM-AIW:13` declara
«Vocabulario v3: `planned | active | completed | blocked`» — los cuatro tokens de
`CONTRATO §11.a`. Pero el archivo **solo usa dos**: 20 `planned` y 12
`completed`. **Cero `active`, cero `blocked`.** Consecuencia medible: el roadmap
de AIW no declara hoy ningún trabajo en curso ni ningún bloqueo, en ningún
objetivo.

**Categoría de run declarada a nivel de roadmap** (`RM-AIW:13-16`): todos los runs
son categoría **manual** (D-029) mientras dure la regla anti-auto-hosting — «el
kernel jamás ejecuta sobre AIW» — con una **excepción declarada**: «los runs
contra `aiw-console` sí son delegables al kernel cuando se retome ese flujo».

**División declarada con `ESTADO.md`** (`RM-AIW:10-11`): aquí vive el BACKLOG (qué
hay y en qué estado); en `ESTADO.md` vive el estado de SESIÓN (dónde quedamos, se
reescribe al cierre).

## 1.4 Cuánto trabajo describe

32 ítems en 208 líneas. La densidad es muy desigual: O1 ocupa 58 líneas para 10
ítems ya cerrados (es un registro de lo hecho, con evidencia: SHAs, conteos,
rutas), y O2+O3+O6 juntos ocupan 28 líneas para 8 ítems abiertos (son títulos con
una o dos líneas de razón). O4 ocupa 68 líneas — un tercio del archivo — para 10
ítems de los que 9 están declarados `planned` y que el canónico de `aiw-console`
ya lleva mayormente `completed`.

Lectura: **el trabajo abierto de AIW está descrito con muy poca resolución**
(O2, O3, O6 = 8 ítems, ~3 líneas cada uno) comparado con el trabajo cerrado. Si el
operador va a decidir qué entra y en qué orden, esos 8 ítems son los que menos
información traen a la mesa.

---

# 2. O4 duplicado — los dos sitios, medidos

O4 vive HOY en dos archivos. Fue **ventana deliberada**, registrada en D-046 y
anotada dentro del propio Markdown.

## 2.1 Lo que dice cada sitio

**Markdown (`RM-AIW:98-165`).** Encabezado: «O4 — Consola global (migrará a su
propio roadmap cuando nazca)». 10 bullets: 1 `completed`, 9 `planned`. Sin fases.

Lleva una **nota de puntero al canónico** (`RM-AIW:100-106`, fechada 2026-07-24)
que dice, textualmente, que el canónico es el JSON de `aiw-console`, que esta
versión Markdown «queda como registro histórico y no se edita», que «por
construcción está desactualizado» y que «su retiro es trabajo del tramo 6».

**JSON (`RM-CONSOLE`, `schema_version: "roadmap_tree_v1"`).** El objetivo `O4`
«Global Console», medido al 2026-07-28 00:58: **16 fases, 33 runs, 27 `completed` y
6 `planned`**, `queue_order` 13..45 (los 1..12 son de `O0`). Ya está en inglés.
El archivo entero: 2 objetivos, 19 fases, 45 runs, `queue_order` 1..45 denso y
único.

La asimetría de cifras es el hecho central: **10 bullets → 33 runs**, y **1
`completed` → 27 `completed`**.

Estado por fase del canónico (medido sobre `RM-CONSOLE`):

| phase_id | Título | Runs | Estado |
|---|---|---:|---|
| O4.P0 | Stage 0 — Audit / Phase 0 (read-only) | 1 | completed |
| O4.P1 | Stage 1 — Folder contract, O0 migration and drafting | 6 | completed |
| O4.P2 | Stage 2 — aiw-console emits its own folder | 1 | completed |
| O4.P11 | Identical port — Cantu's console transplanted | 2 | completed |
| O4.P3 | Stage 3 — Multi-project shell reading aiw-console only | 1 | completed |
| O4.P4 | Stage 4 — Cantu emits the new folder alongside .aiw | 2 | completed |
| O4.P12 | Write — the console edits the roadmap | 1 | completed |
| O4.P13 | Finishing of the ported console | 3 | completed |
| O4.P14 | Lanes and barriers in the roadmap schema (D-051) | 4 | completed |
| O4.P15 | Manual re-emission of `.project/` — third write route | 1 | completed |
| O4.P5 | Stage 5 — Global console renders Cantu (parity, QA) | 1 | **planned** |
| O4.P8 | Stage 8 — UI/UX | 1 | **planned** |
| O4.P6 | Stage 6 — AIW as a third project (Markdown → v3) | 1 | **planned** |
| O4.P7 | Stage 7 — Cutover: retirement of Cantu's console | 1 | **planned** |
| O4.P9 | Prior and cross-cutting work | 6 | 4 completed, 2 planned |
| O4.P10 | Global console prototype (RETIRED by D-048) | 1 | completed |

## 2.2 En qué difieren, ítem por ítem

Correspondencia medida entre el bullet del Markdown y su destino en el canónico:

| Bullet Markdown | L | Declara | Destino en el canónico | Estado real |
|---|---:|---|---|---|
| Merge de 005 en aiw-console | 108 | completed | `RUN-CONSOLE-MERGE-005-001` (O4.P9) | completed |
| 1. Audit / Phase 0 — SIGUIENTE | 130 | planned | `RUN-CONSOLE-AUDIT-PHASE0-001` (O4.P0) | **completed** |
| 2. Contrato de normalización | 136 | planned | O4.P1, 6 runs | **completed** |
| 3. Los tres roadmaps al contrato | 141 | planned | O4.P1 (redacción O4 + migración O0) y O4.P6 (AIW) | **parcial**: O0 y O4 hechos; AIW `planned` |
| 4. La consola los lee | 147 | planned | O4.P3 + O4.P11 + O4.P13 | **completed** |
| Context pack de la consola | 148 | planned | `RUN-CONSOLE-CONTEXT-PACK-001` (O4.P9) | planned |
| Digest para la cabina | 152 | planned | `RUN-CONSOLE-DIGEST-CABINA-001` (O4.P9) | planned |
| Consola global en aiw-console | 157 | planned | O4.P11 (port idéntico) + O4.P5 | **parcial**: port hecho; paridad `planned` |
| Pantalla multi-proyecto | 160 | planned | `RUN-CONSOLE-SHELL-MULTIPROYECTO-001` (O4.P3) | **completed** |
| Paridad y corte | 163 | planned | O4.P5 + O4.P7 | planned |

**Lectura: el Markdown declara `planned` 6 bullets que el canónico ya lleva
`completed` o mayormente completados** (Audit, Contrato, La consola los lee,
Pantalla multi-proyecto, y parcialmente Los tres roadmaps y Consola global). Eso
es exactamente lo que la nota de `RM-AIW:100-106` anticipó y decidió NO corregir.

**Y el canónico contiene trabajo que el Markdown nunca nombró**: las fases
O4.P10 (prototipo, retirado por D-048), O4.P12 (escritura desde la consola,
D-050), O4.P13 (acabado del port), O4.P14 (carriles y barriers, D-051) y O4.P15
(tercera ruta de escritura) nacieron después del Markdown y no tienen bullet de
origen. Son **22 de los 33 runs**: dos tercios del objetivo canónico no existen
en la versión Markdown, y no por estar desactualizada sino porque ese trabajo se
decidió después.

## 2.3 Qué se perdería al retirar O4 del Markdown

Esta subsección es insumo de la decisión, **no la decisión**.

### (a) Lo que NO se perdería

Ocho runs del canónico citan explícitamente líneas del Markdown y arrastran su
texto. Medido buscando `RM-AIW:` en `summary`/`full_description`/`closeout_result`
de los 42 runs:

| Run | Cita |
|---|---|
| `RUN-CONSOLE-AUDIT-PHASE0-001` | `RM-AIW:114-120` |
| `RUN-CONSOLE-SHELL-MULTIPROYECTO-001` | `RM-AIW:152` |
| `RUN-CONSOLE-CANTU-EMITE-CARPETA-001` | `RM-AIW:133` |
| `RUN-CONSOLE-PARIDAD-RENDER-CANTU-001` | `RM-AIW:149-151` |
| `RUN-CONSOLE-UI-UX-001` | `RM-AIW:119-120`, `RM-AIW:157` |
| `RUN-CONSOLE-AIW-TERCER-PROYECTO-001` | `RM-AIW:134` |
| `RUN-CONSOLE-CORTE-RETIRO-LOCAL-001` | `RM-AIW:155-157`, `RM-AIW:151` |
| `RUN-CONSOLE-DIGEST-CABINA-001` | `RM-AIW:148` |

En particular, el **marco del objetivo** («SECUENCIA ACORDADA (D-034)» + la
definición de «consola estable») está preservado LITERAL dentro del
`full_description` de `RUN-CONSOLE-AUDIT-PHASE0-001`, y en el idioma de su fuente
(el resto del roadmap está en inglés). El propio run lo declara así: «preserved
literal from RM-AIW:114-120 and therefore left in the language of its source (no
home at objective level under roadmap_tree_v1)».

**Pero las ocho citas están ROTAS: apuntan 8 líneas antes del texto real.** Ver
bloque 6, riesgo R1.

### (b) Lo que SÍ se perdería — los tres huecos de capa 2 que D-046 ya midió

D-046 (`context/DECISIONES.md:1062`, sección «HUECO DE CAPA 2, descubierto por
uso, mayor de lo previsto») enumera tres declaraciones del Markdown **sin destino
en `roadmap_tree_v1`**. Se transcriben aquí porque son el costo concreto del
retiro:

1. **La declaración de vocabulario de `status` a nivel de roadmap**
   (`RM-AIW:13`). El árbol no tiene clave de vocabulario ni en la raíz ni en el
   objetivo; hoy eso vive en el contrato (`CONTRATO §11.a`), no en el dato.
2. **El matiz de que los runs contra `aiw-console` sí serían delegables al
   kernel** (`RM-AIW:15-16`) — una **excepción** a la regla de categoría
   `manual`, que ni con `category` materializado (`CONTRATO §16`) tendría dónde
   alojarse a nivel de roadmap.
3. **La mayor: un objetivo no puede declarar su propia definición de terminado.**
   El criterio «consola estable» tuvo que alojarse en el `full_description` de un
   run **ya `completed`**, porque un objetivo bajo el modelo canónico solo tiene
   `objective_id`, `title`, `phases` (`CONTRATO §10.a`) — no hay campo de prosa
   donde poner el marco del objetivo.

Raíz medida de (3), citada por el propio contrato: `RUN-CANTU-ROADMAP-EDITOR-
USABILITY-001` quitó `summary` y `full_description` de objetivos y fases
**deliberadamente**, y el contrato respetó esa decisión. D-046 cierra: «La
enmienda se delibera aparte, con las dos evidencias enfrente; no se revierte por
decreto.»

### (c) Lo que se perdería y D-046 no nombró

- **La nota de puntero misma** (`RM-AIW:100-106`) — es el registro de que hubo
  ventana deliberada y de por qué el Markdown estaba desactualizado a propósito.
  Retirar O4 sin preservar esta nota borra la explicación de la duplicidad.
- **El paréntesis del encabezado** (`RM-AIW:98`): «migrará a su propio roadmap
  cuando nazca» — la intención original, escrita antes de que el roadmap de la
  consola existiera.
- **La declaración de estado de los pulidos menores** (`RM-AIW:118-121`): banner
  «some optional local state files could not be loaded» y «el diseño se ve algo
  desplazado». **[NO VERIFICADO]** si esos dos pulidos siguen abiertos: no se
  levantó la consola en esta medición. Si están cerrados por O4.P13, no se pierde
  nada; si no, el retiro pierde la única anotación de que existen.

### (d) Escala del problema si se convierte TODO el roadmap

Los huecos (1) y (2) son declaraciones **a nivel de roadmap** (`RM-AIW:13-16`),
no de O4: aplican a los seis objetivos. El hueco (3) —objetivo sin campo de
prosa— se materializaría **seis veces**, no una. Casos concretos medidos:

- `O1` declara su estado en el encabezado: «— **COMPLETADO**». Ese sí **sobrevive
  como derivación** (`CONTRATO §12.a`: todos los runs `completed` → objetivo
  `completed`).
- `O6` declara «horizonte; gated por O2 y O3» en el encabezado. **No sobrevive**:
  no hay campo de gating entre objetivos, y `depends_on` es de run a run.
- `O5` declara «(gated por la consola)» a nivel de bullet (L175). **Sí podría
  sobrevivir** como `depends_on` a un run de `aiw-console`: `CONTRATO §10.d`
  Regla 2 declara legal la dependencia externa entre proyectos.
- La **nota de frontera** (`RM-AIW:202-208`) es prosa a nivel de archivo. No
  tiene destino: `roadmap_tree_v1` no tiene campo de nota de raíz.

---

# 3. La forma de los datos en disco — la brecha, campo a campo

## 3.1 Qué hay en las carpetas de AIW

**`aiw/config.json`** (545 bytes, mtime 2026-07-22 04:58). Contiene: `ntfy.url`,
`timeouts_ms` (executor/reviewer/verification) y `projects` — dos entradas,
`sandbox` y `console`, cada una con `path` (absoluto, Windows), `base_branch`,
`verification` (`npm test`) y `push: false`. **No contiene ningún dato de
roadmap**, ni `project_id`, ni resumen, ni estado.

**`aiw/objectives/`** — 22 archivos `.md` en **cinco** carpetas, no tres:

| Carpeta | Archivos | ¿La lee el proyector? |
|---|---:|---|
| `pending/` | 2 (`005-roadmap-contract-fix`, `006-roadmap-delivery-path`) | sí |
| `parked/` | 3 (`001-arithmetic-columns-guard`, `002-hierarchy-docs-drift`, `003-video-provider-docs-drift`) | sí |
| `processed/` | 11 | sí |
| `qualification/` | 3 (`e5-secreto`, `e6-changes-requerido`, `e8-multiarchivo`) | **no** |
| `queue-e7/` | 3 (`a-resta`, `b-multiplica`, `c-imposible`) | **no** |

El proyector recorre exactamente `["pending","parked","processed"]`
(`PROJ:97` — `OBJECTIVE_CLASSIFICATIONS`), de ahí que su conteo sea **16** y no
22. Las dos carpetas restantes son artefactos de la época de cualificación del
kernel y son **invisibles a la consola**, aunque estén trackeadas en git.

Contenido de `processed/` (11): `APPROVED-000-sandbox-suma`,
`APPROVED-001-console-projector`, `APPROVED-002-canonical-path-and-autoproject`,
`APPROVED-003-roadmap-emitter`, `APPROVED-003b-startup-projection-all-views`,
`APPROVED-004-snapshot-enrichment`, `APPROVED-a-resta`, `APPROVED-b-multiplica`,
`ERROR-000-sandbox`, `HUMAN_REVIEW-999-sandbox-imposible`,
`HUMAN_REVIEW-c-imposible`.

**Qué campos lleva un objetivo.** Son documentos Markdown con encabezados H1
fijos, no frontmatter y no JSON. Medido sobre
`objectives/pending/005-roadmap-contract-fix.md` y
`objectives/processed/APPROVED-003-roadmap-emitter.md`, y contra
`aiw/templates/objective.md`:

```
# Project              → nombre corto del proyecto destino ("console", "sandbox")
# Objective            → prosa: qué se quiere
# Acceptance criteria  → prosa/lista
# Scope                → globs
# Out of scope         → prosa/lista
# Max rounds           → entero
# Verification         → comando ("npm test")
```

**No hay `run_id`, ni `status`, ni `queue_order`, ni `depends_on`, ni fecha, ni
categoría, ni batch, ni referencia a objetivo/fase.** La identidad del objetivo es
**el nombre del archivo** y su estado es **la carpeta que lo contiene** más el
**prefijo del nombre** una vez archivado.

**`aiw/logs/`** — 9 subcarpetas de run + 2 `.md` sueltos. Detalle en el bloque 5.
Los archivos por run son: `objective.md`, `preflight.txt`,
`round1_executor.md`, `round1_reviewer.md`, `round1_tests.txt`, `summary.md`, y
`STAGE.txt` en 6 de las 9.

**`aiw/.aiw/`** — un solo archivo: `project_console.snapshot.json`, mtime
**2026-07-10 23:41**, en la ruta **pre-002** (`.aiw/project_console.snapshot.json`).
La ruta canónica de hoy es `.aiw/views/project_console.snapshot.json`
(`PROJ:91`). `aiw/.aiw/views/` **no existe**. Ese snapshot declara «10 objectives,
2 recorded runs» — la foto de hace 18 días.

**Ambos, `.aiw/` y `logs/`, están gitignoreados en `aiw`** (`aiw/.gitignore:4`
`logs/`, `:7` `.aiw/`). Verificado con `git check-ignore -v`. Medido:
`git ls-files logs` → **0 archivos**; `git ls-files .aiw` → **0 archivos**;
`git ls-files` total → **52 archivos**. Consecuencia: **toda la evidencia de
ejecución de AIW es local de esta máquina** y no llega ni al remoto, ni a la
laptop, ni al knowledge de la cabina.

## 3.2 Qué produce hoy el proyector desde esos datos

El proyector tiene dos modos y **el modo lo decide la forma de la raíz, nunca su
nombre** (`PROJ:4`, `PROJ:792`). Medido hoy, ejecutando `detectRootMode` sobre los
tres roots:

| Root | Modo | Layout que lo reclama |
|---|---|---|
| `projects/aiw-console` | `roadmap_tree` | `repo_root` |
| `projects/cantu-studio` | `roadmap_tree` | `project_local_aiw` |
| `aiw` | **`aiw_objectives`** | **ninguno** |

En modo 1, el proyector produce **dos** artefactos. Los dos vivos están en
`projects/aiw-console/.aiw/views/` — el servidor legacy **lee** cada project root
y **escribe solo en su propio repo** (`SERVE-LEGACY:20-22`, `:47`, `:202`).
Ambos con mtime `2026-07-22 15:38` y `generated_from: "aiw-projector@0.1.0"`,
frente a `PROJECTOR_VERSION = "0.9.0"` de hoy (`PROJ:89`).

**(A) El snapshot** (`.aiw/views/project_console.snapshot.json`, 6.282 bytes).
14 claves de raíz: `schema_version` (=1), `project_id` (=`"aiw"`),
`generated_at`, `generated_from`, `operational_status` (=`"active"`),
`project_summary`, `current_status_summary`, `roadmap_tree`, `blockers` (=[]),
`followups` (=[]), `no_claims_summary` (={}), `validation_summary` (={}),
`taxonomy_model`, `latest_history_items`. **No lleva `sources`** — que
`CONTRATO §3` exige como requerida.

Su `roadmap_tree` declara `model: "aiw_flat_objectives_v1"`, `counts`
(pending 2, parked 3, processed 11, total 16) y `objectives[]` con **cuatro campos
por objetivo**: `id`, `title`, `classification`, `source`.

**Defecto medido, vivo:** los 16 `title` del snapshot son literalmente
**`"Project"` (13 veces) o `"Proyecto"` (3 veces)** — nunca el objetivo. Causa:
`readObjectives` usa `titleFromMarkdown`, que toma el **primer H1** del archivo
(`PROJ:148-151`, `PROJ:161`), y el primer H1 de todo ticket de AIW es
`# Project`. El objetivo 005 arregló esto **solo para la vista de roadmap**; el
snapshot quedó fuera de su alcance.

**(B) La vista de roadmap** (`.aiw/views/roadmap.json`, 28.035 bytes; copia de
entrega idéntica en `.aiw/roadmap/roadmap.json`). Tres claves de raíz:
`generated_at`, `generated_from`, `objectives`. Estructura: **1 objetivo → 1 fase
→ 16 runs**. El objetivo lleva `title` (=`"aiw"`), `summary` (=«16 AIW objectives
(pending, parked, processed)») y `phases`. La fase lleva `title`
(=`"Objective queue"`) y `runs`. Aquí sí los títulos son correctos (arreglo de
005): p. ej. `run_id: "005-roadmap-contract-fix"`, `title: "Make the projector
emit a Roadmap view that actually satisfies the console's"`.

Los 16 runs, medidos, con el estado que el emisor deriva:

| q | status | closeout_result | run_id | depends_on |
|--:|---|---|---|---|
| 1 | active | — | `005-roadmap-contract-fix` | [] |
| 2 | planned | — | `006-roadmap-delivery-path` | [] |
| 3 | planned | — | `001-arithmetic-columns-guard` | 005, 006 |
| 4 | planned | — | `002-hierarchy-docs-drift` | 005, 006 |
| 5 | planned | — | `003-video-provider-docs-drift` | 005, 006 |
| 6..13 | completed | approved | los 8 `APPROVED-*` | [] |
| 14 | blocked | error | `ERROR-000-sandbox` | [] |
| 15 | blocked | human_review | `HUMAN_REVIEW-999-sandbox-imposible` | [] |
| 16 | blocked | human_review | `HUMAN_REVIEW-c-imposible` | [] |

Histograma: 1 `active`, 4 `planned`, 8 `completed`, 3 `blocked`.

## 3.3 La brecha, campo a campo

`roadmap_tree_v1` (`CONTRATO §10.a`) es un árbol de tres niveles. Las claves
admitidas hoy son: raíz 4 + `lanes` opcional; objetivo 3; fase 3; run 9 + 2
opcionales de D-051 + 2 reservadas de §16.

**Distinción explícita: EXISTE = hay origen en los datos de AIW hoy.
INVENCIÓN = no hay origen; alguien lo tendría que decidir.**

### Raíz

| Clave | Origen | Veredicto |
|---|---|---|
| `schema_version` | fijo por el contrato: `"roadmap_tree_v1"` (`§10.c`) | EXISTE (constante del contrato) |
| `roadmap_id` | los otros dos usan `"roadmap"` (medido en `RM-CONSOLE` y `RM-CANTU`) | EXISTE por convención — pero ver riesgo R6 |
| `title` | no existe; `RM-AIW:1` dice «AIW — Roadmap (temporal)» | **INVENCIÓN** (derivable del H1) |
| `objectives` | los 6 H2 del Markdown | EXISTE |
| `lanes` (opcional) | AIW no declara carriles en ninguna parte | **INVENCIÓN** si se quiere |

### Objetivo

| Clave | Origen | Veredicto |
|---|---|---|
| `objective_id` | los H2 ya dicen `O1`..`O6` | EXISTE (con colisión — riesgo R5) |
| `title` | el texto del H2 | EXISTE |
| `phases` | **el Markdown NO declara fases** | **INVENCIÓN, y ya hay precedente declarado** |

Sobre `phases`: D-046 nombra su propia invención sin adorno — «**Fases = tramos, y
es INVENCIÓN declarada.** La fuente (`roadmap_AIW_temp.md`) no declara fases, y
los nueve tramos vivían solo en el handoff efímero.» Para O1..O3, O5 y O6 no hay
ni siquiera un handoff con tramos: **la descomposición en fases habría que
inventarla entera**, y `CONTRATO §12.b` exige ≥1 run por fase.

### Fase

| Clave | Origen | Veredicto |
|---|---|---|
| `phase_id` | ninguno | **INVENCIÓN** (consecuencia de la anterior) |
| `title` | ninguno | **INVENCIÓN** |
| `runs` | los bullets, si se acepta bullet≡run | EXISTE (con el mapeo asumido) |

### Run

| Clave | ¿Presente en el Markdown? | ¿Presente en los datos de `objectives/`? | Veredicto |
|---|---|---|---|
| `run_id` | no | sí, pero **muta** (nombre de archivo) | **INVENCIÓN para los 32 bullets**; para los 16 objetivos existe pero viola el contrato (ver abajo) |
| `queue_order` | no (solo posición) | no (solo orden alfabético) | **INVENCIÓN** — hay que asignar 1..N |
| `title` | sí: el texto en negritas del bullet | sí (primera línea bajo `# Objective`) | EXISTE |
| `summary` | derivable de la primera oración de la prosa | sí (primera oración del cuerpo) | EXISTE (derivado) |
| `full_description` | sí: la prosa del bullet | sí (el archivo entero) | EXISTE |
| `status` | sí, 2 de 4 tokens | sí (carpeta + prefijo) | EXISTE |
| `depends_on` | **solo en prosa** («gated por…») | derivado, sintético (ver abajo) | **INVENCIÓN** — hay que traducir prosa a aristas |
| `closeout_result` (opc.) | no | sí (prefijo del nombre) | EXISTE para los 16; **INVENCIÓN** para los 12 bullets `completed` del Markdown |
| `progress` (opc.) | no | no | ausente, y nace ausente |
| `lane` / `barrier` (opc., D-051) | no | no | **INVENCIÓN** si se quiere |
| `category` / `batch` (§16) | `category` sí, a nivel de ROADMAP (`RM-AIW:13-16`), no de run | no | reservadas; nacen ausentes (`§16`) |

**Dos precisiones que pesan:**

**(i) Los `depends_on` que el proyector emite hoy son sintéticos, no medidos.**
Los 3 objetivos `parked` reciben `depends_on: ["005-…","006-…"]` — los pending —
no porque el dato lo diga, sino para que el lector de la consola los ponga en el
grupo «Later»: en ese lector un run `planned` llega a Later **solo** con ≥1
dependencia insatisfecha (`PROJ:104-110`). Cuando no hay pending, el emisor usa
el centinela `"__pending_queue__"` (`PROJ:112`), que no casa ningún `run_id`. Es
decir: **`depends_on` en los datos de AIW es hoy un artificio de presentación**,
no una dependencia real. Al convertir, esas 6 aristas no son dato que migrar.

**(ii) El `run_id` derivado de AIW VIOLA el contrato, y el contrato ya lo tiene
medido y adjudicado.** La cadena, re-verificada hoy contra el proyector 0.9.0:

1. el id se fabrica del **nombre del archivo**: `const id = name.replace(/\.md$/i, "")`
   — en `PROJ:161` (rama snapshot) y `PROJ:251` (rama roadmap);
2. viaja tal cual: `run_id: objective.id` en `PROJ:294`, `PROJ:306`, `PROJ:321`;
3. el kernel **renombra el archivo** al archivar:
   `path.join(PROCESSED, ${state}-${f})` — `aiw/queue.mjs:58`.

Resultado: `001-console-projector` mientras está pendiente pasa a ser
`APPROVED-001-console-projector` al completarse. **Muta en la transición que más
importa.** `CONTRATO §10.d` Regla 1.b lo llama «status codificado DENTRO de la
identidad» y añade el argumento que importa para la decisión del operador:

> «los 16 `run_id` de AIW **no son identidad hoy** — mutan. Un id que cambia solo
> no puede haber sido prometido a nadie como estable, así que cambiarle la forma
> no incumple ninguna promesa… Ésta es la **única** ventana en la que
> regularizarlos es gratis.»

La forma normativa a aplicar (`§10.d` Regla 1.a) es `RUN-<PROYECTO>-<SLUG>-<NNN>`.
Medido: **0 de 16** ids de AIW la cumplen; **65 de 65** de Cantu sí. Y D-046 ya
reservó el prefijo: `RUN-AIW-` «ése es del kernel».

**[NO VERIFICADO]**, y el contrato lo marca igual: si algún consumidor guarda
`run_id` de AIW entre proyecciones. No se midieron los consumidores.

### Lo que NO tiene origen en ninguna parte

Recuento del trabajo de invención, si se convirtieran los 32 bullets:

- **32 `run_id`** con la forma normativa;
- **32 `queue_order`** (1..32, denso y único);
- **N `phase_id` + N `title` de fase**, más la decisión de cuántas fases y cómo
  agrupar — para SEIS objetivos, con precedente declarado solo para O4;
- **las aristas `depends_on`** que hoy son prosa: al menos 3 explícitas
  (`RM-AIW:175`, `:191`, `:195`), dos de ellas entre objetivos (no expresable) y
  una hacia otro proyecto (expresable por `§10.d` Regla 2);
- **`closeout_result`** para los 12 bullets `completed` — el Markdown no lo lleva;
- **el `title` de la raíz**.

Y **tres declaraciones sin destino** (los huecos de D-046, bloque 2.3.b), que no
son invención sino pérdida.

---

# 4. Qué necesita AIW para entrar a la consola

## 4.1 Su entrada en el registro ya existe — y no alcanza

`projects/aiw-console/project-console/projects.json`:

```json
{
  "registry_model": "project_registry_v1",
  "title": "AIW Console",
  "projects": [
    { "key": "aiw-console",   "root": ".." },
    { "key": "cantu-studio",  "root": "../../cantu-studio" },
    { "key": "aiw",           "root": "../../../aiw" }
  ]
}
```

Los `root` se resuelven contra el **directorio del registro** (`SERVE-SHELL:203`:
`entries.set(key, resolve(registryDir, root))`), o sea contra
`project-console/`. Verificado: `../../../aiw` resuelve a
`AIW_Workspace/aiw`. **La entrada es correcta y apunta al sitio correcto.**

Lo que falta es lo otro. Los tres embudos del shell exigen, en orden: que la clave
resuelva en el registro, **que el root esté reclamado por un layout conocido**
(`detectRootLayout`), y que el destino de escritura caiga dentro del root
(`SERVE-SHELL:46`). AIW pasa el primero y **falla el segundo**.

Y `aiw/.project/` **no existe**. El shell sirve los artefactos como estáticos bajo
`/projects/<key>/**`, así que hoy toda petición de artefacto para la clave `aiw`
responde 404 y la consola anuncia la ausencia (`CONTRATO §20`).

## 4.2 Qué layout le aplicaría — medido, con la razón

`PROJ:623-640` define `ROOT_LAYOUTS` como una **lista de shapes de raíz, no de
proyectos**, y `detectRootLayout` (`PROJ:776`) las prueba **en orden**, devolviendo
la primera cuyo roadmap **parsea Y conforma** la shape gate (`PROJ:745`: tres
niveles, cada uno identificado, cada run con `status`).

Probé las dos layouts contra los tres roots, archivo por archivo:

| Root | Layout | roadmap | guardrails | no_claims | contract_ref | docs_index |
|---|---|---|---|---|---|---|
| aiw-console | `repo_root` | **sí** | sí | sí | sí | no |
| aiw-console | `project_local_aiw` | sí(*) | no | no | no | no |
| cantu-studio | `repo_root` | no | no | no | no | no |
| cantu-studio | `project_local_aiw` | **sí** | sí | sí | no | **sí** |
| **aiw** | `repo_root` | **no** | no | no | no | no |
| **aiw** | `project_local_aiw` | **no** | no | no | no | no |

(*) `aiw-console/.aiw/roadmap/roadmap.json` **existe** — es la copia de entrega de
la proyección de AIW — pero **no conforma la shape gate** (sus niveles no llevan
`objective_id`/`phase_id`). Ver riesgo R3.

**Ningún layout existente reclama a AIW, y no hace falta uno nuevo.** Las dos
layouts son shapes genéricos y AIW puede adoptar cualquiera de las dos poniendo
sus archivos donde la layout dice. La pregunta real es **cuál**, y la medición
la contesta con un hecho de `.gitignore`:

**Candidato: `repo_root`** — `roadmap/roadmap.json`, `governance/{guardrails,
no_claims,contract}.json`, `docs/docs_index.json`.

**Razón, y es dura: `aiw/.gitignore:7` ignora `.aiw/`.** Un canónico editable
bajo `project_local_aiw` caería en carpeta gitignoreada: no se commitearía, no
llegaría al remoto, no llegaría a la laptop y no llegaría al knowledge de la
cabina — que es exactamente el problema que este proyecto viene resolviendo. La
alternativa sería modificar el `.gitignore` de `aiw`, que es una escritura sobre el
kernel y una decisión del operador, no un detalle de implementación.

Razón secundaria, del mismo peso técnico: **la ruta `.aiw/roadmap/roadmap.json`
es exactamente donde el servidor legacy deposita la copia de entrega de la vista
mode-1** (`SERVE-LEGACY:71`). Hoy la deposita en su propio repo, no en `aiw`
(`SERVE-LEGACY:20-22`), así que la colisión **no es actual**; pero poner el
canónico de AIW en esa ruta lo pondría en el único sitio del sistema que un
emisor de vistas derivadas ya conoce por nombre. `repo_root` no tiene esa
propiedad.

**Ruta canónica que le correspondería, por tanto: `aiw/roadmap/roadmap.json`** —
carpeta nueva, trackeable, sin colisión con nada existente en `aiw`, y la misma
que ya usa `aiw-console`.

Consecuencia que hay que decidir, no un detalle: **el momento en que ese archivo
exista y conforme, `detectRootMode(aiw)` deja de devolver `aiw_objectives` y
devuelve `roadmap_tree`** (`PROJ:792-793`). Los dos modos son excluyentes por
root. Ver riesgo R2.

## 4.3 Índice de docs curado: NO tiene, y el escaneo saldría mal

`buildDocsIndex` (`PROJ:1089`) transporta el índice si el proyecto curó el suyo en
la ruta de su layout, y **escanea el corpus si no** (`PROJ:1091`). Medido:

| Proyecto | ¿Curado? | Ruta | Docs emitidos |
|---|---|---|---:|
| cantu-studio | **sí** | `.aiw/docs/docs_index.json` | 140 (transportados, con `docs_source`) |
| aiw-console | no | (`docs/docs_index.json` ausente) | 45 (escaneados) |
| **aiw** | **no** | — | **70 escaneados, y 67 no son documentos** |

El escaneo salta solo `.git`, `.aiw`, `.project`, `node_modules` y `tests`
(`PROJ:700`) y **no consulta `.gitignore`**. Conté los `.md` que vería en `aiw`:
**70**. De esos:

- **3** son documentos de verdad, y clasificarían `primary` por estar en la raíz
  (`PROJ:694`): `CONSTITUCION.md`, `CONTEXTO.md`, `claude.md`;
- **33** son fragmentos de log de run (`logs/*/objective.md`,
  `round1_executor.md`, `round1_reviewer.md`, `summary.md`) más
  `logs/DIAG-roadmap-invalid.md` y `logs/INCIDENT-2026-07-11.md` — todos
  **gitignoreados**, es decir presentes solo en esta máquina;
- **22** son tickets de objetivo (incluidas las dos carpetas que el proyector de
  roadmap ni mira);
- **1** es un fixture de sandbox (`sandbox/000-sandbox.md`, también gitignoreado);
- **11** son prompts, records históricos y el template.

Todos los 67 clasificarían `secondary` por la regla comodín (`PROJ:696`).
**Un índice escaneado de AIW sería ~96 % ruido**, y sería además **distinto en
cada máquina**, porque 34 de las 70 entradas están gitignoreadas. AIW es el único
de los tres proyectos donde el escaneo produce un resultado no reproducible.

## 4.4 El mínimo funcional, artefacto por artefacto

`CONTRATO §8` y `§19`: **un requerido** (`snapshot.json`) y **cinco opcionales**.
`§18` es la puerta: **un archivo sin emisor no entra**. Origen para AIW:

| Artefacto | Estatus | ¿Tendría origen? |
|---|---|---|
| `.project/snapshot.json` | **REQUERIDO** | Sí, salvo su `roadmap_tree`, que necesita el árbol (bloque 3.3). Faltaría además `sources`, que la emisión mode-2 ya produce. |
| `.project/roadmap.json` | opcional | Solo si se escribe el canónico. Es el trabajo entero. |
| `.project/git_history.json` | opcional | **Sí, y limpio.** `aiw` es repo git con `origin` (`github.com/ChrissValdez/aiw`), `refs/remotes/origin/HEAD → origin/main`, **1 rama local** (`main`) y **33 commits**. La regla de `§19` (acotar a la rama por defecto detectada) se satisface sin ambigüedad — mejor caso de los tres. |
| `.project/docs_index.json` | opcional | Sí por escaneo, pero con el resultado de 4.3. Un índice curado sería trabajo nuevo. |
| `.project/guardrails.json` | opcional | **No.** `aiw` no tiene `governance/`. Habría que escribir la fuente declarada. Materia prima en prosa: `CONSTITUCION.md` (2.629 b) y `claude.md` (2.565 b). |
| `.project/no_claims.json` | opcional | **No.** Misma situación. |

Sobre las dos últimas: en `aiw-console` son archivos JSON **mantenidos a mano**
que el proyector republica bajo el sobre del contrato — su propia nota lo dice:
«Declared source, maintained by hand… this file records rules, it does not create
them» (`governance/guardrails.json:2`). Para AIW no existen; escribirlos es
trabajo de redacción, no de emisión. `governance/contract.json` de `aiw-console`
apunta a `context/aiw-console/CONTRATO.md`; el equivalente para AIW sería un
puntero a `CONSTITUCION.md` **[NO VERIFICADO]** — es inferencia por analogía, no
una decisión tomada en ninguna parte.

---

# 5. Estado de ejecución

## 5.1 Qué hay en `logs/`

9 carpetas de run + 2 `.md` sueltos (`DIAG-roadmap-invalid.md`,
`INCIDENT-2026-07-11.md`). Estado final leído de cada `summary.md`:

| Carpeta | Estado | Cerrado (del `summary.md`) | Proyecto |
|---|---|---|---|
| `000-sandbox` | APPROVED | 2026-07-11T01:56:53Z | sandbox |
| `001-console-projector` | APPROVED | 2026-07-11T03:21:58Z | console |
| `002-canonical-path-and-autoproject` | APPROVED | 2026-07-11T06:35:09Z | console |
| `002-…-orphan-20260711` | **sin summary** | — | — |
| `003-roadmap-emitter` | APPROVED | 2026-07-11T06:46:24Z | console |
| `003b-startup-projection-all-views` | APPROVED | 2026-07-11T07:31:00Z | console |
| `004-snapshot-enrichment` | APPROVED | 2026-07-11T07:40:32Z | console |
| `005-roadmap-contract-fix` | APPROVED | **2026-07-19T02:11:11Z** | console |
| `006-roadmap-delivery-path` | APPROVED | **2026-07-19T01:46:04Z** | console |

Todos los runs con veredicto lo tuvieron **en la ronda 1** y con `push: not
configured`. Ninguno consumió más de una ronda. La carpeta huérfana solo tiene
`objective.md` y `preflight.txt` — el `INCIDENT-2026-07-11.md` documenta la
consola cerrada que mató queue+kernel sin cleanup.

**8 runs con desenlace + 1 huérfano.** El proyector los cuenta como «9 recorded
runs» y emite el huérfano como run sin `state`.

## 5.2 Discrepancias entre `logs/` y `objectives/`

Correspondencia medida entre los 11 archivos de `processed/` y las 9 carpetas de
log:

**(a) DOS objetivos tienen run APPROVED cerrado y siguen en `pending/`.**
`005-roadmap-contract-fix` y `006-roadmap-delivery-path`. Sus logs dicen APPROVED
(cerrados el 2026-07-19); sus archivos siguen en `objectives/pending/`.

Causa medida: **`queue.mjs` es lo único que archiva.** Mueve el objetivo a
`processed/<STATE>-<nombre>` (`aiw/queue.mjs:58-60`) al terminar cada run de la
cola. `kernel.mjs` invocado directamente sobre un objetivo suelto **no archiva
nada** — no hay una sola referencia a `processed` en sus 478 líneas. Ambos runs
se corrieron por la vía directa. **[NO VERIFICADO]** que esa fuera la vía: es
inferencia sobre el único mecanismo de archivado que existe, no un registro de
cómo se invocó.

Consecuencias medibles, todas vivas:

- la consola muestra `005-roadmap-contract-fix` como **`active` / Now**
  (`.aiw/views/roadmap.json`, q1) y `006` como `planned`/Ready Next — dos runs que
  ya cerraron APPROVED hace 9 días;
- el snapshot declara `operational_status: "active"` y
  `current_status_summary: "Next objective: 005-roadmap-contract-fix (+1 more
  pending)"` — el «siguiente» es un run terminado;
- los 3 objetivos `parked` cuelgan sintéticamente de 005 y 006 (bloque 3.3.i), y
  como esos dos **nunca pasarán a `completed`** sin que alguien mueva los
  archivos, los 3 quedan en «Later» de forma permanente;
- **el Markdown declara `completed` el merge de 005** (`RM-AIW:108`) — o sea que
  la prosa dice terminado, el log dice APPROVED, y el dato que la consola lee dice
  `active`. Tres verdades sobre lo mismo.

**(b) CUATRO objetivos están en `processed/` sin ninguna evidencia en `logs/`:**
`APPROVED-a-resta`, `APPROVED-b-multiplica`, `HUMAN_REVIEW-999-sandbox-imposible`,
`HUMAN_REVIEW-c-imposible`. Tres de ellos tienen gemelo en
`objectives/queue-e7/` (`a-resta`, `b-multiplica`, `c-imposible`), lo que sitúa su
origen en la época de cualificación del kernel (`aiw/records/QUALIFICATION.md`).
La consola los renderiza como runs terminados —dos `completed`, dos `blocked`—
**sin ningún log detrás**.

**(c) DOS archivos de `processed/` reclaman el id `000`:**
`APPROVED-000-sandbox-suma` y `ERROR-000-sandbox`, contra **una sola** carpeta
`logs/000-sandbox` cuyo `summary.md` dice APPROVED. La consola muestra por tanto
un `completed` y un `blocked` para el mismo número de objetivo.

**(d) Los `summary.md` citan rutas de un workspace DEMOLIDO.** Los 8 dicen
`C:\Users\chris\Documents\AI_Workflow_Workspace\…`, el workspace que O1 declara
demolido en ambas máquinas (`RM-AIW:65-71`). Es correcto como registro histórico
—se escribieron antes de la mudanza y son inmutables— pero significa que **cada
comando «To review in the morning» de cada log apunta a una ruta que ya no
existe**.

**(e) `logs/` está gitignoreado.** Toda la tabla 5.1 vive solo en esta máquina.
La laptop clonó de GitHub (`RM-AIW:73-76`), así que allí AIW no tiene ningún run
registrado, y el knowledge de la cabina tampoco los ve.

## 5.3 ¿Concuerda con lo que el Markdown declara?

**El Markdown de AIW no declara runs propios en ningún objetivo.** Sus 32 bullets
son ítems de trabajo, no runs del kernel, y no hay una sola referencia a
`logs/`, a un `run_id` de AIW o a las cifras de la cola. Los 9 runs medidos
corresponden a trabajo **sobre `aiw-console` y sobre `sandbox`** — coherente con
la regla de que el kernel nunca se ejecuta sobre AIW (`RM-AIW:14-16`), y coherente
con `config.json`, cuyos dos únicos proyectos son `sandbox` y `console`.

Así que la respuesta es: **no hay contradicción, hay ausencia.** El roadmap de
AIW no afirma nada sobre su propia ejecución. La única afirmación cruzada es la de
O4 sobre el merge de 005 (discrepancia (a) arriba).

Lo que sí se pudo verificar del contexto de sesión: `ESTADO.md:65` afirma
«kernel.mjs ~478/500 líneas; 49 tests, último verde 49/49». Medido:
`kernel.mjs` = **478 líneas exactas** ✓; 11 archivos de test con **49 llamadas a
`test()`** en total ✓. **[NO VERIFICADO]** que estén verdes: no se corrió la
suite (`ESTADO.md` mismo lo marca como no re-verificado).

## 5.4 Frescura de lo que la consola muestra hoy de AIW

| Artefacto | mtime | Emisor declarado |
|---|---|---|
| `aiw-console/.aiw/views/project_console.snapshot.json` | 2026-07-22 15:38 | `aiw-projector@0.1.0` |
| `aiw-console/.aiw/views/roadmap.json` | 2026-07-22 15:38 | `aiw-projector@0.1.0` |
| `aiw-console/.aiw/roadmap/roadmap.json` (copia) | 2026-07-22 15:38 | idem |
| `aiw/.aiw/project_console.snapshot.json` | **2026-07-10 23:41** | `aiw-projector@0.1.0`, ruta pre-002 |

El proyector de hoy es **0.9.0** (`PROJ:89`). Los datos de AIW que la consola
tiene disponibles son de hace 6 días y de un emisor 8 versiones menores anterior.
No se re-proyectó en esta medición, por diseño: proyectar escribe.

Nota sobre `RM-AIW:114-117`, que afirma «el server … re-proyecta al arrancar
(project=aiw, objectives=16), Overview/Roadmap/Cola vivas con datos reales».
Esa afirmación es **consistente** con lo medido: el conteo 16 coincide, y el
servidor escribe en su propio repo, no en `aiw`. Lo que **no** está corroborado es
que se haya vuelto a arrancar después del 2026-07-22.

---

# 6. Riesgos y tensiones — reportados, sin resolver

**R1 — Las ocho citas cruzadas del canónico al Markdown están rotas, todas con el
mismo desplazamiento.** Los 8 runs de la tabla 2.3.a citan líneas de `RM-AIW` y
**todas apuntan 8 líneas antes del texto real**. Verificado en tres casos:
`RM-AIW:114-120` (que debería ser «SECUENCIA ACORDADA») cae hoy en el bullet del
merge de 005; el texto real está en **L122-128**. `RM-AIW:152` («Pantalla
multi-proyecto») cae hoy en «Digest para la cabina»; el real está en **L160**.
`RM-AIW:155-157` («Paridad y corte») → real en **L163-165**. La causa es
aritmética: la nota de puntero (L100-107, 8 líneas) se insertó el 2026-07-24
**después** de que D-046 redactara O4 con esas citas, y no se re-numeraron. Es
podredumbre de referencia de libro: el canónico cita al histórico por número de
línea, y el histórico se editó una vez más.

**R2 — Escribir el canónico de AIW cambia el modo de su root, y los dos modos son
excluyentes.** `detectRootMode` devuelve `roadmap_tree` **o** `aiw_objectives`,
nunca ambos (`PROJ:792-793`). En el instante en que exista un
`roadmap_tree_v1` conforme en una ruta de layout dentro de `aiw`, el root deja de
estar en modo 1. AIW es **el único proyecto cuyas carpetas planas SON su cola de
trabajo viva**: los 16 objetivos con su clasificación pending/parked/processed son
el estado operativo del kernel, no un plan. La tensión, sin resolver: el modo 2
lee un árbol y no sabe nada de `objectives/`. **[NO VERIFICADO]** si el emisor
mode-1 seguiría corriendo por otra vía — el servidor legacy llama `buildSnapshot`
y `buildRoadmap` incondicionalmente (`SERVE-LEGACY:56-72`), sin consultar el modo,
así que **[NO VERIFICADO]** que las dos vistas desaparecerían; lo verificado es
que el shell nuevo y las tres rutas de escritura sí exigen layout.

**R3 — `aiw-console/.aiw/roadmap/roadmap.json` contiene HOY el roadmap proyectado
de AIW, en una ruta que es una layout conocida.** Medido: ese archivo existe en
`aiw-console` y `project_local_aiw` lo probaría. Dos cosas independientes impiden
la mala identificación: `repo_root` se prueba primero (`PROJ:623`), y el archivo
**no** conforma la shape gate (sus niveles no llevan ids). El comentario del código
lo dice explícitamente (`PROJ:741-744`): exigir los ids es lo que mantiene una raíz
AIW proyectada en modo 1 «instead of flipping it into mode 2 on the next run».
La tensión: **la separación depende de que la vista mode-1 nunca gane ids.** Si
alguna vez se le añadieran (p. ej. para satisfacer el mismo contrato), el orden de
la lista pasaría a ser la única defensa.

**R4 — El `run_id` de AIW muta hoy, y el propio contrato lo llama violación.**
Detalle en 3.3.ii. Es riesgo actual, no de la conversión: cada vez que un
objetivo se archiva, su identidad en la proyección cambia. `CONTRATO §10.d`
Regla 1.b lo declara violación del contrato y lo asigna al tramo 2.

**R5 — Colisión de `objective_id` entre los tres proyectos.** Medido:

| Proyecto | `objective_id` presentes |
|---|---|
| aiw-console | `O0`, `O4` |
| cantu-studio | `O1`, `O2`, `O3`, `O4`, `O5`, `O6`, `O7` |
| AIW (Markdown) | `O1`, `O2`, `O3`, `O4`, `O5`, `O6` |

Los seis de AIW colisionan léxicamente con los de Cantu, y su `O4` colisiona con
el `O4` de `aiw-console` — que además **habla del mismo tema** («Consola global» /
«Global Console»), lo que hace la colisión especialmente engañosa. Nótese lo que
NO dice el contrato: `§10.d` Regla 1 exige unicidad global del **`run_id`**, y no
dice nada del `objective_id`. Así que hoy **la colisión es legal**. Ejemplos ya en
disco de la ambigüedad: `O4` de Cantu es «Cantu Studio UX» (1 fase, 1 run) y `O4`
de la consola es «Global Console» (15 fases, 30 runs).

**R6 — `roadmap_id` no identifica al proyecto.** Medido: `RM-CONSOLE.roadmap_id`
= `"roadmap"` y `RM-CANTU.roadmap_id` = `"roadmap"`. Es el nombre del archivo, no
del proyecto. Si AIW adopta la misma convención, tres roadmaps declararán el mismo
`roadmap_id`.

**R7 — `queue_order` es por-roadmap, no global, y ya hay una prioridad sin
resolver.** Medido: `RM-CONSOLE` usa 1..45 (denso, único) y `RM-CANTU` usa 1..71
(denso, único) — los dos arrancan en 1. AIW estrenaría un tercer espacio 1..N.
D-046 dejó abierto y fechado el pendiente vecino: «prioridad O0 vs O4 en la cola…
Debe resolverse **antes del tramo 5**, cuando la consola global pase a ser la
fuente del orden». Un tercer proyecto con su propia secuencia desde 1 añade una
dimensión a esa pregunta antes de que la primera esté contestada.

**R8 — Dos documentos de gobernanza se contradicen sobre qué repo es el knowledge
sincronizable.** Detalle en 1.1: `RM-AIW:5-8` vs `aiw/CONTEXTO.md`. Importa porque
de esa afirmación depende la regla operativa «push → sync; sin confirmación de
sync, lo leído es `[NO VERIFICADO]`».

**R9 — `ESTADO.md` está stale de una forma que induce a error, no solo vieja.**
Su sección «SIGUIENTE — Consola maestra» (`ESTADO.md:36-47`) lista los cuatro
pasos 1..4 como el arranque de la próxima sesión. Medido contra el canónico:
el paso 1 (Audit/Phase 0) está `completed`, el 2 (Contrato) `completed` con 6
runs, el 4 (La consola los lee) `completed`. Su «Deuda anotada» dice además «AIW:
el roadmap sigue en markdown temporal; por eso AIW aún no se renderiza con datos
v3 reales en la consola» (`ESTADO.md:61-62`) — eso sí sigue exacto.

**R10 — La evidencia de ejecución de AIW no es portable.** `logs/` y `.aiw/`
gitignoreados (3.1): 0 archivos trackeados de cada uno. Cualquier lectura del
estado de ejecución de AIW hecha desde la laptop, desde el knowledge de la cabina
o desde un clon fresco **verá cero runs**. Y un `docs_index` escaneado de AIW
saldría distinto en cada máquina (4.3).

**R11 — El snapshot de AIW emite 16 títulos que dicen «Project».** Detalle en
3.2.A. Es un defecto vivo del emisor (`PROJ:148-151`, `PROJ:161`), no del dato:
los tickets tienen su `# Objective` en su sitio y la vista de roadmap sí lo lee
bien. Convive con el arreglo de 005, que solo cubrió la vista de roadmap.

**R12 — El snapshot mode-1 no lleva `sources`, que `CONTRATO §3` exige.**
Medido: las 14 claves del snapshot de AIW no incluyen `sources`. `§6` la promovió
a requerida y es lo que permite comparar dos lecturas del mismo estado. La
emisión mode-2 sí la produce (medido en `aiw-console/.project/docs_index.json`,
que lleva `sources` con 45 entradas `{path, mtime}`).

**R13 — Dos objetivos con run cerrado siguen en la cola, y no hay mecanismo que
lo detecte.** Detalle en 5.2.a. Nada en el sistema compara `logs/` contra
`objectives/`: el proyector lee las dos cosas y las emite en campos distintos
(`roadmap_tree.objectives` y `latest_history_items`) sin cruzarlas nunca.

**R14 — Dos carpetas de objetivos son invisibles a la consola.**
`objectives/qualification/` y `objectives/queue-e7/` (6 archivos, trackeados en
git) quedan fuera de `OBJECTIVE_CLASSIFICATIONS` (`PROJ:97`). Están en disco, en
el repo y en el remoto, y no aparecen en ninguna vista. Cuatro de los objetivos
que **sí** aparecen (5.2.b) son sus gemelos archivados.

---

# Lo que este record NO hace

No convierte el roadmap de AIW. No escribe su `roadmap.json`. No retira O4 de su
Markdown. No emite ni re-emite ningún `.project/`. No propone un plan, no ordena
el trabajo y no decide qué mejoras entran — eso lo hace la cabina con el operador.
No corrige ninguna de las 14 tensiones del bloque 6, ni las 8 citas rotas de R1.
No toca el `.gitignore` de `aiw` ni ninguna otra cosa de `aiw`. Aquí se MIDE.
