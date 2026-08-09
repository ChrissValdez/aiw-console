# Record — Índice de reportes (`O4.P17`) — PARADA MEDIDA antes de escribir código

**Fecha:** 2026-08-09. **Proyecto:** `aiw-console`.
**Run:** `RUN-CONSOLE-REPORTS-INDEX-001` — «Reports index: the derived per-project index the
console reads», `O4 — Global Console` / `O4.P17`, `queue_order` 51, `status: active`.
**Desenlace:** **PARADA** por el criterio 8, con dos gatillos independientes. Cero ficheros de
producción escritos, cero pins tocados, cero tests nuevos. Este record es la entrega.

El `run_id` se **derivó** del canónico `roadmap/roadmap.json` por `queue_order` 51 — nodo
`$.objectives[1].phases[17].runs[0]` — y no se copió del ticket. La guarda de título **pasó**:
el título en disco es exactamente `Reports index: the derived per-project index the console reads`
(igualdad de cadena, no coincidencia parcial). `queue_order` es único en el árbol: 61 nodos lo
llevan, del 1 al 61, sin duplicados.

---

## 1. El precedente del #50, leído primero, y por qué NO se hereda

Leído en `context/aiw-console/records/DIGEST-DE-CABINA-O4-P18.md`. Su §5.1 se titula
literalmente «Por qué NO un séptimo fichero en `.project/`», y su razón está en una frase:

> Este digest es **un fichero sobre todos** los proyectos, derivado del **registro**. Ninguna
> carpeta de un proyecto concreto es su casa: metido en `.project/` de `aiw-console` sería una
> afirmación de `aiw-console` sobre `cantu-studio`, que es justo lo que no es.

**La objeción es de EJE, no de número.** El #50 no rechazó el séptimo fichero por ser el séptimo;
lo rechazó porque su contenido era **transversal** (nivel registro) y `.project/` es **por
proyecto** (CONTRATO §1). Su propio emisor lo deja escrito en
`tools/project-console/build-registry-digest.mjs:8-15`.

**Un índice de reportes cae del otro lado del eje.** `<repo>/reports/<run_id>/` es una carpeta
**de ese repositorio**; el índice que la enumera sólo afirma cosas del proyecto que lo emite. Es
exactamente la relación que `docs/` → `.project/docs_index.json` ya tiene. Por tanto:

- **la decisión del #50 no se hereda** — su premisa (contenido transversal) es falsa aquí;
- **su inversa tampoco se hereda automáticamente** — que el eje encaje hace al séptimo artefacto
  *legítimo*, no *gratis*. Lo que cuesta está medido en §2, y es lo que dispara la parada.

Dicho de otro modo: el #50 tenía razón para su caso y no la tiene para éste, y este run **no
adopta ninguna de las dos conclusiones por herencia**. Adopta la medición.

---

## 2. GATILLO 1 — el pin está en CUATRO sitios ejecutables, no en tres

El ticket declara tres y pide verificar «que son tres y no más». **No son tres.** Hay un cuarto
sitio ejecutable, y además uno de los tres declarados **no admite la actualización que el ticket
describe**. Ambas cosas son gatillos del criterio 8.

### 2.1 Inventario medido

| # | sitio | qué afirma | ¿declarado en el ticket? | efecto del séptimo artefacto |
|---|---|---|---|---|
| 1 | `tests/emitted-artifacts-declaration.test.mjs:93` | `assert.deepEqual(paths.sort(), [docs_index, roadmap, snapshot])` sobre una emisión **viva** de raíz mínima | **NO — es el cuarto** | **ROMPE**: la lista pasa de 3 a 4 |
| 2 | `tests/emitted-artifacts-declaration.test.mjs:149` | `assert.equal(declared.length, 6)` sobre los dos fixtures **congelados** | sí | **NO rompe**, y **no debe pasar a 7** (§2.3) |
| 3 | `tests/serve-project-emit.test.mjs:523` | `assert.equal(emit.payload.artifacts, 6, …)` sobre una emisión **real** completa | sí | **ROMPE**: debe pasar a 7 |
| 4 | `project-console/serve.mjs:135` | `PROJECT_EMIT_ARTIFACT_PATHS`, la allowlist que la guarda de frontera comprueba **antes** del emisor | sí | **ROMPE**: sin la séptima entrada la guarda **rechaza la escritura** |

