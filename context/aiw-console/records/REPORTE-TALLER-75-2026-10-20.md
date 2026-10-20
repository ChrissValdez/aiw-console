# Reporte del taller del `#75` — 2026-10-20

Run: `#75` `RUN-CONSOLE-STALE-TEXTS-REPAIR-002` «Repair the false texts the stale-texts run found».

**Verbatim.** Pegado por el operador en el chat de la cabina del hilo `aiw-console` y transcrito a
disco por la cabina en el mismo turno, sin editar.

---

Guarda coincide. Leo el reporte del taller 74 y corro la línea base.

Guarda cumplida; la suite base está corriendo en segundo plano. Ahora verifico en `serve.mjs` qué rutas aceptan POST de verdad (el despachador, no sólo los comentarios).

Línea base: 982 / 981 / 1, el fallo conocido de finales de línea. Ahora el resto de textos.

Textos (1)–(3) verificados: siguen falsos (cuatro rutas POST; `aiw` hoy resuelve `repo_root`). Miro (4)–(7).

Los siete siguen falsos en disco. Aplico las correcciones.

Ahora los tres textos de `context/README.md`.

Hechas. Corro la suite DESPUÉS y compruebo ASCII, finales de línea y que `serve.mjs` sólo cambió el comentario.

Suite igual después. Guardo la ficha de memoria y cierro.

# Run #75 `RUN-CONSOLE-STALE-TEXTS-REPAIR-002`: hecho, sin commitear

La guarda se cumplió. El run con `queue_order` 75 tiene el `run_id` y el `title` exactos y está `active`. Medí los siete textos en disco antes de tocarlos: los siete seguían siendo falsos y corregí todos. Los textos nuevos no dan conteos de rutas, claves, runs ni proyectos: dicen dónde vive cada cosa. Ninguno me obligó a cambiar código ni a tocar `roadmap/`, así que no hubo motivo para parar.

## 1. Los siete textos

**(1) `start-console.ps1` y `start-console.README.md`: seguía siendo falso.**
- Medí el despachador de `project-console/serve.mjs`. `matchWriteRoute` (`:1253-1267`) envía a cuatro manejadores con POST (`:465`, `:627`, `:789`, `:1059`) antes de llegar a la puerta de solo lectura (`:1271`).
- Las escrituras ocurren sólo dentro de esos manejadores. Al arrancar no se escribe nada.
- Un detalle del texto viejo también era falso: un POST a `.git` recibe 403, no 405. Por eso el texto nuevo dice que el método «se rechaza».

`start-console.ps1:10-12`
- Antes: «That server is strictly READ-ONLY. It answers GET and HEAD, replies 405 to every other method, has no edit endpoint, and opens no file for writing. Starting it cannot modify this repository or any project it reads.»
- Después (`:10-16`): «That server is NOT read-only. It serves every path with GET and HEAD, and it also has write routes: POST endpoints under /projects/<key>/__project-console/ that the console's own buttons call. Starting it writes nothing. A file changes only when a local request reaches one of those routes, and only inside the root of a project registered in project-console/projects.json; on any other path, every method other than GET and HEAD is refused. Which write routes exist, and what each one writes, is documented in the header of project-console/serve.mjs.»

`start-console.ps1:210`
- Antes: «Read-only console: the server answers GET and HEAD only and writes nothing.»
- Después (`:214`): «The server writes files only when you use a write action in the console; see project-console/serve.mjs.»

`start-console.README.md:34-38`
- Antes, bajo el encabezado «## Read-only»: «This console's server is read-only: GET and HEAD only, 405 for every other method, no edit endpoint, and no code path that opens a file for writing. Starting the console cannot change this repository or any project it reads.»
- Después (`:34-42`): el encabezado pasa a «## What the server writes» y el cuerpo es el mismo texto que el nuevo del `.ps1`, con las rutas en código.

Los dos ficheros siguen siendo ASCII puro, como exigen.

**(2) `context/aiw-console/CONTRATO.md`: seguía siendo falso.** `RUN_OPTIONAL_FIELDS` y la cifra no cuadran. El contrato se declara «norma viva»: un enunciado sobre el estado de hoy que caducó se corrige en su sitio, con un puntero. Por eso no hizo falta otra nota aparte ni tocar `roadmap/`.

`CONTRATO.md:713`
- Antes: «el conjunto admitido vigente es 9 + estas 2.»
- Después (`:713-717`): «el conjunto admitido vigente no es esa tabla: lo fija el motor, que lista las requeridas en `RUN_REQUIRED_FIELDS` y las opcionales en `RUN_OPTIONAL_FIELDS` (`tools/roadmap/roadmap-core.mjs`), y en ese orden las serializa. (Corregido el 2026-10-20 por `RUN-CONSOLE-STALE-TEXTS-REPAIR-002`: …)»
- Que las serializa en ese orden lo comprobé: `CANONICAL_RUN_KEY_ORDER` (`:266`) es la concatenación de las dos listas.

`CONTRATO.md:1228`
- Antes: «Con esto el run admite **11 claves** (las 9 de §10.a más estas dos opcionales), …»
- Después (`:1232-1237`): «Con esto `lane` y `barrier` entran entre las claves opcionales del run, … La lista vigente de opcionales, y su orden, vive en `RUN_OPTIONAL_FIELDS` (`tools/roadmap/roadmap-core.mjs`); este contrato no la cuenta. (Corregido el 2026-10-20 …)»

