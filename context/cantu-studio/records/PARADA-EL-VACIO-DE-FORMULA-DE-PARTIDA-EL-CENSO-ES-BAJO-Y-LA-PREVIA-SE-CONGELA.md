# PARADA — el censo de «Fórmula de partida» sale BAJO, y el paso nuevo CONGELA LA PREVIA ENTERA

> `RUN-CANTU-SLIDE-STACK-PREMATH-BLANK-MEANS-BLANK-001` (`queue_order` **153**).
> Medido el **2026-08-28** entre las **14:14** y las **14:25** (UTC−06:00).
> **NO SE TOCÓ UNA LÍNEA DE CÓDIGO.** Ni git, ni el corpus, ni el estado del run, ni `.project/`.
> Este run no empezaba escribiendo, y no escribió.

---

## LA GUARDA

`queue_order` **153** → `RUN-CANTU-SLIDE-STACK-PREMATH-BLANK-MEANS-BLANK-001`, `status: active`,
objetivo O3, fase O3.P3. Su `title` coincide **exactamente** con el de la orden. **La guarda pasa.**

## EL REINICIO, CON LA HORA DELANTE

Había servidor vivo con **una conexión de navegador establecida** — el perfil del operador.

    14:14:46  medido: 5173 (UI, PID 25440) y 3000 (API, PID 34592) LISTENING, con ESTABLISHED
    14:14:59  los dos procesos detenidos
    14:15:5x  API relanzada (`[API] Corriendo en http://localhost:3000`)
              UI relanzada (`VITE v8.0.10 ready in 477 ms`, puerto 5173 con `--strictPort`)
    14:18:03  primera medición del corpus
    14:2x     medición de superficie sobre la SEGUNDA instancia, puerto 5174
    14:25     5174 detenida y su almacenamiento vaciado; quedan 5173 y 3000, como estaban

---

# ⚠ TRES CORRECCIONES A LA CABINA, ANTES DE LAS CIFRAS

## 1 · LA TÉCNICA QUE EL TICKET MANDA COPIAR **NO ESTÁ DONDE DICE**

El encargo dice que un run anterior «resolvió el riesgo así: toma su huella desde una página
estática del mismo origen y monta una segunda instancia del editor en otro puerto», y que **está
en el cierre de `RUN-CANTU-SLIDE-MATRIX-WRITE-IT-ONCE-001`. Cópialo.**

**No está.** Ese run no tiene cierre; lo que tiene es `PARADA-152-LA-MATRIZ-YA-SE-ESCRIBE-UNA-VEZ-
EN-EL-MOTOR.md`, y ahí se dice **lo contrario**, con estas palabras:

> «el taller **no abrió el editor** para no arriesgarse a escribir en la ranura» … «**Es la única
> cifra que falta**, y sólo importa si se elige la B.»

Su sonda (`QA/temp/.../capturar.mjs`) **no lee `localStorage`**: fabrica un borrador sintético en
Node. La técnica **hubo que reconstruirla**, no copiarla. Queda escrita abajo para que la próxima
vez sí exista.

## 2 · EL RIESGO CASI SE DISPARA, Y NO POR DONDE SE VIGILABA

`preview_start` **navegó mi panel a `http://localhost:5173/` —la raíz del editor— dos veces**,
por su cuenta, al engancharse a `.claude/launch.json`. Si el servidor hubiera estado arriba, el
editor **habría arrancado en el perfil del operador**.

**No arrancó, y está comprobado:** en los dos intentos el documento se quedó sin origen
(`Access is denied for this document` al pedir `localStorage`, URL «non-http»), porque el
servidor estaba caído en ese instante. **Fue suerte de secuencia, no cuidado.** Se anota porque
la trampa del ticket es real y estuvo a un segundo de cumplirse.

## 3 · LA CIFRA BRUTA DEL CENSO **MIENTE**, Y POR POCO LA PUBLICO

Contar «pasos sin `preMath` con paso anterior» da **24**. La cifra real de pasos cuyo dibujo
cambia es **2**. El porqué está abajo; es el aviso de «comprueba que tu recorte no sea un no-op»,
**del derecho**: aquí lo que había que comprobar es que el recorte **no estuviera inflado**.

---

# LA TÉCNICA, RECONSTRUIDA Y VERIFICADA — para que la próxima vez se copie de verdad

