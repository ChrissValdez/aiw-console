# CIERRE DEL ROADMAP AL DÍA — la fase entregada, la afirmación falsa, los siete huérfanos y el token

> Encargo de taller (campo del kernel, sin `max_rounds`). **Segundo cierre de este tipo**: el
> primero fue D-049/D-050. Se repite porque cada encargo produce un record y ninguno toca el
> roadmap. Este salda la deuda antes de que el operador audite el contenido y antes de generar
> el roadmap de AIW.
>
> Fecha: 2026-07-27. **Ningún comando de git que escriba** — ni `init`, ni `add`, ni `commit`,
> ni `branch`, ni `checkout`, ni `mv`, ni `rm`, en ningún repo. Git se ejecutó en SOLO LECTURA
> (`log`, `status --porcelain`) para fechar los commits de los siete trabajos y para probar la
> frontera. **No se arrancó el servidor propio de `cantu-studio`** (escribe al arrancar): la
> verificación en DOM se hizo con el servidor de esta consola, en el puerto 8799 para no
> molestar al 8788 que ya estaba ocupado.
>
> **Camino de escritura: EL MOTOR**, salvo UNA operación que el motor no tiene (Bloque F).
>
> **Archivos escritos por este encargo, y ninguno más:**
> `roadmap/roadmap.json` (el canónico) · los **seis** archivos bajo `.project/` (re-emitidos) ·
> `tests/roadmap-lane-numbering.test.mjs`, `tests/shell-model.test.mjs`,
> `tests/shell-switch.test.mjs`, `tests/shell-two-real-projects.test.mjs` (los cuatro pins de
> conteo, Bloque H) · este record.
> **No se tocó** `CONTRATO.md`, `DECISIONES.md`, ningún record existente, ningún handoff, el
> fork D-035 (`docs/project-console/`), el prototipo retirado (`console/`), el tooling viejo
> (`tools/project-console/`), el motor (`tools/roadmap/`), el emisor (`tools/projector/`), el
> server (`project-console/serve.mjs`), el renderer ni el markup.
> **`cantu-studio` no fue modificado en ninguna forma** — `git status --porcelain` vacío antes y
> después, y su canónico byte-idéntico (`a1aeb75769dd11e6ae700b9cc89a07c2`).
> **`aiw` no fue modificado en ninguna forma** — huella de mtimes de todo el árbol idéntica
> antes y después (`b1dd5264d2c9da20f52865c8c1143ea5`).
>
> **CERO carriles.** No se declaró `lanes` y no se asignó `lane` a ningún run. El trabajo
> restante de aiw-console es secuencial y encadenado; declarar carriles sin usarlos sería
> escribir algo que no es cierto. Verificado en el Bloque G.
>
> **Idioma:** todo el texto NUEVO que este encargo escribió al roadmap está en INGLÉS —
> 2 títulos de fase, 7×3 campos de prosa de run y la corrección del `full_description` de
> `RUN-CONSOLE-ESCRITURA-ROADMAP-HISTORY-001`. Este record se escribe en español por
> consistencia con esta carpeta: un record no es interfaz.

---

## BLOQUE 0 — Respaldo, y la línea base de partida

Tomado ANTES de tocar nada, verificable por md5:

| Artefacto | Bytes | md5 |
|---|---:|---|
| `roadmap/roadmap.json` (original) | 63 434 | `fef2ac094e2e85ca732c505321922dfb` |
| copia de respaldo | 63 434 | `fef2ac094e2e85ca732c505321922dfb` |
| subárbol **O0** | 19 845 | `8f954764427c6720361b01f3d785d075` |
| subárbol **O4** | 41 229 | `688a88df7b8d379de8ba788c433ce251` |

El respaldo incluye además `.project/` entero. La forma canónica del hash de subárbol es
`JSON.stringify(objetivo, null, 2) + "\n"`, que es la que reproduce el número que
`TRADUCCION-ROADMAP-A-INGLES.md:190` dejó fijado para O0.

**Suite antes de tocar nada: 259 tests, 259 verdes, 0 rojos.**

---

## BLOQUE A — Parte 1: la fase entregada que seguía en `planned`

`RUN-CONSOLE-ESCRITURA-ROADMAP-HISTORY-001` (fase `O4.P12`) estaba en `planned`. Cerrado a
`completed` con `closeout_result: "completed_successfully"`, el vocabulario que este roadmap ya
usa en sus otros 22 runs cerrados.

**No se marcó hecho sin evidencia de las dos fuentes.** Verificado contra el record Y contra el
disco, en el mismo acto:

