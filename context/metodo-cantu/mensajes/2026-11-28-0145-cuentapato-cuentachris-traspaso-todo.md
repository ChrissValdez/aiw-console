# Traspaso: todo el trabajo de Método Cantú pasa de la Cuenta Pato a la Cuenta Chris

- **De:** cuentapato · **Para:** cuentachris · **Escrito:** 2026-11-28 01:45 UTC
- **Repo o área:** Líneas B, C, D, E, F, I, J y K, con sus repos `cantu-lessons`, `cantu-revisiones`, `cantu-espanol`,
  `metodo-cantu-landing`, `cantu-quizzes-latex`, `metodo-cantu-calculo`, `metodo-cantu-geometria-analitica` y `metodo-cantu-redes`
- **Qué pide:** tomar las líneas y sus repos en tu cuenta y seguirlas. ¿Necesita respuesta? sí, un aviso cuando las tomes.
- **El encargo:** este aviso es el traspaso y hace de relevo; cada punto nombra su repo, su PR y su artefacto.
- **Palabras del operador:** Pato (28-nov, 01:37 UTC): *«ayudame a traspasar todos los hilos que se esten trabajando a cuenta
  Chris esta quiero reservar un porcentaje de toeksn que queda para otro proyecto fuera de metodo cantu»*

## Lo que ya hizo la Cuenta Pato

- **Soltó las ocho líneas y sus ocho repos** en `LINEAS.md` y `ASIGNACIONES.md` (cuenta `—`, `libre`), en un solo commit, con
  `lineas.mjs --revisar` en orden. Tomarlas es tuyo, con el sí de Chris (abajo).
- **Apagó sus cuatro tareas programadas** (no las borró): la revisión del tablero de quizzes cada 3 h (01:38 UTC), el revisor
  del buzón cada hora, los votos nuevos de la galería cada hora y el resumen diario de la galería (01:40 UTC). Si las quieres,
  créalas en tu cuenta.
- **Todo está en GitHub:** los PR de la galería de mate y de Español están fusionados; Redes tiene su nota de estado en el PR 2.

## Los artefactos

Pato te los comparte como **Editor**. Hasta que lo haga, no los puedes republicar en la misma liga.

| Artefacto | Liga | Línea |
|---|---|---|
| Galería de lecciones de mate (la única vigente) | https://claude.ai/artifact/8tPUtu4Zia4N5t7PpnL7qZ | B y F |
| Formato de lección Mate (demo de la apertura) | https://claude.ai/artifact/5DVv2Zp3cMzrkizdEQAyxT | B |
| Galería de Español | https://claude.ai/artifact/1Q9L39xwANcdZeHg9kPnwN | C |
| Landing BG vigente | https://claude.ai/artifact/4ybzDrqAzNXRuidpqEb4pu | D |
| Propuestas de la landing | https://claude.ai/artifact/LM452jLFvRdJrSUuhk7EBn | D |
| Estado de los quizzes (tablero) | https://claude.ai/artifact/DWYMW5XrP5kHSkDJbx7myk | E |
| Biblioteca de Redes (la única vigente) | https://claude.ai/artifact/E6q7vqhro8xJosppQjDkaG | K |
| Investigación «Redes ajenas: qué jala» | https://claude.ai/artifact/9KMcGc4iuKKeZXSwuXfEnH | K |
| Diseños nuevos de Redes (rondas viejas; ya están en la biblioteca) | https://claude.ai/artifact/N7EooLAzbpJpxFMyxWVg4H | K |

Los votos viven en la base de cada artefacto: al compartirlo como Editor, siguen ahí.

## 1. Galería de mate (Líneas B y F)

- **En qué punto está:** la **v77** está publicada (28-nov 00:59 UTC) y espera la revisión de Pato. El recorrido y la revisión
  visual pasaron las 219 lecciones sin fallas. Detalle en el aviso `2026-11-28-0100-…-galeria-mate-v77.md`; PRs fusionados:
  `cantu-revisiones` 31 (e444abe) y `cantu-lessons` 30 (90c7b7c).
- **Qué falta:** las **32 variantes «Los mismos pasos que la web»** que no se subieron porque no cumplían las reglas de color y
  tamaño de la slide (las 13 que sí cumplían están por votar). Se hacen si Pato las pide, y llegan juntas en una versión nueva.
- **Qué más sigue abierto:** las 445 variantes ALUMNO-PAA y las 55 recomendaciones por votar (v71); la ronda CR-LX3 de la Línea F
  en la galería local; la rama de respaldo `cr-fig-04` (juntar o descartar).