Los tres números de línea del ticket son **exactos en disco**, verificados uno a uno. El cuarto
sitio vive **en el mismo fichero que el sitio 2**, 56 líneas más arriba, y es una aserción
distinta sobre un sujeto distinto: por eso un vistazo al fichero declarado no lo encuentra.

### 2.2 El cuarto sitio es un pin del mismo conjunto, no una aserción cualquiera

`tests/emitted-artifacts-declaration.test.mjs:86-97`, en el test
«a root with no Git repository declares no git_history». Su comentario lo dice él mismo:

> What IS declared is what this root could produce, and nothing more.

Un `deepEqual` sobre una lista ordenada es **exhaustivo por construcción**: cumple la función que
el ticket asigna al pin — «que el conjunto no crezca en silencio» — con más fuerza que un conteo,
porque además fija los nombres. Es un pin.

**Medido, no deducido.** Ejecutada `writeProjectFolder` sobre una raíz mínima recién creada
(mismo fixture que el test construye), la emisión produce hoy exactamente tres artefactos:

```
.project/docs_index.json | .project/roadmap.json | .project/snapshot.json
```

El criterio 4 exige que el índice de reportes se emita **siempre** — un proyecto sin `reports/`
emite `[]` declarado, no omite el artefacto. Un artefacto incondicional entra en `written` en
`writeProjectFolder` (`tools/projector/project.mjs:1809-1881`) y por tanto en `emitted_artifacts`.
Esa raíz pasa a emitir **cuatro**, y el `deepEqual` de tres falla.

### 2.3 El sitio 2 NO puede actualizarse como dice el ticket, y ése es el segundo hallazgo

El ticket instruye «ACTUALIZA LOS TRES SITIOS DEL PIN». Para el sitio 2, actualizar el `6` a `7`
**sería falso** y pondría el test en rojo.

Ese `assert` no mide el emisor: lee `.project/snapshot.json` de los **fixtures congelados**
`tests/fixtures/neighbours/{aiw-console,cantu-studio}/`. `tests/helpers/neighbours.mjs` los
describe sin ambigüedad:

> FROZEN ON 2026-07-30 from the two real roots. … nothing in the suite regenerates them.

Verificado leyendo los dos ficheros: ambos declaran **6** artefactos, en el mismo orden
(`guardrails, no_claims, docs_index, roadmap, git_history, snapshot`). Son **datos de 2026-07-30**.
Añadir un artefacto al emisor hoy no los cambia — y **no debe**: un fixture congelado que empezara
a declarar siete estaría afirmando que una emisión de julio escribió un fichero que en julio no
existía.

Así que el sitio 2 es un pin **sobre datos históricos**, no sobre el conjunto vivo, y su cifra
correcta sigue siendo 6 después de este run. El ticket lo agrupa con los otros dos como si los
tres fueran homogéneos, y no lo son. Esto es «algo de este ticket que no cuadra con el disco», y
el disco manda.

### 2.4 Referencias en prosa que quedan obsoletas (no ejecutables, no son pins)

No rompen ningún test, pero mienten en cuanto el conjunto sea siete, y se listan para que la
resolución las contemple:

| sitio | texto |
|---|---|
| `project-console/serve.mjs:26` | «re-emits ALL SIX artifacts» |
| `project-console/serve.mjs:129` | «THE SIX ARTIFACTS a full emission writes» |
| `project-console/serve.mjs:731` | «re-emits ALL SIX artifacts» |
| `tests/serve-project-emit.test.mjs:321` | el **nombre** del test: «…; the six artifacts pass» (el cuerpo itera la constante, así que no rompe) |
| `tests/helpers/real-like-project.mjs:5,10,19-20` | «the six real artifacts», «a full six-artifact emission», «emits six artifacts, skips none» |
| `tools/project-console/build-registry-digest.mjs:9-15` | el razonamiento del #50, que afirma que la emisión «writes exactly six files» y nombra los tres pins |

Un apunte de diseño que **no** es un pin pero condiciona los tests del criterio 7:
`tests/helpers/real-like-project.mjs:32` copia `["roadmap", "governance", "docs", "README.md",
"package.json", ".git"]` — **`reports/` no está en la lista**. La emisión «real» de
`serve-project-emit.test.mjs` produciría por tanto el índice **vacío**, no el poblado. El caso con
reportes necesita fixture propio o una entrada más en `COPIED`; decidirlo es parte de la
resolución, no de esta parada.

