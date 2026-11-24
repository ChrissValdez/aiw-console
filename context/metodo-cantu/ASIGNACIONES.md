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
| `cuentachris` | La cuenta de Chris | Coordinador local en PC-Chris (DESKTOP-525K0IS) |

**Una cuenta no está atada a un aparato.** Cada una decide en qué aparato disponible corre (laptop-Chris, PC-Chris, PC-Pato).
Chris: *«cada una decide sobre aparatos disponibles»*. La columna de arriba es solo una foto.

## El registro

**Una línea por repo.** Este fichero es la única fuente de quién tiene qué. Si no está aquí, no es de nadie.

| Repo | Área | Dueño | Estado | Desde | Nota |
|---|---|---|---|---|---|
| `cantu-lessons` | Revisión de lecciones | `cuentapato` | activo | 2026-11-24 | Va junto con `cantu-revisiones`: se toman y se sueltan juntos. **Escribe cuando se cumpla el requisito de abajo.** |
| `cantu-revisiones` | Revisión de lecciones (galería) | `cuentapato` | activo | 2026-11-24 | Va junto con `cantu-lessons`. Mismo requisito. |
| `metodo-cantu-landing` | LANDING | `cuentapato` | activo | 2026-11-24 | Mismo requisito. |
| `metodo-cantu-dashboard` | DASHBOARD | `cuentachris` | activo | 2026-11-24 | |
| `cantu-studio` | Studio | — | libre | 2026-11-24 | En pausa (D-079). |
| `cantu-quizzes-latex` | Banco de quizzes | — | libre | 2026-11-24 | Espera la QA del operador. |
| `aiw-console` (`context/`) | Contexto compartido | las dos | compartido | 2026-11-24 | Solo registro, relevos y buzón (ver abajo). |
| `aiw-console` (código de la consola) | Project Console | — | libre, en pausa | 2026-11-24 | Congelado (Pausado_Console_Cabina), como Studio. |

### El requisito antes de escribir en LECCIONES y LANDING

Las cabinas sueltas de esas áreas siguen en PC-Chris, paradas (medido por cuentachris el 24-nov, 09:10): CL_Cabina_PC_Chris
(LECCIONES, sin moverse desde el 20-nov) y MC-LandingPage (LANDING). **cuentapato no escribe en esos tres repos** hasta que:
1. cada una termine su cierre (`CIERRE-DE-CABINA.md`), **incluido el paso 4**: las unas 30 reglas de LECCIONES y 5 de LANDING que
   solo están en la memoria de PC-Chris pasan a `context/cabinas/lecciones/` y `context/cabinas/landing/`. Solo una sesión en
   PC-Chris puede hacerlo; cuentachris lo hace si Chris dice que sí;
2. avise a `cuentapato` por el buzón, con los sha y «cierre hecho».

Después, Chris las archiva.

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

Solo con el sí del operador, dicho en la sesión que lo va a tomar. *(Que baste el sí de Chris en la sesión que suelta o toma está
pendiente de su sí; ver abajo.)*

**`cantu-quizzes-latex`:** que lo tome quien lo necesite, con el sí de Chris. Hoy conviene una cuenta que corra en PC-Chris: ahí
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
- Desde la nube, a la rama del hilo y por PR (PROYECTO.md §4). *(La excepción del buzón, abajo, espera el sí de Chris.)*

**`PROYECTO.md` y este fichero se cambian solo con el sí del operador.**

## Lo que espera el sí de Chris

cuentachris dio su recomendación; **nada de esto vale hasta que Chris diga sí.**

| # | Pregunta | Recomendación de cuentachris |
|---|---|---|
| 1 | ¿Quién aprueba tomar o soltar un repo? | Chris, en la sesión que suelta o toma. |
| 6 | ¿El tope de tres sesiones a la vez es global o por cuenta? | Por cuenta. |
| 7 | ¿La nube puede empujar directo a `main` en `aiw-console`? | Sí, pero solo avisos nuevos en `mensajes/` y la línea propia de este registro. |
| 8 | ¿Qué pasa con los repos de una cuenta que se queda sin tokens? | Esperan, no cambian de dueño. Cada cuenta deja su relevo al día al 90 % de su tope, porque al 0 ya no puede hacer el cierre. |
