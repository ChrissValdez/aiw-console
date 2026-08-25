# DECISIÓN — la dirección de la migración de color, y el orden

> Tomada por **Christopher Valdez Cantu** el **2026-08-24**, sobre el encuadre que entregó la
> parada de análisis de `#133`.

---

## LAS DOS DECISIONES

**1 · LA DIRECCIÓN: hacia la paleta global del autor.**

Con su coste declarado y aceptado: **216 superficies de color en 14 ficheros**, y **re-fijar
los 63 árboles**. Hacia el motor habría movido cero, y habría tirado la paleta rediseñada.

Sus borradores casi no se enteran: **4 tarjetas, ninguna con acento**, y una lección en
preparación.

**2 · EL ORDEN: primero los defectos del motor consigo mismo.**

No dependen de la dirección, así que se pueden arreglar ya — y uno de ellos le está
pintando mal el contenido **hoy**.

---

## LO QUE HIZO QUE LA DECISIÓN FUERA FÁCIL, Y NO ES UNA OPINIÓN

La cabina se lo planteó como *«¿qué color gana, el del motor o el de tu paleta?»* — una
pregunta de gusto. **El taller midió que la tabla base del motor ES la paleta de Web, 9 de 9
idénticos.**

> **No son dos criterios estéticos: son la versión VIEJA y la NUEVA del mismo objeto.** La
> pregunta deja de ser «cuál prefieres» y pasa a ser «terminas la mudanza o la deshaces».

Y el propio proyecto ya la había empezado: `RUN-CANTU-SLIDE-PALETTE-REACHES-THE-ENGINE-001`
se la hizo a `renderCard` y los demás se quedaron.

## LOS DOS DEFECTOS QUE LA PARADA DESTAPÓ, Y QUE VAN PRIMERO

**A · EL CORRIMIENTO DE UNA POSICIÓN — está VIVO en el contenido del operador.**

Verificado por la cabina el 2026-08-24:

| token | `commons.VARIANTS` (tabla base) | copia privada de `stackSlide` |
|---|---|---|
| `str` | `#6B6352` | **`#D08770`** — el naranja de `wrn` |
| `wrn` | `#D08770` | **`#BF616A`** — el rojo de `err` |
| `focus` | `#5C4B40` | **`#88C0D0`** — un cuarto valor |

Un paso marcado **«estrategia» se pinta como aviso**, y un **aviso como error**. Y el corpus
**usa `str`**: está en dos de los tres problemas del walkthrough. `splitCard` lleva la misma
copia.

**ESTO NO LO ARREGLA CONVERGER.** Es el motor incoherente consigo mismo, y por eso va aparte.

**B · «JERARQUÍA» REVIENTA — latente, y estaba en la cola para exponerse.**

Verificado por la cabina: `Commons.PALETTE` **no existe** — `commons.js` exporta `ICONS`,
`VARIANTS` y `getGridPositionStyles`, y nada más. `renderHierarchySlide` lo invoca igual.

    nodo con `variant`  ->  TypeError: Cannot read properties of undefined
    nodo con `color`    ->  pinta

Está latente **solo porque los 21 nodos del corpus declaran `color` y ninguno `variant`**.
Exponer «Jerarquía» antes de arreglarlo habría entregado un componente que revienta en
cuanto un autor eligiera variante.

## LO QUE LA PARADA DE ANÁLISIS DEMOSTRÓ COMO MÉTODO

**Fue la primera parada de análisis del proyecto, y se pagó sola en el primer intento.**
Ninguno de los dos defectos se buscaba: salieron de clasificar antes de escribir. Si el run
hubiera empezado por el código, los dos habrían viajado escondidos dentro de la migración.

Y el taller corrigió **dos cifras de la cabina** y **cazó una trampa en su propia sonda**:
un `<style>` mencionado dentro de un comentario se emparejaba con el cierre real y se
tragaba **doce hexes que eran precisamente el defecto** (102 → 114).

También dejó dicho que **contar hexes es mal indicador**, con tres casos — entre ellos que
la portada entera tiene **29 acentos congelados en hojas** que el censo excluye por
construcción, y **ningún canal de color**.

## LO QUE QUEDA PARA EL OPERADOR, DESPUÉS DE ESTO

- **El troceo de la migración**: 216 superficies en 14 ficheros no es un solo encargo.
- **Las cuatro preguntas de los «no sé»** que la clasificación dejó sin veredicto.
- **La forma**: si se replica el mecanismo de `card`, donde la variante misma es un token.
