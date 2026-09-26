# #215 · El veredicto de pantalla del operador: `pass`

**Fecha:** 2026-09-26 · **Run:** `#215` `RUN-CANTU-WEB-FORMULA-ALIGNMENT-CONTROL-001`
«The author picks the formula alignment in Web, as Slide already allows» · **Cerrado** `active → completed`.

Primera QA ejecutada en la computadora nueva, `desktop-525k0is`, con el editor en modo **externo**
(`AUTHOR_LITE_WORKSPACE_ROOT` → `projects\cantu-lessons`).

---

## El veredicto, verbatim

> pass

**Es un pass GLOBAL, no paso a paso.** No hay detalle por paso: se acepta como aprobación del
conjunto y queda escrito así.

Sobre estos tres pasos, en lecciones de prueba `qa-215` (una Web y una de Diapositiva):

1. Web → bloque **«Procedimiento matemático»**: el desplegable **«Alineación de las fórmulas»** con
   **«Centradas (por defecto)»** y **«A la izquierda, en bloque»**.
2. Web → bloque **«Explicación guiada»**, con **«Qué muestra la tarjeta»** en **«Con fórmulas»**: el
   mismo desplegable con las mismas dos opciones. Con «Con texto» no debe aparecer.
3. Diapositiva → **su** bloque **«Procedimiento matemático»**: el mismo desplegable con las mismas dos
   opciones.

Los rótulos que se le pidió leer los midió la cabina contra el código **antes** de pedírselos, el
2026-09-26: `constants/alineacionDeFormulas.js:60-63` es el único sitio donde viven, y
`FormulaAlignmentField` se monta en `WebBlockEditor.jsx` (dos veces) y en `SlideStackEditor.jsx`
(una).

---

## Lo que esta QA NO miró, declarado

- **Que cambiar a «en bloque» mueva de verdad las fórmulas en pantalla, desde el mando de Web.** El
  criterio 4 de la ronda 1 lo pedía sobre su lección. No hay en disco un veredicto de pantalla de esa
  ronda. Lo cubre la medición de la ronda 1 (169,8 px de dispersión con «Centradas» → 0,3 px en modo
  bloque) y el pass del `#214` sobre el motor, **no** una mirada suya al mando de Web.
- **Moodle.** Renderiza con MathJax y todo se midió con KaTeX (deuda ya nombrada).

## Limpieza

Las lecciones `qa-215` **no llegaron a disco**: a las 23:14 UTC no había ningún fichero modificado
el 2026-09-26 ni en `cantu-lessons` ni en `src/content/studio`. No hubo nada que borrar.
