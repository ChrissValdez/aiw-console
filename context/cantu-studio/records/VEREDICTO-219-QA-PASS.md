# #219 · El veredicto de pantalla del operador: `pass`

**Fecha:** 2026-10-01 · **Run:** `#219` `RUN-CANTU-SAFESVG-DASHED-LINES-001`
«The SVG gate admits dashed lines, and nothing else» · **Cerrado** `active → completed`.

QA ejecutada en la **laptop** (`laptop-pf6souas`), no en la computadora de escritorio.

---

## El veredicto, verbatim

> pass

**Es un pass GLOBAL, no paso a paso.** No hay detalle por paso: se acepta como aprobación del
conjunto y queda escrito así. El operador no pegó lo que vio, aunque la cabina se lo pidió con
formato literal: no hay texto del modal del paso 3 ni de la consola del paso 0.

Sobre estos cuatro pasos, entregados completos en el chat el 2026-10-01 hacia las 03:45 UTC,
en un borrador nuevo `QA-219 línea discontinua`:

0. Reiniciar `npm --prefix tools/studio run dev`.
1. «Lienzo Web» → «Insertar JSON» → un bloque `visual` con un `<line>` de
   `stroke-dasharray="12,8"` → «Validar e insertar» → «Vista previa Web»: una línea azul a trazos.
2. «Lienzo Slide» → «Insertar JSON» → una `columnsSlide` con el mismo `visual` → «Vista previa
   Slide», diapositiva del gráfico: la misma línea a trazos. **Era el paso que el taller no pudo
   ver** (su captura se quedaba en la portada).
3. «Lienzo Web» → «Insertar JSON» → el mismo bloque con `stroke-dasharray="var(--x)"`: no se
   inserta, y el modal da el texto fijo «El SVG debe ser un unico <svg> seguro…».

El JSON exacto de los tres bloques está en `cantu-studio`:
`QA/temp/RUN-CANTU-SAFESVG-DASHED-LINES-001/QA-OPERADOR.md`.

---

## Lo que esta QA NO miró, declarado

- **Detalle por paso.** El pass global cubre los cuatro pasos sin decir qué vio en cada uno.
- **Otros navegadores.** La decisión de dejar fuera negativos, comas sueltas, unidades y porcentajes
  se midió solo en Chrome 153 (`2b-navegador.salida.txt`).
- **Las lecciones reales.** La figura del valor absoluto de L1 sigue con su `style` en el `<svg>`;
  moverla a un `visual` es trabajo del run de migración.

## Hallazgos del taller, nombrados y sin run

- **H-1 rojo, anterior a este run** (`webHierarchyAuditRepairsRound2`). La cabina midió el
  2026-10-01 que la marca `LESSON METADATA` falta en el gemelo del editor desde, al menos, los
  commits del `#217` y del `#218`: **no la trajo el `#218`**. Hipótesis sin medir: la prueba corta
  con `\n` y esta laptop tiene el árbol en CRLF.
- **H-A:** los motores no se defienden solos (Slide emite cualquier SVG; la lista negra de Web deja
  pasar `var()` y `calc()`).
- **H-B:** el mensaje del rechazo no nombra el atributo culpable. La cabina propuso añadirlo al
  `#227`; el operador no ha contestado.
- **H-C:** referencias de línea caducadas a `compiler.js:385`.

## Limpieza

El borrador `QA-219 línea discontinua` **no llegó a disco**: a las 20:16 UTC del 2026-10-01 no
había ningún fichero modificado después de las 03:44 UTC ni en `cantu-lessons` (salvo
`docs/referencias/ARITMETICA-CONTRA-LAS-FUENTES.md`, del hilo `cantu-lessons`, que no es de esta
QA) ni en `src/content/studio`. No hubo nada que borrar.
