# Decisión · 2026-10-09 · Las variables de fábrica siguen a la paleta activa, y dos decisiones del «Diseño de página»

**Hilo:** `cantu-studio`. Runs: `RUN-CANTU-HTML-BLOCK-FOLLOWS-THE-PAGE-001` (`#230`, carril A) y
`RUN-CANTU-PAGE-DESIGN-EDITOR-001` (`#234`, carril B), los dos `active`.

## Contexto

Los dos talleres terminaron su ronda 1. El del `#230` paró a propósito en una cosa, como mandaba su texto: si las
`--n-role-*` de la hoja de fábrica deben seguir a la paleta activa. Esa respuesta cambia una lección publicada
(`operar_con_signos`), así que es decisión del operador. Su informe propuso tres opciones y recomendó la A.
El `#234` llevaba dos decisiones al operador con el control delante.

## Las preguntas y sus respuestas, verbatim (componente de preguntas)

Las cuatro preguntas y sus opciones las redactó la cabina.

1. **«Decisión (a), paso 2 de la QA 1: un título dentro de «Dos columnas», ¿recibe el «Espacio antes de un título de sección»?»**
   → «No lo recibe (Recomendado)»
2. **«Decisión (b), paso 3 de la QA 1: con un título de dos renglones, ¿dónde va la insignia «Al lado del título»?»**
   → «Centrada en el título (Recomendado)»
3. **«El bloque HTML (#230): ¿las variables viejas de fábrica (--n-role-*) deben seguir también a tu paleta activa? Si las cambiamos, cambia una lección ya publicada (operar_con_signos).»**
   → **«Que sigan todo, texto incluido»**. Es la opción C del informe y **NO** la recomendada (la cabina recomendó
   la A, «Dejarlas como están»). La descripción de la opción que el operador leyó decía: «Además, todos los textos
   de color de esos bloques pasan al texto único de tu paleta. Es el cambio más grande.»
4. **«El taller del #234 dejó por error dentro de cantu-studio una carpeta caché de Vite con nombre roto (unos 4 MB, sin código). No la creé yo, así que no la borro sin tu palabra. ¿La borro?»**
   → «Sí, bórrala (Recomendado)»

## Lo que se sigue

- **(a) y (b):** quedan como el contrato los construyó. No hace falta ningún run.
- **Opción C:** abre una ronda 2 del `#230`. Responde a una pregunta que el propio texto del run planteaba, así que
  **no es una ampliación de alcance (D-061 no aplica)**.
  - Con la tabla del informe (`QA/temp/RUN-CANTU-HTML-BLOCK-FOLLOWS-THE-PAGE-001/99-REPORTE.md` §3.3):
    - `-bd` pasa al acento activo;
    - `-bg` pasa a la superficie activa;
    - `-tx` pasa al `text` único de la paleta.
  - `struct` no tiene pareja.
  - Cambia `operar_con_signos`, ya publicada, y los borradores de Lecciones que usan `--n-role-*`. Lecciones tiene
    que saberlo.
- **La carpeta:** la borra la cabina.
