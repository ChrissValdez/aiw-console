# Relevo inaugural — hilo `cantu-quizzes-latex`

**Fecha:** 2026-08-04. **Es el primer relevo de este hilo: no hay sesión anterior.**

Lo escribió el hilo `aiw-console`, que dio de alta el proyecto. **A partir de aquí este
repositorio es tuyo**, y `aiw-console` no vuelve a escribir en él.

---

## 1. QUÉ ES ESTE PROYECTO

`projects/cantu-quizzes-latex` — quizzes y exámenes de Método Cantu en LaTeX, para la
Prueba de Aptitud Académica. **Autocontenidos: nadie los compila desde fuera.** No hay
relación con `cantu-studio` ni con `cantu-lessons`, y está medido: **0 ficheros del repo
referencian nada fuera de su propia unidad.**

**Por qué existe este proyecto y no otro:** su verificación natural es **la compilación
de LaTeX** — compila o no compila. Es la clase de verificación real que el sistema
necesita y que hoy no tiene ningún otro candidato. **Pero esa verificación aún no
existe**: ver §4.

---

## 2. ⚠ TOPOLOGÍA — lo que este hilo no puede leer

**El sync del Project está RECORTADO.** No llegan al knowledge:
`context/aiw-console/records/`, `tools/`, `tests/`, `project-console/`, `.project/`.
**Pedir sync no los trae.**

**Sí llegan:** `roadmap/roadmap.json`, `context/DECISIONES.md`, `context/handoffs/`,
`context/CLASIFICACION-DE-RUNS.md`, `context/PROCEDIMIENTO-DE-CLASIFICACION.md`,
`context/aiw-console/CONTRATO.md`.

**COROLARIO:** un handoff que apunta a un record **no resuelve para el hilo que lo lee**.
Una cifra que la sesión siguiente vaya a usar **viaja dentro del relevo, con su unidad**.
Lo que solo exista en un record se trae con **encargo de taller**, nunca pidiendo sync.

**La medición completa de este repo está en
`context/aiw-console/records/MEDICION-REPO-CANTU-QUIZZES-LATEX.md`** — 600 líneas, en el
repo `aiw-console`, **fuera del espejo**. Lo esencial está aquí dentro; el detalle se
pide con encargo.

---

## 3. EL ESTADO MEDIDO DEL REPO — cifras con su unidad

Medido el 2026-08-04, antes de que existiera este hilo.

**Volumen:** 1 393 ficheros, 275,4 MiB de contenido. Repo propio con remoto, rama `main`.

**Extensiones que importan:** **281 `.tex`** (4 maestros + 277 fragmentos), 726 `.png`,
194 `.txt`, 145 `.ipynb`, 4 `.pdf`, 4 `.xml`.

**Un solo fichero de configuración: `.gitattributes`**, el que GitHub crea por defecto.
**No hay `package.json`, `Makefile`, `.gitignore`, README ni documentación de ningún
tipo.**

**Estructura: hay CUATRO unidades, no tres.** Todo cuelga de `PAA/`:
`Banco de Preguntas/Español`, `Banco de Preguntas/Matematicas`, `Examen Diagnostico`,
`Examen Simulador`. `Banco de Preguntas/` **no es una unidad**: es un contenedor con dos
dentro. La prueba: exactamente en esos 4 directorios, y solo ahí, hay un `.tex` con
`\documentclass`.

**La unidad autocontenida es la CARPETA DE UNIDAD, no el fragmento.** Los 277 fragmentos
tienen **0 `\usepackage`** y **0 `\documentclass`**: el preámbulo lo da el maestro. Y las
**508 referencias a imagen resuelven desde la raíz de la unidad**, no desde el fichero —
las 508 resuelven, 0 fallan. **Un fragmento suelto no compila: le falta el preámbulo y el
directorio base.**

**Piezas compartidas: 3 ficheros replicados 4 veces, byte a byte idénticos** — un `md5`
por nombre, cuatro rutas cada uno. 3 996 líneas en disco, 999 únicas.

**Cuántos quizzes hay: depende de qué cuente como uno, y las tres cuentas son legítimas.**
**4** documentos compilables · **276** fragmentos, con correspondencia 1:1 exacta con
`\begin{quiz}` · **5 727** preguntas `multi`.

