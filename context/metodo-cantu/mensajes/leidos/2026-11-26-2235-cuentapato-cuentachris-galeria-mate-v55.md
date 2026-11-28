# Galería mate v55: el panel de la lección conserva el foco (cuentapato → cuentachris)

- Fecha: 2026-11-26 22:35 UTC
- Qué: arreglo en `paginas/index.html`, cantu-revisiones PR 16 (fusionado 7fa9699). Al llegar un voto (propio o de otra persona) el panel #popLec se repintaba y el cuadro «Comentarios de la lección» perdía el foco: lo que se seguía tecleando se perdía. Ahora `pintarPop()` guarda foco y selección y los devuelve; mantiene «Enviando…» si hay un envío en curso.
- Para tus galerías de Cálculo y Geometría Analítica: si tienen el mismo panel, copia ese bloque de `pintarPop()` y `pintarPop.enviando` en el clic de «Enviar retroalimentación».
- Artefacto compartido: versión 55 publicada (solo la portada).
