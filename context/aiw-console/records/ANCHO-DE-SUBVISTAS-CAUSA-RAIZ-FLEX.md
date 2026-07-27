# ANCHO DE SUBVISTAS — la causa raíz era el margen `auto` sobre un ítem flex

> Encargo de taller. Cierre del defecto reportado por el operador: **la SEGUNDA subvista de una
> pestaña con navegación interna se renderizaba más angosta que la primera** (Roadmap: "Roadmap"
> vs "Run Queue"; Status: "Console Diagnostics" vs "Governance State").
>
> Fecha: 2026-07-27. **No es rediseño.** No se tocó un color, una tipografía, una jerarquía, un
> componente ni una estructura. El diff es de `width`, y de nada más.
>
> **Ningún comando de git que escriba.** Git se ejecutó en SOLO LECTURA (`status`, `diff`,
> `show`) para acotar el diff y para probar que `cantu-studio` quedó intacto.
>
> **Archivos escritos por este trabajo, y ninguno más:**
> `project-console/assets/project-console.css` (tres declaraciones, todas de `width`) · este
> record.
> **No se tocó** `index.html`, ni el renderer, ni los tests (no hizo falta: ninguno fijaba
> anchos, y la suite quedó verde sin cambios), ni el roadmap, ni `DECISIONES.md`, ni
> `CONTRATO.md`, ni ningún record existente, ni el fork D-035 (`docs/project-console/`), ni el
> prototipo retirado (`console/`), ni el tooling viejo.
> **`cantu-studio` no fue modificado en ninguna forma** — `git status --porcelain` en su raíz
> devuelve vacío, antes y después.
> **No se emitió ni se stubbeó ninguna de las nueve fuentes diferidas.** El panel "Not emitted by
> this project" quedó exactamente como estaba: dice la verdad. Esa decisión es de `O4.P5`.

---

## 1 — El defecto, medido antes de tocar nada

Las mediciones son `getBoundingClientRect().width` del panel de la pestaña (`#tab-roadmap` /
`#tab-status`) y de la subvista, más `marginLeft`/`marginRight` computados, tomadas en el DOM
vivo servido por `project-console/serve.mjs`, en los **dos proyectos reales**.

A **1280** de viewport el defecto **no se ve**, y por eso costó ubicarlo: las cuatro subvistas
medían `962.4px` en los dos proyectos. A **1920** aparece entero:

### ANTES — viewport 1920 (columna de contenido disponible: `1602.4px`)

| Proyecto | Pestaña | Subvista | Ancho | Márgenes laterales |
|---|---|---|---|---|
| aiw-console | Roadmap | 1 · Run Queue | **1602.4** | `0 / 0` |
| aiw-console | Roadmap | 2 · Roadmap | **1602.4** | `0 / 0` |
| aiw-console | Status | 1 · Governance State | **1602.4** | `0 / 0` |
| aiw-console | Status | 2 · Console Diagnostics | **1270.0** | `166px / 166px` |
| cantu-studio | Roadmap | 1 · Run Queue | **1602.4** | `0 / 0` |
| cantu-studio | Roadmap | 2 · Roadmap | **875.0** | `363.47px / 363.47px` |
| cantu-studio | Status | 1 · Governance State | **1602.4** | `0 / 0` |
| cantu-studio | Status | 2 · Console Diagnostics | **1285.5** | `158.27px / 158.27px` |

Diferencias: **332px** en Status de `aiw-console`, **727px** en Roadmap de `cantu-studio`,
**316.5px** en Status de `cantu-studio`.

Dos hechos de esa tabla mandan sobre cualquier hipótesis:

1. **Los márgenes laterales aparecen de la nada.** El CSS no declara `166px` ni `363.469px` en
   ninguna parte. Son márgenes `auto` resueltos: el navegador repartió el sobrante. El panel se
   estaba **encogiendo**, y los márgenes solo hacían visible el hueco.
