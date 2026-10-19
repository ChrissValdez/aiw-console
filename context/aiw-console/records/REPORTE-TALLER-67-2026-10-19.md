# Reporte del taller del `#67` — transcrito verbatim

Run: `#67` `RUN-CONSOLE-PROJECT-CONFIG-BUTTON-001` «Care budget and the unclassified note move behind
a project configuration button». El operador lo pegó en la cabina el 2026-10-19. Se transcribe
**verbatim**, sin sustituirlo; lo que la cabina mide sobre él va aparte, al final.

## El reporte del taller

```text
Guarda verificada (run 67 coincide y está `active`). Ahora leo la D-075 y el registro del operador.

Now the HTML: the header area and the slot.

Before touching anything, the baseline suite. Let me check how the suite runs.

Línea base medida: 877/876/1, igual que dejó el #66. Ahora leo los tests que fijan dónde se pinta el care budget y la nota.

Leí el código y los tests: el slot `roadmap-care-budget` está fijado por id en los tests del #43, así que lo conservo. Ahora mido qué tiene cada uno de los cinco proyectos para mostrar.

Estoy leyendo cómo abren y cierran los diálogos existentes (modal de edición, cajón del run, Escape) para que la superficie nueva use los mismos patrones.

Ahora capturo el «golden» del panel del care budget con el código SIN cambiar, para poder probar después que se lee y se edita exactamente igual.

Golden capturado (5 estados). Escribo ahora los tests nuevos, antes de tocar el código.

Los 15 rojos fallan por la razón esperada (falta el diálogo, el control y las funciones); el único verde es el golden, verde por construcción. Ahora implemento.

Now the edits. First `index.html`: the control in the header band, the slot out of Roadmap, and the dialog.

Now the renderer: the note gets its meaning line and leaves Overview.

Now the dialog's own functions, right after the care budget's write path:

Now the stylesheet:

Los 16 nuevos y los cuatro ficheros de clasificación/care budget pasan (136/136) sin ajustar ningún test existente. Corro la suite completa.

Suite: 877/876/1 → 893/892/1, el único fallo sigue siendo el conocido. Ahora levanto mi propia instancia del servidor con `PC_PORT` para mirar la consola.

Abro cantu-studio en la consola para ver el control y el diálogo.

La pestaña Roadmap ya abre directo en la cola, sin el panel. El engrane está arriba a la derecha. Lo abro:

Funciona en el navegador. Un ajuste visible: los runs con títulos largos se parten en «pastillas» desordenadas; en un diálogo se leen mejor como lista, uno por renglón.

Ahora pruebo el recorrido: abrir un run desde la lista, volver con Back, y cerrar con Escape.

Confirmo que Back vuelve al diálogo y Escape lo cierra devolviendo el foco al engrane. Ahora activo la compuerta de «Edit roadmap» (solo hace un GET de sondeo), reabro el diálogo y la desactivo.

Confirmo que con «Editing on» el care budget queda editable en el diálogo, como antes; evito pulsar «Preview» para no afectar el endpoint de un proyecto real. Cierro, desactivo el modo edición y paso a revisar Overview y otros dos proyectos.

Overview queda sin la nota. Ahora cantu-quizzes-latex (sólo care budget, 0 sin clasificar) y aiw-console (care budget configurado).

Los tres proyectos se ven bien. Reviso que los 404 de la consola sean fuentes opcionales previas y no algo mío, y la vista angosta.

Todos los 404 son artefactos opcionales de los proyectos (ya existían); la única llamada a la ruta de escritura fue el GET de sondeo (405), ningún POST. Miro el encabezado en anchos menores.

A ≤1040 px el encabezado se apila en columna y el engrane cae solo en un segundo renglón. Lo fijo arriba a la derecha en ese rango, sin tocar las reglas compartidas del encabezado:

A 900 px el engrane se posiciona correctamente arriba a la derecha; a 375 px la consola ya presentaba problemas previos (la barra lateral no colapsa), así que no lo cuento como verificado. Vuelvo al tamaño normal y corro la suite final.

Suite final: 893/892/1, mismo fallo ajeno. Saco los `+`/`-` y reviso que no se colaron caracteres de control (la trampa del #65).

Medido en los cinco proyectos: el control aparece en los cinco y la pestaña Roadmap ya no lleva el panel en ninguno. Apago mi instancia del servidor.

Escribo la ficha de memoria del run.

Run #67 está hecho, sin commit. El care budget y la nota «Unclassified live runs» ya no salen en Roadmap ni en Overview. Ahora viven en un diálogo «Project configuration» que se abre con un engrane. El care budget se lee y se escribe igual que antes, y escribir sigue pidiendo «Edit roadmap». La guarda pasó: el run 67 coincide en `run_id` y `title`, y su estado es `active`.

## 1. Ficheros tocados

| Fichero | + | − |
|---|---|---|
| `project-console/assets/project-console.js` | 141 | 2 |
| `project-console/assets/project-console.css` | 121 | 3 |
| `project-console/index.html` | 43 | 9 |
| `tests/project-config-surface.test.mjs` (nuevo) | 294 | — |
| `tests/fixtures/project-config/care-budget-panel.golden.json` (nuevo) | 28 | — |

No toqué `serve.mjs`, el proyector, `roadmap.json`, `.project/` ni el `launch.json` del workspace.

## 2. Tests

- **16 nuevos, escritos antes del cambio; 15 estaban en rojo**, todos porque aún no existían el diálogo, el control o sus funciones.
- El que estaba en verde es una comparación contra una copia del panel del care budget (el golden), tomada del código **antes** de tocarlo. Fija que el panel sale byte a byte igual en 5 estados: sin configurar y configurado, con y sin modo edición, y tras «Fill with published defaults».
- **No ajusté ningún test de otro run.** Mantuve el id `roadmap-care-budget` y moví el contenedor dentro del diálogo. Por eso los tests del #43, que buscan ese id, siguen verdes sin cambios. Los cuatro ficheros de clasificación y care budget también pasan sin cambios: 120 tests.

## 3. Suite completa

- **Antes:** 877 tests, 876 pass, 1 fail (`roadmap-engine.test.mjs:93`, el de finales de línea). Coincide con la base del #66.
- **Después:** 893 tests, 892 pass, el mismo fail.
- Las salidas están en el scratchpad de esta sesión: `…\scratchpad\suite-antes.txt` y `suite-despues.txt`. Los 15 rojos previos están en `nuevos-antes.txt`.

## 4. Decisiones

- **Dónde va:** en el extremo derecho de la barra de pestañas del proyecto. Esa barra es igual en los cinco proyectos y en todas las pestañas. No es una pestaña porque no cambia de pantalla. Por debajo de 1040 px de ancho se queda arriba a la derecha en vez de bajar a un renglón propio.
- **Cómo se ve:**
  - El botón es un engrane sin texto, del mismo gris de las pestañas en reposo, sin relleno ni contador; el texto «Project configuration» aparece al pasar el ratón.
  - El diálogo usa las piezas que ya tiene la consola (el modal de edición, la cabecera del cajón y el velo oscuro). Mide 680 px de ancho y muestra el nombre del proyecto debajo del título.
  - Dentro, el care budget y la lista de runs dejan de ser tarjetas y pasan a ser secciones. Los runs van uno por renglón; como «pastillas» se partían en dos o tres líneas.
  - Escondí la etiqueta «project configuration» del care budget porque el título del diálogo ya lo dice.
- **Proyecto sin nada que mostrar:** el engrane **se oculta**, sin diálogo vacío y sin «not configured», como pide la D-075. En la práctica los cinco proyectos traen el bloque del care budget, así que el engrane aparece en los cinco. Si la lista de runs sin clasificar está vacía, su sección no se dibuja.
- **La frase** (va primero dentro de la nota): *«Classification here is AIW's risk classification of a run — the fields under Classification in the run's detail, from which its severity and closure mode are derived — and has nothing to do with objectives or phases.»* Remite a la sección Classification del run en lugar de nombrar los campos, porque su vocabulario es el contrato del run siguiente.
- **Clic en un run de la lista:** el diálogo se aparta y abre el detalle del run. Su botón Back dice «Project configuration» y vuelve al diálogo. Desde ahí el run no ofrece botón Edit, igual que antes desde Overview.
- **Cambio de proyecto:** el diálogo se cierra, el engrane se oculta y se vacía lo que mostraba el diálogo. Antes, si un proyecto fallaba al cargar, el care budget del proyecto anterior se quedaba en pantalla.

## 5. Cómo hacer la QA

Abre la consola en `/project-console/index.html` y recarga con Ctrl+F5, porque cambiaron el CSS y el JS. En cada proyecto, haz clic en el engrane de arriba a la derecha.

| Proyecto | Care budget | Runs sin clasificar |
|---|---|---|
| aiw-console | Configured | 5 |
| cantu-studio | Not configured | 9 |
| cantu-quizzes-latex | Not configured | 0 (sólo sale el care budget) |
| cantu-lessons | Not configured | 27 |
| aiw | Not configured | 0 |

Para ver la edición: cierra el diálogo, pulsa «Edit roadmap» en la barra de Roadmap y vuelve a abrirlo.

## 6. Lo que no pude verificar

- **El juicio visual es tuyo.** Puntos a mirar: el engrane sin texto, si el diálogo debería ser un cajón lateral, y que «Not configured» siga dentro del diálogo.
- **Para editar hay que salir del diálogo** y encender «Edit roadmap» en Roadmap. No añadí ese botón dentro del diálogo porque sería un atajo nuevo, y el encargo los prohíbe.
- **No pulsé Preview ni Confirm** sobre el endpoint de ningún proyecto real. El camino de escritura no cambió y lo cubren el test de la carga útil del #43 y el golden. En el navegador sólo comprobé que, con el modo edición, aparecen los 8 campos y los botones.
- **A 375 px no está verificado:** la consola ya se rompía a ese ancho antes de este run, porque la barra lateral no colapsa.
- **Sin cambiar, ya existía:** el borrador de care budget sin confirmar no se limpia al cambiar de proyecto. Ahora no se puede alcanzar desde otro proyecto, pero lo dejé como estaba.
```

