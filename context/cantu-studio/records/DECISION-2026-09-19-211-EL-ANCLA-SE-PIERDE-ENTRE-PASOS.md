# #211 · La parada de análisis desmintió su propia premisa, y el operador eligió (a)

**Fecha:** 2026-09-19 · **Run:** `#211` `RUN-CANTU-MATH-PROCEDURE-BLOCK-CONTRACT-001` · **Cerrado.**
**Contrato:** `cantu-studio/docs/decisions/ADR-006-MATH-PROCEDURE-BLOCK.md`.

---

## El veredicto del operador, verbatim

> vamos con tu recomendaicon procede

Sobre la recomendación **(a) — regla siempre activa**, frente a **(b) — declarada por
procedimiento con el aspecto de hoy por defecto**. Las razones que se le dieron, y que quedan como
el porqué de la decisión: el precedente idéntico (`#170`) se resolvió así sin generar queja, y una
casilla que el autor tiene que entender **para dejarla como está** es peor que un cambio de aspecto
que se ve una vez.

---

## Lo que la parada desmintió

**La premisa era cierta como mecanismo y falsa como causa.** Un entorno `aligned` es una caja
atómica y el centrado la centra entera; solo el `\\` de nivel superior centra renglón a renglón. Pero
de **918 campos de fórmula** del corpus, los saltos de nivel superior son **32, todos en fixtures, y
cero en producción**. Renderizados los tres procedimientos reales del operador: **en dos de los tres
ninguna fórmula es multilínea y el ancla igual se va 201,4 px y 102,9 px**. Se pierde **entre pasos**.

Y la casa ya lo había diagnosticado así: el **`#170`** recogió la misma queja —también dicha tres
veces— y la arregló **alineando la columna de pasos**.

**Es la segunda vez que una parada de análisis desmiente la premisa del run que la contiene.** Las
dos veces ahorró un taller entero construyendo lo que no era.

---

## Lo que el contrato dejó decidido

- **Cláusula 1** (alcance campo): contenido a la izquierda dentro de la caja. **0 px en 916 de 918
  campos.** No es migración.
- **Cláusula 2** (alcance contenedor): todas las cajas de un procedimiento miden su línea más larga.
  **Es la que responde al operador, y es una migración: 19 de 22 paneles.**
- **Ni campo del autor ni derivado de la fórmula**, y **sin rótulo en pantalla**, declarado en vez de
  inventado.
- **El desbordamiento va antes que la alineación:** en dos de los tres procedimientos la línea más
  larga ya no cabe en el panel (60,0 y 42,5 px de más). Por eso el run de construcción existe aparte.

---

## Dos errores de la cabina en este run, y el segundo lo cazó una guarda

**1. Las coordenadas del ticket.** Di `renderRule.js:80, :96 y :108` como medición propia. Solo la
`:96` es la fórmula: la `:80` centra el título de la franja y la `:108` el párrafo de descripción.
Las copié del recado de `cantu-lessons` y las publiqué como medidas por mí. *Un dato ajeno que se
republica sin medir es un dato inventado con mejor letra.*

**2. Emití el ticket del `#211` sin abrir el run.** El canónico decía `planned` mientras el taller
trabajaba. Lo descubrió **la guarda de estado del guion de cierre**, que esperaba `active` y paró. Se
corrigió abriendo el run antes de cerrarlo, y queda dicho: el turno 1 del ciclo abre el run *y* emite
el ticket, y esta vez solo hizo lo segundo. La guarda hizo el trabajo que la disciplina no hizo.

---

## Reserva declarada

Todo se midió a **un solo ancho (1200 px)** y con **KaTeX**, mientras Moodle renderiza con MathJax.
Slide se leyó pero no se renderizó. Y aparecieron ficheros ajenos en el directorio del run
(`census-math.js`, 06:14, minutos antes de los guiones del taller de 06:18) cuya cifra coincide en
918: no se pudo atribuir, y se dice en vez de afirmar cualquiera de las dos explicaciones.
