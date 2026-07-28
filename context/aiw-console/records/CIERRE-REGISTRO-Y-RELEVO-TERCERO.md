# CIERRE DE REGISTRO Y RELEVO — tres records huérfanos, los dos handoffs, y dos deudas anotadas

> Encargo de taller (campo del kernel, sin `max_rounds`). **Tercer cierre de este tipo**: el
> primero fue `D-049`/`D-050`, el segundo `CIERRE-ROADMAP-AL-DIA-FASES-P13-P14.md`. Se repite
> porque **cada encargo produce un record y ninguno toca el roadmap, por diseño**: ponerlo fuera
> de alcance es lo que permite el paralelismo entre talleres. Este cierre salda la deuda de tres
> encargos antes de que el operador reinicie el hilo y abra el hilo paralelo de `cantu-studio`.
>
> Fecha: 2026-07-28. **Ningún comando de git que escriba** — ni `add`, ni `commit`, ni `branch`,
> ni `checkout`, ni `mv`, ni `rm`, en ningún repo. Git se ejecutó en SOLO LECTURA (`log`,
> `show --stat`, `status --porcelain`, `ls-files`, `check-ignore`) para fechar los trabajos, para
> atribuir el handoff huérfano a su commit y para probar la frontera. **No se levantó ningún
> servidor**: este cierre no cambia una línea de código de la consola, así que no había DOM que
> verificar — lo observable no se movió.
>
> **Camino de escritura: EL MOTOR**, salvo UNA operación que el motor no tiene (Bloque F).
>
> **Archivos escritos por este encargo, y ninguno más:**
> `roadmap/roadmap.json` (el canónico) · `context/handoffs/aiw-console.md` (reescrito) ·
> `context/handoffs/cantu-studio.md` (retocado) · `tests/roadmap-lane-numbering.test.mjs`,
> `tests/shell-model.test.mjs`, `tests/shell-switch.test.mjs`,
> `tests/shell-two-real-projects.test.mjs` (seis pins de conteo, Bloque I) · este record.
> **Un archivo NUEVO de OTRO taller apareció durante la verificación** y **no fue tocado**:
> `context/aiw-console/records/MEDICION-ESTADO-DE-AIW.md` (ver E.3).
> **`.project/` NO fue re-emitido** — ver Bloque I.3, que es lo que el operador tiene que leer
> antes de mirar la consola.
> **No se tocó** `CONTRATO.md`, `DECISIONES.md`, ningún record existente, `governance/`, el fork
> `D-035` (`docs/project-console/`), el prototipo retirado (`console/`), el tooling viejo
> (`tools/project-console/`), el motor (`tools/roadmap/`), el emisor (`tools/projector/`), el
> server (`project-console/serve.mjs`), el renderer ni el markup.
> **`cantu-studio` no fue modificado en ninguna forma** — `git status --porcelain` vacío antes y
> después, y su canónico byte-idéntico (`6d6951370dc581cc5a21cf7cd3ce287f`).
> **`aiw` no fue modificado en ninguna forma** — `git status --porcelain` vacío, y huella de
> mtimes de todo el árbol `ed0892dbf9b7d62af41cc403f35dc4b2`.
>
> **CERO carriles.** No se declaró `lanes` y no se asignó `lane` ni `barrier` a ningún run. El
> trabajo restante de aiw-console es secuencial y encadenado; declarar carriles sin usarlos sería
> escribir algo que no es cierto. Verificado en el Bloque G.1.
>
> **Idioma:** todo el texto NUEVO que este encargo escribió al roadmap está en INGLÉS — 1 título
> de fase y 3×3 campos de prosa de run, 10 campos en total. Barrido reportado en el Bloque G.4.
> Los dos handoffs siguen el idioma del existente (español). Este record se escribe en español
> por consistencia con esta carpeta: un record no es interfaz.

---

## BLOQUE 0 — Respaldo, y la línea base de partida

Tomado ANTES de tocar nada, fuera del repo, verificable por md5:

| Artefacto | Bytes | md5 |
|---|---:|---|
| `roadmap/roadmap.json` (original) | 82 134 | `58a726908ece58b59922ee0232b1eb15` |
| copia de respaldo | 82 134 | `58a726908ece58b59922ee0232b1eb15` |
| `context/handoffs/aiw-console.md` | 13 524 | `89b72d5b1175ff762723cfe9eb25ab52` |
| `context/handoffs/cantu-studio.md` | 16 619 | `c6d06c8efd8c78fea099f963a5b416d6` |
| subárbol **O0** | 19 845 | `8f954764427c6720361b01f3d785d075` |
| subárbol **O4** | 59 554 | `72ff53aeb32d1daf0e5d3939fbc8098e` |

Los tres md5 de partida del roadmap y de los dos subárboles **coinciden exactamente con la línea
base que dejó el cierre anterior** (`CIERRE-…-P13-P14.md` G.4): nadie tocó el canónico entre los
dos cierres, que es lo que la disciplina de carriles predice y aquí queda comprobado.

El respaldo incluye además `.project/` entero (los seis artefactos), que es lo que permite el
Bloque I.3. La forma canónica del hash de subárbol es `JSON.stringify(objetivo, null, 2) + "\n"`.

**Suite antes de tocar nada: 278 tests, 278 verdes, 0 rojos.**
**Frontera antes:** `aiw-console` HEAD `6519ba5` con `git status --porcelain` **vacío**;
`cantu-studio` HEAD `73945e56`, vacío; `aiw`, vacío.

---

## BLOQUE A — Los tres records huérfanos, verificados contra el record Y contra el disco

**No se creó un run sin comprobar primero que lo que el record afirma está en disco.** Cada
verificación se hizo antes de la inserción, no después.

### A.1 `DISCIPLINA-UN-RUN-POR-CARRIL.md` → `RUN-CONSOLE-LANE-EXECUTION-DISCIPLINE-001`

