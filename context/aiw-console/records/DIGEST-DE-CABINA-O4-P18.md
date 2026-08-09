# Record — Digest de cabina (`O4.P18`) — una vista más del proyector

**Fecha:** 2026-08-08. **Proyecto:** `aiw-console`.
**Run:** `RUN-CONSOLE-DIGEST-CABINA-001` — «Digest for the cockpit», `O4 — Global Console` /
`O4.P18`, `queue_order` 50, `status: active`.
**Desenlace:** entregado. Tres ficheros nuevos, ninguno en `.project/` ni en `roadmap/`, ninguno
en los otros cuatro repositorios.

El `run_id` se **derivó** del canónico `roadmap/roadmap.json` por `queue_order` 50, no se copió
de este ticket. La guarda de título pasó: el título en disco es exactamente
`Digest for the cockpit`.

---

## 1. Lo primero: el ticket dice tres, el registro dice CUATRO

El `full_description` del run dice «the state of the three projects». **El registro dice cuatro**,
y el digest cubre los cuatro. El texto del run está **fechado, no equivocado**: se escribió cuando
había tres.

Medido en `project-console/projects.json` (`registry_model: project_registry_v1`, título
`AIW Console`), sha1 `27d0379442fb09d5f25002ce07b99beedeaa1ef0`:

| `key` | `root` declarada | resuelve a |
|---|---|---|
| `aiw-console` | `..` | `projects/aiw-console` |
| `cantu-studio` | `../../cantu-studio` | `projects/cantu-studio` |
| `cantu-quizzes-latex` | `../../cantu-quizzes-latex` | `projects/cantu-quizzes-latex` |
| `aiw` | `../../../aiw` | `AIW_Workspace/aiw` |

Las `root` se resuelven **contra el directorio del propio registro** (`project-console/`), que es
lo que hace `readRegistry` en `project-console/serve.mjs`. Los cuatro existen en esta máquina.

**La lista no se teclea en ninguna parte.** El emisor la deriva del registro, y hay un test que lo
sostiene: un registro de cuatro entradas produce cuatro entradas, y el propio test comprueba por
`grep` que el emisor no contiene ningún literal `project_count: <n>`. Una quinta entrada en el
registro mueve el digest sin tocar una línea de código.

---

## 2. Dónde vive el canónico de CADA proyecto — medido, no supuesto

No todos lo tienen en la misma ruta, y el digest lo mide con `detectRootLayout` del proyector
(`tools/projector/project.mjs`), que casa la raíz contra `ROOT_LAYOUTS` **en orden** y se queda con
el primer layout cuyo roadmap parsea *y conforma*:

| proyecto | modo | layout | canónico | `no_claims` |
|---|---|---|---|---|
| `aiw-console` | `roadmap_tree` | `repo_root` | `roadmap/roadmap.json` | `governance/no_claims.json` |
| `cantu-studio` | `roadmap_tree` | **`project_local_aiw`** | **`.aiw/roadmap/roadmap.json`** | `.aiw/guardrails/no_claims.json` |
| `cantu-quizzes-latex` | `roadmap_tree` | `repo_root` | `roadmap/roadmap.json` | `governance/no_claims.json` |
| `aiw` | `roadmap_tree` | `repo_root` | `roadmap/roadmap.json` | `governance/no_claims.json` |

`cantu-studio` es el que rompe la simetría, y además **se nombra a sí mismo**: su
`schema_version` es `jame.roadmap_v3.v0.2-progress`, no `roadmap_tree_v1`. El digest lo transporta
**verbatim** (`declaredRoadmapModel`); no reetiqueta un árbol que ya tiene nombre. Hay test para
las dos mitades: el que declara nombre lo conserva, el que no declara nada recibe el identificador
de este contrato.

Los cuatro salieron en modo `roadmap_tree`. Ninguno exigió credenciales ni red: todo es lectura de
ficheros locales y Git local. **Ninguna condición de parada del criterio 8 se activó.**

---

## 3. La lectura de «árbol sucio»: la elegida, y por qué el ticket va fechado aquí también

### 3.1 Lo que este ticket afirmaba, y lo que dice el disco

El ticket afirma: «Medido en este repo hoy: `git status` reportó 339 ficheros modificados con CERO
cambios reales, por caché de `stat` del índice». **Hoy no reproduce.** Medido ahora, las tres
lecturas coinciden en **7**:

