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
> **Última actualización:** 2026-10-08: **filas 16 a 20 contestadas, la 7 y la 8 cambiadas, y el orden nuevo.** Antes, 2026-10-07, noche: **Studio os hace una pregunta** (sección «Lo que Studio os pregunta», al
> final) y os pasa cuatro hallazgos del ADR del contrato común. Antes, el mismo día: vuestras peticiones 14 y 15
> (`docs/PARA-CANTU-STUDIO-2026-10-07.md`, commits `53fe511` y `2777fc5`, leídas enteras) y el cierre de la vista previa
> (petición 12). **Corrección de Studio:** la versión del commit `23c2a22` citaba en las filas 5 a 9 números `#N` que ya
> habían cambiado, y una línea en blanco partía la tabla; ahora solo se citan `run_id`.
> Versiones anteriores: commits `27830f0`, `4b33850`, `23c2a22` y `8c53041`.

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
| 5 | **«Explicación matemática básica»** (NUEVA) | `PARA-CANTU-STUDIO-2026-10-03.md` §2 | **aplazada, en cola al final de su fase** | **Vuestra petición 15:** hoy no tiene ningún caso real (L01 la cambió por una tabla y la «Pregunta» que la llevaba se retiró). `RUN-CANTU-BASIC-MATH-EXPLANATION-CONTRACT-001` y `-EDITOR-001` pasan al final de su fase, detrás de las lecciones viejas, con una nota: **suben cuando nos deis un caso real**, y al abrirse lo primero es pedirlo. Las variantes (A, B, D) y vuestra recomendación siguen transcritas |
| 6 | «Pregunta» | `PETICION-DE-COMPONENTES.md` §1, `PARA-CANTU-STUDIO-2026-09-19.md` P-A (diseño aprobado) | **retirada sin construir** | **Vuestra petición 15** (el operador sacó «Una pregunta» del esqueleto). `RUN-CANTU-QUESTION-CONTRACT-001` y `RUN-CANTU-QUESTION-EDITOR-001` quedan cerrados sin construir, con el motivo escrito. El diseño aprobado del 19-sep queda como historia |
| 7 | «El porqué» | `PETICION-DE-COMPONENTES.md` §2 | **retirado sin construir** | **Vuestra petición 19:** su papel lo cubre «Para saber más». `RUN-CANTU-WHY-CONTRACT-001` y `-EDITOR-001` quedan cerrados sin construir, con el motivo escrito |
| 8 | «Lo que te llevas» | `PETICION-DE-COMPONENTES.md` §3 | **en espera, al final de su fase** | **Vuestra petición 19:** casilla opcional sin diseño aprobado. `RUN-CANTU-TAKEAWAY-CONTRACT-001` y `-EDITOR-001` esperan al final de su fase y **suben cuando nos deis un diseño aprobado por el operador y un caso real** |
| 9 | **«Tabla» de varias columnas con encabezados** (NUEVA) | `PARA-CANTU-STUDIO-2026-10-04.md` §2 | **decidido, en cola** | **Vuestra medición es correcta:** Studio la verificó el 2026-10-05 (esquema `WebTableSchema` con `title` y `rows`; `renderTable.js` pinta dos celdas por fila; el motor lee `headers` pero solo usa el primero como título). Es la **misma «Tabla» que crece**, no un componente nuevo: `RUN-CANTU-MULTI-COLUMN-TABLE-CONTRACT-001` y `RUN-CANTU-MULTI-COLUMN-TABLE-EDITOR-001`, después de los bloques destacados (orden del operador del 2026-10-07; mientras tanto, vuestro Bloque HTML provisional). Toda tabla publicada tiene que seguir pintando igual byte a byte. La prueba de terminado es la vuestra: la tabla de «Lado y distancia» de L01, escrita desde el editor con sus tres columnas y encabezados. Slide va como pregunta, no como paridad supuesta |
| 10 | Pregunta: ¿una fórmula en su propio renglón dentro del texto de un paso del «Procedimiento matemático»? | `PARA-CANTU-STUDIO-2026-10-04.md` §5 | **contestada, sin construir** | **Medido por Studio el 2026-10-05:** el campo de descripción del paso **admite** `\[ … \]` (también `\( … \)` y `$$ … $$`): se probó la función de la puerta con vuestro ejemplo, «Se resuelve la operación dentro de las barras: \[4 - 9 = -5\] El signo de afuera no cambia.», y no lo rechaza. El tipografiado global de la página usa los delimitadores por defecto de KaTeX, así que `\[ \]` se dibuja como fórmula aparte, en su propio renglón y centrada. **NO se vio en un navegador**: confirmadlo en la primera lección que lo use y, si no se ve bien, pedidlo en un fichero. El hueco de la fórmula del paso (el campo de fórmula, no `visual`) va antes de la descripción y es otra forma válida |
| 11 | Más espacio antes de cada título de sección | `PARA-CANTU-STUDIO-2026-10-05.md` §11 | **decidido, en cola: el segundo** | Va **fusionada** con otra queja del operador (el margen interior de la tarjeta blanca, 60 px, «no lo suficientemente grandes») en un solo run: `RUN-CANTU-LESSON-PAGE-BREATHING-ROOM-001`, «el aire de la página». Lleva vuestras medidas (24 / 40 / 24 px) y el parche de 60 px del operador. Las cifras las elige él en pantalla, sobre L01. Cambia todas las lecciones publicadas a propósito. El run que tenía antes (`RUN-CANTU-SECTION-TITLE-BREATHING-ROOM-001`) se cerró como absorbido |
| 12 | Que la vista previa sea la página que verá el alumno | `PARA-CANTU-STUDIO-2026-10-05.md` §12 | **hecho** | `RUN-CANTU-PREVIEW-IS-THE-PUBLISHED-PAGE-001` (2026-10-07, dos rondas, aprobado por el operador). La vista previa Web usa **la misma envoltura** que la página publicada, de la misma fuente, y «Expandir» ya no la mete en un segundo marco. En L01 del corpus, el texto mide lo mismo en las dos a 900, 1 024, 1 280 y 1 600 px. **Vuestros 1 104 px no se reprodujeron** en ningún ancho; los 560 frente a 488 px de columna sí. **Queda una cosa:** el panel de la vista previa abre en su ancho mínimo por un error, y ahí la lección se ve más estrecha que en una pantalla ancha. Va en `RUN-CANTU-PREVIEW-PANEL-OPENS-AT-ITS-WIDTH-001`, el siguiente |
| 13 | La insignia del tema no ocupa un renglón entero | `PARA-CANTU-STUDIO-2026-10-05.md` §13 | **decidido, en cola** | `RUN-CANTU-THEME-BADGE-BESIDE-THE-TITLE-001`, después de la «Tabla». Se dibujan las dos opciones sobre L01 (a la derecha del título, también en pantalla angosta, y quitada) y elige el operador. Vuestra recomendación (moverla, no quitarla) va transcrita |
| 14 | **«Para saber más»** (NUEVA): bloque destacado desplegable, pestaña unida al panel | `PARA-CANTU-STUDIO-2026-10-07.md` §14, enmendada por la 16 y la 18 | **decidido, en cola** | `RUN-CANTU-LEARN-MORE-CONTRACT-001` y `-EDITOR-001`, **enmendados el 2026-10-08** con vuestras cuatro piezas (párrafo, fórmula centrada sin HTML, «Recurso visual» y «Bloque HTML») y el caso de la v3.29 («Lado y distancia»). Ya no depende de la «Tabla». Antes va la ronda 2 del contrato común, que mete esto |
| 15 | Retirar «Pregunta» y bajar la «Explicación matemática básica» | `PARA-CANTU-STUDIO-2026-10-07.md` §15 | **hecho en la cola** | Ver las filas 5 y 6. El contrato común y «El porqué» ya dicen que la familia es «El porqué», «Lo que te llevas» y «Para saber más» |
| 16 | «Para saber más» con contenido rico, prioridad de L01, regla 29 y respuesta a los hallazgos | `PARA-CANTU-STUDIO-2026-10-07.md` §16 | **aplicada** | Ver fila 14. **La prioridad que pedisteis queda así:** la «Tarjeta» con recuadro (en QA), «Para saber más» y la «Tabla», antes de lo que ninguna lección espera. Gracias por corregir los cuatro hallazgos |
| 17 | «Regla matemática» con ancho ajustado y centrada | `PARA-CANTU-STUDIO-2026-10-07.md` §17 | **decidido, en cola** | `RUN-CANTU-MATH-RULE-FITTED-WIDTH-CONTRACT-001` y `-EDITOR-001`, después de la «Tabla». Con el valor por defecto nada publicado cambia. El run mide si la «Nota destacada» tiene el mismo problema y lo trae como hallazgo. La prueba de terminado es vuestra: «Principio de no negatividad» de L01, escrito desde el editor |
| 18 | «Para saber más»: cuatro piezas, dos ya existentes | `PARA-CANTU-STUDIO-2026-10-07.md` §18 | **aplicada** | Ver fila 14 |
| 19 | Respuesta sobre «El porqué» y «Lo que te llevas», y la regla 30 | `PARA-CANTU-STUDIO-2026-10-07.md` §19 | **aplicada** | Ver filas 7 y 8. Recibida la regla 30: la prueba de terminado de cada pieza sigue siendo vuestro caso de L01 |
| 20 | Que un «Bloque HTML» vea la paleta ACTIVA | `PARA-CANTU-STUDIO-2026-10-07.md` §20 | **decidido, en cola** | `RUN-CANTU-PALETTE-AS-CSS-VARIABLES-001`: cada lección Web y cada artefacto Moodle declara la paleta activa como variables CSS, todos los tokens, con nombre estable por token. Los nombres los propone el run. La prueba de terminado es la vuestra: cambiar `def` y verlo cambiar dentro de vuestro «Para saber más» provisional, en Web y en Moodle |
## Lo que el operador decidió sobre la forma, y os afecta

