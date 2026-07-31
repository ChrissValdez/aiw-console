# EL PROYECTOR Y LOS BANCOS DE CASOS DE EVALUACIÓN DE AIW

Qué leía el proyector bajo `aiw/objectives/`, qué hacía con lo que no leía, los
dos desenlaces que se le plantearon al operador, cuál eligió y qué se
implementó.

**Run:** `RUN-CONSOLE-PROJECTOR-CASE-BANKS-001` (`queue_order` 42, O4.P15,
`roadmap/roadmap.json`). **Medición ejecutada el 2026-07-31**; todas las cifras
de este record son de esa fecha y se leyeron de disco.

**Frontera:** se escribió **solo** en `aiw-console`. `aiw` se leyó y quedó sin
modificar (§8). `cantu-studio` no se tocó.

---

## 1. La medición — qué leía el proyector

### 1.a Las rutas, con archivo y línea

Hay **exactamente dos** funciones en
[`tools/projector/project.mjs`](../../../tools/projector/project.mjs) que leen
`objectives/`, y ambas iteran la misma constante.

**Las líneas de esta sección son las de las fuentes TAL COMO SE MIDIERON**, es
decir antes del cambio de §6 — son las mismas que cita
`DISPOSICION-CARPETAS-COLA-AIW.md §9`. El cambio añadió 8 líneas de comentario
de versión arriba, así que hoy están 8 más abajo (`:105`, `:162-180`,
`:252-276`); las de §6 sí son del árbol vigente.

| Sitio | Qué es |
|---|---|
| `project.mjs:97` | `const OBJECTIVE_CLASSIFICATIONS = ["pending", "parked", "processed"];` |
| `project.mjs:154-172` | `readObjectives()` — `:155` `join(root,"objectives")`, `:158` `join(objectivesDir, classification)`, `:159` `safeReadDirNames(dir)`, `:160` filtro `.md` |
| `project.mjs:244-268` | `readObjectiveDetails()` — mismas tres carpetas (`:247-249`) |

**El patrón no es un glob**: es una lista literal de tres nombres más una
concatenación. `safeReadDirNames` (`:134-145`) filtra `entry.isFile()` y no
recursa. Incluye `objectives/{pending,parked,processed}/*.md`, primer nivel,
solo archivos. Excluye todo lo demás.

### 1.b La capa que invalidó el arreglo que se había nombrado

`aiw` **ya no entra por ese código**. Medido:

```
detectRootMode(aiw)   = roadmap_tree
detectRootLayout(aiw) = repo_root  →  roadmap/roadmap.json
```

`aiw/roadmap/roadmap.json` existe (100 835 bytes, 6 objetivos,
`schema_version: "roadmap_tree_v1"`) desde el volteo de modo de **D-052**, así
que `detectRootLayout` (`:820-826`) lo reclama para el modo 2 y el CLI (`:1735`)
toma la rama `writeProjectFolder`. Esa rama no llama a `readObjectives` ni a
`readObjectiveDetails` en ningún punto: sus únicos llamadores son
`buildSnapshot:519` y `buildRoadmap:279`, ambos del modo 1.

Prueba en disco — `aiw/.project/snapshot.json`, emitido por
`aiw-projector@0.9.0` el `2026-07-31T03:03:32.729Z`:

```json
"sources": [{ "path": "roadmap/roadmap.json", "mtime": "2026-07-31T03:03:32.724Z" }]
```

Una sola fuente. **`objectives/` no era insumo de nada** para `aiw`: ni las tres
carpetas de ciclo de vida ni los dos bancos.

**Consecuencia registrada:** la vía que `DISPOSICION-CARPETAS-COLA-AIW.md §9`
había nombrado —añadir `"qualification"` y `"queue-e7"` a
`OBJECTIVE_CLASSIFICATIONS` (`project.mjs:97`)— **hoy no cambiaría un byte del
artefacto de `aiw`**. Esa línea es código muerto para esta raíz. §9 era correcto
para su fecha; el disco se movió debajo. §9 es historia congelada y **no se
corrige** (D-042).

### 1.c Qué hacía con lo que no leía — la pregunta central del run

**Las omitía en silencio: ni las contaba, ni las anunciaba, por ningún canal.**

