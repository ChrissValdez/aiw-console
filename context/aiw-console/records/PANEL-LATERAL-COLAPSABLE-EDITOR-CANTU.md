# Panel lateral colapsable del editor — colapsar y restaurar la columna derecha

Run canónico: `RUN-CANTU-EDITOR-SIDE-PANEL-COLLAPSE-001`, `queue_order` 37, `status: active`.
Guarda de título verificada contra `.aiw/roadmap/roadmap.json`: coincide exacta. Objetivo O4,
fase O4.P5.

**Tres rondas.** La 1 construyó el mecanismo de colapso y **pasó los siete checks de QA**. La 2
(§6) movió los controles a la barra del lienzo. La 3 (§7) **los ancló al extremo derecho de la
ventana**, que es lo que el operador quería desde el principio y lo que el criterio 3 de la
ronda 2 —ya retirado— había formulado mal.

**El mecanismo no se ha tocado desde la ronda 1**, y la ronda 3 tampoco tocó nada de la 2 salvo
la colocación: el pestillo de pantalla completa, la siembra al restaurar y las recompilaciones
siguen como se midieron.

Lo que sigue hasta la §5 describe la ronda 1 y **sigue vigente**, salvo la colocación de los
controles, que la §7 fija en su forma final.

---

## Ronda 1 — el mecanismo de colapso

Tres ficheros tocados, ninguno más:
`tools/author-lite/editor-ui/src/features/editor/hooks/usePreviewPanelSize.js`,
`.../EditorPage.jsx` y `.../components/layout/TopBar.jsx`. **`RightPanel.jsx` está en el
scope y no necesitó ni una línea** — la razón está en §1.

---

## 1. Qué se reutilizó y qué se añadió

La medición previa (primera tarea del ticket) encontró que la mitad construida era más de la
mitad. Lo reutilizado:

1. **El desmontaje como forma de colapso.** El modo de panel único ya desmonta `RightPanel`
   entero cuando muestra el lienzo (`EditorPage.jsx`, rama single-pane). El colapso de
   escritorio usa exactamente ese patrón: `{isRightPanelCollapsed ? null : <RightPanel …/>}`
   (`EditorPage.jsx:969`). No hay CSS de ocultación, ni ancho cero, ni segundo mecanismo.
2. **El lienzo absorbe el ancho solo.** `CenterWorkspace` es `flex-1 min-w-0`; al desmontar
   el panel se ensancha sin tocarlo. Su contenido interior ya estaba topado a `max-w-[980px]`.
3. **El estado de pestañas ya vivía arriba.** `rightPanelTab` y `selectedGuideItem` están en
   `EditorPage`, no en `RightPanel`, así que sobreviven al desmontaje sin trabajo nuevo. Por
   eso `RightPanel.jsx` no se tocó: nada suyo necesitaba cambiar.
4. **La persistencia existente.** `usePreviewPanelSize` ya persistía `panelWidth` en
   `localStorage` (`jame-author-lite-right-panel-locked-width-v2`). El flag colapsado entra
   en el mismo hook con clave hermana `jame-author-lite-right-panel-collapsed-v1`
   (`usePreviewPanelSize.js:4`), mismo patrón de lectura perezosa y escritura directa
   (`:71-72`, `:86-88`, `:127-142`). **Cero mecanismos de almacenamiento nuevos.**
5. **TopBar como casa de los controles de vista.** El botón nuevo vive junto a Web/Slide,
   donde ya vivía el conmutador del modo estrecho.

Lo añadido, todo el run cabe en tres piezas:

- `usePreviewPanelSize`: `isCollapsed`, `setCollapsed`, `toggleCollapsed` (+persistencia).
- `EditorPage`: consumir el flag (`:178-179`), pasarlo a TopBar (`:856-857`), condicionar el
  render del panel en la rama de dos paneles (`:969`).
- `TopBar`: props `isRightPanelCollapsed`/`onToggleRightPanel` (`:33-34`) y
  `renderRightPanelToggle` (`:238-263`, montado en `:440`): «Ocultar panel» ↔ «Mostrar
  panel» con iconos `PanelRightClose`/`PanelRightOpen` de la lucide-react ya instalada.
  **Sin dependencias nuevas.**

### Qué NO se reutilizó, y por qué

