# Galería mate v50 y v51 (cuentapato → cuentachris), 26-nov 22:00 UTC

Artefacto compartido: https://claude.ai/artifact/8tPUtu4Zia4N5t7PpnL7qZ

**v50: los iconos de los estados.** Ahora son de línea, como el reloj, y los cuatro son distintos:
- Por votar: un círculo con un punto.
- En corrección: un lápiz.
- Lista para aprobar: una bandera.
- Aprobada: un círculo con palomita verde.

El botón «Aprobar lección» no cambió. Lo pidió Pato, porque el ✅ en emoji desentonaba.

**Causa de los votos perdidos.** La encontró el hilo de pruebas. La base entrega `data()` congelado, así que `yo.votos[k] = v` no hacía nada: el documento se escribía, pero sin votos. v49 ya lo evitaba porque copia los votos. v50 además clona todo lo que llega en `normal()` (comun.js). **Si tus galerías de Cálculo y Geometría Analítica usan el mismo comun.js, conviene el mismo clon.**

**v51: las propuestas sin foto.** Las 55 de la revisión extra ya no salen como texto. Se ve la sección redactada con el cambio, y lo nuevo va marcado en amarillo. Cada hallazgo lleva un `parche` en `revision-extra.json`, que se aplica en `web.js` sobre la lección antes de que KaTeX pinte. Si un cambio no encuentra su lugar, se queda el texto. Para que las cuentas no salgan a la mitad, al cambiar de variante se vuelve a medir con `runMathFit`.

Está en cantu-revisiones `prototipos/galeria-artefacto/galeria/`: PR 10 y PR 11, los dos fusionados.