| Lo que el record afirma | Verificación en disco | Resultado |
|---|---|---|
| `tools/roadmap/roadmap-core.mjs` trasplantado | existe, 77 519 B | **sí** |
| `tools/roadmap/roadmap-plan.mjs` trasplantado | existe, 14 102 B | **sí** |
| El server expone la ruta de edición | `serve.mjs:89` `ROADMAP_EDIT_SUFFIX`, `:339` `handleRoadmapEdit`, despachada en `:574` | **sí** |
| El server expone la ruta de history sync | `serve.mjs:90` `HISTORY_SYNC_SUFFIX`, `:501` `handleHistorySync`, despachada en `:576` | **sí** |
| El record existe | `context/aiw-console/records/ESCRITURA-CONSOLA-GLOBAL-O4-P12.md` | **sí** |
| Commiteado | `2e02a8b`, 2026-07-26 16:03:07 -0600 | **sí** |

El motor es además, literalmente, la herramienta con la que este encargo escribió: la
verificación más fuerte disponible es que P12 funciona porque P12 hizo este trabajo posible.

---

## BLOQUE B — Parte 2: la afirmación falsa, corregida

### B.1 La afirmación, y cuándo dejó de ser cierta

Dentro del `full_description` de ese mismo run:

> «(a) THE EDIT ENGINE IS NOT IN THIS REPO — `roadmap-core.mjs`, `roadmap-plan.mjs` and
> `roadmap-edit.mjs` exist ONLY in `cantu-studio/tools/roadmap/`, and
> **`aiw-console/tools/roadmap/` DOES NOT EXIST**»

Era cierto el **2026-07-25**, la fecha que el propio texto declara como su medición. Dejó de
serlo el **2026-07-26**, cuando el commit `2e02a8b` — la entrega de este mismo run — trasplantó
el motor. Fechado con `git log --diff-filter=A -- tools/roadmap/roadmap-core.mjs`.

La corrección dice la verdad presente y **conserva la historia**: registra que la afirmación fue
cierta hasta esa fecha y por qué dejó de serlo. Y afina un matiz que el barrido descubrió y que
una corrección perezosa habría borrado: de los **tres** archivos que la frase nombraba, solo
**dos** se portaron. El CLI `roadmap-edit.mjs` **sigue existiendo solo en `cantu-studio`**
(`ls tools/roadmap/` aquí devuelve dos archivos; allí, tres más `tests/`). La frase corregida lo
dice.

### B.2 La segunda afirmación del mismo run, desmentida por el mismo commit

El barrido encontró, tres frases más abajo, una cita del header del server:

> «(2) HISTORY SYNC … absent today by construction: `project-console/serve.mjs` declares it in
> its header —'no roadmap edit endpoint, no history sync endpoint, no snapshot rebuild, no Git
> command, no watcher'—»

Esa cadena **ya no está en el archivo**: `grep` sobre `project-console/serve.mjs` de las cuatro
frases devuelve cero. El header hoy declara lo contrario — «EXACTLY TWO write routes (O4.P12)»
—. Inequívoca y verificable, así que se corrigió con la misma disciplina: qué decía, hasta
cuándo fue cierto, y qué dice hoy.

### B.3 El barrido del resto del roadmap — lo que se REPORTA sin tocar

Método: se extrajeron todas las rutas entre backticks de los 126 campos de prosa y se
resolvieron contra el disco (**cero rutas rotas**: los seis "MISSING" del primer barrido son
nombres base relativos, no rutas, y todos resuelven); y se barrieron los patrones de existencia
y ausencia (`DOES NOT EXIST`, `does not`, `absent`, `missing`, `only in`, `today`, `there is
no`) sobre los 42 runs.

**Corregidas** (inequívocas, verificadas en disco): las dos de B.1 y B.2. **Ninguna más.**

**Reportadas y NO tocadas** — todas son premisas de medición fechadas o afirmaciones en pasado,
verdaderas cuando se escribieron; corregirlas sería reescribir historia, no corregir una
mentira. El operador auditará el contenido después:

| # | Run | Lo que dice | Por qué se reporta y no se corrige |
|---|---|---|---|
| 1 | `RUN-CONSOLE-PROTOTIPO-CONSOLA-001` | «it reads … `roadmap.json`, which already exists with 2 objectives (O0, O4) and **30 runs**» (en `summary` y en `full_description`) | **Conteo desmentido**: eran 35 antes de este encargo y son 42 después. Pero la frase describe lo que el prototipo leyó EN SU MOMENTO. Es la única afirmación numérica del roadmap que el disco desmiente. **Candidata clara a la auditoría de contenido.** |
| 2 | `RUN-CONSOLE-EMISOR-CARPETA-PROPIA-001` | «`docs_index.json` HAS TO BE CREATED FROM SCRATCH — it does not exist at any path in the repo (glob of the whole repo = 0 hits)» | Hoy existe `.project/docs_index.json` (40 entradas). Pero la frase es la PREMISA de la medición del propio run, en presente-de-entonces, y el run la resolvió. |
| 3 | `RUN-CONSOLE-EMISOR-CARPETA-PROPIA-001` | «the THREE sources that **do not exist today** and do paint live pixels: `docs/docs_index.json`, `guardrails/project_guardrails.json` and `guardrails/no_claims.json`» | Las tres existen hoy bajo `.project/` con otros nombres. Mismo caso: premisa fechada que el run resolvió. |
| 4 | `RUN-CONSOLE-ESCRITURA-ROADMAP-HISTORY-001` | «the *Edit roadmap* button was left `hidden` and not deleted … restoring it is deleting one attribute» | En `index.html:110` el botón ya **no** lleva `hidden`. Pero la frase está en pasado y era cierta; describe la puerta que P12 abrió. No es falsa. |
| 5 | `RUN-CONSOLE-CANTU-EMITE-CARPETA-001` | «`RUN-CONSOLE-EMISOR-CANTU-CARPETA-PROPIA-001`, a `run_id` that DOES NOT EXIST in this roadmap —**its only occurrence in the whole workspace** is that line of the record itself—» | Lo sustantivo **sigue siendo cierto**: ese `run_id` no existe. Lo accesorio ("única ocurrencia") se autodesmiente, porque esta misma frase es una segunda ocurrencia. Pedantería, no falsedad. |
| 6 | `RUN-CANTU-DEV-LAUNCHERS-001` (**O0**) | «an ad-hoc static one-liner on port 8765 that does not implement `POST /__project-console/roadmap/edit` or the History sync route» | Habla del lanzador de JAME/Cantu, no de este server. Y además **O0 está fuera de alcance en cualquier campo**. |
| 7 | `RUN-CONSOLE-PROTOTIPO-CONSOLA-001` | «There is no token 'descartado' (discarded) in the closed vocabulary of run (CONTRATO §11.a)» | Sigue siendo cierta: `status` no tiene ese token. La nota explica por qué el retiro viaja en `closeout_result`, y sigue explicándolo después del cambio del Bloque E. |

---

## BLOQUE C — Parte 3: los siete records huérfanos tienen run

Cada uno verificado contra su record ANTES de crearle el run, y contra `git log` para el commit.
Los siete entraron con `status: "completed"` y `closeout_result: "completed_successfully"`, y el
`full_description` de cada uno nombra su record por ruta.

### C.1 La decisión de ubicación, uno por uno

**DOS fases nuevas**, con `phase_id` nuevo y no reutilizado (`O4.P13`, `O4.P14`; se verificó que
ninguno de los dos aparece en el roadmap, en el emitido, en los records ni en `DECISIONES.md`
como id retirado — `O4.P13` solo aparece como la fase que un record ya se atribuía).

| # | Record | Run creado | Fase | Por qué ahí |
|---|---|---|---|---|
| 1 | `ACABADO-PARIDAD-O4-P13.md` | `RUN-CONSOLE-PARITY-FINISHING-001` | **`O4.P13`** (nueva) | **El record se encabeza `> O4.P13`**: se atribuyó una fase que no existía. No cabía en ninguna existente y NO puede ir en `O4.P5` (paridad), que es trabajo pendiente y regla dura. Se crea la fase con el id que el record ya nombraba, y el marcador `O4.P13` está además en `CONTRATO.md:1856`, en el CSS, en el renderer, en `serve.mjs:536` y en tres archivos de test. |
| 2 | `AGRUPACION-DOCS-POR-RUTA-Y-DOCS-DE-CANTU.md` | `RUN-CONSOLE-DOCS-PATH-GROUPING-001` | **`O4.P13`** | Mismo cluster: corrección de renderizado sobre la consola ya portada, posterior al port y a la escritura, anterior a los carriles. El título de la fase se redactó para cubrir los tres, no solo el primero. |
| 3 | `ANCHO-DE-SUBVISTAS-CAUSA-RAIZ-FLEX.md` | `RUN-CONSOLE-SUBVIEW-WIDTH-FLEX-001` | **`O4.P13`** | Mismo cluster: defecto de ancho en el renderizado de la consola portada. El propio record se refiere a `O4.P13` (`:268`) como el trabajo del que continúa. |
| 4 | `CARRILES-Y-BARRIERS-ROADMAP.md` | `RUN-CONSOLE-LANES-BARRIERS-001` | **`O4.P14`** (nueva) | D-051 es un cambio de ESQUEMA del roadmap, no acabado de la consola: no lo cubre el título de ninguna fase existente ni el de `O4.P13`. |
| 5 | `CORRECCIONES-QA-CARRILES-Y-REGLA-DE-IDIOMA.md` | `RUN-CONSOLE-LANES-QA-LANGUAGE-001` | **`O4.P14`** | Son «tres correcciones sobre lo entregado en D-051»: mismo cuerpo de trabajo, y el título de la fase lo dice. |
| 6 | `MIGRACION-CANTU-A-CARRILES.md` | `RUN-CONSOLE-CANTU-LANES-MIGRATION-001` | **`O4.P14`** | «La primera aplicación real de D-051». La segunda mitad del título de la fase — «and their first real application» — existe exactamente para cubrirlo. |
| 7 | `TRADUCCION-ROADMAP-A-INGLES.md` | `RUN-CONSOLE-ROADMAP-ENGLISH-001` | **`O4.P9`** (existente) | No es acabado de consola ni es carriles. Es mantenimiento del roadmap que **no mapea a ninguna de las nueve etapas**, que es literalmente lo que el título de `O4.P9` declara: «Prior and cross-cutting work (outside the stage sequence)». Fase existente, que ya contiene runs completados, así que añadir uno no la desnaturaliza. **No se creó una fase de un solo run para esto.** |

