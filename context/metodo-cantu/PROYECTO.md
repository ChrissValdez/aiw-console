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
| LECCIONES y revisiones | **Cabina anidada al coordinador**, permanente | La de más flujo y más oficio: galerías, votos, carriles. |
| DASHBOARD | **Cabina anidada**, en cuanto se publique la v33 | Su ronda (votos, encargo, publicar) es continua. |
| Quizzes | **Sin cabina:** talleres que abre el coordinador | Hoy solo espera la QA del operador. |
| LANDING | **Sin cabina:** talleres que abre el coordinador | Casi cerrada; quedan rondas cortas. |
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

**El tope de tres es global:** como mucho tres sesiones trabajando a la vez, sumando cabinas y talleres de todas las áreas.

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
- **cuentapato** (Project en la nube): revisión de lecciones (`cantu-lessons` y `cantu-revisiones`) y la LANDING.
- **cuentachris** (coordinador local en la PC): el DASHBOARD.
- **Libres:** `cantu-studio` y `cantu-quizzes-latex`.

**Las reglas:**
1. **Antes de escribir en un repo**, `git pull` de `aiw-console` y mirar `ASIGNACIONES.md`. En un repo de la otra cuenta no se
   escribe nada. Leerlo sí se puede.
2. **`aiw-console` es el único repo compartido**, y solo para el registro, los relevos y el buzón. Commits chicos, por ruta, y
   `git pull --rebase` antes de cada push (§4).
3. **Las cuentas se avisan por el buzón,** `context/metodo-cantu/mensajes/`: un fichero por aviso (su `README.md` dice cómo). Al
   abrir sesión, cada cuenta lee los que le tocan.
4. **Lo que cruza a un repo ajeno** se pide por el buzón al dueño, con el encargo en un fichero; lo aplica el dueño.
5. **Un hilo o una cabina fija por área.** Cada tarea nueva del área va a su hilo o cabina, no a uno nuevo. En la nube: un hilo
   «Revisión de lecciones» y otro «Landing». En la PC: una cabina por área.
6. **`PROYECTO.md` y `ASIGNACIONES.md` se cambian solo con el sí del operador.**

**Esto cambia la tabla de §3.1:** las áreas de cuentapato ya no tienen cabina anidada en la PC; viven en sus hilos de la nube.
§3.1 queda para las áreas de cuentachris.

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
- En `aiw-console`, antes de empujar, `git pull --rebase origin main` y se mide `git log origin/main..HEAD`. **Si trae commits ajenos, no se empuja.** Es un checkout compartido entre cabinas, y desde el 24-nov también entre cuentas (§3.2).
- **Nunca** se hace push forzado ni `reset --hard`.
- **Desde un hilo en la nube no se empuja a `main`:** se empuja a la rama del hilo y se abre un PR. El push a `main` solo se hace desde la máquina (sesión local o Remote Control). *(propuesto por la laptop, aprobado por el operador, 2026-11-24)*
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
- **Lo que él revisa se publica**: en una liga de Artifact o en el repo, nunca en `_scratch`.

**Del negocio:**
- **Español y Matemáticas van separados:** un diagnóstico cada uno. Solo se juntan en el simulador.
- **Las guías de la UDEM:** solo Álgebra I y II. Una referencia nueva se aprueba antes.
- **Prefiere crecer sin inversión** (bootstrapped).

**Los tokens:**
- El uso semanal mezcla proyectos. No se saca el costo de un trabajo del porcentaje de la cuenta.
- Cerca de la renovación, la prioridad es la prisa, no el ahorro.
- Hay que ahorrar tokens sin ir más lento: menos pasos, carriles cortos, tope de tres a la vez.

## 5. Dónde se quedó cada área (2026-11-24, 09:00)

| Área | Estado | Por dónde seguir |
|---|---|---|
| DASHBOARD | Encargos MAESTRO-10 y PIEZAS-25 (875fe157), con sus talleres anidados al coordinador, trabajando desde las 08:50. Publicado: la v32. | Al entregar, el coordinador integra y publica la v33; luego pasa a su cabina anidada (§6). |
| LECCIONES | Lo lleva su cabina suelta en la PC. Lo último: CR-LX3·07 (c05f1bbc), tres vistas de la galería CR-LX3 que esperan su voto. Su relevo en `handoffs/` es del 19-nov. | El cierre de §6. `node tools/cabina/pendientes.mjs` no sirve tras la mudanza: su carpeta de `_scratch` ya no existe. |
| LANDING | Lo lleva su cabina suelta. Vigente: BB. El título de la sección 2 espera uno nuevo (`veredictos/2026-11-23-seccion-2-tono.md`). | El cierre de §6; luego, talleres del coordinador. |
| Quizzes | Sin cabina viva. Espera la QA del operador (`PAA/tickets/qa-visual-FINAL-2.md`). El relevo vigente es `PAA/HANDOFF.md`; el de `handoffs/` es de septiembre. | Talleres del coordinador. |
| Studio | **En pausa** (D-079). | No se toca sin su palabra. |

Esta tabla es una **foto fechada**. El coordinador la vuelve a medir al abrir, leyendo cada relevo, y no la toma por cierta.

## 6. El paso al modelo mixto, por etapas

| Etapa | Área | Qué se hace | Estado |
|---|---|---|---|
| 1 | Quizzes | El coordinador pone al día su relevo en `handoffs/` desde `PAA/HANDOFF.md`. | Por hacer |
| 2 | LANDING | Su cabina suelta hace el cierre (`CIERRE-DE-CABINA.md`, al lado) y se archiva con su sí. | Por hacer |
| 3 | LECCIONES y revisiones | Su cabina suelta hace el cierre, con lo propio de LECCIONES del mismo fichero. El coordinador abre su cabina anidada y la suelta se archiva con su sí. | Cierre pedido el 24-nov |
| 3b | DASHBOARD | Tras la v33, el coordinador pone al día su relevo y le abre su cabina anidada. | Tras la v33 |
| 4 | Studio | Solo si el operador la saca de la pausa. | En pausa |

**Lo que sigue esperando la palabra del operador:** el `git worktree prune` de `cantu-lessons` y `cantu-revisiones` (más de 50 worktrees que ya no existen, medido con `sincronia.mjs` el 24-nov), y si Studio entra al proyecto solo para leerse.
