# RONDA 3 — la red NO es ciega, **el número malo era el mío**, y el paso nuevo ya nace válido

> `RUN-CANTU-SLIDE-STACK-PREMATH-BLANK-MEANS-BLANK-001`, ronda 3. Medido el **2026-08-28** entre
> las **15:21** y las **15:31** (UTC−06:00).
> **NO SE TOCÓ GIT.** Ni el status del run, ni `.project/`. **No se llamó a `preview_start`.**

    15:21:54  medido: 5173 y 3000 LISTENING
    15:22:00  los dos procesos detenidos
    15:22:0x  API y UI relanzadas a mano (5173, `--strictPort`)
    15:2x     segunda instancia en 5174 para conducir la superficie
    15:30:26  5174 vaciada y detenida; quedan 5173 y 3000

    borrador del operador   ANTES: 1716 bytes, 3 claves
                          DESPUÉS: 1716 bytes, LAS MISMAS 3 claves

---

# ⚠ 1 · LA DISCREPANCIA, RESUELTA — **GANA LA CABINA. LA RED NO ES CIEGA.**

**Corro la red entera, que es lo que la cabina no pudo:**

    node --test tools/author-lite/compiler-api/tests/webCorpusFixtureNet.test.mjs
    ✔ red: los 63 arboles del corpus siguen siendo los fijados
    16 pruebas, 16 pasan, 0 fallan

**Y el árbol de ese fichero coincide BYTE A BYTE con el motor de hoy.** Cero movimiento.

## EL MECANISMO, QUE ES DONDE ESTABA MI ERROR

**`renderSlides` pinta UNA diapositiva por SECCIÓN**, con el `focusIndex` que la sección declara
—0 si no declara—. **No expande un bloque en N.**

**QUIEN EXPANDE ES EL COMPILADOR**, `compiler.js:3950`:

    return pasos.map((paso, focusIndex) => { ... type: 'stackSlide', steps: pasos, focusIndex ... });

**y el corpus NO PASA POR EL COMPILADOR.** Es JS a mano, y hace la expansión **él mismo**:
`test_math_walkthrough.js:335-359` recorre los pasos en un bucle y **empuja una sección por paso**
con su `focusIndex: index`. **Por eso son 22 secciones y no 1 bloque.**

**Y el fichero de `staging` NO declara `focusIndex`**, así que se pinta **sólo en el foco 0** —
que es `isStart`, o sea **vista única**, donde el respaldo nunca se pintaba. **No cambia.**

## LO QUE EL CORPUS PINTA DE VERDAD, MEDIDO

    secciones de «Procedimiento matemático» ..................... 23
      con `focusIndex` declarado ................................ 22
      sin declararlo (luego foco 0) .............................  1
    de los focos que se pintan:
      son vista única ...........................................  7
      declaran su propio `preMath` .............................. 16
    ─────────────────────────────────────────────────────────────────
    ESCENAS QUE CAMBIAN ........................................   0

## POR QUÉ MI SONDA DIJO «2»

**Pintaba CADA bloque en CADA uno de sus focos** — 165 escenas — en vez de en **el único** que su
sección declara. Dos de esas 165 se movían. **Pero son vistas que el corpus nunca pide.** Mi cifra
describía **un camino hipotético** —ese bloque compilado como borrador, que sí daría 3 escenas—
**y no el corpus**.

**CORRECCIÓN AL INFORME DE LA RONDA 2:** donde dice «cambian 2 escenas del corpus», **la cifra
correcta es CERO**. Las dos son reales para un **borrador** con esa forma; no para el corpus.

## Y EL CONTROL POSITIVO, PARA NO CONFUNDIR «CERO» CON «CIEGA»

Pinto la sección de `staging` en el foco 1 —vista doble, la que el corpus nunca pide— de las dos
maneras: con el `preMath` **escrito** (lo que el motor viejo heredaba) y **como queda hoy**:

    los dos arboles canonicos difieren:  SÍ
    j-stage-divider ....... 3 → 2
    j-stage-input ......... 9 → 8
    j-math-wrapper ....... 12 → 11
    j-arrow-anchor ........ 2 → 1

