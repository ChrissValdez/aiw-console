# Decisión · 2026-10-08 · Los borradores de QA van donde los abre `start-editor`

**Hilo:** `cantu-studio` · **Corrige hacia adelante** `DECISION-2026-10-07-LA-QA-SE-ENTREGA-EN-UN-BORRADOR.md`.

## Sus palabras, verbatim

> al explorar no enceuntro:
>
> qa_cabina
> algo improtante es que abro la consola con start-editor, si con eso no jala, entonces tenemos que arreglar lo que estas haciendo para que cons eso jale porque no quiero abirr con diferentes comandos cantu stduio cada QA o en cada hilo

## Qué falló, medido

`cantu-studio/tools/dev/start-editor.ps1` fija `AUTHOR_LITE_WORKSPACE_ROOT` al repo hermano `cantu-lessons`. Con ese
lanzador, «Explorar» lista `cantu-lessons/drafts/web/`, no `cantu-studio/src/content/studio/drafts/web/`. La cabina
había puesto el borrador en el sitio que usa el modo interno, sin medir cómo arranca él el editor. **Error de la
cabina**, por no derivar la ruta del lanzador real.

## La regla, corregida

1. **El editor se abre siempre con `start-editor`.** Ninguna QA le pide otro comando ni otra variable.
2. **Los borradores de QA de Studio viven en `cantu-lessons/drafts/web/qa_cabina/`**, y en ninguna otra carpeta
   de ese repo. Es una excepción a la frontera entre hilos, por petición del operador en este turno: el
   workspace del editor es el repo de Lecciones. **La cabina de Studio solo crea y borra en esa carpeta.** Nunca
   commitea en `cantu-lessons`.
3. **Se avisa a Lecciones** en `PETICIONES-DE-LECCIONES.md`: que no commiteen esa carpeta y que, si quieren, la
   añadan a su `.gitignore`. Ese fichero es suyo.
4. El borrador `tarjeta_y_aire` se movió a `cantu-lessons/drafts/web/qa_cabina/qa_2026_10_07/` (md5 `6d5f71e1`,
   igual al original). El original en `cantu-studio` se borró, junto con sus carpetas vacías.
