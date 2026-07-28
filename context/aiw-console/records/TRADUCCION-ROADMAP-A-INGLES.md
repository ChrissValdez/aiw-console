# TRADUCCIÓN DEL ROADMAP CANÓNICO DE `aiw-console` AL INGLÉS

> **Encargo de taller, 2026-07-27.** El roadmap canónico mezclaba runs en español (O4) y en
> inglés (O0). Este encargo lo deja entero en inglés, **por transcripción y no por
> reescritura**: cada frase conserva exactamente lo que afirma — mismos números, mismas citas,
> mismas rutas, mismo alcance.
>
> **Camino de escritura: EL MOTOR.** No se editó el JSON a mano. Se midió primero que el motor
> tiene la operación (`set-text`, para `title`/`summary`/`full_description` de run y para el
> `title` de fase y objetivo) y se usó, en **un solo `batch` de 37 sub-ops** por
> `planEdit` → `applyPlan`, con re-lectura del archivo escrito y `checkInvariants` como
> autoridad post-escritura. Misma disciplina que la migración de carriles.
>
> **Este record se escribe en español** por consistencia con esta carpeta: un record no es
> interfaz (regla de idioma, `CORRECCIONES-QA-CARRILES-Y-REGLA-DE-IDIOMA.md` Bloque C).

---

## BLOQUE A — Qué se hizo, en cifras

### A.1 Campos de prosa

| | Campos |
|---|---:|
| Total de campos de prosa en el roadmap | **124** |
| **Traducidos** (valor cambiado) | **83** |
| **Dejados como estaban, por estar YA en inglés** | **41** |
| **Reportados SIN traducir por ambigüedad (campos enteros)** | **0** |

Los 124 son: `title` de la raíz (1) + `title` de objetivo (2) + `title` de fase (16) +
`title`/`summary`/`full_description` de cada run (35 × 3 = 105).

Los **41 no tocados** son exactamente el `title` de la raíz (`"AIW Console Roadmap"`, ya en
inglés) más **todo O0**: su `title` de objetivo, sus 3 `title` de fase y los 36 campos de sus
12 runs. **O0 ya estaba enteramente en inglés y no había en él una sola frase que traducir.**

Los **83 traducidos** son exactamente O4: 1 `title` de objetivo, 13 `title` de fase y los 69
campos de sus 23 runs.

### A.2 Ningún campo entero quedó sin traducir — pero **9 FRAGMENTOS** se conservaron verbatim

No hubo ambigüedad que obligara a dejar un campo entero en español. Sí hubo **nueve
fragmentos** que se conservan verbatim porque **traducirlos falsificaría la frase que los
introduce**, y cada uno lleva una glosa en inglés al lado. Son el caso que el encargo manda
REPORTAR, y aquí está la lista completa:

| # | Run | Fragmento conservado | Por qué NO se traduce |
|---|---|---|---|
| 1 | `RUN-CONSOLE-AUDIT-PHASE0-001` | El bloque entero desde `SECUENCIA ACORDADA (D-034)` hasta `…ya pueden ir en paralelo.` | **El texto se declara a sí mismo "preservado literal de `RM-AIW:114-120`".** Traducirlo dejaría la frase diciendo "preserved literal" sobre algo que ya no lo es. Es el caso más grave de los nueve. La frase que lo introduce SÍ se tradujo, y se le añadió la glosa "and therefore left in the language of its source". |
| 2 | `RUN-CONSOLE-SHELL-MULTIPROYECTO-001` | `'Pantalla multi-proyecto'` | Título de bullet CITADO de `RM-AIW:152`. Glosa: `(multi-project screen)`. |
| 3 | `RUN-CONSOLE-CANTU-EMITE-CARPETA-001` | `'Los tres roadmaps al contrato'` | Título de bullet CITADO de `RM-AIW:133`. Glosa: `(the three roadmaps to the contract)`. |
| 4 | `RUN-CONSOLE-AIW-TERCER-PROYECTO-001` | `'Los tres roadmaps al contrato'` | Ídem, `RM-AIW:134`. Misma glosa. |
| 5 | `RUN-CONSOLE-PARIDAD-RENDER-CANTU-001` | `'Consola global en aiw-console'` | Título de bullet CITADO de `RM-AIW:149-151`. Glosa: `(global console in aiw-console)`. |
| 6 | `RUN-CONSOLE-CORTE-RETIRO-LOCAL-001` | `'Paridad y corte'` | Título de bullet CITADO de `RM-AIW:155-157`. Glosa: `(parity and cutover)`. |
| 7 | `RUN-CONSOLE-ESCRITURA-ROADMAP-HISTORY-001` | `'consola estable'` | **Término definido por `D-034`** y citado como tal ("allí 'consola estable' se definió acotadamente como READ-ONLY"). La cita es a la definición, no al concepto. Glosa: `(stable console)`. |
| 8 | `RUN-CONSOLE-PROTOTIPO-CONSOLA-001` | `'descartado'` | **Es un TOKEN**, no prosa: la frase afirma que ese token NO existe en el vocabulario cerrado de `status`. Traducirlo cambiaría de qué token se habla. Glosa: `(discarded)`. |
| 9 | `RUN-CONSOLE-EMISOR-CARPETA-PROPIA-001` | `'cuerpos sin índice'` | Nombre de categoría CITADO de `MEDICION-FUENTES-CONSOLA.md`. Glosa: `(bodies without an index)`. |

