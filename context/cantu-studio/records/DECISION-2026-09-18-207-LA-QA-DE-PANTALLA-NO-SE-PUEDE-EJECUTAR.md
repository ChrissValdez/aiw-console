# DECISIÓN 2026-09-18 — `#207`: la QA de pantalla NO se puede ejecutar, y por qué

> Run: `#207` «Stop compile from overwriting a different lesson»
> (`RUN-CANTU-COMPILE-NEVER-OVERWRITES-ANOTHER-LESSON-001`). Commit del trabajo: `2c030b68`.
> Escrito por la cabina el 2026-09-18.

## Lo que dijo el operador, VERBATIM

Al intentar el paso 3 de la QA —cambiar el título de una lección abierta—:

> «En el campo «Título de la lección» no cneunctro eso?»

y después, con dos capturas de su editor:

> «si existe la leccion y si tutulo pero no hay ningun boton para editarlo»
> «no es editable»

## Lo que la cabina midió, 2026-09-18 10:23-10:26 UTC

**El campo del título existe en el código y NO LO MONTA NADIE.** `LessonContextBar.jsx` dibuja la
fila «PROYECTO / TEMA / LECCIÓN / SUBTÍTULO» con el `input` de `lesson.title`, y la única
aparición de ese componente en todo `tools/studio/editor-ui/src` es **su propia definición y su
`export default`**. Es código muerto.

En la pantalla del operador el título viaja como texto de la barra superior
—`Matematicas_PAA / Aritmética / L01 · Los signos v5`— y ahí solo se lee.

**La única vía de renombrado que la interfaz ofrece** es `Explorar` → el lápiz «Renombrar draft»
(`LessonExplorerModal.jsx:392`), que abre un `window.prompt` y **ya tiene su propia comprobación**:
si el nombre destino existe, se planta con «Ya existe un draft con el nombre "…" en este tema»
(`EditorPage.jsx:995`).

**Consecuencia medida: hoy el choque de `#207` NO se puede provocar desde la interfaz.** No es que
el operador no encontrara el botón: no hay ninguno.

## La decisión

> «vamos con tu recomendacion» — opción 1 de las tres que la cabina dibujó.

1. **`#207` se cierra declarando que la QA de pantalla no se ejecutó**, con la superficie exacta
   que queda sin mirar: el aviso del navegador y la píldora en rojo.
2. **Se abre un run** que ponga el campo del título en la interfaz —o decida qué superficie lo
   sustituye— y que tape el agujero que el propio taller dejó anotado: **una lección recién creada
   no tiene ruta de origen, compila sin origen y la guarda no dispara**.

## Un error de la cabina, declarado

La cabina le mandó dos veces a un campo que no existe en su pantalla, y en el primer intento
además le dio mal el rótulo de la primera columna: dijo «CURSO» y en pantalla es «PROYECTO».
Los nombres salían del código, no de una medición de lo que está montado. **La regla que sale:
antes de nombrarle un control, comprobar que ese componente lo monta alguien.**
