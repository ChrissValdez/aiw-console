# FINALES DE LÍNEA — `.gitattributes` y el renormalizado del árbol

Hilo `aiw-console`. Sesión del **2026-08-08**. Cierra el trabajo de
`RUN-CONSOLE-LINE-ENDINGS-001` (`queue_order` **49**) «Line endings: pin them with
.gitattributes and renormalise the working tree once».

El `run_id` se **derivó** del canónico `roadmap/roadmap.json` recorriendo el árbol por
`queue_order === 49` → `.objectives[1].phases[14].runs[9]`. La guarda de título comparó
por igualdad exacta contra la cadena del ticket y **pasó**. `status: "active"`.

> **Alcance de escritura.** Dentro del repo: `.gitattributes` (nuevo, raíz), **339**
> ficheros de texto rastreados reescritos byte a byte desde su propio blob de `HEAD`, y
> este record. Fuera del repo: sondas en el scratchpad de sesión, incluidas **cuatro
> copias del índice** sobre las que se hicieron pruebas de refresco. **No se ejecutó Git
> en ninguna forma que escriba sobre el repositorio**: ni `add`, ni commit, ni push, ni
> `checkout`, ni `restore`, ni `--renormalize`. El índice real
> (`.git/index`, md5 `3c7f95306257ae51236d7001b6d49aef`) quedó **intacto**, verificado por
> md5 antes y después de cada prueba.

Entorno: Node **v24.19.0**, Git **2.55.0.windows.3**. Config efectiva del repo:
`core.autocrlf=false` y `core.eol=lf` (ambos de `C:/Users/chris/.gitconfig`, que pisan el
`core.autocrlf=true` del gitconfig del sistema), `core.filemode=false`.

---

## 1. MEDICIÓN DE ANTES — y cuatro cifras del ticket que el disco corrigió

Método del criterio 1, sin atajos: para cada ruta de `git ls-files -s`, el SHA-1 del
contenido **en bruto** del disco (`git hash-object --no-filters`, por lotes vía
`--stdin-paths`) contra el blob del índice. Clasificación de binario por el criterio de
Git: byte NUL en los primeros 8000.

| Métrica | Ticket | **Medido** |
|---|---|---|
| Rastreados | 352 | **352** ✔ |
| **Divergentes** (bruto vs blob) | 339 | **346** |
| Todo-CRLF | 339 | **339** ✔ |
| Todo-LF | — | **12** |
| **MIXTOS** | 1 | **0** |
| **Binarios** | — | **0** |
| Sin salto de línea (fichero vacío) | — | **1** |

**346 = 339 todo-CRLF + 7 todo-LF.** Los 7 en LF que divergen son exactamente
`roadmap/roadmap.json` y los seis de `.project/`: divergen por **contenido**, no por
finales de línea. Son el cierre del #48 y la inserción de este run, escritos por la cabina
y sin commitear.

**Las cuatro correcciones al ticket, confirmadas por el operador:**

1. **346, no 339.** La cifra del ticket envejeció dentro de la propia sesión de la cabina:
   se midió antes de escribir el canónico tres veces.
2. **`design/AIW-Dashboard-prototype.html` NO es mixto.** Disco: 167 831 B, **3067 CRLF,
   0 LF sueltos, 0 CR sueltos**, y no termina en salto de línea. Su blob: 164 764 B, 3067
   LF, 0 CRLF. La diferencia de tamaño es **exactamente 3067 bytes**, un CR por línea. Es
   un fichero todo-CRLF corriente. El «3067 de 3068» del ticket contaba la última línea
   sin salto como si le faltara el CR: la unidad estaba mal, no el conteo.
3. **CERO binarios.** El test de la cabina contó `context/cantu-quizzes-latex/records/.gitkeep`
   como binario porque está **vacío** (0 bytes). No hay un solo byte NUL en ningún fichero
   rastreado, ni en disco ni en blob.
4. **La suite era 529/528/1, no 529/527/2.** Ver §7.