| Lo que el record afirma | Verificación en disco | Resultado |
|---|---|---|
| Escribió el bloque «Process discipline» en el contexto de gobernanza de Cantu | `context/cantu-studio/CANTU_STUDIO_CONTEXT.md`, modificado en `ed1bf49` (16 líneas cambiadas en ese commit) | **sí** |
| Escribió la regla 7 y la subsección en `AGENTS.md` y `CLAUDE.md` de Cantu | los dos existen y los dos fueron tocados en el commit hermano de Cantu | **sí** |
| `cantu-studio/CONSTITUCION.md` NO EXISTE | comprobado: no existe | **sí** |
| El record existe | `context/aiw-console/records/DISCIPLINA-UN-RUN-POR-CARRIL.md`, 14 122 B | **sí** |
| Commiteado | `ed1bf49`, 2026-07-27 23:29:38 -0600 | **sí** |

### A.2 `PARTICION-IMPLEMENTACION-Y-DOCUMENTACION-CANTU.md` → `RUN-CONSOLE-CANTU-IMPL-DOC-SPLIT-001`

| Lo que el record afirma | Verificación en disco | Resultado |
|---|---|---|
| Cantu pasa de 53 a **71 runs** | contado sobre `cantu-studio/.aiw/roadmap/roadmap.json`: **71** | **sí** |
| 7 objetivos y 28 fases, sin cambio | contado: **7 / 28** | **sí** |
| Carriles `DEVELOPMENT` 48 · `DOCUMENTATION` **23** | contado: **23** runs con `lane` explícito; los otros 48 resuelven al default declarado | **sí** |
| Los dos carriles siguen declarados en `root.lanes` | leídos verbatim del canónico: `DEVELOPMENT` (default) y `DOCUMENTATION` | **sí** |
| El canónico de aiw-console no se tocó (`58a726…1eb15`) | md5 al empezar este cierre: **idéntico** | **sí** |
| El record existe | `…/PARTICION-IMPLEMENTACION-Y-DOCUMENTACION-CANTU.md`, 28 800 B | **sí** |
| Commiteado | `ed1bf49`, 2026-07-27 23:29:38 -0600 | **sí** |

### A.3 `REEMISION-MANUAL-PROJECT-O4-P14.md` → `RUN-CONSOLE-PROJECT-REEMIT-ROUTE-001`

| Lo que el record afirma | Verificación en disco | Resultado |
|---|---|---|
| La tercera ruta existe en el server | `project-console/serve.mjs` modificado en `6519ba5` (+356 líneas) | **sí** |
| El botón y su acuse en la UI | `project-console/index.html` (+13), `assets/project-console.js` (+193), `assets/project-console.css` (+36) | **sí** |
| Un test nuevo para la ruta y la matriz | `tests/serve-project-emit.test.mjs` (nuevo, 521 líneas) y `tests/serve-write-routes.test.mjs` (+122) | **sí** |
| Movió cinco pins de 53 a 71 | los tres archivos de test que nombra fueron tocados en el mismo commit | **sí** |
| Los canónicos reales quedaron byte-idénticos | `cantu-studio`: `6d6951370dc581cc5a21cf7cd3ce287f`, **el mismo hoy**; `aiw-console`: `58a726…1eb15`, el mismo al empezar | **sí** |
| El record existe | `…/REEMISION-MANUAL-PROJECT-O4-P14.md`, 30 152 B | **sí** |
| Commiteado | `6519ba5`, 2026-07-28 00:24:51 -0600 | **sí** |

**Y una comprobación cruzada que el encargo no pedía:** la ruta que este record entrega fue
**ejercitada de verdad**, no solo probada. El `.project/` de Cantu se re-emitió con ella y se
commiteó como `73945e56` («project: re-emision desde el boton de la consola»), con
`generated_at` `2026-07-28T06:15:51.858Z` y **71 runs**. Ése es también el hecho que desmiente el
pendiente 1 del handoff de Cantu (Bloque E).

---

## BLOQUE B — El handoff inicial de `cantu-studio`: NO recibe run propio

`context/handoffs/cantu-studio.md` fue **creado** en `ed1bf49` (286 líneas, `--diff-filter=A`
sobre ese archivo devuelve ese único commit). Es trabajo entregado, y **ninguno de los dos
records de ese commit lo reclama**: la tabla «Archivos escritos, y ninguno más» de
`DISCIPLINA…` lista tres archivos y su propio record; la de `PARTICION…` lista dos. El handoff no
está en ninguna.

**Decisión: cuelga del run de la disciplina, y no recibe run propio.** Queda nombrado dentro del
`full_description` de `RUN-CONSOLE-LANE-EXECUTION-DISCIPLINE-001`. Cuatro razones, en orden de
peso:

1. **El criterio del proyecto es un run por RECORD, y el handoff no tiene record.** Darle uno
   invertiría el criterio: pasaría a ser «un run por archivo entregado», que es otra cosa y
   ninguna decisión de cabina la ha tomado.
2. **Es EFÍMERO por su propia declaración** —«se sobrescribe… no acumula historia, no se versiona
   por tramo»—. Un run cuyo entregable se sobrescribe cada sesión **no se puede verificar contra
   el disco en la forma en que se entregó**, que es exactamente la comprobación que el Bloque A
   hace con los otros tres. Este mismo encargo acaba de retocarlo (Bloque E), lo que lo prueba.
3. **Es el primer artefacto de esa disciplina.** La regla nueva presupone talleres en paralelo, y
   un segundo hilo no existe sin su relevo: el handoff es la disciplina instanciada, no un
   trabajo contiguo.
4. **Viajó en el mismo commit** que el record de la disciplina, como parte del mismo acto de
   levantar el hilo paralelo.

---

## BLOQUE C — La ubicación de cada run, y por qué

### C.1 Una fase nueva, dos existentes

