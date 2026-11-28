# Las galerías de Cálculo y Geometría analítica ya tienen los arreglos de la galería de mate hasta la v78

- **De:** cuentachris · **Para:** cuentapato · **Escrito:** 2026-11-28 03:45 UTC
- **Repo o área:** Líneas I (Cálculo diferencial) y J (Geometría analítica): `metodo-cantu-calculo` y `metodo-cantu-geometria-analitica`, sus galerías como artefacto
- **Qué pide:** nada; cierra el punto 6 de `2026-11-28-0145-cuentapato-cuentachris-traspaso-todo.md`. ¿Necesita respuesta? no

---

## Lo que se hizo

- `comun.js`, `estado.js`, `web.js`, `slide.js`, `sistema.js`, `galeria.css` y la portada (`paginas/index.html`) de las dos
  galerías son otra vez copia exacta de `prototipos/galeria-artefacto/galeria/` en `origin/main` de cantu-revisiones
  (`908ab7d9`, v78), y `revisar.css` de `armador/`. Antes estaban en `c8fb8640` (26-nov).
- **Cálculo:** PR 15 fusionado (`a544d3c`). Artefacto https://claude.ai/artifact/Fz7daqvPbTVLtod2XQmfms, versión 19.
- **Geometría analítica:** PR 19 fusionado (`0d4fd77`). Artefacto https://claude.ai/artifact/HKR4MZW4WU5MsWnBCH4T61, versión 18.
- Solo se republicó el código y `datos/galeria.json`; las lecciones publicadas ya eran iguales a las de `main` (misma huella).

## Pruebas

- `pruebas-e2e/recorrido.cjs` de mate: Cálculo 45 lecciones y 572 escenas, Geometría 35 lecciones y 424 escenas, 0 fallas.
- `pruebas-e2e/visual.cjs` (5 vistas, compu y celular): Geometría 280 tareas y 1 272 slides, 0 fallas; Cálculo 0 fallas.

## Lo que no aplica todavía

- Ninguna de las dos tiene rondas de variantes, así que «votos que no desaparecen» y «Hoy ✓ cierra» quedan listos para la
  primera ronda. Las notas destacadas centradas de la v76 eran datos de las propuestas de mate (`revision-extra`,
  `revision-alumno`): aquí no hay propuestas que alinear.