2. **Roadmap de `aiw-console` NO se encoge, y Roadmap de `cantu-studio` sí.** Misma pestaña,
   mismo CSS, mismos contenedores, distinto resultado según el proyecto. Eso descarta de entrada
   "una restricción de ancho propia del contenedor de la segunda subvista": un `max-width` en el
   CSS no cambia de opinión según qué datos cargó.

También se midieron los contenedores de subvista en sí. `.roadmap-subview` y `.status-section`
midieron **siempre el 100% de su padre**, en las ocho combinaciones, antes de la corrección
incluida. **El contenedor de la subvista nunca estuvo mal.** Lo que se movía era el padre.

---

## 2 — La causa raíz

Una sola causa, no dos.

El arreglo del banner de fuentes opcionales (defecto anterior, Docs) convirtió la columna de
contenido en columna flex:

```css
.content {
  display: flex;
  flex-direction: column;
}
```

Desde entonces, **cada panel de pestaña es un ítem flex**. Y los paneles se centran con el idioma
de bloque de siempre:

```css
#tab-roadmap, #tab-overview, #tab-history { max-width: var(--pc-content-max); margin: 0 auto; }
#tab-status                                { max-width: var(--pc-content-max); margin: 0 auto; }
#load-notice                               { max-width: var(--pc-content-max); margin: 0 auto 16px; }
```

En layout de bloque, `margin: 0 auto` con `max-width` significa "ocupá la columna, y centrate si
el `max-width` muerde". En layout flex significa otra cosa. Esos son márgenes `auto` en el **eje
transversal**, y por CSS Flexbox §8.1 los márgenes `auto` del eje transversal **absorben el
espacio libre y anulan el `align-self: stretch` por defecto** — el `stretch` no se aplica cuando
hay un margen `auto` en ese eje.

Sin `stretch`, el tamaño transversal del ítem cae a `fit-content`. Y `fit-content` es
`min(max-content, espacio disponible)`. Es decir: **el ancho del panel de la pestaña pasó a
seguir el ancho intrínseco de la subvista que estuviera visible en ese momento.**

Eso explica la tabla completa, línea por línea:

- Las primeras subvistas (colas de runs, secciones de gobernanza) tienen contenido que **llena**:
  su `max-content` supera el ancho disponible, `fit-content` se topea en el disponible, y el
  panel se ve correcto. Por accidente, no por diseño.
- Las segundas subvistas son intrínsecamente más angostas — el árbol de objetivos, la grilla de
  diagnóstico — así que `fit-content` cae por debajo del disponible y el panel se encoge. Los
  márgenes `auto` reparten el sobrante en dos gutters laterales.
- El árbol de objetivos de `aiw-console` da la casualidad de tener un `max-content` ≥ 1602.4, así
  que ahí **no se notaba**. Mismo defecto, tapado por los datos.
- A 1280 el disponible (962.4) es menor que el `max-content` de las cuatro subvistas, así que
  `fit-content` se topea siempre y **el defecto queda invisible**. Por eso hay que medir ancho.

La reformulación corta: **no era el contenedor de la segunda subvista, era el panel de la pestaña
midiéndose por su contenido en vez de por su columna.** El síntoma se veía en la segunda subvista
solo porque la segunda subvista es la que suele tener contenido angosto.

Nota sobre lo que ya estaba decidido, que **no** era la causa y **no** se cambió:
`--pc-content-max` sigue en `100%` y `--pc-content-pad` sigue en `28px`. La medición no los
implica. Al contrario: el token en `100%` es justamente lo que hacía que el clamp
`min(max-content, disponible)` tapara el defecto a 1280.

---

## 3 — La corrección

Genérica, por propiedad de la columna, no por parche de subvista:

```css
.content > * {
  width: 100%;
}
```