| lectura | resultado |
|---|---|
| `git --no-optional-locks diff HEAD --numstat` | **7** |
| `git --no-optional-locks status --porcelain` | **7** |
| `hash-object --no-filters` de los 356 trackeados contra `ls-tree -r HEAD` | **7** |

Los 7 son exactamente los intocables de este encargo: los seis de `.project/` más
`roadmap/roadmap.json` — la apertura del run sin commitear. El patrón oro (comparar el contenido
en bruto de los 356 ficheros trackeados contra el blob) da la **misma lista**, y también da 7
contra el índice, así que índice y HEAD coinciden.

**El disco manda: el 339 está fechado.** La causa más probable es la renormalización de finales de
línea al aparecer `.gitattributes` (`* text=auto`, mtime 2026-08-08 03:12); 339 ≈ 356 − 17 encaja
con «casi todo el árbol de texto marcado como modificado a la vez». Después de que el operador
renormalizara, la discrepancia desapareció.

**Esto no cambia la instrucción, y no se ignoró.** El emisor no usa `git status` en ningún caso.
Una lectura que pudo equivocarse por 339 no es una lectura, y que hoy acierte no la rehabilita.

### 3.2 La lectura elegida, y por qué esta y no la otra

```
trackeados  →  git --no-optional-locks diff HEAD --numstat
no trackeados → git --no-optional-locks ls-files --others --exclude-standard
```

- **`diff HEAD --numstat`** compara **contenido** contra HEAD y lo hace **a través de los mismos
  filtros `clean` que aplicaría Git**. Es lo que lo hace correcto en una raíz configurada con
  `core.autocrlf=true`.
- **`ls-files --others --exclude-standard`** es un recorrido de directorio: no hay caché de `stat`
  involucrada en absoluto. Cierra el hueco que `diff HEAD` tiene por construcción — `diff` no ve
  los ficheros no trackeados — sin recurrir a `status`.

**Por qué NO `hash-object --no-filters` contra `ls-files -s` como lectura del emisor**, aunque sea
el patrón oro que usé para auditar: es correcto *en este repo* porque lo medí —
`core.autocrlf=false`, `core.eol=lf`, y el árbol es LF puro, así que el hash en bruto coincide con
el blob. **No es correcto en general.** En una raíz con `core.autocrlf=true` el blob está en LF y
el fichero en disco en CRLF: el hash en bruto difiere y la lectura reportaría *todo el árbol de
texto* como sucio. El emisor lee **cuatro** repositorios, y no puede asumir la configuración de los
otros tres. Por eso el patrón oro se queda como herramienta de auditoría y el emisor usa la lectura
barata que el ticket también bendice, que además es filtro-correcta.

`--no-optional-locks` va **siempre antes del subcomando**, y hay un único punto en el emisor donde
se antepone. Está pinneado dos veces, en dos niveles distintos:

- a nivel de **argv real**, inyectando el `exec` en `gitRead`, que es el único sitio donde arranca
  un proceso Git: el test comprueba que `argv[0]` es `--no-optional-locks`, que aparece una sola
  vez, y que `argv[1]` no es `status`;
- a nivel de **fuente**, comprobando que el punto donde se antepone es exactamente uno y que el
  emisor no nombra un subcomando `status` en ninguna parte salvo la prosa que explica por qué no
  se usa.

Esa primera costura hay que explicarla, porque la puse en el sitio poco obvio a propósito. La
costura natural era `read`, pero un test que sustituye `read` **nunca ve el argv que compone
`gitRead`** — la garantía que importa sería justo la única inobservable. Lo descubrí porque el test
falló: lo escribí primero contra `read` y me dijo que estaba comprobando otra cosa. Bajar la
costura un nivel conserva el punto de control único y lo hace verificable.

La lectura elegida va **declarada en el propio artefacto**, bajo `dirty_reading`, con los `argv`
como datos: la declaración y los comandos que se ejecutan son las mismas cadenas, y hay un test
que exige que los `argv` declarados sean los que corrieron.

---

## 4. El formato: JSON, y la razón

**JSON**, 2 espacios de sangría, newline final, LF, escritura atómica (temp + rename).

