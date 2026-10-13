# Decisión del operador, 2026-10-13 — el aire de la página (peticiones 25 y 26 de Lecciones)

> Las peticiones están en `cantu-lessons/docs/PARA-CANTU-STUDIO-2026-10-12.md`: la §25 (commit `d0252b7`, la línea
> entre secciones) y la §26 (commit `4c9e7eb`, 80 px al final). Las dos tienen la misma maqueta,
> `cantu-lessons/revision/L01.WEB.con-separadores.html`. Lecciones dejó tres puntos «a vuestro criterio con el
> operador».

## Las respuestas del operador — LITERALES (componente de preguntas)

| pregunta de la cabina | respuesta |
|---|---|
| Peticiones 25 + 26 (el aire de la página): la línea entre secciones y los 80 px del final, ¿forma fija o ajuste? | «Ajuste en Diseño de página» |
| «Espacio antes de un título de sección» (hoy 60 px en el espacio de Lessons) choca con los aires fijos (88/40/28/20). ¿Qué hacemos con él? | «Retirarlo (Recommended)» |
| ¿Y en Moodle? | «Lo mismo, con línea simple si no cabe (Recommended)» |

**El operador no siguió la recomendación de la cabina en la primera pregunta.** La cabina recomendaba forma fija;
él eligió que sea un ajuste.

## Lo que queda decidido

1. **La línea entre secciones y los aires de la página son un ajuste de «Diseño de página».** Los valores por defecto
   son los de las peticiones:
   - una línea encima del título de sección, de 2.5 px en el centro y 1.25 px en las orillas, en el `border` del token
     `meta` de la paleta activa;
   - 88 px antes de la línea, y 40 px en la primera sección después de la apertura;
   - 28 px de la línea al título, y 20 px del título a su contenido;
   - sin la línea fina de debajo del título;
   - **80 px** de la última pieza al borde de la hoja, en escritorio y en celular, con la reserva del botón A-/A+
     incluida dentro de esos 80.
2. **«Espacio antes de un título de sección» se retira.** Deja de aplicarse y sale de «Diseño de página».
3. **Moodle lleva lo mismo.** Si no admite la forma de la línea, lleva una línea recta del mismo color, y el run lo mide.
