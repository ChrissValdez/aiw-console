# SANDBOX DEL MARCO DE PREVISUALIZACIÓN

`RUN-CONSOLE-PREVIEW-SANDBOX-001` — «Sandbox the preview frame, so a projects own HTML cannot
reach the console» (`queue_order` 56, derivado del roadmap por orden y verificado contra el
título exacto antes de tocar nada; no se tecleó el id).

**Es una DECISIÓN de seguridad, no una reparación.** El encargo anterior (`#55`, §E.3 de
`REPARACIONES-QA-DEL-REPORTE-CINCO-HALLAZGOS-DEL-OPERADOR.md`) midió la exposición sirviendo el
fixture y **paró** en vez de decidir. Este run re-mide lo mismo, decide el conjunto de tokens,
lo aplica, y enciende la previsualización que el `#55` embarcó pero dejó apagada.

**Todas las cifras son mediciones fechadas del 2026-08-13**, tomadas sirviendo el fixture
(`PC_REGISTRY=tests/fixtures/reports-qa/projects.json`, puerto 8799), no leyendo el código.

---

## 1. LAS CINCO MEDICIONES — re-medidas sirviendo, antes de tocar

Las cinco del `#55` **reproducen idénticas**. El terreno no ha cambiado.

| # | Medición | Valor real (2026-08-13) |
|---|---|---|
| 1 | `<iframe>` de `run-report-renderer.js:596` | **sin `sandbox`** — el JS servido no contiene la subcadena `sandbox` (0 apariciones); el marco vivo del run #3 llega con `hasSandboxAttr:false` |
| 2 | `Content-Security-Policy` en la respuesta | **cero** — medido en entry, JS del renderizador y asset del fixture; ninguna respuesta la lleva |
| 3 | `X-Frame-Options` en la respuesta | **cero** — igual, ninguna de las tres respuestas la lleva |
| 4 | Guarda de las tres rutas de escritura | **el origen es la única puerta** — `roadmap/edit`, `history/sync` y `project/emit` sólo pasan por `isLoopbackPeer` + `isLocalOrigin` (`serve.mjs:325`); nada más las gobierna |
| 5 | POST mismo-origen vs origen ajeno | **422 vs 403** — `roadmap/edit` con `Origin: http://127.0.0.1:8799` → **422** (pasa la puerta, lo para el motor); con `Origin: https://evil.example` → **403 `forbidden_origin`** (lo para la puerta) |

**El detalle que hace concreta la medición 5, y que decide todo lo demás:** un `Origin: null`
—el que un documento enmarcado con `sandbox` sin `allow-same-origin` está OBLIGADO a enviar—
se midió en **403 `forbidden_origin`** en las tres rutas. `isLocalOrigin` sólo admite host
`127.0.0.1`, `localhost` o `::1`; `null` no parsea a ninguno y cae por el `catch` a `false`.
**La puerta que ya existe rechaza el origen opaco sin tocarla.**

Nota de higiene: durante la medición, el POST mismo-origen a `project/emit` respondió **200** y
re-emitió el `.project/` del fixture (cuatro ficheros). Se **restauró byte a byte desde HEAD**
con `git show` (lectura pura), y `git status` sobre `tests/fixtures/reports-qa/.project/` quedó
limpio. Ninguna otra ruta escribió.

---

## 2. EL CONJUNTO DE TOKENS ELEGIDO, Y POR QUÉ

**`sandbox=""` — el conjunto de tokens VACÍO.** Es la recomendación medida del `#55`: `sandbox`
**sin** `allow-same-origin`.

**Qué compra, medido en vivo sobre el run #3:**

- El marco pasa a **origen opaco**. Alcanzarlo desde el padre lanza `SecurityError` y
  `contentDocument` es `null`: **cae el acceso al DOM de la consola**, incluido el nombre que el
  operador teclea en el veredicto.
- Toda petición desde dentro sale con **`Origin: null`**, que la guarda ya existente rechaza en
  **403** (medición 5). Las tres rutas de escritura quedan fuera de alcance **sin tocar la
  guarda**.
- `sandbox=""` bloquea además scripts, formularios, plugins, popups y navegación del top. Una
  previsualización **es un documento para LEER**; no necesita ninguna de esas capacidades.