Barrido de comprobación sobre el canónico traducido, enmascarando antes lo que **no** es prosa
(rutas, nombres de archivo, `run_id`, símbolos `snake_case`, código entre backticks): **4
campos** conservan marcadores inequívocos de español, y son los fragmentos 1, 3, 4 y 9. Los
otros cinco no llevan acentos ni palabra-función española, así que no los caza un barrido
automático — por eso quedan enumerados aquí a mano.

### A.3 Decisiones de terminología, declaradas

`tramo` no tiene precedente en inglés en este repo (medido: cero ocurrencias en `docs/` y en
`project-console/`). Se eligió **`Stage`** y se usó de forma consistente en los 13 títulos de
fase y en la prosa. No se usó `Phase` porque `phase_id` ya ocupa esa palabra, y el propio
español evitaba `fase` por la misma razón: la distinción se preserva.

Otras equivalencias fijas: `consola global`→`global console` · `carpeta`→`folder` ·
`compuerta`→`gate` · `puerta`→`door` · `corte`→`cutover` · `retiro/retirado`→`retirement/retired` ·
`emisor`→`emitter` · `cabina`→`cockpit` · `encargo`→`commission` · `cierre de registro`→`record
closeout` · `acabado`→`finishing` · `re-archivo`→`re-filing` · `redacción`→`drafting` ·
`aristas`→`edges` · `hornear/horneado`→`bake in/baked in` · `desfase`→`mismatch` ·
`podredumbre`→`rot`.

**Un caso que se decidió traducir y se declara aquí por si la cabina discrepa:** la vista
`Cola` (3 ocurrencias: en `RUN-CONSOLE-EMISOR-CARPETA-PROPIA-001`, `RUN-CONSOLE-PORT-IDENTICO-001`
y `RUN-CONSOLE-MERGE-005-001`) pasó a `Queue`. Razón: `Cola` **nombra una superficie real de la
UI** cuyo nombre verdadero es `Run Queue` — y en la misma frase de `PORT-IDENTICO` el nombre
real aparece ya en inglés. Traducirlo preserva la referencia exacta; dejarlo habría dejado un
nombre de vista en español dentro de una enumeración en inglés. **No es una cita de documento**,
que es lo que separa este caso de los nueve de A.2.

---

## BLOQUE B — INVENTARIO DE PRESERVACIÓN, campo a campo

Para cada uno de los 124 campos se extrajo el **multiconjunto** de tokens que deben sobrevivir
intactos, en nueve clases, y se comparó ANTES contra DESPUÉS:

| Clase | Patrón |
|---|---|
| `decision` | `D-0XX` |
| `section` | `§10.d`, `§4.2`, `§18.b`, … |
| `phaseref` | `O4.P11`, `O0.P3`, `O2.P5`, … |
| `runid` | `RUN-<…>-NNN` |
| `anchor` | `RM-AIW:114-120`, `CANTU-VALID:153-166`, `CANTU-PCJS:5559`, … |
| `path` | rutas con `/` y nombres de archivo con extensión |
| `symbol` | `camelCase` y `snake_case` (`resolveInsideAiw`, `queue_order`, `taxonomy_model`, …) |
| `commit` | hashes de 7 hex (`dc76b49`, `29c9478`, …) |
| `number` | **todo** dígito, en cualquier forma |