**El conmutador verde del modo estrecho no se generalizó.** Es un XOR (lienzo O vista previa,
porque no caben los dos) que vive dentro del menú «Más»; el colapso de escritorio es otra
semántica (lienzo Y panel, panel opcional). Generalizarlo habría obligado a mover o duplicar
UI del modo estrecho — el reencuadre que el ticket manda parar. Quedó intacto, byte a byte,
y en estrecho sigue mandando él.

---

## 2. Los estados colapsados (criterio 2) y su salida

| Estado | Salida visible | Verificado |
|---|---|---|
| **E1** — dos paneles (≥1200 px), colapsado | Botón «Mostrar panel» en TopBar, siempre visible, mismo sitio que el de colapsar | Sí, en vivo |
| **E2** — estrecho (<1200 px), lienzo, flag latente | «Más» → «Ver vista previa Web/Slide» (conducta de hoy, sin tocar) | Sí, en vivo |
| **E3** — estrecho, vista previa, flag latente | El panel está visible a pantalla completa; «Más» → «Ver lienzo» | Sí, en vivo |

Transiciones cruzando el umbral, las cuatro medidas en vivo:

- **E1 → estrecho**: entra en panel único con vista lienzo (el reset a `canvas` al entrar en
  el modo es conducta preexistente); salida en «Más». Sin trampa.
- **E2/E3 → ancho**: vuelve a dos paneles honrando el flag: si estaba colapsado, lienzo ancho
  con «Mostrar panel» a un clic. La elección de diseño de que E3→ancho oculte el panel que se
  veía está declarada en el packet de QA como conducta, con su salida a un clic.
- **Recarga en E1**: llega colapsado con «Mostrar panel» desde el primer pintado.
- **Recarga en E2**: llega al lienzo de panel único con su salida en «Más».

**El botón de TopBar se renderiza también en la variante compacta de cabecera** (guardado por
`!isSinglePaneMode`): hoy esa combinación es inalcanzable (§4), pero si algún día se
desacoplan las constantes, no aparece ninguna trampa nueva.

El flag **no** entra en la fórmula que decide el modo estrecho (`projectedCanvasWidth` sigue
usando `panelWidth`): la conducta del modo estrecho es idéntica con y sin colapso, que era la
guarda del criterio 4.

---

## 3. Mediciones de los criterios 6 y 7

### Criterio 6 — recompilaciones de vista previa

Instrumentado `window.fetch` sobre `/api/preview` con la lección `test_web` (13 bloques)
abierta, a 1920×1000:

| Acción | Renders disparados |
|---|---|
| Teclear con panel abierto (línea base del debounce de 650 ms) | 1 |
| **Colapsar** | **0** (el desmontaje cancela el debounce pendiente) |
| **Teclear estando colapsado** | **0** |
| **Restaurar con pestaña de vista previa activa** | **1** exacto, al remontar |
| Ciclo entero con «Paleta de colores» activa | 0 |
| Ciclo entero con «Guía de componente» activa | 0 |

**Colapsado no queda ningún efecto ni intervalo corriendo**: el efecto de auto-render
(`RightPanel.jsx:194-204`, verificada la cita del ticket) muere con el desmontaje, y en
`components/preview/` no hay ningún `setInterval` (barrido hecho). El coste del ciclo es una
recompilación por restauración, solo en pestaña de vista previa — el mismo coste que ya paga
hoy el modo estrecho al volver a la vista previa. Declarado en el packet; no se optimizó
nada porque no quedó nada corriendo que optimizar.

### Criterio 7 — persistencia

`panelWidth` **sí persiste** entre sesiones: `localStorage`, clave
`jame-author-lite-right-panel-locked-width-v2`, dentro de `usePreviewPanelSize`
(lectura perezosa al montar, escritura directa en cada cambio). Por tanto el colapso
persiste **igual y por la misma vía**: clave hermana
`jame-author-lite-right-panel-collapsed-v1` en el mismo hook, `'1'`/`'0'`. Verificado en
vivo: colapsar → recargar → llega colapsado; restaurar → recargar → llega con panel.
No se añadió ningún mecanismo de almacenamiento.

Observación medida de paso, preexistente y sin tocar: sin clave de ancho guardada,
`readStoredPanelWidth` hace `Number(null) → 0`, que es finito, y el clamp lo sube al mínimo
(896) en vez de al máximo por defecto. No afecta a este run; se deja anotado por si algún
día alguien persigue «por qué el panel arranca al mínimo».

---

## 4. Lo que el disco corrigió del ticket

