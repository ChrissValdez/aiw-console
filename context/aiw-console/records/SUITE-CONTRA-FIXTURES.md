# SUITE CONTRA FIXTURES

`RUN-CONSOLE-SUITE-FIXTURES-001` — «Make the test suite stable under change — assert against
fixtures, not live sibling data» (`queue_order` 40, O4).

**Todas las cifras de este record son una MEDICIÓN FECHADA DEL 2026-07-30, no un estado
permanente.** Cualquiera de ellas puede haber cambiado desde entonces; el punto del run es
precisamente que a partir de ahora la suite no las vuelve a leer del vecino.

---

## A. La superficie de escritura, medida antes de correr nada

Leído el código de los tests y de lo que invocan, SIN ejecutar la suite. Toda ruta que la suite
escribe:

| Ruta escrita | Test que la produce | Persiste |
|---|---|---|
| `<repo>/.project/{snapshot,roadmap,docs_index,guardrails,no_claims,git_history}.json` | `tests/serve-project-emit.test.mjs:506` — `POST emit` sobre la clave `self`, registrada en `:149` | **Sí — re-emisión real** |
| `<repo>/.project/git_history.json` | `tests/serve-write-routes.test.mjs:310` — `POST history/sync` sobre `self`, registrada en `:120` | **Sí — re-emisión real** |
| `tests/fixtures/sample-project/.aiw/**` | `tests/projector.test.mjs:112` (`writeSnapshot(FIXTURE)`), borrado en `:120` | No — `.aiw/` está en `.gitignore` y el test limpia |
| `$TMPDIR/**` (~20 raíces `mkdtempSync`) | 12 ficheros de test | No — fuera del repo, autolimpiante |

**A3 — guarda que aborta: NO se disparó.** Ninguna escritura cae fuera de
`projects/aiw-console`. Los proyectos hermanos se leen en modo estricto de solo lectura:
`projector-cantu.test.mjs` construye en memoria (`buildX`) y nunca llama `writeProjectFolder`
contra una raíz real, y el acceso a Git es `symbolic-ref` / `for-each-ref` / `rev-list` /
`rev-parse`. `tools/projector/project.mjs:39` lo declara: «No Git command that writes, ever».
Se verificó además que ningún test importa primitivas de escritura más allá de las de la tabla
(`createWriteStream`, `appendFileSync`, `symlinkSync`, etc.: cero apariciones).

**A4 — desviación declarada.** El criterio pedía `git status --porcelain` VACÍO antes de la
primera corrida. **No lo estaba.** Había siete ficheros ya modificados, sin commitear, antes de
que este run tocara nada:

```
 M .project/docs_index.json
 M .project/git_history.json
 M .project/guardrails.json
 M .project/no_claims.json
 M .project/roadmap.json
 M .project/snapshot.json
 M roadmap/roadmap.json
```

Es trabajo del operador (la auditoría de cabina que movió la cola de 45 a 51 runs y cerró el
`#39`) más el residuo de una corrida previa de la suite. No se commiteó ni se revirtió nada
(`H4`). En consecuencia `E1` se verifica en su forma comprobable: **la suite no cambia el árbol**
— porcelain idéntico antes y después, y los seis artefactos byte a byte idénticos.

---

## B. Las cifras reales, medidas hoy

Una corrida completa (`node --test`), 2026-07-30:

| | Medido hoy | Decía el ticket / `full_description` |
|---|---|---|
| Tests | **278** | 278 ✔ |
| Pasan | **266** | 268 ✘ |
| Fallan | **12** | 10 ✘ |

El total coincide; el reparto no. **Dos fallos más de los que midió el hilo de `aiw` el
2026-07-29**, exactamente por la razón que el ticket anticipaba: la auditoría de cabina creció la
cola de este repo de 45 a 51 runs entre una medición y otra, y rompió dos aserciones de conteo que
el 29 pasaban.

### Reparto por causa real (no por fichero)

**Causa A — el canónico de `cantu-studio` creció de 71 a 73 runs (4 tests)**