Con un ancho **definido**, los márgenes `auto` no tienen espacio libre que absorber: se resuelven
en `0` y el ítem ocupa la columna entera. Si algún día `--pc-content-max` vuelve a un valor menor
que `100%`, el ancho usado pasa a ser `min(100%, max-width)` y **los mismos márgenes `auto`
siguen centrando**. No se pierde nada del comportamiento anterior; se recupera el que la capa de
bloque daba gratis.

No es un idioma nuevo en este CSS: es exactamente el que `.portfolio-shell` ya usaba y por el que
la vista Portfolio nunca sufrió el defecto:

```css
.portfolio-shell { width: 100%; max-width: 1480px; margin: 0 auto; }
```

Como la regla vive en la columna y no en un panel, **cualquier subvista de cualquier pestaña
hereda el comportamiento corregido, incluidas las pestañas que se agreguen después.** No hay nada
que recordar agregarle a un panel nuevo.

### La única excepción, y por qué es una excepción y no una segunda causa

En modo Docs la columna **entrega su propio padding** al panel (`padding: 0`), y el banner de
fuentes opcionales lleva la sangría en sus **propios** márgenes horizontales:

```css
.content:has(> #tab-docs.active) > #load-notice { margin: 28px var(--pc-content-pad) 16px; width: auto; }
```

Ahí los márgenes son longitudes reales, no `auto`. Nada anula el `stretch`, así que el ítem se
estira solo y `width: 100%` **sobraría y rompería**: sumaría la sangría encima de una caja ya de
ancho completo y metería scroll horizontal. `width: auto` deja que el `stretch` haga la cuenta
correcta: columna − márgenes. Es la misma regla ya existente, completada — no un segundo
diagnóstico.

Su espejo en el breakpoint angosto, donde la columna recupera el padding y el banner vuelve a
centrarse con márgenes `auto`, vuelve a necesitar el ancho definido:

```css
@media (max-width: 1040px) {
  .content:has(> #tab-docs.active) > #load-notice { margin: 0 auto 16px; width: 100%; }
}
```

### Diff completo

Tres declaraciones tocadas, las tres de `width`. Cero cambios de color, tipografía, jerarquía,
componentes o estructura. `--pc-content-max` y `--pc-content-pad` sin tocar.

```diff
-.content:has(> #tab-docs.active) > #load-notice { margin: 28px var(--pc-content-pad) 16px; }
+.content:has(> #tab-docs.active) > #load-notice { margin: 28px var(--pc-content-pad) 16px; width: auto; }

+.content > * {
+  width: 100%;
+}

 @media (max-width: 1040px) {
-  .content:has(> #tab-docs.active) > #load-notice { margin: 0 auto 16px; }
+  .content:has(> #tab-docs.active) > #load-notice { margin: 0 auto 16px; width: 100%; }
 }
```

(Más los comentarios que explican la causa en el archivo, para que el próximo que mueva
`display: flex` en `.content` sepa qué se lleva puesto.)

---

## 4 — Mediciones DESPUÉS

Mismo método, mismos selectores, mismos dos proyectos.

### Las cuatro subvistas del encargo

| Proyecto | Pestaña | Subvista | 1280 | 1920 |
|---|---|---|---|---|
| aiw-console | Roadmap | 1 · Run Queue | **962.4** | **1602.4** |
| aiw-console | Roadmap | 2 · Roadmap | **962.4** | **1602.4** |
| aiw-console | Status | 1 · Governance State | **962.4** | **1602.4** |
| aiw-console | Status | 2 · Console Diagnostics | **962.4** | **1602.4** |
| cantu-studio | Roadmap | 1 · Run Queue | **962.4** | **1602.4** |
| cantu-studio | Roadmap | 2 · Roadmap | **962.4** | **1602.4** |
| cantu-studio | Status | 1 · Governance State | **962.4** | **1602.4** |
| cantu-studio | Status | 2 · Console Diagnostics | **962.4** | **1602.4** |