1. **Es el formato de todo lo derivado de este repo.** `.project/*.json` y `.aiw/views/*.json` son
   JSON con exactamente esta forma. Un séptimo formato no aporta nada y obliga a un lector nuevo.
2. **Es verificable por test.** El criterio 7 pide tests de la derivación; sobre JSON se asertan
   campos, no se hace *pattern-matching* de prosa.
3. **Un formato es un parser.** Markdown derivado invita a la edición a mano, que es exactamente lo
   que el criterio 5 prohíbe: se edita porque se puede, y nadie nota que el siguiente `run` lo
   borra.
4. **Es diff-amable.** Con las mismas entradas y el mismo instante, dos construcciones son
   byte-idénticas — hay un test que lo exige. Deliberadamente **no** llevo `mtime` de las fuentes:
   haría churn en cada regeneración sin decir nada que el sha1 no diga ya.

Tamaño medido: **377 líneas, 12 770 bytes** para cuatro proyectos. Pequeño, como pedía el run.

### Fechado y con SHA

- `generated_at` — el instante de construcción, UTC ISO 8601.
- `sha1` por fuente — **el blob hash de Git de los bytes leídos**, no un hash cualquiera. Elegido
  precisamente porque el lector lo puede **reproducir con un comando**:

  ```bash
  git --no-optional-locks hash-object --no-filters -- roadmap/roadmap.json
  ```

  Verificado: para `roadmap/roadmap.json` da `01416af70f0e015b4eb1cae081309ba108af2776`, idéntico
  al que lleva el digest. Se calcula en proceso desde los bytes en disco, lo cual también lo hace
  honesto para una fuente **sin commitear**: un blob de HEAD fecharía una versión del fichero que
  no es la que se leyó — y hoy `roadmap/roadmap.json` está precisamente así.
- `git.head` por proyecto — que se mueva significa lo mismo.
- El registro también va fingerprinteado: es la entrada que decide la lista de proyectos.

El propio fichero explica cómo comprobar su edad, en `staleness.how`.

---

## 5. Dónde vive el digest, y el informe de opciones sobre `.project/`

**Destino elegido: `project-console/projects.digest.json`.** Al lado del registro del que deriva.

### 5.1 Por qué NO un séptimo fichero en `.project/`

No lo escribí, así que el criterio 6 no llegó a activar una parada; pero el informe de opciones se
debe igual, porque es la justificación de la ruta.

**Qué rompe.** `.project/` es la carpeta de contrato **por proyecto** (CONTRATO §1): cada raíz
registrada tiene la suya, y la emisión de la cabina escribe exactamente seis ficheros. Un séptimo
rompe, medido:

| pin | qué afirma |
|---|---|
| `tests/emitted-artifacts-declaration.test.mjs:149` | `assert.equal(declared.length, 6)` sobre los dos fixtures congelados |
| `tests/serve-project-emit.test.mjs:523` | `assert.equal(emit.payload.artifacts, 6, …)` en una emisión real completa |
| `project-console/serve.mjs` | `PROJECT_EMIT_ARTIFACT_PATHS`, las seis rutas que la guarda de frontera comprueba **antes** de que corra el emisor |

**Y es un error de categoría antes que un problema de tests.** Este digest es **un fichero sobre
todos** los proyectos, derivado del **registro**. Ninguna carpeta de un proyecto concreto es su
casa: metido en `.project/` de `aiw-console` sería una afirmación de `aiw-console` sobre
`cantu-studio`, que es justo lo que no es. Además `.project/` está **fuera de alcance** en este
encargo, y su emisión la ejecuta la cabina, no el taller.

**Las alternativas que consideré, y por qué cayeron:**

- **`.aiw/views/`** — es el área de vistas derivadas del proyector, pero es la de **modo 1**
  (`aiw_objectives`), y `aiw-console` es una raíz de **modo 2**. Además `.aiw/` está en
  `.gitignore`: el digest quedaría invisible para la cabina, que es su único consumidor. Crear un
  `.aiw/` en un repo que no tiene ninguno para colgar ahí una vista de modo 2 es peor que la
  enfermedad.
- **`context/aiw-console/`** — es el área de documentos y records escritos a mano. Un fichero
  derivado ahí se edita a mano tarde o temprano.