| # | Record | Run creado | Fase | Por qué ahí |
|---|---|---|---|---|
| 1 | `PARTICION-IMPLEMENTACION-Y-DOCUMENTACION-CANTU.md` | `RUN-CONSOLE-CANTU-IMPL-DOC-SPLIT-001` | **`O4.P14`** (existente) | El record se abre declarándose «**la segunda mitad de la migración a carriles**», y la primera mitad —`RUN-CONSOLE-CANTU-LANES-MIGRATION-001`— ya vive en `O4.P14`. La segunda mitad del título de la fase, «**and their first real application**», existe literalmente para cubrir esto: es la misma aplicación, continuada. **No se creó fase.** |
| 2 | `REEMISION-MANUAL-PROJECT-O4-P14.md` | `RUN-CONSOLE-PROJECT-REEMIT-ROUTE-001` | **`O4.P15`** (NUEVA) | Ninguna fase existente lo cubre. `O4.P12` nombra **DOS** rutas de escritura en su título —«the console edits the roadmap (dry-run→confirm) **and** syncs the history»— y ésta es una **TERCERA**, con guarda propia, compuertas propias y record propio. `O4.P13` es acabado de renderizado. `O4.P9` es trabajo que no mapea a ninguna etapa, y esto sí es capacidad de consola. Fase nueva, `phase_id` nuevo y no reutilizado. |
| 3 | `DISCIPLINA-UN-RUN-POR-CARRIL.md` | `RUN-CONSOLE-LANE-EXECUTION-DISCIPLINE-001` | **`O4.P9`** (existente) | No es esquema ni aplicación de carriles a un roadmap: es una regla sobre **cómo ejecutan los talleres**, y sus entregables son documentos de gobernanza, no datos. Eso es literalmente lo que declara el título de `O4.P9`: «Prior and cross-cutting work (outside the stage sequence)». **Mismo razonamiento con el que el cierre anterior colocó ahí `RUN-CONSOLE-ROADMAP-ENGLISH-001`**, y la misma regla: no se crea una fase de un solo run cuando existe la fase que la cubre. Considerada `O4.P14` y **rechazada** por lo primero de esta celda. |

### C.2 `O4.P15` es id NUEVO y NO REUTILIZADO

Barrido antes de crearlo sobre `.md`, `.json`, `.mjs`, `.js`, `.html` y `.css` de todo el
proyecto, en las dos formas (`O4.P15` y `O4-P15`): **cero ocurrencias**. No aparece en el
roadmap, ni en el emitido, ni en los records, ni en `DECISIONES.md` como id retirado.

### C.3 Y el record #2 se había asignado la fase MAL

`REEMISION-MANUAL-PROJECT-O4-P14.md` **reclama `O4.P14` en su nombre y en su H1**, y la cabina
nunca se la asignó. `O4.P14` es «Lanes and barriers in the roadmap schema (D-051), and their
first real application»: **no cubre una ruta de escritura**. La fase la asigna este cierre, y es
`O4.P15`. Queda dicho dentro del `full_description` del run, y es el caso que sostiene la deuda
del Bloque H.2.

### C.4 Dependencias: solo las que el record nombra

No se inventó ninguna cadena. Tres aristas, una por run:

| Run | `depends_on` | La frase del record que lo sostiene |
|---|---|---|
| `…CANTU-IMPL-DOC-SPLIT-001` | `RUN-CONSOLE-CANTU-LANES-MIGRATION-001` | «La segunda mitad de la migración a carriles. La primera (record `MIGRACION-CANTU-A-CARRILES.md`)…» |
| `…PROJECT-REEMIT-ROUTE-001` | `RUN-CONSOLE-ESCRITURA-ROADMAP-HISTORY-001` | «Reutiliza la forma de `history/sync`, que es el precedente que el encargo señaló» |
| `…LANE-EXECUTION-DISCIPLINE-001` | `RUN-CONSOLE-LANES-BARRIERS-001` | «se escribió antes de que existieran los carriles (D-051) y contradecía de frente la metodología nueva» |

**Una arista que NO se declaró, y por qué:** la partición es lo que **motivó** el botón de
re-emisión (el record lo dice: «El caso real que lo motivó»), pero motivación no es compuerta —
la ruta podría haberse construido antes. Este proyecto declara `depends_on` **sólo donde hay
compuerta real** (`D-046`). Queda dicho en la prosa del run, no en el grafo.

### C.5 Los `run_id` nuevos van en inglés

Los tres son tokens en inglés y cumplen `RUN_ID_PATTERN`. El roadmap está entero en inglés desde
`RUN-CONSOLE-ROADMAP-ENGLISH-001` y estas son identidades **nuevas**; acuñarlas en español sería
sembrar el problema que la traducción vino a cerrar. **Los 16 `run_id` existentes con raíz
española NO se tocaron**: identidad opaca, `D-047`.

---

## BLOQUE D — Las cuatro fases de trabajo pendiente, intactas

Regla dura del encargo: `O4.P5` (paridad), `O4.P8` (UI/UX), `O4.P6` (AIW tercer proyecto) y
`O4.P7` (corte) no reciben runs completados y sus runs pendientes no se tocan.

Comprobado por **igualdad estructural exacta** contra el respaldo, campo por campo, ignorando
únicamente `queue_order`:

| Fase | Runs antes → después | Status antes → después | ¿Algún `completed`? | Estructura idéntica |
|---|---|---|---|---|
| `O4.P5` | 1 → 1 | `planned` → `planned` | no | **sí** |
| `O4.P8` | 1 → 1 | `planned` → `planned` | no | **sí** |
| `O4.P6` | 1 → 1 | `planned` → `planned` | no | **sí** |
| `O4.P7` | 1 → 1 | `planned` → `planned` | no | **sí** |

**La única diferencia, y hay que declararla:** su `queue_order` se desplazó **+2**
(33→35, 34→36, 35→37, 36→38). No es una edición: es la consecuencia forzada del invariante
«`queue_order` global denso, único y contiguo 1..N» cuando se insertan dos runs antes de ellas
(el tercero, el de la disciplina, va detrás). El propio motor lo recalcula (`applyOrder`). Ni
`run_id`, ni `phase_id`, ni `status`, ni `title`, ni `summary`, ni `full_description`, ni
`depends_on` de esas cuatro fases cambiaron un carácter — que es lo que «intactas» significa
según la propia glosa del encargo.

**Y `O4.P10` sigue de última**, como declara su propio run: «stays at the end of the objective:
it is history, not plan». La fase nueva se colocó antes de las pendientes, no después de la
historia — que es lo que obligó al Bloque F.2.

