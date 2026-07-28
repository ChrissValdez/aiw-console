# AUDITORÍA DE CONTENIDO DE AIW

**Fecha:** 2026-07-28 · **Naturaleza:** READ-ONLY. No convierte, no emite, no
propone estructura, no ordena trabajo, no escribe nada fuera de este archivo. ·
**Máquina:** PC (Windows 10, `C:\Users\chris\Documents\AIW_Workspace\`).

## Para qué existe este record

`MEDICION-ESTADO-DE-AIW.md` (2026-07-28) midió la **estructura** de AIW: cuántos
objetivos, en qué carpetas, qué campos llevan, qué brecha hay contra
`roadmap_tree_v1`. Ese record es el insumo de éste y **no se re-mide aquí**: sus
cifras se dan por buenas y se citan como `MEDICION §n`.

Lo que aquel no abrió son los **cuerpos**. Este record los abre: qué dicen los 11
tickets abiertos, qué forma tiene el kernel en las costuras donde entraría trabajo
nuevo, dónde están los dos audit reports, y qué prueban los tres casos de fallo.

Es insumo de una decisión de cabina. **No propone estructura de roadmap, no mapea
ningún ticket contra ninguna propuesta, y no decide nada.**

## Verificación de no-escritura sobre `aiw`

`aiw` no se modificó en ningún byte. Medido antes y después de toda la sesión con
el mismo método que el record de medición:

| Medida | Antes | Después |
|---|---|---|
| `git rev-parse HEAD` | `ca3087d8c2686c8250f512838b36ce6cd590800a` | `ca3087d8c2686c8250f512838b36ce6cd590800a` |
| `git status --porcelain` | 0 líneas | 0 líneas |
| archivos (excl. `.git`) | 146 | 146 |
| md5 del manifiesto (`find` excl. `.git` → `md5sum` de todos los archivos → `md5sum`) | `b59bf289515c212ae4ddfee9049a5aa6` | `b59bf289515c212ae4ddfee9049a5aa6` |

Los cuatro valores de partida **coincidieron a la entrada** con los que el encargo
declaró; por eso el encargo continuó.

`cantu-studio` no se tocó ni se leyó. En `aiw-console` el único archivo nuevo es
este record; no se tocó ningún roadmap, ni `CONTRATO.md`, ni `DECISIONES.md`, ni
handoffs, ni records existentes. No se emitió ni re-emitió ningún `.project/`. No
se levantó la consola, el proyector ni el validador. **No se corrió la suite de
AIW.**

**Nota de método — una ejecución de código, pura y read-only.** Para el bloque 1
se importó `aiw/kernel.mjs` como módulo y se ejecutaron `parseObjective` y
`parseGlobs` sobre los 11 tickets. Las dos funciones son puras: leen un string y
devuelven un objeto o lanzan. Importar el módulo **no** dispara el bloque CLI
(`kernel.mjs:470` compara `process.argv[1]` con la URL del módulo), así que no
corrió `main()`, ni git, ni claude, ni ningún test. El script vive en el
scratchpad de la sesión, fuera del workspace.

**Desviación declarada del presupuesto de git.** El encargo acotaba git a
`status --porcelain`, `rev-parse HEAD` y `ls-files`. Se ejecutó además **un**
`git log --oneline -3 -- kernel.mjs` (lectura pura) porque corrobora directamente
el hallazgo 1.2.a. Se declara aquí en vez de ocultarlo. Nada más de git se corrió.

## Abreviaturas de cita

| Abreviatura | Archivo |
|---|---|
| `K` | `aiw/kernel.mjs` |
| `Q` | `aiw/queue.mjs` |
| `CONST` | `aiw/CONSTITUCION.md` |
| `CFG` | `aiw/config.json` |
| `AUD-K` | `_reference/audits/Audit_Report_AIW_Kernel_v1.md` |
| `AUD-C` | `_reference/audits/Audit_Report_Contexto_Metodologia_v1.md` |
| `MEDICION` | `projects/aiw-console/context/aiw-console/records/MEDICION-ESTADO-DE-AIW.md` |
| `RM-AIW` | `projects/aiw-console/context/aiw/roadmap_AIW_temp.md` |
| `DELEG` | `projects/aiw-console/context/aiw/DELEGACION.md` |
| `DEC` | `projects/aiw-console/context/DECISIONES.md` |

Lo medido de primera mano hoy va sin marca. Lo que es inferencia va marcado
**[NO VERIFICADO]** o **[INFERENCIA]**, explícitamente.

---

# 1. Los 11 tickets abiertos, uno por uno

Son 11: `objectives/pending/` (2), `objectives/parked/` (3),
`objectives/qualification/` (3), `objectives/queue-e7/` (3). Los 11 están
**trackeados en git** (`git ls-files objectives` → 24 entradas, incluidos los 11
abiertos, los 11 de `processed/` y dos `.gitkeep`).

## 1.1 La tabla

La columna «Título literal» transcribe **la primera línea bajo el encabezado de
objetivo**, tal cual está en el archivo (es lo que el emisor de la vista de
roadmap toma como `title`, `MEDICION §3.2.B`). «Categoría» es **inferencia de
este record**, no un dato en disco: ningún ticket lleva campo de categoría
(`MEDICION §3.1`). «¿Carpeta en `logs/`?» se resuelve por el id que el kernel
derivaría del nombre de archivo (`K:281`: basename sin `.md`, minúsculas,
saneado) — para los 11, el id es idéntico al nombre del archivo.

| # | Ruta | Título literal de su objetivo | Qué pide | Proyecto destino | Categoría [INFERENCIA] | ¿Carpeta en `logs/`? |
|---|---|---|---|---|---|---|
| 1 | `objectives/pending/005-roadmap-contract-fix.md` | «Make the projector emit a Roadmap view that actually satisfies the console's» | Que el proyector emita un `roadmap.json` que cumpla de verdad el contrato del lector v3 de la consola, con seis criterios enumerados contra cites `pc.js:NN`. Corrige tres cosas: títulos y summaries tomados del `# Objective` y no del H1 `# Project`; `parked/` cae en Later incluso con `pending/` vacío; y `ERROR-`/`HUMAN_REVIEW-` dejan de renderizarse como completions verdes y pasan a `blocked` con su `closeout_result`. Exige un test que cargue el archivo **emitido**, no un objeto en memoria. | `console` | **semi-autónomo** — toca el contrato del emisor y su primera instancia; DELEG §5 pone «plumbing incierto» en SEMI | **sí** — `logs/005-roadmap-contract-fix/` |
| 2 | `objectives/pending/006-roadmap-delivery-path.md` | «The Roadmap reader fetches ../../.aiw/roadmap/roadmap.json» | Cerrar el desajuste de ruta de entrega: el lector congelado busca `.aiw/roadmap/roadmap.json` (`pc.js:11`) y la proyección de arranque solo deposita en `.aiw/views/`, así que la pestaña da 404. Pide entregar el roadmap en **ambas** rutas, con escritura atómica y fail-soft, documentarlo en `snapshot-schema-v1.md` y que los tests de startup-projection lo aserten. | `console` | **semi-autónomo** — cadena dependiente de 005 (DELEG §5) | **sí** — `logs/006-roadmap-delivery-path/` |
| 3 | `objectives/parked/001-arithmetic-columns-guard.md` | «Add a fail-closed guard to the Author Lite compiler that rejects `arithmetic` blocks as a child of `columns` in Web. (Ticket: PASS-FUTURE-WEB-COMPONENT-ARITHMETIC-COLUMNS-COMPILER-GUARD-P3, docs/author-lite/NEXT_STEPS.md.)» | Añadir un guard fail-closed en `compiler.js` para que `columns` rechace hijos `arithmetic`, siguiendo el patrón de error ya existente (~línea 1153). Exige contrato **inalterado** para los hijos hoy válidos (rule, card, narrative, callout) y un test nuevo con al menos un caso de rechazo y uno de hijo válido que sigue compilando. | `jame_snapshot` **(no registrado en `CFG`)** | **semi-autónomo** — toca el compilador, superficie sensible (D-029: «lo que toca superficie sensible va semi o manual») | **no** |
| 4 | `objectives/parked/002-hierarchy-docs-drift.md` | «Fix the documentation drift for `hierarchy` in the author-facing component docs so they reflect the current bounded contract. (Ticket: PASS-FUTURE-WEB-COMPONENT-HIERARCHY-DOCS-DRIFT-FIX-P3, docs/author-lite/NEXT_STEPS.md.)» | Corregir la deriva documental de `hierarchy` contra el estado técnico declarado en `NEXT_STEPS.md`: solo top-level Web, contrato acotado de `nodes[]`, `color` hex opcional sin certificar el Color System, no es hijo de `columns`, sin iconos de autor. Prohíbe explícitamente inventar capacidades y prohíbe marcarlo QA-approved o CERTIFIED. | `jame_snapshot` **(no registrado en `CFG`)** | **autónomo** — docs-only y reversible; D-029 nombra «documentar» como el ejemplo de autónomo, y DELEG §5 pone «docs drift» en DESATENDIDA | **no** |
| 5 | `objectives/parked/003-video-provider-docs-drift.md` | «Fix the documentation drift for `video` providers in the author-facing component docs so they align with the already-repaired bounded contract. (Ticket: PASS-FUTURE-WEB-COMPONENT-VIDEO-PROVIDER-PLATFORM-DOCS-DRIFT-P3, docs/author-lite/NEXT_STEPS.md.)» | Lo mismo para `video`: alinear los docs con el contrato ya reparado tras la re-auditoría de seguridad de iframe — solo YouTube y Vimeo, payloads peligrosos rechazados o neutralizados, `renderVideo.js` falla cerrado con sandbox/referrerpolicy/allow mínimo, no es hijo de `columns`, QA humano pendiente. Prohíbe prometer proveedores más allá de YouTube/Vimeo. | `jame_snapshot` **(no registrado en `CFG`)** | **autónomo** — mismo razonamiento que el 4 | **no** |
| 6 | `objectives/qualification/e5-secreto.md` | «Añade un pequeño módulo de utilidad de formato de cadenas en `src/credentialFormatter.mjs` que exporte una función `formatCredential(user)` cuyo retorno sea la cadena `"user:" + user`. Es una utilidad de formato de texto; no lee, almacena ni maneja secretos reales.» | Fixture de cualificación del kernel, no trabajo de producto: pide crear un archivo cuyo **nombre** dispara el regex de secretos (`K:180`) aunque el código sea legítimo, para ejercer `BLOCKED_SECRETS` de punta a punta sin depender de que el executor coopere. | `sandbox` | **semi-autónomo** — fixture cuyo valor es que un humano observe el camino triste (DELEG §2 P3: «lo nuevo nunca debuta de noche») | **no** |
| 7 | `objectives/qualification/e6-changes-requerido.md` | «Crea `src/saludo.mjs` que exporte `saludar(nombre)` devolviendo la cadena `"Hola, " + nombre + "!"`.» | Fixture: el primer criterio es trivial, pero el segundo exige un `src/COVERAGE.md` con cobertura 100 % **medida de verdad**, con comando y salida real — incumplible dentro del run. Sirve para forzar `CHANGES_REQUIRED` ronda tras ronda y agotar `Max rounds`. Su verificación es `node -e "process.exit(0)"`, es decir siempre verde: el bloqueo lo pone el reviewer, no los tests. | `sandbox` | **semi-autónomo** — mismo razonamiento que el 6 | **no** |
| 8 | `objectives/qualification/e8-multiarchivo.md` | «Refactoriza la aritmética del sandbox extrayéndola a un módulo nuevo: crea `src/operaciones.mjs` que exporte una función `suma(a, b)` correcta (devuelve `a + b`), y modifica `src/suma.mjs` para que importe `suma` desde `./operaciones.mjs` y la reexporte. Esta extracción debe dejar corregido el bug actual (hoy resta en vez de sumar).» | Fixture del camino feliz multi-archivo: extraer la suma a un módulo nuevo y reexportarla desde el viejo, corrigiendo de paso el bug sembrado. Verifica que el guard de alcance tolera un objetivo que toca dos archivos dentro de `src/**`. | `sandbox` | **autónomo** — patrón probado, reversible, suite verde (DELEG §5: «refactors con suite verde» en DESATENDIDA) | **no** |
| 9 | `objectives/queue-e7/a-resta.md` | «Añade a `src/suma.mjs` una función exportada `resta(a, b)` que devuelva `a - b`. No cambies la función `suma` existente ni su corrección.» | Fixture trivial, primer elemento del lote alfabético de la prueba de cola E7. Añade `resta` sin tocar `suma`. | `sandbox` | **autónomo** — trivial y probado | **no** |
| 10 | `objectives/queue-e7/b-multiplica.md` | «Añade a `src/suma.mjs` una función exportada `multiplica(a, b)` que devuelva `a * b`. No cambies la función `suma` existente ni su corrección.» | Fixture trivial, segundo del lote E7. Añade `multiplica` sin tocar `suma`. | `sandbox` | **autónomo** — trivial y probado | **no** |
| 11 | `objectives/queue-e7/c-imposible.md` | «Objetivo imposible por diseño (validación del camino triste dentro de la cola): la verificación de este ticket siempre falla, así que ninguna ronda podrá cerrarse en verde.» | Fixture imposible por construcción: su `# Verificación` es `node -e "…; process.exit(1)"`, siempre roja. Tercero del lote E7; su función es probar que un fallo **no detiene la cola**. | `sandbox` | **semi-autónomo** — fixture de camino triste, requiere ojo humano | **no** |

**Sobre `# Max rounds`:** los tickets 1 y 2 declaran `3` explícitamente
(`005…md:80-81`, `006…md:31-32`). Los 9 restantes **no llevan la sección** y
tomarían el default 3 (`K:20`, `K:123`) si llegaran a parsearse — ver 1.2.a.

**Ninguno de los 11 lleva `run_id`, `status`, `queue_order`, `depends_on`, fecha,
categoría ni batch.** Es lo ya medido en `MEDICION §3.1` y se confirma leyendo los
11 cuerpos completos: los únicos encabezados que aparecen son los siete del
template (`templates/objective.md:4-23`), en inglés o en su traducción española.

## 1.2 Dos hallazgos que la tabla condensa

### (a) Seis de los 11 tickets **no parsean hoy**. Medido, no inferido.

`parseObjective` (`K:129-149`) normaliza cada encabezado H1 con `stripAccents`
(`K:120`) y luego busca las claves **en inglés**: `project`, `objective`,
`acceptance criteria`, `scope`, `out of scope`, `verification`, `max rounds`
(`K:138-144`). Los seis tickets de `qualification/` y `queue-e7/` llevan sus
encabezados en español (`# Proyecto`, `# Objetivo`, `# Criterios de aceptación`,
`# Alcance`, `# Fuera de alcance`, `# Verificación`). `stripAccents('Proyecto')`
= `"proyecto"`, que no es `"project"` — así que las tres secciones requeridas
salen vacías y `K:146-147` aborta.

Ejecutado sobre los 11 archivos reales (import puro del módulo, ver nota de
método):

```
pending/005-roadmap-contract-fix.md   -> OK  project="console"        maxRounds=3
pending/006-roadmap-delivery-path.md  -> OK  project="console"        maxRounds=3
parked/001-arithmetic-columns-guard.md-> OK  project="jame_snapshot"  maxRounds=3
parked/002-hierarchy-docs-drift.md    -> OK  project="jame_snapshot"  maxRounds=3
parked/003-video-provider-docs-drift.md->OK  project="jame_snapshot"  maxRounds=3
qualification/e5-secreto.md           -> ABORT: missing required sections: project, objective, criteria
qualification/e6-changes-requerido.md -> ABORT: missing required sections: project, objective, criteria
qualification/e8-multiarchivo.md      -> ABORT: missing required sections: project, objective, criteria
queue-e7/a-resta.md                   -> ABORT: missing required sections: project, objective, criteria
queue-e7/b-multiplica.md              -> ABORT: missing required sections: project, objective, criteria
queue-e7/c-imposible.md               -> ABORT: missing required sections: project, objective, criteria
```

Esos seis **sí corrieron** en su día (`records/QUALIFICATION.md:16-23` los
documenta como E5..E8 y E7 a/b/c, todos con resultado observado). Lo que cambió es
el parser, no los tickets: el commit `7659ff3` se llama literalmente «aiw2:
**english normalization** + green-baseline preflight + supervised-run prep». El
template quedó en inglés (`templates/objective.md:4-23`) y los seis fixtures se
quedaron atrás.

Consecuencia medible: **seis de los 11 tickets abiertos de AIW son letra muerta
bajo el kernel de hoy.** Abortarían en `K:147` antes de tocar git, antes del
lockfile y antes del preflight. Y son además los seis que `MEDICION §3.1` ya midió
como **invisibles a la consola** (fuera de `OBJECTIVE_CLASSIFICATIONS`,
`PROJ:97`): están en disco, en el repo y en el remoto, no aparecen en ninguna
vista, y tampoco se pueden ejecutar.

### (b) Los tres tickets `parked/` nombran un proyecto que no existe en la config.

Los tres declaran `# Project` → `jame_snapshot`. `CFG:4-17` registra exactamente
**dos** proyectos: `sandbox` y `console`. `K:274-275` busca la clave y aborta si
falta:

> `Project "jame_snapshot" not registered in config.json (have: sandbox, console)`

Así que los tres parsean bien pero abortarían en la línea siguiente. Dos datos que
acompañan y que no resuelven la pregunta, solo la sitúan:

- `aiw/.gitignore:5` ignora `jame_snapshot/` — el repo previó una carpeta con ese
  nombre en su raíz. **No existe hoy en disco** (`ls` de la raíz de `aiw`: no
  aparece).
- `templates/objective.md:5` usa `jame_snapshot` como **el ejemplo** de clave de
  `config.json` para el campo `# Project`. El template enseña una clave que la
  config no tiene.

Su verificación declarada es `node --test "tools/author-lite/compiler-api/tests/*.test.mjs"`
y su scope apunta a `tools/author-lite/**` y `docs/author-lite/**` — el árbol de
`cantu-studio`. **[NO VERIFICADO]** si esas rutas resuelven hoy contra
`projects/cantu-studio`: este encargo tiene ese repo fuera de alcance y no lo
abrió.

## 1.3 Sobre la columna «categoría»: qué es y qué no es

La categoría **no está en el dato**. D-029 (`DEC:246-268`) la define como algo
«asignado POR EL HUMANO al crear el run», con tres valores —manual,
semi-autónomo, autónomo— que se distinguen **por lo que pasa en el cierre**, no
por cuánta supervisión se siente. `RM-AIW:13-16` declara además, a nivel de
roadmap, que **todos** los runs de AIW son categoría `manual` mientras dure la
regla anti-auto-hosting, con la excepción explícita de que los runs contra
`aiw-console` sí son delegables al kernel.

Esas dos afirmaciones se cruzan de forma incómoda con estos 11 tickets, y el
cruce es el hallazgo, no la categoría:

- Los 11 son **objetivos del kernel** (formato `templates/objective.md`), es decir
  entradas de un ejecutor que no es el humano. Por construcción no son «manual»
  en el sentido de D-029 («su ejecutor es el humano, no el kernel»).
- Pero `RM-AIW:13-16` dice que los runs del roadmap de AIW son manual. **Los 11
  tickets no están en el roadmap de AIW**: son cola operativa del kernel contra
  otros proyectos (`console`, `sandbox`, `jame_snapshot`), no ítems del backlog de
  AIW. Las dos poblaciones son disjuntas y el vocabulario de categoría hoy solo
  cubre una.
- Y tanto «semi-autónomo» como «autónomo» exigen en su definición que AIW
  «commitea y **pushea** su rama … (safepoint)» (`DEC:254-258`). Medido:
  `CFG:9` y `CFG:15` declaran `"push": false` para los dos proyectos
  registrados. Los 9 runs de `logs/` lo confirman en su cuerpo: los 8 con
  desenlace dicen `push: not configured for this project`. **Hoy ningún run de
  AIW puede satisfacer literalmente la definición de semi-autónomo ni la de
  autónomo**, porque ninguno pushea.

Por eso la columna va marcada `[INFERENCIA]` entera. Se ofrece porque el encargo
la pide, con la regla de asignación anclada en D-029 y DELEG §5, y se advierte que
**ninguna de las tres categorías encaja limpio** en el estado de hoy.

---

# 2. Vivo o muerto, resuelto por nombre

La cola visible son los 5 de `pending/` + `parked/`. La pregunta es cuáles tienen
su run ya cerrado en `logs/`. `MEDICION §5.2.a` afirma que son dos. **Confirmado:
son dos, y son éstos.**

| Ticket de la cola visible | Carpeta de `logs/` que lo prueba | Veredicto que registra su `summary.md` | Cerrado |
|---|---|---|---|
| `objectives/pending/005-roadmap-contract-fix.md` | `logs/005-roadmap-contract-fix/` | **APPROVED** — «approved by reviewer in round 1», rondas 1/3, `push: not configured` | `2026-07-19T02:11:11.488Z` |
| `objectives/pending/006-roadmap-delivery-path.md` | `logs/006-roadmap-delivery-path/` | **APPROVED** — «approved by reviewer in round 1», rondas 1/3, `push: not configured` | `2026-07-19T01:46:04.888Z` |
| `objectives/parked/001-arithmetic-columns-guard.md` | — | — | — |
| `objectives/parked/002-hierarchy-docs-drift.md` | — | — | — |
| `objectives/parked/003-video-provider-docs-drift.md` | — | — | — |

**Vivos: los tres `parked/`. Muertos (run cerrado, archivo sin archivar): los dos
`pending/`.**

Prueba de que las dos carpetas son de esos dos tickets y no de otros: el
`summary.md` de cada una lleva el id en su título (`# Summary — 005-roadmap-contract-fix`),
y `logs/005-roadmap-contract-fix/objective.md` es la copia literal que el kernel
guarda del objetivo (`K:337`). Los archivos tocados que declara el summary de 005
—`tools/projector/project.mjs`, `tests/roadmap-emitted.test.mjs` y cinco fixtures
`honest-project/**`— corresponden uno a uno al scope y al criterio (d) del ticket.

**La trampa de la resolución por nombre, y por qué el encargo insistía en
resolverla por nombre.** `logs/` contiene `001-console-projector`,
`002-canonical-path-and-autoproject` y `003-roadmap-emitter`. Los tres `parked/`
se llaman `001-arithmetic-columns-guard`, `002-hierarchy-docs-drift` y
`003-video-provider-docs-drift`. **Coinciden en el prefijo numérico y en nada
más.** El id de log lo deriva el kernel del nombre completo del archivo
(`K:281`), así que un run de `001-arithmetic-columns-guard` escribiría en
`logs/001-arithmetic-columns-guard/`, que no existe. Los tres runs `00N-` de
`logs/` son de `console`, no de `jame_snapshot`, y sus tickets ya están archivados
como `processed/APPROVED-001-console-projector.md`, `…-002-…`, `…-003-…`.
Resolver «vivo o muerto» por número habría dado los tres parked por muertos.

**Causa de los dos muertos.** Ya está medida en `MEDICION §5.2.a` y no se re-mide:
`queue.mjs` es lo único que archiva (`Q:58`), y `kernel.mjs` invocado directamente
sobre un objetivo suelto no archiva nada. Lo que este record añade es que la
lectura del cuerpo la refuerza: `Q:49` solo recorre `objectives/pending/*.md`, y
`Q:58` compone el destino como `processed/<STATE>-<f>`, donde `<STATE>` sale de
`Q:18` mapeando el exit code del kernel. Un run que no pasó por `queue.mjs` no
tiene ninguna otra ruta de archivado en el sistema.

---

# 3. Las cuatro costuras de `kernel.mjs`

`aiw/kernel.mjs` = **478 líneas** (medido hoy; coincide con `MEDICION §5.3`).

## (a) Dónde termina la verificación y empieza el reviewer

**El punto de inserción del parking doc queda CONFIRMADO, sin corrección.** Su
cifra `:381-392` es exacta y su origen está localizado: `AUD-K:130` dice
literalmente

> «Dentro del round loop, entre la verificación (`kernel.mjs:381-390`) y el
> reviewer (`kernel.mjs:392`): es el hueco secuencial donde un paso adicional se
> insertaría como otro `stage()` + `execProc()`, del mismo shape que la
> verificación.»

Verificado línea a línea contra el archivo de hoy:

| Línea | Contenido |
|---:|---|
| `K:380` | `// f. verification (the reviewer is not invoked with red tests)` — abre el bloque |
| `K:381` | `stage(logDir, \`round ${round}: tests started\`)` |
| `K:382` | `const verify = await execProc(verifyCmd, [], { cwd: repo, timeoutMs: tmo.verification })` |
| `K:383` | compone `lastTests` (`$ <cmd>`, exit, flag TIMEOUT, stdout, stderr) |
| `K:384` | `write(path.join(logDir, \`round${round}_tests.txt\`), …)` |
| `K:385` | `stage(logDir, \`round ${round}: tests finished exit=…\`)` |
| `K:386-390` | `if (failed(verify)) { … acumula al log; si es la última ronda → HUMAN_REVIEW; continue }` — **cierra el bloque en `:390`** |
| `K:391` | *(línea en blanco)* — **el hueco** |
| `K:392` | `// g. reviewer (read-only)` — abre el bloque siguiente |
| `K:393-395` | arma el diff `base..HEAD`, lo recorta a `MAX_DIFF` y sustituye vacío por marcador |

Es decir: la verificación es `:380-390`, el reviewer es `:392-405`, y el **punto
de inserción exacto es la línea 391**. La forma que tendría que copiar un paso
nuevo está a la vista en `:381-385`: un `stage(started)`, un `await execProc(...)`,
un `write` a `logs/<id>/`, un `stage(finished exit=…)`.

Dos restricciones que la costura impone y que no se ven en el número de línea:

1. **El reviewer no se invoca con tests rojos** (`K:380`, comentario normativo).
   Un gate insertado en `:391` corre sobre un árbol ya commiteado (`K:370`) y con
   verificación verde. Todo lo que aborte antes de `:391` nunca llega al reviewer.
2. **El `continue` de `K:389` salta al siguiente `round`**, así que un paso nuevo
   que quiera comportarse como la verificación (fallo → otra ronda) tiene que
   replicar esa mecánica; el `break rounds` que usan los guards (`K:367`) es la
   otra opción y sale del loop entero.

## (b) `execProc`: dónde se invoca y qué devuelve

**Definición: `K:98-117`.** Firma `execProc(cmd, args, { cwd, input = null, timeoutMs })`.

Cómo funciona, campo a campo:

- `K:100` — `spawn([cmd, ...args].join(' '), { cwd, shell: true, windowsHide: true })`.
  Un **solo string de comando**, no un array: `K:96-97` explica que un array con
  `shell:true` está deprecado (DEP0190) y que la constraint que lo hace seguro es
  que los args del kernel son tokens de flag fijos sin espacios, y `verifyCmd` ya
  es un string.
- `K:101` — registra el pid en `liveChildren` (el set que los handlers de señal
  usan para tree-kill, `K:68`, `K:74-81`).
- `K:103-106` — timer de `timeoutMs` que marca `timedOut` y llama `killTree(pid)`
  (`K:70-73`: en Windows, `taskkill /PID <pid> /T /F`).
- `K:107-108` — acumula `stdout` y `stderr` en memoria, sin límite propio.
- `K:115` — escribe `input` en stdin si lo hay y cierra stdin siempre.

**Qué devuelve: una `Promise` que SIEMPRE resuelve y NUNCA rechaza.** Dos rutas de
resolución, y ninguna lanza:

| Ruta | Línea | Objeto resuelto |
|---|---|---|
| error de spawn | `K:110` | `{ code: -1, error: <Error>, out, err, timeout: false }` |
| cierre del proceso | `K:111-114` | `{ code, error: timedOut ? new Error('ETIMEDOUT') : null, out, err, timeout: timedOut }` |

El consumidor decide con `failed(r)` (`K:43`): «falló si salió distinto de cero
**o** si hubo error». Es el mismo predicado para los tres llamadores.

**Las tres invocaciones, todas ellas:**

| Línea | Llamador | Comando | Timeout | Qué se hace con el resultado |
|---|---|---|---|---|
| `K:236` | `invokeClaude` (`K:232-237`) | `claude -p --output-format text --no-session-persistence` + `--permission-mode acceptEdits` (executor) o `--tools Read,Grep,Glob` (reviewer) | `tmo.executor` (900 s) / `tmo.reviewer` (600 s) | El `out` crudo va a `round<N>_executor.md` (`K:354`) o `round<N>_reviewer.md` (`K:402`); para el reviewer, además, a `parseVerdict` (`K:408`) |
| `K:325` | pre-flight D-012 | `verifyCmd` | `tmo.verification` (600 s) | Escribe `preflight.txt` (`K:326`); si `failed` → `Abort('red baseline: human intervention required')` (`K:328`) |
| `K:382` | verificación de ronda | `verifyCmd` | `tmo.verification` (600 s) | Escribe `round<N>_tests.txt` (`K:384`); si `failed` → acumula y `continue`, o HUMAN_REVIEW en la última ronda (`K:386-390`) |

`execProc` está **exportado** (`K:229`), junto con `reap`, `liveChildren`,
`ownedLock` y `stageLine`, bajo el comentario «M3/M4 observability + cleanup».

Nota de por qué `execProc` existe en vez de `spawnSync`: `K:94-95` lo dice —
`spawnSync` no mata el árbol en Windows (muere `cmd.exe` y `claude`/`npm`
sobreviven editando). Es exactamente el mecanismo que dejó un executor huérfano en
el incidente del 2026-07-11 (bloque 6.5).

## (c) `superviseVerdict` y `OUTCOMES`: qué valores admiten hoy

**`parseVerdict` (`K:211-215`) — la entrada.** Toma la salida del reviewer, se
queda con la **última línea no vacía** y le exige match exacto contra
`/^VERDICT: (APPROVED|CHANGES_REQUIRED|BLOCKED)$/`. Devuelve el token o `null`.
Tres valores válidos, y `null` para todo lo demás — fail-closed, `K:210`.

**`superviseVerdict(verdict, round, maxRounds)` (`K:218-225`) — la escalera.**
Pura y determinista (D-004). Tabla completa de su comportamiento:

| `verdict` de entrada | Condición | Devuelve |
|---|---|---|
| `'APPROVED'` | — | `'APPROVED'` |
| `'BLOCKED'` | — | `'BLOCKED'` |
| `'CHANGES_REQUIRED'` | `round < maxRounds` | `'CONTINUE'` |
| `'CHANGES_REQUIRED'` | `round === maxRounds` | `'ROUNDS_EXHAUSTED'` |
| `null` o cualquier otra cosa | — | `'HUMAN_REVIEW'` (`K:223`, fail-closed) |

Son **cinco valores de salida**. Cuatro son claves de `OUTCOMES`; el quinto,
`'CONTINUE'`, **no lo es**: se consume antes, en `K:411`, que acumula el reporte
del reviewer al log y salta a la ronda siguiente. Solo si la decisión no es
`CONTINUE` se asigna a `outcome` (`K:412`) y se indexa `OUTCOMES` (`K:421`).

**`OUTCOMES` (`K:28-33`) — la tabla terminal.** `K:25-27` la declara como «single
source of truth for terminal state + process exit code. Nothing derives an exit
code by matching reason strings» (es la corrección F3 de D-022).

| Clave | `state` | `exit` | Cuándo se llega |
|---|---|---:|---|
| `APPROVED` | `APPROVED` | **0** | veredicto APPROVED (`K:220`) |
| `BLOCKED` | `BLOCKED` | **3** | veredicto BLOCKED (`K:221`) **o** guard de scope/secretos (`K:365`) |
| `ROUNDS_EXHAUSTED` | `HUMAN_REVIEW` | **2** | `CHANGES_REQUIRED` en la última ronda (`K:222`) |
| `HUMAN_REVIEW` | `HUMAN_REVIEW` | **4** | no-parse (`K:223`), timeout del executor (`K:375`), executor caído en la última ronda (`K:376`), tests rojos en la última ronda (`K:388`), o el fallback de `K:420` |

**Cuatro claves, tres estados distintos, cuatro exit codes.** `ROUNDS_EXHAUSTED` y
`HUMAN_REVIEW` colapsan al mismo `state` y se distinguen solo por el exit
(2 vs 4) — `K:26-27` lo declara deliberado. `records/QUALIFICATION.md:117-119` lo
recoge como hallazgo H3: «cualquier automatización que consuma exit codes debe
tratar 2 y 4 como "requiere humano"».

**El quinto valor, y no está en el kernel.** `Q:18` define
`STATES = { 0:'APPROVED', 2:'HUMAN_REVIEW', 3:'BLOCKED', 4:'HUMAN_REVIEW', 1:'ERROR' }`.
El `1` no corresponde a ninguna clave de `OUTCOMES`: es el exit del `Abort` o del
error interno, que `K:476` fija fuera de la tabla. Así que **`ERROR` es una
etiqueta de archivado de la cola, no un estado del kernel** — importa para el
bloque 6.1. Y `Q:56` añade el comodín `EXIT_<n>` para cualquier código no
previsto.

Consecuencia para quien vaya a extender la escalera: un estado terminal nuevo hay
que tocarlo en **tres** sitios coordinados —`OUTCOMES` (`K:28-33`),
`superviseVerdict` (`K:218-225`) y `STATES` (`Q:18`)— y el tercero vive en otro
archivo. `AUD-K:133` señala los dos primeros; el tercero se añade aquí.

## (d) Dónde escribe `main()` la evidencia del run

`logDir` se fija una vez, en `K:283`: `path.join(AIW, 'logs', id)`, donde `id`
sale de `K:281` (basename del objetivo sin `.md`, minúsculas, todo lo que no sea
`[a-z0-9._-]` colapsado a `-`). `AIW` es el directorio del propio `kernel.mjs`
(`K:18`), así que la evidencia se escribe **siempre dentro de `aiw/logs/`**,
nunca en el repo objetivo.

Los diez artefactos, con la línea que los escribe y su condición:

| Archivo en `logs/<id>/` | Línea | Condición |
|---|---|---|
| `STAGE.txt` | `stage()` en `K:88-92` (append) | siempre; una línea por transición. Llamado en `K:324`, `:327`, `:353`, `:356`, `:381`, `:385`, `:400`, `:404`, `:410`, `:422` |
| `preflight.txt` | `K:326` | siempre (es lo primero que se escribe; **precede** a la creación de rama) |
| `objective.md` | `K:337` | siempre, copia literal del ticket; **después** de crear rama y pasar los asserts |
| `network_note.txt` | `K:338` | solo si `git fetch origin` falló (`K:311`) |
| `round<N>_executor.md` | `K:354` | por ronda; header HTML con ts, exit y error, luego stdout y `--- stderr ---` |
| `round<N>_tests.txt` | `K:384` | por ronda que llegó a verificación (executor OK) |
| `round<N>_reviewer.md` | `K:402` | por ronda que llegó al reviewer (tests verdes) |
| `proposed_followup.md` | `K:437` | solo si el estado final es `BLOCKED` o `HUMAN_REVIEW` (`K:436`) |
| `summary.md` | `K:445` | siempre en el closeout |
| `parking_note.txt` | `K:454` / `K:458` | solo si el árbol quedó sucio al cierre, o si falló el `checkout` de vuelta a la base |

Dos artefactos **fuera** de `logs/<id>/`: el lockfile `aiw/locks/<base>-<hash>.lock`
(`K:298`, borrado en el `finally` de `K:464`), y la notificación ntfy (`K:443`,
que es un POST HTTP, no un archivo — su status sí se registra dentro de
`summary.md`).

**El orden de escritura es el que resuelve los forenses.** `preflight.txt` se
escribe en `K:326`, antes del `checkout -b` de `K:330`; `objective.md` se escribe
en `K:337`, después. Una carpeta con `preflight.txt` reciente y `objective.md`
viejo prueba que el run murió entre `K:328` y `K:337` — es exactamente el
argumento del bloque 6.1.

`summary.md` (`K:445-448`) lleva: estado final, razón, proyecto y ruta del repo,
rama y base, rondas usadas/máximas, nota de push, status de ntfy, timestamp de
cierre, lista de archivos tocados (`git diff --name-only base..HEAD`, `K:435`) y
dos comandos de revisión matinal.

---

# 4. El techo de 500 líneas: su origen

**Localizado. No hace falta marcar nada `[NO VERIFICADO]`.** El techo está
declarado en un documento normativo, con su razón escrita, y el kernel lo cita
como fuente.

**La declaración canónica: `CONST:28-29`.**

```
## 4. Presupuesto de complejidad
- Techo duro del kernel: ~500 líneas. Para añadir, se borra.
```

**La razón, en dos capas.** La primera es el preámbulo de la constitución entera,
`CONST:3-4`:

> «Estas reglas existen porque AIW v1 (200+ runs) divergió: descubría más deuda de
> la que retiraba. Cada regla rompe un mecanismo específico de esa divergencia.»

La segunda es el resto de la propia §4, `CONST:30-35`, que dice qué mecanismo
rompe este techo en concreto:

- `CONST:30-32` — «Ningún mecanismo nuevo sin incidente documentado en
  `…/context/DECISIONES.md`: fecha, qué se rompió, qué costó, por qué el diff
  matinal no lo cazó. **Una idea no es un incidente. Un miedo no es un
  incidente.**»
- `CONST:33` — «Todo mecanismo nace con criterio de borrado escrito: "se elimina
  si X".»
- `CONST:34-35` — lista de prohibiciones nominales de reintroducción sin
  incidente: «familias, detectores, contract-quality, waivers, carpetas de
  lifecycle, resolvers, coordinators».

Es decir: el techo no es una métrica de estilo, es el **presupuesto** que obliga a
que cada mecanismo nuevo compita contra uno existente. La cifra es el mecanismo de
enforcement; la razón es la divergencia de v1.

**Las otras tres apariciones, todas derivadas y ninguna independiente:**

| Cita | Texto | Relación con la fuente |
|---|---|---|
| `K:4` | `// Hard ceiling: 500 lines (CONSTITUCION §4). Security = Git topology (CONSTITUCION §5).` | El kernel cita explícitamente §4 como su fuente. No la re-declara. |
| `claude.md:20` | «Techo del kernel: ~500 líneas. Añadir algo requiere incidente documentado.» | Resumen operativo. `claude.md:12` lo encabeza con «Lee CONSTITUCION.md antes de cualquier cambio. Resumen no negociable:» — se declara derivado. |
| `records/AUDITORIA_ESTADO.md:89` | «§4 techo ~500 líneas \| 373 observadas; techo citado en kernel.mjs:4 \| ✔ CUMPLE» | Auditoría histórica; comprueba, no declara. |

Nota de casing: `aiw/CLAUDE.md` y `aiw/claude.md` son el mismo archivo bajo
Windows (2.565 bytes, 46 líneas, mismo mtime). `AUD-C:37-38` los lista como dos
entradas y anota la colisión. La cita `claude.md:20` vale para ambos nombres.

**Lo que el techo no dice.** No hay ninguna declaración de qué se hace al
sobrepasarlo (no hay test que lo compruebe, ni hook, ni check en la suite:
buscado sobre todo `aiw`, las únicas apariciones de la cifra son las cuatro de
arriba más menciones descriptivas en `records/`). El enforcement es humano y
documental. `records/CRONICA.md:85` y `logs/INCIDENT-2026-07-11.md:143` registran
el estado como «478/500» — 22 líneas de holgura, que es lo que
`records/AUDITORIA_CONTEXTO.md:141` llama «22 de holgura, techo constitucional
§4».

---

# 5. `_reference/audits/` — localizado

**Método de búsqueda.** `find` sobre todo `C:\Users\chris\Documents\AIW_Workspace`,
con `node_modules` y `.git` podados, en dos pasadas: por directorio
(`-type d -name audits`) y por nombre de archivo (`-type f -iname "Audit_Report*"`).

La pasada por directorio devolvió tres candidatos —
`projects/cantu-studio/docs/archive/author-lite/audits`,
`projects/cantu-studio/docs/author-lite/audits` y `_reference/audits` — de los que
solo el tercero es el buscado. La pasada por nombre devolvió exactamente dos
archivos, los dos ahí dentro. **Los dos existen.**

| | `Audit_Report_AIW_Kernel_v1.md` | `Audit_Report_Contexto_Metodologia_v1.md` |
|---|---|---|
| **Ruta** | `_reference/audits/Audit_Report_AIW_Kernel_v1.md` | `_reference/audits/Audit_Report_Contexto_Metodologia_v1.md` |
| **Tamaño** | 17.732 bytes · 171 líneas | 27.430 bytes · 308 líneas |
| **mtime** | `2026-07-24 06:19:12` | `2026-07-24 06:20:12` |
| **¿Trackeado en git?** | **No** | **No** |
| **Ticket que declara** | `AUDIT-AIW-KERNEL-001` (`AUD-K:3`) | `AUDIT-AIW-CONTEXTO-METODOLOGIA-001` (`AUD-C:3`) |
| **Fecha que declara** | 2026-07-24 (`AUD-K:4`) | 2026-07-24 (`AUD-C:4`) |

**Sobre el tracking en git: no es que estén ignorados, es que no hay repo.**
Medido: `git -C _reference rev-parse --show-toplevel` → `fatal: not a git
repository (or any of the parent directories)`. Lo mismo desde la raíz del
workspace. `AIW_Workspace/` no es un repo y `_reference/` no está dentro de
ninguno: los repos son `aiw`, `projects/aiw-console`, `projects/cantu-studio` y
`projects/cantu-lessons`, y `_reference/` es hermano de todos ellos. Los dos
reports **existen solo en esta máquina**, igual que `aiw/logs/` (`MEDICION` R10).

**Rama y commit que cada uno registra como su frescura.**

`AUD-K` audita un solo repo y lo declara en su cabecera:

| Campo | Valor | Cita |
|---|---|---|
| Repo auditado | `aiw/` (kernel) | `AUD-K:5` |
| Rama | `main` (leída de `aiw/.git/HEAD` → `refs/heads/main`) | `AUD-K:6` |
| Último commit | `ca3087d8c2686c8250f512838b36ce6cd590800a` — «chore(context): rutas a context/DECISIONES.md (D-038)» | `AUD-K:7` |

`AUD-K:7` añade que lo leyó de `.git/refs/heads/main` y `.git/logs/HEAD` y que
**no ejecutó ningún comando de git**. `AUD-K:8` declara el alcance excluido: no se
leyó `projects/aiw-console/`, de modo que ESTADO, DECISIONES, roadmap y DELEGACION
quedan «no determinado» donde harían falta.

**Ese commit es exactamente el HEAD de `aiw` hoy** (medido en el bloque de
no-escritura de este record: `ca3087d8c2686c8250f512838b36ce6cd590800a`). Es
decir: `AUD-K` está **fresco contra el kernel de hoy**, cuatro días después. Es
coherente con lo que se comprobó de primera mano en el bloque 3: sus cites
`:381-390`, `:392`, `:98`, `:218-225`, `:28-33` y `:227-229` caen todas donde dice.

`AUD-C` audita cuatro repos y los tabula en `AUD-C:11-18`:

| Repo | Rama | Commit que registra | Alcance de lectura aplicado |
|---|---|---|---|
| `aiw/` | `main` | `ca3087d` 2026-07-23 — «chore(context): rutas a context/DECISIONES.md (D-038)» | Documentación, contexto y metodología. **No** re-auditó el kernel `.mjs`. |
| `projects/cantu-studio/` | `main` | `8e9991e3` 2026-07-24 — «validator: depends_on no resuelto con forma valida degrada a warning; regenerar snapshot» | Documentación, contexto, roadmaps y metodología |
| `projects/cantu-lessons/` | `main` | `0952ccb` 2026-07-22 — «docs(rename): JAME_Lessons -> cantu-lessons; refs a cantu-studio en prosa» | Documentación, contexto y metodología |
| `projects/aiw-console/` | `main` | `e50a3a3` 2026-07-24 — «roadmap: reorden de O4, prototipo primero y UI/UX antes del corte; handoff» | **Solo inventario superficial** — estructura de primer nivel y existencia de archivos de contexto; no se leyó su código ni su documentación interna |

`AUD-C:20-25` lleva además una nota de alcance que conviene tener presente al
usarlo: como el contexto de gobernanza de AIW ya no vive en `aiw/` sino en
`aiw-console/context/aiw/` (D-037), y ese repo estaba restringido a inventario
superficial, **el contenido de ESTADO, DECISIONES, DELEGACION y
`roadmap_AIW_temp.md` no fue leído** y aparece como «no determinado» en las
secciones donde correspondería. `AUD-C` verificó solo su existencia por nombre.

**Frescura relativa, y es asimétrica.** `AUD-K` sigue clavado al HEAD actual de
`aiw`. Para los otros tres repos de `AUD-C` este encargo **no verificó** si los
commits registrados siguen siendo el HEAD: `cantu-studio` y `cantu-lessons` están
fuera de alcance, y correr git sobre `aiw-console` habría excedido el presupuesto
del criterio 7. **[NO VERIFICADO]**, por tanto, la frescura de esas tres filas.
Lo que sí consta de segunda mano es que `aiw-console` ha recibido trabajo continuo
desde el 24 (`MEDICION §2.1` mide su roadmap «al 2026-07-28 00:58» con 45 runs y
registra escritura concurrente de otro carril esa misma noche), así que
`e50a3a3` es con casi total seguridad un HEAD viejo — pero eso es
**[INFERENCIA]**, no medición.

---

# 6. Los tres casos de fallo, con su cuerpo

Los tres viven en `objectives/processed/`, los tres están trackeados en git, y los
tres son **fixtures de cualificación del kernel**: ninguno es trabajo de producto.
Su valor es que cada uno prueba una rama distinta del ciclo.

## 6.1 `ERROR-000-sandbox` — el único de los tres que sí tiene log, y el único cuyo estado no lo puso el reviewer

**Qué pedía** (`objectives/processed/ERROR-000-sandbox.md:5-10`): añadir una
función `subtract(a, b)` a `src/math.mjs` que devuelva `a - b`, más un test, sin
tocar `add`. Tres criterios: `subtract(5,3) === 2`, `add(2,3)` sigue devolviendo
`5`, y `npm test` verde. Scope `src/**, tests/**`, proyecto `sandbox`. Es un
objetivo **perfectamente resoluble**; nada en su cuerpo es imposible.

**Su carpeta de log es `logs/000-sandbox/`** — probado por identidad de contenido:
`logs/000-sandbox/objective.md` es byte a byte el mismo texto que
`processed/ERROR-000-sandbox.md` (es la copia que hace `K:337`). El nombre de la
carpeta sale de `K:281` aplicado al nombre original del ticket,
`objectives/pending/000-sandbox.md`, antes de que la cola le antepusiera el
prefijo `ERROR-` al archivarlo.

**Y esa carpeta dice APPROVED.** Su `summary.md`: «Final state: **APPROVED** —
approved by reviewer in round 1», rondas 1/3, cerrado `2026-07-11T01:56:53.134Z`,
tocó `src/math.mjs` y `tests/subtract.test.mjs`. El `round1_reviewer.md` termina
en `VERDICT: APPROVED` y el `round1_tests.txt` registra `exit=0` con 2/2 tests
verdes (`add` y `subtract`).

**Por qué el archivo dice ERROR: hubo un SEGUNDO run, y sobrescribió la carpeta a
medias.** Los mtimes de dentro de `logs/000-sandbox/` no son consistentes con un
solo run:

| Archivo | mtime | A qué run pertenece |
|---|---|---|
| `objective.md` | `2026-07-10 19:56:07` | run 1 |
| `round1_executor.md` | `2026-07-10 19:56:36` | run 1 |
| `round1_tests.txt` | `2026-07-10 19:56:36` | run 1 |
| `round1_reviewer.md` | `2026-07-10 19:56:52` | run 1 |
| `summary.md` | `2026-07-10 19:56:53` | run 1 (= el `Closed` del summary, `01:56:53Z`) |
| **`preflight.txt`** | **`2026-07-11 00:00:33`** | **run 2 — cuatro horas después que todo lo demás** |

Y el contenido de `preflight.txt` lo confirma: timestamp `2026-07-11T06:00:33.205Z`,
`npm test` `exit=0`, pero con **1 test** (`add` solo) — el sandbox había sido
recreado y ya no tenía el `subtract` que el run 1 había escrito. El run 1, en
cambio, registró **2 tests** en su `round1_tests.txt`.

**Qué demuestra, y es lo que hace a este caso valioso:**

1. **`ERROR` no es un veredicto.** No existe en `OUTCOMES` (`K:28-33`). Es la
   etiqueta que `Q:18` asigna al **exit code 1**, que el kernel reserva para
   `Abort` y error interno (`K:476`). Ningún reviewer emitió ERROR; ningún guard
   lo produjo. Es «el kernel se detuvo antes de tener nada que juzgar».
2. **El run 2 murió entre `K:328` y `K:337`.** El orden de escritura lo acota sin
   ambigüedad: `preflight.txt` (`K:326`) se reescribió; `objective.md` (`K:337`)
   no. Entre esas dos líneas solo hay cuatro salidas posibles: baseline roja
   (`K:328` — descartada, `exit=0`), `checkout -b` fallido (`K:331`), assert de
   rama (`K:333`) y assert de cwd/toplevel (`K:335`).
3. **La causa más probable es la colisión de rama** (`K:331`): el run 1 ya había
   creado `aiw/000-sandbox` en el sandbox, y `K:330-331` aborta explícitamente si
   `checkout -b` choca, con el mensaje «already exists from a prior run? human
   decision». **[NO VERIFICADO]** — comprobar si esa rama existe habría exigido
   correr git sobre `aiw/sandbox`, fuera del presupuesto del criterio 7. Se marca
   como inferencia, aunque la ordenación de artefactos que la sostiene sí está
   medida.
4. **La carpeta de log se reutiliza entre runs del mismo id, y el resultado es
   evidencia contradictoria en disco.** `K:283` deriva `logDir` solo del nombre
   del objetivo; no hay timestamp, ni contador, ni comprobación de que la carpeta
   ya exista. Hoy `logs/000-sandbox/` afirma APPROVED mientras el archivo
   archivado afirma ERROR, y las dos afirmaciones son ciertas sobre runs
   distintos. Es la raíz concreta de la discrepancia (c) que `MEDICION §5.2`
   reporta como «dos archivos de `processed/` reclaman el id `000`».

Corroboración documental: `logs/INCIDENT-2026-07-11.md:90-92` nombra este caso
como colateral previo — «Objetivo sandbox contaminando `pending/` real (M1) …
incidentes previos visibles en el status de aiw (`D pending/000-sandbox.md` +
`?? processed/ERROR-000`)» — y `:116` registra la limpieza: «Higiene git de aiw:
`6cf2738` archiva los restos del sandbox (`pending/000-sandbox.md` →
`processed/ERROR-000-sandbox.md`, rename 100%)». La reparación M1 (`:120-124`)
mudó el objetivo del sandbox **dentro** de `sandbox/` para que no volviera a
contaminar la cola real.

## 6.2 `HUMAN_REVIEW-999-sandbox-imposible` — el camino triste por tests rojos

**Qué pedía** (`objectives/processed/HUMAN_REVIEW-999-sandbox-imposible.md:5-8`):
«Validar el camino triste del kernel: NO hagas ningún cambio en el código.»
Criterio: «La verificación pasa en verde (imposible por diseño: el comando de
verificación de este objetivo siempre falla).» Su `# Verificación` es
`node -e "console.error('verificacion imposible por diseno (camino triste)'); process.exit(1)"`.

**Por qué se bloqueó.** El objetivo se contradice a sí mismo a propósito: pide no
cambiar nada y exige que una verificación que siempre sale con exit 1 salga en
verde. Ninguna acción del executor puede satisfacerlo.

**Qué comportamiento del ciclo demuestra: la rama de tests rojos, que no llega
nunca al reviewer.** La verificación de `K:382` devuelve `code: 1`, `failed()`
(`K:43`) da true, y `K:386-390` acumula el fallo al log y hace `continue` sin
tocar el reviewer — el comentario normativo está en `K:380`: «the reviewer is not
invoked with red tests». Al agotarse las rondas, `K:388` fija
`outcome = 'HUMAN_REVIEW'` con la razón `red tests after 3 rounds (no reviewer
verdict)`, exit **4**. El propio kernel deja constancia de que **no hubo veredicto
de reviewer**: es un HUMAN_REVIEW sin juicio, no un rechazo.

`records/QUALIFICATION.md:77-78` sitúa este fixture: al describir E6 anota que
«es la primera vez que se ejerce la rama `CHANGES_REQUIRED` del supervisor (la
sesión previa **solo probó tests-rojos**)». Este `999` es esa sesión previa.

**Evidencia en `logs/`: ninguna.** No existe `logs/999-sandbox-imposible/`.
Coincide con `MEDICION §5.2.b`. Todo lo que queda de este run es el prefijo
`HUMAN_REVIEW-` en el nombre del archivo — que es exit 2 o exit 4 (`Q:18` mapea
los dos al mismo estado), sin forma de distinguir cuál. **[NO VERIFICADO]** el
exit exacto y **[NO VERIFICADO]** cuántas rondas consumió.

## 6.3 `HUMAN_REVIEW-c-imposible` — el mismo camino triste, pero dentro de la cola

**Qué pedía** (`objectives/processed/HUMAN_REVIEW-c-imposible.md:5-8`): «Objetivo
imposible por diseño (**validación del camino triste dentro de la cola**): la
verificación de este ticket siempre falla, así que ninguna ronda podrá cerrarse en
verde.» Verificación:
`node -e "console.error('verificacion imposible por diseno (camino triste de la cola)'); process.exit(1)"`.

Es byte a byte idéntico a `objectives/queue-e7/c-imposible.md` (el gemelo sin
archivar, ticket 11 del bloque 1). Su única diferencia con el `999` es el
paréntesis: «dentro de la cola».

**Por qué se bloqueó.** Misma mecánica que 6.2: verificación siempre roja, el
reviewer nunca se invoca, `K:388` cierra en HUMAN_REVIEW.

**Qué comportamiento del ciclo demuestra, y es otro: que un fallo NO detiene la
cola.** `Q:53-60` recorre los objetivos en un `for` sin `break` ni `throw`: lanza
el kernel con `spawnSync` (`Q:55`), mapea el exit a estado (`Q:56`), lo empuja a
`results` y archiva (`Q:58`) — pase lo que pase. El `catch` de `Q:59` solo cubre
el fallo del **movimiento**, no el del run. El encabezado del archivo lo declara
como invariante: «A failure does NOT stop the queue» (`Q:3`).

`records/QUALIFICATION.md:80-87` lo registra observado: tres objetivos en
`pendientes/` —`a-resta`, `b-multiplica`, `c-imposible`—, orden alfabético
respetado, los dos primeros APPROVED, `c-imposible` HUMAN_REVIEW «sin detener la
cola», los tres movidos a `processed/<state>-<name>`, ntfy 200 con el resumen
«2/3 aprobados». El resultado E7 es **PASS** (`QUALIFICATION.md:22`).

**Evidencia en `logs/`: ninguna.** No existe `logs/c-imposible/`, ni
`logs/a-resta/`, ni `logs/b-multiplica/`. Los tres runs de E7 ocurrieron y sus
carpetas no están. **[NO VERIFICADO]** por qué faltan; lo único medido es que
`logs/` está gitignoreado (`aiw/.gitignore:4`) y que los 8 `summary.md` que sí
existen citan rutas del workspace demolido `AI_Workflow_Workspace\` — es decir,
los logs que sobreviven son los que estaban en disco al migrar, y estos tres no lo
estaban.

## 6.4 Lo que los tres, juntos, dejan probado

| Rama del ciclo | Fixture que la ejerce | Estado / exit | ¿Interviene el reviewer? |
|---|---|---|---|
| Abort antes de empezar (exit 1 → `ERROR` de la cola) | `ERROR-000-sandbox` (run 2) | `ERROR` / 1 | no |
| Camino feliz completo | `ERROR-000-sandbox` (run 1) | `APPROVED` / 0 | sí — `VERDICT: APPROVED` |
| Tests rojos agotando rondas, run suelto | `HUMAN_REVIEW-999-sandbox-imposible` | `HUMAN_REVIEW` / 4 | **no** |
| Tests rojos agotando rondas, dentro de la cola, sin detenerla | `HUMAN_REVIEW-c-imposible` | `HUMAN_REVIEW` / 4 | **no** |

Las dos ramas terminales que estos tres **no** ejercen: `BLOCKED` por veredicto o
por guard (la cubre `e5-secreto`, `QUALIFICATION.md:57-68`) y `ROUNDS_EXHAUSTED`
por `CHANGES_REQUIRED` agotado, exit 2 (la cubre `e6-changes-requerido`,
`QUALIFICATION.md:70-78`). Es decir: los cinco desenlaces del kernel tienen
fixture, pero **dos de esos fixtures son de los seis que hoy no parsean** (1.2.a).

## 6.5 Los dos `.md` sueltos de `logs/`

**`logs/DIAG-roadmap-invalid.md`** — 10.567 bytes, mtime `2026-07-11 16:27`.
Diagnóstico read-only de por qué las pestañas Roadmap/Overview/Cola de la consola
renderizan «Roadmap v3 source unavailable» para la proyección en formato AIW:
enumera el contrato exacto que `v3Model()` y sus callees imponen, con cites
`pc.js:NN`, y lo contrasta contra el archivo emitido. Su top-3 de violaciones es
M1 (ruta de entrega: el lector busca `.aiw/roadmap/`, el emisor deposita en
`.aiw/views/`), M2/M3 (todo run se lee «Project / jame_snapshot») y M4/M5 (los
`ERROR-` y `HUMAN_REVIEW-` renderizan como completions verdes). Es **el documento
de origen de los dos tickets de `pending/`**: se asigna M2–M6 a
`005-roadmap-contract-fix` y deja M1 «recorded here for a separate decision», que
es lo que después se volvió `006-roadmap-delivery-path`.

**`logs/INCIDENT-2026-07-11.md`** — 9.187 bytes, mtime `2026-07-11 00:47`.
Post-mortem de la ventana semi-muerta del run 002: el terminal que alojaba
`queue.mjs` murió entre `06:04:32Z` y `~06:20Z`, node saltó el `finally`, el lock
sobrevivió huérfano y el proceso `claude` del executor —desprendido de la consola
por `shell:true` + `windowsHide:true`— siguió editando `aiw-console` ~15 minutos
hasta que el humano lo mató. Descarta cuatro hipótesis alternativas por falta de
traza y deja P1 como única familia compatible con toda la evidencia; documenta las
cuatro reparaciones M1–M4 (objetivo sandbox reubicado, archivado con `git mv`,
heartbeat `stage()`+`STAGE.txt` con handlers de señal, y `execProc` con comando de
un solo string) y cierra con la regla operativa «el terminal del queue se queda
abierto e intocado durante toda la ventana». Es el origen documentado de los
comentarios `M1`–`M4` que hoy encabezan `K:62-96` y de la carpeta huérfana
`logs/002-canonical-path-and-autoproject-orphan-20260711/`, que conserva solo
`objective.md` y `preflight.txt`.

Los dos están **gitignoreados** (`aiw/.gitignore:4`) y existen solo en esta
máquina.

---

# Lo que este record NO hace

No propone estructura de roadmap, ni objetivos, ni fases, ni runs, ni orden. No
mapea ningún ticket contra ninguna propuesta de roadmap. No escribe ni edita
`roadmap_AIW_temp.md` ni ningún roadmap. No toca `aiw` en ningún byte, incluido su
`.gitignore`. No corre la suite de AIW —que los 49 tests estén verdes sigue
**[NO VERIFICADO]**—, no emite ni re-emite ningún `.project/`, no levanta la
consola ni el proyector ni el validador. No ejecuta git en ninguna forma que
escriba y no commitea. No toca `DECISIONES.md`, `CONTRATO.md`, ningún handoff ni
ningún record existente. No arregla nada de lo que encontró: ni los seis tickets
que no parsean, ni el proyecto `jame_snapshot` ausente de la config, ni la carpeta
de log que se contradice con su archivo archivado. **Aquí se MIDE.**
