# VEREDICTO DE QA de `#148` — PASS — y el operador PIDE el recuadro del resultado en diapositiva

> Dado por **Christopher Valdez Cantu** el **2026-08-27**. **Verbatim.**
> La segunda mitad es **la quinta vez que aparece `resultBox` en este proyecto, y la PRIMERA que
> la pide él**. Las cuatro anteriores se nombraron y no se abrieron, esperando exactamente esto.

---

## VERBATIM

> **«funciona todo»**
>
> **«Solo que calculo aritmetico en slide falta Recuadro del resultado, el que tiene web»**

**PASS en los seis pasos**, incluido el 3 —el que tenía consecuencia de parada—: el color del
factor viaja al número cuando reaparece como divisor o multiplicador. **Ningún ojo lo había visto
hasta ahora; el taller sólo lo había medido en el HTML.**

---

## LO QUE PIDE, Y POR QUÉ NO ES UN CONTROL MÁS

El desplegable **«Recuadro del resultado»** de Web, con sus cuatro opciones —«Después del último
=», «Antes del último =», «Las dos mitades», «Sin recuadro»—, **en diapositiva**.

**Este proyecto lo tenía nombrado y cerrado a propósito cuatro veces**, con la razón escrita
dentro del esquema del compilador:

> «LA RESTA — `resultBox` **NO ENTRA, EN NINGUNO DE LOS DOS MODOS**. MEDIDO mutando el dato en
> memoria y diffeando el render: el motor de diapositiva **NO LO LEE**… **Ofrecerlo aquí sería un
> control que el autor rellena y NUNCA ve**, que es lo que este proyecto lleva runs quitando.»

**Esa razón sigue siendo cierta y por eso el run no es «añadir un desplegable»: es ENSEÑARLE AL
MOTOR DE DIAPOSITIVA A LEERLO.** Antes de este veredicto, abrirlo habría sido inventarse una
capacidad. **Ahora lo pide el operador, y eso es exactamente lo que faltaba.**

---

## EL COSTE, MEDIDO EL 2026-08-27

| | Web | Diapositiva |
|---|---|---|
| cómo decide el recuadro | **una línea**: `BOX_PLACEMENTS[data.resultBox] \|\| BOX_PLACEMENTS.after` (`web/partials/renderArithmetic.js:266`) | **no decide**: escribe los dos `<div>` del pie **a mano, en las dos ramas** (`slides/components/renderArithmetic.js:343-346`) |
| en modo matriz | **tampoco lo lee** — sólo en factorización | igual |
| tamaño del motor | 378 líneas | **643 líneas** |
| opciones | `after` · `before` · `both` · `none` | ninguna |

**LA PREGUNTA QUE DECIDE SI ESTO ES BARATO O CARO, Y NO ESTÁ MEDIDA:** si el pie que hoy escribe
el motor de diapositiva **equivale a `after`**, entonces el valor por defecto sale gratis, el
corpus no cambia de aspecto **y sólo son nuevas las otras tres colocaciones**. Si no equivale,
**el corpus entero de aritmética cambia de pintado** y eso es coste conocido y acotado, pero
coste. **Se mide, no se supone**, y es lo primero que hará el run.

**Y hay una frontera heredada de Web que hay que decidir aparte:** Web **sólo** lo ofrece en
factorización, no en matriz. Copiar esa asimetría o cerrarla **es decisión del operador**, y el
run la nombra en vez de resolverla.

---

## DÓNDE VA — decisión de cabina bajo D-071

Se inserta como run propio **por delante de la auditoría del conjunto**, junto a los demás runs
por componente. **No se mete en `#148`:** ese run cierra con su QA pasada y su alcance ya se
amplió una vez bajo D-061; meterle una capacidad nueva del motor sería la tercera identidad
distinta en el mismo identificador.

**Y NO es el run que se deja corriendo solo.** Lleva dentro al menos dos preguntas que sólo el
operador contesta —la asimetría de la matriz, y qué hacer si el pie de hoy no equivale a
`after`—, así que **pararía a los pocos minutos**. Para dejar corriendo va el otro.
