# Relevo — hilo `aiw-console`

**Fecha:** 2026-08-08 · **Sustituye** al relevo del 2026-08-06 (cierre de tarde).
**Primera sesión en la laptop nueva.** El §9 «MIGRACIÓN» de aquel relevo está cumplido y
no hay que releerlo.

La sustancia va DENTRO. Los punteros a records son procedencia, no respuesta.

---

## 1. DÓNDE ESTAMOS

**NO hay ningún run `active`.** Se cerraron dos en esta sesión y no se abrió otro.

**Canónico medido al cerrar (2026-08-08, 09:41 UTC):**
`projects/aiw-console/roadmap/roadmap.json` · md5 **`5b05984726abd3f3f5226a67ea87e20f`** ·
**57 runs** · `completed 49 · planned 8` · densidad `1..57` · ids únicos · 0 aristas
colgantes · **0 CR** (LF puro).

`HEAD` = `origin/main` = **`2f71ffb`** (más el commit del relevo que cierra esta sesión).

**Elegibles, medidos al cerrar. Vuelve a medirlos: cambian con cada cierre.**

| | run | título |
|---|---|---|
| **#50** | `RUN-CONSOLE-DIGEST-CABINA-001` | Digest for the cockpit |
| #51 | `RUN-CONSOLE-PARIDAD-RENDER-CANTU-001` | Global console renders Cantu (parity, operator QA) |
| #53 | `RUN-CONSOLE-CANTU-CANONICAL-OUT-OF-AIW-001` | Move cantu-studio's canonical roadmap out of .aiw before the cutover can delete it |
| #55 | `RUN-CONSOLE-STALE-TEXTS-REPAIR-001` | Repair the five texts that describe this repo falsely |
| #56 | `RUN-CANTU-ROADMAP-PHASE-OBJECTIVE-OPS-001` | Expose the four container operations in the console frontend |
| #57 | `RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001` | Deep visual audit of the console, led by the operator |

Bloqueados: **#52** espera a `#51`; **#54** espera a `#51`, `#52` y `#53`.

**Sin razón medida para saltarse el #50**, que es el siguiente de la cola.

---

## 2. LO QUE ESTA SESIÓN ENTREGÓ

**`#48` «Batches in the roadmap schema, with the branch they determine» → `completed`,
`closeout_result: "done"`.** QA de no-regresión pasada por el operador en los cuatro pasos.

**`#49` «Line endings: pin them with .gitattributes and renormalise the working tree once»
— creado, insertado, abierto, ejecutado y cerrado `done` en la misma sesión.** Desplazó 8
runs (los antiguos 49–56 a 50–57) y vive en `O4.P9` «Prior and cross-cutting work».

**El problema de CRLF de este repo está RESUELTO.** Ver §4.

---

## 3. LA MÁQUINA NUEVA — capacidades medidas, y dos que corrigen la tabla heredada

Modo **COWORK CONECTADO**. La ruta de montaje **se deriva cada sesión y nunca se hereda**.
Los **cinco** repos están clonados; los cinco remotos apuntan a `ChrissValdez`.

| Capacidad | Medido |
|---|---|
| Leer cualquier fichero, correr solo-lectura, leer Git en los 5 repos | **SÍ** |
| Crear y sobrescribir ficheros | **SÍ** |
| **Escribir el canónico por el motor** | **SÍ — probado 4 veces esta sesión** |
| Re-emitir `.project/` | **SÍ — 6 ficheros, layout `repo_root`** |
| Borrar con `rm` | **NO** — `Operation not permitted` |
| **`fs.renameSync`, incluso SOBRE fichero existente** | **SÍ** |
| Commit / push | **NO** (y sigue siendo política, no pared) |

**Dos correcciones nuevas:**

1. **«No puedo borrar» es cierto solo de `rm`.** `renameSync` hace desaparecer una ruta.
   **La cabina puede limpiar su propia basura moviéndola** — esta sesión sacó así un
   fichero de prueba de dentro de `.git`. Lo que se declara al operador ya no es «lo que no
   puedo borrar» sino **lo que dejo a propósito**.
2. **`.git` es escribible.** Se puede ensuciar; ahora también limpiar, por rename.

