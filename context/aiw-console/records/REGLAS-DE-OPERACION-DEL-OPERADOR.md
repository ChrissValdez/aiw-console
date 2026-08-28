# Reglas de operación que fijó el operador

**Vivo. Se añade, no se reescribe.** Cada regla va con la fecha en que la fijó y **con sus
palabras verbatim**, porque una regla resumida por la cabina es una regla que la cabina puede
haber entendido mal.

Estas reglas gobiernan **cómo la cabina se dirige al operador**. No son del roadmap ni del
contrato del sobre: son del trato entre los dos, y por eso viven aquí y no en una decisión
numerada.

---

## R-01 · Los comandos de la superficie de QA se dan siempre; la consola normal se nombra

**2026-08-27.** Verbatim:

> «siempre que quieras que abra esa superficie me vas a tener que dar esos comandos, siempre
> dame ese comando cuando quieras que lo abra para QA. Cuando es la consola normal solo puedes
> pedirme que abra Start console y yo lo abro.»

**En la práctica:** superficie de fixtures → la cabina entrega las tres líneas con
`PC_REGISTRY` y `PC_PORT`, completas, cada vez. Consola normal → basta con nombrar
`start-console.cmd`.

---

## R-02 · El push no se recuerda salvo al cerrar el hilo

**2026-08-27.** Verbatim:

> «ya hice push, no me recuerdes de los push amenos que estemos cerrando el hilo para reiniciar
> la sesion ahi me puedes dar un recordatorio y yo digo cuando cerramos el hilo, antes no»

**En la práctica:** desaparece la línea «toca push» del cierre de cada respuesta. **Sólo** se
da un recordatorio cuando el operador declare que se cierra el hilo — y **quién declara el
cierre es él**. La cabina sigue verificando el estado de publicación cuando lo necesite; lo que
no hace es decirlo cada vez.

---

## R-03 · Todo ticket declara si es el mismo taller o uno nuevo

**2026-08-27.** Verbatim:

> «este ticket es nuevo o sobre el mismo taller, siempre especificame eso al final del ticket.
> si es en el mismo, y si es nuevo el modelo recomendado y esfuerzo (si es el mismo no
> recomiendes modelo y esfuerzo, se hereda porque es el mismo taller)»

**En la práctica, al final de TODO ticket, un bloque `# Sesión`:**

- **Mismo taller** → se dice, y **NO se recomienda modelo ni esfuerzo**: se heredan.
- **Taller nuevo** → se dice, **con modelo y esfuerzo recomendados**, y con el porqué de abrir
  sesión nueva en vez de continuar.

**Por qué importa más de lo que parece:** la recomendación de modelo y esfuerzo existe para
decidir dónde gastar el recurso escaso, que es el tiempo. Repetirla en una continuación no
informa nada y **sugiere en falso que hay una decisión que tomar** donde no la hay.