`objectives/` nunca se enumeraba — no existía llamada a
`safeReadDirNames(join(root,"objectives"))` en el archivo—, así que
`qualification/` y `queue-e7/` no estaban *excluidas*: eran **desconocidas**. No
aparecían en `sources` (§6, `:1038`), que solo lista lo leído; ni en
`emitted_artifacts` (`:1678-1681`), que declara archivos escritos de `.project/`
y no insumos. No había conteo, ni bloque, ni clave omitida con razón.

Medido sobre el snapshot real de `aiw`: **6 valores string** mencionaban los
bancos, y los seis eran **prosa transportada verbatim** dentro de
`full_description`/`summary` de runs del propio roadmap de `aiw`. **Cero datos.**

**Y en el modo 1, además, una afirmación que el disco refuta** — ver §7, que la
nombra y no la arregla.

### 1.d ¿Es el patrón de los dos canales de `EMISION-PROJECT-AIW.md §5.3`?

**No. Es un patrón distinto, y peor.**
[`EMISION-PROJECT-AIW.md` §5.3](EMISION-PROJECT-AIW.md) («Cómo se anuncia — hay
DOS canales, y solo uno cubre a AIW», líneas 344-408) mide un **artefacto de
salida** con dos canales, de los cuales **uno sí dispara**:

| | §5.3 (`guardrails` / `no_claims`) | Los bancos de casos |
|---|---|---|
| Qué falta | una **salida** que el emisor sabe construir | una **entrada** que el emisor no conceptúa |
| Canal 1 — `emitted_artifacts` | callado, **y razonado** (`PROJ:999-1004`, §18 vs §20) | no aplica: no es archivo de `.project/` |
| Canal 2 — banner por sección | **DISPARA**, nombrando el archivo (`PCJS:2834-2848`) | **no existe surface** que pueda disparar |
| Naturaleza del silencio | **decisión**, escrita y defendida en el emisor | **ausencia de decisión**: ninguna línea los consideró |

Verificado en el consumidor vivo: `grep` de `qualification|queue-e7|objectives/`
sobre `project-console/assets/project-console.js` da **una sola coincidencia**
(`:4876`, mensaje de rechazo de un árbol malformado). El consumidor no tiene
noción de carpetas de `objectives/`.

§5.3 es *«dos canales, uno cubre»*. Los bancos eran **cero canales**. Lo más
cercano en aquel record es su §5.4 («emisor SÍ, fuente NO»); los bancos estaban
un escalón más allá: ni emisor, ni fuente, ni concepto.

La doctrina que aplica ya estaba adjudicada en `CONTRATO.md:1068-1069`:

> «renderizar sin anunciar la ausencia **afirma que el dato no existe, y eso es
> mentira** (§20) […] Fallar ruidoso, nunca silencioso — también dentro de un
> campo.»

### 1.e Qué dejó pendiente `DISPOSICION-CARPETAS-COLA-AIW.md §9`

[§9](DISPOSICION-CARPETAS-COLA-AIW.md) («El proyector queda fuera, y por qué»,
líneas 438-461) dejó tres cosas, en sus términos:

1. La vía técnica con su línea: *«añadir `"qualification"` y `"queue-e7"` a
   `OBJECTIVE_CLASSIFICATIONS` (`…project.mjs:97`). El conteo pasaría de 16 a 22
   y los seis aparecerían en las vistas.»*
2. La razón de no tocarlo, **de frontera y no de criterio**: *«ese código vive en
   `aiw-console`, no en `aiw`. […] Modificar el proyector sería escribir fuera de
   ella.»*
3. La advertencia sobre el desenlace: *«si los seis son fixtures de evaluación,
   hacerlos visibles como ítems de cola le enseñaría a la consola seis trabajos
   pendientes que nadie va a ejecutar […]. Eso es cambiar una invisibilidad por
   una mentira.»*

Y lo pasó a este hilo condicionado a `#24`: *«decidir si el proyector debe
exponer las carpetas de casos de evaluación, y bajo qué clasificación, una vez
que `#24` establezca la convención»*. La condición **está cumplida**: la
convención se publicó y su §10 devuelve la pelota aquí — *«No decide sobre la
visibilidad en consola de los bancos […]: es del hilo de `aiw-console`»*.

---

## 2. Las cifras reales, contra disco — 2026-07-31

