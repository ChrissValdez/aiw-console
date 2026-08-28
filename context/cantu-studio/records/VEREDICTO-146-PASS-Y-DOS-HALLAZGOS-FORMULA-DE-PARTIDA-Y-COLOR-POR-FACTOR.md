# VEREDICTO DE QA de `#146` — PASS — y DOS hallazgos que el operador encontró al mirar

> Dado por **Christopher Valdez Cantu** el **2026-08-27**, sobre la QA visual de seis pasos de
> `RUN-CANTU-EDITOR-ADD-ITEM-AFFORDANCE-STANDARD-001`.
> **Verbatim.** Los dos hallazgos **no son de ese run** y tienen destino propio.

---

## EL VEREDICTO

> **«jalo»** … **«pero lo de los pasos jalo en los componentes / ya lo revise el QA y paso todo /
> solo aproveche para decirte este feedback que encontre»**

**PASS en los seis pasos**, incluido el paso 3 —el que tenía consecuencia de parada—: el paso
nuevo entra delante del de resultado y **eso le pareció bien al verlo**, que es lo que su
veredicto «A» había decidido sobre papel.

---

## HALLAZGO 1 — «FÓRMULA DE PARTIDA» NO SE PUEDE DEJAR VACÍA, Y ÉL LO LLAMA ERROR

### Verbatim

> **«digamos que tengo el paso 2 / si dejo vacio Fórmula de partida me agarra Fórmula del paso
> del paso anterior y lo imprime»**
>
> **«esto es un error»**
>
> **«si yo agrego un paso nuevo digamos paso 3 entonces automaticamente me debe de llenar
> Fórmula de partida con Fórmula del paso del paso anterior / pero si lo dejo vacio, entonces no
> lo imprime / eso me da libertad de ponerlo o quitarlo / pero ahorita no puedo escoger eso / si
> lo dejo en blanco aun asi me lo imprime»**
>
> **«entonces aunque normalmente asi se usara me quita libertad de edicion»**
>
> **«ademas si Fórmula de partida esta en blanco automaticamente que esconda la flecha /
> independientemente de si esta seleccionado Ocultar la flecha entre fórmulas / si esta en blanco
> formula de partida no imprime la flecha»**

### La cabina lo verificó contra disco — 2026-08-27, 19:0x CST

**`src/builders/slides/layouts/renderStackSlide.js:479-484`:**

    let prevMathRaw = "";
    if (focusStep.preMath) {
        prevMathRaw = focusStep.preMath;
    } else if (focusIndex > 0) {
        prevMathRaw = steps[focusIndex - 1].math;
    }

**El defecto es exactamente el que describe, y tiene nombre conocido en este proyecto: EL AUTOR
NO PUEDE EXPRESAR EL VACÍO.** «En blanco» y «no declarado» son **el mismo estado** para el motor,
y los dos caen en el respaldo implícito. **No existe forma de decir «este paso no lleva fórmula
de partida».** Es la misma familia que las trampas de `''` que este proyecto lleva encontrando.

**Y la flecha no consulta ese dato.** `:462`:

    const shouldHideArrow = focusStep.hideArrow === true || data.hideArrow === true;

No mira si hay fórmula de partida. Lo que él pide es una **tercera condición**.

### La consecuencia que hay que medir ANTES de tocar, y puede ser cara

Quitar el respaldo implícito **cambia lo que se pinta hoy**. Todo paso del corpus que **no**
declare `preMath` y **tenga** un paso anterior está viviendo de ese respaldo, y **dejaría de
pintar su fórmula de partida**. Es el mismo patrón que las 18 tablas de `#132`.

**No se sabe cuántos son, y no se inventa la cifra: la mide el run.** Si el número es alto, es
material de decisión del operador —sembrar el corpus, o migrar— y no del taller.

### Su propuesta, que es la parte elegante y ya tiene precedente

**Al agregar un paso, sembrar «Fórmula de partida» con la fórmula del paso anterior**, explícita
en el borrador. Así el comportamiento por defecto no cambia para quien no toca nada, **y borrarlo
pasa a significar lo que dice**. Es exactamente el idioma que este proyecto ya usa —sembrar el
valor en vez de resolverlo en silencio— y el mismo criterio de `DECISION-132-COLOR-SEMILLA-OPCION-B`.

---

## HALLAZGO 2 — EL COLOR POR FACTOR, Y YA TENÍA RUN

### Verbatim

> **«agregar paso y agregar factor jala»**
>
> **«lo que no jala es el color de factores (el cual en web si jala y funciona bien pero en slide
> no se ha agregado la paleta de colores para escoger el color del factor»**
>
> **«y cabe aclarar que si escojo un color para el factor cuando ese numero aparezca como divisor
> (o multiplicador) agarra ese color»**

**Esto NO es un hallazgo nuevo: es el punto 4 del porte**, declarado como hueco desde
`RUN-CANTU-SLIDE-ARITHMETIC-ITEM-ADMIT-001` y ya alojado en
**`RUN-CANTU-EDITOR-PORT-WEB-COLOR-FIELD-001`**, que es el run que tiene autorización para tocar
Web y exportar `HexOnlyColorField`.

**Lo que SÍ es nuevo, y se añade al texto de ese run:** la segunda frase. **El color del factor
no se queda en el factor: viaja al número cuando aparece como divisor o multiplicador.** Eso es
un criterio de aceptación concreto que el run no tenía escrito, y sin él un taller podría
entregar el control de color y dejar el divisor en negro.

---

## DÓNDE VAN — decisión de cabina bajo D-071, explicada al tomarla

| # | run | por qué ahí |
|---|---|---|
| 147 | el porte que no toca Web | ya estaba, sin cambios |
| 148 | el porte que sí toca Web | **lleva el color por factor, que él acaba de pedir**, y se le añade el criterio del divisor |
| **149** | **el defecto de «Fórmula de partida»** | **nuevo** |

**Por qué el 149 y no antes:** el `#148` arregla lo que él acaba de nombrar como «no jala», está
enteramente encuadrado y no necesita ninguna decisión más. El del `preMath` **empieza con una
medición del corpus que puede devolver un número que obligue a decidir**, y no conviene meter esa
parada delante de un run que ya está listo para ejecutarse.

**Es reversible: mover un run cuesta un `remap`.**