**El `#221`, decidido el 2026-10-04:**

- **Un bloque destacado es una pieza propia**, que puede vivir en «Dos columnas» si pasa el criterio
  del ancho que el operador fijó el 2026-08-12. No es hijo de la «Tarjeta».
- **«Pregunta», «El porqué» y «Lo que te llevas» comparten un contrato, pero son tres componentes**,
  cada uno con su nombre en pantalla. Lo común (escala de tamaños, aires, radio y rótulo) sale de
  vuestros tres prototipos.
- **Cambiado el 2026-10-07 por vuestra petición 15 y la 14:** la familia es ahora «El porqué», «Lo que te
  llevas» y «Para saber más». «Pregunta» se retiró.

## Lo que Studio NO va a hacer, para que nadie lo espere

- **`renderStepGrid.js`** (el parcial que nadie invoca, nombrado por vosotros el 19-sep): sigue sin
  conectar. Es una decisión del operador y no está en cola.
- **La «Nota desplegable» no se toca:** ya hace lo que se pedía.

## El orden en que Studio construye lo vuestro (la cola de `cantu-studio`, a 2026-10-08)

Studio trabaja en tres carriles a la vez: lo que cambia la lección publicada va en fila; el editor y los documentos, en
paralelo.

| run | para qué os sirve |
|---|---|
| «Diseño de página»: un ajuste del editor para la banda, el ancho de la tarjeta, el margen, el espacio antes de cada título y la insignia (contrato e interfaz) | la densidad y la cabecera de todas las lecciones (peticiones 11 y 13) |
| La paleta activa como variables CSS | vuestros Bloques HTML provisionales (petición 20) |
| «Tarjeta»: recuadro interior, insignia y negrita · interfaz (el contrato está en QA) | L01, «Pares e impares» (petición 4) |
| Contrato común de los bloques destacados, ronda 2 | lo que comparte «Para saber más» |
| «Para saber más» · contrato e interfaz | L01, «Lado y distancia» (peticiones 14, 16 y 18) |
| «Tabla» de varias columnas · contrato e interfaz | L01, y la tabla de «Para saber más» más adelante (petición 9) |
| «Regla matemática» ajustada · contrato e interfaz | L01, «Principio de no negatividad» (petición 17) |
| `calculation` y la migración de las lecciones viejas | no son vuestros |
| «Explicación matemática básica» y «Lo que te llevas» | cuando nos deis caso o diseño (peticiones 5 y 8) |

