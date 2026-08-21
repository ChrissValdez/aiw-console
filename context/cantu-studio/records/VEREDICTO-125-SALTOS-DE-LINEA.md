# VEREDICTO 125 — los saltos de línea del autor, en las catorce superficies

> Run: `RUN-CANTU-SLIDE-PROSE-LINE-BREAKS-001` · `queue_order` 125.
> Veredicto del operador **Christopher Valdez Cantu**, **2026-08-20**, en Cantu Studio.
> Transcrito por la cabina **VERBATIM**.

---

## SUS PALABRAS, ÍNTEGRAS

```
listo si jalo,

ahora duda de video, mira como se ajusta el tamaño de una forma rara
alguna recomendacion para arreglarlo? en realidad no es un erro grave de momento entonces
podemos no hacerlo pero si tienes una solucion adecuada ihaagmosla
```

Adjuntó una captura de una fila con un vídeo y su pie de dos párrafos, ya con los saltos
pintados.

---

## PARTE 1 — EL RUN PASA, Y CERRÓ UN DEFECTO REPORTADO CUATRO VECES

**«listo si jalo».** Los saltos de línea del autor se pintan como los escribe, en **catorce
superficies**. El operador lo reportó **cuatro veces** —tres de ellas mientras revisaba otro
run— y no se parcheó en ningún componente suelto a propósito.

**Y hay una prueba de que hacía falta desde hace tiempo:** dos textos del corpus ya usaban
`<br>` escrito a mano.

---

## PARTE 2 — LO QUE EL TALLER MIDIÓ Y LA CABINA NO HABÍA NOMBRADO

**`pre-wrap` preserva TODO el espacio, no solo el salto.** La Nota y la Tarjeta interpolaban
**con la sangría de su propia plantilla**, así que puestos tal cual pintaban **cinco líneas en
vez de tres**. Se apretaron las dos interpolaciones.

**Y la red de los 63 árboles NO PUEDE VIGILAR ESO**, porque el árbol canónico colapsa espacios:
cero de las 191 líneas de diferencia venían de ahí. **Lo vigila una guarda propia**, escrita
para eso.

**No hubo empate en la forma, y se eligió midiendo:** el corpus escribe marcado dentro de la
prosa —`<strong>`×20, `<br>`×2, `<div style=…>`×2—, y partir en párrafos puede cortar dentro de
un par de etiquetas. `pre-wrap` no toca la interpolación.

**Los números:** cero textos del corpus cambian de pintura; cero sangrías o espacios finales se
destapan; **cero de 38 árboles de Web movidos**; 25 de diapositiva enmendados uno a uno, con
191 líneas de diferencia **todas de la declaración nueva** y **cero no declaradas**.

---

## PARTE 3 — UNA PREMISA DEL TICKET ERA FALSA, Y GANA EL DISCO

El criterio 7 daba por hecho que la prosa pasa por validadores que rechazan HTML. **No es así.**
Medido por el taller y **verificado por la cabina**: el esquema de diapositiva acepta `<script>`,
`onerror=` y `javascript:` en prosa. **Web los rechaza los seis.**

**Es anterior a este run, está declarado en el propio esquema** —igualarlo invalidaría material
de Core— y **`pre-wrap` no lo rodea**: es hoja de estilo, la superficie de inyección es idéntica.

**Y se lee junto a lo que midió `#122`:** por el camino del autor, **el compilador escapa** —0 de
8 inyectables—. Así que **la puerta que falta es la del esquema, no la de la pintura**.

**Nombrado, no tocado, y con guarda** para que el día que se mueva se vea. Es decisión del
operador si se cierra y cuándo.

---

## PARTE 4 — LA PREGUNTA DEL VÍDEO, Y LA RESPUESTA DE LA CABINA

Su duda —«mira como se ajusta el tamaño de una forma rara»— **es exactamente el defecto que ya
tiene run y decisión**: `RUN-CANTU-SLIDE-CELL-GEOMETRY-FIT-001`, con su **opción D** —la celda se
ajusta al contenido— escrita dentro desde el 2026-08-18.

**LA CABINA RECOMENDÓ NO ADELANTARLO, Y LA RAZÓN ES MEDIDA:** hoy hay **dos** casos de evidencia
—la Lista que no cabe en cuatro filas y el vídeo que no encaja en su celda— y cuando la cola
llegue a ese run habrá **diez**. El reparto de altura del escenario se decide **una vez con todas
las formas delante**, no dos veces.

**Y su propia frase lo autoriza:** «no es un error grave de momento». La cabina **no inventó un
arreglo barato** para no pre-empeñar la decisión grande.
