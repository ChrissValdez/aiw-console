# DECISIÓN 2026-09-17 — `#205`: el flujo de producción real es el editor sobre `cantu-lessons`

> Run: `#205` «Validate the production lesson workflow» (`RUN-JAME-PRODUCTION-LESSON-VALIDATION-001`), `planned`.
> Parada de análisis pedida por la cabina y aceptada por el operador. Escrito por la cabina el 2026-09-17.

## Lo que dijo el operador, VERBATIM

A la opción: > «vamos con tus recomendaicones»  → opción **A, replantear `#205`**.

A «cuando terminas una lección, ¿qué haces con ella y dónde acaba?»:

> «cuando termino una leccion y se compila el html generado lo importo a moodle, queda almacenada en mis drafts y todo para futura edicion de ser necesario, pero eso hago con ella»

A «¿dónde guardas tus borradores reales del editor?»:

> «\AIW_Workspace\projects\cantu-lessons
> en ese repo guardo mis lecciones y las lee cantu studio, se guardo en un repo aprate, en la misma carpeta raiz que cantu studio, porque es mas facil manejar un repo con las lecciones y otro con el editor para hilos, trabajos, etc.
> en drafts, va sus carpetas de web y slide respectivamente y de ahi leo las lecciones web y slide
> ahora mismo tengo puros bocetos apenas estoy trabajando en la primera leccion
> igual analiza e investiga toda la estructura de la carpeta primero si te quedan dudas»

## Lo que la cabina midió después, 2026-09-17 08:58–08:59 UTC (solo lectura en `cantu-lessons`)

- `cantu-lessons/drafts/web/…` y `drafts/slide/…` con sufijo `.web.draft.json` / `.slide.draft.json`.
  La lección real en curso es `drafts/web/matematicas_paa/aritmetica/l01_los_signos_v5.web.draft.json`;
  el piloto del contrato es `drafts/web/matematicas/ari_fundamentos/ari_f01_los_conjuntos_numericos.web.draft.json`.
- **Otro hilo escribe ahí AHORA**: commits `8eee959` (08:45 UTC) y `b99f778` (08:58 UTC) del 2026-09-17.
- `generated/` y `exports/` están ignorados por git; en disco solo hay salidas de `test` del 2026-08-28,
  incluida `exports/moodle/web/test/test/test_web.MOODLE.html`. **Ninguna salida de las lecciones reales.**
- El editor ve `cantu-lessons` cuando se levanta con `cantu-studio/tools/dev/start-editor.ps1` sin la
  variable puesta (documentado en `cantu-lessons/RESPUESTAS-DE-CANTU-STUDIO-2026-09-14.md` §4).

## Consecuencia

**El camino `main.js` → `dist/` sobre `src/content` NO es el flujo del operador.** El flujo real es:
draft en `cantu-lessons` → Generate en el editor (`/api/build/web`, `/api/build/slides`) →
`exports/moodle/web/*.MOODLE.html` → importado a mano en Moodle. `#205` se replantea sobre ese camino.

**Hallazgo nombrado, sin tocar:** el texto de `#206` supone que el flujo de exportación hay que
implementarlo; ya existe. Y la deuda de `dist/` que el cierre de `#204` le asignó a `#206` puede no
importar a nadie. Se revisa cuando `#206` llegue a la cola.