- **Una ruta nueva de primer nivel** (`digest/`, `WORKSPACE.json`) — el criterio 5 pide usar el
  sitio natural antes que inventar camino, y hay uno.

**La medición que decide:** el proyector tiene exactamente **dos** áreas de escritura, `.aiw/`
(modo 1) y `.project/` (modo 2), **las dos por proyecto y las dos detrás de su propia guarda de
ruta**. No existe un área para una vista de **nivel registro**, porque hasta ahora no había vistas
de nivel registro. La entrada que decide qué proyectos existe es `project-console/projects.json`;
su vecino derivado es `projects.digest.json`.

### 5.2 Lo que gana esa ruta

1. `projects.json` decide qué proyectos hay, `projects.digest.json` informa sobre ellos, y los dos
   **ordenan juntos**: la derivación se lee con un `ls`, sin abrir nada.
2. Está **trackeado** (no cae bajo ninguna regla de `.gitignore`), así que viaja con el repo — que
   es el sentido de «optimización de contexto» para la cabina.
3. La shell ya sirve todo el repo en GET/HEAD, así que es alcanzable en
   `/project-console/projects.digest.json` **sin ruta nueva** en `serve.mjs`.
4. No toca `.project/`: ningún pin, ninguna escritura fuera de alcance.

Hay un test que sostiene la decisión, no solo el comentario: comprueba que la ruta emitida **no**
cae bajo `.project/` y que sigue viviendo en el mismo directorio que el registro.

### 5.3 Derivado y nunca editado a mano

Dicho en los dos sitios que pide el criterio 5:

- **En el emisor**, en la cabecera.
- **En el propio fichero**: `derived: true` y un campo `do_not_edit` con el comando de
  regeneración, en el nivel superior, donde lo ve quien lo abra por accidente. Con test.

El emisor tiene además una **guarda de ruta** — espejo de `resolveInsideAiw` /
`resolveInsideProject` del proyector: tiene exactamente un destino legal y una ruta compuesta que
no sea ese destino se **rechaza**, no se escribe. Con test para el rechazo.

### 5.4 La auto-referencia, declarada en vez de escondida

Escribir el digest ensucia el repo que el digest acaba de medir. Sin tratarlo, **cada regeneración
reportaría un cambio causado por la regeneración**: el fichero se auto-invalida.

La solución es excluir la ruta propia de las dos listas de suciedad — y **declarar la exclusión**,
en `git.dirty.self_excluded` y en `no_claims`, con el nombre del fichero. La exclusión se hace
casando **la raíz resuelta** contra el repo que se está emitiendo, nunca por `key`: un fichero con
ese mismo nombre en el repo de al lado es un cambio real y se reporta. Hay test para las dos
mitades.

---

## 6. Qué lleva el digest por proyecto

Lo que enumera el `full_description`, todo derivado:

- **HEAD + rama + si el árbol está sucio** — `git.head`, `git.branch`, `git.dirty` con las dos
  listas, sus conteos y las exclusiones declaradas.
- **Conteos por estado** — `runs.by_status`. Solo los estados que el árbol **usa**: un estado
  ausente no recibe un cero, porque un cero sería una afirmación sobre un vocabulario que este
  fichero no posee. Es la misma disciplina que `buildRoadmapTreeSnapshot` cuando filtra `n > 0`.
- **Runs `active`** — `active_runs`, en orden de cola.
- **El paso siguiente** — `next_step`, el run de menor `queue_order` que la agrupación del propio
  proyector (`roadmapQueueGroup`) pone en `ready_next`. Ejecuto la regla del proyector en vez de
  reescribirla.
- **Los no-claims** — del canónico que declara su layout, no del `.project/no_claims.json`, que es
  una proyección de aquél.

### Lo que el digest NO afirma, dicho en el fichero

`no_claims` es un campo del artefacto, no una nota de este record. Lleva seis entradas; la que más
importa:

> `next_step` ejecuta `roadmapQueueGroup` del proyector **sin modelo de barreras**, porque lo único
> que construye uno es la consola, en el navegador. Un run retenido solo por una barrera puede
> aparecer aquí como listo. La consola es la autoridad sobre la cola.