**Barrido del lado de los blobs**, hecho aparte para no suponer nada: de los 352 blobs del
índice, **351 son LF puro y 1 está vacío**. Ningún blob es mixto, ninguno es binario,
ninguno tiene un CR suelto. Tampoco hay un solo CR suelto en el árbol de trabajo. El
defecto era estrictamente unidireccional: blobs en LF, árbol en CRLF.

**Inventario por extensión** (los 352, todos texto): `.md` 219, `.json` 64, `.mjs` 51,
`.html` 5, `.js` 4, `.css` 3, y uno de cada: `.bak`, `.cmd`, `.ps1`, `.txt`, más 2 sin
extensión (`.gitignore`, `.gitkeep`).

---

## 2. LA GUARDA DE SEGURIDAD — disparó, y por qué se procedió igual

Las tres comprobaciones, reportadas las tres:

| Guarda | Esperado | **Medido** |
|---|---|---|
| G1 — contenido vs `HEAD` ignorando finales de línea | CERO | **7** ✗ |
| G2 — blobs del índice vs `HEAD` | CERO | **0** ✔ |
| G3 — sin rastrear | solo `TINTA-…` | **solo `TINTA-…`** ✔ |

Los 7 de G1, con su `numstat`:

```
25	1	.project/docs_index.json
16	5	.project/git_history.json
 1	1	.project/guardrails.json
 1	1	.project/no_claims.json
19	10	.project/roadmap.json
34	15	.project/snapshot.json
17	8	roadmap/roadmap.json
```

Se **paró antes de reescribir un solo fichero** y se reportó. El conjunto que disparó G1
es, exacta y únicamente, el que el propio criterio 6 declara fuera de alcance: **el
criterio 2 y el criterio 6 no pueden cumplirse a la vez tal como estaban redactados**.

**Resolución del operador**, registrada aquí porque cambia la lectura de la guarda para
futuros runs: *G1 debe ser CERO sobre los ficheros EN ALCANCE; los 7 del criterio 6 quedan
excluidos de la reescritura Y de la guarda.* Fuera de ese conjunto, G1 es **cero sobre los
otros 345**. El propósito de la guarda —detectar trabajo vivo que una reescritura
destruiría— queda satisfecho: los 7 son trabajo vivo, pero están excluidos de la
reescritura, así que nunca corrieron peligro. La guarda **está satisfecha**; la
contradicción era del ticket.

---

## 3. PASO A — `.gitattributes` primero, y la medición intermedia

El hallazgo del operador sobre `cantu-studio` (1068 rastreados, 1043 con el contenido en
disco distinto del blob, y solo 21 reportados como modificados) reordenó el trabajo:
`* text=auto` **por sí solo** absorbe la divergencia entera. Se escribió el fichero y se
midió **antes** de tocar nada más.

| Medición | Antes de A | **Después de A** |
|---|---|---|
| `status --porcelain`, líneas ` M` | 346 | **7** |
| `status --porcelain`, total | 347 | **9** (7 ` M` + 2 `??`) |
| `diff HEAD --numstat --ignore-cr-at-eol` | 7 | **7** |

**La puerta del paso A pasó**: los modificados cayeron de **346 a 7**, y los 7 son
exactamente el conjunto excluido. Un solo fichero mató el síntoma completo.

---

## 4. EL `.gitattributes` ÍNTEGRO

```
# Auto detect text files and perform LF normalization
* text=auto
```

Dos líneas, **66 bytes**, en **LF**, con salto de línea final. `blob` SHA-1
`dfe0770424b2a19faf507a501ebfc23be8f54e7b`, md5 `05bdb783ee6514c8c072e47680af8ff7`.

**Sin líneas de binarios, porque no hay binarios** (§1). Es la única desviación de forma
respecto de lo que el criterio 4 anticipaba, y es una desviación por ausencia de sujeto.

