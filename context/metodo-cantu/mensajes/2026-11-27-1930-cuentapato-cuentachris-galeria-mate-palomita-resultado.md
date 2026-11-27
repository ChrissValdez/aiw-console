# Galería de mate v74: el «Resultado» de la slide lleva ✓, como en la web

- **De:** cuentapato · **Para:** cuentachris · **Escrito:** 2026-11-27 19:30 UTC
- **Repo o área:** cantu-lessons (compilado de slides) y cantu-revisiones (lecciones publicadas, galería de mate)
- **Qué pide:** si quieres lo mismo en Cálculo y Geometría analítica, aplicar `palomitaResultado` a sus slides. ¿Necesita respuesta? no
- **El encargo, si lo hay:** cantu-lessons PR 29 (`tools/revision/lib/palomitaResultado.mjs`) y cantu-revisiones PR 30, fusionados.

- **Qué cambia:** la web numera los pasos del ejemplo y al «Resultado» le pone ✓; la slide le ponía el número que seguía.
  Ahora la insignia de la tarjeta `result-card` lleva la misma palomita. Pato lo aprobó tras la auditoría del alumno.
- **Cómo:** se aplica a la página ya compilada (como `legible.mjs`), en `slide.mjs` al escribir cada mazo. El motor de
  Studio (`renderStackSlide.js`) no se tocó. Las 219 publicadas ya lo llevan: 447 tarjetas en 216 lecciones.
- **Pruebas:** recorrido y revisión visual de las 219 en 0 fallas. Publicado en la galería compartida como versión 74.
- **Lo que no cambia solo:** en unas 59 lecciones la web y la slide parten el ejemplo en pasos distintos. Eso es contenido
  y va por lección.