| Ubicación | Casos `.md` | Archivos primer nivel |
|---|---|---|
| `objectives/qualification/` | **3** | 3 |
| `objectives/queue-e7/` | **3** | 3 |
| **Suma de los dos bancos** | **6** | 6 |
| `sandbox/` | **1** (`000-sandbox.md`) | — |
| **Total** | **7** | — |

`qualification/`: `e5-secreto.md`, `e6-changes-requerido.md`,
`e8-multiarchivo.md`. `queue-e7/`: `a-resta.md`, `b-multiplica.md`,
`c-imposible.md`. Ninguna de las dos tiene subdirectorios ni archivos que no
sean esos.

**El valor del texto del run VERIFICA.** Decía *«six across the two banks plus a
seventh generated under sandbox/»*; el disco da 6 + 1 = 7. Sin discrepancia y
sin corrección al texto del run.

Precisión sobre el séptimo: `sandbox/000-sandbox.md` está **gitignoreado**
(`git check-ignore -v` → `.gitignore:1:sandbox/`) y su fuente de verdad es el
generador, no el archivo (convención §2). No es un artefacto de disco que deba
existir.

md5 de los siete, como traza:

```
b59c86f0e9fa3de827bff3e28c02f8b5  objectives/qualification/e5-secreto.md
dcde231a28a065f2a979326f093aaf6c  objectives/qualification/e6-changes-requerido.md
e8a4f4669337780fdf88ba679c8ddd4a  objectives/qualification/e8-multiarchivo.md
0dbe188bd4b68f86cdafcbb0d439b2b9  objectives/queue-e7/a-resta.md
3b658f20e3c56fda7cccb8e5c9e78e2d  objectives/queue-e7/b-multiplica.md
892e5c30f669627c607464c6fcca8911  objectives/queue-e7/c-imposible.md
8b063ee0350a30b89f27fe6895e349fd  sandbox/000-sandbox.md
```

**Conteo del resto de `objectives/`, medido el mismo día:** `pending/` 0 `.md`
(1 archivo: `.gitkeep`), `parked/` 3, `processed/` 13 `.md` (14 archivos: 13 +
`.gitkeep`).

---

## 3. Qué ES un caso de evaluación, y qué forma tiene un banco

Según
`aiw/docs/kernel/CONVENCION-DE-CASOS-DE-EVALUACION.md` §1 (adjudicación 1.a): un
caso de evaluación es **un ticket vivo y ejecutable — un `.md` que el parser
vigente parsea y que existe para producir, al ejecutarse, un desenlace declarado
del kernel o de la cola**. Su identidad es la del artefacto que existe **para
volver a correr**; el registro de sus ejecuciones en `processed/` es su
**procedencia**, nunca el caso. Su vida tiene dos niveles (§5):
*vivo-que-parsea*, garantizado por la suite; y *vivo-que-produce-su-desenlace*,
que solo prueba una ejecución real y queda `[NO VERIFICADO]` entre
calificaciones.

**Un caso no tiene estado de trabajo.** No está `planned`, `active` ni
`completed`. Ninguno de los cuatro tokens de `RUN_STATUSES` (`project.mjs:699`)
puede escribirse sobre un caso sin mentir. Eso es lo que descartó el desenlace de
proyectarlos como cola.

**Forma de un banco: ninguna de las tres.** Un banco es un directorio plano de
`.md`, sin manifiesto, sin ids, sin orden. Un caso por dentro
(`objectives/queue-e7/a-resta.md`) lleva `# Project`, `# Objective`,
`# Acceptance criteria`, `# Scope`, `# Out of scope`, `# Verification` — y ni
`run_id`, ni `status`, ni `queue_order`, ni `depends_on`. Contra la puerta de
forma del emisor (`hasRoadmapTreeShape`, `:789-805`):

| Forma | Requiere | ¿Cumple? |
|---|---|---|
| Objetivo | `objective_id` + `phases[]` | **No** |
| Fase | `phase_id` + `runs[]` | **No** |
| Run | `run_id` + `status` | **No** — no tiene ninguno de los dos |

Lo que es: un **inventario de fixtures**. La convención §2 los clasifica como
**clase E/I — insumo/fixture, no son documentación y no se indexan**.