---

## BLOQUE E — Los dos handoffs

### E.1 `aiw-console.md` — REESCRITO

13 524 B → **20 993 B**. Estaba fechado el **2026-07-25** y decía «Siguiente: LA FASE DE
ESCRITURA (`O4.P12`)»; desde entonces se entregaron **once commits de trabajo** (`git log`, del
`2e02a8b` al `6519ba5`), el primero de los cuales cerró esa misma fase.

**La disciplina declarada se conserva intacta** — los tres bloques de cita de cabecera siguen
palabra por palabra («es EFÍMERO y se SOBRESCRIBE», «no afirma hechos, apunta a dónde están
medidos», «si da una cifra, la da con su cita»), y el cuerpo la obedece: **cada cifra viaja con
el archivo, el record o el comando que la mide**.

Lo que el hilo nuevo encuentra, punto por punto del encargo:

| Punto pedido | Dónde quedó |
|---|---|
| Qué está hecho y qué queda vivo en O4 | «El orden vigente de O4, posición por posición» (11 posiciones) y la tabla de los **seis `planned`** con su `queue_order`, fase y run |
| Lo SIGUIENTE es el **ANÁLISIS DE AIW**, no una conversión mecánica | Sección propia, con los cuatro pasos en orden y la frase «NO es una conversión mecánica de Markdown a árbol» |
| La medición de AIW y dónde vive su record | **Se dice que NO EXISTE todavía** — buscado en `records/` al escribir el handoff — y se instruye resolver el puntero contra el disco. **No se inventó nombre ni cifras.** Ver E.3 |
| La auditoría de contenido, DIFERIDA a propósito | Sección propia: O4 vive en dos sitios y `O4.P6` los reconcilia; auditar antes obligaría a auditar dos veces |
| Pendientes del OPERADOR, distinguidos de los del taller | Sección de ocho, con `governance/` (7 guardrails + 5 claims, **contados en los dos archivos hoy**) de primero, las 7 premisas fechadas, los 16 `run_id` y las 9 fuentes diferidas |
| Existe un hilo paralelo para `cantu-studio` | Bloque de cita en la cabecera + puntero nº 2 de las lecturas de arranque |

**Tres correcciones de estado que la reescritura tuvo que hacer**, todas medidas:

1. El handoff viejo daba **«2 objetivos, 35 runs»** y **«O4 13 fases, 23 runs»**. Hoy son
   **2 / 19 / 45**, y O4 **16 fases / 33 runs**.
2. Decía que el server es **de solo lectura** («GET y HEAD, 405 a todo lo demás, ninguna ruta de
   código que abra un archivo para escribir»). **Falso desde `O4.P12`**: hay **tres** rutas de
   escritura, y la reescritura las tabula con su fase.
3. Decía que el `.aiw/` de este repo **«hoy no existe»**. **Existe**: `projects/aiw-console/.aiw/`
   con `roadmap/` y `views/`, tres artefactos con `mtime` 2026-07-22 15:38, **ignorado por Git**
   (`.gitignore:5`) y sin trackear. Es residuo de la ruta vieja de proyección, no estado vivo, y
   así queda escrito — con su fecha de medición.

### E.2 `cantu-studio.md` — RETOCADO, no reescrito

16 619 B → **18 875 B**. **Tres hunks, +37/−8 líneas.** Todo lo demás byte-idéntico.

| Hunk | Qué cambió |
|---|---|
| cabecera (tras la línea 30) | Nota de **RETOQUE del 2026-07-28** declarando que hay **un solo cambio de fondo** y que el resto se conserva con sus cifras del 2026-07-27 |
| pendiente **1** | La afirmación falsa, corregida — ver abajo |
| pendiente **2** | Corrección medida — ver abajo |
| «Cómo levantar la consola» | «de ahí el pendiente 1» → «por eso existe el botón del pendiente 1» (una línea; el puntero apuntaba a un pendiente que ya no lo es) |

**La afirmación falsa (pendiente 1), y su corrección.** Decía: «**`.project/` de Cantu está
DESFASADO, a propósito.** Los seis artefactos conservan `mtime` de las 17:43 del 2026-07-27, y su
`.project/roadmap.json` trae **53 runs** donde el canónico ya trae 71. La consola mostrará 53
hasta que el operador haga su próxima escritura desde ella.»

**Verificado en disco ANTES de afirmar nada**, el 2026-07-28: los seis artefactos llevan
`generated_at` `2026-07-28T06:15:51.858Z`; `.project/roadmap.json` trae **71 runs, 7 objetivos y
28 fases**, las mismas cifras que el canónico contadas en los dos archivos; los **23** runs con
`lane` explícito están en los dos; commiteado como `73945e56`; `git status --porcelain` de Cantu
**vacío**. La corrección conserva la historia (qué decía y hasta cuándo fue cierto) y **añade la
vía que lo resuelve en adelante**: el botón `Re-emit .project/`, tercera ruta de escritura, con
su record, su acuse esperado (`6 artifacts · 71 runs`) y la regla operativa — **pulsar el botón
después, no re-emitir desde el encargo** — más el aviso de que el desfase **puede volver** en
cuanto otro carril toque el canónico.

**Una corrección que el encargo no pedía, y por qué se hizo igual.** El **pendiente 2** decía
«Trabajo sin commitear en los dos repos», con HEADs `b4e8ed0f` y `897c710`. Medido hoy:
`cantu-studio` está en `73945e56` con el árbol **vacío**, y `aiw-console` en `6519ba5` — la
afirmación es **falsa**, no envejecida. El objetivo del encargo es que **los dos handoffs digan
la verdad**; dejar en pie una afirmación medida-falsa en un relevo cuya disciplina declarada es
«no afirma hechos sin fuente» lo contradiría de frente. Se corrigió con la misma forma que la
otra (qué decía → qué se mide hoy), en cinco líneas, y se declara aquí como lo que es: una
adición sobre la letra del encargo, tomada al servicio de su objetivo.

### E.3 El record de la medición de AIW: no existía, y aterrizó a mitad del cierre

