# Asignaciones: qué cuenta lleva cada repo

> **v0 · 2026-11-24, 15:10 UTC (`date -u`).** Lo redactó un hilo del Project «Metodo_Cantu» en la nube, a pedido del operador
> (Pato). Sus palabras:
> - *«lo mas importante es trabajar en repos diferentes por cuenta. Es decir si a ti te delego la galeria de cantu revisiones que la
>   otra cuenta no trabaje en eso simultaneamente»*
> - *«tu encargate de la revision de lecciones y landing page, el dashboard se lo dejamos a la otra cuenta»*
> - *«son las dos cosas activas de momento conforme se ocupe nuevo trabajo le voy diciendo»*
>
> **Propuesta en PR, sin fusionar.** Vale cuando el operador la apruebe. La decisión es D-087, que enmienda D-086.
>
> **v1 · 2026-11-24.** Con la revisión de cuentachris (de acuerdo con el reparto): las cuentas no van atadas a un aparato, el
> pull en la máquina no hace rebase, el código de la consola queda libre y en pausa, las dependencias que ya existen, y el
> requisito de las reglas de memoria antes de escribir en LECCIONES y LANDING.

## Las cuentas

| Nombre corto (en el buzón) | Quién es | Dónde corre hoy |
|---|---|---|
| `cuentapato` | La cuenta de Pato | Project «Metodo_Cantu» en claude.ai/code (nube) |
| `cuentachris` | La cuenta de Chris | Su Project en claude.ai/code (nube), desde el 2026-11-25; usa PC-Chris (DESKTOP-525K0IS) por tarjeta |

**Una cuenta no está atada a un aparato.** Cada una decide en qué aparato disponible corre (laptop-Chris, PC-Chris, PC-Pato).
Chris: *«cada una decide sobre aparatos disponibles»*. La columna de arriba es solo una foto.

## El registro

**Una línea por repo.** Este fichero es la única fuente de quién tiene qué. Si no está aquí, no es de nadie.

**Las líneas de trabajo** (Línea A, Dashboard; Línea B, Lecciones mate; …) y su estado viven al lado, en `LINEAS.md`. Este
registro y aquel no pueden contradecirse: una línea activa tiene sus repos activos con la misma cuenta, y todo cambio que toque
a los dos va en un solo commit. Antes de commitear aquí, `node context/metodo-cantu/lineas.mjs --revisar` (D-088).