**Hallazgo colateral que pesó en la elección:** la *declaración* de los casos
**sí llega hoy a la consola**. `aiw/docs/docs_index.json` (15 entradas curadas)
incluye `docs/kernel/CASOS-DE-EVALUACION.md` y
`docs/kernel/CONVENCION-DE-CASOS-DE-EVALUACION.md`, ambas `nav_tier: primary`,
`default_visible: true`; y `aiw/.project/docs_index.json` las transporta
(`docs_source.mode = transported`, `curated_entries 15 → transported 15`,
`unresolved []`). El humano ya podía leer los siete casos con su escenario, su
arnés y su desenlace declarado en la pestaña Docs. **Lo que faltaba no era la
información: era que el emisor admitiera que decidió no proyectar las carpetas.**

---

## 4. Los dos desenlaces, tal como se plantearon

Se presentaron como **dos reparaciones distintas**, no como arreglar contra no
arreglar: el defecto medido era la omisión silenciosa, y los dos lo reparaban.

**(1) SE PROYECTAN.** Forma propuesta: un artefacto opcional propio
`.project/case_banks.json`, declarado en `emitted_artifacts`, más un resumen en
el snapshot — el precedente de `no_claims_summary` (`:1075-1078`). Fuera de
`roadmap_tree`, `blockers` y `followups`; sin `status` ni `queue_order`, de modo
que fuese estructuralmente imposible que apareciera en Now / Ready Next / Later.
En pantalla: un panel de solo lectura con los dos bancos, sus rutas, sus
conteos, sus casos, el caso generado declarado como generado, y puntero a
`CASOS-DE-EVALUACION.md`. **Coste:** enmienda a `CONTRATO §19`; superficie nueva
en el consumidor vivo; y sobre todo **un problema de fuente sin resolver** —
hornear `"qualification"` y `"queue-e7"` en el código viola §10.c, y la forma
honesta (que el proyecto declare sus bancos y el emisor transporte) exige
escribir **dentro de `aiw`**, fuera del alcance de este encargo.

**(2) NO SE PROYECTAN, Y EL EMISOR LO DICE.** Un bloque derivado en el snapshot
que enumere lo que esta emisión **no leyó** bajo `objectives/`, con su conteo y
la razón. **Coste:** un insumo nuevo y un bloque nuevo; ninguna enmienda a la
lista de artefactos; **cero dependencias cruzadas**; cero riesgo de pintar
fixtures como trabajo.

**Recomendación dada:** (2).

---

## 5. Qué eligió el operador, y con qué razón

**DESENLACE (2)**, decidido por cabina. Razón registrada, en sus términos:

> «(1) no se completa dentro de la frontera de este encargo, y media reparación
> con la otra mitad nombrada para otro hilo es peor que una reparación entera.
> Además, el defecto medido es que el emisor no dice lo que hizo; eso se repara
> en el emisor, no en una pantalla nueva.»

**La no-proyección es, desde este run, una DECISIÓN DECLARADA.** No se calla: se
escribe en el artefacto, en las claves `unprojected_inputs` y
`unprojected_inputs_reason` de `.project/snapshot.json` (§6.d dice dónde
mirarlas).

La cabina corrigió además dos cosas de la forma propuesta, y ambas entraron:

1. **Fuera la semántica de proyecto.** `reason: "evaluation case bank"` y
   `declared_in: docs/kernel/…` eran conocimiento que el emisor no puede tener
   sin nombrar el proyecto — el mismo §10.c con el que se había descartado la
   fuente de (1). Se retiraron los dos campos.
2. **Listar solo los dos bancos habría creado un silencio nuevo.** Implicaría
   que `pending/parked/processed` sí se proyectan, y en modo 2 tampoco: la única
   fuente es `roadmap/roadmap.json` y `objectives/` **entero** queda fuera.
   *«Declarar dos de cinco es una verdad a medias que se lee como una mentira
   entera.»* El bloque declara **las cinco**.

---

## 6. Qué se implementó

Versión del emisor: **0.9.0 → 0.10.0** (`project.mjs:97`). §6 del contrato lo
exige: un emisor que declara lo que omitió no es el emisor que lo omitía en
silencio.

### 6.a La derivación

`unprojectedObjectiveInputs(root, reader)`, `project.mjs:308-326`, más los dos
descriptores de lector, `aiwObjectivesReader()` (`:328-335`) y
`roadmapTreeReader(layout)` (`:337-345`). Los dos puntos de emisión son `:648`
(modo 1, junto a `taxonomy_model`) y `:1165` (modo 2). Enumera los
subdirectorios inmediatos de `<root>/objectives/` y filtra los que **esta
emisión** no leyó:

