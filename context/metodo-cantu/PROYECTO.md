# Proyecto Método Cantú: lo que sabe el coordinador

> **v0 · 2026-11-24, 08:38 (`date`).** Lo escribió la cabina DASHBOARD en la PC (DESKTOP-525K0IS) a pedido del operador. Sus palabras:
> - *«como puedo hacer lo de preparar el proyecto de Metodo cantu digamos con una sesion local como esta pero tenerla todo listo para cuando sete listo para la migracion»*
> - *«Sí, escríbelos»*
>
> **Para qué sirve:** es lo que haría de **instrucciones del proyecto**.
> - **Hoy** lo lee un **coordinador local**: una sesión de Claude Code abierta en `AIW_Workspace`.
> - **Mañana** lo lee el coordinador de un **Project de claude.ai/code**. La receta para mudarlo está en `MIGRAR-A-PROJECTS.md`, al lado.
>
> Los dos leen este mismo fichero desde GitHub. **Si una regla cambia, se cambia aquí**, no solo en la memoria de una máquina.
>
> **v1 · 2026-11-24, 09:00 (`date`).** El coordinador, en la PC, escribió el **modelo mixto** (§3.1, §5 y §6; la decisión es D-086). Las palabras del operador:
> - *«esos proyectos que dice que lo lleva su cabina lo que quiero justamente es traerlo aqui todo ya que todo se conecta los quizes, las lecciones, las revisiones el dashboard, el studio»*
> - *«que tal si las cabinas son sesiones anidadas a esta? que opinas? lo recomiendas?»*
> - Al modelo mixto que propuso el coordinador: *«Sí, escríbelo»*
>
> **v2 · 2026-11-24, 15:10 UTC (`date -u`). Propuesta en PR, sin fusionar.** Un hilo del Project en la nube escribió **las dos
> cuentas a la vez, en repos distintos** (§3.2 y `ASIGNACIONES.md`, al lado), a pedido del operador:
> - *«lo mas importante es trabajar en repos diferentes por cuenta»*
> - *«tu encargate de la revision de lecciones y landing page, el dashboard se lo dejamos a la otra cuenta»*
> - *«pero necesitamos una manera de avisar de esa forma de trabajo y tener protocolos de cambio»*
>
> La revisó cuentachris (de acuerdo con el reparto, cuatro objeciones ya incorporadas). La decisión es **D-087**, que enmienda D-086.

> **v3 · 2026-11-26, 03:19 UTC (`date -u`). Propuesta en PR.** El hilo del dashboard de la Cuenta Chris, en la nube, puso al día §5 (decía la
> v33), con el sí de Chris: *«la respuesta es si»*.

## 1. Qué es

Método Cantú es el negocio de preparación para el examen de admisión (PAA). **Desde el 24-nov lo lleva entero el coordinador**: los quizzes, las lecciones, las revisiones, el dashboard, la landing y Studio, porque todo se conecta. Hasta ese día lo llevaban cinco hilos sueltos, cada uno con su repo y su cabina. Cómo se reparte ahora está en §3.1.

**El coordinador:**
- **no hace el trabajo de las rondas**: reparte el trabajo en hilos, uno por tarea;
- lleva el contexto entre ellos, en ficheros;
- le pregunta al operador lo que es suyo de decidir.

## 2. Los repos