| Fichero | Test | Aserta contra |
|---|---|---|
| `roadmap-lane-numbering.test.mjs` | cantu-studio renders its declared lanes… | `73 ≠ 71` etiquetas de carril |
| `roadmap-lane-numbering.test.mjs` | cantu-studio numbers locally per lane… | `73 ≠ 71` |
| `roadmap-lanes.test.mjs` | cantu-studio declares two lanes, resolves all 71 runs… | `73 ≠ 71` |
| `shell-two-real-projects.test.mjs` | counts, open document, docs mode and vocabulary all reset… | línea `7 objectives / 28 phases / 73 runs` |

**Causa B — el conteo de documentos revisados de `cantu-studio` pasó de 38 a 46 (2 tests)**

| Fichero | Test | Aserta contra |
|---|---|---|
| `docs-path-grouping.test.mjs` | cantu-studio: its 38 reviewed documents paint the nine categories… | `46 ≠ 38` |
| `docs-path-grouping.test.mjs` | cantu-studio: every document the console paints… | `46 ≠ 38` |

**Causa C — `cantu-studio` ganó un run activo y dejó de ser `idle` (1 test)**

| Fichero | Test | Aserta contra |
|---|---|---|
| `shell-two-real-projects.test.mjs` | the shell summarises BOTH by executing each snapshot's own table | `operationalStatus` `"active" ≠ "idle"` |

**Causa D — el roadmap propio de este repo creció de 45 a 51 runs (4 tests)**

| Fichero | Test | Aserta contra |
|---|---|---|
| `roadmap-lane-numbering.test.mjs` | the real counts and the global numbering… | `51 ≠ 45` |
| `shell-model.test.mjs` | snapshotSummary on the real snapshot matches the measured 2/19/45 | `{2,19,51} ≠ {2,19,45}` |
| `shell-switch.test.mjs` | the renderer paints aiw-console… (2 objectives, 45 runs) | `2/19/51 ≠ 2/19/45` |
| `shell-two-real-projects.test.mjs` | aiw-console still renders exactly as measured… | `2/19/51 ≠ 2/19/45` |

**Causa E — el `O0` de este repo ya no tiene run activo y deriva `in_progress` (1 test)**

| Fichero | Test | Aserta contra |
|---|---|---|
| `shell-model.test.mjs` | aiw-console's real snapshot derives the measured statuses (O0 active, O4 in_progress) | `["in_progress","active"] ≠ ["active","in_progress"]` |

### B4 — diferencia declarada respecto del `full_description`

El `full_description` describía: **cinco** por el crecimiento de `cantu-studio`, **dos** por su
conteo de documentos revisados, **tres** por el `O0` de este repo. Medido hoy:

- «Cinco por `cantu-studio`» → **se sostiene como cinco**, pero repartidos distinto: 4 por el
  conteo 71→73 y 1 más porque ese proyecto ganó un run activo (causa C), cosa que el
  `full_description` no menciona.
- «Dos por los documentos revisados» → **dos tests, sí**, pero el número no es 45 sino **46**.
- «Tres por el `O0`» → hoy son **cinco**: solo 1 es el `O0` propiamente (causa E); los otros 4 son
  el conteo 45→51 (causa D), que el 2026-07-29 aún no existía.

Son dos mediciones fechadas distintas. **No se ha corregido hacia atrás ningún texto**: el
`full_description` del run sigue diciendo lo que decía.

---

## D1. La divergencia del espejo, medida en disco

`tools/projector/project.mjs:353` exporta `roadmapQueueGroup(run, runsById)` y su comentario lo
declara espejo del `v3QueueGroupKey` de la consola. **Sigue siendo cierto que ha divergido**, en
dos puntos concretos, verificados hoy contra
`project-console/assets/project-console.js:3146`:

1. **`needs_human_decision` no existe en el espejo.** La consola, para un run `active` cuyo estadio
   derivado es `human_qa` en estado `waiting`, devuelve `"needs_human_decision"`. El espejo
   devuelve `"now"` incondicionalmente para todo `active`.
