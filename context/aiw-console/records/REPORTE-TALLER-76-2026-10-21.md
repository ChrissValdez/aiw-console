# Reporte del taller del `#76` — 2026-10-21

Run: `#76` `RUN-CONSOLE-EOL-TEST-PREMISE-REPAIR-001` «Replace the line-ending test whose premise the
line-endings run retired».

**Verbatim.** Pegado por el operador en el chat de la cabina del hilo `aiw-console` y transcrito a
disco por la cabina en el mismo turno, sin editar.

---

Guarda coincide. Ahora las mediciones.
Guarda confirmada y mediciones hechas (cero CRLF en los dos canónicos). Ahora leo el record del #49 y corro la suite base.
Mediciones listas; reviso los pins sobre datos reales vecinos y luego escribo el test.
Run #76: test de EOL sustituido
He cambiado el test que fallaba por uno que pasa en cualquier checkout. La suite queda en 982 tests, 982 en verde y 0 fallos. Solo he tocado [tests/roadmap-engine.test.mjs](https://claude.ai/epitaxy/projects/aiw-console/tests/roadmap-engine.test.mjs). No he commiteado nada.
Guarda. Coincide. El run con `queue_order` 76 es `RUN-CONSOLE-EOL-TEST-PREMISE-REPAIR-001`, tiene el título exacto del ticket y su status es `active`.
1. Mediciones antes de tocar nada

* CRLF en los canónicos. Hay 0 en `aiw-console/roadmap/roadmap.json`: 1242 LF y ningún CRLF. También hay 0 en el de cantu-studio, que está en `.aiw/roadmap/roadmap.json` y no en `roadmap/`: 3599 LF. Lo medí con un script de node que cuenta `\r\n`, y `git ls-files --eol` da `i/lf w/lf` en los dos. La cabina tenía razón.
* Qué fijó `RUN-CONSOLE-LINE-ENDINGS-001`. Según el commit 2f71ffb, creó `.gitattributes` con `* text=auto` y renormalizó el árbol. No fija el final de línea del checkout. El LF que hay hoy en disco viene de la config de git del operador (`core.eol=lf` y `core.autocrlf=false` en `~/.gitconfig`), no del repo.
* Por qué falla el test. Con `detectEol` los dos canónicos dan `"\n"`, así que `new Set(eols).size` vale 1 y el test esperaba 2. Es la causa que dice el `full_description`, así que no hacía falta parar.

2. El test, antes y después

* Antes (`:93`): «round-trip: the two real canonicals do NOT share a line-ending convention (why detectEol exists)». Exigía que los dos ficheros reales tuvieran distinto final de línea.
* Después: «round-trip: an LF roadmap and a CRLF roadmap each survive byte-identical, and only with their own EOL (why detectEol exists)». Usa un roadmap escrito a mano en LF y su copia en CRLF. Comprueba que en cada uno:
   * `detectEol` lee el final de línea correcto;
   * el round-trip es byte a byte;
   * serializar con el otro final de línea no reproduce el original;
   * un `\n` escapado dentro de un valor sigue siendo dato, no estructura.

No he creado ningún fixture en disco, a propósito: con `text=auto`, git también reescribiría al hacer checkout un fichero de `tests/fixtures/`, y volveríamos a depender de la máquina.
3. El test de `:83`
No he cambiado su código y pasa. Sí he corregido el comentario de encima, en el mismo fichero, porque decía «one LF, one CRLF — measured» y hoy es falso.
4. ¿Alarma sobre datos reales? No la conservo
Con `text=auto`, el final de línea de los ficheros reales depende de cómo tenga git configurado cada máquina. En otra con `core.eol=native` saldrían en CRLF los dos, así que cualquier alarma sobre qué final de línea llevan podría fallar en un checkout correcto. Lo que el motor sí debe garantizar sobre los ficheros reales es que el round-trip sea byte a byte con su propio final de línea, sea cual sea, y eso ya lo comprueba `:83`. El motivo queda escrito en el comentario del test.
5. Suite completa (`node --test`)

* Antes: 982 tests, 981 en verde, 1 fallo. La línea base del ticket era correcta.
* Después: 982 tests, 982 en verde, 0 fallos.

El total no cambia porque he puesto un test en lugar de otro. Comparé la lista de tests de las dos ejecuciones y la única diferencia es el test sustituido.
6. Otros tests sobre datos reales que podrían caducar (no los he tocado)

* `tests/roadmap-batches.test.mjs:101`: exige que los dos canónicos reales no tengan `batches`.
* `tests/roadmap-lanes.test.mjs:87`: exige que aiw-console siga sin `lanes`.
* `tests/roadmap-engine.test.mjs:160`: los dos canónicos reales tienen que pasar el pre-flight con las dependencias cruzadas. Depende del contenido real.
* `tests/roadmap-lanes.test.mjs:78` y `tests/classification-care-budget.test.mjs:153`: hacen el round-trip sobre los ficheros reales. Como `:83`, no dependen del final de línea.

Un detalle del disco que no está en el ticket: el record del #49 dice que el test de `:93` estaba en verde al cerrar ese run. Así que en algún momento posterior a esa fecha el canónico de cantu-studio, que entonces sería CRLF, pasó a LF en disco. No he buscado cuándo pasó, porque no cambia el arreglo.
Cambiar el status del run, re-emitir y commitear queda para la cabina.