**LA HUELLA, SIN ARRANCAR EL EDITOR.** `tools/author-lite/editor-ui/mathlive-smart-input.html`
se sirve en el **MISMO ORIGEN** (`localhost:5173`) pero carga **otro módulo**
(`/src/experiments/mathlive-smart-input/main.jsx`), **no** `/src/main.jsx`. Comprobado con
`grep`: **ningún fichero bajo `src/experiments/` toca `localStorage`.** Desde ahí se lee la
ranura del operador **sin montar `EditorPage` y sin que el autoguardado exista**.

⚠ **NO VALE UNA RUTA INVENTADA.** Vite hace *fallback* de SPA a `index.html`, así que
`/loquesea` **arranca el editor**. Tiene que ser un `.html` real que esté al lado de `index.html`.

**LA SEGUNDA INSTANCIA.** `npm run dev -- --port 5174 --strictPort`. `localStorage` se reparte
**por origen, y el puerto forma parte del origen**: `localhost:5174` tiene ranura propia y vacía.
Ahí se conduce la interfaz sin poder tocar la del operador.

**LA VERIFICACIÓN, LAS DOS PUNTAS:**

    antes  ·  5173 → jame_draft_buffer_slide = 1716 bytes, 3 claves
    5174   ·  origen propio, ranura propia, vaciada al terminar
    después·  5173 → jame_draft_buffer_slide = 1716 bytes, LAS MISMAS 3 claves

**EL BORRADOR DEL OPERADOR NO SE TOCÓ.**

---

# LO QUE DICE EL DISCO — todas las afirmaciones del ticket, comprobadas

| Afirmación del ticket | Disco |
|---|---|
| respaldo implícito en `renderStackSlide.js:479-484` | **EXACTO** |
| la flecha en `:462`, con `focusStep.hideArrow === true \|\| data.hideArrow === true` | **EXACTO**, y **no consulta el dato** |
| `agregarPaso()` crea `{ title: 'Paso N', math: '' }` | **SÍ** — `{ title: \`Paso ${destino}\`, math: '' }`, `SlideStackEditor.jsx:474-495` |
| `StackSlideStepSchema` declara `math: z.string().min(1, 'Este campo es obligatorio')` | **SÍ** |
| el comentario dice «EL PASO NUEVO NACE CON LO MINIMO QUE VALIDA» | **SÍ, Y ES FALSO**: `''` no pasa `min(1)` |
| `StackSlideStepSchema` **no** es `.strict()` | **CONFIRMADO** — cierra en `});` pelado (`:4418`). La autocorrección del ticket se sostiene |
| ocho ficheros de prueba nombran `preMath` | **OCHO, EXACTOS** — incluidos `slideStackAuthoringSurfaceRepair` y sus cuatro rondas, y `slideStackTypeExpose` |

**LA DERIVA DE NÚMEROS, NOMBRADA:** los comentarios del **esquema** citan `:282-284` para el
respaldo y `:271` para la flecha. Los de hoy son `:479-484` y `:462`. El ticket avisaba y tenía
razón.

## `renderTimeline.js` — **NO ES ESTE DEFECTO.** No hay parada por ahí

`src/builders/web/partials/renderTimeline.js:295`:

    const mathSource = step.preMath || step.math;

Cae a **su propio `math`**, nunca al **del paso anterior**. Es primo hermano —otra trampa de `''`—
pero **no** es «me agarra la fórmula del paso anterior y la imprime». **Otro carril, fuera de
alcance, y no lo toqué.**

---

# EL CENSO — respuesta a las cuatro preguntas

Sonda: `QA/temp/RUN-CANTU-SLIDE-STACK-PREMATH-BLANK-MEANS-BLANK-001/censo.mjs`, sobre **los 31
ficheros** de `src/content`, los **31 cargan**, **con control positivo** que ve las cuatro clases.

## (a) CUÁNTOS BLOQUES — **23 distintos**

    22  ·  src/content/sandbox/test_math_walkthrough.js   (escenas de banco de pruebas)
     1  ·  src/content/staging/Aritmetica/1_propiedades_numeros_slide.js
    ──
    23  distintos por contenido, CERO duplicados internos

**EL AGREGADOR NO APORTA NINGUNO.** `showcase_library` trae 22 bloques y **los 22 ya están** en
el corpus. **Y ojo con cómo se mide:** el `===` **miente aquí**, y en la dirección contraria a la
esperada — `showcase_library` **invalida la caché de `require`**, así que devuelve **objetos
nuevos** y la comparación por referencia dice «22 propios». Hay que dedup **por contenido**.

