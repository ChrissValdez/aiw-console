# VEREDICTO DEL OPERADOR — `#110`, los dos glifos de la paleta

> **Recogido por la cabina el 2026-08-17.** Cierra
> `RUN-CANTU-SLIDE-PALETTE-GLYPH-CORRECTIONS-001` en dos rondas — instrumento y escritura — y
> **abre un defecto nuevo que NO es de este run**.

## SUS PALABRAS, VERBATIM

    jala bien, un detalle

    el componente de SVG en slide unicamnete
    no deberia exisitr
    osea es un componente dentro de diapositiva libre
    no un tipo de slide y aparece en la barra de la izquierda y aparte aparece deshabilitado
    pero la slide libre y la slide portada se ven excelente

    recoemndaria arregalr lo de svg de una vez aunque ya paso el pass este run

## QUÉ APRUEBA

**Los seis pasos de la QA.** Los pasos 4, 5 y 6 —que Web no se hubiera movido— eran los de
consecuencia de parada y **no la dispararon**. Sus palabras sobre lo entregado: *«la slide
libre y la slide portada se ven excelente»*.

**Y aprueba también, sin decirlo con esas palabras, la inferencia del taller**: el paso 3 era
precisamente el glifo nuevo en el diálogo «Añadir diapositiva», que él no había pedido y el
taller dedujo. Lo miró y lo dio por bueno. **Sigue siendo una inferencia dada por buena, no una
elección explícita**, pero esta vez sí se le puso delante en un paso propio.

## EL DEFECTO QUE ABRE, Y ÉL MISMO DICE QUE NO ES DE ESTE RUN

**«Gráfico SVG» está en el sitio equivocado: es un COMPONENTE, no un tipo de diapositiva.**

Y encima está **deshabilitado**, así que ocupa un puesto en el riel de tipos de diapositiva
para no hacer nada.

**Medido por la cabina al recibirlo**, en `blockCatalog.js`. Los tres ítems de `flow: 'slide'`:

| id | etiqueta | action | estado |
|---|---|---|---|
| `slide-title` | Portada | `titleSlide` | activo |
| `slide-columns` | Libre | `columnsSlide` | activo |
| `slide-visual` | **Gráfico SVG** | **`visualBlock`** | **`disabled: true`** |

Su descripción lo delata sola: *«Bloque visual planeado para una fase posterior»*.

**Los dos primeros son tipos de diapositiva. El tercero no.** `visual` es un **ítem de celda**
—tiene su `SlideVisualItemSchema` dentro de la unión de ítems de la rejilla— y su sitio es el
menú de componentes de una celda de «Libre», no el riel que elige qué clase de diapositiva
nace.

**ES RESIDUO DE ANTES DE QUE EXISTIERA LA REJILLA**, cuando cada cosa visual era su propia
clase de diapositiva. Cuando «Libre» trajo las celdas, ese puesto dejó de tener sentido y nadie
lo retiró.

## POR QUÉ NO SE ENMENDÓ `#110` PARA METERLO — y esto es regla, no preferencia

**El `run_id` describe el alcance:** `PALETTE-GLYPH-CORRECTIONS`, y el título nombra **los dos
glifos** explícitamente. Retirar un ítem del riel **no es corregir un glifo**.

La regla dice que cuando el identificador describe el alcance y el alcance cambia, **el run no
se enmienda: se cierra y se abre otro** — porque un identificador no se puede cambiar sin
destruir y recrear, y enmendarlo dejaría la identidad mintiendo en todos los records futuros.

**Es la diferencia con `#108`, donde D-061 sí aplicó**: allí el identificador decía «auditar e
implementar Narrativa» y abrir el motor de Narrativa seguía siendo eso. Aquí no.

## LO QUE EL TALLER CONTRADIJO EN LA RONDA 2, Y LAS DOS ERAN DE LA CABINA

1. **«Cuadrícula de conceptos» no existe.** El bloque Web que conserva `Layout` se llama
   **«Anatomía de fórmula»**. La cabina inventó ese nombre **traduciendo el identificador
   `conceptGrid`**, y lo escribió en el ticket y en la especificación de la ronda 1.

   **Es exactamente el fallo que el relevo lleva sesiones documentando**, y que ya costó cuatro
   nombres de tipo de diapositiva desmentidos por el operador. **Y esta vez fue peor:** el
   bloque ya se había llamado «Comparador de conceptos» antes, así que había **dos** nombres
   reales en la historia del fichero y la cabina no usó ninguno — se inventó un tercero.

2. **El ticket daba una orden imposible.** Pedía volver a `1586/1581/5` **y** añadir una guarda
   nueva. Añadir pruebas mueve el total. La lectura correcta es **«ninguna regresión»**, no un
   total congelado. Resultado real: **1588 · 1583 pasan · 5 fallan**, los mismos cinco por
   nombre.

   **Es la segunda vez en la sesión que dos textos de la cabina se contradicen entre sí** —la
   primera fue en `#108`, ticket contra enmienda— **y las dos las cazó el taller.**

## LO QUE SIGUE ABIERTO

- **«Gráfico SVG» en el riel**, arriba. Tiene que ir a su propio run.
- **El rótulo de éxito de la fusión** (`#109`): publicado, no elegido.
- **El ocupante anclado fuera del rectángulo** (`#109`).
- **Las pistas `1fr` no reparten en partes iguales** (`#108`).
- **El puesto del control «Espaciado título–párrafo»** (`#108`).
- **«Extra grande» vs «Muy grande»** (`#108`).
- **«Explicación guiada» sale como las dos letras «EG»** — defecto anterior, fijado a propósito
  en las pruebas, confirmado en el paso 6 de esta QA.