Márgenes laterales computados: `0px / 0px` en las ocho. Los gutters fantasma desaparecieron.

Y no solo el contenedor: el contenido pintado más externo de cada subvista mide lo mismo y arranca
en el mismo píxel. A 1920, `cantu-studio` (el peor caso previo, 875 vs 1602):

| Elemento | left | right | ancho |
|---|---|---|---|
| `#run-queue-v3` (sub 1) | 284 | 1886.4 | 1602.4 |
| `#roadmap-v3-tree` (sub 2) | 284 | 1886.4 | 1602.4 |
| `#roadmap-v3-tree > .v3-objective-card` | 284 | 1886.4 | 1602.4 |
| `#status-governance > .gov-section` (sub 1) | 284 | 1886.4 | 1602.4 |
| `.sources-grid` (sub 2) | 284 | 1886.4 | 1602.4 |

`.sources-grid` pasó de columnas de `469px` (encogida) a `789.2px`, sin tocar la grilla: su
`1fr 1fr` siempre estuvo bien, lo que le faltaba era el ancho del padre.

### El padding de 28px, verificado

Borde izquierdo del contenido en las cuatro subvistas: **284px** = 256 (sidebar) + 28 (padding).
Borde derecho: **1886.4** = 1920 − 28 (padding) − 5.6 (scrollbar). Idéntico entre subvistas y
entre pestañas. El valor no se tocó y ahora **se ve** consistente, que antes no pasaba: con el
panel encogido la sangría aparente era de 166px o de 363px según la subvista.

---

## 5 — Barrido de scroll horizontal

Criterio: `document.documentElement.scrollWidth === clientWidth` **y**
`.content.scrollWidth === .content.clientWidth`. Las cinco pestañas, las dos subvistas de las dos
pestañas con navegación interna, los dos proyectos reales, **con banner visible y sin banner**, en
1280 y 1920 — más 1000, que no lo pide el encargo pero es donde vive el breakpoint de Docs que
esta corrección toca.

| Viewport | Proyecto | Banner | Resultado |
|---|---|---|---|
| 1280 | aiw-console | sin | limpio — doc `1280/1280`, columna `1018/1018` |
| 1280 | cantu-studio | sin | limpio — doc `1280/1280`, columna `1018/1018` |
| 1280 | aiw-console | **con** | limpio en las 5 pestañas + las 2 segundas subvistas |
| 1280 | cantu-studio | **con** | limpio en las 5 pestañas + las 2 segundas subvistas |
| 1920 | aiw-console | sin | limpio — doc `1920/1920`, columna `1658/1658` |
| 1920 | cantu-studio | sin | limpio — doc `1920/1920`, columna `1658/1658` |
| 1920 | aiw-console | **con** | limpio en las 5 pestañas + las 2 segundas subvistas |
| 1920 | cantu-studio | **con** | limpio en las 5 pestañas + las 2 segundas subvistas |
| 1000 | ambos | **con** | limpio — rama `≤1040` de Docs, doc `1000/1000`, columna `744/744` |

**Cero scroll horizontal en las 34 combinaciones medidas.**

El banner, además, dejó de sufrir el mismo defecto que los paneles (tenía el mismo
`max-width` + `margin: 0 auto`): ahora mide exactamente lo que mide el panel de la pestaña, con
el mismo borde izquierdo. En Docs mantiene su sangría propia de 28px y arranca en el mismo 284px
que el contenido de las demás pestañas. Lo que el comentario de `#load-notice` decía que quería
desde `O4.P13`, ahora es cierto.

---

## 6 — Regresión: Docs sigue como quedó

Verificado en el DOM vivo, no en el código:

- **`cantu-studio`: 38 documentos** en el nav, en **9 categorías** — Architecture (5),
  Components (17), Decisions (6), Docs Management (1), Governance (1), How-To (2),
  Operations (2), Reference (3), Start Here (1).