> ### RESULTADO: **0 campos con el multiconjunto alterado.** De 124.
>
> Cada campo tocado conserva EXACTAMENTE los mismos números, las mismas referencias
> `D-0XX` / `§X` / `O4.PX`, los mismos `run_id`, las mismas anclas, las mismas rutas, los
> mismos nombres de archivo, los mismos nombres de símbolo y los mismos hashes de commit.
> **Cero discrepancias.** El inventario se corrió dos veces: sobre la serialización planeada
> (antes de escribir nada) y sobre el archivo que quedó en disco.

Los `full_description` más largos, que son donde una traducción puede perder precisión y donde
conviene mirar primero:

| Caracteres | Run |
|---:|---|
| 4 252 | `RUN-CONSOLE-EMISOR-CARPETA-PROPIA-001` |
| 2 985 | `RUN-CONSOLE-ESCRITURA-ROADMAP-HISTORY-001` |
| 2 735 | `RUN-CONSOLE-PORT-IDENTICO-001` |
| 2 137 | `RUN-CONSOLE-PROTOTIPO-CONSOLA-001` |
| 1 692 | `RUN-CONSOLE-ACABADO-DOCS-GIT-HISTORY-001` |
| 1 586 | `RUN-CONSOLE-LANZADOR-START-CONSOLE-001` |

---

## BLOQUE C — CERO cambios fuera de la prosa

Comparación estructural completa ANTES/DESPUÉS, serializando el esqueleto del árbol —
identificadores, conjunto **y orden** de claves por nodo, y todo valor que no es prosa:

> **`schema_version`, `roadmap_id`, `objective_id`, `phase_id`, `run_id`, `queue_order`,
> `status`, `depends_on`, `closeout_result`, `lane`, `barrier`, `progress`, el conjunto de
> claves de cada nivel, la anidación y el orden: BYTE-IDÉNTICOS.**

Ningún id renumerado. Ningún token de enumeración tocado. Ningún `queue_order` movido — el
`remap` que devuelve el motor tras el batch es **`[]`**, es decir, cero reordenamientos.

### C.1 Invariantes, antes y después

| Invariante | Antes | Después |
|---|---|---|
| `queue_order` denso, único y contiguo | **1..35 ✓** | **1..35 ✓** |
| `run_id` únicos | **35 / 35** | **35 / 35** |
| Aristas `depends_on` | **10** | **10** |
| `depends_on` colgantes | **0** | **0** |
| Carriles usados / no declarados | **0 / 0** | **0 / 0** |
| `checkInvariants` del motor | `[]` | `[]` |
| Roundtrip parse→serialize byte-idéntico | sí | **sí** |

`aiw-console` **sigue sin carriles y así queda**: no se declaró `lanes`, no se asignó `lane` a
ningún run y no se aplicó ningún `barrier`.

### C.2 Conteo estructural

| | Antes | Después |
|---|---:|---:|
| Objetivos | 2 | **2** |
| Fases | 16 | **16** |
| Runs | 35 | **35** |

Misma anidación y mismo orden en los tres niveles.

---

## BLOQUE D — LÍNEA BASE NUEVA, y una premisa del encargo que NO se cumplió

### D.1 El canónico

| | Bytes | md5 |
|---|---:|---|
| **ANTES** (respaldo previo, verificado por md5 antes de tocar nada) | 62 980 | `0a4c2d919279e1272c8f5400b78bbc2b` |
| **DESPUÉS — LÍNEA BASE NUEVA** | **63 434** | **`fef2ac094e2e85ca732c505321922dfb`** |

El respaldo se tomó **antes de la primera escritura** y se cotejó por md5 contra el original
(idénticos). El motor tomó además su propio respaldo durante `applyWrite`.

### D.2 O0 — **la premisa del criterio de aceptación no se cumple, y se reporta**

El encargo esperaba que *"O0 deja de ser byte-idéntico a su respaldo histórico por primera vez
desde `O4.P1`"*. **No ocurrió, y no podía ocurrir:**

> **O0 ya estaba enteramente en inglés.** Su `title` de objetivo, sus 3 `title` de fase y los 36
> campos de prosa de sus 12 runs están en inglés desde la migración de `O4.P1`. **No había en O0
> una sola frase que traducir**, así que no se tocó ni un byte suyo.

| Subárbol | Bytes antes | md5 antes | Bytes después | md5 después | ¿Idéntico? |
|---|---:|---|---:|---|---|
| **O0** | 19 845 | `8f954764427c6720361b01f3d785d075` | 19 845 | `8f954764427c6720361b01f3d785d075` | **SÍ** |
| **O4** | 40 776 | `8b958c548368935cc995b12fb18e1675` | 41 230 | `26ed78e8f2d3e5c236719f4f8a75a072` | no |