### C.2 Dependencias: solo las que el record declara

No se inventó ninguna cadena. Se puso `depends_on` únicamente donde el record nombra su insumo:

| Run | `depends_on` | La frase del record que lo sostiene |
|---|---|---|
| `…PARITY-FINISHING-001` | `PORT-IDENTICO`, `ESCRITURA-ROADMAP-HISTORY` | «Cierre del QA visual del operador sobre el port (`O4.P11`) y la escritura (`O4.P12`)» |
| `…DOCS-PATH-GROUPING-001` | — | el record no declara insumo de run |
| `…SUBVIEW-WIDTH-FLEX-001` | — | el record no declara insumo de run |
| `…LANES-BARRIERS-001` | `ESCRITURA-ROADMAP-HISTORY` | «Insumos usados y no re-medidos: `ESCRITURA-CONSOLA-GLOBAL-O4-P12.md` (el motor trasplantado…)» |
| `…LANES-QA-LANGUAGE-001` | `LANES-BARRIERS` | «Tres correcciones sobre lo entregado en D-051» |
| `…CANTU-LANES-MIGRATION-001` | `LANES-BARRIERS` | «La primera aplicación real de D-051» |
| `…ROADMAP-ENGLISH-001` | `ESCRITURA-ROADMAP-HISTORY` | «Camino de escritura: EL MOTOR … `planEdit` → `applyPlan`» |

### C.3 Los `run_id` nuevos van en inglés — y por qué

Los siete `run_id` nuevos son tokens en inglés (`RUN-CONSOLE-PARITY-FINISHING-001`, etc.).
El roadmap está entero en inglés desde la fase anterior y estas son identidades **nuevas**, no
existentes; acuñarlas en español sería sembrar el problema que la traducción vino a cerrar.
**Los 16 `run_id` existentes con raíz española NO se tocaron**: identidad opaca, D-047 (Bloque
E.2).

---

## BLOQUE D — Las cuatro fases de trabajo pendiente, intactas

Regla dura del encargo: `O4.P5` (paridad), `O4.P8` (UI/UX), `O4.P6` (AIW tercer proyecto) y
`O4.P7` (corte) no reciben runs completados y sus runs pendientes no se tocan.

Comprobado por igualdad estructural exacta contra el respaldo, campo por campo:

| Fase | Runs antes → después | Status antes → después | ¿Algún `completed`? | Estructura idéntica |
|---|---|---|---|---|
| `O4.P5` | 1 → 1 | `planned` → `planned` | no | **sí** |
| `O4.P8` | 1 → 1 | `planned` → `planned` | no | **sí** |
| `O4.P6` | 1 → 1 | `planned` → `planned` | no | **sí** |
| `O4.P7` | 1 → 1 | `planned` → `planned` | no | **sí** |

**La única diferencia, y hay que declararla:** su `queue_order` se desplazó +6
(27→33, 28→34, 29→35, 30→36). No es una edición: es la consecuencia forzada del invariante
«`queue_order` global denso, único y contiguo 1..N» cuando se insertan seis runs antes de ellas.
El propio motor lo recalcula (`applyOrder`). Ni `run_id`, ni `phase_id`, ni `status`, ni
`title`, ni `summary`, ni `full_description`, ni `depends_on` de esas cuatro fases cambiaron un
carácter — que es lo que «intactas» significa según la propia glosa del encargo.

---

## BLOQUE E — Parte 4: el token en español

### E.1 Las tres condiciones, verificadas EN DISCO antes de cambiar nada