- **Subgrupos anidados vivos**: la clase `docs-nav-group docs-nav-subgroup` está presente, y
  Components (17) muestra su subgrupo `Web (17)`.
- **`aiw-console`: agrupación por carpeta** — Console (1), Context (30) con su subgrupo
  `context/` (4), AIW-Console (21) con su subgrupo Records (20).
- **Regla `archive/` activa**: ningún grupo `Archive` pintado en ninguno de los dos proyectos, y
  la suite mantiene sus siete pruebas específicas de la regla (incluida la de `cantu-studio` con
  datos reales) en verde.

Nada de esto podía romperse con un cambio de `width`, pero se midió igual.

---

## 7 — Suite

`node --test` → **192 pruebas, 192 en verde, 0 fallas, 0 saltadas.**

**Ningún test fijaba anchos**, así que no hubo nada que actualizar ni que declarar. La suite
ejercita el modelo, los emisores, la agrupación de docs, el shell multiproyecto y las rutas de
escritura; el layout de la columna no está cubierto por ella y este trabajo no cambió eso — ver
§9.

---

## 8 — Aditividad y proyecciones

- **No se re-emitió ningún `.project/` por este cambio.** El cambio es CSS: no lo exige y no lo
  disparó.
- **La proyección de AIW por el camino viejo no fue tocada**: nada bajo `aiw/` tiene mtime
  posterior al inicio de este trabajo, y ese repo sigue sin `.aiw/views/` (la consola lo lista
  como "no snapshot", que es la verdad). Emitir para `aiw` es `O4.P6` y aquí no se hizo.
- **`cantu-studio` intacto**: `git status --porcelain` vacío en su raíz. Ni sus docs, ni su índice
  curado, ni su `.project/`.
