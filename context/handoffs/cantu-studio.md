# HANDOFF — hilo `cantu-studio` (el proyecto)

> Escrito por la cabina el **2026-08-16**, al cerrar la sesión que llevó `#100` → `#104`.
> **Sustituye al relevo del 2026-08-12**, que tenía tres afirmaciones falsas; están corregidas
> abajo, nombradas una a una.
>
> **Todo lo de aquí está medido y lleva fecha. Son mediciones fechadas: contrástalas contra el
> canónico al abrir. Gana el disco.**

---

## ⚠ LO PRIMERO: DERIVA LA RUTA Y PRUEBA LA CAPACIDAD

La ruta de montaje **cambia entre sesiones**. No la heredes. Prueba que se lee el workspace, que
`git log` responde en los cinco repos, **que el borrado está habilitado** y que `.git` es
escribible. Si algo falla, declara modo ESPEJO.

**Comprueba `.git/index.lock` en los cinco repos con `ls`, nunca corriendo git para averiguarlo.**
En esta sesión no apareció ni uno, con `--no-optional-locks` en todo comando y `add`/`commit`
solos en su llamada.

### TRES AFIRMACIONES DEL RELEVO ANTERIOR QUE SON FALSAS HOY — medidas el 2026-08-16

1. **«LA CABINA NO PUEDE BORRAR» — FALSO.** Probado: crear y borrar en `_backups/` y `_scratch/`
   funciona. **Era un permiso que nadie había pedido**, no una imposibilidad.
2. **«La cabina no commitea» — FALSO.** Esta sesión hizo **seis commits** con `add` dirigido e
   identidad explícita, sin dejar un solo lock. **Al operador le queda el `push` y sólo el push**,
   y no es política: no hay ruta a GitHub.
3. **«`dist/` está RASTREADO, 47 ficheros» — FALSO HOY.** Medido: `git ls-files dist` → **0**, y
   `tools/author-lite/editor-ui/dist` → **0**. No está versionado. La orden operativa —no tocarlo—
   se cumple igual, pero la razón que daba el relevo ya no es cierta.

---

## ⚠⚠ LA VÍA DE ESCRITURA DEL CANÓNICO ES LA CONSOLA, NO EL CLI

**Sigue vigente y sigue siendo lo que más tiempo ahorra.** `cantu-studio/tools/roadmap/roadmap-edit.mjs`
importa el motor viejo y **se niega a escribir** por una dependencia externa que es **legal**.

    cd projects/aiw-console
    PC_PORT=47xx node project-console/serve.mjs &        # captura el PID; NUNCA pkill -f, mata tu propia shell
    POST http://127.0.0.1:47xx/projects/cantu-studio/__project-console/roadmap/edit
      { op, args:{...}, apply:false }                    # dry-run -> devuelve remap + baseline
      { op, args:{...}, apply:true, baseline }           # compare-and-swap

**`serve.mjs` re-emite los 7 artefactos de `.project/` él solo** tras cada escritura.

**Los procesos en segundo plano NO sobreviven entre llamadas de bash.** Levanta el servidor y haz
el POST **en la misma llamada**. El `baseline` es un hash de contenido, así que **sí sobrevive**:
puedes hacer el dry-run en una llamada y el apply en la siguiente.

**Nombres de argumento verificados esta sesión — van todos anidados bajo `args`:**

| op | argumentos |
|---|---|
| `set-status` | `run`, `status`, `closeoutResult` |
| `set-text` | `targetType:"run"`, `targetId`, `title`, `summary`, `fullDescription` — **NO usa `run`** |
| `insert` | `runId`, `title`, `summary`, `fullDescription` + **exactamente una** de `after` / `before` / `endOfPhase` |
| `move` | **una** de `after` / `before` / `toOrder`; `toPhase` solo no basta |

**El canónico de este proyecto es `.aiw/roadmap/roadmap.json`** — con `.aiw/`. `.project/roadmap.json`
es la **proyección emitida**, no la fuente. Su forma es `objectives[].phases[].runs[]`: **no hay
`runs` en la raíz**, hay que recorrer el árbol.

---

## QUÉ SIGUE — lo primero al abrir

**`#104` `RUN-CANTU-SLIDE-TITLE-SLIDE-AUTHORABLE-001` está `active`** — «Make the Portada a real
editable block created with the presentation». **El ticket se entregó al operador y el taller
puede estar corriendo.** Lo primero es pedirle el resultado.

`136 runs` · `completados 104` · `densidad 1..N` · `un solo activo` · canónico **`d320d2ca`**
(md5 del árbol de trabajo) al cerrar.

**Respaldo vivo, NO borrar mientras `#104` siga abierto:**
`_backups/roadmap.cantu-studio.20260816-151726.pre-titleslide.json`. **Bórralo al cerrar el run.**

**Detrás, por orden:** `#105` `flowDrafts` sin acotar · `#106` movimiento visual desde el mapa ·
`#107`–`#119` los componentes de diapositiva.

---

## EL CICLO QUE FUNCIONA, y costó cambiarlo

**Turno 1 — abrir y encargar.** Derivar `run_id` y título del canónico, dry-run, aplicar,
verificar con md5, publicar el parte, y debajo el ticket. **El operador sólo pega el ticket.**

**Turno 2 — medir, entregar QA. EL RUN NO SE CIERRA AQUÍ.** La cabina verifica lo que el taller
escribió, **commitea**, y entrega la QA. **El run se queda `active` hasta el veredicto del
operador**, porque estas superficies sólo las juzga su ojo.

**Turno 3 — cerrar con su veredicto, escribirlo a disco VERBATIM, y encadenar.** El push no
bloquea nada.

