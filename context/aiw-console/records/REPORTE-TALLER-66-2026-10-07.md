# Reporte del taller del `#66` — transcrito verbatim

Run: `#66` `RUN-CONSOLE-ROADMAP-DEFAULT-TAB-001` «Projects open on the Roadmap tab». El operador lo
pegó en la cabina el 2026-10-07. Se transcribe **verbatim**, sin sustituirlo; lo que la cabina mide
sobre él va aparte, al final.

## El reporte del taller

```text
Guarda OK (uno solo, los tres campos coinciden). Ahora D-075, la reflexión y la línea base.

Ahora la línea base de la suite, antes de tocar nada.

Confirmo la línea base: 869/868/1, con el fallo repetido en roadmap-engine.test.mjs:93, y noto que la sección `tab-overview` también tiene `active` en el markup (línea 86). Ahora reviso el JS.

Confirmo el OK y la línea base medida (869/868/1), y localicé los tres sitios donde Overview nace activo (incluyendo el ticket y un tercero no reportado). Ahora reviso si algo depende de que Overview pinte primero y qué tests lo asumen.

Confirmo que `renderAll` pinta todas las pestañas sin carga perezosa ni condición de parada, y que sólo History hace polling al abrirse. Ahora reviso los tests y documentos que asumen Overview.

Ningún test existente afirma la pestaña activa. Miro el arnés de `shell-switch.test.mjs` para escribir los tests nuevos sobre él.

Voy a crear un fichero de tests propio que monte los botones y paneles reales de `index.html` sobre el arnés existente, ya que su `querySelectorAll` devuelve `[]` y por eso ningún test detecta la pestaña hoy. Antes de editar, reviso el markup del Roadmap y el CSS.

Todo consistente (subvista por defecto `v3queue` en markup y en el reset). Escribo los tests primero para contarlos en rojo.

El segundo test falla porque su regex es demasiado estricto y duplica al primero. Voy a corregirlo y confirmar que los tests en rojo fallan por el motivo correcto.

6 en rojo por la razón correcta (la pestaña activa es `overview`), 2 guardas en verde. Ahora el cambio.

Suite tras el cambio: 877 / 876 / 1 (los 8 nuevos, mismo único fallo ajeno). Compruebo si hay configuración de preview para ver la consola real.

Hay una entrada `aiw-console` que se engancha a un servidor ya corriendo en 8788. Lo intento.

La página llega sin CSS ni JS. Miro qué está sirviendo el puerto 8788.

El servidor en 8788 solo sirve `/` y da 404 en `assets/`; como es del operador, no lo tocaré. Voy a ver si `serve.mjs` admite otro puerto para levantar una instancia propia y desechable.

El servidor sirve desde la raíz del repo; la consola debe vivir en `/project-console/`. Pruebo esa ruta en el mismo servidor (sólo lectura, sin pulsar nada que escriba).

El 8788 también responde «not found»: es una instancia ajena que no sirve esta consola. Voy a levantar una instancia propia en otro puerto usando `PC_PORT` en `serve.mjs`, con una entrada temporal en el `launch.json` que luego retiraré.

`serve.mjs` sólo arranca como módulo principal. Ajusto la entrada para pasar el puerto por entorno vía `cmd`.

Confirmo que la ruta correcta es `/project-console/index.html`, ya que la raíz `/` sirve el `index.html` pero resuelve los `assets/` contra `/`. Esto también explica el detalle del 8788: es una peculiaridad preexistente de la entrada raíz, así que la mencionaré en el reporte sin modificarla.

Ahora abro un proyecto, me paso a Overview, cambio a otro proyecto y compruebo en cada paso lo que se marca y lo que se ve.

La captura muestra Cantu Lessons abierto directamente en Roadmap (Run Queue). Clasifico los 404 de la consola del navegador para asegurarme de que no los causa el cambio.

Los errores 404 corresponden a fuentes opcionales que faltan en cada proyecto, no a problemas con el cambio de pestaña. Ahora detengo el servidor, elimino la entrada temporal de `launch.json` y reviso el diff (solo lectura en git).

# Run #66 `RUN-CONSOLE-ROADMAP-DEFAULT-TAB-001`: hecho, sin commit

Ahora la consola abre en Roadmap la primera vez y vuelve a Roadmap cada vez que se cambia de proyecto. Overview sigue ahí y se abre con un clic, igual que antes. La suite no gana ningún fallo nuevo.

**Guarda:** se cumple. En `roadmap/roadmap.json` hay un solo run con `queue_order` 66, y su `run_id`, su `title` y su `status: active` coinciden con los del ticket. Leí la `full_description` entera y la D-075. No se dio ninguna condición de parada.

## 1. Ficheros tocados

| Fichero | + / − |
|---|---|
| [project-console/index.html](projects/aiw-console/project-console/index.html) | +4 / −4 |
| [project-console/assets/project-console.js](projects/aiw-console/project-console/assets/project-console.js) | +6 / −3 |
| [tests/console-default-tab.test.mjs](projects/aiw-console/tests/console-default-tab.test.mjs) | nuevo, 134 líneas |

Las cifras de los dos primeros salen de `git diff --numstat` (git sólo en lectura). `git status` no muestra ningún otro cambio en el repo.

## 2. Tests

- **8 tests nuevos y ningún test existente ajustado.** No toqué ningún test de regresión de otro run.
- **Antes del cambio, 6 estaban en rojo**, y todos por la razón correcta: la pestaña activa era `overview` y el test esperaba `roadmap`. Comprueban:
  - el markup;
  - la primera apertura de un proyecto;
  - el cambio de proyecto saliendo de cada una de las otras cuatro pestañas (Overview, History, Docs y Status).
- Los otros 2 estaban en verde antes y lo siguen después, porque vigilan lo que debe quedarse igual: que Overview existe y que se abre con un clic, mostrando su botón marcado y su contenido.
- Cada test comprueba a la vez el botón marcado y el panel que se ve.

## 3. Suite completa

| | tests | pass | fail |
|---|---|---|---|
| Antes (medida por mí) | 869 | 868 | 1 |
| Después | 877 | 876 | 1 |

El único fallo es el conocido de `tests/roadmap-engine.test.mjs:93` (finales de línea), antes y después. La línea base del ticket se confirma.

Ficheros de salida, en el scratchpad (`C:\Users\chris\AppData\Local\Temp\claude\C--Users-chris-Documents-AIW-Workspace\0e6b03d7-dd9a-4a5a-bf39-add5934377e0\scratchpad\`):
- `suite-antes.txt` y `suite-despues.txt`
- `default-tab-antes.txt` y `default-tab-despues.txt`

## 4. Sitios que asumían Overview como inicio

1. **El botón de Overview en `index.html`**, que nacía marcado (coordenada de la cabina: confirmada, línea 72). El marcado pasa al botón de Roadmap.
2. **La sección de Overview en `index.html`** (línea 86), que también nacía visible. **No estaba en las coordenadas del ticket.** Cambiando sólo el botón, la pestaña marcada habría sido Roadmap mientras se veía Overview. La marca de visible pasa a la sección de Roadmap.
3. **`resetChromeToDefaults()` en `project-console.js`** (coordenada de la cabina: confirmada, ahora en la línea 5784). Es lo que el shell ejecuta en cada apertura de proyecto, la primera incluida. Ahora marca Roadmap. Actualicé su comentario, que decía «Overview tab».
4. **Por qué ningún test lo veía:** el arnés compartido de tests (`tests/helpers/console-dom.mjs`) responde con una lista vacía a toda búsqueda de botones o paneles, así que no había pestañas que comprobar. No lo toqué: el test nuevo monta los botones y secciones reales de `index.html` sólo para sí mismo.
5. **Arranque ligado a Overview, sin tocar:** la consola sólo arranca si encuentra la sección de Overview en la página. Depende de que Overview exista, no de que sea la primera pestaña; uno de los tests nuevos vigila que siga existiendo.
6. **Ninguna carga depende de que Overview pinte primero.** La consola pinta todas las pestañas a la vez al cargar un proyecto, y la única con comportamiento propio al abrirse es History. Por eso no se activó la condición de parada.

**Lo que no cambia, a propósito:**
- Al volver a pulsar el proyecto que ya está abierto, no hay reinicio y se mantiene la pestaña actual. No es un cambio de proyecto.
- Al recargar después de re-emitir `.project/`, la pestaña tampoco se reinicia.

**Recordar la última pestaña entre sesiones:** serían unas cinco líneas con almacenamiento del navegador, pero contradice D-075 («la primera pestaña sea roadmap»). Lo nombro y no lo construyo.

## 5. Lo que no pude verificar y lo que vi al pasar

**Comprobación en un navegador real.** La hice en una instancia propia del servidor en el puerto 8799, ya parada, y retiré la entrada temporal que añadí al `.claude/launch.json` del workspace. Recorrí este camino:
- abro AIW Console → cae en Roadmap;
- pulso Overview → se ve Overview;
- cambio a Cantu Studio → vuelve a Roadmap;
- pulso History → se ve History;
- cambio a Cantu Lessons → vuelve a Roadmap.

En cada paso coinciden la pestaña marcada y el contenido visible. Los 404 de la consola del navegador son ficheros opcionales que algunos proyectos no tienen; el cambio no hace ninguna petición nueva.

**Lo visual es del operador:** que no haya un parpadeo de otra pestaña al cargar y que el resultado se vea bien.

**Problemas vistos al pasar, fuera de alcance y sin tocar:**
- **La raíz `/` del servidor pinta la consola sin estilos ni scripts.** `serve.mjs` sirve el `index.html` en `/`, pero sus estilos y scripts dan 404 desde ahí. La URL que funciona es `/project-console/index.html`. La entrada `aiw-console` del `.claude/launch.json` del workspace apunta a la raíz, así que abre la consola rota.
- **El proceso que escucha en el 8788 (PID 23072) responde «not found» en `/project-console/`.** No lo investigué ni lo toqué.
```

