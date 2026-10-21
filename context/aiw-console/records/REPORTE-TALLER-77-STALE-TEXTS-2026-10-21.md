# Reporte del taller del `#77` `RUN-CONSOLE-STALE-TEXTS-REPAIR-003` — 2026-10-21

Run: `#77` `RUN-CONSOLE-STALE-TEXTS-REPAIR-003` «Repair the false texts the second stale-texts run
named». (No confundir con `REPORTE-TALLER-77-2026-10-20.md`, que es del run que entonces tenía el
`queue_order` 77, la auditoría `RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001`: el número es coordenada.)

**Verbatim.** Pegado por el operador en el chat de la cabina del hilo `aiw-console` y transcrito a
disco por la cabina en el mismo turno, sin editar.

---

Guarda verificada (coincide). Ya corrió la suite de línea base; reviso el resultado y sigo con los cuatro textos.
Confirmo que el texto (1) sigue siendo falso: `batch` está en `RUN_OPTIONAL_FIELDS` pero el motor rechaza `category` como campo inesperado. Ahora reviso qué indican las decisiones sobre `category` antes de redactar.
Sigo con el texto (1): redacto la corrección de §16. Antes compruebo qué otras partes del contrato citan §16.
Ya tengo medido el texto (1). Ahora mido si algún test lee el texto de `serve.mjs` o de las líneas de CLASIFICACION que voy a tocar.
Ninguna prueba lee el comentario de `serve.mjs` (la MATRIX fija el comportamiento, no el texto). Paso a los textos (2) y (3).
Los cuatro textos siguen siendo falsos (el 4, cifra que envejece; ningún test lo fija). Paso a corregir.
Ahora los otros tres ficheros.
Ediciones hechas. Compruebo codificación, `node --check` y corro la suite de después.
Suite después: 982/982/0. Un matiz en el `.cmd`: la cabecera del `.ps1` también documenta, así que «its documentation is the README» sería inexacto. Lo ajusto.
Suite final 982/982/0 sobre el estado definitivo. Guardo la memoria y cierro.
Run #77 `RUN-CONSOLE-STALE-TEXTS-REPAIR-003`: textos corregidos, sin commitear
Los cuatro textos seguían siendo falsos y los corregí todos. Ninguno me obligó a tocar código ni nada fuera del alcance. La suite completa (`node --test`) dio 982 tests / 982 pass / 0 fail antes y después, así que la línea base del ticket cuadra. La última pasada la corrí sobre el estado final de los ficheros.
La guarda se cumplió. Recorrí el árbol de `objectives` del roadmap: con `queue_order` 77 hay un único run, con el `run_id` y el `title` exactos y `status: "active"`.
Dos rutas del ticket no cuadran con el disco. `context/` no está en la raíz del workspace: vive dentro del repo, en `projects/aiw-console/context/`. El reporte del #75 está allí.
Los cuatro textos
(1) `CONTRATO.md` §16: seguía siendo falso.

* Medición: `batch` está en `RUN_OPTIONAL_FIELDS` (`roadmap-core.mjs:162`). El motor recorre las claves de cada run y rechaza con «carries unexpected field» toda clave que no esté en `RUN_ALLOWED_FIELDS` (`:635`), y `category` no está.
* Antes:
   * Título: «— reservados, nacen vacíos».
   * Primer párrafo: «Un consumidor de este contrato que no las entienda las ignora».
   * Último párrafo: «Sin enum y sin forma fijada — ni siquiera el tipo… de `category` y `batch` hay CERO ejemplares».
* Después:
   * Título: «— reservadas; `batch`, admitida después por el `#48`».
   * Primer párrafo: las claves admitidas las fija `RUN_ALLOWED_FIELDS`, el motor rechaza como campo inesperado las que no están, y `batch` está ahí desde el `#48`, pero `category` no.
   * Último párrafo: lo de «sin forma ni tipo» queda sólo para `category`. El «cero ejemplares» pasa a ser lo que halló la medición de la capa (MEDICION:343-352). Para `batch`: el `#48` le dio tipo y forma, su validación vive en el motor, y qué runs la llevan lo dice cada canónico.
