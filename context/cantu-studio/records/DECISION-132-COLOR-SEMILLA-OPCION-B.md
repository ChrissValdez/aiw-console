# DECISIÓN DE DISEÑO — `#132` «Tabla», el color de la etiqueta por fila

> Tomada por **Christopher Valdez Cantu** el **2026-08-23**. Recogida por la cabina.
> Se guarda como se guarda un veredicto, porque lo es: decide un invariante de autoría.

---

## LA DECISIÓN, VERBATIM

> apruebo B

Sobre las dos salidas que la cabina le dibujó para el caso de **la tabla sin color**:

- **A · sembrar el tema** — si la tabla no tiene color, la fila hereda el de su tema. El
  desplegable deja de mentir, pero la tabla sigue con su propio campo en blanco.
- **B · la tabla SIEMPRE tiene color** — la tabla arranca con un color real, igual que el
  tamaño arranca «Mediano». **Nunca hay ausencia que rotular.** ← **ELEGIDA**

## DE DÓNDE VIENE, Y ES LA MISMA REGLA QUE YA APLICÓ AL TAMAÑO

El operador ya decidió lo mismo para el tamaño el 2026-08-23: *«Y como default que cuando
inserto una slie que por deafult aparezca mediano»*, y antes, dos veces, que «Automático»
no debía existir porque **un rótulo que nombra un mecanismo no dice una talla**.

Aquí es idéntico: **un desplegable de color no debe tener una entrada que no es un color.**

> **EL INVARIANTE QUE ESTA DECISIÓN FIJA:** el desplegable de «Color de etiqueta» muestra
> SIEMPRE un color real —de la lista o personalizado— y NUNCA una entrada que describe una
> ausencia.

## EL VALOR POR DEFECTO NO SE ELIGE: SE MIDE

Medido por la cabina el 2026-08-23, conduciendo `renderTable.js`:

| lo que declara la tabla | filo que pinta |
|---|---|
| nada — ni `theme` ni `accentColor` | **`#5E81AC`** |
| `theme: 'blue'` | `#5E81AC` |
| `theme: 'purple'` | `#B48EAD` |

`#5E81AC` es `tokens.ctx.main`. **El color por defecto es el token `ctx`** —«Azul» en el
código, «Azul acero» en la paleta configurada del operador— porque es **exactamente lo que
la superficie pinta hoy sin campo**.

Es la misma regla que gobierna todas las escalas del proyecto: *«Mediano» vale lo que la
superficie pinta hoy sin campo.* Aplicada al color, el defecto es lo que ya se ve.

**SE SIEMBRA EL TOKEN, NO EL HEX.** Un hex congelaría el color y ese elemento dejaría de
seguir la paleta global del autor cuando la cambie. Medido en la ronda 0: con la paleta
activa, `ctx` se compiló a `#4F75A8` y no al `#5E81AC` de la tabla privada del motor — o
sea, el token SÍ sigue su paleta y el hex no lo haría.

## LA CONSECUENCIA, DECLARADA

Las tablas ya existentes que hoy no declaran color **recibirán `ctx` al abrirlas**, por el
mismo idioma que `SlideSizeSelect` ya practica —al montar, el formulario guarda el valor
por defecto—. **No cambia nada de lo que se ve**: `ctx` es lo que ya estaban pintando. Lo
único que cambia es que el campo deja de estar vacío.

## LO QUE ESTA DECISIÓN NO TOCA

Los **tres «Automático»** de `WebBlockEditor.jsx` (líneas 1330, 3391 y 6246) son el mismo
mecanismo —`emptyStateLabel`— y caen bajo la misma objeción. **Quedan nombrados y sin
tocar**, y la decisión sobre ellos sigue siendo del operador.