El encargo advertía que la medición de AIW la produce un encargo paralelo («el encargo B») y que,
si al escribir el handoff no existía, **había que decirlo y no inventarlo**. Se cumplió al pie de
la letra, y el desenlace vale registrarlo porque es el paralelismo funcionando:

1. **Buscado el 2026-07-28 al escribir el handoff** en `context/aiw-console/records/` (29
   archivos, ninguno de AIW más allá de las mediciones viejas de proyector y fuentes) y en
   `context/aiw/` (cuatro archivos de contexto, no de medición): **no existía**. El handoff se
   escribió diciendo exactamente eso, sin nombre y sin cifras, e instruyendo resolver el puntero
   contra el disco.
2. **Apareció durante la verificación final**, en el barrido de `git status` del Bloque I.3:
   `context/aiw-console/records/MEDICION-ESTADO-DE-AIW.md`, 55 281 B, sin trackear. El otro
   taller lo entregó mientras éste corría.
3. **El handoff se corrigió contra el disco**, que es lo que su propia disciplina exige: el
   párrafo ahora nombra el record, resume sus seis secciones y sus 14 riesgos (`R1`–`R14`),
   advierte de su marca `[NO VERIFICADO]`, y pasa a ser la **lectura de arranque nº 1**. La
   sección de la auditoría diferida apunta además a su **sección 2**, que es donde el duplicado
   de O4 está medido ítem por ítem.

**Y es la prueba en vivo de la disciplina de carriles.** Dos talleres escribieron a la vez en el
mismo repo con **superficies de escritura disjuntas** —aquél un record nuevo, éste el roadmap,
los handoffs y los tests— y no se pisaron: `git status` los muestra como conjuntos ajenos. Es la
segunda vez que ocurre y se mide (la primera está en `DISCIPLINA…` E.1). **Este encargo no tocó
ni un byte de ese record**: solo lo leyó para apuntar a él.

---

## BLOQUE F — El camino de escritura, y la operación que el motor NO tiene

### F.1 Lo que se hizo por el motor: 5 escrituras

Todo por `planEdit` → `applyPlan` de `tools/roadmap/roadmap-plan.mjs` — la misma orquestación que
usa el endpoint de la consola —, con **re-lectura del archivo escrito y `checkInvariants` como
autoridad post-escritura después de CADA una**:

| # | Operación | Bytes resultantes | Avisos |
|---|---|---:|---|
| 1 | `insert RUN-CONSOLE-CANTU-IMPL-DOC-SPLIT-001` (`--end-of-phase O4.P14`) | 85 814 | 0 |
| 2 | `insert RUN-CONSOLE-LANE-EXECUTION-DISCIPLINE-001` (`--end-of-phase O4.P9`) | 89 837 | 0 |
| 3 | `create-phase O4.P15` | 90 003 | 0 |
| 4 | `insert RUN-CONSOLE-PROJECT-REEMIT-ROUTE-001` (`--end-of-phase O4.P15`) | 94 118 | **1** |
| 5 | `batch` de **4 sub-ops**: 1 `move` + 3 `set-status` | 94 295 | 0 |
| | **Total de escrituras por el motor** | **5** | |

**El aviso de la operación 4 es del motor y es correcto:** «phase `O4.P15` has no runs; new run
appended at the global end». Una fase recién creada está vacía, así que el motor no tiene ancla
dentro de ella y apenda al final global. El `move` de la operación 5 lo coloca en su sitio —
**sin `--to-phase`**, que es lo que garantiza que el run NO cambia de fase y solo cambia de
`queue_order`.

**Dos límites del motor que este encargo tuvo que rodear, y que no son defectos:** `insertRun`
**no acepta `closeoutResult`** (por eso los tres cierres viajan en `set-status` dentro del
batch); y `insert`/`create-phase` son ops de IDENTIDAD y **el motor las rechaza dentro de
`batch`** a propósito, por lo que van de una en una. Ambos comportamientos están documentados en
el código y son deliberados — y son los mismos dos que el cierre anterior encontró.

### F.2 La operación que el motor NO tiene: posicionar una fase

**`core.createPhase` APENDA al final del objetivo** («Append at the END of the objective's
phases; existing phases keep their order») y **`KNOWN_OPS` no contiene `move-phase`** —
verificado en la lista literal, que hoy tiene 18 ops y ninguna es ésa. Con solo el motor,
`O4.P15` quedaba **después de `O4.P10`**, la fase del prototipo retirado cuyo propio run declara
que se queda al final porque es historia, mientras su run llevaba `queue_order` 34. Posición de
array y `queue_order` habrían quedado en desacuerdo, y trabajo entregado el 2026-07-28 se habría
pintado después de la historia.

**Se declara explícitamente: esa operación no existe en el motor.** Es la misma que el cierre
anterior tuvo que rodear, y sigue sin existir. Se resolvió con la escritura atómica que el
encargo autoriza para ese caso, acotada al mínimo:

- Es un **reordenamiento puro de dos posiciones de array**. No cambia un solo campo de nada.
- **Las precondiciones se asertan antes de escribir:** cada fase preexistente idéntica en
  `phase_id` y `title` contra la pre-imagen; exactamente una fase añadida y es `O4.P15`; mismo
  número de objetivos y mismo orden de objetivos; la fase nueva está efectivamente al final; y
  `O4.P5` existe como destino.
- **Las postcondiciones se asertan antes de escribir, no después:** `checkInvariants` sobre el
  árbol ya reordenado; ningún `run_id` desaparecido y exactamente tres añadidos; y — la que
  importa — **posición de array y `queue_order` ascendiendo juntos** en todo el archivo.
- **La escritura pasa por las primitivas del propio motor**: `core.serialize` para los bytes con
  el EOL detectado del archivo, y `core.applyWrite` para el `tmp` + `fsync` + `rename` atómico
  con respaldo.
- Después: re-lectura desde disco, `checkInvariants` de nuevo, y la comprobación de ascendencia
  repetida sobre lo releído.