## (b) CUÁNTOS PASOS, Y CUÁNTOS CAMBIAN — **165 pasos; cambian DOS**

    165  pasos en total
    118  declaran su propia «Fórmula de partida»
     23  son el paso 0 (sin paso anterior: hoy ya pintan vacío, no cambian)
     24  caen en la rama del respaldo   ← LA CIFRA BRUTA
    ───
      2  CAMBIAN LO QUE SE PINTA        ← LA CIFRA REAL

**POR QUÉ 22 DE LOS 24 SON UN ESPEJISMO.** Esos 22 son el **último** paso de cada bloque del banco
de pruebas, y llevan `type: 'result'`. En `:459-461` eso los hace `isSingleView`, y `:632` es

    getMathContent(isSingleView ? focusStep.math : prevMathRaw)

o sea que en el paso de resultado **el respaldo se calcula y se tira**. Retirarlo **no les mueve
un píxel**. Publicar 24 habría sido inflar la cifra doce veces.

**LOS DOS QUE SÍ CAMBIAN**, y son todo lo que hay:

    src/content/staging/Aritmetica/1_propiedades_numeros_slide.js
      sectionsSlide[4] — «Ejemplo Paso a Paso», 3 pasos, NINGUNO declara preMath
      → pasos 1 y 2 (de 3). Dejarían de pintar su fórmula de partida.

## (c) `preMath` COMO CADENA VACÍA — **CERO**

En todo el corpus, **ningún paso** declara `preMath: ''`. Hoy «vacío» y «no declarado» son el
mismo estado, y **nadie ha escrito nunca el vacío explícito**, justo porque no se puede expresar.

## (d) `preMathVariant` SIN `preMath` — **CERO, y hay algo más gordo detrás**

- En el **corpus**: 21 pasos lo llevan, y **los 21 declaran también su `preMath`**. Cero huérfanos.
- **EN EL ESQUEMA NO EXISTE.** `preMathVariant` **no está declarado** en `StackSlideStepSchema`
  —ni en el del compilador ni en el del editor—; sólo aparece en comentarios. Y como el esquema
  **no es `.strict()`**, Zod **le quita la clave en silencio**. **Un borrador NO PUEDE llevarlo:
  el canal está cortado entre la superficie y el motor.**
- **EN EL MOTOR** (`:486`) la clase `ghost` se aplica **mire o no si hay `preMath`**. Si se retira
  el respaldo, esa clase caería sobre una ranura **vacía**.

## LOS BORRADORES — cero por las dos vías, con control positivo

    11 borradores en disco (src/content/author_lite/drafts) →  0 bloques de este tipo
       control: la sonda sí ve card, narrative, callout, columnsSlide, list, header,
                spacer, visual, video, columns — 10 tipos. El cero no es de sonda mala.

    borrador VIVO del operador (5173) → 3 bloques: titleSlide + 2 columnsSlide
                                        (narrative, arithmetic). NINGUNO de este tipo.

# ✅ EL CENSO **NO** DISPARA LA PARADA

**Dos pasos, en un fichero de *staging*.** No hay que migrar nada. Sembrar o corregir esos dos es
una decisión de dos líneas, no de proyecto.

---

# ⚠ PERO HAY UN HALLAZGO QUE EL CENSO NO BUSCABA — **EL BLOQUE NUEVO NACE VIVIENDO DEL RESPALDO**

Medido conduciendo la interfaz: al crear un «Procedimiento matemático», **la semilla trae tres
pasos y NINGUNO declara «Fórmula de partida»** — los tres muestran «Sin fórmula»:

    { title: 'Ecuación lineal',            math: '2x + 3 = 11' }
    { title: 'Restar 3 en los dos lados',  math: '2x = 8'      }   ← vive del respaldo, Y SE PINTA
    { title: 'Dividir entre 2',            math: 'x = 4', isResult: true }

**O sea que el problema no es sólo el corpus: es lo que el editor entrega a estrenar, hoy.**
Retirar el respaldo cambia lo que pinta **todo bloque recién creado**, para cualquiera, desde el
primer segundo. **Es exactamente la misma pregunta que `agregarPaso` —con qué nace un paso— pero
un nivel más arriba: con qué nace el BLOQUE.** Si se adopta la propuesta del operador (sembrar
explícito, idioma de `DECISION-132`), **la semilla del bloque tiene que entrar en el mismo
criterio**, o el defecto sigue vivo en el sitio donde más se ve.

