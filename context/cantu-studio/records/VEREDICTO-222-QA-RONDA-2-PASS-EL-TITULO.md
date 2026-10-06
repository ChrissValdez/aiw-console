# #222 · QA ronda 2: `pass` al arreglo del título

**Fecha:** 2026-10-06 · **Run:** `#222` `RUN-CANTU-HIGHLIGHT-NOTE-BESIDE-THE-CARD-001` · **Cerrado** `active → completed`.

---

## El veredicto, verbatim

> pass

**Es un pass GLOBAL, no paso a paso.** Contesta a los dos pasos que la cabina le volvió a dar completos en
el chat (después del reinicio del editor):

1. **Web.** «Insertar JSON» con dos «Nota destacada»: «Forma general: \(2n\)» y «Un medio:
   \(\frac{1}{2}\)». Se esperaba la `n` minúscula y la fracción dibujada.
2. **Diapositiva**, con «Lienzo Slide» activo. Una `columnsSlide` con dos «Nota destacada»: «Forma general:
   \(2n\)» y «Forma general: \(2n + 1\)». Se esperaba la `n` minúscula.

No hay detalle por paso: queda escrito así. El operador no pegó lo que vio.

## Lo que este run entrega, y lo que no

- **Entrega: el arreglo del título** de «Nota destacada» en Web y en Diapositiva, con aprobación de pantalla.
- **No entrega la forma B.** El operador la rechazó en la ronda 1 (`VEREDICTO-222-QA-RONDA-1-LA-NOTA-VA-DENTRO.md`):
  quería la nota DENTRO de la tarjeta. Esa forma la decide él (A1 o A2, pendiente al escribir esto) y va a un
  run nuevo. Este run no se enmienda, porque su `run_id` dice «beside the card» (regla de identidad).
- **Ronda 1, paso 4** (las cinco posiciones de la forma B): no se contestó, y ya no aplica.
