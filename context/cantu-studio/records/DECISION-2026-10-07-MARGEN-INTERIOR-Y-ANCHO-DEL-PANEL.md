# Decisión · 2026-10-07 · Dos runs nuevos: el margen interior de la lección y el ancho del panel de la vista previa

**Hilo:** `cantu-studio` · **Con el** `#223` `RUN-CANTU-PREVIEW-IS-THE-PUBLISHED-PAGE-001` **en su ronda 2.**

## La decisión, verbatim

> vamos con tus recomendaciones

**Aceptación de las dos recomendaciones de la cabina, redactadas por ella** (trampa H). Nacen de su QA de la
ronda 1 del `#223` (`VEREDICTO-223-QA-RONDA-1-EXPANDIR-CON-DOBLE-FONDO.md`) y del informe de ese taller.

1. **Más margen interior en la lección publicada.** Sus palabras en la QA: «los margenes no lo suficientemente
   grandes (margenes internos del fondo blanco=)». Hoy son 60 px (`WEB_PAGE_SHELL_CSS`,
   `src/builders/web/buildSingleWebLesson.js:36`). Un run propio, junto a `RUN-CANTU-SECTION-TITLE-BREATHING-ROOM-001`.
   Cambia todas las lecciones publicadas a propósito, y la cifra la elige él en pantalla, sobre L01.
2. **El panel de la vista previa abre en su ancho mínimo.** Lo encontró el taller del `#223`: `Number(null)` da 0
   y el límite lo sube al mínimo (`usePreviewPanelSize.js`). Con el panel por defecto, el iframe mide 872 px y el
   texto 672 px. Un run pequeño justo después del `#223`. Mide también si el ancho máximo llega a mostrar la
   lección como la ve el alumno.

**Se escriben en la cola al cerrar el `#223`**, junto con lo de «Para saber más»
(`DECISION-2026-10-07-PARA-SABER-MAS-ENTRA-EN-EL-CONTRATO-COMUN.md`).

## Lo que preguntó después, verbatim

> ahora que tnatos runs nos faltan para estar al dia con el trabajo de CS
> que siento que no estoy al dia con el trabajo en este hilo y eso afecta CL
