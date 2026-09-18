# #208 · El veredicto de pantalla del operador: `pass`

**Fecha:** 2026-09-18 · **Run:** `#208` `RUN-CANTU-EDITOR-TITLE-SURFACE-AND-NEW-LESSON-GUARD-001`
«Give the lesson title a surface, and guard the first write» · **Cerrado** `active → completed`.

---

## El veredicto, verbatim

> pass

Sobre estos cinco pasos, ejecutados por él en su editor, con el API reiniciado:

1. Abrir una lección desde **Explorar** y localizar, a la derecha del renglón
   `curso / tema / título`, el **icono de lápiz** cuyo globo dice **«Renombrar lección»**.
2. Renombrarla con un nombre libre: la barra muestra el nombre nuevo, la píldora dice
   `Draft renombrado: … -> …`, y en **Explorar** está el nuevo y ya no el viejo.
3. Dejar cambios sin guardar, cerrar la pestaña, reabrir el editor y **aceptar recuperar el
   borrador**.
4. Con ese borrador recuperado, intentar renombrarlo **con el nombre exacto de otra lección**: no
   renombra, la barra sigue igual, y **la otra lección sigue entera**.
5. Con el mismo borrador recuperado, renombrar con un nombre **libre**: sí renombra — la parada no
   es permanente.

La parte A de la hoja (crear la misma lección desde dos ventanas) **no se ejecutó, y no se pidió**:
esa parada está medida contra servidor real y vista en rojo bajo sabotaje. Queda declarado aquí y en
el `closeout_result`.

---

## Lo que este run cambió para él, en una línea

Antes no había ningún sitio donde tocar el título —lo dijo con sus palabras: «no hay ningun boton
para editarlo»—. Ahora hay un lápiz en la barra, y va al mismo renombrado de siempre.

---

## Lo que casi se le cuela, y cómo apareció

El botón nuevo era el primer llamador capaz de pedir un renombrado **sin ruta de origen**, cosa que
pasa tras **recuperar un borrador**. Por ese camino, la pregunta «¿ya existe ese nombre?» viajaba con
el título crudo, el servidor la rechazaba con 400 por no ser un slug, `loadFromServer` convertía el
rechazo en `null`, y quien preguntaba lo leía como **«el destino está libre»**. La otra lección se
sobrescribía entera y en silencio.

Lo midió la cabina **leyendo el código**, sin ejecutarlo, y lo dijo como riesgo, no como veredicto.
El taller intentó desmentirlo contra su servidor de juguete con el cliente de disco y **lo
reprodujo**: el hash de la lección víctima cambiaba.

**La regla que lo cierra:** *una comprobación que no pudo hacerse no es un «no existe»*. Seguir exige
una respuesta afirmativa de que el destino está libre. `probeDraft` devuelve `asked` **aparte** de
`exists`, porque un solo booleano obliga a elegir un valor para «no se sabe» y el único que no miente
—`false`— es justo el que da permiso. Ese colapso **era** el defecto.

**Los dos sabotajes contestaron cuál de los dos arreglos es el que cierra:** desactivar la parada
**destruye** la víctima; devolver el título crudo la deja intacta pero **impide renombrar para
siempre**. La forma hace que la función sirva; la parada hace que no destruya.

---

## Correcciones de este run, y la primera es mía

1. **«espacio o acento» era una compresión falsa.** `isSafeSlug` es `/^[a-z0-9_]+$/`: también
   **cualquier mayúscula** fallaba. Mi frase hacía parecer raro lo que era el caso normal — cualquier
   nombre que una persona teclee.
2. **Un sexto eslabón que el taller añadió:** con el destino libre, escribía el fichero nuevo y
   dejaba el viejo sin retirar, porque la verificación posterior preguntaba igual de mal.
3. **Una honestidad del taller que vale como regla:** su prueba principal pasaba por la rama «Ya
   existe», así que **no ejercitaba la parada**; sin una prueba dedicada, la parada habría sido código
   que nadie vio correr. Y esa prueba dedicada le salió **verde por la puerta equivocada** en el
   primer intento, porque otra prueba se había llevado el fichero de origen. La resembró.

---

## Hallazgo de método, y vale para todos los hilos

**`git stash` no es byte-seguro en este repo.** Con `* text=auto`, dos de tres ficheros volvieron del
stash con LF en vez de CRLF. **Lo cazó la verificación por hash; el diff no lo veía.**

---

## Deuda que este run deja nombrada y NO cerrada

- **El hermano:** en el servidor, **compilar** sigue sobrescribiendo cuando la petición no declara
  origen, y eso se alcanza tras **recuperar** un borrador. Fijado con una prueba (S4) que **tendrá
  que morir** cuando alguien lo cierre. Pide que la ranura local recuerde su ruta: otra pieza, otro
  run.
- **La 409 del `#207` queda declarada seguro de servidor y no flujo de pantalla**, de forma
  permanente bajo la opción B.
- **Deuda de UX, para el run de auditoría:** renombrar entra por un `window.prompt` que propone el
  slug (`las_fracciones`) en vez de lo que se lee en la barra, y los tres botones de Explorar no
  llevan rótulo.