1. **El breakpoint operativo del modo estrecho es 1200 px, no 1024.** La constante
   `SINGLE_PANE_NARROW_BREAKPOINT = 1024` existe (`EditorPage.jsx:30`, cita correcta), pero
   `usePreviewPanelSize` acota `panelWidth` a `maxPanel = innerWidth − 304` por debajo de
   1280 de ventana, así que el lienzo proyectado da siempre `w − 320 − (w−304) = −16 < 420`
   y el modo dispara en todo `w < 1200`. Consecuencia útil: **la banda «dos paneles entre
   1024 y 1200» no existe hoy**, y la enumeración de estados de §2 es completa con tres.
2. **La cita del conmutador.** El rótulo derivado del flujo que el ticket sitúa en
   `TopBar.jsx:39` (`Lienzo Web`/`Lienzo Slide`) es la píldora «Activo:» de la cabecera, no
   el conmutador. El conmutador real está en `:99-106` (`singlePaneToggleLabel`, «Ver vista
   previa Web/Slide» / «Ver lienzo») y **vive dentro del menú «Más»**, no como botón suelto
   (`:317-326` del fichero original). Las citas `EditorPage.jsx :30/:186/:213-219` y
   `RightPanel.jsx :195-204` del ticket, verificadas correctas (la de EditorPage con
   corrimiento de ±2 líneas).
3. **El riel izquierdo real mide 64 px, no 320.** `SINGLE_PANE_LEFT_RAIL_WIDTH = 320`
   (`EditorPage.jsx:33`) alimenta el cálculo del lienzo proyectado, pero `ComponentPalette`
   se renderiza como riel de iconos de 64 px (y `usePreviewPanelSize` ya usaba
   `RAIL_WIDTH = 64`). El cálculo queda conservador (proyecta menos lienzo del que hay), y
   no se tocó: cambiarlo alteraría cuándo dispara el modo estrecho, fuera de encuadre.

---

## 5. Números del cierre

- **Lienzo en escritorio (1920×1000): 960 px → 1856 px al colapsar** (+896, el ancho íntegro
  del panel); contenedor de bloques 928 → 980 px (su tope). Restaurar devuelve 960/896.
- **Suite: 436/436 antes del cambio, 436/436 después, 0 fallos, ninguna prueba modificada.**
  (Los tests viven en `compiler-api`, que este run no toca; se corrió entera igualmente.)
- **Lint limpio, build limpio** (`vite build` en 737 ms; el aviso de chunks >500 kB es
  preexistente).
- **Consola del navegador sin errores** durante toda la QA en vivo.
- Nada fuera de `editor-ui` cambió: ni compilador, ni renderers, ni esquemas, ni componentes
  Web. `git status` del árbol: solo los tres ficheros del run.
- Packet de QA: 7 checks, ~12-15 min, todo en editor de escritorio (ventanas ancha y
  estrecha), en
  `docs/_historical_run_record/RUN-CANTU-EDITOR-SIDE-PANEL-COLLAPSE-001-OPERATOR-QA-PACKET.md`.

---

## 6. Ronda 2 — los controles cambian de casa

QA del operador sobre la ronda 1: **funciona, con dos correcciones de colocación**. El
conmutador baja de la barra negra a la barra del lienzo (más intuitivo: esa barra es la del
lienzo y el panel es su vecino), y «Abrir vista» / «Expandir» dejan de esconderse con el
panel. **El mecanismo de colapso, la persistencia y `usePreviewPanelSize.js` no se tocaron.**

Cuatro ficheros: `CenterWorkspace.jsx` (casa nueva), `TopBar.jsx` (retirada),
`RightPanel.jsx` (puente) y `EditorPage.jsx` (cableado). +247 −58 líneas.

### 6.1 La medición cara, hecha antes de diseñar (criterio 4)

Los dos botones dependen de estado que vive **dentro** de `RightPanel`, y el mecanismo de
colapso aprobado es **desmontar** el panel. De ahí que mover los botones obligue a decidir
qué sube y qué se queda. Medido:

| Pieza | Dónde vivía | Qué se hizo | Por qué |
|---|---|---|---|
| `previewContainerRef`, listener de `fullscreenchange`, `requestFullscreen` | `RightPanel` | **Se queda abajo** | Es la alternativa que el ticket admite y la que menos mueve: la sincronización de pantalla completa no cambia de sitio, así que **su conducta no cambia** y no hubo que parar |
| `isPreviewFullscreen` | `RightPanel` (local) | **Se refleja hacia arriba** por callback, solo para el rótulo | Los dos hijos (`RealPreviewPanel`) siguen leyendo el estado local de siempre |
| Petición de expandir | — | Baja como **bandera**, y un efecto del panel la ejecuta cuando el contenedor existe | Permite «restaurar y expandir en un gesto» sin sacar la mecánica del panel |
| `webPreviewState` / `slidesPreviewState`, `handleRenderPreview`, efecto de auto-render y su debounce de 650 ms | `RightPanel` | **Se quedan abajo, enteros** | Subirlos habría cambiado las recompilaciones medidas y aprobadas en la ronda 1 |
| `viewUrl`, `cacheKey`, `updatedAt`, `isLoading` | `RightPanel` | **Solo el valor sube**, reportado por un efecto | Es el mínimo para que los botones funcionen colapsados |

**Criterio 6, respuesta medida y con matiz.** «Abrir vista» **no depende del panel para
funcionar**: es un `window.open` de una ruta de servidor, `/api/preview/view/<previewId>`
(`server.js:847` y `:898`), con `previewId` estable en `sessionStorage` por sesión y por modo
(`previewApi.js:3-14`). El fichero de la vista previa no desaparece porque un componente se
desmonte. Lo que **sí** vivía en el panel era el **valor** de esa URL, y es lo único que se
levantó. Verificado colapsado: abre `http://localhost:3000/api/preview/view/author_lite_web_…`
con el mismo nombre de ventana `jame_author_lite_web_preview` de siempre, y **sin disparar
ninguna recompilación**. No se paró porque no hubo dependencia real que romper, solo un valor
que mudar de sitio.

**Criterio 7, condiciones de deshabilitado, medidas.** `isPreviewActionDisabled` es
`!viewUrl || isLoading`: sin render con éxito todavía (sin lección, error de validación) o con
uno en vuelo. Arriba se reconstruye idéntico, más una guarda de modo (`mode !== activeTab`)
que cubre el caso nuevo de cambiar de flujo con el panel colapsado. Verificado en un borrador
sin lección: los dos botones deshabilitados y **«Ocultar/Mostrar panel» activo**. El colapso
por sí solo **nunca** deshabilita nada, que es lo que el criterio 5 prohibía.

### 6.2 Criterio 5: por qué el panel vuelve con la vista previa ya puesta

Medido antes de decidir: al restaurar, el panel remonta **vacío** y enseña la tarjeta «Vista
previa Web pendiente» durante **~800 ms** (650 de debounce + ~150 de render) antes del iframe.
Entrar a pantalla completa sobre eso son **dos pinturas** — exactamente lo que el criterio 5
manda no entregar.

Solución: el estado retenido arriba **siembra** el panel al remontar (solo si el modo coincide),
así que vuelve con su último render puesto. Medido con `requestFullscreen` instrumentado,
estando colapsado: **una sola llamada**, con `tieneIframe: true` en el instante de pedirla, y
**0 de 10 muestras** con la tarjeta de espera. Sin parpadeo, sin dos pinturas.

Efecto lateral declarado y deseable: **restaurar normalmente tampoco muestra ya la espera.**

### 6.3 Un defecto propio, encontrado midiendo

La primera versión llamaba a `requestFullscreen` **dos veces**. Causa: `StrictMode` está activo
(`main.jsx:7`) y duplica los efectos en desarrollo, y mi efecto no era idempotente. Cerrado con
un pestillo de `ref` y devolviendo la guarda `document.fullscreenElement` que el código
original tenía y mi refactor había perdido. Vuelto a medir: **una llamada**.

### 6.4 Dónde queda cada control — **sustituido por la §7**

| Estado | Conmutador de colapso | «Abrir vista» / «Expandir» |
|---|---|---|
| **E1** — ancho, panel abierto | Barra del lienzo («Ocultar panel») | Barra del lienzo |
| **E1'** — ancho, **colapsado** | Barra del lienzo («Mostrar panel») | Barra del lienzo, **funcionando** |
| **E2** — estrecho, vista lienzo | **No se muestra** (manda «Más», intacto) | Barra del lienzo |
| **E3** — estrecho, vista previa | **No se muestra** (manda «Más», intacto) | Cabecera del panel |

`CenterWorkspace` y `RightPanel` **nunca están montados a la vez en modo estrecho**, así que en
E2/E3 hay una sola instancia de cada botón: ni duplicados ni ausencias. En escritorio la
cabecera del panel se quedó **solo con las tres pestañas**, verificado.