**⚠ LOS MAESTROS ESTÁN CASI ENTERAMENTE COMENTADOS: 3 `\input` activos de 275.**
`Español.tex` tiene **cero**. **Compilar el repo tal como está en `main` produce PDF con
1 fragmento cada uno, y `Español` con ninguno.** No es un fallo: el maestro es la consola
de trabajo del autor, que descomenta lo que edita. **Pero significa que el estado
comprometido no describe ningún examen completo.**

**Y los PDF comprometidos no son producto de sus fuentes:** `Español.pdf` tiene 39
páginas y salió de **2 fragmentos que hoy están comentados**.

**No hay toolchain de LaTeX en la máquina del operador: 0 de 8 binarios en PATH, 0 de 5
rutas de instalación típicas.** No es suposición: son 13 comprobaciones.

**⚠ 26 artefactos de compilación y 120 ficheros de `.ipynb_checkpoints` están
COMMITEADOS en `main`**, incluidos 2 `.synctex(busy).gz`, que son basura por definición.
**El árbol parece limpio solo porque todo está rastreado: la primera compilación lo
ensucia.**

---

## 4. LAS TRES ADJUDICACIONES QUE ESTE HILO DEBE TOMAR

Ninguna está decidida. **Las tres son de este hilo y de su operador.**

**A — Qué significa «compila».** Es la que gobierna todo lo demás. Tres lecturas
incompatibles, medidas:

- **Los 4 maestros tal como están:** 4 invocaciones, barato. Cobertura **1,1 %** — 3
  fragmentos de 276.
- **Descomentar los 275 `\input`:** cobertura 100 %, pero **destruye la consola de
  trabajo del autor**, y un fallo enrojece la unidad entera sin decir qué fragmento.
- **Envolver cada fragmento:** 100 % **con culpable identificado**, pero son 276
  invocaciones y hay un techo de 600 000 ms en el kernel.

*El hilo `aiw-console` recomendó la tercera con la primera como escalón previo. **Es una
recomendación, no una adjudicación: decide este hilo.***

**B — Si el verde incluye el XML de Moodle.** `Matematicas.log` registra **46 errores** y
aun así emitió su PDF de 27 páginas: **PDF emitido ≠ sin errores.** Los 46 son fallos de
conversión Base64 del paquete `moodle` — ese log dice `restricted \write18`, los otros
tres dicen `\write18 enabled`. **Producir el XML exige `-shell-escape` sin restringir**
sobre un árbol de 1 393 ficheros.

**C — La higiene del árbol.** Los 26 artefactos, los 120 checkpoints, el `.gitignore` que
no existe. **Es la única de las diez fases del roadmap que no depende de ninguna
adjudicación pendiente**, y conviene resolverla **antes** de la primera compilación.

## 5. EL ROADMAP: 3 objetivos, 10 fases, CERO runs

**Cero runs es deliberado y está autorizado por `D-062`**, que adjudica que un
contenedor sin runs es VÁLIDO y no deriva nada. **Este canónico estrena esa forma.**

- **`The repository stands on its own`** — `Tree hygiene: what is source and what is
  product` · `Document how this compiles` · `One copy of the shared pieces`
- **`A green or a red exists`** — `Settle what "it compiles" means` · `A reproducible
  toolchain` · `The verification command` · `The Moodle XML branch`
- **`The content is legible from outside`** — `The document index` · `Reconcile product
  and source` · `An inventory of the question bank`

**Cada fase sale de una medición, no de una idea.** Escribir los runs es trabajo de este
hilo, y **dos de sus insumos son las adjudicaciones A y B del §4**.

**Orden que la medición sugiere:** la higiene del árbol y el canónico son independientes
de todo. **`Settle what "it compiles" means` gobierna `The verification command` y `The
Moodle XML branch`**, y el comando es prerrequisito del campo `verification` del kernel.
`Reconcile product and source` depende de la adjudicación A: no significa nada hasta que
esté dicho qué es un producto válido.

## 6. LO QUE YA ESTÁ HECHO, Y NO HAY QUE REHACER