Busqué un constructor de modelo de barreras en el lado servidor: `barrierBlockersByRunId` solo
aparece en el comentario de `tools/projector/project.mjs`, en la propia función, y en un fixture de
`tests/console-queue-keyspace.test.mjs`. **No existe.** Reimplementar la lógica de barreras habría
sido una segunda verdad, y está fuera de alcance. Así que el dato se entrega con su límite
declarado, en vez de entregarse como si no lo tuviera. Hay test que exige que ese no-claim esté.

Todo lo que no se puede medir se declara **AUSENTE con la razón**, nunca se rellena: raíz que no
existe, raíz que ningún layout reclama (nombrando las rutas probadas), `no_claims` inexistente, Git
ausente frente a Git presente pero la raíz no es su propio repositorio, y «ningún run en
`ready_next`». Un proyecto que no se pudo medir **sigue en la lista** con `measured: false` — no
desaparece, porque desaparecer sería silencio. Nueve tests cubren estas ramas.

---

## 7. El fichero íntegro, para `cantu-studio` como ejemplo

Elegido porque es el que rompe todas las simetrías: layout distinto y modelo con nombre propio.

Lo que sigue es el fichero **tal como se entrega**, generado a las `21:13:22.679Z`. Un aviso, y no
es un detalle: **`cantu-studio` cambió mientras corría este encargo**. En la primera generación
(`20:41`) su árbol estaba limpio; a las `21:13` tenía dos ficheros modificados y dos sin trackear,
de otra sesión trabajando en su run 35. Su canónico **no** se movió — el sha1 sigue siendo
`67588079…` —, solo el árbol.

Es la mejor demostración posible de para qué existe este artefacto: el digest fecha y firma lo que
midió, así que una entrada envejecida se **detecta** en vez de creerse. Y es la razón de la §9: si
alguna de estas cifras estuviera asertada en un test, la suite de esta consola estaría roja ahora
mismo por trabajo de un vecino.

### 7.1 La envuelta, completa

```json
{
  "schema": "aiw_registry_digest_v1",
  "generated_at": "2026-08-08T21:13:22.679Z",
  "generated_from": "aiw-registry-digest@1.0.0",
  "derived": true,
  "do_not_edit": "DERIVED FILE — DO NOT EDIT BY HAND. Regenerate with `node tools/project-console/build-registry-digest.mjs`. Every field below is measured from the registry and from each registered project's own canonical sources; a hand edit is overwritten by the next run and, until then, is a claim no measurement supports.",
  "emitted_to": "project-console/projects.digest.json",
  "emitter": "tools/project-console/build-registry-digest.mjs",
  "registry": {
    "path": "project-console/projects.json",
    "registry_model": "project_registry_v1",
    "title": "AIW Console",
    "sha1": "27d0379442fb09d5f25002ce07b99beedeaa1ef0",
    "project_count": 4,
    "keys": ["aiw-console", "cantu-studio", "cantu-quizzes-latex", "aiw"]
  },
  "dirty_reading": {
    "reading": "content_vs_head",
    "tracked": {
      "argv": ["diff", "HEAD", "--numstat"],
      "reports": "tracked files whose CONTENT differs from HEAD"
    },
    "untracked": {
      "argv": ["ls-files", "--others", "--exclude-standard"],
      "reports": "files present in the worktree that Git neither tracks nor ignores"
    },
    "not_used": "git status",
    "why": "`git status` was measured on this repository reporting 339 modified files with zero real changes, from a stale `stat` cache in the index. Both commands above compare CONTENT (or walk the directory) instead of trusting cached `stat` data, and `diff` applies the same clean filters Git applies, so a root with `core.autocrlf=true` is not reported wholly dirty the way a raw `hash-object --no-filters` comparison would report it.",
    "no_optional_locks": "every invocation passes `--no-optional-locks` BEFORE the subcommand, so no reading can leave a `.git/index.lock` behind and block the operator."
  },
  "staleness": {
    "how": "Every `sha1` in this file is a Git blob hash of the bytes that were read. Recompute one with `git --no-optional-locks hash-object --no-filters -- <path>` inside that project: if it differs, this entry is stale. A project's `git.head` moving means the same.",
    "generated_at_is": "the instant this file was built, in UTC (ISO 8601)"
  },
  "no_claims": [
    "It reports the projects the registry LISTS, and nothing about any project the registry does not list. The count is whatever the registry holds — it is derived, never typed.",
    "`next_step` executes the projector's `roadmapQueueGroup` WITHOUT a barrier model, because the only thing that builds one is the console in the browser. A run held by a barrier alone can therefore appear as ready here. The console is authoritative on the queue.",
    "`git.dirty.untracked` uses `--exclude-standard`, so a file the project's own ignore rules exclude is not reported. It is a reading of what Git would show, not of the filesystem.",
    "`project-console/projects.digest.json` — this file — is excluded from its own dirty reading, because writing it would otherwise make every regeneration report a change it caused itself.",
    "It reads each project's CANONICAL sources. It says nothing about whether that project's `.project/` folder has been re-emitted from them, which is the cabin's act, not this one's.",
    "It writes into no registered project. The other roots are read, and only this repository receives a file."
  ],
  "projects": [ … ]
}
```