| Condición | Verificación | Resultado |
|---|---|---|
| §14 lo define como cadena libre | `CONTRATO.md:1501` «14. `closeout_result` NO se convierte en enum»; `:1595` «Sin enum y **sin forma fijada — ni siquiera el tipo**»; `:1989` fila `i` «string opcional, sin enum» | **cumple** |
| Ningún validador ni test fija su valor | `grep -rn closeout_result tests/ tools/ project-console/`: el validador viejo solo comprueba la lista blanca (`:1451`) y el acoplamiento con status terminal (`:1661`); los tests que sí fijan valores lo hacen sobre OTROS runs y fixtures (`"error"`, `"human_review"`, `"approved"`, `"rejected"`, `"completed"`, `"completed_successfully"`); **ninguno menciona `descartado_por_D-048`**. Y el renderer no lo mapea: `v3ResultText()` (`project-console.js:3183`) solo sustituye `_` por espacio y capitaliza — no hay tabla de tokens que romper | **cumple** |
| La referencia `D-048` sobrevive | `discarded_by_D-048` la conserva literal | **cumple** |

Las tres se cumplen, así que se cambió: `descartado_por_D-048` → **`discarded_by_D-048`**.
Aplicado por el motor (`set-status` con `closeoutResult` sobre un run ya terminal). Verificado
en el DOM: la consola pinta «Closeout **Discarded by D-048**».

La nota del `full_description` de ese run («There is no token 'descartado' … so the retirement
travels in `closeout_result`») **no se tocó**: sigue siendo cierta y sigue explicando por qué el
retiro viaja en ese campo.

### E.2 Barrido del resto de tokens en español, en campos que no son prosa

Barridos todos los campos no-prosa: `schema_version`, `roadmap_id`, `root.title`,
`objective_id` (2), `phase_id` (18), `run_id` (42), `status` (3), `depends_on`,
`closeout_result` (2), `progress`.

- **`closeout_result`: limpio.** Los dos valores distintos que quedan son
  `completed_successfully` (23 runs) y `discarded_by_D-048` (1).
- **`status`, `phase_id`, `objective_id`, raíz: limpios.**
- **`run_id`: 16 de 42 llevan raíz española** — `CONTRATO`, `CARPETA`, `MIGRACION`, `VALIDADOR`,
  `MEDICION`, `REDACCION`, `EMISOR`, `PROPIA`, `IDENTICO`, `MULTIPROYECTO`, `EMITE`, `INDICE`,
  `CURADO`, `ESCRITURA`, `PARIDAD`, `TERCER`, `PROYECTO`, `CORTE`, `RETIRO`, `LANZADOR`,
  `PROTOTIPO`. **REPORTADOS, NO TOCADOS.** Son IDENTIDAD: D-047 la declara opaca, y renombrar
  un `run_id` rompe las referencias de `depends_on` (7 entradas los citan), de los records, de
  `DECISIONES.md` y del `full_description` de otros runs. No es una decisión de traducción sino
  de identidad, y le corresponde a la cabina si alguna vez la quiere tomar.

---

## BLOQUE F — El camino de escritura, y la operación que el motor NO tiene

### F.1 Lo que se hizo por el motor: 11 escrituras

Todo por `planEdit` → `applyPlan` de `tools/roadmap/roadmap-plan.mjs` — la misma orquestación
que usa el endpoint de la consola —, con **re-lectura del archivo escrito y `checkInvariants`
como autoridad post-escritura después de CADA una**:

| # | Operación | Ops |
|---|---|---:|
| 1–2 | `create-phase` `O4.P13`, `O4.P14` | 2 |
| 3–9 | `insert` de los siete runs (`--end-of-phase`, `status: completed`) | 7 |
| 10 | `batch` de **16 sub-ops**: 6 `move`, 9 `set-status`, 1 `set-text` | 1 |
| 11 | la reposición del Bloque F.2 | 1 |
| | **Total de escrituras** | **11** |

El `batch` lleva juntas las tres partes que son batcheables: los seis `move` que colocan los
runs de `O4.P13`/`O4.P14`, los nueve `set-status` (P12 cerrada + los siete nuevos +
`closeout_result` del prototipo) y el `set-text` con la corrección del Bloque B. Una sola
previsualización y una sola escritura, que es como el operador lo entendería.

**Dos límites del motor que este encargo tuvo que rodear, y que no son defectos:**
`insertRun` **no acepta `closeoutResult`** (por eso los ocho cierres viajan en `set-status`
dentro del batch); y `insert`/`create-phase` son ops de IDENTIDAD y **el motor las rechaza
dentro de `batch`** a propósito, por lo que van de una en una. Ambos comportamientos están
documentados en el código y son deliberados.

### F.2 La operación que el motor NO tiene: posicionar una fase