- modo `roadmap_tree` → **todos**, porque `objectives/` no es insumo ninguno;
- modo `aiw_objectives` → los que caen fuera de `OBJECTIVE_CLASSIFICATIONS`.

**Ningún nombre de banco ni de proyecto entró al código.** Los nombres de
carpeta salen de disco; el conjunto «no leído» sale del modo. Una carpeta nueva
bajo `objectives/` se declara sola, sin editar nada — es la regla que
`ROOT_LAYOUTS` y `DOCS_NAV_TIER_RULES` ya seguían, y hay un test que la vigila
mecánicamente en vez de pedir que alguien la recuerde.

### 6.b La forma emitida

- **`unprojected_inputs`** — array. Cada entrada: `path` (relativa a la raíz,
  POSIX, §7) y `entries` (conteo de **archivos de primer nivel**). Nada más.
- **`unprojected_inputs_reason`** — **una** cadena, derivada del modo, hermana
  de la anterior. Nombra el modo y, en modo 2, el layout y la ruta del plan que
  se leyó en lugar de `objectives/`. **No dice nada del contenido** de las
  carpetas: el emisor no las abrió, así que cualquier afirmación sobre ellas
  sería inventada. Hay un test que prohíbe las palabras `case`, `bank`,
  `evaluation`, `fixture`, `qualification` y `queue-e7` en esa cadena.

**Por qué clave hermana y no un campo por entrada** (decisión de forma que la
respuesta del operador no fijaba; se preguntó antes de implementar, criterio
D3). Con la cadena en un solo sitio, *«idéntica para todas»* deja de ser un
invariante que hay que sostener y pasa a ser **estructuralmente imposible de
romper**; repetida por entrada sería una propiedad mantenida a mano en cada
emisión. Y sigue el idioma que el emisor ya tenía: `docs_source`,
`nav_tier_model` y `taxonomy_model` ponen la regla a nivel de bloque y dejan la
lista como datos.

**Las dos claves viajan JUNTAS por construcción**: una sola función devuelve las
dos o ninguna, y los llamadores la esparcen con un solo spread. Una lista sin su
razón es el mismo silencio que este run repara, un nivel más abajo.

### 6.c La decisión de la carpeta ausente — cuál se implementó y por qué

**Si `<root>/objectives/` no existe, se OMITE EL PAR ENTERO.** Ninguna de las
dos claves se emite.

**Por qué esta y no la lista vacía:** porque las dos situaciones son distintas y
colapsarlas perdería una medición real.

- `[]` afirma **«enumeré `objectives/` y no había nada sin leer»** — una
  medición honesta, que es lo que emite un root en modo 1 cuyas únicas carpetas
  son las tres que sí lee.
- La clave ausente afirma **«no había nada que enumerar»**.

Emitir `[]` donde no hay carpeta sería afirmar lo primero cuando lo cierto es lo
segundo. Es §7 del contrato aplicado a una clave —*una clave sin contenido
honesto se omite, jamás se inventa*— y es exactamente la llamada que
`emitted_artifacts` ya hace en `project.mjs:1051-1053`. Hay un test por cada uno
de los dos casos, para que la distinción no dependa del azar.

### 6.d Dónde queda declarada la omisión, en el artefacto

En **`.project/snapshot.json`**, dos claves de nivel superior, hermanas de
`taxonomy_model`. Para `aiw`, la emisión diría hoy (construido en memoria, sin
escribir en `aiw`):

```json
"unprojected_inputs_reason": "root read in mode roadmap_tree (layout repo_root, plan at roadmap/roadmap.json): objectives/ is not an input of this mode",
"unprojected_inputs": [
  { "path": "objectives/parked",        "entries": 3  },
  { "path": "objectives/pending",       "entries": 1  },
  { "path": "objectives/processed",     "entries": 14 },
  { "path": "objectives/qualification", "entries": 3  },
  { "path": "objectives/queue-e7",      "entries": 3  }
]
```

**Nota sobre `entries` frente a la tabla de §2:** `entries` cuenta **archivos de
primer nivel**, tal como se especificó — no casos. Por eso `pending` da 1 y
`processed` 14: ambas llevan un `.gitkeep`. En los dos bancos no hay `.gitkeep`,
así que `entries` coincide con el conteo de casos: 3 y 3. Es deliberado que el
emisor cuente archivos y no casos: decidir qué archivo *es* un caso sería
semántica del contenido, que es justo lo que este bloque no afirma.

