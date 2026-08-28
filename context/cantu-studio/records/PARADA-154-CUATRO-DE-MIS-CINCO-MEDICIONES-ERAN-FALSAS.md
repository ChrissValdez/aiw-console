# PARADA de `#154` — **cuatro de las cinco mediciones de la cabina eran falsas**

> `RUN-CANTU-SLIDE-STACK-PER-STEP-FORMULA-SIZE-001`, `active` desde el **2026-08-28**.
> El taller **paró y reportó sin escribir una línea de producción.**

---

## ⚠ LAS CINCO MEDICIONES DEL ENCUADRE, UNA A UNA

| | lo que escribió la cabina | veredicto |
|---|---|---|
| ① | el motor ya lee un tamaño por paso | **cierta A MEDIAS** |
| ② | el corpus ya lo escribe | **cierta en el texto, MUERTA en dos tercios** |
| ③ | el esquema **no** lo admite | **FALSA** |
| ④ | el techo automático ya existe, suelo 14 px | **hay DOS, y el del historial NO ES UN TECHO** |
| ⑤ | el mando existe y está montado en Tarjeta/ítem/Tabla | **FALSA** |

**La cabina verificó las tres decisivas y el taller tiene razón en las tres.**

### ③ — el esquema **SÍ** lo admite

`StackSlideStepSchema` tiene **`historySize`**, y el bloque tiene `problemSize` y `historySize`.
**El canal está completo de punta a punta:** esquema → el compilador valida → resuelve → emite
`historyFontSize` → el motor lo lee.

**Lo que el esquema no admite es el nombre CRUDO `historyFontSize`, que el autor nunca escribe.**
La cabina buscó el nombre del motor en la puerta del autor. **Y la lista de campos que publicó
estaba corta en nueve.**

### ⑤ — el mando que la cabina nombró está **retirado**, y el vivo **ya está montado aquí**

`SlideSizeSelect.jsx` se declara, en su primera línea: **«⚠ RETIRADO EN SU SITIO … CERO
MONTAJES»**. Verificado: **cero**.

**La pieza viva es `SizeStepper`, en siete ficheros — y ya está montada DOS VECES en «Procedimiento
matemático»**, una de ellas **por paso**.

### ④ — el del historial **sobrescribe**, no limita

`fitHistory` **asigna el tope incondicionalmente y sólo después encoge**. Medido sobre el mazo real:
**51 de 51 ítems de historial llevan un tamaño en línea y CERO sobreviven** en cuanto hay
maquetación.

---

## ⚠⚠ Y LA PREMISA DE LA PREGUNTA (a) ESTABA INVERTIDA — el peor error de la cabina

El encuadre decía que el mando **enseña píxeles en diapositiva, «por decisión escrita del
operador»**.

**`DECISION-EL-MANDO-DE-TAMANO.md` dice lo contrario**, y lo dice **con una etiqueta de aviso
encima**:

    línea 51:   ⚠ ATENCIÓN — LA SECCIÓN QUE SIGUE CONTIENE UN DATO FALSO DE LA CABINA.
    línea 160:  1 · LA UNIDAD ES `rem`, Y ES LA MISMA EN LOS DOS CARRILES.

> **La cabina citó exactamente la sección que ese documento marca como falsedad suya.** El aviso
> estaba puesto y lo leyó por encima. **Es el peor de sus errores de esta sesión**, porque el
> mecanismo de corrección existía y funcionó — y aun así se propagó.

---

## LO QUE DE VERDAD PASA, Y CAMBIA LA PETICIÓN ENTERA

> **El campo está admitido. El compilador lo traduce. El motor lo lee. El mando existe y ya vive
> en este formulario. Lo único que falta es que el guion del motor deje de tirarlo.**

**Y el mando se retiró a propósito, el 2026-08-24, POR RESPUESTA DEL PROPIO OPERADOR** —
*«ninguno de los dos: automático»*— **porque el tamaño del autor había dejado de tener efecto
visual.** Está escrito en tres sitios: el motor, el esquema y el formulario.

**Montarlo hoy sin tocar el guion reproduce el defecto vetado en su peor forma:** el autor pide un
tamaño y la pantalla pinta otro **siempre**, no sólo al desbordarse.

## LA PREGUNTA QUE EL ENCUADRE NO HIZO, Y VA PRIMERA

**¿QUÉ FÓRMULA?**

| | canal de autor hoy | techo hoy |
|---|---|---|
| **la fórmula grande** — la del paso enfocado | **NINGUNO** | 45/75 px, suelo 14 px |
| **el historial** — la barra lateral de pasos pasados | completo, **pero el guion lo pisa** | sobrescritura |

**Como cada paso es su propia diapositiva, «el tamaño de la fórmula por paso» se lee de forma
natural como LA GRANDE. Y la grande no tiene canal ninguno.**

## Y EL EJEMPLO VIVO DE LO QUE PIDE YA EXISTE

**`problemSize` —el tamaño del enunciado— funciona hoy de punta a punta**, con su mando montado,
**porque su tarjeta no es un ítem de historial y el guion no la toca.** Medido: **22 de 22
conservan su tamaño.**

---

## EL COSTE DE LA SALIDA QUE EL TALLER RECOMIENDA

**Que el techo del historial arranque del tamaño del autor** en vez de una constante. Es
literalmente lo que el operador pidió.

**PERO NO ES ADITIVO:** hoy todo el historial pinta ≤ un tamaño fijo; después, **los 51 ítems
declarados pintan el suyo cuando quepa**. **Mueve los 63 árboles fijados y cambia contenido ya
escrito en pantalla.** **Eso es del operador aceptarlo.**

## Y EL TALLER DESCARTÓ, CON RAZÓN MEDIDA, QUE HAGA FALTA EL RUN DEL TAMAÑO PINTADO

**Leyó `RUN-CANTU-EDITOR-SHOWS-THE-PAINTED-SIZE-001` y concluyó que la solución limpia NO lo
exige** — porque el operador **aceptó por adelantado** que «si se desborda, tiene un techo
automático». **La divergencia mando/pantalla sólo aparecería en el caso de desborde, que es el que
él autorizó.**

## LO QUE NO PUDO MEDIR

**El píxel.** El permiso para abrir su propia URL aislada **fue denegado por el clasificador**, y
el repo no tiene navegador sin cabeza. **La sobrescritura es un hecho de código sin rama que
preserve el valor, pero el `font-size` computado no está medido en pantalla.** Lo pidió
explícitamente para un turno.
