# VEREDICTO 116 — «Narrativa» y «Lista con etiquetas» reciben su propia escala de texto

> Run: `RUN-CANTU-SLIDE-BODY-TEXT-OWN-SCALES-001` · `queue_order` 116 al momento de escribir.
> Veredicto emitido por el operador **Christopher Valdez Cantu** el **2026-08-18**, tras abrir
> `QA/temp/RUN-CANTU-SLIDE-BODY-TEXT-OWN-SCALES-001/QA-116.html`.
> Transcrito por la cabina **VERBATIM**. No se parafrasea, no se completa.

---

## SUS PALABRAS, ÍNTEGRAS

```
se ven bien procede
```

---

## CÓMO SE PIDIÓ Y CÓMO LLEGÓ — la diferencia se declara, no se disimula

La QA se entregó en **cinco pasos**, con formato de respuesta pedido literal
(`1 ok / 1 falla` … y una línea de porqué en el 3 y el 5).

**El veredicto llegó en una sola línea y no recorre los pasos uno a uno.** Se registra como
llegó. Lo que la cabina hizo con esa diferencia:

| Paso | Qué pedía | Cómo se resuelve |
|---|---|---|
| 1 · Narrativa estándar: «HOY» == «Mediano» | parada si se mueve | **PASA** — «se ven bien» |
| 2 · Narrativa entrada: «HOY» == «Mediano» | parada si se mueve | **PASA** — «se ven bien» |
| 3 · Calibración de Chico / Grande / Extra grande | veredicto + porqué | **PASA sin porqué**. No lo pidió cambiar |
| 4 · Lista con etiquetas (motor real) | veredicto de calibración | **PASA sin porqué**. Sigue sin poder insertarla |
| 5 · Juego de razones `0,8333 · 1 · 1,2 · 1,4667` vs. el literal de la escalera de lectura | elección explícita | **NO CONTESTADO EXPLÍCITAMENTE.** Ver abajo |

### El paso 5 se resuelve por INFERENCIA DE LA CABINA, y queda VETABLE

El «procede» se lee como *«adelante con lo que hay en disco»*, y lo que hay en disco es el
juego **`0,8333 · 1 · 1,2 · 1,4667`**, que es el que `tokens.js` rechaza cambiar por escrito
para las familias ancladas en Mediano y el que llevan las ocho tablas ancladas anteriores.

**Esto es una inferencia de la cabina, no una palabra del operador.** Se marca como tal y
**se puede revertir barato**: son tres números por tabla y ningún contrato cambia. La
diferencia medida entre los dos juegos es **0,64 px como máximo**, y solo en «Chico» y
«Extra grande».

**Si el operador la veta, se abre un run de calibración; no se enmienda `#116`,** que ya
habrá cerrado con su identidad intacta.

---

## LO QUE ESTE VEREDICTO **NO** CUBRE, Y SE DICE EN VOZ ALTA

**«Lista con etiquetas» sigue bajo contención.** El autor no puede insertarla desde el
editor, así que el paso 4 se juzgó sobre el **motor real pintado en la página de QA**, fuera
del camino del autor. **La mitad de este run no ha tenido ojo humano en su superficie de
autoría, y no lo tendrá hasta `#119`**, `RUN-CANTU-SLIDE-ICONLIST-LIFT-AND-IMPLEMENT-001`,
que hereda la deuda explícitamente: al levantar la contención, **lo primero que se mira es
que su tamaño de texto ancla en Mediano = lo de hoy y que ya no ofrece «Automático»**.

**La cobertura automática sí cubre las dos.** Lo que falta es el ojo, y solo para una.

**Van DOCE runs consecutivos** en los que la única prueba de la superficie visual es el
operador, y **TRES cierres con QA parcial**. Se nombra para que él decida si acumula riesgo,
no como reproche a nadie.

---

## LO QUE QUEDÓ ABIERTO Y NO SE TOCÓ

- **Tres pistas obsoletas en `SlideItemEditor.jsx`** — `visual.titleSize`,
  `narrative.titleSize`, `narrative.titleSpacing` — siguen prometiendo «Automático» en
  controles que ya no la ofrecen. **Defecto del run anterior, fuera de alcance de `#116`,
  nombrado y no reparado.**
- **«Extra grande» contra «muy grande»** sigue abierto, sin run, y es del operador. Este
  veredicto no lo cierra.