En el modo 1 el par se emite igual, en
`.aiw/views/project_console.snapshot.json`, listando solo lo que cae fuera de
las tres. Se implementaron los dos modos porque la instrucción especificó las
dos ramas de la derivación; con solo el modo 2 la rama del modo 1 sería código
muerto.

### 6.e ACOTAMIENTO DECLARADO

**El bloque cubre `objectives/`, no «todo lo no leído».** No es un manifiesto de
todo lo que el emisor dejó de leer en la raíz. Queda escrito aquí, y también en
el comentario de cabecera de la función y en el del archivo de test, para que
nadie lo lea como garantía general.

### 6.f El espejo `roadmapQueueGroup` (D4)

**El cambio NO lo toca.** No crea runs, no toca `roadmapQueueGroup`
(`project.mjs:444`) ni ninguna de sus entradas. Su vigilante,
`tests/console-queue-keyspace.test.mjs`, se corrió aparte y quedó **verde, 6/6**.

---

## 7. Medido y NOMBRADO, sin arreglar: el modo 1 afirma algo que el disco refuta

**El defecto.** `buildSnapshot` (modo 1) declara
`taxonomy_model.objective_classifications = ["pending","parked","processed"]`
(`project.mjs:566-569` antes del cambio) — un **vocabulario cerrado de tres** —
y emite `counts.total` (`:552-561`) como si fuera el total de la carpeta.
Ejecutado contra `aiw` el 2026-07-31 (en memoria):

```
counts = {"pending":0,"parked":3,"processed":13,"total":16}
objective_classifications = ["pending","parked","processed"]
```

`total: 16` sobre un disco con **22** archivos `.md` de ticket en `objectives/`,
bajo un vocabulario cerrado de tres tokens contra un disco de cinco carpetas.
**Eso no es una omisión: es una afirmación que el disco refuta.**

**¿Lo alcanza algún consumidor VIVO hoy? NO.** Evidencia:

| Llamador de `buildSnapshot`/`buildRoadmap`/`writeSnapshot` fuera de tests | Estado |
|---|---|
| `tools/project-console/serve-project-console.mjs:37-38`, `:56-64` (`PROJECTED_VIEWS`) | Su `ENTRY` es `/docs/project-console/index.html` (`:74`) — **el fork descartado** |
| `tools/projector/project.mjs:1749` (CLI) | Solo se alcanza si `detectRootMode(root) !== "roadmap_tree"` |

Y el servidor **vivo** es otro: `start-console.cmd` → `start-console.ps1:33`
(`$SERVER_RELATIVE = "project-console\serve.mjs"`) → `project-console/serve.mjs`,
que importa **solo** las constantes `PROJECT_*` del modo 2 y emite con
`writeProjectFolder` (`:98`, `:559`, `:810`). **No importa `buildSnapshot` ni
`buildRoadmap`.** Además, las tres raíces de `project-console/projects.json`
están las tres en modo 2:

```
aiw-console    -> roadmap_tree | layout: repo_root
cantu-studio   -> roadmap_tree | layout: project_local_aiw
aiw            -> roadmap_tree | layout: repo_root
```

así que ni siquiera la rama CLI llegaría al modo 1 para ninguna de ellas.
Corrobora la fecha: `aiw-console/.aiw/views/project_console.snapshot.json` está
fechado **2026-07-22 por `aiw-projector@0.1.0`**.

**No se tocó**, por instrucción. Queda nombrado como candidato a run propio.

---

## 8. Verificación

| Criterio | Esperado en el ticket | **Real medido** | |
|---|---|---|---|
| **E1** — suite | 316 | **325 tests, 325 pass, 0 fail** — 316 previos intactos + 9 nuevos | ✅ |
| **E3** — canónico vs `.project/roadmap.json` | 52 / 41 / 11 / 1 | **52 runs · 41 `completed` · 10 `planned` · 1 `active`**, idénticos en los dos archivos (2 objetivos, 19 fases) | ver nota |
| **E2** — porcelain | idéntico | **idéntico** antes y después de una corrida completa | ✅ |
| **E4** — `aiw` sin modificar | — | `git status --porcelain` **vacío**, antes y después | ✅ |

