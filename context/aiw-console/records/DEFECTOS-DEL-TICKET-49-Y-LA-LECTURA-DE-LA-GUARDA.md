# DEFECTOS DEL TICKET DEL #49 — y la lectura de la guarda que queda fijada

Hilo `aiw-console`. **2026-08-08.** Record de CABINA, complementario al del taller
(`FINALES-DE-LINEA-GITATTRIBUTES-Y-RENORMALIZADO-DEL-ARBOL.md`), que es donde está la
sustancia del trabajo. Este registra **lo que la cabina escribió mal en el ticket**, porque
el taller lo midió y lo corrigió, y porque un ticket con cinco errores en una sola emisión
es un dato sobre el método, no sobre el run.

**El run cerró `done`.** Las desviaciones fueron del ticket, no del trabajo.

---

## 1. Los cinco defectos, con su clase

| # | Lo que el ticket decía | Lo que el disco dijo | Clase |
|---|---|---|---|
| 1 | 339 ficheros divergentes | **346** (= 339 todo-CRLF + 7 de la cabina) | **cuarta forma: cifra propia envejecida** |
| 2 | `design/AIW-Dashboard-prototype.html` es MIXTO | **No lo es**: 3067 CRLF, 0 LF sueltos, 0 CR sueltos | **unidad mal** |
| 3 | Hay binarios; el `.gitattributes` los necesita | **CERO binarios**. Los 353 rastreados son texto | **unidad mal** |
| 4 | Suite base 529/527/2 | **529/528/1**; el pin de `roadmap-engine.test.mjs:93` ya estaba verde | cifra heredada sin verificar |
| 5 | Criterio 2 exige G1 = 0; criterio 6 declara 7 ficheros fuera de alcance | **No pueden cumplirse a la vez** | contradicción interna |

### El 1 es la cuarta forma, otra vez, y es el peor

El `339` se midió a las **08:53**. Entre esa medición y la emisión del ticket, **la propia
cabina escribió el canónico tres veces** —insert, move, set-status— y re-emitió `.project/`
otras tres. Esas siete escrituras son exactamente los siete ficheros que faltaban.

**La regla que se saltó está escrita y es explícita:** las cifras que se derivan del estado
vivo y cambian con cada apertura o cierre **no se ponen en el ticket, ni siquiera para
verificar**. Se ordena medirlas y se dice que no se dan a propósito. La cabina la puso.

**Y el agravante es de esta modalidad:** una cifra medida de disco suena más creíble que
una recordada. El `339` era verdad a las 08:53 y mentira a las 08:58, y no había en el
ticket nada que lo delatara.

### El 2 y el 3 son la misma avería: contar bien y nombrar mal

- **El «mixto»** salió de `grep -c ''` (3068 «líneas») contra `grep -c $'\r$'` (3067). La
  diferencia no era una línea sin CR: era **la última línea, que no termina en salto**. El
  fichero es todo-CRLF corriente. La cifra era correcta; la unidad, no.
- **El «binario»** era `context/cantu-quizzes-latex/records/.gitkeep`, de **0 bytes**. El
  test `grep -qI .` devuelve falso sobre un fichero vacío, y la cabina leyó ese falso como
  «binario» en vez de como «vacío».

**Las dos son el defecto ya registrado de presentar un grep como una medición.** Aquí
costaron una pregunta del taller y una línea de `.gitattributes` que no existía.

### El 5 no se descubrió midiendo: se descubrió al ejecutar

La cabina redactó una guarda de seguridad **sobre un árbol que ella misma acababa de
ensuciar**, y no se exceptuó. El taller paró antes de reescribir nada, que es exactamente
lo que la guarda debía provocar, pero por la razón equivocada.

---

## 2. LA LECTURA DE LA GUARDA, fijada para futuros runs

**Una guarda de árbol limpio se evalúa sobre los ficheros EN ALCANCE, nunca sobre el árbol
entero, cuando el propio ticket declara un conjunto fuera de alcance.** Los ficheros
excluidos de la operación quedan excluidos también de la guarda.

Su propósito es detectar **trabajo vivo que la operación podría destruir**. Un fichero que
la operación no toca no puede perderse, así que exigirlo limpio no protege nada: solo
bloquea.

**Forma correcta, para copiar:** *«G1 debe ser CERO sobre los ficheros en alcance. Los N
que el criterio X declara fuera quedan excluidos de la reescritura y de la guarda; si G1
dispara con exactamente ese conjunto y ninguno más, la guarda está satisfecha. Si dispara
con cualquier otro fichero, para y reporta.»*

