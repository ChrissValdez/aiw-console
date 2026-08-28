# RONDA 2 — el vacío ya significa vacío, cambian DOS, y queda UNA parada nombrada

> `RUN-CANTU-SLIDE-STACK-PREMATH-BLANK-MEANS-BLANK-001`, ronda 2. Medido el **2026-08-28** entre
> las **14:46** y las **15:06** (UTC−06:00).
> **NO SE TOCÓ GIT.** Ni el status del run, ni `.project/`. Nada versionado bajo `dist/`.

---

## EL REINICIO, CON LA HORA DELANTE

    14:46:46  medido: 5173 (UI, PID 31884... el de la ronda) y 3000 (API) LISTENING
    14:46:52  los dos procesos detenidos
    14:46:5x  API relanzada; UI relanzada en 5173 con `--strictPort`
    14:47+    todas las mediciones de esta ronda
    15:0x     segunda instancia en 5174 para conducir la superficie; vaciada y detenida
    15:05:40  quedan 5173 y 3000, como estaban

**LA TÉCNICA SEGURA, REUTILIZADA Y VUELTA A VERIFICAR.** La huella del operador se lee desde
`mathlive-smart-input.html` —mismo origen, **otro módulo de entrada**, y `src/experiments/` no
toca `localStorage` en ningún fichero—. La superficie se condujo en **5174**, que es **otro
origen** y por tanto otra ranura. **Y esta ronda no se llamó a `preview_start` ni una vez**, que
es lo que en la ronda 1 navegó solo al editor del operador: los servidores se arrancaron a mano.

    borrador del operador   ANTES: 1716 bytes, 3 claves
                          DESPUÉS: 1716 bytes, LAS MISMAS 3 claves

---

# LO ENTREGADO, CRITERIO POR CRITERIO

## 1 · EL VACÍO SIGNIFICA VACÍO ✅

`renderStackSlide.js` — se retira el respaldo implícito. La ranura de entrada es **o la fórmula
que el paso DECLARA, o nada**.

**SE MIRA POR `typeof`, NO POR VERACIDAD.** `getMathContent(undefined)` devuelve `\[ undefined \]`,
que es HTML válido y perfectamente equivocado — la misma familia que `escapeHtml(undefined)`. La
red prueba `undefined`, `null`, `0`, `false`, `123`, `{}` y `[]`: **ninguno cuela un literal.**

**Y SIN FÓRMULA NO HAY PANEL, que no es celo.** Medido sobre la hoja de este mismo fichero:
`.j-math-wrapper` lleva `min-height: 60px` y, con la flecha escondida, `.j-stack-canvas` pasa a
columna con `gap: 30px`. Dejar la ranura vacía **pero presente** reservaría **90 px de nada** y
empujaría la fórmula del paso fuera del centro: el autor borraría una cosa y vería moverse otra.
**Es la regla que Web ya fijó** en `renderTimeline` («SIN FORMULA, NO HAY PANEL»).

**LA MEDIDA, CON EL RECORTE COMPROBADO** como pide el criterio:

    165 diapositivas pintadas (cada bloque en cada uno de sus focos)
    el recorte quita  1 304 160 bytes de <style>  y  1 811 370 de <script>   ← NO es un no-op
    literal «undefined» en el cuerpo:   0  →  0

## 2 · LA FLECHA SIGUE AL DATO ✅

Tercera condición, **sumada a las dos casillas, sin tocarlas**. Probadas **las cuatro
combinaciones** (bloque × paso): con la fórmula de partida en blanco **la flecha no se pinta en
ninguna de las cuatro**; y con la fórmula puesta, **las dos casillas siguen haciendo lo suyo**.

**VA ACOTADA A `!isSingleView`, Y ESA ACOTACIÓN ES LO QUE HACE CIERTO EL «CAMBIAN DOS»:** el paso
0 y el de resultado ya no pintan flecha por su propia rama, y casi ninguno declara `preMath`. Sin
acotar, esta condición le colgaría `is-arrow-hidden` a **45 diapositivas** del corpus —cambiando
su HTML sin cambiar su dibujo—.

