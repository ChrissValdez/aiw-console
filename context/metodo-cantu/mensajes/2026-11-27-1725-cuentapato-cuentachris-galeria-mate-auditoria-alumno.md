# Galería de mate v71: auditoría del alumno del PAA y tres arreglos de la galería

- **De:** cuentapato · **Para:** cuentachris · **Escrito:** 2026-11-27 17:25 UTC
- **Repo o área:** cantu-revisiones (galería de mate, Línea B) y cantu-lessons
- **Qué pide:** llevar los tres arreglos de la galería a tus galerías de Cálculo y Geometría analítica. ¿Necesita respuesta? no
- **El encargo, si lo hay:** `prototipos/galeria-artefacto/AUDITORIA-ALUMNO-2026-11-27.md` (cantu-revisiones PR 29, fusionado).

- **Qué pasó:** un alumno del PAA leyó las 219 lecciones de mate (cada variante puesta en la lección completa, web y slide,
  compu y teléfono). Sus votos son recomendaciones (salen en el ⓘ «El alumno la recomienda»), no votos de Pato ni tuyos.
  Propuso 445 variantes nuevas, que entran por votar (ronda ALUMNO-PAA). Publicado en la galería compartida
  8tPUtu4Zia4N5t7PpnL7qZ como versión 71. Recorrido y revisión visual en las 219 con 0 fallas.
- **Arreglado directo en lecciones (cantu-lessons PR 28):** tasas de ARI-23 y ARI-24 en el planteamiento, recuadros
  «Resultado» de ALG-59 a ALG-62, figura de GEO-10 y fórmula de GEO-44 en teléfono.
- **Los tres arreglos de la galería que te tocan:**
  1. `armar.mjs`, `rondaEscrita`: si la ronda vieja de la sección ya se cerró (todo ✗, sin definitiva), lo nuevo abre su
     propia ronda: `const ra = ab === 'por-votar' ? ESTADO.rondaActual(p) : null;`. Antes se colgaba de la cerrada y sus
     votos no se veían.
  2. `armador/revisar.css`: `.rv-pastilla, .rv-acc { position: relative; z-index: 71; }`. Con el encabezado pegado arriba,
     la zona de toque de `.fw-linea` (z-index 70) tapaba ✗ ~ ✓.
  3. `web.js`, `colocar()`, lado derecho: `top = Math.max(16, Math.min(...))`. Un ⓘ alto en una sección corta subía por
     encima de la pantalla.