---

## 3. LO QUE SÍ FUNCIONÓ, y conviene registrarlo

**La separación adversaria pagó otra vez, y con margen.** El taller contradijo a la cabina
en **cuatro** puntos medidos y **en los cuatro tenía razón**, y paró en la guarda en vez de
interpretarla por su cuenta. Ninguna de esas cuatro correcciones habría llegado si el mismo
agente que escribió el ticket lo hubiera ejecutado — y la cabina PODÍA haberlo ejecutado:
sabe escribir ficheros y tenía el diagnóstico hecho.

**El reordenamiento A/B salió de una medición, no de una intuición.** Al contestar las dos
preguntas del taller, la cabina midió `cantu-studio` —mismo disco, mismo git, árbol en CRLF
y `.gitattributes` con `* text=auto`— y encontró **1068 rastreados, 1043 divergentes en
bruto, 21 reportados por git, los 21 contenido real**. Esa medición demostró que
**`* text=auto` por sí solo absorbe la divergencia entera**, y convirtió la reescritura del
árbol de requisito en higiene. El encargo se reordenó: `.gitattributes` primero con una
compuerta de medición, reescritura después y autorizada a parar sin perder el resultado.

El taller confirmó la compuerta: **346 → 7 modificados con el `.gitattributes` solo**, antes
de tocar un fichero.

**Y el `.gitattributes` quedó byte a byte idéntico al de los tres hermanos** — sha1
`dfe0770424b2a19faf507a501ebfc23be8f54e7b`, el mismo blob en `cantu-studio`,
`cantu-lessons` y `cantu-quizzes-latex`. Cuatro repos, un solo fichero. La única diferencia
es que en `aiw-console` está en LF también en disco.

---

## 4. EL ARTEFACTO DE `git status`, y de quién es

El taller reportó que tras la reescritura `git status` seguía diciendo 346 mientras
`git diff`, `diff-files` y la comparación de sha1 en bruto decían 7. Diagnosticó bien: es
la **caché de `stat` del índice**, que guarda el tamaño CRLF y hace que git marque el
fichero sin llegar a leerlo. Lo probó sobre **copias** del índice, sin escribir el real.

**Ese artefacto lo sembró la cabina**, no el taller: quedó registrado en el record del `#48`
que un `git diff` con `-c` reescribió `.git/index` **pese a `--no-optional-locks`**. El
taller heredó el índice sucio y no lo tocó, que era lo correcto.

**Se resuelve solo con el primer comando de git que escriba el índice.** De hecho ya se
resolvió: otro hilo commiteó `TINTA-CONTRASTADA-SOBRE-ACENTO-CANTU.md` a las 03:26 y con
ello refrescó el índice.

---

## 5. ESTADO MEDIDO AL CERRAR (2026-08-08, 09:27–09:31 UTC)

| | |
|---|---|
| Rastreados | **353** |
| Contenido en disco distinto del blob | **7** — el canónico y los seis de `.project/`, todos de la cabina y sin commitear |
| Ficheros con CR en el árbol | **0** |
| Canónico | 57 runs · `completed 49 · planned 8` · densidad `1..57` · ids únicos · 0 CR |
| Suite | 529/528/1, idéntica antes y después. Cero fallos nuevos |
| Consola | arranca con `PC_PORT` y sirve 200; el payload lleva los 57 runs |

**`projects/aiw` tiene el mismo defecto y sigue sin `.gitattributes`. Es de su hilo: se
NOMBRA y no se toca.** Es el único de los cinco repos que queda.

---

## 6. LO QUE ENTRA EN ESTE COMMIT, por su nombre

```
.gitattributes
roadmap/roadmap.json
.project/roadmap.json
.project/snapshot.json
.project/docs_index.json
.project/git_history.json
.project/guardrails.json
.project/no_claims.json
context/aiw-console/records/FINALES-DE-LINEA-GITATTRIBUTES-Y-RENORMALIZADO-DEL-ARBOL.md
context/aiw-console/records/DEFECTOS-DEL-TICKET-49-Y-LA-LECTURA-DE-LA-GUARDA.md
```

Los 339 ficheros renormalizados **no entran: no tienen nada que commitear.** Volvieron a
ser byte a byte iguales a sus blobs, así que su diff es vacío. Que `git status` los liste
es el artefacto del §4 y se disuelve al primer `add`.

**`add` dirigido por nombre, nunca `-A`:** en este repo escriben cuatro hilos.
