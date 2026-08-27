# PARADA DE ANÁLISIS — `RUN-CANTU-SLIDE-CONCEPTGRID-BADGE-INK-AND-TABLE-001`

> `queue_order` **139** al medirse · «Open the badge ink channel of Anatomia de formula and decide
> its private colour table»
> Celebrada por la CABINA el **2026-08-27**. El run sigue `planned` y **no se emitió encargo**.

---

## POR QUÉ HAY PARADA

El run son **dos trabajos**, y **el segundo no lo pidió el operador**. Su propio texto lo ordena:
medir cuántas «Anatomía de fórmula» caen en la tabla privada, cuántos árboles se moverían, y
llevárselo con los números delante.

---

## 1 · LAS CUATRO AFIRMACIONES DEL RUN, CONTRA EL DISCO

| # | afirmación | veredicto |
|---|---|---|
| 1 | `badgeTextVariant` existe en el esquema y no se ofrece | **CIERTA** |
| 2 | el formulario declara una razón, y esa razón caducó | **CIERTA** |
| 3 | `renderConceptCard.js` guarda su propia tabla de seis colores | **CIERTA** |
| 4 | sus seis `tint` no se derivan del acento | **cifra del run, no re-medida aquí** |

**1 · Está en LOS DOS esquemas**, no en uno: `compiler-api/schemas/draftSchema.js:668` y
`editor-ui/src/schemas/draftSchema.js:642`. Y el vocabulario largo ya existe:
`SlideStackAccentColorSchema`, el mismo que usa «Procedimiento matemático».

**2 · La razón escrita, verbatim** (`SlideConceptGridFields.jsx`, bloque «NOMBRADO Y NO REPARADO»):

> *«`badgeTextVariant` (color de letra de la insignia) sigue sin ofrecerse: la hoja de este motor
> clava `color: #FFFFFF` y nada lo pisa.»*

**Ya no es verdad.** `renderConceptCard.js:237-239` resuelve
`item.accentTextColor` y, si no, `resolveVariantInk(item.variant)`, y lo emite **en línea**.
Es el patrón que este proyecto ya tiene nombrado: **capacidad en el motor, cerrada en el esquema,
con un comentario que explica una razón que ya no se sostiene.** Va la cuarta vez.

**3 · La tabla, verbatim** (`renderConceptCard.js:72-80`) — seis tokens con `{ color, tint }`, y
sus seis `color` son los de **antes** de la migración de `#134`.

---

## 2 · QUÉ MUEVE LA TABLA PRIVADA, MEDIDO

**Método:** enganchar `Module._compile`, sustituir por centinelas los seis hexes **sólo en ese
fichero**, renderizar el corpus entero y contar. Lo que aparece, pinta. No toca el disco.

| clave | superficies distintas | ficheros reales | tokens alcanzados |
|---|---|---|---|
| `color` (el acento) | **10** | **1** — `src/content/sandbox/test_theory_complex.js` | **sólo `def` y `focus`** |
| `tint` (el papel) | **2** | el mismo | **sólo `def` y `focus`** |

Las cifras brutas son 20 y 4 porque `showcase_library.js` re-exporta esas escenas **por
referencia** y el corpus las renderiza dos veces.

**LO QUE ESTO CAMBIA RESPECTO AL ENCUADRE DEL RUN:** el run decía que convergir esa tabla «mueve
árboles». **Mueve UN árbol de sandbox y diez superficies.** Y **cuatro de los seis tokens
—`ctx`, `res`, `err`, `str`— no se alcanzan desde el corpus de hoy: convergerlos mueve CERO.**

### Un fallo de sonda propio, publicado

El sub-censo que debía contar cuántos ítems de «Anatomía de fórmula» del corpus **no** declaran
color **devolvió 0**, que es falso: hay un `conceptGrid` y un `conceptGridSlide` en
`test_theory_complex.js`. El recorrido no encontró la clave donde viven los ítems. **La cifra que
vale es la diferencial**, que no depende de saber leer la forma.

---

## 3 · EL PROBLEMA QUE BLOQUEA LA OPCIÓN LIMPIA

`#136` resolvió su tabla cruzada **retirándola** y mandando cada carril a su `commons.js`.
**Aquí esa opción tropieza:** la tabla privada guarda `{ color, tint }` y
`slides/helpers/commons.js` **no tiene equivalente de `tint`**. Retirarla entera exige decidir
antes **dónde vive el tinte**.

**La paleta de autor SÍ lo tiene**, y con otro nombre: cada token de `DEFAULT_SLIDE_COLOR_PALETTE`
declara `accent`, **`surface`**, `border` y `text`. Para `def` → `accent #9B6FA5`,
`surface #F6EFF7`. Pero **el motor no lee la paleta** —cero ocurrencias de `colorSystem` bajo
`src/`— y esa frontera no la mueve este run, así que traer esos valores al motor **sería una copia
nueva**, que es justo lo que `#136` retiró.

---

## 4 · LAS OPCIONES, CON SU COSTE MEDIDO

| | qué hace | superficies | ¿escribe hexes nuevos? | juicio visual |
|---|---|---|---|---|
| **A** | sólo el canal de tinta de la insignia — **lo que el operador pidió** | **0** | no | sí, el mando |
| **B** | A + convergir los seis `color` a los que `commons.js` **ya tiene** | **10** | **no** | sí |
| **C** | B + convergir los seis `tint` | **12** | **sí, seis** | sí |
| **D** | retirar la tabla privada entera, como `#136` con «Tabla» | 10 | — | **BLOQUEADA**: falta dónde vive el tinte |

**A no mueve nada** porque abre un canal que hoy nadie usa: mientras nadie elija tinta, el
respaldo sigue pintando lo mismo.

**Coste añadido de B, y hay que decirlo:** convergir el acento sin el tinte deja **2 superficies**
con un par acento/papel que hoy combina y mañana no. Son dos, en un fichero de sandbox, y
medidas.

---

## 5 · LO QUE SE LE PONE DELANTE JUNTO A ESTO

Sobre **el mismo formulario** quedaron dos cosas diferidas al cerrar
`RUN-CANTU-EDITOR-CONCEPTGRID-TERMS-FRAME-001` el mismo día:

1. **La separación de la colección de términos** — propuesta escrita y sin aplicar: la línea
   `border-t` que ya usan los pasos.
2. **«Terminos» sigue con controles propios** —papelera con icono, botón punteado— en vez de
   `CabeceraDeColeccion` / `ItemDeColeccion`.

Se le nombran juntas para que decida las tres de una sentada si quiere.

---

## 6 · SONDAS

En `_scratch/`, fuera de todo repo.

| sonda | qué mide | resultado |
|---|---|---|
| `parada139-que-mueve.mjs` (`color`) | diferencial con centinelas | **10 distintas · 1 fichero · `def` y `focus`** |
| `parada139-que-mueve.mjs` (`tint`) | ídem | **2 distintas · el mismo fichero** |
| su sub-censo de ítems | cuántos no declaran color | **FALLÓ — devolvió 0. No se usa.** |
