# VEREDICTO DEL OPERADOR — `#147`: se amplía `ItemDeColeccion` en vez de perder el rótulo

> Dado por **Christopher Valdez Cantu** el **2026-08-27**, sobre la parada del punto 2 de
> `RUN-CANTU-EDITOR-PORT-WEB-FORM-SHAPES-001`. **Verbatim.**

---

## VERBATIM

> **«A»**

---

## QUÉ DECIDE

**`ItemDeColeccion` recibe una prop OPCIONAL para el rótulo del botón de eliminar, con valor
por defecto igual al de hoy.** «Terminos» pasa a montar la pieza compartida **y conserva
«Eliminar termino N»**.

**Es aditivo: ningún consumidor existente cambia.**

---

## LO QUE SE DESCARTÓ, Y POR QUÉ

**B — montar la pieza tal cual y perder el rótulo.** Para dejar `B7` verde habría que **relajar
lo que comprueba**, que es la línea que el ticket prohibía cruzar. Y costaría un rótulo de
accesibilidad que hoy existe.

**C — dejar «Terminos» con su botón propio y cerrar el punto como 2 de 3.** Coste cero, pero deja
viva justo la incoherencia que el run existe para quitar.

---

## EL PRECEDENTE QUE HIZO BARATA LA OPCIÓN A, Y SE MIDIÓ HOY

`RUN-CANTU-EDITOR-ADD-ITEM-AFFORDANCE-STANDARD-001` **ya cambió la firma de una pieza hermana el
mismo día** —`CabeceraDeColeccion` pasó de `({ titulo, onAdd, textoAñadir })` a `({ titulo })`— y
**las dos guardas siguieron verdes**, porque anclan sobre el **nombre** y el **export**, no sobre
la firma. Ampliar de forma aditiva es aún más seguro que aquello, que quitaba.

## EL PRECEDENTE QUE NO SERVÍA, Y SE DIJO

El taller propuso «Tabla» como precedente para aceptar el «Eliminar» genérico. **Verificado: no
es equivalente.** «Tabla» monta `ItemDeColeccion` con `titulo={\`Fila ${indice + 1}\`}` y **no
tiene una guarda de paridad con Web sobre su botón de eliminar**. «Terminos» sí la tiene: `B7`
extrae `label="Eliminar termino"` del fuente de Web y lo exige aquí.

---

## LA PARADA FUE CORRECTA, Y CONVIENE DEJARLO ESCRITO

El taller **no montó la pieza y no relajó la guarda**: paró y puso las dos salidas encima de la
mesa con su coste. Las dos eran condiciones de parada escritas en el ticket —ampliar la firma de
una pieza compartida, y relajar lo que una prueba comprueba— y **las reconoció las dos**.