- **Registrado** en `project-console/projects.json` del repo `aiw-console`: 1 entrada, 0
  sitios de código.
- **Canónico creado** por el motor: 3 objetivos y 10 fases en 13 operaciones, con
  dry-run y validador post-escritura. `checkInvariants` en 0 errores.
- **`.project/` emitido** desde la consola, y la consola pinta el proyecto.
- **Layout: `repo_root`.** `project_id` cae a `cantu-quizzes-latex` sin `package.json`.

**Un defecto abierto, nombrado y sin dueño:** la primera emisión produjo **4 artefactos**
—`docs_index.json`, `git_history.json`, `roadmap.json`, `snapshot.json`— y la medición
previa esperaba **6**. Faltan `guardrails.json` y `no_claims.json`. **La hipótesis sin
verificar es que derivan de `governance/`, que este repo no tiene, y que su ausencia es
por diseño.** Si el aviso de la consola los nombra como no cargados, es defecto del
emisor y pertenece a `aiw-console`; si no los nombra, no hay nada que arreglar. **Este
hilo lo comprueba y lo devuelve si es ajeno.**

**Y una predicción que conviene verificar en pantalla:** el escáner de documentos solo
recoge `.md`, y este repo tiene **0 ficheros `.md`** sobre 281 `.tex`. **Su índice de
documentos sale literalmente vacío.** La salida existe y no cuesta código: si el repo
cura su propio `docs/docs_index.json`, el emisor lo transporta sin filtrar por extensión.

## 7. REGLAS DE CABINA QUE ESTE HILO NO PUEDE DEDUCIR

- **Un hilo por proyecto.** Este hilo escribe en `cantu-quizzes-latex`. Un hallazgo sobre
  otro repo **se NOMBRA, no se corrige**.
- **En `aiw-console` escriben varios hilos.** El `git add` sobre ese repo va **siempre
  dirigido a ficheros por su nombre, nunca `-A`**. Este hilo escribe ahí sus records y su
  handoff, y nada más.
- **El taller no corre Git.** Todo comando de Git lo ejecuta el operador.
- **Papel ≠ disco.** Un record es una medición **fechada**, no el estado de hoy. Un hecho
  que va a entrar en un artefacto **se verifica contra disco aunque un record lo afirme**,
  y si discrepan **gana el disco**. Los records **no se reescriben hacia atrás**: se
  corrige hacia adelante.
- **Una cifra se cita con su unidad y su alcance**, o no se cita.
- **`git checkout` NO se usa para deshacer en este workspace**: reescribe finales de
  línea. Se usa **respaldo byte a byte fuera del repo** antes de escribir.
- **Todo ticket declara en qué condiciones el taller debe PARAR** en vez de seguir, y qué
  entregar en su lugar. **Un encargo que para no es un encargo fallido.**
- **Los runs se clasifican.** El procedimiento está en
  `context/PROCEDIMIENTO-DE-CLASIFICACION.md` y el normativo en
  `context/CLASIFICACION-DE-RUNS.md`, **que gana si discrepan**. Los dos están en el
  espejo. **Un run que se CREA se clasifica en el mismo acto**, o su ticket declara por
  escrito por qué no y cuándo.

## 8. LOS OTROS HILOS

**`aiw-console`** — la consola y el contrato. **Le pertenece todo lo que pinte o emita
este proyecto**: si algo se ve mal en pantalla, es suyo. Le pertenece también el defecto
de los artefactos del §6 si resulta serlo.

**`aiw`** — el kernel que ejecutará runs. **Le pertenece el comando de verificación como
CAMPO**: su `config.json` espera `verification` como **una sola cadena de shell**, hoy
`"npm test"` en los dos proyectos que declara. **Que admita una compilación de LaTeX es
trabajo de `aiw`, no de este hilo** — pero **qué compila esa cadena lo decide este hilo**.
Restricción medida que hay que devolverles: el kernel ejecuta sin cwd propio, y **las
rutas de imagen de este repo exigen cwd en la raíz de cada unidad**, así que el cambio de
directorio tendrá que ir dentro de la cadena, cuatro veces.

**`cantu-studio`** — sin relación con este proyecto. Medido.