**`core.createPhase` APENDA al final del objetivo** («Append at the END of the objective's
phases; existing phases keep their order») y **`KNOWN_OPS` no contiene `move-phase`**. Con solo
el motor, `O4.P13` y `O4.P14` quedaban después de `O4.P10` — la fase del prototipo retirado,
cuyo propio run declara que «stays at the end of the objective: it is history, not plan» — con
sus runs llevando `queue_order` 27–32. Posición de array y `queue_order` habrían quedado en
desacuerdo, y trabajo entregado el 2026-07-27 se habría pintado después de la historia.

**Se declara explícitamente: esa operación no existe en el motor.** Se resolvió con la escritura
atómica que el encargo autoriza para ese caso, y acotada al mínimo posible:

- Es un **reordenamiento puro de dos elementos de array**. No cambia un solo campo de nada.
- Las precondiciones se asertan antes de escribir: igualdad profunda del conjunto de fases
  serializadas contra la pre-imagen; mismo número de objetivos y de fases; mismo orden de
  objetivos; y — la que importa — **posición de array y `queue_order` ascendiendo juntos** en
  todo el archivo.
- **La escritura pasa por las primitivas del propio motor**: `core.serialize` para los bytes y
  `core.applyWrite` para el `tmp` + `fsync` + `rename` atómico con respaldo.
- Después: re-lectura desde disco, `checkInvariants` de nuevo, y la comprobación de
  ascendencia repetida sobre lo releído.

El resultado coloca las dos fases nuevas **después de `O4.P12` y antes de `O4.P5`**, que es
exactamente donde el propio roadmap colocó `O4.P11` (entre `O4.P2` y `O4.P3`) y `O4.P12` (entre
`O4.P4` y `O4.P5`) cuando se insertaron: la fase entregada va en su lugar de la secuencia
entregada, el plan pendiente queda de cola, y `O4.P9` (transversal) y `O4.P10` (historia) siguen
al final. **No se reordenó ninguna fase existente**: su orden relativo es idéntico.

### F.3 Ensayo previo

La cadena entera se ensayó de punta a punta sobre una **copia** antes de tocar el canónico, con
el mismo código y las mismas comprobaciones. El canónico resultó **byte-idéntico al ensayo**
(`58a726908ece58b59922ee0232b1eb15`, 82 134 B), que es la prueba de que la secuencia es
determinista.

---

## BLOQUE G — Invariantes y números

### G.1 Invariantes tras la edición

| Invariante | Resultado |
|---|---|
| `checkInvariants` limpio | **sí**, 0 errores |
| `queue_order` global denso, único y contiguo 1..42 | **sí** |
| `depends_on` colgantes | **0** |
| Fases con 0 runs | **0** |
| Cada dependencia precede a su dependiente | **sí**, 0 violaciones |
| `run_id` preexistentes: todos presentes, ninguno renumerado | **sí** (35 → 42, +7 y ni uno alterado) |
| `phase_id` preexistentes: todos presentes | **sí** (16 → 18; los añadidos son exactamente `O4.P13`, `O4.P14`) |
| `objective_id`: sin cambios | **sí** (`O0`, `O4`) |
| `root.lanes` declarados | **0** (la clave ni siquiera existe) |
| Runs con `lane` | **0** de 42 |
| Runs con `barrier` | **0** de 42 |

### G.2 Los números, antes y después

| | Antes | Después |
|---|---:|---:|
| Objetivos | 2 | 2 |
| Fases | 16 | **18** |
| Runs | 35 | **42** |
| Rango de `queue_order` | 1–35 | **1–42** |
| O4 `completed` | 16 | **24** |
| O4 `planned` | 7 | **6** |
| O4 `active` | 0 | 0 |

`planned` baja de 7 a 6 porque `O4.P12` se cerró; `completed` sube 8 (esa más los siete nuevos).

### G.3 O0, byte-idéntico

| | Bytes | md5 |
|---|---:|---|
| Línea base O4.P1 | 19 845 | `8f954764427c6720361b01f3d785d075` |
| **Después de este encargo** | **19 845** | **`8f954764427c6720361b01f3d785d075`** |

Y además byte-idéntico al respaldo carácter por carácter, no solo igual de hash.

### G.4 Líneas base NUEVAS, para que las fases siguientes tengan contra qué comparar

| Artefacto | Bytes | md5 |
|---|---:|---|
| `roadmap/roadmap.json` | **82 134** | **`58a726908ece58b59922ee0232b1eb15`** |
| subárbol **O0** | **19 845** | **`8f954764427c6720361b01f3d785d075`** (sin cambio, y así debe seguir) |
| subárbol **O4** | **59 554** | **`72ff53aeb32d1daf0e5d3939fbc8098e`** |

`.project/` re-emitido (los seis). **La línea base del emitido se registra en BYTES y ENTRADAS,
no en md5, y hay que decir por qué**: los seis artefactos llevan `generated_at`, así que su md5
**cambia en cada emisión aunque el contenido sea idéntico** — registrarlo como línea base sería
publicar un número que nadie puede reproducir. El tamaño en bytes sí es estable (el sello ISO es
de ancho fijo) y sí es comparable:

| Archivo | Bytes | Entradas |
|---|---:|---|
| `docs_index.json` | 18 548 | 40 → **41** (este record) |
| `git_history.json` | 21 526 | 50 |
| `guardrails.json` | 3 055 | 7 |
| `no_claims.json` | 2 832 | 5 |
| `roadmap.json` | 82 380 | 2 objetivos |
| `snapshot.json` | 87 196 | 2 objetivos; **42 runs** |

Se emitió tres veces en este encargo: tras escribir el canónico, tras añadir este record al
corpus de Docs, y una última vez con el record ya cerrado. Solo `docs_index.json` depende de
este record, y solo por su `freshness` (el mtime del archivo) — ningún emitido guarda su tamaño
ni su hash. `git_history.json` se mueve además cada vez que corre la suite, porque **el test de
sync lo reescribe** — el mismo derivado, el mismo emisor, y la misma nota que ya dejaron O4.P12
§F.2, D-051 §G y el record de QA de carriles.

**La línea base viva sigue siendo la del canónico** (G.4, arriba): esos tres md5 sí son
reproducibles, y son los que las fases siguientes deben comparar.

### G.5 Aditividad: la proyección de AIW por el camino viejo

`runStartupProjection` sobre `../../aiw`, ejecutada con `repoRoot` apuntando a un directorio de
trabajo (para no escribir en el repo), antes y después del cambio. Diferencia campo a campo:

| Artefacto | Diferencias de hoja |
|---|---|
| `.aiw/roadmap/roadmap.json` | **1** — `generated_at` |
| `.aiw/views/project_console.snapshot.json` | **1** — `generated_at` |
| `.aiw/views/roadmap.json` | **1** — `generated_at` |

**Más fuerte de lo que el criterio pedía**: ni siquiera `generated_from` cambió — el emisor no
se tocó, así que su versión es la misma. Lo único que se mueve es el sello temporal de la
emisión. Cero diferencias de contenido.

---

## BLOQUE H — La suite, y los cuatro pins de conteo

La suite quedó **roja en 4 de 259** tras la edición, exactamente en los tests que fijaban los
conteos del roadmap. Se actualizaron, y se declara cuáles y a qué:

| Archivo | Aserción | Antes | Después |
|---|---|---|---|
| `tests/roadmap-lane-numbering.test.mjs:334` | `orders.length` | 35 | **42** |
| `tests/shell-model.test.mjs:129` | nombre del test | «…measured 2/16/35» | «…measured 2/18/42» |
| `tests/shell-model.test.mjs:132` | `summary.counts` | `{2, 16, 35}` | **`{2, 18, 42}`** |
| `tests/shell-model.test.mjs:134` | `byToken.completed` | 25 | **33** |
| `tests/shell-switch.test.mjs:49` | nombre del test | «2 objectives, 35 runs» | «2 objectives, 42 runs» |
| `tests/shell-switch.test.mjs:58` | regex de la línea de diagnóstico | `2 / 16 / 35` | **`2 / 18 / 42`** |
| `tests/shell-two-real-projects.test.mjs:151` | idem (`assert.match`) | `2 / 16 / 35` | **`2 / 18 / 42`** |
| `tests/shell-two-real-projects.test.mjs:226` | idem (`assert.doesNotMatch`, prueba de aislamiento) | `2 / 16 / 35` | **`2 / 18 / 42`** |

**Ninguna aserción cambió de significado**: todas siguen comprobando lo mismo contra el número
que el canónico ahora dice. **Suite final: 259 tests, 259 verdes, 0 rojos.**

**Nota sobre el validador viejo.** `tools/project-console/validate-project-console-state.mjs`
devuelve 44 errores, pero **ninguno tiene que ver con este trabajo**: lee `.aiw/` (un artefacto
de 2026-07-22 que este repo ya no usa) y **no mira ni `roadmap/roadmap.json` ni `.project/` en
ningún punto**. El tooling viejo está fuera de alcance por encargo y estaba rojo antes.

---

## BLOQUE I — La consola, verificada en el DOM

Servida por `project-console/serve.mjs` en el puerto 8799 (el 8788 estaba ocupado y no se tocó).
Proyecto `aiw-console` seleccionado desde el portafolio.