**Sobre E3:** el ticket decía 11 `planned`, que suma 53 y es imposible. La
cabina lo corrigió a 41/10/1 = 52 y la medición contra disco **coincide con la
corrección**, en las dos fuentes por separado.

**D2 — la comprobación de rojo.** Los 9 tests nuevos se corrieron **contra las
fuentes previas**, sin tocar el proyector: **8 fallaron, 1 pasó**. El que pasó
—«`objectives/` absent: NEITHER key is emitted»— pasó **de vacío**: ninguna de
las dos claves existía aún, así que afirmaba un invariante que debía sobrevivir
al cambio, no la funcionalidad. Tras el cambio: **9/9 verde**.

---

## 9. Residual y trabajo nombrado, no hecho

1. **No hay UI en este run.** El dato entra al artefacto y ahí se queda.
   Renderizar `unprojected_inputs` es superficie de consola y su sitio es el
   **run de UI/UX de la consola global**, no éste.
2. **La afirmación del modo 1** (§7) queda medida y sin tocar.
3. **`#42` debe quedar en `completed`.** Este encargo lo declara; el cambio de
   `status` y la re-emisión de `.project/` los hace el operador desde la
   consola, no este run.
4. **`aiw` no se tocó** y no hay nada que pasarle a su hilo por este run: la
   reparación era enteramente de `aiw-console`.
5. **`CONTRATO.md` no se enmendó**, y la guarda que lo decidió está en §10.

---

## 10. La guarda de contrato — resultado y evidencia

**Pregunta:** ¿cierra `context/aiw-console/CONTRATO.md` el conjunto de claves de
nivel superior de `snapshot.json`?

**Respuesta: NO lo cierra.** Por tanto se implementó **sin tocar el contrato**, y
la rama que habría exigido registrar una decisión **no se activó**.

Evidencia:

1. **§3 se titula «Claves requeridas»** y lista un mínimo requerido (14 claves).
   No hay cláusula de cierre en ninguna parte del documento: `grep` de
   `conjunto de claves|claves cerrad|exhaustiv|ninguna otra clave|no se añaden
   claves|claves adicionales|solo estas claves` devuelve **cero** coincidencias
   normativas. Los únicos «cerrado» del documento son vocabularios de **valores**
   —§11.a (tokens de `status`) y §10.e (carriles y barriers)—, no el conjunto de
   claves.
2. **§8 cierra otra cosa**: se titula «El conjunto **requerido** no crece sin
   decisión» y habla de **archivos requeridos** («Hoy: **un** archivo
   requerido»), no de claves.
3. **Precedente en disco, decisivo**: el emisor **ya** emitía una clave de nivel
   superior ausente de la tabla de §3 — `emitted_artifacts` (`project.mjs:1054`,
   añadida por O4.P13) — y `CONTRATO.md` la menciona **cero veces**. Está en
   disco en los snapshots de `aiw` y de `aiw-console`. Si el conjunto estuviera
   cerrado, esa clave sería una violación vigente y O4.P13 la habría introducido
   sin enmienda.
4. **Ningún validador hace allowlist de claves de snapshot.** Las allowlists de
   `tools/roadmap/roadmap-core.mjs:35-59` (`ROOT_ALLOWED_FIELDS` = `schema_version,
   roadmap_id, title, objectives, lanes`) y las de
   `validate-project-console-state.mjs:1597` son sobre el **roadmap canónico**,
   no sobre `.project/snapshot.json`.

**Sobre el número de decisión esperado, que se verificó igualmente:** la
instrucción esperaba que la última entrada de `context/DECISIONES.md` fuera
D-057, para usar D-058. **En disco la última es D-058**
(`DECISIONES.md:2137`, 2026-07-30, «Primera aplicación de `CONST §4` en el
roadmap de AIW»), así que la siguiente libre sería D-059. La rama no se activó
—no hay enmienda que registrar— de modo que **no se escribió en `DECISIONES.md`
y no hubo que parar**; se deja anotado porque de haberse activado, la guarda
habría disparado.

---

## Cierre

El defecto era que el emisor no decía lo que había hecho. Desde este run lo
dice, para las cinco carpetas y no solo para las dos que motivaron la pregunta,
con una razón derivada del modo y sin una sola palabra sobre un contenido que
nunca abrió.