**Y antes de todo ticket: modelo, esfuerzo y sesión.** Lo pidió por escrito. Opus es el default;
Alto es el esfuerzo del trabajo real; sesión nueva cuando la anterior sesgaría.

---

## LA SUITE, Y UN LÍMITE DE LA CABINA QUE HAY QUE SABER

    node --test "tools/author-lite/compiler-api/tests/*.test.mjs" "tools/roadmap/tests/*.test.mjs" "tools/dev/tests/*.test.mjs"

**Al cerrar: 1499 / 1494 pasan / 5 fallan.**

**LA SUITE COMPLETA NO CABE EN UNA LLAMADA DE LA CABINA.** Se mide **por lotes** —los ficheros
ordenados y partidos en cuatro— y aun así **`webCorpusFixtureNet.test.mjs` no cabe ni solo**. No
es que falle: es que la cabina no lo ve. **Se declara, no se disimula.**

### LOS CINCO FALLOS NO TIENEN UNA CAUSA, TIENEN TRES — corrección del 2026-08-16

**«Causa única verificada: una dependencia huérfana» estaba escrito en tres records y varios
tickets, y es FALSO.** Las tres:

1. **La dependencia huérfana** — `RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` apunta a
   un run que no está en este canónico. **3 pruebas** (`createPhase` ×2, `deletePhase`).
2. **`clearProgress` B7** — *«the canonical roadmap should carry at least one terminal run with a
   progress record»*. No hay ninguno.
3. **`C5 [SENTINEL]`** — **exige CERO runs `active`**. Está rojo **siempre que haya un run
   abierto**, o sea, siempre que se esté trabajando. **Se enciende y se apaga con el ciclo.**
   Predicho y confirmado en el mismo turno: al cerrar `#102` bajó a 4, al abrir `#103` volvió a 5.

**Ninguno se toca. Si ves 4 en vez de 5, mira si hay run activo antes de celebrar nada.**

---

## LO QUE EL OPERADOR HA DICHO Y RIGE — sus palabras

> **«el de web se ve excelente […] es una replica casi exacta de los campos y como agarra la
> paleta de colores de la configuracion global y los iconos igual»** — **Web es la
> especificación, no la inspiración.**

> **«yo no borro o modifico los archivos tu lo haces, y commiteas yo solo hago el push»**

> **«siempre antes de ponerme un ticket dime el modelo que recomiendas esfuerzo y si es la misma
> sesion o nueva»**

> **«el qa dame instrucciones mas claras, donde me meto para revisar eso, y que quieres que
> revise»** — lo pidió **dos veces**. Pasos concretos: dónde, qué pulsar, qué se espera ver.

> **«siempre que cerremos sesion, me generas (actualizas) el handoff y el prompt de reinicio»**
> — 2026-08-16. **Esto no se le vuelve a preguntar.**

**Y cuatro backticks** cuando un ticket lleve bloques de código dentro: con tres, se partió por la
mitad una vez.

---

## LO QUE ESTA SESIÓN ENSEÑÓ, y no está en ningún otro sitio

**1 · Medir una capa y publicar la conclusión.** En `#103` la cabina midió el servidor, encontró
la causa, publicó las cifras y **dio el terreno por medido**. Había una **segunda compuerta en el
cliente** que ni siquiera dejaba salir la petición: **un arreglo sólo en servidor habría sido
invisible**. La sonda era correcta; **el alcance no**.

**2 · La parada de análisis pagó por segunda vez.** `#103` llevaba escrita dentro su condición de
parada. La cabina midió **antes de emitir el ticket**, vio que se habría activado al llegar, y le
llevó la decisión al operador. **Se ahorró un taller entero.**

**3 · El patrón «capacidad en el motor, cerrada en el esquema» va por la QUINTA vez** —`layout.rows`,
coordenadas, tipos de lámina, tamaños, y ahora la Portada—. Y esta vez **el repo ya decía de quién
era el trabajo**: `draftSchema.js` lleva escrito *«le toca al run de Title Slide»*, y **ese run no
existía**. **Cuando encuentres una capacidad cerrada, nómbrala; no la abras por tu cuenta.**

**4 · La validación del editor tiene DOS momentos y son legítimos.** Nivel de campo en
`onTouched` —decisión medida para no gritar mientras se teclea—, nivel de bloque y celda sobre el
**borrador vivo**. Barrido de 60 casos: el esquema del editor y los del servidor **dan las mismas
rutas**. No los separes.

---

## ABIERTO Y SIN DUEÑO — nombrado, no reparado

- **La rama `isLessonGated` de `RealPreviewPanel` quedó sin llamante**, con los botones «Crear
  lección» y «Explorar» del panel de previa. Verificado: **cero llamantes**. Retirar afordancias
  visibles es decisión del operador.
- **El encabezado vacío de Web** con lección en blanco y ≥1 bloque.
- **Las tildes rotas** — UTF-8 doble en los dos gemelos del esquema. **31 líneas / 40 apariciones**
  en el del servidor, y **nadie ha fijado si se cuentan líneas o apariciones**.
- **Las ocho notas de frontera** — modales de flujo, ajustes de iconos, editor de paletas.
- **El recorte silencioso del cuerpo de la tarjeta** (`overflow: hidden`).
- **`SlidePreviewPanel.jsx`**, muerto y sin retirar.
- **El alias `columns`**, que el motor lee y el esquema no conoce.
- **El build nunca limpia `dist/`.**

---

## AL CERRAR SESIÓN

**El operador lo pidió explícitamente el 2026-08-16 y es permanente:** al cerrar, la cabina
**actualiza este handoff Y entrega el prompt de reinicio**, sin que se lo pidan. El prompt vive en
`context/cantu-studio/PROMPT-DE-REINICIO.md`.
