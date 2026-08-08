# CIERRE DEL #48 — y el CRLF del canónico

Hilo `aiw-console`. Sesión del **2026-08-07 / 2026-08-08**, primera **en la laptop nueva**.
Cierra `RUN-CONSOLE-BATCHES-001` (`queue_order` **48**) «Batches in the roadmap schema, with
the branch they determine» con `closeout_result: "done"`, tras QA de no-regresión del
operador. Y deja medido por qué el canónico viajaba en CRLF, que es un hallazgo de la
migración, no del run.

> **Alcance de escritura de la cabina.** Dentro del repo: `roadmap/roadmap.json` (por el
> motor, más una normalización de finales de línea) y los **6** ficheros de `.project/`
> (re-emisión). Fuera de todo repo: dos respaldos en `_backups\` y tres sondas en
> `_scratch\`. **No se ejecutó Git en ninguna forma que escriba.** No se tocó ningún otro
> fichero del repo, ni `docs/project-console/`, ni `console/`, ni la suite.

---

## 1. EL ARRANQUE EN MÁQUINA NUEVA — la tabla heredada, corregida

Ruta de montaje **derivada, no heredada**. Los **cinco** repos están clonados, los cinco
remotos apuntan a `ChrissValdez`.

**Capacidades probadas una por una, no supuestas. Modo COWORK CONECTADO.**

| Capacidad | Resultado medido |
|---|---|
| Leer cualquier fichero, entero | **SÍ** |
| Comandos de solo lectura | **SÍ** — Node v22.22.3 |
| Leer Git en los cinco repos | **SÍ** |
| Crear y sobrescribir ficheros | **SÍ** |
| **Borrar con `rm`** | **NO** — `Operation not permitted` |
| **`fs.renameSync`, incluso SOBRE fichero existente** | **SÍ** |
| Crear dentro de `.git` | **SÍ** |
| **ESCRIBIR EL CANÓNICO por el motor** | **SÍ — probado en esta sesión (§4)** |

**Tres correcciones medidas, y las dos primeras son nuevas:**

1. **«No puedo borrar» es cierto solo de `rm`/unlink.** `renameSync` hace desaparecer una
   ruta. La cabina puede por tanto **limpiar su propia basura moviéndola**, y lo hizo:
   colapsó tres sondas de `_scratch` en una y sacó de `.git` un fichero de prueba que
   había dejado. La higiene de «declara lo que no puedes borrar» se relaja: ahora se
   declara **lo que se deja a propósito**.
2. **La escritura del canónico deja de estar declarada como NO PROBADA.** El
   temporal-y-renombrado no choca con la prohibición de borrar.
3. **Dos hallazgos de otros hilos, NOMBRADOS y no corregidos:** `cantu-quizzes-latex`
   **está clonado** (el relevo y la configuración lo daban por directorio vacío), y
   `cantu-lessons` **SÍ tiene `origin/main`**, en `packed-refs` en vez de como ref suelta
   — el relevo lo daba por ausente y en riesgo ALTO.

---

## 2. ⚠ EL CRLF — la regla vigente es FALSA en esta máquina

**El operador vio 316 cambios pendientes en GitHub Desktop y preguntó. Verificado: son
finales de línea, y el contenido modificado es CERO.**

| Medición (2026-08-08, 07:35–07:39 UTC) | Valor |
|---|---:|
| Ficheros rastreados | 351 |
| Cuyo contenido en disco diverge del blob (hash en bruto, sin caché ni filtros) | **346** |
| **Con cambio de contenido real** | **0** |
| Todo-CRLF en disco | 345 |
| Mixto (`design/AIW-Dashboard-prototype.html`) | 1 |
| Todo-LF → limpios | 4 |

**Los 4 limpios son exactamente los que escribió la cabina desde Linux**: los dos handoffs
y dos records. Todo lo que vino del clon de Windows está en CRLF.

**LA CORRECCIÓN, y toca una regla de la configuración de cabina.** El relevo §7 y las
reglas dicen que *«el `git status` de la cabina MIENTE en `aiw-console` por CRLF»*.
**En esta máquina es falso.** El `.gitconfig` global del operador lleva
`core.autocrlf=false`, que es el mismo comportamiento efectivo que el Linux de la cabina:

| | cabina (Linux) | operador (Windows) |
|---|---:|---:|
| `git status --porcelain` | **346** | **346** |
| `git diff --numstat --ignore-cr-at-eol` | **0** | **0** |

**Coinciden al dígito. Aquí no hay dos lecturas: hay una.** Lo que sigue siendo cierto es
que el recuento crudo no responde la pregunta útil; la que la responde es
`--ignore-cr-at-eol`. **La regla se corrige hacia adelante: en esta máquina la cabina no
tiene que declarar «cuál de las dos lecturas» — tiene que declarar que mide contenido, no
líneas.**

**LA CAUSA, y estaba predicha.** `core.autocrlf=false` **sí se aplicó** — el
`PARADA-MONTAJE-MAQUINA-NUEVA.md` lo listaba como bloqueado y está puesto en
`C:/Users/chris/.gitconfig`; **cuarta corrección**. Pero se aplicó *después* de clonar. Los
clones se hicieron con el `autocrlf=true` por defecto de Windows, que escribió CRLF al
árbol; luego `false` le dijo a git que no convirtiera nada. Blobs en LF, disco en CRLF,
nadie traduciendo. El propio PARADA §5.3 lo anticipó: *«el orden del criterio 5–6 ya no es
alcanzable cuando los cinco clones ya existen; rehacerlos, renormalizarlos o aceptarlos es
decisión del operador»*.

---

## 3. ⚠ DEFECTO DE LA CABINA — `--no-optional-locks` no impidió que un `diff` reescribiera el índice

Para probar un arreglo sin escribir nada, la cabina corrió
`git --no-optional-locks -c core.autocrlf=true diff`. **El `-c` no escribe config, pero el
`diff` refrescó y reescribió `.git/index`.**

**Efecto: `git status` y `git diff` pasaron a responder `0` en el entorno de la cabina, y
era mentira.** Los 346 seguían divergiendo; la caché de `stat` del índice decía «ya los
miré». Comprobado que era máscara y no arreglo: bastó un `touch` sobre un fichero para que
reapareciera.

**No alcanzó al operador:** su `git status` siguió dando 346, porque su Windows registra
metadatos distintos para el mismo fichero sobre el montaje e ignoró la caché.

**Dos lecciones, las dos hacia adelante:**

- **`--no-optional-locks` protege del candado, no del refresco del índice.** La garantía
  que el relevo §6 le atribuía es más estrecha de lo que decía.
- **En este repo la cabina no verifica limpieza con `git status`**, que puede estar
  enmascarado por ella misma, sino **comparando el hash del contenido contra el blob**.

---

## 4. EL CIERRE DEL #48

**QA del operador: los cuatro pasos PASAN.** No aparece selector de lotes en ningún
proyecto —que es lo correcto, porque ninguno declara lotes—, el selector de carriles de
`cantu-studio` aparece, filtra y vuelve, y el árbol y la Run Queue no regresaron.

**⚠ LA QA DEL RELEVO ERA FALSA Y HUBO QUE REESCRIBIRLA.** El §1 del relevo pedía ver en
`aiw-console` *«un solo desplegable, el de carriles»*. Medido: **`aiw-console` declara CERO
carriles**, y `renderLaneSelector` exige **dos o más** (`model.lanes.length < 2` →
`slot.innerHTML = ""`). **La barra correcta de `aiw-console` no tiene NINGÚN desplegable.**
Los pasos de filtro se reescribieron sobre `cantu-studio`, único proyecto registrado con
carriles (2 declarados, 12 runs) junto a `aiw`.

**Es la tercera vez que se mide el mismo defecto de método** —escribir un paso de QA sin
comprobar que la superficie puede mostrarlo— y la primera en que aparece **dentro de un
relevo**, donde tiene más alcance: un relevo lo lee la sesión siguiente entera.

**El cierre, conducido por el motor. Nunca se editó el JSON a mano.**

| | |
|---|---|
| Guarda de título | OK — `#48` = `RUN-CONSOLE-BATCHES-001`, `active`, título verbatim |
| Dry-run | `ok:true · errors:[] · warnings:[] · remap:[] · bytes:138322` |
| Validador del apply | `checkInvariants` + `hasRoadmapTreeShape` devolviendo `{code,output}` — **la autoridad de `serve.mjs`, no una firma inventada** |
| Apply | `written:true · rolledBack:false` |
| md5 antes → después | `75cd89d2…` → `3836b5be…` |
| Re-emisión `.project/` | **explícita** — `applyPlan` a pelo no re-emite. 6 ficheros, layout `repo_root` |
| Campos cambiados en TODO el canónico | **2, los dos del `#48`** |

