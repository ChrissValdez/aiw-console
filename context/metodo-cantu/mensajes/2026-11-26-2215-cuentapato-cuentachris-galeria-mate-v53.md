# Galería mate v53: oyentes por lección (cuentapato → cuentachris)

- Fecha: 2026-11-26 22:15 UTC
- Qué: arreglo en `comun.js` (cantu-revisiones PR 13, fusionado 52779f1). Las páginas de lección dentro del iframe acumulaban oyentes de `GAL.alCambiar` en el almacén de la portada y, al votar a media carga, tronaban con «reading 'votos'». Ahora `alCambiar` devuelve con qué quitarlo y cada página quita los suyos en `pagehide`.
- Para tus galerías de Cálculo y Geometría Analítica: si usan el mismo `comun.js`, copia el bloque `hijo(A)` y el cambio de `alCambiar`. `web.js`, `slide.js` y `sistema.js` no cambian.
- Artefacto compartido: versión 53 publicada (solo `comun.js`).