## 3 · LA SIEMBRA, EN LOS DOS NIVELES — ✅ el bloque, ✅ el `preMath` del paso, ⚠ el `math`

**EL BLOQUE**, conducido en la superficie viva. Un «Procedimiento matemático» recién creado nace:

    { title: 'Ecuación lineal',           math: '2x + 3 = 11' }
    { title: 'Restar 3 en los dos lados', preMath: '2x + 3 = 11', math: '2x = 8' }
    { title: 'Dividir entre 2',           preMath: '2x = 8', math: 'x = 4', isResult: true }

y **la previa compila: `POST /api/preview/slides/render → 200`.** El paso 0 no lo lleva porque no
tiene de dónde venir. **El de resultado sí**, aunque el motor lo ignore por ser vista única: la
casilla «Cerrar con este paso como resultado» **se puede desmarcar**, y sin `preMath` escrito eso
le vaciaría la fórmula de partida sin que el autor tocara ese campo.

**EL PASO**, también conducido: pulsar «+ Agregar paso» produce

    { title: 'Paso 2', preMath: '2x = 8', math: '' }

o sea la fórmula del paso anterior, **escrita explícita**, leída del **borrador vivo** y del paso
que queda **delante** (que con la inserción ante el resultado **no** es el último de la lista).

**⚠ EL `math` NO SE SIEMBRA. ES LA PARADA, Y ESTÁ ABAJO.**

## 4 · EL CORPUS: EXACTAMENTE DOS ✅

    diapositivas   165  →  165
    con flecha      85  →   83
    con «undefined»  0  →    0
    CAMBIAN:  2

    src/content/staging/Aritmetica/1_propiedades_numeros_slide.js  sectionsSlide[4]
      foco=1   flecha true→false   ranura de entrada: sí → NO
      foco=2   flecha true→false   ranura de entrada: sí → NO

**Ni un tercero.** Son los dos que el censo de la ronda 1 había nombrado, **el mismo fichero y los
mismos índices**. Los otros 22 bloques no se mueven porque sus pasos declaran su `preMath` y su
último paso es `type: 'result'`.

## 5 · WEB NO CAMBIA ✅

`renderTimeline.js:295` sigue siendo `step.preMath || step.math` —cae a **su propio** `math`—, y
queda **fijado por la red y por la mutación M12**, que lo pone rojo si alguien lo hace mirar al
paso anterior.

## 6 · LA GUARDA, DEMOSTRADA POR MUTACIÓN ✅

`tools/author-lite/compiler-api/tests/slideStackPreMathBlankMeansBlank.test.mjs` — **16 pruebas**.

    ARBOL LIMPIO: VERDE
    MUTACIONES: 12   INALCANZABLES: 0
    ARBOL RESTAURADO: SI, byte a byte
    RED TRAS RESTAURAR: VERDE

Las doce vuelven a poner el respaldo, invierten la compuerta de tipo a veracidad, pintan siempre
la ranura, retiran la tercera condición, le quitan la acotación, desconectan cada casilla, quitan
la siembra de los dos niveles, hacen leer el array congelado de `useFieldArray`, y mudan el
defecto a Web. **Las doce salen rojas.**

**⚠ Y EL ARNÉS CAZÓ UNA PRUEBA MÍA MAL ESCRITA, que es exactamente para lo que sirve.** La
mutación **M5** —quitarle la acotación a la tercera condición— salía **VERDE**. Motivo:
`is-arrow-hidden` vive en el `class` de `j-stack-card`, que va **ANTES** de `j-stack-canvas`, y mi
recorte al lienzo **cortaba justo el atributo que esa prueba leía**. Era una defensa inalcanzable
disfrazada de defensa. Corregida y re-medida: M5 ahora sale roja.

## 7 · LAS PRUEBAS DE LO QUE TOQUÉ ✅ — 374/374