| Comprobación | Resultado |
|---|---|
| Título del documento | `AIW Console Roadmap — Project Console` |
| Línea de diagnóstico de fuentes | «Roadmap **2 objectives / 18 phases / 42 runs**» · «Docs indexed **41**» |
| Stats del objetivo O0 | 12 Runs · 9 Completed · 1 Active · 0 Blocked · 75% |
| Stats del objetivo O4 | **30 Runs · 24 Completed · 0 Active · 0 Blocked · 80%** |
| `O4.P13` en el árbol | «Finishing of the ported console — parity corrections, Docs grouping by path, and the subview width defect» |
| `O4.P14` en el árbol | «Lanes and barriers … » — **3 of 3 done** |
| Run #26 en la Run Queue | «The two write paths…» con **Closeout Completed successfully** |
| El token traducido | «Closeout **Discarded by D-048**» |
| Errores de consola del navegador | **0** |

Sin regresión: las dos fases nuevas y los siete runs nuevos se pintan, los conteos son los
nuevos, y nada quedó roto.

---

## BLOQUE J — El mapa de fases resultante

| pos | `phase_id` | Título | `queue_order` | Conteo por status |
|---:|---|---|---|---|
| 1 | `O0.P1` | Project Console Foundation | 1 | 1 completed |
| 2 | `O0.P2` | Roadmap v3 Prototype | 2–3 | 2 completed |
| 3 | `O0.P3` | Roadmap Maintenance, Console Tooling and Follow-up Insertion | 4–12 | 6 completed, 1 active, 2 planned |
| 4 | `O4.P0` | Stage 0 — Audit / Phase 0 (read-only) | 13 | 1 completed |
| 5 | `O4.P1` | Stage 1 — Folder contract, O0 migration and drafting | 14–19 | 6 completed |
| 6 | `O4.P2` | Stage 2 — aiw-console emits its own folder | 20 | 1 completed |
| 7 | `O4.P11` | Identical port — Cantu's console transplanted into aiw-console | 21–22 | 2 completed |
| 8 | `O4.P3` | Stage 3 — Multi-project shell reading aiw-console only | 23 | 1 completed |
| 9 | `O4.P4` | Stage 4 — Cantu emits the new folder alongside .aiw | 24–25 | 2 completed |
| 10 | `O4.P12` | Write — the console edits the roadmap (dry-run→confirm) and syncs the history | 26 | **1 completed** ← cerrada aquí |
| 11 | **`O4.P13`** | **Finishing of the ported console — parity corrections, Docs grouping by path, and the subview width defect** | **27–29** | **3 completed** ← nueva |
| 12 | **`O4.P14`** | **Lanes and barriers in the roadmap schema (D-051), and their first real application** | **30–32** | **3 completed** ← nueva |
| 13 | `O4.P5` | Stage 5 — Global console renders Cantu (parity, operator QA) | 33 | 1 planned |
| 14 | `O4.P8` | Stage 8 — UI/UX | 34 | 1 planned |
| 15 | `O4.P6` | Stage 6 — AIW as a third project (roadmap Markdown → v3) | 35 | 1 planned |
| 16 | `O4.P7` | Stage 7 — Cutover: retirement of Cantu's console + deletion of .aiw | 36 | 1 planned |
| 17 | `O4.P9` | Prior and cross-cutting work (outside the stage sequence) | 37–41 | **3 completed**, 2 planned |
| 18 | `O4.P10` | Global console prototype (RETIRED by D-048 — history) | 42 | 1 completed |

---

## BLOQUE K — Qué queda abierto

1. **La auditoría de contenido del operador.** Las siete afirmaciones del Bloque B.3 están
   reportadas y sin tocar. La #1 (el conteo «30 runs» del prototipo) es la única cifra que el
   disco desmiente y la candidata más clara.
2. **Los 16 `run_id` con raíz española** (E.2). Es una decisión de identidad, no de traducción,
   y le corresponde a la cabina.
3. **`move-phase` no existe en el motor** (F.2). Mientras no exista, cada fase nueva que no vaya
   al final del objetivo exige la escritura acotada de este encargo. Es candidato natural a run
   propio si la cabina lo quiere cerrar.
4. **El CLI `roadmap-edit.mjs` sigue solo en `cantu-studio`** (B.1). Aquí el motor se maneja
   desde el endpoint del server. No es un defecto declarado; queda dicho porque el texto del
   roadmap lo nombraba y ahora lo dice con precisión.
5. **El roadmap de `aiw`** — fuera de alcance por encargo, se cruza con `O4.P6`.
6. **Las nueve fuentes diferidas** siguen sin emitir; el panel «Not emitted by this project»
   sigue diciendo la verdad. Es decisión de `O4.P5`.
7. **`DECISIONES.md` no recibió entrada.** Este encargo **no reserva número de decisión**: no
   cambia el contrato, pone al día el papel contra el disco. La regla de idioma que aplica
   sigue siendo la de `CORRECCIONES-QA-CARRILES-Y-REGLA-DE-IDIOMA.md` Bloque C, que
   `DECISIONES.md` podrá recoger cuando la cabina quiera.
