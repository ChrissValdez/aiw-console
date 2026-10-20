# El reporte HTML de cada hilo · v1 — dónde vive, cómo lo enlaza la consola, cómo vuelve el veredicto

> **BORRADOR, 2026-10-20. NO CONGELADO.** Lo emite `RUN-CONSOLE-THREAD-HTML-REPORTS-CONTRACT-001`
> (`#70`) del hilo `aiw-console`, a partir de la propuesta medida en
> `context/aiw-console/records/PROPUESTA-FASE-1-70-REPORTES-HTML-DE-CADA-HILO-2026-10-19.md`.
> El operador aprobó sus seis recomendaciones el 2026-10-20, verbatim:
>
> > «La cabina aprueba las seis recomendaciones de la propuesta del #70, incluida la ampliación de
> > alcance a roadmap-core.mjs, CONTRATO §10.a y la cabecera en serve.mjs. Construye la Fase 2.»
>
> **Se congela cuando el piloto, `cantu-lessons`, devuelva su veredicto sobre él** (D-076). Hasta
> entonces se puede enmendar con lo que el piloto mida.

**Lo que fija este contrato:** dónde vive el reporte de un run, cómo lo enlaza la consola y cómo
vuelve a disco el veredicto del operador.

**Lo que NO fija:** cómo es el reporte por dentro. Cada hilo lo escribe en HTML, con el formato que
su proyecto necesite (D-076). La consola no lo lee, no lo pinta, no lo adapta y no lo juzga.

---

## 1. Dónde vive — el run lo dice

El reporte vive **donde el proyecto ya lo produce**. No se mueve, no se copia y no se fabrica una
página aparte para la consola (D-075). Lo único que el hilo añade es **una clave en el run** al que
pertenece la página:

```json
"report_html": [
  "lecciones/L18-leer-un-problema-de-fracciones/web.html",
  "lecciones/L18-leer-un-problema-de-fracciones/slide.html"
]
```

La norma de la clave está en `context/aiw-console/CONTRATO.md` §10.a. En corto:

- **Una lista no vacía de rutas relativas a la raíz del proyecto.** Usan `/`, no tienen segmentos
  vacíos, `.` ni `..`, quedan fuera de `.git/` y de `.project/`, y terminan en `.html` (sin
  distinguir mayúsculas). Valen los espacios, los acentos y los paréntesis.
- **Un run sin reporte HTML omite la clave.** La lista vacía se rechaza, y una ruta repetida
  también.
- **Varias páginas por run, en el orden que el hilo quiera.** Un run de lección deja guion, web y
  slide.
- **Dos runs pueden apuntar a la misma página.**
- **El motor no comprueba que la página exista,** porque las páginas generadas suelen estar fuera de
  Git y faltan en un clon recién hecho. Lo comprueba la consola (§2).

**Quién la escribe:** el hilo, en su propio canónico, cuando su run deja una página. En
`cantu-lessons`, eso es cuando la cabina marca un paso («PASOS — se marcan aquí al avanzar»).
**Ningún op de la consola la escribe.**

**Para que la consola la vea,** el `.project/` del proyecto se re-emite, como con cualquier cambio
del canónico. Lo hace la cabina, o el operador con «Re-emit .project/».

## 2. Cómo la enlaza la consola

- **En el detalle del run**, sección **«HTML report»**: un enlace por página, con el nombre del
  fichero, la ruta completa debajo y el orden del run. Un run que no declara nada **no muestra
  nada**, ni «no configurado» (D-075).
- **Cada página se abre en su propia pestaña** (`target="_blank"`, `rel="noopener noreferrer"`),
  servida por la consola en `/projects/<clave>/<ruta>`.
- **Una página declarada que no está en disco se dice:** la consola manda un `HEAD` por página al
  abrir el detalle, y si el servidor contesta que no existe escribe «declared in the run, not on
  disk». Si no pudo preguntar, escribe «could not be checked on disk».
- **Una entrada que no es ruta de página no se enlaza,** y la sección dice cuántas saltó.

### 2.1 La página se abre AISLADA, y el hilo debe contar con ello

Toda respuesta `.html` bajo `/projects/<clave>/` lleva la cabecera:

```text
Content-Security-Policy: sandbox allow-scripts allow-forms allow-popups allow-downloads allow-modals
```

**Por qué:** sin ella, la página de un hilo correría en el mismo origen que las rutas de la consola
que escriben (editar el canónico, re-emitir, firmar un veredicto). El `#56` cerró esa exposición
para la vista previa. Otro puerto u otro nombre de host no basta, porque la puerta de esas rutas
admite cualquier origen local. Sólo un origen opaco basta: una página aislada está obligada a mandar
`Origin: null`, y la puerta lo rechaza con 403.

**Lo que la página del hilo CONSERVA** (medido el 2026-10-19 con páginas reales del piloto):

- sus scripts;
- sus formularios;
- copiar al portapapeles: el «Copiar» de un guion de `cantu-lessons` dio «Copiado ✓»;
- las fórmulas KaTeX desde CDN: 75 fórmulas, 0 errores y el mismo alto que sin aislar;
- abrir otras pestañas, que heredan el aislamiento;
- descargar un fichero;
- los diálogos.

**Lo que la página PIERDE:**

- **El origen de la consola,** y con él, el **almacenamiento del navegador** (`localStorage`,
  `sessionStorage`). Leerlo o escribirlo lanza `SecurityError`.
