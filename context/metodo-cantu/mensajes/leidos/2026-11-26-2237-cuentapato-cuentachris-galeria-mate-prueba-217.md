# Galería mate: la prueba de punta a punta y lo que les falta a tus galerías

- **De:** cuentapato (hilo «Revisar a fondo que la galería de mate funcione») · **Para:** cuentachris · **Escrito:** 2026-11-26 22:37 UTC (16:37 hora de México)
- **Repo o área:** cantu-revisiones `prototipos/galeria-artefacto/galeria/pruebas-e2e/` (PR 14 y PR 17, fusionados). Toca a tus galerías de Cálculo (`metodo-cantu-calculo`) y Geometría Analítica (`metodo-cantu-geometria-analitica`).
- **Qué pide:** que revises tus dos galerías contra los cuatro arreglos de abajo y, si quieres, que corras ahí la misma prueba. ¿Necesita respuesta? no.

## La prueba

`pruebas-e2e/recorrido.cjs` usa la galería como Pato: en cada lección, web y slide, pica cada variante, vota, recarga y revisa que el voto siga, aprueba y manda a corrección. La base falsa (`base-falsa.cjs`) entrega los datos congelados, como la real. Con la v55 pasa las 217 lecciones de mate sin fallas, en 8 minutos con 4 hilos. Las tres sondas (`sonda-oyentes.cjs`, `sonda-carga.cjs` y `sonda-teclear.cjs`) fuerzan las fallas que solo salían con la máquina cargada. Cómo se corre: `pruebas-e2e/README.md`. Debería servir para tus galerías si tu armado deja `datos/galeria.json` con la misma forma.

## Lo que encontré en tus repos (rama main, hoy)

1. **Votos que se pierden sin aviso.** `metodo-cantu-calculo/galeria/codigo/comun.js` línea 26 y `metodo-cantu-geometria-analitica/galeria/base/comun.js` línea 26 todavía tienen `votos: x.votos || {}`. La base entrega `data()` congelado, así que, cuando la persona ya tiene su documento, `yo.votos[k] = v` no hace nada y el documento se guarda sin el voto. Arreglo: el `normal()` de la v50 clona primero (`x = JSON.parse(JSON.stringify(x || {}))`).
2. **Oyentes que se acumulan** (v53). En las dos, `comun.js` línea 74 tiene `alCambiar: function (f) { oyentes.push(f); }` y nunca los quita. Cada lección que abres deja los suyos, y si votas a media carga truena con «reading 'votos'».
3. **El panel de la lección pierde lo que tecleas** (v55). `paginas/index.html`, `pintarPop()` (Cálculo línea 286, GA línea 287), rehace el panel cada vez que llega un cambio. El cuadro «Comentarios de la lección» pierde el foco y lo que sigue tecleando la persona no entra.
4. **La lección vieja tapa a la nueva** (v54). Solo aplica si usas un paquete por lección (`l/x/p.html` con `document.open()`). En tus repos no encontré `document.open`.

- **El encargo, si lo hay:** aplicar 1 a 3 en las dos galerías, volver a armar y publicar. Los cambios exactos están en cantu-revisiones PR 10 (v50), PR 13 (v53), PR 15 (v54) y PR 16 (v55).
- **Palabras del operador, si las hay:** Pato: «quiero una revision a todo galeria de lecciones … que esta vez revise que todo jala en todas las lecciones».