2. **El espejo no sabe de barreras.** La consola, si recibe `model`, marca `"later"` un run
   `planned` con todas sus dependencias completas pero barrado por una barrera `[D-051]`. El
   espejo devuelve `"ready_next"`.

Y la firma difiere: el espejo no acepta el tercer argumento `model`.

**La reparación del espejo es del `#41` y NO se ha hecho.** `tools/projector/project.mjs` no se ha
tocado. Lo que sí se corrigió es el PATRÓN (`D2`): `tests/roadmap.test.mjs` y
`tests/roadmap-emitted.test.mjs` ya no importan `roadmapQueueGroup`; llaman a la función real de la
consola a través de `tests/helpers/console-grouping.mjs`, que la lee del renderer cargado en el
mismo `node:vm` que usan las suites de consumo. No hizo falta ningún cambio en código de producción
para lograrlo.

---

## C. Los fixtures creados

`tests/fixtures/neighbours/` — las carpetas `.project/` emitidas de los dos proyectos reales,
congeladas el **2026-07-30** como DATOS, más el canónico de cada uno:

```
tests/fixtures/neighbours/aiw-console/.project/{snapshot,roadmap,docs_index,guardrails,no_claims,git_history}.json
tests/fixtures/neighbours/aiw-console/canonical/roadmap.json
tests/fixtures/neighbours/cantu-studio/.project/{...los mismos seis...}
tests/fixtures/neighbours/cantu-studio/canonical/roadmap.json
```

Total 1,3 MB. El canónico se guarda bajo un nombre neutro (`canonical/roadmap.json`) porque cada
proyecto lo tiene en su propio layout y el de `cantu-studio` vive en `.aiw/`, que está en
`.gitignore`: un fixture ahí no se versionaría.

Contenido medido de los fixtures:

| | aiw-console | cantu-studio |
|---|---|---|
| modelo | `roadmap_tree_v1` | `jame.roadmap_v3.v0.2-progress` |
| objetivos / fases / runs | 2 / 19 / 51 | 7 / 28 / 73 |
| runs por estado | 39 completed, 11 planned, 1 active | 15 completed, 57 planned, 1 active |
| documentos (total / primary / revisados / archivados) | 90 / 14 / 0 / 0 | 149 / 60 / 46 / 87 |
| carriles | ninguno declarado | `DEVELOPMENT` (50) + `DOCUMENTATION` (23), sin barrera |

**C4** — son ficheros estáticos. Nada en la suite los regenera y ningún test lee al vecino para
construirlos.

**C2** — sobre los proyectos hermanos REALES queda `tests/real-projects-smoke.test.mjs`, con dos
tests que no asertan ninguna cifra: que el shell abre la carpeta emitida y la resume, y que todo
artefacto declarado resuelve en disco (sin asertar cuántos).

**Helpers nuevos:** `tests/helpers/neighbours.mjs` (raíces y lectores de los fixtures),
`tests/helpers/console-grouping.mjs` (la función real de la consola),
`tests/helpers/real-like-project.mjs` (copia desechable de este repo para los tests que emiten).

---

## E2. La prueba de que la suite ya no ensucia el árbol

`git status --porcelain` **antes** y **después** de una corrida completa — idénticos, verificado
con `diff`:

```
 M .project/docs_index.json
 M .project/git_history.json
 M .project/guardrails.json
 M .project/no_claims.json
 M .project/roadmap.json
 M .project/snapshot.json
 M roadmap/roadmap.json
 M tests/declared-sources-and-docs-mode.test.mjs
 M tests/docs-path-grouping.test.mjs
 M tests/emitted-artifacts-declaration.test.mjs
 M tests/git-history-default-branch.test.mjs
 M tests/roadmap-emitted.test.mjs
 M tests/roadmap-lane-numbering.test.mjs
 M tests/roadmap-lanes.test.mjs
 M tests/roadmap.test.mjs
 M tests/serve-project-emit.test.mjs
 M tests/serve-write-routes.test.mjs
 M tests/shell-model.test.mjs
 M tests/shell-switch.test.mjs
 M tests/shell-two-real-projects.test.mjs
?? tests/fixtures/neighbours/
?? tests/helpers/console-grouping.mjs
?? tests/helpers/neighbours.mjs
?? tests/helpers/real-like-project.mjs
?? tests/real-projects-smoke.test.mjs
```