---

# ⚠⚠ EL SEGUNDO DEFECTO — (c) MEDIDO SOBRE LA SUPERFICIE — **PARA Y REPORTA**

**LA CONDICIÓN QUE EL TICKET DECLARÓ COMO PARADA SE CUMPLE.** Medido en la instancia aislada
(5174), con la previa viva y compilando:

    ANTES  ·  POST /api/preview/slides/render → 200 OK   (la previa pinta)
    CLIC   ·  «+ Agregar paso»
              → se inserta { title: 'Paso 2', math: '' } ANTES del paso de resultado
    DESPUÉS·  POST /api/preview/slides/render → 400 Bad Request

**LO QUE VE EL AUTOR, LITERAL, EN EL PANEL:**

    No se pudo generar la vista previa Slide
    Fallo de validación para Preview Real Slides

    La diapositiva 2 tiene campos faltantes.
    Reintentar preview

**Y LO QUE NO VE:**

    campos con aria-invalid ........................ 0
    mensajes «Este campo es obligatorio» en pantalla  0

**NINGÚN CAMPO SE MARCA EN ROJO.** El aviso es **de diapositiva**, no de campo. El autor sabe que
algo falta en la diapositiva 2 y **no sabe qué**.

**Y NO ES SÓLO ESA DIAPOSITIVA: SE CONGELA LA PRESENTACIÓN ENTERA.** Comprobado moviendo otro
campo después:

    escribí «MARCA-DEL-TALLER» en el título del procedimiento
      → llegó al borrador:  studioTitle: "MARCA-DEL-TALLER"     ✔
      → la previa:          v=1  ANTES  y  v=1  DESPUÉS         ✘ no avanzó
      → el render:          400 otra vez

El `<iframe>` **sigue visible a 896×504 enseñando el ÚLTIMO DIBUJO BUENO**, así que la pantalla
parece sana mientras ya no obedece. **Desde ese clic, ningún cambio en ninguna diapositiva se
pinta hasta que el autor rellene esa fórmula.**

**LA PUNTILLA: EL DATO EXACTO EXISTE Y LA SUPERFICIE LO TIRA.** El cuerpo del 400 dice:

    {"success":false,"mode":"slides",
     "message":"Fallo de validación para Preview Real Slides",
     "errors":[{"code":"too_small","minimum":1,
                "message":"Este campo es obligatorio",
                "path":["slideBlocks",1,"steps",2,"math"]}]}

**La ruta al campo llega entera** —bloque 1, paso 2, `math`— y la superficie la sustituye por «la
diapositiva 2 tiene campos faltantes». **Pintar ese campo en rojo no requiere medir nada nuevo:
requiere no tirar lo que ya llega.**

## POR QUÉ ESTO ES PARADA Y NO UNA RONDA MÁS

El ticket lo dejó escrito: **«SI (c) DEVUELVE QUE LA PREVIA ENTERA DEJA DE COMPILAR AL AÑADIR UN
PASO, PARA Y REPORTA: eso es más grave que el defecto que abrió este run y cambia su prioridad en
la cola.»** **Devuelve eso.** El defecto de «Fórmula de partida» le quita libertad de edición al
autor; **éste le quita la previa entera, con un botón que la interfaz ofrece como normal, y sin
decirle por qué.**

---

# LO QUE DECIDE EL OPERADOR

1. **LA PRIORIDAD.** El segundo defecto congela la previa completa. ¿Se reordena la cola?
2. **`math: ''` — las tres preguntas del ticket, ahora con la medición delante.** Sabiendo que el
   coste es *la previa entera se congela sin decir qué campo*: ¿sobra el `math: ''`, sobra el
   comentario, o lo que sobra es **que el error no señale el campo**? Son tres arreglos distintos
   y **la medición apunta al tercero como el más barato y el que más duele hoy.**
3. **EL CORPUS: dos pasos.** Cifra baja. ¿Se siembran esos dos o se dejan?
4. **LA SEMILLA DEL BLOQUE NUEVO**, que el ticket no contemplaba: sus tres pasos nacen sin
   «Fórmula de partida». ¿Entra en el mismo criterio que `agregarPaso`?

**No se escribió código. La decisión es suya.**