El resultado coloca `O4.P15` **después de `O4.P14` y antes de `O4.P5`**, que es exactamente donde
el propio roadmap colocó `O4.P11`, `O4.P12`, `O4.P13` y `O4.P14` cuando se insertaron: el trabajo
entregado va en su lugar de la secuencia entregada, el plan pendiente queda de cola, y `O4.P9`
(transversal) y `O4.P10` (historia) siguen al final. **No se reordenó ninguna fase existente**:
su orden relativo es idéntico.

**Total: 6 operaciones — 5 por el motor, 1 por escritura atómica acotada.**

### F.3 Ensayo previo

La cadena entera se ensayó de punta a punta sobre una **copia** en el scratchpad antes de tocar
el canónico, con el mismo código y las mismas comprobaciones, y se verificó con los 25 chequeos
del Bloque G. El canónico resultó **byte-idéntico al ensayo** (`cmp` sin diferencias, 94 295 B,
md5 `e620f0702ed7d0130048bc7c65a914ae`), que es la prueba de que la secuencia es determinista.

---

## BLOQUE G — Invariantes y números

### G.1 Invariantes tras la edición

| Invariante | Resultado |
|---|---|
| `checkInvariants` limpio | **sí**, 0 errores |
| `queue_order` global denso, único y contiguo 1..45 | **sí** |
| `depends_on` colgantes | **0** |
| Fases con 0 runs | **0** |
| Cada dependencia precede a su dependiente | **sí**, 0 violaciones |
| Posición de array y `queue_order` ascienden juntos | **sí** |
| `run_id` preexistentes: todos presentes, ninguno renumerado | **sí** (42 → 45, +3 y ni uno alterado) |
| `phase_id` preexistentes: todos presentes | **sí** (18 → 19; el añadido es exactamente `O4.P15`) |
| `objective_id`: sin cambios | **sí** (`O0`, `O4`) |
| `root.lanes` declarados | **0** (la clave ni siquiera existe) |
| Runs con `lane` | **0** de 45 |
| Runs con `barrier` | **0** de 45 |

### G.2 Los números, antes y después

| | Antes | Después |
|---|---:|---:|
| Objetivos | 2 | 2 |
| Fases | 18 | **19** |
| Runs | 42 | **45** |
| Rango de `queue_order` | 1–42 | **1–45** |
| Aristas `depends_on` | 16 | **19** |
| O4 fases / runs | 15 / 30 | **16 / 33** |
| O4 `completed` | 24 | **27** |
| O4 `planned` | 6 | 6 |
| O4 `active` | 0 | 0 |
| O0 (todo) | 3 / 12 | **3 / 12, byte-idéntico** |

`planned` **no se movió**: este cierre añade solo trabajo entregado. Es la comprobación numérica
de que no hubo replanificación (ver H.3).

### G.3 O0, byte-idéntico

| | Bytes | md5 |
|---|---:|---|
| Línea base desde `O4.P1` | 19 845 | `8f954764427c6720361b01f3d785d075` |
| **Después de este encargo** | **19 845** | **`8f954764427c6720361b01f3d785d075`** |

Y además **deep-equal contra el respaldo**, no solo igual de hash.

### G.4 El barrido de idioma sobre el texto NUEVO

Los **10 campos de prosa nuevos** (1 título de fase + 3 runs × `title`/`summary`/
`full_description`) se barrieron con un patrón de palabras funcionales españolas
(`el|la|los|las|de|que|por|para|con|una|del|se|no|es|y|en`). **Cero español.** Los aciertos
fueron **10, y todos son falsos positivos declarables uno por uno**:

- **7** caen dentro de **rutas de record citadas verbatim** —
  `PARTICION-IMPLEMENTACION-**Y**-DOCUMENTACION-CANTU.md` y
  `DISCIPLINA-UN-RUN-**POR**-CARRIL.md`— que son nombres de archivo, no prosa, y no se traducen.
- **3** son la palabra inglesa **«no»** («with **no** way to catch up», «**no** damage», «had
  **no** run»).

`title`, `summary` y `full_description` de los tres runs, y el título de `O4.P15`, están
enteramente en inglés.

### G.5 Líneas base NUEVAS

| Artefacto | Bytes | md5 |
|---|---:|---|
| `roadmap/roadmap.json` | **94 295** | **`e620f0702ed7d0130048bc7c65a914ae`** |
| subárbol **O0** | **19 845** | **`8f954764427c6720361b01f3d785d075`** (sin cambio, y así debe seguir) |
| subárbol **O4** | **71 547** | **`e4d59bbb7ac100bd9b534318ccb6991b`** |
| `context/handoffs/aiw-console.md` | **20 993** | reescrito |
| `context/handoffs/cantu-studio.md` | **18 875** | retocado |

**No se registra línea base del emitido, porque este encargo no lo emitió.** El `.project/` de
este repo sigue byte-idéntico al que commiteó `6519ba5` — ver I.3.

---

## BLOQUE H — Parte 4: las dos deudas, anotadas y NO arregladas

**Ninguna de las dos recibe run, y la razón es la misma para las dos:** este encargo **solo
registra trabajo ENTREGADO**. Crear un run para trabajo que no se ha hecho es **planificar**, y
replanificar está explícitamente fuera de alcance («Reordenar fases o replanificar: esto pone al
día lo hecho»). Se comprueba en G.2: `planned` vale 6 antes y 6 después. Las dos quedan aquí y en
los pendientes del operador del handoff, que es donde la cabina las decide.

### H.1 Censos fijados a mano en la suite

**El hecho.** `records/REEMISION-MANUAL-PROJECT-O4-P14.md` Bloque F documenta que **cinco tests
llegaron en rojo** a esa fase, todos por el mismo pin: `53` runs de Cantu contra un canónico que
ya decía `71`. Ninguno tocaba código de esa fase.

**Lo que este encargo midió, y es peor de lo que el encargo suponía.** No es solo que los pins
envejezcan: **acoplan la suite a un artefacto DERIVADO**. De los seis pins que este cierre tuvo
que mover, **uno** lee el canónico (`tests/roadmap-lane-numbering.test.mjs`) y **cinco** leen
`.project/snapshot.json`, que es la proyección. Consecuencia medida hoy, corriendo la suite tres
veces:

| Estado de `.project/` al arrancar la suite | Resultado |
|---|---|
| 42 runs (la proyección commiteada) | **4 rojos** |
| 45 runs (en sincronía con el canónico) | **278 verdes** |

Es decir: **el resultado de la suite depende de si alguien pulsó un botón**, porque la propia
suite re-emite `.project/` a mitad de camino y algunos tests lo leen antes y otros después. Eso
no es un pin envejecido; es una **carrera**.

**La lección ya está escrita, y en el otro proyecto.** El contexto de gobernanza de Cantu declara
derivar el censo en tiempo de ejecución y nunca fijarlo. La suite de aiw-console repite el error.

**Y hay una posición escrita EN CONTRA, que es lo que convierte esto en decisión de cabina y no
en defecto a agendar.** `REEMISION…` H.6 dice, textual, que los pins se dejaron fijos **a
propósito**: «La alternativa —derivar el número del archivo en vez de fijarlo— quitaría al test
su capacidad de detectar un cambio no querido». Las dos posiciones están escritas, se
contradicen, y **elegir es de la cabina**: un run presupondría cuál gana.

### H.2 Records que se auto-asignan fase en el nombre

**Tercera vez.** Y este cierre puede añadir el dato que faltaba: **dos de las tres se asignaron
MAL**.

| Record | Fase que se auto-asignó | Qué pasó de verdad |
|---|---|---|
| `DOCS-INDICE-CURADO-TRANSPORTADO-O4-P5.md` | `O4.P5` | **MAL.** El archivo se renombró (`REARCHIVO-BLOQUE-RENAME.md`) porque reclamaba una fase ajena; su H1 **todavía dice `O4.P5`** y el título indexado en Docs lo seguirá mostrando |
| `ACABADO-PARIDAD-O4-P13.md` | `O4.P13` | **Acertó por casualidad**: la fase no existía, y el cierre anterior la creó con el id que el record ya nombraba |
| `REEMISION-MANUAL-PROJECT-O4-P14.md` | `O4.P14` | **MAL.** `O4.P14` es carriles y barriers; no cubre una ruta de escritura. La cabina asignó `O4.P15` en este cierre (C.3) |

**La regla que falta y que la cabina puede fijar cuando quiera:** un record **no nombra fase** —
ni en su nombre de archivo ni en su H1— **salvo que la cabina se la haya asignado**. Un record se
escribe antes de que exista el run; la fase la decide el cierre. **No se corrigió ningún nombre
ni ningún H1**: el contenido de los records no se edita y los renombrados son actos aparte.

---

## BLOQUE I — La suite, los pins, y `.project/`

### I.1 Los seis pins movidos, y a qué

La suite quedó roja tras la edición exactamente en los tests que fijaban conteos del roadmap. Se
actualizaron, y se declara cuáles y a qué:

| Archivo | Aserción | Lee | Antes | Después |
|---|---|---|---|---|
| `tests/roadmap-lane-numbering.test.mjs:339` | `orders.length` | **el canónico** | 42 | **45** |
| `tests/shell-model.test.mjs:129` | nombre del test | la proyección | «…measured 2/18/42» | «…measured 2/19/45» |
| `tests/shell-model.test.mjs:132` | `summary.counts` | la proyección | `{2, 18, 42}` | **`{2, 19, 45}`** |
| `tests/shell-model.test.mjs:134` | `byToken.completed` | la proyección | 33 | **36** |
| `tests/shell-switch.test.mjs:49` | nombre del test | la proyección | «2 objectives, 42 runs» | «2 objectives, 45 runs» |
| `tests/shell-switch.test.mjs:58` | regex de la línea de diagnóstico | la proyección | `2 / 18 / 42` | **`2 / 19 / 45`** |
| `tests/shell-two-real-projects.test.mjs:151` | ídem (`assert.match`) | la proyección | `2 / 18 / 42` | **`2 / 19 / 45`** |
| `tests/shell-two-real-projects.test.mjs:225-227` | comentario + `assert.doesNotMatch` (prueba de aislamiento) | la proyección | `2 / 18 / 42` | **`2 / 19 / 45`** |

**Ninguna aserción cambió de significado**: todas siguen comprobando lo mismo contra el número
que el canónico ahora dice. Los pins de `cantu-studio` (`7 / 28 / 71`) **no se tocaron**: su
canónico no cambió.

### I.2 Suite: 278 tests, 278 verdes — con la condición dicha

Verificado **dos veces seguidas** con `.project/` en sincronía con el canónico. Y verificado
también el caso contrario, porque callarlo sería mentir por omisión: **arrancando la suite con la
proyección commiteada (42 runs), 4 tests salen rojos** y la propia suite deja `.project/` en 45,
de modo que la segunda corrida sale verde. Es H.1 en su forma más aguda, y no se arregla aquí
porque arreglarlo es la deuda.

**Qué significa para el operador, en una frase:** **pulsa el botón antes de correr la suite**, y
tendrás 278 verdes a la primera.

### I.3 `.project/` NO fue re-emitido por este encargo — el operador tiene el botón

Los seis artefactos de `.project/` quedan **byte-idénticos** a los que commiteó `6519ba5`,
comprobado por md5 uno a uno:

| Archivo | md5 (antes y después) |
|---|---|
| `docs_index.json` | `e7145feb601e5b6324348a0b35c73616` |
| `git_history.json` | `9c466bd8e0aae5f9d462714770759a8a` |
| `guardrails.json` | `b37a6ddedea3f51b692fbc58da915d43` |
| `no_claims.json` | `eb1e2f62ba4fa542f0805421cce59350` |
| `roadmap.json` | `716c2cb2ad6db4464cec58e7f8b8633f` |
| `snapshot.json` | `f34e31217ba553d4d3362d827c1fc721` |

**Cómo se consiguió, porque no fue gratis.** La suite **re-emite `.project/` al correr** — es
conducta declarada y preexistente (`REEMISION…` I.7). Este encargo la corrió **diez veces**, y
**restauró los seis artefactos desde el respaldo** cada vez que hizo falta, verificando por md5 y
por `git status --porcelain` que el árbol de trabajo volvía a quedar limpio en `.project/`. La
re-emisión de la suite es un efecto colateral de leer, no un acto de este encargo; la restauración
es lo que lo mantiene cierto.