**Por qué NINGÚN token más.** Cada token que se añada aquí ensancha lo que el HTML de
**cualquier** proyecto puede hacer dentro de la consola. Los dos assets del fixture
(`leccion-web.html`, `leccion-slide.html`) son inertes por construcción —cero `<script>`, cero
`<form>`, cero recurso remoto— así que **renderizan idéntico** bajo el conjunto vacío. Conceder
un token para un asset que no lo usa sería abrir la puerta sin nadie que la cruce. En particular
**`allow-same-origin` no se concede jamás**: devolvería al marco el origen de la consola y con
él las dos cosas que este run existe para cortar.

**Qué queda abierto con esta elección:** nada de la exposición medida. El conjunto vacío corta
las dos vías (DOM y rutas de escritura) a la vez. Lo que queda abierto es de OTRA capa y está en
§5.

---

## 3. LAS TRES PRUEBAS — la entrega de verdad

Suite nueva: `tests/run-report-preview-sandbox.test.mjs` (8 tests). El renderizador se carga
entero en `node:vm` como las otras suites de reporte; el servidor es el `serve.mjs` real
escuchando en puerto efímero contra un registry generado en un temp dir, así que nada que estas
pruebas admitan o rechacen toca un repositorio real.

**(a) Los dos assets se siguen pintando igual.** `con previewBase, both lesson panes frame
previewBase + declared path`: los dos paneles del run #3 enmarcan exactamente
`previewBase + path` declarado, la URL que el sondeo verificó. Un segundo test fija que sin
`previewBase` el path viaja intacto (el pin del `#55` sigue vivo), y un tercero fija que los dos
assets no usan nada que `sandbox=""` deniegue, así que pintan igual enmarcados o no.

**(b) Desde dentro del marco no se alcanza el DOM de la consola.** El barrido `every preview
frame carries sandbox with the EMPTY token set` recorre **cada tarjeta de cada fixture, en los
dos idiomas**, y exige `sandbox=""` (ni ausente, ni con tokens). Un test aparte exige que
`allow-same-origin` **nunca** aparezca. Verificado además en vivo: el marco del run #3 responde
`opaque:SecurityError` al intentar leerlo desde el padre.

**(c) Desde dentro del marco, un POST a cualquiera de las tres rutas NO pasa la guarda.**
`Origin: null — what a sandboxed frame is forced to send — is refused at 403 on all three write
routes, and nothing is written`: contra el `serve.mjs` real, un POST con `Origin: null` a las
tres rutas → **403 `forbidden_origin`**, y se verifica que el canonical **no se movió** (mtime
incluido) y que la carpeta `.project/` **no se creó**. Un control mismo-origen llega a **422**
(motor), probando que el 403 es la GUARDA y no una ruta rota detrás.

**La (c) está escrita para fallar si alguien vuelve a quitar el `sandbox`.** Probado: al retirar
`sandbox=""` del renderizador, el barrido (b) se pone **rojo** (7 pass / 1 fail) porque los
marcos dejan de llevar el atributo; restaurado, vuelve a **8/8**. La cadena entera es una sola
pieza: quita el atributo y (b) enrojece; enseña a la guarda a aceptar `null` y (c) enrojece. No
hay forma de reabrir la exposición que deje esta suite verde.

---

## 4. LO QUE TAMBIÉN SE ENCENDIÓ — criterio 5

El `#55` embarcó los assets pero el marco **no los pintaba**: el sondeo usaba `previewBase + path`
y respondía 200, así que el panel se volvía `<iframe>`; pero el `src` del iframe usaba el `path`
**pelado**, que resolvía contra la URL del DOCUMENTO (`/project-console/`) → **404**, y el marco
pintaba «not found». Dos lecturas del mismo path que discrepaban.

Se unificó: `previewBase` vive ahora en `state.previewBase`, y **el sondeo y el constructor del
panel leen el mismo campo**, así que la URL enmarcada es siempre la que se verificó y no pueden
volver a divergir. Verificado por el camino REAL de la UI: clic en el chip `reports-qa` →
`REPO_BASE=/projects/reports-qa/` → abrir el run #3 → **los dos paneles pintan de verdad**
(443×432, cero paneles «missing»), ambos `sandbox=""` y opacos. **Queda listo para el operador.**