**Consecuencia, y es buena noticia:** la comprobación de integridad que O0 venía prestando a
todas las fases **sigue viva e intacta**. No hay línea base nueva que registrar para O0 porque
la vieja no caducó. La de arriba es la de siempre, re-medida hoy y confirmada.

Se verifica además lo que el criterio pedía verificar en caso de que O0 hubiera cambiado: **la
estructura, los ids, `queue_order` y `depends_on` de O0 son idénticos** — trivialmente, porque
el subárbol entero lo es.

### D.3 `.project/` re-emitido

Re-emitido con el emisor de siempre, `node tools/projector/project.mjs .` (`aiw-projector@0.9.0`),
para que la consola muestre el texto nuevo. Los seis archivos, con `entries` como los declara el
emisor:

| Archivo | Bytes | `entries` |
|---|---:|---:|
| `.project/docs_index.json` | 18 032 | 40 |
| `.project/git_history.json` | 20 967 | 49 |
| `.project/guardrails.json` | 3 055 | 7 |
| `.project/no_claims.json` | 2 832 | 5 |
| `.project/roadmap.json` | 63 680 | 2 |
| `.project/snapshot.json` | 68 308 | 2 obj / 35 runs |

> **LÍNEA BASE ÚTIL de `.project/`, y por qué es sólo ésta:**
>
>     .project/roadmap.json — md5 normalizado  1fd4076ce856ecfd49797fdab34128aa
>
> normalizando `generated_at` y `sources[].mtime`. **Es el único de los seis cuyo md5 es
> reproducible**, porque es el único que deriva sólo del canónico.
>
> **El md5 crudo de cualquiera de los seis NO sirve como línea base:** cada emisión reescribe
> `generated_at`. Y ni siquiera normalizado sirven los otros cinco: `docs_index.json` lleva
> `freshness` por documento —el `mtime` del archivo—, así que se mueve cada vez que se toca un
> `.md`; `snapshot.json` lo arrastra por `emitted_artifacts`; y `git_history.json` deriva del
> estado de git. **Para esos cinco, lo comparable son los bytes y el `entries` de la tabla, no
> un hash.**
>
> Nota de honestidad sobre esta tabla: el índice de docs de este repo **se escanea**, así que
> esta emisión ya incluye **este mismo record** (de ahí 40 documentos, uno más que antes).
> Editarlo otra vez moverá su `freshness` y, con ella, `docs_index.json` y `snapshot.json` en la
> siguiente emisión. Es el comportamiento normal de un índice escaneado, no un desajuste.

---

## BLOQUE E — Lo que NO se tocó, verificado

| | Antes | Después |
|---|---|---|
| `projects/cantu-studio/` (1 065 archivos) | `44a867c075cca54f3dbfcf00a11eed7d` | **`44a867c075cca54f3dbfcf00a11eed7d`** |
| `aiw/` | `7663d820d1483f318b0be3d9357a8a8a` | **`7663d820d1483f318b0be3d9357a8a8a`** |

Huella agregada de todo el árbol de archivos de cada uno. **cantu-studio y aiw: byte-idénticos,
sin una sola modificación.** Verificado dos veces — tras la re-emisión y de nuevo tras levantar
la consola.

**Aditividad de la proyección de AIW por el camino viejo.** El modo viejo (`aiw_objectives`) lee
**exclusivamente** dentro de su propio root: `readConfig(root)`, `readObjectives(root)`,
`readRunHistory(root)` y `readProjectId(root, config)` (`tools/projector/project.mjs:473-484`).
Nada bajo `projects/aiw-console` es entrada suya. Con `aiw/` byte-idéntico (arriba) y el
constructor comprobado determinista a reloj fijo, **su proyección es byte-idéntica; `generated_from`
tampoco cambia** (`aiw-projector@0.9.0` en ambas construcciones, porque el emisor no se tocó).
Se construyó **en memoria**, sin escribir: emitir para `aiw` es `O4.P6` y está fuera de alcance.