**Consecuencia, y es lo que el operador tiene que saber:** el canónico trae **45 runs** y la
proyección **42**. **La consola pintará 42 hasta que se pulse `Re-emit .project/`** en la pestaña
Roadmap con `aiw-console` seleccionado. Acuse esperado: **`6 artifacts · 45 runs`**. **Hay que
pulsarlo**, y la re-emisión no commitea — deja el diff para revisión.

### I.4 El validador viejo

`tools/project-console/validate-project-console-state.mjs` sigue rojo y **no tiene que ver con
este trabajo**: lee `.aiw/` (artefactos del 2026-07-22 que este repo ya no usa) y no mira ni
`roadmap/roadmap.json` ni `.project/` en ningún punto. Tooling viejo, fuera de alcance, y estaba
rojo antes.

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
| 10 | `O4.P12` | Write — the console edits the roadmap (dry-run→confirm) and syncs the history | 26 | 1 completed |
| 11 | `O4.P13` | Finishing of the ported console — parity corrections, Docs grouping by path, and the subview width defect | 27–29 | 3 completed |
| 12 | `O4.P14` | Lanes and barriers in the roadmap schema (D-051), and their first real application | **30–33** | **4 completed** ← +1 aquí |
| 13 | **`O4.P15`** | **Manual re-emission of `.project/` — the console's third write route** | **34** | **1 completed** ← nueva |
| 14 | `O4.P5` | Stage 5 — Global console renders Cantu (parity, operator QA) | 35 | 1 planned |
| 15 | `O4.P8` | Stage 8 — UI/UX | 36 | 1 planned |
| 16 | `O4.P6` | Stage 6 — AIW as a third project (roadmap Markdown → v3) | 37 | 1 planned |
| 17 | `O4.P7` | Stage 7 — Cutover: retirement of Cantu's console + deletion of .aiw | 38 | 1 planned |
| 18 | `O4.P9` | Prior and cross-cutting work (outside the stage sequence) | **39–44** | **4 completed**, 2 planned ← +1 aquí |
| 19 | `O4.P10` | Global console prototype (RETIRED by D-048 — history) | 45 | 1 completed |

---

## BLOQUE K — Qué queda abierto

1. **El operador tiene que pulsar `Re-emit .project/`** (I.3). Es lo único que hace visible este
   cierre.
2. **Las dos deudas del Bloque H**, ninguna con run, las dos en los pendientes de operador del
   handoff. La H.1 tiene **dos posiciones escritas que se contradicen**; elegir es de cabina.
3. **`move-phase` sigue sin existir en el motor** (F.2). Segundo cierre consecutivo que lo
   rodea. Mientras no exista, cada fase nueva que no vaya al final del objetivo exige la escritura
   acotada. Candidato natural a run propio **cuando la cabina quiera planificar**, que no es lo
   que este encargo hace.
4. **La auditoría de contenido del roadmap sigue DIFERIDA** hasta después del análisis de AIW, y
   ahora está escrito por qué: O4 vive en dos sitios y `O4.P6` los reconcilia.
5. **El record de la medición de AIW YA EXISTE** (E.3): `records/MEDICION-ESTADO-DE-AIW.md`,
   aterrizado a mitad de este cierre y ya apuntado desde el handoff como lectura de arranque nº 1.
   Sus **14 riesgos (`R1`–`R14`) están reportados y sin resolver**, por decisión de ese encargo:
   son insumo de la conversación de cabina, no trabajo agendado.
6. **`DECISIONES.md` no recibió entrada.** Este encargo **no reserva número de decisión**: no
   cambia el contrato, pone al día el papel contra el disco. Tercer cierre consecutivo con la
   misma disciplina.
7. **`governance/` sigue sin revisar** — 7 guardrails y 5 claims autorados por el taller en
   `O4.P2`, nunca validados por nadie con autoridad. Es el pendiente más viejo de la lista y
   ningún cierre lo ha tocado.

---

## Estado de completitud

- Bloque 0 (respaldo por md5 antes de tocar nada; línea base de partida coincidente con la del
  cierre anterior; suite y frontera antes) — COMPLETO.
- Bloque A (los tres records verificados contra su record Y contra el disco, tabla por tabla, más
  la comprobación cruzada de que la ruta de re-emisión se ejerció de verdad) — COMPLETO.
- Bloque B (el handoff huérfano atribuido a su commit, y la decisión de no darle run con sus
  cuatro razones) — COMPLETO.
- Bloque C (ubicación de cada run con su justificación; `O4.P15` probado nuevo y no reutilizado;
  la fase mal auto-asignada; las tres aristas y la que NO se declaró) — COMPLETO.
- Bloque D (las cuatro fases pendientes por igualdad estructural exacta; el desplazamiento +2
  declarado; `O4.P10` sigue de última) — COMPLETO.
- Bloque E (handoff reescrito punto por punto del encargo; handoff retocado con diff medido; las
  tres correcciones de estado; la corrección extra declarada; el record de AIW que no existe) —
  COMPLETO.
- Bloque F (5 operaciones por el motor con el aviso explicado; la operación que el motor no tiene,
  con precondiciones y postcondiciones asertadas antes de escribir; ensayo byte-idéntico) —
  COMPLETO.
- Bloque G (12 invariantes; números antes/después; O0 byte-idéntico y deep-equal; barrido de
  idioma con los 10 falsos positivos declarados; líneas base nuevas) — COMPLETO.
- Bloque H (las dos deudas anotadas, la decisión de no darles run justificada, y la medición
  nueva que agrava la primera) — COMPLETO.
- Bloque I (seis pins con su fuente; suite verde con la condición dicha en voz alta; `.project/`
  byte-idéntico con los seis md5 y el método de restauración; el validador viejo) — COMPLETO.
- Bloque J (mapa de fases para la cabina) — COMPLETO.
- Bloque K (lo abierto) — COMPLETO.
