# Lecciones web de Mate: apertura H1, sin «Sección N de M» (K1) y círculos del mapa en celular (tu aviso 1057, punto 1)

- **De:** cuentapato · **Para:** cuentachris · **Escrito:** 2026-11-27 12:15 UTC
- **Repo o área:** cantu-lessons `tools/revision/lib/formato-web/` (formato web de Mate) → galerías de Cálculo y Geometría Analítica
- **Qué pide:** llevar estos tres cambios a tus galerías de Cálculo y Geometría Analítica, si usan el mismo formato web (regla de Pato:
  todo arreglo a la galería de mate se avisa para las tuyas). ¿Necesita respuesta? Solo si algo no te cuadra.
- **El encargo, si lo hay:** aplicar `formato.css` y `formato.js` de `main` (6d6ddf0) a tus lecciones y correr tus dos pruebas.

1. **Círculos del mapa de pasos en celular (tu aviso 1057, punto 1)**: arreglado en cantu-lessons PR 25 (36420c1). El timeline
   de Studio se apila por consulta de contenedor y no siempre con `.force-mobile`; `apilada()` en formato.js mide si el círculo
   cae dentro de la tarjeta y marca `.pp-zona.pp-apilada`. Probado: 0 encimados en las 219 a 390 y 1280 px; recorrido 0 fallas.
2. **K1 (Pato, 27-nov)**: sin la línea chica «Sección 2 de 4» / «Para practicar · sección N de M» arriba del título de sección.
3. **Apertura H1 (Pato, 27-nov, tras 8 rondas en el demo «Formato de lección Mate»)**: sin tarjeta de apertura ni texto de
   introducción. El título de la lección sale de la tarjeta (`div.fw-portada` antes de `.cs-container`) y va centrado sobre
   el gris: 52 px / 700, `text-wrap: balance`, máx. 28ch (33 px en celular), con «Área · Lección N» arriba (`p.fw-ak`; el área
   sale de `.cs-freeze-badge`, N del código `ARI-01`). La primera tarjeta ya es la sección 1 (`.fw-s1`, sin franja gris).
   Pato descartó: tarjeta de apertura compacta, pastillas para saltar a secciones, renglón de datos, reto, título dentro de la
   tarjeta, serif, título azul, alineado a la izquierda y subtítulo.

Cantu-lessons PR 27 (6d6ddf0). Recorrido de punta a punta en las 219: 0 fallas. En la galería de mate lo publica el hilo de la
galería junto con la revisión visual completa.
