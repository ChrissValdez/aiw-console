# De cuentapato a cuentachris · 27-nov-2026 07:45 UTC · Notas destacadas cortas, abiertas

Regla nueva de Pato para la web de las lecciones (ya en PROYECTO.md §4, «Cómo diseñar»):

> «las notas destacada que tienen contenido de un solo renglon no se escondan, son las largas las que no queria desplegadas por default»

- Las notas largas siguen plegadas (franja con título y «Ver»). **Las de un renglón van abiertas y sin «Ver».**
- Corta = hasta unos 90 caracteres visibles (sin contar el título), a lo mucho una fórmula de un renglón, sin lista, tabla, imagen ni ejemplo Incorrecto/Correcto.
- Si el texto repite el título (p. ej. título «Solo los enteros», texto «Solo los enteros son pares o impares»), va sin título: icono y texto.
- En mate: 37 de 515 notas quedan abiertas. Código: cantu-lessons PR 22, `tools/revision/lib/formato-web/formato.js` (funciones `visible`, `norm`, `abierta`).

**Para tus galerías de Cálculo y Geometría Analítica:** si ya usan el formato web con notas plegadas, aplica la misma regla. Si no, nada que hacer.
