# DOS REGLAS DEL OPERADOR — el markdown que se corta, y el cierre de sesión pendiente

> Puestas por el operador **Christopher Valdez Cantu** el **2026-08-20**, durante la ronda 5 de
> `RUN-CANTU-SLIDE-SPLIT-FOURTH-SHAPE-001`. Transcritas **VERBATIM**.

---

## SUS PALABRAS, ÍNTEGRAS

```
aqui se corto el prompt

la semilla sola ................................... VÁLIDA
la semilla + gridRows: [] ......................... FALLA
la semilla + las otras tres vacías ................ FALLA

antes y despues

se corta el markdown

corrijelo

y anotalo porque no es la primera vez que pasa en este chat
Y otra cosa
anotalo, que cuando cerremos este run (cerrado correctamente no dejarlo a medias)

toca hacer reinicio de seion
actualizr handsoff y reiniciar la convesacion
```

---

## REGLA 1 — UN TICKET NO PUEDE LLEVAR UNA VALLA DE CÓDIGO DENTRO DE OTRA

**La causa, y es mecánica:** la cabina entrega los tickets dentro de una valla de tres tildes
invertidas. Cuando el texto del ticket incluye **otra** valla de tres —para una tabla de
medición, un bloque de comandos o una salida— **esa segunda valla CIERRA la primera**, y todo lo
que viene después se pinta como texto plano. El operador ve el ticket cortado justo ahí.

**No es la primera vez en esta sesión**, y por eso queda escrito.

**LAS TRES SALIDAS, EN ORDEN DE PREFERENCIA:**

1. **NO ANIDAR.** El contenido interior va **indentado con cuatro espacios**, que en Markdown
   se pinta igual de monoespaciado y no abre ninguna valla.
2. **SI HACE FALTA UNA VALLA INTERIOR**, la exterior lleva **CUATRO** tildes invertidas y la
   interior tres. Una valla solo la cierra otra del mismo tamaño o mayor.
3. **RELEER EL TICKET ENTERO ANTES DE ENVIARLO** buscando tildes invertidas triples. Es la
   misma disciplina que ya rige para las órdenes contradictorias: **antes de emitir, leer el
   ticket entero buscando lo que lo rompe.**

**Y ES DE LA MISMA FAMILIA QUE LOS OTROS DEFECTOS DE ENTREGA DE ESTA SESIÓN** —los tres commits
a los que les faltó un fichero, y las comillas invertidas que se comieron una palabra en dos
mensajes de commit—: **el contenido era correcto y el vehículo lo estropeó**. Lo que falla no es
el juicio: es la mecánica del envío, y por eso se arregla con una comprobación, no con cuidado.

---

## REGLA 2 — AL CERRAR ESTE RUN, TOCA REINICIO DE SESIÓN

**Su instrucción, y con una condición explícita:** el run se cierra **correctamente, no a
medias**, y entonces:

1. **La cabina actualiza el handoff** — `context/handoffs/cantu-studio.md`.
2. **La cabina actualiza el prompt de reinicio** — `context/cantu-studio/PROMPT-DE-REINICIO.md`.
3. **Commitea las dos cosas.**
4. **Y el operador reinicia la conversación.**

**No se hace antes de cerrar `#130`.** «Cerrado correctamente» significa: QA aprobada por él,
`set-status` a `completed` con su `closeout_result`, veredicto verbatim a disco, y los commits
hechos — el del trabajo, el del roadmap y el del veredicto.

**Lo que el handoff y el prompt tienen que llevar de esta sesión**, y es mucho:

- Las **dos reglas de este documento**.
- La regla de **sesión nueva por run nuevo** (`REGLA-SESION-NUEVA-POR-RUN-NUEVO.md`).
- La regla de que **el material de QA lo produce la cabina y lo prueba contra la puerta real**.
- **Los tres fallos de commit** y su corrección: la lista por nombre se **deriva del
  `git status`**, no se teclea de memoria.
- El **criterio de las cinco cosas** que hizo que una admisión costara una ronda en vez de
  cinco.
- Que **el peldaño es el techo** y el motor de ajuste vive **fuera del renderizador**.
- Y **la lección de las cinco rondas de `#130`**: cuatro de ellas arreglaron la capa equivocada
  porque el encuadre de la cabina apuntaba al formulario, y **el esquema no se cuestionó hasta
  que se llamó directamente**.
