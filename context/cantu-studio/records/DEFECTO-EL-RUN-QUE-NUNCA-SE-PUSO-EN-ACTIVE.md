# DEFECTO DE LA CABINA — dos en el mismo run, y los dos los cazó otro

**Fecha:** 2026-09-01 · **Run:** `RUN-CANTU-SLIDE-STACK-SCRIPT-ONCE-001` (`#174`)

---

## 1 · El run nunca se puso en `active`

**Lo medido:** al ir a cerrarlo, el canónico decía `planned`. La cabina **emitió el ticket sin
ejecutar la mitad de apertura del turno 1**. Durante todo el encargo el canónico afirmó que
nadie trabajaba en ese run.

**Por qué importa más de lo que parece.** El `status` no es decoración: es lo que impide que un
segundo hilo mueva la cola con un encargo en vuelo, y la propia regla estructural dice «nunca
con un encargo en vuelo». **Durante ese rato esa protección no existía**, y la cabina además
hizo dos escrituras estructurales en el canónico —la limpieza y el cierre de `#173`— creyendo
que no había nada en vuelo. No hubo daño porque no había otro hilo escribiendo; **la ausencia de
daño fue suerte, no diseño**.

**Cómo se cerró:** de `planned` a `completed` **directamente**, declarándolo en el
`closeout_result`. Se descartó fabricar un paso por `active`, porque eso habría dejado el
canónico contando una historia que no ocurrió.

**La guarda que lo habría evitado, y que se propone:** antes de emitir un ticket, la cabina lee
del canónico el `status` del run que va a encargar y **aborta si no es `active`**. Es la misma
forma que ya usan las guardas de título: mecánica, no disciplina.

## 2 · Una cifra publicada sin su alcance, otra vez

**Lo medido:** el ticket decía «en SLIDE quedan **1435,9 KiB = 79,3 %**». La aritmética:

    1435,9 KiB sobre showcase_library        79,3 %   <- el porcentaje que se publico
    1435,9 KiB sobre el corpus SLIDE         32,8 %

El reporte del taller anterior decía literalmente **«sobre el fichero ya deduplicado»**. **La
palabra que fija el alcance estaba escrita y la cabina la dejó caer al citarlo.**

**El efecto fue subestimar:** había un segundo fichero con las mismas 22 copias. Lo alcanzable
del corpus eran **2818,0 KiB**, casi el doble. El taller lo midió y contradijo el ticket, que es
exactamente para lo que se le pide que contradiga.

**Y es reincidencia declarada.** Esta casa ya tiene escrita la regla —«un factor de uniformidad
sin su alcance escrito»— y ya había pasado con «el techo pasa de 1,1/1,5 a 1,0 sin decir de
quién». La forma del fallo no es medir mal: es **citar bien y comprimir mal**.

**La guarda que se propone:** toda cifra que la cabina copie de un reporte ajeno viaja con el
sustantivo que la acota —*de este fichero*, *del corpus*, *de esta escena*— **en la misma
frase**, o no se copia.

---

## Lo que estos dos tienen en común

Ninguno lo detectó la cabina. **El primero salió al ir a cerrar; el segundo lo desmintió el
taller.** Los dos son de la familia que esta casa lleva meses nombrando: **el papel no es el
disco, y una medición propia envejece dentro de la misma sesión.**