**(3) `project-console/serve.mjs:807-808`: seguía siendo falso.** `detectRootLayout` resuelve hoy `aiw` como `repo_root`; lo comprobé con los seis roots del registro. Sólo cambió el comentario, y `node --check` pasa.
- Antes: «A root no layout claims is the case an operator actually meets (today: the `aiw` kernel), so the refusal says which files were looked for and what was wrong with each.»
- Después: «When no layout claims the root, the refusal says which files were looked for and what was wrong with each, so the operator can see what the root is missing.»

**(4) `project-console/README.md:123`: seguía siendo falso.** Arriba hay cuatro rutas.
- Antes: «the server gained the two routes above,»
- Después (`:123-124`): «the server gained its first write routes (roadmap edit and history sync, both listed above),»
- Es un hecho del pasado que no envejece: el O4.P12 abrió esas dos rutas, como dice la cabecera de `serve.mjs:2`.

**(5) `context/README.md:65`: seguía siendo falso.** `handoffs/` no tiene `orquestacion.md`.
- Antes: un bloque con cuatro ficheros, `orquestacion.md` incluido.
- Después (`:67-71`): «handoffs/<hilo>.md el relevo de un hilo; el fichero lleva el nombre del hilo», más la frase «Qué hilos tienen relevo lo dice la carpeta `handoffs/`, no este README.»

**(6) `context/README.md:86` y `:89`: seguía siendo falso.**
- Antes: «Cada una contiene lo permanente de ese proyecto: su roadmap, su estado, su doctrina propia y sus `records/`.»
- Después: «Cada una contiene lo permanente que ese proyecto tenga: su estado, su doctrina propia, sus `records/`. El roadmap de un proyecto no vive aquí: es el canónico de su propio repo.»
- En la lista de `aiw/` añadí: «`roadmap_AIW_temp.md` (RETIRADO: lo dice su cabecera; el canónico es `aiw/roadmap/roadmap.json`)». Comprobé en disco los canónicos de `aiw`, `cantu-studio` y `cantu-quizzes-latex`.

**(7) `context/README.md:39-46`: seguía siendo incompleto.** Al árbol le faltaban `cantu-quizzes-latex/` y tres `.md` de la raíz.
- Antes: tres carpetas de proyecto con su nombre.
- Después: el árbol muestra la forma, con las líneas `*.md` («otros documentos transversales: no son de un solo proyecto») y `<proyecto>/`. Debajo dice: «Qué proyectos tienen carpeta aquí, y qué documentos hay en la raíz, lo dice la propia carpeta: este árbol da la forma, no la lista.»

## 2. Textos falsos nuevos (sin tocar)

- **`start-console.cmd:2`:** «the read-only multi-project console». Es la misma mentira del texto (1), pero en el `.cmd`, que no estaba en el alcance.
- **`project-console/README.md:34`:** «re-emits **all six** artifacts». `.project/` tiene siete, contando `reports_index.json`, y `serve.mjs:27` dice «ALL SEVEN».
- **`project-console/README.md:55`:** «Every other method on every other route still answers 405». Un POST a `.git` recibe 403; está en la tabla de la propia suite.
- **`project-console/README.md:1` y `:23`, y `serve.mjs:1-3`:** dicen «four write routes» o «EXACTLY FOUR». Hoy es verdad, pero es una cifra que envejece.
- **`context/README.md:91-96`:** las listas de ficheros por carpeta están incompletas. Por ejemplo, a `cantu-studio/` le faltan `PETICIONES-DE-LECCIONES.md`, `records/` y más.
- **`context/CLASIFICACION-DE-RUNS.md:3` y `context/PROCEDIMIENTO-DE-CLASIFICACION.md`:** dicen «los tres proyectos». El registro tiene seis.
- **`CONTRATO.md:709-710`:** dice que `category` y `batch` son «RESERVADAS… hoy no existen en ningún run». Pero `batch` es ya una opcional admitida por el `#48`, y `category` no está en el conjunto admitido. No medí si algún canónico lleva `batch`.

## 3. Suite

| | tests | pass | fail | salida completa |
|---|---|---|---|---|
| Antes | 982 | 981 | 1 | `C:\Users\chris\AppData\Local\Temp\claude\C--Users-chris-Documents-AIW-Workspace\6176b1ee-78c4-4fcd-acab-609f17a062d5\scratchpad\suite-antes.txt` |
| Después | 982 | 981 | 1 | `C:\Users\chris\AppData\Local\Temp\claude\C--Users-chris-Documents-AIW-Workspace\6176b1ee-78c4-4fcd-acab-609f17a062d5\scratchpad\suite-despues.txt` |

El fallo es el mismo antes y después: el test de finales de línea de `tests/roadmap-engine.test.mjs:93`, cuya aserción salta en `:98`.

Después de lanzar la suite cambié el redactado de una frase de `context/README.md`, la de «lo permanente que ese proyecto tenga». Ningún test lee ese fichero. No ajusté ningún test.

## 4. Lo que no hice

- `git status` muestra sólo los seis ficheros del alcance; `roadmap/` y `.project/` no aparecen.
- Las copias de los ficheros tal como estaban están en `C:\Users\chris\AppData\Local\Temp\claude\C--Users-chris-Documents-AIW-Workspace\6176b1ee-78c4-4fcd-acab-609f17a062d5\scratchpad\antes`.
- No usé git para escribir, no cambié el status del run ni re-emití nada.
- El CONTRATO pide anotar cada corrección en la decisión que la motiva. Eso es `DECISIONES.md`, fuera del alcance: le toca a la cabina.