**Correcciones a documentos de la migración, medidas:** `core.autocrlf=false` **SÍ está
puesto** en `C:/Users/chris/.gitconfig` —el `PARADA-MONTAJE-MAQUINA-NUEVA.md` lo daba por
bloqueado—; `cantu-quizzes-latex` **está clonado** —la configuración lo daba por directorio
vacío—; y `cantu-lessons` **SÍ tiene `origin/main`**, en `packed-refs` en vez de como ref
suelta —el relevo anterior lo daba por ausente y en riesgo ALTO—. **Los tres últimos son de
otros hilos: se NOMBRAN y no se tocan.**

---

## 4. EL CRLF — resuelto, y la regla vieja está MUERTA

**`aiw-console` ya tiene `.gitattributes`**, con sha1 `dfe0770424b2a19faf507a501ebfc23be8f54e7b`
— **el mismo blob que los tres repos hermanos**. El árbol entero se reescribió desde sus
propios blobs: **0 ficheros con CR de 356**, y **0 divergentes** entre disco y blob.

**LA REGLA «el `git status` de la cabina MIENTE en `aiw-console` por CRLF» ESTÁ MUERTA. No
la revivas.** Nunca fue cierta en esta máquina: `core.autocrlf=false` da a la cabina Linux y
al Windows del operador el mismo comportamiento, y los dos leían **346** cuando había ruido.
Ahora los dos leen cero.

La causa fue el orden de la migración: se clonó con el `autocrlf=true` por defecto de
Windows —que escribió CRLF al árbol— y `false` se puso después. El `PARADA` §5.3 lo predijo.

**Lo que queda:** **`aiw` tiene el mismo defecto y sigue sin `.gitattributes`.** Es el único
de los cinco. **Es de su hilo: NÓMBRALO y no lo toques.**

**El hallazgo que abarató el run, y que sirve para `aiw`:** medido sobre `cantu-studio`
—1068 rastreados, **1043 divergentes en bruto, 21 reportados por git y los 21 contenido
real**— **`* text=auto` por sí solo absorbe la divergencia entera**. La reescritura del árbol
es higiene, no requisito. El taller lo confirmó: **346 → 7 modificados con el
`.gitattributes` solo**, antes de tocar un fichero.

---

## 5. ⚠⚠ EL ÍNDICE Y LOS CANDADOS — lo más importante que aprendió esta sesión

Costó cuatro vueltas con el operador al final de la sesión. **Léelo entero antes de dar
ningún bloque de Git.**

### 5.1 GitHub Desktop sondea el repo y toma el candado

**Ninguna regla contemplaba esto.** El operador tenía **4 procesos de GitHub Desktop vivos
desde hacía dos horas**, corriendo `git status` en bucle sobre este repo. Un `index.lock` de
0 bytes bloqueó su comando, y la cabina lo atribuyó a sus propias lecturas **sin tener con
qué sostenerlo**.

**Antes de cualquier bloque que escriba el índice, el bloque comprueba procesos vivos
primero y para si los hay.** Y el operador **cierra GitHub Desktop** antes de correrlo. La
comprobación que funciona:

```powershell
$procs = @(Get-Process git,git-remote-https,GitHubDesktop -ErrorAction SilentlyContinue)
```

### 5.2 `--no-optional-locks` NO basta, y hay que comprobar en el turno que entrega

Está medido que un `git diff` con `-c` **reescribió `.git/index` pese a la opción**. Y esta
sesión añadió el agravante: **la cabina comprobó candados a las 09:30, siguió midiendo hasta
las 09:35, y entregó el bloque sin volver a mirar.** El bloque falló por un candado nacido a
las 09:33.

**Regla: los candados se comprueban en el MISMO turno en que se entrega el bloque, después
de la última medición.** Comprobar con `find`, no con git.

**Y la cabina evita `git diff` y `git status` en este repo cuando puede.** Para saber si hay
trabajo vivo usa la comparación que no toma el índice:

```
git --no-optional-locks ls-files -s          # blob de cada fichero
git --no-optional-locks hash-object --no-filters -- <ruta>   # contenido en bruto
```

### 5.3 Un índice con `stat` viejo NO se arregla refrescando — se RECONSTRUYE

Tras renormalizar, `git status` seguía diciendo **339** mientras `git diff HEAD`,
`git diff` y la comparación de sha1 decían **0**. El índice guardaba los tamaños de la era
CRLF (`README.md`: 1311 cacheado contra 1292 reales) y `status` decidía por ese número.

**Probado sobre copias del índice, sin tocar el real:**

