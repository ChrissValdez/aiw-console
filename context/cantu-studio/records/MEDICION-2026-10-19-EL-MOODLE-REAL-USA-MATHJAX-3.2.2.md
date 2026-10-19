# Medición — el Moodle real usa MathJax 3.2.2

> Fecha: 2026-10-19. Fuente: el HTML de una página de lección del Moodle real, pegado por el operador en el hilo
> `cantu-studio` («una pagina de una leccion de moodle revisa si ahi esta la informacion que requerias»).
> Página: «(PAA) Mate: leccion 1 | Método Cantú», curso 17 «(PAA) Curso de Matematicas», `mod/page/view.php?id=149`.

## Lo que dice la página — LITERAL

```
M.util.js_pending('filter_mathjaxloader/loader'); require(['filter_mathjaxloader/loader'], function(amd) {amd.configure({"mathjaxurl":"https:\/\/cdn.jsdelivr.net\/npm\/mathjax@3.2.2\/es5\/tex-mml-chtml.js","mathjaxconfig":"","lang":"es"}); M.util.js_complete('filter_mathjaxloader/loader');});
```

## Lo que cierra

- **El filtro de Moodle carga MathJax 3.2.2** (`tex-mml-chtml`, sin configuración propia: `"mathjaxconfig":""`). Es
  la misma versión que los talleres midieron como «M3».
- **`\textcolor` funciona en el Moodle real.** El #263 midió que falla solo con MathJax 2 y que con MathJax 3 sale
  bien. Los 305 `\textcolor` de los 28 borradores del PAA no están en riesgo. El riesgo que la cabina nombró el
  2026-10-19 como «lo único urgente antes de pausar» **queda descartado**, y no se abre run.
- **El Moodle real conserva los guiones dentro del contenido de la página:** la lección lleva su `<script>` en línea
  y el sitio tiene además un guion global de A−/A+ que busca `.cs-lesson-wrapper`. Lo que el #265 nombró de «un
  Moodle sin guiones» (los nodos del diagrama no se abren) no aplica a esta instancia.
- Las mediciones con «MathJax 2» de los talleres (#263, #266) siguen siendo válidas como respaldo, pero no son la
  instancia real.

## Visto de paso, sin conclusión

- La página es una salida antigua (prefijo `j-`, «System Library v3.2», última modificación 2026-04-30), no una
  lección compilada por el Studio de hoy (prefijo `cs-`).
- En ella aparecen `<%2%1%>` donde debería cerrar un `</style>` (tras las reglas `@container`) y `<%18%20%>` dentro
  de una celda. No se sabe si lo produjo Moodle, el pegado o la salida antigua. Comprobarlo con una lección actual
  ya publicada.
