# VEREDICTO `#205` — la QA de Moodle, ejecutada: qué se rompe y por qué

> Run: `#205` «Validate the production lesson workflow», `active`. Operador: importó
> `A1-l01_los_signos.MOODLE.html` en su Moodle (metodocantu.com, página de curso) y pegó la
> página servida. Medido por la cabina el 2026-09-17, 23:28–23:31 UTC.

## Lo que dijo el operador, VERBATIM

> «A2-ari_f01_los_conjuntos_numericos.MOODLE.html es un mal ejemplo es una leccion estatica con
> casi ningun compoennte
> A1-l01_los_signos.MOODLE.html si es un buen ejemplo pero paso algo raro
>
> los html insertado s(el componente insertado por html) falla
> ademas... algunas formulas del ejemplo guiado:
> You can't use 'macro parameter character #' in math mode»

Aportó además dos capturas y el HTML completo de la página servida por su Moodle.

## ⚠ CORRECCIÓN DE LA CABINA, publicada tan fuerte como el error

En el turno anterior la cabina dijo que la causa del fallo de las fórmulas era la macro
`\def\hl#1{#1}` que `src/builders/web/partials/renderTimeline.js:8` antepone a cada fórmula del
componente de pasos. **ES FALSO, y la propia pantalla del operador lo desmiente:** las cinco
fórmulas del bloque llevan esa macro y **solo fallan tres**.

**La correlación es perfecta con OTRA cosa:** las tres que fallan son exactamente las tres que
llevan `\textcolor{#D08770}{…}`. Las dos que no llevan color —el planteamiento y el resultado—
se componen bien, y también las dos del cierre de la lección.

**La causa medida: el `#` del color hexadecimal.** MathJax lo lee como carácter de parámetro de
macro y para. KaTeX, que es lo que usa la salida Web, lo acepta. De ahí que la lección se vea
perfecta fuera de Moodle.

Es el mismo patrón que ya mordió con `\color` frente a `\textcolor`: **el editor obliga a una
forma que el destino no admite.** La macro `\def\hl#1{#1}` sigue siendo código muerto —`\hl` no
se usa en ningún sitio, medido— pero es deuda, no la causa.

## Los bloques insertados por HTML: causa medida, y es un agujero del pipeline de Moodle

`A1-...MOODLE.html`: **92 usos de `var(--n-…)` y CERO definiciones.**
`B1-...WEB.html`: **98 usos y las definiciones presentes** (`--n-bg-panel`, `--font-body`,
`--shadow-soft`), porque la salida Web sí embarca `src/design/tokens/1_tokens.css`.

O sea: **la salida de Moodle no lleva la hoja de tokens `--n-*`**. Todo lo que dependa de ella
—los tres bloques de HTML declarado de esta lección: la recta numérica, la recta con flechas y la
tabla de signos— pierde fondo, borde, sombra, tipografía y color. Los rellenos de SVG con una
variable indefinida caen a negro, que es exactamente lo que se ve en sus capturas.

**Moodle no borró nada:** en la página servida sobreviven el `<link>` de la hoja en base64, los
ocho `<style>`, los `<script>`, los SVG y los tres `data-html-block`. El fallo no es censura de
Moodle: es que el artefacto de Moodle nace incompleto.

## Dos hallazgos más, que nadie había pedido

1. **El script de accesibilidad que vive en el TEMA de su Moodle quedó muerto con `#204`.**
   La página trae, fuera de la lección, un script propio del sitio que busca `.j-lesson-wrapper`,
   `--j-scale`, `.j-a11y-down/up/reset`. El renombrado de `#204` pasó todo eso a `cs-`, así que
   ese respaldo ya no engancha con nada. Vive en el Moodle del operador, fuera del montaje.
2. **Moodle escapó las flechas `=>` de los scripts en línea de la lección.** En los artefactos
   medidos hay cinco `=>` crudos y ningún `=&gt;`; en la página servida aparecen escapados dentro
   de `<script>`, lo que rompe el script como JavaScript. Afecta al botón `A- A+` y al ajuste de
   fórmulas anchas.

## Qué queda para runs

Cuatro cosas, y ninguna se toca en `#205`: el color de las fórmulas en Moodle; la hoja de tokens
que falta en la salida de Moodle; el respaldo `j-` del tema del operador; y el escapado de `=>`.
