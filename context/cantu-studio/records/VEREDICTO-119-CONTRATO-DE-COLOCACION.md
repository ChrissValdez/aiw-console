# VEREDICTO 119 — El contrato de la colocación del control de tamaño

> Run: `RUN-CANTU-SLIDE-EDITOR-SIZE-CONTROL-CONTRACT-001` · `queue_order` 119 al escribir.
> Veredicto del operador **Christopher Valdez Cantu**, **2026-08-18**, tras leer el apartado
> «(c) COLECCIÓN REPETIDA → UN control» de
> `docs/reference/REFERENCE-SLIDE-EDITOR-SIZE-CONTROL-PLACEMENT.md`.
> Transcrito por la cabina **VERBATIM**.

---

## SUS PALABRAS, ÍNTEGRAS

```
si, decidid, sobre eso qe sigue, tengo que verlo visual para entenderlo
```

---

## QUÉ PASA Y QUÉ NO

**El paso 2 —el único que importaba— PASA.** La regla escrita describe lo que el operador
decidió: el control de una colección repetida va **encabezando la colección**, arriba del
`useFieldArray`, antes del primer ítem, rotulado de forma que se entienda que gobierna toda la
lista.

Los pasos 1 y 3 la cabina los dio por buenos **habiéndolos verificado ella contra disco**, y se
lo dijo al pedir el veredicto. No se le atribuyen al operador.

**ESTE RUN CERRÓ SIN QA VISUAL, Y ES LEGÍTIMO:** no monta superficie en pantalla — el hueco
llega vacío y lo llena `#121`. Todo lo que produce es verificable contra disco y la cabina lo
verificó. **Se declara en vez de callarse**, que es la regla.

**Y ES EL PRIMER CIERRE SIN QA VISUAL DE ESTA CADENA.** Los doce anteriores la tuvieron. Se
nombra para que quede la cuenta.

---

## LA SEGUNDA MITAD DE SU FRASE ES UNA INSTRUCCIÓN, NO UN COMENTARIO

> *«sobre eso qe sigue, tengo que verlo visual para entenderlo»*

**Es una petición de método sobre los runs que vienen, y se registra como permanente hasta que
él la retire.** Lo que viene —`#120` la Tarjeta y `#121` la Lista— es exactamente donde la
regla se vuelve visible, y el operador está diciendo que **la prosa no le sirve para juzgarla**.

**Consecuencia operativa, y la cabina la asume:**

- **Antes de que el operador tenga que decidir sobre una colocación, se le DIBUJA.** No se le
  describe. Este proyecto ya tiene la medición: describir opciones costó tres entregables
  fallidos y tres turnos; dibujarlas cerró cuatro decisiones de una vez.
- **El dibujo va ANTES del ticket cuando la decisión es suya**, no después en la QA.
- **Un dibujo de la cabina NO es una captura.** La cabina no ve interfaces: lo que puede
  entregar es un esquema de la regla, y **se marca como esquema**. El render real lo produce el
  taller.

---

## LO QUE ESTE RUN DEJA, Y ES LO QUE MÁS RINDE

**LA GUARDA DERIVA EL INVENTARIO DEL PROPIO ESQUEMA.** Navega `SlidesDraftSchema` hasta la
unión de ítems y obtiene `card`, `iconList`, `narrative`, `visual` — **exactamente el censo que
el `#118` midió a mano**. Un componente nuevo **no puede** nacer con su control descolgado sin
que algo se ponga rojo. Lo demostró mutando el esquema para darle un `textSize` a `video`: `C2`
se puso roja sola.

La lista de excepciones —`card` → `#120`, `iconList` → `#121`— **solo puede encoger**.

**Donde una comprobación mecánica pudo sustituir a una regla que alguien tiene que recordar, la
sustituyó.**

---

## EL LÍMITE QUE EL TALLER DECLARÓ, Y ES EL HALLAZGO HONESTO DEL RUN

**La guarda NO puede comprobar que un control esté INMEDIATAMENTE detrás de su campo.** El
código no lleva escrito qué campo pareja con cuál; verificarlo exigiría que cada montaje lo
declarase, que es un cambio de contrato mayor que el encargado.

**Nombrado en la regla Y en la guarda, no resuelto.** Una guarda que fingiera cubrir eso sería
peor que no tenerla, porque produciría un verde y **un verde no se cuestiona**.

---

## HALLAZGO DE TERRENO, NOMBRADO Y NO REPARADO

**`CLAUDE.md` describe un árbol `docs/author-lite/…` que NO EXISTE en disco.** El taller usó
`docs/reference/`, donde ya viven 11 ficheros `REFERENCE-*.md`. El documento de reglas del repo
miente sobre su propio repo. No se tocó.
