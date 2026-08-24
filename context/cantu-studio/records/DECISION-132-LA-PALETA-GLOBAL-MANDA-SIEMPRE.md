# DECISIÓN DE DISEÑO — el color sale SIEMPRE de la paleta global

> Dicha por **Christopher Valdez Cantu** el **2026-08-23**, en la ronda 3 de `#132`.
> Se guarda como veredicto porque lo es: **no resuelve un caso, resuelve una familia.**

---

## LO QUE DIJO, VERBATIM

> no se, pero... es importante, te explico, ctx era un codigo que usabamos antes cuando
> manualmente creabamos ne codigo los colores que usariamos para la paleta de colores,
> ahora se configura en paleta de colores global, entonces de alguna forma se eredo esos
> nombres
>
> pero lo importante es eso
> qeu los colores siempre nos basamos en la configuracion de paleta de colores global

**Empieza diciendo «no sé» y a continuación da el criterio que decide la pregunta.** La
cabina le había planteado una elección entre dos hexadecimales; él contestó con el
principio, que es la respuesta correcta a una pregunta mal planteada.

---

## EL PRINCIPIO

> **Cuando la tabla fija del motor y la paleta global del autor discrepen, GANA LA PALETA
> GLOBAL. Siempre. Sin excepción declarada.**

Y su corolario histórico, que explica el origen de la confusión: **`ctx`, `def`, `str`,
`wrn`, `err`, `res` y `meta` son nombres HEREDADOS** de cuando los colores se escribían a
mano en el código. Hoy son ids de token que la configuración global resuelve. **El nombre
sobrevivió a su mecanismo.**

## LO QUE EL CÓDIGO CONFIRMA, MEDIDO EL 2026-08-23

Esto **no es una decisión nueva: es una migración a medio hacer**, y el proyecto ya la
había empezado por decisión suya.

`RUN-CANTU-SLIDE-PALETTE-REACHES-THE-ENGINE-001` ya **le quitó al motor su tabla fija de
colores** para que pintara la del autor. Está citado en `renderCard.js:16`, y el propio
fichero declara por qué importaba: sin eso los componentes quedaban *«PARTIDOS POR LA
MITAD: tinta repintada y filo congelado en el hex viejo de la tabla, dos colores que la
paleta nunca juntó»*.

**Pero `renderTable.js` sigue teniendo la tabla vieja**, en sus líneas 121-125:

    const themeMap = {
        purple: tokens.def.main, blue: tokens.ctx.main, yellow: tokens.str.main,
        orange: tokens.wrn.main, red: tokens.err.main, green: tokens.res.main
    };
    const themeColor = themeMap[col.theme] || tokens.ctx.main;

**«Tabla» es uno de los rezagados de esa migración.** Y por eso una tabla sin color pinta
`#5E81AC` —el hex viejo del motor— mientras una con el token pinta `#4F75A8` —el de su
paleta—.

## CÓMO RESUELVE LA PREGUNTA QUE ESTABA ABIERTA

La cabina preguntó *«¿converger hacia `#5E81AC` o hacia `#4F75A8`?»*. **Con este principio
la pregunta se cae: hacia `#4F75A8`**, el de la paleta. No porque sea el más bonito, sino
porque **es la dirección que el proyecto ya eligió y ya empezó a ejecutar.**

**LA CONSECUENCIA, DECLARADA Y MEDIDA:** las **18 tablas del corpus** no declaran
`accentColor` —cero de 18—, así que **las 18 cambian de tono** al converger, y las copias
fijadas de la salida hay que volver a fijarlas. Es coste conocido y acotado, y es el precio
de terminar la migración en vez de dejarla a medias.

## ALCANCE

**No es de `#132`.** Toca el compilador, la paleta y la tabla fija del motor. Va a run
propio, y ese run **cierra también un pendiente ya abierto y declarado**: el tono que no
coincide entre la paleta y el mapa privado (`focus`: `#B69F58` contra `#C2B280`), que es
**el mismo defecto en otro token**.

> **Y la regla general que este veredicto deja escrita, más allá del color:** cuando el
> operador conteste a una elección binaria con un principio, **el principio manda y la
> elección se recalcula**. No se le vuelve a preguntar cuál de los dos.
