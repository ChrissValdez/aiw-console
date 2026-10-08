# #225 · QA ronda 1: el control del aire, con seis correcciones y una expectativa nueva

**Fecha:** 2026-10-08 · **Run:** `RUN-CANTU-PREVIEW-PAGE-TRYOUT-CONTROLS-001` (`#225`, `active`). Sobre el borrador
`cantu-lessons/drafts/web/qa_cabina/qa_2026_10_07/tarjeta_y_aire`.

## El veredicto, verbatim

> Aire de la página
>
> no me gusta el nombre, dame opciones mejores
>
> ahora mas imporatnte varios errores
> primero insignia del tema
> a lado del titulo no jala
> Se pone justo alado y le texto siguiente a la derecha de la badge como si fueran 3 columnas
> a lado del titulo deberia significva orillado hasta la derecha la badge, osea a la izquierda el titulo y hasta la derecha la badge misma linea
> Y en la siguiente linea el texto  siguiente
>
> encima del titulo jala igual que esta bine
> Y oculta jala tambien
>
> segundo todas las configuraciones tienen demasiado texto explicativo
> eso hace que visualmente sea cansado de modificar quita los textos:
>
> Solo cambia esta vista previa: no se guarda en la lección ni en lo publicado.
>
>
> quita la opcion:
> También el primer título de sección (el que va bajo la portada)
> no se ocupa por default esta bien que aplique a todos
> otra cosa el margen interior de la tarjeta jala curioso:
>
> cuadno lo agrando o encojo se encoge la tarjeta
> el tamaño de la tarjeta blanca debe estar definidio
> y si aumenta el margen interior se encoge el contenido, no se agranda la tarejta para que todo quepa igual
> Ademas.. Ancho máximo del texto
> otra ve es como si el tamaño de la tarejta lo definieras en base al texto
> no, defines el tamaño del texto y el contenido se ajusta al tamaño a la tarjeta, no la tarejta en bvase a los tamaños del texto
> me enteindes
>
> da un funcionamienta similar, epro no funciona igual
> ademas cuadno le dic lick ag enerar qweb, no veo que haya utilizado la configuracion del aire de pagina que tengo para generart el nuevo html
>
> en moodle no aplica porque esto especificamente no lo usa, usa la configuracion de moodle para esto, pero el html generado localmente, no lo hizo

## Lo que significa (lectura de la cabina)

1. **El nombre** «Aire de la página» no le gusta. Pide opciones.
2. **«Al lado del título» está mal hecho.** Lo que quiere: el título a la izquierda y la insignia pegada al borde
   derecho, en el mismo renglón, y lo que sigue en el renglón de abajo. Hoy el texto siguiente se mete a la derecha
   de la insignia. «Encima» y «Oculta» funcionan.
3. **Sobra texto explicativo** en los controles. Hay que quitar, como mínimo, «Solo cambia esta vista previa…».
4. **Se quita la casilla del primer título.** El espacio antes del título se aplica a todos.
5. **El modelo de la tarjeta está al revés.** La tarjeta blanca tiene un ancho definido. Más margen interior
   estrecha el contenido; la tarjeta no crece. Y el control de ancho define **la tarjeta**, no el texto: el
   contenido se ajusta a la tarjeta.
6. **«Generar Web» no usó sus cifras.** El run lo hizo así a propósito (el control no guardaba nada), pero él
   esperaba que el HTML local las usara. En Moodle no aplica: Moodle usa su propia configuración.
   **Es una expectativa nueva:** que estas cifras sean un ajuste real del editor, no solo una prueba en la vista
   previa.
