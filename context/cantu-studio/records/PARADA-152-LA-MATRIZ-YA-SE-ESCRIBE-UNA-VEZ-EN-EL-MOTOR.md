# PARADA de `#152` — la matriz **ya** se escribe una vez en el motor; **quien acumula es el editor**

> `RUN-CANTU-SLIDE-MATRIX-WRITE-IT-ONCE-001`, `active` desde el **2026-08-28**.
> El taller **paró y reportó sin escribir una línea de producción** — verificado por la cabina:
> `git status` limpio.
> **⚠ NO DEJÓ FICHERO: su paquete vivía en el chat. Lo transcribe la cabina.**

---

## ⚠ EL HALLAZGO QUE CAMBIA LA PREGUNTA ENTERA

El texto del run daba por hecho que **el motor** acumula. **No lo hace.**

| | filas de matriz emitidas, mismo átomo, 3 pasos |
|---|---|
| **motor de DIAPOSITIVA** | **4** — 3 pasos + 1 de cierre |
| **motor de WEB** | **9** — 2+3+4, acumulando |

**VERIFICADO POR LA CABINA, tres de tres:**

- **El editor de diapositiva SÍ acumula:** `pasos.slice(0, indice + 1).map(…)`, y su propio
  comentario lo dice — *«LA MATRIZ ACUMULADA HASTA ESTE PASO»*.
- **El motor de diapositiva NO acumula:** un `data.steps.map` emite **una fila por paso**, y la
  fila de cierre **sólo en el último** (`i === data.steps.length - 1`).
- **El motor de Web SÍ acumula:** `for (let i = 0; i < currentIndex; i++)` reimprime la historia
  **dentro de cada paso**.

> **El operador YA TIENE EN PANTALLA lo que pide. Lo que ve acumulado es el EDITOR** — que copió
> el control de Web hace tres días, con un comentario que decía *«que es exactamente lo que el
> motor pinta en esta tarjeta»*. **En Web eso es verdad. En diapositiva no lo es.**

**Con 3 pasos el formulario dibuja 9 filas para una matriz que tiene 4.**

---

## EL CORTE QUE PIDE YA EXISTE EN LOS DATOS

Medido **por supresión, con el id acuñado normalizado**:

| campo | al quitarlo | de quién es |
|---|---|---|
| `nums` | **lanza** | de la **FILA** |
| `div` | escribe «undefined» | de la **FILA** |
| `status` | se pierde el tachado | de la **FILA** |
| `finalResult` | desaparece la fila de cierre | de la **FILA** |
| `label` | escribe «undefined» | del **PASO** |
| `desc` | nada, con compuerta | del **PASO** |

**Cuatro campos son de la matriz y dos de la narrativa. Lo único que los junta es que hoy viven
en el mismo objeto.**

---

## LAS DOS LECTURAS, CON SU COSTE MEDIDO

### A — sólo el formulario

Un bloque **«Matriz»** que pinta las filas una vez, y un bloque **«Pasos»** con sólo rótulo y
descripción. **Las celdas ya escriben en `steps[dueño]`, así que el enganche existe.**

- **Gana:** el formulario pasa de 9 filas a 4 y **queda igual al motor**.
- **Pierde:** ver la matriz «tal como iba en el paso 2» — **que en diapositiva no se pinta**.
- **COSTE MEDIDO: CERO** en motor, en los dos esquemas, en el compilador, en el corpus y **en
  borradores guardados**. **El átomo compartido sigue siendo uno.**

### B — cambia el dato

`steps[]` pierde `nums`/`div`/`status`/`finalResult`, que se mudan a un campo propio.

- **Gana:** el dato dice lo que el motor hace.
- **Y ABRE PREGUNTAS QUE NADIE HA CONTESTADO:** ¿puede haber más filas que pasos? ¿el divisor
  viaja con la fila o con el paso? ¿el tachado?
- **COSTE:** motor + 2 esquemas + compilador + editor + **partir el átomo** + **migración**, más
  **10 préstamos de esquema** que se quedan sin campo del que colgar.

---

## ⚠ LAS DOS CIFRAS QUE DECIDEN

**EL CORPUS ES BAJO:** **un solo átomo de matriz** en todo el corpus, **dos escenas** que lo usan
—una por carril— y **cero lecciones autoradas** con matriz. **No dispara la parada.**

**PERO EL ÁTOMO NO SE PUEDE PARTIR A MEDIAS:** el `spread` copia el nivel de arriba, **pero
`steps` es LITERALMENTE EL MISMO ARRAY en los dos carriles**. En la lectura B **hay que duplicarlo**.

**LOS BORRADORES: cero en disco** —con control positivo hecho, así que el cero no es de sonda
mala—. **Y la ruptura:**

> Los dos esquemas son `.strict()`. **Un borrador viejo bajo una forma nueva NO se convierte: se
> RECHAZA.** En la lectura B, **el borrador que lleva días en el banner de recuperación del
> operador dejaría de validar** el día que se publique el cambio, salvo que la migración se
> escriba a la vez. **En la lectura A no le pasa nada.**

## LO ÚNICO QUE SÓLO EL OPERADOR PUEDE MIRAR

**Si su borrador guardado contiene una matriz de diapositiva.** Vive en el `localStorage` **de su
perfil de navegador**, y el taller **no abrió el editor para no arriesgarse a escribir en la
ranura**. **Es la única cifra que falta, y sólo importa si se elige la B.**
