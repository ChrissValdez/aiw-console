# #214 · El veredicto que cambia el contrato: Slide se revierte, y Web quiere los dos modos

**Fecha:** 2026-09-20 · **Run:** `#214` `RUN-CANTU-MATH-PROCEDURE-BLOCK-BUILD-001`, `active`.
**Afecta al contrato:** `ADR-006`, aprobado el 2026-09-19 en su forma **(a)**.

---

## El veredicto del operador, verbatim

> slide estaba bien antes no ocupaba cambios
>
> ya tenia un bloqeu adentro y el depuse se ve peor
>
> pero, web estra mas tricky creo que ahi covniene tener los dos modos centrado (el actual) y el
> bloque (el nuevo) y seleccionar el modo en el editor de cantu studio

Es el primer veredicto de esta tanda que **revoca una decisión de contrato ya aprobada**. El ADR-006
se aprobó en la forma **(a) — regla siempre activa, sin campo del autor y sin rótulo**, sobre el
argumento de que el precedente del `#170` se había resuelto así sin queja y de que una casilla que el
autor debe entender para dejarla como está es peor que un cambio de aspecto visto una vez. **El
operador miró el resultado y dijo lo contrario.** Ninguna medición podía descubrir esto: es
exactamente lo que el veredicto humano existe para aportar.

---

## Y lo que la medición encontró después, que lo confirma por escrito

Al medir para preparar la ronda siguiente apareció que **Slide ya tenía, desde antes, justo lo que el
operador pide ahora para Web**:

- `tools/studio/editor-ui/src/schemas/draftSchema.js:4366` — `focusAlignment: 'centered' | 'left'`,
  opcional, **por bloque**.
- `SlideStackEditor.jsx:981` — el control, montado, con rótulo **«Alineación de las fórmulas»** y
  opciones **«Centradas (por defecto)»** y **«A la izquierda, balanceadas»**.
- Y su comentario guarda la petición que lo creó, del propio operador, verbatim:
  «por DEFAULT CENTRADO y con la opción de alinearlo a la izquierda (como está ahorita)».

O sea: **la forma (b) ya estaba construida y aprobada en Slide**, y el `#214`, al implementar la
forma (a), la desactivó — ése fue el hallazgo del taller de que `focusAlignment` quedaba inerte. El
operador no está pidiendo algo nuevo: está pidiendo **lo que él mismo ya decidió una vez**, extendido
al otro carril.

**Lección que vale más que el run:** cuando el contrato eligió (a), nadie midió si (b) ya existía en
alguna superficie. Antes de decidir entre dos formas, hay que preguntar si una de las dos **ya está
en disco y aprobada**.

---

## Lo que queda decidido con este veredicto

1. **Slide se revierte entero** — las dos cláusulas. Con eso `focusAlignment` vuelve a gobernar y el
   control del editor deja de estar muerto: **la «decisión 1» que la cabina iba a plantear
   desaparece sola**.
2. **Web recibe el MISMO mecanismo que Slide ya tiene**, con su mismo vocabulario: campo por bloque,
   **por defecto el centrado de hoy**, y el bloque como opción. El cambio de aspecto sobre los 151
   paneles **se deshace**: nadie ve nada distinto hasta que lo pida.
3. **`slides/components/renderSplitCard.js`**, que el `Scope` de la cabina había dejado fuera por
   error, **deja de ser deuda**: si Slide se revierte, no hay nada que extenderle.

---

## El error de la cabina que este veredicto deja a la vista

El ticket del `#214` nombró tres ficheros en su `Scope` cuando el ADR marcaba cuatro superficies. El
taller lo respetó y lo declaró. Ese defecto habría costado una ronda entera de arreglo; el veredicto
lo vuelve irrelevante, pero **la regla se mantiene: el `Scope` de un ticket se deriva del contrato,
no se teclea de memoria.**
