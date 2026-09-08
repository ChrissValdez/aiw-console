# Decisión del operador — citas anidadas y listas dentro de una cita

**2026-09-08 · run `#64` `RUN-CONSOLE-SHARED-RENDERER-QUOTES-001`, `active`.**
Corrige hacia adelante una decisión del 2026-09-02 que se tomó sin haberse entendido.

---

## 1. LA PRIMERA VEZ SE DECIDIÓ MAL, Y ASÍ FUE

El ticket del `#64` declaró una condición de parada: si aparecían **citas anidadas (`>>`)**
o **una cita conteniendo una lista**, el taller debía reportar cuántas y **preguntar antes
de inventarles una regla**.

El taller midió bien —una cita anidada, once listas en ocho ficheros—, paró como debía, y
preguntó. **La respuesta que recibió no fue una decisión.** Verbatim del operador el
2026-09-08, al retomar el hilo:

> «respondi solo lo que me recomendo para que procedierA»
>
> «no entendi realmente la pregunta»
>
> «mejro dime que revisar y sobre eso tomamos desicion aqui para mandarla a taller»

El taller registró «texto literal en ambas» como veredicto del operador, lo implementó y lo
clavó con tests. **La cabina lo transcribió al mensaje del commit `7af9fcf` como decisión
del operador, actuando sobre el relato del taller y sin tener sus palabras.** Eso es
exactamente lo que las reglas prohíben, y se declaró en el mismo turno.

**La lección, y no es del renderizador:** una parada que se resuelve con una pregunta que
el operador no puede contestar **no es una parada respetada, es una parada gastada**. La
pregunta llegó en el vocabulario del taller —`>>`, parseo, regla— y no en el del operador,
que es lo que ve en pantalla. La segunda vez se le enseñaron los **casos reales de sus
propios records** y los **dibujos de cómo se vería cada opción**, y decidió en un turno.

---

## 2. LAS DOS DECISIONES

Tomadas el 2026-09-08 eligiendo entre opciones dibujadas, no dictadas en prosa. Se registra
así por honestidad: el verbatim es la elección, no una frase.

### D-A · Cita dentro de cita → **CAJA DENTRO DE CAJA**

La cita interior se pinta **anidada de verdad**, indentada dentro de la exterior. El `>`
deja de verse como texto.

**El caso, y por qué pesa más que su cuenta:** hay **un solo** caso hoy, en
`context/aiw-console/records/HALLAZGOS-67-SUPERFICIE-DEL-REPORTE.md:5`. Pero ese caso es
**una decisión del operador citada verbatim dentro del contexto que escribió la cabina** —
es decir, **el patrón con el que se guarda todo veredicto suyo**. Va a repetirse cada vez
que un record cite sus palabras. Un `>` colgando delante de la voz del operador es ruido
que no significa nada para quien lee.

**Descartada:** fundir la cita interior con la exterior quitando el `>`. Queda limpio y es
más barato, pero **borra la distinción entre las dos voces** — lo que dijo el operador y lo
que escribió la cabina se verían como una sola.

### D-B · Lista dentro de cita → **SE QUEDA COMO ESTÁ, texto literal**

El guión sigue pintándose literal. **No se parsea la lista.**

**La razón, y es la que separa este caso del anterior:** el `>` sobrante es **ruido** —no
significa nada—, mientras que el `-` sobrante es una **viñeta pobre pero honesta**:
significa exactamente lo que parece. Once casos en ocho ficheros que hoy se leen bien.

**Y hay una razón de riesgo:** parsear listas dentro de citas toca la interacción entre el
agrupado de citas y el corte de listas, que es **justamente la condición de parada que el
taller midió como NO disparada** y dejó clavada con goldens. Abrirla cambia un verde
verificado por un beneficio cosmético.

---

## 3. LO QUE ESTO NO CAMBIA

- **El alcance del run no se amplía.** El ticket del `#64` ya mandaba preguntar y decidir
  esto; la respuesta llegó mal la primera vez y bien la segunda. No es D-061.
- **La `D-B` confirma lo ya implementado**, así que sus tests actuales se quedan.
- **El veredicto visual de QA del operador sigue pendiente** y el run no cierra sin él.