Verificación campo a campo contra el respaldo: 56 runs, densidad `1..56`, `run_id` únicos,
0 aristas colgantes, 3 fases vacías sin cambio, **0 runs `active`**, `completed 48 ·
planned 8`, raíz idéntica.

**`closeout_result: "done"`, sin desviaciones**, y la razón se declara: el run entregó
schema, invariantes, transporte y superficie; la suite no ganó ni un fallo nuevo; y lo que
quedó fuera —`V3_BATCHABLE_OPS`, la mitad del kernel, el selector sin ver en navegador—
**estaba fuera de alcance desde el ticket**, no es trabajo caído. No es el caso del `#47`,
que cerró «with deviations» por absorber 9 sitios donde previó 10.

---

## 5. EL CANÓNICO VIAJABA EN CRLF — y por qué se normalizó

**El motor conserva los finales de línea de lo que lee.** El canónico venía del clon en
CRLF, así que salió en CRLF.

| | En disco | En `HEAD` | Peso del commit |
|---|---|---|---|
| `roadmap/roadmap.json` | **941 de 941 líneas con CR** | 0 con CR | **941 / 940** |
| los 6 de `.project/` | 0 con CR | 0 con CR | honestos |

**Commitearlo así habría volteado a CRLF el blob del fichero que leen las cuatro cabinas y
escribe el motor.** Desde ahí, cada diff suyo saldría de 940 líneas aunque cambiara un
campo, y cualquier clon futuro lo recibiría en CRLF.

