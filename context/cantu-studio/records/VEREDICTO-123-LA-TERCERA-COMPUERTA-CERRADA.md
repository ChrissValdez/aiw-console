# VEREDICTO 123 — la tercera compuerta cerrada, y la guarda que protege a los ocho que vienen

> Run: `RUN-CANTU-SLIDE-ICONLIST-JSON-IMPORT-GATE-001` · `queue_order` 123.
> Veredicto del operador **Christopher Valdez Cantu**, **2026-08-18**, ejecutado en Cantu Studio
> sobre dos JSON que la cabina le entregó ya probados contra la puerta real.
> Transcrito por la cabina **VERBATIM**.

---

## SUS PALABRAS, ÍNTEGRAS

```
funciono, el A entro y el B marco:
No se insertó nada. Corrige y reintenta:

* Bloque 1 (columnsSlide) — items.0.items.0.badge: Este campo es obligatorio


y no me dejo insertarlo
```

**Los dos pasos pasan, y el segundo es el que importa:** el mensaje que vio habla de un **campo
obligatorio**, no de contención. Antes de este run el caso A moría con *«Este Draft contiene
componentes bajo contención: iconList»*. **Se retiró la negativa por contención sin aflojar la
validación**, que era la línea fina del encargo.

---

## UNA CORRECCIÓN DE MÉTODO QUE PIDIÓ ÉL, Y ES PERMANENTE

Al recibir la QA, el operador escribió:

```
dame el json para los test no solo me digas que lo invente
```

**Tenía razón y es un defecto de la cabina de la misma familia que las otras cuatro reglas
suyas: dejaba trabajo suyo en la respuesta.** Pedirle «pega un JSON con un ítem de Lista» le
obliga a derivar del esquema una forma que la cabina puede derivar en un minuto — y a
arriesgarse a que un fallo de su JSON parezca un fallo del run.

**REGLA, y se aplica a toda QA futura:** cuando un paso de revisión requiera **material de
entrada** —JSON, texto, una URL, un fichero—, **la cabina lo produce y lo entrega**, y **lo pasa
por la puerta real antes de dárselo**. Un material de QA sin probar puede fabricar un rojo
falso, que es peor que no tener QA.

**Se hizo así:** los dos casos se ejecutaron contra `parseAndValidateBlocks` antes de
entregarse. A devolvió `ok: true`; B devolvió el error de esquema exacto que él acabó viendo en
pantalla. **La predicción y la observación coincidieron literalmente.**

---

## LO QUE ESTE RUN DEJA, Y VALE MÁS QUE SU LÍNEA

**UNA SOLA LÍNEA DE PRODUCCIÓN**: `iconList` sale de `containedSlideComponentTypes`, que queda
vacío. **La constante no se retira** —la usa el carril, la usa Web, y la necesitarán los ocho
por admitir— y esas tres razones quedaron escritas junto a ella.

**LA GUARDA DERIVA EL CENSO DE TIPOS DEL ESQUEMA** y exige que las tres superficies —selector,
mapa de aptitud e importador— **digan lo mismo de cada tipo**. No exige que las tres estén
abiertas: exige que **concuerden**. **Esa formulación es la única que sirve para los ocho
componentes que faltan**, y es lo que impide que se repita lo que pasó con `#121`.

**Y el carril de Web quedó fijado por conducta**, no por lectura: su conjunto ya estaba vacío en
`HEAD` antes de este run, verificado por la cabina con `git show`.

---

## TRES COSAS QUE EL TALLER DEJÓ ESCRITAS, Y LAS TRES SON MÉTODO

1. **ERAN TRES PRUEBAS AJENAS FIJANDO EL ESTADO A MEDIAS, NO DOS.** La tercera asertaba **por el
   mensaje**, no por el nombre de la constante, así que su primer barrido no la vio: apareció en
   la suite completa. Es la sonda que no distingue, cazada por el método en vez de por suerte.
2. **UNA MUTACIÓN SE CAYÓ EN SILENCIO.** Los ficheros son CRLF y su patrón multilínea usaba
   `\n`. **La guarda parecía no cazar cuando lo que no se aplicaba era la mutación.**
3. **UNA CORRIDA DIO SEIS FALLOS Y NO ERA REGRESIÓN.** Lanzó el arnés de mutaciones —que escribe
   producción— **mientras la suite leía**. Verificó el disco, confirmó que los cuatro ficheros
   estaban restaurados, y repitió en limpio.

---

## Y UNA COSA QUE NO SE LE PASA AL OPERADOR

El packet del taller terminaba sugiriéndole **hacer el commit en GitHub Desktop**. **Eso lo hace
la cabina.** No se transmitió como tarea suya; se nombró para que no lo leyera como pendiente.
