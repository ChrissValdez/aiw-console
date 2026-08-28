# HALLAZGO — «Fórmula de partida» **está muerto** en el paso 0 y en el de resultado

> Lo encontró **Christopher Valdez Cantu** el **2026-08-28**, haciendo la QA de la ronda 2 de
> `RUN-CANTU-SLIDE-STACK-PER-STEP-FORMULA-SIZE-001`. **Verificado por la cabina contra disco.**

---

## VERBATIM

> **«dos correcciones nuevas / si jalo estas pero salieron nuevaS / paso 0 no deberia tener
> formula de partida r resultado final tampoco / porque no imprime doble / solo ipmrime la
> formula de ese paso los demas pasos si»**

---

## LA MEDICIÓN — y tiene razón por partida doble

**`renderStackSlide.js:495-497`:**

    const isResult     = focusStep.type === 'result';
    const isStart      = focusIndex === 0;
    const isSingleView = isStart || isResult;

**MUERE DOS VECES, y basta con una:**

**1 · La hoja esconde el panel entero** (`:233`):

    .j-stack-card.single-view .j-stage-input,
    .j-stack-card.single-view .j-stage-divider { display: none; }

**2 · Y aunque no lo escondiera, ahí NO va la fórmula de partida** (`:758`):

    ${isSingleView ? getMathContent(focusStep.math) : (hayPreMath ? getMathContent(prevMathRaw) : '')}

**En vista única el panel de entrada se rellena con `focusStep.math` — la fórmula DEL PASO— y
`preMath` no se consulta.**

> **El formulario le pide al autor un dato que el motor no mira y la hoja no pinta.** Es la misma
> clase de defecto que él lleva vetando toda la tanda: **un mando que dice algo que la pantalla
> no cumple.** Aquí en su forma más pura — no es que pinte otro número: **no pinta nada.**

## POR QUÉ ESCONDERLO, Y NO BORRAR EL CAMPO

**`isResult` es una CASILLA que el autor marca y desmarca** (`SlideStackEditor.jsx:1296`). Un
paso deja de ser de resultado en un clic, **y entonces `preMath` vuelve a pintar**. Borrar el
dato lo perdería; esconder el campo no.

**Y el precedente exacto ya vive en este mismo fichero:** el control de la flecha se esconde así,
leyendo el `isResult` **vivo**:

    {pasosVivos[i]?.isResult === true ? null : ( … )}

**La condición del paso 0 la escribió este mismo run hace dos rondas**, para elegir la escalera:
`(i === 0 || pasosVivos[i]?.isResult === true)`. **Ya está medida y funcionando.**

## ⚠ LOS DOS CABOS QUE ESTO DEJA, NOMBRADOS

**1 · EL DATO VIEJO SE QUEDA ESCONDIDO.** Si el autor escribe una fórmula de partida y **después**
marca la casilla, el campo desaparece **con su contenido dentro**. No se pinta —vista única— pero
**vuelve entero si desmarca**. Es la misma familia que el cabo ya nombrado en
`VEREDICTO-153`: *«al insertar un paso ante el de resultado, la fórmula de partida de éste queda
vieja»*. **Que reaparezca es lo correcto; que reaparezca SIN AVISO es lo que hay que decidir.**

**2 · EL MOTOR Y EL EDITOR NO MIRAN EL MISMO CAMPO.** El motor decide con `focusStep.type ===
'result'`; el editor con `pasosVivos[i]?.isResult`. **La correspondencia la pone el compilador**,
y funciona —la QA del paso 4 lo demostró: la vista única enseñó su escalera de 75 px—, **pero se
deriva, no se supone.**

## Y UN HALLAZGO DE PASO, SIN ABRIR

**`renderStackSlide.js:772` tiene un ternario que no decide nada:**

    getMathContent(isSingleView ? focusStep.math : focusStep.math)

**Las dos ramas son idénticas.** Es inocuo hoy y **parece** que ahí hubo una decisión. **Se
nombra; no se toca en este run**, porque tocar el motor cambia el guion que viaja en el HTML y
movería los árboles fijados por una limpieza cosmética.