* Punteros: dos notas «(Corregido el 2026-10-21: …)», con el mismo estilo que las del #75. Apuntan al `#48`, que no tiene decisión propia en `DECISIONES.md`, y a la adjudicación `z` (D-051).
* Arrastre: en «Decisiones de este contrato», donde se lista lo que la capa dejó sin fijar, añadí un puntero: «los de `batch` los fijó después el `#48`». Es un acto pasado, así que no lo reescribí.
* El puntero de `category` no es una decisión que lo hiciera caducar. La fila `z` registra que el motor «ya rechazaba por allowlist» antes de D-051. Por eso la nota dice que la afirmación no vale para el motor, y no que una decisión la caducó.

(2) `start-console.cmd:6`: seguía siendo falso. Además, la cabecera de `start-console.ps1` también documenta, y el `.cmd` tiene su propia pausa cuando falla.

* Antes: «All behaviour, and all documentation, is in the .ps1.»
* Después: «What the launcher does lives in the .ps1 (this file only adds the pause on failure below). It is documented in the header of the .ps1 and in start-console.README.md, both beside this file.»
* El fichero sigue en ASCII, con LF y sin BOM: no tiene ningún byte por encima de 0x7F.

(3) `CLASIFICACION-DE-RUNS.md:3` y `PROCEDIMIENTO-DE-CLASIFICACION.md:5`: seguían siendo falsos. `project-console/projects.json` lista más proyectos que esos tres.

* CLASIFICACION, antes: «TRANSVERSAL a los tres proyectos (`aiw`, `aiw-console`, `cantu-studio`) … rige en los tres».
* CLASIFICACION, después: «TRANSVERSAL a todos los proyectos: los que lista el registro de la consola (`project-console/projects.json`) … rige en todos», con una nota de enmienda fechada.
* PROCEDIMIENTO, antes: «Alcance: los tres proyectos.»
* PROCEDIMIENTO, después: «todos los proyectos que lista el registro de la consola (`project-console/projects.json`)», como enmienda fechada. Así lo pide su §8: se corrige con una sección nueva o una enmienda datada, no reescribiendo.
* Los tests leen §5 y §9 de CLASIFICACION, no el bloque de cabecera.

(4) Cabecera de `serve.mjs`, líneas 1-3: es una cifra que envejece.

* Medición: ningún test lee ese comentario. `serve-write-routes.test.mjs:373` (MATRIX) fija las cuatro rutas por su comportamiento, no por el texto. Por eso la toqué.
* Antes: «…plus EXACTLY FOUR write routes (O4.P12 opened two; O4.P14 added the third; #57 … adds the fourth).»
* Después: «…plus a closed set of write routes. Each route is described in the write-routes block below; the ones the server actually dispatches are the `*_SUFFIX` constants (ROADMAP_EDIT_SUFFIX and its siblings).»
* Sólo cambié esas líneas de comentario. `node --check` pasa.

Los cinco ficheros siguen en UTF-8 sin BOM y con LF; el `.cmd`, en ASCII.
Textos falsos nuevos (nombrados, sin tocar)

* `serve.mjs:16`, «THE FOUR WRITE ROUTES», y `:135` y `:1252`, «four write routes»: son la misma cifra que envejece, pero fuera de las líneas 1-3.
* `serve.mjs:27` y `:778`, «ALL SEVEN artifacts»: es falso donde la raíz no es su propio repositorio, porque ahí no se emite `git_history.json`.
* `PROCEDIMIENTO:205`, «el esquema que obedecen tres proyectos»: está en la medición del piloto (§7), que es un acto pasado. Lo dejé por eso.
* CONTRATO §16, «Qué función esperan»: describe D-029 tal cual. D-057 lo reencuadró después, separando el cierre de la delegabilidad. Es dudoso que haya que tocarlo; lo dejo a criterio de la cabina.

El CONTRATO, en su línea 55, también pide anotar cada corrección en la decisión que la motiva, y eso cae en `DECISIONES.md`, que está fuera del alcance. Sigue pendiente, como en el #75.
Ficheros tocados:

* [CONTRATO.md](https://claude.ai/epitaxy/context/aiw-console/CONTRATO.md)
* [start-console.cmd](https://claude.ai/epitaxy/start-console.cmd)
* [CLASIFICACION-DE-RUNS.md](https://claude.ai/epitaxy/context/CLASIFICACION-DE-RUNS.md)
* [PROCEDIMIENTO-DE-CLASIFICACION.md](https://claude.ai/epitaxy/context/PROCEDIMIENTO-DE-CLASIFICACION.md)
* [serve.mjs](https://claude.ai/epitaxy/project-console/serve.mjs)