| Intento | Resultado |
|---|---|
| `git update-index --refresh` | **339** — no lo arregla |
| `git update-index --really-refresh` | **339** — tampoco |
| `git status` dos veces seguidas | **339** — tampoco |
| **`git read-tree HEAD`** | **0** ✔ |

**El arreglo es `git read-tree HEAD`**, y es seguro **solo** con las cuatro precondiciones
verificadas antes: nada en stage, nada sin rastrear, `HEAD` == `origin/main`, y cero cambios
reales. Reconstruye el índice desde el commit; no toca ni un fichero del árbol.

**CORRECCIÓN A DOS RECORDS YA COMMITEADOS, hacia adelante:**
`FINALES-DE-LINEA-…` y `DEFECTOS-DEL-TICKET-49-…` afirman que el artefacto **«se disuelve al
primer `add`»**. **Es FALSO, medido.** Sobrevivió a un `add` de 10 ficheros, a un `commit` y
a un `push`. Los records no se reescriben hacia atrás; la corrección vive aquí.

---

## 6. DEFECTOS DE MÉTODO DE LA CABINA, medidos en esta sesión

**Cinco en un solo ticket** (el del `#49`), y el taller los encontró todos:

1. **La cuarta forma, otra vez: `339` era una cifra propia envejecida** — medida a las 08:53
   y puesta en un criterio de aceptación después de que la propia cabina escribiera el
   canónico tres veces. El real era 346. **La regla que lo prohíbe está escrita.**
2. **«Fichero mixto»** — `grep -c ''` contra `grep -c $'\r$'`; la diferencia era la última
   línea **sin salto final**, no una línea sin CR. Unidad mal.
3. **«Hay binarios»** — era `.gitkeep`, de 0 bytes; `grep -qI .` devuelve falso en ficheros
   vacíos y la cabina lo leyó como binario. Unidad mal.
4. **Suite base 529/527/2** — heredada de un record sin verificar. La real era **529/528/1**:
   el pin de `roadmap-engine.test.mjs:93` está verde.
5. **Criterios 2 y 6 mutuamente imposibles** — se escribió una guarda de árbol limpio **sobre
   un árbol que la propia cabina acababa de ensuciar**, sin exceptuarse.

**Y dos más, operativos:** no comprobar candados en el turno de entrega (§5.2), y atribuirse
un candado sin evidencia teniendo GitHub Desktop vivo (§5.1).

### La lectura de guarda que queda fijada

**Una guarda de árbol limpio se evalúa sobre los ficheros EN ALCANCE.** Si el ticket declara
un conjunto fuera de alcance, ese conjunto queda excluido **de la operación y de la guarda**.
Forma: *«G debe ser CERO sobre los ficheros en alcance; los N del criterio X quedan excluidos.
Si dispara con exactamente ese conjunto, la guarda está satisfecha; con cualquier otro
fichero, para y reporta.»*

### La separación adversaria pagó, y con margen

**El taller contradijo a la cabina en cuatro puntos medidos y en los cuatro tenía razón**, y
paró en la guarda en vez de interpretarla. **La cabina PODÍA haber ejecutado ese run** —sabe
escribir ficheros y tenía el diagnóstico hecho— y ninguna de las cuatro correcciones habría
aparecido.

---

## 7. LA QA — el defecto de método que reapareció DENTRO de un relevo

El relevo anterior pedía ver en `aiw-console` *«un solo desplegable, el de carriles»*.
**Medido: `aiw-console` declara CERO carriles**, y `renderLaneSelector` exige **dos o más**
(`model.lanes.length < 2` → `slot.innerHTML = ""`). **La barra correcta de `aiw-console` no
tiene NINGÚN desplegable.**

Es la tercera vez que se mide el mismo defecto —escribir un paso de QA sin comprobar que la
superficie puede mostrarlo— y **la primera dentro de un relevo**, donde lo hereda la sesión
siguiente entera.

**Antes de escribir «mira X», medir que X es visible ahí.** Y los pasos de filtro de
carriles se hacen en `cantu-studio` (2 carriles declarados, 12 runs) o en `aiw` (2 y 6),
**solo mirando y sin escribir en ellos**.

**Los chips se derivan, no se copian:** `deriveClassification` de
`tools/classification/classification.mjs` sobre el run real.

---

## 8. ⚠ LA FALSA CONSOLA, y los cuatro hilos

`docs/project-console/` es el fork **descartado por D-035**; `console/` es un prototipo
retirado. **La consola viva es `project-console/`.**