> **Desfase preexistente, medido y NO arreglado.** El artefacto en disco
> `aiw/.aiw/project_console.snapshot.json` dice `generated_from: aiw-projector@0.1.0` — ocho
> versiones del emisor por detrás — y difiere del constructor actual en 171 de 213 líneas
> (objetivos 10→16, runs 2→9). Es el residuo que el HANDOFF ya nombra ("copia stale (jul 2026);
> residuo"). **Este encargo no añade ni un byte de ese desfase.**

---

## BLOQUE F — Tests

**259 / 259 verde antes. 259 / 259 verde después.** Mismo conteo: no se añadió ni se retiró
ninguna prueba.

**Dos archivos fijaban texto español del roadmap. Se actualizaron, y se declara:** los cinco
asertos apuntaban todos al `title` del objetivo O4, usado como **marcador de fuga entre
proyectos** — exactamente el uso que `CORRECCIONES-QA-CARRILES-Y-REGLA-DE-IDIOMA.md` C.5(2)
había previsto ("lo será mientras el roadmap real lo diga así"). Hoy dice otra cosa.

| Archivo | Línea | Antes | Ahora |
|---|---:|---|---|
| `tests/shell-switch.test.mjs` | 56 | `/Consola global/` | `/Global Console/` |
| `tests/shell-switch.test.mjs` | 78 | marcador `"Consola global"` | `"Global Console"` |
| `tests/shell-two-real-projects.test.mjs` | 58 | `AIW_CONSOLE_ONLY` | ídem |
| `tests/shell-two-real-projects.test.mjs` | 116 | `doesNotMatch(/Consola global/)` | `/Global Console/` |
| `tests/shell-two-real-projects.test.mjs` | 150 | `match(/Consola global/)` | `/Global Console/` |

**Ninguna aserción cambió de significado.** El marcador sigue sirviendo para lo mismo, y se
verificó que lo hace: `"Global Console"` aparece **0 veces** en los seis archivos del
`.project/` de cantu-studio, igual que `"Consola global"` antes.

---

## BLOQUE G — Verificación en DOM

Consola levantada (`node project-console/serve.mjs`, `PC_PORT=8799`) y medida en el DOM real:

- **Conteos:** `2 objectives / 16 phases / 35 runs`. Sin cambio.
- **Objetivos en el árbol:** `Project Console` · **`Global Console`**.
- **Las 13 fases de O4** renderizan sus títulos nuevos (`Stage 0 — …` … `Global console
  prototype (RETIRED by D-048 — history)`).
- **Barrido de español sobre TODO lo que la consola pinta:** **0** caracteres acentuados,
  **0** palabras españolas. Ni un `Tramo`, ni un `Consola global`.
- **Cola y árbol:** ambos pintan; el `full_description` de 4 252 caracteres llega entero al
  cajón de detalle (medido: 4 252 caracteres en `p.v3-detail-description`), dentro de su
  `<details>` plegado, que es como estaba.
- **Carriles ausentes como hoy:** `#roadmap-lane-slot` vacío, **0** chips de carril o barrier.
- **cantu-studio sin regresión:** `7 objectives / 28 phases / 53 runs`, su árbol propio, y
  **cero** fuga de marcadores de aiw-console tras el cambio de proyecto.

> **Efecto lateral observado y declarado:** abrir la consola dispara su **auto-sync de
> historia**, que re-emite `.project/git_history.json`. Es una ruta de escritura de la consola
> operando sobre su **propia carpeta derivada**, y es su función. Al terminar se re-emitió
> `.project/` completo con el emisor para dejarlo coherente. Nada fuera de `.project/` de
> aiw-console se escribió.

---

## BLOQUE H — REPORTADO, NO CAMBIADO

### H.1 `closeout_result: "descartado_por_D-048"` — **el token, con recomendación**

Sigue **exactamente como estaba**, en `RUN-CONSOLE-PROTOTIPO-CONSOLA-001`. Es un token, no
prosa, y el encargo lo excluye explícitamente. Los `closeout_result` del roadmap son hoy:

| Valor | Runs |
|---|---:|
| `completed_successfully` | 22 |
| `descartado_por_D-048` | **1** |

**Por qué existe.** Lo explica el propio run, y su explicación sigue siendo cierta tras la
traducción: no hay token `descartado` en el vocabulario cerrado de `status` (CONTRATO §11.a:
`planned`/`active`/`blocked`/`completed`), así que el retiro viajó en `closeout_result`, que es
**string libre** por CONTRATO §14.

**Recomendación a la cabina — cambiarlo a `discarded_by_D-048`.** Tres razones:

1. **Es el único token en español que queda en el archivo**, y el único valor de
   `closeout_result` que no está en inglés. Tras este encargo desentona solo.
2. **`§14` lo permite sin enmendar nada**: el campo es string libre, no enumeración. No hay
   vocabulario cerrado que romper, ni validador que compare contra un literal — se comprobó:
   ningún test ni ninguna ruta de código fija ese valor.
3. **La referencia `D-048` se conserva intacta**, que es lo único que el token tiene que
   preservar.

**Pero NO se cambió aquí, y esa es la decisión correcta:** un token es identidad de dato, no
prosa, y este encargo acota su mandato a la prosa. Cambiarlo es un acto aparte, del tamaño de
una operación `set-status` con `closeoutResult`, y lo decide la cabina. Si decide que no,
también está bien: el run explica por qué el token existe, y esa explicación ya está en inglés.

### H.2 Contenido que parece equivocado — se REPORTA, no se corrige

El encargo prohíbe mejorar, resumir, ampliar o corregir el contenido. Se transcribió lo que
dice, **incluido esto**, que quedó traducido fielmente aunque hoy sea falso:

> **`RUN-CONSOLE-ESCRITURA-ROADMAP-HISTORY-001` (status `planned`) afirma:
> "`aiw-console/tools/roadmap/` DOES NOT EXIST".**
>
> **Existe.** Contiene `roadmap-core.mjs` y `roadmap-plan.mjs` — y **son el motor con el que se
> ejecutó este encargo.** La afirmación era cierta el 2026-07-25, cuando se midió; dejó de
> serlo cuando `O4.P12` se entregó (hay record: `ESCRITURA-CONSOLA-GLOBAL-O4-P12.md`).

Alrededor de eso hay un desfase mayor, que se nombra sin tocarlo: **el roadmap está por detrás
de los records.** Existen en disco siete records posteriores a la última escritura del canónico
(`ESCRITURA-CONSOLA-GLOBAL-O4-P12.md`, `ACABADO-PARIDAD-O4-P13.md`,
`AGRUPACION-DOCS-POR-RUTA-Y-DOCS-DE-CANTU.md`, `ANCHO-DE-SUBVISTAS-CAUSA-RAIZ-FLEX.md`,
`CARRILES-Y-BARRIERS-ROADMAP.md`, `CORRECCIONES-QA-CARRILES-Y-REGLA-DE-IDIOMA.md`,
`MIGRACION-CANTU-A-CARRILES.md`) sin run que los ampare, y `O4.P12` sigue `planned` con su
trabajo entregado. **Es exactamente el desfase que el cierre de registro del 2026-07-25 existía
para cerrar, vuelto a abrir.** Ponerlo al día es un encargo aparte y del tamaño de aquél.

### H.3 Lo que quedó explícitamente fuera

No se tocó: el roadmap de cantu-studio, `DECISIONES.md`, `CONTRATO.md`, los handoffs, ningún
record existente. **No se renombró ningún archivo de record** aunque su nombre esté en español
(`MIGRACION-CANTU-A-CARRILES.md`, `ACABADO-DOCS-Y-EMISOR-GIT-HISTORY.md`, …): son rutas reales
en disco, y varias están citadas desde dentro del propio roadmap traducido — renombrarlas
rompería esas citas. No se migró aiw-console a carriles. No se aplicó ningún barrier. No se
emitió para `aiw` ni para cantu-studio. **No se ejecutó git en ninguna forma que escriba.**

---

## BLOQUE I — Cómo se escribió, para que se pueda repetir

1. **Respaldo** del canónico, cotejado por md5 contra el original antes de tocar nada.
2. **Medición del motor**: `set-text` existe y cubre los cinco campos del encargo
   (`roadmap-core.mjs:807-851`); `batch` acepta `set-text` (`roadmap-plan.mjs:173`).
   **No hizo falta añadir operación al motor.**
3. **Dry-run**: `planEdit` con **un `batch` de 37 sub-ops**, serialización a un archivo aparte,
   canónico intacto (md5 comprobado sin cambio).
4. **Inventario de preservación sobre el plan**, antes de escribir. 0 discrepancias.
5. **Escritura**: `applyPlan` → `applyWrite` (respaldo + temp + `fsync` + rename atómico), con
   **re-lectura del archivo escrito y `checkInvariants` como autoridad**, y rollback automático
   si hubiera fallado. `written=true`, `rolledBack=false`.
6. **Re-verificación en disco**: inventario, invariantes, esqueleto, conteos y roundtrip
   byte-idéntico contra el respaldo.
7. **Re-emisión** de `.project/` con el emisor de siempre.
8. **Suite**, **DOM** y **huellas** de cantu-studio y aiw.