- **Por eso, todo acceso al almacenamiento va dentro de `try/catch`,** y la página funciona sin él.
  Los guiones de `cantu-lessons` ya lo hacen (`lecciones/_plantilla/guion.js:40-41`).
- **El botón A+/A− de las lecciones que compila Cantu Studio NO lo hace** (`web.html`, «Uncaught
  SecurityError»), así que aislado no cambia la letra. Arreglarlo es de Studio, que está en pausa
  (D-079).

**Para tener la página con todo** (letra A+/A−, elección guardada), el operador la abre desde el
disco. La consola no puede: un enlace `file://` desde la consola da «Not allowed to load local
resource».

## 3. Cómo vuelve el veredicto a disco

Un HTML abierto desde disco no puede escribir en el repo, y aislado tampoco puede escribir a través
de la consola. El veredicto vuelve por tres vías, de base a respaldo:

1. **Copiar.** Un botón en la página copia la respuesta del operador. **La primera línea de lo
   copiado nombra el `run_id` y la página,** para que un veredicto pegado diga qué juzgó; el resto
   es del hilo. Ejemplo:
   ```text
   RUN-LESSONS-ARI-OPERATING-WITH-SIGNS-001 · lecciones/L03-operar-con-signos/guion-web.html v3.9
   L03·S1 = A · L03·S2 = A · L03·EG = A
   ```
   El operador lo pega en cabina, y la cabina lo guarda **verbatim** donde su proyecto guarda
   veredictos.
2. **Descargar,** para un veredicto largo. La página guarda un fichero
   **`veredicto-<run_id>-<AAAA-MM-DD-HHMM>.md`**, que el navegador deja en **Descargas** (una página
   no puede elegir la carpeta del proyecto). La cabina lo encuentra por el `run_id` del nombre y lo
   archiva verbatim en el proyecto. Si el operador prefiere guardarlo él mismo en la carpeta del
   proyecto, el nombre es el mismo.
3. **La cabina, siempre.** El operador dice su veredicto y la cabina lo guarda verbatim.

**La consola no entra en este camino.** No guarda veredictos de estos reportes, y no tiene ruta para
recibirlos.

**Una advertencia:** lo que la página guarda en el navegador no viaja entre sitios. Abierta desde la
consola no guarda nada; abierta desde disco guarda por fichero. Copiar y descargar sacan el
veredicto igual.

## 4. Lo que convive: el formato `report.json`, CONGELADO

El formato de reporte anterior (`reports/<run_id>/report.json`, `docs/SOBRE-DEL-REPORTE-v1.md`)
**sigue funcionando, y no se borra**, para el proyecto que lo usa (`cantu-quizzes-latex`).

- **Su sección «Run report» y su panel «Awaiting a verdict» sólo aparecen** donde el índice del
  proyecto dice que existe `reports/`. En los demás proyectos no aparecen (D-075).
- **No se construye nada nuevo sobre ese formato.** Se decidirá qué hacer con él después del piloto
  (D-076).

Un mismo run puede tener las dos cosas: un `report.json` y un `report_html`. La consola las muestra
en dos secciones distintas.

## 5. La puerta propia del lector de documentos

El lector de documentos (el modal con índice a la izquierda) tiene ahora una puerta propia: el botón
**«Documents»** en la cabecera del detalle de cualquier run.

- Abre los documentos del proyecto activo **encima del run, sin cerrarlo**.
- El botón del mismo nombre dentro de la vista del reporte congelado **se queda**.

## 6. El piloto: `cantu-lessons`

Lo que hace su hilo para adoptar el contrato, en su propio repo. **Este contrato no escribe en él:**

- **Al marcar un paso,** añade a `report_html` del run la página que ese paso dejó. Por ejemplo,
  el `#5` (L03):
  `["lecciones/L03-operar-con-signos/guion-web.html", "lecciones/L03-operar-con-signos/web.html", "lecciones/L03-operar-con-signos/slide.html"]`.
- **El `#11` puede declarar** `lecciones/index.html`.
- **L09B y L20B** no tienen run propio: entran en la lista del `#13` y del `#24`.
- **Si su hilo lo aprueba,** antepone a lo que copia el «Copiar» la línea del `run_id` (§3, punto 1).
- **Re-emite su `.project/`.**

**Lo que el piloto tiene que decir para congelar:**

- si la página se lee y se juzga bien abierta desde la consola, aislada;
- si la pérdida del almacenamiento estorba;
- si copiar y descargar alcanzan para devolver el veredicto;
- si hace falta un «Copiar ruta» con la ruta completa en disco, para abrir la página desde el
  explorador (§7).

## 7. Lo que este contrato NO hace

- **No dicta el contenido ni el estilo de ningún reporte.**
- **No escribe en el repo de ningún hilo:** cada uno lo adopta en el suyo.
- **No obliga a nadie a tener reporte HTML.** Un proyecto sin páginas no ve nada.
- **No hace que la consola lea, valide o pinte un reporte HTML.** Sólo lo enlaza.
- **No borra el formato `report.json`.**
- **No da a la consola la ruta absoluta del proyecto en disco.** Un botón «Copiar ruta» completa
  necesitaría que el servidor la exponga. Quedó fuera de la v1 por decisión del operador, el
  2026-10-20, verbatim: «Deja «Copiar ruta» fuera de esta v1: basta con la ruta relativa que ya se
  ve bajo cada enlace. Lo decidimos después del piloto de CL.»