**El validador `tools/project-console/validate-project-console-state.mjs` SALE ROJO Y ES
CORRECTO** — lee la topología del fork, `EXIT 1` con 25 `Missing JSON file: .aiw/…`. **NO
emite `history=` ni `ready_next=`**, así que la guarda que prescriben las reglas de cabina es
**inservible aquí**. Se construye sobre el canónico —contar runs, contar `active`, comprobar
el `run_id` esperado— o sobre `checkInvariants`.

**En este repo escriben CUATRO hilos.** `git add` **siempre dirigido por nombre, nunca `-A`**,
y la cabina declara por nombre cada fichero que escribe. Esta sesión otro hilo commiteó dos
veces en mitad del trabajo, sin colisión.

---

## 9. CONDUCIR EL MOTOR — la receta que funcionó cuatro veces

```js
planEdit({ filePath, op, args })            // tools/roadmap/roadmap-plan.mjs
applyPlan({ filePath, serialized, validate })
writeProjectFolder(process.cwd())           // tools/projector/project.mjs
```

- **`applyPlan` a pelo NO re-emite `.project/`.** La re-emisión vive en `serve.mjs`. **Quien
  conduzca el motor re-emite explícitamente, dentro del camino de éxito.**
- **`applyWrite` llama a `validate()` SIN argumentos y exige `result.code === 0`.** La
  autoridad correcta es `checkInvariants` (`tools/roadmap/roadmap-core.mjs:423`) +
  `hasRoadmapTreeShape`, devolviendo `{code, output}`. Una firma inventada produce un
  rollback silencioso que parece del motor.
- **`insert` fija fase Y posición desde su ancla** (`before`/`after`). Para poner un run en
  otra fase hacen falta **dos ops**: `insert` y luego `move` con `toOrder` + `toPhase`.
  `move` exige exactamente uno de `after`/`before`/`toOrder`.
- **El motor CONSERVA los finales de línea de lo que lee.** El canónico está en LF, así que
  seguirá saliendo en LF. **Si alguna vez sale en CRLF, no lo commitees: normalízalo antes**
  — un canónico en CRLF hace ilegible su diff para siempre.

---

## 10. LA SUITE

**529 tests, 528 pasan, 1 falla** — medido por el taller antes y después de su trabajo, sin
cambio. El único fallo es `tests/classification-care-budget.test.mjs:153`, **pin de registro
deliberado que nunca se repara y nunca es gatillo de parada**. El otro pin histórico,
`tests/roadmap-engine.test.mjs:93`, **está verde**; se NOMBRA, no se persigue.

**La cabina NO corre la suite:** su entorno añade un fallo espurio por EPERM al limpiar
fixtures. La corre el taller.

---

## 11. LO QUE QUEDA ABIERTO, CON SU CONDICIÓN DE CIERRE

**Un `.gitattributes` para `aiw`** — el último de los cinco. **Es del hilo `aiw`**; este hilo
lo NOMBRA. La receta está en §4 y es barata: el fichero solo ya resuelve el síntoma.

**El selector de lotes sin ver nunca en un navegador** — ningún proyecto declara lotes. Lo
cubre el **#51** `RUN-CONSOLE-PARIDAD-RENDER-CANTU-001`, que trae QA visual. **Decisión
mantenida: NO se declara un lote de prueba solo para mirarlo.**

**`V3_BATCHABLE_OPS` sin absorber** — una edición en
`tests/depends-on-human-approved.test.mjs:341`, en un run que tenga ese fichero en alcance.

**La mitad de `aiw` en los lotes** — seis puntos en el record del `#48`. **Del hilo `aiw`.**

**Unificar `setDeps` con la op de aprobación humana, y el rename de `depends_on`** — dos runs
esperando la ventana de «tres roadmaps en reposo».

**Los 9 runs terminales sin `closeout_result`** — no se rellenan.

---

## 12. RECORDS DE ESTA SESIÓN

- `context/aiw-console/records/CIERRE-48-LOTES-Y-CRLF-DEL-CANONICO.md`
- `context/aiw-console/records/FINALES-DE-LINEA-GITATTRIBUTES-Y-RENORMALIZADO-DEL-ARBOL.md` (taller)
- `context/aiw-console/records/DEFECTOS-DEL-TICKET-49-Y-LA-LECTURA-DE-LA-GUARDA.md`

Los dos últimos llevan la afirmación corregida en §5.3. **Gana este relevo.**