Todos son de GitHub (`ChrissValdez/<repo>`). En disco están bajo `C:\Users\chris\Documents\AIW_Workspace\`, con las carpetas de la mudanza del 24-nov, que son iguales en la PC y en la laptop.

| Área | Repo y carpeta | Su cabina (contrato) | Su relevo |
|---|---|---|---|
| DASHBOARD (alumno y maestro) | `Metodo_Cantu\metodo-cantu-dashboard` | `aiw-console/context/cabinas/dashboard/CLAUDE.md` | `context/handoffs/metodo-cantu-dashboard.md` |
| LECCIONES | `Metodo_Cantu\cantu-lessons` | `context/cabinas/lecciones/CLAUDE.md` | `context/handoffs/cantu-lessons.md` |
| Revisiones publicadas de LECCIONES | `Metodo_Cantu\cantu-revisiones` | la de LECCIONES | la de LECCIONES |
| LANDING | `Metodo_Cantu\metodo-cantu-landing` | `context/cabinas/landing/CLAUDE.md` | `context/handoffs/metodo-cantu-landing.md` |
| Banco de quizzes (LaTeX) | `Metodo_Cantu\cantu-quizzes-latex` | `PAA/tickets/`, `PAA/herramientas/cabina/` | `context/handoffs/cantu-quizzes-latex.md` |
| Cantu Studio | `Metodo_Cantu\cantu-studio` | `context/cabinas/cantu-studio/CLAUDE.md` (EN PAUSA, D-079) | `context/handoffs/cantu-studio.md` |
| Contexto y consola | `aiw-console` (en la raíz del workspace) | `context/cabinas/aiw-console/CLAUDE.md` | `context/handoffs/aiw-console.md` |

**Fuera del proyecto, y no se mezclan:**
- **phd-p2-experiment y `PHD\`:** el doctorado.
- **`Resuelve-Esparza`:** el negocio de trámites con un socio. Método Cantú no es su canal ni su recurso.
- **`aiw`:** el kernel viejo. El operador lo retiró el 24-nov: *«es un proyecto viejo que ya no planeo usar»*. Sigue en GitHub.

**Las reglas comunes de todas las cabinas** están en `context/cabinas/REGLAS-DE-CABINA.md`. **La regla de cada área** está en su `CLAUDE.md`, que manda sobre las reglas comunes donde chocan. **Este fichero** manda sobre los dos solo en lo que toca al coordinador.

## 3. Cómo trabaja el coordinador

**Al abrir:**
1. Toma la hora con `date`.
2. Hace `git fetch` y corre `node context/cambio-de-cuenta/sincronia.mjs` desde `aiw-console`.
   - En un hilo en la nube, `sincronia.mjs` mide **GitHub**, no el disco de la máquina. Para saber si una máquina tiene trabajo sin empujar, se corre ahí (Remote Control). *(propuesto por la laptop, aprobado por el operador, 2026-11-24)*
3. Lee el relevo del área que toca.

**No supone el estado:** lo mide.

**Un hilo por tarea:**
- El encargo se escribe **en un fichero del repo** del área, en su carpeta de encargos o de tickets, y el hilo lo lee de ahí. **El contrato es un fichero, nunca un mensaje.**
- **Los talleres no escriben git.** El coordinador, o la cabina del área, integra:
  - pasa las guardas;
  - hace un `git add` dirigido;
  - hace commit y push por sha.
- **El modelo:** Opus con esfuerzo alto. **Nunca Fable.** Sonnet solo para lo mecánico.
- En la PC, el hilo se abre en `AIW_Workspace`, la carpeta de las cabinas, para que lea la memoria de la máquina.
- **Un hilo en la nube no ve la memoria de la máquina**, salvo por Remote Control abierto en `AIW_Workspace`. Por eso las reglas van copiadas en este fichero. *(propuesto por la laptop, aprobado por el operador, 2026-11-24)*

**Al cerrar cada tarea:**
- Actualiza el relevo del área, `context/handoffs/<repo>.md`. Ahí escribe:
  - qué se hizo, con sus commits;
  - qué se publicó;
  - qué espera al operador;
  - con qué puerto o número empieza lo siguiente.

**Las cabinas de hoy siguen vivas** mientras se pasa a este modelo. Ninguna se cierra sin el sí del operador. El coordinador puede trabajar con ellas: les pide que dejen su relevo al día y lee de ahí.

### 3.1 El modelo mixto: cabinas anidadas y talleres sueltos (D-086, 24-nov)

**La idea:** el coordinador se queda **delgado**. El oficio de cada área vive en sus ficheros (`CLAUDE.md`, reglas y relevo) y en la conversación de su cabina, no en la del coordinador.

| Área | Cómo se lleva | Por qué |
|---|---|---|
| LECCIONES y revisiones | **cuentapato:** su hilo fijo «Revisión de lecciones» (D-087) | La de más flujo y más oficio: galerías, votos, carriles. |
| DASHBOARD | **Cabina anidada**, en cuanto se publique la v33 | Su ronda (votos, encargo, publicar) es continua. |
| Quizzes | **cuentapato** (D-087), desde el 24-nov a las 15:37 UTC | Lo soltó cuentachris con el sí de Chris. |
| LANDING | **cuentapato:** su hilo fijo «Landing» (D-087) | Casi cerrada; quedan rondas cortas. |
| Studio | **Nada** mientras siga en pausa (D-079) | Si el operador la saca de la pausa, se le abre una cabina. |

**La cabina anidada:**
- La abre el coordinador desde su sesión (`start_session`): «fresh», sin worktree, en `AIW_Workspace`, Opus con esfuerzo alto. **Nunca Fable.**
- Arranca leyendo enteros su `CLAUDE.md`, `context/cabinas/REGLAS-DE-CABINA.md`, este fichero y su relevo.
- Lanza sus propios talleres, anidados a ella; integra y publica su área, como hacían las cabinas sueltas.
- **El operador le habla directo** para votar o decidir lo de su área.
- **Al coordinador le avisa solo al cerrar algo:** una ronda publicada, algo que espera al operador, o algo que toca otra área. No en cada paso: cada aviso despierta al coordinador y gasta tokens.
- **Una sola cabina por área.** Una cabina suelta de antes se archiva con el sí del operador cuando su relevo pasó a la anidada (§6).

**Los talleres del coordinador** (Quizzes y LANDING): el encargo en un fichero del repo del área, un taller anidado al coordinador, y el coordinador integra y publica.

**Lo que cruza áreas** (por ejemplo, LECCIONES pide preguntas nuevas al banco): lo decide el coordinador con el operador. El encargo se escribe en el repo del área que lo aplica, y a su cabina se le manda una línea que nombra el fichero. **El contrato sigue siendo un fichero:** el aviso de una sesión anidada trae solo sus primeros 400 caracteres.

**El tope de tres es por cuenta** (D-087, Chris: *«cada una paga sus tokens y usa su propio aparato»*): como mucho tres sesiones
trabajando a la vez en cada cuenta, sumando cabinas y talleres.

**El cambio de cuenta apaga todo el árbol.** Antes de cambiar, cada cabina anidada deja su relevo al día, como dice `context/cambio-de-cuenta/PROTOCOLO.md`.

**En un Project de la nube** las sesiones anidadas de la PC no se mudan: este modelo se revisa al migrar (`MIGRAR-A-PROJECTS.md`).

**El cambio de cuenta:**
- Hay dos cuentas de Claude. **Trabajan a la vez, pero cada una en sus repos** (§3.2). *(Hasta el 24-nov la regla era que nunca
  trabajaban a la vez; la reemplaza §3.2.)*
- El relevo completo de una cuenta a la otra, cuando a una se le acaban los tokens, sigue yendo por `context/cambio-de-cuenta/`
  (`PROTOCOLO.md` y `HANDOFF.md`). Ahora además mueve los repos en `ASIGNACIONES.md`: soltar y tomar.
- **La verdad está en git:** lo que no está en GitHub no cuenta como hecho.

### 3.2 Dos cuentas a la vez, en repos distintos (24-nov)

**El reparto vive en `context/metodo-cantu/ASIGNACIONES.md`:** qué cuenta tiene cada repo, si está activo o libre, y desde cuándo.
Ahí también están los protocolos para tomar y soltar un repo. A 24-nov:
- **cuentapato:** revisión de lecciones (`cantu-lessons` y `cantu-revisiones`), la LANDING y los quizzes (`cantu-quizzes-latex`,
  desde el 24-nov a las 15:37 UTC, con el sí de Chris).
- **cuentachris:** el DASHBOARD.
- **Libre:** `cantu-studio`. **Libre y en pausa:** el código de la consola en `aiw-console`.

**Una cuenta no está atada a un aparato.** Cada una decide en qué aparato disponible corre (laptop-Chris, PC-Chris, PC-Pato).
Chris: *«cada una decide sobre aparatos disponibles»*.

**Antes de que cuentapato escriba en LECCIONES o LANDING,** las cabinas sueltas de esas áreas (en PC-Chris: CL_Cabina_PC_Chris y
MC-LandingPage, paradas el 24-nov) terminan su cierre (`CIERRE-DE-CABINA.md`), **incluido el paso 4**: las unas 35 reglas de esas
áreas que solo están en la memoria de PC-Chris pasan a `context/cabinas/lecciones/` y `context/cabinas/landing/`. Solo una sesión
en PC-Chris puede hacerlo.

**Las reglas:**
1. **Antes de escribir en un repo**, `git pull` de `aiw-console` y mirar `ASIGNACIONES.md`. En un repo de la otra cuenta no se
   escribe nada. Leerlo sí se puede.
2. **`aiw-console` es el único repo compartido**, y solo para el registro, los relevos y el buzón. Commits chicos y por ruta.
   Antes de cada push: en la máquina, `git fetch`; si el árbol está limpio y `HEAD` solo va detrás, `git pull --ff-only`; si no, **se para** y se le dice al operador (el checkout es compartido entre cabinas, y un rebase reescribiría commits de otra). En la nube, `git pull --rebase` (§4).
3. **Las cuentas se avisan por el buzón,** `context/metodo-cantu/mensajes/`: un fichero por aviso (su `README.md` dice cómo). Al
   abrir sesión, cada cuenta lee los que le tocan.
4. **Lo que cruza a un repo ajeno** se pide por el buzón al dueño, con el encargo en un fichero; lo aplica el dueño.
5. **Un hilo o una cabina fija por área.** Cada tarea nueva del área va a su hilo o cabina, no a uno nuevo. En la nube: un hilo
   «Revisión de lecciones» y otro «Landing». En la PC: una cabina por área.
6. **`PROYECTO.md` y `ASIGNACIONES.md` se cambian solo con el sí del operador.**

**Esto enmienda D-086 (D-087):** §3.1 queda para las áreas de cuentachris; las de cuentapato viven en sus hilos fijos. Las tablas de
§3.1, §5 y §6 ya lo dicen.

## 4. Las reglas del operador para todas las áreas

Vienen de la memoria de la PC (`C:\Users\chris\.claude\projects\C--Users-chris-Documents-AIW-Workspace\memory\`), que **el coordinador en la nube no ve**. Por eso van copiadas aquí.

**Cómo hablarle:**
- **Siempre en español:** mensajes, cierres y recaps.
- **Todo mensaje cierra con:**
  - la tabla de lo medido, cuando la hay;
  - **«Qué necesito de ti»**;
  - **«Qué procede»**;
  - **«⏳ EN ESPERA de …»**, bien visible.
- **Las preguntas llevan contexto e imagen:** qué lección o pantalla, qué se ve, y una foto o una liga. Nunca códigos internos sueltos, como «ALG-30, tres decisiones».
- **Al pedirle una revisión:**
  - la liga directa y la ruta completa de cada fichero;
  - cuántas preguntas hay;
  - en qué página.
- **Los archivos se entregan adjuntos, nunca solo como liga (26-nov).** Un PDF, un XML o cualquier fichero que el operador deba abrir se copia a la carpeta del proyecto (`/mnt/project-files/`) y se adjunta en el mensaje. La liga al repo puede ir además, pero no sola: las ligas de GitHub no le abren. Palabras del operador (Chris, 2026-11-26): *«traeme los pdfs, no los logro abrir con ese link no es la primera vez que me pasa guardalo como regla para todos los proyectos»*.

**Cómo medir y escribir:**
- **La hora se mide con `date`**, nunca se adivina, ni en mensajes, ni en commits, ni en ficheros.
- **Toda cifra lleva su fuente.** Lo inferido se marca como `[NO VERIFICADO]` o `[INFERENCIA]`.
- **Sus palabras van verbatim** en veredictos y encargos.

**Cuándo preguntar:**
- **Se avanza sin preguntar** en lo mecánico: correcciones encadenadas, integrar o publicar lo ya aprobado.
- **Se pregunta en las paradas críticas:**
  - decisiones de diseño;
  - borrar lo ajeno;
  - credenciales;
  - gasto;
  - mover cuentas;
  - la QA.
- **Un ✓ o un ~ con comentario de cambios no fija la sección tal cual:** se aplica el cambio.
- **Se avisa de la primera ronda que salga**, para no bloquear sus votos.

**Git:**
- Commit con `git -c user.name=ChrissValdez -c user.email=<el de la cuenta> commit … -- <rutas>`, y al final la línea `Co-Authored-By` del asistente.
- Push por sha: `git push origin <sha>:refs/heads/main`.
- En `aiw-console`, antes de empujar: en la máquina, `git fetch`; si el árbol está limpio y `HEAD` solo va detrás, `git pull --ff-only`; si no, **se para** y se le dice al operador (el checkout es compartido entre cabinas, y un rebase reescribiría commits de otra). En la nube, `git pull --rebase`. Luego se mide `git log origin/main..HEAD`. **Si trae commits ajenos, no se empuja.** Es un checkout compartido entre cabinas, y desde el 24-nov también entre cuentas (§3.2).
- **Nunca** se hace push forzado ni `reset --hard`.
- **Desde un hilo en la nube no se empuja a `main`:** se empuja a la rama del hilo y se abre un PR. **La excepción (D-087):** en `aiw-console`, un aviso nuevo en `context/metodo-cantu/mensajes/` y la línea propia de `ASIGNACIONES.md` van directo a `main`. El push a `main` solo se hace desde la máquina (sesión local o Remote Control). *(propuesto por la laptop, aprobado por el operador, 2026-11-24)*
- **Las cuentas administran git y fusionan solas (26-nov):** un PR que la cuenta recomienda fusionar se fusiona sin preguntarle al operador, en los repos que esa cuenta lleva según `ASIGNACIONES.md` y en `aiw-console`. Solo si no tiene conflicto, sus pruebas pasan y no trae commits ajenos sin revisar. Se avisa después, en el mensaje de cierre. Siguen pidiendo su sí: el push forzado, `reset --hard`, borrar ramas ajenas y lo que no se pueda deshacer. Palabras del operador (Pato, 2026-11-26): *«procede con tus recomendaciones de fusionar, no me preguntes, solo hazlo, tú administras el git»*, y que la otra cuenta haga lo mismo.
- **`git worktree prune` pide su sí.**

**Seguridad y datos:**
- **Nunca se sube código con una sesión de Moodle abierta** (sesskey).
- **Los datos de alumnos son ficticios.**
- No van contraseñas, llaves ni datos personales en los ficheros.
- **Las descargas piden su permiso.**
- **Borrar pide su sí.** Sin él, lo cerrado se mueve a `D:/AIW_frio`, **solo en la PC**: la laptop no tiene unidad `D:`. *(propuesto por la laptop, aprobado por el operador, 2026-11-24)*

**Cómo diseñar:**
- **Variantes por componente:** se dan tres por sección en las rondas de diseño.
- **Un mismo sistema visual.**
- **Nada explicativo de más:** sin leyendas ni textos que expliquen la pantalla.
- **Los estados van en verde, rojo y gris:** aprobado, sin aprobar y falta.
- **Notas destacadas en la web de las lecciones (Pato, 27-nov):** las largas van plegadas por defecto (franja con su título y «Ver»), y **las de un renglón van abiertas y sin «Ver»**. Corta = hasta unos 90 caracteres visibles, a lo mucho una fórmula de un renglón, sin lista, tabla, imagen ni ejemplo Incorrecto/Correcto. Si el texto repite el título, va sin título. En la slide todo va desplegado. Palabras de Pato: *«las notas destacada que tienen contenido de un solo renglon no se escondan, son las largas las que no queria desplegadas por default»*. Mate: cantu-lessons `tools/revision/lib/formato-web/` (PR 22).
- **Lo que él revisa se publica**: en una liga de Artifact o en el repo, nunca en `_scratch`.

**De los quizzes (28-nov, pedido de Cuenta Chris reenviado por Pato):**
- **La revisión v1.6 del Simulador y del Diagnóstico la corre Cuenta Chris en su PC.** Cuenta Pato no la corre ni toca esos `.tex`: cuando llegan resultados a `main`, solo pone al día el índice y el tablero.
- **El tablero del estado de los quizzes** es https://claude.ai/artifact/DWYMW5XrP5kHSkDJbx7myk (sale de `cantu-quizzes-latex/PAA/herramientas/indice/tablero.py`) y se republica siempre en esa misma liga.
- **Lo vigila una tarea programada cada 3 horas** en el hilo «Publicar el estado de los quizzes»: si cambió `PAA/` en `main`, revisa el índice contra los repos vecinos, sube `de-fuera.json` si quedó viejo y republica el tablero. Avisa a Pato solo si cambia algún porcentaje.

**Del negocio:**
- **Español y Matemáticas van separados:** un diagnóstico cada uno. Solo se juntan en el simulador.
- **Las guías de la UDEM:** solo Álgebra I y II. Una referencia nueva se aprueba antes.
- **Prefiere crecer sin inversión** (bootstrapped).

**Los tokens:**
- El uso semanal mezcla proyectos: el % de antes y después de una tarea se anota con lo que corría a la vez.
- **Antes de estimar cuánto gasta una tarea, se lee `context/metodo-cantu/CONSUMO.md`**, y al cerrar una tarea grande se le pide a Chris el % semanal de antes y de después para su registro (27-nov). Chris: *«no estas midiendo bien que tantos tokens va a usar una tarea … ni cerquita»*.
- Cerca de la renovación, la prioridad es la prisa, no el ahorro.
- Hay que ahorrar tokens sin ir más lento: menos pasos, carriles cortos, tope de tres a la vez.

## 5. Dónde se quedó cada área (2026-11-26, 03:19 UTC)

| Área | Cuenta | Estado | Por dónde seguir |
|---|---|---|---|
| DASHBOARD | cuentachris | Publicada la **v40** (https://claude.ai/artifact/JLDqDNMqEVUPe1X2aMMhTq): alumno PIEZAS-27 y maestro MAESTRO-15, más TAMANO-1 y TAMANO-2 (A−, A+ y «tamaño normal» en la barra azul; «votar» abajo, encima de «Tu coach»). TAMANO-1 y 2 están en el PR 1 del dashboard, **sin fusionar** (rama `claude/project-thread-pjoi8q`). Espera a Chris: su visto bueno de los botones y el PR, y la final de **§P** de MAESTRO-15 (la 1 o la 2). | El último bloque de su relevo. La próxima ronda empieza en el puerto **8925**. |
| LECCIONES y revisiones | cuentapato | Las lleva su hilo fijo «Revisión de lecciones» (D-087). El cierre de la cabina suelta de PC-Chris se hizo el 24-nov (`43df531`; ver `ASIGNACIONES.md`). `cr-fig-04` está en GitHub como rama de respaldo y la decide cuentapato. | Su relevo, `context/handoffs/cantu-lessons.md`. |
| LANDING | cuentapato | La lleva su hilo fijo «Landing» (D-087). Cierre de la cabina suelta hecho el 24-nov (`9ba9d12`). | Su relevo, `context/handoffs/metodo-cantu-landing.md`. |
| Quizzes | cuentapato | Desde el 24-nov, 15:37 UTC (sí de Chris). | Su relevo, `context/handoffs/cantu-quizzes-latex.md`. |
| Español PAA | cuentapato | Repo nuevo `cantu-espanol`; hilo «Planear las lecciones de Español PAA». | Lo que diga cuentapato por el buzón. |
| Studio | — | **En pausa** (D-079). | No se toca sin su palabra. |

**Las filas de cuentapato** solo dicen quién lleva el área: su estado vive en su relevo y no se midió aquí (cuentachris no
escribe en esos repos).

Esta tabla es una **foto fechada**. El coordinador la vuelve a medir al abrir, leyendo cada relevo, y no la toma por cierta.

## 6. El paso al modelo mixto, por etapas

| Etapa | Área | Qué se hace | Estado |
|---|---|---|---|
| 1 | Quizzes | El coordinador pone al día su relevo en `handoffs/` desde `PAA/HANDOFF.md`. | Por hacer |
| 2 | LANDING | Su cabina suelta en PC-Chris hace el cierre (`CIERRE-DE-CABINA.md`, al lado), con sus reglas de memoria pasadas a ficheros, y avisa a cuentapato por el buzón. Chris la archiva. Desde ahí la lleva cuentapato (D-087). | Por hacer |
| 3 | LECCIONES y revisiones | Igual que la 2, con lo propio de LECCIONES del mismo fichero. Desde ahí la lleva cuentapato (D-087). | Cierre pedido el 24-nov |
| 3b | DASHBOARD | Tras la v33, el coordinador pone al día su relevo y le abre su cabina anidada. | Relevo al día (v33); falta abrir la cabina |
| 4 | Studio | Solo si el operador la saca de la pausa. | En pausa |

**Las etapas 2 y 3 ya no acaban en una cabina anidada en PC-Chris** (D-087): el cierre sigue haciendo falta, y luego el área la lleva cuentapato.

**Lo que sigue esperando la palabra del operador:** el `git worktree prune` de `cantu-lessons` y `cantu-revisiones`. El de la mudanza ya se hizo con su sí (`AIW_Workspace/MUDANZA-PC.md`, paso 5). Este es por los registros que quedaron huérfanos cuando él vació `_scratch` el 24-nov: 134 de 136 en lessons y 24 de 25 en revisiones, medido con `git worktree list` a las 09:05. También espera si Studio entra al proyecto solo para leerse.