Las entradas son (a) el trabajo sin commitear del operador, presente antes de empezar, y (b) los
cambios de este run. **Ninguna la añadió la corrida**: el `diff` de las dos salidas es vacío, y el
`md5sum` de los seis `.project/*` más `roadmap/roadmap.json` es idéntico antes y después. Antes de
este run esos seis hashes cambiaban en cada corrida; quedó medido en la primera pasada.

Cuando el operador commitee su trabajo y el de este run, `git status --porcelain` tras una corrida
será literalmente vacío.

---

## Estado final, contado en disco (H2)

- **Suite: 281 tests, 281 pasan, 0 fallan.** (278 + 2 del smoke nuevo + 1 del desdoble del test de
  vocabulario.)
- **Canónico `roadmap/roadmap.json`: 51 runs** — 39 `completed`, 11 `planned`, 1 `active`.
- **Canónico y `.project/roadmap.json` COINCIDEN**: mismos `run_id`, `queue_order` y `status`, en
  el mismo orden. El árbol de `.project/snapshot.json` también concuerda.
- `queue_order` 40 = `RUN-CONSOLE-SUITE-FIXTURES-001`, `status: active`. **Lo cierra el operador
  desde la consola**; este encargo declara que debe quedar en `completed` pero no lo cambia.

---

## Qué quedó sin hacer, y por qué

1. **`tests/projector-cantu.test.mjs` sigue leyendo `../../cantu-studio` en cinco tests.** Son las
   únicas aserciones que quedan sobre un vecino real fuera del smoke, y es una desviación
   declarada de `C2`. Razón: esos tests necesitan el layout FUENTE de `cantu-studio`
   (`.aiw/roadmap/roadmap.json`, `.aiw/docs/docs_index.json`, `.aiw/guardrails/`), no su
   `.project/`. Un fixture equivalente exigiría un directorio `.aiw/` dentro de
   `tests/fixtures/`, y `.aiw/` está en `.gitignore`: el fixture no se versionaría y la suite se
   rompería en un clon limpio. Corregir `.gitignore` está fuera del alcance declarado del run.
   Borrarlos habría violado `C3` (pierden cobertura real: son la única prueba del emisor contra un
   SEGUNDO layout sobre un repositorio real). Mitigación: **no asertan ninguna cifra del vecino** —
   son estructurales y autoconsistentes (comparan la salida del emisor consigo misma o con el
   índice curado del propio proyecto), así que no pueden ponerse rojos porque `cantu-studio`
   crezca. **Propuesta para el `#41` o quien retome esto:** añadir `!tests/fixtures/**/.aiw/` al
   `.gitignore` y congelar también el layout fuente.

2. **La reparación del espejo `roadmapQueueGroup`** — es el `#41` por decisión del encargo
   (`D3`). Medida y documentada arriba; `tools/projector/project.mjs` no se tocó.

3. **Ningún test quedó fallando.** No hubo que dejar ninguno rojo: todas las aserciones se
   pudieron expresar contra fixtures sin debilitarlas. El único caso que no se podía expresar
   sobre el par congelado — el reseteo de VOCABULARIO al cambiar de proyecto, que exigía dos
   proyectos con tokens disjuntos y hoy ambos usan `active`/`planned`/`completed` — se desdobló a
   un test propio contra `hilo-verde`, cuyo vocabulario (`por_hacer`/`haciendo`/`hecho`) no
   comparte un solo token, y la no-vacuidad se aserta en vez de suponerse.
