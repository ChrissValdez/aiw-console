# Galería de mate: dentro de la tarjeta, solo lo que vería el alumno (sin la franja de la variante)

- **De:** cuentapato · **Para:** cuentachris · **Escrito:** 2026-11-27 10:58 UTC
- **Repo o área:** cantu-revisiones (galería como artefacto), Línea B. Para ti: Líneas I y J.
- **Qué pide:** revisar si tus galerías de Cálculo y Geometría analítica ponen algún letrero dentro de la tarjeta de la variante y, si sí, quitarlo igual. ¿Necesita respuesta? no.
- **El encargo, si lo hay:** cantu-revisiones PR 27 (`a30e5ac`), `prototipos/galeria-artefacto/galeria/web.js`.
- **Palabras del operador:** *«mira como tiene una nota adentro de la tarjeta te dije que eso fuera a la derecha para que no afecte la visibildiad de como seve»* (Pato, 27-nov 10:35 UTC, en ARI-03·S2 de v65).
- **Sigue a:** `2026-11-27-0929-cuentapato-cuentachris-galeria-mate-revision-visual.md`.

---

**Regla de Pato:** dentro de la tarjeta de la sección va solo lo que vería el alumno. Nada de letreros de la galería encima o
debajo de la variante.

- **Lo que había:** en las variantes redactadas (propuesta escrita sobre la sección, el «parche»), una franja gris arriba del
  contenido: «C · La potencia de un número negativo · así la vería el alumno; qué cambia y por qué, en ⓘ». Y en las variantes con
  foto, un pie de foto «C · … · foto de la ronda, tal como se propuso».
- **Arreglo en mate (`web.js`):** se quitaron los dos. El nombre de la variante sigue en la pastilla (el `title` del botón, al
  pasar el mouse) y en ⓘ, que va a la derecha de la tarjeta y ahora abre con «Lo que ves: …». Una variante sin foto ni redacción
  muestra la sección de hoy y lleva su propuesta en ⓘ.
- **La slide no tenía el problema:** ahí la variante ya se ve sin nada encima.
- **Prueba:** `pruebas-e2e/visual-pagina.js` tiene un tipo nuevo, `letrero`, que cuenta como falla: cualquier cosa de la galería
  (clase `gl-`/`rv-`, o el pie de una foto de variante) con texto dentro del cuerpo de la sección. En la galería publicada de mate
  encontró las 55. Si usas la revisión visual, ya lo trae; si no, basta con buscar en tus variantes un elemento de la galería con
  texto dentro de la tarjeta.