## Lo que la cabina mide sobre el reporte — 2026-10-19 17:04–17:10 CST

1. **El diff cuadra con el reporte:** `project-console.js` +141/−2, `project-console.css` +121/−3,
   `index.html` +43/−9, el test nuevo y su golden. Sin caracteres de control en los ficheros tocados.
   El canónico intacto (md5 `0073dbbe`).
2. **Ningún test de otro run se ajustó**, y el taller lo nombra como se le pidió.
3. **Suite corrida por la cabina en tres tandas: 893 tests, 892 pass, 1 fail** — el conocido de finales
   de línea. Cuadra con el taller.
4. **El `launch.json` del workspace cambió, pero no fue este taller:** pasó de 5 a 13 entradas y su
   última escritura es del 2026-10-18 04:12, antes de este run. Son entradas de runs de
   `cantu-studio`. Se nombra; no es de este hilo.
5. **`.project/` apareció re-emitido a las 17:04:43**, fuera de la cabina y del taller: sólo cambian
   `generated_at` y el historial de git (los commits nuevos). Coincide con alguien abriendo la consola.
   Se incluye en el commit del trabajo porque es el estado derivado actual, y se declara.
6. **Lo que queda sin verificar, nombrado por el taller:** 375 px de ancho (la consola ya se rompía
   ahí), y el borrador de care budget sin confirmar que no se limpia al cambiar de proyecto
   (preexistente, ya inalcanzable).