## Lo que la cabina mide sobre el reporte — 2026-10-07 01:25–01:30 CST

1. **El diff cuadra con el reporte:** `index.html` +4/−4 (botón Y sección), `project-console.js`
   +6/−3 (`resetChromeToDefaults`), un test nuevo. Nada fuera del alcance; el canónico intacto
   (md5 `ee82169f`).
2. **El `launch.json` del workspace quedó como estaba:** 1 029 bytes y las mismas cinco entradas
   (`cantu-studio-editor`, `aiw-console`, y tres de runs de `cantu-studio`). Ese fichero lo tocan dos
   hilos y no está versionado; el taller lo modificó y lo restauró. **Se nombra** porque escribió
   fuera del repo de su alcance, aunque lo devolvió.
3. **Suite corrida por la cabina en tres tandas: 877 tests.** En la VM de la cabina salió un segundo
   fallo, `projector.test.mjs` «writeSnapshot emits the roadmap.json view», con `EPERM: unlink`: el
   permiso de borrado de la cabina había caducado y el test no pudo limpiar su fixture. **Es del
   entorno de la cabina, no del código:** con el permiso renovado ese fichero pasa 9 de 9. Los dos
   ficheros que el test dejó en `tests/fixtures/sample-project/.aiw/views/` los borró la cabina.
   Resultado equivalente al del taller: 877 / 876 / 1.
4. **Dos hallazgos ajenos que trae el taller, sin abrir:** la raíz `/` de `serve.mjs` pinta la consola
   sin estilos ni scripts (la URL buena es `/project-console/index.html`) y la entrada `aiw-console` de
   `launch.json` apunta a esa raíz; y un proceso en el 8788 responde «not found» en `/project-console/`.
