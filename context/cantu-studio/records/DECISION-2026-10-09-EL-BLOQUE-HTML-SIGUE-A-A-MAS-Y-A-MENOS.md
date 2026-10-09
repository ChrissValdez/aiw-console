# Decisión · 2026-10-09 · El «Bloque HTML» sigue a los botones A+ y A-

**Hilo:** `cantu-studio`.

## Su petición y su decisión, verbatim

> otra cosa importante tengo un boton de aumentar y reducir tamaño
>
> que los bloques de html sean compatibles con esto

Medido por la cabina en `src/builders/web/partials/renderLayout.js`: A+ y A- cambian una sola variable, `--cs-scale`,
y los tamaños de los componentes se calculan con ella. Un «Bloque HTML» con tamaños fijos no se entera. Propuesta de la
cabina: un run pequeño justo después de `RUN-CANTU-PALETTE-AS-CSS-VARIABLES-001`. Respuesta:

> si

Es acuerdo sobre una opción redactada por la cabina (trampa H).

## Lo que se escribe

Un run nuevo en el carril de lo publicado. El «Bloque HTML» hereda el tamaño de letra de la página, hay una regla
escrita para Lecciones sobre qué tamaños usar para que todo escale, y una prueba que mide que con A+ crece igual dentro
que fuera. Prueba de terminado: el «Para saber más» provisional de L01 crece con A+.

**Se escribe cuando termine el taller del `#228`**, que estaba en curso al decidirlo. En la misma respuesta preguntó
cómo ir más rápido. La cabina propone fusionar este run con el de la paleta, y otras dos cosas, en su respuesta.
