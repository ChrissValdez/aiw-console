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
> **Última actualización:** 2026-10-15: **la 29, en curso.** Antes, 2026-10-13: **la 24 (22.1 y 23), construida y aprobada; la 25 y la 26, construidas y aprobadas; la 27, construida y aprobada; la 28, construida salvo la 28.1, que no cabe.** Antes, 2026-10-12: **peticiones 22, 23 y 24 recibidas; la 24 (22.1 y 23) ya está en curso.** Antes, 2026-10-10, noche: **Studio está al día con L01 y hay una regla nueva para pedir piezas** (sección siguiente); **filas 9, 11, 13 y 17 construidas.** Antes, 2026-10-10: **filas 14 y 21 construidas; la 9, con el contrato hecho.** Antes, 2026-10-09, noche: **fila 20 construida, con su regla; «Diseño de página» hecho.** Antes, 2026-10-09, tarde: **filas 17 y 20 cambiadas por dos fusiones** (la 20 suma el tamaño de letra A+/A-) **y la cola puesta al día.** Antes, 2026-10-09: **fila 21 contestada.** Antes, 2026-10-08: **filas 16 a 20 contestadas, la 7 y la 8 cambiadas, y el orden nuevo.** Antes, 2026-10-07, noche: **Studio os hace una pregunta** (sección «Lo que Studio os pregunta», al
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

## Desde el 2026-10-10: Studio está al día, y así se pide una pieza nueva

**Decisión del operador** (record `context/cantu-studio/records/DECISION-2026-10-10-PIEZA-NUEVA-PRIMERO-BLOQUE-HTML-Y-LO-NO-VITAL-AL-ARCHIVO.md`).

**Podéis reanudar.** Todo lo que L01 pidió está construido y aprobado por el operador en pantalla: «Para saber más»,
las dos notas por paso del «Procedimiento matemático», la «Tabla» con encabezados, la «Regla matemática» ajustada,
el «Bloque HTML» que sigue la paleta y A+/A-, «Diseño de página» con los márgenes del móvil y la «Tarjeta» con
recuadro. Lo único que queda de vuestras peticiones depende de vosotros: un caso real para la «Explicación matemática
básica» (fila 5) y un diseño aprobado para «Lo que te llevas» (fila 8).

**La regla nueva, para toda pieza que el editor no tenga:**

1. **La resolvéis primero con un «Bloque HTML»** que siga `REGLA-DEL-BLOQUE-HTML-PALETA-Y-TAMANO.md`, y el operador
   la aprueba en pantalla.
2. **La lección se termina así**, sin esperar a Studio.
3. **El componente se pide igual**, en vuestro `PARA-CANTU-STUDIO-<fecha>.md`. *Propuesta de Studio, no del
   operador:* citad el «Bloque HTML» aprobado como su diseño. Studio lo deja en el **archivo** (baja prioridad);
   si lo necesitáis antes, decidlo y sube al frente de la cola.
4. **Si un día se construye, migrar la lección es opcional**, y el componente tiene que verse igual que vuestro
   bloque aprobado.

**Lo que pasa al archivo** (no vital; sube si lo pedís): la migración de las lecciones viejas escritas a mano (hasta
que suba, el editor no las abre), el contrato de `calculation`, la «Explicación matemática básica», «Lo que te llevas»,
la exportación a producción, el plan de hosting, la auditoría de UX y el historial de versiones.

---

## Estado de las peticiones

| # | petición | de dónde viene | estado | qué hizo o hará Studio |
|---|---|---|---|---|
| 1 | Los dos «undefined» (`split` e `iconList` con un campo opcional ausente) | `PETICION-DE-COMPONENTES.md` (17-sep), `PARA-CANTU-STUDIO-2026-09-18.md` | **hecho** | `RUN-CANTU-WEB-NO-UNDEFINED-ON-THE-PAGE-001` (#210, 2026-09-19). Verificado el 2026-10-03 por el `#221`: 0 fugas en 39 casos y tres rutas |
| 2 | Modo **bloque** de las fórmulas | `PARA-CANTU-STUDIO-2026-09-18.md`, Petición 1 | **hecho** | `RUN-CANTU-MATH-PROCEDURE-BLOCK-BUILD-001` (#214, pass del operador del 2026-09-21). Es un modo dentro de «Procedimiento matemático» y «Explicación guiada», no un componente aparte |
| 3 | Que la «Nota desplegable» tipografíe fórmulas | `PETICION-DE-COMPONENTES.md`, petición pequeña | **cerrado sin construir: ya lo hacía** | Medido por el `#221`: tipografía el rótulo y el contenido, también plegada. Ya lo hacía el 17-sep: el tipografiado global de la página existe desde el 2026-06-03 (`589e8ceb`). La petición midió el fichero del componente, no la página. **Sin medir:** Moodle (MathJax) |
| 4 | Componer el interior de una «Tarjeta»: una «Nota destacada» dentro | `PARA-CANTU-STUDIO-2026-09-18.md` P2, `-09-19.md` P-B, `-2026-10-03.md` §1 | **CONSTRUIDA (2026-10-09): os toca escribir «Pares e impares» desde el editor** | **Studio se equivocó y lo corrige.** El 2026-10-04 os comunicamos que la nota iba JUNTO a la tarjeta (forma B del `#221`), y vosotros lo aceptasteis. El 2026-10-05 el operador lo vio en pantalla (run `RUN-CANTU-HIGHLIGHT-NOTE-BESIDE-THE-CARD-001`) y lo rechazó: *«lo que queria es que la nota destacada estuviera adentro de la tarjeta»*, como la «Clasificación binaria» de la lección de referencia. Era lo que pedisteis tres veces. **La forma decidida el 2026-10-06 (A1):** la «Tarjeta» trae su **propio recuadro interior**, con título y texto, fórmulas y el color de la tarjeta, y sigue siendo autocontenida; no se vuelve contenedor de otros bloques. Runs: `RUN-CANTU-CARD-INNER-BOX-CONTRACT-001` y `RUN-CANTU-CARD-INNER-BOX-EDITOR-001`. En los mismos runs: **la insignia deja de pintar `2N`** y **el texto de la tarjeta admite negrita** («cero», «uno», «Terminación:»). La prueba de terminado es vuestra sección «Pares e impares» escrita desde el editor. **Lo que ya quedó hecho del run anterior:** el título de «Nota destacada» ya no pasa las fórmulas a mayúsculas, en Web y en Diapositiva (pass del operador, 2026-10-06). **Vuestro guion v3.11 dice "junto a cada tarjeta": ya no es así** |
| 5 | **«Explicación matemática básica»** (NUEVA) | `PARA-CANTU-STUDIO-2026-10-03.md` §2 | **aplazada, en cola al final de su fase** | **Vuestra petición 15:** hoy no tiene ningún caso real (L01 la cambió por una tabla y la «Pregunta» que la llevaba se retiró). `RUN-CANTU-BASIC-MATH-EXPLANATION-CONTRACT-001` y `-EDITOR-001` pasan al final de su fase, detrás de las lecciones viejas, con una nota: **suben cuando nos deis un caso real**, y al abrirse lo primero es pedirlo. Las variantes (A, B, D) y vuestra recomendación siguen transcritas |
| 6 | «Pregunta» | `PETICION-DE-COMPONENTES.md` §1, `PARA-CANTU-STUDIO-2026-09-19.md` P-A (diseño aprobado) | **retirada sin construir** | **Vuestra petición 15** (el operador sacó «Una pregunta» del esqueleto). `RUN-CANTU-QUESTION-CONTRACT-001` y `RUN-CANTU-QUESTION-EDITOR-001` quedan cerrados sin construir, con el motivo escrito. El diseño aprobado del 19-sep queda como historia |
| 7 | «El porqué» | `PETICION-DE-COMPONENTES.md` §2 | **retirado sin construir** | **Vuestra petición 19:** su papel lo cubre «Para saber más». `RUN-CANTU-WHY-CONTRACT-001` y `-EDITOR-001` quedan cerrados sin construir, con el motivo escrito |
| 8 | «Lo que te llevas» | `PETICION-DE-COMPONENTES.md` §3 | **en espera, al final de su fase** | **Vuestra petición 19:** casilla opcional sin diseño aprobado. `RUN-CANTU-TAKEAWAY-CONTRACT-001` y `-EDITOR-001` esperan al final de su fase y **suben cuando nos deis un diseño aprobado por el operador y un caso real** |
| 9 | **«Tabla» de varias columnas con encabezados** (NUEVA) | `PARA-CANTU-STUDIO-2026-10-04.md` §2 | **CONSTRUIDA (2026-10-10): escribidla desde el editor**, con el selector «Forma» del formulario de «Tabla» — «Tabla» con `columns` de 2 a 4 encabezados y fórmula en línea en cualquier celda; la de dos columnas de siempre no cambia. En el móvil se apila por filas (decisión del operador). Solo a lo ancho: no dentro de «Dos columnas». Slide sigue en dos columnas. No es pieza de «Para saber más» | **Vuestra medición es correcta:** Studio la verificó el 2026-10-05 (esquema `WebTableSchema` con `title` y `rows`; `renderTable.js` pinta dos celdas por fila; el motor lee `headers` pero solo usa el primero como título). Es la **misma «Tabla» que crece**, no un componente nuevo: `RUN-CANTU-MULTI-COLUMN-TABLE-CONTRACT-001` y `RUN-CANTU-MULTI-COLUMN-TABLE-EDITOR-001`, después de los bloques destacados (orden del operador del 2026-10-07; mientras tanto, vuestro Bloque HTML provisional). Toda tabla publicada tiene que seguir pintando igual byte a byte. La prueba de terminado es la vuestra: la tabla de «Lado y distancia» de L01, escrita desde el editor con sus tres columnas y encabezados. Slide va como pregunta, no como paridad supuesta |
| 10 | Pregunta: ¿una fórmula en su propio renglón dentro del texto de un paso del «Procedimiento matemático»? | `PARA-CANTU-STUDIO-2026-10-04.md` §5 | **contestada, sin construir** | **Medido por Studio el 2026-10-05:** el campo de descripción del paso **admite** `\[ … \]` (también `\( … \)` y `$$ … $$`): se probó la función de la puerta con vuestro ejemplo, «Se resuelve la operación dentro de las barras: \[4 - 9 = -5\] El signo de afuera no cambia.», y no lo rechaza. El tipografiado global de la página usa los delimitadores por defecto de KaTeX, así que `\[ \]` se dibuja como fórmula aparte, en su propio renglón y centrada. **NO se vio en un navegador**: confirmadlo en la primera lección que lo use y, si no se ve bien, pedidlo en un fichero. El hueco de la fórmula del paso (el campo de fórmula, no `visual`) va antes de la descripción y es otra forma válida |
| 11 | Más espacio antes de cada título de sección | `PARA-CANTU-STUDIO-2026-10-05.md` §11 | **CONSTRUIDA (2026-10-09): el botón «Diseño de página» de la vista previa Web** (banda, ancho de la tarjeta, margen y espacio antes de cada título). Los márgenes del móvil, también (2026-10-10) | Va **fusionada** con otra queja del operador (el margen interior de la tarjeta blanca, 60 px, «no lo suficientemente grandes») en un solo run: `RUN-CANTU-LESSON-PAGE-BREATHING-ROOM-001`, «el aire de la página». Lleva vuestras medidas (24 / 40 / 24 px) y el parche de 60 px del operador. Las cifras las elige él en pantalla, sobre L01. Cambia todas las lecciones publicadas a propósito. El run que tenía antes (`RUN-CANTU-SECTION-TITLE-BREATHING-ROOM-001`) se cerró como absorbido |
| 12 | Que la vista previa sea la página que verá el alumno | `PARA-CANTU-STUDIO-2026-10-05.md` §12 | **hecho** | `RUN-CANTU-PREVIEW-IS-THE-PUBLISHED-PAGE-001` (2026-10-07, dos rondas, aprobado por el operador). La vista previa Web usa **la misma envoltura** que la página publicada, de la misma fuente, y «Expandir» ya no la mete en un segundo marco. En L01 del corpus, el texto mide lo mismo en las dos a 900, 1 024, 1 280 y 1 600 px. **Vuestros 1 104 px no se reprodujeron** en ningún ancho; los 560 frente a 488 px de columna sí. **Queda una cosa:** el panel de la vista previa abre en su ancho mínimo por un error, y ahí la lección se ve más estrecha que en una pantalla ancha. Va en `RUN-CANTU-PREVIEW-PANEL-OPENS-AT-ITS-WIDTH-001`, el siguiente |
| 13 | La insignia del tema no ocupa un renglón entero | `PARA-CANTU-STUDIO-2026-10-05.md` §13 | **CONSTRUIDA (2026-10-09): la insignia se ajusta en «Diseño de página»** | `RUN-CANTU-THEME-BADGE-BESIDE-THE-TITLE-001`, después de la «Tabla». Se dibujan las dos opciones sobre L01 (a la derecha del título, también en pantalla angosta, y quitada) y elige el operador. Vuestra recomendación (moverla, no quitarla) va transcrita |
| 14 | **«Para saber más»** (NUEVA): bloque destacado desplegable, pestaña unida al panel | `PARA-CANTU-STUDIO-2026-10-07.md` §14, enmendada por la 16 y la 18 | **CONSTRUIDA (2026-10-10): escribidla desde el editor** — «+» → «Básicos» → «Para saber más». Piezas: párrafo (con «Insertar fórmula»), fórmula centrada («+ Línea» para un procedimiento), «Recurso visual» y «Bloque HTML», que se agregan, reordenan y borran. Unas 120 palabras de texto es una guía, no un rechazo. El «+» va en blanco (decisión del operador). Un procedimiento de varias líneas se alinea a la izquierda en caja centrada, como «Regla matemática». **La «Tabla» NO es pieza de «Para saber más»** (operador: «No por ahora»): vuestra tabla sigue en su «Bloque HTML», con la regla `REGLA-DEL-BLOQUE-HTML-PALETA-Y-TAMANO.md` | `RUN-CANTU-LEARN-MORE-CONTRACT-001` y `-EDITOR-001`, **enmendados el 2026-10-08** con vuestras cuatro piezas (párrafo, fórmula centrada sin HTML, «Recurso visual» y «Bloque HTML») y el caso de la v3.29 («Lado y distancia»). Ya no depende de la «Tabla». Antes va la ronda 2 del contrato común, que mete esto |
| 15 | Retirar «Pregunta» y bajar la «Explicación matemática básica» | `PARA-CANTU-STUDIO-2026-10-07.md` §15 | **hecho en la cola** | Ver las filas 5 y 6. El contrato común y «El porqué» ya dicen que la familia es «El porqué», «Lo que te llevas» y «Para saber más» |
| 16 | «Para saber más» con contenido rico, prioridad de L01, regla 29 y respuesta a los hallazgos | `PARA-CANTU-STUDIO-2026-10-07.md` §16 | **aplicada** | Ver fila 14. **La prioridad que pedisteis queda así:** la «Tarjeta» con recuadro (**construida y aprobada por el operador el 2026-10-09**), «Para saber más» y la «Tabla», antes de lo que ninguna lección espera. Gracias por corregir los cuatro hallazgos |
| 17 | «Regla matemática» con ancho ajustado y centrada | `PARA-CANTU-STUDIO-2026-10-07.md` §17 | **CONSTRUIDA (2026-10-10): escribidla desde el editor, «Regla matemática» → «Ancho» → «Ajustado»** | `RUN-CANTU-MATH-RULE-FITTED-WIDTH-001`, **un solo run** (contrato e interfaz juntos, decisión del operador del 2026-10-09; sustituye a los dos que citaba esta fila), después de la «Tabla». Con el valor por defecto nada publicado cambia. El run mide si la «Nota destacada» tiene el mismo problema y lo trae como hallazgo. La prueba de terminado es vuestra: «Principio de no negatividad» de L01, escrito desde el editor |
| 18 | «Para saber más»: cuatro piezas, dos ya existentes | `PARA-CANTU-STUDIO-2026-10-07.md` §18 | **aplicada** | Ver fila 14 |
| 19 | Respuesta sobre «El porqué» y «Lo que te llevas», y la regla 30 | `PARA-CANTU-STUDIO-2026-10-07.md` §19 | **aplicada** | Ver filas 7 y 8. Recibida la regla 30: la prueba de terminado de cada pieza sigue siendo vuestro caso de L01 |
| 20 | Que un «Bloque HTML» vea la paleta ACTIVA | `PARA-CANTU-STUDIO-2026-10-07.md` §20 | **CONSTRUIDA (2026-10-09): leed la regla** | `RUN-CANTU-HTML-BLOCK-FOLLOWS-THE-PAGE-001`, cerrado con QA del operador. **La regla que tenéis que seguir dentro de vuestros bloques está en `context/cantu-studio/REGLA-DEL-BLOQUE-HTML-PALETA-Y-TAMANO.md`, con un ejemplo medido.** En corto: color nuevo con `var(--cs-palette-<id>-accent|surface|border|text|ink)` y nunca un hex; el texto sobre un relleno de acento, en `ink`; tamaños sin `px` ni `rem` sueltos (`var(--cs-text-*)` o `calc(<n>rem * var(--cs-scale))`), y `font-size: inherit` en cada `<table>`. **Las variables viejas `--n-role-<id>-bd/-bg` ahora siguen a la paleta activa; las `-tx` conservan su color de fábrica** (decisión del operador, opción B). Esto cambia el aspecto de vuestros bloques que ya usan `--n-role-*`: medido en Chrome, 5 borradores y solo bordes y fondos (`operar_con_signos`, `catalogo_por_casilla`, L01 `que_es_cada_numero`, `dos_calibraciones` y `hoja_del_sistema`), siempre dentro de un «Bloque HTML». Lo ya publicado no cambia mientras no se regenere; si se regenera `operar_con_signos`, su franja «Compruébalo tú» pasa a Verde Jade. **Vuestros bloques de L01 con `px` no siguen a A+/A- hasta que los migréis con la regla.** |
| 21 | «Procedimiento matemático»: cero, una o dos notas por paso, «Ver cálculo» y «Error común», lado a lado y sin HTML | `PARA-CANTU-STUDIO-2026-10-08.md` §21 | **CONSTRUIDA (2026-10-10): escribidlas desde el editor** — en cada paso, «+ Ver cálculo» y «+ Error común». Con las dos, van como pestañas: una abierta a la vez, a todo lo ancho, «Ver cálculo» a la izquierda (decisión del operador); en el móvil se apilan en orden. «✖ Incorrecto:» y «✔ Correcto:» llevan el rojo y el verde oscurecidos para leerse. Un paso con la nota de siempre no puede llevar también una nueva. La migración de las notas viejas está sin decidir | `RUN-CANTU-MATH-PROCEDURE-STEP-NOTES-CONTRACT-001` y `-EDITOR-001`, **justo después de «Para saber más» y antes de la «Tabla»**, por decisión del operador del 2026-10-09. Va transcrito todo lo vuestro: la L02 de staging como modelo, «Se obtiene:» siempre, la marca ✖/✔ con la palabra y no con la fórmula, los colores `err`/`res`, y el apilado en el móvil. Qué nota va a cada lado lo decide el operador en pantalla. La prueba de terminado es la vuestra: el ejemplo guiado `−|4 − 9|` de L01 |
| 22 | «Error común» con «Incorrecto» y «Correcto» alineados (22.1), y las dos piezas de «Dos columnas» con la misma altura (22.2) | `PARA-CANTU-STUDIO-2026-10-12.md` §22 | **22.1: CONSTRUIDA (2026-10-13), sin hacer nada: «✖ Incorrecto:» y «✔ Correcto:» empiezan en la misma columna en todas las lecciones. 22.2: recibida, sin prisa** (vosotros lo resolvisteis en L01 agrandando el dibujo) | 22.1 → `RUN-CANTU-COMMON-ERROR-FORMULAS-ALIGNED-001`. Antes de cambiar nada, el run mide qué forma dibuja hoy el «Error común» de L01: si el escalonado viene de un HTML escrito a mano y no del motor, para y lo decide el operador. 22.2 no tiene run todavía. |
| 23 | «Para saber más» con el botón a la derecha | `PARA-CANTU-STUDIO-2026-10-12.md` §23 | **CONSTRUIDA (2026-10-13), enmendada por la 24** | Ver la fila 24. |
| 24 | PRIORIDAD INMEDIATA: la 22.1, y la 23 enmendada (opción del autor, izquierda o derecha, por defecto derecha) | `PARA-CANTU-STUDIO-2026-10-12.md` §24 | **CONSTRUIDAS LAS DOS (2026-10-13), aprobadas por el operador.** «Error común»: alineado, sin que hagáis nada; en una columna angosta, cada rótulo queda arriba y su fórmula debajo. «Para saber más»: el control es «Lado del botón» («A la derecha (por defecto)» / «A la izquierda»), justo encima de «Piezas». Vuestros «Para saber más» de L01 ya salen a la derecha sin tocarlos. En Moodle se comporta igual que en Web | `RUN-CANTU-COMMON-ERROR-FORMULAS-ALIGNED-001` y `RUN-CANTU-LEARN-MORE-BUTTON-SIDE-001`, con una sola QA del operador para los dos. Si el valor por defecto («a la derecha») cambia páginas publicadas, el run las nombra. Las peticiones 22 y 23 no nos habían llegado hasta la 24: las leímos todas juntas. |
| 25 | La separación entre secciones: una línea encima de cada título de sección | `PARA-CANTU-STUDIO-2026-10-12.md` §25 | **CONSTRUIDA Y APROBADA (2026-10-13), junto con la 26** — L01 se ve como vuestra maqueta. En «Diseño de página» los mandos son «Línea entre secciones», «Espacio entre secciones» (88) y «Espacio al final de la lección» (80). La primera sección queda fija en 40. Vuestro ajuste de 60 se ignora y desaparece del fichero la primera vez que se guarda el diseño. Cada lección publicada cambia cuando la regeneréis | Lo decidió el operador (record `DECISION-2026-10-13-EL-AIRE-DE-LA-PAGINA-PETICIONES-25-Y-26.md`): va como **ajuste de «Diseño de página»**, con vuestros valores como valores por defecto; **«Espacio antes de un título de sección» se retira**, y vuestros 60 px dejan de aplicarse; **Moodle lleva lo mismo**, o una línea recta del mismo color si la forma no cabe. Son dos runs: `RUN-CANTU-PAGE-AIR-SECTION-RULE-AND-LESSON-END-CONTRACT-001` (el contrato) y `-EDITOR-001` (los mandos), con una sola QA. La prueba de terminado es vuestra maqueta `L01.WEB.con-separadores.html`. |
| 26 | El final de la lección: 80 px de la última pieza al borde de la hoja | `PARA-CANTU-STUDIO-2026-10-12.md` §26 | **CONSTRUIDA Y APROBADA (2026-10-13)** — los 80 px valen para cualquier última pieza: lo medimos en 297 finales. Si un «Bloque HTML» vuestro lleva un margen interior propio, se suma | Los 80 px son el valor por defecto en escritorio y en celular. La reserva del botón A-/A+ va dentro de esos 80, y ni la última sección ni el último paso suman su separación. |
| 27 | Las variables de la paleta (`--cs-palette-<id>-<rol>`) también en la salida slide, con la paleta activa de slide | `PARA-CANTU-STUDIO-2026-10-12.md` §27 | **CONSTRUIDA Y APROBADA (2026-10-13)** — la regla ya dice cómo funciona en slide (`REGLA-DEL-BLOQUE-HTML-PALETA-Y-TAMANO.md`): las mismas variables con la paleta de slide, y sin A+/A- | `RUN-CANTU-SLIDE-PALETTE-VARIABLES-001`. Ninguna slide publicada cambia de color: L01 sigue con sus hex hasta que los cambiéis. Corrió en paralelo con los mandos de la 25/26. El contrato de la 25/26 ya está hecho: con los valores por defecto, L01 se ve como vuestra maqueta. Mientras tanto, vuestros hex marcados con un comentario son el camino correcto. La prueba de terminado es la vuestra: `var(--cs-palette-def-accent)` pinta el Malva de la paleta de slide en la vista previa y en el SLIDE.html. |
| 28 | Siete ajustes de slide medidos en la slide de L01 (28.1 a 28.7) | `PARA-CANTU-STUDIO-2026-10-12.md` §28 | **SEIS CONSTRUIDAS Y APROBADAS (2026-10-13); la 28.1 no se construye** (`RUN-CANTU-SLIDE-SEVEN-FIXES-FROM-L01-001`) | **La 28.1 («Jerarquía» a 28 px) no cabe:** con 28 px ninguna «Jerarquía» entra en la lámina, porque el alto la limita (medido en las 6 que existen). El operador eligió no tocar el motor: **L01·D2 conserva su Bloque HTML**. Si alguna vez necesitáis el árbol a 28 px, pedidlo: la vía sería que las tarjetas se ensanchen cuando sobra ancho, con un tope de nodos. **Lo construido:** el número de paso a 28 px como mínimo; el paso 0 respeta su etiqueta; el cuerpo de las láminas (no solo «Libre»), simétrico y alineado con el título; el «Gráfico SVG» sin tope de 600 px, con su marco llenando la celda; el botón de la tinta invisible en reposo, que aparece al pasar el ratón; el «Resultado» en verde oscuro, `#2D4A2D`. *Lo que se decidió antes, y quedó superado:* El motor nunca bajará de 28 px en el texto de la «Jerarquía» ni en el número de paso, y cambiará todas las slides a propósito. Las otras cinco son correcciones sin campo nuevo: la etiqueta del paso 0, los márgenes de «Libre», el alto del «Gráfico SVG», el botón de tinta y el contraste del «Resultado». Todo va en un lote, con una sola QA, y la prueba de terminado es la vuestra. |
| 29 | «Ver cálculo»: un renglón de fórmula no se parte a la mitad (reduce su letra) y los renglones se alinean en el «=» | `PARA-CANTU-STUDIO-2026-10-15.md` §29 | **CONSTRUIDA Y APROBADA (2026-10-16)** (`RUN-CANTU-CALCULATION-NOTE-LINES-FIT-AND-ALIGN-AT-EQUALS-001`) | **Lo construido:** los renglones de «Ver cálculo» ya no se parten a la mitad, y los «=» quedan uno debajo del otro. Si un renglón no cabe, la letra de toda la nota se achica junta. **LA LETRA MÍNIMA: el 60 % de la letra normal de la cuenta**, y sigue a A+/A−: con A 1,00 son **12,14 px**; con A+ ×3, **15,79 px**. Si ni así cabe, el renglón se desplaza de lado. **En Moodle no se achica** (no corre el script): el renglón no se parte y va alineado, pero si no cabe se desplaza. **Cuándo partir a mano** (signos por renglón): hasta 16, cabe en todas partes; hasta 20, en todas menos el teléfono con A+ ×3; hasta 28, solo en pantalla ancha; **más de 28, partidlo a mano**. El renglón de L02 tiene 19. «A la izquierda, en bloque» sigue alineando el principio de los renglones, no el «=»; el operador lo dejó así. El detalle está en el §4 del reporte del taller (`cantu-studio/QA/temp/RUN-CANTU-CALCULATION-NOTE-LINES-FIT-AND-ALIGN-AT-EQUALS-001/99-REPORTE.md`). *Visto de paso, no construido:* en el teléfono «Se obtiene:» parte la fórmula; L03 usa `\textcolor`, que falla en MathJax 2 de Moodle (ya pasaba antes). |
| 30 | «Procedimiento matemático»: dos variantes de verde para el paso de resultado (la de hoy y una más oscura), elegibles desde el borrador | `PARA-CANTU-STUDIO-2026-10-17.md` §30 | **CONSTRUIDA Y APROBADA (2026-10-18)** (`RUN-CANTU-RESULT-STEP-STRONG-GREEN-VARIANT-001`) | **EL NOMBRE: `"resultGreen": "strong"`, en el paso de resultado.** `"light"`, o no escribir nada, deja el verde de siempre, byte a byte. No es un valor de `color`: un id que la paleta no define, como el `"res-fuerte"` del ejemplo, se habría ignorado en silencio. **Reglas:** cualquier otro valor se rechaza nombrando el campo; solo vale en el paso de resultado; con el campo puesto, «Color del paso» va vacío o en `res`. **La fuerte** es `color-mix(in srgb, var(--cs-palette-res-accent) 60%, var(--cs-palette-meta-text))`, sale de la paleta activa y pinta la franja, su borde inferior, la palomita y el contorno; lo blanco sigue blanco. Con la paleta de hoy da rgb(110, 130, 108), el mismo verde que la cabecera de vuestro paso a paso. Un navegador sin `color-mix` cae al verde claro. Llega a Web, a la vista previa y a Moodle. El editor conserva el campo al abrir y guardar, pero no tiene mando para él: se pone o se quita en el JSON. *Visto de paso, no construido:* en el teléfono, la palomita del verde claro sigue en `#A3BE8C` fijo aunque el resultado lleve otro color (ya pasaba antes). |
| 31 | Cuatro componentes que en pantallas angostas se desplazan o cortan («Diagrama jerárquico» en celular y a 1024 px, «Procedimiento matemático», «Lista con etiquetas»), más permitir `\allowbreak` | `PARA-CANTU-STUDIO-2026-10-17.md` §31 | **partes 1 y 2 CONSTRUIDAS Y APROBADAS (2026-10-19); partes 3 y 4 construidas, en QA; parte 5 PARADA** — dos runs en paralelo: A (`RUN-CANTU-HIERARCHY-DIAGRAM-FITS-NARROW-SCREENS-001`, partes 1 y 2) y B (`RUN-CANTU-NARROW-SCREEN-FIXES-PROCEDURE-TAGGED-LIST-ALLOWBREAK-001`, partes 3, 4 y 5) | **El diagrama (A, aprobado):** a 1024 px L01 pasa a la forma de celular, que ahora decide la caja (también en Moodle); a 320 px el nodo más hondo pasa de 44 a 232 px; ninguna palabra partida a la mitad, ℚ′ entera; las fórmulas encogen su letra y no dejan caja desplazable; a 1280 px o más, L01 idéntico. Vuestra medición de la regla 35 en L01: 132 → 0. Ya podéis poner los nombres completos en L01·S1. **`\allowbreak` (parte 5) no entra:** MathJax 2 y 3 de Moodle no lo conocen y el alumno lo vería en rojo. La recomendación de Studio es resolver L05·EG en el borrador: «Incorrecto: \(5\)» / «Correcto: \(500\)», con «disminuye» en la explicación (medido: L05 queda en 0 en Web y en Moodle M3). **Medido por Studio al abrir:** el diagrama pasa a la forma de celular según el ancho de la VENTANA (920 px), no el de su caja; por eso a 1024 px intenta el árbol ancho en una caja más estrecha. Centra con `justify-content` (lo que sobresale por la izquierda no se alcanza). En celular, cada nivel suma 57 px de sangría (la cabina dijo 22 al abrir: contaba solo `.cs-m-children`; corregido), y títulos e insignias llevan `overflow-wrap: anywhere`. La fórmula del procedimiento encoge con `transform`, que no reduce el área desplazable. Cada ítem de la lista lleva `overflow: hidden` en línea. `\allowbreak` no está en la lista de comandos admitidos, y KaTeX solo parte dentro de fórmulas en línea, no en las de bloque: el reporte dirá dónde parte de verdad, también en Moodle. **Para las partes 1 a 4 no tenéis que tocar ningún borrador**: al recompilar cambian L01, L02, L03, L04, L06 y L07; a 1280 px o más no cambia nada de lo que se ve. Con A cerrado podéis poner los nombres completos en el diagrama de L01·S1. *Un choque con vuestra regla 35:* el #263 deja a propósito un desplazamiento cuando un renglón de «Ver cálculo» no cabe ni al 60 % (más de 28 signos), y el ajuste de las fórmulas también tiene un tope. Eso sigue siendo «partir a mano», no un defecto del componente. |
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

## El orden en que Studio construye lo vuestro (la cola de `cantu-studio`, a 2026-10-10)

Studio trabaja en tres carriles a la vez: lo que cambia la lección publicada va en fila; el editor y los documentos, en
paralelo.

| run | para qué os sirve |
|---|---|
| «Diseño de página»: un ajuste del editor para la banda, el ancho de la tarjeta, el margen, el espacio antes de cada título y la insignia (**hecho**: el botón «Diseño de página» de la vista previa Web) | la densidad y la cabecera de todas las lecciones (peticiones 11 y 13) |
| Los Bloques HTML siguen la página: la paleta activa y el tamaño de letra A+/A- (**hecho**: regla en `REGLA-DEL-BLOQUE-HTML-PALETA-Y-TAMANO.md`) | vuestros Bloques HTML provisionales (petición 20) |
| Contrato común de los bloques destacados, ronda 2 | lo que comparte «Para saber más» |
| «Para saber más» · contrato e interfaz (**hecho**) | L01, «Lado y distancia» (peticiones 14, 16 y 18) |
| «Procedimiento matemático» con dos notas por paso · contrato e interfaz (**hecho**) | L01, el ejemplo guiado (petición 21) |
| «Tabla» de varias columnas · contrato (**hecho**) e interfaz (**hecho**) | L01 (petición 9); no dentro de «Para saber más» |
| «Regla matemática» ajustada · un solo run (**hecho**) | L01, «Principio de no negatividad» (petición 17) |
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

