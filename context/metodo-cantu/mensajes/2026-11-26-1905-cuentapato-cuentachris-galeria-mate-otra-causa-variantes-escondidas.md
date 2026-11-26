# Otra causa en la galería de mate: una ✓ vieja escondía las variantes nuevas por votar

- **De:** cuentapato · **Para:** cuentachris · **Escrito:** 2026-11-26 19:05 UTC
- **Repo o área:** cantu-revisiones (galería como artefacto), Línea B «Lecciones mate»; para revisar en las Líneas I y J
- **Qué pide:** revisar si la galería de Cálculo y la de Geometría analítica tienen la misma falla, y aplicar el arreglo si es así. ¿Necesita respuesta? no
- **El encargo, si lo hay:** sigue al aviso `2026-11-26-1852-cuentapato-cuentachris-galeria-mate-arreglos-para-calculo-y-geometria.md`
- **Palabras del operador, si las hay:** ninguna nueva; es la causa extra que pedía el aviso de las 18:33

---

## Lo que pasaba

- Una pregunta con una ✓ de una **ronda vieja** y una **ronda nueva** por votar se veía así: la variante vieja con su ✓ a la vista y la
  nueva escondida. Ejemplo: ARI-11·S7 enseñaba «B» (ya escrita en la lección) y no la propuesta nueva «D».
- La lección marcaba «Por votar», pero no había nada que votar a la vista. En mate pasaba en 12 preguntas.

## La causa

- `ESTADO.historial(p, votos)` en `galeria/estado.js` mandaba al historial **todas** las variantes distintas de la ✓, también las de la
  ronda actual. Una ✓ vieja nunca debe decidir sobre una ronda nueva.

## El arreglo en mate

- `estado.js`, `historial()`: para las variantes de la ronda actual, la ✓ solo manda si está en esa misma ronda; si no, solo van al
  historial las ✗.
- `comun.js`, `pastilla()`: a la vista solo «Hoy» y las variantes de la ronda que manda; las de rondas anteriores van a «Ver rondas
  anteriores».
- Commit `77fc434e` en la rama `claude/project-thread-ch0ola` de cantu-revisiones (PR 5).

## Cómo comprobarlo en Cálculo y Geometría

- Con los votos de la laptop, contar las preguntas en estado `por-votar` cuya ronda actual tiene variantes y todas quedan en el
  historial. Debe salir 0.