**La representación de árbol SÍ captura este cambio.** Así que «cero árboles movidos» significa
**«el corpus no tiene ese caso»**, no «la red no lo ve». **NO HAY PARADA POR AQUÍ.**

**LO QUE SÍ QUEDA DICHO, y es un hueco de cobertura, no un defecto:** ninguna pieza del corpus
ejercita una escena de vista **doble** sin `preMath`, así que **la red de 63 árboles no puede
vigilar este cambio desde el lado del corpus**. Lo vigila la red propia de este run.

---

# 2 · `agregarPaso()` SIEMBRA EL `math` ✅

Decisión del operador, verbatim **«a»**. La semilla queda:

    { title: `Paso ${destino}`, preMath: formulaAnterior, math: formulaAnterior }

**No inventa contenido y no toca ningún contrato** — ni esquema, ni compilador, ni motor. Lo único
que cambia es con qué nace un objeto del borrador. Las otras dos salidas quedan escritas en el
código con su motivo: **el relleno inventado** mete texto que nadie pidió, y **`math` opcional** lo
descarta el propio esquema («sin ella el paso no dice nada y el historial pintaría un hueco»).

---

# 3 · LA PREVIA EN **200**, CONDUCIDO — NO DEDUCIDO ✅

En la instancia aislada, con la previa viva y compilando, pulsando **«+ Agregar paso»**:

    ANTES  ·  3 pasos, sin error en el panel
    CLIC   ·  «+ Agregar paso»
    DESPUÉS·  POST /api/preview/slides/render → 200 OK      ← era 400 en las rondas 1 y 2

El borrador, tras el clic:

    { title: 'Ecuación lineal',           math: '2x + 3 = 11' }
    { title: 'Restar 3 en los dos lados', preMath: '2x + 3 = 11', math: '2x = 8' }
    { title: 'Paso 2',                    preMath: '2x = 8',      math: '2x = 8' }   ← el nuevo
    { title: 'Dividir entre 2',           preMath: '2x = 8',      math: 'x = 4', isResult: true }

    error en el panel: NO        campos en rojo: 0

**Y LO QUE SE PINTA, descargado de la previa real:** 5 diapositivas —la portada más las **cuatro**
que el compilador saca del bloque—, **cero `undefined`**, y la escena nueva con

    entrada:  \[ 2x = 8 \]
    flecha:   sí
    salida:   \[ 2x = 8 \]

**que es exactamente el coste cosmético que el operador aceptó:** el paso enseña el mismo
resultado repetido **hasta que se escribe encima**.

---

# 4 · EL PRIMER PASO SIGUE NACIENDO COMO HOY — **y el caso SÍ existe** ✅

**Sembrar hacia atrás no tiene de dónde, y ese camino es ALCANZABLE, no teórico:**

- el borrado se bloquea en **un** paso (`ultimo={pasos.fields.length <= 1}`);
- la casilla «Cerrar con este paso como resultado» **se ofrece en el último**, y con un solo paso
  ese paso **es** el último;
- con un único paso marcado como resultado, `destino = cuantosPasos - 1 = 0`.

**Por ahí el paso nuevo sigue naciendo con `math: ''` y la previa sigue devolviendo 400.** No se
tapa inventando una fórmula: **no hay de dónde derivar**, y el criterio es que el primer paso nazca
como nace hoy. **Queda FIJADO como conducta declarada** en la red (§5, «SIN paso anterior no se
siembra nada, y ese caso es ALCANZABLE»), no como descuido.

**Es un hueco residual, estrecho y nombrado. Decide el operador si merece run.**

---

# 5 · EL CORPUS NO SE MUEVE ✅

    escenas del corpus que cambian:  0   (antes y después de sembrar el `math`)
    red de 63 árboles:               VERDE