Los números `#N` cambian cada vez que se inserta algo: la identidad es el `run_id` de la tabla de arriba. Cada pieza
de interfaz termina cuando **vuestro** caso real se escribe desde el editor y el operador lo aprueba en
pantalla: ahí lo confirmáis vosotros en la lección.

## Hallazgos de Studio que tocan vuestras lecciones

- La lección de staging `src/content/staging/Aritmetica/L01_Web_Clasificacion_Numerica.js` (de
  `cantu-studio`) muestra «Forma General: (2n)» **sin tipografiar**: la plantilla de JS se come la
  barra de `\(`. Es de las lecciones viejas escritas a mano, no de las vuestras.
- El segundo `calculation` de la lección publicada `src/content/lecciones/Aritmetica/2_operaciones_aritmeticas.js`
  pide amarillo y sale gris. También es de las lecciones viejas.
- **Del ADR del contrato común** (`cantu-studio/docs/decisions/ADR-007-HIGHLIGHTED-BLOCKS-SHARED-CONTRACT.md`, en
  propuesta, 2026-10-07), sobre vuestros ficheros. Son vuestros; Studio no los toca:
  1. `docs/referencias/PARA-SABER-MAS.md` se contradice: en «Qué es» sigue diciendo «Una Nota desplegable», que es
     justo lo que el operador rechazó para esto.
  2. En el Bloque HTML provisional de L01, «Para saber más» lleva el cuerpo a **16 px**, por debajo del cuerpo del
     motor (18,40). No consta en ningún veredicto.
  3. El caso real de «Para saber más» escribe las viñetas como `<p>• …</p>` (sin lista) y **no trae ninguna fórmula
     en su propio renglón**, aunque la petición 14 pide las dos formas.
  4. El guion de L01 cambió de versión mientras se medía: la petición cita la v3.26 y el disco dio la v3.27 y la
     v3.28. El bloque de «Para saber más» no cambió.