---

## 3. GATILLO 2 — el séptimo artefacto rompe algo que el ticket no contempla

Es el mismo hecho de §2.2 leído por la otra puerta del criterio 8. El ticket contempla que el
séptimo artefacto obligue a mover **tres conteos**. Lo que rompe de verdad es una **lista
exhaustiva de nombres** en un test cuyo sujeto es la raíz mínima — un caso que el ticket no
menciona en ningún criterio, y que no se arregla cambiando un `6` por un `7`: hay que añadir
`.project/reports_index.json` a un `deepEqual` de tres elementos, y decidir en el mismo acto que
el artefacto es incondicional (que es justo lo que el criterio 4 ordena, y lo que hace fallar el
test).

**Ninguno de los dos gatillos es una objeción al trabajo.** El eje del #50 encaja (§1), la forma
de `docs_index` **sí se puede seguir** (§4) y el caso vivo existe (§5). Lo que falla es el mapa de
pins del ticket, y el criterio 8 dice qué hacer con eso.

---

## 4. La forma de `docs_index` SÍ se puede seguir — el tercer gatillo NO se activó

Medido en `tools/projector/project.mjs`. El modelo es reproducible sin inventar nada:

| pieza del modelo | dónde está | cómo se copia |
|---|---|---|
| envuelta común | `projectFileEnvelope` `:1098` | `schema_version`, `project_id`, `generated_at`, `generated_from`, `sources` |
| ruta de salida | `PROJECT_DOCS_INDEX_RELATIVE_PATH` `:753` | un `PROJECT_REPORTS_INDEX_RELATIVE_PATH = join(PROJECT_DIR, "reports_index.json")` exportado igual |
| guarda de escritura | `resolveInsideProject` `:1790` | ya sirve: rechaza cualquier destino fuera de `.project/` |
| rutas relativas POSIX | `repoRelative` `:869` + `.split(sep).join("/")` | idéntico |
| declaración de construcción | `docs_source` `:1412-1430` (`mode`, conteos, `field_rules`, `unresolved_policy`) | un `reports_source` con la misma anatomía |
| ausencia declarada | `scanDocsIndex` `:1458` + doctrina de `emitted_artifacts` `:336` | `[]` declarado ≠ artefacto ausente |
| alta en la emisión | `writeProjectFolder` `:1837-1840` | una llamada más, **sin** el `if (!data) return` que salta los nulos |

La escritura es atómica (`writeJsonAtomic` `:706`) y la emisión ya declara lo que escribió
(`emitted_artifacts`, construido de `written`, `:1859-1862`). Nada de esto está en discusión.

---

## 5. El caso vivo, verificado en disco y no dado por bueno desde el ticket

**Existe, y es el único.** Barrido de todo el workspace, no sólo del proyecto que el ticket
nombra:

```
find . -path "*/reports/*/report.json"
→ ./projects/cantu-quizzes-latex/reports/RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001/report.json
```

Un único resultado. Medido en ese fichero: **19 150 bytes**, parsea como JSON, y lleva los campos
que el criterio 3 pide indexar —

| dato | valor medido |
|---|---|
| `run_id` | `RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001` |
| `emitted_at` | `2026-08-08T22:40:00Z` |
| carpeta | `reports/RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001/` |
| vecinos | `report.html` (39 446 B), `_render.template.html` (20 033 B) |
| `verdict.json` | **AUSENTE** |

**No existe ni un `verdict.json` en todo el workspace** (`find . -name verdict.json` → cero
resultados). Consecuencia para el criterio 7: la rama «verdicto presente» **no tiene caso vivo
hoy** y sólo puede cubrirse con fixture. Es un dato para la resolución, no un obstáculo.

**El caso vacío del criterio 4, medido en las cinco raíces del workspace:**

| raíz | `reports/` |
|---|---|
| `projects/cantu-quizzes-latex` | **presente**, 1 run |
| `projects/aiw-console` | ausente |
| `projects/cantu-studio` | ausente |
| `projects/cantu-lessons` | ausente |
| `aiw` | ausente |

Dos apuntes donde el ticket y el disco discrepan, menores y sin efecto sobre la parada:

