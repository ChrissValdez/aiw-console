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

---

## R-04 · Las rutas se dan completas, listas para pegar en el Explorador

**2026-10-05.** Verbatim:

> «dame los enlaces con la direccion completa no la acortes de context en adelante
> Sino completa para pdoer pegarla en el explorador y lo abra»

**En la práctica:** toda ruta de fichero que la cabina le da al operador va **completa, en forma
Windows**, desde la unidad: `C:\Users\chris\Documents\AIW_Workspace\projects\aiw-console\…`. Nunca
relativa al repo (`context/…`), nunca con la ruta de montaje de la cabina (`/sessions/…`). Dentro de
un ticket de taller pueden ir relativas al repo, porque el taller trabaja desde la raíz del repo.

---

## R-05 · No se pide QA en runs sin superficie que mirar

**2026-10-21.** Verbatim:

> «no me pidas QA por runs en los que no hay una superficie que revisar
> cotnratos y .md a revisar me toma demasiado tiempo cada ajuste
> solo si es un punto critico y bien distribuido lo hacemos pero trata de avanzar sin eso porque sino detiene mi flujo de trabajo constanetemen
> como ahora no hiciste un cambio de ux ui entonces para revisar tendria que leer muchismio para darte el ok y si eso pasa en cada run mi flujo se frena altamente»

**En la práctica:**

- **Un run sin superficie visual** —textos, contratos, `.md`, comentarios, tests, código sin
  interfaz— **se cierra sin QA humana**. La cabina lee el cambio en disco, lo verifica con lo que
  pueda medir, y el `closeout_result` declara que no hubo QA y qué verificó ella. No se pide «leer
  el antes y el después».
- **La QA humana se pide cuando hay algo que mirar en pantalla** (UX/UI) o **en un punto crítico**
  —una decisión difícil de deshacer—, y entonces **acotada y bien repartida**: pocos pasos, lo justo
  para decidir.
- **El aviso del turno 1** («este run va a requerir QA») sólo se da cuando la QA es de esa clase.
- **Las decisiones de alcance que sí necesitan al operador** (ampliar un run, abrir uno nuevo) se
  preguntan en una línea con recomendación, sin pedir leer texto para contestarlas.