### 6.5 Dos arreglos de disposición que hicieron falta

1. **La salida no puede recortarse.** A 1280 px con el panel abierto el lienzo mide **320 px**
   (mínimo de panel 896 + riel), y la barra desbordaba 152 px: «Mostrar panel» quedaba fuera
   —una trampa contra el criterio 9—. Resuelto **por CSS, sin depender de ninguna medición**:
   los grupos ceden espacio (`min-w-0`) y los rótulos truncan. Medido después a 320 px:
   contenido 320, **sin desbordar**, y el conmutador dentro con 24 px de margen. A 960 px los
   tres van con su rótulo entero.
2. **Guarda de una línea en el `ResizeObserver`** de la barra: si la medida es 0 —barra aún sin
   layout— ya no se aplica, y los rótulos se conservan. En un navegador que compone frames no
   cambia nada; sin ella, una medida temprana de 0 dejaba el contador de bloques oculto para
   siempre. Es la razón de que el contador reapareciera en las mediciones de esta ronda.

### 6.6 Números del cierre de la ronda 2

- **Lienzo 960 → 1856 px** al colapsar, sin cambios respecto a la ronda 1.
- **Recompilaciones**: colapsar **0**; «Abrir vista» colapsado **0**; restaurar **1**; ciclo con
  «Paleta de colores» activa **0**. Idénticas a las aprobadas.
- **Suite 436/436**, ninguna prueba tocada. **Lint y build limpios.**
- **Consola sin errores de la aplicación**, comprobado en pestaña limpia (los cuatro errores
  que aparecían eran estados intermedios de HMR de la propia sesión de edición).
- `git status`: solo los cuatro ficheros del scope.
- Packet actualizado, no reescrito: **de 7 checks / ~12-15 min a 11 checks / ~20-25 min**.

### 6.7 Limitación del entorno de medición, declarada

El panel de navegador de esta cabina **no compone frames**, así que los `ResizeObserver` no
disparan. Todo lo geométrico se midió con `getBoundingClientRect`/`scrollWidth`, que sí es
fiable, y los cambios de tamaño se forzaron con eventos de `resize`. **La conmutación de
rótulo a icono por ancho no pudo verse dispararse en vivo**; su correctitud no es crítica
porque la disposición ya no depende de ella (§6.5.1). El check 9 del packet la cubre a ojo.

---

---

## 7. Ronda 3 — anclar los controles al borde de la ventana

QA del operador sobre la ronda 2: **la colocación seguía mal, y la culpa era del ticket.** Su
criterio 3 —«viven en la barra del lienzo, y SIEMPRE»— ataba los controles al ancho del
**lienzo**, no al de la **ventana**: con el panel abierto quedaban en mitad de la pantalla,
apelotonados contra el contador de bloques, mientras la franja del panel se llevaba todo el
hueco a su derecha. Criterio retirado.

**La regla correcta: los tres van siempre al extremo derecho de la ventana.** La franja
superior son dos barras a la misma altura, y el borde derecho de la ventana lo ocupa una u
otra según el estado. Así que **cambia el padre, no la posición**.

Tres ficheros: `RightPanel.jsx` (casa con el panel abierto), `CenterWorkspace.jsx` (casa con el
panel colapsado, ya correcta y sin tocar) y `EditorPage.jsx` (el cableado condicional).
`TopBar.jsx` y `usePreviewPanelSize.js` **no se tocaron**.

### 7.1 Cómo se montan (criterio 3)

El cableado es una sola regla en `EditorPage`: **el grupo va a quien esté montado en el borde
derecho**. `CenterWorkspace` lo recibe solo si `RightPanel` no está montado, y viceversa. Como
los dos nunca coexisten en el borde, no hacen falta banderas de visibilidad.

| Estado | «Abrir vista» / «Expandir» | Conmutador |
|---|---|---|
| **Ancho, panel abierto** | Cabecera del panel, a la derecha | Cabecera del panel |
| **Ancho, panel colapsado** | Barra del lienzo, a la derecha | Barra del lienzo |
| **Estrecho, vista lienzo** | Barra del lienzo | **No se muestra** (manda «Más») |
| **Estrecho, vista previa** | Cabecera del panel | **No se muestra** (manda «Más») |

Verificado **contando instancias en el DOM**: con el panel abierto y con el panel colapsado,
`Abrir vista` = 1, `Expandir` = 1, conmutador = 1. Ni dos ni cero, en ningún estado.