- **Antes de publicar una versión:** armar desde main, correr `pruebas-e2e/recorrido.cjs` y `visual.cjs` en las 219 con 0 fallas,
  publicar en tandas de 64 MB o menos y listar los ficheros del artefacto antes.
- **Quién decide:** Pato, los votos y si se hacen las 32.

## 2. Galería de Español (Línea C)

- **En qué punto está:** el rediseño está publicado (versión 15, `cantu-espanol` PR 38 fusionado): votos al margen, renglones
  que caben en uno, sin las pastillas de arriba.
- **Qué falta:** que Pato elija en ⚙ la cabecera de sección (**E1** Número de libro, **E2** Qué toca, **E3** Capitular, **E4**
  Pestaña al margen; se recomendó E2), el formato del contenido (**C1**, **C2** o **C3**; se recomendó C3) y los votos con
  «Botón al margen» o «Columna al margen» (se recomendó botón). Lo que gane se fija en las 19 lecciones y se quitan las otras.
- **Regla:** ninguna lección de Español sube a Moodle hasta que Pato la apruebe (aviso 1126).
- **Liga:** https://claude.ai/artifact/1Q9L39xwANcdZeHg9kPnwN
- **Quién decide:** Pato.

## 3. Redes sociales (Línea K)

- **En qué punto está:** la biblioteca única va en la **versión 12** (acomodo de la vista grande terminado: opciones a la
  izquierda, video a la derecha). La ronda 7 está en estado Propuesta. El código está en el **PR 2** de `metodo-cantu-redes`
  (borrador, sobre la rama del PR 1), con la nota de dónde quedó todo:
  https://github.com/ChrissValdez/metodo-cantu-redes/pull/2#issuecomment-7231808558
- **Qué falta:** los votos Sí / Tal vez / No por pieza en la biblioteca, y luego armar la lista de qué se publica («Por hacer»).
  También: que Pato diga si le queda el último acomodo, y resolver que la v3 dice UANL y la v4 dice Tec y UDEM.
- **Armador:** `plantillas/biblioteca/armar.py`; respuestas de los retos con `respuesta()` de `plantillas/v4/gen4.py`.
- **Quién decide:** Pato y Chris (votos y favoritos).

## 4. Quizzes y su tablero (Línea E)

- **En qué punto está:** BUILD-FINAL-10 en main (3 516 preguntas). El tablero ya te lo pasó el aviso
  `2026-11-28-0138-…-traspaso-tablero-quizzes.md`, con la receta para republicarlo en la misma liga y crear tu tarea de cada 3 h.
- **Qué falta:**
  - la revisión «¿pide lección posterior?» de **Intereses, Notación científica y Conjuntos** (las otras cinco de Aritmética están
    hechas, PR 13–16);
  - los faltantes sueltos: TN 1 Medio + 1 Reto, POR 1 Medio + 3 Reto; EL y DES Nivel PAA 1 cada uno; DES y FAC Reto 1 cada uno;
  - en Español, **unos 60 pasajes repetidos con el Banco**: espera que Pato decida qué se hace con ellos.
- **Quién decide:** Pato, lo de los pasajes repetidos; lo demás es mecánico.

## 5. Landing (Línea D)

- **En qué punto está:** la BG está publicada como artefacto, sin números en los títulos y con los arreglos de celular (PR 5).
- **Qué falta:** nada abierto. Antes de escribir, leer `context/cabinas/landing/MEMORIA-PC-CHRIS.md`.

## 6. Cálculo y Geometría analítica (Líneas I y J)

- **En qué punto está:** sin empezar desde que llegaron a la Cuenta Pato el 27-nov. Lo último en main de las dos es la retro de
  los quizzes con aire parejo entre bloques (manual v1.5, §10.5).
- **Qué falta:** llevar a sus galerías los arreglos de la galería de mate de los avisos v50 a v77 (votos que no desaparecen,
  «Hoy» con ✓ que cierra la sección, notas destacadas centradas).
- **Quién decide:** Chris.

## Tomar las líneas

1. `git pull` de `aiw-console` y comprueba que las ocho líneas y los ocho repos siguen `libre`.
2. En un solo commit: en `LINEAS.md` pon `cuentachris` y `activa` en B, C, D, E, I, J y K (F puede quedar pausada, porque
   comparte repos con B); en `ASIGNACIONES.md` pon `cuentachris` y `activo` en los ocho repos, con la fecha y el sí de Chris.
   Antes, `node context/metodo-cantu/lineas.mjs --revisar`.
3. Mueve este aviso a `leidos/` y contesta con otro aviso.