Cuadra con el punto 1: **sembrar el `math` toca sólo el editor**; el corpus no pasa por
`agregarPaso` ni por la fábrica de bloques.

---

# 6 · LA GUARDA CRECE, Y POR MUTACIÓN ✅

`slideStackPreMathBlankMeansBlank.test.mjs` pasa de **16 a 20 pruebas**. Las cuatro nuevas (§5):

- **el paso nuevo nace VÁLIDO**, y —el contraste que lo prueba— **con la semilla vieja NO**, con el
  fallo cayendo exactamente en el `math` del paso nuevo. **Va por `DraftSchema`, ejecutado.**
- la fórmula sembrada es **la del paso que queda delante**, y va **en los dos campos**;
- **sin paso anterior no se siembra nada**, y ese caso es alcanzable;
- y `agregarPaso` **escribe de verdad** las dos claves, con su guarda de veracidad.

El arnés pasa de 12 a **15 mutaciones**:

    MUTACIONES: 15   INALCANZABLES: 0
    ARBOL RESTAURADO: SI, byte a byte
    RED TRAS RESTAURAR: VERDE

**⚠ Y OTRA VEZ EL ARNÉS CAZÓ UNA DEBILIDAD MÍA.** La mutación **M15** —cambiar el respaldo de
`formulaAnterior` en el fuente— salía **VERDE**. El motivo es estructural y conviene que quede
escrito: **las tres pruebas ejecutables de §5 REPRODUCEN la inserción**, porque `agregarPaso` vive
en un `.jsx` y `editor-ui` no tiene jsdom ni banco de componentes. Fijan **el contrato** —un paso
con esa forma valida— pero **no pueden ver que el fuente se mueva**. Esa mitad la cubren los
anclajes de texto, y faltaba uno. Añadido: **M15 ahora sale roja.**

---

# 7 · LAS PRUEBAS DE LO QUE TOQUÉ ✅ — 378/378

Todas las que nombran `renderStackSlide`, `createDefaultStackSlideBlock` o `SlideStackEditor.jsx`,
más `webTimelineNormalStepsSafety` y **la red de 63 árboles**. **No se corrió la suite completa.**

---

# 8 · LO QUE NO PUDE VERIFICAR

- **CAPTURA DE PANTALLA: no.** El panel del navegador no compone fotogramas en esta sesión. Lo
  sustituí, otra vez, por descargar el HTML de la previa real y auditarlo escena por escena — está
  arriba. **La QA visual sigue siendo suya, y este run cierra con ella.**
- **`agregarPaso` no se puede montar en una prueba.** Va conducido a mano en 5174 (resultado
  arriba) y fijado por contrato + anclaje de texto. La limitación queda escrita en la propia red.
- **DOS ERRORES DE LINT PREEXISTENTES** en `TextAreaField.jsx:106` y `:144`, ficheros que no toqué.
  **Mis ficheros salen limpios.**

---

# LO QUE SIGUE SIN RUN, Y NO TOQUÉ

- **La congelación silenciosa de la previa** (`#154`). Que el paso nazca válido hace que **deje de
  dispararse por este camino**; **no la arregla**. Sigue disparándose por el camino del punto 4.
- **El `preMath` viejo del paso de resultado** al insertar delante. Nombrado en la ronda 2, sigue
  sin run.
- **El hueco de cobertura del corpus** del punto 1: ninguna pieza ejercita una escena de vista
  doble sin `preMath`.

---

# FICHEROS TOCADOS EN ESTA RONDA

    .../editor-ui/src/features/editor/components/slide/SlideStackEditor.jsx   siembra del `math`
    .../compiler-api/tests/slideStackPreMathBlankMeansBlank.test.mjs          §5, 16 → 20
    QA/temp/RUN-.../discrepancia.mjs                                          sonda de la ronda
    QA/temp/RUN-.../arnes-de-mutacion.mjs                                     12 → 15 mutaciones

**Commit sugerido:** `feat(editor): que el paso nuevo nazca válido sembrando su fórmula`
