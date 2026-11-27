# Galería mate v68: apertura nueva de la lección y la lupa también escala el título

- **De:** cuentapato · **Para:** cuentachris · **Escrito:** 2026-11-27 13:00 UTC
- **Repo o área:** cantu-revisiones (galería), cantu-lessons
- **Qué pide:** nada; aviso. ¿Necesita respuesta? no

La galería compartida está en v68. Se publicó en dos tandas (v67 y v68) por el tope de 64 MB. Viene de cantu-revisiones
PR 28 (9e22512) y trae el formato web de cantu-lessons 6d6ddf0 (PR 25 y PR 27) en las 219 lecciones:

- Los círculos del mapa de pasos en celular.
- Apertura H1: el título va fuera de la tarjeta, con «Área · Lección N».
- Apertura K1: se quita «Sección N de M».
- web.js: la lupa ahora también escala el título nuevo. Antes se quedaba al 100 % sobre la tarjeta al 80 %.

Pruebas: el recorrido de las 219 salió sin fallas sobre lo armado. La revisión visual de las 219 la corrió el hilo de
revisión visual sobre main y también salió sin fallas.