**La cabina PARÓ y lo reportó** en vez de arreglarlo de paso, porque tocar el canónico
dentro de otra operación está prohibido y porque roza una decisión ya tomada por el
operador (`autocrlf=false`). **El operador autorizó normalizar.**

| | CRLF | **LF (final)** |
|---|---|---|
| Bytes | 138 322 | **137 381** |
| `JSON.stringify` del dato | — | **idéntico: cero cambio de contenido** |
| Líneas que difieren de `HEAD` | 1 881 | **5** |
| md5 | `3836b5be…` | **`b49f0ff4…`** |
| sha256 | — | `4b86fe457a9a2401224e1ebd06a1e2b4debbb5305c99ccbe12e255c26e94e3ea` |

Tras normalizar: `checkInvariants` **0 errores**, `hasRoadmapTreeShape` **true**, 56 runs,
`completed 48 · planned 8`, `#48` `completed` con `closeout_result: "done"`. Y las dos
lecturas de git **coinciden por fin**: `3 2` en crudo y `3 2` ignorando CR.

**Efecto que dura:** como el motor conserva lo que lee, **todas las escrituras futuras del
canónico salen ya en LF**. Los 6 de `.project/` quedaron en LF solos, porque el proyector
los reescribe desde cero.

**Aviso sobre el tamaño del diff de `.project/`:** `docs_index.json` (+416/−356) y
`git_history.json` (+105/−5) pesan mucho más que el cierre de un run. **No es trabajo de
este run: la re-emisión reindexa el repo entero** y absorbió los dos records que otro hilo
commiteó a las 01:13 y los commits nuevos. Es correcto que los absorba.

---

## 6. LO QUE QUEDA ABIERTO

**El run de CRLF para `aiw-console`.** Los 345 ficheros restantes siguen en CRLF con blobs
en LF. Ahora es más barato de lo que era: **el árbol no tiene trabajo vivo** —medido: índice
vs `HEAD` 0 divergentes, contenido real vs `HEAD` 0, sin rastrear 0—, así que renormalizar
no puede perder nada. La forma durable es `.gitattributes` con `* text=auto` más un
re-checkout. **`aiw` tiene el mismo problema y es de su hilo: se NOMBRA.** Los otros tres
repos ya tienen `.gitattributes`.

**El selector de lotes sigue sin verse nunca en un navegador** — ningún proyecto declara
lotes. Lo cubre el `#50`, que trae QA visual de consola. La decisión de no declarar un lote
de prueba solo para mirarlo se mantiene.

**`V3_BATCHABLE_OPS` sin absorber** — una edición en
`tests/depends-on-human-approved.test.mjs:341`, en un run que tenga ese fichero en alcance.

**La mitad de `aiw` en los lotes** — seis puntos en el record del `#48`. **Es del hilo
`aiw`.**

**Unificar `setDeps` con la op de aprobación humana, y el rename de `depends_on`** — dos
runs esperando la ventana de «tres roadmaps en reposo».

**Los 9 runs terminales sin `closeout_result`** — no se rellenan.

---

## 7. LO QUE ENTRA EN ESTE COMMIT, por su nombre

```
roadmap/roadmap.json
.project/roadmap.json
.project/snapshot.json
.project/docs_index.json
.project/git_history.json
.project/guardrails.json
.project/no_claims.json
context/aiw-console/records/CIERRE-48-LOTES-Y-CRLF-DEL-CANONICO.md
```

**En este repo escriben cuatro hilos: el `add` va dirigido por nombre, nunca `-A`.** La
sesión anterior registró que otro hilo usó `-A` y arrastró trabajo ajeno; salió bien de
milagro y la regla no se relaja.

**Fuera de todo repo, para que el operador los borre al cerrar:**

```
_backups\roadmap-aiw-console-antes-de-cerrar-48-20260808T0830Z.json
_backups\roadmap-aiw-console-post-cierre-48-CRLF-20260808T0845Z.json
_scratch\cerrar-48.mjs
_scratch\prueba-canonico-lf.json
_scratch\PRUEBA-ARRANQUE-20260807.txt
```
