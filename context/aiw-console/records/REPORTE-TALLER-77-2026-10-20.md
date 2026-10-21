# Reporte del taller del `#77` (primer tiempo) — 2026-10-20

Run: `#77` `RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001` «Deep visual audit of the console, led by the
operator». Producto: `GUIA-RECORRIDO-77-2026-10-20.md`.

**Verbatim.** Pegado por el operador en el chat de la cabina del hilo `aiw-console` y transcrito a
disco por la cabina en el mismo turno, sin editar.

---

Árbol limpio, la guía no existe. Ahora la guarda.
Guarda OK: `run_id`, `title`, `status: active` coinciden y el último párrafo es el «REFRAMED 2026-10-20 … THE CUTOVER GATE LEAVES THIS RUN».
Guarda superada y la guía no existe todavía. Arranco la consola en el puerto 8797 (el 8788 lo ocupa ya un servidor que no toco) y empiezo a inventariar las superficies desde el código.
Leyendo el código de la consola (shell, pestañas, drawer, modales) y recorriéndola en el navegador en el puerto 8797 para inventariar las superficies.
Now the project config dialog (gear) — finding #3 and the "already carry a work class" finding.
Midiendo los hallazgos de clasificación contra los snapshots de cada proyecto (cuáles tienen runs sin clasificar y si ya llevan clase de trabajo).
Sigo con los cuatro hallazgos de diseño: localizo su origen en los records (#64, #65, #69) para medirlos contra el código de hoy.
Buscando en los records de julio la medición original de los seis hallazgos de 2026-07-31 para saber exactamente qué pantalla miraba cada uno.
Sigo midiendo el hallazgo del «confirm al cancelar»: busco el registro de la cabina de 2026-07-31 que lo midió para saber qué modal y qué gesto describe.
Ya tengo medidos cinco de los seis hallazgos de julio en el código; ahora los compruebo en la consola abierta (detalle del #77, que está activo).
Screenshot coordinates are in an 800x500 frame. Clicking run #77.
Confirmado en pantalla: #77 está ACTIVE, la fila de la cola dice «In progress» y el detalle dice «Current stage: Not started». Ahora el #79 (CRITICAL) para el hallazgo del care budget.
Finding 5 confirmed in the browser: #79 derives CRITICAL and its detail never mentions the care budget. Next: phase order in the Roadmap subview (finding 6).
Ya verifiqué casi todos los diez hallazgos directamente en el código. Me falta comprobar el «confirm al cancelar» en el navegador y revisar el inventario completo de superficies (drawer, reporte, lector, editor, History, Docs, Status).
Recorriendo la pestaña Docs (árbol, filtro, «Collapse all») para el inventario y para el hallazgo del filtro que no queda fijo al hacer scroll.
Inventariando la pestaña History; he encontrado un texto en pantalla que contradice lo que la pestaña pinta y lo verifico en el navegador antes de anotarlo como defecto.
Confirmo qué etiquetas pinta el modo edición (botón del drawer y controles del árbol) para describir ese tramo del recorrido.
Ahora el reporte de run (sólo `cantu-quizzes-latex` tiene `reports/`): lo abro desde el run #2 para inventariar su capa, su botón Documents y el lector modal.
Estoy dentro del reporte del run #2 de `cantu-quizzes-latex`; saco la lista de controles del renderizador (barra, índice, veredicto) para describirlo como una sola superficie.
Abro «Documents» desde el reporte para medir el lector modal (filtro y límite de 66ch).
Medido: en el lector modal, tras bajar la lista, el filtro queda 884 px por encima de la columna (no es sticky). Ahora el 66ch con un documento que lleva tabla.
Confirmado que el 66ch también encaja: párrafos a 640 px y tabla a 938 px, usando todo el ancho. Ahora probaré la confirmación al cancelar, abriendo el editor de un run, cambiando un campo y pulsando Close con `window.confirm` interceptado para verificar que se llama.
Tres Escape cerraron lector, reporte y también el drawer del run; lo repito paso a paso para saber si es el comportamiento previsto o si un Escape cierra dos capas.
Las capas se cierran de una en una con Escape (la primera vez el foco no estaba en el filtro): no hay defecto. Ahora el editor.
Confirmé: cerrar sin modificar nada no pregunta, pero escribir y luego deshacer deja el modal marcado como «sucio» y dispara el aviso de cambios sin guardar al pulsar Close. Ahora restauro `confirm`, cierro el modal sin escribir y desactivo el modo edición.
Encontré en `phd-p2-experiment` #5 un «Classification 0» sin unidad y un «Current stage: Not started» en un run activo. Ahora reviso los Docs de `cantu-studio` (posible defecto de alcance) y el filtro de la pestaña Docs.
Los diez hallazgos están medidos. Echo un último vistazo a Overview para cerrar el inventario.
Ya no quedan hallazgos por medir. Fijo los números de línea exactos de la evidencia antes de escribir la guía.
Medido: 29 runs activos en el workspace sin `progress`, todos pintan «Not started». Compruebo que el recorrido en el navegador no escribió nada en ningún repo antes de redactar.
El árbol de `aiw-console` está limpio; los cambios en `cantu-lessons` y `phd-p2-experiment` son de otros hilos y no vienen del recorrido, ya que el servidor no recibió ningún POST. Ahora reviso dos detalles de línea pendientes y escribo la guía.
Tengo todo lo que hace falta. Escribo la guía.
Verifico los números de línea que cité sin haberlos visto exactos.
Varios números del lanzador y del detalle no cuadran; los saco con grep y corrijo.
Números corregidos (ese aviso de cambio en disco es mi propio `sed`). Ahora paro el servidor del 8797, devuelvo el navegador a su tamaño y compruebo `git status`.
He escrito la guía: [GUIA-RECORRIDO-77-2026-10-20.md](https://claude.ai/epitaxy/context/aiw-console/records/GUIA-RECORRIDO-77-2026-10-20.md). La guarda coincidía y el fichero no existía antes. `git status --porcelain` muestra como única novedad `?? context/aiw-console/records/GUIA-RECORRIDO-77-2026-10-20.md`. No he commiteado nada.
Cómo lo medí: leyendo el código y también con la consola real abierta en el navegador, en el puerto 8797, con el mismo comando que lanza `start-console.ps1`. Recorrí los seis proyectos sin pulsar ningún botón que escriba en disco. Lo que no pude ver funcionando va marcado como «inferido del código». No corrí la suite.
Los diez hallazgos, hoy:

* Siguen ocho, y se ven en pantalla:
   * H1: «Classification 0» sin unidad.
   * H2: un run activo dice «Not started». Afecta a 29 runs activos; en los seis proyectos sólo un run tiene registro de progreso (`progress`).
   * H4: el aviso de confirmación del editor salta aunque hayas escrito y deshecho el cambio.
   * H5: un run CRITICAL no muestra el consejo del care budget en su detalle.
   * H6: las fases se leen desordenadas frente al `queue_order`.
   * H7: el lector modal limita el texto a 66ch y las tablas no.
   * H8: el filtro de títulos no queda fijo al bajar la lista, ni en Docs ni en el lector.
   * H9: el detalle no dice qué runs esperan a este.
* H3 está resuelto, contra lo que dice el `full_description`: la lista de runs sin clasificar ya está en pantalla, en el diálogo «Project configuration» (la pintó el #43 y la movió el #67).
* H10 sigue en el código, pero hoy no se puede ver: ningún run vivo sin clasificar tiene clase de trabajo en ninguno de los seis proyectos.

Defectos: ninguno confirmado. Descarté dos sospechas al medirlas en el navegador:

* La cabecera de History dice algo que no es cierto, pero el CSS la oculta y no llega a la pantalla.
* Tres Escape seguidos cerraron tres capas, pero cada Escape cierra sólo una; la primera vez el foco no estaba en el filtro.

Tamaño: el recorrido sale de 18 superficies agrupadas por proyecto, unos 30 minutos, así que no hizo falta partirlo. Otras cinco superficies no aparecen con los datos de hoy y quedan listadas aparte para que no las busques.
Antes de arrancar: el lanzador `start-console.cmd` para cualquier proceso node que esté en el puerto 8788. Ahora mismo hay ahí una consola tuya arrancada a las 15:50, con un `serve.mjs` anterior al de hoy; al lanzarlo, esa se cierra y arranca la actual. Por eso no lo usé para medir.
`cantu-lessons` y `phd-p2-experiment` tienen cambios sin commitear que no son de este taller: son borradores y ficheros `.py`, y el servidor no recibió ningún POST. El servidor del 8797 ya está parado.