- El ticket habla de «los otros **cuatro** repositorios». El registro
  (`project-console/projects.json`, `registry_model: project_registry_v1`) lista **cuatro en
  total** — `aiw-console`, `cantu-studio`, `cantu-quizzes-latex`, `aiw` — o sea **tres** otros.
- `projects/cantu-lessons` existe en disco y **no está en el registro**. No es un quinto
  repositorio registrado; se midió por completitud del barrido.

---

## 6. Suite — la base real, verificada

| | tests | pass | fail |
|---|---|---|---|
| base medida hoy, antes de tocar nada | **556** | **555** | **1** |

**La base 556/555/1 que reportó el encargo anterior es correcta**, verificada ejecutando
`node --test` sobre el árbol tal como estaba. El único fallo es el pin conocido:

- `tests/classification-care-budget.test.mjs:153` — «C.3: absent is VALID and is today's state»,
  `AssertionError: this repo declares no care budget, and that is valid`. No se repara y **no es
  gatillo de parada**, como dice el criterio 7.
- `tests/roadmap-engine.test.mjs:93` — **en verde**, como decía el ticket.

Cero fallos nuevos, porque no se cambió ni una línea de producción.

---

## 7. Qué haría falta para reanudar

Tres decisiones, todas del operador porque las tres cambian el mapa que el ticket declaró:

1. **El cuarto sitio** (`emitted-artifacts-declaration.test.mjs:93`) se actualiza añadiendo
   `.project/reports_index.json` al `deepEqual`, quedando en cuatro rutas para la raíz mínima.
2. **El sitio 2** (`:149`) se queda en **6** y se le añade el motivo por escrito (mide fixtures
   congelados el 2026-07-30, no el emisor vivo); la garantía que el ticket creía tener ahí se
   cubre con una aserción **viva** nueva, sobre una emisión completa que declare siete.
3. **`reports/` entra o no en `COPIED`** de `tests/helpers/real-like-project.mjs`, que decide si
   el caso poblado se prueba sobre la copia real o sobre fixture propio.

Con eso, los sitios 3 y 4 se actualizan como el ticket dice (`6` → `7`, y la séptima entrada en
`PROJECT_EMIT_ARTIFACT_PATHS`), la prosa de §2.4 se pone al día, y el trabajo de §4 y §5 procede
sin más obstáculos medidos.

---

## 8. Alcance: qué se tocó y qué se verificó intacto

**Escrito: UN fichero, este record.**

- `context/aiw-console/records/INDICE-DE-REPORTES-PARADA-O4-P17.md`

**No escrito, por la parada:** el emisor del índice, los cuatro sitios del pin, la prosa
obsoleta, y los tests nuevos del criterio 7.

**Verificado intacto al terminar:**

- `roadmap/roadmap.json` y los seis de `.project/` — **no tocados**, mismo `numstat` contra HEAD
  que al empezar (7 ficheros: `roadmap.json` 48/7, `snapshot.json` 92/14, `roadmap.json` de
  `.project/` 50/9, `git_history.json` 16/5, y `docs_index/guardrails/no_claims` 1/1 cada uno),
  que es la inserción de cuatro runs y la apertura de este sin commitear.
- **Los siete siguen en LF**, comprobado byte a byte: **cero secuencias CRLF** en cada uno.
- md5 al terminar, para que la cabina pueda contrastar:
  `roadmap/roadmap.json` `fa286f97cdbb24de84b7fbd6f7131f71`,
  `docs_index` `27d522789ba006029493f5af30feeab3`,
  `git_history` `c978fe384c078886f8f58b8668d4f83c`,
  `guardrails` `64f71d9b3b704acc2762c77d4610950a`,
  `no_claims` `7ea243c2e3c6227fffb4aa5153d43458`,
  `roadmap` `801251f22da9538c72138b6947b7d56f`,
  `snapshot` `47102dd6a34ab6b13e8c3216079f482d`.
- **Los otros repositorios se LEYERON y no se escribieron.** La única lectura fuera de
  `aiw-console` fue el barrido de `reports/` y el `report.json` de `cantu-quizzes-latex`.
- **Ningún comando Git que escriba.** Las dos únicas invocaciones fueron
  `git --no-optional-locks diff HEAD --numstat` (lectura). No queda ningún `.git/index.lock`.
- No se cambió el `status` del run, no se re-emitió `.project/`, no se tocó `roadmap/roadmap.json`.