| Repo | Área | Dueño | Estado | Desde | Nota |
|---|---|---|---|---|---|
| `cantu-lessons` | Revisión de lecciones | `cuentapato` | activo | 2026-11-26 | Regresó de `cuentachris` (préstamo de la galería como artefacto, 04:41–08:15 UTC); lo tomó `cuentapato` a las 08:20 UTC. Va junto con `cantu-revisiones`. Pato (26-nov): *«Toma la Línea B y sus dos repos, y reanuda la Línea F, como dice el aviso»*. Relevo: `context/handoffs/cantu-lessons.md`. |
| `cantu-revisiones` | Revisión de lecciones (galería) | `cuentapato` | activo | 2026-11-26 | Regresó de `cuentachris` (préstamo de la galería como artefacto, 04:41–08:15 UTC); lo tomó `cuentapato` a las 08:20 UTC. Va junto con `cantu-lessons`. Pato (26-nov): *«Toma la Línea B y sus dos repos, y reanuda la Línea F, como dice el aviso»*. Relevo: `context/handoffs/cantu-revisiones.md`. |
| `metodo-cantu-landing` | LANDING | `cuentapato` | activo | 2026-11-24 | Mismo requisito. |
| `metodo-cantu-dashboard` | DASHBOARD | `cuentachris` | activo | 2026-11-24 | |
| `metodo-cantu-tutor` | Tutor IA del piloto de Moodle (Línea A, por ahora) | `cuentachris` | activo | 2026-11-27 | Repo de Chris con el plugin `local_metodocantu_ai_chat`; aquí se hizo el saldo semanal por alumno (PR #1, fusionado el 27-nov). Lo toma `cuentachris` dentro de la Línea A; si se abre una línea propia del tutor, se mueve ahí. Chris (27-nov): *«Si reanudala se está trabajando los estados deben de reflejar el estado de la linea»*. |
| `cantu-studio` | Studio | — | libre | 2026-11-24 | En pausa (D-079). |
| `cantu-quizzes-latex` | Banco de quizzes | `cuentapato` | activo | 2026-11-24 | Lo soltó cuentachris (CQL_Cabina cerrada: `0f5b7c2` en el repo, `3daff28` aquí). Chris: *«si no es tan pesado entonces si mandaselo a la cuenta Pato»*. Orden: PROP-QUIZ, ESENCIAL-ALG, NUEVAS-FG y luego BUILD-FINAL-4 (aviso `leidos/2026-11-24-1537-…`). |
| `cantu-espanol` | Lecciones de Español PAA (lectura y redacción) | `cuentapato` | activo | 2026-11-24 | Repo nuevo; lo creó Pato. Pato: *«esto es un proyecto nuevo, que entra en Metodo_cantu / Y lo quiero trabajar aqui en esta cuenta»*. Su galería irá en un repo aparte, sin cruzarse con la de mate. Hilo: «Planear las lecciones de Español PAA». |
| `metodo-cantu-calculo` | Asesorías UANL: Cálculo diferencial (Línea I) | `cuentachris` | activo | 2026-11-26 | Repo nuevo de Chris. Lo toma `cuentachris` al crear la Línea I. Chris (26-nov): *«vamos a hacer dos lineas nuevas y pausar la linea H»*. |
| `metodo-cantu-geometria-analitica` | Asesorías UANL: Geometría analítica (Línea J) | `cuentachris` | activo | 2026-11-26 | Repo nuevo de Chris. Lo toma `cuentachris` al crear la Línea J. Mismas palabras de Chris. |
| `metodo-cantu-redes` | Redes sociales de Método Cantú (Línea K) | `cuentachris` | activo | 2026-11-26 | Repo nuevo de Chris (logo y flyer). Lo toma `cuentachris` al crear la Línea K; Pato ya tiene acceso. Chris (26-nov): *«has una linea formal de Redes sociales de Método Cantú»*. |
| `aiw-console` (`context/`) | Contexto compartido | las dos | compartido | 2026-11-24 | Solo registro, relevos y buzón (ver abajo). |
| `aiw-console` (código de la consola) | Project Console | — | libre, en pausa | 2026-11-24 | Congelado (Pausado_Console_Cabina), como Studio. |

### El requisito antes de escribir en LECCIONES y LANDING

**✅ Cumplido el 24-nov** (cuentachris): las reglas pasaron a ficheros en `43df531` (`context/cabinas/MEMORIA-COMUN.md` y
`context/cabinas/{lecciones,landing,quizzes}/MEMORIA-PC-CHRIS.md`), y las tres cabinas sueltas de PC-Chris (LECCIONES, LANDING y
quizzes) hicieron su cierre y están archivadas. Relevos: `metodo-cantu-landing.md` (`9ba9d12`) y `cantu-quizzes-latex.md`
(`3daff28`). **Antes de escribir en esos repos, cuentapato lee esos ficheros de memoria.**

Lo que se pedía: las cabinas sueltas de esas áreas estaban en PC-Chris, paradas (medido por cuentachris el 24-nov, 09:10):
CL_Cabina_PC_Chris (LECCIONES, sin moverse desde el 20-nov) y MC-LandingPage (LANDING). cuentapato no escribía en esos repos hasta que:
1. cada una termine su cierre (`CIERRE-DE-CABINA.md`), **incluido el paso 4**: las unas 30 reglas de LECCIONES y 5 de LANDING que
   solo están en la memoria de PC-Chris pasan a `context/cabinas/lecciones/` y `context/cabinas/landing/`. Solo una sesión en
   PC-Chris puede hacerlo; cuentachris lo hace si Chris dice que sí;
2. avise a `cuentapato` por el buzón, con los sha y «cierre hecho».

Después, Chris las archiva.

### Lo que no se toca

- **`cr-fig-04` (LECCIONES)** ya está en GitHub como rama de respaldo: `origin/cr-fig-04`, punta `618d8716` (17-nov; la guarda de figuras
  de la regla 46, +807). **No está integrada en main.** Chris decidió el 2026-11-25 subirla como respaldo y que la Cuenta Pato, dueña de
  lecciones, decida si la junta o la descarta. Antes de juntarla, revisar el diff (`modo-seco-comprobar-antes`). Aviso:
  `mensajes/2026-11-25-0747-cuentachris-cuentapato-cr-fig-04-en-github.md`.

### Las dependencias entre repos

Lo que un repo lee de otro. **Antes de cambiar o mover algo de esta lista, su dueño avisa por el buzón al que lo usa.**

| Quién lee | Qué lee | De dónde |
|---|---|---|
| `metodo-cantu-dashboard`: sus pruebas (`probar-v2`, `-v3`, `-v4` y `validar.mjs`) | `puppeteer-core` | `../cantu-lessons/tools/render/` |
| `metodo-cantu-dashboard`: `modelo/desde-ruta.mjs` | la ruta de estudio | `../cantu-lessons/docs/referencias/RUTA-DE-ESTUDIO` |

Si aparece otra, se agrega aquí.

**Estados:**
- **activo:** su dueño trabaja ahí. Nadie más escribe en ese repo: ni commits, ni ramas, ni «un cambio de una línea».
- **libre:** nadie lo tiene. Para escribir ahí, primero se toma (protocolo de abajo).
- **compartido:** solo `aiw-console`, con las reglas de su sección.

**Leer sí se puede.** Cualquier cuenta puede hacer `pull` y leer un repo ajeno para entender algo. Lo que no puede es escribir.

## La regla de oro

**Antes de escribir en un repo**, la cuenta hace `git pull` de `aiw-console` y mira esta tabla.
- Si el repo es suyo y está **activo**: adelante.
- Si es **libre**: primero lo toma.
- Si es **de la otra cuenta**: no lo toca. Si necesita algo ahí, deja un aviso en el buzón (`mensajes/`) para su dueño.

## Tomar un repo

Con el sí de Chris, dicho en la sesión que suelta o toma el repo (D-087).

**`cantu-quizzes-latex`, cuando se suelte:** que lo tome quien lo necesite, con el sí de Chris. Conviene una cuenta que corra en PC-Chris: ahí
están TeX Live 2025, `pdftotext` y CertUtil (el XML de Moodle). En la nube TeX se instala cada vez (~5 min) y Moodle solo está en
la máquina.

1. `git pull` en `aiw-console`.
2. Comprueba que el repo sigue **libre** en esta tabla.
3. Cambia su línea: dueño, `activo`, la fecha (`date -u`) y en «Nota» las palabras del operador.
4. Commit solo de este fichero y push.
   - **Si el push se rechaza**, alguien empujó antes: `git pull --rebase` y vuelve a mirar la tabla. Si la otra cuenta tomó el repo
     primero, gana ella; se deshace el cambio propio y se le dice al operador. (En la máquina, `pull --ff-only` como abajo.)
5. Baja el repo tomado (en la máquina, con las reglas de `aiw-console` de abajo) y lee su relevo (`context/handoffs/<repo>.md`) antes de trabajar.

## Soltar un repo

1. Termina o commitea tal cual lo que tenga a medias en ese repo, y hace push. **Nada se queda solo en disco.**
2. Pone al día su relevo, `context/handoffs/<repo>.md`: qué se hizo, con sus commits; qué quedó a medias; qué espera al operador.
3. Cambia su línea aquí: dueño `—`, `libre`, la fecha.
4. Un solo commit con el relevo y esta línea, y push.
5. Si la otra cuenta lo va a tomar, le deja un aviso en `mensajes/` que nombra el relevo.

**Pasar un repo directo a la otra cuenta** es soltar y tomar: primero suelta quien lo tiene; luego toma quien llega. Nunca se
cambia el dueño de un repo ajeno desde la cuenta que lo quiere.

## `aiw-console`, el repo compartido

Las dos cuentas escriben aquí, pero solo en esto:
- este fichero;
- los relevos de **sus** repos (`context/handoffs/<repo>.md`) y lo de sus cabinas (`context/cabinas/<área>/`);
- el buzón (`context/metodo-cantu/mensajes/`).

**Cómo se empuja:**
- Commit chico y por ruta (`git add <rutas>`, nunca `-A`).
- Antes de empujar:
  - **En la máquina** (PC-Chris, laptop-Chris, PC-Pato): `git fetch`. Si el árbol está limpio y `HEAD` solo va detrás de
    `origin/main`, `git pull --ff-only`. **Si no, se para** y se le dice al operador. Nunca `rebase` ahí: el checkout es compartido
    entre cabinas, y un rebase reescribiría commits locales de otra o fallaría a medias con el árbol sucio.
  - **En la nube:** `git pull --rebase origin main` está bien; el checkout es solo del hilo.
- Se empuja solo si `origin/main..HEAD` trae únicamente lo propio. **Nunca `--force`.**
- Desde la nube, a la rama del hilo y por PR (PROYECTO.md §4), **salvo** un aviso nuevo en `mensajes/` y la línea propia de este
  registro, que van directo a `main` (Chris, pregunta 7).

**`PROYECTO.md` y este fichero se cambian solo con el sí de Chris** (en este fichero, dicho en la sesión que suelta o toma).

## Lo que contestó Chris (2026-11-24, ~09:20 en Monterrey)

Sus respuestas a las preguntas del PR 1, tal cual las copió cuentachris en
`mensajes/leidos/2026-11-24-1521-cuentachris-cuentapato-respuestas-pr1.md`:

| # | Pregunta | Lo que vale |
|---|---|---|
| 1 | ¿Quién aprueba un cambio en este registro? | Chris, en la sesión que suelta o toma el repo. |
| 6 | ¿El tope de tres sesiones es por cuenta o entre las dos? | Por cuenta: *«cada una paga sus tokens y usa su propio aparato»*. |
| 7 | ¿La nube puede subir directo a `main`? | Sí, pero solo avisos nuevos en `mensajes/` y su propia línea de este registro. |
| 8 | Si a una cuenta se le acaban los tokens, ¿sus repos pasan a la otra? | Esperan, salvo que Chris diga otra cosa. Cada cuenta deja su relevo al día al **95 %** de su uso semanal, porque al 0 ya no puede hacer el cierre. |