Todas las que nombran `renderStackSlide`, `createDefaultStackSlideBlock` o `SlideStackEditor.jsx`,
más `webTimelineNormalStepsSafety` y la red nueva. **No se corrió la suite completa.**

**SEIS REDES FIJABAN EL CONTRATO VIEJO Y SE REAPUNTARON — NINGUNA SE BORRÓ**, y cada una lleva
escrito **qué fijaba antes y por qué ya no vale**:

| Red | Fijaba | Ahora |
|---|---|---|
| Round1 §1 | la pista prometía la herencia, y el motor la cumplía | la pista describe **la semilla**; el motor ya no hereda, y se mide **las dos ramas** |
| Round1 §2 (motor) | la expresión **completa** de dos términos | los **dos canales por separado**, para que sumar un tercero no pueda borrar ninguno |
| Round1 §2 (compilador) | el paso que no oculta **sí** pinta flecha | el fixture se **encadena a mano**, para seguir midiendo **la casilla** y no el dato |
| Round2 §1 | la semilla como literal completo | el **rótulo** se numera con `destino`, sin fijar la forma del objeto |
| Round3 §4 | «ausente pinta flecha» | fixture encadenado, misma razón |
| TypeExpose | «**NI** `preMath`: sembrarlo desataría el encadenado» | **lo inverso**: cada paso con anterior declara su `math`, escrito |

---

# ⚠ LA PARADA QUE QUEDA NOMBRADA: **CON QUÉ SE SIEMBRA `math`**

**No la resolví, y es deliberado:** el ticket la reservó al operador si el taller no sabía con qué,
y **no lo sé sin inventarme lo que se ve en su pantalla**.

**LA CASA NO TIENE PRECEDENTE QUE DESEMPATE, y lo comprobé antes de parar:** los sembrados
concretos de fórmula (`2x + 3 = 11`, `a^2 + b^2 = c^2`, `x^2`) son todos de **BLOQUE** —un ejemplo
completo que el autor sobrescribe—. **Donde se añade un ítem suelto** —el nodo hijo de
«Jerarquía»— la semilla es `math: ''`… **y ahí sí valida, porque el `math` de jerarquía es
OPCIONAL en el esquema.** Aquí no lo es.

**LAS TRES RESPUESTAS POSIBLES, Y SE VEN DISTINTAS:**

1. **La fórmula del paso anterior.** Es lo único derivable del propio documento y no inventa nada,
   pero deja una tarjeta con **la misma fórmula arriba y abajo de la flecha**.
2. **Un texto de relleno** (`\square`, «escribe aquí»…). Es un invento del taller, y se ve.
3. **Volver `math` opcional en el esquema**, como el de Web. Es lo más limpio conceptualmente,
   pero **queda fuera del alcance declarado** («los esquemas más allá de admitir lo que la semilla
   escriba») y contradice el propio comentario del esquema, que declara por qué es obligatoria:
   «sin ella el paso no dice nada y el historial pintaría un hueco».

**CONSECUENCIA HOY, MEDIDA Y SIN MAQUILLAR:** un paso recién añadido sigue dejando la previa en
**400**, con «La diapositiva 2 tiene campos faltantes» y **cero campos en rojo**. **Eso es la
congelación de `#154` y NO se tocó** — pero conviene decirlo claro: **la parte del criterio 3 que
pide que la previa compile al crear un paso NO se cumple todavía**, y no se cumplirá hasta que
esta decisión se tome. La parte del **bloque** sí se cumple, y ésa es la que quita el defecto que
abrió el run.

---

# LO QUE ENCONTRÉ POR EL CAMINO

## 1 · LA PISTA DEL FORMULARIO MENTÍA — **y sí la cambié**

Bajo «Fórmula de partida» el editor le decía al autor, literal:

    «Opcional. Vacía NO deja hueco: el motor encadena con la fórmula del paso anterior…
     Sólo se escribe para romper esa cadena.»