Cambio de conducta declarado: en la cabecera del panel, «Abrir vista» y «Expandir» **ya no
dependen de la pestaña activa**. Antes de la ronda 2 solo salían en la de vista previa; ahora
acompañan siempre al conmutador, porque el criterio 3 exige una instancia **en todo momento**.
«Expandir» sigue cambiando solo a la pestaña de vista previa antes de expandir.

### 7.2 La medición que da sentido al encargo

Con el conmutador en cada una de sus dos casas, medido a 1920 px:

| | Borde derecho del botón | Margen a la ventana | Altura |
|---|---|---|---|
| Panel abierto | x = 1896 | 24 px | y = 57 |
| Panel colapsado | x = 1896 | 24 px | y = 57 |

**Desplazamiento 0 en los dos ejes.** El autor lo ve en el mismo píxel.

No salió gratis: en la primera medición el desplazamiento horizontal era de **8 px**, porque la
cabecera del panel usa `px-4` y la barra del lienzo `px-6`. Se igualó con `pr-6` en la cabecera
—solo el lado derecho, para no mover las pestañas— y volvió a medirse en 0.

### 7.3 Criterio 5: el caso apretado se movió de sitio, y es más holgado

El caso justo ya no es la barra del lienzo a 320 px —ahí ya no hay controles, están en el
panel—, sino **la cabecera del panel con las tres pestañas más los tres botones**. Su peor caso
en modo ancho es la ventana a 1200 px, donde el panel se queda en su suelo de **896 px**:

- Cabecera 896 px, contenido 896 px, **sin desbordar**.
- Pestañas 354 px + acciones 313 px = 667 px, con **189 px de holgura**.
- Conmutador entero dentro, a 24 px del borde. **Nada se recorta**, así que no hubo parada.

Comprobado además que el arreglo de la ronda 2 sigue en pie: a 1280 px con el panel abierto, el
lienzo mide 320 px y su barra **no desborda** (contenido 320 = ancho 320), ahora con menos
presión porque solo lleva «Insertar JSON» y el contador. Al colapsar, la barra pasa a 1216 px y
el conmutador mantiene los mismos 24 px de margen.

### 7.4 Lo que no cambió, vuelto a medir (criterio 6)

| Medida | Ronda 2 | Ronda 3 |
|---|---|---|
| Lienzo al colapsar | 960 → 1856 px | **960 → 1856 px** |
| Recompilaciones al colapsar | 0 | **0** |
| «Abrir vista» colapsado | 0 recompilaciones, URL de sesión correcta | **0, misma URL y mismo nombre de ventana** |
| «Expandir» colapsado | 1 llamada, con iframe ya montado | **1 llamada, con iframe ya montado** |
| Ciclo con «Paleta de colores» | 0 | **0** |
| Pestaña activa tras colapsar/restaurar | sobrevive | **sobrevive**, Guía deshabilitada sin selección |
| Recarga estando colapsado | llega colapsado con salida visible | **ídem, ahora en la barra del lienzo** |
| Cruces del breakpoint colapsado | sin estados sin salida | **ídem, verificados los dos sentidos** |

Al retirar el grupo de la cabecera del panel para reconstruirlo, `handleOpenPreview`,
`handleExpandPreview` y `isPreviewActionDisabled` quedaron sin uso dentro de `RightPanel`:
**retirados**, no comentados. Los botones de las dos casas llaman ahora exactamente a los
mismos manejadores de `EditorPage`, así que hay **una sola conducta**, no dos parecidas.

### 7.5 Números del cierre de la ronda 3

- **Suite 436/436**, ninguna prueba tocada. **Lint exit 0, build exit 0.**
- Tres ficheros de código tocados, los del scope. `git status` muestra también `TopBar.jsx`
  porque **el árbol acumula las tres rondas sin commitear**; esta ronda no lo tocó.
- Packet actualizado, no reescrito: **de 11 checks / ~20-25 min a 12 checks / ~22-28 min**, con
  el check 1 comprobando ahora **las dos posiciones y que coinciden en pantalla**, y un check
  12 nuevo para la ventana justa.

---

*Ronda 1: mecanismo de colapso, siete checks pasados en QA.
Ronda 2: los controles bajan de la barra negra; dos defectos propios encontrados y cerrados.
Ronda 3: los controles se anclan al borde derecho de la ventana y caen en el mismo píxel en los
dos estados; el caso apretado se midió en su sitio nuevo y sobra holgura. Sin paradas.
El `status` del run lo cierra la cabina.*
