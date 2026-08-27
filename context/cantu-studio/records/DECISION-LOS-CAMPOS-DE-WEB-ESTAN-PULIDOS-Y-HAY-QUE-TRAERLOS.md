# DECISIÓN DE DISEÑO DEL OPERADOR — «los campos de Web están pulidos, hay que traerlos»

> Dicha por **Christopher Valdez Cantu** el **2026-08-27**, al aprobar
> `RUN-CANTU-SLIDE-ARITHMETIC-SEED-CONTRADICTS-ITS-RESULT-001`.
> **La abrió él, no se la preguntó nadie.** Se guarda como se guarda un veredicto: verbatim.

---

## VERBATIM

> **«Mejoro mucho»**
>
> **«nadamas como comentario»**
>
> **«mira... el calculo aritmetico web»**
>
> **«lso factores tienen color y se sincroniza el color de ese factor con sus numeros»**
>
> **«Ademas. el boton de agregar factor y aggregar paso lo tiene en azul en pequeño arriba en vez
> del diseño punteado abajo / eso para agregar factor y agregar paso»**
>
> **«tambien el dropdownd del recuadro»**
>
> **«En general / es agarrar los campos de web que estan bien pulidos y ponerlos aca»**

**Mandó dos capturas del formulario de WEB**, no del de diapositiva: la de un `FACTOR 3` con
`PRIMO` / `REPETICIONES` / `EXPRESION` y su `COLOR` en «Personalizado» con muestra, y la del
desplegable `RECUADRO DEL RESULTADO` con sus cuatro opciones — «Despues del ultimo = (por
defecto)», «Antes del ultimo =», «Las dos mitades», «Sin recuadro».

---

## EL PRINCIPIO, Y ES LO QUE MÁS VALE DE ESTO

> **«es agarrar los campos de web que están bien pulidos y ponerlos acá»**

No es una lista de tres arreglos: es **una dirección**. Web lleva más rondas de pulido que
diapositiva, y el operador dice que **la forma buena ya existe y no hay que inventarla otra vez**.
Es el mismo movimiento que este proyecto ya hizo con los rótulos —«los rótulos son los de Web,
campo a campo»— y con los precedentes de `#134` y `#138`: **copiar la forma cerrada en vez de
reabrir la decisión.**

---

## LAS TRES PIEZAS QUE NOMBRÓ

1. **EL COLOR POR FACTOR, SINCRONIZADO CON SUS NÚMEROS.** En Web cada factor tiene su control de
   color y **ese color viaja a las bolas y a las píldoras de ese factor**. En diapositiva no está.
   **Conecta con un hueco ya declarado:** `counts[].color` se quedó sin control en la ronda 1 de
   `RUN-CANTU-SLIDE-ARITHMETIC-ITEM-ADMIT-001` porque el control que sirve —`HexOnlyColorField`—
   es un `const` **no exportado** de `WebBlockEditor.jsx`. **Traerlo exige exportarlo, o sea tocar
   Web.** Eso es lo que hay que decidir al encuadrar.
2. **«+ Agregar factor» y «+ Agregar paso».** En Web son **un enlace azul pequeño arriba**; en
   diapositiva es **el botón punteado de ancho completo abajo**. Conecta con lo que quedó diferido
   al cerrar `RUN-CANTU-EDITOR-CONCEPTGRID-TERMS-FRAME-001`: «Terminos» usa controles propios en
   vez de `CabeceraDeColeccion` / `ItemDeColeccion`, **y `CabeceraDeColeccion` es justo la pieza
   que pinta el rótulo con su botón de añadir arriba.** O sea: **la pieza de la casa ya existe.**
3. **EL DESPLEGABLE DEL RECUADRO DEL RESULTADO.** ⚠ **Ojo, y es una frontera medida:** `resultBox`
   es **de Web y sólo de Web** — el motor de diapositiva **nunca lo lee** y el esquema de
   diapositiva **lo excluye explícitamente**. Traer ese desplegable **no es portar un control: es
   abrir una capacidad que el motor de diapositiva no tiene.** Es la cuarta vez que aparece en
   este proyecto el patrón «capacidad en un lado, cerrada en el otro», y **la decisión de abrirla
   es del operador, no del taller.**

---

## LO QUE ESTO ACUMULA, Y CONVIENE MIRARLO JUNTO

Van ya **cinco cosas** pendientes sobre los formularios del editor, ninguna rota y ninguna pedida
antes de hoy:

| | qué | de dónde viene |
|---|---|---|
| 1 | la separación de la colección de términos | `…-CONCEPTGRID-TERMS-FRAME-001`, diferida |
| 2 | «Terminos» con controles propios | ídem, nombrada |
| 3 | la trampa `''` → `#4F75A8` de «Procedimiento matemático» | `…-BADGE-INK-AND-TABLE-001`, **defecto real** |
| 4 | `counts[].color` sin control | `…-ARITHMETIC-ITEM-ADMIT-001`, hueco declarado |
| 5 | las dos faltas de ortografía de la semilla de Web | este run, nombrado |

**Las cinco caen sobre la misma dirección que el operador acaba de nombrar.** Cuando se encuadre
el run del porte, **se le ponen las cinco delante juntas** en vez de seguir apilándolas de una en
una.

---

## LO QUE ESTA DECISIÓN NO DECIDE

- **No dice que se porte todo.** Dice que **Web es la referencia** cuando la forma de Web esté
  cerrada y la de diapositiva no.
- **No autoriza tocar Web.** Exportar `HexOnlyColorField` y abrir `resultBox` en diapositiva son
  dos decisiones distintas y las dos son suyas.
- **No es de ningún run abierto.** Se dijo «nada más como comentario» y se registra como lo que
  es: **el encuadre de un run que todavía no existe.**
