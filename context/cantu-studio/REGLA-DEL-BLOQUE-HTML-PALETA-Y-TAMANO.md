# Regla de los «Bloque HTML»: la paleta activa y el tamaño de letra del lector

**Para el hilo de lecciones.** Studio la publica el 2026-10-09, al cerrar `RUN-CANTU-HTML-BLOCK-FOLLOWS-THE-PAGE-001`
(fila 20 de `PETICIONES-DE-LECCIONES.md`).

**Procedencia:** transcrita sin cambios del §R3.7 del informe del taller,
`cantu-studio/QA/temp/RUN-CANTU-HTML-BLOCK-FOLLOWS-THE-PAGE-001/99-REPORTE.md`. Todas las cifras son mediciones
del taller en Chrome, en WEB, vista previa y MOODLE.

**Lo que decidió el operador:** que las variables viejas sigan a su paleta en bordes y fondos, pero no en el texto
(opción B). Sus palabras están en `records/VEREDICTO-230-QA-RONDA-2-PASA-Y-VUELVE-A-LA-B.md` y
`records/VEREDICTO-230-QA-RONDA-3-PASS.md`.

### Regla de los «Bloque HTML»: el color de la paleta activa y el tamaño de letra del lector

Cantu Studio declara en cada lección (vista previa, WEB.html y MOODLE.html) la paleta **activa** del operador
como variables CSS, y el lector cambia el tamaño de letra con A+ y A−. Un bloque sigue a los dos si cumple
esto:

**Slide (desde el 2026-10-13, `RUN-CANTU-SLIDE-PALETTE-VARIABLES-001`, petición 27).** La salida slide (la vista
previa Slide y el SLIDE.html) declara la paleta **activa de slide** del mismo modo («Paleta de colores» con una lección
slide abierta): con los mismos nombres `--cs-palette-<id>-<rol>`, y las `--n-role-*-bd/-bg` también la siguen (punto
3). **En slide no hay A+ ni A−:** la salida slide no define `--cs-scale` ni `--cs-text-*`, así que el punto 4 no se
aplica allí, y un `var(--cs-text-*)` dentro de un bloque de slide no da ningún valor. *(Se contó en el código: no
hay ninguna definición. No se midió en Chrome.)*

1. **Color nuevo: siempre `var(--cs-palette-<id>-<rol>)`; nunca un hex.**
   - `<id>` es el id del token de la paleta: `def`, `ctx`, `ex`, `focus`, `str`, `res`, `wrn`, `err`, `meta`,
     `color` y `color_2` (y cualquier token que el operador añada, con su id).
   - `<rol>` es uno de estos:
     - `accent`: el color fuerte (bordes, iconos, rellenos);
     - `surface`: el fondo suave;
     - `border`: el borde suave;
     - `text`: el texto sobre `surface`;
     - `ink`: el texto o trazo **sobre** un relleno de `accent`.
2. **El texto sobre un relleno de `accent` va en `ink`**, nunca en blanco ni en `--n-bg-panel`. Medido: el texto
   casi blanco sobre el acento de `ex` se queda en 2,39:1, y el mínimo legible es 4,5:1.
3. **Las variables viejas `--n-role-<id>-bd/-bg/-tx`: los bordes y los fondos siguen a la paleta activa; los
   textos no.**
   - `-bd` es el `accent` del token y `-bg` es su `surface`, en los grupos que la paleta tiene: cambian con ella.
   - `-tx` **no cambia con la paleta**: conserva su color de fábrica (el verde de `res`, el rojo de `err`, el malva
     oscuro de `def`…). Por eso «Mismo signo» sigue en verde y «Signos diferentes» en rojo.
   - Un texto en `-tx` sobre un fondo `-bg` junta, así, un color de fábrica con uno de tu paleta. Con las paletas
     guardadas hoy el par más justo es `str`, a 5,58:1. Si cambias mucho la superficie de un token, comprueba el
     contraste de su `-tx`.
   - Los bloques que ya usan estas variables siguen funcionando. **Para color nuevo, usa `--cs-palette-*`**
     (punto 1); si quieres un texto que sí siga a la paleta, `--cs-palette-<id>-text`.
   - `struct` no existe en la paleta: `--n-role-struct-*` se queda de fábrica. Para lo nuevo, usa `meta`.
   - `color` y `color_2` no tienen `--n-role-*`: solo `--cs-palette-color-*` y `--cs-palette-color_2-*`.
   - Las demás `--n-*` (`--n-text-body`, `--n-text-head`, `--n-bg-panel`, `--n-border`…) son de fábrica: no
     cambian con la paleta.
4. **Tamaño de letra: nunca `px` ni `rem` sueltos.** Hay tres formas válidas:
   - **no escribirlo:** el texto hereda el de la página;
   - **un peldaño** `var(--cs-text-xs | sm | base | md | lg | xl | 2xl)`. A escala 1, y con raíz de 16 px,
     miden 14,4 · 16 · 18,4 · 20 · 24 · 29,6 · 35,2 px;
   - **un tamaño entre peldaños:** `calc(<n>rem * var(--cs-scale))`. Por ejemplo, 13 px es
     `calc(0.8125rem * var(--cs-scale))`.

   `em` y `%` también siguen, porque se miden contra la letra de su caja.
5. **Tablas: escribe `font-size: inherit` en la `<table>`.** El MOODLE.html abierto directo no lleva
   `<!DOCTYPE>`, y en ese modo una tabla sin esa línea deja de heredar la letra (16 px fijos, medido).
6. **Lo que acompaña al texto va en `em`** si tiene que crecer con él: iconos, separaciones, rellenos. Los
   bordes y los radios pueden ir en `px`.

**Ejemplo** (validado como «Bloque HTML» y medido: en WEB y en MOODLE todo crece ×1,300 con A+ ×3, y el
borde pinta el `def` activo):

```html
<style>
.ej{border:1.5px solid var(--cs-palette-def-accent);background:var(--cs-palette-def-surface);color:var(--cs-palette-def-text);border-radius:10px;padding:.6em 1em}
.ej b{display:inline-block;background:var(--cs-palette-def-accent);color:var(--cs-palette-def-ink);font-size:var(--cs-text-xs);padding:.15em .6em;border-radius:999px}
.ej table{font-size:inherit;border-collapse:collapse;margin:.4em 0}
.ej td{border-bottom:1px solid var(--cs-palette-meta-border);padding:.4em .8em}
.ej .pie{font-size:calc(0.8125rem * var(--cs-scale));color:var(--cs-palette-meta-accent)}
</style>
<div class="ej"><b>Para saber más</b>
<p>Este texto no lleva tamaño: hereda el de la página.</p>
<table><tr><td>\(\lvert -4 \rvert\)</td><td>distancia 4</td></tr></table>
<p class="pie">Un pie de 13 px a escala 1.</p></div>
```
