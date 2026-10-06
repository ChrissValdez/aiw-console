# Peticiones de Lecciones a Cantu Studio — el estado de cada una

> **Lo mantiene el hilo `cantu-studio`. El hilo LECCIONES (`cantu-lessons`) lo lee de aquí.**
> Es el canal de vuelta del ciclo que el operador acordó el 2026-10-04:
> 1. Lecciones pide en `cantu-lessons/docs/PARA-CANTU-STUDIO-<fecha>.md`.
> 2. El operador lo trae.
> 3. Studio lo construye y lo anota aquí.
> 4. Lecciones lo confirma en una lección real.
>
> **Ningún hilo escribe en el repo del otro.** Lo que Studio decide o entrega sobre una petición,
> lo escribe en este fichero; Lecciones no necesita ningún mensaje para enterarse.
>
> **Última actualización:** 2026-10-06, tras vuestras peticiones 11-13 (`cantu-lessons`:
> `docs/PARA-CANTU-STUDIO-2026-10-05.md`, commit `5e51129`, leída entera) y tras la QA del operador sobre la
> nota junto a la tarjeta, que **corrige la petición 4**. Versiones anteriores: commits `27830f0` y `4b33850`.

---

## Cómo leer este fichero

- **Los runs se citan por su `run_id`**, que no cambia. El número `#N` es una coordenada: el
  orden lo manda la cola de `cantu-studio/.aiw/roadmap/roadmap.json`.
- **Los nombres de componente** son los que se ven en pantalla en el editor. Si una pieza todavía no
  tiene nombre en pantalla, se dice.
- **Estados:** `hecho` · `decidido, en cola` · `cerrado sin construir` · `pendiente`.

---

## Estado de las peticiones

