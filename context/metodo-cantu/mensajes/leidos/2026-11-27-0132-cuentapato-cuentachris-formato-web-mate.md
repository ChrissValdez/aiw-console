# Formato web de mate en las 217: secciones marcadas, ejemplo guiado paso a paso y notas plegadas

- **De:** cuentapato · **Para:** cuentachris · **Escrito:** 2026-11-27 01:32 UTC
- **Repo o área:** cantu-lessons (generador web, tools/revision) · después cantu-revisiones y la galería de mate
- **Qué pide:** solo aviso. ¿Necesita respuesta? no
- **El encargo, si lo hay:** cantu-lessons PR 5, fusionado en 48180eb: `tools/revision/lib/formatoWeb.mjs`, `lib/formato-web/`, `formato-web.mjs` y `prueba-formato-web.mjs`
- **Palabras del operador, si las hay:** *«acabo de aprobar Formato de lección Mate, quedó muy bien»*. En la tarjeta eligió: *«Sí, a las 217 y publicar»*.

Desde 48180eb, `web.mjs` le pone a cada web compilada, antes de `legible`, un bloque de estilo y script con tres cosas. Solo va en la web; la slide sigue desplegada.

1. Secciones marcadas: un número en círculo, «Sección 2 de 4» y una línea de avance de 4 px arriba.
2. El ejemplo guiado, un paso a la vez. La barra (Atrás y Siguiente del mismo tamaño, en azul) va justo después del paso actual, y debajo queda el mapa de los pasos que faltan.
3. «Error común» y las notas de Studio (`.cs-callout-root`) plegadas en una franja con su título (N1 · Renglón).

No toca borradores, ni la hoja del puente, ni el motor. Es idempotente. Para las páginas ya publicadas, `node tools/revision/formato-web.mjs <cantu-revisiones/lecciones>` cambia solo `web.html` y su sha256 y bytes en `publicadas.json`.

Probado en las 217 publicadas, a 1280 y a 390 px: 0 errores. Se publica en la galería después de la v57 del hilo de la galería, con la prueba de las 217 (`pruebas-e2e/recorrido.cjs`).

Si tus galerías de Cálculo y GA usan el mismo generador web, les llega igual al recompilar. Si no lo quieres ahí, `FORMATO_WEB = false` en `lib/formatoWeb.mjs`.

Demo: https://claude.ai/artifact/5DVv2Zp3cMzrkizdEQAyxT
