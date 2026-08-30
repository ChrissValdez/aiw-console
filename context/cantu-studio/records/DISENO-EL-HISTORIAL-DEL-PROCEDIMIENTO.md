# DISEÑO — el historial del «Procedimiento matemático»

> Conversación de diseño con el operador **Christopher Valdez Cantu**, 2026-08-29. Se guarda como
> un veredicto porque lo es: **diez decisiones que habrían muerto en el chat.**
>
> Da lugar a dos runs: `RUN-CANTU-SLIDE-STACK-HISTORY-FITS-IN-BOTH-AXES-001` (#164, el motor) y
> `RUN-CANTU-SLIDE-STACK-HISTORY-AUTHOR-OVERRIDES-001` (#165, los mandos).

---

## EL MODELO — y lo puso el operador, corrigiendo a la cabina

La cabina propuso *«el autor fija una de las dos variables y el motor deriva la otra»*, tratando
el número de pasos y el tamaño como **dos variables peleándose por un presupuesto**.

El operador lo corrigió, **verbatim**:

> **«afecta los techos, no el tamaño base»**

Y con eso se cae la competencia. **No son pares: es una jerarquía.**

```
  Nº DE PASOS  ─────►  reparte la altura  ─────►  TECHO AUTOMATICO
   (del autor)                                     (lo mas grande que cabe
                                                     en ALTO y en LARGO)
                                                            │
  TAMAÑO PEDIDO  ────────────────────────────────────────► │ se recorta aqui
   (del autor)                                              ▼
                                                      LO QUE SE PINTA
```

**Consecuencia práctica:** los dos campos pueden rellenarse a la vez sin contradicción, así que
no hay que prohibir nada ni inventar un selector de modo. La propuesta de la cabina sobraba.

Sus otras dos frases fijan el resto:

> «tamaño de letra de todo el historial parejo, y con tope por el paso más largo, para que quepa
> todo»
>
> «tiene un techo automático que no permite que lo agrande más de lo que cabe (**igual que en la
> tarjeta**), tiene que siempre caber tanto en altura como en largo»

---

## ⚠ EL ALGORITMO NO HAY QUE INVENTARLO: LA TARJETA ENFOCADA YA LO TIENE

Medido el 2026-08-29 en `src/builders/slides/layouts/renderStackSlide.js`:

```js
// calculateFit — la tarjeta enfocada, ~:870 y ~:879
if (wrapper.clientWidth === 0 || wrapper.clientHeight === 0) return maxFont;
while ((content.scrollWidth  > wrapper.clientWidth ||
        content.scrollHeight > wrapper.clientHeight) && fontSize > 14) { … }
```

Arranca en el techo pedido y encoge hasta caber **en los dos ejes**. Es literalmente lo que el
operador describió con «igual que en la tarjeta».

> **La tarjeta está bien. El historial es la copia que nunca se hizo.**

---

## EL DEFECTO, MEDIDO

`fitHistory` (~`:977`) hace la mitad:

1. **Ajusta cada tarjeta por su cuenta**, con un `forEach`. **No hay tamaño común** — se ven
   iguales solo mientras ninguna desborda.
2. **Arranca en el tope de 1,6 rem y solo baja.** No existe camino en el código para agrandar.
   Por eso *«no los agranda»*: no es una calibración, es **una capacidad ausente**.
3. **La altura no entra en ningún cálculo.** Solo `scrollWidth` contra `clientWidth`.

Y como `.j-stack-history-viewport` lleva `overflow: hidden` (~`:96`):

> **Un historial que no cabe de alto se corta en silencio.** Un paso de dos líneas
> —`\begin{cases}`— o una fracción anidada lo provocan sin esfuerzo.

**Y `historyLimit` solo recorta la ventana** (`historyStartIndex = max(1, focusIndex − LIMIT)`,
~`:277`): con un procedimiento corto **nunca llega a morder**, así que el mando es **inerte**.
Su ayuda promete *«con menos pasos visibles, cada uno se ve más grande»* — **falso hoy.**

---

## LAS CINCO DECISIONES

Operador, **verbatim: «estoy deacuerdo con tus reocmendacions procede con el ticket»**, sobre
cinco decisiones con recomendación explícita.

| # | decisión | por qué |
|---|---|---|
| 1 | **Jerarquía**: pasos → techo → tamaño recortado, **los dos campos rellenables a la vez** | Es su modelo. Hace imposible el estado contradictorio **sin prohibir nada** |
| 2 | **Reparto R2 — proporcional**, no ranuras iguales | En matemáticas el caso normal **no** es que todos los pasos midan igual. Con ranuras iguales, un solo `cases` achica a los demás **aunque sobre sitio** — la queja original: *«se ve vacío»* |
| 3 | **Los dos seguros declaran** con la marca de `#163` | Ningún canal nuevo. Y es la regla de la casa: si no se puede cumplir, se dice |
| 4 | **Dos runs**: motor primero, mandos después | El motor no tiene ni una decisión suya dentro; los mandos son todos suyos. La regla que pagó en `#156` y `#157` |
| 5 | **Se retira el tamaño por paso** del historial | Un tamaño por paso **contradice «parejo»** |

**Y una que decidió antes, sobre dos formas dibujadas:** **P1 — sin selector de modo**. Los dos
campos ya existen y vacío ya significa automático; un widget de modo no compra nada. **P2
descartado.**

### Los dos seguros

1. **El tamaño pedido no pasa del techo.** Si el autor pidió más de lo que cabía, **se marca su
   campo**. Si el techo simplemente aplica sin que nadie pidiera nada, **no se marca**: sin
   promesa no hay promesa rota — la regla de `#163`.
2. **El número de pasos no baja del mínimo legible.** Pide 10, caben 7: se pintan 7, se enciende
   el **«• • •»** que ya existe, y **se marca el campo de pasos**.

---

## EL COSTE DE LA DECISIÓN 5, MEDIDO ANTES DE ESCRIBIRLA

- **`historySize`** (la clave de **autor**): **cero** montajes en el editor, **cero** usos en
  contenido. **Canal muerto.**
- **`historyFontSize`** (la clave **compilada**, que el motor sí lee en ~`:284`): **un solo
  contenido** la usa, `src/content/sandbox/test_math_walkthrough.js`, en **seis** sitios.
- **Retirarla mueve 3 árboles fijados** — los mismos 3 que capturan `fitFocus`/`fitHistory`.
  Ruido en el diff, no defecto. **Declarado antes de decidir, no después.**

---

## EL BANCO DE CASOS, Y EL VEREDICTO DEL OPERADOR SOBRE CADA UNO

La cabina generó siete casos y el operador **los pegó en su editor y los miró**. Vive en
`_scratch/banco-procedimiento.json`, fuera del repo.

| | caso | veredicto del operador |
|---|---|---|
| **A** | 3 pasos, fórmulas cortas | *«se ve vacío»*, podrían agrandarse. **Debe crecer** |
| **B** | 12 pasos | *«podría ser un poco más grande»*. **Debe crecer, menos que A** |
| **C** | sistema `\begin{cases}` | dos líneas por paso. **No debe cortarse** |
| **D** | fracciones anidadas `\cfrac` | mucha altura. **No debe cortarse** |
| **E** | fórmula muy ancha | el ancho manda. **Debe seguir igual** |
| **F** | 10 pasos, límite 2 | el «• • •» y tarjetas grandes |
| **G** | un solo paso pasado | el extremo del techo. **No debe volverse gigante** |

### ⚠ Y un error de la cabina que costó un intento

La cabina generó ese JSON como **borrador completo** (`lesson` / `webBlocks` / `slideBlocks`), lo
validó contra `SlidesDraftSchema` — **y el importador lo rechazó en la puerta**:

> *«Este JSON parece un Draft completo. La importación de Draft completo no está soportada
> todavía. Pega solo bloques.»*

**Validó contra el esquema en vez de contra la puerta.** `parseAndValidateBlocks`
(`editor-ui/src/features/editor/utils/jsonImporter.js`, ~`:601`) rechaza el borrador completo
**antes** de llegar al esquema, así que el «✅ VALIDO» era cierto y no servía de nada.

**Regla que sale, y es la tercera vez que esta clase de error aparece en dos días: se valida
contra la puerta por la que va a entrar, no contra el esquema que hay detrás.** La forma que
acepta es **un array de bloques pelado**.

---

## LO QUE NO SE TOCA

- **El rótulo y la ayuda de «Pasos visibles en el historial».** Tras el run del motor, su promesa
  pasa a ser **verdad sin cambiarle una palabra**.
- **El rótulo del campo de tamaño no existe todavía y no lo inventa el taller.** El operador dice
  «operaciones», el editor dice «pasos». La cabina propone mantener «pasos»; **lo cierra él al
  verlo**, como cerró el texto de la cinta de `#157`.
- **`calculateFit` y la tarjeta enfocada.** Son la especificación, no el objetivo. **Se copian.**

---

## FUENTES

- `full_description` de `RUN-CANTU-SLIDE-STACK-HISTORY-FITS-IN-BOTH-AXES-001` y de
  `RUN-CANTU-SLIDE-STACK-HISTORY-AUTHOR-OVERRIDES-001` en `.aiw/roadmap/roadmap.json`
- `_scratch/banco-procedimiento.json` — el banco de siete casos