---

## 5. CRITERIO 6 — `X-Frame-Options` y `Content-Security-Policy`: medidos, y NO entran en este run

Medidos: **cero de cada uno** (mediciones 2 y 3). **Decisión: son OTRO run.** La palabra es
deliberada.

**Por qué no entran.** Atacan una amenaza DISTINTA de la medida. `X-Frame-Options` y
`Content-Security-Policy: frame-ancestors` gobiernan **quién puede enmarcar a la consola**
(clickjacking: una página ajena metiendo la consola en su propio iframe). No tocan lo que el
marco de previsualización de la consola puede hacer hacia dentro, que es la exposición que este
run mide y cierra. Esa —HTML de un proyecto alcanzando el DOM y las rutas de escritura— queda
**cerrada entera por `sandbox=""`**, a nivel del marco, con precisión que una cabecera de
respuesta no da.

Meter aquí una cabecera de respuesta que constriñera el asset enmarcado sería un **segundo
mecanismo, del lado del servidor** (`serve.mjs`), solapando el control a nivel de marco que ya
cierra el agujero, y a cambio de defensa en profundidad contra una amenaza que este run no midió.
Endurecer las cabeceras de transporte de la consola (CSP, `X-Frame-Options`, `frame-ancestors`)
es una pieza coherente y separada, con sus propias decisiones —qué política, en qué rutas, cómo
convive con la previsualización— y **es su propio run**. Se nombra, no se mete de contrabando ni
se calla.

---

## 6. LO QUE NO SE TOCÓ, Y LA BASE

**La guarda de origen del servidor se midió, no se tocó.** `isLocalOrigin` (`serve.mjs:325`)
está intacta; este run **se apoya** en ella (rechaza `Origin: null`), no la modifica. **No se
debilitó ninguna guarda para hacer funcionar nada. No se añadió ninguna dependencia** — la
consola declara «zero dependencies» y no tiene paso de build; el cambio es un atributo HTML y el
enrutado de un campo de estado, Node/DOM puros.

**`roadmap/roadmap.json` y los siete de `.project/` NO se tocaron.** Llevan la inserción y
apertura de este run sin commitear y siguen igual. Verificado **en LF**: `git ls-files --eol` los
da `i/lf w/lf`, y el conteo de bytes CR es **0** en los ocho (y en los cuatro del `.project/` del
fixture que se restauraron). No hubo git de ninguna forma que escriba; el status del run sin
tocar; `.project/` sin re-emitir. El `POST` del veredicto es el `#57`.

**Base de tests.** El encargo anterior cerró en 659/658/1; se re-midió idéntica al empezar.

| | tests | pass | fail |
|---|---|---|---|
| Al empezar | 659 | 658 | 1 |
| Al cerrar | **667** | **666** | **1** |

Los 8 nuevos son la suite de este run. **El único fallo es el mismo de antes: el pin de
`classification-care-budget.test.mjs:153`, que no se repara.** Verde re-verificado en las suites
que el ticket nombra: `run-report-domain-blind` (el renderizador **sigue ciego al dominio**),
`run-report-surface` (#53), `run-report-verdict-model` (#54), `run-report-qa-repairs` (#55),
`run-report-route-from-run`, `reports-qa-fixture`, `serve-write-routes` y `serve-project-emit` —
**105/105** juntas.

---

## A. Qué se entregó, y dónde

| Pieza | Ruta |
|---|---|
| `sandbox=""` en el `<iframe>` del panel de previsualización | `run-report-renderer.js:607` |
| `previewBase` unificado en `state` (sondeo y panel leen el mismo campo) | `run-report-renderer.js` (`rrInitialState`, `rrPreviewsHtml`, `rrCheckPreviews`, `renderRunReport`) |
| Suite nueva de la decisión (8 tests: barrido de sandbox, opaque origin, las tres rutas a 403 con `Origin: null`, control mismo-origen a 422) | `tests/run-report-preview-sandbox.test.mjs` |
| Este record | `context/aiw-console/records/SANDBOX-DEL-MARCO-DE-PREVISUALIZACION.md` |
