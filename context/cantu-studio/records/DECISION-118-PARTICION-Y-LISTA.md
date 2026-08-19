# DECISIÓN 118 — Dónde va el control de la Lista, y cómo se parte el run

> Decisión de diseño del operador **Christopher Valdez Cantu**, tomada el **2026-08-18** ante
> la parada de `RUN-CANTU-SLIDE-EDITOR-FIELD-SIZE-PAIRING-001`.
> **Se guarda igual que un veredicto de QA**, porque lo es: es la única entrada capaz de
> resolver lo que ninguna medición podía.

---

## POR QUÉ HUBO QUE PREGUNTAR

El run paró por su condición (b), que era **su resultado bueno**. Pero al medir apareció algo
que ni el run ni el ticket habían anticipado, y que **no era una pregunta de programación**:

> **La «Lista con etiquetas» NO TIENE UN CAMPO CON EL QUE EMPAREJAR.** Su control dimensiona
> el texto de **todos** los ítems de un `useFieldArray`. Ninguna colocación posible es
> literalmente «campo, tamaño».

La convención que el operador pidió —«no campo, campo, campo / tamaño, tamaño, tamaño»— **no
tiene lectura única** sobre una colección repetida. Elegir por él habría sido inventar
intención.

---

## LAS DOS PREGUNTAS Y SUS DOS RESPUESTAS

### 1 · Dónde va el control de la Lista

**Elegido: ENCABEZANDO LA COLECCIÓN.** Arriba del `useFieldArray`, antes del primer ítem,
rotulado de forma que se entienda que **gobierna toda la lista**.

Se le presentaron tres, con recomendación explícita en la primera:

| Opción | Qué era | Resultado |
|---|---|---|
| **Encabezando la colección** | antes del primer ítem, alcance declarado en el rótulo | **ELEGIDA** |
| Al pie de la colección | como hoy, pero pegado a la lista en vez de en la cola compartida | descartada |
| Repetido en cada ítem | cumple «campo, tamaño» literal, pero convierte un ajuste global en N | descartada |

**La tercera era una trampa y se le dijo al ofrecerla:** habría cambiado la **conducta**, que
este run declaraba fuera de alcance. Cumplir la letra de la convención rompiendo su intención
no es cumplirla.

### 2 · Si la interfaz de la Lista viaja al run de su contención

**Elegido: SÍ, VIAJA DENTRO DE `RUN-CANTU-SLIDE-ICONLIST-LIFT-AND-IMPLEMENT-001`.**

Ese run va a rehacer el formulario entero al levantar la contención. Montarlo antes sería
hacer el mismo trabajo dos veces, con el riesgo añadido de que el segundo deshaga al primero.

---

## LA PARTICIÓN QUE ESTA DECISIÓN PRODUJO

`#118` cerró como `completed` con su `closeout_result` declarando **cómo** cerró — por parada
prevista, con inventario, corrección de cifra y veredicto sobre el piloto como resultado. **Su
`queue_order` no cambió.**

| | run | qué se lleva |
|---|---|---|
| `#119` | `RUN-CANTU-SLIDE-EDITOR-SIZE-CONTROL-CONTRACT-001` | la regla escrita, el hueco de `IconListFields`, la guarda mecánica |
| `#120` | `RUN-CANTU-SLIDE-CARD-FIELD-SIZE-PAIRING-001` | la Tarjeta y sus cuatro familias |
| `#121` | `RUN-CANTU-SLIDE-ICONLIST-LIFT-AND-IMPLEMENT-001` | **enmendado**: hereda la colocación de la Lista y la QA que `#116` no pudo ejecutar |

**Dos inserciones, `remap` publicado antes de aplicar y sacado del dry-run, no razonado.** 29
runs se desplazaron en cada una. Total 148, densidad `1..148`, ids únicos, cero activos.

**La única arista colgante del canónico es PREEXISTENTE** y es la causa de tres de los cinco
fallos históricos de la suite: `RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` →
`RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`, que no existe. **No la introdujo esta partición** y no
se toca aquí.

---

## LO QUE ESTA DECISIÓN DEJA ESCRITO PARA LOS SIETE QUE VIENEN

La regla que escriba `#119` tiene que cubrir **cuatro formas**, y sólo una está estrenada:

| forma | ejemplo vivo | estado |
|---|---|---|
| 1 campo → 1 control | la mayoría | **estrenada** por el piloto de Narrativa |
| N campos → 1 control | Métrica, Cita | viva, sin estrenar |
| colección repetida → 1 control | Lista con etiquetas | viva — **la resuelve esta decisión** |
| 1 campo → 2 controles | — | **SIN EJEMPLO VIVO** desde que `#117` retiró el espaciado |

**La cuarta se escribe igual, marcada como sin ejemplo vivo.** Una regla sin caso que la
ejerza no se puede probar con guarda, y fingir que sí es peor que decirlo.

---

## Y UNA CORRECCIÓN DE LA CABINA, PUBLICADA IGUAL DE FUERTE QUE EL ERROR

El ticket de `#118` afirmó que `TIPOS_CON_TAMANO_DE_TEXTO` gobernaba una cola compartida para
**tres** tipos. **Son dos.** La constante sigue con los tres, pero `TIPOS_CON_TAMANO_EN_LA_COLA`
filtra a Narrativa. Lo midió el taller y lo verificó la cabina en `SlideItemEditor.jsx`.

El ticket **marcaba esa cifra como envejecida y mandaba re-medirla**, y por eso el error no
llegó a ninguna parte. Es el argumento entero de por qué las cifras de un ticket se marcan como
valores a verificar.