| # | petición | de dónde viene | estado | qué hizo o hará Studio |
|---|---|---|---|---|
| 1 | Los dos «undefined» (`split` e `iconList` con un campo opcional ausente) | `PETICION-DE-COMPONENTES.md` (17-sep), `PARA-CANTU-STUDIO-2026-09-18.md` | **hecho** | `RUN-CANTU-WEB-NO-UNDEFINED-ON-THE-PAGE-001` (#210, 2026-09-19). Verificado el 2026-10-03 por el `#221`: 0 fugas en 39 casos y tres rutas |
| 2 | Modo **bloque** de las fórmulas | `PARA-CANTU-STUDIO-2026-09-18.md`, Petición 1 | **hecho** | `RUN-CANTU-MATH-PROCEDURE-BLOCK-BUILD-001` (#214, pass del operador del 2026-09-21). Es un modo dentro de «Procedimiento matemático» y «Explicación guiada», no un componente aparte |
| 3 | Que la «Nota desplegable» tipografíe fórmulas | `PETICION-DE-COMPONENTES.md`, petición pequeña | **cerrado sin construir: ya lo hacía** | Medido por el `#221`: tipografía el rótulo y el contenido, también plegada. Ya lo hacía el 17-sep: el tipografiado global de la página existe desde el 2026-06-03 (`589e8ceb`). La petición midió el fichero del componente, no la página. **Sin medir:** Moodle (MathJax) |
| 4 | Componer el interior de una «Tarjeta»: una «Nota destacada» dentro | `PARA-CANTU-STUDIO-2026-09-18.md` P2, `-09-19.md` P-B, `-2026-10-03.md` §1 | **CORREGIDA: va DENTRO. Decidido, en cola** | **Studio se equivocó y lo corrige.** El 2026-10-04 os comunicamos que la nota iba JUNTO a la tarjeta (forma B del `#221`), y vosotros lo aceptasteis. El 2026-10-05 el operador lo vio en pantalla (run `RUN-CANTU-HIGHLIGHT-NOTE-BESIDE-THE-CARD-001`) y lo rechazó: *«lo que queria es que la nota destacada estuviera adentro de la tarjeta»*, como la «Clasificación binaria» de la lección de referencia. Era lo que pedisteis tres veces. **La forma decidida el 2026-10-06 (A1):** la «Tarjeta» trae su **propio recuadro interior**, con título y texto, fórmulas y el color de la tarjeta, y sigue siendo autocontenida; no se vuelve contenedor de otros bloques. Runs: `RUN-CANTU-CARD-INNER-BOX-CONTRACT-001` y `RUN-CANTU-CARD-INNER-BOX-EDITOR-001`. En los mismos runs: **la insignia deja de pintar `2N`** y **el texto de la tarjeta admite negrita** («cero», «uno», «Terminación:»). La prueba de terminado es vuestra sección «Pares e impares» escrita desde el editor. **Lo que ya quedó hecho del run anterior:** el título de «Nota destacada» ya no pasa las fórmulas a mayúsculas, en Web y en Diapositiva (pass del operador, 2026-10-06). **Vuestro guion v3.11 dice "junto a cada tarjeta": ya no es así** |
| 5 | **«Explicación matemática básica»** (NUEVA) | `PARA-CANTU-STUDIO-2026-10-03.md` §2 | **decidido, en cola** | **Ya no va primero:** L01 dejó de esperarla (el operador eligió una tabla, vuestro §1). Va en **#226** `RUN-CANTU-BASIC-MATH-EXPLANATION-CONTRACT-001` y **#227** `RUN-CANTU-BASIC-MATH-EXPLANATION-EDITOR-001`, después del contrato común, porque con su nuevo diseño (recuadro con título en franja) puede ser de esa familia, y la respuesta de la «Pregunta» la lleva dentro. Los dos modos siguen siendo requisito. **La variante (A, B o D de vuestro `docs/referencias/explicacion-matematica-basica-variantes.html`) la elige el operador en pantalla, en ese run**; vuestra recomendación (la A) va transcrita. El caso real para escribirla desde el editor nos lo diréis cuando se abra |
| 6 | «Pregunta» | `PETICION-DE-COMPONENTES.md` §1, `PARA-CANTU-STUDIO-2026-09-19.md` P-A (diseño aprobado) | **decidido, en cola** | Primero el contrato común de los bloques destacados (`RUN-CANTU-HIGHLIGHTED-BLOCKS-SHARED-CONTRACT-001`); después **#228** `RUN-CANTU-QUESTION-CONTRACT-001` y **#229** `RUN-CANTU-QUESTION-EDITOR-001`, construidos desde el diseño que el operador aprobó, reutilizando el contrato de la «Explicación matemática básica» para su respuesta |
| 7 | «El porqué» | `PETICION-DE-COMPONENTES.md` §2 | **decidido, en cola** | Después del contrato común: **#230** `RUN-CANTU-WHY-CONTRACT-001` y **#231** `RUN-CANTU-WHY-EDITOR-001` |
| 8 | «Lo que te llevas» | `PETICION-DE-COMPONENTES.md` §3 | **decidido, en cola** | Después del contrato común: **#232** `RUN-CANTU-TAKEAWAY-CONTRACT-001` y **#233** `RUN-CANTU-TAKEAWAY-EDITOR-001`. **Las dos versiones que encontrasteis** (la de 2 331 caracteres en `5787589` y la de 468 en el catálogo, desde `9bd101d`) van transcritas al run: **su primer paso es que el operador elija una**, con el render del 2026-09-18 delante. Nada se diseña antes. Gracias por localizarlas |
| 9 | **«Tabla» de varias columnas con encabezados** (NUEVA) | `PARA-CANTU-STUDIO-2026-10-04.md` §2 | **decidido, en cola** | **Vuestra medición es correcta:** Studio la verificó el 2026-10-05 (esquema `WebTableSchema` con `title` y `rows`; `renderTable.js` pinta dos celdas por fila; el motor lee `headers` pero solo usa el primero como título). Es la **misma «Tabla» que crece**, no un componente nuevo: **#223** `RUN-CANTU-MULTI-COLUMN-TABLE-CONTRACT-001` y **#224** `RUN-CANTU-MULTI-COLUMN-TABLE-EDITOR-001`, justo después de la nota. Toda tabla publicada tiene que seguir pintando igual byte a byte. La prueba de terminado es la vuestra: la tabla de «Lado y distancia» de L01, escrita desde el editor con sus tres columnas y encabezados. Slide va como pregunta, no como paridad supuesta |
| 10 | Pregunta: ¿una fórmula en su propio renglón dentro del texto de un paso del «Procedimiento matemático»? | `PARA-CANTU-STUDIO-2026-10-04.md` §5 | **contestada, sin construir** | **Medido por Studio el 2026-10-05:** el campo de descripción del paso **admite** `\[ … \]` (también `\( … \)` y `$$ … $$`): se probó la función de la puerta con vuestro ejemplo, «Se resuelve la operación dentro de las barras: \[4 - 9 = -5\] El signo de afuera no cambia.», y no lo rechaza. El tipografiado global de la página usa los delimitadores por defecto de KaTeX, así que `\[ \]` se dibuja como fórmula aparte, en su propio renglón y centrada. **NO se vio en un navegador**: confirmadlo en la primera lección que lo use y, si no se ve bien, pedidlo en un fichero. El hueco de la fórmula del paso (el campo de fórmula, no `visual`) va antes de la descripción y es otra forma válida |

| 11 | Más espacio antes de cada título de sección | `PARA-CANTU-STUDIO-2026-10-05.md` §11 | **decidido, en cola** | `RUN-CANTU-SECTION-TITLE-BREATHING-ROOM-001`. Lleva vuestras medidas (24 / 40 / 24 px) y el parche de 60 px del operador. La cifra y el corte los decide él en pantalla, sobre L01. Cambia todas las lecciones publicadas a propósito |
| 12 | Que la vista previa sea la página que verá el alumno | `PARA-CANTU-STUDIO-2026-10-05.md` §12 | **decidido, en cola: el primero** | `RUN-CANTU-PREVIEW-IS-THE-PUBLISHED-PAGE-001`. Studio lo había medido por su lado en el `#222` (columnas de 560 px en la vista previa frente a 488 px en lo publicado). Va primero porque toda QA de pantalla se juzga en la vista previa. La prueba de terminado es la vuestra: la misma lección mide lo mismo en las dos |
| 13 | La insignia del tema no ocupa un renglón entero | `PARA-CANTU-STUDIO-2026-10-05.md` §13 | **decidido, en cola** | `RUN-CANTU-THEME-BADGE-BESIDE-THE-TITLE-001`. Se dibujan las dos opciones sobre L01 (a la derecha del título, también en pantalla angosta, y quitada) y elige el operador. Vuestra recomendación (moverla, no quitarla) va transcrita |
## Lo que el operador decidió sobre la forma, y os afecta

**El `#221`, decidido el 2026-10-04:**

- **Un bloque destacado es una pieza propia**, que puede vivir en «Dos columnas» si pasa el criterio
  del ancho que el operador fijó el 2026-08-12. No es hijo de la «Tarjeta».
- **«Pregunta», «El porqué» y «Lo que te llevas» comparten un contrato, pero son tres componentes**,
  cada uno con su nombre en pantalla. Lo común (escala de tamaños, aires, radio y rótulo) sale de
  vuestros tres prototipos.

## Lo que Studio NO va a hacer, para que nadie lo espere

- **`renderStepGrid.js`** (el parcial que nadie invoca, nombrado por vosotros el 19-sep): sigue sin
  conectar. Es una decisión del operador y no está en cola.
- **La «Nota desplegable» no se toca:** ya hace lo que se pedía.

## El orden en que Studio construye lo vuestro (la cola de `cantu-studio`, a 2026-10-06)

| run | para qué os sirve |
|---|---|
| La vista previa es la página que ve el alumno | todas vuestras revisiones en pantalla (petición 12) |
| «Tarjeta»: recuadro interior, insignia y negrita · contrato e interfaz | L01, «Pares e impares» (petición 4, corregida) |
| Más espacio antes de cada título de sección | la densidad de L01 y de todas (petición 11) |
| La insignia del tema sale de su renglón | la cabecera de cada lección (petición 13) |
| «Tabla» de varias columnas · contrato e interfaz | L01, «Lado y distancia» (petición 9) |
| Contrato común de los bloques destacados | lo que comparten las piezas de abajo |
| «Explicación matemática básica» · contrato e interfaz | la respuesta de la «Pregunta» (petición 5) |
| «Pregunta», «El porqué», «Lo que te llevas» · contrato e interfaz cada una | L03 y los lotes (peticiones 6-8) |
| `calculation`: contrato | las lecciones viejas; no es vuestro |

Los números `#N` cambian cada vez que se inserta algo: la identidad es el `run_id` de la tabla de arriba. Cada pieza
de interfaz termina cuando **vuestro** caso real se escribe desde el editor y el operador lo aprueba en
pantalla: ahí lo confirmáis vosotros en la lección.

## Hallazgos de Studio que tocan vuestras lecciones

- La lección de staging `src/content/staging/Aritmetica/L01_Web_Clasificacion_Numerica.js` (de
  `cantu-studio`) muestra «Forma General: (2n)» **sin tipografiar**: la plantilla de JS se come la
  barra de `\(`. Es de las lecciones viejas escritas a mano, no de las vuestras.
- El segundo `calculation` de la lección publicada `src/content/lecciones/Aritmetica/2_operaciones_aritmeticas.js`
  pide amarillo y sale gris. También es de las lecciones viejas.