### 7.2 La entrada de `cantu-studio`, completa

```json
{
  "key": "cantu-studio",
  "root_declared": "../../cantu-studio",
  "measured": true,
  "canonical": {
    "layout": "project_local_aiw",
    "roadmap": ".aiw/roadmap/roadmap.json",
    "no_claims": ".aiw/guardrails/no_claims.json",
    "declared_model": "jame.roadmap_v3.v0.2-progress"
  },
  "git": {
    "available": true,
    "head": "e0a4033e35c7a3e808492fbe91ee070bb4999f82",
    "branch": "main",
    "dirty": {
      "is_dirty": true,
      "tracked_changed": [
        "src/builders/web/partials/renderRule.js",
        "tools/author-lite/editor-ui/src/features/editor/components/web/WebBlockEditor.jsx"
      ],
      "untracked": [
        "QA/temp/RUN-JAME-RULE-COMPONENT-REPAIR-AND-ACTIVATION-001/rule_header_centering_evidence.html",
        "docs/_historical_run_record/RUN-JAME-RULE-COMPONENT-REPAIR-AND-ACTIVATION-001-OPERATOR-QA-PACKET-ROUND-2.md"
      ],
      "counts": { "tracked_changed": 2, "untracked": 2 },
      "self_excluded": []
    }
  },
  "operational_status": "active",
  "runs": {
    "total": 75,
    "by_status": { "active": 1, "completed": 36, "planned": 38 }
  },
  "active_runs": [
    {
      "run_id": "RUN-JAME-RULE-COMPONENT-REPAIR-AND-ACTIVATION-001",
      "title": "Audit and implement the Rule component",
      "queue_order": 35,
      "objective_id": "O1",
      "phase_id": "O1.P2"
    }
  ],
  "next_step": {
    "present": true,
    "run_id": "RUN-CANTU-EDITOR-SIDE-PANEL-COLLAPSE-001",
    "title": "Let the author collapse and restore the editor side panel",
    "queue_order": 37,
    "objective_id": "O4",
    "phase_id": "O4.P5",
    "queue_group": "ready_next"
  },
  "no_claims": {
    "present": true,
    "source": {
      "path": ".aiw/guardrails/no_claims.json",
      "sha1": "bf55b7e25eeef827a7ec8ca0b989ae4d8d9499be",
      "bytes": 503
    },
    "total": 1
  },
  "sources": [
    { "path": ".aiw/roadmap/roadmap.json", "sha1": "67588079ec032adb77428a97668b7aca21a2bc3f", "bytes": 157720 },
    { "path": ".aiw/guardrails/no_claims.json", "sha1": "bf55b7e25eeef827a7ec8ca0b989ae4d8d9499be", "bytes": 503 }
  ]
}
```

Ninguna ruta del artefacto es absoluta: todas son POSIX relativas a la raíz de su proyecto, con
test que lo comprueba. El digest no lleva la ruta del `home` del operador a ninguna parte.

---

## 8. Estado medido de los cuatro, al generar (`2026-08-08T21:13:22.679Z`)

