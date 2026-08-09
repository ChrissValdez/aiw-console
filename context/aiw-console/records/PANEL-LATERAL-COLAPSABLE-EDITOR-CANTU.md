# Panel lateral colapsable del editor — colapsar y restaurar la columna derecha

Run canónico: `RUN-CANTU-EDITOR-SIDE-PANEL-COLLAPSE-001`, `queue_order` 37, `status: active`.
Guarda de título verificada contra `.aiw/roadmap/roadmap.json`: coincide exacta. Objetivo O4,
fase O4.P5.

Una ronda. Tres ficheros tocados, ninguno más:
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

*Una ronda, sin paradas: ninguna guarda del ticket disparó — la mitad construida se reutilizó
sin cambiar la conducta del modo estrecho, la persistencia ya existía y se extendió por su
misma vía, y ningún estado quedó sin salida visible. El `status` del run lo cierra la cabina.*