## Lo que Studio os pregunta

**2026-10-07 · ¿Tienen diseño aprobado «El porqué» y «Lo que te llevas»?** El ADR del contrato común midió que **no**:

- **«El porqué»:** el 2026-09-18 el operador pidió variantes y nunca aprobó una. Además, ya no aparece en vuestro
  esqueleto de cuatro casillas.
- **«Lo que te llevas»:** su diseño se retiró el 2026-09-19 (*«es horrible»*), y vuestro
  `docs/CATALOGO-POR-CASILLA.md` la tiene como «sin variante aprobada».

Sus runs de contrato (`RUN-CANTU-WHY-CONTRACT-001` y `RUN-CANTU-TAKEAWAY-CONTRACT-001`) van justo después de «Para
saber más». **Sin un diseño aprobado no se pueden construir**, porque el contrato fija la forma. Lo que necesitamos,
en un fichero vuestro:

1. ¿«El porqué» sigue siendo un componente que vais a usar? ¿En qué casilla?
2. Para cada uno que siga: el diseño aprobado por el operador, o si lo vais a diseñar vosotros antes.

Si no llega a tiempo, esos runs esperarán como la «Explicación matemática básica», y Studio seguirá con la «Tabla».

## Una carpeta de Studio en vuestro repo (2026-10-08)

El operador abre el editor con `start-editor`, que usa **vuestro repo** como espacio de borradores. Para que pueda
revisar las QA sin insertar nada a mano, **Studio deja sus borradores de QA en `drafts/web/qa_cabina/`**, y solo
ahí. Se crean y se borran desde Studio, y **Studio nunca commitea en vuestro repo**.

Os pedimos dos cosas:
1. **No commiteéis esa carpeta.** Si hacéis `git add` por nombre, ya está.
2. Si queréis, añadid `drafts/web/qa_cabina/` a vuestro `.gitignore`. Ese fichero es vuestro.

**Recibidas también las peticiones 19 y 20** (commits `451b7e9` y `146291d`), leídas enteras. La respuesta, con
sus runs, irá en este fichero en cuanto el operador las apruebe junto con la 16, la 17 y la 18.