| proyecto | HEAD | rama | sucio (trk / no trk) | runs | activos | siguiente |
|---|---|---|---|---|---|---|
| `aiw-console` | `bb7e5181` | `main` | 7 / 5 | 57 | 1 | `RUN-CONSOLE-PARIDAD-RENDER-CANTU-001` |
| `cantu-studio` | `e0a4033e` | `main` | 2 / 2 | 75 | 1 | `RUN-CANTU-EDITOR-SIDE-PANEL-COLLAPSE-001` |
| `cantu-quizzes-latex` | `02893a55` | `main` | 4 / 0 | 42 | 1 | `RUN-QUIZZES-REVIEW-ARI-FA-OPERACIONES-001` |
| `aiw` | `38bb00bb` | `main` | 6 / 0 | 46 | 2 | `RUN-AIW-SHARED-WORKING-BRANCH-001` |

Los 7 trackeados de `aiw-console` son los intocables de este encargo. Sus 5 no trackeados son los
tres ficheros que entrega este run más dos records de otras sesiones. Los 2+2 de `cantu-studio`
llegaron **durante** este encargo, de otra sesión (§7.2).

Estas cifras **no están asertadas en ningún test**, a propósito: es la doctrina de
`tests/helpers/neighbours.mjs`. El número de runs del vecino no es un invariante de este código, y
asertarlo convierte un commit de al lado en una suite roja aquí. Viven en este record, fechadas.

---

## 9. Suite

| | tests | pass | fail |
|---|---|---|---|
| base, verificada antes de tocar nada | 529 | 528 | 1 |
| después | **556** | **555** | **1** |

+27 tests, **cero fallos nuevos**. La base 529/528/1 que reportó el encargo anterior se verificó y
es correcta.

El único fallo es el pin de registro conocido, idéntico antes y después:

- `tests/classification-care-budget.test.mjs:153` — «C.3: absent is VALID and is today's state»,
  `AssertionError: this repo declares no care budget, and that is valid`. No se repara y no es
  gatillo de parada.
- `tests/roadmap-engine.test.mjs:93` — **en verde** hoy, como decía el ticket.

Los 27 tests nuevos están en `tests/registry-digest.test.mjs` y cubren: la lista derivada del
registro, la ruta del canónico medida por layout, el modelo declarado transportado verbatim, los
conteos por estado, `active_runs`, `next_step` (orden de cola, dependencias, y la ausencia
anunciada), las nueve ramas de ausencia, la lectura de suciedad en sus dos niveles, la
auto-exclusión, los sha1 contra una implementación de referencia de `git hash-object` escrita en el
test, el determinismo byte a byte, la escritura de UN fichero sin tocar la raíz vecina, y el
rechazo de un destino fuera de la raíz.

Ninguno arranca un proceso Git ni lee un proyecto real: el lector de Git se **inyecta**. El único
test vivo lee el registro real y comprueba que cada raíz que lista resuelve a un canónico
localizable — **sin asertar ninguna cifra**, igual que `tests/real-projects-smoke.test.mjs`.

---

## 10. Alcance: lo escrito y lo verificado intacto

**Tres ficheros nuevos, todos en `aiw-console`:**

- `tools/project-console/build-registry-digest.mjs` — el emisor.
- `project-console/projects.digest.json` — la salida.
- `tests/registry-digest.test.mjs` — los tests.

**Verificado intacto al terminar:**

- `roadmap/roadmap.json` y los seis de `.project/` — **mismos mtimes** que al empezar
  (14:24:56–14:25:01) y **mismo `numstat`** contra HEAD (los mismos 7 ficheros, los mismos
  conteos). Byte-idénticos. **Los siete siguen en LF**, comprobado byte a byte: cero CRLF.
- **Los otros cuatro repositorios**: `cantu-studio`, `cantu-quizzes-latex` y `aiw` tienen **0
  ficheros no trackeados** y el mismo `numstat` que antes de empezar (0, 4 y 6). Se leyeron; no se
  escribió ni uno.
- **Ningún comando Git que escriba.** Ni `add`, ni commit, ni push, ni `checkout`, ni `restore`.
  Todas las lecturas con `--no-optional-locks` antes del subcomando; **no queda ningún
  `.git/index.lock`**.
- No se tocó `docs/project-console/` ni `console/`. No se cambió el status del run ni se re-emitió
  `.project/`. No se insertó, movió ni renumeró ningún run.

**Para el operador:** los tres ficheros nuevos están sin commitear, y el digest aparecerá como no
trackeado hasta que se commitee. Regeneración:

```bash
node tools/project-console/build-registry-digest.mjs
```