Era **exacta** mientras existía el respaldo. Retirado, describe **justo lo contrario** de lo que
pasa. **La cambié dentro de este run y no lo trato como ampliación de alcance**: es la misma
superficie y el mismo contrato, y publicar el motor nuevo con esa frase habría sido entregar una
mentira firmada. Ahora dice que el paso nace con la fórmula ya escrita, y qué pasa si la borras.

## 2 · AL INSERTAR ANTE EL RESULTADO, SU `preMath` SE QUEDA VIEJO — **decisión suya**

Medido: tras «+ Agregar paso», el paso de resultado conserva `preMath: '2x = 8'`, que ahora es la
fórmula de **dos** pasos atrás, no la de su nuevo vecino. **No se pinta** —es vista única—, así
que hoy no se ve. Pero si el autor desmarca la casilla, vería una fórmula de partida obsoleta.

**Es inherente a sembrar explícito**: el valor pasa a ser del autor, y re-sembrarlo al insertar
sería volver a resolverle el dato en silencio —justo lo que este run quita—. **Lo dejo como está y
lo nombro:** decidir si insertar debe re-sembrar al siguiente es del operador.

## 3 · `preMathVariant` SIGUE SIN CANAL

No está declarado en **ninguno** de los dos esquemas gemelos; como no son `.strict()`, Zod le
quita la clave. **Un borrador no puede llevarlo.** El motor lo lee en `:486` y, ahora que sin
`preMath` no se emite el panel, la clase `ghost` desaparece con él. Cero casos en el corpus.

## 4 · DOS ERRORES DE LINT PREEXISTENTES, EN FICHEROS QUE NO TOQUÉ

`TextAreaField.jsx:106` y `:144` (`react-hooks/immutability`). **Mis ficheros salen limpios.** No
los toco: no son de este run.

---

# LO QUE NO PUDE VERIFICAR

- **CAPTURA DE PANTALLA: no.** El panel del navegador no está mostrándose en esta sesión y no
  compone fotogramas. Lo sustituí por la prueba equivalente y más dura: **descargar el HTML real
  de la previa** y auditar sección por sección. Con la fórmula de partida borrada a mano desde el
  botón «Quitar fórmula» de la interfaz, la previa devolvió **200** y su diapositiva salió
  **sin flecha, sin ranura de entrada, con `is-arrow-hidden` y sin `undefined`**. Aun así,
  **la QA visual es suya y este run cierra con ella.**
- **`agregarPaso` va fijado por TEXTO, no conducido.** `editor-ui` no tiene jsdom ni banco de
  componentes y ninguna prueba del repo monta JSX. **El nivel de BLOQUE sí va ejecutado de verdad**
  —`blockFactory` es un módulo sin React—, y `agregarPaso` además quedó **conducido a mano** en la
  instancia de 5174, con su resultado copiado arriba.
- **`npm run build` escribió `tools/author-lite/editor-ui/dist/`**, que está ignorado por
  `**/dist/`. **No hay cambio versionado**, pero queda dicho.

---

# FICHEROS TOCADOS

    src/builders/slides/layouts/renderStackSlide.js                    motor: el vacío y la flecha
    .../editor-ui/src/features/editor/utils/blockFactory.js            semilla del BLOQUE
    .../editor-ui/src/features/editor/components/slide/SlideStackEditor.jsx
                                                                       semilla del PASO + la pista
    .../compiler-api/tests/slideStackPreMathBlankMeansBlank.test.mjs   red nueva (16)
    .../compiler-api/tests/slideStackAuthoringSurfaceRepairRound1.test.mjs   reapuntada
    .../compiler-api/tests/slideStackAuthoringSurfaceRepairRound2.test.mjs   reapuntada
    .../compiler-api/tests/slideStackAuthoringSurfaceRepairRound3.test.mjs   reapuntada
    .../compiler-api/tests/slideStackTypeExpose.test.mjs                     reapuntada
    QA/temp/RUN-.../{censo,huella,dedup,arnes-de-mutacion}.mjs + salidas     sondas

**Commit sugerido:** `feat(slides): que el vacío en Fórmula de partida signifique vacío, y sembrar la cadena`
