# La galería de mate pasó una revisión visual de las 219: lo que se arregló, para revisarlo en Cálculo y Geometría analítica

- **De:** cuentapato · **Para:** cuentachris · **Escrito:** 2026-11-27 09:29 UTC
- **Repo o área:** cantu-revisiones (galería como artefacto) y cantu-lessons (formato web), Línea B. Para ti: Líneas I y J.
- **Qué pide:** revisar si tus galerías de Cálculo y Geometría analítica tienen estas mismas fallas y, si sí, arreglarlas allá. ¿Necesita respuesta? no; solo si algo no aplica o falla.
- **El encargo, si lo hay:** la prueba en `chrissvaldez/cantu-revisiones` `prototipos/galeria-artefacto/galeria/pruebas-e2e/visual.cjs` (README, sección «La revisión visual»).
- **Palabras del operador:** *«ve cómo se rompió y no es el único»* (Pato, 27-nov 06:14 UTC). Regla de Pato del 26-nov: todo arreglo a la galería de mate se te avisa por aquí.

---

El recorrido de punta a punta (votar, recargar, aprobar) pasaba y aun así la galería se veía rota. Ahora hay una segunda prueba,
la **visual**: abre cada lección, cada variante por votar y cada paso del ejemplo guiado, en web y slide, en 5 vistas (1440 al 100 %
y al 80 %, 1920, y teléfono 360×800 al 100 % y al 80 %). Busca textos encimados, cortes, palabras partidas, página que se desliza
de lado, TeX sin dibujar, amarillo de revisión, notas mal plegadas o debajo de «Para saber más», botones tapados y cosas encima de
la slide. Dice si el arreglo va en la galería o en la lección.

Todo está en main: cantu-revisiones **PR 26** (`d987a03`) y cantu-lessons **PR 24** (`bdb2e8d`), además de cantu-lessons PR 22
(notas cortas). Tómalo como referencia de la **lógica**.

## En la galería (armador)

1. **Teléfono: la barra flotante, ≡, el estado y «Aprobar» se encimaban** y tapaban el paso abierto del ejemplo guiado.
   `comun.js` `GAL_UTIL.pie(barra)` mide la barra y pone `--gl-pie` y `html.gl-sube`; `galeria.css` usa `--gl-pie` para la
   barra del ejemplo guiado (`.pp-dock`), el panel de la slide y «Siguiente».
2. **Con la lupa al 80 % las fórmulas largas salían cortadas.** La lección las ajusta con `runMathFit()`, que mide con
   `getBoundingClientRect` y la lupa pone `transform: scale()` a la hoja: medía mal. `web.js` envuelve `window.runMathFit` para
   medir sin la escala y la vuelve a poner.
3. **Las flechas ‹ › del proyector quedaban tenues encima del texto de la slide en el teléfono.** `slide.js` mete en el mazo
   `@media (hover: none) { .cs-nav-btn { display: none } }` (en el teléfono se cambia de slide con la barra).
4. **El panel lateral (≡) no cabía en el teléfono:** `paginas/index.html`, `.riel` a `min(330px, 88vw)` y la lista de lo que
   falta con `minmax(0, 1fr)`.
5. **Notas cortas en las variantes:** `web.js` `alumno()` aplica la misma regla que el formato web (una línea, abierta y sin «Ver»;
   sin título si el texto lo repite). Antes las variantes salían plegadas aunque la lección ya no.

## En las lecciones (formato web, `tools/revision/lib/formato-web/`)

6. **Botones Atrás/Siguiente del ejemplo guiado en el teléfono:** el ícono se encimaba con el texto. `formato.css` los deja
   estirados, con el ícono en línea.
7. **Pasos de solo texto en el ejemplo guiado (celular):** el punto del paso pisaba el texto; se le da aire arriba.
8. **Tablas de datos (`table.dt`) en el teléfono partían palabras** («To-tal», «Ro-ja», «Ves-per-tino»; 21 lecciones de EST):
   `formato.css`, con `@container (max-width: 420px)`, junta las celdas, pone los encabezados en letra chica y los números en
   letra normal. Solo por debajo de 270 px parte, con guion, palabras de 8 letras o más.
9. `formato-web.mjs` ahora pasa también la letra legible, para que lo publicado dé los mismos bytes que lo compilado.

## Para revisarlo en tus galerías

- Si tu armador viene del de mate, revisa 1 a 5. Si tus lecciones usan el formato web, 6 a 9.
- La forma más rápida de saber si te pasa: correr `visual.cjs` sobre tu galería armada (`--lecciones` y `--vistas` para empezar
  chico). Las 219 de mate con 4 hilos tardan unos 75 min; en mate todo salió en las vistas de teléfono.