- **Una observación honesta, que no es de este cambio:** el árbol de trabajo de este repo tiene
  `.project/git_history.json` modificado. Su diff es solo un refresco de historia —
  `generated_at`, el `mtime` de `.git`, y el alta del commit `d5f337b` (*"docs: agrupacion por
  ruta con jerarquia, regla archive y padding"*), que es **el commit de la fase anterior**, hecho
  a las 14:21, antes de que empezara este trabajo. La única ruta que escribe ese archivo es el
  `POST .../history/sync` (botón manual de la pestaña History) contra el servidor que ya estaba
  corriendo cuando llegué; ni mis mediciones ni la suite lo tocan (la suite corrió después). Lo
  dejo como está y lo declaro: no lo produjo esta corrección, su contenido es más correcto que el
  anterior, y revertirlo exigiría un git que escriba, que está fuera de alcance.

---

## 9 — Qué queda abierto

1. **La suite no cubre ancho de layout.** Este defecto vivió dos fases sin que ningún test lo
   viera, y a 1280 ni siquiera se ve a ojo. La suite corre sobre un harness de DOM sin motor de
   layout, así que `getBoundingClientRect` no significa nada ahí: una prueba de verdad necesita
   un navegador headless, que hoy es una dependencia que este repo no tiene (cero dependencias es
   una propiedad declarada). Queda como decisión, no como tarea: o se acepta la dependencia, o el
   ancho se sigue verificando por QA humano con el procedimiento del reporte.
2. **La trampa sigue armada para el próximo.** `display: flex` en `.content` cambia el
   significado de `margin: 0 auto` en todo hijo de la columna. Está comentado en el archivo, en
   los dos lugares, pero es conocimiento en un comentario, no una barrera. Si alguna vez se
   agrega un hijo a `.content` con márgenes horizontales propios, hay que darle `width: auto`
   como al banner de Docs.
3. **Overview mide 1608 y las demás pestañas 1602.4.** Los `5.6px` son la barra de scroll
   vertical: el contenido de Overview no desborda, así que su columna no la muestra. Es
   preexistente, no es este defecto, no produce scroll horizontal y no se tocó — pero si el
   rediseño quiere que las cinco pestañas midan idéntico, `scrollbar-gutter: stable` en `.content`
   es la palanca. Es decisión de la fase de rediseño, no de esta.
4. **Las nueve fuentes diferidas siguen diferidas**, y el panel "Not emitted by this project"
   sigue diciendo la verdad. `O4.P5`.

---

## 10 — REPORTE PARA QA

### Cómo arrancar

Desde la raíz de `aiw-console`:

```bash
./start-console.cmd
```

Abre `http://127.0.0.1:8788/project-console/index.html`. (Si ya hay un servidor en ese puerto, el
launcher lo baja primero; si preferís otro puerto, `PC_PORT`.) Hacé **recarga dura** (`Ctrl+F5`):
el CSS cambió y el del caché es el viejo.

### Qué mirar — el defecto se ve a partir de ~1500px de ancho, NO a 1280

Este es el punto que cuesta: **a 1280 el defecto era invisible**. Maximizá la ventana en un
monitor ancho, o poné el navegador a 1920. Si mirás a 1280 vas a ver todo bien tanto con el
arreglo como sin él.

**Las cuatro subvistas, en los dos proyectos (`AIW Console` y `Cantu Studio` en la barra
lateral):**

1. **Roadmap → "Run Queue"** — anotá dónde termina el contenido a la derecha.
2. **Roadmap → "Roadmap"** — clic en el segundo segmento. El árbol de objetivos tiene que
   terminar **en el mismo píxel** que la cola. Antes, en `Cantu Studio`, se encogía a poco más de
   la mitad y quedaba flotando al medio con dos huecos enormes a los lados. Ese es el síntoma que
   no debe volver.
3. **Status → "Governance State"** — anotá el borde derecho.
4. **Status → "Console Diagnostics"** — clic en el segundo enlace. Los tres paneles
   (State Sources / Repo Structure / Console Source Files) tienen que llegar al mismo borde. El
   panel ancho de arriba llega de punta a punta, y los dos de abajo parten esa misma anchura al
   medio.

El chequeo rápido, sin regla: **al alternar entre las dos subvistas de una pestaña, el borde
derecho del contenido no se debe mover.** Ni un píxel. Si salta, volvió el defecto.

**Barrido de scroll horizontal** — las cinco pestañas (Overview, Roadmap, History, Docs, Status),
las dos subvistas donde las hay, los dos proyectos, a 1280 y maximizado: **no debe aparecer barra
horizontal abajo**, ni en la página ni dentro de la columna de contenido.

**El banner amarillo** (aparece cuando alguna fuente opcional falla; hoy no se enciende solo en
ninguno de los dos proyectos): si lo ves, tiene que arrancar y terminar **alineado con el
contenido de abajo**, incluida la pestaña Docs, donde mantiene su sangría propia.

**La sangría lateral** son 28px a cada lado y tiene que verse **igual entre subvistas**. Si una
subvista se ve "más metida" que la otra, eso es el defecto, no el padding.

**Docs, sin regresión:** `Cantu Studio` → Docs debe listar **38 documentos** en **9 categorías**,
con Components desplegando su subgrupo **Web (17)**; `AIW Console` → Docs debe seguir agrupado por
carpeta, con Context y AIW-Console mostrando sus subgrupos. **Ningún grupo llamado `Archive` en
ninguno de los dos.**

### Lo que este trabajo NO cambió, para que no lo reportes como faltante

- El panel **"Not emitted by this project"** sigue igual, con sus nueve fuentes. Es correcto: esas
  fuentes no se emiten y el panel lo dice. Decidirlo es `O4.P5`.
- Colores, tipografías, jerarquía y componentes: **idénticos**. Si algo se ve distinto más allá de
  ancho y sangría, es un hallazgo y hay que reportarlo.
- El proyecto `aiw` sigue mostrando "no snapshot". Es `O4.P6`.
