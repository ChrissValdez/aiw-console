> Recogido por la cabina el **2026-08-24**. El operador es Christopher Valdez Cantu.

# VEREDICTO DE QA — `#136` «El mando de tamaño compartido»

## EL VEREDICTO, VERBATIM

> listo jala excelente, podemos proceder
>
> pass

**ES UN VEREDICTO GLOBAL, NO PASO A PASO.** Ningún paso individual del packet de la
ronda 3 tiene BIEN/MAL escrito. Si mañana aparece un defecto en el mando de tamaño, **NO
se puede afirmar que esta QA lo aprobó**.

Lo que sí consta, porque él lo miró y lo dijo en su momento: **la disposición final la
aprobó viéndola** —«mejor», «mejor pero», «listo jala excelente»— a lo largo de tres
rondas de veredicto visual.

---

## CÓMO LLEGÓ AQUÍ, EN CUATRO RONDAS

**Ronda 0 — el mando.** Escalonador `− 1.65rem + ↺` de 110px, `rem` en los dos carriles,
escritura libre con valla `0.5–9rem`, los cuatro peldaños como paradas del `−` y del `+`.
18 mandos, incluido el que ninguna pieza alcanzaba.

**Ronda 1 — la barrida.** El mando comparte fila con su campo. **Doce con pareja, seis
sin ella**, clasificados uno a uno. El mando pasa de costar **49px a 15px**.

**Ronda 2 — la altura y la verdad.** El mando baja de la fila del rótulo a la del campo.
Y se cierra el defecto que el operador reportó: teclear `5rem` decía «CHICO» porque 5rem
**es** el peldaño Chico de esa escala. Ahora teclear dice **«LIBRE»** y pulsar `−` hasta
el mismo número dice **«CHICO»**.

**Ronda 3 — la cabecera.** El nombre y su (i) suben encima de la caja **sin pagar un
píxel**, y el campo **gana 68px** de regalo.

## LO QUE ESTE RUN DEJÓ ESCRITO, Y VALE MÁS QUE EL MANDO

**1 · LOS CUATRO PELDAÑOS ERAN UN INVENTO DEL EDITOR.** El motor siempre aceptó cualquier
cadena y el corpus escribía seis valores libres. El editor había cerrado una puerta que
estaba abierta. Este run la devuelve.

**2 · EL TALLER PARÓ SIN ESCRIBIR UN FICHERO, Y ACERTÓ LAS TRES VECES.** La premisa
central del ticket —«los dos carriles guardan clases distintas de número»— era **falsa y
de la cabina**. Y con ella cayeron tres cifras suyas más.

**3 · EL BANCO DIO UN VERDE QUE NO VALÍA.** La ronda 0 verificó la escritura libre en un
banco de pruebas; el operador no pudo reproducirla. El taller resolvió el problema de
raíz: **construyó la app real y la condujo desde disco**, sin tocar nada prohibido. Desde
la ronda 2, el editor real es la única fuente de verdad de este run.

**4 · UN NOMBRE NO ES UN NÚMERO.** `−` y `+` guardan el **nombre** del peldaño; teclear
guarda el **rem**. Un nombre es una promesa que se re-ancla sin tocar una lección; un rem
es un número congelado. Que coincidan en una escala es un accidente de esa escala.

## LO QUE SE PAGÓ, Y ESTÁ DECLARADO

Los **seis** mandos sin campo de pareja no tienen franja de rótulo donde subir la
cabecera, así que su fila crece de **30 a 45,1px**. Se paga en seis, no en dieciocho, y
el operador lo aprobó viéndolo.

## LO QUE QUEDA ABIERTO Y NO ES DE ESTE RUN

- **`#137`** — enseñar el valor **pintado** en vez del pedido. Sale de aquí por decisión
  del operador: no es funcionalidad, es un puente que no existe entre el editor y la
  previa.
- **La dependencia huérfana del canónico**, que causa los cinco fallos de suite que
  llevaban semanas contándose sin causa nombrada. Es de `aiw-console`.
- **El run de la paleta**, que ya acumula cinco cosas: el color del paso y el color e
  icono de la nota de «Procedimiento matemático», el `ctx` de la Tabla, y el tono que no
  coincide entre paleta y mapa privado.