**Comparación con los tres hermanos**, medida sobre el **blob**, no sobre la copia del
árbol: los `.gitattributes` de `cantu-studio`, `cantu-lessons` y `cantu-quizzes-latex` son
idénticos entre sí, blob `dfe0770…`, md5 `05bdb783…`. El de `aiw-console` es **byte a byte
el mismo**. Cuatro repos, un solo fichero.

**La diferencia que se introduce, y su razón:** las copias del árbol de los tres hermanos
están en **CRLF** (md5 `dcb240655dcbf79b8706d11c8c2a169c`) por la misma enfermedad que
este run repara. La de `aiw-console` se escribió en **LF**, igual que su blob. Es decir:
**LF en disco además de en el blob**. Ninguna otra diferencia.

---

## 5. PASO B — la reescritura desde los blobs

345 objetivos = 352 rastreados − 7 excluidos. Cada uno se volcó con los bytes exactos de
`git cat-file blob HEAD:<ruta>`, extraídos en un solo `cat-file --batch`, con la cabecera
`<sha> blob <size>` verificada por ruta y **relectura de comprobación** tras cada
escritura.

- **Reescritos: 339.**
- **Ya idénticos, no tocados: 6.**
- **Fallos: 0.** Ningún fichero se resistió.

No se usó búsqueda y reemplazo de CRLF, no se adivinó qué fichero era texto, y no se usó
`git checkout` ni `git restore`. El volcado del blob deja el disco igual a `HEAD` por
construcción, y por eso el `.html` de `design/` —el que el ticket creía mixto— quedó
correcto sin tratamiento especial: **167 831 B / 3067 CRLF → 164 764 B / 3067 LF**, blob
`HEAD` idéntico.

Los **6 que ya estaban bien** y no necesitaron reescritura:

```
context/aiw-console/records/CIERRE-48-LOTES-Y-CRLF-DEL-CANONICO.md
context/aiw-console/records/REPARACION-SELECTOR-DE-ICONO-NOTA-DESPLEGABLE-CANTU.md
context/aiw-console/records/RETIRO-DEL-ICONO-DERIVADO-DEL-COLOR-NOTA-DESPLEGABLE-CANTU.md
context/cantu-quizzes-latex/records/.gitkeep          (vacío, 0 bytes)
context/handoffs/aiw-console.md
context/handoffs/cantu-quizzes-latex.md
```

**Binarios: ninguno.** No hay lista que declarar. **Ficheros mixtos: ninguno.** No hay
caso especial que declarar.

---

## 6. MEDICIÓN DE DESPUÉS — y el artefacto de `git status`

Misma medición del criterio 1, repetida entera:

| Métrica | Antes | **Después** |
|---|---|---|
| Rastreados | 352 | **352** |
| **Divergentes** (bruto vs blob) | 346 | **7** |
| Todo-CRLF | 339 | **0** |
| Todo-LF | 12 | **351** |
| Mixtos / binarios | 0 / 0 | **0 / 0** |

**Divergentes fuera del conjunto excluido: CERO.** Los 7 que quedan son exactamente los 7
del criterio 6, y siguen en LF puro.

El árbol **no ganó ni perdió ficheros**: 352 antes y 352 después, con la lista de rutas
idéntica byte a byte. Todas las altas son **sin rastrear**, y son tres:

- **`.gitattributes`** — la única alta que el criterio 5 pide comprobar, y la única que
  cambia el comportamiento del repo.
- **este record** — el entregable del criterio 9, en LF.
- `TINTA-CONTRASTADA-SOBRE-ACENTO-CANTU.md` — de otro hilo, **intacta**, hash
  `a453bc6ebc616e175dafbb17a143a4e6dd3ca268`, 12 981 B, la misma de antes de empezar.

### El artefacto que hay que conocer antes de mirar `git status`

**Tras el paso B, `git status --porcelain` vuelve a reportar 346 modificados**, aunque el
contenido en disco sea byte a byte el de `HEAD`. **No es una regresión: es el caché de
`stat` del índice, que quedó viejo.** Cuatro mediciones independientes de *contenido* lo
desmienten:

| Comando | Resultado |
|---|---|
| SHA-1 en bruto vs blob (criterio 1) | **7** |
| `git diff HEAD --numstat` | **7** |
| `git diff --numstat` | **7** |
| `git diff-files -p -- README.md` | **parche vacío** |

Y la prueba directa sobre `README.md`: `hash-object --no-filters`, `hash-object --path` y
el sha del índice son **los tres `6f3566143370e9947de7c9aa51261b17f5b01e30`**. Lo que
falla es el `stat` cacheado: el índice guarda `size: 1311` (el tamaño en CRLF) frente a los
**1292** bytes reales en LF. `git diff-files --raw` lo delata devolviendo el sha de destino
a ceros, que es su forma de decir «sucio por `stat`, no calculé el hash».

Comprobado sobre **copias** del índice en el scratchpad, sin tocar el real: al refrescar la
entrada de `README.md` con `update-index --really-refresh`, el `size` pasa a **1292** y
`git status -- README.md` queda **limpio**. El refresco en bloque no llega a escribir
porque aborta con código 1 en cuanto una entrada «needs update», que es el mensaje normal
de «esto no lo voy a preparar solo».

**Para el operador:** el caché se asienta con el primer comando de Git que pueda escribir
el índice. Este run no lo ejecutó, por la prohibición de Git en modo escritura.

---

## 7. CONSOLA Y SUITE

**La consola arranca y sirve el roadmap.** El servidor toma el puerto por `PC_PORT`, no
por `--port`:

```bash
PC_PORT=8129 node project-console/serve.mjs
```

| Ruta | Código |
|---|---|
| `/project-console/index.html` | **200** |
| `/project-console/projects.json` | **200** |
| `/projects/aiw-console/roadmap/roadmap.json` | **200** |

El JSON servido trae los **57** runs con `queue_order`, y el de `queue_order` 49 responde
con el título exacto de este run. No hizo falta browser.

**La suite: `node --test` → 529 tests, 528 pass, 1 fail.** Idéntico antes y después de la
reescritura: **cero fallos nuevos**, que es el criterio.

- El pin `tests/classification-care-budget.test.mjs:153` **falla**, como debe.
- El pin `tests/roadmap-engine.test.mjs:93` **está en verde**, y ya lo estaba **antes** de
  tocar nada. Se NOMBRA, no se corrige y no es gatillo de parada: lo más probable es que
  el cierre del #48 moviera el valor que ese pin registra. La cifra de referencia del
  cierre del #48 era 529/527/2; **la real de hoy es 529/528/1**, y pasar de 2 fallos a 1
  no es ganar fallos nuevos.

---

## 8. LO QUE SE DEJA A PROPÓSITO

- **`roadmap/roadmap.json` y los seis de `.project/`.** No se tocaron. Verificado por hash
  en bruto: los siete tienen **el mismo SHA-1 y el mismo tamaño antes y después**, y los
  siete siguen en **LF puro, 0 CRLF**. Cambiar el status de este run y re-emitir
  `.project/` lo hace la cabina.
- **`context/aiw-console/records/TINTA-CONTRASTADA-SOBRE-ACENTO-CANTU.md`.** Sin rastrear,
  de otro hilo, intacta.
- **El repositorio `aiw`.** Tiene **el mismo defecto y tampoco tiene `.gitattributes`**
  (comprobado: el fichero no existe). Es de otro hilo. Se **nombra** y no se toca. Si se
  repara, `* text=auto` en su raíz debería bastar igual que aquí.
- **Los otros tres repositorios.** `cantu-studio`, `cantu-lessons` y `cantu-quizzes-latex`
  ya tienen su `.gitattributes` y sus árboles siguen en CRLF; no era el encargo tocarlos.
- **`docs/project-console/`** (fork descartado por D-035) y **`console/`** (prototipo
  retirado): sus ficheros se reescribieron desde sus blobs como cualquier otro texto
  rastreado. **No se editó su contenido.**
- **El índice de Git.** Sin refrescar, por la prohibición de escritura (§6).
