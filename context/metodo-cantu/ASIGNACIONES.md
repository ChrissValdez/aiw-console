# Asignaciones: qué cuenta lleva cada repo

> **v0 · 2026-11-24, 15:10 UTC (`date -u`).** Lo redactó un hilo del Project «Metodo_Cantu» en la nube, a pedido del operador
> (Pato). Sus palabras:
> - *«lo mas importante es trabajar en repos diferentes por cuenta. Es decir si a ti te delego la galeria de cantu revisiones que la
>   otra cuenta no trabaje en eso simultaneamente»*
> - *«tu encargate de la revision de lecciones y landing page, el dashboard se lo dejamos a la otra cuenta»*
> - *«son las dos cosas activas de momento conforme se ocupe nuevo trabajo le voy diciendo»*
>
> **Propuesta en PR, sin fusionar.** Vale cuando la otra cuenta la revise y el operador la apruebe.

## Las cuentas

| Nombre corto (en el buzón) | Quién es | Dónde corre |
|---|---|---|
| `cuentapato` | Laptop-Chris-CuentaPato: la cuenta de Pato | Project «Metodo_Cantu» en claude.ai/code (nube), con la laptop LAPTOP-PF6SOUAS enlazada |
| `cuentachris` | PC-Chris-CuentaChris: la cuenta de Chris | Coordinador local en la PC (DESKTOP-525K0IS), en `AIW_Workspace` |

## El registro

**Una línea por repo.** Este fichero es la única fuente de quién tiene qué. Si no está aquí, no es de nadie.

| Repo | Área | Dueño | Estado | Desde | Nota |
|---|---|---|---|---|---|
| `cantu-lessons` | Revisión de lecciones | `cuentapato` | activo | 2026-11-24 | Va junto con `cantu-revisiones`: se toman y se sueltan juntos. |
| `cantu-revisiones` | Revisión de lecciones (galería) | `cuentapato` | activo | 2026-11-24 | Va junto con `cantu-lessons`. |
| `metodo-cantu-landing` | LANDING | `cuentapato` | activo | 2026-11-24 | |
| `metodo-cantu-dashboard` | DASHBOARD | `cuentachris` | activo | 2026-11-24 | |
| `cantu-studio` | Studio | — | libre | 2026-11-24 | En pausa (D-079). |
| `cantu-quizzes-latex` | Banco de quizzes | — | libre | 2026-11-24 | Espera la QA del operador. |
| `aiw-console` | Contexto compartido | las dos | compartido | 2026-11-24 | Solo registro, relevos y buzón (ver abajo). |

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

Solo con el sí del operador, dicho en la sesión que lo va a tomar.

1. `git pull` en `aiw-console`.
2. Comprueba que el repo sigue **libre** en esta tabla.
3. Cambia su línea: dueño, `activo`, la fecha (`date -u`) y en «Nota» las palabras del operador.
4. Commit solo de este fichero y push.
   - **Si el push se rechaza**, alguien empujó antes: `git pull --rebase` y vuelve a mirar la tabla. Si la otra cuenta tomó el repo
     primero, gana ella; se deshace el cambio propio y se le dice al operador.
5. `git pull` en el repo tomado y lee su relevo (`context/handoffs/<repo>.md`) antes de trabajar.

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
- Antes de empujar, `git pull --rebase origin main`. Se empuja solo si `origin/main..HEAD` trae únicamente lo propio.
- Si el push choca, se repite `pull --rebase` y push. **Nunca `--force`.**
- Desde la nube, a la rama del hilo y por PR (PROYECTO.md §4). Los avisos del buzón y los cambios de este registro también.
  *(Ver «Lo que falta decidir» en el PR: si conviene que el buzón vaya directo a `main`.)*

**`PROYECTO.md` y este fichero se cambian solo con el sí del operador.**
