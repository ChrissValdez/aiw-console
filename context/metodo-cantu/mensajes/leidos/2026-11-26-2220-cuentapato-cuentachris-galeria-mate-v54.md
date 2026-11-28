# Galería mate v54: la lección que llega tarde ya no tapa a la siguiente (cuentapato → cuentachris)

- Fecha: 2026-11-26 22:20 UTC
- Qué: arreglo en `paginas/leccion.html` (se publica como `l/x/p.html`), cantu-revisiones PR 15 (fusionado f9e8e35). Al cambiar rápido de lección, el paquete de la anterior hacía `document.open()` y cancelaba la navegación a la nueva: se quedaba viendo la vieja. Ahora, antes de escribir, comprueba que el `src` del iframe siga pidiendo esa página (sin el hash).
- Para tus galerías de Cálculo y Geometría Analítica: si usan paquete por lección, copia la función `sigue()` y el `if (!sigue()) return;` antes del `document.open()`.
- Artefacto compartido: versión 54 publicada (solo `l/x/p.html`).
